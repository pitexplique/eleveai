// lib/photo-cours/auth.ts
//
// LA PORTE. Frédéric, 12/08/2026 : « on ne peut le faire qu'après
// authentification ».
//
// ⚠️ CE N'EST PAS UN DÉTAIL DE CONFORT. /api/agent-prof est aujourd'hui
// OUVERTE : qui connaît l'URL consomme la clé OpenAI. Tant que c'était du
// texte court, l'abus coûtait peu. Une route qui accepte des IMAGES coûte plus
// cher par appel et devient bien plus intéressante à faire tourner en boucle.
// La photo du cours naît donc fermée, et sur le même mécanisme que le reste du
// site : le couple (code établissement, code utilisateur) vérifié en base.
//
// OUVERT À TOUT COMPTE CONNECTÉ (Frédéric, 12/08 : « pour le moment rends-le
// accessible pour tous les connectés »). La porte vérifie qu'on est quelqu'un,
// pas qu'on est professeur.
// ⏳ À REVOIR AVANT D'OUVRIR EN GRAND : un élève photographie un manuel, pas
// son propre cours (droit d'auteur), et personne ne relit derrière lui ce que
// la machine a cru voir. Le jour où on ferme, il suffit de remplir
// TYPES_AUTORISES ci-dessous — rien d'autre à toucher.

import { createClient } from "@supabase/supabase-js";

const supabaseAdmin =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.SUPABASE_SERVICE_ROLE_KEY,
        { auth: { persistSession: false } }
      )
    : null;

/**
 * Les types de compte autorisés à photographier un cours.
 * Vide = tous les comptes actifs. Y mettre ["prof", "principal"] referme la
 * fonction aux adultes sans autre modification.
 */
const TYPES_AUTORISES: string[] = [];

export type Identite = {
  codeEtablissement: string;
  codeUtilisateur: string;
};

export type ResultatAuth =
  | {
      ok: true;
      accesId: string;
      typeUtilisateur: string;
      nom: string | null;
      /**
       * ⭐ LA CLASSE DU COMPTE FAIT FOI (12/08). « Fraction en 5e et en 4e, ce
       * n'est pas la même » — et le pont vers le coach ne peut pas ouvrir la
       * bonne notion sans elle. Un cahier peut porter l'en-tête de l'an
       * dernier ; un compte non. Elle vaut `null` pour un professeur ou un
       * parent, qui n'en ont pas : à eux, on la demande.
       */
      classe: string | null;
    }
  | { ok: false; status: number; error: string };

export function clean(value: unknown, maxLength: number): string {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function verifierCompteConnecte(
  identite: Identite
): Promise<ResultatAuth> {
  const { codeEtablissement, codeUtilisateur } = identite;

  if (!codeEtablissement || !codeUtilisateur) {
    return { ok: false, status: 401, error: "Connexion requise." };
  }

  if (!supabaseAdmin) {
    return {
      ok: false,
      status: 500,
      error: "Vérification du compte indisponible côté serveur.",
    };
  }

  const { data, error } = await supabaseAdmin
    .from("acces_etablissement")
    .select("id, type_utilisateur, nom, classe, actif")
    .eq("code_etablissement", codeEtablissement)
    .eq("code_utilisateur", codeUtilisateur)
    .eq("actif", true)
    .maybeSingle();

  if (error || !data) {
    return { ok: false, status: 403, error: "Compte non autorisé." };
  }

  if (
    TYPES_AUTORISES.length > 0 &&
    !TYPES_AUTORISES.includes(data.type_utilisateur ?? "")
  ) {
    return {
      ok: false,
      status: 403,
      error: "La photo du cours est réservée aux professeurs.",
    };
  }

  return {
    ok: true,
    accesId: data.id,
    typeUtilisateur: data.type_utilisateur ?? "",
    nom: data.nom ?? null,
    classe: data.classe ?? null,
  };
}

// ── Un frein, pas une serrure ────────────────────────────────────────────────
// Compteur en mémoire, par compte. ⚠️ Il ne survit pas au redémarrage et chaque
// instance serverless a le sien : ça ne bloque pas un attaquant décidé, ça
// empêche la boucle accidentelle (un doigt qui reste appuyé, un useEffect qui
// se déclenche en rafale) de faire une facture. La vraie limite, si le besoin
// vient, se pose en base.
const APPELS = new Map<string, number[]>();
const FENETRE_MS = 60_000;
const MAX_PAR_MINUTE = 8;

export function tropDAppels(cle: string): boolean {
  const maintenant = Date.now();
  const recents = (APPELS.get(cle) ?? []).filter((t) => maintenant - t < FENETRE_MS);
  if (recents.length >= MAX_PAR_MINUTE) {
    APPELS.set(cle, recents);
    return true;
  }
  recents.push(maintenant);
  APPELS.set(cle, recents);
  return false;
}
