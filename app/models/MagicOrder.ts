// app/models/MagicOrder.ts
//
// Deliberately a SEPARATE collection ("magic_checkout_orders") from your
// production Order collection. This keeps the trial fully isolated —
// nothing here can corrupt or collide with real order data, and you can
// drop the whole collection with zero risk when the trial ends (or rename
// the model/collection if you decide to promote it to production).

import mongoose, { Schema } from "mongoose";

const AddressSchema = new Schema(
  {
    fullName: String,
    phone: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    country: String,
    zipcode: String,
  },
  { _id: false },
);

const LineItemSchema = new Schema(
  {
    productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    variantId: { type: String, default: null },
    sku: String,
    name: String,
    image: String,
    price: { type: Number, required: true }, // paise
    offerPrice: { type: Number, required: true }, // paise
    quantity: { type: Number, required: true },
    customNote: String,
  },
  { _id: false },
);

const MagicOrderSchema = new Schema(
  {
    receipt: { type: String, required: true, unique: true }, // sent to Razorpay as `receipt`
    razorpayOrderId: { type: String, default: null },

    status: {
      type: String,
      enum: ["created", "paid", "placed", "failed", "cancelled"],
      default: "created",
    },

    customer: {
      name: String,
      email: String,
      phone: String,
    },

    shippingAddress: AddressSchema,
    billingAddress: AddressSchema,

    items: { type: [LineItemSchema], default: [] },

    amounts: {
      lineItemsTotal: { type: Number, required: true }, // paise, post-discount
      shippingFee: { type: Number, default: 0 }, // paise
      codFee: { type: Number, default: 0 }, // paise
      total: { type: Number, required: true }, // paise — amount sent to Razorpay `amount`
    },

    coupon: {
      code: { type: String, default: null },
      discountAmount: { type: Number, default: 0 }, // paise
    },

    paymentMethod: { type: String, enum: ["cod", "razorpay"], default: "razorpay" },

    razorpayPaymentId: { type: String, default: null },
    razorpaySignature: { type: String, default: null },

    source: { type: String, default: "magic-checkout-trial" },
  },
  { timestamps: true, collection: "magic_checkout_orders" },
);

export default (mongoose.models.MagicOrder as mongoose.Model<any>) ||
  mongoose.model("MagicOrder", MagicOrderSchema);
