// lib/tutor-v4/questionBank/premiere/maths/parabole.bank.ts
//
// Notions : quad_parabole, quad_sommet_axe, quad_variations, quad_racines_signe
//           (domaine BOP1MQ — Modélisation quadratique)
//
// ⛔ DEUX INTERDITS DU PROGRAMME, tenus dans chaque item de ce fichier :
//
//   1. LE DISCRIMINANT N'EST PAS AU PROGRAMME. « Racines et signe d'un polynôme
//      de degré 2 donné sous forme FACTORISÉE (le calcul des racines à l'aide
//      du discriminant ne figure pas au programme). » On ne calcule donc jamais
//      Δ : les racines se lisent sur la forme factorisée, ou sur la courbe.
//
//   2. AUCUNE FORMULE N'EST ATTENDUE pour les éléments caractéristiques.
//      « On déterminera l'axe de symétrie par exemple en résolvant f(x) = c. »
//      Les explications suivent donc cette méthode — les deux points de même
//      ordonnée c sont symétriques, l'axe passe à mi-chemin — et non « −b/2a ».
//
// Formes au programme : x ↦ ax², x ↦ ax² + c, x ↦ a(x − x₁)(x − x₂).
//
// Situations du BO : le mouvement parabolique, l'arche d'un pont ou d'un viaduc,
// le chiffre d'affaires en fonction du prix unitaire, une population qui croît
// puis décroît.

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

function canvasParabole(
  a: number,
  b: number,
  c: number,
  options?: { titre?: string; points?: { x: number; y: number; label?: string }[] }
): CanvasFigure {
  return {
    kind: "fonctionGraphique",
    titre: options?.titre ?? "La courbe de f",
    xmin: -6,
    xmax: 6,
    ymin: -10,
    ymax: 10,
    grille: true,
    courbes: [{ id: "f", type: "quadratique", a, b, c, couleur: "#e11d48" }],
    points: options?.points,
  };
}

export const paraboleBank: TutorBankItemV4[] = [
  /* ═══════════════ quad_associer_parabole ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_associer_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_parabole",
    microId: "quad_associer_parabole",
    difficulty: 3,
    theme: "neutral",
    hint: "Une forme factorisée $a(x - x_1)(x - x_2)$ montre directement où la courbe coupe l'axe des abscisses.",
    tags: ["premiere", "maths", "parabole", "template"],
    generate: () => {
      const x1 = pick([-3, -2, -1] as const);
      const x2 = pick([1, 2, 3] as const);
      const a = pick([1, -1] as const);
      // a(x − x1)(x − x2) = a·x² − a(x1+x2)·x + a·x1·x2
      return {
        text:
          `La courbe ci-contre coupe l'axe des abscisses en $${x1}$ et en $${x2}$, ` +
          `et elle est tournée vers le ${a > 0 ? "haut" : "bas"}. Quelle expression lui correspond ?`,
        format: "qcm",
        choices: makeChoices(
          `$f(x) = ${a > 0 ? "" : "-"}(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x ${x2 < 0 ? "+" : "-"} ${Math.abs(x2)})$`,
          [
            `$f(x) = ${a > 0 ? "-" : ""}(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x ${x2 < 0 ? "+" : "-"} ${Math.abs(x2)})$`,
            `$f(x) = ${a > 0 ? "" : "-"}(x ${x1 < 0 ? "-" : "+"} ${Math.abs(x1)})(x ${x2 < 0 ? "-" : "+"} ${Math.abs(x2)})$`,
            `$f(x) = ${a > 0 ? "" : "-"}x^2 + ${Math.abs(x1 * x2)}$`,
          ]
        ),
        expected: [
          `$f(x) = ${a > 0 ? "" : "-"}(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x ${x2 < 0 ? "+" : "-"} ${Math.abs(x2)})$`,
        ],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, -a * (x1 + x2), a * x1 * x2),
        explanation: exp(
          "Sous la forme $a(x - x_1)(x - x_2)$, les nombres $x_1$ et $x_2$ sont les racines : les abscisses où la courbe coupe l'axe.",
          "On lit les racines sur le graphique, puis on regarde le sens d'ouverture pour le signe de $a$.",
          `Racines $${x1}$ et $${x2}$ : les facteurs sont $(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})$ et $(x ${x2 < 0 ? "+" : "-"} ${Math.abs(x2)})$. ` +
            `La parabole est tournée vers le ${a > 0 ? "haut, donc $a > 0$" : "bas, donc $a < 0$"}.`,
          `L'expression est $f(x) = ${a > 0 ? "" : "-"}(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x ${x2 < 0 ? "+" : "-"} ${Math.abs(x2)})$. ` +
            `⚠️ Une racine de $${x1}$ donne le facteur $(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})$ : les signes s'inversent.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${a > 0 ? "" : "-"}(x ${x1 < 0 ? "-" : "+"} ${Math.abs(x1)})(x ${x2 < 0 ? "-" : "+"} ${Math.abs(x2)})$`,
            cause: "a recopié les racines sans inverser leur signe dans les facteurs",
          },
        ],
      };
    },
  },

  /* ═══════════════ quad_role_a ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_role_a_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_parabole",
    microId: "quad_role_a",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe de $a$ décide du sens dans lequel la parabole est tournée.",
    tags: ["premiere", "maths", "parabole", "template"],
    generate: () => {
      const a = pick([-2, -1, -0.5, 0.5, 1, 2] as const);
      const c = pick([-3, 0, 2] as const);
      return {
        text: `La courbe ci-contre représente $f(x) = ax^2 + ${fr(c)}$. Que peut-on dire du coefficient $a$ ?`,
        format: "qcm",
        choices: makeChoices(a > 0 ? "$a$ est positif" : "$a$ est négatif", [
          a > 0 ? "$a$ est négatif" : "$a$ est positif",
          "$a$ est nul",
          "on ne peut pas connaître son signe",
        ]),
        expected: [a > 0 ? "$a$ est positif" : "$a$ est négatif"],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, 0, c),
        explanation: exp(
          "Le coefficient $a$ commande l'orientation de la parabole : vers le haut si $a > 0$, vers le bas si $a < 0$.",
          "On regarde de quel côté s'ouvre la courbe.",
          `Ici la parabole s'ouvre vers le ${a > 0 ? "haut" : "bas"}, donc $a$ est ${a > 0 ? "positif" : "négatif"} (il vaut $${fr(a)}$).`,
          `$a$ est ${a > 0 ? "positif" : "négatif"} : la fonction admet donc un ${a > 0 ? "minimum" : "maximum"}.`
        ),
      };
    },
  },

  /* ═══════════════ quad_role_c ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_role_c_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_parabole",
    microId: "quad_role_c",
    difficulty: 2,
    theme: "neutral",
    hint: "Où la courbe coupe-t-elle l'axe vertical ?",
    tags: ["premiere", "maths", "parabole", "template", "short"],
    generate: () => {
      const a = pick([0.5, 1] as const);
      const c = pick([-4, -2, 1, 3] as const);
      return {
        text: `La courbe ci-contre représente $f(x) = ${fr(a)}x^2 + c$. Combien vaut $c$ ?`,
        format: "short",
        expected: [fr(c)],
        comparator: "number_equal",
        canvas: canvasParabole(a, 0, c),
        explanation: exp(
          "Dans $f(x) = ax^2 + c$, le nombre $c$ translate la parabole verticalement.",
          "On calcule $f(0)$ : c'est l'ordonnée du point où la courbe coupe l'axe vertical.",
          `$f(0) = ${fr(a)} \\times 0^2 + c = c$, et la courbe coupe l'axe des ordonnées en $${fr(c)}$.`,
          `$c = ${fr(c)}$ : la parabole $y = ${fr(a)}x^2$ a été déplacée de $${fr(Math.abs(c))}$ vers le ${c > 0 ? "haut" : "bas"}.`
        ),
      };
    },
  },

  /* ═══════════════ quad_image_calculer ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_image_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_parabole",
    microId: "quad_image_calculer",
    difficulty: 2,
    theme: "neutral",
    hint: "Attention au carré d'un nombre négatif : il est positif.",
    tags: ["premiere", "maths", "parabole", "template", "short"],
    generate: () => {
      const a = pick([1, 2] as const);
      const b = pick([-3, -1, 2, 4] as const);
      const c = pick([-2, 1, 3] as const);
      const x = pick([-2, -1, 2, 3] as const);
      return {
        text:
          `Soit $f(x) = ${a === 1 ? "" : fr(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$. ` +
          `Combien vaut $f(${x})$ ?`,
        format: "short",
        expected: [fr(a * x * x + b * x + c)],
        comparator: "number_equal",
        explanation: exp(
          "Calculer une image, c'est remplacer $x$ par la valeur donnée dans l'expression.",
          "On remplace, en mettant la valeur entre parenthèses quand elle est négative.",
          `$f(${x}) = ${a === 1 ? "" : fr(a) + " \\times "}(${x})^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)} \\times (${x}) ${c >= 0 ? "+" : "-"} ${Math.abs(c)} = ${fr(a * x * x + b * x + c)}$.`,
          `$f(${x}) = ${fr(a * x * x + b * x + c)}$.${x < 0 ? ` ⚠️ $(${x})^2 = ${x * x}$, positif : c'est là qu'on perd un signe.` : ""}`
        ),
      };
    },
  },

  /* ═══════════════ quad_lire_racines_courbe ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_racines_courbe_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_parabole",
    microId: "quad_lire_racines_courbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Les racines sont les abscisses des points où la courbe rencontre l'axe horizontal.",
    tags: ["premiere", "maths", "parabole", "racines", "template", "short"],
    generate: () => {
      const x1 = pick([-4, -3, -2] as const);
      const x2 = pick([1, 2, 3] as const);
      return {
        text:
          `La courbe ci-contre coupe l'axe des abscisses en deux points. ` +
          `Quelle est la PLUS GRANDE des deux racines ?`,
        format: "short",
        expected: [fr(x2)],
        comparator: "number_equal",
        canvas: canvasParabole(1, -(x1 + x2), x1 * x2),
        explanation: exp(
          "Une racine d'une fonction est une valeur de $x$ pour laquelle $f(x) = 0$.",
          "Sur la courbe, ce sont les abscisses des points d'intersection avec l'axe horizontal.",
          `La courbe coupe l'axe en $${x1}$ et en $${x2}$.`,
          `La plus grande racine est $${fr(x2)}$. La forme factorisée correspondante serait $(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x - ${x2})$.`
        ),
      };
    },
  },

  /* ═══════════════ quad_allure ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_allure_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_sommet_axe",
    microId: "quad_allure",
    difficulty: 2,
    theme: "neutral",
    hint: "Parabole vers le haut : un minimum. Vers le bas : un maximum.",
    tags: ["premiere", "maths", "parabole", "template"],
    generate: () => {
      const a = pick([-2, -1, 1, 2] as const);
      const b = pick([-4, -2, 2, 4] as const);
      return {
        text:
          `Une fonction est définie par $f(x) = ${fr(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x$. ` +
          `Sans calcul, que peut-on dire de sa courbe ?`,
        format: "qcm",
        choices: makeChoices(
          a > 0 ? "elle est tournée vers le haut et admet un minimum" : "elle est tournée vers le bas et admet un maximum",
          [
            a > 0 ? "elle est tournée vers le bas et admet un maximum" : "elle est tournée vers le haut et admet un minimum",
            "c'est une droite",
            "elle n'admet ni maximum ni minimum",
          ]
        ),
        expected: [
          a > 0
            ? "elle est tournée vers le haut et admet un minimum"
            : "elle est tournée vers le bas et admet un maximum",
        ],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, b, 0),
        explanation: exp(
          "Le signe du coefficient de $x^2$ suffit à connaître l'allure de la parabole.",
          "On regarde ce signe, sans rien calculer d'autre.",
          `Ici $a = ${fr(a)}$, donc $a ${a > 0 ? ">" : "<"} 0$.`,
          `La parabole est tournée vers le ${a > 0 ? "haut" : "bas"} : elle admet un ${a > 0 ? "minimum" : "maximum"}, atteint à son sommet.`
        ),
      };
    },
  },

  /* ═══════════════ quad_axe_symetrie ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_axe_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_sommet_axe",
    microId: "quad_axe_symetrie",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux points de MÊME ordonnée sont symétriques : l'axe passe à mi-chemin entre eux.",
    tags: ["premiere", "maths", "parabole", "symetrie", "template", "short"],
    generate: () => {
      const a = pick([1, 2] as const);
      const b = pick([-8, -6, -4, 4, 6, 8] as const);
      const c = pick([-2, 0, 3] as const);
      // f(x) = c a pour solutions 0 et −b/a : l'axe passe au milieu.
      const autreSolution = -b / a;
      const axe = autreSolution / 2;
      return {
        text:
          `Soit $f(x) = ${a === 1 ? "" : fr(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$. ` +
          `En résolvant $f(x) = ${fr(c)}$, détermine l'abscisse de l'axe de symétrie de la parabole.`,
        format: "short",
        expected: [fr(axe)],
        comparator: "number_equal",
        canvas: canvasParabole(a, b, c),
        explanation: exp(
          "Deux points de la parabole ayant la même ordonnée sont symétriques par rapport à l'axe : celui-ci passe au milieu de leurs abscisses. Aucune formule n'est nécessaire.",
          `On résout $f(x) = ${fr(c)}$, c'est-à-dire ${a === 1 ? "" : fr(a) + " "}$x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x = 0$, qui se factorise en $x(${a === 1 ? "" : fr(a)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}) = 0$.`,
          `Les solutions sont $x = 0$ et $x = ${fr(autreSolution)}$. Le milieu vaut $\\dfrac{0 + ${fr(autreSolution)}}{2} = ${fr(axe)}$.`,
          `L'axe de symétrie a pour équation $x = ${fr(axe)}$ — obtenu sans discriminant et sans formule, comme le demande le programme.`
        ),
      };
    },
  },

  /* ═══════════════ quad_sommet ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_sommet_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_sommet_axe",
    microId: "quad_sommet",
    difficulty: 4,
    theme: "neutral",
    hint: "Le sommet est sur l'axe de symétrie : son abscisse connue, son ordonnée se calcule.",
    tags: ["premiere", "maths", "parabole", "sommet", "template", "short"],
    generate: () => {
      const a = pick([1, 2] as const);
      const sommetX = pick([-2, -1, 1, 2] as const);
      const b = -2 * a * sommetX;
      const c = pick([-3, 0, 2] as const);
      const sommetY = a * sommetX * sommetX + b * sommetX + c;
      return {
        text:
          `La parabole ci-contre a pour axe de symétrie la droite d'équation $x = ${fr(sommetX)}$, ` +
          `et $f(x) = ${a === 1 ? "" : fr(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$. ` +
          `Quelle est l'ORDONNÉE du sommet ?`,
        format: "short",
        expected: [fr(sommetY)],
        comparator: "number_equal",
        canvas: canvasParabole(a, b, c, {
          points: [{ x: sommetX, y: sommetY, label: "S" }],
        }),
        explanation: exp(
          "Le sommet appartient à l'axe de symétrie : son abscisse est celle de l'axe, et son ordonnée est l'image de cette abscisse.",
          "On calcule $f$ en l'abscisse de l'axe.",
          `$f(${fr(sommetX)}) = ${fr(sommetY)}$.`,
          `Le sommet est $S(${fr(sommetX)} \\, ; \\, ${fr(sommetY)})$, et $${fr(sommetY)}$ est le ${a > 0 ? "minimum" : "maximum"} de la fonction.`
        ),
      };
    },
  },

  /* ═══════════════ quad_symetrie_images ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_symetrie_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_sommet_axe",
    microId: "quad_symetrie_images",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux abscisses à égale distance de l'axe ont la même image.",
    tags: ["premiere", "maths", "parabole", "symetrie", "template", "short"],
    generate: () => {
      const a = 1;
      const sommetX = pick([-1, 0, 1, 2] as const);
      const b = -2 * a * sommetX;
      const c = pick([-2, 0, 1] as const);
      const d = pick([1, 2, 3] as const);
      const x = sommetX - d;
      const symetrique = sommetX + d;
      return {
        text:
          `La parabole ci-contre a pour axe de symétrie $x = ${fr(sommetX)}$. ` +
          `On sait que $f(${fr(x)}) = ${fr(a * x * x + b * x + c)}$. ` +
          `Quelle autre valeur de $x$ a exactement la même image ?`,
        format: "short",
        expected: [fr(symetrique)],
        comparator: "number_equal",
        canvas: canvasParabole(a, b, c),
        explanation: exp(
          "La parabole est symétrique par rapport à son axe : deux abscisses situées à la même distance de l'axe ont la même image.",
          "On mesure la distance à l'axe, puis on reporte de l'autre côté.",
          `$${fr(x)}$ est à $${fr(d)}$ unités à gauche de $${fr(sommetX)}$. À $${fr(d)}$ unités à droite : $${fr(sommetX)} + ${fr(d)} = ${fr(symetrique)}$.`,
          `$f(${fr(symetrique)}) = f(${fr(x)}) = ${fr(a * x * x + b * x + c)}$.`
        ),
      };
    },
  },

  /* ═══════════════ quad_extremum ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_extremum_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_variations",
    microId: "quad_extremum",
    difficulty: 4,
    theme: "neutral",
    hint: "Chiffre d'affaires maximal : c'est le sommet d'une parabole tournée vers le bas.",
    tags: ["premiere", "maths", "parabole", "extremum", "template", "short"],
    generate: () => {
      const prixOptimal = pick([3, 4, 5, 6] as const);
      const a = -1;
      const b = 2 * prixOptimal;
      const c = pick([0, 5, 10] as const);
      return {
        text:
          `Le chiffre d'affaires d'une entreprise, en milliers d'euros, en fonction du prix unitaire $x$ ` +
          `(en euros), est donné par $C(x) = -x^2 + ${fr(b)}x ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$. ` +
          `Pour quel prix le chiffre d'affaires est-il maximal ?`,
        format: "short",
        expected: [fr(prixOptimal)],
        comparator: "number_equal",
        canvas: canvasParabole(a, b, c, { titre: "Chiffre d'affaires selon le prix unitaire" }),
        explanation: exp(
          "Le coefficient de $x^2$ est négatif : la parabole est tournée vers le bas, elle admet un maximum, atteint au sommet.",
          `On cherche l'axe de symétrie en résolvant $C(x) = ${fr(c)}$, ce qui donne $-x^2 + ${fr(b)}x = 0$, soit $x(-x + ${fr(b)}) = 0$.`,
          `Les solutions sont $0$ et $${fr(b)}$ : l'axe passe au milieu, en $x = ${fr(prixOptimal)}$.`,
          `Le chiffre d'affaires est maximal pour un prix de $${fr(prixOptimal)}$ €. Trop bas, on ne gagne rien ; trop haut, on ne vend plus.`
        ),
      };
    },
  },

  /* ═══════════════ quad_tableau_variations ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_tableau_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_variations",
    microId: "quad_tableau_variations",
    difficulty: 3,
    theme: "neutral",
    hint: "Une parabole ne change de sens qu'une fois : à son sommet.",
    tags: ["premiere", "maths", "parabole", "variations", "template"],
    generate: () => {
      const a = pick([-1, 1] as const);
      const sommetX = pick([-2, -1, 1, 2] as const);
      const b = -2 * a * sommetX;
      return {
        text:
          `La courbe ci-contre a pour sommet le point d'abscisse $${fr(sommetX)}$. ` +
          `Quel est le tableau de variations de $f$ ?`,
        format: "qcm",
        choices: makeChoices(
          a > 0
            ? `décroissante jusqu'à $${fr(sommetX)}$, puis croissante`
            : `croissante jusqu'à $${fr(sommetX)}$, puis décroissante`,
          [
            a > 0
              ? `croissante jusqu'à $${fr(sommetX)}$, puis décroissante`
              : `décroissante jusqu'à $${fr(sommetX)}$, puis croissante`,
            "croissante sur tout son ensemble de définition",
            "décroissante sur tout son ensemble de définition",
          ]
        ),
        expected: [
          a > 0
            ? `décroissante jusqu'à $${fr(sommetX)}$, puis croissante`
            : `croissante jusqu'à $${fr(sommetX)}$, puis décroissante`,
        ],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, b, 0),
        explanation: exp(
          "Une fonction polynôme de degré 2 change de sens de variation une seule fois, au sommet.",
          "On regarde l'orientation de la parabole, puis on place le sommet.",
          `$a = ${fr(a)}$ : la parabole est tournée vers le ${a > 0 ? "haut" : "bas"}, et son sommet est en $${fr(sommetX)}$.`,
          a > 0
            ? `$f$ décroît jusqu'à $${fr(sommetX)}$, puis croît : le sommet est un minimum.`
            : `$f$ croît jusqu'à $${fr(sommetX)}$, puis décroît : le sommet est un maximum.`
        ),
      };
    },
  },

  /* ═══════════════ quad_racines_factorisee ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_racines_fact_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_racines_signe",
    microId: "quad_racines_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Un produit est nul quand l'un de ses facteurs est nul.",
    tags: ["premiere", "maths", "parabole", "racines", "template"],
    generate: () => {
      const x1 = pick([-3, -2, -1] as const);
      const x2 = pick([2, 3, 4] as const);
      const a = pick([1, 2, -1] as const);
      const ecrire = (r: number) => `x ${r < 0 ? "+" : "-"} ${Math.abs(r)}`;
      return {
        text:
          `Soit $f(x) = ${a === 1 ? "" : a === -1 ? "-" : fr(a)}(${ecrire(x1)})(${ecrire(x2)})$. ` +
          `Quelles sont les racines de $f$ ?`,
        format: "qcm",
        choices: makeChoices(`$${fr(x1)}$ et $${fr(x2)}$`, [
          `$${fr(-x1)}$ et $${fr(-x2)}$`,
          `$${fr(x1)}$ et $${fr(-x2)}$`,
          `$0$ et $${fr(x2)}$`,
        ]),
        expected: [`$${fr(x1)}$ et $${fr(x2)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les racines d'un polynôme sous forme factorisée s'obtiennent par la règle du produit nul : un produit est nul si et seulement si l'un de ses facteurs l'est.",
          "On annule chaque facteur séparément.",
          `$${ecrire(x1)} = 0$ donne $x = ${fr(x1)}$ ; $${ecrire(x2)} = 0$ donne $x = ${fr(x2)}$. Le coefficient $${fr(a)}$ ne s'annule jamais.`,
          `Les racines sont $${fr(x1)}$ et $${fr(x2)}$ — lues directement sur la forme factorisée, sans discriminant.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(-x1)}$ et $${fr(-x2)}$`,
            cause: "a recopié les nombres du facteur sans changer leur signe",
          },
        ],
      };
    },
  },

  /* ═══════════════ quad_signe_tableau ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_signe_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_racines_signe",
    microId: "quad_signe_tableau",
    difficulty: 4,
    theme: "neutral",
    hint: "Une parabole tournée vers le haut est négative ENTRE ses racines.",
    tags: ["premiere", "maths", "parabole", "signe", "template"],
    generate: () => {
      const x1 = pick([-3, -2, -1] as const);
      const x2 = pick([1, 2, 3] as const);
      return {
        text:
          `Soit $f(x) = (x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x - ${x2})$. ` +
          `Sur quel intervalle $f$ est-elle négative ?`,
        format: "qcm",
        choices: makeChoices(`$[${fr(x1)} \\, ; \\, ${fr(x2)}]$`, [
          `$]-\\infty \\, ; \\, ${fr(x1)}]$`,
          `$[${fr(x2)} \\, ; \\, +\\infty[$`,
          `$]-\\infty \\, ; \\, ${fr(x1)}] \\cup [${fr(x2)} \\, ; \\, +\\infty[$`,
        ]),
        expected: [`$[${fr(x1)} \\, ; \\, ${fr(x2)}]$`],
        comparator: "mcq_exact",
        canvas: canvasParabole(1, -(x1 + x2), x1 * x2),
        explanation: exp(
          "Le signe d'un produit de deux facteurs du premier degré se lit dans un tableau de signes, ou directement sur la parabole.",
          "La parabole est tournée vers le haut : elle passe sous l'axe entre ses deux racines, et au-dessus ailleurs.",
          `Racines : $${fr(x1)}$ et $${fr(x2)}$. Entre les deux, la courbe est en dessous de l'axe.`,
          `$f$ est négative sur $[${fr(x1)} \\, ; \\, ${fr(x2)}]$. Retenir : « du signe de $a$ à l'extérieur des racines, du signe contraire à l'intérieur ».`
        ),
        choiceDiagnostics: [
          {
            choice: `$]-\\infty \\, ; \\, ${fr(x1)}] \\cup [${fr(x2)} \\, ; \\, +\\infty[$`,
            cause: "a donné l'intervalle où la fonction est POSITIVE",
          },
        ],
      };
    },
  },

  /* ═══════════════ quad_inequation ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_inequation_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_racines_signe",
    microId: "quad_inequation",
    difficulty: 4,
    theme: "neutral",
    hint: "Résoudre $f(x) > 0$, c'est chercher où la courbe est au-dessus de l'axe.",
    tags: ["premiere", "maths", "parabole", "inequation", "template"],
    generate: () => {
      const x1 = pick([-3, -2] as const);
      const x2 = pick([1, 2, 3] as const);
      return {
        text:
          `Soit $f(x) = -(x ${x1 < 0 ? "+" : "-"} ${Math.abs(x1)})(x - ${x2})$. ` +
          `Résous l'inéquation $f(x) > 0$.`,
        format: "qcm",
        choices: makeChoices(`$]${fr(x1)} \\, ; \\, ${fr(x2)}[$`, [
          `$]-\\infty \\, ; \\, ${fr(x1)}[ \\cup ]${fr(x2)} \\, ; \\, +\\infty[$`,
          `$]-\\infty \\, ; \\, ${fr(x1)}[$`,
          `$]${fr(x2)} \\, ; \\, +\\infty[$`,
        ]),
        expected: [`$]${fr(x1)} \\, ; \\, ${fr(x2)}[$`],
        comparator: "mcq_exact",
        canvas: canvasParabole(-1, x1 + x2, -x1 * x2),
        explanation: exp(
          "On résout une inéquation du second degré par le signe de la forme factorisée, jamais par le discriminant.",
          "Le coefficient devant le produit est négatif : la parabole est tournée vers le BAS, donc positive ENTRE ses racines.",
          `Racines : $${fr(x1)}$ et $${fr(x2)}$. La courbe est au-dessus de l'axe entre les deux.`,
          `L'ensemble des solutions est $]${fr(x1)} \\, ; \\, ${fr(x2)}[$, bornes exclues puisque l'inégalité est stricte.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]-\\infty \\, ; \\, ${fr(x1)}[ \\cup ]${fr(x2)} \\, ; \\, +\\infty[$`,
            cause: "a oublié le signe moins devant le produit, qui retourne la parabole",
          },
        ],
      };
    },
  },

  /* ═══════════════ quad_ecrire_factorisee ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_ecrire_fact_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_racines_signe",
    microId: "quad_ecrire_factorisee",
    difficulty: 4,
    theme: "neutral",
    hint: "Une racine $r$ donne le facteur $(x - r)$ : le signe s'inverse.",
    tags: ["premiere", "maths", "parabole", "factorisation", "template"],
    generate: () => {
      const x1 = pick([-4, -3, -2] as const);
      const x2 = pick([1, 2, 3] as const);
      const ecrire = (r: number) => `(x ${r < 0 ? "+" : "-"} ${Math.abs(r)})`;
      return {
        text:
          `Une fonction polynôme de degré 2, de coefficient dominant $1$, a pour racines $${fr(x1)}$ et $${fr(x2)}$. ` +
          `Quelle est sa forme factorisée ?`,
        format: "qcm",
        choices: makeChoices(`$f(x) = ${ecrire(x1)}${ecrire(x2)}$`, [
          `$f(x) = ${ecrire(-x1)}${ecrire(-x2)}$`,
          `$f(x) = ${ecrire(x1)}${ecrire(-x2)}$`,
          `$f(x) = x^2 ${x1 + x2 >= 0 ? "+" : "-"} ${Math.abs(x1 + x2)}x$`,
        ]),
        expected: [`$f(x) = ${ecrire(x1)}${ecrire(x2)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Si $x_1$ et $x_2$ sont les racines et $a$ le coefficient dominant, alors $f(x) = a(x - x_1)(x - x_2)$.",
          "On remplace $x_1$ et $x_2$ par leurs valeurs, en respectant le signe moins de la formule.",
          `Racine $${fr(x1)}$ : facteur $(x - (${fr(x1)})) = ${ecrire(x1)}$. Racine $${fr(x2)}$ : facteur $${ecrire(x2)}$.`,
          `$f(x) = ${ecrire(x1)}${ecrire(x2)}$. On vérifie : cette expression s'annule bien en $${fr(x1)}$ et en $${fr(x2)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${ecrire(-x1)}${ecrire(-x2)}$`,
            cause: "a oublié que la formule contient un signe moins : une racine négative donne un facteur avec un plus",
          },
        ],
      };
    },
  },

  /* ═══════════════ quad_verifier_developpee ═══════════════ */

  {
    kind: "template",
    id: "premiere_quad_verifier_tpl_1",
    niveau: "premiere",
    matiere: "maths",
    notionId: "quad_racines_signe",
    microId: "quad_verifier_developpee",
    difficulty: 4,
    theme: "neutral",
    hint: "Développe le produit et compare chaque coefficient.",
    tags: ["premiere", "maths", "parabole", "factorisation", "template"],
    generate: () => {
      const x1 = pick([1, 2, 3] as const);
      const x2 = pick([4, 5] as const);
      const somme = x1 + x2;
      const produit = x1 * x2;
      return {
        text:
          `Est-il vrai que $x^2 - ${somme}x + ${produit} = (x - ${x1})(x - ${x2})$ ?`,
        format: "qcm",
        choices: makeChoices("Oui, en développant le produit on retrouve l'expression", [
          "Non, les racines ne sont pas les bonnes",
          "Non, il manque un coefficient devant le produit",
          "On ne peut pas le savoir sans calculer le discriminant",
        ]),
        expected: ["Oui, en développant le produit on retrouve l'expression"],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux expressions sont égales si leurs formes développées coïncident terme à terme.",
          "On développe le produit.",
          `$(x - ${x1})(x - ${x2}) = x^2 - ${x2}x - ${x1}x + ${produit} = x^2 - ${somme}x + ${produit}$.`,
          `L'égalité est vraie. Et le discriminant n'a servi à rien : il n'est pas au programme, la forme factorisée était donnée.`
        ),
        choiceDiagnostics: [
          {
            choice: "On ne peut pas le savoir sans calculer le discriminant",
            cause: "le discriminant n'est pas au programme, et il est inutile ici : il suffit de développer",
          },
        ],
      };
    },
  },
];
