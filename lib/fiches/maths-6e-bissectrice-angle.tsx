// ─── Fiche de cours : la bissectrice d'un angle (6e) ──────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/bissectrice.bank.ts, notionId bissectrice_angle).
//
// Micro-compétences 4/4 → blocs :
//   bissectrice_definition → définition + figure, propriétés 1 et 2 (axe de
//                            symétrie, angle saillant), exercices 1 et 6
//   bissectrice_construire → méthode (plier, diviser par 2, marquer et tracer),
//                            exemple 1 (le 45° de Léo), exercice 2
//   bissectrice_probleme   → propriété 3 (la moitié ou le double), usages 1-3
//                            (angle droit, une part connue, angle plat),
//                            exemple 2 (le panneau danger), exercice 3
//   bissectrice_defi       → exemple 3 (un coin plié deux fois), exercices 4
//                            (bissectrices successives) et 5 (unicité)
//
// ⭐ LES NOMBRES SONT CEUX DE LA BANQUE : 80 → 40 ; 110 → 55 (et le piège du
// 45° qui laisse 65°) ; AOC = 37 → AOB = 74 ; angle droit → 45 ; angle plat →
// 90 ; triangle équilatéral → 30 ; 90 → 45 → 22,5 ; 130 → 65 et 120 → 60 → 30
// sortent des générateurs.
//
// ⭐ LA DÉFINITION EST CELLE DU PROGRAMME, MOT POUR MOT OU PRESQUE : « la droite
// qui partage cet angle en deux angles adjacents égaux » (Exemples pour la mise
// en œuvre, 6e, 2025). Les figures tracent [OC), la demi-droite, comme la banque.
//
// ⭐ UN DESSIN PAR BLOC, ET JAMAIS DEUX FOIS LE MÊME. Les angles sont des SVG
// locaux (`schemas-angles-6e.tsx`) : ⛔ pas `AngleCanvas`, en cours de
// modification, et qui ne sait de toute façon ni poser une bissectrice ni coder
// deux angles égaux. Les canvas du coach gardent ce qu'ils montrent mieux :
// `schema_barre` (le tout et ses deux moitiés), `calcul_pose` (110 ÷ 2).
// (`droites` a été essayé sur l'angle plat et retiré : voir `anglePlat`.)
// Chaque figure est JUSTE : un arc marqué 40° ouvre vraiment 40°.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";
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
/** Le nom d'un sommet, un peu en dehors de la figure. */
const nom = (texte: string, p: Pt, couleur = NOIR) => ({ p, texte, couleur });
/** Le « O » du sommet, sous-le-côté-gauche. */
const nomO = nom("O", polaire(225, 20));

// ─── LA FIGURE DE LA DÉFINITION : 80° = 40° + 40° ─────────────────────────────
// Les deux arcs portent le même petit trait : c'est le codage de deux angles
// égaux, celui que l'élève retrouvera au tableau.
const figureDefinition = (
  <Dessin
    titre="L'angle AOB de 80° et sa bissectrice [OC)"
    traits={[
      { de: O, a: polaire(0, 170) },
      { de: O, a: polaire(80, 170) },
      { de: O, a: polaire(40, 170), couleur: BLEU, pointille: true },
    ]}
    arcs={[
      { o: O, de: 0, a: 40, r: 48, couleur: ORANGE, texte: "40°", rTexte: 82, code: true },
      { o: O, de: 40, a: 80, r: 48, couleur: ORANGE, texte: "40°", rTexte: 82, code: true },
    ]}
    points={[O, polaire(0, 170), polaire(80, 170), polaire(40, 170)]}
    textes={[
      nomO,
      nom("A", polaire(86, 176)),
      nom("B", polaire(-6, 176)),
      nom("C", polaire(44, 186), BLEU),
    ]}
  />
);

// ─── L'AXE DE SYMÉTRIE : M et M' à la même distance de O ──────────────────────
// Le segment [MM'] coupe la bissectrice à angle droit, en son milieu H : le pli
// amène M sur M'. Les deux moitiés de [MM'] sont codées égales.
const symetrie = (() => {
  const M = polaire(70, 120);
  const Mp = polaire(0, 120);
  const H = { x: (M.x + Mp.x) / 2, y: (M.y + Mp.y) / 2 };
  const milieu = (p: Pt, q: Pt) => ({ x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 });
  const trait = (c: Pt) => ({
    de: { x: c.x - polaire(35, 7).x, y: c.y - polaire(35, 7).y },
    a: { x: c.x + polaire(35, 7).x, y: c.y + polaire(35, 7).y },
    couleur: "#16a34a",
  });
  return (
    <Dessin
      titre="La bissectrice, axe de symétrie de l'angle"
      traits={[
        { de: O, a: polaire(0, 165) },
        { de: O, a: polaire(70, 165) },
        { de: O, a: polaire(35, 175), couleur: BLEU, pointille: true },
        { de: M, a: Mp, couleur: VIOLET, epaisseur: 2.5 },
        trait(milieu(M, H)),
        trait(milieu(H, Mp)),
      ]}
      coins={[{ o: H, dir: -55, c: 11, couleur: ROUGE }]}
      points={[O, M, Mp]}
      textes={[nomO, nom("M", { x: M.x - 16, y: M.y - 4 }), nom("M'", { x: Mp.x + 4, y: Mp.y + 16 })]}
    />
  );
})();

// ─── SAILLANT ET RENTRANT ─────────────────────────────────────────────────────
// Deux demi-droites, DEUX angles. Le petit est colorié : c'est lui qu'on partage.
const saillant = (
  <Dessin
    titre="L'angle saillant et l'angle rentrant"
    traits={[
      { de: O, a: polaire(0, 130) },
      { de: O, a: polaire(120, 130) },
    ]}
    arcs={[
      { o: O, de: 0, a: 120, r: 52, couleur: ORANGE, plein: "#fef3c7", texte: "saillant", rTexte: 88 },
      { o: O, de: 120, a: 360, r: 36, couleur: GRIS, plein: "#e2e8f0", texte: "rentrant", rTexte: 68 },
    ]}
    points={[O]}
  />
);

// ─── LA MOITIÉ OU LE DOUBLE : 74° = 37° + 37° ─────────────────────────────────
// Deux parts de même longueur sous le même tout. Les nombres de la banque.
const barreMoitie = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: 230, height: 170 },
      total: "74°",
      parts: [
        { label: "", value: "37°", color: "#fef3c7" },
        { label: "", value: "37°", color: "#fef3c7" },
      ],
      questionLabel: "une part = la moitié",
      display: { showTotal: true, showPartLabels: false, showValues: true, showQuestion: true },
    }}
  />
);

// ─── PLIER : un côté vient sur l'autre ────────────────────────────────────────
const pliage = (
  <Dessin
    titre="Plier l'angle pour trouver sa bissectrice"
    traits={[
      { de: O, a: polaire(0, 150) },
      { de: O, a: polaire(100, 150) },
      { de: O, a: polaire(50, 160), couleur: BLEU, pointille: true },
    ]}
    courbes={[{ o: O, de: 94, a: 8, r: 118, couleur: VIOLET }]}
    points={[O]}
    textes={[nomO, nom("pli", polaire(50, 182), BLEU)]}
  />
);

// ─── 110 ÷ 2 = 55 ─────────────────────────────────────────────────────────────
const division = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["110", "2"],
      division: { dividende: "110", diviseur: "2", quotient: "55", reste: "0" },
      display: { showResult: true, compact: true },
      questionLabel: "la moitié de 110°",
    }}
  />
);

// ─── LE RAPPORTEUR : centre sur O, zéro sur un côté, point à 55 ───────────────
// Un demi-disque gradué de 10 en 10. L'angle mesure 110° ; le point rouge est
// posé à 55, et la demi-droite bleue part de O et passe par lui.
const rapporteur = (() => {
  const R = 100;
  const graduations = Array.from({ length: 19 }, (_, i) => ({
    de: polaire(i * 10, i % 9 === 0 ? R - 14 : R - 8),
    a: polaire(i * 10, R),
    couleur: GRIS,
    epaisseur: 1.5,
  }));
  return (
    <Dessin
      titre="Tracer la bissectrice au rapporteur"
      traits={[
        { de: polaire(180, R), a: polaire(0, R), couleur: GRIS, epaisseur: 2 },
        ...graduations,
        { de: O, a: polaire(0, 150) },
        { de: O, a: polaire(110, 150) },
        { de: O, a: polaire(55, 160), couleur: BLEU, pointille: true },
      ]}
      arcs={[{ o: O, de: 0, a: 180, r: R, couleur: GRIS }]}
      points={[O, polaire(55, R)]}
      textes={[
        nom("O", { x: 0, y: 16 }),
        { p: polaire(8, 78), texte: "0", couleur: "#475569" },
        { p: polaire(55, 120), texte: "55", couleur: ROUGE },
        { p: polaire(110, 164), texte: "110°", couleur: NOIR },
      ]}
    />
  );
})();

// ─── L'ANGLE DROIT : 45° + 45° ────────────────────────────────────────────────
const angleDroit = (
  <Dessin
    titre="La bissectrice d'un angle droit"
    traits={[
      { de: O, a: polaire(0, 150) },
      { de: O, a: polaire(90, 150) },
      { de: O, a: polaire(45, 160), couleur: BLEU, pointille: true },
    ]}
    coins={[{ o: O, dir: 0, c: 16 }]}
    arcs={[
      { o: O, de: 0, a: 45, r: 56, couleur: ORANGE, texte: "45°", rTexte: 86, code: true },
      { o: O, de: 45, a: 90, r: 56, couleur: ORANGE, texte: "45°", rTexte: 86, code: true },
    ]}
    points={[O]}
    textes={[nomO]}
  />
);

// ─── UNE PART CONNUE : AOC = 37°, AOB = ? ─────────────────────────────────────
const unePartConnue = (
  <Dessin
    titre="Une part connue, l'angle entier à trouver"
    traits={[
      { de: O, a: polaire(0, 170) },
      { de: O, a: polaire(74, 170) },
      { de: O, a: polaire(37, 170), couleur: BLEU, pointille: true },
    ]}
    arcs={[
      { o: O, de: 0, a: 37, r: 50, couleur: ORANGE, code: true },
      { o: O, de: 37, a: 74, r: 50, couleur: ORANGE, texte: "37°", rTexte: 80, code: true },
      { o: O, de: 0, a: 74, r: 118, couleur: ROUGE },
    ]}
    points={[O, polaire(0, 170), polaire(74, 170), polaire(37, 170)]}
    textes={[
      nomO,
      nom("A", polaire(80, 176)),
      nom("B", polaire(-6, 176)),
      nom("C", polaire(40, 186), BLEU),
      { p: polaire(16, 136), texte: "?", couleur: ROUGE, taille: 20 },
    ]}
  />
);

// ─── L'ANGLE PLAT : la bissectrice fait deux angles droits ────────────────────
// ⛔ D'abord tenté avec `droites` : son repère d'angle droit ne se pose que « à
// droite et en haut » du point, donc UN seul des deux angles droits était
// marqué, et son carré recouvrait le « O ». Au rendu, les pointes de flèche des
// demi-droites se superposaient en plus aux points A et B. SVG local : les DEUX
// angles droits sont codés, c'est toute la leçon du dessin.
const anglePlat = (
  <Dessin
    titre="La bissectrice d'un angle plat"
    traits={[
      { de: O, a: polaire(0, 120) },
      { de: O, a: polaire(180, 120) },
      { de: O, a: polaire(90, 110), couleur: BLEU, pointille: true },
    ]}
    coins={[
      { o: O, dir: 0, c: 16 },
      { o: O, dir: 90, c: 16 },
    ]}
    points={[O, polaire(0, 120), polaire(180, 120), polaire(90, 110)]}
    textes={[
      nom("O", { x: 0, y: 18 }),
      nom("A", { x: -120, y: 18 }),
      nom("B", { x: 120, y: 18 }),
      nom("C", { x: 16, y: -110 }, BLEU),
      { p: polaire(45, 50), texte: "90°", couleur: ROUGE },
      { p: polaire(135, 50), texte: "90°", couleur: ROUGE },
    ]}
  />
);

// ─── LE PIÈGE DU 45° : 110° = 45° + 65° ───────────────────────────────────────
// Deux couleurs, aucun trait de codage : les deux parts ne sont PAS égales.
const piege45 = (
  <Dessin
    titre="Une demi-droite à 45° dans un angle de 110°"
    traits={[
      { de: O, a: polaire(0, 160) },
      { de: O, a: polaire(110, 160) },
      { de: O, a: polaire(45, 165), couleur: ROUGE, pointille: true },
    ]}
    arcs={[
      { o: O, de: 0, a: 45, r: 50, couleur: ORANGE, texte: "45°", rTexte: 82 },
      { o: O, de: 45, a: 110, r: 50, couleur: VIOLET, texte: "65°", rTexte: 82 },
    ]}
    points={[O]}
    textes={[nomO]}
  />
);

// ─── LE PANNEAU DANGER : 60° = 30° + 30° ──────────────────────────────────────
// Un triangle équilatéral JUSTE (côté 170, hauteur 147,2), bordé de rouge comme
// le panneau. La bissectrice part du sommet du haut.
const panneau = (() => {
  const A = { x: 0, y: 0 };
  const B = { x: 170, y: 0 };
  const C = polaire(60, 170, A);
  return (
    <Dessin
      titre="Le panneau danger et la bissectrice d'un de ses angles"
      polygones={[{ pts: [A, B, C], fond: "#ffffff", couleur: ROUGE }]}
      traits={[{ de: C, a: { x: 85, y: 0 }, couleur: BLEU, pointille: true }]}
      arcs={[
        // rTexte 92 : à 74, les deux « 30° » touchaient les pointillés (vu au rendu).
        { o: C, de: 240, a: 270, r: 40, couleur: ORANGE, texte: "30°", rTexte: 92, code: true },
        { o: C, de: 270, a: 300, r: 40, couleur: ORANGE, texte: "30°", rTexte: 92, code: true },
      ]}
      textes={[
        { p: polaire(28, 42, A), texte: "60°", couleur: "#475569", taille: 15 },
        { p: polaire(152, 42, B), texte: "60°", couleur: "#475569", taille: 15 },
      ]}
    />
  );
})();

// ─── UN COIN PLIÉ DEUX FOIS : 90 → 45 → 22,5 ──────────────────────────────────
const coinPlie = (
  <Dessin
    titre="Deux bissectrices de suite dans un angle droit"
    // Les deux « 22,5° » s'écrivent AU BOUT des demi-droites (r = 176 > 150) :
    // posés entre elles, ils chevauchaient les pointillés (vu au rendu).
    traits={[
      { de: O, a: polaire(0, 150) },
      { de: O, a: polaire(90, 150) },
      { de: O, a: polaire(45, 150), couleur: BLEU, pointille: true },
      { de: O, a: polaire(22.5, 150), couleur: BLEU, pointille: true },
    ]}
    coins={[{ o: O, dir: 0, c: 14 }]}
    arcs={[
      { o: O, de: 45, a: 90, r: 58, couleur: ORANGE, texte: "45°", rTexte: 88 },
      { o: O, de: 0, a: 22.5, r: 104, couleur: VIOLET, texte: "22,5°", rTexte: 176, code: true },
      { o: O, de: 22.5, a: 45, r: 104, couleur: VIOLET, texte: "22,5°", rTexte: 176, code: true },
    ]}
    points={[O]}
    textes={[nomO]}
  />
);

const pieges = [
  "Croire que la bissectrice est toujours à 45°. C'est vrai seulement pour un angle droit.",
  "Passer par le sommet ne suffit pas. Il faut deux parts ÉGALES.",
  "Poser le zéro du rapporteur au hasard. Le zéro va sur un côté de l'angle.",
];

const aRetenir = [
  "La bissectrice partage un angle en deux angles égaux, côte à côte.",
  "Une part vaut la moitié de l'angle. L'angle vaut le double d'une part.",
  "C'est l'axe de symétrie de l'angle. Il n'y en a qu'une.",
];

export const ficheBissectriceAngle6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "bissectrice-angle",
  titre: "La bissectrice d'un angle",
  accroche:
    "Plie une feuille pour amener un côté d'un angle sur l'autre. Le pli coupe l'angle en deux parts égales : c'est la bissectrice.",
  identite: [
    { label: "Le mot clé", valeur: "Deux angles égaux, côte à côte" },
    { label: "Le geste", valeur: "Plier, ou prendre la moitié au rapporteur" },
    { label: "La règle d'or", valeur: "Une part = la moitié de l'angle" },
  ],
  definition: {
    texte:
      "La bissectrice d'un angle est la droite qui le partage en deux angles égaux. Elle passe par le sommet de l'angle. Les deux angles sont côte à côte : on dit qu'ils sont adjacents.",
  },
  figure: {
    schema: legende(figureDefinition, "80° = 40° + 40°"),
    legende: "L'angle AOB mesure 80°, donc [OC) le partage en deux angles de 40°.",
  },
  proprietes: [
    {
      titre: "L'axe de symétrie de l'angle",
      micros: ["bissectrice_definition"],
      texte:
        "On plie le long de la bissectrice : un côté tombe sur l'autre. La bissectrice est l'axe de symétrie de l'angle.",
      schema: legende(symetrie, "Le pli amène M sur M'."),
    },
    {
      titre: "On partage l'angle saillant",
      micros: ["bissectrice_definition"],
      texte:
        "Deux demi-droites de même origine forment deux angles. On partage le plus petit : l'angle saillant.",
      schema: saillant,
    },
    {
      titre: "La moitié, ou le double",
      micros: ["bissectrice_probleme"],
      texte:
        "Une part vaut la moitié de l'angle entier. L'angle entier vaut le double d'une part.",
      schema: barreMoitie,
    },
  ],
  reel: {
    texte:
      "Tu coupes une part de pizza en deux parts égales ? Ton couteau suit la bissectrice de la part. Les pliages en papier se font souvent coin sur coin. Chaque pli coupe alors un angle en deux angles égaux.",
  },
  historique: {
    texte:
      "Il y a 2 300 ans, le Grec Euclide explique déjà comment couper un angle en deux. Il le fait avec une règle et un compas. Couper un angle en TROIS parts égales semblait aussi simple. En 1837, le Français Pierre-Laurent Wantzel a prouvé qu'avec ces seuls outils, c'est en général impossible.",
  },
  methode: [
    {
      titre: "Plier",
      micros: ["bissectrice_construire"],
      texte:
        "On plie la feuille en passant par le sommet. Un côté doit tomber exactement sur l'autre : le pli est la bissectrice.",
      schema: legende(pliage, "Un côté vient sur l'autre."),
    },
    {
      titre: "Mesurer, puis diviser par 2",
      micros: ["bissectrice_construire"],
      texte: "On mesure l'angle au rapporteur : ici 110°. On prend la moitié : 110 ÷ 2 = 55°.",
      schema: division,
    },
    {
      titre: "Marquer et tracer",
      micros: ["bissectrice_construire"],
      texte:
        "Centre sur le sommet, zéro sur un côté : on marque un point à 55°. On trace la demi-droite du sommet à ce point.",
      schema: legende(rapporteur, "Le point est posé à 55°."),
    },
  ],
  usages: [
    {
      titre: "On connaît l'angle : on divise par 2",
      micros: ["bissectrice_probleme"],
      detail: "Un angle droit mesure 90°. Sa bissectrice fait deux angles de 45°.",
      schema: angleDroit,
    },
    {
      titre: "On connaît une part : on double",
      micros: ["bissectrice_probleme"],
      detail: "[OC) est la bissectrice et l'angle AOC mesure 37°. Alors l'angle AOB mesure 37 + 37 = 74°.",
      schema: unePartConnue,
    },
    {
      titre: "Un angle plat",
      micros: ["bissectrice_probleme"],
      detail: "Un angle plat mesure 180°. Sa bissectrice fait deux angles droits de 90°.",
      schema: anglePlat,
    },
  ],
  exemples: [
    {
      titre: "Le 45° de Léo",
      micros: ["bissectrice_construire"],
      donnees: "Léo veut tracer la bissectrice d'un angle de 110°. Il trace une demi-droite à 45° d'un côté.",
      question: "A-t-il tracé la bissectrice ?",
      schema: piege45,
      solution:
        "Non. D'un côté, il y a 45°. De l'autre, il reste 110 − 45 = 65°. Les deux parts ne sont pas égales. Il fallait tracer à 110 ÷ 2 = 55°.",
    },
    {
      titre: "Le panneau danger",
      micros: ["bissectrice_probleme"],
      donnees: "Le panneau « danger » est un triangle équilatéral. Ses trois angles mesurent 60°.",
      question: "On trace la bissectrice d'un de ses angles. Combien mesure chaque part ?",
      schema: panneau,
      solution: "La bissectrice coupe l'angle de 60° en deux. 60 ÷ 2 = 30. Chaque part mesure 30°.",
    },
    {
      titre: "Un coin plié deux fois",
      micros: ["bissectrice_defi"],
      donnees: "Le coin d'une feuille est un angle droit. On le plie en deux. Puis on replie une moitié en deux.",
      question: "Combien mesure le plus petit angle ?",
      schema: coinPlie,
      solution:
        "Premier pli : 90 ÷ 2 = 45°. Deuxième pli : 45 ÷ 2 = 22,5°. Une mesure d'angle peut être un nombre à virgule.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "La bissectrice d'un angle de 80° le partage en deux. Combien mesure chaque part ?",
      correction: "40°, car 80 ÷ 2 = 40.",
      micros: ["bissectrice_definition"],
    },
    {
      question: "Un angle mesure 110°. À quelle graduation du rapporteur marques-tu le point de la bissectrice ?",
      correction: "À 55°, car 110 ÷ 2 = 55. Le zéro du rapporteur est posé sur un côté.",
      micros: ["bissectrice_construire"],
    },
    {
      question: "[OC) est la bissectrice de l'angle AOB, qui mesure 130°. Combien mesure l'angle COB ?",
      correction: "65°, car 130 ÷ 2 = 65.",
      micros: ["bissectrice_probleme"],
    },
    {
      question:
        "Un angle mesure 120°. On trace sa bissectrice, puis la bissectrice d'une des deux moitiés. Combien mesure le plus petit angle ?",
      correction: "120 ÷ 2 = 60°, puis 60 ÷ 2 = 30°. Le plus petit angle mesure 30°.",
      micros: ["bissectrice_defi"],
    },
    {
      question: "Combien de bissectrices un angle possède-t-il ?",
      correction:
        "Une seule. Si on tourne la demi-droite d'un degré, une part grandit et l'autre rétrécit : elles ne sont plus égales.",
      micros: ["bissectrice_defi"],
    },
    {
      question: "Que veut dire « angle saillant » ?",
      correction: "C'est le plus petit des deux angles formés par deux demi-droites de même origine.",
      micros: ["bissectrice_definition"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
  // ⭐ Ti Margo dans le mode classe (engendré depuis la fiche) : une phrase
  // courte, sans LaTeX, sur six diapos.
  tiMargo: {
    objectif: "Deux parts égales, côte à côte !",
    definition: "Plie : un côté doit tomber sur l'autre !",
    methode: "Toujours la MOITIÉ de l'angle !",
    pieges: "45°, c'est seulement pour l'angle droit !",
    retenir: "Une part = la moitié. L'angle = le double.",
    exercice: "Moitié ou double ? Réfléchis !",
  },
};

// ⚠️ CE TABLEAU N'EST PAS PROJETÉ : le mode classe est engendré depuis la fiche
// (`slidesDepuisFiche.tsx`), Ti Margo compris (champ `tiMargo`). Il reste
// exporté parce que la page le passe ; un tableau vide couperait le mode classe.
// ⛔ Aucun LaTeX ici non plus.
export const slidesBissectriceAngle6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Bissectrice - 6e",
    teinte: "objectif",
    schema: avecMargo(figureDefinition, "Deux parts égales, côte à côte !", "joie"),
    section: {
      type: "objectif",
      phrase: "La bissectrice coupe un angle en deux parts égales",
      sousPhrase: "Elle passe par le sommet. Les deux angles sont côte à côte.",
      encadre: { titre: "Le geste", texte: "Plier : un côté vient sur l'autre." },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: pliage,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Couper une part de pizza en deux parts égales : le couteau suit la bissectrice.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Euclide coupait un angle en deux il y a 2 300 ans. En trois ? En général impossible à la règle et au compas !",
      },
    },
  },
  {
    titre: "Deux mots à connaître",
    badge: "Vocabulaire",
    teinte: "definition",
    schema: saillant,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Adjacents", texte: "Deux angles côte à côte, avec un côté en commun." },
        { titre: "Saillant", texte: "Le plus petit des deux angles. C'est lui qu'on partage." },
      ],
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    teinte: "essentiel",
    schema: avecMargo(division, "Toujours la MOITIÉ de l'angle !"),
    section: {
      type: "objectif",
      phrase: "Une part = la moitié de l'angle",
      sousPhrase: "Un angle de 80° donne deux parts de 40°. Une part de 37° vient d'un angle de 74°.",
      encadre: { titre: "Le contrôle", texte: "Les deux parts ensemble redonnent l'angle." },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: rapporteur,
    section: {
      type: "cartes",
      cartes: [
        { titre: "Plier", texte: "Amener un côté sur l'autre. Le pli est la bissectrice." },
        { titre: "Diviser par 2", texte: "Mesurer l'angle, puis prendre la moitié : 110° donne 55°." },
        { titre: "Tracer", texte: "Zéro sur un côté, marquer 55°, tracer depuis le sommet." },
      ],
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    teinte: "methode",
    schema: anglePlat,
    section: {
      type: "cartes",
      cartes: [
        { titre: "On connaît l'angle", texte: "On divise par 2 : un angle droit donne 45° et 45°." },
        { titre: "On connaît une part", texte: "On double : une part de 37° donne un angle de 74°." },
        { titre: "Un angle plat", texte: "180 ÷ 2 = 90 : la bissectrice fait deux angles droits." },
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le 45° de Léo",
    teinte: "exemple",
    schema: avecMargo(piege45, "45°, c'est seulement pour l'angle droit !", "attention"),
    section: {
      type: "exemple",
      enonce: "Léo veut la bissectrice d'un angle de 110°. Il trace une demi-droite à 45°.",
      question: "Est-ce la bissectrice ?",
      correction: "Non : 45° d'un côté, 65° de l'autre. Il fallait tracer à 55°.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(symetrie, "Plie : un côté doit tomber sur l'autre !", "attention"),
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(unePartConnue, "Moitié ou double ? Réfléchis !"),
    section: {
      type: "exercice",
      enonce: "[OC) est la bissectrice de l'angle AOB. L'angle AOC mesure 37°.",
      question: "Combien mesure l'angle AOB ?",
      indice: "L'angle entier, c'est deux parts.",
      correction: "37 + 37 = 74°.",
    },
  },
];
