// app/track-order/page.tsx
import TrackOrderPage from "./TrackOrder";
export const metadata = {
  title: "Track Order | Rehnoor Jewels",
  description:
    "Enter your order ID to see real-time shipping status and tracking updates.",
};
export default function TrackOrder() {
  return <TrackOrderPage />;
}
