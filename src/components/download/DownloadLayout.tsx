"use client"

import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Monitor, Smartphone, Apple, Laptop, Download as DownloadIcon } from 'lucide-react'

import logo from '@/base/assets/logo.png'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import BlurText from "@/components/ui/BlurText"

import { motion } from 'framer-motion'

import { useParams } from 'next/navigation'

import { useManagementDownload } from '@/components/download/lib/useManagementDownload'

type PlatformKey = 'android' | 'ios' | 'macos' | 'windows'

import { BackgroundPattern, localizedTexts } from "@/base/helper/BackgroundPattern"

export default function DownloadLayout({ downloadData, preferredPlatform }: { downloadData: DownloadItem[]; preferredPlatform?: PlatformKey }) {
    const params = useParams()
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en'

    // Use the custom hook for state management
    const {
        platforms,
        groupedByVersion,
        sortedVersions,
        latestVersion,
        platformMetaByKey,
        selectedItem,
        selectedPlatformLabel,
    } = useManagementDownload(downloadData, preferredPlatform)

    // Icon mapping for rendering
    const iconMap = {
        Smartphone,
        Apple,
        Laptop,
        Monitor
    }

    return (
        <section className="min-h-screen py-10 flex items-center relative overflow-hidden">
            <BackgroundPattern />
            <div className="container mx-auto px-4 md:px-6 lg:px-10 relative z-10">
                {/* Heading */}
                <motion.div
                    className="flex flex-col items-center justify-center pt-20 text-center gap-6 sm:gap-8"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.div
                        className="rounded-2xl bg-card p-6 sm:p-7 shadow-xl ring-1 ring-border/50"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                    >
                        <Image
                            src={logo}
                            alt="Rizverse"
                            width={96}
                            height={96}
                            className="size-16 sm:size-20 md:size-24 object-contain dark:invert"
                            priority
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
                    >
                        <BlurText
                            as="h1"
                            text={localizedTexts[currentLocale].downloadTitle}
                            animateBy="words"
                            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight"
                        />
                    </motion.div>

                    {selectedItem ? (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
                        >
                            <Button
                                size="lg"
                                className="px-6 cursor-pointer"
                                onClick={() => window.open(selectedItem.file, "_blank")}
                            >
                                {(() => {
                                    const meta = platformMetaByKey[(selectedItem.type as PlatformKey) || 'windows']
                                    const Icon = meta?.Icon ? iconMap[meta.Icon as keyof typeof iconMap] || Monitor : Monitor
                                    return <Icon className="size-5" />
                                })()}
                                {localizedTexts[currentLocale].downloadFor} {platformMetaByKey[(selectedItem.type as PlatformKey) || 'windows']?.label || 'Windows'}
                            </Button>
                        </motion.div>
                    ) : null}

                    {latestVersion ? (
                        <motion.p
                            className="text-sm text-muted-foreground"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
                        >
                            {`${localizedTexts[currentLocale].version} ${latestVersion}${selectedPlatformLabel ? ` ${localizedTexts[currentLocale].for} ${selectedPlatformLabel}` : ''}`}
                        </motion.p>
                    ) : null}
                </motion.div>

                {/* Download */}
                <div
                    className="mt-12 px-4"
                >
                    <motion.h2
                        className="mb-4 text-lg font-semibold tracking-tight"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.5, ease: "easeOut", delay: 0.6 }}
                    >
                        {localizedTexts[currentLocale].allVersions}
                    </motion.h2>
                    <Accordion type="single" collapsible defaultValue={sortedVersions[0]}>
                        {sortedVersions.map((version, idx) => (
                            <div
                                key={version}
                                className='border-b-2'
                            >
                                <AccordionItem
                                    value={version}
                                    className="bg-transparent text-card-foreground"
                                >
                                    <AccordionTrigger>
                                        <div className="flex items-center gap-3">
                                            <span className="font-medium">{localizedTexts[currentLocale].version} {version}</span>
                                            {idx === 0 && (
                                                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                                                    {localizedTexts[currentLocale].latestVersion}
                                                </span>
                                            )}
                                        </div>
                                    </AccordionTrigger>

                                    <AccordionContent>
                                        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
                                            {platforms.map(({ key, label, Icon }, platformIdx) => {
                                                const items = (groupedByVersion[version] || []).filter((i) => i.type === key)
                                                const IconComponent = iconMap[Icon as keyof typeof iconMap] || Monitor
                                                return (
                                                    <motion.div
                                                        key={key}
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        whileInView={{ opacity: 1, scale: 1 }}
                                                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.8 + (platformIdx * 0.1) }}
                                                    >
                                                        <Card className='p-0 bg-card'>
                                                            <CardHeader className="py-4">
                                                                <div className="flex items-center gap-2 border-b-2 pb-2">
                                                                    <IconComponent className="size-4" />
                                                                    <CardTitle className="text-base font-medium">{label}</CardTitle>
                                                                </div>
                                                            </CardHeader>

                                                            <CardContent className="p-0">
                                                                <div className="divide-y">
                                                                    {items.length > 0 ? (
                                                                        items.map((item) => (
                                                                            <button
                                                                                key={item.id}
                                                                                onClick={() => window.open(item.file, "_blank")}
                                                                                className="flex items-center justify-between p-4 text-sm hover:bg-muted/50 w-full text-left cursor-pointer"
                                                                            >
                                                                                <span>{label} – {version}</span>
                                                                                <DownloadIcon className="size-4" />
                                                                            </button>
                                                                        ))
                                                                    ) : (
                                                                        <div className="p-4 text-sm text-muted-foreground">{localizedTexts[currentLocale].notAvailable}</div>
                                                                    )}
                                                                </div>
                                                            </CardContent>
                                                        </Card>
                                                    </motion.div>
                                                )
                                            })}
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            </div>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section >
    )
}
