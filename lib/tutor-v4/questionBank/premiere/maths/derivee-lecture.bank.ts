// lib/tutor-v4/questionBank/premiere/maths/derivee-lecture.bank.ts
//
// Notions : der_graphique et der_nombre_derive (domaine BOP1DE)
//
// La dérivée telle qu'on la RENCONTRE d'abord : sur une courbe, avec une
// tangente tracée. Le programme en vigueur (BO du 7 juillet 2022) l'introduit
// exactement ainsi — « le nombre dérivé peut être présenté comme le
// coefficient directeur de la tangente, position limite des sécantes » — et la
// première capacité attendue est de l'interpréter, pas de le calculer.
//
// C'est l'exercice 3 du sujet d'Asie, juin 2026 : la courbe de croissance de
// Juliette, trois tangentes tracées, et quatre questions dont aucune ne demande
// un calcul — à quel âge grandissait-elle le plus vite, pourquoi peut-on dire
// que sa croissance est terminée, quelle sera sa taille adulte.
//
// Chaque item porte la courbe ET sa tangente. Une tangente se voit ; décrite
// avec des mots, elle ne veut plus rien dire.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

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

/**
 * Une parabole f(x) = ax² + bx + c et sa tangente au point d'abscisse x0.
 * Le nombre dérivé f'(x0) vaut 2a·x0 + b : c'est le coefficient directeur de
 * la tangente, et c'est ce que l'élève doit lire.
 */
function canvasTangente(
  a: number,
  b: number,
  c: number,
  x0: number,
  titre?: string
): CanvasFigure {
  const pente = 2 * a * x0 + b;
  const yx0 = a * x0 * x0 + b * x0 + c;
  return {
    kind: "fonctionGraphique",
    titre: titre ?? "La courbe de f et sa tangente au point A",
    xmin: -5,
    xmax: 5,
    ymin: -8,
    ymax: 10,
    grille: true,
    courbes: [
      { id: "f", type: "quadratique", a, b, c, couleur: "#e11d48" },
      { id: "t", type: "affine", a: pente, b: yx0 - pente * x0, couleur: "#0284c7" },
    ],
    points: [{ x: x0, y: yx0, label: "A" }],
  };
}

export const deriveeLectureBank: TutorBankItemV4[] = [
  /* ═══════════════ der_tangente_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_tangente_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_lire",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre dérivé se lit sur la TANGENTE : avance de $1$, regarde de combien elle monte.",
    tags: ["premiere", "maths", "derivation", "tangente", "template", "short"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = pick([-2, -1, 1, 2] as const);
      const c = pick([-2, 0, 2] as const);
      const x0 = pick([-2, -1, 1, 2] as const);
      const pente = 2 * a * x0 + b;
      return {
        text:
          `La courbe ci-contre représente une fonction $f$, et la droite bleue est sa tangente ` +
          `au point $A$ d'abscisse $${x0}$. Combien vaut $f'(${x0})$ ?`,
        format: "short",
        expected: [fr(pente)],
        comparator: "number_equal",
        canvas: canvasTangente(a, b, c, x0),
        explanation: exp(
          "Le nombre dérivé $f'(x_0)$ est le coefficient directeur de la tangente à la courbe au point d'abscisse $x_0$.",
          "On lit la pente de la tangente : quand on avance de $1$ vers la droite, de combien monte-t-elle ?",
          `La tangente au point $A$ a pour coefficient directeur $${fr(pente)}$.`,
          `$f'(${x0}) = ${fr(pente)}$ — c'est un nombre qu'on LIT sur la tangente, sans calcul.`
        ),
      };
    },
  },

  /* ═══════════════ der_tangente_signe ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_signe_tangente_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_signe",
    difficulty: 2,
    theme: "neutral",
    hint: "La courbe monte ? La tangente monte aussi, donc le nombre dérivé est positif.",
    tags: ["premiere", "maths", "derivation", "signe", "template"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = pick([-2, -1, 1, 2] as const);
      const c = 0;
      // On choisit x0 pour que la pente soit franchement non nulle.
      const x0 = pick(([-2, -1, 1, 2] as const).filter((v) => Math.abs(2 * a * v + b) >= 1));
      const pente = 2 * a * x0 + b;
      return {
        text:
          `La courbe ci-contre représente $f$, et la droite bleue est sa tangente au point ` +
          `d'abscisse $${x0}$. Quel est le signe de $f'(${x0})$ ?`,
        format: "qcm",
        choices: makeChoices(pente > 0 ? "positif" : "négatif", [
          pente > 0 ? "négatif" : "positif",
          "nul",
          "on ne peut pas le savoir sans l'expression de $f$",
        ]),
        expected: [pente > 0 ? "positif" : "négatif"],
        comparator: "mcq_exact",
        canvas: canvasTangente(a, b, c, x0),
        explanation: exp(
          "Le signe du nombre dérivé est celui du coefficient directeur de la tangente.",
          "Une tangente qui monte a un coefficient directeur positif ; une tangente qui descend, négatif.",
          `Ici la tangente ${pente > 0 ? "monte" : "descend"}, et $f'(${x0}) = ${fr(pente)}$.`,
          `$f'(${x0})$ est ${pente > 0 ? "positif" : "négatif"} : au voisinage de ce point, $f$ est ${pente > 0 ? "croissante" : "décroissante"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas le savoir sans l'expression de $f$",
            cause: "le signe se lit sur la tangente : l'expression n'est pas nécessaire",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_tangente_horizontale ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_horizontale_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_tangente_horizontale",
    difficulty: 3,
    theme: "neutral",
    hint: "Une tangente horizontale a un coefficient directeur nul.",
    tags: ["premiere", "maths", "derivation", "extremum", "template", "short"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const sommetX = pick([-2, -1, 1, 2] as const);
      const b = -2 * a * sommetX;
      const c = pick([-2, 0, 2] as const);
      return {
        text:
          `La courbe ci-contre représente $f$, avec sa tangente au sommet. ` +
          `En quelle abscisse la tangente est-elle horizontale ?`,
        format: "short",
        expected: [fr(sommetX)],
        comparator: "number_equal",
        canvas: canvasTangente(a, b, c, sommetX, "La courbe de f et sa tangente au sommet"),
        explanation: exp(
          "Une tangente horizontale a un coefficient directeur nul : en ce point, $f'(x) = 0$.",
          "On repère l'endroit où la courbe cesse de descendre et se met à monter — son sommet.",
          `Le sommet a pour abscisse $${fr(sommetX)}$, et la tangente y est bien horizontale.`,
          `La tangente est horizontale en $x = ${fr(sommetX)}$, donc $f'(${fr(sommetX)}) = 0$. C'est là que $f$ atteint son minimum.`
        ),
      };
    },
  },

  /* ═══════════════ der_comparer_vitesses ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_comparer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_graphique",
    microId: "der_comparer_vitesses",
    difficulty: 4,
    theme: "neutral",
    hint: "Plus la courbe est raide, plus le nombre dérivé est grand.",
    tags: ["premiere", "maths", "derivation", "vitesse", "template"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const b = 0;
      const c = -2;
      const x1 = pick([1, 2] as const);
      const x2 = pick([3, 4] as const);
      return {
        text:
          `La courbe ci-contre représente la taille d'une plante en fonction du temps, ` +
          `avec sa tangente à l'instant $${x2}$. ` +
          `À quel instant la plante grandit-elle le plus vite : $${x1}$ ou $${x2}$ ?`,
        format: "qcm",
        choices: makeChoices(`à l'instant $${x2}$`, [
          `à l'instant $${x1}$`,
          "à la même vitesse aux deux instants",
          "on ne peut pas comparer",
        ]),
        expected: [`à l'instant $${x2}$`],
        comparator: "mcq_exact",
        canvas: canvasTangente(a, b, c, x2, "Taille de la plante en fonction du temps"),
        explanation: exp(
          "La vitesse de variation à un instant donné est le nombre dérivé en cet instant.",
          "On compare la raideur de la courbe aux deux endroits : plus elle est raide, plus la tangente est pentue.",
          `$f'(${x1}) = ${fr(2 * a * x1 + b)}$ et $f'(${x2}) = ${fr(2 * a * x2 + b)}$.`,
          `La plante grandit plus vite à l'instant $${x2}$ : la courbe y est nettement plus raide. C'est la question posée au sujet d'Asie sur la croissance de Juliette.`
        ),
      };
    },
  },

  /* ═══════════════ der_nombre_derive_sens ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_der_sens_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nombre_derive_sens",
    difficulty: 2,
    theme: "neutral",
    text: "La taille d'un enfant est modélisée par une fonction $f$ du temps. Que représente $f'(12)$ ?",
    format: "qcm",
    choices: [
      "Sa vitesse de croissance à $12$ ans",
      "Sa taille à $12$ ans",
      "Sa taille moyenne entre $0$ et $12$ ans",
      "Le nombre d'années jusqu'à sa taille adulte",
    ],
    expected: ["Sa vitesse de croissance à $12$ ans"],
    comparator: "mcq_exact",
    hint: "$f$ donne la taille ; $f'$ donne la façon dont elle change.",
    explanation: exp(
      "Le nombre dérivé $f'(a)$ mesure la vitesse à laquelle la grandeur varie à l'instant $a$.",
      "On distingue la grandeur elle-même, $f$, et sa vitesse de variation, $f'$.",
      "$f(12)$ serait la taille à $12$ ans, en centimètres. $f'(12)$ est la vitesse de croissance à cet âge, en centimètres par an.",
      "$f'(12)$ est la vitesse de croissance à $12$ ans. (Formulation du sujet d'Asie, juin 2026 : « la vitesse de croissance à une date $t$ est égale au nombre dérivé $f'(t)$ ».)"
    ),
    choiceDiagnostics: [
      {
        choice: "Sa taille à $12$ ans",
        cause: "confond $f(12)$ et $f'(12)$ : la grandeur et sa vitesse de variation",
      },
    ],
    tags: ["premiere", "maths", "derivation", "interpretation", "sujet-2026"],
  },

  /* ═══════════════ der_tangente_coefficient ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_der_coefficient_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_tangente_coefficient",
    difficulty: 3,
    theme: "neutral",
    text: "Géométriquement, que représente le nombre dérivé $f'(a)$ ?",
    format: "qcm",
    choices: [
      "Le coefficient directeur de la tangente à la courbe au point d'abscisse $a$",
      "L'ordonnée du point de la courbe d'abscisse $a$",
      "L'aire sous la courbe jusqu'à $a$",
      "La distance entre la courbe et l'axe des abscisses en $a$",
    ],
    expected: ["Le coefficient directeur de la tangente à la courbe au point d'abscisse $a$"],
    comparator: "mcq_exact",
    hint: "La tangente est la droite qui « épouse » la courbe en ce point.",
    explanation: exp(
      "La tangente en un point est la position limite des sécantes passant par ce point.",
      "Son coefficient directeur mesure la pente de la courbe à cet endroit précis.",
      "Ce coefficient directeur est, par définition, le nombre dérivé $f'(a)$.",
      "$f'(a)$ est le coefficient directeur de la tangente au point d'abscisse $a$. C'est ce qui permet de le LIRE sur un graphique sans connaître l'expression de $f$."
    ),
    tags: ["premiere", "maths", "derivation", "tangente"],
  },

  /* ═══════════════ der_modele_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_der_modele_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_modele_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Une dérivée nulle ne veut pas dire une grandeur nulle : elle veut dire qu'elle ne bouge plus.",
    tags: ["premiere", "maths", "derivation", "interpretation", "template"],
    generate: () => {
      const age = pick([16, 17, 18] as const);
      return {
        text:
          `La taille d'une personne est modélisée par une fonction $f$ du temps, en années. ` +
          `À partir de $${age}$ ans, la courbe devient horizontale. Que peut-on en conclure ?`,
        format: "qcm",
        choices: makeChoices(
          `sa croissance est terminée : $f'(t)$ est nul à partir de $${age}$ ans`,
          [
            `sa taille est nulle à partir de $${age}$ ans`,
            `elle rapetisse à partir de $${age}$ ans`,
            `elle grandit à vitesse constante à partir de $${age}$ ans`,
          ]
        ),
        expected: [`sa croissance est terminée : $f'(t)$ est nul à partir de $${age}$ ans`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une courbe horizontale a des tangentes horizontales : le nombre dérivé y est nul.",
          "On traduit « dérivée nulle » dans le contexte : la grandeur ne varie plus.",
          `À partir de $${age}$ ans, $f'(t) = 0$ : la taille cesse d'augmenter.`,
          `La croissance est terminée, et la taille se stabilise à sa valeur adulte. ⚠️ $f'(t) = 0$ ne signifie pas $f(t) = 0$ : c'est la VARIATION qui s'annule, pas la taille.`
        ),
        choiceDiagnostics: [
          {
            choice: `sa taille est nulle à partir de $${age}$ ans`,
            cause: "confond « la dérivée s'annule » et « la fonction s'annule »",
          },
        ],
      };
    },
  },
];
