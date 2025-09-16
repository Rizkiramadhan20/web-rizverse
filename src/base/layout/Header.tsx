"use client"

import React from 'react';

import Image from 'next/image';

import logo from '@/base/assets/logo.png';

import { LanguageSwitcher } from '@/components/ui/language-switcher';

import { Switch } from '@/components/ui/switch';

import { motion, Variants } from 'motion/react';
import {
    desktopNavContainerVariants,
    desktopNavItemVariants,
    rightControlsContainerVariants,
    rightControlsItemVariants,
} from '@/base/layout/animation/animation'

import Link from "next/link"

import { ThemeSwitchOverlay } from '@/context/SwitchOverlay';

import { LanguageSwitchOverlay } from '@/context/SwitchOverlayLanguage';

import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar';

import { useManagementHeader } from '@/base/layout/lib/useManagementHeader';

export default function Header() {
    const {
        // State
        isScrolled,
        isMobileMenuOpen,
        mounted,
        isInitialLoading,
        theme,

        // Handlers
        handleThemeToggle,
        toggleMobileMenu,
        closeMobileMenu,

        // Navigation
        navItems,

        // Context handlers
        showLanguageSwitchOverlay,
        hideLanguageSwitchOverlay,
        hideThemeSwitchOverlay,

        // Context state
        fromLanguage,
        toLanguage,
        isThemeOverlayVisible,
        isLangOverlayVisible,
    } = useManagementHeader();



    return (
        <>
            <ScrollProgressBar color="#FF5555" height={3} />
            <ThemeSwitchOverlay
                isVisible={isThemeOverlayVisible}
                onAnimationComplete={hideThemeSwitchOverlay}
            />

            <LanguageSwitchOverlay
                isVisible={isLangOverlayVisible}
                onAnimationComplete={hideLanguageSwitchOverlay}
                fromLanguage={fromLanguage}
                toLanguage={toLanguage}
            />

            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 container overflow-hidden ${isScrolled
                ? 'bg-background/80 backdrop-blur-md shadow-lg border-b border-border/50 rounded-md'
                : 'bg-background/95 backdrop-blur-sm'
                }`}>
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <Link href={"/"} className='relative cursor-pointer'>
                            <motion.div
                                initial={{ opacity: 0, x: -12, scale: 0.98 }}
                                animate={{ opacity: 1, x: 0, scale: 1 }}
                                whileHover={{ scale: 1.05, rotate: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                            >
                                <Image
                                    src={logo}
                                    alt="Rizverse logo"
                                    width={isScrolled ? 50 : 60}
                                    height={isScrolled ? 50 : 60}
                                    className="transition-all duration-300 group-hover:scale-105 dark:invert"
                                />
                            </motion.div>
                        </Link>

                        {/* Desktop Navigation */}
                        <motion.nav
                            aria-label="Primary"
                            variants={desktopNavContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <ul className="hidden md:flex items-center gap-10">
                                {navItems.map((item, index) => (
                                    <motion.li
                                        key={index}
                                        variants={desktopNavItemVariants as Variants}
                                        whileHover={{ y: -2, scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <Link
                                            href={item.href}
                                            onClick={item.onClick}
                                            className={`relative cursor-pointer font-medium transition-all duration-300 group ${item.isActive
                                                ? 'text-[#FF5555]'
                                                : 'text-foreground hover:text-[#FF5555]'
                                                }`}
                                        >
                                            {item.label}
                                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5555] transition-all duration-300 group-hover:w-full ${item.isActive ? 'w-full' : ''}`}></span>
                                        </Link>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.nav>

                        {/* Language Switcher and Theme Toggle */}
                        <motion.div
                            className="hidden md:flex items-center gap-4"
                            variants={rightControlsContainerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.div variants={rightControlsItemVariants as Variants} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <LanguageSwitcher onLanguageSwitch={showLanguageSwitchOverlay} />
                            </motion.div>

                            {mounted && (
                                <motion.div variants={rightControlsItemVariants as Variants}>
                                    <Switch
                                        id="theme-toggle"
                                        checked={theme === 'dark'}
                                        onCheckedChange={handleThemeToggle}
                                        aria-label="Toggle dark mode"
                                        thumbContent={
                                            theme === 'light' ? (
                                                <motion.svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    key="light-icon"
                                                    initial={{ rotate: 0, opacity: 0 }}
                                                    animate={{ rotate: -360, opacity: 1 }}
                                                    exit={{ rotate: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <circle cx="12" cy="12" r="4" />
                                                    <path d="M12 2v2m0 16v2m9-9h-2M5 12H3m14.85-6.85L16.4 7.6M7.6 16.4l-1.45 1.45m0-9.9L7.6 7.6M16.4 16.4l1.45 1.45" />
                                                </motion.svg>
                                            ) : (
                                                <motion.svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                    viewBox="0 0 24 24"
                                                    key="dark-icon"
                                                    initial={{ rotate: 0, opacity: 0 }}
                                                    animate={{ rotate: 360, opacity: 1 }}
                                                    exit={{ rotate: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <circle cx="12" cy="12" r="11" fill="#60A5FA" />
                                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#FCD34D" />
                                                </motion.svg>
                                            )
                                        }
                                    />
                                </motion.div>
                            )}
                        </motion.div>

                        {/* Mobile Controls - Language Switcher, Theme Toggle, and Hamburger */}
                        <div className="md:hidden flex items-center gap-3">
                            {/* Language Switcher for mobile */}
                            <LanguageSwitcher onLanguageSwitch={showLanguageSwitchOverlay} />

                            {/* Dark mode toggle for mobile */}
                            {mounted && (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                                    animate={{
                                        opacity: isInitialLoading ? 0 : 1,
                                        scale: isInitialLoading ? 0.8 : 1,
                                        y: isInitialLoading ? 20 : 0
                                    }}
                                    transition={{
                                        duration: 0.5,
                                        delay: isInitialLoading ? 0 : 0.5,
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 10
                                    }}
                                >
                                    <Switch
                                        id="theme-toggle-mobile"
                                        checked={theme === 'dark'}
                                        onCheckedChange={handleThemeToggle}
                                        aria-label="Toggle dark mode"
                                        thumbContent={
                                            theme === 'light' ? (
                                                <motion.svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    key="light-icon-mobile"
                                                    initial={{ rotate: 0, opacity: 0 }}
                                                    animate={{ rotate: -360, opacity: 1 }}
                                                    exit={{ rotate: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <circle cx="12" cy="12" r="4" />
                                                    <path d="M12 2v2m0 16v2m9-9h-2M5 12H3m14.85-6.85L16.4 7.6M7.6 16.4l-1.45 1.45m0-9.9L7.6 7.6M16.4 16.4l1.45 1.45" />
                                                </motion.svg>
                                            ) : (
                                                <motion.svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-2.5 w-2.5 sm:h-3 sm:w-3"
                                                    viewBox="0 0 24 24"
                                                    key="dark-icon-mobile"
                                                    initial={{ rotate: 0, opacity: 0 }}
                                                    animate={{ rotate: 360, opacity: 1 }}
                                                    exit={{ rotate: 0, opacity: 0 }}
                                                    transition={{ duration: 0.5 }}
                                                >
                                                    <circle cx="12" cy="12" r="11" fill="#60A5FA" />
                                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#FCD34D" />
                                                </motion.svg>
                                            )
                                        }
                                    />
                                </motion.div>
                            )}

                            {/* Mobile Menu Button */}
                            <button
                                onClick={toggleMobileMenu}
                                className="p-2 rounded-lg hover:bg-accent transition-colors duration-200"
                                aria-label="Toggle mobile menu"
                            >
                                <div className="w-6 h-6 flex flex-col justify-center items-center">
                                    <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                                        }`}></span>
                                    <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                        }`}></span>
                                    <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                                        }`}></span>
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Mobile Menu */}
                    <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                        <nav className="py-4 border-t border-border" aria-label="Mobile Primary">
                            <ul className="space-y-3">
                                {navItems.map((item, index) => (
                                    <li key={index}>
                                        <Link
                                            href={item.href}
                                            onClick={() => {
                                                item.onClick();
                                                closeMobileMenu();
                                            }}
                                            className={`block w-full py-2 px-4 rounded-lg font-medium transition-all duration-200 ${item.isActive
                                                ? 'text-[#FF5555] bg-red-50 dark:bg-red-950/20'
                                                : 'text-foreground hover:text-[#FF5555] hover:bg-accent'
                                                }`}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        </>
    );
}