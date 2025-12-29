"use client";

// Sonic Branding Utility using Web Audio API

class SoundManager {
    private context: AudioContext | null = null;
    private humOscillator: OscillatorNode | null = null;
    private humGain: GainNode | null = null;
    private isMuted: boolean = false;

    constructor() {
        if (typeof window !== "undefined") {
            // Initialize Audio Context on user interaction usually, but prepare it here
            const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContextClass) {
                this.context = new AudioContextClass();
            }
        }
    }

    private initContext() {
        if (!this.context) return;
        if (this.context.state === 'suspended') {
            this.context.resume();
        }
    }

    public playClick(type: 'soft' | 'sci-fi' = 'soft') {
        if (this.isMuted || !this.context) return;
        this.initContext();

        const osc = this.context.createOscillator();
        const gain = this.context.createGain();

        osc.connect(gain);
        gain.connect(this.context.destination);

        if (type === 'soft') {
            // Soft "Glass" Tick
            osc.type = 'sine';
            osc.frequency.setValueAtTime(800, this.context.currentTime);
            osc.frequency.exponentialRampToValueAtTime(1200, this.context.currentTime + 0.05);

            gain.gain.setValueAtTime(0.05, this.context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.05);

            osc.start();
            osc.stop(this.context.currentTime + 0.05);
        } else {
            // High-tech "Chirp"
            osc.type = 'sine';
            osc.frequency.setValueAtTime(2000, this.context.currentTime);
            osc.frequency.exponentialRampToValueAtTime(400, this.context.currentTime + 0.1);

            gain.gain.setValueAtTime(0.05, this.context.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.1);

            osc.start();
            osc.stop(this.context.currentTime + 0.1);
        }
    }

    public startHum() {
        if (this.isMuted || !this.context || this.humOscillator) return;
        this.initContext();

        // Create low-frequency drone
        this.humOscillator = this.context.createOscillator();
        this.humGain = this.context.createGain();

        this.humOscillator.type = 'sine';
        this.humOscillator.frequency.setValueAtTime(45, this.context.currentTime); // 45Hz Deep Hum

        // Add subtle LFO for pulsation
        const lfo = this.context.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.5, this.context.currentTime); // 0.5Hz Pulse

        const lfoGain = this.context.createGain();
        lfoGain.gain.setValueAtTime(20, this.context.currentTime); // Modulate gain slightly

        // Connect graph
        // (Simple version for stability: just main hum)
        this.humOscillator.connect(this.humGain);
        this.humGain.connect(this.context.destination);

        // Fade in
        this.humGain.gain.setValueAtTime(0, this.context.currentTime);
        this.humGain.gain.linearRampToValueAtTime(0.02, this.context.currentTime + 2); // Very quiet

        this.humOscillator.start();
    }

    public stopHum() {
        if (!this.humOscillator || !this.humGain || !this.context) return;

        // Fade out
        this.humGain.gain.setValueAtTime(this.humGain.gain.value, this.context.currentTime);
        this.humGain.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.5);

        const oldOsc = this.humOscillator;
        const oldGain = this.humGain;

        setTimeout(() => {
            oldOsc.stop();
            oldOsc.disconnect();
            oldGain.disconnect();
        }, 500);

        this.humOscillator = null;
        this.humGain = null;
    }
}

export const soundManager = new SoundManager();
