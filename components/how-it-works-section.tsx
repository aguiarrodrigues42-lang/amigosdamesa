"use client"

import { ArrowRight, LogIn, BookOpen, Target, BarChart3 } from "lucide-react"

export function HowItWorksSection() {
  const steps = [
    {
      icon: LogIn,
      number: "01",
      title: "Entrada",
      description: "Escolha seu plano e acesse imediatamente a plataforma. Você receberá todas as instruções para começar."
    },
    {
      icon: BookOpen,
      number: "02",
      title: "Preparação",
      description: "Participe das análises pré-mercado. Entenda o contexto do dia, setups possíveis e pontos de atenção."
    },
    {
      icon: Target,
      number: "03",
      title: "Execução",
      description: "Opere ao lado de traders experientes. Acompanhe operações em tempo real e execute com confiança."
    },
    {
      icon: BarChart3,
      number: "04",
      title: "Revisão",
      description: "Revise suas operações, identifique erros e acertos. Aprenda com a experiência coletiva da mesa."
    }
  ]

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Como Funciona a <span className="text-primary">Mesa</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Um fluxo claro e estruturado para você operar com profissionalismo.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative group">
                <div className="p-6 rounded-2xl bg-card border border-border h-full hover:border-primary/50 transition-all duration-300">
                  <div className="text-5xl font-bold text-primary/20 mb-4">{step.number}</div>
                  <div className="p-3 rounded-xl bg-primary/10 text-primary w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
                {i < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">09:00</div>
            <p className="text-sm text-muted-foreground">Análise Pré-Mercado</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">10:00 - 17:00</div>
            <p className="text-sm text-muted-foreground">Operações ao Vivo</p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl font-bold text-primary mb-2">17:30</div>
            <p className="text-sm text-muted-foreground">Revisão do Dia</p>
          </div>
        </div>
      </div>
    </section>
  )
}
