"use client"

import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import logo from '@/base/assets/logo.png'

import { useParams } from 'next/navigation'

import { Instagram, Facebook, Send, Gamepad2, Music2 } from 'lucide-react'

export default function Footer() {
    const params = useParams();
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';
    const isEnglish = currentLocale === 'en';

    const navLinks = [
        { href: `/${currentLocale}`, label: isEnglish ? 'Home' : 'Beranda' },
        { href: `/${currentLocale}#featured`, label: isEnglish ? 'Featured' : 'Fitur' },
        { href: `/${currentLocale}#services`, label: isEnglish ? 'Services' : 'Layanan' },
        { href: `/${currentLocale}#pricing`, label: isEnglish ? 'Pricing' : 'Harga' },
        { href: `/${currentLocale}/download`, label: isEnglish ? 'Download' : 'Unduh' },
    ];

    return (
        <footer className="bg-background border-t border-border overflow-hidden">
            <div className="container px-4 md:px-10 py-12">
                <div className="grid gap-10 md:grid-cols-4 text-foreground">
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <Image src={logo} alt="Rizverse" width={60} height={60} className="object-contain dark:invert" />
                        </div>
                        <div className="space-y-2 text-sm text-muted-foreground">
                            <p className="flex items-center gap-2">Help@Rizverse.com</p>
                            <Link href={"https://wa.me/6285122161588?text=Hallo%20Saya%20Ingin%20Bertanya"} className="flex items-center gap-2">+(62) 851 2216 1588</Link>
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">Links</h4>
                        <ul className="space-y-2 text-sm">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="hover:text-foreground/80">{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">Legal</h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="#" className="hover:text-foreground/80">Terms Of Use</Link></li>
                            <li><Link href="#" className="hover:text-foreground/80">Privacy Policy</Link></li>
                            <li><Link href="#" className="hover:text-foreground/80">Cookie Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-4 font-semibold">{isEnglish ? 'Social' : 'Sosial'}</h4>
                        <ul className="flex flex-wrap gap-3 text-sm">
                            <li>
                                <Link href="https://t.me/yourhandle" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
                                    <Send className="w-4 h-4" /> Telegram
                                </Link>
                            </li>
                            <li>
                                <Link href="https://discord.gg/yourinvite" target="_blank" rel="noopener noreferrer" className="hover:text-foreground/80 flex items-center gap-2">
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
                    <p>Copyright 2025 Rizverse. All Rights Reserved</p>
                </div>
            </div>
        </footer>
    )
}
