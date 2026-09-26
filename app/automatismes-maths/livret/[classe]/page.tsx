import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LivretClient from "../LivretClient";

// ⭐ UNE ADRESSE PAR CLASSE (24/09/2026, titres validés par Frédéric).
// `?classe=3e` était une mauvaise adresse pour Google : une page par livret,
// avec SON titre — celui de la requête que les gens tapent (« automatismes
// brevet 3e pdf », « automatismes épreuve anticipée 1re »).
// ⚠️ « gratuit » est ici À SA PLACE : c'est un titre de ressource, donc la
// requête — pas la description de l'offre (voir la note « mots interdits »).
// ⚠️ Pas de « — EleveAI » : le layout racine l'ajoute ; chaque titre tient
// avec lui sous ~60 signes.

const LIVRETS: Record<string, { title: string; description: string }> = {
  // ⏳ CM1 et CM2 (26/09) : titres à faire valider par Frédéric.
  cm1: {
    title: "Calcul mental CM1 : 20 séries corrigées en PDF",
    description: "Vingt séries de calcul mental de CM1 à imprimer, corrigées à la fin : tables, doubles et moitiés, fractions usuelles, × 10, + 9. Le programme 2025, rien de plus.",
  },
  cm2: {
    title: "Calcul mental CM2 : 20 séries corrigées en PDF",
    description: "Vingt séries de calcul mental de CM2 à imprimer, corrigées à la fin : tables, fractions usuelles, décimaux, × 5 et × 50, ÷ 4. Le programme 2025, rien de plus.",
  },
  "6e": {
    title: "Automatismes maths 6e : 20 séries corrigées en PDF",
    description: "Vingt séries d'automatismes de 6e à imprimer, corrigées à la fin : décimaux, fractions, calcul mental, mesures. Nouvelles questions à chaque édition.",
  },
  "5e": {
    title: "Automatismes maths 5e : 20 séries corrigées en PDF",
    description: "Vingt séries d'automatismes de 5e à imprimer, corrigées à la fin : relatifs, fractions, calcul littéral, angles. Nouvelles questions à chaque édition.",
  },
  "4e": {
    title: "Automatismes maths 4e : 20 séries corrigées en PDF",
    description: "Vingt séries d'automatismes de 4e au format du brevet, à imprimer, corrigées à la fin. Nouvelles questions à chaque édition, réponses courtes.",
  },
  "3e": {
    title: "Automatismes brevet 3e : 20 séries corrigées, PDF gratuit",
    description: "Vingt séries d'automatismes du brevet, 20 minutes sans calculatrice comme la première partie du DNB, corrigées à la fin. Nouvelles questions à chaque édition.",
  },
  seconde: {
    title: "Automatismes de seconde : 20 séries corrigées en PDF",
    description: "Vingt séries d'automatismes de seconde, alignées sur la liste officielle de l'épreuve anticipée, à imprimer, corrigées à la fin. Réponses courtes, sans QCM.",
  },
  "terminale-spe": {
    title: "Automatismes terminale spé maths : 20 séries en PDF",
    description: "Vingt séries de réflexes de terminale spécialité à imprimer, corrigées : limites, dérivées, exponentielle, logarithme, intégrales, loi binomiale. Un quart en QCM, comme au bac.",
  },
  premiere: {
    title: "Automatismes 1re, épreuve anticipée : PDF sans QCM",
    description: "Vingt séries d'automatismes pour l'épreuve anticipée de maths (session 2027), alignées sur l'annexe officielle : réponses courtes comme à l'épreuve, corrigés à la fin.",
  },
};

export function generateStaticParams() {
  return Object.keys(LIVRETS).map((classe) => ({ classe }));
}

export async function generateMetadata({ params }: { params: Promise<{ classe: string }> }): Promise<Metadata> {
  const { classe } = await params;
  const l = LIVRETS[classe];
  if (!l) return {};
  return {
    title: l.title,
    description: l.description,
    alternates: { canonical: `/automatismes-maths/livret/${classe}` },
  };
}

export default async function LivretClassePage({ params }: { params: Promise<{ classe: string }> }) {
  const { classe } = await params;
  if (!LIVRETS[classe]) notFound();
  return <LivretClient classe={classe} />;
}
