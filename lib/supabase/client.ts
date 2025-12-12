// lib/supabase/client.ts
"use client";

import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    // Client de secours CHAINABLE : évite eq is not a function
    const fakeQuery: any = {
      select: () => fakeQuery,
      eq: () => fakeQuery,
      maybeSingle: async () => ({
        data: null,
        error: new Error("Supabase non configuré"),
      }),
      single: async () => ({
        data: null,
        error: new Error("Supabase non configuré"),
      }),
      insert: async () => ({
        data: null,
        error: new Error("Supabase non configuré"),
      }),
      upsert: async () => ({
        data: null,
        error: new Error("Supabase non configuré"),
      }),
      update: async () => ({
        data: null,
        error: new Error("Supabase non configuré"),
      }),
      delete: async () => ({
        data: null,
        error: new Error("Supabase non configuré"),
      }),
    };

    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithOtp: async () => ({
          data: null,
          error: new Error("Supabase non configuré"),
        }),
        verifyOtp: async () => ({
          data: null,
          error: new Error("Supabase non configuré"),
        }),
        signOut: async () => ({ error: null }),
      },
      from: () => fakeQuery,
    } as any;
  }

  return createBrowserClient(url, anonKey);
}

