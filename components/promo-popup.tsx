"use client"

import { useState, useEffect } from "react"
import { X, Flame, Clock, AlertTriangle } from "lucide-react"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)

  const handleClick = () => {
    setIsOpen(false)
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup card - tamanho limitado */}
      <div className="relative z-10 w-full max-w-[340px] animate-in fade-in zoom-in-95 duration-300">
        {/* Botao X */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 z-20 w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-primary transition-colors shadow-lg"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="rounded-xl overflow-hidden shadow-2xl border border-primary/20">
          {/* Faixa superior */}
          <div className="flex items-center justify-center gap-2 bg-primary py-1.5 px-3">
            <Flame className="w-3.5 h-3.5 text-primary-foreground animate-pulse" />
            <span className="text-primary-foreground text-[10px] font-bold uppercase tracking-wide">
              Oferta por tempo limitado
            </span>
            <Flame className="w-3.5 h-3.5 text-primary-foreground animate-pulse" />
          </div>

          {/* Imagem com altura maxima controlada */}
          <button onClick={handleClick} className="w-full cursor-pointer group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/promo-popup.png"
              alt="Ate 70% OFF - Amigos da Mesa"
              className="w-full h-auto max-h-[50vh] object-cover object-top group-hover:brightness-105 transition-all duration-200"
            />
          </button>

          {/* Rodape com CTA */}
          <div className="bg-background p-3 space-y-2.5">
            {/* Badges */}
            <div className="flex items-center justify-center gap-4">
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-red-500">
                <AlertTriangle className="w-3 h-3" />
                Poucas vagas
              </span>
              <span className="flex items-center gap-1 text-[9px] font-semibold uppercase tracking-wide text-primary">
                <Clock className="w-3 h-3" />
                Encerra em breve
              </span>
            </div>

            {/* Botao CTA */}
            <button
              onClick={handleClick}
              className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xs uppercase tracking-wide transition-colors shadow-md"
            >
              Quero aproveitar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
