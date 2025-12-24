"use client";

import React from "react";
import { motion } from "framer-motion";
import { Menu, Mic, Image as ImageIcon, Sparkles } from "lucide-react";

const MobileAIInterface = () => {
  return (
    // Main container: black background, full screen, no scroll
    <div className="relative w-full h-[100dvh] bg-[#020202] text-white overflow-hidden flex flex-col font-sans">
      
      {/* --- 1. ATMOSPHERE (Background) --- */}
      {/* Top glow */}
      <div className="absolute top-[-10%] left-[-20%] w-[300px] h-[300px] bg-purple-800/40 rounded-full blur-[100px] pointer-events-none" />
      {/* Bottom glow */}
      <div className="absolute bottom-[-10%] right-[-20%] w-[250px] h-[250px] bg-blue-800/30 rounded-full blur-[80px] pointer-events-none" />

      {/* --- 2. HEADER (Top panel) --- */}
      <header className="flex justify-between items-center p-6 z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(168,85,247,0.4)]">
             <Sparkles size={16} className="text-white" />
          </div>
          <span className="font-semibold text-lg tracking-wide">EonAI</span>
        </div>
        
        <button className="p-2 rounded-full bg-white/5 border border-white/10 active:scale-95 transition">
          <Menu size={20} className="text-white/80" />
        </button>
      </header>

      {/* --- 3. CENTRAL SPHERE (Visualization) --- */}
      <main className="flex-1 flex flex-col items-center justify-center relative z-10 -mt-16">
        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative w-[280px] h-[280px]"
        >
           {/* Outer ring */}
           <div className="absolute inset-0 rounded-full border border-white/10 shadow-[0_0_40px_rgba(124,58,237,0.2)] animate-spin-slow" style={{animationDuration: '20s'}} />
           
           {/* Main sphere (Glassmorphism) */}
           <div className="absolute inset-4 rounded-full bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/20 shadow-2xl flex items-center justify-center overflow-hidden">
              {/* Core (Holographic effect) */}
              <div className="w-full h-full bg-gradient-to-tr from-purple-600 via-transparent to-blue-500 opacity-60 mix-blend-screen animate-pulse" />
              <div className="absolute w-24 h-24 bg-purple-500 rounded-full blur-[40px] opacity-80" />
           </div>
        </motion.div>

        {/* Greeting text */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 text-center px-6"
        >
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            Good Morning
          </h2>
          <p className="text-white/50 text-sm mt-2">
            System ready. How can I assist you?
          </p>
        </motion.div>
      </main>

      {/* --- 4. BOTTOM UI (Control panel) --- */}
      <footer className="p-6 pb-8 z-20 w-full max-w-md mx-auto">
        
        {/* Floating card "Last actions" */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-3xl flex items-center gap-4"
        >
          <div className="w-12 h-12 bg-purple-900/50 rounded-2xl flex items-center justify-center border border-purple-500/30">
            <ImageIcon size={20} className="text-purple-300" />
          </div>
          <div className="flex-1">
             <p className="text-xs text-white/40 uppercase tracking-wider font-bold">Last Action</p>
             <p className="text-sm font-medium text-white/90">Generated 3D Asset</p>
          </div>
          <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
        </motion.div>

        {/* Dock with buttons (Action Bar) */}
        <div className="h-20 bg-[#111]/80 backdrop-blur-2xl border border-white/5 rounded-[30px] flex items-center justify-between px-2 shadow-2xl">
          
          {/* Left button */}
          <button className="w-16 h-16 rounded-full flex items-center justify-center text-white/50 hover:text-white transition active:scale-90">
             <span className="text-xs font-medium">Chat</span>
          </button>

          {/* Central button (Microphone - Accent) */}
          <button className="w-20 h-14 bg-gradient-to-r from-purple-600 to-blue-600 rounded-[24px] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] active:scale-95 transition transform -translate-y-4 border border-white/20">
             <Mic size={24} className="text-white" />
          </button>

          {/* Right button */}
          <button className="w-16 h-16 rounded-full flex items-center justify-center text-white/50 hover:text-white transition active:scale-90">
             <span className="text-xs font-medium">Apps</span>
          </button>
          
        </div>
      </footer>
    </div>
  );
};

export default MobileAIInterface;

