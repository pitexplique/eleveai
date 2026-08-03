// lib/tutor-v4/questionBank/premiere-spe/maths/probabilites-conditionnelles.bank.ts
//
// Chapitre : Probabilités conditionnelles et indépendance (notion "probabilites_conditionnelles")
// microSkills :
//   pc_conditionnelle             — calculer une probabilité conditionnelle P_A(B)
//   pc_registres                  — passer de la langue naturelle à l'écriture symbolique
//   pc_tableau                    — probabilité conditionnelle dans un tableau croisé
//   pc_arbre_construire           — construire un arbre pondéré à partir d'un énoncé
//   pc_arbre                      — arbre pondéré : règle du produit et de la somme
//   pc_partition                  — reconnaître une partition de l'univers
//   pc_totales                    — formule des probabilités totales
//   pc_inverser                   — distinguer P_A(B) et P_B(A) : les faux positifs
//   pc_independance               — indépendance de deux événements
//   pc_independance_incompatible  — ne pas confondre indépendants et incompatibles
//   pc_succession                 — succession de deux épreuves indépendantes
//
// ⚠️ Quinze items écrits avant le découpage en onze micro-compétences sont
// restés à leur place dans le fichier, mais leur `microId` a été réaffecté
// (leur `id` est inchangé). C'est le `microId` qui fait foi, pas le
// commentaire de section.
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM.
// Canvas : arbre_proba, tableau_donnees (tableau croisé).
//
// Règle d'écriture : un `fixed` pour une valeur exceptionnelle, un piège, une
// propriété ou un contexte 974 ; un `template` pour tout calcul dont on peut
// changer les nombres ; plusieurs ouvertes dont un template ouvert.

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

// Format virgule française pour l'affichage des probabilités dans l'arbre.
function fr(x: number): string {
  return String(Math.round(x * 100) / 100).replace(".", ",");
}

function arbre(pA: number, pBsiA: number, pBsiNonA: number): CanvasFigure {
  return {
    kind: "arbre_proba",
    titre: "Arbre pondéré",
    racineEnfants: [
      {
        label: "A",
        proba: fr(pA),
        enfants: [
          { label: "B", proba: fr(pBsiA) },
          { label: "B̄", proba: fr(1 - pBsiA) },
        ],
      },
      {
        label: "Ā",
        proba: fr(1 - pA),
        enfants: [
          { label: "B", proba: fr(pBsiNonA) },
          { label: "B̄", proba: fr(1 - pBsiNonA) },
        ],
      },
    ],
  };
}

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* ===================== PC_CONDITIONNELLE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "La probabilité conditionnelle $P_A(B)$ se calcule par :",
    format: "qcm",
    choices: [
      "$\\dfrac{P(A \\cap B)}{P(A)}$",
      "$\\dfrac{P(A \\cap B)}{P(B)}$",
      "$P(A) \\times P(B)$",
      "$\\dfrac{P(A)}{P(B)}$",
    ],
    expected: ["$\\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de la condition $A$.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ sachant que $A$ est réalisé.",
      "On divise la probabilité de l'intersection par celle de la condition.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{P(A \\cap B)}{P(A)}$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A) = 0{,}4$ et $P(A \\cap B) = 0{,}2$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}2}{0{,}4}$.",
    explanation: exp(
      "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{0{,}2}{0{,}4}$.",
      "$= 0{,}5$.",
      "$P_A(B) = 0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe, $P(\\text{fille}) = 0{,}6$ et $P(\\text{fille et demi-pensionnaire}) = 0{,}3$. Quelle est la probabilité qu'une fille soit demi-pensionnaire ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}3}{0{,}6}$.",
    explanation: exp(
      "On cherche $P_{\\text{fille}}(\\text{DP}) = \\dfrac{P(\\text{fille} \\cap \\text{DP})}{P(\\text{fille})}$.",
      "$\\dfrac{0{,}3}{0{,}6}$.",
      "$= 0{,}5$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "On lit dans un tableau : $50$ élèves dont $20$ font de l'anglais ; parmi ces $20$, $12$ font aussi espagnol. Quelle est la probabilité qu'un angliciste fasse espagnol ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "$\\dfrac{12}{20}$.",
    explanation: exp(
      "On se restreint aux $20$ anglicistes (la condition).",
      "Parmi eux, $12$ font espagnol : $\\dfrac{12}{20}$.",
      "$= 0{,}6$.",
      "La probabilité est $0{,}6$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$ et $P(A \\cap B) = 0{,}15$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}15}{0{,}5}$.",
    explanation: exp(
      "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "$\\dfrac{0{,}15}{0{,}5}$.",
      "$= 0{,}3$. Le dénominateur est toujours la probabilité de l'événement qui CONDITIONNE.",
      "$P_A(B) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $200$ clients, $80$ achètent le produit X ; parmi ces $80$, $40$ achètent aussi le produit Y. Quelle est la probabilité qu'un acheteur de X achète aussi Y ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "On ne travaille plus que sur les $80$ acheteurs de X.",
    explanation: exp(
      "Conditionner, c'est réduire l'univers : on ne considère plus que les acheteurs de X.",
      "Parmi ces $80$, il y en a $40$ qui achètent Y : $\\dfrac{40}{80}$.",
      "$= 0{,}5$. Le total de $200$ ne sert pas ici : il servirait pour $P(X \\cap Y) = \\dfrac{40}{200}$.",
      "La probabilité est $0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "A-t-on toujours $P_A(B) = P_B(A)$ ?",
    format: "qcm",
    choices: [
      "non : les dénominateurs sont différents",
      "oui, toujours",
      "oui, si $A$ et $B$ sont indépendants",
      "oui, si $P(A \\cap B) > 0$",
    ],
    expected: ["non : les dénominateurs sont différents"],
    comparator: "mcq_exact",
    hint: "Écris les deux formules l'une sous l'autre.",
    explanation: exp(
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "Le numérateur est le même, mais le dénominateur change : elles ne sont égales que si $P(A) = P(B)$.",
      "Exemple : parmi les élèves qui prennent le bus, beaucoup arrivent en avance ; mais parmi ceux qui arrivent en avance, tous ne prennent pas le bus.",
      "Non : les deux probabilités conditionnelles sont différentes en général."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$ et $P_A(B) = 0{,}4$. Combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "$P(A \\cap B) = P(A) \\times P_A(B)$.",
    explanation: exp(
      "En multipliant les deux membres de $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ par $P(A)$, on obtient $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "$0{,}5 \\times 0{,}4$.",
      "$= 0{,}2$.",
      "$P(A \\cap B) = 0{,}2$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "reunion",
    text: "Sur $100$ élèves d'un collège, $60$ prennent le car ; parmi eux, $45$ arrivent avant $7$ h $30$. Quelle est la probabilité qu'un élève venant en car arrive avant $7$ h $30$ ?",
    format: "short",
    expected: ["0,75"],
    comparator: "number_equal",
    hint: "$\\dfrac{45}{60}$ : on se limite aux élèves du car.",
    explanation: exp(
      "L'énoncé impose une condition : « venant en car ». On se restreint donc à ces $60$ élèves.",
      "Parmi eux, $45$ arrivent avant $7$ h $30$ : $\\dfrac{45}{60}$.",
      "$= 0{,}75$.",
      "La probabilité est $0{,}75$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie la notation $P_A(B)$ ?",
    format: "qcm",
    choices: [
      "la probabilité de $B$ sachant que $A$ est réalisé",
      "la probabilité de $A$ sachant que $B$ est réalisé",
      "la probabilité que $A$ et $B$ soient réalisés",
      "la probabilité que $A$ ou $B$ soit réalisé",
    ],
    expected: ["la probabilité de $B$ sachant que $A$ est réalisé"],
    comparator: "mcq_exact",
    hint: "L'événement en indice est celui qu'on SUPPOSE réalisé.",
    explanation: exp(
      "Dans $P_A(B)$, l'événement écrit en indice est la CONDITION : on suppose $A$ déjà réalisé.",
      "On calcule alors la probabilité de $B$ dans cet univers réduit.",
      "La probabilité que les deux soient réalisés se note $P(A \\cap B)$ : c'est autre chose.",
      "$P_A(B)$ est la probabilité de $B$ sachant $A$."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_cond_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la définition de $P_A(B)$ exige-t-elle $P(A) \\neq 0$ ?",
    format: "qcm",
    choices: [
      "car $P(A)$ est au dénominateur",
      "car une probabilité ne peut pas être nulle",
      "car $B$ doit être réalisé",
      "ce n'est pas exigé",
    ],
    expected: ["car $P(A)$ est au dénominateur"],
    comparator: "mcq_exact",
    hint: "Regarde la formule $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    explanation: exp(
      "La probabilité conditionnelle est définie par le quotient $\\dfrac{P(A \\cap B)}{P(A)}$.",
      "Une division par zéro est impossible : il faut donc $P(A) \\neq 0$.",
      "C'est aussi logique : conditionner par un événement impossible n'a aucun sens.",
      "Parce que $P(A)$ figure au dénominateur."
    ),
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_pc_cond_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
    tags: ["premiere", "maths", "probas_cond", "conditionnelle", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pAB = (Math.round(pA * 10) * randomInt(1, 9)) / 100; // <= pA
      const val = Math.round((pAB / pA) * 100) / 100;
      return {
        text: `On a $P(A) = ${fr(pA)}$ et $P(A \\cap B) = ${fr(pAB)}$. Combien vaut $P_A(B)$ ? (arrondir au centième)`,
        format: "short",
        expected: [fr(val)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
          `$\\dfrac{${fr(pAB)}}{${fr(pA)}}$.`,
          `$= ${fr(val)}$.`,
          `$P_A(B) = ${fr(val)}$.`
        ),
      };
    },
  },

  /* ===================== PC_ARBRE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un arbre pondéré, la probabilité d'un chemin (de la racine à une feuille) s'obtient en :",
    format: "qcm",
    choices: [
      "multipliant les probabilités le long du chemin",
      "additionnant les probabilités le long du chemin",
      "prenant la plus grande probabilité",
      "soustrayant les probabilités",
    ],
    expected: ["multipliant les probabilités le long du chemin"],
    comparator: "mcq_exact",
    hint: "Règle du produit.",
    explanation: exp(
      "La probabilité d'un chemin suit la règle du produit.",
      "On multiplie les probabilités rencontrées le long du chemin.",
      "Ex. : $P(A \\cap B) = P(A) \\times P_A(B)$.",
      "On multiplie les probabilités le long du chemin."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    text: "Sur l'arbre, calcule $P(A \\cap B)$ avec $P(A) = 0{,}6$ et $P_A(B) = 0{,}5$.",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "$0{,}6 \\times 0{,}5$.",
    explanation: exp(
      "On multiplie le long du chemin A → B.",
      "$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}6 \\times 0{,}5$.",
      "$= 0{,}3$.",
      "$P(A \\cap B) = 0{,}3$."
    ),
    canvas: arbre(0.6, 0.5, 0.2),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une branche issue d'un nœud, la somme des probabilités des sous-branches vaut :",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Toutes les possibilités sont couvertes.",
    explanation: exp(
      "À partir d'un nœud, les branches couvrent tous les cas possibles.",
      "Leurs probabilités forment une partition.",
      "Leur somme vaut donc $1$.",
      "La somme vaut $1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(A) = 0{,}7$ et $P_A(B) = 0{,}4$. Quelle est la probabilité $P_A(\\bar{B})$ ?",
    format: "short",
    expected: ["0,6"],
    comparator: "number_equal",
    hint: "$P_A(\\bar B) = 1 - P_A(B)$.",
    explanation: exp(
      "Les deux sous-branches issues de $A$ ont une somme égale à $1$.",
      "$P_A(\\bar B) = 1 - P_A(B) = 1 - 0{,}4$.",
      "$= 0{,}6$.",
      "$P_A(\\bar B) = 0{,}6$."
    ),
    canvas: arbre(0.7, 0.4, 0.3),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(A) = 0{,}3$ et $P_A(B) = 0{,}8$. Combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,24"],
    comparator: "number_equal",
    hint: "On MULTIPLIE les probabilités le long du chemin.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des probabilités portées par ses branches.",
      "$P(A \\cap B) = P(A) \\times P_A(B) = 0{,}3 \\times 0{,}8$.",
      "$= 0{,}24$. On multiplie le long d'un chemin ; on additionne entre chemins différents.",
      "$P(A \\cap B) = 0{,}24$."
    ),
    canvas: arbre(0.3, 0.8, 0.5),
    tags: ["premiere", "maths", "probas_cond", "arbre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un arbre, la branche menant à $\\bar A$ porte $0{,}6$. Que porte la branche menant à $A$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "La somme des branches issues d'un même nœud vaut $1$.",
    explanation: exp(
      "Les branches issues d'un même nœud décrivent tous les cas possibles : leur somme vaut $1$.",
      "$P(A) = 1 - P(\\bar A) = 1 - 0{,}6$.",
      "$= 0{,}4$.",
      "La branche menant à $A$ porte $0{,}4$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 4,
    theme: "neutral",
    text: "Sur l'arbre, $P(\\bar A) = 0{,}5$ et $P_{\\bar A}(B) = 0{,}6$. Combien vaut $P(\\bar A \\cap B)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "Même règle du produit, sur le chemin qui passe par $\\bar A$.",
    explanation: exp(
      "La règle du produit vaut pour tous les chemins de l'arbre, y compris ceux qui passent par l'événement contraire.",
      "$P(\\bar A \\cap B) = P(\\bar A) \\times P_{\\bar A}(B) = 0{,}5 \\times 0{,}6$.",
      "$= 0{,}3$.",
      "$P(\\bar A \\cap B) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Que porte une branche du PREMIER niveau d'un arbre pondéré ?",
    format: "qcm",
    choices: [
      "une probabilité simple, comme $P(A)$",
      "une probabilité conditionnelle, comme $P_A(B)$",
      "une intersection, comme $P(A \\cap B)$",
      "toujours $0{,}5$",
    ],
    expected: ["une probabilité simple, comme $P(A)$"],
    comparator: "mcq_exact",
    hint: "Au premier niveau, aucune information n'est encore connue.",
    explanation: exp(
      "Le premier niveau part de la racine : rien n'est encore supposé réalisé.",
      "On y écrit donc des probabilités simples : $P(A)$ et $P(\\bar A)$.",
      "Les probabilités conditionnelles apparaissent au deuxième niveau, une fois qu'on sait par où l'on est passé.",
      "Une probabilité simple, comme $P(A)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Que porte une branche du DEUXIÈME niveau d'un arbre pondéré ?",
    format: "qcm",
    choices: [
      "une probabilité conditionnelle, comme $P_A(B)$",
      "une probabilité simple, comme $P(B)$",
      "une intersection, comme $P(A \\cap B)$",
      "la somme des probabilités précédentes",
    ],
    expected: ["une probabilité conditionnelle, comme $P_A(B)$"],
    comparator: "mcq_exact",
    hint: "Au deuxième niveau, on sait déjà par quelle branche on est passé.",
    explanation: exp(
      "Arrivé au deuxième niveau, on a déjà emprunté une branche : cette information conditionne la suite.",
      "On y écrit donc $P_A(B)$ ou $P_{\\bar A}(B)$ selon le chemin suivi.",
      "L'intersection $P(A \\cap B)$, elle, n'apparaît pas sur une branche : c'est le résultat du PRODUIT le long du chemin, écrit au bout.",
      "Une probabilité conditionnelle, comme $P_A(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Un arbre a deux niveaux, chacun avec deux branches ($A$ ou $\\bar A$, puis $B$ ou $\\bar B$). Combien de chemins complets compte-t-il ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$2$ possibilités, puis $2$ pour chacune.",
    explanation: exp(
      "Chaque chemin complet part de la racine et va jusqu'à une extrémité.",
      "Il y a $2$ choix au premier niveau, et pour chacun $2$ choix au second : $2 \\times 2$.",
      "$= 4$ chemins : $A \\cap B$, $A \\cap \\bar B$, $\\bar A \\cap B$, $\\bar A \\cap \\bar B$.",
      "L'arbre compte $4$ chemins, dont les probabilités ont pour somme $1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arb_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac contient $3$ boules rouges et $2$ vertes. On tire une boule, on la REMET, puis on en tire une seconde. Quelle est la probabilité d'obtenir deux rouges ?",
    format: "short",
    expected: ["0,36"],
    comparator: "number_equal",
    hint: "Avec remise, la composition du sac ne change pas : $0{,}6$ à chaque tirage.",
    explanation: exp(
      "On construit un arbre à deux niveaux ; avec remise, les probabilités du second niveau sont les mêmes qu'au premier.",
      "$P(\\text{rouge}) = \\dfrac{3}{5} = 0{,}6$ à chaque tirage, et on multiplie le long du chemin.",
      "$0{,}6 \\times 0{,}6 = 0{,}36$.",
      "La probabilité est $0{,}36$."
    ),
    tags: ["premiere", "maths", "probas_cond", "arbre", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_arb_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie le long du chemin.",
    tags: ["premiere", "maths", "probas_cond", "arbre", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pBsiA = randomInt(2, 8) / 10;
      const inter = Math.round(pA * pBsiA * 100) / 100;
      return {
        text: `Sur l'arbre, $P(A) = ${fr(pA)}$ et $P_A(B) = ${fr(pBsiA)}$. Calcule $P(A \\cap B)$.`,
        format: "short",
        expected: [fr(inter)],
        comparator: "number_equal",
        canvas: arbre(pA, pBsiA, 0.3),
        explanation: exp(
          "On multiplie le long du chemin A → B.",
          `$P(A \\cap B) = ${fr(pA)} \\times ${fr(pBsiA)}$.`,
          `$= ${fr(inter)}$.`,
          `$P(A \\cap B) = ${fr(inter)}$.`
        ),
      };
    },
  },

  /* ===================== PC_TOTALES ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "Avec la partition $\\{A ; \\bar A\\}$, la formule des probabilités totales donne $P(B) =$",
    format: "qcm",
    choices: [
      "$P(A \\cap B) + P(\\bar A \\cap B)$",
      "$P(A) \\times P(B)$",
      "$P(A \\cap B) - P(\\bar A \\cap B)$",
      "$P(A) + P(B)$",
    ],
    expected: ["$P(A \\cap B) + P(\\bar A \\cap B)$"],
    comparator: "mcq_exact",
    hint: "On additionne les chemins menant à $B$.",
    explanation: exp(
      "$B$ est atteint soit via $A$, soit via $\\bar A$.",
      "On additionne les probabilités de ces deux chemins.",
      "$P(B) = P(A \\cap B) + P(\\bar A \\cap B)$.",
      "$P(A \\cap B) + P(\\bar A \\cap B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}3$ et $P(\\bar A \\cap B) = 0{,}2$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,5"],
    comparator: "number_equal",
    hint: "Somme des deux chemins menant à $B$.",
    explanation: exp(
      "On applique la formule des probabilités totales.",
      "$P(B) = P(A \\cap B) + P(\\bar A \\cap B) = 0{,}3 + 0{,}2$.",
      "$= 0{,}5$.",
      "$P(B) = 0{,}5$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}6$, $P_A(B) = 0{,}5$, $P_{\\bar A}(B) = 0{,}25$, calcule $P(B)$.",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$P(B) = P(A)P_A(B) + P(\\bar A)P_{\\bar A}(B)$.",
    explanation: exp(
      "On applique la formule des probabilités totales développée.",
      "$P(B) = 0{,}6 \\times 0{,}5 + 0{,}4 \\times 0{,}25 = 0{,}3 + 0{,}1$.",
      "$= 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    canvas: arbre(0.6, 0.5, 0.25),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Un test : $P(\\text{malade}) = 0{,}1$, $P_{\\text{malade}}(+) = 0{,}9$, $P_{\\text{sain}}(+) = 0{,}2$. Quelle est la probabilité d'avoir un test positif ?",
    format: "short",
    expected: ["0,27"],
    comparator: "number_equal",
    hint: "$0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2$.",
    explanation: exp(
      "On applique les probabilités totales sur la partition malade/sain.",
      "$P(+) = 0{,}1 \\times 0{,}9 + 0{,}9 \\times 0{,}2 = 0{,}09 + 0{,}18$.",
      "$= 0{,}27$.",
      "$P(+) = 0{,}27$."
    ),
    canvas: arbre(0.1, 0.9, 0.2),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $P(A) = 0{,}3$, $P_A(B) = 0{,}6$ et $P_{\\bar A}(B) = 0{,}2$, calcule $P(B)$.",
    format: "short",
    expected: ["0,32"],
    comparator: "number_equal",
    hint: "$P(\\bar A) = 0{,}7$ : additionne les deux chemins menant à $B$.",
    explanation: exp(
      "La formule des probabilités totales additionne les chemins qui aboutissent à $B$ : $P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$.",
      "$P(\\bar A) = 1 - 0{,}3 = 0{,}7$, donc $P(B) = 0{,}3 \\times 0{,}6 + 0{,}7 \\times 0{,}2$.",
      "$= 0{,}18 + 0{,}14 = 0{,}32$.",
      "$P(B) = 0{,}32$."
    ),
    canvas: arbre(0.3, 0.6, 0.2),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "On a $P(A \\cap B) = 0{,}25$ et $P(\\bar A \\cap B) = 0{,}15$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$B$ se réalise soit avec $A$, soit avec $\\bar A$ : il n'y a pas d'autre cas.",
    explanation: exp(
      "Tout événement $B$ se décompose selon la partition $\\{A ; \\bar A\\}$ : $P(B) = P(A \\cap B) + P(\\bar A \\cap B)$.",
      "$0{,}25 + 0{,}15$.",
      "$= 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(B) = 0{,}5$ et $P(A \\cap B) = 0{,}2$. Combien vaut $P(\\bar A \\cap B)$ ?",
    format: "short",
    expected: ["0,3"],
    comparator: "number_equal",
    hint: "Les deux morceaux de $B$ ont pour somme $P(B)$.",
    explanation: exp(
      "$B$ se partage en deux morceaux disjoints : celui qui rencontre $A$ et celui qui rencontre $\\bar A$.",
      "$P(\\bar A \\cap B) = P(B) - P(A \\cap B) = 0{,}5 - 0{,}2$.",
      "$= 0{,}3$.",
      "$P(\\bar A \\cap B) = 0{,}3$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi $\\{A ; \\bar A\\}$ forme-t-il une partition de l'univers ?",
    format: "qcm",
    choices: [
      "car $A$ et $\\bar A$ sont incompatibles et couvrent tous les cas",
      "car $A$ et $\\bar A$ ont la même probabilité",
      "car $P(A) + P(\\bar A) = 0$",
      "car $A$ et $\\bar A$ sont indépendants",
    ],
    expected: ["car $A$ et $\\bar A$ sont incompatibles et couvrent tous les cas"],
    comparator: "mcq_exact",
    hint: "Une partition : aucun recouvrement, aucun oubli.",
    explanation: exp(
      "Une partition découpe l'univers en morceaux disjoints qui, réunis, le recouvrent entièrement.",
      "$A$ et $\\bar A$ ne peuvent pas se produire ensemble (incompatibles) et l'un des deux se produit forcément.",
      "C'est ce qui autorise la formule des probabilités totales. Leurs probabilités ont pour somme $1$, et non $0$ ; elles n'ont aucune raison d'être égales.",
      "Ils sont incompatibles et couvrent tous les cas."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "Une usine a deux machines : la première produit $60\\%$ des pièces avec $2\\%$ de défauts, la seconde $40\\%$ avec $5\\%$ de défauts. Quelle est la probabilité qu'une pièce soit défectueuse ?",
    format: "short",
    expected: ["0,032"],
    comparator: "number_equal",
    hint: "$0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05$.",
    explanation: exp(
      "La machine d'origine forme une partition : on additionne les deux chemins menant à « défectueuse ».",
      "$P(D) = 0{,}6 \\times 0{,}02 + 0{,}4 \\times 0{,}05 = 0{,}012 + 0{,}02$.",
      "$= 0{,}032$, soit $3{,}2\\%$ des pièces.",
      "La probabilité est $0{,}032$."
    ),
    canvas: arbre(0.6, 0.02, 0.05),
    tags: ["premiere", "maths", "probas_cond", "totales", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 5,
    theme: "neutral",
    text: "A-t-on $P(B) = P_A(B) + P_{\\bar A}(B)$ ?",
    format: "qcm",
    choices: [
      "non : il faut pondérer par $P(A)$ et $P(\\bar A)$",
      "oui, toujours",
      "oui, si $A$ et $B$ sont indépendants",
      "oui, si $P(A) = 0{,}5$",
    ],
    expected: ["non : il faut pondérer par $P(A)$ et $P(\\bar A)$"],
    comparator: "mcq_exact",
    hint: "Cette somme pourrait dépasser $1$ : par exemple $0{,}9 + 0{,}8$.",
    explanation: exp(
      "La formule correcte est $P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$.",
      "Sans les poids $P(A)$ et $P(\\bar A)$, la somme peut dépasser $1$ : avec $P_A(B) = 0{,}9$ et $P_{\\bar A}(B) = 0{,}8$, on obtiendrait $1{,}7$, ce qui est impossible.",
      "Chaque probabilité conditionnelle doit être pesée par la probabilité du chemin qui y mène.",
      "Non : il faut pondérer par $P(A)$ et $P(\\bar A)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tot_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert la formule des probabilités totales ?",
    format: "qcm",
    choices: [
      "à calculer $P(B)$ en additionnant tous les chemins qui mènent à $B$",
      "à calculer $P_A(B)$ à partir de $P_B(A)$",
      "à vérifier que deux événements sont indépendants",
      "à calculer la somme des branches d'un nœud",
    ],
    expected: ["à calculer $P(B)$ en additionnant tous les chemins qui mènent à $B$"],
    comparator: "mcq_exact",
    hint: "Sur un arbre, combien de chemins aboutissent à $B$ ?",
    explanation: exp(
      "Un événement $B$ peut être atteint par plusieurs chemins de l'arbre.",
      "La formule additionne la probabilité de chacun de ces chemins pour reconstituer $P(B)$.",
      "C'est la règle « on multiplie le long d'un chemin, on additionne entre les chemins ».",
      "Elle sert à calculer $P(B)$ en additionnant tous les chemins qui mènent à $B$."
    ),
    tags: ["premiere", "maths", "probas_cond", "totales", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_pc_tot_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_totales",
    difficulty: 4,
    theme: "neutral",
    hint: "$P(B) = P(A)P_A(B) + P(\\bar A)P_{\\bar A}(B)$.",
    tags: ["premiere", "maths", "probas_cond", "totales", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pBsiA = randomInt(1, 9) / 10;
      const pBsiNonA = randomInt(1, 9) / 10;
      const pB = Math.round((pA * pBsiA + (1 - pA) * pBsiNonA) * 100) / 100;
      return {
        text: `Avec $P(A) = ${fr(pA)}$, $P_A(B) = ${fr(pBsiA)}$, $P_{\\bar A}(B) = ${fr(pBsiNonA)}$, calcule $P(B)$. (arrondir au centième)`,
        format: "short",
        expected: [fr(pB)],
        comparator: "number_equal",
        canvas: arbre(pA, pBsiA, pBsiNonA),
        explanation: exp(
          "On applique la formule des probabilités totales.",
          `$P(B) = ${fr(pA)} \\times ${fr(pBsiA)} + ${fr(1 - pA)} \\times ${fr(pBsiNonA)}$.`,
          `$= ${fr(pB)}$.`,
          `$P(B) = ${fr(pB)}$.`
        ),
      };
    },
  },

  /* ===================== PC_INDEPENDANCE ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 2,
    theme: "neutral",
    text: "Deux événements $A$ et $B$ sont indépendants si et seulement si :",
    format: "qcm",
    choices: [
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "$P(A \\cap B) = P(A) + P(B)$",
      "$P(A \\cap B) = 0$",
      "$P(A) = P(B)$",
    ],
    expected: ["$P(A \\cap B) = P(A) \\times P(B)$"],
    comparator: "mcq_exact",
    hint: "Produit des probabilités.",
    explanation: exp(
      "L'indépendance se caractérise par le produit.",
      "$A$ et $B$ indépendants $\\Leftrightarrow P(A \\cap B) = P(A) \\times P(B)$.",
      "C'est équivalent à $P_A(B) = P(B)$.",
      "$P(A \\cap B) = P(A) \\times P(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}5$ et $P(B) = 0{,}4$, combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,2"],
    comparator: "number_equal",
    hint: "$P(A) \\times P(B)$.",
    explanation: exp(
      "Pour des événements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
      "$0{,}5 \\times 0{,}4$.",
      "$= 0{,}2$.",
      "$P(A \\cap B) = 0{,}2$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}5$, $P(B) = 0{,}4$, $P(A \\cap B) = 0{,}3$. Les événements sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "Non, car $0{,}3 \\neq 0{,}5 \\times 0{,}4$",
      "Oui, car $0{,}3 = 0{,}5 \\times 0{,}4$",
      "Oui, toujours",
      "On ne peut pas savoir",
    ],
    expected: ["Non, car $0{,}3 \\neq 0{,}5 \\times 0{,}4$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A \\cap B)$ et $P(A)P(B)$.",
    explanation: exp(
      "On compare $P(A \\cap B)$ et $P(A) \\times P(B)$.",
      "$P(A) \\times P(B) = 0{,}5 \\times 0{,}4 = 0{,}2$, or $P(A \\cap B) = 0{,}3$.",
      "$0{,}3 \\neq 0{,}2$ : pas indépendants.",
      "Non, ils ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants, alors $P_A(B)$ est égale à :",
    format: "qcm",
    choices: ["$P(B)$", "$P(A)$", "$0$", "$1$"],
    expected: ["$P(B)$"],
    comparator: "mcq_exact",
    hint: "L'événement $A$ n'influence pas $B$.",
    explanation: exp(
      "L'indépendance signifie que $A$ n'influe pas sur $B$.",
      "La probabilité de $B$ sachant $A$ est la même que celle de $B$.",
      "$P_A(B) = P(B)$.",
      "$P(B)$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    text: "Si $A$ et $B$ sont indépendants avec $P(A) = 0{,}2$ et $P(B) = 0{,}5$, combien vaut $P(A \\cap B)$ ?",
    format: "short",
    expected: ["0,1"],
    comparator: "number_equal",
    hint: "Pour des événements indépendants, on multiplie simplement les probabilités.",
    explanation: exp(
      "L'indépendance se traduit par $P(A \\cap B) = P(A) \\times P(B)$.",
      "$0{,}2 \\times 0{,}5$.",
      "$= 0{,}1$.",
      "$P(A \\cap B) = 0{,}1$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(A) = 0{,}4$, $P(B) = 0{,}6$ et $P(A \\cap B) = 0{,}24$. Les événements sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "oui, car $0{,}4 \\times 0{,}6 = 0{,}24$",
      "non, car $0{,}4 + 0{,}6 \\neq 0{,}24$",
      "non, car $P(A) \\neq P(B)$",
      "on ne peut pas conclure",
    ],
    expected: ["oui, car $0{,}4 \\times 0{,}6 = 0{,}24$"],
    comparator: "mcq_exact",
    hint: "Compare $P(A) \\times P(B)$ et $P(A \\cap B)$.",
    explanation: exp(
      "Le test d'indépendance consiste à comparer $P(A \\cap B)$ au produit $P(A) \\times P(B)$.",
      "$0{,}4 \\times 0{,}6 = 0{,}24$.",
      "C'est exactement la valeur de $P(A \\cap B)$ : le test est concluant.",
      "Oui, les événements sont indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 4,
    theme: "neutral",
    text: "On a $P(B) = 0{,}3$ et $P_A(B) = 0{,}3$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$A$ et $B$ sont indépendants",
      "$A$ et $B$ sont incompatibles",
      "$P(A) = 0{,}3$",
      "$A$ est inclus dans $B$",
    ],
    expected: ["$A$ et $B$ sont indépendants"],
    comparator: "mcq_exact",
    hint: "Savoir que $A$ est réalisé change-t-il la probabilité de $B$ ?",
    explanation: exp(
      "L'indépendance signifie que la réalisation de $A$ ne modifie pas la probabilité de $B$.",
      "Ici $P_A(B) = P(B) = 0{,}3$ : l'information « $A$ est réalisé » n'apporte rien sur $B$.",
      "C'est exactement la caractérisation de l'indépendance ; on ne peut en revanche rien dire de $P(A)$.",
      "$A$ et $B$ sont indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "Deux événements INCOMPATIBLES $A$ et $B$, de probabilités non nulles, sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "non : $P(A \\cap B) = 0$ alors que $P(A) \\times P(B) > 0$",
      "oui : incompatibles et indépendants, c'est la même chose",
      "oui, si $P(A) = P(B)$",
      "on ne peut pas savoir",
    ],
    expected: ["non : $P(A \\cap B) = 0$ alors que $P(A) \\times P(B) > 0$"],
    comparator: "mcq_exact",
    hint: "Incompatibles signifie qu'ils ne peuvent pas se produire ensemble : que vaut alors $P(A \\cap B)$ ?",
    explanation: exp(
      "Incompatibles et indépendants sont deux notions différentes, souvent confondues.",
      "Incompatibles : $A \\cap B$ est impossible, donc $P(A \\cap B) = 0$. Or $P(A) \\times P(B) > 0$ puisque les deux probabilités sont non nulles.",
      "Les deux nombres diffèrent : les événements ne sont donc PAS indépendants. C'est même le contraire : savoir que $A$ est réalisé rend $B$ impossible.",
      "Non, ils ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé deux fois de suite. Les résultats des deux lancers sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "oui : le dé n'a pas de mémoire",
      "non : le premier lancer influence le second",
      "oui, seulement si le premier donne $6$",
      "non, car il s'agit du même dé",
    ],
    expected: ["oui : le dé n'a pas de mémoire"],
    comparator: "mcq_exact",
    hint: "Le résultat du premier lancer modifie-t-il les chances au second ?",
    explanation: exp(
      "Deux expériences sont indépendantes lorsque le résultat de l'une ne modifie pas les probabilités de l'autre.",
      "Un dé ne conserve aucune trace du lancer précédent : chaque face garde une probabilité de $\\dfrac{1}{6}$.",
      "Le fait que ce soit le même objet ne change rien ; c'est l'absence d'influence qui compte.",
      "Oui, les deux lancers sont indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "On tire deux cartes SANS REMISE dans un jeu. Les deux tirages sont-ils indépendants ?",
    format: "qcm",
    choices: [
      "non : la première carte tirée modifie la composition du jeu",
      "oui : les cartes sont mélangées",
      "oui : chaque carte a la même probabilité",
      "cela dépend de la première carte",
    ],
    expected: ["non : la première carte tirée modifie la composition du jeu"],
    comparator: "mcq_exact",
    hint: "Après le premier tirage, combien de cartes reste-t-il ?",
    explanation: exp(
      "L'indépendance suppose que le premier résultat ne change rien aux probabilités du second.",
      "Sans remise, la carte tirée ne revient pas : le second tirage se fait sur un jeu réduit et modifié.",
      "Les probabilités du second tirage dépendent donc du premier : c'est le cas typique où l'on doit passer par un arbre et des probabilités conditionnelles.",
      "Non, les tirages ne sont pas indépendants."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_ind_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 5,
    theme: "neutral",
    text: "$A$ et $B$ sont indépendants, $P(A) = 0{,}3$ et $P(A \\cap B) = 0{,}12$. Combien vaut $P(B)$ ?",
    format: "short",
    expected: ["0,4"],
    comparator: "number_equal",
    hint: "$0{,}3 \\times P(B) = 0{,}12$.",
    explanation: exp(
      "L'indépendance donne $P(A \\cap B) = P(A) \\times P(B)$ : on peut y voir une équation d'inconnue $P(B)$.",
      "$0{,}3 \\times P(B) = 0{,}12$.",
      "$P(B) = \\dfrac{0{,}12}{0{,}3} = 0{,}4$.",
      "$P(B) = 0{,}4$."
    ),
    tags: ["premiere", "maths", "probas_cond", "independance", "short"],
  },
  {
    kind: "template",
    id: "premiere_pc_ind_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance",
    difficulty: 3,
    theme: "neutral",
    hint: "Indépendants → $P(A \\cap B) = P(A) \\times P(B)$.",
    tags: ["premiere", "maths", "probas_cond", "independance", "template"],
    generate: () => {
      const pA = randomInt(2, 8) / 10;
      const pB = randomInt(2, 8) / 10;
      const inter = Math.round(pA * pB * 100) / 100;
      return {
        text: `$A$ et $B$ sont indépendants avec $P(A) = ${fr(pA)}$ et $P(B) = ${fr(pB)}$. Combien vaut $P(A \\cap B)$ ? (arrondir au centième)`,
        format: "short",
        expected: [fr(inter)],
        comparator: "number_equal",
        explanation: exp(
          "Pour des événements indépendants, on multiplie les probabilités.",
          `$P(A \\cap B) = ${fr(pA)} \\times ${fr(pB)}$.`,
          `$= ${fr(inter)}$.`,
          `$P(A \\cap B) = ${fr(inter)}$.`
        ),
      };
    },
  },

  /* ===================== PC_REGISTRES ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_reg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 3,
    theme: "neutral",
    text: "« Parmi les élèves qui font de l'espagnol, quelle est la proportion de demi-pensionnaires ? » Comment cela s'écrit-il ?",
    format: "qcm",
    choices: [
      "$P_{\\text{espagnol}}(\\text{demi-pensionnaire})$",
      "$P_{\\text{demi-pensionnaire}}(\\text{espagnol})$",
      "$P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$",
      "$P(\\text{espagnol}) \\times P(\\text{demi-pensionnaire})$",
    ],
    expected: ["$P_{\\text{espagnol}}(\\text{demi-pensionnaire})$"],
    comparator: "mcq_exact",
    hint: "Le mot « parmi » désigne l'ensemble dans lequel on se place : c'est la condition.",
    explanation: exp(
      "Dans $P_A(B)$, l'événement écrit EN INDICE est celui qu'on suppose déjà réalisé : c'est le monde dans lequel on se place.",
      "Le mot « parmi » signale toujours cette condition : « parmi les hispanisants » veut dire qu'on ne regarde plus que ces élèves-là.",
      "La condition est donc « espagnol », et l'événement dont on cherche la probabilité est « demi-pensionnaire ».",
      "Cela s'écrit $P_{\\text{espagnol}}(\\text{demi-pensionnaire})$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "neutral",
    text: "« La probabilité qu'un élève fasse de l'espagnol ET soit demi-pensionnaire » s'écrit :",
    format: "qcm",
    choices: [
      "$P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$",
      "$P_{\\text{espagnol}}(\\text{demi-pensionnaire})$",
      "$P(\\text{espagnol}) + P(\\text{demi-pensionnaire})$",
      "$P_{\\text{demi-pensionnaire}}(\\text{espagnol})$",
    ],
    expected: ["$P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$"],
    comparator: "mcq_exact",
    hint: "Ici on tire un élève au hasard dans TOUTE la classe, pas parmi un sous-groupe.",
    explanation: exp(
      "Deux écritures voisines disent des choses différentes : $P(A \\cap B)$ se place dans l'univers entier, $P_A(B)$ se place à l'intérieur de $A$.",
      "Ici, on tire un élève au hasard dans toute la classe, et on demande qu'il vérifie les DEUX conditions à la fois.",
      "C'est donc une intersection : $P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$. La phrase conditionnelle aurait contenu « parmi », « sachant que », ou « si l'on sait que ».",
      "L'écriture correcte est $P(\\text{espagnol} \\cap \\text{demi-pensionnaire})$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une plage de Saint-Gilles, on note $B$ « le baigneur porte un lycra » et $S$ « le baigneur a un coup de soleil ». Comment traduire « $30\\,\\%$ des baigneurs sans lycra ont un coup de soleil » ?",
    format: "qcm",
    choices: [
      "$P_{\\bar B}(S) = 0{,}3$",
      "$P_S(\\bar B) = 0{,}3$",
      "$P(\\bar B \\cap S) = 0{,}3$",
      "$P(\\bar B) = 0{,}3$",
    ],
    expected: ["$P_{\\bar B}(S) = 0{,}3$"],
    comparator: "mcq_exact",
    hint: "« des baigneurs sans lycra » : c'est le groupe dans lequel on compte les $30\\,\\%$.",
    explanation: exp(
      "Un pourcentage « de » quelque chose indique le groupe de référence : ce groupe devient la condition.",
      "« $30\\,\\%$ DES BAIGNEURS SANS LYCRA » : on se place parmi les baigneurs qui ne portent pas de lycra, c'est-à-dire dans $\\bar B$.",
      "Parmi eux, la proportion de coups de soleil est $0{,}3$ : cela s'écrit $P_{\\bar B}(S) = 0{,}3$.",
      "$P_{\\bar B}(S) = 0{,}3$ — l'indice porte le groupe de référence."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre $P(A \\cap B)$ et $P_A(B)$, avec un exemple de la vie courante.",
    format: "open",
    expected: ["univers", "parmi", "sachant", "sous-groupe", "reference", "référence", "denominateur", "dénominateur"],
    comparator: "contains_keyword",
    hint: "Dans chaque cas, sur quel groupe compte-t-on ?",
    explanation: exp(
      "Les deux nombres comptent la même chose au numérateur, mais pas sur le même groupe de référence.",
      "$P(A \\cap B)$ compte sur l'univers ENTIER : on tire au hasard dans toute la population et on demande les deux conditions.",
      "$P_A(B)$ ne compte que dans $A$ : on s'est déjà restreint. Exemple : sur $100$ élèves, $20$ font espagnol et $12$ d'entre eux sont demi-pensionnaires. Alors $P(A \\cap B) = \\dfrac{12}{100} = 0{,}12$, mais $P_A(B) = \\dfrac{12}{20} = 0{,}6$.",
      "Même numérateur, dénominateur différent : $P_A(B)$ change de monde, $P(A \\cap B)$ reste dans l'univers de départ."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_reg_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    text: "Quels mots d'un énoncé signalent qu'il faut écrire une probabilité CONDITIONNELLE ?",
    format: "open",
    expected: ["parmi", "sachant", "si l'on sait", "des ", "sous-groupe"],
    comparator: "contains_keyword",
    hint: "Cherche les mots qui restreignent la population avant de poser la question.",
    explanation: exp(
      "Une probabilité conditionnelle apparaît dès que l'énoncé restreint la population AVANT de poser sa question.",
      "Les marqueurs les plus fréquents sont : « parmi », « sachant que », « si l'on sait que », « lorsqu'on a déjà », et le « des » d'un pourcentage (« $30\\,\\%$ DES fumeurs »).",
      "À l'inverse, « et », « à la fois », « les deux » signalent une intersection, calculée sur l'univers entier.",
      "« Parmi » et « sachant que » sont les deux signaux les plus sûrs : ils désignent ce qui va en indice."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère si l'énoncé restreint la population avant de poser sa question.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "template"],
    generate: () => {
      const cas = [
        { phrase: "la probabilité qu'un élève tiré au hasard soit interne ET sportif", bonne: "$P(A \\cap B)$" },
        { phrase: "parmi les internes, la proportion de sportifs", bonne: "$P_A(B)$" },
        { phrase: "sachant qu'un élève est interne, la probabilité qu'il soit sportif", bonne: "$P_A(B)$" },
        { phrase: "parmi les sportifs, la proportion d'internes", bonne: "$P_B(A)$" },
        { phrase: "la probabilité qu'un élève tiré au hasard soit interne", bonne: "$P(A)$" },
      ];
      const c = pickOne(cas);
      const toutes = ["$P(A \\cap B)$", "$P_A(B)$", "$P_B(A)$", "$P(A)$"];
      return {
        text: `On note $A$ « l'élève est interne » et $B$ « l'élève est sportif ». Comment s'écrit : ${c.phrase} ?`,
        format: "qcm",
        choices: [c.bonne, ...toutes.filter((t) => t !== c.bonne)],
        expected: [c.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "L'événement écrit en INDICE est celui qu'on suppose déjà réalisé ; l'intersection, elle, se place dans l'univers entier.",
          `On cherche les mots qui restreignent la population dans : « ${c.phrase} ».`,
          "« Parmi » et « sachant que » annoncent une condition, donc un indice ; « et » annonce une intersection.",
          `L'écriture correcte est ${c.bonne}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_reg_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_registres",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis d'abord dans quel groupe on se place, puis ce qu'on y cherche.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "registres", "open", "template"],
    generate: () => {
      const cas = [
        { ecriture: "P_M(T)", M: "le patient est malade", T: "le test est positif", mots: ["parmi les malades", "sachant", "malade"] },
        { ecriture: "P_T(M)", M: "le patient est malade", T: "le test est positif", mots: ["parmi les tests positifs", "sachant", "positif"] },
        { ecriture: "P(M \\cap T)", M: "le patient est malade", T: "le test est positif", mots: ["et", "les deux", "univers", "tire au hasard"] },
        { ecriture: "P_{\\bar M}(T)", M: "le patient est malade", T: "le test est positif", mots: ["non malade", "sain", "parmi", "faux positif"] },
      ];
      const c = pickOne(cas);
      return {
        text: `On note $M$ « ${c.M} » et $T$ « ${c.T} ». Traduis $${c.ecriture}$ par une phrase en français, et précise sur quel groupe on compte.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Lire une écriture probabiliste, c'est dire deux choses : dans quel groupe on se place, et ce qu'on y compte.",
          "L'indice donne le groupe de référence ; l'événement entre parenthèses donne ce qu'on y cherche. Sans indice, le groupe est l'univers entier.",
          `Ici, l'écriture $${c.ecriture}$ se lit donc en nommant d'abord la population concernée.`,
          "La phrase doit contenir « parmi » ou « sachant que » dès qu'il y a un indice — sinon on décrit une intersection."
        ),
      };
    },
  },

  /* ===================== PC_TABLEAU ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_tab_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Dans ce tableau, quelle est la probabilité qu'un élève soit demi-pensionnaire, sachant qu'il est en seconde ?",
    format: "qcm",
    choices: [
      "$\\dfrac{45}{80}$",
      "$\\dfrac{45}{200}$",
      "$\\dfrac{45}{110}$",
      "$\\dfrac{80}{200}$",
    ],
    expected: ["$\\dfrac{45}{80}$"],
    comparator: "mcq_exact",
    hint: "« Sachant qu'il est en seconde » : quel effectif sert de dénominateur ?",
    explanation: exp(
      "Dans un tableau croisé, une probabilité conditionnelle se lit comme un quotient d'effectifs : la case, divisée par le TOTAL DE LA LIGNE (ou de la colonne) qui porte la condition.",
      "La condition est « être en seconde » : on ne regarde plus que cette ligne, dont le total est $80$.",
      "Parmi ces $80$ élèves, $45$ sont demi-pensionnaires : la probabilité vaut $\\dfrac{45}{80}$, soit environ $0{,}56$.",
      "$\\dfrac{45}{80}$ — le piège est de diviser par $200$, ce qui donnerait $P(\\text{seconde} \\cap \\text{DP})$."
    ),
    canvas: {
      kind: "tableau_donnees",
      title: "Régime des élèves par niveau",
      headers: ["", "Demi-pensionnaires", "Externes", "Total"],
      rows: [
        { label: "Seconde", values: [45, 35, 80] },
        { label: "Première", values: [65, 55, 120] },
        { label: "Total", values: [110, 90, 200] },
      ],
      highlight: { row: 0 },
    },
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tab_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le même tableau, quelle est la probabilité qu'un élève soit en seconde, sachant qu'il est demi-pensionnaire ?",
    format: "qcm",
    choices: [
      "$\\dfrac{45}{110}$",
      "$\\dfrac{45}{80}$",
      "$\\dfrac{45}{200}$",
      "$\\dfrac{110}{200}$",
    ],
    expected: ["$\\dfrac{45}{110}$"],
    comparator: "mcq_exact",
    hint: "La condition a changé : ce n'est plus une ligne, c'est une colonne.",
    explanation: exp(
      "Le dénominateur d'une probabilité conditionnelle est toujours le total du groupe placé en condition.",
      "Ici la condition est « être demi-pensionnaire » : c'est la COLONNE, dont le total vaut $110$.",
      "Le numérateur reste la même case, $45$. On obtient $\\dfrac{45}{110} \\approx 0{,}41$, alors que la question précédente donnait $\\dfrac{45}{80} \\approx 0{,}56$.",
      "$\\dfrac{45}{110}$ — même case, autre dénominateur : $P_A(B)$ et $P_B(A)$ ne sont pas égales."
    ),
    canvas: {
      kind: "tableau_donnees",
      title: "Régime des élèves par niveau",
      headers: ["", "Demi-pensionnaires", "Externes", "Total"],
      rows: [
        { label: "Seconde", values: [45, 35, 80] },
        { label: "Première", values: [65, 55, 120] },
        { label: "Total", values: [110, 90, 200] },
      ],
      highlight: { col: 1 },
    },
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tab_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un tableau croisé, comment sait-on quel effectif mettre au dénominateur d'une probabilité conditionnelle ?",
    format: "open",
    expected: ["condition", "total", "ligne", "colonne", "sous-groupe", "parmi"],
    comparator: "contains_keyword",
    hint: "Quel groupe l'énoncé désigne-t-il comme déjà connu ?",
    explanation: exp(
      "Une probabilité conditionnelle compte à l'intérieur d'un sous-groupe : ce sous-groupe fournit le dénominateur.",
      "On repère la condition — le « sachant que » ou le « parmi » — et on cherche son effectif TOTAL dans le tableau : c'est un total de ligne ou de colonne, jamais le total général.",
      "Le numérateur est la case qui croise les deux caractères. Par exemple $P_{\\text{seconde}}(\\text{DP})$ prend le total de la ligne « seconde » ; $P_{\\text{DP}}(\\text{seconde})$ prend le total de la colonne « DP ».",
      "Le dénominateur est toujours le total du groupe mis en condition ; le total général ne sert qu'aux probabilités simples et aux intersections."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_tab_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève calcule $\\dfrac{45}{200}$ et annonce « la probabilité qu'un élève de seconde soit demi-pensionnaire ». Explique son erreur.",
    format: "open",
    expected: ["total general", "total général", "intersection", "denominateur", "dénominateur", "80"],
    comparator: "contains_keyword",
    hint: "Que représente vraiment le nombre qu'il a calculé ?",
    explanation: exp(
      "Le dénominateur dit sur quel groupe on compte : le changer change complètement le sens du résultat.",
      "En divisant par $200$, l'élève a compté sur l'ensemble des élèves du lycée : il a calculé $P(\\text{seconde} \\cap \\text{DP})$, la probabilité qu'un élève tiré au hasard soit à la fois en seconde et demi-pensionnaire.",
      "La question portait sur les élèves de seconde uniquement : le dénominateur devait être $80$, et non $200$. Les deux résultats diffèrent nettement : $0{,}225$ contre $0{,}56$.",
      "Il a calculé une intersection au lieu d'une conditionnelle : il fallait $\\dfrac{45}{80}$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Numérateur : la case. Dénominateur : le total du groupe mis en condition.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "template"],
    generate: () => {
      const a = randomInt(20, 60);
      const b = randomInt(20, 60);
      const c = randomInt(20, 60);
      const d = randomInt(20, 60);
      const ligne = a + b;
      const colonne = a + c;
      const total = a + b + c + d;
      const parLigne = pickOne([true, false]);
      const correct = parLigne ? `$\\dfrac{${a}}{${ligne}}$` : `$\\dfrac{${a}}{${colonne}}$`;
      const autre = parLigne ? `$\\dfrac{${a}}{${colonne}}$` : `$\\dfrac{${a}}{${ligne}}$`;
      return {
        text: parLigne
          ? "Dans ce tableau, quelle est la probabilité qu'un élève soit demi-pensionnaire, sachant qu'il est en seconde ?"
          : "Dans ce tableau, quelle est la probabilité qu'un élève soit en seconde, sachant qu'il est demi-pensionnaire ?",
        format: "qcm",
        choices: [correct, autre, `$\\dfrac{${a}}{${total}}$`, `$\\dfrac{${ligne}}{${total}}$`],
        expected: [correct],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Régime des élèves par niveau",
          headers: ["", "Demi-pensionnaires", "Externes", "Total"],
          rows: [
            { label: "Seconde", values: [a, b, ligne] },
            { label: "Première", values: [c, d, c + d] },
            { label: "Total", values: [colonne, b + d, total] },
          ],
          highlight: parLigne ? { row: 0 } : { col: 1 },
        },
        explanation: exp(
          "Dans un tableau croisé, une conditionnelle est le quotient de la case par le total du groupe mis en condition.",
          parLigne
            ? `La condition est « être en seconde » : on prend le total de cette LIGNE, soit $${ligne}$.`
            : `La condition est « être demi-pensionnaire » : on prend le total de cette COLONNE, soit $${colonne}$.`,
          `Le numérateur est la case commune aux deux caractères, soit $${a}$.`,
          `La probabilité vaut ${correct} — diviser par le total général $${total}$ donnerait une intersection.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_tab_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_tableau",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux dénominateurs : ce ne sont pas les mêmes groupes.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "tableau", "canvas", "open", "template"],
    generate: () => {
      const a = randomInt(20, 50);
      const b = randomInt(20, 50);
      const c = randomInt(20, 50);
      const d = randomInt(20, 50);
      const ligne = a + b;
      const colonne = a + c;
      const total = a + b + c + d;
      return {
        text: "À partir de ce tableau, calcule les deux probabilités « demi-pensionnaire sachant seconde » et « seconde sachant demi-pensionnaire », puis explique pourquoi elles diffèrent.",
        format: "open",
        expected: [String(ligne), String(colonne), "denominateur", "dénominateur", "groupe", "pas le meme", "pas le même"],
        comparator: "contains_keyword",
        canvas: {
          kind: "tableau_donnees",
          title: "Régime des élèves par niveau",
          headers: ["", "Demi-pensionnaires", "Externes", "Total"],
          rows: [
            { label: "Seconde", values: [a, b, ligne] },
            { label: "Première", values: [c, d, c + d] },
            { label: "Total", values: [colonne, b + d, total] },
          ],
        },
        explanation: exp(
          "Les deux probabilités partagent le même numérateur — la case commune — mais pas le même dénominateur.",
          `« DP sachant seconde » se calcule sur la ligne : $\\dfrac{${a}}{${ligne}}$.`,
          `« Seconde sachant DP » se calcule sur la colonne : $\\dfrac{${a}}{${colonne}}$.`,
          "Elles diffèrent parce qu'on ne compte pas dans le même groupe : inverser la condition change le monde de référence, pas les effectifs croisés."
        ),
      };
    },
  },

  /* ===================== PC_ARBRE_CONSTRUIRE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_arbc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 4,
    theme: "reunion",
    text: "Énoncé : « $70\\,\\%$ des élèves d'un collège de Saint-André viennent en car ; parmi eux, $80\\,\\%$ arrivent à l'heure. » Que porte la branche de second niveau « à l'heure » partant de « car » ?",
    format: "qcm",
    choices: ["$0{,}8$", "$0{,}7$", "$0{,}56$", "$0{,}2$"],
    expected: ["$0{,}8$"],
    comparator: "mcq_exact",
    hint: "Les branches de second niveau portent des probabilités CONDITIONNELLES, telles quelles.",
    explanation: exp(
      "Dans un arbre, une branche de second niveau porte une probabilité conditionnelle : celle de l'événement sachant le chemin déjà parcouru.",
      "« Parmi eux, $80\\,\\%$ arrivent à l'heure » se lit $P_{\\text{car}}(\\text{à l'heure}) = 0{,}8$ : c'est exactement ce que porte la branche.",
      "Le $0{,}56$ est le produit $0{,}7 \\times 0{,}8$ : c'est la probabilité du CHEMIN complet, écrite à son extrémité, pas sur la branche.",
      "La branche porte $0{,}8$."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arbc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    text: "Explique comment on décide quel événement placer au PREMIER niveau d'un arbre pondéré.",
    format: "open",
    expected: ["conditionnelle", "sachant", "parmi", "donnee", "donnée", "premier"],
    comparator: "contains_keyword",
    hint: "Regarde quelles probabilités l'énoncé donne « toutes seules », sans condition.",
    explanation: exp(
      "Un arbre se construit dans l'ordre où l'information est donnée : au premier niveau, les événements dont on connaît la probabilité SANS condition.",
      "On repère dans l'énoncé les probabilités conditionnelles : leur condition doit déjà avoir été franchie quand on les rencontre.",
      "Si l'énoncé dit « $70\\,\\%$ viennent en car, et parmi eux $80\\,\\%$ sont à l'heure », alors « car » est au premier niveau et « à l'heure » au second — l'inverse obligerait à calculer avant de construire.",
      "Au premier niveau : l'événement qui sert de CONDITION aux autres ; au second : ceux qui s'écrivent avec « parmi » ou « sachant que »."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_arbc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    text: "Comment vérifier qu'un arbre pondéré est correctement rempli, avant de s'en servir ?",
    format: "open",
    expected: ["somme", "1", "noeud", "nœud", "vaut 1", "chemins"],
    comparator: "contains_keyword",
    hint: "Deux contrôles : un sur chaque nœud, un sur l'ensemble des chemins.",
    explanation: exp(
      "Un arbre correct obéit à deux règles de somme, faciles à vérifier d'un coup d'œil.",
      "Premier contrôle : à chaque nœud, les branches qui en partent forment une partition, donc leurs probabilités s'additionnent à $1$.",
      "Second contrôle : la somme des probabilités de TOUS les chemins complets vaut également $1$, puisqu'ils décrivent tous les cas possibles.",
      "Si l'une des deux sommes ne tombe pas sur $1$, il y a une erreur — le plus souvent une conditionnelle confondue avec une probabilité simple."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_arbc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "À chaque nœud, la somme des branches vaut $1$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "template"],
    generate: () => {
      const p = pickOne([0.15, 0.25, 0.3, 0.4, 0.55, 0.7, 0.8]);
      const q = Math.round((1 - p) * 100) / 100;
      const correct = `$${fr(q)}$`;
      return {
        text: `Sur un arbre, une branche issue d'un nœud porte $${fr(p)}$. Que porte l'autre branche partant du même nœud ?`,
        format: "qcm",
        choices: [correct, `$${fr(p)}$`, "$1$", `$${fr(Math.round(p * q * 100) / 100)}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les branches partant d'un même nœud décrivent tous les cas possibles à cette étape : elles forment une partition.",
          "Leurs probabilités s'additionnent donc à $1$.",
          `Ici $1 - ${fr(p)} = ${fr(q)}$.`,
          `L'autre branche porte ${correct} — c'est le contrôle le plus rapide pour repérer un arbre mal rempli.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_arbc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_arbre_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère la probabilité donnée sans condition : elle va au premier niveau.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "arbre_construire", "open", "template"],
    generate: () => {
      const cas = [
        {
          e: "Dans un lycée, $40\\,\\%$ des élèves sont internes. Parmi les internes, $75\\,\\%$ font du sport ; parmi les externes, $50\\,\\%$ en font.",
          n1: "interne / externe",
          p1: "0,4",
        },
        {
          e: "Une usine a deux ateliers : le premier fabrique $60\\,\\%$ des pièces, dont $3\\,\\%$ sont défectueuses ; le second fabrique le reste, dont $7\\,\\%$ sont défectueuses.",
          n1: "atelier 1 / atelier 2",
          p1: "0,6",
        },
        {
          e: "Sur une plage, $30\\,\\%$ des baigneurs portent un lycra. Parmi eux, $5\\,\\%$ attrapent un coup de soleil ; parmi les autres, $35\\,\\%$ en attrapent un.",
          n1: "lycra / pas de lycra",
          p1: "0,3",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Décris l'arbre pondéré qui traduit cet énoncé : « ${c.e} » — quels événements places-tu au premier niveau, et quelles probabilités portent les branches ?`,
        format: "open",
        expected: [c.p1, "premier niveau", "conditionnelle", "second niveau", "sachant"],
        comparator: "contains_keyword",
        explanation: exp(
          "On place au premier niveau l'événement dont la probabilité est donnée SANS condition ; les autres, introduits par « parmi » ou « dont », vont au second.",
          `Ici le premier niveau oppose ${c.n1}, avec $${c.p1}$ sur la première branche et son complément sur l'autre.`,
          "Chaque branche de second niveau porte une probabilité conditionnelle, recopiée telle quelle depuis l'énoncé.",
          "Contrôle : à chaque nœud, les deux branches doivent totaliser $1$."
        ),
      };
    },
  },

  /* ===================== PC_PARTITION (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_part_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    text: "Quelles conditions définissent une partition de l'univers ?",
    format: "qcm",
    choices: [
      "les événements sont deux à deux incompatibles et leur réunion est l'univers",
      "les événements ont tous la même probabilité",
      "les événements sont indépendants deux à deux",
      "il y en a exactement deux",
    ],
    expected: ["les événements sont deux à deux incompatibles et leur réunion est l'univers"],
    comparator: "mcq_exact",
    hint: "Deux exigences : ne pas se chevaucher, et ne rien oublier.",
    explanation: exp(
      "Partitionner l'univers, c'est le découper en morceaux qui ne se chevauchent pas et qui, mis bout à bout, le recouvrent entièrement.",
      "Première condition : les événements sont deux à deux incompatibles — aucune issue ne peut appartenir à deux d'entre eux.",
      "Seconde condition : leur réunion est l'univers tout entier — aucune issue n'est oubliée. Les probabilités, elles, n'ont aucune raison d'être égales.",
      "Incompatibles deux à deux, et de réunion l'univers : ni chevauchement, ni oubli."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_part_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    text: "On lance un dé. Les événements « obtenir un nombre pair » et « obtenir un multiple de $3$ » forment-ils une partition ?",
    format: "qcm",
    choices: [
      "non : le $6$ appartient aux deux, et le $1$ à aucun",
      "oui : tout nombre est pair ou multiple de $3$",
      "non : ils n'ont pas la même probabilité",
      "oui : ils sont incompatibles",
    ],
    expected: ["non : le $6$ appartient aux deux, et le $1$ à aucun"],
    comparator: "mcq_exact",
    hint: "Regarde où tombe le $6$, puis où tombe le $1$.",
    explanation: exp(
      "Pour réfuter une partition, il suffit d'exhiber une issue qui appartient à deux événements, ou une issue qui n'appartient à aucun.",
      "Le $6$ est pair ET multiple de $3$ : les deux événements se chevauchent, ils ne sont pas incompatibles.",
      "Le $1$ n'est ni pair ni multiple de $3$ : leur réunion ne couvre pas l'univers. Les deux conditions échouent.",
      "Non : il y a à la fois chevauchement et oubli."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_part_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la formule des probabilités totales exige-t-elle une partition de l'univers ?",
    format: "open",
    expected: ["compte deux fois", "oublie", "chevauche", "recouvre", "incompatibles", "reunion"],
    comparator: "contains_keyword",
    hint: "Que se passerait-il si deux morceaux se chevauchaient ? S'il en manquait un ?",
    explanation: exp(
      "La formule des probabilités totales découpe $B$ en morceaux selon les cas de la partition, puis additionne leurs probabilités.",
      "Si deux cas se chevauchaient, les issues communes seraient comptées DEUX FOIS : la somme dépasserait la vraie probabilité.",
      "Si les cas ne recouvraient pas tout l'univers, une partie de $B$ ne serait comptée nulle part : la somme serait trop petite.",
      "Il faut donc les deux conditions à la fois : ni double compte, ni oubli — c'est exactement la définition d'une partition."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_part_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    text: "Donne un exemple de partition de l'univers en trois événements, dans une situation de ton choix.",
    format: "open",
    expected: ["incompatibles", "reunion", "réunion", "univers", "tous les cas", "chacun"],
    comparator: "contains_keyword",
    hint: "Choisis un caractère qui range chaque individu dans une case et une seule.",
    explanation: exp(
      "Une partition découpe l'univers en cas qui ne se chevauchent pas et n'oublient personne.",
      "Il suffit de choisir un caractère qui classe chaque issue dans une case et une seule.",
      "Exemples : pour un lycée, « seconde », « première », « terminale » ; pour un dé, « moins de $3$ », « $3$ ou $4$ », « plus de $4$ » ; pour un trajet, « à pied », « en car », « autrement ».",
      "Le test : chaque individu tombe dans exactement une case — ni deux, ni zéro."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_part_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche une issue qui appartient aux deux, ou une issue qui n'appartient à aucun.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "template"],
    generate: () => {
      const cas = [
        { a: "obtenir un nombre pair", b: "obtenir un nombre impair", ok: true, pourquoi: "chaque nombre est soit pair, soit impair, jamais les deux" },
        { a: "obtenir un nombre inférieur ou égal à $3$", b: "obtenir un nombre supérieur ou égal à $4$", ok: true, pourquoi: "les deux ensembles se complètent exactement" },
        { a: "obtenir un multiple de $2$", b: "obtenir un multiple de $3$", ok: false, pourquoi: "le $6$ appartient aux deux, et le $1$ à aucun" },
        { a: "obtenir un nombre premier", b: "obtenir un nombre pair", ok: false, pourquoi: "le $2$ appartient aux deux, et le $1$ à aucun" },
        { a: "obtenir $1$ ou $2$", b: "obtenir $3$, $4$, $5$ ou $6$", ok: true, pourquoi: "les deux ensembles se complètent exactement" },
      ];
      const c = pickOne(cas);
      return {
        text: `On lance un dé à six faces. Les événements « ${c.a} » et « ${c.b} » forment-ils une partition de l'univers ?`,
        format: "qcm",
        choices: c.ok
          ? ["oui", "non : ils se chevauchent", "non : certaines issues sont oubliées", "on ne peut pas savoir"]
          : ["non", "oui", "oui, car ils sont incompatibles", "on ne peut pas savoir"],
        expected: [c.ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une partition exige deux choses : aucune issue commune à deux événements, et aucune issue oubliée.",
          "On passe donc en revue les six faces du dé, en regardant dans quel(s) événement(s) chacune tombe.",
          `Ici, ${c.pourquoi}.`,
          c.ok ? "Les deux événements forment bien une partition." : "Ce n'est pas une partition."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_part_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_partition",
    difficulty: 5,
    theme: "neutral",
    hint: "Vérifie les deux conditions séparément, en citant une issue à chaque fois.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "partition", "open", "template"],
    generate: () => {
      const cas = [
        { liste: "« seconde », « première », « terminale »", univers: "les élèves d'un lycée général", ok: true },
        { liste: "« interne », « demi-pensionnaire »", univers: "les élèves d'un lycée", ok: false },
        { liste: "« fait de l'espagnol », « fait de l'allemand »", univers: "les élèves d'un collège", ok: false },
        { liste: "« a moins de 15 ans », « a entre 15 et 18 ans », « a plus de 18 ans »", univers: "les inscrits d'un club", ok: true },
      ];
      const c = pickOne(cas);
      return {
        text: `Les événements ${c.liste} forment-ils une partition de l'univers, pour ${c.univers} ? Justifie en vérifiant les deux conditions.`,
        format: "open",
        expected: ["incompatibles", "reunion", "réunion", "oubli", "chevauche", "tous les cas"],
        comparator: "contains_keyword",
        explanation: exp(
          "Une partition demande deux vérifications indépendantes : pas de chevauchement, pas d'oubli.",
          "Condition 1 — les événements sont deux à deux incompatibles : personne ne peut appartenir à deux d'entre eux.",
          c.ok
            ? "Condition 2 — leur réunion est l'univers : chaque individu tombe dans exactement une case. Les deux conditions sont remplies."
            : "Condition 2 — leur réunion ne couvre pas tout : il existe des individus qui ne sont dans aucune des catégories citées (externe ; élève qui fait une autre langue).",
          c.ok ? "C'est bien une partition." : "Ce n'est pas une partition : il manque au moins un cas."
        ),
      };
    },
  },

  /* ===================== PC_INVERSER (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_inv_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "Un test de dépistage détecte $99\\,\\%$ des malades. Dans une population où $1$ personne sur $1000$ est malade, un test positif signifie-t-il qu'on a $99\\,\\%$ de chances d'être malade ?",
    format: "qcm",
    choices: [
      "non : $P_{\\text{malade}}(+)$ et $P_{+}(\\text{malade})$ sont deux choses différentes",
      "oui : c'est la même probabilité",
      "oui, si le test est fiable",
      "non : la probabilité est alors de $1\\,\\%$",
    ],
    expected: ["non : $P_{\\text{malade}}(+)$ et $P_{+}(\\text{malade})$ sont deux choses différentes"],
    comparator: "mcq_exact",
    hint: "Le $99\\,\\%$ se compte parmi les malades. La question se compte parmi les tests positifs.",
    explanation: exp(
      "Inverser la condition change complètement le groupe de référence : $P_A(B)$ et $P_B(A)$ n'ont aucune raison d'être égales.",
      "Le $99\\,\\%$ annoncé est $P_{\\text{malade}}(+)$ : on se place PARMI LES MALADES.",
      "La question demande $P_{+}(\\text{malade})$ : on se place parmi les tests positifs, un groupe bien plus large, car il contient aussi les faux positifs — nombreux quand la maladie est rare. Sur $1000$ personnes avec $5\\,\\%$ de faux positifs, on aurait environ $1$ vrai positif pour $50$ faux.",
      "Non : c'est le paradoxe des faux positifs, l'erreur la plus répandue en probabilités."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_inv_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 4,
    theme: "neutral",
    text: "Dans quel cas particulier a-t-on $P_A(B) = P_B(A)$ ?",
    format: "qcm",
    choices: [
      "lorsque $P(A) = P(B)$",
      "toujours",
      "jamais",
      "lorsque $A$ et $B$ sont incompatibles",
    ],
    expected: ["lorsque $P(A) = P(B)$"],
    comparator: "mcq_exact",
    hint: "Écris les deux quotients : ils ont le même numérateur.",
    explanation: exp(
      "Les deux conditionnelles s'écrivent avec la même intersection au numérateur : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ et $P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$.",
      "Elles ne diffèrent donc que par leur dénominateur.",
      "Elles sont égales exactement quand les deux dénominateurs le sont, c'est-à-dire quand $P(A) = P(B)$ — à condition que l'intersection ne soit pas nulle.",
      "Lorsque $P(A) = P(B)$ : c'est un cas particulier, pas une règle générale."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_inv_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "Explique, avec tes mots, pourquoi « la plupart des accidents ont lieu près du domicile » ne veut PAS dire « rouler près de chez soi est dangereux ».",
    format: "open",
    expected: ["inverse", "condition", "plus souvent", "temps", "trajets", "denominateur", "dénominateur"],
    comparator: "contains_keyword",
    hint: "Compare « parmi les accidents » et « parmi les trajets ».",
    explanation: exp(
      "La phrase compare deux probabilités conditionnelles qui n'ont pas le même groupe de référence.",
      "L'affirmation vraie est $P_{\\text{accident}}(\\text{près de chez soi})$ : parmi les accidents, beaucoup ont lieu près du domicile.",
      "La conclusion tirée serait $P_{\\text{près de chez soi}}(\\text{accident})$ : parmi les trajets près de chez soi, la proportion d'accidents. Or on fait énormément plus de trajets près de chez soi qu'ailleurs : le dénominateur est immense, la proportion reste faible.",
      "On a inversé la condition : le groupe de référence n'est pas le même, la conclusion ne suit pas."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_inv_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    text: "Comment calcule-t-on $P_B(A)$ quand l'énoncé ne donne que $P(A)$, $P_A(B)$ et $P_{\\bar A}(B)$ ?",
    format: "open",
    expected: ["probabilites totales", "probabilités totales", "intersection", "denominateur", "dénominateur", "P(B)"],
    comparator: "contains_keyword",
    hint: "Il te manque le dénominateur : comment l'obtenir ?",
    explanation: exp(
      "$P_B(A) = \\dfrac{P(A \\cap B)}{P(B)}$ : il faut donc le numérateur et le dénominateur, qu'aucun n'est donné directement.",
      "Le numérateur s'obtient par la règle du produit : $P(A \\cap B) = P(A) \\times P_A(B)$ — c'est le premier chemin de l'arbre.",
      "Le dénominateur s'obtient par la formule des probabilités totales : $P(B) = P(A) \\times P_A(B) + P(\\bar A) \\times P_{\\bar A}(B)$, c'est-à-dire la somme des deux chemins menant à $B$.",
      "On divise ensuite l'un par l'autre : c'est exactement le calcul qui redresse l'illusion des faux positifs."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_inv_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    hint: "Numérateur : le chemin $A$ puis $B$. Dénominateur : les deux chemins menant à $B$.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "template"],
    generate: () => {
      const pA = pickOne([0.02, 0.05, 0.1, 0.2]);
      const pBsiA = pickOne([0.9, 0.95, 0.8]);
      const pBsiNonA = pickOne([0.05, 0.1, 0.2]);
      const num = pA * pBsiA;
      const den = num + (1 - pA) * pBsiNonA;
      const rep = Math.round((num / den) * 100) / 100;
      const correct = `$${fr(rep)}$`;
      return {
        text:
          `Un test donne $P(M) = ${fr(pA)}$, $P_M(+) = ${fr(pBsiA)}$ et $P_{\\bar M}(+) = ${fr(pBsiNonA)}$. ` +
          `Quelle est la probabilité d'être malade sachant que le test est positif ? (arrondir au centième)`,
        format: "qcm",
        choices: [correct, `$${fr(pBsiA)}$`, `$${fr(Math.round(num * 100) / 100)}$`, `$${fr(pA)}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On cherche $P_{+}(M) = \\dfrac{P(M \\cap +)}{P(+)}$ : il faut construire les deux termes.",
          `Numérateur : $P(M) \\times P_M(+) = ${fr(pA)} \\times ${fr(pBsiA)} = ${fr(Math.round(num * 1000) / 1000)}$.`,
          `Dénominateur, par les probabilités totales : $${fr(Math.round(num * 1000) / 1000)} + ${fr(Math.round((1 - pA) * 100) / 100)} \\times ${fr(pBsiNonA)} = ${fr(Math.round(den * 1000) / 1000)}$.`,
          `Le quotient vaut ${correct} — souvent bien plus bas que le $${fr(pBsiA)}$ annoncé par le test, à cause des faux positifs.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_inv_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_inverser",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis quelle probabilité est réellement affirmée, et laquelle on croit entendre.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "inverser", "open", "template"],
    generate: () => {
      const cas = [
        {
          phrase: "la plupart des joueurs de basket professionnels sont grands, donc si tu es grand tu as de bonnes chances de devenir professionnel",
          mots: ["inverse", "condition", "beaucoup de grands", "denominateur", "dénominateur"],
        },
        {
          phrase: "$90\\,\\%$ des personnes hospitalisées avaient consulté un médecin, donc consulter un médecin rend malade",
          mots: ["inverse", "condition", "cause", "consultent", "denominateur", "dénominateur"],
        },
        {
          phrase: "presque tous les élèves qui ont eu $20$ avaient révisé, donc réviser garantit d'avoir $20$",
          mots: ["inverse", "condition", "beaucoup revisent", "beaucoup révisent", "denominateur", "dénominateur"],
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Quelqu'un affirme : « ${c.phrase} ». Explique l'erreur de raisonnement.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Deux probabilités conditionnelles inversées, $P_A(B)$ et $P_B(A)$, n'ont aucune raison d'être égales : elles se comptent sur des groupes différents.",
          "On identifie d'abord ce que la première partie de la phrase affirme réellement, puis ce que la conclusion suppose.",
          "La conclusion inverse la condition, et oublie que le nouveau groupe de référence est beaucoup plus grand : le dénominateur explose, la proportion s'effondre.",
          "L'affirmation de départ peut être vraie sans que la conclusion le soit : c'est l'erreur classique d'inversion."
        ),
      };
    },
  },

  /* ===================== PC_INDEPENDANCE_INCOMPATIBLE (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_indinc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 4,
    theme: "neutral",
    text: "Que signifie « $A$ et $B$ sont INCOMPATIBLES » ?",
    format: "qcm",
    choices: [
      "$A \\cap B = \\varnothing$ : ils ne peuvent pas se produire ensemble",
      "$P(A \\cap B) = P(A) \\times P(B)$",
      "la réalisation de l'un ne change pas la probabilité de l'autre",
      "$P(A) + P(B) = 1$",
    ],
    expected: ["$A \\cap B = \\varnothing$ : ils ne peuvent pas se produire ensemble"],
    comparator: "mcq_exact",
    hint: "Le mot parle de ce qui peut arriver EN MÊME TEMPS.",
    explanation: exp(
      "Deux événements incompatibles ne peuvent pas se réaliser simultanément : leur intersection est vide.",
      "C'est une propriété d'ENSEMBLES : elle se lit sur un diagramme, les deux parties ne se touchent pas.",
      "L'indépendance est tout autre chose : c'est une propriété de PROBABILITÉS, $P(A \\cap B) = P(A) \\times P(B)$, qui dit que savoir l'un ne renseigne pas sur l'autre.",
      "Incompatibles : $A \\cap B = \\varnothing$ — les deux mots n'ont rien à voir."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_indinc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "$A$ et $B$ sont incompatibles, avec $P(A) = 0{,}3$ et $P(B) = 0{,}5$. Combien vaut $P_A(B)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Si $A$ est réalisé, $B$ peut-il l'être aussi ?",
    explanation: exp(
      "$P_A(B)$ mesure la probabilité de $B$ une fois qu'on sait $A$ réalisé.",
      "Or $A$ et $B$ sont incompatibles : si $A$ est réalisé, $B$ est impossible.",
      "Donc $P_A(B) = 0$. Le calcul le confirme : $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0}{0{,}3} = 0$. Et comme $P(B) = 0{,}5 \\neq 0$, on voit que savoir $A$ change tout : les événements ne sont PAS indépendants.",
      "$P_A(B) = 0$ — deux événements incompatibles de probabilités non nulles sont toujours dépendants."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_indinc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi « incompatibles » et « indépendants » sont presque des contraires, alors qu'on les confond souvent.",
    format: "open",
    expected: ["intersection vide", "renseigne", "informe", "produit", "contraire", "exclut"],
    comparator: "contains_keyword",
    hint: "Si $A$ est réalisé, que sais-tu de $B$ dans chaque cas ?",
    explanation: exp(
      "Indépendants signifie : savoir que $A$ s'est produit n'apprend RIEN sur $B$, la probabilité de $B$ ne change pas.",
      "Incompatibles signifie : savoir que $A$ s'est produit apprend TOUT sur $B$ — il est devenu impossible.",
      "Le second cas est donc le comble de la dépendance. Deux événements incompatibles de probabilités non nulles ne peuvent jamais être indépendants : $P(A \\cap B) = 0$ alors que $P(A) \\times P(B) \\neq 0$.",
      "La confusion vient du vocabulaire courant, où « indépendant » évoque « séparé » : en probabilités, c'est presque l'inverse."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_indinc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    text: "Donne un exemple de deux événements incompatibles, et un exemple de deux événements indépendants, avec un même dé ou deux dés.",
    format: "open",
    expected: ["deux des", "deux dés", "meme lancer", "même lancer", "pair", "impair", "intersection vide"],
    comparator: "contains_keyword",
    hint: "L'incompatibilité se joue dans un seul lancer ; l'indépendance demande souvent deux lancers.",
    explanation: exp(
      "Incompatibles : les deux ne peuvent pas se produire ensemble. Indépendants : l'un ne renseigne pas sur l'autre.",
      "Sur UN SEUL lancer, « obtenir un nombre pair » et « obtenir $3$ » sont incompatibles : leur intersection est vide.",
      "Sur DEUX lancers, « le premier dé donne $6$ » et « le second dé donne $6$ » sont indépendants : le premier résultat n'influence pas le second, et $P(A \\cap B) = \\dfrac{1}{36} = \\dfrac{1}{6} \\times \\dfrac{1}{6}$.",
      "Les deux notions ne parlent même pas de la même chose : l'une des issues possibles, l'autre de l'information apportée."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_indinc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 4,
    theme: "neutral",
    hint: "Peuvent-ils se produire ensemble ? Le premier renseigne-t-il sur le second ?",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "template"],
    generate: () => {
      const cas = [
        { a: "obtenir un nombre pair", b: "obtenir un $5$", meme: true, rep: "incompatibles" },
        { a: "obtenir un nombre inférieur à $3$", b: "obtenir un $6$", meme: true, rep: "incompatibles" },
        { a: "le premier dé donne $6$", b: "le second dé donne un nombre pair", meme: false, rep: "indépendants" },
        { a: "le premier dé donne un nombre impair", b: "le second dé donne $4$", meme: false, rep: "indépendants" },
        { a: "obtenir un nombre pair", b: "obtenir un multiple de $3$", meme: true, rep: "ni l'un ni l'autre" },
      ];
      const c = pickOne(cas);
      const autres = ["incompatibles", "indépendants", "ni l'un ni l'autre"].filter((r) => r !== c.rep);
      return {
        text: `On lance ${c.meme ? "un dé" : "deux dés"}. Les événements « ${c.a} » et « ${c.b} » sont :`,
        format: "qcm",
        choices: [c.rep, ...autres, "les deux à la fois"],
        expected: [c.rep],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux questions différentes : peuvent-ils se produire ENSEMBLE (incompatibilité) ? le premier RENSEIGNE-t-il sur le second (dépendance) ?",
          c.meme
            ? "Ici les deux événements portent sur le même lancer : on regarde d'abord s'il existe une face qui les réalise tous les deux."
            : "Ici les deux événements portent sur des lancers différents : aucun résultat n'influence l'autre.",
          c.rep === "incompatibles"
            ? "Aucune face ne réalise les deux : l'intersection est vide."
            : c.rep === "indépendants"
              ? "Les deux peuvent se produire ensemble, et connaître l'un ne change rien à la probabilité de l'autre."
              : "Le $6$ réalise les deux, donc ils ne sont pas incompatibles ; et la probabilité de l'un change quand on connaît l'autre, donc ils ne sont pas indépendants.",
          `Ils sont ${c.rep}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_indinc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_independance_incompatible",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare $P(A \\cap B)$ et $P(A) \\times P(B)$, puis regarde si l'intersection est vide.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "independance_incompatible", "open", "template"],
    generate: () => {
      const cas = [
        { pA: 0.4, pB: 0.5, pAB: 0.2, rep: "indépendants" },
        { pA: 0.3, pB: 0.6, pAB: 0.18, rep: "indépendants" },
        { pA: 0.4, pB: 0.5, pAB: 0, rep: "incompatibles" },
        { pA: 0.25, pB: 0.4, pAB: 0, rep: "incompatibles" },
        { pA: 0.5, pB: 0.4, pAB: 0.3, rep: "ni indépendants ni incompatibles" },
      ];
      const c = pickOne(cas);
      return {
        text: `On donne $P(A) = ${fr(c.pA)}$, $P(B) = ${fr(c.pB)}$ et $P(A \\cap B) = ${fr(c.pAB)}$. Ces événements sont-ils indépendants, incompatibles, ou ni l'un ni l'autre ? Justifie.`,
        format: "open",
        expected: [c.rep === "incompatibles" ? "vide" : "produit", "P(A)", "intersection", c.rep.split(" ")[0]],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux tests distincts : intersection nulle → incompatibles ; $P(A \\cap B) = P(A) \\times P(B)$ → indépendants.",
          `On calcule le produit : $${fr(c.pA)} \\times ${fr(c.pB)} = ${fr(Math.round(c.pA * c.pB * 100) / 100)}$, et on le compare à $P(A \\cap B) = ${fr(c.pAB)}$.`,
          c.rep === "incompatibles"
            ? "L'intersection est nulle alors que le produit ne l'est pas : les événements sont incompatibles, donc dépendants."
            : c.rep === "indépendants"
              ? "Le produit est égal à l'intersection : la condition d'indépendance est vérifiée, et l'intersection n'est pas vide."
              : "L'intersection n'est ni nulle ni égale au produit : aucune des deux propriétés n'est vérifiée.",
          `Les événements sont ${c.rep}.`
        ),
      };
    },
  },

  /* ===================== PC_SUCCESSION (compléments) ===================== */
  {
    kind: "fixed",
    id: "premiere_pc_suc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 3,
    theme: "neutral",
    text: "Lors d'une succession de deux épreuves INDÉPENDANTES, la probabilité d'un chemin de l'arbre s'obtient en :",
    format: "qcm",
    choices: [
      "multipliant les probabilités des deux branches",
      "additionnant les probabilités des deux branches",
      "prenant la plus grande des deux",
      "divisant la première par la seconde",
    ],
    expected: ["multipliant les probabilités des deux branches"],
    comparator: "mcq_exact",
    hint: "C'est la même règle que pour tout arbre pondéré.",
    explanation: exp(
      "Dans tout arbre pondéré, la probabilité d'un chemin est le produit des probabilités rencontrées le long de ce chemin.",
      "Quand les épreuves sont indépendantes, les branches du second niveau portent les probabilités SIMPLES de la seconde épreuve : elles ne dépendent pas de ce qui précède.",
      "L'arbre est alors particulièrement simple à remplir — toutes les sous-branches d'un même rang portent les mêmes nombres.",
      "On multiplie le long du chemin ; on n'additionne que pour réunir plusieurs chemins."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_suc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Un sac contient $3$ boules rouges et $2$ vertes. On tire deux boules SANS remise. Quelle est la probabilité d'obtenir deux rouges ?",
    format: "qcm",
    choices: [
      "$\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{3}{10}$",
      "$\\dfrac{3}{5} \\times \\dfrac{3}{5} = \\dfrac{9}{25}$",
      "$\\dfrac{3}{5} + \\dfrac{2}{4}$",
      "$\\dfrac{2}{5} \\times \\dfrac{1}{4}$",
    ],
    expected: ["$\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{3}{10}$"],
    comparator: "mcq_exact",
    hint: "Après le premier tirage, combien reste-t-il de boules, et de rouges ?",
    explanation: exp(
      "Sans remise, la composition du sac change entre les deux tirages : les épreuves ne sont PAS indépendantes.",
      "Premier tirage : $\\dfrac{3}{5}$ de chances d'obtenir une rouge. Le sac contient alors $4$ boules, dont $2$ rouges.",
      "La branche de second niveau porte donc la conditionnelle $\\dfrac{2}{4}$, et non $\\dfrac{3}{5}$. Le produit vaut $\\dfrac{3}{5} \\times \\dfrac{2}{4} = \\dfrac{3}{10}$.",
      "$\\dfrac{3}{10}$ — avec remise, on aurait trouvé $\\dfrac{9}{25}$ : c'est là toute la différence."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_suc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi un tirage AVEC remise donne des épreuves indépendantes, mais pas un tirage sans remise.",
    format: "open",
    expected: ["composition", "identique", "change", "remet", "meme sac", "même sac"],
    comparator: "contains_keyword",
    hint: "Dans quel état se trouve le sac au moment du second tirage, dans chaque cas ?",
    explanation: exp(
      "Deux épreuves sont indépendantes quand le résultat de la première ne change pas les probabilités de la seconde.",
      "Avec remise, on remet la boule : le sac retrouve exactement sa composition de départ. La seconde épreuve se déroule dans les mêmes conditions, quel que soit le premier résultat.",
      "Sans remise, il manque une boule — et pas n'importe laquelle : celle qu'on vient de tirer. Les proportions changent, et elles changent différemment selon ce qu'on a tiré.",
      "C'est la composition du sac au second tirage qui décide : identique → indépendance, modifiée → dépendance."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_pc_suc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    text: "Un joueur a obtenu cinq fois « pile » de suite. Il affirme que « face » a maintenant plus de chances de sortir. Explique pourquoi il se trompe.",
    format: "open",
    expected: ["independant", "indépendant", "memoire", "mémoire", "toujours", "1/2", "0,5"],
    comparator: "contains_keyword",
    hint: "La pièce se souvient-elle des lancers précédents ?",
    explanation: exp(
      "Les lancers successifs d'une pièce sont des épreuves indépendantes : chaque lancer ignore complètement les précédents.",
      "La probabilité de « face » reste donc $\\dfrac{1}{2}$ au sixième lancer, exactement comme au premier.",
      "Ce qui est rare, c'est la SUITE de cinq piles vue d'avance ($\\dfrac{1}{32}$). Mais une fois qu'elle est réalisée, elle n'influence rien : la pièce n'a pas de mémoire.",
      "C'est l'erreur du joueur : confondre « une longue série est improbable au départ » et « elle doit se corriger ensuite »."
    ),
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 4,
    theme: "neutral",
    hint: "Avec remise, les deux fractions sont identiques ; sans remise, la seconde change.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "template"],
    generate: () => {
      const r = randomInt(2, 5);
      const v = randomInt(2, 5);
      const n = r + v;
      const avecRemise = pickOne([true, false]);
      const correct = avecRemise
        ? `$\\dfrac{${r}}{${n}} \\times \\dfrac{${r}}{${n}}$`
        : `$\\dfrac{${r}}{${n}} \\times \\dfrac{${r - 1}}{${n - 1}}$`;
      const autre = avecRemise
        ? `$\\dfrac{${r}}{${n}} \\times \\dfrac{${r - 1}}{${n - 1}}$`
        : `$\\dfrac{${r}}{${n}} \\times \\dfrac{${r}}{${n}}$`;
      return {
        text: `Un sac contient $${r}$ boules rouges et $${v}$ vertes. On tire deux boules ${avecRemise ? "AVEC" : "SANS"} remise. Quel calcul donne la probabilité d'obtenir deux rouges ?`,
        format: "qcm",
        choices: [correct, autre, `$\\dfrac{${r}}{${n}} + \\dfrac{${r}}{${n}}$`, `$\\dfrac{${r}}{${n}}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La probabilité d'un chemin est le produit des probabilités des branches ; c'est la SECONDE branche qui distingue les deux situations.",
          `Premier tirage : $\\dfrac{${r}}{${n}}$ dans les deux cas.`,
          avecRemise
            ? `Avec remise, le sac retrouve ses $${n}$ boules dont $${r}$ rouges : la seconde branche porte la même fraction.`
            : `Sans remise, il reste $${n - 1}$ boules dont $${r - 1}$ rouges : la seconde branche porte $\\dfrac{${r - 1}}{${n - 1}}$.`,
          `Le calcul correct est ${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_pc_suc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "probabilites_conditionnelles",
    microId: "pc_succession",
    difficulty: 5,
    theme: "neutral",
    hint: "Demande-toi si le résultat de la première épreuve modifie les conditions de la seconde.",
    tags: ["premiere", "maths", "probabilites_conditionnelles", "succession", "open", "template"],
    generate: () => {
      const cas = [
        { s: "on lance deux fois le même dé", ok: true },
        { s: "on tire deux cartes d'un jeu, sans remettre la première", ok: false },
        { s: "on tire une boule dans un sac, on la remet, puis on en tire une seconde", ok: true },
        { s: "on interroge deux élèves différents d'une classe, sans remettre le premier nom dans la liste", ok: false },
        { s: "on lance une pièce, puis on lance un dé", ok: true },
      ];
      const c = pickOne(cas);
      return {
        text: `Dans l'expérience suivante, les deux épreuves sont-elles indépendantes ? « ${c.s} » Justifie.`,
        format: "open",
        expected: [c.ok ? "independant" : "depend", c.ok ? "indépendant" : "dépend", "change", "conditions", "meme", "même"],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux épreuves sont indépendantes lorsque le résultat de la première ne modifie pas les probabilités de la seconde.",
          "Le test pratique : après la première épreuve, la situation de départ est-elle intacte ?",
          c.ok
            ? "Ici rien n'a changé : la seconde épreuve se déroule dans exactement les mêmes conditions, quel que soit le premier résultat."
            : "Ici la première épreuve modifie ce qui reste : les proportions ne sont plus les mêmes, et elles dépendent de ce qui est sorti.",
          c.ok ? "Les épreuves sont indépendantes." : "Les épreuves ne sont pas indépendantes : il faut des probabilités conditionnelles."
        ),
      };
    },
  },
];
