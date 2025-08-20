'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';

interface ThemeSwitchOverlayProps {
    isVisible: boolean;
    onAnimationComplete: () => void;
}

export function ThemeSwitchOverlay({ isVisible, onAnimationComplete }: ThemeSwitchOverlayProps) {
    const { theme } = useTheme();
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsAnimating(true);
            const timer = setTimeout(() => {
                setIsAnimating(false);
                onAnimationComplete();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isVisible, onAnimationComplete]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[9999] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    {/* Background overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-background/95 to-background/80 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isAnimating ? 1 : 0
                        }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    />

                    {/* Central theme icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, y: 30, rotate: -180 }}
                            animate={{
                                opacity: isAnimating ? 1 : 0,
                                y: isAnimating ? 0 : 30,
                                rotate: isAnimating ? 0 : -180
                            }}
                            transition={{
                                duration: 0.5,
                                delay: 0.1,
                                ease: [0.25, 0.46, 0.45, 0.94]
                            }}
                        >
                            {/* Light theme icon */}
                            {theme === 'light' && (
                                <motion.div
                                    className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 shadow-2xl flex items-center justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isAnimating ? 1 : 0,
                                        y: isAnimating ? 0 : 20
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.2,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                >
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: isAnimating ? 360 : 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <circle cx="12" cy="12" r="4" />
                                        <path d="M12 2v2m0 16v2m9-9h-2M5 12H3m14.85-6.85L16.4 7.6M7.6 16.4l-1.45 1.45m0-9.9L7.6 7.6M16.4 16.4l1.45 1.45" />
                                    </motion.svg>
                                </motion.div>
                            )}

                            {/* Dark theme icon */}
                            {theme === 'dark' && (
                                <motion.div
                                    className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-700 shadow-2xl flex items-center justify-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{
                                        opacity: isAnimating ? 1 : 0,
                                        y: isAnimating ? 0 : 20
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.2,
                                        ease: [0.25, 0.46, 0.45, 0.94]
                                    }}
                                >
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-12 h-12 text-yellow-300"
                                        viewBox="0 0 24 24"
                                        initial={{ rotate: 0 }}
                                        animate={{ rotate: isAnimating ? -360 : 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <circle cx="12" cy="12" r="11" fill="currentColor" />
                                        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" fill="#1e293b" />
                                    </motion.svg>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>

                    {/* Floating particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(6)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-2 h-2 rounded-full ${theme === 'light'
                                    ? 'bg-yellow-400/60'
                                    : 'bg-blue-400/60'
                                    }`}
                                style={{
                                    left: `${20 + i * 15}%`,
                                    top: `${30 + (i % 2) * 40}%`,
                                }}
                                initial={{
                                    opacity: 0,
                                    y: 0
                                }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    y: isAnimating ? [-10, 10, -10] : 0
                                }}
                                transition={{
                                    duration: 1.2,
                                    delay: 0.4 + i * 0.1,
                                    ease: "easeInOut",
                                    repeat: isAnimating ? Infinity : 0,
                                    repeatType: "reverse"
                                }}
                            />
                        ))}
                    </div>

                    {/* Theme text */}
                    <motion.div
                        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isAnimating ? 1 : 0,
                            y: isAnimating ? 0 : 20
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.5,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <motion.p
                            className={`text-lg font-semibold ${theme === 'light'
                                ? 'text-yellow-600'
                                : 'text-blue-400'
                                }`}
                            initial={{ scale: 0.8 }}
                            animate={{ scale: isAnimating ? 1 : 0.8 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.6,
                                ease: "easeOut"
                            }}
                        >
                            {theme === 'light' ? 'Light Mode' : 'Dark Mode'}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook to manage theme switch overlay
export function useThemeSwitchOverlay() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    const showThemeSwitchOverlay = () => {
        setIsOverlayVisible(true);
    };

    const hideThemeSwitchOverlay = () => {
        setIsOverlayVisible(false);
    };

    return {
        isOverlayVisible,
        showThemeSwitchOverlay,
        hideThemeSwitchOverlay
    };
}
