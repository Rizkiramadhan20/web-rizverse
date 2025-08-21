export type NavItem = {
    href: string;
    label: string;
    isActive: boolean;
    onClick: () => void;
};

type BuildNavItemsParams = {
    currentLocale: "id" | "en";
    isActiveLink: (href: string, isHashLink?: boolean) => boolean;
    handleHomeNavigation: () => void;
    handleSectionNavigation: (sectionId: string) => void;
    handleDownloadNavigation: () => void;
};

export const buildNavItems = ({
    currentLocale,
    isActiveLink,
    handleHomeNavigation,
    handleSectionNavigation,
    handleDownloadNavigation,
}: BuildNavItemsParams): NavItem[] => [
        {
            href: `/${currentLocale}`,
            label: currentLocale === "en" ? "Home" : "Beranda",
            isActive: isActiveLink(`/${currentLocale}`),
            onClick: handleHomeNavigation,
        },
        {
            href: `/${currentLocale}#featured`,
            label: currentLocale === "en" ? "Featured" : "Fitur",
            isActive: isActiveLink(`/${currentLocale}#featured`, true),
            onClick: () => handleSectionNavigation("featured"),
        },
        {
            href: `/${currentLocale}#services`,
            label: currentLocale === "en" ? "Services" : "Layanan",
            isActive: isActiveLink(`/${currentLocale}#services`, true),
            onClick: () => handleSectionNavigation("services"),
        },
        {
            href: `/${currentLocale}#pricing`,
            label: currentLocale === "en" ? "Pricing" : "Harga",
            isActive: isActiveLink(`/${currentLocale}#pricing`, true),
            onClick: () => handleSectionNavigation("pricing"),
        },
        {
            href: `/${currentLocale}/download`,
            label: currentLocale === "en" ? "Download" : "Unduh",
            isActive: isActiveLink(`/${currentLocale}/download`),
            onClick: handleDownloadNavigation,
        },
    ];

