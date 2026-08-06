// Les métadonnées des quatre coachs.
//
// ⚠️ POURQUOI UN LAYOUT ET PAS LA PAGE : `page.tsx` est un composant client
// ("use client"), et un composant client ne peut pas exporter de métadonnées.
// Sans ce fichier, ces pages héritaient de celles du layout racine — c'est-à-dire
// du TITRE ET DE LA DESCRIPTION DE L'ACCUEIL, et surtout de sa canonique. Elles
// annonçaient donc à Google « je suis une copie de l'accueil, indexe-le à ma
// place », alors que le sitemap les déclare en priorité 0,95.
//
// Ce sont les pages les plus importantes du site après les cahiers : elles
// méritaient mieux qu'un héritage silencieux.

import type { Metadata } from "next";

type Fiche = { titre: string; description: string };

const FICHES: Record<string, Fiche> = {
  maths: {
    titre: "Coach de maths gratuit — du CP à la Terminale",
    description:
      "Un coach qui explique sans faire à ta place : choisis ta classe et ta notion, il pose les questions, corrige et reprend là où ça coince. Toutes les notions du programme, du CP à la Terminale. Gratuit.",
  },
  francais: {
    titre: "Coach de français gratuit — du CP à la 3e",
    description:
      "Conjugaison, accords, analyse de phrase, orthographe : le coach de français d'EleveAI reprend notion par notion, avec correction immédiate et explication. Du CP à la 3e, gratuit.",
  },
  anglais: {
    titre: "Coach d'anglais gratuit — de A1 à B2",
    description:
      "Vocabulaire, verbes irréguliers, temps et compréhension : entraîne-toi en anglais à ton niveau réel, de A1 à B2, avec correction et explication à chaque réponse. Gratuit.",
  },
  espagnol: {
    titre: "Coach d'espagnol gratuit — de A1 à B2",
    description:
      "Ser ou estar, conjugaison, vocabulaire du quotidien : le coach d'espagnol d'EleveAI t'entraîne à ton niveau, de A1 à B2, avec la correction expliquée. Gratuit, dès la 6e.",
  },
  ia: {
    titre: "Coach d'intelligence artificielle — de A1 à C1",
    description:
      "Comprendre ce qu'est vraiment une intelligence artificielle : modèles, apprentissage, usages, limites et enjeux. Quinze notions, de la découverte au niveau avancé. Gratuit.",
  },
  economie: {
    titre: "Coach d'économie — découvrir, collège, lycée",
    description:
      "Les mécanismes économiques expliqués pas à pas, de la découverte au lycée, avec des exercices corrigés.",
  },
};

const DEFAUT: Fiche = {
  titre: "Les coachs EleveAI — maths, français, anglais, espagnol",
  description:
    "Un coach par matière qui explique sans faire à ta place, du CP à la Terminale. Gratuit, relu par un enseignant.",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ matiere: string }>;
}): Promise<Metadata> {
  const { matiere } = await params;
  const fiche = FICHES[matiere] ?? DEFAUT;

  return {
    title: fiche.titre,
    description: fiche.description,
    // Chaque coach se désigne lui-même. C'est la correction du 06/08 : ils
    // pointaient tous vers /accueil.
    alternates: { canonical: `/coach-ia/${matiere}` },
    openGraph: {
      title: fiche.titre,
      description: fiche.description,
      url: `/coach-ia/${matiere}`,
      type: "website",
      siteName: "EleveAI",
      locale: "fr_FR",
    },
  };
}

export default function CoachLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
