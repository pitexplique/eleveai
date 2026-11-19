// LE COÛT DE L'IA, PAR UTILISATEUR ET PAR JOUR (19/11/2026) — côté serveur.
//
// À appeler juste APRÈS une réponse de l'IA, avec les tokens rendus par OpenAI.
// Écrit dans `usage_ia_cout` (supabase/usage_ia_cout.sql) ; quand le coût du mois
// dépasse `COUT_IA.budgetMensuelEuros` (lib/tarifs.ts), UN courriel d'alerte part
// à `ALERTE_IA_EMAIL` (sinon l'adresse de contact), une seule fois par mois.
// ⛔ Ne bloque jamais la réponse : toute erreur est avalée.
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { EDITEUR } from "@/lib/legal/editeur";
import { COUT_IA, coutEstimeEuros } from "@/lib/tarifs";

const admin =
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
        auth: { persistSession: false },
      })
    : null;

type Usage = { prompt_tokens?: number | null; completion_tokens?: number | null } | null | undefined;

/** La clé d'un appel sans compte : l'adresse IP. */
export const cleIP = (req: Request) =>
  `ip:${(req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "inconnue"}`;

export async function noterCoutIA(cle: string, modele: string, usage: Usage): Promise<void> {
  if (!admin || !usage) return;
  const entree = Math.max(0, Math.floor(usage.prompt_tokens ?? 0));
  const sortie = Math.max(0, Math.floor(usage.completion_tokens ?? 0));
  const cout = coutEstimeEuros(modele, entree, sortie);
  try {
    const { data, error } = await admin.rpc("noter_cout_ia", {
      p_cle: cle,
      p_modele: modele,
      p_entree: entree,
      p_sortie: sortie,
      p_cout: cout,
      p_budget: COUT_IA.budgetMensuelEuros,
    });
    if (error || !data) return;
    const { alerte, total_mois } = data as { alerte?: boolean; total_mois?: number };
    if (alerte) await envoyerAlerte(Number(total_mois ?? 0));
  } catch {
    /* le compteur ne casse jamais une réponse */
  }
}

async function envoyerAlerte(totalMois: number) {
  const cle = process.env.RESEND_API_KEY;
  if (!cle) {
    console.error(`Budget IA dépassé (${totalMois.toFixed(2)} €), RESEND_API_KEY absente : pas de courriel.`);
    return;
  }
  const budget = COUT_IA.budgetMensuelEuros;
  const total = totalMois.toFixed(2).replace(".", ",");
  await new Resend(cle).emails.send({
    from: process.env.NEWSLETTER_FROM || "EleveAI <contact@eleveai.fr>",
    to: process.env.ALERTE_IA_EMAIL || EDITEUR.contact,
    subject: `EleveAI : le coût de l'IA du mois dépasse ${budget} €`,
    text:
      `Le coût estimé de l'IA ce mois-ci est de ${total} €, au-dessus du budget de ${budget} €.\n\n` +
      `Le détail par jour et par utilisateur est dans Supabase, table usage_ia_cout.\n` +
      `Le budget se règle sur Vercel (BUDGET_IA_MENSUEL_EUROS). Cette alerte ne part qu'une fois par mois.`,
  });
}
