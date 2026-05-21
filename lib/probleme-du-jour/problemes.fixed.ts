// lib/probleme-du-jour/probleme.fixed.ts

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
          "Imagine une barre qui représente 20 €. Coupe-la en 4 parts égales. Une part vaut donc ...",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "25 % = 1/4. Donc 25 % de 20 = ?. Puis on calcule 20 - ton résultat = ?",
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
  },

  {
    id: "bus_scolaire_001",
    title: "Le bus scolaire",
    theme: "Pourcentages",
    statement:
      "Un bus scolaire transporte 48 élèves. Aujourd’hui, 25 % des élèves sont absents.",
    question: "Combien d’élèves sont absents aujourd’hui ?",
    expectedAnswer: "12",
    explanation:
      "25 %, c’est un quart. Le quart de 48 est 12. Donc 12 élèves sont absents.",
    directions: [
      {
        id: "schema",
        label: "Faire un schéma",
        type: "guided",
        content:
          "Imagine 48 élèves répartis en 4 groupes égaux. Combien y a-t-il d’élèves dans un groupe ?",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content: "25 % = 1/4. Donc il faut calculer 48 ÷ 4.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Cherche d’abord la moitié de 48, puis encore la moitié.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content: "Explique pourquoi 25 % correspond à un quart.",
      },
    ],
  },

 {
  id: "mangues_reunion_001",
  title: "Les mangues du marché",
  theme: "Marché de La Réunion",
  statement:
    "Au marché de Saint-Paul, un vendeur avait 80 mangues. Il a vendu 25 % de son stock le matin.",
  question: "Combien de mangues a-t-il vendues ?",
  expectedAnswer: "20",
  explanation:
    "25 %, c’est un quart. Le quart de 80 est 20. Le vendeur a donc vendu 20 mangues.",
  directions: [
    {
      id: "schema",
      label: "Faire un schéma",
      type: "guided",
      content:
        "Dessine une barre représentant 80 mangues puis partage-la en 4 parts égales.",
    },
    {
      id: "calcul",
      label: "Chercher le calcul",
      type: "guided",
      content:
        "25 % signifie un quart. Quelle opération permet de trouver le quart de 80 ?",
    },
    {
      id: "questionnement",
      label: "Répondre étape par étape",
      type: "guided",
      content:
        "1. Que signifie 25 % ?\n2. Quelle est le quart de 80 ?\n3. Combien de mangues ont été vendues ?",
    },
    {
      id: "open",
      label: "Expliquer avec mes mots",
      type: "open",
      content: "Explique comment tu as trouvé rapidement la réponse.",
    },
  ],
},

  {
    id: "plage_reunion_001",
    title: "Nettoyage de plage",
    theme: "Écologie & citoyenneté",
    statement:
      "Lors d’un nettoyage de plage à La Réunion, des élèves ont ramassé 200 déchets. 10 % étaient des bouteilles en plastique.",
    question:
      "Combien de bouteilles en plastique ont été ramassées ?",
    expectedAnswer: "20",
    explanation:
      "10 %, c’est diviser par 10. Donc 200 ÷ 10 = 20. Les élèves ont ramassé 20 bouteilles.",
    directions: [
      {
        id: "schema",
        label: "Faire un schéma",
        type: "guided",
        content:
          "Imagine 200 objets répartis en 10 groupes égaux. Combien y a-t-il d’objets dans un groupe ?",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "10 % signifie un dixième. Quelle opération permet de trouver un dixième de 200 ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Pour trouver 10 %, on peut simplement diviser par 10.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi réduire les déchets plastiques est important pour les plages de La Réunion.",
      },
    ],
  },

  {
    id: "volcan_reunion_001",
    title: "Randonnée au volcan",
    theme: "Distances & pourcentages",
    statement:
      "Une randonnée au Piton de la Fournaise mesure 12 km. Les élèves ont déjà parcouru 50 % du trajet.",
    question:
      "Combien de kilomètres les élèves ont-ils déjà parcourus ?",
    expectedAnswer: "6",
    explanation:
      "50 %, c’est la moitié. La moitié de 12 km est 6 km. Les élèves ont donc déjà parcouru 6 km.",
    directions: [
      {
        id: "schema",
        label: "Faire un schéma",
        type: "guided",
        content:
          "Dessine une barre représentant 12 km puis partage-la en 2 parties égales.",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "50 % signifie la moitié. Quelle opération permet de trouver la moitié de 12 ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Pour trouver 50 %, on divise par 2.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi 50 % correspond à la moitié d’un trajet.",
      },
    ],
  },

  {
    id: "ananas_reunion_001",
    title: "Les ananas Victoria",
    theme: "Pourcentages & produits locaux",
    statement:
      "Un agriculteur récolte 60 ananas Victoria. Il en réserve 20 % pour le marché local.",
    question:
      "Combien d’ananas sont réservés pour le marché local ?",
    expectedAnswer: "12",
    explanation:
      "10 % de 60 vaut 6. Donc 20 %, c’est deux fois 10 %, soit 12. L’agriculteur réserve 12 ananas.",
    directions: [
      {
        id: "schema",
        label: "Faire un schéma",
        type: "guided",
        content:
          "Imagine 60 ananas répartis en 10 groupes égaux. Combien vaut un groupe ?",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "10 % de 60 = ?. Donc 20 % de 60 = deux fois ce résultat.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Commence par calculer 10 % de 60, puis double le résultat.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi les produits locaux sont importants à La Réunion.",
      },
    ],
  },

  {
    id: "sortie_scolaire_absents_001",
    title: "La sortie scolaire",
    theme: "Pourcentages & vie de classe",
    statement:
      "Pour une sortie scolaire, 48 élèves étaient inscrits. Le jour de la sortie, 25 % des élèves sont absents.",
    question:
      "Combien d’élèves participent finalement à la sortie ?",
    expectedAnswer: "36",
    explanation:
      "25 %, c’est un quart. Le quart de 48 est 12, donc 12 élèves sont absents. Mais la question demande combien d’élèves participent. Il faut donc enlever les absents au total : 48 - 12 = 36. Finalement, 36 élèves participent à la sortie.",
    directions: [
      {
        id: "schema",
        label: "Faire un schéma",
        type: "guided",
        content:
          "Imagine une barre qui représente les 48 élèves inscrits. Coupe-la en 4 parts égales. Une part représente les 25 % d’élèves absents.",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "Étape 1 : calcule 25 % de 48, donc 48 ÷ 4.\nÉtape 2 : enlève ce résultat au total : 48 - ...",
      },
      {
        id: "questionnement",
        label: "Répondre étape par étape",
        type: "guided",
        content:
          "1. Que signifie 25 % ?\n2. Combien vaut le quart de 48 ?\n3. Ce nombre représente-t-il les absents ou les présents ?\n4. Combien d’élèves participent finalement ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Attention : 25 % donne le nombre d’absents. La question demande le nombre d’élèves présents à la sortie.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique ta méthode avec une phrase complète. Tu peux commencer par : « J’ai d’abord calculé les absents, puis... »",
      },
    ],
  },
];