"use client"

import { usePathname, useRouter, useParams } from 'next/navigation';
import { Button } from './button';
import { Globe } from 'lucide-react';

export function LanguageSwitcher() {
    const pathname = usePathname();
    const router = useRouter();
    const params = useParams();

    // Get locale from params (same as routing system)
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';
    const buttonText = currentLocale === 'en' ? 'ID' : 'EN';

    const switchLanguage = () => {
        const newLocale = currentLocale === 'en' ? 'id' : 'en';

        // Handle the case where we're on a route without locale prefix
        let newPath;
        if (pathname.startsWith('/en') || pathname.startsWith('/id')) {
            // Replace existing locale
            newPath = pathname.replace(/^\/(?:en|id)/, `/${newLocale}`);
        } else {
            // Add locale prefix
            newPath = `/${newLocale}${pathname}`;
        }

        router.push(newPath);
    };

    return (
        <Button
            onClick={switchLanguage}
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-sm font-medium"
        >
            <Globe className="w-4 h-4" />
            {buttonText}
        </Button>
    );
}
