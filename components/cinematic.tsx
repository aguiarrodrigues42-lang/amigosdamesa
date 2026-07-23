"use client"

import { useEffect, useRef, useState } from "react"

/* ──────────────────────────────────────────────────────────
   CinematicBackground
   Layered atmosphere: dark gradient + stadium silhouette glow +
   volumetric light beams + drifting particles.
   Purely decorative, pointer-events-none, GPU-friendly.
   ────────────────────────────────────────────────────────── */
export function CinematicBackground({
  variant = "green",
  beams = true,
  particles = true,
  className = "",
}: {
  variant?: "green" | "gold" | "blue" | "mixed"
  beams?: boolean
  particles?: boolean
  className?: string
}) {
  const glow =
    variant === "gold"
      ? "oklch(0.82 0.16 88 / 0.10)"
      : variant === "blue"
        ? "oklch(0.32 0.13 264 / 0.16)"
        : variant === "mixed"
          ? "oklch(0.56 0.16 152 / 0.10)"
          : "oklch(0.56 0.16 152 / 0.12)"

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {/* Layer 1 — deep cinematic gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.18_0.01_240)_0%,transparent_60%)]" />

      {/* Layer 2 — ambient color glow */}
      <div
        className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse 70% 50% at 50% 0%, ${glow} 0%, transparent 70%)` }}
      />

      {/* Layer 3 — volumetric light beams */}
      {beams && (
        <>
          <div
            className="absolute -top-40 left-[12%] h-[120%] w-40 origin-top rotate-[14deg] blur-2xl animate-beam-sway"
            style={{ background: "linear-gradient(to bottom, oklch(0.85 0.16 90 / 0.16), transparent 70%)" }}
          />
          <div
            className="absolute -top-40 right-[14%] h-[120%] w-44 origin-top -rotate-[12deg] blur-2xl animate-beam-sway"
            style={{ background: "linear-gradient(to bottom, oklch(0.56 0.16 152 / 0.14), transparent 70%)", animationDelay: "3s" }}
          />
        </>
      )}

      {/* Layer 4 — thin stadium architecture silhouette (subtle) */}
      <div
        className="absolute bottom-0 left-0 right-0 h-24 opacity-[0.05]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, oklch(1 0 0) 0 2px, transparent 2px 26px)",
          maskImage: "linear-gradient(to top, black, transparent)",
          WebkitMaskImage: "linear-gradient(to top, black, transparent)",
        }}
      />

      {/* Layer 5 — drifting atmospheric particles */}
      {particles && <Particles />}

      {/* fabric/stadium micro-texture */}
      <div className="absolute inset-0 texture-fabric opacity-[0.4]" />
    </div>
  )
}

function Particles() {
  const [dots, setDots] = useState<{ left: number; delay: number; dur: number; size: number }[]>([])
  useEffect(() => {
    setDots(
      Array.from({ length: 18 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 8,
        dur: 9 + Math.random() * 8,
        size: 1 + Math.random() * 2,
      }))
    )
  }, [])
  return (
    <div className="absolute inset-0">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold/40"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animation: `particle-drift ${d.dur}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   FlagsBanner — realistic hanging Brazilian celebration flags
   using the generated fabric image, with a gentle wave.
   ────────────────────────────────────────────────────────── */
export function FlagsBanner({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none select-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/wc-flags.png"
        alt=""
        className="w-full h-auto object-cover object-top animate-flag-wave"
        style={{ maskImage: "linear-gradient(to bottom, black 60%, transparent)", WebkitMaskImage: "linear-gradient(to bottom, black 60%, transparent)" }}
      />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   SectionDivider — cinematic light streak + Brazil tri-band
   ────────────────────────────────────────────────────────── */
export function SectionDivider() {
  return (
    <div aria-hidden className="relative h-px w-full">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute left-1/2 top-0 h-px w-24 -translate-x-1/2 brazil-band opacity-70" />
    </div>
  )
}

/* ──────────────────────────────────────────────────────────
   useReveal — IntersectionObserver reveal hook
   ────────────────────────────────────────────────────────── */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.disconnect()
        }
      },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}
