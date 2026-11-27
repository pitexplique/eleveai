// Un lien YouTube EleveAI → le lecteur du site (/video/<ID>), qui lit le MP4 sur
// Cloudflare R2 et renvoie lui-même vers YouTube si la vidéo n'y est pas.
// Sans dépendance : utilisable côté navigateur (le coach), la table reste au serveur.
// ⛔ 20/10/2026 — Frédéric : « mes élèves sont dispersés avec YouTube ; YouTube ne
// sert qu'à la pub ». Tout ce que voit un élève (coach, QR des fiches) passe par
// le lecteur du site. Une vidéo qui n'est que sur R2 est branchée directement
// sous la forme https://www.eleveai.fr/video/<id du manifeste>[?format=short].
const SITE = "https://www.eleveai.fr";

export function lienVideo(url: string): string {
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?(?:.*&)?v=))([\w-]{11})/)?.[1];
  return id ? `/video/${id}` : url;
}

/** Pour un QR code imprimé : l'adresse complète du lecteur du site. */
export function lienVideoAbsolu(url: string): string {
  const l = lienVideo(url);
  return l.startsWith("/") ? SITE + l : l;
}

/**
 * Un short, d'après la seule URL — un repli : la VÉRITÉ est le champ `short` de
 * `videos-r2.json`, que `/api/notion-videos` renvoie maintenant par ligne.
 *
 * ⛔ 27/11/2026 — cette fonction ne lisait que `/shorts/` et `?format=short`, et
 * elle se trompait sur 122 des 2 095 lignes du coach : 113 shorts sont branchés
 * sous la forme `/video/<clé>-short`, sans paramètre. Le bouton ▶ les prenait
 * donc pour des cours et servait le short alors que le paysage de la MÊME micro
 * existait, sur 24 micros (mesuré). Le suffixe `-short` est désormais lu aussi.
 * Mesuré le 27/11 sur `origin/main` : aucune clé finissant par `-short`, et
 * aucune URL portant `?format=short`, n'est un paysage au registre — élargir la
 * détection ne peut donc pas prendre un cours pour un short.
 */
export const estShortVideo = (url: string) => {
  if (/\/shorts\/|[?&]format=short\b/.test(url)) return true;
  const id = url.replace(/^https?:\/\/[^/]+/, "").match(/\/video\/([^/?#]+)/)?.[1];
  return Boolean(id && id.endsWith("-short"));
};
