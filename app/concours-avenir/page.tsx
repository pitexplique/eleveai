// Épreuve blanche du Concours Avenir (maths), pour les Terminale qui visent
// une école d'ingénieurs post-bac. L'écrit vaut 60 % de la note finale et les
// maths y sont au coefficient 6 : c'est l'épreuve qui décide.
//
// La page ne duplique pas le coach : elle réutilise les mêmes banques
// Terminale, mais avec les règles du concours (tirage transversal, barème
// +1/-1, chronomètre, 45 réponses comptées sur 60 questions).

import type { Metadata } from "next";
import ConcoursAvenirClient from "./ConcoursAvenirClient";

export const metadata: Metadata = {
  title: "Concours Avenir — épreuve blanche de maths chronométrée, gratuite | EleveAI",
  description:
    "Entraîne-toi à l'épreuve de mathématiques du Concours Avenir dans les conditions réelles : 60 questions, 45 réponses comptées, 1h30, barème +1 / −1. Avec le débriefing qui manque partout ailleurs : savoir quand répondre et quand passer.",
  keywords: [
    "concours Avenir",
    "concours Avenir maths",
    "épreuve blanche concours Avenir",
    "annales concours Avenir",
    "QCM maths terminale",
    "école d'ingénieurs post-bac",
    "ECE ESILV ESTACA EPF",
    "Parcoursup ingénieur",
    "entraînement concours gratuit",
    "eleveai",
  ],
  openGraph: {
    title: "Concours Avenir — l'épreuve blanche de maths, en conditions réelles",
    description:
      "1h30, 60 questions, 45 comptées, +1 pour une bonne réponse et −1 pour une mauvaise. Répondre au hasard coûte un demi-point : apprends à choisir tes combats.",
    url: "https://eleveai.fr/concours-avenir",
    siteName: "EleveAI",
    locale: "fr_FR",
    type: "website",
  },
  alternates: { canonical: "/concours-avenir" },
};

export default function Page() {
  return <ConcoursAvenirClient />;
}
