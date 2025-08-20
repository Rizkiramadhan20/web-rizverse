"use client";

import { useEffect, useState } from "react";

import Lenis from "lenis";

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Function to get Lenis instance
    const getLenis = () => {
      if (typeof window !== "undefined") {
        // @ts-expect-error - Lenis adds itself to window
        return window.lenis;
      }
      return null;
    };

    // Try to get Lenis immediately
    const lenisInstance = getLenis();
    if (lenisInstance) {
      setLenis(lenisInstance);
    } else {
      // If not available immediately, wait a bit and try again
      const timer = setTimeout(() => {
        const delayedLenis = getLenis();
        if (delayedLenis) {
          setLenis(delayedLenis);
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, []);

  return lenis;
}

// Hook untuk scroll ke elemen tertentu
export function useScrollTo() {
  const lenis = useLenis();

  const scrollTo = (
    target: string | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      easing?: (t: number) => number;
    }
  ) => {
    if (lenis) {
      lenis.scrollTo(target, options);
    } else {
      // Fallback to native smooth scrolling if Lenis is not available
      if (typeof target === "string") {
        const element = document.querySelector(target);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  };

  return scrollTo;
}

// Hook untuk mendapatkan scroll progress
export function useScrollProgress() {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!lenis) return;

    const updateProgress = () => {
      setProgress(lenis.progress);
    };

    lenis.on("scroll", updateProgress);

    return () => {
      lenis.off("scroll", updateProgress);
    };
  }, [lenis]);

  return progress;
}
