import { motion } from "framer-motion";

interface StatsProps {
    wpm: number;
    accuracy: number;
    timeLeft?: number;
    wordCount?: number;
    mode: "time" | "words";
}

export function Stats({ wpm, accuracy, timeLeft, wordCount, mode }: StatsProps) {
    return (
        <div className="flex items-center justify-center gap-12 font-mono text-2xl mb-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center"
            >
                <span className="text-4xl font-bold text-primary">{mode === "time" ? timeLeft : wordCount}</span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest">{mode === "time" ? "seconds" : "words"}</span>
            </motion.div>

            <div className="w-px h-12 bg-white/10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="flex flex-col items-center"
            >
                <span className="text-4xl font-bold text-foreground">{wpm}</span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest">wpm</span>
            </motion.div>

            <div className="w-px h-12 bg-white/10" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center"
            >
                <span className="text-4xl font-bold text-foreground">{accuracy}%</span>
                <span className="text-sm text-muted-foreground uppercase tracking-widest">acc</span>
            </motion.div>
        </div>
    );
}
