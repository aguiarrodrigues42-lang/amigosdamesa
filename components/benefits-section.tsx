"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, TrendingUp, Brain, Clock, Shield } from "lucide-react"

export function BenefitsSection() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = document.querySelectorAll('[data-benefit-card]')
            cards.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index])
              }, index * 150)
            })
          }
        })
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      icon: Target,
      title: "Estratégias Validadas",
      description: "Setups testados com mais de 1000 operações"
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Traders que se ajudam diariamente"
    },
    {
      icon: TrendingUp,
      title: "Operações ao Vivo",
      description: "Aprenda vendo na prática em tempo real"
    },
    {
      icon: Brain,
      title: "Mentalidade Vencedora",
      description: "Desenvolva o psicológico de um trader"
    },
    {
      icon: Clock,
      title: "Economia de Tempo",
      description: "Chega de procurar setups sozinho"
    },
    {
      icon: Shield,
      title: "Gestão de Risco",
      description: "Proteja seu capital com método"
    }
  ]

  return (
    <section ref={sectionRef} className="py-20 bg-secondary/20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Por que traders escolhem a <span className="text-primary">mesa</span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            const isVisible = visibleCards.includes(i)
            
            return (
              <Card 
                key={i}
                data-benefit-card
                className={`bg-card/50 border-border/50 hover:border-primary/50 transition-all duration-500 group cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
