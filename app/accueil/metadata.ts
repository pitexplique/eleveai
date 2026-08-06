// app/accueil/metadata.ts — les métadonnées de la page d'entrée.
//
// ⚠️ CE FICHIER A ÉTÉ DU CODE MORT pendant des mois : il existait, il annonçait
// « EleveAI - Comprendre, s'entraîner, progresser », et personne ne l'importait.
// La page portait ses propres métadonnées en dur, à côté. Deux vérités pour un
// seul écran, dont une fausse — et c'est toujours la fausse qu'on lit quand on
// cherche à comprendre. Refait et branché le 06/08/2026 : `page.tsx` réexporte
// ce qui suit, il n'y a plus qu'un endroit à corriger.

import type { Metadata } from "next";

const HERO = "/images/accueil-eleveai-reunion.webp";

// Le titre tel qu'il doit apparaître dans Google, au caractère près.
const TITRE = "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac";

export const metadata: Metadata = {
  // ⭐ `absolute` ET NON une simple chaîne. Le layout applique le gabarit
  // « %s — EleveAI » à tout titre de page ; ce titre-ci commençant déjà par
  // EleveAI, Google recevait « EleveAI — … du CP au Bac — EleveAI », soit
  // 70 caractères dont neuf de répétition pure. Or Google coupe autour de 60 :
  // la marque était écrite deux fois et la fin du titre passait à la trappe.
  // `absolute` dit au gabarit de ne pas s'appliquer ici.
  title: { absolute: TITRE },

  description:
    "Dis ce que tu cherches, EleveAI te propose des ressources vérifiées : coach en maths, français, anglais, espagnol et IA, exercices corrigés, cahiers de vacances. Gratuit.",

  // ⭐ La SEULE canonique du site posée à la main, et elle est légitime :
  // la racine `/` répond 308 vers `/accueil`, donc deux adresses mènent
  // réellement ici et il faut désigner la bonne. Partout ailleurs, ne rien
  // déclarer — une page se désigne elle-même. Voir la note dans app/layout.tsx.
  alternates: { canonical: "/accueil" },

  keywords: [
    "EleveAI",
    "coach scolaire IA",
    "exercices corrigés gratuits",
    "cahier de vacances à imprimer",
    "soutien scolaire gratuit",
    "maths",
    "français",
    "anglais",
    "espagnol",
    "du CP au Bac",
    "la réunion",
  ],

  openGraph: {
    title: TITRE,
    description:
      "Dis qui tu es et ce que tu veux faire aujourd'hui. EleveAI te propose des ressources vérifiées par un enseignant — maths, français, anglais, espagnol et IA, du CP au Bac, gratuitement.",
    url: "/accueil",
    type: "website",
    siteName: "EleveAI",
    locale: "fr_FR",
    images: [
      {
        url: HERO,
        width: 1680,
        height: 945,
        alt: "EleveAI — l'entrée du site : dis qui tu es et ce que tu cherches",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: TITRE,
    description:
      "Dis qui tu es et ce que tu veux faire aujourd'hui : EleveAI cherche parmi des ressources relues par un enseignant celles qui peuvent vraiment t'aider.",
    images: [HERO],
  },
};
