// app/accueil/page.tsx
//
// REFONTE DU 06/08/2026 — l'accueil n'est plus un journal, c'est une entrée.
//
// Ce que cette page ne fait plus, et c'est tout l'objet du changement : elle
// lançait SEPT requêtes Supabase avant d'afficher quoi que ce soit (les avis,
// maths_974, le catalogue, la Une, les articles deux fois, les élèves à
// l'honneur), puis montait 3 400 lignes de journal — manchette, oreilles, Une,
// courrier, édito, machines, dictée, défis, témoignages, offres. Un visiteur
// qui voulait réviser les fractions téléchargeait tout ça d'abord.
//
// Maintenant : zéro requête, zéro donnée distante, une seule question.
// La page devient statique et légère — ce qui compte double, puisque le quota
// Vercel se paie au poids du HTML relu (1 unité = 8 Ko, par visite servie).
//
// ⚠️ RIEN N'EST SUPPRIMÉ DU PROJET. AccueilClient.tsx reste sur le disque,
// simplement plus importé — donc absent du bundle de cette route. Toutes les
// rubriques gardent leurs routes, et leurs entrées dans lib/matrice/ressources.ts
// les rendent trouvables par « Dis-nous ce que tu cherches ». Elles ne sont plus
// imposées à tout le monde : elles sont proposées à qui les demande.

import type { Metadata } from "next";
import AccueilIA from "./AccueilIA";

export const metadata: Metadata = {
  title: "EleveAI — l'IA éducative conçue à La Réunion",
  description:
    "Dis-nous ce que tu cherches : EleveAI tient compte de ton profil et sélectionne, parmi des ressources relues par un enseignant, celles qui peuvent vraiment t'aider. Maths, français, anglais, espagnol et IA, du CP à la Terminale. Gratuit, conçu à La Réunion.",
  keywords: [
    "eleveai",
    "IA éducative",
    "aide aux devoirs",
    "soutien scolaire La Réunion",
    "exercices corrigés",
    "coach maths",
    "coach français",
    "révisions collège",
    "révisions lycée",
    "la réunion",
  ],
  openGraph: {
    title: "EleveAI — l'IA éducative conçue à La Réunion",
    description:
      "Dis qui tu es et ce que tu veux faire aujourd'hui. EleveAI cherche parmi des ressources vérifiées celles qui peuvent t'aider — du CP à la Terminale, gratuitement.",
    url: "https://eleveai.fr",
    siteName: "EleveAI",
    images: [
      {
        url: "/images/accueil-eleveai-reunion.webp",
        width: 1680,
        height: 945,
        alt: "EleveAI — l'IA éducative conçue à La Réunion",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
};

export default function AccueilPage() {
  return <AccueilIA />;
}
