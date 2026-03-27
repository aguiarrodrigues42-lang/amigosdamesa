"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

const regulamentos = [
  {
    titulo: "REGULAMENTO GERAL",
    conteudo: `A AMIGOS DA MESA PROP é uma mesa proprietária que oferece planos de avaliação, simulador remunerado e conta real para traders que desejam operar Day Trade, nos termos deste regulamento.

A aquisição de qualquer plano implica na aceitação integral, irrestrita e irrevogável deste regulamento, bem como de materiais complementares e regras específicas de campanhas vigentes.

ELEGIBILIDADE E PARTICIPAÇÃO
• Pessoas físicas maiores de 18 anos
• Pessoas jurídicas regularmente constituídas
• É vedada a participação de indivíduos envolvidos em crimes financeiros, investigados por lavagem de dinheiro ou com histórico de fraude

NATUREZA DA RELAÇÃO
A relação entre a AMIGOS DA MESA PROP e o trader não configura vínculo empregatício, sociedade ou relação de investimento. Trata-se exclusivamente de uma prestação de serviços.

CONTRATAÇÃO E INÍCIO
Após a confirmação do pagamento, o trader deverá realizar o agendamento do início do plano. O prazo máximo para início é de até 90 dias corridos. Após esse prazo, o plano poderá ser encerrado sem direito a reembolso.

ACESSO E RESPONSABILIDADE
O acesso à plataforma é pessoal, individual e intransferível. O trader é integralmente responsável por seu login, senha, todas as operações realizadas e a segurança de seus acessos.

PODER DE GESTÃO DA MESA
A AMIGOS DA MESA PROP poderá, a qualquer momento: promover o trader para Conta Real, manter no Simulador Remunerado, retornar ao simulador, ajustar plano, margem ou contratos, suspender ou encerrar contas.

LGPD E DADOS PESSOAIS
Os dados pessoais serão tratados conforme a legislação vigente (Lei nº 13.709/2018 – LGPD).

FORO
Fica eleito o foro da comarca de São Paulo/SP para resolução de eventuais conflitos.`
  },
  {
    titulo: "GUIA RÁPIDO",
    conteudo: `COMO FUNCIONA A JORNADA
Na AMIGOS DA MESA PROP, o trader poderá passar por até 3 etapas:
• Fase de Teste (Exame): avaliação inicial em ambiente simulado
• Simulador Remunerado (SR): etapa posterior à aprovação com possibilidade de repasse
• Conta Real (CR): operação com capital da mesa

A estrutura poderá variar de acordo com o plano contratado.

COMO SE INSCREVER
A contratação ocorre exclusivamente pelos canais oficiais. Após a confirmação do pagamento, o trader deverá realizar o agendamento do início do plano em sua área do trader dentro do prazo informado.

COMO FUNCIONA A FASE DE TESTE
O trader deverá seguir critérios como meta de ganho, limite máximo de perda, quantidade de contratos permitida, ativos autorizados e demais condições operacionais.

COMO FUNCIONA O SR
O SR é a etapa em que o trader continuará sendo acompanhado em ambiente simulado, com possibilidade de repasses conforme as regras do plano.

IMPORTANTE
Este Guia Rápido possui caráter exclusivamente explicativo. Em caso de divergência com o Regulamento Geral vigente, prevalecerá sempre o Regulamento Geral.`
  },
  {
    titulo: "REGRAS OPERACIONAIS",
    conteudo: `ATIVOS E MODALIDADE
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
O descumprimento poderá resultar em advertência, desconsideração de operações, bloqueio temporário, retorno ao simulador ou cancelamento definitivo da conta — sem direito a repasse ou compensação.`
  },
  {
    titulo: "REPASSES",
    conteudo: `CONDIÇÃO PARA RECEBIMENTO
O trader somente estará apto a solicitar repasse quando:
• Estiver com saldo positivo líquido
• Cumprir o mínimo de 7 pregões operados
• Estiver em conformidade com todas as regras operacionais
• Tiver realizado a solicitação formal dentro do prazo

Sempre que houver entrada em nova fase, retorno ao Simulador Remunerado ou migração para Conta Real, o ciclo de dias operados será reiniciado.

SOLICITAÇÃO DE SAQUE
A solicitação de repasse deverá ser realizada via e-mail oficial ou área do trader dentro do período correspondente ao ciclo ativo.

CICLOS E JANELAS DE PAGAMENTO
Os repasses seguem ciclos definidos pela mesa. Pagamentos são realizados no dia 30/31. O pagamento deve ser solicitado no máximo 5 dias antes do fechamento e a mesa tem 7 dias para enviar o fechamento e finalizar o repasse.

PERCENTUAL DE REPASSE
• 80% para traders padrão
• 95% para traders vinculados ao Clube

O percentual incide sobre o lucro líquido apurado após descontos obrigatórios.

TAXAS, CUSTOS E TRIBUTOS
Sobre o valor do repasse incidirão, quando aplicável:
• Imposto de Renda (IR): 20% sobre lucro líquido (Day Trade)
• INSS: 11% (para pessoa física, quando aplicável)
• Taxas operacionais (corretagem e emolumentos)
• Custos da plataforma (quando aplicável)

PRAZO DE PAGAMENTO
O pagamento será realizado dentro da janela correspondente ao ciclo, em até 7 dias úteis após o fechamento.`
  },
  {
    titulo: "CANCELAMENTOS",
    conteudo: `CANCELAMENTO DO PLANO
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

PENALIDADES
O descumprimento pode resultar em advertência, bloqueio temporário, retorno ao simulador ou cancelamento definitivo — sem direito a repasse, reembolso ou compensação.`
  },
  {
    titulo: "CAMPANHAS PROMOCIONAIS",
    conteudo: `NATUREZA DAS CAMPANHAS
As campanhas promocionais possuem caráter temporário e comercial. Seu objetivo é oferecer condições diferenciadas de entrada, sem alterar a estrutura operacional padrão da mesa.

DESCONTOS APLICADOS
Durante a vigência da campanha, os planos poderão ser adquiridos com desconto. O desconto aplica-se exclusivamente no momento da compra e não se estende a renovações ou reativações.

LIMITAÇÃO DE BENEFÍCIOS
Os planos adquiridos em campanha não acumulam benefícios de campanhas anteriores, não possuem upgrades automáticos e não incluem vantagens adicionais não especificadas (como margem extra, reset gratuito ou condições especiais de saque).

NÃO CUMULATIVIDADE
As campanhas não são cumulativas entre si e não podem ser combinadas com outras promoções.

IMPOSSIBILIDADE DE ALTERAÇÃO APÓS COMPRA
Após a aquisição do plano, não será possível alterar a campanha aplicada, ajustar o valor pago ou migrar para novas condições promocionais.

VIGÊNCIA DA CAMPANHA
Cada campanha possui prazo determinado. A AMIGOS DA MESA PROP poderá encerrar a campanha, alterar condições comerciais ou substituir ofertas a qualquer momento, sem necessidade de aviso prévio.

PRIORIDADE DAS REGRAS
Em caso de divergência entre comunicação de campanha e o Regulamento Geral, prevalecerá sempre o Regulamento Geral da AMIGOS DA MESA PROP.`
  }
]

export function RegulamentosModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const handleClose = () => {
    if (agreed) {
      setIsOpen(false)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !agreed) {
      return
    }
    setIsOpen(open)
    if (open) {
      setAgreed(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2 text-xs">
          <FileText className="w-3.5 h-3.5" />
          Ver Regulamento Geral
        </Button>
      </DialogTrigger>
      <DialogContent 
        className="max-w-2xl max-h-[90vh] flex flex-col"
        onPointerDownOutside={(e) => {
          if (!agreed) {
            e.preventDefault()
          }
        }}
        onEscapeKeyDown={(e) => {
          if (!agreed) {
            e.preventDefault()
          }
        }}
      >
        <DialogHeader>
          <DialogTitle>Regulamentos da Mesa</DialogTitle>
          <DialogDescription>
            Leia atentamente todos os termos e regulamentos abaixo.
          </DialogDescription>
        </DialogHeader>
        
        {/* Área de scroll com os termos separados em blocos */}
        <div className="flex-1 overflow-y-auto pr-2 max-h-[55vh] space-y-4">
          {regulamentos.map((reg, index) => (
            <div 
              key={index} 
              className="border border-border rounded-lg p-4 bg-card/50"
            >
              <h3 className="text-base font-semibold text-foreground mb-3">
                {reg.titulo}
              </h3>
              <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                {reg.conteudo}
              </div>
            </div>
          ))}
        </div>

        {/* Checkbox única no final */}
        <div className="pt-4 border-t border-border mt-4">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => setAgreed(!agreed)}
          >
            <Checkbox 
              id="termos" 
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked === true)}
            />
            <label 
              htmlFor="termos" 
              className="cursor-pointer text-sm text-foreground"
            >
              Li e concordo com todos os termos e regulamentos acima
            </label>
          </div>
        </div>

        <Button 
          onClick={handleClose}
          disabled={!agreed}
          className="w-full gap-2 mt-4"
        >
          {agreed && <Check className="w-4 h-4" />}
          {agreed ? "Concordar e Fechar" : "Marque a caixa para continuar"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
