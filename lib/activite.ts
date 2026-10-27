// Signale un geste d'élève à /api/activite, pour la page « En direct » du
// prof. Sans attendre, sans jamais gêner l'élève : un échec ne se voit pas.
// Sans jeton (visiteur), rien ne part.

export type GesteEleve =
  | { type: "coach"; ressource: string; libelle: string; juste: boolean }
  | { type: "video_debut" | "video_fin"; ressource: string };

export function signalerActivite(token: string | null | undefined, geste: GesteEleve): void {
  if (!token) return;
  const corps = JSON.stringify({ token, ...geste });
  try {
    if (!navigator.sendBeacon?.("/api/activite", new Blob([corps], { type: "application/json" }))) {
      fetch("/api/activite", { method: "POST", body: corps, keepalive: true }).catch(() => {});
    }
  } catch {}
}
