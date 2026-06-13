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
    hint: "Coefficient binomial × proba de succès^k × proba d'échec^(n-k).",
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
    generate: () => {
      // X ~ B(n, 0,1) : P(X=0) = 0,9^n
      const n = randomInt(1, 3);
      const valeurs = ["0,9", "0,81", "0,729"]; // 0,9^1, ^2, ^3
      const rep = `$${valeurs[n - 1]}$`;
      const distracteurs = ["$0{,}1$", "$0{,}01$", "$0{,}5$"];
      return {
        text: `Soit $X \\sim \\mathcal{B}(${n}\\,;0{,}1)$. Que vaut $P(X = 0)$ ?`,
        format: "qcm",
        choices: [rep, ...distracteurs].sort(() => Math.random() - 0.5),
        expected: [rep],
        comparator: "mcq_exact",
        explanation: exp(
          "Aucun succès signifie $n$ échecs successifs.",
          `$P(X=0) = (1 - 0{,}1)^{${n}} = 0{,}9^{${n}}$.`,
          `$0{,}9^{${n}} = ${valeurs[n - 1]}$.`,
          `$P(X = 0) = ${valeurs[n - 1]}$.`
        ),
      };
    },
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
    hint: "$E(X) = np$, ici $p = 0{,}5$.",
    tags: ["terminale-spe", "binomiale", "esperance", "template"],
    generate: () => {
      const half = randomInt(2, 6); // n = 2*half pair, E = np = half
      const n = 2 * half;
      return {
        text: `Soit $X \\sim \\mathcal{B}(${n}\\,;0{,}5)$. Que vaut $E(X)$ ?`,
        format: "short",
        expected: [String(half)],
        comparator: "number_equal",
        explanation: exp(
          "On applique $E(X) = np$.",
          `$E(X) = ${n} \\times 0{,}5$.`,
          `$E(X) = ${half}$.`,
          `$E(X) = ${half}$.`
        ),
      };
    },
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
