// lib/tutor-v4/questionBank/terminale-spe/maths/produit-scalaire-espace.bank.ts
//
// Notion : Produit scalaire dans l'espace (produit_scalaire_espace)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   ps_espace_calculer       — Calculer un produit scalaire
//   ps_espace_orthogonalite  — Démontrer une orthogonalité
//   ps_espace_norme_distance — Calculer une norme / distance
//   ps_espace_angle          — Calculer un angle
//   ps_espace_plan_normal    — Utiliser un vecteur normal à un plan
//   ps_espace_defi           — Exercice type bac
//
// Conventions :
// - Produit scalaire analytique : $\vec{u}\cdot\vec{v} = xx' + yy' + zz'$.
// - Normes/produits scalaires entiers → "short" ; angles/expressions → QCM.

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

export const produitScalaireEspaceBank: TutorBankItemV4[] = [
  /* =========================================================
     PS_ESPACE_CALCULER
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est l'expression analytique du produit scalaire $\\vec{u}(x\\,;y\\,;z) \\cdot \\vec{v}(x'\\,;y'\\,;z')$ ?",
    format: "qcm",
    choices: [
      "$xx' + yy' + zz'$",
      "$x + y + z$",
      "$xx' \\times yy' \\times zz'$",
      "$(x+x')(y+y')(z+z')$",
    ],
    expected: ["$xx' + yy' + zz'$"],
    comparator: "mcq_exact",
    hint: "On multiplie les coordonnées deux à deux, puis on additionne.",
    explanation: exp(
      "Le produit scalaire analytique combine les coordonnées.",
      "On multiplie les coordonnées de même rang et on additionne.",
      "$\\vec{u}\\cdot\\vec{v} = xx' + yy' + zz'$.",
      "C'est $xx' + yy' + zz'$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;2\\,;3)$ et $\\vec{v}(4\\,;5\\,;6)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["32"],
    comparator: "number_equal",
    hint: "$1\\times4 + 2\\times5 + 3\\times6$.",
    explanation: exp(
      "On applique la formule analytique.",
      "$\\vec{u}\\cdot\\vec{v} = 1\\times4 + 2\\times5 + 3\\times6$.",
      "$4 + 10 + 18 = 32$.",
      "$\\vec{u}\\cdot\\vec{v} = 32$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;1\\,;3)$ et $\\vec{v}(1\\,;1\\,;1)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "$2 + 1 + 3$.",
    explanation: exp(
      "On applique la formule analytique.",
      "$\\vec{u}\\cdot\\vec{v} = 2\\times1 + 1\\times1 + 3\\times1$.",
      "$2 + 1 + 3 = 6$.",
      "$\\vec{u}\\cdot\\vec{v} = 6$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;0\\,;0)$ et $\\vec{v}(0\\,;1\\,;0)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Multiplie les coordonnées deux à deux.",
    explanation: exp(
      "On applique la formule analytique.",
      "$\\vec{u}\\cdot\\vec{v} = 1\\times0 + 0\\times1 + 0\\times0$.",
      "$0 + 0 + 0 = 0$.",
      "$\\vec{u}\\cdot\\vec{v} = 0$ (vecteurs orthogonaux)."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;-1\\,;3)$ et $\\vec{v}(1\\,;2\\,;1)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$2 - 2 + 3$.",
    explanation: exp(
      "On applique la formule analytique, attention au signe.",
      "$\\vec{u}\\cdot\\vec{v} = 2\\times1 + (-1)\\times2 + 3\\times1$.",
      "$2 - 2 + 3 = 3$.",
      "$\\vec{u}\\cdot\\vec{v} = 3$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\vec{u} \\cdot \\vec{u}$ ?",
    format: "qcm",
    choices: [
      "$\\|\\vec{u}\\|^2$",
      "$\\|\\vec{u}\\|$",
      "$0$",
      "$2\\|\\vec{u}\\|$",
    ],
    expected: ["$\\|\\vec{u}\\|^2$"],
    comparator: "mcq_exact",
    hint: "Le produit scalaire d'un vecteur par lui-même.",
    explanation: exp(
      "Le produit scalaire d'un vecteur par lui-même donne le carré de sa norme.",
      "$\\vec{u}\\cdot\\vec{u} = x^2 + y^2 + z^2$.",
      "Or $\\|\\vec{u}\\| = \\sqrt{x^2+y^2+z^2}$, donc $\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^2$.",
      "$\\vec{u}\\cdot\\vec{u} = \\|\\vec{u}\\|^2$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $\\vec{u}(3\\,;-2\\,;1)$ et $\\vec{v}(2\\,;1\\,;-4)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$6 - 2 - 4$.",
    explanation: exp(
      "On applique la formule analytique.",
      "$\\vec{u}\\cdot\\vec{v} = 3\\times2 + (-2)\\times1 + 1\\times(-4)$.",
      "$6 - 2 - 4 = 0$.",
      "$\\vec{u}\\cdot\\vec{v} = 0$ (vecteurs orthogonaux)."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;1\\,;1)$ et $\\vec{v}(2\\,;3\\,;4)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "$2 + 3 + 4$.",
    explanation: exp(
      "On applique la formule analytique.",
      "$\\vec{u}\\cdot\\vec{v} = 1\\times2 + 1\\times3 + 1\\times4$.",
      "$2 + 3 + 4 = 9$.",
      "$\\vec{u}\\cdot\\vec{v} = 9$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_calc_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "Le produit scalaire $\\vec{u} \\cdot \\vec{v}$ est :",
    format: "qcm",
    choices: [
      "un nombre réel",
      "un vecteur",
      "toujours positif",
      "un point",
    ],
    expected: ["un nombre réel"],
    comparator: "mcq_exact",
    hint: "« scalaire » = nombre.",
    explanation: exp(
      "Le résultat d'un produit scalaire est un scalaire.",
      "On obtient un nombre, pas un vecteur.",
      "Le mot « scalaire » signifie « nombre ».",
      "$\\vec{u}\\cdot\\vec{v}$ est un nombre réel."
    ),
    tags: ["terminale-spe", "produit_scalaire", "calculer", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_ps_calc_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\vec{u}\\cdot\\vec{v} = xx' + yy' + zz'$.",
    tags: ["terminale-spe", "produit_scalaire", "calculer", "template"],
    generate: () => {
      const x = randomInt(1, 4), y = randomInt(1, 4), z = randomInt(1, 4);
      const a = randomInt(1, 4), b = randomInt(1, 4), c = randomInt(1, 4);
      const res = x * a + y * b + z * c;
      return {
        text: `Soit $\\vec{u}(${x}\\,;${y}\\,;${z})$ et $\\vec{v}(${a}\\,;${b}\\,;${c})$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule analytique.",
          `$\\vec{u}\\cdot\\vec{v} = ${x}\\times${a} + ${y}\\times${b} + ${z}\\times${c}$.`,
          `$${x * a} + ${y * b} + ${z * c} = ${res}$.`,
          `$\\vec{u}\\cdot\\vec{v} = ${res}$.`
        ),
      };
    },
  },

  /* =========================================================
     PS_ESPACE_ORTHOGONALITE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 2,
    theme: "neutral",
    text: "Deux vecteurs non nuls sont orthogonaux si et seulement si :",
    format: "qcm",
    choices: [
      "$\\vec{u} \\cdot \\vec{v} = 0$",
      "$\\vec{u} \\cdot \\vec{v} = 1$",
      "$\\vec{u} = \\vec{v}$",
      "$\\|\\vec{u}\\| = \\|\\vec{v}\\|$",
    ],
    expected: ["$\\vec{u} \\cdot \\vec{v} = 0$"],
    comparator: "mcq_exact",
    hint: "Produit scalaire nul ⇔ orthogonalité.",
    explanation: exp(
      "L'orthogonalité se caractérise par le produit scalaire.",
      "Deux vecteurs non nuls sont orthogonaux ssi leur produit scalaire est nul.",
      "$\\vec{u}\\cdot\\vec{v} = 0$.",
      "Ils sont orthogonaux ssi $\\vec{u}\\cdot\\vec{v} = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;2\\,;-1)$ et $\\vec{v}(2\\,;-1\\,;0)$. Ces vecteurs sont-ils orthogonaux ?",
    format: "qcm",
    choices: [
      "Oui, car $\\vec{u} \\cdot \\vec{v} = 0$",
      "Non",
      "Oui, car ils ont la même norme",
      "On ne peut pas savoir",
    ],
    expected: ["Oui, car $\\vec{u} \\cdot \\vec{v} = 0$"],
    comparator: "mcq_exact",
    hint: "Calcule $2 - 2 + 0$.",
    explanation: exp(
      "On calcule le produit scalaire et on conclut.",
      "$\\vec{u}\\cdot\\vec{v} = 1\\times2 + 2\\times(-1) + (-1)\\times0$.",
      "$2 - 2 + 0 = 0$.",
      "Oui, ils sont orthogonaux car $\\vec{u}\\cdot\\vec{v} = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;1\\,;1)$ et $\\vec{v}(1\\,;-1\\,;0)$. Que vaut $\\vec{u} \\cdot \\vec{v}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$1 - 1 + 0$.",
    explanation: exp(
      "On calcule le produit scalaire.",
      "$\\vec{u}\\cdot\\vec{v} = 1 - 1 + 0$.",
      "$= 0$.",
      "$\\vec{u}\\cdot\\vec{v} = 0$ : les vecteurs sont orthogonaux."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;2\\,;3)$ et $\\vec{v}(1\\,;1\\,;1)$. $\\vec{u}\\cdot\\vec{v} = 6 \\ne 0$. Que peut-on conclure ?",
    format: "qcm",
    choices: [
      "Les vecteurs ne sont pas orthogonaux",
      "Les vecteurs sont orthogonaux",
      "Les vecteurs sont colinéaires",
      "Les vecteurs sont égaux",
    ],
    expected: ["Les vecteurs ne sont pas orthogonaux"],
    comparator: "mcq_exact",
    hint: "Orthogonal ⇔ produit scalaire nul.",
    explanation: exp(
      "On utilise le critère d'orthogonalité.",
      "$\\vec{u}\\cdot\\vec{v} = 6 \\ne 0$.",
      "Un produit scalaire non nul exclut l'orthogonalité.",
      "Les vecteurs ne sont pas orthogonaux."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour quelle valeur de $a$ les vecteurs $\\vec{u}(a\\,;1\\,;2)$ et $\\vec{v}(3\\,;-3\\,;0)$ sont-ils orthogonaux ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "On résout $\\vec{u}\\cdot\\vec{v} = 3a - 3 = 0$.",
    explanation: exp(
      "L'orthogonalité impose un produit scalaire nul.",
      "$\\vec{u}\\cdot\\vec{v} = 3a + (-3) + 0 = 3a - 3$.",
      "$3a - 3 = 0 \\iff a = 1$.",
      "$a = 1$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Les vecteurs de base $\\vec{i}(1\\,;0\\,;0)$ et $\\vec{k}(0\\,;0\\,;1)$ sont-ils orthogonaux ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si on les norme", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "$\\vec{i}\\cdot\\vec{k} = 0$ ?",
    explanation: exp(
      "On calcule le produit scalaire des deux vecteurs.",
      "$\\vec{i}\\cdot\\vec{k} = 1\\times0 + 0\\times0 + 0\\times1 = 0$.",
      "Le produit scalaire est nul.",
      "Oui, $\\vec{i}$ et $\\vec{k}$ sont orthogonaux."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;0\\,;-1)$ et $\\vec{v}(1\\,;5\\,;2)$. Que vaut $\\vec{u}\\cdot\\vec{v}$, et que conclure ?",
    format: "qcm",
    choices: [
      "$0$ : ils sont orthogonaux",
      "$2$ : ils ne sont pas orthogonaux",
      "$0$ : ils sont colinéaires",
      "$3$ : ils sont orthogonaux",
    ],
    expected: ["$0$ : ils sont orthogonaux"],
    comparator: "mcq_exact",
    hint: "$2 + 0 - 2$.",
    explanation: exp(
      "On calcule le produit scalaire puis on conclut.",
      "$\\vec{u}\\cdot\\vec{v} = 2\\times1 + 0\\times5 + (-1)\\times2 = 2 + 0 - 2$.",
      "$= 0$.",
      "$\\vec{u}\\cdot\\vec{v} = 0$ : les vecteurs sont orthogonaux."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour démontrer que deux droites sont orthogonales, on montre que :",
    format: "qcm",
    choices: [
      "le produit scalaire de leurs vecteurs directeurs est nul",
      "leurs vecteurs directeurs sont colinéaires",
      "elles ont la même longueur",
      "leurs vecteurs directeurs sont égaux",
    ],
    expected: ["le produit scalaire de leurs vecteurs directeurs est nul"],
    comparator: "mcq_exact",
    hint: "Orthogonalité des directions.",
    explanation: exp(
      "L'orthogonalité de deux droites se ramène à leurs directions.",
      "On calcule le produit scalaire de leurs vecteurs directeurs.",
      "S'il est nul, les directions sont orthogonales.",
      "On montre que le produit scalaire des vecteurs directeurs est nul."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 5,
    theme: "neutral",
    text: "Pour quelle valeur de $a$ les vecteurs $\\vec{u}(a\\,;2\\,;1)$ et $\\vec{v}(2\\,;-1\\,;-2)$ sont-ils orthogonaux ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$2a - 2 - 2 = 0$.",
    explanation: exp(
      "On impose un produit scalaire nul.",
      "$\\vec{u}\\cdot\\vec{v} = 2a + 2\\times(-1) + 1\\times(-2) = 2a - 4$.",
      "$2a - 4 = 0 \\iff a = 2$.",
      "$a = 2$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_ortho_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_orthogonalite",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\vec{u} \\cdot \\vec{v} > 0$, l'angle entre $\\vec{u}$ et $\\vec{v}$ est :",
    format: "qcm",
    choices: ["aigu", "droit", "obtus", "plat"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\|\\vec{v}\\|\\cos\\theta$ ; le signe vient de $\\cos\\theta$.",
    explanation: exp(
      "Le signe du produit scalaire dépend du cosinus de l'angle.",
      "$\\vec{u}\\cdot\\vec{v} > 0$ implique $\\cos\\theta > 0$.",
      "Un cosinus positif correspond à un angle aigu.",
      "L'angle est aigu."
    ),
    tags: ["terminale-spe", "produit_scalaire", "orthogonalite", "angle", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_NORME_DISTANCE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de la norme $\\|\\vec{u}\\|$ d'un vecteur $\\vec{u}(x\\,;y\\,;z)$ ?",
    format: "qcm",
    choices: [
      "$\\sqrt{x^2 + y^2 + z^2}$",
      "$x + y + z$",
      "$x^2 + y^2 + z^2$",
      "$|x| + |y| + |z|$",
    ],
    expected: ["$\\sqrt{x^2 + y^2 + z^2}$"],
    comparator: "mcq_exact",
    hint: "Racine de la somme des carrés.",
    explanation: exp(
      "La norme est la longueur du vecteur.",
      "On prend la racine de la somme des carrés des coordonnées.",
      "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$.",
      "C'est $\\sqrt{x^2 + y^2 + z^2}$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;3\\,;6)$. Que vaut $\\|\\vec{u}\\|$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "$\\sqrt{4 + 9 + 36} = \\sqrt{49}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\|\\vec{u}\\| = \\sqrt{2^2 + 3^2 + 6^2} = \\sqrt{4 + 9 + 36}$.",
      "$\\sqrt{49} = 7$.",
      "$\\|\\vec{u}\\| = 7$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;2\\,;2)$. Que vaut $\\|\\vec{u}\\|$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\sqrt{1 + 4 + 4} = \\sqrt{9}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\|\\vec{u}\\| = \\sqrt{1^2 + 2^2 + 2^2} = \\sqrt{1 + 4 + 4}$.",
      "$\\sqrt{9} = 3$.",
      "$\\|\\vec{u}\\| = 3$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(0\\,;3\\,;4)$. Que vaut $\\|\\vec{u}\\|$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\sqrt{0 + 9 + 16} = \\sqrt{25}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\|\\vec{u}\\| = \\sqrt{0^2 + 3^2 + 4^2} = \\sqrt{0 + 9 + 16}$.",
      "$\\sqrt{25} = 5$.",
      "$\\|\\vec{u}\\| = 5$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 2,
    theme: "neutral",
    text: "Quel lien relie la norme et le produit scalaire ?",
    format: "qcm",
    choices: [
      "$\\|\\vec{u}\\|^2 = \\vec{u} \\cdot \\vec{u}$",
      "$\\|\\vec{u}\\| = \\vec{u} \\cdot \\vec{u}$",
      "$\\|\\vec{u}\\|^2 = 2\\,\\vec{u} \\cdot \\vec{u}$",
      "$\\|\\vec{u}\\| = 0$",
    ],
    expected: ["$\\|\\vec{u}\\|^2 = \\vec{u} \\cdot \\vec{u}$"],
    comparator: "mcq_exact",
    hint: "Le carré de la norme est un produit scalaire.",
    explanation: exp(
      "La norme se déduit du produit scalaire d'un vecteur par lui-même.",
      "$\\vec{u}\\cdot\\vec{u} = x^2 + y^2 + z^2 = \\|\\vec{u}\\|^2$.",
      "Donc $\\|\\vec{u}\\|^2 = \\vec{u}\\cdot\\vec{u}$.",
      "$\\|\\vec{u}\\|^2 = \\vec{u}\\cdot\\vec{u}$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A(1\\,;0\\,;2)$ et $B(1\\,;4\\,;5)$. Que vaut la distance $AB = \\|\\overrightarrow{AB}\\|$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$\\overrightarrow{AB}(0\\,;4\\,;3)$, puis $\\sqrt{0+16+9}$.",
    explanation: exp(
      "La distance est la norme du vecteur $\\overrightarrow{AB}$.",
      "$\\overrightarrow{AB}(0\\,;4\\,;3)$, donc $AB = \\sqrt{0 + 16 + 9}$.",
      "$\\sqrt{25} = 5$.",
      "$AB = 5$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;1\\,;1)$. Que vaut $\\|\\vec{u}\\|$ ?",
    format: "qcm",
    choices: ["$\\sqrt{3}$", "$3$", "$\\sqrt{2}$", "$1$"],
    expected: ["$\\sqrt{3}$"],
    comparator: "mcq_exact",
    hint: "$\\sqrt{1 + 1 + 1}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\|\\vec{u}\\| = \\sqrt{1 + 1 + 1}$.",
      "$= \\sqrt{3}$.",
      "$\\|\\vec{u}\\| = \\sqrt{3}$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $\\vec{u}(6\\,;0\\,;8)$. Que vaut $\\|\\vec{u}\\|$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$\\sqrt{36 + 0 + 64} = \\sqrt{100}$.",
    explanation: exp(
      "On applique la formule de la norme.",
      "$\\|\\vec{u}\\| = \\sqrt{6^2 + 0^2 + 8^2} = \\sqrt{36 + 64}$.",
      "$\\sqrt{100} = 10$.",
      "$\\|\\vec{u}\\| = 10$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_norme_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 5,
    theme: "neutral",
    text: "Un vecteur est dit unitaire lorsque sa norme vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "« Unitaire » = de longueur 1.",
    explanation: exp(
      "Un vecteur unitaire a une longueur précise.",
      "Par définition, sa norme vaut $1$.",
      "$\\|\\vec{u}\\| = 1$.",
      "Un vecteur unitaire a une norme égale à $1$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "norme", "short"],
  },

  {
    kind: "template",
    id: "terminale_spe_ps_norme_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_norme_distance",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$.",
    tags: ["terminale-spe", "produit_scalaire", "norme", "template"],
    generate: () => {
      // triplets pythagoriciens 3D donnant une norme entière
      const cas = [
        { x: 2, y: 3, z: 6, n: 7 },
        { x: 1, y: 2, z: 2, n: 3 },
        { x: 0, y: 3, z: 4, n: 5 },
        { x: 6, y: 0, z: 8, n: 10 },
        { x: 4, y: 0, z: 3, n: 5 },
      ];
      const c = cas[Math.floor(Math.random() * cas.length)];
      return {
        text: `Soit $\\vec{u}(${c.x}\\,;${c.y}\\,;${c.z})$. Que vaut $\\|\\vec{u}\\|$ ?`,
        format: "short",
        expected: [String(c.n)],
        comparator: "number_equal",
        explanation: exp(
          "On applique la formule de la norme.",
          `$\\|\\vec{u}\\| = \\sqrt{${c.x}^2 + ${c.y}^2 + ${c.z}^2} = \\sqrt{${c.x * c.x + c.y * c.y + c.z * c.z}}$.`,
          `$\\sqrt{${c.x * c.x + c.y * c.y + c.z * c.z}} = ${c.n}$.`,
          `$\\|\\vec{u}\\| = ${c.n}$.`
        ),
      };
    },
  },

  /* =========================================================
     PS_ESPACE_ANGLE
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule relie le produit scalaire et l'angle $\\theta$ entre $\\vec{u}$ et $\\vec{v}$ ?",
    format: "qcm",
    choices: [
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$",
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\sin\\theta$",
      "$\\vec{u} \\cdot \\vec{v} = \\cos\\theta$",
      "$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\| + \\|\\vec{v}\\|$",
    ],
    expected: ["$\\vec{u} \\cdot \\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$"],
    comparator: "mcq_exact",
    hint: "Le produit scalaire fait intervenir le cosinus.",
    explanation: exp(
      "Le produit scalaire a une expression géométrique avec le cosinus de l'angle.",
      "On retient la formule du cours.",
      "$\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$.",
      "C'est $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Comment exprime-t-on $\\cos\\theta$ à partir du produit scalaire ?",
    format: "qcm",
    choices: [
      "$\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$",
      "$\\cos\\theta = \\vec{u} \\cdot \\vec{v}$",
      "$\\cos\\theta = \\dfrac{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}{\\vec{u} \\cdot \\vec{v}}$",
      "$\\cos\\theta = \\|\\vec{u}\\| \\times \\|\\vec{v}\\|$",
    ],
    expected: ["$\\cos\\theta = \\dfrac{\\vec{u} \\cdot \\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$"],
    comparator: "mcq_exact",
    hint: "On isole $\\cos\\theta$ dans la formule.",
    explanation: exp(
      "On part de $\\vec{u}\\cdot\\vec{v} = \\|\\vec{u}\\|\\,\\|\\vec{v}\\|\\cos\\theta$.",
      "On isole $\\cos\\theta$ en divisant par le produit des normes.",
      "$\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$.",
      "C'est $\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Si $\\vec{u} \\cdot \\vec{v} = 0$ (vecteurs non nuls), quel est l'angle entre $\\vec{u}$ et $\\vec{v}$ ?",
    format: "qcm",
    choices: ["$90°$", "$0°$", "$45°$", "$180°$"],
    expected: ["$90°$"],
    comparator: "mcq_exact",
    hint: "$\\cos\\theta = 0$.",
    explanation: exp(
      "On utilise $\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$.",
      "Si $\\vec{u}\\cdot\\vec{v} = 0$, alors $\\cos\\theta = 0$.",
      "L'angle dont le cosinus est nul est $90°$.",
      "L'angle vaut $90°$ (vecteurs orthogonaux)."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;0\\,;0)$ et $\\vec{v}(1\\,;1\\,;0)$. On a $\\cos\\theta = \\dfrac{1}{\\sqrt{2}}$. Quel est l'angle $\\theta$ ?",
    format: "qcm",
    choices: ["$45°$", "$30°$", "$60°$", "$90°$"],
    expected: ["$45°$"],
    comparator: "mcq_exact",
    hint: "$\\cos 45° = \\dfrac{1}{\\sqrt{2}}$.",
    explanation: exp(
      "On reconnaît une valeur remarquable du cosinus.",
      "$\\cos\\theta = \\dfrac{1}{\\sqrt{2}} = \\dfrac{\\sqrt{2}}{2}$.",
      "C'est le cosinus de $45°$.",
      "$\\theta = 45°$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Deux vecteurs colinéaires et de même sens forment un angle de :",
    format: "qcm",
    choices: ["$0°$", "$90°$", "$180°$", "$45°$"],
    expected: ["$0°$"],
    comparator: "mcq_exact",
    hint: "Même direction et même sens.",
    explanation: exp(
      "L'angle entre deux vecteurs colinéaires dépend de leur sens.",
      "De même sens, ils « pointent » dans la même direction.",
      "L'angle vaut alors $0°$ (et $\\cos\\theta = 1$).",
      "L'angle est $0°$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 4,
    theme: "neutral",
    text: "Si $\\vec{u} \\cdot \\vec{v} < 0$, l'angle entre les deux vecteurs est :",
    format: "qcm",
    choices: ["obtus", "aigu", "droit", "nul"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "$\\cos\\theta < 0$.",
    explanation: exp(
      "Le signe du produit scalaire donne celui du cosinus.",
      "$\\vec{u}\\cdot\\vec{v} < 0$ implique $\\cos\\theta < 0$.",
      "Un cosinus négatif correspond à un angle obtus.",
      "L'angle est obtus."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;1\\,;0)$ et $\\vec{v}(1\\,;1\\,;0)$ (identiques). Que vaut $\\cos\\theta$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Deux vecteurs égaux forment un angle nul.",
    explanation: exp(
      "Deux vecteurs identiques forment un angle de $0°$.",
      "On a $\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{u}}{\\|\\vec{u}\\|^2} = 1$.",
      "$\\cos 0° = 1$.",
      "$\\cos\\theta = 1$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $\\vec{u}(2\\,;0\\,;0)$ et $\\vec{v}(0\\,;0\\,;5)$. Que vaut $\\cos\\theta$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$\\vec{u}\\cdot\\vec{v} = 0$.",
    explanation: exp(
      "On calcule $\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$.",
      "$\\vec{u}\\cdot\\vec{v} = 0$, donc le numérateur est nul.",
      "$\\cos\\theta = 0$.",
      "$\\cos\\theta = 0$ (angle de $90°$)."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer un angle entre deux vecteurs, de quoi a-t-on besoin ?",
    format: "qcm",
    choices: [
      "du produit scalaire et des deux normes",
      "uniquement du produit scalaire",
      "uniquement des coordonnées du premier vecteur",
      "d'une équation de plan",
    ],
    expected: ["du produit scalaire et des deux normes"],
    comparator: "mcq_exact",
    hint: "$\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$.",
    explanation: exp(
      "L'angle se calcule via le cosinus.",
      "La formule $\\cos\\theta = \\dfrac{\\vec{u}\\cdot\\vec{v}}{\\|\\vec{u}\\|\\,\\|\\vec{v}\\|}$ fait intervenir trois quantités.",
      "Il faut le produit scalaire et les deux normes.",
      "On a besoin du produit scalaire et des deux normes."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_angle_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_angle",
    difficulty: 5,
    theme: "neutral",
    text: "Deux vecteurs colinéaires et de sens opposés forment un angle de :",
    format: "qcm",
    choices: ["$180°$", "$0°$", "$90°$", "$360°$"],
    expected: ["$180°$"],
    comparator: "mcq_exact",
    hint: "Sens opposés : $\\cos\\theta = -1$.",
    explanation: exp(
      "L'angle dépend du sens des vecteurs colinéaires.",
      "De sens opposés, ils « pointent » dans des directions contraires.",
      "L'angle vaut $180°$ (et $\\cos\\theta = -1$).",
      "L'angle est $180°$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "angle", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_PLAN_NORMAL
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 2,
    theme: "neutral",
    text: "Un vecteur normal à un plan est un vecteur qui est :",
    format: "qcm",
    choices: [
      "orthogonal à toutes les directions du plan",
      "contenu dans le plan",
      "parallèle au plan",
      "de norme nulle",
    ],
    expected: ["orthogonal à toutes les directions du plan"],
    comparator: "mcq_exact",
    hint: "« Normal » = perpendiculaire.",
    explanation: exp(
      "Un vecteur normal caractérise la direction perpendiculaire au plan.",
      "Il est orthogonal à tous les vecteurs directeurs du plan.",
      "Son produit scalaire avec toute direction du plan est nul.",
      "Il est orthogonal à toutes les directions du plan."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Le plan $P$ a pour vecteur normal $\\vec{n}(2\\,;-1\\,;3)$. Quelle est une équation cartésienne possible de $P$ ?",
    format: "qcm",
    choices: [
      "$2x - y + 3z + d = 0$",
      "$2x + y + 3z + d = 0$",
      "$2x - y + 3z = 1$ uniquement",
      "$-x + 2y + 3z + d = 0$",
    ],
    expected: ["$2x - y + 3z + d = 0$"],
    comparator: "mcq_exact",
    hint: "Les coefficients sont les coordonnées de $\\vec{n}$.",
    explanation: exp(
      "Le vecteur normal donne les coefficients de l'équation du plan.",
      "Avec $\\vec{n}(2\\,;-1\\,;3)$, l'équation est $2x - y + 3z + d = 0$.",
      "La constante $d$ dépend d'un point du plan.",
      "Une équation possible est $2x - y + 3z + d = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Le plan d'équation $x + 2y - 2z + 5 = 0$ admet pour vecteur normal :",
    format: "qcm",
    choices: [
      "$\\vec{n}(1\\,;2\\,;-2)$",
      "$\\vec{n}(1\\,;2\\,;2)$",
      "$\\vec{n}(5\\,;0\\,;0)$",
      "$\\vec{n}(1\\,;2\\,;-2\\,;5)$",
    ],
    expected: ["$\\vec{n}(1\\,;2\\,;-2)$"],
    comparator: "mcq_exact",
    hint: "Coefficients de $x$, $y$, $z$.",
    explanation: exp(
      "Le vecteur normal se lit sur les coefficients de l'équation.",
      "Pour $x + 2y - 2z + 5 = 0$, on prend $(1\\,;2\\,;-2)$.",
      "$\\vec{n}(1\\,;2\\,;-2)$.",
      "Un vecteur normal est $\\vec{n}(1\\,;2\\,;-2)$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 4,
    theme: "neutral",
    text: "Une droite de vecteur directeur $\\vec{u}$ est perpendiculaire à un plan de vecteur normal $\\vec{n}$ lorsque :",
    format: "qcm",
    choices: [
      "$\\vec{u}$ et $\\vec{n}$ sont colinéaires",
      "$\\vec{u} \\cdot \\vec{n} = 0$",
      "$\\vec{u}$ et $\\vec{n}$ sont orthogonaux",
      "$\\vec{u} = \\vec{0}$",
    ],
    expected: ["$\\vec{u}$ et $\\vec{n}$ sont colinéaires"],
    comparator: "mcq_exact",
    hint: "La droite suit la direction normale.",
    explanation: exp(
      "Une droite perpendiculaire au plan a la direction de la normale.",
      "$\\vec{u}$ doit donc être colinéaire à $\\vec{n}$.",
      "C'est la condition de perpendicularité droite/plan.",
      "$\\vec{u}$ et $\\vec{n}$ sont colinéaires."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 4,
    theme: "neutral",
    text: "Pour vérifier qu'un vecteur $\\vec{n}$ est normal à un plan défini par deux vecteurs $\\vec{u}$ et $\\vec{v}$, on vérifie que :",
    format: "qcm",
    choices: [
      "$\\vec{n} \\cdot \\vec{u} = 0$ et $\\vec{n} \\cdot \\vec{v} = 0$",
      "$\\vec{n} \\cdot \\vec{u} = 1$",
      "$\\vec{n}$ est colinéaire à $\\vec{u}$",
      "$\\vec{n} = \\vec{u} + \\vec{v}$",
    ],
    expected: ["$\\vec{n} \\cdot \\vec{u} = 0$ et $\\vec{n} \\cdot \\vec{v} = 0$"],
    comparator: "mcq_exact",
    hint: "Orthogonal aux deux vecteurs qui engendrent le plan.",
    explanation: exp(
      "Un vecteur normal est orthogonal à toutes les directions du plan.",
      "Il suffit qu'il soit orthogonal à deux vecteurs non colinéaires du plan.",
      "$\\vec{n}\\cdot\\vec{u} = 0$ et $\\vec{n}\\cdot\\vec{v} = 0$.",
      "On vérifie $\\vec{n}\\cdot\\vec{u} = 0$ et $\\vec{n}\\cdot\\vec{v} = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Le plan $P : 2x + 3y - z + d = 0$ passe par $A(1\\,;0\\,;1)$. Que vaut $d$ ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "On remplace $A$ dans l'équation : $2 + 0 - 1 + d = 0$.",
    explanation: exp(
      "Le plan passe par $A$ si ses coordonnées vérifient l'équation.",
      "$2\\times1 + 3\\times0 - 1 + d = 0$.",
      "$2 - 1 + d = 0 \\iff 1 + d = 0 \\iff d = -1$.",
      "$d = -1$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 4,
    theme: "neutral",
    text: "Le vecteur $\\vec{n}(1\\,;1\\,;1)$ est-il normal au plan d'équation $x + y + z - 4 = 0$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si on le norme", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "Les coefficients de l'équation forment le vecteur normal.",
    explanation: exp(
      "On compare $\\vec{n}$ aux coefficients de l'équation.",
      "Le plan $x + y + z - 4 = 0$ a pour normale $(1\\,;1\\,;1)$.",
      "C'est exactement $\\vec{n}$.",
      "Oui, $\\vec{n}$ est normal au plan."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 5,
    theme: "neutral",
    text: "Une droite a pour vecteur directeur $\\vec{u}(2\\,;4\\,;6)$ et un plan a pour normale $\\vec{n}(1\\,;2\\,;3)$. La droite est :",
    format: "qcm",
    choices: [
      "perpendiculaire au plan ($\\vec{u} = 2\\vec{n}$)",
      "parallèle au plan",
      "incluse dans le plan",
      "quelconque",
    ],
    expected: ["perpendiculaire au plan ($\\vec{u} = 2\\vec{n}$)"],
    comparator: "mcq_exact",
    hint: "$\\vec{u}$ est-il colinéaire à $\\vec{n}$ ?",
    explanation: exp(
      "On teste la colinéarité de $\\vec{u}$ et $\\vec{n}$.",
      "$\\vec{u}(2\\,;4\\,;6) = 2 \\times \\vec{n}(1\\,;2\\,;3)$.",
      "Direction colinéaire à la normale ⇒ droite perpendiculaire au plan.",
      "La droite est perpendiculaire au plan."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 3,
    theme: "neutral",
    text: "Le plan « horizontal » $z = 2$ admet pour vecteur normal :",
    format: "qcm",
    choices: [
      "$\\vec{n}(0\\,;0\\,;1)$",
      "$\\vec{n}(1\\,;0\\,;0)$",
      "$\\vec{n}(0\\,;1\\,;0)$",
      "$\\vec{n}(1\\,;1\\,;1)$",
    ],
    expected: ["$\\vec{n}(0\\,;0\\,;1)$"],
    comparator: "mcq_exact",
    hint: "$z = 2$ s'écrit $0x + 0y + z - 2 = 0$.",
    explanation: exp(
      "On met l'équation sous forme générale.",
      "$z = 2$ équivaut à $0x + 0y + 1z - 2 = 0$.",
      "Le vecteur normal est $(0\\,;0\\,;1)$.",
      "Un vecteur normal est $\\vec{n}(0\\,;0\\,;1)$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_normal_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_plan_normal",
    difficulty: 5,
    theme: "neutral",
    text: "On veut l'équation du plan passant par $O(0\\,;0\\,;0)$ et de normale $\\vec{n}(1\\,;2\\,;3)$. Laquelle est correcte ?",
    format: "qcm",
    choices: [
      "$x + 2y + 3z = 0$",
      "$x + 2y + 3z = 6$",
      "$x + 2y + 3z = 1$",
      "$3x + 2y + z = 0$",
    ],
    expected: ["$x + 2y + 3z = 0$"],
    comparator: "mcq_exact",
    hint: "Coefficients = normale ; $O$ donne $d = 0$.",
    explanation: exp(
      "L'équation est $x + 2y + 3z + d = 0$, avec $d$ déterminé par $O$.",
      "On remplace $O(0\\,;0\\,;0)$ : $0 + 0 + 0 + d = 0$, donc $d = 0$.",
      "L'équation est $x + 2y + 3z = 0$.",
      "L'équation du plan est $x + 2y + 3z = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "plan_normal", "qcm"],
  },

  /* =========================================================
     PS_ESPACE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Cube de côté 1 : $A(0\\,;0\\,;0)$, $B(1\\,;0\\,;0)$, $E(0\\,;0\\,;1)$. Que vaut $\\overrightarrow{AB} \\cdot \\overrightarrow{AE}$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "$\\overrightarrow{AB}(1\\,;0\\,;0)$ et $\\overrightarrow{AE}(0\\,;0\\,;1)$.",
    explanation: exp(
      "On calcule le produit scalaire des deux arêtes.",
      "$\\overrightarrow{AB}(1\\,;0\\,;0)\\cdot\\overrightarrow{AE}(0\\,;0\\,;1) = 0 + 0 + 0$.",
      "$= 0$.",
      "$\\overrightarrow{AB}\\cdot\\overrightarrow{AE} = 0$ : les arêtes sont orthogonales."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "cube", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour montrer qu'un triangle $ABC$ est rectangle en $A$, on vérifie que :",
    format: "qcm",
    choices: [
      "$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 0$",
      "$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 1$",
      "$AB = AC$",
      "$\\overrightarrow{AB}$ et $\\overrightarrow{AC}$ sont colinéaires",
    ],
    expected: ["$\\overrightarrow{AB} \\cdot \\overrightarrow{AC} = 0$"],
    comparator: "mcq_exact",
    hint: "Angle droit en $A$ ⇔ vecteurs issus de $A$ orthogonaux.",
    explanation: exp(
      "Un angle droit en $A$ se traduit par l'orthogonalité des côtés issus de $A$.",
      "On calcule $\\overrightarrow{AB}\\cdot\\overrightarrow{AC}$.",
      "Le triangle est rectangle en $A$ ssi ce produit scalaire est nul.",
      "On vérifie $\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $A(1\\,;0\\,;0)$, $B(0\\,;1\\,;0)$, $C(0\\,;0\\,;1)$. Que vaut $\\overrightarrow{AB} \\cdot \\overrightarrow{AC}$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "$\\overrightarrow{AB}(-1\\,;1\\,;0)$, $\\overrightarrow{AC}(-1\\,;0\\,;1)$.",
    explanation: exp(
      "On calcule les vecteurs puis leur produit scalaire.",
      "$\\overrightarrow{AB}(-1\\,;1\\,;0)$ et $\\overrightarrow{AC}(-1\\,;0\\,;1)$.",
      "$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = (-1)(-1) + 1\\times0 + 0\\times1 = 1$.",
      "$\\overrightarrow{AB}\\cdot\\overrightarrow{AC} = 1$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Pour trouver l'équation d'un plan, il est pratique de connaître :",
    format: "qcm",
    choices: [
      "un point du plan et un vecteur normal",
      "uniquement un point",
      "uniquement la norme d'un vecteur",
      "deux angles",
    ],
    expected: ["un point du plan et un vecteur normal"],
    comparator: "mcq_exact",
    hint: "La normale donne $(a\\,;b\\,;c)$, le point donne $d$.",
    explanation: exp(
      "L'équation d'un plan se construit à partir de sa normale et d'un point.",
      "La normale fournit les coefficients $a, b, c$ ; le point détermine $d$.",
      "$ax + by + cz + d = 0$.",
      "Il faut un point du plan et un vecteur normal."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Cube de côté 1 : $A(0\\,;0\\,;0)$ et $G(1\\,;1\\,;1)$. Que vaut $\\overrightarrow{AG} \\cdot \\overrightarrow{AG}$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\overrightarrow{AG}\\cdot\\overrightarrow{AG} = \\|\\overrightarrow{AG}\\|^2$.",
    explanation: exp(
      "Le produit scalaire d'un vecteur par lui-même est le carré de sa norme.",
      "$\\overrightarrow{AG}(1\\,;1\\,;1)$, donc $\\overrightarrow{AG}\\cdot\\overrightarrow{AG} = 1 + 1 + 1$.",
      "$= 3$ (et $\\|\\overrightarrow{AG}\\| = \\sqrt{3}$).",
      "$\\overrightarrow{AG}\\cdot\\overrightarrow{AG} = 3$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "cube", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $\\vec{u}(1\\,;-1\\,;2)$ et $\\vec{v}(3\\,;1\\,;-1)$. Ces vecteurs sont-ils orthogonaux ?",
    format: "qcm",
    choices: [
      "Oui, car $\\vec{u}\\cdot\\vec{v} = 0$",
      "Non, car $\\vec{u}\\cdot\\vec{v} = 4$",
      "Oui, car ils sont colinéaires",
      "Non, car les normes diffèrent",
    ],
    expected: ["Oui, car $\\vec{u}\\cdot\\vec{v} = 0$"],
    comparator: "mcq_exact",
    hint: "$3 - 1 - 2$.",
    explanation: exp(
      "On calcule le produit scalaire.",
      "$\\vec{u}\\cdot\\vec{v} = 1\\times3 + (-1)\\times1 + 2\\times(-1) = 3 - 1 - 2$.",
      "$= 0$.",
      "Oui, ils sont orthogonaux car $\\vec{u}\\cdot\\vec{v} = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $A(0\\,;0\\,;0)$ et $B(2\\,;1\\,;2)$. Que vaut la distance $AB$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$\\sqrt{4 + 1 + 4} = \\sqrt{9}$.",
    explanation: exp(
      "La distance est la norme de $\\overrightarrow{AB}$.",
      "$AB = \\sqrt{2^2 + 1^2 + 2^2} = \\sqrt{4 + 1 + 4}$.",
      "$\\sqrt{9} = 3$.",
      "$AB = 3$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "distance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour montrer qu'une droite $(d)$ est perpendiculaire à un plan $P$, on montre qu'un vecteur directeur de $(d)$ est :",
    format: "qcm",
    choices: [
      "colinéaire à un vecteur normal de $P$",
      "orthogonal à un vecteur normal de $P$",
      "contenu dans $P$",
      "de norme 1",
    ],
    expected: ["colinéaire à un vecteur normal de $P$"],
    comparator: "mcq_exact",
    hint: "Perpendiculaire au plan ⇒ direction de la normale.",
    explanation: exp(
      "Une droite perpendiculaire au plan suit la direction normale.",
      "Son vecteur directeur doit être colinéaire à un vecteur normal de $P$.",
      "C'est la caractérisation de la perpendicularité droite/plan.",
      "Le vecteur directeur est colinéaire à un vecteur normal de $P$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le plan $P$ a pour normale $\\vec{n}(1\\,;1\\,;1)$ et passe par $A(1\\,;1\\,;1)$. Quelle est son équation ?",
    format: "qcm",
    choices: [
      "$x + y + z - 3 = 0$",
      "$x + y + z = 0$",
      "$x + y + z - 1 = 0$",
      "$3x + 3y + 3z = 1$",
    ],
    expected: ["$x + y + z - 3 = 0$"],
    comparator: "mcq_exact",
    hint: "On écrit $x + y + z + d = 0$ et on remplace $A$.",
    explanation: exp(
      "On part de l'équation $x + y + z + d = 0$ (coefficients = normale).",
      "On remplace $A(1\\,;1\\,;1)$ : $1 + 1 + 1 + d = 0$, donc $d = -3$.",
      "L'équation est $x + y + z - 3 = 0$.",
      "L'équation du plan est $x + y + z - 3 = 0$."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "plan_normal", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_ps_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "produit_scalaire_espace",
    microId: "ps_espace_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Le point $A(1\\,;1\\,;1)$ appartient-il au plan $x + y + z - 3 = 0$ ?",
    format: "qcm",
    choices: ["Oui", "Non", "Seulement si $z = 0$", "On ne peut pas savoir"],
    expected: ["Oui"],
    comparator: "mcq_exact",
    hint: "On remplace dans l'équation.",
    explanation: exp(
      "On teste l'appartenance en remplaçant les coordonnées.",
      "$1 + 1 + 1 - 3 = 0$.",
      "L'équation est vérifiée.",
      "Oui, $A$ appartient au plan."
    ),
    tags: ["terminale-spe", "produit_scalaire", "type_bac", "qcm"],
  },
];
