// La dictée « de ta classe » — CP → Terminale, SANS TROU.
//
// On ne réécrit aucun mot : on pioche dans le Dico (lib/dico), qui couvre déjà
// l'escalier complet par matière × niveau. Chaque enrichissement du Dico
// nourrit donc automatiquement la dictée. Même principe que le mélange du
// jour : tirage DÉTERMINISTE par date → même dictée pour tous, ce jour-là.
//
// Deux portes :
//   • getDicteeNiveau("cm2", date)  → 5 mots du niveau, matières variées ;
//   • getDicteeEval6e(date)         → 5 mots du Dico ÉVAL NATIONALE 6e
//     (maths + français, les « 50 mots & gestes » officiels de la page /dico).

import { getDico, motsDeLaClasse, NIVEAUX } from "@/lib/dico";
import type { MotDicoClasse } from "@/lib/dico";
import type { DicteeMot } from "./words";

// Même numérotation de jour que le mélange (UTC, évite les demi-jours).
function daySerial(date: Date): number {
  return Math.floor(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()) / 86_400_000
  );
}

// Un mot du Dico → un mot de dictée : la définition devient l'indice, la
// matière devient le badge, l'anglais est lu avec la voix anglaise.
function versDictee(m: MotDicoClasse): DicteeMot {
  return {
    matiere: m.matiereLabel,
    lang: m.matiere === "anglais" ? "en" : "fr",
    mot: m.mot,
    indice: m.definition,
  };
}

// Mots d'un niveau, groupés par matière (pour varier les matières du tirage).
function groupesDuNiveau(niveau: string): MotDicoClasse[][] {
  const parMatiere = new Map<string, MotDicoClasse[]>();
  for (const mot of motsDeLaClasse(niveau)) {
    const g = parMatiere.get(mot.matiere) ?? [];
    g.push(mot);
    parMatiere.set(mot.matiere, g);
  }
  return [...parMatiere.values()];
}

/** Les niveaux qui ont des mots (dérivé du Dico → jamais de bouton vide). */
export const NIVEAUX_DICTEE: { slug: string; label: string }[] = NIVEAUX.filter(
  (n) => motsDeLaClasse(n.slug).length > 0
).map((n) => ({ slug: n.slug, label: n.label }));

/** Slug de classe élève (coach) → slug de niveau Dico. */
export function classeVersNiveau(classe: string | null | undefined): string | null {
  if (!classe) return null;
  const map: Record<string, string> = {
    seconde: "2nde",
    "premiere-spe": "1ere",
    "terminale-spe": "terminale",
  };
  const slug = map[classe] ?? classe;
  return NIVEAUX_DICTEE.some((n) => n.slug === slug) ? slug : null;
}

/**
 * La dictée du jour d'UN NIVEAU : n mots, matières variées, déterministe par
 * date (même logique de rotation que le mélange du jour).
 */
export function getDicteeNiveau(niveau: string, date: Date, n = 5): DicteeMot[] {
  const groupes = groupesDuNiveau(niveau);
  if (groupes.length === 0) return [];
  const s = daySerial(date);
  const M = groupes.length;
  const out: DicteeMot[] = [];
  for (let i = 0; i < n; i++) {
    const g = groupes[(((s * n + i) % M) + M) % M];
    const w = g[(((s + i) % g.length) + g.length) % g.length];
    out.push(versDictee(w));
  }
  return out;
}

/**
 * La dictée « prépa éval nationale 6e » : n mots tirés des Dicos ÉVAL
 * (maths 6e + français 6e), en alternance, déterministe par date.
 */
export function getDicteeEval6e(date: Date, n = 5): DicteeMot[] {
  const dicos = [getDico("maths", "6e"), getDico("francais", "6e")].filter(
    (d): d is NonNullable<typeof d> => !!d && d.mots.length > 0
  );
  if (dicos.length === 0) return [];
  const s = daySerial(date);
  const out: DicteeMot[] = [];
  for (let i = 0; i < n; i++) {
    const d = dicos[i % dicos.length];
    const w = d.mots[(((s + i) % d.mots.length) + d.mots.length) % d.mots.length];
    out.push({
      matiere: d.matiereLabel,
      lang: "fr",
      mot: w.mot,
      indice: w.definition,
    });
  }
  return out;
}
