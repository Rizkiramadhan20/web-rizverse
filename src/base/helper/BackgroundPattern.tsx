export const BackgroundPattern = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Geometric Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.008] dark:opacity-[0.012]">
            <div className="absolute inset-0" style={{
                backgroundImage: `
                    linear-gradient(90deg, transparent 98%, currentColor 100%),
                    linear-gradient(0deg, transparent 98%, currentColor 100%)
                `,
                backgroundSize: '60px 60px'
            }} />
        </div>

        {/* Floating Geometric Shapes - Using theme colors */}
        <div className="absolute top-20 left-10 w-24 h-24 rounded-full bg-gradient-to-br from-primary/8 to-ring/6 blur-2xl animate-pulse" />
        <div className="absolute top-40 right-20 w-20 h-20 rounded-full bg-gradient-to-br from-chart-2/8 to-chart-3/6 blur-2xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-40 left-20 w-16 h-16 rounded-full bg-gradient-to-br from-chart-4/8 to-chart-5/6 blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-20 right-10 w-20 h-20 rounded-full bg-gradient-to-br from-accent/8 to-secondary/6 blur-2xl animate-pulse" style={{ animationDelay: '0.5s' }} />

        {/* Hexagon Pattern - Using theme colors */}
        <div className="absolute top-1/4 left-1/4 w-12 h-12 opacity-8">
            <div className="w-full h-full bg-gradient-to-br from-primary/6 to-ring/4 transform rotate-45 rounded-lg" />
        </div>
        <div className="absolute top-3/4 right-1/4 w-10 h-10 opacity-8">
            <div className="w-full h-full bg-gradient-to-br from-chart-2/6 to-chart-3/4 transform -rotate-45 rounded-lg" />
        </div>

        {/* Diagonal Lines */}
        <div className="absolute inset-0 opacity-[0.006] dark:opacity-[0.01]">
            <div className="absolute inset-0 transform -skew-y-12" style={{
                backgroundImage: `
                    repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 3px,
                        currentColor 3px,
                        currentColor 6px
                    )
                `,
                backgroundSize: '12px 12px'
            }} />
        </div>

        {/* Radial Gradient Overlay - Using theme colors */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-primary/2 dark:to-primary/3" />

        {/* Subtle border accent */}
        <div className="absolute inset-0 opacity-[0.004] dark:opacity-[0.008]">
            <div className="absolute inset-0 border border-border/20 rounded-3xl" />
        </div>
    </div>
)

export const localizedTexts = {
    id: {
        downloadTitle: "Unduh Rizverse",
        allVersions: "Semua Versi",
        latestVersion: "Versi terbaru",
        notAvailable: "Tidak tersedia",
        downloadFor: "Unduh untuk",
        version: "Versi",
        for: "untuk"
    },
    en: {
        downloadTitle: "Download Rizverse",
        allVersions: "All Versions",
        latestVersion: "Latest version",
        notAvailable: "Not available",
        downloadFor: "Download for",
        version: "Version",
        for: "for"
    }
} as const;