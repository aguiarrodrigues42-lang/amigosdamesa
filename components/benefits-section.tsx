"use client"

import { Card, CardContent } from "@/components/ui/card"
import { 
  Layout, 
  Users, 
  Brain, 
  Eye, 
  Calendar,
  Trophy
} from "lucide-react"

export function BenefitsSection() {
  const benefits = [
    {
      icon: Layout,
      title: "Operar com Estrutura",
      description: "Esqueça o improviso. Tenha um método claro, com regras definidas e um plano para cada dia de operação."
    },
    {
      icon: Users,
      title: "Comunidade Ativa",
      description: "Conecte-se com traders que têm os mesmos objetivos. Troque experiências, tire dúvidas e cresça junto."
    },
    {
      icon: Brain,
      title: "Controle Emocional",
      description: "Reduza erros emocionais operando em grupo. A pressão diminui quando você não está sozinho."
    },
    {
      icon: Eye,
      title: "Clareza Operacional",
      description: "Saiba exatamente o que fazer a cada momento. Sem dúvidas, sem hesitação, sem improviso."
    },
    {
      icon: Calendar,
      title: "Rotina Profissional",
      description: "Adote a rotina de um trader de verdade. Horários definidos, preparação antes, revisão depois."
    },
    {
      icon: Trophy,
      title: "Resultados Consistentes",
      description: "Foque no processo e os resultados virão. Nossa metodologia é comprovada ao longo de anos."
    }
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Por que a <span className="text-primary">Mesa PRO</span>?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Benefícios reais para traders que querem evoluir de verdade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, i) => (
            <Card 
              key={i} 
              className="bg-card border-border hover:border-primary/50 transition-all duration-300 group"
            >
              <CardContent className="p-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <benefit.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
