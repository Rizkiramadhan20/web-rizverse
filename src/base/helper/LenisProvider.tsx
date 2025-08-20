'use client';

import { useEffect, useRef } from 'react';

import Lenis from 'lenis';

interface LenisProviderProps {
    children: React.ReactNode;
}

// Extend Window interface to include lenis property
declare global {
    interface Window {
        lenis?: Lenis | undefined;
    }
}

export default function LenisProvider({ children }: LenisProviderProps) {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis with optimized settings
        lenisRef.current = new Lenis({
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth easing function
            touchMultiplier: 2,
            infinite: false,
            smoothWheel: true,
            wheelMultiplier: 1,
            lerp: 0.1, // Linear interpolation for smoother animations
        });

        // Expose Lenis instance to window for global access
        if (typeof window !== 'undefined') {
            window.lenis = lenisRef.current;
        }

        // RAF (Request Animation Frame) function for smooth animations
        function raf(time: number) {
            if (lenisRef.current) {
                lenisRef.current.raf(time);
            }
            requestAnimationFrame(raf);
        }

        // Start the animation loop
        requestAnimationFrame(raf);

        // Cleanup function
        return () => {
            if (lenisRef.current) {
                lenisRef.current.destroy();
                if (typeof window !== 'undefined') {
                    window.lenis = undefined;
                }
            }
        };
    }, []);

    return <>{children}</>;
} 