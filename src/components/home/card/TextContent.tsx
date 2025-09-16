import React from 'react'

import { motion } from 'motion/react'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

import SplitText from '@/components/ui/SplitText'

import { ArrowRight, Play } from 'lucide-react'

export default function TextContent({ title, description, buttons }: TextContentProps) {
    return (
        <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            {/* Main Headline */}
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
            >
                <SplitText
                    as="h1"
                    text={title}
                    splitType="chars"
                    className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight capitalize"
                    from={{ opacity: 0, y: 40 }}
                    to={{ opacity: 1, y: 0 }}
                    delay={40}
                    duration={0.6}
                    textAlign="inherit"
                />
            </motion.div>

            {/* Description */}
            <motion.p
                className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.6, ease: 'easeOut', delay: 0.08 }}
            >
                {description}
            </motion.p>

            {/* Call-to-Action Buttons */}
            <motion.div
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-stretch sm:items-center"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.6 }}
                variants={{
                    hidden: {},
                    show: {
                        transition: { staggerChildren: 0.08 }
                    }
                }}
            >
                {buttons.map((item, idx) => {
                    if (idx === 0) {
                        return (
                            <motion.div
                                key={idx}
                                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <Button
                                    asChild
                                    className="bg-primary text-primary-foreground hover:bg-primary/90 py-5 sm:py-6 w-full sm:w-44 text-base md:text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    <Link href={item.href} className='capitalize'>
                                        {item.label}
                                        <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                        );
                    } else {
                        return (
                            <motion.div
                                key={idx}
                                variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                                transition={{ duration: 0.5, ease: 'easeOut' }}
                            >
                                <Link
                                    href={item.href}
                                    className="text-foreground hover:bg-transparent py-5 sm:py-6 w-full sm:w-fit text-base md:text-lg font-medium rounded-lg transition-all duration-300"
                                >
                                    <div className="flex items-center justify-center sm:justify-start capitalize">
                                        <div className="w-10 h-10 md:w-12 md:h-12 bg-primary rounded-full flex items-center justify-center mr-3 shrink-0">
                                            <Play className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground ml-1" />
                                        </div>
                                        {item.label}
                                    </div>
                                </Link>
                            </motion.div>
                        );
                    }
                })}
            </motion.div>
        </div>
    )
}
