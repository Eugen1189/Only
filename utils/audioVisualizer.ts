// Audio visualization utility
export class AudioVisualizer {
  private audioContext: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private microphone: MediaStreamAudioSourceNode | null = null;
  private stream: MediaStream | null = null;
  private dataArray: Uint8Array | null = null;
  private animationFrame: number | null = null;

  async start(stream: MediaStream, onVolumeChange: (volume: number) => void) {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.microphone = this.audioContext.createMediaStreamSource(stream);
      this.microphone.connect(this.analyser);
      
      this.analyser.fftSize = 256;
      const bufferLength = this.analyser.frequencyBinCount;
      this.dataArray = new Uint8Array(bufferLength);
      this.stream = stream;

      const update = () => {
        if (!this.analyser || !this.dataArray) return;
        
        // Create a new array to avoid type issues
        const dataArray = new Uint8Array(bufferLength);
        this.analyser.getByteFrequencyData(dataArray);
        this.dataArray = dataArray;
        
        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalizedVolume = Math.min(average / 128, 1); // Normalize to 0-1
        
        onVolumeChange(normalizedVolume);
        
        this.animationFrame = requestAnimationFrame(update);
      };
      
      update();
    } catch (error) {
      console.error('Error starting audio visualization:', error);
    }
  }

  stop() {
    if (this.animationFrame) {
      cancelAnimationFrame(this.animationFrame);
      this.animationFrame = null;
    }
    
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
    
    this.analyser = null;
    this.microphone = null;
    this.dataArray = null;
  }
}

