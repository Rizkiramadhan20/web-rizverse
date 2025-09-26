"use client"
import React from 'react'

import Orb from '@/components/ui/Orb';

import FuzzyText from '@/components/ui/FuzzyText'

import Link from 'next/link'

export default function NotFound() {
    return (
        <div className="relative min-h-screen flex flex-col items-center justify-center text-center w-full pt-12 overflow-hidden">
            {/* Background with GridDistortion */}
            <div className="absolute inset-0 z-0">
                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={0}
                    forceHoverState={false}
                />
            </div>

            {/* Content overlay */}
            <div className="relative z-10 px-4 pointer-events-none">
                {/* 404 Text with FuzzyText */}
                <div className="mb-8 flex items-center justify-center w-full max-w-5xl">
                    <div className="flex items-center justify-center w-full gap-2 flex-wrap">
                        <FuzzyText
                            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
                            fontSize="clamp(3rem, 15vw, 12rem)"
                            fontWeight={900}
                            color="#ffffff"
                            baseIntensity={0.15}
                            hoverIntensity={0.4}
                            enableHover={true}
                        >
                            4
                        </FuzzyText>
                        <FuzzyText
                            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
                            fontSize="clamp(3rem, 15vw, 12rem)"
                            fontWeight={900}
                            color="#8b5cf6"
                            baseIntensity={0.2}
                            hoverIntensity={0.5}
                            enableHover={true}
                        >
                            0
                        </FuzzyText>
                        <FuzzyText
                            className="w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6"
                            fontSize="clamp(3rem, 15vw, 12rem)"
                            fontWeight={900}
                            color="#ffffff"
                            baseIntensity={0.15}
                            hoverIntensity={0.4}
                            enableHover={true}
                        >
                            4
                        </FuzzyText>
                    </div>
                </div>

                {/* Error message */}
                <div className="mb-12 max-w-2xl">
                    <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                        Don&apos;t worry, you can always go back to the homepage.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md items-center justify-center mx-auto">
                    <Link
                        href="/"
                        className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl pointer-events-auto"
                    >
                        Go Home
                    </Link>
                    <button
                        onClick={() => window.history.back()}
                        className="w-full sm:w-auto px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm pointer-events-auto"
                    >
                        Go Back
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="hidden md:block absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse pointer-events-none"></div>
                <div className="hidden md:block absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl animate-pulse delay-1000 pointer-events-none"></div>
                <div className="hidden md:block absolute top-1/2 left-10 w-24 h-24 bg-gradient-to-r from-cyan-400/20 to-blue-600/20 rounded-full blur-2xl animate-pulse delay-500 pointer-events-none"></div>
            </div>
        </div>
    )
}
