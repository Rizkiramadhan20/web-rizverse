import React, { Fragment } from 'react'

import DownloadLayout from '@/components/download/DownloadLayout'

export { metadata } from '@/components/download/meta/Metadata'

import { fetchDownloadData } from "@/utils/FetchDownload";

import { headers } from 'next/headers'

import Script from 'next/script'

export default async function DownloadPage() {
    const downloadData = await fetchDownloadData();
    const ua = (await headers()).get('user-agent') || ''
    const locale = (await headers()).get('accept-language')?.split(',')[0]?.split('-')[0] || 'id'
    const detectPlatform = (userAgent: string): 'android' | 'ios' | 'macos' | 'windows' => {
        const uaLower = userAgent.toLowerCase()
        if (/android/.test(uaLower)) return 'android'
        if (/iphone|ipad|ipod/.test(uaLower)) return 'ios'
        if (/macintosh|mac os x/.test(uaLower)) return 'macos'
        return 'windows'
    }

    const preferredPlatform = detectPlatform(ua)

    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": locale === "id" ? "Beranda" : "Home", "item": "https://rizverse.my.id" },
            { "@type": "ListItem", "position": 2, "name": locale === "id" ? "Unduh" : "Download", "item": "https://rizverse.my.id/download" }
        ]
    }

    return (
        <Fragment>
            <Script
                id="breadcrumb-schema"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />
            <DownloadLayout downloadData={downloadData} preferredPlatform={preferredPlatform} />
        </Fragment>
    );
}
