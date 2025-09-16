"use client"

import React, { useState } from 'react'

import { useParams } from 'next/navigation'

import { motion } from 'motion/react'

import PriceCard from '@/components/price/card/PriceCard'

import SpotlightCard from '@/components/ui/SpotlightCard'

import { ScrollReveal } from '@/components/ui/ScrollReveal';

export default function PriceLayout({ priceData }: { priceData: PriceItem[] }) {
    const params = useParams()
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en'

    const [filter, setFilter] = useState<'semua' | 'tahun' | 'bulan'>('semua')

    const filteredData = priceData.filter(item => {
        const pkg = (item.paket_up || '').toLowerCase()
        if (filter === 'tahun') return pkg.includes('tahun') || pkg.includes('year')
        if (filter === 'bulan') return pkg.includes('bulan') || pkg.includes('month')
        return true
    })

    const categoryKeys: Array<'semua' | 'tahun' | 'bulan'> = ['semua', 'tahun', 'bulan']

    const labels: Record<'semua' | 'tahun' | 'bulan', string> = {
        semua: currentLocale === 'en' ? 'All' : 'Semua',
        tahun: currentLocale === 'en' ? 'Billed annually' : 'Tagihan tahunan',
        bulan: currentLocale === 'en' ? 'Billed monthly' : 'Tagihan bulanan',
    }

    return (
        <section id="pricing" className="relative py-10 bg-background overflow-hidden">
            <div className="container px-4 md:px-6 lg:px-10">
                <div
                    className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                    <ScrollReveal direction="right" distance={100} delay={200}>
                        <div className="space-y-1">
                            <motion.h2
                                className="text-3xl md:text-4xl font-semibold tracking-tight"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <span className="text-primary">{currentLocale === 'en' ? 'Plan' : 'Rencanakan'}</span>, {currentLocale === 'en' ? 'build, and ship.' : 'bangun, dan rilis.'}
                            </motion.h2>
                            <motion.p
                                className="text-muted-foreground"
                                initial={{ opacity: 0, y: 16 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                            >
                                {currentLocale === 'en' ? 'One tool. One price.' : 'Satu alat. Satu harga.'}
                            </motion.p>
                        </div>
                    </ScrollReveal>

                    <ScrollReveal direction="left" distance={100} delay={200}>
                        <div className="overflow-x-auto flex items-center justify-start md:justify-center mb-2 md:mb-5 w-full md:w-fit">
                            <div className="flex items-center justify-start md:justify-center gap-1 sm:gap-2 p-1 bg-secondary/20 dark:bg-secondary/10 rounded-xl border border-border w-fit md:max-w-full sm:min-w-0">
                                {categoryKeys.map((key) => (
                                    <motion.button
                                        key={key}
                                        whileInView={{ scale: [0.9, 1] }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.3 }}
                                        className={`relative px-3 sm:px-6 py-2 sm:py-2.5 rounded-lg text-sm sm:text-base font-medium whitespace-nowrap transition-colors duration-200 capitalize cursor-pointer ${filter === key
                                            ? 'text-primary-foreground'
                                            : 'text-muted-foreground hover:text-foreground'
                                            }`}
                                        onClick={() => setFilter(key)}
                                    >
                                        {filter === key && (
                                            <motion.div
                                                layoutId="activeProjectCategory"
                                                className="absolute inset-0 bg-primary rounded-lg"
                                                initial={false}
                                                transition={{
                                                    type: 'spring',
                                                    stiffness: 400,
                                                    damping: 30,
                                                }}
                                            />
                                        )}
                                        <span className="relative z-10">{labels[key]}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredData.map((item, index) => (
                        <SpotlightCard key={index} className="p-6">
                            <PriceCard item={item} index={index} currentLocale={currentLocale} />
                        </SpotlightCard>
                    ))}
                </div>
            </div>
        </section>
    )
}
