"use client"

import React from 'react'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

import { motion } from 'motion/react'

import Image from 'next/image'

import { getLocalizedText } from '@/lib/utils'

export default function ImageFeaturd({ featuredData, currentLocale }: ImageFeaturdProps) {
    return (
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
    )
}


