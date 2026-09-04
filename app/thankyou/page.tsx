// app/thankyou/page.ts
//
// Wrapped in a Suspense boundary to prevent Next.js SSR bailout/prerender errors
// when using useSearchParams() on a static export or dynamic SSR route.

import { Suspense } from "react";
import ThankYouContent from "./ThankYouContent";

export default function ThankYouPage() {
  return (
    <Suspense fallback={null}>
      <ThankYouContent />
    </Suspense>
  );
}