// app/models/Product.ts
//
// This mirrors your existing Node.js `Product` model (Mongoose schema you
// shared). It's registered separately here because this Next.js connection
// is independent of your Node backend's mongoose instance — but it points
// at the SAME collection ("products"), so it reads the exact same data.
//
// Only used for server-side price/variant lookups when building Razorpay
// line_items. Never trust price/variant data sent from the client.

import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema(
  { src: String, alt: String },
  { _id: false },
);

const ProductVariantSchema = new mongoose.Schema(
  {
    title: String,
    sku: String,
    barcode: String,
    price: Number,
    originalPrice: Number,
    stock: Number,
    weightGrams: Number,
    images: [ImageSchema],
    options: { type: Map, of: String },
    isDefault: Boolean,
    isActive: Boolean,
  },
  { _id: true },
);

const ProductOptionSchema = new mongoose.Schema(
  { name: String, values: [String] },
  { _id: false },
);

const productSchema = new mongoose.Schema(
  {
    name: String,
    slug: String,
    subtitle: String,
    sku: String,
    price: Number,
    originalPrice: Number,
    currency: { type: String, default: "INR" },
    tag: String,
    options: [ProductOptionSchema],
    variants: [ProductVariantSchema],
    images: [ImageSchema],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true, collection: "products" },
);

// Avoid recompiling the model on every hot-reload in dev.
export default (mongoose.models.MagicCheckoutProduct as mongoose.Model<any>) ||
  mongoose.model("MagicCheckoutProduct", productSchema, "products");
