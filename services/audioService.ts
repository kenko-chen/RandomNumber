class AudioService {
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;

  private getContext(): AudioContext {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.audioContext;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
  }

  /**
   * Plays a "tick" sound simulating a roulette or ticking clock
   */
  public playTick() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'square';
    osc.frequency.setValueAtTime(800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.06);
  }

  /**
   * Plays a celebratory bell/chime sound
   */
  public playSuccess() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();

    const playTone = (freq: number, type: OscillatorType, startTime: number, duration: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = type;
      osc.frequency.value = freq;

      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + duration);
    };

    const now = ctx.currentTime;
    // Major chord arpeggio
    playTone(523.25, 'sine', now, 1.5); // C5
    playTone(659.25, 'triangle', now + 0.1, 1.5); // E5
    playTone(783.99, 'sine', now + 0.2, 1.5); // G5
    playTone(1046.50, 'sine', now + 0.3, 2.0); // C6
  }
  
  /**
   * Continuous ringing sound for the 4 second duration
   */
  public playRinging(durationSeconds: number) {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (ctx.state === 'suspended') ctx.resume();
    
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    
    // Simulate a digital trill
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(600, ctx.currentTime);
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(800, ctx.currentTime);
    
    // Modulate frequency to sound like a ring
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 15; // Fast wobble
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 50;
    
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfoGain.connect(osc2.frequency);
    
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + durationSeconds - 0.1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + durationSeconds);
    
    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    
    const now = ctx.currentTime;
    osc1.start(now);
    osc2.start(now);
    lfo.start(now);
    
    osc1.stop(now + durationSeconds);
    osc2.stop(now + durationSeconds);
    lfo.stop(now + durationSeconds);
  }
}

export const audioService = new AudioService();
