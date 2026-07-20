"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { CinematicBackground } from "@/components/cinematic"

const BENEFITS = [
  "Opera com capital da mesa sem arriscar dinheiro próprio",
  "Repasse de até 95% do lucro líquido por ciclo",
  "Scalping livre na Conta Real sem restrição de estilo",
  "Plataforma profissional Profit One incluída",
  "7 dias de Sala Educacional ao Vivo como bônus",
  "Suporte dedicado e comunidade ativa de traders",
]

function useVisible(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, visible }
}

export function SocialProofSection() {
  const { ref: imgRef, visible: imgVisible } = useVisible(0.1)
  const { ref: textRef, visible: textVisible } = useVisible(0.1)

  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <CinematicBackground variant="gold" beams particles={false} />
      <div className="container relative z-10 mx-auto px-4">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

          {/* Image side */}
          <div
            ref={imgRef}
            className="flex-1 w-full max-w-xl"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amigos%20da%20mesa%202-X98xWeZQyVydjcNAOaY56zUfw8QMXp.jpeg"
                alt="Trader segurando dois tablets com gráficos de mercado verde e vermelho"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/25 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />

              {/* Floating card — win/loss indicators */}
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <div className="bg-brazil-green/20 backdrop-blur-sm border border-brazil-green/40 rounded-xl px-3 py-2 text-center">
                  <p className="font-display text-brazil-green font-bold text-base leading-none">+82%</p>
                  <p className="text-brazil-green/80 text-[9px] uppercase tracking-widest">Win rate</p>
                </div>
                <div className="bg-gold/15 backdrop-blur-sm border border-gold/40 rounded-xl px-3 py-2 text-center">
                  <p className="font-display text-gold font-bold text-base leading-none">95%</p>
                  <p className="text-gold/80 text-[9px] uppercase tracking-widest">Repasse</p>
                </div>
              </div>

              {/* brazil tri-band */}
              <div aria-hidden className="absolute bottom-0 left-0 right-0 h-1 brazil-band opacity-80" />
            </div>
          </div>

          {/* Text side */}
          <div
            ref={textRef}
            className="flex-1 max-w-xl"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Por que a Amigos da Mesa</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-foreground leading-[1.05] mb-6 text-balance tracking-tight">
              Tudo que você precisa para{" "}
              <span className="text-gold-gradient">operar de verdade</span>
            </h2>

            <p className="text-muted-foreground text-base leading-relaxed mb-8 text-pretty">
              Pare de operar no escuro com capital limitado. Na Amigos da Mesa você tem estrutura,
              regras claras e uma comunidade que cresce junto com você.
            </p>

            <ul className="flex flex-col gap-3 mb-10">
              {BENEFITS.map((b, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80 leading-snug">{b}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              onClick={scrollToPlans}
              className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base px-8 py-6 group shadow-[0_10px_40px_-10px_oklch(0.56_0.21_263/0.7)]"
            >
              <span className="relative z-10 inline-flex items-center">
                QUERO FAZER PARTE
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 skew-x-[-20deg] transition-transform duration-500" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
