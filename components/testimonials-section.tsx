"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

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
    },
    {
      name: "Ana Paula R.",
      role: "Trader há 1 ano",
      content: "A mentoria individual do plano Elite transformou minha forma de operar. O feedback é ouro puro.",
      rating: 5
    },
    {
      name: "Marcos V.",
      role: "Trader há 4 anos",
      content: "Cheguei cético, mas em 3 meses já vi resultados. Vale cada centavo investido.",
      rating: 5
    }
  ]

  useEffect(() => {
    if (!isAutoPlaying) return
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const goTo = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prev = () => goTo((currentIndex - 1 + testimonials.length) % testimonials.length)
  const next = () => goTo((currentIndex + 1) % testimonials.length)

  return (
    <section className="py-20 bg-secondary/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          O que dizem nossos <span className="text-primary">traders</span>
        </h2>

        {/* Desktop - Cards grid */}
        <div className="hidden md:grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.slice(0, 3).map((testimonial, i) => (
            <Card 
              key={i} 
              className="bg-card border-border hover:border-primary/30 transition-all duration-500 hover:scale-105"
            >
              <CardContent className="p-6">
                <Quote className="w-6 h-6 text-primary/30 mb-3" />
                <div className="flex gap-0.5 mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-4">
                  {testimonial.content}
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
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

        {/* Mobile - Carousel */}
        <div className="md:hidden relative" ref={containerRef}>
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, i) => (
                <div key={i} className="w-full flex-shrink-0 px-2">
                  <Card className="bg-card border-border">
                    <CardContent className="p-6">
                      <Quote className="w-6 h-6 text-primary/30 mb-3" />
                      <div className="flex gap-0.5 mb-3">
                        {[...Array(testimonial.rating)].map((_, j) => (
                          <Star key={j} className="w-3.5 h-3.5 fill-primary text-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground text-sm mb-4">
                        {testimonial.content}
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-semibold text-sm">
                          {testimonial.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                          <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <Button variant="outline" size="icon" onClick={prev} className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                  }`}
                />
              ))}
            </div>
            <Button variant="outline" size="icon" onClick={next} className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
