"use client"

import React from 'react'

import { motion } from 'motion/react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import { getLocalizedButtonText, getLocalizedText } from '@/lib/utils'

import { useStateBanner } from '@/components/banner/lib/useStateBanner'

export default function TextLayout({ bannerData, currentLocale }: TextLayoutProps) {
    const primaryButton = bannerData.button?.[0]
    const buttonContent = primaryButton
        ? getLocalizedButtonText(primaryButton, currentLocale)
        : null

    const { PlatformIcon } = useStateBanner()

    return (
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
                    <Link href={buttonContent.href} className='cursor-pointer' rel="noreferrer noopener">
                        <Button size="lg" className="rounded-xl px-6 py-6 text-base cursor-pointer capitalize gap-2">
                            {buttonContent.label}
                            <PlatformIcon className="h-5 w-5" />
                        </Button>
                    </Link>
                </motion.div>
            )}
        </div>
    )
}
