"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Zap, ChevronDown } from "lucide-react"

export function HeroSection() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-secondary/20" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge 
            variant="outline" 
            className="mb-6 px-4 py-2 text-primary border-primary/30 bg-primary/10"
          >
            <Zap className="w-4 h-4 mr-2" />
            Vagas Limitadas
          </Badge>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-balance">
            Entre para uma{" "}
            <span className="text-primary">Mesa Proprietária</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-pretty">
            Pare de operar no escuro. Ambiente estruturado e comunidade de traders focados em consistência.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToPlans}
              className="text-lg px-10 py-7 bg-primary hover:bg-primary/90 text-primary-foreground font-bold group"
            >
              ESCOLHER MEU PLANO
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <button 
        onClick={scrollToPlans}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
        aria-label="Rolar para baixo"
      >
        <ChevronDown className="w-8 h-8 text-muted-foreground/50" />
      </button>
    </section>
  )
}
