"use client"

import { Zap, Timer, Flame, ArrowDown } from "lucide-react"

export function PromoBanner() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="w-full bg-[#1a0a00] border-b-2 border-primary relative overflow-hidden">
      {/* Pulso de fundo */}
      <div className="absolute inset-0 bg-primary/5 animate-pulse pointer-events-none" />

      {/* Ícones flutuantes de persuasão */}
      <div className="absolute left-2 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2 z-10">
        <Flame className="w-5 h-5 text-primary animate-bounce" style={{ animationDelay: "0s" }} />
        <Zap className="w-4 h-4 text-primary animate-bounce" style={{ animationDelay: "0.3s" }} />
        <Timer className="w-4 h-4 text-primary/70 animate-bounce" style={{ animationDelay: "0.6s" }} />
      </div>
      <div className="absolute right-2 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2 z-10">
        <Flame className="w-5 h-5 text-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
        <Zap className="w-4 h-4 text-primary animate-bounce" style={{ animationDelay: "0.5s" }} />
        <Timer className="w-4 h-4 text-primary/70 animate-bounce" style={{ animationDelay: "0.8s" }} />
      </div>

      {/* Banner clicável */}
      <button
        onClick={scrollToPlans}
        className="w-full cursor-pointer group focus:outline-none"
        aria-label="Ver planos com desconto"
      >
        {/* Faixa superior: PROMOÇÃO RELÂMPAGO */}
        <div className="flex items-center justify-center gap-2 bg-primary py-1 px-4">
          <Zap className="w-4 h-4 text-primary-foreground fill-current" />
          <span className="text-primary-foreground text-xs font-black uppercase tracking-widest">
            Promoção Relâmpago — Tempo Limitado!
          </span>
          <Zap className="w-4 h-4 text-primary-foreground fill-current" />
        </div>

        {/* Imagem do banner */}
        <div className="relative w-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/banner-promocao.png"
            alt="Descontos de até 70% — Amigos da Mesa"
            className="w-full object-cover max-h-[120px] sm:max-h-[160px] md:max-h-[200px] transition-opacity duration-300 group-hover:opacity-90"
          />
          {/* Overlay sutil no hover */}
          <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300" />
        </div>

        {/* Faixa inferior: CTA */}
        <div className="flex items-center justify-center gap-2 bg-primary/10 border-t border-primary/20 py-1.5 px-4 group-hover:bg-primary/20 transition-colors duration-300">
          <ArrowDown className="w-3.5 h-3.5 text-primary animate-bounce" />
          <span className="text-primary text-xs font-bold uppercase tracking-wider">
            Clique e aproveite agora
          </span>
          <ArrowDown className="w-3.5 h-3.5 text-primary animate-bounce" />
        </div>
      </button>
    </div>
  )
}
