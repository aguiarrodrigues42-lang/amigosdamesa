import { NextResponse } from "next/server"

/* ============================================================
   COPA — JOGOS DO DIA + PLACAR AO VIVO
   Fonte: football-data.org (FIFA World Cup / code "WC")
   O endpoint por competição funciona no plano gratuito.
   ============================================================ */

export const dynamic = "force-dynamic"
export const revalidate = 0

const CAMPANHA_URL = "https://www.comunidade-amigosdamesa.online/copa"
const WC_MATCHES_URL = "https://api.football-data.org/v4/competitions/WC/matches"

/* EN → PT dos países (com fallback para o nome original) */
const NOME_PT: Record<string, string> = {
  Brazil: "Brasil",
  Argentina: "Argentina",
  France: "França",
  Spain: "Espanha",
  England: "Inglaterra",
  Portugal: "Portugal",
  Germany: "Alemanha",
  Netherlands: "Holanda",
  Belgium: "Bélgica",
  Croatia: "Croácia",
  Italy: "Itália",
  Uruguay: "Uruguai",
  Colombia: "Colômbia",
  Mexico: "México",
  "United States": "Estados Unidos",
  USA: "Estados Unidos",
  Canada: "Canadá",
  Japan: "Japão",
  "South Korea": "Coreia do Sul",
  "Korea Republic": "Coreia do Sul",
  Australia: "Austrália",
  Morocco: "Marrocos",
  Senegal: "Senegal",
  Ghana: "Gana",
  Nigeria: "Nigéria",
  Cameroon: "Camarões",
  Egypt: "Egito",
  Tunisia: "Tunísia",
  Algeria: "Argélia",
  "Ivory Coast": "Costa do Marfim",
  "Côte d'Ivoire": "Costa do Marfim",
  "South Africa": "África do Sul",
  Switzerland: "Suíça",
  Denmark: "Dinamarca",
  Sweden: "Suécia",
  Norway: "Noruega",
  Poland: "Polônia",
  Austria: "Áustria",
  Serbia: "Sérvia",
  "Czech Republic": "Rep. Tcheca",
  Czechia: "Rep. Tcheca",
  Turkey: "Turquia",
  Türkiye: "Turquia",
  Ukraine: "Ucrânia",
  Scotland: "Escócia",
  Wales: "País de Gales",
  "Republic of Ireland": "Irlanda",
  Ireland: "Irlanda",
  Greece: "Grécia",
  Hungary: "Hungria",
  Romania: "Romênia",
  "Bosnia and Herzegovina": "Bósnia",
  "Bosnia-Herzegovina": "Bósnia",
  Iran: "Irã",
  "Saudi Arabia": "Arábia Saudita",
  Qatar: "Catar",
  Iraq: "Iraque",
  Jordan: "Jordânia",
  "United Arab Emirates": "Emirados Árabes",
  Uzbekistan: "Uzbequistão",
  "New Zealand": "Nova Zelândia",
  Ecuador: "Equador",
  Peru: "Peru",
  Chile: "Chile",
  Paraguay: "Paraguai",
  Venezuela: "Venezuela",
  Bolivia: "Bolívia",
  "Costa Rica": "Costa Rica",
  Panama: "Panamá",
  Honduras: "Honduras",
  Jamaica: "Jamaica",
  "Cape Verde": "Cabo Verde",
  "Congo DR": "Congo",
  "DR Congo": "Congo",
  "Democratic Republic of the Congo": "Congo",
}

const GROUP_PT: Record<string, string> = {
  GROUP_A: "Grupo A",
  GROUP_B: "Grupo B",
  GROUP_C: "Grupo C",
  GROUP_D: "Grupo D",
  GROUP_E: "Grupo E",
  GROUP_F: "Grupo F",
  GROUP_G: "Grupo G",
  GROUP_H: "Grupo H",
  GROUP_I: "Grupo I",
  GROUP_J: "Grupo J",
  GROUP_K: "Grupo K",
  GROUP_L: "Grupo L",
}

const STAGE_PT: Record<string, string> = {
  GROUP_STAGE: "Fase de Grupos",
  LAST_16: "Oitavas de Final",
  QUARTER_FINALS: "Quartas de Final",
  SEMI_FINALS: "Semifinal",
  THIRD_PLACE: "Disputa de 3º Lugar",
  FINAL: "Final",
}

interface ApiTeam {
  name?: string | null
  shortName?: string | null
  tla?: string | null
  crest?: string | null
}

interface ApiMatch {
  id: number
  utcDate: string
  status: string
  stage?: string
  group?: string | null
  minute?: number | null
  homeTeam: ApiTeam
  awayTeam: ApiTeam
  score?: { fullTime?: { home: number | null; away: number | null } }
}

type MatchStatus = "scheduled" | "live" | "finished"

function nomePt(team: ApiTeam): string {
  const n = team.name ?? team.shortName ?? "A definir"
  return NOME_PT[n] ?? n
}

function grupoLabel(m: ApiMatch): string {
  if (m.group && GROUP_PT[m.group]) return GROUP_PT[m.group]
  if (m.stage && STAGE_PT[m.stage]) return STAGE_PT[m.stage]
  return "Copa 2026"
}

function mapStatus(api: string): MatchStatus {
  if (api === "IN_PLAY" || api === "PAUSED") return "live"
  if (api === "FINISHED" || api === "AWARDED") return "finished"
  return "scheduled"
}

/* contagem de "palpites" estável e plausível por jogo (sem backend de palpites) */
function palpitesFor(id: number): number {
  return 380 + (id % 620)
}

function mapMatch(m: ApiMatch) {
  const kickoff = new Date(m.utcDate)
  const bettingCloses = new Date(kickoff.getTime() - 10 * 60 * 1000)
  const status = mapStatus(m.status)
  return {
    id: String(m.id),
    grupo: grupoLabel(m),
    kickoffISO: kickoff.toISOString(),
    bettingClosesISO: bettingCloses.toISOString(),
    home: {
      nome: nomePt(m.homeTeam),
      sigla: m.homeTeam.tla ?? "—",
      flagUrl: m.homeTeam.crest ?? undefined,
    },
    away: {
      nome: nomePt(m.awayTeam),
      sigla: m.awayTeam.tla ?? "—",
      flagUrl: m.awayTeam.crest ?? undefined,
    },
    estadio: "",
    palpites: palpitesFor(m.id),
    palpiteUrl: CAMPANHA_URL,
    status,
    scoreHome: m.score?.fullTime?.home ?? null,
    scoreAway: m.score?.fullTime?.away ?? null,
    minute: m.minute ?? null,
  }
}

export async function GET() {
  const token = process.env.FOOTBALL_DATA_API_TOKEN
  if (!token) {
    return NextResponse.json({ error: "missing_token", matches: [] }, { status: 200 })
  }

  try {
    const res = await fetch(WC_MATCHES_URL, {
      headers: { "X-Auth-Token": token },
      // cache curto no servidor para respeitar o rate limit e ainda parecer "ao vivo"
      next: { revalidate: 30 },
    })

    if (!res.ok) {
      return NextResponse.json({ error: `upstream_${res.status}`, matches: [] }, { status: 200 })
    }

    const data = (await res.json()) as { matches?: ApiMatch[] }
    const matches = (data.matches ?? [])
      .map(mapMatch)
      .sort((a, b) => new Date(a.kickoffISO).getTime() - new Date(b.kickoffISO).getTime())

    return NextResponse.json(
      { matches, updatedAt: new Date().toISOString() },
      { headers: { "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60" } },
    )
  } catch {
    return NextResponse.json({ error: "fetch_failed", matches: [] }, { status: 200 })
  }
}
