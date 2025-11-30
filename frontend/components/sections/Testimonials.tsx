"use client";

import { motion } from "framer-motion";

const testimonials = [
    {
        quote: "TypeForge helped me break my 100 WPM plateau in just two weeks.",
        author: "Alex Chen",
        role: "Software Engineer",
    },
    {
        quote: "The most beautiful and effective typing app I've ever used.",
        author: "Sarah Jones",
        role: "Writer",
    },
    {
        quote: "Finally, a typing tool that feels like a modern piece of software.",
        author: "Mike Ross",
        role: "Student",
    },
];

export function Testimonials() {
    return (
        <section className="container mx-auto px-6 py-20">
            <h2 className="text-3xl font-bold text-center mb-12">Trusted by Pros</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {testimonials.map((t, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="bg-muted/5 border border-white/5 rounded-xl p-6"
                    >
                        <p className="text-lg mb-4 text-muted-foreground">"{t.quote}"</p>
                        <div>
                            <div className="font-bold">{t.author}</div>
                            <div className="text-xs text-muted-foreground">{t.role}</div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
