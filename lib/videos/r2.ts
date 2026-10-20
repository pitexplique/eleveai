// Les vidéos EleveAI hébergées sur Cloudflare R2 (bucket « eleveai-videos »).
// La table est générée par `node scripts/generer-videos-r2.mjs` à partir du
// manifeste YouTube et de manim/sorties ; le chemin d'un fichier est le même en
// local et sur R2 (scripts/r2-videos.ps1 copie manim/sorties tel quel).
//
// ⛔ Côté SERVEUR seulement : la table pèse ~160 Ko, elle n'a rien à faire dans
// le paquet du navigateur. Le coach pointe vers /video/<id YouTube> sans la lire.
import table from "./videos-r2.json";

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

/** Par id du manifeste (« 3e-proba-vocabulaire ») OU par ID YouTube (11 caractères). */
export function trouverVideo(cle: string): VideoR2 | null {
  const id = LIGNES[cle] ? cle : PAR_YOUTUBE.get(cle);
  return id ? { id, ...LIGNES[id] } : null;
}

export function toutesLesVideos(): VideoR2[] {
  return Object.entries(LIGNES).map(([id, v]) => ({ id, ...v }));
}

/** Adresse publique d'un fichier ; chaque segment encodé (accents, espaces). */
export const urlR2 = (rel: string) => `${BASE_VIDEOS}/${rel.split("/").map(encodeURIComponent).join("/")}`;
