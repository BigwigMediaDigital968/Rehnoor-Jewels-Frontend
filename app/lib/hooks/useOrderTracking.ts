// hooks/useOrderTracking.ts
// Fetches order tracking data and polls for updates every 60 seconds
// while the order is in an active shipping state.

import { useState, useEffect, useCallback, useRef } from "react";
import { trackOrder, TrackOrderResponse } from "@/app/lib/api/orders";

// Statuses that are worth polling for live updates
const LIVE_STATUSES = new Set([
  "shipped",
  "out_for_delivery",
  "processing",
  "ready_to_ship",
]);

const POLL_INTERVAL_MS = 60_000; // 1 minute

interface UseOrderTrackingReturn {
  loading: boolean;
  data: TrackOrderResponse["data"] | null;
  error: string;
  lastRefreshed: Date | null;
  refetch: () => Promise<void>;
}

export function useOrderTracking(
  orderNumber: string | null,
  email?: string,
): UseOrderTrackingReturn {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<TrackOrderResponse["data"] | null>(null);
  const [error, setError] = useState("");
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetch = useCallback(async () => {
    if (!orderNumber) return;
    setLoading(true);
    setError("");

    const res = await trackOrder(orderNumber, email);

    if (res.success && res.data) {
      setData(res.data);
      setLastRefreshed(new Date());
    } else {
      setError(res.message ?? "Order not found.");
      setData(null);
    }
    setLoading(false);
  }, [orderNumber, email]);

  // Initial fetch
  useEffect(() => {
    if (orderNumber) fetch();
  }, [fetch, orderNumber]);

  // Live polling for active shipments
  useEffect(() => {
    if (pollRef.current) clearInterval(pollRef.current);

    if (data && LIVE_STATUSES.has(data.status)) {
      pollRef.current = setInterval(fetch, POLL_INTERVAL_MS);
    }

    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, [data?.status, fetch]);

  return { loading, data, error, lastRefreshed, refetch: fetch };
}
