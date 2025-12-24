// Polyfill for Speech Recognition API
if (typeof window !== 'undefined') {
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
  if (!SpeechRecognition && typeof window !== 'undefined') {
    // Create a mock implementation for browsers that don't support it
    (window as any).SpeechRecognition = class MockSpeechRecognition {
      start() {}
      stop() {}
      abort() {}
      addEventListener() {}
      removeEventListener() {}
    };
  }
}

