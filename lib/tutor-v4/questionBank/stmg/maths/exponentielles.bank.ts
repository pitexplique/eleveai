// lib/tutor-v4/questionBank/stmg/maths/exponentielles.bank.ts
//
// Notions : expo_definition, expo_variations, expo_proprietes,
//           expo_taux_moyen, expo_taux_equivalent
//           (domaine STMGEX — « Fonctions exponentielles », classe terminale)
//
// L'idée directrice du BO tient en une phrase : « le passage du discret au
// continu à partir des suites géométriques permet d'introduire les fonctions
// exponentielles de base a qui modélisent des phénomènes continus dont
// l'évolution relative instantanée est constante ».
//
// ⭐ D'où la figure qui revient dans tout ce fichier : le NUAGE de la suite
// géométrique et la COURBE continue qui le prolonge, tracés ensemble. Les
// points sont les mêmes ; la courbe remplit les trous. Un élève qui voit ça
// n'a plus besoin qu'on lui dise que $a^x$ « prolonge » $a^n$ — il le lit.
//
// ⛔ Suites géométriques et fonctions exponentielles à termes STRICTEMENT
// POSITIFS : toutes les bases tirées ici vérifient $a > 0$.
//
// ⚠️ Le taux d'évolution moyen est le point le plus glissant du domaine, et le
// programme le sait : il en fait une capacité à part entière. Le piège a donc
// sa micro — le taux moyen n'est PAS la moyenne des taux — parce qu'il ne se
// paramètre pas, il se raconte.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function fr(n: number): string {
  const arrondi = Math.round(n * 100000) / 100000;
  return String(arrondi).replace(".", ",");
}

function makeChoices(correct: string, wrongs: readonly string[]): string[] {
  const distracteurs = Array.from(new Set(wrongs)).filter((w) => w !== correct);
  return shuffle([correct, ...distracteurs.slice(0, 3)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/**
 * La courbe de $x \mapsto k\,a^x$ ET le nuage des termes entiers.
 *
 * C'est la figure centrale du domaine : les points sont la suite géométrique,
 * la courbe est son prolongement continu. On les trace ensemble pour que le
 * lien se voie au lieu de s'énoncer.
 */
function canvasExponentielle(
  k: number,
  a: number,
  xmax: number,
  titre: string,
  options?: { avecNuage?: boolean; xmin?: number }
): CanvasFigure {
  const xmin = options?.xmin ?? 0;
  const f = (x: number) => k * Math.pow(a, x);
  const points: { x: number; y: number }[] = [];
  const pas = (xmax - xmin) / 60;
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(f(x) * 1000) / 1000 });
  }
  const ys = points.map((p) => p.y);
  const nuage: { x: number; y: number }[] = [];
  if (options?.avecNuage !== false) {
    for (let n = Math.ceil(xmin); n <= xmax; n++) nuage.push({ x: n, y: Math.round(f(n) * 100) / 100 });
  }
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: xmin - 0.3,
    xmax: xmax + 0.3,
    ymin: Math.floor(Math.min(...ys, 0)),
    ymax: Math.ceil(Math.max(...ys) * 1.1),
    grille: true,
    courbes: [{ id: "f", type: "points", points }],
    points: nuage,
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const EVOLUTIONS = [
  { sujet: "un capital placé", unite: "€" },
  { sujet: "le chiffre d'affaires d'une enseigne", unite: "k€" },
  { sujet: "le nombre d'abonnés d'un service", unite: "abonnés" },
  { sujet: "la valeur d'un parc de machines", unite: "€" },
  { sujet: "la population d'une commune", unite: "habitants" },
  { sujet: "le stock d'invendus", unite: "articles" },
] as const;

export const exponentiellesBank: TutorBankItemV4[] = [
  /* ═══════════════════ expoT_reconnaitre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans une fonction exponentielle, c'est l'EXPOSANT qui varie, pas la base.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      // L'énoncé est constant : toute la variété vit dans les propositions.
      // Le réservoir de bases doit donc être large, sinon la micro ne produit
      // que huit questions réellement distinctes.
      const a = pick([1.05, 1.1, 1.2, 1.25, 1.4, 1.5, 2, 2.5, 3, 4, 0.5, 0.6, 0.75, 0.8, 0.9, 0.95] as const);
      const n = pick([2, 3, 4] as const);
      const k = pick([2, 3, 5, 10] as const);
      const bonne = `$f(x) = ${fr(a)}^x$`;
      return {
        text: "Parmi ces expressions, laquelle définit une fonction exponentielle ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          `$f(x) = x^{${n}}$`,
          `$f(x) = ${k}x$`,
          `$f(x) = ${k}x^2$`,
          `$f(x) = \\dfrac{${k}}{x}$`,
          `$f(x) = ${fr(a)}x$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction exponentielle de base $a$ (avec $a > 0$) s'écrit $x \\mapsto a^x$ : la variable est à l'EXPOSANT et la base est un nombre fixe.",
          "On regarde où se trouve $x$ : à l'exposant, c'est une exponentielle ; à la base, c'est une fonction puissance.",
          `$${fr(a)}^x$ a bien sa variable en exposant, tandis que $x^{${n}}$ a sa variable en base : ce n'est pas la même chose.`,
          `La fonction exponentielle est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = x^{${n}}$`,
            cause: "a confondu fonction puissance (variable en base) et fonction exponentielle (variable en exposant)",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_prolongement ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_prolongement_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_prolongement",
    difficulty: 3,
    theme: "neutral",
    hint: "Les points marqués sont les termes de la suite ; la courbe passe exactement par eux.",
    tags: ["stmg", "maths", "exponentielle", "suites", "canvas", "template", "short"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const u0 = pick([100, 200, 400, 500, 800, 1000] as const);
      const t = pick([10, 20, 25, 50] as const);
      const a = 1 + t / 100;
      const x = pick([1.5, 2.5, 3.5, 4.5] as const);
      const valeur = u0 * Math.pow(a, x);
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} vaut $${u0}$ ${evo.unite} et augmente de $${t}\\,\\%$ par an. ` +
          `Les points marqués donnent la valeur en fin d'année ; la courbe prolonge la suite entre ces points. ` +
          `Quelle est la valeur au bout de $${fr(x)}$ années, à l'unité près ?`,
        format: "short",
        expected: [fr(Math.round(valeur))],
        comparator: "number_equal",
        canvas: canvasExponentielle(u0, a, 6, `${evo.sujet} : la suite et son prolongement`),
        explanation: exp(
          "La fonction $x \\mapsto u_0 \\times a^x$ prolonge la suite géométrique $(u_0 a^n)$ : elle passe par tous ses points et permet de lire des durées NON entières.",
          "On garde la même base — le coefficient multiplicateur — et on remplace le rang entier par une durée réelle.",
          `$a = ${fr(a)}$, donc la valeur au bout de $${fr(x)}$ ans vaut ` +
            `$${u0} \\times ${fr(a)}^{${fr(x)}} \\approx ${fr(Math.round(valeur))}$ ${evo.unite}.`,
          `Au bout de $${fr(x)}$ années, on obtient environ $${fr(Math.round(valeur))}$ ${evo.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ expoT_calculer_image ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_image_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_calculer_image",
    difficulty: 2,
    theme: "neutral",
    hint: "$a^x$ : on multiplie $a$ par lui-même $x$ fois quand $x$ est entier.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 4, 5, 10, 1.5, 0.5] as const);
      const x = randomInt(2, 6);
      return {
        text: `Soit $f(x) = ${fr(a)}^x$. Calcule $f(${x})$.`,
        format: "short",
        expected: [fr(Math.pow(a, x))],
        comparator: "number_equal",
        explanation: exp(
          "Pour un exposant entier, $a^x$ est le produit de $x$ facteurs égaux à $a$.",
          "On multiplie la base par elle-même autant de fois que l'indique l'exposant.",
          `$${fr(a)}^{${x}} = ${Array.from({ length: x }, () => fr(a)).join(" \\times ")} = ${fr(Math.pow(a, x))}$.`,
          `$f(${x}) = ${fr(Math.pow(a, x))}$.`
        ),
      };
    },
  },

  /* ═══════════════════ expoT_exposant_negatif ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_negatif_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_definition",
    microId: "expoT_exposant_negatif",
    difficulty: 2,
    theme: "neutral",
    hint: "$a^{-x} = \\dfrac{1}{a^x}$ — un exposant négatif donne l'inverse, jamais un nombre négatif.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([2, 3, 4, 5, 10] as const);
      const x = randomInt(1, 4);
      const valeur = 1 / Math.pow(a, x);
      return {
        text: `Que vaut $${a}^{-${x}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(valeur)}$`, [
          `$-${fr(Math.pow(a, x))}$`,
          `$${fr(Math.pow(a, x))}$`,
          `$-${fr(valeur)}$`,
          `$${fr(-a * x)}$`,
          `$${fr(1 / (a * x))}$`,
        ]),
        expected: [`$${fr(valeur)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un exposant négatif désigne l'INVERSE : $a^{-x} = \\dfrac{1}{a^{x}}$.",
          "On calcule la puissance positive, puis on prend son inverse — le résultat reste strictement positif.",
          `$${a}^{${x}} = ${fr(Math.pow(a, x))}$, donc $${a}^{-${x}} = \\dfrac{1}{${fr(Math.pow(a, x))}} = ${fr(valeur)}$.`,
          `$${a}^{-${x}} = ${fr(valeur)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$-${fr(Math.pow(a, x))}$`,
            cause: "a transformé l'exposant négatif en résultat négatif : une exponentielle est toujours strictement positive",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_sens_selon_a ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_sens_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_sens_selon_a",
    difficulty: 2,
    theme: "neutral",
    hint: "On compare la base à $1$, pas à $0$.",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.25, 1.5, 2, 3, 0.4, 0.5, 0.7, 0.8, 0.9, 0.95] as const);
      const croissante = a > 1;
      return {
        text: `Soit $f(x) = ${fr(a)}^x$. Quel est le sens de variation de $f$ ?`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "croissante puis décroissante"]),
        expected: [croissante ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(1, a, 8, `Courbe de f(x) = ${fr(a)}^x`, { avecNuage: false }),
        explanation: exp(
          "Une fonction exponentielle $x \\mapsto a^x$ est croissante si $a > 1$, décroissante si $0 < a < 1$, constante si $a = 1$.",
          "On compare la base à $1$ — c'est le même critère que pour la raison d'une suite géométrique.",
          `Ici $a = ${fr(a)}$, ${croissante ? "supérieur" : "inférieur"} à $1$ : la courbe ${croissante ? "monte" : "descend"}.`,
          `$f$ est ${croissante ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: croissante ? "décroissante" : "croissante",
            cause: "a comparé la base à 0 au lieu de la comparer à 1",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_allure ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_allure_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_allure",
    difficulty: 2,
    theme: "neutral",
    hint: "Toutes les courbes exponentielles passent par le point $(0\\,;\\,1)$ quand le coefficient vaut $1$.",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.2, 1.4, 1.6, 2, 2.5, 3, 0.4, 0.5, 0.6, 0.75, 0.85] as const);
      const croissante = a > 1;
      const bonne = croissante
        ? "une base strictement supérieure à $1$ : la courbe monte de plus en plus vite"
        : "une base comprise entre $0$ et $1$ : la courbe descend en s'aplatissant";
      return {
        text: "D'après la courbe tracée, que peut-on dire de la base $a$ de cette fonction exponentielle ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          croissante
            ? "une base comprise entre $0$ et $1$ : la courbe descend en s'aplatissant"
            : "une base strictement supérieure à $1$ : la courbe monte de plus en plus vite",
          "une base négative",
          "une base égale à $1$",
          "une base égale à $0$",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(1, a, 8, "Courbe d'une fonction exponentielle", { avecNuage: false }),
        explanation: exp(
          "L'allure de la courbe de $x \\mapsto a^x$ dépend de la position de $a$ par rapport à $1$ : elle croît si $a > 1$, décroît si $0 < a < 1$. Elle reste toujours au-dessus de l'axe des abscisses.",
          "On regarde le sens de la courbe et l'on en déduit un encadrement de la base.",
          `Ici la courbe ${croissante ? "monte" : "descend"}, et elle reste strictement positive : la base vaut $${fr(a)}$.`,
          `Il s'agit ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "une base négative",
            cause: "une fonction exponentielle n'est définie que pour une base strictement positive",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_role_k ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_role_k_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_role_k",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplier par un $k$ NÉGATIF retourne la courbe, et inverse donc le sens de variation.",
    tags: ["stmg", "maths", "exponentielle", "canvas", "template"],
    generate: () => {
      const a = pick([1.2, 1.5, 2, 3, 0.5, 0.7, 0.8] as const);
      const k = pick([2, 3, 5, 10, -2, -3, -5] as const);
      // Croissante si (k > 0 et a > 1) ou (k < 0 et a < 1).
      const croissante = k > 0 === a > 1;
      return {
        text: `Soit $f(x) = ${k}\\times ${fr(a)}^x$. Quel est le sens de variation de $f$ ?`,
        format: "qcm",
        choices: shuffle(["croissante", "décroissante", "constante", "cela dépend de $x$"]),
        expected: [croissante ? "croissante" : "décroissante"],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(k, a, 6, `Courbe de f(x) = ${k} × ${fr(a)}^x`, { avecNuage: false }),
        explanation: exp(
          "Pour $x \\mapsto k\\,a^x$, deux éléments décident : la position de $a$ par rapport à $1$, et le SIGNE de $k$. Un $k$ négatif retourne la courbe et inverse le sens de variation.",
          "On détermine d'abord le sens de $a^x$, puis on regarde si $k$ le conserve ou l'inverse.",
          `Ici $a = ${fr(a)}$ donne une exponentielle ${a > 1 ? "croissante" : "décroissante"}, et $k = ${k}$ est ${k > 0 ? "positif : le sens est conservé" : "négatif : le sens est inversé"}.`,
          `$f$ est ${croissante ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: croissante ? "décroissante" : "croissante",
            cause: "n'a pas tenu compte du signe de k, qui retourne la courbe",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_lien_suite ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_lien_suite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_variations",
    microId: "expoT_lien_suite",
    difficulty: 2,
    theme: "neutral",
    hint: "La base de l'exponentielle joue exactement le rôle de la raison de la suite.",
    tags: ["stmg", "maths", "exponentielle", "suites", "canvas", "template"],
    generate: () => {
      const u0 = pick([50, 100, 200, 400, 800] as const);
      const t = pick([10, 20, 25, 50] as const);
      const baisse = Math.random() < 0.5;
      const q = 1 + (baisse ? -t : t) / 100;
      return {
        text:
          `Une suite géométrique de premier terme $u(0) = ${u0}$ et de raison $q = ${fr(q)}$ est prolongée ` +
          `par la fonction $f(x) = ${u0} \\times ${fr(q)}^x$. Que peut-on dire des deux ?`,
        format: "qcm",
        choices: makeChoices(
          `elles ont le même sens de variation : ${baisse ? "décroissantes" : "croissantes"}`,
          [
            `elles ont le même sens de variation : ${baisse ? "croissantes" : "décroissantes"}`,
            "elles ont des sens de variation contraires",
            "la suite croît et la fonction est constante",
            "on ne peut pas comparer une suite et une fonction",
          ]
        ),
        expected: [`elles ont le même sens de variation : ${baisse ? "décroissantes" : "croissantes"}`],
        comparator: "mcq_exact",
        canvas: canvasExponentielle(u0, q, 7, "La suite (points) et la fonction qui la prolonge (courbe)"),
        explanation: exp(
          "La base de la fonction exponentielle est exactement la raison de la suite géométrique qu'elle prolonge : le critère de variation est donc le même — comparer à $1$.",
          "On compare $q$ à $1$ une seule fois : la conclusion vaut pour les deux objets.",
          `$q = ${fr(q)}$, ${q > 1 ? "supérieur" : "inférieur"} à $1$ : la suite et la fonction sont toutes deux ${baisse ? "décroissantes" : "croissantes"}. ` +
            `Sur la figure, la courbe passe exactement par les points de la suite.`,
          `Elles ont le même sens de variation : ${baisse ? "décroissantes" : "croissantes"}.`
        ),
      };
    },
  },

  /* ═══════════════════ expoT_somme_exposants ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_somme_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_somme_exposants",
    difficulty: 2,
    theme: "neutral",
    hint: "Un PRODUIT de deux puissances de même base : les exposants s'ADDITIONNENT.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 5, 0.8, 0.5] as const);
      const m = randomInt(2, 7);
      const n = randomInt(2, 7);
      return {
        text: `Écris $${fr(a)}^{${m}} \\times ${fr(a)}^{${n}}$ sous la forme d'une seule puissance de $${fr(a)}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${m + n}}$`, [
          `$${fr(a)}^{${m * n}}$`,
          `$${fr(a)}^{${Math.abs(m - n)}}$`,
          `$${fr(a * a)}^{${m + n}}$`,
          `$${fr(a)}^{${m + n + 1}}$`,
          `$${fr(a * a)}^{${m * n}}$`,
        ]),
        expected: [`$${fr(a)}^{${m + n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour tous réels $x$ et $y$ : $a^{x+y} = a^x \\times a^y$.",
          "On garde la base et on additionne les exposants.",
          `$${fr(a)}^{${m}} \\times ${fr(a)}^{${n}} = ${fr(a)}^{${m}+${n}} = ${fr(a)}^{${m + n}}$.`,
          `Le résultat est $${fr(a)}^{${m + n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{${m * n}}$`,
            cause: "a multiplié les exposants au lieu de les additionner",
          },
        ],
      };
    },
  },

  /* ═══════════════ expoT_difference_exposants ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_difference_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_difference_exposants",
    difficulty: 2,
    theme: "neutral",
    hint: "Un QUOTIENT de deux puissances de même base : les exposants se SOUSTRAIENT.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.1, 1.25, 1.5, 2, 3, 4, 0.9, 0.6] as const);
      const m = randomInt(5, 12);
      const n = randomInt(1, 4);
      return {
        text: `Écris $\\dfrac{${fr(a)}^{${m}}}{${fr(a)}^{${n}}}$ sous la forme d'une seule puissance de $${fr(a)}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${m - n}}$`, [
          `$${fr(a)}^{${m + n}}$`,
          `$${fr(a)}^{${Math.round((m / n) * 100) / 100}}$`,
          `$${fr(a)}^{${n - m}}$`,
          `$${fr(a)}^{${m}}$`,
          `$${fr(a)}^{${m - n - 1}}$`,
        ]),
        expected: [`$${fr(a)}^{${m - n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour tous réels $x$ et $y$ : $a^{x-y} = \\dfrac{a^x}{a^y}$.",
          "On garde la base et on soustrait l'exposant du dénominateur à celui du numérateur.",
          `$\\dfrac{${fr(a)}^{${m}}}{${fr(a)}^{${n}}} = ${fr(a)}^{${m}-${n}} = ${fr(a)}^{${m - n}}$.`,
          `Le résultat est $${fr(a)}^{${m - n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{${Math.round((m / n) * 100) / 100}}$`,
            cause: "a divisé les exposants au lieu de les soustraire",
          },
        ],
      };
    },
  },

  /* ═══════════════ expoT_puissance_exposant ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_puissance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_puissance_exposant",
    difficulty: 3,
    theme: "neutral",
    hint: "Une puissance de puissance : les exposants se MULTIPLIENT.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.05, 1.2, 1.5, 2, 3, 0.8, 0.75] as const);
      const x = randomInt(2, 6);
      const n = randomInt(2, 5);
      return {
        text: `Écris $\\left(${fr(a)}^{${x}}\\right)^{${n}}$ sous la forme d'une seule puissance de $${fr(a)}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${x * n}}$`, [
          `$${fr(a)}^{${x + n}}$`,
          `$${fr(a)}^{${x}}$`,
          `$${fr(a)}^{${n}}$`,
          `$${fr(a)}^{${x * n + 1}}$`,
          `$${fr(a * n)}^{${x}}$`,
        ]),
        expected: [`$${fr(a)}^{${x * n}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $n$ entier relatif : $a^{nx} = \\left(a^{x}\\right)^{n}$.",
          "Élever une puissance à une puissance revient à multiplier les exposants.",
          `$\\left(${fr(a)}^{${x}}\\right)^{${n}} = ${fr(a)}^{${x} \\times ${n}} = ${fr(a)}^{${x * n}}$.`,
          `Le résultat est $${fr(a)}^{${x * n}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(a)}^{${x + n}}$`,
            cause: "a additionné les exposants : c'est la règle du PRODUIT, pas celle de la puissance de puissance",
          },
        ],
      };
    },
  },

  /* ═══════════════════ expoT_transformer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_expo_transformer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_proprietes",
    microId: "expoT_transformer",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique les trois règles dans l'ordre : produit, quotient, puissance de puissance.",
    tags: ["stmg", "maths", "exponentielle", "template"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.2, 1.5, 2, 3, 0.9] as const);
      const m = randomInt(3, 9);
      const n = randomInt(2, 5);
      const p = randomInt(1, 4);
      const resultat = m + n - p;
      return {
        text: `Simplifie $\\dfrac{${fr(a)}^{${m}} \\times ${fr(a)}^{${n}}}{${fr(a)}^{${p}}}$.`,
        format: "qcm",
        choices: makeChoices(`$${fr(a)}^{${resultat}}$`, [
          `$${fr(a)}^{${m + n + p}}$`,
          `$${fr(a)}^{${m * n - p}}$`,
          `$${fr(a)}^{${m - n - p}}$`,
          `$${fr(a)}^{${resultat + 1}}$`,
          `$${fr(a)}^{${m + n}}$`,
        ]),
        expected: [`$${fr(a)}^{${resultat}}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les propriétés algébriques des exponentielles s'enchaînent : $a^x \\times a^y = a^{x+y}$ puis $\\dfrac{a^x}{a^y} = a^{x-y}$.",
          "On simplifie le numérateur d'abord, puis on applique la règle du quotient.",
          `$${fr(a)}^{${m}} \\times ${fr(a)}^{${n}} = ${fr(a)}^{${m + n}}$, puis ` +
            `$\\dfrac{${fr(a)}^{${m + n}}}{${fr(a)}^{${p}}} = ${fr(a)}^{${m + n} - ${p}} = ${fr(a)}^{${resultat}}$.`,
          `L'expression simplifiée est $${fr(a)}^{${resultat}}$.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_exposant_un_sur_n ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_un_sur_n_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_exposant_un_sur_n",
    difficulty: 2,
    theme: "neutral",
    hint: "L'exposant $\\frac{1}{n}$ désigne la racine $n$-ième : le nombre qui, élevé à la puissance $n$, redonne le départ.",
    tags: ["stmg", "maths", "exponentielle", "template", "short"],
    generate: () => {
      const base = pick([2, 3, 4, 5, 6, 10] as const);
      const n = pick([2, 3, 4] as const);
      const c = Math.pow(base, n);
      return {
        text: `Que vaut $${c}^{\\frac{1}{${n}}}$ ?`,
        format: "short",
        expected: [String(base)],
        comparator: "number_equal",
        explanation: exp(
          "L'exposant $\\dfrac{1}{n}$ désigne la racine $n$-ième d'un réel positif : $c^{\\frac{1}{n}}$ est l'unique nombre positif dont la puissance $n$-ième vaut $c$.",
          "On cherche le nombre qui, multiplié $n$ fois par lui-même, redonne $c$ — élever à la puissance $\\dfrac{1}{n}$ n'est pas diviser par $n$.",
          `$${base}^{${n}} = ${c}$, donc $${c}^{\\frac{1}{${n}}} = ${base}$.`,
          `$${c}^{\\frac{1}{${n}}} = ${base}$.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_calculer ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_taux_moyen_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient moyen est $k^{\\frac{1}{n}}$ où $k$ est le coefficient global et $n$ le nombre de périodes.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      // On choisit le taux moyen d'abord : le coefficient global tombe juste.
      const tMoyen = pick([2, 4, 5, 8, 10, 12, 15, 20, 25] as const);
      const n = pick([2, 3, 4, 5, 6, 8, 10] as const);
      const qMoyen = 1 + tMoyen / 100;
      const global = Math.pow(qMoyen, n);
      const evo = pick(EVOLUTIONS);
      return {
        text:
          `${evo.sujet.charAt(0).toUpperCase()}${evo.sujet.slice(1)} a été multiplié par $${fr(Math.round(global * 10000) / 10000)}$ en $${n}$ ans. ` +
          `Quel est le taux d'évolution annuel MOYEN, en pourcentage arrondi au dixième ?`,
        format: "short",
        expected: [fr(Math.round(tMoyen * 10) / 10)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux moyen est celui qui, appliqué à chaque période, produirait la même évolution globale. Son coefficient vaut $k^{\\frac{1}{n}}$.",
          "On prend la racine $n$-ième du coefficient global, puis on retire $1$.",
          `$q_{\\text{moyen}} = ${fr(Math.round(global * 10000) / 10000)}^{\\frac{1}{${n}}} \\approx ${fr(qMoyen)}$, ` +
            `donc $t = ${fr(qMoyen)} - 1 = ${fr(tMoyen / 100)}$, soit $${fr(tMoyen)}\\,\\%$.`,
          `Le taux annuel moyen est d'environ $${fr(tMoyen)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_piege ═══════════════ */

  {
    kind: "fixed",
    id: "stmg_expo_taux_piege_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_piege",
    difficulty: 3,
    theme: "neutral",
    hint: "Essaie sur $100$ € : que donne réellement $+50\\,\\%$ puis $-50\\,\\%$ ?",
    tags: ["stmg", "maths", "exponentielle", "piege", "fixed"],
    text:
      "Un capital augmente de $50\\,\\%$ la première année, puis diminue de $50\\,\\%$ la seconde. " +
      "Un élève conclut que le taux moyen annuel est de $0\\,\\%$, « puisque la moyenne de $+50$ et $-50$ vaut $0$ ». " +
      "Que faut-il en penser ?",
    format: "qcm",
    choices: [
      "c'est faux : le capital a perdu $25\\,\\%$ en deux ans, le taux moyen est donc négatif",
      "c'est juste : les deux taux se compensent exactement",
      "c'est faux : le capital a gagné $25\\,\\%$, le taux moyen est positif",
      "on ne peut pas conclure sans connaître le capital de départ",
    ],
    expected: ["c'est faux : le capital a perdu $25\\,\\%$ en deux ans, le taux moyen est donc négatif"],
    comparator: "mcq_exact",
    explanation: exp(
      "Le taux d'évolution moyen n'est PAS la moyenne arithmétique des taux : ce sont les coefficients qui se composent, par multiplication.",
      "On calcule le coefficient global, puis on en prend la racine $n$-ième.",
      "$1{,}5 \\times 0{,}5 = 0{,}75$ : sur $100$ €, le capital passe à $150$ € puis à $75$ €. " +
        "Le coefficient global vaut $0{,}75$, donc le coefficient moyen vaut $0{,}75^{\\frac{1}{2}} \\approx 0{,}866$, " +
        "soit un taux moyen d'environ $-13{,}4\\,\\%$ par an.",
      "Le taux moyen est négatif : le capital a perdu $25\\,\\%$ en deux ans, et non rien du tout."
    ),
    choiceDiagnostics: [
      {
        choice: "c'est juste : les deux taux se compensent exactement",
        cause: "a fait la moyenne des taux au lieu de composer les coefficients",
        prereqMicroId: "auto_evo_piege_compensation",
      },
      {
        choice: "on ne peut pas conclure sans connaître le capital de départ",
        cause: "le coefficient global ne dépend pas du capital de départ",
      },
    ],
  },

  {
    kind: "template",
    id: "stmg_expo_taux_piege_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_moyen",
    microId: "expoT_taux_moyen_piege",
    difficulty: 3,
    theme: "neutral",
    hint: "Compose les coefficients, puis prends la racine — la moyenne des taux donne autre chose.",
    tags: ["stmg", "maths", "exponentielle", "piege", "template"],
    generate: () => {
      const t1 = pick([10, 20, 25, 30, 40, 50, 60] as const);
      const t2 = pick([10, 20, 25, 30, 40, 50] as const);
      const global = (1 + t1 / 100) * (1 - t2 / 100);
      const moyen = (Math.pow(global, 1 / 2) - 1) * 100;
      const moyenneNaive = (t1 - t2) / 2;
      return {
        text:
          `Une grandeur augmente de $${t1}\\,\\%$ une année, puis diminue de $${t2}\\,\\%$ l'année suivante. ` +
          `Le taux d'évolution annuel moyen est-il égal à la moyenne des deux taux, soit $${fr(moyenneNaive)}\\,\\%$ ?`,
        format: "qcm",
        choices: shuffle([
          "non : il faut composer les coefficients, puis prendre la racine carrée",
          "oui : le taux moyen est la moyenne des taux",
          "oui, mais seulement si les deux taux sont de même signe",
          "on ne peut pas le savoir",
        ]),
        expected: ["non : il faut composer les coefficients, puis prendre la racine carrée"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le taux moyen se calcule sur les COEFFICIENTS, jamais sur les taux : $q_{\\text{moyen}} = \\left(q_1 q_2\\right)^{\\frac{1}{2}}$.",
          "On multiplie les coefficients, on prend la racine, puis on retire $1$.",
          `$${fr(1 + t1 / 100)} \\times ${fr(1 - t2 / 100)} = ${fr(Math.round(global * 10000) / 10000)}$, ` +
            `donc le taux moyen vaut environ $${fr(Math.round(moyen * 100) / 100)}\\,\\%$ — et non $${fr(moyenneNaive)}\\,\\%$.`,
          "Le taux moyen n'est pas la moyenne des taux."
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_global ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_taux_global_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_moyen_global",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coefficient global est le coefficient moyen élevé à la puissance $n$.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      const tMoyen = pick([2, 3, 4, 5, 8, 10, 12, 15, 20] as const);
      const n = pick([2, 3, 4, 5, 6, 8, 10, 12] as const);
      const global = (Math.pow(1 + tMoyen / 100, n) - 1) * 100;
      return {
        text:
          `Une grandeur évolue au taux annuel moyen de $${tMoyen}\\,\\%$ pendant $${n}$ ans. ` +
          `Quel est le taux d'évolution GLOBAL sur la période, en pourcentage arrondi au dixième ?`,
        format: "short",
        expected: [fr(Math.round(global * 10) / 10)],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient global est le produit des coefficients de chaque période : si le taux moyen est constant, il vaut $q^n$.",
          "On élève le coefficient moyen à la puissance $n$, puis on retire $1$.",
          `$${fr(1 + tMoyen / 100)}^{${n}} \\approx ${fr(Math.round(Math.pow(1 + tMoyen / 100, n) * 10000) / 10000)}$, ` +
            `donc le taux global vaut environ $${fr(Math.round(global * 10) / 10)}\\,\\%$.`,
          `Le taux d'évolution global est d'environ $${fr(Math.round(global * 10) / 10)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_mensuel_annuel ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_mensuel_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_mensuel_annuel",
    difficulty: 3,
    theme: "neutral",
    hint: "Douze mois font une année : le coefficient mensuel élevé à la puissance $12$ doit redonner le coefficient annuel.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "template", "short"],
    generate: () => {
      const annuel = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 24] as const);
      const periodes = pick([12, 4, 2] as const);
      const equivalent = (Math.pow(1 + annuel / 100, 1 / periodes) - 1) * 100;
      const nom = periodes === 12 ? "mensuel" : periodes === 4 ? "trimestriel" : "semestriel";
      return {
        text:
          `Un placement rapporte $${annuel}\\,\\%$ par an. ` +
          `Quel est le taux ${nom} ÉQUIVALENT, en pourcentage arrondi au centième ?`,
        format: "short",
        expected: [fr(Math.round(equivalent * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux équivalent est celui qui, appliqué à chaque sous-période, redonne exactement le taux annuel : son coefficient est $\\left(1 + \\dfrac{t}{100}\\right)^{\\frac{1}{n}}$.",
          "On prend la racine $n$-ième du coefficient annuel, puis on retire $1$. Diviser le taux par $n$ donnerait le taux PROPORTIONNEL, qui est légèrement plus grand.",
          `$${fr(1 + annuel / 100)}^{\\frac{1}{${periodes}}} \\approx ${fr(Math.round((1 + equivalent / 100) * 100000) / 100000)}$, ` +
            `soit un taux de $${fr(Math.round(equivalent * 100) / 100)}\\,\\%$ — à comparer au taux proportionnel $\\dfrac{${annuel}}{${periodes}} = ${fr(Math.round((annuel / periodes) * 100) / 100)}\\,\\%$.`,
          `Le taux ${nom} équivalent est d'environ $${fr(Math.round(equivalent * 100) / 100)}\\,\\%$.`
        ),
      };
    },
  },

  /* ═══════════════ expoT_taux_moyen_interpreter ═══════════════ */

  {
    kind: "template",
    id: "stmg_expo_taux_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "expo_taux_equivalent",
    microId: "expoT_taux_moyen_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Un taux moyen décrit une évolution FICTIVE, régulière, qui aurait le même effet total.",
    tags: ["stmg", "maths", "exponentielle", "gestion", "open", "template"],
    generate: () => {
      const evo = pick(EVOLUTIONS);
      const t = pick([2.5, 3.4, 4.8, 6.2, 7.5, 11.3, -2.8, -5.1] as const);
      const n = pick([4, 5, 6, 8, 10] as const);
      return {
        text:
          `Sur $${n}$ ans, ${evo.sujet} a évolué au taux annuel moyen de $${fr(t)}\\,\\%$. ` +
          `Explique ce que signifie ce nombre — et ce qu'il ne signifie pas.`,
        format: "open",
        expected: ["moyen", "chaque annee", "chaque année", "meme evolution", "même évolution", "regulier", "régulier", "fictif"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le taux moyen est le taux CONSTANT qui, appliqué à chaque période, aurait produit la même évolution globale.",
          "On distingue ce qu'il décrit — un scénario régulier équivalent — de ce qu'il ne décrit pas : l'évolution réelle année par année.",
          `Ici, ${evo.sujet} n'a probablement pas ${t > 0 ? "augmenté" : "diminué"} de $${fr(Math.abs(t))}\\,\\%$ chaque année : ` +
            `certaines années ont pu être bien meilleures, d'autres mauvaises. Le taux moyen résume seulement le résultat final.`,
          `Par exemple : « Tout se passe comme si ${evo.sujet} avait ${t > 0 ? "augmenté" : "diminué"} de ${fr(Math.abs(t))} % chaque année pendant ${n} ans — mais ce n'est pas l'évolution réelle année par année. »`
        ),
      };
    },
  },
];
