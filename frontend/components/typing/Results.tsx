import { motion } from "framer-motion";
import { RotateCcw, Activity, AlignLeft, Hash, Timer, ChevronRight, Repeat, TriangleAlert, Image, LogIn } from "lucide-react";
import { CountUp } from "@/components/ui/CountUp";
import { Tooltip } from "@/components/ui/Tooltip";
import Link from "next/link";

interface ResultsProps {
    wpm: number;
    rawWpm: number;
    accuracy: number;
    consistency: number;
    charStats: {
        correct: number;
        incorrect: number;
        extra: number;
        missed: number;
    };
    time: number;
    onRestart: () => void;
}

export function Results({ wpm, rawWpm, accuracy, consistency, charStats, time, onRestart }: ResultsProps) {
    const formatTime = (seconds: number) => {
        const rounded = Math.round(seconds);
        if (rounded < 60) return `${rounded}s`;
        const m = Math.floor(rounded / 60);
        const s = rounded % 60;
        return `${m}m ${s}s`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col w-full max-w-5xl mx-auto"
        >
            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex flex-col justify-center p-8">
                    <div className="text-3xl text-muted-foreground font-medium mb-1">wpm</div>
                    <CountUp value={wpm} className="text-9xl font-bold text-primary leading-none" />
                </div>
                <div className="flex flex-col justify-center p-8">
                    <div className="text-3xl text-muted-foreground font-medium mb-1">acc</div>
                    <CountUp value={accuracy} suffix="%" className="text-9xl font-bold text-primary leading-none" />
                </div>
            </div>

            {/* Secondary Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                {/* Raw */}
                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Activity className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">raw</span>
                    </div>
                    <CountUp value={rawWpm} className="text-4xl font-bold text-foreground" />
                </div>

                {/* Characters */}
                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm relative z-10">
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <AlignLeft className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">characters</span>
                    </div>
                    <Tooltip content="Correct / Incorrect / Extra / Missed">
                        <div className="text-3xl font-bold text-foreground flex items-center gap-1 cursor-help">
                            <span className="text-foreground">{charStats.correct}</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-secondary">{charStats.incorrect}</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-muted-foreground/60">{charStats.extra}</span>
                            <span className="text-muted-foreground">/</span>
                            <span className="text-muted-foreground/60">{charStats.missed}</span>
                        </div>
                    </Tooltip>
                </div>

                {/* Consistency */}
                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Hash className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">consistency</span>
                    </div>
                    <CountUp value={consistency} suffix="%" className="text-4xl font-bold text-foreground" />
                </div>

                {/* Time */}
                <div className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
                    <div className="flex items-center gap-2 mb-2 text-muted-foreground">
                        <Timer className="w-4 h-4" />
                        <span className="text-sm font-medium uppercase tracking-wider">time</span>
                    </div>
                    <div className="text-4xl font-bold text-foreground">{formatTime(time)}</div>
                </div>
            </div>

            {/* Actions Bar */}
            <div className="flex items-center justify-center gap-8 mb-12">
                <Tooltip content="Next Test">
                    <button onClick={onRestart} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </Tooltip>

                <Tooltip content="Repeat Test">
                    <button onClick={onRestart} className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <RotateCcw className="w-6 h-6" />
                    </button>
                </Tooltip>

                <Tooltip content="Practice Words">
                    <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-red-500/80 transition-colors">
                        <TriangleAlert className="w-6 h-6" />
                    </button>
                </Tooltip>

                <Tooltip content="Toggle Words History">
                    <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <Repeat className="w-6 h-6" />
                    </button>
                </Tooltip>

                <Tooltip content="Screenshot">
                    <button className="p-4 rounded-xl bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors">
                        <Image className="w-6 h-6" />
                    </button>
                </Tooltip>
            </div>

            <div className="flex flex-col items-center gap-4">
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="bg-white/10 px-2 py-0.5 rounded text-xs">TAB</span>
                    <span>to restart</span>
                </div>

                <div className="mt-8 flex items-center gap-2 text-muted-foreground/60 text-sm hover:text-foreground transition-colors cursor-pointer">
                    <LogIn className="w-4 h-4" />
                    <span>Sign in to save your results</span>
                </div>
            </div>
        </motion.div>
    );
}
