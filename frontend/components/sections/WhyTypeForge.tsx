"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { FlickeringGrid } from "@/components/ui/FlickeringGrid";

const benefits = [
    "Scientific approach to muscle memory",
    "Real-time error analysis and correction",
    "Customizable themes and soundscapes",
    "Detailed progress tracking over time",
];

export function WhyTypeForge() {
    return (
        <section className="relative container mx-auto px-6 py-24 border-t border-white/5 overflow-hidden">
            <div className="absolute inset-0 -z-10 h-full w-full bg-background">
                <FlickeringGrid
                    className="absolute inset-0 z-0 [mask-image:radial-gradient(450px_circle_at_center,white,transparent)]"
                    squareSize={4}
                    gridGap={6}
                    color="#6B7280"
                    maxOpacity={0.5}
                    flickerChance={0.1}
                    height={800}
                    width={800}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center relative z-10">

                {/* Left Side: Typography */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
                        Why choose <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                            TypeForge?
                        </span>
                    </h2>
                    <p className="text-xl text-muted-foreground leading-relaxed">
                        We don't just measure speed. We engineer flow. <br />
                        Experience the difference of a platform built for mastery, not just testing.
                    </p>
                </motion.div>

                {/* Right Side: Value Bullets */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <ul className="space-y-6">
                        {benefits.map((benefit, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 + index * 0.1 }}
                                className="flex items-start gap-4"
                            >
                                <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-primary" />
                                </div>
                                <span className="text-lg font-medium">{benefit}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>
            </div>
        </section>
    );
}
