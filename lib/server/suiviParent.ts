// Lecture des données d'un enfant pour son parent abonné (05/11/2026). Serveur seulement.
// ⛔ Seuls les comptes INDEPENDANT (inscrits par courriel) peuvent être reliés : les
// élèves d'un établissement, donc ceux de Frédéric, n'ont ni code ni vue parent.
import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";
import { prenomCourt } from "@/lib/prenom";
import type { Bulletin } from "@/lib/bulletin/types";
import { construireRapport, type SeanceCoach } from "@/lib/suivi/calcul";
import type { RapportEnfant } from "@/lib/suivi/types";
import { ETABLISSEMENT_INDEPENDANT } from "./session";

export const ENFANTS_MAX = 6;
export const peutEtreRelie = (codeEtablissement: string) => codeEtablissement === ETABLISSEMENT_INDEPENDANT;

const FENETRE_JOURS = 120;

export async function rapportDeLEnfant(
  admin: SupabaseClient,
  codeEtablissement: string,
  codeUtilisateur: string,
): Promise<RapportEnfant> {
  const id = codeUtilisateur.replace(/^EMAIL-/, "");
  const depuis = new Date(Date.now() - FENETRE_JOURS * 86400000).toISOString();
  const [profil, seances, bulletin] = await Promise.all([
    admin.from("users_email").select("nom, classe").eq("id", id).maybeSingle(),
    admin
      .from("resultats_tutor")
      .select("created_at, classe, matiere, notion_id, nb_tentatives, bonnes_reponses, temps_sec, details")
      .eq("code_etablissement", codeEtablissement)
      .eq("code_utilisateur", codeUtilisateur)
      .gte("created_at", depuis)
      .order("created_at", { ascending: false })
      .limit(1000),
    admin
      .from("bulletins")
      .select("data")
      .eq("code_etablissement", codeEtablissement)
      .eq("code_utilisateur", codeUtilisateur)
      .maybeSingle(),
  ]);
  return construireRapport({
    prenom: prenomCourt(profil.data?.nom ?? null) || "Votre enfant",
    classe: (profil.data?.classe as string | null) ?? null,
    seances: (seances.data ?? []) as SeanceCoach[],
    bulletin: (bulletin.data?.data as Bulletin | null) ?? null,
  });
}
