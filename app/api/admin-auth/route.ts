// app/api/admin-auth/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });

    res.cookies.set("admin-auth", "true", {
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


