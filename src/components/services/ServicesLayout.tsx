"use client"

import React from 'react'

import { useParams } from 'next/navigation';

import ServiceCard from "@/components/services/card/ServiceCard";

import TrueFocus from "@/components/ui/TrueFocus";

import { ScrollReveal } from '@/components/ui/ScrollReveal';

import { motion } from 'motion/react'
import {
    servicesContainerVariants,
    servicesHeaderContainer,
    fadeUp,
} from '@/base/layout/animation/animation'

export default function ServicesLayout({ serviceData }: { serviceData: ServiceItem[] }) {
    const params = useParams();

    const currentLocale = ((params?.locale as string) || 'id') as 'id' | 'en';



    return (
        <section id="services" className="relative pt-20 md:py-10 overflow-hidden bg-background">
            <div className="container mx-auto px-4 md:px-6 lg:px-10">
                <ScrollReveal direction="down" distance={100} delay={200}>
                    <motion.div
                        className='flex flex-col items-center text-center gap-4 mb-10 md:mb-28'
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={servicesHeaderContainer}
                    >
                        <motion.div variants={fadeUp}>
                            <TrueFocus
                                sentence={currentLocale === 'en' ? 'All-in-one platform' : 'Platform lengkap'}
                                manualMode={false}
                                blurAmount={5}
                                borderColor="red"
                                animationDuration={2}
                                pauseBetweenAnimations={1}
                            />
                        </motion.div>
                        <motion.p variants={fadeUp} className="text-base sm:text-lg text-muted-foreground max-w-2xl">{currentLocale === 'en' ? 'You take care of the video quality and we take care of everything else ' : 'Anda mengurus kualitas video dan kami mengurus hal lainnya'}</motion.p>
                    </motion.div>
                </ScrollReveal>

                <ScrollReveal direction="up" distance={100} delay={200}>
                    <motion.div
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.2 }}
                        variants={servicesContainerVariants}
                    >
                        {serviceData?.map((item, index) => (
                            <ServiceCard item={item} key={index} locale={currentLocale} />
                        ))}
                    </motion.div>
                </ScrollReveal>
            </div>
        </section>
    )
}
