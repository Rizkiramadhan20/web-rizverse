import React, { Fragment } from 'react'

import { Metadata } from 'next'

import { headers } from 'next/headers'

import Script from 'next/script'

import TermsOfUse from '@/components/rules/terms-of-use/TermsOfUse'

export const metadata: Metadata = {
    title: 'Terms Of Use - Rizverse',
    description: 'Terms Of Use - Rizverse',
}

export default async function page() {
    const locale = (await headers()).get('accept-language')?.split(',')[0]?.split('-')[0] || 'id'
    const breadcrumbJsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": locale === "id" ? "Beranda" : "Home", "item": "https://rizverse.my.id" },
            { "@type": "ListItem", "position": 2, "name": locale === "id" ? "Syarat dan Ketentuan" : "Terms of Use", "item": "https://rizverse.my.id/rules/terms-of-use" }
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
            <TermsOfUse />
        </Fragment>
    )
}
