"use client"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import Image from "next/image"

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-[260px] animate-in fade-in zoom-in-95 duration-300">
        {/* Botao fechar */}
        <button
          onClick={handleClose}
          className="absolute -top-2.5 -right-2.5 z-20 w-6 h-6 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white transition-colors shadow-lg"
          aria-label="Fechar popup"
        >
          <X className="w-3.5 h-3.5" />
        </button>

        {/* Imagem clicavel */}
        <button
          onClick={handleClick}
          className="block w-full rounded-xl overflow-hidden shadow-2xl border border-orange-500/30 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 hover:scale-[1.02] transition-transform duration-200"
          aria-label="Ver planos - Fazer upgrade agora"
        >
          <Image
            src="/images/popup-upgrade.jpg"
            alt="Upgrade Iniciante para Intermediario 15 por apenas +R$60"
            width={260}
            height={462}
            className="w-full h-auto"
            priority
          />
        </button>
      </div>
    </div>
  )
}