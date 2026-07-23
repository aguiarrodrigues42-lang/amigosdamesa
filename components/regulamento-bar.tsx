"use client"

import { useState, useEffect, useRef } from "react"
import { FileText, X, Check } from "lucide-react"

/* ─── conteúdo do regulamento ─────────────────────────────── */
const SECTIONS = [
  {
    title: "Objetivo",
    body: `A Copa dos Traders Amigos da Mesa é uma campanha promocional que combina a participação dos usuários em um ranking de palpites esportivos com premiações exclusivas em margem operacional e valores em Pix.
Todos os participantes poderão acompanhar sua posição através do ranking disponibilizado no site oficial da campanha.
Poderão participar pessoas físicas, maiores de 18 anos, com cadastro válido no site oficial da campanha.
O ranking exibirá, no mínimo, os 3 (três) primeiros colocados durante a competição.`,
  },
  {
    title: "Período da Campanha",
    body: `Fase 1 – Copa dos Traders
Início: 11/06 · Término: 30/06
Durante este período os planos participantes estarão com até 70% de desconto.

Fase 2 – Grande Final da Copa dos Traders
Início: 01/07 · Término: 19/07`,
  },
  {
    title: "Participação",
    body: `A participação será realizada através do site oficial da campanha mediante cadastro do participante.
Cada participante poderá possuir apenas uma conta válida para participação.
A utilização de múltiplas contas, tentativa de fraude ou qualquer forma de manipulação resultará na desclassificação imediata.`,
  },
  {
    title: "Palpites",
    body: `Os palpites deverão ser realizados diretamente no site.
Os palpites para cada partida serão encerrados automaticamente 1 (uma) hora antes do início do respectivo jogo.
Após o encerramento do prazo, não será possível realizar alterações ou novos palpites.
O participante é responsável por garantir que seus palpites sejam registrados dentro do prazo estabelecido.`,
  },
  {
    title: "Sistema de Pontuação",
    body: `Acerto do vencedor da partida: 3 pontos
Acerto de empate: 3 pontos
Acerto do placar exato: 5 pontos
Erro no resultado: 0 ponto
Acerto do campeão da competição: 50 pontos

A escolha do campeão deverá ser realizada dentro do prazo definido pela organização e não poderá ser alterada posteriormente.
O acerto do placar exato substitui a pontuação do resultado da partida, não sendo cumulativo.`,
  },
  {
    title: "Pontuação Extra por Aquisição de Planos",
    body: `Com o objetivo de incentivar a participação, clientes que adquirirem planos participantes receberão pontuação bônus no ranking geral.

EXAMES — Iniciante 7: 10 pts · Intermediário 15: 15 pts · Avançado: 20 pts · Uno 40: 25 pts · Master: 30 pts
PRIME — Prime: 10 pts
TITAN — Titan 10: 20 pts · Titan 20: 25 pts · Titan 30/50: 30 pts
SENIOR — Iniciante: 20 pts · Intermediário: 25 pts · Avançado/Uno/Master: 30 pts
PEGUE E MONTE — PM 8: 15 pts · PM 12: 20 pts · PM 20: 20 pts
BIT — Todos os planos: 20 pts

A pontuação bônus será adicionada após a confirmação da contratação. Em caso de cancelamento, chargeback ou reembolso, a pontuação poderá ser removida.`,
  },
  {
    title: "Critérios de Desempate",
    body: `Em caso de empate na pontuação final, serão utilizados os seguintes critérios, nesta ordem:
1. Maior número de placares exatos acertados
2. Maior número de resultados acertados
3. Acerto do campeão da competição
4. Data e horário mais antigo de participação na campanha`,
  },
  {
    title: "Premiação – Fase 1",
    body: `1º Lugar — R$ 10.250 em margem operacional + R$ 600 via Pix
2º Lugar — R$ 4.250 em margem operacional + R$ 400 via Pix
3º Lugar — R$ 4.250 em margem operacional`,
  },
  {
    title: "Premiação – Fase 2",
    body: `1º Lugar — R$ 4.250 em margem operacional ou R$ 1.000 via Pix
2º Lugar — R$ 2.500 em margem operacional ou R$ 800 via Pix
3º Lugar — R$ 2.000 em margem operacional ou R$ 500 via Pix

A margem operacional será disponibilizada conforme regras internas da mesa proprietária, podendo possuir critérios específicos de utilização, saque, metas operacionais, limite de tempo e regras de risco.
O pagamento via Pix será realizado em até 7 dias úteis.`,
  },
  {
    title: "Disposições Gerais",
    body: `A Amigos da Mesa poderá revisar, corrigir ou auditar qualquer pontuação em caso de erro operacional ou inconsistência identificada.
A participação na campanha implica na aceitação integral deste regulamento.
A organização reserva-se o direito de alterar, suspender ou cancelar a campanha em casos de força maior, fraude ou situações que comprometam sua integridade.
Os casos omissos serão analisados e decididos exclusivamente pela organização da campanha.
A organização poderá solicitar documentação para validação da identidade do participante em caso de suspeita de fraude ou duplicidade.
A organização não se responsabiliza por falhas de internet, indisponibilidade do sistema, erro de dispositivo do usuário ou qualquer fator externo que impeça o envio do palpite dentro do prazo.`,
  },
]

/* ─── Modal ────────────────────────────────────────────────── */
function RegulamentoModal({ onClose }: { onClose: () => void }) {
  const [agreed, setAgreed] = useState(false)
  const overlayRef = useRef<HTMLDivElement>(null)

  /* fechar com Escape */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose() }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [onClose])

  /* travar scroll do body */
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => { document.body.style.overflow = "" }
  }, [])

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center p-0 sm:p-4"
      onClick={(e) => { if (e.target === overlayRef.current) onClose() }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" aria-hidden />

      {/* panel */}
      <div
        className="relative z-10 flex w-full flex-col overflow-hidden rounded-t-3xl border border-[#1b2024] bg-[#060809] shadow-[0_-40px_80px_-20px_rgba(0,0,0,0.9)] sm:max-w-2xl sm:rounded-2xl"
        style={{ maxHeight: "92vh" }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="reg-title"
      >
        {/* header */}
        <div className="flex items-center justify-between gap-4 border-b border-[#1b2024] px-6 py-5">
          <div className="flex items-center gap-3">
            <FileText className="h-4 w-4 shrink-0 text-[#efbd24]" aria-hidden />
            <h2 id="reg-title" className="font-display text-base font-bold uppercase tracking-[0.04em] text-[#f7f5ee]">
              Regulamento Oficial
            </h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-[#5f5e58] transition-colors hover:bg-[#1b2024] hover:text-[#f7f5ee] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efbd24]/50"
            aria-label="Fechar regulamento"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-6 py-6">
          <p className="mb-6 font-display text-lg font-bold uppercase tracking-[-0.01em] text-[#efbd24]">
            Copa dos Traders · Amigos da Mesa
          </p>

          <div className="flex flex-col gap-7">
            {SECTIONS.map((s) => (
              <div key={s.title}>
                <h3 className="mb-2 font-display text-xs font-bold uppercase tracking-[0.16em] text-[#efbd24]">
                  {s.title}
                </h3>
                <p className="whitespace-pre-line font-sans text-sm leading-relaxed text-[#c9c7be]">
                  {s.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* footer — aceite */}
        <div className="border-t border-[#1b2024] bg-[#060809] px-6 py-5">
          <label className="flex cursor-pointer items-start gap-3 select-none">
            <button
              role="checkbox"
              aria-checked={agreed}
              onClick={() => setAgreed((v) => !v)}
              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efbd24]/50 ${
                agreed
                  ? "border-[#efbd24] bg-[#efbd24]"
                  : "border-[#3a3e42] bg-transparent hover:border-[#efbd24]/50"
              }`}
            >
              {agreed && <Check className="h-3 w-3 text-[#060809]" aria-hidden />}
            </button>
            <span className="font-sans text-sm leading-relaxed text-[#9a9891]">
              Li e concordo com os{" "}
              <span className="font-semibold text-[#f7f5ee]">termos e regulamento</span>{" "}
              acima da Copa dos Traders Amigos da Mesa.
            </span>
          </label>

          <button
            onClick={onClose}
            disabled={!agreed}
            className={`mt-4 w-full rounded-xl py-3 font-sans text-sm font-bold uppercase tracking-[0.1em] transition-all duration-200 ${
              agreed
                ? "bg-[#efbd24] text-[#060809] hover:brightness-110"
                : "cursor-not-allowed bg-[#1b2024] text-[#5f5e58]"
            }`}
          >
            {agreed ? "Confirmar e fechar" : "Aceite os termos para continuar"}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Barra ────────────────────────────────────────────────── */
export function RegulamentoBar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="bg-background border-b border-[#1b2024]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4 flex-wrap">
          <p className="font-sans text-xs font-medium uppercase tracking-[0.18em] text-[#5f5e58]">
            Copa dos Traders · Campanha Oficial
          </p>

          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-2.5 rounded-lg border border-[#efbd24]/25 bg-[#efbd24]/5 px-4 py-2 transition-all duration-200 hover:border-[#efbd24]/50 hover:bg-[#efbd24]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#efbd24]/50"
            aria-label="Ver regulamento oficial da Copa dos Traders"
          >
            <FileText className="h-3.5 w-3.5 shrink-0 text-[#efbd24]" aria-hidden />
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#efbd24]">
              Regulamento oficial
            </span>
          </button>
        </div>
      </div>

      {open && <RegulamentoModal onClose={() => setOpen(false)} />}
    </>
  )
}
