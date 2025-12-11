// lib/supabase/client.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * Client Supabase côté navigateur.
 * On gère proprement le cas où les variables d'environnement
 * ne sont pas définies (pour éviter que le build Vercel casse).
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // En local / preview on affiche juste un warning,
    // en production Vercel on évite de crasher le build.
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        "[Supabase] NEXT_PUBLIC_SUPABASE_URL ou NEXT_PUBLIC_SUPABASE_ANON_KEY manquants. Client neutre retourné."
      );
    }

    // On renvoie un client "fake" très simple pour que le reste du code ne plante pas
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({
          data: { user: null, session: null },
          error: new Error("Supabase non configuré"),
        }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: async () => ({ data: null, error: new Error("Supabase non configuré") }),
        insert: async () => ({ data: null, error: new Error("Supabase non configuré") }),
        update: async () => ({ data: null, error: new Error("Supabase non configuré") }),
        delete: async () => ({ data: null, error: new Error("Supabase non configuré") }),
      }),
    } as any;
  }

  // Cas normal : tout est configuré
  return createBrowserClient(url, anonKey);
}
