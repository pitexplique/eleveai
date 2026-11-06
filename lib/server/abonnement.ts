// L'accès d'un compte à l'abonnement (05/11/2026). Côté serveur seulement.
import { createClient, type User } from "@supabase/supabase-js";
import { estAdresseAcademique } from "@/lib/tarifs";

export function adminSupabase() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
}

/** Le compte derrière « Authorization: Bearer <access_token Supabase> », ou null. */
export async function compteDeLaRequete(req: Request): Promise<User | null> {
  const jeton = (req.headers.get("authorization") ?? "").replace(/^Bearer\s+/i, "");
  if (!jeton) return null;
  const { data, error } = await adminSupabase().auth.getUser(jeton);
  return error ? null : data.user;
}

export type LigneAbonnement = {
  user_id: string;
  email: string | null;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  formule: "mensuel" | "annee" | null;
  statut: string;
  acces_jusquau: string | null;
  fin_programmee: boolean;
  compte_rendu: boolean;
  zone: string | null;
};

export async function lireAbonnement(userId: string): Promise<LigneAbonnement | null> {
  const { data } = await adminSupabase().from("abonnements").select("*").eq("user_id", userId).maybeSingle();
  return (data as LigneAbonnement | null) ?? null;
}

export const accesEnCours = (l: LigneAbonnement | null) =>
  Boolean(l?.acces_jusquau && new Date(l.acces_jusquau).getTime() > Date.now());

/** ⭐ L'enseignant ne paie pas : l'adresse académique est prouvée par la connexion par courriel. */
export const estEnseignant = (u: User) => Boolean(u.email && estAdresseAcademique(u.email));
