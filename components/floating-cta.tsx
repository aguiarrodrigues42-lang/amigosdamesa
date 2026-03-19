"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowUp, Zap } from "lucide-react"

export function FloatingCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <button
        onClick={scrollToTop}
        className="p-3 bg-secondary border border-border rounded-full shadow-lg hover:bg-secondary/80 transition-colors"
        aria-label="Voltar ao topo"
      >
        <ArrowUp className="w-5 h-5 text-foreground" />
      </button>
      <Button
        onClick={scrollToPlans}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-xl px-6 py-6"
      >
        <Zap className="w-4 h-4 mr-2" />
        VER PLANOS
      </Button>
    </div>
  )
}
