"use client"

import { Star, Quote } from "lucide-react"
import { CinematicBackground } from "@/components/cinematic"

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
    <section className="relative py-24 bg-background overflow-hidden">
      <CinematicBackground variant="mixed" particles={false} />
      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10">
            <Star className="w-3.5 h-3.5 fill-gold text-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Torcida que confia</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-tight text-foreground text-balance">
            O que dizem nossos <span className="text-gold-gradient">traders</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="group relative glass-card border border-gold/15 rounded-2xl p-7 hover:border-gold/45 transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              {/* top brazil accent */}
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Quote className="w-8 h-8 text-gold/25 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, j) => (
                  <Star key={j} className="w-3.5 h-3.5 fill-gold text-gold" />
                ))}
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed mb-6">
                {testimonial.content}
              </p>
              <div className="flex items-center gap-3 pt-4 border-t border-border/60">
                <div className="w-10 h-10 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center text-gold font-bold text-sm">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
