// lib/tutor-v4/questionBank/4e/maths/nombres-premiers.bank.ts
//
// ⭐ NOTION OUVERTE LE 30/08/2026 : `nombre_premier`. Avec sa sœur
// `divisibilite`, elle ferme les dix puces ouvertes du chapitre du BO
// « Comprendre et utiliser les notions de divisibilité et de nombres
// premiers ».
//
// ⭐ LA FRACTURE AVEC `divisibilite` EST À SENS UNIQUE : décomposer un nombre
// en facteurs premiers a BESOIN des diviseurs et des critères, alors que
// reconnaître un multiple n'a aucun besoin des nombres premiers. C'est ce qui
// justifie deux notions plutôt qu'une de onze micros.
//
// ⭐⭐ LA NUANCE DU BO À NE PAS RATER : la LISTE à connaître s'arrête à 30
// (4e-A-divisibilite-4), mais la COMPÉTENCE demande de DÉTERMINER les premiers
// jusqu'à 100 (4e-A-divisibilite-7). Retenir et savoir trouver sont deux
// gestes différents, donc deux micros — `premier_definition` porte la liste,
// `premier_determiner` porte la méthode.
//
// ⭐ LE CRIBLE D'ÉRATOSTHÈNE EST LA MÉTHODE, et son arrêt est le vrai contenu :
// on s'arrête à 7 pour tester jusqu'à 100, parce que 11² dépasse déjà 100. Un
// élève qui teste tous les nombres jusqu'à 99 n'a pas compris le crible.
//
// ⚠️ 1 N'EST PAS PREMIER, et ce n'est pas une convention arbitraire : il n'a
// qu'UN seul diviseur, alors que la définition en demande exactement deux.
// L'item figé le traite comme la valeur particulière qu'il est.
//
// ⭐ DES GÉNÉRATEURS, PAS DU FIGÉ. Le figé ne sert qu'aux VALEURS
// PARTICULIÈRES : le cas de 1, et le point d'arrêt du crible.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ⚠️ On écarte les doublons ET la bonne réponse, puis on coupe à trois : il faut
// donc fournir PLUS de quatre leurres, sinon le QCM tombe à trois lignes.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct)
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Les vingt-cinq nombres premiers inférieurs à 100. */
const PREMIERS = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71,
  73, 79, 83, 89, 97,
] as const;

/** Ceux que le BO demande de connaître PAR CŒUR : jusqu'à 30. */
const PREMIERS_30 = PREMIERS.filter((p) => p <= 30);

function estPremier(n: number) {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
}

/** La décomposition en facteurs premiers, écrite en clair. */
function decomposer(n: number): number[] {
  const f: number[] = [];
  let reste = n;
  for (const p of PREMIERS) {
    while (reste % p === 0) {
      f.push(p);
      reste /= p;
    }
    if (reste === 1) break;
  }
  if (reste > 1) f.push(reste);
  return f;
}

export const nombresPremiersBank: TutorBankItemV4[] = [
  /* =========================================================================
     PREMIER_DEFINITION — la définition, et la liste jusqu'à 30
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_definition_tpl_1_est_premier",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Un nombre premier a EXACTEMENT deux diviseurs : 1 et lui-même.",
    tags: ["premier", "definition", "qcm", "template"],
    generate: () => {
      const n = randomInt(11, 60);
      const premier = estPremier(n);
      const correct = premier ? "oui, il est premier" : "non, il n'est pas premier";
      // Le plus petit diviseur autre que 1, pour l'explication.
      let d = 2;
      while (!premier && n % d !== 0) d++;
      return {
        text: `Le nombre ${n} est-il premier ?`,
        format: "qcm",
        choices: shuffle(["oui, il est premier", "non, il n'est pas premier"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : un nombre premier est un entier qui a EXACTEMENT deux diviseurs — 1 et lui-même.\n\n" +
          "Méthode : on cherche un diviseur autre que 1 et le nombre. Un seul suffit à conclure que le nombre n'est pas premier.\n\n" +
          (premier
            ? `Calcul : ${n} n'est divisible ni par 2, ni par 3, ni par 5, ni par 7 — et $11^2 = 121$ dépasse ${n}, donc inutile d'aller plus loin.\n\n`
            : `Calcul : ${n}$ \\div ${d} = ${n / d}$, sans reste. Il a donc au moins trois diviseurs : 1, ${d} et ${n}.\n\n`) +
          `Conclusion : ${n} ${premier ? "EST" : "n'est PAS"} premier. ⭐ Il suffit de tester les nombres premiers dont le carré ne dépasse pas ${n}.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_definition_tpl_2_liste_30",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "La liste jusqu'à 30 est à connaître par cœur : 2, 3, 5, 7, 11, 13, 17, 19, 23, 29.",
    tags: ["premier", "definition", "liste", "qcm", "template"],
    generate: () => {
      const intrus = randomChoice([9, 15, 21, 25, 27, 1, 33] as const);
      const trois = shuffle([...PREMIERS_30]).slice(0, 3);
      const liste = shuffle([...trois, intrus]);
      const correct = String(intrus);
      return {
        text: `Dans la liste ${liste.join(", ")}, lequel n'est PAS un nombre premier ?`,
        format: "qcm",
        choices: liste.map(String),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : les nombres premiers jusqu'à 30 sont 2, 3, 5, 7, 11, 13, 17, 19, 23 et 29 — dix nombres, à connaître par cœur.\n\n" +
          "Méthode : on cherche celui qui a un diviseur autre que 1 et lui-même.\n\n" +
          (intrus === 1
            ? "Calcul : 1 n'a qu'UN seul diviseur, lui-même. Or la définition en demande exactement deux.\n\n"
            : `Calcul : ${intrus} = ${decomposer(intrus).join(" × ")}, il a donc plus de deux diviseurs.\n\n`) +
          `Conclusion : l'intrus est ${intrus}. ⚠️ Les multiples de 3 impairs — 9, 15, 21, 27, 33 — sont les faux amis les plus fréquents : ils n'ont pas l'air composés parce qu'ils sont impairs.`,
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : 1 n'est pas premier, et ce n'est PAS une
    // convention arbitraire. Il n'a qu'un seul diviseur.
    kind: "fixed",
    id: "4e_premier_definition_fixed_un",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_definition",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 1 est-il premier ?",
    format: "qcm",
    choices: [
      "non : il n'a qu'un seul diviseur, alors qu'il en faut deux",
      "oui : il n'est divisible que par 1 et par lui-même",
      "oui : c'est le premier de la liste",
      "non : les nombres premiers commencent à 3",
    ],
    expected: ["non : il n'a qu'un seul diviseur, alors qu'il en faut deux"],
    comparator: "mcq_exact",
    hint: "Compte VRAIMENT ses diviseurs. Combien en trouves-tu ?",
    explanation:
      "Définition : un nombre premier a EXACTEMENT deux diviseurs distincts.\n\n" +
      "Méthode : on compte les diviseurs de 1.\n\n" +
      "Calcul : les diviseurs de 1 sont… 1, et c'est tout. « 1 et lui-même » désignent ici le MÊME nombre : cela n'en fait qu'un.\n\n" +
      "Conclusion : ⭐ 1 n'est donc pas premier, et ce n'est pas une convention arbitraire. Si on l'acceptait, la décomposition en facteurs premiers cesserait d'être unique : on pourrait écrire $12 = 2 \\times 2 \\times 3$, mais aussi $1 \\times 2 \\times 2 \\times 3$, et ainsi de suite sans fin. ⚠️ Le plus petit nombre premier est 2 — et c'est aussi le seul qui soit pair.",
    tags: ["premier", "definition", "valeur_particuliere", "qcm"],
  },

  /* =========================================================================
     PREMIER_DETERMINER — le crible, et surtout son point d'arrêt
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_determiner_tpl_1_tester",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_determiner",
    difficulty: 4,
    theme: "neutral",
    hint: "On teste 2, 3, 5, 7 — et on s'arrête dès que le carré du diviseur dépasse le nombre.",
    tags: ["premier", "determiner", "qcm", "template", "canvas"],
    generate: () => {
      const n = randomInt(53, 99);
      const premier = estPremier(n);
      let d = 2;
      while (!premier && n % d !== 0) d++;
      const correct = premier
        ? "premier : aucun de 2, 3, 5, 7 ne le divise"
        : `pas premier : il est divisible par ${d}`;
      return {
        text: `Le nombre ${n} est-il premier ? Justifie en testant les diviseurs utiles.`,
        format: "qcm",
        choices: makeChoices(correct, [
          "premier : aucun de 2, 3, 5, 7 ne le divise",
          "pas premier : il est divisible par 2",
          "pas premier : il est divisible par 3",
          "pas premier : il est divisible par 5",
          "pas premier : il est divisible par 7",
          "on ne peut pas savoir sans tout tester jusqu'à 99",
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : pour savoir si un nombre est premier, il suffit de le tester par les nombres PREMIERS dont le carré ne le dépasse pas.\n\n" +
          "Méthode : jusqu'à 100, cela ne fait que quatre tests — 2, 3, 5 et 7. Car $11^2 = 121$, déjà au-delà de 100.\n\n" +
          (premier
            ? `Calcul : ${n} n'est divisible ni par 2 (il est impair), ni par 3 (somme des chiffres : ${String(n).split("").reduce((s, c) => s + Number(c), 0)}), ni par 5, ni par 7.\n\n`
            : `Calcul : ${n} \\div ${d} = ${n / d}, sans reste.\n\n`) +
          `Conclusion : ${correct}. ⭐ Quatre tests suffisent jusqu'à 100 — c'est tout l'intérêt de la méthode, et un élève qui teste jusqu'à 99 n'a pas compris le crible.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["on teste", "car"],
          rows: [
            { values: ["2", "2² = 4 ⩽ 100"] },
            { values: ["3", "3² = 9 ⩽ 100"] },
            { values: ["5", "5² = 25 ⩽ 100"] },
            { values: ["7", "7² = 49 ⩽ 100"] },
            { values: ["11 : inutile", "11² = 121 > 100"] },
          ],
          highlight: { row: 4 },
          caption: "quatre tests, et on s'arrête",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    // ⭐ VALEUR PARTICULIÈRE : le point d'arrêt du crible. C'est le vrai contenu
    // de la compétence « déterminer les premiers ⩽ 100 ».
    kind: "fixed",
    id: "4e_premier_determiner_fixed_arret",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_determiner",
    difficulty: 5,
    theme: "neutral",
    text: "Pour savoir si un nombre inférieur à 100 est premier, jusqu'où faut-il tester les diviseurs ?",
    format: "qcm",
    choices: [
      "jusqu'à 7, car 11² dépasse déjà 100",
      "jusqu'à 50, la moitié du nombre",
      "jusqu'à 99, il faut tout tester",
      "jusqu'à 10, car 10 × 10 = 100",
    ],
    expected: ["jusqu'à 7, car 11² dépasse déjà 100"],
    comparator: "mcq_exact",
    hint: "Si un nombre a un diviseur, il en a un second. Lequel des deux est le plus petit ?",
    explanation:
      "Définition : les diviseurs vont par PAIRES — si d divise n, alors n ÷ d le divise aussi.\n\n" +
      "Méthode : dans chaque paire, l'un des deux est plus petit que la racine carrée de n. Il suffit donc de tester jusque-là.\n\n" +
      "Calcul : pour un nombre inférieur à 100, on teste les nombres premiers dont le carré ne dépasse pas 100 : 2, 3, 5 et 7. Le suivant, 11, a pour carré 121 — au-delà.\n\n" +
      "Conclusion : ⭐ quatre tests suffisent, et c'est ce qui rend la méthode praticable. ⚠️ « Jusqu'à 10 » n'est pas faux mais fait tester 4, 6, 8, 9 et 10 pour rien : leurs diviseurs premiers ont déjà été essayés.",
    tags: ["premier", "determiner", "valeur_particuliere", "crible", "qcm"],
  },
  {
    kind: "template",
    id: "4e_premier_determiner_tpl_2_combien",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_determiner",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte-les dans la liste, dizaine par dizaine.",
    tags: ["premier", "determiner", "compter", "template"],
    generate: () => {
      const dizaine = randomInt(1, 9);
      const bas = dizaine * 10;
      const haut = bas + 9;
      const dedans = PREMIERS.filter((p) => p >= bas && p <= haut);
      return {
        text: `Combien y a-t-il de nombres premiers entre ${bas} et ${haut} ?`,
        format: "short",
        expected: [String(dedans.length)],
        comparator: "number_equal",
        explanation:
          "Définition : un nombre premier n'a que deux diviseurs, 1 et lui-même.\n\n" +
          "Méthode : dans une dizaine, on écarte d'emblée les nombres pairs et ceux qui finissent par 5 — il ne reste que quatre candidats à tester.\n\n" +
          `Calcul : entre ${bas} et ${haut}, les premiers sont ${dedans.length ? dedans.join(", ") : "aucun"}.\n\n` +
          `Conclusion : il y en a ${dedans.length}. ⭐ Les nombres premiers se raréfient quand on monte : il y en a quatre entre 1 et 10, et un seul entre 90 et 99.`,
      };
    },
  },

  /* =========================================================================
     PREMIER_DECOMPOSER
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_decomposer_tpl_1_produit",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_decomposer",
    difficulty: 4,
    theme: "neutral",
    hint: "On divise par le plus petit premier possible, encore et encore, jusqu'à tomber sur 1.",
    tags: ["premier", "decomposer", "qcm", "template", "canvas"],
    generate: () => {
      const n = randomChoice([36, 60, 72, 84, 90, 120, 126, 150, 168, 180, 200, 225] as const);
      const f = decomposer(n);
      const correct = f.join(" × ");
      // Des décompositions plausibles mais fausses : un facteur non premier,
      // un facteur oublié, un produit qui ne redonne pas n.
      const avecCompose = [...f.slice(0, -2), f.slice(-2).reduce((a, b) => a * b, 1)].join(" × ");
      return {
        text: `Décompose ${n} en produit de facteurs premiers.`,
        format: "qcm",
        choices: makeChoices(correct, [
          avecCompose,
          f.slice(1).join(" × "),
          [...f, 1].join(" × "),
          f.slice(0, -1).concat([f[f.length - 1] + 1]).join(" × "),
          `${n} × 1`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : décomposer un nombre, c'est l'écrire comme un produit de nombres PREMIERS — et cette écriture est unique.\n\n" +
          "Méthode : on divise par le plus petit premier possible, on recommence sur le quotient, jusqu'à obtenir 1.\n\n" +
          `Calcul : ${n} = ${correct}.\n\n` +
          `Conclusion : ⚠️ deux contrôles avant de conclure — chaque facteur doit être PREMIER, et leur produit doit redonner ${n}. Écrire 1 dans la décomposition ne sert à rien : $1 \\times$ n'importe quoi ne change rien.`,
        canvas: {
          kind: "tableau_donnees",
          headers: ["on divise", "par", "il reste"],
          rows: f.map((p, i) => ({
            values: [
              String(f.slice(i).reduce((a, b) => a * b, 1)),
              String(p),
              String(f.slice(i + 1).reduce((a, b) => a * b, 1)),
            ],
          })),
          highlight: { row: f.length - 1 },
          caption: "jusqu'à tomber sur 1",
          display: { compact: true, striped: true },
          size: { width: 320 },
        },
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_decomposer_tpl_2_simplifier",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_decomposer",
    difficulty: 5,
    theme: "neutral",
    hint: "Décompose le haut et le bas, puis barre ce qui est commun.",
    tags: ["premier", "decomposer", "fraction", "template"],
    generate: () => {
      const k: number = randomChoice([6, 8, 9, 12, 14, 15, 18] as const);
      const a: number = randomChoice([2, 3, 4, 5, 7] as const);
      const b: number = randomChoice([3, 5, 7, 9, 11] as const);
      const num = k * a;
      const den = k * b;
      // La fraction n'est irréductible que si a et b n'ont plus rien en commun.
      const pgcdAB = (() => {
        let x = a;
        let y = b;
        while (y) {
          const t = y;
          y = x % y;
          x = t;
        }
        return x;
      })();
      const na = a / pgcdAB;
      const nb = b / pgcdAB;
      return {
        text: `Rends la fraction ${num}/${den} irréductible. Donne le numérateur de la fraction simplifiée.`,
        format: "short",
        expected: [String(na)],
        comparator: "number_equal",
        explanation:
          "Définition : une fraction est irréductible quand son numérateur et son dénominateur n'ont plus aucun diviseur commun autre que 1.\n\n" +
          "Méthode : on décompose le haut et le bas en facteurs premiers, puis on barre tous les facteurs communs.\n\n" +
          `Calcul : ${num} = ${decomposer(num).join(" × ")} et ${den} = ${decomposer(den).join(" × ")}. En barrant les facteurs communs, il reste ${na}/${nb}.\n\n` +
          `Conclusion : le numérateur vaut ${na}. ⭐ C'est ici que la décomposition SERT : elle montre d'un coup tout ce qui peut se barrer, au lieu de simplifier par petits pas au hasard.`,
      };
    },
  },

  /* =========================================================================
     PREMIER_DEFI
  ========================================================================= */
  {
    kind: "template",
    id: "4e_premier_defi_tpl_1_diviseurs_par_decomposition",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque facteur premier peut apparaître de 0 fois à son exposant.",
    tags: ["premier", "defi", "diviseurs", "template"],
    generate: () => {
      const n = randomChoice([12, 18, 20, 28, 45, 50, 63, 75, 98] as const);
      const f = decomposer(n);
      // Le nombre de diviseurs se lit sur les exposants : (e1+1)(e2+1)…
      const exposants = new Map<number, number>();
      for (const p of f) exposants.set(p, (exposants.get(p) ?? 0) + 1);
      const nb = [...exposants.values()].reduce((a, e) => a * (e + 1), 1);
      const detail = [...exposants.entries()]
        .map(([p, e]) => `${p} apparaît ${e} fois, donc ${e} + 1 = ${e + 1} choix`)
        .join(" ; ");
      return {
        text: `Le nombre ${n} se décompose en ${f.join(" × ")}. Combien a-t-il de diviseurs en tout ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation:
          "Définition : tout diviseur de n s'obtient en choisissant, pour chaque facteur premier, combien de fois on le prend — de 0 fois à son exposant.\n\n" +
          "Méthode : on compte les choix pour chaque facteur, puis on les multiplie.\n\n" +
          `Calcul : ${detail}. En tout : ${[...exposants.values()].map((e) => e + 1).join(" × ")} = ${nb}.\n\n` +
          `Conclusion : ${n} a ${nb} diviseurs. ⭐ On les a comptés SANS EN LISTER AUCUN — c'est exactement ce que la décomposition apporte, et c'est pourquoi elle mérite un chapitre.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_defi_tpl_2_vrai_faux",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Une affirmation générale se réfute par un seul contre-exemple.",
    tags: ["premier", "defi", "logique", "qcm", "template"],
    generate: () => {
      const cas = randomChoice([
        { phrase: "Tous les nombres premiers sont impairs.", vrai: false, pourquoi: "2 est premier et pair — c'est le seul, mais il suffit." },
        { phrase: "Tous les nombres impairs sont premiers.", vrai: false, pourquoi: "9 est impair et vaut 3 × 3." },
        { phrase: "Le seul nombre premier pair est 2.", vrai: true, pourquoi: "tout autre nombre pair est divisible par 2, donc a au moins trois diviseurs." },
        { phrase: "Il existe un plus grand nombre premier.", vrai: false, pourquoi: "Euclide a démontré qu'il y en a une infinité, il y a plus de deux mille ans." },
        { phrase: "Un nombre premier n'a aucun diviseur.", vrai: false, pourquoi: "il en a deux : 1 et lui-même." },
        { phrase: "Deux nombres premiers différents n'ont aucun diviseur commun autre que 1.", vrai: true, pourquoi: "chacun n'a que 1 et lui-même comme diviseurs, et ils sont différents." },
      ]);
      const correct = cas.vrai ? "vrai" : "faux";
      return {
        text: `« ${cas.phrase} » Vrai ou faux ?`,
        format: "qcm",
        choices: shuffle(["vrai", "faux"]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation:
          "Définition : une affirmation générale est fausse dès qu'UN cas la contredit.\n\n" +
          "Méthode : on cherche d'abord un contre-exemple parmi les petits nombres premiers — 2 en fournit beaucoup, puisqu'il est le seul pair.\n\n" +
          `Calcul : ${cas.pourquoi}\n\n` +
          `Conclusion : c'est ${correct}. ⭐ 2 est le contre-exemple de presque toutes les fausses idées sur les nombres premiers : pensez-y d'abord.`,
      };
    },
  },
  {
    kind: "template",
    id: "4e_premier_defi_tpl_3_reconstituer",
    niveau: "4e",
    matiere: "maths",
    notionId: "nombre_premier",
    microId: "premier_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Multiplie les facteurs entre eux.",
    tags: ["premier", "defi", "decomposer", "template"],
    generate: () => {
      const f = shuffle([
        randomChoice([2, 2, 3] as const),
        randomChoice([2, 3, 5] as const),
        randomChoice([3, 5, 7] as const),
        randomChoice([5, 7, 11] as const),
      ]);
      const n = f.reduce((a, b) => a * b, 1);
      return {
        text: `Un nombre se décompose en ${f.join(" × ")}. Quel est ce nombre ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation:
          "Définition : la décomposition en facteurs premiers d'un nombre est un produit qui redonne ce nombre.\n\n" +
          "Méthode : on multiplie les facteurs, deux par deux, dans l'ordre qu'on veut.\n\n" +
          `Calcul : ${f.join(" × ")} = ${n}.\n\n` +
          `Conclusion : le nombre est ${n}. ⭐ Refaire le produit est le CONTRÔLE de toute décomposition : si on ne retombe pas sur le nombre de départ, un facteur a été perdu ou ajouté.`,
      };
    },
  },
];
