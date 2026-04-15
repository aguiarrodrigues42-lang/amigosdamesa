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

      {/* Popup card - largura adequada para imagem vertical */}
      <div className="relative z-10 w-full max-w-sm max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-300">
        {/* Botao X */}
        <button
          onClick={handleClose}
          className="absolute top-1 right-1 z-20 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center text-white transition-colors"
          aria-label="Fechar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="rounded-2xl overflow-hidden shadow-2xl border border-primary/30 bg-background">
          {/* Faixa superior */}
          <div className="flex items-center justify-center gap-2 bg-primary py-2 px-4">
            <Flame className="w-4 h-4 text-primary-foreground" />
            <span className="text-primary-foreground text-xs font-bold uppercase tracking-wide">
              Oferta por tempo limitado
            </span>
            <Flame className="w-4 h-4 text-primary-foreground" />
          </div>

          {/* Imagem completa sem corte */}
          <button onClick={handleClick} className="w-full cursor-pointer group block">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/promo-popup.png"
              alt="Ate 70% OFF - Amigos da Mesa"
              className="w-full h-auto group-hover:brightness-105 transition-all duration-200"
            />
          </button>

          {/* Rodape com CTA */}
          <div className="p-4 space-y-3">
            {/* Badges */}
            <div className="flex items-center justify-center gap-5">
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-red-500">
                <AlertTriangle className="w-4 h-4" />
                Poucas vagas
              </span>
              <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-primary">
                <Clock className="w-4 h-4" />
                Encerra em breve
              </span>
            </div>

            {/* Botao CTA */}
            <button
              onClick={handleClick}
              className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-sm uppercase tracking-wide transition-colors shadow-lg"
            >
              Quero aproveitar agora
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
