"use client"

import React from 'react'

import { useParams } from 'next/navigation';

import TextLayout from '@/components/banner/card/TextLayout';

import ImageLayout from '@/components/banner/card/ImageLayout';

import Decoration from "@/components/banner/card/Decoration"

export default function BannerLayout({ bannerData }: { bannerData: BannerItem }) {
    const params = useParams();

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';

    return (
        <section className="relative overflow-hidden py-10 px-4 md:px-6 lg:px-10">
            <div className="max-w-7xl bg-foreground pt-10 md:pt-0 text-background mx-auto relative rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2 gap-10 items-center z-50">
                    <TextLayout bannerData={bannerData} currentLocale={currentLocale} />

                    <ImageLayout bannerData={bannerData} currentLocale={currentLocale} />
                </div>

                <Decoration />
            </div>
        </section>
    )
}
