"use client";

import React, { useState, useRef } from "react";
import { Mic, MessageSquare, Image as ImageIcon, Music, Settings, Menu, Sparkles } from "lucide-react";

interface MenuButtonProps {
  icon: React.ReactNode;
  label: string;
}

// Separate component for buttons so they are identical
const MenuButton = ({ icon, label }: MenuButtonProps) => (
  <button className="flex flex-col items-center gap-2 group">
    <div className="w-16 h-16 rounded-full bg-[#111] border border-white/10 flex items-center justify-center shadow-2xl active:scale-95 transition-all duration-200 group-hover:border-white/30">
      <div className="text-white/70 group-hover:text-white">{icon}</div>
    </div>
    <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase">{label}</span>
  </button>
);

const FixedMobileInterface = () => {
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="relative w-full h-[100dvh] bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-between font-sans">
      
      {/* 1. Header (Top) */}
      <header className="w-full p-6 flex justify-between items-center z-30">
        <div className="flex items-center gap-2 opacity-80">
          <Sparkles size={16} className="text-purple-500" />
          <span className="font-bold tracking-widest text-sm">EONAI</span>
        </div>
        <button className="p-3 bg-white/5 rounded-full border border-white/10">
          <Menu size={20} />
        </button>
      </header>

      {/* 2. MAIN CENTER (Main part) */}
      <div className="relative flex items-center justify-center flex-1 w-full">
        
        {/* ORBIT CONTAINER (This is the base 320x320) */}
        <div className="relative w-[320px] h-[320px] flex items-center justify-center">

            {/* A. VIDEO CORE (Strictly centered, strictly circular) */}
            {/* z-10 - to be under buttons */}
            <div className="absolute w-[260px] h-[260px] rounded-full overflow-hidden border border-white/10 z-10 shadow-[0_0_50px_rgba(100,0,255,0.2)]">
                {/* Replace src with your video. object-cover will stretch it so there are no black bars */}
                {!videoError && (
                  <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover scale-110" // scale-110 to remove video edges
                    src="/assets/brain-video.mp4"
                    onLoadedData={() => setVideoLoaded(true)}
                    onError={() => setVideoError(true)}
                  />
                )}
                
                {/* CSS Fallback if video fails */}
                {videoError && (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative">
                    <div className="absolute inset-0 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-blue-900 animate-spin-slow opacity-60" style={{animationDuration: '10s'}} />
                    <div className="absolute inset-10 bg-black rounded-full blur-xl" />
                  </div>
                )}
                
                {/* Light vignette over video to add volume */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle, transparent 0%, transparent 50%, rgba(0,0,0,0.6) 100%)'
                  }}
                />
            </div>

            {/* B. BUTTONS (Moved outside the circle) */}
            {/* We use translate to move them away from center */}
            
            {/* 1. Top Left */}
            <div className="absolute top-0 left-0 z-20 transform -translate-x-2 -translate-y-2">
              <MenuButton icon={<MessageSquare size={20} />} label="Chat" />
            </div>

            {/* 2. Top Right */}
            <div className="absolute top-0 right-0 z-20 transform translate-x-2 -translate-y-2">
              <MenuButton icon={<ImageIcon size={20} />} label="Imagine" />
            </div>

            {/* 3. Bottom Left */}
            <div className="absolute bottom-0 left-0 z-20 transform -translate-x-2 translate-y-2">
              <MenuButton icon={<Music size={20} />} label="Audio" />
            </div>

            {/* 4. Bottom Right */}
            <div className="absolute bottom-0 right-0 z-20 transform translate-x-2 translate-y-2">
              <MenuButton icon={<Settings size={20} />} label="Config" />
            </div>

        </div>
      </div>

      {/* 3. FOOTER (Text and Microphone) */}
      <div className="w-full pb-10 flex flex-col items-center gap-6 z-30">
          <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50">Good Morning</h1>
              <p className="text-white/40 text-sm">System operational</p>
          </div>

          {/* Large microphone button */}
          <button className="w-[80vw] max-w-[300px] h-16 bg-[#1A1A1A] rounded-full flex items-center px-2 border border-white/10 relative overflow-hidden group">
              {/* Purple glow from left */}
              <div className="absolute left-0 top-0 w-20 h-full bg-purple-600/20 blur-xl" />
              
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg relative z-10">
                  <Mic size={22} className="text-black" />
              </div>
              <span className="flex-1 text-center text-sm font-medium text-white/80 z-10">Tap to speak...</span>
              <div className="w-12 flex justify-center gap-1 z-10">
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
                  <div className="w-1 h-1 bg-white/40 rounded-full" />
              </div>
          </button>
      </div>

    </div>
  );
};

export default FixedMobileInterface;

