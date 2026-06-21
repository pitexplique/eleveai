// lib/tutor-v4/questionBank/seconde/maths/echantillonnage.bank.ts
//
// Chapitre : Echantillonnage et simulation (notion echantillonnage_simulation)
//
// REGLE DE DESIGN (option D) : fixed=remarquable/definition, templates dominants,
// QCM-raisonnement, short numerique (calculatrice dispo), pas d'open.
// Contexte concret recurrent : pesee d'un echantillon de mimolettes (paquet annonce
// 200 g, echantillon de 10 -> moyenne 207 g, ecart type 1 g) -> fluctuation. Theme cuisine.
//
// microSkills (>= 10 items chacun, difficultes 1->5) :
//   echantillon_fluctuation        — Fluctuation d'echantillonnage
//   echantillon_loi_grands_nombres — Loi des grands nombres (estimation par frequence)
//   simulation_frequence           — Simuler et observer les frequences
//   echantillon_interpreter        — Interpreter un resultat de simulation

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return (
    `Définition : ${definition}\n\n` +
    `Méthode : ${methode}\n\n` +
    `Calcul / Observation : ${calcul}\n\n` +
    `Conclusion : ${conclusion}`
  );
}

export const echantillonnageBank: TutorBankItemV4[] = [
  /* ===================== ECHANTILLON_FLUCTUATION ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 2,
    theme: "neutral",
    text: "La « fluctuation d'échantillonnage » désigne :",
    format: "qcm",
    choices: [
      "le fait que les résultats varient d'un échantillon à l'autre",
      "une erreur de calcul",
      "le fait que la moyenne est toujours la même",
      "le nombre d'échantillons",
    ],
    expected: ["le fait que les résultats varient d'un échantillon à l'autre"],
    comparator: "mcq_exact",
    hint: "Deux échantillons ≠ mêmes résultats.",
    explanation: exp(
      "Chaque échantillon est tiré au hasard, ses résultats varient.",
      "D'un échantillon à l'autre, la fréquence (ou la moyenne) change un peu.",
      "C'est la fluctuation d'échantillonnage.",
      "Les résultats varient d'un échantillon à l'autre."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "cuisine",
    text: "Un paquet annonce des mimolettes de $200$ g. On en pèse $10$ : la moyenne est $207$ g. Un autre paquet de $10$ donnera-t-il exactement $207$ g ?",
    format: "qcm",
    choices: [
      "Non, la moyenne varie d'un échantillon à l'autre (fluctuation)",
      "Oui, toujours $207$ g",
      "Oui, car la moyenne est fixe",
      "Non, ce sera toujours $200$ g",
    ],
    expected: ["Non, la moyenne varie d'un échantillon à l'autre (fluctuation)"],
    comparator: "mcq_exact",
    hint: "Chaque échantillon est différent.",
    explanation: exp(
      "Chaque paquet est un échantillon différent de mimolettes.",
      "Les masses ne sont pas identiques, donc la moyenne change un peu.",
      "C'est la fluctuation d'échantillonnage.",
      "Non : la moyenne fluctue d'un échantillon à l'autre."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "cuisine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Plus la taille $n$ de l'échantillon est grande, plus la fluctuation des fréquences est :",
    format: "qcm",
    choices: ["faible", "grande", "nulle", "imprévisible"],
    expected: ["faible"],
    comparator: "mcq_exact",
    hint: "Grand échantillon → résultats plus stables.",
    explanation: exp(
      "La taille de l'échantillon influence la fluctuation.",
      "Plus $n$ est grand, plus les fréquences observées sont stables.",
      "La fluctuation diminue.",
      "Elle est plus faible."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 2,
    theme: "neutral",
    text: "On lance $50$ fois une pièce équilibrée. Obtient-on forcément exactement $25$ piles ?",
    format: "qcm",
    choices: [
      "Non, on obtient un nombre proche de $25$, mais pas toujours $25$",
      "Oui, toujours $25$",
      "Non, jamais $25$",
      "Oui, $50$ piles",
    ],
    expected: ["Non, on obtient un nombre proche de $25$, mais pas toujours $25$"],
    comparator: "mcq_exact",
    hint: "Le hasard fait fluctuer le résultat.",
    explanation: exp(
      "La théorie prévoit $25$ piles « en moyenne ».",
      "Mais chaque série fluctue : on obtient $23$, $26$, $24$…",
      "On est proche de $25$ sans l'atteindre à chaque fois.",
      "Non : proche de $25$, mais pas toujours $25$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 4,
    theme: "cuisine",
    text: "Sur l'échantillon de mimolettes, la moyenne est $207$ g avec un écart type de $1$ g. Cela indique que les masses sont :",
    format: "qcm",
    choices: [
      "très proches les unes des autres (peu dispersées)",
      "très différentes",
      "toutes égales à $200$ g",
      "imprévisibles",
    ],
    expected: ["très proches les unes des autres (peu dispersées)"],
    comparator: "mcq_exact",
    hint: "Petit écart type → faible dispersion.",
    explanation: exp(
      "L'écart type mesure la dispersion autour de la moyenne.",
      "Un écart type de $1$ g (sur une moyenne de $207$ g) est très petit.",
      "Les mimolettes ont des masses très proches de $207$ g.",
      "Les masses sont peu dispersées."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "cuisine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un échantillon de taille $n$ d'une expérience à deux issues, l'écart entre la fréquence observée $f$ et la probabilité $p$ est en général inférieur ou égal à :",
    format: "qcm",
    choices: ["$\\dfrac{1}{\\sqrt{n}}$", "$\\dfrac{1}{n}$", "$\\sqrt{n}$", "$n$"],
    expected: ["$\\dfrac{1}{\\sqrt{n}}$"],
    comparator: "mcq_exact",
    hint: "C'est l'ordre de grandeur de la fluctuation.",
    explanation: exp(
      "La fluctuation des fréquences a un ordre de grandeur connu.",
      "Pour une expérience à deux issues, $|f - p| \\le \\dfrac{1}{\\sqrt{n}}$ (le plus souvent).",
      "Plus $n$ est grand, plus cet écart est petit.",
      "$\\dfrac{1}{\\sqrt{n}}$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour un échantillon de taille $n = 100$, combien vaut $\\dfrac{1}{\\sqrt{n}}$ ?",
    format: "short",
    expected: ["0,1", "0.1"],
    comparator: "number_equal",
    hint: "$\\sqrt{100} = 10$.",
    explanation: exp(
      "On calcule $\\dfrac{1}{\\sqrt{n}}$ avec $n = 100$.",
      "$\\sqrt{100} = 10$, donc $\\dfrac{1}{10}$.",
      "$= 0{,}1$.",
      "$\\dfrac{1}{\\sqrt{100}} = 0{,}1$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "short"],
  },

  {
    kind: "template",
    id: "seconde_ech_fluct_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 3,
    theme: "neutral",
    hint: "$\\dfrac{1}{\\sqrt{n}}$.",
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "template"],
    generate: () => {
      const cases = [
        { n: 25, r: "0,2", rp: "0.2" },
        { n: 100, r: "0,1", rp: "0.1" },
        { n: 400, r: "0,05", rp: "0.05" },
        { n: 10000, r: "0,01", rp: "0.01" },
      ];
      const c = cases[Math.floor(Math.random() * cases.length)];
      return {
        text: `Pour un échantillon de taille $n = ${c.n}$, combien vaut $\\dfrac{1}{\\sqrt{n}}$ ?`,
        format: "short",
        expected: [c.r, c.rp],
        comparator: "number_equal",
        explanation: exp(
          "On calcule $\\dfrac{1}{\\sqrt{n}}$.",
          `$\\sqrt{${c.n}}$ puis on prend l'inverse.`,
          `$= ${c.r}$.`,
          `$\\dfrac{1}{\\sqrt{${c.n}}} = ${c.r}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_fluct_fixed_8",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_fluctuation",
    difficulty: 4,
    theme: "neutral",
    text: "Pour réduire de moitié l'ordre de grandeur de la fluctuation $\\dfrac{1}{\\sqrt{n}}$, il faut multiplier la taille $n$ par :",
    format: "qcm",
    choices: ["$4$", "$2$", "$\\dfrac{1}{2}$", "$10$"],
    expected: ["$4$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{\\sqrt{4n}} = \\dfrac{1}{2\\sqrt{n}}$.",
    explanation: exp(
      "La fluctuation dépend de $\\sqrt{n}$.",
      "Pour diviser $\\dfrac{1}{\\sqrt{n}}$ par $2$, il faut doubler $\\sqrt{n}$, donc quadrupler $n$.",
      "$\\dfrac{1}{\\sqrt{4n}} = \\dfrac{1}{2\\sqrt{n}}$.",
      "Il faut multiplier $n$ par $4$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "fluctuation", "raisonnement", "qcm"],
  },

  /* ===================== ECHANTILLON_LOI_GRANDS_NOMBRES ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "D'après la loi des grands nombres, quand $n$ est grand, la fréquence observée est proche de :",
    format: "qcm",
    choices: ["la probabilité de l'événement", "zéro", "la taille de l'échantillon", "l'effectif total"],
    expected: ["la probabilité de l'événement"],
    comparator: "mcq_exact",
    hint: "Fréquence observée ≈ probabilité théorique.",
    explanation: exp(
      "La loi des grands nombres relie fréquence et probabilité.",
      "Quand $n$ est grand, la fréquence observée se rapproche de la probabilité.",
      "Sauf exception, $f \\approx p$.",
      "Proche de la probabilité."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "On lance une pièce équilibrée $10\\,000$ fois. La fréquence de « pile » sera proche de :",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "Probabilité de pile $= 0{,}5$.",
    explanation: exp(
      "La probabilité de pile est $0{,}5$.",
      "Avec un très grand nombre de lancers, la fréquence s'en rapproche.",
      "$f \\approx 0{,}5$.",
      "Proche de $0{,}5$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "La loi des grands nombres permet d'estimer une probabilité inconnue par :",
    format: "qcm",
    choices: [
      "la fréquence observée sur un grand échantillon",
      "une seule expérience",
      "la valeur maximale",
      "l'écart type",
    ],
    expected: ["la fréquence observée sur un grand échantillon"],
    comparator: "mcq_exact",
    hint: "On observe beaucoup, on en déduit $p$.",
    explanation: exp(
      "Quand la probabilité est inconnue, on l'estime expérimentalement.",
      "On réalise un grand nombre d'expériences et on observe la fréquence.",
      "Cette fréquence estime la probabilité.",
      "Par la fréquence observée sur un grand échantillon."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "Avec seulement $5$ lancers d'une pièce, la fréquence de pile est-elle un bon estimateur de $0{,}5$ ?",
    format: "qcm",
    choices: [
      "Non, l'échantillon est trop petit (forte fluctuation)",
      "Oui, c'est toujours exact",
      "Oui, $5$ suffit",
      "Non, il faut exactement $100$",
    ],
    expected: ["Non, l'échantillon est trop petit (forte fluctuation)"],
    comparator: "mcq_exact",
    hint: "Petit $n$ → grande fluctuation.",
    explanation: exp(
      "La loi des grands nombres exige un grand $n$.",
      "Avec $5$ lancers, la fréquence peut être $0$, $0{,}2$, $0{,}8$…",
      "L'estimation est peu fiable.",
      "Non : l'échantillon est trop petit."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    text: "On lance un dé un très grand nombre de fois. La fréquence de la face « 1 » sera proche de :",
    format: "qcm",
    choices: ["$\\dfrac{1}{6}$", "$\\dfrac{1}{2}$", "$\\dfrac{1}{3}$", "$1$"],
    expected: ["$\\dfrac{1}{6}$"],
    comparator: "mcq_exact",
    hint: "$P(1) = \\dfrac{1}{6}$.",
    explanation: exp(
      "La probabilité d'obtenir $1$ est $\\dfrac{1}{6}$.",
      "Avec beaucoup de lancers, la fréquence s'en rapproche.",
      "$f \\approx \\dfrac{1}{6}$.",
      "$\\dfrac{1}{6}$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $2000$ tirages, un événement se produit $480$ fois. Quelle est la fréquence observée ?",
    format: "short",
    expected: ["0,24", "0.24"],
    comparator: "number_equal",
    hint: "$\\dfrac{480}{2000}$.",
    explanation: exp(
      "La fréquence observée est le rapport effectif sur total.",
      "$\\dfrac{480}{2000}$.",
      "$= 0{,}24$.",
      "La fréquence est $0{,}24$, une estimation de la probabilité."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "short"],
  },

  {
    kind: "template",
    id: "seconde_ech_lgn_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence $= \\dfrac{\\text{succès}}{\\text{total}}$.",
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "template"],
    generate: () => {
      const total = [500, 1000, 2000, 250][Math.floor(Math.random() * 4)];
      const f = [0.2, 0.25, 0.4, 0.5, 0.8][Math.floor(Math.random() * 5)];
      const succes = Math.round(f * total);
      const fStr = String(f).replace(".", ",");
      return {
        text: `Sur $${total}$ essais, un événement se produit $${succes}$ fois. Quelle est la fréquence observée ?`,
        format: "short",
        expected: [fStr, String(f)],
        comparator: "number_equal",
        explanation: exp(
          "La fréquence estime la probabilité (loi des grands nombres).",
          `$\\dfrac{${succes}}{${total}}$.`,
          `$= ${fStr}$.`,
          `La fréquence observée est $${fStr}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_lgn_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_loi_grands_nombres",
    difficulty: 2,
    theme: "neutral",
    text: "« Sauf exception, lorsque $n$ est grand, la fréquence observée est proche de la probabilité. » Cet énoncé est :",
    format: "qcm",
    choices: ["la loi des grands nombres", "le théorème de Pythagore", "la relation de Chasles", "une identité remarquable"],
    expected: ["la loi des grands nombres"],
    comparator: "mcq_exact",
    hint: "Grand nombre d'expériences.",
    explanation: exp(
      "Cet énoncé décrit le comportement des fréquences pour un grand $n$.",
      "C'est exactement la (version vulgarisée de la) loi des grands nombres.",
      "Elle justifie l'estimation d'une probabilité par une fréquence.",
      "C'est la loi des grands nombres."
    ),
    tags: ["seconde", "maths", "echantillonnage", "loi_grands_nombres", "raisonnement", "qcm"],
  },

  /* ===================== SIMULATION_FREQUENCE ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 2,
    theme: "neutral",
    text: "Simuler une expérience aléatoire (avec Python ou un tableur) permet :",
    format: "qcm",
    choices: [
      "d'observer des fréquences sans réaliser l'expérience en vrai",
      "de changer la probabilité réelle",
      "de supprimer le hasard",
      "de calculer une aire",
    ],
    expected: ["d'observer des fréquences sans réaliser l'expérience en vrai"],
    comparator: "mcq_exact",
    hint: "On reproduit le hasard avec l'ordinateur.",
    explanation: exp(
      "Une simulation reproduit l'expérience avec un générateur aléatoire.",
      "On peut répéter des milliers d'essais rapidement.",
      "On observe alors les fréquences obtenues.",
      "On observe des fréquences sans faire l'expérience réelle."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "En Python, pour simuler le hasard (ex. un lancer de pièce), on utilise principalement :",
    format: "qcm",
    choices: [
      "le module random (nombres aléatoires)",
      "le module math",
      "la fonction print",
      "une boucle for uniquement",
    ],
    expected: ["le module random (nombres aléatoires)"],
    comparator: "mcq_exact",
    hint: "« random » = aléatoire.",
    explanation: exp(
      "Simuler le hasard nécessite des nombres aléatoires.",
      "En Python, c'est le module random qui les fournit.",
      "Ex. random.randint(0, 1) pour pile ou face.",
      "Le module random."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Une simulation de $1000$ lancers donne $530$ piles. Quelle est la fréquence simulée de pile ?",
    format: "short",
    expected: ["0,53", "0.53"],
    comparator: "number_equal",
    hint: "$\\dfrac{530}{1000}$.",
    explanation: exp(
      "La fréquence simulée est succès sur total.",
      "$\\dfrac{530}{1000}$.",
      "$= 0{,}53$.",
      "La fréquence simulée est $0{,}53$ (proche de $0{,}5$)."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "short"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    text: "Deux simulations identiques (même programme) donnent-elles toujours la même fréquence ?",
    format: "qcm",
    choices: [
      "Non, car le hasard fait varier les résultats",
      "Oui, toujours identiques",
      "Oui, car le programme est le même",
      "Non, le programme est faux",
    ],
    expected: ["Non, car le hasard fait varier les résultats"],
    comparator: "mcq_exact",
    hint: "C'est encore la fluctuation.",
    explanation: exp(
      "Chaque simulation utilise de nouveaux tirages aléatoires.",
      "Les fréquences obtenues fluctuent légèrement.",
      "Elles sont proches mais pas identiques.",
      "Non : le hasard fait varier les résultats."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "Pour que la fréquence simulée approche bien la probabilité, il vaut mieux simuler :",
    format: "qcm",
    choices: ["un grand nombre d'essais", "très peu d'essais", "un seul essai", "exactement 2 essais"],
    expected: ["un grand nombre d'essais"],
    comparator: "mcq_exact",
    hint: "Loi des grands nombres.",
    explanation: exp(
      "La fréquence approche la probabilité quand $n$ est grand.",
      "On simule donc un grand nombre d'essais.",
      "C'est l'intérêt de la simulation par ordinateur (rapide).",
      "Un grand nombre d'essais."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ech_sim_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 3,
    theme: "neutral",
    hint: "Fréquence $= \\dfrac{\\text{succès simulés}}{\\text{nombre de simulations}}$.",
    tags: ["seconde", "maths", "echantillonnage", "simulation", "template"],
    generate: () => {
      const total = [200, 500, 1000][Math.floor(Math.random() * 3)];
      const f = [0.3, 0.45, 0.5, 0.6, 0.7][Math.floor(Math.random() * 5)];
      const succes = Math.round(f * total);
      const fStr = String(f).replace(".", ",");
      return {
        text: `Une simulation de $${total}$ essais donne $${succes}$ succès. Quelle est la fréquence simulée ?`,
        format: "short",
        expected: [fStr, String(f)],
        comparator: "number_equal",
        explanation: exp(
          "On divise les succès par le nombre de simulations.",
          `$\\dfrac{${succes}}{${total}}$.`,
          `$= ${fStr}$.`,
          `La fréquence simulée est $${fStr}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_sim_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "simulation_frequence",
    difficulty: 4,
    theme: "neutral",
    text: "On simule $N$ échantillons de taille $n$ d'une expérience à deux issues. Cela permet surtout d'observer :",
    format: "qcm",
    choices: [
      "comment les fréquences fluctuent autour de la probabilité",
      "la valeur exacte de la probabilité",
      "l'aire d'un triangle",
      "la médiane d'une fonction",
    ],
    expected: ["comment les fréquences fluctuent autour de la probabilité"],
    comparator: "mcq_exact",
    hint: "Plusieurs échantillons → on voit la dispersion.",
    explanation: exp(
      "Simuler plusieurs échantillons montre la variabilité des fréquences.",
      "On observe leur dispersion autour de la probabilité.",
      "C'est une illustration de la fluctuation d'échantillonnage.",
      "Comment les fréquences fluctuent autour de la probabilité."
    ),
    tags: ["seconde", "maths", "echantillonnage", "simulation", "raisonnement", "qcm"],
  },

  /* ===================== ECHANTILLON_INTERPRETER ===================== */

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Sur $100$ lancers d'une pièce, on observe une fréquence de pile de $0{,}54$. Est-ce surprenant pour une pièce équilibrée ?",
    format: "qcm",
    choices: [
      "Non, c'est une fluctuation normale autour de $0{,}5$",
      "Oui, la pièce est truquée",
      "Oui, c'est impossible",
      "Non, car $0{,}54 = 0{,}5$",
    ],
    expected: ["Non, c'est une fluctuation normale autour de $0{,}5$"],
    comparator: "mcq_exact",
    hint: "$0{,}54$ est proche de $0{,}5$ ($|f-p| \\le 1/\\sqrt{100} = 0{,}1$).",
    explanation: exp(
      "On compare l'écart $|0{,}54 - 0{,}5| = 0{,}04$ à $\\dfrac{1}{\\sqrt{100}} = 0{,}1$.",
      "$0{,}04 \\le 0{,}1$ : l'écart est dans la fluctuation attendue.",
      "Rien d'anormal pour une pièce équilibrée.",
      "Non, c'est une fluctuation normale."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_2",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "cuisine",
    text: "Le paquet annonce $200$ g par mimolette, mais l'échantillon donne une moyenne de $207$ g. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "En moyenne, les mimolettes pèsent un peu plus que l'annonce",
      "Les mimolettes pèsent moins que prévu",
      "L'annonce est exacte",
      "On ne peut rien dire",
    ],
    expected: ["En moyenne, les mimolettes pèsent un peu plus que l'annonce"],
    comparator: "mcq_exact",
    hint: "$207 > 200$.",
    explanation: exp(
      "On compare la moyenne observée à la valeur annoncée.",
      "$207$ g $> 200$ g.",
      "En moyenne, les mimolettes pèsent un peu plus que l'annonce (le fabricant ne sous-remplit pas).",
      "Elles pèsent en moyenne un peu plus que l'annonce."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "cuisine", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_3",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "cuisine",
    text: "Pour les mimolettes : moyenne $207$ g, écart type $1$ g. La plupart des masses se situent environ dans l'intervalle $[m - 2s\\,;m + 2s]$, soit :",
    format: "qcm",
    choices: ["$[205\\,;209]$", "$[206\\,;208]$", "$[200\\,;214]$", "$[207\\,;208]$"],
    expected: ["$[205\\,;209]$"],
    comparator: "mcq_exact",
    hint: "$207 - 2 \\times 1$ et $207 + 2 \\times 1$.",
    explanation: exp(
      "On calcule $[m - 2s\\,;m + 2s]$ avec $m = 207$ et $s = 1$.",
      "$207 - 2 = 205$ et $207 + 2 = 209$.",
      "L'intervalle est $[205\\,;209]$.",
      "$[205\\,;209]$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "cuisine", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_4",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $100$ lancers, une pièce donne $72$ piles ($f = 0{,}72$). Que peut-on soupçonner ?",
    format: "qcm",
    choices: [
      "La pièce est peut-être truquée (écart $> \\dfrac{1}{\\sqrt{100}}$)",
      "Rien, c'est normal",
      "La pièce est parfaitement équilibrée",
      "Il y a eu $72$ faces",
    ],
    expected: ["La pièce est peut-être truquée (écart $> \\dfrac{1}{\\sqrt{100}}$)"],
    comparator: "mcq_exact",
    hint: "$|0{,}72 - 0{,}5| = 0{,}22 > 0{,}1$.",
    explanation: exp(
      "On compare l'écart à la fluctuation attendue.",
      "$|0{,}72 - 0{,}5| = 0{,}22$, bien plus que $\\dfrac{1}{\\sqrt{100}} = 0{,}1$.",
      "Un tel écart est peu probable pour une pièce équilibrée.",
      "La pièce est peut-être truquée."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_5",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Une fréquence observée est une estimation de la probabilité. Cette estimation est d'autant meilleure que :",
    format: "qcm",
    choices: ["l'échantillon est grand", "l'échantillon est petit", "la probabilité est grande", "on fait un seul essai"],
    expected: ["l'échantillon est grand"],
    comparator: "mcq_exact",
    hint: "Grand $n$ → estimation plus fiable.",
    explanation: exp(
      "La qualité de l'estimation dépend de la taille de l'échantillon.",
      "Plus $n$ est grand, plus la fréquence est proche de la probabilité.",
      "L'estimation est alors plus fiable.",
      "Quand l'échantillon est grand."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_6",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $n = 100$ et $p = 0{,}5$, on s'attend à ce que la fréquence observée soit généralement dans l'intervalle :",
    format: "qcm",
    choices: ["$[0{,}4\\,;0{,}6]$", "$[0{,}49\\,;0{,}51]$", "$[0\\,;1]$ uniquement", "$[0{,}3\\,;0{,}7]$"],
    expected: ["$[0{,}4\\,;0{,}6]$"],
    comparator: "mcq_exact",
    hint: "$\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
    explanation: exp(
      "On utilise l'intervalle $\\left[p - \\dfrac{1}{\\sqrt{n}}\\,;p + \\dfrac{1}{\\sqrt{n}}\\right]$.",
      "$\\dfrac{1}{\\sqrt{100}} = 0{,}1$ ; $0{,}5 \\pm 0{,}1$.",
      "$[0{,}4\\,;0{,}6]$.",
      "$[0{,}4\\,;0{,}6]$."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "raisonnement", "qcm"],
  },

  {
    kind: "template",
    id: "seconde_ech_int_tpl_1",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 4,
    theme: "neutral",
    hint: "Compare l'écart $|f - p|$ à $\\dfrac{1}{\\sqrt{n}}$.",
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "template"],
    generate: () => {
      // n=100 -> seuil 0,1. f normal (proche) ou suspect (loin)
      const normal = Math.random() < 0.5;
      const f = normal ? [0.46, 0.53, 0.55, 0.48][Math.floor(Math.random() * 4)] : [0.68, 0.72, 0.35, 0.3][Math.floor(Math.random() * 4)];
      const correct = normal
        ? "Non, c'est une fluctuation normale"
        : "Oui, l'écart dépasse la fluctuation attendue";
      const choices = ["Non, c'est une fluctuation normale", "Oui, l'écart dépasse la fluctuation attendue"];
      const fStr = String(f).replace(".", ",");
      const ecart = Math.round(Math.abs(f - 0.5) * 100) / 100;
      return {
        text: `Sur $100$ lancers d'une pièce, la fréquence de pile est $${fStr}$. Est-ce surprenant pour une pièce équilibrée ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On compare $|f - 0{,}5|$ au seuil $\\dfrac{1}{\\sqrt{100}} = 0{,}1$.",
          `$|${fStr} - 0{,}5| = ${String(ecart).replace(".", ",")}$.`,
          normal ? "Cet écart est $\\le 0{,}1$ : c'est normal." : "Cet écart est $> 0{,}1$ : c'est suspect.",
          correct + "."
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "seconde_ech_int_fixed_7",
    niveau: "seconde",
    matiere: "maths",
    notionId: "echantillonnage_simulation",
    microId: "echantillon_interpreter",
    difficulty: 2,
    theme: "cuisine",
    text: "Un écart type de $1$ g sur la masse des mimolettes (moyenne $207$ g) signifie que le fabricant est :",
    format: "qcm",
    choices: ["très régulier (faible dispersion)", "très irrégulier", "en dessous de l'annonce", "au hasard"],
    expected: ["très régulier (faible dispersion)"],
    comparator: "mcq_exact",
    hint: "Petit écart type = régularité.",
    explanation: exp(
      "L'écart type mesure la régularité des masses.",
      "$1$ g d'écart type est très faible devant $207$ g.",
      "Les mimolettes ont des masses très homogènes.",
      "Le fabricant est très régulier."
    ),
    tags: ["seconde", "maths", "echantillonnage", "interpreter", "cuisine", "raisonnement", "qcm"],
  },
];
