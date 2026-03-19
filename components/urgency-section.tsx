"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle, Clock, Users, ArrowRight } from "lucide-react"

export function UrgencySection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 23,
    minutes: 59,
    seconds: 59
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            } else {
              hours = 23
              if (days > 0) {
                days--
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-16 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 border-y border-primary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 text-primary mb-6">
            <AlertCircle className="w-5 h-5" />
            <span className="font-semibold uppercase tracking-wider text-sm">Oferta por Tempo Limitado</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-foreground text-balance">
            Vagas Limitadas para Esta Turma
          </h2>

          <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
            <Users className="w-5 h-5 text-primary" />
            <span>Restam apenas <strong className="text-primary">12 vagas</strong> para o plano Pro</span>
          </div>

          {/* Countdown Timer */}
          <div className="flex justify-center gap-4 mb-8">
            {[
              { value: timeLeft.days, label: "Dias" },
              { value: timeLeft.hours, label: "Horas" },
              { value: timeLeft.minutes, label: "Min" },
              { value: timeLeft.seconds, label: "Seg" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-card border border-border rounded-xl flex items-center justify-center">
                  <span className="text-2xl md:text-3xl font-bold text-primary">
                    {String(item.value).padStart(2, '0')}
                  </span>
                </div>
                <span className="text-xs text-muted-foreground mt-2">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-8">
            <Clock className="w-4 h-4" />
            <span>Após este período, os preços serão reajustados</span>
          </div>

          <Button 
            size="lg" 
            onClick={scrollToPlans}
            className="text-lg px-10 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
          >
            GARANTIR MINHA VAGA AGORA
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </div>
    </section>
  )
}
