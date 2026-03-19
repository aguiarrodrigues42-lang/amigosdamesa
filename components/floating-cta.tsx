"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, Zap } from "lucide-react"

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPulsing, setIsPulsing] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const pulseInterval = setInterval(() => {
      setIsPulsing(true)
      setTimeout(() => setIsPulsing(false), 1000)
    }, 5000)
    return () => clearInterval(pulseInterval)
  }, [])

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex flex-col gap-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button
        onClick={scrollToTop}
        className="p-3 bg-secondary border border-border rounded-full shadow-lg hover:bg-secondary/80 transition-all hover:scale-110"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5 text-foreground" />
      </button>
      <Button
        onClick={scrollToPlans}
        className={`bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl shadow-primary/40 px-6 py-6 transition-all duration-300 ${isPulsing ? 'scale-110' : 'scale-100'}`}
      >
        <Zap className="w-4 h-4 mr-2" />
        VER PLANOS
      </Button>
    </div>
  )
}
