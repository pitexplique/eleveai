// ─── Fiche de cours : les périmètres (4e) ─────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/perimetres.bank.ts, notionId aire_perimetre).
//
// ⭐ PREMIÈRE DES TROIS FICHES DE GRANDEURS, qui s'enchaînent : périmètre → aire
// → volume. Le tour d'une figure, puis sa surface, puis son volume. Les trois
// partagent `figure_libre`, et c'est voulu : le MÊME quadrillage peut porter le
// contour et le carrelage, donc le périmètre et l'aire, sans changer d'objet.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment :
//   aire_perimetre_comprendre → « le périmètre correspond… » → À LA LONGUEUR DE
//        SON CONTOUR ; « pour calculer un périmètre on fait surtout… » → UNE
//        ADDITION de longueurs ; « quelle unité ? » → cm, et non cm² ; et
//        « si on double toutes les longueurs, le périmètre est multiplié par… »
//        → 2.
//   aire_perimetre_rectangle → 8 et 3 → 22 ; 7 et 5 → 24 ; et le sens inverse :
//        périmètre 30, largeur 6 → longueur 9.
//   aire_perimetre_carre     → côté 6 → 24 ; côté 9 → 36 ; côté 12 → 48 ; et
//        l'inverse : périmètre 28 → côté 7.
//   aire_perimetre_triangle  → 5 + 7 + 8 = 20 ; équilatéral, isocèle ; et
//        l'inverse : périmètre 20, deux côtés 6 et 7 → le troisième vaut 7.
//   aire_perimetre_figure    → ⭐ « les côtés situés à l'INTÉRIEUR (cachés)… »
//        → NE COMPTENT PAS. Un carré de 5 et un rectangle 5 × 3 accolés par
//        leur côté de 5 ont un périmètre extérieur de 26, et non de 36.
//   aire_perimetre_probleme  → clôture, bordure, plinthes ; 2 tours d'une piste
//        de 30 m sur 20 m → 200 m ; et le coût au mètre.
//   aire_perimetre_defi      → ⚠️ le nom ne dit pas le contenu. Ce sont les
//        confusions périmètre/aire, et DEUX énoncés se répondent (voir plus bas).
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ LE CONTRE-EXEMPLE EST DONNÉ PAR LA BANQUE EN DEUX MORCEAUX, et il suffit de
// les rapprocher :
//     « Un carré de côté 5 cm et un rectangle de 7 cm sur 3 cm ont-ils le même
//       périmètre ? » → OUI (20 cm tous les deux)
//     « Deux rectangles ont le même périmètre de 20 cm. Ont-ils forcément la
//       même aire ? » → NON
// Mis côte à côte, ils donnent la figure la plus utile de la fiche : deux formes
// dont le contour est rigoureusement égal et la surface non — 25 carreaux contre
// 21, qu'on COMPTE. C'est aussi ce que dit le problème de Didon, dans l'histoire.
//
// Le choix des dessins :
//   · le contour qu'on suit du doigt, et les carreaux qu'on compte
//                                              → `figure_libre`, trois fois, et
//     trois objets différents (la figure en L, le rectangle, les deux formes
//     comparées) ;
//   · ce qui distingue périmètre et aire, mot à mot → `tableau_donnees` ;
//   · remonter du périmètre à un côté             → `calcul_pose` (division).
//
// ⭐ ET `figure_libre` FAIT ICI CE QU'AUCUN AUTRE CANVAS NE SAIT FAIRE :
// `showPerimeter` sans `perimeterPath` trace le contour AUTOMATIQUEMENT, arête
// par arête, en ne gardant que celles qui n'ont pas de voisine remplie. Sur deux
// formes séparées, il trace deux contours ; sur deux formes accolées, il saute
// le côté commun tout seul. La propriété « les côtés cachés ne comptent pas »
// n'est donc pas illustrée par le dessin : elle est FAITE par lui.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#dbeafe";

/** Un dessin et sa phrase, sous lui. La phrase passe par `TexteMath` — les
 *  libellés à l'intérieur du dessin, tracés en `<text>` SVG, restent en clair. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// LA FIGURE EN L — le périmètre comme un TRAJET. Le quadrillage est visible ici
// (contrairement aux fiches d'algèbre, où il aurait fait croire qu'on connaît
// x) : chaque carreau mesure 1 unité, donc le contour rouge SE COMPTE, segment
// par segment. C'est la définition rendue tangible avant d'être énoncée.
// ⚠️ RÉUTILISÉ DANS DES BLOCS DE LARGEURS DIFFÉRENTES → une FONCTION qui prend
// le cadre : 6 colonnes × 32 + 2 × 18 = 228 pour une carte.
const figureL = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 4,
        cols: 6,
        // Un L : une barre verticale de 4 sur 2, et un pied de 2 sur 3.
        filledCells: [
          [0, 0], [0, 1],
          [1, 0], [1, 1],
          [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
          [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
        ],
      },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
        showVertices: false,
        showVertexLabels: false,
      },
      colors: { filled: BLEU },
    }}
  />
);

// LE RECTANGLE, ET POURQUOI LA FORMULE EST UNE ADDITION DÉGUISÉE. 8 et 3 sont
// les nombres du QCM de la banque : le contour vaut 8 + 3 + 8 + 3 = 22, et
// « 2 × (L + l) » n'est qu'une façon plus rapide d'écrire cette somme.
// ⚠️ Les deux étiquettes sont posées à l'INTÉRIEUR : un libellé de sommet est
// tracé à +8 / −8 de son point, donc un point de la ligne 0 sortirait du cadre
// par le haut. On vise l'intérieur de la figure, jamais son bord supérieur.
const rectangle83 = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 3,
        cols: 8,
        filledCells: Array.from({ length: 3 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => [r, c] as [number, number])
        ).flat(),
      },
      vertices: { "L = 8": [0.9, 2.4], "l = 3": [2.4, 0.3] },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
        showVertices: false,
        showVertexLabels: true,
      },
      colors: { filled: BLEU },
    }}
  />
);

// ⭐ LES CÔTÉS CACHÉS, ET LE CANVAS QUI LES SUPPRIME TOUT SEUL. Un carré de 5 et
// un rectangle 5 × 3 collés par leur côté de 5. Comptés séparément, leurs
// contours font 20 + 16 = 36. Mais le côté commun n'est plus sur le tour : il
// reste 26, le nombre exact du QCM de la banque.
// ⭐ Le contour rouge n'est PAS dessiné à la main : `buildPerimeterSegments` ne
// garde que les arêtes sans voisine remplie, donc il saute le côté collé de
// lui-même. Le dessin fait la propriété au lieu de l'illustrer.
const deuxAccoles = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 5,
        cols: 8,
        filledCells: Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 8 }, (_, c) => [r, c] as [number, number])
        ).flat(),
      },
      vertices: { "5 × 5": [2.2, 1.0], "5 × 3": [2.2, 5.2] },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
        showVertices: false,
        showVertexLabels: true,
      },
      colors: { filled: BLEU },
    }}
  />
);

// ⭐⭐ LE CONTRE-EXEMPLE DE LA FICHE. Deux formes séparées : un carré de 5 et un
// rectangle de 7 sur 3. Leurs contours mesurent exactement la même chose — 20 —
// et leurs surfaces non : 25 carreaux contre 21, qu'on compte à l'œil. Le
// quadrillage est indispensable ici : c'est lui qui rend la différence d'aire
// visible alors que l'égalité des périmètres, elle, ne se voit pas.
// ⭐ Deux formes disjointes → `buildPerimeterSegments` trace DEUX contours
// séparés, sans qu'on ait rien à décrire.
const memePerimetre = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 5,
        cols: 13,
        filledCells: [
          // le carré 5 × 5, à gauche — aire 25
          ...Array.from({ length: 5 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => [r, c] as [number, number])
          ).flat(),
          // le rectangle 7 × 3, à droite — aire 21
          ...Array.from({ length: 3 }, (_, r) =>
            Array.from({ length: 7 }, (_, c) => [r, c + 6] as [number, number])
          ).flat(),
        ],
      },
      vertices: { "25": [2.2, 1.8], "21": [1.7, 8.6] },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: true,
        showVertices: false,
        showVertexLabels: true,
      },
      colors: { filled: BLEU },
    }}
  />
);

// ⚠️ LE TABLEAU QUI RÈGLE LA CONFUSION DE TOUTE LA NOTION. La banque y consacre
// un QCM entier (« quelle est la différence entre périmètre et aire ? ») et un
// autre sur l'unité (cm, et non cm²). Trois lignes suffisent, et la légende
// donne le même carré vu des deux façons.
const tableauPerimetreAire = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["on compare", "le périmètre", "l'aire"],
      rows: [
        { values: ["ce qu'on mesure", "le contour", "la surface"] },
        { values: ["ce qu'on fait", "on additionne", "on multiplie"] },
        { values: ["l'unité", "cm", "cm²"] },
      ],
      highlight: { row: 2 },
      caption: "un carré de 6 cm : P = 24 cm, mais A = 36 cm²",
      display: { compact: true, striped: true },
    }}
  />
);

// TROIS ÉCRITURES, UNE SEULE IDÉE. Les formules ne sont pas trois règles à
// retenir : ce sont trois raccourcis de la même addition. Les exemples sont ceux
// de la banque, à l'unité près.
const tableauFormules = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["la figure", "son périmètre", "un exemple"],
      rows: [
        { values: ["rectangle", "2 × (L + l)", "8 et 3 → 22 cm"] },
        { values: ["carré", "4 × c", "côté 6 → 24 cm"] },
        { values: ["triangle", "a + b + c", "5, 7 et 8 → 20 cm"] },
      ],
      caption: "toutes se ramènent à additionner le tour",
      display: { compact: true, striped: true },
    }}
  />
);

// REMONTER DU PÉRIMÈTRE À UN CÔTÉ. Le carré est le seul cas où l'on divise
// directement : quatre côtés égaux, donc le côté vaut le périmètre divisé par 4.
// 28 et 7 sont les nombres de la banque.
const calculCote = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["28", "4"],
      division: { dividende: "28", diviseur: "4", quotient: "7", reste: "0" },
      display: { showResult: true, compact: true },
      questionLabel: "P = 28 cm donc le côté vaut 28 ÷ 4",
    }}
  />
);

// LE PÉRIMÈTRE SE PAIE AU MÈTRE. Un enclos carré de 12 m de côté demande 48 m de
// clôture ; à 5 € le mètre, la facture est de 240 €. C'est la forme la plus
// fréquente des problèmes de la banque — et la raison pour laquelle un artisan
// calcule un périmètre avant de faire un devis.
const calculPrix = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["48", "5"],
      result: "240",
      display: { showResult: true, compact: true },
      questionLabel: "48 m de clôture à 5 € le mètre",
    }}
  />
);

const pieges = [
  "Confondre périmètre et aire : le périmètre est le CONTOUR, l'aire est la SURFACE. Un carré de 6 cm a un périmètre de 24 cm et une aire de 36 cm² — deux nombres différents, et deux unités différentes.",
  "Compter les côtés cachés d'une figure composée : quand deux morceaux sont collés, le côté commun n'est plus sur le tour. Un carré de 5 et un rectangle 5 × 3 accolés donnent 26 cm, et non 36.",
  "Croire que même périmètre veut dire même aire : un carré de 5 cm et un rectangle de 7 cm sur 3 cm ont tous deux 20 cm de périmètre, mais 25 cm² et 21 cm² d'aire.",
];

const aRetenir = [
  "Le périmètre d'une figure est la longueur de son contour. On l'obtient en additionnant les longueurs de tous ses côtés, et il se mesure en cm, m ou km — jamais en cm².",
  "Les formules ne sont que des raccourcis de cette addition : 2 × (L + l) pour le rectangle, 4 × c pour le carré, la somme des trois côtés pour le triangle.",
  "Sur une figure composée, seuls les côtés extérieurs comptent. Et deux figures de même périmètre n'ont aucune raison d'avoir la même aire.",
];

export const fichePerimetres4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "aire-perimetre",
  titre: "Les périmètres",
  accroche:
    "Le périmètre, c'est la longueur du trajet qu'on parcourt en faisant le tour d'une figure sans jamais couper à travers. On l'obtient en additionnant — et les formules qu'on apprend ne sont que des façons plus rapides d'écrire cette addition. Tout se joue sur un mot : le CONTOUR, et non la surface.",
  identite: [
    { label: "Le mot clé", valeur: "Le contour : la longueur du tour" },
    { label: "Le geste", valeur: "On additionne les côtés" },
    { label: "La règle d'or", valeur: "Des cm, jamais des cm²" },
  ],
  definition: {
    texte:
      "Le périmètre d'une figure est la longueur de son contour, c'est-à-dire de la ligne fermée qui en fait le tour. On l'obtient en additionnant les longueurs de tous les côtés. C'est une LONGUEUR : il se mesure en millimètres, centimètres, mètres ou kilomètres — jamais en $\\text{cm}^2$, qui est l'unité d'une aire. ⚠️ Ne pas confondre : l'aire mesure la surface qu'on remplit, le périmètre mesure la ficelle qu'il faudrait pour en faire le tour.",
  },
  figure: {
    schema: legende(
      figureL(32, 18),
      "chaque carreau mesure 1 unité : on compte le trait rouge"
    ),
    legende:
      "Le périmètre est la longueur du trait rouge, et rien d'autre. Ici, en suivant le contour segment par segment, on trouve 18 unités. Les 14 carreaux bleus, eux, comptent l'AIRE — c'est une autre question.",
  },
  proprietes: [
    {
      titre: "Le contour, pas la surface",
      micros: ["aire_perimetre_comprendre"],
      texte:
        "Le périmètre se calcule par une ADDITION de longueurs, et il s'exprime en cm. L'aire, elle, se calcule par une multiplication et s'exprime en $\\text{cm}^2$. Deux grandeurs, deux gestes, deux unités.",
      schema: tableauPerimetreAire,
    },
    {
      titre: "Une addition déguisée",
      micros: ["aire_perimetre_rectangle", "aire_perimetre_carre"],
      texte:
        "Pour un rectangle de 8 sur 3, le tour vaut $8 + 3 + 8 + 3 = 22$. La formule $2 \\times (L + l)$ dit exactement la même chose, en plus court. Pour le carré, les quatre côtés sont égaux : $P = 4 \\times c$.",
      schema: rectangle83(24, 18),
    },
    {
      titre: "Les côtés cachés ne comptent pas",
      micros: ["aire_perimetre_figure"],
      texte:
        "Un carré de 5 et un rectangle $5 \\times 3$ collés par leur côté de 5 : séparément leurs contours font $20 + 16 = 36$, mais le côté commun n'est plus sur le tour. Le périmètre extérieur vaut 26.",
      schema: deuxAccoles(24, 18),
    },
    {
      titre: "Même périmètre, aires différentes",
      micros: ["aire_perimetre_defi"],
      texte:
        "Un carré de 5 cm et un rectangle de 7 cm sur 3 cm ont tous deux un périmètre de 20 cm. Pourtant l'un contient 25 carreaux et l'autre 21. Le périmètre ne dit RIEN de l'aire.",
      schema: memePerimetre(16, 10),
    },
  ],
  reel: {
    texte:
      "On calcule un périmètre chaque fois qu'on achète quelque chose qui se vend au mètre et qui fait le tour : le grillage d'un terrain, la bordure d'un parterre, les plinthes d'une pièce, la baguette d'un cadre, le joint d'une fenêtre. C'est le premier calcul d'un devis d'artisan — un enclos carré de 12 m de côté demande 48 m de clôture, et à 5 € le mètre la facture est de 240 €. C'est aussi ce qu'on parcourt : deux tours d'une piste de 30 m sur 20 m font 200 m. Et à La Réunion, le fameux « tour de l'île » par la route littorale n'est rien d'autre qu'un périmètre — celui d'une figure dont personne ne connaît la formule.",
  },
  historique: {
    texte:
      "Le mot vient du grec « perimetron » : « peri », autour, et « metron », mesure — littéralement la mesure du tour. Et la plus vieille histoire de mathématiques qu'on connaisse porte précisément sur la différence entre périmètre et aire : selon la légende, la reine Didon obtint, pour fonder Carthage, autant de terre qu'elle pourrait en entourer avec une peau de bœuf. Elle la découpa en lanières très fines, les mit bout à bout, et chercha la forme qui, à longueur de contour FIXÉE, enferme la plus grande surface. La réponse est le cercle — et c'est pourquoi le problème s'appelle aujourd'hui encore « le problème de Didon ».",
  },
  formule: {
    contexte: "Les périmètres à connaître",
    expression:
      "rectangle : $P = 2 \\times (L + l)$   ·   carré : $P = 4 \\times c$   ·   cercle : $P = 2 \\times \\pi \\times r$",
    legende:
      "Aucune n'est à croire sur parole : $2 \\times (L + l)$ n'est qu'une écriture rapide de $L + l + L + l$. ⭐ Et si l'on double toutes les longueurs d'une figure, son périmètre est multiplié par 2 — pas par 4, qui est le facteur de l'aire.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : le rectangle 8 × 3, deux blocs
    // plus haut, montre déjà que la formule est une addition. Un dessin qui redit
    // le texte n'apprend rien (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Faire le tour",
      micros: ["aire_perimetre_comprendre", "aire_perimetre_figure"],
      texte:
        "On part d'un sommet et on suit le contour du doigt jusqu'à revenir au départ, en notant chaque longueur au passage. Rien de ce qui est à l'intérieur ne compte. C'est la méthode qui marche sur TOUTES les figures, même celles qui n'ont pas de formule.",
      schema: figureL(32, 18),
    },
    {
      titre: "Ou prendre le raccourci",
      micros: ["aire_perimetre_rectangle", "aire_perimetre_carre", "aire_perimetre_triangle"],
      texte:
        "Si la figure est usuelle, la formule évite d'écrire l'addition en entier. Rectangle : $2 \\times (L + l)$. Carré : $4 \\times c$. Triangle : la somme de ses trois côtés, sans raccourci possible — sauf s'il est équilatéral.",
      schema: tableauFormules,
    },
    {
      titre: "Remonter à un côté",
      micros: ["aire_perimetre_probleme"],
      texte:
        "Le périmètre peut être la donnée et le côté la question. Pour un carré, on divise par 4. Pour un rectangle dont on connaît une dimension, on divise d'abord le périmètre par 2, puis on soustrait.",
      schema: calculCote,
    },
  ],
  usages: [
    {
      titre: "Clôturer un terrain",
      micros: ["aire_perimetre_rectangle", "aire_perimetre_probleme"],
      detail:
        "Un terrain de 8 m sur 3 m demande $2 \\times (8 + 3) = 22$ m de grillage. Le périmètre est la longueur à commander — l'aire ne servirait à rien ici.",
      schema: rectangle83(24, 18),
    },
    {
      titre: "Payer au mètre",
      micros: ["aire_perimetre_probleme"],
      detail:
        "Un enclos carré de 12 m de côté : $4 \\times 12 = 48$ m de clôture. À 5 € le mètre, cela fait 240 €. Le périmètre se convertit directement en facture.",
      schema: calculPrix,
    },
    {
      titre: "Comparer deux formes",
      micros: ["aire_perimetre_defi"],
      detail:
        "À longueur de clôture égale, la forme du terrain change la surface qu'on enferme. C'est pourquoi un même grillage n'enclôt pas toujours la même quantité de terre.",
      schema: memePerimetre(16, 10),
    },
  ],
  exemples: [
    {
      titre: "Le périmètre d'un rectangle",
      micros: ["aire_perimetre_rectangle"],
      donnees: "Un rectangle mesure 8 cm de longueur et 3 cm de largeur.",
      question: "Quel est son périmètre ?",
      schema: rectangle83(22, 16),
      solution:
        "En faisant le tour : $8 + 3 + 8 + 3 = 22$ cm. Avec la formule : $2 \\times (8 + 3) = 2 \\times 11 = 22$ cm. Les deux chemins donnent le même résultat, parce que la formule EST cette addition. ⚠️ Le résultat s'écrit en cm, pas en $\\text{cm}^2$ : c'est une longueur.",
    },
    {
      titre: "Une figure composée",
      micros: ["aire_perimetre_figure"],
      donnees: "Un carré de 5 cm de côté et un rectangle de 5 cm sur 3 cm sont collés par leur côté de 5 cm.",
      question: "Quel est le périmètre de la figure obtenue ?",
      schema: deuxAccoles(22, 16),
      solution:
        "Le réflexe faux est d'additionner les deux périmètres : $20 + 16 = 36$ cm. Or le côté collé, 5 cm, n'est plus sur le contour — et il disparaît DEUX fois, une pour chaque figure. On retire donc $2 \\times 5 = 10$ : $36 - 10 = 26$ cm. On peut aussi faire le tour directement : la figure obtenue est un rectangle de 8 cm sur 5 cm, donc $2 \\times (8 + 5) = 26$ cm. ✅",
    },
    {
      titre: "Même tour, pas même surface",
      micros: ["aire_perimetre_defi"],
      donnees: "Un carré de 5 cm de côté, et un rectangle de 7 cm sur 3 cm.",
      question: "Ont-ils le même périmètre ? La même aire ?",
      schema: memePerimetre(15, 6.5),
      solution:
        "Les périmètres : $4 \\times 5 = 20$ cm pour le carré, et $2 \\times (7 + 3) = 20$ cm pour le rectangle. Ils sont ÉGAUX. Les aires : $5 \\times 5 = 25\\ \\text{cm}^2$ contre $7 \\times 3 = 21\\ \\text{cm}^2$. Elles sont différentes, et le dessin le montre — on compte 25 carreaux d'un côté, 21 de l'autre. ⭐ Conclusion : connaître le périmètre ne permet jamais de déduire l'aire. C'est exactement la question que se posait Didon devant Carthage.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Le périmètre d'une figure correspond à quoi, et dans quelle unité s'exprime-t-il ?",
      correction:
        "À la longueur de son contour, c'est-à-dire du tour de la figure. C'est une longueur : elle s'exprime en cm, m ou km. ⚠️ Pas en $\\text{cm}^2$, qui est l'unité de l'aire.",
      micros: ["aire_perimetre_comprendre"],
    },
    {
      question: "Calculer le périmètre d'un rectangle de longueur 8 cm et de largeur 3 cm.",
      correction:
        "$2 \\times (8 + 3) = 2 \\times 11 = 22$ cm. On peut aussi additionner les quatre côtés : $8 + 3 + 8 + 3 = 22$ cm.",
      micros: ["aire_perimetre_rectangle"],
    },
    {
      question: "Un carré a un périmètre de 28 cm. Quelle est la longueur de son côté ?",
      correction:
        "7 cm. Les quatre côtés d'un carré sont égaux, donc $c = 28 \\div 4 = 7$. Vérification : $4 \\times 7 = 28$. ✅",
      micros: ["aire_perimetre_carre"],
    },
    {
      question: "Calculer le périmètre d'un triangle dont les côtés mesurent 5 cm, 7 cm et 8 cm.",
      correction:
        "$5 + 7 + 8 = 20$ cm. Le triangle n'a pas de formule raccourcie : on additionne ses trois côtés, tout simplement.",
      micros: ["aire_perimetre_triangle"],
    },
    {
      question: "Une figure est formée d'un carré de côté 5 cm et d'un rectangle accolé de 5 cm sur 3 cm, le côté commun mesurant 5 cm. Quel est le périmètre extérieur ?",
      correction:
        "26 cm. Les côtés situés à l'intérieur ne comptent pas : la figure obtenue est un rectangle de 8 cm sur 5 cm, donc $2 \\times (8 + 5) = 26$ cm. ⚠️ La réponse 36 cm additionne les deux périmètres sans retirer le côté collé.",
      micros: ["aire_perimetre_figure"],
    },
    {
      question: "On fait 2 tours d'une piste rectangulaire de 30 m sur 20 m. Quelle distance parcourt-on ?",
      correction:
        "Un tour vaut $2 \\times (30 + 20) = 100$ m, donc deux tours font 200 m. Le périmètre est bien la distance d'UN tour.",
      micros: ["aire_perimetre_probleme"],
    },
    {
      question: "Deux rectangles ont le même périmètre de 20 cm. Ont-ils forcément la même aire ?",
      correction:
        "Non. Un carré de 5 cm sur 5 cm et un rectangle de 7 cm sur 3 cm ont tous deux 20 cm de périmètre, mais leurs aires valent $25\\ \\text{cm}^2$ et $21\\ \\text{cm}^2$. Le périmètre ne détermine pas l'aire.",
      micros: ["aire_perimetre_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesPerimetres4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Périmètres - 4e",
    section: {
      type: "objectif",
      phrase: "La longueur du tour, et rien d'autre",
      sousPhrase:
        "Le périmètre est le contour d'une figure. On l'obtient en additionnant les longueurs de tous ses côtés.",
      encadre: {
        titre: "L'idée",
        texte: "Des cm, jamais des cm² : c'est une longueur, pas une surface.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Tout ce qui se vend au mètre et fait le tour : grillage, bordure, plinthes, baguette d'un cadre. Un enclos carré de 12 m de côté demande 48 m de clôture — à 5 € le mètre, 240 €.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Pour fonder Carthage, la reine Didon obtint autant de terre qu'elle pourrait en entourer d'une peau de bœuf. Elle la découpa en fines lanières et chercha la forme qui, à contour fixé, enferme le plus de surface. C'est le cercle — et ça s'appelle encore « le problème de Didon ».",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Même périmètre ne veut pas dire même aire",
      sousPhrase:
        "Un carré de 5 cm et un rectangle de 7 cm sur 3 cm ont tous deux 20 cm de périmètre. Mais 25 cm² et 21 cm² d'aire.",
      encadre: {
        titre: "Le test",
        texte: "Dessine les deux sur un quadrillage et compte les carreaux : 25 d'un côté, 21 de l'autre.",
      },
    },
  },
  {
    titre: "Les périmètres à connaître",
    badge: "3 formules",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rectangle : 2 × (L + l)", texte: "8 et 3 donnent 22 cm. C'est 8 + 3 + 8 + 3, en plus court." },
        { titre: "Carré : 4 × c", texte: "Côté 6, périmètre 24 cm. Les quatre côtés sont égaux." },
        { titre: "Triangle : a + b + c", texte: "5, 7 et 8 donnent 20 cm. Aucun raccourci, on additionne." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePerimetres4e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: fichePerimetres4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Les côtés cachés",
    section: {
      type: "exemple",
      enonce: "Un carré de 5 cm et un rectangle de 5 cm sur 3 cm sont collés par leur côté de 5 cm.",
      question: "Quel est le périmètre de la figure ?",
      correction:
        "26 cm, et non 36. Le côté collé disparaît deux fois : 20 + 16 − 2 × 5 = 26. La figure est un rectangle de 8 sur 5.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
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
    section: {
      type: "exercice",
      enonce: "Un carré a un périmètre de 28 cm.",
      question: "Quelle est la longueur de son côté ?",
      indice: "Les quatre côtés d'un carré sont égaux.",
      correction: "28 ÷ 4 = 7 cm. Vérification : 4 × 7 = 28.",
    },
  },
];
