import { getState } from './store'

let ctx: AudioContext | null = null
function tone(freqs: number[], dur = 0.09, type: OscillatorType = 'sine', vol = 0.08) {
  if (!getState().sound) return
  try {
    ctx ??= new AudioContext()
    const t0 = ctx.currentTime
    freqs.forEach((f, i) => {
      const o = ctx!.createOscillator()
      const g = ctx!.createGain()
      o.type = type
      o.frequency.value = f
      g.gain.setValueAtTime(vol, t0 + i * dur)
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + (i + 1) * dur + 0.05)
      o.connect(g).connect(ctx!.destination)
      o.start(t0 + i * dur)
      o.stop(t0 + (i + 1) * dur + 0.06)
    })
  } catch { /* sem áudio */ }
}
export const sfx = {
  ok: () => tone([660, 880], 0.08, 'triangle'),
  bad: () => tone([220, 180], 0.12, 'sawtooth', 0.04),
  win: () => tone([523, 659, 784, 1047], 0.1, 'triangle'),
  tap: () => tone([440], 0.03, 'sine', 0.03),
}
export const vibrate = (ms: number | number[]) => { try { navigator.vibrate?.(ms) } catch { /* */ } }
