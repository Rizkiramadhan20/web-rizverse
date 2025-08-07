import React from 'react'

import { Skeleton } from '@/components/ui/skeleton'

export default function LayoutSkeleton() {
    return (
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="relative p-0 bg-white/95 rounded-2xl border border-gray-100 transition-all duration-300 flex flex-col overflow-hidden">
                    <div className="flex flex-col h-full">
                        <div className="relative w-full aspect-[4/3] bg-gray-100 flex items-center justify-center overflow-hidden">
                            <Skeleton className="absolute top-2 left-2 w-20 h-6 rounded-full" />
                            <Skeleton className="w-full h-full" style={{ aspectRatio: '4/3' }} />
                        </div>
                        <div className="flex-1 flex flex-col gap-2 p-4">
                            <Skeleton className="h-6 w-32 mb-2" />
                            <div className="flex flex-wrap gap-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <Skeleton className="h-4 w-28 mt-2" />
                            <Skeleton className="h-4 w-24" />
                            <div className="flex flex-row gap-2 mt-3">
                                <Skeleton className="h-8 w-20 rounded-xl" />
                                <Skeleton className="h-8 w-20 rounded-xl" />
                                <Skeleton className="h-8 w-20 rounded-xl" />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}