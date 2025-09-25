export const runtime = 'edge';

import React from 'react'

export { metadata } from '@/components/rules/cokies-policy/meta/Metadata'

import CokiesPolicy from '@/components/rules/cokies-policy/CokiesPolicy'

export default function page() {
    return (
        <CokiesPolicy />
    )
}
