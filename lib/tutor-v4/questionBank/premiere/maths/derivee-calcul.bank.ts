// lib/tutor-v4/questionBank/premiere/maths/derivee-calcul.bank.ts
//
// Notions : der_formules, der_polynome, der_signe, der_variations (BOP1DE)
//
// Le calcul, après la lecture. Contenus du programme : « dérivée des fonctions
// constante, identité, carré et cube ; dérivée d'une somme, du produit par un
// nombre réel ; application à la dérivée d'un polynôme de degré inférieur ou
// égal à 3 ; tableau de variation ».
//
// Modèle : l'exercice 2 du sujet des Centres étrangers, juin 2026 —
//   f(x) = −x³ + 4,5x² − 6x + 2 sur [0 ; 10]
//   1. Calculer f'(x).  2. Vérifier que f'(x) = (3x − 6)(1 − x).
//   3. Étudier le signe de f'(x).  4. En déduire les variations de f.
// Les quatre questions sont ici, chacune sur sa micro-compétence.
//
// ⚠️ Les expressions algébriques sont demandées en QCM, jamais en saisie libre :
// « 3x²+2x-5 », « 3x^2 + 2x - 5 » et « -5 + 2x + 3x² » sont la même réponse pour
// un élève et trois chaînes différentes pour une machine. On ne sanctionne pas
// une frappe.
//
// Les questions de variations portent la courbe : le tableau se lit dessus.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
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

/** « 3x^2 - 2x + 5 », avec les signes au bon endroit et les 1 sous-entendus. */
function polynome(coeffs: { deg: number; c: number }[]): string {
  const morceaux = coeffs
    .filter((t) => t.c !== 0)
    .map((t, i) => {
      const signe = t.c < 0 ? "-" : i === 0 ? "" : "+";
      const abs = Math.abs(t.c);
      const nombre = abs === 1 && t.deg > 0 ? "" : fr(abs);
      const partie = t.deg === 0 ? "" : t.deg === 1 ? "x" : `x^${t.deg}`;
      return `${signe} ${nombre}${partie}`.trim();
    });
  return morceaux.length ? morceaux.join(" ") : "0";
}

function canvasCourbe(a: number, b: number, c: number, titre?: string): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    titre: titre ?? "La courbe de f",
    xmin: -5,
    xmax: 5,
    ymin: -10,
    ymax: 10,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#e11d48" }],
  };
}

export const deriveeCalculBank: TutorBankItemV4[] = [
  /* ═══════════════ der_derivee_constante ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_constante_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_derivee_constante",
    difficulty: 1,
    theme: "neutral",
    hint: "Une fonction constante ne varie pas : sa courbe est une droite horizontale.",
    tags: ["premiere", "maths", "derivation", "formules", "template", "short"],
    generate: () => {
      const k = pick([-7, -3, 4, 12, 25] as const);
      return {
        text: `Soit $f$ la fonction définie par $f(x) = ${k}$. Combien vaut $f'(x)$ ?`,
        format: "short",
        expected: ["0"],
        comparator: "number_equal",
        explanation: exp(
          "La dérivée d'une fonction constante est nulle.",
          "La courbe d'une fonction constante est une droite horizontale : ses tangentes sont horizontales, de coefficient directeur nul.",
          `$f(x) = ${k}$ ne varie jamais, donc $f'(x) = 0$ pour tout $x$.`,
          "$f'(x) = 0$."
        ),
      };
    },
  },

  /* ═══════════════ der_derivee_identite ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_affine_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_derivee_identite",
    difficulty: 2,
    theme: "neutral",
    hint: "La courbe d'une fonction affine est une droite : sa pente est la même partout.",
    tags: ["premiere", "maths", "derivation", "formules", "template", "short"],
    generate: () => {
      const a = pick([-5, -2, 3, 4, 7] as const);
      const b = randomInt(-6, 6);
      return {
        text: `Soit $f$ la fonction définie par $f(x) = ${polynome([{ deg: 1, c: a }, { deg: 0, c: b }])}$. Combien vaut $f'(x)$ ?`,
        format: "short",
        expected: [fr(a)],
        comparator: "number_equal",
        explanation: exp(
          "La dérivée de $x \\mapsto ax + b$ est la fonction constante $a$.",
          "La courbe est une droite de coefficient directeur $a$ : en tout point, la tangente est la droite elle-même.",
          `$f'(x) = ${fr(a)}$, quelle que soit la valeur de $x$.`,
          `$f'(x) = ${fr(a)}$. Le terme constant $${fr(b)}$ disparaît : il déplace la droite, il ne change pas sa pente.`
        ),
      };
    },
  },

  /* ═══════════════ der_derivee_carre_cube ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_der_carre_cube_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_derivee_carre_cube",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de la fonction carré, $f(x) = x^2$ ?",
    format: "qcm",
    choices: ["$f'(x) = 2x$", "$f'(x) = x$", "$f'(x) = 2$", "$f'(x) = \\dfrac{x^3}{3}$"],
    expected: ["$f'(x) = 2x$"],
    comparator: "mcq_exact",
    hint: "L'exposant descend devant, et diminue de $1$.",
    explanation: exp(
      "La dérivée de $x \\mapsto x^n$ est $x \\mapsto n \\, x^{n-1}$.",
      "L'exposant passe devant en facteur, puis on lui retire $1$.",
      "Pour $n = 2$ : $f'(x) = 2 \\, x^{2-1} = 2x$.",
      "$f'(x) = 2x$. La dérivée n'est pas constante : la pente de la parabole change en chaque point."
    ),
    tags: ["premiere", "maths", "derivation", "formules"],
  },

  {
    kind: "fixed",
    id: "premiere_der_carre_cube_fixed_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_derivee_carre_cube",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la dérivée de la fonction cube, $f(x) = x^3$ ?",
    format: "qcm",
    choices: ["$f'(x) = 3x^2$", "$f'(x) = 3x$", "$f'(x) = x^2$", "$f'(x) = 2x^3$"],
    expected: ["$f'(x) = 3x^2$"],
    comparator: "mcq_exact",
    hint: "Même règle que pour le carré : l'exposant descend, puis diminue de $1$.",
    explanation: exp(
      "La dérivée de $x \\mapsto x^n$ est $x \\mapsto n \\, x^{n-1}$.",
      "On applique la règle avec $n = 3$.",
      "$f'(x) = 3 \\, x^{3-1} = 3x^2$.",
      "$f'(x) = 3x^2$. L'exposant descend en facteur ET diminue : oublier l'un des deux gestes est l'erreur la plus fréquente."
    ),
    choiceDiagnostics: [
      {
        choice: "$f'(x) = 3x$",
        cause: "a fait descendre l'exposant mais a trop diminué la puissance",
      },
      {
        choice: "$f'(x) = x^2$",
        cause: "a diminué l'exposant sans le faire descendre en facteur",
      },
    ],
    tags: ["premiere", "maths", "derivation", "formules"],
  },

  {
    kind: "template",
    id: "premiere_der_carre_cube_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_derivee_carre_cube",
    difficulty: 2,
    theme: "neutral",
    hint: "L'exposant descend en facteur, ET diminue de $1$. Les deux gestes, pas un seul.",
    tags: ["premiere", "maths", "derivation", "formules", "template"],
    generate: () => {
      const n = pick([2, 3] as const);
      const nom = n === 2 ? "carré" : "cube";
      const derivee = n === 2 ? "2x" : "3x^2";
      return {
        text: `Quelle est la dérivée de la fonction ${nom}, $f(x) = x^${n}$ ?`,
        format: "qcm",
        choices: makeChoices(`$f'(x) = ${derivee}$`, [
          `$f'(x) = ${n}x$`,
          `$f'(x) = x^${n - 1}$`,
          `$f'(x) = ${n}$`,
          `$f'(x) = ${n + 1}x^${n + 1}$`,
        ]),
        expected: [`$f'(x) = ${derivee}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $x \\mapsto x^n$ est $x \\mapsto n \\, x^{n-1}$.",
          "L'exposant passe devant en facteur, puis on lui retire $1$.",
          `Pour $n = ${n}$ : $f'(x) = ${n} \\, x^{${n}-1} = ${derivee}$.`,
          `$f'(x) = ${derivee}$. ⚠️ Deux gestes : descendre l'exposant ET le diminuer. ` +
            `N'en faire qu'un donne $${n === 2 ? "2" : "3x"}$ ou $${n === 2 ? "x" : "x^2"}$, deux réponses fausses.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f'(x) = ${n}x$`,
            cause: n === 2 ? "réponse juste par hasard pour le carré, fausse ici" : "a fait descendre l'exposant mais l'a trop diminué",
          },
          {
            choice: `$f'(x) = x^${n - 1}$`,
            cause: "a diminué l'exposant sans le faire descendre en facteur",
          },
        ],
      };
    },
  },

  {
    kind: "template",
    id: "premiere_der_somme_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_derivee_somme",
    difficulty: 2,
    theme: "neutral",
    hint: "On dérive chaque terme séparément, puis on additionne les résultats.",
    tags: ["premiere", "maths", "derivation", "polynome", "template"],
    generate: () => {
      const cas = pick([
        {
          question: "Comment dérive-t-on une somme de deux fonctions, $f = u + v$ ?",
          bonne: "$f' = u' + v'$ : on dérive chaque terme séparément",
          pieges: ["$f' = u' \\times v'$", "$f' = u' + v$", "$f' = (u + v)^2$"],
        },
        {
          question: "La dérivée de $f(x) = x^2 + x^3$ est :",
          bonne: "$f'(x) = 2x + 3x^2$",
          pieges: ["$f'(x) = 2x \\times 3x^2$", "$f'(x) = 5x^5$", "$f'(x) = x + x^2$"],
        },
        {
          question: "La dérivée de $f(x) = 4x + 7$ est :",
          bonne: "$f'(x) = 4$",
          pieges: ["$f'(x) = 4x$", "$f'(x) = 4 + 7$", "$f'(x) = 11$"],
        },
        {
          question:
            "Pourquoi peut-on dériver un polynôme terme à terme, comme $3x^2 - 5x + 2$ ?",
          bonne: "parce que la dérivée d'une somme est la somme des dérivées",
          pieges: [
            "parce qu'un polynôme est toujours croissant",
            "parce que les exposants sont entiers",
            "on ne peut pas : il faut d'abord factoriser",
          ],
        },
      ] as const);
      return {
        text: cas.question,
        format: "qcm",
        choices: makeChoices(cas.bonne, cas.pieges),
        expected: [cas.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'une somme est la somme des dérivées : $(u + v)' = u' + v'$.",
          "On dérive chaque terme indépendamment, puis on additionne.",
          "Pour $f(x) = 3x^2 + 5x - 2$ : la dérivée de $3x^2$ est $6x$, celle de $5x$ est $5$, celle de $-2$ est $0$. D'où $f'(x) = 6x + 5$.",
          `${cas.bonne.charAt(0).toUpperCase()}${cas.bonne.slice(1)}. ` +
            `C'est cette règle, avec celle du produit par un réel, qui permet de dériver n'importe quel polynôme.`
        ),
      };
    },
  },

  /* ═══════════════ der_derivee_produit_reel ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_produit_reel_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_derivee_produit_reel",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre devant reste devant : on ne dérive que la partie en $x$.",
    tags: ["premiere", "maths", "derivation", "polynome", "template"],
    generate: () => {
      const k = pick([2, 3, 4, 5, 6] as const);
      return {
        text: `Soit $f$ la fonction définie par $f(x) = ${k}x^2$. Quelle est sa dérivée ?`,
        format: "qcm",
        choices: makeChoices(`$f'(x) = ${2 * k}x$`, [
          `$f'(x) = ${k}x$`,
          `$f'(x) = ${2 * k}x^2$`,
          `$f'(x) = ${k}$`,
        ]),
        expected: [`$f'(x) = ${2 * k}x$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $k \\times u$ est $k \\times u'$ : le facteur constant se conserve.",
          "On garde le nombre devant, et on dérive la partie en $x$.",
          `$f(x) = ${k}x^2$, et la dérivée de $x^2$ est $2x$, donc $f'(x) = ${k} \\times 2x = ${2 * k}x$.`,
          `$f'(x) = ${2 * k}x$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f'(x) = ${k}x$`,
            cause: "a oublié de multiplier par l'exposant 2",
          },
          {
            choice: `$f'(x) = ${2 * k}x^2$`,
            cause: "a fait descendre l'exposant sans le diminuer",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_derivee_somme / degre 2 ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_degre2_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_derivee_degre2",
    difficulty: 3,
    theme: "neutral",
    hint: "On dérive terme à terme : le carré, puis le terme en $x$, puis la constante.",
    tags: ["premiere", "maths", "derivation", "polynome", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 5] as const);
      const b = pick([-6, -4, -2, 3, 4] as const);
      const c = pick([-5, -1, 2, 7] as const);
      const f = polynome([{ deg: 2, c: a }, { deg: 1, c: b }, { deg: 0, c: c }]);
      const derivee = polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }]);
      return {
        text: `Soit $f$ définie par $f(x) = ${f}$. Quelle est sa dérivée ?`,
        format: "qcm",
        choices: makeChoices(`$f'(x) = ${derivee}$`, [
          `$f'(x) = ${polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }, { deg: 0, c: 0 }])} ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$`,
          `$f'(x) = ${polynome([{ deg: 1, c: a }, { deg: 0, c: b }])}$`,
          `$f'(x) = ${polynome([{ deg: 2, c: 2 * a }, { deg: 0, c: b }])}$`,
        ]),
        expected: [`$f'(x) = ${derivee}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'une somme est la somme des dérivées, et le facteur constant se conserve.",
          "On dérive chaque terme séparément : $ax^2 \\to 2ax$, $bx \\to b$, constante $\\to 0$.",
          `$${fr(a)}x^2 \\to ${fr(2 * a)}x$ ; $${fr(b)}x \\to ${fr(b)}$ ; $${fr(c)} \\to 0$.`,
          `$f'(x) = ${derivee}$. Le terme constant disparaît toujours.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f'(x) = ${polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }, { deg: 0, c: 0 }])} ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$`,
            cause: "a gardé le terme constant, qui doit disparaître",
          },
          {
            choice: `$f'(x) = ${polynome([{ deg: 1, c: a }, { deg: 0, c: b }])}$`,
            cause: "a oublié de multiplier par l'exposant 2",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_derivee_somme ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_der_somme_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_derivee_somme",
    difficulty: 2,
    theme: "neutral",
    text: "Comment dérive-t-on une somme de deux fonctions, $f = u + v$ ?",
    format: "qcm",
    choices: [
      "$f' = u' + v'$ : on dérive chaque terme séparément",
      "$f' = u' \\times v'$",
      "$f' = (u + v)'$ qu'on ne peut pas simplifier",
      "$f' = u' + v$",
    ],
    expected: ["$f' = u' + v'$ : on dérive chaque terme séparément"],
    comparator: "mcq_exact",
    hint: "C'est ce qui permet de dériver un polynôme terme à terme.",
    explanation: exp(
      "La dérivée d'une somme est la somme des dérivées : $(u + v)' = u' + v'$.",
      "On dérive chaque terme indépendamment, puis on additionne les résultats.",
      "Pour $f(x) = 3x^2 + 5x - 2$ : la dérivée de $3x^2$ est $6x$, celle de $5x$ est $5$, celle de $-2$ est $0$. D'où $f'(x) = 6x + 5$.",
      "$f' = u' + v'$. C'est cette règle, jointe à celle du produit par un réel, qui permet de dériver n'importe quel polynôme terme à terme."
    ),
    choiceDiagnostics: [
      {
        choice: "$f' = u' \\times v'$",
        cause: "confond la règle de la somme avec celle d'un produit",
      },
    ],
    tags: ["premiere", "maths", "derivation", "polynome"],
  },

  /* ═══════════════ der_derivee_degre3 ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_degre3_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_derivee_degre3",
    difficulty: 4,
    theme: "neutral",
    hint: "Le cube donne $3x^2$, le carré donne $2x$, le terme en $x$ donne son coefficient.",
    tags: ["premiere", "maths", "derivation", "polynome", "template"],
    generate: () => {
      const a = pick([-1, 1, 2] as const);
      const b = pick([-3, 2, 4, 6] as const);
      const c = pick([-6, -2, 5] as const);
      const d = pick([1, 2, 3] as const);
      const f = polynome([
        { deg: 3, c: a },
        { deg: 2, c: b },
        { deg: 1, c: c },
        { deg: 0, c: d },
      ]);
      const derivee = polynome([
        { deg: 2, c: 3 * a },
        { deg: 1, c: 2 * b },
        { deg: 0, c: c },
      ]);
      return {
        text: `Soit $f$ définie par $f(x) = ${f}$. Quelle est sa dérivée ?`,
        format: "qcm",
        choices: makeChoices(`$f'(x) = ${derivee}$`, [
          `$f'(x) = ${polynome([{ deg: 2, c: 3 * a }, { deg: 1, c: b }, { deg: 0, c: c }])}$`,
          `$f'(x) = ${polynome([{ deg: 2, c: a }, { deg: 1, c: b }, { deg: 0, c: c }])}$`,
          `$f'(x) = ${polynome([{ deg: 3, c: 3 * a }, { deg: 2, c: 2 * b }, { deg: 0, c: c }])}$`,
        ]),
        expected: [`$f'(x) = ${derivee}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive terme à terme, en appliquant $x^n \\to n \\, x^{n-1}$ à chacun.",
          "Le degré 3 devient un degré 2, le degré 2 un degré 1, le degré 1 une constante, et la constante disparaît.",
          `$${fr(a)}x^3 \\to ${fr(3 * a)}x^2$ ; $${fr(b)}x^2 \\to ${fr(2 * b)}x$ ; $${fr(c)}x \\to ${fr(c)}$ ; $${fr(d)} \\to 0$.`,
          `$f'(x) = ${derivee}$. (C'est exactement la question 1 de l'exercice 2 des Centres étrangers, juin 2026.)`
        ),
        choiceDiagnostics: [
          {
            choice: `$f'(x) = ${polynome([{ deg: 2, c: 3 * a }, { deg: 1, c: b }, { deg: 0, c: c }])}$`,
            cause: "a dérivé le terme de degré 3 mais oublié le facteur 2 sur le degré 2",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_calculer_nombre_derive ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_nombre_derive_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_calculer_nombre_derive",
    difficulty: 3,
    theme: "neutral",
    hint: "On dérive d'abord, on remplace ensuite — jamais l'inverse.",
    tags: ["premiere", "maths", "derivation", "polynome", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3] as const);
      const b = pick([-6, -4, 2, 4] as const);
      const c = pick([-3, 1, 5] as const);
      const x0 = pick([-2, -1, 1, 2, 3] as const);
      const f = polynome([{ deg: 2, c: a }, { deg: 1, c: b }, { deg: 0, c: c }]);
      const valeur = 2 * a * x0 + b;
      return {
        text: `Soit $f$ définie par $f(x) = ${f}$. Combien vaut $f'(${x0})$ ?`,
        format: "short",
        expected: [fr(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "$f'(a)$ est la valeur de la fonction dérivée en $a$.",
          "On calcule d'abord l'expression de $f'$, puis on y remplace $x$ par la valeur demandée.",
          `$f'(x) = ${polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }])}$, donc $f'(${x0}) = ${fr(2 * a)} \\times (${x0}) ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(valeur)}$.`,
          `$f'(${x0}) = ${fr(valeur)}$ : c'est le coefficient directeur de la tangente au point d'abscisse $${x0}$.`
        ),
      };
    },
  },

  /* ═══════════════ der_signe_etudier ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_signe_etudier_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_signe",
    microId: "der_signe_etudier",
    difficulty: 3,
    theme: "neutral",
    hint: "La dérivée est ici du premier degré : elle s'annule une fois et change de signe.",
    tags: ["premiere", "maths", "derivation", "signe", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3] as const);
      const racine = pick([-2, -1, 1, 2] as const);
      const b = -2 * a * racine; // f'(x) = 2a(x − racine)
      const f = polynome([{ deg: 2, c: a }, { deg: 1, c: b }, { deg: 0, c: pick([-2, 0, 3] as const) }]);
      return {
        text:
          `Soit $f$ définie par $f(x) = ${f}$. ` +
          `En quelle valeur de $x$ la dérivée $f'$ s'annule-t-elle ?`,
        format: "short",
        expected: [fr(racine)],
        comparator: "number_equal",
        canvas: canvasCourbe(a, b, 0),
        explanation: exp(
          "Étudier le signe de $f'$ commence par chercher où elle s'annule.",
          "On calcule $f'$, puis on résout $f'(x) = 0$.",
          `$f'(x) = ${polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }])}$. On résout $${fr(2 * a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0$, d'où $x = ${fr(racine)}$.`,
          `$f'$ s'annule en $x = ${fr(racine)}$ : c'est l'abscisse du sommet, là où la courbe cesse de descendre pour monter.`
        ),
      };
    },
  },

  /* ═══════════════ der_signe_factorisee ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_signe_factorisee_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_signe",
    microId: "der_signe_factorisee",
    difficulty: 4,
    theme: "neutral",
    hint: "Un produit de deux facteurs du premier degré : on étudie le signe de chacun, puis on multiplie.",
    tags: ["premiere", "maths", "derivation", "signe", "template"],
    generate: () => {
      const r1 = pick([1, 2] as const);
      const r2 = pick([4, 5, 6] as const);
      return {
        text:
          `La dérivée d'une fonction $f$ s'écrit $f'(x) = (x - ${r1})(${r2} - x)$ sur $[0 \\, ; \\, 10]$. ` +
          `Sur quel intervalle $f'$ est-elle positive ?`,
        format: "qcm",
        choices: makeChoices(`$[${r1} \\, ; \\, ${r2}]$`, [
          `$[0 \\, ; \\, ${r1}]$`,
          `$[${r2} \\, ; \\, 10]$`,
          `$[0 \\, ; \\, 10]$ tout entier`,
        ]),
        expected: [`$[${r1} \\, ; \\, ${r2}]$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est positif quand ses deux facteurs ont le même signe.",
          "On étudie le signe de chaque facteur, puis on applique la règle des signes.",
          `$x - ${r1}$ est positif pour $x \\geq ${r1}$ ; $${r2} - x$ est positif pour $x \\leq ${r2}$. ` +
            `Les deux le sont en même temps sur $[${r1} \\, ; \\, ${r2}]$.`,
          `$f'$ est positive sur $[${r1} \\, ; \\, ${r2}]$, donc $f$ y est croissante. ` +
            `⚠️ Le second facteur s'écrit $${r2} - x$ et non $x - ${r2}$ : il est positif AVANT $${r2}$, pas après.`
        ),
        choiceDiagnostics: [
          {
            choice: `$[${r2} \\, ; \\, 10]$`,
            cause: `a lu $${r2} - x$ comme $x - ${r2}$ et inversé le sens du second facteur`,
          },
        ],
      };
    },
  },

  /* ═══════════════ der_verifier_forme_factorisee ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_verifier_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_signe",
    microId: "der_verifier_forme_factorisee",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe la forme factorisée et compare terme à terme.",
    tags: ["premiere", "maths", "derivation", "signe", "template"],
    generate: () => {
      const r1 = pick([1, 2, 3] as const);
      const r2 = pick([4, 5] as const);
      // (x − r1)(r2 − x) = −x² + (r1+r2)x − r1·r2
      const developpee = polynome([
        { deg: 2, c: -1 },
        { deg: 1, c: r1 + r2 },
        { deg: 0, c: -r1 * r2 },
      ]);
      return {
        text:
          `On a calculé $f'(x) = ${developpee}$. ` +
          `Comment vérifier que $f'(x) = (x - ${r1})(${r2} - x)$ ?`,
        format: "qcm",
        choices: makeChoices(
          "en développant le produit et en comparant avec l'expression obtenue",
          [
            "en remplaçant $x$ par $0$ dans les deux expressions",
            "en dérivant une seconde fois",
            "en traçant la courbe de $f$",
          ]
        ),
        expected: ["en développant le produit et en comparant avec l'expression obtenue"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une égalité entre deux expressions, c'est montrer qu'elles sont égales pour TOUT $x$.",
          "On développe la forme factorisée et on compare les coefficients terme à terme.",
          `$(x - ${r1})(${r2} - x) = ${r2}x - x^2 - ${r1 * r2} + ${r1}x = ${developpee}$.`,
          "Les deux expressions coïncident : la forme factorisée est bien celle de $f'$. Tester une seule valeur ne prouverait rien — deux expressions différentes peuvent coïncider en un point."
        ),
        choiceDiagnostics: [
          {
            choice: "en remplaçant $x$ par $0$ dans les deux expressions",
            cause: "une seule valeur ne prouve pas une égalité valable pour tout x",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_variations_deduire ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_variations_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_variations_deduire",
    difficulty: 3,
    theme: "neutral",
    hint: "Dérivée positive : la fonction monte. Dérivée négative : elle descend.",
    tags: ["premiere", "maths", "derivation", "variations", "template"],
    generate: () => {
      const racine = pick([-2, -1, 1, 2] as const);
      const a = pick([1, 2] as const);
      const b = -2 * a * racine;
      return {
        text:
          `Une fonction $f$ a pour dérivée $f'(x) = ${polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }])}$. ` +
          `Sur quel intervalle $f$ est-elle décroissante ?`,
        format: "qcm",
        choices: makeChoices(`$]-\\infty \\, ; \\, ${fr(racine)}]$`, [
          `$[${fr(racine)} \\, ; \\, +\\infty[$`,
          `$]-\\infty \\, ; \\, +\\infty[$`,
          `$]-\\infty \\, ; \\, 0]$`,
        ]),
        expected: [`$]-\\infty \\, ; \\, ${fr(racine)}]$`],
        comparator: "mcq_exact",
        canvas: canvasCourbe(a, b, 0),
        explanation: exp(
          "Une fonction est décroissante là où sa dérivée est négative.",
          "On cherche où $f'$ s'annule, puis on détermine son signe de part et d'autre.",
          `$f'(x) = ${polynome([{ deg: 1, c: 2 * a }, { deg: 0, c: b }])}$ s'annule en $${fr(racine)}$ et, son coefficient directeur étant positif, elle est négative AVANT.`,
          `$f$ est décroissante sur $]-\\infty \\, ; \\, ${fr(racine)}]$, puis croissante ensuite — ce que confirme la courbe.`
        ),
      };
    },
  },

  /* ═══════════════ der_tableau_dresser ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_tableau_dresser",
    difficulty: 4,
    theme: "neutral",
    hint: "Le tableau de variations se lit en deux lignes : le signe de $f'$, puis les flèches de $f$.",
    tags: ["premiere", "maths", "derivation", "tableau", "template"],
    generate: () => {
      const r1 = pick([1, 2] as const);
      const r2 = pick([4, 5, 6] as const);
      return {
        text:
          `Sur $[0 \\, ; \\, 10]$, une fonction $f$ a pour dérivée $f'(x) = (x - ${r1})(${r2} - x)$. ` +
          `Quel est le tableau de variations de $f$ ?`,
        format: "qcm",
        choices: makeChoices(
          `décroissante sur $[0 \\, ; \\, ${r1}]$, croissante sur $[${r1} \\, ; \\, ${r2}]$, décroissante sur $[${r2} \\, ; \\, 10]$`,
          [
            `croissante sur $[0 \\, ; \\, ${r1}]$, décroissante sur $[${r1} \\, ; \\, ${r2}]$, croissante sur $[${r2} \\, ; \\, 10]$`,
            `croissante sur $[0 \\, ; \\, 10]$`,
            `décroissante sur $[0 \\, ; \\, 10]$`,
          ]
        ),
        expected: [
          `décroissante sur $[0 \\, ; \\, ${r1}]$, croissante sur $[${r1} \\, ; \\, ${r2}]$, décroissante sur $[${r2} \\, ; \\, 10]$`,
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Le tableau de variations traduit le signe de la dérivée en flèches.",
          "On dresse d'abord le signe du produit, puis on en déduit les flèches.",
          `$f'$ est négative sur $[0 \\, ; \\, ${r1}]$, positive sur $[${r1} \\, ; \\, ${r2}]$, négative sur $[${r2} \\, ; \\, 10]$.`,
          `$f$ descend, puis monte, puis redescend. Elle atteint un minimum en $${r1}$ et un maximum en $${r2}$.`
        ),
      };
    },
  },

  /* ═══════════════ der_extremum_determiner ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_extremum_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_extremum_determiner",
    difficulty: 4,
    theme: "neutral",
    hint: "L'extremum est atteint là où la dérivée s'annule EN CHANGEANT de signe.",
    tags: ["premiere", "maths", "derivation", "extremum", "template", "short"],
    generate: () => {
      const r1 = pick([1, 2] as const);
      const r2 = pick([4, 5, 6] as const);
      return {
        text:
          `Sur $[0 \\, ; \\, 10]$, une fonction $f$ a pour dérivée $f'(x) = (x - ${r1})(${r2} - x)$. ` +
          `En quelle valeur de $x$ la fonction $f$ atteint-elle son maximum ?`,
        format: "short",
        expected: [fr(r2)],
        comparator: "number_equal",
        explanation: exp(
          "Un maximum est atteint là où la dérivée passe du POSITIF au NÉGATIF.",
          "On dresse le signe de la dérivée et on repère le changement de sens.",
          `$f'$ est positive sur $[${r1} \\, ; \\, ${r2}]$ puis négative après $${r2}$ : $f$ monte jusqu'à $${r2}$, puis redescend.`,
          `Le maximum est atteint en $x = ${r2}$. En $${r1}$, la dérivée passe du négatif au positif : c'est un minimum.`
        ),
      };
    },
  },

  /* ═══════════════ der_optimisation ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_optimisation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_optimisation",
    difficulty: 5,
    theme: "neutral",
    hint: "Optimiser, c'est chercher un extremum : on dérive, on étudie le signe, on conclut.",
    tags: ["premiere", "maths", "derivation", "optimisation", "template", "short"],
    generate: () => {
      // B(q) = −q² + 2m·q − k : bénéfice maximal en q = m.
      const m = pick([4, 5, 6, 8] as const);
      const k = pick([5, 8, 10] as const);
      const b = polynome([{ deg: 2, c: -1 }, { deg: 1, c: 2 * m }, { deg: 0, c: -k }]);
      return {
        text:
          `Le bénéfice d'une entreprise, en milliers d'euros, est donné par $B(q) = ${b}$, ` +
          `où $q$ est la quantité produite en tonnes. ` +
          `Pour quelle quantité le bénéfice est-il maximal ?`,
        format: "short",
        expected: [fr(m)],
        comparator: "number_equal",
        canvas: canvasCourbe(-1, 2 * m, -k, "Bénéfice en fonction de la quantité produite"),
        explanation: exp(
          "Un problème d'optimisation se résout par l'étude du signe de la dérivée : « pour identifier un extremum, la seule analyse du tableau de variation suffit » (BO).",
          "On dérive, on cherche où la dérivée s'annule, puis on vérifie le changement de signe.",
          `$B'(q) = ${polynome([{ deg: 1, c: -2 }, { deg: 0, c: 2 * m }])}$, qui s'annule pour $q = ${fr(m)}$. ` +
            `Avant, $B'$ est positive ; après, négative : le bénéfice monte puis redescend.`,
          `Le bénéfice est maximal pour $q = ${fr(m)}$ tonnes, et il vaut alors $${fr(m * m - k)}$ milliers d'euros.`
        ),
      };
    },
  },

  /* ═══════════════ der_prevoir_evolution ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_prevoir_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_prevoir_evolution",
    difficulty: 4,
    theme: "neutral",
    hint: "Le signe de la dérivée dit si la grandeur va monter ou descendre.",
    tags: ["premiere", "maths", "derivation", "prevision", "template"],
    generate: () => {
      const t = pick([3, 4, 5] as const);
      const valeur = pick([-2, -3, -5] as const);
      return {
        text:
          `Le nombre d'abonnés d'un service est modélisé par une fonction $f$ du temps, en mois. ` +
          `On calcule $f'(${t}) = ${valeur}$. Que peut-on prévoir au voisinage du mois $${t}$ ?`,
        format: "qcm",
        choices: makeChoices("le nombre d'abonnés est en train de diminuer", [
          "le nombre d'abonnés est en train d'augmenter",
          "le nombre d'abonnés est stable",
          `le service compte $${Math.abs(valeur)}$ abonnés`,
        ]),
        expected: ["le nombre d'abonnés est en train de diminuer"],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du nombre dérivé indique le sens de variation au voisinage du point.",
          "On regarde le signe de $f'(t)$, sans se soucier de sa valeur absolue.",
          `$f'(${t}) = ${valeur} < 0$ : la fonction est décroissante autour du mois $${t}$.`,
          `Le nombre d'abonnés diminue, d'environ $${Math.abs(valeur)}$ par mois à ce moment-là. ⚠️ $f'(${t})$ n'est pas le nombre d'abonnés : c'est sa vitesse de variation.`
        ),
        choiceDiagnostics: [
          {
            choice: `le service compte $${Math.abs(valeur)}$ abonnés`,
            cause: "confond la dérivée et la fonction elle-même",
          },
        ],
      };
    },
  },
];
