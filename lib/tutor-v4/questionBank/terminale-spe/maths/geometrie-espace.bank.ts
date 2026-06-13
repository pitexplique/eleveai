// lib/tutor-v4/questionBank/terminale-spe/maths/geometrie-espace.bank.ts
//
// Notion : Géométrie dans l'espace (geometrie_espace)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   espace_vecteurs            — Manipuler des vecteurs dans l'espace
//   espace_repere_coordonnees  — Coordonnées : milieu, distance
//   espace_droite_parametrique — Représentation paramétrique de droite
//   espace_plan_equation       — Équation cartésienne de plan, vecteur normal
//   espace_position_relative   — Position relative droites / plans
//   espace_defi                — Exercice type bac
//
// Conventions :
// - Vecteurs/triplets/équations → QCM ; valeurs numériques propres (distances,
//   composantes, paramètres) → "short" (number_equal).
// - Vecteurs notés en colonnes via $\vec{u}(a\,;b\,;c)$ ; équations en LaTeX.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const geometrieEspaceBank: TutorBankItemV4[] = [
  /* =========================================================
     ESPACE_VECTEURS
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 1,
    theme: "neutral",
    text: "Dans l'espace, un vecteur est repéré par combien de coordonnées ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Une de plus que dans le plan.",
    explanation: exp(
      "L'espace est de dimension 3.",
      "Un vecteur de l'espace a donc trois coordonnées.",
      "On note $\\vec{u}(x\\,;y\\,;z)$.",
      "Un vecteur de l'espace a $3$ coordonnées."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on les coordonnées du vecteur $\\overrightarrow{AB}$ à partir de $A$ et $B$ ?",
    format: "qcm",
    choices: [
      "coordonnées de $B$ moins coordonnées de $A$",
      "coordonnées de $A$ moins coordonnées de $B$",
      "somme des coordonnées de $A$ et $B$",
      "produit des coordonnées",
    ],
    expected: ["coordonnées de $B$ moins coordonnées de $A$"],
    comparator: "mcq_exact",
    hint: "$\\overrightarrow{AB} = B - A$ coordonnée par coordonnée.",
    explanation: exp(
      "Les coordonnées d'un vecteur s'obtiennent par soustraction « arrivée − départ ».",
      "On calcule $x_B - x_A$, $y_B - y_A$, $z_B - z_A$.",
      "$\\overrightarrow{AB}(x_B - x_A\\,;y_B - y_A\\,;z_B - z_A)$.",
      "On fait coordonnées de $B$ moins coordonnées de $A$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(1\\,;2\\,;3)$ et $B(4\\,;6\\,;3)$. Quelles sont les coordonnées de $\\overrightarrow{AB}$ ?",
    format: "qcm",
    choices: [
      "$(3\\,;4\\,;0)$",
      "$(5\\,;8\\,;6)$",
      "$(-3\\,;-4\\,;0)$",
      "$(3\\,;4\\,;3)$",
    ],
    expected: ["$(3\\,;4\\,;0)$"],
    comparator: "mcq_exact",
    hint: "$\\overrightarrow{AB} = (x_B - x_A\\,;y_B - y_A\\,;z_B - z_A)$.",
    explanation: exp(
      "On soustrait les coordonnées de $A$ à celles de $B$.",
      "$\\overrightarrow{AB}(4-1\\,;6-2\\,;3-3)$.",
      "$\\overrightarrow{AB}(3\\,;4\\,;0)$.",
      "$\\overrightarrow{AB}(3\\,;4\\,;0)$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;2\\,;-1)$ et $\\vec{v}(3\\,;0\\,;2)$. Quelles sont les coordonnées de $\\vec{u} + \\vec{v}$ ?",
    format: "qcm",
    choices: [
      "$(4\\,;2\\,;1)$",
      "$(4\\,;2\\,;-1)$",
      "$(2\\,;2\\,;3)$",
      "$(3\\,;0\\,;-2)$",
    ],
    expected: ["$(4\\,;2\\,;1)$"],
    comparator: "mcq_exact",
    hint: "On additionne coordonnée par coordonnée.",
    explanation: exp(
      "La somme de deux vecteurs se fait coordonnée par coordonnée.",
      "$(1+3\\,;2+0\\,;-1+2)$.",
      "$(4\\,;2\\,;1)$.",
      "$\\vec{u} + \\vec{v} = (4\\,;2\\,;1)$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;-1\\,;3)$. Quelles sont les coordonnées de $2\\vec{u}$ ?",
    format: "qcm",
    choices: [
      "$(4\\,;-2\\,;6)$",
      "$(2\\,;-1\\,;3)$",
      "$(4\\,;-1\\,;3)$",
      "$(2\\,;-2\\,;6)$",
    ],
    expected: ["$(4\\,;-2\\,;6)$"],
    comparator: "mcq_exact",
    hint: "On multiplie chaque coordonnée par $2$.",
    explanation: exp(
      "Multiplier un vecteur par un réel multiplie chaque coordonnée.",
      "$2\\vec{u}(2 \\times 2\\,;2 \\times (-1)\\,;2 \\times 3)$.",
      "$(4\\,;-2\\,;6)$.",
      "$2\\vec{u} = (4\\,;-2\\,;6)$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "Deux vecteurs $\\vec{u}$ et $\\vec{v}$ sont colinéaires si :",
    format: "qcm",
    choices: [
      "il existe un réel $k$ tel que $\\vec{v} = k\\vec{u}$",
      "leur somme est nulle",
      "ils ont la même norme",
      "leurs coordonnées sont positives",
    ],
    expected: ["il existe un réel $k$ tel que $\\vec{v} = k\\vec{u}$"],
    comparator: "mcq_exact",
    hint: "Colinéaires = proportionnels.",
    explanation: exp(
      "La colinéarité traduit la proportionnalité des vecteurs.",
      "On cherche un coefficient $k$ tel que $\\vec{v} = k\\vec{u}$.",
      "Les coordonnées sont alors proportionnelles.",
      "$\\vec{u}$ et $\\vec{v}$ sont colinéaires s'il existe $k$ tel que $\\vec{v} = k\\vec{u}$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "colinearite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Les vecteurs $\\vec{u}(1\\,;2\\,;3)$ et $\\vec{v}(2\\,;4\\,;6)$ sont-ils colinéaires ?",
    format: "qcm",
    choices: [
      "Oui, car $\\vec{v} = 2\\vec{u}$",
      "Non",
      "Oui, car ils ont la même norme",
      "On ne peut pas savoir",
    ],
    expected: ["Oui, car $\\vec{v} = 2\\vec{u}$"],
    comparator: "mcq_exact",
    hint: "Cherche un facteur commun entre les coordonnées.",
    explanation: exp(
      "On teste la proportionnalité des coordonnées.",
      "$2 = 2 \\times 1$, $4 = 2 \\times 2$, $6 = 2 \\times 3$.",
      "Donc $\\vec{v} = 2\\vec{u}$.",
      "Oui, ils sont colinéaires car $\\vec{v} = 2\\vec{u}$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "colinearite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 4,
    theme: "neutral",
    text: "Trois vecteurs de l'espace sont coplanaires si :",
    format: "qcm",
    choices: [
      "l'un est combinaison linéaire des deux autres",
      "ils ont la même norme",
      "leur somme est nulle",
      "ils sont tous unitaires",
    ],
    expected: ["l'un est combinaison linéaire des deux autres"],
    comparator: "mcq_exact",
    hint: "Coplanaires = appartiennent à un même plan (vectoriel).",
    explanation: exp(
      "Trois vecteurs sont coplanaires s'ils tiennent dans un même plan.",
      "Cela équivaut à exprimer l'un à partir des deux autres.",
      "$\\vec{w} = a\\vec{u} + b\\vec{v}$ pour certains réels $a, b$.",
      "Ils sont coplanaires si l'un est combinaison linéaire des deux autres."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "coplanaire", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_vec_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(2\\,;1\\,;0)$ et $B(2\\,;1\\,;5)$. Quelles sont les coordonnées de $\\overrightarrow{AB}$ ?",
    format: "qcm",
    choices: [
      "$(0\\,;0\\,;5)$",
      "$(4\\,;2\\,;5)$",
      "$(0\\,;0\\,;-5)$",
      "$(2\\,;1\\,;5)$",
    ],
    expected: ["$(0\\,;0\\,;5)$"],
    comparator: "mcq_exact",
    hint: "$\\overrightarrow{AB} = B - A$.",
    explanation: exp(
      "On soustrait les coordonnées de $A$ à celles de $B$.",
      "$(2-2\\,;1-1\\,;5-0)$.",
      "$(0\\,;0\\,;5)$.",
      "$\\overrightarrow{AB}(0\\,;0\\,;5)$."
    ),
    tags: ["terminale-spe", "espace", "vecteurs", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_esp_vec_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_vecteurs",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\overrightarrow{AB} = (x_B - x_A\\,;y_B - y_A\\,;z_B - z_A)$.",
    tags: ["terminale-spe", "espace", "vecteurs", "template"],
    generate: () => {
      const ax = randomInt(0, 4), ay = randomInt(0, 4), az = randomInt(0, 4);
      const dx = randomInt(1, 5), dy = randomInt(1, 5), dz = randomInt(1, 5);
      const bx = ax + dx, by = ay + dy, bz = az + dz;
      const correct = `$(${dx}\\,;${dy}\\,;${dz})$`;
      const distracteurs = [
        `$(${bx}\\,;${by}\\,;${bz})$`,
        `$(${-dx}\\,;${-dy}\\,;${-dz})$`,
        `$(${dx}\\,;${dy}\\,;${az})$`,
      ];
      return {
        text: `Soit $A(${ax}\\,;${ay}\\,;${az})$ et $B(${bx}\\,;${by}\\,;${bz})$. Quelles sont les coordonnées de $\\overrightarrow{AB}$ ?`,
        format: "qcm",
        choices: [correct, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On soustrait les coordonnées de $A$ à celles de $B$.",
          `$(${bx} - ${ax}\\,;${by} - ${ay}\\,;${bz} - ${az})$.`,
          `$(${dx}\\,;${dy}\\,;${dz})$.`,
          `$\\overrightarrow{AB}(${dx}\\,;${dy}\\,;${dz})$.`
        ),
      };
    },
  },

  /* =========================================================
     ESPACE_REPERE_COORDONNEES — milieu, distance
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule des coordonnées du milieu $I$ de $[AB]$ ?",
    format: "qcm",
    choices: [
      "$\\left(\\dfrac{x_A+x_B}{2}\\,;\\dfrac{y_A+y_B}{2}\\,;\\dfrac{z_A+z_B}{2}\\right)$",
      "$(x_B-x_A\\,;y_B-y_A\\,;z_B-z_A)$",
      "$(x_A x_B\\,;y_A y_B\\,;z_A z_B)$",
      "$(x_A+x_B\\,;y_A+y_B\\,;z_A+z_B)$",
    ],
    expected: ["$\\left(\\dfrac{x_A+x_B}{2}\\,;\\dfrac{y_A+y_B}{2}\\,;\\dfrac{z_A+z_B}{2}\\right)$"],
    comparator: "mcq_exact",
    hint: "On fait la moyenne des coordonnées.",
    explanation: exp(
      "Le milieu a pour coordonnées la moyenne de celles de $A$ et $B$.",
      "On applique la formule sur chaque coordonnée.",
      "$I\\left(\\dfrac{x_A+x_B}{2}\\,;\\dfrac{y_A+y_B}{2}\\,;\\dfrac{z_A+z_B}{2}\\right)$.",
      "C'est la moyenne des coordonnées."
    ),
    tags: ["terminale-spe", "espace", "milieu", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(1\\,;2\\,;3)$ et $B(3\\,;4\\,;5)$. Quelles sont les coordonnées du milieu $I$ de $[AB]$ ?",
    format: "qcm",
    choices: [
      "$(2\\,;3\\,;4)$",
      "$(2\\,;2\\,;2)$",
      "$(4\\,;6\\,;8)$",
      "$(1\\,;1\\,;1)$",
    ],
    expected: ["$(2\\,;3\\,;4)$"],
    comparator: "mcq_exact",
    hint: "Moyenne coordonnée par coordonnée.",
    explanation: exp(
      "On calcule la moyenne des coordonnées de $A$ et $B$.",
      "$\\left(\\dfrac{1+3}{2}\\,;\\dfrac{2+4}{2}\\,;\\dfrac{3+5}{2}\\right)$.",
      "$(2\\,;3\\,;4)$.",
      "$I(2\\,;3\\,;4)$."
    ),
    tags: ["terminale-spe", "espace", "milieu", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de la distance $AB$ dans l'espace ?",
    format: "qcm",
    choices: [
      "$\\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$",
      "$(x_B-x_A) + (y_B-y_A) + (z_B-z_A)$",
      "$\\sqrt{x_B^2 + y_B^2 + z_B^2}$",
      "$|x_B-x_A|$",
    ],
    expected: ["$\\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$"],
    comparator: "mcq_exact",
    hint: "Pythagore en 3D.",
    explanation: exp(
      "La distance dans l'espace généralise le théorème de Pythagore.",
      "On prend la racine de la somme des carrés des écarts de coordonnées.",
      "$AB = \\sqrt{(x_B-x_A)^2 + (y_B-y_A)^2 + (z_B-z_A)^2}$.",
      "C'est la formule de la distance dans l'espace."
    ),
    tags: ["terminale-spe", "espace", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(0\\,;0\\,;0)$ et $B(2\\,;3\\,;6)$. Que vaut la distance $AB$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$AB = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{49}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36}$.",
      "$\\sqrt{49} = 7$.",
      "$AB = 7$."
    ),
    tags: ["terminale-spe", "espace", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $A(0\\,;0\\,;0)$ et $B(1\\,;2\\,;2)$. Que vaut la distance $AB$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$AB = \\sqrt{1 + 4 + 4} = \\sqrt{9}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{1^2 + 2^2 + 2^2} = \\sqrt{1 + 4 + 4}$.",
      "$\\sqrt{9} = 3$.",
      "$AB = 3$."
    ),
    tags: ["terminale-spe", "espace", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $A(0\\,;0\\,;0)$ et $B(0\\,;0\\,;4)$. Que vaut la distance $AB$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Seule la coordonnée $z$ change.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{0 + 0 + 4^2} = \\sqrt{16}$.",
      "$\\sqrt{16} = 4$.",
      "$AB = 4$."
    ),
    tags: ["terminale-spe", "espace", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A(1\\,;0\\,;2)$ et $B(1\\,;4\\,;5)$. Que vaut la distance $AB$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$AB = \\sqrt{0 + 4^2 + 3^2} = \\sqrt{25}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{(1-1)^2 + (4-0)^2 + (5-2)^2} = \\sqrt{0 + 16 + 9}$.",
      "$\\sqrt{25} = 5$.",
      "$AB = 5$."
    ),
    tags: ["terminale-spe", "espace", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A(2\\,;0\\,;1)$ et $B(4\\,;2\\,;3)$. Quelles sont les coordonnées du milieu $I$ de $[AB]$ ?",
    format: "qcm",
    choices: [
      "$(3\\,;1\\,;2)$",
      "$(2\\,;2\\,;2)$",
      "$(6\\,;2\\,;4)$",
      "$(1\\,;1\\,;1)$",
    ],
    expected: ["$(3\\,;1\\,;2)$"],
    comparator: "mcq_exact",
    hint: "Moyenne des coordonnées.",
    explanation: exp(
      "On calcule la moyenne des coordonnées.",
      "$\\left(\\dfrac{2+4}{2}\\,;\\dfrac{0+2}{2}\\,;\\dfrac{1+3}{2}\\right)$.",
      "$(3\\,;1\\,;2)$.",
      "$I(3\\,;1\\,;2)$."
    ),
    tags: ["terminale-spe", "espace", "milieu", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $A(1\\,;1\\,;1)$ et $B(3\\,;3\\,;2)$. Que vaut la distance $AB$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$AB = \\sqrt{2^2 + 2^2 + 1^2} = \\sqrt{9}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AB = \\sqrt{(3-1)^2 + (3-1)^2 + (2-1)^2} = \\sqrt{4 + 4 + 1}$.",
      "$\\sqrt{9} = 3$.",
      "$AB = 3$."
    ),
    tags: ["terminale-spe", "espace", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_rep_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_repere_coordonnees",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un repère de l'espace, combien de coordonnées a un point ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Repère $(O\\,;\\vec{i}\\,,\\vec{j}\\,,\\vec{k})$.",
    explanation: exp(
      "L'espace est de dimension 3.",
      "Un point est repéré par trois coordonnées $(x\\,;y\\,;z)$.",
      "Il y a donc $3$ coordonnées.",
      "Un point de l'espace a $3$ coordonnées."
    ),
    tags: ["terminale-spe", "espace", "coordonnees", "short"],
  },

  /* =========================================================
     ESPACE_DROITE_PARAMETRIQUE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 2,
    theme: "neutral",
    text: "Une représentation paramétrique d'une droite décrit ses points sous la forme :",
    format: "qcm",
    choices: [
      "$M = A + t\\,\\vec{u}$ (avec $t$ réel)",
      "$ax + by + cz + d = 0$",
      "$M = A \\times t$",
      "$x^2 + y^2 + z^2 = r^2$",
    ],
    expected: ["$M = A + t\\,\\vec{u}$ (avec $t$ réel)"],
    comparator: "mcq_exact",
    hint: "Un point $A$ et un vecteur directeur $\\vec{u}$.",
    explanation: exp(
      "Une droite est décrite par un point et un vecteur directeur.",
      "On parcourt la droite en faisant varier le paramètre $t$.",
      "$M = A + t\\,\\vec{u}$.",
      "La représentation paramétrique est $M = A + t\\,\\vec{u}$."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 3,
    theme: "neutral",
    text: "Soit la droite $\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$. Quel est un vecteur directeur ?",
    format: "qcm",
    choices: [
      "$\\vec{u}(2\\,;1\\,;3)$",
      "$\\vec{u}(1\\,;0\\,;2)$",
      "$\\vec{u}(1\\,;1\\,;1)$",
      "$\\vec{u}(2\\,;0\\,;3)$",
    ],
    expected: ["$\\vec{u}(2\\,;1\\,;3)$"],
    comparator: "mcq_exact",
    hint: "Ce sont les coefficients de $t$.",
    explanation: exp(
      "Le vecteur directeur se lit sur les coefficients du paramètre $t$.",
      "Ici les coefficients de $t$ sont $2$, $1$ et $3$.",
      "$\\vec{u}(2\\,;1\\,;3)$.",
      "Un vecteur directeur est $\\vec{u}(2\\,;1\\,;3)$."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 3,
    theme: "neutral",
    text: "Soit la droite $\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$. Quel point obtient-on pour $t = 0$ ?",
    format: "qcm",
    choices: [
      "$(1\\,;0\\,;2)$",
      "$(0\\,;0\\,;0)$",
      "$(2\\,;1\\,;3)$",
      "$(3\\,;1\\,;5)$",
    ],
    expected: ["$(1\\,;0\\,;2)$"],
    comparator: "mcq_exact",
    hint: "On remplace $t$ par $0$.",
    explanation: exp(
      "On obtient un point en donnant une valeur au paramètre.",
      "Pour $t = 0$ : $x = 1$, $y = 0$, $z = 2$.",
      "$(1\\,;0\\,;2)$.",
      "Le point est $(1\\,;0\\,;2)$ (c'est le point $A$)."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 4,
    theme: "neutral",
    text: "Soit la droite $\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$. Quel point obtient-on pour $t = 1$ ?",
    format: "qcm",
    choices: [
      "$(3\\,;1\\,;5)$",
      "$(1\\,;0\\,;2)$",
      "$(2\\,;1\\,;3)$",
      "$(3\\,;1\\,;3)$",
    ],
    expected: ["$(3\\,;1\\,;5)$"],
    comparator: "mcq_exact",
    hint: "On remplace $t$ par $1$.",
    explanation: exp(
      "On obtient un point en donnant une valeur au paramètre.",
      "Pour $t = 1$ : $x = 1 + 2 = 3$, $y = 1$, $z = 2 + 3 = 5$.",
      "$(3\\,;1\\,;5)$.",
      "Le point est $(3\\,;1\\,;5)$."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 4,
    theme: "neutral",
    text: "Pour écrire la représentation paramétrique d'une droite, de quoi a-t-on besoin ?",
    format: "qcm",
    choices: [
      "d'un point et d'un vecteur directeur",
      "de deux vecteurs normaux",
      "d'une équation du second degré",
      "de trois points alignés",
    ],
    expected: ["d'un point et d'un vecteur directeur"],
    comparator: "mcq_exact",
    hint: "$M = A + t\\,\\vec{u}$.",
    explanation: exp(
      "La représentation paramétrique repose sur deux éléments.",
      "Il faut un point de la droite et un vecteur directeur.",
      "On écrit alors $M = A + t\\,\\vec{u}$.",
      "On a besoin d'un point et d'un vecteur directeur."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 4,
    theme: "neutral",
    text: "Le point $(5\\,;2\\,;8)$ appartient-il à la droite $\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$ ?",
    format: "qcm",
    choices: [
      "Oui, pour $t = 2$",
      "Non",
      "Oui, pour $t = 1$",
      "Oui, pour $t = 0$",
    ],
    expected: ["Oui, pour $t = 2$"],
    comparator: "mcq_exact",
    hint: "Cherche $t$ avec $y = t = 2$, puis vérifie $x$ et $z$.",
    explanation: exp(
      "Un point appartient à la droite s'il existe un $t$ qui donne ses coordonnées.",
      "De $y = t = 2$, on teste $x = 1 + 2 \\times 2 = 5$ et $z = 2 + 3 \\times 2 = 8$.",
      "Les trois coordonnées concordent pour $t = 2$.",
      "Oui, le point appartient à la droite (pour $t = 2$)."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 5,
    theme: "neutral",
    text: "Deux droites sont parallèles lorsque leurs vecteurs directeurs sont :",
    format: "qcm",
    choices: ["colinéaires", "orthogonaux", "de norme 1", "opposés uniquement"],
    expected: ["colinéaires"],
    comparator: "mcq_exact",
    hint: "Même direction = vecteurs directeurs proportionnels.",
    explanation: exp(
      "Le parallélisme se lit sur les vecteurs directeurs.",
      "Deux droites parallèles ont la même direction.",
      "Leurs vecteurs directeurs sont donc colinéaires.",
      "Les vecteurs directeurs sont colinéaires."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 3,
    theme: "neutral",
    text: "Soit la droite $\\begin{cases} x = 3 - t \\\\ y = 2 + 4t \\\\ z = -t \\end{cases}$. Quel est un vecteur directeur ?",
    format: "qcm",
    choices: [
      "$\\vec{u}(-1\\,;4\\,;-1)$",
      "$\\vec{u}(3\\,;2\\,;0)$",
      "$\\vec{u}(1\\,;4\\,;1)$",
      "$\\vec{u}(3\\,;2\\,;-1)$",
    ],
    expected: ["$\\vec{u}(-1\\,;4\\,;-1)$"],
    comparator: "mcq_exact",
    hint: "Coefficients de $t$ : $-1$, $4$, $-1$.",
    explanation: exp(
      "Le vecteur directeur se lit sur les coefficients de $t$.",
      "Ici, les coefficients de $t$ sont $-1$, $4$ et $-1$.",
      "$\\vec{u}(-1\\,;4\\,;-1)$.",
      "Un vecteur directeur est $\\vec{u}(-1\\,;4\\,;-1)$."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 5,
    theme: "neutral",
    text: "On connaît $A(1\\,;0\\,;2)$ et un vecteur directeur $\\vec{u}(2\\,;1\\,;3)$. Quelle est une représentation paramétrique de la droite ?",
    format: "qcm",
    choices: [
      "$\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$",
      "$\\begin{cases} x = 2 + t \\\\ y = 1 \\\\ z = 3 + 2t \\end{cases}$",
      "$\\begin{cases} x = 1 + t \\\\ y = 2t \\\\ z = 2 + t \\end{cases}$",
      "$2x + y + 3z = 0$",
    ],
    expected: ["$\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$"],
    comparator: "mcq_exact",
    hint: "$x = x_A + a t$, etc., avec $A$ et $\\vec{u}(a\\,;b\\,;c)$.",
    explanation: exp(
      "On combine le point $A$ et le vecteur directeur $\\vec{u}$.",
      "$x = 1 + 2t$, $y = 0 + 1 \\cdot t$, $z = 2 + 3t$.",
      "On obtient le système avec les coordonnées de $A$ et $\\vec{u}$.",
      "La représentation est $\\begin{cases} x = 1 + 2t \\\\ y = t \\\\ z = 2 + 3t \\end{cases}$."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_droite_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_droite_parametrique",
    difficulty: 4,
    theme: "neutral",
    text: "Le paramètre $t$ dans une représentation paramétrique de droite est :",
    format: "qcm",
    choices: [
      "un réel quelconque",
      "un entier uniquement",
      "compris entre 0 et 1",
      "toujours positif",
    ],
    expected: ["un réel quelconque"],
    comparator: "mcq_exact",
    hint: "$t$ décrit toute la droite.",
    explanation: exp(
      "Le paramètre parcourt la droite entière.",
      "Pour obtenir tous les points, $t$ doit prendre toutes les valeurs réelles.",
      "$t \\in \\mathbb{R}$.",
      "$t$ est un réel quelconque."
    ),
    tags: ["terminale-spe", "espace", "droite", "qcm"],
  },

  /* =========================================================
     ESPACE_PLAN_EQUATION
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la forme d'une équation cartésienne d'un plan ?",
    format: "qcm",
    choices: [
      "$ax + by + cz + d = 0$",
      "$ax + by = 0$",
      "$M = A + t\\,\\vec{u}$",
      "$x^2 + y^2 + z^2 = r^2$",
    ],
    expected: ["$ax + by + cz + d = 0$"],
    comparator: "mcq_exact",
    hint: "Trois variables $x$, $y$, $z$ au premier degré.",
    explanation: exp(
      "Un plan a une équation cartésienne du premier degré à trois variables.",
      "On retient la forme générale.",
      "$ax + by + cz + d = 0$.",
      "L'équation cartésienne d'un plan est $ax + by + cz + d = 0$."
    ),
    tags: ["terminale-spe", "espace", "plan", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour le plan d'équation $2x + 3y - z + 1 = 0$, quel est un vecteur normal ?",
    format: "qcm",
    choices: [
      "$\\vec{n}(2\\,;3\\,;-1)$",
      "$\\vec{n}(2\\,;3\\,;1)$",
      "$\\vec{n}(1\\,;1\\,;1)$",
      "$\\vec{n}(2\\,;3\\,;-1\\,;1)$",
    ],
    expected: ["$\\vec{n}(2\\,;3\\,;-1)$"],
    comparator: "mcq_exact",
    hint: "Les coefficients de $x$, $y$, $z$.",
    explanation: exp(
      "Un vecteur normal au plan se lit sur les coefficients de l'équation.",
      "Pour $ax + by + cz + d = 0$, $\\vec{n}(a\\,;b\\,;c)$.",
      "Ici $\\vec{n}(2\\,;3\\,;-1)$.",
      "Un vecteur normal est $\\vec{n}(2\\,;3\\,;-1)$."
    ),
    tags: ["terminale-spe", "espace", "plan", "normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 3,
    theme: "neutral",
    text: "Le point $(0\\,;0\\,;1)$ appartient-il au plan d'équation $2x + 3y - z + 1 = 0$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si $z = 0$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "On remplace $(x\\,;y\\,;z)$ dans l'équation.",
    explanation: exp(
      "Un point appartient au plan si ses coordonnées vérifient l'équation.",
      "On remplace : $2 \\times 0 + 3 \\times 0 - 1 + 1$.",
      "$0 + 0 - 1 + 1 = 0$ : l'équation est vérifiée.",
      "Oui, le point appartient au plan."
    ),
    tags: ["terminale-spe", "espace", "plan", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 4,
    theme: "neutral",
    text: "Le point $(1\\,;1\\,;1)$ appartient-il au plan d'équation $x + y + z - 5 = 0$ ?",
    format: "qcm",
    choices: ["Non", "Oui", "Seulement si $x = 5$", "On ne peut pas savoir"],
    expected: ["Non"],
    comparator: "mcq_exact",
    hint: "On remplace et on regarde si on obtient $0$.",
    explanation: exp(
      "Un point appartient au plan si l'équation est vérifiée.",
      "On remplace : $1 + 1 + 1 - 5 = -2$.",
      "$-2 \\ne 0$ : l'équation n'est pas vérifiée.",
      "Non, le point n'appartient pas au plan."
    ),
    tags: ["terminale-spe", "espace", "plan", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 4,
    theme: "neutral",
    text: "Un plan a pour vecteur normal $\\vec{n}(1\\,;-2\\,;3)$. Quelle peut être son équation ?",
    format: "qcm",
    choices: [
      "$x - 2y + 3z + d = 0$",
      "$x + 2y + 3z + d = 0$",
      "$x - 2y + 3z = 1$ seulement",
      "$-2x + y + 3z + d = 0$",
    ],
    expected: ["$x - 2y + 3z + d = 0$"],
    comparator: "mcq_exact",
    hint: "Les coefficients de l'équation sont les coordonnées de $\\vec{n}$.",
    explanation: exp(
      "Le vecteur normal donne les coefficients de l'équation.",
      "Avec $\\vec{n}(1\\,;-2\\,;3)$, l'équation est $x - 2y + 3z + d = 0$.",
      "La constante $d$ dépend d'un point du plan.",
      "L'équation est de la forme $x - 2y + 3z + d = 0$."
    ),
    tags: ["terminale-spe", "espace", "plan", "normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour le plan $z = 0$ (le plan « du sol »), quel est un vecteur normal ?",
    format: "qcm",
    choices: [
      "$\\vec{n}(0\\,;0\\,;1)$",
      "$\\vec{n}(1\\,;0\\,;0)$",
      "$\\vec{n}(1\\,;1\\,;1)$",
      "$\\vec{n}(0\\,;1\\,;0)$",
    ],
    expected: ["$\\vec{n}(0\\,;0\\,;1)$"],
    comparator: "mcq_exact",
    hint: "$z = 0$ s'écrit $0x + 0y + 1z = 0$.",
    explanation: exp(
      "On écrit l'équation sous la forme générale.",
      "$z = 0$ équivaut à $0x + 0y + 1z + 0 = 0$.",
      "Le vecteur normal est $\\vec{n}(0\\,;0\\,;1)$.",
      "Un vecteur normal est $\\vec{n}(0\\,;0\\,;1)$."
    ),
    tags: ["terminale-spe", "espace", "plan", "normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 5,
    theme: "neutral",
    text: "Le point $A(1\\,;0\\,;2)$ appartient-il au plan d'équation $2x + y - z = 0$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si $y = 1$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "On remplace $x = 1$, $y = 0$, $z = 2$.",
    explanation: exp(
      "On teste l'appartenance en remplaçant les coordonnées.",
      "$2 \\times 1 + 0 - 2 = 2 - 2 = 0$.",
      "L'équation est vérifiée.",
      "Oui, $A$ appartient au plan."
    ),
    tags: ["terminale-spe", "espace", "plan", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 4,
    theme: "neutral",
    text: "Deux plans sont parallèles lorsque leurs vecteurs normaux sont :",
    format: "qcm",
    choices: ["colinéaires", "orthogonaux", "nuls", "unitaires"],
    expected: ["colinéaires"],
    comparator: "mcq_exact",
    hint: "Mêmes directions normales.",
    explanation: exp(
      "Le parallélisme de deux plans se lit sur leurs vecteurs normaux.",
      "Deux plans parallèles ont des normales de même direction.",
      "Leurs vecteurs normaux sont colinéaires.",
      "Les vecteurs normaux sont colinéaires."
    ),
    tags: ["terminale-spe", "espace", "plan", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 3,
    theme: "neutral",
    text: "Dans l'équation $ax + by + cz + d = 0$, que représente le triplet $(a\\,;b\\,;c)$ ?",
    format: "qcm",
    choices: [
      "un vecteur normal au plan",
      "un point du plan",
      "un vecteur directeur du plan",
      "le centre du plan",
    ],
    expected: ["un vecteur normal au plan"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire au plan.",
    explanation: exp(
      "Les coefficients de l'équation forment un vecteur perpendiculaire au plan.",
      "$(a\\,;b\\,;c)$ est orthogonal à toutes les directions du plan.",
      "C'est donc un vecteur normal.",
      "$(a\\,;b\\,;c)$ est un vecteur normal au plan."
    ),
    tags: ["terminale-spe", "espace", "plan", "normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_plan_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_plan_equation",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la valeur de $d$ pour que le plan $2x + 3y - z + d = 0$ passe par le point $(1\\,;0\\,;0)$ ?",
    format: "short",
    expected: ["-2"],
    comparator: "number_equal",
    hint: "On remplace le point dans l'équation et on résout en $d$.",
    explanation: exp(
      "Le plan passe par le point si ses coordonnées vérifient l'équation.",
      "On remplace : $2 \\times 1 + 0 - 0 + d = 0$.",
      "$2 + d = 0 \\iff d = -2$.",
      "$d = -2$."
    ),
    tags: ["terminale-spe", "espace", "plan", "short"],
  },

  /* =========================================================
     ESPACE_POSITION_RELATIVE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Une droite de vecteur directeur $\\vec{u}$ est parallèle à un plan de vecteur normal $\\vec{n}$ lorsque :",
    format: "qcm",
    choices: [
      "$\\vec{u}$ et $\\vec{n}$ sont orthogonaux ($\\vec{u} \\cdot \\vec{n} = 0$)",
      "$\\vec{u}$ et $\\vec{n}$ sont colinéaires",
      "$\\vec{u} = \\vec{n}$",
      "$\\vec{u}$ est nul",
    ],
    expected: ["$\\vec{u}$ et $\\vec{n}$ sont orthogonaux ($\\vec{u} \\cdot \\vec{n} = 0$)"],
    comparator: "mcq_exact",
    hint: "Direction de la droite ⊥ normale du plan.",
    explanation: exp(
      "Le parallélisme droite/plan se traduit sur $\\vec{u}$ et $\\vec{n}$.",
      "Si la droite est parallèle au plan, sa direction est orthogonale à la normale.",
      "$\\vec{u} \\cdot \\vec{n} = 0$.",
      "La droite est parallèle au plan si $\\vec{u} \\cdot \\vec{n} = 0$."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite de vecteur directeur $\\vec{u}$ est orthogonale (perpendiculaire) à un plan de vecteur normal $\\vec{n}$ lorsque :",
    format: "qcm",
    choices: [
      "$\\vec{u}$ et $\\vec{n}$ sont colinéaires",
      "$\\vec{u}$ et $\\vec{n}$ sont orthogonaux",
      "$\\vec{u} \\cdot \\vec{n} = 0$",
      "$\\vec{u}$ est nul",
    ],
    expected: ["$\\vec{u}$ et $\\vec{n}$ sont colinéaires"],
    comparator: "mcq_exact",
    hint: "La droite suit alors exactement la direction normale.",
    explanation: exp(
      "Une droite perpendiculaire au plan a la direction de la normale.",
      "$\\vec{u}$ doit être colinéaire à $\\vec{n}$.",
      "Cela traduit l'orthogonalité droite/plan.",
      "$\\vec{u}$ et $\\vec{n}$ sont colinéaires."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite de vecteur directeur $\\vec{u}(1\\,;1\\,;1)$ et un plan de vecteur normal $\\vec{n}(1\\,;-2\\,;1)$. Comme $\\vec{u} \\cdot \\vec{n} = 1 - 2 + 1 = 0$, la droite est :",
    format: "qcm",
    choices: [
      "parallèle au plan (ou incluse)",
      "perpendiculaire au plan",
      "sécante au plan en un point",
      "confondue avec la normale",
    ],
    expected: ["parallèle au plan (ou incluse)"],
    comparator: "mcq_exact",
    hint: "$\\vec{u} \\cdot \\vec{n} = 0$ → direction dans le plan.",
    explanation: exp(
      "Le produit scalaire nul signifie orthogonalité de $\\vec{u}$ et $\\vec{n}$.",
      "La direction de la droite est alors parallèle au plan.",
      "$\\vec{u} \\cdot \\vec{n} = 0$ donne une droite parallèle (ou incluse).",
      "La droite est parallèle au plan (ou incluse)."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Deux droites de l'espace dont les vecteurs directeurs ne sont PAS colinéaires :",
    format: "qcm",
    choices: [
      "ne sont pas parallèles",
      "sont forcément sécantes",
      "sont confondues",
      "sont parallèles",
    ],
    expected: ["ne sont pas parallèles"],
    comparator: "mcq_exact",
    hint: "Parallèles ⇔ directions colinéaires.",
    explanation: exp(
      "Le parallélisme exige des directions colinéaires.",
      "Si les vecteurs directeurs ne sont pas colinéaires, les droites ne sont pas parallèles.",
      "Elles peuvent être sécantes ou non coplanaires.",
      "Elles ne sont pas parallèles."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Dans l'espace, deux droites non parallèles et qui ne se coupent pas sont dites :",
    format: "qcm",
    choices: ["non coplanaires", "confondues", "perpendiculaires", "colinéaires"],
    expected: ["non coplanaires"],
    comparator: "mcq_exact",
    hint: "Elles ne sont pas dans un même plan.",
    explanation: exp(
      "Dans l'espace, deux droites peuvent ne pas être dans un même plan.",
      "Si elles ne sont ni parallèles ni sécantes, elles n'ont pas de plan commun.",
      "On les dit non coplanaires.",
      "Elles sont non coplanaires."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite de vecteur directeur $\\vec{u}(2\\,;0\\,;0)$ et un plan de vecteur normal $\\vec{n}(0\\,;0\\,;1)$. Que vaut $\\vec{u} \\cdot \\vec{n}$, et que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$0$ : la droite est parallèle au plan",
      "$2$ : la droite est sécante",
      "$0$ : la droite est perpendiculaire",
      "$1$ : la droite est incluse",
    ],
    expected: ["$0$ : la droite est parallèle au plan"],
    comparator: "mcq_exact",
    hint: "$\\vec{u} \\cdot \\vec{n} = 2 \\times 0 + 0 + 0$.",
    explanation: exp(
      "On calcule le produit scalaire puis on conclut.",
      "$\\vec{u} \\cdot \\vec{n} = 2 \\times 0 + 0 \\times 0 + 0 \\times 1 = 0$.",
      "Le produit scalaire nul indique une droite parallèle au plan.",
      "$\\vec{u} \\cdot \\vec{n} = 0$ : la droite est parallèle au plan."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Les vecteurs directeurs de deux droites sont $\\vec{u}(1\\,;2\\,;3)$ et $\\vec{v}(2\\,;4\\,;6)$. Les droites sont :",
    format: "qcm",
    choices: [
      "parallèles (directions colinéaires)",
      "perpendiculaires",
      "non coplanaires",
      "sécantes",
    ],
    expected: ["parallèles (directions colinéaires)"],
    comparator: "mcq_exact",
    hint: "$\\vec{v} = 2\\vec{u}$.",
    explanation: exp(
      "On teste la colinéarité des vecteurs directeurs.",
      "$\\vec{v} = 2\\vec{u}$ : les directions sont colinéaires.",
      "Les droites ont donc la même direction.",
      "Les droites sont parallèles."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Deux plans de vecteurs normaux $\\vec{n_1}(1\\,;2\\,;1)$ et $\\vec{n_2}(2\\,;4\\,;2)$ sont :",
    format: "qcm",
    choices: [
      "parallèles (normales colinéaires)",
      "perpendiculaires",
      "sécants selon une droite",
      "confondus forcément",
    ],
    expected: ["parallèles (normales colinéaires)"],
    comparator: "mcq_exact",
    hint: "$\\vec{n_2} = 2\\vec{n_1}$.",
    explanation: exp(
      "On teste la colinéarité des vecteurs normaux.",
      "$\\vec{n_2} = 2\\vec{n_1}$ : les normales sont colinéaires.",
      "Les plans ont donc la même direction normale.",
      "Les plans sont parallèles."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Pour étudier si une droite est parallèle à un plan, quel calcul effectue-t-on ?",
    format: "qcm",
    choices: [
      "le produit scalaire $\\vec{u} \\cdot \\vec{n}$",
      "la somme $\\vec{u} + \\vec{n}$",
      "la distance entre deux points",
      "la dérivée de l'équation",
    ],
    expected: ["le produit scalaire $\\vec{u} \\cdot \\vec{n}$"],
    comparator: "mcq_exact",
    hint: "On teste l'orthogonalité direction/normale.",
    explanation: exp(
      "Le lien droite/plan passe par l'orthogonalité de $\\vec{u}$ et $\\vec{n}$.",
      "On calcule le produit scalaire $\\vec{u} \\cdot \\vec{n}$.",
      "S'il est nul, la droite est parallèle au plan.",
      "On calcule le produit scalaire $\\vec{u} \\cdot \\vec{n}$."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_pos_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite de vecteur directeur $\\vec{u}(1\\,;1\\,;0)$ et un plan de normale $\\vec{n}(1\\,;1\\,;0)$ : que peut-on dire ?",
    format: "qcm",
    choices: [
      "$\\vec{u}$ et $\\vec{n}$ colinéaires : la droite est perpendiculaire au plan",
      "la droite est parallèle au plan",
      "la droite est incluse dans le plan",
      "on ne peut rien dire",
    ],
    expected: ["$\\vec{u}$ et $\\vec{n}$ colinéaires : la droite est perpendiculaire au plan"],
    comparator: "mcq_exact",
    hint: "Ici $\\vec{u} = \\vec{n}$.",
    explanation: exp(
      "On compare $\\vec{u}$ et $\\vec{n}$.",
      "$\\vec{u} = \\vec{n}$ : ils sont colinéaires.",
      "Une direction colinéaire à la normale signifie droite perpendiculaire au plan.",
      "La droite est perpendiculaire au plan."
    ),
    tags: ["terminale-spe", "espace", "position_relative", "qcm"],
  },

  /* =========================================================
     ESPACE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "$ABCDEFGH$ est un cube de côté $1$, avec $A(0\\,;0\\,;0)$, $B(1\\,;0\\,;0)$, $D(0\\,;1\\,;0)$ et $E(0\\,;0\\,;1)$. Quelles sont les coordonnées de $G$ (sommet opposé à $A$) ?",
    format: "qcm",
    choices: [
      "$(1\\,;1\\,;1)$",
      "$(1\\,;0\\,;1)$",
      "$(0\\,;1\\,;1)$",
      "$(1\\,;1\\,;0)$",
    ],
    expected: ["$(1\\,;1\\,;1)$"],
    comparator: "mcq_exact",
    hint: "$G$ est le sommet diamétralement opposé à $A(0;0;0)$.",
    explanation: exp(
      "Dans ce repère, le cube a ses sommets aux coordonnées $0$ ou $1$.",
      "Le sommet opposé à $A(0\\,;0\\,;0)$ a toutes ses coordonnées à $1$.",
      "$G(1\\,;1\\,;1)$.",
      "$G(1\\,;1\\,;1)$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "cube", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Cube précédent : $A(0\\,;0\\,;0)$ et $G(1\\,;1\\,;1)$. Que vaut la longueur de la diagonale $AG$ ?",
    format: "qcm",
    choices: [
      "$\\sqrt{3}$",
      "$3$",
      "$\\sqrt{2}$",
      "$1$",
    ],
    expected: ["$\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$AG = \\sqrt{1^2 + 1^2 + 1^2}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AG = \\sqrt{1^2 + 1^2 + 1^2} = \\sqrt{3}$.",
      "La diagonale d'un cube de côté 1 vaut $\\sqrt{3}$.",
      "$AG = \\sqrt{3}$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "cube", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A(1\\,;0\\,;0)$, $B(0\\,;1\\,;0)$, $C(0\\,;0\\,;1)$. Quelles sont les coordonnées de $\\overrightarrow{AB}$ ?",
    format: "qcm",
    choices: [
      "$(-1\\,;1\\,;0)$",
      "$(1\\,;1\\,;0)$",
      "$(-1\\,;-1\\,;0)$",
      "$(1\\,;-1\\,;0)$",
    ],
    expected: ["$(-1\\,;1\\,;0)$"],
    comparator: "mcq_exact",
    hint: "$\\overrightarrow{AB} = B - A$.",
    explanation: exp(
      "On soustrait les coordonnées de $A$ à celles de $B$.",
      "$(0-1\\,;1-0\\,;0-0)$.",
      "$(-1\\,;1\\,;0)$.",
      "$\\overrightarrow{AB}(-1\\,;1\\,;0)$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "La droite $\\begin{cases} x = t \\\\ y = 1 + t \\\\ z = 2 - t \\end{cases}$ coupe-t-elle le plan $z = 0$ ? Si oui, pour quelle valeur de $t$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "On résout $z = 2 - t = 0$.",
    explanation: exp(
      "Le point d'intersection vérifie l'équation du plan.",
      "On résout $z = 0$ : $2 - t = 0$.",
      "$t = 2$.",
      "La droite coupe le plan pour $t = 2$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Suite : pour $t = 2$, la droite $\\begin{cases} x = t \\\\ y = 1 + t \\\\ z = 2 - t \\end{cases}$ coupe le plan $z = 0$. Quelle est l'abscisse $x$ du point d'intersection ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "On remplace $t = 2$ dans $x = t$.",
    explanation: exp(
      "On calcule les coordonnées du point d'intersection.",
      "Pour $t = 2$ : $x = t = 2$.",
      "L'abscisse est $2$ (le point est $(2\\,;3\\,;0)$).",
      "$x = 2$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit le plan $P : x + y + z - 3 = 0$. Le point $(1\\,;1\\,;1)$ appartient-il à $P$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si $z = 0$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "On remplace dans l'équation.",
    explanation: exp(
      "On teste l'appartenance en remplaçant les coordonnées.",
      "$1 + 1 + 1 - 3 = 0$.",
      "L'équation est vérifiée.",
      "Oui, le point appartient à $P$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une droite a pour vecteur directeur $\\vec{u}(1\\,;1\\,;1)$ et un plan $x + y + z - 3 = 0$ a pour normale $\\vec{n}(1\\,;1\\,;1)$. Quelle est leur position relative ?",
    format: "qcm",
    choices: [
      "La droite est perpendiculaire au plan",
      "La droite est parallèle au plan",
      "La droite est incluse dans le plan",
      "On ne peut rien dire",
    ],
    expected: ["La droite est perpendiculaire au plan"],
    comparator: "mcq_exact",
    hint: "$\\vec{u}$ et $\\vec{n}$ sont colinéaires (égaux ici).",
    explanation: exp(
      "On compare le vecteur directeur et le vecteur normal.",
      "$\\vec{u} = \\vec{n}(1\\,;1\\,;1)$ : ils sont colinéaires.",
      "Direction colinéaire à la normale ⇒ droite perpendiculaire au plan.",
      "La droite est perpendiculaire au plan."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "position_relative", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Cube de côté $1$ : $A(0\\,;0\\,;0)$ et $F(1\\,;0\\,;1)$. Que vaut la longueur $AF$ (diagonale d'une face) ?",
    format: "qcm",
    choices: ["$\\sqrt{2}$", "$\\sqrt{3}$", "$2$", "$1$"],
    expected: ["$\\sqrt{2}$"],
    comparator: "mcq_exact",
    hint: "$AF = \\sqrt{1^2 + 0 + 1^2}$.",
    explanation: exp(
      "On applique la formule de la distance.",
      "$AF = \\sqrt{1^2 + 0^2 + 1^2} = \\sqrt{2}$.",
      "C'est la diagonale d'une face du cube.",
      "$AF = \\sqrt{2}$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "cube", "distance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $A(1\\,;2\\,;3)$ et $B(5\\,;6\\,;3)$. Quelles sont les coordonnées du milieu de $[AB]$ ?",
    format: "qcm",
    choices: [
      "$(3\\,;4\\,;3)$",
      "$(3\\,;4\\,;0)$",
      "$(6\\,;8\\,;6)$",
      "$(2\\,;2\\,;0)$",
    ],
    expected: ["$(3\\,;4\\,;3)$"],
    comparator: "mcq_exact",
    hint: "Moyenne des coordonnées.",
    explanation: exp(
      "On calcule la moyenne des coordonnées de $A$ et $B$.",
      "$\\left(\\dfrac{1+5}{2}\\,;\\dfrac{2+6}{2}\\,;\\dfrac{3+3}{2}\\right)$.",
      "$(3\\,;4\\,;3)$.",
      "Le milieu est $(3\\,;4\\,;3)$."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "milieu", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_esp_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "geometrie_espace",
    microId: "espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour montrer que trois points $A$, $B$, $C$ sont alignés dans l'espace, on vérifie que :",
    format: "qcm",
    choices: [
      "$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires",
      "$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont orthogonaux",
      "$AB = AC$",
      "$A$, $B$, $C$ ont la même abscisse",
    ],
    expected: ["$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires"],
    comparator: "mcq_exact",
    hint: "Alignés = même direction depuis $A$.",
    explanation: exp(
      "Trois points sont alignés s'ils sont sur une même droite.",
      "Cela revient à ce que $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ aient la même direction.",
      "On vérifie donc leur colinéarité.",
      "$A$, $B$, $C$ sont alignés si $\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires."
    ),
    tags: ["terminale-spe", "espace", "type_bac", "qcm"],
  },
];
