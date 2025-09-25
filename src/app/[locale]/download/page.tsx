export const runtime = 'edge';

import React from 'react'

import DownloadLayout from '@/components/download/DownloadLayout'

export { metadata } from '@/components/download/meta/Metadata'

import { fetchDownloadData } from "@/utils/FetchDownload";

import { headers } from 'next/headers'

export default async function DownloadPage() {
    const downloadData = await fetchDownloadData();
    const ua = (await headers()).get('user-agent') || ''

    const detectPlatform = (userAgent: string): 'android' | 'ios' | 'macos' | 'windows' => {
        const uaLower = userAgent.toLowerCase()
        if (/android/.test(uaLower)) return 'android'
        if (/iphone|ipad|ipod/.test(uaLower)) return 'ios'
        // Exclude iOS before checking mac
        if (/macintosh|mac os x/.test(uaLower)) return 'macos'
        return 'windows'
    }

    const preferredPlatform = detectPlatform(ua)

    return (
        <DownloadLayout downloadData={downloadData} preferredPlatform={preferredPlatform} />
    );
}
