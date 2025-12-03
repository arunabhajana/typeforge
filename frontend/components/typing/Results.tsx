import { motion } from "framer-motion";

interface ResultsProps {
    wpm: number;
    accuracy: number;
    onRestart: () => void;
}

export function Results({ wpm, accuracy, onRestart }: ResultsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto p-12 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl"
        >
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Test Complete
            </h2>

            <div className="grid grid-cols-2 gap-12 mb-12">
                <div className="flex flex-col items-center">
                    <span className="text-6xl font-bold text-foreground mb-2">{wpm}</span>
                    <span className="text-sm text-muted-foreground uppercase tracking-widest">WPM</span>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-6xl font-bold text-foreground mb-2">{accuracy}%</span>
                    <span className="text-sm text-muted-foreground uppercase tracking-widest">Accuracy</span>
                </div>
            </div>

            <button
                onClick={onRestart}
                className="px-8 py-3 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors"
            >
                Try Again
            </button>

            <div className="mt-4 text-sm text-muted-foreground">
                Press <span className="bg-white/10 px-2 py-0.5 rounded text-xs">TAB</span> to restart
            </div>
        </motion.div>
    );
}
