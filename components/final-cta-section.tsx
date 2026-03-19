"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Clock, Users } from "lucide-react"

export function FinalCtaSection() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="py-24 bg-gradient-to-b from-background to-secondary/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            Pare de <span className="text-destructive">Perder Sozinho</span>
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto text-pretty">
            Entre para um ambiente profissional de trading. Tenha estrutura, método e uma comunidade
            que vai te ajudar a alcançar a consistência que você sempre buscou.
          </p>

          <div className="flex flex-wrap justify-center gap-6 mb-10">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Shield className="w-5 h-5 text-primary" />
              <span>Garantia de 7 dias</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-5 h-5 text-primary" />
              <span>Acesso imediato</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-5 h-5 text-primary" />
              <span>Comunidade ativa</span>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={scrollToPlans}
            className="text-xl px-12 py-8 bg-primary hover:bg-primary/90 text-primary-foreground font-bold group shadow-lg shadow-primary/30"
          >
            ESCOLHER MEU PLANO AGORA
            <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>

          <p className="mt-8 text-sm text-muted-foreground">
            Dúvidas? Fale conosco pelo WhatsApp: <a href="#" className="text-primary hover:underline">(11) 99999-9999</a>
          </p>
        </div>
      </div>
    </section>
  )
}
