"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  User,
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
} from "lucide-react";
import { navItems, type NavItem, type NavCategory } from "@/app/nav-data";
import { useCartStore, useWishlistStore } from "@/app/store/cartStore";

function IconWithBadge({
  href,
  icon,
  count,
  label,
  badgeColor = "gold",
  className = "",
}: {
  href: string;
  icon: React.ReactNode;
  count: number;
  label: string;
  badgeColor?: "gold" | "red";
  className?: string;
}) {
  const colors = {
    gold: { bg: "var(--rj-gold)", text: "var(--rj-emerald)" },
    red: { bg: "#ef4444", text: "#fff" },
  }[badgeColor];

  // count is always 0 pre-mount (masked in parent), so this is
  // safe: server renders "Cart", client renders "Cart (N)" only after mount
  const ariaLabel = count > 0 ? `${label} (${count})` : label;

  return (
    <Link
      href={href}
      className={`relative group p-2 hover:text-[var(--rj-gold)] transition-colors duration-300 ${className}`}
      aria-label={ariaLabel}
      style={{ cursor: "pointer" }}
    >
      {icon}

      {/*
        Badge: only rendered after mount to avoid hydration mismatch.
        AnimatePresence handles the enter/exit spring animation.
      */}
      <AnimatePresence>
        {count > 0 && (
          <motion.span
            key="badge"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 22 }}
            className="absolute -top-1 -right-1 min-w-[16px] h-4 rounded-full flex items-center justify-center font-cinzel font-bold"
            style={{
              background: colors.bg,
              color: colors.text,
              fontSize: "9px",
              padding: "0 3px",
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────
// MEGA MENU
// ─────────────────────────────────────────────────────────────────
function CategoryColumn({
  category,
  onClose,
}: {
  category: NavCategory;
  onClose: () => void;
}) {
  return (
    <div>
      <Link
        href={category.href}
        onClick={onClose}
        className="label-accent text-[var(--rj-emerald)] block mb-4 hover:text-[var(--rj-gold)] transition-colors"
      >
        {category.label}
      </Link>
      <div className="w-8 h-px bg-[var(--rj-gold)] mb-4" />
      <ul className="space-y-2">
        {category.items.map((sub) => (
          <li key={sub.label}>
            <Link
              href={sub.href}
              onClick={onClose}
              className="flex items-center gap-2 text-sm text-[var(--rj-charcoal)] hover:text-[var(--rj-emerald)] transition-colors py-1 group"
            >
              <span className="w-0 h-px bg-[var(--rj-gold)] transition-all duration-300 group-hover:w-3" />
              {sub.label}
              {sub.isNew && (
                <span className="badge-gold text-[9px] px-1.5 py-0.5">New</span>
              )}
              {sub.isBestseller && (
                <span className="badge-emerald text-[9px] px-1.5 py-0.5">
                  ★
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MegaMenuPanel({
  item,
  onClose,
}: {
  item: NavItem;
  onClose: () => void;
}) {
  if (!item.categories) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="absolute top-full left-0 w-full bg-white shadow-2xl border-t-2 border-[var(--rj-gold)]"
      style={{ zIndex: 99 }}
    >
      <div className="container-rj py-10">
        <div
          className="grid gap-8"
          style={{
            gridTemplateColumns: `repeat(${Math.min(item.categories.length, 4)}, 1fr)${item.categories.some((c) => c.featuredImage) ? " 260px" : ""}`,
          }}
        >
          {item.categories.map((category) => (
            <CategoryColumn
              key={category.label}
              category={category}
              onClose={onClose}
            />
          ))}
          {item.categories.some((c) => c.featuredImage) && (
            <div className="relative overflow-hidden rounded-lg bg-[var(--rj-ivory-dark)] group">
              <Image
                src={
                  item.categories.find((c) => c.featuredImage)!.featuredImage!
                }
                alt="Featured"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--rj-emerald)] via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <p className="label-accent text-[var(--rj-gold)] mb-1">
                  Featured
                </p>
                <p className="font-cormorant text-white text-lg leading-tight">
                  {item.categories.find((c) => c.featuredImage)?.featuredLabel}
                </p>
                <Link
                  href={
                    item.categories.find((c) => c.featuredImage)
                      ?.featuredhref || "#"
                  }
                  onClick={onClose}
                  className="mt-3 btn-outline text-xs py-2 px-4"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────
// MOBILE MENU
// ─────────────────────────────────────────────────────────────────
function MobileMenu({
  isOpen,
  onClose,
  cartCount,
  wishlistCount,
}: {
  isOpen: boolean;
  onClose: () => void;
  cartCount: number;
  wishlistCount: number;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[98]"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-105 overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--rj-bone)]">
              <div>
                {/* <p className="font-cinzel font-bold text-[var(--rj-emerald)] text-lg tracking-widest">
                  REHNOOR
                </p>
                <p className="text-[var(--rj-gold)] font-cinzel text-[9px] tracking-[0.3em] uppercase mt-0.5">
                  Gold Reimagined
                </p> */}
                <Image
                  src="/logo-transparent.png" // 👈 from public folder
                  alt="Rehnoor Jewels logo image"
                  width={70} // adjust based on your logo
                  height={40}
                  priority
                  className="object-contain"
                />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:text-[var(--rj-gold)] transition-colors"
                style={{ cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="px-6 py-4 flex-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-[var(--rj-bone)]"
                >
                  {item.hasMegaMenu ? (
                    <button
                      onClick={() =>
                        setExpanded(expanded === item.label ? null : item.label)
                      }
                      className="w-full flex items-center justify-between py-4 text-sm font-medium font-cinzel tracking-widest uppercase text-[var(--rj-charcoal)]"
                      style={{ cursor: "pointer" }}
                    >
                      {item.label}
                      <motion.span
                        animate={{ rotate: expanded === item.label ? 180 : 0 }}
                      >
                        <ChevronDown size={16} />
                      </motion.span>
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      onClick={onClose}
                      className="flex items-center justify-between py-4 text-sm font-medium font-cinzel tracking-widest uppercase text-[var(--rj-charcoal)]"
                      style={{ cursor: "pointer" }}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="badge-gold">{item.badge}</span>
                      )}
                    </Link>
                  )}

                  <AnimatePresence>
                    {expanded === item.label && item.categories && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-4 space-y-3">
                          {item.categories.map((cat) => (
                            <div key={cat.label} className="ml-4">
                              <p className="label-accent text-[var(--rj-emerald)] text-[9px] mb-2 mt-3">
                                {cat.label}
                              </p>
                              {cat.items.slice(0, 5).map((sub) => (
                                <Link
                                  key={sub.label}
                                  href={sub.href}
                                  onClick={onClose}
                                  className="block py-1.5 text-sm text-[var(--rj-ash)] hover:text-[var(--rj-emerald)] transition-colors"
                                  style={{ cursor: "pointer" }}
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* ── Mobile footer — Cart + Wishlist badges + account ── */}
            <div className="px-6 py-6 border-t border-[var(--rj-bone)] space-y-3 mt-auto">
              {/* Cart row */}
              <Link
                href="/cart"
                onClick={onClose}
                className="flex items-center justify-between py-3 px-4 rounded-xl transition-all"
                style={{
                  background: "rgba(0,55,32,0.05)",
                  border: "1px solid rgba(0,55,32,0.1)",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag
                    size={18}
                    style={{ color: "var(--rj-emerald)" }}
                  />
                  <span
                    className="font-cinzel text-sm tracking-wider"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Shopping Cart
                  </span>
                </div>
                {cartCount > 0 ? (
                  <motion.span
                    key={cartCount}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-cinzel font-bold text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--rj-emerald)",
                      color: "var(--rj-gold)",
                    }}
                  >
                    {cartCount} item{cartCount !== 1 ? "s" : ""}
                  </motion.span>
                ) : (
                  <span
                    className="font-cinzel text-[10px] tracking-wider"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    Empty
                  </span>
                )}
              </Link>

              {/* Wishlist row */}
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center justify-between py-3 px-4 rounded-xl transition-all"
                style={{
                  background: "rgba(252,193,81,0.06)",
                  border: "1px solid rgba(252,193,81,0.18)",
                  cursor: "pointer",
                }}
              >
                <div className="flex items-center gap-3">
                  <Heart
                    size={18}
                    style={{
                      fill:
                        wishlistCount > 0 ? "var(--rj-gold)" : "transparent",
                      color:
                        wishlistCount > 0 ? "var(--rj-gold)" : "var(--rj-ash)",
                      transition: "all 0.25s",
                    }}
                  />
                  <span
                    className="font-cinzel text-sm tracking-wider"
                    style={{ color: "var(--rj-charcoal)" }}
                  >
                    Wishlist
                  </span>
                </div>
                {wishlistCount > 0 ? (
                  <motion.span
                    key={wishlistCount}
                    initial={{ scale: 0.7, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="font-cinzel font-bold text-xs px-2 py-0.5 rounded-full"
                    style={{
                      background: "var(--rj-gold)",
                      color: "var(--rj-emerald)",
                    }}
                  >
                    {wishlistCount} saved
                  </motion.span>
                ) : (
                  <span
                    className="font-cinzel text-[10px] tracking-wider"
                    style={{ color: "var(--rj-ash)" }}
                  >
                    Empty
                  </span>
                )}
              </Link>

              {/* Account + phone */}
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-3 text-sm text-[var(--rj-ash)] py-2"
                style={{ cursor: "pointer" }}
              >
                <User size={16} /> My Account
              </Link>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm font-medium py-2"
                style={{ color: "var(--rj-emerald)", cursor: "pointer" }}
              >
                <Phone size={16} /> +91 98765 43210
              </a>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ─────────────────────────────────────────────────────────────────
// MAIN NAVBAR
// ─────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  // ── Hydration guard ───────────────────────────────────────────
  // Zustand persist reads localStorage — server always returns 0.
  // We must NOT expose the real count until after the client mounts
  // or React throws a hydration mismatch on aria-label, the badge
  // element, and the Heart fill attribute.
  // Always call the hooks (Rules of Hooks), but mask the value.
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const _cartCount = useCartStore((s) => s.totalItems());
  const _wishlistCount = useWishlistStore((s) => s.items.length);
  const cartCount = mounted ? _cartCount : 0;
  const wishlistCount = mounted ? _wishlistCount : 0;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseEnter = useCallback((label: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const activeItem = navItems.find((i) => i.label === activeMenu);

  return (
    <>
      <header
        ref={navRef}
        className={`sticky top-0 z-100 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.08)]"
            : "bg-white"
        }`}
      >
        <nav className="container-rj">
          <div className="flex items-center justify-between h-[82px] gap-4 sm:gap-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:text-[var(--rj-gold)] transition-colors"
              aria-label="Open menu"
              style={{ cursor: "pointer" }}
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            {/* <Link
              href="/"
              className="flex-shrink-0 flex flex-col items-start lg:items-center"
              style={{ cursor: "pointer" }}
            >
              <span className="font-cinzel font-black text-[var(--rj-emerald)] text-xl tracking-[0.25em] leading-none">
                REHNOOR
              </span>
              <span
                className="font-cinzel text-[var(--rj-gold)] leading-none mt-0.5"
                style={{ fontSize: "9px", letterSpacing: "0.35em" }}
              >
                JEWELS
              </span>
            </Link> */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center"
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/logo-transparent.png" // 👈 from public folder
                alt="Rehnoor Jewels logo image"
                width={70} // adjust based on your logo
                height={40}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <div
              className="hidden lg:flex items-center gap-1 flex-1 justify-center"
              onMouseLeave={handleMouseLeave}
            >
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() =>
                    item.hasMegaMenu && handleMouseEnter(item.label)
                  }
                >
                  {item.hasMegaMenu ? (
                    <button
                      className={`relative flex items-center gap-1 px-4 py-2 font-cinzel text-[11px] tracking-[0.2em] uppercase transition-all duration-300 ${
                        activeMenu === item.label
                          ? "text-[var(--rj-emerald)]"
                          : "text-[var(--rj-charcoal)] hover:text-[var(--rj-emerald)]"
                      }`}
                      style={{ cursor: "pointer" }}
                    >
                      {item.label}
                      <motion.span
                        animate={{
                          rotate: activeMenu === item.label ? 180 : 0,
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown size={12} />
                      </motion.span>
                      {activeMenu === item.label && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-4 right-4 h-0.5 bg-[var(--rj-gold)]"
                        />
                      )}
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className="relative flex items-center gap-1.5 px-4 py-2 font-cinzel text-[11px] tracking-[0.2em] uppercase text-[var(--rj-charcoal)] hover:text-[var(--rj-emerald)] transition-colors duration-300 hover-gold-line"
                      style={{ cursor: "pointer" }}
                    >
                      {item.label}
                      {item.badge && (
                        <span className="badge-gold">{item.badge}</span>
                      )}
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* ── Right actions ── */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {/* Search */}
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
                aria-label="Search"
                style={{ cursor: "pointer" }}
              >
                <Search size={20} />
              </button>

              {/* Wishlist — with live badge, hidden on mobile (shown in slide-out) */}
              <IconWithBadge
                href="/wishlist"
                icon={
                  <Heart
                    size={20}
                    style={{
                      fill:
                        wishlistCount > 0 ? "var(--rj-gold)" : "transparent",
                      color:
                        wishlistCount > 0 ? "var(--rj-gold)" : "currentColor",
                      transition: "all 0.3s",
                    }}
                  />
                }
                count={wishlistCount}
                label="Wishlist"
                badgeColor="gold"
                className="hidden sm:block"
              />

              {/* Account */}
              {/* <Link
                href="/account"
                className="hidden sm:block p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
                aria-label="Account"
                style={{ cursor: "pointer" }}
              >
                <User size={20} />
              </Link> */}

              {/* Cart — always visible including mobile */}
              <IconWithBadge
                href="/cart"
                icon={<ShoppingBag size={20} />}
                count={cartCount}
                label="Cart"
                badgeColor="gold"
              />

              {/*
                Mobile: show a compact wishlist heart next to cart
                (full wishlist panel is inside the slide-out menu)
              */}
              <IconWithBadge
                href="/wishlist"
                icon={
                  <Heart
                    size={20}
                    style={{
                      fill:
                        wishlistCount > 0 ? "var(--rj-gold)" : "transparent",
                      color:
                        wishlistCount > 0 ? "var(--rj-gold)" : "currentColor",
                      transition: "all 0.3s",
                    }}
                  />
                }
                count={wishlistCount}
                label="Wishlist"
                badgeColor="gold"
                className="sm:hidden"
              />
            </div>
          </div>
        </nav>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="border-t border-[var(--rj-bone)] overflow-hidden bg-white"
            >
              <div className="container-rj py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--rj-ash)]"
                  />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search for chains, rings, kadas…"
                    className="input-rj pl-12 pr-12"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--rj-ash)] hover:text-[var(--rj-charcoal)]"
                      style={{ cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2 max-w-2xl mx-auto">
                  {["Nawabi Chain", "Gold Ring", "Kada", "Bracelet"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 text-xs bg-[var(--rj-ivory-dark)] hover:bg-[var(--rj-gold-pale)] border border-[var(--rj-bone)] hover:border-[var(--rj-gold)] rounded-full transition-all duration-200"
                        style={{ cursor: "pointer" }}
                      >
                        {tag}
                      </button>
                    ),
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mega menu */}
        <div
          onMouseEnter={() => activeMenu && handleMouseEnter(activeMenu)}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence>
            {activeItem?.hasMegaMenu && (
              <MegaMenuPanel
                item={activeItem}
                onClose={() => setActiveMenu(null)}
              />
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Mobile slide-out menu — receives live counts */}
      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  );
}
