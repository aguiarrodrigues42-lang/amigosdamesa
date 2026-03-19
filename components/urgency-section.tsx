"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Clock } from "lucide-react"

export function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({ minutes: 29, seconds: 59 })

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
            minutes = 29
            seconds = 59
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

  const isUrgent = timeLeft.minutes < 10

  return (
    <section className="py-12 md:py-16 bg-gradient-to-r from-red-950/80 via-orange-950/60 to-red-950/80">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 mb-6">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="font-bold text-red-400 uppercase tracking-wider text-sm">
              Planos Esgotando
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-foreground">
            Planos esgotam em
          </h2>

          <div className="flex justify-center items-center gap-3 md:gap-6 mb-8">
            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center border-2 ${
              isUrgent ? 'bg-red-600/30 border-red-500' : 'bg-card/80 border-primary/50'
            }`}>
              <span className={`text-4xl md:text-5xl font-black tabular-nums ${isUrgent ? 'text-red-400' : 'text-primary'}`}>
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-xs text-muted-foreground mt-1">min</span>
            </div>

            <span className={`text-4xl md:text-5xl font-black ${isUrgent ? 'text-red-400' : 'text-primary'}`}>:</span>

            <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex flex-col items-center justify-center border-2 ${
              isUrgent ? 'bg-red-600/30 border-red-500' : 'bg-card/80 border-primary/50'
            }`}>
              <span className={`text-4xl md:text-5xl font-black tabular-nums ${isUrgent ? 'text-red-400' : 'text-primary'}`}>
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-xs text-muted-foreground mt-1">seg</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-2 text-red-400/90 mb-8">
            <Clock className="w-4 h-4" />
            <p className="text-sm md:text-base">
              {isUrgent ? "CORRA! Ultimos minutos com esse valor" : "Apos este periodo, os valores voltam ao normal"}
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={scrollToPlans}
            className={`text-lg px-10 py-7 font-bold ${
              isUrgent ? 'bg-red-600 hover:bg-red-500' : 'bg-primary hover:bg-primary/90'
            } text-primary-foreground`}
          >
            GARANTIR ANTES QUE ESGOTE
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
