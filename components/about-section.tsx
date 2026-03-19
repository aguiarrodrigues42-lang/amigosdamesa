"use client"

import { Target, Users, TrendingUp, Shield, ChevronRight } from "lucide-react"

const features = [
  {
    icon: Target,
    title: "Ambiente Estruturado",
    description: "Opera com regras claras, metas definidas e gestão de risco profissional."
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Troque experiências com traders que buscam o mesmo objetivo que você."
  },
  {
    icon: TrendingUp,
    title: "Evolução Contínua",
    description: "Fases de teste, simulador remunerado e conta real para sua progressão."
  },
  {
    icon: Shield,
    title: "Gestão de Risco",
    description: "Proteja seu capital com regras operacionais e limites bem definidos."
  }
]

export function AboutSection() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="sobre" className="py-20 bg-secondary/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">
            O que é a <span className="text-primary">Mesa Proprietária</span>?
          </h2>
          <p className="text-muted-foreground text-lg text-pretty">
            Uma mesa proprietária oferece capital, estrutura e suporte para traders 
            operarem Day Trade de forma profissional, com foco em consistência e resultados reais.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-14">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div 
                key={i}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/50 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-6">
            A relação entre a mesa e o trader é de prestação de serviços, com regras próprias 
            de avaliação, operação e repasse de resultados.
          </p>
          <button 
            onClick={scrollToPlans}
            className="inline-flex items-center text-primary hover:underline font-medium"
          >
            Ver planos disponíveis
            <ChevronRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </section>
  )
}
