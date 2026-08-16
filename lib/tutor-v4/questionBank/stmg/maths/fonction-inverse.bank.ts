// lib/tutor-v4/questionBank/stmg/maths/fonction-inverse.bank.ts
//
// Notions : fct_inverse et fct_inverse_derivee
//           (domaine STMGFO — « Fonction inverse », classe terminale)
//
// Le BO donne quatre contenus : le comportement aux bornes de l'ensemble de
// définition, la dérivée et le sens de variation, la courbe et ses asymptotes,
// et une capacité — « étudier et représenter des fonctions obtenues par
// combinaisons linéaires de la fonction inverse et de fonctions polynomiales
// de degré au maximum 3 ».
//
// ⛔ « Aucune définition d'asymptote n'est attendue ; on s'en tient à une
// approche intuitive. » Les items parlent donc de ce que fait la courbe quand
// $x$ devient très grand ou très proche de zéro, jamais de limite formelle.
//
// ⚠️ Le texte nomme lui-même la situation à privilégier : « la fonction inverse
// permet d'aborder des situations contextualisées de prix unitaire ou de coût
// moyen ». C'est aussi ce qui rend la combinaison linéaire utile en gestion :
// le coût moyen $\dfrac{C(x)}{x}$ d'un coût total affine s'écrit exactement
// $a + \dfrac{b}{x}$.

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
  const arrondi = Math.round(n * 10000) / 10000;
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

/** Courbe échantillonnée — `fonctionGraphique` ne trace nativement ni
 *  hyperbole ni cubique. On saute les valeurs qui explosent près de zéro. */
function canvasCourbePoints(
  f: (x: number) => number,
  xmin: number,
  xmax: number,
  titre: string,
  options?: { pas?: number; plafond?: number; marques?: number[] }
): CanvasFigure {
  const pas = options?.pas ?? (xmax - xmin) / 80;
  const plafond = options?.plafond ?? 30;
  const points: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    if (Math.abs(x) < 1e-6) continue;
    const y = f(x);
    if (Number.isFinite(y) && Math.abs(y) <= plafond) {
      points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
    }
  }
  const ys = points.map((p) => p.y);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin,
    xmax,
    ymin: Math.floor(Math.min(...ys, 0)) - 1,
    ymax: Math.ceil(Math.max(...ys, 0)) + 1,
    grille: true,
    courbes: [{ id: "f", type: "points", points }],
    points: options?.marques?.map((x) => ({ x, y: Math.round(f(x) * 100) / 100 })),
  };
}

export const fonctionInverseBank: TutorBankItemV4[] = [
  /* ═══════════════ fctT_inverse_courbe ═══════════════ */

  {
    kind: "template",
    id: "stmg_inv_courbe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse",
    microId: "fctT_inverse_courbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur la courbe de $x \\mapsto \\dfrac{k}{x}$, le produit des coordonnées de chaque point est constant.",
    tags: ["stmg", "maths", "fonctions", "inverse", "canvas", "template", "short"],
    generate: () => {
      const k = pick([6, 8, 10, 12, 15, 18, 20, 24] as const);
      const x0 = pick([1, 2, 3, 4, 5, 6] as const);
      return {
        text: `La courbe représente la fonction $f(x) = \\dfrac{${k}}{x}$. Lis la valeur de $f(${x0})$.`,
        format: "short",
        expected: [fr(k / x0)],
        comparator: "number_equal",
        canvas: canvasCourbePoints((x) => k / x, 0.5, 10, `Courbe de f(x) = ${k}/x`, {
          pas: 0.1,
          plafond: 26,
          marques: [x0],
        }),
        explanation: exp(
          "La courbe de la fonction inverse est une hyperbole : chaque point a pour ordonnée $\\dfrac{k}{x}$, donc le produit de ses deux coordonnées vaut toujours $k$.",
          "On repère l'abscisse, on monte jusqu'à la courbe, puis on lit l'ordonnée — ou l'on calcule directement.",
          `$f(${x0}) = \\dfrac{${k}}{${x0}} = ${fr(k / x0)}$, et l'on vérifie que $${x0} \\times ${fr(k / x0)} = ${k}$.`,
          `$f(${x0}) = ${fr(k / x0)}$.`
        ),
      };
    },
  },

  /* ═══════════════ fctT_inverse_bornes ═══════════════ */

  {
    kind: "template",
    id: "stmg_inv_bornes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse",
    microId: "fctT_inverse_bornes",
    difficulty: 3,
    theme: "neutral",
    hint: "L'inverse d'un très GRAND nombre est très petit ; l'inverse d'un nombre très PROCHE de zéro est très grand.",
    tags: ["stmg", "maths", "fonctions", "inverse", "template"],
    generate: () => {
      const k = pick([1, 2, 5, 10, 20] as const);
      const sens = pick(["grand", "petit"] as const);
      const bonne =
        sens === "grand"
          ? "elle se rapproche de $0$ sans jamais l'atteindre"
          : "elle devient de plus en plus grande, sans limite";
      return {
        text:
          `Soit $f(x) = \\dfrac{${k}}{x}$ sur $]0\\,;\\,+\\infty[$. ` +
          (sens === "grand"
            ? "Que devient $f(x)$ lorsque $x$ prend des valeurs de plus en plus grandes ?"
            : "Que devient $f(x)$ lorsque $x$ prend des valeurs de plus en plus proches de $0$ ?"),
        format: "qcm",
        choices: makeChoices(bonne, [
          sens === "grand"
            ? "elle devient de plus en plus grande, sans limite"
            : "elle se rapproche de $0$ sans jamais l'atteindre",
          `elle se rapproche de $${k}$`,
          "elle devient négative",
          "elle reste constante",
          `elle vaut exactement $0$ à partir d'un certain rang`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le comportement de la fonction inverse aux bornes se lit sur les ordres de grandeur : l'inverse d'un grand nombre est petit, l'inverse d'un nombre proche de zéro est grand.",
          "On essaie quelques valeurs pour voir la tendance — aucune définition formelle d'asymptote n'est attendue.",
          sens === "grand"
            ? `$f(100) = ${fr(k / 100)}$, $f(1000) = ${fr(k / 1000)}$, $f(10\\,000) = ${fr(k / 10000)}$ : les valeurs s'écrasent vers $0$.`
            : `$f(0{,}1) = ${fr(k / 0.1)}$, $f(0{,}01) = ${fr(k / 0.01)}$, $f(0{,}001) = ${fr(k / 0.001)}$ : les valeurs explosent.`,
          `Quand $x$ ${sens === "grand" ? "grandit" : "se rapproche de zéro"}, $f(x)$ ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `elle vaut exactement $0$ à partir d'un certain rang`,
            cause: "un quotient de numérateur non nul ne s'annule jamais : la courbe s'approche de l'axe sans le toucher",
          },
        ],
      };
    },
  },

  /* ═══════════════ fctT_inverse_cout_moyen ═══════════════ */

  {
    kind: "template",
    id: "stmg_inv_cout_moyen_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse",
    microId: "fctT_inverse_cout_moyen",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coût moyen est le coût total DIVISÉ par la quantité : la charge fixe se répartit sur de plus en plus d'unités.",
    tags: ["stmg", "maths", "fonctions", "inverse", "gestion", "canvas", "template", "short"],
    generate: () => {
      const fixe = pick([600, 800, 1200, 1500, 2000, 3000] as const);
      const unitaire = pick([4, 5, 8, 10, 12, 15] as const);
      const x0 = pick([50, 100, 150, 200, 250, 300] as const);
      const coutMoyen = unitaire + fixe / x0;
      return {
        text:
          `Le coût total de production de $x$ articles est $C(x) = ${unitaire}x + ${fixe}$ (en euros). ` +
          `Quel est le coût moyen par article pour $x = ${x0}$ ?`,
        format: "short",
        expected: [fr(Math.round(coutMoyen * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasCourbePoints((x) => unitaire + fixe / x, 10, 400, "Coût moyen par article (€)", {
          pas: 5,
          plafond: unitaire + fixe / 8,
          marques: [x0],
        }),
        explanation: exp(
          "Le coût moyen est le coût total rapporté au nombre d'unités : $\\dfrac{C(x)}{x}$. Quand le coût total est affine, le coût moyen s'écrit $a + \\dfrac{b}{x}$ — une fonction inverse décalée.",
          "On divise le coût total par la quantité, puis on interprète : la part variable reste constante, la charge fixe se dilue.",
          `$\\dfrac{C(${x0})}{${x0}} = \\dfrac{${unitaire} \\times ${x0} + ${fixe}}{${x0}} = ${unitaire} + \\dfrac{${fixe}}{${x0}} = ${fr(Math.round(coutMoyen * 100) / 100)}$ €.`,
          `Le coût moyen est de $${fr(Math.round(coutMoyen * 100) / 100)}$ € par article — et il se rapproche de $${unitaire}$ € quand la production augmente.`
        ),
      };
    },
  },

  /* ═══════════════ fctT_inverse_derivee ═══════════════ */

  {
    kind: "template",
    id: "stmg_inv_derivee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse_derivee",
    microId: "fctT_inverse_derivee",
    difficulty: 2,
    theme: "neutral",
    hint: "La dérivée de $\\dfrac{1}{x}$ est $-\\dfrac{1}{x^2}$ — le signe moins n'est pas une faute de frappe.",
    tags: ["stmg", "maths", "fonctions", "inverse", "derivation", "template"],
    generate: () => {
      const k = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15, 18, 20, 24, 25, 30] as const);
      return {
        text: `Soit $f(x) = \\dfrac{${k}}{x}$ sur $]0\\,;\\,+\\infty[$. Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$-\\dfrac{${k}}{x^2}$`, [
          `$\\dfrac{${k}}{x^2}$`,
          `$-\\dfrac{1}{${k}x^2}$`,
          `$-\\dfrac{${k}}{x}$`,
          `$\\dfrac{${k}}{2x}$`,
          `$-${k}x$`,
        ]),
        expected: [`$-\\dfrac{${k}}{x^2}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de la fonction inverse est $\\left(\\dfrac{1}{x}\\right)' = -\\dfrac{1}{x^2}$ ; multiplier la fonction par un réel multiplie sa dérivée par ce même réel.",
          "On dérive $\\dfrac{1}{x}$, puis on multiplie par le coefficient.",
          `$f(x) = ${k} \\times \\dfrac{1}{x}$, donc $f'(x) = ${k} \\times \\left(-\\dfrac{1}{x^2}\\right) = -\\dfrac{${k}}{x^2}$.`,
          `$f'(x) = -\\dfrac{${k}}{x^2}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$\\dfrac{${k}}{x^2}$`,
            cause: "a oublié le signe moins de la dérivée de l'inverse",
          },
        ],
      };
    },
  },

  /* ═══════════════ fctT_inverse_variations ═══════════════ */

  {
    kind: "template",
    id: "stmg_inv_variations_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse_derivee",
    microId: "fctT_inverse_variations",
    difficulty: 2,
    theme: "neutral",
    hint: "$x^2$ est toujours positif : tout se joue sur le signe du numérateur.",
    tags: ["stmg", "maths", "fonctions", "inverse", "derivation", "template"],
    generate: () => {
      // ⚠️ Le numérateur prend les DEUX signes. Avec un k toujours positif, la
      // réponse était invariablement « décroissante » : l'élève retenait le mot
      // sans refaire le raisonnement. C'est le vrai défaut qu'a révélé la
      // mesure des questions RÉELLEMENT distinctes — pas le nombre d'énoncés.
      const k = pick([2, 3, 4, 5, 6, 8, 9, 10, 12, 15, -2, -3, -4, -5, -6, -8, -9, -12] as const);
      const intervalle = pick(["]0 ; +∞[", "]−∞ ; 0["] as const);
      const decroit = k > 0;
      return {
        text:
          `Soit $f(x) = \\dfrac{${k}}{x}$. Quel est le sens de variation de $f$ sur ` +
          (intervalle === "]0 ; +∞[" ? "$]0\\,;\\,+\\infty[$" : "$]-\\infty\\,;\\,0[$") +
          " ?",
        format: "qcm",
        choices: shuffle([
          "décroissante",
          "croissante",
          "constante",
          "croissante puis décroissante",
        ]),
        expected: [decroit ? "décroissante" : "croissante"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le sens de variation se lit sur le signe de la dérivée : $f'(x) = -\\dfrac{k}{x^2}$.",
          "On observe que $x^2$ est strictement positif partout où $f$ est définie : le signe de la dérivée est donc l'OPPOSÉ de celui de $k$, sur chacun des deux intervalles.",
          `Ici $k = ${k}$, donc $f'(x) = ${decroit ? "-" : "+"}\\dfrac{${Math.abs(k)}}{x^2}$, ` +
            `strictement ${decroit ? "négative" : "positive"} pour tout $x \\neq 0$.`,
          `$f$ est ${decroit ? "décroissante" : "croissante"} sur cet intervalle.`
        ),
        choiceDiagnostics: [
          {
            choice: decroit ? "croissante" : "décroissante",
            cause: "a appliqué le sens de variation de 1/x sans regarder le signe du numérateur",
          },
        ],
      };
    },
  },

  /* ═══════════════ fctT_inverse_combinaison ═══════════════ */

  {
    kind: "template",
    id: "stmg_inv_combinaison_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse_derivee",
    microId: "fctT_inverse_combinaison",
    difficulty: 3,
    theme: "neutral",
    hint: "On dérive terme à terme : la partie polynomiale d'un côté, la partie inverse de l'autre.",
    tags: ["stmg", "maths", "fonctions", "inverse", "derivation", "template"],
    generate: () => {
      const a = pick([2, 3, 4, 5, 6, 8, 10] as const);
      const b = pick([50, 100, 200, 400, 600, 800] as const);
      return {
        text:
          `Le coût moyen de production s'écrit $f(x) = ${a} + \\dfrac{${b}}{x}$ pour $x > 0$. ` +
          `Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$-\\dfrac{${b}}{x^2}$`, [
          `$${a} - \\dfrac{${b}}{x^2}$`,
          `$\\dfrac{${b}}{x^2}$`,
          `$-\\dfrac{${b}}{x}$`,
          `$${a} + \\dfrac{${b}}{x^2}$`,
          `$-\\dfrac{${a}}{x^2}$`,
        ]),
        expected: [`$-\\dfrac{${b}}{x^2}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une combinaison linéaire de la fonction inverse et d'un polynôme se dérive terme à terme : la dérivée d'une constante est nulle, celle de $\\dfrac{b}{x}$ vaut $-\\dfrac{b}{x^2}$.",
          "On dérive chaque morceau séparément, puis on additionne.",
          `$(${a})' = 0$ et $\\left(\\dfrac{${b}}{x}\\right)' = -\\dfrac{${b}}{x^2}$, donc $f'(x) = -\\dfrac{${b}}{x^2}$.`,
          `$f'(x) = -\\dfrac{${b}}{x^2}$, strictement négative : le coût moyen décroît toujours, en se rapprochant de $${a}$ €.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${a} - \\dfrac{${b}}{x^2}$`,
            cause: "a gardé la constante : la dérivée d'une constante est nulle",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "stmg_inv_combinaison_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_inverse_derivee",
    microId: "fctT_inverse_combinaison",
    difficulty: 3,
    theme: "neutral",
    hint: "Ici la dérivée s'annule : $a - \\dfrac{b}{x^2} = 0$ équivaut à $x^2 = \\dfrac{b}{a}$.",
    tags: ["stmg", "maths", "fonctions", "inverse", "derivation", "optimisation", "canvas", "template", "short"],
    generate: () => {
      // On choisit d'abord l'optimum : $x_0 = \sqrt{b/a}$ est alors entier.
      const a = pick([1, 2, 3, 4] as const);
      const x0 = pick([5, 10, 15, 20, 25, 30] as const);
      const b = a * x0 * x0;
      const f = (x: number) => a * x + b / x;
      return {
        text:
          `Le coût total de gestion d'un stock s'écrit $f(x) = ${a}x + \\dfrac{${b}}{x}$ pour $x > 0$, ` +
          `où $x$ est la taille d'une commande. Pour quelle valeur de $x$ ce coût est-il minimal ?`,
        format: "short",
        expected: [String(x0)],
        comparator: "number_equal",
        canvas: canvasCourbePoints(f, Math.max(1, x0 / 5), x0 * 3, "Coût total en fonction de la taille de commande", {
          pas: x0 / 20,
          plafond: f(Math.max(1, x0 / 5)) * 1.05,
          marques: [x0],
        }),
        explanation: exp(
          "Un extremum d'une fonction dérivable s'obtient là où la dérivée s'annule en changeant de signe.",
          "On dérive la combinaison linéaire terme à terme, on annule, puis on résout — l'équation obtenue est du type $x^2 = c$, au programme.",
          `$f'(x) = ${a} - \\dfrac{${b}}{x^2}$. On résout $${a} - \\dfrac{${b}}{x^2} = 0$, soit $x^2 = \\dfrac{${b}}{${a}} = ${b / a}$, ` +
            `donc $x = ${x0}$ (la solution négative est écartée : une taille de commande est positive). ` +
            `Le coût minimal vaut alors $${fr(f(x0))}$.`,
          `Le coût est minimal pour une taille de commande de $${x0}$.`
        ),
      };
    },
  },
];
