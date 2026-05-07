import type { ProblemeDuJour } from "./types";

export const problemesFixed: ProblemeDuJour[] = [
  {
    id: "pourcentage_reduction_001",
    title: "Le prix réduit",
    theme: "Pourcentages",
    statement:
      "Au marché de Saint-Pierre, un sac de fruits coûte 20 €. Le vendeur fait une réduction de 25 %.",
    question: "Quel est le nouveau prix du sac de fruits ?",
    expectedAnswer: "15",
    explanation:
      "25 %, c’est un quart. Le quart de 20 € est 5 €. On enlève donc 5 € au prix initial : 20 - 5 = 15. Le nouveau prix est 15 €.",
    directions: [
      {
        id: "schema",
        label: "Faire un schéma",
        type: "guided",
        content:
          "Imagine une barre qui représente 20 €. Coupe-la en ? parts égales. Une part donc ...",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "25 % = 1/4. Donc 25 % de 20 = ?. Puis on calcule 20 - ton resultat = ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Indice : 25 %, c’est la même chose qu’un quart. Commence par calculer le quart de 20.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Écris ta méthode avec une phrase complète. Exemple : « J’ai calculé … parce que … »",
      },
    ],
  },
  {
  id: "eau_reunion_001",

  title: "Économiser l’eau",

  theme: "Écologie & mathématiques",

  statement:
    "À La Réunion, une famille utilise 120 litres d’eau par jour. Après plusieurs gestes écologiques, elle réduit sa consommation de 25 %.",

  question:
    "Combien de litres d’eau la famille économise-t-elle chaque jour ?",

  expectedAnswer: "30",

  explanation:
    "25 %, c’est un quart. Le quart de 120 est 30. La famille économise donc 30 litres d’eau chaque jour.",

  directions: [
    {
      id: "schema",
      label: "Faire un schéma",
      type: "guided",
      content:
        "Imagine une barre qui représente 120 litres d’eau. Coupe-la en 4 parts égales. Combien vaut une part ?",
    },

    {
      id: "calcul",
      label: "Chercher le calcul",
      type: "guided",
      content:
        "25 % signifie un quart. Quelle opération permet de trouver le quart de 120 ?",
    },

    {
      id: "questionnement",
      label: "Répondre étape par étape",
      type: "guided",
      content:
        "1. Que signifie 25 % ?\n2. Combien vaut le quart de 120 ?\n3. Combien de litres sont économisés ?",
    },

    {
      id: "open",
      label: "Expliquer avec mes mots",
      type: "open",
      content:
        "Explique pourquoi économiser l’eau est important à La Réunion.",
    },
  ],
}
];