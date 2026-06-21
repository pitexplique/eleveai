// lib/tutor-v4/questionBank/seconde/maths/information-chiffree.bank.ts
//
// Chapitre : Information chiffree - proportions, pourcentages, evolutions
// (notion information_chiffree_evolutions)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Canvas : "stat_graph" (camembert pour proportions, barres) et "tableau_donnees"
// (avant/apres pour les evolutions). PAS de tableau_proportionnalite (saisie non reliee).
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   info_proportion              — Proportion / pourcentage d'une sous-population
//   info_pourcentage_de_pourcentage — Pourcentage d'un pourcentage
//   info_variation_absolue_relative — Variation absolue vs relative
//   info_taux_evolution          — Taux d'evolution et coefficient multiplicateur
//   info_evolutions_successives  — Composer des evolutions
//   info_evolution_reciproque    — Evolution reciproque

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

function camembert(data: { label: string; value: number; color?: string }[]): CanvasFigure {
  return {
    kind: "stat_graph",
    graphType: "camembert",
    data,
    display: { showLabels: true, showValues: true },
    size: { width: 300, height: 240 },
  };
}

function tableauAvantApres(
  title: string,
  headers: [string, string],
  label: string,
  v1: number | string,
  v2: number | string
): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title,
    headers,
    rows: [{ label, values: [v1, v2] }],
  };
}

export const informationChiffreeBank: TutorBankItemV4[] = [
  /* ===================== INFO_PROPORTION ===================== */

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de $30$ élèves, $12$ sont des filles. Quelle est la proportion de filles, en pourcentage ?",
    format: "short",
    expected: ["40"],
    comparator: "number_equal",
    canvas: camembert([
      { label: "Filles : 12", value: 12, color: "#f472b6" },
      { label: "Garçons : 18", value: 18, color: "#60a5fa" },
    ]),
    hint: "Proportion $= \\dfrac{12}{30} \\times 100$.",
    explanation: exp(
      "Une proportion en pourcentage se calcule par $\\dfrac{\\text{partie}}{\\text{total}} \\times 100$.",
      "$\\dfrac{12}{30} \\times 100$.",
      "$= 0{,}4 \\times 100 = 40$.",
      "La proportion de filles est $40\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on la proportion (en %) d'une sous-population dans une population ?",
    format: "qcm",
    choices: [
      "$\\dfrac{\\text{effectif de la partie}}{\\text{effectif total}} \\times 100$",
      "$\\text{partie} \\times \\text{total}$",
      "$\\text{total} - \\text{partie}$",
      "$\\dfrac{\\text{total}}{\\text{partie}} \\times 100$",
    ],
    expected: ["$\\dfrac{\\text{effectif de la partie}}{\\text{effectif total}} \\times 100$"],
    comparator: "mcq_exact",
    hint: "Partie sur total.",
    explanation: exp(
      "Une proportion compare une partie au total.",
      "On divise l'effectif de la partie par l'effectif total.",
      "On multiplie par $100$ pour l'exprimer en pourcentage.",
      "$\\dfrac{\\text{partie}}{\\text{total}} \\times 100$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font $25\\,\\%$ de $80$ ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "$25\\,\\% = 0{,}25$ ; on multiplie par $80$.",
    explanation: exp(
      "Prendre $25\\,\\%$, c'est multiplier par $0{,}25$.",
      "$0{,}25 \\times 80$.",
      "$= 20$.",
      "$25\\,\\%$ de $80$ font $20$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 3,
    theme: "neutral",
    text: "Un magasin vend $200$ articles, dont $50$ sont en promotion. Quelle proportion (en %) est en promotion ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    canvas: tableauAvantApres("Magasin", ["En promo", "Total"], "Articles", 50, 200),
    hint: "$\\dfrac{50}{200} \\times 100$.",
    explanation: exp(
      "On calcule la proportion d'articles en promotion.",
      "$\\dfrac{50}{200} \\times 100$.",
      "$= 0{,}25 \\times 100 = 25$.",
      "$25\\,\\%$ des articles sont en promotion."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un club, $30\\,\\%$ des $200$ membres jouent au tennis. Combien de membres jouent au tennis ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$0{,}30 \\times 200$.",
    explanation: exp(
      "On applique le pourcentage à l'effectif total.",
      "$30\\,\\% \\times 200 = 0{,}30 \\times 200$.",
      "$= 60$.",
      "$60$ membres jouent au tennis."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 2,
    theme: "neutral",
    text: "Un pourcentage exprime avant tout :",
    format: "qcm",
    choices: ["une proportion (par rapport à 100)", "une longueur", "une aire", "une vitesse"],
    expected: ["une proportion (par rapport à 100)"],
    comparator: "mcq_exact",
    hint: "« Pour cent » = sur 100.",
    explanation: exp(
      "« Pour cent » signifie « sur 100 ».",
      "Un pourcentage rapporte une quantité à 100.",
      "C'est donc une proportion.",
      "Un pourcentage exprime une proportion."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_info_prop_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 2,
    theme: "neutral",
    hint: "Proportion $= \\dfrac{\\text{partie}}{\\text{total}} \\times 100$.",
    tags: ["seconde", "maths", "info_chiffree", "proportion", "template"],
    generate: () => {
      const total = [20, 25, 40, 50][randomInt(0, 3)];
      const pct = [10, 20, 25, 40, 50][randomInt(0, 4)];
      const partie = (pct * total) / 100;
      return {
        text: `Dans un groupe de $${total}$ personnes, $${partie}$ portent des lunettes. Quelle proportion (en %) ?`,
        format: "short",
        expected: [String(pct)],
        comparator: "number_equal",
        explanation: exp(
          "On calcule partie sur total fois 100.",
          `$\\dfrac{${partie}}{${total}} \\times 100$.`,
          `$= ${pct}$.`,
          `La proportion est $${pct}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_info_prop_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie le total par le pourcentage (en décimal).",
    tags: ["seconde", "maths", "info_chiffree", "proportion", "template"],
    generate: () => {
      const total = [80, 120, 200, 150, 60][randomInt(0, 4)];
      const pct = [10, 20, 25, 30, 50][randomInt(0, 4)];
      const partie = (pct * total) / 100;
      return {
        text: `Combien font $${pct}\\,\\%$ de $${total}$ ?`,
        format: "short",
        expected: [String(partie)],
        comparator: "number_equal",
        explanation: exp(
          "Prendre $p\\,\\%$, c'est multiplier par $\\dfrac{p}{100}$.",
          `$\\dfrac{${pct}}{100} \\times ${total}$.`,
          `$= ${partie}$.`,
          `$${pct}\\,\\%$ de $${total}$ font $${partie}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_info_prop_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_proportion",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $250$ votes, un candidat obtient $150$ voix. Quel pourcentage des voix a-t-il obtenu ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "$\\dfrac{150}{250} \\times 100$.",
    explanation: exp(
      "On calcule la proportion de voix obtenues.",
      "$\\dfrac{150}{250} \\times 100$.",
      "$= 0{,}6 \\times 100 = 60$.",
      "Il a obtenu $60\\,\\%$ des voix."
    ),
    tags: ["seconde", "maths", "info_chiffree", "proportion", "short"],
  },

  /* ===================== INFO_POURCENTAGE_DE_POURCENTAGE ===================== */

  {
    kind: "fixed",
    id: "seconde_info_pdp_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un lycée, $50\\,\\%$ des élèves sont des filles, et $20\\,\\%$ de ces filles font de l'allemand. Quelle proportion du lycée cela représente-t-il ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "On multiplie les proportions : $0{,}5 \\times 0{,}2$.",
    explanation: exp(
      "Un pourcentage d'un pourcentage se calcule en multipliant les proportions.",
      "$0{,}5 \\times 0{,}2 = 0{,}1$.",
      "$0{,}1 = 10\\,\\%$.",
      "Cela représente $10\\,\\%$ du lycée."
    ),
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_pdp_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Pour calculer « un pourcentage d'un pourcentage », on :",
    format: "qcm",
    choices: [
      "multiplie les deux proportions (en décimal)",
      "additionne les deux pourcentages",
      "soustrait les deux pourcentages",
      "prend le plus grand des deux",
    ],
    expected: ["multiplie les deux proportions (en décimal)"],
    comparator: "mcq_exact",
    hint: "$30\\,\\%$ de $50\\,\\% = 0{,}3 \\times 0{,}5$.",
    explanation: exp(
      "Appliquer un pourcentage à un autre revient à enchaîner deux proportions.",
      "On les multiplie sous forme décimale.",
      "Ex. $30\\,\\%$ de $50\\,\\% = 0{,}3 \\times 0{,}5 = 0{,}15 = 15\\,\\%$.",
      "On multiplie les deux proportions."
    ),
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_pdp_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Combien vaut $30\\,\\%$ de $50\\,\\%$ (en pourcentage) ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "$0{,}3 \\times 0{,}5$.",
    explanation: exp(
      "On multiplie les deux proportions.",
      "$0{,}3 \\times 0{,}5 = 0{,}15$.",
      "$0{,}15 = 15\\,\\%$.",
      "$30\\,\\%$ de $50\\,\\%$ font $15\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_pdp_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 4,
    theme: "neutral",
    text: "$10\\,\\%$ des $400$ habitants sont des enfants, et $50\\,\\%$ des enfants vont à l'école primaire. Combien d'habitants vont à l'école primaire ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "$10\\,\\%$ de $400 = 40$ enfants, puis $50\\,\\%$ de $40$.",
    explanation: exp(
      "On applique les pourcentages successivement.",
      "Enfants : $0{,}10 \\times 400 = 40$ ; primaire : $0{,}5 \\times 40$.",
      "$= 20$.",
      "$20$ habitants vont à l'école primaire."
    ),
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "short"],
  },

  {
    kind: "template",
    id: "seconde_info_pdp_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "On multiplie les proportions décimales.",
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "template"],
    generate: () => {
      const p = [10, 20, 40, 50][randomInt(0, 3)];
      const q = [10, 20, 50][randomInt(0, 2)];
      const r = (p * q) / 100;
      return {
        text: `Combien vaut $${p}\\,\\%$ de $${q}\\,\\%$ (en pourcentage) ?`,
        format: "short",
        expected: [String(r)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie les deux proportions sous forme décimale.",
          `$${p / 100} \\times ${q / 100} = ${r / 100}$.`,
          `$${r / 100} = ${r}\\,\\%$.`,
          `$${p}\\,\\%$ de $${q}\\,\\%$ font $${r}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_info_pdp_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 4,
    theme: "neutral",
    hint: "On applique les deux pourcentages au total.",
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "template"],
    generate: () => {
      const total = [200, 400, 500, 1000][randomInt(0, 3)];
      const p = [10, 20, 50][randomInt(0, 2)];
      const q = [10, 20, 50][randomInt(0, 2)];
      const sousGroupe = (p * total) / 100;
      const res = (q * sousGroupe) / 100;
      return {
        text: `$${p}\\,\\%$ des $${total}$ membres sont des juniors, et $${q}\\,\\%$ des juniors sont licenciés. Combien de membres sont des juniors licenciés ?`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: exp(
          "On applique les pourcentages l'un après l'autre.",
          `Juniors : $${p / 100} \\times ${total} = ${sousGroupe}$ ; licenciés : $${q / 100} \\times ${sousGroupe}$.`,
          `$= ${res}$.`,
          `Il y a $${res}$ juniors licenciés.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_info_pdp_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "$50\\,\\%$ de $50\\,\\%$ font-ils $100\\,\\%$ ?",
    format: "qcm",
    choices: ["Non, cela fait $25\\,\\%$", "Oui, $100\\,\\%$", "Non, $0\\,\\%$", "Oui, presque"],
    expected: ["Non, cela fait $25\\,\\%$"],
    comparator: "mcq_exact",
    hint: "On multiplie, on n'additionne pas.",
    explanation: exp(
      "On ne doit pas additionner les pourcentages ici.",
      "$0{,}5 \\times 0{,}5 = 0{,}25$.",
      "$0{,}25 = 25\\,\\%$.",
      "Non, cela fait $25\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_pdp_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_pourcentage_de_pourcentage",
    difficulty: 4,
    theme: "neutral",
    text: "Combien vaut $20\\,\\%$ de $40\\,\\%$ (en pourcentage) ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "$0{,}2 \\times 0{,}4$.",
    explanation: exp(
      "On multiplie les proportions.",
      "$0{,}2 \\times 0{,}4 = 0{,}08$.",
      "$0{,}08 = 8\\,\\%$.",
      "$20\\,\\%$ de $40\\,\\%$ font $8\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "pourcentage_de_pourcentage", "short"],
  },

  /* ===================== INFO_VARIATION_ABSOLUE_RELATIVE ===================== */

  {
    kind: "fixed",
    id: "seconde_info_var_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 2,
    theme: "neutral",
    text: "Un prix passe de $50\\,€$ à $60\\,€$. Quelle est la variation absolue (en €) ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    canvas: tableauAvantApres("Prix d'un article", ["Avant", "Après"], "Prix (€)", 50, 60),
    hint: "Variation absolue $= $ valeur finale $-$ valeur initiale.",
    explanation: exp(
      "La variation absolue est la différence entre les deux valeurs.",
      "$60 - 50$.",
      "$= 10$.",
      "La variation absolue est $+10\\,€$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "variation", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_var_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Un prix passe de $50\\,€$ à $60\\,€$. Quelle est la variation relative, en pourcentage ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    canvas: tableauAvantApres("Prix d'un article", ["Avant", "Après"], "Prix (€)", 50, 60),
    hint: "Variation relative $= \\dfrac{60 - 50}{50} \\times 100$.",
    explanation: exp(
      "La variation relative rapporte la variation à la valeur initiale.",
      "$\\dfrac{60 - 50}{50} \\times 100 = \\dfrac{10}{50} \\times 100$.",
      "$= 20$.",
      "La variation relative est $+20\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "variation", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_var_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la différence entre variation absolue et variation relative ?",
    format: "qcm",
    choices: [
      "L'absolue est une différence ; la relative est un pourcentage par rapport à la valeur initiale",
      "Ce sont deux noms pour la même chose",
      "L'absolue est en %, la relative en €",
      "La relative est toujours plus grande",
    ],
    expected: ["L'absolue est une différence ; la relative est un pourcentage par rapport à la valeur initiale"],
    comparator: "mcq_exact",
    hint: "Absolue = écart ; relative = taux.",
    explanation: exp(
      "Les deux variations ne mesurent pas la même chose.",
      "Absolue : différence brute (en unités). Relative : rapport à la valeur de départ (en %).",
      "Ex. $50 \\to 60$ : absolue $+10\\,€$, relative $+20\\,\\%$.",
      "L'absolue est une différence, la relative un pourcentage."
    ),
    tags: ["seconde", "maths", "info_chiffree", "variation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_var_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Une population passe de $200$ à $170$ habitants. Quelle est la variation absolue ?",
    format: "short",
    expected: ["-30"],
    comparator: "number_equal",
    hint: "$170 - 200$.",
    explanation: exp(
      "Variation absolue $=$ valeur finale $-$ valeur initiale.",
      "$170 - 200$.",
      "$= -30$ (c'est une baisse).",
      "La variation absolue est $-30$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "variation", "short"],
  },

  {
    kind: "template",
    id: "seconde_info_var_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 3,
    theme: "neutral",
    hint: "Variation relative $= \\dfrac{V_f - V_i}{V_i} \\times 100$.",
    tags: ["seconde", "maths", "info_chiffree", "variation", "template"],
    generate: () => {
      const vi = [50, 80, 100, 200, 25][randomInt(0, 4)];
      const t = [10, 20, 25, 40, 50][randomInt(0, 4)];
      const vf = vi + (t * vi) / 100;
      return {
        text: `Une valeur passe de $${vi}$ à $${vf}$. Quelle est la variation relative, en pourcentage ?`,
        format: "short",
        expected: [String(t)],
        comparator: "number_equal",
        canvas: tableauAvantApres("Évolution", ["Avant", "Après"], "Valeur", vi, vf),
        explanation: exp(
          "La variation relative rapporte l'écart à la valeur initiale.",
          `$\\dfrac{${vf} - ${vi}}{${vi}} \\times 100 = \\dfrac{${vf - vi}}{${vi}} \\times 100$.`,
          `$= ${t}$.`,
          `La variation relative est $+${t}\\,\\%$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_info_var_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 2,
    theme: "neutral",
    hint: "Variation absolue $= V_f - V_i$.",
    tags: ["seconde", "maths", "info_chiffree", "variation", "template"],
    generate: () => {
      const vi = randomInt(20, 90);
      const vf = randomInt(20, 120);
      return {
        text: `Une valeur passe de $${vi}$ à $${vf}$. Quelle est la variation absolue ?`,
        format: "short",
        expected: [String(vf - vi)],
        comparator: "number_equal",
        explanation: exp(
          "La variation absolue est la différence des valeurs.",
          `$${vf} - ${vi}$.`,
          `$= ${vf - vi}$.`,
          `La variation absolue est $${vf - vi}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_info_var_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Deux objets augmentent de $10\\,€$. L'un coûtait $20\\,€$, l'autre $200\\,€$. Pour lequel la hausse est-elle la plus importante (en relatif) ?",
    format: "qcm",
    choices: [
      "Celui à $20\\,€$ (hausse de $50\\,\\%$)",
      "Celui à $200\\,€$ (hausse de $5\\,\\%$)",
      "Identique pour les deux",
      "On ne peut pas comparer",
    ],
    expected: ["Celui à $20\\,€$ (hausse de $50\\,\\%$)"],
    comparator: "mcq_exact",
    hint: "Même variation absolue, mais compare en relatif.",
    explanation: exp(
      "À variation absolue égale, la variation relative dépend de la valeur de départ.",
      "$\\dfrac{10}{20} = 50\\,\\%$ contre $\\dfrac{10}{200} = 5\\,\\%$.",
      "La hausse relative est plus forte pour l'objet à $20\\,€$.",
      "Celui à $20\\,€$ ($+50\\,\\%$)."
    ),
    tags: ["seconde", "maths", "info_chiffree", "variation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_var_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_variation_absolue_relative",
    difficulty: 3,
    theme: "neutral",
    text: "Une valeur passe de $80$ à $100$. Quelle est la variation relative, en pourcentage ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "$\\dfrac{100 - 80}{80} \\times 100$.",
    explanation: exp(
      "On rapporte l'écart à la valeur initiale.",
      "$\\dfrac{100 - 80}{80} \\times 100 = \\dfrac{20}{80} \\times 100$.",
      "$= 25$.",
      "La variation relative est $+25\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "variation", "short"],
  },

  /* ===================== INFO_TAUX_EVOLUTION ===================== */

  {
    kind: "fixed",
    id: "seconde_info_taux_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Augmenter une quantité de $10\\,\\%$ revient à la multiplier par quel coefficient ?",
    format: "short",
    expected: ["1,1", "1.1"],
    comparator: "number_equal",
    hint: "$1 + \\dfrac{10}{100}$.",
    explanation: exp(
      "Le coefficient multiplicateur d'une hausse de $t\\,\\%$ est $1 + \\dfrac{t}{100}$.",
      "$1 + \\dfrac{10}{100} = 1 + 0{,}1$.",
      "$= 1{,}1$.",
      "On multiplie par $1{,}1$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_taux_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Diminuer une quantité de $30\\,\\%$ revient à la multiplier par quel coefficient ?",
    format: "short",
    expected: ["0,7", "0.7"],
    comparator: "number_equal",
    hint: "$1 - \\dfrac{30}{100}$.",
    explanation: exp(
      "Le coefficient multiplicateur d'une baisse de $t\\,\\%$ est $1 - \\dfrac{t}{100}$.",
      "$1 - 0{,}30$.",
      "$= 0{,}7$.",
      "On multiplie par $0{,}7$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_taux_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 3,
    theme: "neutral",
    text: "Un prix passe de $50\\,€$ à $60\\,€$. Quel est le taux d'évolution, en pourcentage ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    canvas: tableauAvantApres("Prix", ["Avant", "Après"], "Prix (€)", 50, 60),
    hint: "$\\dfrac{60 - 50}{50} \\times 100$.",
    explanation: exp(
      "Le taux d'évolution se calcule comme la variation relative.",
      "$\\dfrac{60 - 50}{50} \\times 100$.",
      "$= 20$.",
      "Le taux d'évolution est $+20\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "canvas", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_taux_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 3,
    theme: "neutral",
    text: "Le coefficient multiplicateur d'une évolution est $1{,}25$. Quel est le taux d'évolution ?",
    format: "qcm",
    choices: ["$+25\\,\\%$", "$+125\\,\\%$", "$-25\\,\\%$", "$+1{,}25\\,\\%$"],
    expected: ["$+25\\,\\%$"],
    comparator: "mcq_exact",
    hint: "$t = (CM - 1) \\times 100$.",
    explanation: exp(
      "Le taux se retrouve par $t = (CM - 1) \\times 100$.",
      "$(1{,}25 - 1) \\times 100 = 0{,}25 \\times 100$.",
      "$= 25$.",
      "Le taux d'évolution est $+25\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_taux_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 2,
    theme: "neutral",
    text: "Comment calcule-t-on le taux d'évolution d'une valeur $V_i$ vers $V_f$ ?",
    format: "qcm",
    choices: [
      "$\\dfrac{V_f - V_i}{V_i} \\times 100$",
      "$\\dfrac{V_f - V_i}{V_f} \\times 100$",
      "$V_f - V_i$",
      "$\\dfrac{V_i}{V_f} \\times 100$",
    ],
    expected: ["$\\dfrac{V_f - V_i}{V_i} \\times 100$"],
    comparator: "mcq_exact",
    hint: "On rapporte la variation à la valeur initiale.",
    explanation: exp(
      "Le taux d'évolution rapporte la variation à la valeur de départ.",
      "$t = \\dfrac{V_f - V_i}{V_i} \\times 100$.",
      "Attention : au dénominateur, c'est $V_i$ (valeur initiale).",
      "$t = \\dfrac{V_f - V_i}{V_i} \\times 100$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_info_taux_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Hausse de $t\\,\\%$ → coefficient $1 + \\dfrac{t}{100}$.",
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "template"],
    generate: () => {
      const t = [5, 10, 15, 20, 25, 40][randomInt(0, 5)];
      const cm = 1 + t / 100;
      const cmStr = String(cm).replace(".", ",");
      const cmPt = String(cm);
      return {
        text: `Augmenter de $${t}\\,\\%$ revient à multiplier par quel coefficient ?`,
        format: "short",
        expected: [cmStr, cmPt],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient multiplicateur d'une hausse est $1 + \\dfrac{t}{100}$.",
          `$1 + \\dfrac{${t}}{100} = 1 + ${t / 100}$.`,
          `$= ${cmStr}$.`,
          `On multiplie par $${cmStr}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_info_taux_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 3,
    theme: "neutral",
    hint: "Baisse de $t\\,\\%$ → coefficient $1 - \\dfrac{t}{100}$.",
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "template"],
    generate: () => {
      const t = [10, 20, 25, 30, 40, 50][randomInt(0, 5)];
      const cm = 1 - t / 100;
      const cmStr = String(cm).replace(".", ",");
      const cmPt = String(cm);
      return {
        text: `Diminuer de $${t}\\,\\%$ revient à multiplier par quel coefficient ?`,
        format: "short",
        expected: [cmStr, cmPt],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient multiplicateur d'une baisse est $1 - \\dfrac{t}{100}$.",
          `$1 - \\dfrac{${t}}{100} = 1 - ${t / 100}$.`,
          `$= ${cmStr}$.`,
          `On multiplie par $${cmStr}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_info_taux_tpl_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_taux_evolution",
    difficulty: 4,
    theme: "neutral",
    hint: "$t = \\dfrac{V_f - V_i}{V_i} \\times 100$.",
    tags: ["seconde", "maths", "info_chiffree", "taux_evolution", "template"],
    generate: () => {
      const vi = [50, 80, 100, 200, 40][randomInt(0, 4)];
      const t = [10, 20, 25, 50][randomInt(0, 3)];
      const vf = vi + (t * vi) / 100;
      return {
        text: `Une valeur passe de $${vi}$ à $${vf}$. Quel est le taux d'évolution, en pourcentage ?`,
        format: "short",
        expected: [String(t)],
        comparator: "number_equal",
        canvas: tableauAvantApres("Évolution", ["Avant", "Après"], "Valeur", vi, vf),
        explanation: exp(
          "On applique la formule du taux d'évolution.",
          `$\\dfrac{${vf} - ${vi}}{${vi}} \\times 100 = \\dfrac{${vf - vi}}{${vi}} \\times 100$.`,
          `$= ${t}$.`,
          `Le taux d'évolution est $+${t}\\,\\%$.`
        ),
      };
    },
  },

  /* ===================== INFO_EVOLUTIONS_SUCCESSIVES ===================== */

  {
    kind: "fixed",
    id: "seconde_info_succ_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 3,
    theme: "neutral",
    text: "Pour composer deux évolutions successives, on :",
    format: "qcm",
    choices: [
      "multiplie les coefficients multiplicateurs",
      "additionne les taux d'évolution",
      "additionne les coefficients",
      "prend le plus grand taux",
    ],
    expected: ["multiplie les coefficients multiplicateurs"],
    comparator: "mcq_exact",
    hint: "On enchaîne deux multiplications.",
    explanation: exp(
      "Deux évolutions successives s'enchaînent par multiplication.",
      "Le coefficient global est le produit des coefficients : $CM_1 \\times CM_2$.",
      "On n'additionne PAS les pourcentages.",
      "On multiplie les coefficients multiplicateurs."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_succ_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 3,
    theme: "neutral",
    text: "Une hausse de $10\\,\\%$ suivie d'une hausse de $20\\,\\%$ correspond à quel coefficient global ?",
    format: "short",
    expected: ["1,32", "1.32"],
    comparator: "number_equal",
    hint: "$1{,}1 \\times 1{,}2$.",
    explanation: exp(
      "On multiplie les coefficients multiplicateurs.",
      "$1{,}1 \\times 1{,}2$.",
      "$= 1{,}32$.",
      "Le coefficient global est $1{,}32$ (soit $+32\\,\\%$)."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_succ_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 4,
    theme: "neutral",
    text: "Une hausse de $10\\,\\%$ suivie d'une hausse de $20\\,\\%$ correspond à un taux global de :",
    format: "qcm",
    choices: ["$+32\\,\\%$", "$+30\\,\\%$", "$+2\\,\\%$", "$+200\\,\\%$"],
    expected: ["$+32\\,\\%$"],
    comparator: "mcq_exact",
    hint: "Coefficient global $1{,}32$ → taux $(1{,}32 - 1)\\times 100$.",
    explanation: exp(
      "On calcule le coefficient global, puis le taux.",
      "$1{,}1 \\times 1{,}2 = 1{,}32$, donc $t = (1{,}32 - 1) \\times 100 = 32$.",
      "Ce n'est pas $+30\\,\\%$ (on ne somme pas les taux).",
      "Le taux global est $+32\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_succ_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 4,
    theme: "neutral",
    text: "Une hausse de $50\\,\\%$ suivie d'une baisse de $50\\,\\%$ ramène-t-elle à la valeur de départ ?",
    format: "qcm",
    choices: [
      "Non, on obtient $0{,}75$ (soit $-25\\,\\%$)",
      "Oui, on revient au départ",
      "Non, on obtient $+25\\,\\%$",
      "Oui, car $+50$ et $-50$ s'annulent",
    ],
    expected: ["Non, on obtient $0{,}75$ (soit $-25\\,\\%$)"],
    comparator: "mcq_exact",
    hint: "$1{,}5 \\times 0{,}5$.",
    explanation: exp(
      "On multiplie les coefficients, on ne soustrait pas les taux.",
      "$1{,}5 \\times 0{,}5 = 0{,}75$.",
      "$0{,}75$ correspond à $-25\\,\\%$.",
      "Non : on obtient $0{,}75$, soit une baisse de $25\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_info_succ_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 4,
    theme: "neutral",
    hint: "On multiplie les deux coefficients.",
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "template"],
    generate: () => {
      const t1 = [10, 20, 50][randomInt(0, 2)];
      const t2 = [10, 20, 50][randomInt(0, 2)];
      const cm1 = 1 + t1 / 100;
      const cm2 = 1 + t2 / 100;
      const cm = Math.round(cm1 * cm2 * 1000) / 1000;
      const cmStr = String(cm).replace(".", ",");
      return {
        text: `Une hausse de $${t1}\\,\\%$ suivie d'une hausse de $${t2}\\,\\%$ correspond à quel coefficient global ?`,
        format: "short",
        expected: [cmStr, String(cm)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie les coefficients multiplicateurs.",
          `$${String(cm1).replace(".", ",")} \\times ${String(cm2).replace(".", ",")}$.`,
          `$= ${cmStr}$.`,
          `Le coefficient global est $${cmStr}$.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "seconde_info_succ_tpl_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 4,
    theme: "neutral",
    hint: "Hausse puis baisse : $CM_1 \\times CM_2$.",
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "template"],
    generate: () => {
      const t1 = [20, 40, 50][randomInt(0, 2)];
      const t2 = [10, 20, 50][randomInt(0, 2)];
      const cm1 = 1 + t1 / 100;
      const cm2 = 1 - t2 / 100;
      const cm = Math.round(cm1 * cm2 * 1000) / 1000;
      const cmStr = String(cm).replace(".", ",");
      return {
        text: `Une hausse de $${t1}\\,\\%$ suivie d'une baisse de $${t2}\\,\\%$ correspond à quel coefficient global ?`,
        format: "short",
        expected: [cmStr, String(cm)],
        comparator: "number_equal",
        explanation: exp(
          "On multiplie les coefficients (hausse puis baisse).",
          `$${String(cm1).replace(".", ",")} \\times ${String(cm2).replace(".", ",")}$.`,
          `$= ${cmStr}$.`,
          `Le coefficient global est $${cmStr}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_info_succ_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on additionner les taux pour deux évolutions successives ($+10\\,\\%$ puis $+10\\,\\%$ = $+20\\,\\%$) ?",
    format: "qcm",
    choices: [
      "Non, $1{,}1 \\times 1{,}1 = 1{,}21$ soit $+21\\,\\%$",
      "Oui, cela fait $+20\\,\\%$",
      "Oui, toujours",
      "Non, cela fait $+10\\,\\%$",
    ],
    expected: ["Non, $1{,}1 \\times 1{,}1 = 1{,}21$ soit $+21\\,\\%$"],
    comparator: "mcq_exact",
    hint: "On multiplie les coefficients.",
    explanation: exp(
      "Les taux ne s'additionnent pas directement.",
      "$1{,}1 \\times 1{,}1 = 1{,}21$.",
      "Cela correspond à $+21\\,\\%$, pas $+20\\,\\%$.",
      "Non : $+21\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_succ_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolutions_successives",
    difficulty: 5,
    theme: "neutral",
    text: "Une baisse de $20\\,\\%$ suivie d'une baisse de $25\\,\\%$ correspond à quel coefficient global ?",
    format: "short",
    expected: ["0,6", "0.6"],
    comparator: "number_equal",
    hint: "$0{,}8 \\times 0{,}75$.",
    explanation: exp(
      "On multiplie les coefficients des deux baisses.",
      "$0{,}8 \\times 0{,}75$.",
      "$= 0{,}6$.",
      "Le coefficient global est $0{,}6$ (soit $-40\\,\\%$)."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolutions_successives", "short"],
  },

  /* ===================== INFO_EVOLUTION_RECIPROQUE ===================== */

  {
    kind: "fixed",
    id: "seconde_info_recip_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Le coefficient multiplicateur de l'évolution réciproque est :",
    format: "qcm",
    choices: ["l'inverse du coefficient ($\\dfrac{1}{CM}$)", "l'opposé du coefficient", "le même coefficient", "$CM - 1$"],
    expected: ["l'inverse du coefficient ($\\dfrac{1}{CM}$)"],
    comparator: "mcq_exact",
    hint: "Pour annuler une multiplication, on divise.",
    explanation: exp(
      "L'évolution réciproque ramène à la valeur de départ.",
      "Pour annuler une multiplication par $CM$, on multiplie par $\\dfrac{1}{CM}$.",
      "Le coefficient réciproque est donc $\\dfrac{1}{CM}$.",
      "C'est l'inverse $\\dfrac{1}{CM}$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_recip_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Après une hausse de $25\\,\\%$, quel coefficient ramène à la valeur de départ ?",
    format: "short",
    expected: ["0,8", "0.8"],
    comparator: "number_equal",
    hint: "$CM = 1{,}25$ ; réciproque $= \\dfrac{1}{1{,}25}$.",
    explanation: exp(
      "Le coefficient de la hausse est $1{,}25$.",
      "Le coefficient réciproque est $\\dfrac{1}{1{,}25}$.",
      "$= 0{,}8$.",
      "On multiplie par $0{,}8$ (soit $-20\\,\\%$)."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_recip_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Après une hausse de $25\\,\\%$, quel taux d'évolution ramène à la valeur de départ ?",
    format: "qcm",
    choices: ["$-20\\,\\%$", "$-25\\,\\%$", "$+20\\,\\%$", "$-75\\,\\%$"],
    expected: ["$-20\\,\\%$"],
    comparator: "mcq_exact",
    hint: "Coefficient réciproque $0{,}8$ → taux $-20\\,\\%$.",
    explanation: exp(
      "Le coefficient réciproque est $\\dfrac{1}{1{,}25} = 0{,}8$.",
      "$0{,}8$ correspond à $(0{,}8 - 1) \\times 100 = -20$.",
      "Ce n'est PAS $-25\\,\\%$.",
      "Il faut une baisse de $20\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_info_recip_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 5,
    theme: "neutral",
    text: "Après une hausse de $100\\,\\%$ (le prix double), quel taux ramène au prix initial ?",
    format: "qcm",
    choices: ["$-50\\,\\%$", "$-100\\,\\%$", "$-200\\,\\%$", "$+50\\,\\%$"],
    expected: ["$-50\\,\\%$"],
    comparator: "mcq_exact",
    hint: "$CM = 2$ ; réciproque $= \\dfrac{1}{2} = 0{,}5$.",
    explanation: exp(
      "Une hausse de $100\\,\\%$ donne $CM = 2$.",
      "Le coefficient réciproque est $\\dfrac{1}{2} = 0{,}5$.",
      "$0{,}5$ correspond à $-50\\,\\%$.",
      "Il faut une baisse de $50\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_info_recip_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 4,
    theme: "neutral",
    hint: "Coefficient réciproque $= \\dfrac{1}{CM}$.",
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "template"],
    generate: () => {
      // CM choisis pour donner une réciproque "propre"
      const cases = [
        { cm: "1,25", recip: "0,8", recipPt: "0.8" },
        { cm: "1,25", recip: "0,8", recipPt: "0.8" },
        { cm: "2", recip: "0,5", recipPt: "0.5" },
        { cm: "1,6", recip: "0,625", recipPt: "0.625" },
        { cm: "0,8", recip: "1,25", recipPt: "1.25" },
        { cm: "0,5", recip: "2", recipPt: "2" },
      ];
      const c = cases[randomInt(0, cases.length - 1)];
      return {
        text: `Une évolution a pour coefficient multiplicateur $${c.cm}$. Quel est le coefficient de l'évolution réciproque ?`,
        format: "short",
        expected: [c.recip, c.recipPt],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient réciproque est l'inverse du coefficient.",
          `$\\dfrac{1}{${c.cm}}$.`,
          `$= ${c.recip}$.`,
          `Le coefficient réciproque est $${c.recip}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_info_recip_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 4,
    theme: "neutral",
    text: "Après une baisse de $20\\,\\%$, quel coefficient ramène à la valeur de départ ?",
    format: "short",
    expected: ["1,25", "1.25"],
    comparator: "number_equal",
    hint: "$CM = 0{,}8$ ; réciproque $= \\dfrac{1}{0{,}8}$.",
    explanation: exp(
      "Le coefficient de la baisse est $0{,}8$.",
      "Le coefficient réciproque est $\\dfrac{1}{0{,}8}$.",
      "$= 1{,}25$.",
      "On multiplie par $1{,}25$ (soit $+25\\,\\%$)."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_info_recip_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "information_chiffree_evolutions",
    microId: "info_evolution_reciproque",
    difficulty: 3,
    theme: "neutral",
    text: "Une hausse de $20\\,\\%$ puis une baisse de $20\\,\\%$ ramènent-elles au prix de départ ?",
    format: "qcm",
    choices: [
      "Non, on obtient $0{,}96$ (soit $-4\\,\\%$)",
      "Oui, on revient au départ",
      "Non, $+4\\,\\%$",
      "Oui, car les taux s'annulent",
    ],
    expected: ["Non, on obtient $0{,}96$ (soit $-4\\,\\%$)"],
    comparator: "mcq_exact",
    hint: "$1{,}2 \\times 0{,}8$.",
    explanation: exp(
      "Une baisse de $20\\,\\%$ n'est pas la réciproque d'une hausse de $20\\,\\%$.",
      "$1{,}2 \\times 0{,}8 = 0{,}96$.",
      "$0{,}96$ correspond à $-4\\,\\%$.",
      "Non : on obtient $0{,}96$, soit $-4\\,\\%$."
    ),
    tags: ["seconde", "maths", "info_chiffree", "evolution_reciproque", "raisonnement", "qcm"],
  },
];
