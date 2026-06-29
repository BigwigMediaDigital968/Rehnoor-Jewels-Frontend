"use client";

import { CartDrawer } from "./Cartdrawer";


/**
 * Mount this ONCE in app/layout.tsx, as a sibling to {children}.
 * It renders nothing visible until isDrawerOpen is true — the drawer
 * itself is fixed-positioned and portals over everything via z-index.
 *
 * Usage in app/layout.tsx:
 *
 *   import { CartDrawerWrapper } from "@/app/components/cart/CartDrawerWrapper";
 *
 *   export default function RootLayout({ children }) {
 *     return (
 *       <html lang="en">
 *         <body>
 *           <Navbar />
 *           {children}
 *           <CartDrawerWrapper />
 *         </body>
 *       </html>
 *     );
 *   }
 *
 * To open it from anywhere (e.g. navbar cart icon):
 *
 *   const { openDrawer, totalItems } = useCartStore();
 *   <button onClick={openDrawer}>Bag ({totalItems()})</button>
 */
export function CartDrawerWrapper() {
  return <CartDrawer />;
}