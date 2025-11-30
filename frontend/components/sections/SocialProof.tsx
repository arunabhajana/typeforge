"use client";

import { motion } from "framer-motion";
import { Flame, Medal, Swords } from "lucide-react";
import { BorderBeam } from "@/components/ui/BorderBeam";
import { cn } from "@/utils/cn";

const items = [
    {
        title: "Maintain Streaks",
        description: "Build a daily habit and watch your consistency soar.",
        icon: Flame,
        // Using gradient classes for icons to match page theme
        iconClass: "text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600",
        bgClass: "bg-orange-500/10 border-orange-500/20",
    },
    {
        title: "Earn Badges",
        description: "Unlock achievements as you hit new speed milestones.",
        icon: Medal,
        iconClass: "text-transparent bg-clip-text bg-gradient-to-br from-yellow-400 to-amber-600",
        bgClass: "bg-yellow-500/10 border-yellow-500/20",
    },
    {
        title: "Compete Friends",
        description: "Challenge peers to typing duels and climb the leaderboard.",
        icon: Swords,
        iconClass: "text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-indigo-600",
        bgClass: "bg-purple-500/10 border-purple-500/20",
    },
];

export function SocialProof() {
    return (
        <section className="relative container mx-auto px-6 py-24 border-t border-white/5 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {items.map((item, index) => (
                    <motion.div
                        key={item.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="group relative bg-muted/5 border border-white/5 rounded-2xl p-8 hover:bg-muted/10 transition-colors overflow-hidden"
                    >
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${item.bgClass} group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className={`w-6 h-6 ${item.iconClass}`} style={{ color: 'inherit' }} />
                        </div>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">{item.description}</p>

                        {/* Border Beam */}
                        <BorderBeam size={150} duration={10} delay={0} colorFrom="#a855f7" colorTo="#6366f1" />
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
