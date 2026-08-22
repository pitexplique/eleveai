// ─── Fiche de cours : les aires (6e) ────────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/aires.bank.ts.
//
// Correspondance micro-compétences → blocs :
// - aire_comprendre  → définition, propriétés 1-2 (l'unité EST un carré, compter)
// - aire_compter     → propriété 2, usage « Compter les carreaux », entraînement 1
// - aire_comparer    → propriété 3 (comparer sans mesurer), propriété 6 (convertir),
//                      méthode « Même unité avant de comparer », exemple 4
// - aire_rectangle   → propriété 4, formule, exemple 1, entraînement 3
// - aire_carre       → propriété 5, formule, entraînement 3
// - aire_decomposer  → propriété 7, usage « Découper la figure », exemples 2-3
// - aire_probleme    → bloc réel, problème du jardin (entraînement 6)
// - aire_defi        → piège « aire ≠ périmètre », défi (entraînement 4)
//
// ⭐ LE BO, RELU LE 21/08/2026 (extrait envoyé par Frédéric). Trois attendus
// manquaient à la fiche, et ce sont ceux que l'élève rate au contrôle :
//   · « 1 cm² est l'aire d'un carré de 1 cm de côté » — l'unité est un OBJET,
//     pas une notation qu'on recopie à la fin d'un calcul ;
//   · « comparer des aires SANS avoir recours à la mesure, par superposition ou
//     par découpage et recollement » — comparer vient AVANT calculer ;
//   · « effectuer des conversions d'aire » : 1 m² = 100 dm², 1 dm² = 100 cm².
//     C'est × 100 à chaque étage, pas × 10 — et ça ne se retient pas, ça se voit
//     sur le carré de 1 dm découpé en 10 × 10 carrés de 1 cm.
//
// ⭐ LE DESSIN SE CHOISIT POUR CE QU'IL MONTRE (REGLES.md § 2 bis). Les sept
// propriétés portent sept images de nature différente : le carré-unité, les
// carreaux COMPTÉS un à un, deux figures superposables, le rectangle CÔTÉ (on ne
// compte plus, on multiplie), le carré codé, le décimètre carré découpé en cent,
// la figure tordue. Et les figures tordues sont là exprès (Frédéric, 21/08) :
// sur un rectangle, l'élève applique une formule sans réfléchir.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { slidesDepuisFiche } from "@/lib/fiches/slidesDepuisFiche";

type Case = [number, number];

// Toutes les cases pleines d'un bloc rectangulaire (row, col), pour dessiner une
// aire « carreau par carreau » avec le canvas figure_libre du coach.
function rectCells(rows: number, cols: number, r0 = 0, c0 = 0): Case[] {
  const cells: Case[] = [];
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) cells.push([r0 + r, c0 + c]);
  return cells;
}

/**
 * Le quadrillage. `unites` marque chaque carreau d'un « 1 » : c'est le dessin de
 * « compter », pas celui de « calculer ». `contour` trace le tour en rouge —
 * réservé aux blocs qui opposent justement l'aire au périmètre.
 *
 * ⚠️ `cellSize` se règle, il ne se subit pas : le SVG se met à l'échelle de son
 * bloc (226 px sur un téléphone). À 32 px la case, une grille de 8 colonnes fait
 * 288 px de viewBox et ses chiffres tombent à 10 px. À 24, elle en fait 224 et
 * ils restent à 13.
 */
const grille = (
  rows: number,
  cols: number,
  cells: Case[],
  opts: { unites?: boolean; contour?: boolean; cellSize?: number } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: opts.cellSize ?? (cols > 6 ? 24 : 32) },
      grid: { rows, cols, filledCells: cells },
      display: {
        showGrid: true,
        showFilled: true,
        showCellLabels: opts.unites ?? false,
        showPerimeter: opts.contour ?? false,
      },
    }}
  />
);

/** Un rectangle CÔTÉ : ses dimensions écrites, ses quatre angles droits codés. */
const rectangleCote = (
  largeur: number,
  hauteur: number,
  labels: { AB?: string; BC?: string; CD?: string; DA?: string }
) => {
  const x0 = 48;
  const y0 = 45;
  return (
    <CanvasRenderer
      figure={{
        kind: "quadrilatere",
        size: { width: x0 * 2 + largeur, height: y0 * 2 + hauteur },
        points: {
          A: { x: x0, y: y0 },
          B: { x: x0 + largeur, y: y0 },
          C: { x: x0 + largeur, y: y0 + hauteur },
          D: { x: x0, y: y0 + hauteur },
        },
        sideLabels: labels,
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
        marks: { rightAnglesAt: ["A", "B", "C", "D"] },
      }}
    />
  );
};

/** Un dessin et sa phrase, sous lui — pour dire ce que la figure ne dit pas seule. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// Deux dessins l'un SOUS l'autre : dans une carte, on empile, on ne juxtapose
// pas (REGLES.md § 2 ter). Côte à côte, chacun tomberait à 80 px de large.
const empiler = (
  haut: React.ReactNode,
  hautLabel: string,
  bas: React.ReactNode,
  basLabel: string
) => (
  <div className="space-y-2">
    <div>
      {haut}
      <p className="mt-1 text-center text-xs font-black text-sky-700">{hautLabel}</p>
    </div>
    <div>
      {bas}
      <p className="mt-1 text-center text-xs font-black text-emerald-700">{basLabel}</p>
    </div>
  </div>
);

// ⭐ DES FIGURES TORDUES, PAS SEULEMENT DES RECTANGLES (Frédéric, 21/08/2026).
// Sur une forme usuelle, l'élève applique une formule sans réfléchir ; c'est sur
// une figure biscornue qu'il doit vraiment choisir entre compter et découper.
// `figure_libre` est fait pour ça — et le BO de 6e demande justement des aires
// « par pavage, découpage et recollement ».

// L'escalier : quatre marches, 10 carreaux. Ni rectangle, ni carré.
const escalier: Case[] = [
  [0, 0],
  [1, 0], [1, 1],
  [2, 0], [2, 1], [2, 2],
  [3, 0], [3, 1], [3, 2], [3, 3],
];

// Neuf carreaux en forme de croix : on les compte, même si la figure n'a
// aucune forme usuelle.
const croix: Case[] = [
  [0, 1],
  [1, 0], [1, 1], [1, 2],
  [2, 0], [2, 1], [2, 2],
  [3, 1], [3, 2],
];

// Un zigzag en S : six carreaux, deux décrochements. Aucune formule ne marche,
// et pourtant l'aire se lit d'un coup d'œil quand on compte.
const zigzag: Case[] = [
  [0, 0], [0, 1],
  [1, 1], [1, 2],
  [2, 2], [2, 3],
];

// La figure biscornue de l'exemple 3 : neuf carreaux, trois décrochements.
// Elle ne ressemble à rien de connu — c'est exactement l'intérêt.
const biscornue: Case[] = [
  [0, 0], [0, 1],
  [1, 0], [1, 1], [1, 2], [1, 3],
  [2, 2], [2, 3], [2, 4],
];

// LE DÉCOUPAGE-RECOLLEMENT du BO : douze carreaux rangés en rectangle, puis les
// MÊMES douze carreaux en L. Deux formes, une seule aire — et sans mesurer.
const bloc12: Case[] = rectCells(3, 4);
const formeL12: Case[] = [...rectCells(2, 4, 0, 0), ...rectCells(2, 2, 2, 0)];

// La figure en L de l'exemple 2 : rectangle 4 × 3 (12) + carré 2 × 2 (4) = 16.
const figureL: Case[] = [...rectCells(3, 4, 0, 0), ...rectCells(2, 2, 3, 0)];

// Le décimètre carré, découpé en cent centimètres carrés : 1 dm = 10 cm, donc le
// carré de 1 dm contient 10 × 10 carrés de 1 cm. C'est CE dessin qui explique
// pourquoi on multiplie par 100 et non par 10.
const centCarres = grille(10, 10, rectCells(10, 10), { cellSize: 20 });

// ⛔ PAS DE TABLEAU DE CONVERSION (BO 6e, relu le 22/08/2026) : « le recours à
// un tableau de conversion est déconseillé à ce stade de l'apprentissage ».
// Ce tableau-ci ne convertit rien — il dit ce que CHAQUE unité EST, et c'est
// exactement ce que le BO demande de mémoriser : « l'élève sait que 1 cm² est
// l'aire d'un carré de 1 cm de côté […], que 1 mm² est l'aire d'un carré de
// 1 mm de côté et que 1 km² est l'aire d'un carré de 1 km de côté ».
const tableauUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Unité", "C'est l'aire d'un carré de côté"],
      rows: [
        { values: ["1 mm²", "1 mm"] },
        { values: ["1 cm²", "1 cm"] },
        { values: ["1 dm²", "1 dm"] },
        { values: ["1 m²", "1 m"] },
        { values: ["1 km²", "1 km"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// La comparaison de l'exemple 4, posée : on ne convertit pas dans un tableau
// d'unités, on ramène les deux aires à la même unité et on compare les nombres.
const tableauComparaison = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Objet", "Aire donnée", "La même aire, en cm²"],
      rows: [
        { values: ["Affiche", "250 cm²", "250"] },
        { values: ["Feuille", "3 dm²", "3 × 100 = 300"] },
      ],
      highlight: { col: 2 },
    }}
  />
);

const pieges = [
  "Confondre l'aire (la surface à l'intérieur) et le périmètre (le tour de la figure).",
  "Convertir une aire comme une longueur : de dm² à cm², on multiplie par 100, pas par 10.",
  "Oublier l'unité carrée : une aire s'écrit en cm² ou en m², jamais en cm ou en m.",
  "Additionner longueur et largeur au lieu de les multiplier pour l'aire d'un rectangle.",
];

const aRetenir = [
  "1 cm² est l'aire d'un carré de 1 cm de côté (pareil pour 1 dm² et 1 m²).",
  "Aire du rectangle = longueur × largeur. Aire du carré = côté × côté.",
  "On change d'étage en multipliant par 100 : 1 m² = 100 dm², 1 dm² = 100 cm².",
];

export const ficheAires6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "L'aire, c'est la place qu'une figure occupe à l'intérieur de son contour. On la mesure en carrés-unité : comparer sans mesurer, compter des carreaux, multiplier pour un rectangle ou un carré, découper les figures tordues.",
  identite: [
    { label: "Prérequis", valeur: "Multiplication, rectangle, carré, quadrillage" },
    { label: "Formules clés", valeur: "Rectangle : L × l ; carré : c × c" },
    { label: "Unités", valeur: "cm², dm², m² — on change d'étage par × 100" },
  ],
  definition: {
    texte:
      "L'aire d'une figure est la mesure de la surface qu'elle occupe, c'est-à-dire tout l'intérieur de la figure. On la mesure avec un carré-unité : 1 cm² est l'aire d'un carré de 1 cm de côté, 1 dm² celle d'un carré de 1 dm de côté, 1 m² celle d'un carré de 1 m de côté.",
  },
  figure: {
    // Le tour en rouge, l'intérieur en bleu : le seul dessin de la fiche qui
    // montre les DEUX grandeurs à la fois — c'est là que se joue la confusion
    // aire / périmètre, et on la règle sur la définition.
    schema: grille(4, 5, rectCells(3, 4), { contour: true }),
    legende:
      "En rouge, le tour de la figure : c'est le périmètre. En bleu, tout l'intérieur : c'est l'aire.",
  },
  proprietes: [
    {
      titre: "L'unité est un carré",
      texte:
        "1 cm² est l'aire d'un carré de 1 cm de côté. De même pour 1 mm², 1 dm², 1 m² et 1 km² : chaque unité d'aire est le carré construit sur l'unité de longueur qui porte son nom.",
      schema: legende(
        rectangleCote(140, 140, { AB: "1 cm", BC: "1 cm", CD: "1 cm", DA: "1 cm" }),
        "ce carré-là, c'est 1 cm²"
      ),
    },
    {
      titre: "Compter les unités",
      texte:
        "Sur un quadrillage, l'aire d'une figure est le nombre de carreaux unités qu'elle recouvre. 12 carreaux recouverts, c'est une aire de 12 unités d'aire.",
      schema: grille(3, 4, bloc12, { unites: true }),
    },
    {
      titre: "Comparer sans mesurer",
      texte:
        "Deux figures se comparent par superposition, ou par découpage et recollement : si les morceaux de l'une remplissent exactement l'autre, elles ont la même aire.",
      // Les MÊMES douze carreaux, rangés autrement : l'aire n'a pas bougé, et
      // personne n'a mesuré quoi que ce soit.
      schema: empiler(
        grille(3, 4, bloc12, { contour: true }),
        "12 carreaux",
        grille(4, 4, formeL12, { contour: true }),
        "les mêmes 12, recollés : même aire"
      ),
    },
    {
      titre: "L'aire du rectangle",
      texte:
        "Aire du rectangle = longueur × largeur. Un rectangle de 6 cm sur 4 cm a une aire de 6 × 4 = 24 cm².",
      schema: rectangleCote(186, 124, { AB: "6 cm", BC: "4 cm" }),
    },
    {
      titre: "L'aire du carré",
      texte:
        "Dans un carré, tous les côtés sont égaux. Aire du carré = côté × côté. Un carré de côté 5 cm a une aire de 5 × 5 = 25 cm².",
      schema: rectangleCote(150, 150, {
        AB: "5 cm",
        BC: "5 cm",
        CD: "5 cm",
        DA: "5 cm",
      }),
    },
    {
      titre: "Convertir : × 100 par étage",
      texte:
        "En 6e, deux conversions seulement : 1 m² = 100 dm² et 1 dm² = 100 cm², car un côté 10 fois plus grand donne 10 × 10 = 100 carrés. Dans l'autre sens, 1 cm² est le centième de 1 dm² : 1 cm² = 0,01 dm².",
      schema: legende(centCarres, "1 dm de côté = 10 cm × 10 cm = 100 carrés de 1 cm²"),
    },
    {
      titre: "Décomposer une figure",
      texte:
        "Une figure tordue (en L, en escalier, en zigzag) se découpe en rectangles et en carrés. L'aire totale est la somme des aires des morceaux, s'ils ne se chevauchent pas.",
      schema: grille(4, 4, escalier, { contour: true }),
    },
  ],
  reel: {
    texte:
      "On calcule des aires tous les jours : le nombre de pots de peinture pour un mur, le carrelage d'une salle de bain, la pelouse à semer dans un jardin, la surface d'un appartement sur une annonce. À chaque fois, la question est la même : quelle surface faut-il couvrir ?",
  },
  historique: {
    texte:
      "Il y a plus de 4000 ans, en Égypte, le Nil débordait chaque année et effaçait les limites des champs. Des arpenteurs, surnommés les tendeurs de corde, remesuraient alors la surface de chaque parcelle pour répartir les terres et calculer l'impôt. Mesurer des aires est l'un des plus vieux métiers des mathématiques.",
  },
  formule: {
    contexte: "Rectangle de longueur L et de largeur l",
    expression: "A(rectangle) = L × l ; A(carré) = c × c",
    legende:
      "Pourquoi ça marche : 5 rangées de 8 carreaux, c'est 5 × 8 = 40 carreaux. Multiplier, c'est compter plus vite.",
    // Le dessin qui JUSTIFIE la formule : les 40 carreaux sont là, chacun
    // marqué « 1 », rangés en 5 rangées de 8.
    schema: grille(5, 8, rectCells(5, 8), { unites: true }),
  },
  methode: [
    {
      titre: "Regarder la figure",
      texte:
        "Est-ce un rectangle, un carré, ou une figure tordue sur quadrillage ? La forme décide de la méthode : formule, comptage ou découpage.",
      // Le réflexe est un CHOIX : il lui faut donc les deux cas, l'un sous
      // l'autre (§ 2 ter). Un seul dessin ne montrerait aucune décision.
      schema: empiler(
        grille(3, 4, bloc12, { contour: true }),
        "forme usuelle → une formule",
        grille(5, 4, figureL, { contour: true }),
        "forme tordue → on découpe"
      ),
    },
    {
      titre: "Calculer avec la bonne formule",
      texte:
        "Rectangle : longueur × largeur. Carré : côté × côté. Sur quadrillage : compter les carreaux unités recouverts.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "calcul_pose",
            operation: "multiplication",
            title: "Rectangle 8 cm × 5 cm",
            numbers: ["8", "5"],
            result: "40",
            display: { showResult: true, compact: false },
            questionLabel: "40 : c'est l'aire, en cm².",
          }}
        />
      ),
    },
    {
      titre: "La même unité, puis l'unité carrée",
      texte:
        "On termine toujours par l'unité : 24 cm², 40 m². Et avant de comparer deux aires, on les met dans la même unité — la mesure en dm² est 100 fois plus petite que la mesure en cm².",
      schema: tableauUnites,
    },
  ],
  usages: [
    {
      titre: "Compter les carreaux",
      detail:
        "Sur un quadrillage, on compte les carreaux unités recouverts par la figure. 9 carreaux recouverts donnent une aire de 9 unités d'aire.",
      // Une figure SANS forme usuelle : compter marche quand même. C'est ce que
      // le rectangle numéroté de la propriété 2 ne peut pas montrer.
      schema: grille(4, 3, croix, { unites: true }),
    },
    {
      titre: "Calculer rectangle ou carré",
      detail:
        "On connaît les dimensions : rectangle = longueur × largeur, carré = côté × côté. On n'oublie pas l'unité carrée à la fin.",
      schema: empiler(
        rectangleCote(180, 78, { AB: "7 cm", BC: "3 cm" }),
        "7 × 3 = 21 cm²",
        rectangleCote(130, 130, { AB: "5 cm", BC: "5 cm" }),
        "5 × 5 = 25 cm²"
      ),
    },
    {
      titre: "Découper la figure",
      detail:
        "La figure n'est ni un rectangle ni un carré ? On la découpe en morceaux simples, on calcule l'aire de chaque morceau, puis on additionne.",
      schema: grille(3, 4, zigzag, { contour: true }),
    },
  ],
  exemples: [
    {
      titre: "L'aire d'un rectangle",
      donnees: "Un rectangle mesure 8 cm de longueur et 5 cm de largeur.",
      question: "Calculer son aire.",
      // L'énoncé donne des DIMENSIONS, pas un quadrillage : le dessin dit la
      // même chose que le texte, et l'élève applique la formule.
      schema: rectangleCote(192, 120, { AB: "8 cm", BC: "5 cm" }),
      solution:
        "C'est un rectangle, donc aire = longueur × largeur = 8 × 5 = 40. Son aire est 40 cm². Attention : 8 + 5 + 8 + 5 = 26 cm, c'est son périmètre, pas son aire.",
    },
    {
      titre: "Une figure en L",
      donnees:
        "Une figure en L est formée d'un rectangle de 4 cm sur 3 cm et d'un carré de côté 2 cm, sans chevauchement.",
      question: "Calculer son aire totale.",
      schema: grille(5, 4, figureL, { contour: true }),
      solution:
        "Aire du rectangle : 4 × 3 = 12 cm². Aire du carré : 2 × 2 = 4 cm². Aire totale : 12 + 4 = 16 cm².",
    },
    {
      titre: "Une figure biscornue",
      donnees:
        "Une figure tracée sur un quadrillage (carreaux de 1 cm²) : elle n'est ni un rectangle, ni un carré, et son contour fait trois décrochements.",
      question: "Quelle est son aire ?",
      schema: grille(3, 5, biscornue, { unites: true, contour: true }),
      solution:
        "Aucune formule ne s'applique : on compte les carreaux recouverts, rangée par rangée. 2 + 4 + 3 = 9 carreaux. L'aire est 9 cm². (On peut aussi la découper en un carré 2 × 2, puis deux morceaux de 2 et 3 carreaux : 4 + 2 + 3 = 9.)",
    },
    {
      titre: "Comparer deux aires",
      donnees: "Une affiche a une aire de 250 cm². Une feuille a une aire de 3 dm².",
      question: "Laquelle occupe la plus grande surface ?",
      schema: tableauComparaison,
      solution:
        "On met tout dans la même unité. 1 dm² = 100 cm², donc 3 dm² = 3 × 100 = 300 cm². On compare alors 250 cm² et 300 cm² : c'est la feuille qui a la plus grande aire.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Sur un quadrillage, une figure en escalier recouvre 1 carreau sur la première rangée, puis 2, puis 3, puis 4. Quelle est son aire ?",
      correction:
        "Aucune formule ici : on compte rangée par rangée. 1 + 2 + 3 + 4 = 10 carreaux unités. L'aire de l'escalier est 10 unités d'aire.",
    },
    {
      question:
        "Un carré de 1 dm de côté est découpé en carrés de 1 cm de côté. Combien y en a-t-il ? Complète : 1 dm² = ... cm².",
      correction:
        "1 dm = 10 cm, donc le carré contient 10 rangées de 10 carrés, soit 10 × 10 = 100 carrés de 1 cm². Donc 1 dm² = 100 cm².",
    },
    {
      question: "Calcule l'aire d'un rectangle de 6 cm sur 4 cm, puis celle d'un carré de côté 7 cm.",
      correction:
        "Rectangle : aire = longueur × largeur = 6 × 4 = 24 cm². Carré : aire = côté × côté = 7 × 7 = 49 cm².",
    },
    {
      question:
        "Défi : deux rectangles peuvent-ils avoir la même aire mais des périmètres différents ?",
      correction:
        "Oui. Un rectangle de 3 cm sur 4 cm et un rectangle de 2 cm sur 6 cm ont tous les deux une aire de 12 cm². Mais leurs périmètres valent 14 cm et 16 cm : l'aire et le périmètre sont deux grandeurs différentes.",
    },
    {
      question: "Convertis 3,7 m² en dm², puis 370 cm² en dm².",
      correction:
        "1 m² = 100 dm², donc 3,7 m² = 3,7 × 100 = 370 dm². Dans l'autre sens, 1 dm² = 100 cm² : la mesure en dm² est 100 fois plus petite que la mesure en cm², donc 370 cm² = 370 ÷ 100 = 3,7 dm².",
    },
    {
      question:
        "Problème : un jardin rectangulaire mesure 7 m de long et 3 m de large. On veut le comparer à un potager carré de côté 5 m. Lequel a la plus grande aire ?",
      correction:
        "Aire du jardin : 7 × 3 = 21 m². Aire du potager : 5 × 5 = 25 m². Les deux aires sont en m², on compare les nombres : 25 est plus grand que 21. C'est le potager carré qui a la plus grande aire.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ LE DIAPORAMA NE S'ÉCRIT PLUS À LA MAIN (20/08/2026). `FicheCoursClient`
// fabrique lui-même les slides depuis la fiche — une par propriété, par réflexe,
// par usage, par exemple, par exercice, chacune avec SON dessin. Le tableau
// écrit ici ne servait plus qu'à diverger. On l'engendre donc de la même source :
// il ne reste qu'un interrupteur (un tableau vide éteindrait le mode classe).
export const slidesAires6e: ClasseSlide[] = slidesDepuisFiche(ficheAires6e);
