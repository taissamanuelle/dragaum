export type Mood = 'hello' | 'happy' | 'sad' | 'thinking' | 'angry' | 'icon'

const alt: Record<Mood, string> = {
  hello: 'Dragaum acenando',
  happy: 'Dragaum comemorando',
  sad: 'Dragaum triste',
  thinking: 'Dragaum pensativo',
  angry: 'Dragaum bravo',
  icon: 'Dragaum',
}

export function Mascot({ mood, size = 140, className = '', decorative }: { mood: Mood; size?: number; className?: string; decorative?: boolean }) {
  return (
    <img
      src={`/mascot/${mood}.webp`}
      width={size}
      height={size}
      alt={decorative ? '' : alt[mood]}
      className={`mascot ${className}`}
      draggable={false}
      loading="eager"
    />
  )
}
