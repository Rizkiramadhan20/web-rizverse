import React from 'react'

import Image from 'next/image';

import left from "@/base/assets/left.png"

import right from "@/base/assets/right.png"

import star_white_1 from "@/base/assets/star_white-1.png"

import star_white_2 from "@/base/assets/star_white-2.png"

export default function Decoration() {
    return (
        <div className="pointer-events-none absolute inset-0">
            <Image src={left} alt="decorative left" className="absolute right-0 top-0 w-[480px] opacity-10 dark:invert" />
            <Image src={right} alt="decorative right" className="absolute left-0 bottom-0 w-[520px] opacity-20 dark:invert" />
            <Image src={star_white_1} alt="star" className="absolute left-[10%] top-[20%] w-5 opacity-70 dark:invert" />
            <Image src={star_white_2} alt="star" className="absolute right-[39%] top-[12%] w-6 opacity-70 dark:invert" />
        </div>
    )
}
