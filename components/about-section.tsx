"use client"

import { Shield, TrendingUp, Users, Award } from "lucide-react"
import { CinematicBackground, useReveal } from "@/components/cinematic"

const PILLARS = [
  {
    icon: TrendingUp,
    title: "Capital Profissional",
    description: "Opere com o capital da mesa. Você foca apenas na consistência operacional.",
  },
  {
    icon: Shield,
    title: "Risco Controlado",
    description: "Regras claras de stop diário e global protegem você e a mesa em todas as etapas.",
  },
  {
    icon: Users,
    title: "Comunidade Ativa",
    description: "Sala educacional ao vivo, suporte e troca de experiências com traders reais.",
  },
  {
    icon: Award,
    title: "Repasses de até 95%",
    description: "Membros do Clube do Valor recebem 95% do lucro líquido apurado no ciclo.",
  },
]

export function AboutSection() {
  const { ref: imgRef, visible: imgVisible } = useReveal(0.1)
  const { ref: textRef, visible: textVisible } = useReveal(0.1)

  return (
    <section id="sobre" className="relative py-24 bg-background scroll-mt-20 overflow-hidden">
      <CinematicBackground variant="green" beams particles={false} />

      <div className="container relative z-10 mx-auto px-4">

        {/* Top: split layout — text left, image right */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-20">

          {/* Text side */}
          <div
            ref={textRef}
            className="flex-1 max-w-xl"
            style={{
              opacity: textVisible ? 1 : 0,
              transform: textVisible ? "translateX(0)" : "translateX(-40px)",
              transition: "opacity 0.7s ease, transform 0.7s ease",
            }}
          >
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-gold/30 bg-gold/10">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.2em]">Quem somos</span>
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-bold uppercase text-foreground leading-[1.05] mb-6 text-balance tracking-tight">
              Do iniciante ao consistente.{" "}
              <span className="text-gold-gradient">Aqui é onde o trader evolui!</span>
            </h2>

            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mb-6 text-pretty">
              Não importa se você está começando agora ou já tem experiência no mercado.
              Se você quer evoluir de verdade, precisa de três coisas: direção, estrutura e oportunidade.
              A Amigos da Mesa entrega isso.
            </p>

            <p className="text-muted-foreground text-base leading-relaxed mb-8 text-pretty">
              Aqui você aprende, se desenvolve e, quando estiver preparado, acessa capital para operar de forma profissional.
              Sem promessas irreais. Sem atalhos. Só um caminho claro pra quem quer crescer no mercado.
            </p>

            {/* Highlight stat row */}
            <div className="flex flex-wrap gap-6">
              {[
                { n: "5+", l: "anos de mercado" },
                { n: "2.400+", l: "traders ativos" },
                { n: "95%", l: "máx. de repasse" },
              ].map((s, i) => (
                <div key={i} className="flex flex-col border-l-2 border-gold/50 pl-3">
                  <span className="font-display text-2xl font-bold text-gold">{s.n}</span>
                  <span className="text-xs text-muted-foreground uppercase tracking-wide">{s.l}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Image side */}
          <div
            ref={imgRef}
            className="flex-1 w-full max-w-xl"
            style={{
              opacity: imgVisible ? 1 : 0,
              transform: imgVisible ? "translateX(0)" : "translateX(40px)",
              transition: "opacity 0.7s ease 0.15s, transform 0.7s ease 0.15s",
            }}
          >
            <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/founder-landscape.png"
                alt="Fundadora da Amigos da Mesa Prop sentada à mesa com estátuas de touro e urso dourados"
                className="w-full h-full object-cover object-center"
              />
              {/* gold ring + cinematic vignette */}
              <div className="absolute inset-0 ring-1 ring-inset ring-gold/25 rounded-3xl" />
              <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              {/* floating jersey accent */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/wc-jersey.png"
                alt=""
                aria-hidden
                className="absolute -top-6 -right-6 w-28 md:w-32 rotate-6 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-flag-wave pointer-events-none hidden sm:block"
              />
              {/* floating badge */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-gold/20 rounded-xl px-4 py-3">
                <p className="text-xs text-white/50 uppercase tracking-[0.2em]">Fundada em</p>
                <p className="font-display text-white font-bold text-lg leading-none">2018</p>
              </div>
              {/* brazil tri-band */}
              <div aria-hidden className="absolute bottom-0 left-0 right-0 h-1 brazil-band opacity-80" />
            </div>
          </div>
        </div>

        {/* Bottom: 4 pillars grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {PILLARS.map((p, i) => {
            const Icon = p.icon
            return (
              <div
                key={i}
                className="group relative glass-card border border-gold/15 rounded-2xl p-6 hover:border-gold/45 transition-all hover:-translate-y-1 duration-300 overflow-hidden"
              >
                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="w-11 h-11 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-bold text-foreground mb-2 text-sm">{p.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
