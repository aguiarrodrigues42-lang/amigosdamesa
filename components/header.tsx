"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronRight, ArrowLeft } from "lucide-react"


interface Topic {
  id: string
  label: string
  subtitle: string
  content: string
}

const drawerTopics: Topic[] = [
  {
    id: "repasses",
    label: "Repasses",
    subtitle: "Regras de recebimento, prazos, condições de saque e incidência de taxas e tributos.",
    content: `CONDIÇÃO PARA RECEBIMENTO
O trader somente estará apto a solicitar repasse quando:
• Estiver com saldo positivo líquido
• Cumprir o mínimo de 7 pregões operados
• Estiver em conformidade com todas as regras operacionais
• Tiver realizado a solicitação formal dentro do prazo

Sempre que houver entrada em nova fase, retorno ao Simulador Remunerado ou migração para Conta Real, o ciclo de dias operados será reiniciado.

SOLICITAÇÃO DE SAQUE
A solicitação de repasse deverá ser realizada via e-mail oficial ou área do trader dentro do período correspondente ao ciclo ativo. Solicitações fora do prazo poderão ser processadas apenas no ciclo seguinte.

CICLOS E JANELAS DE PAGAMENTO
Os repasses seguem ciclos definidos pela mesa. Pagamentos são realizados no dia 30/31. O pagamento deve ser solicitado no máximo 5 dias antes do fechamento e a mesa tem 7 dias para enviar o fechamento e finalizar o repasse.

PERCENTUAL DE REPASSE
• 80% para traders padrão
• 95% para traders vinculados ao Clube

O percentual incide sobre o lucro líquido apurado após descontos obrigatórios.

REPASSE NO SIMULADOR REMUNERADO (SR)
Planos Convencionais: o repasse será limitado ao take do plano; o saldo excedente será acumulado para fases posteriores.
Planos Profissionais: o trader receberá 30% do saldo positivo no SR; ao atingir o take do plano, poderá ser direcionado à Conta Real.

REPASSE NA CONTA REAL
Na Conta Real não há limitação de ganho por ciclo. O repasse será realizado sobre o lucro líquido.

TAXAS, CUSTOS E TRIBUTOS
Sobre o valor do repasse incidirão, quando aplicável:
• Imposto de Renda (IR): 20% sobre lucro líquido (Day Trade)
• INSS: 11% (para pessoa física, quando aplicável)
• Taxas operacionais (corretagem e emolumentos)
• Custos da plataforma (quando aplicável)

PRAZO DE PAGAMENTO
O pagamento será realizado dentro da janela correspondente ao ciclo, em até 7 dias úteis após o fechamento. A mesa poderá ajustar prazos conforme volume operacional.`,
  },
  {
    id: "regras-operacionais",
    label: "Regras operacionais",
    subtitle: "Regras obrigatórias de execução, conduta e validação operacional aplicáveis a todas as etapas.",
    content: `ATIVOS E MODALIDADE
São permitidas exclusivamente operações na modalidade Day Trade.
Ativos permitidos (conforme plano):
• Mini Índice (WIN)
• Mini Dólar (WDO)
• Bitcoin (BIT), quando aplicável

HORÁRIO DE OPERAÇÃO
• Operações devem respeitar o horário do pregão da B3
• Todas as posições devem ser encerradas antes do leilão de fechamento
• É proibido manter posições abertas após o horário permitido

LIMITES OPERACIONAIS
O trader deve respeitar integralmente:
• Quantidade máxima de contratos do plano
• Limite de perda (stop global)
• Regras de consistência

REGRA DE CONSISTÊNCIA
Durante Teste e SR, o trader não poderá ultrapassar 40% da margem global em um único dia. Objetivo: evitar overtrade, alavancagem excessiva e garantir consistência operacional.

SCALPING E MICRO OPERAÇÕES
Não são aceitas operações caracterizadas como micro scalp, captura mínima de pontos ou operações de latência.
Parâmetros mínimos:
• WIN: movimentos acima de 20 pontos
• WDO: movimentos acima de 1,5 ponto

OPERAÇÕES PROIBIDAS
• Hedge entre contas
• Operações simultâneas opostas para manipulação de resultado
• Uso de robôs ou automações
• Copy trade ou replicação não autorizada
• Gerenciamento de múltiplas contas por terceiros

PENALIDADES
O descumprimento poderá resultar em advertência, desconsideração de operações, bloqueio temporário, retorno ao simulador ou cancelamento definitivo da conta — sem direito a repasse ou compensação.`,
  },
  {
    id: "plataforma",
    label: "Plataforma e renovação",
    subtitle: "Regras de acesso, cobrança, renovação e manutenção da plataforma operacional.",
    content: `ACESSO À PLATAFORMA
A operação será realizada por meio da plataforma disponibilizada pela AMIGOS DA MESA PROP, conforme o plano contratado. O acesso é pessoal, intransferível e vinculado exclusivamente ao trader ativo.

PERÍODO PROMOCIONAL
O trader poderá ter direito a até 30 dias gratuitos de uso da plataforma a partir do início do plano. Após esse período, a continuidade dependerá da renovação paga.

VALORES DA PLATAFORMA
Após o período gratuito:
• Profit One: R$ 99,00 mensais
• Profit Pro: R$ 230,00 mensais

Os valores poderão ser atualizados conforme condições da fornecedora ou da mesa.

RENOVAÇÃO
A renovação é de responsabilidade exclusiva do trader, deve ser realizada antes da data de vencimento e segue data fixa estabelecida no momento da contratação. O pagamento posterior ao vencimento não altera a data original de renovação.

INADIMPLÊNCIA
Em caso de não pagamento:
• A plataforma poderá ser bloqueada imediatamente
• O trader terá prazo de até 3 dias corridos para regularização

CANCELAMENTO POR INADIMPLÊNCIA
Caso o pagamento não seja realizado dentro do prazo, a conta poderá ser cancelada definitivamente, sem direito a reembolso, reativação automática ou recuperação de saldo.

REATIVAÇÃO
Caso o pagamento seja realizado dentro do prazo de tolerância, o trader deverá solicitar reativação ao suporte. O prazo de liberação poderá ser de até 24 horas úteis.

RESPONSABILIDADE TÉCNICA
A AMIGOS DA MESA PROP não se responsabiliza por instabilidade da plataforma, problemas técnicos da fornecedora, quedas de sistema ou falhas operacionais externas.`,
  },
  {
    id: "planos-profissionais",
    label: "Planos profissionais",
    subtitle: "Regras aplicáveis aos planos com modelo avançado de gestão, progressão acelerada e foco em performance.",
    content: `PLANOS ABRANGIDOS
Esta seção se aplica aos seguintes planos:
• Exame 40 e 50 contratos
• Prime 16 e 21
• Titan
• Sênior 40 e 50
• Pegue e Monte 27 e 32
• Bit 20 e 30

ESTRUTURA OPERACIONAL
A jornada ocorre em Fase de Teste (Exame), Simulador Remunerado (SR) e Conta Real (CR), com modelo de progressão orientado à performance.

SIMULADOR REMUNERADO (SR)
Após aprovação, o trader entra no SR com modelo diferenciado:
• Recebimento de 30% do saldo positivo gerado
• Os 70% restantes permanecem acumulados internamente
• As regras de consistência continuam obrigatórias

GATILHO DE PROGRESSÃO (TAKE)
Ao atingir o take do plano (ex: R$7.000), o trader poderá ser direcionado à Conta Real. A progressão depende de análise de consistência e gestão de risco — não é automática.

CONTA REAL
Na Conta Real, o trader passa a operar capital da mesa, sem limite de ganho, com scalping permitido e gain livre. Mantêm-se as regras de risco e conduta.

REPASSE NA CONTA REAL
No primeiro repasse em Conta Real, o trader poderá receber o lucro líquido mais o percentual do saldo acumulado no SR (conforme modelo do plano). Após isso, os repasses seguem exclusivamente o desempenho em Conta Real.

CONDIÇÃO PARA SAQUE
• Mínimo de 7 dias operados
• Saldo positivo
• Cumprimento das regras do plano`,
  },
  {
    id: "planos-convencionais",
    label: "Planos convencionais",
    subtitle: "Regras aplicáveis aos planos de estrutura padrão, com progressão tradicional entre Teste, SR e Conta Real.",
    content: `ESTRUTURA DOS PLANOS
Os planos convencionais seguem a jornada: Fase de Teste (Exame) → Simulador Remunerado (SR) → Conta Real (CR). A progressão ocorre conforme cumprimento dos critérios de cada etapa.

FASE DE TESTE (EXAME)
Na fase de teste, o trader deverá:
• Atingir a meta de ganho do plano
• Respeitar o limite máximo de perda
• Cumprir as regras operacionais e de consistência

A aprovação ocorre ao atingir a meta definida. A reprovação ocorre ao atingir o limite de perda ou descumprir regras.

SIMULADOR REMUNERADO (SR)
Após aprovação, o trader é direcionado ao SR onde as operações ocorrem em ambiente simulado, podendo gerar resultados elegíveis para repasse. As regras de consistência permanecem obrigatórias.

REPASSE NO SR
Nos planos convencionais, o repasse é limitado ao take do plano. O saldo excedente é acumulado internamente e poderá ser utilizado como base para progressão à Conta Real.

TRANSIÇÃO PARA CONTA REAL
A transição pode ocorrer quando o trader atingir os critérios do plano, houver validação de consistência e a mesa considerar elegível com base em gestão de risco. A transição não constitui direito automático.

CONTA REAL
Na Conta Real o trader passa a operar com capital da mesa, sem limite de ganho por ciclo, mantendo a obrigatoriedade de respeitar as regras de risco.

CONDIÇÃO PARA SAQUE
• Mínimo de 7 dias operados
• Saldo positivo
• Cumprimento das regras do plano`,
  },
  {
    id: "guia-rapido",
    label: "Guia rápido",
    subtitle: "Visão geral da jornada do trader na AMIGOS DA MESA PROP.",
    content: `COMO FUNCIONA A JORNADA
Na AMIGOS DA MESA PROP, o trader poderá passar por até 3 etapas:
• Fase de Teste (Exame): avaliação inicial em ambiente simulado
• Simulador Remunerado (SR): etapa posterior à aprovação com possibilidade de repasse
• Conta Real (CR): operação com capital da mesa

A estrutura poderá variar de acordo com o plano contratado.

COMO SE INSCREVER
A contratação ocorre exclusivamente pelos canais oficiais. Após a confirmação do pagamento, o trader deverá realizar o agendamento do início do plano em sua área do trader dentro do prazo informado. A liberação da plataforma ocorrerá na data agendada, e o acesso é pessoal, individual e intransferível.

COMO FUNCIONA A FASE DE TESTE
O trader deverá seguir critérios como meta de ganho, limite máximo de perda, quantidade de contratos permitida, ativos autorizados e demais condições operacionais.

COMO FUNCIONA O SR
O SR é a etapa em que o trader continuará sendo acompanhado em ambiente simulado, com possibilidade de repasses conforme as regras do plano. Em determinados planos haverá limite de repasse; em outros, poderá haver transição futura para Conta Real.

REGRAS GERAIS DE OPERAÇÃO
• Exclusivamente Day Trade dentro dos ativos autorizados
• Todas as posições encerradas dentro do horário permitido
• Proibido hedge irregular, automações não autorizadas e condutas incompatíveis com a política de risco

REPASSES E SAQUES
Os repasses seguem as regras do plano e poderão ocorrer de forma mensal ou conforme modalidade permitida. O percentual poderá variar conforme o plano e a adesão a benefícios específicos.

IMPORTANTE
Este Guia Rápido possui caráter exclusivamente explicativo. Em caso de divergência com o Regulamento Geral vigente, prevalecerá sempre o Regulamento Geral.`,
  },
  {
    id: "cancelamentos",
    label: "Cancelamentos",
    subtitle: "Regras de cancelamento, devolução de valores e penalidades por descumprimento das normas da mesa.",
    content: `CANCELAMENTO DO PLANO
O trader poderá solicitar o cancelamento do plano antes do início da avaliação, desde que não tenha sido liberado acesso à plataforma. A solicitação deverá ser realizada pelos canais oficiais da AMIGOS DA MESA PROP.

CONDIÇÕES DE REEMBOLSO
O reembolso poderá ser analisado quando:
• O plano não tiver sido iniciado
• Não houver liberação de login, senha ou plataforma
• A solicitação ocorrer dentro do prazo legal aplicável

A AMIGOS DA MESA PROP poderá realizar reembolso parcial, descontando custos operacionais e administrativos.

HIPÓTESES DE NÃO REEMBOLSO
Não haverá devolução de valores quando:
• A plataforma já tiver sido liberada
• O trader tiver acessado o sistema
• O plano tiver sido iniciado
• O trader for reprovado no exame
• Houver descumprimento de regras ou eliminação por conduta

CANCELAMENTO POR PARTE DA MESA
A AMIGOS DA MESA PROP poderá cancelar ou encerrar contas por violação de regras operacionais, comportamento incompatível, indícios de fraude ou uso indevido da plataforma — sem aviso prévio, sem direito a repasse ou reembolso.

CONDUTAS PROIBIDAS
• Uso de robôs, automações ou scripts não autorizados
• Hedge entre contas ou operações simultâneas para manipulação
• Compartilhamento de conta ou gerenciamento por terceiros
• Exploração de falhas de sistema ou tentativas de burlar regras

FRAUDE E MÁ-FÉ
Solicitar reembolso para aderir a nova campanha, criar múltiplos cadastros para obter vantagem ou manipular operações são consideradas práticas de má-fé. A mesa poderá cancelar contas, bloquear o trader e tomar medidas administrativas e legais.

PENALIDADES
O descumprimento pode resultar em advertência, bloqueio temporário, retorno ao simulador ou cancelamento definitivo — sem direito a repasse, reembolso ou compensação.`,
  },
  {
    id: "campanhas",
    label: "Campanhas promocionais",
    subtitle: "Regras aplicáveis às condições comerciais especiais, descontos e ofertas promocionais vigentes.",
    content: `NATUREZA DAS CAMPANHAS
As campanhas promocionais possuem caráter temporário e comercial. Seu objetivo é oferecer condições diferenciadas de entrada, sem alterar a estrutura operacional padrão da mesa.

DESCONTOS APLICADOS
Durante a vigência da campanha, os planos poderão ser adquiridos com desconto:
• Exames: até 70% OFF
• Prime: até 40% OFF
• Titan: até 60% OFF
• Sênior: até 30% OFF
• Pegue e Monte: até 60% OFF
• Ultra: até 55% OFF

O desconto aplica-se exclusivamente no momento da compra e não se estende a renovações ou reativações.

LIMITAÇÃO DE BENEFÍCIOS
Os planos adquiridos em campanha não acumulam benefícios de campanhas anteriores, não possuem upgrades automáticos e não incluem vantagens adicionais não especificadas (como margem extra, reset gratuito ou condições especiais de saque).

NÃO CUMULATIVIDADE
As campanhas não são cumulativas entre si e não podem ser combinadas com outras promoções.

IMPOSSIBILIDADE DE ALTERAÇÃO APÓS COMPRA
Após a aquisição do plano, não será possível alterar a campanha aplicada, ajustar o valor pago ou migrar para novas condições promocionais.

VIGÊNCIA DA CAMPANHA
Cada campanha possui prazo determinado. A AMIGOS DA MESA PROP poderá encerrar a campanha, alterar condições comerciais ou substituir ofertas a qualquer momento, sem necessidade de aviso prévio.

PRIORIDADE DAS REGRAS
Em caso de divergência entre comunicação de campanha e o Regulamento Geral, prevalecerá sempre o Regulamento Geral da AMIGOS DA MESA PROP.`,
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [isDrawerOpen])

  const closeDrawer = () => {
    setIsDrawerOpen(false)
    setActiveTopic(null)
  }

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/images/logo.png" alt="Logo" width="160" height="40" style={{ height: "40px", width: "auto", display: "block" }} />
            </div>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {[
                { label: "Sobre a Mesa", id: "sobre" },
                { label: "Planos", id: "planos" },
                { label: "Depoimentos", id: "depoimentos" },
                { label: "FAQ", id: "faq" },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("planos")}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
              >
                ENTRAR AGORA
              </Button>
            </div>

            {/* Hamburger */}
            <button
              className="p-2 text-foreground hover:text-primary transition-colors"
              onClick={() => setIsDrawerOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
          onClick={closeDrawer}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 z-[70] h-full w-80 bg-card border-l border-border
          flex flex-col shadow-2xl
          transition-transform duration-300 ease-in-out
          ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-secondary flex-shrink-0">
          {activeTopic ? (
            <button
              onClick={() => setActiveTopic(null)}
              className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>
          ) : (
            <span className="font-bold text-sm uppercase tracking-widest text-foreground">Regulamentos</span>
          )}
          <button
            onClick={closeDrawer}
            className="text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {activeTopic ? (
          /* Topic detail view */
          <div className="flex-1 overflow-y-auto">
            <div className="px-5 pt-5 pb-2 border-b border-border">
              <h2 className="font-black text-base uppercase tracking-wide text-foreground">{activeTopic.label}</h2>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{activeTopic.subtitle}</p>
            </div>
            <div className="px-5 py-4">
              {activeTopic.content.split("\n\n").map((block, i) => {
                const lines = block.split("\n")
                const isHeading = lines[0] === lines[0].toUpperCase() && lines[0].length > 3 && !lines[0].startsWith("•")
                return (
                  <div key={i} className="mb-4">
                    {isHeading ? (
                      <>
                        <h3 className="text-xs font-black uppercase tracking-widest text-primary mb-1.5">{lines[0]}</h3>
                        {lines.slice(1).map((line, j) => (
                          <p key={j} className={`text-sm leading-relaxed ${line.startsWith("•") ? "ml-2" : ""} text-foreground/80`}>{line}</p>
                        ))}
                      </>
                    ) : (
                      lines.map((line, j) => (
                        <p key={j} className={`text-sm leading-relaxed ${line.startsWith("•") ? "ml-2" : ""} text-foreground/80`}>{line}</p>
                      ))
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Topic list view */
          <nav className="flex-1 overflow-y-auto py-2">
            {drawerTopics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => setActiveTopic(topic)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-secondary transition-colors border-b border-border/40 last:border-0 group"
              >
                <div>
                  <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors">{topic.label}</span>
                  <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 pr-2">{topic.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground flex-shrink-0 group-hover:text-primary transition-colors" />
              </button>
            ))}
          </nav>
        )}

        {/* Footer CTA */}
        {!activeTopic && (
          <div className="px-5 py-4 border-t border-border flex-shrink-0">
            <Button
              onClick={() => { scrollToSection("planos"); closeDrawer() }}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              ENTRAR AGORA
            </Button>
          </div>
        )}
      </div>
    </>
  )
}
