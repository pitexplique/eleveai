// app/api/auth/check-email/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const email = String(body?.email || "").trim().toLowerCase();

    if (!email) {
      return NextResponse.json({ ok: false, error: "email_missing" }, { status: 400 });
    }

    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceKey) {
      return NextResponse.json(
        { ok: false, error: "server_not_configured" },
        { status: 500 }
      );
    }

    const admin = createClient(url, serviceKey, { auth: { persistSession: false } });

    const { data, error } = await admin
      .from("eleveai_users_email")
      .select("id")
      .eq("email", email)
      .maybeSingle();

    if (error) {
      return NextResponse.json(
        { ok: false, error: "db_error", details: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, exists: !!data });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: "unexpected", details: e?.message || "unknown" },
      { status: 500 }
    );
  }
}
