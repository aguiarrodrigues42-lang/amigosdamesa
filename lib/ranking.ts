/* ============================================================
   RANKING DE RODADAS — camada de dados (backend)
   ------------------------------------------------------------
   Hoje os dados vivem em memória, semeados pelo SEED abaixo.
   A API (app/api/ranking/route.ts) já expõe um webhook protegido
   (POST + Bearer secret) pronto para um provedor externo enviar
   atualizações automáticas.

   PARA PERSISTIR DE VERDADE EM PRODUÇÃO (recomendado):
   troque getRankingStore()/saveRankingStore() por leituras/escritas
   em um banco (Neon) ou KV (Upstash). A assinatura das funções foi
   pensada para essa troca ser de uma linha só.
   ============================================================ */

export type RoundStatus = "encerrada" | "ao-vivo" | "agendada"

export interface RankingTopEntry {
  /** 1, 2 ou 3 — posição no pódio da rodada */
  position: 1 | 2 | 3
  /** nome ou @ do participante */
  player: string
  /** pontos acumulados na rodada */
  points: number
  /** variação de posição vs. leitura anterior (opcional) */
  delta?: number
}

export interface RankingRound {
  /** id estável da rodada — usado como chave e alvo de webhook */
  id: string
  /** rótulo exibido, ex.: "Rodada 1" */
  label: string
  /** janela da rodada, ex.: "10 jun" */
  dateLabel?: string
  status: RoundStatus
  /** sempre 3 entradas (TOP 1, 2, 3), ordenadas por position */
  top: RankingTopEntry[]
}

export interface RankingPayload {
  /** ISO da última atualização */
  updatedAt: string
  rounds: RankingRound[]
}

/* ============================================================
   SEED — fonte da verdade enquanto não há banco conectado.
   Mantenha em sincronia com /public/data/copa-ranking.json
   (fallback do cliente caso a API falhe).
   ============================================================ */
const SEED: RankingPayload = {
  updatedAt: "2026-06-11T00:00:00-03:00",
  rounds: [
    {
      id: "rodada-1",
      label: "Rodada 1",
      dateLabel: "11 jun — 12 jul",
      status: "ao-vivo" as RoundStatus,
      top: [
        { position: 1, player: "Rafael Andrade", points: 184, delta: 0 },
        { position: 2, player: "Marina Costa", points: 171, delta: 2 },
        { position: 3, player: "Diego Fernandes", points: 166, delta: -1 },
      ],
    },
    {
      id: "rodada-2",
      label: "Rodada 2",
      dateLabel: "12 jul — 19 jul",
      status: "agendada",
      top: [
        { position: 1, player: "Bianca Ramos", points: 152, delta: 3 },
        { position: 2, player: "Rafael Andrade", points: 149, delta: -1 },
        { position: 3, player: "Lucas Teixeira", points: 141, delta: 1 },
      ],
    },
  ],
}

/* ============================================================
   STORE — em memória (troque por DB/KV para persistir)
   ============================================================ */
type GlobalWithStore = typeof globalThis & {
  __rankingStore?: RankingPayload
}

const g = globalThis as GlobalWithStore

function clone(payload: RankingPayload): RankingPayload {
  return JSON.parse(JSON.stringify(payload)) as RankingPayload
}

export function getRanking(): RankingPayload {
  if (!g.__rankingStore) {
    g.__rankingStore = clone(SEED)
  }
  return clone(g.__rankingStore)
}

/* ============================================================
   VALIDAÇÃO + APLICAÇÃO de atualização (usada pelo webhook)
   ------------------------------------------------------------
   Aceita o payload completo OU apenas algumas rodadas (merge por id).
   ============================================================ */
function isValidEntry(e: unknown): e is RankingTopEntry {
  if (typeof e !== "object" || e === null) return false
  const o = e as Record<string, unknown>
  return (
    (o.position === 1 || o.position === 2 || o.position === 3) &&
    typeof o.player === "string" &&
    o.player.trim().length > 0 &&
    typeof o.points === "number" &&
    Number.isFinite(o.points) &&
    (o.delta === undefined || typeof o.delta === "number")
  )
}

function isValidRound(r: unknown): r is RankingRound {
  if (typeof r !== "object" || r === null) return false
  const o = r as Record<string, unknown>
  const statusOk = o.status === "encerrada" || o.status === "ao-vivo" || o.status === "agendada"
  return (
    typeof o.id === "string" &&
    o.id.trim().length > 0 &&
    typeof o.label === "string" &&
    statusOk &&
    Array.isArray(o.top) &&
    o.top.length > 0 &&
    o.top.every(isValidEntry)
  )
}

export interface UpdateResult {
  ok: boolean
  error?: string
  payload?: RankingPayload
}

export function applyRankingUpdate(body: unknown): UpdateResult {
  if (typeof body !== "object" || body === null) {
    return { ok: false, error: "Corpo inválido: esperado objeto JSON." }
  }
  const o = body as Record<string, unknown>
  if (!Array.isArray(o.rounds) || o.rounds.length === 0) {
    return { ok: false, error: "Campo 'rounds' ausente ou vazio." }
  }
  if (!o.rounds.every(isValidRound)) {
    return { ok: false, error: "Uma ou mais rodadas têm formato inválido." }
  }

  const incoming = o.rounds as RankingRound[]
  const current = getRanking()

  // merge por id (atualiza existentes, adiciona novas), ordena top por position
  const byId = new Map<string, RankingRound>()
  for (const r of current.rounds) byId.set(r.id, r)
  for (const r of incoming) {
    byId.set(r.id, {
      ...r,
      top: [...r.top].sort((a, b) => a.position - b.position),
    })
  }

  const merged: RankingPayload = {
    updatedAt: new Date().toISOString(),
    rounds: Array.from(byId.values()),
  }

  g.__rankingStore = clone(merged)
  return { ok: true, payload: clone(merged) }
}
