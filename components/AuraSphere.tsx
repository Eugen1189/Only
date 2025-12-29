"use client";

import { useEffect, useRef } from "react";

interface AuraSphereProps {
    mood: "calm" | "urgent" | "opportunity";
}

export default function AuraSphere({ mood }: AuraSphereProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        let time = 0;

        // Configuration for blobs
        const blobs = [
            { x: 0, y: 0, vx: 1, vy: 1.2, r: 150, color: "" },
            { x: 0, y: 0, vx: -1.5, vy: 1, r: 120, color: "" },
            { x: 0, y: 0, vx: 0.8, vy: -1.5, r: 180, color: "" },
        ];

        const getColors = (currentMood: string) => {
            switch (currentMood) {
                case "urgent":
                    return ["#ef4444", "#dc2626", "#7f1d1d"]; // Red spectrum
                case "opportunity":
                    return ["#eab308", "#fbbf24", "#d97706"]; // Gold spectrum
                case "calm":
                default:
                    return ["#3b82f6", "#8b5cf6", "#06b6d4"]; // Blue/Cyan/Purple
            }
        };

        const render = () => {
            time += 0.01;
            const width = canvas.width;
            const height = canvas.height;

            // Update blob colors based on mood
            const colors = getColors(mood);
            blobs.forEach((blob, i) => {
                blob.color = colors[i % colors.length];
            });

            // Clear with slight trail effect
            ctx.globalCompositeOperation = "source-over";
            ctx.fillStyle = "rgba(0, 0, 0, 0.02)"; // Fade out trail
            ctx.fillRect(0, 0, width, height);

            // Create liquid effect with 'screen' blend mode
            ctx.globalCompositeOperation = "screen";

            blobs.forEach((blob, i) => {
                // Simple sine wave movement
                blob.x = width / 2 + Math.sin(time * blob.vx) * 60;
                blob.y = height / 2 + Math.cos(time * blob.vy) * 60;

                const gradient = ctx.createRadialGradient(
                    blob.x, blob.y, 0,
                    blob.x, blob.y, blob.r
                );

                gradient.addColorStop(0, blob.color);
                gradient.addColorStop(1, "transparent");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(blob.x, blob.y, blob.r, 0, Math.PI * 2);
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        // Initial fill
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        render();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [mood]);

    return (
        <canvas
            ref={canvasRef}
            width={300}
            height={300}
            className="w-full h-full object-cover blur-xl scale-110 opacity-90 transition-opacity duration-1000"
        />
    );
}
