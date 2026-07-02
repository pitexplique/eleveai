// « Catalogue des actions » : helpers SERVEUR uniquement (clé service role).
// Ne jamais importer depuis un composant client.
// Lit la table public.catalogue_actions (cf. supabase/catalogue_actions.sql).

import { createClient } from "@supabase/supabase-js";

export type ActionCatalogue = {
  id: string;
  famille: string;   // coach|parcours|rituel|reviser|ouverture|evenement|cahier
  type: string;
  matiere: string;   // maths|francais|anglais|espagnol|ia|economie|transversal
  label: string;
  description: string | null;
  route: string;
  niveaux: string | null;
  duree: string | null;    // court|moyen|long|variable
  rythme: string;          // quotidien|hebdo|ponctuel
  roles: string[];         // progresser|explorer|rituel|competition|reviser|hors-ligne
  valeur: number;          // 0 → 1
  attrait: number;         // 0 → 1
  valeur_interet: number;  // valeur × attrait (calculée en base)
  etat: string;            // actif|a-creer|optionnel
  actif: boolean;
  ordre: number;
};

export function catalogueClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
}

// Lecture du catalogue, trié pour l'affichage (famille puis ordre).
export async function fetchCatalogue(): Promise<ActionCatalogue[]> {
  const { data, error } = await catalogueClient()
    .from("catalogue_actions")
    .select("*")
    .order("ordre", { ascending: true });

  if (error) throw error;

  // Les numeric de Postgres reviennent en texte via l'API : on normalise en nombres.
  return (data ?? []).map((r) => ({
    ...r,
    valeur: Number(r.valeur),
    attrait: Number(r.attrait),
    valeur_interet: Number(r.valeur_interet),
    roles: Array.isArray(r.roles) ? r.roles : [],
  })) as ActionCatalogue[];
}
