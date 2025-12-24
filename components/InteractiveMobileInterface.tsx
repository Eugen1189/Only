"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mic, Sparkles, MessageSquare, Image, Music, Settings, Menu } from "lucide-react";

interface OrbitalButtonProps {
  icon: React.ReactNode;
  label: string;
  position: string;
  delay: number;
}

// Orbital button component
const OrbitalButton = ({ icon, label, position, delay }: OrbitalButtonProps) => (
  <motion.button
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    transition={{ delay: 0.5 + delay, type: "spring" }}
    className={`absolute ${position} group z-40`}
  >
    <div className="flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-full bg-[#111]/80 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-2xl group-active:scale-95 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/30 overflow-hidden relative">
        {/* Inner gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="text-white/70 group-hover:text-white relative z-10">{icon}</div>
      </div>
      <span className="text-[10px] font-bold tracking-widest text-white/30 uppercase group-hover:text-white/60 transition">{label}</span>
    </div>
  </motion.button>
);

const InteractiveMobileInterface = () => {
  // 1. Cursor/finger position state
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 2. Spring animation for smoothness (Spring Physics)
  // This makes the light movement "soft", not jerky
  const springConfig = { damping: 25, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Function to update coordinates on touch/move
  function handlePointerMove({ clientX, clientY }: { clientX: number; clientY: number }) {
    mouseX.set(clientX);
    mouseY.set(clientY);
  }

  // Center the light on load
  useEffect(() => {
    if (typeof window !== "undefined") {
      mouseX.set(window.innerWidth / 2);
      mouseY.set(window.innerHeight / 2);
    }
  }, [mouseX, mouseY]);

  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Video sources to try (in order)
  const videoSources = [
    "/assets/brain-video.mp4", // Local video (your custom video)
  ];

  return (
    <div 
      className="relative w-full h-[100dvh] bg-[#050505] text-white overflow-hidden font-sans selection:bg-purple-500/30 touch-none"
      onPointerMove={handlePointerMove} // Listen to both mouse and finger movement
    >
      
      {/* --- GLOW EFFECT --- */}
      {/* This element follows the finger */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%", // Center relative to cursor
          translateY: "-50%"
        }}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full pointer-events-none z-10 opacity-60 mix-blend-screen"
      >
        {/* Gradient of the spot itself */}
        <div 
          className="w-full h-full blur-[60px]"
          style={{
            background: "radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%)"
          }}
        />
      </motion.div>

      {/* --- BACKGROUND NOISE --- */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0"
        style={{
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* --- HEADER --- */}
      <header className="absolute top-0 w-full p-6 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-lg">
             <Sparkles size={14} className="text-purple-300" />
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-white/80">EonAI</span>
        </div>
        <button className="p-2 bg-white/5 rounded-full backdrop-blur-md border border-white/10">
          <Menu size={20} className="text-white/70" />
        </button>
      </header>

      {/* --- CENTRAL SCENE --- */}
      <main className="relative w-full h-full flex flex-col items-center justify-center z-20 pointer-events-none"> 
        {/* pointer-events-none on container so clicks pass through to buttons */}
        
        {/* SPHERE CONTAINER */}
        {/* Increased container size to give buttons more space */}
        <div className="relative w-[380px] h-[380px] flex items-center justify-center pointer-events-auto">
            
            {/* ATMOSPHERIC GLOW BEHIND SPHERE (Backlight) */}
            <div className="absolute inset-0 bg-purple-600/20 blur-[60px] rounded-full scale-75 animate-pulse" />

            {/* VIDEO CORE */}
            <div className="absolute inset-0 flex items-center justify-center">
                {/* Wrap video in mask to round edges if blend-mode isn't perfect */}
                <div className="w-[280px] h-[280px] rounded-full overflow-hidden relative z-10">
                    
                    {/* IMPORTANT: mix-blend-screen makes black background transparent */}
                    {!videoError && (
                      <video 
                        ref={videoRef}
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className={`w-full h-full object-cover mix-blend-screen scale-125 transition-opacity duration-1000 ${videoLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={videoSources[currentVideoSrc]}
                        onLoadedData={() => setVideoLoaded(true)}
                        onError={() => {
                          // Try next video source
                          if (currentVideoSrc < videoSources.length - 1) {
                            setCurrentVideoSrc(currentVideoSrc + 1);
                            if (videoRef.current) {
                              videoRef.current.load();
                            }
                          } else {
                            // All video sources failed, show CSS fallback
                            setVideoError(true);
                          }
                        }}
                      />
                    )}
                    
                    {/* CSS Fallback sphere (shows if video fails to load) */}
                    {videoError && (
                      <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black relative">
                         {/* This imitates your video - in real code this would be <video> tag */}
                         <div className="absolute inset-0 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-purple-900 via-black to-blue-900 animate-spin-slow opacity-60" style={{animationDuration: '10s'}} />
                         <div className="absolute inset-10 bg-black rounded-full blur-xl" />
                      </div>
                    )}
                    
                    {/* Inner shadow for 3D effect (Vignette) */}
                    {/* This gradient makes sphere edges darker, creating illusion of a ball */}
                    <div 
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{
                        background: 'radial-gradient(circle, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)'
                      }}
                    />
                </div>
                
                {/* Glass highlight (Reflection) - adds realism */}
                <div className="absolute inset-0 w-[280px] h-[280px] rounded-full bg-gradient-to-tr from-white/20 to-transparent opacity-30 pointer-events-none z-20" />
            </div>

            {/* ORBITAL BUTTONS */}
            {/* We move them outside the small circle (w-280), attaching to large container (w-380) */}
            {/* Changed position to more distant points */}
            <OrbitalButton icon={<MessageSquare size={20} />} label="Chat" position="top-4 left-4" delay={0} />
            <OrbitalButton icon={<Image size={20} />} label="Imagine" position="top-4 right-4" delay={0.1} />
            <OrbitalButton icon={<Music size={20} />} label="Audio" position="bottom-12 left-6" delay={0.2} />
            <OrbitalButton icon={<Settings size={20} />} label="Config" position="bottom-12 right-6" delay={0.3} />

        </div>
        
        {/* Text slightly lower */}
        <div className="mt-8 text-center z-30 pointer-events-auto">
             <h2 className="text-3xl font-bold text-white drop-shadow-md">
               Good Morning
             </h2>
             <p className="text-white/40 text-sm mt-2 font-medium tracking-wide">
               System Active. Touch anywhere.
             </p>
        </div>

      </main>

      {/* --- BOTTOM BUTTON --- */}
      <div className="absolute bottom-10 w-full flex justify-center z-40 pointer-events-auto">
        <button className="group relative w-20 h-20 flex items-center justify-center">
             {/* Waves around button */}
             <div className="absolute inset-0 bg-purple-600 rounded-full opacity-20 animate-ping" />
             <div className="absolute inset-2 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center border border-white/20 transition group-active:scale-90">
                <Mic size={24} className="text-white" />
             </div>
        </button>
      </div>

    </div>
  );
};

export default InteractiveMobileInterface;

