import type { Metadata } from "next";

import { metadata as baseMetadata } from "@/base/Meta/Metadata";

interface LocaleLayoutProps {
    children: React.ReactNode;
    params: Promise<{
        locale: string;
    }>;
}

export async function generateMetadata({
    params,
}: LocaleLayoutProps): Promise<Metadata> {
    await params;
    const baseUrl = baseMetadata.metadataBase?.toString() || process.env.NEXT_PUBLIC_URL;

    const cleanMetadata: Metadata = {
        title: baseMetadata.title,
        description: baseMetadata.description,
        keywords: baseMetadata.keywords,
        authors: baseMetadata.authors,
        icons: baseMetadata.icons,
        manifest: baseMetadata.manifest,
        metadataBase: baseMetadata.metadataBase,
        other: baseMetadata.other,
        openGraph: {
            ...baseMetadata.openGraph,
            url: baseUrl,
        },
        twitter: baseMetadata.twitter,
        robots: baseMetadata.robots,
        alternates: {
            canonical: baseUrl,
            languages: {
                "id-ID": baseUrl,
                "en-US": baseUrl,
            },
        },
    };

    return cleanMetadata;
}

export default function LocaleLayout({
    children,
}: LocaleLayoutProps) {
    return <>{children}</>;
}
