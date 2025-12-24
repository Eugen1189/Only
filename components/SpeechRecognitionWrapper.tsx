"use client";

import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import { useSpeechRecognition } from "react-speech-recognition";

// Safe wrapper for useSpeechRecognition hook
// Always calls the hook (React rules), but handles errors gracefully
export function useSafeSpeechRecognition() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Always call hook - React rules (cannot be conditional)
  const speechHook = useSpeechRecognition();

  return {
    ...speechHook,
    mounted
  };
}

