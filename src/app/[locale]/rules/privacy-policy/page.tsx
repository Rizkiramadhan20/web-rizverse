export const runtime = 'edge';

import React from 'react'

import { Metadata } from 'next'

import PrivacyPolicy from '@/components/rules/privacy-policy/PrivacyPolicy'

export const metadata: Metadata = {
    title: 'Privacy Policy - Rizverse',
    description: 'Privacy Policy - Rizverse',
}

export default function page() {
    return (
        <PrivacyPolicy />
    )
}
