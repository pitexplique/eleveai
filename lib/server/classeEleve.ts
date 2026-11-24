// LA CLASSE D'UN ÉLÈVE, POUR LA RÈGLE DES MOYENNES (24/11/2026).
// Voir lib/moyenne/compteDansLaMoyenne.ts.
//
// Ordre : la classe de son compte (acces_etablissement.classe), sinon le
// niveau de sa classe chez le prof (classes_prof.niveau, même
// code_etablissement), sinon le repli donné (jeton, users_email). Jamais
// d'exception : une lecture ratée renvoie le repli → « tout compte ».
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function classeDeLEleve(
  admin: SupabaseClient,
  codeEtablissement: string,
  codeUtilisateur: string,
  repli: string | null = null
): Promise<string | null> {
  try {
    const [compte, classeProf] = await Promise.all([
      admin
        .from("acces_etablissement")
        .select("classe")
        .eq("code_etablissement", codeEtablissement)
        .eq("code_utilisateur", codeUtilisateur)
        .maybeSingle(),
      admin.from("classes_prof").select("niveau").eq("code_etablissement", codeEtablissement).maybeSingle(),
    ]);
    const c = (compte.data?.classe as string | null) ?? null;
    if (c) return c;
    const n = (classeProf.data?.niveau as string | null) ?? null;
    if (n) return n;
  } catch {
    /* base injoignable : le repli fait foi */
  }
  return repli;
}
