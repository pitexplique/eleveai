// lib/tutor-v4/questionBank/cp/maths/masse.bank.ts
//
// Les masses du CP, écrites à la main. La plus courte notion de la classe, et
// c'est le programme qui le veut : le BO n'accorde que DEUX objectifs
// d'apprentissage aux masses en cours préparatoire.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Utiliser le lexique associé aux masses » : lourd, léger ;
//   — « Comparer des objets selon leur masse » ;
//   — « Les situations proposées pour travailler sur les masses s'appuient
//     toutes sur des manipulations. »
//   ⛔ AUCUNE UNITÉ. Ni gramme ni kilogramme : ils arrivent au CE1, avec
//     1 kg = 1 000 g. Au CP, on soupèse, on compare, on range — on ne chiffre
//     jamais une masse.
//   ⛔ AUCUNE CONTENANCE non plus : le tableau du BO laisse la ligne vide au
//     CP comme au CE1. Les litres arrivent au CE2.
//
// LE PIÈGE DE LA NOTION, et le BO le construit lui-même : il demande de
// comparer « les masses de deux ou de trois objets D'APPARENCE IDENTIQUE mais
// de masses clairement différentes ». Autrement dit : l'œil ne sait pas peser.
// Son cousin marche dans l'autre sens — le gros ballon est plus léger que la
// petite bille en fer.
//
// ⭐ 10/11/2026 — GÉNÉRATEURS ILLUSTRÉS. Chaque gabarit tire une situation
// (prénoms de la troupe, objets, lieux) × une tournure. Le dessin :
//   — `masse` variante `objets` : les objets à comparer, SANS masse écrite
//     (`showMasses: false`, et aucun champ `masse` n'est rempli) ;
//   — `masse` variante `balance` : le fléau penche d'après `grammes`, qui ne
//     s'affiche jamais (seul `masse` s'écrit). C'est alors la LECTURE de la
//     balance qu'on demande — le dessin porte la question, il ne la résout pas
//     à la place de l'enfant. `showComparison: false` : sinon « même masse »
//     s'écrirait au-dessus d'une balance à l'équilibre.
//   Les `grammes` ne servent qu'à faire pencher le dessin : le CP ne les voit
//   pas.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { MasseCanvasData, MasseCanvasObject, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
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

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const PRENOMS = [
  "Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha",
  "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis",
] as const;

type Objet = { un: string; le: string; label: string; icon: string; palier: number };

// Six paliers, chacun environ cinq fois plus lourd que le précédent : deux
// objets de paliers différents ne se discutent pas. Aucun nombre n'est écrit.
const OBJETS: readonly Objet[] = [
  { un: "une plume", le: "la plume", label: "plume", icon: "🪶", palier: 1 },
  { un: "une feuille d'arbre", le: "la feuille", label: "feuille", icon: "🍃", palier: 1 },
  { un: "un ballon de baudruche", le: "le ballon", label: "ballon", icon: "🎈", palier: 1 },
  { un: "un crayon", le: "le crayon", label: "crayon", icon: "✏️", palier: 2 },
  { un: "une clé", le: "la clé", label: "clé", icon: "🔑", palier: 2 },
  { un: "une cuillère", le: "la cuillère", label: "cuillère", icon: "🥄", palier: 2 },
  { un: "une pomme", le: "la pomme", label: "pomme", icon: "🍎", palier: 3 },
  { un: "une banane", le: "la banane", label: "banane", icon: "🍌", palier: 3 },
  { un: "une orange", le: "l'orange", label: "orange", icon: "🍊", palier: 3 },
  { un: "une brique de lait", le: "la brique de lait", label: "lait", icon: "🥛", palier: 4 },
  { un: "un dictionnaire", le: "le dictionnaire", label: "dictionnaire", icon: "📕", palier: 4 },
  { un: "un ananas", le: "l'ananas", label: "ananas", icon: "🍍", palier: 4 },
  { un: "une pastèque", le: "la pastèque", label: "pastèque", icon: "🍉", palier: 5 },
  { un: "un cartable plein", le: "le cartable", label: "cartable", icon: "🎒", palier: 5 },
  { un: "une citrouille", le: "la citrouille", label: "citrouille", icon: "🎃", palier: 5 },
  { un: "une chaise", le: "la chaise", label: "chaise", icon: "🪑", palier: 6 },
  { un: "un vélo", le: "le vélo", label: "vélo", icon: "🚲", palier: 6 },
  { un: "une valise pleine", le: "la valise", label: "valise", icon: "🧳", palier: 6 },
];

const GRAMMES = [0, 2, 10, 150, 1000, 5000, 12000];

function carte(o: Objet): MasseCanvasObject {
  return { label: o.label, icon: o.icon };
}

/** Les objets côte à côte, aucune masse écrite. */
function objetsCanvas(liste: readonly Objet[]): MasseCanvasData {
  return {
    kind: "masse",
    variant: "objets",
    objets: liste.map(carte),
    display: { showMasses: false, showLabels: true },
  };
}

/** La balance : le fléau penche d'après `grammes`, jamais écrits. */
function balance(
  gauche: MasseCanvasObject,
  droite: MasseCanvasObject,
  gG: number,
  gD: number,
): MasseCanvasData {
  return {
    kind: "masse",
    variant: "balance",
    gauche: { ...gauche, grammes: gG },
    droite: { ...droite, grammes: gD },
    display: { showMasses: false, showLabels: true, showComparison: false },
  };
}

/** Deux objets de paliers différents. */
function paire(ecart = 1): [Objet, Objet] {
  for (;;) {
    const [a, b] = shuffle(OBJETS).slice(0, 2);
    if (Math.abs(a.palier - b.palier) >= ecart) return [a, b];
  }
}

/** Trois objets de paliers tous différents. */
function triplet(): Objet[] {
  for (;;) {
    const t = shuffle(OBJETS).slice(0, 3);
    if (new Set(t.map((o) => o.palier)).size === 3) return t;
  }
}

// Des contenants qui se ressemblent tous : seule la balance peut les départager.
const CONTENANTS = [
  { nom: "boite", icon: "📦", f: true },
  { nom: "caisse", icon: "📦", f: true },
  { nom: "valise", icon: "🧳", f: true },
  { nom: "sac", icon: "👜", f: false },
  { nom: "panier", icon: "🧺", f: false },
  { nom: "paquet", icon: "🎁", f: false },
] as const;
const COULEURS = [
  { m: "rouge", f: "rouge" },
  { m: "bleu", f: "bleue" },
  { m: "vert", f: "verte" },
  { m: "jaune", f: "jaune" },
  { m: "violet", f: "violette" },
  { m: "orange", f: "orange" },
] as const;
const LIEUX_BALANCE = [
  "en classe",
  "au marché",
  "chez l'épicière",
  "à la ferme",
  "à la kermesse",
  "dans la cuisine",
  "à la boulangerie",
  "au jardin",
] as const;

// Le piège : gros mais léger, petit mais lourd.
const GROS_LEGERS = [
  { un: "un gros ballon", le: "le gros ballon", label: "gros ballon", icon: "🎈" },
  { un: "une plume de paon", le: "la plume de paon", label: "plume de paon", icon: "🪶" },
  { un: "un grand papillon en papier", le: "le papillon en papier", label: "papillon", icon: "🦋" },
  { un: "un grand sac vide", le: "le sac vide", label: "sac vide", icon: "🛍️" },
] as const;
const PETITS_LOURDS = [
  { un: "un petit caillou", le: "le petit caillou", label: "caillou", icon: "🪨" },
  { un: "une bille en fer", le: "la bille en fer", label: "bille en fer", icon: "⚙️" },
  { un: "un pot de miel plein", le: "le pot de miel", label: "pot de miel", icon: "🍯" },
  { un: "un petit boulon en fer", le: "le boulon", label: "boulon", icon: "🔩" },
] as const;

export const masseBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_MASSE_LEXIQUE — lourd et léger
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_masse_lexique_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_lexique",
    difficulty: 1,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus LÉGER : une plume ou un dictionnaire ?",
    format: "qcm",
    choices: ["la plume", "le dictionnaire", "les deux pareil", "on ne peut pas savoir"],
    expected: ["la plume"],
    comparator: "mcq_exact",
    hint: "Lequel des deux s'envole si tu souffles dessus ?",
    explanation: exp(
      "« Léger » veut dire qu'un objet ne pèse presque rien dans la main ; « lourd », qu'il tire le bras vers le bas.",
      "On imagine chaque objet posé dans sa main.",
      "Une plume s'envole d'un souffle. Un dictionnaire, il faut le porter à deux mains.",
      "Le plus léger est la plume.",
    ),
    tags: ["cp", "masse", "lexique", "qcm"],
  },
  {
    kind: "template",
    id: "cp_masse_lexique_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_lexique",
    difficulty: 1,
    theme: "neutral",
    hint: "Imagine-le dans tes bras : ton bras tire-t-il vers le bas ?",
    tags: ["cp", "masse", "lexique", "template", "canvas"],
    generate: () => {
      const o = randomChoice(OBJETS.filter((x) => x.palier <= 2 || x.palier >= 5));
      const lourd = o.palier >= 5;
      const bonne = lourd ? "C'est lourd." : "C'est léger.";
      const p = randomChoice(PRENOMS);
      const text = randomChoice([
        `${p} soulève ${o.un}. Est-ce lourd ou léger ?`,
        `Regarde : ${o.un}. Est-ce lourd ou léger ?`,
        `${p} porte ${o.un}. C'est lourd ou c'est léger ?`,
        `Pic le paille-en-queue veut porter ${o.un}. Est-ce lourd ou léger ?`,
        `${p} met ${o.un} dans ses bras. Est-ce lourd ou léger ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: shuffle(["C'est lourd.", "C'est léger."]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Lourd : l'objet tire le bras vers le bas. Léger : on le soulève sans effort.",
          "On imagine l'objet dans ses bras.",
          lourd
            ? `${maj(o.un)} : il faut de la force pour soulever ça. C'est lourd.`
            : `${maj(o.un)} : on soulève ça d'un doigt. C'est léger.`,
          bonne,
        ),
        canvas: objetsCanvas([o]),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_masse_lexique_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_lexique",
    difficulty: 2,
    theme: "neutral",
    text: "Que veut dire « soupeser » un objet ?",
    format: "qcm",
    choices: [
      "le prendre dans la main pour sentir s'il est lourd",
      "le mesurer avec une règle",
      "le regarder de près",
      "le poser sur la table",
    ],
    expected: ["le prendre dans la main pour sentir s'il est lourd"],
    comparator: "mcq_exact",
    hint: "C'est ce qu'on fait au marché avant d'acheter un fruit.",
    explanation: exp(
      "Soupeser, c'est comparer des masses avec ses mains, sans balance.",
      "On prend un objet dans chaque main et on sent lequel tire le plus vers le bas.",
      "Au marché, on soupèse deux melons pour choisir le plus lourd. C'est la main qui décide, pas l'œil.",
      "Soupeser, c'est prendre l'objet dans la main pour sentir s'il est lourd.",
    ),
    tags: ["cp", "masse", "lexique", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_masse_lexique_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_lexique",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine-les l'un après l'autre dans ta main.",
    tags: ["cp", "masse", "lexique", "template", "canvas"],
    generate: () => {
      const [a, b] = paire(2);
      const lourd = a.palier > b.palier ? a : b;
      const leger = a.palier > b.palier ? b : a;
      const p = randomChoice(PRENOMS);
      const tournures = [
        { t: `${p} tient ${a.un} et ${b.un}. Lequel est le plus LOURD ?`, l: true },
        { t: `Qu'est-ce qui est le plus LÉGER : ${a.un} ou ${b.un} ?`, l: false },
        { t: `Qu'est-ce qui est le plus LOURD : ${a.un} ou ${b.un} ?`, l: true },
        { t: `${p} soupèse ${a.un} et ${b.un}. Lequel tire le plus le bras ?`, l: true },
        { t: `${p} veut porter le plus léger : ${a.un} ou ${b.un} ?`, l: false },
        { t: `Pic peut porter un seul objet, le plus léger. Lequel ?`, l: false },
      ];
      const tr = randomChoice(tournures);
      const bonne = tr.l ? lourd.le : leger.le;
      return {
        text: tr.t,
        format: "qcm",
        choices: makeChoices(bonne, [
          tr.l ? leger.le : lourd.le,
          "les deux pèsent pareil",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux masses sans balance, c'est soupeser : on imagine chaque objet dans une main.",
          "On se demande lequel fatiguerait le bras le plus vite.",
          `On soulève ${leger.le} sans effort ; ${lourd.le} demande plus de force.`,
          `C'est ${bonne}.`,
        ),
        canvas: objetsCanvas(shuffle([a, b])),
      };
    },
  },

  /* =========================================================
     CP_MASSE_COMPARER — lire la balance, et LE piège : l'œil
     ne pèse pas.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_masse_comparer_fixed_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une balance à deux plateaux, le plateau de gauche descend. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "ce qui est à gauche est plus lourd",
      "ce qui est à droite est plus lourd",
      "les deux pèsent pareil",
      "la balance est cassée",
    ],
    expected: ["ce qui est à gauche est plus lourd"],
    comparator: "mcq_exact",
    hint: "Pense à une balançoire : qui descend, le plus lourd ou le plus léger ?",
    explanation: exp(
      "Sur une balance à deux plateaux, le plateau le plus lourd descend.",
      "On regarde quel côté est le plus bas.",
      "C'est comme une balançoire dans la cour : celui qui pèse le plus descend et l'autre monte. Ici, c'est le plateau de gauche qui descend.",
      "Ce qui est à gauche est plus lourd.",
    ),
    tags: ["cp", "masse", "comparer", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_masse_comparer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 2,
    theme: "neutral",
    hint: "Le plateau qui descend porte le plus lourd.",
    tags: ["cp", "masse", "comparer", "balance", "template", "canvas"],
    generate: () => {
      const [g, d] = paire(1);
      const lourd = g.palier > d.palier ? g : d;
      const leger = g.palier > d.palier ? d : g;
      const p = randomChoice(PRENOMS);
      const lieu = randomChoice(LIEUX_BALANCE);
      const chercheLourd = randomChoice([true, false]);
      const mot = chercheLourd ? "le plus LOURD" : "le plus LÉGER";
      const text = randomChoice([
        `${p} pèse ${g.un} et ${d.un}. Lequel est ${mot} ?`,
        `Regarde la balance. Lequel est ${mot} ?`,
        `On pèse ${g.un} et ${d.un}. Lequel est ${mot} ?`,
        `${p} regarde la balance. Lequel est ${mot} : ${g.le} ou ${d.le} ?`,
      ]);
      const bonne = chercheLourd ? lourd.le : leger.le;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [chercheLourd ? leger.le : lourd.le, "les deux pèsent pareil"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une balance à deux plateaux, le côté le plus lourd descend, le plus léger monte.",
          "On regarde quel plateau est le plus bas.",
          `Le plateau de ${lourd === g ? "gauche" : "droite"} descend : ${lourd.le} pèse plus que ${leger.le}.`,
          `C'est ${bonne}.`,
        ),
        canvas: balance(carte(g), carte(d), GRAMMES[g.palier], GRAMMES[d.palier]),
      };
    },
  },
  {
    kind: "template",
    id: "cp_masse_comparer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux se ressemblent : seule la balance peut te répondre.",
    tags: ["cp", "masse", "comparer", "balance", "template", "canvas"],
    generate: () => {
      // Deux contenants IDENTIQUES, d'une autre couleur : l'œil ne dit rien,
      // la balance dit tout. Une fois sur cinq, elle reste droite.
      const c = randomChoice(CONTENANTS);
      const [c1, c2] = shuffle(COULEURS).slice(0, 2);
      const art = c.f ? "la" : "le";
      const n1 = `${art} ${c.nom} ${c.f ? c1.f : c1.m}`;
      const n2 = `${art} ${c.nom} ${c.f ? c2.f : c2.m}`;
      const egal = Math.random() < 0.2;
      const gaucheLourd = randomChoice([true, false]);
      const p = randomChoice(PRENOMS);
      const chercheLourd = randomChoice([true, false]);
      const adj = chercheLourd ? (c.f ? "LOURDE" : "LOURD") : c.f ? "LÉGÈRE" : "LÉGER";
      const deux = `deux ${c.nom}s`;
      const quel = c.f ? `Laquelle est la plus ${adj}` : `Lequel est le plus ${adj}`;
      const pareils = c.f ? "pareilles" : "pareils";
      const text = randomChoice([
        `${p} a ${deux} ${pareils}. Regarde la balance. ${quel} ?`,
        `Regarde la balance. ${quel} ?`,
        `${p} pose ${n1} à gauche, ${n2} à droite. ${quel} ?`,
        `Pic a rempli ${deux} de graines. ${quel} ?`,
        `${maj(randomChoice(LIEUX_BALANCE))}, ${p} pèse ${deux}. ${quel} ?`,
      ]);
      const lourd = gaucheLourd ? n1 : n2;
      const leger = gaucheLourd ? n2 : n1;
      const bonne = egal ? "les deux pèsent pareil" : chercheLourd ? lourd : leger;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [n1, n2, "les deux pèsent pareil"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une balance à deux plateaux, le côté le plus lourd descend. Si les plateaux restent au même niveau, les masses sont égales.",
          "On ne regarde pas les objets, ils se ressemblent : on regarde les plateaux.",
          egal
            ? "Les deux plateaux sont au même niveau : la balance est en équilibre."
            : `Le plateau de ${gaucheLourd ? "gauche" : "droite"} descend : ${lourd} est plus ${c.f ? "lourde" : "lourd"}.`,
          `C'est : ${bonne}.`,
        ),
        canvas: balance(
          { label: `${c.nom} ${c.f ? c1.f : c1.m}`, icon: c.icon },
          { label: `${c.nom} ${c.f ? c2.f : c2.m}`, icon: c.icon },
          egal ? 100 : gaucheLourd ? 200 : 100,
          egal ? 100 : gaucheLourd ? 100 : 200,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_masse_comparer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Deux boites fermées sont pareilles. Comment savoir laquelle est la plus lourde ?",
    format: "qcm",
    choices: [
      "en les soupesant, une dans chaque main",
      "en regardant laquelle est la plus grande",
      "en les regardant de très près",
      "c'est impossible à savoir",
    ],
    expected: ["en les soupesant, une dans chaque main"],
    comparator: "mcq_exact",
    hint: "Elles se ressemblent : les yeux ne serviront à rien.",
    explanation: exp(
      "La masse ne se voit pas : elle se sent, ou se lit sur une balance.",
      "On prend une boite dans chaque main et on sent laquelle tire le plus.",
      "Les deux boites sont identiques à regarder : l'œil ne peut rien dire. Mais dans les mains, la différence est nette tout de suite.",
      "On les soupèse, une dans chaque main.",
    ),
    tags: ["cp", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_masse_comparer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un gros ballon de plage et une petite bille en fer. Lequel est le plus lourd ?",
    format: "qcm",
    choices: [
      "la bille en fer",
      "le ballon de plage",
      "les deux pèsent pareil",
      "le plus gros est toujours le plus lourd",
    ],
    expected: ["la bille en fer"],
    comparator: "mcq_exact",
    hint: "Le ballon est rempli d'air. L'air ne pèse presque rien.",
    explanation: exp(
      "La masse ne dépend pas de la taille : un objet peut être gros et très léger.",
      "On soupèse au lieu de regarder.",
      "Le ballon est rempli d'air, qui ne pèse presque rien. La bille est pleine de fer, une matière très lourde. La petite bille gagne.",
      "La bille en fer est plus lourde.",
    ),
    tags: ["cp", "masse", "comparer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_masse_comparer_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Le plus gros n'est pas toujours le plus lourd.",
    tags: ["cp", "masse", "comparer", "piege", "template", "canvas"],
    generate: () => {
      const g = randomChoice(GROS_LEGERS);
      const l = randomChoice(PETITS_LOURDS);
      const [a, b] = shuffle([g, l]);
      const p = randomChoice(PRENOMS);
      const chercheLourd = randomChoice([true, false]);
      const mot = chercheLourd ? "le plus LOURD" : "le plus LÉGER";
      const text = randomChoice([
        `${p} compare ${a.un} et ${b.un}. Lequel est ${mot} ?`,
        `Qu'est-ce qui est ${mot} : ${a.un} ou ${b.un} ?`,
        `${p} : « Gros = lourd ! » Lequel est ${mot} : ${a.un} ou ${b.un} ?`,
        `Le clown tient ${a.un} et ${b.un}. Lequel est ${mot} ?`,
        `${p} a ${a.un} et ${b.un}. Lequel est ${mot} ?`,
      ]);
      const bonne = chercheLourd ? l.le : g.le;
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [chercheLourd ? g.le : l.le, "les deux pèsent pareil"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La masse ne dépend pas de la taille : un objet peut être gros et très léger.",
          "On se demande de quoi l'objet est fait, au lieu de regarder sa taille.",
          `${maj(g.le)} prend beaucoup de place, mais ne pèse presque rien. ${maj(l.le)} prend peu de place, mais pèse bien plus.`,
          `C'est ${bonne}.`,
        ),
        canvas: objetsCanvas([a, b].map((o) => ({ ...o, palier: 0 }))),
      };
    },
  },

  /* =========================================================
     CP_MASSE_CONTENANCE_ESTIMER — ranger trois objets
     L'identifiant garde son nom d'origine : la progression des
     élèves est rangée dessous. Il ne parle plus que de masses.
  ========================================================= */
  {
    kind: "template",
    id: "cp_masse_estimer_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    hint: "Commence par celui que tu soulèves d'un seul doigt.",
    tags: ["cp", "masse", "ranger", "template", "canvas"],
    generate: () => {
      const tirage = triplet();
      const chercheLeger = randomChoice([true, false]);
      const range = [...tirage].sort((x, y) => x.palier - y.palier);
      const bonne = chercheLeger ? range[0] : range[2];
      const p = randomChoice(PRENOMS);
      const mot = chercheLeger ? "le plus LÉGER" : "le plus LOURD";
      const text = randomChoice([
        `Parmi ces trois objets, lequel est ${mot} ?`,
        `${p} a ${tirage.map((o) => o.un).join(", ")}. Lequel est ${mot} ?`,
        `${p} range sa chambre. Quel objet est ${mot} ?`,
        `Regarde bien. Quel objet est ${mot} ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne.le, [
          chercheLeger ? range[2].le : range[0].le,
          range[1].le,
          "les trois pèsent pareil",
        ]),
        expected: [bonne.le],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver le plus léger ou le plus lourd de trois objets, on les compare deux à deux.",
          "On soupèse le premier et le deuxième, puis le gagnant et le troisième.",
          `Du plus léger au plus lourd : ${range.map((o) => o.le).join(", puis ")}.`,
          `C'est ${bonne.le}.`,
        ),
        canvas: objetsCanvas(tirage),
      };
    },
  },
  {
    kind: "template",
    id: "cp_masse_estimer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare-les deux par deux avant de tout ranger.",
    tags: ["cp", "masse", "ranger", "template", "canvas"],
    generate: () => {
      const tirage = triplet();
      const duLegerAuLourd = randomChoice([true, false]);
      const range = [...tirage].sort((x, y) =>
        duLegerAuLourd ? x.palier - y.palier : y.palier - x.palier,
      );
      const noms = (l: readonly Objet[]) => l.map((o) => o.label).join(", ");
      const inverse = [...range].reverse();
      const echangeDebut = [range[1], range[0], range[2]];
      const echangeFin = [range[0], range[2], range[1]];
      const p = randomChoice(PRENOMS);
      const sens = duLegerAuLourd ? "du plus LÉGER au plus LOURD" : "du plus LOURD au plus LÉGER";
      const text = randomChoice([
        `Range ${sens}.`,
        `${maj(sens)} : quel est le bon ordre ?`,
        `Aide ${p} à ranger ${sens}.`,
        `Pic range ses trésors ${sens}. Quel est le bon ordre ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(noms(range), [noms(inverse), noms(echangeDebut), noms(echangeFin)]),
        expected: [noms(range)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger trois masses, c'est les comparer deux à deux, comme sur une balance.",
          `On cherche le plus ${duLegerAuLourd ? "léger" : "lourd"}, on le pose en premier, puis on recommence.`,
          `D'abord ${range[0].le}, ensuite ${range[1].le}, et enfin ${range[2].le}.`,
          `L'ordre est : ${noms(range)}.`,
        ),
        canvas: objetsCanvas(tirage),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_masse_estimer_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_estimer",
    difficulty: 4,
    theme: "neutral",
    text: "Avec une balance, comment ranger trois objets du plus léger au plus lourd ?",
    format: "qcm",
    choices: [
      "en les comparant deux par deux",
      "en les posant tous les trois sur le même plateau",
      "en les regardant attentivement",
      "en les mesurant avec une règle",
    ],
    expected: ["en les comparant deux par deux"],
    comparator: "mcq_exact",
    hint: "La balance n'a que deux plateaux : elle ne peut comparer que deux objets à la fois.",
    explanation: exp(
      "Une balance à deux plateaux compare deux masses, et deux seulement.",
      "On pèse une première paire, puis une seconde, et on range les résultats à la suite.",
      "On compare le premier et le deuxième, puis le deuxième et le troisième. Si le premier est plus léger que le deuxième, et le deuxième plus léger que le troisième, l'ordre est trouvé.",
      "On les compare deux par deux.",
    ),
    tags: ["cp", "masse", "ranger", "methode", "qcm"],
  },

  /* =========================================================
     CP_MASSE_CONTENANCE_DEFI — ce qui ne se devine pas
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_masse_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La boite A pèse plus que la B. La B pèse plus que la C. Laquelle est la plus lourde ?",
    format: "qcm",
    choices: ["la boite A", "la boite B", "la boite C", "on ne peut pas savoir"],
    expected: ["la boite A"],
    comparator: "mcq_exact",
    hint: "Range-les l'une après l'autre : A est au-dessus de B, et B au-dessus de C.",
    explanation: exp(
      "Quand on connait deux comparaisons qui se suivent, on peut les enchainer.",
      "On range les boites l'une après l'autre, de la plus lourde à la plus légère.",
      "A est plus lourde que B, et B est plus lourde que C. En les rangeant : A, puis B, puis C. A est donc la plus lourde, même si on ne l'a jamais posée à côté de C.",
      "La plus lourde est la boite A.",
    ),
    tags: ["cp", "masse", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_masse_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac de plumes et un sac de billes ont la même taille. Pèsent-ils pareil ?",
    format: "qcm",
    choices: [
      "non, la taille ne dit rien sur la masse",
      "oui, ils ont la même taille",
      "oui, ce sont deux sacs",
      "non, les plumes sont plus lourdes",
    ],
    expected: ["non, la taille ne dit rien sur la masse"],
    comparator: "mcq_exact",
    hint: "Deux objets de la même taille peuvent être remplis de choses très différentes.",
    explanation: exp(
      "La place qu'un objet occupe et sa masse sont deux choses différentes.",
      "On soupèse au lieu de regarder la taille.",
      "Les deux sacs occupent la même place, mais l'un est rempli de plumes et l'autre de billes. C'est le sac de billes qui tire le bras.",
      "Non : la taille ne dit rien sur la masse.",
    ),
    tags: ["cp", "masse", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_masse_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis la balance, puis enchaine avec la phrase.",
    tags: ["cp", "masse", "defi", "balance", "template", "canvas"],
    generate: () => {
      // La balance montre UNE comparaison (x plus lourd que y), la phrase
      // donne l'autre (y plus lourd que z) : il faut enchainer les deux.
      const c = randomChoice(CONTENANTS);
      const [cx, cy, cz] = shuffle(COULEURS).slice(0, 3);
      const art = c.f ? "la" : "le";
      const nom = (k: (typeof COULEURS)[number]) => `${art} ${c.nom} ${c.f ? k.f : k.m}`;
      const lab = (k: (typeof COULEURS)[number]) => `${c.nom} ${c.f ? k.f : k.m}`;
      const chercheLourd = randomChoice([true, false]);
      const adj = chercheLourd ? (c.f ? "LOURDE" : "LOURD") : c.f ? "LÉGÈRE" : "LÉGER";
      const plusLourd = c.f ? "plus lourde" : "plus lourd";
      const p = randomChoice(PRENOMS);
      const xAGauche = randomChoice([true, false]);
      const debut = randomChoice([
        `Regarde la balance.`,
        `${p} pèse deux ${c.nom}s.`,
        `Regarde la balance.`,
        `Pic pèse ses ${c.nom}s.`,
      ]);
      const text = `${debut} ${maj(nom(cy))} est ${plusLourd} que ${art} ${c.f ? cz.f : cz.m}. ${c.f ? "La" : "Le"} plus ${adj} des trois ?`;
      const bonne = chercheLourd ? nom(cx) : nom(cz);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [nom(cy), chercheLourd ? nom(cz) : nom(cx), "on ne peut pas savoir"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux comparaisons qui se suivent permettent d'en déduire une troisième.",
          "On lit la balance, on lit la phrase, puis on range les trois à la suite.",
          `La balance montre que ${nom(cx)} est ${plusLourd} que ${nom(cy)}. Et ${nom(cy)} est ${plusLourd} que ${nom(cz)}. Du plus lourd au plus léger : ${c.f ? cx.f : cx.m}, ${c.f ? cy.f : cy.m}, ${c.f ? cz.f : cz.m}.`,
          `C'est ${bonne}.`,
        ),
        canvas: xAGauche
          ? balance({ label: lab(cx), icon: c.icon }, { label: lab(cy), icon: c.icon }, 300, 200)
          : balance({ label: lab(cy), icon: c.icon }, { label: lab(cx), icon: c.icon }, 200, 300),
      };
    },
  },
];
