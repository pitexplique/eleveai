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

// Une réponse FAUSSE, telle que l'élève l'a tapée, sans aucune identité
// (supabase/coach_reponses_fausses.sql). Lue et supprimée dans
// /admin/reponses-fausses. Purge des 30 jours, une fois sur cent : un élève
// peut taper son prénom dans la case.
export async function noterReponseFausse(
  q: { classe: string; matiere: string; microId: string; questionId: string; enonce: string; attendu: string[] },
  reponse: string
) {
  try {
    const db = admin();
    await db.from("coach_reponses_fausses").insert({
      classe: q.classe.slice(0, 40),
      matiere: q.matiere.slice(0, 40),
      micro_id: q.microId.slice(0, 120),
      question_id: q.questionId.slice(0, 160),
      enonce: q.enonce.slice(0, 400),
      attendu: q.attendu.join(" | ").slice(0, 200) || null,
      reponse: reponse.trim().slice(0, 120),
    });
    if (Math.random() < 0.01) {
      await db
        .from("coach_reponses_fausses")
        .delete()
        .lt("created_at", new Date(Date.now() - 30 * 86_400_000).toISOString());
    }
  } catch {}
}
