import type { Variants } from 'motion/react'

// Header animations
export const desktopNavContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.06, delayChildren: 0.12 },
    },
}

export const desktopNavItemVariants: Variants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.35, ease: 'easeOut' },
    },
}

export const rightControlsContainerVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.15 },
    },
}

export const rightControlsItemVariants: Variants = {
    hidden: { opacity: 0, x: 12 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.35, ease: 'easeOut' },
    },
}

// Services layout animations
export const servicesContainerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.12,
            delayChildren: 0.1,
        },
    },
}

export const servicesHeaderContainer: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
}

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
}

// Service card animations
export const serviceItemVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0 },
}


