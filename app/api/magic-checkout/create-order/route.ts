// app/api/magic-checkout/create-order/route.ts
//
// POST body shape (sent from useMagicCheckout.ts):
// {
//   items: [{ productId, variantId, quantity, customNote }],
//   contact: { name, email, phone },
//   couponCode?: string   // from cartStore.coupon.code, if one is applied
// }

import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/app/lib/server/mongodb";
import { razorpay } from "@/app/lib/server/razorpay";
import Product from "@/app/models/Product";
import MagicOrder from "@/app/models/MagicOrder";

interface IncomingItem {
  productId: string;
  variantId?: string | null;
  quantity: number;
  customNote?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const items: IncomingItem[] = body.items || [];
    const contact = body.contact || {};
    const couponCode: string | null = body.couponCode || null;

    if (!items.length) {
      return NextResponse.json(
        { success: false, message: "Cart is empty." },
        { status: 400 },
      );
    }

    await dbConnect();

    // ── Look up real, current prices server-side — never trust client price ──
    const lineItems = [];
    let lineItemsTotal = 0; // paise

    for (const item of items) {
      const product = (await Product.findById(item.productId).lean()) as any;
      if (!product || product.isActive === false) {
        return NextResponse.json(
          {
            success: false,
            message: `Product ${item.productId} is unavailable.`,
          },
          { status: 400 },
        );
      }

      let unitPriceRupees = product.price;
      let variantSku = product.sku || product._id.toString();
      let variantTitle = product.name;
      let image = product.images?.[0]?.src || "";

      if (item.variantId) {
        const variant = (product.variants || []).find(
          (v: any) => String(v._id) === String(item.variantId),
        );
        if (!variant || variant.isActive === false) {
          return NextResponse.json(
            { success: false, message: `Selected variant is unavailable.` },
            { status: 400 },
          );
        }
        unitPriceRupees = variant.price;
        variantSku = variant.sku || variantSku;
        variantTitle = variant.title
          ? `${product.name} — ${variant.title}`
          : product.name;
        image = variant.images?.[0]?.src || image;
      }

      const unitPricePaise = Math.round(unitPriceRupees * 100);
      const quantity = Math.max(1, Number(item.quantity) || 1);
      const lineTotal = unitPricePaise * quantity;
      lineItemsTotal += lineTotal;

      lineItems.push({
        sku: variantSku,
        variant_id: item.variantId
          ? String(item.variantId)
          : String(product._id),
        price: unitPricePaise,
        offer_price: unitPricePaise, // discounts are handled live via the promotions widget, not here
        quantity,
        name: variantTitle,
        image_url: image,
        _internal: {
          productId: String(product._id),
          variantId: item.variantId || null,
          customNote: item.customNote,
        },
      });
    }

    if (lineItemsTotal <= 0) {
      return NextResponse.json(
        { success: false, message: "Order total must be greater than zero." },
        { status: 400 },
      );
    }

    const receipt = `MC-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

    // ── Create the Mongo record first so we have an id to store in notes ──────
    const magicOrder = await MagicOrder.create({
      receipt,
      status: "created",
      customer: {
        name: contact.name || "",
        email: contact.email || "",
        phone: contact.phone || "",
      },
      items: lineItems.map((li) => ({
        productId: li._internal.productId,
        variantId: li._internal.variantId,
        sku: li.sku,
        name: li.name,
        image: li.image_url,
        price: li.price,
        offerPrice: li.offer_price,
        quantity: li.quantity,
        customNote: li._internal.customNote,
      })),
      amounts: {
        lineItemsTotal,
        shippingFee: 0,
        codFee: 0,
        total: lineItemsTotal,
      },
      coupon: { code: couponCode, discountAmount: 0 },
    });

    // ── Create the Razorpay order — line_items_total is what makes this a
    //    Magic Checkout order instead of Standard Checkout ────────────────────
    const razorpayOrder = await razorpay.orders.create({
      amount: lineItemsTotal,
      currency: "INR",
      receipt,
      line_items_total: lineItemsTotal,
      line_items: lineItems.map(({ _internal, ...rest }) => rest),
      notes: {
        magicOrderId: String(magicOrder._id),
      },
    } as any);

    magicOrder.razorpayOrderId = razorpayOrder.id;
    await magicOrder.save();

    return NextResponse.json({
      success: true,
      data: {
        magicOrderId: String(magicOrder._id),
        razorpayOrderId: razorpayOrder.id,
        amount: lineItemsTotal,
        receipt,
        couponCode,
      },
    });
  } catch (err: any) {
    console.error("magic-checkout/create-order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Could not create order." },
      { status: 500 },
    );
  }
}
