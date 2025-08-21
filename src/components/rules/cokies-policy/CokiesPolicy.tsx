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

const cookiesPolicyContent = {
    id: {
        title: "Kebijakan Cookie",
        subtitle: "Bagaimana kami menggunakan cookie di Rizverse",
        lastUpdated: "Terakhir diperbarui",
        lastUpdatedDate: "15 Desember 2024",

        introduction: {
            title: "Pengenalan",
            content: "Kebijakan Cookie ini menjelaskan bagaimana Rizverse menggunakan cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna, menganalisis penggunaan website, dan memberikan konten yang dipersonalisasi."
        },

        whatAreCookies: {
            title: "Apa itu Cookie?",
            content: "Cookie adalah file teks kecil yang disimpan di perangkat Anda saat Anda mengunjungi website. Cookie membantu website mengingat informasi tentang kunjungan Anda, seperti preferensi bahasa, ukuran font, dan pengaturan tampilan lainnya."
        },

        howWeUseCookies: {
            title: "Bagaimana Kami Menggunakan Cookie",
            content: "Rizverse menggunakan cookie untuk berbagai tujuan, termasuk:"
        },

        typesOfCookies: {
            title: "Jenis Cookie yang Kami Gunakan",
            essential: {
                title: "Cookie Penting",
                description: "Cookie ini diperlukan untuk menjalankan website dan tidak dapat dinonaktifkan. Mereka biasanya hanya diset sebagai respons terhadap tindakan yang Anda lakukan seperti mengatur preferensi privasi, masuk, atau mengisi formulir."
            },
            analytics: {
                title: "Cookie Analitik",
                description: "Cookie ini memungkinkan kami menghitung kunjungan dan sumber lalu lintas sehingga kami dapat mengukur dan meningkatkan kinerja website kami. Mereka membantu kami mengetahui halaman mana yang paling dan paling sedikit populer."
            },
            functional: {
                title: "Cookie Fungsional",
                description: "Cookie ini memungkinkan website memberikan fungsionalitas dan personalisasi yang ditingkatkan. Mereka mungkin diset oleh kami atau oleh penyedia layanan pihak ketiga yang layanannya telah kami tambahkan ke halaman kami."
            },
            marketing: {
                title: "Cookie Pemasaran",
                description: "Cookie ini dapat diset melalui website kami oleh mitra iklan kami. Mereka dapat digunakan oleh perusahaan-perusahaan tersebut untuk membangun profil minat Anda dan menampilkan iklan yang relevan."
            }
        },

        thirdPartyCookies: {
            title: "Cookie Pihak Ketiga",
            content: "Beberapa cookie mungkin ditempatkan oleh layanan pihak ketiga yang muncul di halaman kami, seperti Google Analytics, Facebook Pixel, dan layanan analitik lainnya."
        },

        managingCookies: {
            title: "Mengelola Cookie",
            content: "Anda dapat mengontrol dan/atau menghapus cookie sesuai keinginan. Anda dapat menghapus semua cookie yang sudah ada di komputer Anda dan dapat mengatur sebagian besar browser untuk mencegah cookie ditempatkan."
        },

        updates: {
            title: "Perubahan Kebijakan",
            content: "Kami dapat memperbarui Kebijakan Cookie ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Cookie baru di halaman ini."
        },

        contact: {
            title: "Hubungi Kami",
            content: "Jika Anda memiliki pertanyaan tentang Kebijakan Cookie kami, silakan hubungi kami melalui:",
            email: "rizverse2025@gmail.com"
        }
    },
    en: {
        title: "Cookie Policy",
        subtitle: "How we use cookies at Rizverse",
        lastUpdated: "Last updated",
        lastUpdatedDate: "December 15, 2024",

        introduction: {
            title: "Introduction",
            content: "This Cookie Policy explains how Rizverse uses cookies and similar technologies to enhance user experience, analyze website usage, and provide personalized content."
        },

        whatAreCookies: {
            title: "What Are Cookies?",
            content: "Cookies are small text files that are stored on your device when you visit a website. Cookies help websites remember information about your visit, such as language preferences, font size, and other display settings."
        },

        howWeUseCookies: {
            title: "How We Use Cookies",
            content: "Rizverse uses cookies for various purposes, including:"
        },

        typesOfCookies: {
            title: "Types of Cookies We Use",
            essential: {
                title: "Essential Cookies",
                description: "These cookies are necessary for the website to function and cannot be disabled. They are usually only set in response to actions you take such as setting privacy preferences, logging in, or filling in forms."
            },
            analytics: {
                title: "Analytics Cookies",
                description: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our website. They help us know which pages are the most and least popular."
            },
            functional: {
                title: "Functional Cookies",
                description: "These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages."
            },
            marketing: {
                title: "Marketing Cookies",
                description: "These cookies may be set through our website by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant advertisements."
            }
        },

        thirdPartyCookies: {
            title: "Third-Party Cookies",
            content: "Some cookies may be placed by third-party services that appear on our pages, such as Google Analytics, Facebook Pixel, and other analytics services."
        },

        managingCookies: {
            title: "Managing Cookies",
            content: "You can control and/or delete cookies as you wish. You can delete all cookies that are already on your computer and you can set most browsers to prevent them from being placed."
        },

        updates: {
            title: "Policy Updates",
            content: "We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new Cookie Policy on this page."
        },

        contact: {
            title: "Contact Us",
            content: "If you have any questions about our Cookie Policy, please contact us at:",
            email: "rizverse2025@gmail.com"
        }
    }
} as const;

export default function CokiesPolicy() {
    const params = useParams();
    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';
    const content = cookiesPolicyContent[currentLocale];

    return (
        <section className='relative pt-28 py-10 bg-background overflow-hidden'>
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

                    {/* What Are Cookies */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.whatAreCookies.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.whatAreCookies.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* How We Use Cookies */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.howWeUseCookies.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground mb-4">
                                    {content.howWeUseCookies.content}
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                                    <li>Meningkatkan pengalaman pengguna dan fungsionalitas website</li>
                                    <li>Menganalisis penggunaan website untuk optimasi</li>
                                    <li>Menyimpan preferensi dan pengaturan pengguna</li>
                                    <li>Memberikan konten yang dipersonalisasi</li>
                                    <li>Mengamankan website dan mencegah penipuan</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Types of Cookies */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.typesOfCookies.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="essential">
                                        <AccordionTrigger className="text-left font-medium">
                                            {content.typesOfCookies.essential.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {content.typesOfCookies.essential.description}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="analytics">
                                        <AccordionTrigger className="text-left font-medium">
                                            {content.typesOfCookies.analytics.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {content.typesOfCookies.analytics.description}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="functional">
                                        <AccordionTrigger className="text-left font-medium">
                                            {content.typesOfCookies.functional.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {content.typesOfCookies.functional.description}
                                        </AccordionContent>
                                    </AccordionItem>

                                    <AccordionItem value="marketing">
                                        <AccordionTrigger className="text-left font-medium">
                                            {content.typesOfCookies.marketing.title}
                                        </AccordionTrigger>
                                        <AccordionContent className="text-muted-foreground">
                                            {content.typesOfCookies.marketing.description}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Third Party Cookies */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.thirdPartyCookies.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed">
                                    {content.thirdPartyCookies.content}
                                </p>
                            </CardContent>
                        </Card>
                    </ScrollReveal>

                    {/* Managing Cookies */}
                    <ScrollReveal>
                        <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-2xl font-semibold text-primary">
                                    {content.managingCookies.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground leading-relaxed mb-4">
                                    {content.managingCookies.content}
                                </p>
                                <div className="bg-muted/30 p-4 rounded-lg">
                                    <h4 className="font-medium mb-2">Cara mengelola cookie di browser Anda:</h4>
                                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                                        <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                                        <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                                        <li><strong>Safari:</strong> Preferences → Privacy → Manage Website Data</li>
                                        <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and site data</li>
                                    </ul>
                                </div>
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
