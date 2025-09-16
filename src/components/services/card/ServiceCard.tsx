"use client"

import React from 'react'

import Image from 'next/image'

import { getLocalizedText } from '@/lib/utils'

import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"

import { motion } from 'motion/react'

import { serviceItemVariants } from '@/base/layout/animation/animation'

export default function ServiceCard({ item, locale }: ServiceCardProps) {
    const localizedTitle = getLocalizedText(item.title, locale)
    const localizedDescription = getLocalizedText(item.description, locale)

    return (
        <motion.div
            variants={serviceItemVariants}
            whileHover={{ y: -6 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
        >
            <Card className="group h-full backdrop-blur-sm hover:shadow-md transition-[box-shadow,_border-color] duration-300 ease-out bg-card/50 hover:border-gray-400">
                <CardContent>
                    <div className="relative w-full aspect-[16/9] md:aspect-[4/3] rounded-lg overflow-hidden bg-muted/50">
                        <Image
                            src={item.image}
                            alt={localizedTitle}
                            fill
                            loading="lazy"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            className="object-contain p-4 sm:p-6 transition-transform duration-300 ease-out group-hover:scale-105"
                            quality={100}
                        />
                    </div>
                </CardContent>

                <CardContent className="space-y-2">
                    <CardTitle className="text-lg md:text-xl font-semibold text-foreground leading-snug capitalize">
                        {localizedTitle}
                    </CardTitle>

                    <CardDescription className="text-sm md:text-base leading-relaxed">
                        {localizedDescription}
                    </CardDescription>
                </CardContent>
            </Card>
        </motion.div>
    )
}


