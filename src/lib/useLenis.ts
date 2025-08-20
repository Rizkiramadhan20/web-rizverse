"use client";

import { useEffect, useState } from "react";

import Lenis from "lenis";

export function useLenis() {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Function to get Lenis instance
    const getLenis = () => {
      if (typeof window !== "undefined") {
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
      // Use Lenis smooth scrolling
      lenis.scrollTo(target, {
        duration: options?.duration || 1.5,
        offset: options?.offset || 0,
        easing:
          options?.easing ||
          ((t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t))),
        ...options,
      });
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
      // Calculate scroll progress as a percentage
      const scrollTop = lenis.scroll;
      const maxScroll = lenis.limit;
      const progressValue = maxScroll > 0 ? scrollTop / maxScroll : 0;
      setProgress(progressValue);
    };

    // Update progress immediately
    updateProgress();

    // Listen to scroll events
    lenis.on("scroll", updateProgress);

    return () => {
      lenis.off("scroll", updateProgress);
    };
  }, [lenis]);

  return progress;
}

// Hook untuk mendapatkan scroll position
export function useScrollPosition() {
  const lenis = useLenis();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    if (!lenis) return;

    const updateScrollY = () => {
      setScrollY(lenis.scroll);
    };

    // Update immediately
    updateScrollY();

    // Listen to scroll events
    lenis.on("scroll", updateScrollY);

    return () => {
      lenis.off("scroll", updateScrollY);
    };
  }, [lenis]);

  return scrollY;
}

// Hook untuk mendapatkan scroll direction
export function useScrollDirection() {
  const lenis = useLenis();
  const [direction, setDirection] = useState<"up" | "down" | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (!lenis) return;

    const updateDirection = () => {
      const currentScrollY = lenis.scroll;

      if (currentScrollY > lastScrollY) {
        setDirection("down");
      } else if (currentScrollY < lastScrollY) {
        setDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    lenis.on("scroll", updateDirection);

    return () => {
      lenis.off("scroll", updateDirection);
    };
  }, [lenis, lastScrollY]);

  return direction;
}
