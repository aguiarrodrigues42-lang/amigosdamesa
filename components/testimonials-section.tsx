"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Ricardo M.",
    role: "Trader há 2 anos",
    content: "Antes da mesa, eu operava no escuro. Perdia mais do que ganhava. Hoje finalmente estou consistente.",
    rating: 5
  },
  {
    name: "Carolina S.",
    role: "Trader há 8 meses",
    content: "A comunidade fez toda a diferença. Operar sozinha era muito difícil. Agora tenho suporte e meus resultados melhoraram.",
    rating: 5
  },
  {
    name: "Fernando L.",
    role: "Trader há 3 anos",
    content: "Já fiz vários cursos e nenhum me deu o que a mesa dá: acompanhamento real e operações ao vivo.",
    rating: 5
  }
]

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-[#002776]/10 to-background/40">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-balance">
          O que dizem nossos <span className="text-[#FFDF00]">traders</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-card border-border hover:border-[#009C3B]/30 transition-colors">
              <CardContent className="p-6">
                <Quote className="w-6 h-6 text-[#FFDF00]/30 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-[#FFDF00] text-[#FFDF00]" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#009C3B]/20 flex items-center justify-center text-[#009C3B] font-semibold text-sm">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
