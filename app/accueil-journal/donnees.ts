// LES DONNÉES DU JOURNAL, CALCULÉES CÔTÉ SERVEUR — partagées par /accueil (le
// Quotidien, depuis le 18/10/2026) et par la maquette /accueil-journal.
// ⛔ Serveur seulement : lib/videos/r2 lit une table de ~160 Ko.
import { trouverVideo, urlR2 } from "@/lib/videos/r2";
import { CHIFFRES, DEFIS, MATHS_REEL, METIERS, SHORTS, UNES, jourDeLAnnee } from "@/lib/accueil/journal";
import type { VideoJournal } from "./JournalClient";

function video(id: string | undefined): VideoJournal | null {
  if (!id) return null;
  const v = trouverVideo(id);
  if (!v || !v.vignette) return null;
  return { id: v.id, titre: v.titre, short: v.short, vignette: urlR2(v.vignette) };
}

const garder = <T,>(x: T | null): x is T => x !== null;

export function donneesDuJournal() {
  const jour = jourDeLAnnee();
  const une = UNES[jour % UNES.length];
  const date = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
  return {
    date: date.charAt(0).toUpperCase() + date.slice(1),
    numero: jour,
    une: {
      paysage: video(une.paysage),
      short: video(une.short),
      classe: une.classe,
      utile: une.utile,
    },
    defiDepart: jour % DEFIS.length,
    chiffre: CHIFFRES[jour % CHIFFRES.length],
    metier: METIERS[jour % METIERS.length],
    // Les shorts tournent aussi : la rangée ne s'ouvre pas deux jours de suite
    // sur le même. Celui de la Une est retiré pour ne pas doubler.
    shorts: [...SHORTS.slice(jour % SHORTS.length), ...SHORTS.slice(0, jour % SHORTS.length)]
      .filter((id) => id !== une.short)
      .map(video)
      .filter(garder),
    reel: MATHS_REEL.filter((id) => id !== une.paysage).map(video).filter(garder),
  };
}
