// lib/defis-du-jour/probleme.fixed.ts

import type { ProblemeDuJour } from "./types";

export const problemesFixed: ProblemeDuJour[] = [
  {
    id: "bus_sortie_volcan_duree_001",
    title: "Le bus pour la sortie",
    theme: "Durées & organisation",
    statement:
      "Une classe part en sortie au volcan. Le bus doit arriver au collège à 8 h 15. Le trajet jusqu’au volcan dure 1 h 35. Avant de partir, il faut prévoir 20 minutes pour faire l’appel et ranger les sacs.",
    question:
      "À quelle heure les élèves doivent-ils être prêts devant le collège ?",
    expectedAnswer: "6 h 20",
    explanation:
      "Il faut compter 20 minutes d’organisation et 1 h 35 de trajet. Au total, cela fait 1 h 55. On enlève donc 1 h 55 à 8 h 15. 8 h 15 moins 1 h donne 7 h 15. Puis 7 h 15 moins 55 minutes donne 6 h 20. Les élèves doivent être prêts à 6 h 20.",
    directions: [
      {
        id: "schema",
        label: "Faire une frise du temps",
        type: "guided",
        content:
          "Trace une frise. Place l’heure d’arrivée : 8 h 15. Avant cette heure, il faut placer le trajet de 1 h 35 et l’organisation de 20 minutes.",
      },
      {
        id: "calcul",
        label: "Chercher le calcul",
        type: "guided",
        content:
          "Étape 1 : additionne les durées nécessaires avant l’arrivée : 1 h 35 + 20 min.\nÉtape 2 : enlève cette durée totale à 8 h 15.",
      },
      {
        id: "questionnement",
        label: "Répondre étape par étape",
        type: "guided",
        content:
          "1. Combien de temps faut-il prévoir avant d’arriver ?\n2. Quelle durée totale cela représente-t-il ?\n3. Quelle opération faut-il faire à partir de 8 h 15 ?\n4. Quelle est l’heure de départ/préparation ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Commence par calculer la durée totale à prévoir : 1 h 35 + 20 min. Ensuite, remonte le temps à partir de 8 h 15.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique ta méthode avec une phrase complète. Tu peux commencer par : « J’ai d’abord calculé la durée totale avant l’arrivée, puis... »",
      },
    ],
  },

  // tu peux laisser les autres défis ensuite
];