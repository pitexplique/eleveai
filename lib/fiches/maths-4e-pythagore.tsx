// ─── Fiche de cours : le théorème de Pythagore (4e) ────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach (4e/maths/pythagore.bank.ts).
// Micro-compétences couvertes → blocs :
//   pythagore_carre_racine        → Propriété « Un carré, c'est une aire », méthode « Calculer »
//   pythagore_reconnaitre         → Définition, figure, méthode « Repérer », usage 1
//   pythagore_calculer_hypotenuse → Propriété « L'égalité », formule, usage 1, exemple 1
//   pythagore_calculer_cote       → Propriété « Retrouver un côté », usage 2, exemple 2
//   pythagore_reciproque_verifier → Propriété « La réciproque », exemple 3, exercice 3
//   pythagore_reciproque_conclure → Usage 3, exemple 3
//   pythagore_rediger             → Méthode « Rédiger », exemple 1, piège 3
//   pythagore_defi                → Exercice 4
//
// ⭐ SIX DESSINS DE NATURES DIFFÉRENTES, et c'est la difficulté de cette fiche :
// sur Pythagore, le triangle rectangle revient partout — six fois le même objet,
// ce sont six règles identiques aux yeux d'un élève (REGLES.md § 2 bis). On a donc
// cherché ce que le triangle ne sait PAS montrer :
//   · un CARRÉ est une aire      → `figure_libre` : 25 carreaux, qu'on peut compter ;
//   · l'égalité est un PARTAGE   → `schema_barre` : les 9 et les 16 remplissent les 25 ;
//   · retrouver un côté, c'est une SOUSTRACTION → `tableau_donnees`, la case vide ;
//   · le calcul lui-même         → `calcul_pose` : 169 − 25, et non 169 + 25 ;
//   · « le plus grand des trois » → `number_line` : trois longueurs sont trois nombres ;
//   · l'usage réel               → `quadrilatere` : l'équerre se vérifie sur sa DIAGONALE.
//
// ⭐ ET LE DESSIN LE PLUS UTILE EST UN CONTRE-EXEMPLE : la propriété de la
// réciproque porte un triangle qui n'est PAS rectangle (4, 5, 6). Une règle qui
// dit « alors » se comprend en voyant le cas où l'on ne peut pas conclure.
//
// Les nombres sont ceux de la banque (REGLES.md § 2 bis, point 5) : les triplets
// 3-4-5, 5-12-13 et 6-8-10 de `pythagoreanTriples`, et le 4-5-6 de `falseTriples`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// Le triangle rectangle du coach, dans l'orientation de la banque : l'angle droit
// en A, la base AB horizontale, l'hypoténuse BC en diagonale.
//
// ⛔ CE QU'ON A MESURÉ ET QUI NE SE LIT PAS DANS LE CODE. La banque dessine ce
// triangle sur des POINTS FIXES (55…225 en x) dans un cadre de 280. Rétrécir la
// `size` à 240 pour tenir dans une carte de propriété ne met pas le dessin à
// l'échelle : ça ROGNE — les étiquettes A, B et les longueurs sortaient du `<svg>`
// en silence, sans rien casser ni faire baisser la police. Même famille que les
// trois canvas à origine fixe de la note du 24/08.
// ⭐ La bonne réparation est de resserrer les POINTS, pas le cadre : les sommets
// tiennent dans 35…205, et les étiquettes ont de quoi dépasser sans sortir.
const triangleRectangle = (opts: {
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
  labels?: { A?: string; B?: string; C?: string };
  /** "carte" = propriété ou formule (bloc de 225 px) ; "exemple" = bloc de 199 px. */
  bloc?: "carte" | "exemple";
}) => {
  const petit = opts.bloc === "exemple";
  const k = petit ? 0.86 : 1;
  return (
    <CanvasRenderer
      figure={{
        kind: "triangle",
        size: { width: petit ? 208 : 240, height: petit ? 170 : 196 },
        points: {
          A: { x: 35 * k, y: 155 * k },
          B: { x: 205 * k, y: 155 * k },
          C: { x: 35 * k, y: 45 * k },
        },
        labels: opts.labels ?? { A: "A", B: "B", C: "C" },
        sideLabels: opts.sideLabels,
        display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
        marks: { rightAngleAt: "A" },
      }}
    />
  );
};

// LE MÊME TRIANGLE, POSÉ AUTREMENT. C'est le piège numéro un : l'élève cherche
// l'hypoténuse « en bas » ou « en diagonale ». Ici l'angle droit est en haut à
// droite, et l'hypoténuse AC descend de gauche à droite. La règle ne suit pas la
// position de la feuille, elle suit l'ANGLE DROIT.
const triangleAutreOrientation = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 240, height: 196 },
      points: {
        A: { x: 35, y: 45 },
        B: { x: 200, y: 45 },
        C: { x: 200, y: 155 },
      },
      labels: { A: "A", B: "B", C: "C" },
      sideLabels: { AB: "c", BC: "a", CA: "b" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      marks: { rightAngleAt: "B" },
    }}
  />
);

// LE CONTRE-EXEMPLE, et c'est le dessin le plus utile de la fiche. Un triangle de
// côtés 4, 5 et 6 : aucun angle droit, donc aucun petit carré au sommet. L'élève
// voit ce que la réciproque REFUSE de conclure. Les nombres viennent de
// `falseTriples` dans la banque.
const trianglePasRectangle = (
  <CanvasRenderer
    figure={{
      kind: "triangle",
      size: { width: 240, height: 190 },
      points: {
        A: { x: 35, y: 152 },
        B: { x: 202, y: 147 },
        C: { x: 112, y: 45 },
      },
      labels: { A: "A", B: "B", C: "C" },
      sideLabels: { AB: "6 cm", BC: "5 cm", CA: "4 cm" },
      display: { showPoints: true, showLabels: true, showSides: true, showAngles: false },
      // ⛔ Aucun `rightAngleAt` : ne pas coder un angle droit qu'on est justement
      // en train de mettre en doute (choix de la banque, en-tête du .bank.ts).
    }}
  />
);

// UN CARRÉ, C'EST UNE AIRE — et elle se compte. 5² n'est pas « 5 fois 5 » récité,
// c'est un carré de 5 sur 5 qui contient 25 carreaux. Le canvas `triangle` ne sait
// pas montrer ça ; `figure_libre` est le canvas des aires sur quadrillage.
const carreDe25 = legende(
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      size: { width: 190, height: 190, cellSize: 32 },
      grid: {
        rows: 5,
        cols: 5,
        filledCells: Array.from({ length: 5 }, (_, r) =>
          Array.from({ length: 5 }, (_, c) => [r, c] as [number, number])
        ).flat(),
      },
      display: { showGrid: true, showFilled: true },
      colors: { filled: "#bfdbfe", border: BLEU },
    }}
  />,
  "5 × 5 = 25 carreaux"
);

// L'ÉGALITÉ EST UN PARTAGE. Les deux petits carrés (9 et 16) remplissent
// exactement le grand (25) : c'est ce que dit le théorème, et `schema_barre` est
// le canvas du « tout découpé en parts bout à bout ».
// ⚠️ Les largeurs sont PROPORTIONNELLES aux valeurs (note du 24/08) : 9 et 16 sont
// dans un rapport de 1 à 1,8, donc les deux parts restent lisibles. Une
// décomposition très déséquilibrée ne se dessinerait pas ici.
const egaliteDesAires = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ DEUX DÉFAUTS MESURÉS ICI, ET AUCUN NE SE LIT DANS LE CODE.
      //  1. Les largeurs de parts sont PROPORTIONNELLES aux valeurs (note du
      //     24/08) : la part de 9 ne fait que 36 % de 240, soit 86 px — « 3² = 9 »
      //     n'y tenait pas et sortait du cadre. Le label porte le carré, la valeur
      //     porte le résultat.
      //  2. ⛔ `schema_barre` a une mise en page verticale FIXE : les étiquettes de
      //     parts sont posées à 144 px DU HAUT (barY + barHeight + 24), tandis que
      //     la phrase du bas est posée à 18 px DU BAS. Sous 170 de hauteur, les
      //     deux se rentrent dedans sans rien casser. 180 les sépare de 18 px.
      size: { width: 240, height: 180 },
      total: "25",
      parts: [
        { label: "3²", value: "9", color: BLEU },
        { label: "4²", value: "16", color: ROUGE },
      ],
      questionLabel: "9 + 16 = 25 = 5²",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// RETROUVER UN CÔTÉ, C'EST UNE CASE VIDE. Le tableau côté → carré montre le
// va-et-vient qui fait toute la difficulté : on monte au carré, on calcule, on
// redescend à la longueur. La ligne du milieu est celle qu'on cherche.
const tableauDesCarres = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["côté", "son carré"],
      rows: [
        { values: ["13 cm", "169"] },
        { values: ["?", "?"] },
        { values: ["5 cm", "25"] },
      ],
      highlight: { row: 1 },
      caption: "169 − 25 = 144, et 144 = 12²",
      display: { compact: true },
    }}
  />
);

// LE CALCUL LUI-MÊME, POSÉ. C'est ici que se joue l'erreur la plus fréquente :
// pour un côté de l'angle droit on SOUSTRAIT, on n'additionne pas. Une soustraction
// posée le dit mieux qu'une phrase.
const soustractionDesCarres = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "soustraction",
      numbers: ["169", "25"],
      result: "144",
      display: { showResult: true, compact: true },
      questionLabel: "et 144 = 12², donc le côté mesure 12 cm",
    }}
  />
);

// TROIS LONGUEURS SONT TROIS NOMBRES. Le contrôle le plus rapide avant de se
// lancer : l'hypoténuse est le PLUS GRAND des trois. Posés sur une droite graduée,
// 3, 4 et 5 se rangent tout seuls. `number_line` dessine des positions — c'est
// exactement ce qu'on veut ici, et pas un saut.
const troisLongueurs = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 6,
      step: 1,
      points: [
        { value: 3, label: "3", color: BLEU },
        { value: 4, label: "4", color: BLEU },
        { value: 5, label: "5 = hyp.", color: ROUGE },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      // ⚠️ Sept graduations au plus (note du 24/08) : de 0 à 6 par pas de 1, elles
      // ne se touchent pas. Un pas de 0,5 les collerait.
      size: { width: 240, height: 95 },
    }}
  />
);

// L'ÉQUERRE SE VÉRIFIE SUR SA DIAGONALE. C'est l'usage réel de la réciproque, et
// c'est un QUADRILATÈRE, pas un triangle : on veut savoir si le coin d'une étagère,
// d'un mur ou d'un carrelage est droit. On mesure les deux côtés et la diagonale.
const equerreDuMacon = legende(
  <CanvasRenderer
    figure={{
      kind: "quadrilatere",
      size: { width: 208, height: 160 },
      points: {
        A: { x: 34, y: 34 },
        B: { x: 158, y: 34 },
        C: { x: 158, y: 118 },
        D: { x: 34, y: 118 },
      },
      labels: { A: "A", B: "B", C: "C", D: "D" },
      sideLabels: { AB: "8", AD: "6" },
      display: { showPoints: true, showLabels: true, showSides: true, showDiagonals: true },
    }}
  />,
  "la diagonale AC doit mesurer 10"
);

const pieges = [
  "Additionner alors qu'il faut soustraire : pour un côté de l'angle droit, on retire le carré du côté connu au carré de l'hypoténuse.",
  "Prendre le mauvais côté pour l'hypoténuse : ce n'est pas « celui du bas » ni « le plus penché », c'est celui qui est en face de l'angle droit.",
  "Oublier la racine carrée : le calcul donne le carré de la longueur, pas la longueur. 25 n'est pas la réponse, 5 l'est.",
];

const aRetenir = [
  "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
  "L'hypoténuse est le côté opposé à l'angle droit, et c'est toujours le plus long des trois.",
  "La réciproque fait le chemin inverse : si l'égalité est vraie, alors le triangle est rectangle ; si elle est fausse, il ne l'est pas.",
];

export const fichePythagore4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "pythagore-theoreme",
  titre: "Le théorème de Pythagore",
  accroche:
    "Dans un triangle rectangle, les trois côtés sont liés par une égalité : celui d'en face de l'angle droit, l'hypoténuse, obéit à la somme des carrés des deux autres. Cette égalité sert dans les deux sens — pour calculer une longueur qu'on ne peut pas mesurer, et pour prouver qu'un angle est droit.",
  identite: [
    { label: "Condition", valeur: "Un triangle rectangle (sinon, rien ne s'applique)" },
    { label: "Le mot clé", valeur: "L'hypoténuse : le côté opposé à l'angle droit" },
    { label: "Outil", valeur: "Les carrés et les racines carrées" },
  ],
  definition: {
    texte:
      "Un triangle rectangle est un triangle qui possède un angle droit. Le côté opposé à cet angle droit s'appelle l'hypoténuse : c'est toujours le plus long des trois côtés. Le théorème de Pythagore dit que le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
  },
  figure: {
    schema: triangleRectangle({
      sideLabels: { BC: "hypoténuse" },
    }),
    legende: "L'angle droit est en A : l'hypoténuse est BC, en face de lui.",
  },
  proprietes: [
    {
      titre: "Un carré, c'est une aire",
      micros: ["pythagore_carre_racine"],
      texte:
        "Le carré d'un nombre, c'est l'aire d'un carré qui a ce nombre pour côté : 5² = 25. La racine carrée fait le chemin inverse : elle repart de l'aire pour retrouver le côté.",
      schema: carreDe25,
    },
    {
      titre: "L'égalité de Pythagore",
      micros: ["pythagore_calculer_hypotenuse"],
      texte:
        "Les carrés des deux côtés de l'angle droit se rangent exactement dans le carré de l'hypoténuse : 9 + 16 = 25.",
      schema: egaliteDesAires,
    },
    {
      titre: "Retrouver un côté de l'angle droit",
      micros: ["pythagore_calculer_cote"],
      texte:
        "Quand c'est l'hypoténuse qu'on connaît, on retire : le carré cherché est la différence des deux autres carrés.",
      schema: tableauDesCarres,
    },
    {
      titre: "La réciproque, et ce qu'elle refuse",
      micros: ["pythagore_reciproque_verifier"],
      texte:
        "Ici 4² + 5² = 41, alors que 6² = 36. L'égalité est fausse, donc le triangle n'est pas rectangle : la réciproque conclut dans les deux sens.",
      schema: trianglePasRectangle,
    },
  ],
  reel: {
    texte:
      "À La Réunion, on s'en sert dès qu'on construit : vérifier qu'un mur est d'aplomb, qu'une dalle est bien rectangulaire, qu'une varangue est d'équerre. Les maçons utilisent depuis toujours le triplet 3-4-5, qui donne un angle droit sans équerre. On s'en sert aussi pour toute longueur qu'on ne peut pas mesurer directement : la hauteur d'un pied de letchi à partir de son ombre, la distance à vol d'oiseau entre deux points d'une carte, la longueur d'une rampe.",
  },
  historique: {
    texte:
      "Le théorème porte le nom de Pythagore, un savant grec du VIe siècle avant notre ère — mais il était connu bien avant lui. Une tablette babylonienne vieille de 3800 ans, Plimpton 322, aligne déjà des triplets comme 3-4-5 et 5-12-13. Les arpenteurs égyptiens tendaient une corde à treize nœuds pour retracer les champs après les crues du Nil : douze intervalles, un triangle 3-4-5, et l'angle droit apparaît.",
  },
  formule: {
    contexte: "Dans un triangle ABC rectangle en B",
    expression: "AC² = AB² + BC²",
    legende:
      "La formule ne suit pas la position de la figure, elle suit l'angle droit : l'hypoténuse est toujours celle qui est en face de lui, ici AC.",
    schema: triangleAutreOrientation,
  },
  methode: [
    {
      titre: "Repérer",
      micros: ["pythagore_reconnaitre"],
      texte:
        "On cherche d'abord le petit carré de l'angle droit, puis le côté d'en face : c'est l'hypoténuse. Contrôle rapide, elle doit être la plus grande des trois longueurs.",
      schema: troisLongueurs,
    },
    {
      titre: "Calculer",
      micros: ["pythagore_carre_racine", "pythagore_calculer_cote"],
      texte:
        "On monte au carré, on additionne si on cherche l'hypoténuse, on soustrait si on cherche un côté de l'angle droit. Puis on redescend à la longueur avec la racine carrée.",
      schema: soustractionDesCarres,
    },
    {
      titre: "Rédiger",
      micros: ["pythagore_rediger"],
      // ⛔ LE SEUL BLOC SANS DESSIN DE LA FICHE, et c'est un arbitrage de Frédéric
      // (25/08) : « tu peux avoir un bloc sans schéma, surtout rédiger ». Un
      // tableau a été essayé ici, puis retiré — il ne faisait que redire les trois
      // lignes du texte. Un dessin qui répète n'apprend rien.
      // ⭐ La règle générale ne bouge pas pour autant : « les élèves ont besoin de
      // dessins ». Onze visuels sur les douze blocs de cette fiche.
      texte:
        "Trois lignes, toujours les mêmes. 1) « Dans le triangle ABC rectangle en A… » — on annonce l'angle droit. 2) « …d'après le théorème de Pythagore, BC² = AB² + AC² » — on écrit l'égalité avant de calculer. 3) On calcule, puis on conclut par une phrase avec l'unité.",
    },
  ],
  usages: [
    {
      titre: "Calculer l'hypoténuse",
      micros: ["pythagore_reconnaitre", "pythagore_calculer_hypotenuse"],
      detail:
        "Les deux côtés de l'angle droit sont connus. On élève chacun au carré, on additionne, et la racine carrée du résultat donne l'hypoténuse.",
    },
    {
      titre: "Calculer un côté de l'angle droit",
      micros: ["pythagore_calculer_cote"],
      detail:
        "L'hypoténuse et un côté sont connus. On soustrait le carré du côté connu au carré de l'hypoténuse, puis on prend la racine carrée.",
    },
    {
      titre: "Démontrer qu'un angle est droit",
      micros: ["pythagore_reciproque_conclure"],
      detail:
        "Les trois longueurs sont connues. On calcule séparément le carré du plus grand côté et la somme des carrés des deux autres : si les deux résultats sont égaux, le triangle est rectangle.",
    },
  ],
  exemples: [
    {
      titre: "La diagonale de l'écran",
      micros: ["pythagore_calculer_hypotenuse", "pythagore_rediger"],
      donnees:
        "Un écran rectangulaire mesure 3 dm de haut et 4 dm de large. Le triangle ABC est rectangle en A, avec AB = 4 dm et AC = 3 dm.",
      question: "Combien mesure sa diagonale BC ?",
      schema: triangleRectangle({
        bloc: "exemple",
        sideLabels: { AB: "4", CA: "3", BC: "?" },
      }),
      solution:
        "Dans le triangle ABC rectangle en A, d'après le théorème de Pythagore : BC² = AB² + AC². Donc BC² = 4² + 3² = 16 + 9 = 25. Or 25 = 5², donc BC = 5. La diagonale de l'écran mesure 5 dm.",
    },
    {
      titre: "L'échelle contre le mur",
      micros: ["pythagore_calculer_cote"],
      donnees:
        "Une échelle de 13 m est posée contre un mur vertical. Son pied est à 5 m du mur. Le triangle ABC est rectangle en A, avec BC = 13 m et AB = 5 m.",
      question: "À quelle hauteur l'échelle touche-t-elle le mur ?",
      schema: triangleRectangle({
        bloc: "exemple",
        sideLabels: { AB: "5", CA: "?", BC: "13" },
      }),
      solution:
        "Dans le triangle ABC rectangle en A, d'après le théorème de Pythagore : BC² = AB² + AC². Donc 13² = 5² + AC², c'est-à-dire 169 = 25 + AC². On soustrait : AC² = 169 − 25 = 144. Or 144 = 12², donc AC = 12. L'échelle touche le mur à 12 m de hauteur.",
    },
    {
      titre: "L'étagère est-elle d'équerre ?",
      micros: ["pythagore_reciproque_verifier", "pythagore_reciproque_conclure"],
      donnees:
        "On veut vérifier que le coin A d'une étagère est droit. On mesure AB = 8 cm, AD = 6 cm, et la diagonale AC = 10 cm.",
      question: "Le coin est-il droit ?",
      schema: equerreDuMacon,
      solution:
        "On travaille dans le triangle ABD dont le plus grand côté est la diagonale. D'un côté, 10² = 100. De l'autre, 8² + 6² = 64 + 36 = 100. Les deux résultats sont égaux, donc d'après la réciproque du théorème de Pythagore, le triangle est rectangle en A : le coin est bien droit.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Dans un triangle rectangle, quel côté appelle-t-on l'hypoténuse, et comment le reconnaît-on à coup sûr ?",
      correction:
        "L'hypoténuse est le côté opposé à l'angle droit, c'est-à-dire celui qui ne touche pas le petit carré. On le reconnaît aussi à sa longueur : c'est toujours le plus long des trois côtés.",
      micros: ["pythagore_reconnaitre"],
    },
    {
      question:
        "Un triangle MNP est rectangle en M, avec MN = 6 cm et MP = 8 cm. Combien mesure NP ?",
      correction:
        "Dans le triangle MNP rectangle en M, d'après le théorème de Pythagore : NP² = MN² + MP². Donc NP² = 6² + 8² = 36 + 64 = 100. Or 100 = 10², donc NP = 10 cm.",
      micros: ["pythagore_calculer_hypotenuse", "pythagore_rediger"],
    },
    {
      question:
        "Un triangle a pour côtés 4 cm, 5 cm et 6 cm. Est-il rectangle ? Justifie.",
      correction:
        "Le plus grand côté mesure 6 cm. D'un côté, 6² = 36. De l'autre, 4² + 5² = 16 + 25 = 41. Comme 36 et 41 sont différents, l'égalité de Pythagore n'est pas vérifiée : d'après la réciproque, le triangle n'est pas rectangle.",
      micros: ["pythagore_reciproque_verifier"],
    },
    {
      question:
        "Un maçon veut tracer un angle droit sans équerre. Il mesure 3 m sur un mur, 4 m sur l'autre, et ajuste jusqu'à ce que la distance entre les deux extrémités soit exactement 5 m. Pourquoi son coin est-il droit ?",
      correction:
        "Il utilise la réciproque du théorème de Pythagore. Le plus grand côté mesure 5 m : 5² = 25, et 3² + 4² = 9 + 16 = 25. Les deux résultats sont égaux, donc le triangle est rectangle, et l'angle entre les côtés de 3 m et 4 m est droit.",
      micros: ["pythagore_reciproque_conclure", "pythagore_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesPythagore4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pythagore - 4e",
    section: {
      type: "objectif",
      phrase: "Calculer une longueur, ou prouver un angle droit",
      sousPhrase:
        "Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.",
      encadre: {
        titre: "L'idée",
        texte: "Deux petits carrés remplissent exactement le grand : 9 + 16 = 25.",
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
          "Vérifier qu'une dalle est rectangulaire, qu'une varangue est d'équerre ; calculer une distance à vol d'oiseau, la hauteur d'un arbre, la longueur d'une rampe.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La tablette babylonienne Plimpton 322 aligne des triplets comme 3-4-5 il y a 3800 ans — mille ans avant Pythagore.",
      },
    },
  },
  {
    titre: "Le vocabulaire",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "L'hypoténuse est en face de l'angle droit",
      sousPhrase:
        "Ce n'est ni « celle du bas », ni « la plus penchée » : c'est celle qui ne touche pas le petit carré.",
      encadre: {
        titre: "Contrôle rapide",
        texte: "L'hypoténuse est toujours le plus long des trois côtés.",
      },
    },
  },
  {
    titre: "Les deux sens du théorème",
    badge: "2 repères",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Le théorème",
          texte:
            "On SAIT que le triangle est rectangle, on CHERCHE une longueur. On écrit l'égalité, puis on calcule.",
        },
        {
          titre: "La réciproque",
          texte:
            "On CONNAÎT les trois longueurs, on CHERCHE si l'angle est droit. On compare le carré du plus grand côté à la somme des deux autres.",
        },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePythagore4e.methode.map((m) => ({
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
      cartes: fichePythagore4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "L'échelle contre le mur",
    section: {
      type: "exemple",
      enonce: "Une échelle de 13 m, le pied à 5 m du mur.",
      question: "À quelle hauteur touche-t-elle le mur ?",
      correction:
        "169 = 25 + AC², donc AC² = 169 − 25 = 144, et 144 = 12². L'échelle touche le mur à 12 m.",
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
      enonce: "Un triangle a pour côtés 4 cm, 5 cm et 6 cm.",
      question: "Est-il rectangle ?",
      indice: "Compare 6² à la somme 4² + 5².",
      correction:
        "6² = 36, et 4² + 5² = 16 + 25 = 41. Les deux résultats diffèrent : le triangle n'est pas rectangle.",
    },
  },
];
