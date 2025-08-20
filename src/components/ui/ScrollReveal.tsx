"use client";

import { useScrollPosition } from '@/lib/useLenis';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
    children: ReactNode;
    className?: string;
    threshold?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
    distance?: number;
    delay?: number;
}

export function ScrollReveal({
    children,
    className = "",
    threshold = 0.1,
    direction = 'up',
    distance = 50,
    delay = 0
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef<HTMLDivElement>(null);
    const scrollY = useScrollPosition();

    useEffect(() => {
        if (!elementRef.current || hasAnimated) return;

        const element = elementRef.current;
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const elementBottom = rect.bottom + scrollY;
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        const isInViewport = (
            elementTop < scrollY + windowHeight * (1 - threshold) &&
            elementBottom > scrollY + windowHeight * threshold
        );

        if (isInViewport && !isVisible) {
            setIsVisible(true);
            setHasAnimated(true);
        }
    }, [scrollY, threshold, isVisible, hasAnimated]);

    const getTransform = () => {
        if (!isVisible) {
            switch (direction) {
                case 'up':
                    return `translateY(${distance}px)`;
                case 'down':
                    return `translateY(-${distance}px)`;
                case 'left':
                    return `translateX(${distance}px)`;
                case 'right':
                    return `translateX(-${distance}px)`;
                default:
                    return `translateY(${distance}px)`;
            }
        }
        return 'translateY(0) translateX(0)';
    };

    return (
        <div
            ref={elementRef}
            className={`transition-all duration-1000 ease-out ${className}`}
            style={{
                transform: getTransform(),
                opacity: isVisible ? 1 : 0,
                transitionDelay: `${delay}ms`
            }}
        >
            {children}
        </div>
    );
}
