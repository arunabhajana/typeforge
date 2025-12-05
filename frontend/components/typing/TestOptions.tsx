import { motion } from "framer-motion";

interface TestOptionsProps {
    mode: "time" | "words";
    duration: number;
    wordCount: number;
    setMode: (mode: "time" | "words") => void;
    setDuration: (duration: number) => void;
    setWordCount: (count: number) => void;
}

export function TestOptions({
    mode,
    duration,
    wordCount,
    setMode,
    setDuration,
    setWordCount
}: TestOptionsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4 p-1.5 bg-white/5 rounded-full backdrop-blur-md border border-white/10"
        >
            <div className="flex items-center gap-1 bg-black/20 rounded-full p-1">
                <button
                    onClick={() => setMode("time")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 ${mode === "time" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                >
                    Time
                </button>
                <button
                    onClick={() => setMode("words")}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 ${mode === "words" ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                        }`}
                >
                    Words
                </button>
            </div>

            <div className="w-px h-4 bg-white/10" />

            <div className="flex items-center gap-1 pr-2">
                {mode === "time" ? (
                    <>
                        {[30, 60, 120].map((t) => (
                            <button
                                key={t}
                                onClick={() => setDuration(t)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 ${duration === t ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    }`}
                            >
                                {t}
                            </button>
                        ))}
                    </>
                ) : (
                    <>
                        {[10, 25, 50, 100].map((c) => (
                            <button
                                key={c}
                                onClick={() => setWordCount(c)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 outline-none focus:outline-none focus:ring-0 ${wordCount === c ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                    }`}
                            >
                                {c}
                            </button>
                        ))}
                    </>
                )}
            </div>
        </motion.div>
    );
}
