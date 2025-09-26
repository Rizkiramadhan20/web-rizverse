import React, { Fragment } from 'react'

import { headers } from 'next/headers'

import Script from 'next/script'

export { metadata } from '@/components/rules/cokies-policy/meta/Metadata'

import CokiesPolicy from '@/components/rules/cokies-policy/CokiesPolicy'

export default async function page() {
    const locale = (await headers()).get('accept-language')?.split(',')[0]?.split('-')[0] || 'id'
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": locale === "id" ? "Beranda" : "Home", "item": "https://rizverse.my.id" },
            { "@type": "ListItem", "position": 2, "name": locale === "id" ? "Kebijakan Cookie" : "Cookies Policy", "item": "https://rizverse.my.id/rules/cookies-policy" }
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
            <CokiesPolicy />
        </Fragment>
    )
}
