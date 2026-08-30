// Les métadonnées de /blog.
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
// Celle-ci en fait 142.

import type { Metadata } from "next";

const TITRE = 'Blog : maths, méthodes et progression';
const DESCRIPTION =
  'Des conseils concrets pour progresser en maths, préparer le brevet ou le bac et comprendre les notions clés. Écrit par un professeur en poste.';

export const metadata: Metadata = {
  title: TITRE,
  description: DESCRIPTION,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: TITRE,
    description: DESCRIPTION,
    url: "/blog",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
