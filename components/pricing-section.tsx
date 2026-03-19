"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown, Rocket, Star } from "lucide-react"

export function PricingSection() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  const plans = [
    {
      name: "Starter",
      icon: Rocket,
      price: "197",
      originalPrice: "297",
      period: "/mês",
      description: "Para quem quer começar",
      popular: false,
      color: "from-zinc-500 to-zinc-600",
      features: [
        "Acesso à sala de operações",
        "Análise pré-mercado diária",
        "Comunidade no Discord",
        "Estratégias básicas"
      ]
    },
    {
      name: "Pro",
      icon: Crown,
      price: "397",
      originalPrice: "597",
      period: "/mês",
      description: "O mais escolhido",
      popular: true,
      color: "from-primary to-orange-400",
      features: [
        "Tudo do Starter",
        "Operações ao vivo",
        "Estratégias avançadas",
        "Revisão semanal",
        "Acesso VIP",
        "Suporte prioritário"
      ]
    },
    {
      name: "Elite",
      icon: Star,
      price: "797",
      originalPrice: "1.197",
      period: "/mês",
      description: "Mentoria completa",
      popular: false,
      color: "from-yellow-500 to-amber-500",
      features: [
        "Tudo do Pro",
        "Mentoria individual",
        "Consultoria de carteira",
        "Grupo exclusivo Elite",
        "Análises personalizadas",
        "Suporte 24/7"
      ]
    }
  ]

  return (
    <section id="planos" className="py-20 bg-background scroll-mt-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30 bg-primary/10">
            <Sparkles className="w-4 h-4 mr-2" />
            Escolha Seu Plano
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Qual plano combina com você?
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            const isHovered = hoveredPlan === i
            
            return (
              <Card 
                key={i}
                className={`relative bg-card border-2 transition-all duration-500 cursor-pointer ${
                  plan.popular 
                    ? 'border-primary shadow-xl shadow-primary/20 scale-105 z-10' 
                    : 'border-border hover:border-primary/50'
                } ${isHovered && !plan.popular ? 'scale-[1.02]' : ''}`}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-6 py-1.5 text-sm font-bold shadow-lg animate-pulse">
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pt-10 pb-4 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">R$ {plan.originalPrice}</span>
                      <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-0">
                        ECONOMIA
                      </Badge>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-muted-foreground mr-1">R$</span>
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li 
                        key={j} 
                        className="flex items-center gap-3"
                        style={{ 
                          animationDelay: `${j * 50}ms`,
                          opacity: isHovered || plan.popular ? 1 : 0.8
                        }}
                      >
                        <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center flex-shrink-0`}>
                          <Check className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-6 text-base font-bold transition-all duration-300 ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30' 
                        : 'bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground'
                    }`}
                  >
                    QUERO ESTE
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          Garantia de 7 dias. Cancele quando quiser.
        </p>
      </div>
    </section>
  )
}
