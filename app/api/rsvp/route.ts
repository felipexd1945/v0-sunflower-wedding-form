import { createClient } from "@supabase/supabase-js"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

    const { data, error } = await supabase
      .from("rsvp_confirmations")
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        attendance: body.attendance,
        message: body.message || null,
      })
      .select()

    if (error) {
      console.error("[v0] Supabase error:", error)
      return Response.json({ error: error.message }, { status: 400 })
    }

    return Response.json({ success: true, data }, { status: 201 })
  } catch (error) {
    console.error("[v0] API error:", error)
    return Response.json({ error: "Failed to save RSVP" }, { status: 500 })
  }
}
