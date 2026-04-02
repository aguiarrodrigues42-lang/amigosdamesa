"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ArrowLeft, Check } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"

const documentos = [
  {
    id: "guia-rapido",
    titulo: "GUIA RÁPIDO",
    subtitulo: "Como funciona a AMIGOS DA MESA PROP",
    conteudo: `GUIA RÁPIDO – COMO FUNCIONA A AMIGOS DA MESA PROP
Material Educativo Oficial

Este material tem caráter exclusivamente educativo. Ele não substitui o Regulamento Geral da AMIGOS DA MESA PROP. Em caso de divergência, prevalecem sempre as regras do regulamento vigente.

COMO FUNCIONA A JORNADA DO TRADER

Na AMIGOS DA MESA PROP, o Trader pode passar por até três etapas, conforme o plano contratado:
• Fase de Teste (Exame de Seleção)
• Simulador Remunerado (SR)
• Conta Real (CR)

Cada etapa possui regras próprias de risco, avaliação e eliminação.

FASE DE TESTE – EXAME DE SELEÇÃO

A fase de teste tem como objetivo avaliar se o Trader consegue operar respeitando regras, limites e gerenciamento de risco.

Principais pontos:
• Operação em conta simulador
• Meta de ganho definida por plano
• Limite máximo de perda definido por plano
• Sem prazo máximo de tempo
• Plataforma deve estar com pagamento em dia

Como ocorre a aprovação ou eliminação no TESTE:
• O critério é o resultado final do teste
• Ao atingir a meta → aprovado
• Ao atingir o limite máximo de perda → eliminado

Nesta fase, o Trader deve administrar seu risco para não atingir o saldo total de loss do plano.

SIMULADOR REMUNERADO (SR)

O Simulador Remunerado é uma fase onde o Trader já está aprovado e passa a operar com regras espelhadas da conta real.

O que caracteriza o SR:
• Não é conta real
• Possui acompanhamento de desempenho
• Gera repasses, conforme regulamento
• Serve para validar consistência e disciplina

Regra de ganho no SR (importante):
No Simulador Remunerado não existe trava geral de ganhos, porém existem regras de consistência operacional.

Limite operacional no SR:
Em um mesmo pregão, o Trader não pode ultrapassar 50% do saldo total de loss (stop global) do plano e caso ocorra o dia será eliminado.

Esta regra existe para evitar:
• Overtrade
• Alavancagem excessiva
• Ganhos fora do perfil do plano

Caso esse limite seja ultrapassado, o valor excedente será desconsiderado, conforme avaliação da mesa. Essa limitação aplica-se exclusivamente ao Simulador Remunerado.

CONTA REAL (CR)

Na Conta Real, o Trader passa a operar capital financeiro da AMIGOS DA MESA PROP.

Na Conta Real:
• Não há limitação de ganho por pregão
• O Trader pode operar livremente
• Permanecem válidos: stop diário, saldo total de loss (stop global), regras de conduta

CRITÉRIO DE ELIMINAÇÃO (SR E CONTA REAL)

Tanto no Simulador Remunerado (SR) quanto na Conta Real (CR), o critério de eliminação do Trader varia conforme o plano contratado, podendo envolver o atingimento do saldo total de loss (stop global) ou outras condições específicas previstas nos materiais complementares aplicáveis a cada família de plano.

SALDO TOTAL DE LOSS (STOP GLOBAL) DO PLANO

Isso significa que:
• O histórico de ganhos não impede eliminação
• O que importa é atingir o limite máximo de perda permitido
• Ao alcançar esse limite, a conta é encerrada automaticamente

TRANSIÇÕES ENTRE SR E CONTA REAL

A AMIGOS DA MESA PROP pode, a qualquer momento:
• Promover o Trader para Conta Real
• Retornar o Trader ao Simulador Remunerado
• Ajustar plano, margem ou quantidade de contratos

Essas decisões visam proteger o capital da mesa e manter padrões de risco.

REPASSES – REGRA DOS 7 DIAS

Para habilitar qualquer saque ou repasse:
• É obrigatório operar mínimo de 7 pregões válidos

Sempre que houver entrada na Conta Real, retorno ao Simulador Remunerado ou nova transição, o requisito dos 7 pregões reinicia.

ACESSO À PLATAFORMA – RESPONSABILIDADE DO TRADER

O acesso à plataforma é pessoal e intransferível. O Trader é responsável por seu login e senha, todas as operações realizadas e a proteção do acesso contra terceiros. Qualquer operação registrada será considerada como realizada pelo próprio Trader.

CANCELAMENTO E REEMBOLSO (RESUMO)

• Reembolso somente pode ser analisado antes do início da avaliação
• Após liberação de acesso, login ou plataforma → não há reembolso
• As regras completas constam no Regulamento Geral

A AMIGOS DA MESA PROP adota este Guia Rápido com o objetivo de promover clareza, transparência e alinhamento operacional entre a mesa e seus traders.`
  },
  {
    id: "material-i",
    titulo: "MATERIAL EXPLICATIVO COMPLEMENTAR I",
    subtitulo: "Planos Master50 / Unos40 / Titan / Prime / Pegue e Monte / BIT",
    conteudo: `MATERIAL EXPLICATIVO COMPLEMENTAR I
PLANOS MASTER50 / UNOS40 / TITAN / PRIME / PEGUE E MONTE / BIT
(Exames, Sênior e Conta Real)

Este material tem caráter exclusivamente informativo, com o objetivo de explicar, de forma clara e objetiva, o funcionamento prático das regras já previstas no Regulamento Geral da AMIGOS DA MESA PROP, sem qualquer alteração contratual.

ESTRUTURA OPERACIONAL DOS PLANOS

Os planos Master50, Unos40, Titan, Pegue e Monte 27, Pegue e Monte 32, Prime16 e Prime21, Bit20 e Bit30 em suas versões Exame, Sênior e Conta Real, seguem um modelo de gestão avançado, voltado à proteção do capital da mesa e à progressão sustentável do Trader.

Após aprovação no Exame, o Trader inicia sua jornada em Conta Simulador Remunerado (SR), podendo transitar para Conta Real (CR) conforme critérios de performance e risco já definidos no regulamento.

PROMOÇÃO PARA CONTA REAL (TAKE)

O Trader será promovido para Conta Real quando atingir o take definido no plano, conforme descrito no Regulamento Geral.

Exemplo prático:
• Trader em plano Master50
• Ao atingir o take estipulado (ex: R$ 7.000), será promovido para Conta Real
• A promoção não depende de prazo mínimo, podendo ocorrer a qualquer momento

REPASSES DURANTE O SIMULADOR REMUNERADO

Enquanto estiver em Conta Simulador Remunerado:
• O Trader receberá 30% do resultado positivo
• O saldo restante será acumulado internamente
• As deduções simuladas refletem a realidade da Conta Real

Esse modelo permite que o Trader já tenha experiência financeira real, ao mesmo tempo em que a mesa preserva a saúde do capital.

FUNCIONAMENTO APÓS PROMOÇÃO PARA CONTA REAL

Ao ser promovido para Conta Real:
• O Trader passa a operar capital real da AMIGOS DA MESA
• No primeiro saque, receberá:
  - O saldo positivo da Conta Real
  - Mais 30% do saldo acumulado no Simulador Remunerado

REGRAS DE PERDA E RETORNO AO SIMULADOR REMUNERADO

Caso o Trader, em Conta Real:
• Atinja 30% de perda do saldo global, será automaticamente direcionado para Conta Simulador Remunerado, com plano ajustado para recuperação
• Ao recuperar o saldo perdido no Simulador Remunerado, retorna à Conta Real de forma imediata

Se, após retornar à Conta Real:
• O Trader atingir novamente 30% de perda do saldo global, será eliminado
• Caso atinja 30% de perda da margem em Conta Real, perderá também qualquer saldo acumulado previamente no Simulador Remunerado

As regras acima são específicas dos planos Master50, Unos40 e Titan, prevalecendo sobre disposições gerais quando aplicáveis.

ATIVAÇÃO DE SAQUE EM CONTA REAL

Para ativar saque em Conta Real, é obrigatório:
• Estar positivo em, no mínimo, 20% do saldo global
• Cumprir os critérios operacionais e de dias operados quando aplicável

PRINCÍPIO DA GESTÃO

O modelo aplicado nesses planos prioriza:
• Progressão por mérito
• Redução de risco sistêmico
• Continuidade operacional do Trader consistente

A AMIGOS DA MESA PROP diferencia-se por adotar um modelo de meritocracia que pode contemplar o Trader com repasses quinzenais ainda na fase de Simulador Remunerado, conforme critérios, prazos e condições estabelecidos no Regulamento Geral.

As regras acima aplicam-se integralmente aos planos Master50, Unos40, Titan, Pegue e Monte 27, Pegue e Monte 32, Prime16 e Prime21, Bit20 e Bit30, prevalecendo sobre disposições gerais quando aplicáveis.`
  },
  {
    id: "material-ii",
    titulo: "MATERIAL EXPLICATIVO COMPLEMENTAR II",
    subtitulo: "Demais Planos (Iniciante, Intermediário, Avançado, Prime Plus, Pegue e Monte)",
    conteudo: `MATERIAL EXPLICATIVO COMPLEMENTAR II
DEMAIS PLANOS (INICIANTE, INTERMEDIÁRIO, AVANÇADO, PRIME PLUS, PEGUE E MONTE)

Este material explica, de forma prática e objetiva, o funcionamento dos planos que não pertencem à família Master50 / Unos40 / Titan / Prime (se aplicável) / Pegue e Monte (se aplicável), respeitando integralmente o Regulamento Geral vigente.

ESTRUTURA DOS PLANOS

Os planos Iniciante, Intermediário, Avançado, Prime Plus e Pegue e Monte seguem um modelo progressivo, com regras claras de transição entre:
• Exame
• Simulador Remunerado
• Conta Real

A transição ocorre exclusivamente nos fechamentos quinzenais ou mensais, conforme definido no regulamento.

TRANSIÇÃO PARA CONTA REAL

A cada fechamento:
• Se o Trader atingir saldo igual ou superior à margem global, será promovido para Conta Real na quinzena seguinte se estiver com saldo positivo
• O valor equivalente à margem global será pago ao Trader
• O saldo excedente será:
  - Transferido para Conta Real
  - Pago de forma parcelada, em 30% por saque

GESTÃO DE PERDA EM CONTA REAL

Caso o Trader, em Conta Real:
• Perca 50% do saldo global, será direcionado ao Simulador Remunerado em plano inferior
• O objetivo é adequar o gerenciamento à margem restante

Ao retornar ao Simulador Remunerado:
• Caso recupere o saldo perdido, volta para Conta Real
• Caso, após retorno, perca 30% do saldo global, será eliminado

Se atingir 30% de perda do saldo global em Conta Real, perderá também qualquer saldo acumulado restante no Simulador Remunerado.

CONDIÇÃO PARA ATIVAÇÃO DE SAQUE

Para ativar saque em Conta Real:
• É obrigatório estar positivo em, no mínimo, 20% do saldo global
• Cumprir os critérios de dias operados quando aplicável

PRINCÍPIO OPERACIONAL

Esses planos foram estruturados para:
• Desenvolver consistência gradual
• Reduzir exposição da mesa a risco excessivo
• Permitir evolução progressiva do Trader
• Manter equilíbrio financeiro entre performance e gestão

A AMIGOS DA MESA PROP adota um modelo operacional que, conforme critérios e condições definidos no Regulamento Geral, pode permitir a realização de repasses quinzenais ao Trader ainda na fase de Simulador Remunerado.

O repasse quinzenal em Simulador Remunerado não constitui garantia de continuidade, valor mínimo ou periodicidade automática, estando sempre condicionado ao cumprimento integral das regras de elegibilidade, limites de risco, prazos operados e demais critérios estabelecidos pela mesa.

As regras descritas neste material aplicam-se exclusivamente aos planos aqui mencionados, não se confundindo com as regras específicas dos planos Master50, Unos40 e Titan.`
  },
  {
    id: "regulamento-geral",
    titulo: "REGULAMENTO GERAL",
    subtitulo: "Regulamento oficial da AMIGOS DA MESA PROP",
    conteudo: `REGULAMENTO GERAL – AMIGOS DA MESA PROP
"Uma mesa para todos"
Atualizado em 01 de novembro de 2025

DISPOSIÇÕES INICIAIS E ADESÃO

A AMIGOS DA MESA PROP é uma mesa proprietária que oferece planos de avaliação, simulador remunerado e conta real, destinados a traders que desejam operar Day Trade com capital da mesa, nos termos deste Regulamento.

A aquisição de quaisquer planos, exames ou modalidades ocorre exclusivamente por meio do site oficial https://www.amigosdamesa.site/, implicando aceitação integral, irrestrita e irrevogável deste Regulamento.

Podem participar pessoas físicas maiores de 18 (dezoito) anos ou pessoas jurídicas regularmente constituídas, sendo expressamente vedada a participação de indivíduos envolvidos em crimes financeiros, lavagem de dinheiro, ilícitos contra o sistema financeiro ou investigações correlatas.

A relação entre a AMIGOS DA MESA PROP e o Trader não caracteriza vínculo empregatício, societário ou associativo, tratando-se exclusivamente de prestação de serviços, conforme as regras aqui estabelecidas.

PLANOS, MODALIDADES E PLATAFORMA

Os exames, simuladores remunerados e contas reais são realizados por meio da plataforma Profit, da Nelogica, em suas versões ONE ou PRO, sendo a versão padrão o Profit ONE.

O pagamento da licença da plataforma é de responsabilidade exclusiva do Trader. A inadimplência implicará bloqueio e posterior cancelamento definitivo da conta, sem direito a reativação automática.

A AMIGOS DA MESA PROP não se responsabiliza por falhas técnicas, instabilidades, quedas de conexão, energia elétrica, equipamentos, internet ou qualquer outro fator externo à sua gestão.

RESPONSABILIDADE SOBRE ACESSO, LOGIN E SENHA

O Trader declara estar ciente de que o acesso à plataforma de negociação é pessoal, intransferível e de sua exclusiva responsabilidade.

O Trader é integralmente responsável por:
• Manter em sigilo seu login e senha
• Proteger o acesso à plataforma contra uso indevido por terceiros
• Todas as operações realizadas em sua conta, independentemente de quem as execute

Qualquer operação registrada na plataforma será considerada, para todos os fins, como realizada pelo próprio Trader, não sendo aceita contestação baseada em alegação de uso indevido de credenciais.

CONDIÇÕES GERAIS DE PARTICIPAÇÃO

Após a efetivação do pagamento, o Trader deverá realizar o agendamento da data de início por meio da área do cliente.

O prazo para agendamento é de até 60 (sessenta) dias corridos a contar da data da compra. Findo esse prazo, o plano será automaticamente considerado expirado, sem direito a reembolso, estorno, crédito ou qualquer forma de compensação.

O exame será realizado em conta simulador. Não é permitida troca de plano ou plataforma após o início do teste.

A pausa das contas é permitida por até 30 (trinta) dias, mediante comunicação prévia por e-mail.

Cada Trader poderá manter até 10 (dez) contas ativas entre avaliações, simuladores remunerados e contas reais.

REGRAS OPERACIONAIS GERAIS

São permitidas exclusivamente operações Day Trade.

Os ativos autorizados são:
• Mini Índice (WIN)
• Mini Dólar (WDO)
• Bitcoin (BIT), conforme o plano contratado

Todas as posições devem ser encerradas até 30 (trinta) minutos antes do fechamento do pregão.

É expressamente proibido:
• Operar acima do limite de contratos do plano
• Realizar hedge
• Utilizar robôs, automações, copy trade ou mecanismos similares
• Manter posição aberta fora do horário permitido

O descumprimento de qualquer regra operacional implicará eliminação imediata, sem direito a repasse, reativação ou compensação.

OPERAÇÕES NÃO ACEITAS – PARÂMETROS OPERACIONAIS MÍNIMOS

Não serão aceitas operações caracterizadas como micro-scalp, scalp de latência ou captura mínima de pontos.

Consideram-se operações não aceitas:
• Operações no Mini Dólar (WDO) com objetivo de ganho igual ou inferior a 1,5 ponto(s)
• Operações no Mini Índice (WIN) com objetivo de ganho igual ou inferior a 20 pontos

GERENCIAMENTO DE RISCO E RESPONSABILIDADE DO TRADER

O Trader declara estar plenamente ciente de seus limites operacionais, incluindo stop diário e stop global, sendo sua responsabilidade absoluta respeitá-los.

O descumprimento dos limites acarretará eliminação automática da conta. Caso haja extrapolação financeira em conta real, o Trader poderá ser responsabilizado pelo valor excedente.

CRITÉRIOS DE APROVAÇÃO

Cada exame possui meta de ganho e limite de perda previamente definidos.

O critério de aprovação ou reprovação na fase de teste será baseado exclusivamente no saldo líquido, conforme relatório de performance.

Ao atingir a meta, o Trader deverá solicitar formalmente a análise de aprovação por e-mail.

SIMULADOR REMUNERADO E CONTA REAL

O Trader aprovado poderá operar em Simulador Remunerado (SR) ou ser direcionado diretamente para Conta Real (CR), conforme análise da mesa.

Não há limitação geral de ganhos no SR, ressalvadas as regras de gerenciamento e consistência previstas neste Regulamento.

Não será permitido realizar mais 50% do saldo global de sua conta em um dia ou em uma operação e caso ocorra o dia será eliminado da performance.

TRANSIÇÕES, SAQUES E REPASSES

Para habilitar qualquer repasse é obrigatório:
• Mínimo de 7 (sete) pregões operados no período

Sempre que houver entrada em conta real, retorno ao simulador remunerado ou nova transição, será exigido novamente o cumprimento do mínimo de 7 pregões.

O Trader poderá optar por:
• Repasse quinzenal (dias 15 e 30/31)
• Repasse mensal (dia 30/31)

Os repasses serão efetuados em até 7 (sete) dias úteis após o fechamento.

TAXAS, TRIBUTOS E CUSTOS

No momento do repasse serão descontados, quando aplicável:
• Corretagens e emolumentos
• Taxas de plataforma
• 10% de participação da mesa
• Imposto de Renda (20%)
• INSS / Taxa Administrativa (11%), quando aplicável

POLÍTICA DE REEMBOLSO E CANCELAMENTO

O Trader poderá solicitar o cancelamento do plano antes do início da avaliação, desde que respeitadas integralmente as regras deste Regulamento.

Caso o Trader tenha adquirido um plano e ainda não tenha iniciado a avaliação, poderá solicitar o cancelamento mediante comunicação formal por e-mail ou WhatsApp oficial, com antecedência mínima de 48 horas úteis em relação à data agendada para início.

Nessas condições, a AMIGOS DA MESA PROP poderá realizar reembolso parcial de até 50% do valor efetivamente pago.

Não haverá direito a reembolso quando:
• A plataforma de negociação já tiver sido liberada
• O Trader já tiver acessado a plataforma
• Em caso de reprovação no exame
• Por descumprimento das regras do plano

LGPD E DISPOSIÇÕES FINAIS

O contrato de parceria deverá ser assinado quando o Trader completar 1 (um) mês em conta real.

Os dados pessoais serão tratados conforme a Lei nº 13.709/2018 (LGPD).

A AMIGOS DA MESA PROP poderá alterar este Regulamento a qualquer tempo, mediante divulgação em seus canais oficiais.

Fica eleito o Foro Central da Capital de São Paulo/SP para dirimir quaisquer controvérsias.

AMIGOS DA MESA PROP
Uma mesa para todos.`
  },
  {
    id: "regulamento-campanha",
    titulo: "REGULAMENTO ESPECÍFICO DE CAMPANHA",
    subtitulo: "Regras para campanhas promocionais",
    conteudo: `REGULAMENTO ESPECÍFICO DE CAMPANHA
AMIGOS DA MESA PROP

Este regulamento complementa o Regulamento Geral e aplica-se exclusivamente às campanhas promocionais vigentes.

NATUREZA DAS CAMPANHAS

As campanhas promocionais possuem caráter temporário e comercial. Seu objetivo é oferecer condições diferenciadas de entrada, sem alterar a estrutura operacional padrão da mesa.

DESCONTOS APLICADOS

Durante a vigência da campanha, os planos poderão ser adquiridos com desconto. O desconto aplica-se exclusivamente no momento da compra e não se estende a renovações ou reativações.

LIMITAÇÃO DE BENEFÍCIOS

Os planos adquiridos em campanha:
• Não acumulam benefícios de campanhas anteriores
• Não possuem upgrades automáticos
• Não incluem vantagens adicionais não especificadas (como margem extra, reset gratuito ou condições especiais de saque)

NÃO CUMULATIVIDADE

As campanhas não são cumulativas entre si e não podem ser combinadas com outras promoções.

IMPOSSIBILIDADE DE ALTERAÇÃO APÓS COMPRA

Após a aquisição do plano, não será possível:
• Alterar a campanha aplicada
• Ajustar o valor pago
• Migrar para novas condições promocionais

VIGÊNCIA DA CAMPANHA

Cada campanha possui prazo determinado. A AMIGOS DA MESA PROP poderá encerrar a campanha, alterar condições comerciais ou substituir ofertas a qualquer momento, sem necessidade de aviso prévio.

PRIORIDADE DAS REGRAS

Em caso de divergência entre comunicação de campanha e o Regulamento Geral, prevalecerá sempre o Regulamento Geral da AMIGOS DA MESA PROP.

Este regulamento específico de campanha integra o conjunto de normas da AMIGOS DA MESA PROP e deve ser lido em conjunto com o Regulamento Geral vigente.`
  }
]

export function RegulamentosModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedDoc, setSelectedDoc] = useState<typeof documentos[0] | null>(null)
  const [agreed, setAgreed] = useState(false)

  const handleClose = () => {
    if (agreed) {
      setIsOpen(false)
      setSelectedDoc(null)
    }
  }

  const handleOpenChange = (open: boolean) => {
    if (!open && !agreed) {
      return
    }
    setIsOpen(open)
    if (open) {
      setAgreed(false)
      setSelectedDoc(null)
    }
  }

  const handleBack = () => {
    setSelectedDoc(null)
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
        className="max-w-3xl max-h-[90vh] flex flex-col bg-background"
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
        {!selectedDoc ? (
          <>
            {/* Tela inicial com botões */}
            <DialogHeader className="pb-6">
              <DialogTitle className="text-2xl md:text-3xl font-bold text-primary text-center">
                REGULAMENTOS AMIGOS DA MESA
              </DialogTitle>
            </DialogHeader>
            
            {/* Botões em coluna */}
            <div className="flex flex-col gap-3 px-4">
              {documentos.map((doc) => (
                <Button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className="w-full py-6 text-sm md:text-base font-semibold bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                >
                  {doc.titulo}
                </Button>
              ))}
            </div>

            {/* Checkbox e botão de fechar */}
            <div className="pt-6 mt-6 border-t border-border">
              <div 
                className="flex items-center gap-3 cursor-pointer mb-4"
                onClick={() => setAgreed(!agreed)}
              >
                <Checkbox 
                  id="termos" 
                  checked={agreed}
                  onCheckedChange={(checked) => setAgreed(checked === true)}
                  className="border-primary data-[state=checked]:bg-primary"
                />
                <label 
                  htmlFor="termos" 
                  className="cursor-pointer text-sm text-foreground"
                >
                  Li e concordo com todos os termos e regulamentos acima
                </label>
              </div>
              
              <Button 
                onClick={handleClose}
                disabled={!agreed}
                className="w-full gap-2"
              >
                {agreed && <Check className="w-4 h-4" />}
                {agreed ? "Concordar e Fechar" : "Marque a caixa para continuar"}
              </Button>
            </div>
          </>
        ) : (
          <>
            {/* Tela de leitura do documento */}
            <DialogHeader className="pb-4">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleBack}
                  className="shrink-0"
                >
                  <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                  <DialogTitle className="text-lg md:text-xl font-bold text-primary">
                    {selectedDoc.titulo}
                  </DialogTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedDoc.subtitulo}
                  </p>
                </div>
              </div>
            </DialogHeader>
            
            {/* Conteúdo do documento */}
            <div className="flex-1 overflow-y-auto pr-2 max-h-[60vh]">
              <div className="border border-border rounded-lg p-4 md:p-6 bg-card/50">
                <div className="text-sm text-muted-foreground whitespace-pre-line leading-relaxed">
                  {selectedDoc.conteudo}
                </div>
              </div>
            </div>

            {/* Botão voltar */}
            <div className="pt-4 mt-4 border-t border-border">
              <Button 
                onClick={handleBack}
                variant="outline"
                className="w-full gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Voltar aos Regulamentos
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
