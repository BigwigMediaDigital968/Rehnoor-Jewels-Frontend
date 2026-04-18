import { Suspense } from "react";

import TrackOrderClient from "./TrackOrder";
export const metadata = {
  title: "Track Order | Rehnoor Jewels",
  description:
    "Enter your order ID to see real-time shipping status and tracking updates.",
};
export default function TrackOrder() {
  return (
    <>
      <Suspense fallback={<div className="loader" />}>
        <TrackOrderClient />
      </Suspense>
    </>
  );
}
