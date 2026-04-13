export interface NavSubItem {
  label: string;
  href: string;
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface NavCategory {
  label: string;
  href: string;
  items: NavSubItem[];
  featuredImage?: string;
  featuredLabel?: string;
  featuredhref?: string;
}

export interface NavItem {
  label: string;
  href?: string;
  hasMegaMenu?: boolean;
  categories?: NavCategory[];
  badge?: string;
}

export const navItems: NavItem[] = [
  {
    label: "New Arrivals",
    href: "/collections/new-arrivals",
    badge: "New",
  },
  // {
  //   label: "Collections",
  //   hasMegaMenu: true,
  //   categories: [
  //     {
  //       label: "Chains",
  //       href: "/collections/chains",
  //       items: [
  //         {
  //           label: "Nawabi Chain",
  //           href: "/collections/nawabi-chain",
  //           isBestseller: true,
  //         },
  //         { label: "Rope Chain", href: "/collections/rope-chain" },
  //         { label: "Box Chain", href: "/collections/box-chain" },
  //         {
  //           label: "Figaro Chain",
  //           href: "/collections/figaro-chain",
  //           isNew: true,
  //         },
  //         { label: "Franco Chain", href: "/collections/franco-chain" },
  //         { label: "Hollow Chain", href: "/collections/hollow-chain" },
  //         { label: "Shop All Chains", href: "/collections/chains" },
  //       ],
  //       featuredImage:
  //         "https://res.cloudinary.com/dpekvrij7/image/upload/v1775813783/rehnoor/collections/1775813782565-2.png",
  //       featuredLabel: "Chain Collection",
  //       featuredhref: "/collections/chains-for-men",
  //     },
  //     {
  //       label: "Kadas & Bracelets",
  //       href: "/collections/kadas",
  //       items: [
  //         {
  //           label: "Jaguar Kada",
  //           href: "/collections/jaguar-kada",
  //           isBestseller: true,
  //         },
  //         { label: "Rhodium Kada", href: "/collections/rhodium-kada" },
  //         { label: "Golden Kada", href: "/collections/golden-kada" },
  //         { label: "Cuff Bracelets", href: "/collections/cuff-bracelets" },
  //         {
  //           label: "Link Bracelets",
  //           href: "/collections/link-bracelets",
  //           isNew: true,
  //         },
  //         { label: "Shop All", href: "/collections/kadas" },
  //       ],
  //       featuredImage:
  //         "https://images.unsplash.com/photo-1573408301185-9519f94806a4?w=400&q=80",
  //       featuredLabel: "Kada Collection",
  //     },
  //     {
  //       label: "Rings",
  //       href: "/collections/rings",
  //       items: [
  //         { label: "Signet Rings", href: "/collections/signet-rings" },
  //         {
  //           label: "Band Rings",
  //           href: "/collections/band-rings",
  //           isBestseller: true,
  //         },
  //         {
  //           label: "Statement Rings",
  //           href: "/collections/statement-rings",
  //           isNew: true,
  //         },
  //         { label: "Biscuit Rings", href: "/collections/biscuit-rings" },
  //         { label: "AD Rings", href: "/collections/ad-rings" },
  //         { label: "Shop All", href: "/collections/rings" },
  //       ],
  //     },
  //     {
  //       label: "Pendants & Lockets",
  //       href: "/collections/pendants",
  //       items: [
  //         {
  //           label: "Golden Locket",
  //           href: "/collections/golden-locket",
  //           isBestseller: true,
  //         },
  //         {
  //           label: "Religious Pendants",
  //           href: "/collections/religious-pendants",
  //         },
  //         {
  //           label: "Designer Pendants",
  //           href: "/collections/designer-pendants",
  //           isNew: true,
  //         },
  //         { label: "Coin Pendants", href: "/collections/coin-pendants" },
  //         { label: "Shop All", href: "/collections/pendants" },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   label: "Shop By",
  //   hasMegaMenu: true,
  //   categories: [
  //     {
  //       label: "By Metal",
  //       href: "/collections/by-metal",
  //       items: [
  //         { label: "22kt Yellow Gold", href: "/collections/yellow-gold" },
  //         { label: "White Gold", href: "/collections/white-gold" },
  //         { label: "Rose Gold", href: "/collections/rose-gold", isNew: true },
  //         { label: "Rhodium Plated", href: "/collections/rhodium" },
  //         { label: "Two-Tone Gold", href: "/collections/two-tone" },
  //       ],
  //     },
  //     {
  //       label: "By Occasion",
  //       href: "/collections/by-occasion",
  //       items: [
  //         {
  //           label: "Wedding",
  //           href: "/collections/wedding",
  //           isBestseller: true,
  //         },
  //         { label: "Festive", href: "/collections/festive" },
  //         { label: "Daily Wear", href: "/collections/daily-wear" },
  //         { label: "Formal", href: "/collections/formal" },
  //         { label: "Casual", href: "/collections/casual" },
  //       ],
  //     },
  //     {
  //       label: "By Budget",
  //       href: "/collections/by-budget",
  //       items: [
  //         { label: "Under ₹5,000", href: "/collections/under-5000" },
  //         { label: "₹5,000 – ₹15,000", href: "/collections/5000-15000" },
  //         { label: "₹15,000 – ₹50,000", href: "/collections/15000-50000" },
  //         { label: "₹50,000+", href: "/collections/premium" },
  //       ],
  //     },
  //   ],
  // },
  {
    label: "Collections",
    href: "/collections",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export const trustBadges = [
  { label: "Free Shipping on orders above ₹999", icon: "🚚" },
  { label: "BIS Hallmarked Gold", icon: "✦" },
  { label: "30-Day Easy Returns", icon: "↩" },
  { label: "Lifetime Gold Buyback", icon: "♾" },
  { label: "Secure Checkout", icon: "🔒" },
];
