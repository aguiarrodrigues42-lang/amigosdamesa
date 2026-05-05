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

ESTRUTURA OPERACIONAL DOS PLANOS PLANOS MASTER50 / UNOS40 / TITAN / PRIME16 / PRIME21 / PEGUE E MONTE 27 / PEGUE E MONTE 32 / BIT 20 / BIT30

Os planos Master50, Unos40, Titan, Pegue e monte 27, Pegue e Monte 32, Prime16 e Prime21, Bit20 e Bit30 em suas versões Exame, Sênior e Conta Real, seguem um modelo de gestão avançado, voltado à proteção do capital da mesa e à progressão sustentável do Trader.

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
• As regras acima são específicas dos planos Master50, Unos40 e Titan, prevalecendo sobre disposições gerais quando aplicáveis.

ATIVAÇÃO DE SAQUE EM CONTA REAL

Para ativar saque em Conta Real, é obrigatório:
• Estar positivo em, no mínimo, 20% do saldo global
• Cumprir os critérios operacionais e de dias operados quando aplicável

PRINCÍPIO DA GESTÃO

O modelo aplicado nesses planos prioriza:
• Progressão por mérito
• Redução de risco sistêmico
• Continuidade operacional do Trader consistente

A AMIGOS DA MESA PROP diferencia-se por adotar um modelo de meritocracia que pode contemplar o Trader com repasses quinzenais ainda na fase de Simulador Remunerado, conforme critérios, prazos e condições estabelecidos no Regulamento Geral. Essa estrutura permite ao Trader vivenciar uma rotina financeira real, reforçando a disciplina, a consistência e o comprometimento operacional, ao mesmo tempo em que contribui para maior estabilidade emocional e adaptação progressiva ao ambiente profissional de gestão de risco.

Tal metodologia busca preparar o Trader para a Conta Real com maior maturidade, previsibilidade e alinhamento comportamental. O presente material possui caráter exclusivamente educativo e não substitui, em nenhuma hipótese, o Regulamento Geral vigente, que permanece como documento oficial e soberano.

As regras acima aplicam-se integralmente aos planos Master50, Unos40, Titan, Pegue e monte 27, Pegue e Monte 32, Prime16 e Prime21, Bit20 e Bit30, prevalecendo sobre disposições gerais quando aplicáveis.`
  },
  {
    id: "material-ii",
    titulo: "MATERIAL EXPLICATIVO COMPLEMENTAR II",
    subtitulo: "Demais Planos (Iniciante, Intermediário, Avançado, Prime, Pegue e Monte)",
    conteudo: `MATERIAL EXPLICATIVO COMPLEMENTAR II
DEMAIS PLANOS (INICIANTE, INTERMEDIÁRIO, AVANÇADO, PRIME, PEGUE E MONTE)

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

A AMIGOS DA MESA PROP adota um modelo operacional que, conforme critérios e condições definidos no Regulamento Geral, pode permitir a realização de repasses quinzenais ao Trader ainda na fase de Simulador Remunerado. Tal estrutura foi desenvolvida com o objetivo de proporcionar previsibilidade financeira, rotina operacional e adaptação progressiva às responsabilidades inerentes à gestão de capital.

O repasse quinzenal em Simulador Remunerado não constitui garantia de continuidade, valor mínimo ou periodicidade automática, estando sempre condicionado ao cumprimento integral das regras de elegibilidade, limites de risco, prazos operados e demais critérios estabelecidos pela mesa. A liberação de repasses nesta fase integra o processo de avaliação comportamental, técnica e disciplinar do Trader.

Este modelo visa alinhar o Trader à dinâmica financeira da Conta Real, promovendo maior maturidade operacional, controle emocional e consistência, ao mesmo tempo em que preserva a sustentabilidade financeira da mesa.

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

A relação entre a AMIGOS DA MESA PROP e o Trader não caracteriza vínculo empregatício, societário ou associativo, tratando-se exclusivamente de prestação de serviços, conforme as regras aqui estabelecidas e, quando aplicável, contrato específico.

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

A AMIGOS DA MESA PROP não se responsabiliza por:
• Operações realizadas com uso correto de login e senha
• Perdas decorrentes de compartilhamento, negligência ou uso indevido das credenciais
• Acessos não autorizados causados por falha do próprio Trader

Qualquer operação registrada na plataforma será considerada, para todos os fins, como realizada pelo próprio Trader, não sendo aceita contestação baseada em alegação de uso indevido de credenciais.

CONDIÇÕES GERAIS DE PARTICIPAÇÃO

Após a efetivação do pagamento, o Trader deverá realizar o agendamento da data de início por meio da área do cliente.

O prazo para agendamento é de até 60 (sessenta) dias corridos a contar da data da compra. Findo esse prazo, o plano será automaticamente considerado expirado, sem direito a reembolso, estorno, crédito ou qualquer forma de compensação.

O exame será realizado em conta simulador. Não é permitida troca de plano ou plataforma após o início do teste.

A pausa das contas é permitida por até 30 (trinta) dias, mediante comunicação prévia por e-mail.

Não há dias mínimos nem máximos operados para aprovação quando aplicável, desde que a plataforma esteja devidamente paga mensalmente. A responsabilidade de entrar em contato com a mesa para efetuar o pagamento é do Trader e o não pagamento pode acarretar em cancelamento, taxas adicionais e outros.

A liberação de vouchers não será permitida nos 7 (sete) dias úteis que antecedem o fechamento quinzenal ou mensal.

Cada Trader poderá manter até 10 (dez) contas ativas entre avaliações, simuladores remunerados e contas reais.

PRAZOS DE ATENDIMENTO E RESPOSTA

A AMIGOS DA MESA PROP compromete-se a responder comunicações encaminhadas por e-mail, de qualquer natureza, no prazo de até 72 (setenta e duas) horas úteis, contadas a partir do recebimento da mensagem em seus canais oficiais.

O prazo acima refere-se exclusivamente à resposta inicial, não implicando solução imediata da demanda, conclusão do atendimento ou deferimento de solicitações, especialmente em casos que dependam de análise técnica, operacional, jurídica ou de terceiros.

Mensagens enviadas fora do horário comercial, em finais de semana, feriados ou períodos de instabilidade operacional poderão ter o prazo contado a partir do primeiro dia útil subsequente.

Comunicações encaminhadas por canais não oficiais, mensagens duplicadas ou com informações incompletas poderão impactar o prazo de resposta.

INATIVIDADE DA CONTA

A ausência de operações na plataforma, sem comunicação prévia e formal à AMIGOS DA MESA PROP acerca dos motivos da inatividade, poderá ensejar o cancelamento automático da conta, a exclusivo critério da Mesa, conforme suas regras internas.

PRAZO PARA REGULARIZAÇÃO

Após o cancelamento, o Trader poderá solicitar a regularização e eventual reativação da conta no prazo máximo de 30 (trinta) dias corridos, contados da data do cancelamento.

Decorrido esse prazo sem manifestação, a conta será considerada definitivamente encerrada, não sendo passível de reativação, sendo necessária, para novo acesso, a contratação de um novo plano.

APROVAÇÃO E PAGAMENTO DA PLATAFORMA

Uma vez aprovado, o Trader deverá efetuar o pagamento da licença da plataforma no prazo máximo de 30 (trinta) dias corridos, contados da data da aprovação.

O não cumprimento deste prazo implicará cancelamento automático da conta, independentemente de aviso prévio.

RESPONSABILIDADE DE PAGAMENTO – FASE DE AVALIAÇÃO (EXAME)

Durante a fase de avaliação (Exame), a responsabilidade pelo pagamento da licença da plataforma é exclusiva do Trader.

A AMIGOS DA MESA PROP não realizará notificações, cobranças, alertas ou lembretes referentes a vencimentos ou inadimplência, cabendo integralmente ao Trader o controle de seus prazos e obrigações financeiras.

O inadimplemento poderá acarretar bloqueio e/ou cancelamento da conta, conforme regras internas.

REATIVAÇÃO DE CONTA POR INADIMPLÊNCIA

Nos casos de cancelamento da conta em decorrência de inadimplência no pagamento da licença da plataforma, a reativação ficará condicionada ao pagamento de taxa de reativação no valor de R$ 100,00 (cem reais), independentemente da versão de plataforma anteriormente contratada.

A reativação somente será processada após a regularização integral dos valores pendentes, incluindo, quando aplicável, a taxa de reativação prevista nesta cláusula.

VALORES DE LICENÇA DE PLATAFORMA

Os valores vigentes para utilização da plataforma repassado pela Nelogica são:
• Profit ONE: R$ 115,00
• Profit PLUS: R$ 165,00
• Profit PRO: R$ 245,00

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

Com o objetivo de preservar a integridade operacional, a sustentabilidade financeira da mesa e o perfil profissional do Trader, não serão aceitas operações caracterizadas como micro-scalp, scalp de latência ou captura mínima de pontos, independentemente da fase em que o Trader se encontre (Exame, Simulador Remunerado ou Conta Real).

Consideram-se operações não aceitas, a título exemplificativo e não limitativo:
• Operações no Mini Dólar (WDO) com objetivo de ganho igual ou inferior a 1,5 (um vírgula cinco) ponto(s)
• Operações no Mini Índice (WIN) com objetivo de ganho igual ou inferior a 20 (vinte) pontos

Essas práticas são enquadradas como conduta operacional incompatível com o modelo de gestão de risco da AMIGOS DA MESA, por estarem associadas a overtrade, exploração de latência, alavancagem excessiva ou comportamento estatisticamente inconsistente.

Na primeira ocorrência, a AMIGOS DA MESA adotará medida educativa, consistindo em:
• Advertência formal ao Trader
• Desconsideração integral da(s) operação(ões) para fins de apuração de resultado
• Exclusão da(s) operação(ões) do cálculo de lucro, prejuízo, repasse ou qualquer valor devido
• Não inclusão da(s) operação(ões) no saldo total da conta, não gerando débito, cobrança ou obrigação financeira ao Trader

A reincidência, habitualidade ou caracterização de padrão operacional incompatível poderá ensejar, a exclusivo critério da AMIGOS DA MESA:
• Novas advertências
• Bloqueio temporário da conta
• Retorno à fase de Simulador Remunerado
• Eliminação definitiva da conta, sem direito a repasse, reativação ou indenização de qualquer natureza

A AMIGOS DA MESA esclarece que a inexistência de limite formal de ganho não autoriza liberdade irrestrita de operação, sendo dever do Trader manter conduta compatível com padrões profissionais de risco, consistência e gestão exigidos pela mesa.

GERENCIAMENTO DE RISCO E RESPONSABILIDADE DO TRADER

O Trader declara estar plenamente ciente de seus limites operacionais, incluindo stop diário e stop global, sendo sua responsabilidade absoluta respeitá-los, independentemente da existência ou não de bloqueios automáticos na plataforma.

O descumprimento dos limites acarretará eliminação automática da conta. Caso haja extrapolação financeira em conta real, o Trader poderá ser responsabilizado pelo valor excedente, conforme apuração da gestão.

A AMIGOS DA MESA PROP não adota drawdown como critério de avaliação. O resultado é sempre apurado conforme as regras específicas de cada fase (teste, simulador remunerado ou conta real).

STOP DIÁRIO NA FASE DE TESTE (EXAME)

Durante a fase de teste (Exame de Seleção), os planos não possuem bloqueio automático de stop diário na plataforma.

O controle de risco diário é de responsabilidade exclusiva do Trader, que deverá, caso deseje, configurar manualmente seus limites por meio das ferramentas disponíveis na plataforma Nelogica.

A ausência de configuração não exime o Trader do cumprimento das regras de risco do plano, sendo integralmente responsável por quaisquer perdas decorrentes de sua operação.

CRITÉRIOS DE APROVAÇÃO

Cada exame possui meta de ganho e limite de perda previamente definidos.

O critério de aprovação ou reprovação na fase de teste será baseado exclusivamente no saldo líquido, conforme relatório de performance.

Ao atingir a meta, o Trader deverá solicitar formalmente a análise de aprovação por e-mail. Após a solicitação, recomenda-se que não sejam realizadas novas operações, pois o saldo considerado será aquele existente no momento da avaliação.

SIMULADOR REMUNERADO E CONTA REAL

O Trader aprovado poderá operar em Simulador Remunerado (SR) ou ser direcionado diretamente para Conta Real (CR), conforme análise da mesa.

Não há limitação geral de ganhos no SR, ressalvadas as regras de gerenciamento e consistência previstas neste Regulamento.

Não será permitido realizar mais 50% do saldo global de sua conta em um dia ou em uma operação e caso ocorra o dia será eliminado da performance.

A AMIGOS DA MESA PROP poderá, a qualquer tempo, promover, rebaixar ou transitar o Trader entre SR e CR, conforme critérios de desempenho, risco e gestão.

Nos simuladores remunerados e contas reais, os critérios de eliminação variam conforme a modalidade do plano contratado, contado desde a data de início do Trader na respectiva conta, observadas as regras específicas previstas para cada plano, independentemente de saldo líquido positivo ou valores já repassados.

Para material educativo com exemplos práticos, consulte o guia explicativo disponível nos canais oficiais.

TRANSIÇÕES E REPASSES

Para habilitar qualquer repasse é obrigatório:
• Mínimo de 7 (sete) pregões operados no período

Sempre que houver:
• Entrada em conta real
• Retorno ao simulador remunerado
• Nova transição

Será exigido novamente o cumprimento do mínimo de 7 pregões.

O Trader poderá optar por:
• Repasse quinzenal (dias 15 e 30/31)
• Repasse mensal (dia 30/31)

Os repasses serão efetuados em até 7 (sete) dias úteis após o fechamento.

PROCEDIMENTO PARA SOLICITAÇÃO:
1. Acesse o site: https://www.amigosdamesa.site/
2. Clique em "ENTRAR AGORA" e acesse sua conta
3. No menu lateral, selecione a opção "SAQUES"
4. Preencha o valor desejado e, se necessário, anexe a documentação solicitada
5. Clique em "SOLICITAR SAQUE" e aguarde o retorno pela própria área logada

TAXAS, TRIBUTOS E CUSTOS

No momento do repasse serão descontados, quando aplicável:
• Corretagens e emolumentos
• Taxas de plataforma
• 10% de participação da mesa
• Imposto de Renda (20%)
• INSS / Taxa Administrativa (11%), quando aplicável

Os valores de repasse não são cumulativos, podendo ser negociados exclusivamente com a gestora de contas e os valores negativos são cumulativos.

POLÍTICA DE REEMBOLSO E CANCELAMENTO

A presente Política de Reembolso aplica-se a todos os planos, exames, simuladores remunerados e serviços comercializados pela AMIGOS DA MESA PROP, observadas as condições abaixo.

O Trader poderá solicitar o cancelamento do plano antes do início da avaliação, desde que respeitadas integralmente as regras deste Regulamento.

Condições para solicitação de reembolso

Caso o Trader tenha adquirido um plano e ainda não tenha iniciado a avaliação, poderá solicitar o cancelamento mediante comunicação formal por e-mail ou WhatsApp oficial da AMIGOS DA MESA PROP, com antecedência mínima de 48 (quarenta e oito) horas úteis em relação à data agendada para início.

Nessas condições, a AMIGOS DA MESA PROP poderá, a seu critério, realizar reembolso parcial de até 50% (cinquenta por cento) do valor efetivamente pago, descontados eventuais custos administrativos, operacionais e financeiros.

Hipóteses em que não haverá reembolso

Não haverá direito a reembolso, estorno, ressarcimento ou devolução de valores pagos, total ou parcial, nas seguintes hipóteses:
• Quando a plataforma de negociação já tiver sido liberada, ativada ou disponibilizada ao Trader pela Nelogica, independentemente de utilização, uma vez que tal liberação gera custos operacionais irreversíveis para a mesa
• Quando o Trader já tiver acessado a plataforma, recebido login e senha ou iniciado qualquer atividade operacional
• Em caso de reprovação no exame por atingimento de limite de perda, stop global, descumprimento de regras operacionais ou prazo do plano
• Por descumprimento das regras do plano contratado ou deste Regulamento
• Pela realização de operações não permitidas, condutas incompatíveis ou violação das diretrizes operacionais da mesa
• Por solicitação realizada fora dos prazos e condições aqui estabelecidos
• Em razão de desistência voluntária após o início da avaliação

CLUBE DO VALOR E BENEFÍCIOS

O CLUBE DO VALOR é um programa opcional de apoio operacional, com benefícios exclusivos, conforme regras vigentes.

Os benefícios somente são válidos para traders ativos e adimplentes.

REPLICADOR DE ORDENS

O uso do Replicador de Ordens é permitido somente mediante autorização expressa da mesa.

O uso sem autorização implicará eliminação imediata, sem direito a repasse, devolução ou reativação.

A AMIGOS DA MESA PROP não se responsabiliza por falhas técnicas, prejuízos ou danos decorrentes do uso da ferramenta.

CONTRATO, LGPD E DISPOSIÇÕES FINAIS

O contrato de parceria deverá ser assinado quando o Trader completar 1 (um) mês em conta real.

Os dados pessoais serão tratados conforme a Lei nº 13.709/2018 (LGPD).

O Trader autoriza o uso de sua imagem para fins institucionais e publicitários, sem ônus e por prazo indeterminado.

A AMIGOS DA MESA PROP poderá alterar este Regulamento a qualquer tempo, mediante divulgação em seus canais oficiais.

Fica eleito o Foro Central da Capital de São Paulo/SP para dirimir quaisquer controvérsias.

AMIGOS DA MESA PROP
Uma mesa para todos.`
  },
  {
    id: "regulamento-campanha",
    titulo: "REGULAMENTO DE DESCONTO IGUAL OU SUPERIOR A 50%",
    subtitulo: "Campanhas igual ou superior a 50% OFF - Modalidade de saque mensal",
    conteudo: `REGULAMENTO DE DESCONTO IGUAL OU SUPERIOR A 50%
MODALIDADE DE SAQUE MENSAL

O presente regulamento estabelece as condições específicas aplicáveis aos planos adquiridos em campanhas promocionais com desconto igual ou superior a 50% (cinquenta por cento), prevalecendo sobre quaisquer condições padrão em caso de divergência.

ABRANGÊNCIA

Este regulamento se aplica exclusivamente aos planos adquiridos sob campanhas promocionais com desconto igual ou superior a 50% (cinquenta por cento).

Ao aderir ao plano, o participante declara ciência e concordância integral com estas condições.

FASE DE TESTE

O participante deverá cumprir o mínimo de 5 (cinco) dias operados para elegibilidade à progressão de fase, independentemente do atingimento de meta.

Considera-se "dia operado" aquele em que houver ao menos uma operação válida registrada na plataforma não podendo ser 0x0.

SIMULADOR REMUNERADO (SR)

As solicitações de saque deverão ser realizadas exclusivamente via e-mail oficial ou área logada do participante.

Os saques nesta modalidade ocorrerão exclusivamente em ciclos mensais, com fechamento nos dias 15, 30 ou 31 de cada mês. As datas que determina o seu ciclo de saque será sempre seu dia de inicio em conta real ou simulador remunerado.

O prazo para solicitação de saque inicia-se 5 (cinco) dias corridos antes da data de fechamento e encerra-se em até 3 (três) dias corridos após o fechamento.

Solicitações realizadas fora deste prazo serão automaticamente desconsideradas, sem exceção.

ALTERAÇÃO DE MODALIDADE DE SAQUE

A alteração da modalidade de saque poderá ser solicitada mediante:
a) envio de solicitação para o e-mail oficial da empresa
b) pagamento de taxa correspondente a 40% (quarenta por cento) sobre o valor original do plano adquirido

A solicitação deverá ser realizada com antecedência mínima de 7 (sete) dias corridos da data de fechamento do ciclo vigente.

Solicitações fora do prazo não serão processadas.

PERCENTUAL DE REPASSE

O percentual de repasse padrão será de 90% (noventa por cento) sobre o lucro líquido apurado.

Para participantes vinculados ao Clube, aplicam-se as seguintes condições:
a) 100% (cem por cento) de repasse durante os primeiros 3 (três) meses
b) após este período, o repasse será de 90% (noventa por cento)

O percentual de repasse incide exclusivamente sobre o lucro líquido, após dedução de tributos, taxas operacionais e demais encargos obrigatórios.

DISPOSIÇÕES GERAIS

Este regulamento não substitui o Regulamento Geral da mesa, sendo complementar às regras já estabelecidas.

Permanecem integralmente válidas todas as regras operacionais, de risco, consistência, limites, conduta e elegibilidade descritas nos materiais oficiais da empresa.

Em caso de conflito entre este regulamento e o regulamento padrão, prevalecerão as condições aqui descritas para os planos contemplados nesta campanha.

A empresa se reserva o direito de recusar solicitações que não atendam integralmente aos critérios estabelecidos neste regulamento.`
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
