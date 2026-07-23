"use client"

import { Target, Users, TrendingUp, Brain, Clock, Shield } from "lucide-react"
import { CinematicBackground } from "@/components/cinematic"

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

export function BenefitsSection() {
  return (
    <section className="relative py-20 bg-background overflow-hidden">
      <CinematicBackground variant="green" particles={false} />
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Vantagens de Elite</span>
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold uppercase text-foreground text-balance tracking-tight">
            Por que traders escolhem a <span className="text-gold-gradient">mesa</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon
            return (
              <div
                key={i}
                className="group relative glass-card border border-gold/15 rounded-2xl p-6 hover:border-gold/45 transition-all hover:-translate-y-1 duration-300 overflow-hidden"
              >
                <span aria-hidden className="absolute top-4 right-5 font-display text-4xl font-bold text-gold/10 group-hover:text-gold/20 transition-colors">{String(i + 1).padStart(2, "0")}</span>
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-12 h-12 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
