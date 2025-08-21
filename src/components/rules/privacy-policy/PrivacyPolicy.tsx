"use client"

import React from 'react'

import { useParams } from 'next/navigation'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import { motion } from 'motion/react'

import { ScrollReveal } from '@/components/ui/ScrollReveal'

import { ParallaxElement } from '@/components/ui/ParallaxElement'

import start1 from "@/base/assets/star1.png"

import start2 from "@/base/assets/star2.png"

import Image from 'next/image'

// Localized content for privacy policy
const privacyPolicyContent = {
    id: {
        title: "Kebijakan Privasi",
        subtitle: "Bagaimana kami melindungi dan menggunakan data Anda di Rizverse",
        lastUpdated: "Terakhir diperbarui",
        lastUpdatedDate: "22 Agustus 2025",

        introduction: {
            title: "Pengenalan",
            content: "Kebijakan Privasi ini menjelaskan bagaimana Rizverse mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Kami berkomitmen untuk melindungi privasi Anda dan memastikan keamanan data Anda."
        },

        informationWeCollect: {
            title: "Informasi yang Kami Kumpulkan",
            content: "Kami mengumpulkan berbagai jenis informasi untuk memberikan layanan terbaik kepada Anda:"
        },

        howWeUseInformation: {
            title: "Bagaimana Kami Menggunakan Informasi",
            content: "Kami menggunakan informasi yang kami kumpulkan untuk berbagai tujuan, termasuk:"
        },

        informationSharing: {
            title: "Berbagi Informasi",
            content: "Kami tidak menjual, memperdagangkan, atau mentransfer informasi pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali dalam situasi tertentu:"
        },

        dataSecurity: {
            title: "Keamanan Data",
            content: "Kami menerapkan langkah-langkah keamanan yang ketat untuk melindungi informasi pribadi Anda dari akses yang tidak sah, perubahan, pengungkapan, atau penghancuran."
        },

        yourRights: {
            title: "Hak-Hak Anda",
            content: "Anda memiliki hak-hak tertentu terkait data pribadi Anda:"
        },

        cookiesAndTracking: {
            title: "Cookie dan Pelacakan",
            content: "Kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman pengguna dan menganalisis penggunaan website kami."
        },

        childrenPrivacy: {
            title: "Privasi Anak-Anak",
            content: "Layanan kami tidak ditujukan untuk anak-anak di bawah 13 tahun. Kami tidak secara sadar mengumpulkan informasi pribadi dari anak-anak di bawah 13."
        },

        internationalTransfers: {
            title: "Transfer Data Internasional",
            content: "Informasi Anda mungkin ditransfer ke dan diproses di negara-negara selain negara tempat Anda tinggal, termasuk negara-negara yang mungkin memiliki undang-undang perlindungan data yang berbeda."
        },

        updates: {
            title: "Perubahan Kebijakan",
            content: "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting kebijakan baru di halaman ini."
        },

        contact: {
            title: "Hubungi Kami",
            content: "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi kami atau ingin melaksanakan hak-hak Anda, silakan hubungi kami melalui:",
            email: "rizverse2025@gmail.com"
        }
    },
    en: {
        title: "Privacy Policy",
        subtitle: "How we protect and use your data at Rizverse",
        lastUpdated: "Last updated",
        lastUpdatedDate: "22 August 2025",

        introduction: {
            title: "Introduction",
            content: "This Privacy Policy explains how Rizverse collects, uses, and protects your personal information. We are committed to protecting your privacy and ensuring the security of your data."
        },

        informationWeCollect: {
            title: "Information We Collect",
            content: "We collect various types of information to provide you with the best service:"
        },

        howWeUseInformation: {
            title: "How We Use Information",
            content: "We use the information we collect for various purposes, including:"
        },

        informationSharing: {
            title: "Information Sharing",
            content: "We do not sell, trade, or transfer your personal information to third parties without your consent, except in certain situations:"
        },

        dataSecurity: {
            title: "Data Security",
            content: "We implement strict security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."
        },

        yourRights: {
            title: "Your Rights",
            content: "You have certain rights regarding your personal data:"
        },

        cookiesAndTracking: {
            title: "Cookies and Tracking",
            content: "We use cookies and similar tracking technologies to enhance user experience and analyze website usage."
        },

        childrenPrivacy: {
            title: "Children's Privacy",
            content: "Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13."
        },

        internationalTransfers: {
            title: "International Data Transfers",
            content: "Your information may be transferred to and processed in countries other than your country of residence, including countries that may have different data protection laws."
        },

        updates: {
            title: "Policy Updates",
            content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page."
        },

        contact: {
            title: "Contact Us",
            content: "If you have any questions about our Privacy Policy or want to exercise your rights, please contact us at:",
            email: "rizverse2025@gmail.com"
        }
    }
} as const;

export default function PrivacyPolicy() {
    const params = useParams();
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';
    const content = privacyPolicyContent[currentLocale];

    return (
        <section className='relative pt-28 py-10 bg-background overflow-hidden min-h-screen'>
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <ParallaxElement speed={0.3} className="absolute top-10 left-10 md:top-20 md:left-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{
                            opacity: [0.3, 0.8, 0.3],
                            y: [0, -10, 0],
                            rotate: [0, 5, 0]
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    >
                        <Image
                            src={start1}
                            alt="Star decoration"
                            loading='lazy'
                            className="w-6 h-6 md:w-8 md:h-8 dark:invert"
                        />
                    </motion.div>
                </ParallaxElement>

                <ParallaxElement speed={0.2} className="absolute bottom-10 right-10 md:bottom-20 md:right-20">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{
                            opacity: [0.2, 0.6, 0.2],
                            y: [0, 15, 0],
                            rotate: [0, -8, 0]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 1
                        }}
                    >
                        <Image
                            src={start2}
                            alt="Star decoration"
                            loading='lazy'
                            className="w-4 h-4 md:w-6 md:h-6 dark:invert"
                        />
                    </motion.div>
                </ParallaxElement>
            </div>

            <div className="container px-4 md:px-6 lg:px-10 max-w-4xl mx-auto">
                <ScrollReveal>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-4">
                            {content.title}
                        </h1>
                        <p className="text-xl text-muted-foreground mb-2">
                            {content.subtitle}
                        </p>
                        <p className="text-sm text-muted-foreground">
                            {content.lastUpdated}: {content.lastUpdatedDate}
                        </p>
                    </motion.div>
                </ScrollReveal>

                <div className="space-y-8">
                    {/* Introduction */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.introduction.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.introduction.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Information We Collect */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.informationWeCollect.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.informationWeCollect.content}
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="personal-info">
                                        <AccordionTrigger className="text-left font-medium">
                                            Informasi Pribadi
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Nama dan alamat email</li>
                                                <li>Informasi profil pengguna</li>
                                                <li>Data akun dan preferensi</li>
                                                <li>Informasi kontak</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="usage-data">
                                        <AccordionTrigger className="text-left font-medium">
                                            Data Penggunaan
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Log aktivitas dan penggunaan aplikasi</li>
                                                <li>Data analitik dan metrik performa</li>
                                                <li>Informasi perangkat dan browser</li>
                                                <li>Data lokasi (jika diizinkan)</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="technical-data">
                                        <AccordionTrigger className="text-left font-medium">
                                            Data Teknis
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-1">
                                                <li>Alamat IP dan informasi jaringan</li>
                                                <li>Data cookie dan teknologi pelacakan</li>
                                                <li>Informasi sistem operasi</li>
                                                <li>Data crash dan error logs</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* How We Use Information */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.howWeUseInformation.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.howWeUseInformation.content}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Menyediakan dan memelihara layanan Rizverse</li>
                                    <li>Memproses dan menyelesaikan transaksi</li>
                                    <li>Mengirim notifikasi dan komunikasi penting</li>
                                    <li>Meningkatkan dan mengoptimalkan layanan kami</li>
                                    <li>Menyediakan dukungan pelanggan</li>
                                    <li>Mendeteksi dan mencegah aktivitas penipuan</li>
                                    <li>Memenuhi kewajiban hukum dan regulasi</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Information Sharing */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.informationSharing.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.informationSharing.content}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Dengan penyedia layanan yang membantu kami mengoperasikan platform</li>
                                    <li>Untuk mematuhi hukum atau perintah pengadilan</li>
                                    <li>Untuk melindungi hak, properti, atau keamanan kami dan pengguna lain</li>
                                    <li>Dalam kasus merger, akuisisi, atau penjualan aset</li>
                                    <li>Dengan persetujuan eksplisit Anda</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Data Security */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.dataSecurity.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {content.dataSecurity.content}
                                </p>
                                <div className="bg-muted/30 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Langkah-langkah keamanan yang kami terapkan:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        <li>Enkripsi data end-to-end</li>
                                        <li>Autentikasi multi-faktor</li>
                                        <li>Pemantauan keamanan 24/7</li>
                                        <li>Backup data reguler</li>
                                        <li>Audit keamanan berkala</li>
                                    </ul>
                                </div>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Your Rights */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.yourRights.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.yourRights.content}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li><strong>Hak Akses:</strong> Meminta salinan data pribadi Anda</li>
                                    <li><strong>Hak Perbaikan:</strong> Meminta perbaikan data yang tidak akurat</li>
                                    <li><strong>Hak Penghapusan:</strong> Meminta penghapusan data pribadi Anda</li>
                                    <li><strong>Hak Pembatasan:</strong> Meminta pembatasan pemrosesan data</li>
                                    <li><strong>Hak Portabilitas:</strong> Menerima data Anda dalam format yang dapat dibaca</li>
                                    <li><strong>Hak Oposisi:</strong> Menentang pemrosesan data untuk tujuan tertentu</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Cookies and Tracking */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.cookiesAndTracking.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.cookiesAndTracking.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Children's Privacy */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.childrenPrivacy.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.childrenPrivacy.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* International Transfers */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.internationalTransfers.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.internationalTransfers.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Updates */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.updates.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.updates.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Contact */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.contact.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {content.contact.content}
                                </p>
                                <a
                                    href={`mailto:${content.contact.email}`}
                                    className="text-primary hover:text-primary/80 transition-colors font-medium"
                                >
                                    {content.contact.email}
                                </a>
                            </CardContent>
                        </Card>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    )
}
