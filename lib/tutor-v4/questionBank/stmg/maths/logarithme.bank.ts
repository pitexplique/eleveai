// lib/tutor-v4/questionBank/stmg/maths/logarithme.bank.ts
//
// Notions : log_definition, log_proprietes, log_equations, log_applications
//           (domaine STMGEX — « Fonction logarithme décimal », terminale)
//
// Le BO introduit le logarithme par un BESOIN, pas par une définition : « la
// résolution d'équations du type $10^x = b$ permet de déterminer des durées
// d'évolution non entières et d'introduire la fonction logarithme décimal ».
// Autrement dit : on sait calculer une valeur au bout de $n$ années ; on ne
// sait pas encore répondre à « au bout de combien de temps ? ». Le logarithme
// est l'outil qui retourne la question.
//
// Les items suivent cet ordre : d'abord ce que log RÉSOUT, ensuite ses
// propriétés, enfin ses usages — nombre d'annuités, temps de doublement,
// nombre de chiffres d'un entier.
//
// ⚠️ Les réponses ne tombent presque jamais juste. Chaque énoncé précise donc
// l'arrondi attendu, et les valeurs sont choisies pour que l'arrondi soit
// stable — un résultat à 4,4999 rendrait la question injuste.
//
// Le BO donne lui-même les deux situations : « la recherche d'un nombre
// d'annuités comme celle d'un taux moyen fournissent des exemples de
// résolution d'équations de la forme $a^x = b$ ou $x^a = b$ », et « la valeur
// du logarithme décimal permet d'obtenir l'ordre de grandeur d'un nombre et,
// pour un entier, le nombre de chiffres de son écriture décimale ».

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

/** Courbe échantillonnée, avec repères facultatifs. */
function canvasCourbe(
  f: (x: number) => number,
  xmin: number,
  xmax: number,
  titre: string,
  options?: { pas?: number; marques?: number[]; seuil?: number }
): CanvasFigure {
  const pas = options?.pas ?? (xmax - xmin) / 70;
  const points: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    const y = f(x);
    if (Number.isFinite(y) && Math.abs(y) < 1e5) {
      points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
    }
  }
  const ys = points.map((p) => p.y);
  const marge = Math.max(0.5, (Math.max(...ys) - Math.min(...ys)) * 0.1);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin,
    xmax,
    ymin: Math.floor(Math.min(...ys, 0) - marge),
    ymax: Math.ceil(Math.max(...ys, 0) + marge),
    grille: true,
    courbes: [{ id: "f", type: "points", points }],
    points: options?.marques?.map((x) => ({ x, y: Math.round(f(x) * 100) / 100 })),
    misesEnEvidence: options?.seuil !== undefined ? [{ horizontale: { y: options.seuil } }] : undefined,
  };
}

/**
 * Un TABLEAU DE VALEURS du logarithme, fourni avec l'énoncé.
 *
 * Idée de Frédéric (15/08/2026) : « pour log() tu peux faire un tableau de
 * valeurs pour qu'il n'y ait pas de souci ». Elle règle deux problèmes à la
 * fois. L'élève n'a plus besoin de la calculatrice pour obtenir $\log(2)$ ou
 * $\log(1{,}05)$ — il lit. Et l'arrondi devient EXPLICITE : c'est celui du
 * tableau, le même pour tout le monde, au lieu d'un arrondi subi qui pouvait
 * faire basculer un résultat d'un côté ou de l'autre d'un entier.
 *
 * On donne toujours quelques valeurs en plus de celles strictement utiles :
 * choisir la bonne ligne fait partie du travail.
 */
function canvasTableLog(valeurs: readonly number[], titre: string): CanvasFigure {
  const triees = Array.from(new Set(valeurs)).sort((a, b) => a - b);
  return {
    kind: "tableau_donnees",
    title: titre,
    caption: "Valeurs arrondies au dix-millième",
    headers: ["x", ...triees.map((v) => fr(v))],
    rows: [
      {
        label: "log(x)",
        values: triees.map((v) => fr(Math.round(Math.log10(v) * 10000) / 10000)),
      },
    ],
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const PLACEMENTS = [
  { sujet: "un capital placé", unite: "€" },
  { sujet: "le chiffre d'affaires d'une enseigne", unite: "k€" },
  { sujet: "le nombre d'abonnés", unite: "abonnés" },
  { sujet: "la valeur d'un portefeuille", unite: "€" },
  { sujet: "la population d'une commune", unite: "habitants" },
] as const;

export const logarithmeBank: TutorBankItemV4[] = [
  /* ═══════════════════ logT_definition ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_definition_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_definition",
    microId: "logT_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\log(b)$ est l'exposant qu'il faut donner à $10$ pour obtenir $b$.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const b = pick([
        1, 10, 100, 1000, 10000, 100000, 1000000, 10000000, 100000000,
        0.1, 0.01, 0.001, 0.0001, 0.00001,
      ] as const);
      const n = Math.round(Math.log10(b));
      return {
        text: `Par définition, $\\log(${fr(b)})$ est l'unique solution de quelle équation ?`,
        format: "qcm",
        choices: makeChoices(`$10^x = ${fr(b)}$`, [
          `$x^{10} = ${fr(b)}$`,
          `$10x = ${fr(b)}$`,
          `$x^{${Math.abs(n) + 2}} = 10$`,
          `$\\dfrac{10}{x} = ${fr(b)}$`,
          `$x = 10^{${fr(b)}}$`,
        ]),
        expected: [`$10^x = ${fr(b)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $b > 0$, le logarithme décimal de $b$ est l'unique nombre $x$ tel que $10^x = b$.",
          "On lit la définition à l'envers : $\\log$ répond à la question « quel exposant faut-il donner à $10$ ? ».",
          `Ici $10^{${n}} = ${fr(b)}$, donc $\\log(${fr(b)}) = ${n}$.`,
          `$\\log(${fr(b)})$ est la solution de $10^x = ${fr(b)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x^{10} = ${fr(b)}$`,
            cause: "a placé l'inconnue en base : dans 10^x, c'est l'EXPOSANT qui est cherché",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — ENCADRER sans calculer. Le premier item demande de quelle
    // équation $\log(b)$ est la solution ; celui-ci s'en sert : puisque
    // $10^2 = 100$ et $10^3 = 1000$, le logarithme d'un nombre à trois chiffres
    // est forcément entre $2$ et $3$. C'est la lecture qui rend le logarithme
    // utile avant même la calculatrice.
    kind: "template",
    id: "stmg_log_definition_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_definition",
    microId: "logT_definition",
    difficulty: 3,
    theme: "neutral",
    hint: "Entre quelles puissances de $10$ se trouve ce nombre ?",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      // ⛔ $n$ commence à $2$ : avec $n = 1$, la proposition « entre $0$ et $1$ »
      // serait identique à « entre $n-1$ et $n$ », et le QCM perdait une ligne.
      const n = pick([2, 3, 4, 5, 6] as const);
      // Un nombre strictement compris entre deux puissances de dix
      // consécutives : l'encadrement du logarithme est alors strict, donc sans
      // ambiguïté.
      const b = Math.round(Math.pow(10, n) * pick([1.4, 2, 3.5, 5, 7.2, 8.6] as const));
      const bonne = `entre $${n}$ et $${n + 1}$`;
      return {
        text: `Sans calculatrice, entre quels entiers consécutifs se situe $\\log(${fr(b)})$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `entre $${n - 1}$ et $${n}$`,
          `entre $${n + 1}$ et $${n + 2}$`,
          `entre $0$ et $1$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le logarithme décimal de $b$ est l'exposant à donner à $10$ pour obtenir $b$. Comme il est croissant, encadrer $b$ entre deux puissances de dix encadre $\\log(b)$ entre leurs exposants.",
          "On cherche les deux puissances de dix qui encadrent le nombre, puis on lit leurs exposants.",
          `$10^{${n}} = ${fr(Math.pow(10, n))}$ et $10^{${n + 1}} = ${fr(Math.pow(10, n + 1))}$. ` +
            `Comme $${fr(Math.pow(10, n))} < ${fr(b)} < ${fr(Math.pow(10, n + 1))}$, on a $${n} < \\log(${fr(b)}) < ${n + 1}$.`,
          `$\\log(${fr(b)})$ se situe ${bonne} — c'est d'ailleurs pourquoi $${fr(b)}$ s'écrit avec $${n + 1}$ chiffres.`
        ),
      };
    },
  },

  /* ═══════════════ logT_valeurs_remarquables ═══════════════ */

  {
    kind: "template",
    id: "stmg_log_valeurs_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_definition",
    microId: "logT_valeurs_remarquables",
    difficulty: 1,
    theme: "neutral",
    hint: "$\\log(10^n) = n$ : le logarithme d'une puissance de dix rend son exposant.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const n = pick([0, 1, 2, 3, 4, 5, 6, -1, -2, -3, 7, 8] as const);
      const b = Math.pow(10, n);
      return {
        text: `Que vaut $\\log(${fr(b)})$ ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Le logarithme décimal d'une puissance de dix est son exposant : $\\log(10^n) = n$.",
          "On écrit le nombre comme une puissance de $10$, puis on lit l'exposant.",
          `$${fr(b)} = 10^{${n}}$, donc $\\log(${fr(b)}) = ${n}$.`,
          `$\\log(${fr(b)}) = ${n}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le geste À L'ENVERS. Le premier item part du nombre et rend
    // l'exposant ; celui-ci part de l'exposant et rend le nombre. C'est
    // exactement l'équation $10^x = b$ de la définition, lue dans l'autre sens,
    // et c'est ce qu'on fait quand on « défait » un logarithme dans un calcul.
    kind: "template",
    id: "stmg_log_valeurs_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_definition",
    microId: "logT_valeurs_remarquables",
    difficulty: 2,
    theme: "neutral",
    hint: "Si $\\log(x) = n$, alors $x = 10^n$ : le logarithme et la puissance de dix se défont l'un l'autre.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const n = pick([1, 2, 3, 4, 5, 6, 0, -1, -2, -3] as const);
      const x = Math.pow(10, n);
      return {
        text: `On sait que $\\log(x) = ${n}$. Que vaut $x$ ?`,
        format: "short",
        expected: [fr(x)],
        comparator: "number_equal",
        explanation: exp(
          "Par définition, $\\log(x) = n$ signifie exactement $10^n = x$ : le logarithme décimal rend l'exposant, et la puissance de dix rend le nombre.",
          "On écrit $10$ à la puissance de la valeur donnée.",
          `$\\log(x) = ${n}$ donne $x = 10^{${n}} = ${fr(x)}$.`,
          `$x = ${fr(x)}$.`
        ),
      };
    },
  },

  /* ═══════════════ logT_sens_variation ═══════════════ */

  {
    kind: "template",
    id: "stmg_log_sens_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_definition",
    microId: "logT_sens_variation",
    difficulty: 2,
    theme: "neutral",
    hint: "La courbe monte, mais de moins en moins vite : elle est croissante.",
    tags: ["stmg", "maths", "logarithme", "canvas", "template"],
    generate: () => {
      const a = pick([2, 5, 8, 12, 20, 35, 60, 90, 150, 400] as const);
      const b = a * pick([2, 3, 5, 10] as const);
      const question = pick(["variation", "comparer"] as const);
      return {
        text:
          question === "variation"
            ? "D'après la courbe de la fonction logarithme décimal, quel est son sens de variation sur $]0\\,;\\,+\\infty[$ ?"
            : `Sans calculatrice, compare $\\log(${a})$ et $\\log(${b})$.`,
        format: "qcm",
        choices:
          question === "variation"
            ? shuffle(["croissante", "décroissante", "constante", "croissante puis décroissante"])
            : shuffle([
                `$\\log(${a}) < \\log(${b})$`,
                `$\\log(${a}) > \\log(${b})$`,
                `$\\log(${a}) = \\log(${b})$`,
                "on ne peut pas comparer sans calculatrice",
              ]),
        expected: [question === "variation" ? "croissante" : `$\\log(${a}) < \\log(${b})$`],
        comparator: "mcq_exact",
        canvas: canvasCourbe((x) => Math.log10(x), 0.2, 100, "Courbe de la fonction logarithme décimal", { pas: 0.5 }),
        explanation: exp(
          "La fonction logarithme décimal est strictement croissante sur $]0\\,;\\,+\\infty[$ : elle conserve donc l'ordre des nombres.",
          question === "variation"
            ? "On lit le sens de la courbe : elle monte, même si elle s'aplatit."
            : "On compare les deux nombres, et la croissance transmet l'ordre aux logarithmes.",
          question === "variation"
            ? "La courbe monte sur tout l'intervalle, de plus en plus lentement — mais elle ne redescend jamais."
            : `$${a} < ${b}$, et $\\log$ est croissante, donc $\\log(${a}) < \\log(${b})$.`,
          question === "variation"
            ? "La fonction logarithme décimal est croissante."
            : `$\\log(${a}) < \\log(${b})$.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer sans calculatrice",
            cause: "la croissance de log suffit à comparer : aucun calcul n'est nécessaire",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la croissance MISE AU TRAVAIL. Le premier item la nomme et
    // compare deux logarithmes ; celui-ci s'en sert pour résoudre : puisque
    // $\log$ conserve l'ordre, $\log(x) > 2$ équivaut à $x > 100$. C'est le
    // même argument, mais rendu à ce qu'il sert.
    // ⚠️ Sans figure : la courbe du premier item donnerait le seuil à l'œil.
    kind: "template",
    id: "stmg_log_sens_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_definition",
    microId: "logT_sens_variation",
    difficulty: 3,
    theme: "neutral",
    hint: "Applique la puissance de dix aux deux membres : la croissance conserve le sens de l'inégalité.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const n = pick([1, 2, 3, 4, 5] as const);
      const seuil = Math.pow(10, n);
      const bonne = `$x > ${fr(seuil)}$`;
      return {
        text: `Résous l'inéquation $\\log(x) > ${n}$, d'inconnue $x$ strictement positive.`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$x > ${n}$`,
          `$x < ${fr(seuil)}$`,
          `$x > ${fr(seuil * 10)}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La fonction logarithme décimal est strictement croissante : elle conserve l'ordre. Donc $\\log(x) > n$ équivaut à $x > 10^{n}$.",
          "On applique la puissance de dix aux deux membres — le sens de l'inégalité ne change pas, puisque la fonction est croissante.",
          `$\\log(x) > ${n}$ et $\\log(${fr(seuil)}) = ${n}$ : comme $\\log$ conserve l'ordre, ` +
            `l'inéquation équivaut à $x > ${fr(seuil)}$.`,
          `L'ensemble des solutions est $]${fr(seuil)}\\,;\\,+\\infty[$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x > ${n}$`,
            cause: "a comparé $x$ au logarithme lui-même : il faut repasser par la puissance de dix",
          },
        ],
      };
    },
  },

  /* ═══════════════════ logT_produit ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_produit_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_produit",
    difficulty: 2,
    theme: "neutral",
    hint: "Le logarithme transforme les PRODUITS en SOMMES.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const a = pick([2, 3, 5, 6, 7, 11, 13, 4, 9, 8] as const);
      const b = pick([5, 7, 12, 15, 20, 25, 3, 6, 10, 14] as const);
      return {
        text: `À quoi est égal $\\log(${a} \\times ${b})$ ?`,
        format: "qcm",
        choices: makeChoices(`$\\log(${a}) + \\log(${b})$`, [
          `$\\log(${a}) \\times \\log(${b})$`,
          `$\\log(${a}) - \\log(${b})$`,
          `$\\dfrac{\\log(${a})}{\\log(${b})}$`,
          `$${a} \\times \\log(${b})$`,
          `$\\log(${a + b})$`,
        ]),
        expected: [`$\\log(${a}) + \\log(${b})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Propriété fondamentale : $\\log(ab) = \\log(a) + \\log(b)$ pour tous réels strictement positifs.",
          "On retient que le logarithme transforme les produits en sommes — c'est ce qui a fait son utilité historique.",
          `$\\log(${a} \\times ${b}) = \\log(${a * b}) = \\log(${a}) + \\log(${b})$.`,
          `$\\log(${a} \\times ${b}) = \\log(${a}) + \\log(${b})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\log(${a}) \\times \\log(${b})$`,
            cause: "a gardé le produit : le logarithme le transforme justement en somme",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la propriété qui CALCULE. Le premier item choisit la bonne
    // identité parmi quatre ; celui-ci la fait servir : la table ne donne pas
    // $\log(15)$, mais elle donne $\log(3)$ et $\log(5)$. C'est l'usage
    // historique du logarithme — remplacer une multiplication par une addition.
    // ⚠️ Réponse demandée au MILLIÈME : au dix-millième, la somme des valeurs
    // arrondies de la table et le vrai logarithme peuvent différer d'une unité
    // sur le dernier chiffre, et l'élève serait compté faux pour un calcul juste.
    kind: "template",
    id: "stmg_log_produit_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Décompose le nombre en produit de deux facteurs présents dans la table, puis additionne leurs logarithmes.",
    tags: ["stmg", "maths", "logarithme", "canvas", "template", "short"],
    generate: () => {
      // On ne garde que les paires pour lesquelles la somme des valeurs
      // ARRONDIES de la table donne, au millième, le même résultat que le vrai
      // logarithme du produit.
      // ⛔ Pas de $2 \times 3$ : le tableau donne $\log(6)$ directement, et
      // l'énoncé promet le contraire.
      const paires = ([
        [2, 5],
        [3, 5],
        [2, 7],
        [3, 4],
        [5, 6],
        [4, 5],
        [3, 7],
        [2, 11],
        [3, 11],
      ] as const).filter(([u, v]) => {
        const somme =
          Math.round(Math.log10(u) * 10000) / 10000 + Math.round(Math.log10(v) * 10000) / 10000;
        return Math.round(somme * 1000) / 1000 === Math.round(Math.log10(u * v) * 1000) / 1000;
      });
      const [a, b] = pick(paires);
      const produit = a * b;
      const resultat = Math.round(Math.log10(produit) * 1000) / 1000;
      return {
        text:
          `À l'aide du tableau, calcule $\\log(${produit})$, arrondi au millième. ` +
          `Le tableau ne donne pas directement $\\log(${produit})$ : décompose.`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        canvas: canvasTableLog([2, 3, 4, 5, 6, 7, 11], "Table de logarithmes décimaux"),
        explanation: exp(
          "$\\log(ab) = \\log(a) + \\log(b)$ : le logarithme transforme un produit en somme. C'est ce qui permet de calculer le logarithme d'un nombre absent de la table.",
          "On écrit le nombre comme un produit de deux nombres de la table, puis on additionne leurs logarithmes.",
          `$${produit} = ${a} \\times ${b}$, donc $\\log(${produit}) = \\log(${a}) + \\log(${b}) \\approx ` +
            `${fr(Math.round(Math.log10(a) * 10000) / 10000)} + ${fr(Math.round(Math.log10(b) * 10000) / 10000)} \\approx ${fr(resultat)}$.`,
          `$\\log(${produit}) \\approx ${fr(resultat)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ logT_quotient ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_quotient_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_quotient",
    difficulty: 2,
    theme: "neutral",
    hint: "Un quotient devient une différence.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const m = pick([3, 4, 5, 6, 7, 8] as const);
      const n = pick([1, 2, 3] as const);
      const num = Math.pow(10, m);
      const den = Math.pow(10, n);
      return {
        text: `En utilisant $\\log\\left(\\dfrac{a}{b}\\right) = \\log(a) - \\log(b)$, calcule $\\log\\left(\\dfrac{${fr(num)}}{${fr(den)}}\\right)$.`,
        format: "short",
        expected: [String(m - n)],
        comparator: "number_equal",
        explanation: exp(
          "$\\log\\left(\\dfrac{a}{b}\\right) = \\log(a) - \\log(b)$ pour tous réels strictement positifs.",
          "On applique la propriété du quotient, puis on utilise $\\log(10^k) = k$.",
          `$\\log(${fr(num)}) - \\log(${fr(den)}) = ${m} - ${n} = ${m - n}$.`,
          `Le résultat vaut $${m - n}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER le quotient devenu quotient. Le premier item
    // applique la règle sur des puissances de dix, où tout tombe rond ; celui-ci
    // met en scène l'erreur jumelle de celle du produit : transformer
    // $\log\left(\frac{a}{b}\right)$ en $\frac{\log a}{\log b}$. Les deux
    // écritures se ressemblent, et une seule est vraie.
    kind: "template",
    id: "stmg_log_quotient_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_quotient",
    difficulty: 3,
    theme: "neutral",
    hint: "Le logarithme transforme les quotients en DIFFÉRENCES, pas en quotients.",
    tags: ["stmg", "maths", "logarithme", "diagnostic", "template"],
    generate: () => {
      // ⛔ La paire $(10\,000\,;\,100)$ est écartée : la division des exposants
      // y donne le MÊME nombre que leur soustraction ($4 \div 2 = 4 - 2$), et
      // l'erreur mise en scène produirait le bon résultat.
      const [a, b] = pick([
        [100, 10],
        [1000, 10],
        [1000, 100],
        [10000, 10],
        [100000, 100],
      ] as const);
      const vrai = Math.log10(a) - Math.log10(b);
      const faux = Math.log10(a) / Math.log10(b);
      const bonne = "il a transformé le quotient en quotient : il fallait une DIFFÉRENCE";
      return {
        text:
          `Un élève calcule $\\log\\left(\\dfrac{${fr(a)}}{${fr(b)}}\\right)$ et écrit ` +
          `$\\dfrac{\\log(${fr(a)})}{\\log(${fr(b)})} = ${fr(faux)}$. ` +
          `Quelle erreur a-t-il commise ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          "il a oublié que le logarithme d'un quotient n'existe pas",
          "il s'est trompé dans la valeur de $\\log(10)$",
          "il n'a commis aucune erreur : les deux écritures sont égales",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "$\\log\\left(\\dfrac{a}{b}\\right) = \\log(a) - \\log(b)$ : le logarithme abaisse d'un cran chaque opération — le produit devient somme, le quotient devient différence.",
          "On calcule les deux écritures et on les compare : elles ne donnent pas le même nombre.",
          `Le bon calcul : $\\log(${fr(a)}) - \\log(${fr(b)}) = ${fr(Math.log10(a))} - ${fr(Math.log10(b))} = ${fr(vrai)}$, ` +
            `et l'on vérifie que $\\dfrac{${fr(a)}}{${fr(b)}} = ${fr(a / b)} = 10^{${fr(vrai)}}$. ` +
            `L'élève, lui, a obtenu $${fr(faux)}$.`,
          `L'erreur : ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════════════ logT_puissance ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_puissance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_puissance",
    difficulty: 2,
    theme: "neutral",
    hint: "L'exposant DESCEND devant le logarithme.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const a = pick([2, 3, 5, 7, 1.05, 1.2, 1.5, 4, 6, 12] as const);
      const n = randomInt(2, 12);
      return {
        text: `À quoi est égal $\\log\\left(${fr(a)}^{${n}}\\right)$ ?`,
        format: "qcm",
        choices: makeChoices(`$${n}\\log(${fr(a)})$`, [
          `$\\log(${fr(a)})^{${n}}$`,
          `$\\dfrac{\\log(${fr(a)})}{${n}}$`,
          `$\\log(${fr(a)}) + ${n}$`,
          `$${fr(a)}\\log(${n})$`,
          `$\\log(${fr(a)} \\times ${n})$`,
        ]),
        expected: [`$${n}\\log(${fr(a)})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "$\\log(a^n) = n\\log(a)$ : l'exposant devient un facteur.",
          "C'est cette propriété qui permet de faire descendre l'inconnue d'une équation exponentielle.",
          `$\\log\\left(${fr(a)}^{${n}}\\right) = ${n} \\times \\log(${fr(a)})$.`,
          `$\\log\\left(${fr(a)}^{${n}}\\right) = ${n}\\log(${fr(a)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\log(${fr(a)})^{${n}}$`,
            cause: "a laissé l'exposant sur le logarithme au lieu de le faire descendre en facteur",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la règle REMONTÉE. Le premier item fait descendre l'exposant ;
    // celui-ci le fait remonter : un facteur devant un logarithme redevient un
    // exposant. C'est le geste qu'on doit faire pour reconnaître qu'une somme
    // de logarithmes est encore un logarithme — et pour vérifier une solution.
    kind: "template",
    id: "stmg_log_puissance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_puissance",
    difficulty: 3,
    theme: "neutral",
    hint: "Un facteur devant $\\log$ remonte en exposant : $n\\log(a) = \\log(a^n)$.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const a = pick([2, 3, 5, 7] as const);
      const n = randomInt(2, 5);
      const valeur = Math.pow(a, n);
      const bonne = `$x = ${valeur}$`;
      // ⛔ Les pièges se calculent puis se DÉDOUBLONNENT : $2^4$ et $4^2$ font
      // le même nombre, et $2 \times 2$ vaut $2^2$. Sans ce tri, le QCM tombait
      // à deux propositions une fois sur quinze. Les deux derniers candidats
      // sont là pour compléter quand les autres s'effondrent.
      const pieges = Array.from(new Set([n * a, a + n, Math.pow(n, a), a, valeur + 1, valeur - 1]))
        .filter((v) => v !== valeur)
        .slice(0, 3);
      return {
        text: `On sait que $\\log(x) = ${n}\\log(${a})$. Que vaut $x$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, pieges.map((v) => `$x = ${v}$`)),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "$n\\log(a) = \\log(a^n)$ : un facteur devant un logarithme est un exposant qui a été descendu. On peut donc le faire remonter.",
          "On réécrit le membre de droite comme un seul logarithme, puis on identifie les deux nombres — la fonction logarithme ne prend jamais deux fois la même valeur.",
          `$${n}\\log(${a}) = \\log\\left(${a}^{${n}}\\right) = \\log(${valeur})$. ` +
            `Donc $\\log(x) = \\log(${valeur})$, d'où $x = ${valeur}$.`,
          `$x = ${valeur}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = ${n * a}$`,
            cause: "a multiplié le facteur par le nombre : le facteur est un EXPOSANT, pas un coefficient",
          },
        ],
      };
    },
  },

  /* ═══════════════════ logT_inverse ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_inverse_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_inverse",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\log\\left(\\frac{1}{b}\\right) = -\\log(b)$ : passer à l'inverse change le signe.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const n = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14] as const);
      const b = Math.pow(10, n);
      return {
        text: `Sachant que $\\log(${fr(b)}) = ${n}$, que vaut $\\log\\left(\\dfrac{1}{${fr(b)}}\\right)$ ?`,
        format: "short",
        expected: [String(-n)],
        comparator: "number_equal",
        explanation: exp(
          "$\\log\\left(\\dfrac{1}{b}\\right) = -\\log(b)$ : c'est le cas particulier de la propriété du quotient avec $\\log(1) = 0$.",
          "On applique la règle du quotient : $\\log(1) - \\log(b) = 0 - \\log(b)$.",
          `$\\log\\left(\\dfrac{1}{${fr(b)}}\\right) = -\\log(${fr(b)}) = ${-n}$.`,
          `Le résultat vaut $${-n}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — un nombre qui n'est PAS une puissance de dix. Le premier item
    // travaille sur $\frac{1}{10^n}$, où le résultat tombe rond et où l'on peut
    // réussir sans la règle ; ici il faut vraiment appliquer
    // $\log\left(\frac{1}{b}\right) = -\log(b)$, avec une valeur lue dans la
    // table. Le signe moins devient le seul enjeu.
    kind: "template",
    id: "stmg_log_inverse_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_proprietes",
    microId: "logT_inverse",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\dfrac{1}{b}$ a pour logarithme l'OPPOSÉ de celui de $b$.",
    tags: ["stmg", "maths", "logarithme", "canvas", "template", "short"],
    generate: () => {
      const b = pick([2, 4, 5, 8, 20, 25, 50] as const);
      const inverse = 1 / b;
      const resultat = Math.round(-Math.log10(b) * 1000) / 1000;
      return {
        text:
          `À l'aide du tableau, calcule $\\log(${fr(inverse)})$, arrondi au millième. ` +
          `On remarquera que $${fr(inverse)} = \\dfrac{1}{${b}}$.`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        canvas: canvasTableLog([2, 4, 5, 8, 20, 25, 50], "Table de logarithmes décimaux"),
        explanation: exp(
          "$\\log\\left(\\dfrac{1}{b}\\right) = -\\log(b)$ : passer à l'inverse change le signe du logarithme. Un nombre plus petit que $1$ a donc toujours un logarithme NÉGATIF.",
          "On lit $\\log(b)$ dans la table, puis on change son signe.",
          `$\\log(${b}) \\approx ${fr(Math.round(Math.log10(b) * 10000) / 10000)}$, ` +
            `donc $\\log\\left(\\dfrac{1}{${b}}\\right) \\approx ${fr(resultat)}$.`,
          `$\\log(${fr(inverse)}) \\approx ${fr(resultat)}$ — négatif, comme pour tout nombre compris entre $0$ et $1$.`
        ),
      };
    },
  },

  /* ═══════════ logT_resoudre_exponentielle ═══════════ */

  {
    kind: "template",
    id: "stmg_log_resoudre_expo_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_equations",
    microId: "logT_resoudre_exponentielle",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique $\\log$ aux deux membres : l'exposant descend et devient un facteur.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 5, 1.05, 1.1, 1.2, 1.25, 1.5, 4, 1.8] as const);
      const b = pick([50, 100, 200, 500, 1000, 2000] as const);
      const x = Math.log10(b) / Math.log10(a);
      const distracteurs = [2, 3, 5, 100, 1.1, 1.5].filter((v) => v !== a && v !== b);
      return {
        text:
          `Résous l'équation $${fr(a)}^x = ${b}$, en t'aidant du tableau de valeurs. ` +
          `Donne la solution arrondie au centième.`,
        format: "short",
        expected: [fr(Math.round(x * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasTableLog([a, b, ...distracteurs.slice(0, 3)], "Table de logarithmes décimaux"),
        explanation: exp(
          "Pour résoudre $a^x = b$ avec $a > 0$ et $b > 0$, on applique le logarithme décimal aux deux membres : $x\\log(a) = \\log(b)$, donc $x = \\dfrac{\\log(b)}{\\log(a)}$.",
          "On fait descendre l'exposant grâce à $\\log(a^x) = x\\log(a)$, puis on isole $x$.",
          `$x = \\dfrac{\\log(${b})}{\\log(${fr(a)})} \\approx \\dfrac{${fr(Math.round(Math.log10(b) * 10000) / 10000)}}{${fr(Math.round(Math.log10(a) * 10000) / 10000)}} \\approx ${fr(Math.round(x * 100) / 100)}$.`,
          `La solution est $x \\approx ${fr(Math.round(x * 100) / 100)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — ÉCRIRE la solution avant de la calculer. Le premier item rend
    // un nombre arrondi ; celui-ci demande la forme exacte, $\frac{\log b}{\log
    // a}$, qui est ce qu'un correcteur attend AVANT la valeur. Le piège est le
    // sens du quotient : $\frac{\log a}{\log b}$ se ressemble et ne vaut rien.
    // ⚠️ Sans table de logarithmes : il n'y a rien à calculer ici, et la table
    // pousserait justement à le faire.
    kind: "template",
    id: "stmg_log_resoudre_expo_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_equations",
    microId: "logT_resoudre_exponentielle",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique $\\log$ des deux côtés : $x\\log(a) = \\log(b)$, puis on divise par $\\log(a)$.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.2, 1.5, 2, 3] as const);
      // ⛔ $b$ ne doit pas valoir $a$ : sinon le piège du quotient renversé
      // s'écrit exactement comme la bonne réponse.
      const b = pick([2, 5, 20, 50, 100, 500].filter((v) => v !== a));
      const bonne = `$x = \\dfrac{\\log(${b})}{\\log(${fr(a)})}$`;
      return {
        text: `Quelle est l'écriture EXACTE de la solution de l'équation $${fr(a)}^x = ${b}$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$x = \\dfrac{\\log(${fr(a)})}{\\log(${b})}$`,
          `$x = \\log\\left(\\dfrac{${b}}{${fr(a)}}\\right)$`,
          `$x = \\log(${b}) - \\log(${fr(a)})$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour résoudre $a^x = b$, on applique le logarithme décimal aux deux membres : $\\log(a^x) = \\log(b)$, soit $x\\log(a) = \\log(b)$, donc $x = \\dfrac{\\log(b)}{\\log(a)}$.",
          "On fait descendre l'exposant, puis on divise par le logarithme de la BASE — celui qui multipliait $x$.",
          `$${fr(a)}^x = ${b}$ donne $x\\log(${fr(a)}) = \\log(${b})$, donc $x = \\dfrac{\\log(${b})}{\\log(${fr(a)})} \\approx ` +
            `${fr(Math.round((Math.log10(b) / Math.log10(a)) * 100) / 100)}$.`,
          `L'écriture exacte est ${bonne} — la valeur décimale ne vient qu'après.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = \\log(${b}) - \\log(${fr(a)})$`,
            cause: "a transformé le quotient en différence : ici le quotient porte sur les LOGARITHMES, il ne se simplifie pas",
          },
        ],
      };
    },
  },

  /* ═══════════ logT_resoudre_puissance ═══════════ */

  {
    kind: "template",
    id: "stmg_log_resoudre_puissance_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_equations",
    microId: "logT_resoudre_puissance",
    difficulty: 3,
    theme: "neutral",
    hint: "Ici l'inconnue est en BASE : on cherche $x = b^{\\frac{1}{a}}$.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      // On choisit la solution : le résultat tombe rond.
      const x = pick([2, 3, 4, 5, 6, 7, 8, 10, 12, 15] as const);
      const a = pick([2, 3, 4, 5] as const);
      const b = Math.pow(x, a);
      return {
        text: `Résous l'équation $x^{${a}} = ${b}$, d'inconnue $x$ réelle strictement positive.`,
        format: "short",
        expected: [String(x)],
        comparator: "number_equal",
        explanation: exp(
          "Une équation $x^a = b$ a pour inconnue la BASE : sa solution positive est $x = b^{\\frac{1}{a}}$, la racine $a$-ième de $b$.",
          "On distingue bien ce cas de $a^x = b$, où l'inconnue est l'exposant et où l'on passe par le logarithme.",
          `$x = ${b}^{\\frac{1}{${a}}} = ${x}$, et l'on vérifie : $${x}^{${a}} = ${b}$.`,
          `La solution est $x = ${x}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — RECONNAÎTRE laquelle des deux équations on a sous les yeux. Le
    // premier item résout $x^a = b$ ; celui-ci demande de TRIER : quand
    // l'inconnue est en base, une racine suffit ; quand elle est en exposant,
    // il faut le logarithme. C'est la confusion centrale du chapitre, et elle
    // ne se voit qu'en mettant les deux côte à côte.
    kind: "template",
    id: "stmg_log_resoudre_puissance_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_equations",
    microId: "logT_resoudre_puissance",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde OÙ est l'inconnue : en base, on prend une racine ; en exposant, il faut le logarithme.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const x = pick([2, 3, 4, 5, 6, 10] as const);
      const a = pick([3, 4, 5] as const);
      const b = Math.pow(x, a);
      // ⛔⛔ La base des fausses équations ne doit pas rendre $b$ comme puissance
      // ENTIÈRE : « $2^x = 16$ » se résout de tête, sans logarithme, et il y
      // aurait alors deux bonnes réponses. On écarte donc toute base dont $b$
      // est une puissance.
      const bases = pick(
        [2, 3, 5, 1.05, 1.2].filter((v) => {
          const k = Math.log(b) / Math.log(v);
          return Math.abs(k - Math.round(k)) > 1e-9;
        })
      );
      // La cible des fausses équations ne doit pas valoir $b$, sinon deux
      // propositions s'écriraient pareil.
      const cibles = pick([50, 200, 1000].filter((v) => v !== b));
      const bonne = `$x^{${a}} = ${b}$`;
      return {
        text: `Parmi ces quatre équations, laquelle se résout SANS logarithme ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$${fr(bases)}^x = ${cibles}$`,
          `$${fr(bases)}^x = ${b}$`,
          // ⛔ Le « $x$ » de la quatrième équation est la LETTRE, pas la valeur
          // de la solution : en interpolant `${x}`, on écrivait « $10^x =
          // 1000$ », qui se résout de tête — deux bonnes réponses au lieu d'une.
          `$x^x = ${cibles}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Quand l'inconnue est en BASE — équation $x^a = b$ —, la solution positive est $b^{\\frac{1}{a}}$ : une racine suffit. Quand elle est en EXPOSANT — équation $a^x = b$ —, il faut le logarithme pour la faire descendre.",
          "On repère la place de $x$ dans chaque équation avant de choisir l'outil.",
          `Dans $x^{${a}} = ${b}$, l'inconnue est en base : $x = ${b}^{\\frac{1}{${a}}} = ${x}$. ` +
            `Dans les autres, $x$ est en exposant — et dans $x^x = ${cibles}$, elle est aux deux places à la fois, ` +
            `ce qui dépasse le programme.`,
          `L'équation qui se résout sans logarithme est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(bases)}^x = ${b}$`,
            cause: "l'inconnue est ici en exposant : c'est le cas qui réclame le logarithme",
          },
        ],
      };
    },
  },

  /* ═══════════════════ logT_inequation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_inequation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_equations",
    microId: "logT_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "Le logarithme est croissant : appliqué aux deux membres, il CONSERVE le sens de l'inégalité.",
    tags: ["stmg", "maths", "logarithme", "canvas", "template", "short"],
    generate: () => {
      const a = pick([1.05, 1.1, 1.2, 1.25, 1.5, 2, 3] as const);
      const b = pick([2, 3, 5, 10, 20, 50, 100] as const);
      const seuil = Math.log10(b) / Math.log10(a);
      const n = Math.floor(seuil) + 1;
      return {
        text:
          `Détermine le plus petit entier naturel $n$ tel que $${fr(a)}^n > ${b}$. ` +
          `La courbe de $x \\mapsto ${fr(a)}^x$ et la droite d'équation $y = ${b}$ sont tracées.`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: canvasCourbe((x) => Math.pow(a, x), 0, Math.ceil(seuil) + 4, `y = ${fr(a)}^x et le seuil ${b}`, {
          pas: (Math.ceil(seuil) + 4) / 70,
          seuil: b,
        }),
        explanation: exp(
          "Pour résoudre $a^n > b$ avec $a > 1$, on applique le logarithme décimal : la fonction étant croissante, le sens de l'inégalité est conservé, et $n > \\dfrac{\\log(b)}{\\log(a)}$.",
          "On calcule le seuil réel, puis on prend le premier entier strictement au-dessus — la courbe permet de vérifier.",
          `$n > \\dfrac{\\log(${b})}{\\log(${fr(a)})} \\approx ${fr(Math.round(seuil * 100) / 100)}$, donc le plus petit entier convenable est $${n}$.`,
          `Le plus petit entier est $n = ${n}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la base est PLUS PETITE QUE 1, et l'inégalité se retourne. Le
    // premier item travaille une croissance ; ici la grandeur décroît, donc
    // $\log(a)$ est négatif, et diviser par lui CHANGE le sens de l'inégalité.
    // C'est le seul endroit du domaine où cela arrive, et c'est là que se perd
    // un élève qui applique la méthode par cœur.
    // ⚠️ Sans figure : le premier item porte la sienne, et une courbe
    // décroissante rendrait le seuil lisible sans jamais poser l'inégalité.
    kind: "template",
    id: "stmg_log_inequation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_equations",
    microId: "logT_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\log$ d'un nombre inférieur à $1$ est NÉGATIF : en divisant par lui, l'inégalité change de sens.",
    tags: ["stmg", "maths", "logarithme", "gestion", "template", "short"],
    generate: () => {
      const t = pick([5, 10, 15, 20, 25, 30] as const);
      const a = 1 - t / 100;
      const cible = pick([0.5, 0.25, 0.2, 0.1] as const);
      const seuil = Math.log10(cible) / Math.log10(a);
      const n = Math.floor(seuil) + 1;
      return {
        text:
          `Un stock diminue de $${t}\\,\\%$ par an. ` +
          `Au bout de combien d'années ENTIÈRES sera-t-il inférieur à $${fr(cible * 100)}\\,\\%$ de sa valeur d'aujourd'hui ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Résoudre $a^n < c$ avec $0 < a < 1$ passe par le logarithme, mais $\\log(a)$ est alors NÉGATIF : en divisant les deux membres par lui, le sens de l'inégalité s'inverse et l'on obtient $n > \\dfrac{\\log(c)}{\\log(a)}$.",
          "On applique le logarithme, on fait descendre l'exposant, puis on divise — en retournant l'inégalité, puisque le diviseur est négatif.",
          `$${fr(a)}^n < ${fr(cible)}$ donne $n\\log(${fr(a)}) < \\log(${fr(cible)})$. ` +
            `Or $\\log(${fr(a)}) \\approx ${fr(Math.round(Math.log10(a) * 10000) / 10000)}$, qui est négatif : ` +
            `on obtient donc $n > \\dfrac{${fr(Math.round(Math.log10(cible) * 10000) / 10000)}}{${fr(Math.round(Math.log10(a) * 10000) / 10000)}} \\approx ${fr(Math.round(seuil * 100) / 100)}$, ` +
            `d'où $n = ${n}$.`,
          `Il faut $${n}$ années pour que le stock passe sous $${fr(cible * 100)}\\,\\%$ de sa valeur.`
        ),
      };
    },
  },

  /* ═══════════════════ logT_nombre_annuites ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_annuites_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_applications",
    microId: "logT_nombre_annuites",
    difficulty: 3,
    theme: "neutral",
    hint: "On cherche le premier ENTIER d'années : le résultat du logarithme se plafonne à l'entier supérieur.",
    tags: ["stmg", "maths", "logarithme", "gestion", "canvas", "template", "short"],
    generate: () => {
      const placement = pick(PLACEMENTS);
      const depart = pick([1000, 1500, 2000, 2500, 4000, 5000] as const);
      const t = pick([2, 3, 4, 5, 8, 10, 12] as const);
      const q = 1 + t / 100;
      const cible = depart * pick([1.5, 2, 2.5, 3] as const);
      const seuil = Math.log10(cible / depart) / Math.log10(q);
      const n = Math.floor(seuil) + 1;
      return {
        text:
          `${placement.sujet.charAt(0).toUpperCase()}${placement.sujet.slice(1)} vaut $${depart}$ ${placement.unite} ` +
          `et augmente de $${t}\\,\\%$ par an. ` +
          `Au bout de combien d'années ENTIÈRES dépassera-t-il $${fr(cible)}$ ${placement.unite} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        canvas: canvasCourbe((x) => depart * Math.pow(q, x), 0, Math.ceil(seuil) + 4, `${placement.sujet} au fil des ans`, {
          pas: (Math.ceil(seuil) + 4) / 70,
          seuil: cible,
        }),
        explanation: exp(
          "La recherche d'un nombre d'annuités revient à résoudre $u_0 q^n > C$, c'est-à-dire $q^n > \\dfrac{C}{u_0}$ : on applique le logarithme décimal.",
          "On isole $n$, puis on prend le premier entier strictement supérieur au seuil obtenu — une année entamée compte.",
          `$n > \\dfrac{\\log\\left(\\frac{${fr(cible)}}{${depart}}\\right)}{\\log(${fr(q)})} \\approx ${fr(Math.round(seuil * 100) / 100)}$, ` +
            `donc $n = ${n}$.`,
          `Le seuil est dépassé au bout de $${n}$ années.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la DURÉE D'UN REMBOURSEMENT, où la cible n'est plus un multiple
    // du départ mais une somme à atteindre. Le premier item cherche un seuil de
    // capitalisation ; celui-ci part d'un versement annuel et demande combien
    // d'annuités il faut — c'est le mot même du libellé, et la question la plus
    // fréquente en gestion.
    // ⚠️ Sans figure : le premier item porte déjà la courbe et son seuil.
    kind: "template",
    id: "stmg_log_annuites_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_applications",
    microId: "logT_nombre_annuites",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris l'inéquation $q^n > \\dfrac{\\text{objectif}}{\\text{départ}}$, puis applique le logarithme.",
    tags: ["stmg", "maths", "logarithme", "gestion", "template", "short"],
    generate: () => {
      const placement = pick(PLACEMENTS);
      const depart = pick([800, 1200, 1600, 3000, 5000] as const);
      const t = pick([2, 3, 4, 6, 7, 9] as const);
      const q = 1 + t / 100;
      // L'objectif est un montant rond, pas un multiple du départ : l'élève doit
      // former lui-même le quotient.
      const objectif = Math.ceil((depart * pick([1.4, 1.8, 2.2, 2.6] as const)) / 100) * 100;
      const seuil = Math.log10(objectif / depart) / Math.log10(q);
      const n = Math.floor(seuil) + 1;
      return {
        text:
          `${placement.sujet.charAt(0).toUpperCase()}${placement.sujet.slice(1)} vaut aujourd'hui $${depart}$ ${placement.unite} ` +
          `et progresse de $${t}\\,\\%$ par an. ` +
          `Combien d'années entières faut-il attendre pour atteindre $${objectif}$ ${placement.unite} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher un nombre d'annuités revient à résoudre $u_0 q^n \\geqslant C$, c'est-à-dire $q^n \\geqslant \\dfrac{C}{u_0}$ : on applique le logarithme décimal et l'on fait descendre $n$.",
          "On forme d'abord le quotient objectif sur départ, puis on divise son logarithme par celui du coefficient, et l'on prend l'entier supérieur.",
          `$\\dfrac{${objectif}}{${depart}} \\approx ${fr(Math.round((objectif / depart) * 10000) / 10000)}$, ` +
            `donc $n \\geqslant \\dfrac{\\log\\left(${fr(Math.round((objectif / depart) * 10000) / 10000)}\\right)}{\\log(${fr(q)})} \\approx ${fr(Math.round(seuil * 100) / 100)}$. ` +
            `Une année entamée ne compte pas : il faut $${n}$ années complètes.`,
          `Au bout de $${n}$ années, l'objectif de $${objectif}$ ${placement.unite} est atteint.`
        ),
      };
    },
  },

  /* ═══════════════════ logT_temps_doublement ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_doublement_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_applications",
    microId: "logT_temps_doublement",
    difficulty: 3,
    theme: "neutral",
    hint: "Le temps de doublement ne dépend PAS de la valeur de départ : on résout $q^x = 2$.",
    tags: ["stmg", "maths", "logarithme", "canvas", "template", "short"],
    generate: () => {
      const t = pick([1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 20] as const);
      const q = 1 + t / 100;
      const doublement = Math.log10(2) / Math.log10(q);
      return {
        text:
          `Une grandeur augmente de $${t}\\,\\%$ par an. ` +
          `Au bout de combien d'années aura-t-elle doublé ? Donne le résultat arrondi au dixième.`,
        format: "short",
        expected: [fr(Math.round(doublement * 10) / 10)],
        comparator: "number_equal",
        canvas: canvasCourbe((x) => Math.pow(q, x), 0, Math.ceil(doublement) + 5, `Coefficient cumulé, seuil de doublement`, {
          pas: (Math.ceil(doublement) + 5) / 70,
          seuil: 2,
        }),
        explanation: exp(
          "Le temps de doublement est la durée $x$ telle que le coefficient cumulé atteigne $2$ : on résout $q^x = 2$, donc $x = \\dfrac{\\log(2)}{\\log(q)}$.",
          "On remarque que la valeur de départ n'intervient pas : le temps de doublement ne dépend que du taux.",
          `$x = \\dfrac{\\log(2)}{\\log(${fr(q)})} \\approx \\dfrac{0{,}301}{${fr(Math.round(Math.log10(q) * 100000) / 100000)}} \\approx ${fr(Math.round(doublement * 10) / 10)}$ années.`,
          `La grandeur double au bout d'environ $${fr(Math.round(doublement * 10) / 10)}$ années.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — la DEMI-VIE, l'autre moitié du libellé. Le premier item fait
    // doubler ; celui-ci fait diminuer de moitié, et l'on résout $q^x = 0,5$
    // avec $q < 1$. Les deux logarithmes sont négatifs, leur quotient est
    // positif : c'est le seul calcul du domaine où deux signes moins se
    // compensent, et il déroute.
    // ⚠️ Sans figure : le premier item porte la courbe et son seuil.
    kind: "template",
    id: "stmg_log_doublement_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_applications",
    microId: "logT_temps_doublement",
    difficulty: 3,
    theme: "neutral",
    hint: "On résout $q^x = 0{,}5$ : les deux logarithmes sont négatifs, mais leur quotient est bien positif.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const t = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20] as const);
      const q = 1 - t / 100;
      const demiVie = Math.log10(0.5) / Math.log10(q);
      return {
        text:
          `Une substance perd $${t}\\,\\%$ de sa masse chaque année. ` +
          `Au bout de combien d'années sa masse aura-t-elle diminué de MOITIÉ ? ` +
          `Donne le résultat arrondi au dixième.`,
        format: "short",
        expected: [fr(Math.round(demiVie * 10) / 10)],
        comparator: "number_equal",
        explanation: exp(
          "La demi-vie est la durée $x$ au bout de laquelle le coefficient cumulé vaut $0{,}5$ : on résout $q^x = 0{,}5$, donc $x = \\dfrac{\\log(0{,}5)}{\\log(q)}$. Comme pour le temps de doublement, la valeur de départ n'intervient pas.",
          "On applique le logarithme, on fait descendre l'exposant, puis on divise — les deux logarithmes sont négatifs, le résultat est positif.",
          `$x = \\dfrac{\\log(0{,}5)}{\\log(${fr(q)})} \\approx \\dfrac{-0{,}301}{${fr(Math.round(Math.log10(q) * 100000) / 100000)}} \\approx ${fr(Math.round(demiVie * 10) / 10)}$ années.`,
          `La masse est réduite de moitié au bout d'environ $${fr(Math.round(demiVie * 10) / 10)}$ années.`
        ),
      };
    },
  },

  /* ═══════════════════ logT_nombre_de_chiffres ═══════════════════ */

  {
    kind: "template",
    id: "stmg_log_chiffres_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_applications",
    microId: "logT_nombre_de_chiffres",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre de chiffres d'un entier $N$ est la partie entière de $\\log(N)$, plus $1$.",
    tags: ["stmg", "maths", "logarithme", "template", "short"],
    generate: () => {
      const a = pick([2, 3, 5, 7, 6, 11, 13] as const);
      // ⚠️ On écarte les exposants pour lesquels n·log(a) frôle un entier : on
      // fournit à l'élève une valeur ARRONDIE de log(a), et son calcul pourrait
      // alors basculer de l'autre côté de la partie entière. La question serait
      // fausse pour un élève qui applique correctement la méthode.
      let n = randomInt(8, 40);
      for (let essai = 0; essai < 40; essai++) {
        const frac = (n * Math.log10(a)) % 1;
        if (frac > 0.02 && frac < 0.98) break;
        n = randomInt(8, 40);
      }
      const logN = n * Math.log10(a);
      const chiffres = Math.floor(logN) + 1;
      return {
        text: `Combien de chiffres compte l'écriture décimale de $${a}^{${n}}$ ? Le tableau donne les logarithmes utiles.`,
        format: "short",
        expected: [String(chiffres)],
        comparator: "number_equal",
        canvas: canvasTableLog([2, 3, 5, 6, 7, 11, 13], "Table de logarithmes décimaux"),
        explanation: exp(
          "Pour un entier $N$ strictement positif, le nombre de chiffres de son écriture décimale vaut $\\lfloor \\log(N) \\rfloor + 1$.",
          "On calcule $\\log(N)$ grâce à $\\log(a^n) = n\\log(a)$, puis on prend la partie entière et l'on ajoute $1$.",
          `$\\log\\left(${a}^{${n}}\\right) = ${n} \\times ${fr(Math.round(Math.log10(a) * 10000) / 10000)} \\approx ${fr(Math.round(logN * 100) / 100)}$, ` +
            `donc le nombre de chiffres vaut $${Math.floor(logN)} + 1 = ${chiffres}$.`,
          `$${a}^{${n}}$ s'écrit avec $${chiffres}$ chiffres.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'ORDRE DE GRANDEUR, l'autre moitié du libellé. Le premier item
    // compte les chiffres ; celui-ci part d'un logarithme déjà calculé et
    // demande à quelle puissance de dix le nombre ressemble. C'est la lecture
    // qu'on fait d'un résultat de calculatrice affiché en notation
    // scientifique, et elle ne demande aucun calcul — seulement la partie
    // entière.
    kind: "template",
    id: "stmg_log_chiffres_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "log_applications",
    microId: "logT_nombre_de_chiffres",
    difficulty: 3,
    theme: "neutral",
    hint: "La partie entière de $\\log(N)$ donne l'exposant de la puissance de dix qui encadre $N$.",
    tags: ["stmg", "maths", "logarithme", "template"],
    generate: () => {
      const entiere = pick([5, 7, 9, 11, 14, 17, 21] as const);
      const decimale = pick([0.12, 0.28, 0.44, 0.61, 0.79, 0.93] as const);
      const logN = entiere + decimale;
      const bonne = `entre $10^{${entiere}}$ et $10^{${entiere + 1}}$`;
      return {
        text:
          `Un calcul donne $\\log(N) \\approx ${fr(logN)}$, où $N$ est un entier. ` +
          `Quel est l'ordre de grandeur de $N$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `entre $10^{${entiere - 1}}$ et $10^{${entiere}}$`,
          `entre $10^{${entiere + 1}}$ et $10^{${entiere + 2}}$`,
          `environ $${fr(logN)}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Si $\\log(N) = k + d$ avec $k$ entier et $0 \\leqslant d < 1$, alors $10^{k} \\leqslant N < 10^{k+1}$ : la PARTIE ENTIÈRE du logarithme donne l'ordre de grandeur, et le nombre de chiffres vaut $k + 1$.",
          "On sépare la partie entière du logarithme de sa partie décimale, et l'on ne garde que la première.",
          `$\\log(N) \\approx ${fr(logN)}$ : la partie entière vaut $${entiere}$, donc $10^{${entiere}} \\leqslant N < 10^{${entiere + 1}}$. ` +
            `Au passage, $N$ s'écrit avec $${entiere + 1}$ chiffres.`,
          `$N$ est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `environ $${fr(logN)}$`,
            cause: "a confondu le nombre et son logarithme : $\\log(N)$ est un EXPOSANT, pas une valeur approchée de $N$",
          },
        ],
      };
    },
  },
];
