import type { ProblemeDuJour } from "./types";

export const problemesFixed: ProblemeDuJour[] = [
  {
    id: "hydro_tanika_energie_001",
    title: "Hydro Tanika : une réserve d’énergie pour La Réunion",
    theme: "Énergie & puissance",
    statement:
      "À La Réunion, le projet Hydro Tanika prévoit une station capable de fournir une puissance de 50 MW pendant 8 heures. Pour comprendre ce que cela représente, on utilise la relation : énergie = puissance × durée.",
    question:
      "Quelle quantité d’énergie la station peut-elle fournir en 8 heures ? Donne ta réponse en MWh.",
    expectedAnswer: "400 MWh",
    explanation:
      "On utilise la formule : énergie = puissance × durée. La puissance est de 50 MW et la durée est de 8 h. Donc 50 × 8 = 400. La station peut fournir 400 MWh d’énergie.",
    directions: [
      {
        id: "formule",
        label: "Utiliser la formule",
        type: "guided",
        content:
          "La formule est : énergie = puissance × durée.\nRemplace la puissance par 50 MW et la durée par 8 h.",
      },
      {
        id: "calcul",
        label: "Faire le calcul",
        type: "guided",
        content:
          "Calcule : 50 × 8.\nAttention à l’unité : MW × h donne des MWh.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Commence par multiplier 50 par 8. La réponse doit être exprimée en MWh.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi on multiplie la puissance par la durée. Tu peux commencer par : « La station fournit 50 MW pendant chaque heure, donc... »",
      },
    ],
  },

  {
    id: "hydro_tanika_kwh_foyers_001",
    title: "Hydro Tanika : combien de foyers alimentés ?",
    theme: "Conversions & ordre de grandeur",
    statement:
      "La station Hydro Tanika pourrait fournir 400 MWh d’énergie. Pour comparer avec la vie quotidienne, on estime qu’un foyer consomme environ 10 kWh par jour.",
    question:
      "Environ combien de foyers pourraient être alimentés pendant une journée avec 400 MWh ?",
    expectedAnswer: "40000",
    explanation:
      "On commence par convertir : 400 MWh = 400 000 kWh, car 1 MWh = 1 000 kWh. Un foyer consomme environ 10 kWh par jour. On calcule donc 400 000 ÷ 10 = 40 000. Hydro Tanika pourrait fournir l’équivalent d’environ 40 000 foyers pendant une journée.",
    directions: [
      {
        id: "conversion",
        label: "Convertir les MWh en kWh",
        type: "guided",
        content:
          "Commence par convertir 400 MWh en kWh.\nRappel : 1 MWh = 1 000 kWh.",
      },
      {
        id: "division",
        label: "Chercher le nombre de foyers",
        type: "guided",
        content:
          "Une fois l’énergie convertie en kWh, divise par la consommation d’un foyer pendant une journée : 10 kWh.",
      },
      {
        id: "questionnement",
        label: "Répondre étape par étape",
        type: "guided",
        content:
          "1. Combien de kWh représentent 400 MWh ?\n2. Combien consomme environ un foyer en une journée ?\n3. Quelle division faut-il faire ?\n4. Que représente le résultat ?",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "400 MWh, c’est 400 000 kWh. Il reste à diviser par 10.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi ce calcul permet d’estimer le nombre de foyers alimentés. Tu peux parler de conversion et d’ordre de grandeur.",
      },
    ],
  },

  {
    id: "hydro_tanika_volume_heure_001",
    title: "Hydro Tanika : l’eau du bassin",
    theme: "Volume & division",
    statement:
      "Le projet Hydro Tanika prévoit un bassin pouvant contenir environ 800 000 m³ d’eau. Imaginons que cette eau soit utilisée de manière régulière pendant 8 heures de production.",
    question:
      "Quel volume moyen d’eau serait utilisé chaque heure ? Donne ta réponse en m³ par heure.",
    expectedAnswer: "100000",
    explanation:
      "Le bassin contient 800 000 m³. Si ce volume est réparti sur 8 heures, on calcule 800 000 ÷ 8 = 100 000. Le volume moyen utilisé serait donc de 100 000 m³ par heure.",
    directions: [
      {
        id: "situation",
        label: "Comprendre la situation",
        type: "guided",
        content:
          "On répartit le volume total d’eau sur 8 heures. Il faut donc faire une division.",
      },
      {
        id: "calcul",
        label: "Faire le calcul",
        type: "guided",
        content:
          "Calcule : 800 000 ÷ 8.\nLa réponse doit être en m³ par heure.",
      },
      {
        id: "ordre_grandeur",
        label: "Vérifier l’ordre de grandeur",
        type: "guided",
        content:
          "Vérifie ton résultat : si on utilise 100 000 m³ pendant 8 heures, on obtient bien 800 000 m³.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Comme 8 × 100 000 = 800 000, le volume moyen par heure est proche de 100 000 m³.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi on divise 800 000 par 8. Tu peux commencer par : « Comme l’eau est répartie sur 8 heures... »",
      },
    ],
  },

  {
    id: "hydro_tanika_volume_minute_001",
    title: "Hydro Tanika : un débit impressionnant",
    theme: "Débit & conversion de durée",
    statement:
      "Dans le défi précédent, on a estimé que la station pourrait utiliser en moyenne 100 000 m³ d’eau par heure. Une heure contient 60 minutes.",
    question:
      "Quel volume moyen d’eau cela représente-t-il par minute ? Arrondis à l’unité près.",
    expectedAnswer: "1667",
    explanation:
      "On sait qu’une heure contient 60 minutes. On calcule donc 100 000 ÷ 60 ≈ 1 666,7. Arrondi à l’unité près, cela fait environ 1 667 m³ par minute.",
    directions: [
      {
        id: "conversion_temps",
        label: "Passer de l’heure à la minute",
        type: "guided",
        content:
          "On connaît le volume par heure. Pour trouver le volume par minute, il faut diviser par 60.",
      },
      {
        id: "calcul",
        label: "Faire la division",
        type: "guided",
        content:
          "Calcule : 100 000 ÷ 60.\nLe résultat n’est pas entier, donc on arrondit à l’unité près.",
      },
      {
        id: "sens",
        label: "Donner du sens au résultat",
        type: "guided",
        content:
          "Le résultat représente le volume d’eau moyen qui passerait en une seule minute.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "100 000 ÷ 60 est un peu plus grand que 1 600, car 60 × 1 600 = 96 000.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi le volume par minute est beaucoup plus petit que le volume par heure.",
      },
    ],
  },

  {
    id: "hydro_tanika_surface_bassin_001",
    title: "Hydro Tanika : quelle taille pour le bassin ?",
    theme: "Aires & hectares",
    statement:
      "Le bassin du projet Hydro Tanika occuperait une surface d’environ 13 hectares. On rappelle que 1 hectare = 10 000 m².",
    question:
      "Quelle surface cela représente-t-il en m² ?",
    expectedAnswer: "130000",
    explanation:
      "On sait que 1 hectare = 10 000 m². Donc 13 hectares = 13 × 10 000 = 130 000 m². Le bassin occuperait environ 130 000 m².",
    directions: [
      {
        id: "conversion",
        label: "Utiliser la conversion",
        type: "guided",
        content:
          "Rappel : 1 hectare = 10 000 m².\nIl faut donc multiplier le nombre d’hectares par 10 000.",
      },
      {
        id: "calcul",
        label: "Faire le calcul",
        type: "guided",
        content:
          "Calcule : 13 × 10 000.\nLa réponse doit être donnée en m².",
      },
      {
        id: "comparaison",
        label: "Imaginer la taille",
        type: "guided",
        content:
          "Pour te représenter la surface, pense qu’un terrain de football mesure environ 7 000 m². Le bassin ferait donc beaucoup plus qu’un seul terrain.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "13 hectares, c’est 13 fois 10 000 m².",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi l’hectare est une unité utile pour parler de grandes surfaces.",
      },
    ],
  },

  {
    id: "hydro_tanika_comparaison_ville_001",
    title: "Hydro Tanika : une ville pendant une journée ?",
    theme: "Comparaison & estimation",
    statement:
      "On estime qu’Hydro Tanika pourrait fournir environ 400 000 kWh d’énergie. Un foyer consomme environ 10 kWh par jour. Imaginons une ville de 25 000 foyers.",
    question:
      "L’énergie fournie serait-elle suffisante pour alimenter cette ville pendant une journée ? Réponds oui ou non, puis justifie.",
    expectedAnswer: "oui",
    explanation:
      "Une ville de 25 000 foyers consomme environ 25 000 × 10 = 250 000 kWh par jour. Hydro Tanika peut fournir environ 400 000 kWh. Comme 400 000 est supérieur à 250 000, l’énergie serait suffisante pour alimenter cette ville pendant une journée.",
    directions: [
      {
        id: "besoin_ville",
        label: "Calculer le besoin de la ville",
        type: "guided",
        content:
          "Chaque foyer consomme environ 10 kWh par jour. Pour 25 000 foyers, calcule : 25 000 × 10.",
      },
      {
        id: "comparaison",
        label: "Comparer deux quantités",
        type: "guided",
        content:
          "Compare l’énergie disponible, 400 000 kWh, avec le besoin de la ville.",
      },
      {
        id: "phrase",
        label: "Rédiger la justification",
        type: "guided",
        content:
          "Ta réponse doit contenir une comparaison : 400 000 kWh est supérieur ou inférieur à 250 000 kWh.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "La ville aurait besoin d’environ 250 000 kWh. Hydro Tanika pourrait fournir 400 000 kWh.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Explique pourquoi une estimation suffit ici. Tu peux utiliser les mots : environ, supérieur, suffisant.",
      },
    ],
  },

  {
    id: "hydro_tanika_synthese_001",
    title: "Hydro Tanika : raconter les nombres clés",
    theme: "Synthèse & argumentation",
    statement:
      "Cette semaine, tu as étudié plusieurs nombres du projet Hydro Tanika : 50 MW de puissance, 8 heures de production, 400 MWh d’énergie, 800 000 m³ d’eau et un bassin d’environ 13 hectares.",
    question:
      "Écris une courte explication pour montrer en quoi Hydro Tanika pourrait aider La Réunion à stocker et restituer de l’énergie.",
    expectedAnswer: "explication",
    explanation:
      "Une bonne réponse doit expliquer que la station utilise l’eau comme une réserve d’énergie. Quand il y a de l’énergie disponible, l’eau peut être pompée vers un bassin en altitude. Quand on a besoin d’électricité, l’eau redescend et permet de produire de l’énergie. Les nombres clés montrent l’ampleur du projet : 50 MW pendant 8 heures, soit 400 MWh, avec un bassin de 800 000 m³.",
    directions: [
      {
        id: "mots_cles",
        label: "Utiliser les mots clés",
        type: "guided",
        content:
          "Essaie d’utiliser les mots : eau, bassin, altitude, énergie, électricité, La Réunion.",
      },
      {
        id: "nombres_cles",
        label: "Réutiliser les nombres importants",
        type: "guided",
        content:
          "Tu peux citer quelques nombres : 50 MW, 8 heures, 400 MWh, 800 000 m³.",
      },
      {
        id: "structure",
        label: "Structurer ma réponse",
        type: "guided",
        content:
          "Tu peux écrire ta réponse en 3 phrases :\n1. Le principe du projet.\n2. Les nombres importants.\n3. Pourquoi cela peut être utile.",
      },
      {
        id: "indice",
        label: "Demander un indice",
        type: "hint",
        content:
          "Pense à une batterie : Hydro Tanika ne crée pas seulement de l’énergie, il aide surtout à la stocker puis à la restituer quand on en a besoin.",
      },
      {
        id: "open",
        label: "Expliquer avec mes mots",
        type: "open",
        content:
          "Rédige une explication claire, comme si tu devais expliquer le projet à un camarade de 6e.",
      },
    ],
  },
];