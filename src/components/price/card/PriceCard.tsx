"use client"

import React from 'react'

import { motion } from 'motion/react'

import { Check } from "lucide-react"

import { Card, CardHeader, CardTitle, CardAction, CardContent } from '@/components/ui/card'

export default function PriceCard({ item, index, currentLocale }: PriceCardProps) {
    const formatPrice = (value?: string | null) => {
        if (!value) return "-"
        return currentLocale === 'id' ? `Rp ${value}` : `Rp ${value}`
    }

    const showPrice = item.discount ?? item.originalPrice

    return (
        <Card className="bg-transparent border-0 p-0 relative">
            <CardHeader className="mb-4">
                <CardTitle className="text-lg font-medium">{item.title[currentLocale]}</CardTitle>
                {item.labelDisc && item.discount && (
                    <CardAction>
                        <span className="text-xs rounded-md bg-emerald-500/15 text-emerald-400 px-2 py-1">
                            {item.labelDisc[currentLocale]}
                        </span>
                    </CardAction>
                )}
            </CardHeader>

            <CardContent>
                <motion.div
                    initial={{ opacity: 0, y: 24, scale: 0.98 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: index * 0.06 }}
                >
                    <div className="flex items-end gap-2">
                        <span className="text-3xl md:text-4xl font-semibold">
                            {formatPrice(showPrice)}
                        </span>
                        <span className="text-sm text-muted-foreground">/ {item.paket_up || (currentLocale === 'en' ? 'period' : 'periode')}</span>
                    </div>

                    {item.discount && (
                        <div className="text-xs text-muted-foreground mt-1">
                            <span className="line-through opacity-70">{formatPrice(item.originalPrice)}</span>
                        </div>
                    )}

                    <ul className="space-y-3 mt-6">
                        {item.list?.map((li, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm">
                                <Check className="mt-0.5 size-4 text-emerald-500" />
                                <span>{li.title[currentLocale]}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </CardContent>
        </Card>
    )
}
