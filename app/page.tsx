"use client";

import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection";
import FixedMobileInterface from "@/components/FixedMobileInterface";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Show fixed interface with proper video masking on mobile devices, desktop on larger screens
  return isMobile ? <FixedMobileInterface /> : <HeroSection />;
}

