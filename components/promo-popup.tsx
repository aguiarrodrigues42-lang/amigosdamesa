"use client"

import { useState, useEffect } from "react"
import { X, Flame, Clock, AlertTriangle } from "lucide-react"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Pequeno delay para o popup aparecer suavemente após carregar
    const timer = setTimeout(() => setIsOpen(true), 500)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)

  const handleClickImage = () => {
    setIsOpen(false)
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay escuro */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Card do popup */}
      <div className="relative z-10 max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
        {/* Botao X para fechar */}
        <button
          onClick={handleClose}
          className="
            absolute -top-3 -right-3 z-20
            w-10 h-10 rounded-full
            bg-background border-2 border-primary
            flex items-center justify-center
            text-primary hover:bg-primary hover:text-primary-foreground
            transition-colors duration-200 shadow-lg
          "
          aria-label="Fechar popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Faixa superior persuasiva */}
        <div className="bg-primary rounded-t-xl px-4 py-2 flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 text-primary-foreground animate-pulse" />
          <span className="text-primary-foreground text-xs font-black uppercase tracking-wider">
            Oferta por tempo limitado
          </span>
          <Flame className="w-4 h-4 text-primary-foreground animate-pulse" />
        </div>

        {/* Imagem clicavel */}
        <button
          onClick={handleClickImage}
          className="w-full cursor-pointer group focus:outline-none"
          aria-label="Ver planos com desconto"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/promo-popup.png"
            alt="Promocao ate 70% OFF - Amigos da Mesa"
            className="w-full object-cover group-hover:opacity-95 transition-opacity duration-200"
          />
        </button>

        {/* Faixa inferior com urgencia */}
        <div className="bg-[#1a0a00] rounded-b-xl border-t border-primary/30 px-4 py-3">
          {/* Badges de escassez */}
          <div className="flex items-center justify-center gap-4 mb-2">
            <div className="flex items-center gap-1.5 text-primary">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wide">Poucas vagas</span>
            </div>
            <div className="flex items-center gap-1.5 text-primary">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-bold uppercase tracking-wide">Encerra em breve</span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={handleClickImage}
            className="
              w-full py-2.5 rounded-lg
              bg-primary hover:bg-primary/90 active:bg-primary/80
              text-primary-foreground font-bold text-sm uppercase tracking-wide
              transition-colors duration-200
            "
          >
            Quero aproveitar agora
          </button>
        </div>
      </div>
    </div>
  )
}
