"use client";

import { useState, useEffect } from "react";

import { useParams, usePathname, useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import { useThemeSwitchOverlay } from "@/context/SwitchOverlay";

import { useLanguageSwitchOverlay } from "@/context/SwitchOverlayLanguage";

import {
  useScrollTo,
  useScrollProgress,
  useScrollPosition,
} from "@/lib/useLenis";

import { buildNavItems } from "@/base/layout/data/NavLinks";

export const useManagementHeader = () => {
  // State management
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [currentHash, setCurrentHash] = useState("");
  const [activeSection, setActiveSection] = useState("");

  // Hooks
  const { theme, setTheme } = useTheme();
  const scrollTo = useScrollTo();
  const scrollProgress = useScrollProgress();
  const scrollY = useScrollPosition();
  const params = useParams();
  const router = useRouter();
  const pathname = usePathname();
  const {
    isOverlayVisible: isThemeOverlayVisible,
    showThemeSwitchOverlay,
    hideThemeSwitchOverlay,
  } = useThemeSwitchOverlay();
  const {
    isOverlayVisible: isLangOverlayVisible,
    fromLanguage,
    toLanguage,
    showLanguageSwitchOverlay,
    hideLanguageSwitchOverlay,
  } = useLanguageSwitchOverlay();

  const currentLocale = ((params?.locale as string) || "id") as "id" | "en";

  // Theme toggle handler
  const handleThemeToggle = (checked: boolean) => {
    showThemeSwitchOverlay();
    setTheme(checked ? "dark" : "light");
  };

  // Initialize component
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Track hash changes for active link detection
  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentHash(window.location.hash);

      const handleHashChange = () => {
        setCurrentHash(window.location.hash);
      };

      window.addEventListener("hashchange", handleHashChange);
      return () => window.removeEventListener("hashchange", handleHashChange);
    }
  }, []);

  // Scroll spy to detect active section
  useEffect(() => {
    if (typeof window !== "undefined" && pathname === `/${currentLocale}`) {
      const sections = ["services", "pricing", "featured"];
      const headerHeight = 80;

      const handleScroll = () => {
        const adjustedScrollY = scrollY + headerHeight + 100; // Add offset for better detection

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const elementTop = element.offsetTop;
            const elementBottom = elementTop + element.offsetHeight;

            if (
              adjustedScrollY >= elementTop &&
              adjustedScrollY < elementBottom
            ) {
              setActiveSection(sectionId);
              break;
            }
          }
        }

        // If we're at the top, clear active section
        if (adjustedScrollY < 200) {
          setActiveSection("");
        }
      };

      // Check position whenever scrollY changes
      handleScroll();
    }
  }, [scrollY, pathname, currentLocale]);

  // Navigation handlers
  const handleHomeNavigation = () => {
    if (window.location.pathname === "/") {
      // If already on home page, scroll to top
      scrollTo("html", { duration: 1.5 });
    } else {
      // Navigate to home page
      router.push("/");
    }
  };

  const scrollToSection = (sectionId: string) => {
    const targetElement = document.querySelector(`#${sectionId}`);
    if (targetElement) {
      // Use our hook for smooth scrolling
      scrollTo(`#${sectionId}`, {
        offset: -80,
        duration: 1.5,
      });
    }
  };

  const handleSectionNavigation = (sectionId: string) => {
    // Always scroll to section smoothly, regardless of current page
    const targetElement = document.querySelector(`#${sectionId}`);

    if (targetElement) {
      // Element exists, scroll to it
      scrollToSection(sectionId);
    } else {
      // Element not found, might be on different page
      // Navigate to home with hash and let useEffect handle the scroll
      router.push(`/#${sectionId}`);
    }
  };

  const handleDownloadNavigation = () => {
    router.push(`/${currentLocale}/download`);
  };

  // Active link detection
  const isActiveLink = (href: string, isHashLink: boolean = false) => {
    if (isHashLink) {
      // For hash links (services, pricing), check if we're on home page and either hash matches or section is active
      const targetHash = href.split("#")[1];
      const isOnHomePage = pathname === `/${currentLocale}` || pathname === "/";
      const hashMatches = currentHash === `#${targetHash}`;
      const sectionIsActive = activeSection === targetHash;

      return isOnHomePage && (hashMatches || sectionIsActive);
    } else {
      // For regular links (Home, Download), check exact pathname match
      // For Home specifically, also check if we're at the top (no hash and no active section)
      if (href === `/${currentLocale}` || href === "/") {
        const isOnHomePage =
          pathname === `/${currentLocale}` || pathname === "/";
        const noHash = !currentHash;
        const noActiveSection = !activeSection;
        return isOnHomePage && noHash && noActiveSection;
      }
      return pathname === href;
    }
  };

  // Navigation items configuration (moved to data/NavLinks)
  const navItems = buildNavItems({
    currentLocale,
    isActiveLink,
    handleHomeNavigation,
    handleSectionNavigation,
    handleDownloadNavigation,
  });

  // Use Lenis scroll progress instead of window scroll
  useEffect(() => {
    if (scrollProgress !== undefined) {
      setIsScrolled(scrollProgress > 0.01); // Adjust threshold as needed
    }
  }, [scrollProgress]);

  // Handle hash navigation when coming from another page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const hash = window.location.hash;
      if (hash) {
        // Simple hash navigation - just scroll to the section
        setTimeout(() => {
          const targetElement = document.querySelector(hash);
          if (targetElement) {
            scrollTo(hash, {
              offset: -80,
              duration: 1.5,
            });
          }
        }, 300);
      }
    }
  }, [scrollTo]);

  // Mobile menu handlers
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return {
    // State
    isScrolled,
    isMobileMenuOpen,
    mounted,
    isInitialLoading,
    currentHash,
    activeSection,
    theme,
    currentLocale,

    // Handlers
    handleThemeToggle,
    handleHomeNavigation,
    handleSectionNavigation,
    handleDownloadNavigation,
    toggleMobileMenu,
    closeMobileMenu,

    // Navigation
    navItems,
    isActiveLink,

    // Context handlers
    showLanguageSwitchOverlay,
    hideLanguageSwitchOverlay,
    hideThemeSwitchOverlay,

    // Context state
    fromLanguage,
    toLanguage,
    isThemeOverlayVisible,
    isLangOverlayVisible,
  };
};
