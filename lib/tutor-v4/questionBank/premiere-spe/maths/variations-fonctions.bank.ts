// lib/tutor-v4/questionBank/premiere-spe/maths/variations-fonctions.bank.ts
//
// Chapitre : Variations et courbes des fonctions (notion "variations_fonctions")
// microSkills :
//   var_signe_derivee — lien entre signe de f' et variations
//   var_tableau       — dresser un tableau de variations
//   var_extremum      — déterminer un extremum
//   var_optimisation  — résoudre un problème d'optimisation
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique.

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

function parabole(a: number, b: number, c: number): CanvasFigure {
  const xs = -b / (2 * a);
  const ys = a * xs * xs + b * xs + c;
  return {
    kind: "fonctionGraphique",
    size: { width: 300, height: 300 },
    xmin: -6,
    xmax: 6,
    ymin: -8,
    ymax: 8,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#2563eb" }],
    misesEnEvidence: [
      { point: { x: Math.round(xs * 100) / 100, y: Math.round(ys * 100) / 100, label: "S", couleur: "#dc2626" } },
    ],
  };
}

export const variationsFonctionsBank: TutorBankItemV4[] = [
  /* ===================== VAR_SIGNE_DERIVEE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un intervalle où $f'(x) > 0$, la fonction $f$ est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "nulle"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Dérivée positive.",
    explanation: exp(
      "Le signe de la dérivée donne le sens de variation.",
      "Si $f'(x) > 0$ sur un intervalle, $f$ y croît.",
      "C'est la règle fondamentale dérivée ↔ variations.",
      "$f$ est croissante."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un intervalle où $f'(x) < 0$, la fonction $f$ est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "maximale"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "Dérivée négative.",
    explanation: exp(
      "Le signe de la dérivée donne le sens de variation.",
      "Si $f'(x) < 0$ sur un intervalle, $f$ y décroît.",
      "C'est la règle dérivée ↔ variations.",
      "$f$ est décroissante."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f'(x) = 0$ sur tout un intervalle, alors $f$ y est :",
    format: "qcm",
    choices: ["constante", "croissante", "décroissante", "nulle"],
    expected: ["constante"],
    comparator: "mcq_exact",
    hint: "Pas de variation.",
    explanation: exp(
      "Une dérivée nulle sur un intervalle signifie aucune variation.",
      "$f$ ne monte ni ne descend.",
      "Elle est donc constante sur cet intervalle.",
      "$f$ est constante."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Soit $f(x) = x^2 - 4x + 1$ donc $f'(x) = 2x - 4$. Sur quel intervalle $f$ est-elle croissante ?",
    format: "qcm",
    choices: ["$[2 ; +\\infty[$", "$]-\\infty ; 2]$", "$\\mathbb{R}$", "$[0 ; 2]$"],
    expected: ["$[2 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "Là où $f'(x) \\ge 0$, soit $2x - 4 \\ge 0$.",
    explanation: exp(
      "$f$ croît là où $f'(x) \\ge 0$.",
      "$2x - 4 \\ge 0 \\Leftrightarrow x \\ge 2$.",
      "Donc $f$ croît sur $[2 ; +\\infty[$.",
      "$[2 ; +\\infty[$."
    ),
    canvas: parabole(1, -4, 1),
    tags: ["premiere", "maths", "variations", "signe_derivee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 4,
    theme: "neutral",
    text: "Pour étudier les variations d'une fonction dérivable, on étudie d'abord :",
    format: "qcm",
    choices: ["le signe de $f'(x)$", "le signe de $f(x)$", "la valeur de $f(0)$", "les racines de $f$"],
    expected: ["le signe de $f'(x)$"],
    comparator: "mcq_exact",
    hint: "Variations ← dérivée.",
    explanation: exp(
      "Les variations se déduisent du signe de la dérivée.",
      "On calcule $f'$, puis on étudie son signe.",
      "On en déduit le tableau de variations.",
      "On étudie le signe de $f'(x)$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction $f$ a pour dérivée $f'(x) = 3x^2 + 1$. Que peut-on dire de $f$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "elle est croissante sur $\\mathbb{R}$",
      "elle est décroissante sur $\\mathbb{R}$",
      "elle est constante",
      "elle change de sens en $x = 0$",
    ],
    expected: ["elle est croissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "$3x^2$ est positif ou nul : que vaut alors $3x^2 + 1$ ?",
    explanation: exp(
      "Le sens de variation est donné par le signe de la dérivée.",
      "Un carré est toujours positif ou nul, donc $3x^2 \\ge 0$ et $3x^2 + 1 \\ge 1 > 0$.",
      "La dérivée est strictement positive partout : elle ne s'annule jamais.",
      "$f$ est croissante sur $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 5,
    theme: "neutral",
    text: "Soit $f(x) = x^3 - 3x$, donc $f'(x) = 3x^2 - 3$. Sur quel intervalle $f$ est-elle décroissante ?",
    format: "qcm",
    choices: ["$[-1 ; 1]$", "$[0 ; 3]$", "$]-\\infty ; -1]$", "$\\mathbb{R}$"],
    expected: ["$[-1 ; 1]$"],
    comparator: "mcq_exact",
    hint: "Factorise : $3x^2 - 3 = 3(x - 1)(x + 1)$. Où ce trinôme est-il négatif ?",
    explanation: exp(
      "$f$ décroît là où $f'(x) \\le 0$.",
      "$f'(x) = 3(x^2 - 1) = 3(x - 1)(x + 1)$ : les racines sont $-1$ et $1$, et le coefficient de $x^2$ est positif.",
      "Un tel trinôme est négatif ENTRE ses racines, donc sur $[-1 ; 1]$.",
      "$f$ est décroissante sur $[-1 ; 1]$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f$ est décroissante sur un intervalle $I$, alors sur $I$ :",
    format: "qcm",
    choices: [
      "$f'(x) \\le 0$",
      "$f'(x) \\ge 0$",
      "$f(x) \\le 0$",
      "$f'(x) = 0$",
    ],
    expected: ["$f'(x) \\le 0$"],
    comparator: "mcq_exact",
    hint: "Attention : c'est le signe de la DÉRIVÉE, pas celui de $f$.",
    explanation: exp(
      "Le lien fonctionne dans les deux sens : $f$ décroissante sur $I$ équivaut à $f' \\le 0$ sur $I$.",
      "Le signe de $f(x)$ n'a rien à voir : une fonction peut être décroissante tout en restant positive.",
      "Par exemple $f(x) = \\dfrac{1}{x}$ sur $]0 ; +\\infty[$ est positive ET décroissante.",
      "Sur $I$, $f'(x) \\le 0$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 2,
    theme: "neutral",
    text: "Soit $f(x) = -2x + 7$. Que peut-on dire de $f$ ?",
    format: "qcm",
    choices: [
      "elle est décroissante sur $\\mathbb{R}$",
      "elle est croissante sur $\\mathbb{R}$",
      "elle est constante",
      "elle décroît puis croît",
    ],
    expected: ["elle est décroissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "$f'(x) = -2$ : quel est son signe ?",
    explanation: exp(
      "Pour une fonction affine $ax + b$, la dérivée est la constante $a$.",
      "Ici $f'(x) = -2$, qui est négatif quel que soit $x$.",
      "La dérivée est négative partout, donc la fonction descend partout.",
      "$f$ est décroissante sur $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 5,
    theme: "neutral",
    text: "Une fonction $f$ a pour dérivée $f'(x) = (x - 3)^2$. Que peut-on dire de $f$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "elle est croissante sur $\\mathbb{R}$",
      "elle est décroissante sur $\\mathbb{R}$",
      "elle a un maximum en $x = 3$",
      "elle a un minimum en $x = 3$",
    ],
    expected: ["elle est croissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Un carré s'annule, mais ne devient jamais négatif.",
    explanation: exp(
      "Le sens de variation dépend du SIGNE de $f'$, pas de ses valeurs nulles.",
      "$(x - 3)^2 \\ge 0$ pour tout $x$ : la dérivée est positive partout, et nulle seulement en $x = 3$.",
      "En $x = 3$ la dérivée s'annule sans changer de signe : la courbe a une tangente horizontale, mais $f$ continue de monter — ce n'est pas un extremum.",
      "$f$ est croissante sur $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sg_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 4,
    theme: "neutral",
    text: "On sait que $f'(x) > 0$ sur $]-\\infty ; 2[$ et $f'(x) < 0$ sur $]2 ; +\\infty[$. Que fait $f$ ?",
    format: "qcm",
    choices: [
      "elle croît puis décroît",
      "elle décroît puis croît",
      "elle croît sur $\\mathbb{R}$",
      "elle est constante après $2$",
    ],
    expected: ["elle croît puis décroît"],
    comparator: "mcq_exact",
    hint: "Dérivée positive = ça monte ; dérivée négative = ça descend.",
    explanation: exp(
      "On traduit chaque intervalle de signe de $f'$ en sens de variation de $f$.",
      "$f' > 0$ avant $2$ : $f$ croît. $f' < 0$ après $2$ : $f$ décroît.",
      "La fonction monte jusqu'en $2$ puis redescend : elle atteint un maximum en $x = 2$.",
      "$f$ croît puis décroît."
    ),
    tags: ["premiere", "maths", "variations", "signe_derivee", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_var_sg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "Là où $f'(x) \\ge 0$.",
    tags: ["premiere", "maths", "variations", "signe_derivee", "template"],
    generate: () => {
      const alpha = randomInt(1, 4);
      const b = -2 * alpha;
      const c = randomInt(-2, 3);
      const correct = `$[${alpha} ; +\\infty[$`;
      const choices = [correct, `$]-\\infty ; ${alpha}]$`, "$\\mathbb{R}$", `$[0 ; ${alpha}]$`];
      return {
        text: `Soit $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x ${c >= 0 ? "+ " + c : "- " + -c}$, donc $f'(x) = 2x ${b >= 0 ? "+ " + b : "- " + -b}$. Sur quel intervalle $f$ est-elle croissante ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "$f$ croît là où $f'(x) \\ge 0$.",
          `$2x ${b >= 0 ? "+ " + b : "- " + -b} \\ge 0 \\Leftrightarrow x \\ge ${alpha}$.`,
          `Donc $f$ croît sur $[${alpha} ; +\\infty[$.`,
          `$[${alpha} ; +\\infty[$.`
        ),
      };
    },
  },

  /* ===================== VAR_TABLEAU ===================== */
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau de variations, une flèche montante signifie que la fonction est :",
    format: "qcm",
    choices: ["croissante", "décroissante", "constante", "négative"],
    expected: ["croissante"],
    comparator: "mcq_exact",
    hint: "Flèche ↗.",
    explanation: exp(
      "Le tableau de variations représente le sens de variation par des flèches.",
      "Une flèche montante ↗ correspond à une croissance.",
      "Elle se place là où $f' > 0$.",
      "La fonction est croissante."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2$, le tableau de variations montre que $f$ :",
    format: "qcm",
    choices: [
      "décroît puis croît",
      "croît puis décroît",
      "est toujours croissante",
      "est constante",
    ],
    expected: ["décroît puis croît"],
    comparator: "mcq_exact",
    hint: "Parabole tournée vers le haut, sommet en $0$.",
    explanation: exp(
      "$f'(x) = 2x$ : négatif avant $0$, positif après.",
      "$f$ décroît sur $]-\\infty ; 0]$ puis croît sur $[0 ; +\\infty[$.",
      "Le sommet (minimum) est en $x = 0$.",
      "$f$ décroît puis croît."
    ),
    canvas: parabole(1, 0, 0),
    tags: ["premiere", "maths", "variations", "tableau", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un tableau de variations, où place-t-on les valeurs qui annulent $f'$ ?",
    format: "qcm",
    choices: [
      "aux changements de sens (extremums)",
      "uniquement aux bornes",
      "nulle part",
      "à $x = 0$ seulement",
    ],
    expected: ["aux changements de sens (extremums)"],
    comparator: "mcq_exact",
    hint: "$f' = 0$ : la dérivée change souvent de signe.",
    explanation: exp(
      "Les valeurs annulant $f'$ peuvent marquer un changement de sens.",
      "On les place comme abscisses séparant croissance et décroissance.",
      "Elles correspondent souvent à un extremum local.",
      "Aux changements de sens (extremums)."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = -x^2 + 6x$, $f'(x) = -2x + 6$. La fonction croît sur :",
    format: "qcm",
    choices: ["$]-\\infty ; 3]$", "$[3 ; +\\infty[$", "$\\mathbb{R}$", "$[0 ; 6]$"],
    expected: ["$]-\\infty ; 3]$"],
    comparator: "mcq_exact",
    hint: "$f'(x) \\ge 0 \\Leftrightarrow -2x + 6 \\ge 0$.",
    explanation: exp(
      "$f$ croît là où $f'(x) \\ge 0$.",
      "$-2x + 6 \\ge 0 \\Leftrightarrow x \\le 3$.",
      "Donc $f$ croît sur $]-\\infty ; 3]$ (parabole vers le bas).",
      "$]-\\infty ; 3]$."
    ),
    canvas: parabole(-1, 6, 0),
    tags: ["premiere", "maths", "variations", "tableau", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau de variations, une flèche descendante signifie que la fonction est :",
    format: "qcm",
    choices: ["décroissante", "croissante", "constante", "négative"],
    expected: ["décroissante"],
    comparator: "mcq_exact",
    hint: "La flèche suit le trajet de la courbe.",
    explanation: exp(
      "Les flèches d'un tableau de variations dessinent le trajet de la courbe.",
      "Une flèche qui descend indique que les valeurs de $f$ diminuent quand $x$ augmente.",
      "C'est la définition d'une fonction décroissante. La flèche ne dit rien du SIGNE de $f$ : une fonction décroissante peut rester positive.",
      "La fonction est décroissante."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^3 - 3x$, on a $f'(x) = 3x^2 - 3$. Combien de valeurs de $x$ annulent $f'$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $3x^2 - 3 = 0$.",
    explanation: exp(
      "Les valeurs qui annulent $f'$ sont celles qui découpent le tableau de variations en colonnes.",
      "$3x^2 - 3 = 0 \\Leftrightarrow x^2 = 1$.",
      "Il y a deux solutions : $x = -1$ et $x = 1$.",
      "Deux valeurs annulent $f'$ : le tableau aura donc trois zones de variation."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = 2x^3 - 6x$, on a $f'(x) = 6x^2 - 6$. Sur quels intervalles $f$ est-elle croissante ?",
    format: "qcm",
    choices: [
      "$]-\\infty ; -1]$ et $[1 ; +\\infty[$",
      "$[-1 ; 1]$",
      "$\\mathbb{R}$",
      "$[0 ; +\\infty[$",
    ],
    expected: ["$]-\\infty ; -1]$ et $[1 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "$6x^2 - 6 = 6(x - 1)(x + 1)$ : positif à l'extérieur des racines.",
    explanation: exp(
      "$f$ croît là où $f'(x) \\ge 0$.",
      "$f'(x) = 6(x - 1)(x + 1)$ : c'est un trinôme de racines $-1$ et $1$ avec un coefficient dominant positif.",
      "Il est donc positif à l'EXTÉRIEUR des racines : sur $]-\\infty ; -1]$ et sur $[1 ; +\\infty[$.",
      "$f$ croît sur $]-\\infty ; -1]$ et sur $[1 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Que contiennent les trois lignes d'un tableau de variations ?",
    format: "qcm",
    choices: [
      "les valeurs de $x$, le signe de $f'(x)$, les variations de $f$",
      "les valeurs de $x$, le signe de $f(x)$, les variations de $f'$",
      "les valeurs de $x$, les racines de $f$, le maximum",
      "les valeurs de $f$, celles de $f'$, celles de $f''$",
    ],
    expected: ["les valeurs de $x$, le signe de $f'(x)$, les variations de $f$"],
    comparator: "mcq_exact",
    hint: "On part de $x$, on passe par la dérivée, on conclut sur $f$.",
    explanation: exp(
      "Le tableau raconte le raisonnement dans l'ordre où on le mène.",
      "Ligne 1 : les valeurs de $x$ (bornes de l'intervalle et valeurs qui annulent $f'$). Ligne 2 : le signe de $f'(x)$. Ligne 3 : les flèches de variation de $f$.",
      "C'est bien le signe de $f'$ qui figure au milieu, pas celui de $f$ : les deux n'ont aucune raison de coïncider.",
      "$x$, puis le signe de $f'(x)$, puis les variations de $f$."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Le tableau de variations de $f$ sur $[0 ; 5]$ indique : $f$ croissante sur $[0 ; 3]$ puis décroissante sur $[3 ; 5]$, avec $f(3) = 7$. Quel est le maximum de $f$ sur $[0 ; 5]$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Le maximum est atteint là où la fonction cesse de monter.",
    explanation: exp(
      "Sur un tableau de variations, le maximum se lit au sommet, là où les flèches changent de sens.",
      "Ici $f$ monte jusqu'en $x = 3$ puis redescend : le point le plus haut est atteint en $3$.",
      "La valeur correspondante est $f(3) = 7$. (Le maximum est la VALEUR $7$, l'abscisse $3$ est l'endroit où il est atteint.)",
      "Le maximum de $f$ vaut $7$."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 2x + 3$, en quelle abscisse le tableau de variations change-t-il de sens ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Résous $f'(x) = 0$ avec $f'(x) = 2x - 2$.",
    explanation: exp(
      "Le tableau change de sens là où la dérivée s'annule en changeant de signe.",
      "$f'(x) = 2x - 2$, donc $f'(x) = 0 \\Leftrightarrow x = 1$.",
      "Avant $1$, $f'$ est négative ($f$ décroît) ; après, elle est positive ($f$ croît).",
      "Le changement a lieu en $x = 1$."
    ),
    canvas: parabole(1, -2, 3),
    tags: ["premiere", "maths", "variations", "tableau", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_tab_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la ligne des variations, qu'écrit-on au bout de chaque flèche ?",
    format: "qcm",
    choices: [
      "les images $f(x)$ des valeurs remarquables",
      "les valeurs de $f'(x)$",
      "toujours $0$",
      "les racines de $f$",
    ],
    expected: ["les images $f(x)$ des valeurs remarquables"],
    comparator: "mcq_exact",
    hint: "La ligne du bas décrit $f$, pas $f'$.",
    explanation: exp(
      "La dernière ligne du tableau décrit la fonction $f$ elle-même.",
      "Aux extrémités des flèches, on écrit les images : $f$ des bornes de l'intervalle, et $f$ des valeurs qui annulent $f'$.",
      "Ce sont ces images qui donnent les extremums. La valeur $f'(x) = 0$, elle, figure sur la ligne du dessus.",
      "On écrit les images $f(x)$ des valeurs remarquables."
    ),
    tags: ["premiere", "maths", "variations", "tableau", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_var_tab_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Signe de $a$ : vers le haut → décroît puis croît.",
    tags: ["premiere", "maths", "variations", "tableau", "template"],
    generate: () => {
      const versHaut = randomInt(0, 1) === 1;
      const a = versHaut ? 1 : -1;
      const correct = versHaut ? "décroît puis croît" : "croît puis décroît";
      return {
        text: `Une parabole d'équation $y = ${a === 1 ? "" : "-"}x^2 + bx + c$ a son coefficient de $x^2$ ${versHaut ? "positif" : "négatif"}. Que fait la fonction ?`,
        format: "qcm",
        choices: ["décroît puis croît", "croît puis décroît", "est toujours croissante", "est constante"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du coefficient de $x^2$ donne l'allure de la parabole.",
          `Ici il est ${versHaut ? "positif (parabole vers le haut)" : "négatif (parabole vers le bas)"}.`,
          `Donc la fonction ${correct}.`,
          `La fonction ${correct}.`
        ),
      };
    },
  },

  /* ===================== VAR_EXTREMUM ===================== */
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 2,
    theme: "neutral",
    text: "Un extremum d'une fonction dérivable est atteint là où :",
    format: "qcm",
    choices: [
      "$f'$ s'annule en changeant de signe",
      "$f$ s'annule",
      "$f' > 0$",
      "$f$ est négative",
    ],
    expected: ["$f'$ s'annule en changeant de signe"],
    comparator: "mcq_exact",
    hint: "La dérivée change de signe.",
    explanation: exp(
      "Un extremum local correspond à un changement de sens de variation.",
      "La dérivée s'annule et change de signe à cet endroit.",
      "Si $f'$ passe de $+$ à $-$ : maximum ; de $-$ à $+$ : minimum.",
      "$f'$ s'annule en changeant de signe."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 6x + 5$, en quelle abscisse $f$ atteint-elle son minimum ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "$f'(x) = 2x - 6 = 0$.",
    explanation: exp(
      "Le minimum est atteint là où $f'(x) = 0$.",
      "$2x - 6 = 0 \\Leftrightarrow x = 3$.",
      "$f'$ passe de $-$ à $+$ : c'est bien un minimum.",
      "Minimum atteint en $x = 3$."
    ),
    canvas: parabole(1, -6, 5),
    tags: ["premiere", "maths", "variations", "extremum", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 6x + 5$, quelle est la valeur du minimum ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "Calcule $f(3)$.",
    explanation: exp(
      "Le minimum vaut $f$ en l'abscisse du sommet.",
      "$f(3) = 3^2 - 6 \\times 3 + 5 = 9 - 18 + 5$.",
      "$= -4$.",
      "Le minimum vaut $-4$."
    ),
    canvas: parabole(1, -6, 5),
    tags: ["premiere", "maths", "variations", "extremum", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f'$ passe de positif à négatif en $x = a$, alors $f(a)$ est :",
    format: "qcm",
    choices: ["un maximum local", "un minimum local", "nul", "une racine"],
    expected: ["un maximum local"],
    comparator: "mcq_exact",
    hint: "$f$ monte puis descend.",
    explanation: exp(
      "Le sens de variation change selon le signe de $f'$.",
      "$f'$ de $+$ à $-$ : $f$ croît puis décroît.",
      "Le point le plus haut est un maximum local.",
      "Un maximum local."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = -x^2 + 6x$, quelle est la valeur du maximum ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Le maximum est atteint en $x = 3$ : calcule $f(3)$.",
    explanation: exp(
      "La valeur d'un extremum est l'IMAGE du point où la dérivée s'annule.",
      "$f'(x) = -2x + 6$ s'annule en $x = 3$ ; on calcule $f(3) = -3^2 + 6 \\times 3$.",
      "$= -9 + 18 = 9$.",
      "Le maximum vaut $9$ (atteint en $x = 3$)."
    ),
    canvas: parabole(-1, 6, 0),
    tags: ["premiere", "maths", "variations", "extremum", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Si $f'$ passe de négatif à positif en $x = a$, alors $f(a)$ est :",
    format: "qcm",
    choices: ["un minimum local", "un maximum local", "nul", "une racine de $f$"],
    expected: ["un minimum local"],
    comparator: "mcq_exact",
    hint: "$f$ descend puis remonte.",
    explanation: exp(
      "Le sens de variation de $f$ suit le signe de $f'$.",
      "$f'$ négative avant $a$ : $f$ décroît. $f'$ positive après : $f$ croît.",
      "La fonction descend puis remonte : le point le plus bas est atteint en $a$.",
      "$f(a)$ est un minimum local."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = x^3$, on a $f'(0) = 0$. La fonction admet-elle un extremum en $0$ ?",
    format: "qcm",
    choices: [
      "non : $f'$ ne change pas de signe en $0$",
      "oui : c'est un minimum",
      "oui : c'est un maximum",
      "oui, car $f'(0) = 0$ suffit",
    ],
    expected: ["non : $f'$ ne change pas de signe en $0$"],
    comparator: "mcq_exact",
    hint: "$f'(x) = 3x^2$ : quel est son signe avant et après $0$ ?",
    explanation: exp(
      "Une dérivée nulle ne suffit pas : il faut qu'elle CHANGE DE SIGNE pour qu'il y ait un extremum.",
      "$f'(x) = 3x^2$ est positive avant $0$ comme après $0$ : elle s'annule sans changer de signe.",
      "La fonction continue donc de croître ; en $0$ la courbe a seulement une tangente horizontale.",
      "Non : il n'y a pas d'extremum en $0$."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 8x + 3$, quelle est la valeur du minimum ?",
    format: "short",
    expected: ["-13"],
    comparator: "number_equal",
    hint: "$f'(x) = 2x - 8$ s'annule en $4$ : calcule $f(4)$.",
    explanation: exp(
      "On cherche d'abord où $f'$ s'annule, puis on calcule l'image de cette valeur.",
      "$f'(x) = 2x - 8 = 0 \\Leftrightarrow x = 4$. Puis $f(4) = 16 - 32 + 3$.",
      "$= -13$. Comme $f'$ passe de $-$ à $+$, c'est bien un minimum.",
      "Le minimum vaut $-13$."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    text: "Que signifie « $f$ admet un maximum LOCAL en $a$ » ?",
    format: "qcm",
    choices: [
      "$f(a)$ est la plus grande valeur sur un intervalle autour de $a$",
      "$f(a)$ est la plus grande valeur sur tout l'ensemble de définition",
      "$f(a) = 0$",
      "$f$ est croissante après $a$",
    ],
    expected: ["$f(a)$ est la plus grande valeur sur un intervalle autour de $a$"],
    comparator: "mcq_exact",
    hint: "« Local » : ce qui se passe tout près de $a$.",
    explanation: exp(
      "Un maximum local ne vaut que dans le voisinage du point.",
      "$f(a)$ est la plus grande valeur atteinte sur un petit intervalle autour de $a$ : ailleurs, la fonction peut monter bien plus haut.",
      "Si la propriété vaut sur TOUT l'ensemble de définition, on parle de maximum global.",
      "C'est la plus grande valeur sur un intervalle autour de $a$."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = 2x^3 - 6x$, on a $f'(x) = 6x^2 - 6$. En quelle abscisse $f$ admet-elle un maximum local ?",
    format: "short",
    expected: ["-1"],
    comparator: "number_equal",
    hint: "$f'$ s'annule en $-1$ et $1$ : lequel correspond à un passage de $+$ à $-$ ?",
    explanation: exp(
      "Un maximum local est atteint là où $f'$ passe de positif à négatif.",
      "$f'(x) = 6(x - 1)(x + 1)$ s'annule en $-1$ et en $1$. Ce trinôme est positif à l'extérieur des racines, négatif entre elles.",
      "En $x = -1$, $f'$ passe donc de $+$ à $-$ : maximum. En $x = 1$, elle passe de $-$ à $+$ : minimum.",
      "Le maximum local est atteint en $x = -1$."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ext_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 5,
    theme: "neutral",
    text: "Le bénéfice d'un atelier est $B(x) = -x^2 + 40x - 300$ euros pour $x$ objets vendus. Quel est le bénéfice maximal ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "$B'(x) = -2x + 40$ s'annule en $20$ : calcule $B(20)$.",
    explanation: exp(
      "Le bénéfice est maximal là où sa dérivée s'annule en passant de $+$ à $-$.",
      "$B'(x) = -2x + 40 = 0 \\Leftrightarrow x = 20$ objets. Puis $B(20) = -400 + 800 - 300$.",
      "$= 100$.",
      "Le bénéfice maximal est de $100$ € (pour $20$ objets vendus)."
    ),
    tags: ["premiere", "maths", "variations", "extremum", "short"],
  },
  {
    kind: "template",
    id: "premiere_var_ext_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "Abscisse de l'extremum : $f'(x) = 0$.",
    tags: ["premiere", "maths", "variations", "extremum", "template"],
    generate: () => {
      const alpha = randomInt(1, 5);
      const b = -2 * alpha;
      const c = randomInt(0, 6);
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c}$, en quelle abscisse $f$ atteint-elle son minimum ?`,
        format: "short",
        expected: [String(alpha)],
        comparator: "number_equal",
        explanation: exp(
          "Le minimum est atteint là où $f'(x) = 0$.",
          `$f'(x) = 2x ${b >= 0 ? "+ " + b : "- " + -b}$, qui s'annule en $x = ${alpha}$.`,
          "$f'$ passe de $-$ à $+$ : c'est un minimum.",
          `Minimum en $x = ${alpha}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_ext_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum",
    difficulty: 4,
    theme: "neutral",
    hint: "Valeur du minimum $= f(\\alpha)$.",
    tags: ["premiere", "maths", "variations", "extremum", "template"],
    generate: () => {
      const alpha = randomInt(1, 4);
      const b = -2 * alpha;
      const c = randomInt(0, 6);
      const minVal = alpha * alpha + b * alpha + c;
      return {
        text: `Pour $f(x) = x^2 ${b >= 0 ? "+ " + b : "- " + -b}x + ${c}$, quelle est la valeur du minimum ?`,
        format: "short",
        expected: [String(minVal)],
        comparator: "number_equal",
        explanation: exp(
          "Le minimum vaut $f(\\alpha)$ avec $\\alpha = ${alpha}$.".replace("${alpha}", String(alpha)),
          `$f(${alpha}) = ${alpha}^2 ${b >= 0 ? "+ " + b : "- " + -b} \\times ${alpha} + ${c}$.`,
          `$= ${minVal}$.`,
          `Le minimum vaut $${minVal}$.`
        ),
      };
    },
  },

  /* ===================== VAR_OPTIMISATION ===================== */
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour optimiser une grandeur modélisée par une fonction dérivable, on cherche :",
    format: "qcm",
    choices: [
      "où la dérivée s'annule",
      "où la fonction s'annule",
      "l'ordonnée à l'origine",
      "les asymptotes",
    ],
    expected: ["où la dérivée s'annule"],
    comparator: "mcq_exact",
    hint: "Maximum/minimum ↔ dérivée nulle.",
    explanation: exp(
      "Optimiser, c'est chercher un maximum ou un minimum.",
      "Ces extremums sont là où la dérivée s'annule en changeant de signe.",
      "On étudie donc le signe de la dérivée.",
      "Où la dérivée s'annule."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "L'aire d'un rectangle est $A(x) = x(10 - x)$ (un potager partagé). Pour quelle valeur de $x$ l'aire est-elle maximale ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "$A(x) = 10x - x^2$, $A'(x) = 10 - 2x$.",
    explanation: exp(
      "On dérive l'aire et on cherche où la dérivée s'annule.",
      "$A(x) = 10x - x^2$, donc $A'(x) = 10 - 2x$.",
      "$A'(x) = 0 \\Leftrightarrow x = 5$ (maximum).",
      "L'aire est maximale pour $x = 5$."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Avec $A(x) = x(10 - x)$, quelle est l'aire maximale du potager ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "Calcule $A(5)$.",
    explanation: exp(
      "L'aire maximale est $A$ en l'abscisse optimale.",
      "$A(5) = 5 \\times (10 - 5) = 5 \\times 5$.",
      "$= 25$.",
      "L'aire maximale vaut $25$."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 3,
    theme: "sport",
    text: "La hauteur d'un ballon est $h(t) = -5t^2 + 20t$. À quel instant atteint-il sa hauteur maximale ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$h'(t) = -10t + 20 = 0$.",
    explanation: exp(
      "La hauteur est maximale là où $h'(t) = 0$.",
      "$h'(t) = -10t + 20$, donc $-10t + 20 = 0 \\Leftrightarrow t = 2$.",
      "$h'$ passe de $+$ à $-$ : c'est bien un maximum.",
      "Hauteur maximale à $t = 2$ s."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 5,
    theme: "neutral",
    text: "Un enclos rectangulaire est adossé à un mur : on dispose de $60$ m de grillage pour les trois autres côtés. Si $x$ est la largeur, l'aire vaut $A(x) = x(60 - 2x)$. Pour quelle largeur l'aire est-elle maximale ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Développe : $A(x) = 60x - 2x^2$, puis résous $A'(x) = 0$.",
    explanation: exp(
      "L'aire est maximale là où sa dérivée s'annule en changeant de signe.",
      "$A(x) = 60x - 2x^2$, donc $A'(x) = 60 - 4x$.",
      "$60 - 4x = 0 \\Leftrightarrow x = 15$. $A'$ passe de $+$ à $-$ : c'est bien un maximum.",
      "La largeur optimale est $x = 15$ m."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 5,
    theme: "neutral",
    text: "Avec $A(x) = x(60 - 2x)$ et une largeur optimale de $15$ m, quelle est l'aire maximale de l'enclos, en m² ?",
    format: "short",
    expected: ["450"],
    comparator: "number_equal",
    hint: "Calcule $A(15) = 15 \\times (60 - 30)$.",
    explanation: exp(
      "Une fois la valeur optimale trouvée, on calcule son image pour obtenir le maximum.",
      "$A(15) = 15 \\times (60 - 2 \\times 15) = 15 \\times 30$.",
      "$= 450$. L'enclos mesure alors $15$ m sur $30$ m.",
      "L'aire maximale est de $450$ m²."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "sport",
    text: "La hauteur d'un ballon est $h(t) = -5t^2 + 20t$ (en mètres). Quelle est sa hauteur maximale ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Le maximum est atteint à $t = 2$ : calcule $h(2)$.",
    explanation: exp(
      "L'instant du maximum se trouve avec $h'(t) = 0$ ; la HAUTEUR maximale est l'image de cet instant.",
      "$h'(t) = -10t + 20$ s'annule en $t = 2$. Puis $h(2) = -5 \\times 4 + 20 \\times 2$.",
      "$= -20 + 40 = 20$.",
      "La hauteur maximale est de $20$ m, atteinte au bout de $2$ s."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    text: "Après avoir trouvé une valeur $x_0$ telle que $f'(x_0) = 0$, que faut-il faire pour conclure à un maximum ?",
    format: "qcm",
    choices: [
      "vérifier que $f'$ passe du positif au négatif en $x_0$",
      "vérifier que $f(x_0) > 0$",
      "rien : $f'(x_0) = 0$ suffit toujours",
      "calculer $f(0)$",
    ],
    expected: ["vérifier que $f'$ passe du positif au négatif en $x_0$"],
    comparator: "mcq_exact",
    hint: "Une dérivée nulle peut aussi donner un minimum, ou rien du tout.",
    explanation: exp(
      "Annuler la dérivée ne suffit pas : cela signale un candidat, pas un maximum.",
      "Il faut étudier le SIGNE de $f'$ autour de $x_0$ : de $+$ à $-$ donne un maximum, de $-$ à $+$ un minimum.",
      "Si le signe ne change pas (comme pour $x^3$ en $0$), il n'y a aucun extremum.",
      "Il faut vérifier que $f'$ passe du positif au négatif en $x_0$."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "reunion",
    text: "Un loueur de kayaks à Saint-Gilles estime sa recette journalière à $R(x) = x(50 - x)$ euros, où $x$ est le prix d'une sortie. Quel prix rend la recette maximale ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "$R(x) = 50x - x^2$ : résous $R'(x) = 0$.",
    explanation: exp(
      "La recette est maximale là où sa dérivée s'annule en changeant de signe.",
      "$R(x) = 50x - x^2$, donc $R'(x) = 50 - 2x$.",
      "$50 - 2x = 0 \\Leftrightarrow x = 25$. Au-delà, augmenter le prix fait fuir trop de clients : la recette baisse.",
      "Le prix optimal est de $25$ €."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "reunion",
    text: "Avec $R(x) = x(50 - x)$ et un prix optimal de $25$ €, quelle est la recette maximale, en euros ?",
    format: "short",
    expected: ["625"],
    comparator: "number_equal",
    hint: "$R(25) = 25 \\times (50 - 25)$.",
    explanation: exp(
      "On calcule l'image du prix optimal.",
      "$R(25) = 25 \\times (50 - 25) = 25 \\times 25$.",
      "$= 625$.",
      "La recette maximale est de $625$ €."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_opt_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 5,
    theme: "neutral",
    text: "L'aire d'un rectangle est $A(x) = x(10 - x)$, où $x$ est une longueur en cm. Sur quel intervalle l'étude a-t-elle un sens ?",
    format: "qcm",
    choices: ["$]0 ; 10[$", "$\\mathbb{R}$", "$[0 ; 5]$", "$]-\\infty ; 10]$"],
    expected: ["$]0 ; 10[$"],
    comparator: "mcq_exact",
    hint: "Les deux côtés, $x$ et $10 - x$, doivent être des longueurs strictement positives.",
    explanation: exp(
      "Dans un problème d'optimisation, il faut d'abord fixer l'intervalle d'étude imposé par la situation.",
      "Les deux dimensions doivent être positives : $x > 0$ ET $10 - x > 0$, donc $x < 10$.",
      "L'étude se mène donc sur $]0 ; 10[$ : en dehors, l'aire n'a plus de sens géométrique (elle deviendrait négative).",
      "L'intervalle est $]0 ; 10[$."
    ),
    tags: ["premiere", "maths", "variations", "optimisation", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_var_opt_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_optimisation",
    difficulty: 4,
    theme: "neutral",
    hint: "Aire $x(L - x)$ : maximale au milieu.",
    tags: ["premiere", "maths", "variations", "optimisation", "template"],
    generate: () => {
      const demi = randomInt(3, 8);
      const L = 2 * demi;
      return {
        text: `L'aire d'un rectangle de demi-périmètre $${L}$ est $A(x) = x(${L} - x)$. Pour quelle valeur de $x$ l'aire est-elle maximale ?`,
        format: "short",
        expected: [String(demi)],
        comparator: "number_equal",
        explanation: exp(
          "On dérive : $A(x) = ${L}x - x^2$, $A'(x) = ${L} - 2x$.".replace(/\$\{L\}/g, String(L)),
          `$A'(x) = 0 \\Leftrightarrow x = ${demi}$.`,
          "C'est un maximum (carré de côté optimal).",
          `L'aire est maximale pour $x = ${demi}$.`
        ),
      };
    },
  },

  /* ===================== VAR_CONSTANTE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_cst_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 4,
    theme: "neutral",
    text: "Si $f'(x) = 0$ pour TOUT $x$ d'un intervalle $I$, que peut-on dire de $f$ sur $I$ ?",
    format: "qcm",
    choices: [
      "$f$ est constante sur $I$",
      "$f$ est nulle sur $I$",
      "$f$ est croissante sur $I$",
      "on ne peut rien dire",
    ],
    expected: ["$f$ est constante sur $I$"],
    comparator: "mcq_exact",
    hint: "Constante ne veut pas dire nulle.",
    explanation: exp(
      "Une dérivée identiquement nulle sur un intervalle signifie que la fonction n'y varie pas.",
      "$f$ ne monte ni ne descend : elle garde la même valeur sur tout $I$.",
      "Attention : constante ne signifie pas nulle. La fonction $f(x) = 7$ a une dérivée nulle et vaut $7$ partout.",
      "$f$ est constante sur $I$."
    ),
    tags: ["premiere", "maths", "variations", "constante", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 5,
    theme: "neutral",
    text: "On sait seulement que $f'(2) = 0$. Peut-on en conclure que $f$ est constante ?",
    format: "qcm",
    choices: [
      "non : la dérivée s'annule en un seul point, pas sur tout un intervalle",
      "oui, $f$ est constante",
      "oui, mais seulement autour de $2$",
      "non : il faudrait $f(2) = 0$",
    ],
    expected: [
      "non : la dérivée s'annule en un seul point, pas sur tout un intervalle",
    ],
    comparator: "mcq_exact",
    hint: "Pense au sommet d'une parabole : la tangente y est horizontale, mais la courbe bouge.",
    explanation: exp(
      "La caractérisation des fonctions constantes exige que $f'$ soit nulle sur TOUT un intervalle.",
      "S'annuler en un point isolé ne suffit pas : c'est ce qui arrive au sommet d'une parabole.",
      "Pour $f(x) = (x-2)^2$, on a bien $f'(2) = 0$, et pourtant la fonction varie beaucoup autour de $2$.",
      "Non : une annulation ponctuelle ne rend pas la fonction constante."
    ),
    tags: ["premiere", "maths", "variations", "constante", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de la fonction $f(x) = 7$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "La fonction ne varie jamais.",
    explanation: exp(
      "Une fonction constante prend toujours la même valeur : sa variation est nulle.",
      "Le taux de variation $\\dfrac{f(b) - f(a)}{b - a}$ vaut $\\dfrac{7 - 7}{b - a} = 0$.",
      "Sa dérivée est donc nulle partout : la courbe est une droite horizontale.",
      "$f'(x) = 0$."
    ),
    tags: ["premiere", "maths", "variations", "constante", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 5,
    theme: "neutral",
    text: "Deux fonctions $f$ et $g$ ont la MÊME dérivée sur un intervalle. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "elles diffèrent d'une constante : $f = g + k$",
      "elles sont égales",
      "elles sont toutes deux constantes",
      "on ne peut rien dire",
    ],
    expected: ["elles diffèrent d'une constante : $f = g + k$"],
    comparator: "mcq_exact",
    hint: "Étudie la fonction $f - g$ : que vaut sa dérivée ?",
    explanation: exp(
      "On applique la caractérisation des fonctions constantes à la différence $f - g$.",
      "$(f - g)' = f' - g' = 0$ sur l'intervalle, donc $f - g$ y est constante.",
      "Il existe donc un nombre $k$ tel que $f = g + k$. Exemple : $x^2$ et $x^2 + 3$ ont la même dérivée $2x$ ; leurs courbes se déduisent l'une de l'autre par translation verticale.",
      "Elles diffèrent d'une constante."
    ),
    tags: ["premiere", "maths", "variations", "constante", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 4,
    theme: "neutral",
    text: "Sur $[0 ; 3]$, une fonction vérifie $f'(x) = 0$ et $f(1) = 7$. Combien vaut $f(2)$ ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La fonction est constante sur tout l'intervalle.",
    explanation: exp(
      "Une dérivée nulle sur un intervalle rend la fonction constante sur cet intervalle.",
      "Comme $1$ et $2$ appartiennent tous deux à $[0 ; 3]$, la fonction y prend la même valeur.",
      "$f(2) = f(1) = 7$.",
      "$f(2) = 7$."
    ),
    tags: ["premiere", "maths", "variations", "constante", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 4,
    theme: "neutral",
    text: "À quoi ressemble la courbe d'une fonction dont la dérivée est nulle sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "une droite horizontale",
      "la droite d'équation $y = x$",
      "l'axe des abscisses obligatoirement",
      "une parabole",
    ],
    expected: ["une droite horizontale"],
    comparator: "mcq_exact",
    hint: "Une pente nulle partout, cela donne quelle allure ?",
    explanation: exp(
      "La dérivée donne la pente de la courbe en chaque point.",
      "Une pente nulle partout signifie que la courbe ne monte ni ne descend jamais.",
      "C'est donc une droite horizontale, d'équation $y = k$. Ce n'est l'axe des abscisses que dans le cas particulier $k = 0$.",
      "Une droite horizontale."
    ),
    tags: ["premiere", "maths", "variations", "constante", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre « $f'$ s'annule en un point » et « $f'$ est nulle sur un intervalle ».",
    format: "open",
    expected: ["intervalle", "point", "constante", "sommet"],
    comparator: "contains_keyword",
    hint: "L'un décrit un instant, l'autre une durée.",
    explanation: exp(
      "La caractérisation des fonctions constantes porte sur un INTERVALLE entier, pas sur un point.",
      "$f'(a) = 0$ en un point isolé signifie seulement que la tangente y est horizontale : la fonction marque une pause, comme au sommet d'une parabole, puis repart.",
      "$f' = 0$ sur tout un intervalle signifie que la fonction ne bouge pas du tout sur cet intervalle : elle y est constante.",
      "Un point donne une tangente horizontale ; un intervalle entier donne une fonction constante."
    ),
    tags: ["premiere", "maths", "variations", "constante", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_var_cst_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 5,
    theme: "neutral",
    text: "Les fonctions $f(x) = x^2$ et $g(x) = x^2 + 5$ ont la même dérivée. Explique ce que cela signifie pour leurs courbes.",
    format: "open",
    expected: ["translation", "constante", "parallèle", "5"],
    comparator: "contains_keyword",
    hint: "Que vaut $f - g$ ? Que fait cette différence à la courbe ?",
    explanation: exp(
      "Deux fonctions de même dérivée diffèrent d'une constante.",
      "Ici $g - f = 5$ : en tout point, la courbe de $g$ est exactement $5$ unités au-dessus de celle de $f$.",
      "Les deux courbes se déduisent donc l'une de l'autre par une translation verticale. Elles ont la même forme et, en chaque abscisse, exactement la même pente.",
      "Les courbes sont translatées verticalement de $5$ : mêmes variations, hauteurs différentes."
    ),
    tags: ["premiere", "maths", "variations", "constante", "open"],
  },
  {
    kind: "template",
    id: "premiere_var_cst_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 4,
    theme: "neutral",
    hint: "Une dérivée nulle sur un intervalle : la fonction y garde la même valeur.",
    tags: ["premiere", "maths", "variations", "constante", "template"],
    generate: () => {
      const val = randomInt(-8, 12);
      const a = randomInt(0, 2);
      const b = a + randomInt(3, 6);
      const x1 = a + 1;
      const x2 = b - 1;
      return {
        text: `Sur $[${a} ; ${b}]$, une fonction vérifie $f'(x) = 0$ et $f(${x1}) = ${val}$. Combien vaut $f(${x2})$ ?`,
        format: "short",
        expected: [String(val)],
        comparator: "number_equal",
        explanation: exp(
          "Une dérivée nulle sur tout un intervalle rend la fonction constante sur cet intervalle.",
          `$${x1}$ et $${x2}$ appartiennent tous deux à $[${a} ; ${b}]$.`,
          `La fonction y prend donc partout la même valeur : $f(${x2}) = f(${x1}) = ${val}$.`,
          `$f(${x2}) = ${val}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_cst_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_constante",
    difficulty: 5,
    theme: "neutral",
    hint: "Étudie la différence des deux fonctions et sa dérivée.",
    tags: ["premiere", "maths", "variations", "constante", "open", "template"],
    generate: () => {
      const k = randomInt(2, 9);
      const cas = pickOne([
        { f: "x^2", d: "2x" },
        { f: "x^3", d: "3x^2" },
        { f: "4x", d: "4" },
        { f: "x^2 - x", d: "2x - 1" },
      ]);
      return {
        text: `Les fonctions $f(x) = ${cas.f}$ et $g(x) = ${cas.f} + ${k}$ ont la même dérivée $${cas.d}$. Explique ce que cela signifie pour leurs courbes.`,
        format: "open",
        expected: ["translation", String(k), "constante", "même"],
        comparator: "contains_keyword",
        explanation: exp(
          "Deux fonctions ayant la même dérivée sur un intervalle diffèrent d'une constante.",
          `Ici la différence vaut $g - f = ${k}$, et sa dérivée est bien nulle.`,
          `La courbe de $g$ est donc celle de $f$ décalée de $${k}$ vers le haut : même forme, même pente en chaque abscisse.`,
          "Les deux courbes se déduisent l'une de l'autre par translation verticale."
        ),
      };
    },
  },

  /* ===================== VAR_LECTURE_COURBE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_lc_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 2,
    theme: "neutral",
    text: "Sur un graphique, une portion de courbe qui MONTE de gauche à droite indique que :",
    format: "qcm",
    choices: [
      "la fonction est croissante sur cet intervalle",
      "la fonction est positive",
      "la dérivée est négative",
      "la fonction atteint un maximum",
    ],
    expected: ["la fonction est croissante sur cet intervalle"],
    comparator: "mcq_exact",
    hint: "Ne pas confondre « monte » et « est au-dessus de l'axe ».",
    explanation: exp(
      "Le sens de variation se lit sur l'allure de la courbe, de gauche à droite.",
      "Une courbe qui monte signifie que les images augmentent quand $x$ augmente : la fonction est croissante, et sa dérivée y est positive.",
      "C'est indépendant du SIGNE de la fonction : une courbe peut monter tout en restant sous l'axe des abscisses, donc négative.",
      "La fonction est croissante sur cet intervalle."
    ),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le graphique, la parabole a son sommet au point $S$. Que représente l'ORDONNÉE de $S$ ?",
    format: "qcm",
    choices: [
      "l'extremum de la fonction",
      "l'abscisse où l'extremum est atteint",
      "une racine de la fonction",
      "la pente de la tangente",
    ],
    expected: ["l'extremum de la fonction"],
    comparator: "mcq_exact",
    hint: "L'extremum est une VALEUR de la fonction, donc une ordonnée.",
    explanation: exp(
      "Le sommet est le point le plus haut ou le plus bas de la courbe.",
      "Son ORDONNÉE est la valeur extrême atteinte par la fonction : c'est l'extremum lui-même.",
      "Son ABSCISSE indique où cet extremum est atteint. Confondre les deux est l'erreur la plus fréquente en lecture graphique.",
      "L'ordonnée du sommet est l'extremum."
    ),
    canvas: parabole(1, -2, -3),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 4,
    theme: "neutral",
    text: "La courbe de $f$ descend sur $]-\\infty ; 1]$ puis monte sur $[1 ; +\\infty[$. Que vaut $f'$ sur $]-\\infty ; 1[$ ?",
    format: "qcm",
    choices: [
      "$f'(x) < 0$",
      "$f'(x) > 0$",
      "$f'(x) = 0$",
      "on ne peut pas savoir",
    ],
    expected: ["$f'(x) < 0$"],
    comparator: "mcq_exact",
    hint: "La courbe descend : que dit la dérivée ?",
    explanation: exp(
      "Le sens de variation lu sur la courbe donne le signe de la dérivée.",
      "Sur $]-\\infty ; 1[$ la courbe descend : la fonction y est décroissante.",
      "Sa dérivée y est donc strictement négative. Elle s'annule en $1$, puis devient positive.",
      "$f'(x) < 0$ sur cet intervalle."
    ),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 5,
    theme: "neutral",
    text: "Une courbe monte tout en restant SOUS l'axe des abscisses. Que peut-on dire ?",
    format: "qcm",
    choices: [
      "$f$ est croissante et négative",
      "$f$ est croissante et positive",
      "$f$ est décroissante et négative",
      "c'est impossible",
    ],
    expected: ["$f$ est croissante et négative"],
    comparator: "mcq_exact",
    hint: "Le sens de variation et le signe sont deux lectures différentes.",
    explanation: exp(
      "Deux informations distinctes se lisent sur une courbe : son SENS (monte ou descend) et sa POSITION (au-dessus ou en dessous de l'axe).",
      "Ici la courbe monte : la fonction est croissante, sa dérivée est positive.",
      "Et elle reste sous l'axe : les images sont négatives. Exemple : $f(x) = x - 5$ sur $[0 ; 4]$ croît de $-5$ à $-1$.",
      "$f$ est croissante et négative : rien n'est contradictoire."
    ),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le graphique, le sommet de la parabole est le point $S(1 ; -4)$. Quel est le minimum de $f$ ?",
    format: "short",
    expected: ["-4"],
    comparator: "number_equal",
    hint: "Le minimum est une valeur : c'est l'ordonnée.",
    explanation: exp(
      "L'extremum d'une fonction est une VALEUR, c'est-à-dire une ordonnée.",
      "Le sommet est $S(1 ; -4)$ : l'abscisse $1$ dit OÙ, l'ordonnée $-4$ dit COMBIEN.",
      "Le minimum vaut donc $-4$, atteint en $x = 1$.",
      "Le minimum est $-4$."
    ),
    canvas: parabole(1, -2, -3),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 5,
    theme: "neutral",
    text: "Sur une courbe, en combien de points la tangente est-elle horizontale si la fonction décroît puis croît puis décroît ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Compte les changements de sens.",
    explanation: exp(
      "La tangente est horizontale là où la fonction change de sens de variation, c'est-à-dire aux extremums.",
      "La fonction décroît, puis croît : premier changement, un minimum. Puis elle croît et décroît : second changement, un maximum.",
      "Il y a donc $2$ changements de sens, donc $2$ points à tangente horizontale.",
      "La tangente est horizontale en $2$ points."
    ),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 5,
    theme: "neutral",
    text: "Explique la différence entre lire le SIGNE de $f$ et lire ses VARIATIONS sur un graphique.",
    format: "open",
    expected: ["axe", "monte", "au-dessus", "sens"],
    comparator: "contains_keyword",
    hint: "L'un se lit par rapport à l'axe des abscisses, l'autre par rapport au sens de parcours.",
    explanation: exp(
      "Ce sont deux lectures indépendantes de la même courbe.",
      "Le SIGNE se lit par rapport à l'axe des abscisses : au-dessus, $f(x) > 0$ ; en dessous, $f(x) < 0$.",
      "Les VARIATIONS se lisent dans le sens de parcours, de gauche à droite : la courbe monte ou descend. Une courbe peut monter tout en restant négative.",
      "Le signe se lit par rapport à l'axe, les variations par le sens de la courbe."
    ),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_var_lc_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 5,
    theme: "neutral",
    text: "Une courbe passe par un sommet au point $(3 ; 8)$. Explique ce qu'on peut en déduire sur $f$, $f'$ et l'extremum.",
    format: "open",
    expected: ["8", "3", "tangente", "maximum"],
    comparator: "contains_keyword",
    hint: "Trois informations différentes se lisent en ce point.",
    explanation: exp(
      "Un sommet concentre plusieurs informations, qu'il faut distinguer.",
      "La VALEUR : $f(3) = 8$, l'ordonnée du point. L'EXTREMUM vaut donc $8$, atteint en $x = 3$.",
      "La DÉRIVÉE : au sommet, la tangente est horizontale, donc $f'(3) = 0$. Et $f'$ change de signe en $3$ : positive avant, négative après s'il s'agit d'un maximum.",
      "$f(3) = 8$ est l'extremum, $f'(3) = 0$, et la tangente y est horizontale."
    ),
    tags: ["premiere", "maths", "variations", "lecture_courbe", "open"],
  },
  {
    kind: "template",
    id: "premiere_var_lc_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 4,
    theme: "neutral",
    hint: "L'abscisse dit OÙ, l'ordonnée dit COMBIEN.",
    tags: ["premiere", "maths", "variations", "lecture_courbe", "template"],
    generate: () => {
      const alpha = randomInt(-3, 3);
      const beta = randomInt(-5, 5);
      const versLeHaut = randomInt(0, 1) === 1;
      const mot = versLeHaut ? "minimum" : "maximum";
      const question = randomInt(0, 1) === 1;
      return {
        text: question
          ? `Le sommet de la parabole est $S(${alpha} ; ${beta})$ et elle est tournée vers ${versLeHaut ? "le haut" : "le bas"}. Quel est le ${mot} de $f$ ?`
          : `Le sommet de la parabole est $S(${alpha} ; ${beta})$ et elle est tournée vers ${versLeHaut ? "le haut" : "le bas"}. En quelle abscisse le ${mot} est-il atteint ?`,
        format: "short",
        expected: [String(question ? beta : alpha)],
        comparator: "number_equal",
        explanation: exp(
          "Le sommet donne deux informations distinctes : son abscisse dit OÙ l'extremum est atteint, son ordonnée dit COMBIEN il vaut.",
          `Ici $S(${alpha} ; ${beta})$, et la parabole tournée vers ${versLeHaut ? "le haut" : "le bas"} donne un ${mot}.`,
          question
            ? `La question porte sur la VALEUR : c'est l'ordonnée, $${beta}$.`
            : `La question porte sur l'ENDROIT : c'est l'abscisse, $${alpha}$.`,
          question
            ? `Le ${mot} vaut $${beta}$, atteint en $x = ${alpha}$.`
            : `Le ${mot} est atteint en $x = ${alpha}$, et il vaut $${beta}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_lc_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_lecture_courbe",
    difficulty: 5,
    theme: "neutral",
    hint: "Traduis chaque morceau de courbe en signe de $f'$, puis conclus sur les extremums.",
    tags: ["premiere", "maths", "variations", "lecture_courbe", "open", "template"],
    generate: () => {
      const cas = [
        {
          desc: "la courbe monte sur $]-\\infty ; 2]$ puis descend sur $[2 ; +\\infty[$",
          mots: ["maximum", "2", "positive", "négative"],
          lecture:
            "$f'$ est positive avant $2$, nulle en $2$, négative après : la fonction atteint un MAXIMUM en $x = 2$.",
        },
        {
          desc: "la courbe descend sur $]-\\infty ; -1]$ puis monte sur $[-1 ; +\\infty[$",
          mots: ["minimum", "-1", "négative", "positive"],
          lecture:
            "$f'$ est négative avant $-1$, nulle en $-1$, positive après : la fonction atteint un MINIMUM en $x = -1$.",
        },
        {
          desc: "la courbe monte sur tout $\\mathbb{R}$, sans jamais redescendre",
          mots: ["croissante", "positive", "aucun", "extremum"],
          lecture:
            "$f'$ est positive partout : la fonction est croissante sur $\\mathbb{R}$ et n'admet aucun extremum.",
        },
        {
          desc: "la courbe monte, marque un palier horizontal en $0$, puis remonte",
          mots: ["croissante", "0", "tangente", "pas d'extremum"],
          lecture:
            "$f'$ s'annule en $0$ sans changer de signe : la tangente y est horizontale, mais il n'y a PAS d'extremum — c'est le cas de $x^3$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Sur un graphique, ${c.desc}. Que peux-tu dire du signe de $f'$ et des extremums ?`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une courbe qui monte correspond à $f' > 0$, une courbe qui descend à $f' < 0$, un palier horizontal à $f' = 0$.",
          "Un extremum apparaît là où $f'$ CHANGE de signe — s'annuler ne suffit pas.",
          c.lecture,
          "Lire une courbe, c'est traduire chaque morceau en signe de dérivée."
        ),
      };
    },
  },

  /* ===================== VAR_EXTREMUM_TANGENTE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_et_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Si une fonction dérivable admet un extremum en $a$ (à l'intérieur de son intervalle d'étude), que vaut $f'(a)$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "Quelle est l'allure de la tangente au sommet d'une courbe ?",
    explanation: exp(
      "En un extremum, la fonction cesse de monter avant de descendre — ou l'inverse.",
      "La tangente en ce point est donc horizontale.",
      "Son coefficient directeur est nul, c'est-à-dire $f'(a) = 0$.",
      "$f'(a) = 0$."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "La réciproque est-elle vraie : si $f'(a) = 0$, y a-t-il forcément un extremum en $a$ ?",
    format: "qcm",
    choices: [
      "non : pour $f(x) = x^3$, $f'(0) = 0$ sans extremum",
      "oui, toujours",
      "oui, si $f$ est dérivable",
      "non : $f'(a) = 0$ est impossible",
    ],
    expected: ["non : pour $f(x) = x^3$, $f'(0) = 0$ sans extremum"],
    comparator: "mcq_exact",
    hint: "Cherche une fonction dont la dérivée s'annule sans changer de signe.",
    explanation: exp(
      "Une dérivée nulle signale un candidat, pas un extremum garanti.",
      "Pour $f(x) = x^3$ : $f'(x) = 3x^2$ s'annule en $0$, mais reste positive de part et d'autre.",
      "La fonction continue donc de croître : la courbe a une tangente horizontale en $0$, sans y marquer d'extremum. Il faut que $f'$ CHANGE de signe.",
      "Non : $x^3$ en $0$ est le contre-exemple."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = x^2 - 6x + 5$, en quelle abscisse la tangente est-elle horizontale ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Résous $f'(x) = 0$ avec $f'(x) = 2x - 6$.",
    explanation: exp(
      "Une tangente horizontale correspond à une dérivée nulle.",
      "$f'(x) = 2x - 6$, et on résout $2x - 6 = 0$.",
      "$x = 3$. En ce point, $f'$ passe du négatif au positif : c'est bien un minimum, le sommet de la parabole.",
      "La tangente est horizontale en $x = 3$."
    ),
    canvas: parabole(1, -6, 5),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "« $f'(a) = 0$ » est, pour l'existence d'un extremum en $a$, une condition :",
    format: "qcm",
    choices: [
      "nécessaire mais pas suffisante",
      "suffisante mais pas nécessaire",
      "nécessaire et suffisante",
      "ni nécessaire ni suffisante",
    ],
    expected: ["nécessaire mais pas suffisante"],
    comparator: "mcq_exact",
    hint: "Un extremum impose-t-il $f'(a) = 0$ ? Et l'inverse ?",
    explanation: exp(
      "On teste les deux sens de l'implication.",
      "Nécessaire : oui — un extremum intérieur d'une fonction dérivable impose une tangente horizontale, donc $f'(a) = 0$.",
      "Suffisante : non — $x^3$ vérifie $f'(0) = 0$ sans extremum. Il faut en plus que $f'$ change de signe.",
      "C'est une condition nécessaire mais pas suffisante."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Que faut-il vérifier, EN PLUS de $f'(a) = 0$, pour conclure à un extremum en $a$ ?",
    format: "qcm",
    choices: [
      "que $f'$ change de signe en $a$",
      "que $f(a) > 0$",
      "que $f$ est croissante",
      "que $a$ est positif",
    ],
    expected: ["que $f'$ change de signe en $a$"],
    comparator: "mcq_exact",
    hint: "C'est le changement de sens qui crée le sommet.",
    explanation: exp(
      "Un extremum apparaît quand la fonction change de sens de variation.",
      "Ce changement se lit sur le signe de $f'$ : de $+$ à $-$ pour un maximum, de $-$ à $+$ pour un minimum.",
      "Si $f'$ s'annule sans changer de signe, la fonction poursuit sa route : c'est le cas de $x^3$ en $0$.",
      "Il faut que $f'$ change de signe en $a$."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Une fonction atteint son maximum en $a$, à l'intérieur de l'intervalle d'étude. Quelle est l'équation de la tangente en $a$ ?",
    format: "qcm",
    choices: [
      "$y = f(a)$, une droite horizontale",
      "$y = f'(a)x$",
      "$y = x - a$",
      "$x = a$, une droite verticale",
    ],
    expected: ["$y = f(a)$, une droite horizontale"],
    comparator: "mcq_exact",
    hint: "Applique $y = f'(a)(x - a) + f(a)$ avec $f'(a) = 0$.",
    explanation: exp(
      "L'équation de la tangente est $y = f'(a)(x - a) + f(a)$.",
      "En un extremum intérieur, $f'(a) = 0$ : le premier terme disparaît.",
      "Il reste $y = f(a)$, l'équation d'une droite HORIZONTALE passant par le sommet. Une droite verticale s'écrirait $x = a$ et n'est jamais une tangente ici.",
      "$y = f(a)$, horizontale."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $f'(a) = 0$ ne suffit pas à conclure à un extremum, en donnant un contre-exemple.",
    format: "open",
    expected: ["x^3", "change", "signe", "0"],
    comparator: "contains_keyword",
    hint: "Cherche une fonction dont la dérivée s'annule sans changer de signe.",
    explanation: exp(
      "Un extremum suppose un CHANGEMENT de sens de variation, pas seulement une pause.",
      "Contre-exemple : $f(x) = x^3$. Sa dérivée $f'(x) = 3x^2$ s'annule en $0$, mais elle est positive avant comme après.",
      "La fonction croît donc sur tout $\\mathbb{R}$ : en $0$, la courbe a une tangente horizontale, elle marque un palier, puis repart vers le haut. Aucun extremum.",
      "Il faut que $f'$ change de signe, pas seulement qu'elle s'annule."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_var_et_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    text: "Décris la méthode complète pour trouver les extremums d'une fonction dérivable sur un intervalle.",
    format: "open",
    expected: ["dérivée", "annule", "signe", "tableau"],
    comparator: "contains_keyword",
    hint: "Trois étapes, dont une que beaucoup oublient.",
    explanation: exp(
      "Les extremums se trouvent là où la dérivée s'annule EN CHANGEANT de signe.",
      "Étape 1 : calculer $f'$. Étape 2 : résoudre $f'(x) = 0$ pour obtenir les candidats.",
      "Étape 3 — celle qu'on oublie : étudier le SIGNE de $f'$ autour de chaque candidat, dans un tableau de variations. De $+$ à $-$ : maximum. De $-$ à $+$ : minimum. Pas de changement : pas d'extremum. On calcule enfin l'image pour obtenir la valeur.",
      "Dériver, annuler, étudier le signe — et ne pas oublier les bornes de l'intervalle."
    ),
    tags: ["premiere", "maths", "variations", "extremum_tangente", "open"],
  },
  {
    kind: "template",
    id: "premiere_var_et_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 4,
    theme: "neutral",
    hint: "Résous $f'(x) = 0$.",
    tags: ["premiere", "maths", "variations", "extremum_tangente", "template"],
    generate: () => {
      const a = pickOne([1, 1, 2, -1]);
      const alpha = randomInt(-3, 4);
      const b = -2 * a * alpha;
      const c = randomInt(-4, 4);
      const signeB = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const signeC = c >= 0 ? `+ ${c}` : `- ${-c}`;
      const coefA = a === 1 ? "" : a === -1 ? "-" : `${a}`;
      return {
        text: `Pour $f(x) = ${coefA}x^2 ${signeB}x ${signeC}$, en quelle abscisse la tangente est-elle horizontale ?`,
        format: "short",
        expected: [String(alpha)],
        comparator: "number_equal",
        explanation: exp(
          "Une tangente horizontale correspond à une dérivée nulle.",
          `$f'(x) = ${2 * a}x ${signeB}$, et on résout $f'(x) = 0$.`,
          `$x = ${alpha}$ : c'est l'abscisse du sommet de la parabole.`,
          `La tangente est horizontale en $x = ${alpha}$, où $f$ atteint ${a > 0 ? "son minimum" : "son maximum"}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_et_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_extremum_tangente",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde si la dérivée change de signe, et pas seulement si elle s'annule.",
    tags: ["premiere", "maths", "variations", "extremum_tangente", "open", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = x^3$",
          d: "$f'(x) = 3x^2$",
          mots: ["pas", "extremum", "signe", "0"],
          verdict:
            "$f'$ s'annule en $0$ mais reste positive de part et d'autre : PAS d'extremum, seulement une tangente horizontale.",
        },
        {
          f: "$f(x) = x^2 - 4x$",
          d: "$f'(x) = 2x - 4$",
          mots: ["minimum", "2", "change", "signe"],
          verdict:
            "$f'$ s'annule en $2$ en passant du négatif au positif : la fonction atteint un MINIMUM en $x = 2$.",
        },
        {
          f: "$f(x) = -x^2 + 6x$",
          d: "$f'(x) = -2x + 6$",
          mots: ["maximum", "3", "change", "signe"],
          verdict:
            "$f'$ s'annule en $3$ en passant du positif au négatif : la fonction atteint un MAXIMUM en $x = 3$.",
        },
        {
          f: "$f(x) = (x - 1)^3$",
          d: "$f'(x) = 3(x-1)^2$",
          mots: ["pas", "extremum", "carré", "positive"],
          verdict:
            "$f'$ est un carré multiplié par $3$ : elle s'annule en $1$ sans jamais devenir négative. Aucun extremum.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Pour ${c.f}, on a ${c.d}. La dérivée s'annule-t-elle ? Y a-t-il un extremum ? Justifie.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Une dérivée nulle donne un candidat ; seul un CHANGEMENT de signe donne un extremum.",
          "On résout $f'(x) = 0$, puis on étudie le signe de $f'$ de part et d'autre.",
          c.verdict,
          "S'annuler ne suffit pas : c'est le changement de signe qui crée le sommet."
        ),
      };
    },
  },

  /* ===================== VAR_INEGALITE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_ineg_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 4,
    theme: "neutral",
    text: "Pour démontrer que $f(x) \\ge g(x)$ pour tout $x$, quelle est la méthode ?",
    format: "qcm",
    choices: [
      "étudier la fonction $f - g$ et montrer qu'elle est positive",
      "vérifier l'inégalité sur plusieurs valeurs",
      "comparer $f'$ et $g'$",
      "calculer $f(0)$ et $g(0)$",
    ],
    expected: ["étudier la fonction $f - g$ et montrer qu'elle est positive"],
    comparator: "mcq_exact",
    hint: "Ramène tout d'un côté, comme pour une inéquation.",
    explanation: exp(
      "Comparer deux fonctions revient à étudier le SIGNE de leur différence.",
      "$f(x) \\ge g(x)$ équivaut à $f(x) - g(x) \\ge 0$ : on pose $h = f - g$.",
      "On étudie alors les variations de $h$ pour trouver son minimum : s'il est positif ou nul, l'inégalité est démontrée pour TOUT $x$.",
      "On étudie le signe de $f - g$."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 4,
    theme: "neutral",
    text: "Une fonction $h$ admet un minimum égal à $2$ sur $\\mathbb{R}$. Que peut-on en déduire ?",
    format: "qcm",
    choices: [
      "$h(x) \\ge 2 > 0$ pour tout $x$ : $h$ est strictement positive",
      "$h(x) = 2$ pour tout $x$",
      "$h$ s'annule quelque part",
      "$h$ est croissante",
    ],
    expected: ["$h(x) \\ge 2 > 0$ pour tout $x$ : $h$ est strictement positive"],
    comparator: "mcq_exact",
    hint: "Le minimum est la plus petite valeur atteinte.",
    explanation: exp(
      "Le minimum d'une fonction est la plus petite valeur qu'elle prend : toutes les autres lui sont supérieures.",
      "Si ce minimum vaut $2$, alors $h(x) \\ge 2$ pour tout $x$.",
      "Comme $2 > 0$, la fonction est strictement positive partout : elle ne s'annule jamais. C'est exactement ce qui permet de démontrer une inégalité.",
      "$h(x) \\ge 2 > 0$ : $h$ est strictement positive."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le minimum de $h(x) = x^2 - 2x + 3$ ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "$h'(x) = 2x - 2$ s'annule en $1$ : calcule $h(1)$.",
    explanation: exp(
      "Le minimum s'obtient là où la dérivée s'annule en changeant de signe.",
      "$h'(x) = 2x - 2 = 0$ donne $x = 1$, et $h'$ passe du négatif au positif.",
      "$h(1) = 1 - 2 + 3 = 2$.",
      "Le minimum vaut $2$ : la fonction est donc toujours supérieure ou égale à $2$, donc strictement positive."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    text: "Pour démontrer que $x^2 + 1 \\ge 2x$ pour tout réel $x$, que suffit-il de remarquer ?",
    format: "qcm",
    choices: [
      "$x^2 + 1 - 2x = (x-1)^2 \\ge 0$",
      "que c'est vrai pour $x = 0$ et $x = 5$",
      "que $x^2 \\ge 0$",
      "que $2x$ est croissante",
    ],
    expected: ["$x^2 + 1 - 2x = (x-1)^2 \\ge 0$"],
    comparator: "mcq_exact",
    hint: "Ramène tout d'un côté : reconnais-tu une identité remarquable ?",
    explanation: exp(
      "On ramène tout d'un côté pour étudier le signe de la différence.",
      "$x^2 + 1 - 2x = x^2 - 2x + 1$, qu'on reconnaît comme $(x - 1)^2$.",
      "Un carré est toujours positif ou nul : la différence l'est donc aussi, et l'inégalité est démontrée pour TOUT $x$ — avec égalité seulement en $x = 1$.",
      "Il suffit de reconnaître $(x-1)^2 \\ge 0$."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève vérifie que $x^2 + 3 > 2x$ pour $x = 0$, $x = 1$ et $x = 5$, puis conclut que c'est vrai partout. Qu'en penser ?",
    format: "qcm",
    choices: [
      "des exemples ne démontrent rien : il faut étudier le minimum de la différence",
      "trois valeurs suffisent",
      "c'est correct car les valeurs sont bien choisies",
      "il aurait fallu tester des valeurs négatives, et cela aurait suffi",
    ],
    expected: [
      "des exemples ne démontrent rien : il faut étudier le minimum de la différence",
    ],
    comparator: "mcq_exact",
    hint: "Combien de réels faudrait-il tester pour couvrir tous les cas ?",
    explanation: exp(
      "Une inégalité « pour tout $x$ » porte sur une infinité de valeurs : aucune vérification finie ne la démontre.",
      "Il faut étudier $h(x) = x^2 - 2x + 3$ et montrer que son MINIMUM est positif.",
      "Ici $h$ atteint son minimum en $1$, où elle vaut $2 > 0$ : l'inégalité est donc vraie partout. La conclusion de l'élève était juste, mais son raisonnement ne prouvait rien.",
      "Il faut étudier le minimum de la différence, pas tester des valeurs."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    text: "On étudie $h = f - g$ et on trouve un minimum égal à $-1$. Que peut-on conclure ?",
    format: "qcm",
    choices: [
      "l'inégalité $f \\ge g$ est FAUSSE : il existe des $x$ où $f < g$",
      "$f \\ge g$ partout",
      "$f = g$ partout",
      "on ne peut rien conclure",
    ],
    expected: ["l'inégalité $f \\ge g$ est FAUSSE : il existe des $x$ où $f < g$"],
    comparator: "mcq_exact",
    hint: "Un minimum négatif signifie que la différence devient négative quelque part.",
    explanation: exp(
      "Le signe du minimum de $h = f - g$ décide de l'inégalité.",
      "Un minimum de $-1$ signifie que $h$ atteint la valeur $-1$ : la différence devient négative.",
      "Il existe donc des $x$ pour lesquels $f(x) < g(x)$ : l'inégalité $f \\ge g$ ne tient pas partout. La courbe de $f$ passe sous celle de $g$.",
      "L'inégalité est fausse : $f$ passe sous $g$."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    text: "Démontre que $x^2 - 4x + 7 > 0$ pour tout réel $x$, en utilisant les variations.",
    format: "open",
    expected: ["minimum", "3", "2", "positif"],
    comparator: "contains_keyword",
    hint: "Cherche le minimum de la fonction, puis regarde son signe.",
    explanation: exp(
      "Pour montrer qu'une fonction est positive partout, il suffit de montrer que son MINIMUM l'est.",
      "$h'(x) = 2x - 4$ s'annule en $x = 2$, en passant du négatif au positif : c'est un minimum.",
      "$h(2) = 4 - 8 + 7 = 3$. Le minimum vaut $3$, donc $h(x) \\ge 3$ pour tout $x$.",
      "Comme $3 > 0$, la fonction est strictement positive sur $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_var_ineg_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi étudier le minimum d'une fonction permet de démontrer une inégalité valable pour TOUS les réels.",
    format: "open",
    expected: ["plus petite", "toutes", "supérieur", "infinité"],
    comparator: "contains_keyword",
    hint: "Si la plus petite valeur est positive, que valent les autres ?",
    explanation: exp(
      "Le minimum est, par définition, la plus petite valeur prise par la fonction.",
      "Si ce minimum est positif, alors TOUTES les autres valeurs, qui lui sont supérieures, le sont aussi.",
      "Un seul calcul règle donc le cas d'une infinité de valeurs — là où tester des exemples, même nombreux, ne prouverait jamais rien.",
      "Si la plus petite valeur est positive, toutes les autres le sont."
    ),
    tags: ["premiere", "maths", "variations", "inegalite", "open"],
  },
  {
    kind: "template",
    id: "premiere_var_ineg_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    hint: "Le minimum d'un trinôme est atteint en $-\\dfrac{b}{2a}$.",
    tags: ["premiere", "maths", "variations", "inegalite", "template"],
    generate: () => {
      const alpha = randomInt(-3, 4);
      const beta = randomInt(1, 6);
      const b = -2 * alpha;
      const c = beta + alpha * alpha;
      const signeB = b >= 0 ? `+ ${b}` : `- ${-b}`;
      return {
        text: `Quel est le minimum de $h(x) = x^2 ${signeB}x + ${c}$ ?`,
        format: "short",
        expected: [String(beta)],
        comparator: "number_equal",
        explanation: exp(
          "Le minimum d'un trinôme à coefficient dominant positif est atteint là où la dérivée s'annule.",
          `$h'(x) = 2x ${signeB}$ s'annule en $x = ${alpha}$.`,
          `$h(${alpha}) = ${alpha * alpha} ${b * alpha >= 0 ? "+ " + b * alpha : "- " + -(b * alpha)} + ${c} = ${beta}$.`,
          `Le minimum vaut $${beta}$ : comme il est positif, $h(x) > 0$ pour tout réel $x$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_ineg_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_inegalite",
    difficulty: 5,
    theme: "neutral",
    hint: "Ramène tout d'un côté, étudie la fonction obtenue, conclus sur son minimum.",
    tags: ["premiere", "maths", "variations", "inegalite", "open", "template"],
    generate: () => {
      const cas = [
        {
          ineg: "$x^2 + 4 \\ge 4x$",
          mots: ["(x-2)^2", "carré", "positif", "2"],
          preuve:
            "$x^2 + 4 - 4x = (x - 2)^2 \\ge 0$ : un carré est toujours positif ou nul. L'égalité a lieu pour $x = 2$.",
        },
        {
          ineg: "$x^2 - 6x + 10 > 0$",
          mots: ["minimum", "3", "1", "positif"],
          preuve:
            "La dérivée $2x - 6$ s'annule en $3$, minimum. $h(3) = 9 - 18 + 10 = 1 > 0$ : la fonction est strictement positive.",
        },
        {
          ineg: "$x^2 + 9 \\ge 6x$",
          mots: ["(x-3)^2", "carré", "positif", "3"],
          preuve:
            "$x^2 + 9 - 6x = (x - 3)^2 \\ge 0$ : c'est une identité remarquable, toujours positive ou nulle.",
        },
        {
          ineg: "$x^2 - 2x + 5 > 0$",
          mots: ["minimum", "1", "4", "positif"],
          preuve:
            "La dérivée $2x - 2$ s'annule en $1$, minimum. $h(1) = 1 - 2 + 5 = 4 > 0$ : la fonction ne s'annule jamais.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Démontre que ${c.ineg} pour tout réel $x$.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Pour démontrer une inégalité valable partout, on ramène tout d'un côté et on étudie le signe de la différence.",
          "Deux voies : reconnaître une identité remarquable, ou chercher le minimum par la dérivée.",
          c.preuve,
          "Tester quelques valeurs ne démontrerait rien : il y en a une infinité."
        ),
      };
    },
  },

  /* ===================== VAR_POSITION_RELATIVE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_pos_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Pour étudier la position relative des courbes de $f$ et $g$, que fait-on ?",
    format: "qcm",
    choices: [
      "on étudie le signe de $f(x) - g(x)$",
      "on compare $f'$ et $g'$",
      "on calcule $f(0)$ et $g(0)$",
      "on trace les deux courbes et on observe",
    ],
    expected: ["on étudie le signe de $f(x) - g(x)$"],
    comparator: "mcq_exact",
    hint: "Être au-dessus, c'est avoir une différence positive.",
    explanation: exp(
      "Comparer deux courbes revient à comparer les valeurs des deux fonctions en chaque abscisse.",
      "On étudie donc le signe de la différence $d(x) = f(x) - g(x)$.",
      "Là où $d(x) > 0$, la courbe de $f$ est AU-DESSUS de celle de $g$ ; là où $d(x) < 0$, elle est en dessous. Un tracé peut guider l'intuition, mais ne démontre rien.",
      "On étudie le signe de $f(x) - g(x)$."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Que signifie $f(x) - g(x) > 0$ sur un intervalle ?",
    format: "qcm",
    choices: [
      "la courbe de $f$ est au-dessus de celle de $g$ sur cet intervalle",
      "la courbe de $f$ est en dessous de celle de $g$",
      "les deux courbes se coupent",
      "$f$ est croissante",
    ],
    expected: [
      "la courbe de $f$ est au-dessus de celle de $g$ sur cet intervalle",
    ],
    comparator: "mcq_exact",
    hint: "Une différence positive signifie que $f(x)$ est plus grand.",
    explanation: exp(
      "Le signe de la différence donne la position relative des deux courbes.",
      "$f(x) - g(x) > 0$ équivaut à $f(x) > g(x)$ : en chaque abscisse de l'intervalle, le point de $\\mathcal{C}_f$ est plus haut.",
      "La courbe de $f$ est donc au-dessus de celle de $g$. Cela ne dit rien de leurs variations respectives : les deux peuvent monter, descendre, ou faire l'inverse l'une de l'autre.",
      "$\\mathcal{C}_f$ est au-dessus de $\\mathcal{C}_g$."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "En combien de points les courbes de $f(x) = x^2$ et $g(x) = 2x - 1$ se coupent-elles ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Résous $x^2 - 2x + 1 = 0$ : reconnais-tu une identité remarquable ?",
    explanation: exp(
      "Les points d'intersection sont les solutions de $f(x) = g(x)$, c'est-à-dire les racines de la différence.",
      "$x^2 - (2x - 1) = x^2 - 2x + 1 = (x - 1)^2$.",
      "Ce carré ne s'annule qu'en $x = 1$ : il y a UN seul point d'intersection. La droite est en fait tangente à la parabole en ce point.",
      "Les courbes se coupent en $1$ point."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Sur quel ensemble la courbe de $f(x) = x^2$ est-elle au-dessus de celle de $g(x) = x$ ?",
    format: "qcm",
    choices: [
      "$]-\\infty ; 0[ \\cup ]1 ; +\\infty[$",
      "$]0 ; 1[$",
      "$\\mathbb{R}$",
      "$]1 ; +\\infty[$",
    ],
    expected: ["$]-\\infty ; 0[ \\cup ]1 ; +\\infty[$"],
    comparator: "mcq_exact",
    hint: "Étudie le signe de $x^2 - x = x(x - 1)$.",
    explanation: exp(
      "On étudie le signe de la différence $d(x) = x^2 - x$.",
      "$d(x) = x(x - 1)$ : c'est un trinôme de racines $0$ et $1$, avec un coefficient dominant positif.",
      "Il est donc positif à l'EXTÉRIEUR des racines. La parabole est au-dessus de la droite pour $x < 0$ et pour $x > 1$ ; entre $0$ et $1$, elle passe en dessous.",
      "$\\mathcal{C}_f$ est au-dessus sur $]-\\infty ; 0[ \\cup ]1 ; +\\infty[$."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Deux fonctions vérifient $f' > g'$ sur un intervalle. La courbe de $f$ est-elle au-dessus de celle de $g$ ?",
    format: "qcm",
    choices: [
      "non : cela dit seulement que $f$ croît plus vite",
      "oui, toujours",
      "oui, si les deux sont croissantes",
      "non : elle est forcément en dessous",
    ],
    expected: ["non : cela dit seulement que $f$ croît plus vite"],
    comparator: "mcq_exact",
    hint: "Compare $f(x) = x$ et $g(x) = 0{,}5x + 100$.",
    explanation: exp(
      "Comparer les dérivées compare les VITESSES de variation, pas les valeurs.",
      "Contre-exemple : $f(x) = x$ et $g(x) = 0{,}5x + 100$. On a bien $f' = 1 > 0{,}5 = g'$, et pourtant $f(0) = 0 < 100 = g(0)$.",
      "La courbe de $f$ monte plus vite, mais elle part de bien plus bas : elle finira par rattraper $g$, sans être au-dessus dès le départ.",
      "Non : il faut étudier le signe de $f - g$, pas celui de $f' - g'$."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 4,
    theme: "neutral",
    text: "Les courbes de $f$ et $g$ se coupent aux points d'abscisses solutions de :",
    format: "qcm",
    choices: [
      "$f(x) - g(x) = 0$",
      "$f'(x) = g'(x)$",
      "$f(x) + g(x) = 0$",
      "$f(x) = 0$",
    ],
    expected: ["$f(x) - g(x) = 0$"],
    comparator: "mcq_exact",
    hint: "Se couper, c'est avoir la même ordonnée à la même abscisse.",
    explanation: exp(
      "Un point d'intersection appartient aux deux courbes : il a la même abscisse et la même ordonnée.",
      "Cela signifie $f(x) = g(x)$, c'est-à-dire $f(x) - g(x) = 0$.",
      "Les abscisses des points d'intersection sont donc les racines de la différence — celles-là mêmes qui font changer son signe.",
      "Ce sont les solutions de $f(x) - g(x) = 0$."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Étudie la position relative des courbes de $f(x) = x^2$ et $g(x) = 4x - 4$.",
    format: "open",
    expected: ["(x-2)^2", "au-dessus", "tangente", "2"],
    comparator: "contains_keyword",
    hint: "Calcule $f - g$ et reconnais une identité remarquable.",
    explanation: exp(
      "On étudie le signe de la différence $d(x) = f(x) - g(x)$.",
      "$d(x) = x^2 - 4x + 4 = (x - 2)^2$.",
      "Un carré est toujours positif ou nul : la parabole est donc TOUJOURS au-dessus de la droite, sauf en $x = 2$ où elles se touchent.",
      "La droite est tangente à la parabole au point d'abscisse $2$ ; ailleurs, $\\mathcal{C}_f$ est strictement au-dessus."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_var_pos_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi comparer $f'$ et $g'$ ne renseigne pas sur la position des courbes.",
    format: "open",
    expected: ["vitesse", "valeur", "contre-exemple", "départ"],
    comparator: "contains_keyword",
    hint: "Deux voitures : l'une roule plus vite, est-elle devant ?",
    explanation: exp(
      "La dérivée mesure une vitesse de variation, pas une valeur.",
      "Deux fonctions peuvent avoir des dérivées très différentes tout en étant à des hauteurs quelconques : la position dépend aussi d'où elles partent.",
      "Contre-exemple : $f(x) = x$ et $g(x) = 0{,}5x + 100$. $f$ croît deux fois plus vite, et pourtant sa courbe est très en dessous pour les petites valeurs de $x$.",
      "Seul le signe de $f - g$ donne la position ; $f' - g'$ ne donne que l'écart des vitesses."
    ),
    tags: ["premiere", "maths", "variations", "position_relative", "open"],
  },
  {
    kind: "template",
    id: "premiere_var_pos_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    hint: "Résous $f(x) = g(x)$ : le nombre de solutions donne le nombre de points communs.",
    tags: ["premiere", "maths", "variations", "position_relative", "template"],
    generate: () => {
      const cas = [
        { g: "2x - 1", diff: "(x-1)^2", n: 1, com: "un carré parfait : la droite est tangente à la parabole" },
        { g: "4x - 4", diff: "(x-2)^2", n: 1, com: "un carré parfait : la droite est tangente en $x = 2$" },
        { g: "x + 2", diff: "x^2 - x - 2", n: 2, com: "un trinôme de racines $-1$ et $2$" },
        { g: "3x - 2", diff: "x^2 - 3x + 2", n: 2, com: "un trinôme de racines $1$ et $2$" },
        { g: "2x - 5", diff: "x^2 - 2x + 5", n: 0, com: "un trinôme de discriminant $-16 < 0$ : il ne s'annule jamais" },
      ];
      const c = pickOne(cas);
      return {
        text: `En combien de points les courbes de $f(x) = x^2$ et $g(x) = ${c.g}$ se coupent-elles ?`,
        format: "short",
        expected: [String(c.n)],
        comparator: "number_equal",
        explanation: exp(
          "Les points d'intersection correspondent aux solutions de $f(x) - g(x) = 0$.",
          `Ici la différence vaut $${c.diff}$.`,
          `C'est ${c.com}.`,
          c.n === 0
            ? "Les courbes ne se coupent donc jamais : la parabole reste toujours au-dessus de la droite."
            : c.n === 1
              ? "Il y a donc $1$ seul point commun."
              : "Il y a donc $2$ points communs."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_pos_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_position_relative",
    difficulty: 5,
    theme: "neutral",
    hint: "Calcule la différence, factorise-la, puis étudie son signe.",
    tags: ["premiere", "maths", "variations", "position_relative", "open", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = x^2$",
          g: "$g(x) = 6x - 9$",
          mots: ["(x-3)^2", "au-dessus", "tangente", "3"],
          etude:
            "$f - g = x^2 - 6x + 9 = (x-3)^2 \\ge 0$ : la parabole est toujours au-dessus, et la droite lui est tangente en $x = 3$.",
        },
        {
          f: "$f(x) = x^2$",
          g: "$g(x) = x + 6$",
          mots: ["-2", "3", "au-dessus", "extérieur"],
          etude:
            "$f - g = x^2 - x - 6 = (x+2)(x-3)$ : positif à l'extérieur de $[-2 ; 3]$. La parabole est au-dessus pour $x < -2$ et $x > 3$, en dessous entre les deux.",
        },
        {
          f: "$f(x) = x^2 + 1$",
          g: "$g(x) = 2x$",
          mots: ["(x-1)^2", "au-dessus", "toujours", "1"],
          etude:
            "$f - g = x^2 - 2x + 1 = (x-1)^2 \\ge 0$ : $\\mathcal{C}_f$ est toujours au-dessus, avec un point de contact en $x = 1$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Étudie la position relative des courbes de ${c.f} et ${c.g}.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "La position relative se lit sur le SIGNE de la différence $f - g$.",
          "On calcule cette différence, on la factorise, puis on étudie son signe.",
          c.etude,
          "Une différence qui s'annule sans changer de signe signale une tangence, pas une traversée."
        ),
      };
    },
  },

  /* ===================== VAR_SECOND_DEGRE ===================== */
  {
    kind: "fixed",
    id: "premiere_var_sd_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = ax^2 + bx + c$ ?",
    format: "qcm",
    choices: ["$2ax + b$", "$2ax + b + c$", "$ax + b$", "$2a + b$"],
    expected: ["$2ax + b$"],
    comparator: "mcq_exact",
    hint: "On dérive terme à terme ; la constante disparaît.",
    explanation: exp(
      "On dérive chaque terme séparément.",
      "$(ax^2)' = 2ax$ ; $(bx)' = b$ ; $(c)' = 0$.",
      "$f'(x) = 2ax + b$ : c'est une fonction AFFINE, ce qui explique qu'un trinôme change de sens au plus une fois.",
      "$f'(x) = 2ax + b$."
    ),
    tags: ["premiere", "maths", "variations", "second_degre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 4,
    theme: "neutral",
    text: "Pour $f(x) = 2x^2 - 8x + 1$, quelle est l'abscisse du sommet ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Résous $f'(x) = 0$ avec $f'(x) = 4x - 8$.",
    explanation: exp(
      "Le sommet est atteint là où la dérivée s'annule.",
      "$f'(x) = 4x - 8$, et $4x - 8 = 0$ donne $x = 2$.",
      "On retrouve la formule $-\\dfrac{b}{2a} = -\\dfrac{-8}{4} = 2$ : les deux méthodes coïncident, la dérivation la démontre.",
      "L'abscisse du sommet est $2$."
    ),
    canvas: parabole(2, -8, 1),
    tags: ["premiere", "maths", "variations", "second_degre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi la formule $-\\dfrac{b}{2a}$ donne-t-elle l'abscisse du sommet ?",
    format: "qcm",
    choices: [
      "car c'est la solution de $2ax + b = 0$, c'est-à-dire $f'(x) = 0$",
      "car c'est la moyenne des racines uniquement",
      "c'est une formule à retenir sans justification",
      "car $b$ est toujours négatif",
    ],
    expected: [
      "car c'est la solution de $2ax + b = 0$, c'est-à-dire $f'(x) = 0$",
    ],
    comparator: "mcq_exact",
    hint: "Résous $f'(x) = 0$ dans le cas général.",
    explanation: exp(
      "Le sommet est le point où la tangente est horizontale, donc où $f'$ s'annule.",
      "$f'(x) = 2ax + b$, et $2ax + b = 0$ donne $x = -\\dfrac{b}{2a}$.",
      "La formule apprise en seconde se DÉMONTRE ainsi par la dérivation. (C'est aussi la moyenne des racines quand elles existent, mais la formule vaut même sans racine.)",
      "C'est la solution de $f'(x) = 0$."
    ),
    tags: ["premiere", "maths", "variations", "second_degre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 4,
    theme: "neutral",
    text: "Pour un trinôme avec $a > 0$, quel est le sens de variation ?",
    format: "qcm",
    choices: [
      "décroissante puis croissante",
      "croissante puis décroissante",
      "croissante sur $\\mathbb{R}$",
      "décroissante sur $\\mathbb{R}$",
    ],
    expected: ["décroissante puis croissante"],
    comparator: "mcq_exact",
    hint: "$f'(x) = 2ax + b$ est une fonction affine croissante si $a > 0$.",
    explanation: exp(
      "Les variations d'un trinôme se lisent sur le signe de sa dérivée $f'(x) = 2ax + b$.",
      "Si $a > 0$, cette fonction affine est croissante : elle est d'abord négative, s'annule au sommet, puis devient positive.",
      "La fonction décroît donc, puis croît : la parabole est tournée vers le haut et son sommet est un minimum.",
      "Décroissante puis croissante."
    ),
    tags: ["premiere", "maths", "variations", "second_degre", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $f(x) = 2x^2 - 8x + 1$, quel est le minimum ?",
    format: "short",
    expected: ["-7"],
    comparator: "number_equal",
    hint: "Le sommet est en $x = 2$ : calcule $f(2)$.",
    explanation: exp(
      "Le minimum est l'image de l'abscisse du sommet.",
      "$f'(x) = 4x - 8$ s'annule en $x = 2$, en passant du négatif au positif : c'est bien un minimum.",
      "$f(2) = 2 \\times 4 - 16 + 1 = 8 - 16 + 1 = -7$.",
      "Le minimum vaut $-7$, atteint en $x = 2$."
    ),
    canvas: parabole(2, -8, 1),
    tags: ["premiere", "maths", "variations", "second_degre", "canvas", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 5,
    theme: "neutral",
    text: "Combien de fois un trinôme du second degré peut-il changer de sens de variation ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Sa dérivée est une fonction affine : combien de fois change-t-elle de signe ?",
    explanation: exp(
      "Le nombre de changements de sens correspond au nombre de changements de signe de la dérivée.",
      "Pour un trinôme, $f'(x) = 2ax + b$ est une fonction AFFINE : elle s'annule une seule fois et change de signe une seule fois.",
      "Le trinôme change donc de sens exactement une fois, au sommet. C'est pourquoi une parabole n'a qu'un seul sommet, contrairement à une fonction du troisième degré qui peut en avoir deux.",
      "Une seule fois."
    ),
    tags: ["premiere", "maths", "variations", "second_degre", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 5,
    theme: "neutral",
    text: "Étudie les variations de $f(x) = -x^2 + 4x + 1$ par la dérivation, et donne son extremum.",
    format: "open",
    expected: ["2", "5", "maximum", "dérivée"],
    comparator: "contains_keyword",
    hint: "Dérive, annule, étudie le signe — et regarde le signe de $a$.",
    explanation: exp(
      "On étudie les variations d'un trinôme par le signe de sa dérivée.",
      "$f'(x) = -2x + 4$, qui s'annule en $x = 2$. Comme $a = -1 < 0$, la dérivée est positive AVANT $2$ et négative après.",
      "La fonction croît puis décroît : elle atteint un MAXIMUM en $x = 2$, égal à $f(2) = -4 + 8 + 1 = 5$.",
      "Croissante sur $]-\\infty ; 2]$, décroissante ensuite, avec un maximum de $5$."
    ),
    canvas: parabole(-1, 4, 1),
    tags: ["premiere", "maths", "variations", "second_degre", "canvas", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_var_sd_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le signe de $a$ suffit à connaître l'allure d'une parabole, sans calculer quoi que ce soit.",
    format: "open",
    expected: ["dérivée", "affine", "croissante", "minimum"],
    comparator: "contains_keyword",
    hint: "Quelle est la nature de $f'$, et que fait son signe ?",
    explanation: exp(
      "L'allure d'une parabole dépend entièrement du signe de $a$, et la dérivation l'explique.",
      "$f'(x) = 2ax + b$ est une fonction affine dont le coefficient directeur est $2a$.",
      "Si $a > 0$, $f'$ est croissante : elle passe du négatif au positif, donc $f$ décroît puis croît — parabole tournée vers le haut, sommet minimum. Si $a < 0$, tout s'inverse.",
      "Le signe de $a$ fixe le sens de variation de $f'$, donc l'allure de la courbe."
    ),
    tags: ["premiere", "maths", "variations", "second_degre", "open"],
  },
  {
    kind: "template",
    id: "premiere_var_sd_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 4,
    theme: "neutral",
    hint: "Dérive, puis résous $f'(x) = 0$.",
    tags: ["premiere", "maths", "variations", "second_degre", "template"],
    generate: () => {
      const a = pickOne([1, 2, 3, -1, -2]);
      const alpha = randomInt(-3, 4);
      const b = -2 * a * alpha;
      const c = randomInt(-5, 5);
      const ys = a * alpha * alpha + b * alpha + c;
      const signeB = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const signeC = c >= 0 ? `+ ${c}` : `- ${-c}`;
      const coefA = a === 1 ? "" : a === -1 ? "-" : `${a}`;
      const question = randomInt(0, 1) === 1;
      return {
        text: question
          ? `Pour $f(x) = ${coefA}x^2 ${signeB}x ${signeC}$, quelle est l'abscisse du sommet ?`
          : `Pour $f(x) = ${coefA}x^2 ${signeB}x ${signeC}$, quel est ${a > 0 ? "le minimum" : "le maximum"} ?`,
        format: "short",
        expected: [String(question ? alpha : ys)],
        comparator: "number_equal",
        explanation: exp(
          "On étudie le trinôme par la dérivation : le sommet est là où $f'$ s'annule.",
          `$f'(x) = ${2 * a}x ${signeB}$, qui s'annule en $x = ${alpha}$.`,
          question
            ? `L'abscisse du sommet est donc $${alpha}$.`
            : `L'extremum est l'image : $f(${alpha}) = ${ys}$.`,
          a > 0
            ? `Comme $a > 0$, la fonction décroît puis croît : c'est un minimum${question ? "" : ` de $${ys}$`}.`
            : `Comme $a < 0$, la fonction croît puis décroît : c'est un maximum${question ? "" : ` de $${ys}$`}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_var_sd_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "variations_fonctions",
    microId: "var_second_degre",
    difficulty: 5,
    theme: "neutral",
    hint: "Dérive, annule, regarde le signe de $a$, conclus par un tableau.",
    tags: ["premiere", "maths", "variations", "second_degre", "open", "template"],
    generate: () => {
      const a = pickOne([1, 2, -1, -3]);
      const alpha = randomInt(-2, 3);
      const b = -2 * a * alpha;
      const c = randomInt(-4, 6);
      const ys = a * alpha * alpha + b * alpha + c;
      const signeB = b >= 0 ? `+ ${b}` : `- ${-b}`;
      const signeC = c >= 0 ? `+ ${c}` : `- ${-c}`;
      const coefA = a === 1 ? "" : a === -1 ? "-" : `${a}`;
      return {
        text: `Étudie les variations de $f(x) = ${coefA}x^2 ${signeB}x ${signeC}$ par la dérivation, et donne son extremum.`,
        format: "open",
        expected: [String(alpha), String(ys), a > 0 ? "minimum" : "maximum", "dérivée"],
        comparator: "contains_keyword",
        explanation: exp(
          "Les variations d'un trinôme se déduisent du signe de sa dérivée, qui est une fonction affine.",
          `$f'(x) = ${2 * a}x ${signeB}$, qui s'annule en $x = ${alpha}$.`,
          a > 0
            ? `Comme $a > 0$, $f'$ est négative avant $${alpha}$ et positive après : $f$ décroît puis croît.`
            : `Comme $a < 0$, $f'$ est positive avant $${alpha}$ et négative après : $f$ croît puis décroît.`,
          `L'extremum est un ${a > 0 ? "minimum" : "maximum"} égal à $f(${alpha}) = ${ys}$.`
        ),
      };
    },
  },
];
