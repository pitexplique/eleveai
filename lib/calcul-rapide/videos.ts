// La vidéo EleveAI d'une question du défi calcul rapide (« Tu ne comprends pas
// la notion ? »). ⛔ 31/10/2026 : le bouton ouvrait une recherche YouTube ; les
// élèves regardent NOS vidéos, sur le lecteur du site (/video/<id>, MP4 sur R2).
//
// Sans dépendance : utilisable côté navigateur. La page serveur lit la table R2
// et ne passe que les paysages des classes du niveau (quelques Ko).
import type { NiveauCalculRapide } from "./types";

/** rang : 0 pour la classe de l'élève, puis 1, 2… (DOSSIERS_VIDEOS). */
export type VideoDefi = { id: string; mots: string; publiee: boolean; rang: number };

/** Les dossiers de manim/sorties où chercher, du plus proche au plus lointain. */
export const DOSSIERS_VIDEOS: Record<NiveauCalculRapide, string[]> = {
  CP: ["cp", "bases"],
  CE1: ["cp", "cm1", "bases"],
  CE2: ["cm1", "cp", "bases"],
  CM1: ["cm1", "bases"],
  CM2: ["cm2", "cm1", "bases"],
  "6e": ["6e", "bases"],
  "5e": ["5e", "6e", "bases"],
  "4e": ["4e", "5e", "6e", "bases"],
  "3e": ["3e", "4e", "bases"],
  seconde: ["seconde", "3e"],
  "premiere-spe": ["premiere", "premiere-commun", "seconde"],
  "terminale-spe": ["terminale", "premiere"],
  adulte: ["bases", "6e", "5e"],
};

// Des mots qui ne disent rien de la notion : ils feraient tout correspondre.
const VIDES = new Set([
  "avec", "calcul", "calcule", "calculer", "chapitre", "comprendre", "dans",
  "defi", "defis", "episode", "eleveai", "maths", "mental", "methode", "minute", "nombre",
  "pour", "probleme", "quotidien", "simple", "sont", "tout", "utile", "video",
]);

// Des notions dont le nom ne se lit dans aucun titre de vidéo (ou s'y lit à
// tort : « produit » attirait une vidéo de probabilités). L'alias REMPLACE le nom.
const ALIAS_NOTIONS: Record<string, string> = {
  grandeurs_mesures: "longueur convertir",
  mesures: "longueur convertir",
  mesures_conversions: "longueur convertir",
  produit_scalaire: "scalaire",
};

/** Les mots d'une vidéo : son id et son titre, sans l'accroche quand le titre
 *  en a une (« 6/8 de litre : combien de quarts ? — Fractions égales — épisode 3 »). */
export function motsVideo(id: string, titre: string): string {
  const parts = titre.split(/\s+[—–-]\s+/);
  const sujet = parts.length >= 3 || /episode|épisode/i.test(titre) ? parts.slice(1) : parts;
  return racines(`${id} ${sujet.join(" ")}`).join(" ");
}

// Les abréviations des ids de vidéos (« 6e-frac-comparer », « 5e-stats-defi »).
const ABREGES: Record<string, string> = {
  frac: "fraction", prop: "proportionnalite", proba: "probabilite", stats: "statistique",
};

/** Racines des mots utiles : sans accents, sans pluriel, 6 lettres au plus. */
export function racines(texte: string): string[] {
  const mots = texte
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((m) => ABREGES[m] ?? m)
    .filter((m) => m.length >= 4 && !VIDES.has(m))
    .map((m) => m.replace(/[sx]$/, "").slice(0, 6));
  return [...new Set(mots)];
}

/**
 * La meilleure vidéo pour la notion et la micro de la question : le plus de
 * mots en commun. Il en faut un de la NOTION, ou deux de la micro (un seul
 * attirait n'importe quoi : « carré ») ; une vidéo de la notion passe devant
 * les autres. À égalité, plus de mots de la notion, puis la classe la plus proche, la vidéo publiée, la plus générale (le moins
 * de mots).
 * Rien de commun → la galerie de la classe.
 */
export function lienVideoDefi(
  videos: VideoDefi[],
  dossier: string,
  notionId?: string | null,
  microId?: string | null
): string {
  const notion = racines(ALIAS_NOTIONS[notionId ?? ""] ?? notionId ?? "");
  const micro = racines(microId ?? "").filter((r) => !notion.includes(r));
  // Comparaison terme à terme : le premier écart décide.
  const cle = (n: number, m: number, v: VideoDefi, taille: number) => [n > 0 ? 1 : 0, n + m, n, -v.rang, v.publiee ? 1 : 0, -taille];
  let meilleure: { id: string; cle: number[] } | null = null;

  for (const v of videos) {
    const mots = v.mots.split(" ");
    const n = notion.filter((r) => mots.includes(r)).length;
    const m = micro.filter((r) => mots.includes(r)).length;
    if (n === 0 && m < 2) continue;
    const c = cle(n, m, v, mots.length);
    const i = meilleure ? c.findIndex((x, k) => x !== meilleure!.cle[k]) : 0;
    if (!meilleure || (i >= 0 && c[i] > meilleure.cle[i])) meilleure = { id: v.id, cle: c };
  }

  return meilleure
    ? `/video/${encodeURIComponent(meilleure.id)}`
    : `/video?classe=${encodeURIComponent(dossier)}`;
}
