// « MES CLASSES » — la partie serveur commune aux routes /api/prof/*.
//
// Un prof inscrit par e-mail crée ses classes ; chaque élève devient une ligne
// de `acces_etablissement` sous le CODE DE LA CLASSE (voir
// supabase/classes_prof.sql, qui porte le pourquoi).
//
// Ce module ne doit être importé que côté serveur.

import { randomInt } from "node:crypto";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { verifySessionToken } from "@/lib/server/session";

export const NIVEAUX_CLASSE = [
  "cp", "ce1", "ce2", "cm1", "cm2",
  "6e", "5e", "4e", "3e",
  "seconde", "premiere-spe", "terminale-spe",
] as const;

export const MAX_ELEVES_PAR_CLASSE = 40;

export function supabaseAdmin(): SupabaseClient {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

/** Adresse académique : la boîte prouvée par Supabase Auth suffit. */
export function estAdresseAcademique(email: string | null | undefined): boolean {
  const e = (email ?? "").trim().toLowerCase();
  return /@ac-[a-z-]+\.fr$/.test(e) || e.endsWith("@education.gouv.fr");
}

export type ProfVerifie = { id: string; email: string | null; nom: string | null };

/**
 * Le porteur du jeton est-il un prof qui a le droit de créer des classes ?
 * Uniquement les comptes e-mail (EMAIL-<id>) : adresse académique, ou compte
 * validé à la main (users_email.prof_valide).
 */
export async function profDuJeton(
  admin: SupabaseClient,
  req: Request
): Promise<{ ok: true; prof: ProfVerifie } | { ok: false; status: number; error: string }> {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  const session = verifySessionToken(token);
  if (!session) {
    return { ok: false, status: 401, error: "Session expirée. Reconnecte-toi." };
  }
  if (!session.code_utilisateur.startsWith("EMAIL-")) {
    return {
      ok: false,
      status: 403,
      error: "« Mes classes » se gère avec un compte prof connecté par e-mail.",
    };
  }
  const id = session.code_utilisateur.slice("EMAIL-".length);

  // prof_valide n'existe qu'après supabase/classes_prof.sql : repli sans elle.
  let ligne: { email?: string | null; nom?: string | null; prof_valide?: boolean } | null = null;
  const avec = await admin
    .from("users_email")
    .select("email, nom, prof_valide")
    .eq("id", id)
    .maybeSingle();
  if (!avec.error) {
    ligne = avec.data;
  } else {
    const sans = await admin.from("users_email").select("email, nom").eq("id", id).maybeSingle();
    ligne = sans.data;
  }
  if (!ligne) return { ok: false, status: 404, error: "Compte introuvable." };

  if (!estAdresseAcademique(ligne.email) && !ligne.prof_valide) {
    return {
      ok: false,
      status: 403,
      error:
        "Pour créer une classe, connecte-toi avec ton adresse académique (@ac-…fr). " +
        "Sinon, écris-nous pour faire valider ton compte prof.",
    };
  }
  return { ok: true, prof: { id, email: ligne.email ?? null, nom: ligne.nom ?? null } };
}

/** « Frédéric Lacoste » → « LAC » ; sans nom, on prend l'e-mail. */
function troisLettres(nom: string | null, email: string | null): string {
  const source = (nom?.trim() || (email ?? "").split("@")[0].split(".").pop() || "PROF")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase();
  const mots = source.split(/[^A-Z]+/).filter(Boolean);
  const dernier = mots[mots.length - 1] ?? "PROF";
  return (dernier + "XXX").slice(0, 3);
}

/** « 6e A » → « 6A », « 4ème 2 » → « 42 », « 5e » → « 5E »… au plus 4 signes. */
export function prefixeDeClasse(nomClasse: string): string {
  const compact = nomClasse
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .replace(/^(\d+)\s*(EME|E)\b(?=.)/, "$1") // « 5e » seul reste « 5E » (sinon 501…)
    .replace(/[^A-Z0-9]/g, "");
  return (compact || "CL").slice(0, 4);
}

/** Code de classe libre en base : « LAC6A », puis « LAC6A2 », « LAC6A3 »… */
export async function codeDeClasseLibre(
  admin: SupabaseClient,
  prof: ProfVerifie,
  prefixe: string
): Promise<string> {
  const base = troisLettres(prof.nom, prof.email) + prefixe;
  for (let n = 1; n < 100; n++) {
    const code = n === 1 ? base : `${base}${n}`;
    const [{ count: c1 }, { count: c2 }] = await Promise.all([
      admin.from("acces_etablissement").select("id", { count: "exact", head: true }).eq("code_etablissement", code),
      admin.from("classes_prof").select("id", { count: "exact", head: true }).eq("code_etablissement", code),
    ]);
    if (!c1 && !c2) return code;
  }
  throw new Error("Aucun code de classe libre.");
}

// Mots courts, sans accent, connus d'un élève de CP ; chiffres 2 à 9 seulement
// (ni 0 ni 1, qu'on confond avec o et l). « Pas de mot de passe compliqué. »
const MOTS = [
  "tigre", "lapin", "zebre", "panda", "chat", "chien", "requin", "tortue",
  "mangue", "banane", "pomme", "fraise", "citron", "cerise", "ananas", "coco",
  "soleil", "nuage", "fusee", "bateau", "volcan", "plage", "vague", "piton",
  "ballon", "velo", "train", "robot", "dragon", "etoile", "fleur", "arbre",
];

// EN MAJUSCULES : le champ de /auth/signin met tout ce qu'on tape en
// majuscules (« TIGRE27 ») — un mot de passe en minuscules ne passerait pas.
export function motDePasseSimple(): string {
  return (MOTS[randomInt(MOTS.length)] + String(randomInt(2, 10)) + String(randomInt(2, 10))).toUpperCase();
}

/** 6A + 7 → « 6A07 ». */
export function codeEleve(prefixe: string, numero: number): string {
  return prefixe + String(numero).padStart(2, "0");
}

/** Le prof possède-t-il ce code de classe ? */
export async function classeDuProf(admin: SupabaseClient, profId: string, code: string) {
  const { data } = await admin
    .from("classes_prof")
    .select("id, code_etablissement, prefixe_eleves, niveau, nom_classe, nb_eleves")
    .eq("prof_id", profId)
    .eq("code_etablissement", code)
    .maybeSingle();
  return data;
}
