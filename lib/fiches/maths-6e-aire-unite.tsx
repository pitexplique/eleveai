// ─── Fiche de cours : l'aire et ses unités (6e) ───────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/aires.bank.ts, notionId aire_unite : l'étage des AUTOMATISMES du
// chapitre des aires, séparé de `aire_surface` le 23/08/2026).
//
// Micro-compétences 3/3 — correspondance micro → blocs :
//   aire_comprendre → définition + figure, propriétés 1 et 2, méthode 1,
//                     usage 1, entraînements 1 et 5
//   aire_compter    → propriété 3, méthode 2, usage 2, exemple 3, entraînement 2
//   aire_convertir  → propriété 4, méthode 3, usage 3, exemples 1 et 2,
//                     entraînements 3 et 4
//
// ⭐ LA FICHE VOISINE `maths-6e-aires.tsx` (aire-surface) porte les formules, la
// comparaison et le découpage. Celle-ci reste à l'étage d'en dessous : ce
// qu'EST une aire, le carreau qu'on compte, et l'unité qu'on écrit. Ses figures
// sont celles de la banque (la figure de 6 carreaux, celle de 5, le carré de
// 1 dm découpé), pas celles de la fiche voisine.
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : 15 cm / 15 cm² / 15 cm³ / 15 kg, le
// rectangle de 5 cm sur 4 cm (aire 20 cm², périmètre 18 cm), 5, 9 et 12
// carreaux, 3 rangées de 4, 1 dm² = 100 cm², la case qui vaut un centième,
// 3,7 m² = 370 dm², 370 cm² = 3,7 dm², 5 m² = 500 dm² (et non 50), 1 km².
//
// ⛔⛔ PAS DE TABLEAU DE CONVERSION (BO 6e : « déconseillé à ce stade »), et
// SEULEMENT m² ↔ dm² ↔ cm² en conversion. Le carré de 1 dm découpé en 100 est
// la méthode ; les deux tableaux de la fiche ne convertissent rien — l'un dit
// quelle grandeur une écriture mesure, l'autre dans quel SENS va le nombre.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

type Case = [number, number];

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

/** Toutes les cases d'un bloc rectangulaire. */
const bloc = (rows: number, cols: number): Case[] =>
  Array.from({ length: rows * cols }, (_, i) => [Math.floor(i / cols), i % cols] as Case);

/** Le quadrillage. `unites` écrit « 1 » dans chaque carreau : c'est le dessin de COMPTER. */
const grille = (
  rows: number,
  cols: number,
  cells: Case[],
  opts: { unites?: boolean; contour?: boolean; cellSize?: number } = {}
) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize: opts.cellSize ?? 32 },
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

/**
 * LE CARRÉ DE 1 dm DÉCOUPÉ EN 100 — le dessin même de la banque (`carreDecoupe`).
 * Sans case colorée, on compte les cent carrés ; avec une, on lit « un centième ».
 */
const carreDecoupe = (colorees: Case[]) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows: 10, cols: 10, filledCells: colorees },
      display: { showGrid: true, showFilled: colorees.length > 0, showPerimeter: true },
      size: { cellSize: 22, padding: 14 },
    }}
  />
);

/** Un carré ou un rectangle CÔTÉ, sans lettres aux sommets (inutiles ici). */
const rectangleCote = (largeur: number, hauteur: number, cotes: { AB?: string; BC?: string; DA?: string }) => {
  const m = 40;
  return (
    <CanvasRenderer
      figure={{
        kind: "quadrilatere",
        size: { width: m * 2 + largeur, height: m * 2 + hauteur },
        points: {
          A: { x: m, y: m },
          B: { x: m + largeur, y: m },
          C: { x: m + largeur, y: m + hauteur },
          D: { x: m, y: m + hauteur },
        },
        sideLabels: cotes,
        display: { showPoints: false, showLabels: false, showSides: true, showAngles: false },
        marks: { rightAnglesAt: ["A", "B", "C", "D"] },
      }}
    />
  );
};

// ─── Les dessins ──────────────────────────────────────────────────────────────

// Les deux figures de la banque (aire_compter_canvas_1 et _2).
const figure5: Case[] = [[1, 1], [1, 2], [2, 1], [2, 2], [3, 1]];
const figure6: Case[] = [[1, 1], [1, 2], [1, 3], [2, 1], [2, 2], [3, 1]];

// DÉFINITION — le tour en rouge, l'intérieur en bleu : l'aire, c'est le bleu.
const figureSurface = grille(5, 5, figure6, { contour: true });

// P1 — quelle grandeur mesure chaque écriture ?
const tableauEcritures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["J'écris", "Je mesure"],
      rows: [
        { values: ["15 cm", "une longueur"] },
        { values: ["15 cm²", "une aire"] },
        { values: ["15 cm³", "un volume"] },
        { values: ["15 kg", "une masse"] },
      ],
      highlight: { row: 1 },
    }}
  />
);

// P2 — l'unité est un carré : 1 cm de côté.
const carreUnCm = legende(rectangleCote(140, 140, { AB: "1 cm", DA: "1 cm" }), "ce carré mesure 1 cm²");

// P3 — compter les carreaux, un par un.
const compter5 = grille(5, 5, figure5, { unites: true });

// P4 — le carré de 1 dm, découpé en carrés de 1 cm.
const centCarres = legende(carreDecoupe([]), "10 rangées de 10 : 100 cm²");

// M1 — le tour ou l'intérieur ? Le rectangle de 5 cm sur 4 cm.
const rectangle54 = legende(
  rectangleCote(175, 140, { AB: "5 cm", BC: "4 cm" }),
  "dedans : 20 cm² · le tour : 18 cm"
);

// M2 — compter par rangées : 3 rangées de 4.
const rangees = legende(grille(3, 4, bloc(3, 4)), "3 rangées de 4 : 3 × 4 = 12");

// M3 — le sens de la conversion (ce tableau ne convertit rien : il dit le sens).
const tableauSens = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Je vais vers", "Je fais"],
      rows: [
        { values: ["une unité plus petite", "× 100 : ça grandit"] },
        { values: ["une unité plus grande", "÷ 100 : ça diminue"] },
      ],
    }}
  />
);

// U1 — 1 m², tracé à la craie dans la cour.
const carreUnM = legende(rectangleCote(140, 140, { AB: "1 m", DA: "1 m" }), "1 m² : un carré de 1 m de côté");

// U2 — une figure de 9 carreaux, sans forme connue : on compte quand même.
const figure9: Case[] = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 1], [1, 2], [2, 1], [2, 2], [3, 1]];
const compter9 = grille(4, 4, figure9, { unites: true });

// U3 — une case sur cent : 1 cm² est le centième de 1 dm².
const unCentieme = legende(carreDecoupe([[0, 0]]), "1 case = 1 cm² = 0,01 dm²");

// E1 — 3,7 m² : trois fois 100 dm², et encore 70.
const barre370 = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "370 dm²",
      parts: [
        { label: "1 m²", value: "100" },
        { label: "1 m²", value: "100" },
        { label: "1 m²", value: "100" },
        { label: "0,7 m²", value: "70" },
      ],
      questionLabel: "3,7 m² = 370 dm²",
      size: { width: 240, height: 190 },
    }}
  />
);

// E2 — une longueur n'est pas une aire : × 10 d'un côté, × 100 de l'autre.
const tableauLongueurAire = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Longueur", "Aire"],
      rows: [
        { values: ["1 m = 10 dm", "1 m² = 100 dm²"] },
        { values: ["5 m = 50 dm", "5 m² = 500 dm²"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// E3 — 12 carreaux de 1 cm², sans forme connue.
const figure12: Case[] = [
  [0, 0], [0, 1], [0, 2],
  [1, 0], [1, 1], [1, 2], [1, 3],
  [2, 1], [2, 2], [2, 3], [2, 4],
  [3, 3],
];
const compter12 = grille(4, 5, figure12, { unites: true, contour: true });

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "Confondre aire et périmètre. L'aire est à l'intérieur, le périmètre est le tour.",
  "Convertir une aire avec 10. 1 dm² = 100 cm², car le carré a 10 rangées de 10.",
  "Oublier le petit ². 20 cm est une longueur, 20 cm² est une aire.",
];

const aRetenir = [
  "L'aire mesure la surface : tout l'intérieur de la figure.",
  "1 cm² est l'aire d'un carré de 1 cm de côté.",
  "1 m² = 100 dm² et 1 dm² = 100 cm².",
];

export const ficheAireUnite6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-unite",
  titre: "L'aire et ses unités",
  accroche:
    "L'aire, c'est la place à l'intérieur d'une figure. On la mesure en comptant des petits carrés.",
  identite: [
    { label: "Le mot clé", valeur: "La surface : tout l'intérieur" },
    { label: "L'unité", valeur: "1 cm² = un carré de 1 cm de côté" },
    { label: "Le piège", valeur: "1 dm² = 100 cm², pas 10" },
  ],
  definition: {
    texte:
      "L'aire d'une figure mesure sa surface. C'est toute la place à l'intérieur de son contour. On la mesure avec un carré unité, par exemple 1 cm².",
  },
  figure: {
    schema: figureSurface,
    legende: "Le tour en rouge, c'est le périmètre. L'intérieur en bleu, c'est l'aire.",
  },
  proprietes: [
    {
      titre: "Une aire s'écrit avec un petit ²",
      micros: ["aire_comprendre"],
      texte: "15 cm² est une aire. 15 cm est une longueur. Le petit ² veut dire : des carrés.",
      schema: tableauEcritures,
    },
    {
      titre: "L'unité est un carré",
      micros: ["aire_comprendre"],
      texte: "1 cm² est l'aire d'un carré de 1 cm de côté. De même, 1 m² est un carré de 1 m de côté.",
      schema: carreUnCm,
    },
    {
      titre: "Je compte les carreaux",
      micros: ["aire_compter"],
      texte: "Sur un quadrillage, l'aire est le nombre de carreaux recouverts. Ici, 5 carreaux : l'aire vaut 5.",
      schema: compter5,
    },
    {
      titre: "1 dm² = 100 cm²",
      micros: ["aire_convertir"],
      texte: "Un carré de 1 dm de côté mesure 10 cm sur 10 cm. Il contient 10 × 10 = 100 carrés de 1 cm².",
      schema: centCarres,
    },
  ],
  reel: {
    texte:
      "On mesure une aire quand on veut couvrir une surface. Combien de carrelage pour la cuisine ? Combien de gazon pour un terrain de foot ? Le terrain se mesure en m², une grande forêt en km².",
  },
  historique: {
    texte:
      "Le mètre carré est né avec le mètre, en France, pendant la Révolution. Avant, chaque région avait ses unités de surface. L'arpent de Paris ne valait pas l'arpent d'une autre ville. Le système métrique a mis tout le monde d'accord.",
  },
  methode: [
    {
      titre: "Le tour ou l'intérieur ?",
      micros: ["aire_comprendre"],
      texte: "Le tour, c'est le périmètre, en cm. L'intérieur, c'est l'aire, en cm².",
      schema: rectangle54,
    },
    {
      titre: "Je compte par rangées",
      micros: ["aire_compter"],
      texte: "Des carreaux bien rangés ? Je compte une rangée, puis je multiplie. 3 rangées de 4 : 12 carreaux.",
      schema: rangees,
    },
    {
      titre: "Je convertis avec 100",
      micros: ["aire_convertir"],
      texte: "Vers une unité plus petite, le nombre grandit : × 100. Vers une unité plus grande, il diminue : ÷ 100.",
      schema: tableauSens,
    },
  ],
  usages: [
    {
      titre: "Une grande surface",
      micros: ["aire_comprendre"],
      detail: "Pour un jardin ou un terrain de foot, on compte en m². 1 m², c'est un carré de 1 m de côté.",
      schema: carreUnM,
    },
    {
      titre: "Une figure sans forme connue",
      micros: ["aire_compter"],
      detail: "Même sans forme connue, je compte les carreaux. Ici, 9 carreaux : l'aire vaut 9.",
      schema: compter9,
    },
    {
      titre: "Vers une unité plus grande",
      micros: ["aire_convertir"],
      detail: "Il faut 100 cm² pour faire 1 dm². Donc 370 cm² = 370 ÷ 100 = 3,7 dm².",
      schema: unCentieme,
    },
  ],
  exemples: [
    {
      titre: "Des m² vers les dm²",
      micros: ["aire_convertir"],
      donnees: "Une table a une aire de 3,7 m².",
      question: "Combien cela fait-il en dm² ?",
      schema: barre370,
      solution:
        "1 m² = 100 dm². Je vais vers une unité plus petite : le nombre grandit. 3,7 × 100 = 370. La table mesure 370 dm².",
    },
    {
      titre: "Le piège du × 10",
      micros: ["aire_convertir"],
      donnees: "Un élève écrit : 5 m² = 50 dm².",
      question: "A-t-il raison ?",
      schema: tableauLongueurAire,
      solution:
        "Non. × 10, c'est pour les longueurs : 1 m = 10 dm. Un carré de 1 m de côté contient 10 × 10 = 100 dm². Donc 5 m² = 5 × 100 = 500 dm².",
    },
    {
      titre: "Compter les carreaux",
      micros: ["aire_compter", "aire_comprendre"],
      donnees: "Un carreau mesure 1 cm². Une figure recouvre les carreaux du dessin.",
      question: "Quelle est son aire ?",
      schema: compter12,
      solution:
        "Je compte rangée par rangée : 3 + 4 + 4 + 1 = 12 carreaux. Chaque carreau vaut 1 cm². L'aire est 12 cm².",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« 15 cm² » est-il une longueur, une aire ou une masse ?",
      correction: "Une aire : le petit ² veut dire « centimètre carré ».",
      micros: ["aire_comprendre"],
    },
    {
      question: "Une surface couvre 2 rangées de 6 carreaux unités. Quelle est son aire ?",
      correction: "2 × 6 = 12 carreaux. L'aire vaut 12 unités d'aire.",
      micros: ["aire_compter"],
    },
    {
      question: "Un carré de 1 dm de côté est découpé en carrés de 1 cm de côté. Combien en obtient-on ?",
      correction: "1 dm = 10 cm. Il y a 10 rangées de 10 carrés : 10 × 10 = 100. Donc 1 dm² = 100 cm².",
      micros: ["aire_convertir"],
    },
    {
      question: "Convertis 4,5 dm² en cm².",
      correction: "1 dm² = 100 cm². Unité plus petite, le nombre grandit : 4,5 × 100 = 450 cm².",
      micros: ["aire_convertir"],
    },
    {
      question: "Que représente 1 km² ?",
      correction: "C'est l'aire d'un carré de 1 km de côté. En 6e, on le connaît, mais on ne le convertit pas.",
      micros: ["aire_comprendre"],
    },
  ],
  tiMargo: {
    objectif: "Le tour, c'est le périmètre. Dedans, c'est l'aire !",
    definition: "Une aire se mesure en CARRÉS !",
    methode: "Unité plus petite : le nombre grandit.",
    pieges: "× 100, pas × 10 ! Et n'oublie pas le petit ² !",
    exercice: "1 dm² = 100 cm² : pense au carré découpé.",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX.
// Chaque diapo porte son dessin ; Ti Margo parle sur cinq d'entre elles.
export const slidesAireUnite6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "L'aire et ses unités - 6e",
    teinte: "objectif",
    schema: avecMargo(figureSurface, "Le tour, c'est le périmètre. Dedans, c'est l'aire !"),
    section: {
      type: "objectif",
      phrase: "L'aire, c'est la place à l'intérieur",
      sousPhrase: "On la mesure en comptant des petits carrés.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: carreUnM,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Du carrelage pour la cuisine, du gazon pour un terrain : on couvre une surface.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "Le mètre carré est né avec le mètre, pendant la Révolution française.",
      },
    },
  },
  {
    titre: "L'unité d'aire",
    badge: "Définition",
    teinte: "definition",
    schema: avecMargo(carreUnCm, "Une aire se mesure en CARRÉS !", "joie"),
    section: {
      type: "objectif",
      phrase: "1 cm² = l'aire d'un carré de 1 cm de côté",
      sousPhrase: "15 cm² est une aire. 15 cm est une longueur.",
    },
  },
  {
    titre: "Compter les carreaux",
    badge: "Propriété",
    teinte: "propriete",
    schema: compter5,
    section: {
      type: "objectif",
      phrase: "L'aire = le nombre de carreaux",
      sousPhrase: "Ici, 5 carreaux : l'aire vaut 5.",
    },
  },
  {
    titre: "Par rangées",
    badge: "Méthode",
    teinte: "methode",
    schema: rangees,
    section: {
      type: "objectif",
      phrase: "3 rangées de 4 : 3 × 4 = 12",
      sousPhrase: "Je compte une rangée, puis je multiplie.",
    },
  },
  {
    titre: "La règle du 100",
    badge: "À connaître par cœur",
    teinte: "propriete",
    schema: avecMargo(centCarres, "× 100, pas × 10 !", "attention"),
    section: {
      type: "objectif",
      phrase: "1 dm² = 100 cm²",
      sousPhrase: "Et 1 m² = 100 dm². Le carré a 10 rangées de 10.",
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Des m² vers les dm²",
    teinte: "exemple",
    schema: barre370,
    section: {
      type: "exemple",
      enonce: "Une table a une aire de 3,7 m².",
      question: "Combien cela fait-il en dm² ?",
      correction: "Unité plus petite : le nombre grandit. 3,7 × 100 = 370 dm².",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(tableauLongueurAire, "N'oublie pas le petit ² !", "attention"),
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
    schema: avecMargo(tableauSens, "Unité plus petite : le nombre grandit."),
    section: {
      type: "exercice",
      enonce: "Une affiche mesure 4,5 dm².",
      question: "Combien cela fait-il en cm² ?",
      indice: "1 dm² = 100 cm².",
      correction: "4,5 × 100 = 450 cm².",
    },
  },
];
