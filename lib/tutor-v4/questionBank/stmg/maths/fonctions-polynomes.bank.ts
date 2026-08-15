// lib/tutor-v4/questionBank/stmg/maths/fonctions-polynomes.bank.ts
//
// Notions : fct_degre2_courbe, fct_degre2_symetrie, fct_degre2_factorisee,
//           fct_degre2_factoriser, fct_degre3, fct_equations_puissance
//           (domaine STMGFO — « Fonctions polynômes de degré 2 » et
//            « Fonctions polynômes de degré 3 »)
//
// ⛔⛔ L'INTERDIT CENTRAL DE CE FICHIER. Le BO l'écrit noir sur blanc :
// « racines et signe d'un polynôme de degré 2 donné sous forme factorisée
// (le calcul des racines à l'aide du discriminant ne figure pas au
// programme) », et plus loin : « la recherche systématique des racines d'un
// polynôme de degré 2 ne figurant pas au programme, on privilégie les
// situations où les racines sont évidentes ainsi que les interprétations
// graphiques ».
//
// Donc, dans TOUS les items ci-dessous :
//   · soit le polynôme est DONNÉ sous forme factorisée ;
//   · soit une racine est FOURNIE et l'élève factorise à partir d'elle ;
//   · soit les racines se lisent sur la courbe.
// Jamais un $\Delta$, jamais une forme canonique — le texte exclut aussi la
// mise sous forme canonique.
//
// ⚠️ Le degré 3 est au programme dès la PREMIÈRE en voie technologique, ce qui
// n'est pas le cas en voie générale : représentations de $x \mapsto ax^3$ et
// $x \mapsto ax^3 + b$, racines et signe de $a(x-x_1)(x-x_2)(x-x_3)$, et
// l'équation $x^3 = c$ avec la racine cubique.

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

/** Facteur $(x - r)$ écrit selon le signe de la racine. */
function facteur(r: number): string {
  if (r === 0) return "x";
  return r > 0 ? `(x - ${r})` : `(x + ${-r})`;
}

/** Coefficient devant un produit de facteurs : « », « - » ou « 3 ». */
function coef(a: number): string {
  return a === 1 ? "" : a === -1 ? "-" : String(a);
}

function terme(c: number, partie: string, premier = false): string {
  if (c === 0) return "";
  const signe = c < 0 ? "-" : premier ? "" : "+";
  const abs = Math.abs(c);
  const nombre = abs === 1 && partie !== "" ? "" : String(abs);
  return `${signe}${premier && c > 0 ? "" : " "}${nombre}${partie}`;
}

function trinome(a: number, b: number, c: number): string {
  const m = [terme(a, "x^2", true), terme(b, "x"), terme(c, "")].filter((x) => x !== "");
  return m.length === 0 ? "0" : m.join(" ").replace(/\s+/g, " ").trim();
}

/** Courbe quelconque échantillonnée en points — `fonctionGraphique` ne trace
 *  nativement que les droites et les paraboles. */
function canvasCourbePoints(
  f: (x: number) => number,
  xmin: number,
  xmax: number,
  titre: string,
  options?: { pas?: number; marques?: number[] }
): CanvasFigure {
  const pas = options?.pas ?? (xmax - xmin) / 60;
  const points: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    const y = f(x);
    if (Number.isFinite(y) && Math.abs(y) < 1e4) {
      points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
    }
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
    points: options?.marques?.map((x) => ({ x, y: Math.round(f(x) * 100) / 100 })),
    misesEnEvidence: [{ horizontale: { y: 0 } }],
  };
}

function canvasParabole(a: number, b: number, c: number, titre: string, evidence?: number): CanvasFigure {
  const sommet = -b / (2 * a);
  const yS = a * sommet * sommet + b * sommet + c;
  const bornes = [a * 36 + b * -6 + c, a * 36 + b * 6 + c, yS];
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: -6,
    xmax: 6,
    ymin: Math.floor(Math.min(...bornes, 0)) - 2,
    ymax: Math.ceil(Math.max(...bornes, 0)) + 2,
    grille: true,
    courbes: [{ id: "p", type: "quadratique", a, b, c }],
    misesEnEvidence:
      evidence !== undefined ? [{ verticale: { x: evidence } }, { horizontale: { y: 0 } }] : [{ horizontale: { y: 0 } }],
  };
}

export const fonctionsPolynomesBank: TutorBankItemV4[] = [
  /* ═══════════════════ fct_d2_associer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d2_associer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_courbe",
    microId: "fct_d2_associer",
    difficulty: 2,
    theme: "neutral",
    hint: "Les points où la courbe coupe l'axe des abscisses sont les racines : elles se lisent dans la forme factorisée.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 0);
      const r2 = r1 + randomInt(2, 5);
      const a = pick([1, 2, -1, -2] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const ecrire = (k: number, s1: number, s2: number) => `$f(x) = ${coef(k)}${facteur(s1)}${facteur(s2)}$`;
      return {
        text: `Quelle expression correspond à la parabole tracée ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, r1, r2), [
          ecrire(a, -r1, -r2),
          ecrire(-a, r1, r2),
          ecrire(a, r1, r2 + 1),
          ecrire(a, r1 - 1, r2),
          ecrire(a + 1, r1, r2),
        ]),
        expected: [ecrire(a, r1, r2)],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, B, C, "Quelle expression pour cette parabole ?"),
        explanation: exp(
          "Une expression de la forme $a(x - x_1)(x - x_2)$ s'annule exactement en $x_1$ et $x_2$ : ce sont les abscisses des points où la courbe coupe l'axe.",
          "On lit les deux racines sur le graphique, puis on regarde le sens de la parabole pour trouver le signe de $a$.",
          `La courbe coupe l'axe en $${r1}$ et $${r2}$, et elle est tournée vers ${a > 0 ? "le haut" : "le bas"}, donc $a$ est ${a > 0 ? "positif" : "négatif"}.`,
          `L'expression est ${ecrire(a, r1, r2)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(a, -r1, -r2),
            cause: "a recopié les racines sans changer leur signe dans les facteurs",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_d2_role_a ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d2_role_a_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_courbe",
    microId: "fct_d2_role_a",
    difficulty: 2,
    theme: "neutral",
    hint: "Le signe de $a$ donne l'orientation ; sa valeur absolue donne l'ouverture.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template"],
    generate: () => {
      const a = pick([0.25, 0.5, 1, 2, 3, -0.5, -1, -2, -3] as const);
      const c = pick([0, 1, -2, 3] as const);
      return {
        text: `D'après la courbe de $f(x) = ax^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$, que peut-on dire du coefficient $a$ ?`,
        format: "qcm",
        choices: shuffle([
          a > 0 ? "il est positif : la parabole est tournée vers le haut" : "il est négatif : la parabole est tournée vers le bas",
          a > 0 ? "il est négatif : la parabole est tournée vers le bas" : "il est positif : la parabole est tournée vers le haut",
          "il est nul : la courbe est une droite",
          "on ne peut pas connaître son signe à partir de la courbe",
        ]),
        expected: [
          a > 0
            ? "il est positif : la parabole est tournée vers le haut"
            : "il est négatif : la parabole est tournée vers le bas",
        ],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, 0, c, "Parabole de f"),
        explanation: exp(
          "Le coefficient $a$ commande l'orientation de la parabole : vers le haut si $a > 0$, vers le bas si $a < 0$. Plus $|a|$ est grand, plus la parabole est resserrée.",
          "On regarde si les branches montent ou descendent quand on s'éloigne du sommet.",
          `Ici les branches ${a > 0 ? "montent" : "descendent"} : $a$ est ${a > 0 ? "positif" : "négatif"} (il vaut $${fr(a)}$).`,
          `$a$ est ${a > 0 ? "positif" : "négatif"}.`
        ),
        choiceDiagnostics: [
          {
            choice: "on ne peut pas connaître son signe à partir de la courbe",
            cause: "l'orientation de la parabole donne directement le signe de a",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_d2_translation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d2_translation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_courbe",
    microId: "fct_d2_translation",
    difficulty: 2,
    theme: "neutral",
    hint: "Ajouter $b$ à une expression déplace toute la courbe VERTICALEMENT de $b$.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([2, 3, 4, 5, -2, -3, -4] as const);
      return {
        text:
          `On passe de la courbe de $g(x) = ${coef(a)}x^2$ à celle de $f(x) = ${coef(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$. ` +
          `Quel est l'effet sur la courbe ?`,
        format: "qcm",
        choices: makeChoices(
          `elle est translatée de $${Math.abs(b)}$ vers le ${b > 0 ? "haut" : "bas"}`,
          [
            `elle est translatée de $${Math.abs(b)}$ vers le ${b > 0 ? "bas" : "haut"}`,
            `elle est translatée de $${Math.abs(b)}$ vers la droite`,
            `elle est translatée de $${Math.abs(b)}$ vers la gauche`,
            `elle est resserrée d'un facteur $${Math.abs(b)}$`,
            `elle est retournée`,
          ]
        ),
        expected: [`elle est translatée de $${Math.abs(b)}$ vers le ${b > 0 ? "haut" : "bas"}`],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, 0, b, "La courbe de f"),
        explanation: exp(
          "Ajouter une constante $b$ à l'expression d'une fonction ajoute $b$ à toutes les ordonnées : la courbe se déplace verticalement, sans changer de forme.",
          "On compare les deux sommets : celui de $g$ est en $(0\\,;\\,0)$, celui de $f$ en $(0\\,;\\,b)$.",
          `Ici $b = ${b}$ : la courbe monte de $${Math.abs(b)}$${b < 0 ? " — pardon, elle descend de " + Math.abs(b) : ""}.`,
          `La courbe est translatée de $${Math.abs(b)}$ vers le ${b > 0 ? "haut" : "bas"}.`
        ),
        choiceDiagnostics: [
          {
            choice: `elle est translatée de $${Math.abs(b)}$ vers la droite`,
            cause: "a confondu translation verticale et translation horizontale",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_d2_axe_symetrie ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d2_axe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_symetrie",
    microId: "fct_d2_axe_symetrie",
    difficulty: 2,
    theme: "neutral",
    hint: "L'axe de symétrie passe au MILIEU des deux racines.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template", "short"],
    generate: () => {
      const r1 = randomInt(-5, 0);
      const r2 = r1 + 2 * randomInt(1, 3); // écart pair : le milieu est entier
      const a = pick([1, 2, -1, -2] as const);
      const axe = (r1 + r2) / 2;
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      return {
        text:
          `La parabole tracée représente $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}$. ` +
          `Quelle est l'abscisse de son axe de symétrie ?`,
        format: "short",
        expected: [fr(axe)],
        comparator: "number_equal",
        canvas: canvasParabole(a, B, C, "Parabole de f", axe),
        explanation: exp(
          "Une parabole est symétrique par rapport à la droite verticale passant par son sommet ; quand elle a deux racines, cet axe passe exactement à leur milieu.",
          "On calcule la demi-somme des deux racines.",
          `Les racines sont $${r1}$ et $${r2}$, donc l'axe a pour abscisse $\\dfrac{${r1} + ${r2}}{2} = ${fr(axe)}$.`,
          `L'axe de symétrie a pour équation $x = ${fr(axe)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_d2_extremum ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d2_extremum_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_symetrie",
    microId: "fct_d2_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "L'extremum est atteint sur l'axe de symétrie : calcule d'abord cette abscisse, puis son image.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template", "short"],
    generate: () => {
      const r1 = randomInt(-5, 0);
      const r2 = r1 + 2 * randomInt(1, 3);
      const a = pick([1, 2, -1, -2] as const);
      const axe = (r1 + r2) / 2;
      const extremum = a * (axe - r1) * (axe - r2);
      return {
        text:
          `Soit $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}$. ` +
          `Quelle est la valeur du ${a > 0 ? "minimum" : "maximum"} de $f$ ?`,
        format: "short",
        expected: [fr(extremum)],
        comparator: "number_equal",
        explanation: exp(
          `Une parabole tournée vers ${a > 0 ? "le haut admet un MINIMUM" : "le bas admet un MAXIMUM"}, atteint au sommet, c'est-à-dire sur l'axe de symétrie.`,
          "On calcule l'abscisse de l'axe (la demi-somme des racines), puis on calcule son image.",
          `Axe : $x = \\dfrac{${r1} + ${r2}}{2} = ${fr(axe)}$. ` +
            `Image : $f(${fr(axe)}) = ${coef(a)}(${fr(axe)} - (${r1}))(${fr(axe)} - (${r2})) = ${fr(extremum)}$.`,
          `Le ${a > 0 ? "minimum" : "maximum"} de $f$ vaut $${fr(extremum)}$, atteint en $x = ${fr(axe)}$.`
        ),
      };
    },
  },

  /* ═══════════════ fct_d2_symetrie_images ═══════════════ */

  {
    kind: "template",
    id: "stmg_d2_symetrie_images_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_symetrie",
    microId: "fct_d2_symetrie_images",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux abscisses symétriques par rapport à l'axe ont la MÊME image.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template", "short"],
    generate: () => {
      const r1 = randomInt(-5, -1);
      const r2 = r1 + 2 * randomInt(1, 3);
      const a = pick([1, 2, -1] as const);
      const axe = (r1 + r2) / 2;
      const d = randomInt(1, 3);
      const x1 = axe - d;
      const x2 = axe + d;
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      return {
        text:
          `La parabole tracée a pour axe de symétrie la droite d'équation $x = ${fr(axe)}$, ` +
          `et l'on sait que $f(${fr(x1)}) = ${fr(a * (x1 - r1) * (x1 - r2))}$. ` +
          `Que vaut $f(${fr(x2)})$ ?`,
        format: "short",
        expected: [fr(a * (x2 - r1) * (x2 - r2))],
        comparator: "number_equal",
        canvas: canvasParabole(a, B, C, "Parabole de f", axe),
        explanation: exp(
          "Deux nombres situés à la même distance de l'axe de symétrie, de part et d'autre, ont la même image par la fonction.",
          "On vérifie que les deux abscisses sont symétriques par rapport à l'axe, puis on conclut sans calcul.",
          `$${fr(x1)}$ et $${fr(x2)}$ sont tous deux à la distance $${d}$ de l'axe $x = ${fr(axe)}$ : leurs images sont égales.`,
          `$f(${fr(x2)}) = ${fr(a * (x2 - r1) * (x2 - r2))}$.`
        ),
      };
    },
  },

  /* ═══════════ fct_d2_racines_factorisee ═══════════ */

  {
    kind: "template",
    id: "stmg_d2_racines_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factorisee",
    microId: "fct_d2_racines_factorisee",
    difficulty: 2,
    theme: "neutral",
    hint: "Un produit est nul quand l'un de ses facteurs l'est : annule chaque parenthèse.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4] as const);
      let r2 = pick([-6, -4, -2, 2, 3, 5, 6, 7] as const).valueOf();
      if (r2 === r1) r2 = r1 + 1;
      const a = pick([1, 2, 3, -1, -2] as const);
      const petite = Math.min(r1, r2);
      const grande = Math.max(r1, r2);
      return {
        text: `Quelles sont les racines de $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${petite}$ et $${grande}$`, [
          `$${-petite}$ et $${-grande}$`,
          `$${petite * grande}$`,
          `$${petite + grande}$`,
          `$${a}$ et $${petite}$`,
          `il n'y en a pas`,
        ]),
        expected: [`$${petite}$ et $${grande}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les racines d'un polynôme donné sous forme factorisée s'obtiennent en annulant chaque facteur — le discriminant n'est pas nécessaire, et n'est d'ailleurs pas au programme.",
          "On résout séparément chaque parenthèse égale à zéro. Le coefficient devant le produit n'a aucun effet sur les racines.",
          `$${facteur(r1)} = 0$ donne $x = ${r1}$ ; $${facteur(r2)} = 0$ donne $x = ${r2}$.`,
          `Les racines sont $${petite}$ et $${grande}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${-petite}$ et $${-grande}$`,
            cause: "a lu le nombre écrit dans la parenthèse sans changer son signe",
          },
        ],
      };
    },
  },

  /* ═══════════════ fct_d2_signe_tableau ═══════════════ */

  {
    kind: "template",
    id: "stmg_d2_signe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factorisee",
    microId: "fct_d2_signe_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Entre les racines, le polynôme est du signe CONTRAIRE à celui de $a$.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 0);
      const r2 = r1 + randomInt(2, 5);
      const a = pick([1, 2, -1, -2] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const bonne =
        a > 0
          ? `négatif sur $]${r1}\\,;\\,${r2}[$, positif à l'extérieur`
          : `positif sur $]${r1}\\,;\\,${r2}[$, négatif à l'extérieur`;
      return {
        text: `Quel est le signe de $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          a > 0
            ? `positif sur $]${r1}\\,;\\,${r2}[$, négatif à l'extérieur`
            : `négatif sur $]${r1}\\,;\\,${r2}[$, positif à l'extérieur`,
          "positif sur $\\mathbb{R}$",
          "négatif sur $\\mathbb{R}$",
          `négatif sur $]${r1 - 1}\\,;\\,${r2}[$, positif à l'extérieur`,
          `positif sur $]0\\,;\\,+\\infty[$, négatif ailleurs`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, B, C, "Courbe de f — signe par rapport à l'axe"),
        explanation: exp(
          "Un polynôme de degré 2 est du signe de $a$ à l'extérieur de ses racines, et du signe contraire entre elles.",
          "On lit la position de la parabole par rapport à l'axe des abscisses : au-dessus, le polynôme est positif ; en dessous, négatif.",
          `Les racines sont $${r1}$ et $${r2}$, et $a = ${a}$ est ${a > 0 ? "positif : la parabole plonge sous l'axe entre les racines" : "négatif : la parabole passe au-dessus de l'axe entre les racines"}.`,
          `$f$ est ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_d2_inequation ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d2_inequation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factorisee",
    microId: "fct_d2_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "Résoudre $f(x) > 0$, c'est lire sur le tableau de signes les intervalles où $f$ est positive.",
    tags: ["stmg", "maths", "fonctions", "degre2", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-4, 0);
      const r2 = r1 + randomInt(2, 5);
      const a = pick([1, -1, 2, -2] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      // Pour a > 0, f(x) < 0 entre les racines ; pour a < 0, f(x) > 0 entre les racines.
      const cherchePositif = Math.random() < 0.5;
      const entre = (a > 0) !== cherchePositif;
      const bonne = entre
        ? `$]${r1}\\,;\\,${r2}[$`
        : `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$`;
      return {
        text: `Résous l'inéquation $${coef(a)}${facteur(r1)}${facteur(r2)} ${cherchePositif ? ">" : "<"} 0$.`,
        format: "qcm",
        choices: makeChoices(bonne, [
          entre ? `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,+\\infty[$` : `$]${r1}\\,;\\,${r2}[$`,
          `$]${r1}\\,;\\,+\\infty[$`,
          `$]-\\infty\\,;\\,${r2}[$`,
          "$\\mathbb{R}$",
          "aucune solution",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasParabole(a, B, C, "Courbe de f"),
        explanation: exp(
          "Résoudre une inéquation du second degré, c'est lire sur le tableau de signes — ou sur la courbe — les intervalles où l'expression a le signe demandé.",
          "On place les racines, on détermine le signe entre et à l'extérieur, puis on retient les intervalles voulus.",
          `Avec $a = ${a}$, l'expression est ${a > 0 ? "négative entre les racines et positive à l'extérieur" : "positive entre les racines et négative à l'extérieur"} ; ` +
            `on cherche où elle est ${cherchePositif ? "positive" : "négative"}.`,
          `L'ensemble des solutions est ${bonne}.`
        ),
      };
    },
  },

  /* ═══════════════ fct_d2_verifier_racine ═══════════════ */

  {
    kind: "template",
    id: "stmg_d2_verifier_racine_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factoriser",
    microId: "fct_d2_verifier_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Un nombre est racine si son image est NULLE : remplace et calcule.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      const r2 = r1 + pick([1, 2, 3, 4] as const);
      const a = pick([1, 2, -1] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const estRacine = Math.random() < 0.5;
      const candidat = estRacine ? r1 : r1 + pick([1, -1, 2] as const);
      const image = a * candidat * candidat + B * candidat + C;
      return {
        text: `Le nombre $${candidat}$ est-il une racine de $f(x) = ${trinome(a, B, C)}$ ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [image === 0 ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre est racine d'un polynôme lorsque son image vaut $0$.",
          "On remplace $x$ par le nombre proposé et l'on calcule — le discriminant n'est pas nécessaire pour VÉRIFIER une racine.",
          `$f(${candidat}) = ${a} \\times (${candidat})^2 + (${B}) \\times (${candidat}) + (${C}) = ` +
            `${fr(a * candidat * candidat)} + ${fr(B * candidat)} + ${fr(C)} = ${fr(image)}$.`,
          image === 0
            ? `Comme $f(${candidat}) = 0$, oui : $${candidat}$ est une racine.`
            : `Comme $f(${candidat}) = ${fr(image)} \\neq 0$, non : $${candidat}$ n'est pas une racine.`
        ),
      };
    },
  },

  /* ═══════ fct_d2_factoriser_racine_connue ═══════ */

  {
    kind: "template",
    id: "stmg_d2_factoriser_connue_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factoriser",
    microId: "fct_d2_factoriser_racine_connue",
    difficulty: 3,
    theme: "neutral",
    hint: "Le produit des deux racines vaut $\\frac{c}{a}$ : une racine connue donne l'autre.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = pick([-4, -3, -2, -1, 1, 2, 3, 4] as const);
      let r2 = pick([-5, -3, -1, 2, 4, 5, 6] as const).valueOf();
      if (r2 === r1) r2 = r1 + 1;
      const a = pick([1, 2, -1] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const ecrire = (k: number, s1: number, s2: number) => `$${coef(k)}${facteur(s1)}${facteur(s2)}$`;
      return {
        text:
          `On sait que $${r1}$ est une racine de $f(x) = ${trinome(a, B, C)}$. ` +
          `Quelle est la forme factorisée de $f$ ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, r1, r2), [
          ecrire(a, r1, -r2),
          ecrire(a, -r1, r2),
          ecrire(1, r1, r2),
          ecrire(a, r1, r2 + 1),
          ecrire(-a, r1, r2),
        ]),
        expected: [ecrire(a, r1, r2)],
        comparator: "mcq_exact",
        explanation: exp(
          "Connaissant une racine $x_1$, on écrit $f(x) = a(x - x_1)(x - x_2)$ : le coefficient $a$ est celui de $x^2$, et la seconde racine se déduit du terme constant, puisque $a\\,x_1x_2 = c$.",
          "On identifie $a$, puis on cherche $x_2$ tel que le produit des racines redonne le terme constant.",
          `Ici $a = ${a}$ et $c = ${C}$, donc $x_1 x_2 = \\dfrac{${C}}{${a}} = ${C / a}$. ` +
            `Comme $x_1 = ${r1}$, on obtient $x_2 = ${r2}$.`,
          `La forme factorisée est ${ecrire(a, r1, r2)}.`
        ),
      };
    },
  },

  /* ═══════════ fct_d2_verifier_developpee ═══════════ */

  {
    kind: "template",
    id: "stmg_d2_verifier_dev_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factoriser",
    microId: "fct_d2_verifier_developpee",
    difficulty: 2,
    theme: "neutral",
    hint: "Développe la forme factorisée et compare terme à terme.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = pick([-4, -3, -2, -1, 1, 2, 3] as const);
      const r2 = r1 + pick([1, 2, 3, 4] as const);
      const a = pick([1, 2, -1] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const correcte = Math.random() < 0.5;
      const Bp = correcte ? B : B + pick([1, -1, 2] as const);
      return {
        text:
          `On affirme que $${coef(a)}${facteur(r1)}${facteur(r2)} = ${trinome(a, Bp, C)}$. ` +
          `Cette égalité est-elle exacte ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [correcte ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une forme factorisée et une forme développée décrivent la même fonction : leurs développements doivent coïncider terme à terme.",
          "On développe le produit et l'on compare les trois coefficients.",
          `$${coef(a)}${facteur(r1)}${facteur(r2)}$ se développe en $${trinome(a, B, C)}$, ` +
            `alors que l'affirmation propose $${trinome(a, Bp, C)}$.`,
          correcte
            ? "Les deux expressions coïncident : l'égalité est exacte."
            : `Le coefficient de $x$ diffère ($${B}$ contre $${Bp}$) : l'égalité est fausse.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_d3_courbes ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d3_courbes_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_courbes",
    difficulty: 2,
    theme: "neutral",
    hint: "Une courbe de $x \\mapsto ax^3$ traverse l'axe en changeant de courbure ; le signe de $a$ dit si elle monte ou descend.",
    tags: ["stmg", "maths", "fonctions", "degre3", "canvas", "template"],
    generate: () => {
      const a = pick([0.5, 1, 2, -0.5, -1, -2] as const);
      const b = pick([0, 2, 4, -3] as const);
      const f = (x: number) => a * x * x * x + b;
      const ecrire = (k: number, c: number) =>
        c === 0 ? `$f(x) = ${coef(k)}x^3$` : `$f(x) = ${coef(k)}x^3 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$`;
      return {
        text: `Quelle expression correspond à la courbe tracée ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, b), [
          ecrire(-a, b),
          ecrire(a, -b),
          ecrire(a, b + 2),
          `$f(x) = ${coef(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
          ecrire(a * 2, b),
        ]),
        expected: [ecrire(a, b)],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(f, -3, 3, "Courbe à identifier", { pas: 0.1 }),
        explanation: exp(
          "La courbe de $x \\mapsto ax^3$ est croissante si $a > 0$, décroissante si $a < 0$, et traverse l'axe des ordonnées en $0$ ; ajouter $b$ la translate verticalement.",
          "On regarde le sens général de la courbe, puis l'ordonnée du point d'abscisse $0$.",
          `La courbe est ${a > 0 ? "croissante" : "décroissante"} (donc $a$ est ${a > 0 ? "positif" : "négatif"}) ` +
            `et coupe l'axe des ordonnées en $${b}$ (donc la constante vaut $${b}$).`,
          `L'expression est ${ecrire(a, b)}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${coef(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$`,
            cause: "a confondu une cubique avec une parabole : une parabole ne traverse pas l'axe en changeant de courbure",
          },
        ],
      };
    },
  },

  /* ═══════════════════ fct_d3_racines ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d3_racines_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_racines",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois facteurs du premier degré : trois racines, une par parenthèse.",
    tags: ["stmg", "maths", "fonctions", "degre3", "template"],
    generate: () => {
      const r1 = randomInt(-5, -2);
      const r2 = r1 + randomInt(1, 3);
      const r3 = r2 + randomInt(1, 3);
      const a = pick([1, 2, -1] as const);
      return {
        text: `Quelles sont les racines de $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}${facteur(r3)}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${r1}$, $${r2}$ et $${r3}$`, [
          `$${-r1}$, $${-r2}$ et $${-r3}$`,
          `$${r1}$ et $${r3}$ seulement`,
          `$${a}$, $${r1}$ et $${r2}$`,
          `$${r1 + r2 + r3}$`,
          `$${r1 * r2 * r3}$`,
        ]),
        expected: [`$${r1}$, $${r2}$ et $${r3}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est nul si, et seulement si, l'un de ses facteurs est nul : chaque parenthèse donne une racine.",
          "On annule successivement les trois facteurs. Le coefficient devant le produit ne crée pas de racine.",
          `$${facteur(r1)} = 0 \\Rightarrow x = ${r1}$ ; $${facteur(r2)} = 0 \\Rightarrow x = ${r2}$ ; ` +
            `$${facteur(r3)} = 0 \\Rightarrow x = ${r3}$.`,
          `Les racines sont $${r1}$, $${r2}$ et $${r3}$.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_d3_signe ═══════════════════ */

  {
    kind: "template",
    id: "stmg_d3_signe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_signe",
    difficulty: 3,
    theme: "neutral",
    hint: "Avec trois facteurs, le signe change à CHAQUE racine : on alterne.",
    tags: ["stmg", "maths", "fonctions", "degre3", "canvas", "template"],
    generate: () => {
      const r1 = randomInt(-5, -3);
      const r2 = r1 + randomInt(2, 3);
      const r3 = r2 + randomInt(2, 3);
      const a = pick([1, -1] as const);
      const f = (x: number) => a * (x - r1) * (x - r2) * (x - r3);
      const zone = pick(["gauche", "z1", "z2", "droite"] as const);
      const x =
        zone === "gauche" ? r1 - 1 : zone === "z1" ? (r1 + r2) / 2 : zone === "z2" ? (r2 + r3) / 2 : r3 + 1;
      const signe = f(x) > 0 ? "positif" : "négatif";
      const intervalle =
        zone === "gauche"
          ? `$]-\\infty\\,;\\,${r1}[$`
          : zone === "z1"
            ? `$]${r1}\\,;\\,${r2}[$`
            : zone === "z2"
              ? `$]${r2}\\,;\\,${r3}[$`
              : `$]${r3}\\,;\\,+\\infty[$`;
      return {
        text: `Quel est le signe de $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}${facteur(r3)}$ sur ${intervalle} ?`,
        format: "qcm",
        choices: shuffle(["positif", "négatif", "nul", "il change de signe sur cet intervalle"]),
        expected: [signe],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(f, r1 - 2, r3 + 2, "Courbe de f", { pas: 0.1, marques: [r1, r2, r3] }),
        explanation: exp(
          "Un polynôme de degré 3 sous forme factorisée change de signe à chacune de ses trois racines : les signes ALTERNENT d'un intervalle au suivant.",
          "On détermine le signe sur l'intervalle le plus à droite — c'est celui de $a$ —, puis on alterne en remontant vers la gauche.",
          `Ici $a = ${a}$ : à droite de $${r3}$, $f$ est ${a > 0 ? "positif" : "négatif"}, puis les signes alternent. ` +
            `Sur ${intervalle}, une valeur test donne $f(${fr(x)}) = ${fr(f(x))}$.`,
          `Sur ${intervalle}, $f$ est ${signe}.`
        ),
        choiceDiagnostics: [
          {
            choice: "il change de signe sur cet intervalle",
            cause: "entre deux racines consécutives, un polynôme garde un signe constant",
          },
        ],
      };
    },
  },

  /* ═══════════ fct_d3_verifier_racine ═══════════ */

  {
    kind: "template",
    id: "stmg_d3_verifier_racine_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_verifier_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Remplace et calcule : une racine donne une image nulle.",
    tags: ["stmg", "maths", "fonctions", "degre3", "template", "short"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      const r2 = r1 + randomInt(1, 3);
      const r3 = r2 + randomInt(1, 3);
      const a = pick([1, 2, -1] as const);
      const f = (x: number) => a * (x - r1) * (x - r2) * (x - r3);
      const candidat = pick([r1, r2, r3, r3 + 1, r1 - 1] as const);
      return {
        text:
          `Soit $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}${facteur(r3)}$. ` +
          `Calcule $f(${candidat})$.`,
        format: "short",
        expected: [fr(f(candidat))],
        comparator: "number_equal",
        explanation: exp(
          "Pour vérifier qu'une valeur est racine, on calcule son image : elle vaut $0$ si et seulement si la valeur est racine.",
          "On remplace $x$ par le nombre dans chaque facteur, puis on multiplie.",
          `$f(${candidat}) = ${coef(a)}(${candidat} - (${r1}))(${candidat} - (${r2}))(${candidat} - (${r3})) = ${fr(f(candidat))}$.`,
          f(candidat) === 0
            ? `$f(${candidat}) = 0$ : $${candidat}$ est bien une racine.`
            : `$f(${candidat}) = ${fr(f(candidat))}$, donc $${candidat}$ n'est pas une racine.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_eq_carre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_eq_carre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_equations_puissance",
    microId: "fct_eq_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux solutions opposées quand $c > 0$ — mais un côté de carré, lui, est positif.",
    tags: ["stmg", "maths", "fonctions", "equations", "template", "short"],
    generate: () => {
      const cote = randomInt(3, 20);
      const aire = cote * cote;
      return {
        text:
          `Un local carré a une aire de $${aire}$ m². ` +
          `Quelle est la longueur de son côté, en mètres ?`,
        format: "short",
        expected: [String(cote)],
        comparator: "number_equal",
        explanation: exp(
          "L'aire d'un carré de côté $x$ vaut $x^2$ : résoudre $x^2 = c$ avec $c > 0$ donne deux solutions opposées, $\\sqrt{c}$ et $-\\sqrt{c}$.",
          "On résout, puis on écarte la solution négative — une longueur ne l'est pas.",
          `$x^2 = ${aire}$ donne $x = ${cote}$ ou $x = -${cote}$ ; seule la solution positive a un sens ici.`,
          `Le côté mesure $${cote}$ m.`
        ),
      };
    },
  },

  /* ═══════════════════ fct_eq_cube ═══════════════════ */

  {
    kind: "template",
    id: "stmg_eq_cube_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_equations_puissance",
    microId: "fct_eq_cube",
    difficulty: 2,
    theme: "neutral",
    hint: "L'équation $x^3 = c$ n'a QU'UNE solution : un cube conserve le signe.",
    tags: ["stmg", "maths", "fonctions", "equations", "template", "short"],
    generate: () => {
      const arete = randomInt(2, 15);
      const volume = arete * arete * arete;
      return {
        text: `Un cube a un volume de $${volume}$ cm³. Quelle est la longueur de son arête, en centimètres ?`,
        format: "short",
        expected: [String(arete)],
        comparator: "number_equal",
        explanation: exp(
          "Le volume d'un cube d'arête $x$ vaut $x^3$. Contrairement au carré, l'équation $x^3 = c$ n'admet qu'UNE seule solution réelle, car le cube conserve le signe.",
          "On cherche le nombre dont le cube vaut le volume donné : c'est la racine cubique.",
          `$${arete}^3 = ${arete} \\times ${arete} \\times ${arete} = ${volume}$.`,
          `L'arête mesure $${arete}$ cm.`
        ),
      };
    },
  },

  /* ═══════════ fct_eq_racine_cubique ═══════════ */

  {
    kind: "template",
    id: "stmg_eq_racine_cubique_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_equations_puissance",
    microId: "fct_eq_racine_cubique",
    difficulty: 2,
    theme: "neutral",
    hint: "$c^{1/3}$ et $\\sqrt[3]{c}$ sont deux notations du même nombre.",
    tags: ["stmg", "maths", "fonctions", "equations", "template"],
    generate: () => {
      const n = randomInt(2, 12);
      const c = n * n * n;
      return {
        text: `Que vaut $${c}^{\\frac{1}{3}}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${n}$`, [
          `$${fr(c / 3)}$`,
          `$${n * n}$`,
          `$${c * 3}$`,
          `$${fr(Math.round(Math.sqrt(c) * 100) / 100)}$`,
          `$${n + 1}$`,
        ]),
        expected: [`$${n}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "L'exposant $\\dfrac{1}{3}$ désigne la racine cubique : $c^{\\frac{1}{3}} = \\sqrt[3]{c}$, c'est-à-dire l'unique nombre dont le cube vaut $c$.",
          "On cherche le nombre dont le cube donne $c$ — élever à la puissance $\\dfrac{1}{3}$ n'est pas diviser par $3$.",
          `$${n}^3 = ${c}$, donc $${c}^{\\frac{1}{3}} = ${n}$.`,
          `$${c}^{\\frac{1}{3}} = ${n}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${fr(c / 3)}$`,
            cause: "a divisé par 3 au lieu de prendre la racine cubique",
          },
          {
            choice: `$${fr(Math.round(Math.sqrt(c) * 100) / 100)}$`,
            cause: "a pris la racine carrée au lieu de la racine cubique",
          },
        ],
      };
    },
  },
];
