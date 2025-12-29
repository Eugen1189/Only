"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ThoughtStreamProps {
    appState: "idle" | "listening" | "processing" | "speaking";
}

const legalTerms = [
    "INBOX ZERO", "SPAM FILTER", "SENTIMENT SCAN",
    "PRIORITY SORT", "CALENDAR SYNC", "DRAFTING REPLY",
    "ATTACHMENT SCAN", "NEWSLETTER BLOCK", "DEEP FOCUS"
];

export default function ThoughtStream({ appState }: ThoughtStreamProps) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        setIsActive(appState === "processing" || appState === "speaking");
    }, [appState]);

    return (
        <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
            {/* Dynamic Rings */}
            <motion.div
                className="absolute w-[300px] h-[300px] rounded-full border border-purple-500/10"
                animate={{
                    rotate: 360,
                    scale: isActive ? 1.1 : 1,
                    opacity: isActive ? 0.5 : 0.1
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="absolute w-[340px] h-[340px] rounded-full border border-blue-500/10 border-dashed"
                animate={{
                    rotate: -360,
                    scale: isActive ? 1.1 : 1,
                    opacity: isActive ? 0.4 : 0.1
                }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Legal Terms */}
            {isActive && legalTerms.map((term, i) => (
                <motion.div
                    key={i}
                    className={`absolute text-[8px] font-mono font-bold tracking-widest uppercase ${term.includes("SPAM") || term.includes("BLOCK")
                            ? "text-red-400 drop-shadow-[0_0_5px_rgba(248,113,113,0.8)]"
                            : "text-cyan-200/60"
                        }`}
                    initial={{ opacity: 0, scale: 0.5, x: 0, y: 0 }}
                    animate={{
                        opacity: [0, 1, 0],
                        scale: [0.5, 1, 1.2],
                        x: Math.cos(i * (360 / legalTerms.length)) * 200,
                        y: Math.sin(i * (360 / legalTerms.length)) * 200,
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: i * 0.2,
                        ease: "easeOut"
                    }}
                >
                    {term}
                </motion.div>
            ))}
        </div>
    );
}
