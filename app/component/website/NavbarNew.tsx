"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ShoppingBag,
  Heart,
  Menu,
  X,
  ChevronDown,
  Phone,
  Gem,
} from "lucide-react";
import { useCartStore, useWishlistStore } from "@/app/store/cartStore";

// ─────────────────────────────────────────────────────────────────
// COLLECTIONS DATA
// ─────────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Store", href: "/products" },
  {
    label: "Collections",
    href: "/collections",
    dropdown: [
      {
        group: "For Men",
        items: [
          {
            label: "Chain for Men",
            href: "/collections/chains-for-men",
            icon: "⛓",
          },
          {
            label: "Bracelet for Men",
            href: "/collections/bracelet-for-men",
            icon: "🔗",
          },
        ],
      },
      {
        group: "For Women",
        items: [
          {
            label: "Pendant for Women",
            href: "/collections/women-pendants",
            icon: "💎",
          },
          {
            label: "Necklace for Women",
            href: "/collections/women-necklaces",
            icon: "✨",
          },
        ],
      },
    ],
  },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

// ─────────────────────────────────────────────────────────────────
// ICON WITH BADGE
// ─────────────────────────────────────────────────────────────────
function IconWithBadge({
  href,
  icon,
  count,
  label,
  className = "",
}: {
  href: string;
  icon: React.ReactNode;
  count: number;
  label: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={`relative group p-2 hover:text-[var(--rj-gold)] transition-colors duration-300 ${className}`}
      aria-label={count > 0 ? `${label} (${count})` : label}
      style={{ cursor: "pointer" }}
    >
      {icon}
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
              background: "var(--rj-gold)",
              color: "var(--rj-emerald)",
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
// COLLECTIONS DROPDOWN
// ─────────────────────────────────────────────────────────────────
function CollectionsDropdown({ onClose }: { onClose: () => void }) {
  const pathname = usePathname();

  return (
    <motion.div
      initial={{ opacity: 0, y: -6, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -6, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-[420px] bg-white rounded-2xl shadow-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(0,55,32,0.1)",
        boxShadow:
          "0 20px 60px rgba(0,55,32,0.15), 0 4px 16px rgba(0,0,0,0.08)",
        zIndex: 200,
      }}
    >
      {/* Top accent bar */}
      <div
        className="h-0.5 w-full"
        style={{
          background:
            "linear-gradient(90deg, var(--rj-emerald), var(--rj-gold), var(--rj-emerald))",
        }}
      />

      <div className="grid grid-cols-2 gap-0">
        {navLinks
          .find((n) => n.label === "Collections")
          ?.dropdown?.map((group, gi) => (
            <div
              key={group.group}
              className="p-5"
              style={{
                borderRight: gi === 0 ? "1px solid rgba(0,55,32,0.08)" : "none",
                background:
                  gi === 0 ? "rgba(0,55,32,0.02)" : "rgba(252,193,81,0.03)",
              }}
            >
              {/* Group header */}
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: "var(--rj-gold)" }}
                />
                <span
                  className="font-cinzel text-[9px] tracking-[0.25em] uppercase font-bold"
                  style={{ color: "var(--rj-emerald)" }}
                >
                  {group.group}
                </span>
              </div>

              {/* Items */}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group/item"
                      style={{
                        background: isActive
                          ? "var(--rj-emerald)"
                          : "transparent",
                        cursor: "pointer",
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background =
                            "rgba(0,55,32,0.06)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.background = "transparent";
                        }
                      }}
                    >
                      <span
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0 transition-all duration-200"
                        style={{
                          background: isActive
                            ? "rgba(252,193,81,0.2)"
                            : "rgba(0,55,32,0.06)",
                        }}
                      >
                        {item.icon}
                      </span>
                      <span
                        className="font-cinzel text-[11px] tracking-wide leading-tight"
                        style={{
                          color: isActive
                            ? "var(--rj-gold)"
                            : "var(--rj-charcoal)",
                        }}
                      >
                        {item.label}
                      </span>
                      {!isActive && (
                        <span
                          className="ml-auto opacity-0 group-hover/item:opacity-100 transition-opacity"
                          style={{ color: "var(--rj-gold)" }}
                        >
                          →
                        </span>
                      )}
                      {isActive && (
                        <span
                          className="ml-auto w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--rj-gold)" }}
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
      </div>

      {/* Footer CTA */}
      <div
        className="px-5 py-3 flex items-center justify-between"
        style={{
          background: "rgba(0,55,32,0.03)",
          borderTop: "1px solid rgba(0,55,32,0.06)",
        }}
      >
        <span
          className="font-cinzel text-[9px] tracking-[0.2em] uppercase"
          style={{ color: "var(--rj-ash)" }}
        >
          Explore All Collections
        </span>
        <Link
          href="/collections"
          onClick={onClose}
          className="font-cinzel text-[9px] tracking-[0.15em] uppercase px-3 py-1.5 rounded-lg transition-all duration-200"
          style={{
            background: "var(--rj-emerald)",
            color: "var(--rj-gold)",
            cursor: "pointer",
          }}
        >
          View All →
        </Link>
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
  const pathname = usePathname();
  const [collectionsOpen, setCollectionsOpen] = useState(false);

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
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-[105] overflow-y-auto flex flex-col"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-6 py-1"
              style={{
                background: "var(--rj-emerald)",
                borderBottom: "1px solid rgba(252,193,81,0.2)",
              }}
            >
              <Image
                src="/rehnoor-jewels-svg-logo.svg"
                alt="Rehnoor Jewels logo image"
                width={92}
                height={40}
                priority
                className="object-contain"
              />
              <button
                onClick={onClose}
                className="p-2 hover:text-[var(--rj-gold)] text-white transition-colors"
                style={{ cursor: "pointer" }}
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="px-6 py-4 flex-1">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <div
                    key={item.label}
                    style={{ borderBottom: "1px solid rgba(0,55,32,0.08)" }}
                  >
                    {item.dropdown ? (
                      <>
                        <button
                          onClick={() => setCollectionsOpen((o) => !o)}
                          className="w-full flex items-center justify-between py-4 font-cinzel text-[11px] tracking-[0.2em] uppercase"
                          style={{
                            color: isActive
                              ? "var(--rj-emerald)"
                              : "var(--rj-charcoal)",
                            cursor: "pointer",
                          }}
                        >
                          {item.label}
                          <motion.span
                            animate={{ rotate: collectionsOpen ? 180 : 0 }}
                          >
                            <ChevronDown size={14} />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {collectionsOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="overflow-hidden"
                            >
                              <div className="pb-4 space-y-4">
                                {item.dropdown.map((group) => (
                                  <div key={group.group} className="ml-3">
                                    <div className="flex items-center gap-2 mb-2">
                                      <div
                                        className="w-1 h-1 rounded-full"
                                        style={{ background: "var(--rj-gold)" }}
                                      />
                                      <span
                                        className="font-cinzel text-[8px] tracking-[0.25em] uppercase font-bold"
                                        style={{ color: "var(--rj-emerald)" }}
                                      >
                                        {group.group}
                                      </span>
                                    </div>
                                    {group.items.map((sub) => {
                                      const subActive = pathname === sub.href;
                                      return (
                                        <Link
                                          key={sub.label}
                                          href={sub.href}
                                          onClick={onClose}
                                          className="flex items-center gap-3 px-3 py-2 rounded-lg mb-1 transition-all duration-200"
                                          style={{
                                            background: subActive
                                              ? "var(--rj-emerald)"
                                              : "rgba(0,55,32,0.04)",
                                            cursor: "pointer",
                                          }}
                                        >
                                          <span className="text-sm">
                                            {sub.icon}
                                          </span>
                                          <span
                                            className="font-cinzel text-[10px] tracking-wide"
                                            style={{
                                              color: subActive
                                                ? "var(--rj-gold)"
                                                : "var(--rj-charcoal)",
                                            }}
                                          >
                                            {sub.label}
                                          </span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="flex items-center justify-between py-4 font-cinzel text-[11px] tracking-[0.2em] uppercase transition-colors"
                        style={{
                          color: isActive
                            ? "var(--rj-emerald)"
                            : "var(--rj-charcoal)",
                          cursor: "pointer",
                        }}
                      >
                        {item.label}
                        {isActive && (
                          <span
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: "var(--rj-gold)" }}
                          />
                        )}
                      </Link>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Footer */}
            <div
              className="px-6 py-6 space-y-3 mt-auto"
              style={{ borderTop: "1px solid rgba(0,55,32,0.08)" }}
            >
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
                    style={{ color: "var(--rj-gold-light)" }}
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
export default function NavbarNew() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mounted, setMounted] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

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

  const openDropdown = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setCollectionsOpen(true);
  }, []);

  const closeDropdown = useCallback(() => {
    timeoutRef.current = setTimeout(() => setCollectionsOpen(false), 150);
  }, []);

  return (
    <>
      <header
        className="sticky top-0 z-[100] transition-all duration-500"
        style={{ background: "var(--rj-emerald)" }}
      >
        {/* Shadow line at bottom on scroll */}
        {scrolled && (
          <div
            className="absolute bottom-0 left-0 right-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--rj-gold), transparent)",
            }}
          />
        )}

        <nav className="container-rj">
          <div className="flex items-center justify-between h-[100px] gap-4 sm:gap-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:text-[var(--rj-gold)] transition-colors"
              style={{ color: "var(--rj-gold-light)", cursor: "pointer" }}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex items-center pt-2"
              style={{ cursor: "pointer" }}
            >
              <Image
                src="/rehnoor-jewels-svg-logo.svg"
                alt="Rehnoor Jewels logo image"
                width={130}
                height={80}
                priority
                className="object-contain"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1 flex-1 justify-center">
              {navLinks.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));

                if (item.dropdown) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={openDropdown}
                      onMouseLeave={closeDropdown}
                    >
                      <button
                        className="relative flex items-center gap-1 px-4 py-2 font-cinzel text-[12px] tracking-[0.2em] uppercase transition-all duration-300"
                        style={{
                          color:
                            isActive || collectionsOpen
                              ? "var(--rj-gold)"
                              : "var(--rj-gold-light)",
                          cursor: "pointer",
                        }}
                      >
                        {item.label}
                        <motion.span
                          animate={{ rotate: collectionsOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={12} />
                        </motion.span>
                        {/* Active / hover underline */}
                        <span
                          className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500 ease-out"
                          style={{
                            background: `linear-gradient(90deg, transparent, #d4af37, #f9e27d, #d4af37, transparent)`,
                            boxShadow:
                              isActive || collectionsOpen
                                ? "0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(212, 175, 55, 0.4)"
                                : "none",
                            opacity: isActive || collectionsOpen ? 1 : 0,
                            transform:
                              isActive || collectionsOpen
                                ? "scaleX(1)"
                                : "scaleX(0)",
                            transformOrigin: "center",
                            filter:
                              isActive || collectionsOpen
                                ? "blur(0.3px)"
                                : "blur(1px)",
                          }}
                        />
                      </button>

                      <AnimatePresence>
                        {collectionsOpen && (
                          <CollectionsDropdown
                            onClose={() => setCollectionsOpen(false)}
                          />
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="relative flex items-center gap-1.5 px-4 py-2 font-cinzel text-[12px] tracking-[0.2em] uppercase transition-colors duration-300"
                    style={{
                      color: isActive
                        ? "var(--rj-gold)"
                        : "var(--rj-gold-light)",
                      cursor: "pointer",
                    }}
                  >
                    {item.label}
                    {/* Active indicator */}
                    <span
                      className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500 ease-out"
                      style={{
                        background: `linear-gradient(90deg, transparent, #d4af37, #f9e27d, #d4af37, transparent)`,
                        boxShadow:
                          isActive || collectionsOpen
                            ? "0 0 8px rgba(212, 175, 55, 0.6), 0 0 16px rgba(212, 175, 55, 0.4)"
                            : "none",
                        opacity: isActive || collectionsOpen ? 1 : 0,
                        transform:
                          isActive || collectionsOpen
                            ? "scaleX(1)"
                            : "scaleX(0)",
                        transformOrigin: "center",
                        filter:
                          isActive || collectionsOpen
                            ? "blur(0.3px)"
                            : "blur(1px)",
                      }}
                    />
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1">
              {/* Search (keep visible on all devices) */}
              <button
                onClick={() => setSearchOpen((s) => !s)}
                className="p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
                style={{ color: "var(--rj-gold-light)", cursor: "pointer" }}
                aria-label="Search"
              >
                <Search size={20} />
              </button>

              {/* Desktop ONLY icons */}
              <div className="hidden lg:flex items-center gap-1">
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
                  className="text-[var(--rj-gold-light)]"
                />

                <IconWithBadge
                  href="/cart"
                  icon={<ShoppingBag size={20} />}
                  count={cartCount}
                  label="Cart"
                  className="text-[var(--rj-gold-light)]"
                />
              </div>
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
              className="overflow-hidden bg-white relative"
              style={{ borderTop: "1px solid rgba(0,55,32,0.1)" }}
            >
              {/* 🔥 CLOSE BUTTON */}
              <button
                onClick={() => setSearchOpen(false)}
                className="absolute top-8 right-52 p-2 rounded-full transition-all duration-300 group cursor-pointer"
                style={{
                  background: "rgba(0,0,0,0.04)",
                }}
              >
                <X
                  size={18}
                  className="transition-transform duration-300 group-hover:rotate-90"
                  style={{ color: "var(--rj-ash)" }}
                />
              </button>

              <div className="container-rj py-4">
                <div className="relative max-w-2xl mx-auto">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2"
                    style={{ color: "var(--rj-ash)" }}
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
                      className="absolute right-4 top-1/2 -translate-y-1/2"
                      style={{ color: "var(--rj-ash)", cursor: "pointer" }}
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-2 max-w-2xl mx-auto">
                  {["Nawabi Chain", "Gold Ring", "Kada", "Bracelet"].map(
                    (tag) => (
                      <button
                        key={tag}
                        onClick={() => setSearchQuery(tag)}
                        className="px-3 py-1 text-xs rounded-full transition-all duration-200"
                        style={{
                          background: "var(--rj-ivory-dark)",
                          border: "1px solid var(--rj-bone)",
                          cursor: "pointer",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background =
                            "var(--rj-gold-pale)";
                          e.currentTarget.style.borderColor = "var(--rj-gold)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background =
                            "var(--rj-ivory-dark)";
                          e.currentTarget.style.borderColor = "var(--rj-bone)";
                        }}
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
      </header>

      <MobileMenu
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        cartCount={cartCount}
        wishlistCount={wishlistCount}
      />
    </>
  );
}
