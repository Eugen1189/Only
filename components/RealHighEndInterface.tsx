"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mic, Sparkles, MessageSquare, Image, Music, Settings } from "lucide-react";

interface OrbitalButtonProps {
  icon: React.ReactNode;
  label: string;
  position: string;
  delay: number;
}

// Orbital button component
const OrbitalButton = ({ icon, label, position, delay }: OrbitalButtonProps) => (
  <motion.button
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 0.5 + delay, type: "spring", stiffness: 200 }}
    className={`absolute ${position} group`}
  >
    <div className="relative">
      <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-2xl group-active:scale-95 transition-all duration-300 group-hover:border-white/30 group-hover:bg-white/10">
        <div className="text-white/70 group-hover:text-white transition-colors">{icon}</div>
      </div>
      {/* Label appears on hover */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-[10px] uppercase font-bold tracking-widest text-white/50">{label}</span>
      </div>
    </div>
  </motion.button>
);

const RealHighEndInterface = () => {
  const [videoError, setVideoError] = React.useState(false);
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const [currentVideoSrc, setCurrentVideoSrc] = React.useState(0);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Video sources to try (in order)
  const videoSources = [
    '/assets/brain-video.mp4', // Local video (your custom video)
    'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4', // Fallback demo video
  ];

  return (
    <div className="relative w-full h-[100dvh] bg-black text-white overflow-hidden font-sans selection:bg-purple-500/30">
      
      {/* 1. BACKGROUND NOISE (Grain) - adds cinematic quality */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none z-0" 
        style={{ 
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* 2. ATMOSPHERIC LIGHT (Deep, not flat) */}
      <div className="absolute top-[-20%] left-[-10%] w-[150vw] h-[80vh] bg-purple-900/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[150vw] h-[80vh] bg-blue-900/10 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />

      {/* 3. HEADER */}
      <header className="absolute top-0 w-full p-6 z-30 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
             <Sparkles size={14} className="text-white/80" />
          </div>
          <span className="text-sm font-medium tracking-widest uppercase text-white/60">EonAI</span>
        </div>
      </header>

      {/* 4. CENTRAL CORE (REAL 3D / VIDEO) */}
      <main className="relative w-full h-full flex items-center justify-center z-10">
        
        {/* Sphere container */}
        <div className="relative w-[350px] h-[350px] md:w-[450px] md:h-[450px] flex items-center justify-center">
            
            {/* VIDEO BACKGROUND (Instead of CSS sphere) */}
            {/* Here we insert your video, mask it in a circle and blur the edges */}
            <div className="absolute inset-0 rounded-full overflow-hidden shadow-[0_0_100px_rgba(112,26,232,0.3)]">
                {/* Video element - tries local first, then fallback to demo video, then CSS */}
                {!videoError && (
                  <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className={`w-full h-full object-cover scale-150 opacity-90 transition-opacity duration-1000 ${videoLoaded ? 'opacity-90' : 'opacity-0'}`}
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
                
                {/* Animated CSS Fallback sphere (shows if video fails to load) */}
                {videoError && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.02, 1], 
                      rotate: [0, 2, -2, 0] 
                    }}
                    transition={{ 
                      duration: 8, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute inset-0"
                  >
                    {/* Animated gradient background */}
                    <motion.div
                      animate={{
                        background: [
                          'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.3) 50%, transparent 100%)',
                          'radial-gradient(circle, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 50%, transparent 100%)',
                          'radial-gradient(circle, rgba(139,92,246,0.4) 0%, rgba(59,130,246,0.3) 50%, transparent 100%)',
                        ]
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute inset-0 rounded-full"
                    />
                    <div className="absolute inset-0 bg-purple-600/30 blur-[40px] rounded-full animate-pulse" />
                    <div className="absolute inset-0 rounded-full border border-white/10 bg-gradient-to-br from-black/60 to-purple-900/40 backdrop-blur-md shadow-[inset_0_0_20px_rgba(255,255,255,0.1)] overflow-hidden flex items-center justify-center">
                      <motion.div 
                        animate={{
                          scale: [1, 1.1, 1],
                          opacity: [0.7, 0.9, 0.7]
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-24 h-24 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-xl mix-blend-screen" 
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Overlay to make video blend smoothly into black background */}
                <div 
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, transparent 0%, transparent 40%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.9) 100%)'
                  }}
                />
            </div>

            {/* Orbital buttons (over video) */}
            <OrbitalButton icon={<MessageSquare size={18} />} label="Chat" position="top-0 left-0" delay={0} />
            {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <OrbitalButton icon={<Image size={18} />} label="Imagine" position="top-0 right-0" delay={0.1} />
            <OrbitalButton icon={<Music size={18} />} label="Audio" position="bottom-10 left-4" delay={0.2} />
            <OrbitalButton icon={<Settings size={18} />} label="Config" position="bottom-10 right-4" delay={0.3} />

        </div>
      </main>

      {/* 5. BOTTOM PANEL (High-quality Glassmorphism) */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 w-full max-w-[90%] flex flex-col items-center gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-1"
          >
            <h2 className="text-2xl font-semibold text-white tracking-tight">Good Morning</h2>
            <p className="text-white/40 text-sm">System operational. Awaiting input.</p>
          </motion.div>

          {/* Main button */}
          <button className="group relative w-full max-w-[280px]">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-40 group-hover:opacity-60 transition duration-500" />
            <div className="relative h-14 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-between px-2 pr-6 overflow-hidden hover:bg-white/10 transition duration-300">
               <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Mic size={20} className="text-black" />
               </div>
               <span className="text-sm font-medium text-white/90">Tap to speak...</span>
               <div className="flex gap-1">
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                  <div className="w-1 h-1 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
               </div>
            </div>
          </button>
      </div>

    </div>
  );
};

export default RealHighEndInterface;

