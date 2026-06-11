"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion"
import { ArrowRight, MapPin, Users, Megaphone, CalendarDays, Trophy, ChevronUp, ChevronDown, Minus } from "lucide-react"
import type { RankingPayload, RankingRound, RankingTopEntry, RoundStatus } from "@/lib/ranking"

/* ============================================================
   LINKS — edite as URLs aqui (todas abrem em nova aba)
   ============================================================ */
const CAMPANHA_URL = "https://www.comunidade-amigosdamesa.online/copa"

const LINKS = {
  desconto70: CAMPANHA_URL,
  faseClassificatoria: CAMPANHA_URL,
  grandeFinal: CAMPANHA_URL,
  regulamento: CAMPANHA_URL,
  rankingFallbackPalpite: CAMPANHA_URL,
} as const

/* ============================================================
   TIPOS
   ============================================================ */
interface Team {
  nome: string
  sigla: string
  iso?: string
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
    home: { nome: "México", sigla: "MEX", iso: "mx", flagUrl: "https://flagcdn.com/mx.svg" },
    away: { nome: "África do Sul", sigla: "RSA", iso: "za", flagUrl: "https://flagcdn.com/za.svg" },
    estadio: "Estádio Azteca",
    palpites: 602,
    palpiteUrl: LINKS.rankingFallbackPalpite,
  },
  {
    id: "kor-cze-grupoA",
    grupo: "Grupo A",
    kickoffISO: "2026-06-10T23:00:00-03:00",
    bettingClosesISO: "2026-06-10T22:50:00-03:00",
    home: { nome: "Coreia do Sul", sigla: "KOR", iso: "kr", flagUrl: "https://flagcdn.com/kr.svg" },
    away: { nome: "Rep. Tcheca", sigla: "CZE", iso: "cz", flagUrl: "https://flagcdn.com/cz.svg" },
    estadio: "Estádio Akron",
    palpites: 547,
    palpiteUrl: LINKS.rankingFallbackPalpite,
  },
  {
    id: "can-bih-grupoB",
    grupo: "Grupo B",
    kickoffISO: "2026-06-11T16:00:00-03:00",
    bettingClosesISO: "2026-06-11T15:50:00-03:00",
    home: { nome: "Canadá", sigla: "CAN", iso: "ca", flagUrl: "https://flagcdn.com/ca.svg" },
    away: { nome: "Bósnia", sigla: "BIH", iso: "ba", flagUrl: "https://flagcdn.com/ba.svg" },
    estadio: "Toronto Field",
    palpites: 491,
    palpiteUrl: LINKS.rankingFallbackPalpite,
  },
]

/* ============================================================
   PALETA (acentos)
   ============================================================ */
const GREEN = "#008c45"
const GOLD = "#efbd24"

/* ============================================================
   HELPERS — fuso "America/Sao_Paulo"
   ============================================================ */
const SP_TZ = "America/Sao_Paulo"

function getTodayKey(now: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SP_TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now)
}

function getDayKeyFromISO(iso: string): string {
  return getTodayKey(new Date(iso))
}

function msUntilNextSpMidnight(now: Date): number {
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
  return secondsLeft * 1000 + 500
}

function formatTodayLabel(now: Date): string {
  const raw = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SP_TZ,
    weekday: "long",
    day: "2-digit",
    month: "long",
  }).format(now)
  // ex: "quarta-feira, 10 de junho" → "Quarta-feira, 10 de junho"
  return raw.charAt(0).toUpperCase() + raw.slice(1)
}

function formatMatchDate(iso: string): string {
  // ex: "10 JUN · 16:00"
  const date = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SP_TZ,
    day: "2-digit",
    month: "short",
  })
    .format(new Date(iso))
    .replace(/\./g, "")
    .toUpperCase()
  const time = new Intl.DateTimeFormat("pt-BR", {
    timeZone: SP_TZ,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date(iso))
  return `${date} · ${time}`
}

/* ============================================================
   useCountdown — tick 1s, até bettingClosesISO
   ============================================================ */
interface CountdownState {
  total: number
  h: number
  m: number
  s: number
  done: boolean
}

function computeCountdown(targetISO: string, now: number): CountdownState {
  const total = Math.max(0, new Date(targetISO).getTime() - now)
  const totalSec = Math.floor(total / 1000)
  const h = Math.floor(totalSec / 3600)
  const m = Math.floor((totalSec % 3600) / 60)
  const s = totalSec % 60
  return { total, h, m, s, done: total <= 0 }
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
  return `${pad(c.h)}:${pad(c.m)}:${pad(c.s)}`
}

const brl = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 })

/* ============================================================
   BACKGROUND — sóbrio, profundidade por sombra (sem neon)
   ============================================================ */
function StadiumBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* textura de estádio bem esmaecida */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "url(/images/wc-stadium-hero.png)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />
      {/* vinheta suave para dar foco ao conteúdo */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 65% at 50% 35%, transparent 0%, transparent 55%, #020303 100%)",
        }}
      />
      {/* grade fintech neutra e discreta */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(#f7f5ee 1px, transparent 1px), linear-gradient(90deg, #f7f5ee 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
    </div>
  )
}

/* linha tricolor superior — fina e limpa, sem glow */
function TricolorLine({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 0.9, ease: "easeOut" }}
      style={{ transformOrigin: "left" }}
      className="flex h-0.5 w-full overflow-hidden"
    >
      <span className="h-full flex-1" style={{ background: GREEN }} />
      <span className="h-full flex-1" style={{ background: GOLD }} />
      <span className="h-full flex-1" style={{ background: "#32379b" }} />
    </motion.div>
  )
}

/* ============================================================
   KICKER — pequeno selo de "campeonato oficial", com classe
   ============================================================ */
function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="h-px w-6" style={{ background: GOLD }} />
      <span className="font-sans text-xs font-semibold uppercase tracking-[0.32em] text-[#9a9891]">
        {children}
      </span>
      <span className="h-px w-6" style={{ background: GOLD }} />
    </span>
  )
}

/* ============================================================
   CTA — verde-bandeira sólido, sem roxo, seta desliza no hover
   ============================================================ */
function PrimaryCta({
  href,
  children,
  large,
  block,
  disabled,
  disabledLabel,
}: {
  href: string
  children: React.ReactNode
  large?: boolean
  block?: boolean
  disabled?: boolean
  disabledLabel?: string
}) {
  const size = large ? "px-9 py-4 text-sm" : "px-6 py-3 text-[13px]"
  const width = block ? "w-full" : ""
  const base =
    "group/cta relative inline-flex items-center justify-center gap-2 rounded-lg font-display font-semibold uppercase tracking-[0.08em] transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"

  if (disabled) {
    return (
      <span
        aria-disabled
        className={`${base} ${size} ${width} cursor-not-allowed border border-[#1b2024] bg-[#0f1214] text-[#5f5e58]`}
      >
        {disabledLabel ?? children}
      </span>
    )
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ backgroundColor: GREEN }}
      className={`${base} ${size} ${width} text-white shadow-[0_12px_30px_-14px_rgba(0,140,69,0.9)] hover:brightness-[0.92] focus-visible:outline-[#008c45]`}
    >
      <span>{children}</span>
      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-1" />
    </a>
  )
}

/* ============================================================
   BLOCO 2 — Card de fase + Pódio editorial
   ============================================================ */
interface PodiumPlace {
  rank: 1 | 2 | 3
  marginBRL?: number
  pixBRL?: number
  orMarginBRL?: number
  orPixBRL?: number
}

const RANK_ACCENT: Record<number, string> = {
  1: GOLD,
  2: "#c8cdd2",
  3: "#cd7f32",
}

function PodiumCard({ place, featured }: { place: PodiumPlace; featured: boolean }) {
  const accent = RANK_ACCENT[place.rank]
  return (
    <div
      className={`relative flex flex-col rounded-xl border bg-[#0b0e0f] p-4 transition-all duration-300 ${
        featured ? "border-[#efbd24]/40 md:-translate-y-2 md:p-5" : "border-[#1b2024]"
      }`}
    >
      <span className="absolute left-0 right-0 top-0 h-0.5 rounded-t-xl" style={{ background: accent }} />
      <div className="mb-2 flex items-baseline gap-2">
        <span className="font-display text-2xl font-bold leading-none" style={{ color: accent }}>
          {place.rank}º
        </span>
        {featured && (
          <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.18em] text-[#efbd24]">
            Campeão
          </span>
        )}
      </div>

      {place.marginBRL != null && (
        <>
          <p className="font-display text-xl font-bold leading-none text-[#f7f5ee]">{brl(place.marginBRL)}</p>
          <p className="mt-1 font-sans text-xs text-[#9a9891]">em margem na mesa</p>
          {place.pixBRL != null && (
            <p className="mt-1.5 font-sans text-sm font-semibold text-[#efbd24]">+ {brl(place.pixBRL)} no Pix</p>
          )}
        </>
      )}

      {place.orMarginBRL != null && (
        <>
          <p className="font-display text-xl font-bold leading-none text-[#f7f5ee]">{brl(place.orMarginBRL)}</p>
          <p className="mt-1 font-sans text-xs text-[#9a9891]">em margem na mesa</p>
          <p className="mt-2 font-sans text-xs uppercase tracking-wide text-[#5f5e58]">ou</p>
          <p className="mt-1 font-sans text-sm font-semibold text-[#efbd24]">{brl(place.orPixBRL ?? 0)} no Pix</p>
        </>
      )}
    </div>
  )
}

function Podium({ places }: { places: PodiumPlace[] }) {
  // ordem visual: 2º, 1º, 3º (campeão ao centro)
  const ordered = [...places].sort((a, b) => {
    const order = { 2: 0, 1: 1, 3: 2 } as Record<number, number>
    return order[a.rank] - order[b.rank]
  })
  return (
    <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-3">
      {ordered.map((p) => (
        <PodiumCard key={p.rank} place={p} featured={p.rank === 1} />
      ))}
    </div>
  )
}

function PhaseCard({
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
}: {
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
}) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: reduce ? 0 : 0.1 + index * 0.12, duration: 0.55, ease: "easeOut" }}
      className="flex flex-col rounded-2xl border border-[#1b2024] bg-[#060809] p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] transition-all duration-300 hover:border-[#2a3036] md:p-8"
    >
      {/* header */}
      <div className="flex items-baseline justify-between gap-4 border-b border-[#1b2024] pb-5">
        <div>
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-[#9a9891]">
            {phaseLabel}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold uppercase tracking-[-0.02em] text-[#f7f5ee]">
            {title}
          </h3>
        </div>
        <p className="shrink-0 font-sans text-xs font-medium uppercase tracking-[0.14em] text-[#9a9891]">
          {dateLabel}
        </p>
      </div>

      {/* bullets sóbrios */}
      <ul className="my-6 space-y-3">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-3 font-sans text-sm leading-relaxed text-[#c9c7bf]">
            <span className="mt-2.5 h-px w-3 shrink-0" style={{ background: GREEN }} aria-hidden />
            <span>{b}</span>
          </li>
        ))}
      </ul>

      {/* pódio */}
      <Podium places={podium} />

      {seal && (
        <p className="mt-5 font-sans text-xs font-medium uppercase tracking-[0.16em] text-[#efbd24]">{seal}</p>
      )}

      <div className="mt-6">
        <PrimaryCta href={ctaHref}>{ctaLabel}</PrimaryCta>
      </div>
    </motion.div>
  )
}

/* ============================================================
   BLOCO 3 — Card de jogo (bandeiras reais, contador único)
   ============================================================ */
function FlagSide({ team, align }: { team: Team; align: "left" | "right" }) {
  return (
    <div className={`flex flex-col items-center gap-2 text-center`}>
      <span className="overflow-hidden rounded-[4px] border border-[#1b2024] shadow-[0_8px_18px_-10px_rgba(0,0,0,0.9)]">
        {team.flagUrl ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={team.flagUrl || "/placeholder.svg"}
            alt={`Bandeira ${team.nome}`}
            className="block h-11 w-[68px] object-cover"
            loading="lazy"
          />
        ) : (
          <span className="grid h-11 w-[68px] place-items-center bg-[#0f1214] font-display text-sm font-bold text-[#f7f5ee]">
            {team.sigla}
          </span>
        )}
      </span>
      <div className="leading-tight">
        <p className="font-display text-sm font-semibold uppercase tracking-[-0.01em] text-[#f7f5ee]">
          {team.nome}
        </p>
        <p className="font-sans text-[11px] font-medium uppercase tracking-[0.14em] text-[#9a9891]">
          {team.sigla}
        </p>
      </div>
    </div>
  )
}

function MatchCard({ match, reduce, index }: { match: Match; reduce: boolean; index: number }) {
  const betting = useCountdown(match.bettingClosesISO)
  const kickoff = useCountdown(match.kickoffISO)

  const bettingClosed = betting.done
  const isLive = kickoff.done
  const closingSoon = !bettingClosed && betting.total <= 10 * 60 * 1000

  return (
    <motion.div
      layout
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
      transition={{ delay: reduce ? 0 : index * 0.08, duration: 0.45, ease: "easeOut" }}
      className={`group flex flex-col rounded-2xl border border-[#1b2024] bg-[#060809] p-5 shadow-[0_30px_60px_-44px_rgba(0,0,0,0.9)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2a3036] ${
        bettingClosed && !isLive ? "opacity-70" : ""
      }`}
    >
      {/* top: grupo + data/hora */}
      <div className="flex items-center justify-between">
        <span
          className="rounded-md px-2.5 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-white"
          style={{ background: GREEN }}
        >
          {match.grupo}
        </span>
        <span className="font-sans text-xs font-medium uppercase tracking-[0.1em] text-[#9a9891]">
          {formatMatchDate(match.kickoffISO)}
        </span>
      </div>

      {/* confronto */}
      <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <FlagSide team={match.home} align="left" />
        <div className="relative grid h-12 w-12 shrink-0 place-items-center">
          <span
            className={`absolute inset-0 rounded-full ${reduce ? "" : "animate-vs-pulse"}`}
            style={{ background: "rgba(0,140,69,0.16)" }}
            aria-hidden
          />
          <span className="relative grid h-10 w-10 place-items-center rounded-full border border-[#1b2024] bg-[#0b0e0f] font-display text-sm font-bold text-[#9a9891]">
            VS
          </span>
        </div>
        <FlagSide team={match.away} align="right" />
      </div>

      {/* divisória */}
      <div className="my-5 h-px w-full bg-[#1b2024]" />

      {/* estádio + palpites */}
      <div className="flex items-center justify-between font-sans text-xs text-[#9a9891]">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden />
          {match.estadio}
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" aria-hidden />
          <span className="font-medium text-[#c9c7bf]">{match.palpites.toLocaleString("pt-BR")}</span> palpites
        </span>
      </div>

      {/* contador único */}
      <div className="mt-5 flex items-center justify-between rounded-xl border border-[#1b2024] bg-[#0b0e0f] px-3.5 py-3" aria-live="polite">
        {bettingClosed ? (
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#9a9891]">
            Apostas encerradas
          </span>
        ) : (
          <>
            <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[#9a9891]">
              Apostas encerram em
            </span>
            <span
              className="font-mono text-sm font-bold tabular-nums"
              style={{ color: closingSoon ? GOLD : GREEN }}
            >
              {formatClock(betting)}
            </span>
          </>
        )}
      </div>

      {/* CTA */}
      <div className="mt-4">
        {isLive ? (
          <PrimaryCta href={match.palpiteUrl} block disabled disabledLabel="Jogo iniciado">
            Jogo iniciado
          </PrimaryCta>
        ) : bettingClosed ? (
          <PrimaryCta href={match.palpiteUrl} block disabled disabledLabel="Apostas encerradas">
            Apostas encerradas
          </PrimaryCta>
        ) : (
          <PrimaryCta href={match.palpiteUrl} block>
            Fazer palpite
          </PrimaryCta>
        )}
      </div>
    </motion.div>
  )
}

function MatchSkeleton() {
  return (
    <div className="h-[330px] animate-pulse rounded-2xl border border-[#1b2024] bg-[#060809] p-5">
      <div className="flex justify-between">
        <div className="h-6 w-20 rounded bg-[#0f1214]" />
        <div className="h-6 w-24 rounded bg-[#0f1214]" />
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="h-16 w-16 rounded bg-[#0f1214]" />
        <div className="h-12 w-12 rounded-full bg-[#0f1214]" />
        <div className="h-16 w-16 rounded bg-[#0f1214]" />
      </div>
      <div className="mt-6 h-12 rounded-xl bg-[#0f1214]" />
      <div className="mt-4 h-11 rounded-lg bg-[#0f1214]" />
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
   RANKING DE RODADAS — fetch (API → fallback estático)
   ============================================================ */
async function fetchRanking(): Promise<RankingPayload> {
  try {
    const res = await fetch("/api/ranking", { cache: "no-store" })
    if (!res.ok) throw new Error("api failed")
    return (await res.json()) as RankingPayload
  } catch {
    const res = await fetch("/data/copa-ranking.json", { cache: "no-store" })
    if (!res.ok) throw new Error("fallback failed")
    return (await res.json()) as RankingPayload
  }
}

const STATUS_META: Record<RoundStatus, { label: string; color: string; dot: boolean }> = {
  "ao-vivo": { label: "Ao vivo", color: GREEN, dot: true },
  encerrada: { label: "Encerrada", color: "#9a9891", dot: false },
  agendada: { label: "Em breve", color: GOLD, dot: false },
}

function RoundStatusChip({ status }: { status: RoundStatus }) {
  const meta = STATUS_META[status]
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.16em]"
      style={{ borderColor: `${meta.color}40`, color: meta.color }}
    >
      {meta.dot && (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
            style={{ background: meta.color }}
          />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full" style={{ background: meta.color }} />
        </span>
      )}
      {meta.label}
    </span>
  )
}

function DeltaTag({ delta }: { delta?: number }) {
  if (delta === undefined) return null
  if (delta === 0) {
    return (
      <span className="inline-flex items-center gap-0.5 font-sans text-[11px] font-medium text-[#5f5e58]">
        <Minus className="h-3 w-3" aria-hidden />
      </span>
    )
  }
  const up = delta > 0
  return (
    <span
      className="inline-flex items-center gap-0.5 font-sans text-[11px] font-semibold"
      style={{ color: up ? GREEN : "#d4564a" }}
      title={up ? `Subiu ${delta}` : `Caiu ${Math.abs(delta)}`}
    >
      {up ? <ChevronUp className="h-3 w-3" aria-hidden /> : <ChevronDown className="h-3 w-3" aria-hidden />}
      {Math.abs(delta)}
    </span>
  )
}

function RankRow({ entry, featured }: { entry: RankingTopEntry; featured: boolean }) {
  const accent = RANK_ACCENT[entry.position]
  return (
    <li
      className={`relative flex items-center gap-4 rounded-lg border px-4 py-3 transition-colors ${
        featured ? "border-[#efbd24]/35 bg-[#0d0f08]" : "border-[#1b2024] bg-[#0b0e0f]"
      }`}
    >
      <span className="absolute left-0 top-1/2 h-7 w-0.5 -translate-y-1/2 rounded-r" style={{ background: accent }} />
      <span className="flex w-7 shrink-0 items-baseline gap-0.5 font-display text-2xl font-bold leading-none" style={{ color: accent }}>
        {entry.position}
        <span className="text-sm">º</span>
      </span>
      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 truncate font-display text-base font-semibold uppercase tracking-[-0.01em] text-[#f7f5ee]">
          {featured && <Trophy className="h-3.5 w-3.5 shrink-0" aria-hidden style={{ color: GOLD }} />}
          {entry.player}
        </p>
      </div>
      <div className="flex shrink-0 flex-col items-end leading-tight">
        <span className="font-display text-lg font-bold leading-none text-[#f7f5ee]">
          {entry.points.toLocaleString("pt-BR")}
          <span className="ml-1 font-sans text-[10px] font-medium uppercase tracking-[0.12em] text-[#9a9891]">pts</span>
        </span>
        <DeltaTag delta={entry.delta} />
      </div>
    </li>
  )
}

function RoundCard({ round, index, inView, reduce }: { round: RankingRound; index: number; inView: boolean; reduce: boolean }) {
  const top3 = [...round.top].sort((a, b) => a.position - b.position).slice(0, 3)
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: reduce ? 0 : 0.1 + index * 0.1, duration: 0.55, ease: "easeOut" }}
      className="flex flex-col rounded-2xl border border-[#1b2024] bg-[#060809] p-6 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)] transition-colors duration-300 hover:border-[#2a3036] md:p-7"
    >
      <div className="mb-5 flex items-center justify-between gap-3 border-b border-[#1b2024] pb-5">
        <div className="min-w-0">
          <h4 className="font-display text-xl font-bold uppercase tracking-[-0.02em] text-[#f7f5ee] md:text-2xl">
            {round.label}
          </h4>
          {round.dateLabel && (
            <p className="mt-1 font-sans text-xs font-medium uppercase tracking-[0.14em] text-[#9a9891]">
              {round.dateLabel}
            </p>
          )}
        </div>
        <RoundStatusChip status={round.status} />
      </div>
      {round.status === "agendada" ? (
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-8 text-center">
          <Trophy className="h-8 w-8 opacity-20" aria-hidden style={{ color: GOLD }} />
          <p className="font-sans text-sm leading-relaxed text-[#5f5e58]">
            O ranking desta rodada será publicado<br />assim que os jogos começarem.
          </p>
        </div>
      ) : (
        <ul className="flex flex-col gap-2.5">
          {top3.map((e) => (
            <RankRow key={e.position} entry={e} featured={e.position === 1} />
          ))}
        </ul>
      )}
    </motion.div>
  )
}

function formatUpdatedLabel(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ""
  return new Intl.DateTimeFormat("pt-BR", {
    timeZone: SP_TZ,
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
}

function RankingRodadas() {
  const reduce = useReducedMotion() ?? false
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const [data, setData] = useState<RankingPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    let mounted = true
    fetchRanking()
      .then((d) => mounted && setData(d))
      .catch(() => mounted && setError(true))
      .finally(() => mounted && setLoading(false))
    return () => {
      mounted = false
    }
  }, [])

  return (
    <div ref={ref} className="mt-24">
      <div className="mb-8 flex flex-col gap-3 border-b border-[#1b2024] pb-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Kicker>Classificação atualizada</Kicker>
          <h3 className="mt-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-[#f7f5ee] md:text-4xl">
            Ranking de rodadas
          </h3>
        </div>
        {data?.updatedAt && (
          <p className="font-sans text-sm text-[#9a9891] md:text-right">
            Atualizado em {formatUpdatedLabel(data.updatedAt)}
          </p>
        )}
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div key={i} className="rounded-2xl border border-[#1b2024] bg-[#060809] p-6">
              <div className="mb-5 h-6 w-32 animate-pulse rounded bg-[#13171a]" />
              <div className="flex flex-col gap-2.5">
                {[0, 1, 2].map((j) => (
                  <div key={j} className="h-14 animate-pulse rounded-lg bg-[#0b0e0f]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : error || !data || data.rounds.length === 0 ? (
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#1b2024] bg-[#060809] px-6 py-16 text-center">
          <Trophy className="h-9 w-9" aria-hidden style={{ color: GOLD }} />
          <p className="max-w-md text-pretty font-sans text-[#9a9891]">
            O ranking aparece aqui assim que a primeira rodada for apurada. Volte em breve.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 md:grid-cols-2">
            {data.rounds.map((r, i) => (
              <RoundCard key={r.id} round={r} index={i} inView={inView} reduce={reduce} />
            ))}
          </div>
          <p className="mt-6 font-sans text-xs leading-relaxed text-[#5f5e58]">
            Pontuação consolidada pelos palpites de cada rodada. A classificação é atualizada automaticamente
            ao fim de cada janela de jogos.
          </p>
        </>
      )}
    </div>
  )
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

  const [allMatches, setAllMatches] = useState<Match[]>([])
  const [loading, setLoading] = useState(true)
  const [offline, setOffline] = useState(false)
  const [todayKey, setTodayKey] = useState<string>(() => getTodayKey(new Date()))
  const [now, setNow] = useState(() => new Date())

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

  const todayLabel = useMemo(() => formatTodayLabel(now), [now])

  return (
    <section
      ref={sectionRef}
      id="copa-dos-traders"
      aria-labelledby="copa-heading"
      className="relative overflow-hidden bg-[#020303] py-24 md:py-32"
    >
      <StadiumBackground />

      <div className="absolute inset-x-0 top-0 z-[5]">
        <TricolorLine inView={inView} reduce={reduce} />
      </div>

      <div className="relative z-[6] mx-auto max-w-6xl px-4 md:px-6">
        {/* ───── BLOCO 1 — ABERTURA ───── */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <Kicker>Campeonato oficial · Amigos da Mesa</Kicker>
          </motion.div>

          <motion.h2
            id="copa-heading"
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6, ease: "easeOut" }}
            className="mt-6 font-display text-5xl font-bold uppercase leading-[0.92] tracking-[-0.03em] text-[#f7f5ee] md:text-7xl"
          >
            Copa dos <span style={{ color: GOLD }}>Traders</span>
          </motion.h2>

          <motion.p
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-pretty font-sans text-base leading-relaxed text-[#9a9891]"
          >
            Você dá o palpite, a bola rola e o ranking se mexe. Quem lê o jogo melhor leva desconto no
            plano e prêmio em dinheiro — e chega mais perto de operar com o capital da mesa.
          </motion.p>

          <motion.div
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-9 flex justify-center"
          >
            <PrimaryCta href={LINKS.desconto70} large>
              Garantir meu desconto
            </PrimaryCta>
          </motion.div>
        </div>

        {/* ───── BLOCO 2 — DUAS FASES ───── */}
        <div ref={phasesRef} className="mt-24 grid gap-6 md:grid-cols-2 md:gap-8">
          <PhaseCard
            index={0}
            inView={phasesInView}
            reduce={reduce}
            phaseLabel="Fase 1 · Classificatória"
            title="Classificatória"
            dateLabel="11 jun — 12 jul"
            bullets={[
              "Até 70% OFF nos planos participantes",
              "Aberto a todo mundo, sem pegadinha",
              "Pontos pelos palpites nos jogos que a gente seleciona",
              "Ranking TOP 10 acompanhado a campanha inteira",
            ]}
            podium={[
              { rank: 1, marginBRL: 10250, pixBRL: 600 },
              { rank: 2, marginBRL: 4250, pixBRL: 400 },
              { rank: 3, marginBRL: 4250 },
            ]}
            seal="Os 10 primeiros vão para a Grande Final"
            ctaLabel="Entrar na classificatória"
            ctaHref={LINKS.faseClassificatoria}
          />
          <PhaseCard
            index={1}
            inView={phasesInView}
            reduce={reduce}
            phaseLabel="Fase 2 · Grande Final"
            title="Grande Final"
            dateLabel="13 jul — 19 jul"
            bullets={[
              "A semana que decide tudo",
              "Até 70% OFF nos planos participantes",
              "Os últimos jogos definem os vencedores",
              "Ranking atualizado todo dia",
            ]}
            podium={[
              { rank: 1, orMarginBRL: 4250, orPixBRL: 1000 },
              { rank: 2, orMarginBRL: 2500, orPixBRL: 800 },
              { rank: 3, orMarginBRL: 2000, orPixBRL: 500 },
            ]}
            ctaLabel="Ver a grande final"
            ctaHref={LINKS.grandeFinal}
          />
        </div>

        {/* ───── BLOCO 3 — JOGOS DO DIA ───── */}
        <div ref={gamesRef} className="mt-24">
          <div className="mb-8 flex flex-col gap-3 border-b border-[#1b2024] pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Kicker>Partidas de hoje</Kicker>
              <h3 className="mt-4 font-display text-3xl font-bold uppercase tracking-[-0.02em] text-[#f7f5ee] md:text-4xl">
                Jogos do dia
              </h3>
            </div>
            <p className="font-sans text-sm text-[#9a9891] md:text-right">{todayLabel}</p>
          </div>

          {offline && !loading && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#1b2024] bg-[#060809] px-3 py-1.5 font-sans text-xs text-[#9a9891]">
              <Megaphone className="h-3.5 w-3.5" aria-hidden style={{ color: GOLD }} />
              Exibindo programação offline
            </p>
          )}

          {allClosedToday && !loading && (
            <p className="mb-5 inline-flex items-center gap-2 rounded-lg border border-[#1b2024] bg-[#060809] px-3 py-1.5 font-sans text-xs text-[#9a9891]">
              Os palpites de hoje já fecharam. Volte amanhã para os próximos confrontos.
            </p>
          )}

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[0, 1, 2].map((i) => (
                <MatchSkeleton key={i} />
              ))}
            </div>
          ) : todayMatches.length === 0 ? (
            <div className="flex flex-col items-center gap-4 rounded-2xl border border-[#1b2024] bg-[#060809] px-6 py-16 text-center">
              <CalendarDays className="h-9 w-9" aria-hidden style={{ color: GOLD }} />
              <p className="max-w-md text-pretty font-sans text-[#9a9891]">
                Nenhum jogo programado para hoje. A lista vira sozinha à meia-noite com os próximos confrontos.
              </p>
              <PrimaryCta href={LINKS.regulamento}>Ver regulamento</PrimaryCta>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              <motion.div layout key={todayKey} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {todayMatches.map((m, i) => (
                  <MatchCard key={m.id} match={m} reduce={reduce} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>

        {/* ───── BLOCO 4 — RANKING DE RODADAS ───── */}
        <RankingRodadas />
      </div>
    </section>
  )
}
