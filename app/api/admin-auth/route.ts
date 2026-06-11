// app/api/admin-auth/route.ts
import { NextResponse } from "next/server";
import { createAdminCookieValue } from "@/lib/server/adminAuth";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password && password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });

    // Valeur signée HMAC avec expiration : impossible à forger côté client
    // (l'ancienne valeur "true" pouvait être posée par n'importe qui).
    res.cookies.set("admin-auth", createAdminCookieValue(), {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 jour
    });

    return res;
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
