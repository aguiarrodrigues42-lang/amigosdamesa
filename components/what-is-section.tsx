"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, XCircle, Building2, Users, Target, LineChart } from "lucide-react"

export function WhatIsSection() {
  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            O que é uma <span className="text-primary">Mesa Proprietária</span>?
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Uma mesa proprietária é um ambiente profissional de trading onde você opera com estrutura, 
            disciplina e apoio de uma comunidade focada em resultados consistentes.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-10 h-10 text-primary" />
                <h3 className="text-2xl font-bold text-foreground">Como Funciona</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "Acesso a salas de operação em tempo real",
                  "Estratégias validadas e testadas pelo mercado",
                  "Análises diárias e preparação para o pregão",
                  "Revisão de operações para aprendizado contínuo",
                  "Comunidade ativa de traders profissionais"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <XCircle className="w-10 h-10 text-destructive" />
                <h3 className="text-2xl font-bold text-foreground">O Que NÃO Somos</h3>
              </div>
              <ul className="space-y-4">
                {[
                  "NÃO somos um curso de trading",
                  "NÃO somos um grupo de sinais",
                  "NÃO prometemos ganhos garantidos",
                  "NÃO operamos por você",
                  "NÃO aceitamos traders sem compromisso"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="bg-card/50 border-border/50 text-center p-6">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Comunidade Real</h4>
            <p className="text-sm text-muted-foreground">
              Traders que compartilham experiências, erros e acertos para crescer juntos.
            </p>
          </Card>
          <Card className="bg-card/50 border-border/50 text-center p-6">
            <Target className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Foco em Consistência</h4>
            <p className="text-sm text-muted-foreground">
              Nosso objetivo é consistência, não promessas de enriquecimento rápido.
            </p>
          </Card>
          <Card className="bg-card/50 border-border/50 text-center p-6">
            <LineChart className="w-12 h-12 text-primary mx-auto mb-4" />
            <h4 className="font-semibold text-foreground mb-2">Método Validado</h4>
            <p className="text-sm text-muted-foreground">
              Estratégias testadas e refinadas ao longo de anos de operação real.
            </p>
          </Card>
        </div>
      </div>
    </section>
  )
}
