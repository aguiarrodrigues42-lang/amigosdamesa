"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X, Sparkles } from "lucide-react"

export function PricingSection() {
  const plans = [
    {
      name: "Starter",
      price: "197",
      period: "/mês",
      description: "Para quem quer começar com estrutura",
      popular: false,
      features: [
        { text: "Acesso à sala de operações", included: true },
        { text: "Análise pré-mercado diária", included: true },
        { text: "Comunidade no Discord", included: true },
        { text: "Estratégias básicas", included: true },
        { text: "Operações ao vivo", included: false },
        { text: "Mentoria individual", included: false },
        { text: "Acesso ao grupo VIP", included: false },
        { text: "Revisão de operações", included: false }
      ]
    },
    {
      name: "Pro",
      price: "397",
      period: "/mês",
      description: "Para traders comprometidos com consistência",
      popular: true,
      features: [
        { text: "Tudo do plano Starter", included: true },
        { text: "Operações ao vivo", included: true },
        { text: "Estratégias avançadas", included: true },
        { text: "Revisão de operações semanal", included: true },
        { text: "Acesso ao grupo VIP", included: true },
        { text: "Suporte prioritário", included: true },
        { text: "Mentoria individual", included: false },
        { text: "Consultoria de carteira", included: false }
      ]
    },
    {
      name: "Elite",
      price: "797",
      period: "/mês",
      description: "Para quem quer ir além",
      popular: false,
      features: [
        { text: "Tudo do plano Pro", included: true },
        { text: "Mentoria individual mensal", included: true },
        { text: "Consultoria de carteira", included: true },
        { text: "Acesso antecipado a novidades", included: true },
        { text: "Grupo exclusivo de Elite", included: true },
        { text: "Análises personalizadas", included: true },
        { text: "Suporte 24/7", included: true },
        { text: "Encontros presenciais", included: true }
      ]
    }
  ]

  return (
    <section id="planos" className="py-24 bg-secondary/30 scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/10">
            <Sparkles className="w-4 h-4 mr-2" />
            Escolha o Plano Ideal Para Você
          </Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Planos e <span className="text-primary">Preços</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Investimento que se paga com apenas algumas operações bem feitas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <Card 
              key={i}
              className={`relative bg-card border-2 transition-all duration-300 hover:scale-105 ${
                plan.popular 
                  ? 'border-primary shadow-lg shadow-primary/20' 
                  : 'border-border hover:border-primary/50'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    Mais Popular
                  </Badge>
                </div>
              )}
              <CardHeader className="pt-8 pb-4 text-center">
                <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
                <div className="mt-4">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-5xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3">
                      {feature.included ? (
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      ) : (
                        <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                      )}
                      <span className={feature.included ? 'text-foreground' : 'text-muted-foreground/50'}>
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full py-6 text-lg font-semibold ${
                    plan.popular 
                      ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                      : 'bg-secondary hover:bg-secondary/80 text-foreground'
                  }`}
                >
                  ENTRAR AGORA
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <p className="text-center mt-8 text-sm text-muted-foreground">
          Garantia de 7 dias. Cancele quando quiser. Sem complicação.
        </p>
      </div>
    </section>
  )
}
