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
];
