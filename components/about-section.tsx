"use client"

import { useEffect, useRef, useState } from "react"
import { Shield, TrendingUp, Users, Award } from "lucide-react"

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

export function AboutSection() {
  const { ref: imgRef, visible: imgVisible } = useVisible(0.1)
  const { ref: textRef, visible: textVisible } = useVisible(0.1)

  return (
    <section id="sobre" className="py-24 bg-secondary/20 scroll-mt-20 overflow-hidden">
      <div className="container mx-auto px-4">

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
            <div className="inline-flex items-center gap-2 mb-5 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-primary text-xs font-bold uppercase tracking-widest">Quem somos</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight mb-6 text-balance">
              Do iniciante ao consistente.{" "}
              <span className="text-primary">Aqui é onde o trader evolui!</span>
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
                <div key={i} className="flex flex-col">
                  <span className="text-2xl font-black text-primary">{s.n}</span>
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
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/amigos%20da%20mesa%203-atlvqXw8SmvP66KYkz3TpgfGx5NvST.jpeg"
                alt="Fundadora da Amigos da Mesa Prop sentada à mesa com estátuas de touro e urso dourados"
                className="w-full h-full object-cover"
              />
              {/* subtle vignette */}
              <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl" />
              {/* floating badge */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-sm border border-white/10 rounded-xl px-4 py-3">
                <p className="text-xs text-white/50 uppercase tracking-widest">Fundada em</p>
                <p className="text-white font-black text-lg leading-none">2018</p>
              </div>
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
                className="bg-card border border-border rounded-2xl p-6 hover:border-primary/50 transition-all hover:-translate-y-1 duration-300"
              >
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary" />
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
