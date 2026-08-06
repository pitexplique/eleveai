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

// ⚠️ LE <title> ET LE TITRE DE LA PAGE NE FONT PAS LE MÊME TRAVAIL (06/08).
// Celui-ci se lit dans une liste de résultats Google : il doit contenir les
// mots qu'on TAPE — exercices, gratuit, du CP au Bac. L'autre, sur la page,
// dit la promesse à qui vient d'arriver. Les confondre coûte le clic.
//
// Mesuré : Google coupe le titre vers 60 signes et la description vers 155.
// L'ancien titre (« Le journal pour apprendre et s'évaluer — La Réunion, du CP
// à la Terminale ») perdait « du CP à la Terminale », et la description perdait
// « gratuit » — les deux mots qui décident du clic. Ici, tout tient.
//
// La Réunion sort du titre : personne ne tape « La Réunion » pour chercher un
// cahier de vacances, et les téléchargements viennent surtout de métropole.
// Elle reste sur la page, dans l'à-propos et dans les contenus — c'est une
// bonne histoire, pas un bon mot-clé.
export const metadata: Metadata = {
  title: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
  description:
    "Dis ce que tu cherches, EleveAI te propose des ressources vérifiées : coach en maths, français, anglais, espagnol et IA, exercices corrigés, cahiers de vacances. Gratuit.",
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
    title: "EleveAI — exercices, coach et cahiers gratuits, du CP au Bac",
    description:
      "Dis qui tu es et ce que tu veux faire aujourd'hui. EleveAI te propose des ressources vérifiées par un enseignant — maths, français, anglais, espagnol et IA, du CP au Bac, gratuitement.",
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
