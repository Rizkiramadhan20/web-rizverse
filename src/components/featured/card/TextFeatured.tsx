"use client"

import React from 'react'

import { motion } from 'motion/react'

import { getLocalizedText } from '@/lib/utils'

import { Sparkles, BadgeCheck, ShieldCheck } from 'lucide-react'

export default function TextFeatured({ featuredData, currentLocale }: TextFeaturedProps) {
    return (
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
                    const icons = [Sparkles, BadgeCheck, ShieldCheck] as const
                    const IconComponent = icons[index % icons.length]
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
                    )
                })}
            </div>
        </div>
    )
}


