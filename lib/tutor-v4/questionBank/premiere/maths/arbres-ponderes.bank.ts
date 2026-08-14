// lib/tutor-v4/questionBank/premiere/maths/arbres-ponderes.bank.ts
//
// Notions : alea_arbre et alea_arbre_calcul (domaine BOP1AL)
//
// L'arbre pondéré est explicitement au programme : « Probabilité
// conditionnelle : définition, notation, calcul à partir d'un tableau croisé
// d'effectifs ou d'un arbre de probabilités » (BO du 7 juillet 2022), et la
// liste d'automatismes évaluables reprend les deux supports. Aux sujets de
// juin 2026, l'arbre est à COMPLÉTER aux Antilles, et à LIRE aux Centres
// étrangers (questions 11 et 12 du QCM).
//
// Les arbres sont dessinés par le canvas `arbre_proba` : l'élève voit la même
// figure qu'au tableau, avec ses branches et ses pondérations.
//
// Deux règles que les questions font travailler séparément :
//   - la somme des probabilités des branches issues d'un même nœud vaut 1 ;
//   - la probabilité d'un chemin est le PRODUIT des probabilités rencontrées.

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

/* ── Situations à deux étages, comme aux sujets ── */

type SituationArbre = {
  intro: string;
  a: string; // évènement du premier étage
  aBarre: string;
  b: string; // évènement du second étage
  bBarre: string;
  /** Étiquettes courtes portées par l'arbre. */
  labelA: string;
  labelB: string;
};

const SITUATIONS: readonly SituationArbre[] = [
  {
    intro: "Dans un lycée, les élèves inscrits aux clubs choisissent des activités.",
    a: "activité artistique",
    aBarre: "pas d'activité artistique",
    b: "activité sportive",
    bBarre: "pas d'activité sportive",
    labelA: "A",
    labelB: "S",
  },
  {
    intro: "Une usine fabrique des pièces sur deux machines.",
    a: "pièce issue de la machine 1",
    aBarre: "pièce issue de la machine 2",
    b: "pièce conforme",
    bBarre: "pièce non conforme",
    labelA: "M",
    labelB: "C",
  },
  {
    intro: "Un test de dépistage est proposé à une population.",
    a: "personne malade",
    aBarre: "personne non malade",
    b: "test positif",
    bBarre: "test négatif",
    labelA: "M",
    labelB: "T",
  },
] as const;

// Probabilités « rondes » : les produits tombent sur deux décimales au plus.
const PROBAS = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.8] as const;

function situationArbre() {
  const s = pick(SITUATIONS);
  const pA = pick([0.2, 0.3, 0.4, 0.5, 0.6, 0.8] as const);
  const pBsachantA = pick(PROBAS);
  const pBsachantNonA = pick(PROBAS);
  return {
    s,
    pA,
    pNonA: 1 - pA,
    pBsachantA,
    pNonBsachantA: 1 - pBsachantA,
    pBsachantNonA,
    pNonBsachantNonA: 1 - pBsachantNonA,
    cheminAB: pA * pBsachantA,
    cheminNonAB: (1 - pA) * pBsachantNonA,
    pB: pA * pBsachantA + (1 - pA) * pBsachantNonA,
  };
}

function canvasArbre(
  t: ReturnType<typeof situationArbre>,
  options?: { masquer?: "pNonA" | "pNonBsachantA" }
): CanvasFigure {
  const { s } = t;
  const val = (cle: "pNonA" | "pNonBsachantA", valeur: number) =>
    options?.masquer === cle ? "?" : fr(valeur);
  return {
    kind: "arbre_proba",
    titre: `${s.labelA} : ${s.a} — ${s.labelB} : ${s.b}`,
    racineEnfants: [
      {
        label: t.s.labelA,
        proba: fr(t.pA),
        enfants: [
          { label: s.labelB, proba: fr(t.pBsachantA) },
          { label: `${s.labelB}̄`, proba: val("pNonBsachantA", t.pNonBsachantA) },
        ],
      },
      {
        label: `${s.labelA}̄`,
        proba: val("pNonA", t.pNonA),
        enfants: [
          { label: s.labelB, proba: fr(t.pBsachantNonA) },
          { label: `${s.labelB}̄`, proba: fr(t.pNonBsachantNonA) },
        ],
      },
    ],
  };
}

export const arbresPonderesBank: TutorBankItemV4[] = [
  /* ═══════════════ alea_arbre_lire ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_lire",
    difficulty: 2,
    theme: "neutral",
    hint: "Une branche du second étage porte une probabilité CONDITIONNELLE.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      return {
        text:
          `${s.intro} L'arbre ci-contre décrit la situation. ` +
          `Quelle est la probabilité qu'une ${s.b === "test positif" ? "personne" : "unité"} soit « ${s.b} » ` +
          `sachant qu'elle est « ${s.a} » ?`,
        format: "short",
        expected: [fr(t.pBsachantA)],
        comparator: "number_equal",
        canvas: canvasArbre(t),
        explanation: exp(
          "Sur un arbre pondéré, les branches du second étage portent les probabilités CONDITIONNELLES.",
          `On suit la branche « ${s.labelA} », puis la branche « ${s.labelB} » qui en part.`,
          `Cette branche porte $${fr(t.pBsachantA)}$, c'est-à-dire $P_{${s.labelA}}(${s.labelB}) = ${fr(t.pBsachantA)}$.`,
          `La probabilité cherchée est $${fr(t.pBsachantA)}$ — on la LIT, il n'y a aucun calcul à faire.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_arbre_lire_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, que représente la probabilité inscrite sur une branche du DEUXIÈME étage ?",
    format: "qcm",
    choices: [
      "Une probabilité conditionnelle",
      "Une probabilité d'intersection",
      "La probabilité du chemin entier",
      "Une somme de probabilités",
    ],
    expected: ["Une probabilité conditionnelle"],
    comparator: "mcq_exact",
    hint: "Pour arriver à cette branche, on a déjà franchi la première.",
    explanation: exp(
      "Les branches du premier étage portent des probabilités simples ; celles du second, des probabilités conditionnelles.",
      "Une branche du second étage se parcourt SACHANT qu'on a déjà emprunté la première.",
      "La branche menant à $B$ après $A$ porte $P_A(B)$.",
      "C'est une probabilité conditionnelle. L'intersection $P(A \\cap B)$, elle, s'obtient en multipliant les deux branches du chemin."
    ),
    tags: ["premiere", "maths", "probabilites", "arbre"],
  },

  /* ═══════════════ alea_arbre_completer ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_completer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_completer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les probabilités des branches issues d'un même nœud ont pour somme $1$.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      return {
        text:
          `${s.intro} Sur l'arbre ci-contre, une probabilité a été effacée : ` +
          `celle de la branche menant à $${s.labelA}̄$. Quelle est-elle ?`,
        format: "short",
        expected: [fr(t.pNonA)],
        comparator: "number_equal",
        canvas: canvasArbre(t, { masquer: "pNonA" }),
        explanation: exp(
          "La somme des probabilités des branches issues d'un même nœud vaut $1$.",
          "On retire à $1$ la probabilité de l'autre branche.",
          `$1 - ${fr(t.pA)} = ${fr(t.pNonA)}$.`,
          `La branche manquante porte $${fr(t.pNonA)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_arbre_completer_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_completer",
    difficulty: 3,
    theme: "neutral",
    hint: "La règle vaut à chaque nœud, y compris au second étage.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      return {
        text:
          `${s.intro} Sur l'arbre ci-contre, la probabilité de la branche menant à $${s.labelB}̄$ ` +
          `après $${s.labelA}$ a été effacée. Quelle est-elle ?`,
        format: "short",
        expected: [fr(t.pNonBsachantA)],
        comparator: "number_equal",
        canvas: canvasArbre(t, { masquer: "pNonBsachantA" }),
        explanation: exp(
          "À chaque nœud, la somme des branches qui en partent vaut $1$ — y compris au second étage.",
          `Depuis le nœud $${s.labelA}$, deux branches partent : vers $${s.labelB}$ et vers $${s.labelB}̄$.`,
          `$1 - ${fr(t.pBsachantA)} = ${fr(t.pNonBsachantA)}$.`,
          `La branche manquante porte $${fr(t.pNonBsachantA)}$, c'est-à-dire $P_{${s.labelA}}(${s.labelB}̄) = ${fr(t.pNonBsachantA)}$.`
        ),
      };
    },
  },

  /* ═══════════════ alea_arbre_construire ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_construire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre",
    microId: "alea_arbre_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "« Parmi les… » annonce une branche du SECOND étage.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const pct = (x: number) => `${fr(x * 100)}\\,\\%`;
      return {
        text:
          `${s.intro} On lit : « $${pct(t.pA)}$ sont « ${s.a} » ; ` +
          `parmi ceux-là, $${pct(t.pBsachantA)}$ sont « ${s.b} » ». ` +
          `Où place-t-on $${fr(t.pBsachantA)}$ sur l'arbre ?`,
        format: "qcm",
        choices: makeChoices(
          `sur la branche $${s.labelB}$ partant de $${s.labelA}$`,
          [
            `sur la branche $${s.labelA}$ partant du départ`,
            `sur la branche $${s.labelB}$ partant de $${s.labelA}̄$`,
            `sur la branche $${s.labelB}̄$ partant de $${s.labelA}$`,
          ]
        ),
        expected: [`sur la branche $${s.labelB}$ partant de $${s.labelA}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion donnée « parmi » une sous-population est une probabilité conditionnelle : elle se place au second étage.",
          `« Parmi ceux qui sont « ${s.a} » » restreint la population à $${s.labelA}$ : on part donc du nœud $${s.labelA}$.`,
          `La branche va vers $${s.labelB}$ et porte $${fr(t.pBsachantA)}$, c'est $P_{${s.labelA}}(${s.labelB})$.`,
          `On la place sur la branche $${s.labelB}$ partant de $${s.labelA}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `sur la branche $${s.labelB}$ partant de $${s.labelA}̄$`,
            cause: "a rattaché la condition à la mauvaise population",
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_arbre_chemin ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_chemin_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_chemin",
    difficulty: 3,
    theme: "neutral",
    hint: "Le long d'un chemin, on MULTIPLIE.",
    tags: ["premiere", "maths", "probabilites", "arbre", "chemin", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      return {
        text:
          `${s.intro} À l'aide de l'arbre ci-contre, calcule $P(${s.labelA} \\cap ${s.labelB})$.`,
        format: "short",
        expected: [fr(t.cheminAB)],
        comparator: "number_equal",
        canvas: canvasArbre(t),
        explanation: exp(
          "La probabilité d'un chemin est le produit des probabilités portées par ses branches : $P(A \\cap B) = P(A) \\times P_A(B)$.",
          `On suit le chemin $${s.labelA}$ puis $${s.labelB}$ et on multiplie.`,
          `$${fr(t.pA)} \\times ${fr(t.pBsachantA)} = ${fr(t.cheminAB)}$.`,
          `$P(${s.labelA} \\cap ${s.labelB}) = ${fr(t.cheminAB)}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_arbre_chemin_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_chemin",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, comment calcule-t-on la probabilité d'un chemin ?",
    format: "qcm",
    choices: [
      "On multiplie les probabilités rencontrées le long du chemin",
      "On additionne les probabilités rencontrées le long du chemin",
      "On prend la plus petite des deux",
      "On divise la seconde par la première",
    ],
    expected: ["On multiplie les probabilités rencontrées le long du chemin"],
    comparator: "mcq_exact",
    hint: "Le chemin correspond à une INTERSECTION : les deux évènements se produisent.",
    explanation: exp(
      "Un chemin représente l'intersection des évènements rencontrés.",
      "La formule $P(A \\cap B) = P(A) \\times P_A(B)$ se lit directement sur l'arbre.",
      "On multiplie donc les probabilités des branches successives.",
      "On multiplie LE LONG d'un chemin ; on additionne ENTRE plusieurs chemins qui mènent au même évènement — ce sont deux règles différentes."
    ),
    tags: ["premiere", "maths", "probabilites", "arbre", "chemin"],
  },

  /* ═══════════════ alea_arbre_somme_chemins ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_somme_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_somme_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux chemins mènent à cet évènement : calcule-les, puis additionne.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      return {
        text: `${s.intro} À l'aide de l'arbre ci-contre, calcule $P(${s.labelB})$.`,
        format: "short",
        expected: [fr(t.pB)],
        comparator: "number_equal",
        canvas: canvasArbre(t),
        explanation: exp(
          "Un évènement peut être atteint par plusieurs chemins : sa probabilité est la SOMME des probabilités de ces chemins.",
          `Deux chemins mènent à $${s.labelB}$ : par $${s.labelA}$, et par $${s.labelA}̄$.`,
          `$${fr(t.pA)} \\times ${fr(t.pBsachantA)} = ${fr(t.cheminAB)}$ et ` +
            `$${fr(t.pNonA)} \\times ${fr(t.pBsachantNonA)} = ${fr(t.cheminNonAB)}$. ` +
            `Somme : $${fr(t.cheminAB)} + ${fr(t.cheminNonAB)} = ${fr(t.pB)}$.`,
          `$P(${s.labelB}) = ${fr(t.pB)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_arbre_somme_tpl_2",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_somme_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie le long d'un chemin, on additionne entre les chemins.",
    tags: ["premiere", "maths", "probabilites", "arbre", "template"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      return {
        text: `${s.intro} Quel calcul donne $P(${s.labelB})$ à partir de l'arbre ci-contre ?`,
        format: "qcm",
        choices: makeChoices(
          `$${fr(t.pA)} \\times ${fr(t.pBsachantA)} + ${fr(t.pNonA)} \\times ${fr(t.pBsachantNonA)}$`,
          [
            `$${fr(t.pBsachantA)} + ${fr(t.pBsachantNonA)}$`,
            `$${fr(t.pA)} \\times ${fr(t.pBsachantA)}$`,
            `$${fr(t.pA)} \\times ${fr(t.pBsachantA)} \\times ${fr(t.pNonA)} \\times ${fr(t.pBsachantNonA)}$`,
          ]
        ),
        expected: [
          `$${fr(t.pA)} \\times ${fr(t.pBsachantA)} + ${fr(t.pNonA)} \\times ${fr(t.pBsachantNonA)}$`,
        ],
        comparator: "mcq_exact",
        canvas: canvasArbre(t),
        explanation: exp(
          "On multiplie le long de chaque chemin, puis on additionne les chemins qui mènent au même évènement.",
          `On repère les deux chemins menant à $${s.labelB}$.`,
          `$${fr(t.pA)} \\times ${fr(t.pBsachantA)} + ${fr(t.pNonA)} \\times ${fr(t.pBsachantNonA)} = ${fr(t.pB)}$.`,
          `C'est le bon calcul, et il donne $P(${s.labelB}) = ${fr(t.pB)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(t.pBsachantA)} + ${fr(t.pBsachantNonA)}$`,
            cause: "additionne des probabilités conditionnelles sans les pondérer par le premier étage",
          },
          {
            choice: `$${fr(t.pA)} \\times ${fr(t.pBsachantA)}$`,
            cause: `ne compte qu'un seul chemin : il oublie ceux qui passent par $${s.labelA}̄$`,
          },
        ],
      };
    },
  },

  /* ═══════════════ alea_arbre_vers_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_arbre_vers_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "alea_arbre_calcul",
    microId: "alea_arbre_vers_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Une case du tableau correspond à un chemin de l'arbre.",
    tags: ["premiere", "maths", "probabilites", "arbre", "tableau", "template", "short"],
    generate: () => {
      const t = situationArbre();
      const { s } = t;
      const effectif = pick([200, 500, 1000] as const);
      return {
        text:
          `${s.intro} L'arbre ci-contre décrit les proportions. ` +
          `Sur $${effectif}$ individus, combien attend-on dans la case « ${s.a} » et « ${s.b} » ` +
          `d'un tableau croisé ?`,
        format: "short",
        expected: [fr(Math.round(t.cheminAB * effectif * 1000) / 1000)],
        comparator: "number_equal",
        canvas: canvasArbre(t),
        explanation: exp(
          "Une case d'un tableau croisé correspond à une intersection, c'est-à-dire à un chemin de l'arbre.",
          "On calcule la probabilité du chemin, puis on la multiplie par l'effectif total.",
          `$P(${s.labelA} \\cap ${s.labelB}) = ${fr(t.pA)} \\times ${fr(t.pBsachantA)} = ${fr(t.cheminAB)}$, ` +
            `puis $${fr(t.cheminAB)} \\times ${effectif} = ${fr(Math.round(t.cheminAB * effectif * 1000) / 1000)}$.`,
          `On attend $${fr(Math.round(t.cheminAB * effectif * 1000) / 1000)}$ individus dans cette case. Arbre et tableau disent la même chose : l'un en proportions, l'autre en effectifs.`
        ),
      };
    },
  },
];
