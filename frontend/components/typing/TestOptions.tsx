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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-6 p-4 bg-white/5 rounded-full backdrop-blur-sm border border-white/10 mb-12 w-fit mx-auto"
        >
            <div className="flex items-center gap-2 border-r border-white/10 pr-6">
                <button
                    onClick={() => setMode("time")}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${mode === "time" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Time
                </button>
                <button
                    onClick={() => setMode("words")}
                    className={`px-3 py-1 rounded-md text-sm transition-colors ${mode === "words" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground"
                        }`}
                >
                    Words
                </button>
            </div>

            <div className="flex items-center gap-4">
                {mode === "time" ? (
                    <>
                        {[30, 60, 120].map((t) => (
                            <button
                                key={t}
                                onClick={() => setDuration(t)}
                                className={`text-sm transition-colors ${duration === t ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
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
                                className={`text-sm transition-colors ${wordCount === c ? "text-primary font-bold" : "text-muted-foreground hover:text-foreground"
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
