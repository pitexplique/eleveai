// Les codes d'abonnement (contreparties Ulule, 08/11/2026). Côté serveur seulement.
// ⭐ Un code prolonge `abonnements.acces_jusquau`, la même ligne que Stripe : tout ce qui
// lit l'accès (`accesEnCours`, /suivi, /dashboard/abonnement) le voit sans rien changer.
// L'écriture se fait dans la fonction SQL `utiliser_code_abonnement` (une transaction,
// ligne du code verrouillée) : voir supabase/codes_abonnement.sql.
import type { User } from "@supabase/supabase-js";
import { adminSupabase } from "@/lib/server/abonnement";
import { JETON_ESSAI, type TypeCode } from "@/lib/codes-abonnement";

export type InfoCode = { duree_mois: number; type: TypeCode; nb_eleves: number | null; utilise: boolean };

export type ResultatActivation = {
  resultat: "inconnu" | "deja_utilise" | "deja_utilise_par_vous" | "abonnement_mensuel" | "classe" | "ouvert";
  duree_mois?: number;
  type?: TypeCode;
  nb_eleves?: number | null;
  acces_jusquau?: string;
};

/* ─── Essai local ───────────────────────────────────────────────────────────
   Tant que le SQL n'est pas exécuté, /code s'essaie en local avec CODES_ESSAI=1
   (configuration « eleveai-codes » de .claude/launch.json) : codes et accès en
   mémoire, compte fictif, même logique que la fonction SQL. ⛔ Jamais en production. */

export const essaiLocal = () => process.env.NODE_ENV !== "production" && process.env.CODES_ESSAI === "1";

const COMPTE_ESSAI = { id: "00000000-0000-4000-8000-00000000e55a", email: "essai@eleveai.test" } as User;

type CodeEnMemoire = InfoCode & { utilise_par: string | null };
type Memoire = {
  codes: Map<string, CodeEnMemoire>;
  acces: Map<string, string>;
};
const g = globalThis as typeof globalThis & { __codesEssai?: Memoire };
function memoire(): Memoire {
  if (!g.__codesEssai) {
    const code = (duree_mois: number, type: TypeCode, nb_eleves: number | null = null): CodeEnMemoire => ({
      duree_mois, type, nb_eleves, utilise: false, utilise_par: null,
    });
    g.__codesEssai = {
      codes: new Map<string, CodeEnMemoire>([
        ["MARGO-TEST-FAM2", code(1, "famille")],
        ["MARGO-TEST-TR3M", code(3, "cadeau")],
        ["MARGO-TEST-CAD6", code(6, "cadeau")],
        ["MARGO-TEST-UNAN", code(12, "cadeau")],
        ["MARGO-TEST-KAZ3", code(12, "classe", 30)],
        // Déjà utilisé par un autre compte, pour voir le message.
        ["MARGO-TEST-PR57", { ...code(2, "famille"), utilise: true, utilise_par: "un-autre-compte" }],
      ]),
      acces: new Map(),
    };
  }
  return g.__codesEssai;
}

/** En essai local, le jeton d'essai vaut le compte fictif. */
export function compteEssai(req: Request): User | null {
  if (!essaiLocal()) return null;
  const jeton = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  return jeton === JETON_ESSAI ? COMPTE_ESSAI : null;
}

/* ─── Lire et utiliser ──────────────────────────────────────────────────── */

export async function lireCode(code: string): Promise<InfoCode | null> {
  if (essaiLocal()) {
    const c = memoire().codes.get(code);
    return c ? { duree_mois: c.duree_mois, type: c.type, nb_eleves: c.nb_eleves, utilise: c.utilise } : null;
  }
  const { data, error } = await adminSupabase()
    .from("codes_abonnement")
    .select("duree_mois, type, nb_eleves, utilise_le")
    .eq("code", code)
    .maybeSingle();
  if (error) throw new Error(`codes_abonnement : ${error.message}`);
  if (!data) return null;
  return { duree_mois: data.duree_mois, type: data.type, nb_eleves: data.nb_eleves, utilise: Boolean(data.utilise_le) };
}

export async function utiliserCode(code: string, compte: User): Promise<ResultatActivation> {
  if (essaiLocal()) return utiliserEnMemoire(code, compte.id);
  const { data, error } = await adminSupabase().rpc("utiliser_code_abonnement", {
    p_code: code,
    p_user: compte.id,
    p_email: compte.email ?? null,
  });
  if (error) throw new Error(`utiliser_code_abonnement : ${error.message}`);
  return data as ResultatActivation;
}

/** Accès en cours pour l'essai local (la page l'affiche). */
export const accesEssai = (userId: string) => memoire().acces.get(userId) ?? null;

function utiliserEnMemoire(code: string, userId: string): ResultatActivation {
  const m = memoire();
  const c = m.codes.get(code);
  if (!c) return { resultat: "inconnu" };
  const info = { duree_mois: c.duree_mois, type: c.type };
  if (c.utilise) return { resultat: c.utilise_par === userId ? "deja_utilise_par_vous" : "deja_utilise", ...info };
  c.utilise = true;
  c.utilise_par = userId;
  if (c.type === "classe") return { resultat: "classe", ...info, nb_eleves: c.nb_eleves };
  const avant = m.acces.get(userId);
  const depart = new Date(Math.max(Date.now(), avant ? new Date(avant).getTime() : 0));
  depart.setMonth(depart.getMonth() + c.duree_mois);
  m.acces.set(userId, depart.toISOString());
  return { resultat: "ouvert", ...info, acces_jusquau: depart.toISOString() };
}
