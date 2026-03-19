"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertTriangle, ArrowRight, Flame, Clock } from "lucide-react"

export function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    minutes: 29,
    seconds: 59
  })

  const [pulse, setPulse] = useState(false)

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
            // Reset to 30 minutes when it reaches 0
            minutes = 29
            seconds = 59
          }
        }
        
        return { minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const pulseTimer = setInterval(() => {
      setPulse(true)
      setTimeout(() => setPulse(false), 500)
    }, 3000)
    return () => clearInterval(pulseTimer)
  }, [])

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  const isUrgent = timeLeft.minutes < 10

  return (
    <section className="py-12 md:py-16 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-950/80 via-orange-950/60 to-red-950/80" />
      <div className={`absolute inset-0 bg-gradient-to-r from-primary/30 to-red-600/30 transition-opacity duration-500 ${pulse ? 'opacity-100' : 'opacity-0'}`} />
      
      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-2 h-2 bg-primary/40 rounded-full animate-pulse"
            style={{
              left: `${15 + i * 15}%`,
              top: `${20 + (i % 3) * 25}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + i * 0.3}s`
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Urgency badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 border border-red-500/50 mb-6 transition-all duration-300 ${pulse ? 'scale-105' : 'scale-100'}`}>
            <AlertTriangle className={`w-5 h-5 text-red-400 ${isUrgent ? 'animate-bounce' : ''}`} />
            <span className="font-bold text-red-400 uppercase tracking-wider text-sm">
              Planos Esgotando
            </span>
            <Flame className="w-5 h-5 text-orange-400 animate-pulse" />
          </div>

          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Planos esgotam em
          </h2>

          {/* Main Countdown - More prominent */}
          <div className="flex justify-center items-center gap-3 md:gap-6 mb-6">
            <div className={`relative transition-transform duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center border-2 ${
                isUrgent 
                  ? 'bg-red-600/30 border-red-500 shadow-lg shadow-red-500/30' 
                  : 'bg-card/80 border-primary/50 shadow-lg shadow-primary/20'
              }`}>
                <span className={`text-5xl md:text-6xl font-black ${isUrgent ? 'text-red-400' : 'text-primary'}`}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-medium">
                minutos
              </span>
            </div>

            <span className={`text-5xl md:text-6xl font-black ${isUrgent ? 'text-red-400 animate-pulse' : 'text-primary'}`}>:</span>

            <div className={`relative transition-transform duration-300 ${pulse ? 'scale-110' : 'scale-100'}`}>
              <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center border-2 ${
                isUrgent 
                  ? 'bg-red-600/30 border-red-500 shadow-lg shadow-red-500/30' 
                  : 'bg-card/80 border-primary/50 shadow-lg shadow-primary/20'
              }`}>
                <span className={`text-5xl md:text-6xl font-black ${isUrgent ? 'text-red-400' : 'text-primary'} tabular-nums`}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-muted-foreground font-medium">
                segundos
              </span>
            </div>
          </div>

          {/* Warning message */}
          <div className="flex items-center justify-center gap-2 text-red-400/90 mb-8 mt-10">
            <Clock className="w-4 h-4" />
            <p className="text-sm md:text-base">
              {isUrgent 
                ? "CORRA! Últimos minutos com esse valor promocional" 
                : "Após este período, os valores voltam ao normal"}
            </p>
          </div>

          <Button 
            size="lg" 
            onClick={scrollToPlans}
            className={`text-lg px-10 py-7 font-bold group transition-all duration-300 ${
              isUrgent 
                ? 'bg-red-600 hover:bg-red-500 animate-pulse' 
                : 'bg-primary hover:bg-primary/90'
            } text-primary-foreground shadow-xl`}
          >
            GARANTIR ANTES QUE ESGOTE
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
