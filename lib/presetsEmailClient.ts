"use client";

import { createClient } from "@/lib/supabase/client";

export type PresetEmailRow = {
  id: string;
  auth_user_id: string;
  title: string | null;
  classe: string | null;
  matiere: string | null;
  payload: any;
  created_at?: string;
};

export async function getAuthUserIdOrThrow() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("Non connecté.");
  return data.user.id;
}

export async function savePresetEmail(input: {
  title: string;
  classe: string;
  matiere: string;
  payload: any;
}) {
  const supabase = createClient();
  const auth_user_id = await getAuthUserIdOrThrow();

  const { data, error } = await supabase
    .from("presets_email")
    .insert({
      auth_user_id,
      title: input.title,
      classe: input.classe,
      matiere: input.matiere,
      payload: input.payload,
    })
    .select("id")
    .single();

  if (error) throw new Error(error.message);
  return data.id as string;
}

export async function listPresetsEmail(filter?: { classe?: string; matiere?: string; scope?: string }) {
  const supabase = createClient();
  const auth_user_id = await getAuthUserIdOrThrow();

  let q = supabase
    .from("presets_email")
    .select("id, title, classe, matiere, payload, created_at")
    .eq("auth_user_id", auth_user_id)
    .order("created_at", { ascending: false })
    .limit(50);

  if (filter?.classe) q = q.eq("classe", filter.classe);
  if (filter?.matiere) q = q.eq("matiere", filter.matiere);

  // scope dans payload.meta.scope (filtre côté client : simple & safe)
  const { data, error } = await q;
  if (error) throw new Error(error.message);

  const rows = (data ?? []) as PresetEmailRow[];
  if (!filter?.scope) return rows;

  return rows.filter((r) => r.payload?.meta?.scope === filter.scope);
}

export async function createRunEmail(input: {
  preset_id?: string | null;
  classe: string;
  matiere: string;
}) {
  const supabase = createClient();
  const auth_user_id = await getAuthUserIdOrThrow();

  const { error } = await supabase.from("preset_runs_email").insert({
    auth_user_id,
    preset_id: input.preset_id ?? null,
    classe: input.classe,
    matiere: input.matiere,
  });

  if (error) throw new Error(error.message);
}
