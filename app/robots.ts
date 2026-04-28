// For Production

// import { MetadataRoute } from "next";

// export default function robots(): MetadataRoute.Robots {
//   return {
//     rules: [
//       {
//         userAgent: "*",
//         disallow: "/", // block everything
//       },
//     ],
//   };
// }

// For Live (Allow Page)

import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", // allow everything
        disallow: ["/cart", "/checkout", "/products"], // 🚫 block these routes
      },
    ],
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
