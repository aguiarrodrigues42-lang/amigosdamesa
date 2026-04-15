"use client"

import { ArrowDown } from "lucide-react"

export function PromoImageBanner() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToPlans}
      className="w-full block cursor-pointer group focus:outline-none relative"
      aria-label="Ver planos com desconto"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/banner-promocao.png"
        alt="Descontos de até 70% — Amigos da Mesa Prop"
        className="w-full object-cover transition-opacity duration-300 group-hover:opacity-90"
      />
      {/* Overlay hover */}
      <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors duration-300 pointer-events-none" />

      {/* CTA strip */}
      <div className="flex items-center justify-center gap-2 bg-primary/10 border-t border-primary/30 py-2 px-4 group-hover:bg-primary/20 transition-colors duration-300">
        <ArrowDown className="w-3.5 h-3.5 text-primary animate-bounce" />
        <span className="text-primary text-xs font-bold uppercase tracking-wider">
          Clique e aproveite agora
        </span>
        <ArrowDown className="w-3.5 h-3.5 text-primary animate-bounce" />
      </div>
    </button>
  )
}
