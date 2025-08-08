"use client"

import React, { useState, useEffect } from 'react';

import Image from 'next/image';

import logo from '@/base/assets/logo.png';

import { LanguageSwitcher } from '@/components/ui/language-switcher';

import { useParams } from 'next/navigation';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const params = useParams();

    // Get locale from params (same as routing system)
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        {
            href: `/${currentLocale}`,
            label: currentLocale === 'en' ? 'Home' : 'Beranda',
            isActive: true
        },
        {
            href: `/${currentLocale}/featured`,
            label: currentLocale === 'en' ? 'Featured' : 'Unggulan'
        },
        {
            href: `/${currentLocale}/services`,
            label: currentLocale === 'en' ? 'Services' : 'Layanan'
        },
        {
            href: `/${currentLocale}/faqs`,
            label: currentLocale === 'en' ? 'FAQs' : 'FAQ'
        },
    ];

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 rounded-b-2xl ${isScrolled
            ? 'bg-white/80 backdrop-blur-md shadow-lg border-b border-gray-100/50'
            : 'bg-white/95 backdrop-blur-sm'
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo */}
                    <div className="relative">
                        <Image
                            src={logo}
                            alt="Rizverse logo"
                            width={isScrolled ? 50 : 60}
                            height={isScrolled ? 50 : 60}
                            className="transition-all duration-300 group-hover:scale-105"
                        />
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className={`relative font-medium transition-all duration-300 group ${item.isActive
                                    ? 'text-[#FF5555]'
                                    : 'text-gray-700 hover:text-[#FF5555]'
                                    }`}
                            >
                                {item.label}
                                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#FF5555] transition-all duration-300 group-hover:w-full ${item.isActive ? 'w-full' : ''
                                    }`}></span>
                            </a>
                        ))}
                    </nav>

                    {/* Language Switcher and Download Button */}
                    <div className="hidden md:flex items-center gap-4">
                        <LanguageSwitcher />
                        <a
                            href="#"
                            className="relative inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF5555] to-[#FF7777] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 group overflow-hidden"
                        >
                            <span className="relative z-10">
                                {currentLocale === 'en' ? 'Download' : 'Unduh'}
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF7777] to-[#FF5555] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                        aria-label="Toggle mobile menu"
                    >
                        <div className="w-6 h-6 flex flex-col justify-center items-center">
                            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-1'
                                }`}></span>
                            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                                }`}></span>
                            <span className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-1'
                                }`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                    <nav className="py-4 space-y-3 border-t border-gray-100">
                        {navItems.map((item, index) => (
                            <a
                                key={index}
                                href={item.href}
                                className={`block py-2 px-4 rounded-lg font-medium transition-all duration-200 ${item.isActive
                                    ? 'text-[#FF5555] bg-red-50'
                                    : 'text-gray-700 hover:text-[#FF5555] hover:bg-gray-50'
                                    }`}
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {item.label}
                            </a>
                        ))}
                        <div className="pt-4 space-y-3">
                            <div className="flex justify-center">
                                <LanguageSwitcher />
                            </div>
                            <a
                                href="#"
                                className="block w-full text-center py-3 bg-gradient-to-r from-[#FF5555] to-[#FF7777] text-white font-semibold rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
                                onClick={() => setIsMobileMenuOpen(false)}
                            >
                                {currentLocale === 'en' ? 'Download' : 'Unduh'}
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
