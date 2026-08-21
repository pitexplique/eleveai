// knowledge/maths/6e/notions.ts

import type { NotionSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const notions: NotionSource[] = [

  
  // =========================
  // ALGORITHMIQUE
  // =========================

{
  id: "algo_programmation",
  label: "Algorithmique et programmation",
  boId: "BO6I1",
  prerequis: ["entier_calcul_mental"],
  levels: [1, 2, 3],
},
  {
    id: "entier_nombre",
    label: "Nombres entiers",
    boId: "BO6N1",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "decimal_nombre",
    label: "Nombres décimaux",
    boId: "BO6N1",
    prerequis: ["entier_nombre"],
    levels: [1, 2, 3],
  },

  // ⛔ COUPÉE EN DEUX LE 21/08/2026 (Frédéric : « il faut que les notions
  // soient cohérentes »). « Nombres décimaux » portait sept micros et deux
  // sujets : ce qu'EST un décimal (lire, rang, comparer) et ce qu'on en FAIT
  // (additionner, multiplier, diviser). Un élève qui bute sur la virgule d'une
  // multiplication n'a pas un problème de lecture de nombre, et le diagnostic
  // le rangeait pourtant au même endroit.
  //
  // C'est exactement le découpage déjà fait en 5e : `fraction_nombre` /
  // `fraction_calcul`, `relatif_nombre` / `relatif_operation`.
  {
    id: "decimal_calcul",
    label: "Calculer avec les décimaux",
    boId: "BO6N1",
    prerequis: ["decimal_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "fraction_nombre",
    label: "Fractions",
    boId: "BO6N2",
    prerequis: ["decimal_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "pourcentage_nombre",
    label: "Pourcentages",
    boId: "BO6N2",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "prop_proportionnalite",
    label: "Proportionnalité",
    boId: "BO6N3",
    prerequis: ["pourcentage_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "entier_calcul_pose",
    label: "Calcul posé",
    boId: "BO6N4",
    prerequis: ["entier_nombre"],
    levels: [1, 2, 3],
  },

  {
    id: "entier_calcul_mental",
    label: "Calcul mental",
    boId: "BO6N4",
    prerequis: [],
    levels: [1, 2, 3],
  },

  {
    id: "aire_longueur",
    label: "Longueurs",
    boId: "BO6G1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "aire_perimetre",
    label: "Périmètres",
    boId: "BO6G1",
    prerequis: ["aire_longueur"],
    levels: [1, 2],
  },

  {
    id: "aire_surface",
    label: "Aires",
    boId: "BO6G1",
    prerequis: ["aire_perimetre"],
    levels: [1, 2],
  },

  // ⛔ OUVERTE LE 21/08/2026 — ELLE MANQUAIT ENTIÈREMENT. Le BO de 6e demande
  // de savoir que le périmètre du disque est proportionnel à son diamètre, d'en
  // connaître la formule et de le calculer. Le coach n'avait aucune micro
  // cercle, disque, rayon ou diamètre — ni en 6e, ni dans AUCUNE classe de
  // maths. Les vérificateurs comptent les items d'une micro ; aucun ne demande
  // si une micro manque, et un chapitre entier restait donc invisible.
  {
    id: "cercle_disque",
    label: "Le cercle et le périmètre du disque",
    boId: "BO6G1",
    prerequis: ["aire_perimetre"],
    levels: [1, 2],
  },

  {
    id: "volume_solide",
    label: "Volumes",
    boId: "BO6G1",
    prerequis: ["aire_surface"],
    levels: [1, 2],
  },

  {
    id: "angle_mesure",
    label: "Angles",
    boId: "BO6G2",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "triangle_figure",
    label: "Triangles : reconnaître et nommer",
    boId: "BO6G3",
    prerequis: ["angle_mesure"],
    levels: [1, 2, 3],
  },

  // ⛔ COUPÉE EN DEUX LE 21/08/2026. « Triangles » portait huit micros et deux
  // gestes qui n'ont rien à voir : RECONNAÎTRE une figure (la nommer, lire ses
  // sommets, dire son type d'après ses côtés ou ses angles — ça se joue sur un
  // dessin, et c'est le canvas `triangle` qui le montre) et RAISONNER sur ses
  // mesures (la somme des angles vaut 180°, un angle manquant se calcule, trois
  // longueurs ne font pas toujours un triangle). Un élève qui ne reconnaît pas
  // un triangle isocèle n'a pas le même problème que celui qui rate 180 − 40 − 60.
  {
    id: "triangle_propriete",
    label: "Triangles : angles et constructibilité",
    boId: "BO6G3",
    prerequis: ["triangle_figure"],
    levels: [1, 2, 3],
  },

  {
    id: "quadrilatere_figure",
    label: "Quadrilatères : reconnaître et nommer",
    boId: "BO6G4",
    prerequis: ["angle_mesure"],
    levels: [1, 2, 3],
  },

  // ⛔ COUPÉE EN DEUX LE 21/08/2026. « Quadrilatères » portait huit micros,
  // dont CINQ qui tournaient autour du même geste (identifier la nature, lire
  // les propriétés, faire le lien propriétés ↔ nature, distinguer, conclure).
  // Frédéric a tranché : couper plutôt que fusionner — parce que ce sont bien
  // deux moments du cours. D'abord RECONNAÎTRE sur un dessin (le canvas
  // `quadrilatere` code les côtés égaux, les angles droits, les parallèles),
  // ensuite RAISONNER à partir des propriétés, sans dessin : « 4 côtés égaux et
  // aucun angle droit, donc losange », « un carré est-il un rectangle ? ».
  {
    id: "quadrilatere_propriete",
    label: "Quadrilatères : propriétés et construction",
    boId: "BO6G4",
    prerequis: ["quadrilatere_figure"],
    levels: [1, 2, 3],
  },

  {
    id: "sym_axiale",
    label: "Symétrie axiale",
    boId: "BO6G4",
    prerequis: ["angle_mesure"],
    levels: [1, 2],
  },

  {
    id: "stat_donnee",
    label: "Données",
    boId: "BO6D1",
    prerequis: [],
    levels: [1, 2],
  },

  {
    id: "proba_experience",
    label: "Probabilités",
    boId: "BO6P1",
    prerequis: ["stat_donnee"],
    levels: [1, 2],
  },

];