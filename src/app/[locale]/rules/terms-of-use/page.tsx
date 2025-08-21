import React from 'react'

import { Metadata } from 'next'

import TermsOfUse from '@/components/rules/terms-of-use/TermsOfUse'

export const metadata: Metadata = {
    title: 'Terms Of Use - Rizverse',
    description: 'Terms Of Use - Rizverse',
}

export default function page() {
    return (
        <TermsOfUse />
    )
}
