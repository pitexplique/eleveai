// Épreuve blanche du Concours Avenir (maths), pour les Terminale qui visent
// une école d'ingénieurs post-bac. L'écrit vaut 60 % de la note finale et les
// maths y sont au coefficient 6 : c'est l'épreuve qui décide.
//
// La page ne duplique pas le coach : elle réutilise les mêmes banques
// Terminale, mais avec les règles du concours (tirage transversal, barème
// +1/-1, chronomètre, 45 réponses comptées sur 60 questions).

import type { Metadata } from "next";
import { CALLS, formatDateCall, prochaineDate } from "@/lib/calls";
import { capaciteEpreuves } from "@/lib/concours-avenir/tirage";
import ConcoursAvenirClient from "./ConcoursAvenirClient";

// La date du prochain créneau de soutien est recalculée régulièrement : elle
// change une fois par semaine, et la page reste servie en statique le reste du
// temps (elle a une vocation SEO). 04/08 : 15 min → 1 h. Une date qui bouge une
// fois par semaine n'a aucune raison d'être relue du cache durable quatre fois
// par heure et par région (quota ISR Reads à 75 %).
export const revalidate = 3600;

export const metadata: Metadata = {
  title:
    "Concours Avenir — 10 épreuves blanches de maths chronométrées, gratuites | EleveAI",
  description:
    "Entraîne-toi à l'épreuve de mathématiques du Concours Avenir dans les conditions réelles : 60 questions, 45 réponses comptées, 1h30, barème +1 / −1. Dix épreuves complètes sans jamais revoir la même question, et le débriefing qui manque partout ailleurs : savoir quand répondre et quand passer.",
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
  // Le nombre d'épreuves annoncé est calculé depuis les banques, pas écrit en
  // dur : il suit automatiquement la production d'items et ne peut donc pas
  // devenir une promesse fausse.
  const capacite = capaciteEpreuves();

  // Seul l'identifiant et la date lisible traversent vers le navigateur :
  // le lien visio, lui, ne quitte jamais le serveur.
  const call = CALLS.find((c) => c.id === "soutien-maths-visio-hebdo" && c.actif);
  const soutien = call
    ? { callId: call.id, quand: formatDateCall(prochaineDate(call)) }
    : null;

  return <ConcoursAvenirClient capacite={capacite} soutien={soutien} />;
}
