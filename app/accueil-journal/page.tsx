// MAQUETTE DU 18/10/2026 — L'ACCUEIL EN JOURNAL POUR LA JEUNESSE (et les grands).
//
// Frédéric : « refonder la page d'accueil comme un journal, avec vidéos, coach »,
// « comme un journal pour la jeunesse », « et les adultes », « avec une mise en
// page à choisir », et le but : « qu'un jeune, un prof se dise : je vais
// apprendre une chose utile, ou m'entraîner », « avoir une perspective d'avenir ».
// Contexte chiffré : 72 % de rebond sur le site.
//
// ⛔ CE N'EST PAS ENCORE L'ACCUEIL : /accueil n'est pas touché. Même manœuvre que
// le 23/09 (maquette sur /accueil-2, puis « remplace accueil par accueil 2 ») :
// on bascule le jour où il choisit sa mise en page. noindex en attendant.
//
// ⭐ LE CONTENU TOURNE CHAQUE JOUR, et c'est le SERVEUR qui choisit : la page est
// régénérée toutes les heures (`revalidate`), soit 24 rendus par jour — pas un
// par visiteur. Le client ne recalcule rien : pas d'erreur d'hydratation.
// ⚠️ Chaque geste de la page MÈNE QUELQUE PART (vidéo, coach, rituel) : c'est ce
// qui fait baisser le rebond, une interaction qui reste sur la page n'y change
// rien.
import type { Metadata } from "next";
import { trouverVideo, urlR2 } from "@/lib/videos/r2";
import { CHIFFRES, DEFIS, MATHS_REEL, METIERS, SHORTS, UNES, jourDeLAnnee } from "@/lib/accueil/journal";
import JournalClient, { type VideoJournal } from "./JournalClient";

export const metadata: Metadata = {
  title: "Le journal EleveAI (maquette)",
  robots: { index: false, follow: false },
};

export const revalidate = 3600;

function video(id: string | undefined): VideoJournal | null {
  if (!id) return null;
  const v = trouverVideo(id);
  if (!v || !v.vignette) return null;
  return { id: v.id, titre: v.titre, short: v.short, vignette: urlR2(v.vignette) };
}

const garder = <T,>(x: T | null): x is T => x !== null;

export default function JournalPage() {
  const jour = jourDeLAnnee();
  const une = UNES[jour % UNES.length];
  const date = new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());

  return (
    <JournalClient
      date={date.charAt(0).toUpperCase() + date.slice(1)}
      numero={jour}
      une={{
        paysage: video(une.paysage),
        short: video(une.short),
        classe: une.classe,
        utile: une.utile,
      }}
      defiDepart={jour % DEFIS.length}
      chiffre={CHIFFRES[jour % CHIFFRES.length]}
      metier={METIERS[jour % METIERS.length]}
      // Les shorts tournent aussi : la rangée ne s'ouvre pas deux jours de
      // suite sur le même. Celui de la Une est retiré pour ne pas doubler.
      shorts={[...SHORTS.slice(jour % SHORTS.length), ...SHORTS.slice(0, jour % SHORTS.length)]
        .filter((id) => id !== une.short)
        .map(video)
        .filter(garder)}
      reel={MATHS_REEL.filter((id) => id !== une.paysage).map(video).filter(garder)}
    />
  );
}
