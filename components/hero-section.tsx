"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown, TrendingUp, TrendingDown } from "lucide-react"

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
  const [tick, setTick] = useState(0)

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
    <section className="relative min-h-screen flex flex-col overflow-hidden bg-[#0c0c0c]">

      {/* ── Live ticker bar ─────────────────────────────── */}
      <div className="absolute top-[calc(100vw*0.14+64px)] md:top-[calc(100vw*0.14+80px)] left-0 right-0 z-20 overflow-hidden h-9 bg-black/60 border-b border-white/5 backdrop-blur-sm">
        <div
          ref={trackRef}
          className="flex items-center gap-8 whitespace-nowrap"
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

      {/* ── Background image ────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amigos%20da%20mesa%201-tyClHdDkYHJw3zqwhrxvUGOavbyAb2.jpeg"
          alt=""
          className="w-full h-full object-cover object-top"
          aria-hidden="true"
        />
        {/* Dark overlay — heavier on left for text, lighter on right */}
        <div className="absolute inset-0 bg-[#0c0c0c]/60 md:bg-gradient-to-r md:from-[#0c0c0c]/90 md:via-[#0c0c0c]/60 md:to-[#0c0c0c]/30" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
      </div>

      {/* ── Animated grid lines (decorative) ───────────── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* ── Red accent glow bottom-left ──────────────────── */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] z-[1] pointer-events-none"
        style={{ background: "radial-gradient(circle at 0% 100%, oklch(0.7 0.18 45 / 0.18) 0%, transparent 65%)" }} />

      {/* ── Content ─────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container mx-auto px-4 pt-[calc(100vw*0.14+120px)] pb-20 md:pt-[calc(100vw*0.14+140px)]">
        <div className="max-w-2xl">

          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full border border-primary/40 bg-primary/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs font-bold uppercase tracking-widest">Mesa Proprietária Aberta</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 text-balance">
            Pare de operar com{" "}
            <span className="text-primary">pouco capital</span>{" "}
            e risco próprio
          </h1>

          {/* Sub */}
          <p className="text-base md:text-lg text-white/60 mb-10 max-w-xl leading-relaxed text-pretty">
            Aqui você opera com o capital da mesa e fica com 90% ou 100% dos lucros.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Button
              size="lg"
              onClick={scrollToPlans}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base px-8 py-6 group"
            >
              QUERO MEU PLANO
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToNext}
              className="border-white/20 text-white hover:bg-white/10 font-semibold text-base px-8 py-6"
            >
              Como funciona
            </Button>
          </div>

          {/* Stats bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <div key={i} className="border-l-2 border-primary/60 pl-3">
                <p className="text-xl font-black text-white">{s.value}</p>
                <p className="text-xs text-white/40 leading-tight">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Scroll cue ──────────────────────────────────── */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 text-white/30 hover:text-white/60 transition-colors"
        aria-label="Rolar para baixo"
      >
        <span className="text-[10px] uppercase tracking-widest">scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </button>
    </section>
  )
}
