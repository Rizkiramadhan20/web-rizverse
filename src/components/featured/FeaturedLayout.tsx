"use client"

import React from 'react'

import { FeaturedItem } from "@/types/Featured";

import { useParams } from 'next/navigation';

import { ScrollReveal } from '../ui/ScrollReveal';

import { motion } from 'motion/react';

import Image from 'next/image';

import { getLocalizedText } from '@/lib/utils';

import { Sparkles, BadgeCheck, ShieldCheck } from 'lucide-react';

export default function FeaturedLayout({ featuredData }: { featuredData: FeaturedItem }) {
    const params = useParams();

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';

    return (
        <section className='relative py-10 bg-background overflow-hidden' id='featured'>
            <div className="container px-4 md:px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left: Image */}
                    <ScrollReveal direction="left" distance={100} delay={200}>
                        <div className="relative flex justify-center items-center order-first lg:order-none">
                            <div className="relative w-full max-w-md md:max-w-lg lg:max-w-none">
                                <motion.div
                                    className="relative overflow-hidden rounded-2xl"
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                >
                                    <Image
                                        src={featuredData.image}
                                        alt={getLocalizedText(featuredData.title, currentLocale)}
                                        width={900}
                                        height={700}
                                        sizes="(min-width: 1024px) 600px, 100vw"
                                        className="w-full h-auto object-cover"
                                        priority
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Right: Content */}
                    <div className="space-y-4 md:space-y-6">
                        <motion.span
                            className="text-xs md:text-sm font-medium tracking-wider text-destructive uppercase"
                            initial={{ opacity: 0, y: 8 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        >
                            Features
                        </motion.span>

                        <motion.h2
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="text-2xl md:text-3xl lg:text-4xl font-bold"
                        >
                            {getLocalizedText(featuredData.title, currentLocale)}
                        </motion.h2>

                        <motion.p
                            className="text-muted-foreground max-w-prose"
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.05 }}
                        >
                            {getLocalizedText(featuredData.text, currentLocale)}
                        </motion.p>

                        <div className="space-y-5">
                            {featuredData.features.map((feature, index) => {
                                const icons = [Sparkles, BadgeCheck, ShieldCheck] as const;
                                const IconComponent = icons[index % icons.length];
                                return (
                                    <motion.div
                                        key={`${feature.title.id}-${index}`}
                                        className="flex items-start gap-3"
                                        initial={{ opacity: 0, y: 12 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, amount: 0.2 }}
                                        transition={{ duration: 0.45, ease: 'easeOut', delay: 0.08 * index }}
                                    >
                                        <div className="mt-1 flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                                            <IconComponent size={14} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-base md:text-lg font-semibold">
                                                {getLocalizedText(feature.title, currentLocale)}
                                            </h3>
                                            <p className="text-sm md:text-base text-muted-foreground">
                                                {getLocalizedText(feature.description, currentLocale)}
                                            </p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
