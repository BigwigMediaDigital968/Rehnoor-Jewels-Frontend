"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Heart,
  Share2,
  ShoppingBag,
  Check,
  Star,
  Shield,
  RefreshCw,
  Truck,
  ZoomIn,
  ChevronRight as Chevron,
  Ruler,
  X,
  Info,
} from "lucide-react";
import type {
  Product,
  Variant,
  VariantOption,
} from "../../../types/Product.types";
import { useWishlistStore } from "@/app/store/cartStore";
import ZoomModal from "./ZoomModal";

// ─────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────

interface ProductVariant {
  _id: string;

  title?: string;

  sku?: string;
  barcode?: string;

  price: number;
  originalPrice?: number | null;

  stock?: number | null;

  weightGrams?: number;

  isDefault: boolean;
  isActive: boolean;

  options?: Record<string, string>;

  images?: {
    src: string;
    alt: string;
  }[];
}

interface ProductOption {
  name: string; // "Size", "Metal"
  values: string[];
}

interface ExtendedProduct extends Product {
  sizeChartImage?: string;
  offerBannerImage?: string;
  ourPromise?: string;
  shortDescription?: string;
  variants?: Variant[];
  options?: VariantOption[];
}

// ─────────────────────────────────────────────────────────────────
// TRUST BADGES
// ─────────────────────────────────────────────────────────────────
const TRUST = [
  { icon: <Shield size={14} />, label: "Anti-Tarnish & Water Proof" },
  { icon: <Heart size={14} />, label: "50K+ Satisfied Customers" },
  { icon: <RefreshCw size={14} />, label: "07-Day Returns" },
  { icon: <Truck size={14} />, label: "Free Shipping" },
];

// ─────────────────────────────────────────────────────────────────
// PROPS
// ─────────────────────────────────────────────────────────────────
interface Props {
  product: ExtendedProduct;
  collectionSlug?: string;
  collectionName?: string;
  /** Now receives an optional variantId as 3rd arg */
  onAddToCart?: (size: string, qty: number, variantId?: string) => void;
  onBuyNow?: (size: string, qty: number, variantId?: string) => void;
}

// ─────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────

/**
 * Given the current option selections, find the matching variant.
 * Selections is a Map of { optionName -> selectedValue }.
 */
function findMatchingVariant(
  variants: ProductVariant[],
  selections: Record<string, string>,
): ProductVariant | null {
  if (!variants.length) return null;
  return (
    variants.find((v) => {
      if (!v.options) return false;
      return Object.entries(selections).every(
        ([key, val]) => v.options![key] === val,
      );
    }) ?? null
  );
}

/** Returns true if a specific option value is available given current sibling selections */
function isOptionValueAvailable(
  variants: ProductVariant[],
  optionName: string,
  value: string,
  currentSelections: Record<string, string>,
): boolean {
  // Build a hypothetical selection with this value substituted in
  const hypothetical = { ...currentSelections, [optionName]: value };
  // A value is available if at least one active, in-stock variant matches
  return variants.some((v) => {
    if (!v.isActive && v.isActive !== undefined) return false;
    if (v.stock !== null && v.stock !== undefined && v.stock <= 0) return false;
    return Object.entries(hypothetical).every(
      ([k, val]) => v.options?.[k] === val,
    );
  });
}

function formatPrice(num: number): string {
  return `₹${num.toLocaleString("en-IN")}`;
}

function discountPct(
  price: number,
  original: number | null | undefined,
): number {
  if (!original || original <= price) return 0;
  return Math.round((1 - price / original) * 100);
}

// ─────────────────────────────────────────────────────────────────
// SIZE CHART MODAL
// ─────────────────────────────────────────────────────────────────
function SizeChartModal({
  imageUrl,
  onClose,
}: {
  imageUrl: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9998] flex items-end sm:items-center justify-center p-0 sm:p-6"
        style={{ background: "rgba(0,0,0,0.6)", backdropFilter: "blur(6px)" }}
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="relative w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden"
          style={{ background: "#fff", maxHeight: "90vh" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex items-center justify-between px-6 py-4"
            style={{
              background: "var(--rj-emerald)",
              borderBottom: "1px solid rgba(252,193,81,0.2)",
            }}
          >
            <div className="flex items-center gap-2.5">
              <Ruler size={16} style={{ color: "var(--rj-gold)" }} />
              <div>
                <p
                  className="font-cinzel text-[9px] tracking-widest uppercase"
                  style={{ color: "rgba(252,193,81,0.6)" }}
                >
                  Size Reference
                </p>
                <h3 className="font-cormorant text-lg font-light text-white leading-tight">
                  Size Chart
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:opacity-70"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <X size={14} />
            </button>
          </div>
          <div
            className="overflow-y-auto"
            style={{ maxHeight: "calc(90vh - 72px)" }}
          >
            {imageUrl ? (
              <div className="relative w-full" style={{ minHeight: 320 }}>
                <Image
                  src={imageUrl}
                  alt="Size Chart"
                  fill
                  className="object-contain"
                  sizes="(max-width: 640px) 100vw, 512px"
                  style={{ padding: "1rem" }}
                />
              </div>
            ) : (
              <div className="p-6">
                <p
                  className="font-cinzel text-[10px] tracking-widest uppercase font-bold mb-4"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  How to Measure
                </p>
                <div className="flex flex-col gap-3">
                  {[
                    {
                      step: "01",
                      title: "Use a flexible measuring tape",
                      desc: "Wrap the tape around your wrist where you want to wear the kada — snug but not tight.",
                    },
                    {
                      step: "02",
                      title: "Note the measurement in mm",
                      desc: "Standard sizes: S = 58mm, M = 60mm, L = 62mm, XL = 65mm",
                    },
                    {
                      step: "03",
                      title: "Add 5–10mm for comfort",
                      desc: "For a comfortable fit, add 5mm to your exact measurement.",
                    },
                  ].map((s) => (
                    <div
                      key={s.step}
                      className="flex gap-3 p-4 rounded-xl"
                      style={{
                        background: "rgba(0,55,32,0.04)",
                        border: "1px solid rgba(0,55,32,0.08)",
                      }}
                    >
                      <span
                        className="font-cormorant text-2xl font-light flex-shrink-0"
                        style={{ color: "var(--rj-gold)", lineHeight: 1 }}
                      >
                        {s.step}
                      </span>
                      <div>
                        <p
                          className="font-cinzel text-[10px] tracking-wider font-bold mb-0.5"
                          style={{ color: "var(--rj-charcoal)" }}
                        >
                          {s.title}
                        </p>
                        <p
                          className="text-xs"
                          style={{
                            color: "var(--rj-ash)",
                            fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                          }}
                        >
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <p
                  className="font-cinzel text-[9px] tracking-wider text-center mt-4"
                  style={{ color: "var(--rj-ash)" }}
                >
                  Still unsure? WhatsApp us at +91 84485 81529
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// OFFER BANNER
// ─────────────────────────────────────────────────────────────────
function OfferBanner({ imageUrl }: { imageUrl: string }) {
  if (!imageUrl) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full overflow-hidden rounded-2xl mb-6"
      style={{ aspectRatio: "3/1", minHeight: 80 }}
    >
      <Image
        src={imageUrl}
        alt="Special Offer"
        fill
        className="object-cover"
        sizes="(max-width:1024px) 100vw, 50vw"
      />
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// OUR PROMISE BLOCK
// ─────────────────────────────────────────────────────────────────
function ShortDescriptionBlock({ text }: { text: string }) {
  if (!text) return null;
  const lines = text.split("\n").filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="mb-6 p-5 rounded-2xl"
      style={{
        background: "rgba(0,55,32,0.04)",
        border: "1px solid rgba(0,55,32,0.1)",
      }}
    >
      <div className="flex items-center gap-2 mb-3">
        <Info size={13} style={{ color: "var(--rj-emerald)" }} />
        <p
          className="font-cinzel text-[9px] tracking-widest uppercase font-bold"
          style={{ color: "var(--rj-emerald)" }}
        >
          Our Promise
        </p>
      </div>
      <ul className="flex flex-col gap-2">
        {lines.map((line, i) => (
          <li key={i} className="flex items-start gap-2.5">
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5"
              style={{ background: "var(--rj-gold)" }}
            />
            <span
              className="text-sm leading-relaxed"
              style={{
                color: "var(--rj-ash)",
                fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                lineHeight: "1.7",
              }}
            >
              {line.replace(/^[-•*]\s*/, "")}
            </span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// BREADCRUMB
// ─────────────────────────────────────────────────────────────────
function Breadcrumb({
  product,
  collectionSlug,
  collectionName,
}: {
  product: ExtendedProduct;
  collectionSlug: string;
  collectionName: string;
}) {
  const crumbs = [
    { label: "Home", href: "/" },
    // { label: collectionName, href: `/collections/${collectionSlug}` },
    { label: "Products", href: "/products" },
    { label: product.name, href: null },
  ];
  return (
    <nav
      className="flex items-center gap-1.5 mb-8 flex-wrap"
      aria-label="Breadcrumb"
    >
      {crumbs.map((crumb, i) => (
        <span key={i} className="flex items-center gap-1.5 min-w-0">
          {crumb.href ? (
            <>
              <Link
                href={crumb.href}
                className="font-cinzel text-[9px] tracking-widest uppercase transition-opacity hover:opacity-60 whitespace-nowrap"
                style={{ color: "var(--rj-ash)" }}
              >
                {crumb.label}
              </Link>
              <Chevron
                size={10}
                style={{ color: "var(--rj-bone)", flexShrink: 0 }}
              />
            </>
          ) : (
            <span
              className="font-cinzel text-[9px] tracking-widest uppercase truncate max-w-[160px] sm:max-w-xs"
              style={{ color: "var(--rj-emerald)" }}
              title={crumb.label}
            >
              {crumb.label}
            </span>
          )}
        </span>
      ))}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────
// VARIANT OPTION SELECTOR
// ─────────────────────────────────────────────────────────────────
function VariantSelector({
  options,
  variants,
  selections,
  onSelect,
  selectionError,
  onSizeGuide,
}: {
  options: ProductOption[];
  variants: ProductVariant[];
  selections: Record<string, string>;
  onSelect: (optionName: string, value: string) => void;
  selectionError: boolean;
  onSizeGuide: () => void;
}) {
  if (!options.length) return null;

  return (
    <div className="mb-6 flex flex-col gap-5">
      {options.map((option) => {
        const isSizeAxis =
          option.name.toLowerCase().includes("size") ||
          option.name.toLowerCase().includes("length");

        return (
          <div key={option.name}>
            {/* Label row */}
            <div className="flex items-center justify-between mb-3">
              <p
                className="font-cinzel text-[11px] tracking-widest uppercase font-bold"
                style={{
                  color:
                    selectionError && !selections[option.name]
                      ? "#ef4444"
                      : "var(--rj-charcoal)",
                }}
              >
                {selectionError && !selections[option.name]
                  ? `Select a ${option.name}`
                  : selections[option.name]
                    ? `${option.name}: ${selections[option.name]}`
                    : option.name}
              </p>
              {isSizeAxis && (
                <button
                  onClick={onSizeGuide}
                  className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-70"
                  style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
                >
                  <Ruler size={11} /> Size Guide
                </button>
              )}
            </div>

            {/* Option chips */}
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => {
                const available = isOptionValueAvailable(
                  variants,
                  option.name,
                  value,
                  selections,
                );
                const selected = selections[option.name] === value;

                // Decide chip shape: circular for short size labels, pill for longer values
                const isShort = value.length <= 4;

                return (
                  <motion.button
                    key={value}
                    disabled={!available}
                    onClick={() => onSelect(option.name, value)}
                    whileTap={available ? { scale: 0.95 } : {}}
                    className="relative font-cinzel text-xs transition-all duration-200"
                    style={{
                      minWidth: isShort ? "3rem" : undefined,
                      height: "2.75rem",
                      padding: isShort ? "0" : "0 1rem",
                      borderRadius: isShort ? "50%" : "2rem",
                      width: isShort ? "3rem" : undefined,
                      border: `2px solid ${selected
                          ? "var(--rj-emerald)"
                          : selectionError && !selections[option.name]
                            ? "#fca5a5"
                            : "var(--rj-bone)"
                        }`,
                      background: selected
                        ? "var(--rj-emerald)"
                        : "transparent",
                      color: selected
                        ? "#fff"
                        : available
                          ? "var(--rj-charcoal)"
                          : "var(--rj-bone)",
                      opacity: available ? 1 : 0.4,
                      cursor: available ? "pointer" : "not-allowed",
                      transform: selected ? "scale(1.06)" : "scale(1)",
                    }}
                  >
                    {value}
                    {/* Strike-through for unavailable */}
                    {!available && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-full">
                        <div
                          className="w-full h-px rotate-45"
                          style={{ background: "var(--rj-bone)" }}
                        />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// ACTIVE VARIANT SUMMARY PILL
// ─────────────────────────────────────────────────────────────────
function VariantSummary({ variant }: { variant: ProductVariant }) {
  const disc = discountPct(variant.price, variant.originalPrice);
  return (
    <motion.div
      key={variant._id}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="flex items-center gap-3 mb-5 px-4 py-3 rounded-2xl flex-wrap"
      style={{
        background: "rgba(0,55,32,0.05)",
        border: "1px solid rgba(0,55,32,0.12)",
      }}
    >
      <span
        className="font-cinzel font-bold text-xl"
        style={{ color: "var(--rj-charcoal)" }}
      >
        {formatPrice(variant.price)}
      </span>
      {variant.originalPrice && (
        <span
          className="font-body text-sm line-through"
          style={{ color: "var(--rj-ash)" }}
        >
          {formatPrice(variant.originalPrice)}
        </span>
      )}
      {disc > 0 && (
        <span
          className="font-cinzel text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: "#fef2f2", color: "#ef4444" }}
        >
          {disc}% OFF
        </span>
      )}
      {variant.stock !== null &&
        variant.stock !== undefined &&
        variant.stock <= 5 &&
        variant.stock > 0 && (
          <span
            className="font-cinzel text-[9px] tracking-wider px-2.5 py-1 rounded-full ml-auto"
            style={{ background: "rgba(251,146,60,0.1)", color: "#ea580c" }}
          >
            Only {variant.stock} left
          </span>
        )}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function ProductDetailHero({
  product,
  collectionSlug = "",
  collectionName = "",
  onAddToCart,
  onBuyNow,
}: Props) {
  const hasVariants =
    Array.isArray(product.variants) && product.variants.length > 0;
  const hasOptions =
    Array.isArray(product.options) && product.options.length > 0;

  // ── Variant selection state ──
  // Initialise with default variant's option values (or empty)
  const defaultVariant = hasVariants
    ? (product.variants!.find((v) => v.isDefault && v.isActive !== false) ??
      product.variants![0])
    : null;

  const buildInitialSelections = (): Record<string, string> => {
    if (!defaultVariant?.options) return {};
    // options is a Map on the API, but after JSON serialisation it becomes a plain object
    return { ...(defaultVariant.options as Record<string, string>) };
  };

  const [selections, setSelections] = useState<Record<string, string>>(
    buildInitialSelections,
  );

  // Derived: currently matched variant
  const activeVariant: ProductVariant | null = hasVariants
    ? findMatchingVariant(product.variants!, selections)
    : null;

  // ── Image gallery ──
  // If the active variant has its own images, show those; else fall back to product images
  const variantImages =
    activeVariant?.images && activeVariant.images.length > 0
      ? activeVariant.images
      : null;


  const galleryImages : any[] = [];
  const variantImageMap = new Map<string, number>();

  product.variants?.forEach((variant) => {
    if (variant.images?.length) {
      variantImageMap.set(variant._id, galleryImages.length);

      galleryImages.push(...variant.images);
    }
  });

  const [imgIdx, setImgIdx] = useState(0);
    const images = galleryImages;

  // Reset image index when the image source set changes
  // useEffect(() => setImgIdx(0), [activeVariant?._id]);


  useEffect(() => {
  if (!activeVariant?._id) return;

  const index = variantImageMap.get(activeVariant._id);

  if (index !== undefined) {
    setImgIdx(index);
  }
}, [activeVariant?._id]);

  // ── UI state ──
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectionError, setSelectionError] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);

  const { toggleItem, isWishlisted } = useWishlistStore();
  const wishlisted = isWishlisted(product.id);

  const prevImg = useCallback(
    () => setImgIdx((i) => (i - 1 + images.length) % images.length),
    [images.length],
  );
  const nextImg = useCallback(
    () => setImgIdx((i) => (i + 1) % images.length),
    [images.length],
  );

  // ── Price display (no-variant path uses product-level price strings) ──
  const displayPriceNum = activeVariant
    ? activeVariant.price
    : parseInt((product.price ?? "0").replace(/[^\d]/g, ""), 10);
  const displayOriginalPriceNum = activeVariant
    ? (activeVariant.originalPrice ?? null)
    : product.originalPrice
      ? parseInt(product.originalPrice.replace(/[^\d]/g, ""), 10)
      : null;
  const displayDiscount = discountPct(displayPriceNum, displayOriginalPriceNum);

  // ── Handlers ──
  const handleSelect = (optionName: string, value: string) => {
    setSelections((prev) => ({ ...prev, [optionName]: value }));
    setSelectionError(false);
  };

  const allOptionsSelected = hasOptions
    ? (product.options ?? []).every((o) => selections[o.name])
    : true;

  const validateAndProceed = (): boolean => {
    // For variant products, all options must be chosen
    if (hasOptions && !allOptionsSelected) {
      setSelectionError(true);
      setTimeout(() => setSelectionError(false), 2500);
      return false;
    }
    // For non-variant products with sizes, require size selection
    if (!hasVariants && product.sizes && product.sizes.length > 0) {
      // sizes are handled via the old path — nothing to check here
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateAndProceed()) return;
    setAddedToCart(true);
    // Pass variant id if available; fall back to first active size
    onAddToCart?.(activeVariant?.title ?? "", qty, activeVariant?._id);
    setTimeout(() => setAddedToCart(false), 2500);
  };

  const handleBuyNow = () => {
    if (!validateAndProceed()) return;
    onBuyNow?.(activeVariant?.title ?? "", qty, activeVariant?._id);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      subtitle: product.subtitle,
      image: product.images[0]?.src || "",
      priceNum: displayPriceNum,
      originalPriceNum: displayOriginalPriceNum,
      href: product.href,
      category: product.category,
      tag: product.tag,
    });
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { }
  };

  const breadcrumbCollectionSlug =
    collectionSlug ||
    (product.category ?? "").toLowerCase().replace(/\s+/g, "-");
  const breadcrumbCollectionName =
    collectionName || product.category || "Collection";

  console.log("Active variant:", activeVariant);
  console.log("Variant images:", activeVariant?.images ?? product.images);

  // Stock check for CTA disable
  const outOfStock =
    activeVariant !== null &&
    activeVariant.stock !== null &&
    activeVariant.stock !== undefined &&
    activeVariant.stock <= 0;

  console.log(product);

  return (
    <>
      {zoomed && (
        <ZoomModal
          images={galleryImages}
          currentIndex={imgIdx}
          setCurrentIndex={setImgIdx}
          onClose={() => setZoomed(false)}
        />
      )}

      {sizeChartOpen && (
        <SizeChartModal
          imageUrl={product.sizeChartImage || ""}
          onClose={() => setSizeChartOpen(false)}
        />
      )}

      <section
        className="pt-12 pb-24"
        style={{ background: "var(--rj-ivory)" }}
      >
        <div className="container-rj">
          <Breadcrumb
            product={product}
            collectionSlug={breadcrumbCollectionSlug}
            collectionName={breadcrumbCollectionName}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-start">
            {/* ══ LEFT: Image Gallery ══ */}
            <div className="flex flex-col gap-3 lg:sticky lg:top-24">
              <div
                className="relative overflow-hidden rounded-2xl group"
                style={{
                  aspectRatio: "1/1",
                  background: "var(--rj-ivory-dark)",
                  cursor: "zoom-in",
                }}
                onClick={() => setZoomed(true)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${activeVariant?._id ?? "base"}-${imgIdx}`}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.28 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={galleryImages[imgIdx]?.src}
                      alt={galleryImages[imgIdx]?.alt ?? product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width:1024px) 100vw, 50vw"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full font-cinzel text-[9px] tracking-wider"
                    style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}
                  >
                    <ZoomIn size={11} /> Zoom
                  </div>
                </div>

                {product.tag && (
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span
                      className="font-cinzel text-[9px] font-bold tracking-widest px-3 py-1 rounded-full"
                      style={{ background: "var(--rj-gold)", color: "#000" }}
                    >
                      {product.tag}
                    </span>
                  </div>
                )}

                <button
                  onClick={handleToggleWishlist}
                  className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                  style={{
                    background: wishlisted
                      ? "rgba(252,193,81,0.15)"
                      : "rgba(255,255,255,0.92)",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
                    cursor: "pointer",
                    border: wishlisted
                      ? "1.5px solid rgba(252,193,81,0.4)"
                      : "1.5px solid transparent",
                  }}
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    size={15}
                    style={{
                      fill: wishlisted ? "var(--rj-gold)" : "transparent",
                      color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                      transition: "all 0.25s",
                    }}
                  />
                </button>

                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImg();
                      }}
                      className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }}
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImg();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                      style={{
                        background: "rgba(255,255,255,0.92)",
                        color: "var(--rj-charcoal)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.15)",
                        cursor: "pointer",
                      }}
                    >
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
              </div>

              {galleryImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setImgIdx(i)}
                      className="relative flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        width: 72,
                        height: 72,
                        border: `2px solid ${i === imgIdx ? "var(--rj-emerald)" : "transparent"}`,
                        background: "var(--rj-ivory-dark)",
                        cursor: "pointer",
                        opacity: i === imgIdx ? 1 : 0.6,
                      }}
                    >
                      <Image
                        src={img.src}
                        alt={img.alt ?? ""}
                        fill
                        className="object-cover"
                        sizes="72px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ══ RIGHT: Product Details ══ */}
            <div className="flex flex-col">
              {/* Category + purity pills */}
              <div className="flex items-center gap-3 mb-3">
                {product.category && (
                  <Link
                    href={`/collections/${breadcrumbCollectionSlug}`}
                    className="font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full transition-opacity hover:opacity-70"
                    style={{
                      background: "rgba(0,55,32,0.08)",
                      color: "var(--rj-emerald)",
                      cursor: "pointer",
                    }}
                  >
                    {breadcrumbCollectionName}
                  </Link>
                )}

                <span
                  className="relative font-cinzel text-[9px] tracking-widest uppercase px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(252,193,81,0.1)",
                    color: "#a07800",
                  }}
                >
                  Rehnoor Jewels{" "}
                  {/* {product.tag && (
                    <div className="absolute top-0 left-27 z-10 pointer-events-none">
                      <span
                        className="font-cinzel text-[5px] font-bold tracking-widest px-3 py-1 rounded-full"
                        style={{ background: "var(--rj-gold)", color: "#000" }}
                      >
                        {product.tag}
                      </span>
                    </div>
                  )} */}
                </span>
              </div>

              <h1
                className="font-cormorant font-light leading-tight mb-2"
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  color: "var(--rj-charcoal)",
                  letterSpacing: "-0.01em",
                }}
              >
                {product.name}
              </h1>

              <p
                className="mb-4"
                style={{
                  color: "var(--rj-ash)",
                  fontSize: "0.95rem",
                  fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                }}
              >
                {product.subtitle}
              </p>

              {product.rating && product.rating > 0 && (
                <div
                  className="flex items-center gap-3 mb-5 pb-5"
                  style={{ borderBottom: "1px solid var(--rj-bone)" }}
                >
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        style={{
                          fill:
                            i < Math.floor(product.rating!)
                              ? "var(--rj-gold)"
                              : "transparent",
                          color:
                            i < Math.floor(product.rating!)
                              ? "var(--rj-gold)"
                              : "var(--rj-bone)",
                        }}
                      />
                    ))}
                  </div>
                  <span
                    className="font-cinzel text-xs font-bold"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {product.rating.toFixed(1)}
                  </span>
                  {product.reviewCount && product.reviewCount > 0 && (
                    <a
                      href="#reviews"
                      className="font-cinzel text-[10px] tracking-wider transition-opacity hover:opacity-60"
                      style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
                    >
                      ({product.reviewCount} reviews)
                    </a>
                  )}
                </div>
              )}

              {/* ── Price block ── */}
              {/* Show per-variant price in the summary pill; otherwise show base price */}
              {activeVariant ? (
                <VariantSummary variant={activeVariant} />
              ) : (
                <div className="flex items-baseline gap-3 flex-wrap mb-6">
                  <span
                    className="font-cinzel font-bold"
                    style={{ fontSize: "2rem", color: "var(--rj-charcoal)" }}
                  >
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span
                      className="font-body text-base line-through"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {product.originalPrice}
                    </span>
                  )}
                  {displayDiscount > 0 && (
                    <span
                      className="font-cinzel text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: "#fef2f2", color: "#ef4444" }}
                    >
                      {displayDiscount}% OFF
                    </span>
                  )}
                </div>
              )}

              <OfferBanner imageUrl={product.offerBannerImage || ""} />

              {/* ── VARIANT SELECTORS (new) ── */}
              {hasVariants && hasOptions && (
                <VariantSelector
                  options={product.options!}
                  variants={product.variants!}
                  selections={selections}
                  onSelect={handleSelect}
                  selectionError={selectionError}
                  onSizeGuide={() => setSizeChartOpen(true)}
                />
              )}

              {/* ── Legacy size picker (for products with sizes[] but no variants) ── */}
              {!hasVariants && product.sizes && product.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <p
                      className="font-cinzel text-[11px] tracking-widest uppercase font-bold"
                      style={{
                        color: selectionError
                          ? "#ef4444"
                          : "var(--rj-charcoal)",
                      }}
                    >
                      {selectionError ? "Please select a size" : "Size"}
                    </p>
                    <button
                      onClick={() => setSizeChartOpen(true)}
                      className="flex items-center gap-1.5 font-cinzel text-[9px] tracking-wider uppercase transition-all hover:opacity-70"
                      style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
                    >
                      <Ruler size={11} /> Size Guide
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((s) => (
                      <button
                        key={s.label}
                        disabled={!s.available}
                        onClick={() => handleSelect("size", s.label)}
                        className="relative font-cinzel text-xs transition-all duration-200 hover:scale-105"
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "50%",
                          border: `2px solid ${selections["size"] === s.label ? "var(--rj-emerald)" : "var(--rj-bone)"}`,
                          background:
                            selections["size"] === s.label
                              ? "var(--rj-emerald)"
                              : "transparent",
                          color:
                            selections["size"] === s.label
                              ? "#fff"
                              : s.available
                                ? "var(--rj-charcoal)"
                                : "var(--rj-bone)",
                          opacity: s.available ? 1 : 0.4,
                          cursor: s.available ? "pointer" : "not-allowed",
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Qty + Add to cart ── */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center rounded-full flex-shrink-0"
                  style={{ border: "1.5px solid var(--rj-bone)" }}
                >
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    className="w-11 h-11 flex items-center justify-center text-lg font-light transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                  >
                    −
                  </button>
                  <span
                    className="w-8 text-center font-cinzel text-sm"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    {qty}
                  </span>
                  <button
                    onClick={() =>
                      setQty((q) => Math.min(q + 1, activeVariant?.stock ?? 99))
                    }
                    className="w-11 h-11 flex items-center justify-center text-lg font-light transition-colors hover:bg-[var(--rj-ivory-dark)] rounded-full"
                    style={{ color: "var(--rj-charcoal)", cursor: "pointer" }}
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={outOfStock}
                  className="flex-1 flex items-center justify-center gap-2 py-3 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 active:scale-95"
                  style={{
                    background: outOfStock
                      ? "var(--rj-bone)"
                      : addedToCart
                        ? "var(--rj-emerald)"
                        : "var(--gradient-gold)",
                    color: outOfStock
                      ? "var(--rj-ash)"
                      : addedToCart
                        ? "#fff"
                        : "var(--rj-emerald)",
                    boxShadow: outOfStock
                      ? "none"
                      : addedToCart
                        ? "0 4px 20px rgba(0,55,32,0.25)"
                        : "0 4px 20px rgba(252,193,81,0.3)",
                    cursor: outOfStock ? "not-allowed" : "pointer",
                  }}
                >
                  {outOfStock ? (
                    "Out of Stock"
                  ) : addedToCart ? (
                    <>
                      <Check size={14} /> Added!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={14} />{" "}
                      <span className="hidden sm:inline">Add to Cart</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleToggleWishlist}
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
                  style={{
                    border: wishlisted
                      ? "1.5px solid rgba(252,193,81,0.5)"
                      : "1.5px solid var(--rj-bone)",
                    background: wishlisted
                      ? "rgba(252,193,81,0.08)"
                      : "transparent",
                    cursor: "pointer",
                  }}
                  aria-label={
                    wishlisted ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    size={15}
                    style={{
                      fill: wishlisted ? "var(--rj-gold)" : "transparent",
                      color: wishlisted ? "var(--rj-gold)" : "var(--rj-ash)",
                      transition: "all 0.25s",
                    }}
                  />
                </button>

                <button
                  onClick={handleShare}
                  className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-110"
                  style={{
                    border: "1.5px solid var(--rj-bone)",
                    cursor: "pointer",
                  }}
                  aria-label="Share"
                >
                  {copied ? (
                    <Check size={14} style={{ color: "var(--rj-emerald)" }} />
                  ) : (
                    <Share2 size={14} style={{ color: "var(--rj-ash)" }} />
                  )}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={outOfStock}
                className="w-full py-3 font-cinzel text-[11px] tracking-widest uppercase font-bold rounded-full transition-all duration-300 hover:opacity-90 active:scale-95 mb-6"
                style={{
                  background: outOfStock
                    ? "var(--rj-bone)"
                    : "var(--rj-charcoal)",
                  color: outOfStock ? "var(--rj-ash)" : "#fff",
                  cursor: outOfStock ? "not-allowed" : "pointer",
                }}
              >
                {outOfStock ? "Currently Unavailable" : "Buy It Now"}
              </button>

              {product.shortDescription && (
                <p
                  className="text-sm leading-relaxed mb-6"
                  style={{
                    color: "var(--rj-ash)",
                    fontFamily: "var(--font-body,'DM Sans'),sans-serif",
                  }}
                >
                  {product.shortDescription}
                </p>
              )}

              <ShortDescriptionBlock
                text={product.ourPromise || product.shortDescription || ""}
              />

              <div
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6"
                style={{ borderTop: "1px solid var(--rj-bone)" }}
              >
                {TRUST.map((t) => (
                  <div
                    key={t.label}
                    className="flex flex-col items-center gap-1.5 text-center"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border border-[var(--rj-emerald)]"
                      style={{ background: "rgba(0,55,32,0.06)" }}
                    >
                      <span style={{ color: "var(--rj-emerald)" }}>
                        {t.icon}
                      </span>
                    </div>
                    <span
                      className="font-cinzel text-[9px] tracking-wider"
                      style={{ color: "var(--rj-ash)" }}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
