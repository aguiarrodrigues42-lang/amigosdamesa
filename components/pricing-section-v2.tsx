"use client"
// pricing-section-v2 — no ScrollArea
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { FileText, ChevronLeft, ChevronRight, X, Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


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

type Category = "exames" | "prime-plus" | "titan" | "senior" | "pegue-monte" | "bit"
type BitSubCategory = "ultra" | "titan-ultra"

interface Plan {
  name: string
  contracts: number
  asset?: string
  meta: string
  dailyLimit: string
  stopGlobal: string
  // Pricing - numeric for calculations
  priceOriginal: number      // valor original sem desconto
  pricePix: number           // valor PIX com desconto
  discountPercent: number    // % de desconto (70, 40, 60, 30, 55)
  pixLink?: string           // link direto para pagamento PIX
  features?: string[]
  // Prime Plus monthly taxes
  taxaOnePix?: number
  taxaProPix?: number
  taxaOneOriginal?: number
  taxaProOriginal?: number
  ctaLabel?: string
  ctaWhatsApp?: boolean
}

const WHATSAPP_NUMBER = "5511988071345"

const titanFeatures = [
  "30 dias corridos, o prazo pode ser prorrogado para 60 dias corridos mediante o pagamento da Profit",
  "Repasse de 90%",
  "Repasse mensal",
]

const seniorFeaturesCommon = [
  "Direto no Simulador Remunerado",
  "7 dias mínimos operados para repasse",
  "Repasse de 90%",
  "Repasse quinzenal ou mensal",
  "Operadores do Clube do Valor tem 10% de desconto",
  "Taxa extra: Operadores que NÃO obterem lucros e repasse dentro de 100 dias pagará uma taxa de permanência equivalente ao valor do plano para se manter em SR e ter seu saldo negativo (Loss) zerado",
]

const plansByCategory: Record<Category, Plan[]> = {
  // EXAMES - 70% OFF PIX, Cartão = original * 1.30 / 12
  "exames": [
    { name: "PLANO INICIANTE",     contracts: 7,  asset: "",               meta: "R$800,00",    dailyLimit: "R$300,00",   stopGlobal: "R$1.100,00",  priceOriginal: 586.09,  pricePix: 175.82, discountPercent: 70, pixLink: "https://pedido.amigosdamesa.shop/pay/0329b223-fafe-42ba-9bfe-4a493379dd29" },
    { name: "PLANO INTERMEDIÁRIO", contracts: 15, asset: "",               meta: "R$1.400,00",  dailyLimit: "R$420,00",   stopGlobal: "R$1.700,00",  priceOriginal: 773.37,  pricePix: 232.01, discountPercent: 70, pixLink: "https://pedido.amigosdamesa.shop/pay/6b2b1acd-d1d1-41a4-8bf7-1b6c1c4e272e" },
    { name: "PLANO AVANÇADO",      contracts: 25, asset: "",               meta: "R$3.950,00",  dailyLimit: "R$900,00",   stopGlobal: "R$4.250,00",  priceOriginal: 2107.14, pricePix: 632.14, discountPercent: 70, pixLink: "https://pedido.amigosdamesa.shop/pay/199072a4-669f-4eff-b10c-7268a9d6a7d9" },
    { name: "PLANO UNO 40",        contracts: 40, asset: "Dólar",          meta: "R$4.980,00",  dailyLimit: "R$1.450,00", stopGlobal: "R$6.250,00",  priceOriginal: 2581.75, pricePix: 774.52, discountPercent: 70, pixLink: "https://pedido.amigosdamesa.shop/pay/6a82aa4a-6920-4e19-bbad-481363faf076" },
    { name: "PLANO UNO 40",        contracts: 40, asset: "Índice",         meta: "R$4.980,00",  dailyLimit: "R$1.450,00", stopGlobal: "R$6.250,00",  priceOriginal: 2581.75, pricePix: 774.52, discountPercent: 70, pixLink: "https://pedido.amigosdamesa.shop/pay/dda19cfd-8cdd-4806-b237-7989809cfc68" },
    { name: "PLANO MASTER",        contracts: 50, asset: "Índice e Dólar", meta: "R$9.950,00",  dailyLimit: "R$3.350,00", stopGlobal: "R$10.250,00", priceOriginal: 3631.12, pricePix: 1089.33, discountPercent: 70, pixLink: "https://pedido.amigosdamesa.shop/pay/12cfc68c-bb65-49b9-a70a-74058a498bc7" },
  ],
  // PRIME MENSAL - 40% OFF PIX = R$180/mês, Cartão = mensalidade R$300/mês
  "prime-plus": [
    {
      name: "PRIME PLUS 6", contracts: 6,
      meta: "R$1.800,00", dailyLimit: "—", stopGlobal: "R$2.500,00", priceOriginal: 300, pricePix: 180, discountPercent: 40,
      pixLink: "https://pedido.amigosdamesa.shop/pay/02c6b8ad-5b3f-4f8f-ab27-2c8d7f2ecd18",
      features: ["6 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 2.500,00", "Meta de aprovação R$ 1.800,00"],
      taxaOnePix: 180, taxaProPix: 180, taxaOneOriginal: 300, taxaProOriginal: 300,
    },
    {
      name: "PRIME PLUS 11", contracts: 11,
      meta: "R$4.000,00", dailyLimit: "—", stopGlobal: "R$3.500,00", priceOriginal: 300, pricePix: 180, discountPercent: 40,
      pixLink: "https://pedido.amigosdamesa.shop/pay/ce773655-e9f5-404e-a739-0e242149f9dc",
      features: ["11 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 3.500,00", "Meta de aprovação R$ 4.000,00"],
      taxaOnePix: 180, taxaProPix: 180, taxaOneOriginal: 300, taxaProOriginal: 300,
    },
    {
      name: "PRIME PLUS 16", contracts: 16,
      meta: "R$7.500,00", dailyLimit: "—", stopGlobal: "R$6.000,00", priceOriginal: 300, pricePix: 180, discountPercent: 40,
      pixLink: "https://pedido.amigosdamesa.shop/pay/6e43fa96-ce50-46bb-bca7-8c3e9fa86e01",
      features: ["16 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 6.000,00", "Meta de aprovação R$ 7.500,00"],
      taxaOnePix: 180, taxaProPix: 180, taxaOneOriginal: 300, taxaProOriginal: 300,
    },
    {
      name: "PRIME PLUS 21", contracts: 21,
      meta: "R$10.000,00", dailyLimit: "—", stopGlobal: "R$9.000,00", priceOriginal: 300, pricePix: 180, discountPercent: 40,
      pixLink: "https://pedido.amigosdamesa.shop/pay/2b18719e-4655-40fc-9f5c-f8c698820203",
      features: ["21 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 9.000,00", "Meta de aprovação R$ 10.000,00"],
      taxaOnePix: 180, taxaProPix: 180, taxaOneOriginal: 300, taxaProOriginal: 300,
    },
  ],
  // TITAN - 60% OFF PIX, Cartão = original * 1.30 / 12
  "titan": [
    {
      name: "TITAN PRO 10", contracts: 10,
      meta: "R$7.000,00", dailyLimit: "R$2.500,00", stopGlobal: "R$10.000,00", priceOriginal: 1980.99, pricePix: 786.60, discountPercent: 60,
      pixLink: "https://pedido.amigosdamesa.shop/pay/fbd4e538-7f21-4783-adcb-3f6000a9c0b2",
      features: ["10 contratos", ...titanFeatures, "Meta de aprovação R$ 7.000,00", "Stop diário R$ 2.500,00", "Stop Global R$ 10.000,00"],
    },
    {
      name: "TITAN PRO 20", contracts: 20,
      meta: "R$15.000,00", dailyLimit: "R$3.500,00", stopGlobal: "R$17.000,00", priceOriginal: 2980.99, pricePix: 1192.39, discountPercent: 60,
      pixLink: "https://pedido.amigosdamesa.shop/pay/4fde6089-4713-4ccc-9422-024e66f967e2",
      features: ["20 contratos", ...titanFeatures, "Meta de aprovação R$ 15.000,00", "Stop diário R$ 3.500,00", "Stop Global R$ 17.000,00"],
    },
    {
      name: "TITAN PRO 30", contracts: 30,
      meta: "R$18.000,00", dailyLimit: "R$4.000,00", stopGlobal: "R$20.000,00", priceOriginal: 3980.99, pricePix: 1194.29, discountPercent: 60,
      pixLink: "https://pedido.amigosdamesa.shop/pay/8eb7fe18-8daf-47e0-8138-67789650ec9f",
      features: ["30 contratos", ...titanFeatures, "Meta de aprovação R$ 18.000,00", "Stop diário R$ 4.000,00", "Stop Global R$ 20.000,00"],
    },
    {
      name: "TITAN PRO 50", contracts: 50,
      meta: "R$22.000,00", dailyLimit: "R$5.500,00", stopGlobal: "R$25.000,00", priceOriginal: 4980.99, pricePix: 1494.29, discountPercent: 60,
      pixLink: "https://pedido.amigosdamesa.shop/pay/64cc0f6e-4fd2-4bc8-8896-6ac1634fbe6e",
      features: ["50 contratos", ...titanFeatures, "Meta de aprovação R$ 22.000,00", "Stop diário R$ 5.500,00", "Stop Global R$ 25.000,00"],
    },
  ],
  // SÊNIOR (Direto na Mesa) - 30% OFF PIX, Cartão = original * 1.30 / 12
  "senior": [
    {
      name: "INICIANTE 7", contracts: 7,
      meta: "—", dailyLimit: "R$300,00", stopGlobal: "R$1.100,00", priceOriginal: 1146.55, pricePix: 802.58, discountPercent: 30,
      pixLink: "https://pedido.amigosdamesa.shop/pay/2187edc5-6ef4-4edb-b3ae-4596b337b59f",
      features: [...seniorFeaturesCommon, "Stop diário R$ 300,00", "Stop Global R$ 1.100,00"],
    },
    {
      name: "INTERMEDIÁRIO 15", contracts: 15,
      meta: "—", dailyLimit: "R$420,00", stopGlobal: "R$1.700,00", priceOriginal: 1521.45, pricePix: 1065.02, discountPercent: 30,
      pixLink: "https://pedido.amigosdamesa.shop/pay/82154d2a-0450-43d3-821e-7548d9e421d3",
      features: [...seniorFeaturesCommon, "Stop diário R$ 420,00", "Stop Global R$ 1.700,00"],
    },
    {
      name: "AVANÇADO 25", contracts: 25,
      meta: "—", dailyLimit: "R$900,00", stopGlobal: "R$4.250,00", priceOriginal: 3935.99, pricePix: 2755.19, discountPercent: 30,
      pixLink: "https://pedido.amigosdamesa.shop/pay/1315e507-8da2-41a4-8d38-d2f5aab94b70",
      features: [...seniorFeaturesCommon, "Stop diário R$ 900,00", "Stop Global R$ 4.250,00"],
    },
    {
      name: "UNO 40", contracts: 40,
      asset: "Índice ou Dólar",
      meta: "—", dailyLimit: "R$1.450,00", stopGlobal: "R$6.250,00", priceOriginal: 4885.20, pricePix: 3419.64, discountPercent: 30,
      pixLink: "https://pedido.amigosdamesa.shop/pay/07644730-388c-4251-b898-55acade00ae8",
      features: [...seniorFeaturesCommon.slice(0,1), "Índice ou Dólar", ...seniorFeaturesCommon.slice(1), "Stop diário R$ 1.450,00", "Stop Global R$ 6.250,00"],
    },
    {
      name: "MASTER 50", contracts: 50,
      meta: "—", dailyLimit: "R$3.350,00", stopGlobal: "R$10.250,00", priceOriginal: 5977.12, pricePix: 4183.98, discountPercent: 30,
      pixLink: "https://pedido.amigosdamesa.shop/pay/d9d9ec49-2d4d-4472-b498-3b29ed27d1bf",
      features: [...seniorFeaturesCommon, "Stop diário R$ 3.350,00", "Stop Global R$ 10.250,00"],
    },
  ],
  // PEGUE E MONTE - 55% OFF PIX, Cartão = original * 1.30 / 12
  "pegue-monte": [
    // Exame
    { name: "PEGUE MONTE EXAME 8",  contracts: 8,  meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 865.95, pricePix: 389.67, discountPercent: 55, features: ["Exame", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Monte seu plano", ctaWhatsApp: true },
    { name: "PEGUE MONTE EXAME 12", contracts: 12, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 934.95, pricePix: 420.72, discountPercent: 55, features: ["Exame", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Monte seu plano", ctaWhatsApp: true },
    { name: "PEGUE MONTE EXAME 20", contracts: 20, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 1345.50, pricePix: 605.47, discountPercent: 55, features: ["Exame", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Monte seu plano", ctaWhatsApp: true },
    { name: "PEGUE MONTE EXAME 27", contracts: 27, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 1690.50, pricePix: 0, discountPercent: 55, features: ["Exame", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Indisponível", ctaWhatsApp: false },
    { name: "PEGUE MONTE EXAME 32", contracts: 32, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 2120.60, pricePix: 0, discountPercent: 55, features: ["Exame", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Indisponível", ctaWhatsApp: false },
    // Sênior (Direto)
    { name: "PEGUE MONTE SÊNIOR 10", contracts: 10, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 714.03, pricePix: 389.67, discountPercent: 55, features: ["Direto no SR", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Monte seu plano", ctaWhatsApp: true },
    { name: "PEGUE MONTE SÊNIOR 15", contracts: 15, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 1024.13, pricePix: 420.72, discountPercent: 55, features: ["Direto no SR", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Monte seu plano", ctaWhatsApp: true },
    { name: "PEGUE MONTE SÊNIOR 20", contracts: 20, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 1863.11, pricePix: 605.47, discountPercent: 55, features: ["Direto no SR", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Monte seu plano", ctaWhatsApp: true },
    { name: "PEGUE MONTE SÊNIOR 30", contracts: 30, meta: "—", dailyLimit: "—", stopGlobal: "—", priceOriginal: 2433.17, pricePix: 0, discountPercent: 55, features: ["Direto no SR", "Sem dias mínimos para bater meta", "Repasse Mensal ou Quinzenal"], ctaLabel: "Indisponível", ctaWhatsApp: false },
  ],
  "bit": [],
}

// ── BIT plans ─────────────────────────────────────────────────────────────────
interface BitPlan {
  name: string
  bitContracts: number
  features: string[]
  // Ultra pricing
  precoExame?: string
  precoExameOriginal?: string
  precoSenior?: string
  precoSeniorOriginal?: string
  // Titan Ultra pricing
  precoPix?: string
  precoPixOriginal?: string
  precoCartao?: string
  precoCartaoOriginal?: string
  precoContaAprovada?: string
  discountLabel?: string
  subCategory: BitSubCategory
}

const bitPlans: BitPlan[] = [
  // Ultra 1.0 / 3 em 1
  {
    subCategory: "ultra",
    name: "ULTRA 10",
    bitContracts: 5,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$900,00",
      "Stop Global: R$1.950,00",
      "Stop Diário: R$600,00",
    ],
    precoExame: "R$620,90",   precoExameOriginal: "R$1.379,78",
    precoSenior: "R$1.241,00", precoSeniorOriginal: "R$2.757,78",
    discountLabel: "55% OFF",
  },
  {
    subCategory: "ultra",
    name: "ULTRA 15",
    bitContracts: 10,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$2.500,00",
      "Stop Global: R$3.510,00",
      "Stop Diário: R$1.000,00",
    ],
    precoExame: "R$890,55",   precoExameOriginal: "R$1.979,00",
    precoSenior: "R$1.781,10", precoSeniorOriginal: "R$3.958,00",
    discountLabel: "55% OFF",
  },
  {
    subCategory: "ultra",
    name: "ULTRA 20",
    bitContracts: 15,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$3.500,00",
      "Stop Global: R$5.900,00",
      "Stop Diário: R$1.700,00",
    ],
    precoExame: "R$1.620,10",  precoExameOriginal: "R$3.600,22",
    precoSenior: "R$3.240,20", precoSeniorOriginal: "R$7.200,44",
    discountLabel: "55% OFF",
  },
  {
    subCategory: "ultra",
    name: "ULTRA 30",
    bitContracts: 25,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$5.500,00",
      "Stop Global: R$7.150,00",
      "Stop Diário: R$2.100,00",
    ],
    precoExame: "R$2.115,80",  precoExameOriginal: "R$4.701,78",
    precoSenior: "R$4.231,60", precoSeniorOriginal: "R$9.403,56",
    discountLabel: "55% OFF",
  },
  // Titan Ultra
  {
    subCategory: "titan-ultra",
    name: "TITAN ULTRA 30",
    bitContracts: 30,
    features: [
      "10 CTT BIT / 20 WDO e WIN",
      "Sem limite de tempo para o exame",
      "Repasse de 90% após aprovação, 100% membros do Clube do Valor",
      "Meta de aprovação 7K",
      "Stop diário 2.500K",
      "Stop Global 10K",
    ],
    precoPix: "R$1.610,00",   precoPixOriginal: "R$4.025,00",
    precoCartao: "R$1.710,00", precoCartaoOriginal: "R$4.275,00",
    precoContaAprovada: "R$2.907,90",
    discountLabel: "60% OFF",
  },
  {
    subCategory: "titan-ultra",
    name: "TITAN ULTRA 45",
    bitContracts: 45,
    features: [
      "20 CTT BIT / 25 WDO e WIN",
      "Sem limite de tempo para o exame",
      "Repasse de 90% após aprovação, 100% membros do Clube do Valor",
      "Meta de aprovação 8.500K",
      "Stop diário 3K",
      "Stop Global 16K",
    ],
    precoPix: "R$1.850,00",   precoPixOriginal: "R$4.625,00",
    precoCartao: "R$1.950,00", precoCartaoOriginal: "R$4.875,00",
    precoContaAprovada: "R$3.315,90",
    discountLabel: "60% OFF",
  },
  {
    subCategory: "titan-ultra",
    name: "TITAN ULTRA 65",
    bitContracts: 65,
    features: [
      "30 CTT BIT / 35 WDO e WIN",
      "Sem limite de tempo para o exame",
      "Repasse de 90% após aprovação, 100% membros do Clube do Valor",
      "Meta de aprovação 15K",
      "Stop diário 4K",
      "Stop Global 18K",
    ],
    precoPix: "R$2.599,00",   precoPixOriginal: "R$6.497,50",
    precoCartao: "R$2.699,00", precoCartaoOriginal: "R$6.747,50",
    precoContaAprovada: "R$4.588,90",
    discountLabel: "60% OFF",
  },
  {
    subCategory: "titan-ultra",
    name: "TITAN ULTRA 80",
    bitContracts: 80,
    features: [
      "40 CTT BIT / 40 WDO e WIN",
      "Sem limite de tempo para o exame",
      "Repasse de 90% após aprovação, 100% membros do Clube do Valor",
      "Meta de aprovação 18K",
      "Stop diário 5.500K",
      "Stop Global 22K",
    ],
    precoPix: "R$3.199,00",   precoPixOriginal: "R$7.997,50",
    precoCartao: "R$3.299,00", precoCartaoOriginal: "R$8.247,50",
    precoContaAprovada: "R$5.438,90",
    discountLabel: "60% OFF",
  },
]

const BONUS_LABEL = "7 dias de Sala Educacional ao Vivo"

// ── BitPlanCard ───────────────────────────────────────────────────────────────
function BitPlanCard({ plan, isActive, onCta }: { plan: BitPlan; isActive: boolean; onCta: () => void }) {
  const isTitanUltra = plan.subCategory === "titan-ultra"
  return (
    <div
      className={`
        flex-shrink-0 w-[calc(100vw-48px)] max-w-[320px] snap-center
        rounded-2xl border-2 bg-card flex flex-col transition-all duration-300
        ${isActive ? "border-primary shadow-[0_0_0_2px_theme(colors.orange.500)]" : "border-border opacity-80"}
      `}
    >
      {/* Header */}
      <div className="bg-primary rounded-t-2xl px-5 py-3 flex items-center justify-between">
        <h3 className="text-primary-foreground font-black text-sm uppercase tracking-wide">{plan.name}</h3>
        <span className="bg-primary-foreground text-primary text-xs font-black px-2 py-0.5 rounded-full">
          {plan.bitContracts} {isTitanUltra ? "CTT" : "BIT"}
        </span>
      </div>

      <div className="flex flex-col flex-1 px-5 py-4 gap-4">
        {/* Features */}
        <ul className="space-y-1.5">
          {plan.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-foreground">
              <span className="text-primary mt-0.5 text-xs">•</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {/* Pricing rows */}
        <div className="space-y-2 border-t border-border pt-3">
          {isTitanUltra ? (
            <>
              <div className="flex items-center justify-between">
                <span className="bg-foreground text-background text-xs font-black px-2 py-1 rounded min-w-[52px] text-center">PIX</span>
                <div className="text-right">
                  {plan.precoPixOriginal && <span className="text-xs line-through text-muted-foreground block">{plan.precoPixOriginal}</span>}
                  <span className="text-primary font-black text-sm">{plan.precoPix}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="bg-secondary border border-border text-foreground text-xs font-black px-2 py-1 rounded min-w-[52px] text-center">CARTÃO</span>
                <div className="text-right">
                  {plan.precoCartaoOriginal && <span className="text-xs line-through text-muted-foreground block">{plan.precoCartaoOriginal}</span>}
                  <span className="text-primary font-black text-sm">{plan.precoCartao}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-destructive text-destructive-foreground text-[9px] font-black px-1.5 py-1 rounded leading-tight text-center min-w-[52px]">CONTA<br/>APROVADA</span>
                <span className="text-foreground font-bold text-sm">{plan.precoContaAprovada}</span>
              </div>
              <p className="text-[10px] text-muted-foreground text-center font-semibold tracking-widest pt-1">PROFIT ONE</p>
            </>
          ) : (
            <>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Exame</span>
                <div className="text-right">
                  {plan.precoExameOriginal && <span className="text-xs line-through text-muted-foreground block">{plan.precoExameOriginal}</span>}
                  <span className="text-primary font-black text-base">{plan.precoExame}</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Sênior</span>
                <div className="text-right">
                  {plan.precoSeniorOriginal && <span className="text-xs line-through text-muted-foreground block">{plan.precoSeniorOriginal}</span>}
                  <span className="text-primary font-black text-base">{plan.precoSenior}</span>
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground text-center font-semibold tracking-widest pt-1">PROFIT ONE</p>
            </>
          )}
        </div>

        {/* Bonus banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-center">
          <p className="text-[10px] font-black uppercase tracking-wide text-primary">Bonus</p>
          <p className="text-xs text-foreground/80 leading-snug">{BONUS_LABEL}</p>
        </div>

        {/* CTA */}
        <button
          onClick={onCta}
          className={`
            w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide mt-auto
            transition-all duration-300
            ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary text-foreground border border-border"}
          `}
        >
          Quero esse plano
        </button>
      </div>
    </div>
  )
}

// ── Pegue e Monte Builder ─────────────────────────────────────────────────────
interface PegueMonteOption { label: string; price: number; description?: string }

const pmContratos: PegueMonteOption[] = [
  { label: "8 contratos",  price: 753  },
  { label: "12 contratos", price: 813  },
  { label: "16 contratos", price: 973  },
  { label: "20 contratos", price: 1133 },
  { label: "25 contratos", price: 1363 },
  { label: "30 contratos", price: 1553 },
]

const pmPlataforma: PegueMonteOption[] = [
  { label: "One",   price: 0,   description: "R$0,00" },
  { label: "PLUS+", price: 160, description: "R$160,00" },
]

const pmAtivos: PegueMonteOption[] = [
  { label: "WIN",   price: 0 },
  { label: "WDO",   price: 0 },
  { label: "Ambos", price: 0 },
]

const pmModalidade: PegueMonteOption[] = [
  { label: "Day Trade", price: 0 },
  { label: "Swing",     price: 0 },
]

const pmStopDiario: PegueMonteOption[] = [
  { label: "R$500,00",   price: 0   },
  { label: "R$750,00",   price: 0   },
  { label: "R$900,00",   price: 0   },
  { label: "R$1.300,00", price: 0   },
  { label: "R$1.800,00", price: 0   },
]

interface PegueMonteModalProps {
  open: boolean
  onClose: () => void
}

function PegueMonteModal({ open, onClose }: PegueMonteModalProps) {
  const [nome, setNome]           = useState("")
  const [email, setEmail]         = useState("")
  const [whatsapp, setWhatsapp]   = useState("")
  const [contratos, setContratos] = useState<PegueMonteOption | null>(null)
  const [plataforma, setPlataforma] = useState<PegueMonteOption | null>(null)
  const [clube, setClube]         = useState(false)
  const [ativos, setAtivos]       = useState<PegueMonteOption | null>(null)
  const [modalidade, setModalidade] = useState<PegueMonteOption | null>(null)
  const [stopDiario, setStopDiario] = useState<PegueMonteOption | null>(null)
  const [step, setStep]           = useState<"builder" | "lead">("builder")

  const total = (contratos?.price ?? 0) + (plataforma?.price ?? 0)

  const builderComplete = contratos && plataforma && ativos && modalidade && stopDiario

  const handleGoToLead = (e: React.FormEvent) => {
    e.preventDefault()
    setStep("lead")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const desconto = clube ? " (10% de desconto Clube do Valor)" : ""
    const msg = encodeURIComponent(
      `Olá! Quero montar meu plano *PEGUE E MONTE* na Amigos da Mesa PRO.\n\n` +
      `👤 *Dados do interessado:*\n` +
      `• Nome: ${nome}\n` +
      `• E-mail: ${email}\n` +
      `• WhatsApp: ${whatsapp}\n\n` +
      `📋 *Configuração do plano montado:*\n` +
      `• Contratos: ${contratos?.label}\n` +
      `• Plataforma: ${plataforma?.label}${desconto}\n` +
      `• Clube do Valor: ${clube ? "Sim" : "Não"}\n` +
      `• Ativos: ${ativos?.label}\n` +
      `• Modalidade: ${modalidade?.label}\n` +
      `• Stop Diário: ${stopDiario?.label}\n\n` +
      `💰 *Valor total estimado: R$${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}*\n\n` +
      `Aguardo o contato para finalizar minha adesão!`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
    onClose()
    setStep("builder")
  }

  const handleClose = () => {
    onClose()
    setStep("builder")
  }

  if (!open) return null

  const selectClass = "w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary appearance-none"
  const inputClass  = "w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  const labelClass  = "text-xs font-semibold text-muted-foreground uppercase tracking-wide"

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/70" onClick={handleClose} />
      <div className="relative z-10 w-full max-w-lg bg-card border border-border rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col" style={{ maxHeight: "92dvh" }}>

        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between flex-shrink-0 rounded-t-2xl">
          <div>
            <h3 className="text-primary-foreground font-black text-lg uppercase tracking-wide">
              {step === "builder" ? "Monte seu Plano" : "Seus Dados"}
            </h3>
            <p className="text-primary-foreground/80 text-xs mt-0.5">Pegue e Monte — personalize sua conta</p>
          </div>
          <button onClick={handleClose} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === "builder" ? (
          <form onSubmit={handleGoToLead} className="flex flex-col min-h-0 flex-1">
            <div className="overflow-y-auto flex-1">
              <div className="px-6 py-6 space-y-5">

                {/* Contratos */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Quantidade de Contratos <span className="text-destructive">*</span></label>
                  <div className="relative">
                    <select
                      required
                      value={contratos?.label ?? ""}
                      onChange={e => setContratos(pmContratos.find(o => o.label === e.target.value) ?? null)}
                      className={selectClass}
                    >
                      <option value="">Selecionar valor</option>
                      {pmContratos.map(o => (
                        <option key={o.label} value={o.label}>{o.label} — R${o.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Plataforma */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Plataforma <span className="text-destructive">*</span></label>
                  <select
                    required
                    value={plataforma?.label ?? ""}
                    onChange={e => setPlataforma(pmPlataforma.find(o => o.label === e.target.value) ?? null)}
                    className={selectClass}
                  >
                    <option value="">Selecionar valor</option>
                    {pmPlataforma.map(o => (
                      <option key={o.label} value={o.label}>{o.label} — {o.description}</option>
                    ))}
                  </select>
                </div>

                {/* Clube */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Clube do Valor</label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={clube}
                      onClick={() => setClube(v => !v)}
                      className={`relative w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${clube ? "bg-primary" : "bg-muted"}`}
                    >
                      <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${clube ? "translate-x-6" : "translate-x-0"}`} />
                    </button>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      Sim
                      <Info className="w-3.5 h-3.5 text-muted-foreground" />
                    </span>
                  </div>
                </div>

                {/* Ativos */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Ativos <span className="text-destructive">*</span></label>
                  <select
                    required
                    value={ativos?.label ?? ""}
                    onChange={e => setAtivos(pmAtivos.find(o => o.label === e.target.value) ?? null)}
                    className={selectClass}
                  >
                    <option value="">Selecionar valor</option>
                    {pmAtivos.map(o => (
                      <option key={o.label} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Modalidade */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Modalidade <span className="text-destructive">*</span></label>
                  <select
                    required
                    value={modalidade?.label ?? ""}
                    onChange={e => setModalidade(pmModalidade.find(o => o.label === e.target.value) ?? null)}
                    className={selectClass}
                  >
                    <option value="">Selecionar valor</option>
                    {pmModalidade.map(o => (
                      <option key={o.label} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>

                {/* Stop Diário */}
                <div className="space-y-1.5">
                  <label className={labelClass}>Stop Diário <span className="text-destructive">*</span></label>
                  <select
                    required
                    value={stopDiario?.label ?? ""}
                    onChange={e => setStopDiario(pmStopDiario.find(o => o.label === e.target.value) ?? null)}
                    className={selectClass}
                  >
                    <option value="">Selecionar valor</option>
                    {pmStopDiario.map(o => (
                      <option key={o.label} value={o.label}>{o.label}</option>
                    ))}
                  </select>
                </div>

              </div>
            </div>

            {/* Resumo + CTA */}
            <div className="px-6 pb-6 pt-4 border-t border-border flex-shrink-0 space-y-4">
              <div className="bg-secondary rounded-xl px-4 py-3 space-y-1.5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Contratos</span><span>{contratos?.label ?? "—"}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Plataforma</span><span>{plataforma?.label ?? "—"}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Ativos</span><span>{ativos?.label ?? "—"}</span>
                </div>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Stop Diário</span><span>{stopDiario?.label ?? "—"}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-foreground border-t border-border pt-2 mt-1">
                  <span>Total</span>
                  <span className="text-primary">
                    {total > 0 ? `R$${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}` : "—"}
                  </span>
                </div>
              </div>
              <button
                type="submit"
                disabled={!builderComplete}
                className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-wide disabled:opacity-40 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Continuar
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col min-h-0 flex-1">
            <div className="overflow-y-auto flex-1">
              <div className="px-6 py-6 space-y-4">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Preencha seus dados para finalizarmos sua montagem via WhatsApp.
                </p>

                <div className="space-y-1.5">
                  <label className={labelClass}>Nome completo</label>
                  <input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>E-mail</label>
                  <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className={inputClass} />
                </div>
                <div className="space-y-1.5">
                  <label className={labelClass}>WhatsApp</label>
                  <input required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="(11) 99999-9999" className={inputClass} />
                </div>

                {/* Resumo do plano */}
                <div className="bg-secondary rounded-xl px-4 py-3 space-y-1.5">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-2">Resumo do seu plano</p>
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Contratos</span><span>{contratos?.label}</span></div>
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Plataforma</span><span>{plataforma?.label}</span></div>
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Clube do Valor</span><span>{clube ? "Sim" : "Não"}</span></div>
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Ativos</span><span>{ativos?.label}</span></div>
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Modalidade</span><span>{modalidade?.label}</span></div>
                  <div className="flex justify-between text-xs text-muted-foreground"><span>Stop Diário</span><span>{stopDiario?.label}</span></div>
                  <div className="flex justify-between text-sm font-black text-foreground border-t border-border pt-2 mt-1">
                    <span>Total</span>
                    <span className="text-primary">R${total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 pb-6 pt-4 border-t border-border flex-shrink-0 flex flex-col gap-3">
              <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors">
                Enviar para WhatsApp
              </button>
              <button type="button" onClick={() => setStep("builder")} className="text-xs text-muted-foreground text-center hover:text-foreground transition-colors">
                Voltar e editar plano
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

const categories: { id: Category; label: string }[] = [
  { id: "exames",      label: "Exames" },
  { id: "prime-plus",  label: "Prime Plus" },
  { id: "titan",       label: "Titan" },
  { id: "senior",      label: "Sênior" },
  { id: "pegue-monte", label: "Pegue e Monte" },
  { id: "bit",         label: "BIT" },
]

const bitSubCategories: { id: BitSubCategory; label: string }[] = [
  { id: "ultra",       label: "Ultra 1.0 / 3 em 1" },
  { id: "titan-ultra", label: "Titan Ultra" },
]

// ── WhatsApp Lead Modal ───────────────────────────────────────────────────────
interface LeadModalProps {
  planName: string
  open: boolean
  onClose: () => void
}

function LeadModal({ planName, open, onClose }: LeadModalProps) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")

  if (!open) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const msg = encodeURIComponent(
      `Olá! Tenho interesse no *${planName}* da Amigos da Mesa PRO.\n\n` +
      `📋 *Dados do interessado:*\n` +
      `• Nome: ${nome}\n` +
      `• E-mail: ${email}\n` +
      `• WhatsApp: ${whatsapp}\n` +
      `• Plano escolhido: ${planName}\n\n` +
      `Gostaria de receber mais informações e iniciar minha adesão. Aguardo o contato da equipe!`
    )
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-primary px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-primary-foreground font-black text-lg uppercase tracking-wide">
              Fale com nosso time
            </h3>
            <p className="text-primary-foreground/80 text-xs mt-0.5">{planName}</p>
          </div>
          <button
            onClick={onClose}
            className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Preencha seus dados abaixo e nossa equipe entrará em contato via WhatsApp para finalizar sua adesão ao <strong className="text-foreground">{planName}</strong>.
          </p>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome completo</label>
            <input
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Seu nome"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-mail</label>
            <input
              required
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seu@email.com"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">WhatsApp</label>
            <input
              required
              value={whatsapp}
              onChange={e => setWhatsapp(e.target.value)}
              placeholder="(11) 99999-9999"
              className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plano escolhido</label>
            <div className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground">
              {planName}
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors"
          >
            Enviar para WhatsApp
          </button>

          <p className="text-[10px] text-muted-foreground text-center">
            Você será redirecionado ao WhatsApp com seus dados preenchidos. Nossa equipe responde em até 2h.
          </p>
        </form>
      </div>
    </div>
  )
}

// ── Helpers de formatação ─────────────────────────────────────────────────────
function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

// ── Plan Card ─────────────────────────────────────────────────────────────────
interface PlanCardProps {
  plan: Plan
  isActive: boolean
  isPix: boolean // true = PIX, false = Cartão 12x
  onCta: () => void
}

function PlanCard({ plan, isActive, isPix, onCta }: PlanCardProps) {
  const hasFeatures = !!plan.features
  const isPrimePlus = hasFeatures && !!plan.taxaOnePix
  const isTitanOrSenior = hasFeatures && !plan.taxaOnePix
  const ctaLabel = plan.ctaLabel ?? "Quero esse plano"
  const isUnavailable = plan.pricePix === 0 && plan.ctaLabel === "Indisponível"

  // Calcular preços
  const priceCartao12x = (plan.priceOriginal * 1.30) / 12

  // Preço a exibir
  const displayPrice = isPix ? plan.pricePix : priceCartao12x
  const displayOriginal = plan.priceOriginal

  // Taxa mensal Prime Plus
  const taxaDisplay = isPix ? plan.taxaOnePix : plan.taxaOneOriginal

  return (
    <div
      className={`
        flex-shrink-0 w-[calc(100vw-48px)] max-w-[320px] snap-center
        rounded-2xl border-2 bg-card flex flex-col
        transition-all duration-300
        ${isActive ? "border-primary shadow-[0_0_0_2px_theme(colors.orange.500)]" : "border-border opacity-80"}
        ${isUnavailable ? "opacity-50 pointer-events-none" : ""}
      `}
    >
      {/* Header */}
      <div className="bg-primary rounded-t-2xl px-5 py-3 flex items-center justify-between">
        <h3 className="text-sm font-black uppercase tracking-wide text-primary-foreground leading-tight">
          {plan.name}
        </h3>
        <span className="bg-primary-foreground text-primary text-[10px] font-black px-2 py-0.5 rounded-full flex-shrink-0">
          {plan.discountPercent}% OFF
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 px-5 py-4 gap-3">
        {isPrimePlus && (
          <>
            <ul className="space-y-1.5">
              {plan.features!.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5 text-xs flex-shrink-0">•</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-3">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide mb-1">Taxa mensal após aprovado</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">{isPix ? "PIX" : "CARTÃO"}</span>
                <div className="text-right">
                  <span className="text-xs line-through text-muted-foreground mr-1">{formatBRL(plan.taxaOneOriginal!)}</span>
                  <strong className="text-primary text-sm">{formatBRL(taxaDisplay!)}</strong>
                </div>
              </div>
            </div>
          </>
        )}

        {isTitanOrSenior && (
          <>
            <ul className="space-y-1.5">
              {plan.features!.map((feat, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="text-primary mt-0.5 text-xs flex-shrink-0">•</span>
                  <span className="leading-snug">{feat}</span>
                </li>
              ))}
            </ul>
            <div className="border-t border-border pt-3 text-center">
              <p className="text-xs text-muted-foreground line-through">{formatBRL(displayOriginal)}</p>
              {isPix ? (
                <span className="text-2xl font-black text-primary">{formatBRL(displayPrice)}</span>
              ) : (
                <div>
                  <span className="text-lg font-black text-primary">12x {formatBRL(displayPrice)}</span>
                  <p className="text-[10px] text-muted-foreground">ou {formatBRL(plan.priceOriginal * 1.30)} no cartão</p>
                </div>
              )}
            </div>
          </>
        )}

        {!hasFeatures && (
          <>
            <div className="text-center">
              <p className="text-primary font-bold text-lg">{plan.contracts} CONTRATOS</p>
              {plan.asset && <p className="text-muted-foreground text-sm font-medium">{plan.asset}</p>}
            </div>
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
            {isUnavailable ? (
              <div className="text-center py-2">
                <span className="text-sm font-bold text-destructive">INDISPONÍVEL</span>
              </div>
            ) : (
              <div className="text-center">
                <p className="text-xs text-muted-foreground line-through">{formatBRL(displayOriginal)}</p>
                {isPix ? (
                  <span className="text-2xl font-black text-primary">{formatBRL(displayPrice)}</span>
                ) : (
                  <div>
                    <span className="text-lg font-black text-primary">12x {formatBRL(displayPrice)}</span>
                    <p className="text-[10px] text-muted-foreground">ou {formatBRL(plan.priceOriginal * 1.30)} no cartão</p>
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Bonus banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-center">
          <p className="text-[10px] font-black uppercase tracking-wide text-primary">Bonus</p>
          <p className="text-xs text-foreground/80 leading-snug">{BONUS_LABEL}</p>
        </div>

        {/* CTA */}
        <button
          onClick={onCta}
          disabled={isUnavailable}
          className={`
            w-full py-3 rounded-xl font-bold text-sm uppercase tracking-wide
            transition-all duration-300 mt-auto
            ${isUnavailable
              ? "bg-muted text-muted-foreground cursor-not-allowed"
              : isActive
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-foreground border border-border"
            }
          `}
        >
          {ctaLabel}
        </button>

        {!hasFeatures && !isUnavailable && (
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed">
            *Limite diário aplicável de forma opcional. Cabe a você decidir utilizá-lo ou não.
          </p>
        )}
      </div>
    </div>
  )
}

// ── Toggle PIX/Cartão ─────────────────────────────────────────────────────────
function PaymentToggle({ isPix, onChange }: { isPix: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="flex items-center justify-center gap-4 bg-secondary/80 backdrop-blur-sm rounded-full px-6 py-2.5 border border-border">
      <span className={`text-sm font-semibold transition-colors whitespace-nowrap ${!isPix ? "text-primary" : "text-muted-foreground"}`}>
        Parcelado (12x)
      </span>
      <button
        onClick={() => onChange(!isPix)}
        className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${isPix ? "bg-primary" : "bg-muted"}`}
        aria-label="Alternar forma de pagamento"
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background shadow-md transition-transform duration-200 ${isPix ? "translate-x-6" : "translate-x-0"}`}
        />
      </button>
      <span className={`text-sm font-semibold transition-colors whitespace-nowrap ${isPix ? "text-primary" : "text-muted-foreground"}`}>
        Pix
      </span>
    </div>
  )
}

// ── Pricing Section ───────────────────────────────────────────────────────────
export function PricingSection() {
  const [activeCategory, setActiveCategory] = useState<Category>("exames")
  const [bitSubCategory, setBitSubCategory] = useState<BitSubCategory>("ultra")
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isPix, setIsPix] = useState(true) // default to PIX
  const [leadModal, setLeadModal] = useState<{ open: boolean; planName: string }>({ open: false, planName: "" })
  const [pegueMonteOpen, setPegueMonteOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const isBit = activeCategory === "bit"
  const bitPlansFiltered = bitPlans.filter(p => p.subCategory === bitSubCategory)
  const plans = plansByCategory[activeCategory]
  const activeCount = isBit ? bitPlansFiltered.length : plans.length
  const CARD_WIDTH = 320 + 16

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return
    const handleScroll = () => {
      const idx = Math.round(container.scrollLeft / CARD_WIDTH)
      setActiveCardIndex(Math.max(0, Math.min(idx, activeCount - 1)))
    }
    container.addEventListener("scroll", handleScroll, { passive: true })
    return () => container.removeEventListener("scroll", handleScroll)
  }, [activeCategory, bitSubCategory, activeCount, CARD_WIDTH])

  useEffect(() => {
    setActiveCardIndex(0)
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior })
  }, [activeCategory, bitSubCategory])

  const scrollTo = (index: number) => {
    scrollContainerRef.current?.scrollTo({ left: index * CARD_WIDTH, behavior: "smooth" })
  }

  const handleCta = (plan: Plan | string) => {
    // Se for string (BitPlan), abre modal de lead
    if (typeof plan === "string") {
      setLeadModal({ open: true, planName: plan })
      return
    }
    // Pegue e Monte sempre vai pro WhatsApp
    if (activeCategory === "pegue-monte" || plan.ctaWhatsApp) {
      const msg = encodeURIComponent(`Olá! Tenho interesse no plano ${plan.name}`)
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
      return
    }
    // PIX com link direto
    if (isPix && plan.pixLink) {
      window.open(plan.pixLink, "_blank")
      return
    }
    // Cartão ou sem link PIX -> modal de lead
    setLeadModal({ open: true, planName: plan.name })
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

        {/* BIT sub-tabs */}
        {isBit && (
          <div className="flex justify-center gap-2 mb-5">
            {bitSubCategories.map(sub => (
              <button
                key={sub.id}
                onClick={() => setBitSubCategory(sub.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all
                  ${bitSubCategory === sub.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-foreground border border-border hover:border-primary"
                  }`}
              >
                {sub.label}
              </button>
            ))}
          </div>
        )}

        {/* Regulamento */}
        <div className="flex justify-center mb-6">
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
              <div className="h-[60vh] overflow-y-auto pr-4">
                <div className="space-y-4 text-sm text-muted-foreground whitespace-pre-line">
                  {regulamento}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Payment Toggle PIX / Cartão */}
        <div className="flex justify-center mb-8" suppressHydrationWarning>
          <PaymentToggle isPix={isPix} onChange={setIsPix} />
        </div>

        {/* Carousel */}
        <div className="relative">
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

          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" } as React.CSSProperties}
          >
            <div className="flex-shrink-0 w-[calc(50vw-184px)] md:hidden" />
            {isBit
              ? bitPlansFiltered.map((plan, index) => (
                  <BitPlanCard
                    key={`${plan.name}-${index}`}
                    plan={plan}
                    isActive={index === activeCardIndex}
                    onCta={() => handleCta(plan.name)}
                  />
                ))
              : plans.map((plan, index) => (
                  <PlanCard
                    key={`${plan.name}-${plan.asset ?? ""}-${index}`}
                    plan={plan}
                    isActive={index === activeCardIndex}
                    isPix={isPix}
                    onCta={() => handleCta(plan)}
                  />
                ))
            }
            <div className="flex-shrink-0 w-[calc(50vw-184px)] md:hidden" />
          </div>

          {activeCardIndex < activeCount - 1 && (
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
          {Array.from({ length: activeCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeCardIndex ? "bg-primary w-6" : "bg-muted-foreground/30 w-2"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lead modal for Titan/WhatsApp plans */}
      <LeadModal
        open={leadModal.open}
        planName={leadModal.planName}
        onClose={() => setLeadModal({ open: false, planName: "" })}
      />

      {/* Pegue e Monte builder modal */}
      <PegueMonteModal
        open={pegueMonteOpen}
        onClose={() => setPegueMonteOpen(false)}
      />
    </section>
  )
}
