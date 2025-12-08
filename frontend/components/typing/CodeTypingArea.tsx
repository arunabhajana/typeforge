import { motion } from "framer-motion";
import { useEffect, useRef, useMemo } from "react";

interface CodeTypingAreaProps {
    code: string;
    userInput: string;
    isFocused: boolean;
    className?: string;
}

export function CodeTypingArea({ code, userInput, isFocused, className }: CodeTypingAreaProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const cursorRef = useRef<HTMLSpanElement>(null);

    // Simple syntax highlighting regex
    const tokens = useMemo(() => {
        // This is a very basic highlighter for JS/TS
        const keywords = /\b(const|let|var|function|return|if|else|for|while|import|export|default|class|interface|type|from|async|await|extends|implements)\b/;
        const types = /\b(string|number|boolean|any|void|null|undefined|Promise|Array|Object)\b/;
        const builtins = /\b(console|Math|Date|JSON|window|document)\b/;
        const strings = /(['"`])(.*?)\1/;
        const comments = /(\/\/.*|\/\*[\s\S]*?\*\/)/;

        // Split by lines to handle indentation properly in display
        const lines = code.split('\n');

        return lines.map(line => {
            // Process each line for tokens (simplified view, not a real parser)
            // For now, we'll just return the line text to ensure character matching logic is robust first.
            // We can improve visual highlighting within the line later.
            return line;
        });
    }, [code]);

    // Scroll cursor into view
    useEffect(() => {
        if (cursorRef.current && containerRef.current) {
            // Logic to keep cursor visible. 
            // Simple scrollIntoView might be too jerky, but let's try it first.
            cursorRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [userInput]);

    return (
        <div
            ref={containerRef}
            className={`
                relative font-mono text-xl md:text-2xl leading-relaxed whitespace-pre overflow-x-auto overflow-y-auto max-h-[400px] p-4 
                transition-all duration-300 scrollbar-hide
                ${!isFocused ? "blur-[2px] opacity-40 grayscale" : ""} 
                ${className}
            `}
        >
            {/* The Code Display */}
            <div className="min-w-max">
                {code.split("").map((char, index) => {
                    const isTyped = index < userInput.length;
                    const isCurrent = index === userInput.length;
                    const userChar = userInput[index];

                    let color = "text-muted-foreground/40"; // Default untyped
                    let bg = "transparent";

                    if (isTyped) {
                        if (userChar === char) {
                            color = "text-foreground"; // Correct
                            // Apply crude syntax highlighting colors if correct
                            // (To do this properly we need to map char index to token type)
                            // For MVP, let's keep it simple: correct is white/foreground.
                        } else {
                            color = "text-red-500";
                            bg = "bg-red-500/20";
                        }
                    }

                    // Cursor
                    const isCursor = isCurrent && isFocused;

                    return (
                        <span
                            key={index}
                            className={`relative ${color} ${bg}`}
                        >
                            {isCursor && (
                                <motion.span
                                    layoutId="code-cursor"
                                    ref={cursorRef}
                                    className="absolute left-0 top-0 w-0.5 h-full bg-primary shadow-[0_0_8px_2px_rgba(var(--primary-rgb),0.5)] z-10"
                                    transition={{ type: "spring", stiffness: 1000, damping: 40, mass: 0.8 }}
                                />
                            )}
                            {char}
                        </span>
                    );
                })}
            </div>
        </div>
    );
}
