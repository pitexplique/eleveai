// lib/tutor-v4/questionBank/terminale-spe/maths/loi-binomiale.bank.ts
//
// Notion : Loi binomiale (loi_binomiale)
//
// microSkills couverts (~10 items chacun, difficultés étalées 1→5) :
//   binomiale_schema               — Reconnaître un schéma de Bernoulli
//   binomiale_reconnaitre          — Reconnaître une loi binomiale B(n,p)
//   binomiale_calculer             — Calculer P(X=k) = C(n,k) p^k (1-p)^(n-k)
//   binomiale_esperance_variance   — E=np, V=np(1-p), σ=√(np(1-p))
//   binomiale_intervalle           — P(X≤k), P(X≥1)=1-P(X=0), etc.
//   binomiale_defi                 — Exercice type bac
//
// Réf. B(3 ; 0,5) : P(0)=0,125 / P(1)=0,375 / P(2)=0,375 / P(3)=0,125 ;
//   E=1,5 ; V=0,75.
//
// Conventions : QCM pour les décimaux/expressions (règle « écriture maths → QCM »),
//   "short" pour les espérances/variances entières. Coefficient binomial : $\binom{n}{k}$.

import type { TutorBankItemV4, CanvasFigure, DifficultyLevel, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

// Schéma de Bernoulli (2 répétitions, p = 0,5) : succès S / échec E.
const arbreBernoulliCanvas: CanvasFigure = {
  kind: "arbre_proba",
  titre: "Schéma de Bernoulli (2 répétitions)",
  racineEnfants: [
    {
      label: "S",
      proba: "0,5",
      enfants: [
        { label: "S", proba: "0,5" },
        { label: "E", proba: "0,5" },
      ],
    },
    {
      label: "E",
      proba: "0,5",
      enfants: [
        { label: "S", proba: "0,5" },
        { label: "E", proba: "0,5" },
      ],
    },
  ],
};

// Loi binomiale B(3 ; 0,5) en diagramme en bâtons.
const binomialeBatonsCanvas: CanvasFigure = {
  kind: "stat_graph",
  graphType: "batons",
  title: "Loi binomiale B(3 ; 0,5)",
  data: [
    { label: "0", value: 0.125 },
    { label: "1", value: 0.375 },
    { label: "2", value: 0.375 },
    { label: "3", value: 0.125 },
  ],
  display: { showValues: true, showLabels: true },
};

export const loiBinomialeBank: TutorBankItemV4[] = [
  /* =========================================================
     BINOMIALE_SCHEMA — Reconnaître un schéma de Bernoulli
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d'issues possède une épreuve de Bernoulli ?",
    format: "qcm",
    choices: ["$2$", "$1$", "$3$", "une infinité"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    hint: "Succès ou échec.",
    explanation: exp(
      "Une épreuve de Bernoulli n'a que deux résultats possibles.",
      "On retient la définition.",
      "Les deux issues sont le succès et l'échec.",
      "Une épreuve de Bernoulli a $2$ issues."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 1,
    theme: "neutral",
    text: "Comment appelle-t-on les deux issues d'une épreuve de Bernoulli ?",
    format: "qcm",
    choices: ["succès et échec", "pile et face", "vrai et faux", "gain et perte"],
    expected: ["succès et échec"],
    comparator: "mcq_exact",
    hint: "Terminologie officielle du cours.",
    explanation: exp(
      "Les deux issues portent des noms standardisés.",
      "On utilise le vocabulaire du cours.",
      "On les nomme « succès » et « échec ».",
      "Les deux issues sont le succès et l'échec."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 2,
    theme: "neutral",
    text: "Si la probabilité de succès est $p$, quelle est la probabilité d'échec ?",
    format: "qcm",
    choices: ["$1 - p$", "$p$", "$-p$", "$\\dfrac{1}{p}$"],
    expected: ["$1 - p$"],
    comparator: "mcq_exact",
    hint: "Les deux issues ont une somme de probabilités égale à $1$.",
    explanation: exp(
      "Succès et échec sont complémentaires.",
      "On utilise $P(\\text{succès}) + P(\\text{échec}) = 1$.",
      "$P(\\text{échec}) = 1 - p$.",
      "La probabilité d'échec est $1 - p$."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 2,
    theme: "neutral",
    text: "Un schéma de Bernoulli est la répétition de $n$ épreuves de Bernoulli :",
    format: "qcm",
    choices: [
      "identiques et indépendantes",
      "différentes à chaque fois",
      "dépendantes les unes des autres",
      "avec un nombre d'issues variable",
    ],
    expected: ["identiques et indépendantes"],
    comparator: "mcq_exact",
    hint: "Deux conditions essentielles.",
    explanation: exp(
      "Le schéma de Bernoulli répète la même épreuve plusieurs fois.",
      "On vérifie les deux conditions du cours.",
      "Les épreuves doivent être identiques et indépendantes.",
      "Ce sont $n$ épreuves identiques et indépendantes."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie « épreuves indépendantes » dans un schéma de Bernoulli ?",
    format: "qcm",
    choices: [
      "le résultat d'une épreuve n'influence pas les autres",
      "les épreuves se font en même temps",
      "elles ont des probabilités différentes",
      "il n'y a qu'une seule épreuve",
    ],
    expected: ["le résultat d'une épreuve n'influence pas les autres"],
    comparator: "mcq_exact",
    hint: "Indépendance = pas d'influence mutuelle.",
    explanation: exp(
      "L'indépendance concerne l'influence entre épreuves.",
      "On traduit la notion d'indépendance.",
      "Le résultat d'une épreuve ne change pas les probabilités des suivantes.",
      "Les épreuves n'ont aucune influence les unes sur les autres."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 3,
    theme: "neutral",
    text: "Lancer 10 fois une pièce équilibrée et compter les « pile » : est-ce un schéma de Bernoulli ?",
    format: "qcm",
    choices: [
      "Oui : 10 épreuves identiques et indépendantes à 2 issues",
      "Non : il y a trop d'épreuves",
      "Non : les lancers sont dépendants",
      "Non : il y a plus de 2 issues",
    ],
    expected: ["Oui : 10 épreuves identiques et indépendantes à 2 issues"],
    comparator: "mcq_exact",
    hint: "Chaque lancer : pile (succès) ou face (échec), sans influence.",
    explanation: exp(
      "On vérifie les conditions d'un schéma de Bernoulli.",
      "Chaque lancer a 2 issues, les lancers sont identiques et indépendants.",
      "On répète $10$ fois la même épreuve de Bernoulli.",
      "Oui, c'est un schéma de Bernoulli."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 4,
    theme: "neutral",
    text: "On tire 3 boules SANS remise dans une urne, en comptant les rouges. Est-ce un schéma de Bernoulli ?",
    format: "qcm",
    choices: [
      "Non : les tirages ne sont pas indépendants",
      "Oui, toujours",
      "Non : il y a trop d'issues",
      "Oui : il y a 2 couleurs",
    ],
    expected: ["Non : les tirages ne sont pas indépendants"],
    comparator: "mcq_exact",
    hint: "Sans remise, la composition de l'urne change à chaque tirage.",
    explanation: exp(
      "L'indépendance est une condition essentielle.",
      "Sans remise, retirer une boule modifie les probabilités du tirage suivant.",
      "Les tirages sont donc dépendants.",
      "Non : ce n'est pas un schéma de Bernoulli (tirages dépendants)."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 4,
    theme: "neutral",
    text: "On tire 3 boules AVEC remise dans une urne, en comptant les rouges. Est-ce un schéma de Bernoulli ?",
    format: "qcm",
    choices: [
      "Oui : avec remise, les tirages sont identiques et indépendants",
      "Non : les tirages sont dépendants",
      "Non : il y a trop d'issues",
      "Non : il faut une pièce",
    ],
    expected: ["Oui : avec remise, les tirages sont identiques et indépendants"],
    comparator: "mcq_exact",
    hint: "Avec remise, la composition de l'urne reste la même.",
    explanation: exp(
      "On vérifie l'indépendance avec remise.",
      "Avec remise, l'urne retrouve sa composition : les tirages sont identiques et indépendants.",
      "Chaque tirage est « rouge » (succès) ou « non rouge » (échec).",
      "Oui, c'est un schéma de Bernoulli."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 3,
    theme: "neutral",
    text: "L'arbre ci-dessous représente un schéma de Bernoulli à 2 répétitions ($S$ = succès, $E$ = échec). Que vaut la probabilité du chemin $S$ puis $S$ ?",
    format: "qcm",
    choices: ["$0{,}25$", "$0{,}5$", "$1$", "$0{,}75$"],
    expected: ["$0{,}25$"],
    comparator: "mcq_exact",
    canvas: arbreBernoulliCanvas,
    hint: "On multiplie : $0{,}5 \\times 0{,}5$.",
    explanation: exp(
      "La probabilité d'un chemin est le produit des probabilités des branches.",
      "On suit le chemin $S$ puis $S$.",
      "$0{,}5 \\times 0{,}5 = 0{,}25$.",
      "La probabilité du chemin $S$-$S$ est $0{,}25$."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "arbre", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_schema_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_schema",
    difficulty: 5,
    theme: "neutral",
    text: "Sur l'arbre de Bernoulli ci-dessous, combien de chemins donnent exactement un succès $S$ sur les 2 répétitions ?",
    format: "qcm",
    choices: ["$2$", "$1$", "$3$", "$4$"],
    expected: ["$2$"],
    comparator: "mcq_exact",
    canvas: arbreBernoulliCanvas,
    hint: "Cherche les chemins $S$-$E$ et $E$-$S$.",
    explanation: exp(
      "On dénombre les chemins menant à exactement un succès.",
      "Les chemins favorables sont $S$ puis $E$, et $E$ puis $S$.",
      "Il y a donc $2$ chemins (ce qui correspond à $\\binom{2}{1} = 2$).",
      "Il y a $2$ chemins donnant exactement un succès."
    ),
    tags: ["terminale-spe", "binomiale", "bernoulli", "arbre", "canvas", "qcm"],
  },

  /* =========================================================
     BINOMIALE_RECONNAITRE — Reconnaître B(n,p)
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Si $X$ suit une loi binomiale $\\mathcal{B}(n\\,;p)$, que compte la variable $X$ ?",
    format: "qcm",
    choices: [
      "le nombre de succès",
      "le nombre d'épreuves",
      "la probabilité de succès",
      "le nombre d'échecs uniquement",
    ],
    expected: ["le nombre de succès"],
    comparator: "mcq_exact",
    hint: "$X$ compte les succès parmi les $n$ épreuves.",
    explanation: exp(
      "La loi binomiale modélise le nombre de succès d'un schéma de Bernoulli.",
      "On identifie ce que représente $X$.",
      "$X$ est le nombre de succès obtenus sur les $n$ répétitions.",
      "$X$ compte le nombre de succès."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans la notation $\\mathcal{B}(n\\,;p)$, que représentent $n$ et $p$ ?",
    format: "qcm",
    choices: [
      "$n$ = nombre d'épreuves, $p$ = probabilité de succès",
      "$n$ = nombre de succès, $p$ = nombre d'épreuves",
      "$n$ = probabilité, $p$ = espérance",
      "$n$ = échecs, $p$ = succès",
    ],
    expected: ["$n$ = nombre d'épreuves, $p$ = probabilité de succès"],
    comparator: "mcq_exact",
    hint: "$n$ est entier, $p$ est une probabilité.",
    explanation: exp(
      "Les deux paramètres de la loi binomiale ont un rôle précis.",
      "On identifie chaque paramètre.",
      "$n$ est le nombre d'épreuves, $p$ la probabilité de succès à chaque épreuve.",
      "$n$ = nombre d'épreuves, $p$ = probabilité de succès."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "On lance 10 fois un dé équilibré et $X$ compte le nombre de « 6 ». Quelle est la loi de $X$ ?",
    format: "qcm",
    choices: [
      "$\\mathcal{B}\\!\\left(10\\,;\\dfrac{1}{6}\\right)$",
      "$\\mathcal{B}\\!\\left(6\\,;\\dfrac{1}{10}\\right)$",
      "$\\mathcal{B}(10\\,;6)$",
      "$\\mathcal{B}\\!\\left(10\\,;\\dfrac{1}{2}\\right)$",
    ],
    expected: ["$\\mathcal{B}\\!\\left(10\\,;\\dfrac{1}{6}\\right)$"],
    comparator: "mcq_exact",
    hint: "$n = 10$ lancers, $p = P(\\text{obtenir un 6}) = \\dfrac{1}{6}$.",
    explanation: exp(
      "On identifie les paramètres $n$ et $p$ dans le contexte.",
      "Il y a $10$ épreuves, et un succès (« 6 ») a la probabilité $\\dfrac{1}{6}$.",
      "Donc $X$ suit $\\mathcal{B}\\!\\left(10\\,;\\dfrac{1}{6}\\right)$.",
      "$X \\sim \\mathcal{B}\\!\\left(10\\,;\\dfrac{1}{6}\\right)$."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une machine produit des pièces, chacune défectueuse avec probabilité $0{,}05$, indépendamment. On en prélève 20 et $X$ compte les défectueuses. Quelle est la loi de $X$ ?",
    format: "qcm",
    choices: [
      "$\\mathcal{B}(20\\,;0{,}05)$",
      "$\\mathcal{B}(0{,}05\\,;20)$",
      "$\\mathcal{B}(20\\,;0{,}95)$",
      "$\\mathcal{B}(5\\,;0{,}2)$",
    ],
    expected: ["$\\mathcal{B}(20\\,;0{,}05)$"],
    comparator: "mcq_exact",
    hint: "$n = 20$, succès = « défectueuse » de probabilité $0{,}05$.",
    explanation: exp(
      "On identifie $n$ et $p$.",
      "On prélève $20$ pièces ($n = 20$), un succès est « défectueuse » ($p = 0{,}05$).",
      "Les prélèvements sont indépendants.",
      "$X \\sim \\mathcal{B}(20\\,;0{,}05)$."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Si $X \\sim \\mathcal{B}(n\\,;p)$, quelles valeurs $X$ peut-elle prendre ?",
    format: "qcm",
    choices: [
      "les entiers de $0$ à $n$",
      "les entiers de $1$ à $n$",
      "tous les réels de $0$ à $1$",
      "uniquement $0$ et $1$",
    ],
    expected: ["les entiers de $0$ à $n$"],
    comparator: "mcq_exact",
    hint: "On peut avoir de $0$ succès à $n$ succès.",
    explanation: exp(
      "$X$ compte des succès parmi $n$ épreuves.",
      "On peut obtenir entre $0$ et $n$ succès.",
      "Donc $X \\in \\{0, 1, \\dots, n\\}$.",
      "$X$ prend les valeurs entières de $0$ à $n$."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "On répète 5 fois une expérience et $X$ compte les succès. La loi de $X$ est $\\mathcal{B}(5\\,;0{,}3)$. Combien vaut $n$ ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$n$ est le premier paramètre de $\\mathcal{B}(n\\,;p)$.",
    explanation: exp(
      "On lit le paramètre $n$ dans $\\mathcal{B}(n\\,;p)$.",
      "Ici la loi est $\\mathcal{B}(5\\,;0{,}3)$.",
      "Le nombre d'épreuves est $n = 5$.",
      "$n = 5$."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "Pour qu'une situation suive une loi binomiale, laquelle de ces conditions n'est PAS requise ?",
    format: "qcm",
    choices: [
      "que les épreuves aient des probabilités différentes",
      "un nombre fixé $n$ d'épreuves",
      "deux issues par épreuve",
      "des épreuves indépendantes",
    ],
    expected: ["que les épreuves aient des probabilités différentes"],
    comparator: "mcq_exact",
    hint: "Les épreuves doivent au contraire être identiques.",
    explanation: exp(
      "On vérifie les conditions de la loi binomiale.",
      "Les épreuves doivent être identiques (même $p$), pas différentes.",
      "Avoir des probabilités différentes contredit le modèle.",
      "La condition « probabilités différentes » n'est pas requise (elle est même interdite)."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Une pièce équilibrée est lancée 3 fois ; $X$ compte les « pile ». Quelle est la loi de $X$ ?",
    format: "qcm",
    choices: [
      "$\\mathcal{B}(3\\,;0{,}5)$",
      "$\\mathcal{B}(0{,}5\\,;3)$",
      "$\\mathcal{B}(3\\,;3)$",
      "$\\mathcal{B}(2\\,;0{,}5)$",
    ],
    expected: ["$\\mathcal{B}(3\\,;0{,}5)$"],
    comparator: "mcq_exact",
    hint: "$n = 3$ lancers, $p = 0{,}5$.",
    explanation: exp(
      "On identifie $n$ et $p$.",
      "Il y a $3$ lancers ($n = 3$) et $P(\\text{pile}) = 0{,}5$.",
      "Donc $X \\sim \\mathcal{B}(3\\,;0{,}5)$.",
      "$X \\sim \\mathcal{B}(3\\,;0{,}5)$."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 4,
    theme: "neutral",
    text: "On interroge 50 personnes au hasard ; chacune est favorable avec probabilité $0{,}4$, indépendamment. $X$ = nombre de favorables. Quelle est la loi de $X$ ?",
    format: "qcm",
    choices: [
      "$\\mathcal{B}(50\\,;0{,}4)$",
      "$\\mathcal{B}(0{,}4\\,;50)$",
      "$\\mathcal{B}(50\\,;0{,}6)$",
      "$\\mathcal{B}(20\\,;0{,}4)$",
    ],
    expected: ["$\\mathcal{B}(50\\,;0{,}4)$"],
    comparator: "mcq_exact",
    hint: "$n = 50$, $p = 0{,}4$ (favorable = succès).",
    explanation: exp(
      "On identifie les paramètres dans le contexte.",
      "On interroge $50$ personnes ($n = 50$), un succès « favorable » a $p = 0{,}4$.",
      "Les réponses sont indépendantes.",
      "$X \\sim \\mathcal{B}(50\\,;0{,}4)$."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_reco_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_reconnaitre",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi « tirer 5 cartes d'un jeu de 52 et compter les rois » ne suit-il PAS une loi binomiale ?",
    format: "qcm",
    choices: [
      "Les tirages sans remise ne sont pas indépendants",
      "Il y a trop de cartes",
      "Il y a 4 rois seulement",
      "Une carte a plus de 2 faces",
    ],
    expected: ["Les tirages sans remise ne sont pas indépendants"],
    comparator: "mcq_exact",
    hint: "On ne remet pas les cartes tirées.",
    explanation: exp(
      "La loi binomiale exige des épreuves indépendantes.",
      "Tirer sans remise modifie la composition du jeu à chaque tirage.",
      "Les tirages sont donc dépendants.",
      "Ce n'est pas binomial car les tirages sans remise ne sont pas indépendants."
    ),
    tags: ["terminale-spe", "binomiale", "reconnaitre", "qcm"],
  },

  /* =========================================================
     BINOMIALE_CALCULER — P(X = k)
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Si $X \\sim \\mathcal{B}(n\\,;p)$, quelle est la formule de $P(X = k)$ ?",
    format: "qcm",
    choices: [
      "$\\binom{n}{k} p^k (1-p)^{n-k}$",
      "$\\binom{n}{k} p^{n-k} (1-p)^{k}$",
      "$p^k (1-p)^{n-k}$",
      "$\\binom{n}{k} p (1-p)$",
    ],
    expected: ["$\\binom{n}{k} p^k (1-p)^{n-k}$"],
    comparator: "mcq_exact",
    hint: "Coefficient binomial × (proba de succès)ᵏ × (proba d'échec)ⁿ⁻ᵏ.",
    explanation: exp(
      "La probabilité binomiale combine dénombrement et probabilités des chemins.",
      "Le coefficient $\\binom{n}{k}$ compte les chemins à $k$ succès.",
      "$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.",
      "La formule est $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert le coefficient binomial $\\binom{n}{k}$ dans la formule ?",
    format: "qcm",
    choices: [
      "Il compte le nombre de chemins donnant $k$ succès",
      "Il donne la probabilité d'un succès",
      "Il représente l'espérance",
      "Il vaut toujours $1$",
    ],
    expected: ["Il compte le nombre de chemins donnant $k$ succès"],
    comparator: "mcq_exact",
    hint: "C'est un nombre de combinaisons.",
    explanation: exp(
      "Le coefficient binomial est un nombre de combinaisons.",
      "$\\binom{n}{k}$ compte les façons de placer $k$ succès parmi $n$ épreuves.",
      "C'est le nombre de chemins de l'arbre menant à $k$ succès.",
      "$\\binom{n}{k}$ compte le nombre de chemins donnant $k$ succès."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X = 0)$ ?",
    format: "qcm",
    choices: ["$0{,}125$", "$0{,}375$", "$0{,}5$", "$0{,}25$"],
    expected: ["$0{,}125$"],
    comparator: "mcq_exact",
    hint: "$P(X=0) = \\binom{3}{0} \\times 0{,}5^0 \\times 0{,}5^3 = 0{,}5^3$.",
    explanation: exp(
      "On applique la formule avec $k = 0$.",
      "$P(X=0) = \\binom{3}{0}\\, 0{,}5^0\\, 0{,}5^3 = 1 \\times 1 \\times 0{,}125$.",
      "$0{,}5^3 = 0{,}125$.",
      "$P(X = 0) = 0{,}125$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X = 1)$ ?",
    format: "qcm",
    choices: ["$0{,}375$", "$0{,}125$", "$0{,}5$", "$0{,}25$"],
    expected: ["$0{,}375$"],
    comparator: "mcq_exact",
    canvas: binomialeBatonsCanvas,
    hint: "$P(X=1) = \\binom{3}{1} \\times 0{,}5^1 \\times 0{,}5^2 = 3 \\times 0{,}125$.",
    explanation: exp(
      "On applique la formule avec $k = 1$, ou on lit le diagramme.",
      "$P(X=1) = \\binom{3}{1}\\, 0{,}5^1\\, 0{,}5^2 = 3 \\times 0{,}125$.",
      "$3 \\times 0{,}125 = 0{,}375$.",
      "$P(X = 1) = 0{,}375$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(2\\,;0{,}5)$. Que vaut $P(X = 1)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}25$", "$0{,}75$", "$1$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    hint: "$P(X=1) = \\binom{2}{1} \\times 0{,}5 \\times 0{,}5 = 2 \\times 0{,}25$.",
    explanation: exp(
      "On applique la formule avec $n = 2$, $k = 1$.",
      "$P(X=1) = \\binom{2}{1}\\, 0{,}5^1\\, 0{,}5^1 = 2 \\times 0{,}25$.",
      "$2 \\times 0{,}25 = 0{,}5$.",
      "$P(X = 1) = 0{,}5$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X = 3)$ ?",
    format: "qcm",
    choices: ["$0{,}125$", "$0{,}375$", "$0{,}5$", "$1$"],
    expected: ["$0{,}125$"],
    comparator: "mcq_exact",
    hint: "$P(X=3) = \\binom{3}{3} \\times 0{,}5^3 = 0{,}5^3$.",
    explanation: exp(
      "On applique la formule avec $k = 3$ (tous des succès).",
      "$P(X=3) = \\binom{3}{3}\\, 0{,}5^3 = 1 \\times 0{,}125$.",
      "$0{,}5^3 = 0{,}125$.",
      "$P(X = 3) = 0{,}125$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(4\\,;0{,}5)$. Que vaut $P(X = 2)$ ? (on rappelle $\\binom{4}{2} = 6$)",
    format: "qcm",
    choices: ["$0{,}375$", "$0{,}25$", "$0{,}5$", "$0{,}0625$"],
    expected: ["$0{,}375$"],
    comparator: "mcq_exact",
    hint: "$P(X=2) = 6 \\times 0{,}5^2 \\times 0{,}5^2 = 6 \\times 0{,}0625$.",
    explanation: exp(
      "On applique la formule avec $n = 4$, $k = 2$.",
      "$P(X=2) = \\binom{4}{2}\\, 0{,}5^2\\, 0{,}5^2 = 6 \\times 0{,}5^4$.",
      "$6 \\times 0{,}0625 = 0{,}375$.",
      "$P(X = 2) = 0{,}375$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(2\\,;0{,}1)$. Que vaut $P(X = 0)$ ?",
    format: "qcm",
    choices: ["$0{,}81$", "$0{,}01$", "$0{,}9$", "$0{,}18$"],
    expected: ["$0{,}81$"],
    comparator: "mcq_exact",
    hint: "$P(X=0) = (1 - 0{,}1)^2 = 0{,}9^2$.",
    explanation: exp(
      "On applique la formule avec $k = 0$ (aucun succès).",
      "$P(X=0) = \\binom{2}{0}\\, 0{,}1^0\\, 0{,}9^2 = 0{,}9^2$.",
      "$0{,}9^2 = 0{,}81$.",
      "$P(X = 0) = 0{,}81$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_calc_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Le diagramme en bâtons ci-dessous donne la loi $\\mathcal{B}(3\\,;0{,}5)$. Quelles sont les deux valeurs les plus probables ?",
    format: "qcm",
    choices: ["$1$ et $2$", "$0$ et $3$", "$0$ et $1$", "$2$ et $3$"],
    expected: ["$1$ et $2$"],
    comparator: "mcq_exact",
    canvas: binomialeBatonsCanvas,
    hint: "Cherche les deux bâtons les plus hauts.",
    explanation: exp(
      "On compare les hauteurs des bâtons.",
      "Les probabilités sont $0{,}125$, $0{,}375$, $0{,}375$, $0{,}125$.",
      "Les deux plus grandes ($0{,}375$) correspondent à $X = 1$ et $X = 2$.",
      "Les valeurs les plus probables sont $1$ et $2$."
    ),
    tags: ["terminale-spe", "binomiale", "calculer", "batons", "canvas", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_binom_calc_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "$P(X=0) = (1-p)^n$.",
    tags: ["terminale-spe", "binomiale", "calculer", "template"],
    // 15/10 : P(X = 0) en VALEUR EXACTE, dans une situation tirée (voir genCalcZero).
    generate: () => genCalcZero(),
  },

  /* =========================================================
     BINOMIALE_ESPERANCE_VARIANCE — E = np, V = np(1-p)
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 2,
    theme: "neutral",
    text: "Si $X \\sim \\mathcal{B}(n\\,;p)$, quelle est l'espérance $E(X)$ ?",
    format: "qcm",
    choices: ["$np$", "$n + p$", "$np(1-p)$", "$\\dfrac{n}{p}$"],
    expected: ["$np$"],
    comparator: "mcq_exact",
    hint: "Formule du cours pour la loi binomiale.",
    explanation: exp(
      "L'espérance d'une loi binomiale a une formule simple.",
      "On utilise le résultat du cours.",
      "$E(X) = np$.",
      "L'espérance est $E(X) = np$."
    ),
    tags: ["terminale-spe", "binomiale", "esperance", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 2,
    theme: "neutral",
    text: "Si $X \\sim \\mathcal{B}(n\\,;p)$, quelle est la variance $V(X)$ ?",
    format: "qcm",
    choices: ["$np(1-p)$", "$np$", "$n + p$", "$\\sqrt{np}$"],
    expected: ["$np(1-p)$"],
    comparator: "mcq_exact",
    hint: "Formule du cours pour la variance binomiale.",
    explanation: exp(
      "La variance d'une loi binomiale a une formule du cours.",
      "On utilise $V(X) = np(1-p)$.",
      "$V(X) = np(1-p)$.",
      "La variance est $V(X) = np(1-p)$."
    ),
    tags: ["terminale-spe", "binomiale", "variance", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(10\\,;0{,}3)$. Que vaut $E(X)$ ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$E(X) = np = 10 \\times 0{,}3$.",
    explanation: exp(
      "On applique $E(X) = np$.",
      "$E(X) = 10 \\times 0{,}3$.",
      "$E(X) = 3$.",
      "$E(X) = 3$."
    ),
    tags: ["terminale-spe", "binomiale", "esperance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(20\\,;0{,}5)$. Que vaut $E(X)$ ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "$E(X) = np = 20 \\times 0{,}5$.",
    explanation: exp(
      "On applique $E(X) = np$.",
      "$E(X) = 20 \\times 0{,}5$.",
      "$E(X) = 10$.",
      "$E(X) = 10$."
    ),
    tags: ["terminale-spe", "binomiale", "esperance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(10\\,;0{,}3)$. Que vaut $V(X)$ ?",
    format: "qcm",
    choices: ["$2{,}1$", "$3$", "$7$", "$0{,}21$"],
    expected: ["$2{,}1$"],
    comparator: "mcq_exact",
    hint: "$V(X) = np(1-p) = 10 \\times 0{,}3 \\times 0{,}7$.",
    explanation: exp(
      "On applique $V(X) = np(1-p)$.",
      "$V(X) = 10 \\times 0{,}3 \\times 0{,}7$.",
      "$V(X) = 3 \\times 0{,}7 = 2{,}1$.",
      "$V(X) = 2{,}1$."
    ),
    tags: ["terminale-spe", "binomiale", "variance", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(100\\,;0{,}2)$. Que vaut $E(X)$ ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "$E(X) = np = 100 \\times 0{,}2$.",
    explanation: exp(
      "On applique $E(X) = np$.",
      "$E(X) = 100 \\times 0{,}2$.",
      "$E(X) = 20$.",
      "$E(X) = 20$."
    ),
    tags: ["terminale-spe", "binomiale", "esperance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(100\\,;0{,}2)$. Que vaut $V(X)$ ?",
    format: "short",
    expected: ["16"],
    comparator: "number_equal",
    hint: "$V(X) = np(1-p) = 100 \\times 0{,}2 \\times 0{,}8$.",
    explanation: exp(
      "On applique $V(X) = np(1-p)$.",
      "$V(X) = 100 \\times 0{,}2 \\times 0{,}8$.",
      "$V(X) = 20 \\times 0{,}8 = 16$.",
      "$V(X) = 16$."
    ),
    tags: ["terminale-spe", "binomiale", "variance", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(100\\,;0{,}2)$, donc $V(X) = 16$. Que vaut l'écart-type $\\sigma(X)$ ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "$\\sigma(X) = \\sqrt{V(X)} = \\sqrt{16}$.",
    explanation: exp(
      "L'écart-type est la racine carrée de la variance.",
      "$\\sigma(X) = \\sqrt{16}$.",
      "$\\sqrt{16} = 4$.",
      "$\\sigma(X) = 4$."
    ),
    tags: ["terminale-spe", "binomiale", "ecart_type", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_ev_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $E(X)$ ?",
    format: "qcm",
    choices: ["$1{,}5$", "$3$", "$0{,}5$", "$0{,}75$"],
    expected: ["$1{,}5$"],
    comparator: "mcq_exact",
    hint: "$E(X) = np = 3 \\times 0{,}5$.",
    explanation: exp(
      "On applique $E(X) = np$.",
      "$E(X) = 3 \\times 0{,}5$.",
      "$E(X) = 1{,}5$.",
      "$E(X) = 1{,}5$."
    ),
    tags: ["terminale-spe", "binomiale", "esperance", "qcm"],
  },

  {
    kind: "template",
    id: "terminale_spe_binom_ev_tpl_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_esperance_variance",
    difficulty: 3,
    theme: "neutral",
    hint: "$E(X) = np$ : nombre de répétitions × probabilité du succès.",
    tags: ["terminale-spe", "binomiale", "esperance", "template"],
    // 15/10 : E(X) = np dans une situation tirée (voir genEspContexte).
    generate: () => genEspContexte(),
  },

  /* =========================================================
     BINOMIALE_INTERVALLE — P(X≤k), P(X≥1)…
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 3,
    theme: "neutral",
    text: "Comment exprime-t-on $P(X \\ge 1)$ à l'aide de l'événement contraire ?",
    format: "qcm",
    choices: [
      "$1 - P(X = 0)$",
      "$1 - P(X = 1)$",
      "$P(X = 0)$",
      "$1 + P(X = 0)$",
    ],
    expected: ["$1 - P(X = 0)$"],
    comparator: "mcq_exact",
    hint: "« Au moins un » est le contraire de « aucun ».",
    explanation: exp(
      "On passe par l'événement contraire pour « au moins un ».",
      "Le contraire de $\\{X \\ge 1\\}$ est $\\{X = 0\\}$.",
      "$P(X \\ge 1) = 1 - P(X = 0)$.",
      "$P(X \\ge 1) = 1 - P(X = 0)$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X \\le 1)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}375$", "$0{,}125$", "$0{,}625$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: binomialeBatonsCanvas,
    hint: "$P(X \\le 1) = P(X=0) + P(X=1) = 0{,}125 + 0{,}375$.",
    explanation: exp(
      "$\\{X \\le 1\\}$ regroupe $X = 0$ et $X = 1$.",
      "On additionne les probabilités correspondantes.",
      "$P(X \\le 1) = 0{,}125 + 0{,}375 = 0{,}5$.",
      "$P(X \\le 1) = 0{,}5$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X \\ge 1)$ ?",
    format: "qcm",
    choices: ["$0{,}875$", "$0{,}5$", "$0{,}125$", "$0{,}375$"],
    expected: ["$0{,}875$"],
    comparator: "mcq_exact",
    hint: "$P(X \\ge 1) = 1 - P(X = 0) = 1 - 0{,}125$.",
    explanation: exp(
      "On utilise l'événement contraire « aucun succès ».",
      "$P(X \\ge 1) = 1 - P(X = 0)$.",
      "$P(X \\ge 1) = 1 - 0{,}125 = 0{,}875$.",
      "$P(X \\ge 1) = 0{,}875$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $X \\sim \\mathcal{B}(n\\,;p)$, comment s'écrit « au moins un succès » ?",
    format: "qcm",
    choices: [
      "$P(X \\ge 1) = 1 - (1-p)^n$",
      "$P(X \\ge 1) = (1-p)^n$",
      "$P(X \\ge 1) = p^n$",
      "$P(X \\ge 1) = 1 - p^n$",
    ],
    expected: ["$P(X \\ge 1) = 1 - (1-p)^n$"],
    comparator: "mcq_exact",
    hint: "$P(X = 0) = (1-p)^n$ (que des échecs).",
    explanation: exp(
      "« Au moins un » est le contraire de « aucun succès ».",
      "$P(X = 0) = (1-p)^n$, donc $P(X \\ge 1) = 1 - P(X = 0)$.",
      "$P(X \\ge 1) = 1 - (1-p)^n$.",
      "On obtient $P(X \\ge 1) = 1 - (1-p)^n$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(2\\,;0{,}1)$. Que vaut $P(X \\ge 1)$ ?",
    format: "qcm",
    choices: ["$0{,}19$", "$0{,}81$", "$0{,}01$", "$0{,}1$"],
    expected: ["$0{,}19$"],
    comparator: "mcq_exact",
    hint: "$P(X \\ge 1) = 1 - 0{,}9^2$.",
    explanation: exp(
      "On passe par l'événement contraire.",
      "$P(X = 0) = 0{,}9^2 = 0{,}81$, donc $P(X \\ge 1) = 1 - 0{,}81$.",
      "$1 - 0{,}81 = 0{,}19$.",
      "$P(X \\ge 1) = 0{,}19$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X \\ge 2)$ ?",
    format: "qcm",
    choices: ["$0{,}5$", "$0{,}375$", "$0{,}875$", "$0{,}125$"],
    expected: ["$0{,}5$"],
    comparator: "mcq_exact",
    canvas: binomialeBatonsCanvas,
    hint: "$P(X \\ge 2) = P(X=2) + P(X=3) = 0{,}375 + 0{,}125$.",
    explanation: exp(
      "$\\{X \\ge 2\\}$ regroupe $X = 2$ et $X = 3$.",
      "On additionne les probabilités correspondantes.",
      "$P(X \\ge 2) = 0{,}375 + 0{,}125 = 0{,}5$.",
      "$P(X \\ge 2) = 0{,}5$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(1 \\le X \\le 2)$ ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}5$", "$0{,}375$", "$0{,}25$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    hint: "$P(1 \\le X \\le 2) = P(X=1) + P(X=2)$.",
    explanation: exp(
      "On additionne les probabilités des valeurs comprises entre $1$ et $2$.",
      "$P(1 \\le X \\le 2) = P(X=1) + P(X=2)$.",
      "$P(1 \\le X \\le 2) = 0{,}375 + 0{,}375 = 0{,}75$.",
      "$P(1 \\le X \\le 2) = 0{,}75$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 4,
    theme: "neutral",
    text: "À la calculatrice, $P(X \\le k)$ pour une loi binomiale se calcule avec :",
    format: "qcm",
    choices: [
      "la fonction de répartition (binomFRép / cumulée)",
      "la dérivée",
      "le coefficient directeur",
      "une primitive",
    ],
    expected: ["la fonction de répartition (binomFRép / cumulée)"],
    comparator: "mcq_exact",
    hint: "On utilise la probabilité cumulée.",
    explanation: exp(
      "Les calculatrices offrent une fonction pour les probabilités cumulées.",
      "$P(X \\le k)$ s'obtient avec la fonction de répartition binomiale.",
      "C'est la commande « binomFRép » (ou équivalent cumulé).",
      "On utilise la fonction de répartition (probabilité cumulée)."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Que vaut $P(X \\le 3)$ ?",
    format: "qcm",
    choices: ["$1$", "$0{,}875$", "$0{,}5$", "$0{,}125$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "$X$ ne peut pas dépasser $3$ : l'événement est certain.",
    explanation: exp(
      "$X$ prend ses valeurs dans $\\{0,1,2,3\\}$.",
      "L'événement $\\{X \\le 3\\}$ est donc certain.",
      "$P(X \\le 3) = 1$.",
      "$P(X \\le 3) = 1$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_interv_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_intervalle",
    difficulty: 4,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(2\\,;0{,}5)$. Que vaut $P(X \\ge 1)$ ?",
    format: "qcm",
    choices: ["$0{,}75$", "$0{,}5$", "$0{,}25$", "$1$"],
    expected: ["$0{,}75$"],
    comparator: "mcq_exact",
    hint: "$P(X \\ge 1) = 1 - P(X = 0) = 1 - 0{,}5^2$.",
    explanation: exp(
      "On passe par l'événement contraire « aucun succès ».",
      "$P(X = 0) = 0{,}5^2 = 0{,}25$, donc $P(X \\ge 1) = 1 - 0{,}25$.",
      "$1 - 0{,}25 = 0{,}75$.",
      "$P(X \\ge 1) = 0{,}75$."
    ),
    tags: ["terminale-spe", "binomiale", "intervalle", "qcm"],
  },

  /* =========================================================
     BINOMIALE_DEFI — Type bac
  ========================================================= */

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_1",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Une usine produit des pièces défectueuses avec probabilité $0{,}05$. On en prélève 20 (avec remise). Quelle est la loi du nombre $X$ de défectueuses, et son espérance ?",
    format: "qcm",
    choices: [
      "$\\mathcal{B}(20\\,;0{,}05)$, $E(X) = 1$",
      "$\\mathcal{B}(20\\,;0{,}05)$, $E(X) = 20$",
      "$\\mathcal{B}(0{,}05\\,;20)$, $E(X) = 0{,}05$",
      "$\\mathcal{B}(20\\,;0{,}95)$, $E(X) = 19$",
    ],
    expected: ["$\\mathcal{B}(20\\,;0{,}05)$, $E(X) = 1$"],
    comparator: "mcq_exact",
    hint: "$n = 20$, $p = 0{,}05$, $E(X) = np$.",
    explanation: exp(
      "On identifie la loi puis on calcule l'espérance.",
      "$X \\sim \\mathcal{B}(20\\,;0{,}05)$ et $E(X) = np = 20 \\times 0{,}05$.",
      "$E(X) = 1$.",
      "$X \\sim \\mathcal{B}(20\\,;0{,}05)$, $E(X) = 1$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_2",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un QCM a 10 questions à 4 choix. Un élève répond au hasard ; $X$ = nombre de bonnes réponses. Quelle est l'espérance $E(X)$ ?",
    format: "qcm",
    choices: ["$2{,}5$", "$10$", "$4$", "$0{,}25$"],
    expected: ["$2{,}5$"],
    comparator: "mcq_exact",
    hint: "$X \\sim \\mathcal{B}(10\\,;0{,}25)$, $E(X) = np$.",
    explanation: exp(
      "Répondre au hasard à 4 choix donne $p = \\tfrac{1}{4} = 0{,}25$ de succès.",
      "$X \\sim \\mathcal{B}(10\\,;0{,}25)$, donc $E(X) = 10 \\times 0{,}25$.",
      "$E(X) = 2{,}5$.",
      "$E(X) = 2{,}5$ bonnes réponses en moyenne."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_3",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une graine germe avec probabilité $0{,}9$. On en sème 5 (indépendamment). Quelle est la probabilité qu'aucune ne germe ?",
    format: "qcm",
    choices: ["$0{,}1^5$", "$0{,}9^5$", "$5 \\times 0{,}1$", "$0{,}5$"],
    expected: ["$0{,}1^5$"],
    comparator: "mcq_exact",
    hint: "« Aucune ne germe » = 5 échecs, échec de probabilité $0{,}1$.",
    explanation: exp(
      "On identifie un schéma de Bernoulli avec $p = 0{,}9$ (germer = succès).",
      "« Aucune ne germe » signifie 5 échecs successifs, chacun de probabilité $0{,}1$.",
      "$P(X = 0) = (1 - 0{,}9)^5 = 0{,}1^5$.",
      "La probabilité est $0{,}1^5$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_4",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une graine germe avec probabilité $0{,}9$. On en sème 5. Quelle est la probabilité qu'au moins une germe ?",
    format: "qcm",
    choices: ["$1 - 0{,}1^5$", "$0{,}9^5$", "$0{,}1^5$", "$5 \\times 0{,}9$"],
    expected: ["$1 - 0{,}1^5$"],
    comparator: "mcq_exact",
    hint: "« Au moins une » est le contraire de « aucune ».",
    explanation: exp(
      "« Au moins une » est le contraire de « aucune ne germe ».",
      "$P(X \\ge 1) = 1 - P(X = 0) = 1 - 0{,}1^5$.",
      "On garde l'expression exacte.",
      "La probabilité est $1 - 0{,}1^5$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_5",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "On lance 4 fois une pièce équilibrée ; $X$ = nombre de « pile ». Quelle est l'espérance $E(X)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$X \\sim \\mathcal{B}(4\\,;0{,}5)$, $E(X) = np$.",
    explanation: exp(
      "On identifie $X \\sim \\mathcal{B}(4\\,;0{,}5)$.",
      "$E(X) = np = 4 \\times 0{,}5$.",
      "$E(X) = 2$.",
      "$E(X) = 2$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_6",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un standard reçoit un appel important avec probabilité $0{,}2$ par minute, indépendamment. Sur 10 minutes, $X$ = nombre d'appels importants. Que vaut $E(X)$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$X \\sim \\mathcal{B}(10\\,;0{,}2)$, $E(X) = np$.",
    explanation: exp(
      "On modélise par $X \\sim \\mathcal{B}(10\\,;0{,}2)$.",
      "$E(X) = np = 10 \\times 0{,}2$.",
      "$E(X) = 2$.",
      "On attend en moyenne $2$ appels importants."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_7",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(3\\,;0{,}5)$. Quelle est la probabilité d'obtenir exactement 2 succès, illustrée par le diagramme ci-dessous ?",
    format: "qcm",
    choices: ["$0{,}375$", "$0{,}125$", "$0{,}5$", "$0{,}25$"],
    expected: ["$0{,}375$"],
    comparator: "mcq_exact",
    canvas: binomialeBatonsCanvas,
    hint: "On lit le bâton au-dessus de $X = 2$.",
    explanation: exp(
      "On lit la probabilité sur le diagramme, ou par la formule.",
      "$P(X=2) = \\binom{3}{2}\\,0{,}5^2\\,0{,}5 = 3 \\times 0{,}125$.",
      "$3 \\times 0{,}125 = 0{,}375$.",
      "$P(X = 2) = 0{,}375$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "batons", "canvas", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_8",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $X \\sim \\mathcal{B}(50\\,;0{,}5)$, l'écart-type vaut environ $3{,}5$. Que vaut l'espérance $E(X)$ ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "$E(X) = np = 50 \\times 0{,}5$.",
    explanation: exp(
      "On applique $E(X) = np$.",
      "$E(X) = 50 \\times 0{,}5$.",
      "$E(X) = 25$.",
      "$E(X) = 25$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "short"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_9",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un joueur de basket réussit un lancer avec probabilité $0{,}8$. Sur 5 lancers indépendants, $X$ = nombre de réussites. Quelle est la loi de $X$ ?",
    format: "qcm",
    choices: [
      "$\\mathcal{B}(5\\,;0{,}8)$",
      "$\\mathcal{B}(0{,}8\\,;5)$",
      "$\\mathcal{B}(5\\,;0{,}2)$",
      "$\\mathcal{B}(4\\,;0{,}8)$",
    ],
    expected: ["$\\mathcal{B}(5\\,;0{,}8)$"],
    comparator: "mcq_exact",
    hint: "$n = 5$, succès = « panier » de probabilité $0{,}8$.",
    explanation: exp(
      "On identifie les paramètres.",
      "Il y a $5$ lancers indépendants ($n = 5$), un succès a $p = 0{,}8$.",
      "Donc $X \\sim \\mathcal{B}(5\\,;0{,}8)$.",
      "$X \\sim \\mathcal{B}(5\\,;0{,}8)$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "qcm"],
  },

  {
    kind: "fixed",
    id: "terminale_spe_binom_defi_fixed_10",
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId: "binomiale_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $X \\sim \\mathcal{B}(2\\,;0{,}5)$. Quelle est la probabilité d'obtenir exactement 2 succès ?",
    format: "qcm",
    choices: ["$0{,}25$", "$0{,}5$", "$0{,}75$", "$1$"],
    expected: ["$0{,}25$"],
    comparator: "mcq_exact",
    hint: "$P(X=2) = \\binom{2}{2}\\,0{,}5^2 = 0{,}5^2$.",
    explanation: exp(
      "On applique la formule avec $k = 2 = n$ (que des succès).",
      "$P(X=2) = \\binom{2}{2}\\,0{,}5^2 = 1 \\times 0{,}25$.",
      "$0{,}5^2 = 0{,}25$.",
      "$P(X = 2) = 0{,}25$."
    ),
    tags: ["terminale-spe", "binomiale", "type_bac", "qcm"],
  },
];

/* =========================================================================
   ⛔⛔ 15/10/2026 — « DES QUESTIONS REVIENNENT », LA LOI BINOMIALE.
   Mesuré avant (scripts/mesurer-squelettes-coach.ts terminale-spe
   loi_binomiale) : les 6 micros sous le seuil, 6 à 10 squelettes par micro,
   13 à 18 répétitions sur une série de 20 à la même étoile.
   Même méthode que les probabilités de 3e (dd5e9f75) : chaque gabarit
   compose une SITUATION (une trentaine : penalties, lancers francs, dé des
   petits chevaux, roue de la kermesse, graines du jardin créole, letchis
   véreux, car jaune en retard, pluie à Cilaos, QCM au hasard, tombola…),
   des NOMBRES tirés (n, p, k) et une TOURNURE.
   ⭐ Les probabilités sont calculées EXACTEMENT (BigInt : numérateur sur
   b^n), puis arrondies au chiffre près ; l'arrondi est annoncé dans
   l'énoncé. QCM : leurres = vraies erreurs (oublier le coefficient
   binomial, échanger p et 1 − p, oublier le « 1 − », prendre P(X ≤ k) pour
   P(X < k)…), jamais deux choix au même texte.
========================================================================= */

type Q = TutorGeneratedQuestionV4;
type Prenom = { nom: string; f: boolean };
const PRENOMS: Prenom[] = [
  { nom: "Inès", f: true }, { nom: "Hugo", f: false }, { nom: "Léa", f: true },
  { nom: "Mamadou", f: false }, { nom: "Chloé", f: true }, { nom: "Yanis", f: false },
  { nom: "Aïcha", f: true }, { nom: "Lucas", f: false }, { nom: "Emma", f: true },
  { nom: "Noah", f: false }, { nom: "Jade", f: true }, { nom: "Rayan", f: false },
  { nom: "Maëlys", f: true }, { nom: "Kylian", f: false }, { nom: "Anaïs", f: true },
  { nom: "Teddy", f: false }, { nom: "Océane", f: true }, { nom: "Dylan", f: false },
];

const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const pick = <T,>(arr: readonly T[]): T => arr[Math.floor(Math.random() * arr.length)];
function melange<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
const ilElle = (p: Prenom) => (p.f ? "elle" : "il");

/** Bonne réponse + trois leurres DISTINCTS au texte (les premiers d'abord si `garder`). */
function qcm(correct: string, leurres: string[], secours: string[] = []): { choices: string[]; expected: string[] } {
  const d: string[] = [];
  for (const w of [...melange([...new Set(leurres)]), ...secours]) {
    if (d.length === 3) break;
    if (w && w !== correct && !d.includes(w)) d.push(w);
  }
  // Dernier recours pour une probabilité arrondie au millième : des voisins.
  const m = /^\$0\{,\}(\d{3})\$$/.exec(correct);
  if (m) {
    const v = Number(m[1]);
    for (const dv of [23, -23, 41, -41, 67, -67]) {
      if (d.length === 3) break;
      const w = v + dv;
      const t = `$0{,}${String(w).padStart(3, "0")}$`;
      if (w > 0 && w < 1000 && !d.includes(t)) d.push(t);
    }
  }
  return { choices: melange([correct, ...d]), expected: [correct] };
}

/* ---------- Les nombres exacts ---------- */
/** Une probabilité rationnelle a/b (b = 2, 3, 4, 5, 6, 8, 10, 20, 25, 50, 100…). */
type R = { a: number; b: number };
function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}
const Cnk = (n: number, k: number): number => {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};
const B = (x: number) => BigInt(x);
/** Numérateur exact de P(X = k) sur le dénominateur b^n. */
const numK = (n: number, k: number, p: R): bigint =>
  B(Cnk(n, k)) * B(p.a) ** B(k) * B(p.b - p.a) ** B(n - k);
const denN = (n: number, p: R): bigint => B(p.b) ** B(n);
/** Somme exacte des P(X = k) pour k de lo à hi (numérateur sur b^n). */
const numEntre = (n: number, lo: number, hi: number, p: R): bigint => {
  let s = B(0);
  for (let k = Math.max(0, lo); k <= Math.min(n, hi); k++) s += numK(n, k, p);
  return s;
};
/** num/den arrondi à d décimales (au plus proche), écrit « 0,215 » (d chiffres). */
function arr(num: bigint, den: bigint, d: number): string {
  const f = B(10) ** B(d);
  const r = (2n * num * f + den) / (2n * den);
  const ent = r / f;
  const dec = (r % f).toString().padStart(d, "0");
  return d === 0 ? ent.toString() : `${ent},${dec}`;
}
/** Écriture LaTeX d'un décimal français : « 0,215 » → « 0{,}215 ». */
const L = (s: string) => s.replace(",", "{,}");
/** Arrondi en LaTeX. */
const arrL = (num: bigint, den: bigint, d: number) => L(arr(num, den, d));
/** Un rationnel x/y en décimal exact s'il tombe juste, sinon null. */
function decExact(x: number, y: number): string | null {
  const g = pgcd(Math.abs(x), y);
  let d = y / g;
  let c = 0;
  while (d % 2 === 0) { d /= 2; c++; }
  while (d % 5 === 0) { d /= 5; c++; }
  if (d !== 1) return null;
  // Écriture décimale EXACTE : x/y = (x·10^c / y) / 10^c.
  const neg = x < 0;
  const f = B(10) ** B(c);
  const m = (B(Math.abs(x)) * f) / B(y);
  const ent = (m / f).toString();
  const dec = c === 0 ? "" : (m % f).toString().padStart(c, "0").replace(/0+$/, "");
  return `${neg ? "-" : ""}${ent}${dec ? "," + dec : ""}`;
}
/** LaTeX d'un rationnel : décimal s'il tombe juste, sinon fraction irréductible. */
function ratL(x: number, y: number): string {
  const dx = decExact(x, y);
  if (dx !== null) return L(dx);
  const g = pgcd(Math.abs(x), y);
  return `\\dfrac{${x / g}}{${y / g}}`;
}
const pL = (p: R) => ratL(p.a, p.b);
/** Une base de puissance : les fractions entre parenthèses. */
const pw = (x: string) => (x.includes("dfrac") ? `\\left(${x}\\right)` : x);
const qL = (p: R) => ratL(p.b - p.a, p.b);
const loiL = (n: number, p: R) => `\\mathcal{B}(${n}\\,;${pL(p)})`;
/** Les écritures acceptées d'un nombre décimal en réponse libre. */
const ecr = (s: string) => [...new Set([s, s.replace(",", ".")])];
/** Probabilités usuelles (en centièmes ou fractions simples). */
const R100 = (c: number): R => ({ a: c, b: 100 });
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** « de billes », « d’oublis ». */
const deN = (s: string) => (/^[aeiouéèêh]/i.test(s) ? `d’${s}` : `de ${s}`);

/* =========================================================================
   LES SITUATIONS : n répétitions identiques et indépendantes d'une épreuve
   à deux issues. Chaque situation se tire avec son p et sait se dire :
     dit(n)  : la phrase de l'énoncé (n répétitions, la probabilité p) ;
     essai   : l'épreuve répétée (« un tir au but ») ;
     succes  : l'issue « succès » (« le tir est réussi ») ;
     X       : ce que compte X (« le nombre de tirs réussis ») ;
     unite   : pour « en moyenne 3 … » (« tirs réussis »).
========================================================================= */
type Sit = { dit: (n: number | string) => string; essai: string; succes: string; X: string; unite: string; p: R };

const pc = (p: R) => `$${pL(p)}$`;
const SITUATIONS: (() => Sit)[] = [
  () => {
    const P = pick(PRENOMS); const p = R100(pick([60, 65, 70, 75, 80, 85]));
    return { dit: (n) => `${P.nom} tire ${n} penalties ; chaque tir est réussi avec la probabilité ${pc(p)}, indépendamment des autres.`, essai: "un tir au but", succes: "le tir est réussi", X: "le nombre de penalties réussis", unite: "penalties réussis", p };
  },
  () => {
    const P = pick(PRENOMS); const p = R100(pick([55, 60, 70, 75, 80]));
    return { dit: (n) => `Au basket, ${P.nom} enchaîne ${n} lancers francs ; ${ilElle(P)} réussit chaque lancer avec la probabilité ${pc(p)}, quels que soient les précédents.`, essai: "un lancer franc", succes: "le lancer est réussi", X: "le nombre de lancers francs réussis", unite: "lancers réussis", p };
  },
  () => {
    const f = pick([[1, "un 6"], [2, "un 5 ou un 6"], [3, "un nombre pair"], [1, "un 1"], [2, "un multiple de 3"]] as const);
    return { dit: (n) => `Aux petits chevaux, on lance ${n} fois un dé équilibré à six faces et l'on s'intéresse à l'obtention de ${f[1]}.`, essai: "un lancer de dé", succes: `obtenir ${f[1]}`, X: `le nombre de lancers donnant ${f[1]}`, unite: `lancers donnant ${f[1]}`, p: { a: f[0], b: 6 } };
  },
  () => ({ dit: (n) => `On lance ${n} fois une pièce bien équilibrée.`, essai: "un lancer de pièce", succes: "obtenir pile", X: "le nombre de « pile » obtenus", unite: "« pile »", p: { a: 1, b: 2 } }),
  () => {
    const s = pick([4, 5, 8, 10]); const g = ri(1, 3);
    return { dit: (n) => `À la kermesse, une roue équilibrée a ${s} secteurs égaux dont ${g} gagnant${g > 1 ? "s" : ""}. On la fait tourner ${n} fois.`, essai: "un tour de roue", succes: "tomber sur un secteur gagnant", X: "le nombre de tours gagnants", unite: "tours gagnants", p: { a: g, b: s } };
  },
  () => {
    const P = pick(PRENOMS); const c = pick([4, 5]);
    return { dit: (n) => `Un QCM comporte ${n} questions ; chacune a ${c} réponses dont une seule juste. ${P.nom} répond complètement au hasard.`, essai: "une question", succes: "la réponse est juste", X: "le nombre de bonnes réponses", unite: "bonnes réponses", p: { a: 1, b: c } };
  },
  () => {
    const p = R100(pick([80, 85, 90, 95]));
    return { dit: (n) => `Dans le jardin créole, une graine de piment germe avec la probabilité ${pc(p)}, indépendamment des autres. On sème ${n} graines.`, essai: "le semis d'une graine", succes: "la graine germe", X: "le nombre de graines qui germent", unite: "graines qui germent", p };
  },
  () => {
    const p = R100(pick([2, 4, 5, 8, 10]));
    return { dit: (n) => `Au marché de Saint-Paul, un letchi est véreux avec la probabilité ${pc(p)}. On prend ${n} letchis au hasard dans une très grande cagette (on assimile à un tirage avec remise).`, essai: "le choix d'un letchi", succes: "le letchi est véreux", X: "le nombre de letchis véreux", unite: "letchis véreux", p };
  },
  () => {
    const p = R100(pick([10, 15, 20, 25]));
    return { dit: (n) => `Chaque matin, le car jaune arrive en retard avec la probabilité ${pc(p)}, indépendamment des autres jours. On observe ${n} matins.`, essai: "l'observation d'un matin", succes: "le car est en retard", X: "le nombre de matins avec retard", unite: "matins de retard", p };
  },
  () => {
    const p = R100(pick([20, 30, 35, 40]));
    return { dit: (n) => `À Cilaos, en saison sèche, il pleut un jour donné avec la probabilité ${pc(p)}, indépendamment des autres jours. On séjourne ${n} jours.`, essai: "un jour du séjour", succes: "il pleut ce jour-là", X: "le nombre de jours de pluie", unite: "jours de pluie", p };
  },
  () => {
    const p = R100(pick([1, 2, 3, 5]));
    return { dit: (n) => `Une usine produit des ampoules ; chacune est défectueuse avec la probabilité ${pc(p)}. On prélève ${n} ampoules dans un stock assez grand pour assimiler à un tirage avec remise.`, essai: "le prélèvement d'une ampoule", succes: "l'ampoule est défectueuse", X: "le nombre d'ampoules défectueuses", unite: "ampoules défectueuses", p };
  },
  () => {
    const t = pick([5, 10]); const r = ri(1, 4);
    return { dit: (n) => `Un sac contient ${t} billes dont ${r} rouge${r > 1 ? "s" : ""}. On tire une bille, on note sa couleur, on la remet, et on recommence : ${n} tirages en tout.`, essai: "un tirage", succes: "la bille est rouge", X: "le nombre de billes rouges tirées", unite: "billes rouges", p: { a: r, b: t } };
  },
  () => ({ dit: (n) => `Dans un jeu de 32 cartes, on tire une carte, on note si c'est un cœur, puis on la remet et on mélange ; on fait ${n} tirages.`, essai: "un tirage de carte", succes: "la carte est un cœur", X: "le nombre de cœurs tirés", unite: "cœurs", p: { a: 1, b: 4 } }),
  () => {
    const P = pick(PRENOMS); const p = R100(pick([30, 40, 45, 50, 60]));
    return { dit: (n) => `Au tir à l'arc, ${P.nom} atteint le centre de la cible avec la probabilité ${pc(p)} à chaque flèche, indépendamment. ${maj(ilElle(P))} tire ${n} flèches.`, essai: "un tir de flèche", succes: "la flèche atteint le centre", X: "le nombre de flèches au centre", unite: "flèches au centre", p };
  },
  () => {
    const p = R100(pick([5, 10, 20]));
    return { dit: (n) => `À la tombola du lycée, un ticket est gagnant avec la probabilité ${pc(p)}. On achète ${n} tickets parmi des milliers (tirage assimilé à un tirage avec remise).`, essai: "l'achat d'un ticket", succes: "le ticket est gagnant", X: "le nombre de tickets gagnants", unite: "tickets gagnants", p };
  },
  () => {
    const p = R100(pick([65, 70, 75, 80]));
    return { dit: (n) => `Lors d'une sortie en mer à Saint-Gilles, on aperçoit des dauphins avec la probabilité ${pc(p)}. Un club organise ${n} sorties, indépendantes.`, essai: "une sortie en mer", succes: "on voit des dauphins", X: "le nombre de sorties avec dauphins", unite: "sorties avec dauphins", p };
  },
  () => {
    const p = R100(pick([85, 90, 95]));
    return { dit: (n) => `Une fleur de vanille pollinisée à la main donne une gousse avec la probabilité ${pc(p)}. Un planteur de Sainte-Rose pollinise ${n} fleurs, indépendamment.`, essai: "la pollinisation d'une fleur", succes: "la fleur donne une gousse", X: "le nombre de gousses obtenues", unite: "gousses", p };
  },
  () => {
    const P = pick(PRENOMS); const p = R100(pick([10, 15, 20]));
    return { dit: (n) => `${P.nom} oublie sa calculatrice un jour de cours avec la probabilité ${pc(p)}, indépendamment des autres jours. On regarde ${n} jours de cours.`, essai: "un jour de cours", succes: "la calculatrice est oubliée", X: "le nombre d'oublis", unite: "oublis", p };
  },
  () => {
    const p = R100(pick([30, 35, 40, 45]));
    return { dit: (n) => `Au snack, un client choisit un bouchon avec la probabilité ${pc(p)}, indépendamment des autres. On observe ${n} clients.`, essai: "un client", succes: "le client choisit un bouchon", X: "le nombre de clients qui prennent un bouchon", unite: "clients avec bouchon", p };
  },
  () => {
    const P = pick(PRENOMS); const p = R100(pick([40, 50, 55, 60]));
    return { dit: (n) => `À la pétanque, ${P.nom} réussit un « tir » avec la probabilité ${pc(p)}. ${maj(ilElle(P))} tente ${n} tirs, indépendants.`, essai: "un tir de pétanque", succes: "le tir est réussi", X: "le nombre de tirs réussis", unite: "tirs réussis", p };
  },
  () => {
    const p = R100(pick([5, 10, 12, 15]));
    return { dit: (n) => `Un SMS envoyé à un ancien élève reçoit une réponse avec la probabilité ${pc(p)}. Le lycée en envoie ${n}, indépendamment.`, essai: "l'envoi d'un SMS", succes: "le SMS reçoit une réponse", X: "le nombre de réponses", unite: "réponses", p };
  },
  () => {
    const p = R100(pick([20, 25, 30]));
    return { dit: (n) => `Sur le sentier du Piton de la Fournaise, un randonneur vient de métropole avec la probabilité ${pc(p)}. On interroge ${n} randonneurs au hasard (population très grande).`, essai: "l'interrogation d'un randonneur", succes: "le randonneur vient de métropole", X: "le nombre de randonneurs venus de métropole", unite: "randonneurs de métropole", p };
  },
  () => {
    const p = R100(pick([70, 75, 80, 90]));
    return { dit: (n) => `Un surfeur de Saint-Leu réussit son départ avec la probabilité ${pc(p)} à chaque vague, indépendamment. Il prend ${n} vagues.`, essai: "une vague", succes: "le départ est réussi", X: "le nombre de départs réussis", unite: "départs réussis", p };
  },
  () => {
    const p = R100(pick([3, 4, 5, 6]));
    return { dit: (n) => `Une compagnie aérienne constate qu'un passager ne se présente pas à l'embarquement avec la probabilité ${pc(p)}. Un vol compte ${n} réservations, indépendantes.`, essai: "une réservation", succes: "le passager ne se présente pas", X: "le nombre de passagers absents", unite: "passagers absents", p };
  },
  () => {
    const p = R100(pick([25, 30, 40]));
    return { dit: (n) => `Un jeu à gratter est gagnant avec la probabilité ${pc(p)}. On gratte ${n} cartes, indépendantes.`, essai: "une carte à gratter", succes: "la carte est gagnante", X: "le nombre de cartes gagnantes", unite: "cartes gagnantes", p };
  },
  () => {
    const p = R100(pick([60, 70, 75]));
    return { dit: (n) => `Un élève du lycée est demi-pensionnaire avec la probabilité ${pc(p)}. On choisit ${n} élèves au hasard (population assez grande pour assimiler à un tirage avec remise).`, essai: "le choix d'un élève", succes: "l'élève est demi-pensionnaire", X: "le nombre de demi-pensionnaires", unite: "demi-pensionnaires", p };
  },
  () => {
    const p = R100(pick([8, 10, 15]));
    return { dit: (n) => `Un test rapide donne un résultat illisible avec la probabilité ${pc(p)}. On réalise ${n} tests, indépendants.`, essai: "un test", succes: "le résultat est illisible", X: "le nombre de résultats illisibles", unite: "résultats illisibles", p };
  },
  () => {
    const P = pick(PRENOMS); const p = R100(pick([35, 40, 45]));
    return { dit: (n) => `${P.nom} joue ${n} parties d'échecs en ligne ; ${ilElle(P)} gagne chaque partie avec la probabilité ${pc(p)}, indépendamment.`, essai: "une partie", succes: "la partie est gagnée", X: "le nombre de parties gagnées", unite: "parties gagnées", p };
  },
  () => {
    const p = R100(pick([15, 20, 25]));
    return { dit: (n) => `Au jeu de l'oie de la classe, une case « question bonus » sort avec la probabilité ${pc(p)} à chaque tour, indépendamment. On joue ${n} tours.`, essai: "un tour de jeu", succes: "la case « question bonus » sort", X: "le nombre de questions bonus", unite: "questions bonus", p };
  },
];
const sit = () => pick(SITUATIONS)();

function gab(id: string, microId: string, difficulty: DifficultyLevel, hint: string, tags: string[], generate: () => Q): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "terminale-spe",
    matiere: "maths",
    notionId: "loi_binomiale",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["terminale-spe", "binomiale", ...tags, "template"],
    generate,
  };
}
/** Le « Définition / Méthode / Calcul / Conclusion » des explications. */
const ex = exp;

/* =========================================================================
   BINOMIALE_SCHEMA — l'épreuve, le schéma, l'arbre.
========================================================================= */

/** ★1 : lire n ou p dans l'énoncé. */
function genSchema1(): Q {
  const s = sit();
  const n = ri(3, 30);
  if (Math.random() < 0.4) {
    const t = pick([
      "Combien de fois l'épreuve de Bernoulli est-elle répétée ?",
      `Quelle est la valeur de $n$, le nombre de répétitions ?`,
      `Combien d'épreuves identiques et indépendantes compte ce schéma ?`,
    ]);
    return {
      text: `${s.dit(n)}\n\n${t}`,
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation: ex(
        `Un schéma de Bernoulli répète $n$ fois la même épreuve : ici ${s.essai}.`,
        "On compte les répétitions annoncées dans l'énoncé.",
        `L'épreuve est répétée $${n}$ fois.`,
        `$n = ${n}$.`,
      ),
    };
  }
  const t = pick([
    `Quelle est la probabilité $p$ du succès « ${s.succes} » ?`,
    `On appelle succès « ${s.succes} ». Que vaut $p$ ?`,
    `Pour une seule épreuve (${s.essai}), quelle est la probabilité du succès « ${s.succes} » ?`,
  ]);
  const q = qcm(`$${pL(s.p)}$`, [`$${qL(s.p)}$`, `$${ratL(1, n)}$`, `$${ratL(s.p.a * 1, s.p.b * 2)}$`], [`$${ratL(1, 2)}$`, "$1$", `$${ratL(1, 4)}$`, `$${ratL(1, 10)}$`]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      `Le succès est « ${s.succes} » ; sa probabilité $p$ est la même à chaque épreuve.`,
      "On lit (ou on calcule) la probabilité du succès pour UNE épreuve ; elle ne dépend pas de $n$.",
      `$p = ${pL(s.p)}$ (et l'échec a pour probabilité $1 - p = ${qL(s.p)}$).`,
      `$p = ${pL(s.p)}$.`,
    ),
  };
}

/** ★2 : la probabilité de l'échec, ou l'épreuve répétée. */
function genSchema2(): Q {
  const s = sit();
  const n = ri(4, 25);
  if (Math.random() < 0.55) {
    const t = pick([
      `Quelle est la probabilité de l'échec pour une épreuve ?`,
      `Le succès est « ${s.succes} ». Quelle est la probabilité de l'issue contraire ?`,
      `Que vaut $1 - p$ dans ce schéma ?`,
    ]);
    // Leurres : redonner p ; « deux issues donc 1/2 » ; diviser par n.
    const q = qcm(`$${qL(s.p)}$`, [`$${pL(s.p)}$`, `$${ratL(1, 2)}$`, `$${ratL(s.p.b - s.p.a, n * s.p.b)}$`], [`$${ratL(1, 2)}$`, `$${ratL(1, 4)}$`, "$1$", `$${ratL(1, s.p.b + 1)}$`]);
    return {
      text: `${s.dit(n)}\n\n${t}`,
      format: "qcm",
      ...q,
      comparator: "mcq_exact",
      explanation: ex(
        "Succès et échec sont deux issues contraires : leurs probabilités ont pour somme $1$.",
        "On calcule $1 - p$ pour UNE épreuve (le nombre $n$ de répétitions n'intervient pas).",
        `$1 - ${pL(s.p)} = ${qL(s.p)}$.`,
        `L'échec a pour probabilité $${qL(s.p)}$.`,
      ),
    };
  }
  const t = pick([
    "Quelle est l'épreuve de Bernoulli répétée ?",
    "Dans ce schéma de Bernoulli, quelle épreuve est répétée ?",
    "Quelle épreuve à deux issues se répète ici ?",
  ]);
  const q = qcm(maj(s.essai), [maj(s.X), `Les ${n} répétitions ensemble`, `La probabilité $${pL(s.p)}$`]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "Une épreuve de Bernoulli est UNE expérience à deux issues (succès / échec).",
      "On isole l'expérience élémentaire que l'on recommence, sans la confondre avec ce que l'on compte.",
      `L'épreuve est ${s.essai}, de succès « ${s.succes} » ; ${s.X} est la variable que l'on étudiera, pas l'épreuve.`,
      `L'épreuve répétée : ${s.essai}.`,
    ),
  };
}

/** ★3 : schéma de Bernoulli, oui ou non ? */
const OUI_SCHEMA = "Oui : la même épreuve à deux issues est répétée de façon identique et indépendante";
const NON_INDEP = "Non : les épreuves ne sont pas indépendantes";
const NON_P = "Non : la probabilité du succès change d'une épreuve à l'autre";
const NON_ISSUES = "Non : l'épreuve observée a plus de deux issues";
const NON_N = "Non : le nombre de répétitions n'est pas fixé à l'avance";
function genSchema3(): Q {
  type Cas = { texte: string; bon: string; leurres: string[]; pourquoi: string };
  const P = pick(PRENOMS);
  const cas: (() => Cas)[] = [
    () => {
      const s = sit(); const n = ri(3, 20);
      return { texte: `${s.dit(n)} On appelle succès « ${s.succes} ».`, bon: OUI_SCHEMA, leurres: [NON_INDEP, NON_P, NON_ISSUES, NON_N], pourquoi: `Chaque épreuve (${s.essai}) a deux issues, la probabilité du succès reste $${pL(s.p)}$ et les épreuves sont indépendantes : c'est un schéma de Bernoulli à $${n}$ épreuves.` };
    },
    () => {
      const t = ri(6, 12); const r = ri(2, t - 3); const k = ri(3, 5);
      return { texte: `Un sac contient ${t} bonbons coco dont ${r} roses. On en prend ${k} successivement, SANS les remettre, et l'on note à chaque fois si le bonbon est rose.`, bon: NON_INDEP, leurres: [OUI_SCHEMA, NON_ISSUES, NON_N], pourquoi: `Sans remise, le contenu du sac change : la probabilité d'avoir un rose au 2e tirage dépend du 1er (par exemple $\\dfrac{${r - 1}}{${t - 1}}$ ou $\\dfrac{${r}}{${t - 1}}$). Les tirages ne sont pas indépendants.` };
    },
    () => {
      const p = pick([60, 70, 80]); const d = pick([5, 10]);
      return { texte: `${P.nom} tire ${ri(4, 8)} penalties. Le premier est réussi avec la probabilité $${L(String(p / 100).replace(".", ","))}$, mais après chaque échec ${ilElle(P)} se déconcentre : sa probabilité de réussite baisse alors de $${L(String(d / 100).replace(".", ","))}$.`, bon: NON_P, leurres: [OUI_SCHEMA, NON_ISSUES, NON_N], pourquoi: `La probabilité de réussir n'est pas la même à chaque tir (elle peut passer de $${L(String(p / 100).replace(".", ","))}$ à $${L(String((p - d) / 100).replace(".", ","))}$) : les épreuves ne sont pas identiques.` };
    },
    () => {
      const n = ri(3, 10);
      return { texte: `On lance ${n} fois un dé à six faces et l'on note à chaque fois la face obtenue (de 1 à 6).`, bon: NON_ISSUES, leurres: [OUI_SCHEMA, NON_INDEP, NON_N], pourquoi: "Noter la face obtenue donne six issues, pas deux. (Si l'on ne retenait que « obtenir un 6 » ou non, on aurait bien une épreuve de Bernoulli.)" };
    },
    () => {
      const g = pick(["pile", "un 6 au dé", "un secteur gagnant à la roue de la kermesse", "une réponse juste au hasard"]);
      return { texte: `${P.nom} recommence l'expérience jusqu'à obtenir ${g} pour la première fois, puis s'arrête.`, bon: NON_N, leurres: [OUI_SCHEMA, NON_ISSUES, NON_INDEP], pourquoi: `Les épreuves sont bien identiques et indépendantes, mais leur nombre dépend du hasard : un schéma de Bernoulli a un nombre $n$ de répétitions fixé à l'avance.` };
    },
    () => {
      const n = ri(5, 14); const a = pick([30, 40]); const b = pick([60, 70]);
      return { texte: `À Cilaos, on note pendant ${n} jours s'il pleut. S'il a plu la veille, il pleut avec la probabilité $${L(String(b / 100).replace(".", ","))}$ ; sinon avec la probabilité $${L(String(a / 100).replace(".", ","))}$.`, bon: NON_INDEP, leurres: [OUI_SCHEMA, NON_ISSUES, NON_N], pourquoi: "Le temps d'un jour dépend de celui de la veille : les épreuves ne sont pas indépendantes." };
    },
  ];
  const c = pick(cas)();
  const t = pick([
    "Cette expérience est-elle un schéma de Bernoulli ?",
    "Peut-on modéliser cette situation par un schéma de Bernoulli ?",
    "S'agit-il d'un schéma de Bernoulli ? Justifie par la bonne raison.",
  ]);
  const q = qcm(c.bon, c.leurres);
  return {
    text: `${c.texte}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "Un schéma de Bernoulli : $n$ fixé, épreuves identiques et indépendantes, chacune à deux issues (succès / échec).",
      "On vérifie les trois conditions une à une.",
      c.pourquoi,
      c.bon + ".",
    ),
  };
}
/** ★4 : compter les chemins de l'arbre (2^n, ou C(n,k) chemins à k succès). */
function genSchema4(): Q {
  const s = sit();
  if (Math.random() < 0.4) {
    const n = ri(3, 7);
    const t = pick([
      `On représente les ${n} épreuves par un arbre. Combien de chemins (issues) compte-t-il ?`,
      `Combien de feuilles a l'arbre complet de ce schéma de ${n} épreuves ?`,
      `Combien de listes « succès / échec » de longueur ${n} sont possibles ?`,
    ]);
    return {
      text: `${s.dit(n)}\n\n${t}`,
      format: "short",
      expected: [String(2 ** n)],
      comparator: "number_equal",
      explanation: ex(
        "Chaque épreuve a 2 issues ; l'arbre double de taille à chaque niveau.",
        `On applique le principe multiplicatif : $2 \\times 2 \\times \\dots \\times 2$ ($${n}$ facteurs).`,
        `$2^{${n}} = ${2 ** n}$.`,
        `L'arbre compte $${2 ** n}$ chemins.`,
      ),
    };
  }
  const n = ri(4, 10);
  const k = ri(2, n - 2);
  const t = pick([
    `Dans l'arbre de ce schéma, combien de chemins réalisent exactement ${k} succès ?`,
    `Combien de chemins de l'arbre conduisent à l'événement $\\{X = ${k}\\}$, où $X$ est ${s.X} ?`,
    `De combien de façons peut-on placer les ${k} succès parmi les ${n} épreuves ?`,
  ]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "short",
    expected: [String(Cnk(n, k))],
    comparator: "number_equal",
    explanation: ex(
      `Un chemin à $${k}$ succès est déterminé par la place des $${k}$ succès parmi les $${n}$ épreuves.`,
      `Ce nombre est le coefficient binomial $\\binom{${n}}{${k}}$ (calculatrice ou triangle de Pascal).`,
      `$\\binom{${n}}{${k}} = \\dfrac{${n}!}{${k}!\\,${n - k}!} = ${Cnk(n, k)}$.`,
      `$${Cnk(n, k)}$ chemins réalisent exactement $${k}$ succès.`,
    ),
  };
}

/** ★5 : la probabilité d'UN chemin donné (dans l'ordre), valeur exacte. */
function genSchema5(): Q {
  let s = sit();
  while (![2, 4, 5, 6, 10, 100].includes(s.p.b)) s = sit();
  const n = ri(3, 4);
  const ordre = Array.from({ length: n }, () => (Math.random() < 0.5 ? "S" : "E"));
  if (!ordre.includes("S")) ordre[ri(0, n - 1)] = "S";
  if (!ordre.includes("E")) ordre[ri(0, n - 1)] = "E";
  const k = ordre.filter((x) => x === "S").length;
  const a = s.p.a, b = s.p.b, c = b - a;
  const val = (x: number, y: number) => `$${ratL(a ** x * c ** y, b ** n)}$`;
  const bon = val(k, n - k);
  const q = qcm(bon, [
    `$${ratL(Cnk(n, k) * a ** k * c ** (n - k), b ** n)}$`,
    val(n - k, k),
    `$${ratL(a ** k, b ** k)}$`,
  ], [`$${ratL(a ** (k + 1) * c ** (n - k - 1), b ** n)}$`, `$${ratL(c ** (n - k), b ** (n - k))}$`, `$${ratL(k * a * c, b * b)}$`, `$${ratL(a, b)}$`]);
  const mot = ordre.map((x) => (x === "S" ? "succès" : "échec")).join(", ");
  const t = pick([
    `Quelle est la probabilité d'obtenir, dans cet ordre : ${mot} ?`,
    `On note S le succès « ${s.succes} » et E l'échec. Quelle est la probabilité du chemin $${ordre.join("")}$ ?`,
    `Quelle est la probabilité que les ${n} épreuves donnent exactement la suite ${ordre.join("")} (S = succès, E = échec) ?`,
  ]);
  const prod = ordre.map((x) => (x === "S" ? pL(s.p) : qL(s.p))).join(" \\times ");
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "Les épreuves sont indépendantes : la probabilité d'un chemin est le produit des probabilités le long des branches.",
      `On multiplie $p = ${pL(s.p)}$ pour chaque S et $1 - p = ${qL(s.p)}$ pour chaque E. Un seul chemin : pas de coefficient $\\binom{${n}}{${k}}$.`,
      `$${prod} = ${ratL(a ** k * c ** (n - k), b ** n)}$.`,
      `La probabilité du chemin ${ordre.join("")} est ${bon}.`,
    ),
  };
}

loiBinomialeBank.push(
  gab("terminale_spe_binom_schema_gen_1", "binomiale_schema", 1, "Relis l'énoncé : combien de répétitions, quelle probabilité pour une épreuve ?", ["bernoulli", "parametres"], genSchema1),
  gab("terminale_spe_binom_schema_gen_2", "binomiale_schema", 2, "Succès et échec sont contraires : $P(\\text{échec}) = 1 - p$.", ["bernoulli", "echec"], genSchema2),
  gab("terminale_spe_binom_schema_gen_3", "binomiale_schema", 3, "Trois conditions : $n$ fixé, deux issues, épreuves identiques et indépendantes.", ["bernoulli", "schema"], genSchema3),
  gab("terminale_spe_binom_schema_gen_4", "binomiale_schema", 4, "Chaque niveau de l'arbre double le nombre de chemins ; placer $k$ succès parmi $n$ : $\\binom{n}{k}$.", ["bernoulli", "arbre"], genSchema4),
  gab("terminale_spe_binom_schema_gen_5", "binomiale_schema", 5, "Un chemin : on multiplie $p$ pour chaque succès et $1-p$ pour chaque échec.", ["bernoulli", "chemin"], genSchema5),
);
/* =========================================================================
   BINOMIALE_RECONNAITRE — X suit-elle une loi binomiale ? De paramètres ?
========================================================================= */

const loi$ = (n: number | string, p: string) => `$\\mathcal{B}(${n}\\,;${p})$`;

/** ★2 : les paramètres lus dans l'énoncé. */
function genReco2(): Q {
  let s = sit();
  while (s.p.b !== 100 && Math.random() < 0.7) s = sit();
  const n = ri(5, 40);
  const t = pick([
    `On note $X$ ${s.X}. Quelle loi suit $X$ ?`,
    `Soit $X$ ${s.X}. $X$ suit une loi binomiale : laquelle ?`,
    `On appelle $X$ ${s.X}. Quels sont les paramètres de sa loi ?`,
  ]);
  const q = qcm(loi$(n, pL(s.p)), [loi$(n, qL(s.p)), loi$(pL(s.p), String(n)), loi$(n - 1, pL(s.p))], [loi$(n + 1, pL(s.p))]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "Si $X$ compte les succès de $n$ épreuves de Bernoulli identiques et indépendantes, $X \\sim \\mathcal{B}(n\\,;p)$ : $n$ d'abord, puis $p$ = probabilité du SUCCÈS.",
      `Le succès est « ${s.succes} » ; on lit $n$ et $p$.`,
      `$n = ${n}$ répétitions et $p = ${pL(s.p)}$.`,
      `$X \\sim ${loiL(n, s.p)}$.`,
    ),
  };
}

/** ★3 : p à calculer (dé, roue, billes, QCM) ou X compte les ÉCHECS. */
function genReco3(): Q {
  let s = sit();
  const echecs = Math.random() < 0.4;
  if (!echecs) while (s.p.b === 100) s = sit();
  const n = ri(4, 30);
  const Xt = echecs ? `le nombre d'épreuves où l'on n'a PAS « ${s.succes} »` : s.X;
  const pv = echecs ? qL(s.p) : pL(s.p);
  const autre = echecs ? pL(s.p) : qL(s.p);
  const t = pick([
    `On note $Y$ ${Xt}. Quelle est la loi de $Y$ ?`,
    `Soit $Y$ ${Xt}. Parmi ces lois, laquelle est celle de $Y$ ?`,
  ]);
  const q = qcm(loi$(n, pv), [loi$(n, autre), loi$(pv, String(n)), loi$(n, `\\dfrac{1}{${n}}`)], [loi$(n - 1, pv)]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "Une loi binomiale $\\mathcal{B}(n\\,;p)$ compte les réalisations d'UNE issue ; $p$ est la probabilité de CETTE issue.",
      echecs
        ? "Ici on compte les échecs : on prend l'échec comme « succès » du schéma, de probabilité $1 - p$."
        : "On calcule la probabilité de l'issue comptée pour une seule épreuve.",
      echecs
        ? `$P(\\text{échec}) = 1 - ${pL(s.p)} = ${qL(s.p)}$, avec $n = ${n}$.`
        : `$p = ${pL(s.p)}$ (pour ${s.essai}), avec $n = ${n}$.`,
      `$Y \\sim \\mathcal{B}(${n}\\,;${pv})$.`,
    ),
  };
}

/** ★4 : binomiale ou pas ? (rang du premier succès, somme, sans remise, fréquence). */
function genReco4(): Q {
  const OUI = "Oui, $X$ suit une loi binomiale";
  const N_RANG = "Non : $X$ n'est pas un nombre de succès sur $n$ épreuves fixées";
  const N_REMISE = "Non : les tirages sans remise ne sont pas indépendants";
  const N_VAL = "Non : $X$ ne prend pas les valeurs entières $0, 1, \\dots, n$";
  // Faux dans tous les cas : une idée reçue (p n'a pas à valoir 0,5).
  const N_DEMI = "Non : une loi binomiale exige $p = 0{,}5$";
  const cas: (() => { texte: string; bon: string; leurres: string[]; pourquoi: string })[] = [
    () => {
      const s = sit(); const n = ri(5, 25);
      return { texte: `${s.dit(n)} On note $X$ ${s.X}.`, bon: OUI, leurres: [N_RANG, N_REMISE, N_VAL], pourquoi: `$X$ compte les succès (« ${s.succes} ») de $${n}$ épreuves identiques et indépendantes : $X \\sim ${loiL(n, s.p)}$.` };
    },
    () => {
      const s = sit();
      return { texte: `On recommence ${s.essai} jusqu'au premier succès (« ${s.succes} »), avec $p = ${pL(s.p)}$. On note $X$ le rang de ce premier succès.`, bon: N_RANG, leurres: [OUI, N_REMISE, N_DEMI], pourquoi: "Le nombre d'épreuves n'est pas fixé et $X$ est un rang, pas un nombre de succès : ce n'est pas une loi binomiale." };
    },
    () => {
      const t = ri(8, 15); const r = ri(3, t - 4); const k = ri(3, 5);
      return { texte: `Une boîte contient ${t} samoussas dont ${r} au poulet. On en prend ${k} au hasard, d'un coup (sans remise). On note $X$ le nombre de samoussas au poulet obtenus.`, bon: N_REMISE, leurres: [OUI, N_VAL, N_DEMI], pourquoi: `Prendre sans remise dans une petite boîte modifie la composition : la probabilité « au poulet » passe de $\\dfrac{${r}}{${t}}$ à $\\dfrac{${r - 1}}{${t - 1}}$ ou $\\dfrac{${r}}{${t - 1}}$. Les épreuves ne sont pas indépendantes.` };
    },
    () => {
      const n = ri(2, 5);
      return { texte: `On lance ${n} dés équilibrés à six faces et l'on note $X$ la somme des faces obtenues.`, bon: N_VAL, leurres: [OUI, N_REMISE, N_DEMI], pourquoi: `$X$ prend les valeurs de $${n}$ à $${6 * n}$ : ce n'est pas un nombre de succès compris entre $0$ et $n$.` };
    },
    () => {
      const s = sit(); const n = pick([10, 20, 25, 50]);
      return { texte: `${s.dit(n)} On note $X$ la FRÉQUENCE des succès (« ${s.succes} »), c'est-à-dire le nombre de succès divisé par $${n}$.`, bon: N_VAL, leurres: [OUI, N_REMISE, N_DEMI], pourquoi: `$X$ prend les valeurs $0$, $\\dfrac{1}{${n}}$, $\\dfrac{2}{${n}}$… : c'est $\\dfrac{S}{${n}}$ où $S \\sim ${loiL(n, s.p)}$, mais $X$ elle-même n'est pas binomiale.` };
    },
  ];
  const c = pick(cas)();
  const t = pick(["La variable $X$ suit-elle une loi binomiale ?", "Peut-on dire que $X$ suit une loi binomiale ?", "$X$ est-elle binomiale ? Choisis la bonne justification."]);
  const q = qcm(c.bon, c.leurres);
  return {
    text: `${c.texte}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "$X$ suit une loi binomiale si elle COMPTE les succès de $n$ épreuves de Bernoulli identiques et indépendantes ($n$ fixé).",
      "On vérifie : que compte $X$ ? le nombre d'épreuves est-il fixé ? sont-elles indépendantes ?",
      c.pourquoi,
      c.bon + ".",
    ),
  };
}
/** ★5 : retrouver les paramètres à partir de la formule ou de E(X). */
function genReco5(): Q {
  const n = ri(6, 30);
  const p = R100(pick([5, 10, 15, 20, 25, 30, 35, 40, 45, 55, 60, 65, 70, 75, 80, 85, 90]));
  const bon = loi$(n, pL(p));
  // Le décor : ce que compte X (les nombres n, p sont tirés à part).
  const d = sit();
  const intro = pick([
    `Dans une étude, $X$ désigne ${d.X}.`,
    `Un élève modélise ${d.X} par une variable aléatoire $X$.`,
    `On répète ${d.essai} et l'on note $X$ ${d.X}.`,
  ]);
  if (Math.random() < 0.55) {
    const inverse = Math.random() < 0.5;
    const formule = inverse
      ? `\\binom{${n}}{k} \\times ${pw(qL(p))}^{${n} - k} \\times ${pw(pL(p))}^{k}`
      : `\\binom{${n}}{k} \\times ${pw(pL(p))}^{k} \\times ${pw(qL(p))}^{${n} - k}`;
    const t = pick([
      `Pour tout entier $k$ de $0$ à $${n}$, $P(X = k) = ${formule}$. Quelle est la loi de $X$ ?`,
      `Une variable $X$ vérifie $P(X = k) = ${formule}$ pour $k \\in \\{0, \\dots, ${n}\\}$. Ses paramètres ?`,
    ]);
    const q = qcm(bon, [loi$(n, qL(p)), loi$("k", pL(p)), loi$(pL(p), String(n))]);
    return {
      text: `${intro} ${t}`,
      format: "qcm",
      ...q,
      comparator: "mcq_exact",
      explanation: ex(
        "Pour $X \\sim \\mathcal{B}(n\\,;p)$ : $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$ ; $p$ est le nombre élevé à la puissance $k$.",
        "On repère $n$ (en haut du coefficient binomial) et le nombre affecté de l'exposant $k$.",
        `$n = ${n}$ ; l'exposant $k$ porte sur $${pL(p)}$, donc $p = ${pL(p)}$ (et $1 - p = ${qL(p)}$ porte l'exposant $${n} - k$).`,
        `$X \\sim ${loiL(n, p)}$.`,
      ),
    };
  }
  // E(X) et V(X) donnés : p = 1 − V/E, puis n = E/p.
  const E = ratL(n * p.a, 100);
  const V = ratL(n * p.a * (100 - p.a), 10000);
  const t = pick([
    `$X$ suit une loi binomiale avec $E(X) = ${E}$ et $V(X) = ${V}$. Quelle est sa loi ?`,
    `On sait que $X$ est binomiale, d'espérance $${E}$ et de variance $${V}$. Retrouve $n$ et $p$.`,
  ]);
  // Leurres : p et 1 − p échangés ; n pris égal à E ; même espérance mais variance ignorée.
  const q = qcm(bon, [loi$(n, qL(p)), loi$(E, pL(p)), loi$(n * 2, ratL(p.a, 200))], [loi$(n + 1, pL(p))]);
  return {
    text: `${intro} ${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "$E(X) = np$ et $V(X) = np(1-p)$, donc $\\dfrac{V(X)}{E(X)} = 1 - p$.",
      "On calcule d'abord $1 - p = V/E$, puis $p$, puis $n = E/p$.",
      `$1 - p = \\dfrac{${V}}{${E}} = ${qL(p)}$, donc $p = ${pL(p)}$ ; $n = \\dfrac{${E}}{${pL(p)}} = ${n}$.`,
      `$X \\sim ${loiL(n, p)}$.`,
    ),
  };
}

loiBinomialeBank.push(
  gab("terminale_spe_binom_reco_gen_2", "binomiale_reconnaitre", 2, "$\\mathcal{B}(n\\,;p)$ : $n$ = nombre de répétitions, $p$ = probabilité du succès compté.", ["reconnaitre", "parametres"], genReco2),
  gab("terminale_spe_binom_reco_gen_3", "binomiale_reconnaitre", 3, "Quelle issue compte la variable ? $p$ est la probabilité de CETTE issue.", ["reconnaitre", "parametres"], genReco3),
  gab("terminale_spe_binom_reco_gen_4", "binomiale_reconnaitre", 4, "Binomiale = nombre de succès sur $n$ épreuves identiques, indépendantes, $n$ fixé.", ["reconnaitre", "justifier"], genReco4),
  gab("terminale_spe_binom_reco_gen_5", "binomiale_reconnaitre", 5, "$p$ porte l'exposant $k$ ; ou bien $V/E = 1 - p$.", ["reconnaitre", "inverse"], genReco5),
);
/* =========================================================================
   BINOMIALE_CALCULER — P(X = k) = C(n,k) p^k (1 − p)^(n − k).
========================================================================= */

/** Le début d'énoncé : une situation (X compte les succès) ou une loi donnée. */
function enonceLoi(n: number, s: Sit): string {
  return Math.random() < 0.75 ? `${s.dit(n)} On note $X$ ${s.X}.` : `Soit $X$ une variable aléatoire qui suit la loi ${loi$(n, pL(s.p))}.`;
}
/** Valeurs arrondies DISTINCTES : on écarte les leurres qui tombent sur le même arrondi. */
/** Une probabilité arrondie, ou "" (écartée du QCM) si elle se lit 0,000 ou dépasse 0,999. */
const R3 = (num: bigint, den: bigint, d = 3) => {
  const t = arr(num, den, d);
  return /^0,0+$/.test(t) || !t.startsWith("0,") ? "" : `$${L(t)}$`;
};

/** ★3 : P(X = 0) = (1 − p)^n ou P(X = n) = p^n. */
function genCalc3(): Q {
  const s = sit();
  const n = ri(2, 8);
  const zero = Math.random() < 0.5;
  const den = denN(n, s.p);
  const k = zero ? 0 : n;
  const num = numK(n, k, s.p);
  const autre = numK(n, n - k, s.p);
  // Une probabilité lisible au millième (pas « 0,000 ») : sinon on retire.
  if ((num * 1000n) / den < 10n) return genCalc3();
  const evt = zero ? `aucun succès (« ${s.succes} » ne se produit jamais)` : `que des succès (« ${s.succes} » à chaque fois)`;
  const t = pick([
    `Calcule $P(X = ${k})$, arrondie au millième.`,
    `Quelle est la probabilité d'obtenir ${evt} ? Donne la valeur arrondie au millième.`,
    `Que vaut $P(X = ${k})$ ? (arrondi à $10^{-3}$)`,
  ]);
  // Leurres : l'autre extrémité (p et 1 − p échangés), oublier le « 1 − »
  // (prendre le contraire), multiplier par n au lieu d'élever à la puissance n.
  const ba = zero ? s.p.b - s.p.a : s.p.a;
  const fois = ba * n < s.p.b ? [R3(B(ba * n), B(s.p.b))] : [];
  const q = qcm(R3(num, den), [R3(autre, den), R3(den - num, den), ...fois], [R3(zero ? B(s.p.b - s.p.a) : B(s.p.a), B(s.p.b)), R3(num * 2n, den), R3(num, den * 2n)]);
  const base = zero ? qL(s.p) : pL(s.p);
  return {
    text: `${enonceLoi(n, s)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      zero ? `$\\{X = 0\\}$ : les $${n}$ épreuves sont toutes des échecs, un seul chemin.` : `$\\{X = ${n}\\}$ : les $${n}$ épreuves sont toutes des succès, un seul chemin.`,
      zero ? "$P(X = 0) = \\binom{n}{0} p^0 (1-p)^n = (1-p)^n$." : "$P(X = n) = \\binom{n}{n} p^n (1-p)^0 = p^n$.",
      `$P(X = ${k}) = ${pw(base)}^{${n}} \\approx ${arrL(num, den, 3)}$.`,
      `$P(X = ${k}) \\approx ${arrL(num, den, 3)}$.`,
    ),
  };
}

/** ★4 : la bonne expression de P(X = k), ou sa valeur pour n petit. */
function genCalc4(): Q {
  const s = sit();
  const n = ri(3, 9);
  const k = ri(1, n - 1);
  const P = pL(s.p), Qq = qL(s.p);
  if (Math.random() < 0.5) {
    const f = (a: string, b: string, coef = true) => `$${coef ? `\\binom{${n}}{${k}} \\times ` : ""}${a} \\times ${b}$`;
    const bon = f(`${pw(P)}^{${k}}`, `${pw(Qq)}^{${n - k}}`);
    const q = qcm(bon, [
      f(`${pw(P)}^{${k}}`, `${pw(Qq)}^{${n - k}}`, false),
      f(`${pw(Qq)}^{${k}}`, `${pw(P)}^{${n - k}}`),
      f(`${pw(P)}^{${k}}`, `${pw(Qq)}^{${n}}`),
      `$\\binom{${n}}{${k}} \\times ${pw(P)}^{${k}}$`,
    ]);
    const t = pick([`Quelle expression est égale à $P(X = ${k})$ ?`, `Parmi ces écritures, laquelle donne $P(X = ${k})$ ?`]);
    return {
      text: `${enonceLoi(n, s)}\n\n${t}`,
      format: "qcm",
      ...q,
      comparator: "mcq_exact",
      explanation: ex(
        "Pour $X \\sim \\mathcal{B}(n\\,;p)$ : $P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.",
        `$\\binom{${n}}{${k}}$ chemins à $${k}$ succès, chacun de probabilité $p^{${k}}(1-p)^{${n - k}}$.`,
        `Avec $n = ${n}$, $k = ${k}$, $p = ${P}$ : $\\binom{${n}}{${k}} \\times ${pw(P)}^{${k}} \\times ${pw(Qq)}^{${n - k}}$.`,
        `La bonne expression est ${bon}.`,
      ),
    };
  }
  const den = denN(n, s.p);
  const num = numK(n, k, s.p);
  if ((num * 1000n) / den < 10n) return genCalc4();
  const t = pick([`Calcule $P(X = ${k})$, arrondie au millième.`, `Quelle est la probabilité que $X$ prenne la valeur $${k}$ ? (arrondi à $10^{-3}$)`]);
  const q = qcm(R3(num, den), [
    R3(num / B(Cnk(n, k)), den),
    R3(numK(n, n - k, s.p), den),
    R3(numEntre(n, 0, k, s.p), den),
  ], [R3(den - num, den), R3(numEntre(n, k, n, s.p), den)]);
  return {
    text: `${enonceLoi(n, s)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.",
      `On remplace : $n = ${n}$, $k = ${k}$, $p = ${P}$, $1 - p = ${Qq}$.`,
      `$P(X = ${k}) = \\binom{${n}}{${k}} \\times ${pw(P)}^{${k}} \\times ${pw(Qq)}^{${n - k}} = ${Cnk(n, k)} \\times ${pw(P)}^{${k}} \\times ${pw(Qq)}^{${n - k}} \\approx ${arrL(num, den, 3)}$.`,
      `$P(X = ${k}) \\approx ${arrL(num, den, 3)}$.`,
    ),
  };
}
/** ★5 : P(X = k) pour n grand (calculatrice), arrondie au millième. */
function genCalc5(): Q {
  const s = sit();
  const n = ri(10, 40);
  const moy = (n * s.p.a) / s.p.b;
  const k = Math.max(0, Math.min(n, Math.round(moy) + ri(-2, 2)));
  const den = denN(n, s.p);
  const num = numK(n, k, s.p);
  if ((num * 1000n) / den < 10n) return genCalc5();
  const t = pick([
    `Calcule $P(X = ${k})$ à la calculatrice ; donne le résultat arrondi au millième.`,
    `Quelle est la probabilité d'avoir exactement $${k}$ succès (« ${s.succes} ») ? Arrondis à $10^{-3}$.`,
    `Donne une valeur de $P(X = ${k})$ arrondie au millième.`,
  ]);
  // Leurres : sans le coefficient binomial ; p et 1 − p échangés ; P(X ≤ k) au lieu de P(X = k).
  const sansC = R3(num / B(Cnk(n, k)), den, 3);
  const q = qcm(R3(num, den), [
    R3(numK(n, n - k, s.p), den),
    R3(numEntre(n, 0, k, s.p), den),
    R3(numEntre(n, k, n, s.p), den),
    ...(sansC === "$0{,}000$" ? [] : [sansC]),
  ], [R3(numK(n, k + 1 <= n ? k + 1 : k - 1, s.p), den), R3(numK(n, k - 1 >= 0 ? k - 1 : k + 1, s.p), den)]);
  return {
    text: `${enonceLoi(n, s)}\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$ ; à la calculatrice : binomFdp (TI) ou Binomiale FdP (Casio).",
      `Paramètres : $n = ${n}$, $p = ${pL(s.p)}$, $k = ${k}$. Attention : $P(X = ${k})$, pas $P(X \\leq ${k})$ (fonction de répartition).`,
      `$P(X = ${k}) = \\binom{${n}}{${k}} \\times ${pw(pL(s.p))}^{${k}} \\times ${pw(qL(s.p))}^{${n - k}} \\approx ${arrL(num, den, 3)}$ (avec $\\binom{${n}}{${k}} = ${Cnk(n, k)}$).`,
      `$P(X = ${k}) \\approx ${arrL(num, den, 3)}$.`,
    ),
  };
}

loiBinomialeBank.push(
  gab("terminale_spe_binom_calc_gen_3", "binomiale_calculer", 3, "Aucun succès : $(1-p)^n$ ; que des succès : $p^n$.", ["calculer", "extremes"], genCalc3),
  gab("terminale_spe_binom_calc_gen_4", "binomiale_calculer", 4, "$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$.", ["calculer", "formule"], genCalc4),
  gab("terminale_spe_binom_calc_gen_5", "binomiale_calculer", 5, "Calculatrice : binomFdp($n$, $p$, $k$) donne $P(X = k)$.", ["calculer", "calculatrice"], genCalc5),
);
/** ★4 (gabarit historique terminale_spe_binom_calc_tpl_1) : P(X = 0) en valeur exacte. */
function genCalcZero(): Q {
  let s = sit();
  while (![2, 4, 5, 10, 100].includes(s.p.b)) s = sit();
  const n = s.p.b === 100 ? ri(2, 3) : ri(2, 5);
  const a = s.p.a, b = s.p.b, c = b - a;
  const bon = `$${ratL(c ** n, b ** n)}$`;
  const q = qcm(bon, [
    `$${ratL(a ** n, b ** n)}$`,
    `$${ratL(b ** n - c ** n, b ** n)}$`,
    `$${ratL(c, b)}$`,
  ], [`$${ratL(c ** (n - 1), b ** (n - 1))}$`, `$${ratL(c ** (n + 1), b ** (n + 1))}$`]);
  const t = pick([
    `Quelle est la valeur exacte de $P(X = 0)$ ?`,
    `Quelle est la probabilité exacte que l'événement « ${s.succes} » ne se réalise jamais ?`,
    `Calcule la probabilité exacte de n'avoir aucun succès.`,
  ]);
  return {
    text: `${s.dit(n)} On note $X$ ${s.X}.\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      `Aucun succès : les $${n}$ épreuves sont des échecs, de probabilité $1 - p = ${qL(s.p)}$ chacune.`,
      "Épreuves indépendantes : on multiplie, $P(X = 0) = (1-p)^n$.",
      `$P(X = 0) = ${pw(qL(s.p))}^{${n}} = ${ratL(c ** n, b ** n)}$.`,
      `$P(X = 0) = ${ratL(c ** n, b ** n)}$.`,
    ),
  };
}

/* =========================================================================
   BINOMIALE_ESPERANCE_VARIANCE — E = np, V = np(1 − p), σ = √V.
========================================================================= */

/** Un n pour lequel n·p tombe juste en décimal (p = 1/6 → n multiple de 3…). */
function nDecimal(p: R, lo: number, hi: number): number {
  for (let essai = 0; essai < 200; essai++) {
    const n = ri(lo, hi);
    if (decExact(n * p.a, p.b) !== null && decExact(n * p.a * (p.b - p.a), p.b * p.b) !== null) return n;
  }
  return p.b * Math.max(1, Math.round(lo / p.b));
}

/** ★2 : E(X) = np, calcul direct. */
function genEsp2(): Q {
  const s = sit();
  const n = nDecimal(s.p, 5, 60);
  const E = decExact(n * s.p.a, s.p.b)!;
  const t = pick([
    `On note $X$ ${s.X}. Calcule l'espérance $E(X)$.`,
    `Soit $X$ ${s.X}. Que vaut $E(X)$ ?`,
    `$X$ désigne ${s.X}. Donne $E(X)$.`,
  ]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "short",
    expected: ecr(E),
    comparator: "number_equal",
    explanation: ex(
      `$X \\sim ${loiL(n, s.p)}$, et pour une loi binomiale $E(X) = np$.`,
      `On multiplie le nombre de répétitions par la probabilité du succès.`,
      `$E(X) = ${n} \\times ${pL(s.p)} = ${L(E)}$.`,
      `$E(X) = ${L(E)}$.`,
    ),
  };
}

/** ★3 (gabarit historique terminale_spe_binom_ev_tpl_1) : E(X) et son sens « en moyenne ». */
function genEspContexte(): Q {
  const s = sit();
  const n = nDecimal(s.p, 10, 200);
  const E = decExact(n * s.p.a, s.p.b)!;
  if (Math.random() < 0.6) {
    const t = pick([
      `En moyenne, combien ${deN(s.unite)} peut-on espérer sur ces $${n}$ épreuves ?`,
      `Sur un grand nombre de séries de $${n}$ épreuves, quel est le nombre moyen ${deN(s.unite)} ?`,
      `Quel nombre ${deN(s.unite)} obtient-on en moyenne ?`,
    ]);
    return {
      text: `${s.dit(n)}\n\n${t}`,
      format: "short",
      expected: ecr(E),
      comparator: "number_equal",
      explanation: ex(
        `Le nombre moyen de succès est l'espérance de $X$, ${s.X}, avec $X \\sim ${loiL(n, s.p)}$.`,
        "$E(X) = np$.",
        `$E(X) = ${n} \\times ${pL(s.p)} = ${L(E)}$.`,
        `En moyenne, $${L(E)}$ ${s.unite}.`,
      ),
    };
  }
  const bon = `Sur un très grand nombre de séries de $${n}$ épreuves, la moyenne des valeurs de $X$ est proche de $${L(E)}$`;
  const q = qcm(bon, [
    `À chaque série de $${n}$ épreuves, on obtient exactement $${L(E)}$ succès`,
    `$P(X = ${L(E)}) = ${pL(s.p)}$`,
    `$X$ ne peut pas dépasser $${L(E)}$`,
  ]);
  return {
    text: `${s.dit(n)} On note $X$ ${s.X} ; on trouve $E(X) = ${L(E)}$.\n\n${pick(["Comment interpréter ce résultat ?", "Que signifie cette espérance ?"])}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "L'espérance est une moyenne « à long terme », pas une valeur obtenue à coup sûr.",
      "On l'interprète sur un grand nombre de répétitions de l'expérience entière.",
      `$E(X) = ${n} \\times ${pL(s.p)} = ${L(E)}$ : en moyenne $${L(E)}$ ${s.unite} par série de $${n}$.`,
      bon + ".",
    ),
  };
}
/** ★4 : V(X) = np(1 − p). */
function genVar4(): Q {
  const s = sit();
  const n = nDecimal(s.p, 5, 100);
  const V = decExact(n * s.p.a * (s.p.b - s.p.a), s.p.b * s.p.b)!;
  const E = decExact(n * s.p.a, s.p.b)!;
  const t = pick([
    `On note $X$ ${s.X}. Calcule la variance $V(X)$.`,
    `Soit $X$ ${s.X}. Que vaut $V(X)$ ?`,
    `$X$ désigne ${s.X}. Donne la variance de $X$.`,
  ]);
  return {
    text: `${s.dit(n)}\n\n${t}`,
    format: "short",
    expected: ecr(V),
    comparator: "number_equal",
    explanation: ex(
      `$X \\sim ${loiL(n, s.p)}$ et $V(X) = np(1-p)$.`,
      `On calcule $np$, puis on multiplie par $1 - p = ${qL(s.p)}$.`,
      `$V(X) = ${n} \\times ${pL(s.p)} \\times ${qL(s.p)} = ${L(E)} \\times ${qL(s.p)} = ${L(V)}$.`,
      `$V(X) = ${L(V)}$.`,
    ),
  };
}

/** ★5 : écart-type arrondi, ou retrouver n (ou p) à partir de E(X). */
function genEV5(): Q {
  const s = sit();
  const r = Math.random();
  if (r < 0.4) {
    const n = nDecimal(s.p, 10, 200);
    const vNum = n * s.p.a * (s.p.b - s.p.a), vDen = s.p.b * s.p.b;
    const V = decExact(vNum, vDen)!;
    const sig = (x: number) => `$${(Math.round(Math.sqrt(x) * 100) / 100).toFixed(2).replace(".", "{,}")}$`;
    const vv = vNum / vDen, ee = (n * s.p.a) / s.p.b;
    if (Math.abs(Math.sqrt(vv) * 100 - Math.round(Math.sqrt(vv) * 100) - 0.5) < 1e-6 || Math.sqrt(vv) < 0.1) return genEV5();
    const q = qcm(sig(vv), [`$${L(V)}$`, sig(ee), sig(n * Math.pow(s.p.a / s.p.b, 2))], [sig(vv * 2), sig(vv / 2)]);
    return {
      text: `${s.dit(n)} On note $X$ ${s.X}.\n\n${pick(["Quel est l'écart-type $\\sigma(X)$, arrondi au centième ?", "Donne $\\sigma(X)$ arrondi à $0{,}01$ près."])}`,
      format: "qcm",
      ...q,
      comparator: "mcq_exact",
      explanation: ex(
        "$\\sigma(X) = \\sqrt{V(X)}$ avec $V(X) = np(1-p)$.",
        "On calcule la variance, puis sa racine carrée.",
        `$V(X) = ${n} \\times ${pL(s.p)} \\times ${qL(s.p)} = ${L(V)}$, donc $\\sigma(X) = \\sqrt{${L(V)}} \\approx ${sig(vv).slice(1, -1)}$.`,
        `$\\sigma(X) \\approx ${sig(vv).slice(1, -1)}$.`,
      ),
    };
  }
  // On donne E(X) et p : n = E / p ; ou E(X) et n : p = E / n.
  const n = nDecimal(s.p, 8, 120);
  const E = decExact(n * s.p.a, s.p.b)!;
  const cherchN = r < 0.75;
  const phrase = s.dit("$n$");
  if (cherchN) {
    return {
      text: `${phrase} On note $X$ ${s.X}.\n\nOn sait que $E(X) = ${L(E)}$. Combien vaut $n$ ?`,
      format: "short",
      expected: [String(n)],
      comparator: "number_equal",
      explanation: ex(
        "$E(X) = np$, donc $n = \\dfrac{E(X)}{p}$.",
        `On divise l'espérance par $p = ${pL(s.p)}$.`,
        `$n = ${L(E)} \\div ${pL(s.p)} = ${n}$.`,
        `$n = ${n}$.`,
      ),
    };
  }
  // p est l'inconnue : on la masque dans l'énoncé (situations où p est écrit en décimal).
  if (s.p.b !== 100) return genEV5();
  const P = decExact(s.p.a, s.p.b)!;
  const cache = s.dit(n).replace(`$${pL(s.p)}$`, "$p$");
  return {
    text: `${cache} On note $X$ ${s.X} ; on sait que $E(X) = ${L(E)}$.\n\nQuelle est la valeur de $p$ ?`,
    format: "short",
    expected: ecr(P),
    comparator: "number_equal",
    explanation: ex(
      "$E(X) = np$, donc $p = \\dfrac{E(X)}{n}$.",
      `On divise l'espérance par $n = ${n}$.`,
      `$p = ${L(E)} \\div ${n} = ${L(P)}$.`,
      `$p = ${L(P)}$.`,
    ),
  };
}

loiBinomialeBank.push(
  gab("terminale_spe_binom_ev_gen_2", "binomiale_esperance_variance", 2, "$E(X) = np$.", ["esperance"], genEsp2),
  gab("terminale_spe_binom_ev_gen_4", "binomiale_esperance_variance", 4, "$V(X) = np(1-p)$.", ["variance"], genVar4),
  gab("terminale_spe_binom_ev_gen_5", "binomiale_esperance_variance", 5, "$\\sigma(X) = \\sqrt{np(1-p)}$ ; et $E(X) = np$ se lit dans les deux sens.", ["ecart_type", "inverse"], genEV5),
);
/* =========================================================================
   BINOMIALE_INTERVALLE — P(X ≥ 1), P(X ≤ k), P(a ≤ X ≤ b).
========================================================================= */

/** ★3 : P(X ≥ 1) = 1 − (1 − p)^n, arrondie au millième. */
function genInterv3(): Q {
  const s = sit();
  const n = ri(2, 15);
  const den = denN(n, s.p);
  const num = den - numK(n, 0, s.p);
  // Lisible au millième : ni « 0,000 » ni « 1,000 ».
  if ((num * 1000n) / den < 10n || ((den - num) * 1000n) / den < 10n) return genInterv3();
  const t = pick([
    `Quelle est la probabilité d'obtenir au moins un succès (« ${s.succes} ») ? Arrondis au millième.`,
    `Calcule $P(X \\geq 1)$, arrondie au millième.`,
    `Quelle est la probabilité que l'événement « ${s.succes} » se réalise au moins une fois ? (arrondi à $10^{-3}$)`,
  ]);
  const ba = s.p.a * n;
  const q = qcm(R3(num, den), [
    R3(den - num, den),
    R3(den - numK(n, n, s.p), den),
    ...(ba < s.p.b ? [R3(B(ba), B(s.p.b))] : []),
    R3(numK(n, 1, s.p), den),
  ], [R3(den - numK(n, 0, s.p) - numK(n, 1, s.p), den), R3(numK(n, 0, s.p) * 2n, den)]);
  return {
    text: `${s.dit(n)} On note $X$ ${s.X}.\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "« Au moins un succès » est l'événement contraire de « aucun succès » : $P(X \\geq 1) = 1 - P(X = 0)$.",
      "$P(X = 0) = (1-p)^n$ : toutes les épreuves échouent.",
      `$P(X \\geq 1) = 1 - ${pw(qL(s.p))}^{${n}} \\approx 1 - ${arrL(den - num, den, 4)} \\approx ${arrL(num, den, 3)}$.`,
      `$P(X \\geq 1) \\approx ${arrL(num, den, 3)}$.`,
    ),
  };
}

/** ★4 : réécrire P(X > k), P(X ≥ k), P(X < k), P(a ≤ X ≤ b) avec la fonction de répartition. */
function genInterv4(): Q {
  const s = sit();
  const n = ri(8, 40);
  const k = ri(2, n - 3);
  const F = (j: number) => `P(X \\leq ${j})`;
  const forme = ri(0, 3);
  let cible: string, bon: string, leurres: string[], pourquoi: string;
  if (forme === 0) {
    cible = `P(X > ${k})`; bon = `1 - ${F(k)}`;
    leurres = [`1 - ${F(k - 1)}`, `1 - P(X \\geq ${k})`, F(k)];
    pourquoi = `$X > ${k}$ est le contraire de $X \\leq ${k}$.`;
  } else if (forme === 1) {
    cible = `P(X \\geq ${k})`; bon = `1 - ${F(k - 1)}`;
    leurres = [`1 - ${F(k)}`, F(k - 1), `1 - ${F(k + 1)}`];
    pourquoi = `$X \\geq ${k}$ est le contraire de $X < ${k}$, c'est-à-dire de $X \\leq ${k - 1}$ ($X$ est entière).`;
  } else if (forme === 2) {
    cible = `P(X < ${k})`; bon = F(k - 1);
    leurres = [F(k), `1 - ${F(k)}`, `1 - ${F(k - 1)}`];
    pourquoi = `$X$ prend des valeurs entières : $X < ${k}$ équivaut à $X \\leq ${k - 1}$.`;
  } else {
    const a = ri(1, k - 1);
    cible = `P(${a} \\leq X \\leq ${k})`; bon = `${F(k)} - ${F(a - 1)}`;
    leurres = [`${F(k)} - ${F(a)}`, `${F(k - 1)} - ${F(a - 1)}`, `${F(k)} + ${F(a - 1)}`];
    pourquoi = `On retire de $X \\leq ${k}$ les valeurs $0, \\dots, ${a - 1}$, c'est-à-dire $X \\leq ${a - 1}$ : la valeur $${a}$ reste comptée.`;
  }
  const q = qcm(`$${bon}$`, leurres.map((l) => `$${l}$`));
  const t = pick([
    `Quelle expression est égale à $${cible}$ ?`,
    `Pour calculer $${cible}$ à la calculatrice (fonction de répartition), quelle écriture utiliser ?`,
    `On ne dispose que de la fonction de répartition $k \\mapsto P(X \\leq k)$. Comment obtenir $${cible}$ ?`,
  ]);
  return {
    text: `${s.dit(n)} On note $X$ ${s.X}.\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "La calculatrice donne $P(X = k)$ et $P(X \\leq k)$ ; on se ramène à elles en traduisant les inégalités sur des ENTIERS.",
      "Événement contraire : $P(\\overline{A}) = 1 - P(A)$ ; attention au « strict » ou « large ».",
      pourquoi,
      `$${cible} = ${bon}$.`,
    ),
  };
}

/** ★5 : P(a ≤ X ≤ b) ou P(X ≥ k) pour n grand, arrondie au millième. */
function genInterv5(): Q {
  const s = sit();
  const n = ri(15, 60);
  const moy = Math.round((n * s.p.a) / s.p.b);
  const den = denN(n, s.p);
  let lo: number, hi: number, cible: string;
  let leurresNum: bigint[];
  if (Math.random() < 0.5) {
    lo = Math.max(1, moy - ri(1, 3)); hi = Math.min(n - 1, moy + ri(1, 3));
    if (lo >= hi) return genInterv5();
    cible = `P(${lo} \\leq X \\leq ${hi})`;
    leurresNum = [numEntre(n, lo + 1, hi, s.p), numEntre(n, lo, hi - 1, s.p), numEntre(n, lo + 1, hi - 1, s.p), numEntre(n, 0, hi, s.p)];
  } else {
    lo = Math.min(n - 1, Math.max(1, moy + ri(-2, 2))); hi = n;
    cible = `P(X \\geq ${lo})`;
    leurresNum = [numEntre(n, lo + 1, n, s.p), numEntre(n, 0, lo, s.p), numEntre(n, 0, lo - 1, s.p), numK(n, lo, s.p)];
  }
  const num = numEntre(n, lo, hi, s.p);
  if ((num * 1000n) / den < 10n || ((den - num) * 1000n) / den < 10n) return genInterv5();
  const t = pick([
    `Calcule $${cible}$ à la calculatrice ; arrondis au millième.`,
    `Donne une valeur de $${cible}$ arrondie à $10^{-3}$.`,
    `Quelle est la probabilité de l'événement $\\{${cible.slice(2, -1)}\\}$ ? Arrondis au millième.`,
  ]);
  const q = qcm(R3(num, den), leurresNum.map((x) => R3(x, den)), [R3(numEntre(n, lo - 1, hi, s.p), den), R3(numEntre(n, lo - 1, hi + 1, s.p), den), R3(num + den / 50n, den)]);
  const calc = hi === n
    ? `$${cible} = 1 - P(X \\leq ${lo - 1}) \\approx 1 - ${arrL(den - num, den, 4)} \\approx ${arrL(num, den, 3)}$.`
    : `$${cible} = P(X \\leq ${hi}) - P(X \\leq ${lo - 1}) \\approx ${arrL(numEntre(n, 0, hi, s.p), den, 4)} - ${arrL(numEntre(n, 0, lo - 1, s.p), den, 4)} \\approx ${arrL(num, den, 3)}$.`;
  return {
    text: `${s.dit(n)} On note $X$ ${s.X}.\n\n${t}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      `$X \\sim ${loiL(n, s.p)}$ ; on passe par la fonction de répartition $P(X \\leq k)$ (binomFRép / Binomiale FR).`,
      "Bornes ENTIÈRES : la borne basse est comptée, donc on retire $P(X \\leq \\text{borne} - 1)$.",
      calc,
      `$${cible} \\approx ${arrL(num, den, 3)}$.`,
    ),
  };
}

loiBinomialeBank.push(
  gab("terminale_spe_binom_interv_gen_3", "binomiale_intervalle", 3, "$P(X \\geq 1) = 1 - P(X = 0) = 1 - (1-p)^n$.", ["intervalle", "au_moins_un"], genInterv3),
  gab("terminale_spe_binom_interv_gen_4", "binomiale_intervalle", 4, "$X$ entière : $X < k \\iff X \\leq k - 1$ ; contraire : $1 - P$.", ["intervalle", "repartition"], genInterv4),
  gab("terminale_spe_binom_interv_gen_5", "binomiale_intervalle", 5, "$P(a \\leq X \\leq b) = P(X \\leq b) - P(X \\leq a - 1)$.", ["intervalle", "calculatrice"], genInterv5),
);
/* =========================================================================
   BINOMIALE_DEFI — les questions « type bac ».
========================================================================= */

/** Les seuils usuels, en millièmes. */
const SEUILS: [number, string][] = [[900, "0,9"], [950, "0,95"], [990, "0,99"], [999, "0,999"]];

/** ★4 : le plus petit n tel que P(X ≥ 1) ≥ seuil (exact : (1 − p)^n ≤ 1 − seuil). */
function genDefi4(): Q {
  let s = sit();
  while (s.p.a * 100 < 3 * s.p.b) s = sit(); // p ≥ 0,03 : n raisonnable
  const [m, sl] = pick(SEUILS);
  const a = B(s.p.a), b = B(s.p.b), c = b - a;
  let n = 1;
  // (c/b)^n ≤ (1000 − m)/1000  ⇔  1000·c^n ≤ (1000 − m)·b^n
  while (n < 1000 && 1000n * c ** B(n) > B(1000 - m) * b ** B(n)) n++;
  const lnRatio = Math.log(1 - m / 1000) / Math.log((s.p.b - s.p.a) / s.p.b);
  const t = pick([
    `Combien d'épreuves faut-il au minimum pour que la probabilité d'au moins un succès (« ${s.succes} ») soit supérieure ou égale à $${L(sl)}$ ?`,
    `Déterminer le plus petit entier $n$ tel que $P(X \\geq 1) \\geq ${L(sl)}$.`,
    `À partir de combien de répétitions la probabilité que l'événement « ${s.succes} » se réalise au moins une fois atteint-elle $${L(sl)}$ ?`,
  ]);
  return {
    text: `${s.dit("$n$")} On note $X$ ${s.X}, donc $X \\sim \\mathcal{B}(n\\,;${pL(s.p)})$.\n\n${t}`,
    format: "short",
    expected: [String(n)],
    comparator: "number_equal",
    explanation: ex(
      "$P(X \\geq 1) = 1 - (1-p)^n$ ; on résout une inéquation d'inconnue $n$ (entier).",
      `$1 - ${pw(qL(s.p))}^n \\geq ${L(sl)} \\iff ${pw(qL(s.p))}^n \\leq ${L(arr(B(1000 - m), 1000n, 3).replace(/0+$/, ""))} \\iff n \\geq \\dfrac{\\ln(${L(arr(B(1000 - m), 1000n, 3).replace(/0+$/, ""))})}{\\ln(${qL(s.p)})}$ (on divise par $\\ln(${qL(s.p)}) < 0$ : le sens change).`,
      `$\\dfrac{\\ln(${L(arr(B(1000 - m), 1000n, 3).replace(/0+$/, ""))})}{\\ln(${qL(s.p)})} \\approx ${L(lnRatio.toFixed(Math.abs(lnRatio - Math.round(lnRatio)) < 0.005 ? 5 : 2).replace(".", ","))}$, donc le plus petit entier est $${n}$ (vérification : $${pw(qL(s.p))}^{${n}} \\approx ${arrL(c ** B(n), b ** B(n), 4)}$).`,
      `Il faut au minimum $n = ${n}$ épreuves.`,
    ),
  };
}
/** ★5 : gain moyen d'un jeu, seuil k de la fonction de répartition, ou « au moins 2 ». */
function genDefi5(): Q {
  const r = Math.random();
  if (r < 0.35) {
    // Jeu : mise m € par partie, gain g € par succès. G = gX − nm, E(G) = n(gp − m).
    const jeu = pick([
      { nom: "à la roue de la kermesse", essai: "un tour", succes: "tomber sur un secteur gagnant" },
      { nom: "au jeu de fléchettes de la fête de l'école", essai: "une fléchette", succes: "toucher le centre" },
      { nom: "au chamboule-tout de la kermesse", essai: "une balle", succes: "faire tomber toutes les boîtes" },
      { nom: "au stand de tir à la carabine de la foire de Saint-Pierre", essai: "un tir", succes: "toucher le ballon" },
      { nom: "au lancer de palets du club", essai: "un palet", succes: "faire entrer le palet dans le trou" },
      { nom: "à la pêche aux canards", essai: "une pêche", succes: "attraper un canard gagnant" },
    ]);
    const p = pick([{ a: 1, b: 4 }, { a: 1, b: 5 }, { a: 1, b: 10 }, { a: 3, b: 10 }, { a: 2, b: 5 }, { a: 1, b: 2 }]);
    const n = pick([10, 20, 30, 40, 50]);
    const m = pick([1, 2, 3]);
    const g = ri(2, 12);
    const EG = decExact(n * (g * p.a - m * p.b), p.b)!;
    const P = pL(p);
    return {
      text: `${maj(jeu.nom)}, chaque partie (${jeu.essai}) coûte $${m}$ € ; on gagne $${g}$ € si l'on réussit à ${jeu.succes}, ce qui arrive avec la probabilité $${P}$. ${pick(PRENOMS).nom} joue $${n}$ parties indépendantes. On note $X$ le nombre de parties réussies et $G = ${g}X - ${n * m}$ le gain algébrique (en €).\n\n${pick(["Calcule l'espérance $E(G)$.", "Quel est le gain moyen $E(G)$ ? (négatif si l'on perd en moyenne)", "Que vaut $E(G)$, en euros ?"])}`,
      format: "short",
      expected: ecr(EG),
      comparator: "number_equal",
      explanation: ex(
        `$X \\sim ${loiL(n, p)}$ et l'espérance est linéaire : $E(aX + b) = aE(X) + b$.`,
        `$E(X) = np$, puis $E(G) = ${g}\\,E(X) - ${n * m}$.`,
        `$E(X) = ${n} \\times ${P} = ${ratL(n * p.a, p.b)}$ ; $E(G) = ${g} \\times ${ratL(n * p.a, p.b)} - ${n * m} = ${L(EG)}$.`,
        `$E(G) = ${L(EG)}$ € : ${Number(EG.replace(",", ".")) < 0 ? "le jeu est en moyenne perdant pour le joueur" : Number(EG.replace(",", ".")) > 0 ? "le jeu est en moyenne gagnant pour le joueur" : "le jeu est équitable"}.`,
      ),
    };
  }
  const s = sit();
  const n = ri(10, 50);
  const den = denN(n, s.p);
  if (r < 0.7) {
    // Le plus petit k tel que P(X ≤ k) ≥ seuil.
    const [m, sl] = pick(SEUILS.slice(0, 3));
    let k = 0;
    while (k < n && numEntre(n, 0, k, s.p) * 1000n < B(m) * den) k++;
    if (k === 0 || k === n) return genDefi5();
    // L'explication affiche P(X ≤ k − 1) à 10⁻⁴ : il doit se lire SOUS le seuil.
    const avant = numEntre(n, 0, k - 1, s.p);
    if ((2n * avant * 10000n + den) / (2n * den) >= B(m * 10)) return genDefi5();
    const t = pick([
      `Déterminer le plus petit entier $k$ tel que $P(X \\leq k) \\geq ${L(sl)}$.`,
      `Quel est le plus petit nombre $k$ tel que la probabilité d'avoir au plus $k$ succès soit d'au moins $${L(sl)}$ ?`,
    ]);
    return {
      text: `${s.dit(n)} On note $X$ ${s.X}.\n\n${t}`,
      format: "short",
      expected: [String(k)],
      comparator: "number_equal",
      explanation: ex(
        `$X \\sim ${loiL(n, s.p)}$ ; $k \\mapsto P(X \\leq k)$ est croissante.`,
        "À la calculatrice, on fait défiler la table de la fonction de répartition jusqu'à dépasser le seuil.",
        `$P(X \\leq ${k - 1}) \\approx ${arrL(numEntre(n, 0, k - 1, s.p), den, 4)} < ${L(sl)}$ et $P(X \\leq ${k}) \\approx ${arrL(numEntre(n, 0, k, s.p), den, 4)} \\geq ${L(sl)}$.`,
        `Le plus petit entier est $k = ${k}$.`,
      ),
    };
  }
  // Au moins 2 succès.
  const n2 = ri(5, 25);
  const d2 = denN(n2, s.p);
  const p0 = numK(n2, 0, s.p), p1 = numK(n2, 1, s.p);
  const num = d2 - p0 - p1;
  if ((num * 1000n) / d2 < 10n || ((d2 - num) * 1000n) / d2 < 10n) return genDefi5();
  const q = qcm(R3(num, d2), [R3(d2 - p0, d2), R3(d2 - p1, d2), R3(d2 - p0 - p1 - numK(n2, 2, s.p), d2)], [R3(p0 + p1, d2), R3(numK(n2, 2, s.p), d2)]);
  return {
    text: `${s.dit(n2)} On note $X$ ${s.X}.\n\n${pick([`Quelle est la probabilité d'obtenir au moins deux succès (« ${s.succes} ») ? Arrondis au millième.`, "Calcule $P(X \\geq 2)$, arrondie au millième."])}`,
    format: "qcm",
    ...q,
    comparator: "mcq_exact",
    explanation: ex(
      "« Au moins 2 » est le contraire de « 0 ou 1 » : $P(X \\geq 2) = 1 - P(X = 0) - P(X = 1)$.",
      `$P(X = 0) = ${pw(qL(s.p))}^{${n2}}$ et $P(X = 1) = ${n2} \\times ${pL(s.p)} \\times ${pw(qL(s.p))}^{${n2 - 1}}$.`,
      `$P(X \\geq 2) \\approx 1 - ${arrL(p0, d2, 4)} - ${arrL(p1, d2, 4)} \\approx ${arrL(num, d2, 3)}$.`,
      `$P(X \\geq 2) \\approx ${arrL(num, d2, 3)}$.`,
    ),
  };
}

loiBinomialeBank.push(
  gab("terminale_spe_binom_defi_gen_4", "binomiale_defi", 4, "$P(X \\geq 1) = 1 - (1-p)^n$, puis on passe au logarithme.", ["type_bac", "seuil"], genDefi4),
  gab("terminale_spe_binom_defi_gen_5", "binomiale_defi", 5, "Linéarité de l'espérance, fonction de répartition, événement contraire.", ["type_bac"], genDefi5),
);
