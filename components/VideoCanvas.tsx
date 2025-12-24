"use client";

import { useEffect, useRef } from "react";

interface VideoCanvasProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function VideoCanvas({ width = 260, height = 260, className = "" }: VideoCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = width;
    canvas.height = height;

    let time = 0;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) / 2 - 10;

    const draw = () => {
      // Clear canvas
      ctx.fillStyle = "rgba(0, 0, 0, 0)";
      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, maxRadius);
      gradient.addColorStop(0, `rgba(168, 85, 247, ${0.3 + Math.sin(time * 0.01) * 0.1})`);
      gradient.addColorStop(0.5, `rgba(59, 130, 246, ${0.2 + Math.cos(time * 0.015) * 0.1})`);
      gradient.addColorStop(1, "rgba(15, 23, 42, 0.8)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Draw rotating particles/orbs
      const particleCount = 8;
      for (let i = 0; i < particleCount; i++) {
        const angle = (time * 0.002) + (i / particleCount) * Math.PI * 2;
        const radius = maxRadius * 0.6;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const size = 15 + Math.sin(time * 0.01 + i) * 5;

        // Create glow effect
        const particleGradient = ctx.createRadialGradient(x, y, 0, x, y, size);
        particleGradient.addColorStop(0, `rgba(255, 255, 255, ${0.6 + Math.sin(time * 0.02 + i) * 0.3})`);
        particleGradient.addColorStop(0.5, `rgba(168, 85, 247, ${0.4 + Math.cos(time * 0.015 + i) * 0.2})`);
        particleGradient.addColorStop(1, "rgba(59, 130, 246, 0)");

        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw central pulsing orb
      const pulseSize = maxRadius * 0.4 + Math.sin(time * 0.02) * 10;
      const centerGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, pulseSize);
      centerGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 + Math.sin(time * 0.03) * 0.2})`);
      centerGradient.addColorStop(0.3, `rgba(168, 85, 247, ${0.4 + Math.cos(time * 0.025) * 0.2})`);
      centerGradient.addColorStop(0.6, `rgba(59, 130, 246, ${0.2 + Math.sin(time * 0.02) * 0.1})`);
      centerGradient.addColorStop(1, "rgba(15, 23, 42, 0)");

      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      ctx.fill();

      // Draw connecting lines
      ctx.strokeStyle = `rgba(168, 85, 247, ${0.2 + Math.sin(time * 0.01) * 0.1})`;
      ctx.lineWidth = 1;
      const lineRadius = maxRadius * 0.6;
      for (let i = 0; i < particleCount; i++) {
        const angle1 = (time * 0.002) + (i / particleCount) * Math.PI * 2;
        const angle2 = (time * 0.002) + ((i + 1) % particleCount / particleCount) * Math.PI * 2;
        const x1 = centerX + Math.cos(angle1) * lineRadius;
        const y1 = centerY + Math.sin(angle1) * lineRadius;
        const x2 = centerX + Math.cos(angle2) * lineRadius;
        const y2 = centerY + Math.sin(angle2) * lineRadius;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      time += 1;
      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ mixBlendMode: "screen" }}
    />
  );
}

