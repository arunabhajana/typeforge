import { motion } from "framer-motion";

interface StatsProps {
    wpm: number;
    accuracy: number;
    timeLeft?: number;
    wordCount?: number;
    mode: "time" | "words" | "code";
}

export function Stats({ wpm, accuracy, timeLeft, wordCount, mode }: StatsProps) {
    return (
        <div className="flex items-center justify-end gap-8 font-mono">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-end"
            >
                <span className="text-3xl font-bold text-primary leading-none">
                    {mode === "time" ? timeLeft : wordCount}
                </span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">
                    {mode === "time" ? "sec" : mode === "words" ? "words" : "chars"}
                </span>
            </motion.div>

            <div className="w-px h-8 bg-white/10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-end"
            >
                <span className="text-3xl font-bold text-foreground leading-none">{wpm}</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">wpm</span>
            </motion.div>

            <div className="w-px h-8 bg-white/10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-end"
            >
                <span className="text-3xl font-bold text-foreground leading-none">{accuracy}%</span>
                <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-medium">acc</span>
            </motion.div>
        </div>
    );
}
