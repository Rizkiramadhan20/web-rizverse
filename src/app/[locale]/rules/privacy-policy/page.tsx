import React, { Fragment } from 'react'

import { Metadata } from 'next'

import { headers } from 'next/headers'

import Script from 'next/script'

import PrivacyPolicy from '@/components/rules/privacy-policy/PrivacyPolicy'

export const metadata: Metadata = {
    title: 'Privacy Policy - Rizverse',
    description: 'Privacy Policy - Rizverse',
}

export default async function page() {
    const locale = (await headers()).get('accept-language')?.split(',')[0]?.split('-')[0] || 'id'
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": locale === "id" ? "Beranda" : "Home", "item": "https://rizverse.my.id" },
            { "@type": "ListItem", "position": 2, "name": locale === "id" ? "Kebijakan Privasi" : "Privacy Policy", "item": "https://rizverse.my.id/rules/privacy-policy" }
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
            <PrivacyPolicy />
        </Fragment>
    )
}
