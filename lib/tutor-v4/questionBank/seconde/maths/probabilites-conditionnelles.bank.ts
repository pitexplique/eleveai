// lib/tutor-v4/questionBank/seconde/maths/probabilites-conditionnelles.bank.ts
//
// Chapitre : Probabilites conditionnelles et arbres (notion
// probabilites_conditionnelles_2de)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates
// dominants, QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "arbre_proba" (arbre pondere) et "tableau_donnees" (tableau croise).
//
// ⭐ LE FIL DE TOUT LE CHAPITRE est le depistage : malade / sain, puis test
// positif / negatif (Frederic, 04/09/2026). C'est aussi l'exemple que le BO
// nomme — « distinguer en situation PA(B) et PB(A), par exemple dans des
// situations de type faux positifs ».
//
// ⛔ PAS DE FORMULE DES PROBABILITES TOTALES. Le BO 2026 ecrit : « le calcul de
// la probabilite d'un evenement connaissant ses probabilites conditionnelles
// relatives a une partition de l'univers n'est PAS un attendu du programme. »
// On additionne donc les CHEMINS de l'arbre — « arbres de probabilite,
// application au calcul de probabilites », qui est un attendu — sans jamais
// poser la formule generale ni son nom.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   proba_conditionnelle   — Calculer PA(B)
//   proba_arbre_pondere    — Lire et construire un arbre pondere
//   proba_arbre_chemins    — Additionner les chemins qui menent a un evenement
//   proba_tableau_croise   — Lire PA(B) sur un tableau croise d'effectifs
//   proba_faux_positifs    — Distinguer PA(B) et PB(A)

import type { TutorBankItemV4, CanvasFigure } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function choisir<T>(liste: T[]): T {
  return liste[Math.floor(Math.random() * liste.length)];
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

/**
 * Un decimal a la francaise, sans zeros inutiles.
 * ⛔ L'ordre des nettoyages compte : on enleve les zeros de queue AVANT de
 * changer le point en virgule, sinon la regex ne reconnait plus la decimale.
 */
function fmt(x: number, n = 3): string {
  return x
    .toFixed(n)
    .replace(/0+$/, "")
    .replace(/\.$/, "")
    .replace(".", ",");
}

/**
 * Quatre propositions garanties DISTINCTES.
 *
 * ⛔ Un distracteur peut rejoindre la bonne reponse selon le tirage — une
 * prevalence et un taux de faux positifs egaux donnent deux chemins de meme
 * probabilite — et le QCM offrait alors deux fois la meme case. On prend les
 * distracteurs voulus tant qu'ils different, puis on complete avec l'echelle de
 * secours. La position, elle, est melangee plus tard par questionPairBuilder.
 */
function choixDistincts(correct: string, voulus: string[], secours: string[]): string[] {
  const vus = new Set([correct]);
  const sortie = [correct];
  for (const c of [...voulus, ...secours]) {
    if (sortie.length === 4) break;
    if (!vus.has(c)) {
      vus.add(c);
      sortie.push(c);
    }
  }
  return sortie;
}

/**
 * Le depistage, en nombres qui tombent juste.
 *
 * `prevalence` en %, `sensibilite` en dixiemes (8 → 80 % des malades ont un
 * test positif), `fauxPositifs` en % des sains. Les trois produits restent des
 * decimaux courts : 2 % × 0,8 = 0,016, et non un nombre a rallonge.
 */
function depistage() {
  const prev = choisir([2, 4, 5, 10, 20]);
  const sens = choisir([8, 9]);
  const faux = choisir([5, 10, 20]);

  const pMalade = prev / 100;
  const pSain = 1 - pMalade;
  const pTestSiMalade = sens / 10;
  const pTestSiSain = faux / 100;

  const cheminMaladePositif = (prev * sens) / 1000;
  const cheminSainPositif = ((100 - prev) * faux) / 10000;
  const pPositif = cheminMaladePositif + cheminSainPositif;
  const pMaladeSiPositif = cheminMaladePositif / pPositif;

  return {
    prev,
    sens,
    faux,
    pMalade,
    pSain,
    pTestSiMalade,
    pTestSiSain,
    cheminMaladePositif,
    cheminSainPositif,
    pPositif,
    pMaladeSiPositif,
  };
}

/**
 * L'arbre du depistage.
 *
 * ⛔ LES ETIQUETTES DE FEUILLES RESTENT COURTES. Le canvas place la derniere
 * colonne a x = 320 et ecrit son etiquette a x + 8, sans borner sa largeur,
 * dans un cadre de 360 : « Test positif » sortirait du dessin. « T+ » tient.
 * La legende vit dans le titre, pas dans les feuilles.
 */
function arbreDepistage(d: ReturnType<typeof depistage>): CanvasFigure {
  return {
    kind: "arbre_proba",
    titre: "Dépistage — T+ : test positif, T− : test négatif",
    racineEnfants: [
      {
        label: "Malade",
        proba: fmt(d.pMalade),
        enfants: [
          { label: "T+", proba: fmt(d.pTestSiMalade) },
          { label: "T−", proba: fmt(1 - d.pTestSiMalade) },
        ],
      },
      {
        label: "Sain",
        proba: fmt(d.pSain),
        enfants: [
          { label: "T+", proba: fmt(d.pTestSiSain) },
          { label: "T−", proba: fmt(1 - d.pTestSiSain) },
        ],
      },
    ],
  };
}

/** Un tableau croise d'effectifs, sur la meme situation. */
function tableauCroise(
  malades: number,
  sains: number,
  positifsMalades: number,
  positifsSains: number
): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: "Résultats du dépistage",
    headers: ["", "Test +", "Test −", "Total"],
    rows: [
      {
        label: "Malades",
        values: [positifsMalades, malades - positifsMalades, malades],
      },
      {
        label: "Sains",
        values: [positifsSains, sains - positifsSains, sains],
      },
      {
        label: "Total",
        values: [
          positifsMalades + positifsSains,
          malades + sains - positifsMalades - positifsSains,
          malades + sains,
        ],
      },
    ],
    display: { striped: true },
  };
}

export const probabilitesConditionnellesBank: TutorBankItemV4[] = [
  // ============================================================
  // proba_conditionnelle — la notation PA(B) et son calcul
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 1,
    theme: "neutral",
    text: "Comment se lit la notation $P_A(B)$ ?",
    format: "qcm",
    choices: [
      "la probabilité de $B$ sachant $A$",
      "la probabilité de $A$ sachant $B$",
      "la probabilité de $A$ et $B$",
      "la probabilité de $A$ ou $B$",
    ],
    expected: ["la probabilité de $B$ sachant $A$"],
    comparator: "mcq_exact",
    hint: "L'évènement écrit EN BAS est celui que l'on sait déjà réalisé.",
    explanation: exp(
      "$P_A(B)$ est la probabilité de $B$ dans le monde où $A$ est déjà arrivé.",
      "On repère l'évènement placé en indice : c'est la condition, pas la question.",
      "Ici l'indice est $A$, donc $A$ est connu et l'on s'interroge sur $B$.",
      "$P_A(B)$ se lit « probabilité de $B$ sachant $A$ »."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "notation", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle formule donne $P_A(B)$ ?",
    format: "qcm",
    choices: [
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(B)}$",
      "$P_A(B) = P(A) \\times P(B)$",
      "$P_A(B) = P(A) + P(B)$",
    ],
    expected: ["$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$"],
    comparator: "mcq_exact",
    hint: "On se restreint au monde $A$ : c'est donc par $P(A)$ que l'on divise.",
    explanation: exp(
      "Conditionner par $A$, c'est prendre $A$ comme nouvel univers.",
      "On compte la part de $A$ qui contient aussi $B$, puis on la rapporte à $A$ tout entier.",
      "Cette part est $P(A \\cap B)$, et l'univers de référence est $P(A)$.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ — on divise par la CONDITION."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "formule", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi la définition de $P_A(B)$ exige-t-elle $P(A) \\neq 0$ ?",
    format: "qcm",
    choices: [
      "parce qu'on divise par $P(A)$",
      "parce que $B$ doit être possible",
      "parce que $A$ et $B$ doivent être incompatibles",
      "parce que la somme doit valoir $1$",
    ],
    expected: ["parce qu'on divise par $P(A)$"],
    comparator: "mcq_exact",
    hint: "Regarde le dénominateur.",
    explanation: exp(
      "La condition $P(A) \\neq 0$ vient de l'écriture même de la formule.",
      "On examine ce qui rendrait le calcul impossible.",
      "$P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ : un dénominateur nul n'a pas de sens.",
      "Et c'est logique : « sachant $A$ » n'a rien à dire si $A$ ne peut pas se produire."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une classe, $P(\\text{fille}) = 0{,}6$ et $P(\\text{fille} \\cap \\text{demi-pensionnaire}) = 0{,}3$. Quelle est la probabilité qu'un élève soit demi-pensionnaire sachant que c'est une fille ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "$\\dfrac{0{,}3}{0{,}6}$.",
    explanation: exp(
      "On applique la formule en prenant « fille » comme condition.",
      "On divise la probabilité de l'intersection par celle de la condition.",
      "$\\dfrac{0{,}3}{0{,}6} = 0{,}5$.",
      "Une fille sur deux est demi-pensionnaire — alors que $0{,}3$ seulement des élèves sont des filles demi-pensionnaires."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_def_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    text: "Que vaut $P_A(B) + P_A(\\overline{B})$ ?",
    format: "qcm",
    choices: ["$1$", "$P(A)$", "$P(B)$", "$0$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Sachant $A$, ou bien $B$ arrive, ou bien il n'arrive pas.",
    explanation: exp(
      "Conditionner par $A$ donne une vraie loi de probabilité sur le monde $A$.",
      "Dans ce monde, $B$ et son contraire couvrent toutes les possibilités.",
      "Leurs probabilités s'additionnent donc pour donner la totalité.",
      "$P_A(B) + P_A(\\overline{B}) = 1$ — c'est ce que traduisent les branches d'un même nœud d'arbre."
    ),
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_def_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "On divise l'intersection par la condition.",
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "template", "short"],
    generate: () => {
      const pa = choisir([0.2, 0.25, 0.4, 0.5, 0.8]);
      const q = choisir([0.25, 0.5, 0.75]);
      const inter = Math.round(pa * q * 1000) / 1000;
      return {
        text: `On sait que $P(A) = ${fmt(pa)}$ et $P(A \\cap B) = ${fmt(inter)}$. Calculer $P_A(B)$.`,
        format: "short",
        expected: [fmt(q), String(q)],
        comparator: "number_equal",
        explanation: exp(
          "$P_A(B)$ rapporte l'intersection à la condition.",
          "On divise $P(A \\cap B)$ par $P(A)$.",
          `$\\dfrac{${fmt(inter)}}{${fmt(pa)}} = ${fmt(q)}$.`,
          `$P_A(B) = ${fmt(q)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_def_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    hint: "La formule se retourne : l'intersection est un PRODUIT.",
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "template", "short"],
    generate: () => {
      const pa = choisir([0.2, 0.4, 0.5, 0.6, 0.8]);
      const q = choisir([0.25, 0.5, 0.75]);
      const inter = Math.round(pa * q * 1000) / 1000;
      return {
        text: `On sait que $P(A) = ${fmt(pa)}$ et $P_A(B) = ${fmt(q)}$. Calculer $P(A \\cap B)$.`,
        format: "short",
        expected: [fmt(inter), String(inter)],
        comparator: "number_equal",
        explanation: exp(
          "La formule de la probabilité conditionnelle se retourne en produit.",
          "De $P_A(B) = \\dfrac{P(A \\cap B)}{P(A)}$ on tire $P(A \\cap B) = P(A) \\times P_A(B)$.",
          `$${fmt(pa)} \\times ${fmt(q)} = ${fmt(inter)}$.`,
          `$P(A \\cap B) = ${fmt(inter)}$ — c'est exactement ce que l'on fait en multipliant le long d'un chemin d'arbre.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_def_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 3,
    theme: "neutral",
    hint: "Sachant $A$, les deux issues se partagent la totalité.",
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "template", "short"],
    generate: () => {
      const q = choisir([0.1, 0.2, 0.25, 0.4, 0.7, 0.85]);
      return {
        text: `On sait que $P_A(B) = ${fmt(q)}$. Calculer $P_A(\\overline{B})$.`,
        format: "short",
        expected: [fmt(1 - q), String(Math.round((1 - q) * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Sachant $A$, l'évènement $B$ et son contraire épuisent les possibilités.",
          "On retranche donc à $1$.",
          `$1 - ${fmt(q)} = ${fmt(1 - q)}$.`,
          `$P_A(\\overline{B}) = ${fmt(1 - q)}$ — comme les deux branches issues d'un même nœud.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_def_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien d'individus forment le monde « sachant… » ? C'est le dénominateur.",
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "effectifs", "template", "short"],
    generate: () => {
      const parPart = choisir([20, 25, 40, 50]);
      const parts = randomInt(2, 4);
      const total = parPart * parts;
      const dont = parPart * randomInt(1, parts - 1);
      return {
        text: `Dans un club de $${total}$ membres, $${dont}$ pratiquent la natation. On tire un membre au hasard. Sachant qu'il fait partie du club, quelle est la probabilité qu'il pratique la natation ?`,
        format: "short",
        expected: [fmt(dont / total), String(Math.round((dont / total) * 1000) / 1000)],
        comparator: "number_equal",
        explanation: exp(
          "Conditionner, c'est changer d'univers de référence.",
          "L'univers est ici le club entier, et l'on compte les nageurs dedans.",
          `$\\dfrac{${dont}}{${total}} = ${fmt(dont / total)}$.`,
          `La probabilité vaut $${fmt(dont / total)}$ — le dénominateur est toujours l'effectif de la CONDITION.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_def_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_conditionnelle",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare ce que l'on divise, et par quoi.",
    tags: ["seconde", "maths", "probabilites", "conditionnelle", "piege", "template", "qcm"],
    generate: () => {
      const pa = choisir([0.2, 0.4, 0.5]);
      const pb = choisir([0.6, 0.8]);
      const inter = Math.round(pa * pb * 1000) / 1000;
      const pab = Math.round((inter / pa) * 1000) / 1000;
      const pba = Math.round((inter / pb) * 1000) / 1000;
      return {
        text: `Avec $P(A) = ${fmt(pa)}$, $P(B) = ${fmt(pb)}$ et $P(A \\cap B) = ${fmt(inter)}$, laquelle de ces affirmations est exacte ?`,
        format: "qcm",
        choices: choixDistincts(
          `$P_A(B) = ${fmt(pab)}$ et $P_B(A) = ${fmt(pba)}$`,
          [
            `$P_A(B) = ${fmt(pba)}$ et $P_B(A) = ${fmt(pab)}$`,
            `$P_A(B) = P_B(A) = ${fmt(inter)}$`,
            `$P_A(B) = P_B(A) = ${fmt(pab)}$`,
          ],
          [`$P_A(B) = ${fmt(pab)}$ et $P_B(A) = ${fmt(inter)}$`]
        ),
        expected: [`$P_A(B) = ${fmt(pab)}$ et $P_B(A) = ${fmt(pba)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les deux conditionnelles partagent le même numérateur mais pas le même dénominateur.",
          "On divise l'intersection tantôt par $P(A)$, tantôt par $P(B)$.",
          `$P_A(B) = \\dfrac{${fmt(inter)}}{${fmt(pa)}} = ${fmt(pab)}$ et $P_B(A) = \\dfrac{${fmt(inter)}}{${fmt(pb)}} = ${fmt(pba)}$.`,
          "Elles diffèrent dès que $P(A) \\neq P(B)$ : c'est la confusion la plus coûteuse du chapitre."
        ),
      };
    },
  },

  // ============================================================
  // proba_arbre_pondere — lire un arbre, multiplier le long d'un chemin
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_pcond_arbre_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un arbre pondéré, que porte une branche du DEUXIÈME niveau ?",
    format: "qcm",
    choices: [
      "une probabilité conditionnelle",
      "une probabilité d'intersection",
      "la somme des branches précédentes",
      "toujours $0{,}5$",
    ],
    expected: ["une probabilité conditionnelle"],
    comparator: "mcq_exact",
    hint: "Pour arriver sur cette branche, il a fallu passer par la première.",
    explanation: exp(
      "Une branche du second niveau part d'un nœud déjà atteint.",
      "On se demande ce que cette pondération suppose : le premier évènement est déjà réalisé.",
      "Elle donne donc la probabilité de la suite SACHANT ce qui précède.",
      "C'est une probabilité conditionnelle — l'intersection, elle, s'obtient en multipliant tout le chemin."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_arbre_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut la somme des probabilités portées par les branches issues d'un MÊME nœud ?",
    format: "qcm",
    choices: ["$1$", "$0{,}5$", "cela dépend du nœud", "$0$"],
    expected: ["$1$"],
    comparator: "mcq_exact",
    hint: "Depuis ce nœud, il faut bien partir quelque part.",
    explanation: exp(
      "Les branches issues d'un nœud décrivent toutes les suites possibles à partir de lui.",
      "On additionne les probabilités de ces suites, qui s'excluent deux à deux.",
      "Elles couvrent la totalité des cas : leur somme fait le tout.",
      "La somme vaut toujours $1$ — un contrôle immédiat quand on complète un arbre."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_arbre_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 3,
    theme: "neutral",
    text: "Comment calcule-t-on la probabilité d'un CHEMIN complet d'un arbre pondéré ?",
    format: "qcm",
    choices: [
      "en multipliant les probabilités des branches du chemin",
      "en additionnant les probabilités des branches du chemin",
      "en prenant la plus petite des deux",
      "en prenant la dernière branche",
    ],
    expected: ["en multipliant les probabilités des branches du chemin"],
    comparator: "mcq_exact",
    hint: "$P(A \\cap B) = P(A) \\times P_A(B)$.",
    explanation: exp(
      "Un chemin décrit une intersection : le premier évènement ET le second.",
      "On repart de la formule conditionnelle retournée en produit.",
      "$P(A \\cap B) = P(A) \\times P_A(B)$ : la première branche fois la seconde.",
      "On MULTIPLIE le long d'un chemin — et l'on additionne seulement entre chemins différents."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la première branche de l'arbre.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      return {
        text: `Dans cette population, quelle est la probabilité qu'une personne tirée au hasard soit malade ?`,
        format: "short",
        expected: [fmt(d.pMalade), String(d.pMalade)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "La première branche d'un arbre porte la probabilité de l'évènement de départ.",
          "On lit la pondération de la branche « Malade ».",
          `Elle vaut $${fmt(d.pMalade)}$, soit $${d.prev}$ % de la population.`,
          `$P(\\text{Malade}) = ${fmt(d.pMalade)}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 3,
    theme: "neutral",
    hint: "La branche cherchée part du nœud « Malade » : c'est déjà une condition.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "qcm"],
    generate: () => {
      const d = depistage();
      return {
        text: `Sur cet arbre, que représente la pondération $${fmt(d.pTestSiMalade)}$ portée par la branche qui va de « Malade » à « T+ » ?`,
        format: "qcm",
        choices: choixDistincts(
          "$P_{\\text{Malade}}(\\text{T+})$",
          [
            "$P(\\text{Malade} \\cap \\text{T+})$",
            "$P(\\text{T+})$",
            "$P_{\\text{T+}}(\\text{Malade})$",
          ],
          ["$P(\\text{Malade})$"]
        ),
        expected: ["$P_{\\text{Malade}}(\\text{T+})$"],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Une branche de second niveau porte une probabilité conditionnelle.",
          "On regarde d'où elle part : du nœud « Malade », donc la maladie est déjà supposée.",
          "Elle donne la probabilité d'un test positif SACHANT que la personne est malade.",
          `C'est $P_{\\text{Malade}}(\\text{T+}) = ${fmt(d.pTestSiMalade)}$ — et non $P(\\text{Malade} \\cap \\text{T+})$, qui demande de multiplier tout le chemin.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 3,
    theme: "neutral",
    hint: "Les deux branches d'un même nœud se complètent à $1$.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      return {
        text: `Sur cet arbre, quelle probabilité porte la branche qui va de « Sain » à « T− » ?`,
        format: "short",
        expected: [fmt(1 - d.pTestSiSain), String(Math.round((1 - d.pTestSiSain) * 1000) / 1000)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Les branches issues d'un même nœud ont pour somme $1$.",
          "On retranche à $1$ la pondération de l'autre branche partant de « Sain ».",
          `$1 - ${fmt(d.pTestSiSain)} = ${fmt(1 - d.pTestSiSain)}$.`,
          `$P_{\\text{Sain}}(\\text{T−}) = ${fmt(1 - d.pTestSiSain)}$ : c'est la probabilité qu'un test soit correctement négatif.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie les deux branches du chemin.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      return {
        text: `Sur cet arbre, calculer $P(\\text{Malade} \\cap \\text{T+})$, la probabilité d'être malade ET d'avoir un test positif.`,
        format: "short",
        expected: [fmt(d.cheminMaladePositif), String(d.cheminMaladePositif)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "La probabilité d'un chemin est le produit de ses branches.",
          "On suit le chemin « Malade » puis « T+ » et l'on multiplie.",
          `$${fmt(d.pMalade)} \\times ${fmt(d.pTestSiMalade)} = ${fmt(d.cheminMaladePositif)}$.`,
          `$P(\\text{Malade} \\cap \\text{T+}) = ${fmt(d.cheminMaladePositif)}$ — bien plus petit que la pondération $${fmt(d.pTestSiMalade)}$ de la seule branche.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 4,
    theme: "neutral",
    hint: "Le chemin passe par « Sain », dont la probabilité n'est pas celle des malades.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      return {
        text: `Sur cet arbre, calculer $P(\\text{Sain} \\cap \\text{T+})$ : la personne est saine mais son test est positif.`,
        format: "short",
        expected: [fmt(d.cheminSainPositif, 4), String(d.cheminSainPositif)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "C'est encore un chemin, donc encore un produit.",
          "On multiplie la probabilité d'être sain par celle d'un test positif sachant qu'on est sain.",
          `$${fmt(d.pSain)} \\times ${fmt(d.pTestSiSain)} = ${fmt(d.cheminSainPositif, 4)}$.`,
          `$P(\\text{Sain} \\cap \\text{T+}) = ${fmt(d.cheminSainPositif, 4)}$ : ce sont les FAUX POSITIFS, et ils sont nombreux car les sains sont nombreux.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte les feuilles de l'arbre.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "qcm"],
    generate: () => {
      const d = depistage();
      const somme =
        d.cheminMaladePositif +
        (d.pMalade * (1 - d.pTestSiMalade)) +
        d.cheminSainPositif +
        (d.pSain * (1 - d.pTestSiSain));
      return {
        text: `Sur cet arbre, que vaut la somme des probabilités des QUATRE chemins complets ?`,
        format: "qcm",
        choices: choixDistincts(
          "$1$",
          [`$${fmt(d.pPositif, 4)}$`, "$0{,}5$", `$${fmt(d.pMalade)}$`],
          ["$2$", "$0$"]
        ),
        expected: ["$1$"],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Les chemins complets décrivent tous les cas possibles, sans en oublier ni en compter deux fois.",
          "On additionne les quatre produits, ou l'on raisonne : chaque personne suit exactement un chemin.",
          `Le calcul donne $${fmt(somme)}$.`,
          "La somme des chemins d'un arbre vaut toujours $1$ : c'est le contrôle à faire avant de conclure."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_arbre_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_pondere",
    difficulty: 3,
    theme: "neutral",
    hint: "Traduis la phrase en notation, puis repère où elle se lit sur l'arbre.",
    tags: ["seconde", "maths", "probabilites", "arbre", "langue", "template", "qcm"],
    generate: () => {
      const d = depistage();
      return {
        text: "« $80$ % des malades ont un test positif. » Comment cette phrase s'écrit-elle en notation ?",
        format: "qcm",
        choices: [
          "$P_{\\text{Malade}}(\\text{T+}) = 0{,}8$",
          "$P_{\\text{T+}}(\\text{Malade}) = 0{,}8$",
          "$P(\\text{Malade} \\cap \\text{T+}) = 0{,}8$",
          "$P(\\text{T+}) = 0{,}8$",
        ],
        expected: ["$P_{\\text{Malade}}(\\text{T+}) = 0{,}8$"],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Passer de la langue à la notation, c'est repérer qui est la condition.",
          "« des malades » désigne le groupe dans lequel on se place : c'est l'indice.",
          "On cherche alors la proportion de tests positifs DANS ce groupe.",
          "La phrase s'écrit $P_{\\text{Malade}}(\\text{T+}) = 0{,}8$, une branche de second niveau."
        ),
      };
    },
  },

  // ============================================================
  // proba_arbre_chemins — additionner les chemins qui mènent à l'évènement
  // ⛔ Sans jamais nommer ni poser la formule des probabilites totales.
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_pcond_chemins_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 3,
    theme: "neutral",
    text: "Un évènement est atteint par PLUSIEURS chemins d'un arbre. Comment obtient-on sa probabilité ?",
    format: "qcm",
    choices: [
      "en additionnant les probabilités de ces chemins",
      "en multipliant les probabilités de ces chemins",
      "en prenant le chemin le plus probable",
      "en prenant la moyenne des chemins",
    ],
    expected: ["en additionnant les probabilités de ces chemins"],
    comparator: "mcq_exact",
    hint: "On multiplie LE LONG d'un chemin, on additionne ENTRE les chemins.",
    explanation: exp(
      "Deux chemins distincts d'un arbre décrivent des situations qui s'excluent.",
      "On calcule d'abord chaque chemin par un produit, puis on les rassemble.",
      "Des cas incompatibles voient leurs probabilités s'additionner.",
      "On multiplie le long d'un chemin, on additionne entre les chemins — deux gestes à ne pas intervertir."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux chemins mènent à « T+ » : celui des malades et celui des sains.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      return {
        text: `Sur cet arbre, calculer $P(\\text{T+})$ : la probabilité qu'une personne tirée au hasard ait un test positif.`,
        format: "short",
        expected: [fmt(d.pPositif, 4), String(Math.round(d.pPositif * 10000) / 10000)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Un test positif s'obtient de deux façons : en étant malade, ou en étant sain avec un faux positif.",
          "On calcule les deux chemins, puis on les additionne.",
          `$${fmt(d.cheminMaladePositif)} + ${fmt(d.cheminSainPositif, 4)} = ${fmt(d.pPositif, 4)}$.`,
          `$P(\\text{T+}) = ${fmt(d.pPositif, 4)}$ — la somme des chemins qui aboutissent à « T+ ».`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne les deux chemins qui finissent sur « T− ».",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      const negatif = Math.round((1 - d.pPositif) * 10000) / 10000;
      return {
        text: `Sur cet arbre, calculer $P(\\text{T−})$ : la probabilité que le test soit négatif.`,
        format: "short",
        expected: [fmt(negatif, 4), String(negatif)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Deux chemins mènent à un test négatif : celui des malades non détectés et celui des sains bien testés.",
          "On peut les additionner, ou passer par l'évènement contraire.",
          `Par le contraire : $1 - ${fmt(d.pPositif, 4)} = ${fmt(negatif, 4)}$.`,
          `$P(\\text{T−}) = ${fmt(negatif, 4)}$ — et les deux méthodes doivent donner le même nombre.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène la probabilité à un effectif : combien de personnes sur mille ?",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      const surMille = Math.round(d.pPositif * 1000);
      return {
        text: `Sur cet arbre, on dépiste $1000$ personnes. Combien environ auront un test positif ?`,
        format: "short",
        expected: [String(surMille)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Une probabilité se lit comme une proportion d'un effectif.",
          "On calcule $P(\\text{T+})$ en additionnant les chemins, puis on multiplie par $1000$.",
          `$P(\\text{T+}) = ${fmt(d.pPositif, 4)}$, donc $${fmt(d.pPositif, 4)} \\times 1000 \\approx ${surMille}$.`,
          `Environ $${surMille}$ personnes sur $1000$ auront un test positif — alors que seules $${Math.round(d.pMalade * 1000)}$ sont réellement malades.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 5,
    theme: "neutral",
    hint: "Un seul chemin décrit « malade ET test négatif ».",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      const rate = Math.round(d.pMalade * (1 - d.pTestSiMalade) * 10000) / 10000;
      return {
        text: `Sur cet arbre, quelle est la probabilité qu'une personne soit malade ET que son test soit négatif ?`,
        format: "short",
        expected: [fmt(rate, 4), String(rate)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "C'est un seul chemin : on multiplie, on n'additionne pas.",
          "On suit « Malade » puis « T− ».",
          `$${fmt(d.pMalade)} \\times ${fmt(1 - d.pTestSiMalade)} = ${fmt(rate, 4)}$.`,
          `$${fmt(rate, 4)}$ — ce sont les FAUX NÉGATIFS, les malades que le test laisse passer.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "Le geste dépend du nombre de chemins concernés.",
    tags: ["seconde", "maths", "probabilites", "arbre", "piege", "template", "qcm"],
    generate: () => {
      const d = depistage();
      const faux = Math.round(d.pMalade * d.pTestSiSain * 10000) / 10000;
      return {
        text: `Sur cet arbre, quel calcul donne $P(\\text{T+})$ ?`,
        format: "qcm",
        choices: choixDistincts(
          `$${fmt(d.pMalade)} \\times ${fmt(d.pTestSiMalade)} + ${fmt(d.pSain)} \\times ${fmt(d.pTestSiSain)}$`,
          [
            `$${fmt(d.pTestSiMalade)} + ${fmt(d.pTestSiSain)}$`,
            `$${fmt(d.pMalade)} \\times ${fmt(d.pTestSiSain)}$`,
            `$${fmt(d.pMalade)} \\times ${fmt(d.pTestSiMalade)}$`,
          ],
          [`$${fmt(faux, 4)}$`]
        ),
        expected: [
          `$${fmt(d.pMalade)} \\times ${fmt(d.pTestSiMalade)} + ${fmt(d.pSain)} \\times ${fmt(d.pTestSiSain)}$`,
        ],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "On multiplie le long de chaque chemin, puis on additionne les chemins.",
          "Deux chemins aboutissent à « T+ » : par « Malade » et par « Sain ».",
          `On écrit donc $${fmt(d.pMalade)} \\times ${fmt(d.pTestSiMalade)} + ${fmt(d.pSain)} \\times ${fmt(d.pTestSiSain)}$.`,
          "Additionner directement les deux pondérations de branches n'a aucun sens : elles ne portent pas sur la même population."
        ),
      };
    },
  },

  // ============================================================
  // proba_tableau_croise — la conditionnelle lue sur des effectifs
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_pcond_tab_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un tableau croisé d'effectifs, que prend-on comme DÉNOMINATEUR pour calculer une probabilité conditionnelle ?",
    format: "qcm",
    choices: [
      "le total de la ligne ou de la colonne donnée par la condition",
      "toujours l'effectif total",
      "l'effectif de la case cherchée",
      "la somme des deux totaux",
    ],
    expected: ["le total de la ligne ou de la colonne donnée par la condition"],
    comparator: "mcq_exact",
    hint: "« Sachant que… » désigne une ligne ou une colonne du tableau.",
    explanation: exp(
      "Conditionner revient à ne plus regarder que la ligne, ou la colonne, imposée par la condition.",
      "On repère cette ligne ou cette colonne, puis on y prend la case cherchée.",
      "Le dénominateur est le total de cette ligne ou de cette colonne, pas l'effectif général.",
      "C'est là toute la différence avec une probabilité ordinaire, qui divise par le total du tableau."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 3,
    theme: "neutral",
    hint: "La condition est « être malade » : reste sur cette LIGNE.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([20, 25, 40, 50]);
      const sains = choisir([200, 400, 500, 800]);
      const part = choisir([0.8, 0.9]);
      const posM = Math.round(malades * part);
      const posS = Math.round(sains * choisir([0.05, 0.1, 0.2]));
      return {
        text: `Sur ce tableau, on tire une personne au hasard. Sachant qu'elle est malade, quelle est la probabilité que son test soit positif ?`,
        format: "short",
        expected: [fmt(posM / malades), String(Math.round((posM / malades) * 1000) / 1000)],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "Conditionner par « malade », c'est se restreindre à la ligne des malades.",
          "On divise l'effectif des tests positifs de cette ligne par son total.",
          `$\\dfrac{${posM}}{${malades}} = ${fmt(posM / malades)}$.`,
          `$P_{\\text{Malade}}(\\text{T+}) = ${fmt(posM / malades)}$ — le total général $${malades + sains}$ n'intervient pas.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 4,
    theme: "neutral",
    hint: "Cette fois la condition est « test positif » : reste sur cette COLONNE.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([20, 25, 40, 50]);
      const sains = choisir([200, 400, 500]);
      const posM = Math.round(malades * choisir([0.8, 0.9]));
      const posS = Math.round(sains * choisir([0.05, 0.1, 0.2]));
      const total = posM + posS;
      return {
        text: `Sur ce tableau, on tire une personne au hasard. Sachant que son test est positif, quelle est la probabilité qu'elle soit malade ? (arrondir au centième)`,
        format: "short",
        expected: [
          fmt(Math.round((posM / total) * 100) / 100, 2),
          String(Math.round((posM / total) * 100) / 100),
        ],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "La condition a changé de sens : elle porte maintenant sur la colonne des tests positifs.",
          "On divise les malades de cette colonne par le total de la colonne.",
          `$\\dfrac{${posM}}{${total}} \\approx ${fmt(Math.round((posM / total) * 100) / 100, 2)}$.`,
          `$P_{\\text{T+}}(\\text{Malade}) \\approx ${fmt(Math.round((posM / total) * 100) / 100, 2)}$ — et ce n'est pas du tout la même chose que $P_{\\text{Malade}}(\\text{T+})$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 3,
    theme: "neutral",
    hint: "Ici aucune condition : c'est le total du tableau qui sert de dénominateur.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([20, 25, 50]);
      const sains = choisir([200, 400, 500]);
      const posM = Math.round(malades * choisir([0.8, 0.9]));
      const posS = Math.round(sains * choisir([0.05, 0.1, 0.2]));
      const total = malades + sains;
      return {
        text: `Sur ce tableau, quelle est la probabilité qu'une personne tirée au hasard soit à la fois malade ET positive ? (arrondir au millième)`,
        format: "short",
        expected: [
          fmt(Math.round((posM / total) * 1000) / 1000),
          String(Math.round((posM / total) * 1000) / 1000),
        ],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "Une intersection, sans condition, se rapporte à la population entière.",
          "On prend la case « malades et test + » et on la divise par le total général.",
          `$\\dfrac{${posM}}{${total}} \\approx ${fmt(Math.round((posM / total) * 1000) / 1000)}$.`,
          `$P(\\text{Malade} \\cap \\text{T+}) \\approx ${fmt(Math.round((posM / total) * 1000) / 1000)}$ : même case que tout à l'heure, mais un dénominateur différent.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde quel total sert de dénominateur dans chaque cas.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "piege", "template", "qcm"],
    generate: () => {
      const malades = choisir([20, 25, 50]);
      const sains = choisir([400, 500]);
      const posM = Math.round(malades * 0.9);
      const posS = Math.round(sains * choisir([0.05, 0.1]));
      const total = malades + sains;
      return {
        text: `Sur ce tableau, quelle fraction donne $P_{\\text{Malade}}(\\text{T+})$ ?`,
        format: "qcm",
        choices: choixDistincts(
          `$\\dfrac{${posM}}{${malades}}$`,
          [
            `$\\dfrac{${posM}}{${posM + posS}}$`,
            `$\\dfrac{${posM}}{${total}}$`,
            `$\\dfrac{${malades}}{${total}}$`,
          ],
          [`$\\dfrac{${posS}}{${sains}}$`]
        ),
        expected: [`$\\dfrac{${posM}}{${malades}}$`],
        comparator: "mcq_exact",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "L'indice désigne la condition, donc la ligne ou la colonne où l'on se place.",
          "Ici l'indice est « Malade » : on reste sur la ligne des malades.",
          `Le numérateur est la case des positifs de cette ligne, $${posM}$, et le dénominateur son total, $${malades}$.`,
          `$P_{\\text{Malade}}(\\text{T+}) = \\dfrac{${posM}}{${malades}}$ — diviser par $${posM + posS}$ donnerait $P_{\\text{T+}}(\\text{Malade})$, une tout autre question.`
        ),
      };
    },
  },

  // ============================================================
  // proba_faux_positifs — PA(B) n'est pas PB(A)
  // ============================================================

  {
    kind: "fixed",
    id: "seconde_pcond_faux_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 3,
    theme: "neutral",
    text: "« $90$ % des malades ont un test positif » et « $90$ % des personnes positives sont malades » : ces deux phrases disent-elles la même chose ?",
    format: "qcm",
    choices: [
      "non, ce sont $P_{\\text{Malade}}(\\text{T+})$ et $P_{\\text{T+}}(\\text{Malade})$",
      "oui, ce sont deux façons de dire $0{,}9$",
      "oui, car l'intersection est la même",
      "non, mais elles sont toujours proches",
    ],
    expected: ["non, ce sont $P_{\\text{Malade}}(\\text{T+})$ et $P_{\\text{T+}}(\\text{Malade})$"],
    comparator: "mcq_exact",
    hint: "Dans chaque phrase, demande-toi de quel groupe on parle.",
    explanation: exp(
      "Deux conditionnelles inversées portent sur des populations différentes.",
      "On repère le groupe désigné après « des » : les malades, puis les positifs.",
      "La première divise par le nombre de malades, la seconde par le nombre de positifs.",
      "$P_{\\text{Malade}}(\\text{T+}) \\neq P_{\\text{T+}}(\\text{Malade})$ — les confondre est l'erreur classique des faux positifs."
    ),
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_pcond_faux_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    text: "Une maladie touche $1$ personne sur $1000$ et le test se trompe rarement. Pourtant, parmi les personnes positives, beaucoup sont saines. Pourquoi ?",
    format: "qcm",
    choices: [
      "parce que les personnes saines sont bien plus nombreuses",
      "parce que le test est mal conçu",
      "parce que la maladie est contagieuse",
      "parce que la probabilité dépasse $1$",
    ],
    expected: ["parce que les personnes saines sont bien plus nombreuses"],
    comparator: "mcq_exact",
    hint: "Un petit pourcentage d'un très grand groupe peut dépasser un grand pourcentage d'un tout petit groupe.",
    explanation: exp(
      "La probabilité d'un chemin dépend autant de la branche que de la taille du groupe de départ.",
      "On compare les deux chemins qui mènent à « T+ ».",
      "Un faible taux d'erreur appliqué à $999$ personnes saines produit plus de positifs qu'un excellent taux appliqué à $1$ malade.",
      "C'est le paradoxe des faux positifs : la rareté de la maladie compte autant que la qualité du test."
    ),
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    hint: "Divise le chemin des vrais positifs par TOUS les positifs.",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      const arrondi = Math.round(d.pMaladeSiPositif * 100) / 100;
      return {
        text: `Sur cet arbre, une personne a un test positif. Quelle est la probabilité qu'elle soit réellement malade ? (arrondir au centième)`,
        format: "short",
        expected: [fmt(arrondi, 2), String(arrondi)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "On cherche $P_{\\text{T+}}(\\text{Malade})$ : la condition est maintenant le test, pas la maladie.",
          "On divise le chemin des vrais positifs par la probabilité totale d'être positif.",
          `$\\dfrac{${fmt(d.cheminMaladePositif)}}{${fmt(d.pPositif, 4)}} \\approx ${fmt(arrondi, 2)}$.`,
          `Environ $${fmt(arrondi, 2)}$ — bien loin de $${fmt(d.pTestSiMalade)}$, la fiabilité annoncée du test.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis chaque phrase en repérant le groupe dont on parle.",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "langue", "template", "qcm"],
    generate: () => {
      const d = depistage();
      return {
        text: "« Parmi les personnes dont le test est positif, une sur trois est malade. » Que traduit cette phrase ?",
        format: "qcm",
        choices: [
          "$P_{\\text{T+}}(\\text{Malade})$",
          "$P_{\\text{Malade}}(\\text{T+})$",
          "$P(\\text{Malade} \\cap \\text{T+})$",
          "$P(\\text{Malade})$",
        ],
        expected: ["$P_{\\text{T+}}(\\text{Malade})$"],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Le groupe nommé après « parmi » est la condition.",
          "Ici on se place parmi les tests positifs, et l'on y cherche les malades.",
          "La condition est donc « T+ », et l'évènement étudié « Malade ».",
          "La phrase traduit $P_{\\text{T+}}(\\text{Malade})$ — l'arbre, lui, donne directement l'autre sens."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux chemins qui mènent à « T+ ».",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "canvas", "template", "qcm"],
    generate: () => {
      const d = depistage();
      const plusDeFaux = d.cheminSainPositif > d.cheminMaladePositif;
      return {
        text: `Sur cet arbre, parmi toutes les personnes dont le test est positif, lesquelles sont les plus nombreuses ?`,
        format: "qcm",
        choices: choixDistincts(
          plusDeFaux ? "les personnes saines (faux positifs)" : "les personnes malades (vrais positifs)",
          [
            plusDeFaux ? "les personnes malades (vrais positifs)" : "les personnes saines (faux positifs)",
            "il y en a exactement autant",
            "on ne peut pas le savoir avec un arbre",
          ],
          ["cela dépend de la taille de la population"]
        ),
        expected: [plusDeFaux ? "les personnes saines (faux positifs)" : "les personnes malades (vrais positifs)"],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Il faut comparer les deux chemins qui aboutissent à « T+ », pas les pondérations des branches.",
          "On calcule chaque chemin par un produit, puis on compare les résultats.",
          `Vrais positifs : $${fmt(d.cheminMaladePositif)}$ ; faux positifs : $${fmt(d.cheminSainPositif, 4)}$.`,
          plusDeFaux
            ? "Les faux positifs l'emportent : la maladie est trop rare pour que le test suffise à conclure."
            : "Les vrais positifs l'emportent ici — mais changez la rareté de la maladie et la conclusion s'inverse."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    hint: "Combien de sains sur mille, et quelle part d'entre eux est positive ?",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      const fauxSurMille = Math.round(d.cheminSainPositif * 1000);
      return {
        text: `Sur cet arbre, on dépiste $1000$ personnes. Combien environ seront positives ALORS QU'ELLES SONT SAINES ?`,
        format: "short",
        expected: [String(fauxSurMille)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Les faux positifs suivent le chemin « Sain » puis « T+ ».",
          "On multiplie les deux branches, puis on rapporte à $1000$ personnes.",
          `$${fmt(d.pSain)} \\times ${fmt(d.pTestSiSain)} = ${fmt(d.cheminSainPositif, 4)}$, donc environ $${fauxSurMille}$ personnes.`,
          `$${fauxSurMille}$ personnes saines seront inquiétées pour rien — c'est ce chiffre qui décide si un dépistage de masse a du sens.`
        ),
      };
    },
  },

  /* ---- complements : proba_arbre_chemins ---- */

  {
    kind: "fixed",
    id: "seconde_pcond_chemins_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi ne peut-on PAS obtenir $P(\\text{T+})$ en additionnant directement les deux pondérations des branches « T+ » ?",
    format: "qcm",
    choices: [
      "parce qu'elles portent sur deux populations de tailles différentes",
      "parce qu'une probabilité ne s'additionne jamais",
      "parce qu'il faudrait les multiplier entre elles",
      "parce que leur somme dépasserait toujours $1$",
    ],
    expected: ["parce qu'elles portent sur deux populations de tailles différentes"],
    comparator: "mcq_exact",
    hint: "L'une parle des malades, l'autre des sains — et ils ne sont pas aussi nombreux.",
    explanation: exp(
      "Une pondération de second niveau est une proportion À L'INTÉRIEUR de son groupe de départ.",
      "On regarde à quoi chaque nombre se rapporte avant d'oser une addition.",
      "L'une est une part des malades, l'autre une part des sains : additionner reviendrait à mélanger deux échelles.",
      "Il faut d'abord ramener chacune à la population entière en multipliant par la première branche — puis seulement additionner."
    ),
    tags: ["seconde", "maths", "probabilites", "arbre", "piege", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux machines produisent des pièces : deux chemins mènent au défaut.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const partA = choisir([0.4, 0.5, 0.6, 0.75]);
      const defA = choisir([0.02, 0.04, 0.05]);
      const defB = choisir([0.01, 0.02, 0.1]);
      const total = Math.round((partA * defA + (1 - partA) * defB) * 10000) / 10000;
      return {
        text: `Une usine a deux machines. La machine A produit $${fmt(partA)}$ des pièces, la machine B le reste. $${fmt(defA)}$ des pièces de A sont défectueuses, contre $${fmt(defB)}$ pour B. Quelle est la probabilité qu'une pièce prise au hasard soit défectueuse ?`,
        format: "short",
        expected: [fmt(total, 4), String(total)],
        comparator: "number_equal",
        canvas: {
          kind: "arbre_proba",
          titre: "Deux machines — D : pièce défectueuse",
          racineEnfants: [
            { label: "A", proba: fmt(partA), enfants: [{ label: "D", proba: fmt(defA) }, { label: "OK", proba: fmt(1 - defA) }] },
            { label: "B", proba: fmt(1 - partA), enfants: [{ label: "D", proba: fmt(defB) }, { label: "OK", proba: fmt(1 - defB) }] },
          ],
        },
        explanation: exp(
          "Une pièce défectueuse peut venir de A ou de B : deux chemins mènent au même évènement.",
          "On multiplie le long de chaque chemin, puis on additionne les deux résultats.",
          `$${fmt(partA)} \\times ${fmt(defA)} + ${fmt(1 - partA)} \\times ${fmt(defB)} = ${fmt(total, 4)}$.`,
          `La probabilité vaut $${fmt(total, 4)}$ — le même geste que pour un dépistage, sur un tout autre sujet.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 5,
    theme: "neutral",
    hint: "Les malades non détectés suivent un seul chemin.",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "short"],
    generate: () => {
      const d = depistage();
      const rates = Math.round(d.pMalade * (1 - d.pTestSiMalade) * 1000);
      return {
        text: `Sur cet arbre, on dépiste $1000$ personnes. Combien environ seront malades SANS que le test le détecte ?`,
        format: "short",
        expected: [String(rates)],
        comparator: "number_equal",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Ces personnes suivent le chemin « Malade » puis « T− » : les faux négatifs.",
          "On multiplie les deux branches, puis on rapporte à $1000$ personnes.",
          `$${fmt(d.pMalade)} \\times ${fmt(1 - d.pTestSiMalade)} = ${fmt(d.pMalade * (1 - d.pTestSiMalade), 4)}$, soit environ $${rates}$ personnes.`,
          `Environ $${rates}$ malades passeraient au travers — l'autre risque du dépistage, symétrique des faux positifs.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_chemins_tpl_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_arbre_chemins",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de feuilles de l'arbre portent l'étiquette cherchée ?",
    tags: ["seconde", "maths", "probabilites", "arbre", "canvas", "template", "qcm"],
    generate: () => {
      const d = depistage();
      return {
        text: "Sur cet arbre, combien de chemins complets aboutissent à un test positif ?",
        format: "qcm",
        choices: ["$2$", "$1$", "$3$", "$4$"],
        expected: ["$2$"],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Un chemin complet part de la racine et va jusqu'à une feuille.",
          "On compte les feuilles portant l'étiquette « T+ ».",
          "Il y en a une sous « Malade » et une sous « Sain ».",
          "Deux chemins mènent à « T+ » : c'est pour cela qu'il faudra additionner deux produits."
        ),
      };
    },
  },

  /* ---- complements : proba_tableau_croise ---- */

  {
    kind: "fixed",
    id: "seconde_pcond_tab_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un tableau croisé, $P(A \\cap B)$ et $P_A(B)$ utilisent-elles la même case ?",
    format: "qcm",
    choices: [
      "oui, la même case, mais pas le même dénominateur",
      "non, deux cases différentes",
      "oui, et le même dénominateur",
      "non, $P_A(B)$ n'utilise aucune case",
    ],
    expected: ["oui, la même case, mais pas le même dénominateur"],
    comparator: "mcq_exact",
    hint: "Le numérateur ne change pas ; regarde par quoi on divise.",
    explanation: exp(
      "Les deux probabilités partent du même croisement d'effectifs.",
      "On compare ce qui sert de référence dans chaque cas.",
      "$P(A \\cap B)$ divise par l'effectif TOTAL, $P_A(B)$ par le total de la ligne $A$.",
      "Même numérateur, dénominateur différent — et donc deux nombres différents."
    ),
    tags: ["seconde", "maths", "probabilites", "tableau", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 3,
    theme: "neutral",
    hint: "La condition est « être sain » : reste sur cette ligne.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([20, 25, 50]);
      const sains = choisir([200, 400, 500]);
      const posM = Math.round(malades * choisir([0.8, 0.9]));
      const posS = Math.round(sains * choisir([0.05, 0.1, 0.2]));
      const negS = sains - posS;
      return {
        text: "Sur ce tableau, sachant qu'une personne est saine, quelle est la probabilité que son test soit négatif ?",
        format: "short",
        expected: [fmt(negS / sains), String(Math.round((negS / sains) * 1000) / 1000)],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "Conditionner par « saine », c'est se restreindre à la ligne des sains.",
          "On divise les tests négatifs de cette ligne par son total.",
          `$\\dfrac{${negS}}{${sains}} = ${fmt(negS / sains)}$.`,
          `$P_{\\text{Sain}}(\\text{T−}) = ${fmt(negS / sains)}$ : c'est la capacité du test à rassurer à juste titre.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 3,
    theme: "neutral",
    hint: "Aucune condition ici : le total de la colonne sur le total général.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([20, 50]);
      const sains = choisir([200, 400, 500]);
      const posM = Math.round(malades * choisir([0.8, 0.9]));
      const posS = Math.round(sains * choisir([0.05, 0.1, 0.2]));
      const total = malades + sains;
      const p = Math.round(((posM + posS) / total) * 1000) / 1000;
      return {
        text: "Sur ce tableau, quelle est la probabilité qu'une personne tirée au hasard ait un test positif ? (arrondir au millième)",
        format: "short",
        expected: [fmt(p), String(p)],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "Sans condition, la référence est la population entière.",
          "On prend le total de la colonne « Test + » et on le divise par le total général.",
          `$\\dfrac{${posM + posS}}{${total}} \\approx ${fmt(p)}$.`,
          `$P(\\text{T+}) \\approx ${fmt(p)}$ — le tableau donne d'un coup ce que l'arbre obtient en additionnant deux chemins.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 4,
    theme: "neutral",
    hint: "Une ligne se complète toujours à son total.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([25, 40, 50]);
      const sains = choisir([200, 400]);
      const posM = Math.round(malades * choisir([0.8, 0.9]));
      const posS = Math.round(sains * choisir([0.05, 0.1]));
      return {
        text: `Sur ce tableau, combien de malades ont un test NÉGATIF ?`,
        format: "short",
        expected: [String(malades - posM)],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "Dans un tableau croisé, chaque ligne se répartit entre ses colonnes.",
          "On retranche au total de la ligne l'effectif de l'autre colonne.",
          `$${malades} - ${posM} = ${malades - posM}$.`,
          `$${malades - posM}$ malades ont un test négatif : ce sont les faux négatifs, lisibles directement sur le tableau.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_tab_tpl_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_tableau_croise",
    difficulty: 5,
    theme: "neutral",
    hint: "Convertis la conditionnelle en pourcentage de sa propre ligne.",
    tags: ["seconde", "maths", "probabilites", "tableau", "canvas", "template", "short"],
    generate: () => {
      const malades = choisir([20, 25, 50]);
      const sains = choisir([200, 400]);
      const part = choisir([0.8, 0.9]);
      const posM = Math.round(malades * part);
      const posS = Math.round(sains * choisir([0.05, 0.1]));
      return {
        text: "Sur ce tableau, quel POURCENTAGE des malades a un test positif ?",
        format: "short",
        expected: [String(Math.round(part * 100))],
        comparator: "number_equal",
        canvas: tableauCroise(malades, sains, posM, posS),
        explanation: exp(
          "Un pourcentage « des malades » est une probabilité conditionnelle exprimée sur cent.",
          "On divise dans la ligne des malades, puis on multiplie par cent.",
          `$\\dfrac{${posM}}{${malades}} \\times 100 = ${Math.round(part * 100)}$.`,
          `$${Math.round(part * 100)}$ % des malades sont détectés — c'est $P_{\\text{Malade}}(\\text{T+})$ dit autrement.`
        ),
      };
    },
  },

  /* ---- complements : proba_faux_positifs ---- */

  {
    kind: "fixed",
    id: "seconde_pcond_faux_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    text: "Pour décider si un dépistage de masse est utile, quel nombre faut-il regarder ?",
    format: "qcm",
    choices: [
      "$P_{\\text{T+}}(\\text{Malade})$, la part de vrais malades parmi les positifs",
      "$P_{\\text{Malade}}(\\text{T+})$, la fiabilité annoncée du test",
      "$P(\\text{Malade})$, la rareté de la maladie seule",
      "le nombre de personnes dépistées",
    ],
    expected: ["$P_{\\text{T+}}(\\text{Malade})$, la part de vrais malades parmi les positifs"],
    comparator: "mcq_exact",
    hint: "Place-toi du côté de la personne qui reçoit un résultat positif.",
    explanation: exp(
      "La question utile est celle que se pose la personne testée, pas celle du fabricant du test.",
      "On identifie la condition réellement connue : le résultat du test, et non l'état de santé.",
      "Ce qui compte est donc la proportion de malades PARMI les positifs.",
      "$P_{\\text{T+}}(\\text{Malade})$ est le bon indicateur — et il chute quand la maladie est rare, même avec un excellent test."
    ),
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule les deux, puis compare.",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "canvas", "template", "qcm"],
    generate: () => {
      const d = depistage();
      const inverse = Math.round(d.pMaladeSiPositif * 100) / 100;
      return {
        text: `Sur cet arbre, comparer $P_{\\text{Malade}}(\\text{T+})$ et $P_{\\text{T+}}(\\text{Malade})$.`,
        format: "qcm",
        choices: choixDistincts(
          `$P_{\\text{Malade}}(\\text{T+}) = ${fmt(d.pTestSiMalade)}$ est bien plus grande`,
          [
            `$P_{\\text{T+}}(\\text{Malade}) \\approx ${fmt(inverse, 2)}$ est bien plus grande`,
            "les deux sont égales",
            "on ne peut pas les comparer",
          ],
          ["elles valent toutes deux $0{,}5$"]
        ),
        expected: [`$P_{\\text{Malade}}(\\text{T+}) = ${fmt(d.pTestSiMalade)}$ est bien plus grande`],
        comparator: "mcq_exact",
        canvas: arbreDepistage(d),
        explanation: exp(
          "Les deux conditionnelles inversées se calculent séparément, puis se comparent.",
          "La première se lit sur une branche ; la seconde demande de diviser un chemin par la somme des chemins positifs.",
          `$P_{\\text{Malade}}(\\text{T+}) = ${fmt(d.pTestSiMalade)}$, tandis que $P_{\\text{T+}}(\\text{Malade}) \\approx ${fmt(inverse, 2)}$.`,
          "Le test est fiable sur les malades, et pourtant un positif n'est pas si souvent malade : les deux nombres ne se remplacent jamais."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 5,
    theme: "neutral",
    hint: "Si les malades se raréfient, les faux positifs pèsent relativement plus lourd.",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "template", "qcm"],
    generate: () => {
      const d = depistage();
      return {
        text: `Le test ne change pas, mais la maladie devient DIX FOIS plus rare. Que devient $P_{\\text{T+}}(\\text{Malade})$, la probabilité d'être malade quand le test est positif ?`,
        format: "qcm",
        choices: [
          "elle diminue fortement",
          "elle ne change pas",
          "elle augmente",
          "elle est multipliée par dix",
        ],
        expected: ["elle diminue fortement"],
        comparator: "mcq_exact",
        explanation: exp(
          "Cette probabilité compare le chemin des vrais positifs à celui de tous les positifs.",
          "On regarde ce que la rareté change dans chacun des deux chemins.",
          "Le chemin des vrais positifs est divisé par dix, tandis que celui des faux positifs bouge à peine.",
          "Elle diminue fortement : à test constant, plus la maladie est rare, moins un résultat positif est informatif."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_pcond_faux_tpl_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "probabilites_conditionnelles_2de",
    microId: "proba_faux_positifs",
    difficulty: 4,
    theme: "neutral",
    hint: "Une alarme qui sonne, ce n'est pas la même chose qu'un vol qui déclenche l'alarme.",
    tags: ["seconde", "maths", "probabilites", "faux-positifs", "langue", "template", "qcm"],
    generate: () => {
      const p = choisir([90, 95, 99]);
      return {
        text: `Une alarme se déclenche dans $${p}$ % des vols. Peut-on en conclure que $${p}$ % des déclenchements correspondent à un vol ?`,
        format: "qcm",
        choices: [
          "non, cela dépend du nombre de déclenchements sans vol",
          "oui, c'est la même proportion",
          "oui, si l'alarme est bien réglée",
          "non, ce serait plutôt davantage",
        ],
        expected: ["non, cela dépend du nombre de déclenchements sans vol"],
        comparator: "mcq_exact",
        explanation: exp(
          "Les deux phrases échangent la condition et l'évènement étudié.",
          "On identifie le groupe de référence : les vols d'abord, les déclenchements ensuite.",
          `$P_{\\text{vol}}(\\text{alarme}) = ${fmt(p / 100)}$ ne dit rien de $P_{\\text{alarme}}(\\text{vol})$ tant qu'on ignore les fausses alertes.`,
          "Non : si l'alarme sonne souvent pour un chat, la plupart des déclenchements ne seront pas des vols — exactement le paradoxe des faux positifs."
        ),
      };
    },
  },
];
