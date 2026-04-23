"use client"

import { useState, useEffect } from "react"
import { X, CheckCircle2 } from "lucide-react"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 800)
    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => setIsOpen(false)

  const handleCTA = () => {
    setIsOpen(false)
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-[320px] animate-in fade-in zoom-in-95 duration-300">
        {/* Botao fechar */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-20 w-7 h-7 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white transition-colors shadow-lg"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Card principal */}
        <div
          className="rounded-2xl overflow-hidden shadow-2xl border border-orange-500/40"
          style={{
            background: "linear-gradient(160deg, #0d0d0d 0%, #1a0f00 50%, #0d0d0d 100%)",
          }}
        >
          {/* Topo: ESPERE! */}
          <div className="pt-5 pb-2 px-5 text-center">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">
              ESPERE!
            </h2>
            <p className="text-orange-400 text-sm font-semibold mt-1 leading-snug">
              Aumente drasticamente suas chances de aprovação
            </p>
          </div>

          {/* Card de oferta */}
          <div className="mx-4 mb-4 rounded-xl border border-orange-500/50 bg-black/60 p-4">
            <p className="text-white text-sm font-black uppercase leading-tight text-center">
              UPGRADE INICIANTE 7 &rarr; INTERMEDIÁRIO 15
            </p>
            <p className="text-orange-400 text-2xl font-black text-center mt-1">
              por apenas +R$60
            </p>

            {/* Benefícios */}
            <ul className="mt-3 space-y-2">
              {[
                "Mais margem para operar",
                "Mais segurança no seu capital",
                "Mais chance de aprovação no exame",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-white text-xs font-medium leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="px-4 pb-4 space-y-2">
            <button
              onClick={handleCTA}
              className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-400 text-white font-black text-sm uppercase tracking-wide transition-colors shadow-lg"
            >
              FAZER UPGRADE AGORA
            </button>
            <p className="text-center text-zinc-400 text-[11px] italic">
              Oferta exclusiva por tempo limitado
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
