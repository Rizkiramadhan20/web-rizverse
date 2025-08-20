'use client'

import React, { useState, useEffect } from 'react';

import { motion, AnimatePresence } from 'motion/react';

interface LanguageSwitchOverlayProps {
    isVisible: boolean;
    onAnimationComplete: () => void;
    fromLanguage: string;
    toLanguage: string;
}

export function LanguageSwitchOverlay({
    isVisible,
    onAnimationComplete,
    fromLanguage,
    toLanguage
}: LanguageSwitchOverlayProps) {
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

    const getLanguageInfo = (lang: string) => {
        switch (lang) {
            case 'id':
                return {
                    name: 'Indonesia',
                    flag: '🇮🇩',
                    color: 'from-red-500 to-white',
                    textColor: 'text-red-600'
                };
            case 'en':
                return {
                    name: 'English',
                    flag: '🇺🇸',
                    color: 'from-blue-500 to-red-500',
                    textColor: 'text-blue-600'
                };
            default:
                return {
                    name: lang.toUpperCase(),
                    flag: '🌐',
                    color: 'from-gray-500 to-gray-600',
                    textColor: 'text-gray-600'
                };
        }
    };

    const fromLangInfo = getLanguageInfo(fromLanguage);
    const toLangInfo = getLanguageInfo(toLanguage);

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

                    {/* Central language switch animation */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative flex items-center gap-8">
                            {/* From Language */}
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, x: -30, y: 20 }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    x: isAnimating ? 0 : -30,
                                    y: isAnimating ? 0 : 20
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.1,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <motion.div
                                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${fromLangInfo.color} shadow-2xl flex items-center justify-center border-4 border-white/20`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: isAnimating ? 1 : 0,
                                        y: isAnimating ? 0 : 10,
                                        rotate: isAnimating ? [0, -10, 0] : 0
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.2,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <motion.span
                                        className="text-3xl"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: isAnimating ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.3,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        {fromLangInfo.flag}
                                    </motion.span>
                                </motion.div>
                                <motion.p
                                    className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium ${fromLangInfo.textColor} whitespace-nowrap`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: isAnimating ? 1 : 0,
                                        y: isAnimating ? 0 : 10
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.4,
                                        ease: "easeOut"
                                    }}
                                >
                                    {fromLangInfo.name}
                                </motion.p>
                            </motion.div>

                            {/* Arrow/Transition */}
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    y: isAnimating ? 0 : 20
                                }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.3,
                                    ease: "easeOut"
                                }}
                            >
                                <motion.div
                                    className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg flex items-center justify-center"
                                    animate={{
                                        rotate: isAnimating ? [0, 180, 360] : 0
                                    }}
                                    transition={{
                                        duration: 1.2,
                                        delay: 0.4,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <motion.svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        animate={{
                                            x: isAnimating ? [0, 5, 0] : 0
                                        }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.5,
                                            ease: "easeInOut",
                                            repeat: isAnimating ? Infinity : 0,
                                            repeatType: "reverse"
                                        }}
                                    >
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </motion.svg>
                                </motion.div>
                            </motion.div>

                            {/* To Language */}
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, x: 30, y: 20 }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    x: isAnimating ? 0 : 30,
                                    y: isAnimating ? 0 : 20
                                }}
                                transition={{
                                    duration: 0.5,
                                    delay: 0.2,
                                    ease: [0.25, 0.46, 0.45, 0.94]
                                }}
                            >
                                <motion.div
                                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${toLangInfo.color} shadow-2xl flex items-center justify-center border-4 border-white/20`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: isAnimating ? 1 : 0,
                                        y: isAnimating ? 0 : 10,
                                        rotate: isAnimating ? [0, 10, 0] : 0
                                    }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.3,
                                        ease: "easeInOut"
                                    }}
                                >
                                    <motion.span
                                        className="text-3xl"
                                        initial={{ opacity: 0 }}
                                        animate={{
                                            opacity: isAnimating ? 1 : 0
                                        }}
                                        transition={{
                                            duration: 0.4,
                                            delay: 0.4,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        {toLangInfo.flag}
                                    </motion.span>
                                </motion.div>
                                <motion.p
                                    className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm font-medium ${toLangInfo.textColor} whitespace-nowrap`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{
                                        opacity: isAnimating ? 1 : 0,
                                        y: isAnimating ? 0 : 10
                                    }}
                                    transition={{
                                        duration: 0.4,
                                        delay: 0.5,
                                        ease: "easeOut"
                                    }}
                                >
                                    {toLangInfo.name}
                                </motion.p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Floating language particles */}
                    <div className="absolute inset-0 overflow-hidden">
                        {[...Array(8)].map((_, i) => (
                            <motion.div
                                key={i}
                                className={`absolute w-3 h-3 rounded-full ${i % 2 === 0
                                    ? 'bg-red-400/60'
                                    : 'bg-blue-400/60'
                                    }`}
                                style={{
                                    left: `${15 + i * 10}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                }}
                                initial={{
                                    opacity: 0,
                                    y: 0,
                                    x: 0
                                }}
                                animate={{
                                    opacity: isAnimating ? 1 : 0,
                                    y: isAnimating ? [-15, 15, -15] : 0,
                                    x: isAnimating ? [-10, 10, -10] : 0
                                }}
                                transition={{
                                    duration: 1.5,
                                    delay: 0.6 + i * 0.1,
                                    ease: "easeInOut",
                                    repeat: isAnimating ? Infinity : 0,
                                    repeatType: "reverse"
                                }}
                            />
                        ))}
                    </div>

                    {/* Language switch text */}
                    <motion.div
                        className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: isAnimating ? 1 : 0,
                            y: isAnimating ? 0 : 20
                        }}
                        transition={{
                            duration: 0.5,
                            delay: 0.7,
                            ease: [0.25, 0.46, 0.45, 0.94]
                        }}
                    >
                        <motion.p
                            className="text-lg font-semibold text-foreground"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: isAnimating ? 1 : 0.8 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.8,
                                ease: "easeOut"
                            }}
                        >
                            Switching Language
                        </motion.p>
                        <motion.p
                            className="text-sm text-muted-foreground mt-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isAnimating ? 1 : 0 }}
                            transition={{
                                duration: 0.3,
                                delay: 0.9,
                                ease: "easeOut"
                            }}
                        >
                            {fromLangInfo.name} → {toLangInfo.name}
                        </motion.p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Hook to manage language switch overlay
export function useLanguageSwitchOverlay() {
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [fromLanguage, setFromLanguage] = useState('');
    const [toLanguage, setToLanguage] = useState('');

    const showLanguageSwitchOverlay = (from: string, to: string) => {
        setFromLanguage(from);
        setToLanguage(to);
        setIsOverlayVisible(true);
    };

    const hideLanguageSwitchOverlay = () => {
        setIsOverlayVisible(false);
    };

    return {
        isOverlayVisible,
        fromLanguage,
        toLanguage,
        showLanguageSwitchOverlay,
        hideLanguageSwitchOverlay
    };
}
