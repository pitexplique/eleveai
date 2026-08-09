// lib/tutor-v4/questionBank/cp/maths/masse.bank.ts
//
// Les masses du CP, écrites à la main. La plus courte banque de la classe, et
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
// de masses clairement différentes (boites ou bouteilles opaques identiques de
// masses différentes) ». Autrement dit : l'œil ne sait pas peser. Son cousin le
// plus connu marche dans l'autre sens — le gros ballon de plage est plus léger
// que la petite bille en fer.
//
// ⛔ PAS DE CANVAS BALANCE. La variante `balance` fait pencher le fléau toute
// seule d'après le champ `grammes` : sur une question dont le piège est
// justement qu'on ne peut pas deviner, le dessin donnerait la réponse. Et de
// toute façon le CP n'a pas de grammes.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

// Rangés du plus léger au plus lourd. Aucun n'a de masse chiffrée : c'est le
// programme du CP.
const OBJETS = [
  { nom: "une plume", rang: 1 },
  { nom: "une feuille de papier", rang: 2 },
  { nom: "une gomme", rang: 3 },
  { nom: "un crayon", rang: 4 },
  { nom: "une pomme", rang: 5 },
  { nom: "un cahier", rang: 6 },
  { nom: "une trousse pleine", rang: 7 },
  { nom: "un dictionnaire", rang: 8 },
  { nom: "un cartable plein", rang: 9 },
  { nom: "une chaise", rang: 10 },
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
      "Au marché, on soupèse deux mangues pour choisir la plus lourde. C'est la main qui décide, pas l'œil.",
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
    tags: ["cp", "masse", "lexique", "template"],
    generate: () => {
      const [a, b] = shuffle(OBJETS).slice(0, 2);
      const lourd = a.rang > b.rang ? a : b;
      const leger = a.rang > b.rang ? b : a;
      const chercheLourd = randomChoice([true, false]);
      const bonne = chercheLourd ? lourd.nom : leger.nom;
      return {
        text: `Qu'est-ce qui est le plus ${chercheLourd ? "LOURD" : "LÉGER"} : ${a.nom} ou ${b.nom} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          chercheLourd ? leger.nom : lourd.nom,
          "les deux pèsent pareil",
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux masses sans balance, c'est soupeser : on imagine chaque objet dans une main.",
          "On se demande lequel fatiguerait le bras le plus vite.",
          `On soulève ${leger.nom} sans effort ; ${lourd.nom} demande de la force.`,
          `C'est ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MASSE_COMPARER — LE piège : l'œil ne pèse pas
     Le BO demande des boites OPAQUES IDENTIQUES de masses
     différentes. Tout est dans le mot « identiques ».
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_masse_comparer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Deux boites fermées sont exactement de la même taille et de la même couleur. Comment savoir laquelle est la plus lourde ?",
    format: "qcm",
    choices: [
      "en les soupesant, une dans chaque main",
      "en regardant laquelle est la plus grande",
      "en les secouant pour écouter",
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
    id: "cp_masse_comparer_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le plateau le plus bas porte le plus lourd.",
    tags: ["cp", "masse", "comparer", "template"],
    generate: () => {
      const [a, b] = shuffle(OBJETS).slice(0, 2);
      const gaucheDescend = randomChoice([true, false]);
      const lourd = gaucheDescend ? a : b;
      const leger = gaucheDescend ? b : a;
      return {
        text: `Sur une balance à deux plateaux, on pose ${a.nom} à gauche et ${b.nom} à droite. Le plateau de ${gaucheDescend ? "gauche" : "droite"} descend. Lequel est le plus lourd ?`,
        format: "qcm",
        choices: makeChoices(lourd.nom, [
          leger.nom,
          "les deux pèsent pareil",
          "celui qui monte est le plus lourd",
        ]),
        expected: [lourd.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une balance à deux plateaux, le plateau le plus lourd descend.",
          "On regarde quel côté est le plus bas, et on lit ce qu'il porte.",
          `C'est le plateau de ${gaucheDescend ? "gauche" : "droite"} qui descend : ${lourd.nom} est donc plus lourd que ${leger.nom}, qui remonte.`,
          `Le plus lourd est ${lourd.nom}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_MASSE_CONTENANCE_ESTIMER — ranger trois objets
     L'identifiant garde son nom d'origine : la progression des
     élèves est rangée dessous. Il ne parle plus que de masses.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_masse_estimer_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "masse_contenance",
    microId: "cp_masse_contenance_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Range du plus LÉGER au plus LOURD : un cartable plein, une gomme, une pomme.",
    format: "qcm",
    choices: [
      "une gomme, une pomme, un cartable plein",
      "un cartable plein, une pomme, une gomme",
      "une pomme, une gomme, un cartable plein",
      "une gomme, un cartable plein, une pomme",
    ],
    expected: ["une gomme, une pomme, un cartable plein"],
    comparator: "mcq_exact",
    hint: "Commence par celui que tu soulèves d'un seul doigt.",
    explanation: exp(
      "Ranger des masses, c'est comparer les objets deux à deux, puis les mettre à la suite.",
      "On cherche le plus léger, on le pose en premier, et on recommence avec ceux qui restent.",
      "La gomme se soulève d'un doigt. La pomme tient dans une main mais pèse déjà un peu. Le cartable plein se porte sur le dos.",
      "L'ordre est : une gomme, une pomme, un cartable plein.",
    ),
    tags: ["cp", "masse", "ranger", "qcm"],
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
    tags: ["cp", "masse", "ranger", "template"],
    generate: () => {
      const tirage = shuffle(OBJETS).slice(0, 3);
      const duLegerAuLourd = randomChoice([true, false]);
      const range = [...tirage].sort((x, y) =>
        duLegerAuLourd ? x.rang - y.rang : y.rang - x.rang,
      );
      const noms = (l: typeof range) => l.map((o) => o.nom).join(", ");
      const inverse = [...range].reverse();
      const echangeDebut = [range[1], range[0], range[2]];
      const echangeFin = [range[0], range[2], range[1]];
      return {
        text: `Range du plus ${duLegerAuLourd ? "LÉGER au plus LOURD" : "LOURD au plus LÉGER"} : ${noms(tirage)}.`,
        format: "qcm",
        choices: makeChoices(noms(range), [
          noms(inverse),
          noms(echangeDebut),
          noms(echangeFin),
        ]),
        expected: [noms(range)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger trois masses, c'est les comparer deux à deux, comme sur une balance.",
          `On cherche le plus ${duLegerAuLourd ? "léger" : "lourd"}, on le pose en premier, puis on recommence.`,
          `Le plus ${duLegerAuLourd ? "léger" : "lourd"} est ${range[0].nom}, ensuite vient ${range[1].nom}, et enfin ${range[2].nom}.`,
          `L'ordre est : ${noms(range)}.`,
        ),
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
    text: "Avec une balance à deux plateaux, comment ranger trois objets du plus léger au plus lourd ?",
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
      "On compare le premier et le deuxième, puis le deuxième et le troisième. Si le premier est plus léger que le deuxième, et le deuxième plus léger que le troisième, alors l'ordre est trouvé sans même les avoir tous posés ensemble.",
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
    text: "Sur une balance, la boite A est plus lourde que la boite B, et la boite B est plus lourde que la boite C. Quelle est la plus lourde des trois ?",
    format: "qcm",
    choices: ["la boite A", "la boite B", "la boite C", "on ne peut pas savoir"],
    expected: ["la boite A"],
    comparator: "mcq_exact",
    hint: "Range-les l'une après l'autre : A est au-dessus de B, et B au-dessus de C.",
    explanation: exp(
      "Quand on connait deux comparaisons qui se suivent, on peut les enchainer.",
      "On range les boites l'une après l'autre, de la plus lourde à la plus légère.",
      "A est plus lourde que B, et B est plus lourde que C. En les rangeant : A, puis B, puis C. A est donc plus lourde que les deux autres, même si on ne l'a jamais posée à côté de C.",
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
    text: "Un sac de plumes et un sac de billes ont exactement la même taille. Peut-on dire qu'ils pèsent pareil ?",
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
      "Les deux sacs occupent la même place, mais l'un est rempli de plumes et l'autre de billes. Dans les mains, la différence est énorme : c'est le sac de billes qui tire le bras.",
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
    hint: "Enchaine les deux comparaisons avant de répondre.",
    tags: ["cp", "masse", "defi", "template"],
    generate: () => {
      const [x, y, z] = shuffle(["A", "B", "C", "D"]).slice(0, 3);
      const chercheLourd = randomChoice([true, false]);
      const bonne = chercheLourd ? `la boite ${x}` : `la boite ${z}`;
      return {
        text: `La boite ${x} est plus lourde que la boite ${y}. La boite ${y} est plus lourde que la boite ${z}. Quelle est la plus ${chercheLourd ? "LOURDE" : "LÉGÈRE"} des trois ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `la boite ${y}`,
          chercheLourd ? `la boite ${z}` : `la boite ${x}`,
          "on ne peut pas savoir",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux comparaisons qui se suivent permettent d'en déduire une troisième.",
          "On range les trois boites à la suite, de la plus lourde à la plus légère.",
          `${x} est plus lourde que ${y}, et ${y} est plus lourde que ${z}. L'ordre est donc ${x}, puis ${y}, puis ${z}.`,
          `La plus ${chercheLourd ? "lourde" : "légère"} est ${bonne}.`,
        ),
      };
    },
  },
];
