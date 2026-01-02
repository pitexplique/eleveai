import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json({
    vercelEnv: process.env.VERCEL_ENV || null,
    hasResendKey: !!process.env.RESEND_API_KEY,
    hasContactTo: !!process.env.CONTACT_TO,
    hasContactFrom: !!process.env.CONTACT_FROM,
  });
}
