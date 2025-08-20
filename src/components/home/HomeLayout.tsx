"use client"

import React from 'react'

import Image from 'next/image'

import { HomeItem } from "@/types/Home";

import Link from 'next/link';

import { Button } from '@/components/ui/button';

import { ArrowRight, Play } from 'lucide-react';

import { motion } from 'motion/react';

import start1 from "@/base/assets/star1.png"

import start2 from "@/base/assets/star2.png"

import Blob1 from "@/base/assets/blobs1.png"

import Blob2 from "@/base/assets/blobs2.png"

import { getLocalizedText, getLocalizedButtonText } from '@/lib/utils';

import { useParams } from 'next/navigation';

export default function HomeLayout({ homeData }: { homeData: HomeItem }) {
    const params = useParams();

    // Get locale from params (same as routing system)
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';

    // Get localized content
    const localizedTitle = getLocalizedText(homeData.title, currentLocale);
    const localizedDescription = getLocalizedText(homeData.description, currentLocale);
    const localizedButtons = homeData.button.map(button =>
        getLocalizedButtonText(button, currentLocale)
    );

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Blob decorations */}
                <Image
                    src={Blob1}
                    alt="Blob decoration"
                    loading='lazy'
                    className="absolute top-1/4 left-1/4 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] opacity-20 transform -translate-y-1/2 -translate-x-1/2"
                />
                <Image
                    src={Blob2}
                    alt="Blob decoration"
                    loading='lazy'
                    className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] lg:w-[400px] lg:h-[400px]"
                />

                {/* Star decorations with animations */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                        opacity: [0.3, 0.8, 0.3],
                        y: [0, -10, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-10 left-10 md:top-20 md:left-20"
                >
                    <Image
                        src={start1}
                        alt="Star decoration"
                        loading='lazy'
                        className="w-6 h-6 md:w-8 md:h-8"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{
                        opacity: [0.2, 0.6, 0.2],
                        y: [0, 15, 0],
                        rotate: [0, -8, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                    className="absolute bottom-10 left-10 md:bottom-20 md:left-20"
                >
                    <Image
                        src={start2}
                        alt="Star decoration"
                        loading='lazy'
                        className="w-4 h-4 md:w-6 md:h-6"
                    />
                </motion.div>

                {/* Additional animated stars for more visual interest */}
                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.5, 0],
                        scale: [0.8, 1.2, 0.8]
                    }}
                    transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5
                    }}
                    className="absolute top-16 right-16 md:top-32 md:right-32"
                >
                    <Image
                        src={start1}
                        alt="Star decoration"
                        loading='lazy'
                        className="w-3 h-3 md:w-4 md:h-4"
                    />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                        opacity: [0, 0.4, 0],
                        scale: [0.6, 1, 0.6]
                    }}
                    transition={{
                        duration: 3.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2
                    }}
                    className="absolute bottom-16 right-16 md:bottom-32 md:right-32"
                >
                    <Image
                        src={start2}
                        alt="Star decoration"
                        loading='lazy'
                        className="w-3 h-3 md:w-5 md:h-5"
                    />
                </motion.div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Section - Text Content */}
                    <div className="space-y-6 md:space-y-8 text-center lg:text-left">
                        {/* Main Headline */}
                        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-foreground leading-tight capitalize">
                            {localizedTitle}
                        </h1>

                        {/* Description */}
                        <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
                            {localizedDescription}
                        </p>

                        {/* Call-to-Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start items-stretch sm:items-center">
                            {localizedButtons.map((item, idx) => {
                                if (idx === 0) {
                                    // Primary button with arrow
                                    return (
                                        <Button
                                            key={idx}
                                            asChild
                                            className="bg-primary text-primary-foreground hover:bg-primary/90 py-5 sm:py-6 w-full sm:w-44 text-base md:text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                        >
                                            <Link href={item.href} className='capitalize'>
                                                {item.label}
                                                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                            </Link>
                                        </Button>
                                    );
                                } else {
                                    // Secondary button with play icon
                                    return (
                                        <Button
                                            key={idx}
                                            variant="ghost"
                                            asChild
                                            className="text-foreground hover:bg-transparent py-5 sm:py-6 w-full sm:w-fit text-base md:text-lg font-medium rounded-lg transition-all duration-300"
                                        >
                                            <Link href={item.href} className="flex items-center justify-center sm:justify-start capitalize">
                                                <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mr-3 shrink-0">
                                                    <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground ml-1" />
                                                </div>
                                                {item.label}
                                            </Link>
                                        </Button>
                                    );
                                }
                            })}
                        </div>
                    </div>

                    {/* Right Section - Your Image */}
                    <div className="relative flex justify-center items-center pt-8 md:pt-12  order-first lg:order-last">
                        <div className="relative w-full max-w-md md:max-w-lg lg:max-w-none aspect-[4/5]">
                            <Image
                                src={homeData.image}
                                alt={localizedTitle}
                                fill
                                className="object-contain"
                                priority
                                quality={100}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
