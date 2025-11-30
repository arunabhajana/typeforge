"use client";

import { motion, useInView, useSpring, useTransform, useMotionTemplate, useMotionValue } from "framer-motion";
import {
    BarChart2,
    Trophy,
    Users,
    Activity,
    TrendingUp,
    Code,
    Globe,
    Flame,
    Calendar
} from "lucide-react";
import { cn } from "@/utils/cn";
import { Meteors } from "@/components/ui/Meteors";
import { useEffect, useRef, useState, MouseEvent } from "react";

// --- Components for Animations ---

const Counter = ({ from, to }: { from: number; to: number }) => {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });
    const spring = useSpring(from, { mass: 0.8, stiffness: 75, damping: 15 });
    const display = useTransform(spring, (current) => Math.round(current));

    useEffect(() => {
        if (inView) {
            spring.set(to);
        }
    }, [inView, spring, to]);

    return <motion.span ref={ref}>{display}</motion.span>;
};

const Typewriter = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    const [started, setStarted] = useState(false);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const timeout = setTimeout(() => setStarted(true), delay * 1000);
            return () => clearTimeout(timeout);
        }
    }, [inView, delay]);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
            } else {
                clearInterval(interval);
            }
        }, 50); // Typing speed
        return () => clearInterval(interval);
    }, [started, text]);

    return <span ref={ref}>{displayedText}</span>;
};

const LeaderboardList = () => {
    const [users, setUsers] = useState([
        { id: 1, name: "Alex", wpm: 120, avatar: "bg-red-500" },
        { id: 2, name: "Sarah", wpm: 118, avatar: "bg-blue-500" },
        { id: 3, name: "You", wpm: 115, avatar: "bg-purple-500" }, // User starts 3rd
        { id: 4, name: "Mike", wpm: 110, avatar: "bg-green-500" },
    ]);

    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
        if (inView) {
            const timeout = setTimeout(() => {
                setUsers(prev => {
                    const newUsers = [...prev];
                    // Swap "You" (index 2) with "Sarah" (index 1) to simulate moving up
                    const temp = newUsers[1];
                    newUsers[1] = newUsers[2];
                    newUsers[2] = temp;
                    // Update WPM to reflect improvement
                    newUsers[1].wpm = 125;
                    return newUsers;
                });
            }, 2000);
            return () => clearTimeout(timeout);
        }
    }, [inView]);

    return (
        <div ref={ref} className="space-y-3 w-full">
            {users.map((user, index) => (
                <motion.div
                    key={user.id}
                    layout // This enables automatic layout animation
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={cn(
                        "flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5",
                        user.name === "You" ? "bg-primary/10 border-primary/20" : ""
                    )}
                >
                    <div className="flex items-center gap-3">
                        <div className="text-sm font-mono text-muted-foreground w-4">#{index + 1}</div>
                        <div className={`w-8 h-8 rounded-full ${user.avatar} flex items-center justify-center text-xs font-bold`}>
                            {user.name[0]}
                        </div>
                        <span className={cn("text-sm font-medium", user.name === "You" ? "text-primary" : "")}>
                            {user.name}
                        </span>
                    </div>
                    <div className="text-sm font-bold">{user.wpm} <span className="text-xs text-muted-foreground font-normal">WPM</span></div>
                </motion.div>
            ))}
        </div>
    );
};

const ContributionGraph = () => {
    // Generate a grid of contribution data (7 days x 12 weeks approx)
    const weeks = 12;
    const days = 7;
    const totalSquares = weeks * days;

    // Simulate some data
    const data = Array.from({ length: totalSquares }, (_, i) => {
        const random = Math.random();
        if (random > 0.8) return 3; // High
        if (random > 0.6) return 2; // Medium
        if (random > 0.4) return 1; // Low
        return 0; // None
    });

    return (
        <div className="flex gap-1">
            {Array.from({ length: weeks }).map((_, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-1">
                    {Array.from({ length: days }).map((_, dayIndex) => {
                        const index = weekIndex * days + dayIndex;
                        const level = data[index];
                        let colorClass = "bg-white/5";
                        if (level === 1) colorClass = "bg-primary/30";
                        if (level === 2) colorClass = "bg-primary/60";
                        if (level === 3) colorClass = "bg-primary";

                        return (
                            <motion.div
                                key={dayIndex}
                                initial={{ opacity: 0, scale: 0 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{
                                    delay: index * 0.01, // Stagger effect
                                    duration: 0.2
                                }}
                                viewport={{ once: true }}
                                className={`w-2.5 h-2.5 rounded-sm ${colorClass}`}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};

// --- Analytics Graph Component ---
const AnalyticsGraph = () => {
    const data = [
        { label: "Mon", value: 65 },
        { label: "Tue", value: 82 },
        { label: "Wed", value: 75 },
        { label: "Thu", value: 95 },
        { label: "Fri", value: 88 },
        { label: "Sat", value: 102 },
        { label: "Sun", value: 115 },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div className="w-full h-64 relative flex items-end pb-6 px-2">
            {/* Tooltip */}
            {hoveredIndex !== null && (
                <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="absolute top-0 left-0 bg-zinc-900/90 border border-white/10 text-xs p-2 rounded-lg backdrop-blur-md pointer-events-none z-20 shadow-xl"
                    style={{
                        left: `${(hoveredIndex / (data.length - 1)) * 100}%`,
                        transform: "translateX(-50%) translateY(-100%)",
                        marginTop: "-20px"
                    }}
                >
                    <div className="font-bold text-white mb-0.5">{data[hoveredIndex].label}</div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                        <span className="text-zinc-300 font-mono">{data[hoveredIndex].value} WPM</span>
                    </div>
                </motion.div>
            )}

            {/* Y Axis Labels (Absolute HTML) */}
            <div className="absolute left-0 top-0 bottom-6 flex flex-col justify-between text-[10px] text-muted-foreground font-mono py-2 h-[calc(100%-24px)]">
                <span>120</span>
                <span>60</span>
                <span>0</span>
            </div>

            {/* Graph Container */}
            <div className="relative w-full h-full ml-8">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex flex-col justify-between h-full">
                    <div className="w-full h-px bg-white/5 border-t border-dashed border-white/10" />
                    <div className="w-full h-px bg-white/5 border-t border-dashed border-white/10" />
                    <div className="w-full h-px bg-white/5 border-t border-dashed border-white/10" />
                </div>

                {/* SVG Graph */}
                <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
                    <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#6366f1" />
                        </linearGradient>
                        <linearGradient id="gradientArea" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="transparent" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Area */}
                    <motion.path
                        d={`M0,100 ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${100 - (d.value / 120) * 100}`).join(" ")} L100,100 Z`}
                        fill="url(#gradientArea)"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Line */}
                    <motion.path
                        d={`M0,${100 - (data[0].value / 120) * 100} ${data.map((d, i) => `L${(i / (data.length - 1)) * 100},${100 - (d.value / 120) * 100}`).join(" ")}`}
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Interactive Points */}
                    {data.map((d, i) => (
                        <g key={i}>
                            {/* Hit Area */}
                            <circle
                                cx={(i / (data.length - 1)) * 100}
                                cy={100 - (d.value / 120) * 100}
                                r="5"
                                fill="transparent"
                                className="cursor-pointer"
                                onMouseEnter={() => setHoveredIndex(i)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            />
                            {/* Visible Dot (only on hover) */}
                            <motion.circle
                                cx={(i / (data.length - 1)) * 100}
                                cy={100 - (d.value / 120) * 100}
                                r="1.5"
                                fill="white"
                                initial={{ scale: 0 }}
                                animate={{ scale: hoveredIndex === i ? 2 : 0 }}
                                transition={{ type: "spring" }}
                                className="pointer-events-none"
                            />
                        </g>
                    ))}
                </svg>

                {/* X Axis Labels */}
                <div className="absolute top-full left-0 w-full flex justify-between text-[10px] text-muted-foreground font-mono mt-2">
                    {data.map((d, i) => (
                        <span key={i}>{d.label}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- Spotlight Card Wrapper ---
function SpotlightCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className={cn(
                "group relative border border-white/10 bg-white/5 overflow-hidden rounded-3xl",
                className
            )}
            onMouseMove={handleMouseMove}
        >
            <motion.div
                className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-300 group-hover:opacity-100"
                style={{
                    background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(168, 85, 247, 0.15),
              transparent 80%
            )
          `,
                }}
            />
            <div className="relative h-full">{children}</div>
        </div>
    );
}

export function Features() {
    return (
        <section id="features" className="container mx-auto px-6 py-24 relative overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none [mask-image:linear-gradient(to_bottom,transparent,white_20%,white_80%,transparent)]">
                <Meteors number={20} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-16 text-center relative z-10"
            >
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
                    Everything you need to <span className="text-primary">excel</span>.
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    A complete suite of tools designed to take your typing from average to elite.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 relative z-10 max-w-7xl mx-auto">

                {/* Card 1: Smart Analytics (Large) - Line Graph */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="md:col-span-4 h-full"
                >
                    <SpotlightCard className="p-8 h-full backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/20 rounded-lg text-primary">
                                <BarChart2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">Smart Analytics</h3>
                        </div>

                        {/* Animated Line Graph */}
                        <AnalyticsGraph />
                    </SpotlightCard>
                </motion.div>

                {/* Card 2: Speed Stats (Small) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="md:col-span-2 h-full"
                >
                    <SpotlightCard className="p-8 flex flex-col justify-center items-center h-full backdrop-blur-md">
                        <div className="text-center flex flex-col items-center justify-center h-full w-full">
                            <h4 className="text-sm text-muted-foreground uppercase tracking-wider mb-2">Top Speed</h4>
                            <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                                <Counter from={0} to={142} />
                            </div>
                            <div className="text-sm font-medium text-primary mt-1">WPM</div>
                        </div>
                    </SpotlightCard>
                </motion.div>

                {/* Card 3: Code Editor (Medium) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="md:col-span-3 h-full"
                >
                    <SpotlightCard className="p-8 h-full backdrop-blur-md min-h-[250px]">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">
                                <Code className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">Code Mastery</h3>
                        </div>

                        {/* Mock Code Editor with Typewriter Effect */}
                        <div className="bg-black/40 rounded-lg p-4 font-mono text-xs text-muted-foreground border border-white/5 shadow-inner min-h-[120px]">
                            <div className="flex gap-1.5 mb-3">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-500/20" />
                            </div>
                            <div className="space-y-1">
                                <p>
                                    <span className="text-purple-400">const</span> <span className="text-yellow-200">forge</span> = <span className="text-blue-400">async</span> () <span className="text-purple-400">=&gt;</span> {"{"}
                                </p>
                                <p className="pl-4">
                                    <span className="text-purple-400">await</span> <span className="text-blue-300">practice</span>.<span className="text-yellow-200">start</span>();
                                </p>
                                <p className="pl-4">
                                    <span className="text-purple-400">return</span> <span className="text-green-400">"<Typewriter text="Mastery" delay={1.5} />"</span>;
                                </p>
                                <p>{"}"};</p>
                            </div>
                        </div>
                    </SpotlightCard>
                </motion.div>

                {/* Card 4: Global Leaderboard (Medium) */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="md:col-span-3 h-full"
                >
                    <SpotlightCard className="p-8 h-full backdrop-blur-md">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-green-500/20 rounded-lg text-green-400">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">Global Leaderboards</h3>
                        </div>

                        {/* Animated Leaderboard List */}
                        <LeaderboardList />
                    </SpotlightCard>
                </motion.div>

                {/* Card 5: Daily Streak (Large) - GitHub Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="md:col-span-6 h-full"
                >
                    <SpotlightCard className="p-8 h-full backdrop-blur-md">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-orange-500/20 rounded-lg text-orange-400">
                                    <Flame className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">Daily Streak</h3>
                                    <p className="text-sm text-muted-foreground">Keep the fire burning!</p>
                                </div>
                            </div>

                            {/* GitHub Contribution Graph */}
                            <div className="flex-1 flex justify-end overflow-x-auto">
                                <ContributionGraph />
                            </div>
                        </div>
                    </SpotlightCard>
                </motion.div>

            </div>
        </section>
    );
}
