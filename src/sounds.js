// Synthesized sound effects via Web Audio API — zero external dependencies

let ctx;

function getCtx() {
  if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
  return ctx;
}

function resumeCtx() {
  const c = getCtx();
  if (c.state === 'suspended') c.resume();
}

// ── Primitives ──

function playTone(freq, duration, type = 'sine', gainVal = 0.3, delay = 0) {
  const c = getCtx();
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(gainVal, c.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(c.currentTime + delay);
  osc.stop(c.currentTime + delay + duration);
}

function playNoise(duration, gainVal = 0.15, delay = 0) {
  const c = getCtx();
  const bufferSize = c.sampleRate * duration;
  const buffer = c.createBuffer(1, bufferSize, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  const source = c.createBufferSource();
  source.buffer = buffer;
  const gain = c.createGain();
  gain.gain.setValueAtTime(gainVal, c.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + delay + duration);
  const filter = c.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = 3000;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  source.start(c.currentTime + delay);
}

// ── Sound Effects ──

export function sfxTap() {
  resumeCtx();
  playTone(800, 0.08, 'sine', 0.15);
  playTone(1200, 0.06, 'sine', 0.1, 0.02);
}

export function sfxFlip() {
  resumeCtx();
  playNoise(0.12, 0.2);
  playTone(300, 0.15, 'triangle', 0.15);
  playTone(600, 0.1, 'triangle', 0.1, 0.05);
}

export function sfxRevealWord() {
  resumeCtx();
  playTone(523, 0.15, 'triangle', 0.2);        // C5
  playTone(659, 0.15, 'triangle', 0.2, 0.1);   // E5
  playTone(784, 0.3, 'triangle', 0.25, 0.2);   // G5
}

export function sfxRevealImposter() {
  resumeCtx();
  playTone(220, 0.3, 'sawtooth', 0.15);
  playTone(185, 0.4, 'sawtooth', 0.12, 0.15);
  playNoise(0.15, 0.1, 0.1);
}

export function sfxPass() {
  resumeCtx();
  playTone(440, 0.1, 'sine', 0.12);
  playTone(550, 0.1, 'sine', 0.12, 0.08);
}

export function sfxStartGame() {
  resumeCtx();
  playTone(523, 0.1, 'square', 0.12);          // C5
  playTone(659, 0.1, 'square', 0.12, 0.08);    // E5
  playTone(784, 0.1, 'square', 0.12, 0.16);    // G5
  playTone(1047, 0.25, 'square', 0.15, 0.24);  // C6
}

export function sfxResults() {
  resumeCtx();
  // Dramatic descending reveal
  playTone(784, 0.15, 'sawtooth', 0.1);         // G5
  playTone(659, 0.15, 'sawtooth', 0.1, 0.12);   // E5
  playTone(523, 0.15, 'sawtooth', 0.1, 0.24);   // C5
  // Then triumphant chord
  playTone(523, 0.5, 'triangle', 0.15, 0.45);   // C5
  playTone(659, 0.5, 'triangle', 0.12, 0.45);   // E5
  playTone(784, 0.5, 'triangle', 0.12, 0.45);   // G5
  playNoise(0.3, 0.08, 0.45);
}

export function sfxConfetti() {
  resumeCtx();
  for (let i = 0; i < 6; i++) {
    const freq = 1200 + Math.random() * 2000;
    playTone(freq, 0.06, 'sine', 0.06, i * 0.07);
  }
  playNoise(0.25, 0.06, 0.1);
}
