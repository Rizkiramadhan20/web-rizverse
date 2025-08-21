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

// Localized content for terms of use
const termsOfUseContent = {
    id: {
        title: "Syarat dan Ketentuan",
        subtitle: "Ketentuan penggunaan layanan Rizverse",
        lastUpdated: "Terakhir diperbarui",
        lastUpdatedDate: "15 Desember 2024",

        introduction: {
            title: "Pengenalan",
            content: "Syarat dan Ketentuan ini mengatur penggunaan layanan Rizverse. Dengan menggunakan layanan kami, Anda menyetujui untuk terikat dengan ketentuan ini. Jika Anda tidak setuju dengan ketentuan ini, harap jangan menggunakan layanan kami."
        },

        acceptance: {
            title: "Penerimaan Ketentuan",
            content: "Dengan mengakses atau menggunakan layanan Rizverse, Anda mengakui bahwa Anda telah membaca, memahami, dan menyetujui untuk terikat dengan Syarat dan Ketentuan ini."
        },

        serviceDescription: {
            title: "Deskripsi Layanan",
            content: "Rizverse adalah platform software yang menyediakan berbagai layanan digital. Kami berhak untuk mengubah, menangguhkan, atau menghentikan layanan kami kapan saja tanpa pemberitahuan sebelumnya."
        },

        userAccounts: {
            title: "Akun Pengguna",
            content: "Untuk menggunakan layanan tertentu, Anda mungkin perlu membuat akun. Anda bertanggung jawab untuk:"
        },

        acceptableUse: {
            title: "Penggunaan yang Diperbolehkan",
            content: "Anda setuju untuk menggunakan layanan Rizverse hanya untuk tujuan yang sah dan sesuai dengan ketentuan ini. Anda tidak boleh:"
        },

        intellectualProperty: {
            title: "Hak Kekayaan Intelektual",
            content: "Semua konten, fitur, dan fungsionalitas yang tersedia di Rizverse, termasuk tetapi tidak terbatas pada teks, grafik, logo, ikon, gambar, klip audio, unduhan digital, dan kompilasi data, adalah milik Rizverse atau pemberi lisensi kami dan dilindungi oleh hukum hak cipta, merek dagang, dan kekayaan intelektual lainnya."
        },

        userContent: {
            title: "Konten Pengguna",
            content: "Anda mempertahankan kepemilikan atas konten yang Anda kirimkan ke layanan kami. Namun, dengan mengirimkan konten, Anda memberikan kami lisensi untuk menggunakan, menampilkan, dan mendistribusikan konten tersebut dalam kaitannya dengan layanan kami."
        },

        privacy: {
            title: "Privasi",
            content: "Penggunaan informasi pribadi Anda diatur oleh Kebijakan Privasi kami, yang merupakan bagian dari ketentuan ini."
        },

        disclaimers: {
            title: "Pernyataan Penolakan",
            content: "Layanan Rizverse disediakan 'sebagaimana adanya' tanpa jaminan apa pun. Kami tidak menjamin bahwa layanan akan tidak terputus, tepat waktu, aman, atau bebas dari kesalahan."
        },

        limitations: {
            title: "Pembatasan Tanggung Jawab",
            content: "Dalam batas maksimum yang diizinkan oleh hukum yang berlaku, Rizverse tidak akan bertanggung jawab atas kerugian tidak langsung, insidental, khusus, konsekuensial, atau punitif yang timbul dari penggunaan layanan kami."
        },

        termination: {
            title: "Pengakhiran",
            content: "Kami dapat mengakhiri atau menangguhkan akses Anda ke layanan kami kapan saja, dengan atau tanpa alasan, dengan atau tanpa pemberitahuan."
        },

        governingLaw: {
            title: "Hukum yang Berlaku",
            content: "Syarat dan Ketentuan ini diatur oleh hukum Indonesia. Setiap sengketa yang timbul dari ketentuan ini akan diselesaikan di pengadilan yang berwenang di Indonesia."
        },

        changes: {
            title: "Perubahan Ketentuan",
            content: "Kami berhak untuk mengubah Syarat dan Ketentuan ini kapan saja. Perubahan akan efektif segera setelah diposting di halaman ini."
        },

        contact: {
            title: "Hubungi Kami",
            content: "Jika Anda memiliki pertanyaan tentang Syarat dan Ketentuan ini, silakan hubungi kami melalui:",
            email: "rizverse2025@gmail.com"
        }
    },
    en: {
        title: "Terms of Use",
        subtitle: "Terms and conditions for using Rizverse services",
        lastUpdated: "Last updated",
        lastUpdatedDate: "December 15, 2024",

        introduction: {
            title: "Introduction",
            content: "These Terms of Use govern your use of Rizverse services. By using our services, you agree to be bound by these terms. If you do not agree to these terms, please do not use our services."
        },

        acceptance: {
            title: "Acceptance of Terms",
            content: "By accessing or using Rizverse services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Use."
        },

        serviceDescription: {
            title: "Service Description",
            content: "Rizverse is a software platform that provides various digital services. We reserve the right to modify, suspend, or discontinue our services at any time without prior notice."
        },

        userAccounts: {
            title: "User Accounts",
            content: "To use certain services, you may need to create an account. You are responsible for:"
        },

        acceptableUse: {
            title: "Acceptable Use",
            content: "You agree to use Rizverse services only for lawful purposes and in accordance with these terms. You may not:"
        },

        intellectualProperty: {
            title: "Intellectual Property Rights",
            content: "All content, features, and functionality available on Rizverse, including but not limited to text, graphics, logos, icons, images, audio clips, digital downloads, and data compilations, are owned by Rizverse or our licensors and are protected by copyright, trademark, and other intellectual property laws."
        },

        userContent: {
            title: "User Content",
            content: "You retain ownership of content you submit to our services. However, by submitting content, you grant us a license to use, display, and distribute such content in connection with our services."
        },

        privacy: {
            title: "Privacy",
            content: "The use of your personal information is governed by our Privacy Policy, which is incorporated into these terms."
        },

        disclaimers: {
            title: "Disclaimers",
            content: "Rizverse services are provided 'as is' without any warranties. We do not guarantee that the services will be uninterrupted, timely, secure, or error-free."
        },

        limitations: {
            title: "Limitation of Liability",
            content: "To the maximum extent permitted by applicable law, Rizverse shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our services."
        },

        termination: {
            title: "Termination",
            content: "We may terminate or suspend your access to our services at any time, with or without cause, with or without notice."
        },

        governingLaw: {
            title: "Governing Law",
            content: "These Terms of Use are governed by Indonesian law. Any disputes arising from these terms will be resolved in the competent courts of Indonesia."
        },

        changes: {
            title: "Changes to Terms",
            content: "We reserve the right to modify these Terms of Use at any time. Changes will be effective immediately upon posting on this page."
        },

        contact: {
            title: "Contact Us",
            content: "If you have any questions about these Terms of Use, please contact us at:",
            email: "rizverse2025@gmail.com"
        }
    }
} as const;

export default function TermsOfUse() {
    const params = useParams();
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';
    const content = termsOfUseContent[currentLocale];

    return (
        <section className='relative py-10 pt-28 bg-background overflow-hidden min-h-screen'>
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

                    {/* Acceptance */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.acceptance.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.acceptance.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Service Description */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.serviceDescription.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.serviceDescription.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* User Accounts */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.userAccounts.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.userAccounts.content}
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="account-responsibilities">
                                        <AccordionTrigger className="text-left font-medium">
                                            Tanggung Jawab Akun Pengguna
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Menjaga kerahasiaan informasi akun Anda</li>
                                                <li>Menggunakan akun hanya untuk tujuan pribadi</li>
                                                <li>Segera memberitahu kami jika ada penggunaan yang tidak sah</li>
                                                <li>Memastikan informasi yang Anda berikan akurat dan terkini</li>
                                                <li>Bertanggung jawab atas semua aktivitas yang terjadi di akun Anda</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Acceptable Use */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.acceptableUse.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.acceptableUse.content}
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="prohibited-activities">
                                        <AccordionTrigger className="text-left font-medium">
                                            Aktivitas yang Dilarang
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Menggunakan layanan untuk tujuan ilegal atau melanggar hukum</li>
                                                <li>Mengganggu atau merusak layanan atau server kami</li>
                                                <li>Mencoba mendapatkan akses tidak sah ke sistem kami</li>
                                                <li>Mengirim konten yang menyinggung, berbahaya, atau tidak pantas</li>
                                                <li>Melanggar hak kekayaan intelektual orang lain</li>
                                                <li>Menggunakan layanan untuk spam atau aktivitas komersial yang tidak sah</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Intellectual Property */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.intellectualProperty.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.intellectualProperty.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* User Content */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.userContent.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.userContent.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Privacy */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.privacy.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.privacy.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Disclaimers */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.disclaimers.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.disclaimers.content}
                                </p>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="service-warranties">
                                        <AccordionTrigger className="text-left font-medium">
                                            Jaminan Layanan
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Layanan disediakan &quot;sebagaimana adanya&quot; tanpa jaminan</li>
                                                <li>Tidak ada jaminan ketersediaan layanan 24/7</li>
                                                <li>Tidak ada jaminan keamanan data 100%</li>
                                                <li>Tidak ada jaminan kompatibilitas dengan semua perangkat</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="third-party-services">
                                        <AccordionTrigger className="text-left font-medium">
                                            Layanan Pihak Ketiga
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            <ul className="list-disc list-inside space-y-2">
                                                <li>Kami tidak bertanggung jawab atas layanan pihak ketiga</li>
                                                <li>Pengguna bertanggung jawab atas penggunaan layanan eksternal</li>
                                                <li>Kebijakan privasi pihak ketiga berlaku terpisah</li>
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Limitations */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.limitations.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.limitations.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Termination */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.termination.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.termination.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Governing Law */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.governingLaw.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.governingLaw.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Changes */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.changes.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.changes.content}
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
