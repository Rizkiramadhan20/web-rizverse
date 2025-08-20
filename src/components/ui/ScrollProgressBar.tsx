"use client";

import { useScrollProgress } from '@/lib/useLenis';

interface ScrollProgressBarProps {
    className?: string;
    color?: string;
    height?: number;
}

export function ScrollProgressBar({
    className = "",
    color = "#FF5555",
    height = 3
}: ScrollProgressBarProps) {
    const progress = useScrollProgress();

    return (
        <div
            className={`fixed top-0 left-0 w-full z-[60] ${className}`}
            style={{ height: `${height}px` }}
        >
            <div
                className="h-full transition-all duration-100 ease-out"
                style={{
                    width: `${progress * 100}%`,
                    backgroundColor: color,
                    transform: `scaleX(${progress})`,
                    transformOrigin: 'left'
                }}
            />
        </div>
    );
}
