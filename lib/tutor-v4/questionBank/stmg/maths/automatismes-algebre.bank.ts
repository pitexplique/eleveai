// lib/tutor-v4/questionBank/stmg/maths/automatismes-algebre.bank.ts
//
// Notions : auto_developper_factoriser, auto_equations, auto_signes,
//           auto_formules
//           (domaine STMGAU — rubrique « Calcul numérique et algébrique »)
//
// ⚠️ RÈGLE TENUE PARTOUT DANS CE FICHIER : une expression algébrique se demande
// en QCM, jamais en saisie libre. « 3x^2+2x-5 » et « -5+2x+3x² » sont la même
// réponse pour un élève et deux chaînes pour la machine. Seules les VALEURS
// numériques (une solution, un signe, un résultat d'application de formule)
// passent en `short`.
//
// ⛔ Le discriminant n'est pas au programme : les racines d'un polynôme de
// degré 2 s'obtiennent par la forme factorisée, ou sont évidentes. Aucun item
// de ce fichier ne demande de résoudre $ax^2+bx+c=0$ autrement.
//
// La rubrique « signe » est celle qui décide de tout le reste du programme :
// le signe de la dérivée donne les variations, et le signe d'un bénéfice donne
// le seuil de rentabilité. D'où le tableau de signes rendu VISIBLE
// (`tableau_donnees`) et la parabole tracée sous le signe d'une expression
// factorisée — le BO demande explicitement de s'appuyer sur « une image
// mentale de la courbe représentative de la fonction correspondante ».

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

/** Terme signé : rend « + 3x », « - x », ou rien si le coefficient est nul. */
function terme(coef: number, partie: string, premier = false): string {
  if (coef === 0) return "";
  const signe = coef < 0 ? "-" : premier ? "" : "+";
  const abs = Math.abs(coef);
  const nombre = abs === 1 && partie !== "" ? "" : String(abs);
  const espace = premier && coef > 0 ? "" : " ";
  return `${signe}${espace}${nombre}${partie}`.trim() === ""
    ? ""
    : `${signe}${premier && coef > 0 ? "" : " "}${nombre}${partie}`;
}

/** Trinôme $ax^2 + bx + c$ en LaTeX, termes nuls omis. */
function trinome(a: number, b: number, c: number): string {
  const morceaux = [terme(a, "x^2", true), terme(b, "x"), terme(c, "")].filter((m) => m !== "");
  return morceaux.length === 0 ? "0" : morceaux.join(" ").replace(/\s+/g, " ").trim();
}

/** Binôme du premier degré $ax + b$. */
function binome(a: number, b: number): string {
  const morceaux = [terme(a, "x", true), terme(b, "")].filter((m) => m !== "");
  return morceaux.length === 0 ? "0" : morceaux.join(" ").replace(/\s+/g, " ").trim();
}

/** Facteur $(x - r)$ écrit proprement selon le signe de la racine. */
function facteur(r: number): string {
  if (r === 0) return "x";
  return r > 0 ? `(x - ${r})` : `(x + ${-r})`;
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

const FORMULES = [
  {
    nom: "le bénéfice",
    litteral: "B = R - C",
    variables: ["R", "C"],
    calcule: (r: number, c: number) => r - c,
    legende: "recette $R$ et coût $C$, en euros",
  },
  {
    nom: "le prix TTC",
    litteral: "P_{TTC} = P_{HT} \\times (1 + t)",
    variables: ["P_{HT}", "t"],
    calcule: (p: number, t: number) => p * (1 + t / 100),
    legende: "prix hors taxes $P_{HT}$ en euros et taux $t$ en pourcentage",
  },
] as const;

export const automatismesAlgebreBank: TutorBankItemV4[] = [
  /* ═══════════════════ auto_alg_developper ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_developper_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_developper",
    difficulty: 1,
    theme: "neutral",
    hint: "Chaque terme de la première parenthèse multiplie chaque terme de la seconde.",
    tags: ["stmg", "maths", "algebre", "template"],
    generate: () => {
      const a = randomInt(1, 5);
      const b = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      const c = randomInt(1, 5);
      const d = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      const A = a * c;
      const B = a * d + b * c;
      const C = b * d;
      return {
        text: `Développe et réduis : $(${binome(a, b)})(${binome(c, d)})$`,
        format: "qcm",
        choices: makeChoices(`$${trinome(A, B, C)}$`, [
          `$${trinome(A, a * d - b * c, C)}$`,
          `$${trinome(A, b * d, C)}$`,
          `$${trinome(a + c, B, b + d)}$`,
          `$${trinome(A, B, -C)}$`,
          `$${trinome(A, a * d, C)}$`,
          `$${trinome(A, b * c, C)}$`,
        ]),
        expected: [`$${trinome(A, B, C)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Développer un produit de deux binômes : chaque terme du premier multiplie chaque terme du second.",
          "On écrit les quatre produits, puis on regroupe les termes en $x$.",
          `$${a}x \\times ${c}x = ${A}x^2$ ; $${a}x \\times (${d}) = ${a * d}x$ ; ` +
            `$(${b}) \\times ${c}x = ${b * c}x$ ; $(${b}) \\times (${d}) = ${C}$. ` +
            `En regroupant : $${trinome(A, B, C)}$.`,
          `Le résultat développé est $${trinome(A, B, C)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${trinome(A, b * d, C)}$`,
            cause: "n'a gardé qu'un des deux produits croisés",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_alg_identites ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_identites_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_identites",
    difficulty: 2,
    theme: "neutral",
    hint: "$(a+b)^2 = a^2 + 2ab + b^2$ — le double produit ne s'oublie pas.",
    tags: ["stmg", "maths", "algebre", "identites", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(1, 9);
      const signe = pick([1, -1] as const);
      const A = a * a;
      const B = 2 * a * b * signe;
      const C = b * b;
      return {
        text: `Développe : $(${binome(a, signe * b)})^2$`,
        format: "qcm",
        choices: makeChoices(`$${trinome(A, B, C)}$`, [
          `$${trinome(A, 0, C)}$`,
          `$${trinome(A, B, -C)}$`,
          `$${trinome(A, B / 2, C)}$`,
          `$${trinome(A, -B, C)}$`,
          `$${trinome(a, B, b)}$`,
          `$${trinome(A, 2 * b * signe, C)}$`,
        ]),
        expected: [`$${trinome(A, B, C)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "$(u + v)^2 = u^2 + 2uv + v^2$.",
          "On identifie $u$ et $v$, puis on écrit les trois termes sans oublier le double produit.",
          `Avec $u = ${a}x$ et $v = ${signe * b}$ : $u^2 = ${A}x^2$, $2uv = ${B}x$, $v^2 = ${C}$.`,
          `Le développement est $${trinome(A, B, C)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${trinome(A, 0, C)}$`,
            cause: "a oublié le double produit — l'erreur la plus fréquente sur cette identité",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_factoriser_commun ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_facteur_commun_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_commun",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce qui est présent dans TOUS les termes, nombre comme lettre.",
    tags: ["stmg", "maths", "algebre", "factorisation", "template"],
    generate: () => {
      const k = pick([2, 3, 4, 5, 6] as const);
      const a = randomInt(1, 5);
      const b = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6] as const);
      return {
        text: `Factorise : $${trinome(k * a, k * b, 0)}$`,
        format: "qcm",
        choices: makeChoices(`$${k}x(${binome(a, b)})$`, [
          `$x(${binome(k * a, k * b)})$`,
          `$${k}(${binome(a, b)})$`,
          `$${k}x(${binome(a, b * k)})$`,
          `$${k}x^2(${binome(a, b)})$`,
          `$${k * a}x(${binome(1, b)})$`,
        ]),
        expected: [`$${k}x(${binome(a, b)})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Factoriser, c'est mettre en évidence un facteur présent dans tous les termes.",
          "On cherche le plus grand facteur commun aux coefficients, et la plus petite puissance de $x$ présente partout.",
          `$${trinome(k * a, k * b, 0)} = ${k}x \\times ${a}x + ${k}x \\times (${b}) = ${k}x(${binome(a, b)})$.`,
          `La forme factorisée est $${k}x(${binome(a, b)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${k}(${binome(a, b)})$`,
            cause: "a sorti le nombre mais oublié le $x$ commun",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_factoriser_identite ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_facteur_identite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_developper_factoriser",
    microId: "auto_alg_factoriser_identite",
    difficulty: 3,
    theme: "neutral",
    hint: "Une différence de deux carrés : $u^2 - v^2 = (u - v)(u + v)$.",
    tags: ["stmg", "maths", "algebre", "factorisation", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, 5] as const);
      const b = pick([1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const);
      const A = a * a;
      const C = b * b;
      return {
        text: `Factorise : $${trinome(A, 0, -C)}$`,
        format: "qcm",
        choices: makeChoices(`$(${binome(a, -b)})(${binome(a, b)})$`, [
          `$(${binome(a, -b)})^2$`,
          `$(${binome(a, b)})^2$`,
          `$(${binome(A, -C)})(${binome(A, C)})$`,
          `$(${binome(a, -C)})(${binome(a, C)})$`,
          `$${a}x(${binome(a, -C)})$`,
        ]),
        expected: [`$(${binome(a, -b)})(${binome(a, b)})$`],
        comparator: "mcq_exact",
        explanation: exp(
          "$u^2 - v^2 = (u - v)(u + v)$ : c'est la seule identité qui factorise une différence.",
          "On reconnaît les deux carrés, on identifie $u$ et $v$, puis on écrit le produit.",
          `$${A}x^2 = (${a}x)^2$ et $${C} = ${b}^2$, donc $u = ${a}x$ et $v = ${b}$, ` +
            `d'où $(${binome(a, -b)})(${binome(a, b)})$.`,
          `La forme factorisée est $(${binome(a, -b)})(${binome(a, b)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${binome(a, -b)})^2$`,
            cause: "a utilisé l'identité du carré alors qu'il s'agit d'une différence de carrés",
          },
        ],
      };
    },
  },

  /* ═══════════ auto_alg_equation_premier_degre ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_equation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_premier_degre",
    difficulty: 2,
    theme: "neutral",
    hint: "On rassemble les $x$ d'un côté et les nombres de l'autre.",
    tags: ["stmg", "maths", "algebre", "equations", "template", "short"],
    generate: () => {
      // On choisit la solution d'abord : elle est ainsi toujours entière.
      const x = pick([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8] as const);
      const a = randomInt(2, 7);
      const c = pick([1, 2, 3, 4, 5] as const).valueOf();
      const aa = a + c; // coefficient de gauche, strictement plus grand
      const b = randomInt(-9, 9);
      const d = (aa - c) * x + b;
      return {
        text: `Résous l'équation : $${binome(aa, b)} = ${binome(c, d)}$`,
        format: "short",
        expected: [fr(x)],
        comparator: "number_equal",
        explanation: exp(
          "Résoudre une équation du premier degré, c'est isoler l'inconnue par opérations successives.",
          "On rassemble les termes en $x$ d'un côté, les constantes de l'autre, puis on divise par le coefficient de $x$.",
          `$${binome(aa, b)} = ${binome(c, d)}$ donne $${aa - c}x = ${d - b}$, donc $x = \\dfrac{${d - b}}{${aa - c}} = ${fr(x)}$.`,
          `La solution est $x = ${fr(x)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ auto_alg_inequation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_inequation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "Diviser par un nombre NÉGATIF renverse le sens de l'inégalité.",
    tags: ["stmg", "maths", "algebre", "inequations", "template"],
    generate: () => {
      const x = randomInt(-6, 8);
      const a = pick([-5, -4, -3, -2, 2, 3, 4, 5] as const);
      const b = randomInt(-9, 9);
      const c = a * x + b;
      const negatif = a < 0;
      // « ax + b ≥ c » : la solution est x ≤ … si a < 0, x ≥ … sinon.
      const bonne = negatif ? `$x \\leqslant ${x}$` : `$x \\geqslant ${x}$`;
      const piege = negatif ? `$x \\geqslant ${x}$` : `$x \\leqslant ${x}$`;
      return {
        text: `Résous l'inéquation : $${binome(a, b)} \\geqslant ${c}$`,
        format: "qcm",
        choices: makeChoices(bonne, [
          piege,
          `$x \\geqslant ${-x}$`,
          `$x \\leqslant ${-x}$`,
          `$x \\geqslant ${x + 1}$`,
          `$x \\leqslant ${x - 1}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une inéquation se résout comme une équation, à une règle près : multiplier ou diviser par un nombre négatif RENVERSE le sens de l'inégalité.",
          "On isole le terme en $x$, puis on divise par son coefficient en surveillant son signe.",
          `$${binome(a, b)} \\geqslant ${c}$ donne $${a}x \\geqslant ${c - b}$. ` +
            `Le coefficient $${a}$ est ${negatif ? "NÉGATIF : on divise et l'on renverse le sens" : "positif : le sens est conservé"}, ` +
            `d'où ${bonne}.`,
          `L'ensemble des solutions est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: piege,
            cause: negatif
              ? "a divisé par un nombre négatif sans renverser le sens de l'inégalité"
              : "a renversé le sens de l'inégalité alors que le coefficient est positif",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_alg_equation_carre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_carre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une équation $x^2 = a$ avec $a > 0$ a DEUX solutions opposées.",
    tags: ["stmg", "maths", "algebre", "equations", "piege", "template"],
    generate: () => {
      const r = randomInt(2, 12);
      const carre = r * r;
      return {
        text: `Résous l'équation : $x^2 = ${carre}$`,
        format: "qcm",
        choices: makeChoices(`$x = ${r}$ ou $x = -${r}$`, [
          `$x = ${r}$`,
          `$x = ${carre / 2}$`,
          `$x = -${r}$`,
          `$x = ${carre}$ ou $x = -${carre}$`,
          `pas de solution`,
        ]),
        expected: [`$x = ${r}$ ou $x = -${r}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $a > 0$, l'équation $x^2 = a$ admet exactement deux solutions : $\\sqrt{a}$ et $-\\sqrt{a}$.",
          "On cherche les nombres dont le carré vaut $a$, sans oublier le négatif.",
          `$${r}^2 = ${carre}$ et $(-${r})^2 = ${carre}$.`,
          `Les solutions sont $${r}$ et $-${r}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = ${r}$`,
            cause: "a oublié la solution négative",
          },
          {
            choice: `$x = ${carre / 2}$`,
            cause: "a divisé par 2 au lieu de chercher une racine carrée",
          },
        ],
      };
    },
  },

  {
    kind: "fixed",
    id: "stmg_alg_carre_fix_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_equation_carre",
    difficulty: 3,
    theme: "neutral",
    hint: "Un carré est toujours positif ou nul.",
    tags: ["stmg", "maths", "algebre", "equations", "piege", "fixed"],
    text: "Combien l'équation $x^2 = -9$ admet-elle de solutions ?",
    format: "qcm",
    choices: ["aucune", "une seule : $x = -3$", "deux : $x = 3$ et $x = -3$", "une seule : $x = 3$"],
    expected: ["aucune"],
    comparator: "mcq_exact",
    explanation: exp(
      "Le carré d'un nombre réel est toujours positif ou nul.",
      "On compare le second membre à zéro avant de chercher une racine.",
      "Aucun réel élevé au carré ne peut donner $-9$ : $3^2 = 9$ et $(-3)^2 = 9$, jamais $-9$.",
      "L'équation $x^2 = -9$ n'a aucune solution réelle."
    ),
    choiceDiagnostics: [
      {
        choice: "une seule : $x = -3$",
        cause: "a transporté le signe moins dans la solution, alors qu'il empêche toute solution",
      },
    ],
  },

  /* ═══════════════════ auto_alg_produit_nul ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_produit_nul_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_equations",
    microId: "auto_alg_produit_nul",
    difficulty: 2,
    theme: "neutral",
    hint: "Un produit est nul si, et seulement si, l'un au moins de ses facteurs est nul.",
    tags: ["stmg", "maths", "algebre", "equations", "template"],
    generate: () => {
      const r1 = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      let r2 = pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6] as const).valueOf();
      if (r2 === r1) r2 = r1 + 1;
      const petite = Math.min(r1, r2);
      const grande = Math.max(r1, r2);
      return {
        text: `Résous l'équation : $${facteur(r1)}${facteur(r2)} = 0$`,
        format: "qcm",
        choices: makeChoices(`$x = ${petite}$ ou $x = ${grande}$`, [
          `$x = ${-petite}$ ou $x = ${-grande}$`,
          `$x = ${petite * grande}$`,
          `$x = ${petite + grande}$`,
          `$x = ${petite}$ seulement`,
          `pas de solution`,
        ]),
        expected: [`$x = ${petite}$ ou $x = ${grande}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit de facteurs est nul si, et seulement si, l'un au moins des facteurs est nul.",
          "On annule chaque facteur séparément.",
          `$${facteur(r1)} = 0$ donne $x = ${r1}$ ; $${facteur(r2)} = 0$ donne $x = ${r2}$.`,
          `Les solutions sont $${petite}$ et $${grande}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = ${-petite}$ ou $x = ${-grande}$`,
            cause: "a lu la racine directement dans la parenthèse sans changer le signe",
          },
        ],
      };
    },
  },

  /* ═══════════ auto_alg_signe_premier_degre ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_signe_premier_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_signe_premier_degre",
    difficulty: 2,
    theme: "neutral",
    hint: "Une expression du premier degré s'annule une fois et change de signe à cet endroit.",
    tags: ["stmg", "maths", "algebre", "signes", "template"],
    generate: () => {
      const racine = randomInt(-5, 6);
      const a = pick([1, 2, 3, 4, -1, -2, -3, -4] as const);
      const b = -a * racine;
      const positifApres = a > 0;
      const bonne = positifApres
        ? `positive sur $]${racine}\\,;\\,+\\infty[$`
        : `positive sur $]-\\infty\\,;\\,${racine}[$`;
      return {
        text: `Étudie le signe de $${binome(a, b)}$. Cette expression est :`,
        format: "qcm",
        choices: makeChoices(bonne, [
          positifApres ? `positive sur $]-\\infty\\,;\\,${racine}[$` : `positive sur $]${racine}\\,;\\,+\\infty[$`,
          "positive sur $\\mathbb{R}$",
          "négative sur $\\mathbb{R}$",
          `positive sur $]0\\,;\\,+\\infty[$`,
          `positive sur $]${racine + 1}\\,;\\,+\\infty[$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une expression $ax + b$ s'annule en $x = -\\dfrac{b}{a}$ et change de signe en ce point : elle est du signe de $a$ après cette valeur.",
          "On cherche la racine, puis on regarde le signe du coefficient de $x$.",
          `$${binome(a, b)} = 0$ pour $x = ${racine}$. Le coefficient $${a}$ est ${a > 0 ? "positif" : "négatif"}, ` +
            `donc l'expression est ${a > 0 ? "négative avant, positive après" : "positive avant, négative après"}.`,
          `Elle est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: positifApres ? `positive sur $]-\\infty\\,;\\,${racine}[$` : `positive sur $]${racine}\\,;\\,+\\infty[$`,
            cause: "n'a pas tenu compte du signe du coefficient de $x$",
          },
        ],
      };
    },
  },

  /* ═══════════ auto_alg_signe_factorisee ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_signe_factorisee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_signe_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Pense à l'allure de la parabole : entre les racines, elle est du signe contraire à $a$.",
    tags: ["stmg", "maths", "algebre", "signes", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 1);
      const r2 = r1 + randomInt(2, 5);
      const a = pick([1, 2, -1, -2] as const);
      const bonne =
        a > 0
          ? `négative entre $${r1}$ et $${r2}$, positive ailleurs`
          : `positive entre $${r1}$ et $${r2}$, négative ailleurs`;
      // Forme développée, pour tracer la parabole : a(x-r1)(x-r2).
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const yBornes = [a * (-6 - r1) * (-6 - r2), a * (6 - r1) * (6 - r2)];
      const ymax = Math.max(...yBornes, 2);
      const ymin = Math.min(...yBornes, a * ((r1 + r2) / 2 - r1) * ((r1 + r2) / 2 - r2), -2);
      return {
        text: `La courbe tracée représente $f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}${facteur(r1)}${facteur(r2)}$. Cette expression est :`,
        format: "qcm",
        choices: makeChoices(bonne, [
          a > 0
            ? `positive entre $${r1}$ et $${r2}$, négative ailleurs`
            : `négative entre $${r1}$ et $${r2}$, positive ailleurs`,
          "positive sur $\\mathbb{R}$",
          "négative sur $\\mathbb{R}$",
          `négative entre $${r1 - 1}$ et $${r2}$, positive ailleurs`,
          `positive entre $${r1}$ et $${r2 + 1}$, négative ailleurs`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: "Courbe représentative de f",
          xmin: -6,
          xmax: 6,
          ymin: Math.floor(ymin) - 2,
          ymax: Math.ceil(ymax) + 2,
          grille: true,
          courbes: [{ id: "p", type: "quadratique", a, b: B, c: C }],
          misesEnEvidence: [{ horizontale: { y: 0 } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une expression factorisée du second degré s'annule en ses deux racines et change de signe à chacune.",
          "Le BO demande de s'appuyer sur l'image mentale de la parabole : entre les racines, elle est du signe contraire à celui de $a$ ; à l'extérieur, du signe de $a$.",
          `Les racines sont $${r1}$ et $${r2}$, et $a = ${a}$ est ${a > 0 ? "positif : la parabole est tournée vers le haut, donc en dessous de l'axe entre les racines" : "négatif : la parabole est tournée vers le bas, donc au-dessus de l'axe entre les racines"}.`,
          `L'expression est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice:
              a > 0
                ? `positive entre $${r1}$ et $${r2}$, négative ailleurs`
                : `négative entre $${r1}$ et $${r2}$, positive ailleurs`,
            cause: "a inversé le signe : c'est celui de $a$ qui vaut À L'EXTÉRIEUR des racines",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_tableau_signes ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_tableau_signes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_signes",
    microId: "auto_alg_tableau_signes",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe du produit est le produit des signes : deux moins font un plus.",
    tags: ["stmg", "maths", "algebre", "signes", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 1);
      const r2 = r1 + randomInt(2, 5);
      const zone = pick(["avant", "entre", "apres"] as const);
      const signeAttendu = zone === "entre" ? "négatif" : "positif";
      const intervalle =
        zone === "avant"
          ? `$]-\\infty\\,;\\,${r1}[$`
          : zone === "entre"
            ? `$]${r1}\\,;\\,${r2}[$`
            : `$]${r2}\\,;\\,+\\infty[$`;
      return {
        text:
          `Le tableau donne les signes des deux facteurs de $P(x) = ${facteur(r1)}${facteur(r2)}$. ` +
          `Quel est le signe de $P(x)$ sur ${intervalle} ?`,
        format: "qcm",
        choices: shuffle(["positif", "négatif", "nul", "on ne peut pas conclure"]),
        expected: [signeAttendu],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: `Tableau de signes de P(x) = ${facteur(r1)}${facteur(r2)}`,
          caption: "Signe de chaque facteur sur les trois intervalles",
          headers: ["x", `]-∞ ; ${r1}[`, `]${r1} ; ${r2}[`, `]${r2} ; +∞[`],
          rows: [
            { label: `x ${r1 >= 0 ? "-" : "+"} ${Math.abs(r1)}`, values: ["−", "+", "+"] },
            { label: `x ${r2 >= 0 ? "-" : "+"} ${Math.abs(r2)}`, values: ["−", "−", "+"] },
            { label: "P(x)", values: ["?", "?", "?"] },
          ],
          highlight: { col: zone === "avant" ? 1 : zone === "entre" ? 2 : 3 },
        } satisfies CanvasFigure,
        explanation: exp(
          "Dans un tableau de signes, la ligne du produit s'obtient en multipliant les signes de chaque colonne.",
          "On lit la colonne demandée et l'on applique la règle des signes.",
          zone === "avant"
            ? `Sur $]-\\infty\\,;\\,${r1}[$, les deux facteurs sont négatifs : $(-) \\times (-) = (+)$.`
            : zone === "entre"
              ? `Sur $]${r1}\\,;\\,${r2}[$, le premier facteur est positif et le second négatif : $(+) \\times (-) = (-)$.`
              : `Sur $]${r2}\\,;\\,+\\infty[$, les deux facteurs sont positifs : $(+) \\times (+) = (+)$.`,
          `Sur ${intervalle}, $P(x)$ est ${signeAttendu}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas conclure",
            cause: "n'a pas vu que la règle des signes suffit à remplir la dernière ligne",
          },
        ],
      };
    },
  },

  /* ═══════════════════ auto_alg_litteral ═══════════════════ */

  {
    kind: "template",
    id: "stmg_alg_litteral_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_litteral",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe moins devant une parenthèse change le signe de TOUS les termes qu'elle contient.",
    tags: ["stmg", "maths", "algebre", "template"],
    generate: () => {
      const a = randomInt(1, 6);
      const b = pick([-8, -6, -5, -3, -2, 2, 3, 5, 6, 8] as const);
      const c = randomInt(1, 6);
      const d = pick([-9, -7, -4, -1, 1, 4, 7, 9] as const);
      const A = a - c;
      const B = b - d;
      return {
        text: `Réduis l'expression : $(${binome(a, b)}) - (${binome(c, d)})$`,
        format: "qcm",
        choices: makeChoices(`$${binome(A, B)}$`, [
          `$${binome(a + c, b + d)}$`,
          `$${binome(A, b + d)}$`,
          `$${binome(a + c, B)}$`,
          `$${binome(-A, -B)}$`,
          `$${binome(A, B + 1)}$`,
        ]),
        expected: [`$${binome(A, B)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un signe moins devant une parenthèse change le signe de chacun des termes de cette parenthèse.",
          "On distribue le moins, puis on regroupe les termes semblables.",
          `$(${binome(a, b)}) - (${binome(c, d)}) = ${binome(a, b)} ${-c >= 0 ? "+" : "-"} ${Math.abs(c)}x ${-d >= 0 ? "+" : "-"} ${Math.abs(d)} = ${binome(A, B)}$.`,
          `L'expression réduite est $${binome(A, B)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${binome(A, b + d)}$`,
            cause: "n'a changé le signe que du premier terme de la parenthèse",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_alg_isoler_variable ═══════════════ */

  {
    kind: "template",
    id: "stmg_alg_isoler_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_isoler_variable",
    difficulty: 3,
    theme: "neutral",
    hint: "On traite les autres lettres comme des nombres et on isole celle qui est demandée.",
    tags: ["stmg", "maths", "algebre", "formules", "template"],
    generate: () => {
      const cas = pick([
        { formule: "B = R - C", isoler: "R", bonne: "R = B + C", faux: ["R = B - C", "R = C - B", "R = BC"] },
        { formule: "B = R - C", isoler: "C", bonne: "C = R - B", faux: ["C = B - R", "C = B + R", "C = \\dfrac{R}{B}"] },
        { formule: "CA = p \\times q", isoler: "p", bonne: "p = \\dfrac{CA}{q}", faux: ["p = CA \\times q", "p = \\dfrac{q}{CA}", "p = CA - q"] },
        { formule: "CA = p \\times q", isoler: "q", bonne: "q = \\dfrac{CA}{p}", faux: ["q = CA \\times p", "q = \\dfrac{p}{CA}", "q = CA - p"] },
        { formule: "M = V - A", isoler: "V", bonne: "V = M + A", faux: ["V = M - A", "V = A - M", "V = MA"] },
        { formule: "P = 2(L + l)", isoler: "L", bonne: "L = \\dfrac{P}{2} - l", faux: ["L = P - 2l", "L = \\dfrac{P - l}{2}", "L = 2P - l"] },
        { formule: "d = v \\times t", isoler: "t", bonne: "t = \\dfrac{d}{v}", faux: ["t = d \\times v", "t = \\dfrac{v}{d}", "t = d - v"] },
        { formule: "T = \\dfrac{A}{B}", isoler: "A", bonne: "A = T \\times B", faux: ["A = \\dfrac{T}{B}", "A = \\dfrac{B}{T}", "A = T + B"] },
        { formule: "T = \\dfrac{A}{B}", isoler: "B", bonne: "B = \\dfrac{A}{T}", faux: ["B = A \\times T", "B = \\dfrac{T}{A}", "B = A - T"] },
        { formule: "CA = p \\times q", isoler: "q", bonne: "q = \\dfrac{CA}{p}", faux: ["q = CA \\times p", "q = \\dfrac{p}{CA}", "q = CA + p"] },
        { formule: "M = V - A", isoler: "A", bonne: "A = V - M", faux: ["A = M - V", "A = M + V", "A = \\dfrac{V}{M}"] },
        { formule: "P = 2(L + l)", isoler: "l", bonne: "l = \\dfrac{P}{2} - L", faux: ["l = P - 2L", "l = \\dfrac{P - L}{2}", "l = 2P - L"] },
        { formule: "d = v \\times t", isoler: "v", bonne: "v = \\dfrac{d}{t}", faux: ["v = d \\times t", "v = \\dfrac{t}{d}", "v = d - t"] },
        { formule: "C = f + u \\times x", isoler: "x", bonne: "x = \\dfrac{C - f}{u}", faux: ["x = \\dfrac{C}{u} - f", "x = C - f - u", "x = \\dfrac{C - u}{f}"] },
        { formule: "C = f + u \\times x", isoler: "f", bonne: "f = C - u \\times x", faux: ["f = \\dfrac{C}{u \\times x}", "f = C + u \\times x", "f = \\dfrac{C - x}{u}"] },
      ] as const);
      return {
        text: `Dans la formule $${cas.formule}$, exprime $${cas.isoler}$ en fonction des autres grandeurs.`,
        format: "qcm",
        choices: makeChoices(`$${cas.bonne}$`, cas.faux.map((f) => `$${f}$`)),
        expected: [`$${cas.bonne}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Isoler une lettre dans une égalité, c'est appliquer les mêmes opérations aux deux membres jusqu'à ce qu'elle soit seule.",
          "On traite les autres lettres comme des nombres, et l'on défait les opérations dans l'ordre inverse.",
          `De $${cas.formule}$, on obtient $${cas.bonne}$.`,
          `On a $${cas.bonne}$.`
        ),
      };
    },
  },

  /* ═══════════ auto_alg_application_formule ═══════════ */

  {
    kind: "template",
    id: "stmg_alg_application_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "auto_formules",
    microId: "auto_alg_application_formule",
    difficulty: 2,
    theme: "neutral",
    hint: "On remplace chaque lettre par sa valeur, PUIS on calcule.",
    tags: ["stmg", "maths", "algebre", "formules", "template", "short"],
    generate: () => {
      const f = pick(FORMULES);
      if (f.nom === "le bénéfice") {
        const r = pick([1200, 1500, 2000, 2400, 3000, 3600] as const);
        const c = pick([800, 900, 1100, 1400, 1800, 2200] as const);
        return {
          text:
            `${f.nom.charAt(0).toUpperCase()}${f.nom.slice(1)} d'un mois se calcule par $${f.litteral}$ (${f.legende}). ` +
            `Calcule $B$ pour $R = ${r}$ et $C = ${c}$.`,
          format: "short",
          expected: [fr(r - c)],
          comparator: "number_equal",
          explanation: exp(
            "Une application numérique consiste à remplacer chaque lettre de la formule par la valeur donnée.",
            "On substitue, puis on effectue le calcul dans l'ordre des priorités.",
            `$B = ${r} - ${c} = ${fr(r - c)}$.`,
            `Le bénéfice est de $${fr(r - c)}$ €.`
          ),
        };
      }
      const p = pick([50, 80, 120, 200, 250, 400] as const);
      const t = pick([5.5, 10, 20] as const);
      return {
        text:
          `Le prix TTC se calcule par $P_{TTC} = P_{HT} \\times \\left(1 + \\dfrac{t}{100}\\right)$ (${f.legende}). ` +
          `Calcule $P_{TTC}$ pour $P_{HT} = ${p}$ et $t = ${fr(t)}$.`,
        format: "short",
        expected: [fr(Math.round(p * (1 + t / 100) * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Une application numérique consiste à remplacer chaque lettre par la valeur donnée.",
          "On substitue, puis on effectue le calcul en respectant les parenthèses.",
          `$P_{TTC} = ${p} \\times \\left(1 + \\dfrac{${fr(t)}}{100}\\right) = ${p} \\times ${fr(1 + t / 100)} = ${fr(Math.round(p * (1 + t / 100) * 100) / 100)}$.`,
          `Le prix TTC est de $${fr(Math.round(p * (1 + t / 100) * 100) / 100)}$ €.`
        ),
      };
    },
  },
];
