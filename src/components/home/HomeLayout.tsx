"use client"

import React from 'react'

import Image from 'next/image'

import TextContent from '@/components/home/card/TextContent';

import { motion } from 'motion/react';

import start1 from "@/base/assets/star1.png"

import start2 from "@/base/assets/star2.png"

import { getLocalizedText, getLocalizedButtonText } from '@/lib/utils';

import { useParams } from 'next/navigation';

import CardSwap, { Card } from '@/components/ui/CardSwap';

import ImageCard from '@/components/home/card/ImageCard';

import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { ParallaxElement } from '@/components/ui/ParallaxElement';

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
                {/* Star decorations with animations */}
                <ParallaxElement speed={0.3} className="absolute top-10 left-10 md:top-20 md:left-20">
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
                    >
                        <Image
                            src={start1}
                            alt="Star decoration"
                            loading='lazy'
                            className="w-6 h-6 md:w-8 md:h-8 dark:invert"
                        />
                    </motion.div>
                </ParallaxElement>

                <ParallaxElement speed={0.2} className="absolute bottom-10 left-10 md:bottom-20 md:left-20">
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
                    >
                        <Image
                            src={start2}
                            alt="Star decoration"
                            loading='lazy'
                            className="w-4 h-4 md:w-6 md:h-6 dark:invert"
                        />
                    </motion.div>
                </ParallaxElement>

                {/* Additional animated stars for more visual interest */}
                <ParallaxElement speed={0.4} className="absolute top-16 right-16 md:top-32 md:right-32">
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
                    >
                        <Image
                            src={start1}
                            alt="Star decoration"
                            loading='lazy'
                            className="w-3 h-3 md:w-4 md:h-4 dark:invert"
                        />
                    </motion.div>
                </ParallaxElement>

                <ParallaxElement speed={0.25} className="absolute bottom-16 right-16 md:bottom-32 md:right-32">
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
                    >
                        <Image
                            src={start2}
                            alt="Star decoration"
                            loading='lazy'
                            className="w-3 h-3 md:w-5 md:h-5 dark:invert"
                        />
                    </motion.div>
                </ParallaxElement>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left Section - Text Content */}
                    <ScrollReveal direction="left" className='pt-20 md:pt-0' distance={100} delay={200}>
                        <TextContent
                            title={localizedTitle}
                            description={localizedDescription}
                            buttons={localizedButtons}
                        />
                    </ScrollReveal>

                    {/* Right Section - Swapping Image Cards */}
                    <ScrollReveal direction="right" distance={100} delay={400}>
                        <div className="relative flex justify-center items-center overflow-hidden order-first lg:order-last pt-28">
                            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-none h-[300px] md:h-[380px] lg:h-[460px] xl:h-[520px]">
                                <CardSwap
                                    width="100%"
                                    height="100%"
                                    delay={5000}
                                    pauseOnHover
                                    easing="elastic"
                                    cardDistance={48}
                                    verticalDistance={56}
                                    skewAmount={6}
                                    containerClassName="relative w-full h-full perspective-[900px]"
                                >
                                    {homeData.image.map((src, idx) => (
                                        <Card key={idx} customClass="overflow-hidden bg-transparent border-0">
                                            <ImageCard
                                                src={src}
                                                alt={localizedTitle}
                                                priority={idx === 0}
                                                quality={100}
                                            />
                                        </Card>
                                    ))}
                                </CardSwap>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
