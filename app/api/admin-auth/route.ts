// app/api/admin-auth/route.ts
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.ADMIN_PASSWORD) {
    const res = NextResponse.json({ ok: true });
    // cookie simple (session courte)
    res.cookies.set("admin-auth", "true", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
    });
    return res;
  }

  return new NextResponse("Unauthorized", { status: 401 });
}
