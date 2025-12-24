// Haptic feedback utility
export const triggerHaptic = (pattern: number | number[] = 10) => {
  try {
    // Check if running in browser and vibration API is available
    if (typeof window === 'undefined') return;
    if (typeof navigator === 'undefined') return;
    
    // Check if vibration API is supported
    if ('vibrate' in navigator && typeof navigator.vibrate === 'function') {
      // Try to vibrate
      const result = navigator.vibrate(pattern);
      
      // Some browsers return false if vibration is not supported
      if (result === false) {
        console.warn('Vibration not supported or blocked');
      }
    } else {
      console.warn('Vibration API not available');
    }
  } catch (error) {
    // Silently fail if vibration is blocked or not supported
    console.warn('Vibration error:', error);
  }
};

// Different haptic patterns
export const hapticPatterns = {
  click: 10, // Short click
  success: [10, 50, 10], // Success pattern
  error: [20, 50, 20, 50, 20], // Error pattern
  thinking: [5, 10, 5, 10, 5], // Thinking pattern
  listening: [15, 30, 15], // Listening pattern
};

