"use client";

import { useEffect, useMemo, useState } from "react";

import { Monitor, Smartphone, Apple, Laptop } from "lucide-react";

export type PlatformKey = "android" | "ios" | "macos" | "windows";

export function useStateBanner() {
  const [platformKey, setPlatformKey] = useState<PlatformKey>("windows");

  useEffect(() => {
    if (typeof navigator === "undefined") return;
    const ua = navigator.userAgent.toLowerCase();
    if (/android/.test(ua)) return setPlatformKey("android");
    if (/iphone|ipad|ipod/.test(ua)) return setPlatformKey("ios");
    if (/macintosh|mac os x/.test(ua)) return setPlatformKey("macos");
    setPlatformKey("windows");
  }, []);

  const PlatformIcon = useMemo(() => {
    const map = {
      android: Smartphone,
      ios: Apple,
      macos: Laptop,
      windows: Monitor,
    } as const;
    return map[platformKey] || Monitor;
  }, [platformKey]);

  return { platformKey, setPlatformKey, PlatformIcon };
}
