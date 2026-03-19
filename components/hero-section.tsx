"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, TrendingUp, Shield, Zap } from "lucide-react"
import Image from "next/image"

export function HeroSection() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/30" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/10">
            <Zap className="w-4 h-4 mr-2" />
            Vagas Limitadas — Última Turma do Ano
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Entre para uma{" "}
            <span className="text-primary">Mesa Proprietária</span>
            {" "}e pare de operar no escuro
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Ambiente estruturado, estratégias validadas e uma comunidade de traders focados em consistência. 
            Chega de operar sozinho e perder dinheiro por falta de método.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              onClick={scrollToPlans}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold group"
            >
              ESCOLHER MEU PLANO
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-6 border-border hover:bg-secondary"
            >
              Saiba Mais
            </Button>
          </div>
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/50">
              <Users className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground">500+</span>
              <span className="text-sm text-muted-foreground">Traders Ativos</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/50">
              <TrendingUp className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground">89%</span>
              <span className="text-sm text-muted-foreground">Taxa de Consistência</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/50">
              <Shield className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground">5 Anos</span>
              <span className="text-sm text-muted-foreground">No Mercado</span>
            </div>
            <div className="flex flex-col items-center p-4 rounded-xl bg-card/50 border border-border/50">
              <Zap className="w-8 h-8 text-primary mb-2" />
              <span className="text-2xl font-bold text-foreground">24/7</span>
              <span className="text-sm text-muted-foreground">Suporte Dedicado</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
