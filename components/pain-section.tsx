"use client"

import { AlertTriangle, TrendingDown, Brain, Clock, DollarSign } from "lucide-react"

export function PainSection() {
  const pains = [
    {
      icon: DollarSign,
      title: "Perdendo Dinheiro",
      description: "Você já perdeu mais do que gostaria de admitir? Operações sem estratégia clara que drenam sua conta?"
    },
    {
      icon: Brain,
      title: "Falta de Consistência",
      description: "Um dia ganha, outro perde tudo. O emocional domina e você não consegue manter uma rotina lucrativa?"
    },
    {
      icon: Clock,
      title: "Operando Sozinho",
      description: "Sem ninguém para trocar ideias, validar setups ou te alertar sobre erros antes que eles aconteçam?"
    },
    {
      icon: TrendingDown,
      title: "Falta de Método",
      description: "Pulando de estratégia em estratégia sem nunca dominar nenhuma? Sempre buscando o 'setup perfeito'?"
    }
  ]

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-destructive/30 to-transparent" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 text-destructive mb-4">
            <AlertTriangle className="w-6 h-6" />
            <span className="text-sm font-semibold uppercase tracking-wider">Você se identifica?</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Chega de <span className="text-destructive">Perder Sozinho</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            A maioria dos traders passa por isso. Mas não precisa ser assim.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {pains.map((pain, i) => (
            <div 
              key={i}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-destructive/50 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-destructive-foreground transition-colors">
                  <pain.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{pain.title}</h3>
                  <p className="text-muted-foreground">{pain.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="max-w-2xl mx-auto mt-16 text-center">
          <p className="text-xl text-muted-foreground italic">
            &quot;Se você continuar fazendo o que sempre fez, vai continuar tendo o que sempre teve.&quot;
          </p>
          <p className="mt-4 text-primary font-semibold">
            Está na hora de mudar.
          </p>
        </div>
      </div>
    </section>
  )
}
