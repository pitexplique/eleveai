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

/** Un short : lien YouTube /shorts/ ou vidéo R2 marquée ?format=short. */
export const estShortVideo = (url: string) => /\/shorts\/|[?&]format=short\b/.test(url);
