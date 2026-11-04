/** Placas de trânsito brasileiras simplificadas (SVG) */
const RED = '#d32f2f'
const YEL = '#f6c90e'
const BLK = '#111'

function Reg({ children, slash }: { children?: React.ReactNode; slash?: boolean }) {
  return (
    <>
      <circle cx="50" cy="50" r="46" fill="#fff" stroke={RED} strokeWidth="9" />
      {children}
      {slash && <line x1="20" y1="20" x2="80" y2="80" stroke={RED} strokeWidth="8" />}
    </>
  )
}

function Adv({ children }: { children?: React.ReactNode }) {
  return (
    <>
      <rect x="15" y="15" width="70" height="70" rx="6" transform="rotate(45 50 50)" fill={YEL} stroke={BLK} strokeWidth="4" />
      <rect x="20" y="20" width="60" height="60" rx="4" transform="rotate(45 50 50)" fill="none" stroke={BLK} strokeWidth="1.5" />
      {children}
    </>
  )
}

const Car = ({ x, y, fill = BLK }: { x: number; y: number; fill?: string }) => (
  <g transform={`translate(${x} ${y})`} fill={fill}>
    <rect x="0" y="8" width="20" height="9" rx="2" />
    <path d="M4 8 L7 2 H13 L16 8 Z" />
    <circle cx="5" cy="18" r="2.6" fill="#fff" stroke={fill} strokeWidth="1.5" />
    <circle cx="15" cy="18" r="2.6" fill="#fff" stroke={fill} strokeWidth="1.5" />
  </g>
)

const Person = ({ x, y, s = 1 }: { x: number; y: number; s?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill={BLK} stroke={BLK} strokeLinecap="round">
    <circle cx="0" cy="-14" r="4" stroke="none" />
    <line x1="0" y1="-9" x2="1" y2="4" strokeWidth="4" />
    <line x1="1" y1="4" x2="-5" y2="15" strokeWidth="3.5" />
    <line x1="1" y1="4" x2="7" y2="14" strokeWidth="3.5" />
    <line x1="0" y1="-6" x2="-7" y2="1" strokeWidth="3" />
    <line x1="0" y1="-6" x2="7" y2="0" strokeWidth="3" />
  </g>
)

const signs: Record<string, React.ReactNode> = {
  'R-1': (
    <>
      <polygon points="30,4 70,4 96,30 96,70 70,96 30,96 4,70 4,30" fill={RED} stroke="#fff" strokeWidth="3" />
      <text x="50" y="60" textAnchor="middle" fontSize="26" fontWeight="800" fill="#fff" fontFamily="Arial, sans-serif">PARE</text>
    </>
  ),
  'R-2': (
    <>
      <polygon points="6,10 94,10 50,92" fill={RED} />
      <polygon points="22,19 78,19 50,72" fill="#fff" />
    </>
  ),
  'R-3': (
    <>
      <circle cx="50" cy="50" r="46" fill={RED} />
      <rect x="18" y="42" width="64" height="16" fill="#fff" />
    </>
  ),
  'R-4a': (
    <Reg slash>
      <path d="M62 78 V45 H38" fill="none" stroke={BLK} strokeWidth="9" />
      <polygon points="24,45 42,32 42,58" fill={BLK} />
    </Reg>
  ),
  'R-4b': (
    <Reg slash>
      <path d="M38 78 V45 H62" fill="none" stroke={BLK} strokeWidth="9" />
      <polygon points="76,45 58,32 58,58" fill={BLK} />
    </Reg>
  ),
  'R-6a': (
    <Reg slash>
      <text x="50" y="66" textAnchor="middle" fontSize="46" fontWeight="800" fill={BLK} fontFamily="Arial, sans-serif">E</text>
    </Reg>
  ),
  'R-6b': (
    <Reg>
      <text x="50" y="66" textAnchor="middle" fontSize="46" fontWeight="800" fill={BLK} fontFamily="Arial, sans-serif">E</text>
    </Reg>
  ),
  'R-6c': (
    <Reg slash>
      <text x="50" y="66" textAnchor="middle" fontSize="46" fontWeight="800" fill={BLK} fontFamily="Arial, sans-serif">E</text>
      <line x1="80" y1="20" x2="20" y2="80" stroke={RED} strokeWidth="8" />
    </Reg>
  ),
  'R-7': (
    <Reg slash>
      <Car x={24} y={46} fill={RED} />
      <Car x={52} y={34} />
    </Reg>
  ),
  'R-19': (
    <Reg>
      <text x="50" y="62" textAnchor="middle" fontSize="36" fontWeight="800" fill={BLK} fontFamily="Arial, sans-serif">60</text>
      <text x="50" y="78" textAnchor="middle" fontSize="11" fontWeight="700" fill={BLK} fontFamily="Arial, sans-serif">km/h</text>
    </Reg>
  ),
  'A-1a': (
    <Adv>
      <path d="M58 76 V52 Q58 38 44 34" fill="none" stroke={BLK} strokeWidth="8" />
      <polygon points="32,32 48,22 48,44" fill={BLK} />
    </Adv>
  ),
  'A-12': (
    <Adv>
      <circle cx="50" cy="50" r="14" fill="none" stroke={BLK} strokeWidth="6" />
      <polygon points="62,34 70,46 56,46" fill={BLK} />
      <polygon points="38,66 30,54 44,54" fill={BLK} />
      <line x1="50" y1="64" x2="50" y2="80" stroke={BLK} strokeWidth="6" />
    </Adv>
  ),
  'A-14': (
    <Adv>
      <rect x="40" y="24" width="20" height="52" rx="5" fill={BLK} />
      <circle cx="50" cy="34" r="6" fill={RED} />
      <circle cx="50" cy="50" r="6" fill="#f59e0b" />
      <circle cx="50" cy="66" r="6" fill="#22c55e" />
    </Adv>
  ),
  'A-18': (
    <Adv>
      <path d="M24 62 H36 Q50 40 64 62 H76" fill="none" stroke={BLK} strokeWidth="6" />
    </Adv>
  ),
  'A-24': (
    <Adv>
      <Person x={46} y={52} s={1.05} />
      <path d="M54 54 L66 66 M60 70 h14" stroke={BLK} strokeWidth="4" />
      <path d="M58 60 l8 -3 l3 8 z" fill={BLK} />
    </Adv>
  ),
  'A-32b': (
    <Adv>
      <Person x={50} y={50} s={1.1} />
      <g fill={BLK}>
        <rect x="30" y="70" width="6" height="6" />
        <rect x="40" y="70" width="6" height="6" />
        <rect x="50" y="70" width="6" height="6" />
        <rect x="60" y="70" width="6" height="6" />
      </g>
    </Adv>
  ),
  'A-33b': (
    <Adv>
      <Person x={42} y={52} s={0.95} />
      <Person x={60} y={56} s={0.75} />
      <g fill={BLK}>
        <rect x="30" y="72" width="6" height="5" />
        <rect x="40" y="72" width="6" height="5" />
        <rect x="50" y="72" width="6" height="5" />
        <rect x="60" y="72" width="6" height="5" />
      </g>
    </Adv>
  ),
}

export function Placa({ code, size = 120 }: { code: string; size?: number }) {
  const s = signs[code]
  if (!s) return null
  return (
    <svg className="placa" width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={`Placa ${code}`}>
      {s}
    </svg>
  )
}

export const placaCodes = Object.keys(signs)
