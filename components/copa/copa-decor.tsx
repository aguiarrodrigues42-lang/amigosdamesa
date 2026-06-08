"use client"

import { BuntingString } from "./copa-elements"

/* Divisor de seção com cordão de bandeirinhas penduradas */
export function CopaDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full -mb-8 -mt-2 z-10 ${className}`} aria-hidden="true">
      <BuntingString className="h-20 md:h-24" count={16} />
    </div>
  )
}

/* Partículas flutuantes — luzes verdes e amarelas do estádio */
export function CopaParticles({ className = "" }: { className?: string }) {
  const particles = Array.from({ length: 18 }).map((_, i) => {
    const left = (i * 53) % 100
    const delay = (i % 9) * 0.7
    const duration = 5 + (i % 5)
    const size = 3 + (i % 4)
    const color = i % 3 === 0 ? "#f5c800" : i % 3 === 1 ? "#009c3b" : "#ffffff"
    return { left, delay, duration, size, color, id: i }
  })

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${p.size}px`,
            background: p.color,
            boxShadow: `0 0 ${p.size * 2}px ${p.color}`,
            opacity: 0,
            animation: `copa-particle ${p.duration}s ease-in ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
