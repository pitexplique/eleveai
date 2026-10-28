// Le compteur des réponses au coach, comme celui d'IXL — connecté ou non.
// RGPD : aucune identité, juste des compteurs (supabase/coach_reponses.sql).

import { createClient } from "@supabase/supabase-js";

function admin() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
}

// Silencieux : compter ne doit JAMAIS gêner la correction.
export async function compterReponseCoach(classe: string, matiere: string, microId: string, juste: boolean) {
  try {
    await admin().rpc("compter_reponse_coach", {
      p_classe: classe.slice(0, 40),
      p_matiere: matiere.slice(0, 40),
      p_micro: microId.slice(0, 120),
      p_juste: juste,
    });
  } catch {}
}

// null si la table n'existe pas encore (SQL pas exécuté) : rien ne s'affiche.
export async function lireTotalReponsesCoach(): Promise<number | null> {
  try {
    const { data, error } = await admin().from("coach_reponses_total").select("total").eq("id", 1).maybeSingle();
    if (error || !data) return null;
    return Number(data.total);
  } catch {
    return null;
  }
}
