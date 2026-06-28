// « Les maths en vrai — 974 » : helpers SERVEUR uniquement (clé service role).
// Ne jamais importer depuis un composant client.

import { createClient } from "@supabase/supabase-js";

export const MATHS974_BUCKET = "maths-974";

export type Usage974 = {
  id: string;
  lieu: string;
  titre: string;
  situation: string;
  notion: string | null;
  niveau: string | null;
  question: string | null;
  reponse: string | null;
  emerveillement: string | null;
  image_path: string | null;
  image_url: string | null;
  youtube_id: string | null;
  coach_classe: string | null;
  lat: number | null;
  lng: number | null;
  masque: boolean;
  created_at: string;
};

export function maths974Client() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Accepte une URL YouTube (watch?v=, youtu.be/, shorts/, embed/) ou un ID brut,
// et renvoie l'identifiant à 11 caractères, ou null si rien d'exploitable.
export function parseYoutubeId(input: unknown): string | null {
  const raw = String(input ?? "").trim();
  if (!raw) return null;

  // ID brut déjà fourni.
  if (/^[A-Za-z0-9_-]{11}$/.test(raw)) return raw;

  const patterns = [
    /[?&]v=([A-Za-z0-9_-]{11})/,
    /youtu\.be\/([A-Za-z0-9_-]{11})/,
    /\/shorts\/([A-Za-z0-9_-]{11})/,
    /\/embed\/([A-Za-z0-9_-]{11})/,
  ];
  for (const re of patterns) {
    const m = raw.match(re);
    if (m) return m[1];
  }
  return null;
}

// Lecture des captures. includeHidden = true seulement côté admin.
export async function fetchUsages974(
  includeHidden = false
): Promise<Usage974[]> {
  let query = maths974Client()
    .from("maths_974")
    .select("*")
    .order("created_at", { ascending: false });

  if (!includeHidden) query = query.eq("masque", false);

  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Usage974[];
}
