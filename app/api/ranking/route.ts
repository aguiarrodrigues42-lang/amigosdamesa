import { NextResponse } from "next/server"
import { getRanking, applyRankingUpdate } from "@/lib/ranking"

export const dynamic = "force-dynamic"

/* ============================================================
   GET /api/ranking  →  público
   Retorna o ranking de rodadas atual (sem cache).
   ============================================================ */
export async function GET() {
  const payload = getRanking()
  return NextResponse.json(payload, {
    headers: { "Cache-Control": "no-store, max-age=0" },
  })
}

/* ============================================================
   POST /api/ranking  →  webhook (atualização automática futura)
   Header obrigatório:  Authorization: Bearer <RANKING_WEBHOOK_SECRET>
   Corpo (JSON):
     { "rounds": [ { id, label, dateLabel?, status, top: [{position,player,points,delta?}] } ] }
   ------------------------------------------------------------
   Faça seu provedor (planilha, painel, bot) chamar este endpoint
   sempre que o ranking mudar. Sem o secret configurado, retorna 503.
   ============================================================ */
export async function POST(req: Request) {
  const secret = process.env.RANKING_WEBHOOK_SECRET

  if (!secret) {
    return NextResponse.json(
      { ok: false, error: "Webhook não configurado. Defina RANKING_WEBHOOK_SECRET." },
      { status: 503 },
    )
  }

  const auth = req.headers.get("authorization") ?? ""
  const token = auth.toLowerCase().startsWith("bearer ") ? auth.slice(7).trim() : ""
  if (token !== secret) {
    return NextResponse.json({ ok: false, error: "Não autorizado." }, { status: 401 })
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido." }, { status: 400 })
  }

  const result = applyRankingUpdate(body)
  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 422 })
  }

  return NextResponse.json({ ok: true, payload: result.payload })
}
