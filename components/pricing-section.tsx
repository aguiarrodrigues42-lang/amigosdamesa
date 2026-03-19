"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { FileText } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  asset: string
  meta: string
  dailyLimit: string
  stopGlobal: string
  options: { label: string; value: string }[]
}

const plansByCategory: Record<Category, Plan[]> = {
  "exames": [
    {
      name: "PLANO INICIANTE",
      contracts: 7,
      asset: "",
      meta: "R$800,00",
      dailyLimit: "R$300,00",
      stopGlobal: "R$1.100,00",
      options: [
        { label: "1 Exame - R$97", value: "1-exam" },
        { label: "2 Exames - R$147", value: "2-exam" },
        { label: "3 Exames - R$197", value: "3-exam" },
      ]
    },
    {
      name: "PLANO INTERMEDIÁRIO",
      contracts: 15,
      asset: "",
      meta: "R$1.400,00",
      dailyLimit: "R$420,00",
      stopGlobal: "R$1.700,00",
      options: [
        { label: "1 Exame - R$147", value: "1-exam" },
        { label: "2 Exames - R$247", value: "2-exam" },
        { label: "3 Exames - R$297", value: "3-exam" },
      ]
    },
    {
      name: "PLANO AVANÇADO",
      contracts: 25,
      asset: "",
      meta: "R$3.950,00",
      dailyLimit: "R$900,00",
      stopGlobal: "R$4.250,00",
      options: [
        { label: "1 Exame - R$197", value: "1-exam" },
        { label: "2 Exames - R$347", value: "2-exam" },
        { label: "3 Exames - R$447", value: "3-exam" },
      ]
    },
    {
      name: "PLANO UNO 40",
      contracts: 40,
      asset: "Dólar",
      meta: "R$4.980,00",
      dailyLimit: "R$1.450,00",
      stopGlobal: "R$6.250,00",
      options: [
        { label: "1 Exame - R$297", value: "1-exam" },
        { label: "2 Exames - R$497", value: "2-exam" },
        { label: "3 Exames - R$597", value: "3-exam" },
      ]
    },
    {
      name: "PLANO UNO 40",
      contracts: 40,
      asset: "Índice",
      meta: "R$4.980,00",
      dailyLimit: "R$1.450,00",
      stopGlobal: "R$6.250,00",
      options: [
        { label: "1 Exame - R$297", value: "1-exam" },
        { label: "2 Exames - R$497", value: "2-exam" },
        { label: "3 Exames - R$597", value: "3-exam" },
      ]
    },
    {
      name: "PLANO MASTER",
      contracts: 50,
      asset: "Índice e Dólar",
      meta: "R$9.950,00",
      dailyLimit: "R$3.350,00",
      stopGlobal: "R$10.250,00",
      options: [
        { label: "1 Exame - R$397", value: "1-exam" },
        { label: "2 Exames - R$697", value: "2-exam" },
        { label: "3 Exames - R$897", value: "3-exam" },
      ]
    },
  ],
  "prime-plus": [
    {
      name: "PRIME PLUS 10",
      contracts: 10,
      asset: "",
      meta: "R$1.200,00",
      dailyLimit: "R$400,00",
      stopGlobal: "R$1.500,00",
      options: [
        { label: "Mensal - R$297", value: "monthly" },
        { label: "Trimestral - R$697", value: "quarterly" },
      ]
    },
    {
      name: "PRIME PLUS 20",
      contracts: 20,
      asset: "",
      meta: "R$2.400,00",
      dailyLimit: "R$700,00",
      stopGlobal: "R$3.000,00",
      options: [
        { label: "Mensal - R$497", value: "monthly" },
        { label: "Trimestral - R$1.197", value: "quarterly" },
      ]
    },
    {
      name: "PRIME PLUS 30",
      contracts: 30,
      asset: "",
      meta: "R$3.600,00",
      dailyLimit: "R$1.000,00",
      stopGlobal: "R$4.500,00",
      options: [
        { label: "Mensal - R$697", value: "monthly" },
        { label: "Trimestral - R$1.697", value: "quarterly" },
      ]
    },
  ],
  "titan": [
    {
      name: "TITAN 50",
      contracts: 50,
      asset: "Índice",
      meta: "R$6.000,00",
      dailyLimit: "R$1.800,00",
      stopGlobal: "R$7.500,00",
      options: [
        { label: "Mensal - R$897", value: "monthly" },
        { label: "Trimestral - R$2.197", value: "quarterly" },
      ]
    },
    {
      name: "TITAN 50",
      contracts: 50,
      asset: "Dólar",
      meta: "R$6.000,00",
      dailyLimit: "R$1.800,00",
      stopGlobal: "R$7.500,00",
      options: [
        { label: "Mensal - R$897", value: "monthly" },
        { label: "Trimestral - R$2.197", value: "quarterly" },
      ]
    },
    {
      name: "TITAN 100",
      contracts: 100,
      asset: "Índice e Dólar",
      meta: "R$12.000,00",
      dailyLimit: "R$3.600,00",
      stopGlobal: "R$15.000,00",
      options: [
        { label: "Mensal - R$1.497", value: "monthly" },
        { label: "Trimestral - R$3.697", value: "quarterly" },
      ]
    },
  ],
  "senior": [
    {
      name: "SÊNIOR 75",
      contracts: 75,
      asset: "Índice",
      meta: "R$9.000,00",
      dailyLimit: "R$2.700,00",
      stopGlobal: "R$11.250,00",
      options: [
        { label: "Mensal - R$1.197", value: "monthly" },
        { label: "Trimestral - R$2.897", value: "quarterly" },
      ]
    },
    {
      name: "SÊNIOR 75",
      contracts: 75,
      asset: "Dólar",
      meta: "R$9.000,00",
      dailyLimit: "R$2.700,00",
      stopGlobal: "R$11.250,00",
      options: [
        { label: "Mensal - R$1.197", value: "monthly" },
        { label: "Trimestral - R$2.897", value: "quarterly" },
      ]
    },
    {
      name: "SÊNIOR 150",
      contracts: 150,
      asset: "Índice e Dólar",
      meta: "R$18.000,00",
      dailyLimit: "R$5.400,00",
      stopGlobal: "R$22.500,00",
      options: [
        { label: "Mensal - R$1.997", value: "monthly" },
        { label: "Trimestral - R$4.897", value: "quarterly" },
      ]
    },
  ],
  "pegue-monte": [
    {
      name: "PEGUE E MONTE BÁSICO",
      contracts: 5,
      asset: "",
      meta: "R$500,00",
      dailyLimit: "R$150,00",
      stopGlobal: "R$600,00",
      options: [
        { label: "Avulso - R$67", value: "single" },
        { label: "Pack 3 - R$147", value: "pack3" },
        { label: "Pack 5 - R$197", value: "pack5" },
      ]
    },
    {
      name: "PEGUE E MONTE PLUS",
      contracts: 10,
      asset: "",
      meta: "R$1.000,00",
      dailyLimit: "R$300,00",
      stopGlobal: "R$1.200,00",
      options: [
        { label: "Avulso - R$97", value: "single" },
        { label: "Pack 3 - R$247", value: "pack3" },
        { label: "Pack 5 - R$347", value: "pack5" },
      ]
    },
    {
      name: "PEGUE E MONTE PRO",
      contracts: 20,
      asset: "",
      meta: "R$2.000,00",
      dailyLimit: "R$600,00",
      stopGlobal: "R$2.400,00",
      options: [
        { label: "Avulso - R$147", value: "single" },
        { label: "Pack 3 - R$397", value: "pack3" },
        { label: "Pack 5 - R$547", value: "pack5" },
      ]
    },
  ],
}

const categories: { id: Category; label: string }[] = [
  { id: "exames", label: "Exames" },
  { id: "prime-plus", label: "Prime Plus" },
  { id: "titan", label: "Titan" },
  { id: "senior", label: "Sênior" },
  { id: "pegue-monte", label: "Pegue e Monte" },
]

function PlanCard({ plan, isActive }: { plan: Plan; isActive: boolean }) {
  const [selectedOption, setSelectedOption] = useState("")

  return (
    <Card className="min-w-[300px] md:min-w-[340px] snap-center bg-card border-border flex-shrink-0">
      <CardHeader className="text-center pb-4">
        <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
        <p className="text-lg font-semibold text-primary">{plan.contracts} CONTRATOS</p>
        {plan.asset && (
          <p className="text-sm text-muted-foreground">{plan.asset}</p>
        )}
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-sm text-muted-foreground space-y-1">
          <p>
            <span className="text-foreground">Meta de Aprovação:</span> {plan.meta}
          </p>
          <p>
            <span className="text-foreground">Limite diário*:</span> {plan.dailyLimit}
          </p>
          <p>
            <span className="text-foreground">Stop Global:</span> {plan.stopGlobal}
          </p>
        </div>

        <Select value={selectedOption} onValueChange={setSelectedOption}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Escolha uma opção" />
          </SelectTrigger>
          <SelectContent>
            {plan.options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button 
          className={`w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold ${
            isActive ? 'animate-pulse-border' : ''
          }`}
          disabled={!selectedOption}
        >
          Quero esse plano
        </Button>

        <p className="text-xs text-muted-foreground text-center">
          <strong>Limite diário*:</strong> Aplicável de forma opcional para a realização do teste, cabe a você decidir utilizá-lo ou não.
        </p>
      </CardContent>
    </Card>
  )
}

export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("exames")
  const [isRegulamentoOpen, setIsRegulamentoOpen] = useState(false)
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const plans = plansByCategory[activeCategory]

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      const scrollLeft = container.scrollLeft
      const cardWidth = 340
      const newIndex = Math.round(scrollLeft / cardWidth)
      setActiveCardIndex(newIndex)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [activeCategory])

  useEffect(() => {
    setActiveCardIndex(0)
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: 'smooth' })
    }
  }, [activeCategory])

  return (
    <section id="planos" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-sm text-muted-foreground uppercase tracking-wider mb-2">
            PROPOSTA DE MESA PROPRIETÁRIA
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            REGULAMENTO GERAL
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-secondary text-foreground'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Regulamento Button */}
        <div className="flex justify-center mb-10">
          <Dialog open={isRegulamentoOpen} onOpenChange={setIsRegulamentoOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <FileText className="w-4 h-4" />
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

        {/* Plans Carousel */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-6 px-4 scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {plans.map((plan, index) => (
            <PlanCard 
              key={`${plan.name}-${plan.asset}-${index}`} 
              plan={plan} 
              isActive={index === activeCardIndex}
            />
          ))}
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-4">
          {plans.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = scrollContainerRef.current
                if (container) {
                  container.scrollTo({ left: index * 340, behavior: 'smooth' })
                }
              }}
              className={`w-2 h-2 rounded-full transition-all ${
                index === activeCardIndex 
                  ? 'bg-primary w-6' 
                  : 'bg-muted-foreground/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
