"use client";

import "regenerator-runtime/runtime";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import ErrorBoundary from "@/components/ErrorBoundary";

// Dynamically import both components to prevent SSR flash
const SoftInterface = dynamic(() => import("@/components/SoftInterface"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[100dvh] bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
    </div>
  ),
});

const HeroSection = dynamic(() => import("@/components/HeroSection"), {
  ssr: false,
  loading: () => (
    <div className="relative w-full h-[100dvh] bg-[#050505] flex items-center justify-center">
      <div className="w-12 h-12 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
    </div>
  ),
});

// Loading component with matching background to prevent flash
const LoadingScreen = () => (
  <div className="relative w-full h-[100dvh] bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin" />
  </div>
);

export default function Home() {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check - use requestAnimationFrame to ensure DOM is ready
    requestAnimationFrame(() => {
      checkMobile();
    });
    
    // Listen for resize events
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show loading screen until we know the device type
  // This prevents any flash of wrong content
  if (!mounted || isMobile === null) {
    return <LoadingScreen />;
  }

  // Render appropriate interface based on device with error boundary
  return (
    <ErrorBoundary>
      {isMobile ? <SoftInterface /> : <HeroSection />}
    </ErrorBoundary>
  );
}

