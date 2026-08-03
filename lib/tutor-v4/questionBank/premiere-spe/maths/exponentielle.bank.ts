// lib/tutor-v4/questionBank/premiere-spe/maths/exponentielle.bank.ts
//
// Chapitre : Fonction exponentielle (notion "exponentielle")
// microSkills :
//   exp_definition     — l'unique fonction telle que f' = f et f(0) = 1
//   exp_relation       — relation fonctionnelle exp(x + y) = exp(x)exp(y)
//   exp_nombre_e       — le nombre e et la notation e^x
//   exp_proprietes     — propriétés algébriques (e^{-x} = 1/e^x, quotient, puissance)
//   exp_simplifier     — simplifier une expression avec l'exponentielle
//   exp_signe          — l'exponentielle est strictement positive
//   exp_derivee        — dérivée, signe et variations de l'exponentielle
//   exp_derivee_affine — dériver t ↦ e^(kt)
//   exp_courbe         — représenter t ↦ e^(kt) et t ↦ e^(−kt)
//   exp_suite_geo      — reconnaître que la suite (e^(na)) est géométrique
//   exp_modelisation   — modéliser une croissance/décroissance exponentielle
//
// PÉRIMÈTRE BO 2019 Première spé. Conventions : LaTeX, règle QCM. Canvas : fonctionGraphique (courbe exp via points).
//
// Règle d'écriture (voir logique-ensembles.bank.ts, même méthode) : `fixed` pour
// les pièges, les propriétés et les contextes réels ; `template` dès qu'on peut
// changer les nombres sans changer la question ; plusieurs questions ouvertes par
// micro-compétence, dont au moins un TEMPLATE ouvert — sinon la question ouverte
// se répète elle aussi.

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

function echantillonne(f: (x: number) => number, xmin: number, xmax: number, step: number) {
  const pts: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += step) {
    const xr = Math.round(x * 100) / 100;
    pts.push({ x: xr, y: Math.round(f(xr) * 100) / 100 });
  }
  return pts;
}

const courbeExp: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 320, height: 300 },
  xmin: -3,
  xmax: 3,
  ymin: -1,
  ymax: 9,
  grille: true,
  courbes: [{ id: "f", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.exp(x), -3, 2.1, 0.3) }],
  misesEnEvidence: [{ point: { x: 0, y: 1, label: "(0 ; 1)", couleur: "#dc2626" } }],
};

/** Les deux courbes ensemble : c'est la SYMÉTRIE par rapport à l'axe des
 *  ordonnées qui doit sauter aux yeux, pas chaque courbe prise à part. */
const courbeExpEtInverse: CanvasFigure = {
  kind: "fonctionGraphique",
  size: { width: 340, height: 300 },
  xmin: -3,
  xmax: 3,
  ymin: -1,
  ymax: 9,
  grille: true,
  courbes: [
    { id: "croissante", type: "points", couleur: "#2563eb", points: echantillonne((x) => Math.exp(x), -3, 2.1, 0.3) },
    { id: "decroissante", type: "points", couleur: "#ea580c", points: echantillonne((x) => Math.exp(-x), -2.1, 3, 0.3) },
  ],
  misesEnEvidence: [{ point: { x: 0, y: 1, label: "(0 ; 1)", couleur: "#dc2626" } }],
};

/** Courbe de t ↦ e^{kt} sur [0 ; 6], pour les templates : le même canevas sert
 *  à une croissance ou à une décroissance selon le signe de k. */
function courbeTaux(k: number): CanvasFigure {
  const tmax = 6;
  const yfin = Math.exp(k * tmax);
  return {
    kind: "fonctionGraphique",
    size: { width: 320, height: 280 },
    xmin: 0,
    xmax: tmax,
    ymin: 0,
    ymax: Math.max(2, Math.ceil(Math.max(1, yfin))),
    grille: true,
    courbes: [
      { id: "f", type: "points", couleur: "#2563eb", points: echantillonne((t) => Math.exp(k * t), 0, tmax, 0.25) },
    ],
    misesEnEvidence: [{ point: { x: 0, y: 1, label: "(0 ; 1)", couleur: "#dc2626" } }],
  };
}

export const exponentielleBank: TutorBankItemV4[] = [
  /* ===================== EXP_DEFINITION ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_def_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle propriété définit la fonction exponentielle ?",
    format: "qcm",
    choices: [
      "c'est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$",
      "c'est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $f' = f$ et $f(0) = 0$",
      "c'est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $f'' = f$ et $f(0) = 1$",
      "c'est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $f' = -f$ et $f(0) = 1$",
    ],
    expected: ["c'est l'unique fonction dérivable sur $\\mathbb{R}$ telle que $f' = f$ et $f(0) = 1$"],
    comparator: "mcq_exact",
    hint: "Deux conditions : une sur la dérivée, une sur la valeur en $0$.",
    explanation: exp(
      "La fonction exponentielle est définie par deux conditions, pas une seule.",
      "La première dit qu'elle est égale à sa propre dérivée : $f' = f$. La seconde fixe son point de départ : $f(0) = 1$.",
      "Sans la condition $f(0) = 1$, il resterait une infinité de fonctions possibles (toutes les $x \\mapsto k e^x$), dont la fonction nulle.",
      "L'exponentielle est l'unique fonction dérivable telle que $f' = f$ et $f(0) = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Combien vaut $e^0$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Cas particulier.",
    explanation: exp(
      "Par définition, l'exponentielle vérifie $e^0 = 1$.",
      "C'est la condition initiale.",
      "$e^0 = 1$.",
      "$e^0 = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction nulle (celle qui vaut $0$ pour tout $x$) vérifie-t-elle $f' = f$ ?",
    format: "qcm",
    choices: [
      "oui, mais $f(0) = 0$ : ce n'est donc pas l'exponentielle",
      "non, la dérivée de la fonction nulle n'est pas nulle",
      "oui, c'est donc une deuxième fonction exponentielle",
      "la question n'a pas de sens",
    ],
    expected: ["oui, mais $f(0) = 0$ : ce n'est donc pas l'exponentielle"],
    comparator: "mcq_exact",
    hint: "Dérive la fonction nulle, puis regarde sa valeur en $0$.",
    explanation: exp(
      "Une fonction constante a une dérivée nulle.",
      "La fonction nulle est constante : sa dérivée vaut $0$, c'est-à-dire elle-même. Elle vérifie donc bien $f' = f$.",
      "Mais $f(0) = 0$, et non $1$ : la deuxième condition n'est pas remplie.",
      "Oui pour $f' = f$, non pour être l'exponentielle — c'est exactement le rôle de la condition $f(0) = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 3,
    theme: "neutral",
    text: "$f$ désigne la fonction exponentielle. Combien vaut $f'(0)$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "L'exponentielle est égale à sa dérivée : que vaut alors $f'(0)$ ?",
    explanation: exp(
      "La définition donne deux informations : $f' = f$ partout, et $f(0) = 1$.",
      "En $0$ : $f'(0) = f(0)$.",
      "Or $f(0) = 1$, donc $f'(0) = 1$. Autrement dit, la tangente à la courbe au point $(0 ; 1)$ a pour coefficient directeur $1$.",
      "$f'(0) = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 2,
    theme: "neutral",
    text: "Sur quel ensemble la fonction exponentielle est-elle définie ?",
    format: "qcm",
    choices: ["$\\mathbb{R}$", "$]0 ; +\\infty[$", "$[0 ; +\\infty[$", "$\\mathbb{R}^{*}$"],
    expected: ["$\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Y a-t-il un réel qu'on n'a pas le droit de mettre dans $e^x$ ?",
    explanation: exp(
      "L'ensemble de définition est l'ensemble des réels qu'on peut donner à la fonction.",
      "L'exponentielle accepte tous les réels : $e^{-100}$, $e^0$ et $e^{100}$ existent tous.",
      "Attention à ne pas confondre avec ses VALEURS, qui sont, elles, dans $]0 ; +\\infty[$ : l'exponentielle est définie sur $\\mathbb{R}$ et à valeurs strictement positives.",
      "Elle est définie sur $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 5,
    theme: "neutral",
    text: "La fonction $g$ définie par $g(x) = 3e^{x}$ vérifie $g' = g$. Est-ce la fonction exponentielle ?",
    format: "qcm",
    choices: [
      "non : $g(0) = 3$ et non $1$",
      "oui, puisque $g' = g$",
      "non : sa dérivée vaut $3$",
      "oui, à un coefficient près, c'est la même fonction",
    ],
    expected: ["non : $g(0) = 3$ et non $1$"],
    comparator: "mcq_exact",
    hint: "Calcule $g(0)$.",
    explanation: exp(
      "Être égale à sa dérivée ne suffit pas : il faut aussi passer par le point $(0 ; 1)$.",
      "$g'(x) = 3e^x = g(x)$ : la première condition est bien remplie.",
      "Mais $g(0) = 3 \\times e^0 = 3$. La seconde condition ne l'est pas.",
      "Non : $g$ n'est pas l'exponentielle, c'est un de ses multiples."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 4,
    theme: "reunion",
    text: "Dans un laboratoire de Saint-Denis, une culture de bactéries grandit de telle sorte que, à chaque instant, sa vitesse de croissance est égale au nombre $N(t)$ de bactéries présentes. Quelle égalité traduit cette phrase ?",
    format: "qcm",
    choices: ["$N'(t) = N(t)$", "$N'(t) = t$", "$N(t) = t \\times N'(t)$", "$N'(t) = 0$"],
    expected: ["$N'(t) = N(t)$"],
    comparator: "mcq_exact",
    hint: "« Vitesse de croissance » se traduit par la dérivée.",
    explanation: exp(
      "En mathématiques, la vitesse à laquelle une grandeur change est sa dérivée.",
      "« La vitesse de croissance est égale au nombre présent » s'écrit donc $N'(t) = N(t)$.",
      "C'est exactement la relation qui définit l'exponentielle : la population suit un modèle $N(t) = N_0 e^{t}$.",
      "$N'(t) = N(t)$ — la phrase du biologiste est l'équation de l'exponentielle."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la condition $f(0) = 1$ est indispensable dans la définition de la fonction exponentielle.",
    format: "open",
    expected: ["unique", "fonction nulle", "condition initiale", "plusieurs fonctions", "infinite", "infinité"],
    comparator: "contains_keyword",
    hint: "Cite une autre fonction qui vérifie $f' = f$.",
    explanation: exp(
      "Une définition doit désigner UN seul objet.",
      "La condition $f' = f$ ne suffit pas : la fonction nulle la vérifie, et plus généralement toutes les fonctions $x \\mapsto k e^{x}$.",
      "Il y en a donc une infinité. La condition $f(0) = 1$ fixe le point de départ et n'en garde qu'une seule.",
      "Sans $f(0) = 1$, la définition ne désignerait pas une fonction, mais une infinité."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_def_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève affirme : « toute fonction égale à sa propre dérivée est la fonction exponentielle ». Explique pourquoi c'est faux.",
    format: "open",
    expected: ["fonction nulle", "contre-exemple", "multiple", "coefficient", "f(0)"],
    comparator: "contains_keyword",
    hint: "Un contre-exemple suffit à réfuter une affirmation.",
    explanation: exp(
      "Pour réfuter une affirmation « toute fonction… », il suffit d'exhiber un contre-exemple.",
      "La fonction nulle vérifie $f' = f$ et n'est pas l'exponentielle. La fonction $x \\mapsto 5e^{x}$ aussi.",
      "Toutes les fonctions $x \\mapsto k e^{x}$ conviennent : l'affirmation est fausse dès que $k \\neq 1$.",
      "C'est faux : il manque la condition $f(0) = 1$, la seule qui distingue l'exponentielle de ses multiples."
    ),
    tags: ["premiere", "maths", "exponentielle", "definition", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_def_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux vérifications à faire : la dérivée, puis la valeur en $0$.",
    tags: ["premiere", "maths", "exponentielle", "definition", "template"],
    generate: () => {
      const cas = [
        {
          f: "$f(x) = e^{x}$",
          ok: true,
          pourquoi: "$f'(x) = e^x = f(x)$ et $f(0) = e^0 = 1$ : les deux conditions sont remplies.",
        },
        {
          f: "$f(x) = 2e^{x}$",
          ok: false,
          pourquoi: "$f' = f$ est bien vérifiée, mais $f(0) = 2$ et non $1$.",
        },
        {
          f: "$f(x) = e^{2x}$",
          ok: false,
          pourquoi: "$f(0) = 1$ est bien vérifiée, mais $f'(x) = 2e^{2x} = 2f(x)$ : la dérivée vaut le double de la fonction.",
        },
        {
          f: "$f(x) = e^{x} + 1$",
          ok: false,
          pourquoi: "$f'(x) = e^x$, qui n'est pas égal à $f(x) = e^x + 1$ ; et $f(0) = 2$.",
        },
        {
          f: "$f(x) = x e^{x}$",
          ok: false,
          pourquoi: "$f(0) = 0 \\times e^0 = 0$, et sa dérivée $(1 + x)e^x$ ne lui est pas égale.",
        },
        {
          f: "$f(x) = 0$",
          ok: false,
          pourquoi: "sa dérivée est bien nulle, donc $f' = f$ ; mais $f(0) = 0$ et non $1$.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `La fonction définie par ${c.f} est-elle la fonction exponentielle ?`,
        format: "qcm",
        choices: c.ok
          ? ["oui", "non : $f(0) \\neq 1$", "non : $f' \\neq f$", "on ne peut pas le savoir"]
          : ["non", "oui", "oui, car $f' = f$", "on ne peut pas le savoir"],
        expected: [c.ok ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "L'exponentielle est l'unique fonction telle que $f' = f$ ET $f(0) = 1$ : on vérifie les deux conditions.",
          `On dérive ${c.f}, puis on calcule sa valeur en $0$.`,
          c.pourquoi,
          c.ok ? "Oui, c'est bien la fonction exponentielle." : "Non, ce n'est pas la fonction exponentielle."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_def_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_definition",
    difficulty: 5,
    theme: "neutral",
    hint: "Repars des deux conditions de la définition, et de rien d'autre.",
    tags: ["premiere", "maths", "exponentielle", "definition", "open", "template"],
    generate: () => {
      const cas = [
        {
          aff: "$e^{0} = 1$",
          mots: ["condition initiale", "definition", "définition", "par definition", "point de depart", "point de départ"],
          pourquoi:
            "C'est la seconde condition de la définition, celle qui fixe le point de départ. Il n'y a rien à calculer : c'est un choix qui fait partie de la définition.",
        },
        {
          aff: "la fonction exponentielle est strictement croissante sur $\\mathbb{R}$",
          mots: ["strictement positive", "egale a elle", "égale à elle", "jamais nulle", "sa derivee", "sa dérivée"],
          pourquoi:
            "Sa dérivée est elle-même, et on démontre qu'elle ne s'annule jamais : elle garde donc le signe de $e^0 = 1$, c'est-à-dire qu'elle est strictement positive. Une dérivée strictement positive donne une fonction strictement croissante.",
        },
        {
          aff: "la tangente à la courbe de l'exponentielle au point d'abscisse $0$ a pour coefficient directeur $1$",
          mots: ["nombre derive", "nombre dérivé", "coefficient directeur", "vaut 1", "f'(0)"],
          pourquoi:
            "Le coefficient directeur de la tangente en $0$ est le nombre dérivé $f'(0)$. Or $f' = f$, donc $f'(0) = f(0) = 1$.",
        },
        {
          aff: "la fonction $x \\mapsto 4e^{x}$ n'est pas la fonction exponentielle",
          mots: ["f(0)", "vaut 4", "n'est pas 1", "condition initiale", "multiple"],
          pourquoi:
            "Elle vérifie pourtant $f' = f$. Mais sa valeur en $0$ vaut $4$ : la seconde condition tombe.",
        },
      ];
      const c = pickOne(cas);
      return {
        text: `En utilisant uniquement la définition de la fonction exponentielle, justifie que : ${c.aff}.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "La définition dit deux choses : l'exponentielle est égale à sa dérivée, et elle vaut $1$ en $0$.",
          "On part de ces deux conditions, sans utiliser de formule apprise plus tard.",
          c.pourquoi,
          `C'est ainsi qu'on justifie que ${c.aff}.`
        ),
      };
    },
  },

  /* ===================== EXP_RELATION ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_rel_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle relation fonctionnelle la fonction exponentielle vérifie-t-elle, pour tous réels $x$ et $y$ ?",
    format: "qcm",
    choices: [
      "$\\exp(x + y) = \\exp(x) \\times \\exp(y)$",
      "$\\exp(x + y) = \\exp(x) + \\exp(y)$",
      "$\\exp(x \\times y) = \\exp(x) \\times \\exp(y)$",
      "$\\exp(x - y) = \\exp(x) \\times \\exp(y)$",
    ],
    expected: ["$\\exp(x + y) = \\exp(x) \\times \\exp(y)$"],
    comparator: "mcq_exact",
    hint: "Elle transforme les sommes en produits.",
    explanation: exp(
      "La relation fonctionnelle est la propriété qui fait tout marcher : elle transforme une SOMME en PRODUIT.",
      "Pour tous réels $x$ et $y$ : $\\exp(x + y) = \\exp(x) \\times \\exp(y)$.",
      "C'est elle qui justifie ensuite la notation $e^x$ : les exponentielles se calculent comme des puissances.",
      "$\\exp(x + y) = \\exp(x) \\times \\exp(y)$."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi est égal $e^{x} \\times e^{y}$ ?",
    format: "qcm",
    choices: ["$e^{x+y}$", "$e^{xy}$", "$e^{x-y}$", "$e^x + e^y$"],
    expected: ["$e^{x+y}$"],
    comparator: "mcq_exact",
    hint: "Produit d'exponentielles → somme des exposants.",
    explanation: exp(
      "L'exponentielle transforme les produits en sommes d'exposants.",
      "$e^{x} \\times e^{y} = e^{x+y}$.",
      "C'est la propriété fondamentale.",
      "$e^{x+y}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 5,
    theme: "neutral",
    text: "A-t-on $e^x + e^y = e^{x+y}$ ?",
    format: "qcm",
    choices: [
      "non : c'est le PRODUIT qui donne $e^{x+y}$",
      "oui, toujours",
      "oui, seulement si $x = y$",
      "oui, seulement si $x$ et $y$ sont positifs",
    ],
    expected: ["non : c'est le PRODUIT qui donne $e^{x+y}$"],
    comparator: "mcq_exact",
    hint: "Teste avec $x = y = 0$ : à gauche $1 + 1$, à droite $e^0$.",
    explanation: exp(
      "Les propriétés de l'exponentielle transforment un PRODUIT en somme d'exposants, jamais une somme.",
      "Contre-exemple : pour $x = y = 0$, à gauche $e^0 + e^0 = 2$, à droite $e^0 = 1$. Les deux diffèrent.",
      "L'égalité correcte est $e^x \\times e^y = e^{x+y}$ ; une somme d'exponentielles ne se simplifie pas (au mieux, elle se factorise).",
      "Non : c'est le produit qui donne $e^{x+y}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_rel_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la relation $e^{x+y} = e^{x} \\times e^{y}$, que donne le choix $y = -x$ ?",
    format: "qcm",
    choices: [
      "$e^{x} \\times e^{-x} = 1$",
      "$e^{x} \\times e^{-x} = 0$",
      "$e^{x} \\times e^{-x} = e^{x^2}$",
      "$e^{x} \\times e^{-x} = -1$",
    ],
    expected: ["$e^{x} \\times e^{-x} = 1$"],
    comparator: "mcq_exact",
    hint: "Que vaut $x + (-x)$, et que vaut l'exponentielle en ce nombre ?",
    explanation: exp(
      "On applique la relation fonctionnelle avec une valeur bien choisie de $y$.",
      "Avec $y = -x$ : $e^{x + (-x)} = e^{x} \\times e^{-x}$.",
      "Or $x + (-x) = 0$ et $e^0 = 1$, donc $e^{x} \\times e^{-x} = 1$.",
      "$e^{x} \\times e^{-x} = 1$ — c'est de là que vient $e^{-x} = \\dfrac{1}{e^x}$, et la preuve que $e^x$ ne s'annule jamais."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_rel_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour quelles valeurs de $x$ et $y$ la relation $e^{x+y} = e^{x} e^{y}$ est-elle vraie ?",
    format: "qcm",
    choices: [
      "pour tous les réels $x$ et $y$",
      "seulement si $x$ et $y$ sont des entiers",
      "seulement si $x$ et $y$ sont positifs",
      "seulement si $x = y$",
    ],
    expected: ["pour tous les réels $x$ et $y$"],
    comparator: "mcq_exact",
    hint: "C'est une propriété de la fonction, pas une règle de calcul sur les entiers.",
    explanation: exp(
      "La relation fonctionnelle est une propriété de la fonction exponentielle elle-même.",
      "Elle est démontrée pour tous les réels, pas seulement pour les entiers ou les positifs.",
      "C'est justement ce qui la rend utile : $e^{0{,}3 + 0{,}3} = e^{0{,}6}$ fonctionne comme $e^{2+3} = e^5$.",
      "Pour tous les réels $x$ et $y$."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_rel_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 4,
    theme: "reunion",
    text: "Le nombre de vues d'une vidéo tournée à Saint-Pierre est multiplié par $e^{0{,}3}$ chaque jour. Par combien est-il multiplié en deux jours ?",
    format: "qcm",
    choices: ["$e^{0{,}6}$", "$2e^{0{,}3}$", "$e^{0{,}09}$", "$e^{0{,}3}$"],
    expected: ["$e^{0{,}6}$"],
    comparator: "mcq_exact",
    hint: "Deux jours de suite : on multiplie deux fois par le même facteur.",
    explanation: exp(
      "Multiplier deux fois par un même facteur revient à multiplier par son carré.",
      "En deux jours, le nombre de vues est multiplié par $e^{0{,}3} \\times e^{0{,}3}$.",
      "La relation fonctionnelle donne $e^{0{,}3} \\times e^{0{,}3} = e^{0{,}3 + 0{,}3} = e^{0{,}6}$ (soit environ $1{,}82$).",
      "Il est multiplié par $e^{0{,}6}$ — et non par $2e^{0{,}3}$ : les facteurs se multiplient, ils ne s'ajoutent pas."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_rel_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 5,
    theme: "neutral",
    text: "En utilisant la relation $e^{x+y} = e^{x} \\times e^{y}$, explique pourquoi l'exponentielle ne s'annule jamais.",
    format: "open",
    expected: ["inverse", "produit vaut 1", "produit egal a 1", "ne s'annule", "jamais nul", "y = -x", "-x"],
    comparator: "contains_keyword",
    hint: "Choisis $y = -x$ : que vaut le produit obtenu ?",
    explanation: exp(
      "Un produit vaut $1$ : aucun de ses deux facteurs ne peut être nul.",
      "On prend $y = -x$ dans la relation : $e^{x} \\times e^{-x} = e^{0} = 1$.",
      "Si $e^{x}$ valait $0$ pour un certain $x$, le produit vaudrait $0$, pas $1$. C'est impossible.",
      "Donc $e^{x} \\neq 0$ pour tout réel $x$ : l'exponentielle ne s'annule jamais, et $e^{-x}$ est son inverse."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_rel_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $e^{2x} = 2e^{x}$. Explique son erreur et donne l'écriture correcte.",
    format: "open",
    expected: ["carre", "carré", "produit", "somme des exposants", "contre-exemple", "contre exemple"],
    comparator: "contains_keyword",
    hint: "Écris $2x$ comme une somme, puis applique la relation fonctionnelle.",
    explanation: exp(
      "La relation fonctionnelle transforme une somme d'exposants en produit — jamais en multiplication par un nombre.",
      "$2x = x + x$, donc $e^{2x} = e^{x} \\times e^{x} = (e^{x})^{2}$.",
      "Contre-exemple pour s'en convaincre : avec $x = 0$, à gauche $e^0 = 1$, à droite $2 \\times e^0 = 2$.",
      "L'écriture correcte est $e^{2x} = (e^{x})^{2}$ : c'est le CARRÉ, pas le double."
    ),
    tags: ["premiere", "maths", "exponentielle", "relation", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_rel_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 4,
    theme: "neutral",
    hint: "Coupe l'exposant en deux avec la relation fonctionnelle.",
    tags: ["premiere", "maths", "exponentielle", "relation", "template"],
    generate: () => {
      const k = pickOne([3, 4, 5, 6, 7, 10]);
      const n = randomInt(1, 3);
      const correct = `$${k}e^{${n}}$`;
      return {
        text: `On sait que $e^{x} = ${k}$. Que vaut $e^{x + ${n}}$ ?`,
        format: "qcm",
        choices: [correct, `$${k} + e^{${n}}$`, `$${k * n}$`, `$e^{${n}}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La relation fonctionnelle sépare une somme d'exposants en un produit.",
          `$e^{x + ${n}} = e^{x} \\times e^{${n}}$.`,
          `Or $e^{x} = ${k}$, donc $e^{x + ${n}} = ${k} \\times e^{${n}}$.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_rel_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_relation",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche un contre-exemple simple, souvent $x = 0$, puis corrige l'écriture.",
    tags: ["premiere", "maths", "exponentielle", "relation", "open", "template"],
    generate: () => {
      const cas = [
        {
          faux: "$e^{x+3} = e^{x} + e^{3}$",
          correct: "$e^{x+3} = e^{x} \\times e^{3}$",
          mots: ["produit", "multiplie", "somme des exposants", "contre-exemple", "contre exemple"],
        },
        {
          faux: "$e^{x-y} = e^{x} - e^{y}$",
          correct: "$e^{x-y} = \\dfrac{e^{x}}{e^{y}}$",
          mots: ["quotient", "division", "divise", "contre-exemple", "contre exemple"],
        },
        {
          faux: "$e^{3x} = 3e^{x}$",
          correct: "$e^{3x} = (e^{x})^{3}$",
          mots: ["cube", "puissance", "produit", "contre-exemple", "contre exemple"],
        },
        {
          faux: "$(e^{x})^{2} = e^{x^{2}}$",
          correct: "$(e^{x})^{2} = e^{2x}$",
          mots: ["2x", "produit des exposants", "multiplie l'exposant", "contre-exemple", "contre exemple"],
        },
      ];
      const c = pickOne(cas);
      return {
        text: `Un élève écrit ${c.faux}. Explique pourquoi c'est faux, puis donne l'écriture correcte.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Les exponentielles suivent les règles des puissances : une somme d'exposants devient un produit, une différence un quotient, un produit d'exposants une puissance.",
          "Pour montrer qu'une égalité est fausse, un seul contre-exemple suffit — souvent $x = 0$ ou $x = 1$.",
          `L'écriture proposée mélange deux opérations différentes.`,
          `L'écriture correcte est ${c.correct}.`
        ),
      };
    },
  },

  /* ===================== EXP_NOMBRE_E ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_e_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 2,
    theme: "neutral",
    text: "Comment définit-on le nombre $e$ ?",
    format: "qcm",
    choices: [
      "$e = \\exp(1)$, l'image de $1$ par la fonction exponentielle",
      "$e = \\exp(0)$",
      "$e$ est la solution de l'équation $\\exp(x) = 1$",
      "$e$ est le coefficient directeur de la tangente en $0$",
    ],
    expected: ["$e = \\exp(1)$, l'image de $1$ par la fonction exponentielle"],
    comparator: "mcq_exact",
    hint: "On donne un nom à l'image de $1$.",
    explanation: exp(
      "Le nombre $e$ n'est pas donné d'avance : on le fabrique à partir de la fonction exponentielle.",
      "On pose $e = \\exp(1)$ : c'est simplement un nom donné à l'image de $1$.",
      "Attention aux pièges : $\\exp(0) = 1$, et la solution de $\\exp(x) = 1$ est $x = 0$.",
      "$e = \\exp(1) \\approx 2{,}718$."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est une valeur approchée de $e$ ?",
    format: "qcm",
    choices: ["$2{,}718$", "$3{,}141$", "$1{,}618$", "$1{,}414$"],
    expected: ["$2{,}718$"],
    comparator: "mcq_exact",
    hint: "Ce n'est ni $\\pi$, ni le nombre d'or, ni $\\sqrt{2}$.",
    explanation: exp(
      "Le nombre $e$ est la base de la fonction exponentielle : c'est l'unique nombre tel que $e^1 = e$ et dont la fonction exponentielle est sa propre dérivée.",
      "Sa valeur approchée est $e \\approx 2{,}718$.",
      "$3{,}141$ est $\\pi$, $1{,}618$ le nombre d'or et $1{,}414$ vaut $\\sqrt{2}$.",
      "$e \\approx 2{,}718$."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_e_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 1,
    theme: "neutral",
    text: "Avec la notation puissance, comment s'écrit $\\exp(3)$ ?",
    format: "qcm",
    choices: ["$e^{3}$", "$3e$", "$3^{e}$", "$e \\times 3$"],
    expected: ["$e^{3}$"],
    comparator: "mcq_exact",
    hint: "L'argument de $\\exp$ devient l'exposant.",
    explanation: exp(
      "La notation $e^x$ remplace $\\exp(x)$ : le nombre donné à la fonction devient l'exposant.",
      "$\\exp(3)$ s'écrit donc $e^{3}$.",
      "$3e$ voudrait dire $3 \\times e$, ce qui est tout autre chose : $e^3 \\approx 20{,}1$ alors que $3e \\approx 8{,}2$.",
      "$\\exp(3) = e^{3}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_e_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 4,
    theme: "neutral",
    text: "Pourquoi a-t-on le droit de noter $\\exp(x)$ sous la forme $e^{x}$ ?",
    format: "qcm",
    choices: [
      "parce que $\\exp$ suit les mêmes règles de calcul que les puissances",
      "parce que $\\exp(x)$ est toujours positif",
      "parce que $e$ est un nombre irrationnel",
      "parce que $\\exp$ est croissante",
    ],
    expected: ["parce que $\\exp$ suit les mêmes règles de calcul que les puissances"],
    comparator: "mcq_exact",
    hint: "Compare $\\exp(x + y) = \\exp(x)\\exp(y)$ et $a^{m+n} = a^m a^n$.",
    explanation: exp(
      "Une notation n'est légitime que si elle ne trahit pas les règles de calcul.",
      "La relation fonctionnelle donne $\\exp(x + y) = \\exp(x) \\times \\exp(y)$, exactement comme $a^{m+n} = a^{m} \\times a^{n}$ pour les puissances.",
      "On vérifie de même $\\exp(n) = e^n$ pour tout entier $n$, puis $\\exp(-x) = 1/\\exp(x)$ : tout se comporte comme une puissance de base $e$.",
      "On note $e^x$ parce que l'exponentielle calcule comme une puissance."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_e_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 4,
    theme: "neutral",
    text: "Quel est le plus grand : $e^{2}$ ou $7$ ?",
    format: "qcm",
    choices: ["$e^{2}$", "$7$", "ils sont égaux", "on ne peut pas les comparer"],
    expected: ["$e^{2}$"],
    comparator: "mcq_exact",
    hint: "$e \\approx 2{,}7$ : encadre $e^2$ entre $2{,}7^2$ et $2{,}8^2$.",
    explanation: exp(
      "Pour comparer sans calculatrice, on encadre $e$ puis on élève au carré.",
      "$2{,}7 < e < 2{,}8$, donc $7{,}29 < e^{2} < 7{,}84$.",
      "Tout l'encadrement est au-dessus de $7$ : $e^{2} \\approx 7{,}389$ est donc plus grand que $7$.",
      "$e^{2} > 7$."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_e_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 3,
    theme: "neutral",
    text: "Une valeur approchée de $e^{-1}$ est :",
    format: "qcm",
    choices: ["$0{,}368$", "$-2{,}718$", "$-0{,}368$", "$2{,}718$"],
    expected: ["$0{,}368$"],
    comparator: "mcq_exact",
    hint: "Un exposant négatif ne donne pas un nombre négatif : il donne l'inverse.",
    explanation: exp(
      "Un exposant négatif signifie « inverse », pas « opposé ».",
      "$e^{-1} = \\dfrac{1}{e} \\approx \\dfrac{1}{2{,}718}$.",
      "$\\dfrac{1}{2{,}718} \\approx 0{,}368$ : le résultat est bien positif, et compris entre $0$ et $1$.",
      "$e^{-1} \\approx 0{,}368$."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_e_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la notation $e^{x}$ est cohérente avec les puissances que tu utilises depuis la 4ᵉ.",
    format: "open",
    expected: ["memes regles", "mêmes règles", "somme des exposants", "relation fonctionnelle", "produit", "puissances"],
    comparator: "contains_keyword",
    hint: "Compare $a^{m} \\times a^{n} = a^{m+n}$ et la relation fonctionnelle.",
    explanation: exp(
      "Une notation empruntée doit obéir aux mêmes règles que l'originale, sinon elle induit en erreur.",
      "Pour les puissances : $a^{m} \\times a^{n} = a^{m+n}$, $a^{-n} = 1/a^{n}$, $(a^{m})^{n} = a^{mn}$.",
      "L'exponentielle vérifie exactement les mêmes : $\\exp(x)\\exp(y) = \\exp(x+y)$, $\\exp(-x) = 1/\\exp(x)$, $(\\exp x)^n = \\exp(nx)$. Et $\\exp(1) = e$ fixe la base.",
      "On peut donc écrire $e^x$ : toutes les règles des puissances restent vraies, avec des exposants réels."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_e_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève retient que $e \\approx 3{,}14$. Explique son erreur.",
    format: "open",
    expected: ["2,718", "2.718", "nombre pi", "confond", "2,7", "2.7"],
    comparator: "contains_keyword",
    hint: "$3{,}14$ est la valeur approchée d'un autre nombre célèbre.",
    explanation: exp(
      "Deux nombres irrationnels célèbres se ressemblent dans les mémoires : $e$ et $\\pi$.",
      "$3{,}14$ est la valeur approchée de $\\pi$, le nombre du cercle.",
      "Celle de $e$ est $2{,}718$ : il est plus petit que $3$, ce qui se retient bien en notant que $e^{1}$ vaut un peu plus de $2{,}7$.",
      "Il a confondu $e$ avec $\\pi$ : $e \\approx 2{,}718$."
    ),
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_e_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 3,
    theme: "neutral",
    hint: "Multiplie $2{,}718$ par lui-même autant de fois qu'il y a dans l'exposant.",
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "template"],
    generate: () => {
      const valeurs = [
        { n: 1, v: "$2{,}72$", faux: ["$1{,}00$", "$5{,}44$", "$3{,}14$"] },
        { n: 2, v: "$7{,}39$", faux: ["$5{,}44$", "$4{,}72$", "$9{,}87$"] },
        { n: 3, v: "$20{,}09$", faux: ["$8{,}15$", "$14{,}78$", "$31{,}01$"] },
        { n: 4, v: "$54{,}60$", faux: ["$10{,}87$", "$29{,}56$", "$97{,}41$"] },
      ];
      const c = pickOne(valeurs);
      return {
        text: `Parmi ces valeurs, laquelle est la plus proche de $e^{${c.n}}$ ?`,
        format: "qcm",
        choices: [c.v, ...c.faux],
        expected: [c.v],
        comparator: "mcq_exact",
        explanation: exp(
          "$e^{n}$ se calcule en multipliant $e \\approx 2{,}718$ par lui-même $n$ fois.",
          `Ici on cherche $e^{${c.n}}$.`,
          `Les mauvaises réponses correspondent souvent à $${c.n} \\times e$ (une multiplication au lieu d'une puissance) ou à une puissance de $\\pi$.`,
          `$e^{${c.n}} \\approx ${c.v.replace(/\$/g, "")}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_e_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_nombre_e",
    difficulty: 5,
    theme: "neutral",
    hint: "Pars de $2{,}7 < e < 2{,}8$ et élève à la puissance demandée.",
    tags: ["premiere", "maths", "exponentielle", "nombre_e", "open", "template"],
    generate: () => {
      const cas = [
        { n: 2, m: 7, plus: true, mots: ["7,3", "7.3", "7,38", "7.38", "encadre"], val: "7{,}39" },
        { n: 2, m: 8, plus: false, mots: ["7,3", "7.3", "7,38", "7.38", "encadre"], val: "7{,}39" },
        { n: 1, m: 3, plus: false, mots: ["2,718", "2.718", "2,7", "2.7", "encadre"], val: "2{,}72" },
        { n: 3, m: 20, plus: true, mots: ["20,0", "20.0", "20,09", "20.09", "encadre"], val: "20{,}09" },
        { n: 3, m: 21, plus: false, mots: ["20,0", "20.0", "20,09", "20.09", "encadre"], val: "20{,}09" },
      ];
      const c = pickOne(cas);
      return {
        text: `Sans calculatrice, compare $e^{${c.n}}$ et $${c.m}$. Justifie ta réponse.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "Pour comparer sans machine, on encadre $e$ puis on élève l'encadrement à la puissance voulue.",
          `On part de $2{,}7 < e < 2{,}8$ et on passe à la puissance ${c.n}.`,
          `On obtient $e^{${c.n}} \\approx ${c.val}$, ce qui suffit à trancher face à $${c.m}$.`,
          c.plus ? `$e^{${c.n}} > ${c.m}$.` : `$e^{${c.n}} < ${c.m}$.`
        ),
      };
    },
  },

  /* ===================== EXP_PROPRIETES ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi est égal $e^{-x}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e^x}$", "$-e^x$", "$e^x$", "$1 - e^x$"],
    expected: ["$\\dfrac{1}{e^x}$"],
    comparator: "mcq_exact",
    hint: "$e^x \\times e^{-x} = 1$.",
    explanation: exp(
      "On utilise $e^x \\times e^{-x} = e^0 = 1$.",
      "Donc $e^{-x}$ est l'inverse de $e^x$.",
      "$e^{-x} = \\dfrac{1}{e^x}$.",
      "$\\dfrac{1}{e^x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\dfrac{e^{x}}{e^{y}}$ ?",
    format: "qcm",
    choices: ["$e^{x-y}$", "$e^{x+y}$", "$e^{x/y}$", "$e^{xy}$"],
    expected: ["$e^{x-y}$"],
    comparator: "mcq_exact",
    hint: "Quotient → différence des exposants.",
    explanation: exp(
      "Le quotient d'exponentielles se traduit par une différence d'exposants.",
      "$\\dfrac{e^x}{e^y} = e^{x-y}$.",
      "C'est la propriété du quotient.",
      "$e^{x-y}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi est égal $\\left(e^{x}\\right)^{n}$ ?",
    format: "qcm",
    choices: ["$e^{nx}$", "$e^{x^n}$", "$n e^{x}$", "$e^{x+n}$"],
    expected: ["$e^{nx}$"],
    comparator: "mcq_exact",
    hint: "Puissance → produit des exposants.",
    explanation: exp(
      "Élever une exponentielle à une puissance multiplie l'exposant.",
      "$\\left(e^x\\right)^n = e^{nx}$.",
      "C'est la propriété de la puissance.",
      "$e^{nx}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    text: "Comment s'écrit autrement $e^{-3}$ ?",
    format: "qcm",
    choices: ["$\\dfrac{1}{e^{3}}$", "$-e^{3}$", "$-\\dfrac{1}{e^{3}}$", "$e^{3}$"],
    expected: ["$\\dfrac{1}{e^{3}}$"],
    comparator: "mcq_exact",
    hint: "Un exposant négatif donne un inverse, pas un nombre négatif.",
    explanation: exp(
      "Par définition, $e^{-a} = \\dfrac{1}{e^{a}}$.",
      "Ici $e^{-3} = \\dfrac{1}{e^3}$.",
      "L'exponentielle est TOUJOURS strictement positive : $e^{-3}$ est un petit nombre positif ($\\approx 0{,}05$), jamais un nombre négatif.",
      "$e^{-3} = \\dfrac{1}{e^3}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_prop_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 2,
    theme: "neutral",
    hint: "Produit → somme des exposants.",
    tags: ["premiere", "maths", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const b = randomInt(2, 6);
      const correct = `$e^{${a + b}}$`;
      const choices = [correct, `$e^{${a * b}}$`, `$e^{${Math.abs(a - b)}}$`, `$2e^{${a + b}}$`];
      return {
        text: `Simplifie $e^{${a}} \\times e^{${b}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On ajoute les exposants.",
          `$e^{${a}} \\times e^{${b}} = e^{${a} + ${b}}$.`,
          `$= e^{${a + b}}$.`,
          `$e^{${a + b}}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_prop_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Quotient → différence des exposants.",
    tags: ["premiere", "maths", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = randomInt(5, 9);
      const b = randomInt(1, 4);
      const correct = `$e^{${a - b}}$`;
      const choices = [correct, `$e^{${a + b}}$`, `$e^{${a * b}}$`, `$e^{${a}/${b}}$`];
      return {
        text: `Simplifie $\\dfrac{e^{${a}}}{e^{${b}}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On soustrait les exposants.",
          `$\\dfrac{e^{${a}}}{e^{${b}}} = e^{${a} - ${b}}$.`,
          `$= e^{${a - b}}$.`,
          `$e^{${a - b}}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_exp_prop_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi $e^{-x}$ est l'INVERSE de $e^{x}$, et non son opposé.",
    format: "open",
    expected: ["inverse", "produit vaut 1", "produit egal a 1", "1 sur", "toujours positif"],
    comparator: "contains_keyword",
    hint: "Calcule le produit $e^{x} \\times e^{-x}$.",
    explanation: exp(
      "Deux nombres sont inverses quand leur produit vaut $1$ ; ils sont opposés quand leur somme vaut $0$.",
      "La relation fonctionnelle donne $e^{x} \\times e^{-x} = e^{x-x} = e^{0} = 1$ : c'est bien un produit égal à $1$.",
      "L'opposé est exclu pour une autre raison : $e^{x}$ et $e^{-x}$ sont tous les deux strictement positifs, leur somme ne peut donc pas être nulle. Par exemple $e^{2} \\approx 7{,}39$ et $e^{-2} \\approx 0{,}135$.",
      "$e^{-x} = \\dfrac{1}{e^{x}}$ : c'est l'inverse, jamais l'opposé."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_prop_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève écrit $\\dfrac{e^{5}}{e^{3}} = e^{5/3}$. Explique son erreur et donne le bon résultat.",
    format: "open",
    expected: ["difference", "différence", "soustrait", "e^2", "5 - 3"],
    comparator: "contains_keyword",
    hint: "Que devient un quotient d'exponentielles : une division d'exposants, ou une soustraction ?",
    explanation: exp(
      "Les exponentielles suivent les règles des puissances : un quotient devient une DIFFÉRENCE d'exposants.",
      "$\\dfrac{e^{5}}{e^{3}} = e^{5-3}$.",
      "L'élève a divisé les exposants au lieu de les soustraire. L'écart est net : $e^{2} \\approx 7{,}39$, alors que $e^{5/3} \\approx 5{,}29$.",
      "Le bon résultat est $e^{2}$ : on soustrait les exposants, on ne les divise pas."
    ),
    tags: ["premiere", "maths", "exponentielle", "proprietes", "open"],
  },

  {
    kind: "template",
    id: "premiere_exp_prop_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_proprietes",
    difficulty: 3,
    theme: "neutral",
    hint: "Produit → on ajoute les exposants ; quotient → on soustrait ; puissance → on multiplie.",
    tags: ["premiere", "maths", "exponentielle", "proprietes", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      const b = randomInt(2, 6);
      const op = pickOne(["produit", "quotient", "puissance"] as const);
      const res = op === "produit" ? a + b : op === "quotient" ? a - b : a * b;
      const enonce =
        op === "produit"
          ? `e^{${a}} \\times e^{${b}}`
          : op === "quotient"
            ? `\\dfrac{e^{${a + b}}}{e^{${b}}}`
            : `\\left(e^{${a}}\\right)^{${b}}`;
      const juste = op === "quotient" ? a : res;
      const correct = `$e^{${juste}}$`;
      return {
        text: `À quoi est égal $${enonce}$ ?`,
        format: "qcm",
        choices: [
          correct,
          `$e^{${a * b}}$`,
          `$e^{${a + b}}$`,
          `$${juste}e$`,
        ].filter((v, i, t) => t.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Les exponentielles suivent les règles des puissances : produit → somme des exposants, quotient → différence, puissance de puissance → produit.",
          `Ici l'expression est ${op === "produit" ? "un produit" : op === "quotient" ? "un quotient" : "une puissance de puissance"}.`,
          op === "produit"
            ? `On ajoute : $${a} + ${b} = ${res}$.`
            : op === "quotient"
              ? `On soustrait : $${a + b} - ${b} = ${a}$.`
              : `On multiplie : $${a} \\times ${b} = ${res}$.`,
          `${correct}.`
        ),
      };
    },
  },

  /* ===================== EXP_SIMPLIFIER ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 2,
    theme: "neutral",
    text: "Simplifie $e^x \\times e^{-x}$.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Somme des exposants : $x + (-x)$.",
    explanation: exp(
      "On ajoute les exposants.",
      "$e^x \\times e^{-x} = e^{x - x} = e^0$.",
      "$= 1$.",
      "$e^x \\times e^{-x} = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 4,
    theme: "neutral",
    text: "Simplifie $\\dfrac{1}{e^{-2x}}$.",
    format: "qcm",
    choices: ["$e^{2x}$", "$e^{-2x}$", "$-e^{2x}$", "$\\dfrac{1}{e^{2x}}$"],
    expected: ["$e^{2x}$"],
    comparator: "mcq_exact",
    hint: "$\\dfrac{1}{e^{a}} = e^{-a}$.",
    explanation: exp(
      "L'inverse d'une exponentielle change le signe de l'exposant.",
      "$\\dfrac{1}{e^{-2x}} = e^{-(-2x)}$.",
      "$= e^{2x}$.",
      "$e^{2x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_simp_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 5,
    theme: "neutral",
    text: "Simplifie $\\dfrac{e^{2x} + e^{3x}}{e^{x}}$.",
    format: "qcm",
    choices: [
      "$e^{x} + e^{2x}$",
      "$e^{4x}$",
      "$e^{5x}$",
      "$e^{x} + e^{3x}$",
    ],
    expected: ["$e^{x} + e^{2x}$"],
    comparator: "mcq_exact",
    hint: "Le dénominateur se distribue sur CHAQUE terme du numérateur.",
    explanation: exp(
      "Quand le numérateur est une somme, on divise chaque terme séparément : $\\dfrac{a + b}{c} = \\dfrac{a}{c} + \\dfrac{b}{c}$.",
      "$\\dfrac{e^{2x}}{e^{x}} + \\dfrac{e^{3x}}{e^{x}} = e^{2x - x} + e^{3x - x}$.",
      "$= e^{x} + e^{2x}$. On ne peut pas additionner les exposants du numérateur : ce n'est pas un produit.",
      "$\\dfrac{e^{2x} + e^{3x}}{e^{x}} = e^{x} + e^{2x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_simp_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne et soustrais les exposants.",
    tags: ["premiere", "maths", "exponentielle", "simplifier", "template"],
    generate: () => {
      const a = randomInt(2, 5);
      const b = randomInt(2, 5);
      const c = randomInt(1, 3);
      const k = a + b - c;
      const correct = `$e^{${k}x}$`;
      const choices = [correct, `$e^{${a + b + c}x}$`, `$e^{${a + b}x}$`, `$e^{${k}x^2}$`];
      return {
        text: `Simplifie $\\dfrac{e^{${a}x} \\times e^{${b}x}}{e^{${c}x}}$.`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Produit → somme, quotient → différence des exposants.",
          `$e^{${a}x + ${b}x - ${c}x}$.`,
          `$= e^{${k}x}$.`,
          `$e^{${k}x}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_simp_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 2,
    theme: "neutral",
    hint: "Exposants opposés → $e^0 = 1$.",
    tags: ["premiere", "maths", "exponentielle", "simplifier", "template"],
    generate: () => {
      const a = randomInt(2, 7);
      return {
        text: `Simplifie $e^{${a}x} \\times e^{-${a}x}$.`,
        format: "short",
        expected: ["1"],
        comparator: "number_equal",
        explanation: exp(
          "On ajoute les exposants.",
          `$e^{${a}x - ${a}x} = e^0$.`,
          "$= 1$.",
          "Le résultat est $1$."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "premiere_exp_simp_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 4,
    theme: "neutral",
    hint: "Commence par la puissance de puissance, puis regroupe le produit.",
    tags: ["premiere", "maths", "exponentielle", "simplifier", "template"],
    generate: () => {
      const n = randomInt(2, 4);
      const a = randomInt(1, 3);
      const b = pickOne([-3, -2, -1, 1, 2]);
      const total = n * a + b;
      const ecrire = (k: number) => (k === 0 ? "1" : k === 1 ? "e^{x}" : `e^{${k}x}`);
      const correct = `$${ecrire(total)}$`;
      const faux = [`$${ecrire(a + b)}$`, `$${ecrire(n * a)}$`, `$${ecrire(total + 1)}$`].filter(
        (v) => v !== correct,
      );
      return {
        text: `Simplifie $\\left(e^{${a === 1 ? "x" : a + "x"}}\\right)^{${n}} \\times e^{${b === 1 ? "x" : b === -1 ? "-x" : b + "x"}}$.`,
        format: "qcm",
        choices: [correct, ...faux].filter((v, i, t) => t.indexOf(v) === i),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux règles se combinent : une puissance de puissance multiplie les exposants, un produit les additionne.",
          `On traite d'abord la parenthèse : $\\left(e^{${a === 1 ? "x" : a + "x"}}\\right)^{${n}} = e^{${n * a}x}$.`,
          `On regroupe ensuite le produit : $${n * a}x ${b >= 0 ? "+ " + b : "- " + -b}x = ${total}x$.`,
          `${correct}${total === 0 ? " — les exposants se compensent exactement." : "."}`
        ),
      };
    },
  },

  /* ===================== EXP_SIGNE ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le signe de $e^x$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: ["toujours strictement positif", "toujours négatif", "positif puis négatif", "nul en $0$"],
    expected: ["toujours strictement positif"],
    comparator: "mcq_exact",
    hint: "La courbe est au-dessus de l'axe des abscisses.",
    explanation: exp(
      "L'exponentielle ne s'annule jamais et reste au-dessus de l'axe des $x$.",
      "Pour tout réel $x$, $e^x > 0$.",
      "Elle est donc strictement positive sur $\\mathbb{R}$.",
      "Toujours strictement positif."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "signe", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de solutions a l'équation $e^{x} = 0$ ?",
    format: "short",
    expected: ["0"],
    comparator: "number_equal",
    hint: "L'exponentielle prend-elle un jour la valeur zéro ?",
    explanation: exp(
      "La fonction exponentielle est strictement positive sur $\\mathbb{R}$ : $e^x > 0$ pour tout $x$.",
      "Elle ne peut donc jamais valoir $0$.",
      "Sa courbe s'approche de l'axe des abscisses quand $x$ diminue, mais ne le touche jamais.",
      "L'équation n'a aucune solution : $0$ solution."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 3,
    theme: "neutral",
    text: "L'équation $e^{x} = -3$ admet :",
    format: "qcm",
    choices: ["aucune solution", "une seule solution", "deux solutions", "une infinité de solutions"],
    expected: ["aucune solution"],
    comparator: "mcq_exact",
    hint: "Une exponentielle peut-elle être négative ?",
    explanation: exp(
      "L'exponentielle est strictement positive : toutes ses valeurs sont dans $]0 ; +\\infty[$.",
      "Or $-3$ est négatif : ce n'est pas une valeur atteinte par $e^{x}$.",
      "Graphiquement, la droite d'équation $y = -3$ passe sous l'axe des abscisses, et la courbe reste au-dessus : elles ne se croisent jamais.",
      "L'équation n'a aucune solution."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Quel est le signe de $-e^{x}$ sur $\\mathbb{R}$ ?",
    format: "qcm",
    choices: [
      "strictement négatif",
      "strictement positif",
      "négatif puis positif",
      "nul en $0$",
    ],
    expected: ["strictement négatif"],
    comparator: "mcq_exact",
    hint: "L'opposé d'un nombre strictement positif est…",
    explanation: exp(
      "Le signe d'un opposé est l'inverse du signe de départ.",
      "$e^{x} > 0$ pour tout réel $x$.",
      "Donc $-e^{x} < 0$ pour tout réel $x$ : le signe moins est devant l'exponentielle, il ne rentre pas dans l'exposant.",
      "$-e^{x}$ est strictement négatif sur $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 4,
    theme: "neutral",
    text: "Pour étudier le signe de $(x - 2)e^{x}$, il suffit d'étudier le signe de :",
    format: "qcm",
    choices: ["$x - 2$", "$e^{x}$", "$x$", "$x + 2$"],
    expected: ["$x - 2$"],
    comparator: "mcq_exact",
    hint: "Un des deux facteurs a un signe connu d'avance.",
    explanation: exp(
      "Le signe d'un produit se déduit du signe de chaque facteur.",
      "Ici l'un des facteurs, $e^{x}$, est strictement positif quel que soit $x$ : il ne change jamais le signe du produit.",
      "Tout se joue donc sur $x - 2$ : le produit est négatif pour $x < 2$, nul en $2$, positif pour $x > 2$.",
      "Il suffit d'étudier le signe de $x - 2$."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est l'ensemble des solutions de l'inéquation $e^{x} > 0$ ?",
    format: "qcm",
    choices: ["$\\mathbb{R}$", "$]0 ; +\\infty[$", "$[0 ; +\\infty[$", "l'ensemble vide"],
    expected: ["$\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Pour quels $x$ l'inégalité est-elle vraie ?",
    explanation: exp(
      "Résoudre une inéquation, c'est chercher les valeurs de $x$ qui la rendent vraie.",
      "Or $e^{x} > 0$ est vraie pour TOUT réel $x$ : c'est une propriété de la fonction.",
      "Le piège est de répondre $]0 ; +\\infty[$ : c'est l'ensemble des VALEURS prises par $e^x$, pas l'ensemble des $x$ solutions.",
      "L'ensemble des solutions est $\\mathbb{R}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 3,
    theme: "neutral",
    text: "Le nombre $e^{-5}$ est-il négatif ?",
    format: "qcm",
    choices: [
      "non : il est strictement positif, mais très proche de $0$",
      "oui, car l'exposant est négatif",
      "non : il vaut exactement $0$",
      "oui, il vaut environ $-148$",
    ],
    expected: ["non : il est strictement positif, mais très proche de $0$"],
    comparator: "mcq_exact",
    hint: "Un exposant négatif donne un inverse, pas un opposé.",
    explanation: exp(
      "Un exposant négatif signifie « inverse » : $e^{-5} = \\dfrac{1}{e^{5}}$.",
      "$e^{5} \\approx 148$, donc $e^{-5} \\approx \\dfrac{1}{148} \\approx 0{,}0067$.",
      "C'est un nombre petit, mais strictement positif — comme toutes les valeurs de l'exponentielle.",
      "Non : $e^{-5} > 0$."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi l'équation $e^{x} = 0$ n'a aucune solution.",
    format: "open",
    expected: ["strictement positive", "ne s'annule", "jamais nulle", "produit vaut 1", "au-dessus de l'axe"],
    comparator: "contains_keyword",
    hint: "Que vaut le produit $e^{x} \\times e^{-x}$ ?",
    explanation: exp(
      "Résoudre $e^{x} = 0$, c'est chercher un réel dont l'image par l'exponentielle est nulle.",
      "On sait que $e^{x} \\times e^{-x} = e^{0} = 1$ pour tout réel $x$.",
      "Si $e^{x}$ valait $0$, le produit vaudrait $0$ et non $1$ : c'est impossible. L'exponentielle ne s'annule donc jamais, et sa courbe reste strictement au-dessus de l'axe des abscisses.",
      "L'équation n'a aucune solution, car $e^{x} > 0$ pour tout réel $x$."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sig_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi le signe de $(3x - 6)e^{x}$ ne dépend que de celui de $3x - 6$.",
    format: "open",
    expected: ["strictement positif", "ne change pas le signe", "facteur positif", "toujours positif"],
    comparator: "contains_keyword",
    hint: "Quel est le signe du facteur $e^{x}$ ?",
    explanation: exp(
      "Dans un produit, un facteur strictement positif ne change pas le signe du résultat.",
      "$e^{x} > 0$ pour tout réel $x$ : ce facteur ne s'annule jamais et ne change jamais de signe.",
      "Le signe du produit est donc celui de $3x - 6$ : négatif pour $x < 2$, nul en $x = 2$, positif pour $x > 2$.",
      "Multiplier par $e^{x}$ ne modifie pas le signe : tout se lit sur $3x - 6$."
    ),
    tags: ["premiere", "maths", "exponentielle", "signe", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_sig_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 4,
    theme: "neutral",
    hint: "Le facteur $e^{x}$ est toujours strictement positif : tout se joue sur l'autre facteur.",
    tags: ["premiere", "maths", "exponentielle", "signe", "template"],
    generate: () => {
      const k = randomInt(1, 8);
      const sens = pickOne([">", "<"] as const);
      const correct =
        sens === ">" ? `$]${k} ; +\\infty[$` : `$]-\\infty ; ${k}[$`;
      const autre = sens === ">" ? `$]-\\infty ; ${k}[$` : `$]${k} ; +\\infty[$`;
      return {
        text: `Quel est l'ensemble des solutions de l'inéquation $(x - ${k})e^{x} ${sens} 0$ ?`,
        format: "qcm",
        choices: [correct, autre, "$\\mathbb{R}$", "l'ensemble vide"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe d'un produit se lit facteur par facteur.",
          `Le facteur $e^{x}$ est strictement positif pour tout $x$ : il ne change rien au signe. Il reste à résoudre $x - ${k} ${sens} 0$.`,
          `C'est-à-dire $x ${sens} ${k}$.`,
          `L'ensemble des solutions est ${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_sig_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_signe",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare le second membre à $0$ : les valeurs de l'exponentielle sont toutes strictement positives.",
    tags: ["premiere", "maths", "exponentielle", "signe", "open", "template"],
    generate: () => {
      const cas = [
        { v: "-2", solution: false, mots: ["strictement positive", "negatif", "négatif", "jamais"] },
        { v: "-0{,}5", solution: false, mots: ["strictement positive", "negatif", "négatif", "jamais"] },
        { v: "0", solution: false, mots: ["ne s'annule", "jamais nulle", "strictement positive"] },
        { v: "4", solution: true, mots: ["positif", "coupe", "croissante", "graphique"] },
        { v: "0{,}5", solution: true, mots: ["positif", "coupe", "croissante", "graphique"] },
      ];
      const c = pickOne(cas);
      return {
        text: `L'équation $e^{x} = ${c.v}$ a-t-elle des solutions ? Justifie ta réponse.`,
        format: "open",
        expected: c.mots,
        comparator: "contains_keyword",
        explanation: exp(
          "L'exponentielle ne prend que des valeurs strictement positives : une équation $e^{x} = v$ ne peut avoir de solution que si $v > 0$.",
          `On compare donc $${c.v}$ à $0$.`,
          c.solution
            ? `$${c.v}$ est strictement positif : la droite d'équation $y = ${c.v}$ coupe bien la courbe de l'exponentielle, qui est croissante et prend toutes les valeurs strictement positives.`
            : `$${c.v}$ n'est pas strictement positif : la droite d'équation $y = ${c.v}$ ne rencontre jamais la courbe, qui reste au-dessus de l'axe des abscisses.`,
          c.solution ? "Oui, l'équation a une solution." : "Non, l'équation n'a aucune solution."
        ),
      };
    },
  },

  /* ===================== EXP_DERIVEE ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^x$ ?",
    format: "qcm",
    choices: ["$f'(x) = e^x$", "$f'(x) = x e^{x-1}$", "$f'(x) = e^{x-1}$", "$f'(x) = 1$"],
    expected: ["$f'(x) = e^x$"],
    comparator: "mcq_exact",
    hint: "L'exponentielle est sa propre dérivée.",
    explanation: exp(
      "La fonction exponentielle est définie comme égale à sa dérivée.",
      "$(e^x)' = e^x$.",
      "Avec $e^0 = 1$.",
      "$f'(x) = e^x$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "La fonction $x \\mapsto e^x$ est :",
    format: "qcm",
    choices: ["strictement croissante sur $\\mathbb{R}$", "décroissante", "constante", "croissante puis décroissante"],
    expected: ["strictement croissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Sa dérivée $e^x$ est positive.",
    explanation: exp(
      "Le sens de variation se déduit du signe de la dérivée.",
      "$(e^x)' = e^x > 0$ sur $\\mathbb{R}$.",
      "Une dérivée strictement positive donne une fonction strictement croissante.",
      "Strictement croissante sur $\\mathbb{R}$."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "derivee", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = 5e^{x}$ ?",
    format: "qcm",
    choices: ["$f'(x) = 5e^{x}$", "$f'(x) = e^{x}$", "$f'(x) = 5x e^{x}$", "$f'(x) = 5$"],
    expected: ["$f'(x) = 5e^{x}$"],
    comparator: "mcq_exact",
    hint: "Un coefficient constant reste en facteur : $(ku)' = k u'$.",
    explanation: exp(
      "Multiplier une fonction par un nombre multiplie sa dérivée par ce même nombre.",
      "$(e^x)' = e^x$, donc $f'(x) = 5 \\times e^x$.",
      "$= 5e^x$ : la fonction est égale à sa propre dérivée, au coefficient près.",
      "$f'(x) = 5e^{x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 5,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = x e^{x}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = (1 + x)e^{x}$",
      "$f'(x) = e^{x}$",
      "$f'(x) = x e^{x}$",
      "$f'(x) = (1 - x)e^{x}$",
    ],
    expected: ["$f'(x) = (1 + x)e^{x}$"],
    comparator: "mcq_exact",
    hint: "C'est un produit : $(uv)' = u'v + uv'$ avec $u = x$ et $v = e^x$.",
    explanation: exp(
      "On applique la formule du produit $(uv)' = u'v + uv'$.",
      "Avec $u = x$ ($u' = 1$) et $v = e^x$ ($v' = e^x$) : $f'(x) = 1 \\times e^x + x \\times e^x$.",
      "$= e^x + x e^x = (1 + x)e^x$ en factorisant par $e^x$.",
      "$f'(x) = (1 + x)e^{x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_der_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "$(k e^x)' = k e^x$.",
    tags: ["premiere", "maths", "exponentielle", "derivee", "template"],
    generate: () => {
      const k = randomInt(2, 8);
      const correct = `$f'(x) = ${k}e^{x}$`;
      const choices = [correct, `$f'(x) = e^{x}$`, `$f'(x) = ${k}x e^{x}$`, `$f'(x) = ${k}$`];
      return {
        text: `Quelle est la dérivée de $f(x) = ${k}e^{x}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On garde le coefficient et $e^x$ reste sa propre dérivée.",
          `$(${k}e^x)' = ${k}e^x$.`,
          "Le coefficient ne change pas.",
          `${correct}.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_12",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{x} + x^{2}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = e^{x} + 2x$",
      "$f'(x) = e^{x} + x^{2}$",
      "$f'(x) = e^{x} \\times 2x$",
      "$f'(x) = 2x$",
    ],
    expected: ["$f'(x) = e^{x} + 2x$"],
    comparator: "mcq_exact",
    hint: "La dérivée d'une somme est la somme des dérivées.",
    explanation: exp(
      "Pour dériver une somme, on dérive chaque terme séparément.",
      "$(e^{x})' = e^{x}$ et $(x^{2})' = 2x$.",
      "On additionne : $f'(x) = e^{x} + 2x$. L'exponentielle ne « disparaît » pas en dérivant, contrairement à une constante.",
      "$f'(x) = e^{x} + 2x$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_13",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dérive $e^{x}$ et écrit $x e^{x-1}$. Quelle règle a-t-il appliquée à tort ?",
    format: "qcm",
    choices: [
      "la dérivée de $x^{n}$, qui vaut $n x^{n-1}$ — mais ici la variable est en EXPOSANT",
      "la dérivée d'un produit",
      "la dérivée d'un quotient",
      "aucune : sa réponse est correcte",
    ],
    expected: ["la dérivée de $x^{n}$, qui vaut $n x^{n-1}$ — mais ici la variable est en EXPOSANT"],
    comparator: "mcq_exact",
    hint: "Dans $x^{n}$, qu'est-ce qui est fixé et qu'est-ce qui varie ? Et dans $e^{x}$ ?",
    explanation: exp(
      "La formule $(x^{n})' = n x^{n-1}$ s'applique quand la BASE varie et que l'exposant est un nombre fixe.",
      "Dans $e^{x}$, c'est l'inverse : la base $e$ est fixe, et c'est l'EXPOSANT qui varie. La formule des puissances ne s'applique donc pas.",
      "L'exponentielle a sa propre règle, qui vient de sa définition : $(e^{x})' = e^{x}$.",
      "Il a confondu $x^{n}$ (variable en bas) et $e^{x}$ (variable en haut)."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 5,
    theme: "neutral",
    text: "Que signifie, sur la courbe, le fait que l'exponentielle soit égale à sa propre dérivée ?",
    format: "open",
    expected: ["coefficient directeur", "tangente", "ordonnee", "ordonnée", "hauteur", "nombre derive", "nombre dérivé"],
    comparator: "contains_keyword",
    hint: "Que représente $f'(a)$ pour la tangente au point d'abscisse $a$ ?",
    explanation: exp(
      "Le nombre dérivé $f'(a)$ est le coefficient directeur de la tangente à la courbe au point d'abscisse $a$.",
      "Comme $f' = f$, on a $f'(a) = f(a)$ pour tout réel $a$.",
      "Autrement dit, en chaque point la pente de la tangente est égale à la hauteur du point : à hauteur $1$ la pente vaut $1$, à hauteur $10$ la pente vaut $10$. C'est pour cela que la courbe s'emballe.",
      "Plus la courbe est haute, plus elle monte vite : sa pente est toujours égale à son ordonnée."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "derivee", "canvas", "open"],
  },

  {
    kind: "template",
    id: "premiere_exp_der_tpl_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee",
    difficulty: 5,
    theme: "neutral",
    hint: "Dérive, puis rappelle que $e^{x}$ est strictement positif : le signe ne dépend que du coefficient.",
    tags: ["premiere", "maths", "exponentielle", "derivee", "open", "template"],
    generate: () => {
      const k = pickOne([3, 5, 7, -2, -4, -6]);
      const croissante = k > 0;
      return {
        text: `La fonction $f(x) = ${k}e^{x}$ est-elle croissante ou décroissante sur $\\mathbb{R}$ ? Justifie en étudiant le signe de sa dérivée.`,
        format: "open",
        expected: croissante
          ? ["croissante", "positive", "positif"]
          : ["decroissante", "décroissante", "negative", "négative", "negatif", "négatif"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le sens de variation d'une fonction dérivable se lit sur le signe de sa dérivée.",
          `Un coefficient constant reste en facteur : $f'(x) = ${k}e^{x}$.`,
          `Or $e^{x} > 0$ pour tout réel $x$ : le signe de $f'$ est donc celui de $${k}$, qui est ${croissante ? "positif" : "négatif"}.`,
          croissante
            ? `$f'(x) > 0$ sur $\\mathbb{R}$ : la fonction est croissante.`
            : `$f'(x) < 0$ sur $\\mathbb{R}$ : la fonction est décroissante.`
        ),
      };
    },
  },

  /* ===================== EXP_DERIVEE_AFFINE ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{3x}$ ?",
    format: "qcm",
    choices: ["$f'(x) = 3e^{3x}$", "$f'(x) = e^{3x}$", "$f'(x) = 3x e^{3x}$", "$f'(x) = e^{3}$"],
    expected: ["$f'(x) = 3e^{3x}$"],
    comparator: "mcq_exact",
    hint: "Dérivée de $e^{ax+b}$ : $a e^{ax+b}$.",
    explanation: exp(
      "La dérivée de $x \\mapsto e^{ax+b}$ est $a\\,e^{ax+b}$.",
      "Ici $a = 3$.",
      "$f'(x) = 3e^{3x}$.",
      "$f'(x) = 3e^{3x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{-x}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = -e^{-x}$",
      "$f'(x) = e^{-x}$",
      "$f'(x) = -e^{x}$",
      "$f'(x) = -x e^{-x}$",
    ],
    expected: ["$f'(x) = -e^{-x}$"],
    comparator: "mcq_exact",
    hint: "Dérivée de $e^{ax}$ : $a e^{ax}$, avec ici $a = -1$.",
    explanation: exp(
      "La dérivée de $x \\mapsto e^{ax+b}$ est $a\\,e^{ax+b}$.",
      "Ici $a = -1$, donc $f'(x) = -1 \\times e^{-x}$.",
      "$= -e^{-x}$. Comme $e^{-x} > 0$, cette dérivée est toujours négative.",
      "$f'(x) = -e^{-x}$ : la fonction est décroissante."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{2x+1}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = 2e^{2x+1}$",
      "$f'(x) = e^{2x+1}$",
      "$f'(x) = (2x+1)e^{2x+1}$",
      "$f'(x) = 2e^{2x}$",
    ],
    expected: ["$f'(x) = 2e^{2x+1}$"],
    comparator: "mcq_exact",
    hint: "Le facteur qui sort est le coefficient de $x$ dans l'exposant.",
    explanation: exp(
      "La dérivée de $x \\mapsto e^{ax+b}$ est $a\\,e^{ax+b}$ : l'exposant ne change pas.",
      "Ici $a = 2$ et $b = 1$.",
      "$f'(x) = 2e^{2x+1}$. Le $+1$ reste dans l'exposant : il ne disparaît pas comme le ferait une constante additive.",
      "$f'(x) = 2e^{2x+1}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_aff_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle est la dérivée de $f(x) = e^{x+3}$ ?",
    format: "qcm",
    choices: [
      "$f'(x) = e^{x+3}$",
      "$f'(x) = 3e^{x+3}$",
      "$f'(x) = (x+3)e^{x+3}$",
      "$f'(x) = e^{3}$",
    ],
    expected: ["$f'(x) = e^{x+3}$"],
    comparator: "mcq_exact",
    hint: "Quel est le coefficient de $x$ dans l'exposant ?",
    explanation: exp(
      "La dérivée de $x \\mapsto e^{ax+b}$ est $a\\,e^{ax+b}$ : c'est le coefficient de $x$ qui sort, pas la constante.",
      "Ici l'exposant est $x + 3$ : le coefficient de $x$ vaut $1$, et $b = 3$.",
      "Donc $f'(x) = 1 \\times e^{x+3} = e^{x+3}$ : la fonction est encore égale à sa dérivée.",
      "$f'(x) = e^{x+3}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_aff_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dérive $f(x) = e^{5x}$ et trouve $f'(x) = 5x\\,e^{5x}$. Quelle est la bonne réponse ?",
    format: "qcm",
    choices: [
      "$f'(x) = 5e^{5x}$",
      "$f'(x) = 5x\\,e^{5x}$",
      "$f'(x) = e^{5x}$",
      "$f'(x) = 5e^{5x-1}$",
    ],
    expected: ["$f'(x) = 5e^{5x}$"],
    comparator: "mcq_exact",
    hint: "C'est le COEFFICIENT $5$ qui sort, pas l'exposant $5x$ tout entier.",
    explanation: exp(
      "Dans $e^{ax}$, le facteur qui apparaît en dérivant est le nombre $a$, pas l'expression $ax$.",
      "Ici $a = 5$, donc $f'(x) = 5e^{5x}$.",
      "L'élève a recopié l'exposant entier devant l'exponentielle : il obtient $5x$ au lieu de $5$. Un test rapide en $x = 0$ départage : la vraie dérivée vaut $5$, la sienne vaudrait $0$.",
      "$f'(x) = 5e^{5x}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_aff_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 5,
    theme: "reunion",
    text: "Un cari sorti du feu refroidit à Saint-Joseph : sa température suit $T(t) = 25 + 60e^{-0{,}05t}$, avec $t$ en minutes. Quelle est $T'(t)$ ?",
    format: "qcm",
    choices: [
      "$T'(t) = -3e^{-0{,}05t}$",
      "$T'(t) = 25 - 3e^{-0{,}05t}$",
      "$T'(t) = -60e^{-0{,}05t}$",
      "$T'(t) = 3e^{-0{,}05t}$",
    ],
    expected: ["$T'(t) = -3e^{-0{,}05t}$"],
    comparator: "mcq_exact",
    hint: "La constante $25$ disparaît en dérivant ; le facteur $60$ reste et se multiplie par $-0{,}05$.",
    explanation: exp(
      "On dérive terme à terme : la dérivée d'une constante est nulle, et $(k e^{at})' = ka\\,e^{at}$.",
      "La constante $25$ (la température de la pièce) disparaît. Pour le second terme, $k = 60$ et $a = -0{,}05$.",
      "$60 \\times (-0{,}05) = -3$, donc $T'(t) = -3e^{-0{,}05t}$. Cette dérivée est toujours négative : le cari refroidit sans jamais se réchauffer.",
      "$T'(t) = -3e^{-0{,}05t}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_aff_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "La dérivée de $t \\mapsto e^{kt}$ est $k e^{kt}$ : elle est donc proportionnelle à la fonction elle-même. Explique ce que cela signifie pour une population qui suit ce modèle.",
    format: "open",
    expected: ["proportionnelle", "vitesse", "plus il y a", "d'autant plus", "taux"],
    comparator: "contains_keyword",
    hint: "La dérivée mesure la vitesse de croissance. À quoi est-elle proportionnelle ici ?",
    explanation: exp(
      "La dérivée mesure la vitesse à laquelle une grandeur change.",
      "Ici $f'(t) = k f(t)$ : la vitesse de croissance est proportionnelle à l'effectif présent, avec le coefficient $k$.",
      "Concrètement : plus la population est nombreuse, plus elle augmente vite — deux fois plus d'individus, deux fois plus de naissances par jour. C'est ce qui distingue une croissance exponentielle d'une croissance linéaire, où l'on ajoute toujours le même nombre.",
      "La vitesse de croissance est proportionnelle à la population : le taux $k$ est constant, pas l'augmentation."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_aff_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève dérive $f(t) = e^{-0{,}2t}$ et trouve $f'(t) = e^{-0{,}2t}$. Explique son erreur.",
    format: "open",
    expected: ["-0,2", "-0.2", "coefficient", "oublie", "facteur"],
    comparator: "contains_keyword",
    hint: "Compare avec la règle $(e^{at})' = a\\,e^{at}$.",
    explanation: exp(
      "Seule la fonction $t \\mapsto e^{t}$ est égale à sa propre dérivée ; dès que l'exposant est $at$, un facteur apparaît.",
      "La règle est $(e^{at})' = a\\,e^{at}$. Ici $a = -0{,}2$.",
      "L'élève a oublié ce facteur : la bonne réponse est $f'(t) = -0{,}2\\,e^{-0{,}2t}$. Son erreur a une conséquence visible : avec sa réponse, la dérivée serait positive, donc la fonction croissante — alors qu'elle décroît.",
      "Il a oublié le coefficient $-0{,}2$ : $f'(t) = -0{,}2\\,e^{-0{,}2t}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_der_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 4,
    theme: "neutral",
    hint: "$(e^{ax})' = a e^{ax}$.",
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "template"],
    generate: () => {
      const a = randomInt(2, 6);
      const correct = `$f'(x) = ${a}e^{${a}x}$`;
      const choices = [correct, `$f'(x) = e^{${a}x}$`, `$f'(x) = ${a}x e^{${a}x}$`, `$f'(x) = ${a}e^{x}$`];
      return {
        text: `Quelle est la dérivée de $f(x) = e^{${a}x}$ ?`,
        format: "qcm",
        choices,
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On utilise $(e^{ax})' = a e^{ax}$.",
          `Ici $a = ${a}$.`,
          `$f'(x) = ${a}e^{${a}x}$.`,
          `${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_aff_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_derivee_affine",
    difficulty: 5,
    theme: "neutral",
    hint: "Sors le coefficient de $t$, puis regarde son signe : $e^{kt}$ est toujours positif.",
    tags: ["premiere", "maths", "exponentielle", "derivee_affine", "open", "template"],
    generate: () => {
      const cas = [
        { k: "0{,}4", croissante: true },
        { k: "-0{,}4", croissante: false },
        { k: "2", croissante: true },
        { k: "-0{,}05", croissante: false },
        { k: "0{,}1", croissante: true },
        { k: "-3", croissante: false },
      ];
      const c = pickOne(cas);
      return {
        text: `Dérive la fonction $f(t) = e^{${c.k}t}$, puis dis si elle est croissante ou décroissante. Justifie.`,
        format: "open",
        expected: c.croissante
          ? ["croissante", "positif", "positive"]
          : ["decroissante", "décroissante", "negatif", "négatif"],
        comparator: "contains_keyword",
        explanation: exp(
          "Le sens de variation se lit sur le signe de la dérivée, et $(e^{kt})' = k\\,e^{kt}$.",
          `Ici $k = ${c.k}$, donc $f'(t) = ${c.k}\\,e^{${c.k}t}$.`,
          `Le facteur $e^{${c.k}t}$ est strictement positif quel que soit $t$ : le signe de $f'$ est donc celui de $${c.k}$, qui est ${c.croissante ? "positif" : "négatif"}.`,
          c.croissante
            ? `$f'(t) > 0$ : la fonction est croissante sur $\\mathbb{R}$.`
            : `$f'(t) < 0$ : la fonction est décroissante sur $\\mathbb{R}$.`
        ),
      };
    },
  },

  /* ===================== EXP_COURBE ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 4,
    theme: "neutral",
    text: "La fonction $x \\mapsto e^{-x}$ est :",
    format: "qcm",
    choices: [
      "décroissante sur $\\mathbb{R}$",
      "croissante sur $\\mathbb{R}$",
      "constante",
      "décroissante puis croissante",
    ],
    expected: ["décroissante sur $\\mathbb{R}$"],
    comparator: "mcq_exact",
    hint: "Sa dérivée est $-e^{-x}$ : quel est son signe ?",
    explanation: exp(
      "Le sens de variation se lit sur le signe de la dérivée.",
      "La dérivée vaut $-e^{-x}$, et une exponentielle est toujours strictement positive.",
      "Donc $-e^{-x} < 0$ pour tout $x$ : la dérivée est négative partout.",
      "La fonction est décroissante sur $\\mathbb{R}$."
    ),
    canvas: courbeExpEtInverse,
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_der_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 3,
    theme: "neutral",
    text: "En quel point la courbe de $x \\mapsto e^{x}$ coupe-t-elle l'axe des ordonnées ?",
    format: "qcm",
    choices: ["$(0 ; 1)$", "$(1 ; 0)$", "$(0 ; 0)$", "$(1 ; e)$"],
    expected: ["$(0 ; 1)$"],
    comparator: "mcq_exact",
    hint: "L'axe des ordonnées correspond à $x = 0$ : calcule $e^0$.",
    explanation: exp(
      "La courbe coupe l'axe des ordonnées au point d'abscisse $x = 0$.",
      "$e^0 = 1$, donc le point a pour coordonnées $(0 ; 1)$.",
      "La courbe ne coupe jamais l'axe des abscisses, puisque $e^x$ ne s'annule pas.",
      "Elle coupe l'axe des ordonnées en $(0 ; 1)$."
    ),
    tags: ["premiere", "maths", "exponentielle", "courbe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_crb_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 3,
    theme: "neutral",
    text: "Que devient $e^{x}$ lorsque $x$ prend des valeurs de plus en plus négatives ?",
    format: "qcm",
    choices: [
      "il se rapproche de $0$ sans jamais l'atteindre",
      "il devient négatif",
      "il atteint $0$ puis devient négatif",
      "il reste supérieur à $1$",
    ],
    expected: ["il se rapproche de $0$ sans jamais l'atteindre"],
    comparator: "mcq_exact",
    hint: "$e^{-5} = \\dfrac{1}{e^{5}}$ : que vaut cet inverse ?",
    explanation: exp(
      "Pour $x$ négatif, $e^{x} = \\dfrac{1}{e^{-x}}$ est l'inverse d'un grand nombre.",
      "$e^{-5} \\approx 0{,}0067$, $e^{-10} \\approx 0{,}000045$ : les valeurs deviennent minuscules.",
      "Elles restent pourtant strictement positives : l'inverse d'un nombre positif ne peut pas être nul. La courbe se rapproche de l'axe des abscisses sans jamais le toucher.",
      "Il se rapproche de $0$ sans jamais l'atteindre."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_crb_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 4,
    theme: "neutral",
    text: "Les courbes de $x \\mapsto e^{x}$ et de $x \\mapsto e^{-x}$ sont symétriques par rapport à :",
    format: "qcm",
    choices: [
      "l'axe des ordonnées",
      "l'axe des abscisses",
      "l'origine du repère",
      "la droite d'équation $y = x$",
    ],
    expected: ["l'axe des ordonnées"],
    comparator: "mcq_exact",
    hint: "Compare l'image de $2$ par la première et l'image de $-2$ par la seconde.",
    explanation: exp(
      "Deux courbes sont symétriques par rapport à l'axe des ordonnées quand on passe de l'une à l'autre en changeant $x$ en $-x$.",
      "C'est exactement le cas ici : la seconde fonction est $x \\mapsto e^{-x}$.",
      "Par exemple $e^{2} \\approx 7{,}39$ et $e^{-(-2)} = e^{2} \\approx 7{,}39$ : les points d'abscisses $2$ et $-2$ sont à la même hauteur. Le point commun $(0 ; 1)$ est sur l'axe de symétrie.",
      "Elles sont symétriques par rapport à l'axe des ordonnées."
    ),
    canvas: courbeExpEtInverse,
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_crb_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 3,
    theme: "neutral",
    text: "La courbe de $x \\mapsto e^{x}$ coupe-t-elle l'axe des abscisses ?",
    format: "qcm",
    choices: [
      "non, jamais : $e^{x}$ ne s'annule pas",
      "oui, en $x = 0$",
      "oui, en $x = 1$",
      "oui, pour les $x$ très négatifs",
    ],
    expected: ["non, jamais : $e^{x}$ ne s'annule pas"],
    comparator: "mcq_exact",
    hint: "Couper l'axe des abscisses, c'est avoir une ordonnée nulle.",
    explanation: exp(
      "Un point de l'axe des abscisses a une ordonnée nulle : la courbe le coupe si l'équation $e^{x} = 0$ a une solution.",
      "Or $e^{x} > 0$ pour tout réel $x$ : cette équation n'a aucune solution.",
      "La courbe se rapproche de l'axe pour les $x$ très négatifs, mais ne le touche jamais. Le piège classique est de répondre $x = 0$ : en $0$, la courbe coupe l'axe des ORDONNÉES, au point $(0 ; 1)$.",
      "Non, elle ne coupe jamais l'axe des abscisses."
    ),
    canvas: courbeExp,
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_crb_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 4,
    theme: "neutral",
    text: "Par quel point passent toutes les courbes de $t \\mapsto e^{kt}$, quelle que soit la valeur de $k$ ?",
    format: "qcm",
    choices: ["$(0 ; 1)$", "$(1 ; 1)$", "$(0 ; 0)$", "$(1 ; k)$"],
    expected: ["$(0 ; 1)$"],
    comparator: "mcq_exact",
    hint: "Calcule l'image de $0$ : que devient $k \\times 0$ ?",
    explanation: exp(
      "Un point commun à toutes ces courbes doit avoir la même image quelle que soit la valeur de $k$.",
      "En $t = 0$ : $e^{k \\times 0} = e^{0} = 1$, et ce quel que soit $k$.",
      "Toutes ces courbes passent donc par $(0 ; 1)$ ; ensuite elles se séparent, d'autant plus vite que $|k|$ est grand.",
      "Elles passent toutes par le point $(0 ; 1)$."
    ),
    tags: ["premiere", "maths", "exponentielle", "courbe", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_crb_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 5,
    theme: "neutral",
    text: "Décris la différence d'allure entre les courbes de $t \\mapsto e^{0{,}5t}$ et de $t \\mapsto e^{-0{,}5t}$.",
    format: "open",
    expected: ["croissante", "decroissante", "décroissante", "symetrique", "symétrique", "(0 ; 1)"],
    comparator: "contains_keyword",
    hint: "Regarde le signe du coefficient dans l'exposant, puis le point commun.",
    explanation: exp(
      "Le signe du coefficient $k$ dans $e^{kt}$ décide du sens de variation, car $(e^{kt})' = k e^{kt}$ a le signe de $k$.",
      "Pour $k = 0{,}5 > 0$ : la courbe monte, de plus en plus vite. Pour $k = -0{,}5 < 0$ : elle descend, de plus en plus lentement, en se rapprochant de l'axe des abscisses.",
      "Les deux passent par le point $(0 ; 1)$, et elles sont symétriques l'une de l'autre par rapport à l'axe des ordonnées.",
      "L'une croît, l'autre décroît ; elles se croisent en $(0 ; 1)$ et sont symétriques par rapport à l'axe des ordonnées."
    ),
    canvas: courbeExpEtInverse,
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_crb_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 5,
    theme: "neutral",
    text: "Deux élèves tracent l'une $t \\mapsto e^{2t}$, l'autre $t \\mapsto e^{0{,}5t}$. Laquelle des deux courbes monte le plus vite ? Explique.",
    format: "open",
    expected: ["coefficient", "plus grand", "derivee", "dérivée", "2t", "4 fois"],
    comparator: "contains_keyword",
    hint: "Compare les deux dérivées en un même point, par exemple en $t = 0$.",
    explanation: exp(
      "La vitesse de montée d'une courbe, c'est sa dérivée.",
      "$(e^{2t})' = 2e^{2t}$ et $(e^{0{,}5t})' = 0{,}5\\,e^{0{,}5t}$. En $t = 0$, les pentes valent respectivement $2$ et $0{,}5$.",
      "La première monte donc quatre fois plus vite dès le départ, et l'écart se creuse ensuite : en $t = 4$, $e^{8} \\approx 2981$ contre $e^{2} \\approx 7{,}4$.",
      "C'est $t \\mapsto e^{2t}$ : plus le coefficient de $t$ est grand, plus la croissance est rapide."
    ),
    tags: ["premiere", "maths", "exponentielle", "courbe", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_crb_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 4,
    theme: "neutral",
    hint: "Une courbe qui monte correspond à un coefficient positif ; une courbe qui descend, à un coefficient négatif.",
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "template"],
    generate: () => {
      const cas = [
        { k: 0.5, label: "0{,}5", croissante: true },
        { k: 0.3, label: "0{,}3", croissante: true },
        { k: -0.4, label: "-0{,}4", croissante: false },
        { k: -0.2, label: "-0{,}2", croissante: false },
      ];
      const c = pickOne(cas);
      const correct = c.croissante ? "$k > 0$ : la fonction est croissante" : "$k < 0$ : la fonction est décroissante";
      const autre = c.croissante ? "$k < 0$ : la fonction est décroissante" : "$k > 0$ : la fonction est croissante";
      return {
        text: "Cette courbe représente la fonction $t \\mapsto e^{kt}$ sur $[0 ; 6]$. Que peut-on dire du coefficient $k$ ?",
        format: "qcm",
        choices: [correct, autre, "$k = 0$ : la fonction est constante", "$k = 1$ nécessairement"],
        expected: [correct],
        comparator: "mcq_exact",
        canvas: courbeTaux(c.k),
        explanation: exp(
          "La dérivée de $t \\mapsto e^{kt}$ vaut $k\\,e^{kt}$, et $e^{kt} > 0$ : le sens de variation est donné par le seul signe de $k$.",
          "On lit donc le sens de variation sur le dessin, puis on en déduit le signe de $k$.",
          c.croissante
            ? `Ici la courbe monte à partir de $(0 ; 1)$ : la dérivée est positive, donc $k > 0$ (dans ce tracé, $k = ${c.label}$).`
            : `Ici la courbe descend à partir de $(0 ; 1)$ en se rapprochant de l'axe des abscisses : la dérivée est négative, donc $k < 0$ (dans ce tracé, $k = ${c.label}$).`,
          correct + "."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_crb_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_courbe",
    difficulty: 5,
    theme: "neutral",
    hint: "Trois choses à dire : par où elle passe en $0$, si elle monte ou descend, et pourquoi.",
    tags: ["premiere", "maths", "exponentielle", "courbe", "canvas", "open", "template"],
    generate: () => {
      const cas = [
        { k: 0.4, label: "0{,}4", croissante: true },
        { k: 0.8, label: "0{,}8", croissante: true },
        { k: -0.5, label: "-0{,}5", croissante: false },
        { k: -0.3, label: "-0{,}3", croissante: false },
      ];
      const c = pickOne(cas);
      return {
        text: `Décris l'allure de la courbe de $f(t) = e^{${c.label}t}$ sur $[0 ; 6]$ : par quel point commence-t-elle, monte-t-elle ou descend-elle, et pourquoi ?`,
        format: "open",
        expected: c.croissante
          ? ["croissante", "monte", "(0 ; 1)", "positif"]
          : ["decroissante", "décroissante", "descend", "(0 ; 1)", "negatif", "négatif"],
        comparator: "contains_keyword",
        canvas: courbeTaux(c.k),
        explanation: exp(
          "Trois éléments décrivent l'allure : le point de départ, le sens de variation, et la raison de ce sens.",
          `En $t = 0$ : $f(0) = e^{0} = 1$, la courbe part du point $(0 ; 1)$. Puis $f'(t) = ${c.label}\\,e^{${c.label}t}$.`,
          `Le facteur $e^{${c.label}t}$ est strictement positif, donc $f'$ a le signe de $${c.label}$ : elle est ${c.croissante ? "positive" : "négative"} sur tout l'intervalle.`,
          c.croissante
            ? "La courbe part de $(0 ; 1)$ et monte, de plus en plus vite."
            : "La courbe part de $(0 ; 1)$ et descend, en se rapprochant de l'axe des abscisses sans jamais l'atteindre."
        ),
      };
    },
  },

  /* ===================== EXP_SUITE_GEO ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 4,
    theme: "neutral",
    text: "Pour tout réel $a$, la suite $(e^{na})_{n}$ est :",
    format: "qcm",
    choices: [
      "géométrique de raison $e^a$",
      "arithmétique de raison $a$",
      "constante",
      "géométrique de raison $a$",
    ],
    expected: ["géométrique de raison $e^a$"],
    comparator: "mcq_exact",
    hint: "$e^{(n+1)a} = e^{na} \\times e^a$.",
    explanation: exp(
      "On compare deux termes consécutifs.",
      "$e^{(n+1)a} = e^{na} \\times e^{a}$ : on multiplie par $e^a$.",
      "C'est donc une suite géométrique de raison $e^a$.",
      "Géométrique de raison $e^a$."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_geo_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 4,
    theme: "neutral",
    text: "Pour la suite $u_n = e^{2n}$, un élève annonce une raison de $2$. Pourquoi est-ce faux ?",
    format: "qcm",
    choices: [
      "parce qu'on passe de $u_n$ à $u_{n+1}$ en multipliant par $e^{2}$, pas par $2$",
      "parce que la suite est arithmétique",
      "parce que la raison est $2n$",
      "parce que la suite n'a pas de raison",
    ],
    expected: ["parce qu'on passe de $u_n$ à $u_{n+1}$ en multipliant par $e^{2}$, pas par $2$"],
    comparator: "mcq_exact",
    hint: "Le $2$ est dans l'EXPOSANT : il ne sort pas tel quel.",
    explanation: exp(
      "La raison se lit sur le quotient de deux termes consécutifs, pas sur le nombre écrit dans l'exposant.",
      "$u_0 = e^{0} = 1$ et $u_1 = e^{2} \\approx 7{,}39$ : on a bien multiplié par $7{,}39$, et non par $2$.",
      "L'erreur consiste à sortir le $2$ de l'exposant. Ce qui sort d'un exposant par la relation fonctionnelle, c'est un FACTEUR $e^{2}$, pas le nombre $2$.",
      "La raison est $e^{2} \\approx 7{,}39$, pas $2$."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_geo_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 5,
    theme: "neutral",
    text: "La suite définie par $u_n = e^{-0{,}5n}$ est :",
    format: "qcm",
    choices: [
      "géométrique de raison $e^{-0{,}5}$, et décroissante",
      "géométrique de raison $e^{-0{,}5}$, et croissante",
      "géométrique de raison $-0{,}5$, et décroissante",
      "arithmétique de raison $-0{,}5$",
    ],
    expected: ["géométrique de raison $e^{-0{,}5}$, et décroissante"],
    comparator: "mcq_exact",
    hint: "La raison vaut $e^{-0{,}5} \\approx 0{,}61$ : est-elle plus grande ou plus petite que $1$ ?",
    explanation: exp(
      "Une suite géométrique à termes positifs décroît quand sa raison est comprise entre $0$ et $1$.",
      "Ici $\\dfrac{u_{n+1}}{u_n} = e^{-0{,}5} \\approx 0{,}61$ : la raison est strictement positive et inférieure à $1$.",
      "Chaque terme vaut donc environ $61\\,\\%$ du précédent : la suite décroît, tout en restant strictement positive.",
      "Géométrique de raison $e^{-0{,}5} \\approx 0{,}61$, donc décroissante."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_geo_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 2,
    theme: "neutral",
    text: "Quel est le premier terme $u_0$ de la suite définie par $u_n = e^{na}$ ?",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Remplace $n$ par $0$ dans l'exposant.",
    explanation: exp(
      "Le premier terme s'obtient en remplaçant $n$ par $0$.",
      "$u_0 = e^{0 \\times a} = e^{0}$.",
      "$e^{0} = 1$, et ce quelle que soit la valeur de $a$.",
      "$u_0 = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_geo_fixed_5",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 5,
    theme: "reunion",
    text: "Dans une pépinière de Saint-Joseph, le nombre de plants au bout de $n$ mois est $P_n = 500\\,e^{0{,}2n}$. Par quel nombre le stock est-il multiplié chaque mois ?",
    format: "qcm",
    choices: [
      "$e^{0{,}2} \\approx 1{,}22$",
      "$0{,}2$",
      "$500 \\times 0{,}2 = 100$",
      "$e^{0{,}2n}$",
    ],
    expected: ["$e^{0{,}2} \\approx 1{,}22$"],
    comparator: "mcq_exact",
    hint: "Calcule $\\dfrac{P_{n+1}}{P_n}$.",
    explanation: exp(
      "Passer d'un mois au suivant, c'est calculer le quotient de deux termes consécutifs.",
      "$\\dfrac{P_{n+1}}{P_n} = \\dfrac{500e^{0{,}2(n+1)}}{500e^{0{,}2n}} = e^{0{,}2}$.",
      "$e^{0{,}2} \\approx 1{,}22$ : le stock augmente d'environ $22\\,\\%$ par mois. La suite $(P_n)$ est géométrique de raison $e^{0{,}2}$ et de premier terme $500$.",
      "Il est multiplié par $e^{0{,}2} \\approx 1{,}22$ chaque mois, soit environ $+22\\,\\%$."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_geo_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Démontre que la suite définie par $u_n = e^{na}$ est géométrique, et donne sa raison.",
    format: "open",
    expected: ["quotient", "constant", "raison", "relation fonctionnelle", "u_{n+1}"],
    comparator: "contains_keyword",
    hint: "Une suite est géométrique si le quotient $\\dfrac{u_{n+1}}{u_n}$ ne dépend pas de $n$.",
    explanation: exp(
      "Une suite est géométrique lorsque le quotient de deux termes consécutifs est constant : ce quotient est alors la raison.",
      "On calcule $\\dfrac{u_{n+1}}{u_n} = \\dfrac{e^{(n+1)a}}{e^{na}}$.",
      "La relation fonctionnelle donne $e^{(n+1)a} = e^{na} \\times e^{a}$, donc le quotient vaut $e^{a}$ — un nombre qui ne dépend pas de $n$.",
      "La suite est géométrique de raison $e^{a}$, et de premier terme $u_0 = 1$."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_geo_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 5,
    theme: "neutral",
    text: "Explique pourquoi la suite $(e^{na})$ est décroissante lorsque $a$ est négatif.",
    format: "open",
    expected: ["entre 0 et 1", "inferieure a 1", "inférieure à 1", "plus petit que 1", "raison"],
    comparator: "contains_keyword",
    hint: "Que vaut la raison $e^{a}$ quand $a < 0$ ? Compare-la à $1$.",
    explanation: exp(
      "Une suite géométrique à termes strictement positifs décroît si et seulement si sa raison est comprise entre $0$ et $1$.",
      "Ici la raison est $e^{a}$. Quand $a < 0$, on a $e^{a} = \\dfrac{1}{e^{-a}}$ avec $e^{-a} > 1$.",
      "La raison est donc strictement comprise entre $0$ et $1$ : chaque terme est une fraction du précédent.",
      "Comme $0 < e^{a} < 1$, la suite décroît — tout en restant strictement positive, puisque l'exponentielle ne s'annule jamais."
    ),
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_geo_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 4,
    theme: "neutral",
    hint: "La raison est le quotient $\\dfrac{u_{n+1}}{u_n}$ : le nombre de l'exposant devient un exposant de $e$.",
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "template"],
    generate: () => {
      const a = pickOne(["3", "0{,}4", "-0{,}6", "-2", "1{,}5", "0{,}25"]);
      const correct = `$e^{${a}}$`;
      return {
        text: `Quelle est la raison de la suite géométrique définie par $u_n = e^{${a}n}$ ?`,
        format: "qcm",
        choices: [correct, `$${a}$`, `$${a}e$`, `$e^{${a}n}$`],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La raison d'une suite géométrique est le quotient de deux termes consécutifs.",
          `$\\dfrac{u_{n+1}}{u_n} = \\dfrac{e^{${a}(n+1)}}{e^{${a}n}}$.`,
          `La relation fonctionnelle donne $e^{${a}(n+1)} = e^{${a}n} \\times e^{${a}}$ : le quotient vaut $e^{${a}}$, indépendant de $n$.`,
          `La raison est ${correct}.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_geo_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_suite_geo",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare la raison $e^{a}$ à $1$ : tout dépend du signe de $a$.",
    tags: ["premiere", "maths", "exponentielle", "suite_geo", "open", "template"],
    generate: () => {
      const cas = [
        { a: "0{,}3", croissante: true },
        { a: "1{,}2", croissante: true },
        { a: "-0{,}7", croissante: false },
        { a: "-0{,}1", croissante: false },
        { a: "2", croissante: true },
      ];
      const c = pickOne(cas);
      return {
        text: `La suite $u_n = e^{${c.a}n}$ est-elle croissante ou décroissante ? Justifie en utilisant sa raison.`,
        format: "open",
        expected: c.croissante
          ? ["croissante", "superieure a 1", "supérieure à 1", "plus grand que 1", "raison"]
          : ["decroissante", "décroissante", "entre 0 et 1", "inferieure a 1", "inférieure à 1", "raison"],
        comparator: "contains_keyword",
        explanation: exp(
          "Pour une suite géométrique à termes strictement positifs, tout se joue sur la position de la raison par rapport à $1$.",
          `Ici la raison vaut $e^{${c.a}}$, et le premier terme $u_0 = 1$ est positif.`,
          c.croissante
            ? `Comme $${c.a} > 0$, on a $e^{${c.a}} > e^{0} = 1$ : chaque terme est plus grand que le précédent.`
            : `Comme $${c.a} < 0$, on a $0 < e^{${c.a}} < 1$ : chaque terme est une fraction du précédent.`,
          c.croissante ? "La suite est croissante." : "La suite est décroissante, en restant strictement positive."
        ),
      };
    },
  },

  /* ===================== EXP_MODELISATION ===================== */
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 2,
    theme: "neutral",
    text: "Une quantité modélisée par $N(t) = N_0 e^{kt}$ avec $k > 0$ correspond à :",
    format: "qcm",
    choices: ["une croissance exponentielle", "une décroissance", "une fonction constante", "une fonction affine"],
    expected: ["une croissance exponentielle"],
    comparator: "mcq_exact",
    hint: "$k > 0$ : l'exposant augmente.",
    explanation: exp(
      "Le signe de $k$ détermine croissance ou décroissance.",
      "Si $k > 0$, $e^{kt}$ augmente avec $t$.",
      "C'est une croissance exponentielle.",
      "Une croissance exponentielle."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "La masse d'un échantillon radioactif est $m(t) = 100 e^{-0{,}2t}$. Que vaut $m(0)$ ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "$e^0 = 1$.",
    explanation: exp(
      "On remplace $t$ par $0$.",
      "$m(0) = 100 \\times e^{0} = 100 \\times 1$.",
      "$= 100$.",
      "$m(0) = 100$."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_3",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Pour $m(t) = 100 e^{-0{,}2t}$ (décroissance radioactive), la masse :",
    format: "qcm",
    choices: ["diminue au cours du temps", "augmente", "reste constante", "devient négative"],
    expected: ["diminue au cours du temps"],
    comparator: "mcq_exact",
    hint: "Exposant négatif.",
    explanation: exp(
      "Le coefficient dans l'exposant est $k = -0{,}2 < 0$.",
      "Donc $e^{-0{,}2t}$ décroît quand $t$ augmente.",
      "La masse diminue au cours du temps.",
      "Elle diminue au cours du temps."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_4",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Un capital de $2000$ € placé à intérêts continus suit $C(t) = 2000 e^{0{,}03t}$. Que vaut le capital initial $C(0)$ ?",
    format: "short",
    expected: ["2000"],
    comparator: "number_equal",
    hint: "$e^0 = 1$.",
    explanation: exp(
      "Le capital initial correspond à $t = 0$.",
      "$C(0) = 2000 \\times e^0 = 2000 \\times 1$.",
      "$= 2000$.",
      "$C(0) = 2000$ €."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "short"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_6",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Une quantité modélisée par $N(t) = N_0 e^{kt}$ avec $k < 0$ correspond à :",
    format: "qcm",
    choices: [
      "une décroissance exponentielle",
      "une croissance exponentielle",
      "une quantité constante",
      "une quantité qui devient négative",
    ],
    expected: ["une décroissance exponentielle"],
    comparator: "mcq_exact",
    hint: "La dérivée vaut $k N_0 e^{kt}$ : quel est son signe si $k < 0$ ?",
    explanation: exp(
      "Le signe de $k$ décide du sens de variation du modèle.",
      "La dérivée est $N'(t) = k N_0 e^{kt}$. Comme $e^{kt} > 0$ et $N_0 > 0$, le signe est celui de $k$.",
      "Avec $k < 0$, la dérivée est négative : la quantité diminue. Elle reste pourtant toujours strictement positive — elle s'approche de zéro sans jamais l'atteindre.",
      "C'est une décroissance exponentielle."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_7",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le modèle $N(t) = N_0 e^{kt}$, que représente $N_0$ ?",
    format: "qcm",
    choices: [
      "la quantité à l'instant $t = 0$",
      "la quantité finale",
      "le taux de croissance",
      "la durée du phénomène",
    ],
    expected: ["la quantité à l'instant $t = 0$"],
    comparator: "mcq_exact",
    hint: "Remplace $t$ par $0$ dans le modèle.",
    explanation: exp(
      "Pour interpréter un paramètre, on l'évalue à un instant simple.",
      "$N(0) = N_0 e^{k \\times 0} = N_0 \\times e^0 = N_0 \\times 1$.",
      "$N(0) = N_0$ : c'est donc la quantité de départ.",
      "$N_0$ est la quantité à l'instant $t = 0$."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_8",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 4,
    theme: "neutral",
    text: "Un capital suit $C(t) = 2000 e^{0{,}03t}$, avec $t$ en années. Que représente le coefficient $0{,}03$ ?",
    format: "qcm",
    choices: [
      "le taux de croissance continu, soit environ $3\\%$ par an",
      "le capital initial",
      "le nombre d'années de placement",
      "les intérêts en euros",
    ],
    expected: ["le taux de croissance continu, soit environ $3\\%$ par an"],
    comparator: "mcq_exact",
    hint: "C'est le $k$ du modèle $N_0 e^{kt}$ : il gouverne la VITESSE de croissance.",
    explanation: exp(
      "Dans $N_0 e^{kt}$, le coefficient $k$ est le taux de croissance continu.",
      "Ici $k = 0{,}03$, soit $3\\%$ par an. Le capital initial, lui, est $C(0) = 2000$ €.",
      "Plus $k$ est grand, plus le capital grimpe vite ; s'il était négatif, le capital fondrait.",
      "$0{,}03$ est le taux de croissance continu, environ $3\\%$ par an."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_9",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 5,
    theme: "neutral",
    text: "Pour $m(t) = 100 e^{-0{,}2t}$, quelle est la dérivée $m'(t)$ ?",
    format: "qcm",
    choices: [
      "$m'(t) = -20 e^{-0{,}2t}$",
      "$m'(t) = 100 e^{-0{,}2t}$",
      "$m'(t) = -0{,}2 e^{-0{,}2t}$",
      "$m'(t) = -20 e^{-t}$",
    ],
    expected: ["$m'(t) = -20 e^{-0{,}2t}$"],
    comparator: "mcq_exact",
    hint: "Le coefficient $100$ reste, et $-0{,}2$ sort de l'exponentielle.",
    explanation: exp(
      "La dérivée de $k\\,e^{at}$ est $k\\,a\\,e^{at}$ : le coefficient devant reste, et celui de $t$ sort.",
      "$m'(t) = 100 \\times (-0{,}2) \\times e^{-0{,}2t}$.",
      "$= -20 e^{-0{,}2t}$, toujours négative : la masse diminue sans cesse.",
      "$m'(t) = -20 e^{-0{,}2t}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_10",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 4,
    theme: "neutral",
    text: "Deux populations suivent $A(t) = 100 e^{0{,}05t}$ et $B(t) = 100 e^{0{,}02t}$. Laquelle croît le plus vite ?",
    format: "qcm",
    choices: [
      "$A$, car son coefficient $k$ est plus grand",
      "$B$, car son coefficient $k$ est plus petit",
      "les deux à la même vitesse : même valeur initiale",
      "on ne peut pas comparer",
    ],
    expected: ["$A$, car son coefficient $k$ est plus grand"],
    comparator: "mcq_exact",
    hint: "Les deux partent de $100$ : seule la valeur de $k$ les distingue.",
    explanation: exp(
      "Dans $N_0 e^{kt}$, c'est $k$ qui fixe la vitesse de croissance ; $N_0$ ne fixe que le point de départ.",
      "Les deux populations partent de $100$, mais $0{,}05 > 0{,}02$.",
      "$A$ croît donc plus vite : au bout de quelques années, l'écart entre les deux devient considérable.",
      "C'est $A$, car son coefficient $k$ est plus grand."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_fixed_11",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi ces modèles, lequel décrit une décroissance exponentielle ?",
    format: "qcm",
    choices: [
      "$N(t) = 80 e^{-0{,}3t}$",
      "$N(t) = 80 e^{0{,}3t}$",
      "$N(t) = 80 - 0{,}3t$",
      "$N(t) = 80 \\times 0{,}3 t$",
    ],
    expected: ["$N(t) = 80 e^{-0{,}3t}$"],
    comparator: "mcq_exact",
    hint: "Exponentielle ET décroissante : il faut un $e$, et un exposant négatif.",
    explanation: exp(
      "Un modèle exponentiel s'écrit $N_0 e^{kt}$ ; il décroît lorsque $k < 0$.",
      "$80 e^{-0{,}3t}$ a bien $k = -0{,}3 < 0$.",
      "$80 e^{0{,}3t}$ croît ; $80 - 0{,}3t$ décroît, mais de façon AFFINE (elle finit par devenir négative, ce qu'une exponentielle ne fait jamais).",
      "C'est $N(t) = 80 e^{-0{,}3t}$."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "qcm"],
  },
  {
    kind: "template",
    id: "premiere_exp_mod_tpl_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Valeur initiale : remplace $t$ par $0$ et $e^0 = 1$.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const n0 = randomInt(2, 9) * 100;
      const k = randomInt(1, 4);
      return {
        text: `Une population est modélisée par $N(t) = ${n0} e^{0{,}0${k}t}$. Quelle est la population initiale $N(0)$ ?`,
        format: "short",
        expected: [String(n0)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur initiale correspond à $t = 0$.",
          `$N(0) = ${n0} \\times e^0 = ${n0} \\times 1$.`,
          `$= ${n0}$.`,
          `$N(0) = ${n0}$.`
        ),
      };
    },
  },
  {
    kind: "template",
    id: "premiere_exp_mod_tpl_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 3,
    theme: "neutral",
    hint: "Signe de $k$ : croissance si $k>0$, décroissance si $k<0$.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "template"],
    generate: () => {
      const croissance = randomInt(0, 1) === 1;
      const k = randomInt(1, 5);
      const correct = croissance ? "croissance exponentielle" : "décroissance exponentielle";
      return {
        text: `Une grandeur suit $G(t) = G_0 e^{${croissance ? "" : "-"}0{,}${k}t}$. Cela modélise une :`,
        format: "qcm",
        choices: ["croissance exponentielle", "décroissance exponentielle", "fonction constante", "fonction affine"],
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du coefficient dans l'exposant donne le sens.",
          `Ici le coefficient est ${croissance ? "positif" : "négatif"}.`,
          `Donc c'est une ${correct}.`,
          `Une ${correct}.`
        ),
      };
    },
  },

  /* =========================================================
     QUESTIONS OUVERTES — compléments du 02/08/2026.
     Les deux micro-compétences écrites avant le découpage n'avaient aucune
     question ouverte : deux ouvertes fixes + un TEMPLATE ouvert chacune.
  ========================================================= */

  {
    kind: "fixed",
    id: "premiere_exp_sim_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 5,
    theme: "neutral",
    text: "Quelles règles utilise-t-on pour simplifier une expression contenant des exponentielles, et dans quel ordre les applique-t-on ?",
    format: "open",
    expected: ["somme des exposants", "difference", "différence", "produit", "quotient", "puissance"],
    comparator: "contains_keyword",
    hint: "Trois règles seulement, les mêmes que pour les puissances.",
    explanation: exp(
      "Toutes les simplifications reposent sur trois règles, héritées des puissances : produit, quotient, puissance de puissance.",
      "$e^{a} \\times e^{b} = e^{a+b}$ (on ajoute les exposants) ; $\\dfrac{e^{a}}{e^{b}} = e^{a-b}$ (on soustrait) ; $(e^{a})^{n} = e^{na}$ (on multiplie).",
      "On applique d'abord les puissances de puissances, puis les produits et quotients, et on simplifie l'exposant obtenu à la fin. Un $e^{0}$ qui apparaît vaut $1$ et disparaît.",
      "Trois règles, appliquées de l'intérieur vers l'extérieur — et surtout : elles ne concernent que des PRODUITS et des QUOTIENTS, jamais des sommes."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_sim_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 5,
    theme: "neutral",
    text: "Un élève simplifie $\\dfrac{e^{2x} + e^{3x}}{e^{x}}$ en écrivant $e^{2x + 3x - x}$. Explique son erreur, puis donne la bonne méthode.",
    format: "open",
    expected: ["somme", "factorise", "pas un produit", "numerateur", "numérateur", "distribue"],
    comparator: "contains_keyword",
    hint: "La règle du quotient s'applique-t-elle quand le numérateur est une SOMME ?",
    explanation: exp(
      "La règle $\\dfrac{e^{a}}{e^{b}} = e^{a-b}$ suppose que le numérateur est une seule exponentielle, pas une somme.",
      "L'élève a traité une somme comme un produit : il a additionné les exposants du numérateur, ce que rien n'autorise.",
      "La bonne méthode est de séparer la fraction : $\\dfrac{e^{2x}}{e^{x}} + \\dfrac{e^{3x}}{e^{x}} = e^{x} + e^{2x}$. On peut aussi factoriser le numérateur par $e^{2x}$ avant de simplifier.",
      "Devant une somme au numérateur : on distribue la division, ou on factorise. Jamais on n'additionne les exposants."
    ),
    tags: ["premiere", "maths", "exponentielle", "simplifier", "piege", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_sim_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_simplifier",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère d'abord s'il s'agit d'un produit, d'un quotient ou d'une somme.",
    tags: ["premiere", "maths", "exponentielle", "simplifier", "open", "template"],
    generate: () => {
      const cas = [
        { e: "e^{3x} \\times e^{-x}", r: "e^{2x}", struct: "un produit", regle: "on ajoute les exposants" },
        { e: "\\dfrac{e^{5x}}{e^{2x}}", r: "e^{3x}", struct: "un quotient", regle: "on soustrait les exposants" },
        { e: "\\left(e^{2x}\\right)^{3}", r: "e^{6x}", struct: "une puissance de puissance", regle: "on multiplie les exposants" },
        { e: "\\dfrac{e^{x} + e^{2x}}{e^{x}}", r: "1 + e^{x}", struct: "une SOMME au numérateur", regle: "on distribue la division, on n'additionne surtout pas les exposants" },
        { e: "e^{x+2} \\times e^{-2}", r: "e^{x}", struct: "un produit", regle: "on ajoute les exposants" },
      ];
      const c = pickOne(cas);
      return {
        text: `Simplifie $${c.e}$, en disant d'abord quelle est la structure de l'expression et quelle règle elle appelle.`,
        format: "open",
        expected: [c.struct.split(" ")[1], "exposants", "regle", "règle", c.r.includes("+") ? "distribue" : "simplifie"],
        comparator: "contains_keyword",
        explanation: exp(
          "Chaque règle de simplification correspond à une structure : produit, quotient, ou puissance de puissance — et aucune ne s'applique à une somme.",
          `Ici $${c.e}$ est ${c.struct}.`,
          `La règle correspondante dit que ${c.regle}.`,
          `On obtient $${c.r}$.`
        ),
      };
    },
  },

  {
    kind: "fixed",
    id: "premiere_exp_mod_open_1",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 5,
    theme: "neutral",
    text: "Comment reconnaît-on qu'une situation se modélise par une exponentielle plutôt que par une fonction affine ?",
    format: "open",
    expected: ["pourcentage", "multiplie", "ajoute", "proportionnelle", "meme facteur", "même facteur"],
    comparator: "contains_keyword",
    hint: "Ajoute-t-on toujours la même quantité, ou multiplie-t-on toujours par le même nombre ?",
    explanation: exp(
      "Le mot à repérer dans l'énoncé est celui qui décrit l'évolution d'une étape à l'autre.",
      "Une fonction affine correspond à une AUGMENTATION CONSTANTE : « on ajoute $50$ € chaque mois », « la température monte de $2$ degrés par heure ».",
      "Une exponentielle correspond à un POURCENTAGE constant, donc à une multiplication par le même facteur : « la population augmente de $3\\,\\%$ par an », « la quantité diminue de moitié tous les cinq ans ». La vitesse de croissance y est proportionnelle à la quantité présente.",
      "« Plus $x$ » → affine ; « plus $x$ pour cent » → exponentielle. C'est la différence entre un escalier régulier et une pente qui s'emballe."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "open"],
  },
  {
    kind: "fixed",
    id: "premiere_exp_mod_open_2",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 5,
    theme: "neutral",
    text: "Dans le modèle $N(t) = N_0 e^{kt}$, que représentent $N_0$ et $k$ ? Que change le signe de $k$ ?",
    format: "open",
    expected: ["initial", "depart", "départ", "taux", "croissance", "decroissance", "décroissance", "signe"],
    comparator: "contains_keyword",
    hint: "Que vaut $N(0)$ ? Et que devient la fonction si $k$ est négatif ?",
    explanation: exp(
      "Les deux constantes du modèle jouent des rôles très différents : l'une fixe le point de départ, l'autre la vitesse.",
      "En $t = 0$ : $N(0) = N_0 e^{0} = N_0$. Donc $N_0$ est la quantité INITIALE, celle du début de l'observation.",
      "Le coefficient $k$ est le taux de croissance : la dérivée vaut $k N(t)$, donc la vitesse d'évolution est proportionnelle à la quantité présente, avec $k$ pour facteur.",
      "Si $k > 0$, la quantité augmente de plus en plus vite ; si $k < 0$, elle diminue en se rapprochant de $0$ sans l'atteindre. Le signe de $k$ décide de la croissance ou de la décroissance, sa taille décide de la rapidité."
    ),
    tags: ["premiere", "maths", "exponentielle", "modelisation", "open"],
  },
  {
    kind: "template",
    id: "premiere_exp_mod_tpl_open",
    niveau: "premiere-spe",
    matiere: "maths",
    notionId: "exponentielle",
    microId: "exp_modelisation",
    difficulty: 5,
    theme: "neutral",
    hint: "Repère la quantité initiale, puis le signe du coefficient de $t$.",
    tags: ["premiere", "maths", "exponentielle", "modelisation", "open", "template"],
    generate: () => {
      const cas = [
        { s: "une population de bactéries suit $N(t) = 500e^{0{,}4t}$, $t$ en heures", n0: "500", sens: "croissance" },
        { s: "la masse d'un échantillon suit $m(t) = 80e^{-0{,}05t}$, $t$ en jours", n0: "80", sens: "décroissance" },
        { s: "un capital suit $C(t) = 2000e^{0{,}03t}$, $t$ en années", n0: "2000", sens: "croissance" },
        { s: "la concentration d'un médicament suit $c(t) = 12e^{-0{,}2t}$, $t$ en heures", n0: "12", sens: "décroissance" },
        { s: "le nombre de vues suit $V(t) = 150e^{0{,}6t}$, $t$ en jours", n0: "150", sens: "croissance" },
      ];
      const c = pickOne(cas);
      return {
        text: `Dans la situation suivante — ${c.s} — interprète les deux constantes du modèle, et dis s'il s'agit d'une croissance ou d'une décroissance. Justifie.`,
        format: "open",
        expected: [c.n0, c.sens, "initial", "signe", "taux"],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un modèle $N(t) = N_0 e^{kt}$, la constante devant l'exponentielle est la quantité initiale, et le coefficient de $t$ est le taux.",
          `En $t = 0$, l'exponentielle vaut $1$ : la quantité de départ est donc $${c.n0}$.`,
          `Le coefficient de $t$ est ${c.sens === "croissance" ? "positif" : "négatif"}, et la dérivée du modèle a le même signe que lui.`,
          `Il s'agit donc d'une ${c.sens} : la quantité ${c.sens === "croissance" ? "augmente de plus en plus vite" : "diminue en se rapprochant de $0$ sans jamais l'atteindre"}.`
        ),
      };
    },
  },
];
