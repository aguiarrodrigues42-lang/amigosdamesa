"use client"

/**
 * BIBLIOTECA VISUAL — EDIÇÃO ESPECIAL COPA
 * Todos os elementos são SVG premium (sem assets externos, sem Three.js).
 * Cores Copa usadas apenas como acento (~15% da interface).
 */

const GREEN = "#009c3b"
const GOLD = "#f5c800"
const BLUE = "#002776"

/* ──────────────────────────────────────────────
   CORDÃO DE BANDEIRINHAS
   Linha curva pendurada com bandeirinhas alternadas
   que balançam suavemente (efeito vento).
   ────────────────────────────────────────────── */
export function BuntingString({
  className = "",
  count = 14,
}: {
  className?: string
  count?: number
}) {
  const colors = [GREEN, GOLD, BLUE]
  const width = 1200
  const sag = 60
  // ponto médio da corda (curva suave)
  return (
    <div className={`pointer-events-none w-full overflow-hidden ${className}`} aria-hidden="true">
      <svg
        viewBox={`0 0 ${width} 120`}
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        {/* corda */}
        <path
          d={`M0 8 Q ${width / 2} ${sag} ${width} 8`}
          fill="none"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="2"
        />
        {Array.from({ length: count }).map((_, i) => {
          const t = (i + 0.5) / count
          const x = t * width
          // posição vertical na curva (parábola)
          const y = 8 + sag * 2 * t * (1 - t) * 2
          const color = colors[i % colors.length]
          return (
            <g
              key={i}
              className="animate-bunting"
              style={{
                transformBox: "fill-box",
                transformOrigin: "top center",
                animationDelay: `${(i % 5) * 0.18}s`,
              }}
            >
              {/* triângulo da bandeirinha */}
              <path
                d={`M${x - 16} ${y} L${x + 16} ${y} L${x} ${y + 36} Z`}
                fill={color}
              />
              {/* brilho sutil */}
              <path
                d={`M${x - 16} ${y} L${x} ${y} L${x} ${y + 36} Z`}
                fill="rgba(255,255,255,0.12)"
              />
              <circle cx={x} cy={y} r="2.5" fill="rgba(255,255,255,0.5)" />
            </g>
          )
        })}
      </svg>
    </div>
  )
}

/* ──────────────────────────────────────────────
   BOLA DE FUTEBOL 3D
   Esfera com gradiente radial + pentágonos.
   ────────────────────────────────────────────── */
export function SoccerBall({
  size = 64,
  className = "",
  spin = true,
}: {
  size?: number
  className?: string
  spin?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`${spin ? "animate-ball-spin" : ""} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ballShade" cx="38%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="55%" stopColor="#e9e9ee" />
          <stop offset="100%" stopColor="#9a9aa6" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#ballShade)" stroke="#2a2a30" strokeWidth="1.5" />
      {/* pentágono central */}
      <polygon
        points="50,30 64,40 59,57 41,57 36,40"
        fill="#15151a"
      />
      {/* pentágonos satélites (parciais) */}
      <polygon points="50,30 36,40 28,28 42,18" fill="#15151a" opacity="0.85" />
      <polygon points="50,30 64,40 72,28 58,18" fill="#15151a" opacity="0.85" />
      <polygon points="41,57 36,40 22,46 26,62" fill="#15151a" opacity="0.75" />
      <polygon points="59,57 64,40 78,46 74,62" fill="#15151a" opacity="0.75" />
      <polygon points="41,57 59,57 54,74 46,74" fill="#15151a" opacity="0.7" />
      {/* highlight especular */}
      <ellipse cx="38" cy="32" rx="12" ry="8" fill="rgba(255,255,255,0.55)" />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   TROFÉU DA COPA
   Dourado com reflexos metálicos e brilho.
   ────────────────────────────────────────────── */
export function Trophy({
  size = 48,
  className = "",
  glow = true,
}: {
  size?: number
  className?: string
  glow?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 80"
      className={`${glow ? "animate-trophy-glow" : ""} ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff3b0" />
          <stop offset="40%" stopColor={GOLD} />
          <stop offset="100%" stopColor="#b8860b" />
        </linearGradient>
      </defs>
      {/* taça superior */}
      <path
        d="M18 8 H46 V20 C46 32 40 40 32 40 C24 40 18 32 18 20 Z"
        fill="url(#goldGrad)"
        stroke="#8a6500"
        strokeWidth="1"
      />
      {/* alças */}
      <path d="M18 12 C8 12 8 26 18 26" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" />
      <path d="M46 12 C56 12 56 26 46 26" fill="none" stroke="url(#goldGrad)" strokeWidth="3.5" />
      {/* haste */}
      <rect x="29" y="40" width="6" height="12" fill="url(#goldGrad)" />
      {/* base */}
      <path d="M20 52 H44 L48 64 H16 Z" fill="url(#goldGrad)" stroke="#8a6500" strokeWidth="1" />
      <rect x="12" y="64" width="40" height="6" rx="1.5" fill="url(#goldGrad)" stroke="#8a6500" strokeWidth="1" />
      {/* reflexo metálico */}
      <path d="M24 10 V20 C24 28 27 34 31 35" fill="none" stroke="rgba(255,255,255,0.65)" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   ESCUDO DA SELEÇÃO (interpretação visual — não oficial)
   ────────────────────────────────────────────── */
export function SelecaoShield({
  size = 56,
  className = "",
}: {
  size?: number
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 72"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="shieldGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00b347" />
          <stop offset="100%" stopColor={GREEN} />
        </linearGradient>
      </defs>
      {/* corpo do escudo */}
      <path
        d="M32 2 L60 12 V36 C60 54 48 64 32 70 C16 64 4 54 4 36 V12 Z"
        fill="url(#shieldGreen)"
        stroke={GOLD}
        strokeWidth="2.5"
      />
      {/* losango amarelo */}
      <polygon points="32,16 50,37 32,58 14,37" fill={GOLD} />
      {/* círculo azul */}
      <circle cx="32" cy="37" r="11" fill={BLUE} />
      {/* estrela central */}
      <Star5 cx={32} cy={37} r={6} fill="#ffffff" />
    </svg>
  )
}

function Star5({ cx, cy, r, fill }: { cx: number; cy: number; r: number; fill: string }) {
  const pts: string[] = []
  for (let i = 0; i < 10; i++) {
    const ang = (Math.PI / 5) * i - Math.PI / 2
    const rad = i % 2 === 0 ? r : r * 0.42
    pts.push(`${cx + rad * Math.cos(ang)},${cy + rad * Math.sin(ang)}`)
  }
  return <polygon points={pts.join(" ")} fill={fill} />
}

/* Estrela dourada decorativa (cintilante) */
export function GoldStar({
  size = 16,
  className = "",
  twinkle = true,
}: {
  size?: number
  className?: string
  twinkle?: boolean
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={`${twinkle ? "animate-star-twinkle" : ""} ${className}`}
      aria-hidden="true"
    >
      <Star5 cx={12} cy={12} r={11} fill={GOLD} />
    </svg>
  )
}

/* ──────────────────────────────────────────────
   GRAMADO ISOMÉTRICO (faixa de fundo sutil)
   ────────────────────────────────────────────── */
export function PitchLines({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {/* linhas do campo em perspectiva */}
      <g stroke={GREEN} strokeWidth="1" fill="none" opacity="0.5">
        <line x1="200" y1="0" x2="200" y2="200" />
        <circle cx="200" cy="100" r="40" />
        <rect x="140" y="60" width="120" height="80" />
        <rect x="170" y="40" width="60" height="120" />
      </g>
    </svg>
  )
}
