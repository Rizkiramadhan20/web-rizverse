"use client"

import React from 'react'

import { useParams } from 'next/navigation';

import ImageFeaturd from '@/components/featured/card/ImageFeaturd';

import TextFeatured from '@/components/featured/card/TextFeatured';

export default function FeaturedLayout({ featuredData }: { featuredData: FeaturedItem }) {
    const params = useParams();

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';

    return (
        <section className='relative py-10 bg-background overflow-hidden' id='featured'>
            <div className="container px-4 md:px-6 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
                    <ImageFeaturd featuredData={featuredData} currentLocale={currentLocale} />
                    <TextFeatured featuredData={featuredData} currentLocale={currentLocale} />
                </div>
            </div>
        </section>
    )
}
