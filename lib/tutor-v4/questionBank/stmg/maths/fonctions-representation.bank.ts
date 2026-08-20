// lib/tutor-v4/questionBank/stmg/maths/fonctions-representation.bank.ts
//
// Notions : fct_representation, fct_taux_variation, fct_monotonie
//           (domaine STMGFO — « Les fonctions comme modèles mathématiques
//            d'évolutions continues »)
//
// C'est la porte d'entrée de tout le domaine de l'analyse : les notations,
// les modes de représentation, le taux de variation entre deux valeurs, et le
// lien entre le signe de ce taux et la monotonie. Le nombre dérivé viendra
// ensuite comme la limite de ce taux — le programme le dit : « la notion de
// nombre dérivé est introduite à l'aide du taux de variation ».
//
// ⚠️ Le BO demande explicitement d'habituer l'élève « à lire des graphiques
// reliant une grandeur y à une grandeur composée (x², 1/x…), ce qui permet
// notamment de donner sens à l'expression grandeurs inversement
// proportionnelles ». D'où la micro fct_rep_grandeur_composee, qui n'existe
// nulle part ailleurs dans le coach.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ─────────────────────────── outils ─────────────────────────── */

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
  const arrondi = Math.round(n * 10000) / 10000;
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

/**
 * Une courbe quelconque, échantillonnée en points.
 *
 * `fonctionGraphique` ne sait tracer que des droites et des paraboles ; pour
 * tout le reste (degré 3, fonction inverse, courbes de coût), on lui fournit
 * une liste de points suffisamment dense pour que l'œil lise une courbe.
 */
function canvasCourbePoints(
  f: (x: number) => number,
  xmin: number,
  xmax: number,
  titre: string,
  options?: { pas?: number; evidence?: { x?: number; y?: number }; marques?: { x: number; label?: string }[] }
): CanvasFigure {
  const pas = options?.pas ?? (xmax - xmin) / 40;
  const points: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    const y = f(x);
    if (Number.isFinite(y)) points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
  }
  const ys = points.map((p) => p.y);
  const ymin = Math.min(...ys, 0);
  const ymax = Math.max(...ys, 0);
  const marge = Math.max(1, (ymax - ymin) * 0.12);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin,
    xmax,
    ymin: Math.floor(ymin - marge),
    ymax: Math.ceil(ymax + marge),
    grille: true,
    courbes: [{ id: "f", type: "points", points }],
    points: options?.marques?.map((m) => ({ x: m.x, y: Math.round(f(m.x) * 100) / 100, label: m.label })),
    misesEnEvidence:
      options?.evidence !== undefined
        ? [
            {
              verticale: options.evidence.x !== undefined ? { x: options.evidence.x } : undefined,
              horizontale: options.evidence.y !== undefined ? { y: options.evidence.y } : undefined,
            },
          ]
        : undefined,
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

/**
 * « de » contracté devant une grandeur qui porte déjà son article.
 *
 * Les noms ci-dessous s'insèrent dans « Le taux de variation de {grandeur} » :
 * sans contraction, cela donnait « de le coût de production ».
 */
function deNomGrandeur(nom: string): string {
  if (nom.startsWith("le ")) return `du ${nom.slice(3)}`;
  if (nom.startsWith("les ")) return `des ${nom.slice(4)}`;
  return `de ${nom}`;
}

/**
 * « de » contracté devant une variable qui porte déjà son article.
 *
 * ⚠️ « par unité de ${grandeur.variable} » donnait « par unité DE LE nombre de
 * jours » — deux des quatre variables commencent par « le ». Trouvé le
 * 19/08/2026 par un balayage des énoncés rendus, pas à la relecture.
 */
function deVariable(variable: string): string {
  if (variable.startsWith("le ")) return `du ${variable.slice(3)}`;
  if (variable.startsWith("la ")) return `de la ${variable.slice(3)}`;
  if (variable.startsWith("les ")) return `des ${variable.slice(4)}`;
  return `de ${variable}`;
}

const GRANDEURS = [
  { nom: "le coût de production", unite: "€", variable: "la quantité produite" },
  { nom: "le chiffre d'affaires", unite: "k€", variable: "le nombre de mois écoulés" },
  { nom: "la fréquentation du site", unite: "visiteurs", variable: "le nombre de jours" },
  { nom: "la température d'une chambre froide", unite: "°C", variable: "la durée en heures" },
] as const;

export const fonctionsRepresentationBank: TutorBankItemV4[] = [
  /* ═══════════════════ fct_rep_modes ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_rep_modes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_modes",
    difficulty: 2,
    theme: "neutral",
    hint: "Le graphique et le tableau doivent donner la même valeur : compare-les point par point.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template", "short"],
    generate: () => {
      const a = pick([2, 3, -2, -3] as const);
      const b = pick([1, 2, -1, -3] as const);
      const c = pick([0, 2, 4, -2] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x0 = randomInt(-3, 3);
      return {
        text: `La courbe ci-dessous représente une fonction $f$. Quelle est la valeur de $f(${x0})$ ?`,
        format: "short",
        expected: [fr(f(x0))],
        comparator: "number_equal",
        canvas: {
          kind: "fonctionGraphique",
          titre: "Représentation graphique de f",
          xmin: -5,
          xmax: 5,
          ymin: -20,
          ymax: 20,
          grille: true,
          courbes: [{ id: "f", type: "quadratique", a, b, c }],
          misesEnEvidence: [{ verticale: { x: x0 } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une même fonction se lit sur trois registres : son expression, sa courbe, un tableau de valeurs. Passer de l'un à l'autre, c'est vérifier qu'ils disent la même chose.",
          "On repère l'abscisse sur l'axe horizontal, on monte jusqu'à la courbe, puis on lit l'ordonnée.",
          `Au point d'abscisse $${x0}$, la courbe est à la hauteur $${fr(f(x0))}$.`,
          `$f(${x0}) = ${fr(f(x0))}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — du TABLEAU vers l'expression. Le premier item va de la courbe
    // vers une valeur ; celui-ci part de quatre valeurs et cherche la formule
    // qui les produit toutes. C'est l'autre traversée des registres, et la
    // seule qui oblige à VÉRIFIER : une expression qui colle à la première
    // colonne peut trahir à la troisième.
    kind: "template",
    id: "stmg_fct_rep_modes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_modes",
    difficulty: 3,
    theme: "neutral",
    hint: "Teste chaque expression sur DEUX colonnes au moins : une seule ne suffit jamais à conclure.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template"],
    generate: () => {
      const a = pick([2, 3, 4, 5, -2, -3, -4] as const);
      const b = pick([1, 3, 6, 10, -2, -5, -8] as const);
      const xs = [-2, 0, 1, 3, 5];
      const ecrire = (coef: number, ord: number) =>
        `$f(x) = ${coef === 1 ? "" : coef === -1 ? "-" : coef}x ${ord >= 0 ? "+" : "-"} ${Math.abs(ord)}$`;
      return {
        text: `Le tableau donne quelques valeurs d'une fonction $f$. Quelle est son expression ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(b, a),
          ecrire(-a, b),
          ecrire(a, -b),
          ecrire(a + 1, b),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Quelques valeurs de f",
          headers: xs.map((x) => String(x)),
          rows: [{ label: "f(x)", values: xs.map((x) => a * x + b) }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Une fonction se donne indifféremment par une expression, une courbe ou un tableau de valeurs : les trois doivent dire la même chose.",
          "On essaie chaque expression sur plusieurs colonnes du tableau ; celle qui les vérifie toutes est la bonne.",
          `Pour $x = ${xs[0]}$ : $${a} \\times (${xs[0]}) ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${a * xs[0] + b}$, ` +
            `et pour $x = ${xs[3]}$ : $${a} \\times ${xs[3]} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${a * xs[3] + b}$. ` +
            `Les deux colonnes concordent.`,
          `L'expression de $f$ est ${ecrire(a, b)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(b, a),
            cause: "a interverti le coefficient et la constante ; les deux colonnes ne concordent plus",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_rep_notations ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_rep_notations_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_notations",
    difficulty: 1,
    theme: "neutral",
    hint: "$f(a) = b$ se lit : « l'image de $a$ par $f$ est $b$ ».",
    tags: ["stmg", "maths", "fonctions", "template"],
    generate: () => {
      // ⚠️ Les deux réservoirs sont DISJOINTS et ne contiennent pas zéro :
      // si $a = b$, deux propositions deviennent identiques mot pour mot
      // (« l'image de −4 par f est −4 »), et l'élève n'a plus trois lignes à
      // départager. Le vérificateur de générateurs l'a attrapé.
      const a = pick([-6, -5, -3, -2, -1, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const);
      const b = pick([-9, -7, -4, 10, 11, 13, 15, 17, 18, 20] as const);
      const sens = pick(["image", "antecedent", "notation"] as const);
      if (sens === "notation") {
        return {
          text: `Comment se lit l'écriture $x \\mapsto ${Math.abs(a) + 2}x$ ?`,
          format: "qcm" as const,
          choices: shuffle([
            `à $x$, on associe $${Math.abs(a) + 2}x$`,
            `$x$ est égal à $${Math.abs(a) + 2}x$`,
            `$x$ est l'image de $${Math.abs(a) + 2}x$`,
            `$${Math.abs(a) + 2}x$ est l'antécédent de $x$`,
          ]),
          expected: [`à $x$, on associe $${Math.abs(a) + 2}x$`],
          comparator: "mcq_exact" as const,
          explanation: exp(
            "La flèche $\\mapsto$ se lit « a pour image » : elle décrit le PROCÉDÉ, pas une égalité.",
            "On lit de gauche à droite : le nombre de départ, puis ce qu'on lui associe.",
            `$x \\mapsto ${Math.abs(a) + 2}x$ signifie qu'à tout nombre $x$ on associe son produit par $${Math.abs(a) + 2}$.`,
            `Cela se lit : « à $x$, on associe $${Math.abs(a) + 2}x$ ».`
          ),
        };
      }
      return {
        text:
          sens === "image"
            ? `On sait que $f(${a}) = ${b}$. Que peut-on affirmer ?`
            : `On sait que $f(${a}) = ${b}$. Que vaut l'antécédent de $${b}$ dont il est question ici ?`,
        format: "qcm",
        choices:
          sens === "image"
            ? shuffle([
                `l'image de $${a}$ par $f$ est $${b}$`,
                `l'image de $${b}$ par $f$ est $${a}$`,
                `$f$ est égale à $${b}$`,
                `$${a}$ et $${b}$ sont deux antécédents`,
              ])
            : makeChoices(`$${a}$`, [
                `$${b}$`,
                `$${a + b}$`,
                `$${b - a}$`,
                `$${a * 2}$`,
                `$${-a}$`,
                `$${b * 2}$`,
                `$${a + 1}$`,
              ]),
        expected: [sens === "image" ? `l'image de $${a}$ par $f$ est $${b}$` : `$${a}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans l'écriture $f(a) = b$, le nombre $a$ est l'ANTÉCÉDENT et le nombre $b$ est l'IMAGE.",
          "On repère ce qui est dans la parenthèse — le départ — et ce qui est après le signe égal — l'arrivée.",
          `Ici $f(${a}) = ${b}$ : $${a}$ est l'antécédent, $${b}$ est l'image.`,
          sens === "image"
            ? `L'image de $${a}$ par $f$ est $${b}$.`
            : `L'antécédent dont il est question est $${a}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DIAGNOSTIQUER la confusion image / antécédent. Le premier item
    // fait choisir la bonne lecture ; celui-ci met en scène la mauvaise, celle
    // qu'on entend en classe tous les ans, et demande de dire ce qui cloche.
    // ⚠️ Pas de figure : l'écriture $f(a) = b$ se lit sans rien tracer, et une
    // courbe donnerait la réponse en montrant qui est en abscisse.
    kind: "template",
    id: "stmg_fct_rep_notations_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_notations",
    difficulty: 2,
    theme: "neutral",
    hint: "Dans $f(a) = b$, le nombre entre parenthèses est le point de DÉPART.",
    tags: ["stmg", "maths", "fonctions", "diagnostic", "template"],
    generate: () => {
      // Deux réservoirs disjoints : si $a = b$, la phrase de l'élève devient
      // vraie et il n'y aurait plus d'erreur à diagnostiquer.
      const a = pick([-6, -4, -3, -1, 2, 3, 4, 6, 7, 8] as const);
      const b = pick([-9, -7, -2, 1, 5, 9, 11, 12, 15, 20] as const);
      const bonne = `il se trompe : $${a}$ est l'antécédent et $${b}$ est l'image`;
      return {
        text:
          `Un élève lit l'égalité $f(${a}) = ${b}$ et affirme : « l'image de $${b}$ est $${a}$ ». ` +
          `Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `il a raison : dans $f(${a}) = ${b}$, le nombre $${b}$ est l'antécédent`,
          `il se trompe : cette égalité signifie que $${a}$ et $${b}$ ont la même image`,
          `il se trompe : on ne peut rien lire tant que l'expression de $f$ n'est pas donnée`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans l'écriture $f(a) = b$, le nombre $a$ — celui des parenthèses — est l'ANTÉCÉDENT, et le nombre $b$ — celui d'après le signe égal — est l'IMAGE.",
          "On repère le sens de la machine : elle prend le nombre des parenthèses et rend celui de droite.",
          `Ici $f(${a}) = ${b}$ se lit « l'image de $${a}$ par $f$ est $${b}$ », ` +
            `ou encore « $${a}$ est un antécédent de $${b}$ ». L'élève a inversé les deux rôles.`,
          bonne
        ),
        choiceDiagnostics: [
          {
            choice: `il se trompe : on ne peut rien lire tant que l'expression de $f$ n'est pas donnée`,
            cause: "l'égalité suffit : elle donne une image et son antécédent, sans l'expression",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_rep_modeliser ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_rep_modeliser_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_modeliser",
    difficulty: 2,
    theme: "neutral",
    hint: "On repère d'abord la partie FIXE, puis ce qui dépend de la quantité.",
    tags: ["stmg", "maths", "fonctions", "modelisation", "template"],
    generate: () => {
      const fixe = pick([200, 300, 450, 500, 800, 1200] as const);
      const unitaire = pick([3, 4, 5, 8, 12, 15, 20] as const);
      // Le « + 0 » d'un distracteur sans partie fixe s'écrivait en toutes
      // lettres : « $C(x) = 4800x + 0$ ». Personne n'écrit cela au tableau, et
      // une proposition mal écrite se repère sans faire de maths.
      const ecrire = (a: number, b: number) => (b === 0 ? `$C(x) = ${a}x$` : `$C(x) = ${a}x + ${b}$`);
      return {
        text:
          `Un atelier supporte $${fixe}$ € de charges fixes par mois, et chaque article produit coûte $${unitaire}$ €. ` +
          `On note $C(x)$ le coût total pour $x$ articles. Quelle est l'expression de $C$ ?`,
        format: "qcm",
        choices: makeChoices(ecrire(unitaire, fixe), [
          ecrire(fixe, unitaire),
          ecrire(unitaire + fixe, 0),
          ecrire(unitaire * fixe, 0),
          ecrire(unitaire, fixe * 2),
          `$C(x) = ${fixe}x + ${unitaire}x$`,
        ]),
        expected: [ecrire(unitaire, fixe)],
        comparator: "mcq_exact",
        explanation: exp(
          "Modéliser une dépendance entre deux grandeurs, c'est écrire l'une en fonction de l'autre.",
          "On sépare ce qui ne dépend pas de la quantité — les charges fixes — de ce qui lui est proportionnel.",
          `Pour $x$ articles : coût variable $${unitaire}x$, plus $${fixe}$ € de charges fixes, soit $C(x) = ${unitaire}x + ${fixe}$.`,
          `L'expression est ${ecrire(unitaire, fixe)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(fixe, unitaire),
            cause: "a interverti le coût unitaire et les charges fixes",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — l'expression est DONNÉE, c'est la situation qu'on cherche. Le
    // premier item fabrique le modèle ; celui-ci le relit : dans $C(x) = 12x +
    // 500$, que sont ce $12$ et ce $500$ pour l'atelier ? Un modèle qu'on ne
    // sait pas relire ne sert à rien en gestion.
    kind: "template",
    id: "stmg_fct_rep_modeliser_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_modeliser",
    difficulty: 2,
    theme: "neutral",
    hint: "Demande-toi ce que devient le coût pour $x = 0$ : ce qui reste ne dépend pas de la production.",
    tags: ["stmg", "maths", "fonctions", "modelisation", "template"],
    generate: () => {
      const fixe = pick([200, 300, 450, 500, 800, 1200] as const);
      const unitaire = pick([3, 4, 5, 8, 12, 15, 20] as const);
      const surLeCoefficient = Math.random() < 0.5;
      const bonne = surLeCoefficient
        ? "le coût de production d'un article supplémentaire"
        : "les charges fixes, payées même sans produire";
      return {
        text:
          `Le coût total d'un atelier, en euros, pour $x$ articles produits, est $C(x) = ${unitaire}x + ${fixe}$. ` +
          `Que représente le nombre $${surLeCoefficient ? unitaire : fixe}$ dans cette situation ?`,
        format: "qcm",
        choices: shuffle([
          "le coût de production d'un article supplémentaire",
          "les charges fixes, payées même sans produire",
          "le nombre d'articles produits",
          "le coût total de la production",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans un modèle affine $C(x) = ax + b$, le coefficient $a$ est le coût de CHAQUE unité supplémentaire, et $b$ le coût fixe, indépendant de la production.",
          "On calcule $C(0)$ pour isoler la partie fixe, puis on regarde de combien le coût augmente quand $x$ augmente de $1$.",
          `$C(0) = ${fixe}$ : l'atelier paie $${fixe}$ € même sans produire. ` +
            `Et $C(x + 1) - C(x) = ${unitaire}$ : chaque article de plus coûte $${unitaire}$ €.`,
          `Le nombre $${surLeCoefficient ? unitaire : fixe}$ représente ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "le coût total de la production",
            cause: "le coût total est $C(x)$ tout entier, pas l'un de ses deux termes",
          },
        ],
      };
    },
  },

  /* ═══════════ fct_rep_grandeur_composee ═══════════ */

  {
    kind: "template",
    id: "stmg_fct_rep_composee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_grandeur_composee",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux grandeurs sont inversement proportionnelles lorsque leur PRODUIT est constant.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template"],
    generate: () => {
      const k = pick([12, 24, 36, 48, 60, 120] as const);
      const f = (x: number) => k / x;
      const x0 = pick([2, 3, 4, 6] as const);
      return {
        text:
          `La courbe représente le prix unitaire $y$ (en €) en fonction du nombre $x$ d'unités achetées, ` +
          `pour une dépense totale fixée. Quelle relation lie $x$ et $y$ ?`,
        format: "qcm",
        choices: makeChoices(`$x \\times y = ${k}$`, [
          `$x + y = ${k}$`,
          `$y = ${k}x$`,
          `$y = x + ${k}$`,
          `$\\dfrac{x}{y} = ${k}$`,
          `$y = ${k} - x$`,
        ]),
        expected: [`$x \\times y = ${k}$`],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(f, 1, 12, "Prix unitaire en fonction de la quantité", {
          pas: 0.25,
          marques: [{ x: x0, label: `(${x0} ; ${fr(k / x0)})` }],
        }),
        explanation: exp(
          "Deux grandeurs sont inversement proportionnelles lorsque leur produit reste constant : $y = \\dfrac{k}{x}$, c'est-à-dire $xy = k$.",
          "On relève deux points de la courbe et l'on regarde ce qui se conserve : la somme, le quotient, ou le produit.",
          `Au point $(${x0}\\,;\\,${fr(k / x0)})$ : $${x0} \\times ${fr(k / x0)} = ${k}$. ` +
            `Sur un autre point, $(${x0 * 2}\\,;\\,${fr(k / (x0 * 2))})$ : $${x0 * 2} \\times ${fr(k / (x0 * 2))} = ${k}$. Le produit est constant.`,
          `Les deux grandeurs sont inversement proportionnelles : $x \\times y = ${k}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$y = ${k}x$`,
            cause: "a lu une proportionnalité directe alors que la courbe descend",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — QUE DEVIENT $y$ si l'on double $x$ ? Le premier item nomme la
    // relation ; celui-ci la fait fonctionner, et c'est là que la grandeur
    // composée se distingue d'une proportionnalité : avec $x^2$ on quadruple,
    // avec $\frac{1}{x}$ on divise par deux. Le BO demande exactement cette
    // lecture-là.
    kind: "template",
    id: "stmg_fct_rep_composee_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_representation",
    microId: "fct_rep_grandeur_composee",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris $y$ pour $x$, puis pour $2x$, et compare les deux résultats.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template"],
    generate: () => {
      const carre = Math.random() < 0.5;
      const k = carre ? pick([2, 3, 5, 8] as const) : pick([24, 36, 48, 60, 120] as const);
      const f = carre ? (x: number) => k * x * x : (x: number) => k / x;
      const bonne = carre ? "il est multiplié par $4$" : "il est divisé par $2$";
      return {
        text:
          (carre
            ? `La courbe donne le coût $y$ (en €) du revêtement d'une place carrée de côté $x$ mètres : $y = ${k}x^2$. `
            : `La courbe donne le prix unitaire $y$ (en €) en fonction du nombre $x$ d'unités achetées, pour une dépense totale fixée : $y = \\dfrac{${k}}{x}$. `) +
          `Si l'on DOUBLE $x$, que devient $y$ ?`,
        format: "qcm",
        choices: shuffle([
          "il est multiplié par $4$",
          "il est divisé par $2$",
          "il est multiplié par $2$",
          "il ne change pas",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(f, carre ? 0 : 1, carre ? 10 : 12, carre ? "Coût en fonction du côté" : "Prix unitaire en fonction de la quantité", {
          pas: 0.25,
        }),
        explanation: exp(
          carre
            ? "Quand une grandeur dépend du CARRÉ d'une autre, elle ne double pas quand l'autre double : elle est multipliée par $2^2 = 4$."
            : "Quand deux grandeurs sont inversement proportionnelles, leur produit reste constant : si l'une double, l'autre est divisée par deux.",
          "On remplace $x$ par $2x$ dans l'expression, et l'on compare au résultat de départ.",
          carre
            ? `$${k} \\times (2x)^2 = ${k} \\times 4x^2 = 4 \\times ${k}x^2$ : c'est quatre fois la valeur de départ.`
            : `$\\dfrac{${k}}{2x} = \\dfrac{1}{2} \\times \\dfrac{${k}}{x}$ : c'est la moitié de la valeur de départ.`,
          `Si l'on double $x$, ${bonne.replace("il est", "le résultat est")}.`
        ),
        choiceDiagnostics: [
          {
            choice: "il est multiplié par $2$",
            cause: "a raisonné comme dans une proportionnalité, où doubler l'un double l'autre",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_taux_calculer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_taux_calculer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_taux_variation",
    microId: "fct_taux_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Taux de variation $= \\dfrac{f(b) - f(a)}{b - a}$.",
    tags: ["stmg", "maths", "fonctions", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3, 4] as const);
      const b = a + pick([1, 2, 3, 4] as const);
      const A = pick([1, 2, -1, -2] as const);
      const B = pick([0, 2, 4, -3, -5] as const);
      const C = pick([0, 1, 3, -2] as const);
      const f = (x: number) => A * x * x + B * x + C;
      const taux = (f(b) - f(a)) / (b - a);
      return {
        text:
          `Soit $f$ la fonction définie par $f(x) = ${A === 1 ? "" : A === -1 ? "-" : A}x^2 ${B >= 0 ? "+" : "-"} ${Math.abs(B)}x ${C >= 0 ? "+" : "-"} ${Math.abs(C)}$. ` +
          `Calcule le taux de variation de $f$ entre $${a}$ et $${b}$.`,
        format: "short",
        expected: [fr(taux)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux de variation d'une fonction $f$ entre deux valeurs $a$ et $b$ est $\\dfrac{f(b) - f(a)}{b - a}$.",
          "On calcule les deux images, puis on divise l'écart des images par l'écart des abscisses.",
          `$f(${a}) = ${fr(f(a))}$ et $f(${b}) = ${fr(f(b))}$, donc le taux vaut ` +
            `$\\dfrac{${fr(f(b))} - ${fr(f(a))}}{${b} - ${a}} = \\dfrac{${fr(f(b) - f(a))}}{${b - a}} = ${fr(taux)}$.`,
          `Le taux de variation vaut $${fr(taux)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le taux est DONNÉ, l'image manque. Le premier item applique la
    // formule ; celui-ci la retourne, et c'est le geste de la prévision : on
    // connaît le rythme moyen, on cherche où l'on arrive. L'élève qui ajoute le
    // taux sans le multiplier par la durée se trahit tout de suite.
    // ⚠️ Sans figure : la courbe donnerait $f(b)$ à lire, et il n'y aurait plus
    // rien à retrouver. Le premier item n'en porte pas non plus — les deux
    // travaillent une formule, pas une lecture.
    kind: "template",
    id: "stmg_fct_taux_calculer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_taux_variation",
    microId: "fct_taux_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Le taux est un écart d'images DIVISÉ par un écart d'abscisses : pour remonter, on multiplie.",
    tags: ["stmg", "maths", "fonctions", "template", "short"],
    generate: () => {
      // ⛔ La chambre froide est écartée : ses valeurs sont de l'ordre de
      // quelques degrés, et les nombres de cet item (des centaines) donneraient
      // une température absurde.
      const grandeur = pick(GRANDEURS.filter((g) => g.unite !== "°C"));
      const a = randomInt(1, 5);
      const ecart = pick([2, 3, 4, 5] as const);
      const b = a + ecart;
      const taux = pick([-40, -25, -12, 8, 15, 30, 60] as const);
      // ⛔ La valeur de départ doit absorber la baisse : sans ce filtre, un coût
      // de production tombait à $-80$ €.
      const perte = taux < 0 ? Math.abs(taux) * ecart : 0;
      const fa = pick([120, 200, 350, 500, 800, 1000].filter((v) => v - perte >= 50));
      const fb = fa + taux * ecart;
      return {
        text:
          `Le taux de variation ${deNomGrandeur(grandeur.nom)} entre $${a}$ et $${b}$ vaut $${fr(taux)}$. ` +
          `On sait que sa valeur en $${a}$ est $${fa}$ ${grandeur.unite}. ` +
          `Quelle est sa valeur en $${b}$ ?`,
        format: "short",
        expected: [fr(fb)],
        comparator: "number_equal",
        explanation: exp(
          "Le taux de variation entre $a$ et $b$ vaut $\\dfrac{f(b) - f(a)}{b - a}$ : l'écart des images est donc le taux MULTIPLIÉ par l'écart des abscisses.",
          "On multiplie le taux par la longueur de l'intervalle, puis on ajoute le résultat à la valeur de départ.",
          `L'intervalle mesure $${b} - ${a} = ${ecart}$, donc l'écart des images vaut $${fr(taux)} \\times ${ecart} = ${fr(taux * ecart)}$. ` +
            `D'où $${fa} ${taux * ecart >= 0 ? "+" : "-"} ${fr(Math.abs(taux * ecart))} = ${fr(fb)}$.`,
          `La valeur en $${b}$ est $${fr(fb)}$ ${grandeur.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_taux_secante ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_taux_secante_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_taux_variation",
    microId: "fct_taux_secante",
    difficulty: 3,
    theme: "neutral",
    hint: "Le taux de variation entre deux points EST le coefficient directeur de la droite qui les joint.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template"],
    generate: () => {
      const A = pick([1, 2, -1] as const);
      const B = pick([0, 1, -2, 3] as const);
      const C = pick([0, 2, -1] as const);
      const f = (x: number) => A * x * x + B * x + C;
      const a = randomInt(-3, 0);
      const b = a + randomInt(2, 4);
      const pente = (f(b) - f(a)) / (b - a);
      return {
        text:
          `La courbe de $f$ et la droite passant par les points d'abscisses $${a}$ et $${b}$ sont tracées. ` +
          `Que représente le coefficient directeur de cette droite ?`,
        format: "qcm",
        choices: shuffle([
          `le taux de variation de $f$ entre $${a}$ et $${b}$`,
          `l'image de $${a}$ par $f$`,
          `la différence $f(${b}) - f(${a})$`,
          `le nombre dérivé de $f$ en $${a}$`,
        ]),
        expected: [`le taux de variation de $f$ entre $${a}$ et $${b}$`],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: "La courbe de f et sa sécante",
          xmin: -6,
          xmax: 6,
          ymin: -12,
          ymax: 22,
          grille: true,
          courbes: [
            { id: "f", type: "quadratique", a: A, b: B, c: C },
            { id: "sec", type: "affine", a: pente, b: f(a) - pente * a },
          ],
          misesEnEvidence: [{ point: { x: a, y: f(a), label: `A(${a})` } }, { point: { x: b, y: f(b), label: `B(${b})` } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "La droite qui passe par deux points d'une courbe s'appelle une SÉCANTE. Son coefficient directeur est exactement le taux de variation entre les deux abscisses.",
          "On calcule le coefficient directeur avec les deux points, et l'on reconnaît la formule du taux de variation.",
          `$\\dfrac{f(${b}) - f(${a})}{${b} - ${a}} = \\dfrac{${fr(f(b))} - ${fr(f(a))}}{${b - a}} = ${fr(pente)}$ : ` +
            `c'est à la fois la pente de la sécante et le taux de variation.`,
          `Le coefficient directeur de la sécante est le taux de variation de $f$ entre $${a}$ et $${b}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `le nombre dérivé de $f$ en $${a}$`,
            cause: "le nombre dérivé est la pente de la TANGENTE, pas celle d'une sécante entre deux points distincts",
          },
          {
            choice: `la différence $f(${b}) - f(${a})$`,
            cause: "a oublié de diviser par l'écart des abscisses",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la sécante HORIZONTALE, et le piège qu'elle tend. Le premier
    // item nomme ce qu'est la pente d'une sécante ; celui-ci en montre une
    // plate et laisse l'élève conclure « donc $f$ est constante ». La courbe
    // dit le contraire sous ses yeux : entre les deux points, elle est montée
    // puis redescendue. Un taux nul ne dit rien de ce qui se passe ENTRE.
    kind: "template",
    id: "stmg_fct_taux_secante_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_taux_variation",
    microId: "fct_taux_secante",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la courbe entre les deux points, pas seulement ses extrémités.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template"],
    generate: () => {
      const A = pick([1, 2, -1, -2] as const);
      const sommet = randomInt(-1, 1);
      const B = -2 * A * sommet;
      const C = pick([0, 2, -2, 4] as const);
      const f = (x: number) => A * x * x + B * x + C;
      // Deux abscisses symétriques par rapport au sommet : $f(a) = f(b)$, donc
      // la sécante est horizontale et le taux est nul.
      const ecart = pick([2, 3, 4] as const);
      const a = sommet - ecart;
      const b = sommet + ecart;
      const bonne = `$f(${a}) = f(${b})$ : le taux de variation entre $${a}$ et $${b}$ est nul`;
      return {
        text:
          `La courbe de $f$ et la sécante passant par les points d'abscisses $${a}$ et $${b}$ sont tracées. ` +
          `Que peut-on affirmer ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$f$ est constante sur $[${a}\\,;\\,${b}]$`,
          `$f(${a}) < f(${b})$`,
          `le taux de variation entre $${a}$ et $${b}$ vaut $1$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "fonctionGraphique",
          titre: "La courbe de f et sa sécante",
          // ⚠️ La fenêtre se calcule : avec des bornes figées, la parabole la
          // plus ouverte sortait du cadre et les deux points marqués n'y
          // étaient plus.
          xmin: a - 1,
          xmax: b + 1,
          ymin: Math.floor(Math.min(f(a), f(sommet), 0)) - 2,
          ymax: Math.ceil(Math.max(f(a), f(sommet), 0)) + 2,
          grille: true,
          courbes: [
            { id: "f", type: "quadratique", a: A, b: B, c: C },
            { id: "sec", type: "affine", a: 0, b: f(a) },
          ],
          misesEnEvidence: [{ point: { x: a, y: f(a), label: `A(${a})` } }, { point: { x: b, y: f(b), label: `B(${b})` } }],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le taux de variation entre deux abscisses est le coefficient directeur de la sécante qui joint les deux points. Une sécante horizontale a un coefficient directeur NUL.",
          "On lit les deux images : si elles sont égales, le taux est nul. Puis on regarde ce que fait la courbe ENTRE les deux points.",
          `$f(${a}) = f(${b}) = ${fr(f(a))}$, donc le taux vaut $\\dfrac{${fr(f(b))} - ${fr(f(a))}}{${b} - ${a}} = 0$. ` +
            `Mais entre les deux, la courbe ${A > 0 ? "descend jusqu'à son minimum puis remonte" : "monte jusqu'à son maximum puis redescend"} : ` +
            `$f$ n'est pas constante.`,
          `Le taux est nul parce que les deux images sont égales — cela ne dit rien de ce qui se passe entre les deux.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f$ est constante sur $[${a}\\,;\\,${b}]$`,
            cause: "un taux de variation nul compare seulement les deux extrémités : la courbe fait ce qu'elle veut entre les deux",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_taux_interpreter ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_taux_interpreter_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_taux_variation",
    microId: "fct_taux_interpreter",
    difficulty: 3,
    theme: "neutral",
    hint: "Un taux de variation s'exprime dans l'unité de la grandeur PAR unité de la variable.",
    tags: ["stmg", "maths", "fonctions", "open", "template"],
    generate: () => {
      const grandeur = pick(GRANDEURS);
      const debut = randomInt(1, 4);
      const fin = debut + randomInt(2, 5);
      const taux = pick([-45, -20, -8, 12, 25, 60, 150] as const);
      return {
        text:
          `Le taux de variation ${deNomGrandeur(grandeur.nom)} entre ${grandeur.variable} $= ${debut}$ et $= ${fin}$ vaut $${fr(taux)}$. ` +
          `Interprète ce nombre dans le contexte.`,
        format: "open",
        // L'unité n'est retenue comme mot-clé que si elle fait plus de deux
        // caractères : « € » ou « °C » seraient validés par toute réponse
        // citant un montant ou une température, sans aucune interprétation.
        expected: [
          "moyenne",
          "en moyenne",
          "par unite",
          "par unité",
          ...(grandeur.unite.length > 2 ? [grandeur.unite] : []),
          taux < 0 ? "baisse" : "hausse",
        ],
        comparator: "contains_keyword",
        explanation: exp(
          "Un taux de variation mesure la variation MOYENNE de la grandeur par unité de la variable, sur l'intervalle considéré.",
          "On donne l'unité du résultat : celle de la grandeur, divisée par celle de la variable.",
          `Ici le taux vaut $${fr(taux)}$ : sur cet intervalle, ${grandeur.nom} ${taux < 0 ? "baisse" : "augmente"} ` +
            `en moyenne de $${fr(Math.abs(taux))}$ ${grandeur.unite} par unité ${deVariable(grandeur.variable)}.`,
          `Par exemple : « Entre ${debut} et ${fin}, ${grandeur.nom} ${taux < 0 ? "diminue" : "augmente"} en moyenne de ${fr(Math.abs(taux))} ${grandeur.unite} par unité. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'interprétation SÉCURISÉE par un QCM. Le premier item est une
    // question ouverte, validée par mots-clés : un élève qui écrit « ça monte »
    // passe, un élève qui écrit la bonne phrase sans le mot « moyenne » échoue.
    // Ici les quatre lectures sont posées côte à côte, et l'unité — des euros
    // PAR unité produite — départage à elle seule.
    kind: "template",
    id: "stmg_fct_taux_interpreter_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_taux_variation",
    microId: "fct_taux_interpreter",
    difficulty: 2,
    theme: "neutral",
    hint: "Un taux de variation porte deux unités : celle de la grandeur, DIVISÉE par celle de la variable.",
    tags: ["stmg", "maths", "fonctions", "template"],
    generate: () => {
      const q1 = pick([20, 40, 50, 100] as const);
      const q2 = q1 + pick([20, 50, 100] as const);
      const taux = pick([6, 8, 12, 15, 25] as const);
      const c1 = pick([400, 600, 900, 1500] as const);
      const c2 = c1 + taux * (q2 - q1);
      const bonne = `chaque article supplémentaire coûte en moyenne $${taux}$ € de plus`;
      return {
        text:
          `Le coût de production passe de $${c1}$ € à $${c2}$ € quand la quantité produite passe de $${q1}$ à $${q2}$ articles. ` +
          `Le taux de variation vaut $${taux}$. Que signifie ce nombre ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `le coût de production a augmenté de $${taux}\\,\\%$`,
          `la production a augmenté de $${taux}$ articles`,
          `le coût total de production est de $${taux}$ €`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un taux de variation est une variation MOYENNE par unité de la variable : ici, des euros par article.",
          "On divise l'écart des coûts par l'écart des quantités, et l'on garde les deux unités.",
          `$\\dfrac{${c2} - ${c1}}{${q2} - ${q1}} = \\dfrac{${c2 - c1}}{${q2 - q1}} = ${taux}$ € par article.`,
          `Entre $${q1}$ et $${q2}$ articles, chaque article supplémentaire coûte en moyenne $${taux}$ € de plus.`
        ),
        choiceDiagnostics: [
          {
            choice: `le coût de production a augmenté de $${taux}\\,\\%$`,
            cause: "a lu le taux de variation comme un pourcentage ; ce n'est pas la même chose qu'un taux d'évolution",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_mono_signe_taux ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_mono_signe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_monotonie",
    microId: "fct_mono_signe_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "Un taux de variation positif sur tout un intervalle signifie que la fonction y monte.",
    tags: ["stmg", "maths", "fonctions", "template"],
    generate: () => {
      const taux = pick([-32, -18, -5, -1.5, 2, 7, 14, 40] as const);
      const a = randomInt(0, 4);
      const b = a + randomInt(2, 6);
      return {
        text:
          `Sur l'intervalle $[${a}\\,;\\,${b}]$, tous les taux de variation d'une fonction $f$ sont égaux à $${fr(taux)}$. ` +
          `Que peut-on en déduire ?`,
        format: "qcm",
        choices: shuffle([
          `$f$ est ${taux > 0 ? "croissante" : "décroissante"} sur $[${a}\\,;\\,${b}]$`,
          `$f$ est ${taux > 0 ? "décroissante" : "croissante"} sur $[${a}\\,;\\,${b}]$`,
          `$f$ est constante sur $[${a}\\,;\\,${b}]$`,
          `on ne peut rien en déduire`,
        ]),
        expected: [`$f$ est ${taux > 0 ? "croissante" : "décroissante"} sur $[${a}\\,;\\,${b}]$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le signe du taux de variation donne le sens de variation : positif, la fonction croît ; négatif, elle décroît ; nul, elle est constante.",
          "On regarde le SIGNE du taux, pas sa valeur.",
          `Ici le taux vaut $${fr(taux)}$, qui est ${taux > 0 ? "positif" : "négatif"} sur tout l'intervalle.`,
          `$f$ est ${taux > 0 ? "croissante" : "décroissante"} sur $[${a}\\,;\\,${b}]$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le lien LU DANS L'AUTRE SENS. Le premier item part du taux et
    // conclut sur la monotonie ; celui-ci part de la monotonie et demande ce
    // qu'on sait des taux. C'est la même équivalence, mais l'élève qui l'a
    // apprise dans un seul sens ne la retrouve pas dans l'autre.
    kind: "template",
    id: "stmg_fct_mono_signe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_monotonie",
    microId: "fct_mono_signe_taux",
    difficulty: 2,
    theme: "neutral",
    hint: "Si la fonction descend partout sur l'intervalle, chaque écart d'images est négatif.",
    tags: ["stmg", "maths", "fonctions", "template"],
    generate: () => {
      const croissante = Math.random() < 0.5;
      const a = randomInt(-4, 3);
      const b = a + randomInt(3, 6);
      const bonne = croissante
        ? "ils sont tous positifs"
        : "ils sont tous négatifs";
      return {
        text:
          `Une fonction $f$ est ${croissante ? "croissante" : "décroissante"} sur $[${a}\\,;\\,${b}]$. ` +
          `Que peut-on dire de ses taux de variation entre deux valeurs de cet intervalle ?`,
        format: "qcm",
        choices: shuffle([
          "ils sont tous positifs",
          "ils sont tous négatifs",
          "ils sont tous nuls",
          "ils changent de signe selon les deux valeurs choisies",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Monotonie et signe du taux de variation disent la même chose : $f$ est croissante sur un intervalle si et seulement si tous ses taux de variation y sont positifs.",
          "On prend deux valeurs $u < v$ de l'intervalle et on regarde le signe de $f(v) - f(u)$ : le dénominateur $v - u$, lui, est toujours positif.",
          croissante
            ? `$f$ monte : pour $u < v$, on a $f(u) < f(v)$, donc $f(v) - f(u) > 0$ et le quotient est positif.`
            : `$f$ descend : pour $u < v$, on a $f(u) > f(v)$, donc $f(v) - f(u) < 0$ et le quotient est négatif.`,
          `Sur $[${a}\\,;\\,${b}]$, ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "ils changent de signe selon les deux valeurs choisies",
            cause: "c'est ce qui arriverait sur un intervalle où $f$ n'est PAS monotone",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_mono_tableau ═══════════════════ */

  {
    kind: "template",
    id: "stmg_fct_mono_tableau_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_monotonie",
    microId: "fct_mono_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Un tableau de variations se lit de gauche à droite : les flèches disent où la fonction monte et où elle descend.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template"],
    generate: () => {
      const borneG = randomInt(-6, -2);
      const sommet = randomInt(-1, 2);
      const borneD = sommet + randomInt(2, 5);
      // Les trois valeurs du tableau doivent être DEUX À DEUX DISTINCTES, et
      // distinctes des abscisses : sinon les propositions du QCM se recoupent
      // et l'élève n'a plus quatre lignes à départager.
      const maxi = randomInt(30, 48);
      const gauche = randomInt(10, 19);
      const droite = randomInt(20, 29);
      const question = pick(["maximum", "intervalle_croissance", "valeur_bord"] as const);
      const bonne =
        question === "maximum"
          ? `$${maxi}$, atteint en $x = ${sommet}$`
          : question === "intervalle_croissance"
            ? `$[${borneG}\\,;\\,${sommet}]$`
            : `$${droite}$`;
      return {
        text:
          question === "maximum"
            ? "D'après le tableau de variations, quel est le maximum de $f$, et où est-il atteint ?"
            : question === "intervalle_croissance"
              ? "D'après le tableau de variations, sur quel intervalle $f$ est-elle croissante ?"
              : `D'après le tableau de variations, que vaut $f(${borneD})$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          question === "maximum"
            ? `$${sommet}$, atteint en $x = ${maxi}$`
            : question === "intervalle_croissance"
              ? `$[${sommet}\\,;\\,${borneD}]$`
              : `$${gauche}$`,
          question === "maximum"
            ? `$${gauche}$, atteint en $x = ${borneG}$`
            : question === "intervalle_croissance"
              ? `$[${borneG}\\,;\\,${borneD}]$`
              : `$${maxi}$`,
          question === "maximum"
            ? `$${droite}$, atteint en $x = ${borneD}$`
            : question === "intervalle_croissance"
              ? `$[${sommet}\\,;\\,${sommet + 1}]$`
              : `$${sommet}$`,
          question === "maximum"
            ? `$${maxi}$, atteint en $x = ${borneG}$`
            : question === "intervalle_croissance"
              ? "sur aucun intervalle"
              : `$${borneD}$`,
          question === "maximum"
            ? `$${droite}$, atteint en $x = ${sommet}$`
            : question === "intervalle_croissance"
              ? `$[${borneG}\\,;\\,${sommet - 1}]$`
              : `$${gauche + droite}$`,
          question === "maximum"
            ? `$${gauche}$, atteint en $x = ${sommet}$`
            : question === "intervalle_croissance"
              ? `$[${sommet + 1}\\,;\\,${borneD}]$`
              : `$${maxi - droite}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: "Tableau de variations de f",
          caption: "↗ la fonction croît · ↘ la fonction décroît",
          headers: ["x", String(borneG), "→", String(sommet), "→", String(borneD)],
          rows: [
            { label: "Variations", values: [String(gauche), "↗", String(maxi), "↘", String(droite)] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Un tableau de variations résume, de gauche à droite, les intervalles où la fonction croît et ceux où elle décroît, avec les valeurs atteintes aux bornes et aux extremums.",
          "On suit les flèches : une flèche montante signale une croissance, une flèche descendante une décroissance ; le sommet est au changement de sens.",
          `Ici $f$ croît de $${gauche}$ jusqu'à $${maxi}$ entre $${borneG}$ et $${sommet}$, puis décroît jusqu'à $${droite}$ en $${borneD}$.`,
          question === "maximum"
            ? `Le maximum est $${maxi}$, atteint en $x = ${sommet}$.`
            : question === "intervalle_croissance"
              ? `$f$ est croissante sur $[${borneG}\\,;\\,${sommet}]$.`
              : `$f(${borneD}) = ${droite}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DRESSER le tableau, au lieu de le lire. Le premier item donne
    // le tableau tout fait ; celui-ci donne la courbe et demande le nombre de
    // morceaux monotones — c'est le premier geste du tracé d'un tableau, et
    // celui qu'on saute : combien de colonnes faut-il ?
    kind: "template",
    id: "stmg_fct_mono_tableau_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_monotonie",
    microId: "fct_mono_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les endroits où la courbe s'arrête de monter pour descendre, ou l'inverse.",
    tags: ["stmg", "maths", "fonctions", "canvas", "template", "short"],
    generate: () => {
      const deuxVirages = Math.random() < 0.5;
      const a = pick([1, -1] as const);
      if (!deuxVirages) {
        // Une parabole : un seul changement de sens.
        const sommet = randomInt(-2, 2);
        // ⛔ Le décalage est tiré UNE fois, hors de la fonction : appelé à
        // l'intérieur, `pick` rendait une constante différente à chaque point
        // et la courbe devenait un nuage.
        const decalage = pick([0, 2, -2] as const);
        const f = (x: number) => a * (x - sommet) * (x - sommet) + decalage;
        return {
          text:
            `La courbe de $f$ est tracée. ` +
            `Combien de fois $f$ change-t-elle de sens de variation sur l'intervalle représenté ?`,
          format: "short" as const,
          expected: ["1"],
          comparator: "number_equal" as const,
          canvas: canvasCourbePoints(f, -6, 6, "Représentation graphique de f", { pas: 0.25 }),
          explanation: exp(
            "Une fonction est monotone par morceaux lorsqu'on peut découper son intervalle en portions où elle ne fait que monter, ou que descendre. Chaque changement de sens sépare deux morceaux.",
            "On parcourt la courbe de gauche à droite et on compte les sommets et les creux.",
            `La courbe ${a > 0 ? "descend puis remonte : elle a un creux" : "monte puis redescend : elle a un sommet"} en $x = ${sommet}$, et c'est le seul.`,
            `$f$ change de sens une seule fois : son tableau de variations aura deux morceaux.`
          ),
        };
      }
      // Une courbe de degré 3, construite à partir de sa dérivée
      // $f'(x) = a(x - p)(x - q)$ : elle a exactement deux virages, en $p$ et
      // en $q$. L'expression n'est jamais affichée — seule la courbe l'est —,
      // donc ses coefficients fractionnaires ne gênent personne.
      const p = randomInt(-4, -1);
      const q = p + randomInt(2, 5);
      const f = (x: number) => a * ((x * x * x) / 3 - ((p + q) / 2) * x * x + p * q * x);
      return {
        text:
          `La courbe de $f$ est tracée. ` +
          `Combien de fois $f$ change-t-elle de sens de variation sur l'intervalle représenté ?`,
        format: "short" as const,
        expected: ["2"],
        comparator: "number_equal" as const,
        canvas: canvasCourbePoints(f, p - 2, q + 2, "Représentation graphique de f", { pas: 0.2 }),
        explanation: exp(
          "Une fonction est monotone par morceaux lorsqu'on peut découper son intervalle en portions où elle ne fait que monter, ou que descendre. Chaque changement de sens sépare deux morceaux.",
          "On parcourt la courbe de gauche à droite et on compte les sommets et les creux.",
          `La courbe change de sens en $x = ${p}$, puis une seconde fois en $x = ${q}$.`,
          `$f$ change de sens deux fois : son tableau de variations aura trois morceaux.`
        ),
      };
    },
  },

  /* ═══════════ fct_mono_comparer_images ═══════════ */

  {
    kind: "template",
    id: "stmg_fct_mono_comparer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_monotonie",
    microId: "fct_mono_comparer_images",
    difficulty: 3,
    theme: "neutral",
    hint: "Sur un intervalle où $f$ est croissante, l'ordre des nombres est CONSERVÉ ; s'il est décroissant, il est inversé.",
    tags: ["stmg", "maths", "fonctions", "template"],
    generate: () => {
      const croissante = Math.random() < 0.5;
      const a = randomInt(-4, 3);
      const b = a + randomInt(1, 4);
      const borneG = a - randomInt(1, 3);
      const borneD = b + randomInt(1, 3);
      const bonne = croissante ? `$f(${a}) < f(${b})$` : `$f(${a}) > f(${b})$`;
      return {
        text:
          `Une fonction $f$ est ${croissante ? "croissante" : "décroissante"} sur $[${borneG}\\,;\\,${borneD}]$. ` +
          `Sans calculer, compare $f(${a})$ et $f(${b})$.`,
        format: "qcm",
        choices: shuffle([
          `$f(${a}) < f(${b})$`,
          `$f(${a}) > f(${b})$`,
          `$f(${a}) = f(${b})$`,
          "on ne peut pas comparer sans connaître l'expression de $f$",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction croissante conserve l'ordre : si $a < b$ alors $f(a) < f(b)$. Une fonction décroissante l'inverse.",
          "On vérifie d'abord que les deux nombres sont dans l'intervalle de monotonie, puis on applique la règle.",
          `$${a} < ${b}$, et les deux appartiennent à $[${borneG}\\,;\\,${borneD}]$ où $f$ est ${croissante ? "croissante" : "décroissante"} : ` +
            `l'ordre est donc ${croissante ? "conservé" : "inversé"}.`,
          `On a ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas comparer sans connaître l'expression de $f$",
            cause: "la monotonie suffit à comparer deux images : c'est même à cela qu'elle sert",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — et si les deux nombres ne sont PAS dans le même morceau ? Le
    // premier item donne une seule monotonie et l'ordre suit toujours ; ici la
    // fonction monte puis descend, et une fois sur deux la comparaison est
    // impossible. C'est la condition que l'élève oublie : la règle ne vaut que
    // SUR UN INTERVALLE de monotonie.
    kind: "template",
    id: "stmg_fct_mono_comparer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_monotonie",
    microId: "fct_mono_comparer_images",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie D'ABORD que les deux nombres sont dans le même morceau : sinon, la monotonie ne dit plus rien.",
    tags: ["stmg", "maths", "fonctions", "template"],
    generate: () => {
      const borneG = randomInt(-6, -4);
      const sommet = randomInt(-1, 1);
      const borneD = sommet + randomInt(3, 5);
      const croissantePuisDecroissante = Math.random() < 0.5;
      const memeMorceau = Math.random() < 0.5;
      // Deux valeurs dans le même morceau, ou de part et d'autre du sommet.
      const a = memeMorceau
        ? pick([borneG + 1, borneG + 2, sommet - 1].filter((v) => v < sommet))
        : randomInt(borneG + 1, sommet - 1);
      const b = memeMorceau
        ? a + 1 <= sommet
          ? a + 1
          : sommet
        : randomInt(sommet + 1, borneD - 1);
      const surLeMorceauGauche = croissantePuisDecroissante ? "croissante" : "décroissante";
      const impossible =
        "on ne peut pas conclure : les deux nombres ne sont pas dans le même intervalle de monotonie";
      const bonne = !memeMorceau
        ? impossible
        : croissantePuisDecroissante
          ? `$f(${a}) < f(${b})$`
          : `$f(${a}) > f(${b})$`;
      return {
        text:
          `Une fonction $f$ est ${surLeMorceauGauche} sur $[${borneG}\\,;\\,${sommet}]$, ` +
          `puis ${croissantePuisDecroissante ? "décroissante" : "croissante"} sur $[${sommet}\\,;\\,${borneD}]$. ` +
          `Sans calculer, compare $f(${a})$ et $f(${b})$.`,
        format: "qcm",
        choices: shuffle([`$f(${a}) < f(${b})$`, `$f(${a}) > f(${b})$`, `$f(${a}) = f(${b})$`, impossible]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Une fonction croissante conserve l'ordre, une fonction décroissante l'inverse — mais seulement SUR UN INTERVALLE où elle est monotone.",
          "On situe d'abord les deux nombres par rapport au changement de sens, puis on applique la règle si, et seulement si, ils sont du même côté.",
          memeMorceau
            ? `$${a}$ et $${b}$ appartiennent tous deux à $[${borneG}\\,;\\,${sommet}]$, où $f$ est ${surLeMorceauGauche} : ` +
              `l'ordre est donc ${croissantePuisDecroissante ? "conservé" : "inversé"}.`
            : `$${a}$ est avant le changement de sens et $${b}$ après : la fonction monte puis descend entre les deux. ` +
              `Rien n'impose alors que l'une des deux images soit la plus grande.`,
          memeMorceau ? `On a ${bonne}.` : `Avec ces seules informations, la comparaison est impossible.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(${a}) = f(${b})$`,
            cause: "deux images égales sont possibles, mais rien ici ne le garantit",
          },
        ],
      };
    },
  },
];
