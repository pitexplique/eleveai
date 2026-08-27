// ─── Fiche de cours : les aires (4e) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/aires.bank.ts, notionId aire_surface).
//
// ⭐ DEUXIÈME DES TROIS FICHES DE GRANDEURS : périmètre → aire → volume. Et elle
// est écrite comme le PENDANT de la fiche des périmètres, pas comme une notion
// indépendante : les deux premiers dessins sont LES MÊMES que là-bas, avec la
// question retournée. Sur la figure en L, on comptait le trait rouge (18) ; ici
// on compte les carreaux (14). Sur le rectangle 8 × 3, le contour valait 22 ;
// ici la surface vaut 24. Même figure, autre grandeur — c'est la deuxième parade
// de REGLES.md, et c'est aussi la seule façon de tuer la confusion pour de bon.
// ⚠️ Le contour rouge est donc ÉTEINT ici (`showPerimeter: false`) : le regard
// doit aller à l'intérieur, pas au bord.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment :
//   aire_comprendre       → « l'aire correspond… » → À LA SURFACE QU'ELLE OCCUPE ;
//        l'unité est le cm², on parle d'« unités carrées » ; 1 m² = 10 000 cm² ;
//        ⭐ et « si on double toutes les longueurs, l'aire est multipliée par… »
//        → 4, là où le périmètre, lui, ne l'est que par 2.
//   aire_rectangle        → 8 × 3 → 24 ; 9 × 4 → 36 ; et l'inverse : aire 36,
//        longueur 9 → largeur 4.
//   aire_carre            → côté 6 → 36 ; côté 8 → 64 ; aire 81 → côté 9 ;
//        ⭐ et un QCM entier sur « un carré de 5 cm : aire 25 cm² ET périmètre
//        20 cm » — la banque elle-même relie les deux fiches.
//   aire_triangle         → base 10, hauteur 4 → 20 ; base 12, hauteur 5 → 30 ;
//        « pourquoi divise-t-on par 2 ? » → parce que c'est la MOITIÉ d'un
//        rectangle ; et l'erreur : base 10, hauteur 6 → 60 est FAUX (c'est 30).
//   aire_parallelogramme  → base 8, hauteur 5 → 40 ; base 9, hauteur 6 → 54 ;
//        ⭐ « pourquoi la hauteur et non le côté incliné ? »
//   aire_figure           → « pour une figure composée, on la DÉCOUPE en figures
//        simples et on additionne » ; rectangle 6 × 4 plus triangle de base 6 et
//        de hauteur 3 → 33 ; et le cas soustractif, un carré découpé dedans.
//   aire_probleme         → terrasse, panneau triangulaire, pièce à carreler.
//   aire_defi             → ⚠️ le nom ne dit pas le contenu : deux erreurs et
//        une réciproque (voir ci-dessous).
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ DEUX CONTRE-EXEMPLES, ET LE SECOND EST LA RÉCIPROQUE EXACTE DE LA FICHE
// PRÉCÉDENTE :
//   ① « Un élève affirme que l'aire d'un parallélogramme se calcule avec son
//      CÔTÉ incliné. » → non : c'est la hauteur. Le dessin le prouve en posant
//      le rectangle de même aire sur la même base.
//   ② « Deux figures différentes peuvent-elles avoir la même aire ? » → OUI.
//      La fiche des périmètres montrait deux formes de même contour et d'aires
//      différentes ; celle-ci montre deux formes de même aire et de contours
//      différents. Les deux dessins se répondent — 16 carreaux chacun, 16 cm et
//      20 cm de tour. C'est la même vérité prise par l'autre bout.
//
// Le choix des dessins : `figure_libre` porte six objets différents, et c'est le
// canvas des aires — lui seul carrèle une surface ET trace un contour libre par
// `perimeterPath`, ce qui permet de dessiner un triangle ou un parallélogramme
// sur un quadrillage qui, lui, n'a que des cases carrées.

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

/** Les cases pleines d'un rectangle posé à partir de (row0, col0). */
const pave = (rows: number, cols: number, row0 = 0, col0 = 0) =>
  Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => [r + row0, c + col0] as [number, number])
  ).flat();

// ⭐ LA MÊME FIGURE EN L QUE DANS LA FICHE DES PÉRIMÈTRES, ET LA QUESTION EST
// RETOURNÉE. Là-bas, le contour rouge valait 18 et c'était le sujet. Ici le
// contour est ÉTEINT : ce qui compte est à l'intérieur, et il y a 14 carreaux.
// Un élève qui reconnaît la figure comprend d'un regard que l'aire et le
// périmètre ne sont pas deux calculs sur le même nombre, mais deux nombres
// différents lus sur le même dessin.
const figureL = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 4,
        cols: 6,
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
        showPerimeter: false,
        showVertices: false,
        showVertexLabels: false,
      },
      colors: { filled: BLEU },
    }}
  />
);

// LE RECTANGLE 8 × 3, LUI AUSSI REPRIS DE LA FICHE DES PÉRIMÈTRES. Son contour
// valait 22 ; sa surface vaut 24. Et le quadrillage montre pourquoi on multiplie
// au lieu d'additionner : il y a 3 rangées de 8 carreaux.
const rectangle83 = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: { rows: 3, cols: 8, filledCells: pave(3, 8) },
      vertices: { "L = 8": [0.9, 2.4], "l = 3": [2.4, 0.3] },
      display: {
        showGrid: true,
        showFilled: true,
        showPerimeter: false,
        showVertices: false,
        showVertexLabels: true,
      },
      colors: { filled: BLEU },
    }}
  />
);

// ⭐ POURQUOI ON DIVISE PAR 2, DESSINÉ. Un rectangle de base 10 et de hauteur 4,
// coupé par une diagonale : les deux moitiés sont superposables, donc chacune
// vaut la moitié de 40, soit 20 — le nombre exact de la banque.
// ⭐ `perimeterPath` sert ici à tracer une DIAGONALE, ce qu'aucune case du
// quadrillage ne saurait faire : le chemin fait le tour du rectangle, revient à
// son point de départ, puis file vers le coin opposé.
// ⚠️ Deux libellés « 20 » : une clé d'objet ne peut pas servir deux fois, donc
// la seconde porte une espace finale — invisible à l'écran.
//
// ⛔ ET LEURS POSITIONS ONT ÉTÉ CALCULÉES, PAS DEVINÉES. Au premier jet, les deux
// « 20 » tombaient dans la MÊME moitié : le mesureur de console ne l'aurait
// jamais vu — il compte les polices, les chevauchements et les débordements du
// cadre, pas l'appartenance d'une étiquette à une région. La diagonale va du
// coin bas-gauche au coin haut-droit, donc elle sépare un triangle HAUT-GAUCHE
// et un triangle BAS-DROITE. Les deux libellés visent maintenant le centre de
// gravité de chacun, vérifié en comparant leur ordonnée à celle de la diagonale
// au même x.
const triangleMoitie = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: { rows: 4, cols: 10, filledCells: pave(4, 10) },
      perimeterPath: [[4, 0], [4, 10], [0, 10], [0, 0], [4, 0], [0, 10]],
      vertices: { "20": [1.7, 2.9], "20 ": [3.7, 7.4] },
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

// ⭐⭐ LE PARALLÉLOGRAMME, ET POURQUOI C'EST LA HAUTEUR. Le rectangle bleu a pour
// dimensions la base (5) et la hauteur (4) : 20 carreaux, qu'on compte. Le
// parallélogramme rouge est posé sur la MÊME base et monte à la MÊME hauteur —
// et ce qui dépasse à droite est exactement ce qui manque à gauche. Les deux
// aires sont donc égales, alors que le côté incliné du parallélogramme est plus
// long que 4. C'est la démonstration par découpage, en un seul dessin.
const parallelogramme = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: { rows: 4, cols: 8, filledCells: pave(4, 5) },
      // A(4,0) → B(4,5) le long de la base, puis le côté incliné jusqu'à C(0,7),
      // le côté du haut jusqu'à D(0,2), et retour à A.
      perimeterPath: [[4, 0], [4, 5], [0, 7], [0, 2], [4, 0]],
      vertices: { "20": [2.3, 1.7] },
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

// DÉCOUPER, PUIS ADDITIONNER. Une maison : un rectangle de 6 sur 4 (24 carreaux
// comptables) surmonté d'un triangle de base 6 et de hauteur 3 (9). Total 33 —
// le nombre du QCM de la banque. Le triangle n'est pas carrelé exprès : il ne se
// compte pas, il se calcule.
const figureComposee = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: { rows: 7, cols: 6, filledCells: pave(4, 6, 3, 0) },
      perimeterPath: [[7, 0], [7, 6], [3, 6], [0, 3], [3, 0], [7, 0]],
      vertices: { "24": [5.4, 2.2], "9": [1.6, 2.6] },
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

// ⭐⭐ LA RÉCIPROQUE DE LA FICHE DES PÉRIMÈTRES. Là-bas : même contour, aires
// différentes. Ici : même aire, contours différents. Un carré de 4 et un
// rectangle de 8 sur 2 occupent tous deux 16 carreaux — mais leurs tours valent
// 16 cm et 20 cm. Les deux dessins disent la même vérité par les deux bouts.
const memeAire = (cellSize: number, padding: number) => (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { cellSize, padding },
      grid: {
        rows: 4,
        cols: 13,
        filledCells: [...pave(4, 4), ...pave(2, 8, 0, 5)],
      },
      // ⚠️ Le rectangle ne fait que deux lignes de haut : son libellé vise la
      // ligne 1,5 et non 1,3, sinon le haut du texte affleure le bord.
      vertices: { "16": [2.3, 1.0], "16 ": [1.5, 8.2] },
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

// ⭐ UN SEUL OBJET, DEUX GRANDEURS. Plutôt qu'un tableau abstrait « aire contre
// périmètre », le même carré de 6 cm est calculé des deux façons : le lecteur
// voit les deux nombres naître du même côté. La banque pose exactement cette
// question pour un carré de 5 cm.
const tableauDeuxGrandeurs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["un carré de 6 cm", "le périmètre", "l'aire"],
      rows: [
        { values: ["ce qu'on mesure", "le tour", "la surface"] },
        { values: ["le calcul", "4 × 6", "6 × 6"] },
        { values: ["le résultat", "24 cm", "36 cm²"] },
      ],
      highlight: { row: 2 },
      caption: "deux nombres différents, et deux unités différentes",
      display: { compact: true, striped: true },
    }}
  />
);

// POURQUOI 1 m² FAIT 10 000 cm², ET NON 100. Un mètre carré est un carré d'UN
// MÈTRE DE CÔTÉ, donc de 100 cm sur 100 cm. L'opération posée le montre : on
// multiplie les deux côtés, pas les unités.
const conversionUnite = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["100", "100"],
      result: "10000",
      display: { showResult: true, compact: true },
      questionLabel: "1 m² = 100 cm × 100 cm",
    }}
  />
);

// REMONTER DE L'AIRE À UNE DIMENSION. Si la surface et la longueur sont connues,
// la largeur s'obtient par une division — c'est l'opération inverse de celle qui
// a produit l'aire. 36 et 9 sont les nombres de la banque.
const calculLargeur = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "division",
      numbers: ["36", "9"],
      division: { dividende: "36", diviseur: "9", quotient: "4", reste: "0" },
      display: { showResult: true, compact: true },
      questionLabel: "aire 36 cm², longueur 9 cm → largeur 36 ÷ 9",
    }}
  />
);

const pieges = [
  "Confondre aire et périmètre : un carré de 6 cm a une aire de 36 cm² et un périmètre de 24 cm. L'aire est la surface qu'on remplit, le périmètre la ficelle qui en fait le tour — et les unités le disent, cm² contre cm.",
  "Oublier de diviser par 2 pour un triangle : une base de 10 et une hauteur de 6 donnent 30 cm², et non 60. Le triangle est la MOITIÉ du rectangle qui l'entoure.",
  "Prendre le côté incliné d'un parallélogramme au lieu de sa hauteur : la hauteur est la distance PERPENDICULAIRE entre la base et le côté opposé. Le côté incliné est toujours plus long, et il donnerait une aire trop grande.",
];

const aRetenir = [
  "L'aire d'une figure est la surface qu'elle occupe. On la mesure en unités carrées — cm², m², km² — et on l'obtient en multipliant, jamais en additionnant des longueurs.",
  "Rectangle : L × l. Carré : c². Parallélogramme : base × hauteur. Triangle : la moitié, donc (base × hauteur) ÷ 2.",
  "Une figure composée se DÉCOUPE en figures simples dont on additionne les aires — ou dont on soustrait, si l'on a enlevé un morceau.",
];

export const ficheAires4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "aire-surface",
  titre: "Les aires",
  accroche:
    "L'aire mesure la place qu'une figure occupe : combien de carreaux d'un centimètre de côté il faudrait pour la recouvrir entièrement. C'est une multiplication, pas une addition — et cela n'a rien à voir avec le périmètre, qui n'en mesure que le tour. Toutes les formules de cette fiche se déduisent d'une seule : celle du rectangle.",
  identite: [
    { label: "Le mot clé", valeur: "La surface : la place occupée" },
    { label: "Le geste", valeur: "On multiplie deux longueurs" },
    { label: "La règle d'or", valeur: "Des cm², jamais des cm" },
  ],
  definition: {
    texte:
      "L'aire d'une figure est la mesure de la surface qu'elle occupe. On la compte en unités carrées : un carré de 1 cm de côté a une aire de $1\\ \\text{cm}^2$, et l'aire d'une figure est le nombre de tels carrés qu'il faut pour la recouvrir sans trou ni chevauchement. ⚠️ C'est une grandeur différente du périmètre, et elle a sa propre unité : le $\\text{cm}^2$, jamais le cm. Deux figures peuvent avoir la même aire sans avoir le même périmètre, et l'inverse est vrai aussi.",
  },
  figure: {
    schema: legende(
      figureL(32, 18),
      "on ne compte plus le tour : on compte l'intérieur — 14 carreaux"
    ),
    legende:
      "C'est exactement la figure de la fiche des périmètres, avec l'autre question. Là-bas on suivait le contour et on trouvait 18. Ici on compte les carreaux : l'aire vaut 14 unités². Même dessin, deux nombres — c'est bien qu'il s'agit de deux grandeurs.",
  },
  proprietes: [
    {
      titre: "La surface, pas le contour",
      micros: ["aire_comprendre"],
      texte:
        "Sur un carré de 6 cm, le périmètre fait $4 \\times 6 = 24$ cm et l'aire $6 \\times 6 = 36\\ \\text{cm}^2$. Deux calculs, deux nombres, deux unités. L'aire se multiplie, le périmètre s'additionne.",
      schema: tableauDeuxGrandeurs,
    },
    {
      titre: "Compter, ou multiplier",
      micros: ["aire_rectangle", "aire_carre"],
      texte:
        "Un rectangle de 8 sur 3, ce sont 3 rangées de 8 carreaux : $8 \\times 3 = 24\\ \\text{cm}^2$. On n'a pas besoin de les compter un par un — c'est tout l'intérêt de la formule $A = L \\times l$. Pour le carré, $A = c^2$.",
      schema: rectangle83(24, 18),
    },
    {
      titre: "Le triangle est une moitié",
      micros: ["aire_triangle"],
      texte:
        "Une diagonale coupe un rectangle en deux triangles superposables. Le rectangle de base 10 et de hauteur 4 vaut 40, donc chaque triangle vaut 20. C'est de là que vient la division par 2, et de nulle part ailleurs.",
      schema: triangleMoitie(20, 14),
    },
    {
      titre: "La hauteur, jamais le côté incliné",
      micros: ["aire_parallelogramme"],
      texte:
        "Le parallélogramme rouge a la même base et la même hauteur que le rectangle bleu : ce qui dépasse à droite est exactement ce qui manque à gauche. Son aire vaut donc $\\text{base} \\times \\text{hauteur}$, ici 20 — et le côté incliné n'y entre pas.",
      schema: parallelogramme(24, 18),
    },
  ],
  reel: {
    texte:
      "L'aire est ce qu'on achète chaque fois qu'on recouvre : le carrelage d'une pièce, la peinture d'un mur, la pelouse d'un jardin, la tôle d'une toiture. Un pot de peinture n'annonce jamais des mètres, il annonce des mètres carrés. C'est aussi ce qui fixe le prix d'un terrain, vendu au $\\text{m}^2$ et non au mètre de clôture — deux terrains de même périmètre ne valent pas le même prix. À l'échelle de l'île : La Réunion couvre environ $2\\,500\\ \\text{km}^2$, et c'est cette surface-là, et non la longueur de son littoral, qui dit combien de champs de canne, de forêt et de villes elle peut porter.",
  },
  historique: {
    texte:
      "Les aires sont nées d'un problème très concret. Chaque année, la crue du Nil effaçait les limites des champs, et il fallait les redécouper équitablement : les arpenteurs égyptiens savaient donc calculer des surfaces bien avant qu'on parle de mathématiques. Le papyrus Rhind, vers 1650 avant notre ère, contient déjà ces calculs. Et le mot « géométrie » garde la trace de ce métier : du grec « gê », la terre, et « metron », la mesure — littéralement, la mesure de la terre.",
  },
  formule: {
    contexte: "Les quatre aires à connaître",
    expression:
      "rectangle : $A = L \\times l$   ·   carré : $A = c^2$   ·   parallélogramme : $A = b \\times h$   ·   triangle : $A = \\dfrac{b \\times h}{2}$",
    legende:
      "Les trois dernières se déduisent de la première. ⚠️ Et si l'on double toutes les longueurs d'une figure, son aire est multipliée par 4 — alors que son périmètre, lui, ne l'est que par 2.",
    // ⛔ Pas de schéma ici, et c'est réfléchi : le rectangle carrelé, le triangle
    // coupé en deux et le parallélogramme posé sur son rectangle sont juste
    // au-dessus, et ils DÉMONTRENT ces quatre formules au lieu de les répéter.
  },
  methode: [
    {
      titre: "Compter, si c'est quadrillé",
      micros: ["aire_comprendre", "aire_figure"],
      texte:
        "Sur un quadrillage, l'aire est le nombre de carreaux — sans formule et sans risque d'erreur. Les demi-carreaux se recomposent deux par deux. C'est la méthode qui marche sur toutes les figures, même les plus tordues.",
      schema: figureL(32, 18),
    },
    {
      titre: "Découper en figures simples",
      micros: ["aire_figure"],
      texte:
        "Une figure composée se coupe en morceaux dont on connaît la formule, et on additionne. Ici : un rectangle de $6 \\times 4 = 24$, surmonté d'un triangle de base 6 et de hauteur 3, soit $\\dfrac{6 \\times 3}{2} = 9$. Total : $33\\ \\text{cm}^2$.",
      schema: figureComposee(30, 14),
    },
    {
      titre: "Vérifier l'unité",
      micros: ["aire_comprendre"],
      texte:
        "Une aire s'écrit toujours en unités carrées. Et attention aux conversions : $1\\ \\text{m}^2$ ne fait pas 100 $\\text{cm}^2$ mais 10 000, parce qu'un mètre carré est un carré de 100 cm sur 100 cm.",
      schema: conversionUnite,
    },
  ],
  usages: [
    {
      titre: "Carreler, peindre, semer",
      micros: ["aire_rectangle", "aire_probleme"],
      detail:
        "Une terrasse de 8 m sur 3 m fait $24\\ \\text{m}^2$ : c'est la quantité de carrelage à commander. Le périmètre, lui, ne servirait qu'à acheter la bordure.",
      schema: rectangle83(24, 18),
    },
    {
      titre: "Retrouver une dimension",
      micros: ["aire_rectangle", "aire_carre"],
      detail:
        "L'aire peut être la donnée. Un rectangle de $36\\ \\text{cm}^2$ dont la longueur vaut 9 cm a une largeur de $36 \\div 9 = 4$ cm — on défait la multiplication.",
      schema: calculLargeur,
    },
    {
      titre: "Comparer deux formes",
      micros: ["aire_defi"],
      detail:
        "Deux figures très différentes peuvent occuper exactement la même surface. Un carré de 4 et un rectangle de 8 sur 2 valent tous deux $16\\ \\text{cm}^2$ — mais leurs tours mesurent 16 cm et 20 cm.",
      schema: memeAire(16, 10),
    },
  ],
  exemples: [
    {
      titre: "L'aire d'un rectangle",
      micros: ["aire_rectangle"],
      donnees: "Un rectangle mesure 8 cm de longueur et 3 cm de largeur.",
      question: "Quelle est son aire ?",
      schema: rectangle83(22, 16),
      solution:
        "$A = L \\times l = 8 \\times 3 = 24\\ \\text{cm}^2$. Le quadrillage le confirme : il y a 3 rangées de 8 carreaux, donc 24 carreaux d'un centimètre carré chacun. ⚠️ Le résultat s'écrit en $\\text{cm}^2$. Et il ne faut pas le confondre avec le périmètre du même rectangle, qui vaut 22 cm.",
    },
    {
      titre: "Pourquoi diviser par 2",
      micros: ["aire_triangle"],
      donnees: "Un triangle a une base de 10 cm et une hauteur de 4 cm.",
      question: "Quelle est son aire, et d'où vient le « ÷ 2 » ?",
      schema: triangleMoitie(20, 14),
      solution:
        "On trace le rectangle qui a la même base et la même hauteur : son aire vaut $10 \\times 4 = 40\\ \\text{cm}^2$. La diagonale le coupe en deux triangles superposables, donc chacun vaut la moitié : $40 \\div 2 = 20\\ \\text{cm}^2$. La formule $A = \\dfrac{b \\times h}{2}$ ne dit rien d'autre. ⚠️ C'est exactement ce qu'oublie l'élève qui trouve $60\\ \\text{cm}^2$ pour une base de 10 et une hauteur de 6 : la bonne réponse est 30.",
    },
    {
      titre: "L'erreur du côté incliné",
      micros: ["aire_parallelogramme", "aire_defi"],
      donnees: "Un parallélogramme a une base de 5 cm, une hauteur de 4 cm, et son côté incliné mesure 5 cm.",
      question: "Un élève calcule $5 \\times 5 = 25\\ \\text{cm}^2$. A-t-il raison ?",
      schema: parallelogramme(22, 16),
      solution:
        "Non : il a utilisé le côté incliné au lieu de la hauteur. L'aire vaut $\\text{base} \\times \\text{hauteur} = 5 \\times 4 = 20\\ \\text{cm}^2$. ⭐ Le dessin le démontre : le rectangle bleu a la même base et la même hauteur que le parallélogramme, et le morceau qui dépasse à droite est exactement celui qui manque à gauche. Les deux figures ont donc la même aire — 20 carreaux, qu'on peut compter. Le côté incliné, lui, est toujours plus long que la hauteur : le prendre gonflerait le résultat.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "L'aire d'une figure correspond à quoi, et dans quelle unité s'exprime-t-elle ?",
      correction:
        "À la surface qu'elle occupe, c'est-à-dire au nombre de carrés unités nécessaires pour la recouvrir. Elle s'exprime en unités carrées : $\\text{cm}^2$, $\\text{m}^2$, $\\text{km}^2$. ⚠️ Pas en cm, qui est l'unité du périmètre.",
      micros: ["aire_comprendre"],
    },
    {
      question: "Calculer l'aire d'un rectangle de longueur 8 cm et de largeur 3 cm.",
      correction:
        "$8 \\times 3 = 24\\ \\text{cm}^2$. On multiplie la longueur par la largeur, parce que la figure contient 3 rangées de 8 carreaux.",
      micros: ["aire_rectangle"],
    },
    {
      question: "Un carré a une aire de $81\\ \\text{cm}^2$. Quel est son côté ?",
      correction:
        "9 cm, car $9 \\times 9 = 81$. On cherche le nombre qui, multiplié par lui-même, donne 81 — c'est l'opération inverse de $A = c^2$.",
      micros: ["aire_carre"],
    },
    {
      question: "Calculer l'aire d'un triangle de base 10 cm et de hauteur 4 cm.",
      correction:
        "$\\dfrac{10 \\times 4}{2} = \\dfrac{40}{2} = 20\\ \\text{cm}^2$. ⚠️ La réponse 40 oublie de diviser par 2 : le triangle est la moitié du rectangle de mêmes base et hauteur.",
      micros: ["aire_triangle"],
    },
    {
      question: "Calculer l'aire d'un parallélogramme de base 8 cm et de hauteur 5 cm.",
      correction:
        "$8 \\times 5 = 40\\ \\text{cm}^2$. On n'utilise NI le côté incliné, NI une division par 2 : la formule est simplement base × hauteur, comme pour un rectangle.",
      micros: ["aire_parallelogramme"],
    },
    {
      question: "Une figure est formée d'un rectangle de 6 cm sur 4 cm surmonté d'un triangle de base 6 cm et de hauteur 3 cm. Quelle est l'aire totale ?",
      correction:
        "On découpe et on additionne : le rectangle vaut $6 \\times 4 = 24\\ \\text{cm}^2$, le triangle $\\dfrac{6 \\times 3}{2} = 9\\ \\text{cm}^2$. Total : $33\\ \\text{cm}^2$.",
      micros: ["aire_figure", "aire_probleme"],
    },
    {
      question: "Deux figures différentes peuvent-elles avoir la même aire ?",
      correction:
        "Oui. Un carré de 4 cm de côté et un rectangle de 8 cm sur 2 cm occupent tous deux $16\\ \\text{cm}^2$, alors que leurs périmètres valent 16 cm et 20 cm. L'aire ne détermine pas la forme — pas plus que le périmètre ne détermine l'aire.",
      micros: ["aire_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : `ModeClasse.tsx` n'a pas de rendu KaTeX, et le
// code serait projeté en clair au tableau devant la classe.
export const slidesAires4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Aires - 4e",
    section: {
      type: "objectif",
      phrase: "La place occupée, pas le tour",
      sousPhrase:
        "L'aire est le nombre de carrés d'un centimètre de côté qu'il faut pour recouvrir la figure. On multiplie, on n'additionne pas.",
      encadre: {
        titre: "L'idée",
        texte: "Des cm², jamais des cm. Toutes les formules viennent de celle du rectangle.",
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
          "Tout ce qui recouvre : carrelage, peinture, pelouse, tôle. Un pot de peinture s'annonce en m², jamais en mètres. Et un terrain se vend au m², pas au mètre de clôture.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Chaque crue du Nil effaçait les limites des champs : les arpenteurs égyptiens savaient calculer des surfaces vers 1650 avant notre ère. « Géométrie » vient de là — gê, la terre, et metron, la mesure.",
      },
    },
  },
  {
    titre: "La règle d'or",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "Le triangle est la moitié d'un rectangle",
      sousPhrase:
        "Base 10, hauteur 4 : le rectangle vaut 40, donc le triangle vaut 20. Le « ÷ 2 » ne vient de nulle part ailleurs.",
      encadre: {
        titre: "L'erreur",
        texte: "Base 10, hauteur 6 : la réponse est 30 cm², et non 60. C'est la division par 2 qu'on oublie.",
      },
    },
  },
  {
    titre: "Les quatre aires",
    badge: "4 formules",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Rectangle : L × l", texte: "8 sur 3 donnent 24 cm². Trois rangées de huit carreaux." },
        { titre: "Carré : c × c", texte: "Côté 6, aire 36 cm². Le carré est un rectangle aux côtés égaux." },
        { titre: "Parallélogramme : b × h", texte: "La HAUTEUR, jamais le côté incliné. Base 8, hauteur 5 : 40 cm²." },
        { titre: "Triangle : (b × h) ÷ 2", texte: "La moitié du rectangle qui l'entoure." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAires4e.methode.map((m) => ({
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
      cartes: ficheAires4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Découper pour additionner",
    section: {
      type: "exemple",
      enonce: "Une figure : un rectangle de 6 cm sur 4 cm, surmonté d'un triangle de base 6 cm et de hauteur 3 cm.",
      question: "Quelle est son aire totale ?",
      correction:
        "Rectangle : 6 × 4 = 24 cm². Triangle : (6 × 3) ÷ 2 = 9 cm². Total : 33 cm².",
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
      enonce: "Deux figures différentes peuvent-elles avoir la même aire ?",
      question: "Oui ou non ?",
      indice: "Essaie un carré de 4 et un rectangle de 8 sur 2.",
      correction: "Oui : 16 cm² tous les deux. Mais leurs périmètres valent 16 cm et 20 cm.",
    },
  },
];
