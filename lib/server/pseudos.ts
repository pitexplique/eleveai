// Les prénoms ou pseudos que les élèves d'une classe se sont donnés (lib/pseudo.ts,
// supabase/passions_eleves_pseudo.sql), pour les listes du prof.
// Table ou colonne absente : carte vide, les pages restent comme avant.

import type { SupabaseClient } from "@supabase/supabase-js";

/** code_utilisateur → pseudo, pour UNE classe (que le prof possède : à vérifier avant). */
export async function pseudosDeLaClasse(admin: SupabaseClient, codeEtablissement: string): Promise<Map<string, string>> {
  // « select * » : la colonne pseudo peut manquer tant que le SQL n'a pas tourné.
  const { data, error } = await admin.from("passions_eleves").select("*").eq("code_etablissement", codeEtablissement);
  if (error || !data) return new Map();
  return new Map(
    data
      .filter((l: { pseudo?: string | null }) => typeof l.pseudo === "string" && l.pseudo.trim())
      .map((l: { code_utilisateur: string; pseudo: string }) => [l.code_utilisateur, l.pseudo.trim()])
  );
}
