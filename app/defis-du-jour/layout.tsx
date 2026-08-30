// Les métadonnées de /defis-du-jour.
//
// ⚠️ POURQUOI CE FICHIER EXISTE (29/08/2026). `page.tsx` est un composant
// client, et un composant client ne peut pas exporter de métadonnées. Sans ce
// layout, la page n'héritait que du layout RACINE — elle servait donc le titre
// ET la description de l'accueil, « EleveAI — exercices, coach et cahiers
// gratuits, du CP au Bac », sans canonique. Une URL déclarée au sitemap qui
// annonce le titre exact de l'accueil, c'est la définition d'un doublon : elle
// ne peut pas se classer sur ses propres mots et brouille l'accueil sur les
// siens. Mesuré ce jour-là sur les 415 pages du site : neuf routes dans ce cas.
//
// ⚠️ 160 CARACTÈRES MAXIMUM pour la description — Google coupe autour de 155.
// Celle-ci en fait 135.

import type { Metadata } from "next";

const TITRE = 'Le défi du jour : un problème par jour';
const DESCRIPTION =
  "Un problème de maths chaque jour, inspiré de l'actualité et de La Réunion, corrigé et expliqué. Gratuit, et sans compte pour l'essayer.";

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/defis-du-jour" },
  openGraph: {
    title: TITRE,
    description: DESCRIPTION,
    url: "/defis-du-jour",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
