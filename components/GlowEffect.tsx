"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

const GlowEffect = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [visible, setVisible] = useState(false);

  // Spring settings (soft lag)
  const springConfig = { damping: 20, stiffness: 100 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Show glow only after client loads
    setVisible(true);

    const handleMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  if (!visible) return null;

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      // KEY CHANGES:
      // 1. z-[1] - lift above main background, but below text (text should be z-10+)
      // 2. mix-blend-screen - ensures glow is VISIBLE on dark background
      // 3. Radial gradient instead of solid color
      className="fixed top-0 left-0 w-[450px] h-[450px] rounded-full pointer-events-none z-[1]"
    >
      <div 
        className="w-full h-full rounded-full blur-[60px] mix-blend-screen"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(59,130,246,0.15) 50%, transparent 70%)"
        }}
      />
    </motion.div>
  );
};

export default GlowEffect;

