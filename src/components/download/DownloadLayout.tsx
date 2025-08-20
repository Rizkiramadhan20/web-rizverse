"use client"

import React from 'react'

import Image from 'next/image'

import { Button } from '@/components/ui/button'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Monitor, Smartphone, Apple, Laptop, Download as DownloadIcon } from 'lucide-react'

import logo from '@/base/assets/logo.png'

import { DownloadItem } from "@/types/Download"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

import BlurText from "@/components/ui/BlurText";

import { motion } from 'framer-motion'

type PlatformKey = 'android' | 'ios' | 'macos' | 'windows'

import { useParams } from 'next/navigation'

// Localized text content
const localizedTexts = {
    id: {
        downloadTitle: "Unduh Rizverse",
        allVersions: "Semua Versi",
        latestVersion: "Versi terbaru",
        notAvailable: "Tidak tersedia",
        downloadFor: "Unduh untuk",
        version: "Versi",
        for: "untuk"
    },
    en: {
        downloadTitle: "Download Rizverse",
        allVersions: "All Versions",
        latestVersion: "Latest version",
        notAvailable: "Not available",
        downloadFor: "Download for",
        version: "Version",
        for: "for"
    }
} as const;

// Background Pattern Component
const BackgroundPattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012]">
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(90deg, transparent 98%, currentColor 100%),
                    linear-gradient(0deg, transparent 98%, currentColor 100%)
                `,
                backgroundSize: '60px 60px'
            }} />
        </div>

        {/* Floating Geometric Shapes - Using theme colors */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-primary/8 to-ring/6 blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-chart-2/8 to-chart-3/6 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-gradient-to-br from-chart-4/8 to-chart-5/6 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-accent/8 to-secondary/6 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Hexagon Pattern - Using theme colors */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 opacity-8">
            <div className="w-full h-full bg-gradient-to-br from-primary/6 to-ring/4 transform rotate-45 rounded-lg" />
        </div>
        <div className="absolute top-3/4 right-1/4 w-10 h-10 opacity-8">
            <div className="w-full h-full bg-gradient-to-br from-chart-2/6 to-chart-3/4 transform -rotate-45 rounded-lg" />
        </div>

        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-[0.006] dark:opacity-[0.01]">
            <div className="absolute inset-0 transform -skew-y-12" style={{
                backgroundImage: `
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 3px,
                        currentColor 3px,
                        currentColor 6px
                    )
                `,
                backgroundSize: '12px 12px'
            }} />
        </div>

        {/* Radial Gradient Overlay - Using theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/2 dark:to-primary/3" />

        {/* Subtle border accent */}
        <div className="absolute inset-0 opacity-[0.004] dark:opacity-[0.008]">
            <div className="absolute inset-0 border border-border/20 rounded-3xl" />
        </div>
    </div>
)

export default function DownloadLayout({ downloadData, preferredPlatform }: { downloadData: DownloadItem[]; preferredPlatform?: PlatformKey }) {
    const params = useParams()
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en'

    const platforms = [
        { key: 'android', label: 'Android', Icon: Smartphone },
        { key: 'ios', label: 'iOS', Icon: Apple },
        { key: 'macos', label: 'macOS', Icon: Laptop },
        { key: 'windows', label: 'Windows', Icon: Monitor },
    ] as const

    // Function to download file directly without navigation
    const downloadFile = async (url: string, filename?: string) => {
        try {
            // For Google Drive links, we need to handle them differently
            if (url.includes('drive.google.com')) {
                // Extract file ID and create a direct download link
                const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
                if (fileId) {
                    // Create a temporary link element for direct download
                    const link = document.createElement('a')
                    link.href = `https://drive.google.com/uc?export=download&id=${fileId}`
                    link.download = filename || 'rizverse-download'
                    link.target = '_blank'
                    link.rel = 'noopener noreferrer'

                    // Add to DOM, click, and remove
                    document.body.appendChild(link)
                    link.click()
                    document.body.removeChild(link)
                    return
                }
            }

            // For other URLs, try to fetch and download
            const response = await fetch(url, {
                method: 'GET',
                mode: 'cors',
                credentials: 'omit'
            })

            if (!response.ok) {
                throw new Error(`Download failed: ${response.status}`)
            }

            const blob = await response.blob()
            const downloadUrl = window.URL.createObjectURL(blob)

            const link = document.createElement('a')
            link.href = downloadUrl
            link.download = filename || 'rizverse-download'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

            window.URL.revokeObjectURL(downloadUrl)
        } catch (error) {
            console.error('Download error:', error)

            // For Google Drive, always fallback to direct link
            if (url.includes('drive.google.com')) {
                const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
                if (fileId) {
                    const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
                    window.open(directDownloadUrl, '_blank')
                    return
                }
            }

            // Fallback: open in new tab if direct download fails
            window.open(url, '_blank')
        }
    }

    // Function to handle Google Drive links specifically
    const handleDownload = (url: string, filename?: string) => {
        if (url.includes('drive.google.com')) {
            // For Google Drive, extract file ID and create direct download
            const fileId = url.match(/\/d\/([a-zA-Z0-9-_]+)/)?.[1]
            if (fileId) {
                // Create a temporary link element for direct download
                const link = document.createElement('a')
                link.href = `https://drive.google.com/uc?export=download&id=${fileId}`
                link.download = filename || 'rizverse-download'
                link.target = '_blank'
                link.rel = 'noopener noreferrer'

                // Add to DOM, click, and remove
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            } else {
                // Fallback to opening in new tab
                window.open(url, '_blank')
            }
        } else {
            // For other URLs, try direct download
            downloadFile(url, filename)
        }
    }

    const groupedByVersion: Record<string, DownloadItem[]> = downloadData.reduce((acc, item) => {
        if (!acc[item.version]) acc[item.version] = []
        acc[item.version].push(item)
        return acc
    }, {} as Record<string, DownloadItem[]>)

    const compareVersions = (a: string, b: string) => {
        const pa = a.split('.').map(Number)
        const pb = b.split('.').map(Number)
        const len = Math.max(pa.length, pb.length)
        for (let i = 0; i < len; i++) {
            const da = pa[i] || 0
            const db = pb[i] || 0
            if (da !== db) return db - da // desc
        }
        return 0
    }

    const sortedVersions = Object.keys(groupedByVersion).sort(compareVersions)

    const latestVersion = sortedVersions[0]
    const latestItems = latestVersion ? (groupedByVersion[latestVersion] || []) : []

    const platformMetaByKey = Object.fromEntries(platforms.map(p => [p.key, { label: p.label, Icon: p.Icon }])) as Record<PlatformKey, { label: string; Icon: typeof Smartphone }>

    const selectedItem: DownloadItem | undefined = (() => {
        if (latestItems.length === 0) return undefined
        if (preferredPlatform) {
            const match = latestItems.find(i => i.type === preferredPlatform)
            if (match) return match
        }
        // Fallback: first available by the predefined order
        for (const { key } of platforms) {
            const match = latestItems.find(i => i.type === key)
            if (match) return match
        }
        return latestItems[0]
    })()

    const selectedPlatformLabel = selectedItem ? platformMetaByKey[(selectedItem.type as PlatformKey) || 'windows']?.label : undefined

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
                                onClick={() => handleDownload(
                                    selectedItem.file,
                                    `rizverse-${selectedItem.type}-${selectedItem.version}`
                                )}
                            >
                                {(() => {
                                    const meta = platformMetaByKey[(selectedItem.type as PlatformKey) || 'windows']
                                    const Icon = meta?.Icon || Monitor
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
                                                                    <Icon className="size-4" />
                                                                    <CardTitle className="text-base font-medium">{label}</CardTitle>
                                                                </div>
                                                            </CardHeader>

                                                            <CardContent className="p-0">
                                                                <div className="divide-y">
                                                                    {items.length > 0 ? (
                                                                        items.map((item) => (
                                                                            <button
                                                                                key={item.id}
                                                                                onClick={() => handleDownload(
                                                                                    item.file,
                                                                                    `rizverse-${item.type}-${item.version}`
                                                                                )}
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
