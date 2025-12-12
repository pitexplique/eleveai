// lib/supabase/client.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // On veut une erreur claire, sinon tu as des bugs incompréhensibles en prod
    throw new Error(
      "Supabase non configuré: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquants (Vercel → Environment Variables)."
    );
  }

  return createBrowserClient(url, anonKey);
}
