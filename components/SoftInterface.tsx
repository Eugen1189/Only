"use client";

import "regenerator-runtime/runtime";
import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Mic, MessageSquare, Image as ImageIcon, Music, Settings, Menu, Sparkles } from "lucide-react";
import SpeechRecognition from "react-speech-recognition";
import { useSafeSpeechRecognition } from "@/components/SpeechRecognitionWrapper";
import { triggerHaptic, hapticPatterns } from "@/utils/haptics";
import { AudioVisualizer } from "@/utils/audioVisualizer";
import ParticleSystem from "@/components/ParticleSystem";
import GlowEffect from "@/components/GlowEffect";

type AppState = "idle" | "listening" | "processing" | "speaking";

interface SoftButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}

// Soft Glass button style with haptic feedback
const SoftButton = ({ icon, label, onClick }: SoftButtonProps) => (
  <button 
    className="flex flex-col items-center gap-2 group"
    onClick={() => {
      triggerHaptic(hapticPatterns.click);
      onClick?.();
    }}
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center shadow-lg active:scale-95 transition-all duration-300 group-hover:border-purple-400/30 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]">
      <div className="text-white/80 group-hover:text-white transition-colors">{icon}</div>
    </div>
    <span className="text-[10px] font-semibold tracking-wider text-purple-200/40 uppercase group-hover:text-purple-200/80 transition-colors">{label}</span>
  </button>
);

export default function SoftInterface() {
  // --- GLOW SPOT LOGIC (Fixed for Vercel) ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Use state to ensure code runs on client
  const [mounted, setMounted] = useState(false);
  const [appState, setAppState] = useState<AppState>("idle");
  const [audioVolume, setAudioVolume] = useState(0);
  const [transcript, setTranscript] = useState("");

  // Speech recognition - safe wrapper
  const {
    transcript: speechTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    mounted: speechMounted
  } = useSafeSpeechRecognition();

  const audioVisualizerRef = useRef<AudioVisualizer | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setMounted(true);
    
    // Check if browser APIs are available
    if (typeof window === "undefined") return;
    
    const handleMove = (e: PointerEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("pointermove", handleMove);
    return () => window.removeEventListener("pointermove", handleMove);
  }, [mouseX, mouseY]);

  // Update app state when listening starts
  useEffect(() => {
    if (listening) {
      setAppState("listening");
      triggerHaptic(hapticPatterns.listening);
    }
  }, [listening]);

  // Handle transition from listening to processing
  useEffect(() => {
    if (!listening && appState === "listening" && speechTranscript) {
      setAppState("processing");
      triggerHaptic(hapticPatterns.thinking);
      // Simulate processing time
      const timer = setTimeout(() => {
        setAppState("idle");
        setTranscript(speechTranscript);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [listening, appState, speechTranscript]);

  // Audio visualization
  useEffect(() => {
    if (!mounted || !speechMounted || typeof navigator === "undefined" || !navigator.mediaDevices) return;
    
    if (appState === "listening" && browserSupportsSpeechRecognition) {
      navigator.mediaDevices.getUserMedia({ audio: true })
        .then((stream) => {
          const visualizer = new AudioVisualizer();
          visualizer.start(stream, (volume) => {
            setAudioVolume(volume);
          });
          audioVisualizerRef.current = visualizer;
        })
        .catch((error) => {
          console.error("Error accessing microphone:", error);
        });
    } else {
      if (audioVisualizerRef.current) {
        audioVisualizerRef.current.stop();
        audioVisualizerRef.current = null;
      }
      setAudioVolume(0);
    }

    return () => {
      if (audioVisualizerRef.current) {
        audioVisualizerRef.current.stop();
      }
    };
  }, [appState, browserSupportsSpeechRecognition, mounted, speechMounted]);

  // Video playback rate based on state
  useEffect(() => {
    if (videoRef.current) {
      switch (appState) {
        case "processing":
          videoRef.current.playbackRate = 2.0;
          break;
        case "listening":
          videoRef.current.playbackRate = 1.5;
          break;
        default:
          videoRef.current.playbackRate = 1.0;
      }
    }
  }, [appState]);

  // Transform audio volume to sphere scale
  const sphereScale = useTransform(
    useMotionValue(audioVolume),
    [0, 1],
    [1, 1.15]
  );

  const [videoError, setVideoError] = useState(false);

  const handleMicClick = () => {
    if (!mounted || typeof window === "undefined") return;
    
    if (!browserSupportsSpeechRecognition) {
      alert("Speech recognition is not supported in your browser. Please use Chrome or Edge.");
      return;
    }

    try {
      if (listening) {
        SpeechRecognition.stopListening();
        triggerHaptic(hapticPatterns.success);
      } else {
        resetTranscript();
        SpeechRecognition.startListening({ continuous: true });
        triggerHaptic(hapticPatterns.listening);
      }
    } catch (error) {
      console.error("Error with speech recognition:", error);
    }
  };

  // Get sphere color based on state
  const getSphereColor = () => {
    switch (appState) {
      case "listening":
        return "rgba(239, 68, 68, 0.3)"; // Red
      case "processing":
        return "rgba(139, 92, 246, 0.4)"; // Purple
      case "speaking":
        return "rgba(59, 130, 246, 0.3)"; // Blue
      default:
        return "rgba(139, 92, 246, 0.15)"; // Default purple
    }
  };

  return (
    <div className="relative w-full h-[100dvh] bg-gradient-to-b from-[#1e293b] via-[#0f172a] to-[#020617] text-white overflow-hidden flex flex-col items-center justify-between font-sans selection:bg-purple-300/30">
      
      {/* GLOW EFFECT - Must be first, z-[1] to be above background but below content */}
      <GlowEffect />

      {/* ATMOSPHERE (Aurora) - Static background spots - z-0 */}
      <div className="absolute top-[-10%] left-[-20%] w-[400px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[300px] h-[300px] bg-blue-500/20 blur-[100px] rounded-full pointer-events-none z-0" />
      
      {/* NOISE (Grain) - z-0 */}
      <div 
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay z-0"
        style={{ 
          backgroundImage: 'url("https://grainy-gradients.vercel.app/noise.svg")',
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px'
        }}
      />

      {/* PARTICLE SYSTEM - z-5 */}
      {mounted && <ParticleSystem mouseX={mouseX} mouseY={mouseY} />}

      {/* HEADER - z-20 */}
      <header className="relative w-full p-6 flex justify-between items-center z-20">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-white/10 rounded-full backdrop-blur-md shadow-sm border border-white/20">
             <Sparkles size={14} className="text-purple-200" />
          </div>
          <span className="font-semibold tracking-wide text-sm text-purple-100/80">LEGALMIND</span>
        </div>
        <button 
          className="p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md border border-white/20 transition-colors"
          onClick={() => triggerHaptic(hapticPatterns.click)}
        >
          <Menu size={20} className="text-white/90" />
        </button>
      </header>

      {/* MAIN CONTENT - z-10 */}
      <div className="relative flex items-center justify-center flex-1 w-full z-10">
        <div className="relative w-[340px] h-[340px] flex items-center justify-center">

            {/* VIDEO CORE with state-based styling */}
            <motion.div 
              className="absolute w-[260px] h-[260px] rounded-full overflow-hidden border border-white/20 z-10 ring-1 ring-white/10"
              style={{
                scale: sphereScale,
                boxShadow: `0 0 60px ${getSphereColor()}`,
              }}
            >
                {!videoError && (
                  <video 
                    ref={videoRef}
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover scale-110 opacity-90 mix-blend-screen"
                    onError={() => setVideoError(true)}
                  >
                    {/* Try local video first */}
                    <source src="/assets/brain-video.mp4" type="video/mp4" />
                    {/* Fallback to public AI-themed video */}
                    <source src="https://videos.pexels.com/video-files/3045163/3045163-uhd_2560_1440_30fps.mp4" type="video/mp4" />
                  </video>
                )}
                
                {videoError && (
                  <motion.div 
                    className="w-full h-full bg-gradient-to-br from-purple-900/40 to-indigo-900/40 relative overflow-hidden"
                    animate={{
                      scale: [1, 1.02, 1],
                      rotate: [0, 2, -2, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-[conic-gradient(at_center,_var(--tw-gradient-stops))] from-purple-900 via-transparent to-blue-900 animate-spin-slow opacity-40" style={{animationDuration: '10s'}} />
                    
                    {/* Central glowing orb */}
                    <div className="absolute inset-10 bg-gradient-to-br from-purple-500/30 to-blue-500/30 rounded-full blur-2xl animate-pulse" />
                    
                    {/* Inner sphere with depth */}
                    <div className="absolute inset-16 bg-gradient-to-tr from-purple-600/20 via-transparent to-blue-600/20 rounded-full blur-xl" />
                    
                    {/* Shimmer effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                      animate={{
                        x: ['-100%', '100%']
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    {/* Particle dots */}
                    <div className="absolute inset-0">
                      {[...Array(20)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white/30 rounded-full"
                          style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                          }}
                          animate={{
                            opacity: [0.3, 0.8, 0.3],
                            scale: [1, 1.5, 1],
                          }}
                          transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                          }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'radial-gradient(circle, transparent 0%, transparent 50%, rgba(15, 23, 42, 0.9) 100%)'
                  }}
                />
            </motion.div>

            {/* TRANSCRIPT OVERLAY */}
            {transcript && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-[-60px] left-1/2 -translate-x-1/2 z-30 bg-black/60 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 max-w-[280px] text-center"
              >
                <p className="text-sm text-white/90">{transcript}</p>
              </motion.div>
            )}

            {/* STATE INDICATOR */}
            {appState !== "idle" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 z-30"
              >
                <span className="text-xs text-purple-200/60 uppercase tracking-wider">
                  {appState === "listening" && "Listening..."}
                  {appState === "processing" && "Processing..."}
                  {appState === "speaking" && "Speaking..."}
                </span>
              </motion.div>
            )}

            {/* BUTTONS */}
            <div className="absolute top-0 left-0 z-20 transform -translate-x-2 -translate-y-2">
              <SoftButton icon={<MessageSquare size={20} />} label="Chat" />
            </div>
            <div className="absolute top-0 right-0 z-20 transform translate-x-2 -translate-y-2">
              <SoftButton icon={<ImageIcon size={20} />} label="Imagine" />
            </div>
            <div className="absolute bottom-0 left-0 z-20 transform -translate-x-2 translate-y-2">
              <SoftButton icon={<Music size={20} />} label="Audio" />
            </div>
            <div className="absolute bottom-0 right-0 z-20 transform translate-x-2 translate-y-2">
              <SoftButton icon={<Settings size={20} />} label="Config" />
            </div>
        </div>
      </div>

      {/* FOOTER - z-20 */}
      <div className="relative w-full pb-10 flex flex-col items-center gap-6 z-20 px-6">
          <div className="text-center space-y-1">
              <h1 className="text-2xl font-semibold text-white/90">Good Morning</h1>
              <p className="text-purple-200/50 text-sm">
                {appState === "idle" && "System ready for interaction"}
                {appState === "listening" && "Listening to you..."}
                {appState === "processing" && "Processing your request..."}
                {appState === "speaking" && "AI is responding..."}
              </p>
          </div>

          {/* Microphone button */}
          <button 
            className={`w-full max-w-sm h-16 rounded-[2rem] p-[1px] shadow-[0_4px_20px_rgba(0,0,0,0.2)] active:scale-95 transition-transform ${
              listening 
                ? "bg-gradient-to-r from-red-400/40 to-pink-400/40" 
                : "bg-gradient-to-r from-purple-400/30 to-blue-400/30"
            }`}
            onClick={handleMicClick}
          >
              <div className="w-full h-full rounded-[2rem] bg-[#1e293b]/60 backdrop-blur-xl flex items-center px-4 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-white/5 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500" />
                  
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                    listening 
                      ? "bg-gradient-to-br from-red-500 to-pink-600 animate-pulse" 
                      : "bg-gradient-to-br from-purple-500 to-indigo-600"
                  }`}>
                      <Mic size={18} className="text-white" />
                  </div>
                  <span className="flex-1 text-center text-sm font-medium text-white/90">
                    {listening ? "Listening..." : "Tap to speak..."}
                  </span>
                  <div className="w-10 flex justify-center gap-1 opacity-50">
                      <div className={`w-1 h-1 bg-white rounded-full ${listening ? "animate-pulse" : ""}`} style={{ animationDelay: '0ms' }} />
                      <div className={`w-1 h-1 bg-white rounded-full ${listening ? "animate-pulse" : ""}`} style={{ animationDelay: '100ms' }} />
                  </div>
              </div>
          </button>
      </div>

    </div>
  );
}
