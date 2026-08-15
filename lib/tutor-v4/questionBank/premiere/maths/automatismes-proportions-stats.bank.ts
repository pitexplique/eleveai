// lib/tutor-v4/questionBank/premiere/maths/automatismes-proportions-stats.bank.ts
//
// Notions : auto_proportion, auto_partie_tout, auto_lire_statistiques,
//           auto_indicateurs, auto_proba_base (domaine BOP1AU)
//
// Les derniers automatismes du programme. Tombés en juin 2026 :
//   · « 30 % de 150 est égal à » (Métropole) ;
//   · « 25 % de 250 est égal à » (Centres étrangers) ;
//   · « la médiane de 2 ; 3 ; 5 ; 4 ; 2 ; 3 » (Métropole) ;
//   · un dé truqué dont on cherche la probabilité manquante, sachant que la
//     somme des probabilités des issues vaut 1 (Asie).
//
// ⚠️ Sans calculatrice : les pourcentages sont des multiples de 5, et les
// séries statistiques comptent au plus sept valeurs.
//
// Les questions de lecture portent un diagramme ou une série affichée : on lit
// avant de calculer.

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

/** La série, affichée en tableau : on la lit avant de la traiter. */
function canvasSerie(valeurs: number[], titre: string): CanvasFigure {
  return {
    kind: "tableau_donnees",
    title: titre,
    headers: ["", ...valeurs.map((_, i) => `n° ${i + 1}`)],
    rows: [{ label: "Valeur", values: valeurs }],
  };
}

export const automatismesProportionsStatsBank: TutorBankItemV4[] = [
  /* ═══════════════ auto_prop_calculer / formes ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_prop_calculer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une proportion, c'est la partie divisée par le tout.",
    tags: ["premiere", "maths", "automatisme", "proportion", "template", "short"],
    generate: () => {
      const total = pick([20, 25, 40, 50] as const);
      const part = pick([5, 10, 15] as const).valueOf();
      const partie = Math.min(part, total - 5);
      const proportion = (partie / total) * 100;
      return {
        text:
          `Dans une classe de $${total}$ élèves, $${partie}$ sont demi-pensionnaires. ` +
          `Quelle proportion cela représente-t-il, en pourcentage ?`,
        format: "short",
        expected: [fr(proportion)],
        comparator: "number_equal",
        explanation: exp(
          "Une proportion est le quotient de la partie par le tout ; multiplié par $100$, il donne un pourcentage.",
          "On divise la partie par l'effectif total, puis on convertit.",
          `$\\dfrac{${partie}}{${total}} = ${fr(partie / total)}$, soit $${fr(proportion)}\\,\\%$.`,
          `Les demi-pensionnaires représentent $${fr(proportion)}\\,\\%$ de la classe.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_auto_prop_formes_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_formes",
    difficulty: 2,
    theme: "neutral",
    hint: "Une même proportion s'écrit en fraction, en décimal ou en pourcentage.",
    tags: ["premiere", "maths", "automatisme", "proportion", "template"],
    generate: () => {
      const cas = pick([
        { num: 1, den: 4, dec: 0.25, pct: 25 },
        { num: 1, den: 5, dec: 0.2, pct: 20 },
        { num: 3, den: 4, dec: 0.75, pct: 75 },
        { num: 1, den: 2, dec: 0.5, pct: 50 },
        { num: 3, den: 5, dec: 0.6, pct: 60 },
      ] as const);
      return {
        text: `Quelle écriture n'est PAS égale à $\\dfrac{${cas.num}}{${cas.den}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(cas.pct)}$`, [
          `$${fr(cas.dec)}$`,
          `$${fr(cas.pct)}\\,\\%$`,
          `$\\dfrac{${cas.num * 2}}{${cas.den * 2}}$`,
        ]),
        expected: [`$${fr(cas.pct)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une proportion s'écrit de plusieurs façons équivalentes : fraction, décimal, pourcentage.",
          "On convertit chaque proposition et on repère l'intruse.",
          `$\\dfrac{${cas.num}}{${cas.den}} = ${fr(cas.dec)} = ${fr(cas.pct)}\\,\\%$, et $\\dfrac{${cas.num * 2}}{${cas.den * 2}}$ se simplifie en $\\dfrac{${cas.num}}{${cas.den}}$. ` +
            `Mais $${fr(cas.pct)}$ SANS le symbole $\\%$ vaut $${fr(cas.pct)}$, soit $${fr(cas.pct / cas.dec)}$ fois trop.`,
          `L'intruse est $${fr(cas.pct)}$ : sans le symbole pour cent, ce n'est plus la même chose du tout.`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_appliquer ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_prop_appliquer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proportion",
    microId: "auto_prop_appliquer",
    difficulty: 2,
    theme: "neutral",
    hint: "$t\\,\\%$ d'un nombre, c'est ce nombre multiplié par $\\frac{t}{100}$.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const taux = pick([20, 25, 30, 40, 60, 75] as const);
      const total = pick([80, 120, 150, 200, 250] as const);
      return {
        text: `Combien vaut $${taux}\\,\\%$ de $${total}$ ?`,
        format: "short",
        expected: [fr((total * taux) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Prendre $t\\,\\%$ d'une quantité, c'est la multiplier par $\\dfrac{t}{100}$.",
          "On convertit le pourcentage en décimal, puis on multiplie.",
          `$${taux}\\,\\% = ${fr(taux / 100)}$, donc $${total} \\times ${fr(taux / 100)} = ${fr((total * taux) / 100)}$.`,
          `$${taux}\\,\\%$ de $${total}$ vaut $${fr((total * taux) / 100)}$. ` +
            `(Métropole demandait $30\\,\\%$ de $150$, les Centres étrangers $25\\,\\%$ de $250$.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_partie_connaissant_tout ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_partie_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_partie_tout",
    microId: "auto_prop_partie_connaissant_tout",
    difficulty: 3,
    theme: "neutral",
    hint: "On applique la proportion à l'effectif total.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const total = pick([200, 400, 500, 800] as const);
      const taux = pick([15, 20, 35, 45] as const);
      return {
        text:
          `Un lycée compte $${total}$ élèves, dont $${taux}\\,\\%$ sont en terminale. ` +
          `Combien d'élèves de terminale y a-t-il ?`,
        format: "short",
        expected: [fr((total * taux) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "Connaissant le tout et la proportion, on obtient la partie en multipliant.",
          "On applique le pourcentage à l'effectif total.",
          `$${total} \\times ${fr(taux / 100)} = ${fr((total * taux) / 100)}$.`,
          `Il y a $${fr((total * taux) / 100)}$ élèves de terminale.`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_tout_connaissant_partie ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_tout_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_partie_tout",
    microId: "auto_prop_tout_connaissant_partie",
    difficulty: 4,
    theme: "neutral",
    hint: "Ici c'est le TOUT qu'on cherche : on divise par la proportion.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const taux = pick([20, 25, 40, 50] as const);
      const total = pick([200, 400, 500] as const);
      const partie = (total * taux) / 100;
      return {
        text:
          `Dans un lycée, $${taux}\\,\\%$ des élèves sont demi-pensionnaires, ce qui représente $${fr(partie)}$ élèves. ` +
          `Combien le lycée compte-t-il d'élèves au total ?`,
        format: "short",
        expected: [fr(total)],
        comparator: "number_equal",
        explanation: exp(
          "Si la partie vaut $t\\,\\%$ du tout, alors le tout s'obtient en DIVISANT la partie par $\\dfrac{t}{100}$.",
          "On divise, au lieu de multiplier.",
          `$\\dfrac{${fr(partie)}}{${fr(taux / 100)}} = ${fr(total)}$. Vérification : $${fr(total)} \\times ${fr(taux / 100)} = ${fr(partie)}$.`,
          `Le lycée compte $${fr(total)}$ élèves. ⚠️ Multiplier $${fr(partie)}$ par $${fr(taux / 100)}$ donnerait $${fr((partie * taux) / 100)}$, ` +
            `un nombre PLUS PETIT que la partie : impossible.`
        ),
      };
    },
  },

  /* ═══════════════ auto_prop_pourcentage_de_pourcentage ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_pct_de_pct_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_partie_tout",
    microId: "auto_prop_pourcentage_de_pourcentage",
    difficulty: 4,
    theme: "neutral",
    hint: "Un pourcentage d'un pourcentage se calcule en MULTIPLIANT les deux proportions.",
    tags: ["premiere", "maths", "automatisme", "pourcentage", "template", "short"],
    generate: () => {
      const t1 = pick([20, 40, 50, 60] as const);
      const t2 = pick([10, 25, 50] as const);
      const resultat = (t1 * t2) / 100;
      return {
        text:
          `Dans un lycée, $${t1}\\,\\%$ des élèves sont en seconde, et parmi eux $${t2}\\,\\%$ font du sport. ` +
          `Quel pourcentage des élèves DU LYCÉE sont des secondes sportifs ?`,
        format: "short",
        expected: [fr(resultat)],
        comparator: "number_equal",
        explanation: exp(
          "Un pourcentage d'un pourcentage revient à multiplier les deux proportions, pas à les additionner ni à les soustraire.",
          "On convertit les deux taux en décimaux, on multiplie, puis on reconvertit.",
          `$${fr(t1 / 100)} \\times ${fr(t2 / 100)} = ${fr(resultat / 100)}$, soit $${fr(resultat)}\\,\\%$.`,
          `$${fr(resultat)}\\,\\%$ des élèves du lycée sont des secondes sportifs. ` +
            `Le résultat est toujours PLUS PETIT que chacun des deux pourcentages : une partie d'une partie.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_lire_graphique ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_stat_lire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lire_statistiques",
    microId: "auto_stat_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "On repère la catégorie, puis on lit la hauteur correspondante.",
    tags: ["premiere", "maths", "automatisme", "statistiques", "template", "short"],
    generate: () => {
      const mois = ["Janvier", "Février", "Mars", "Avril"] as const;
      const valeurs = [
        pick([120, 150] as const),
        pick([180, 200] as const),
        pick([90, 110] as const),
        pick([240, 260] as const),
      ];
      const k = Math.floor(Math.random() * 4);
      return {
        text:
          `Le diagramme ci-contre donne les ventes mensuelles d'un magasin, en unités. ` +
          `Combien d'unités ont été vendues en ${mois[k].toLowerCase()} ?`,
        format: "short",
        expected: [String(valeurs[k])],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: "Ventes mensuelles",
          data: mois.map((m, i) => ({ label: m, value: valeurs[i] })),
          display: { showValues: false, showLabels: true },
        },
        explanation: exp(
          "Dans un diagramme en barres, la hauteur de chaque barre est proportionnelle à la valeur représentée.",
          "On repère la barre demandée, puis on lit sa hauteur sur l'axe vertical.",
          `La barre de ${mois[k].toLowerCase()} atteint $${valeurs[k]}$.`,
          `$${valeurs[k]}$ unités ont été vendues en ${mois[k].toLowerCase()}.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_graphiques_usuels ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_stat_usuels_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lire_statistiques",
    microId: "auto_stat_graphiques_usuels",
    difficulty: 3,
    theme: "neutral",
    hint: "Comparer deux barres, c'est comparer deux hauteurs — mais le total, lui, se calcule.",
    tags: ["premiere", "maths", "automatisme", "statistiques", "template", "short"],
    generate: () => {
      const mois = ["Janvier", "Février", "Mars"] as const;
      const valeurs = [pick([100, 150] as const), pick([200, 250] as const), pick([50, 80] as const)];
      const total = valeurs.reduce((s, v) => s + v, 0);
      return {
        text: `D'après le diagramme ci-contre, quel est le total des ventes sur les trois mois ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        canvas: {
          kind: "stat_graph",
          graphType: "barres",
          title: "Ventes mensuelles",
          data: mois.map((m, i) => ({ label: m, value: valeurs[i] })),
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Un diagramme en barres se lit valeur par valeur ; le total demande de les additionner.",
          "On relève les trois hauteurs, puis on les additionne.",
          `$${valeurs.join(" + ")} = ${total}$.`,
          `Le total des ventes est de $${total}$ unités.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_graphique_donnees ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_stat_donnees_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_lire_statistiques",
    microId: "auto_stat_graphique_donnees",
    difficulty: 3,
    theme: "neutral",
    hint: "Un diagramme circulaire montre des PARTS d'un tout, pas des effectifs.",
    tags: ["premiere", "maths", "automatisme", "statistiques", "template"],
    generate: () => {
      const total = pick([200, 400, 500] as const);
      const parts = [50, 25, 15, 10];
      const k = pick([0, 1, 2] as const);
      const labels = ["Bus", "Voiture", "À pied", "Vélo"] as const;
      const effectif = (total * parts[k]) / 100;
      return {
        text:
          `Le diagramme ci-contre donne la répartition des $${total}$ élèves d'un lycée selon leur mode de transport, en pourcentage. ` +
          `Combien d'élèves viennent en ${labels[k].toLowerCase()} ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(effectif)}$ élèves`, [
          `$${parts[k]}$ élèves`,
          `$${fr(effectif / 10)}$ élèves`,
          `$${fr(total - effectif)}$ élèves`,
        ]),
        expected: [`$${fr(effectif)}$ élèves`],
        comparator: "mcq_exact",
        canvas: {
          kind: "stat_graph",
          graphType: "camembert",
          title: "Mode de transport (en %)",
          data: labels.map((l, i) => ({ label: l, value: parts[i] })),
          display: { showValues: true, showLabels: true },
        },
        explanation: exp(
          "Un diagramme circulaire donne des proportions : pour obtenir un effectif, il faut les appliquer au total.",
          "On lit le pourcentage, puis on l'applique à l'effectif total.",
          `${labels[k]} représente $${parts[k]}\\,\\%$, donc $${total} \\times ${fr(parts[k] / 100)} = ${fr(effectif)}$ élèves.`,
          `$${fr(effectif)}$ élèves viennent en ${labels[k].toLowerCase()}. ` +
            `⚠️ $${parts[k]}$ est un POURCENTAGE, pas un nombre d'élèves.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${parts[k]}$ élèves`,
            cause: "a pris le pourcentage pour un effectif",
          },
        ],
      };
    },
  },

  /* ═══════════════ auto_stat_moyenne ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_moyenne_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_moyenne",
    difficulty: 2,
    theme: "neutral",
    hint: "Somme des valeurs, divisée par leur nombre.",
    tags: ["premiere", "maths", "automatisme", "moyenne", "template", "short"],
    generate: () => {
      const n = pick([5, 6] as const);
      const base = pick([8, 10, 12] as const);
      // Des valeurs dont la somme est un multiple de n.
      const valeurs = Array.from({ length: n }, (_, i) => base + ((i * 2) % 5) - 2);
      const somme = valeurs.reduce((s, v) => s + v, 0);
      const moyenne = somme / n;
      return {
        text: `Quelle est la moyenne de la série ci-contre ?`,
        format: "short",
        expected: [fr(Math.round(moyenne * 100) / 100)],
        comparator: "number_equal",
        canvas: canvasSerie(valeurs, "Série statistique"),
        explanation: exp(
          "La moyenne d'une série est la somme de ses valeurs divisée par leur nombre.",
          "On additionne, puis on divise par l'effectif.",
          `$${valeurs.join(" + ")} = ${somme}$, et $\\dfrac{${somme}}{${n}} = ${fr(Math.round(moyenne * 100) / 100)}$.`,
          `La moyenne vaut $${fr(Math.round(moyenne * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_mediane ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_mediane_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_mediane",
    difficulty: 3,
    theme: "neutral",
    hint: "On RANGE d'abord la série dans l'ordre croissant. Avec un effectif pair, la médiane est la moyenne des deux valeurs centrales.",
    tags: ["premiere", "maths", "automatisme", "mediane", "template", "short"],
    generate: () => {
      // Effectif pair, comme au sujet de Métropole : 2 ; 3 ; 5 ; 4 ; 2 ; 3.
      const valeurs = shuffle([2, 2, 3, 3, 4, 5] as const).slice(0, 6);
      const triees = [...valeurs].sort((a, b) => a - b);
      const mediane = (triees[2] + triees[3]) / 2;
      return {
        text:
          `Voici les six dernières notes attribuées à un hôtel : ` +
          `$${valeurs.join(" \\, ; \\, ")}$. Quelle est la médiane de cette série ?`,
        format: "short",
        expected: [fr(mediane)],
        comparator: "number_equal",
        canvas: canvasSerie([...valeurs], "Les six notes, dans l'ordre où elles ont été données"),
        explanation: exp(
          "La médiane partage la série ordonnée en deux moitiés de même effectif.",
          "On range d'abord les valeurs dans l'ordre croissant. L'effectif étant PAIR, la médiane est la moyenne des deux valeurs centrales.",
          `Série ordonnée : $${triees.join(" \\, ; \\, ")}$. Les deux valeurs centrales sont $${triees[2]}$ et $${triees[3]}$, ` +
            `donc la médiane vaut $\\dfrac{${triees[2]} + ${triees[3]}}{2} = ${fr(mediane)}$.`,
          `La médiane est $${fr(mediane)}$. ⚠️ Oublier de ranger la série est l'erreur classique. ` +
            `(Question tombée à Métropole, juin 2026.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_quartiles ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_quartiles_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_quartiles",
    difficulty: 4,
    theme: "neutral",
    hint: "Le premier quartile est la plus petite valeur telle qu'au moins un quart de la série lui soit inférieur ou égal.",
    tags: ["premiere", "maths", "automatisme", "quartiles", "template", "short"],
    generate: () => {
      // Effectif 8 : Q1 est la 2ᵉ valeur (8/4 = 2).
      const valeurs = shuffle([3, 5, 6, 8, 9, 11, 12, 15] as const).slice(0, 8);
      const triees = [...valeurs].sort((a, b) => a - b);
      const q1 = triees[1];
      return {
        text:
          `Une série comporte $8$ valeurs, données ci-contre. ` +
          `Quel est son premier quartile $Q_1$ ?`,
        format: "short",
        expected: [String(q1)],
        comparator: "number_equal",
        canvas: canvasSerie([...triees], "Série rangée dans l'ordre croissant"),
        explanation: exp(
          "Le premier quartile $Q_1$ est la plus petite valeur de la série ordonnée telle qu'au moins $25\\,\\%$ des données lui soient inférieures ou égales.",
          "On calcule $\\dfrac{n}{4}$ ; si le résultat est entier, $Q_1$ est la valeur de ce rang.",
          `$\\dfrac{8}{4} = 2$, donc $Q_1$ est la $2^\\text{e}$ valeur de la série ordonnée, soit $${q1}$.`,
          `$Q_1 = ${q1}$ : un quart au moins des valeurs lui sont inférieures ou égales.`
        ),
      };
    },
  },

  /* ═══════════════ auto_stat_interpreter_indicateurs ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_auto_interpreter_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_interpreter_indicateurs",
    difficulty: 4,
    theme: "neutral",
    text:
      "Dans une entreprise, le salaire MOYEN est de $2\\,800$ € et le salaire MÉDIAN de $2\\,100$ €. " +
      "Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "Quelques salaires très élevés tirent la moyenne vers le haut",
      "La moitié des salariés gagnent $2\\,800$ €",
      "Tous les salaires sont compris entre $2\\,100$ € et $2\\,800$ €",
      "Il y a une erreur : la moyenne ne peut pas dépasser la médiane",
    ],
    expected: ["Quelques salaires très élevés tirent la moyenne vers le haut"],
    comparator: "mcq_exact",
    hint: "La médiane ne bouge pas quand une valeur extrême devient encore plus extrême. La moyenne, si.",
    explanation: exp(
      "La médiane partage l'effectif en deux ; la moyenne tient compte de la VALEUR de chaque donnée, y compris des valeurs extrêmes.",
      "On compare les deux indicateurs : un écart important signale une distribution déséquilibrée.",
      "Ici la moyenne dépasse la médiane de $700$ € : la moitié des salariés gagnent moins de $2\\,100$ €, mais quelques hauts salaires suffisent à relever la moyenne.",
      "Quelques salaires très élevés tirent la moyenne vers le haut. C'est pourquoi on publie souvent le salaire MÉDIAN : il résiste aux valeurs extrêmes."
    ),
    choiceDiagnostics: [
      {
        choice: "La moitié des salariés gagnent $2\\,800$ €",
        cause: "confond moyenne et médiane : c'est la médiane qui partage l'effectif en deux",
      },
    ],
    tags: ["premiere", "maths", "automatisme", "indicateurs", "esprit-critique"],
  },

  /* ═══════════════ auto_stat_boites ═══════════════ */

  {
    kind: "fixed",
    id: "premiere_auto_boites_fixed_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_indicateurs",
    microId: "auto_stat_boites",
    difficulty: 4,
    theme: "neutral",
    text: "Sur un diagramme en boîte, que représente la LARGEUR de la boîte ?",
    format: "qcm",
    choices: [
      "L'écart interquartile, qui contient la moitié centrale des valeurs",
      "L'étendue totale de la série",
      "La moyenne de la série",
      "Le nombre de valeurs de la série",
    ],
    expected: ["L'écart interquartile, qui contient la moitié centrale des valeurs"],
    comparator: "mcq_exact",
    hint: "Les bords de la boîte sont $Q_1$ et $Q_3$.",
    explanation: exp(
      "Un diagramme en boîte représente cinq nombres : minimum, $Q_1$, médiane, $Q_3$, maximum.",
      "On repère ce que délimitent les bords de la boîte.",
      "Les bords sont $Q_1$ et $Q_3$ : entre eux se trouvent $50\\,\\%$ des valeurs, celles du milieu. Les moustaches, elles, vont jusqu'aux extrêmes.",
      "La largeur de la boîte est l'écart interquartile $Q_3 - Q_1$. Une boîte étroite signale des valeurs resserrées ; une boîte large, une série dispersée — c'est ce qui permet de COMPARER deux distributions d'un coup d'œil."
    ),
    tags: ["premiere", "maths", "automatisme", "boites"],
  },

  /* ═══════════════ auto_proba_encadrement ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_proba_encadrement_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_base",
    microId: "auto_proba_encadrement",
    difficulty: 2,
    theme: "neutral",
    hint: "Une probabilité est toujours comprise entre $0$ et $1$.",
    tags: ["premiere", "maths", "automatisme", "probabilites", "template"],
    generate: () => {
      const impossible = pick([1.4, 2.5, -0.3, 1.2] as const);
      const possible = pick([0.15, 0.4, 0.85] as const);
      return {
        text: `Parmi ces nombres, lequel NE PEUT PAS être une probabilité ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(impossible)}$`, [
          `$${fr(possible)}$`,
          "$0$",
          "$1$",
        ]),
        expected: [`$${fr(impossible)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Une probabilité est un nombre compris entre $0$ et $1$, bornes incluses.",
          "On vérifie l'encadrement de chaque proposition.",
          `$${fr(impossible)}$ ${impossible < 0 ? "est négatif" : "dépasse 1"} : c'est impossible. ` +
            `$0$ correspond à un évènement impossible, $1$ à un évènement certain : les deux sont des probabilités valables.`,
          `$${fr(impossible)}$ ne peut pas être une probabilité.`
        ),
      };
    },
  },

  /* ═══════════════ auto_proba_somme_issues ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_proba_somme_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_base",
    microId: "auto_proba_somme_issues",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme des probabilités de TOUTES les issues vaut exactement $1$.",
    tags: ["premiere", "maths", "automatisme", "probabilites", "template", "short"],
    generate: () => {
      const p1 = pick([0.1, 0.15, 0.2] as const);
      const p2 = pick([0.25, 0.3] as const);
      const p3 = pick([0.2, 0.3] as const);
      const manquante = Math.round((1 - p1 - p2 - p3) * 100) / 100;
      return {
        text:
          `On lance un dé truqué à quatre faces. Les probabilités des faces $1$, $2$ et $3$ valent respectivement ` +
          `$${fr(p1)}$, $${fr(p2)}$ et $${fr(p3)}$. Quelle est la probabilité de la face $4$ ?`,
        format: "short",
        expected: [fr(manquante)],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_donnees",
          title: "Dé truqué à quatre faces",
          headers: ["", "Face 1", "Face 2", "Face 3", "Face 4"],
          rows: [{ label: "Probabilité", values: [fr(p1), fr(p2), fr(p3), "?"] }],
        },
        explanation: exp(
          "La somme des probabilités de toutes les issues d'une expérience aléatoire vaut $1$.",
          "On additionne les probabilités connues, puis on retire le total à $1$.",
          `$${fr(p1)} + ${fr(p2)} + ${fr(p3)} = ${fr(Math.round((p1 + p2 + p3) * 100) / 100)}$, ` +
            `donc la face $4$ a pour probabilité $1 - ${fr(Math.round((p1 + p2 + p3) * 100) / 100)} = ${fr(manquante)}$.`,
          `$P(\\text{face } 4) = ${fr(manquante)}$. (Question tombée au sujet d'Asie, juin 2026.)`
        ),
      };
    },
  },

  /* ═══════════════ auto_proba_contraire ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_proba_contraire_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_base",
    microId: "auto_proba_contraire",
    difficulty: 2,
    theme: "neutral",
    hint: "$P(\\overline{A}) = 1 - P(A)$.",
    tags: ["premiere", "maths", "automatisme", "probabilites", "template", "short"],
    generate: () => {
      const p = pick([0.15, 0.25, 0.4, 0.72, 0.9] as const);
      return {
        text:
          `La probabilité qu'un appareil tombe en panne au cours d'une journée vaut $${fr(p)}$. ` +
          `Quelle est la probabilité qu'il ne tombe PAS en panne ?`,
        format: "short",
        expected: [fr(Math.round((1 - p) * 100) / 100)],
        comparator: "number_equal",
        explanation: exp(
          "L'évènement contraire de $A$, noté $\\overline{A}$, se réalise exactement quand $A$ ne se réalise pas : $P(\\overline{A}) = 1 - P(A)$.",
          "On retire la probabilité donnée à $1$.",
          `$1 - ${fr(p)} = ${fr(Math.round((1 - p) * 100) / 100)}$.`,
          `La probabilité qu'il ne tombe pas en panne vaut $${fr(Math.round((1 - p) * 100) / 100)}$.`
        ),
      };
    },
  },

  /* ═══════════════ auto_proba_equiprobabilite ═══════════════ */

  {
    kind: "template",
    id: "premiere_auto_proba_equiprobabilite_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "auto_proba_base",
    microId: "auto_proba_equiprobabilite",
    difficulty: 3,
    theme: "neutral",
    hint: "En situation d'équiprobabilité, $P(A) = \\frac{\\text{nombre de cas favorables}}{\\text{nombre de cas possibles}}$.",
    tags: ["premiere", "maths", "automatisme", "probabilites", "template", "short"],
    generate: () => {
      const total = pick([20, 25, 40, 50] as const);
      const favorables = pick([4, 5, 10] as const);
      const p = favorables / total;
      return {
        text:
          `Une urne contient $${total}$ jetons indiscernables, dont $${favorables}$ sont rouges. ` +
          `On en tire un au hasard. Quelle est la probabilité d'obtenir un jeton rouge ?`,
        format: "short",
        expected: [fr(p), `${favorables}/${total}`],
        comparator: "fraction_decimal_equivalent",
        explanation: exp(
          "Quand toutes les issues ont la même probabilité, $P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$.",
          "On compte les cas favorables et les cas possibles.",
          `$\\dfrac{${favorables}}{${total}} = ${fr(p)}$.`,
          `La probabilité vaut $${fr(p)}$. Les jetons étant indiscernables, l'hypothèse d'équiprobabilité est légitime — c'est elle qui autorise ce calcul.`
        ),
      };
    },
  },
];
