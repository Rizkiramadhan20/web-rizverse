'use client';

import { useEffect, useRef } from 'react';

import Lenis from 'lenis';

interface LenisProviderProps {
    children: React.ReactNode;
}

export default function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
            touchMultiplier: 2,
            infinite: false,
        });

        // Expose Lenis instance to window for global access
        if (typeof window !== 'undefined') {
            // @ts-expect-error - Lenis adds itself to window
            window.lenis = lenisRef.current;
        }

        // RAF (Request Animation Frame) function
        function raf(time: number) {
            lenisRef.current?.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup function
        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
            }
        };
    }, []);

    return <>{children}</>;
} 