"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Mic, 
  MessageSquare, 
  Image as ImageIcon, 
  Music, 
  Settings, 
  Sparkles 
} from "lucide-react";

const OrbitalMobileInterface = () => {
  // Satellite buttons configuration
  const satellites = [
    { id: 1, icon: <MessageSquare size={20} />, label: "Chat", position: "top-0 left-4" },
    { id: 2, icon: <ImageIcon size={20} />, label: "Create", position: "top-0 right-4" },
    { id: 3, icon: <Music size={20} />, label: "Audio", position: "bottom-10 left-8" },
    { id: 4, icon: <Settings size={20} />, label: "Setup", position: "bottom-10 right-8" },
  ];

  return (
    <div className="relative w-full h-[100dvh] bg-[#020202] text-white overflow-hidden flex flex-col font-sans">
      
      {/* --- ATMOSPHERE (Background) --- */}
      <div className="absolute top-[-15%] left-0 w-full h-[50vh] bg-purple-900/20 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-0 w-[80%] h-[40vh] bg-blue-900/20 blur-[100px] pointer-events-none" />

      {/* --- HEADER --- */}
      <header className="absolute top-0 w-full p-6 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2 opacity-80">
          <Sparkles size={16} className="text-purple-400" />
          <span className="text-sm font-semibold tracking-wider uppercase">EonAI</span>
        </div>
        <div className="w-8 h-8 rounded-full border border-white/20 overflow-hidden">
             {/* User avatar or menu */}
             <div className="w-full h-full bg-white/10 backdrop-blur-md" />
        </div>
      </header>

      {/* --- MAIN SCENE (Center) --- */}
      <main className="flex-1 relative flex items-center justify-center">
        
        {/* Orbit container (320x320px) - everything is centered relative to it */}
        <div className="relative w-[320px] h-[320px] flex items-center justify-center">

            {/* 1. CENTRAL SPHERE */}
            <motion.div
              animate={{ scale: [1, 1.02, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-48 h-48 z-10"
            >
               {/* Glow effect behind */}
               <div className="absolute inset-0 bg-purple-600/30 blur-[40px] rounded-full animate-pulse" />
               
               {/* Sphere body */}
               <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] overflow-hidden flex items-center justify-center">
                  <div className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl opacity-70 mix-blend-screen" />
               </div>
               
               {/* Rings around sphere */}
               <div className="absolute inset-[-10px] rounded-full border border-white/5 skew-y-12 animate-spin-slow opacity-60" style={{animationDuration: '15s'}} />
               <div className="absolute inset-[-25px] rounded-full border border-dashed border-white/5 -skew-x-12 animate-reverse-spin opacity-40" style={{animationDuration: '20s'}} />
            </motion.div>

            {/* 2. ORBITAL BUTTONS (SATELLITES) */}
            {satellites.map((btn, index) => (
              <motion.button
                key={btn.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: 1, 
                  opacity: 1,
                  y: [0, -5, 0] // Levitation
                }}
                transition={{ 
                  delay: 0.2 + (index * 0.1), 
                  y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 } // Different start time for animation
                }}
                className={`absolute ${btn.position} z-20 flex flex-col items-center gap-2 group`}
              >
                {/* Round button */}
                <div className="w-14 h-14 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg group-active:scale-90 transition duration-200 hover:bg-white/10 hover:border-white/20 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <div className="text-white/80 group-hover:text-white transition">
                    {btn.icon}
                  </div>
                </div>
                {/* Label */}
                <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold group-hover:text-white/80 transition">
                  {btn.label}
                </span>
              </motion.button>
            ))}

        </div>
      </main>

      {/* --- BOTTOM PANEL (Voice input) --- */}
      <footer className="p-8 flex flex-col items-center gap-4 z-20">
        <p className="text-white/50 text-sm font-medium animate-pulse">
          &ldquo;Generate a cyberpunk city...&rdquo;
        </p>
        
        {/* Main action button */}
        <button className="w-full max-w-[200px] bg-gradient-to-r from-purple-600 to-blue-600 p-[1px] rounded-full shadow-[0_0_20px_rgba(124,58,237,0.4)] active:scale-95 transition">
          <div className="bg-black/80 backdrop-blur-sm rounded-full px-6 py-3 flex items-center justify-center gap-2 h-full w-full hover:bg-black/60 transition">
             <Mic size={18} className="text-white" />
             <span className="text-sm font-bold">Tap to Speak</span>
          </div>
        </button>
      </footer>

    </div>
  );
};

export default OrbitalMobileInterface;

