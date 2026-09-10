// lib/wigzo.ts

declare global {
  interface Window {
    wigzo?: (...args: any[]) => void;
  }
}

export const wigzoIdentify = (userData: { email: string; phone?: string; fullName?: string }) => {
  if (typeof window !== "undefined" && window.wigzo) {
    window.wigzo("identify", userData);
  }
};

export const wigzoTrack = (eventName: string, payload: Record<string, any>) => {
  if (typeof window !== "undefined" && window.wigzo) {
    window.wigzo("track", eventName, payload);
  }
};