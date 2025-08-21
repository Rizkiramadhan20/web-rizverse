"use client"

import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import logo from '@/base/assets/logo.png'

import { useParams } from 'next/navigation'

import { Instagram, Facebook, Send, Gamepad2, Music2, Phone, Mail, Copyright } from 'lucide-react'

export default function Footer() {
    const params = useParams();

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';

    const isEnglish = currentLocale === 'en';

    const navLinks = [
        { href: `/${currentLocale}`, label: isEnglish ? 'Home' : 'Beranda' },
        { href: `/${currentLocale}//#featured`, label: isEnglish ? 'Featured' : 'Fitur' },
        { href: `/${currentLocale}//#services`, label: isEnglish ? 'Services' : 'Layanan' },
        { href: `/${currentLocale}//#pricing`, label: isEnglish ? 'Pricing' : 'Harga' },
        { href: `/${currentLocale}/download`, label: isEnglish ? 'Download' : 'Unduh' },
    ];

    return (
        <footer className="bg-background overflow-hidden px-4 md:px-10 py-10">
            <div className="container">
                <div className="grid gap-10 md:grid-cols-4 text-foreground">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image src={logo} alt="Rizverse" width={80} height={80} className="object-contain dark:invert" />
                        </div>
                        <div className="space-y-3 text-sm text-muted-foreground mt-5">
                            <Link href={"https://wa.me/6285122161588?text=Hallo%20Saya%20Ingin%20Bertanya"} className="flex items-center gap-2">
                                <Phone className="w-4 h-4" /> +(62) 851 2216 1588
                            </Link>

                            <Link href={"mailto:rizverse2025@gmail.com"} className="flex items-center gap-2">
                                <Mail className="w-4 h-4" /> rizverse2025@gmail.com
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">{currentLocale === 'en' ? 'Links' : 'Tautan'}</h3>
                        <ul className="space-y-3 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-foreground/80">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">{currentLocale === 'en' ? 'Legal' : 'Hukum'}</h3>
                        <ul className="space-y-3 text-sm">
                            <li><Link href={"/rules/terms-of-use"} className="hover:text-foreground/80">{currentLocale === 'en' ? 'Terms Of Use' : 'Ketentuan Penggunaan'}</Link></li>
                            <li><Link href={"/rules/privacy-policy"} className="hover:text-foreground/80">{currentLocale === 'en' ? 'Privacy Policy' : 'Kebijakan Privasi'}</Link></li>
                            <li><Link href={"/rules/cookies-policy"} className="hover:text-foreground/80">{currentLocale === 'en' ? 'Cookie Policy' : 'Kebijakan Cookie'}</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="mb-4 font-semibold">{currentLocale === 'en' ? 'Social' : 'Sosial'}</h3>
                        <ul className="flex flex-wrap gap-4 text-sm">
                            <li>
                                <Link href="https://t.me/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
                                    <Send className="w-4 h-4" /> Telegram
                                </Link>
                            </li>
                            <li>
                                <Link href="https://discord.gg/8K8K7PXE" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
                                    <Gamepad2 className="w-4 h-4" /> Discord
                                </Link>
                            </li>
                            <li>
                                <Link href="https://instagram.com/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
                                    <Instagram className="w-4 h-4" /> Instagram
                                </Link>
                            </li>
                            <li>
                                <Link href="https://tiktok.com/@yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
                                    <Music2 className="w-4 h-4" /> TikTok
                                </Link>
                            </li>
                            <li>
                                <Link href="https://facebook.com/yourpage" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
                                    <Facebook className="w-4 h-4" /> Facebook
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-10 border-t border-border pt-6 text-center text-xs text-muted-foreground">
                    <p className="flex gap-1 justify-center items-center">
                        <Copyright className="w-4 h-4" /> 2025 Rizverse. All Rights Reserved
                    </p>
                </div>
            </div>
        </footer>
    )
}
