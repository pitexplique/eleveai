// lib/tutor-v4/questionBank/cp/maths/longueur.bank.ts
//
// Les longueurs du CP, écrites à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Au CP, les travaux sur les longueurs s'appuient principalement sur des
//     MANIPULATIONS » : on compare avant de mesurer ;
//   — le lexique à installer : long, court, près, loin ;
//   — comparer deux objets déplaçables en faisant coïncider une extrémité et
//     en les superposant ; comparer deux objets NON déplaçables en reportant
//     leur longueur avec une ficelle ou une bandelette ; ordonner jusqu'à cinq
//     baguettes ;
//   — mesurer un segment avec une règle graduée en centimètres, et en
//     construire un d'une longueur donnée ;
//   — deux unités seulement : le mètre et le centimètre, symboles m et cm,
//     avec 1 m = 100 cm. ⛔ PAS de kilomètre : il arrive au CE1. Ni décimètre
//     ni millimètre : ils arrivent au CE2 ;
//   — quelques longueurs de référence, pour estimer la hauteur de la porte ou
//     la largeur de la classe. Le BO donne l'item mot pour mot : « L'élève
//     sait dire si la longueur d'une trousse est plutôt 2 cm, 20 cm ou 1 m. »
//
// LE PIÈGE DE LA NOTION : comparer sans aligner. Deux crayons posés côte à
// côte, l'un décalé vers l'avant, et le plus court a l'air du plus long. Son
// cousin s'attrape sur la règle : on pose le bord de la règle au début de
// l'objet au lieu du zéro, ou on commence à lire au 1 — et il manque toujours
// un centimètre.
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS. Chaque gabarit tire un enfant de la
// troupe, un objet d'enfant (ruban, serpent, guirlande, chenille…) et une
// tournure. Les dessins PORTENT la question :
//   — deux rubans sur un quadrillage (`figure_libre`) : on compare, on compte
//     les carreaux ; décalés à ★4, c'est le piège de l'alignement ;
//   — une rangée de carreaux = l'unité posée bout à bout (on compte) ;
//   — la règle (`number_line` de 0 à 12 ou plus) et le segment posé dessus ;
//   — l'objet du quotidien (`objets`) pour choisir l'unité ou estimer.
// ⛔ Aucun dessin n'écrit la réponse : le nombre de carreaux n'est jamais
// écrit, et la question « combien mesure-t-il » demande de LIRE la règle.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type {
  FigureLibreCanvasData,
  NumberLineCanvasData,
  ObjetId,
  ObjetsCanvasData,
  SchemaBarreCanvasData,
  TutorBankItemV4,
} from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

const PRENOMS = [
  "Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha",
  "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Léa", "Enzo",
] as const;
const commenceParVoyelle = (mot: string) => /^[aeiouéèêâîôû]/i.test(mot);
/** « de Nina », « d'Inès ». */
const de = (mot: string) => (commenceParVoyelle(mot) ? `d'${mot}` : `de ${mot}`);
const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);
const deuxPrenoms = () => shuffle(PRENOMS).slice(0, 2) as [string, string];

/* Les choses longues d'un enfant : `le` est l'article, `f` le genre (pour
   « le plus long » / « la plus longue »). */
const CHOSES = [
  { le: "le ruban", pl: "rubans", f: false },
  { le: "le serpent en papier", pl: "serpents en papier", f: false },
  { le: "le train de wagons", pl: "trains de wagons", f: false },
  { le: "la guirlande", pl: "guirlandes", f: true },
  { le: "la corde à sauter", pl: "cordes à sauter", f: true },
  { le: "la chenille", pl: "chenilles", f: true },
  { le: "la frise", pl: "frises", f: true },
  { le: "l'écharpe", pl: "écharpes", f: true },
  { le: "la bande de papier", pl: "bandes de papier", f: true },
  { le: "le mur de briques", pl: "murs de briques", f: false },
  { le: "le collier de perles", pl: "colliers de perles", f: false },
  { le: "la file de fourmis", pl: "files de fourmis", f: true },
] as const;
type Chose = (typeof CHOSES)[number];
const plus = (c: Chose, long: boolean) =>
  c.f ? (long ? "la plus longue" : "la plus courte") : long ? "le plus long" : "le plus court";
/** « le ruban le plus long », « l'écharpe la plus courte ». */
const leChosePlus = (c: Chose, long: boolean) => `${c.le} ${plus(c, long)}`;

/** Deux rubans sur un quadrillage : en haut le premier, en bas le second.
 *  `decal` = la colonne où chacun commence (0 = aligné à gauche). */
function deuxRubans(a: number, b: number, decalA = 0, decalB = 0): FigureLibreCanvasData {
  const cols = Math.max(a + decalA, b + decalB) + 1;
  const cellSize = cols > 15 ? 18 : 22;
  const ligne = (row: number, n: number, d: number) =>
    Array.from({ length: n }, (_, k) => [row, d + k] as [number, number]);
  return {
    kind: "figure_libre",
    size: { cellSize },
    grid: { rows: 3, cols, filledCells: [...ligne(0, a, decalA), ...ligne(2, b, decalB)] },
    display: { showGrid: true, showFilled: true, showPerimeter: true },
    colors: { filled: "#fdba74" },
  };
}

/** Une rangée de `n` carreaux : l'unité posée `n` fois bout à bout. */
function rangee(n: number): FigureLibreCanvasData {
  return {
    kind: "figure_libre",
    size: { cellSize: n > 12 ? 22 : 26 },
    grid: { rows: 1, cols: n, filledCells: Array.from({ length: n }, (_, k) => [0, k] as [number, number]) },
    display: { showGrid: true, showFilled: true, showPerimeter: true },
    colors: { filled: "#a7f3d0" },
  };
}

/** La règle graduée en cm, et le segment posé de `debut` à `fin`. */
function regle(debut: number, fin: number | null, depart?: number): NumberLineCanvasData {
  const max = Math.max(12, (fin ?? depart ?? 0) + 2);
  return {
    kind: "number_line",
    size: { width: 360, height: 90 },
    // Une graduation muette avant le 0, comme la marge d'une vraie règle : sans
    // elle, la flèche de l'axe tombait sur le 0 et sur le crochet du segment.
    min: -1,
    max,
    step: 1,
    valeursEcrites: Array.from({ length: max + 1 }, (_, k) => k),
    intervalles:
      fin === null ? [] : [{ de: debut, a: fin, deInclus: true, aInclus: true, color: "#f97316" }],
    points: depart === undefined ? [] : [{ value: depart, label: "départ", color: "#2563eb" }],
    display: { showTicks: true, showValues: true, showZero: true, showPoints: true, showPointLabels: true },
  };
}

function objet(quoi: ObjetId, label: string): ObjetsCanvasData {
  return { kind: "objets", elements: [{ quoi, label }], mode: "couleur", size: { width: 200 } };
}

/* Les objets qu'on pose sur la règle. */
const OBJETS_REGLE = [
  "le crayon", "la gomme", "la paille", "la plume de Pic", "la chenille", "le clou",
  "la craie", "le ruban", "la brindille", "le pinceau", "la carotte", "la cuillère",
  "le ver de terre", "la fourchette", "le bâton de colle", "la sucette",
] as const;

export const longueurBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_LONGUEUR_LEXIQUE — long, court, près, loin
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_lexique_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 1,
    theme: "neutral",
    text: "Un crayon neuf et un petit bout de crayon presque fini. Lequel est le plus COURT ?",
    format: "qcm",
    choices: [
      "le petit bout de crayon",
      "le crayon neuf",
      "les deux pareil",
      "on ne peut pas savoir",
    ],
    expected: ["le petit bout de crayon"],
    comparator: "mcq_exact",
    hint: "« Court », c'est le contraire de « long ».",
    explanation: exp(
      "« Long » et « court » servent à comparer deux longueurs.",
      "On regarde lequel des deux objets s'étend le moins.",
      "Le crayon neuf est long, le bout de crayon est court : on l'a taillé beaucoup de fois.",
      "Le plus court est le petit bout de crayon.",
    ),
    tags: ["cp", "longueur", "lexique", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_lexique_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 2,
    theme: "reunion",
    text: "Ton école est à 200 pas de chez toi, et la boulangerie à 20 pas. Laquelle est le plus PRÈS ?",
    format: "qcm",
    choices: ["la boulangerie", "l'école", "les deux pareil", "on ne peut pas savoir"],
    expected: ["la boulangerie"],
    comparator: "mcq_exact",
    hint: "« Près », c'est quand il y a peu de chemin à faire.",
    explanation: exp(
      "« Près » et « loin » comparent des distances : le chemin qu'il faut parcourir.",
      "On compare les deux distances comme deux nombres.",
      "20 pas, c'est moins que 200 pas. Il y a donc moins de chemin jusqu'à la boulangerie.",
      "La boulangerie est le plus près.",
    ),
    tags: ["cp", "longueur", "lexique", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_lexique_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine les deux objets posés l'un à côté de l'autre.",
    tags: ["cp", "longueur", "lexique", "template"],
    generate: () => {
      const objets = [
        { nom: "une gomme", rang: 1 },
        { nom: "un crayon", rang: 2 },
        { nom: "une règle", rang: 3 },
        { nom: "un bras", rang: 4 },
        { nom: "une table", rang: 5 },
        { nom: "un tableau de classe", rang: 6 },
        { nom: "un couloir d'école", rang: 7 },
      ] as const;
      const [a, b] = shuffle(objets).slice(0, 2);
      const long = a.rang > b.rang ? a : b;
      const court = a.rang > b.rang ? b : a;
      const chercheLong = randomChoice([true, false]);
      const bonne = chercheLong ? long.nom : court.nom;
      return {
        text: `Qu'est-ce qui est le plus ${chercheLong ? "LONG" : "COURT"} : ${a.nom} ou ${b.nom} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          chercheLong ? court.nom : long.nom,
          "les deux pareil",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux longueurs, c'est dire laquelle s'étend le plus.",
          "On imagine les deux objets posés l'un contre l'autre, bien alignés au départ.",
          `On les pose côte à côte, alignés au départ : ${long.nom} dépasse, ${court.nom} s'arrête bien avant.`,
          `Le plus ${chercheLong ? "long" : "court"}, c'est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_lexique_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_lexique",
    difficulty: 1,
    theme: "neutral",
    hint: "Les deux partent du même bord : regarde lequel va le plus loin.",
    tags: ["cp", "longueur", "lexique", "template", "canvas"],
    generate: () => {
      const [a, b] = deuxPrenoms();
      const c = randomChoice(CHOSES);
      let la = randomInt(3, 13);
      let lb = randomInt(3, 13);
      while (Math.abs(la - lb) < 2) lb = randomInt(3, 13);
      const long = randomChoice([true, false]);
      const bonne = (la > lb) === long ? a : b;
      const text = randomChoice([
        `En haut, ${c.le} ${de(a)}. En bas, ${c.le} ${de(b)}. Qui a ${leChosePlus(c, long)} ?`,
        `${a} et ${b} ont chacun ${c.f ? "une" : "un"} ${c.le.replace(/^(le|la|l') ?/, "")}. ${a} est en haut. Qui a ${leChosePlus(c, long)} ?`,
        `Voici les ${c.pl} ${de(a)} (en haut) et ${de(b)} (en bas). Qui a ${leChosePlus(c, long)} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([a, b]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          `« Long » et « court » comparent deux longueurs : ${plus(c, true)} va le plus loin.`,
          "Les deux partent du même bord : on regarde lequel s'arrête le plus loin.",
          `Celui du haut a ${la} carreaux, celui du bas en a ${lb}.`,
          `C'est ${bonne}.`,
        ),
        canvas: deuxRubans(la, lb),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_COMPARER — LE piège : comparer sans aligner
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_comparer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Pour savoir lequel de deux crayons est le plus long, que faut-il faire d'abord ?",
    format: "qcm",
    choices: [
      "poser les deux crayons côte à côte, en alignant leurs bouts de départ",
      "poser les crayons n'importe comment et regarder",
      "regarder lequel est le plus épais",
      "compter les couleurs",
    ],
    expected: ["poser les deux crayons côte à côte, en alignant leurs bouts de départ"],
    comparator: "mcq_exact",
    hint: "Si l'un des deux part plus en avant, la comparaison est faussée.",
    explanation: exp(
      "On ne compare deux longueurs qu'à partir d'un même point de départ.",
      "On superpose les deux objets en faisant coïncider une extrémité.",
      "Si un crayon est décalé vers l'avant, il dépasse à l'arrivée même s'il est plus court : c'est le décalage qu'on voit, pas la longueur. En alignant les deux départs, celui qui dépasse à l'autre bout est vraiment le plus long.",
      "Il faut aligner les deux bouts de départ.",
    ),
    tags: ["cp", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_comparer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Deux bandes de papier sont posées l'une sous l'autre. La bande du haut commence plus à gauche et finit plus à droite. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "la bande du haut est la plus longue",
      "la bande du bas est la plus longue",
      "elles ont la même longueur",
      "on ne peut rien dire du tout",
    ],
    expected: ["la bande du haut est la plus longue"],
    comparator: "mcq_exact",
    hint: "Elle dépasse des DEUX côtés à la fois.",
    explanation: exp(
      "Une bande qui dépasse aux deux extrémités contient entièrement l'autre.",
      "On regarde les deux bouts, pas un seul.",
      "La bande du haut commence avant et finit après : l'autre tient tout entière à l'intérieur. Ici, pas besoin d'aligner — le résultat est déjà sûr. C'est quand une seule extrémité dépasse qu'il faut aligner avant de conclure.",
      "La bande du haut est la plus longue.",
    ),
    tags: ["cp", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_comparer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux partent du même bord : compare les deux nombres.",
    tags: ["cp", "longueur", "comparer", "template", "canvas"],
    generate: () => {
      const [a, b] = deuxPrenoms();
      const c = randomChoice(CHOSES);
      const la = randomInt(4, 16);
      let lb = randomInt(4, 16);
      while (lb === la) lb = randomInt(4, 16);
      const long = randomChoice([true, false]);
      const bonne = (la > lb) === long ? a : b;
      const text = randomChoice([
        `${majuscule(c.le)} ${de(a)} mesure ${la} cm. ${c.f ? "Celle" : "Celui"} ${de(b)} mesure ${lb} cm. Qui a ${leChosePlus(c, long)} ?`,
        `${a} : ${la} cm. ${b} : ${lb} cm. Ce sont leurs ${c.pl}. Qui a ${leChosePlus(c, long)} ?`,
        `Pic compare les ${c.pl} ${de(a)} (${la} cm) et ${de(b)} (${lb} cm). Qui a ${leChosePlus(c, long)} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([a, b, "les deux ont la même longueur"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand deux longueurs sont dans la même unité, on compare les nombres.",
          "On compare les deux nombres de centimètres.",
          `${la} cm et ${lb} cm : ${Math.max(la, lb)} est plus grand que ${Math.min(la, lb)}.`,
          `C'est ${bonne}.`,
        ),
        canvas: deuxRubans(la, lb),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_comparer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Ils ne partent pas du même bord ! Compte les carreaux de chacun.",
    tags: ["cp", "longueur", "comparer", "piege", "template", "canvas"],
    generate: () => {
      const [a, b] = deuxPrenoms();
      const c = randomChoice(CHOSES);
      const egal = Math.random() < 0.25;
      const la = randomInt(4, 11);
      const lb = egal ? la : la + randomChoice([-3, -2, 2, 3]);
      // Le plus court part plus à droite et dépasse l'autre au bout : le piège.
      const decalCourt = randomInt(3, 5);
      const decalA = la < lb ? decalCourt : egal ? randomInt(0, 3) : 0;
      const decalB = lb < la ? decalCourt : egal ? randomInt(0, 3) : 0;
      const long = randomChoice([true, false]);
      const meme = "les deux ont la même longueur";
      const bonne = egal ? meme : (la > lb) === long ? a : b;
      const text = randomChoice([
        `Attention : les ${c.pl} ne partent pas du même bord. ${a} est en haut, ${b} en bas. Qui a ${leChosePlus(c, long)} ?`,
        `En haut, ${c.le} ${de(a)}. En bas, ${c.le} ${de(b)}. Compte les carreaux. Qui a ${leChosePlus(c, long)} ?`,
        `${a} (en haut) et ${b} (en bas) comparent leurs ${c.pl}. Pas du même bord ! Qui a ${leChosePlus(c, long)} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([a, b, meme]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux longueurs, il faut partir du même bord, ou bien compter des unités.",
          "Les deux ne partent pas du même bord : on compte les carreaux de chacun.",
          `En haut : ${la} carreaux. En bas : ${lb} carreaux. Celui qui va le plus loin n'est pas forcément le plus long.`,
          egal ? "Les deux ont la même longueur." : `C'est ${bonne}.`,
        ),
        canvas: deuxRubans(la, lb, decalA, decalB),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_comparer_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "La ficelle a la longueur du premier objet. Elle dépasse ? Elle manque ?",
    tags: ["cp", "longueur", "comparer", "report", "template"],
    generate: () => {
      const OBJETS = [
        { le: "la table", f: true }, { le: "le tapis", f: false }, { le: "le banc", f: false },
        { le: "le lit", f: false }, { le: "la porte", f: true }, { le: "le tableau", f: false },
        { le: "l'armoire", f: true }, { le: "la cabane", f: true }, { le: "le bac à sable", f: false },
        { le: "le canapé", f: false }, { le: "la fenêtre", f: true }, { le: "le toboggan", f: false },
      ] as const;
      const [x, y] = shuffle(OBJETS).slice(0, 2);
      const nom = randomChoice(PRENOMS);
      const cas = randomChoice(["depasse", "manque", "pile"] as const);
      const meme = "les deux ont la même longueur";
      const bonne = cas === "pile" ? meme : cas === "depasse" ? x.le : y.le;
      const suite =
        cas === "depasse" ? "la ficelle dépasse" : cas === "manque" ? "la ficelle est trop courte" : "la ficelle tombe pile au bout";
      const text = randomChoice([
        `${nom} coupe une ficelle de la longueur de ${x.le}. Sur ${y.le}, ${suite}. Qu'est-ce qui est le plus long ?`,
        `On ne peut pas déplacer ${x.le} ni ${y.le}. ${nom} prend une ficelle aussi longue que ${x.le}. Sur ${y.le}, ${suite}. Qu'est-ce qui est le plus long ?`,
        `Pic et ${nom} mesurent ${x.le} avec une ficelle. Puis ils la posent sur ${y.le} : ${suite}. Qu'est-ce qui est le plus long ?`,
      ]).replace(/de le /g, "du ").replace(/à le /g, "au ");
      return {
        text,
        format: "qcm",
        choices: shuffle([x.le, y.le, meme]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une ficelle permet de reporter une longueur qu'on ne peut pas déplacer.",
          "La ficelle a la longueur du premier objet ; on la pose sur le second.",
          cas === "depasse"
            ? `La ficelle dépasse : ${x.le} est plus long que ${y.le}.`
            : cas === "manque"
              ? `La ficelle est trop courte : ${y.le} est plus long que ${x.le}.`
              : "La ficelle tombe pile : les deux ont la même longueur.",
          cas === "pile" ? "Les deux ont la même longueur." : `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_MESURER_UNITE — reporter une unité bout à bout
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_mesurer_unite_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_mesurer_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Comment comparer la largeur de la porte et celle de la fenêtre, qu'on ne peut pas déplacer ?",
    format: "qcm",
    choices: [
      "en reportant la largeur de la porte avec une ficelle",
      "en les regardant de loin",
      "en comptant les carreaux du sol",
      "on ne peut pas les comparer",
    ],
    expected: ["en reportant la largeur de la porte avec une ficelle"],
    comparator: "mcq_exact",
    hint: "Ce qui ne se déplace pas, on l'emporte avec une ficelle.",
    explanation: exp(
      "Reporter une longueur, c'est la transporter ailleurs à l'aide d'une ficelle ou d'une bandelette.",
      "On tend la ficelle sur le premier objet, on marque, puis on va comparer sur le second.",
      "On tend la ficelle d'un bord à l'autre de la porte et on fait un nœud. Puis on pose cette ficelle sur la fenêtre : si le nœud dépasse, la porte est plus large.",
      "On reporte la largeur avec une ficelle.",
    ),
    tags: ["cp", "longueur", "report", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_mesurer_unite_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_mesurer_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les carreaux un par un : chaque carreau est une unité.",
    tags: ["cp", "longueur", "report", "template", "canvas"],
    generate: () => {
      const UNITES = [
        { pl: "cubes", un: "un cube" }, { pl: "trombones", un: "un trombone" },
        { pl: "gommes", un: "une gomme" }, { pl: "dominos", un: "un domino" },
        { pl: "briques", un: "une brique" }, { pl: "craies", un: "une craie" },
        { pl: "cartes", un: "une carte" }, { pl: "bâtons de colle", un: "un bâton de colle" },
      ] as const;
      const OBJETS = [
        "le banc", "le tapis", "la table", "le cahier", "l'étagère", "le cartable", "le livre",
        "la trousse", "la boîte à goûter", "le coffre au trésor", "le train en bois", "la cabane à oiseaux",
      ] as const;
      const u = randomChoice(UNITES);
      const o = randomChoice(OBJETS);
      const nom = randomChoice(PRENOMS);
      const nb = randomInt(4, 13);
      const text = randomChoice([
        `${nom} mesure ${o} en posant des ${u.pl} bout à bout. Chaque carreau est ${u.un}. Combien de ${u.pl} ?`,
        `Chaque carreau est ${u.un}. Combien de ${u.pl} mesure ${o} ${de(nom)} ?`,
        `Pic aligne des ${u.pl} le long ${de(o).replace("de le ", "du ")}. Chaque carreau est ${u.un}. Combien en faut-il ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Mesurer, c'est compter combien de fois une même longueur tient dans l'objet.",
          "On pose l'unité bout à bout, sans trou ni chevauchement, et on compte.",
          `On compte les carreaux : il y en a ${nb}. ${majuscule(o)} mesure donc ${nb} ${u.pl}.`,
          `Il faut ${nb} ${u.pl}.`,
        ),
        canvas: rangee(nb),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_mesurer_unite_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_mesurer_unite",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus l'unité est petite, plus il en faut.",
    tags: ["cp", "longueur", "report", "piege", "template"],
    generate: () => {
      const PAIRES = [
        { grand: "règles", petit: "gommes" }, { grand: "crayons", petit: "trombones" },
        { grand: "pas de géant", petit: "pas de fourmi" }, { grand: "cordes à sauter", petit: "crayons" },
        { grand: "livres", petit: "cubes" }, { grand: "baguettes", petit: "allumettes" },
        { grand: "bras", petit: "mains" }, { grand: "wagons", petit: "billes" },
      ] as const;
      const OBJETS = [
        "La table", "Le couloir", "Le tapis", "Le banc", "La cour", "Le bateau pirate",
        "Le tableau", "La cabane", "Le lit", "Le potager",
      ] as const;
      const p = randomChoice(PAIRES);
      const o = randomChoice(OBJETS);
      const nom = randomChoice(PRENOMS);
      const n = randomInt(3, 9);
      const versPetit = Math.random() < 0.6;
      const [avant, apres] = versPetit ? [p.grand, p.petit] : [p.petit, p.grand];
      const bonne = versPetit ? `plus de ${n}` : `moins de ${n}`;
      const text = randomChoice([
        `${o} mesure ${n} ${avant}. ${nom} ${o.startsWith("La") ? "la" : "le"} mesure avec des ${apres}. En faut-il plus ou moins que ${n} ?`,
        `${nom} trouve que ${o.toLowerCase()} mesure ${n} ${avant}. Avec des ${apres}, combien en faut-il ?`,
        `Pic mesure ${o.toLowerCase()} : ${n} ${avant}. Et avec des ${apres} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([`plus de ${n}`, `moins de ${n}`, `exactement ${n}`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre trouvé dépend de l'unité choisie : l'objet, lui, ne change pas de longueur.",
          "On se demande si la nouvelle unité est plus petite ou plus grande que la première.",
          versPetit
            ? `Des ${apres}, c'est plus petit que des ${avant} : il en faut davantage pour la même longueur.`
            : `Des ${apres}, c'est plus grand que des ${avant} : il en faut moins pour la même longueur.`,
          `Il en faut ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_REGLE — la règle graduée, et son décalage
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_regle_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour mesurer un segment avec une règle graduée, sur quelle graduation faut-il placer le début du segment ?",
    format: "qcm",
    choices: ["sur le 0", "sur le 1", "sur le bord de la règle", "n'importe où"],
    expected: ["sur le 0"],
    comparator: "mcq_exact",
    hint: "Avant de commencer à mesurer, on n'a encore parcouru aucun centimètre.",
    explanation: exp(
      "La mesure d'un segment se lit à partir du zéro de la règle.",
      "On fait coïncider le début du segment avec la graduation 0, puis on lit à l'autre bout.",
      "En partant du 1, on oublie le premier centimètre : un segment de 8 cm serait lu 7 cm. Et le bord de la règle n'est pas toujours au même endroit que le 0 : sur beaucoup de règles, il y a un petit espace avant.",
      "Le début du segment se place sur le 0.",
    ),
    tags: ["cp", "longueur", "regle", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_longueur_regle_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 5,
    theme: "neutral",
    text: "Un segment commence à la graduation 2 et finit à la graduation 9 de la règle. Combien mesure-t-il ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ce n'est pas 9 : la règle était décalée. Compte les centimètres parcourus.",
    explanation: exp(
      "La longueur d'un segment, c'est l'écart entre son début et sa fin, pas le nombre écrit à l'arrivée.",
      "On compte les centimètres entre les deux graduations.",
      "De 2 à 9, on parcourt 7 centimètres : 2 + 7 = 9. Lire directement 9 reviendrait à mesurer depuis le zéro, alors que le segment ne commence pas là.",
      "Le segment mesure 7 cm.",
    ),
    tags: ["cp", "longueur", "regle", "piege"],
  },
  {
    kind: "template",
    id: "cp_longueur_regle_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 5,
    theme: "neutral",
    hint: "Le trait ne commence pas au 0 : compte les centimètres d'un bout à l'autre.",
    tags: ["cp", "longueur", "regle", "piege", "template", "canvas"],
    generate: () => {
      const debut = randomInt(1, 4);
      const fin = debut + randomInt(3, 9);
      const longueur = fin - debut;
      const nom = randomChoice(PRENOMS);
      const obj = randomChoice(OBJETS_REGLE);
      const text = randomChoice([
        `${nom} a posé ${obj} sur la règle, mais pas au 0. Combien mesure ${obj} ?`,
        `Regarde bien où commence ${obj} ${de(nom)}. Combien mesure-t-${obj.startsWith("la") || obj.startsWith("l'écharpe") ? "elle" : "il"}, en cm ?`,
        `Pic a décalé ${obj} sur la règle. Combien de centimètres mesure ${obj} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur se lit entre le début et la fin de l'objet.",
          "Si l'objet ne commence pas au 0, on compte les centimètres entre ses deux bouts.",
          `L'objet va de ${debut} à ${fin}. On compte de ${debut} à ${fin} : ${fin} − ${debut} = ${longueur}.`,
          `Il mesure ${longueur} cm.`,
        ),
        canvas: regle(debut, fin),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_regle_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 2,
    theme: "neutral",
    hint: "L'objet part du 0 : lis le nombre au bout.",
    tags: ["cp", "longueur", "regle", "template", "canvas"],
    generate: () => {
      const longueur = randomInt(3, 12);
      const nom = randomChoice(PRENOMS);
      const obj = randomChoice(OBJETS_REGLE);
      const text = randomChoice([
        `${nom} mesure ${obj} avec sa règle. Combien mesure ${obj} ?`,
        `Combien de centimètres mesure ${obj} ${de(nom)} ?`,
        `Pic pose ${obj} sur la règle, au 0. Combien mesure ${obj}, en cm ?`,
        `${nom} lit la règle au bout ${de(obj).replace("de le ", "du ")}. Combien de cm ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "On mesure une longueur avec une règle graduée en centimètres.",
          "On place le début de l'objet sur le 0, puis on lit le nombre au bout.",
          `L'objet part du 0 et s'arrête au ${longueur}.`,
          `Il mesure ${longueur} cm.`,
        ),
        canvas: regle(0, longueur),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_regle_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde où commence l'objet : au 0 ou au 1 ?",
    tags: ["cp", "longueur", "regle", "piege", "template", "canvas"],
    generate: () => {
      const auZero = Math.random() < 0.4;
      const debut = auZero ? 0 : 1;
      const fin = debut + randomInt(3, 10);
      const vraie = fin - debut;
      const nom = randomChoice(PRENOMS);
      const obj = randomChoice(OBJETS_REGLE);
      const juste = "oui, c'est juste";
      const bonne = auZero ? juste : `non, ${vraie} cm`;
      const text = randomChoice([
        `${nom} dit : « ${majuscule(obj)} mesure ${fin} cm. » Regarde la règle. Est-ce juste ?`,
        `Pic lit ${fin} au bout ${de(obj).replace("de le ", "du ")}. Il dit : « ${fin} cm ! » Est-ce juste ?`,
        `${nom} a mesuré ${obj} : ${fin} cm. Regarde où ${obj} commence. Est-ce juste ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, auZero ? [`non, ${fin - 1} cm`, `non, ${fin + 1} cm`] : [juste, `non, ${fin + 1} cm`]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On lit une longueur sur la règle à partir du 0.",
          "On regarde d'abord où commence l'objet.",
          auZero
            ? `L'objet commence au 0 et finit au ${fin} : il mesure bien ${fin} cm.`
            : `L'objet commence au 1, pas au 0. De 1 à ${fin}, il y a ${vraie} cm.`,
          auZero ? "Oui, c'est juste." : `Non : il mesure ${vraie} cm.`,
        ),
        canvas: regle(debut, fin),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_regle_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_regle",
    difficulty: 4,
    theme: "neutral",
    hint: "Pars du point bleu et avance d'autant de centimètres.",
    tags: ["cp", "longueur", "regle", "tracer", "template", "canvas"],
    generate: () => {
      const depart = randomInt(0, 4);
      const longueur = randomInt(3, 8);
      const fin = depart + longueur;
      const nom = randomChoice(PRENOMS);
      const trait = randomChoice([
        "un trait", "une route", "un pont", "une tige de fleur", "un chemin",
        "une queue de cerf-volant", "une ficelle", "un serpent", "une échelle",
      ]);
      const text = randomChoice([
        `${nom} trace ${trait} de ${longueur} cm. ${nom} part du point bleu. Sur quel nombre s'arrêter ?`,
        `Pic veut ${trait} de ${longueur} cm, à partir du point bleu. Sur quel nombre s'arrête-t-il ?`,
        `${nom} dessine ${trait} de ${longueur} cm depuis le point bleu. Sur quel nombre finir ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(fin)],
        comparator: "number_equal",
        explanation: exp(
          "Tracer un segment de longueur donnée, c'est compter autant de centimètres depuis le départ.",
          "On part du point bleu et on avance d'un centimètre à la fois.",
          `Départ au ${depart}, on avance de ${longueur} : ${depart} + ${longueur} = ${fin}.`,
          `On s'arrête sur le ${fin}.`,
        ),
        canvas: regle(depart, null, depart),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_M_CM — le mètre et le centimètre
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_m_cm_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "C'est le même nombre que le plus grand nombre que tu sais écrire cette année.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On se rappelle le mètre ruban : il porte cent petits traits numérotés.",
      "Un mètre, c'est cent centimètres. Une règle d'écolier fait souvent 20 ou 30 cm : il en faudrait trois ou cinq bout à bout pour faire un mètre.",
      "1 m = 100 cm.",
    ),
    tags: ["cp", "longueur", "m_cm", "remarquable"],
  },
  {
    kind: "template",
    id: "cp_longueur_m_cm_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 1,
    theme: "neutral",
    hint: "Ça tient dans la main ? Ce sont des centimètres. C'est plus grand que toi ? Des mètres.",
    tags: ["cp", "longueur", "m_cm", "unite", "template", "canvas"],
    generate: () => {
      const O = [
        { quoi: "bateau", le: "le bateau", m: true }, { quoi: "maison", le: "la maison", m: true },
        { quoi: "arbre", le: "le grand arbre", m: true }, { quoi: "voiture", le: "la voiture", m: true },
        { quoi: "cle", le: "la clé", m: false }, { quoi: "livre", le: "le livre", m: false },
        { quoi: "pomme", le: "la pomme", m: false }, { quoi: "tasse", le: "la tasse", m: false },
        { quoi: "banane", le: "la banane", m: false }, { quoi: "papillon", le: "le papillon", m: false },
        { quoi: "feuille", le: "la feuille", m: false }, { quoi: "verre", le: "le verre", m: false },
        { quoi: "chapeau", le: "le chapeau", m: false }, { quoi: "poisson", le: "le poisson rouge", m: false },
      ] as const;
      const o = randomChoice(O);
      const nom = randomChoice(PRENOMS);
      const metre = "en mètres (m)";
      const cm = "en centimètres (cm)";
      const bonne = o.m ? metre : cm;
      const text = randomChoice([
        `${nom} veut mesurer ${o.le}. En mètres ou en centimètres ?`,
        `Pour mesurer ${o.le}, quelle unité prend ${nom} ?`,
        `Pic veut savoir la longueur ${de(o.le).replace("de le ", "du ")}. En mètres ou en centimètres ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle([metre, cm]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On mesure en centimètres ce qui est petit, en mètres ce qui est grand.",
          "On se demande si l'objet tient dans la main ou s'il est plus grand que nous.",
          o.m ? `${majuscule(o.le)} est bien plus grand que toi.` : `${majuscule(o.le)} tient dans la main.`,
          `On mesure ${bonne}.`,
        ),
        canvas: objet(o.quoi, o.le.replace(/^(le|la) (grand )?/, "")),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_longueur_m_cm_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 3,
    theme: "neutral",
    text: "Combien mesure une trousse, à peu près ?",
    format: "qcm",
    choices: ["20 cm", "2 cm", "1 m", "100 m"],
    expected: ["20 cm"],
    comparator: "mcq_exact",
    hint: "2 cm, c'est la largeur d'un doigt. 1 m, c'est presque ta taille.",
    explanation: exp(
      "Estimer une longueur, c'est la comparer à une longueur qu'on connait bien.",
      "On essaie chaque proposition et on garde celle qui a du sens.",
      "2 cm, c'est à peine plus qu'un doigt : bien trop petit pour une trousse. 1 m, c'est presque la taille d'un élève de CP : bien trop grand. Il reste 20 cm, la longueur d'une grande règle.",
      "Une trousse mesure environ 20 cm.",
    ),
    tags: ["cp", "longueur", "m_cm", "estimer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_longueur_m_cm_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui tient dans la main se mesure en centimètres, ce qui est plus grand que toi en mètres.",
    tags: ["cp", "longueur", "m_cm", "template"],
    generate: () => {
      const objets = [
        { nom: "une gomme", unite: "le centimètre" },
        { nom: "un crayon", unite: "le centimètre" },
        { nom: "un cahier", unite: "le centimètre" },
        { nom: "une trousse", unite: "le centimètre" },
        { nom: "une coccinelle", unite: "le centimètre" },
        { nom: "une plume de Pic", unite: "le centimètre" },
        { nom: "un doudou", unite: "le centimètre" },
        { nom: "la hauteur de la porte", unite: "le mètre" },
        { nom: "la largeur de la classe", unite: "le mètre" },
        { nom: "la longueur du couloir", unite: "le mètre" },
        { nom: "la hauteur d'un cocotier", unite: "le mètre" },
        { nom: "la longueur d'un bus", unite: "le mètre" },
        { nom: "la longueur de la piscine", unite: "le mètre" },
        { nom: "la hauteur d'une girafe", unite: "le mètre" },
      ] as const;
      const o = randomChoice(objets);
      const nom = randomChoice(PRENOMS);
      const text = randomChoice([
        `Quelle unité convient le mieux pour mesurer ${o.nom} ?`,
        `${nom} veut mesurer ${o.nom}. Quelle unité choisir ?`,
        `Pic demande à ${nom} de mesurer ${o.nom}. Avec quelle unité ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["le centimètre", "le mètre"]),
        expected: [o.unite],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'unité qui donne un nombre simple à dire.",
          "On se demande si l'objet tient dans la main ou s'il dépasse notre taille.",
          o.unite === "le centimètre"
            ? `${majuscule(o.nom)} tient dans la main : en mètres, on n'obtiendrait même pas 1.`
            : `${majuscule(o.nom)} dépasse largement une règle : en centimètres, le nombre serait bien trop grand.`,
          `On utilise ${o.unite}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_m_cm_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_m_cm",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avec ta règle de 20 cm, ou avec un mètre (un grand pas d'adulte).",
    tags: ["cp", "longueur", "m_cm", "estimer", "template", "canvas"],
    generate: () => {
      const O = [
        { quoi: "cle", un: "une clé", bonne: "5 cm", faux: ["5 m", "50 cm"] },
        { quoi: "livre", un: "un livre", bonne: "20 cm", faux: ["2 cm", "2 m"] },
        { quoi: "pomme", un: "une pomme", bonne: "8 cm", faux: ["8 m", "80 cm"] },
        { quoi: "banane", un: "une banane", bonne: "20 cm", faux: ["2 cm", "2 m"] },
        { quoi: "tasse", un: "une tasse", bonne: "10 cm", faux: ["1 cm", "1 m"] },
        { quoi: "voiture", un: "une voiture", bonne: "4 m", faux: ["4 cm", "40 cm"] },
        { quoi: "maison", un: "une maison", bonne: "10 m", faux: ["10 cm", "1 m"] },
        { quoi: "feuille", un: "une feuille d'arbre", bonne: "10 cm", faux: ["10 m", "1 m"] },
        { quoi: "papillon", un: "un papillon", bonne: "5 cm", faux: ["5 m", "50 cm"] },
        { quoi: "chat", un: "un chat", bonne: "40 cm", faux: ["4 cm", "4 m"] },
        { quoi: "cartable", un: "un cartable", bonne: "40 cm", faux: ["4 cm", "4 m"] },
        { quoi: "ballon", un: "un ballon de foot", bonne: "20 cm", faux: ["2 cm", "2 m"] },
      ] as const;
      const o = randomChoice(O);
      const nom = randomChoice(PRENOMS);
      const text = randomChoice([
        `${nom} montre ${o.un} à Pic. Combien mesure-t-${o.un.startsWith("une") ? "elle" : "il"}, à peu près ?`,
        `Combien mesure ${o.un}, à peu près ?`,
        `${nom} devine la longueur ${de(o.un)}. Quel nombre est le bon, à peu près ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(o.bonne, o.faux),
        expected: [o.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour estimer une longueur, on la compare à une longueur qu'on connaît.",
          "Une règle d'écolier mesure 20 cm ; un grand pas d'adulte, à peu près 1 m.",
          `${majuscule(o.un)} mesure à peu près ${o.bonne}. Les autres nombres sont bien trop petits ou bien trop grands.`,
          `À peu près ${o.bonne}.`,
        ),
        canvas: objet(o.quoi, o.un.replace(/^(un|une) /, "").replace(/ (d'arbre|de foot)$/, "")),
      };
    },
  },

  /* =========================================================
     CP_LONGUEUR_DEFI — ranger cinq baguettes, et le mètre qui
     se reconstitue avec des règles d'écolier.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_longueur_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une règle d'écolier mesure 20 cm. Combien de règles faut-il poser bout à bout pour faire 1 mètre ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "1 m = 100 cm. Compte de 20 en 20 jusqu'à 100.",
    explanation: exp(
      "Reporter une longueur bout à bout, c'est chercher combien de fois elle tient dans une plus grande.",
      "On écrit le mètre en centimètres, puis on compte de 20 en 20.",
      "1 m = 100 cm. On compte : 20, 40, 60, 80, 100. Il a fallu cinq règles.",
      "Il faut 5 règles.",
    ),
    tags: ["cp", "longueur", "defi", "piege"],
  },
  {
    kind: "template",
    id: "cp_longueur_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Range d'abord dans ta tête, du plus court au plus long.",
    tags: ["cp", "longueur", "defi", "template"],
    generate: () => {
      const longueurs = shuffle([6, 9, 12, 15, 18, 21, 24]).slice(0, 4);
      const croissant = randomChoice([true, false]);
      const range = [...longueurs].sort((x, y) => (croissant ? x - y : y - x));
      const inverse = [...range].reverse();
      const echangeDebut = [range[1], range[0], range[2], range[3]];
      const echangeFin = [range[0], range[1], range[3], range[2]];
      const cm = (l: number[]) => l.map((x) => `${x} cm`).join(" ; ");
      const T = [
        { pl: "baguettes", f: true }, { pl: "crayons", f: false }, { pl: "rubans", f: false },
        { pl: "serpents en pâte à modeler", f: false }, { pl: "ficelles", f: true }, { pl: "pailles", f: true },
        { pl: "brindilles", f: true }, { pl: "pinceaux", f: false }, { pl: "trains en bois", f: false },
        { pl: "guirlandes", f: true },
      ] as const;
      const t = randomChoice(T);
      const nom = randomChoice(PRENOMS);
      const court = t.f ? "la plus COURTE" : "le plus COURT";
      const long = t.f ? "la plus LONGUE" : "le plus LONG";
      const ordre = croissant ? `${court.replace(/^(le|la)/, "de $1")} ${long.replace(/^(le|la)/, "à $1")}` : `${long.replace(/^(le|la)/, "de $1")} ${court.replace(/^(le|la)/, "à $1")}`;
      const text = randomChoice([
        `Range ces ${t.pl} ${ordre} : ${cm(longueurs)}.`,
        `${nom} a quatre ${t.pl} : ${cm(longueurs)}. Range-les ${ordre}.`,
        `Pic a mélangé les ${t.pl} ${de(nom)} : ${cm(longueurs)}. Range-les ${ordre}.`,
      ]).replace(/à le /g, "au ").replace(/de le /g, "du ");
      return {
        text,
        format: "qcm",
        choices: makeChoices(cm(range), [cm(inverse), cm(echangeDebut), cm(echangeFin)]),
        expected: [cm(range)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger des longueurs écrites dans la même unité revient à ranger des nombres.",
          `On cherche ${croissant ? "la plus petite" : "la plus grande"} longueur, on l'écrit, puis on recommence.`,
          `D'abord ${range[0]} cm, puis ${range[1]} cm, puis ${range[2]} cm, et enfin ${range[3]} cm.`,
          `L'ordre est ${cm(range)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_longueur_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "longueur",
    microId: "cp_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux morceaux mis bout à bout font la longueur totale.",
    tags: ["cp", "longueur", "defi", "template", "canvas"],
    generate: () => {
      const total = randomInt(12, 30);
      const premier = randomInt(4, total - 4);
      const manque = total - premier;
      const nom = randomChoice(PRENOMS);
      const O = [
        "une guirlande", "une frise", "une corde à sauter", "une queue de cerf-volant",
        "un collier de perles", "un ruban", "un chemin de petit train",
        "une écharpe", "un serpent en papier", "une échelle",
      ] as const;
      const o = randomChoice(O);
      const text = randomChoice([
        `${nom} fabrique ${o} de ${total} cm. Il y a déjà ${premier} cm. Combien de cm manque-t-il ?`,
        `Il faut ${o} de ${total} cm. ${nom} en a fait ${premier} cm. Combien de cm reste-t-il à faire ?`,
        `Pic aide ${nom} : ${o} de ${total} cm. Déjà ${premier} cm sont faits. Combien de cm manque-t-il ?`,
      ]);
      const canvas: SchemaBarreCanvasData = {
        kind: "schema_barre",
        total: `${total} cm`,
        parts: [
          { label: "déjà fait", value: `${premier} cm` },
          { label: "manque", unknown: true },
        ],
        display: { showTotal: true, showPartLabels: true, showValues: true },
      };
      return {
        text,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Compléter une longueur, c'est chercher ce qui manque pour atteindre le total.",
          "On part de la longueur déjà faite et on compte jusqu'au total.",
          `De ${premier} à ${total}, il manque ${manque} : ${premier} + ${manque} = ${total}.`,
          `Il manque ${manque} cm.`,
        ),
        canvas,
      };
    },
  },
];

