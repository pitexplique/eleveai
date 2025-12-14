"use client";

import { createBrowserClient } from "@supabase/ssr";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export function createClient() {
  console.log("🧪 SUPABASE URL utilisée :", SUPABASE_URL);
  console.log("🧪 SUPABASE KEY présente :", !!SUPABASE_ANON_KEY);

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    throw new Error("Supabase non configuré (env manquantes)");
  }

  return createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}



