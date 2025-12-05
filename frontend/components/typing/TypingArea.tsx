import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

interface TypingAreaProps {
    words: string[];
    userInput: string;
    className?: string;
    isFocused: boolean;
}

export function TypingArea({ words, userInput, className, isFocused }: TypingAreaProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Split user input by spaces to get typed words
    const typedWords = userInput.split(" ");

    // Auto-scroll to active word
    useEffect(() => {
        if (containerRef.current) {
            const activeWord = containerRef.current.querySelector(".active-word");
            if (activeWord) {
                activeWord.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        }
    }, [userInput]);

    return (
        <div
            ref={containerRef}
            className={`relative font-mono text-3xl leading-relaxed break-all max-h-[240px] overflow-hidden flex flex-wrap gap-x-4 gap-y-3 transition-all duration-300 ${!isFocused ? "blur-[2px] opacity-40 grayscale" : ""} ${className}`}
        >
            {!isFocused && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    {/* Overlay is handled by parent or separate div to avoid blurring itself if inside */}
                </div>
            )}

            {words.map((word, wordIndex) => {
                const isCurrentWord = wordIndex === typedWords.length - 1;
                const isTyped = wordIndex < typedWords.length - 1;
                const typedWord = typedWords[wordIndex] || "";

                // Class for the word wrapper
                let wordClass = "relative flex";
                if (isCurrentWord) wordClass += " active-word";

                return (
                    <div key={wordIndex} className={wordClass}>
                        {word.split("").map((char, charIndex) => {
                            let color = "text-muted-foreground/50";
                            let bg = "transparent";

                            // Logic for character coloring
                            if (isTyped || (isCurrentWord && charIndex < typedWord.length)) {
                                const userChar = typedWord[charIndex];
                                if (userChar === char) {
                                    color = "text-foreground";
                                } else if (userChar !== undefined) {
                                    color = "text-red-500";
                                    bg = "bg-red-500/10";
                                } else {
                                    // Char is missing in typed word (if word is finished)
                                    if (isTyped) {
                                        color = "text-red-500"; // Missed character
                                    }
                                }
                            }

                            // Cursor logic
                            const isCursor = isCurrentWord && isFocused && charIndex === typedWord.length;

                            return (
                                <span key={charIndex} className={`relative ${color} ${bg} transition-colors duration-75`}>
                                    {isCursor && (
                                        <motion.span
                                            layoutId="cursor"
                                            className="absolute left-0 top-0 w-0.5 h-full bg-primary shadow-[0_0_8px_2px_rgba(var(--primary-rgb),0.4)]"
                                            transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.8 }}
                                        />
                                    )}
                                    {char}
                                </span>
                            );
                        })}

                        {/* Handle extra characters typed by user beyond word length */}
                        {isCurrentWord && typedWord.length > word.length && (
                            typedWord.slice(word.length).split("").map((char, i) => (
                                <span key={`extra-${i}`} className="text-red-500 bg-red-500/10">
                                    {char}
                                </span>
                            ))
                        )}

                        {/* Cursor at the end of the word if user typed all chars */}
                        {isCurrentWord && isFocused && typedWord.length >= word.length && (
                            <motion.span
                                layoutId="cursor"
                                className="absolute right-[-2px] top-0 w-0.5 h-full bg-primary shadow-[0_0_8px_2px_rgba(var(--primary-rgb),0.4)]"
                                transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.8 }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
