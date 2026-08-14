// lib/tutor-v4/questionBank/premiere/maths/bernoulli.bank.ts
//
// Notions : alea_bernoulli et alea_bernoulli_calcul (domaine BOP1AL)
//
// Capacité attendue, mot pour mot : « Représenter par un arbre de probabilités
// la répétition de $n$ épreuves aléatoires identiques et indépendantes de
// Bernoulli avec $n \leqslant 4$ afin de calculer des probabilités. »
//
// ⛔ Le n ⩽ 4 est une borne du programme, pas une commodité : aucun item ne va
// au-delà. Et la loi binomiale n'est PAS au programme — on ne parle jamais de
// coefficients binomiaux, on compte les chemins sur l'arbre.
//
// Le programme insiste sur la simulation « avec remise dans une urne » : c'est
// la remise qui garantit l'indépendance, et c'est elle qu'on interroge.

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
  const arrondi = Math.round(n * 1000000) / 1000000;
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

/** L'arbre d'une répétition de n épreuves identiques (n ⩽ 4, borne du BO). */
function canvasRepetition(p: number, n: number, titre: string): CanvasFigure {
  const q = 1 - p;
  const noeud = (profondeur: number): { label: string; proba: string; enfants?: any[] }[] => {
    if (profondeur > n) return [];
    const enfants = profondeur < n ? noeud(profondeur + 1) : undefined;
    return [
      { label: "S", proba: fr(p), ...(enfants ? { enfants } : {}) },
      { label: "S̄", proba: fr(q), ...(enfants ? { enfants } : {}) },
    ];
  };
  return {
    kind: "arbre_proba",
    titre,
    racineEnfants: noeud(1),
  };
}

// Des situations concrètes, et des probabilités variées : un élève ne doit pas
// pouvoir reconnaître la réponse à l'énoncé. Toutes les valeurs ci-dessous
// gardent des produits calculables de tête jusqu'à la puissance 3 —
// 0,3² = 0,09 ; 0,4³ = 0,064 ; 0,8² = 0,64.
const PROBAS = [0.1, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.8] as const;

// Pour les items qui font MULTIPLIER trois facteurs, on écarte 0,25 : son
// complémentaire 0,75 donne 0,5625 puis 0,421875, exact mais impossible de tête.
const PROBAS_RONDES = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8] as const;

const CONTEXTES = [
  {
    // L'exemple dont Frédéric se sert en classe, et qui parle ici : les
    // conteneurs contrôlés à l'arrivée au port.
    intro:
      "À l'arrivée au port, on contrôle les conteneurs un par un. Chaque conteneur peut présenter un défaut, indépendamment des autres.",
    succes: "trouver un conteneur défectueux",
    unite: "conteneur",
    action: "On contrôle",
  },
  {
    intro: "On tire une boule dans une urne, on note sa couleur, puis on la REMET dans l'urne.",
    succes: "tirer une boule rouge",
    unite: "tirage",
    action: "On répète le tirage",
  },
  {
    // Le contrôle qualité sur chaîne : prélèvement au hasard dans un lot très
    // grand, ce qui rend les prélèvements indépendants en pratique.
    intro:
      "Sur une chaîne agroalimentaire, on prélève au hasard des pots pour vérifier leur poids. Le lot est assez grand pour que les prélèvements soient indépendants.",
    succes: "prélever un pot non conforme",
    unite: "pot",
    action: "On prélève",
  },
  {
    intro: "Une usine contrôle ses pièces une par une, indépendamment les unes des autres.",
    succes: "tomber sur une pièce défectueuse",
    unite: "contrôle",
    action: "On contrôle",
  },
  {
    intro: "Un joueur de basket tire des lancers francs ; ses tirs sont indépendants.",
    succes: "marquer un lancer franc",
    unite: "lancer",
    action: "Il tire",
  },
  {
    intro: "Un élève répond au hasard aux questions d'un QCM, chaque question étant indépendante.",
    succes: "tomber sur la bonne réponse",
    unite: "question",
    action: "Il répond à",
  },
  {
    intro: "Un site propose chaque jour un code promotionnel, indépendamment des jours précédents.",
    succes: "obtenir un code gagnant",
    unite: "jour",
    action: "On se connecte pendant",
  },
  {
    intro: "Un capteur météo peut tomber en panne un jour donné, indépendamment des autres jours.",
    succes: "constater une panne",
    unite: "jour",
    action: "On observe le capteur pendant",
  },
] as const;

export const bernoulliBank: TutorBankItemV4[] = [
  /* ═══════════════ alea_bern_epreuve ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_bern_epreuve_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli",
    microId: "alea_bern_epreuve",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qu'une épreuve de Bernoulli ?",
    format: "qcm",
    choices: [
      "Une expérience aléatoire à deux issues seulement : succès ou échec",
      "Une expérience répétée un grand nombre de fois",
      "Une expérience dont toutes les issues sont équiprobables",
      "Une expérience à quatre issues au maximum",
    ],
    expected: ["Une expérience aléatoire à deux issues seulement : succès ou échec"],
    comparator: "mcq_exact",
    hint: "Le mot clé est « deux issues ».",
    explanation: exp(
      "Une épreuve de Bernoulli est une expérience aléatoire n'ayant que DEUX issues, qu'on appelle conventionnellement succès et échec.",
      "On vérifie qu'il n'y a bien que deux résultats possibles.",
      "Lancer une pièce : pile ou face, deux issues. Lancer un dé et regarder la face : six issues, ce n'est pas une épreuve de Bernoulli — mais « obtenir un six ou non » en est une.",
      "C'est une expérience à deux issues. Les issues n'ont AUCUN besoin d'être équiprobables : une pièce truquée convient parfaitement."
    ),
    choiceDiagnostics: [
      {
        choice: "Une expérience dont toutes les issues sont équiprobables",
        cause: "l'équiprobabilité n'est pas exigée : un succès peut avoir une probabilité de 0,1",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "bernoulli"],
  },

  {
    kind: "template",
    id: "premiere_bern_epreuve_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli",
    microId: "alea_bern_epreuve",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux issues seulement : c'est le seul critère.",
    tags: ["premiere", "maths", "probabilites", "bernoulli", "template"],
    generate: () => {
      const bernoulli = Math.random() < 0.5;
      return {
        text: bernoulli
          ? "On lance un dé à six faces et l'on s'intéresse à l'évènement « obtenir un six ». S'agit-il d'une épreuve de Bernoulli ?"
          : "On lance un dé à six faces et l'on note le numéro obtenu. S'agit-il d'une épreuve de Bernoulli ?",
        format: "qcm",
        choices: makeChoices(
          bernoulli ? "Oui, il n'y a que deux issues : six ou pas six" : "Non, il y a six issues",
          [
            bernoulli ? "Non, il y a six issues" : "Oui, il n'y a que deux issues",
            "Oui, car le dé est équilibré",
            "Non, car les issues ne sont pas équiprobables",
          ]
        ),
        expected: [
          bernoulli ? "Oui, il n'y a que deux issues : six ou pas six" : "Non, il y a six issues",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Une épreuve de Bernoulli n'a que deux issues. Ce qui compte n'est pas l'expérience elle-même, mais l'ÉVÈNEMENT auquel on s'intéresse.",
          "On compte les issues de ce qu'on observe.",
          bernoulli
            ? "« Obtenir un six » ne laisse que deux possibilités : c'est arrivé, ou non. La probabilité du succès vaut $\\frac{1}{6}$."
            : "Noter le numéro obtenu laisse six résultats possibles : ce n'est pas une épreuve de Bernoulli.",
          bernoulli
            ? "C'est une épreuve de Bernoulli, de probabilité de succès $\\frac{1}{6}$. Le même lancer de dé peut en être une ou non — tout dépend de ce qu'on regarde."
            : "Ce n'en est pas une. Mais si l'on s'intéressait à « obtenir un six », ce serait le cas."
        ),
      };
    },
  },

  /* ═══════════════ alea_bern_repetition ═══════════════ */

  {
    kind: "template",
    id: "premiere_bern_repetition_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli",
    microId: "alea_bern_repetition",
    difficulty: 3,
    theme: "neutral",
    hint: "Identiques : la probabilité de succès ne change pas. Indépendantes : un résultat n'influence pas le suivant.",
    tags: ["premiere", "maths", "probabilites", "bernoulli", "template"],
    generate: () => {
      const ctx = pick(CONTEXTES);
      const n = pick([2, 3, 4] as const);
      return {
        text:
          `${ctx.intro} On répète l'expérience $${n}$ fois. ` +
          `Pourquoi peut-on parler de répétition d'épreuves identiques et indépendantes ?`,
        format: "qcm",
        choices: makeChoices(
          "Parce que la probabilité de succès reste la même et qu'un résultat n'influence pas les suivants",
          [
            "Parce que l'expérience est répétée plus de deux fois",
            "Parce que toutes les issues sont équiprobables",
            "Parce que le nombre de répétitions est inférieur à cinq",
          ]
        ),
        expected: [
          "Parce que la probabilité de succès reste la même et qu'un résultat n'influence pas les suivants",
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Une répétition d'épreuves de Bernoulli suppose deux choses : les épreuves sont IDENTIQUES (même probabilité de succès à chaque fois) et INDÉPENDANTES (un résultat ne modifie pas les probabilités des suivants).",
          "On vérifie les deux conditions dans l'énoncé.",
          `${ctx.intro} La situation garantit que rien ne change d'une épreuve à l'autre.`,
          "Les deux conditions sont réunies. Le nombre de répétitions, lui, ne joue aucun rôle dans cette définition — il limite seulement la taille de l'arbre."
        ),
      };
    },
  },

  /* ═══════════════ alea_bern_avec_sans_remise ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_bern_remise_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli",
    microId: "alea_bern_avec_sans_remise",
    difficulty: 4,
    theme: "neutral",
    text:
      "Une urne contient $3$ boules rouges et $7$ boules noires. On tire deux boules SANS remise. " +
      "S'agit-il d'une répétition d'épreuves identiques et indépendantes ?",
    format: "qcm",
    choices: [
      "Non : après le premier tirage, la composition de l'urne a changé",
      "Oui, car il n'y a que deux couleurs",
      "Oui, car les tirages se suivent",
      "Non, car les boules ne sont pas en nombre égal",
    ],
    expected: ["Non : après le premier tirage, la composition de l'urne a changé"],
    comparator: "mcq_exact",
    hint: "Que vaut la probabilité de tirer une rouge au second tirage ? Dépend-elle du premier ?",
    explanation: exp(
      "L'indépendance exige que la probabilité de succès soit la même à chaque épreuve, quoi qu'il se soit produit avant.",
      "On compare la probabilité du second tirage selon le résultat du premier.",
      "Au premier tirage, $P(\\text{rouge}) = \\frac{3}{10}$. Au second, elle vaut $\\frac{2}{9}$ si la première était rouge, et $\\frac{3}{9}$ sinon. Les deux diffèrent.",
      "Ce n'est PAS une répétition d'épreuves indépendantes. C'est la remise qui l'assure — d'où l'insistance du programme sur les « tirages avec remise dans une urne »."
    ),
    choiceDiagnostics: [
      {
        choice: "Oui, car il n'y a que deux couleurs",
        cause: "deux issues font une épreuve de Bernoulli, mais ne garantissent pas l'indépendance des répétitions",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "bernoulli", "piege"],
  },

  /* ═══════════════ alea_bern_arbre ═══════════════ */

  {
    kind: "template",
    id: "premiere_bern_arbre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli_calcul",
    microId: "alea_bern_arbre",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque épreuve double le nombre de chemins.",
    tags: ["premiere", "maths", "probabilites", "bernoulli", "arbre", "template", "short"],
    generate: () => {
      const n = pick([2, 3, 4] as const);
      const p = pick(PROBAS);
      const ctx = pick(CONTEXTES);
      return {
        text:
          `${ctx.intro} ${ctx.action} $${n}$ ${ctx.unite}s de suite, ` +
          `comme sur l'arbre ci-contre. Combien de chemins l'arbre comporte-t-il au total ?`,
        format: "short",
        expected: [String(2 ** n)],
        comparator: "number_equal",
        canvas: canvasRepetition(p, n, `Répétition de ${n} épreuves`),
        explanation: exp(
          "À chaque épreuve, l'arbre se divise en deux branches : succès ou échec.",
          "On multiplie par $2$ à chaque niveau.",
          `Pour $${n}$ épreuves : $2^{${n}} = ${2 ** n}$ chemins.`,
          `L'arbre comporte $${2 ** n}$ chemins. C'est pourquoi le programme s'arrête à $n \\leqslant 4$ : au-delà, l'arbre devient illisible.`
        ),
      };
    },
  },

  /* ═══════════════ alea_bern_calculer ═══════════════ */

  {
    kind: "template",
    id: "premiere_bern_calculer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli_calcul",
    microId: "alea_bern_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Un seul chemin mène à « que des succès » : on multiplie les probabilités le long de ce chemin.",
    tags: ["premiere", "maths", "probabilites", "bernoulli", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick(PROBAS_RONDES);
      const ctx = pick(CONTEXTES);
      return {
        text:
          `${ctx.intro} La probabilité de « ${ctx.succes} » vaut $${fr(p)}$ à chaque fois. ` +
          `${ctx.action} $${n}$ ${ctx.unite}s. ` +
          `Quelle est la probabilité que les $${n}$ soient des succès ?`,
        format: "short",
        expected: [fr(p ** n)],
        comparator: "number_equal",
        canvas: canvasRepetition(p, n, `Répétition de ${n} épreuves`),
        explanation: exp(
          "La probabilité d'un chemin est le produit des probabilités portées par ses branches.",
          "« Que des succès » ne correspond qu'à un seul chemin : celui qui prend la branche succès à chaque niveau.",
          `$${Array(n).fill(fr(p)).join(" \\times ")} = ${fr(p ** n)}$.`,
          `La probabilité vaut $${fr(p ** n)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_bern_calculer_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli_calcul",
    microId: "alea_bern_calculer",
    difficulty: 5,
    theme: "neutral",
    hint: "Plusieurs chemins mènent à « exactement un succès » : on les compte, puis on additionne.",
    tags: ["premiere", "maths", "probabilites", "bernoulli", "template", "short"],
    generate: () => {
      const p = pick(PROBAS_RONDES);
      const q = 1 - p;
      const n = 3;
      const ctx = pick(CONTEXTES);
      // Trois chemins : SÉÉ, ÉSÉ, ÉÉS, tous de probabilité p·q².
      const valeur = 3 * p * q * q;
      return {
        text:
          `${ctx.intro} La probabilité de « ${ctx.succes} » vaut $${fr(p)}$. ` +
          `${ctx.action} $3$ ${ctx.unite}s. ` +
          `Quelle est la probabilité d'obtenir EXACTEMENT un succès ?`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000000) / 1000000)],
        comparator: "number_equal",
        canvas: canvasRepetition(p, n, "Répétition de 3 épreuves"),
        explanation: exp(
          "La probabilité d'un évènement atteint par plusieurs chemins est la SOMME des probabilités de ces chemins.",
          "On repère tous les chemins comportant exactement un succès, puis on additionne.",
          `Trois chemins conviennent : succès au premier, au deuxième, ou au troisième. ` +
            `Chacun vaut $${fr(p)} \\times ${fr(q)} \\times ${fr(q)} = ${fr(p * q * q)}$. ` +
            `Total : $3 \\times ${fr(p * q * q)} = ${fr(Math.round(valeur * 1000000) / 1000000)}$.`,
          `La probabilité vaut $${fr(Math.round(valeur * 1000000) / 1000000)}$. ` +
            `On COMPTE les chemins sur l'arbre : la loi binomiale n'est pas au programme.`
        ),
      };
    },
  },

  /* ═══════════════ alea_bern_au_moins_un ═══════════════ */

  {
    kind: "template",
    id: "premiere_bern_au_moins_un_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_bernoulli_calcul",
    microId: "alea_bern_au_moins_un",
    difficulty: 5,
    theme: "neutral",
    hint: "Le contraire de « au moins un succès » est « aucun succès » — un seul chemin.",
    tags: ["premiere", "maths", "probabilites", "bernoulli", "template", "short"],
    generate: () => {
      const n = pick([2, 3] as const);
      const p = pick(PROBAS_RONDES);
      const q = 1 - p;
      const ctx = pick(CONTEXTES);
      const valeur = 1 - q ** n;
      return {
        text:
          `${ctx.intro} La probabilité de « ${ctx.succes} » vaut $${fr(p)}$. ` +
          `${ctx.action} $${n}$ ${ctx.unite}s. ` +
          `Quelle est la probabilité d'obtenir AU MOINS un succès ?`,
        format: "short",
        expected: [fr(Math.round(valeur * 1000000) / 1000000)],
        comparator: "number_equal",
        canvas: canvasRepetition(p, n, `Répétition de ${n} épreuves`),
        explanation: exp(
          "« Au moins un succès » est l'évènement contraire de « aucun succès ».",
          "Plutôt que d'additionner tous les chemins comportant au moins un succès, on calcule celui qui n'en comporte aucun et on le retire à $1$.",
          `« Aucun succès » : $${Array(n).fill(fr(q)).join(" \\times ")} = ${fr(q ** n)}$. ` +
            `Donc « au moins un » vaut $1 - ${fr(q ** n)} = ${fr(Math.round(valeur * 1000000) / 1000000)}$.`,
          `La probabilité vaut $${fr(Math.round(valeur * 1000000) / 1000000)}$. ` +
            `Passer par l'évènement contraire évite d'additionner ${2 ** n - 1} chemins.`
        ),
      };
    },
  },
];
