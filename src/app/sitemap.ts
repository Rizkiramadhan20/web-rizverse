import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rizverse.my.id' // Update this with your actual domain
    const lastModified = new Date()

    return [
        // Home page
        {
            url: `${baseUrl}`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        {
            url: `${baseUrl}`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id`,
                    en: `${baseUrl}/en`,
                },
            },
        },
        // Download page
        {
            url: `${baseUrl}/download`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/download`,
                    en: `${baseUrl}/en/download`,
                },
            },
        },
        {
            url: `${baseUrl}/download`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/download`,
                    en: `${baseUrl}/en/download`,
                },
            },
        },
        // Cookies Policy
        {
            url: `${baseUrl}/rules/cookies-policy`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/rules/cookies-policy`,
                    en: `${baseUrl}/en/rules/cookies-policy`,
                },
            },
        },
        {
            url: `${baseUrl}/rules/cookies-policy`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/rules/cookies-policy`,
                    en: `${baseUrl}/en/rules/cookies-policy`,
                },
            },
        },
        // Privacy Policy
        {
            url: `${baseUrl}/rules/privacy-policy`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/rules/privacy-policy`,
                    en: `${baseUrl}/en/rules/privacy-policy`,
                },
            },
        },
        {
            url: `${baseUrl}/rules/privacy-policy`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/rules/privacy-policy`,
                    en: `${baseUrl}/en/rules/privacy-policy`,
                },
            },
        },
        // Terms of Use
        {
            url: `${baseUrl}/rules/terms-of-use`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/rules/terms-of-use`,
                    en: `${baseUrl}/en/rules/terms-of-use`,
                },
            },
        },
        {
            url: `${baseUrl}/rules/terms-of-use`,
            lastModified,
            alternates: {
                languages: {
                    id: `${baseUrl}/id/rules/terms-of-use`,
                    en: `${baseUrl}/en/rules/terms-of-use`,
                },
            },
        },
    ]
}