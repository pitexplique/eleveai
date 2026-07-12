// lib/ameliorations/honneurServer.ts
//
// Calcul serveur du palmarès « élèves à l'honneur » et utilitaires associés.
// La table retours_eleves est sous RLS sans policy : lecture via service-role
// uniquement, côté serveur. On n'expose JAMAIS le nom de famille ni les codes.
//
// Partagé entre /accueil et /votre-avis.

import "server-only";
import { createClient } from "@supabase/supabase-js";
import { type EleveALHonneur } from "@/lib/ameliorations/aLHonneur";
import { type AmeliorationRealisee } from "@/lib/ameliorations/realisees";
import { estProbablementIA } from "@/lib/detection-ia";

// Extraction du prénom (« NOM Prénom » → prénom seul, jamais le nom de famille).
// Heuristique partagée : voir lib/prenom.ts. Réexporté pour les consommateurs
// existants (app/accueil/page.tsx).
import { prenomCourt } from "@/lib/prenom";
export { prenomCourt };

// Au-delà de ce délai, le snapshot pré-calculé est considéré périmé → recalcul.
const PALMARES_TTL_MS = 60 * 60 * 1000; // 1 h

// Lecture du palmarès « avis » depuis le snapshot pré-calculé (table palmares,
// voir supabase/palmares.sql). Rafraîchissement PARESSEUX : si le snapshot a
// plus de TTL (ou n'existe pas encore), on recalcule une fois, on réécrit la
// ligne, et on la sert. Aucun cron requis ; le coût ne dépend plus du nombre
// d'élèves ni du trafic (lecture d'1 ligne en régime courant).
export async function getElevesALHonneur(): Promise<EleveALHonneur[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);

    const { data: snap } = await supabase
      .from("palmares")
      .select("data, computed_at")
      .eq("id", "avis")
      .maybeSingle();

    const frais =
      !!snap?.computed_at &&
      Date.now() - new Date(snap.computed_at).getTime() < PALMARES_TTL_MS;
    if (frais) return (snap!.data as EleveALHonneur[]) ?? [];

    // Snapshot périmé ou absent : on recalcule et on le réécrit.
    const calc = await calculerElevesALHonneur();
    if (calc.length > 0) {
      await supabase.from("palmares").upsert({
        id: "avis",
        data: calc,
        computed_at: new Date().toISOString(),
      });
      return calc;
    }
    // Recalcul vide (probablement transitoire) : on garde le dernier snapshot.
    return (snap?.data as EleveALHonneur[]) ?? [];
  } catch {
    return [];
  }
}

// « Vous l'avez demandé → c'est fait », version DATA-DRIVEN : les contributions
// que Frédéric a mises À L'HONNEUR depuis l'admin (a_lhonneur = true + un texte
// d'amélioration rédigé). Chaque ligne devient une production publique et signée
// (prénom seul, RGPD). Remplace peu à peu la liste éditoriale en dur
// (lib/ameliorations/realisees.ts), qui reste servie en complément.
export async function getAmeliorationsALHonneur(
  limite = 60
): Promise<AmeliorationRealisee[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const { data, error } = await supabase
      .from("retours_eleves")
      .select("prenom, message, amelioration, created_at")
      .eq("a_lhonneur", true)
      .not("amelioration", "is", null)
      .order("created_at", { ascending: false })
      .limit(limite);

    if (error || !data) return [];

    return data
      .map((r): AmeliorationRealisee | null => {
        const eleve = prenomCourt(r.prenom);
        const fait = (r.amelioration ?? "").trim();
        // Sans prénom exploitable ou sans texte d'amélioration, on n'affiche pas.
        if (!eleve || eleve === "Élève" || !fait) return null;
        return { eleve, demande: (r.message ?? "").trim(), fait };
      })
      .filter((a): a is AmeliorationRealisee => a !== null);
  } catch {
    return [];
  }
}

// Calcul lourd du palmarès sur les 14 derniers jours : le·la plus actif·ve par
// catégorie (idées, bugs, avis, total). Prénoms seuls, jamais deux fois le même
// élève. Séparé pour être appelé par le rafraîchissement paresseux (ci-dessus)
// — et un éventuel cron plus tard.
async function calculerElevesALHonneur(): Promise<EleveALHonneur[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];
  try {
    const supabase = createClient(url, key);
    const depuis = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("retours_eleves")
      .select("type, note, prenom, message, code_etablissement, code_eleve")
      .gte("created_at", depuis)
      .order("created_at", { ascending: false })
      .limit(2000);

    if (error || !data || data.length === 0) return [];

    type Stat = {
      prenom: string;
      idee: number;
      bug: number;
      avis: number;
      total: number;
      bestNote: number;
    };

    const parEleve = new Map<string, Stat>();
    for (const r of data) {
      // Un retour qui ressemble à un copier-collé d'IA ne met personne à
      // l'honneur (sinon le spam IA fait grimper son auteur au palmarès).
      if (estProbablementIA(r.message)) continue;
      const prenom = prenomCourt(r.prenom);
      if (!prenom || prenom === "Élève") continue;
      const id =
        r.code_etablissement && r.code_eleve
          ? `${r.code_etablissement}/${r.code_eleve}`
          : `prenom:${prenom.toLowerCase()}`;
      const s =
        parEleve.get(id) ??
        { prenom, idee: 0, bug: 0, avis: 0, total: 0, bestNote: 0 };
      s.total += 1;
      if (r.type === "idee") s.idee += 1;
      else if (r.type === "bug") s.bug += 1;
      else if (r.type === "avis") {
        s.avis += 1;
        s.bestNote = Math.max(s.bestNote, Number(r.note) || 0);
      }
      parEleve.set(id, s);
    }

    const stats = [...parEleve.values()];
    const dejaCite = new Set<string>();
    const honneur: EleveALHonneur[] = [];

    // Choisit le meilleur élève selon `tri`, pas encore mis à l'honneur.
    const ajouter = (
      tri: (a: Stat, b: Stat) => number,
      eligible: (s: Stat) => boolean,
      build: (s: Stat) => EleveALHonneur
    ) => {
      const gagnant = [...stats]
        .sort(tri)
        .find((s) => eligible(s) && !dejaCite.has(s.prenom.toLowerCase()));
      if (gagnant) {
        dejaCite.add(gagnant.prenom.toLowerCase());
        honneur.push(build(gagnant));
      }
    };

    ajouter(
      (a, b) => b.idee - a.idee,
      (s) => s.idee > 0,
      (s) => ({
        emoji: "🏆",
        categorie: "Idées de la semaine",
        eleve: s.prenom,
        pour: `${s.idee} idée${s.idee > 1 ? "s" : ""} partagée${s.idee > 1 ? "s" : ""} pour faire grandir EleveAI`,
      })
    );
    ajouter(
      (a, b) => b.bug - a.bug,
      (s) => s.bug > 0,
      (s) => ({
        emoji: "🐞",
        categorie: "Chasse aux bugs",
        eleve: s.prenom,
        pour: `${s.bug} bug${s.bug > 1 ? "s" : ""} repéré${s.bug > 1 ? "s" : ""} et signalé${s.bug > 1 ? "s" : ""}`,
      })
    );
    ajouter(
      (a, b) => b.bestNote - a.bestNote,
      (s) => s.bestNote >= 4,
      (s) => ({
        emoji: "⭐",
        categorie: "Bel avis",
        eleve: s.prenom,
        pour: `A laissé un avis ${s.bestNote}★ sur la plateforme`,
      })
    );
    ajouter(
      (a, b) => b.total - a.total,
      (s) => s.total > 0,
      (s) => ({
        emoji: "🚀",
        categorie: "Top contributeur",
        eleve: s.prenom,
        pour: `${s.total} retours envoyés au total`,
      })
    );

    return honneur;
  } catch {
    return [];
  }
}
