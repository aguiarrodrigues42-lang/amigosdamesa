"use client"

import { Check, X } from "lucide-react"

export function ComparisonSection() {
  const features = [
    { name: "Acesso à sala de operações", starter: true, pro: true, elite: true },
    { name: "Análise pré-mercado diária", starter: true, pro: true, elite: true },
    { name: "Comunidade no Discord", starter: true, pro: true, elite: true },
    { name: "Estratégias básicas", starter: true, pro: true, elite: true },
    { name: "Operações ao vivo", starter: false, pro: true, elite: true },
    { name: "Estratégias avançadas", starter: false, pro: true, elite: true },
    { name: "Revisão de operações", starter: false, pro: true, elite: true },
    { name: "Grupo VIP", starter: false, pro: true, elite: true },
    { name: "Suporte prioritário", starter: false, pro: true, elite: true },
    { name: "Mentoria individual", starter: false, pro: false, elite: true },
    { name: "Consultoria de carteira", starter: false, pro: false, elite: true },
    { name: "Análises personalizadas", starter: false, pro: false, elite: true },
    { name: "Suporte 24/7", starter: false, pro: false, elite: true },
    { name: "Encontros presenciais", starter: false, pro: false, elite: true }
  ]

  const CheckIcon = () => <Check className="w-5 h-5 text-primary mx-auto" />
  const XIcon = () => <X className="w-5 h-5 text-muted-foreground/30 mx-auto" />

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Compare os <span className="text-primary">Planos</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Veja em detalhes o que cada plano oferece.
          </p>
        </div>

        <div className="max-w-4xl mx-auto overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-foreground font-semibold">Recursos</th>
                <th className="p-4 text-center text-foreground font-semibold">Starter</th>
                <th className="p-4 text-center text-primary font-semibold bg-primary/5 rounded-t-xl">Pro</th>
                <th className="p-4 text-center text-foreground font-semibold">Elite</th>
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={i} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 text-muted-foreground">{feature.name}</td>
                  <td className="p-4 text-center">{feature.starter ? <CheckIcon /> : <XIcon />}</td>
                  <td className="p-4 text-center bg-primary/5">{feature.pro ? <CheckIcon /> : <XIcon />}</td>
                  <td className="p-4 text-center">{feature.elite ? <CheckIcon /> : <XIcon />}</td>
                </tr>
              ))}
              <tr className="border-b border-border">
                <td className="p-4 text-foreground font-semibold">Preço</td>
                <td className="p-4 text-center text-foreground font-semibold">R$ 197/mês</td>
                <td className="p-4 text-center text-primary font-bold bg-primary/5">R$ 397/mês</td>
                <td className="p-4 text-center text-foreground font-semibold">R$ 797/mês</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
