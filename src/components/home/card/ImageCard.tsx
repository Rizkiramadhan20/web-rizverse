import React from 'react'

import Image from 'next/image'

interface ImageCardProps {
    src: string
    alt: string
    priority?: boolean
    quality?: number
    className?: string
}

export default function ImageCard({ src, alt, priority = false, quality = 100, className }: ImageCardProps) {
    return (
        <div className={`relative w-full h-full ${className ?? ''}`}>
            <Image
                src={src}
                alt={alt}
                fill
                className="object-contain"
                priority={priority}
                quality={quality}
            />
        </div>
    )
}
