"use client";

import { useScrollPosition } from '@/lib/useLenis';
import { ReactNode } from 'react';

interface ParallaxElementProps {
    children: ReactNode;
    speed?: number;
    className?: string;
    offset?: number;
}

export function ParallaxElement({
    children,
    speed = 0.5,
    className = "",
    offset = 0
}: ParallaxElementProps) {
    const scrollY = useScrollPosition();

    const translateY = scrollY * speed + offset;

    return (
        <div
            className={`transform-gpu ${className}`}
            style={{
                transform: `translateY(${translateY}px)`,
                willChange: 'transform'
            }}
        >
            {children}
        </div>
    );
}
