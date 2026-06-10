"use client"

import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import {
  ArrowRight,
  Trophy,
  Medal,
  Flame,
  MapPin,
  CalendarDays,
  Megaphone,
  Sparkles,
  ShieldCheck,
  Clock,
} from "lucide-react"

/* ============================================================
   LINKS — edite as URLs aqui (todas abrem em nova aba)
   ============================================================ */
const LINKS = {
  desconto70: "{{URL_DESCONTO_70}}",
  faseClassificatoria: "{{URL_FASE_CLASSIFICATORIA}}",
  grandeFinal: "{{URL_GRANDE_FINAL}}",
  regulamento: "{{URL_REGULAMENTO}}",
  rankingFallbackPalpite: "{{URL_PALPITE}}",
} as const

/* ============================================================
   TIPOS
   ============================================================ */
interface Team {
  nome: string
  sigla: string
  flagUrl?: string
}

interface Match {
  id: string
  grupo: string
  kickoffISO: string
  bettingClosesISO: string
  home: Team
  away: Team
  estadio: string
  palpites: number
  palpiteUrl: string
}

/* Preparado para ranking futuro (ainda não implementado) */
export interface RankingEntry {
  position: number
  player: string
  points: number
  prizeBRL?: number
}

/* ============================================================
   FALLBACK (programação offline)
   ============================================================ */
const FALLBACK_MATCHES: Match[] = [
  {
    id: "mex-rsa-grupoA",
    grupo: "Grupo A",
    kickoffISO: "2026-06-10T16:00:00-03:00",
    bettingClosesISO: "2026-06-10T15:50:00-03:00",
    home: { nome: "México", sigla: "MEX" },
    away: { nome: "África do Sul", sigla: "RSA" },
    estadio: "Estádio Azteca",
    palpites: 602,
    palpiteUrl: LINKS.rankingFallbackPalpite,
  },
  {
    id: "kor-cze-grupoA",
    grupo: "Grupo A",
    kickoffISO: "2026-06-10T23:00:00-03:00",
    bettingClosesISO: "2026-06-10T22:50:00-03:00",
    home: { nome: "Coreia do Sul", sigla: "KOR" },
    away: { nome: "Rep. Tcheca", sigla: "CZE" },
    estadio: "Estádio Akron",
    palpites: 547,
    palpiteUrl: LINKS.rankingFallbackPalpite,
  },
  {
    id: "can-bih-grupoB",
    grupo: "Grupo B",
    kickoffISO: "2026-06-11T16:00:00-03:00",
    bettingClosesISO: "2026-06-11T15:50:00-03:00",
    home: { nome: "Canadá", sigla: "CAN" },
    away: { nome: "Bósnia", sigla: "BIH" },
    estadio: "Toronto Field",
    palpites: 491,
    palpiteUrl: LINKS.rankingFallbackPalpite,
  },
]

/* ============================================================
   HELPERS — fuso "America/Sao_Paulo"
   ============================================================ */
const SP_TZ = "America/Sao_Paulo"

function getTodayKey(now: Date): string {
  // "YYYY-MM-DD" no fuso de São Paulo
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: SP_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
  return parts // en-CA já retorna YYYY-MM-DD
}

function getDayKeyFromISO(iso: string): string {
  return getTodayKey(new Date(iso))
}

function msUntilNextSpMidnight(now: Date): number {
  // Hora atual em SP
  const fmt = new Intl.DateTimeFormat("en-GB", {
    timeZone: SP_TZ,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  })
  const [h, m, s] = fmt.format(now).split(":").map(Number)
  const secondsToday = h * 3600 + m * 60 + s
  const secondsLeft = 24 * 3600 - secondsToday
  return secondsLeft * 1000 + 500 // +500ms de folga
}

function formatTodayLabel(now: Date): string {
  const raw = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SP_TZ,
    weekday: "short",
    day: "2-digit",
    month: "short",
  }).format(now)
  // ex: "qui., 11 de jun." → "QUI, 11 JUN"
  return raw
    .replace(/\./g, "")
    .replace(/ de /g, " ")
    .toUpperCase()
}

function formatKickoffTime(iso: string): string {
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: SP_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso))
}

/* ============================================================
   useCountdown — tick 1s
   ============================================================ */
interface CountdownState {
  total: number // ms restantes
  d: number
  h: number
  m: number
  s: number
  done: boolean
}

function computeCountdown(targetISO: string, now: number): CountdownState {
  const total = Math.max(0, new Date(targetISO).getTime() - now)
  const totalSec = Math.floor(total / 1000)
  const d = Math.floor(totalSec / 86400)
  const h = Math.floor((totalSec % 86400) / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return { total, d, h, m, s, done: total <= 0 }
}

function useCountdown(targetISO: string): CountdownState {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  return useMemo(() => computeCountdown(targetISO, now), [targetISO, now])
}

function pad(n: number): string {
  return n.toString().padStart(2, "0")
}

function formatClock(c: CountdownState): string {
  if (c.d > 0) return `${c.d}d ${pad(c.h)}:${pad(c.m)}:${pad(c.s)}`
  return `${pad(c.h)}:${pad(c.m)}:${pad(c.s)}`
}

/* ============================================================
   useCountUp — anima 0 → valor ao entrar no viewport
   ============================================================ */
function useCountUp(target: number, active: boolean, reduce: boolean, duration = 1400): number {
  const [val, setVal] = useState(reduce ? target : 0)
  useEffect(() => {
    if (!active) return
    if (reduce) {
      setVal(target)
      return
    }
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(target * eased))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, active, reduce, duration])
  return val
}

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

/* ============================================================
   CONFETE — canvas leve, tricolor, pausável
   ============================================================ */
const CONFETTI_COLORS = ["#008c45", "#f6ce00", "#32379b", "#efbd24"]

interface ConfettiHandle {
  burst: (intensity?: number) => void
}

function ConfettiCanvas({
  active,
  reduce,
  burstRef,
}: {
  active: boolean
  reduce: boolean
  burstRef: React.MutableRefObject<ConfettiHandle | null>
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (reduce) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    let raf = 0
    let running = false

    type P = {
      x: number
      y: number
      vx: number
      vy: number
      size: number
      color: string
      rot: number
      vrot: number
      depth: number
    }
    let particles: P[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener("resize", resize)

    const spawnAmbient = () => {
      const w = canvas.clientWidth
      particles.push({
        x: Math.random() * w,
        y: -10,
        vx: (Math.random() - 0.5) * 0.4,
        vy: 0.6 + Math.random() * 0.9,
        size: 4 + Math.random() * 5,
        color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
        rot: Math.random() * Math.PI,
        vrot: (Math.random() - 0.5) * 0.1,
        depth: 0.5 + Math.random() * 0.5,
      })
    }

    const burst = (intensity = 1) => {
      const w = canvas.clientWidth
      const count = Math.round((isMobile ? 24 : 48) * intensity)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: w / 2 + (Math.random() - 0.5) * w * 0.4,
          y: 60 + Math.random() * 40,
          vx: (Math.random() - 0.5) * 6,
          vy: -2 - Math.random() * 4,
          size: 5 + Math.random() * 6,
          color: CONFETTI_COLORS[(Math.random() * CONFETTI_COLORS.length) | 0],
          rot: Math.random() * Math.PI,
          vrot: (Math.random() - 0.5) * 0.25,
          depth: 0.6 + Math.random() * 0.4,
        })
      }
    }
    burstRef.current = { burst }

    let ambientAcc = 0
    const maxParticles = isMobile ? 60 : 120

    const loop = () => {
      if (!running) return
      raf = requestAnimationFrame(loop)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // densidade ambiente baixa
      ambientAcc += 1
      const ambientRate = isMobile ? 14 : 8
      if (ambientAcc >= ambientRate && particles.length < maxParticles) {
        spawnAmbient()
        ambientAcc = 0
      }

      particles = particles.filter((p) => {
        p.vy += 0.02 * p.depth
        p.x += p.vx * p.depth
        p.y += p.vy * p.depth
        p.rot += p.vrot
        if (p.y > h + 20) return false
        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate(p.rot)
        ctx.globalAlpha = 0.85 * p.depth
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.5)
        ctx.restore()
        return true
      })
    }

    const start = () => {
      if (running) return
      running = true
      raf = requestAnimationFrame(loop)
    }
    const stop = () => {
      running = false
      cancelAnimationFrame(raf)
    }

    if (active) start()
    else stop()

    return () => {
      stop()
      window.removeEventListener("resize", resize)
      burstRef.current = null
    }
  }, [active, reduce, burstRef])

  if (reduce) return null
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[4] h-full w-full"
    />
  )
}

/* ============================================================
   FLIP DIGIT — placar estilo estádio
   ============================================================ */
function FlipDigits({ value, reduce, urgent }: { value: string; reduce: boolean; urgent?: boolean }) {
  return (
    <span className={`inline-flex font-mono tabular-nums ${urgent ? "text-[#cc272e]" : ""}`}>
      {value.split("").map((ch, i) =>
        /\d/.test(ch) ? (
          <span key={i} className="relative inline-block w-[0.62em] overflow-hidden text-center">
            {reduce ? (
              <span>{ch}</span>
            ) : (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={ch}
                  initial={{ y: "-100%", opacity: 0 }}
                  animate={{ y: "0%", opacity: 1 }}
                  exit={{ y: "100%", opacity: 0 }}
                  transition={{ duration: 0.28, ease: "easeOut" }}
                  className="inline-block"
                >
                  {ch}
                </motion.span>
              </AnimatePresence>
            )}
          </span>
        ) : (
          <span key={i} className="inline-block px-[0.02em]">
            {ch}
          </span>
        ),
      )}
    </span>
  )
}

/* ============================================================
   BACKGROUND LAYERS — clima de Copa
   ============================================================ */
function StadiumBackground({ reduce }: { reduce: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 1) Vinheta radial (estádio à noite) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 40%, transparent 0%, transparent 45%, oklch(0.05 0.004 240 / 0.85) 100%)",
        }}
      />
      {/* 5) Textura de torcida/candles reaproveitada, bem esmaecida */}
      <div
        className="absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage: "url(/images/wc-stadium-hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      <div className="absolute inset-0 bg-background/70" />
      {/* 6) Grid fintech */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(oklch(0.86 0.18 95 / 0.4) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.18 95 / 0.4) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
        }}
      />
      {/* 3) Holofotes que fazem sweep */}
      {!reduce && (
        <>
          <div
            className="absolute -top-1/3 left-[15%] h-[160%] w-[40%] animate-spotlight-sweep blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 0%, oklch(0.86 0.18 95 / 0.10), transparent 70%)",
            }}
          />
          <div
            className="absolute -top-1/3 right-[12%] h-[160%] w-[42%] animate-spotlight-sweep-rev blur-3xl"
            style={{
              background:
                "radial-gradient(ellipse 50% 60% at 50% 0%, oklch(0.98 0.01 95 / 0.08), transparent 70%)",
              animationDelay: "3s",
            }}
          />
        </>
      )}
    </div>
  )
}

/* tri-color top line with shimmer */
function TricolorLine({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
      className="relative h-1 w-full overflow-hidden"
    >
      <div className="brazil-band absolute inset-0" />
      {!reduce && (
        <div className="gold-sweep absolute inset-0 opacity-70" />
      )}
      <div
        className="absolute inset-0"
        style={{ boxShadow: "0 0 18px oklch(0.86 0.18 95 / 0.5)" }}
      />
    </motion.div>
  )
}

/* ============================================================
   EYEBROW + HEADLINE
   ============================================================ */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#efbd24]/30 px-3 py-1.5">
      <span className="text-[#efbd24]">●</span>
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#efbd24]">
        {children}
      </span>
    </span>
  )
}

function RevealHeadline({
  pre,
  highlight,
  post,
  inView,
  reduce,
  onDone,
}: {
  pre?: string
  highlight: string
  post?: string
  inView: boolean
  reduce: boolean
  onDone?: () => void
}) {
  return (
    <h2 className="font-display text-4xl font-bold uppercase leading-[0.95] tracking-[-0.03em] text-foreground md:text-6xl">
      {pre && <RevealWords text={pre} inView={inView} reduce={reduce} delayBase={0} />}
      <motion.span
        className="text-[#efbd24]"
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: reduce ? 0 : 0.35, duration: 0.5 }}
        onAnimationComplete={onDone}
        style={!reduce && inView ? { textShadow: "0 0 22px oklch(0.86 0.18 95 / 0.55)" } : undefined}
      >
        <RevealWords text={highlight} inView={inView} reduce={reduce} delayBase={0.35} />
      </motion.span>
      {post && <RevealWords text={post} inView={inView} reduce={reduce} delayBase={0.6} />}
    </h2>
  )
}

function RevealWords({
  text,
  inView,
  reduce,
  delayBase,
}: {
  text: string
  inView: boolean
  reduce: boolean
  delayBase: number
}) {
  const words = text.split(" ")
  return (
    <>
      {words.map((w, i) =>
        w === "" ? (
          " "
        ) : (
          <span key={i} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block"
              initial={reduce ? { y: 0, opacity: 1 } : { y: "100%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: reduce ? 0 : delayBase + i * 0.08, duration: 0.5, ease: "easeOut" }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? "\u00A0" : ""}
          </span>
        ),
      )}
    </>
  )
}

/* ============================================================
   CTA PRIMÁRIO (link externo, nova aba, sheen + seta)
   ============================================================ */
function PrimaryCta({
  href,
  children,
  large,
  disabled,
}: {
  href: string
  children: React.ReactNode
  large?: boolean
  disabled?: boolean
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[10px] bg-primary font-bold uppercase tracking-wide text-primary-foreground transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#efbd24]"
  const size = large ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
  if (disabled) {
    return (
      <span
        aria-disabled
        className={`${base} ${size} cursor-not-allowed bg-muted text-muted-foreground opacity-60`}
      >
        {children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} ${size} hover:brightness-110 hover:shadow-[0_10px_40px_-10px_oklch(0.56_0.21_263/0.7)]`}
    >
      <span
        aria-hidden
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
      />
      <span className="relative z-10">{children}</span>
      <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
    </a>
  )
}

/* ============================================================
   BLOCO 2 — Card de fase + Pódio
   ============================================================ */
interface PodiumPlace {
  rank: 1 | 2 | 3
  marginBRL?: number
  pixBRL?: number
  orMarginBRL?: number
  orPixBRL?: number
  note?: string
}

function PhaseCard({
  icon,
  phaseLabel,
  title,
  dateLabel,
  bullets,
  podium,
  seal,
  ctaLabel,
  ctaHref,
  inView,
  reduce,
  index,
  onGoldHover,
}: {
  icon: React.ReactNode
  phaseLabel: string
  title: string
  dateLabel: string
  bullets: string[]
  podium: PodiumPlace[]
  seal?: string
  ctaLabel: string
  ctaHref: string
  inView: boolean
  reduce: boolean
  index: number
  onGoldHover?: () => void
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 40, rotateX: 8 }}
      animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{ delay: reduce ? 0 : 0.15 + index * 0.15, duration: 0.6, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className="group relative rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#f6ce00]/40 md:p-8"
    >
      {/* glow tricolor no contorno (conic girando) */}
      {!reduce && (
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "conic-gradient(from 0deg, #008c45, #f6ce00, #32379b, #008c45)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
            animation: "spin-slow 6s linear infinite",
          }}
        />
      )}

      <div className="mb-4 flex items-center gap-3">
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-[#efbd24] transition-transform duration-300 group-hover:scale-110">
          {icon}
        </span>
        <div>
          <p className="font-sans text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {phaseLabel}
          </p>
          <h3 className="font-display text-xl font-bold uppercase tracking-[-0.02em] text-foreground">
            {title}
          </h3>
        </div>
      </div>

      <p className="mb-5 font-mono text-sm font-semibold text-[#cc272e]">{dateLabel}</p>

      <ul className="mb-6 space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-muted-foreground">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#008c45]" aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      <Podium places={podium} inView={inView} reduce={reduce} onGoldHover={onGoldHover} />

      {seal && (
        <div className="mt-5 flex items-center gap-2 rounded-lg border border-[#f6ce00]/30 bg-[#f6ce00]/5 px-3 py-2">
          <ShieldCheck className="h-4 w-4 text-[#f6ce00]" aria-hidden />
          <span className="font-sans text-xs font-semibold uppercase tracking-wide text-[#f6ce00]">
            {seal}
          </span>
        </div>
      )}

      <div className="mt-6">
        <PrimaryCta href={ctaHref}>{ctaLabel}</PrimaryCta>
      </div>
    </motion.div>
  )
}

function Podium({
  places,
  inView,
  reduce,
  onGoldHover,
}: {
  places: PodiumPlace[]
  inView: boolean
  reduce: boolean
  onGoldHover?: () => void
}) {
  // ordenar para exibir 2º, 1º, 3º (1º central)
  const ordered = [...places].sort((a, b) => {
    const order = { 2: 0, 1: 1, 3: 2 } as Record<number, number>
    return order[a.rank] - order[b.rank]
  })
  const heights: Record<number, string> = { 1: "h-32", 2: "h-24", 3: "h-20" }
  const medalColors: Record<number, string> = {
    1: "text-[#f6ce00]",
    2: "text-[#c8cdd2]",
    3: "text-[#cd7f32]",
  }
  // 1º entra por último e mais alto
  const enterDelay: Record<number, number> = { 2: 0.2, 3: 0.35, 1: 0.55 }

  return (
    <div className="grid grid-cols-3 items-end gap-2">
      {ordered.map((p) => (
        <motion.div
          key={p.rank}
          initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            delay: reduce ? 0 : enterDelay[p.rank],
            duration: 0.6,
            ease: [0.16, 1, 0.3, 1],
          }}
          onMouseEnter={p.rank === 1 ? onGoldHover : undefined}
          className="flex flex-col items-center"
        >
          <Medal className={`mb-1 h-6 w-6 ${medalColors[p.rank]}`} aria-label={`${p.rank}º lugar`} />
          <div
            className={`relative flex w-full ${heights[p.rank]} flex-col items-center justify-center overflow-hidden rounded-t-lg border border-border bg-secondary px-1 text-center ${
              p.rank === 1 ? "ring-1 ring-[#f6ce00]/40" : ""
            }`}
          >
            {p.rank === 1 && !reduce && (
              <div className="gold-sweep absolute inset-0 opacity-40" aria-hidden />
            )}
            <PodiumValues place={p} inView={inView} reduce={reduce} />
          </div>
          <span className="mt-1 font-display text-lg font-bold text-foreground">{p.rank}º</span>
        </motion.div>
      ))}
    </div>
  )
}

function PodiumValues({ place, inView, reduce }: { place: PodiumPlace; inView: boolean; reduce: boolean }) {
  const margin = useCountUp(place.marginBRL ?? 0, inView, reduce)
  const pix = useCountUp(place.pixBRL ?? 0, inView, reduce)
  const orMargin = useCountUp(place.orMarginBRL ?? 0, inView, reduce)
  const orPix = useCountUp(place.orPixBRL ?? 0, inView, reduce)
  return (
    <div className="relative z-10 space-y-0.5 text-[10px] leading-tight md:text-xs">
      {place.marginBRL != null && (
        <p className="font-mono font-bold text-[#008c45]">{brl(margin)}</p>
      )}
      {place.marginBRL != null && <p className="text-[9px] text-muted-foreground">margem</p>}
      {place.pixBRL != null && (
        <p className="font-mono font-semibold text-[#efbd24]">+ {brl(pix)} PIX</p>
      )}
      {place.orMarginBRL != null && (
        <>
          <p className="font-mono font-bold text-[#008c45]">{brl(orMargin)}</p>
          <p className="text-[9px] text-muted-foreground">margem ou</p>
          <p className="font-mono font-semibold text-[#efbd24]">{brl(orPix)} PIX</p>
        </>
      )}
    </div>
  )
}

/* ============================================================
   BLOCO 3 — Card de jogo
   ============================================================ */
function FlagBadge({ team, reduce }: { team: Team; reduce: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <motion.div
        initial={reduce ? { rotateY: 0, opacity: 1 } : { rotateY: 90, opacity: 0 }}
        whileInView={{ rotateY: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="grid h-12 w-16 place-items-center overflow-hidden rounded-md border border-border bg-secondary group-hover:animate-flag-wave"
      >
        {team.flagUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img src={team.flagUrl || "/placeholder.svg"} alt={`Bandeira ${team.nome}`} className="h-full w-full object-cover" />
        ) : (
          <span className="font-display text-base font-bold tracking-tight text-foreground">
            {team.sigla}
          </span>
        )}
      </motion.div>
      <span className="font-sans text-xs font-semibold text-muted-foreground">{team.sigla}</span>
    </div>
  )
}

function MatchCard({
  match,
  reduce,
  index,
}: {
  match: Match
  reduce: boolean
  index: number
}) {
  const betting = useCountdown(match.bettingClosesISO)
  const kickoff = useCountdown(match.kickoffISO)
  const palpites = useCountUp(match.palpites, true, reduce)

  const bettingClosed = betting.done
  const isLive = kickoff.done
  const closingSoon = !bettingClosed && betting.total <= 60_000
  const palpiteDisabled = bettingClosed || isLive
  const hot = match.palpites >= 550

  return (
    <motion.div
      layout
      initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, y: 30, rotateX: 6 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.92 }}
      transition={{ delay: reduce ? 0 : index * 0.1, duration: 0.5, ease: "easeOut" }}
      style={{ perspective: 1000 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[#008c45]/50 hover:shadow-[0_18px_50px_-20px_oklch(0.56_0.16_152/0.5)] ${
        bettingClosed && !isLive ? "opacity-70 saturate-50" : ""
      }`}
    >
      {/* top row */}
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-md bg-[#008c45] px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-wide text-white">
          {match.grupo}
        </span>
        <span className="font-mono text-sm font-semibold text-foreground">
          {formatKickoffTime(match.kickoffISO)}
        </span>
      </div>

      {/* teams + VS */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <FlagBadge team={match.home} reduce={reduce} />
        <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
          {!reduce && (
            <span className="absolute inset-0 animate-vs-pulse rounded-full bg-[#008c45]/20 blur-md transition-all duration-300 group-hover:bg-[#008c45]/40" />
          )}
          {!reduce && (
            <span className="absolute inset-0 animate-slow-spin rounded-full border border-dashed border-[#008c45]/40" />
          )}
          <span className="relative font-display text-lg font-bold text-[#efbd24]">VS</span>
        </div>
        <FlagBadge team={match.away} reduce={reduce} />
      </div>

      {/* stadium + palpites */}
      <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 text-[#32379b]" aria-hidden />
          {match.estadio}
        </span>
        <span className="flex items-center gap-1.5">
          <Flame
            className={`h-3.5 w-3.5 ${hot ? "animate-flicker text-[#cc272e]" : "text-[#efbd24]"}`}
            aria-hidden
          />
          <span className="font-mono font-semibold text-foreground">{palpites}</span> palpites
        </span>
      </div>

      {/* counters */}
      <div className="mb-4 space-y-2 rounded-xl border border-border bg-secondary/50 p-3">
        {/* apostas fecham */}
        <div className="flex items-center justify-between" aria-live="polite">
          <span className="flex items-center gap-1.5 font-sans text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            <Clock className="h-3.5 w-3.5" aria-hidden />
            {bettingClosed ? "" : "Apostas fecham em"}
          </span>
          {bettingClosed ? (
            <span className="font-sans text-[11px] font-bold uppercase tracking-wide text-[#cc272e]">
              Apostas encerradas
            </span>
          ) : (
            <span className={closingSoon ? "animate-pulse" : ""}>
              <span className={`text-sm font-bold ${closingSoon ? "text-[#cc272e]" : "text-[#008c45]"}`}>
                <FlipDigits value={formatClock(betting)} reduce={reduce} urgent={closingSoon} />
              </span>
            </span>
          )}
        </div>
        {/* começa em / ao vivo */}
        <div className="flex items-center justify-between" aria-live="polite">
          <span className="font-sans text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
            {isLive ? "" : "Começa em"}
          </span>
          {isLive ? (
            <span className="flex items-center gap-1.5 font-sans text-[11px] font-bold uppercase tracking-wide text-[#cc272e]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#cc272e] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#cc272e]" />
              </span>
              Ao vivo
            </span>
          ) : (
            <span className="text-sm font-bold text-[#efbd24]">
              <FlipDigits value={formatClock(kickoff)} reduce={reduce} />
            </span>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-auto">
        {palpiteDisabled ? (
          <PrimaryCta href={match.palpiteUrl} disabled>
            {isLive ? "Jogo iniciado" : "Apostas encerradas"}
          </PrimaryCta>
        ) : (
          <div className="[&>a]:w-full">
            <PrimaryCta href={match.palpiteUrl}>Fazer palpite</PrimaryCta>
          </div>
        )}
      </div>
    </motion.div>
  )
}

function MatchSkeleton() {
  return (
    <div className="h-[360px] animate-pulse rounded-2xl border border-border bg-card p-5">
      <div className="mb-4 flex justify-between">
        <div className="h-6 w-20 rounded bg-secondary" />
        <div className="h-6 w-12 rounded bg-secondary" />
      </div>
      <div className="mb-4 flex justify-between">
        <div className="h-16 w-16 rounded bg-secondary" />
        <div className="h-12 w-12 rounded-full bg-secondary" />
        <div className="h-16 w-16 rounded bg-secondary" />
      </div>
      <div className="mb-4 h-20 rounded-xl bg-secondary/60" />
      <div className="h-11 rounded-[10px] bg-secondary" />
    </div>
  )
}

/* ============================================================
   FETCH
   ============================================================ */
async function fetchMatches(): Promise<Match[]> {
  const res = await fetch("/data/copa-jogos.json", { cache: "no-store" })
  if (!res.ok) throw new Error("fetch failed")
  const data = await res.json()
  return data.matches as Match[]
}

/* ============================================================
   COMPONENTE PRINCIPAL
   ============================================================ */
export function CopaDosTraders() {
  const reduce = useReducedMotion() ?? false
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: "-100px" })

  const phasesRef = useRef<HTMLDivElement>(null)
  const phasesInView = useInView(phasesRef, { once: true, margin: "-80px" })

  const gamesRef = useRef<HTMLDivElement>(null)
  const gamesInView = useInView(gamesRef, { once: true, margin: "-80px" })

  // confete
  const [sectionVisible, setSectionVisible] = useState(false)
  const burstRef = useRef<ConfettiHandle | null>(null)

  // dados
  const [allMatches, setAllMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [todayKey, setTodayKey] = useState<string>(() => getTodayKey(new Date()))
  const [now, setNow] = useState(() => new Date())

  // fetch inicial
  useEffect(() => {
    let mounted = true
    fetchMatches()
      .then((m) => {
        if (!mounted) return
        setAllMatches(m)
        setOffline(false)
      })
      .catch(() => {
        if (!mounted) return
        setAllMatches(FALLBACK_MATCHES)
        setOffline(true)
      })
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  // visibilidade da seção (confete + pausa)
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => setSectionVisible(entry.isIntersecting),
      { threshold: 0.1 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // virada de meia-noite SP + visibilitychange
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const schedule = () => {
      const ms = msUntilNextSpMidnight(new Date())
      timer = setTimeout(() => {
        const n = new Date()
        setNow(n)
        setTodayKey(getTodayKey(n))
        schedule()
      }, ms)
    }
    schedule()
    const onVis = () => {
      if (document.visibilityState === "visible") {
        const n = new Date()
        setNow(n)
        setTodayKey(getTodayKey(n))
      }
    }
    document.addEventListener("visibilitychange", onVis)
    return () => {
      clearTimeout(timer)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  // jogos de hoje
  const todayMatches = useMemo(
    () =>
      allMatches
        .filter((m) => getDayKeyFromISO(m.kickoffISO) === todayKey)
        .sort((a, b) => new Date(a.kickoffISO).getTime() - new Date(b.kickoffISO).getTime()),
    [allMatches, todayKey],
  )

  const allClosedToday =
    todayMatches.length > 0 &&
    todayMatches.every((m) => Date.now() >= new Date(m.bettingClosesISO).getTime())

  // confete na entrada
  useEffect(() => {
    if (inView && sectionVisible && !reduce) {
      const t = setTimeout(() => burstRef.current?.burst(1), 600)
      return () => clearTimeout(t)
    }
  }, [inView, sectionVisible, reduce])

  const handleGoldHover = useCallback(() => {
    burstRef.current?.burst(0.7)
  }, [])

  const todayLabel = useMemo(() => formatTodayLabel(now), [now])

  return (
    <section
      ref={sectionRef}
      id="copa-dos-traders"
      aria-labelledby="copa-heading"
      className="relative overflow-hidden bg-[#020303] py-20 md:py-28"
    >
      <StadiumBackground reduce={reduce} />
      <ConfettiCanvas active={sectionVisible} reduce={reduce} burstRef={burstRef} />

      {/* linha tricolor no topo */}
      <div className="absolute inset-x-0 top-0 z-[5]">
        <TricolorLine inView={inView} reduce={reduce} />
      </div>

      <div className="relative z-[6] mx-auto max-w-7xl px-4 md:px-6">
        {/* ───── BLOCO 1 — ABERTURA ───── */}
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Eyebrow>Campanha Oficial</Eyebrow>
          </motion.div>

          <div className="mt-5" id="copa-heading">
            <RevealHeadline
              highlight="COPA DOS TRADERS"
              inView={inView}
              reduce={reduce}
              onDone={() => sectionVisible && burstRef.current?.burst(0.6)}
            />
          </div>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-5 max-w-2xl text-pretty font-sans text-base leading-relaxed text-muted-foreground"
          >
            Até 70% OFF nos planos participantes, palpites nos jogos e premiação em dinheiro. Quanto mais
            você acerta, mais sobe no ranking — e mais perto fica de operar com a mesa.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-8 flex justify-center"
          >
            <div className={reduce ? "" : "animate-cta-pulse"}>
              <PrimaryCta href={LINKS.desconto70} large>
                Garantir até 70% OFF
              </PrimaryCta>
            </div>
          </motion.div>
        </div>

        {/* ───── BLOCO 2 — DUAS FASES ───── */}
        <div ref={phasesRef} className="mt-20 grid gap-6 md:grid-cols-2 md:gap-8">
          <PhaseCard
            index={0}
            inView={phasesInView}
            reduce={reduce}
            onGoldHover={handleGoldHover}
            icon={<Trophy className="h-5 w-5" />}
            phaseLabel="Fase 1 · Classificatória"
            title="Classificatória"
            dateLabel="11/06 a 12/07"
            bullets={[
              "Até 70% OFF nos planos participantes",
              "Todos podem participar",
              "Pontos via palpites nos jogos selecionados pela Amigos da Mesa",
              "Ranking TOP 10 durante toda a campanha",
            ]}
            podium={[
              { rank: 1, marginBRL: 10250, pixBRL: 600 },
              { rank: 2, marginBRL: 4250, pixBRL: 400 },
              { rank: 3, marginBRL: 4250 },
            ]}
            seal="TOP 10 vai para a Grande Final"
            ctaLabel="Ver fase classificatória"
            ctaHref={LINKS.faseClassificatoria}
          />
          <PhaseCard
            index={1}
            inView={phasesInView}
            reduce={reduce}
            onGoldHover={handleGoldHover}
            icon={<Medal className="h-5 w-5" />}
            phaseLabel="Fase 2 · Grande Final"
            title="Grande Final"
            dateLabel="13/07 a 19/07"
            bullets={[
              "Última semana de disputa",
              "Até 70% OFF nos planos participantes",
              "Os últimos jogos definem os vencedores",
              "Ranking atualizado diariamente",
            ]}
            podium={[
              { rank: 1, orMarginBRL: 4250, orPixBRL: 1000 },
              { rank: 2, orMarginBRL: 2500, orPixBRL: 800 },
              { rank: 3, orMarginBRL: 2000, orPixBRL: 500 },
            ]}
            ctaLabel="Ver grande final"
            ctaHref={LINKS.grandeFinal}
          />
        </div>

        {/* ───── BLOCO 3 — JOGOS DO DIA ───── */}
        <div ref={gamesRef} className="mt-20">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <motion.div
                initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={gamesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
              >
                <Eyebrow>— Partidas de Hoje</Eyebrow>
              </motion.div>
              <div className="mt-4">
                <RevealHeadline pre="JOGOS DO " highlight="DIA" inView={gamesInView} reduce={reduce} />
              </div>
            </div>
            <div className="font-mono text-sm font-semibold text-muted-foreground md:text-right">
              <span className="text-foreground">{todayLabel}</span>
              <span className="mx-2 text-[#32379b]">//</span>
              <span>Fase de grupos</span>
            </div>
          </div>

          {offline && !loading && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-1.5 font-sans text-xs text-muted-foreground">
              <Megaphone className="h-3.5 w-3.5 text-[#efbd24]" aria-hidden />
              Exibindo programação offline
            </p>
          )}

          {allClosedToday && !loading && (
            <p className="mb-4 inline-flex items-center gap-2 rounded-lg border border-[#cc272e]/30 bg-[#cc272e]/5 px-3 py-1.5 font-sans text-xs font-semibold text-[#cc272e]">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              Os palpites de hoje já fecharam.
            </p>
          )}

          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <MatchSkeleton key={i} />
              ))}
            </div>
          ) : todayMatches.length === 0 ? (
            <motion.div
              initial={reduce ? { opacity: 1 } : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center"
            >
              <CalendarDays className="h-10 w-10 text-[#efbd24]" aria-hidden />
              <p className="max-w-md text-pretty font-sans text-muted-foreground">
                Nenhum jogo programado para hoje. Volte amanhã às 00h para os próximos confrontos.
              </p>
              <PrimaryCta href={LINKS.regulamento}>Ver regulamento</PrimaryCta>
            </motion.div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout key={todayKey} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {todayMatches.map((m, i) => (
                  <MatchCard key={m.id} match={m} reduce={reduce} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}
