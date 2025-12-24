"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";

interface ParticleSystemProps {
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}

export default function ParticleSystem({ mouseX, mouseY }: ParticleSystemProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Particle class
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;

      constructor() {
        this.x = Math.random() * (canvas?.width || window.innerWidth);
        this.y = Math.random() * (canvas?.height || window.innerHeight);
        this.size = Math.random() * 2 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update(mouseX: number, mouseY: number, canvasWidth: number, canvasHeight: number) {
        // Parallax effect - particles react to mouse movement
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const force = 100 / distance;

        if (distance < 100) {
          this.speedX -= dx * force * 0.0001;
          this.speedY -= dy * force * 0.0001;
        }

        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x < 0 || this.x > canvasWidth) this.speedX *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.speedY *= -1;

        // Damping
        this.speedX *= 0.99;
        this.speedY *= 0.99;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    // Create particles
    const particles: Particle[] = [];
    for (let i = 0; i < 30; i++) {
      particles.push(new Particle());
    }

    let currentMouseX = canvas.width / 2;
    let currentMouseY = canvas.height / 2;

    // Subscribe to mouse position
    const unsubscribeX = mouseX.on("change", (latest) => {
      currentMouseX = latest;
    });
    const unsubscribeY = mouseY.on("change", (latest) => {
      currentMouseY = latest;
    });

    // Animation loop
    const animate = () => {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(currentMouseX, currentMouseY, canvas.width, canvas.height);
        particle.draw(ctx);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      unsubscribeX();
      unsubscribeY();
    };
  }, [mouseX, mouseY]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-[5]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}

