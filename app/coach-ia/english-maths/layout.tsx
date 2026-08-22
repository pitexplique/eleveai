// Les métadonnées du coach d'anglais.
//
// ⚠️ POURQUOI CE FICHIER EXISTE (22/08). `page.tsx` est un composant client, et
// un composant client ne peut pas exporter de métadonnées. Cette route n'est
// PAS servie par `[matiere]/layout.tsx` — elle a son propre dossier, donc elle
// n'héritait de rien d'autre que du layout RACINE.
//
// ⛔ CE QUE ÇA DONNAIT, ET C'EST LE PIRE CAS POSSIBLE : la page servie sur
// www.eleveai.fr/coach-ia/english-maths portait le titre de l'accueil —
// « EleveAI — exercices, coach et cahiers gratuits, du CP au Bac » — et AUCUNE
// canonique. Une URL déclarée au sitemap, qui annonce à Google le titre exact
// de la page d'accueil : c'est la définition d'un doublon. Elle ne pouvait pas
// se classer sur ses propres mots, et elle brouillait l'accueil sur les siens.
// C'est l'accident que `[matiere]/layout.tsx` avait corrigé le 06/08 pour les
// cinq autres coachs ; celui-ci était resté dehors, n'étant pas dans la route
// dynamique.
//
// ⭐ CE QU'IL EST, DANS LES MOTS DE FRÉDÉRIC (22/08) : « un coach anglais
// A1 A2 B1 B2, c'est tout », et « il correspond au CRPE ».
// ⛔ Deux formulations ont été écartées en écrivant ce fichier, ne pas les
// ressortir : « les maths en anglais » (faux — on y apprend de l'anglais) et
// « tourné vers les sciences » (Frédéric : « c'est tout »). Le nom du dossier,
// `english-maths`, vient de l'origine du produit et n'est plus ce qu'il décrit.
// ⛔ Ne pas non plus reprendre la fiche `anglais` de `[matiere]/layout.tsx` :
// elle parle de verbes irréguliers et de compréhension, une autre promesse.
//
// ⚠️ 160 CARACTÈRES MAXIMUM pour la description : voir la note en tête de
// `[matiere]/layout.tsx`. Celle-ci en fait 129.

import type { Metadata } from "next";

const TITRE = "Coach d'anglais gratuit — A1, A2, B1, B2";
const DESCRIPTION =
  "Un coach d'anglais niveau par niveau : A1, A2, B1, B2 — les niveaux du CRPE. Il pose les questions, corrige et explique. Gratuit.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/coach-ia/english-maths" },
  openGraph: {
    title: TITRE,
    description: DESCRIPTION,
    url: "/coach-ia/english-maths",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function CoachAnglaisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
