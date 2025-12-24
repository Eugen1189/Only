"use client";

import React from "react";
import { motion } from "framer-motion";

// Main hero section component
const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white overflow-hidden font-sans selection:bg-purple-500 selection:text-white">
      
      {/* 1. Background gradients (Atmosphere) */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/40 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-900/30 rounded-full blur-[120px]" />

      {/* Navigation (Header) */}
      <nav className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
            <span className="text-xs font-bold">AI</span>
          </div>
          <span className="font-semibold tracking-wide">EonAI</span>
        </div>
        
        {/* Pill button with menu */}
        <div className="hidden md:flex bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-1 py-1">
          <button className="px-6 py-2 rounded-full bg-purple-600 text-sm font-medium hover:bg-purple-500 transition">Features</button>
          <button className="px-6 py-2 rounded-full text-white/70 text-sm font-medium hover:text-white transition">Pricing</button>
        </div>

        <button className="bg-blue-600 hover:bg-blue-500 text-xs md:text-sm px-6 py-3 rounded-full transition font-medium">
          Download App
        </button>
      </nav>

      {/* Main content */}
      <main className="relative z-10 container mx-auto h-screen flex flex-col md:flex-row items-center justify-center px-4 md:px-12">
        
        {/* Left section: Text */}
        <div className="w-full md:w-1/3 space-y-6 text-center md:text-left mt-20 md:mt-0">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold leading-tight"
          >
            A Digital Brain <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              That Operates for You
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-400 text-sm md:text-base max-w-md mx-auto md:mx-0"
          >
            Built for founders, creators, and teams who need clarity, speed, and control.
          </motion.p>
        </div>

        {/* Center section: 3D Sphere (CSS simulation) */}
        {/* In a real project, this should be <Spline /> or Three.js Canvas */}
        <div className="w-full md:w-1/3 flex justify-center items-center my-10 md:my-0 relative">
          <motion.div 
            animate={{ 
              scale: [1, 1.05, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
            className="relative w-64 h-64 md:w-80 md:h-80"
          >
            {/* Sphere core */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-b from-purple-500 via-transparent to-blue-600 opacity-80 blur-md shadow-[0_0_60px_rgba(124,58,237,0.5)] border-2 border-white/20" />
            {/* Inner ring */}
            <div className="absolute inset-8 rounded-full bg-black/80 backdrop-blur-xl border border-white/10 shadow-inner flex items-center justify-center">
               <div className="w-16 h-16 bg-purple-500 rounded-full blur-xl opacity-60 animate-pulse"></div>
            </div>
          </motion.div>
        </div>

        {/* Right section / Bottom panel (Interactive elements) */}
        <div className="w-full md:w-1/3 flex flex-col items-center md:items-end gap-4">
            
            {/* "Good Morning" card */}
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl w-full max-w-xs"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-gray-400">System Active</span>
              </div>
              <p className="text-sm text-gray-200">
                Good Morning. How can I help you optimize your workflow today?
              </p>
              
              {/* Action icons */}
              <div className="flex gap-2 mt-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition flex items-center justify-center cursor-pointer">
                    <div className="w-4 h-4 border border-white/50 rounded-sm" />
                  </div>
                ))}
              </div>
            </motion.div>

             {/* Small "Last Image" card */}
             <motion.div 
               initial={{ x: 50, opacity: 0 }}
               animate={{ x: 0, opacity: 1 }}
               transition={{ delay: 0.7 }}
               className="bg-white/5 backdrop-blur-md border border-white/10 p-3 rounded-2xl w-full max-w-xs flex items-center gap-3"
             >
                <div className="w-12 h-12 bg-orange-500/20 rounded-lg border border-orange-500/30 flex-shrink-0 relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-orange-600 to-yellow-300 opacity-60"></div>
                </div>
                <div>
                  <p className="text-xs text-gray-400">Your Last Image</p>
                  <p className="text-xs font-semibold">Mars Surface Render</p>
                </div>
             </motion.div>
        </div>
      </main>
    </div>
  );
};

export default HeroSection;

