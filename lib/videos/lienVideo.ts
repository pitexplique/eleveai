// Un lien YouTube EleveAI → le lecteur du site (/video/<ID>), qui lit le MP4 sur
// Cloudflare R2 et renvoie lui-même vers YouTube si la vidéo n'y est pas.
// Sans dépendance : utilisable côté navigateur (le coach), la table reste au serveur.
export function lienVideo(url: string): string {
  const id = url.match(/(?:youtu\.be\/|youtube\.com\/(?:shorts\/|embed\/|watch\?(?:.*&)?v=))([\w-]{11})/)?.[1];
  return id ? `/video/${id}` : url;
}
