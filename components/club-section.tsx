"use client"

import { useEffect, useRef, useState } from "react"
import { Check, Crown, TrendingUp, Users, BookOpen, Newspaper, CalendarCheck, RefreshCw } from "lucide-react"

const clubBenefits = [
  { icon: CalendarCheck, text: "Sala AO VIVO zoom (Seg a Sex 9:00 às 11:00)" },
  { icon: TrendingUp,    text: "1 Indicador regiões de importância (reversão)" },
  { icon: TrendingUp,    text: "1 Indicador regra de coloração (fluxo)" },
  { icon: TrendingUp,    text: "1 Indicador histograma (fluxo)" },
  { icon: TrendingUp,    text: "1 Indicador regiões de importância (ajuste)" },
  { icon: Users,         text: "Grupo VIP com Traders e narradores da sala" },
  { icon: BookOpen,      text: "Momento tira dúvidas" },
  { icon: BookOpen,      text: "Aulas gravadas explicando os indicadores" },
  { icon: Newspaper,     text: "Trader informado (notícias diárias)" },
]

const traderBenefits = [
  { icon: RefreshCw,     text: "Saque semanal (CR) e saque diário (CR)" },
]

export function ClubSection() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.15 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      id="clube"
      className="relative py-24 bg-background overflow-hidden"
    >
      {/* subtle bg glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, oklch(0.7 0.18 45 / 0.07) 0%, transparent 70%)",
        }}
      />

      <div className="container mx-auto px-4 max-w-5xl">
        {/* Label */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-4">
            <Crown className="w-4 h-4 text-primary" />
            <span className="text-xs font-black uppercase tracking-widest text-primary">Acesso exclusivo</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-foreground text-balance">
            Clube do{" "}
            <span className="text-primary">Valor</span>
          </h2>
          <p className="mt-3 text-muted-foreground max-w-lg mx-auto text-sm leading-relaxed">
            A comunidade premium para traders sérios. Ferramentas, ao vivo e vantagens exclusivas para quem opera com a Amigos da Mesa.
          </p>
        </div>

        {/* Main card */}
        <div
          className={`relative rounded-3xl border border-primary/30 bg-card overflow-hidden transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          style={{ boxShadow: "0 0 60px -10px oklch(0.7 0.18 45 / 0.18), 0 0 0 1px oklch(0.7 0.18 45 / 0.12)" }}
        >
          {/* top accent line */}
          <div className="h-1 w-full bg-primary" />

          <div className="p-8 md:p-10">
            {/* Two benefit columns */}
            <div className="grid md:grid-cols-2 gap-8 mb-10">
              {/* Col 1 — Clube */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Crown className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary">Clube do Valor</h3>
                </div>
                <ul className="space-y-3">
                  {clubBenefits.map((b, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2.5 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}`}
                      style={{ transitionDelay: `${200 + i * 50}ms` }}
                    >
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </span>
                      <span className="text-sm text-foreground/80 leading-snug">{b.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Divider vertical */}
              <div className="hidden md:block absolute left-1/2 top-10 bottom-10 w-px bg-border/60 pointer-events-none" aria-hidden />

              {/* Col 2 — Para Traders */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <TrendingUp className="w-4 h-4 text-primary flex-shrink-0" />
                  <h3 className="text-xs font-black uppercase tracking-widest text-primary">Para Traders Amigos da Mesa</h3>
                </div>
                <ul className="space-y-3 mb-6">
                  {traderBenefits.map((b, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2.5 transition-all duration-500 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}`}
                      style={{ transitionDelay: `${300 + i * 60}ms` }}
                    >
                      <span className="flex-shrink-0 mt-0.5 w-4 h-4 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-primary" />
                      </span>
                      <span className="text-sm text-foreground/80 leading-snug">{b.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Premium badge */}
                <div className="mt-4 rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-1">Repasse especial</p>
                  <p className="text-xs text-foreground/70 leading-relaxed">
                    Membros do Clube recebem <strong className="text-foreground">até 100%</strong> de repasse nos planos.
                  </p>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-border/60 mb-8" />

            {/* Price + CTA */}
            <div
              className={`flex flex-col md:flex-row items-center justify-between gap-6 transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            >
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">Investimento mensal</p>
                <div className="flex items-baseline gap-3">
                  <span className="text-sm line-through text-muted-foreground">R$350,00</span>
                  <span className="text-4xl font-black text-primary">R$120,00</span>
                  <span className="text-xs bg-primary text-primary-foreground font-black px-2 py-0.5 rounded-full">65% OFF</span>
                </div>
                <p className="text-[11px] text-muted-foreground mt-1">Cobrança mensal recorrente. Cancele quando quiser.</p>
              </div>

              <button
                onClick={() => window.open("https://pedido.amigosdamesa.shop/pay/c2b6f1c5-92a6-4869-a0fd-50cf13c5ff75", "_blank")}
                className="relative overflow-hidden group w-full md:w-auto px-10 py-4 rounded-2xl bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest transition-all duration-300 hover:brightness-110 hover:shadow-[0_0_30px_oklch(0.7_0.18_45/0.4)]"
              >
                <span className="relative z-10">Quero entrar no Clube</span>
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-white/10 skew-x-[-20deg] transition-transform duration-500"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
