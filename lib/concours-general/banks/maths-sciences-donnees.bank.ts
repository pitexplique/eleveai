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
      "Un carré a une aire de 121 cm². Un élève affirme : « Son périmètre est 121 cm. »",

    question:
      "A-t-il raison ? Donne le périmètre correct.",

    format: "short",
    expected: ["44"],

    notionIds: ["aires", "perimetres"],
    microIds: ["aire_carre", "perimetre_carre"],

    hint1: "Si l’aire vaut 121 cm², cherche d’abord la longueur du côté.",
    hint2: "Quel nombre multiplié par lui-même donne 121 ?",
    hint3: "Le côté vaut 11 cm, donc le périmètre vaut 4 × 11.",

    correction:
      "L’élève confond aire et périmètre. Si l’aire du carré vaut 121 cm², alors côté × côté = 121. Le côté mesure donc 11 cm. Le périmètre vaut 4 × 11 = 44 cm. Le périmètre correct est 44 cm.",

    redactionAttendue:
      "L’aire du carré vaut côté × côté. Comme 11 × 11 = 121, le côté mesure 11 cm. Le périmètre vaut donc 4 × 11 = 44 cm. L’élève a tort.",

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
      "Sur une carte, un sentier forme un triangle ABC rectangle en A. On connaît AB = 700 m et AC = 2400 m.",

    question:
      "Quelle est la longueur directe BC ?",

    format: "short",
    expected: ["2500"],

    notionIds: ["pythagore"],
    microIds: ["pythagore_calculer_hypotenuse"],

    hint1: "BC est l’hypoténuse du triangle rectangle.",
    hint2: "Utilise le théorème de Pythagore.",
    hint3: "BC² = 700² + 2400².",

    correction:
      "Le triangle ABC est rectangle en A, donc BC est l’hypoténuse. D’après le théorème de Pythagore : BC² = AB² + AC² = 700² + 2400² = 490 000 + 5 760 000 = 6 250 000. Donc BC = 2500 m.",

    redactionAttendue:
      "Dans le triangle ABC rectangle en A, d’après le théorème de Pythagore, BC² = AB² + AC². Donc BC² = 700² + 2400² = 6 250 000, d’où BC = 2500 m.",

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
      "Un carré a un périmètre de 56 cm. On construit un second carré dont l’aire est 4 fois plus grande.",

    question:
      "Quel est le périmètre du second carré ?",

    format: "short",
    expected: ["112"],

    notionIds: ["aires", "perimetres", "agrandissement_reduction"],
    microIds: ["aire_carre", "perimetre_carre", "effet_agrandissement"],

    hint1: "Commence par trouver le côté du premier carré.",
    hint2: "Le côté du premier carré vaut 56 ÷ 4.",
    hint3: "Si l’aire est multipliée par 4, le côté est multiplié par 2.",

    correction:
      "Le premier carré a un périmètre de 56 cm, donc son côté vaut 56 ÷ 4 = 14 cm. Son aire vaut 14 × 14 = 196 cm². Le second carré a une aire 4 fois plus grande : 196 × 4 = 784 cm². Son côté vaut donc 28 cm, car 28 × 28 = 784. Son périmètre vaut 4 × 28 = 112 cm.",

    redactionAttendue:
      "Le côté du premier carré vaut 14 cm. Son aire vaut 196 cm². L’aire du second carré vaut 784 cm², donc son côté vaut 28 cm. Son périmètre vaut 4 × 28 = 112 cm.",

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
      "Un collège installe un bassin de récupération d’eau de pluie en forme de pavé droit. Ses dimensions sont : longueur 6 m, largeur 2,5 m, hauteur 1,2 m. On sait que 1 m³ = 1000 L.",

    question:
      "Combien de litres d’eau le bassin peut-il contenir ?",

    format: "short",
    expected: ["18000"],

    notionIds: ["volumes", "conversions"],
    microIds: ["volume_pave", "volume_unites"],

    hint1: "Calcule d’abord le volume en m³.",
    hint2: "Volume = longueur × largeur × hauteur.",
    hint3: "Convertis ensuite les m³ en litres.",

    correction:
      "Le volume du bassin vaut 6 × 2,5 × 1,2 = 18 m³. Comme 1 m³ = 1000 L, alors 18 m³ = 18 000 L. Le bassin peut contenir 18 000 litres d’eau.",

    redactionAttendue:
      "Le bassin est un pavé droit. Son volume vaut 6 × 2,5 × 1,2 = 18 m³. Comme 1 m³ correspond à 1000 L, le bassin contient 18 × 1000 = 18 000 L.",

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
      "Dans le triangle ABC, les points M et N sont placés respectivement sur [AB] et [AC]. Les droites (MN) et (BC) sont parallèles. On sait que AM = 8 cm, AB = 20 cm et AC = 45 cm.",

    question:
      "Calculer AN.",

    format: "short",
    expected: ["18"],

    notionIds: ["thales", "proportionnalite"],
    microIds: ["thales_calculer_longueur", "prop_quatrieme"],

    hint1: "Les droites (MN) et (BC) sont parallèles.",
    hint2: "Utilise le théorème de Thalès : AM / AB = AN / AC.",
    hint3: "8 / 20 = AN / 45.",

    correction:
      "Comme les droites (MN) et (BC) sont parallèles, on peut appliquer le théorème de Thalès. On écrit AM / AB = AN / AC. Donc 8 / 20 = AN / 45. Par produit en croix, 20 × AN = 8 × 45 = 360. Donc AN = 360 ÷ 20 = 18 cm.",

    redactionAttendue:
      "Les droites (MN) et (BC) sont parallèles. D’après le théorème de Thalès, AM / AB = AN / AC. Donc 8 / 20 = AN / 45. Ainsi AN = 18 cm.",

    tags: ["concours_general", "thales", "geometrie", "niveau_3e"],
  },
];