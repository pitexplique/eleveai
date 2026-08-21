import type { Metadata } from "next";

import DashboardEleveClient from "./DashboardEleveClient";

// ⛔ HORS INDEX (21/08/2026) — TROUVÉ DANS LA SERP DE BING, PAS DANS LE CODE.
//
// Cette page n'avait aucune métadonnée. Elle héritait donc du titre et de la
// description du layout, c'est-à-dire de ceux de l'accueil — et Bing l'affichait
// en quatrième résultat de marque sous « EleveAI — exercices, coach et cahiers
// gratuits, du CP au Bac », exactement le même libellé que la page d'accueil.
// Deux adresses, un seul titre : chacune affaiblit l'autre, et c'est la mauvaise
// qui peut gagner.
//
// Or c'est le tableau de bord d'un élève CONNECTÉ. Il n'a rien à faire dans un
// moteur de recherche : ce qu'un visiteur y trouve sans compte, c'est une page
// vide. On la sort de l'index — et on lui donne quand même son propre titre,
// pour l'onglet du navigateur et pour l'historique de l'élève.
//
// ⚠️ Elle n'est pas au sitemap et n'y entrera pas. Annoncer une adresse à Google
// et lui interdire de l'indexer dans le même dépôt, c'est se signaler une erreur
// à soi-même dans la Search Console (voir la note de `/photo-cours`).
export const metadata: Metadata = {
  title: "Mon espace",
  description: "Ton tableau de bord EleveAI : ta progression, tes séries, tes rituels du jour.",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function DashboardElevePage() {
  return <DashboardEleveClient />;
}
