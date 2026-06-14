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

// Format saisi : « NOM Prénom » → on ne garde que le(s) prénom(s).
export function prenomCourt(nomComplet: string | null): string {
  const v = (nomComplet ?? "").trim().replace(/\s+/g, " ");
  if (!v) return "Élève";
  const tokens = v.split(" ");
  return tokens.length > 1 ? tokens.slice(1).join(" ") : tokens[0];
}

// Palmarès calculé sur les 14 derniers jours : le·la plus actif·ve par
// catégorie (idées, bugs, avis, total). Prénoms seuls, jamais deux fois le
// même élève. Renvoie [] si la base ne répond pas (la vue retombe alors sur
// la liste éditoriale par défaut).
export async function getElevesALHonneur(): Promise<EleveALHonneur[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return [];

  try {
    const supabase = createClient(url, key);
    const depuis = new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString();
    const { data, error } = await supabase
      .from("retours_eleves")
      .select("type, note, prenom, code_etablissement, code_eleve")
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
