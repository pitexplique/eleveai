// « La Diagonale des Fous » — article-machine du journal (rubrique « Un peu de
// maths »). Le Grand Raid de La Réunion en équation différentielle : la réserve
// du coureur se vide au carré de l'effort et avec la pente. Trop vite = le mur,
// trop lent = la barrière ; le bon dosage vide la réserve pile à l'arrivée.

import type { Metadata } from "next";
import DiagonaleDesFousClient from "./DiagonaleDesFousClient";

export const metadata: Metadata = {
  title: "La Diagonale des Fous — l'équation différentielle du coureur | EleveAI",
  description:
    "Le Grand Raid de La Réunion traduit en maths : la réserve d'énergie se vide au carré de l'effort et avec la pente (dR/dt = −c·effort²·(1+pente)). Règle l'allure, lance la course sur le profil de l'île — trop vite tu tapes le mur, trop lent la barrière te rattrape. La méthode d'Euler en action, avec les défis du CP à la Terminale.",
  keywords: [
    "équation différentielle",
    "méthode d'Euler",
    "Diagonale des Fous",
    "Grand Raid La Réunion",
    "trail simulation",
    "réserve d'énergie",
    "pacing",
    "maths 974",
    "simulateur pédagogique",
    "eleveai",
  ],
  openGraph: {
    title: "La Diagonale des Fous — l'équation différentielle du coureur",
    description:
      "Sa réserve se vide au carré de l'effort. Trop vite, c'est le mur ; le bon dosage la vide pile à Saint-Denis. Une équa diff qui se règle à la main, sur le profil de La Réunion.",
    url: "https://www.eleveai.fr/diagonale-des-fous",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/diagonale-des-fous" },
};

export default function Page() {
  return <DiagonaleDesFousClient />;
}
