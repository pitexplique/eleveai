// Enregistrement des résultats via /api/resultats (service role côté
// serveur). Remplace les inserts Supabase directs depuis le navigateur,
// bloqués depuis l'activation du RLS. Même forme de retour que
// supabase.insert() ({ error }) pour limiter les changements dans les pages.

export type ActiviteResultat =
  | "parcours_maths"
  | "parcours_english"
  | "parcours_espagnol"
  | "parcours_francais"
  | "calcul_rapide"
  | "defis_jour"
  | "english_maths"
  | "tutor";

export async function saveResultat(
  eleve: { token?: string | null } | null,
  type: ActiviteResultat,
  resultat: Record<string, unknown>
): Promise<{ error: { message: string } | null }> {
  if (!eleve?.token) {
    // Session créée avant la mise en place des jetons signés.
    return {
      error: {
        message:
          "Ta session doit être renouvelée : déconnecte-toi puis reconnecte-toi pour enregistrer.",
      },
    };
  }

  try {
    const res = await fetch("/api/resultats", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: eleve.token, type, resultat }),
    });
    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.ok) {
      return {
        error: { message: data?.error || "Enregistrement impossible." },
      };
    }
    return { error: null };
  } catch {
    return { error: { message: "Erreur réseau : résultat non enregistré." } };
  }
}
