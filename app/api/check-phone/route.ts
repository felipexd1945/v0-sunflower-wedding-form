import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phone } = body

    if (!phone) {
      return Response.json({ error: "Telefone é obrigatório" }, { status: 400 })
    }

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data, error } = await supabase.from("rsvp_confirmations").select("id").eq("phone", phone).maybeSingle()

    if (error) {
      console.error("[v0] Erro ao verificar telefone:", error)
      return Response.json({ error: "Erro ao verificar telefone" }, { status: 400 })
    }

    return Response.json({ exists: !!data }, { status: 200 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return Response.json({ error: "Erro ao verificar telefone" }, { status: 500 })
  }
}
