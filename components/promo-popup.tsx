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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Popup */}
      <div className="relative z-10 w-full max-w-[300px] animate-in fade-in zoom-in-95 duration-300">
        {/* Botao fechar */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-20 w-7 h-7 rounded-full bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white transition-colors shadow-lg"
          aria-label="Fechar popup"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Imagem clicável */}
        <button
          onClick={handleClick}
          className="block w-full rounded-2xl overflow-hidden shadow-2xl border border-orange-500/40 cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500"
          aria-label="Ver planos - Fazer upgrade agora"
        >
          <Image
            src="/images/popup-upgrade.jpg"
            alt="Upgrade Iniciante para Intermediário 15 por apenas +R$60"
            width={600}
            height={900}
            className="w-full h-auto"
            priority
          />
        </button>
      </div>
    </div>
  )
}
