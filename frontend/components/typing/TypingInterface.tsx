"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { generateWords } from "@/utils/words";
import { getRandomSnippet } from "@/utils/snippets";
import { TypingArea } from "./TypingArea";
import { CodeTypingArea } from "./CodeTypingArea";
import { Stats } from "./Stats";
import { TestOptions } from "./TestOptions";
import { Results } from "./Results";
import { motion, AnimatePresence } from "framer-motion";

export function TypingInterface() {
    const [mode, setMode] = useState<"time" | "words" | "code">("time");
    const [duration, setDuration] = useState(30);
    const [targetWordCount, setTargetWordCount] = useState(50);

    const [words, setWords] = useState<string[]>([]);
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [rawWpm, setRawWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [consistency, setConsistency] = useState(0);
    const [charStats, setCharStats] = useState({ correct: 0, incorrect: 0, extra: 0, missed: 0 });
    const [isFocused, setIsFocused] = useState(true);

    const wpmHistory = useRef<number[]>([]);

    const inputRef = useRef<HTMLTextAreaElement>(null);

    const resetTest = useCallback(() => {
        if (mode === "code") {
            const snippet = getRandomSnippet();
            setWords([snippet.code]); // Store code as single string in array for consistent type, or handle differently. 
            // Actually, let's just use the first element if mode is code.
        } else {
            const count = mode === "words" ? targetWordCount : 100;
            setWords(generateWords(count));
        }
        setUserInput("");
        setStartTime(null);
        setIsActive(false);
        setIsFinished(false);
        setWpm(0);
        setRawWpm(0);
        setAccuracy(100);
        setConsistency(0);
        setCharStats({ correct: 0, incorrect: 0, extra: 0, missed: 0 });
        wpmHistory.current = [];
        setTimeLeft(duration);
        if (inputRef.current) inputRef.current.focus();
    }, [mode, duration, targetWordCount]);

    useEffect(() => {
        resetTest();
    }, [resetTest]);

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isActive && mode === "time" && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        finishTest();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, mode, timeLeft]);

    const finishTest = () => {
        setIsActive(false);
        setIsFinished(true);
        if (mode === "code") {
            calculateCodeStats();
        } else {
            calculateStats();
        }
    };

    const calculateStats = () => {
        if (!startTime) return;

        const endTime = Date.now();
        const timeInMinutes = (endTime - startTime) / 60000;

        const typedWords = userInput.split(" ");
        let correctChars = 0;
        let incorrectChars = 0;
        let extraChars = 0;
        let missedChars = 0;

        typedWords.forEach((typedWord, i) => {
            const targetWord = words[i];
            if (!targetWord) {
                // Extra words typed? Treat as extra characters
                extraChars += typedWord.length;
                return;
            }

            // Compare characters
            for (let j = 0; j < Math.max(typedWord.length, targetWord.length); j++) {
                const tChar = typedWord[j];
                const wChar = targetWord[j];

                if (tChar === wChar) {
                    correctChars++;
                } else if (tChar && wChar) {
                    incorrectChars++;
                } else if (tChar && !wChar) {
                    extraChars++;
                } else if (!tChar && wChar) {
                    missedChars++;
                }
            }

            // Add space as correct char if word is finished and not last word
            if (i < typedWords.length - 1) {
                correctChars++;
            }
        });

        const finalTimeMinutes = mode === "time" ? (duration / 60) : timeInMinutes;
        // Prevent division by zero or tiny numbers
        const safeTime = finalTimeMinutes < 0.001 ? 0.001 : finalTimeMinutes;

        const finalWpm = Math.round((correctChars / 5) / safeTime);
        const finalRawWpm = Math.round((userInput.length / 5) / safeTime);
        const calculatedAccuracy = Math.round((correctChars / Math.max(userInput.length, 1)) * 100) || 0;

        // Calculate consistency (Coefficient of Variation)
        const history = wpmHistory.current;
        let calcConsistency = 0;
        if (history.length > 0) {
            // Filter out initial zeros or noise if needed, but simple SD/Mean works
            const mean = history.reduce((a, b) => a + b, 0) / history.length;
            const variance = history.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / history.length;
            const sd = Math.sqrt(variance);
            // Consistency = 100 - CV. If CV is 0 (perfectly consistent), Consistency is 100.
            // Heuristic: If SD is high, consistency is lower.
            // A simpler metric might be better for typing tests, but let's try (1 - sd/mean)*100
            // If mean is 0, avoid NaN
            if (mean > 0) {
                const cv = sd / mean;
                // Clamp consistency between 0 and 100
                calcConsistency = Math.max(0, Math.round((1 - cv) * 100));
            }
        }

        // Fallback for very short tests or odd data
        if (calcConsistency === 0 && history.length < 2) calcConsistency = 100;

        setWpm(finalWpm);
        setRawWpm(finalRawWpm);
        setAccuracy(calculatedAccuracy);
        setConsistency(calcConsistency);
        setCharStats({ correct: correctChars, incorrect: incorrectChars, extra: extraChars, missed: missedChars });
    };

    // Calculate stats specifically for code mode
    const calculateCodeStats = () => {
        if (!startTime) return;
        const endTime = Date.now();
        const timeInMinutes = (endTime - startTime) / 60000;
        const safeTime = timeInMinutes < 0.001 ? 0.001 : timeInMinutes;

        const code = words[0]; // In code mode, words[0] is the full code snippet
        let correctChars = 0;
        let incorrectChars = 0;

        for (let i = 0; i < userInput.length; i++) {
            if (userInput[i] === code[i]) {
                correctChars++;
            } else {
                incorrectChars++;
            }
        }

        // Count missed
        const missedChars = Math.max(0, code.length - userInput.length);

        const finalWpm = Math.round((correctChars / 5) / safeTime);
        const finalRawWpm = Math.round((userInput.length / 5) / safeTime);
        const calculatedAccuracy = Math.round((correctChars / Math.max(userInput.length, 1)) * 100) || 0;

        setWpm(finalWpm);
        setRawWpm(finalRawWpm);
        setAccuracy(calculatedAccuracy);
        setCharStats({ correct: correctChars, incorrect: incorrectChars, extra: 0, missed: missedChars });
        // Consistency logic can stay same or be adapted
        setConsistency(100); // Placeholder
    }

    // Real-time stats
    useEffect(() => {
        if (isActive && startTime) {
            const timeElapsed = (Date.now() - startTime) / 60000;
            if (timeElapsed > 0) {
                // Simplified real-time calc
                let correctChars = 0;
                if (mode === "code") {
                    const code = words[0] || "";
                    correctChars = userInput.split("").filter((c, i) => c === code[i]).length;
                } else {
                    correctChars = userInput.split("").filter((c, i) => c === words.join(" ")[i]).length;
                }

                const currentWpm = Math.round((correctChars / 5) / timeElapsed);
                setWpm(currentWpm);
                setAccuracy(Math.round((correctChars / Math.max(userInput.length, 1)) * 100) || 100);

                // Track history for consistency
                // Only push periodically to avoid too much noise? Or every render is fine?
                // Every render is too frequent, but let's assume it's okay for now or use interval
                if (Date.now() % 1000 < 100) { // Rough 1s interval hack, better to use interval
                    wpmHistory.current.push(currentWpm);
                }
            }
        }
    }, [userInput, isActive, startTime, words]); // Added words to dependency


    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isFinished) return;

        const val = e.target.value;

        if (!isActive && val.length === 1) {
            setIsActive(true);
            setStartTime(Date.now());
        }

        setUserInput(val);

        if (mode === "words") {
            const wordsString = words.join(" ");
            // Check if we have typed enough words
            const typedWords = val.split(" ");
            // If last word is typed and matches length (or space added after last word)
            if (typedWords.length === words.length && typedWords[typedWords.length - 1].length === words[words.length - 1].length) {
                finishTest();
            } else if (typedWords.length > words.length) {
                finishTest();
            }
        } else if (mode === "code") {
            const code = words[0];
            if (val.length >= code.length) {
                finishTest();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Tab") {
            e.preventDefault();
            resetTest();
            return;
        }

        // Smart Enter for Code Mode
        if (mode === "code" && e.key === "Enter") {
            e.preventDefault();
            const code = words[0];
            const currentPos = userInput.length;

            // Check if next expected char is newline
            if (code[currentPos] === '\n') {
                let indentation = "";
                // Look ahead for indentation
                let i = currentPos + 1;
                while (i < code.length && (code[i] === ' ' || code[i] === '\t')) {
                    indentation += code[i];
                    i++;
                }

                // Construct new input with newline and indentation


                const newInput = userInput + '\n' + indentation;
                setUserInput(newInput);

                // If this completes the snippet (highly unlikely on enter, but possible if last char is newline?)
                if (newInput.length >= code.length) {
                    finishTest();
                }
            } else {
                // User pressed Enter but expected char wasn't newline. 
                // Allow them to type newline anyway (it will be red/wrong)? 
                // Or block? Standard is allow and show error.
                setUserInput(prev => prev + '\n');
            }
        }
    };

    return (
        <div className={`
            flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 relative min-h-[600px]
            ${isActive && isFocused ? "cursor-none select-none" : ""}
        `}>
            {/* Global style style injection to force cursor hidden when active AND focused */}
            {isActive && isFocused && (
                <style jsx global>{`
                    html, body, *:not(.debug-cursor) {
                        cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='), none !important;
                    }
                    /* Ensure input caret is hidden */
                    input, textarea {
                        caret-color: transparent !important;
                        cursor: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII='), none !important;
                    }
                    /* Hide custom cursor component */
                    #custom-cursor {
                        opacity: 0 !important;
                        visibility: hidden !important;
                    }
                `}</style>
            )}
            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key="test"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col items-center gap-12 outline-none ring-0 focus:outline-none focus:ring-0 border-none"
                        tabIndex={-1}
                    >
                        {/* Top Bar: Options and Stats - Fades out in focus mode */}
                        <motion.div
                            animate={{ opacity: isActive && isFocused ? 0 : 1, y: isActive && isFocused ? -20 : 0 }}
                            transition={{ duration: 0.5 }}
                            className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-6"
                        >
                            <TestOptions
                                mode={mode}
                                duration={duration}
                                wordCount={targetWordCount}
                                setMode={setMode}
                                setDuration={(d) => { setDuration(d); setTimeLeft(d); }}
                                setWordCount={setTargetWordCount}
                            />

                            <Stats
                                wpm={wpm}
                                accuracy={accuracy}
                                timeLeft={timeLeft}

                                wordCount={mode === "words" ? words.length - userInput.split(" ").length + 1 : (mode === "code" ? (words[0] || "").length - userInput.length : 0)}
                                mode={mode}
                            />
                        </motion.div>

                        {/* Typing Area */}
                        <div
                            className="relative w-full max-w-4xl group outline-none ring-0 focus:outline-none focus:ring-0 border-none select-none"
                            onClick={() => inputRef.current?.focus()}
                        >


                            {/* Word Count Indicator for Words Mode */}
                            {mode === "words" && isActive && isFocused && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="absolute -top-8 right-4 text-sm font-medium text-primary/80"
                                >
                                    {Math.min(userInput.trim().split(/\s+/).length, words.length)} / {words.length}
                                </motion.div>
                            )}

                            <div className={`
                                relative p-8 rounded-3xl transition-all duration-500 border-none outline-none ring-0
                                ${isFocused ? "bg-white/5 shadow-2xl shadow-primary/5" : "bg-transparent opacity-60"}
                            `}>
                                {!isFocused && (
                                    <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-[2px] transition-all duration-300 rounded-3xl cursor-pointer">
                                        <div className="flex items-center gap-3 text-foreground/90 bg-black/40 pl-8 pr-16 py-4 rounded-full shadow-2xl border border-white/10 backdrop-blur-md hover:scale-105 transition-transform duration-200">
                                            <div className="i-lucide-mouse-pointer-2 w-5 h-5 animate-pulse text-primary" />
                                            <span className="text-base font-medium tracking-wide">Click to focus</span>
                                        </div>
                                    </div>
                                )}
                                {mode !== "code" && (
                                    <TypingArea
                                        words={words}
                                        userInput={userInput}
                                        isFocused={isFocused}
                                    />
                                )}

                                {mode === "code" && (
                                    <CodeTypingArea
                                        code={words[0] || ""}
                                        userInput={userInput}
                                        isFocused={isFocused}
                                        className="absolute inset-0 z-10"
                                    />
                                )}
                            </div>

                            <textarea
                                ref={inputRef}
                                value={userInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className={`
                                    absolute inset-0 opacity-0 
                                    ${isActive && isFocused ? "cursor-none" : "cursor-default"}
                                    outline-none border-none ring-0 caret-transparent resize-none
                                `}
                                spellCheck="false"
                                autoComplete="off"
                                autoFocus
                            />
                        </div>

                        {/* Footer Hint - Fades out in focus mode */}
                        <motion.div
                            animate={{ opacity: isActive && isFocused ? 0 : 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-muted-foreground/50 text-sm font-medium flex items-center gap-2"
                        >
                            <span className="bg-white/10 px-2 py-1 rounded-md text-xs text-foreground/80">TAB</span>
                            <span>to restart</span>
                        </motion.div>
                    </motion.div>
                ) : (
                    <Results
                        key="results"
                        wpm={wpm}
                        rawWpm={rawWpm}
                        accuracy={accuracy}
                        consistency={consistency}
                        charStats={charStats}
                        time={mode === "time" ? duration : (startTime ? (Date.now() - startTime) / 1000 : 0)}
                        onRestart={resetTest}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
