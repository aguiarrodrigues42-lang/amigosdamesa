"use client"
// pricing-section-v2 — no ScrollArea
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react"
import { RegulamentosModal } from "@/components/regulamentos-modal"

type Category = "exames" | "prime-plus" | "titan" | "senior" | "pegue-monte" | "bit"

interface Plan {
  name: string
  contracts: number
  asset?: string
  meta: string
  dailyLimit: string
  stopGlobal: string
  margemGlobal?: string
  stopGlobalAlt?: string
  priceOriginal: number
  pricePix: number
  parcelaFixa?: number
  discountPercent: number
  pixLink?: string
  cartaoLink?: string
  features?: string[]
  taxaOnePix?: number
  taxaProPix?: number
  taxaOneOriginal?: number
  taxaProOriginal?: number
  ctaLabel?: string
  ctaWhatsApp?: boolean
}

const WHATSAPP_NUMBER = "5511988071345"

const seniorFeaturesCommon = [
  "Direto no Simulador Remunerado",
]

const plansByCategory: Record<Category, Plan[]> = {
  "exames": [
    { name: "PLANO INICIANTE", contracts: 7, asset: "", meta: "R$800,00", dailyLimit: "", stopGlobal: "R$2.000,00", priceOriginal: 979.00, pricePix: 195.80, discountPercent: 80, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151501", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151501" },
    { name: "PLANO INTERMEDIÁRIO", contracts: 15, asset: "", meta: "R$1.400,00", dailyLimit: "", stopGlobal: "R$2.500,00", priceOriginal: 1310.05, pricePix: 261.01, discountPercent: 80, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151502", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151502" },
    { name: "PLANO AVANÇADO", contracts: 25, asset: "", meta: "R$3.950,00", dailyLimit: "", stopGlobal: "R$4.250,00", priceOriginal: 3160.70, pricePix: 632.14, discountPercent: 80, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151503", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151503" },
    { name: "PLANO UNO 40", contracts: 40, asset: "Índice", meta: "R$4.980,00", dailyLimit: "", stopGlobal: "R$6.250,00", priceOriginal: 3872.60, pricePix: 774.52, discountPercent: 80, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151504", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151504" },
    { name: "PLANO UNO 40", contracts: 40, asset: "Dólar", meta: "R$4.980,00", dailyLimit: "", stopGlobal: "R$6.250,00", priceOriginal: 3872.60, pricePix: 774.52, discountPercent: 80, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151505", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151505" },
    { name: "PLANO MASTER", contracts: 50, asset: "Índice e Dólar", meta: "R$9.950,00", dailyLimit: "", stopGlobal: "R$10.250,00", priceOriginal: 5446.65, pricePix: 1089.33, discountPercent: 80, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151506", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151506" },
  ],
  "prime-plus": [
    {
      name: "PRIME PLUS 6", contracts: 6,
      meta: "R$1.800,00", dailyLimit: "—", stopGlobal: "R$2.500,00", priceOriginal: 300, pricePix: 180, discountPercent: 40,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151507",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151507",
      features: ["6 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 2.500,00", "Meta de aprovação R$ 1.800,00"],
      taxaOnePix: 300, taxaProPix: 350, taxaOneOriginal: 300, taxaProOriginal: 350,
    },
    {
      name: "PRIME PLUS 11", contracts: 11,
      meta: "R$4.000,00", dailyLimit: "—", stopGlobal: "R$3.500,00", priceOriginal: 720, pricePix: 180, discountPercent: 40,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151508",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151508",
      features: ["11 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 3.500,00", "Meta de aprovação R$ 4.000,00"],
      taxaOnePix: 720, taxaProPix: 780, taxaOneOriginal: 720, taxaProOriginal: 780,
    },
    {
      name: "PRIME PLUS 16", contracts: 16,
      meta: "R$7.500,00", dailyLimit: "—", stopGlobal: "R$6.000,00", priceOriginal: 1220, pricePix: 180, discountPercent: 40,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151509",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151509",
      features: ["16 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 6.000,00", "Meta de aprovação R$ 7.500,00"],
      taxaOnePix: 1220, taxaProPix: 1320, taxaOneOriginal: 1220, taxaProOriginal: 1320,
    },
    {
      name: "PRIME PLUS 21", contracts: 21,
      meta: "R$10.000,00", dailyLimit: "—", stopGlobal: "R$9.000,00", priceOriginal: 1720, pricePix: 180, discountPercent: 40,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151510",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151510",
      features: ["21 contratos", "Sem dias mínimos para aprovação", "Sem stop diário", "Stop Global R$ 9.000,00", "Meta de aprovação R$ 10.000,00"],
      taxaOnePix: 1720, taxaProPix: 1850, taxaOneOriginal: 1720, taxaProOriginal: 1850,
    },
  ],
  "titan": [
    {
      name: "TITAN PRO 10", contracts: 30,
      meta: "R$5.000,00", dailyLimit: "", stopGlobal: "R$5.000,00", priceOriginal: 2622.00, pricePix: 786.60, discountPercent: 70,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151511",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151511",
      features: ["Meta de aprovação R$ 5.000,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação", "Stop Global R$ 5.000,00"],
    },
    {
      name: "TITAN PRO 20", contracts: 45,
      meta: "R$8.000,00", dailyLimit: "", stopGlobal: "R$8.000,00", priceOriginal: 3974.63, pricePix: 1192.39, discountPercent: 70,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151512",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151512",
      features: ["Meta de aprovação R$ 8.000,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação", "Stop Global R$ 8.000,00"],
    },
    {
      name: "TITAN PRO 30", contracts: 65,
      meta: "R$14.000,00", dailyLimit: "", stopGlobal: "R$14.000,00", priceOriginal: 5308.00, pricePix: 1592.40, discountPercent: 70,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151513",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151513",
      features: ["Meta de aprovação R$ 14.000,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação", "Stop Global R$ 14.000,00"],
    },
    {
      name: "TITAN PRO 50", contracts: 80,
      meta: "R$10.000,00", dailyLimit: "", stopGlobal: "R$10.000,00", priceOriginal: 6641.33, pricePix: 1992.40, discountPercent: 70,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151514",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151514",
      features: ["Meta de aprovação R$ 10.000,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação", "Stop Global R$ 10.000,00"],
    },
  ],
  "senior": [
    {
      name: "INICIANTE 7", contracts: 7,
      meta: "—", dailyLimit: "", stopGlobal: "R$2.000,00", priceOriginal: 1783.51, pricePix: 802.58, discountPercent: 55,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151515",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151515",
      features: [...seniorFeaturesCommon, "Stop Global R$ 2.000,00"],
    },
    {
      name: "INTERMEDIÁRIO 15", contracts: 15,
      meta: "—", dailyLimit: "", stopGlobal: "R$2.500,00", priceOriginal: 2366.71, pricePix: 1065.02, discountPercent: 55,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151516",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151516",
      features: [...seniorFeaturesCommon, "Stop Global R$ 2.500,00"],
    },
    {
      name: "AVANÇADO 25", contracts: 25,
      meta: "—", dailyLimit: "", stopGlobal: "R$4.250,00", priceOriginal: 6122.64, pricePix: 2755.19, discountPercent: 55,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151517",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151517",
      features: [...seniorFeaturesCommon, "Stop Global R$ 4.250,00"],
    },
    {
      name: "UNO 40 ÍNDICE", contracts: 40,
      asset: "",
      meta: "—", dailyLimit: "", stopGlobal: "R$6.250,00", priceOriginal: 7599.20, pricePix: 3419.64, discountPercent: 55,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151519",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151519",
      features: [...seniorFeaturesCommon, "Stop Global R$ 6.250,00"],
    },
    {
      name: "UNO 40 DÓLAR", contracts: 40,
      asset: "",
      meta: "—", dailyLimit: "", stopGlobal: "R$6.250,00", priceOriginal: 7599.20, pricePix: 3419.64, discountPercent: 55,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151518",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151518",
      features: [...seniorFeaturesCommon, "Stop Global R$ 6.250,00"],
    },
    {
      name: "MASTER 50", contracts: 50,
      meta: "—", dailyLimit: "", stopGlobal: "R$10.250,00", priceOriginal: 9297.73, pricePix: 4183.98, discountPercent: 55,
      pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151520",
      cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151520",
      features: [...seniorFeaturesCommon, "Stop Global R$ 10.250,00"],
    },
  ],
  "pegue-monte": [
    { name: "PEGUE E MONTE 8", contracts: 8, meta: "R$1.500,00", dailyLimit: "", stopGlobal: "R$2.500,00", priceOriginal: 1731.90, pricePix: 346.38, discountPercent: 80, features: ["Stop Global R$2.500,00", "Meta de Aprovação R$1.500,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação"], ctaLabel: "Monte seu plano", ctaWhatsApp: false, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151521", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151521" },
    { name: "PEGUE E MONTE 12", contracts: 12, meta: "R$1.920,00", dailyLimit: "", stopGlobal: "R$3.500,00", priceOriginal: 1984.90, pricePix: 396.98, discountPercent: 80, features: ["Stop Global R$3.500,00", "Meta de Aprovação R$1.920,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação"], ctaLabel: "Monte seu plano", ctaWhatsApp: false, pixLink: "https://checkout.neonpay.com.br/checkout/cmn3xmvvs00bz1ro3qyca7rhl?offer=IYQ93ZR", cartaoLink: "https://checkout.neonpay.com.br/checkout/cmn3xmvvs00bz1ro3qyca7rhl?offer=IYQ93ZR" },
    { name: "PEGUE E MONTE 20", contracts: 20, meta: "R$2.832,00", dailyLimit: "", stopGlobal: "R$4.720,00", priceOriginal: 2691.00, pricePix: 538.20, discountPercent: 80, features: ["Stop Global R$4.720,00", "Meta de Aprovação R$2.832,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação"], ctaLabel: "Monte seu plano", ctaWhatsApp: false, pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151523", cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151523" },
    { name: "PEGUE E MONTE 27", contracts: 27, meta: "R$3.612,00", dailyLimit: "", stopGlobal: "R$6.020,00", priceOriginal: 1690.50, pricePix: 0, discountPercent: 80, features: ["Stop Global R$6.020,00", "Meta de Aprovação R$3.612,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação"], ctaLabel: "Indisponível", ctaWhatsApp: false },
    { name: "PEGUE E MONTE 32", contracts: 32, meta: "R$4.890,00", dailyLimit: "", stopGlobal: "R$8.150,00", priceOriginal: 2120.60, pricePix: 0, discountPercent: 80, features: ["Stop Global R$8.150,00", "Meta de Aprovação R$4.890,00", "Sem limite diário para o exame", "Sem mínimos de dias operados para aprovação"], ctaLabel: "Indisponível", ctaWhatsApp: false },
  ],
  "bit": [],
}

// ── BIT plans ──────────────────────────────────────────────────────────────
interface BitPlan {
  name: string
  bitContracts: number
  features: string[]
  precoExame: string
  precoExameOriginal: string
  valorOriginal: number
  precoPix: string
  precoCartao: string
  precoSeniorOriginal: string
  pixLink?: string
  cartaoLink?: string
  indisponivel?: boolean
}

// BIT - precoCartao recalculado: (precoPix * 1.9372) / 12
const bitPlans: BitPlan[] = [
  {
    name: "ULTRA 10",
    bitContracts: 5,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$900,00",
      "Stop Global: R$1.950,00",
      "Sem limite diário para o exame",
      "Sem mínimos de dias operados para aprovação",
    ],
    precoExame: "R$321,31", precoExameOriginal: "R$714,03",
    valorOriginal: 714.03,
    precoPix: "R$321,31",
    precoCartao: "R$51,88",  // (321.31 * 1.9372) / 12 = 51,88
    precoSeniorOriginal: "R$714,03",
    pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151528",
    cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151528",
  },
  {
    name: "ULTRA 15",
    bitContracts: 10,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$2.500,00",
      "Stop Global: R$3.510,00",
      "Sem limite diário para o exame",
      "Sem mínimos de dias operados para aprovação",
    ],
    precoExame: "R$460,86", precoExameOriginal: "R$1.024,13",
    valorOriginal: 1024.13,
    precoPix: "R$460,86",
    precoCartao: "R$74,40", // (460.86 * 1.9372) / 12 = 74,40
    precoSeniorOriginal: "R$1.024,13",
    pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151529",
    cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151529",
  },
  {
    name: "ULTRA 20",
    bitContracts: 15,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$3.500,00",
      "Stop Global: R$5.900,00",
      "Sem limite diário para o exame",
      "Sem mínimos de dias operados para aprovação",
    ],
    precoExame: "R$838,40", precoExameOriginal: "R$1.863,11",
    valorOriginal: 1863.11,
    precoPix: "R$838,40",
    precoCartao: "R$135,31", // (838.40 * 1.9372) / 12 = 135,31
    precoSeniorOriginal: "R$1.863,11",
    pixLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151530",
    cartaoLink: "https://app.neoncheckout.com/checkout/9MN5X0BRQWSBE?product=151530",
  },
  {
    name: "ULTRA 30",
    bitContracts: 25,
    features: [
      "Ativos: BITCOIN, WIN, WDO",
      "Aprovação: R$5.500,00",
      "Stop Global: R$7.150,00",
      "Sem limite diário para o exame",
      "Sem mínimos de dias operados para aprovação",
    ],
    precoExame: "R$2.433,17", precoExameOriginal: "Indisponivel",
    valorOriginal: 2433.17,
    precoPix: "INDISPONÍVEL",
    precoCartao: "INDISPONÍVEL",
    precoSeniorOriginal: "R$2.433,17",
    indisponivel: true,
    pixLink: "https://pedido.amigosdamesa.shop/pay/3c1aec92-9457-4f48-8d2c-be7fa6be4200",
    cartaoLink: "https://pedido.amigosdamesas.shop/pay/c73bc77e-2059-458b-b99c-62989894fffc",
  },
]

const BONUS_LABEL = "7 dias de Sala Educacional ao Vivo"

// ── BitPlanCard ───────────────────────────────────────────────────────────────
function BitPlanCard({ plan, isActive, isPix, onCta }: { plan: BitPlan; isActive: boolean; isPix: boolean; onCta: () => void }) {
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
        <span className="bg-primary-foreground text-primary text-[10px] font-black px-2 py-0.5 rounded-full">
          55% OFF
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
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wide">Exame</span>
            <div className="text-right">
              <span className="text-xs line-through text-muted-foreground block">{plan.precoExameOriginal}</span>
              {isPix ? (
                <span className="text-primary font-black text-base">{plan.precoPix}</span>
              ) : (
                <span className="text-primary font-black text-base">12x {plan.precoCartao}</span>
              )}
            </div>
          </div>
          <p className="text-[10px] text-muted-foreground text-center font-semibold tracking-widest pt-1">PROFIT ONE</p>
        </div>

        {/* Bonus banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-center space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">Bônus</p>
          <p className="text-xs text-foreground/80 leading-snug">Sem limite diário para o exame</p>
          <p className="text-xs text-foreground/80 leading-snug">Sem mínimos de dias operados para aprovação</p>
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
  { label: "8 contratos", price: 753 },
  { label: "12 contratos", price: 813 },
  { label: "16 contratos", price: 973 },
  { label: "20 contratos", price: 1133 },
  { label: "25 contratos", price: 1363 },
  { label: "30 contratos", price: 1553 },
]

const pmPlataforma: PegueMonteOption[] = [
  { label: "One", price: 0, description: "R$0,00" },
  { label: "PLUS+", price: 160, description: "R$160,00" },
]

const pmAtivos: PegueMonteOption[] = [
  { label: "WIN", price: 0 },
  { label: "WDO", price: 0 },
  { label: "Ambos", price: 0 },
]

const pmModalidade: PegueMonteOption[] = [
  { label: "Day Trade", price: 0 },
  { label: "Swing", price: 0 },
]

const pmStopDiario: PegueMonteOption[] = [
  { label: "R$500,00", price: 0 },
  { label: "R$750,00", price: 0 },
  { label: "R$900,00", price: 0 },
  { label: "R$1.300,00", price: 0 },
  { label: "R$1.800,00", price: 0 },
]

interface PegueMonteModalProps {
  open: boolean
  onClose: () => void
}

function PegueMonteModal({ open, onClose }: PegueMonteModalProps) {
  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [contratos, setContratos] = useState<PegueMonteOption | null>(null)
  const [plataforma, setPlataforma] = useState<PegueMonteOption | null>(null)
  const [clube, setClube] = useState(false)
  const [ativos, setAtivos] = useState<PegueMonteOption | null>(null)
  const [modalidade, setModalidade] = useState<PegueMonteOption | null>(null)
  const [stopDiario, setStopDiario] = useState<PegueMonteOption | null>(null)
  const [step, setStep] = useState<"builder" | "lead">("builder")

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
  const inputClass = "w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
  const labelClass = "text-xs font-semibold text-muted-foreground uppercase tracking-wide"

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
  { id: "exames", label: "Exames" },
  { id: "prime-plus", label: "Prime Plus" },
  { id: "titan", label: "Titan" },
  { id: "senior", label: "Sênior" },
  { id: "pegue-monte", label: "Pegue e Monte" },
  { id: "bit", label: "BIT" },
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
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-card border border-border rounded-2xl shadow-2xl overflow-hidden">
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
        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Preencha seus dados abaixo e nossa equipe entrará em contato via WhatsApp para finalizar sua adesão ao <strong className="text-foreground">{planName}</strong>.
          </p>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Nome completo</label>
            <input required value={nome} onChange={e => setNome(e.target.value)} placeholder="Seu nome" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">E-mail</label>
            <input required type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">WhatsApp</label>
            <input required value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="(11) 99999-9999" className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Plano escolhido</label>
            <div className="w-full bg-secondary border border-border rounded-xl px-4 py-3 text-sm text-foreground">{planName}</div>
          </div>
          <button type="submit" className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-black text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors">
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

// ── Helpers de formatação ──────────────────────────────────────────────────────
function formatBRL(value: number): string {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

// ── Plan Card ─────────────────────────────────────────────────────────────────
interface PlanCardProps {
  plan: Plan
  isActive: boolean
  isPix: boolean
  onCta: () => void
}

function PlanCard({ plan, isActive, isPix, onCta }: PlanCardProps) {
  const hasFeatures = !!plan.features
  const isPrimePlus = hasFeatures && !!plan.taxaOnePix
  const isTitanOrSenior = hasFeatures && !plan.taxaOnePix
  const ctaLabel = plan.ctaLabel ?? "Quero esse plano"
  const isUnavailable = plan.pricePix === 0 && plan.ctaLabel === "Indisponível"

  // ══════════════════════════════════════════════════════════════════════════
  // CÁLCULO CARTÃO 12x — baseado na calculadora Neon Checkout
  // Taxa 12x = 93,72% → multiplicador = 1.9372
  // Fórmula: (valorPix * 1.9372) / 12
  // Prime Plus: (180 * 1.9372) / 12 = R$29,06/mês
  // ══════════════════════════════════════════════════════════════════════════
  const isPrimePlusCategory = !!plan.taxaOnePix
  const priceCartao12x = isPrimePlusCategory
    ? (plan.pricePix * 1.9372) / 12
    : (plan.pricePix * 1.9372) / 12

  const displayPrice = isPix ? plan.pricePix : priceCartao12x
  const displayOriginal = plan.priceOriginal

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
            <div className="border-t border-border pt-3 text-center">
              <p className="text-xs text-muted-foreground line-through">{formatBRL(displayOriginal)}</p>
              {isPix ? (
                <span className="text-2xl font-black text-primary">{formatBRL(displayPrice)}/mês</span>
              ) : (
                <span className="text-lg font-black text-primary">12x {formatBRL(displayPrice)}</span>
              )}
            </div>
            <div className="border-t border-border pt-3 space-y-1">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">Taxa após aprovado:</p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-muted-foreground">ONE</span>
                <strong className="text-primary text-sm">{formatBRL(plan.taxaOnePix!)}</strong>
                <span className="text-xs font-semibold text-muted-foreground">PRO</span>
                <strong className="text-primary text-sm">{formatBRL(plan.taxaProPix!)}</strong>
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
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {/* Bonus banner */}
        <div className="bg-primary/10 border border-primary/30 rounded-lg px-3 py-2 text-center space-y-0.5">
          <p className="text-[10px] font-black uppercase tracking-widest text-primary">Bônus</p>
          <p className="text-xs text-foreground/80 leading-snug">Sem limite diário para o exame</p>
          <p className="text-xs text-foreground/80 leading-snug">Sem mínimos de dias operados para aprovação</p>
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
            Conta demo aplicável de forma opcional. Caso o nível decida utilizá-la ou não.
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
  const [activeCardIndex, setActiveCardIndex] = useState(0)
  const [isPix, setIsPix] = useState(true)
  const [leadModal, setLeadModal] = useState<{ open: boolean; planName: string }>({ open: false, planName: "" })
  const [pegueMonteOpen, setPegueMonteOpen] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const isBit = activeCategory === "bit"
  const plans = plansByCategory[activeCategory]
  const activeCount = isBit ? bitPlans.length : plans.length
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
  }, [activeCategory, activeCount, CARD_WIDTH])

  useEffect(() => {
    setActiveCardIndex(0)
    scrollContainerRef.current?.scrollTo({ left: 0, behavior: "instant" as ScrollBehavior })
  }, [activeCategory])

  const scrollTo = (index: number) => {
    scrollContainerRef.current?.scrollTo({ left: index * CARD_WIDTH, behavior: "smooth" })
  }

  const handleCta = (plan: Plan | string) => {
    if (typeof plan === "string") {
      setLeadModal({ open: true, planName: plan })
      return
    }
    if (isPix && plan.pixLink) {
      window.open(plan.pixLink, "_blank")
      return
    }
    if (!isPix && plan.cartaoLink) {
      window.open(plan.cartaoLink, "_blank")
      return
    }
    if (plan.ctaWhatsApp) {
      const msg = encodeURIComponent(`Olá! Tenho interesse no plano ${plan.name}`)
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank")
      return
    }
    setLeadModal({ open: true, planName: plan.name })
  }

  return (
    <section id="planos" className="py-16 bg-background scroll-mt-20">
      <div className="mx-auto px-4 max-w-5xl">

        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
            Proposta de Mesa Proprietária
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-foreground">
            Escolha seu Plano
          </h2>
        </div>

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

        <div className="flex justify-center mb-6">
          <RegulamentosModal />
        </div>

        <div className="flex justify-center mb-8" suppressHydrationWarning>
          <PaymentToggle isPix={isPix} onChange={setIsPix} />
        </div>

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
              ? bitPlans.map((plan, index) => (
                <BitPlanCard
                  key={`${plan.name}-${index}`}
                  plan={plan}
                  isActive={index === activeCardIndex}
                  isPix={isPix}
                  onCta={() => {
                    if (isPix && plan.indisponivel) return
                    if (isPix && plan.pixLink) {
                      window.open(plan.pixLink, "_blank")
                    } else if (!isPix && plan.cartaoLink) {
                      window.open(plan.cartaoLink, "_blank")
                    } else {
                      handleCta(plan.name)
                    }
                  }}
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

        <div className="flex flex-wrap justify-center gap-2 mt-6">
          {["Saques Mensais", "Saques Quinzenais", "Saques Semanais", "Saques Diários"].map((label) => (
            <span
              key={label}
              className="px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold"
            >
              {label}
            </span>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: activeCount }).map((_, index) => (
            <button
              key={index}
              onClick={() => scrollTo(index)}
              className={`h-2 rounded-full transition-all duration-300 ${index === activeCardIndex ? "bg-primary w-6" : "bg-muted-foreground/30 w-2"
                }`}
            />
          ))}
        </div>
      </div>

      <LeadModal
        open={leadModal.open}
        planName={leadModal.planName}
        onClose={() => setLeadModal({ open: false, planName: "" })}
      />

      <PegueMonteModal
        open={pegueMonteOpen}
        onClose={() => setPegueMonteOpen(false)}
      />
    </section>
  )
}
