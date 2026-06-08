"use client"
// Copa Brasil — decorative SVG objects (CSS-animated pseudo-3D).
// Self-contained inline SVGs, no external files/libraries.
import type { CSSProperties } from "react"
import { useEffect, useRef } from "react"

// Scroll-triggered entrance animation via IntersectionObserver.
// Returns a ref to attach to the card wrapper; adds `.copa-in` when visible.
export function useCopaEntrance<T extends HTMLElement>(enabled: boolean) {
  const ref = useRef<T>(null)
  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("copa-in")
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const target = entry.target as HTMLElement
            window.setTimeout(() => target.classList.add("copa-in"), 50)
            observer.unobserve(target)
          }
        })
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [enabled])
  return ref
}

type CopaSvgProps = {
  size?: number
  style?: CSSProperties
}

// SVG 1: Soccer Ball — Exames Intermediario, Prime Plus 6, Pegue e Monte 8, BIT Ultra 10
export function CopaSoccerBall({ size = 56, style }: CopaSvgProps) {
  return (
    <svg
      className="copa-3d-element"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ animation: "copaFloat 3s ease-in-out infinite", width: size, height: size, ...style }}
    >
      <defs>
        <radialGradient id="ballGrad" cx="35%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#111111" />
        </radialGradient>
        <radialGradient id="ballShine" cx="30%" cy="25%" r="40%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#ballGrad)" />
      <circle cx="32" cy="32" r="28" fill="url(#ballShine)" />
      <polygon points="32,14 38,20 36,28 28,28 26,20" fill="#111" opacity="0.85" />
      <polygon points="46,24 52,30 48,38 40,36 38,28" fill="#111" opacity="0.85" />
      <polygon points="44,44 38,50 30,48 30,40 38,36" fill="#111" opacity="0.85" />
      <polygon points="20,44 14,38 16,30 24,28 26,36" fill="#111" opacity="0.85" />
      <polygon points="18,24 26,20 28,28 22,34 14,30" fill="#111" opacity="0.85" />
      <line x1="32" y1="4" x2="32" y2="14" stroke="#F97316" strokeWidth="0.8" opacity="0.6" />
      <line x1="56" y1="24" x2="46" y2="24" stroke="#F97316" strokeWidth="0.8" opacity="0.6" />
      <line x1="48" y1="52" x2="44" y2="44" stroke="#F97316" strokeWidth="0.8" opacity="0.6" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="#F97316" strokeWidth="1.2" opacity="0.4" />
    </svg>
  )
}

// SVG 2: Trophy — Prime Plus 11, Titan PRO 20, Pegue e Monte 12
export function CopaTrophy({ size = 60, style }: CopaSvgProps) {
  return (
    <svg
      className="copa-3d-element"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{
        animation: "copaGoldShine 3s ease-in-out infinite",
        transformOrigin: "center",
        width: size,
        height: size,
        ...style,
      }}
    >
      <defs>
        <linearGradient id="trophyGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c8970a" />
          <stop offset="40%" stopColor="#F5C800" />
          <stop offset="70%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#8B6914" />
        </linearGradient>
        <linearGradient id="trophyShine" x1="0%" y1="0%" x2="60%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,220,0.5)" />
          <stop offset="100%" stopColor="rgba(255,255,220,0)" />
        </linearGradient>
      </defs>
      <rect x="22" y="52" width="20" height="5" rx="1" fill="url(#trophyGold)" />
      <rect x="18" y="56" width="28" height="4" rx="2" fill="url(#trophyGold)" />
      <rect x="28" y="44" width="8" height="10" fill="url(#trophyGold)" />
      <path d="M16 12 Q14 28 20 38 Q26 44 32 44 Q38 44 44 38 Q50 28 48 12 Z" fill="url(#trophyGold)" />
      <path
        d="M20 14 Q19 26 23 34 Q27 40 32 41"
        fill="none"
        stroke="rgba(255,255,200,0.4)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M16 14 Q8 14 8 22 Q8 30 16 30"
        fill="none"
        stroke="url(#trophyGold)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M48 14 Q56 14 56 22 Q56 30 48 30"
        fill="none"
        stroke="url(#trophyGold)"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <text x="32" y="32" textAnchor="middle" fontSize="14" fill="rgba(255,255,255,0.8)">
        {"\u2605"}
      </text>
      <path
        d="M16 12 Q14 28 20 38 Q26 44 32 44 Q38 44 44 38 Q50 28 48 12 Z"
        fill="url(#trophyShine)"
        opacity="0.5"
      />
    </svg>
  )
}

// SVG 3: Shield — Exames Iniciante, Titan PRO 10
export function CopaShield({ size = 52, style }: CopaSvgProps) {
  return (
    <svg
      className="copa-3d-element"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ animation: "copaFloat 4s ease-in-out infinite", width: size, height: size, ...style }}
    >
      <defs>
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#2a2a2a" />
        </linearGradient>
      </defs>
      <path
        d="M32 4 L54 14 L54 36 Q54 52 32 60 Q10 52 10 36 L10 14 Z"
        fill="url(#shieldGrad)"
        stroke="#F97316"
        strokeWidth="1.5"
      />
      <path d="M32 10 L50 18 L50 32 L32 32 Z" fill="#F97316" opacity="0.15" />
      <text
        x="32"
        y="38"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="22"
        fontWeight="900"
        fill="#F97316"
        opacity="0.9"
      >
        A
      </text>
      <line x1="22" y1="26" x2="42" y2="26" stroke="#F97316" strokeWidth="1" opacity="0.5" />
      <path
        d="M32 6 L46 14 L46 28"
        fill="none"
        stroke="rgba(255,255,255,0.1)"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  )
}

// SVG 4: Jersey #15 — Senior Intermediario 15
export function CopaJersey({ size = 60, style }: CopaSvgProps) {
  return (
    <svg
      className="copa-3d-element"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ animation: "copaFloat 2.8s ease-in-out infinite", width: size, height: size, ...style }}
    >
      <defs>
        <linearGradient id="jerseyGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#006B2B" />
          <stop offset="100%" stopColor="#004d1f" />
        </linearGradient>
      </defs>
      <path
        d="M20 20 L10 28 L16 32 L16 56 L48 56 L48 32 L54 28 L44 20 Q40 16 32 16 Q24 16 20 20 Z"
        fill="url(#jerseyGreen)"
      />
      <path d="M26 18 Q32 14 38 18 Q36 22 32 22 Q28 22 26 18 Z" fill="#004d1f" />
      <line x1="10" y1="28" x2="16" y2="32" stroke="#F5C800" strokeWidth="2" />
      <line x1="54" y1="28" x2="48" y2="32" stroke="#F5C800" strokeWidth="2" />
      <line x1="16" y1="56" x2="48" y2="56" stroke="#F5C800" strokeWidth="2" />
      <text
        x="32"
        y="44"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="18"
        fontWeight="900"
        fill="#F5C800"
      >
        15
      </text>
      <path
        d="M24 22 Q22 32 22 42"
        fill="none"
        stroke="rgba(255,255,255,0.12)"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  )
}

// SVG 5: BTC Coin — BIT Ultra 15
export function CopaBtcCoin({ size = 60, style }: CopaSvgProps) {
  return (
    <svg
      className="copa-3d-element"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{
        animation: "copaRotateY 4s linear infinite",
        transformStyle: "preserve-3d",
        width: size,
        height: size,
        ...style,
      }}
    >
      <defs>
        <radialGradient id="coinGold" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#F5C800" />
          <stop offset="60%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#8B6914" />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="url(#coinGold)" />
      <circle cx="32" cy="32" r="28" fill="none" stroke="#8B6914" strokeWidth="3" />
      <circle cx="32" cy="32" r="22" fill="none" stroke="rgba(139,105,20,0.5)" strokeWidth="1" />
      <text
        x="32"
        y="40"
        textAnchor="middle"
        fontFamily="Arial Black, sans-serif"
        fontSize="26"
        fontWeight="900"
        fill="rgba(139,105,20,0.9)"
      >
        {"\u20BF"}
      </text>
      <path
        d="M44 18 L52 22 L52 30 Q52 36 44 40 Q36 36 36 30 L36 22 Z"
        fill="#009C3B"
        opacity="0.7"
      />
      <text x="44" y="33" textAnchor="middle" fontSize="7" fill="white" fontWeight="bold">
        COPA
      </text>
      <path
        d="M18 20 Q22 16 28 18"
        fill="none"
        stroke="rgba(255,255,200,0.5)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

// SVG 6: Isometric Field — Senior Iniciante 7
export function CopaField({ size = 56, style }: CopaSvgProps) {
  return (
    <svg
      className="copa-3d-element"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      style={{ animation: "copaFloat 5s ease-in-out infinite", width: size, height: size, ...style }}
    >
      <defs>
        <linearGradient id="fieldGreen" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0d2a0d" />
          <stop offset="100%" stopColor="#071407" />
        </linearGradient>
      </defs>
      <polygon points="32,4 60,20 32,36 4,20" fill="url(#fieldGreen)" stroke="#1a4d1a" strokeWidth="1" />
      <line x1="32" y1="4" x2="32" y2="36" stroke="rgba(255,255,255,0.2)" strokeWidth="0.8" />
      <ellipse
        cx="32"
        cy="20"
        rx="10"
        ry="6"
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="0.8"
        transform="skewX(-20)"
      />
      <circle cx="32" cy="20" r="2" fill="#F97316" opacity="0.8" />
      <polygon points="32,4 60,20 32,36 4,20" fill="rgba(255,255,255,0.04)" />
    </svg>
  )
}

/* ============================================================
   Copa configuration per priority card + shared renderers
   ============================================================ */

export type CopaSvgVariant = "ball" | "trophy" | "shield" | "jersey" | "coin" | "field"

export interface CopaConfig {
  badge: string
  svg: CopaSvgVariant
  svgSize?: number
  svgStyle?: CSSProperties
  microCopy: string
  featured?: boolean
  bodyAccent?: boolean
  shimmer?: boolean
  shimmerText?: string
  highlightBullet?: boolean
  delay?: 0 | 1
}

// Keyed by `${category}:${planName}`
export const copaConfigMap: Record<string, CopaConfig> = {
  // EXAMES
  "exames:PLANO INICIANTE": {
    badge: "\u{1F1E7}\u{1F1F7} EDI\u00C7\u00C3O COPA",
    svg: "shield",
    svgSize: 52,
    microCopy: '"Entre no time. Sua primeira posi\u00E7\u00E3o no mercado."',
    delay: 0,
  },
  "exames:PLANO INTERMEDI\u00C1RIO": {
    badge: "\u{1F3C6} MAIS ESCOLHIDO",
    svg: "ball",
    svgSize: 64,
    svgStyle: { animation: "copaRotateY 8s linear infinite" },
    microCopy: '"O time do meio de campo: equil\u00EDbrio e poder."',
    featured: true,
    shimmer: true,
    shimmerText: "\u{1F3C6} MAIS VENDIDO \u00B7 EDI\u00C7\u00C3O COPA",
    delay: 1,
  },

  // PRIME PLUS
  "prime-plus:PRIME PLUS 6": {
    badge: "\u26BD COPA 2026",
    svg: "ball",
    svgSize: 52,
    microCopy: '"Entre agora. Jogue pelo seu futuro."',
    delay: 0,
  },
  "prime-plus:PRIME PLUS 11": {
    badge: "\u{1F3C6} PRIME COPA",
    svg: "trophy",
    svgSize: 60,
    svgStyle: { animation: "copaFloat 2.5s ease-in-out infinite, copaGoldShine 3s ease-in-out infinite" },
    microCopy: '"11 contratos. A forma\u00E7\u00E3o perfeita para operar com consist\u00EAncia."',
    featured: true,
    bodyAccent: true,
    delay: 1,
  },

  // TITAN
  "titan:TITAN PRO 10": {
    badge: "\u26A1 TITAN COPA \u00B7 PRO 10",
    svg: "shield",
    svgSize: 56,
    microCopy: '"30 contratos. Poder de fogo para operar como um profissional."',
    delay: 0,
  },
  "titan:TITAN PRO 20": {
    badge: "\u{1F3C6} TITAN COPA \u00B7 ELITE 20",
    svg: "trophy",
    svgSize: 72,
    svgStyle: {
      animation: "copaRotateY 10s linear infinite",
      bottom: "-16px",
      right: "-16px",
    },
    microCopy: '"45 contratos. Para quem joga pra vencer."',
    featured: true,
    bodyAccent: true,
    delay: 1,
  },

  // SENIOR
  "senior:INICIANTE 7": {
    badge: "\u{1F7E2} SENIOR \u00B7 DIRETO NO JOGO",
    svg: "field",
    svgSize: 56,
    microCopy: '"Pule o banco de reservas. Aqui voc\u00EA j\u00E1 come\u00E7a jogando."',
    highlightBullet: true,
    delay: 0,
  },
  "senior:INTERMEDI\u00C1RIO 15": {
    badge: "\u{1F3C6} SENIOR COPA \u00B7 #15",
    svg: "jersey",
    svgSize: 64,
    microCopy: '"O campo \u00E9 seu desde o primeiro preg\u00E3o."',
    featured: true,
    bodyAccent: true,
    highlightBullet: true,
    delay: 1,
  },

  // PEGUE E MONTE
  "pegue-monte:PEGUE E MONTE 8": {
    badge: "\u{1F1E7}\u{1F1F7} COPA \u00B7 MONTE SEU TIME",
    svg: "ball",
    svgSize: 52,
    microCopy: '"Monte sua estrat\u00E9gia e entre em campo."',
    delay: 0,
  },
  "pegue-monte:PEGUE E MONTE 12": {
    badge: "\u{1F3C5} EQUIL\u00CDBRIO IDEAL",
    svg: "trophy",
    svgSize: 60,
    svgStyle: { animation: "copaFloat 3s ease-in-out infinite, copaGoldShine 2.5s ease-in-out infinite" },
    microCopy: '"12 contratos. O equil\u00EDbrio ideal entre capital e resultado."',
    featured: true,
    shimmer: true,
    shimmerText: "\u{1F3C6} MAIS VENDIDO \u00B7 COPA 2026",
    delay: 1,
  },

  // BIT
  "bit:ULTRA 10": {
    badge: "\u{1F1E7}\u{1F1F7} ULTRA COPA \u00B7 BTC",
    svg: "ball",
    svgSize: 52,
    microCopy: '"Bitcoin, WIN e WDO. Para os mais preparados."',
    delay: 0,
  },
  "bit:ULTRA 15": {
    badge: "\u{1F3C6} ULTRA COPA \u00B7 BTC+15",
    svg: "coin",
    svgSize: 64,
    microCopy: '"Tr\u00EAs mercados. Uma oportunidade Copa."',
    featured: true,
    bodyAccent: true,
    delay: 1,
  },
}

export function getCopaConfig(category: string, planName: string): CopaConfig | undefined {
  return copaConfigMap[`${category}:${planName}`]
}

// Renders the correct SVG variant with size/style overrides
export function CopaSvg({ variant, size, style }: { variant: CopaSvgVariant; size?: number; style?: CSSProperties }) {
  switch (variant) {
    case "ball":
      return <CopaSoccerBall size={size} style={style} />
    case "trophy":
      return <CopaTrophy size={size} style={style} />
    case "shield":
      return <CopaShield size={size} style={style} />
    case "jersey":
      return <CopaJersey size={size} style={style} />
    case "coin":
      return <CopaBtcCoin size={size} style={style} />
    case "field":
      return <CopaField size={size} style={style} />
    default:
      return null
  }
}

// Small badge pill shown top-left of priority cards
export function CopaBadge({ children }: { children: React.ReactNode }) {
  return <span className="copa-badge">{children}</span>
}
