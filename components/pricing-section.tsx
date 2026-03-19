"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ChevronLeft, ChevronRight } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

const regulamento = `DISPOSIÇÕES INICIAIS
A AMIGOS DA MESA PROP é uma mesa proprietária que oferece planos de avaliação, simulador remunerado e conta real para traders que desejam operar Day Trade, nos termos deste regulamento.
A aquisição de qualquer plano implica na aceitação integral, irrestrita e irrevogável deste regulamento, bem como de materiais complementares e regras específicas de campanhas vigentes.
Este regulamento é aplicável a todos os traders, independentemente do plano contratado.

ELEGIBILIDADE E PARTICIPAÇÃO
Podem participar:
• Pessoas físicas maiores de 18 anos
• Pessoas jurídicas regularmente constituídas
É vedada a participação de indivíduos:
• Envolvidos em crimes financeiros
• Investigados por lavagem de dinheiro
• Com histórico de fraude ou conduta incompatível com o mercado financeiro
A AMIGOS DA MESA PROP poderá, a qualquer momento, solicitar validação de identidade e documentação.

NATUREZA DA RELAÇÃO
A relação entre a AMIGOS DA MESA PROP e o trader:
• Não configura vínculo empregatício
• Não configura sociedade
• Não configura relação de investimento
Trata-se exclusivamente de uma prestação de serviços, com regras próprias de avaliação, operação e repasse.

CONTRATAÇÃO E INÍCIO
A aquisição dos planos ocorre exclusivamente pelos canais oficiais da empresa.
Após a confirmação do pagamento:
• O trader deverá realizar o agendamento do início do plano
• O prazo máximo para início é de até 90 dias corridos
• Após esse prazo, o plano poderá ser encerrado sem direito a reembolso
A liberação da plataforma ocorrerá na data agendada.

ACESSO E RESPONSABILIDADE
O acesso à plataforma é:
• Pessoal
• Individual
• Intransferível
O trader é integralmente responsável por:
• Seu login e senha
• Todas as operações realizadas
• A segurança de seus acessos
Qualquer operação registrada será considerada como realizada pelo próprio trader.

PLATAFORMA E RESPONSABILIDADE TÉCNICA
A operação é realizada por meio da plataforma Profit (Nelogica) ou equivalente.
A AMIGOS DA MESA PROP não se responsabiliza por:
• Falhas de conexão
• Quedas de energia
• Problemas de internet
• Instabilidades do sistema
• Equipamentos do trader

ESTRUTURA DOS PLANOS
Os planos poderão envolver:
• Fase de Teste (Exame)
• Simulador Remunerado (SR)
• Conta Real (CR)
Cada etapa possui regras específicas, que serão detalhadas nas abas correspondentes.
A progressão entre etapas dependerá de critérios técnicos, operacionais e de risco definidos pela mesa.

PODER DE GESTÃO DA MESA
A AMIGOS DA MESA PROP poderá, a qualquer momento:
• Promover o trader para Conta Real
• Manter o trader no Simulador Remunerado
• Retornar o trader ao simulador
• Ajustar plano, margem ou contratos
• Suspender ou encerrar contas
Essas decisões são tomadas com base em critérios internos de risco, consistência e gestão operacional.

REPASSES E RESULTADOS
Os resultados financeiros:
• Não são garantidos
• Dependem exclusivamente do desempenho do trader
• Seguem regras específicas de repasse, detalhadas em aba própria
A existência de lucro em uma fase não garante continuidade em outra.

ALTERAÇÕES DO REGULAMENTO
A AMIGOS DA MESA PROP poderá:
• Alterar este regulamento
• Atualizar regras
• Criar novas condições
A qualquer momento, mediante divulgação em seus canais oficiais.
O uso contínuo da plataforma após alterações implica aceitação automática das novas condições.

LGPD E DADOS PESSOAIS
Os dados pessoais serão tratados conforme a legislação vigente (Lei nº 13.709/2018 – LGPD).

FORO
Fica eleito o foro da comarca de São Paulo/SP para resolução de eventuais conflitos.`

type Category = "exames" | "prime-plus" | "titan" | "senior" | "pegue-monte"

interface Plan {
  name: string
  contracts: number
  asset?: string
  meta: string
  dailyLimit: string
  stopGlobal: string
  price: string
  // Prime Plus extras
  features?: string[]
  taxaOne?: string
  taxaPro?: string
}

const plansByCategory: Record<Category, Plan[]> = {
  "exames": [
    { name: "PLANO INICIANTE",     contracts: 7,  asset: "",               meta: "R$800,00",    dailyLimit: "R$300,00",   stopGlobal: "R$1.100,00",  price: "R$97" },
    { name: "PLANO INTERMEDIÁRIO", contracts: 15, asset: "",               meta: "R$1.400,00",  dailyLimit: "R$420,00",   stopGlobal: "R$1.700,00",  price: "R$147" },
    { name: "PLANO AVANÇADO",      contracts: 25, asset: "",               meta: "R$3.950,00",  dailyLimit: "R$900,00",   stopGlobal: "R$4.250,00",  price: "R$197" },
    { name: "PLANO UNO 40",        contracts: 40, asset: "Dólar",          meta: "R$4.980,00",  dailyLimit: "R$1.450,00", stopGlobal: "R$6.250,00",  price: "R$297" },
    { name: "PLANO UNO 40",        contracts: 40, asset: "Índice",         meta: "R$4.980,00",  dailyLimit: "R$1.450,00", stopGlobal: "R$6.250,00",  price: "R$297" },
    { name: "PLANO MASTER",        contracts: 50, asset: "Índice e Dólar", meta: "R$9.950,00",  dailyLimit: "R$3.350,00", stopGlobal: "R$10.250,00", price: "R$397" },
  ],
  "prime-plus": [
    {
      name: "PRIME PLUS 6", contracts: 6,
      meta: "R$1.800,00", dailyLimit: "—", stopGlobal: "R$2.500,00", price: "",
      features: ["6 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 2.500,00", "Meta de aprovação R$ 1.800,00"],
      taxaOne: "R$300,00", taxaPro: "R$350,00",
    },
    {
      name: "PRIME PLUS 11", contracts: 11,
      meta: "R$4.000,00", dailyLimit: "—", stopGlobal: "R$3.500,00", price: "",
      features: ["11 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 3.500,00", "Meta de aprovação R$ 4.000,00"],
      taxaOne: "R$720,00", taxaPro: "R$780,00",
    },
    {
      name: "PRIME PLUS 16", contracts: 16,
      meta: "R$7.500,00", dailyLimit: "—", stopGlobal: "R$6.000,00", price: "",
      features: ["16 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 6.000,00", "Meta de aprovação R$ 7.500,00"],
      taxaOne: "R$1.220,00", taxaPro: "R$1.320,00",
    },
    {
      name: "PRIME PLUS 21", contracts: 21,
      meta: "R$10.000,00", dailyLimit: "—", stopGlobal: "R$9.000,00", price: "",
      features: ["21 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 9.000,00", "Meta de aprovação R$ 10.000,00"],
      taxaOne: "R$1.720,00", taxaPro: "R$1.850,00",
    },
  ],
  "titan": [
    { name: "TITAN 50",  contracts: 50,  asset: "Índice",         meta: "R$6.000,00",  dailyLimit: "R$1.800,00", stopGlobal: "R$7.500,00",  price: "R$897/mês" },
    { name: "TITAN 50",  contracts: 50,  asset: "Dólar",          meta: "R$6.000,00",  dailyLimit: "R$1.800,00", stopGlobal: "R$7.500,00",  price: "R$897/mês" },
    { name: "TITAN 100", contracts: 100, asset: "Índice e Dólar", meta: "R$12.000,00", dailyLimit: "R$3.600,00", stopGlobal: "R$15.000,00", price: "R$1.497/mês" },
  ],
  "senior": [
    { name: "SÊNIOR 75",  contracts: 75,  asset: "Índice",         meta: "R$9.000,00",  dailyLimit: "R$2.700,00", stopGlobal: "R$11.250,00", price: "R$1.197/mês" },
    { name: "SÊNIOR 75",  contracts: 75,  asset: "Dólar",          meta: "R$9.000,00",  dailyLimit: "R$2.700,00", stopGlobal: "R$11.250,00", price: "R$1.197/mês" },
    { name: "SÊNIOR 150", contracts: 150, asset: "Índice e Dólar", meta: "R$18.000,00", dailyLimit: "R$5.400,00", stopGlobal: "R$22.500,00", price: "R$1.997/mês" },
  ],
  "pegue-monte": [
    { name: "PEGUE E MONTE BÁSICO", contracts: 5,  meta: "R$500,00",   dailyLimit: "R$150,00", stopGlobal: "R$600,00",   price: "R$67" },
    { name: "PEGUE E MONTE PLUS",   contracts: 10, meta: "R$1.000,00", dailyLimit: "R$300,00", stopGlobal: "R$1.200,00", price: "R$97" },
    { name: "PEGUE E MONTE PRO",    contracts: 20, meta: "R$2.000,00", dailyLimit: "R$600,00", stopGlobal: "R$2.400,00", price: "R$147" },
  ],
}

const categories: { id: Category; label: string }[] = [
  { id: "exames",      label: "Exames" },
  { id: "prime-plus",  label: "Prime Plus" },
  { id: "titan",       label: "Titan" },
  { id: "senior",      label: "Sênior" },
  { id: "pegue-monte", label: "Pegue e Monte" },
]

function PlanCard({ plan, isActive }: { plan: Plan; isActive: boolean }) {
  const isPrimePlus = !!plan.features

  return (
    <div
      className={`
        flex-shrink-0 w-[calc(100vw-48px)] max-w-[320px] snap-center
        rounded-2xl border-2 bg-card
        flex flex-col
        transition-all duration-300
        ${isActive
          ? "border-primary shadow-[0_0_0_2px_theme(colors.orange.500)]"
          : "border-border opacity-80"
        }
      `}
    >
      {/* Header */}
      <div className="bg-primary rounded-t-2xl px-5 py-4 text-center">
        <h3 className="text-base font-black uppercase tracking-wide text-primary-foreground leading-tight">
          {plan.name}
        </h3>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 py-5 gap-4">

        {isPrimePlus ? (
          <>
            {/* Bullet features */}
            <ul className="space-y-1.5">
              {plan.features!.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5 text-xs">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>

            {/* Taxa pós-aprovado */}
            <div className="border-t border-border pt-3">
              <p className="text-sm font-bold text-foreground leading-snug">
                Taxa após aprovado:{" "}
                <span className="text-foreground font-normal">
                  ONE <span className="font-bold">{plan.taxaOne}</span>{" "}
                  PRO <span className="font-bold">{plan.taxaPro}</span>
                </span>
              </p>
            </div>
          </>
        ) : (
          <>
            {/* Contratos */}
            <div className="text-center">
              <p className="text-primary font-bold text-lg">{plan.contracts} CONTRATOS</p>
              {plan.asset && (
                <p className="text-muted-foreground text-sm font-medium">{plan.asset}</p>
              )}
            </div>
            {/* Info rows */}
            <div className="space-y-2">
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-xs text-muted-foreground">Meta de Aprovação</span>
                <span className="text-sm font-semibold text-foreground">{plan.meta}</span>
              </div>
              <div className="flex items-center justify-between border-b border-border pb-2">
                <span className="text-xs text-muted-foreground">Limite Diário*</span>
                <span className="text-sm font-semibold text-foreground">{plan.dailyLimit}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Stop Global</span>
                <span className="text-sm font-semibold text-foreground">{plan.stopGlobal}</span>
              </div>
            </div>
            {/* Price */}
            {plan.price && (
              <div className="text-center">
                <span className="text-2xl font-black text-primary">{plan.price}</span>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <button
          className={`
            w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide
            transition-all duration-300 mt-auto
            ${isActive
              ? "bg-primary text-primary-foreground animate-pulse-border"
              : "bg-secondary text-foreground border border-border"
            }
          `}
        >
          Quero esse plano
        </button>

        {!isPrimePlus && (
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            *Limite diário aplicável de forma opcional. Cabe a você decidir utilizá-lo ou não.
          </p>
        )}
      </div>
    </div>
  )
}

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("exames")
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const plans = plansByCategory[activeCategory]

  const CARD_WIDTH = 320 + 16 // card + gap

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const handleScroll = () => {
      const idx = Math.round(container.scrollLeft / CARD_WIDTH)
      setActiveCardIndex(Math.max(0, Math.min(idx, plans.length - 1)))
    }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [activeCategory, plans.length, CARD_WIDTH])

  useEffect(() => {
    setActiveCardIndex(0)
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "smooth" })
  }, [activeCategory])

  const scrollTo = (index: number) => {
    scrollContainerRef.current?.scrollTo({ left: index * CARD_WIDTH, behavior: "smooth" })
  }

  return (
    <section id="planos" className="py-16 bg-background scroll-mt-20">
      <div className="mx-auto px-4 max-w-5xl">

        {/* Title */}
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Proposta de Mesa Proprietária
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-foreground">
            Escolha seu Plano
          </h2>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`
                px-5 py-2 rounded-full text-sm font-semibold transition-all
                ${activeCategory === cat.id
                  ? "bg-secondary text-foreground ring-2 ring-primary"
                  : "bg-primary text-primary-foreground hover:bg-primary/80"
                }
              `}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Regulamento */}
        <div className="flex justify-center mb-8">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2 text-xs">
                <FileText className="w-3.5 h-3.5" />
                Ver Regulamento Geral
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle>Regulamento Geral</DialogTitle>
                <DialogDescription>
                  Leia atentamente as regras e condições da mesa proprietária.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4 text-sm text-muted-foreground whitespace-pre-line">
                  {regulamento}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        {/* Carousel wrapper */}
        <div className="relative">
          {/* Prev button (desktop) */}
          {activeCardIndex > 0 && (
            <button
              onClick={() => scrollTo(activeCardIndex - 1)}
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10
                         w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center
                         hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Scrollable cards */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
          >
            {/* leading spacer so first card can center */}
            <div className="flex-shrink-0 w-[calc(50vw-184px)] md:hidden" />
            {plans.map((plan, index) => (
              <PlanCard
                key={`${plan.name}-${plan.asset ?? ""}-${index}`}
                plan={plan}
                isActive={index === activeCardIndex}
              />
            ))}
            {/* trailing spacer */}
            <div className="flex-shrink-0 w-[calc(50vw-184px)] md:hidden" />
          </div>

          {/* Next button (desktop) */}
          {activeCardIndex < plans.length - 1 && (
            <button
              onClick={() => scrollTo(activeCardIndex + 1)}
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10
                         w-10 h-10 rounded-full bg-secondary border border-border items-center justify-center
                         hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeCardIndex
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
