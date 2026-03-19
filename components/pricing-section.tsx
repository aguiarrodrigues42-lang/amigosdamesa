"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Crown, Rocket, Star, FileText, X } from "lucide-react"
import {
  Dialog,
  DialogContent,
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

const plans = [
  {
    name: "Starter",
    icon: Rocket,
    price: "197",
    originalPrice: "297",
    period: "/mês",
    description: "Para quem quer começar",
    popular: false,
    features: [
      "Acesso à sala de operações",
      "Análise pré-mercado diária",
      "Comunidade no Discord",
      "Estratégias básicas"
    ]
  },
  {
    name: "Pro",
    icon: Crown,
    price: "397",
    originalPrice: "597",
    period: "/mês",
    description: "O mais escolhido",
    popular: true,
    features: [
      "Tudo do Starter",
      "Operações ao vivo",
      "Estratégias avançadas",
      "Revisão semanal",
      "Acesso VIP",
      "Suporte prioritário"
    ]
  },
  {
    name: "Elite",
    icon: Star,
    price: "797",
    originalPrice: "1.197",
    period: "/mês",
    description: "Mentoria completa",
    popular: false,
    features: [
      "Tudo do Pro",
      "Mentoria individual",
      "Consultoria de carteira",
      "Grupo exclusivo Elite",
      "Análises personalizadas",
      "Suporte 24/7"
    ]
  }
]

export function PricingSection() {
  const [isRegulamentoOpen, setIsRegulamentoOpen] = useState(false)

  return (
    <section id="planos" className="py-20 bg-background scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-primary border-primary/30 bg-primary/10">
            <Sparkles className="w-4 h-4 mr-2" />
            Escolha Seu Plano
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-balance">
            Qual plano combina com você?
          </h2>
        </div>

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
                <DialogTitle className="flex items-center justify-between">
                  Regulamento Geral
                </DialogTitle>
              </DialogHeader>
              <ScrollArea className="h-[60vh] pr-4">
                <div className="space-y-4 text-sm text-muted-foreground whitespace-pre-line">
                  {regulamento}
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan, i) => {
            const Icon = plan.icon
            
            return (
              <Card 
                key={i}
                className={`relative bg-card border-2 transition-all duration-300 ${
                  plan.popular 
                    ? 'border-primary shadow-lg shadow-primary/10 md:scale-105 z-10' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-6 py-1.5 text-sm font-bold shadow-lg">
                      MAIS POPULAR
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pt-10 pb-4 text-center">
                  <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center mb-4 shadow-lg ${
                    plan.popular ? 'bg-primary' : 'bg-secondary'
                  }`}>
                    <Icon className={`w-7 h-7 ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  
                  <div className="mt-6">
                    <div className="flex items-center justify-center gap-2 mb-1">
                      <span className="text-sm text-muted-foreground line-through">R$ {plan.originalPrice}</span>
                      <Badge variant="secondary" className="text-xs bg-green-500/20 text-green-400 border-0">
                        ECONOMIA
                      </Badge>
                    </div>
                    <div className="flex items-baseline justify-center">
                      <span className="text-sm text-muted-foreground mr-1">R$</span>
                      <span className="text-5xl font-black text-foreground">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="pt-4 pb-8">
                  <ul className="space-y-3 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                          plan.popular ? 'bg-primary' : 'bg-muted-foreground/20'
                        }`}>
                          <Check className={`w-3 h-3 ${plan.popular ? 'text-primary-foreground' : 'text-foreground'}`} />
                        </div>
                        <span className="text-foreground text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full py-6 text-base font-bold ${
                      plan.popular 
                        ? 'bg-primary hover:bg-primary/90 text-primary-foreground' 
                        : 'bg-secondary hover:bg-primary hover:text-primary-foreground text-foreground'
                    }`}
                  >
                    QUERO ESTE
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <p className="text-center mt-10 text-sm text-muted-foreground">
          Garantia de 7 dias. Cancele quando quiser.
        </p>
      </div>
    </section>
  )
}
