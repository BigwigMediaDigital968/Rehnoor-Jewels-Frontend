import { NextResponse } from "next/server";
import { fetchPublicProducts, ApiProduct } from "@/app/lib/api/products";

// Helper utilities to escape restricted XML characters safely
function escapeXml(unsafe: string | null | undefined): string {
  if (!unsafe) return "";
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case "<": return "&lt;";
      case ">": return "&gt;";
      case "&": return "&amp;";
      case "'": return "&apos;";
      case '"': return "&quot;";
      default: return c;
    }
  });
}

export async function GET() {
  try {
    // Fetch all active products from your database. 
    // Setting limit to 250 to fetch your comprehensive catalog list variant items.
    const productResponse = await fetchPublicProducts({ limit: 250 });

    if (!productResponse || !productResponse.success || !productResponse.data) {
      throw new Error("Invalid or empty data payload from internal products API");
    }

    // Filter down to active products with valid configurations
    const activeProducts = productResponse.data.filter((p: ApiProduct) => p.isActive);

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Rehnoor Jewels Official Product Catalog</title>
    <link>https://rehnoorjewels.com</link>
    <description>Premium live-synchronized gold-plated and natural diamond custom articles registry.</description>
    <language>en</language>`;

    for (const prod of activeProducts) {
      // 1. Resolve product page target URL link
      const productLink = `https://rehnoorjewels.com/products/${prod.slug}`;

      // 2. Resolve primary visual asset file path
      const mainImage = prod.images && prod.images.length > 0 
        ? prod.images[0].src 
        : "https://rehnoorjewels.com/placeholder-jewelry.jpg";

      // 3. Fallback extraction logic for Gross Weight data parameter mapping
      const resolvedWeight = prod.weightGrams 
        ? prod.weightGrams 
        : (prod.specifications?.find(s => s.key.toLowerCase().includes("weight") || s.key.toLowerCase() === "g.wt.")?.value || "N/A");

      // 4. Construct safe text context content descriptors
      const cleanTitle = escapeXml(prod.name);
      const cleanSubtitle = prod.subtitle ? escapeXml(prod.subtitle) : "";
      const fullDescription = escapeXml(prod.shortDescription || prod.longDescription || `${prod.name} - Custom handcrafted high artisan jewelry item.`);

      xml += `
    <item>
      <g:id>${prod._id}</g:id>
      <title>${cleanTitle} ${cleanSubtitle ? `| ${cleanSubtitle}` : ""}</title>
      <description>${fullDescription}</description>
      <link>${productLink}</link>
      <g:image_link>${mainImage}</g:image_link>
      <g:condition>new</g:condition>
      <g:availability>${prod.stock && prod.stock > 0 ? "in stock" : "in stock"}</g:availability>
      <g:price>${prod.price} INR</g:price>
      <g:brand>Rehnoor Jewels</g:brand>
      <g:google_product_category>Jewelry &amp; Watches &gt; Jewelry</g:google_product_category>
      <g:product_type>${escapeXml(prod.category || "Jewelry")}</g:product_type>
      ${prod.sku ? `<g:mpn>${escapeXml(prod.sku)}</g:mpn>` : ""}
      ${prod.purity ? `<g:custom_label_0>Purity: ${escapeXml(prod.purity)}</g:custom_label_0>` : ""}
      ${prod.metal ? `<g:custom_label_1>Metal: ${escapeXml(prod.metal)}</g:custom_label_1>` : ""}
      <g:custom_label_2>G.Wt: ${escapeXml(resolvedWeight)}</g:custom_label_2>
    </item>`;
    }

    xml += `
  </channel>
</rss>`;

    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        // Force serverless platforms not to stickily cache this live gold valuation grid
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      },
    });
  } catch (error: any) {
    // Return a valid XML payload indicating the failure state to prevent Google from dropping valid previous feeds
    return new NextResponse(
      `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>Error</title><description>${escapeXml(error.message)}</description></channel></rss>`,
      { status: 500, headers: { "Content-Type": "application/xml" } }
    );
  }
}