// lib/concours-general/banks/geometrie.bank.ts

import type { ConcoursGeneralItem } from "../types";

export const geometrieBank: ConcoursGeneralItem[] = [
  {
    id: "cg_geo_001_aire_perimetre",
    niveauCible: "3e",
    accessibleFrom: "6e",
    theme: "geometrie",
    difficulty: 3,

    title: "Aire ou périmètre ?",

    statement:
      "Un carré a une aire de 81 cm². Un élève affirme : « Son périmètre est 81 cm. »",

    question:
      "A-t-il raison ? Donne le périmètre correct.",

    format: "short",
    expected: ["36"],

    notionIds: ["aires", "perimetres"],
    microIds: ["aire_carre", "perimetre_carre"],

    hint1: "Si l’aire vaut 81 cm², cherche d’abord la longueur du côté.",
    hint2: "Quel nombre multiplié par lui-même donne 81 ?",
    hint3: "Le côté vaut 9 cm, donc le périmètre vaut 4 × 9.",

    correction:
      "L’élève confond aire et périmètre. Si l’aire du carré vaut 81 cm², alors côté × côté = 81. Le côté mesure donc 9 cm. Le périmètre vaut 4 × 9 = 36 cm. Le périmètre correct est 36 cm.",

    redactionAttendue:
      "L’aire du carré vaut côté × côté. Comme 9 × 9 = 81, le côté mesure 9 cm. Le périmètre vaut donc 4 × 9 = 36 cm. L’élève a tort.",

    tags: ["concours_general", "accessible_6e", "aire", "perimetre", "erreur"],
  },

  {
    id: "cg_geo_002_triangle_sentier",
    niveauCible: "3e",
    accessibleFrom: "4e",
    theme: "geometrie",
    difficulty: 4,

    title: "Le triangle du sentier",

    statement:
      "Sur une carte, un sentier forme un triangle ABC rectangle en A. On connaît AB = 500 m et AC = 1200 m.",

    question:
      "Quelle est la longueur directe BC ?",

    format: "short",
    expected: ["1300"],

    notionIds: ["pythagore"],
    microIds: ["pythagore_calculer_hypotenuse"],

    hint1: "BC est l’hypoténuse du triangle rectangle.",
    hint2: "Utilise le théorème de Pythagore.",
    hint3: "BC² = 500² + 1200².",

    correction:
      "Le triangle ABC est rectangle en A, donc BC est l’hypoténuse. D’après le théorème de Pythagore : BC² = AB² + AC² = 500² + 1200² = 250 000 + 1 440 000 = 1 690 000. Donc BC = 1300 m.",

    redactionAttendue:
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore, BC² = AB² + AC². Donc BC² = 500² + 1200² = 1 690 000, d’où BC = 1300 m.",

    tags: ["concours_general", "pythagore", "reunion", "geometrie"],
  },

  {
    id: "cg_geo_003_carre_aire_x4",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "geometrie",
    difficulty: 4,

    title: "Le carré agrandi",

    statement:
      "Un carré a un périmètre de 40 cm. On construit un second carré dont l’aire est 4 fois plus grande.",

    question:
      "Quel est le périmètre du second carré ?",

    format: "short",
    expected: ["80"],

    notionIds: ["aires", "perimetres", "agrandissement_reduction"],
    microIds: ["aire_carre", "perimetre_carre", "effet_agrandissement"],

    hint1: "Commence par trouver le côté du premier carré.",
    hint2: "Le côté du premier carré vaut 40 ÷ 4.",
    hint3: "Si l’aire est multipliée par 4, le côté est multiplié par 2.",

    correction:
      "Le premier carré a un périmètre de 40 cm, donc son côté vaut 40 ÷ 4 = 10 cm. Son aire vaut 10 × 10 = 100 cm². Le second carré a une aire 4 fois plus grande : 100 × 4 = 400 cm². Son côté vaut donc 20 cm, car 20 × 20 = 400. Son périmètre vaut 4 × 20 = 80 cm.",

    redactionAttendue:
      "Le côté du premier carré vaut 10 cm. Son aire vaut 100 cm². L’aire du second carré vaut 400 cm², donc son côté vaut 20 cm. Son périmètre vaut 4 × 20 = 80 cm.",

    tags: ["concours_general", "aire", "perimetre", "agrandissement"],
  },

  {
    id: "cg_geo_004_volume_bassin",
    niveauCible: "3e",
    accessibleFrom: "5e",
    theme: "geometrie",
    difficulty: 4,

    title: "Le bassin d’eau",

    statement:
      "Un collège installe un bassin de récupération d’eau de pluie en forme de pavé droit. Ses dimensions sont : longueur 5 m, largeur 3 m, hauteur 1,4 m. On sait que 1 m³ = 1000 L.",

    question:
      "Combien de litres d’eau le bassin peut-il contenir ?",

    format: "short",
    expected: ["21000"],

    notionIds: ["volumes", "conversions"],
    microIds: ["volume_pave", "volume_unites"],

    hint1: "Calcule d’abord le volume en m³.",
    hint2: "Volume = longueur × largeur × hauteur.",
    hint3: "Convertis ensuite les m³ en litres.",

    correction:
      "Le volume du bassin vaut 5 × 3 × 1,4 = 21 m³. Comme 1 m³ = 1000 L, alors 21 m³ = 21 000 L. Le bassin peut contenir 21 000 litres d’eau.",

    redactionAttendue:
      "Le bassin est un pavé droit. Son volume vaut 5 × 3 × 1,4 = 21 m³. Comme 1 m³ correspond à 1000 L, le bassin contient 21 × 1000 = 21 000 L.",

    tags: ["concours_general", "volume", "eau", "reunion", "environnement"],
  },

  {
    id: "cg_geo_005_thales_simple",
    niveauCible: "3e",
    accessibleFrom: "3e",
    theme: "geometrie",
    difficulty: 5,

    title: "La longueur manquante",

    statement:
      "Dans le triangle ABC, les points M et N sont placés respectivement sur [AB] et [AC]. Les droites (MN) et (BC) sont parallèles. On sait que AM = 6 cm, AB = 15 cm et AC = 35 cm.",

    question:
      "Calculer AN.",

    format: "short",
    expected: ["14"],

    notionIds: ["thales", "proportionnalite"],
    microIds: ["thales_calculer_longueur", "prop_quatrieme"],

    hint1: "Les droites (MN) et (BC) sont parallèles.",
    hint2: "Utilise le théorème de Thalès : AM / AB = AN / AC.",
    hint3: "6 / 15 = AN / 35.",

    correction:
      "Comme les droites (MN) et (BC) sont parallèles, on peut appliquer le théorème de Thalès. On écrit AM / AB = AN / AC. Donc 6 / 15 = AN / 35. Par produit en croix, 15 × AN = 6 × 35 = 210. Donc AN = 210 ÷ 15 = 14 cm.",

    redactionAttendue:
      "Les droites (MN) et (BC) sont parallèles. D’après le théorème de Thalès, AM / AB = AN / AC. Donc 6 / 15 = AN / 35. Ainsi AN = 14 cm.",

    tags: ["concours_general", "thales", "geometrie", "niveau_3e"],
  },
];