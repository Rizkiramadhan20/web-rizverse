"use client"

import React from 'react'

import { useParams } from 'next/navigation'

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'

import { motion } from 'framer-motion'

export default function FaqsLayout({ faqsData }: { faqsData: FaqItem[] }) {
    const params = useParams()

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en'

    return (
        <section className='relative py-10 bg-background overflow-hidden'>
            <motion.div
                className="container mx-auto px-4 md:px-6 lg:px-10"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <motion.div
                    className='flx flex-col mb-10'
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
                >
                    <h1 className='text-base text-destructive mb-4 uppercase'>{currentLocale === 'en' ? 'FAQ' : 'Tanya Jawab Umum'}</h1>
                    <span className='text-2xl md:text-3xl font-bold capitalize'>{currentLocale === 'en' ? 'Frequently asked questions' : 'Pertanyaan yang sering diajukan'}</span>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
                >
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue={faqsData?.[0]?.id}
                        className="rounded-xl border bg-card/40 backdrop-blur divide-y"
                    >
                        {faqsData?.map((faq) => (
                            <AccordionItem key={faq.id} value={faq.id} className="px-4">
                                <AccordionTrigger className="py-5 text-base font-semibold hover:no-underline [&[data-state=open]]:text-primary">
                                    {faq.title[currentLocale]}
                                </AccordionTrigger>
                                <AccordionContent className="pb-6 text-muted-foreground leading-relaxed">
                                    {faq.description[currentLocale]}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>
            </motion.div>
        </section>
    )
}
