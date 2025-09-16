"use client"

import React from 'react'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

import { motion } from 'motion/react'

import Image from 'next/image'

import { getLocalizedText } from '@/lib/utils'

export default function ImageLayout({ bannerData, currentLocale }: ImageLayoutProps) {
    return (
        <ScrollReveal direction="left" distance={120} delay={180}>
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
    )
}
