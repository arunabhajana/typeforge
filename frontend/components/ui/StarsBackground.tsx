"use client";

import React, {
    useEffect,
    useRef,
    useState,
    useCallback,
} from "react";
import { cn } from "@/utils/cn";

interface StarProps {
    x: number;
    y: number;
    radius: number;
    opacity: number;
    twinkleSpeed: number;
}

interface StarsBackgroundProps {
    starDensity?: number;
    allStarsTwinkle?: boolean;
    twinkleProbability?: number;
    minStarSize?: number;
    maxStarSize?: number;
    className?: string;
}

export const StarsBackground = ({
    starDensity = 0.00015,
    allStarsTwinkle = true,
    twinkleProbability = 0.7,
    minStarSize = 0.5,
    maxStarSize = 1,
    className,
}: StarsBackgroundProps) => {
    const [stars, setStars] = useState<StarProps[]>([]);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const generateStars = useCallback(
        (width: number, height: number): StarProps[] => {
            const area = width * height;
            const numStars = Math.floor(area * starDensity);
            return Array.from({ length: numStars }, () => {
                const shouldTwinkle =
                    allStarsTwinkle || Math.random() < twinkleProbability;
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * (maxStarSize - minStarSize) + minStarSize,
                    opacity: Math.random() * 0.5 + 0.5,
                    twinkleSpeed: shouldTwinkle
                        ? Math.random() * 0.005 + 0.002
                        : 0,
                };
            });
        },
        [starDensity, allStarsTwinkle, twinkleProbability, minStarSize, maxStarSize]
    );

    useEffect(() => {
        const updateStars = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const { width, height } = canvas.getBoundingClientRect();
                canvas.width = width;
                canvas.height = height;
                setStars(generateStars(width, height));
            }
        };

        updateStars();
        window.addEventListener("resize", updateStars);

        return () => {
            window.removeEventListener("resize", updateStars);
        };
    }, [generateStars]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            stars.forEach((star) => {
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
                ctx.fill();

                if (star.twinkleSpeed > 0) {
                    star.opacity += star.twinkleSpeed;
                    if (star.opacity > 1 || star.opacity < 0.5) {
                        star.twinkleSpeed = -star.twinkleSpeed;
                    }
                }

                // Movement
                star.y -= 0.2; // Move up slowly
                if (star.y < 0) {
                    star.y = canvas.height;
                    star.x = Math.random() * canvas.width;
                }
            });
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [stars]);

    return (
        <div
            className={cn("absolute inset-0 z-0 pointer-events-none", className)}
        >
            <canvas
                ref={canvasRef}
                className="w-full h-full absolute inset-0"
            />
        </div>
    );
};
