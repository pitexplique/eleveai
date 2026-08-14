// lib/tutor-v4/questionBank/premiere/maths/probabilites-conditionnelles.bank.ts
//
// Notions : alea_conditionnelle, alea_conditionnelle_calcul, alea_independance
//           (domaine BOP1AL — Phénomènes aléatoires)
//
// L'exercice 1 des six sujets de juin 2026, sans exception : un tableau croisé
// d'effectifs, des probabilités conditionnelles, et la question finale
// « ces évènements sont-ils indépendants ? ».
//   - 120 sportifs de haut niveau, judo ou natation, par niveau de classe
//     (Métropole) ;
//   - 1 000 clients d'une compagnie aérienne, satisfaits ou non, ayant acheté
//     en agence ou sur internet (Centres étrangers) ;
//   - 1 000 lycéens favorables ou défavorables à un projet (Asie).
//
// Les effectifs sont générés pour que les fractions tombent juste. La réponse
// est acceptée sous plusieurs écritures — la fraction brute lue dans le
// tableau, la fraction simplifiée, et le décimal quand il est fini : un élève
// qui répond $\frac{40}{120}$ a compris autant que celui qui répond
// $\frac{1}{3}$, et les sujets demandent d'ailleurs « sous forme de fraction ».

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

function pgcd(a: number, b: number): number {
  return b === 0 ? Math.abs(a) : pgcd(b, a % b);
}

// Toutes les écritures acceptables d'une probabilité num/den : la fraction lue
// dans le tableau, la fraction simplifiée, et le décimal s'il est fini.
function reponsesProba(num: number, den: number): string[] {
  const d = pgcd(num, den);
  const formes = new Set<string>([`${num}/${den}`, `${num / d}/${den / d}`]);
  const valeur = num / den;
  if (Number.isFinite(valeur) && String(valeur).length <= 8) formes.add(fr(valeur));
  return [...formes];
}

function fraction(num: number, den: number): string {
  return `$\\dfrac{${num}}{${den}}$`;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/* ── Situations à deux caractères, telles qu'elles tombent aux sujets ── */

type Situation = {
  intro: string;
  /** Caractère en ligne : « pratique le judo ». */
  ligneNom: string;
  ligneA: string;
  ligneB: string;
  /** Caractère en colonne : « est en seconde ». */
  colonneA: string;
  colonneB: string;
  individu: string;
};

const SITUATIONS: readonly Situation[] = [
  {
    intro: "Dans un lycée, on interroge les élèves inscrits à une section sportive.",
    ligneNom: "section",
    ligneA: "judo",
    ligneB: "natation",
    colonneA: "en seconde",
    colonneB: "en terminale",
    individu: "élève",
  },
  {
    intro: "Une compagnie aérienne interroge ses clients après leur voyage.",
    ligneNom: "achat",
    ligneA: "sur internet",
    ligneB: "en agence",
    colonneA: "satisfait",
    colonneB: "non satisfait",
    individu: "client",
  },
  {
    intro: "Un lycée soumet un projet au vote de ses élèves.",
    ligneNom: "niveau",
    ligneA: "en première",
    ligneB: "en terminale",
    colonneA: "favorable",
    colonneB: "défavorable",
    individu: "élève",
  },
] as const;

// Un tableau croisé dont toutes les cases sont des entiers ronds.
//
// ⚠️ b ≠ c est imposé : sinon le total de la ligne ($a + b$) et celui de la
// colonne ($a + c$) tombent égaux, et les questions qui demandent de choisir
// entre les deux dénominateurs perdent leur sens — deux propositions du QCM
// deviennent identiques et l'élève ne voit plus que trois lignes.
function tableau() {
  const s = pick(SITUATIONS);
  const a = pick([40, 60, 80, 120, 150, 180] as const); // ligneA ∩ colonneA
  const b = pick([20, 40, 60, 90, 120] as const); // ligneA ∩ colonneB
  const c = pick(([30, 50, 60, 100, 150] as const).filter((x) => x !== b)); // ligneB ∩ colonneA
  const d = pick([10, 30, 50, 80, 100] as const); // ligneB ∩ colonneB
  return {
    s,
    a,
    b,
    c,
    d,
    ligne1: a + b,
    ligne2: c + d,
    col1: a + c,
    col2: b + d,
    total: a + b + c + d,
  };
}

// L'énoncé pose la situation ; les effectifs, eux, sont LUS dans le tableau
// croisé dessiné à côté. C'est ainsi que la question tombe à l'épreuve — et
// lire un tableau à double entrée fait partie de ce qu'on évalue.
function enonceTableau(t: ReturnType<typeof tableau>): string {
  return `${t.s.intro} On choisit un ${t.s.individu} au hasard parmi les $${t.total}$ interrogés.`;
}

function canvasTableau(t: ReturnType<typeof tableau>): CanvasFigure {
  const { s } = t;
  const majuscule = (x: string) => x.charAt(0).toUpperCase() + x.slice(1);
  return {
    kind: "tableau_donnees",
    title: `Répartition des ${s.individu}s`,
    headers: ["", majuscule(s.colonneA), majuscule(s.colonneB), "Total"],
    rows: [
      { label: majuscule(s.ligneA), values: [t.a, t.b, t.ligne1] },
      { label: majuscule(s.ligneB), values: [t.c, t.d, t.ligne2] },
      { label: "Total", values: [t.col1, t.col2, t.total] },
    ],
  };
}

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  /* ═══════════════ alea_cond_reconnaitre ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_reconnaitre_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un énoncé, quel mot signale presque toujours une probabilité conditionnelle ?",
    format: "qcm",
    choices: ["« parmi »", "« et »", "« ou »", "« au hasard »"],
    expected: ["« parmi »"],
    comparator: "mcq_exact",
    hint: "Cherche le mot qui réduit la population étudiée.",
    explanation: exp(
      "Une probabilité conditionnelle se calcule dans une population RÉDUITE à ceux qui vérifient déjà une condition.",
      "« Parmi les élèves de seconde… » ou « sachant qu'il est en seconde » restreignent la population : on ne divise plus par le total.",
      "« Et » signale au contraire une intersection, calculée sur la population entière.",
      "« Parmi » (ou « sachant que ») annonce une conditionnelle."
    ),
    tags: ["premiere", "maths", "probabilites", "conditionnelle"],
  },

  {
    kind: "template",
    id: "premiere_alea_reconnaitre_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi sur quelle population on divise : le total, ou une partie seulement ?",
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} On s'intéresse à la phrase : ` +
          `« parmi les ${s.individu}s ${s.ligneA}, quelle est la proportion de ${s.individu}s ${s.colonneA} ? ». ` +
          `Par quel nombre faut-il diviser ?`,
        format: "qcm",
        choices: makeChoices(`$${t.ligne1}$`, [`$${t.total}$`, `$${t.col1}$`, `$${t.a}$`]),
        expected: [`$${t.ligne1}$`],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Une probabilité conditionnelle se calcule dans la population réduite par la condition.",
          `Le mot « parmi » restreint l'étude aux ${s.individu}s ${s.ligneA}.`,
          `Ils sont $${t.a} + ${t.b} = ${t.ligne1}$ : c'est par ce nombre qu'on divise, et non par le total $${t.total}$.`,
          `On divise par $${t.ligne1}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${t.total}$`,
            cause: "a divisé par l'effectif total : c'est ce qu'on ferait pour une probabilité simple, pas conditionnelle",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_cond_notation ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_notation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_notation",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans $P_A(B)$, la lettre en indice est la CONDITION, celle qu'on sait déjà vraie.",
    tags: ["premiere", "maths", "probabilites", "notation", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `On note $A$ l'évènement « le ${s.individu} est ${s.ligneA} » et ` +
          `$B$ l'évènement « le ${s.individu} est ${s.colonneA} ». ` +
          `Comment s'écrit « la probabilité que le ${s.individu} soit ${s.colonneA}, sachant qu'il est ${s.ligneA} » ?`,
        format: "qcm",
        choices: makeChoices("$P_A(B)$", ["$P_B(A)$", "$P(A \\cap B)$", "$P(A) \\times P(B)$"]),
        expected: ["$P_A(B)$"],
        comparator: "mcq_exact",
        explanation: exp(
          "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ » : l'indice porte la condition.",
          "On repère ce qui est SU (après « sachant que ») et ce qui est CHERCHÉ.",
          `Su : ${s.ligneA}, c'est $A$ — donc en indice. Cherché : ${s.colonneA}, c'est $B$ — donc entre parenthèses.`,
          "L'écriture est $P_A(B)$."
        ),
        choiceDiagnostics: [
          {
            choice: "$P_B(A)$",
            cause: "a inversé la condition et l'évènement cherché — ce sont deux probabilités différentes",
          },
          {
            choice: "$P(A \\cap B)$",
            cause: "a écrit l'intersection : elle se calcule sur la population entière, pas sur la population réduite",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_cond_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Numérateur : ceux qui vérifient les deux. Dénominateur : ceux qui vérifient la condition.",
    tags: ["premiere", "maths", "probabilites", "tableau", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} Sachant que le ${s.individu} choisi est ${s.ligneA}, ` +
          `quelle est la probabilité qu'il soit ${s.colonneA} ? (Réponds par une fraction.)`,
        format: "short",
        expected: reponsesProba(t.a, t.ligne1),
        comparator: "fraction_decimal_equivalent",
        canvas: canvasTableau(t),
        explanation: exp(
          "$P_A(B) = \\dfrac{\\text{effectif de } A \\cap B}{\\text{effectif de } A}$.",
          `La condition « ${s.ligneA} » réduit la population à $${t.ligne1}$ ${s.individu}s.`,
          `Parmi eux, $${t.a}$ sont ${s.colonneA} : la probabilité vaut $\\dfrac{${t.a}}{${t.ligne1}}$.`,
          `$P_A(B) = \\dfrac{${t.a}}{${t.ligne1}}$${t.a % t.ligne1 === 0 || pgcd(t.a, t.ligne1) > 1 ? `, soit $\\dfrac{${t.a / pgcd(t.a, t.ligne1)}}{${t.ligne1 / pgcd(t.a, t.ligne1)}}$` : ""}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_alea_tableau_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle",
    microId: "alea_cond_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Une probabilité simple se calcule sur la population entière.",
    tags: ["premiere", "maths", "probabilites", "tableau", "template", "short"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} Quelle est la probabilité que le ${s.individu} choisi soit ${s.colonneA} ? ` +
          `(Réponds par une fraction.)`,
        format: "short",
        expected: reponsesProba(t.col1, t.total),
        comparator: "fraction_decimal_equivalent",
        canvas: canvasTableau(t),
        explanation: exp(
          "Dans une situation d'équiprobabilité, $P(B) = \\dfrac{\\text{effectif de } B}{\\text{effectif total}}$.",
          `On additionne les deux cases de la colonne « ${s.colonneA} ».`,
          `$${t.a} + ${t.c} = ${t.col1}$, donc $P(B) = \\dfrac{${t.col1}}{${t.total}}$.`,
          `$P(B) = \\dfrac{${t.col1}}{${t.total}}$. Ici aucune condition ne restreint la population : on divise bien par le total.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_formule ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_formule_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_formule",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule définit la probabilité conditionnelle $P_A(B)$, avec $P(A) \\neq 0$ ?",
    format: "qcm",
    choices: [
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(B)}$",
      "$P_A(B) = P(A) \\times P(B)$",
      "$P_A(B) = P(A \\cap B) \\times P(A)$",
    ],
    expected: ["$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On divise par la probabilité de ce qu'on SAIT déjà.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ dans la population réduite à $A$.",
      "Au numérateur, ceux qui vérifient les deux ; au dénominateur, la condition.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
      "C'est la même chose qu'un quotient d'effectifs, divisé en haut et en bas par l'effectif total."
    ),
    choiceDiagnostics: [
      {
        choice: "$P_A(B) = \\dfrac{P(A \\cap B)}{P(B)}$",
        cause: "a divisé par l'évènement cherché au lieu de la condition — c'est $P_B(A)$",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "formule"],
  },

  {
    kind: "template",
    id: "premiere_alea_formule_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_formule",
    difficulty: 3,
    theme: "neutral",
    hint: "$P_A(B) = \\frac{P(A \\cap B)}{P(A)}$ : divise l'intersection par la condition.",
    tags: ["premiere", "maths", "probabilites", "conditionnelle", "template", "short"],
    generate: () => {
      const pA = pick([0.2, 0.4, 0.5, 0.8] as const);
      const pInter = pick([0.1, 0.2] as const);
      const valeur = pInter / pA;
      return {
        text:
          `On donne $P(A) = ${fr(pA)}$ et $P(A \\cap B) = ${fr(pInter)}$. ` +
          `Combien vaut $P_A(B)$ ?`,
        format: "short",
        expected: [fr(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$.",
          "On remplace, puis on divise.",
          `$P_A(B) = \\dfrac{${fr(pInter)}}{${fr(pA)}} = ${fr(valeur)}$.`,
          `$P_A(B) = ${fr(valeur)}$.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_intersection ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_intersection_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_intersection",
    difficulty: 3,
    theme: "neutral",
    hint: "La formule se retourne : $P(A \\cap B) = P(A) \\times P_A(B)$.",
    tags: ["premiere", "maths", "probabilites", "intersection", "template", "short"],
    generate: () => {
      const pA = pick([0.2, 0.4, 0.5, 0.6, 0.8] as const);
      const pAB = pick([0.2, 0.25, 0.5] as const);
      const valeur = pA * pAB;
      return {
        text:
          `On sait que $P(A) = ${fr(pA)}$ et $P_A(B) = ${fr(pAB)}$. ` +
          `Combien vaut $P(A \\cap B)$ ?`,
        format: "short",
        expected: [fr(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "En multipliant les deux membres de $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ par $P(A)$, on obtient $P(A \\cap B) = P(A) \\times P_A(B)$.",
          "C'est exactement le calcul d'un chemin dans un arbre pondéré : on multiplie les probabilités rencontrées.",
          `$P(A \\cap B) = ${fr(pA)} \\times ${fr(pAB)} = ${fr(valeur)}$.`,
          `$P(A \\cap B) = ${fr(valeur)}$.`
        ),
      };
    },
  },

  /* ═══════════════ alea_cond_interpreter ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_interpreter_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "La phrase doit dire sur quelle population on compte.",
    tags: ["premiere", "maths", "probabilites", "interpreter", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `On note $A$ « le ${s.individu} est ${s.ligneA} » et $B$ « le ${s.individu} est ${s.colonneA} ». ` +
          `Que signifie $P_A(B)$ ?`,
        format: "qcm",
        choices: makeChoices(
          `la proportion de ${s.individu}s ${s.colonneA} parmi les ${s.individu}s ${s.ligneA}`,
          [
            `la proportion de ${s.individu}s ${s.ligneA} parmi les ${s.individu}s ${s.colonneA}`,
            `la proportion de ${s.individu}s à la fois ${s.ligneA} et ${s.colonneA} parmi tous les ${s.individu}s`,
            `la proportion de ${s.individu}s ${s.ligneA} parmi tous les ${s.individu}s`,
          ]
        ),
        expected: [`la proportion de ${s.individu}s ${s.colonneA} parmi les ${s.individu}s ${s.ligneA}`],
        comparator: "mcq_exact",
        explanation: exp(
          "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ » : la population de référence est $A$.",
          "On traduit l'indice par « parmi les… ».",
          `Indice $A$ = ${s.ligneA} : c'est la population. Évènement $B$ = ${s.colonneA} : c'est ce qu'on compte.`,
          `$P_A(B)$ est la proportion de ${s.individu}s ${s.colonneA} PARMI les ${s.individu}s ${s.ligneA}.`
        ),
        choiceDiagnostics: [
          {
            choice: `la proportion de ${s.individu}s à la fois ${s.ligneA} et ${s.colonneA} parmi tous les ${s.individu}s`,
            cause: "décrit $P(A \\cap B)$, calculée sur la population entière",
          },
          {
            choice: `la proportion de ${s.individu}s ${s.ligneA} parmi les ${s.individu}s ${s.colonneA}`,
            cause: "décrit $P_B(A)$ : la condition et l'évènement cherché sont inversés",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_cond_faux_positifs ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_faux_positifs_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    text:
      "Une maladie touche $1\\,\\%$ d'une population. Un test la détecte chez $99\\,\\%$ des malades. " +
      "On note $M$ « être malade » et $T$ « avoir un test positif ». " +
      "La phrase « $99\\,\\%$ des malades ont un test positif » s'écrit :",
    format: "qcm",
    choices: ["$P_M(T) = 0,99$", "$P_T(M) = 0,99$", "$P(M \\cap T) = 0,99$", "$P(M) = 0,99$"],
    expected: ["$P_M(T) = 0,99$"],
    comparator: "mcq_exact",
    hint: "« des malades » indique la population de référence.",
    explanation: exp(
      "L'indice porte la population de référence, celle qui suit « parmi » ou « des ».",
      "« $99\\,\\%$ DES MALADES ont un test positif » : la population est celle des malades, on cherche la proportion de tests positifs.",
      "Donc $P_M(T) = 0,99$.",
      "$P_T(M)$ serait tout autre chose : la proportion de malades PARMI LES TESTS POSITIFS. Avec une maladie rare, elle est bien plus faible — c'est le paradoxe des faux positifs, et c'est cette confusion que le programme demande de travailler."
    ),
    choiceDiagnostics: [
      {
        choice: "$P_T(M) = 0,99$",
        cause: "a inversé : ce serait « 99 % des tests positifs correspondent à des malades », ce qui est faux ici",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "faux-positifs", "piege"],
  },

  {
    kind: "template",
    id: "premiere_alea_faux_positifs_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_conditionnelle_calcul",
    microId: "alea_cond_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux fractions n'ont pas le même dénominateur : l'une divise par la ligne, l'autre par la colonne.",
    tags: ["premiere", "maths", "probabilites", "faux-positifs", "template"],
    generate: () => {
      const t = tableau();
      const { s } = t;
      return {
        text:
          `${enonceTableau(t)} Parmi $P_A(B)$ et $P_B(A)$, avec $A$ « ${s.ligneA} » et $B$ « ${s.colonneA} », ` +
          `laquelle vaut $\\dfrac{${t.a}}{${t.col1}}$ ?`,
        format: "qcm",
        choices: makeChoices("$P_B(A)$", [
          "$P_A(B)$",
          "$P(A \\cap B)$",
          "les deux, elles sont égales",
        ]),
        expected: ["$P_B(A)$"],
        comparator: "mcq_exact",
        canvas: canvasTableau(t),
        explanation: exp(
          "Le dénominateur d'une probabilité conditionnelle est l'effectif de la CONDITION.",
          `On regarde $${t.col1}$ : est-ce l'effectif des ${s.ligneA} ou celui des ${s.colonneA} ?`,
          `Les ${s.ligneA} sont $${t.ligne1}$ ; les ${s.colonneA} sont $${t.a} + ${t.c} = ${t.col1}$. Le dénominateur est donc la population ${s.colonneA}, c'est-à-dire $B$.`,
          `$\\dfrac{${t.a}}{${t.col1}} = P_B(A)$. La valeur $P_A(B)$, elle, vaut $\\dfrac{${t.a}}{${t.ligne1}}$ : même numérateur, dénominateur différent, donc une autre probabilité.`
        ),
        choiceDiagnostics: [
          {
            choice: "les deux, elles sont égales",
            cause: "confond $P_A(B)$ et $P_B(A)$ : elles n'ont pas le même dénominateur",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_indep_definition ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_indep_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_definition",
    difficulty: 3,
    theme: "neutral",
    text: "Deux évènements $A$ et $B$ sont indépendants lorsque :",
    format: "qcm",
    choices: [
      "$P_B(A) = P(A)$",
      "$P(A \\cap B) = 0$",
      "$P(A) + P(B) = 1$",
      "$A$ et $B$ ne peuvent pas se produire ensemble",
    ],
    expected: ["$P_B(A) = P(A)$"],
    comparator: "mcq_exact",
    hint: "Indépendants : savoir que $B$ s'est produit ne change rien à la probabilité de $A$.",
    explanation: exp(
      "$A$ et $B$ sont indépendants si la réalisation de l'un ne modifie pas la probabilité de l'autre : $P_B(A) = P(A)$, avec $P(B) \\neq 0$.",
      "On traduit : « savoir que $B$ est arrivé n'apprend rien sur $A$ ».",
      "Cette condition équivaut à $P(A \\cap B) = P(A) \\times P(B)$, forme souvent plus commode pour le calcul.",
      "L'indépendance est $P_B(A) = P(A)$ — à ne pas confondre avec l'incompatibilité, qui est $P(A \\cap B) = 0$."
    ),
    choiceDiagnostics: [
      {
        choice: "$P(A \\cap B) = 0$",
        cause: "c'est l'incompatibilité : deux évènements incompatibles sont au contraire très liés — si l'un arrive, l'autre est impossible",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "independance"],
  },

  /* ═══════════════ alea_indep_produit ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_indep_produit_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_produit",
    difficulty: 3,
    theme: "neutral",
    hint: "Si $A$ et $B$ sont indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
    tags: ["premiere", "maths", "probabilites", "independance", "template", "short"],
    generate: () => {
      const pA = pick([0.2, 0.4, 0.5, 0.6] as const);
      const pB = pick([0.1, 0.2, 0.5] as const);
      return {
        text:
          `$A$ et $B$ sont deux évènements indépendants, avec $P(A) = ${fr(pA)}$ et $P(B) = ${fr(pB)}$. ` +
          `Combien vaut $P(A \\cap B)$ ?`,
        format: "short",
        expected: [fr(pA * pB)],
        comparator: "number_equal",
        explanation: exp(
          "Pour deux évènements indépendants, $P(A \\cap B) = P(A) \\times P(B)$.",
          "On multiplie les deux probabilités.",
          `$${fr(pA)} \\times ${fr(pB)} = ${fr(pA * pB)}$.`,
          `$P(A \\cap B) = ${fr(pA * pB)}$. ⚠️ Cette formule n'est valable QUE si l'indépendance est donnée ou démontrée.`
        ),
      };
    },
  },

  /* ═══════════════ alea_indep_justifier ═══════════════ */

  {
    kind: "template",
    id: "premiere_alea_indep_justifier_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_justifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare $P(A \\cap B)$ et $P(A) \\times P(B)$ : l'égalité décide.",
    tags: ["premiere", "maths", "probabilites", "independance", "template"],
    generate: () => {
      // Un tableau exactement indépendant, ou légèrement décalé.
      const total = 200;
      const pA = pick([0.4, 0.5, 0.6] as const);
      const pB = pick([0.4, 0.5] as const);
      const independant = Math.random() < 0.5;
      const decalage = pick([10, 20] as const);
      const a = Math.round(total * pA * pB) + (independant ? 0 : decalage);
      const ligne1 = Math.round(total * pA);
      const col1 = Math.round(total * pB);
      const produit = (ligne1 / total) * (col1 / total);
      const inter = a / total;
      return {
        text:
          `Sur $${total}$ personnes, $${ligne1}$ vérifient $A$, $${col1}$ vérifient $B$, ` +
          `et $${a}$ vérifient $A$ et $B$ à la fois. Les évènements $A$ et $B$ sont-ils indépendants ?`,
        format: "qcm",
        choices: makeChoices(independant ? "Oui" : "Non", [
          independant ? "Non" : "Oui",
          "On ne peut pas le savoir avec ces données",
          "Oui, car ils peuvent se produire ensemble",
        ]),
        expected: [independant ? "Oui" : "Non"],
        comparator: "mcq_exact",
        explanation: exp(
          "$A$ et $B$ sont indépendants si et seulement si $P(A \\cap B) = P(A) \\times P(B)$.",
          "On calcule les trois probabilités, puis on compare.",
          `$P(A) = \\dfrac{${ligne1}}{${total}} = ${fr(ligne1 / total)}$, $P(B) = \\dfrac{${col1}}{${total}} = ${fr(col1 / total)}$, ` +
            `$P(A \\cap B) = \\dfrac{${a}}{${total}} = ${fr(inter)}$. ` +
            `Or $P(A) \\times P(B) = ${fr(produit)}$.`,
          independant
            ? `Les deux valeurs sont égales : $A$ et $B$ SONT indépendants.`
            : `$${fr(inter)} \\neq ${fr(produit)}$ : $A$ et $B$ ne sont PAS indépendants.`
        ),
        choiceDiagnostics: [
          {
            choice: "Oui, car ils peuvent se produire ensemble",
            cause: "pouvoir se produire ensemble n'est pas l'indépendance : c'est seulement le contraire de l'incompatibilité",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_indep_incompatible ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_alea_incompatible_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_independance",
    microId: "alea_indep_incompatible",
    difficulty: 4,
    theme: "neutral",
    text:
      "On lance un dé équilibré à six faces. $A$ : « le résultat est pair », $B$ : « le résultat est $3$ ». " +
      "Que peut-on dire de $A$ et $B$ ?",
    format: "qcm",
    choices: [
      "Ils sont incompatibles, donc pas indépendants",
      "Ils sont indépendants",
      "Ils sont à la fois incompatibles et indépendants",
      "Ils sont incompatibles, donc indépendants",
    ],
    expected: ["Ils sont incompatibles, donc pas indépendants"],
    comparator: "mcq_exact",
    hint: "Si tu sais que le résultat est $3$, que devient la probabilité qu'il soit pair ?",
    explanation: exp(
      "Incompatibles : $P(A \\cap B) = 0$. Indépendants : $P(A \\cap B) = P(A) \\times P(B)$.",
      "On calcule les deux membres.",
      "$P(A) = \\dfrac{1}{2}$, $P(B) = \\dfrac{1}{6}$, donc $P(A) \\times P(B) = \\dfrac{1}{12} \\neq 0 = P(A \\cap B)$.",
      "Ils sont incompatibles et NON indépendants. Savoir que le résultat vaut $3$ change tout : la probabilité qu'il soit pair passe de $\\frac{1}{2}$ à $0$. Deux évènements incompatibles de probabilités non nulles ne sont jamais indépendants."
    ),
    choiceDiagnostics: [
      {
        choice: "Ils sont incompatibles, donc indépendants",
        cause: "prend « incompatible » pour un synonyme d'« indépendant » : c'est presque le contraire",
      },
    ],
    tags: ["premiere", "maths", "probabilites", "independance", "piege"],
  },
];
