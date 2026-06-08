"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, ClipboardCheck, TrendingUp, DollarSign, Star } from "lucide-react"
import { CinematicBackground, useReveal } from "@/components/cinematic"

const STEPS = [
  {
    number: "01",
    icon: ClipboardCheck,
    title: "Escolha seu plano",
    subtitle: "Fase de Teste (Exame)",
    description:
      "Selecione o plano que mais combina com seu perfil: contratos disponíveis, ativos e meta de aprovação. O exame é 100% em ambiente simulado — sem risco de capital real.",
    detail: "Ativos: WIN · WDO · BIT",
    color: "from-gold/15 to-gold/5",
    border: "border-gold/40",
  },
  {
    number: "02",
    icon: TrendingUp,
    title: "Prove sua consistência",
    subtitle: "Simulador Remunerado (SR)",
    description:
      "Aprovado no exame, você entra no Simulador Remunerado. Aqui suas operações ja geram resultados elegíveis para repasse. Siga as regras, seja consistente e avance.",
    detail: "Resultados elegíveis para repasse",
    color: "from-brazil-green/20 to-brazil-green/5",
    border: "border-brazil-green/40",
  },
  {
    number: "03",
    icon: Star,
    title: "Opera com capital da mesa",
    subtitle: "Conta Real (CR)",
    description:
      "Atingindo os critérios do plano, você é direcionado à Conta Real. Agora opera com capital da mesa, sem limite de ganho por ciclo, com repasses do seu lucro.",
    detail: "Repasse de até 90% do lucro",
    color: "from-gold/15 to-gold/5",
    border: "border-gold/40",
  },
  {
    number: "04",
    icon: DollarSign,
    title: "Solicite seu repasse",
    subtitle: "Saque do Lucro",
    description:
      "Com saldo positivo e mínimo de 7 pregões operados, solicite seu repasse. Pagamentos realizados no ciclo mensal em até 7 dias úteis após o fechamento.",
    detail: "Mínimo 7 pregões operados",
    color: "from-gold/20 to-gold/5",
    border: "border-gold/40",
  },
]

function StepCard({ step, index }: { step: typeof STEPS[0]; index: number }) {
  const { ref, visible } = useReveal()
  const Icon = step.icon

  return (
    <div
      ref={ref}
      className="relative flex flex-col md:flex-row gap-6 md:gap-10 items-start"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.6s ease ${index * 0.12}s, transform 0.6s ease ${index * 0.12}s`,
      }}
    >
      {/* Connector line (desktop) */}
      {index < STEPS.length - 1 && (
        <div className="hidden md:block absolute left-[27px] top-[72px] w-px h-[calc(100%+40px)] border-l-2 border-dashed border-border/40" />
      )}

      {/* Step number bubble */}
      <div className="flex-shrink-0 flex flex-col items-center gap-2">
        <div className={`w-14 h-14 rounded-2xl border-2 ${step.border} bg-gradient-to-br ${step.color} flex items-center justify-center shadow-[0_8px_30px_-10px_rgba(0,0,0,0.8)]`}>
          <Icon className="w-6 h-6 text-gold" />
        </div>
        <span className="font-display text-sm font-bold text-gold/60 tracking-widest">{step.number}</span>
      </div>

      {/* Content */}
      <div className={`flex-1 glass-card border ${step.border} rounded-2xl p-6 md:p-8`}>
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold mb-1">{step.subtitle}</p>
        <h3 className="text-xl font-black text-foreground mb-3">{step.title}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm md:text-base mb-4">{step.description}</p>
        <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r ${step.color} border ${step.border}`}>
          <span className="text-xs font-semibold text-foreground/80">{step.detail}</span>
        </div>
      </div>
    </div>
  )
}

export function TrilhaSection() {
  const scrollToPlans = () => {
    document.getElementById("planos")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section id="trilha" className="relative py-24 bg-background scroll-mt-20 overflow-hidden">
      <CinematicBackground variant="mixed" beams particles />

      <div className="container relative z-10 mx-auto px-4">

        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Jornada do Trader</span>
          </div>
          <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-foreground mb-4 text-balance tracking-tight">
            Do exame ao{" "}
            <span className="text-gold-gradient">repasse real</span>
          </h2>
          <p className="text-muted-foreground text-lg text-pretty leading-relaxed">
            Entenda cada etapa da sua jornada na Amigos da Mesa. Um processo transparente,
            do primeiro pregão ate o dinheiro na sua conta.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-3xl mx-auto flex flex-col gap-10 mb-16">
          {STEPS.map((step, i) => (
            <StepCard key={i} step={step} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            size="lg"
            onClick={scrollToPlans}
            className="relative overflow-hidden bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base px-10 py-6 group shadow-[0_10px_40px_-10px_oklch(0.7_0.18_45/0.6)]"
          >
            <span className="relative z-10 inline-flex items-center">
              VER PLANOS DISPONÍVEIS
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
            <span aria-hidden className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-white/20 skew-x-[-20deg] transition-transform duration-500" />
          </Button>
        </div>
      </div>
    </section>
  )
}
