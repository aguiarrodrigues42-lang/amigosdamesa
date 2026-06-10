"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, TrendingUp, TrendingDown } from "lucide-react"
import { FlagsBanner } from "@/components/cinematic"

const TICKERS = [
  { symbol: "WIN$", value: "131.420", change: "+0,82%", up: true },
  { symbol: "WDO$", value: "5.867,50", change: "+0,34%", up: true },
  { symbol: "BTC", value: "R$512.340", change: "-1,12%", up: false },
  { symbol: "IBOV", value: "127.854", change: "+1,05%", up: true },
  { symbol: "PETR4", value: "R$38,42", change: "+0,56%", up: true },
  { symbol: "VALE3", value: "R$61,10", change: "-0,28%", up: false },
  { symbol: "WDOF25", value: "5.872,00", change: "+0,41%", up: true },
  { symbol: "WINM25", value: "131.380", change: "+0,78%", up: true },
]

const STATS = [
  { label: "Traders Ativos", value: "20.000+" },
  { label: "Repasses por Quinzena", value: "R$1,5M+" },
  { label: "Taxa de Aprovação", value: "80%" },
  { label: "Desde", value: "2018" },
]

export function HeroSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [, setTick] = useState(0)

  // animate ticker values slightly to simulate live market
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 2500)
    return () => clearInterval(id)
  }, [])

  const scrollToNext = () => {
    document.getElementById("sobre")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-background">

      {/* ── Layer: cinematic stadium environment ─────────── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/wc-stadium-hero.png"
          alt=""
          className="w-full h-full object-cover object-center animate-ken-burns"
          aria-hidden="true"
        />
        {/* Cinematic dark grade — heavier on left for text legibility */}
        <div className="absolute inset-0 bg-background/80 md:bg-gradient-to-r md:from-background md:via-background/85 md:to-background/45" />
        {/* Green ambient from bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-2/3"
          style={{ background: "radial-gradient(ellipse 90% 70% at 30% 120%, oklch(0.56 0.16 152 / 0.22) 0%, transparent 65%)" }} />
        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-56 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Volumetric light beams ───────────────────────── */}
      <div aria-hidden className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 left-[18%] h-[130%] w-48 origin-top rotate-[16deg] blur-3xl animate-beam-sway"
          style={{ background: "linear-gradient(to bottom, oklch(0.86 0.18 95 / 0.18), transparent 70%)" }}
        />
        <div
          className="absolute -top-40 right-[16%] h-[130%] w-52 origin-top -rotate-[14deg] blur-3xl animate-beam-sway"
          style={{ background: "linear-gradient(to bottom, oklch(0.56 0.16 152 / 0.16), transparent 70%)", animationDelay: "3.5s" }}
        />
        <div
          className="absolute -top-40 left-1/2 h-[120%] w-40 origin-top blur-3xl animate-beam-sway"
          style={{ background: "linear-gradient(to bottom, oklch(0.4 0.16 274 / 0.16), transparent 65%)", animationDelay: "1.5s" }}
        />
      </div>

      {/* ── Ambient hanging flags (decorative, behind content) ─ */}
      <FlagsBanner className="absolute -top-4 right-0 w-[55%] md:w-[42%] lg:w-[34%] z-[2] opacity-25 md:opacity-30" />

      {/* ── Floating match ball (decorative, right) ──────── */}
      <div aria-hidden className="absolute right-[6%] top-1/2 -translate-y-1/2 z-[3] hidden lg:block w-64 xl:w-80 animate-cinematic-float">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/wc-ball.png" alt="" className="w-full h-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.6)]" />
      </div>

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-4 pt-32 pb-28 sm:pt-36 md:pt-40 lg:pt-44">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-gold/40 bg-gold/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Edição Copa · Mesa Proprietária Aberta</span>
          </div>

          {/* Headline */}
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[1.02] mb-6 text-balance tracking-tight">
            Pare de operar com{" "}
            <span className="text-gold-gradient">pouco capital</span>{" "}
            e risco próprio
          </h1>

          {/* Sub */}
          <p className="text-base md:text-lg text-white/65 mb-10 max-w-xl leading-relaxed text-pretty">
            Aqui você opera com o capital da mesa e fica com 90% ou 100% dos lucros.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              onClick={scrollToPlans}
              className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base px-8 py-6 group shadow-[0_10px_40px_-10px_oklch(0.56_0.21_263/0.7)]"
            >
              <span className="relative z-10 inline-flex items-center">
                QUERO MEU PLANO
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 skew-x-[-20deg] transition-transform duration-500" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToNext}
              className="border-gold/40 text-white hover:bg-gold/10 hover:border-gold/60 font-semibold text-base px-8 py-6 bg-transparent"
            >
              Como funciona
            </Button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="border-l-2 border-gold/60 pl-3">
                <p className="font-display text-2xl font-bold text-white">{s.value}</p>
                <p className="text-xs text-white/45 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Live ticker bar — anchored to hero bottom (stadium ↔ market bridge) ── */}
      <div className="absolute bottom-8 left-0 right-0 z-20 overflow-hidden h-9 bg-black/70 border-y border-gold/15 backdrop-blur-sm">
        <div
          ref={trackRef}
          className="flex items-center gap-8 whitespace-nowrap h-full"
          style={{ animation: "ticker-scroll 28s linear infinite" }}
        >
          {[...TICKERS, ...TICKERS].map((t, i) => (
            <span key={i} className="inline-flex items-center gap-2 text-xs font-mono">
              <span className="text-white/50">{t.symbol}</span>
              <span className="text-white font-semibold">{t.value}</span>
              <span className={t.up ? "text-emerald-400" : "text-red-400"}>
                {t.up ? <TrendingUp className="inline w-3 h-3" /> : <TrendingDown className="inline w-3 h-3" />}
                {" "}{t.change}
              </span>
              <span className="text-white/10">|</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────── */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-[68px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/30 hover:text-gold/70 transition-colors"
        aria-label="Rolar para baixo"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>

      {/* bottom Brazil tri-band accent */}
      <div aria-hidden className="absolute bottom-0 left-0 right-0 h-1 brazil-band z-20 opacity-80" />
    </section>
  )
}
