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

/* ─── Cart indicator ─── */
function CartIcon({ count = 0 }: { count?: number }) {
  return (
    <button
      className="relative group p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
      aria-label="Cart"
    >
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--rj-gold)] text-[var(--rj-emerald)] text-[10px] font-bold flex items-center justify-center font-cinzel">
          {count}
        </span>
      )}
    </button>
  );
}

/* ─── Mega Menu Panel ─── */
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
            gridTemplateColumns: `repeat(${Math.min(item.categories.length, 4)}, 1fr)${
              item.categories.some((c) => c.featuredImage) ? " 260px" : ""
            }`,
          }}
        >
          {item.categories.map((category) => (
            <CategoryColumn
              key={category.label}
              category={category}
              onClose={onClose}
            />
          ))}

          {/* Featured image panel */}
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
                <button
                  onClick={onClose}
                  className="mt-3 btn-outline text-xs py-2 px-4"
                >
                  Shop Now
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

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

/* ─── Mobile Menu ─── */
function MobileMenu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
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
            className="fixed left-0 top-0 bottom-0 w-[85vw] max-w-sm bg-white z-[99] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--rj-bone)]">
              <div>
                <p className="font-cinzel font-bold text-[var(--rj-emerald)] text-lg tracking-widest">
                  REHNOOR
                </p>
                <p className="text-[var(--rj-gold)] font-cinzel text-[9px] tracking-[0.3em] uppercase mt-0.5">
                  Gold Reimagined
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:text-[var(--rj-gold)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav */}
            <nav className="px-6 py-4">
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

            {/* Footer links */}
            <div className="px-6 py-6 space-y-3 border-t border-[var(--rj-bone)] mt-4">
              <Link
                href="/account"
                onClick={onClose}
                className="flex items-center gap-3 text-sm text-[var(--rj-ash)]"
              >
                <User size={16} /> My Account
              </Link>
              <Link
                href="/wishlist"
                onClick={onClose}
                className="flex items-center gap-3 text-sm text-[var(--rj-ash)]"
              >
                <Heart size={16} /> Wishlist
              </Link>
              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 text-sm text-[var(--rj-emerald)] font-medium"
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

/* ─── Main Navbar ─── */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

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
        className={`sticky top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_30px_rgba(0,0,0,0.08)]"
            : "bg-white"
        }`}
      >
        <nav className="container-rj">
          <div className="flex items-center justify-between h-[72px] gap-6">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 hover:text-[var(--rj-gold)] transition-colors"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Logo */}
            <Link
              href="/"
              className="flex-shrink-0 flex flex-col items-start lg:items-center"
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
            </Link>

            {/* Desktop Nav */}
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

            {/* Right actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
                aria-label="Search"
              >
                <Search size={20} />
              </button>
              <button
                className="hidden sm:block p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
                aria-label="Wishlist"
              >
                <Heart size={20} />
              </button>
              <Link
                href="/account"
                className="hidden sm:block p-2 hover:text-[var(--rj-gold)] transition-colors duration-300"
                aria-label="Account"
              >
                <User size={20} />
              </Link>
              <CartIcon count={2} />
              {/* <Link
                href="/admin"
                className="hidden lg:flex items-center gap-1.5 ml-2 px-3 py-1.5 border border-[var(--rj-emerald)] text-[var(--rj-emerald)] hover:bg-[var(--rj-emerald)] hover:text-white transition-all duration-300 font-cinzel text-[9px] tracking-[0.15em] uppercase"
              >
                Admin
              </Link> */}
            </div>
          </div>
        </nav>

        {/* Search Bar */}
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

        {/* Mega Menu */}
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

      <MobileMenu isOpen={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
