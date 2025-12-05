"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { generateWords } from "@/utils/words";
import { TypingArea } from "./TypingArea";
import { Stats } from "./Stats";
import { TestOptions } from "./TestOptions";
import { Results } from "./Results";
import { motion, AnimatePresence } from "framer-motion";

export function TypingInterface() {
    const [mode, setMode] = useState<"time" | "words">("time");
    const [duration, setDuration] = useState(30);
    const [targetWordCount, setTargetWordCount] = useState(50);

    const [words, setWords] = useState<string[]>([]);
    const [userInput, setUserInput] = useState("");
    const [startTime, setStartTime] = useState<number | null>(null);
    const [timeLeft, setTimeLeft] = useState(duration);
    const [isActive, setIsActive] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [wpm, setWpm] = useState(0);
    const [accuracy, setAccuracy] = useState(100);
    const [isFocused, setIsFocused] = useState(true);

    const inputRef = useRef<HTMLInputElement>(null);

    const resetTest = useCallback(() => {
        const count = mode === "words" ? targetWordCount : 100;
        setWords(generateWords(count));
        setUserInput("");
        setStartTime(null);
        setIsActive(false);
        setIsFinished(false);
        setWpm(0);
        setAccuracy(100);
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
        calculateStats();
    };

    const calculateStats = () => {
        if (!startTime) return;

        const endTime = Date.now();
        const timeInMinutes = (endTime - startTime) / 60000;

        const wordsString = words.join(" ");
        let correctChars = 0;

        // Calculate correct chars based on word matching to be consistent with rendering
        const typedWords = userInput.split(" ");
        typedWords.forEach((typedWord, i) => {
            const targetWord = words[i];
            if (!targetWord) return;

            for (let j = 0; j < typedWord.length; j++) {
                if (j < targetWord.length && typedWord[j] === targetWord[j]) {
                    correctChars++;
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
        const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100) || 100;

        setWpm(finalWpm);
        setAccuracy(calculatedAccuracy);
    };

    // Real-time stats
    useEffect(() => {
        if (isActive && startTime) {
            const timeElapsed = (Date.now() - startTime) / 60000;
            if (timeElapsed > 0) {
                // Simplified real-time calc
                const correctChars = userInput.split("").filter((c, i) => c === words.join(" ")[i]).length;
                setWpm(Math.round((correctChars / 5) / timeElapsed));
                setAccuracy(Math.round((correctChars / userInput.length) * 100) || 100);
            }
        }
    }, [userInput, isActive, startTime]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Tab") {
            e.preventDefault();
            resetTest();
        }
    };

    return (
        <div className="flex flex-col items-center justify-center w-full max-w-6xl mx-auto p-4 relative min-h-[600px]">
            <AnimatePresence mode="wait">
                {!isFinished ? (
                    <motion.div
                        key="test"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                        transition={{ duration: 0.3 }}
                        className="w-full flex flex-col items-center gap-12 outline-none ring-0 focus:outline-none focus:ring-0"
                        tabIndex={-1}
                    >
                        {/* Top Bar: Options and Stats */}
                        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-4xl gap-6">
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
                                wordCount={mode === "words" ? words.length - userInput.split(" ").length + 1 : 0}
                                mode={mode}
                            />
                        </div>

                        {/* Typing Area */}
                        <div
                            className="relative w-full max-w-4xl group outline-none ring-0 focus:outline-none focus:ring-0"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {!isFocused && (
                                <div className="absolute inset-0 flex items-center justify-center z-20 backdrop-blur-[2px] transition-all duration-300 rounded-xl cursor-pointer">
                                    <div className="flex items-center gap-2 text-muted-foreground/80 bg-background/80 px-6 py-3 rounded-full shadow-lg border border-white/5">
                                        <span className="i-lucide-mouse-pointer w-4 h-4" />
                                        <span className="text-sm font-medium">Click to focus</span>
                                    </div>
                                </div>
                            )}

                            <div className={`
                                relative p-8 rounded-3xl transition-all duration-500
                                ${isFocused ? "bg-white/5 shadow-2xl shadow-primary/5 ring-1 ring-white/10" : "bg-white/5 opacity-60"}
                            `}>
                                <TypingArea
                                    words={words}
                                    userInput={userInput}
                                    isFocused={isFocused}
                                />
                            </div>

                            <input
                                ref={inputRef}
                                type="text"
                                value={userInput}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                className="absolute inset-0 opacity-0 cursor-default outline-none"
                                autoFocus
                            />
                        </div>

                        {/* Footer Hint */}
                        <div className="text-muted-foreground/50 text-sm font-medium flex items-center gap-2">
                            <span className="bg-white/10 px-2 py-1 rounded-md text-xs text-foreground/80">TAB</span>
                            <span>to restart</span>
                        </div>
                    </motion.div>
                ) : (
                    <Results
                        key="results"
                        wpm={wpm}
                        accuracy={accuracy}
                        onRestart={resetTest}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
