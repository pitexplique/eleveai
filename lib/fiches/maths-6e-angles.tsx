// ─── Fiche de cours : les angles (6e) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/angles.bank.ts, notionId angle_mesure — lecture seule).
// Réécrite le 30/09/2026 au standard des fiches de 6e (étalon :
// `maths-6e-bissectrice-angle.tsx`) : phrases courtes, un dessin par bloc,
// Ti Margo dans le mode classe.
//
// Micro-compétences 6/6 → blocs :
//   angle_reconnaitre → définition + figure, propriété 3 (l'angle plat),
//                       méthode 1 (repérer), exemple 1 (l'angle AOB), exercice 1
//   angle_droit       → propriété 1 (le coin du carré), formule, usage 3
//                       (l'équerre), exemple 2, exercice 4
//   angle_comparer    → propriétés 2 et 4, usages 1 (les côtés longs) et 2
//                       (donner un nom), exemple 2 (118°), exercice 2
//   angle_mesurer     → propriété 4 (le degré), méthode 2 (lire le rapporteur),
//                       exercice 5
//   angle_tracer      → méthode 3 (marquer 40°), exercice 3
//   angle_defi        → exemple 3 (l'angle plat partagé : 110° et 70°),
//                       exercice 4
//
// ⭐ LES NOMBRES SONT CEUX DE LA BANQUE : 30° et 80° ; 120° et 70° ; 60°, 100°
// à nommer ; tracer 40° ; un angle plat partagé, l'un mesure 110°. 118° et 55°
// sont les exemples de la fiche de juin : la feuille d'exercices
// (`lib/fiches-exercices/maths-6e-angle-mesure.tsx`) les a évités exprès, on
// les garde donc ici. ⛔ Aucun exemple de la feuille (57°, 37°, 104°, horloge,
// ciseaux, tarte, éventail…).
//
// ⭐ UN DESSIN PAR BLOC, JAMAIS DEUX FOIS LE MÊME, ET JUSTE : les angles sont des
// SVG locaux (`schemas-angles-6e.tsx`), placés par leur mesure en degrés — un
// arc marqué 40° ouvre vraiment 40°. ⛔ `AngleCanvas` n'est plus employé : il
// est en cours de modification (consigne du 30/09). Les canvas du coach gardent
// ce qu'ils montrent mieux : le carré et ses coins (`quadrilatere`), les deux
// demi-droites avant l'angle (`droites`), la droite des degrés (`number_line`),
// le tableau des noms (`tableau_donnees`).
// ⛔ Plus de dessins EMPILÉS : la pile « aigu / obtus » de juin débordait de
// 58 px en mode classe. Un seul dessin montre les deux, contre l'angle droit.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import {
  BLEU,
  Dessin,
  GRIS,
  NOIR,
  ORANGE,
  ROUGE,
  VIOLET,
  legende,
  polaire,
  type Pt,
} from "@/lib/fiches/schemas-angles-6e";

const O: Pt = { x: 0, y: 0 };
const GRIS_FONCE = "#64748b";

// ─── LA FIGURE DE LA DÉFINITION : un sommet, deux côtés ───────────────────────
const figureDefinition = (
  <Dessin
    titre="Un angle : son sommet et ses deux côtés"
    traits={[
      { de: O, a: polaire(0, 170) },
      { de: O, a: polaire(55, 170) },
    ]}
    arcs={[{ o: O, de: 0, a: 55, r: 40, couleur: ORANGE }]}
    points={[O]}
    textes={[
      { p: { x: 0, y: 20 }, texte: "sommet", couleur: ROUGE },
      { p: { x: 115, y: 16 }, texte: "côté", couleur: BLEU },
      { p: polaire(68, 120), texte: "côté", couleur: BLEU },
    ]}
  />
);

// ─── L'ANGLE DROIT EST UN COIN : les 4 coins d'un carré ───────────────────────
const carreCoins = legende(
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 200, height: 180 },
      points: {
        A: { x: 45, y: 35 },
        B: { x: 155, y: 35 },
        C: { x: 155, y: 145 },
        D: { x: 45, y: 145 },
      },
      display: { showPoints: false, showLabels: false, showSides: false, showAngles: false },
      marks: { rightAnglesAt: ["A", "B", "C", "D"] },
    }}
  />,
  "Les 4 coins d'un carré : 90° chacun."
);

// ─── AIGU OU OBTUS : les deux, contre l'angle droit en pointillés ─────────────
// Un seul dessin (et non deux empilés) : le côté commun, l'angle droit gris
// au milieu, l'aigu (50°) à droite de lui, l'obtus (130°) à gauche.
const aiguObtus = (
  <Dessin
    titre="Un angle aigu et un angle obtus, comparés à l'angle droit"
    traits={[
      { de: O, a: polaire(0, 130) },
      { de: O, a: polaire(90, 110), couleur: GRIS, pointille: true },
      { de: O, a: polaire(50, 130), couleur: BLEU },
      { de: O, a: polaire(130, 130), couleur: ROUGE },
    ]}
    arcs={[
      { o: O, de: 0, a: 50, r: 30, couleur: BLEU },
      { o: O, de: 0, a: 130, r: 52, couleur: ROUGE },
    ]}
    points={[O]}
    textes={[
      { p: polaire(50, 150), texte: "aigu", couleur: BLEU },
      { p: polaire(90, 128), texte: "droit", couleur: GRIS_FONCE },
      { p: polaire(130, 152), texte: "obtus", couleur: ROUGE },
    ]}
  />
);

// ─── L'ANGLE PLAT : les deux côtés font une ligne droite ──────────────────────
const anglePlat = (
  <Dessin
    titre="L'angle plat : 180°"
    traits={[{ de: polaire(180, 120), a: polaire(0, 120) }]}
    arcs={[{ o: O, de: 0, a: 180, r: 34, couleur: ORANGE, texte: "180°", rTexte: 60 }]}
    points={[O]}
    textes={[{ p: { x: 0, y: 20 }, texte: "sommet", couleur: ROUGE }]}
  />
);

// ─── LE DEGRÉ : comparer deux angles, c'est comparer deux nombres ─────────────
const echelleDesDegres = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 180,
      step: 30,
      points: [
        { value: 30, label: "30°", color: BLEU },
        { value: 80, label: "80°", color: ROUGE },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      // ⚠️ MESURÉ : à 360 de viewBox, le texte tombait à 8,8 px dans une carte
      // de 250 px ; à 280 (juin), encore 10,0 px sur les 200 px de SVG d'un
      // téléphone (30/09). Serré à 250 : 11,2 px.
      size: { width: 250, height: 90 },
    }}
  />
);

// ─── LA FORMULE : un angle plat, c'est deux angles droits ─────────────────────
const deuxDroits = (
  <Dessin
    titre="Un angle plat partagé en deux angles droits"
    traits={[
      { de: polaire(180, 120), a: polaire(0, 120) },
      { de: O, a: polaire(90, 100), couleur: BLEU },
    ]}
    coins={[
      { o: O, dir: 0, c: 16 },
      { o: O, dir: 90, c: 16 },
    ]}
    points={[O]}
    textes={[
      { p: polaire(40, 58), texte: "90°", couleur: ROUGE },
      { p: polaire(140, 58), texte: "90°", couleur: ROUGE },
    ]}
  />
);

// ─── REPÉRER : deux demi-droites et leur point commun ─────────────────────────
// Pas d'arc, pas de mesure : l'angle n'est pas encore nommé.
const deuxDemiDroites = (
  <CanvasRenderer
    figure={{
      kind: "droites",
      size: { width: 260, height: 170 },
      lines: [
        {
          id: "d1",
          type: "demi_droite",
          from: { x: 45, y: 130 },
          to: { x: 235, y: 130 },
          color: BLEU,
          display: { showArrows: true, showLabel: false },
        },
        {
          id: "d2",
          type: "demi_droite",
          from: { x: 45, y: 130 },
          to: { x: 190, y: 30 },
          color: BLEU,
          display: { showArrows: true, showLabel: false },
        },
      ],
      points: [{ x: 45, y: 130, label: "le sommet", color: ROUGE, highlight: true }],
    }}
  />
);

/** Le rapporteur : un demi-disque gradué de 10 en 10, centre en O. */
const R = 100;
const graduations = Array.from({ length: 19 }, (_, i) => ({
  de: polaire(i * 10, i % 9 === 0 ? R - 14 : R - 8),
  a: polaire(i * 10, R),
  couleur: GRIS,
  epaisseur: 1.5,
}));
const bordRapporteur = { de: polaire(180, R), a: polaire(0, R), couleur: GRIS, epaisseur: 2 };

// ─── MESURER : on lit 55 sur l'autre côté ─────────────────────────────────────
const rapporteurLecture = (
  <Dessin
    titre="Lire la mesure d'un angle au rapporteur"
    traits={[
      bordRapporteur,
      ...graduations,
      { de: O, a: polaire(0, 150) },
      { de: O, a: polaire(55, 150) },
    ]}
    arcs={[
      { o: O, de: 0, a: 180, r: R, couleur: GRIS },
      { o: O, de: 0, a: 55, r: 30, couleur: ORANGE },
    ]}
    points={[O]}
    textes={[
      { p: { x: 0, y: 16 }, texte: "O" },
      { p: polaire(10, 78), texte: "0", couleur: GRIS_FONCE },
      { p: polaire(64, 118), texte: "55°", couleur: ROUGE },
    ]}
  />
);

// ─── TRACER : on marque 40, puis on trace depuis le sommet ────────────────────
const rapporteurTrace = (
  <Dessin
    titre="Tracer un angle de 40° au rapporteur"
    traits={[
      bordRapporteur,
      ...graduations,
      { de: O, a: polaire(0, 150) },
      { de: O, a: polaire(40, 165), couleur: BLEU, pointille: true, fleche: true },
    ]}
    arcs={[{ o: O, de: 0, a: 180, r: R, couleur: GRIS }]}
    points={[O, polaire(40, R)]}
    textes={[
      { p: { x: 0, y: 16 }, texte: "O" },
      { p: polaire(10, 78), texte: "0", couleur: GRIS_FONCE },
      { p: polaire(49, 116), texte: "40", couleur: ROUGE },
    ]}
  />
);

// ─── LES CÔTÉS LONGS NE FONT PAS UN GRAND ANGLE : 70° contre 120° ─────────────
const P: Pt = { x: 185, y: 0 };
const longueurTrompe = (
  <Dessin
    titre="Un angle de 70° aux côtés longs, un angle de 120° aux côtés courts"
    traits={[
      { de: O, a: polaire(0, 140) },
      { de: O, a: polaire(70, 140) },
      { de: P, a: polaire(0, 60, P) },
      { de: P, a: polaire(120, 60, P) },
    ]}
    arcs={[
      { o: O, de: 0, a: 70, r: 30, couleur: BLEU, texte: "70°", rTexte: 58 },
      { o: P, de: 0, a: 120, r: 22, couleur: ROUGE, texte: "120°", rTexte: 46 },
    ]}
    points={[O, P]}
  />
);

// ─── DONNER UN NOM : la mesure dit le nom ─────────────────────────────────────
const tableauDesNoms = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["La mesure", "Le nom"],
      rows: [
        { values: ["60°", "aigu"] },
        { values: ["90°", "droit"] },
        { values: ["100°", "obtus"] },
        { values: ["180°", "plat"] },
      ],
      highlight: { col: 1 },
      display: { compact: true, striped: true },
    }}
  />
);

// ─── L'ÉQUERRE SUR LE COIN : l'angle droit se vérifie ─────────────────────────
const equerre = (
  <Dessin
    titre="L'équerre posée sur un angle droit"
    polygones={[
      {
        pts: [O, { x: 150, y: 0 }, { x: 0, y: -100 }],
        fond: "#dbeafe",
        couleur: BLEU,
      },
    ]}
    traits={[
      { de: O, a: polaire(0, 160) },
      { de: O, a: polaire(90, 120) },
    ]}
    coins={[{ o: O, dir: 0, c: 16 }]}
    points={[O]}
    // Le mot dans l'équerre, loin du petit carré (au rendu, il le touchait).
    textes={[{ p: { x: 62, y: -28 }, texte: "équerre", couleur: BLEU, taille: 14 }]}
  />
);

// ─── EXEMPLE 1 : l'angle AOB, sans mesure ─────────────────────────────────────
const angleAOB = (
  <Dessin
    titre="L'angle AOB"
    traits={[
      { de: O, a: polaire(0, 160) },
      { de: O, a: polaire(65, 160) },
    ]}
    arcs={[{ o: O, de: 0, a: 65, r: 36, couleur: ORANGE }]}
    points={[O, polaire(0, 160), polaire(65, 160)]}
    textes={[
      { p: { x: -12, y: 14 }, texte: "O", couleur: ROUGE },
      { p: polaire(-6, 170), texte: "B" },
      { p: polaire(72, 170), texte: "A" },
    ]}
  />
);

// ─── EXEMPLE 2 : 118°, contre l'angle droit ───────────────────────────────────
const angle118 = (
  <Dessin
    titre="Un angle de 118° et l'angle droit en pointillés"
    traits={[
      { de: O, a: polaire(0, 140) },
      { de: O, a: polaire(118, 140) },
      { de: O, a: polaire(90, 110), couleur: GRIS, pointille: true },
    ]}
    arcs={[{ o: O, de: 0, a: 118, r: 40, couleur: VIOLET, texte: "118°", rTexte: 70 }]}
    points={[O]}
    textes={[{ p: polaire(90, 128), texte: "90°", couleur: GRIS_FONCE }]}
  />
);

// ─── EXEMPLE 3 : l'angle plat partagé, 110° et ? ──────────────────────────────
const platPartage = (
  <Dessin
    titre="Un angle plat partagé en 110° et un angle à trouver"
    traits={[
      { de: polaire(180, 130), a: polaire(0, 130) },
      { de: O, a: polaire(110, 120), couleur: BLEU },
    ]}
    arcs={[
      { o: O, de: 0, a: 110, r: 36, couleur: ORANGE, texte: "110°", rTexte: 66 },
      { o: O, de: 110, a: 180, r: 50, couleur: ROUGE, texte: "?", rTexte: 76 },
    ]}
    points={[O]}
  />
);

const pieges = [
  "Lire la mauvaise rangée de nombres. On part du 0 posé sur un côté.",
  "Croire que des côtés longs font un grand angle. Seule l'ouverture compte.",
  "Poser le centre du rapporteur à côté du sommet. Il va pile sur le sommet.",
];

const aRetenir = [
  "Un angle : deux demi-droites qui partent du même point, le sommet.",
  "Droit : 90°. Plat : 180°. Aigu : moins de 90°. Obtus : entre 90° et 180°.",
  "On mesure et on trace un angle au rapporteur, en degrés.",
];

export const ficheAngles6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "angle-mesure",
  titre: "Les angles",
  accroche:
    "Ouvre un livre : ses deux couvertures forment un angle. Plus tu l'ouvres, plus l'angle est grand.",
  identite: [
    { label: "Le mot clé", valeur: "Un sommet et deux côtés" },
    { label: "Le secret", valeur: "C'est l'ouverture qui compte, pas la longueur des côtés" },
    { label: "L'outil", valeur: "Le rapporteur, gradué en degrés (°)" },
  ],
  definition: {
    texte:
      "Un angle est formé par deux demi-droites qui partent du même point. Ce point s'appelle le sommet. Les deux demi-droites sont les côtés de l'angle.",
  },
  figure: {
    schema: figureDefinition,
    legende: "Le sommet est le point de départ des deux côtés.",
  },
  proprietes: [
    {
      titre: "L'angle droit",
      micros: ["angle_droit"],
      texte: "Un angle droit mesure 90°. C'est le coin d'un carré.",
      schema: carreCoins,
    },
    {
      titre: "Aigu ou obtus",
      micros: ["angle_comparer"],
      texte:
        "Un angle aigu est plus petit qu'un angle droit. Un angle obtus est plus grand, mais moins que 180°.",
      schema: legende(aiguObtus, "On compare toujours à l'angle droit."),
    },
    {
      titre: "L'angle plat",
      micros: ["angle_reconnaitre"],
      texte: "Un angle plat mesure 180°. Ses deux côtés forment une ligne droite.",
      schema: anglePlat,
    },
    {
      titre: "Le degré",
      micros: ["angle_mesurer", "angle_comparer"],
      texte: "On mesure un angle en degrés. 80° est plus grand que 30°, car 80 est plus grand que 30.",
      schema: echelleDesDegres,
    },
  ],
  reel: {
    texte:
      "Une porte s'ouvre plus ou moins grand. Une rampe de skate est plus ou moins pentue. Le coin d'une page fait un angle droit. Pour dire de combien, on donne un nombre de degrés.",
  },
  historique: {
    texte:
      "Il y a environ 4 000 ans, les Babyloniens partagent le tour complet en 360 parts. Une part, c'est un degré. Ils comptaient par paquets de 60. C'est aussi pour cela qu'une heure a 60 minutes.",
  },
  formule: {
    contexte: "Les deux angles repères",
    expression: "angle droit = 90° et angle plat = 180°",
    legende: "Un angle plat, c'est deux angles droits côte à côte.",
    schema: deuxDroits,
  },
  methode: [
    {
      titre: "Repérer",
      micros: ["angle_reconnaitre"],
      texte: "On cherche le point de départ des deux demi-droites : c'est le sommet. Puis on compare l'angle à un angle droit.",
      schema: legende(deuxDemiDroites, "Deux demi-droites, un point commun."),
    },
    {
      titre: "Mesurer",
      micros: ["angle_mesurer"],
      texte: "Le centre du rapporteur va sur le sommet, le 0 sur un côté. On lit le nombre sur l'autre côté.",
      schema: legende(rapporteurLecture, "L'autre côté passe par 55 : l'angle mesure 55°."),
    },
    {
      titre: "Tracer",
      micros: ["angle_tracer"],
      texte: "On trace un premier côté, puis on marque un point à 40° au rapporteur. On relie le sommet à ce point.",
      schema: legende(rapporteurTrace, "Le 2e côté part de O et passe par le point."),
    },
  ],
  usages: [
    {
      titre: "Le plus grand angle",
      micros: ["angle_comparer"],
      detail: "On compare les mesures, pas les côtés. 120° est plus grand que 70°.",
      schema: legende(longueurTrompe, "Côtés courts, mais 120° : c'est le plus grand."),
    },
    {
      titre: "Donner un nom",
      micros: ["angle_comparer", "angle_droit"],
      detail: "La mesure donne le nom. 60° est aigu, 100° est obtus.",
      schema: tableauDesNoms,
    },
    {
      titre: "Vérifier un angle droit",
      micros: ["angle_droit"],
      detail: "On pose le coin de l'équerre sur le sommet. Si les deux côtés collent à l'équerre, l'angle est droit.",
      schema: equerre,
    },
  ],
  exemples: [
    {
      titre: "Reconnaître un angle",
      micros: ["angle_reconnaitre"],
      donnees: "[OA) et [OB) partent du même point O.",
      question: "Que forment-elles ? Comment s'appelle O ?",
      schema: angleAOB,
      solution: "Elles forment l'angle AOB. O est son sommet : il s'écrit au milieu du nom.",
    },
    {
      titre: "Comparer à l'angle droit",
      micros: ["angle_droit", "angle_comparer"],
      donnees: "Un angle mesure 118°.",
      question: "Est-il aigu, droit ou obtus ?",
      schema: angle118,
      solution:
        "Un angle droit mesure 90°. 118 est plus grand que 90. 118 est plus petit que 180. L'angle est obtus.",
    },
    {
      titre: "L'angle plat partagé",
      micros: ["angle_defi"],
      donnees: "Deux angles côte à côte forment un angle plat. L'un mesure 110°.",
      question: "Combien mesure l'autre ?",
      schema: platPartage,
      solution: "Un angle plat mesure 180°. Il reste 180 − 110 = 70. L'autre angle mesure 70°.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un angle est formé par combien de demi-droites ? Comment s'appelle leur point commun ?",
      correction: "Par deux demi-droites. Leur point commun est le sommet.",
      micros: ["angle_reconnaitre"],
    },
    {
      question: "Quel angle est le plus grand : 35° ou 80° ?",
      correction: "80°, car 80 est plus grand que 35. La longueur des côtés ne compte pas.",
      micros: ["angle_comparer"],
    },
    {
      question: "Pour tracer un angle de 40°, quel instrument prends-tu ? Par quoi commences-tu ?",
      correction:
        "Le rapporteur. On place d'abord le sommet et un premier côté. Puis on marque 40° et on trace le 2e côté.",
      micros: ["angle_tracer"],
    },
    {
      question: "Un angle de 120° est-il plus petit ou plus grand qu'un angle droit ?",
      correction: "Plus grand : 120 est plus grand que 90. C'est un angle obtus.",
      micros: ["angle_droit", "angle_defi"],
    },
    {
      question: "En quelle unité mesure-t-on un angle ?",
      correction: "En degrés. On écrit le petit rond : 90°.",
      micros: ["angle_mesurer"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "Un angle, c'est une ouverture !",
    definition: "Trouve d'abord le sommet !",
    methode: "Centre sur le sommet, zéro sur un côté !",
    pieges: "Des côtés longs ne font pas un grand angle !",
    retenir: "90° : droit. 180° : plat.",
    exercice: "Compare avec l'angle droit !",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
// ⛔ Aucun LaTeX ici non plus.
export const slidesAngles6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les angles - 6e",
    teinte: "objectif",
    schema: figureDefinition,
    section: {
      type: "objectif",
      phrase: "Reconnaître, mesurer et tracer un angle",
      sousPhrase: "Un angle : deux demi-droites qui partent du sommet.",
    },
  },
  {
    titre: "La famille des angles",
    badge: "4 repères",
    teinte: "propriete",
    schema: aiguObtus,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Aigu", texte: "Moins de 90°." },
        { titre: "Droit", texte: "Exactement 90°." },
        { titre: "Obtus", texte: "Entre 90° et 180°." },
        { titre: "Plat", texte: "Exactement 180°." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: angle118,
    section: {
      type: "exercice",
      enonce: "Un angle mesure 118°.",
      question: "Est-il aigu, droit ou obtus ?",
      indice: "Un angle droit mesure 90°.",
      correction: "118 est entre 90 et 180 : l'angle est obtus.",
    },
  },
];
