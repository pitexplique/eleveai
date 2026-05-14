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
      "Un carré a une aire de 64 cm². Un élève affirme : « Son périmètre est 64 cm. »",

    question:
      "A-t-il raison ? Donne le périmètre correct.",

    format: "short",
    expected: ["32"],

    notionIds: ["aires", "perimetres"],
    microIds: ["aire_carre", "perimetre_carre"],

    hint1: "Si l’aire vaut 64 cm², cherche d’abord la longueur du côté.",
    hint2: "Quel nombre multiplié par lui-même donne 64 ?",
    hint3: "Le côté vaut 8 cm, donc le périmètre vaut 4 × 8.",

    correction:
      "L’élève confond aire et périmètre. Si l’aire du carré vaut 64 cm², alors côté × côté = 64. Le côté mesure donc 8 cm. Le périmètre vaut 4 × 8 = 32 cm. Le périmètre correct est 32 cm.",

    redactionAttendue:
      "L’aire du carré vaut côté × côté. Comme 8 × 8 = 64, le côté mesure 8 cm. Le périmètre vaut donc 4 × 8 = 32 cm. L’élève a tort.",

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
      "Sur une carte, un sentier forme un triangle ABC rectangle en A. On connaît AB = 300 m et AC = 400 m.",

    question:
      "Quelle est la longueur directe BC ?",

    format: "short",
    expected: ["500"],

    notionIds: ["pythagore"],
    microIds: ["pythagore_calculer_hypotenuse"],

    hint1: "BC est l’hypoténuse du triangle rectangle.",
    hint2: "Utilise le théorème de Pythagore.",
    hint3: "BC² = 300² + 400².",

    correction:
      "Le triangle ABC est rectangle en A, donc BC est l’hypoténuse. D’après le théorème de Pythagore : BC² = AB² + AC² = 300² + 400² = 90 000 + 160 000 = 250 000. Donc BC = 500 m.",

    redactionAttendue:
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore, BC² = AB² + AC². Donc BC² = 300² + 400² = 250 000, d’où BC = 500 m.",

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
      "Un carré a un périmètre de 48 cm. On construit un second carré dont l’aire est 4 fois plus grande.",

    question:
      "Quel est le périmètre du second carré ?",

    format: "short",
    expected: ["96"],

    notionIds: ["aires", "perimetres", "agrandissement_reduction"],
    microIds: ["aire_carre", "perimetre_carre", "effet_agrandissement"],

    hint1: "Commence par trouver le côté du premier carré.",
    hint2: "Le côté du premier carré vaut 48 ÷ 4.",
    hint3: "Si l’aire est multipliée par 4, le côté est multiplié par 2.",

    correction:
      "Le premier carré a un périmètre de 48 cm, donc son côté vaut 48 ÷ 4 = 12 cm. Son aire vaut 12 × 12 = 144 cm². Le second carré a une aire 4 fois plus grande : 144 × 4 = 576 cm². Son côté vaut donc 24 cm, car 24 × 24 = 576. Son périmètre vaut 4 × 24 = 96 cm.",

    redactionAttendue:
      "Le côté du premier carré vaut 12 cm. Son aire vaut 144 cm². L’aire du second carré vaut 576 cm², donc son côté vaut 24 cm. Son périmètre vaut 4 × 24 = 96 cm.",

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
      "Un collège installe un bassin de récupération d’eau de pluie en forme de pavé droit. Ses dimensions sont : longueur 4 m, largeur 2,5 m, hauteur 1,2 m. On sait que 1 m³ = 1000 L.",

    question:
      "Combien de litres d’eau le bassin peut-il contenir ?",

    format: "short",
    expected: ["12000"],

    notionIds: ["volumes", "conversions"],
    microIds: ["volume_pave", "volume_unites"],

    hint1: "Calcule d’abord le volume en m³.",
    hint2: "Volume = longueur × largeur × hauteur.",
    hint3: "Convertis ensuite les m³ en litres.",

    correction:
      "Le volume du bassin vaut 4 × 2,5 × 1,2 = 12 m³. Comme 1 m³ = 1000 L, alors 12 m³ = 12 000 L. Le bassin peut contenir 12 000 litres d’eau.",

    redactionAttendue:
      "Le bassin est un pavé droit. Son volume vaut 4 × 2,5 × 1,2 = 12 m³. Comme 1 m³ correspond à 1000 L, le bassin contient 12 × 1000 = 12 000 L.",

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
      "Dans le triangle ABC, les points M et N sont placés respectivement sur [AB] et [AC]. Les droites (MN) et (BC) sont parallèles. On sait que AM = 4 cm, AB = 10 cm et AC = 30 cm.",

    question:
      "Calculer AN.",

    format: "short",
    expected: ["12"],

    notionIds: ["thales", "proportionnalite"],
    microIds: ["thales_calculer_longueur", "prop_quatrieme"],

    hint1: "Les droites (MN) et (BC) sont parallèles.",
    hint2: "Utilise le théorème de Thalès : AM / AB = AN / AC.",
    hint3: "4 / 10 = AN / 30.",

    correction:
      "Comme les droites (MN) et (BC) sont parallèles, on peut appliquer le théorème de Thalès. On écrit AM / AB = AN / AC. Donc 4 / 10 = AN / 30. Par produit en croix, 10 × AN = 4 × 30 = 120. Donc AN = 120 ÷ 10 = 12 cm.",

    redactionAttendue:
      "Les droites (MN) et (BC) sont parallèles. D’après le théorème de Thalès, AM / AB = AN / AC. Donc 4 / 10 = AN / 30. Ainsi AN = 12 cm.",

    tags: ["concours_general", "thales", "geometrie", "niveau_3e"],
  },
];