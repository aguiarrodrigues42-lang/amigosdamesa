"use client"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Clock, Flame } from "lucide-react"

export function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 8, seconds: 0 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { minutes, seconds } = prev
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 8
            seconds = 0
          }
        }
        return { minutes, seconds }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  const totalSeconds = timeLeft.minutes * 60 + timeLeft.seconds
  const isUrgent = totalSeconds < 180

  return (
    <section className="relative py-14 md:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/90 via-orange-950/70 to-red-950/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_oklch(0.5_0.2_30/0.15)_0%,_transparent_70%)]" />

      <div className="container relative mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">

          {/* Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full border mb-8 ${isUrgent ? "bg-red-500/25 border-red-500/60 animate-pulse" : "bg-red-500/15 border-red-500/40"}`}>
            <Flame className="w-4 h-4 text-red-400" />
            <span className="font-black text-red-400 uppercase tracking-widest text-xs">
              Oferta por tempo limitado
            </span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-5xl font-black mb-3 text-foreground tracking-tight">
            Desconto expira em
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-8 max-w-md mx-auto">
            Garanta seu plano com o melhor valor antes que o tempo acabe.
          </p>

          {/* Timer */}
          <div className="flex justify-center items-center gap-3 md:gap-5 mb-4">
            {/* Minutes */}
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center border-2 backdrop-blur-sm transition-all duration-300 ${isUrgent ? "bg-red-600/30 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "bg-card/60 border-primary/40"
              }`}>
              <span className={`text-4xl md:text-6xl font-black tabular-nums leading-none ${isUrgent ? "text-red-400" : "text-primary"}`}>
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">min</span>
            </div>

            <span className={`text-4xl md:text-5xl font-black ${isUrgent ? "text-red-400" : "text-primary"}`}>:</span>

            {/* Seconds */}
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center border-2 backdrop-blur-sm transition-all duration-300 ${isUrgent ? "bg-red-600/30 border-red-500 shadow-[0_0_30px_rgba(239,68,68,0.3)]" : "bg-card/60 border-primary/40"
              }`}>
              <span className={`text-4xl md:text-6xl font-black tabular-nums leading-none ${isUrgent ? "text-red-400" : "text-primary"}`}>
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-[10px] md:text-xs text-muted-foreground font-semibold uppercase tracking-wider mt-1">seg</span>
            </div>
          </div>

          {/* Urgent message */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Clock className="w-4 h-4 text-red-400/80" />
            <p className={`text-sm ${isUrgent ? "text-red-400 font-bold animate-pulse" : "text-muted-foreground"}`}>
              {isUrgent ? "CORRA! Ultimos minutos com desconto" : "Desconto valido apenas hoje. Apos o prazo, valores voltam ao normal."}
            </p>
          </div>

          {/* CTA */}
          <button
            onClick={scrollToPlans}
            className={`
              relative overflow-hidden group
              px-10 py-5 rounded-2xl font-black text-base md:text-lg uppercase tracking-wide
              transition-all duration-300 inline-flex items-center gap-2
              ${isUrgent
                ? "bg-red-600 hover:bg-red-500 text-white shadow-[0_0_40px_rgba(239,68,68,0.4)]"
                : "bg-primary hover:brightness-110 text-primary-foreground shadow-[0_0_30px_oklch(0.7_0.18_45/0.3)]"
              }
            `}
          >
            <span className="relative z-10">GARANTIR ANTES QUE ESGOTE</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <span
              aria-hidden
              className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-white/10 skew-x-[-20deg] transition-transform duration-500"
            />
          </button>

        </div>
      </div>
    </section>
  )
}