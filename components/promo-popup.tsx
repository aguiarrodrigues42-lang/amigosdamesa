"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { X } from "lucide-react"
import confetti from "canvas-confetti"

const POPUP_IMAGE = "/images/popup-70-off-planos.png"

// CBF palette for the confetti burst
const BRAZIL_COLORS = ["#009C3B", "#FFD500", "#2B2D7F", "#FFFFFF", "#3B43B8"]

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  const confettiCanvasRef = useRef<HTMLCanvasElement | null>(null)

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimatingOut(false)
    }, 220)
  }, [])

  const goToPlans = () => {
    handleClose()
    setTimeout(() => {
      document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
    }, 280)
  }

  // Open immediately, once per session
  useEffect(() => {
    if (sessionStorage.getItem("promoVslShown")) return
    sessionStorage.setItem("promoVslShown", "true")
    setIsOpen(true)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) handleClose()
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [isOpen, handleClose])

  // Realistic Brazil-colored confetti burst when the popup opens
  useEffect(() => {
    if (!isOpen || !confettiCanvasRef.current) return

    const myConfetti = confetti.create(confettiCanvasRef.current, {
      resize: true,
      useWorker: true,
    })

    const fire = (particleRatio: number, opts: confetti.Options) => {
      myConfetti({
        origin: { y: 0.62 },
        colors: BRAZIL_COLORS,
        disableForReducedMotion: true,
        ...opts,
        particleCount: Math.floor(220 * particleRatio),
      })
    }

    // multi-layered burst for an ultra-realistic feel
    fire(0.25, { spread: 26, startVelocity: 55, scalar: 1.1 })
    fire(0.2, { spread: 60, startVelocity: 45 })
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.9 })
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 })
    fire(0.1, { spread: 120, startVelocity: 45 })

    // gentle side cannons shortly after
    const t1 = setTimeout(() => {
      myConfetti({
        particleCount: 60,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.65 },
        colors: BRAZIL_COLORS,
        disableForReducedMotion: true,
      })
      myConfetti({
        particleCount: 60,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.65 },
        colors: BRAZIL_COLORS,
        disableForReducedMotion: true,
      })
    }, 260)

    return () => {
      clearTimeout(t1)
      myConfetti.reset()
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Oferta Amigos da Mesa - 80% de desconto"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isAnimatingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={handleClose} aria-hidden="true" />

      {/* Confetti canvas — covers the whole screen, behind the modal content but above overlay */}
      <canvas
        ref={confettiCanvasRef}
        className="pointer-events-none absolute inset-0 z-[5] h-full w-full"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative z-10 flex max-h-[94svh] w-full flex-col transition-all duration-300 ${
          isAnimatingOut ? "opacity-0 scale-95" : "opacity-100 scale-100 animate-in fade-in zoom-in-95"
        }`}
        style={{ maxWidth: "400px" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-black/80 text-white shadow-lg ring-1 ring-white/15 transition-colors hover:bg-black"
          aria-label="Fechar"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Promo image — clicking anywhere takes the user to the plans */}
        <button
          onClick={goToPlans}
          className="block w-full cursor-pointer overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]"
          aria-label="Garantir minha vaga — ver planos"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={POPUP_IMAGE || "/placeholder.svg"}
            alt="Amigos da Mesa — Promoção 80% de desconto, válida apenas hoje. Preços promocionais nos planos de Exames, Pegue e Monte e Sênior. Quero aproveitar agora."
            className="h-auto max-h-[90svh] w-full object-contain"
          />
        </button>
      </div>
    </div>
  )
}
