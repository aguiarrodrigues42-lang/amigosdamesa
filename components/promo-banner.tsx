"use client"

import { Zap } from "lucide-react"

// Faixa fina de anúncio — fica acima do header fixo
// O header usa top-[32px] para não sobrepor esta barra
export function PromoBanner() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <button
      onClick={scrollToPlans}
      className="
        w-full fixed top-0 left-0 right-0 z-[60]
        flex items-center justify-center gap-2
        bg-primary hover:bg-primary/90 active:bg-primary/80
        py-1.5 px-4 cursor-pointer transition-colors duration-200
        focus:outline-none
      "
      aria-label="Ver planos com desconto"
    >
      <Zap className="w-3.5 h-3.5 text-primary-foreground fill-current shrink-0" />
      <span className="text-primary-foreground text-[11px] sm:text-xs font-black uppercase tracking-widest leading-none">
        Promocao Relampago — Descontos de ate 70% OFF!
      </span>
      <Zap className="w-3.5 h-3.5 text-primary-foreground fill-current shrink-0" />
    </button>
  )
}
