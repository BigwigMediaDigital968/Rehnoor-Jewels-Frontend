"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useCartStore } from "@/app/store/cartStore";
import MagicCheckoutButton from "../component/website/checkout-magic/MagicCheckoutButton";
import OrderSummaryPanel from "../component/website/checkout/OrderSummaryPanel"; // reused as-is

export default function CheckoutMagicPage() {
  const router = useRouter();
  const checkoutItems = useCartStore((s) => s.checkoutItems);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (mounted && checkoutItems().length === 0) {
      router.replace("/cart");
    }
  }, [mounted, checkoutItems, router]);

  if (!mounted) return null;

  return (
    <main style={{ background: "var(--rj-ivory)", minHeight: "100vh" }}>
      <div style={{ background: "var(--rj-emerald)", paddingTop: "5rem", paddingBottom: "1.5rem" }}>
        <div className="container-rj">
          <nav className="flex items-center gap-1.5 mb-4 flex-wrap">
            {["Home", "Cart", "Checkout"].map((c, i, arr) => (
              <span key={c} className="flex items-center gap-1.5">
                {i < arr.length - 1 ? (
                  <>
                    <Link
                      href={i === 0 ? "/" : "/cart"}
                      className="font-cinzel text-[9px] tracking-widest uppercase hover:opacity-60 transition-opacity"
                      style={{ color: "rgba(255,255,255,0.4)" }}
                    >
                      {c}
                    </Link>
                    <ChevronRight size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
                  </>
                ) : (
                  <span
                    className="font-cinzel text-[9px] tracking-widest uppercase"
                    style={{ color: "var(--rj-gold)" }}
                  >
                    {c}
                  </span>
                )}
              </span>
            ))}
          </nav>
          <h1 className="heading-lg text-white">Secure Checkout — Magic Checkout Trial</h1>
        </div>
      </div>

      <div className="container-rj py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-start">
          <div className="lg:col-span-2">
            <MagicCheckoutButton />
          </div>
          <div>
            <OrderSummaryPanel />
          </div>
        </div>
      </div>
    </main>
  );
}
