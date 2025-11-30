"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="container mx-auto px-6 py-32 text-center relative overflow-hidden">

            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none opacity-50" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative z-10 max-w-4xl mx-auto"
            >
                <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tighter leading-tight">
                    Start forging your <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                        speed today.
                    </span>
                </h2>
                <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
                    Join thousands of developers and students who are mastering the art of typing.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link
                        href="/test"
                        className="bg-white text-black font-bold px-10 py-4 rounded-full text-lg hover:bg-gray-200 transition-colors flex items-center gap-2"
                    >
                        Start Typing Test <ArrowRight className="w-5 h-5" />
                    </Link>
                    <Link
                        href="/signup"
                        className="text-white font-bold px-10 py-4 rounded-full text-lg border border-white/10 hover:bg-white/5 transition-colors"
                    >
                        Create Free Account
                    </Link>
                </div>
            </motion.div>
        </section>
    );
}
