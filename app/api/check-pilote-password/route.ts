import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    const password = body?.password ?? "";

    const isValid = password === process.env.PILOTE_PASSWORD;

    return NextResponse.json({ ok: isValid });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

