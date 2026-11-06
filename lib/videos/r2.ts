// Les vidéos EleveAI hébergées sur Cloudflare R2 (bucket « eleveai-videos »).
// La table est générée par `node scripts/generer-videos-r2.mjs` à partir du
// manifeste YouTube et de manim/sorties ; le chemin d'un fichier est le même en
// local et sur R2 (scripts/r2-videos.ps1 copie manim/sorties tel quel).
//
// ⛔ Côté SERVEUR seulement : la table pèse ~160 Ko, elle n'a rien à faire dans
// le paquet du navigateur. Le coach pointe vers /video/<id YouTube> sans la lire.
import table from "./videos-r2.json";
import anciensYoutube from "./anciens-youtube.json";

export type VideoR2 = {
  id: string;
  fichier: string;
  poster: string | null;
  /** ~11 Ko, pour la galerie (scripts/vignettes-videos.py). */
  vignette: string | null;
  titre: string;
  short: boolean;
  youtube: string | null;
  /** La série du coach de sa micro (ou notion), si le coach la connaît. */
  coach?: string | null;
};

// r2.dev est l'adresse de test (bridée) ; videos.eleveai.fr la remplacera.
export const BASE_VIDEOS = (
  process.env.NEXT_PUBLIC_VIDEOS_URL || "https://pub-a5bab809c9be4ab6a33fe47c1aa68b5b.r2.dev"
).replace(/\/$/, "");

type Ligne = Omit<VideoR2, "id">;
const LIGNES = table as Record<string, Ligne>;

const PAR_YOUTUBE = new Map<string, string>();
for (const [id, v] of Object.entries(LIGNES)) if (v.youtube) PAR_YOUTUBE.set(v.youtube, id);

// ⛔ 06/11/2026 — Frédéric : « ça marche sur 6e mais pas sur Pythagore 4e ». Une
// vidéo republiée change d'ID YouTube : l'ancien, resté sur des QR déjà imprimés,
// doit encore ouvrir la vidéo sur R2, pas YouTube (`ancienne_url` du manifeste).
const ANCIENS = anciensYoutube as Record<string, string>;

/** Par id du manifeste (« 3e-proba-vocabulaire ») OU par ID YouTube, même ancien. */
export function trouverVideo(cle: string): VideoR2 | null {
  const id = LIGNES[cle] ? cle : PAR_YOUTUBE.get(cle) ?? ANCIENS[cle];
  return id && LIGNES[id] ? { id, ...LIGNES[id] } : null;
}

export function toutesLesVideos(): VideoR2[] {
  return Object.entries(LIGNES).map(([id, v]) => ({ id, ...v }));
}

/** Adresse publique d'un fichier ; chaque segment encodé (accents, espaces). */
export const urlR2 = (rel: string) => `${BASE_VIDEOS}/${rel.split("/").map(encodeURIComponent).join("/")}`;

/**
 * La paysage de chaque notion du coach, « classe/notion » → id du manifeste :
 * celle de toute la notion (sans micro) d'abord, puis une publiée. Pour les
 * boutons « Regarder la vidéo » qui ne connaissent que la notion (/parcours).
 */
export function paysageParNotion(): Record<string, string> {
  const choix: Record<string, { id: string; rang: number }> = {};
  for (const [id, v] of Object.entries(LIGNES)) {
    if (v.short || !v.coach) continue;
    const q = new URLSearchParams(v.coach.split("?")[1]);
    const cle = `${q.get("classe")}/${q.get("notion")}`;
    const rang = (q.get("microId") ? 2 : 0) + (v.youtube ? 0 : 1);
    if (!choix[cle] || rang < choix[cle].rang) choix[cle] = { id, rang };
  }
  return Object.fromEntries(Object.entries(choix).map(([cle, c]) => [cle, c.id]));
}
