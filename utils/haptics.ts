// Haptic feedback utility
export const triggerHaptic = (pattern: number | number[] = 10) => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    navigator.vibrate(pattern);
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

