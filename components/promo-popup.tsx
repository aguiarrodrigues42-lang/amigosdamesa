"use client"

import { useState, useEffect, useCallback } from "react"
import { X } from "lucide-react"
import Image from "next/image"

export function PromoPopup() {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)

  const handleClose = useCallback(() => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimatingOut(false)
    }, 200)
  }, [])

  const handleClick = () => {
    handleClose()
    setTimeout(() => {
      document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
    }, 250)
  }

  useEffect(() => {
    // Check if already shown this session
    if (sessionStorage.getItem("promoPopupShown")) return

    // Show popup immediately
    sessionStorage.setItem("promoPopupShown", "true")
    setIsOpen(true)
  }, [])

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        handleClose()
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Popup promocional"
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-200 ${
        isAnimatingOut ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/70"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        className={`relative z-10 transition-all duration-300 ${
          isAnimatingOut
            ? "opacity-0 scale-95"
            : "opacity-100 scale-100 animate-in fade-in zoom-in-95"
        }`}
        style={{ maxWidth: "500px", width: "90vw" }}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute -top-3 -right-3 z-20 w-8 h-8 rounded-full bg-black/70 hover:bg-black/90 flex items-center justify-center text-white transition-colors shadow-lg"
          aria-label="Fechar popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image with clickable CTA area */}
        <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <Image
            src="/promo-popup.png"
            alt="Promocao 80% OFF - Amigos da Mesa"
            width={500}
            height={900}
            className="w-full h-auto object-contain"
            style={{ maxHeight: "90vh" }}
            priority
          />
          
          {/* Clickable area over the CTA button (bottom 15% of image) */}
          <button
            onClick={handleClick}
            className="absolute bottom-0 left-0 right-0 h-[18%] cursor-pointer focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
            aria-label="Quero aproveitar agora - Ver planos"
          />
        </div>
      </div>
    </div>
  )
}
