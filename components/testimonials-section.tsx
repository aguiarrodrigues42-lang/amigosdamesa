"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote } from "lucide-react"

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ricardo M.",
      role: "Trader há 2 anos",
      content: "Antes da mesa, eu operava no escuro. Perdia mais do que ganhava e não entendia o porquê. Hoje, com a estrutura e o acompanhamento, finalmente estou consistente.",
      rating: 5
    },
    {
      name: "Carolina S.",
      role: "Trader há 8 meses",
      content: "A comunidade fez toda a diferença. Operar sozinha era muito difícil emocionalmente. Agora tenho suporte, troco ideias e meus resultados melhoraram muito.",
      rating: 5
    },
    {
      name: "Fernando L.",
      role: "Trader há 3 anos",
      content: "Já fiz vários cursos e nenhum me deu o que a mesa dá: acompanhamento real, operações ao vivo e uma metodologia clara. Recomendo demais.",
      rating: 5
    },
    {
      name: "Ana Paula R.",
      role: "Trader há 1 ano",
      content: "A mentoria individual do plano Elite transformou minha forma de operar. O feedback personalizado é ouro puro.",
      rating: 5
    },
    {
      name: "Marcos V.",
      role: "Trader há 4 anos",
      content: "Cheguei cético, mas em 3 meses já vi resultados. A estrutura da mesa realmente funciona. Vale cada centavo.",
      rating: 5
    },
    {
      name: "Juliana K.",
      role: "Trader há 6 meses",
      content: "A análise pré-mercado me dá clareza para o dia. Antes eu entrava no pregão perdida, hoje sei exatamente o que procurar.",
      rating: 5
    }
  ]

  return (
    <section className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-balance">
            O Que Dizem Nossos <span className="text-primary">Traders</span>
          </h2>
          <p className="text-lg text-muted-foreground text-pretty">
            Depoimentos reais de quem já está na mesa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, i) => (
            <Card key={i} className="bg-card border-border hover:border-primary/30 transition-all duration-300">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
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
