"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const codeSnippet = `function typeFast() {
  const speed = "unlimited";
  const focus = "absolute";
  return speed + focus;
}`;

export function TypingSimulation() {
    const [text, setText] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: containerRef.current,
                start: "top 60%",
                onEnter: () => {
                    let i = 0;
                    const interval = setInterval(() => {
                        setText(codeSnippet.slice(0, i + 1));
                        i++;
                        if (i === codeSnippet.length) clearInterval(interval);
                    }, 50);
                },
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="container mx-auto px-6 py-20">
            <div className="max-w-3xl mx-auto bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-white/10">
                <div className="flex items-center gap-2 px-4 py-3 bg-[#2d2d2d] border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="p-8 font-mono text-lg md:text-xl leading-relaxed min-h-[200px]">
                    <span className="text-blue-400">
                        {text}
                    </span>
                    <motion.span
                        animate={{ opacity: [1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        className="inline-block w-2.5 h-6 bg-primary ml-1 align-middle"
                    />
                </div>
            </div>
        </section>
    );
}
