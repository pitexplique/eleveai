// lib/tutor-v4/questionBank/ce2/maths/nombres-entiers.bank.ts
//
// Première banque écrite à la main pour le CE2. Jusqu'ici, les 132
// micro-compétences de la classe passaient toutes par un constructeur unique
// qui aiguillait sur la NOTION et non sur la micro-compétence : « calculer un
// rendu de monnaie » servait une question sur un ruban. On reprend donc le
// patron de CM1 et de CM2, une banque par notion.
//
// PÉRIMÈTRE BO : nombres entiers jusqu'à 10 000 (BO n° 41 du 31 octobre 2024,
// cycle 2, applicable à la rentrée 2025). Période 1 au-delà de 1 000, période 2
// au-delà de 10 000.

import type { NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. Écrire ce helper autrement a coûté cher ailleurs : voir
// scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string,
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

// ============================================================
// ÉCRITURE EN LETTRES — jusqu'à 10 000
// On suit l'orthographe traditionnelle, celle des banques de CM1 et de CM2
// (« cinq mille deux cent quarante »), pour que l'élève lise la même chose
// d'une classe à l'autre. Les trois pièges de l'école y sont : le « et » de
// vingt et un qui disparaît à quatre-vingt-un, le « s » de quatre-vingts et de
// deux cents qui tombe dès qu'un nombre suit, et « mille » qui ne s'accorde
// jamais.
// ============================================================

const UNITES = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
  "dix-sept", "dix-huit", "dix-neuf",
];

const DIZAINES = ["", "", "vingt", "trente", "quarante", "cinquante", "soixante"];

function deuxChiffresEnLettres(n: number): string {
  if (n < 20) return UNITES[n];

  if (n < 70) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return DIZAINES[d];
    if (u === 1) return `${DIZAINES[d]} et un`;
    return `${DIZAINES[d]}-${UNITES[u]}`;
  }

  if (n < 80) {
    const reste = n - 60;
    if (reste === 11) return "soixante et onze";
    return `soixante-${UNITES[reste]}`;
  }

  const reste = n - 80;
  if (reste === 0) return "quatre-vingts";
  return `quatre-vingt-${UNITES[reste]}`;
}

function troisChiffresEnLettres(n: number): string {
  const c = Math.floor(n / 100);
  const reste = n % 100;

  if (c === 0) return deuxChiffresEnLettres(reste);

  const centaine =
    c === 1 ? "cent" : reste === 0 ? `${UNITES[c]} cents` : `${UNITES[c]} cent`;

  return reste === 0 ? centaine : `${centaine} ${deuxChiffresEnLettres(reste)}`;
}

export function enLettres(n: number): string {
  if (n < 1000) return troisChiffresEnLettres(n);

  const milliers = Math.floor(n / 1000);
  const reste = n % 1000;
  const partieMille = milliers === 1 ? "mille" : `${troisChiffresEnLettres(milliers)} mille`;

  return reste === 0 ? partieMille : `${partieMille} ${troisChiffresEnLettres(reste)}`;
}

// Un nombre « à zéros » : le piège de la lecture au CE2, celui qui fait écrire
// 4 07 ou 470 pour « quatre mille sept ».
function nombreAvecZeros(): number {
  return randomChoice([
    randomInt(1, 9) * 1000 + randomInt(1, 9),
    randomInt(1, 9) * 1000 + randomInt(1, 9) * 10,
    randomInt(1, 9) * 1000 + randomInt(1, 9) * 100,
  ]);
}

const RANG_LABELS = [
  { rang: "unités", puissance: 1 },
  { rang: "dizaines", puissance: 10 },
  { rang: "centaines", puissance: 100 },
  { rang: "milliers", puissance: 1000 },
] as const;

export const nombresEntiersBank: TutorBankItemV4[] = [
  // ============================================================
  // ce2_entier_lire_ecrire — Lire et écrire jusqu'à 10 000
  // ============================================================

  {
    kind: "fixed",
    id: "ce2_entier_lire_fixed_001_zero_intercale",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    text: "Comment écrit-on en chiffres : « quatre mille sept » ?",
    format: "qcm",
    choices: ["4 007", "4 700", "4 070", "47"],
    expected: ["4 007"],
    comparator: "mcq_exact",
    hint: "Il n'y a ni centaine ni dizaine : les deux places restent vides.",
    explanation: exp(
      "Chaque chiffre occupe une place : milliers, centaines, dizaines, unités.",
      "On écrit les quatre places, même celles qui n'ont rien : on y met un zéro.",
      "4 milliers, 0 centaine, 0 dizaine, 7 unités.",
      "Le nombre s'écrit 4 007.",
    ),
    tags: ["ce2", "nombres_entiers", "lecture", "zero", "qcm", "piege"],
  },

  {
    kind: "fixed",
    id: "ce2_entier_lire_fixed_002_quatre_vingts",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    text: "Comment écrit-on 1 080 en lettres ?",
    format: "qcm",
    choices: [
      "mille quatre-vingts",
      "un mille quatre-vingt",
      "mille quatre-vingt",
      "mille huitante",
    ],
    expected: ["mille quatre-vingts"],
    comparator: "mcq_exact",
    hint: "« mille » ne prend jamais de « un » devant, et quatre-vingts prend un « s » quand rien ne le suit.",
    explanation: exp(
      "Mille est invariable et ne s'écrit jamais « un mille ».",
      "Quatre-vingts prend un « s » lorsqu'aucun nombre ne le suit.",
      "1 000 donne « mille », 80 donne « quatre-vingts ».",
      "On écrit « mille quatre-vingts ».",
    ),
    tags: ["ce2", "nombres_entiers", "lecture", "orthographe", "qcm", "piege"],
  },

  {
    kind: "template",
    id: "ce2_entier_lire_tpl_001_chiffres_vers_lettres",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_lire_ecrire",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis d'abord les milliers, puis les centaines, les dizaines et les unités.",
    tags: ["ce2", "nombres_entiers", "lecture", "template"],
    generate: () => {
      const n = randomInt(1001, 9999);
      const correct = enLettres(n);

      // Les pièges sont des nombres voisins : l'élève doit vraiment lire, pas
      // reconnaître une forme.
      const voisins = [n + 1, n - 1, n + 10, n - 10, n + 100, n - 100]
        .filter((v) => v > 0 && v < 10000)
        .map(enLettres);

      return {
        text: `Comment lit-on le nombre ${formatNumber(n)} ?`,
        format: "qcm",
        choices: makeChoices(correct, voisins),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre se lit classe par classe, en commençant par les milliers.",
          "On sépare les milliers du reste, puis on lit chaque partie.",
          `${formatNumber(n)} se découpe en ${Math.floor(n / 1000)} millier(s) et ${n % 1000}.`,
          `On lit « ${correct} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_entier_lire_tpl_002_lettres_vers_chiffres",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_lire_ecrire",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les quatre places : milliers, centaines, dizaines, unités.",
    tags: ["ce2", "nombres_entiers", "ecriture", "zero", "template"],
    generate: () => {
      const n = nombreAvecZeros();
      const correct = formatNumber(n);

      const milliers = Math.floor(n / 1000);
      const reste = n % 1000;

      // Les erreurs typiques : décaler le reste d'un rang, ou coller les
      // chiffres sans respecter les places vides.
      const pieges = [
        formatNumber(milliers * 1000 + reste * 10),
        formatNumber(milliers * 1000 + Math.floor(reste / 10)),
        formatNumber(milliers * 100 + reste),
        formatNumber(Number(`${milliers}${reste}`)),
        formatNumber(n + 900),
      ].filter((p) => p !== correct);

      return {
        text: `Comment écrit-on en chiffres : « ${enLettres(n)} » ?`,
        format: "qcm",
        choices: makeChoices(correct, pieges),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque rang a sa place, et une place vide s'écrit avec un zéro.",
          "On pose les quatre places, puis on remplit celles qu'on entend.",
          `${milliers} millier(s), et ${reste} pour la suite.`,
          `Le nombre s'écrit ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_entier_milliers — Chiffre des… et nombre de…
  // Le piège central du CE2 : « le chiffre des centaines » n'est pas
  // « le nombre de centaines ».
  // ============================================================

  {
    kind: "fixed",
    id: "ce2_entier_milliers_fixed_001_chiffre_vs_nombre",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_milliers",
    difficulty: 3,
    theme: "neutral",
    text: "Dans 3 472, quel est le NOMBRE de centaines ?",
    format: "qcm",
    choices: ["34", "4", "3", "472"],
    expected: ["34"],
    comparator: "mcq_exact",
    hint: "Le nombre de centaines compte toutes les centaines, y compris celles cachées dans les milliers.",
    explanation: exp(
      "Le chiffre des centaines est celui qui occupe la place des centaines. Le nombre de centaines compte toutes les centaines du nombre.",
      "Pour le nombre de centaines, on regarde tout ce qui est à gauche de la place des centaines, cette place comprise.",
      "3 472 contient 34 centaines, car 34 × 100 = 3 400. Le chiffre des centaines, lui, est 4.",
      "Le nombre de centaines de 3 472 est 34.",
    ),
    tags: ["ce2", "nombres_entiers", "rangs", "qcm", "piege"],
  },

  {
    kind: "template",
    id: "ce2_entier_milliers_tpl_001_chiffre_du_rang",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_milliers",
    difficulty: 1,
    theme: "neutral",
    hint: "Compte les places en partant de la droite : unités, dizaines, centaines, milliers.",
    tags: ["ce2", "nombres_entiers", "rangs", "template"],
    generate: () => {
      // Chiffres tous distincts : sinon deux propositions se ressemblent et le
      // piège « tu as lu la mauvaise place » ne se voit plus.
      const chiffres = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      const n = chiffres[0] * 1000 + chiffres[1] * 100 + chiffres[2] * 10 + chiffres[3];
      const rang = randomChoice(RANG_LABELS);
      const correct = String(Math.floor(n / rang.puissance) % 10);

      return {
        text: `Dans ${formatNumber(n)}, quel est le chiffre des ${rang.rang} ?`,
        format: "qcm",
        choices: makeChoices(correct, chiffres.map(String)),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque chiffre a une place : unités, dizaines, centaines, milliers, en partant de la droite.",
          "On compte les places depuis la droite jusqu'au rang demandé.",
          `Dans ${formatNumber(n)}, la place des ${rang.rang} est occupée par ${correct}.`,
          `Le chiffre des ${rang.rang} est ${correct}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_entier_milliers_tpl_002_nombre_de_rang",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_milliers",
    difficulty: 4,
    theme: "neutral",
    hint: "« Combien de » compte aussi celles qui sont cachées dans les rangs plus grands.",
    tags: ["ce2", "nombres_entiers", "rangs", "template", "piege"],
    generate: () => {
      const n = randomInt(1000, 9999);
      const rang = randomChoice([RANG_LABELS[1], RANG_LABELS[2]]);
      const nombreDeRang = Math.floor(n / rang.puissance);
      const chiffreDuRang = nombreDeRang % 10;
      const correct = String(nombreDeRang);

      return {
        text: `Dans ${formatNumber(n)}, quel est le NOMBRE de ${rang.rang} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(chiffreDuRang),
          String(n % rang.puissance),
          String(Math.floor(n / (rang.puissance * 10))),
          String(nombreDeRang + 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre de dizaines ou de centaines compte toutes celles du nombre, pas seulement celles de sa place.",
          `On enlève ce qui est à droite du rang : on garde tout ce qui vaut au moins ${rang.puissance}.`,
          `${formatNumber(n)} contient ${correct} ${rang.rang}, car ${correct} × ${rang.puissance} = ${formatNumber(nombreDeRang * rang.puissance)}. Le chiffre des ${rang.rang}, lui, est ${chiffreDuRang}.`,
          `Le nombre de ${rang.rang} est ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_entier_decomposer — Décomposer jusqu'à 10 000
  // ============================================================

  {
    kind: "template",
    id: "ce2_entier_decomposer_tpl_001_multiplicative",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_decomposer",
    difficulty: 2,
    theme: "neutral",
    hint: "Un chiffre par rang, et chaque rang vaut 1 000, 100, 10 ou 1.",
    tags: ["ce2", "nombres_entiers", "decomposition", "template"],
    generate: () => {
      const m = randomInt(1, 9);
      const c = randomInt(1, 9);
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = m * 1000 + c * 100 + d * 10 + u;
      const correct = `(${m} × 1 000) + (${c} × 100) + (${d} × 10) + ${u}`;

      return {
        text: `Quelle est la décomposition de ${formatNumber(n)} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          `(${m} × 1 000) + (${c} × 10) + (${d} × 100) + ${u}`,
          `(${m} × 100) + (${c} × 10) + (${d} × 1 000) + ${u}`,
          `(${c} × 1 000) + (${m} × 100) + (${d} × 10) + ${u}`,
          `(${m} × 1 000) + (${c} × 100) + (${u} × 10) + ${d}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Décomposer un nombre, c'est écrire ce que vaut chacun de ses chiffres.",
          "On multiplie chaque chiffre par la valeur de sa place.",
          `${m} milliers valent ${formatNumber(m * 1000)}, ${c} centaines valent ${c * 100}, ${d} dizaines valent ${d * 10}, et il reste ${u} unité(s).`,
          `${formatNumber(n)} = ${correct}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_entier_decomposer_tpl_002_recomposer",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les morceaux, puis relis les quatre places.",
    tags: ["ce2", "nombres_entiers", "decomposition", "recomposition", "template"],
    generate: () => {
      const m = randomInt(1, 9);
      const c = randomInt(0, 9);
      const d = randomInt(0, 9);
      const u = randomInt(0, 9);
      const n = m * 1000 + c * 100 + d * 10 + u;
      const correct = formatNumber(n);

      // Les morceaux sont donnés dans le désordre : l'élève doit lire la valeur
      // de chaque rang, pas l'ordre d'écriture.
      const morceaux = shuffle([
        `${formatNumber(m * 1000)}`,
        `${c * 100}`,
        `${d * 10}`,
        `${u}`,
      ]).join(" + ");

      return {
        text: `Quel nombre vaut ${morceaux} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(m * 1000 + d * 100 + c * 10 + u),
          formatNumber(n + 1000),
          formatNumber(n - 100),
          formatNumber(m * 1000 + c * 10 + d * 100 + u),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Recomposer, c'est rassembler les morceaux à leur place.",
          "On additionne les morceaux en respectant le rang de chacun.",
          `${formatNumber(m * 1000)} + ${c * 100} + ${d * 10} + ${u} = ${correct}.`,
          `Le nombre est ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_entier_comparer — Comparer et ranger
  // ============================================================

  {
    kind: "template",
    id: "ce2_entier_comparer_tpl_001_signe",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_comparer",
    difficulty: 1,
    theme: "neutral",
    hint: "À nombre de chiffres égal, on compare rang par rang en partant de la gauche.",
    tags: ["ce2", "nombres_entiers", "comparaison", "template"],
    generate: () => {
      // On force une différence tardive : deux nombres qui commencent pareil,
      // sinon la comparaison se joue au premier coup d'œil.
      const debut = randomInt(1, 9) * 1000 + randomInt(0, 9) * 100;
      const a = debut + randomInt(0, 9) * 10 + randomInt(0, 9);
      let b = debut + randomInt(0, 9) * 10 + randomInt(0, 9);
      while (b === a) b = debut + randomInt(0, 9) * 10 + randomInt(0, 9);

      const correct = a > b ? ">" : "<";

      return {
        text: `Quel signe faut-il écrire : ${formatNumber(a)} … ${formatNumber(b)} ?`,
        format: "qcm",
        choices: shuffle([">", "<", "="]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Comparer deux nombres, c'est dire lequel est le plus grand.",
          "À nombre de chiffres égal, on compare les milliers, puis les centaines, puis les dizaines, puis les unités.",
          `Les deux nombres ont les mêmes milliers et les mêmes centaines : la différence se joue sur les dizaines et les unités, ${a % 100} contre ${b % 100}.`,
          `On écrit ${formatNumber(a)} ${correct} ${formatNumber(b)}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_entier_comparer_tpl_002_ranger",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche d'abord le plus petit, puis le suivant.",
    tags: ["ce2", "nombres_entiers", "ranger", "template"],
    generate: () => {
      const valeurs: number[] = [];
      while (valeurs.length < 4) {
        const v = randomInt(1000, 9999);
        if (!valeurs.includes(v)) valeurs.push(v);
      }

      const croissant = [...valeurs].sort((x, y) => x - y);
      const correct = croissant.map(formatNumber).join(" < ");

      return {
        text: `Range ces nombres du plus petit au plus grand : ${shuffle(valeurs).map(formatNumber).join(" ; ")}`,
        format: "qcm",
        choices: makeChoices(correct, [
          [...croissant].reverse().map(formatNumber).join(" < "),
          [croissant[1], croissant[0], croissant[2], croissant[3]].map(formatNumber).join(" < "),
          [croissant[0], croissant[2], croissant[1], croissant[3]].map(formatNumber).join(" < "),
          [croissant[0], croissant[1], croissant[3], croissant[2]].map(formatNumber).join(" < "),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Ranger dans l'ordre croissant, c'est aller du plus petit au plus grand.",
          "On repère le plus petit, on l'écrit, puis on recommence avec ceux qui restent.",
          `Le plus petit est ${formatNumber(croissant[0])}, le plus grand est ${formatNumber(croissant[3])}.`,
          `L'ordre est ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_entier_encadrer — Encadrer entre dizaines, centaines, milliers
  // ⚠️ Pas d'arrondi : il n'est pas au programme du cycle 2.
  // ============================================================

  {
    kind: "template",
    id: "ce2_entier_encadrer_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_encadrer",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche celui juste en dessous, puis celui juste au-dessus.",
    tags: ["ce2", "nombres_entiers", "encadrement", "template"],
    generate: () => {
      const pas = randomChoice([10, 100, 1000]);
      const nom = pas === 10 ? "dizaines" : pas === 100 ? "centaines" : "milliers";

      // Le nombre ne doit pas tomber pile sur un multiple du pas : sinon
      // l'encadrement n'a plus de sens et deux pièges se confondent.
      let n = randomInt(1001, 9999);
      while (n % pas === 0) n = randomInt(1001, 9999);

      const bas = Math.floor(n / pas) * pas;
      const haut = bas + pas;
      const correct = `${formatNumber(bas)} < ${formatNumber(n)} < ${formatNumber(haut)}`;

      return {
        text: `Encadre ${formatNumber(n)} entre deux ${nom} qui se suivent.`,
        format: "qcm",
        choices: makeChoices(correct, [
          `${formatNumber(bas - pas)} < ${formatNumber(n)} < ${formatNumber(bas)}`,
          `${formatNumber(haut)} < ${formatNumber(n)} < ${formatNumber(haut + pas)}`,
          `${formatNumber(bas)} < ${formatNumber(n)} < ${formatNumber(haut + pas)}`,
          `${formatNumber(bas - pas)} < ${formatNumber(n)} < ${formatNumber(haut)}`,
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `Encadrer un nombre entre deux ${nom}, c'est trouver celle juste en dessous et celle juste au-dessus.`,
          `On cherche le multiple de ${formatNumber(pas)} le plus proche en dessous, puis on ajoute ${formatNumber(pas)}.`,
          `${formatNumber(bas)} est juste en dessous de ${formatNumber(n)}, et ${formatNumber(haut)} juste au-dessus.`,
          `On écrit ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_entier_droite — Placer sur une droite graduée
  // ============================================================

  {
    kind: "template",
    id: "ce2_entier_droite_tpl_001_lire",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_droite",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde de combien avance chaque graduation.",
    tags: ["ce2", "nombres_entiers", "droite_graduee", "template", "canvas"],
    generate: () => {
      const pas = randomChoice([10, 50, 100]);
      const depart = randomInt(1, 8) * 1000;
      const fin = depart + pas * 10;
      const position = depart + pas * randomInt(1, 9);
      const correct = formatNumber(position);

      return {
        text: "Quel nombre est repéré par le point rouge sur la droite graduée ?",
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(position + pas),
          formatNumber(position - pas),
          formatNumber(position + pas * 2),
          formatNumber(position - pas * 2),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        canvas: numberLine({
          min: depart,
          max: fin,
          step: pas,
          points: [{ value: position, label: "?", color: "#ef4444" }],
          display: { showTicks: true, showValues: true, showPoints: true },
        }),
        explanation: exp(
          "Sur une droite graduée, chaque trait avance toujours de la même valeur.",
          "On trouve le pas entre deux traits, puis on compte les traits depuis le début.",
          `La droite part de ${formatNumber(depart)} et avance de ${formatNumber(pas)} à chaque trait. Le point est ${(position - depart) / pas} trait(s) plus loin.`,
          `Le point repère ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_entier_defi — Le défi de la notion
  // ============================================================

  {
    kind: "template",
    id: "ce2_entier_defi_tpl_001_plus_grand_nombre",
    niveau: "ce2",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "ce2_entier_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pour faire le plus grand nombre, place le plus gros chiffre à la place la plus forte.",
    tags: ["ce2", "nombres_entiers", "defi", "template"],
    generate: () => {
      const chiffres = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 4);
      const plusGrand = Number([...chiffres].sort((a, b) => b - a).join(""));
      const plusPetit = Number([...chiffres].sort((a, b) => a - b).join(""));
      const chercheLePlusGrand = randomChoice([true, false]);
      const correct = formatNumber(chercheLePlusGrand ? plusGrand : plusPetit);

      return {
        text: `Avec les chiffres ${chiffres.join(", ")} utilisés une seule fois chacun, quel est le plus ${chercheLePlusGrand ? "grand" : "petit"} nombre que l'on peut écrire ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(chercheLePlusGrand ? plusPetit : plusGrand),
          formatNumber(Number(chiffres.join(""))),
          formatNumber(Number([...chiffres].sort((a, b) => b - a).reverse().join("")) + 1),
          formatNumber(Number([...chiffres].sort((a, b) => a - b).join("")) + 10),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La place d'un chiffre compte plus que sa valeur : un 9 aux unités pèse 9, aux milliers il pèse 9 000.",
          chercheLePlusGrand
            ? "Pour le plus grand nombre, on range les chiffres du plus grand au plus petit."
            : "Pour le plus petit nombre, on range les chiffres du plus petit au plus grand.",
          `Les chiffres rangés donnent ${correct}.`,
          `Le plus ${chercheLePlusGrand ? "grand" : "petit"} nombre est ${correct}.`,
        ),
      };
    },
  },
];
