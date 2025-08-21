"use client"

import React, { useEffect, useMemo, useState } from 'react'

import { BannerItem } from '@/types/Banner'

import { useParams } from 'next/navigation';

import { ScrollReveal } from '../ui/ScrollReveal';

import { motion } from 'motion/react';

import Image from 'next/image';

import left from "@/base/assets/left.png"

import right from "@/base/assets/right.png"

import star_white_1 from "@/base/assets/star_white-1.png"

import star_white_2 from "@/base/assets/star_white-2.png"

import { Button } from "../ui/button";

import { getLocalizedButtonText, getLocalizedText } from "@/lib/utils";

import Link from 'next/link';

import { Monitor, Smartphone, Apple, Laptop } from 'lucide-react'

export default function BannerLayout({ bannerData }: { bannerData: BannerItem }) {
    const params = useParams();

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';
    const primaryButton = bannerData.button?.[0];
    const buttonContent = primaryButton
        ? getLocalizedButtonText(primaryButton, currentLocale)
        : null;

    const [platformKey, setPlatformKey] = useState<'android' | 'ios' | 'macos' | 'windows'>('windows')

    useEffect(() => {
        if (typeof navigator === 'undefined') return
        const ua = navigator.userAgent.toLowerCase()
        if (/android/.test(ua)) return setPlatformKey('android')
        if (/iphone|ipad|ipod/.test(ua)) return setPlatformKey('ios')
        if (/macintosh|mac os x/.test(ua)) return setPlatformKey('macos')
        setPlatformKey('windows')
    }, [])

    const PlatformIcon = useMemo(() => {
        const map = {
            android: Smartphone,
            ios: Apple,
            macos: Laptop,
            windows: Monitor,
        } as const
        return map[platformKey] || Monitor
    }, [platformKey])

    return (
        <section className="relative overflow-hidden py-10 px-4 md:px-6 lg:px-10">
            <div className="max-w-7xl bg-foreground pt-10 md:pt-0 text-background mx-auto relative rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-10 items-center z-50">
                    {/* Left: Content */}
                    <div className="relative z-10 space-y-5 pl-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 16 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                            className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
                        >
                            {getLocalizedText(bannerData.title, currentLocale)}
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.3 }}
                            transition={{ duration: 0.45, ease: 'easeOut', delay: 0.05 }}
                            className="text-muted-foreground max-w-xl"
                        >
                            {getLocalizedText(bannerData.text, currentLocale)}
                        </motion.p>

                        {buttonContent && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.4, ease: 'easeOut', delay: 0.1 }}
                                className="pt-2"
                            >
                                <Link href={buttonContent.href} className='cursor-pointer' target="_blank" rel="noreferrer noopener">
                                    <Button size="lg" className="rounded-xl px-6 py-6 text-base cursor-pointer capitalize gap-2">
                                        {buttonContent.label}
                                        <PlatformIcon className="h-5 w-5" />
                                    </Button>
                                </Link>
                            </motion.div>
                        )}
                    </div>

                    {/* Right: Preview Image */}
                    <ScrollReveal direction="right" distance={120} delay={180}>
                        <div className="relative order-1 md:order-2">
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, scale: 0.98 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            >
                                <Image
                                    src={bannerData.image}
                                    alt={getLocalizedText(bannerData.title, currentLocale)}
                                    width={900}
                                    height={700}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </motion.div>
                        </div>
                    </ScrollReveal>
                </div>

                {/* Decorative background elements */}
                <div className="pointer-events-none absolute inset-0">
                    <Image src={left} alt="decorative left" className="absolute right-0 top-0 w-[480px] opacity-10 dark:invert" />
                    <Image src={right} alt="decorative right" className="absolute left-0 bottom-0 w-[520px] opacity-20 dark:invert" />
                    <Image src={star_white_1} alt="star" className="absolute left-[10%] top-[20%] w-5 opacity-70 dark:invert" />
                    <Image src={star_white_2} alt="star" className="absolute right-[39%] top-[12%] w-6 opacity-70 dark:invert" />
                </div>
            </div>
        </section>
    )
}
