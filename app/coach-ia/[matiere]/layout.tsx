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

// ⚠️ 160 CARACTÈRES MAXIMUM PAR DESCRIPTION (Bing Webmaster, 22/08 : « Meta
// Description too long », relevé sur /coach-ia/maths). Cinq des six en
// faisaient plus — maths 200, ia 214 — et le moteur coupe vers 157.
// Sur maths, les 43 caractères perdus étaient « du programme, du CP à la
// Terminale. Gratuit. » : la couverture et le prix, c'est-à-dire les deux
// seuls arguments qui font cliquer, jamais affichés.
// ⛔ NE PAS RALLONGER pour « mieux décrire » : ce qui dépasse n'existe pas.
const FICHES: Record<string, Fiche> = {
  maths: {
    titre: "Coach de maths gratuit — du CP à la Terminale",
    description:
      "Un coach qui explique sans faire à ta place : choisis ta classe et ta notion, il pose les questions et corrige. Du CP à la Terminale. Gratuit.",
  },
  francais: {
    titre: "Coach de français gratuit — du CP à la 3e",
    description:
      "Conjugaison, accords, analyse de phrase, orthographe : le coach reprend notion par notion, avec correction immédiate. Du CP à la 3e, gratuit.",
  },
  anglais: {
    titre: "Coach d'anglais gratuit — de A1 à B2",
    description:
      "Vocabulaire, verbes irréguliers, temps et compréhension : entraîne-toi en anglais à ton niveau réel, de A1 à B2, correction expliquée. Gratuit.",
  },
  espagnol: {
    titre: "Coach d'espagnol gratuit — de A1 à B2",
    description:
      "Ser ou estar, conjugaison, vocabulaire du quotidien : le coach d'espagnol t'entraîne à ton niveau, de A1 à B2, correction expliquée. Dès la 6e.",
  },
  ia: {
    titre: "Coach d'intelligence artificielle — préparer le Pix IA",
    description:
      "Modèles, apprentissage, usages, limites et enjeux : les 16 compétences du référentiel Pix IA, du collège au lycée, avec la correction expliquée. Gratuit.",
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
