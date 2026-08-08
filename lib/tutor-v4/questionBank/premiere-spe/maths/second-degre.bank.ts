// lib/tutor-v4/questionBank/premiere-spe/maths/second-degre.bank.ts
//
// Chapitre : Second degré (notion "second_degre")
// microSkills :
//   sd_discriminant — calculer le discriminant Δ = b² - 4ac
//   sd_racines      — résoudre une équation du second degré
//   sd_factorisation — factoriser un trinôme (racine évidente, somme/produit)
//   sd_signe        — étudier le signe d'un trinôme
//   sd_canonique    — forme canonique, sommet, axe de symétrie
//
// PÉRIMÈTRE BO Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (parabole).

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";



function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickOne<T>(arr: readonly T[]): T {
  return arr[randomInt(0, arr.length - 1)];
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

// Parabole y = a x² + b x + c avec sommet mis en évidence.
function parabole(a: number, b: number, c: number): CanvasFigure {
  const xs = -b / (2 * a);
  const ys = a * xs * xs + b * xs + c;
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#2563eb" }],
    misesEnEvidence: [
      { point: { x: Math.round(xs * 100) / 100, y: Math.round(ys * 100) / 100, label: "S", couleur: "#dc2626" } },
    ],
  };
}

export const secondDegreBank: TutorBankItemV4[] = [
  /* ===================== SD_DISCRIMINANT ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la formule du discriminant d'un trinôme $ax^2 + bx + c$ ?",
    format: "qcm",
    choices: ["$\\Delta = b^2 - 4ac$", "$\\Delta = b^2 + 4ac$", "$\\Delta = a^2 - 4bc$", "$\\Delta = 4ac - b^2$"],
    expected: ["$\\Delta = b^2 - 4ac$"],
    comparator: "mcq_exact",
    hint: "Le discriminant fait intervenir $b^2$.",
    explanation: exp(
      "Le discriminant d'un trinôme $ax^2 + bx + c$ est noté $\\Delta$.",
      "Il se calcule par la formule officielle.",
      "$\\Delta = b^2 - 4ac$.",
      "$\\Delta = b^2 - 4ac$."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 2,
    theme: "neutral",
    text: "Calcule le discriminant de $x^2 + 2x + 1$.",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$a = 1$, $b = 2$, $c = 1$.",
    explanation: exp(
      "On identifie $a = 1$, $b = 2$, $c = 1$.",
      "$\\Delta = 2^2 - 4 \\times 1 \\times 1$.",
      "$= 4 - 4 = 0$.",
      "$\\Delta = 0$."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\Delta > 0$, combien l'équation $ax^2 + bx + c = 0$ a-t-elle de solutions réelles ?",
    format: "qcm",
    choices: ["Deux solutions distinctes", "Une solution double", "Aucune solution", "Une infinité"],
    expected: ["Deux solutions distinctes"],
    comparator: "mcq_exact",
    hint: "$\\Delta > 0$ : deux racines.",
    explanation: exp(
      "Le signe du discriminant donne le nombre de racines réelles.",
      "Si $\\Delta > 0$, on peut prendre $\\pm\\sqrt{\\Delta}$ : deux valeurs.",
      "L'équation admet alors deux solutions distinctes.",
      "Deux solutions distinctes."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\Delta = 0$, l'équation $ax^2 + bx + c = 0$ a :",
    format: "qcm",
    choices: ["une solution double", "deux solutions distinctes", "aucune solution réelle", "trois solutions"],
    expected: ["une solution double"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{0} = 0$.",
    explanation: exp(
      "Le signe de $\\Delta$ donne le nombre de racines.",
      "Si $\\Delta = 0$, alors $\\pm\\sqrt{\\Delta} = 0$ : les deux racines sont confondues.",
      "Il y a une seule racine, dite double : $x = \\dfrac{-b}{2a}$.",
      "Une solution double."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\Delta < 0$, l'équation $ax^2 + bx + c = 0$ a :",
    format: "qcm",
    choices: ["aucune solution réelle", "une solution double", "deux solutions distinctes", "une solution"],
    expected: ["aucune solution réelle"],
    comparator: "mcq_exact",
    hint: "On ne peut pas prendre la racine carrée d'un négatif.",
    explanation: exp(
      "Le signe de $\\Delta$ donne le nombre de racines réelles.",
      "Si $\\Delta < 0$, $\\sqrt{\\Delta}$ n'existe pas dans $\\mathbb{R}$.",
      "L'équation n'a alors aucune solution réelle.",
      "Aucune solution réelle."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 4,
    theme: "neutral",
    text: "Calcule le discriminant de $3x^2 - 12$.",
    format: "short",
    expected: ["144"],
    comparator: "number_equal",
    hint: "Il n'y a pas de terme en $x$ : $b = 0$.",
    explanation: exp(
      "Même sans terme en $x$, le trinôme s'écrit $ax^2 + bx + c$ avec $b = 0$.",
      "Ici $a = 3$, $b = 0$, $c = -12$ : $\\Delta = 0^2 - 4 \\times 3 \\times (-12)$.",
      "$= 0 + 144 = 144$.",
      "$\\Delta = 144$."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_disc_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 2,
    theme: "neutral",
    text: "Pour le trinôme $2x^2 - x + 5$, que valent $a$, $b$ et $c$ ?",
    format: "qcm",
    choices: [
      "$a = 2$, $b = -1$, $c = 5$",
      "$a = 2$, $b = 1$, $c = 5$",
      "$a = 2$, $b = -1$, $c = -5$",
      "$a = 0$, $b = 2$, $c = 5$",
    ],
    expected: ["$a = 2$, $b = -1$, $c = 5$"],
    comparator: "mcq_exact",
    hint: "Le signe « moins » fait partie du coefficient.",
    explanation: exp(
      "On identifie les coefficients dans $ax^2 + bx + c$.",
      "$2x^2$ donne $a = 2$ ; $-x$ s'écrit $-1 \\times x$, donc $b = -1$ ; le terme constant donne $c = 5$.",
      "Oublier le signe de $b$ est l'erreur la plus fréquente : elle fausse tout le discriminant.",
      "$a = 2$, $b = -1$, $c = 5$."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_sd_disc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 2,
    theme: "neutral",
    hint: "$\\Delta = b^2 - 4ac$ avec $a = 1$.",
    tags: ["premiere", "maths", "second_degre", "discriminant", "template"],
    generate: () => {
      const b = randomInt(-7, 7);
      const c = randomInt(-6, 6);
      const delta = b * b - 4 * c;
      return {
        text: `Calcule le discriminant de $x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$.`,
        format: "short",
        expected: [String(delta)],
        comparator: "number_equal",
        explanation: exp(
          "On identifie $a = 1$, $b$ et $c$.",
          `$\\Delta = (${b})^2 - 4 \\times 1 \\times (${c})$.`,
          `$= ${b * b} - ${4 * c} = ${delta}$.`,
          `$\\Delta = ${delta}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_disc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 4,
    theme: "neutral",
    hint: "Attention au coefficient $a \\neq 1$.",
    tags: ["premiere", "maths", "second_degre", "discriminant", "template"],
    generate: () => {
      const a = randomInt(2, 4);
      const b = randomInt(-6, 6);
      const c = randomInt(-5, 5);
      const delta = b * b - 4 * a * c;
      return {
        text: `Calcule le discriminant de $${a}x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$.`,
        format: "short",
        expected: [String(delta)],
        comparator: "number_equal",
        explanation: exp(
          "On identifie $a$, $b$, $c$.",
          `$\\Delta = (${b})^2 - 4 \\times ${a} \\times (${c})$.`,
          `$= ${b * b} - ${4 * a * c} = ${delta}$.`,
          `$\\Delta = ${delta}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_disc_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe de $\\Delta$ donne le nombre de racines.",
    tags: ["premiere", "maths", "second_degre", "discriminant", "template"],
    generate: () => {
      const cas = randomInt(0, 2);
      const delta = cas === 0 ? randomInt(1, 30) : cas === 1 ? 0 : -randomInt(1, 30);
      const correct =
        cas === 0 ? "deux solutions distinctes" : cas === 1 ? "une solution double" : "aucune solution réelle";
      return {
        text: `Un trinôme a pour discriminant $\\Delta = ${delta}$. Combien l'équation associée a-t-elle de solutions réelles ?`,
        format: "qcm",
        choices: ["deux solutions distinctes", "une solution double", "aucune solution réelle", "une infinité"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre de racines réelles dépend du signe de $\\Delta$.",
          `Ici $\\Delta = ${delta}$.`,
          `$\\Delta ${delta > 0 ? "> 0" : delta === 0 ? "= 0" : "< 0"}$ donc ${correct}.`,
          `${correct.charAt(0).toUpperCase()}${correct.slice(1)}.`
        ),
      };
    },
  },

  /* ===================== SD_RACINES ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule des racines quand $\\Delta > 0$ ?",
    format: "qcm",
    choices: [
      "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$",
      "$x = \\dfrac{b \\pm \\sqrt{\\Delta}}{2a}$",
      "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{a}$",
      "$x = -b \\pm \\sqrt{\\Delta}$",
    ],
    expected: ["$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$"],
    comparator: "mcq_exact",
    hint: "Au dénominateur : $2a$.",
    explanation: exp(
      "Quand $\\Delta > 0$, les deux racines sont données par une formule générale.",
      "On utilise $-b$, $\\pm\\sqrt{\\Delta}$ et $2a$.",
      "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$.",
      "$x = \\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les solutions de $x^2 - 5x + 6 = 0$ ?",
    format: "qcm",
    choices: ["$2$ et $3$", "$-2$ et $-3$", "$1$ et $6$", "$5$ et $6$"],
    expected: ["$2$ et $3$"],
    comparator: "mcq_exact",
    hint: "Somme $= 5$, produit $= 6$.",
    explanation: exp(
      "On cherche deux nombres de somme $5$ et de produit $6$.",
      "$2 + 3 = 5$ et $2 \\times 3 = 6$.",
      "Les racines sont donc $2$ et $3$.",
      "$x = 2$ ou $x = 3$."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    theme: "neutral",
    text: "L'équation $x^2 - 6x + 9 = 0$ a une racine double. Laquelle ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\Delta = 0$, racine $= \\dfrac{-b}{2a}$.",
    explanation: exp(
      "Ici $\\Delta = 36 - 36 = 0$ : racine double.",
      "La racine double est $x = \\dfrac{-b}{2a} = \\dfrac{6}{2}$.",
      "$= 3$.",
      "$x = 3$."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    theme: "neutral",
    text: "L'équation $x^2 + x + 1 = 0$ a-t-elle des solutions réelles ?",
    format: "qcm",
    choices: ["Non, car $\\Delta < 0$", "Oui, deux solutions", "Oui, une solution double", "Oui, $x = 1$"],
    expected: ["Non, car $\\Delta < 0$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\Delta = 1 - 4$.",
    explanation: exp(
      "On calcule le discriminant.",
      "$\\Delta = 1^2 - 4 \\times 1 \\times 1 = 1 - 4 = -3$.",
      "$\\Delta < 0$ : pas de racine réelle.",
      "Non, car $\\Delta < 0$."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 2,
    theme: "neutral",
    text: "Quelles sont les solutions de $x^2 - 7x + 10 = 0$ ?",
    format: "qcm",
    choices: ["$2$ et $5$", "$1$ et $10$", "$-2$ et $-5$", "$3$ et $4$"],
    expected: ["$2$ et $5$"],
    comparator: "mcq_exact",
    hint: "Somme $= 7$, produit $= 10$.",
    explanation: exp(
      "On cherche deux nombres de somme $7$ et de produit $10$.",
      "$2 + 5 = 7$ et $2 \\times 5 = 10$.",
      "Les racines sont $2$ et $5$.",
      "$x = 2$ ou $x = 5$."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les solutions de $x^2 = 16$ ?",
    format: "qcm",
    choices: ["$x = 4$ ou $x = -4$", "$x = 4$ uniquement", "$x = 8$", "aucune solution"],
    expected: ["$x = 4$ ou $x = -4$"],
    comparator: "mcq_exact",
    hint: "Deux nombres ont pour carré $16$.",
    explanation: exp(
      "Une équation du second degré peut avoir deux solutions opposées.",
      "$x^2 = 16$ s'écrit $x^2 - 16 = 0$, soit $(x - 4)(x + 4) = 0$.",
      "Un produit est nul si l'un des facteurs l'est : $x = 4$ ou $x = -4$.",
      "$x = 4$ ou $x = -4$ — oublier la solution négative est l'erreur classique."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    theme: "neutral",
    text: "Résous $(x - 3)(x + 5) = 0$. Donne la solution NÉGATIVE.",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "Un produit est nul si l'un des facteurs est nul.",
    explanation: exp(
      "Quand le trinôme est déjà factorisé, inutile de calculer le discriminant.",
      "$(x - 3)(x + 5) = 0$ donne $x - 3 = 0$ ou $x + 5 = 0$.",
      "$x = 3$ ou $x = -5$. Attention : le facteur $(x + 5)$ s'annule en $-5$, pas en $5$.",
      "La solution négative est $x = -5$."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "short"],
  },
  {
    kind: "template",
    id: "premiere_sd_rac_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche deux nombres de somme $-b$ et de produit $c$.",
    tags: ["premiere", "maths", "second_degre", "racines", "template"],
    generate: () => {
      // Les racines partent de 2 : dès que l'une vaut 1, la réponse s'écrit
      // « $1$ et $pq$ », c'est-à-dire mot pour mot le piège juste en dessous.
      const p = randomInt(2, 6);
      const q = randomInt(2, 6);
      const b = -(p + q);
      const c = p * q;
      const correct = `$${Math.min(p, q)}$ et $${Math.max(p, q)}$`;
      const choices = [
        correct,
        `$${-p}$ et $${-q}$`,
        `$1$ et $${c}$`,
        `$${p + q}$ et $${c}$`,
      ];
      return {
        text: `Quelles sont les solutions de $x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c} = 0$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche deux nombres dont la somme est $-b$ et le produit $c$.",
          `Somme $= ${p + q}$, produit $= ${c}$.`,
          `$${p} + ${q} = ${p + q}$ et $${p} \\times ${q} = ${c}$.`,
          `Les racines sont $${Math.min(p, q)}$ et $${Math.max(p, q)}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_rac_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 3,
    theme: "neutral",
    hint: "$x^2 = k$ donne $x = \\pm\\sqrt{k}$.",
    tags: ["premiere", "maths", "second_degre", "racines", "template"],
    generate: () => {
      const r = randomInt(2, 9);
      const k = r * r;
      return {
        text: `Résous $x^2 - ${k} = 0$. Donne la solution positive.`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "On isole $x^2$.",
          `$x^2 = ${k}$ donc $x = ${r}$ ou $x = -${r}$.`,
          `La solution positive est $${r}$.`,
          `$x = ${r}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_rac_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 4,
    theme: "neutral",
    hint: "Racine double $= \\dfrac{-b}{2a}$ quand $\\Delta = 0$.",
    tags: ["premiere", "maths", "second_degre", "racines", "template"],
    generate: () => {
      const r = randomInt(2, 7);
      const b = -2 * r;
      const c = r * r;
      return {
        text: `L'équation $x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c} = 0$ a une racine double. Laquelle ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "Ce trinôme est un carré parfait, donc $\\Delta = 0$.",
          `La racine double est $\\dfrac{-b}{2a} = \\dfrac{${-b}}{2}$.`,
          `$= ${r}$.`,
          `$x = ${r}$.`
        ),
      };
    },
  },

  /* ===================== SD_FACTORISATION ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 2,
    theme: "neutral",
    text: "Si un trinôme $ax^2 + bx + c$ a pour racines $x_1$ et $x_2$, sa forme factorisée est :",
    format: "qcm",
    choices: [
      "$a(x - x_1)(x - x_2)$",
      "$(x - x_1)(x - x_2)$",
      "$a(x + x_1)(x + x_2)$",
      "$a(x - x_1) + (x - x_2)$",
    ],
    expected: ["$a(x - x_1)(x - x_2)$"],
    comparator: "mcq_exact",
    hint: "Ne pas oublier le coefficient $a$.",
    explanation: exp(
      "Quand un trinôme a deux racines, il se factorise avec ces racines.",
      "Il faut conserver le coefficient dominant $a$.",
      "$ax^2 + bx + c = a(x - x_1)(x - x_2)$.",
      "$a(x - x_1)(x - x_2)$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 3,
    theme: "neutral",
    text: "Le trinôme $x^2 - 4x$ a une racine évidente. Quelle est sa forme factorisée ?",
    format: "qcm",
    choices: ["$x(x - 4)$", "$(x - 2)^2$", "$x(x + 4)$", "$(x - 4)^2$"],
    expected: ["$x(x - 4)$"],
    comparator: "mcq_exact",
    hint: "Facteur commun $x$.",
    explanation: exp(
      "Quand le coefficient de $x^0$ est nul, $0$ est racine.",
      "On met $x$ en facteur.",
      "$x^2 - 4x = x(x - 4)$.",
      "$x(x - 4)$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour le trinôme $x^2 - 9$, quelle factorisation est correcte ?",
    format: "qcm",
    choices: ["$(x - 3)(x + 3)$", "$(x - 3)^2$", "$(x - 9)(x + 1)$", "$x(x - 9)$"],
    expected: ["$(x - 3)(x + 3)$"],
    comparator: "mcq_exact",
    hint: "Différence de carrés.",
    explanation: exp(
      "On reconnaît une différence de carrés $a^2 - b^2 = (a - b)(a + b)$.",
      "$x^2 - 9 = x^2 - 3^2$.",
      "$= (x - 3)(x + 3)$.",
      "$(x - 3)(x + 3)$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 4,
    theme: "neutral",
    text: "Deux nombres ont pour somme $7$ et pour produit $12$. Quels sont-ils ?",
    format: "qcm",
    choices: ["$3$ et $4$", "$2$ et $6$", "$1$ et $12$", "$5$ et $2$"],
    expected: ["$3$ et $4$"],
    comparator: "mcq_exact",
    hint: "Ce sont les racines de $x^2 - 7x + 12$.",
    explanation: exp(
      "Deux nombres de somme $s$ et produit $p$ sont racines de $x^2 - sx + p$.",
      "Ici $x^2 - 7x + 12$.",
      "$3 + 4 = 7$ et $3 \\times 4 = 12$.",
      "Ce sont $3$ et $4$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 2,
    theme: "neutral",
    text: "Factorise $x^2 + 3x$.",
    format: "qcm",
    choices: ["$x(x + 3)$", "$(x + 3)(x - 3)$", "$x(x - 3)$", "$(x + 1)(x + 3)$"],
    expected: ["$x(x + 3)$"],
    comparator: "mcq_exact",
    hint: "$x$ est en facteur dans les deux termes.",
    explanation: exp(
      "Quand il n'y a pas de terme constant, $x$ est un facteur commun : inutile de calculer $\\Delta$.",
      "$x^2 + 3x = x \\times x + 3 \\times x$.",
      "On met $x$ en facteur : $x(x + 3)$. Les racines sont alors $0$ et $-3$.",
      "$x^2 + 3x = x(x + 3)$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 3,
    theme: "neutral",
    text: "Factorise $x^2 - 16$.",
    format: "qcm",
    choices: ["$(x - 4)(x + 4)$", "$(x - 4)^2$", "$(x - 16)(x + 1)$", "$x(x - 16)$"],
    expected: ["$(x - 4)(x + 4)$"],
    comparator: "mcq_exact",
    hint: "C'est une différence de deux carrés : $a^2 - b^2$.",
    explanation: exp(
      "L'identité remarquable $a^2 - b^2 = (a - b)(a + b)$ évite tout calcul de discriminant.",
      "Ici $x^2 - 16 = x^2 - 4^2$.",
      "Donc $x^2 - 16 = (x - 4)(x + 4)$. Attention : $(x - 4)^2$ vaut $x^2 - 8x + 16$, ce n'est pas la même chose.",
      "$x^2 - 16 = (x - 4)(x + 4)$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 3,
    theme: "neutral",
    text: "Deux nombres ont pour somme $5$ et pour produit $6$. Quels sont-ils ?",
    format: "qcm",
    choices: ["$2$ et $3$", "$1$ et $6$", "$-2$ et $-3$", "$5$ et $6$"],
    expected: ["$2$ et $3$"],
    comparator: "mcq_exact",
    hint: "Ce sont les racines de $x^2 - 5x + 6$.",
    explanation: exp(
      "Deux nombres de somme $s$ et de produit $p$ sont les racines de $x^2 - sx + p$.",
      "Ici il s'agit de $x^2 - 5x + 6$.",
      "$2 + 3 = 5$ et $2 \\times 3 = 6$. ($-2$ et $-3$ donneraient bien le produit $6$, mais leur somme vaut $-5$.)",
      "Ce sont $2$ et $3$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fact_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 5,
    theme: "neutral",
    text: "Le trinôme $x^2 + 2x - 8$ admet $2$ comme racine évidente. Quelle est l'autre racine ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "Le produit des racines vaut $\\dfrac{c}{a} = -8$.",
    explanation: exp(
      "Pour un trinôme $ax^2 + bx + c$, le produit des racines vaut $\\dfrac{c}{a}$.",
      "Ici $\\dfrac{c}{a} = \\dfrac{-8}{1} = -8$, et une racine vaut $2$.",
      "L'autre racine $x_2$ vérifie $2 \\times x_2 = -8$, donc $x_2 = -4$.",
      "L'autre racine est $-4$, et $x^2 + 2x - 8 = (x - 2)(x + 4)$."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "short"],
  },
  {
    kind: "template",
    id: "premiere_sd_fact_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Forme factorisée $(x - x_1)(x - x_2)$.",
    tags: ["premiere", "maths", "second_degre", "factorisation", "template"],
    generate: () => {
      const p = randomInt(1, 6);
      const q = randomInt(1, 6);
      const b = -(p + q);
      const c = p * q;
      const correct = `$(x - ${p})(x - ${q})$`;
      const choices = [
        correct,
        `$(x + ${p})(x + ${q})$`,
        `$(x - ${p})(x + ${q})$`,
        `$(x - ${p + q})(x - ${c})$`,
      ];
      return {
        text: `Factorise $x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche les racines (somme $-b$, produit $c$), puis on factorise.",
          `Racines $${p}$ et $${q}$.`,
          `$x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c} = (x - ${p})(x - ${q})$.`,
          `$(x - ${p})(x - ${q})$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_fact_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 2,
    theme: "neutral",
    hint: "Facteur commun $x$.",
    tags: ["premiere", "maths", "second_degre", "factorisation", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const correct = `$x(x - ${k})$`;
      const choices = [correct, `$x(x + ${k})$`, `$(x - ${k})^2$`, `$(x - ${k})(x + ${k})$`];
      return {
        text: `Factorise $x^2 - ${k}x$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le coefficient constant est nul : $0$ est racine évidente.",
          "On met $x$ en facteur.",
          `$x^2 - ${k}x = x(x - ${k})$.`,
          `$x(x - ${k})$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_fact_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Somme $s$, produit $p$ → racines de $x^2 - sx + p$.",
    tags: ["premiere", "maths", "second_degre", "factorisation", "template"],
    generate: () => {
      const p = randomInt(2, 6);
      const q = randomInt(2, 6);
      const s = p + q;
      const pr = p * q;
      const correct = `$${Math.min(p, q)}$ et $${Math.max(p, q)}$`;
      const choices = [correct, `$1$ et $${pr}$`, `$${s}$ et $${pr}$`, `$${-p}$ et $${-q}$`];
      return {
        text: `Deux nombres ont pour somme $${s}$ et pour produit $${pr}$. Quels sont-ils ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux nombres de somme $s$ et produit $p$ sont racines de $x^2 - sx + p$.",
          `Ici $x^2 - ${s}x + ${pr}$.`,
          `$${p} + ${q} = ${s}$ et $${p} \\times ${q} = ${pr}$.`,
          `Ce sont $${Math.min(p, q)}$ et $${Math.max(p, q)}$.`
        ),
      };
    },
  },

  /* ===================== SD_SIGNE ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Pour un trinôme avec $a > 0$ et deux racines, quel est le signe « entre les racines » ?",
    format: "qcm",
    choices: ["du signe de $-a$ (négatif)", "du signe de $a$ (positif)", "nul partout", "indéterminé"],
    expected: ["du signe de $-a$ (négatif)"],
    comparator: "mcq_exact",
    hint: "« Le trinôme est du signe de $a$ sauf entre les racines. »",
    explanation: exp(
      "Règle du signe : un trinôme est du signe de $a$ à l'extérieur des racines, du signe de $-a$ entre elles.",
      "Ici $a > 0$, donc entre les racines le signe est celui de $-a$.",
      "C'est-à-dire négatif.",
      "Du signe de $-a$ (négatif)."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Le trinôme $x^2 - 5x + 6$ (racines $2$ et $3$, $a > 0$). Quel est son signe pour $x = 2{,}5$ ?",
    format: "qcm",
    choices: ["négatif", "positif", "nul", "on ne peut pas savoir"],
    expected: ["négatif"],
    comparator: "mcq_exact",
    hint: "$2{,}5$ est entre les deux racines.",
    explanation: exp(
      "Le trinôme est du signe de $-a$ entre les racines.",
      "$2{,}5$ est entre $2$ et $3$, et $a = 1 > 0$.",
      "Donc le trinôme est négatif en $x = 2{,}5$.",
      "Négatif."
    ),
    canvas: parabole(1, -5, 6),
    tags: ["premiere", "maths", "second_degre", "signe", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Le trinôme $x^2 - 5x + 6$. Quel est son signe pour $x = 5$ ?",
    format: "qcm",
    choices: ["positif", "négatif", "nul", "indéterminé"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "$5$ est à l'extérieur des racines $2$ et $3$.",
    explanation: exp(
      "À l'extérieur des racines, le trinôme est du signe de $a$.",
      "$5 > 3$ (extérieur) et $a = 1 > 0$.",
      "Donc le trinôme est positif. (Vérif : $25 - 25 + 6 = 6 > 0$.)",
      "Positif."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Un trinôme a $\\Delta < 0$ et $a > 0$. Quel est son signe sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: ["toujours positif", "toujours négatif", "change de signe", "nul partout"],
    expected: ["toujours positif"],
    comparator: "mcq_exact",
    hint: "Pas de racine : le signe ne change pas.",
    explanation: exp(
      "Si $\\Delta < 0$, le trinôme ne s'annule jamais : il garde un signe constant.",
      "Ce signe constant est celui de $a$.",
      "Ici $a > 0$, donc le trinôme est toujours positif.",
      "Toujours positif."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Un trinôme a $\\Delta < 0$ et $a < 0$. Quel est son signe sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "négatif partout",
      "positif partout",
      "positif puis négatif",
      "il change de signe deux fois",
    ],
    expected: ["négatif partout"],
    comparator: "mcq_exact",
    hint: "Pas de racine : la parabole ne touche jamais l'axe des abscisses.",
    explanation: exp(
      "Quand $\\Delta < 0$, le trinôme n'a aucune racine : il ne s'annule jamais et garde donc un signe constant.",
      "Ce signe est celui de $a$ : la parabole est entièrement d'un côté de l'axe.",
      "Ici $a < 0$ : la parabole est tournée vers le bas et reste sous l'axe.",
      "Le trinôme est négatif sur tout $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Le trinôme $-x^2 + 4$ a pour racines $-2$ et $2$. Quel est son signe pour $x = 0$ ?",
    format: "qcm",
    choices: ["positif", "négatif", "nul", "on ne peut pas savoir"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "$a < 0$ : la règle des signes s'inverse par rapport au cas $a > 0$.",
    explanation: exp(
      "Un trinôme est du signe de $a$ à l'extérieur des racines, et du signe contraire entre les racines.",
      "Ici $a = -1 < 0$ : le trinôme est donc POSITIF entre $-2$ et $2$.",
      "$x = 0$ est bien entre les racines. Vérification directe : $-0^2 + 4 = 4 > 0$.",
      "Le trinôme est positif pour $x = 0$."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Un trinôme a $\\Delta = 0$ et $a > 0$. Quel est son signe ?",
    format: "qcm",
    choices: [
      "positif, et nul en sa racine double",
      "positif partout, sans jamais s'annuler",
      "négatif, et nul en sa racine double",
      "il change de signe en sa racine",
    ],
    expected: ["positif, et nul en sa racine double"],
    comparator: "mcq_exact",
    hint: "La parabole touche l'axe des abscisses sans le traverser.",
    explanation: exp(
      "Quand $\\Delta = 0$, le trinôme s'écrit $a(x - x_0)^2$ : il a une seule racine, double.",
      "Le carré $(x - x_0)^2$ est toujours positif ou nul, donc le signe est celui de $a$.",
      "Avec $a > 0$, le trinôme est positif partout SAUF en $x_0$ où il vaut $0$ : la parabole touche l'axe sans le traverser.",
      "Il est positif, et nul en sa racine double."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_signe_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Le trinôme $x^2 - 5x + 6$ (racines $2$ et $3$). Quel est son signe pour $x = 1$ ?",
    format: "qcm",
    choices: ["positif", "négatif", "nul", "on ne peut pas savoir"],
    expected: ["positif"],
    comparator: "mcq_exact",
    hint: "$x = 1$ est-il entre les racines, ou avant ?",
    explanation: exp(
      "Avec $a > 0$, le trinôme est positif à l'extérieur des racines et négatif entre elles.",
      "$x = 1$ est situé AVANT les deux racines $2$ et $3$ : on est à l'extérieur.",
      "Vérification : $1 - 5 + 6 = 2 > 0$.",
      "Le trinôme est positif pour $x = 1$."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_sd_signe_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 3,
    theme: "neutral",
    hint: "Du signe de $a$ à l'extérieur, de $-a$ entre les racines.",
    tags: ["premiere", "maths", "second_degre", "signe", "template"],
    generate: () => {
      const p = randomInt(1, 4);
      const q = p + randomInt(1, 4);
      const entre = randomInt(0, 1) === 1;
      const xval = entre ? p : q + randomInt(1, 3);
      const correct = entre ? "négatif" : "positif";
      return {
        text: `Le trinôme $(x - ${p})(x - ${q})$ (donc racines $${p}$ et $${q}$). Quel est son signe pour $x = ${entre ? `${p}{,}5` : xval}$ ?`,
        format: "qcm",
        choices: ["positif", "négatif", "nul", "indéterminé"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Avec $a = 1 > 0$ : positif à l'extérieur des racines, négatif entre.",
          `La valeur est ${entre ? "entre" : "à l'extérieur des"} racines $${p}$ et $${q}$.`,
          `Donc le trinôme est ${correct}.`,
          `${correct.charAt(0).toUpperCase()}${correct.slice(1)}.`
        ),
      };
    },
  },

  /* ===================== SD_CANONIQUE ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 2,
    theme: "neutral",
    text: "La forme canonique d'un trinôme s'écrit $a(x - \\alpha)^2 + \\beta$. Que représente le point $(\\alpha ; \\beta)$ ?",
    format: "qcm",
    choices: ["le sommet de la parabole", "une racine", "l'ordonnée à l'origine", "le point d'inflexion"],
    expected: ["le sommet de la parabole"],
    comparator: "mcq_exact",
    hint: "$\\alpha = -\\dfrac{b}{2a}$.",
    explanation: exp(
      "La forme canonique fait apparaître le sommet de la parabole.",
      "Le sommet a pour coordonnées $(\\alpha ; \\beta)$.",
      "$\\alpha$ est l'abscisse de l'axe de symétrie.",
      "C'est le sommet de la parabole."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'abscisse de l'axe de symétrie d'une parabole $y = ax^2 + bx + c$ ?",
    format: "qcm",
    choices: [
      "$x = -\\dfrac{b}{2a}$",
      "$x = \\dfrac{b}{2a}$",
      "$x = -\\dfrac{b}{a}$",
      "$x = \\dfrac{c}{a}$",
    ],
    expected: ["$x = -\\dfrac{b}{2a}$"],
    comparator: "mcq_exact",
    hint: "Formule du sommet.",
    explanation: exp(
      "L'axe de symétrie passe par l'abscisse du sommet.",
      "Cette abscisse vaut $\\alpha = -\\dfrac{b}{2a}$.",
      "C'est aussi le milieu des racines quand elles existent.",
      "$x = -\\dfrac{b}{2a}$."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 4x + 1$, quelle est l'abscisse du sommet ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$-\\dfrac{b}{2a}$ avec $a = 1$, $b = -4$.",
    explanation: exp(
      "L'abscisse du sommet est $-\\dfrac{b}{2a}$.",
      "$-\\dfrac{-4}{2 \\times 1} = \\dfrac{4}{2}$.",
      "$= 2$.",
      "L'abscisse du sommet est $2$."
    ),
    canvas: parabole(1, -4, 1),
    tags: ["premiere", "maths", "second_degre", "canonique", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 4x + 1$, quelle est l'ordonnée du sommet ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Calcule $f(2)$.",
    explanation: exp(
      "L'ordonnée du sommet est $f(\\alpha)$ avec $\\alpha = 2$.",
      "$f(2) = 2^2 - 4 \\times 2 + 1 = 4 - 8 + 1$.",
      "$= -3$.",
      "L'ordonnée du sommet est $-3$."
    ),
    canvas: parabole(1, -4, 1),
    tags: ["premiere", "maths", "second_degre", "canonique", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 3,
    theme: "neutral",
    text: "Si $a > 0$, le sommet de la parabole correspond à :",
    format: "qcm",
    choices: ["un minimum", "un maximum", "un point d'inflexion", "une racine"],
    expected: ["un minimum"],
    comparator: "mcq_exact",
    hint: "Parabole tournée vers le haut.",
    explanation: exp(
      "Le signe de $a$ donne l'orientation de la parabole.",
      "Si $a > 0$, la parabole est tournée vers le haut.",
      "Son sommet est donc le point le plus bas : un minimum.",
      "Un minimum."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = 2x^2 - 12x + 1$, quelle est l'abscisse du sommet ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\alpha = -\\dfrac{b}{2a}$, avec $a = 2$.",
    explanation: exp(
      "L'abscisse du sommet est $\\alpha = -\\dfrac{b}{2a}$.",
      "Ici $a = 2$ et $b = -12$ : $\\alpha = -\\dfrac{-12}{2 \\times 2}$.",
      "$= \\dfrac{12}{4} = 3$.",
      "L'abscisse du sommet est $\\alpha = 3$."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = 2x^2 - 12x + 1$ (sommet d'abscisse $3$), quelle est l'ordonnée du sommet ?",
    format: "short",
    expected: ["-17"],
    comparator: "number_equal",
    hint: "$\\beta = f(\\alpha)$ : remplace $x$ par $3$.",
    explanation: exp(
      "L'ordonnée du sommet s'obtient en calculant l'image de $\\alpha$ : $\\beta = f(\\alpha)$.",
      "$f(3) = 2 \\times 3^2 - 12 \\times 3 + 1 = 2 \\times 9 - 36 + 1$.",
      "$= 18 - 36 + 1 = -17$.",
      "L'ordonnée du sommet est $\\beta = -17$."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 3,
    theme: "neutral",
    text: "Si $a < 0$, le sommet de la parabole correspond à :",
    format: "qcm",
    choices: ["un maximum", "un minimum", "une racine double", "un point d'inflexion"],
    expected: ["un maximum"],
    comparator: "mcq_exact",
    hint: "Parabole tournée vers le bas.",
    explanation: exp(
      "Le signe de $a$ donne l'orientation de la parabole.",
      "Si $a < 0$, la parabole est tournée vers le bas.",
      "Son sommet est donc le point le plus haut de la courbe.",
      "C'est un maximum."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $f$ est définie par $f(x) = 3(x - 1)^2 + 4$. Quelles sont les coordonnées du sommet ?",
    format: "qcm",
    choices: ["$(1 ; 4)$", "$(-1 ; 4)$", "$(3 ; 4)$", "$(1 ; -4)$"],
    expected: ["$(1 ; 4)$"],
    comparator: "mcq_exact",
    hint: "Dans $a(x - \\alpha)^2 + \\beta$, le signe devant $\\alpha$ est un moins.",
    explanation: exp(
      "La forme canonique $a(x - \\alpha)^2 + \\beta$ se lit directement : le sommet est $(\\alpha ; \\beta)$.",
      "Ici l'écriture est $3(x - 1)^2 + 4$, donc $\\alpha = 1$ et $\\beta = 4$.",
      "Le piège est de lire $-1$ : la formule contient déjà un signe moins, $(x - 1)$ correspond à $\\alpha = 1$.",
      "Le sommet est $(1 ; 4)$."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_canon_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est l'équation de l'axe de symétrie de la parabole $f(x) = x^2 + 4x + 1$ ?",
    format: "qcm",
    choices: ["$x = -2$", "$x = 2$", "$x = -4$", "$y = -2$"],
    expected: ["$x = -2$"],
    comparator: "mcq_exact",
    hint: "L'axe de symétrie est la droite verticale qui passe par le sommet.",
    explanation: exp(
      "L'axe de symétrie d'une parabole est la droite verticale d'équation $x = \\alpha$, avec $\\alpha = -\\dfrac{b}{2a}$.",
      "Ici $a = 1$ et $b = 4$ : $\\alpha = -\\dfrac{4}{2} = -2$.",
      "C'est une droite VERTICALE, donc son équation est de la forme $x = \\dots$, jamais $y = \\dots$",
      "L'axe de symétrie a pour équation $x = -2$."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_sd_canon_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 3,
    theme: "neutral",
    hint: "Abscisse du sommet $= -\\dfrac{b}{2a}$.",
    tags: ["premiere", "maths", "second_degre", "canonique", "template"],
    generate: () => {
      const alpha = randomInt(1, 5);
      const b = -2 * alpha;
      const c = randomInt(-3, 4);
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$, quelle est l'abscisse du sommet ?`,
        format: "short",
        expected: [String(alpha)],
        comparator: "number_equal",
        explanation: exp(
          "L'abscisse du sommet est $-\\dfrac{b}{2a}$ avec $a = 1$.",
          `$-\\dfrac{${b}}{2} = ${alpha}$.`,
          `L'axe de symétrie est $x = ${alpha}$.`,
          `L'abscisse du sommet est $${alpha}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_canon_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 4,
    theme: "neutral",
    hint: "Ordonnée du sommet $= f(\\alpha)$.",
    tags: ["premiere", "maths", "second_degre", "canonique", "template"],
    generate: () => {
      const alpha = randomInt(1, 4);
      const b = -2 * alpha;
      const c = randomInt(0, 5);
      const ys = alpha * alpha + b * alpha + c; // = c - alpha^2
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c}$, quelle est l'ordonnée du sommet ?`,
        format: "short",
        expected: [String(ys)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule $f$ en l'abscisse du sommet $\\alpha = -\\dfrac{b}{2a}$.",
          `$\\alpha = ${alpha}$, donc $f(${alpha}) = ${alpha}^2 ${b >= 0 ? "+ " + b : "- " + -b} \\times ${alpha} + ${c}$.`,
          `$= ${alpha * alpha} ${b * alpha >= 0 ? "+ " + b * alpha : "- " + -(b * alpha)} + ${c} = ${ys}$.`,
          `L'ordonnée du sommet est $${ys}$.`
        ),
      };
    },
  },

  /* ===================== SD_FORME_FACTORISEE ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_ff_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelles sont les racines de $f(x) = (x - 2)(x + 5)$ ?",
    format: "qcm",
    choices: ["$2$ et $-5$", "$-2$ et $5$", "$2$ et $5$", "$-2$ et $-5$"],
    expected: ["$2$ et $-5$"],
    comparator: "mcq_exact",
    hint: "Cherche ce qui annule chaque facteur : $x + 5 = 0$ donne quoi ?",
    explanation: exp(
      "Sur une forme factorisée, les racines se lisent directement : ce sont les valeurs qui annulent chaque facteur.",
      "$x - 2 = 0$ donne $x = 2$ ; $x + 5 = 0$ donne $x = -5$.",
      "Attention au signe : le facteur $(x + 5)$ s'annule en $-5$, pas en $5$. On prend l'opposé du nombre écrit.",
      "Les racines sont $2$ et $-5$."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ff_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelles sont les racines de $f(x) = 3(x - 2)(x + 1)$ ?",
    format: "qcm",
    choices: [
      "$2$ et $-1$",
      "$3$, $2$ et $-1$",
      "$-2$ et $1$",
      "$\\dfrac{2}{3}$ et $-\\dfrac{1}{3}$",
    ],
    expected: ["$2$ et $-1$"],
    comparator: "mcq_exact",
    hint: "Le coefficient $3$ peut-il s'annuler ?",
    explanation: exp(
      "Un produit est nul si l'un de ses facteurs l'est.",
      "Le facteur constant $3$ ne s'annule jamais : il n'apporte aucune racine.",
      "Seuls $(x-2)$ et $(x+1)$ peuvent s'annuler, en $2$ et $-1$. Le coefficient $a$ change l'ouverture de la parabole, pas l'endroit où elle coupe l'axe.",
      "Les racines sont $2$ et $-1$."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ff_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 5,
    theme: "neutral",
    text: "Sur quel intervalle $f(x) = (x + 2)(x - 6)$ est-il négatif ?",
    format: "qcm",
    choices: [
      "$]-2 ; 6[$",
      "$]-\\infty ; -2[ \\cup ]6 ; +\\infty[$",
      "$]-6 ; 2[$",
      "$\\mathbb{R}$",
    ],
    expected: ["$]-2 ; 6[$"],
    comparator: "mcq_exact",
    hint: "Les racines sont $-2$ et $6$, et le coefficient de $x^2$ est positif.",
    explanation: exp(
      "Un trinôme est du signe de $a$ à l'extérieur des racines, du signe contraire entre elles.",
      "Les racines sont $-2$ et $6$ ; en développant, le coefficient de $x^2$ vaut $1 > 0$.",
      "Le trinôme est donc négatif ENTRE les racines, sur $]-2 ; 6[$.",
      "$f$ est négatif sur $]-2 ; 6[$."
    ),
    canvas: parabole(1, -4, -12),
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ff_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 4,
    theme: "neutral",
    text: "Explique comment lire les racines d'un trinôme donné sous forme factorisée, et pourquoi le coefficient devant n'en donne aucune.",
    format: "open",
    expected: ["annule", "facteur", "produit nul", "constante"],
    comparator: "contains_keyword",
    hint: "Quand un produit est-il nul ?",
    explanation: exp(
      "Un produit est nul si et seulement si l'un au moins de ses facteurs est nul.",
      "On cherche donc, pour chaque facteur contenant $x$, la valeur qui l'annule : $(x - r)$ s'annule en $r$, $(x + r)$ en $-r$.",
      "Le coefficient placé devant est une constante non nulle : il ne s'annule jamais, il ne peut donc pas fournir de racine. Il modifie l'ouverture de la parabole, pas ses points d'intersection avec l'axe.",
      "Les racines viennent uniquement des facteurs contenant $x$."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ff_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment étudier le signe de $f(x) = -3(x - 1)(x + 4)$ sans développer.",
    format: "open",
    expected: ["tableau", "racines", "signe", "négatif"],
    comparator: "contains_keyword",
    hint: "Les racines découpent la droite en trois zones.",
    explanation: exp(
      "Le signe d'un produit se déduit de celui de ses facteurs, sans jamais développer.",
      "Les racines sont $1$ et $-4$ : elles découpent $\\mathbb{R}$ en trois zones. Le coefficient $a = -3$ est négatif.",
      "Le trinôme est donc du signe de $a$ — négatif — à l'extérieur de $[-4 ; 1]$, et positif entre les racines. On le présente dans un tableau de signes.",
      "$f$ est positif sur $]-4 ; 1[$ et négatif ailleurs."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_ff_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 4,
    theme: "neutral",
    hint: "$(x - r)$ s'annule en $r$ ; $(x + r)$ s'annule en $-r$.",
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "template"],
    generate: () => {
      const r1 = randomInt(1, 6);
      const r2 = -randomInt(1, 6);
      const a = pickOne([1, 2, 3, -1, -2]);
      const coef = a === 1 ? "" : a === -1 ? "-" : `${a}`;
      return {
        text: `Quelles sont les racines de $f(x) = ${coef}(x - ${r1})(x + ${-r2})$ ?`,
        format: "qcm",
        choices: [
          `$${r1}$ et $${r2}$`,
          `$${-r1}$ et $${-r2}$`,
          `$${r1}$ et $${-r2}$`,
          `$${a}$, $${r1}$ et $${r2}$`,
        ],
        expected: [`$${r1}$ et $${r2}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Sur une forme factorisée, chaque facteur contenant $x$ fournit une racine ; la constante devant n'en fournit aucune.",
          `$x - ${r1} = 0$ donne $x = ${r1}$ ; $x + ${-r2} = 0$ donne $x = ${r2}$.`,
          `On prend l'opposé du nombre écrit lorsque le signe est un plus.`,
          `Les racines sont $${r1}$ et $${r2}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_ff_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_factorisee",
    difficulty: 5,
    theme: "neutral",
    hint: "Donne les racines, le signe de $a$, puis conclus par zones.",
    tags: ["premiere", "maths", "second_degre", "forme_factorisee", "open", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = (x - 2)(x - 7)$",
          mots: ["2", "7", "entre", "négatif"],
          verdict:
            "Racines $2$ et $7$, avec $a = 1 > 0$ : $f$ est négatif entre les racines, sur $]2 ; 7[$, et positif à l'extérieur.",
        },
        {
          f: "$f(x) = -(x + 1)(x - 5)$",
          mots: ["-1", "5", "positif", "entre"],
          verdict:
            "Racines $-1$ et $5$, avec $a = -1 < 0$ : $f$ est POSITIF entre les racines, sur $]-1 ; 5[$, et négatif à l'extérieur.",
        },
        {
          f: "$f(x) = 2(x + 3)(x + 1)$",
          mots: ["-3", "-1", "négatif", "entre"],
          verdict:
            "Racines $-3$ et $-1$, avec $a = 2 > 0$ : $f$ est négatif sur $]-3 ; -1[$ et positif à l'extérieur.",
        },
        {
          f: "$f(x) = -4(x - 1)(x + 2)$",
          mots: ["1", "-2", "positif", "entre"],
          verdict:
            "Racines $1$ et $-2$, avec $a = -4 < 0$ : $f$ est positif sur $]-2 ; 1[$ et négatif à l'extérieur.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Étudie le signe de ${c.f} sans développer : donne les racines, puis conclus.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Un trinôme est du signe de $a$ à l'extérieur de ses racines, et du signe contraire entre elles.",
          "On lit d'abord les racines sur les facteurs, puis on repère le signe du coefficient $a$.",
          c.verdict,
          "Le signe de $a$ décide de tout : l'oublier inverse le résultat."
        ),
      };
    },
  },

  /* ===================== SD_SOMME_PRODUIT ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_sp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un trinôme $ax^2 + bx + c$ ayant deux racines, que valent leur somme $S$ et leur produit $P$ ?",
    format: "qcm",
    choices: [
      "$S = -\\dfrac{b}{a}$ et $P = \\dfrac{c}{a}$",
      "$S = \\dfrac{b}{a}$ et $P = \\dfrac{c}{a}$",
      "$S = \\dfrac{c}{a}$ et $P = -\\dfrac{b}{a}$",
      "$S = -\\dfrac{b}{2a}$ et $P = \\dfrac{c}{a}$",
    ],
    expected: ["$S = -\\dfrac{b}{a}$ et $P = \\dfrac{c}{a}$"],
    comparator: "mcq_exact",
    hint: "La somme porte un signe moins, le produit non.",
    explanation: exp(
      "En développant $a(x - x_1)(x - x_2)$, on obtient $ax^2 - a(x_1 + x_2)x + a x_1 x_2$.",
      "En identifiant avec $ax^2 + bx + c$ : $b = -a(x_1+x_2)$ et $c = a x_1 x_2$.",
      "D'où $S = -\\dfrac{b}{a}$ et $P = \\dfrac{c}{a}$. Le signe moins ne concerne QUE la somme.",
      "$S = -\\dfrac{b}{a}$ et $P = \\dfrac{c}{a}$."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $x^2 - 7x + 12$, combien vaut la somme des racines ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$S = -\\dfrac{b}{a}$ avec $b = -7$.",
    explanation: exp(
      "On applique $S = -\\dfrac{b}{a}$.",
      "Ici $a = 1$ et $b = -7$ : $S = -\\dfrac{-7}{1}$.",
      "$= 7$. Les deux signes moins s'annulent — c'est là qu'on se trompe le plus souvent.",
      "La somme des racines vaut $7$ (ce sont $3$ et $4$)."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $x^2 - 7x + 12$, combien vaut le produit des racines ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "$P = \\dfrac{c}{a}$.",
    explanation: exp(
      "On applique $P = \\dfrac{c}{a}$.",
      "Ici $a = 1$ et $c = 12$ : $P = \\dfrac{12}{1}$.",
      "$= 12$. Le produit ne porte pas de signe moins.",
      "Le produit des racines vaut $12$ (en effet $3 \\times 4 = 12$)."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $x^2 + 3x - 10$, combien vaut la somme des racines ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "$S = -\\dfrac{b}{a}$ avec $b = 3$ : le résultat est négatif.",
    explanation: exp(
      "On applique $S = -\\dfrac{b}{a}$.",
      "Ici $a = 1$ et $b = 3$ : $S = -\\dfrac{3}{1} = -3$.",
      "Vérification : les racines sont $2$ et $-5$, et $2 + (-5) = -3$.",
      "La somme des racines vaut $-3$."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 5,
    theme: "neutral",
    text: "Le trinôme $x^2 - x - 12$ admet $4$ comme racine. Quelle est l'autre ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "Le produit des racines vaut $\\dfrac{c}{a} = -12$.",
    explanation: exp(
      "Connaissant une racine, le produit permet de trouver l'autre sans calculer le discriminant.",
      "$P = \\dfrac{c}{a} = -12$, et l'une des racines vaut $4$.",
      "L'autre racine $x_2$ vérifie $4 x_2 = -12$, donc $x_2 = -3$. Contrôle par la somme : $4 + (-3) = 1 = -\\dfrac{-1}{1}$.",
      "L'autre racine est $-3$."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $2x^2 - 10x + 8$, combien vaut la somme des racines ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "N'oublie pas de diviser par $a = 2$.",
    explanation: exp(
      "La formule $S = -\\dfrac{b}{a}$ fait intervenir le coefficient $a$, qui ne vaut pas toujours $1$.",
      "Ici $a = 2$ et $b = -10$ : $S = -\\dfrac{-10}{2}$.",
      "$= 5$. Oublier de diviser par $2$ donnerait $10$, soit le double du bon résultat.",
      "La somme des racines vaut $5$ (ce sont $1$ et $4$)."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi servent la somme et le produit des racines ? Donne deux usages concrets.",
    format: "open",
    expected: ["deuxième racine", "vérifier", "discriminant", "mental"],
    comparator: "contains_keyword",
    hint: "Que peut-on faire quand on connaît déjà une racine ?",
    explanation: exp(
      "Somme et produit relient directement les coefficients aux racines, sans passer par le discriminant.",
      "Premier usage : si une racine évidente est repérée, le produit donne immédiatement la seconde.",
      "Second usage : vérifier un résultat. Après avoir calculé deux racines, on contrôle que leur somme vaut $-\\dfrac{b}{a}$ et leur produit $\\dfrac{c}{a}$. Cela permet aussi de factoriser de tête les trinômes simples.",
      "Ils servent à trouver la seconde racine et à vérifier ses calculs."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sp_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 5,
    theme: "neutral",
    text: "Trouve deux nombres dont la somme vaut $9$ et le produit $20$. Explique ta méthode.",
    format: "open",
    expected: ["4", "5", "trinôme", "somme"],
    comparator: "contains_keyword",
    hint: "Ces deux nombres sont les racines de $x^2 - 9x + 20$.",
    explanation: exp(
      "Deux nombres de somme $S$ et de produit $P$ sont les racines de $x^2 - Sx + P$.",
      "On cherche donc les racines de $x^2 - 9x + 20$ : soit par tâtonnement sur les diviseurs de $20$, soit avec le discriminant.",
      "$4 + 5 = 9$ et $4 \\times 5 = 20$ : ce sont $4$ et $5$. (Par le discriminant : $\\Delta = 81 - 80 = 1$.)",
      "Les deux nombres sont $4$ et $5$."
    ),
    tags: ["premiere", "maths", "second_degre", "somme_produit", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_sp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 4,
    theme: "neutral",
    hint: "$S = -\\dfrac{b}{a}$ (attention au signe) et $P = \\dfrac{c}{a}$.",
    tags: ["premiere", "maths", "second_degre", "somme_produit", "template"],
    generate: () => {
      const r1 = randomInt(1, 6);
      const r2 = randomInt(-5, 5) || 2;
      const b = -(r1 + r2);
      const c = r1 * r2;
      const somme = randomInt(0, 1) === 1;
      const ecrit = `x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}`;
      return {
        text: `Pour $${ecrit}$, combien vaut ${somme ? "la somme" : "le produit"} des racines ?`,
        format: "short",
        expected: [String(somme ? r1 + r2 : c)],
        comparator: "number_equal",
        explanation: exp(
          somme
            ? "La somme des racines vaut $S = -\\dfrac{b}{a}$."
            : "Le produit des racines vaut $P = \\dfrac{c}{a}$.",
          `Ici $a = 1$, $b = ${b}$ et $c = ${c}$.`,
          somme
            ? `$S = -\\dfrac{${b}}{1} = ${r1 + r2}$.`
            : `$P = \\dfrac{${c}}{1} = ${c}$.`,
          `Les racines sont $${r1}$ et $${r2}$ : on vérifie bien ${somme ? `$${r1} + ${r2} = ${r1 + r2}$` : `$${r1} \\times ${r2} = ${c}$`}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_sp_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_somme_produit",
    difficulty: 5,
    theme: "neutral",
    hint: "Ces deux nombres sont les racines de $x^2 - Sx + P$.",
    tags: ["premiere", "maths", "second_degre", "somme_produit", "open", "template"],
    generate: () => {
      const r1 = randomInt(2, 8);
      const r2 = randomInt(1, 9);
      const s = r1 + r2;
      const p = r1 * r2;
      return {
        text: `Trouve deux nombres dont la somme vaut $${s}$ et le produit $${p}$. Explique ta méthode.`,
        format: "open",
        expected: [String(r1), String(r2), "trinôme", "somme"],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux nombres de somme $S$ et de produit $P$ sont exactement les racines du trinôme $x^2 - Sx + P$.",
          `On cherche donc les racines de $x^2 - ${s}x + ${p}$, en testant les diviseurs de $${p}$ ou avec le discriminant.`,
          `$${r1} + ${r2} = ${s}$ et $${r1} \\times ${r2} = ${p}$.`,
          `Les deux nombres sont $${r1}$ et $${r2}$.`
        ),
      };
    },
  },

  /* ===================== SD_DEUX_RACINES ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_dr_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 4,
    theme: "neutral",
    text: "Quel trinôme s'annule en $2$ et en $5$ ?",
    format: "qcm",
    choices: [
      "$x^2 - 7x + 10$",
      "$x^2 + 7x + 10$",
      "$x^2 - 7x - 10$",
      "$x^2 - 3x + 10$",
    ],
    expected: ["$x^2 - 7x + 10$"],
    comparator: "mcq_exact",
    hint: "Utilise $x^2 - Sx + P$ avec $S = 7$ et $P = 10$.",
    explanation: exp(
      "Un trinôme de racines $x_1$ et $x_2$ s'écrit $x^2 - Sx + P$, avec $S$ la somme et $P$ le produit.",
      "Ici $S = 2 + 5 = 7$ et $P = 2 \\times 5 = 10$.",
      "D'où $x^2 - 7x + 10$. Vérification : $(x-2)(x-5) = x^2 - 7x + 10$.",
      "Le trinôme est $x^2 - 7x + 10$."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 4,
    theme: "neutral",
    text: "On cherche un trinôme $x^2 + bx + c$ s'annulant en $1$ et $4$. Combien vaut $b$ ?",
    format: "short",
    expected: ["-5"],
    comparator: "number_equal",
    hint: "$b = -S$, où $S$ est la somme des racines.",
    explanation: exp(
      "Dans $x^2 - Sx + P$, le coefficient de $x$ est l'OPPOSÉ de la somme des racines.",
      "$S = 1 + 4 = 5$.",
      "Donc $b = -5$, et le trinôme est $x^2 - 5x + 4$.",
      "$b = -5$."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Combien existe-t-il de trinômes du second degré s'annulant en $2$ et en $5$ ?",
    format: "qcm",
    choices: [
      "une infinité : tous les $a(x-2)(x-5)$ avec $a \\neq 0$",
      "un seul : $x^2 - 7x + 10$",
      "deux",
      "aucun",
    ],
    expected: ["une infinité : tous les $a(x-2)(x-5)$ avec $a \\neq 0$"],
    comparator: "mcq_exact",
    hint: "Multiplier tout le trinôme par $3$ change-t-il ses racines ?",
    explanation: exp(
      "Les racines ne dépendent pas du coefficient $a$ : multiplier un trinôme par une constante non nulle ne déplace pas ses zéros.",
      "$(x-2)(x-5)$, $3(x-2)(x-5)$, $-0{,}5(x-2)(x-5)$ s'annulent tous en $2$ et $5$.",
      "Il y a donc une infinité de solutions, une pour chaque $a \\neq 0$. Elles ont la même forme factorisée, à un facteur près.",
      "Une infinité : tous les $a(x-2)(x-5)$ avec $a \\neq 0$."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Quel trinôme de la forme $x^2 + bx + c$ s'annule en $-2$ et en $3$ ?",
    format: "qcm",
    choices: [
      "$x^2 - x - 6$",
      "$x^2 + x - 6$",
      "$x^2 - x + 6$",
      "$x^2 + 5x - 6$",
    ],
    expected: ["$x^2 - x - 6$"],
    comparator: "mcq_exact",
    hint: "$S = -2 + 3 = 1$ et $P = -2 \\times 3 = -6$.",
    explanation: exp(
      "On applique $x^2 - Sx + P$ en calculant soigneusement les signes.",
      "$S = -2 + 3 = 1$ et $P = (-2) \\times 3 = -6$.",
      "Le trinôme est donc $x^2 - 1x + (-6) = x^2 - x - 6$. Vérification : $(x+2)(x-3) = x^2 - x - 6$.",
      "C'est $x^2 - x - 6$."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 4,
    theme: "neutral",
    text: "On veut un trinôme $x^2 + bx + c$ s'annulant en $-1$ et $-4$. Combien vaut $c$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$c = P$, le produit des racines : attention au produit de deux négatifs.",
    explanation: exp(
      "Dans $x^2 - Sx + P$, le terme constant est le produit des racines.",
      "$P = (-1) \\times (-4)$.",
      "$= 4$, positif, car le produit de deux nombres négatifs est positif. (Et $S = -5$, donc $b = 5$.)",
      "$c = 4$, et le trinôme est $x^2 + 5x + 4$."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Un trinôme $x^2 + bx + c$ a une racine double égale à $3$. Que valent $b$ et $c$ ?",
    format: "qcm",
    choices: [
      "$b = -6$ et $c = 9$",
      "$b = 6$ et $c = 9$",
      "$b = -3$ et $c = 3$",
      "$b = -6$ et $c = -9$",
    ],
    expected: ["$b = -6$ et $c = 9$"],
    comparator: "mcq_exact",
    hint: "Une racine double compte deux fois : $S = 3 + 3$.",
    explanation: exp(
      "Une racine double se traite comme deux racines égales : le trinôme s'écrit $(x - 3)^2$.",
      "$S = 3 + 3 = 6$ et $P = 3 \\times 3 = 9$.",
      "D'où $x^2 - 6x + 9$, soit $b = -6$ et $c = 9$. On vérifie que $\\Delta = 36 - 36 = 0$.",
      "$b = -6$ et $c = 9$."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment construire un trinôme s'annulant en deux nombres donnés, et pourquoi il n'y en a pas qu'un seul.",
    format: "open",
    expected: ["somme", "produit", "infinité", "coefficient"],
    comparator: "contains_keyword",
    hint: "Deux méthodes équivalentes : la forme factorisée, ou $x^2 - Sx + P$.",
    explanation: exp(
      "Deux méthodes mènent au but. Forme factorisée : $a(x - x_1)(x - x_2)$. Ou bien $x^2 - Sx + P$ avec la somme et le produit.",
      "Pour des racines $2$ et $5$ : $(x-2)(x-5)$, ou $x^2 - 7x + 10$ — c'est le même trinôme.",
      "Comme le coefficient $a$ n'influe pas sur les racines, tous les $a(x-2)(x-5)$ conviennent : il y en a une infinité. On choisit $a = 1$ quand on veut le plus simple.",
      "On construit $a(x - x_1)(x - x_2)$ : le choix de $a$ donne une infinité de trinômes."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dr_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Trouve un trinôme dont la parabole coupe l'axe des abscisses en $-3$ et $1$, et dont le sommet est un MAXIMUM. Justifie.",
    format: "open",
    expected: ["négatif", "a < 0", "-3", "racines"],
    comparator: "contains_keyword",
    hint: "Les racines fixent la forme factorisée ; le maximum impose le signe de $a$.",
    explanation: exp(
      "Les points d'intersection avec l'axe des abscisses sont les racines ; l'orientation de la parabole dépend du signe de $a$.",
      "Racines $-3$ et $1$ : le trinôme est de la forme $a(x + 3)(x - 1)$.",
      "Un sommet qui est un maximum impose une parabole tournée vers le bas, donc $a < 0$. Par exemple $-(x+3)(x-1) = -x^2 - 2x + 3$.",
      "Tout trinôme $a(x+3)(x-1)$ avec $a < 0$ convient."
    ),
    tags: ["premiere", "maths", "second_degre", "deux_racines", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_dr_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 4,
    theme: "neutral",
    hint: "$x^2 - Sx + P$ : le coefficient de $x$ est l'OPPOSÉ de la somme.",
    tags: ["premiere", "maths", "second_degre", "deux_racines", "template"],
    generate: () => {
      const r1 = randomInt(-5, 5) || 1;
      // Deux racines opposées annulent la somme : le trinôme s'écrit alors
      // « $+ 0x$ », et les pièges « on a gardé le signe de S » et « on l'a
      // changé » deviennent la même ligne.
      let r2 = randomInt(-5, 5) || 3;
      while (r2 === -r1) r2 = randomInt(-5, 5) || 3;
      const s = r1 + r2;
      const p = r1 * r2;
      const ecrire = (b: number, c: number) =>
        `$x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$`;
      return {
        text: `Quel trinôme de la forme $x^2 + bx + c$ s'annule en $${r1}$ et en $${r2}$ ?`,
        format: "qcm",
        choices: [
          ecrire(-s, p),
          ecrire(s, p),
          ecrire(-s, -p),
          ecrire(s, -p),
        ],
        expected: [ecrire(-s, p)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un trinôme de racines $x_1$ et $x_2$ s'écrit $x^2 - Sx + P$.",
          `$S = ${r1} + ${r2} = ${s}$ et $P = ${r1} \\times ${r2} = ${p}$.`,
          `Le coefficient de $x$ est $-S = ${-s}$, et le terme constant est $P = ${p}$.`,
          `Le trinôme est ${ecrire(-s, p)}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_dr_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_deux_racines",
    difficulty: 5,
    theme: "neutral",
    hint: "Donne la forme factorisée, puis développe pour vérifier.",
    tags: ["premiere", "maths", "second_degre", "deux_racines", "open", "template"],
    generate: () => {
      const r1 = randomInt(-4, 4) || 2;
      const r2 = randomInt(-4, 4) || -3;
      const s = r1 + r2;
      const p = r1 * r2;
      return {
        text: `Construis un trinôme qui s'annule en $${r1}$ et en $${r2}$. Donne sa forme factorisée ET sa forme développée, puis explique pourquoi plusieurs réponses sont possibles.`,
        format: "open",
        expected: [String(p), "factorisée", "infinité", "coefficient"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un trinôme de racines données s'écrit $a(x - x_1)(x - x_2)$, avec $a$ non nul quelconque.",
          `Forme factorisée (pour $a = 1$) : $(x ${r1 >= 0 ? "- " + r1 : "+ " + -r1})(x ${r2 >= 0 ? "- " + r2 : "+ " + -r2})$.`,
          `Forme développée : $x^2 ${-s >= 0 ? "+ " + -s : "- " + s}x ${p >= 0 ? "+ " + p : "- " + -p}$, car $S = ${s}$ et $P = ${p}$.`,
          "Toute valeur de $a \\neq 0$ donne un trinôme différent avec les mêmes racines : il y en a une infinité."
        ),
      };
    },
  },

  /* ===================== SD_COMPLETION_CARRE ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_cc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi est égal $x^2 + 6x$ ?",
    format: "qcm",
    choices: [
      "$(x + 3)^2 - 9$",
      "$(x + 3)^2$",
      "$(x + 6)^2 - 36$",
      "$(x + 3)^2 + 9$",
    ],
    expected: ["$(x + 3)^2 - 9$"],
    comparator: "mcq_exact",
    hint: "$(x+3)^2$ vaut $x^2 + 6x + 9$ : il y a $9$ de trop.",
    explanation: exp(
      "Compléter le carré consiste à reconnaître le début d'une identité remarquable, puis à corriger l'excédent.",
      "$(x + 3)^2 = x^2 + 6x + 9$ : on retrouve bien $x^2 + 6x$, mais avec $9$ en trop.",
      "On retranche donc ce $9$ : $x^2 + 6x = (x + 3)^2 - 9$.",
      "$x^2 + 6x = (x + 3)^2 - 9$."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_cc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 4,
    theme: "neutral",
    text: "On écrit $x^2 + 4x + 1$ sous la forme $(x + 2)^2 + \\beta$. Combien vaut $\\beta$ ?",
    format: "short",
    expected: ["-3"],
    comparator: "number_equal",
    hint: "$(x+2)^2 = x^2 + 4x + 4$ : il faut corriger.",
    explanation: exp(
      "On développe le carré, puis on ajuste la constante pour retrouver le trinôme de départ.",
      "$(x + 2)^2 = x^2 + 4x + 4$, alors qu'il faut $x^2 + 4x + 1$.",
      "Il y a $3$ de trop : $\\beta = 1 - 4 = -3$, donc $x^2 + 4x + 1 = (x+2)^2 - 3$.",
      "$\\beta = -3$ : le sommet de la parabole est le point $(-2 ; -3)$."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_cc_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle identité permet de compléter le carré ?",
    format: "qcm",
    choices: [
      "$x^2 + 2ax = (x + a)^2 - a^2$",
      "$x^2 + 2ax = (x + a)^2$",
      "$x^2 + 2ax = (x + a)^2 + a^2$",
      "$x^2 + 2ax = (x + 2a)^2 - 4a^2$",
    ],
    expected: ["$x^2 + 2ax = (x + a)^2 - a^2$"],
    comparator: "mcq_exact",
    hint: "Le nombre dans la parenthèse est la MOITIÉ du coefficient de $x$.",
    explanation: exp(
      "L'identité $(x + a)^2 = x^2 + 2ax + a^2$ se lit à l'envers pour compléter le carré.",
      "Dans $x^2 + 2ax$, le coefficient de $x$ vaut $2a$ : on met donc sa MOITIÉ, $a$, dans la parenthèse.",
      "Le carré ajoute alors $a^2$ en trop : il faut le retrancher, d'où $x^2 + 2ax = (x + a)^2 - a^2$.",
      "$x^2 + 2ax = (x + a)^2 - a^2$."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_cc_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    text: "On écrit $x^2 - 10x + 30$ sous la forme $(x - 5)^2 + \\beta$. Combien vaut $\\beta$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$(x-5)^2 = x^2 - 10x + 25$.",
    explanation: exp(
      "On développe le carré, puis on ajuste la constante.",
      "$(x - 5)^2 = x^2 - 10x + 25$, alors qu'il faut $x^2 - 10x + 30$.",
      "Il manque $5$ : $\\beta = 30 - 25 = 5$, donc $x^2 - 10x + 30 = (x-5)^2 + 5$.",
      "$\\beta = 5$. Comme $\\beta > 0$ et que le carré est positif, ce trinôme ne s'annule jamais."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_cc_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    text: "Grâce à sa forme canonique $(x - 3)^2 + 2$, que peut-on dire du trinôme $x^2 - 6x + 11$ ?",
    format: "qcm",
    choices: [
      "il est toujours strictement positif : son minimum vaut $2$",
      "il s'annule en $3$",
      "il est négatif entre ses racines",
      "son maximum vaut $2$",
    ],
    expected: ["il est toujours strictement positif : son minimum vaut $2$"],
    comparator: "mcq_exact",
    hint: "Un carré est positif ou nul : que vaut au minimum $(x-3)^2 + 2$ ?",
    explanation: exp(
      "La forme canonique rend le signe et l'extremum immédiats.",
      "$(x - 3)^2 \\ge 0$ pour tout $x$, donc $(x-3)^2 + 2 \\ge 2$.",
      "Le trinôme vaut au minimum $2$, atteint en $x = 3$ : il ne s'annule jamais, et n'a donc aucune racine ($\\Delta < 0$).",
      "Il est toujours strictement positif, avec un minimum de $2$."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_cc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la méthode de complétion du carré sur l'exemple de $x^2 + 10x + 3$.",
    format: "open",
    expected: ["moitié", "5", "retranche", "22"],
    comparator: "contains_keyword",
    hint: "Prends la moitié de $10$, forme le carré, puis corrige.",
    explanation: exp(
      "Compléter le carré, c'est reconstituer une identité remarquable, puis compenser ce qu'on a ajouté.",
      "La moitié de $10$ est $5$ : on écrit $(x + 5)^2 = x^2 + 10x + 25$.",
      "Ce carré apporte $25$, alors qu'il ne faut que $3$ : on retranche $22$. D'où $x^2 + 10x + 3 = (x+5)^2 - 22$.",
      "$x^2 + 10x + 3 = (x + 5)^2 - 22$, et le sommet est $(-5 ; -22)$."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_cc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi sert la forme canonique ? Donne deux renseignements qu'elle fournit immédiatement.",
    format: "open",
    expected: ["sommet", "extremum", "signe", "minimum"],
    comparator: "contains_keyword",
    hint: "Que lit-on directement dans $a(x - \\alpha)^2 + \\beta$ ?",
    explanation: exp(
      "La forme canonique $a(x - \\alpha)^2 + \\beta$ met en évidence ce que les autres formes cachent.",
      "Premier renseignement : le sommet de la parabole, $(\\alpha ; \\beta)$, donc l'extremum de la fonction — minimum si $a > 0$, maximum si $a < 0$.",
      "Second renseignement : le signe. Comme un carré est positif ou nul, on sait par exemple que $(x-3)^2 + 2$ ne s'annule jamais.",
      "Elle donne le sommet (donc l'extremum) et permet de conclure sur le signe."
    ),
    tags: ["premiere", "maths", "second_degre", "completion_carre", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_cc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    hint: "Moitié du coefficient de $x$ dans la parenthèse, puis on corrige la constante.",
    tags: ["premiere", "maths", "second_degre", "completion_carre", "template"],
    generate: () => {
      const demi = randomInt(1, 7);
      const b = 2 * demi;
      const c = randomInt(-10, 25);
      const beta = c - demi * demi;
      const signeB = randomInt(0, 1) === 1 ? 1 : -1;
      const bAff = signeB > 0 ? `+ ${b}` : `- ${b}`;
      const par = signeB > 0 ? `(x + ${demi})^2` : `(x - ${demi})^2`;
      const cAff = c >= 0 ? `+ ${c}` : `- ${-c}`;
      return {
        text: `On écrit $x^2 ${bAff}x ${cAff}$ sous la forme $${par} + \\beta$. Combien vaut $\\beta$ ?`,
        format: "short",
        expected: [String(beta)],
        comparator: "number_equal",
        explanation: exp(
          "On développe le carré, puis on ajuste la constante pour retrouver le trinôme de départ.",
          `$${par} = x^2 ${bAff}x + ${demi * demi}$, alors qu'il faut un terme constant de $${c}$.`,
          `$\\beta = ${c} - ${demi * demi} = ${beta}$.`,
          `$\\beta = ${beta}$ : le sommet a pour ordonnée $${beta}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_cc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_completion_carre",
    difficulty: 5,
    theme: "neutral",
    hint: "Détaille : moitié du coefficient, carré développé, correction de la constante.",
    tags: ["premiere", "maths", "second_degre", "completion_carre", "open", "template"],
    generate: () => {
      const demi = randomInt(2, 6);
      const b = 2 * demi;
      const c = randomInt(1, 20);
      const beta = c - demi * demi;
      return {
        text: `Écris $x^2 + ${b}x + ${c}$ sous forme canonique en détaillant la méthode de complétion du carré.`,
        format: "open",
        expected: [String(demi), "moitié", "carré", String(beta)],
        comparator: "contains_keyword",
        explanation: exp(
          "On reconstitue une identité remarquable, puis on compense ce que le carré a ajouté en trop.",
          `La moitié de $${b}$ est $${demi}$ : on écrit $(x + ${demi})^2 = x^2 + ${b}x + ${demi * demi}$.`,
          `Le carré apporte $${demi * demi}$, alors qu'il faut $${c}$ : on ajuste de $${beta}$.`,
          `$x^2 + ${b}x + ${c} = (x + ${demi})^2 ${beta >= 0 ? "+ " + beta : "- " + -beta}$, sommet $(${-demi} ; ${beta})$.`
        ),
      };
    },
  },

  /* ===================== SD_INEQUATION ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_ineq_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    text: "Résous $x^2 > 4$.",
    format: "qcm",
    choices: [
      "$]-\\infty ; -2[ \\cup ]2 ; +\\infty[$",
      "$x > 2$",
      "$]-2 ; 2[$",
      "$x > 2$ ou $x > -2$",
    ],
    expected: ["$]-\\infty ; -2[ \\cup ]2 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "Ramène tout d'un côté : $x^2 - 4 > 0$. N'oublie pas les négatifs.",
    explanation: exp(
      "On ne prend jamais la racine carrée des deux membres d'une inéquation : on se ramène à une étude de signe.",
      "$x^2 > 4$ équivaut à $x^2 - 4 > 0$, soit $(x-2)(x+2) > 0$, de racines $-2$ et $2$.",
      "Avec $a > 0$, le trinôme est positif à l'EXTÉRIEUR des racines. Répondre « $x > 2$ » oublie tous les nombres très négatifs, comme $-10$, dont le carré vaut $100 > 4$.",
      "$S = ]-\\infty ; -2[ \\cup ]2 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "second_degre", "inequation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ineq_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    text: "Combien y a-t-il d'entiers vérifiant $x^2 - 9 < 0$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "L'ensemble solution est $]-3 ; 3[$ : compte les entiers qu'il contient.",
    explanation: exp(
      "On résout d'abord l'inéquation, puis on compte les entiers de l'intervalle obtenu.",
      "$x^2 - 9 < 0$ donne $]-3 ; 3[$, bornes exclues.",
      "Les entiers concernés sont $-2$, $-1$, $0$, $1$, $2$ : cela fait $5$ entiers. $-3$ et $3$ sont exclus car l'inégalité est stricte.",
      "Il y a $5$ entiers solutions."
    ),
    tags: ["premiere", "maths", "second_degre", "inequation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ineq_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    text: "Résous $x^2 + x + 1 \\le 0$.",
    format: "qcm",
    choices: [
      "aucune solution",
      "$\\mathbb{R}$",
      "$[-1 ; 0]$",
      "$\\{0\\}$",
    ],
    expected: ["aucune solution"],
    comparator: "mcq_exact",
    hint: "Calcule le discriminant avant toute chose.",
    explanation: exp(
      "Quand $\\Delta < 0$, le trinôme ne s'annule jamais et garde le signe de $a$.",
      "$\\Delta = 1 - 4 = -3 < 0$, et $a = 1 > 0$ : le trinôme est strictement POSITIF partout.",
      "Il ne peut donc jamais être négatif ou nul : l'inéquation n'a aucune solution.",
      "$S = \\emptyset$."
    ),
    tags: ["premiere", "maths", "second_degre", "inequation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ineq_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    text: "Décris la méthode complète pour résoudre une inéquation du second degré.",
    format: "open",
    expected: ["racines", "signe", "tableau", "zéro"],
    comparator: "contains_keyword",
    hint: "Quatre étapes, dont une à ne jamais sauter : tout ramener d'un côté.",
    explanation: exp(
      "Une inéquation du second degré se résout par une étude de signe, jamais par une racine carrée.",
      "Étape 1 : tout ramener d'un côté pour se ramener à une comparaison à $0$. Étape 2 : calculer le discriminant et les racines.",
      "Étape 3 : appliquer la règle du signe — du signe de $a$ à l'extérieur des racines, du signe contraire entre elles — dans un tableau de signes. Étape 4 : conclure en surveillant si les bornes sont incluses.",
      "On ramène à $0$, on cherche les racines, on étudie le signe, on conclut."
    ),
    tags: ["premiere", "maths", "second_degre", "inequation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_ineq_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève résout $x^2 > 9$ et répond « $x > 3$ ». Explique son erreur et donne la bonne réponse.",
    format: "open",
    expected: ["-3", "négatif", "extérieur", "racine carrée"],
    comparator: "contains_keyword",
    hint: "Teste sa réponse avec $x = -10$.",
    explanation: exp(
      "L'élève a pris la racine carrée des deux membres, ce qui n'est pas permis pour une inéquation : cela fait disparaître les solutions négatives.",
      "Contre-exemple : $x = -10$ vérifie $x^2 = 100 > 9$, alors qu'il ne vérifie pas $x > 3$.",
      "Il fallait écrire $x^2 - 9 > 0$, donc $(x-3)(x+3) > 0$ : le trinôme est positif à l'extérieur des racines.",
      "La solution est $]-\\infty ; -3[ \\cup ]3 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "second_degre", "inequation", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_ineq_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    hint: "Avec $a > 0$ : négatif ENTRE les racines, positif à l'EXTÉRIEUR.",
    tags: ["premiere", "maths", "second_degre", "inequation", "template"],
    generate: () => {
      const r1 = randomInt(-5, 1);
      const r2 = r1 + randomInt(2, 6);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const negatif = randomInt(0, 1) === 1;
      const ecrit = `x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}`;
      const entre = `$]${r1} ; ${r2}[$`;
      const exterieur = `$]-\\infty ; ${r1}[ \\cup ]${r2} ; +\\infty[$`;
      return {
        text: `Résous l'inéquation $${ecrit} ${negatif ? "<" : ">"} 0$.`,
        format: "qcm",
        choices: negatif
          ? [entre, exterieur, `$[${r1} ; ${r2}]$`, "$\\mathbb{R}$"]
          : [exterieur, entre, `$]${r2} ; +\\infty[$`, "$\\mathbb{R}$"],
        expected: [negatif ? entre : exterieur],
        comparator: "mcq_exact",
        explanation: exp(
          "Avec $a > 0$, le trinôme est négatif entre ses racines et positif à l'extérieur.",
          `Les racines sont $${r1}$ et $${r2}$ (somme $${r1 + r2}$, produit $${c}$).`,
          negatif
            ? `On cherche où le trinôme est négatif : c'est entre les racines.`
            : `On cherche où le trinôme est positif : c'est à l'extérieur des racines.`,
          `$S = ${negatif ? entre : exterieur}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_ineq_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_inequation",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène à zéro, cherche les racines, étudie le signe, conclus sur les bornes.",
    tags: ["premiere", "maths", "second_degre", "inequation", "open", "template"],
    generate: () => {
      const cas = [
        {
          ineq: "$x^2 \\le 16$",
          mots: ["-4", "4", "entre", "extérieur"],
          methode:
            "$x^2 - 16 \\le 0$, soit $(x-4)(x+4) \\le 0$ : racines $-4$ et $4$, $a > 0$, donc négatif entre les racines. $S = [-4 ; 4]$ — ne pas oublier les valeurs négatives.",
        },
        {
          ineq: "$x^2 - 5x + 6 > 0$",
          mots: ["2", "3", "extérieur", "racines"],
          methode:
            "Racines $2$ et $3$ (somme $5$, produit $6$), $a > 0$ : le trinôme est positif à l'extérieur. $S = ]-\\infty ; 2[ \\cup ]3 ; +\\infty[$.",
        },
        {
          ineq: "$-x^2 + 9 < 0$",
          mots: ["-3", "3", "a < 0", "extérieur"],
          methode:
            "Racines $-3$ et $3$, mais $a = -1 < 0$ : le trinôme est NÉGATIF à l'extérieur des racines. $S = ]-\\infty ; -3[ \\cup ]3 ; +\\infty[$.",
        },
        {
          ineq: "$x^2 + 4 < 0$",
          mots: ["discriminant", "aucune", "positif", "jamais"],
          methode:
            "$\\Delta = 0 - 16 = -16 < 0$ et $a > 0$ : le trinôme est strictement positif partout. Il n'est jamais négatif : $S = \\emptyset$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Résous ${c.ineq} en détaillant ta méthode.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "On ramène tout d'un côté, on cherche les racines, puis on applique la règle du signe.",
          "Le signe de $a$ décide : du signe de $a$ à l'extérieur des racines, du signe contraire entre elles.",
          c.methode,
          "Dernier réflexe : vérifier si les bornes sont incluses, selon que l'inégalité est stricte ou large."
        ),
      };
    },
  },

  /* ===================== SD_FORME_ADAPTEE ===================== */
  {
    kind: "fixed",
    id: "premiere_sd_fa_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle forme d'un trinôme permet de lire ses RACINES immédiatement ?",
    format: "qcm",
    choices: ["la forme factorisée", "la forme canonique", "la forme développée", "aucune"],
    expected: ["la forme factorisée"],
    comparator: "mcq_exact",
    hint: "Quelle forme est un produit ?",
    explanation: exp(
      "Chaque forme d'un trinôme met en évidence une information différente.",
      "La forme factorisée $a(x - x_1)(x - x_2)$ est un produit : il suffit d'annuler chaque facteur.",
      "Les racines $x_1$ et $x_2$ s'y lisent directement, sans aucun calcul.",
      "C'est la forme factorisée."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle forme permet de lire le SOMMET de la parabole immédiatement ?",
    format: "qcm",
    choices: ["la forme canonique", "la forme factorisée", "la forme développée", "aucune"],
    expected: ["la forme canonique"],
    comparator: "mcq_exact",
    hint: "$a(x - \\alpha)^2 + \\beta$ : que représentent $\\alpha$ et $\\beta$ ?",
    explanation: exp(
      "La forme canonique s'écrit $a(x - \\alpha)^2 + \\beta$.",
      "Le couple $(\\alpha ; \\beta)$ donne directement les coordonnées du sommet.",
      "C'est donc elle qu'on utilise pour un extremum : minimum si $a > 0$, maximum si $a < 0$.",
      "C'est la forme canonique."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle forme permet de lire $f(0)$ le plus vite ?",
    format: "qcm",
    choices: [
      "la forme développée : $f(0) = c$",
      "la forme factorisée",
      "la forme canonique",
      "aucune : il faut toujours calculer",
    ],
    expected: ["la forme développée : $f(0) = c$"],
    comparator: "mcq_exact",
    hint: "Dans $ax^2 + bx + c$, que reste-t-il quand $x = 0$ ?",
    explanation: exp(
      "$f(0)$ est l'ordonnée du point où la parabole coupe l'axe des ordonnées.",
      "Dans la forme développée $ax^2 + bx + c$, remplacer $x$ par $0$ annule les deux premiers termes.",
      "Il reste $f(0) = c$ : le terme constant se lit directement. Les autres formes exigeraient un petit calcul.",
      "C'est la forme développée : $f(0) = c$."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 4,
    theme: "neutral",
    text: "Pour étudier le SIGNE d'un trinôme, quelle forme est la plus commode ?",
    format: "qcm",
    choices: [
      "la forme factorisée",
      "la forme développée",
      "la forme canonique",
      "peu importe",
    ],
    expected: ["la forme factorisée"],
    comparator: "mcq_exact",
    hint: "Le signe d'un produit se déduit du signe de chaque facteur.",
    explanation: exp(
      "Le signe d'un produit s'obtient en combinant les signes de ses facteurs.",
      "La forme factorisée donne les racines, qui découpent la droite en zones, et permet de remplir un tableau de signes.",
      "La forme canonique peut aussi servir dans le cas $\\Delta < 0$ : $(x - \\alpha)^2 + \\beta$ garde alors un signe constant. Mais dès qu'il y a des racines, la factorisée est la plus directe.",
      "C'est la forme factorisée."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 5,
    theme: "neutral",
    text: "Pour trouver l'aire maximale d'un enclos modélisée par $A(x) = -x^2 + 20x$, quelle forme choisir ?",
    format: "qcm",
    choices: [
      "la forme canonique, qui donne le maximum",
      "la forme factorisée, qui donne les racines",
      "la forme développée, telle quelle",
      "aucune : il faut dériver obligatoirement",
    ],
    expected: ["la forme canonique, qui donne le maximum"],
    comparator: "mcq_exact",
    hint: "On cherche un extremum, pas des racines.",
    explanation: exp(
      "On choisit la forme selon la question posée : ici, un maximum.",
      "La forme canonique $-(x - 10)^2 + 100$ donne le sommet $(10 ; 100)$ : comme $a < 0$, c'est un maximum.",
      "L'aire maximale vaut donc $100$, atteinte pour $x = 10$. La forme factorisée $-x(x - 20)$ donnerait les racines $0$ et $20$, c'est-à-dire les cas où l'aire est NULLE — une autre question.",
      "La forme canonique, qui donne directement le maximum."
    ),
    canvas: parabole(-1, 20, 0),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 5,
    theme: "neutral",
    text: "Les trois formes d'un même trinôme donnent-elles la même fonction ?",
    format: "qcm",
    choices: [
      "oui : ce sont trois écritures d'une même fonction",
      "non : elles ont des racines différentes",
      "non : seule la forme développée est correcte",
      "oui, mais seulement si $\\Delta > 0$",
    ],
    expected: ["oui : ce sont trois écritures d'une même fonction"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si on développe la forme canonique ?",
    explanation: exp(
      "Développée, canonique et factorisée sont trois ÉCRITURES de la même fonction.",
      "En développant $(x-3)^2 - 4$, on retrouve $x^2 - 6x + 5$ ; en factorisant, $(x-1)(x-5)$. Les valeurs prises sont identiques pour tout $x$.",
      "Elles ont donc les mêmes racines, le même sommet, la même courbe. Seule change l'information qu'elles rendent LISIBLE. À noter : la forme factorisée n'existe que si $\\Delta \\ge 0$.",
      "Oui : trois écritures, une seule fonction."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 6x + 5$, quelle forme choisirais-tu pour résoudre $f(x) = 0$, et laquelle pour trouver le minimum ? Justifie.",
    format: "open",
    expected: ["factorisée", "canonique", "racines", "sommet"],
    comparator: "contains_keyword",
    hint: "Une question sur les zéros, une question sur le sommet : deux formes différentes.",
    explanation: exp(
      "On choisit l'écriture qui rend visible l'information demandée.",
      "Pour résoudre $f(x) = 0$ : la forme factorisée $(x-1)(x-5)$ donne immédiatement les racines $1$ et $5$.",
      "Pour le minimum : la forme canonique $(x-3)^2 - 4$ donne le sommet $(3 ; -4)$, donc un minimum de $-4$ atteint en $3$.",
      "Factorisée pour les racines, canonique pour le minimum."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fa_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 5,
    theme: "reunion",
    text: "Le bénéfice d'un producteur de vanille est $B(x) = -2x^2 + 40x - 150$, où $x$ est le nombre de kilos vendus. Quelle forme utiliser pour connaître le bénéfice maximal ? Et pour savoir à partir de quand il devient positif ?",
    format: "open",
    expected: ["canonique", "factorisée", "maximum", "signe"],
    comparator: "contains_keyword",
    hint: "Deux questions différentes appellent deux formes différentes.",
    explanation: exp(
      "Chaque question appelle la forme qui rend son information lisible.",
      "Bénéfice maximal : forme canonique $-2(x - 10)^2 + 50$. Le sommet $(10 ; 50)$ donne un maximum de $50$ € pour $10$ kg vendus, car $a < 0$.",
      "Bénéfice positif : forme factorisée $-2(x - 5)(x - 15)$. Les racines $5$ et $15$ montrent que le bénéfice est positif entre $5$ et $15$ kg — en dessous, la production ne couvre pas les frais.",
      "Canonique pour le maximum, factorisée pour le signe."
    ),
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_fa_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 4,
    theme: "neutral",
    hint: "Racines et signe : factorisée. Sommet et extremum : canonique. $f(0)$ : développée.",
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "template"],
    generate: () => {
      const cas = [
        { question: "résoudre $f(x) = 0$", bon: "la forme factorisée" },
        { question: "trouver le maximum de $f$", bon: "la forme canonique" },
        { question: "calculer $f(0)$", bon: "la forme développée" },
        { question: "dresser le tableau de signes de $f$", bon: "la forme factorisée" },
        { question: "trouver l'axe de symétrie de la parabole", bon: "la forme canonique" },
        { question: "lire l'ordonnée du point d'intersection avec l'axe des ordonnées", bon: "la forme développée" },
        { question: "montrer que $f$ ne s'annule jamais", bon: "la forme canonique" },
      ];
      const c = pickOne(cas);
      const autres = [
        "la forme factorisée",
        "la forme canonique",
        "la forme développée",
      ].filter((f) => f !== c.bon);
      return {
        text: `Pour ${c.question}, quelle forme du trinôme est la plus adaptée ?`,
        format: "qcm",
        choices: [c.bon, ...autres, "peu importe la forme"],
        expected: [c.bon],
        comparator: "mcq_exact",
        explanation: exp(
          "Les trois formes décrivent la même fonction, mais chacune rend une information immédiatement lisible.",
          "Factorisée : les racines et le signe. Canonique : le sommet, l'extremum, l'axe de symétrie, et le signe quand il n'y a pas de racine. Développée : le terme constant, donc $f(0)$.",
          `Ici, la question porte sur un élément que donne ${c.bon}.`,
          `On choisit ${c.bon}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_sd_fa_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_forme_adaptee",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme la forme choisie, puis dis ce qu'elle rend visible.",
    tags: ["premiere", "maths", "second_degre", "forme_adaptee", "open", "template"],
    generate: () => {
      const cas = [
        {
          contexte:
            "la hauteur d'un ballon est $h(t) = -5t^2 + 20t$ et on cherche la hauteur maximale",
          mots: ["canonique", "sommet", "maximum", "20"],
          reponse:
            "Forme canonique : $-5(t - 2)^2 + 20$. Le sommet $(2 ; 20)$ donne une hauteur maximale de $20$ m atteinte à $t = 2$ s, car $a < 0$.",
        },
        {
          contexte:
            "un bénéfice $B(x) = x^2 - 8x + 12$ et on cherche quand il s'annule",
          mots: ["factorisée", "racines", "2", "6"],
          reponse:
            "Forme factorisée : $(x - 2)(x - 6)$. Le bénéfice s'annule pour $x = 2$ et $x = 6$, et il est négatif entre ces deux valeurs.",
        },
        {
          contexte:
            "une fonction $f(x) = x^2 + 2x + 5$ dont on veut montrer qu'elle est toujours positive",
          mots: ["canonique", "carré", "4", "jamais"],
          reponse:
            "Forme canonique : $(x + 1)^2 + 4$. Un carré étant positif ou nul, $f(x) \\ge 4 > 0$ : la fonction ne s'annule jamais.",
        },
        {
          contexte:
            "une parabole $f(x) = 2x^2 - 4x - 6$ dont on veut le point d'intersection avec l'axe des ordonnées",
          mots: ["développée", "-6", "f(0)", "constant"],
          reponse:
            "Forme développée, telle quelle : $f(0) = -6$. La parabole coupe l'axe des ordonnées en $(0 ; -6)$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Quelle forme du trinôme choisirais-tu dans ce cas : ${c.contexte} ? Justifie et conclus.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "On choisit la forme qui rend l'information demandée immédiatement lisible, plutôt que de calculer à l'aveugle.",
          "Racines et signe : factorisée. Sommet, extremum, signe sans racine : canonique. Terme constant : développée.",
          c.reponse,
          "Savoir passer d'une forme à l'autre coûte moins cher que de résoudre le problème dans la mauvaise écriture."
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Les cinq micro-compétences de ce chapitre avaient été écrites avant qu'on
     abandonne le compteur d'items fixes : aucune n'avait de question ouverte.
     Deux ouvertes fixes + un TEMPLATE ouvert par micro.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_sd_dis_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 5,
    theme: "neutral",
    text: "Que peut-on savoir d'une équation du second degré rien qu'avec le SIGNE du discriminant, sans finir la résolution ?",
    format: "open",
    expected: ["nombre de solutions", "deux", "une", "aucune", "signe"],
    comparator: "contains_keyword",
    hint: "Trois cas, selon que $\\Delta$ est positif, nul ou négatif.",
    explanation: exp(
      "Le discriminant $\\Delta = b^2 - 4ac$ est ce qui se trouve sous la racine carrée dans la formule des solutions : son signe décide donc si cette racine existe.",
      "Trois cas seulement : $\\Delta > 0$, $\\Delta = 0$, $\\Delta < 0$.",
      "Si $\\Delta > 0$, la racine existe et se compte deux fois (une fois en plus, une fois en moins) : deux solutions distinctes. Si $\\Delta = 0$, la racine vaut $0$ et les deux formules donnent le même nombre : une solution double. Si $\\Delta < 0$, aucune racine carrée n'existe : pas de solution réelle.",
      "Le signe seul donne le NOMBRE de solutions — et graphiquement, le nombre de points où la parabole coupe l'axe des abscisses."
    ),
    tags: ["premiere", "maths", "second_degre", "discriminant", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_dis_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule le discriminant de $x^2 - 4x + 4$ et trouve $\\Delta = 0$. Que se passe-t-il, géométriquement ?",
    format: "open",
    expected: ["tangente", "touche", "un seul point", "sommet", "double"],
    comparator: "contains_keyword",
    hint: "Combien de fois la parabole rencontre-t-elle l'axe des abscisses ?",
    explanation: exp(
      "Les solutions de $f(x) = 0$ sont les abscisses des points où la parabole rencontre l'axe des abscisses.",
      "Un discriminant nul donne une seule solution, ici $x = 2$ : la parabole ne rencontre l'axe qu'en UN point.",
      "Elle ne le traverse donc pas : elle le touche et repart du même côté. Ce point de contact est exactement le sommet, et l'axe des abscisses y est tangent à la courbe. On dit que $2$ est une racine double, et le trinôme s'écrit $(x-2)^2$.",
      "$\\Delta = 0$ signifie que la parabole est POSÉE sur l'axe : elle le touche en son sommet sans le franchir."
    ),
    canvas: parabole(1, -4, 4),
    tags: ["premiere", "maths", "second_degre", "discriminant", "canvas", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_dis_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_discriminant",
    difficulty: 5,
    theme: "neutral",
    hint: "$\\Delta = b^2 - 4ac$ — attention aux signes des coefficients.",
    tags: ["premiere", "maths", "second_degre", "discriminant", "open", "template"],
    generate: () => {
      const cas = [
        { a: 1, b: -5, c: 6, d: 1, n: "deux solutions distinctes" },
        { a: 1, b: -6, c: 9, d: 0, n: "une solution double" },
        { a: 1, b: 2, c: 5, d: -16, n: "aucune solution réelle" },
        { a: 2, b: -4, c: 2, d: 0, n: "une solution double" },
        { a: 1, b: 1, c: -6, d: 25, n: "deux solutions distinctes" },
        { a: 3, b: 1, c: 4, d: -47, n: "aucune solution réelle" },
      ];
      const c = pickOne(cas);
      const ecrire = (v: number, lettre: string) =>
        v === 1 ? lettre : v === -1 ? "-" + lettre : `${v}${lettre}`;
      return {
        text: `Sans résoudre l'équation, dis combien de solutions admet $${ecrire(c.a, "x^2")} ${c.b >= 0 ? "+ " + ecrire(c.b, "x") : "- " + ecrire(-c.b, "x")} ${c.c >= 0 ? "+ " + c.c : "- " + -c.c} = 0$, et explique comment tu le sais.`,
        format: "open",
        expected: [String(c.d), "discriminant", c.d > 0 ? "deux" : c.d === 0 ? "double" : "aucune", "signe"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le nombre de solutions d'une équation du second degré se lit sur le SIGNE du discriminant $\\Delta = b^2 - 4ac$.",
          `Ici $a = ${c.a}$, $b = ${c.b}$ et $c = ${c.c}$ : $\\Delta = (${c.b})^2 - 4 \\times ${c.a} \\times (${c.c})$.`,
          `$\\Delta = ${c.d}$, un nombre ${c.d > 0 ? "strictement positif" : c.d === 0 ? "nul" : "strictement négatif"}.`,
          `L'équation admet donc ${c.n} — et il n'a pas été nécessaire de les calculer.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_sd_rac_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi l'équation $x^2 = 9$ a-t-elle DEUX solutions, alors qu'on écrit souvent $\\sqrt{9} = 3$ ?",
    format: "open",
    expected: ["-3", "oppose", "opposé", "deux", "positif", "carre"],
    comparator: "contains_keyword",
    hint: "Combien de nombres ont pour carré $9$ ?",
    explanation: exp(
      "Il faut distinguer deux questions : « quels nombres ont pour carré $9$ ? » et « que vaut $\\sqrt{9}$ ? ».",
      "Deux nombres ont pour carré $9$ : $3$ et $-3$, car un carré efface le signe. L'équation $x^2 = 9$ a donc bien deux solutions.",
      "Mais $\\sqrt{9}$ désigne par convention le nombre POSITIF dont le carré vaut $9$ : c'est $3$, et seulement $3$. La racine carrée est une fonction, elle ne peut pas rendre deux valeurs.",
      "On écrit donc $x = 3$ OU $x = -3$, et non $x = \\sqrt{9}$. L'oubli de la solution négative est l'erreur la plus fréquente du chapitre."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "piege", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_rac_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 5,
    theme: "neutral",
    text: "Décris la démarche complète pour résoudre une équation du second degré, de la mise en forme jusqu'à la conclusion.",
    format: "open",
    expected: ["= 0", "identifier", "discriminant", "formule", "conclure"],
    comparator: "contains_keyword",
    hint: "Quatre étapes, dont une qu'on oublie souvent au tout début.",
    explanation: exp(
      "Une équation du second degré se résout toujours dans le même ordre, et la première étape est celle qu'on saute le plus souvent.",
      "Étape 1 — tout ramener du même côté pour obtenir la forme $ax^2 + bx + c = 0$. Étape 2 — identifier $a$, $b$ et $c$ AVEC leurs signes.",
      "Étape 3 — calculer $\\Delta = b^2 - 4ac$ et regarder son signe. Étape 4 — conclure : deux solutions $\\dfrac{-b \\pm \\sqrt{\\Delta}}{2a}$ si $\\Delta > 0$, une seule $\\dfrac{-b}{2a}$ si $\\Delta = 0$, aucune si $\\Delta < 0$.",
      "Sans l'étape 1, on identifie de mauvais coefficients et tout le reste est faux — même avec une formule parfaitement appliquée."
    ),
    tags: ["premiere", "maths", "second_degre", "racines", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_rac_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_racines",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène d'abord tout du même côté, puis identifie $a$, $b$ et $c$ avec leurs signes.",
    tags: ["premiere", "maths", "second_degre", "racines", "open", "template"],
    generate: () => {
      const cas = [
        { eq: "x^2 = 5x - 6", forme: "x^2 - 5x + 6 = 0", sols: "2 et 3" },
        { eq: "x^2 + 3x = 4", forme: "x^2 + 3x - 4 = 0", sols: "1 et -4" },
        { eq: "2x^2 = 8", forme: "2x^2 - 8 = 0", sols: "2 et -2" },
        { eq: "x^2 + 6 = 5x", forme: "x^2 - 5x + 6 = 0", sols: "2 et 3" },
        { eq: "x^2 = 2x + 15", forme: "x^2 - 2x - 15 = 0", sols: "5 et -3" },
      ];
      const c = pickOne(cas);
      return {
        text: `Résous l'équation $${c.eq}$ en rédigeant chaque étape de ta démarche.`,
        format: "open",
        expected: ["= 0", "discriminant", "delta", "identifie", c.sols.split(" et ")[0]],
        comparator: "contains_keyword",
        explanation: exp(
          "On ne peut identifier $a$, $b$ et $c$ que sur une équation écrite sous la forme $ax^2 + bx + c = 0$ : c'est donc par là qu'on commence.",
          `On ramène tout du même côté : $${c.eq}$ devient $${c.forme}$.`,
          "On identifie ensuite les coefficients avec leurs signes, on calcule le discriminant, et on applique la formule correspondant à son signe.",
          `Les solutions sont $${c.sols}$ — et l'on n'oublie pas la seconde, même quand la première tombe juste.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_sd_fac_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 5,
    theme: "neutral",
    text: "À quoi sert la forme factorisée d'un trinôme, puisqu'on a déjà sa forme développée ?",
    format: "open",
    expected: ["racines", "produit nul", "signe", "resoudre", "résoudre", "lit"],
    comparator: "contains_keyword",
    hint: "Que devient un produit lorsqu'il est nul ?",
    explanation: exp(
      "Les trois formes d'un trinôme donnent la même fonction, mais chacune rend une information immédiate.",
      "La forme factorisée $a(x - x_1)(x - x_2)$ fait apparaître un PRODUIT.",
      "Or un produit est nul si et seulement si l'un de ses facteurs l'est : les racines se lisent directement, sans calcul. Et le signe de chaque facteur étant facile à étudier, le tableau de signes se dresse aussitôt.",
      "Développée pour calculer une image, canonique pour le sommet, factorisée pour les racines et le signe : on choisit selon la question posée."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_fac_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève factorise $x^2 - 7x + 12$ en $(x - 3)(x - 4)$. Comment peut-il vérifier en deux secondes, sans tout redévelopper ?",
    format: "open",
    expected: ["somme", "produit", "12", "7", "verifie", "vérifie"],
    comparator: "contains_keyword",
    hint: "Que valent la somme et le produit des deux nombres qu'il a trouvés ?",
    explanation: exp(
      "Pour un trinôme $x^2 + bx + c$ de coefficient dominant $1$, les deux racines ont une somme égale à $-b$ et un produit égal à $c$.",
      "Ici il propose $3$ et $4$ : leur somme vaut $7$, leur produit $12$.",
      "On compare : $-b = 7$ et $c = 12$. Les deux coïncident, la factorisation est correcte. Si l'une des deux avait échoué, il aurait su immédiatement que c'était faux.",
      "Somme et produit : deux additions mentales suffisent à valider — bien plus rapide qu'un développement complet, et ça marche aussi pour deviner les racines."
    ),
    tags: ["premiere", "maths", "second_degre", "factorisation", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_fac_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_factorisation",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche deux nombres dont la somme vaut $-b$ et le produit $c$.",
    tags: ["premiere", "maths", "second_degre", "factorisation", "open", "template"],
    generate: () => {
      const r1 = pickOne([1, 2, 3, 4, 5, -1, -2, -3]);
      const r2 = pickOne([2, 3, 5, 6, -2, -4]);
      const b = -(r1 + r2);
      const c = r1 * r2;
      const signe = (v: number) => (v >= 0 ? `- ${v}` : `+ ${-v}`);
      return {
        text: `Factorise $x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$ en expliquant comment tu trouves les deux racines, puis dis comment tu vérifies ton résultat.`,
        format: "open",
        expected: ["somme", "produit", String(r1), String(r2), "verifie", "vérifie"],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour un trinôme de coefficient dominant $1$, la somme des racines vaut $-b$ et leur produit $c$ : on peut donc les chercher de tête.",
          `Ici il faut deux nombres de somme $${-b}$ et de produit $${c}$.`,
          `Ce sont $${r1}$ et $${r2}$ : on vérifie que $${r1} + ${r2} = ${-b}$ et $${r1} \\times ${r2} = ${c}$.`,
          `La forme factorisée est $(x ${signe(r1)})(x ${signe(r2)})$ — la vérification par somme et produit tient en deux calculs mentaux.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_sd_can_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 5,
    theme: "neutral",
    text: "Que lit-on immédiatement sur la forme canonique $a(x - \\alpha)^2 + \\beta$, qu'on ne voit pas sur la forme développée ?",
    format: "open",
    expected: ["sommet", "extremum", "axe de symetrie", "axe de symétrie", "minimum", "maximum"],
    comparator: "contains_keyword",
    hint: "Que valent $\\alpha$ et $\\beta$ pour la parabole ?",
    explanation: exp(
      "La forme canonique est construite pour que la variable $x$ n'apparaisse qu'à un seul endroit, dans le carré.",
      "Ce carré est toujours positif ou nul, et il vaut $0$ exactement pour $x = \\alpha$ : c'est là que l'expression atteint sa valeur extrême, qui vaut alors $\\beta$.",
      "On lit donc directement le sommet $(\\alpha ; \\beta)$ et l'axe de symétrie $x = \\alpha$ — informations invisibles sur la forme développée, où il faudrait calculer $-\\dfrac{b}{2a}$ puis son image.",
      "Sommet, extremum et axe de symétrie : trois lectures immédiates, c'est la forme à choisir pour tout problème d'optimisation."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_can_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi le sommet donne-t-il un MINIMUM quand $a > 0$, et un MAXIMUM quand $a < 0$ ?",
    format: "open",
    expected: ["carre", "carré", "positif", "ajoute", "retire", "signe de a"],
    comparator: "contains_keyword",
    hint: "Quel est le signe de $(x - \\alpha)^2$, et que devient-il multiplié par $a$ ?",
    explanation: exp(
      "Tout se joue sur le terme $a(x - \\alpha)^2$, puisque $\\beta$ est une constante.",
      "Le carré $(x - \\alpha)^2$ est toujours positif ou nul, et il ne s'annule qu'en $x = \\alpha$.",
      "Si $a > 0$, ce terme est positif ou nul : il AJOUTE quelque chose à $\\beta$, sauf en $\\alpha$ où il n'ajoute rien. La valeur $\\beta$ est donc la plus petite atteinte. Si $a < 0$, il RETIRE toujours quelque chose : $\\beta$ devient la plus grande.",
      "Le signe de $a$ décide du sens de la parabole — vers le haut, elle a un creux ; vers le bas, une bosse."
    ),
    tags: ["premiere", "maths", "second_degre", "canonique", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_can_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_canonique",
    difficulty: 5,
    theme: "neutral",
    hint: "Le sommet a pour abscisse $-\\dfrac{b}{2a}$ ; son ordonnée est l'image de cette abscisse.",
    tags: ["premiere", "maths", "second_degre", "canonique", "open", "template"],
    generate: () => {
      const a = pickOne([1, 2, -1, -2]);
      const alpha = randomInt(-3, 3);
      const beta = randomInt(-5, 5);
      const b = -2 * a * alpha;
      const c = a * alpha * alpha + beta;
      const nature = a > 0 ? "minimum" : "maximum";
      return {
        text: `Soit $f(x) = ${a === 1 ? "" : a === -1 ? "-" : a}x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$. Détermine les coordonnées du sommet de sa parabole, dis s'il s'agit d'un minimum ou d'un maximum, et justifie.`,
        format: "open",
        expected: [String(alpha), String(beta), nature, "signe de a", "sommet"],
        comparator: "contains_keyword",
        canvas: parabole(a, b, c),
        explanation: exp(
          "Le sommet de la parabole a pour abscisse $-\\dfrac{b}{2a}$, et son ordonnée s'obtient en calculant l'image de cette abscisse.",
          `Ici $a = ${a}$ et $b = ${b}$, donc $\\alpha = -\\dfrac{${b}}{2 \\times ${a}} = ${alpha}$.`,
          `On calcule ensuite $f(${alpha}) = ${beta}$ : le sommet est le point $(${alpha} ; ${beta})$.`,
          `Comme $a = ${a}$ est ${a > 0 ? "positif, la parabole est tournée vers le haut" : "négatif, la parabole est tournée vers le bas"}, il s'agit d'un ${nature}, atteint en $x = ${alpha}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_sd_sig_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la règle « du signe de $a$ sauf entre les racines », en t'appuyant sur la parabole.",
    format: "open",
    expected: ["parabole", "coupe", "axe", "entre les racines", "traverse", "signe de a"],
    comparator: "contains_keyword",
    hint: "Où la courbe est-elle au-dessus de l'axe des abscisses, et où est-elle en dessous ?",
    explanation: exp(
      "Le signe d'un trinôme se lit sur la position de sa parabole par rapport à l'axe des abscisses : au-dessus, il est positif ; en dessous, négatif.",
      "Les racines sont précisément les points où la courbe COUPE cet axe : ce sont les seuls endroits où le signe peut changer.",
      "S'il y a deux racines, la parabole traverse l'axe deux fois : elle change de côté entre les deux, puis revient du côté de départ. Ce côté de départ (et d'arrivée) est celui vers lequel la parabole est tournée, donné par le signe de $a$.",
      "D'où la règle : le trinôme est du signe de $a$ à l'extérieur des racines, et du signe contraire entre elles."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_sd_sig_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 5,
    theme: "neutral",
    text: "Un trinôme a un discriminant strictement négatif. Que peut-on dire de son signe sur $\\mathbb{R}$, et pourquoi ?",
    format: "open",
    expected: ["ne s'annule", "jamais", "signe de a", "constant", "ne coupe pas", "ne traverse"],
    comparator: "contains_keyword",
    hint: "Si la parabole ne coupe jamais l'axe, peut-elle changer de côté ?",
    explanation: exp(
      "Un trinôme ne peut changer de signe qu'en s'annulant : c'est là que sa courbe traverse l'axe des abscisses.",
      "Un discriminant strictement négatif signifie qu'il n'a aucune racine réelle : la parabole ne rencontre jamais cet axe.",
      "Elle reste donc entièrement d'un seul côté — celui vers lequel elle est tournée, c'est-à-dire le côté donné par le signe de $a$.",
      "Le trinôme garde le signe de $a$ sur $\\mathbb{R}$ tout entier, sans jamais s'annuler. C'est ce qui permet d'affirmer que $x^2 + x + 1 > 0$ pour tout réel, sans rien calculer d'autre que $\\Delta$."
    ),
    tags: ["premiere", "maths", "second_degre", "signe", "open"],
  },
  {
    kind: "template",
    id: "premiere_sd_sig_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "second_degre",
    microId: "sd_signe",
    difficulty: 5,
    theme: "neutral",
    hint: "Discriminant d'abord, puis racines s'il y en a, puis règle du signe de $a$.",
    tags: ["premiere", "maths", "second_degre", "signe", "open", "template"],
    generate: () => {
      const cas = [
        { f: "x^2 - 3x + 2", d: 1, r: "1 et 2", a: 1, conclusion: "positif à l'extérieur de $[1 ; 2]$, négatif entre les racines" },
        { f: "-x^2 + 4", d: 16, r: "-2 et 2", a: -1, conclusion: "négatif à l'extérieur de $[-2 ; 2]$, positif entre les racines" },
        { f: "x^2 + x + 3", d: -11, r: "aucune", a: 1, conclusion: "strictement positif sur $\\mathbb{R}$" },
        { f: "-x^2 + 2x - 5", d: -16, r: "aucune", a: -1, conclusion: "strictement négatif sur $\\mathbb{R}$" },
        { f: "x^2 - 6x + 9", d: 0, r: "3 (racine double)", a: 1, conclusion: "positif sur $\\mathbb{R}$, nul seulement en $3$" },
      ];
      const c = pickOne(cas);
      return {
        text: `Étudie le signe de $${c.f}$ sur $\\mathbb{R}$, et rédige ta justification.`,
        format: "open",
        expected: ["discriminant", "signe de a", c.d < 0 ? "aucune racine" : "racines", c.a > 0 ? "positif" : "negatif"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le signe d'un trinôme se détermine en trois temps : discriminant, racines éventuelles, puis règle du signe de $a$.",
          `Ici $\\Delta = ${c.d}$${c.d < 0 ? " : il n'y a aucune racine réelle" : c.d === 0 ? " : il y a une racine double" : " : il y a deux racines distinctes"}.`,
          c.d < 0
            ? `La parabole ne coupe jamais l'axe des abscisses : le trinôme garde le signe de $a = ${c.a}$ partout.`
            : `Les racines sont $${c.r}$, et le coefficient $a = ${c.a}$ indique de quel côté la parabole est tournée.`,
          `Conclusion : le trinôme est ${c.conclusion}.`
        ),
      };
    },
  },
];
