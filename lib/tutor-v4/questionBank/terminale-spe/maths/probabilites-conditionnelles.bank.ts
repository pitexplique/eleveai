// lib/tutor-v4/questionBank/terminale-spe/maths/probabilites-conditionnelles.bank.ts
//
// Notion : Probabilités conditionnelles (probabilite_conditionnelle)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   proba_conditionnelle_arbre    — Construire ou lire un arbre pondéré
//   proba_conditionnelle_formule  — Calculer une probabilité conditionnelle
//   proba_totales                 — Formule des probabilités totales
//   proba_inverse_bayes           — Inverser une probabilité conditionnelle
//   proba_conditionnelle_defi     — Exercice type bac
//
// Conventions :
// - Notation française : P_A(B) = probabilité de B sachant A = P(A∩B) / P(A).
// - Les probabilités étant des décimaux (pénibles à taper), on utilise des QCM
//   (règle « écriture maths → QCM »). Décimaux en LaTeX : $0{,}6$.
// - Un tableau croisé d'effectifs (canvas "probabilites" variant "tableau")
//   illustre la lecture des probabilités.

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

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

// Tableau croisé : A∩B = 30, total A = 50, total B = 40, total = 100.
//   P_A(B) = 30/50 = 0,6 ; P(A∩B) = 0,3 ; P(B) = 0,4 ; P_B(A) = 30/40 = 0,75.
const tableauEffectifsCanvas: CanvasFigure = {
  kind: "probabilites",
  variant: "tableau",
  tableau: {
    entetes: ["", "B", "B̄", "Total"],
    lignes: [
      ["A", "30", "20", "50"],
      ["Ā", "10", "40", "50"],
      ["Total", "40", "60", "100"],
    ],
    casesSurlignees: [[0, 1]],
  },
};

// Arbre pondéré standard :
//   P(A)=0,6 ; P_A(B)=0,5 ; P(Ā)=0,4 ; P_Ā(B)=0,25.
//   ⇒ P(A∩B)=0,3 ; P(Ā∩B)=0,1 ; P(B)=0,4 ; P_B(A)=0,3/0,4=0,75.
const arbreABCanvas: CanvasFigure = {
  kind: "arbre_proba",
  titre: "Arbre pondéré",
  racineEnfants: [
    {
      label: "A",
      proba: "0,6",
      enfants: [
        { label: "B", proba: "0,5" },
        { label: "B̄", proba: "0,5" },
      ],
    },
    {
      label: "Ā",
      proba: "0,4",
      enfants: [
        { label: "B", proba: "0,25" },
        { label: "B̄", proba: "0,75" },
      ],
    },
  ],
};

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* =========================================================
     PROBA_CONDITIONNELLE_ARBRE — Construire / lire un arbre
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 1,
    theme: "neutral",
    text: "Sur un arbre pondéré, que vaut la somme des probabilités des branches issues d'un même nœud ?",
    format: "qcm",
    choices: ["$1$", "$0$", "$0{,}5$", "Cela dépend"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Les branches issues d'un nœud forment toutes les possibilités.",
    explanation: exp(
      "Les branches issues d'un même nœud représentent une partition des cas possibles.",
      "On somme les probabilités de toutes ces branches.",
      "Cette somme couvre tous les cas, elle vaut donc $1$.",
      "La somme des probabilités des branches issues d'un même nœud vaut $1$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = 0{,}6$, que vaut $P(\\overline{A})$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}6$", "$1$", "$0{,}3$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "$P(A) + P(\\overline{A}) = 1$.",
    explanation: exp(
      "Un événement et son contraire ont des probabilités de somme $1$.",
      "On utilise $P(\\overline{A}) = 1 - P(A)$.",
      "$P(\\overline{A}) = 1 - 0{,}6 = 0{,}4$.",
      "$P(\\overline{A}) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, comment obtient-on la probabilité d'un chemin (par exemple $A$ puis $B$) ?",
    format: "qcm",
    choices: [
      "En multipliant les probabilités des branches du chemin",
      "En additionnant les probabilités des branches",
      "En prenant la plus grande",
      "En divisant les probabilités",
    ],
    expected: ["En multipliant les probabilités des branches du chemin"],
    comparator: "mcq_exact",
    hint: "Le long d'un chemin, on multiplie.",
    explanation: exp(
      "La probabilité d'un chemin se calcule le long des branches.",
      "On multiplie les probabilités rencontrées sur le chemin.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$.",
      "On multiplie les probabilités des branches du chemin."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre, $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$. Que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$1{,}1$", "$0{,}5$", "$0{,}6$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "On multiplie le long du chemin : $P(A) \\times P_A(B)$.",
    explanation: exp(
      "La probabilité du chemin $A$ puis $B$ est un produit.",
      "On applique $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$P(A \\cap B) = 0{,}6 \\times 0{,}5 = 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre, $P_A(B) = 0{,}7$. Que vaut $P_A(\\overline{B})$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}7$", "$1$", "$0{,}5$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "Les deux branches issues de $A$ ont une somme égale à $1$.",
    explanation: exp(
      "Les branches issues du nœud $A$ ont une somme égale à $1$.",
      "On utilise $P_A(\\overline{B}) = 1 - P_A(B)$.",
      "$P_A(\\overline{B}) = 1 - 0{,}7 = 0{,}3$.",
      "$P_A(\\overline{B}) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre, $P(\\overline{A}) = 0{,}4$ et $P_{\\overline{A}}(B) = 0{,}5$. Que vaut $P(\\overline{A} \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$0{,}9$", "$0{,}5$", "$0{,}4$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "On multiplie le long du chemin $\\overline{A}$ puis $B$.",
    explanation: exp(
      "La probabilité du chemin $\\overline{A}$ puis $B$ est un produit.",
      "On applique $P(\\overline{A} \\cap B) = P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
      "$P(\\overline{A} \\cap B) = 0{,}4 \\times 0{,}5 = 0{,}2$.",
      "$P(\\overline{A} \\cap B) = 0{,}2$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, combien d'individus possèdent à la fois le caractère $A$ et le caractère $B$ ?",
    format: "qcm",
    choices: ["$30$", "$50$", "$40$", "$20$"],
    expected: ["$30$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "On lit la case croisant la ligne $A$ et la colonne $B$.",
    explanation: exp(
      "Un tableau croisé donne directement les effectifs de chaque intersection.",
      "On lit la case à l'intersection de la ligne $A$ et de la colonne $B$.",
      "Cette case contient $30$.",
      "$30$ individus possèdent à la fois $A$ et $B$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre pondéré, les probabilités inscrites sur les branches du deuxième niveau sont des probabilités :",
    format: "qcm",
    choices: ["conditionnelles", "marginales", "totales", "impossibles"],
    expected: ["conditionnelles"],
    comparator: "mcq_exact",
    hint: "Elles dépendent de la branche du premier niveau déjà empruntée.",
    explanation: exp(
      "Le deuxième niveau d'un arbre se lit « sachant » le premier niveau.",
      "Ces probabilités dépendent de l'événement du premier niveau.",
      "Ce sont donc des probabilités conditionnelles, comme $P_A(B)$.",
      "Les branches du deuxième niveau portent des probabilités conditionnelles."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Si $P(A) = 0{,}2$, que vaut $P(\\overline{A})$ ?",
    format: "qcm",
    choices: ["$0{,}8$", "$0{,}2$", "$0{,}5$", "$1$"],
    expected: ["$0{,}8$"],
    comparator: "mcq_exact",
    hint: "$P(\\overline{A}) = 1 - P(A)$.",
    explanation: exp(
      "Un événement et son contraire ont des probabilités de somme $1$.",
      "On calcule $1 - P(A)$.",
      "$P(\\overline{A}) = 1 - 0{,}2 = 0{,}8$.",
      "$P(\\overline{A}) = 0{,}8$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Pour calculer $P(A \\cap B)$ à partir d'un arbre, quelle formule utilise-t-on ?",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P_A(B)$",
      "$P(A \\cap B) = P(A) + P_A(B)$",
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = \\dfrac{P(A)}{P_A(B)}$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P_A(B)$"],
    comparator: "mcq_exact",
    hint: "On multiplie le long du chemin.",
    explanation: exp(
      "La probabilité d'une intersection se lit le long d'un chemin de l'arbre.",
      "On multiplie la probabilité de la première branche par la conditionnelle.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$.",
      "La formule est $P(A \\cap B) = P(A) \\times P_A(B)$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_11",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous, que vaut $P_A(B)$ (probabilité inscrite sur la branche $B$ partant de $A$) ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}6$", "$0{,}25$", "$0{,}3$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "On lit la branche $B$ qui part du nœud $A$.",
    explanation: exp(
      "Une probabilité conditionnelle se lit sur une branche du deuxième niveau.",
      "On suit le nœud $A$, puis la branche vers $B$.",
      "La branche $A \\to B$ porte $0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_arbre_fixed_12",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous, que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}5$", "$0{,}6$", "$1{,}1$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "On multiplie le long du chemin $A$ puis $B$ : $0{,}6 \\times 0{,}5$.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des probabilités des branches.",
      "On suit le chemin $A$ puis $B$ : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$P(A \\cap B) = 0{,}6 \\times 0{,}5 = 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     PROBA_CONDITIONNELLE_FORMULE — Calculer P_A(B)
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de la probabilité conditionnelle $P_A(B)$ (avec $P(A) \\ne 0$) ?",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(A)}{P(B)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise la probabilité de l'intersection par celle de l'événement « sachant ».",
    explanation: exp(
      "La probabilité conditionnelle se définit par un quotient.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "La formule est $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 2,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(A) = 0{,}6$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}3$", "$0{,}18$", "$0{,}9$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}3}{0{,}6} = 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}2$ et $P(A) = 0{,}5$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}25$", "$0{,}7$", "$0{,}1$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}2}{0{,}5} = 0{,}4$.",
      "$P_A(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}15$ et $P(A) = 0{,}3$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}45$", "$0{,}05$", "$0{,}2$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}15}{0{,}3} = 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$. Que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}83$", "$1{,}1$", "$0{,}11$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "On « remonte » la formule : $P(A \\cap B) = P(A) \\times P_A(B)$.",
    explanation: exp(
      "On utilise la formule sous sa forme produit.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$P(A \\cap B) = 0{,}6 \\times 0{,}5 = 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, que vaut $P_A(B)$ (probabilité de $B$ sachant $A$) ?",
    format: "qcm",
    choices: ["$0{,}6$", "$0{,}3$", "$0{,}75$", "$0{,}5$"],
    expected: ["$0{,}6$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Parmi les $50$ individus de $A$, combien sont aussi dans $B$ ? Divise.",
    explanation: exp(
      "Sachant $A$, on se restreint à la ligne $A$ du tableau.",
      "On divise l'effectif de $A \\cap B$ par l'effectif total de $A$.",
      "$P_A(B) = \\dfrac{30}{50} = 0{,}6$.",
      "$P_A(B) = 0{,}6$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}24$ et $P(A) = 0{,}4$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}6$", "$0{,}096$", "$0{,}16$", "$0{,}64$"],
    expected: ["$0{,}6$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}24}{0{,}4} = 0{,}6$.",
      "$P_A(B) = 0{,}6$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Dans $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$, par quoi divise-t-on $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$P(A)$", "$P(B)$", "$P(A \\cup B)$", "$P(\\overline{A})$"],
    expected: ["$P(A)$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de l'événement qui suit « sachant ».",
    explanation: exp(
      "La conditionnelle « sachant $A$ » se restreint à l'univers $A$.",
      "On divise donc par la probabilité de l'événement « sachant », c'est-à-dire $P(A)$.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "On divise par $P(A)$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_formule_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}21$ et $P(A) = 0{,}7$. Que vaut $P_A(B)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}147$", "$0{,}49$", "$0{,}9$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "On applique la formule de la probabilité conditionnelle.",
      "On divise $P(A \\cap B)$ par $P(A)$.",
      "$P_A(B) = \\dfrac{0{,}21}{0{,}7} = 0{,}3$.",
      "$P_A(B) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "formule", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_proba_cond_formule_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    tags: ["terminale-spe", "probabilites", "formule", "template"],
    generate: () => {
      const k = randomInt(1, 4); // P(A∩B) = 0,k ; P(A) = 0,5 ; réponse = 0,(2k)
      const rep = `$0{,}${2 * k}$`;
      const distracteurs = [
        `$0{,}${k}$`,
        `$0{,}${5 * k}$`,
        `$0{,}${k}5$`,
      ];
      return {
        text: `On a $P(A \\cap B) = 0{,}${k}$ et $P(A) = 0{,}5$. Que vaut $P_A(B)$ ?`,
        format: "qcm",
        choices: [rep, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la formule de la probabilité conditionnelle.",
          "On divise $P(A \\cap B)$ par $P(A)$.",
          `$P_A(B) = \\dfrac{0{,}${k}}{0{,}5} = 0{,}${2 * k}$.`,
          `$P_A(B) = 0{,}${2 * k}$.`
        ),
      };
    },
  },

  /* =========================================================
     PROBA_TOTALES — Formule des probabilités totales
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 2,
    theme: "neutral",
    text: "Avec la partition $\\{A\\,;\\overline{A}\\}$, quelle est la formule des probabilités totales pour $P(B)$ ?",
    format: "qcm",
    choices: [
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$",
      "$P(B) = P(A \\cap B) \\times P(\\overline{A} \\cap B)$",
      "$P(B) = P(A) + P(B)$",
      "$P(B) = P(A \\cap B) - P(\\overline{A} \\cap B)$",
    ],
    expected: ["$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins qui mènent à $B$.",
    explanation: exp(
      "$B$ se réalise soit avec $A$, soit avec $\\overline{A}$.",
      "On additionne les probabilités des deux chemins menant à $B$.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "La formule est $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(\\overline{A} \\cap B) = 0{,}2$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}06$", "$0{,}1$", "$0{,}25$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "$P(B) = 0{,}3 + 0{,}2 = 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}6$, $P_A(B) = 0{,}5$, $P(\\overline{A}) = 0{,}4$ et $P_{\\overline{A}}(B) = 0{,}25$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}75$", "$0{,}3$", "$0{,}5$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$.",
    explanation: exp(
      "On combine probabilités totales et formule du produit.",
      "$P(B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1 = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "La formule des probabilités totales décompose $P(B)$ selon :",
    format: "qcm",
    choices: [
      "une partition de l'univers (par exemple $A$ et $\\overline{A}$)",
      "la plus grande probabilité",
      "le produit $P(A) \\times P(B)$",
      "une seule branche de l'arbre",
    ],
    expected: ["une partition de l'univers (par exemple $A$ et $\\overline{A}$)"],
    comparator: "mcq_exact",
    hint: "On découpe l'univers en cas complémentaires.",
    explanation: exp(
      "Les probabilités totales reposent sur une partition de l'univers.",
      "On décompose $B$ selon tous les cas possibles d'une partition.",
      "Avec $\\{A\\,;\\overline{A}\\}$ : $P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "On décompose selon une partition de l'univers."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}3$", "$0{,}6$", "$0{,}5$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Effectif total de $B$ divisé par l'effectif total.",
    explanation: exp(
      "La probabilité de $B$ est sa fréquence sur l'ensemble.",
      "On divise le total de la colonne $B$ par l'effectif total.",
      "$P(B) = \\dfrac{40}{100} = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}3$, $P_A(B) = 0{,}8$, $P(\\overline{A}) = 0{,}7$ et $P_{\\overline{A}}(B) = 0{,}2$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}38$", "$0{,}5$", "$0{,}24$", "$0{,}14$"],
    expected: ["$0{,}38$"],
    comparator: "mcq_exact",
    hint: "$P(B) = P(A)P_A(B) + P(\\overline{A})P_{\\overline{A}}(B)$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = 0{,}3 \\times 0{,}8 + 0{,}7 \\times 0{,}2$.",
      "$P(B) = 0{,}24 + 0{,}14 = 0{,}38$.",
      "$P(B) = 0{,}38$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}12$ et $P(\\overline{A} \\cap B) = 0{,}28$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}16$", "$0{,}034$", "$0{,}2$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "$P(B) = 0{,}12 + 0{,}28 = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Une usine a deux machines : $A$ (60 % de la production, 2 % de défauts) et $\\overline{A}$ (40 %, 5 % de défauts). Quelle est la probabilité $P(D)$ qu'une pièce soit défectueuse ?",
    format: "qcm",
    choices: ["$0{,}032$", "$0{,}07$", "$0{,}02$", "$0{,}05$"],
    expected: ["$0{,}032$"],
    comparator: "mcq_exact",
    hint: "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05$.",
    explanation: exp(
      "On applique la formule des probabilités totales avec la partition $\\{A\\,;\\overline{A}\\}$.",
      "$P(D) = P(A) \\times P_A(D) + P(\\overline{A}) \\times P_{\\overline{A}}(D)$.",
      "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = 0{,}012 + 0{,}02 = 0{,}032$.",
      "$P(D) = 0{,}032$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}25$ et $P(\\overline{A} \\cap B) = 0{,}25$. Que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}0625$", "$0{,}25$", "$1$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "On additionne les deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
      "$P(B) = 0{,}25 + 0{,}25 = 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_proba_totales_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 3,
    theme: "neutral",
    hint: "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
    tags: ["terminale-spe", "probabilites", "totales", "template"],
    generate: () => {
      const a = randomInt(1, 4);
      const b = randomInt(1, 4);
      const rep = `$0{,}${a + b}$`;
      const distracteurs = [
        `$0{,}${Math.abs(a - b)}$`,
        `$0{,}0${a * b}$`,
        `$0{,}${a}${b}$`,
      ];
      return {
        text: `On a $P(A \\cap B) = 0{,}${a}$ et $P(\\overline{A} \\cap B) = 0{,}${b}$. Que vaut $P(B)$ ?`,
        format: "qcm",
        choices: [rep, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la formule des probabilités totales.",
          "$P(B) = P(A \\cap B) + P(\\overline{A} \\cap B)$.",
          `$P(B) = 0{,}${a} + 0{,}${b} = 0{,}${a + b}$.`,
          `$P(B) = 0{,}${a + b}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_totales_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_totales",
    difficulty: 4,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous, que vaut $P(B)$ ?",
    format: "qcm",
    choices: ["$0{,}4$", "$0{,}3$", "$0{,}1$", "$0{,}75$"],
    expected: ["$0{,}4$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "Additionne les deux chemins menant à $B$ : $A \\to B$ et $\\overline{A} \\to B$.",
    explanation: exp(
      "On applique la formule des probabilités totales en additionnant les chemins vers $B$.",
      "$P(B) = P(A) \\times P_A(B) + P(\\overline{A}) \\times P_{\\overline{A}}(B)$.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1 = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["terminale-spe", "probabilites", "totales", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     PROBA_INVERSE_BAYES — Inverser une conditionnelle
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la formule de $P_B(A)$ (avec $P(B) \\ne 0$) ?",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(B)}{P(A)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(B)}$"],
    comparator: "mcq_exact",
    hint: "« Sachant $B$ » : on divise par $P(B)$.",
    explanation: exp(
      "Inverser le conditionnement échange le rôle des événements.",
      "Pour $P_B(A)$, on divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "La formule est $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(B) = 0{,}5$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}6$", "$0{,}15$", "$0{,}5$", "$0{,}3$"],
    expected: ["$0{,}6$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}3}{0{,}5} = 0{,}6$.",
      "$P_B(A) = 0{,}6$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "Inverser une probabilité conditionnelle, c'est passer de :",
    format: "qcm",
    choices: [
      "$P_A(B)$ à $P_B(A)$",
      "$P(A)$ à $P(\\overline{A})$",
      "$P(A \\cap B)$ à $P(A \\cup B)$",
      "$P(B)$ à $P(A)$",
    ],
    expected: ["$P_A(B)$ à $P_B(A)$"],
    comparator: "mcq_exact",
    hint: "On échange ce qui est « su » et ce qui est cherché.",
    explanation: exp(
      "Inverser le conditionnement échange les rôles des deux événements.",
      "On passe de « $B$ sachant $A$ » à « $A$ sachant $B$ ».",
      "C'est passer de $P_A(B)$ à $P_B(A)$.",
      "On passe de $P_A(B)$ à $P_B(A)$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, que vaut $P_B(A)$ (probabilité de $A$ sachant $B$) ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}6$", "$0{,}3$", "$0{,}4$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Parmi les $40$ individus de $B$, combien sont aussi dans $A$ ?",
    explanation: exp(
      "Sachant $B$, on se restreint à la colonne $B$ du tableau.",
      "On divise l'effectif de $A \\cap B$ par l'effectif total de $B$.",
      "$P_B(A) = \\dfrac{30}{40} = 0{,}75$.",
      "$P_B(A) = 0{,}75$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}2$ et $P(B) = 0{,}4$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}08$", "$0{,}2$", "$0{,}6$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}2}{0{,}4} = 0{,}5$.",
      "$P_B(A) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 4,
    theme: "neutral",
    text: "On sait que $P(A \\cap B) = 0{,}18$ et $P(B) = 0{,}6$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}3$", "$0{,}108$", "$0{,}42$", "$0{,}78$"],
    expected: ["$0{,}3$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}18}{0{,}6} = 0{,}3$.",
      "$P_B(A) = 0{,}3$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 5,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$, et par les probabilités totales $P(B) = 0{,}4$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}12$", "$0{,}7$", "$0{,}6$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$, avec $P(B)$ déjà calculé.",
    explanation: exp(
      "On utilise $P(B)$ obtenu par les probabilités totales, puis on inverse.",
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "$P_B(A) = \\dfrac{0{,}3}{0{,}4} = 0{,}75$.",
      "$P_B(A) = 0{,}75$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    text: "A-t-on toujours $P_A(B) = P_B(A)$ ?",
    format: "qcm",
    choices: [
      "Non, en général ce sont des nombres différents",
      "Oui, toujours",
      "Oui, si $A = B$ seulement c'est faux",
      "Cela n'a pas de sens",
    ],
    expected: ["Non, en général ce sont des nombres différents"],
    comparator: "mcq_exact",
    hint: "Les dénominateurs $P(A)$ et $P(B)$ diffèrent en général.",
    explanation: exp(
      "Les deux conditionnelles ont des dénominateurs différents.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "Comme $P(A) \\ne P(B)$ en général, les deux résultats diffèrent.",
      "Non : en général $P_A(B) \\ne P_B(A)$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}1$ et $P(B) = 0{,}5$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}2$", "$0{,}05$", "$0{,}5$", "$0{,}4$"],
    expected: ["$0{,}2$"],
    comparator: "mcq_exact",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On applique la formule de la conditionnelle inversée.",
      "On divise $P(A \\cap B)$ par $P(B)$.",
      "$P_B(A) = \\dfrac{0{,}1}{0{,}5} = 0{,}2$.",
      "$P_B(A) = 0{,}2$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_proba_bayes_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    tags: ["terminale-spe", "probabilites", "bayes", "template"],
    generate: () => {
      const k = randomInt(1, 4); // P(A∩B) = 0,k ; P(B) = 0,5 ; réponse = 0,(2k)
      const rep = `$0{,}${2 * k}$`;
      const distracteurs = [
        `$0{,}${k}$`,
        `$0{,}0${k}$`,
        `$0{,}${k}5$`,
      ];
      return {
        text: `On a $P(A \\cap B) = 0{,}${k}$ et $P(B) = 0{,}5$. Que vaut $P_B(A)$ ?`,
        format: "qcm",
        choices: [rep, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: exp(
          "On applique la formule de la conditionnelle inversée.",
          "On divise $P(A \\cap B)$ par $P(B)$.",
          `$P_B(A) = \\dfrac{0{,}${k}}{0{,}5} = 0{,}${2 * k}$.`,
          `$P_B(A) = 0{,}${2 * k}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_bayes_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_inverse_bayes",
    difficulty: 5,
    theme: "neutral",
    text: "D'après l'arbre pondéré ci-dessous (où $P(A \\cap B) = 0{,}3$ et $P(B) = 0{,}4$), que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}5$", "$0{,}3$", "$0{,}4$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    canvas: arbreABCanvas,
    hint: "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0{,}3}{0{,}4}$.",
    explanation: exp(
      "On inverse le conditionnement à partir des valeurs lues/calculées sur l'arbre.",
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "$P_B(A) = \\dfrac{0{,}3}{0{,}4} = 0{,}75$.",
      "$P_B(A) = 0{,}75$."
    ),
    tags: ["terminale-spe", "probabilites", "bayes", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     PROBA_CONDITIONNELLE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un test de dépistage : $P(M) = 0{,}1$ (malade), $P_M(T) = 0{,}9$ (test positif si malade). Que vaut $P(M \\cap T)$ ?",
    format: "qcm",
    choices: ["$0{,}09$", "$0{,}9$", "$0{,}1$", "$0{,}19$"],
    expected: ["$0{,}09$"],
    comparator: "mcq_exact",
    hint: "$P(M \\cap T) = P(M) \\times P_M(T)$.",
    explanation: exp(
      "On calcule la probabilité du chemin « malade » puis « test positif ».",
      "$P(M \\cap T) = P(M) \\times P_M(T)$.",
      "$P(M \\cap T) = 0{,}1 \\times 0{,}9 = 0{,}09$.",
      "$P(M \\cap T) = 0{,}09$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Test : $P(M) = 0{,}1$, $P_M(T) = 0{,}9$, $P(\\overline{M}) = 0{,}9$, $P_{\\overline{M}}(T) = 0{,}2$. Que vaut $P(T)$ ?",
    format: "qcm",
    choices: ["$0{,}27$", "$0{,}09$", "$0{,}18$", "$0{,}11$"],
    expected: ["$0{,}27$"],
    comparator: "mcq_exact",
    hint: "$P(T) = P(M)P_M(T) + P(\\overline{M})P_{\\overline{M}}(T)$.",
    explanation: exp(
      "On applique la formule des probabilités totales avec la partition $\\{M\\,;\\overline{M}\\}$.",
      "$P(T) = P(M) \\times P_M(T) + P(\\overline{M}) \\times P_{\\overline{M}}(T)$.",
      "$P(T) = 0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2 = 0{,}09 + 0{,}18 = 0{,}27$.",
      "$P(T) = 0{,}27$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Test (suite) : $P(M \\cap T) = 0{,}09$ et $P(T) = 0{,}27$. Quelle est la probabilité $P_T(M)$ d'être malade sachant que le test est positif ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{3}$", "$0{,}9$", "$\\dfrac{2}{3}$", "$0{,}09$"],
    expected: ["$\\dfrac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)} = \\dfrac{0{,}09}{0{,}27}$.",
    explanation: exp(
      "On inverse le conditionnement pour répondre à la question.",
      "$P_T(M) = \\dfrac{P(M \\cap T)}{P(T)}$.",
      "$P_T(M) = \\dfrac{0{,}09}{0{,}27} = \\dfrac{1}{3}$.",
      "$P_T(M) = \\dfrac{1}{3}$ : un test positif ne signifie pas toujours « malade » !"
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Deux événements $A$ et $B$ sont indépendants si :",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A) = P(B)$",
      "$P_A(B) = 0$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P(B)$"],
    comparator: "mcq_exact",
    hint: "Pour des événements indépendants, le « sachant » ne change rien.",
    explanation: exp(
      "L'indépendance signifie que connaître $A$ ne modifie pas la probabilité de $B$.",
      "Cela se traduit par $P(A \\cap B) = P(A) \\times P(B)$.",
      "On a alors aussi $P_A(B) = P(B)$.",
      "$A$ et $B$ sont indépendants si $P(A \\cap B) = P(A) \\times P(B)$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "independance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$, $P(B) = 0{,}4$ et $P(A \\cap B) = 0{,}2$. Les événements $A$ et $B$ sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "Oui, car $P(A) \\times P(B) = P(A \\cap B)$",
      "Non, car $P(A) \\ne P(B)$",
      "Non, car $P(A \\cap B) \\ne 0$",
      "Oui, car $P(A \\cap B) < P(A)$",
    ],
    expected: ["Oui, car $P(A) \\times P(B) = P(A \\cap B)$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A) \\times P(B)$ avec $P(A \\cap B)$.",
    explanation: exp(
      "On teste le critère d'indépendance.",
      "On calcule $P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}2$.",
      "Or $P(A \\cap B) = 0{,}2$ : les deux sont égaux.",
      "Oui, $A$ et $B$ sont indépendants."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "independance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "D'après le tableau d'effectifs ci-dessous, quelle est la probabilité $P(A)$ qu'un individu pris au hasard possède le caractère $A$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}3$", "$0{,}4$", "$0{,}6$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: tableauEffectifsCanvas,
    hint: "Effectif total de la ligne $A$ divisé par l'effectif total.",
    explanation: exp(
      "La probabilité de $A$ est sa fréquence sur l'ensemble.",
      "On divise le total de la ligne $A$ par l'effectif total.",
      "$P(A) = \\dfrac{50}{100} = 0{,}5$.",
      "$P(A) = 0{,}5$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "tableau", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une urne : $P(\\text{boule rouge}) = 0{,}4$. Sachant rouge, $P(\\text{gagnant}) = 0{,}5$. Sachant non rouge, $P(\\text{gagnant}) = 0{,}1$. Quelle est la probabilité de gagner ?",
    format: "qcm",
    choices: ["$0{,}26$", "$0{,}2$", "$0{,}5$", "$0{,}06$"],
    expected: ["$0{,}26$"],
    comparator: "mcq_exact",
    hint: "$P(G) = 0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}1$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(G) = P(R) \\times P_R(G) + P(\\overline{R}) \\times P_{\\overline{R}}(G)$.",
      "$P(G) = 0{,}4 \\times 0{,}5 + 0{,}6 \\times 0{,}1 = 0{,}2 + 0{,}06 = 0{,}26$.",
      "$P(G) = 0{,}26$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "totales", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}3$ et $P(B) = 0{,}5$, que vaut $P(A \\cap B)$ ?",
    format: "qcm",
    choices: ["$0{,}15$", "$0{,}8$", "$0{,}2$", "$0{,}35$"],
    expected: ["$0{,}15$"],
    comparator: "mcq_exact",
    hint: "Pour des événements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
    explanation: exp(
      "Pour des événements indépendants, l'intersection est le produit.",
      "$P(A \\cap B) = P(A) \\times P(B)$.",
      "$P(A \\cap B) = 0{,}3 \\times 0{,}5 = 0{,}15$.",
      "$P(A \\cap B) = 0{,}15$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "independance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi, dans un dépistage, une forte probabilité $P_M(T)$ ne garantit-elle pas une forte probabilité $P_T(M)$ ?",
    format: "qcm",
    choices: [
      "Car $P_T(M)$ dépend aussi de $P(M)$, souvent faible",
      "Car $P_M(T) = P_T(M)$ toujours",
      "Car le test est forcément faux",
      "Car $P(T) = 1$",
    ],
    expected: ["Car $P_T(M)$ dépend aussi de $P(M)$, souvent faible"],
    comparator: "mcq_exact",
    hint: "Pense à l'influence de la rareté de la maladie $P(M)$.",
    explanation: exp(
      "Inverser une conditionnelle fait intervenir les probabilités de départ.",
      "$P_T(M) = \\dfrac{P(M) \\times P_M(T)}{P(T)}$ dépend fortement de $P(M)$.",
      "Si la maladie est rare ($P(M)$ faible), $P_T(M)$ reste faible malgré un bon test.",
      "Car $P_T(M)$ dépend aussi de $P(M)$, souvent faible."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "bayes", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_proba_cond_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "probabilite_conditionnelle",
    microId: "proba_conditionnelle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On a $P(A) = 0{,}2$, $P_A(B) = 0{,}5$, $P(\\overline{A}) = 0{,}8$, $P_{\\overline{A}}(B) = 0{,}25$. Que vaut $P_B(A)$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{3}$", "$0{,}1$", "$0{,}5$", "$\\dfrac{2}{3}$"],
    expected: ["$\\dfrac{1}{3}$"],
    comparator: "mcq_exact",
    hint: "Calcule d'abord $P(A \\cap B)$ et $P(B)$, puis $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
    explanation: exp(
      "On enchaîne produit, probabilités totales, puis inversion.",
      "$P(A \\cap B) = 0{,}2 \\times 0{,}5 = 0{,}1$ ; $P(B) = 0{,}1 + 0{,}8 \\times 0{,}25 = 0{,}1 + 0{,}2 = 0{,}3$.",
      "$P_B(A) = \\dfrac{0{,}1}{0{,}3} = \\dfrac{1}{3}$.",
      "$P_B(A) = \\dfrac{1}{3}$."
    ),
    tags: ["terminale-spe", "probabilites", "type_bac", "bayes", "qcm"],
  },
];
