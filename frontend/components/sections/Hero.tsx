"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { StarsBackground } from "@/components/ui/StarsBackground";
import { Magnetic } from "@/components/ui/Magnetic";

export function Hero() {
    const containerRef = useRef<HTMLDivElement>(null);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen flex flex-col items-center justify-center pt-20 overflow-hidden text-center"
        >
            <StarsBackground />

            {/* Radial Gradient for depth */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.15),transparent_50%)]" />

            {/* Bottom Fade Gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10 flex flex-col items-center max-w-5xl">

                {/* Pill Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-8"
                >
                    <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-muted-foreground hover:bg-white/10 transition-colors cursor-pointer">
                        <span>✨ Introducing TypeForge</span>
                        <ArrowRight className="w-3 h-3" />
                    </div>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-6xl md:text-8xl font-bold tracking-tighter mb-6 leading-[1.1] relative group cursor-default"
                >
                    <span className="inline-block transition-transform duration-300 group-hover:-translate-y-2">Type faster.</span> <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 inline-block transition-transform duration-300 group-hover:translate-y-2 group-hover:scale-105">
                        Think sharper.
                    </span>
                </motion.h1>

                {/* Subtext */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-xl text-muted-foreground mb-10 max-w-2xl"
                >
                    Forge your typing skills with our advanced analytics and adaptive
                    practice engine. Experience the flow.
                </motion.p>

                {/* Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Magnetic>
                        <Link
                            href="/test"
                            className="bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-gray-200 transition-colors flex items-center gap-2 cursor-hover"
                        >
                            Get Started for free <ArrowRight className="w-4 h-4" />
                        </Link>
                    </Magnetic>
                </motion.div>

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                    className="mt-20 w-full max-w-4xl border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm"
                >
                    <img
                        src="/hero-typing-interface.png"
                        alt="TypeForge Interface"
                        className="w-full h-auto"
                    />
                </motion.div>

            </div>
        </section>
    );
}
