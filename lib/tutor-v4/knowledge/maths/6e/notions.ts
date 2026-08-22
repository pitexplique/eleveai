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

  // ⛔ OUVERTE LE 22/08/2026 — LES OPÉRATIONS SUR LES FRACTIONS MANQUAIENT.
  // Le programme de 6e (« Effectuer des opérations sur les fractions ») demande
  // d'additionner et soustraire des fractions — même dénominateur, dénominateurs
  // multiples l'un de l'autre, puis des cas simples quelconques comme 5/4 + 2/3
  // — et de multiplier une fraction par un entier. `fraction_nombre` s'arrêtait
  // à lire, représenter et comparer : l'élève de 6e ne rencontrait AUCUN calcul
  // sur les fractions dans le coach.
  //
  // Même découpage que `decimal_nombre` / `decimal_calcul`, et que la 5e.
  {
    id: "fraction_calcul",
    label: "Calculer avec les fractions",
    boId: "BO6N2",
    prerequis: ["fraction_nombre"],
    levels: [1, 2, 3],
  },

  // ⛔ OUVERTE LE 22/08/2026. « Algèbre » est une section du domaine « Nombres,
  // calcul et résolution de problèmes » du programme de 6e, et le coach n'en
  // avait aucune micro — alors que c'est le chapitre qui prépare tout le calcul
  // littéral de 5e.
  //
  // ⭐ « Pré-algébrique » veut dire SANS LETTRE : on ne pose pas d'équation, on
  // DESSINE la relation (schéma en barres). Le raisonnement est le même ; la
  // lettre arrive en 5e, et elle arrive plus facilement quand le dessin a été
  // fait avant.
  {
    id: "algebre_probleme",
    label: "Problèmes à nombres inconnus et motifs",
    boId: "BO6N5",
    prerequis: ["entier_calcul_mental"],
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

  // ─── ÉTUDE DE CONFIGURATIONS PLANES ────────────────────────────────────────
  // Les cinq notions qui suivent ont été ouvertes les 21 et 22/08/2026, et
  // elles s'enchaînent dans l'ordre du programme : les distances, puis la
  // médiatrice qui en découle, puis le cercle circonscrit qui découle de la
  // médiatrice. Aucune n'existait dans le coach.

  // ⛔ « Distances » ouvre le chapitre — avant les cercles, avant la médiatrice,
  // avant les angles. C'est la PREMIÈRE notion de géométrie de l'année.
  //
  // ⭐ Ce qui s'y joue et nulle part ailleurs : la différence entre (AB), [AB]
  // et AB — une droite, un segment, un NOMBRE. Un élève qui écrit
  // « [AB] = 5 cm » confond l'objet et sa mesure, et il l'écrira encore en 3e
  // si personne ne le reprend ici.
  {
    id: "distance_segment",
    label: "Distances et milieu d’un segment",
    boId: "BO6G4",
    prerequis: ["aire_longueur"],
    levels: [1, 2],
  },

  // ⛔ Trois objectifs d'apprentissage, zéro micro — alors que c'est la notion
  // qui tient toute la géométrie de l'année : la symétrie axiale se DÉFINIT par
  // elle (« (d) est la médiatrice de [MM'] »), le cercle circonscrit en
  // découle, et la construction du milieu au compas n'est rien d'autre qu'elle.
  //
  // ⭐ « Propriété caractéristique » veut dire DEUX SENS, et c'est tout l'enjeu.
  // L'élève retient « sur la médiatrice → équidistant » et oublie l'autre —
  // « équidistant → sur la médiatrice » —, qui est pourtant celui qui sert à
  // DÉMONTRER (retrouver le centre d'un cercle, prouver qu'un point y est).
  {
    id: "mediatrice_segment",
    label: "La médiatrice d’un segment",
    boId: "BO6G4",
    prerequis: ["distance_segment"],
    levels: [1, 2],
  },

  // ⛔ Une section entière du chapitre, et zéro micro — alors que le canvas
  // `angle` savait déjà poser un rapporteur sur la figure.
  //
  // ⭐ La bissectrice est à l'ANGLE ce que la médiatrice est au SEGMENT : la
  // droite qui le coupe en deux parts égales, et son axe de symétrie. Les deux
  // se plient de la même façon. Plusieurs items le disent explicitement — un
  // élève qui voit le parallèle retient les deux au lieu d'une.
  {
    id: "bissectrice_angle",
    label: "La bissectrice d’un angle",
    boId: "BO6G2",
    prerequis: ["angle_mesure"],
    levels: [1, 2],
  },

  // ⛔ Le programme demande, sous « Triangles » : « savoir que les médiatrices
  // d'un triangle sont concourantes » et « connaître et construire le cercle
  // circonscrit à un triangle ».
  //
  // ⭐ C'EST LA PREMIÈRE PREUVE DE L'ANNÉE, et le BO le dit : l'élève doit
  // « comprendre POURQUOI » et « restituer les arguments de la preuve ». Ce
  // n'est donc pas un résultat à admettre. La preuve ne tient que par la
  // propriété caractéristique de la médiatrice, utilisée dans les DEUX sens —
  // d'où la dépendance directe à `mediatrice_segment`.
  {
    id: "cercle_circonscrit",
    label: "Médiatrices d'un triangle et cercle circonscrit",
    boId: "BO6G3",
    prerequis: ["mediatrice_segment", "triangle_figure"],
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

  // ⛔ OUVERTE LE 22/08/2026 — UN CHAPITRE ENTIER MANQUAIT. « Le repérage dans
  // le temps et les durées » porte trois objectifs d'apprentissage du programme
  // de 6e (calculer sur des horaires et des durées, résoudre des problèmes,
  // convertir des durées) et le coach n'en avait AUCUNE micro. Le canvas `duree`
  // existait pourtant depuis des mois — horloge, double horloge, affichage
  // digital, frise : le dessin était prêt, les questions n'avaient jamais été
  // écrites.
  //
  // ⭐ La difficulté du chapitre tient en une ligne : le temps ne se compte pas
  // en base dix. 8 h 50 + 20 min ne fait pas 8 h 70, et 1,30 h ne vaut pas
  // 1 h 30. D'où la micro `duree_decimale`, qui n'existe nulle part ailleurs.
  {
    id: "duree_temps",
    label: "Le repérage dans le temps et les durées",
    boId: "BO6G1",
    prerequis: ["decimal_nombre"],
    levels: [1, 2],
  },

  // ⛔ OUVERTE LE 22/08/2026. « La vision dans l'espace » est l'un des DEUX
  // chapitres du domaine « Espace et géométrie » du programme de 6e — l'autre
  // étant l'étude de configurations planes. Le coach n'en avait aucune micro,
  // alors que le canvas `solide_3d` savait déjà dessiner un assemblage cube par
  // cube.
  //
  // ⭐ Ce qui s'y joue : LES CUBES QU'ON NE VOIT PAS. Un empilement dessiné en
  // perspective en cache derrière et dessous ; l'élève qui compte les faces
  // visibles se trompe toujours. La parade — compter par étages — est le cœur
  // de `vision_denombrer`.
  {
    id: "vision_espace",
    label: "La vision dans l'espace",
    boId: "BO6G5",
    prerequis: ["volume_solide"],
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