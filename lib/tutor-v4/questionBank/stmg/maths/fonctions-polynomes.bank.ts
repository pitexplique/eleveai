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
      // ⛔⛔ Racines OPPOSÉES interdites. Avec $-2$ et $2$, le piège
      // « racines recopiées sans changer de signe » redonne le MÊME polynôme,
      // écrit dans l'autre ordre : $(x+2)(x-2)$ et $(x-2)(x+2)$ étaient
      // proposés ensemble, et l'élève qui prenait le second avait raison tout
      // en étant compté faux. Même famille que le $x = 4$ ou $x = -4$ du
      // 16/08.
      const r2brut = r1 + randomInt(2, 5);
      const r2 = r2brut === -r1 ? r2brut + 1 : r2brut;
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

  {
    // ANGLE 2 — de l'EXPRESSION vers la courbe. Le premier item part du dessin
    // et cherche la formule ; celui-ci part de la formule et demande à quoi
    // ressemble le dessin, sans le montrer. C'est l'autre sens de
    // l'association, et le seul qui serve quand on n'a pas de graphique sous
    // les yeux — en devoir, par exemple.
    // ⚠️ Pas de figure ici, volontairement : la tracer répondrait à la
    // question. Le premier item, lui, porte la sienne.
    kind: "template",
    id: "stmg_d2_associer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_courbe",
    microId: "fct_d2_associer",
    difficulty: 3,
    theme: "neutral",
    hint: "Les racines se lisent dans les parenthèses — attention aux signes — et l'orientation dans le coefficient devant.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = randomInt(-4, 0);
      // ⛔ Racines opposées interdites, pour la même raison que dans le premier
      // item : « coupe l'axe en $-2$ et $2$ » et « en $2$ et $-2$ » décrivent
      // la même courbe.
      const r2brut = r1 + randomInt(2, 5);
      const r2 = r2brut === -r1 ? r2brut + 1 : r2brut;
      const a = pick([1, 2, -1, -2] as const);
      const decrire = (s1: number, s2: number, vers: string) =>
        `elle coupe l'axe des abscisses en $${s1}$ et $${s2}$, et elle est tournée vers ${vers}`;
      const bonne = decrire(r1, r2, a > 0 ? "le haut" : "le bas");
      return {
        text:
          `Soit $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}$. ` +
          `Que peut-on dire de sa courbe, sans la tracer ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          decrire(r1, r2, a > 0 ? "le bas" : "le haut"),
          decrire(-r1, -r2, a > 0 ? "le haut" : "le bas"),
          "elle ne coupe pas l'axe des abscisses",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans $a(x - x_1)(x - x_2)$, les nombres $x_1$ et $x_2$ sont les racines — donc les abscisses des points où la courbe coupe l'axe — et le signe de $a$ donne l'orientation.",
          "On annule chaque parenthèse pour trouver les racines, puis on regarde le signe du coefficient de tête.",
          `$${facteur(r1)} = 0$ donne $x = ${r1}$, et $${facteur(r2)} = 0$ donne $x = ${r2}$. ` +
            `Comme $a = ${a}$ est ${a > 0 ? "positif" : "négatif"}, la parabole est tournée vers ${a > 0 ? "le haut" : "le bas"}.`,
          `La courbe ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: decrire(-r1, -r2, a > 0 ? "le haut" : "le bas"),
            cause: "a recopié les nombres écrits dans les parenthèses sans changer leur signe",
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

  {
    // ANGLE 2 — l'OUVERTURE, l'autre moitié du libellé. Le premier item ne
    // demande que le signe de $a$ ; celui-ci fait comparer quatre coefficients
    // et demande laquelle des paraboles est la plus resserrée. Le signe ne sert
    // à rien ici : c'est $|a|$ qui décide, et c'est ce qu'on oublie.
    // ⚠️ Sans figure : quatre paraboles dans un même repère seraient
    // illisibles, et une seule ne permettrait aucune comparaison.
    kind: "template",
    id: "stmg_d2_role_a_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_courbe",
    microId: "fct_d2_role_a",
    difficulty: 3,
    theme: "neutral",
    hint: "Plus $|a|$ est GRAND, plus les branches montent vite : la parabole est resserrée.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      // Quatre coefficients de valeurs absolues DEUX À DEUX distinctes : sans
      // cela, deux paraboles auraient la même ouverture et la question n'aurait
      // plus de réponse unique.
      const amplitudes = shuffle([0.2, 0.5, 1, 1.5, 2, 3, 5]).slice(0, 4);
      const coefficients = amplitudes.map((v) => (Math.random() < 0.5 ? v : -v));
      const laPlusGrande = coefficients.reduce((m, v) => (Math.abs(v) > Math.abs(m) ? v : m));
      // `coef()` ne sait écrire que des entiers ; ici les coefficients sont
      // décimaux, et « $1x^2$ » ne s'écrit pas.
      const ecrire = (k: number) => `$f(x) = ${k === 1 ? "" : k === -1 ? "-" : fr(k)}x^2$`;
      return {
        text: `Parmi ces quatre fonctions, laquelle a la parabole la plus RESSERRÉE ?`,
        format: "qcm",
        choices: shuffle(coefficients.map(ecrire)),
        expected: [ecrire(laPlusGrande)],
        comparator: "mcq_exact",
        explanation: exp(
          "Le coefficient $a$ commande deux choses : son SIGNE donne l'orientation de la parabole, sa VALEUR ABSOLUE son ouverture. Plus $|a|$ est grand, plus la parabole est resserrée.",
          "On compare les valeurs absolues, sans tenir compte des signes.",
          `Les valeurs absolues sont ${coefficients.map((v) => `$${fr(Math.abs(v))}$`).join(", ")} : ` +
            `la plus grande est $${fr(Math.abs(laPlusGrande))}$.`,
          `La parabole la plus resserrée est celle de ${ecrire(laPlusGrande)}.`
        ),
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

  {
    // ANGLE 2 — la translation est DÉCRITE, l'expression est cherchée. Le
    // premier item lit l'effet d'un $+b$ ; celui-ci part du déplacement voulu
    // et demande la formule. Le piège est le signe : « vers le bas » s'écrit
    // avec un moins, et c'est là que la moitié de la classe se trompe.
    kind: "template",
    id: "stmg_d2_translation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_courbe",
    microId: "fct_d2_translation",
    difficulty: 2,
    theme: "neutral",
    hint: "Monter, c'est ajouter ; descendre, c'est retrancher.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2] as const);
      const d = pick([2, 3, 4, 5, 6] as const);
      const versLeHaut = Math.random() < 0.5;
      const ecrire = (k: number, c: number) =>
        c === 0 ? `$f(x) = ${coef(k)}x^2$` : `$f(x) = ${coef(k)}x^2 ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$`;
      const bonne = ecrire(a, versLeHaut ? d : -d);
      return {
        text:
          `On translate la courbe de $g(x) = ${coef(a)}x^2$ de $${d}$ unités vers le ${versLeHaut ? "haut" : "bas"}. ` +
          `Quelle est l'expression de la fonction $f$ obtenue ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          ecrire(a, versLeHaut ? -d : d),
          `$f(x) = ${coef(a)}(x ${versLeHaut ? "+" : "-"} ${d})^2$`,
          ecrire(a * d, 0),
          ecrire(a, versLeHaut ? d * 2 : -d * 2),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Ajouter une constante à l'expression d'une fonction ajoute cette constante à toutes les ordonnées : la courbe se déplace verticalement, sans changer de forme.",
          "On ajoute le déplacement s'il va vers le haut, on le retranche s'il va vers le bas.",
          `Translater de $${d}$ vers le ${versLeHaut ? "haut" : "bas"} revient à ${versLeHaut ? "ajouter" : "retrancher"} $${d}$ : ` +
            `$f(x) = ${coef(a)}x^2 ${versLeHaut ? "+" : "-"} ${d}$.`,
          `L'expression obtenue est ${bonne}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$f(x) = ${coef(a)}(x ${versLeHaut ? "+" : "-"} ${d})^2$`,
            cause: "a placé le déplacement DANS le carré, ce qui déplace la courbe horizontalement",
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

  {
    // ANGLE 2 — l'axe trouvé par DEUX IMAGES ÉGALES, sans racine ni courbe. Le
    // premier item passe par les racines ; ici il n'y en a pas de données, et
    // c'est la symétrie elle-même qui parle : deux antécédents d'une même image
    // sont à égale distance de l'axe. C'est la route qu'ouvrent les sujets de
    // bac quand la forme factorisée n'est pas donnée.
    // ⚠️ Sans figure : la parabole montrerait son sommet, et il n'y aurait plus
    // rien à déduire.
    kind: "template",
    id: "stmg_d2_axe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_symetrie",
    microId: "fct_d2_axe_symetrie",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux nombres qui ont la même image encadrent l'axe : il passe à leur milieu.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template", "short"],
    generate: () => {
      const axe = randomInt(-3, 4);
      const d = randomInt(1, 4);
      const x1 = axe - d;
      const x2 = axe + d;
      const image = pick([-6, -2, 3, 5, 8, 12] as const);
      return {
        text:
          `Une parabole représente une fonction $f$ du second degré. ` +
          `On sait que $f(${x1}) = ${image}$ et $f(${x2}) = ${image}$. ` +
          `Quelle est l'abscisse de son axe de symétrie ?`,
        format: "short",
        expected: [fr(axe)],
        comparator: "number_equal",
        explanation: exp(
          "Une parabole est symétrique par rapport à la droite verticale passant par son sommet : deux nombres qui ont la même image sont donc symétriques par rapport à cet axe.",
          "On calcule le milieu des deux antécédents.",
          `$\\dfrac{${x1} + ${x2}}{2} = \\dfrac{${x1 + x2}}{2} = ${fr(axe)}$.`,
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

  {
    // ANGLE 2 — OÙ, et non COMBIEN. Le premier item calcule la valeur de
    // l'extremum ; celui-ci demande la quantité qui le réalise, dans une
    // situation de gestion. C'est la question du sujet de bac — « pour quelle
    // production le bénéfice est-il maximal ? » —, et elle se répond sans
    // calculer le bénéfice lui-même.
    kind: "template",
    id: "stmg_d2_extremum_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_symetrie",
    microId: "fct_d2_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "Le maximum d'une parabole tournée vers le bas est atteint sur son axe de symétrie, au milieu des deux racines.",
    tags: ["stmg", "maths", "fonctions", "degre2", "gestion", "template", "short"],
    generate: () => {
      // Deux seuils de rentabilité pairs entre eux : leur milieu est entier,
      // donc la quantité optimale est un nombre d'articles, pas une fraction.
      const seuilBas = pick([10, 20, 30, 40] as const);
      const seuilHaut = seuilBas + 2 * pick([10, 15, 20, 25, 30] as const);
      const optimum = (seuilBas + seuilHaut) / 2;
      const a = pick([-1, -2, -0.5] as const);
      return {
        text:
          `Le bénéfice d'une entreprise, en euros, pour $x$ articles vendus, est ` +
          `$B(x) = ${a === -1 ? "-" : fr(a)}(x - ${seuilBas})(x - ${seuilHaut})$. ` +
          `Pour quelle quantité vendue le bénéfice est-il maximal ?`,
        format: "short",
        expected: [fr(optimum)],
        comparator: "number_equal",
        explanation: exp(
          "Une parabole tournée vers le bas atteint son MAXIMUM au sommet, c'est-à-dire sur son axe de symétrie — lequel passe au milieu des deux racines.",
          "On calcule la demi-somme des deux racines ; le coefficient $a$ ne sert qu'à savoir qu'il s'agit bien d'un maximum.",
          `Les racines sont $${seuilBas}$ et $${seuilHaut}$ : ce sont les quantités où le bénéfice s'annule. ` +
            `Le sommet est en $\\dfrac{${seuilBas} + ${seuilHaut}}{2} = ${fr(optimum)}$, et $a = ${fr(a)}$ est négatif, donc c'est bien un maximum.`,
          `Le bénéfice est maximal pour $${fr(optimum)}$ articles vendus — il vaut alors $${fr(a * (optimum - seuilBas) * (optimum - seuilHaut))}$ €.`
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

  {
    // ANGLE 2 — l'autre ANTÉCÉDENT, pas l'autre image. Le premier item donne
    // une abscisse et demande l'image de sa symétrique ; celui-ci donne une
    // image et demande quel AUTRE nombre la partage. La symétrie sert dans les
    // deux sens, et le second est celui qu'on ne travaille jamais.
    kind: "template",
    id: "stmg_d2_symetrie_images_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_symetrie",
    microId: "fct_d2_symetrie_images",
    difficulty: 3,
    theme: "neutral",
    hint: "L'axe est au milieu : l'autre antécédent est aussi loin de l'axe, mais de l'autre côté.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template", "short"],
    generate: () => {
      const axe = randomInt(-2, 4);
      const d = randomInt(1, 4);
      const connu = axe - d;
      const cherche = axe + d;
      const image = pick([-8, -3, 2, 6, 9, 14] as const);
      return {
        text:
          `Une parabole a pour axe de symétrie la droite d'équation $x = ${fr(axe)}$, ` +
          `et l'on sait que $f(${connu}) = ${image}$. ` +
          `Quel AUTRE nombre a également $${image}$ pour image par $f$ ?`,
        format: "short",
        expected: [fr(cherche)],
        comparator: "number_equal",
        explanation: exp(
          "Sur une parabole, deux nombres symétriques par rapport à l'axe ont la même image : à toute image atteinte hors du sommet correspondent donc DEUX antécédents.",
          "On mesure la distance de l'antécédent connu à l'axe, puis on reporte cette distance de l'autre côté.",
          `$${connu}$ est à la distance $${fr(axe - connu)}$ de l'axe $x = ${fr(axe)}$. ` +
            `De l'autre côté : $${fr(axe)} + ${fr(d)} = ${fr(cherche)}$.`,
          `L'autre antécédent de $${image}$ est $${fr(cherche)}$.`
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
      // ⛔⛔ Racines OPPOSÉES interdites : le piège « racines recopiées sans
      // changer de signe » proposerait alors « $2$ et $-2$ » à côté de
      // « $-2$ et $2$ » — le même couple, écrit dans l'autre sens.
      if (r2 === -r1) r2 = r2 + 1;
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

  {
    // ANGLE 2 — la RÈGLE ISOLÉE : le produit nul ne vaut que pour ZÉRO. Le
    // premier item fait annuler des facteurs ; celui-ci met en scène l'élève
    // qui applique la même recette à un produit égal à $12$. C'est l'erreur qui
    // survit le plus longtemps, parce qu'elle marche une fois sur deux au
    // hasard et qu'on ne la corrige jamais explicitement.
    kind: "template",
    id: "stmg_d2_racines_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factorisee",
    microId: "fct_d2_racines_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Un produit vaut $12$ de mille façons : $2 \\times 6$, $4 \\times 3$, $24 \\times 0,5$… mais il ne vaut $0$ que si un facteur est nul.",
    tags: ["stmg", "maths", "fonctions", "degre2", "diagnostic", "template"],
    generate: () => {
      const r1 = pick([-5, -3, -2, 1, 2, 4] as const);
      // ⛔ Une racine nulle donnerait le facteur « x », dont le retrait des
      // parenthèses ne laisse rien : la phrase de l'élève serait vide.
      const r2brut = r1 + pick([2, 3, 5] as const);
      const r2 = r2brut === 0 ? r1 + 6 : r2brut;
      const k = pick([6, 8, 10, 12] as const);
      const bonne = "il se trompe : cette règle ne vaut que si le produit est NUL";
      return {
        text:
          `Un élève doit résoudre $${facteur(r1)}${facteur(r2)} = ${k}$. ` +
          `Il écrit : « $${facteur(r1).slice(1, -1)} = ${k}$ ou $${facteur(r2).slice(1, -1)} = ${k}$ ». ` +
          `Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `il a raison : un produit vaut $${k}$ dès que l'un de ses facteurs vaut $${k}$`,
          "il se trompe : il fallait écrire « et » à la place de « ou »",
          "il a raison, mais il a oublié de vérifier ses deux solutions",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit de facteurs est nul si, et seulement si, l'un au moins de ses facteurs est nul. Cette propriété est propre à ZÉRO : elle ne se transpose à aucun autre nombre.",
          "Devant une équation produit, on regarde d'abord ce qu'il y a à droite du signe égal.",
          `$${k}$ s'écrit de beaucoup de façons : $1 \\times ${k}$, $2 \\times ${k / 2}$, et une infinité d'autres avec des décimaux. ` +
            `Rien n'oblige donc $${facteur(r1).slice(1, -1)}$ à valoir $${k}$. ` +
            `Pour résoudre, il faudrait tout ramener à zéro : $${facteur(r1)}${facteur(r2)} - ${k} = 0$.`,
          bonne
        ),
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

  {
    // ANGLE 2 — UNE LIGNE du tableau, pas le résultat final. Le premier item
    // donne le signe du produit ; celui-ci descend d'un cran et demande le
    // signe d'un SEUL facteur sur un intervalle. C'est la ligne qu'on remplit
    // en premier au brouillon, et celle qu'un élève saute en récitant « du
    // signe de a à l'extérieur ».
    // ⚠️ Sans figure : la parabole donnerait le signe du produit, pas celui du
    // facteur — elle ne répondrait pas à la question posée.
    kind: "template",
    id: "stmg_d2_signe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factorisee",
    microId: "fct_d2_signe_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "Un facteur $x - r$ est négatif AVANT $r$ et positif après : il ne change de signe qu'une fois.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = randomInt(-4, 0);
      const r2 = r1 + randomInt(2, 5);
      const a = pick([1, 2, -1, -2] as const);
      const premier = Math.random() < 0.5;
      const racineDuFacteur = premier ? r1 : r2;
      // Trois zones possibles ; le signe du facteur choisi dépend de celle où
      // l'on se place.
      const zone = pick(["gauche", "milieu", "droite"] as const);
      const intervalle =
        zone === "gauche"
          ? `$]-\\infty\\,;\\,${r1}[$`
          : zone === "milieu"
            ? `$]${r1}\\,;\\,${r2}[$`
            : `$]${r2}\\,;\\,+\\infty[$`;
      const temoin = zone === "gauche" ? r1 - 1 : zone === "milieu" ? (r1 + r2) / 2 : r2 + 1;
      const signe = temoin - racineDuFacteur > 0 ? "positif" : "négatif";
      return {
        text:
          `On dresse le tableau de signes de $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}$. ` +
          `Sur ${intervalle}, quel est le signe du seul facteur $${facteur(racineDuFacteur)}$ ?`,
        format: "qcm",
        choices: shuffle([
          "positif",
          "négatif",
          "nul",
          "il change de signe sur cet intervalle",
        ]),
        expected: [signe],
        comparator: "mcq_exact",
        explanation: exp(
          "Un tableau de signes se construit ligne par ligne : chaque facteur du premier degré $x - r$ est négatif avant $r$, nul en $r$, positif après. Le signe du produit s'obtient ensuite en multipliant les lignes.",
          "On compare l'intervalle à la racine DU FACTEUR étudié, pas aux deux racines à la fois.",
          `Le facteur $${facteur(racineDuFacteur)}$ s'annule en $${racineDuFacteur}$. ` +
            `Sur ${intervalle}, prenons $x = ${fr(temoin)}$ : $${fr(temoin)} - (${racineDuFacteur}) = ${fr(temoin - racineDuFacteur)}$, ` +
            `qui est ${signe}.`,
          `Sur ${intervalle}, le facteur $${facteur(racineDuFacteur)}$ est ${signe}.`
        ),
        choiceDiagnostics: [
          {
            choice: "il change de signe sur cet intervalle",
            cause: "un facteur du premier degré ne change de signe qu'en sa racine, qui n'est pas dans cet intervalle ouvert",
          },
        ],
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

  {
    // ANGLE 2 — l'inéquation POSÉE PAR LA SITUATION. Le premier item la donne
    // toute écrite ; ici elle est cachée dans une phrase de gestion — « à
    // partir de quand l'entreprise est-elle bénéficiaire ? » — et l'élève doit
    // reconnaître qu'on lui demande $B(x) > 0$. C'est la seule forme sous
    // laquelle elle tombe au bac.
    kind: "template",
    id: "stmg_d2_inequation_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factorisee",
    microId: "fct_d2_inequation",
    difficulty: 3,
    theme: "neutral",
    hint: "« Être bénéficiaire » signifie $B(x) > 0$ : cherche où la parabole est au-dessus de l'axe.",
    tags: ["stmg", "maths", "fonctions", "degre2", "gestion", "canvas", "template"],
    generate: () => {
      const seuilBas = pick([10, 20, 30, 40] as const);
      const seuilHaut = seuilBas + pick([20, 30, 40, 50, 60] as const);
      const a = pick([-1, -2] as const);
      const bonne = `pour $x$ compris entre $${seuilBas}$ et $${seuilHaut}$`;
      return {
        text:
          `Le bénéfice d'une entreprise, en euros, pour $x$ articles vendus, est ` +
          `$B(x) = ${a === -1 ? "-" : a}(x - ${seuilBas})(x - ${seuilHaut})$. ` +
          `Pour quelles quantités l'entreprise est-elle bénéficiaire ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `pour $x$ inférieur à $${seuilBas}$ ou supérieur à $${seuilHaut}$`,
          `pour $x$ supérieur à $${seuilHaut}$`,
          "pour toutes les quantités",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(
          (x: number) => a * (x - seuilBas) * (x - seuilHaut),
          0,
          seuilHaut + 20,
          "Bénéfice en fonction de la quantité vendue",
          { pas: (seuilHaut + 20) / 60, marques: [seuilBas, seuilHaut] }
        ),
        explanation: exp(
          "Être bénéficiaire, c'est avoir un bénéfice STRICTEMENT POSITIF : la question revient à résoudre $B(x) > 0$.",
          "On repère les racines — les seuils où le bénéfice s'annule — puis on regarde de quel côté la parabole est au-dessus de l'axe.",
          `$B$ s'annule en $${seuilBas}$ et $${seuilHaut}$. Le coefficient $${a}$ est négatif, ` +
            `donc la parabole est tournée vers le bas : elle est au-dessus de l'axe ENTRE les deux racines.`,
          `L'entreprise est bénéficiaire ${bonne} — en dessous de $${seuilBas}$ articles, les charges ne sont pas couvertes ; au-delà de $${seuilHaut}$, elle vend à perte.`
        ),
        choiceDiagnostics: [
          {
            choice: `pour $x$ inférieur à $${seuilBas}$ ou supérieur à $${seuilHaut}$`,
            cause: "a pris l'extérieur des racines, ce qui vaudrait pour une parabole tournée vers le haut",
          },
        ],
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

  {
    // ANGLE 2 — TROUVER la racine parmi quatre, au lieu d'en valider une. Le
    // premier item répond par oui ou par non : une pièce lancée en l'air
    // réussit la moitié du temps. Ici il faut mener le calcul jusqu'à quatre
    // fois, et une seule valeur annule le polynôme.
    kind: "template",
    id: "stmg_d2_verifier_racine_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factoriser",
    microId: "fct_d2_verifier_racine",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace $x$ par chaque nombre proposé : celui qui donne $0$ est la racine.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = pick([-4, -3, -2, -1, 1, 2, 3, 4, 5] as const);
      const r2 = r1 + pick([1, 2, 3, 4] as const);
      const a = pick([1, 2, -1] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      const f = (x: number) => a * x * x + B * x + C;
      // Trois intrus qui ne sont racines ni l'un ni l'autre : on les prend
      // autour des racines, puis on écarte tout ce qui annulerait $f$.
      // ⛔ Le `Set` est indispensable : quand les deux racines se suivent, deux
      // candidats de la liste tombent sur le MÊME nombre et le QCM affichait
      // deux fois la même proposition.
      const intrus = shuffle(
        Array.from(new Set([r1 - 1, r1 + 1, r2 + 1, r2 - 1, r1 - 2, r2 + 2, r1 + 3]))
      )
        .filter((v) => f(v) !== 0)
        .slice(0, 3);
      return {
        text: `Parmi ces quatre nombres, lequel est une racine de $f(x) = ${trinome(a, B, C)}$ ?`,
        format: "qcm",
        choices: shuffle([`$${r1}$`, ...intrus.map((v) => `$${v}$`)]),
        expected: [`$${r1}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre est racine d'un polynôme lorsque son image vaut $0$. Chercher une racine « évidente » se fait par essais — le discriminant n'est pas au programme.",
          "On remplace $x$ par chaque candidat et l'on calcule, en s'arrêtant dès qu'on trouve $0$.",
          `$f(${r1}) = ${a} \\times (${r1})^2 + (${B}) \\times (${r1}) + (${C}) = 0$. ` +
            `Les trois autres donnent respectivement $${intrus.map((v) => fr(f(v))).join("$, $")}$.`,
          `La racine est $${r1}$.`
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

  {
    // ANGLE 2 — LA SECONDE RACINE, seule. Le premier item demande la forme
    // factorisée complète, et l'élève peut la reconnaître parmi quatre sans
    // rien chercher. Ici il n'y a rien à reconnaître : il faut passer par le
    // produit des racines, $x_1 x_2 = \frac{c}{a}$, qui est la méthode que le
    // programme prescrit à la place du discriminant.
    kind: "template",
    id: "stmg_d2_factoriser_connue_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factoriser",
    microId: "fct_d2_factoriser_racine_connue",
    difficulty: 3,
    theme: "neutral",
    hint: "Le produit des deux racines vaut $\\dfrac{c}{a}$ : divise, puis cherche par quoi multiplier la racine connue.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template", "short"],
    generate: () => {
      const r1 = pick([-4, -3, -2, -1, 1, 2, 3, 4] as const);
      const r2brut = pick([-5, -3, -1, 2, 4, 5, 6] as const);
      const r2 = r2brut === r1 ? r1 + 1 : r2brut;
      const a = pick([1, 2, -1] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      return {
        text:
          `On sait que $${r1}$ est une racine de $f(x) = ${trinome(a, B, C)}$. ` +
          `Quelle est son AUTRE racine ?`,
        format: "short",
        expected: [fr(r2)],
        comparator: "number_equal",
        explanation: exp(
          "Pour $f(x) = ax^2 + bx + c$ de racines $x_1$ et $x_2$, on a $f(x) = a(x - x_1)(x - x_2)$ : en développant, le terme constant vaut $a\\,x_1x_2$, donc $x_1 x_2 = \\dfrac{c}{a}$.",
          "On divise le terme constant par le coefficient de $x^2$, puis on divise le résultat par la racine connue.",
          `$\\dfrac{c}{a} = \\dfrac{${C}}{${a}} = ${fr(C / a)}$, donc $${r1} \\times x_2 = ${fr(C / a)}$ et $x_2 = ${fr(r2)}$. ` +
            `Vérification par la somme : $${r1} + ${r2} = ${r1 + r2}$, et $-\\dfrac{b}{a} = -\\dfrac{${B}}{${a}} = ${fr(-B / a)}$.`,
          `L'autre racine est $${fr(r2)}$.`
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

  {
    // ANGLE 2 — DÉVELOPPER, au lieu de vérifier. Le premier item propose une
    // égalité à valider par oui ou par non ; celui-ci demande le résultat, et
    // les quatre propositions se distinguent par le seul terme que la double
    // distributivité fait rater : celui en $x$.
    kind: "template",
    id: "stmg_d2_verifier_dev_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre2_factoriser",
    microId: "fct_d2_verifier_developpee",
    difficulty: 3,
    theme: "neutral",
    hint: "Le terme en $x$ vient de DEUX produits qu'il faut additionner, pas d'un seul.",
    tags: ["stmg", "maths", "fonctions", "degre2", "template"],
    generate: () => {
      const r1 = pick([-4, -3, -2, -1, 1, 2, 3] as const);
      const r2 = r1 + pick([1, 2, 3, 4] as const);
      const a = pick([1, 2, -1] as const);
      const B = -a * (r1 + r2);
      const C = a * r1 * r2;
      return {
        text: `Développe $${coef(a)}${facteur(r1)}${facteur(r2)}$.`,
        format: "qcm",
        choices: makeChoices(`$${trinome(a, B, C)}$`, [
          `$${trinome(a, -B, C)}$`,
          `$${trinome(a, B, -C)}$`,
          // Le développement mené SANS le coefficient de tête. Quand $a = 1$,
          // c'est la bonne réponse : le doublon est alors écarté au tri.
          `$${trinome(1, -(r1 + r2), r1 * r2)}$`,
          `$${trinome(a, B, C + 1)}$`,
          // Cinquième piège de réserve : la somme et le produit échangés. Sans
          // lui, le QCM tombait à trois lignes une fois sur trois — quand
          // $a = 1$, le développement « sans le coefficient » est le bon.
          `$${trinome(a, C, B)}$`,
        ]),
        expected: [`$${trinome(a, B, C)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Développer un produit de deux facteurs du premier degré, c'est multiplier chaque terme du premier par chaque terme du second : $(x - x_1)(x - x_2) = x^2 - (x_1 + x_2)x + x_1x_2$.",
          "On calcule d'abord la somme des racines — elle donne le terme en $x$, changé de signe — puis leur produit, qui donne le terme constant. Le coefficient $a$ multiplie ensuite le tout.",
          `Somme : $${r1} + ${r2} = ${r1 + r2}$ ; produit : $${r1} \\times ${r2} = ${r1 * r2}$. ` +
            `Avec $a = ${a}$ : $${trinome(a, B, C)}$.`,
          `Le développement est $${trinome(a, B, C)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${trinome(a, -B, C)}$`,
            cause: "a oublié que la somme des racines change de signe dans le développement",
          },
        ],
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

  {
    // ANGLE 2 — la SYMÉTRIE du cube. Le premier item associe une courbe à son
    // expression ; celui-ci fait fonctionner ce que la courbe montre sans le
    // dire : $x \mapsto ax^3$ envoie deux opposés sur deux opposés. C'est ce
    // qui distingue sa courbe de celle d'une parabole, où les deux images
    // seraient ÉGALES.
    // ⚠️ Sans figure : la courbe donnerait l'image à lire. Le premier item
    // porte la sienne.
    kind: "template",
    id: "stmg_d3_courbes_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_courbes",
    difficulty: 3,
    theme: "neutral",
    hint: "Le cube d'un nombre négatif est négatif : $(-2)^3 = -8$, alors que $(-2)^2 = 4$.",
    tags: ["stmg", "maths", "fonctions", "degre3", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2] as const);
      const x = pick([2, 3, 4, 5] as const);
      const image = a * x * x * x;
      return {
        text:
          `Soit $f(x) = ${coef(a)}x^3$. On sait que $f(${x}) = ${image}$. ` +
          `Que vaut $f(${-x})$ ?`,
        format: "short",
        expected: [fr(-image)],
        comparator: "number_equal",
        explanation: exp(
          "Le cube conserve le signe : $(-x)^3 = -x^3$. La courbe de $x \\mapsto ax^3$ est donc symétrique par rapport à l'ORIGINE, et deux nombres opposés ont des images opposées.",
          "On remplace $x$ par son opposé, ou l'on utilise directement la symétrie.",
          // ⚠️ Juxtaposition et non « \times » : avec $a = 1$, `coef` rend une
          // chaîne vide et la ligne commençait par un signe de multiplication.
          `$f(${-x}) = ${coef(a)}(${-x})^3 = ${coef(a)}(${-(x * x * x)}) = ${fr(-image)}$. ` +
            `Avec un carré, la réponse aurait été $${fr(image)}$ : c'est là toute la différence entre les deux courbes.`,
          `$f(${-x}) = ${fr(-image)}$.`
        ),
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
      // ⛔ Triplet SYMÉTRIQUE interdit : avec $-2$, $0$ et $2$, le piège
      // « racines recopiées sans changer de signe » redonne les trois mêmes
      // racines, dans l'autre ordre.
      const r3brut = r2 + randomInt(1, 3);
      const r3 = r2 === 0 && r3brut === -r1 ? r3brut + 1 : r3brut;
      const a = pick([1, 2, -1] as const);
      return {
        text: `Quelles sont les racines de $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}${facteur(r3)}$ ?`,
        format: "qcm",
        choices: makeChoices(`$${r1}$, $${r2}$ et $${r3}$`, [
          `$${-r1}$, $${-r2}$ et $${-r3}$`,
          `$${r1}$ et $${r3}$ seulement`,
          // ⚠️ Ce piège écrivait le coefficient de tête à la place d'une
          // racine : quand ce coefficient valait justement l'une des racines,
          // la proposition affichait « $1$, $-2$ et $1$ » — un nombre répété,
          // qu'on écarte à l'œil sans faire de maths.
          `$${r1}$, $${r2}$ et $${r3 + 1}$`,
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

  {
    // ANGLE 2 — ÉCRIRE le polynôme à partir de ses racines. Le premier item lit
    // les racines dans une forme donnée ; celui-ci la fabrique. C'est le geste
    // du modélisateur : on connaît les trois valeurs où la grandeur s'annule,
    // on écrit la fonction.
    kind: "template",
    id: "stmg_d3_racines_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_racines",
    difficulty: 3,
    theme: "neutral",
    hint: "Une racine $r$ donne le facteur $(x - r)$ : attention au signe quand $r$ est négatif.",
    tags: ["stmg", "maths", "fonctions", "degre3", "template"],
    generate: () => {
      const r1 = randomInt(-5, -2);
      const r2 = r1 + randomInt(1, 3);
      // ⛔ Triplet SYMÉTRIQUE interdit : avec $-2$, $0$ et $2$, le piège
      // « racines recopiées sans changer de signe » redonne les trois mêmes
      // racines, dans l'autre ordre.
      const r3brut = r2 + randomInt(1, 3);
      const r3 = r2 === 0 && r3brut === -r1 ? r3brut + 1 : r3brut;
      const a = pick([1, 2, 3, -1, -2] as const);
      const ecrire = (k: number, s1: number, s2: number, s3: number) =>
        `$${coef(k)}${facteur(s1)}${facteur(s2)}${facteur(s3)}$`;
      return {
        text:
          `Un polynôme de degré 3 a pour racines $${r1}$, $${r2}$ et $${r3}$, ` +
          `et son coefficient de tête vaut $${a}$. Quelle est sa forme factorisée ?`,
        format: "qcm",
        choices: makeChoices(ecrire(a, r1, r2, r3), [
          ecrire(a, -r1, -r2, -r3),
          ecrire(-a, r1, r2, r3),
          ecrire(1, r1, r2, r3),
          ecrire(a, r1, r2, r3 + 1),
        ]),
        expected: [ecrire(a, r1, r2, r3)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un polynôme de degré 3 de racines $x_1$, $x_2$, $x_3$ et de coefficient de tête $a$ s'écrit $a(x - x_1)(x - x_2)(x - x_3)$.",
          "On écrit un facteur par racine, en RETRANCHANT la racine — donc en ajoutant sa valeur absolue si elle est négative.",
          `La racine $${r1}$ donne le facteur $${facteur(r1)}$, et non $(x ${r1 < 0 ? "-" : "+"} ${Math.abs(r1)})$. ` +
            `De même pour les deux autres, et le coefficient $${a}$ se place devant.`,
          `La forme factorisée est ${ecrire(a, r1, r2, r3)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(a, -r1, -r2, -r3),
            cause: "a recopié les racines dans les parenthèses sans changer leur signe",
          },
        ],
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

  {
    // ANGLE 2 — TOUT l'ensemble des solutions, en une fois. Le premier item
    // désigne un intervalle et demande son signe ; celui-ci demande où $f$ est
    // positive, ce qui oblige à parcourir les quatre zones et à en retenir
    // DEUX, non contiguës. Un élève qui n'a pas compris l'alternance en donne
    // une seule.
    // ⛔ Compter les intervalles positifs ne ferait pas un item : avec trois
    // racines simples, la réponse serait toujours « deux ».
    // ⚠️ Sans figure : la courbe donnerait la réponse à l'œil, et l'alternance
    // — le seul objet de la question — ne servirait plus.
    kind: "template",
    id: "stmg_d3_signe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_signe",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois racines découpent la droite en quatre intervalles, et les signes alternent : la réponse en compte deux.",
    tags: ["stmg", "maths", "fonctions", "degre3", "template"],
    generate: () => {
      const r1 = randomInt(-5, -3);
      const r2 = r1 + randomInt(2, 3);
      const r3 = r2 + randomInt(2, 3);
      const a = pick([1, 2, -1, -2] as const);
      const positif = a > 0
        ? `$]${r1}\\,;\\,${r2}[ \\cup ]${r3}\\,;\\,+\\infty[$`
        : `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,${r3}[$`;
      const negatif = a > 0
        ? `$]-\\infty\\,;\\,${r1}[ \\cup ]${r2}\\,;\\,${r3}[$`
        : `$]${r1}\\,;\\,${r2}[ \\cup ]${r3}\\,;\\,+\\infty[$`;
      return {
        text:
          `Soit $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}${facteur(r3)}$. ` +
          `Sur quel ensemble $f$ est-elle strictement positive ?`,
        format: "qcm",
        choices: shuffle([
          positif,
          negatif,
          `$]${r3}\\,;\\,+\\infty[$`,
          `$]${r1}\\,;\\,${r3}[$`,
        ]),
        expected: [positif],
        comparator: "mcq_exact",
        explanation: exp(
          "Un polynôme donné sous forme factorisée change de signe à chacune de ses racines simples : d'un intervalle au suivant, le signe s'inverse. Trois racines donnent donc quatre zones, deux positives et deux négatives.",
          "On détermine le signe sur l'intervalle le plus à droite — c'est celui de $a$ —, puis on alterne en revenant vers la gauche.",
          `Ici $a = ${a}$ : à droite de $${r3}$, $f$ est ${a > 0 ? "positive" : "négative"} ; ` +
            `sur $]${r2}\\,;\\,${r3}[$ elle est ${a > 0 ? "négative" : "positive"} ; ` +
            `sur $]${r1}\\,;\\,${r2}[$, ${a > 0 ? "positive" : "négative"} ; ` +
            `et avant $${r1}$, ${a > 0 ? "négative" : "positive"}.`,
          `$f$ est strictement positive sur ${positif}.`
        ),
        choiceDiagnostics: [
          {
            choice: `$]${r3}\\,;\\,+\\infty[$`,
            cause: "n'a retenu qu'une seule des deux zones positives",
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

  {
    // ANGLE 2 — TROUVER l'intrus. Le premier item fait calculer une image et
    // laisse l'élève conclure ; celui-ci pose trois racines et un imposteur, et
    // demande lequel n'annule pas le produit. On ne peut y répondre qu'en
    // regardant les trois parenthèses, ce qui est exactement ce qu'on veut
    // qu'il fasse.
    kind: "template",
    id: "stmg_d3_verifier_racine_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_degre3",
    microId: "fct_d3_verifier_racine",
    difficulty: 2,
    theme: "neutral",
    hint: "Une racine annule l'une des parenthèses : regarde ce que chaque nombre y produit.",
    tags: ["stmg", "maths", "fonctions", "degre3", "template"],
    generate: () => {
      const r1 = randomInt(-4, -1);
      const r2 = r1 + randomInt(1, 3);
      const r3 = r2 + randomInt(1, 3);
      const a = pick([1, 2, -1] as const);
      // L'intrus est pris hors des trois racines, et l'on vérifie qu'il ne
      // tombe sur aucune d'elles.
      const intrus = pick([r1 - 1, r2 + 1, r3 + 1, r3 + 2, r1 - 2].filter((v) => v !== r1 && v !== r2 && v !== r3));
      return {
        text:
          `Soit $f(x) = ${coef(a)}${facteur(r1)}${facteur(r2)}${facteur(r3)}$. ` +
          `Parmi ces quatre nombres, lequel n'est PAS une racine de $f$ ?`,
        format: "qcm",
        choices: shuffle([`$${r1}$`, `$${r2}$`, `$${r3}$`, `$${intrus}$`]),
        expected: [`$${intrus}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Un produit est nul si, et seulement si, l'un de ses facteurs est nul : les racines d'une forme factorisée sont exactement les nombres qui annulent une parenthèse.",
          "On regarde, pour chaque nombre, si l'une des trois parenthèses s'annule.",
          `$${r1}$, $${r2}$ et $${r3}$ annulent chacun une parenthèse. ` +
            `Pour $${intrus}$, aucune ne s'annule : $f(${intrus}) = ${fr(a * (intrus - r1) * (intrus - r2) * (intrus - r3))}$.`,
          `Le nombre qui n'est pas racine est $${intrus}$.`
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

  {
    // ANGLE 2 — les DEUX solutions, hors de tout contexte. Le premier item est
    // une aire : la solution négative n'a pas de sens et l'élève l'écarte sans
    // même l'avoir vue. Ici il n'y a plus de local à mesurer, et l'équation
    // $x^2 = c$ rend bien deux nombres opposés. Les deux items disent ensemble
    // ce que le programme demande : résoudre, PUIS regarder la situation.
    kind: "template",
    id: "stmg_eq_carre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_equations_puissance",
    microId: "fct_eq_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux nombres opposés ont le même carré : ne garde pas seulement le positif.",
    tags: ["stmg", "maths", "fonctions", "equations", "template"],
    generate: () => {
      const n = randomInt(3, 15);
      const c = n * n;
      return {
        text: `Résous l'équation $x^2 = ${c}$.`,
        format: "qcm",
        choices: makeChoices(`$x = ${n}$ ou $x = -${n}$`, [
          `$x = ${n}$`,
          `$x = ${fr(c / 2)}$`,
          `$x = ${c}$ ou $x = -${c}$`,
          `il n'y a pas de solution`,
        ]),
        expected: [`$x = ${n}$ ou $x = -${n}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour $c > 0$, l'équation $x^2 = c$ admet DEUX solutions opposées : $\\sqrt{c}$ et $-\\sqrt{c}$. Elle n'en a aucune si $c < 0$, et une seule si $c = 0$.",
          "On cherche le nombre positif dont le carré vaut $c$, puis on n'oublie pas son opposé.",
          `$${n}^2 = ${c}$ et $(-${n})^2 = ${c}$ : les deux conviennent.`,
          `Les solutions sont $${n}$ et $-${n}$. Dans un problème de longueur, seule la positive serait retenue — mais l'équation, elle, en a bien deux.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = ${n}$`,
            cause: "n'a gardé que la solution positive alors qu'aucun contexte ne l'y oblige",
          },
        ],
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

  {
    // ANGLE 2 — DIAGNOSTIQUER la solution en trop. Le premier item fait
    // calculer une arête ; celui-ci met en scène l'élève qui applique au cube
    // la règle du carré et ajoute une solution négative. C'est l'erreur que
    // produit mécaniquement l'enchaînement des deux leçons.
    kind: "template",
    id: "stmg_eq_cube_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_equations_puissance",
    microId: "fct_eq_cube",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule $(-n)^3$ : le cube d'un nombre négatif est négatif.",
    tags: ["stmg", "maths", "fonctions", "equations", "diagnostic", "template"],
    generate: () => {
      const n = randomInt(2, 10);
      const c = n * n * n;
      const bonne = `il se trompe : $(-${n})^3 = ${-c}$, et non $${c}$`;
      return {
        text:
          `Un élève résout $x^3 = ${c}$ et répond : « $x = ${n}$ ou $x = -${n}$ ». ` +
          `Qu'en penses-tu ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `il a raison : comme pour $x^2$, il y a deux solutions opposées`,
          `il se trompe : l'équation $x^3 = ${c}$ n'a aucune solution`,
          `il se trompe : la seule solution est $${fr(c / 3)}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le cube conserve le signe : $(-x)^3 = -x^3$. L'équation $x^3 = c$ n'admet donc qu'UNE seule solution réelle, quel que soit le signe de $c$ — contrairement à $x^2 = c$, qui en a deux quand $c > 0$.",
          "On teste la solution négative proposée en l'élevant au cube.",
          `$${n}^3 = ${c}$ : cette solution convient. Mais $(-${n})^3 = -${n} \\times -${n} \\times -${n} = ${-c}$, ` +
            `qui n'est pas $${c}$ : la seconde solution est fausse.`,
          `La seule solution est $${n}$ : $(-${n})^3$ vaut $${-c}$, et non $${c}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `il a raison : comme pour $x^2$, il y a deux solutions opposées`,
            cause: "a transposé au cube une règle qui ne vaut que pour le carré",
          },
        ],
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

  {
    // ANGLE 2 — ÉCRIRE la solution qu'on ne sait pas calculer. Le premier item
    // tombe sur un cube parfait et la racine cubique se devine ; ici le nombre
    // n'en est pas un, et il ne reste que la NOTATION — ce que demande le
    // libellé. C'est aussi ce qu'attend un correcteur : une valeur exacte, pas
    // un arrondi de calculatrice.
    kind: "template",
    id: "stmg_eq_racine_cubique_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "fct_equations_puissance",
    microId: "fct_eq_racine_cubique",
    difficulty: 3,
    theme: "neutral",
    hint: "La racine cubique de $c$ est le nombre dont le CUBE vaut $c$ : elle s'écrit $\\sqrt[3]{c}$.",
    tags: ["stmg", "maths", "fonctions", "equations", "template"],
    generate: () => {
      // ⛔ Jamais un cube parfait : la question porte sur l'ÉCRITURE de la
      // solution, et un nombre rond ferait basculer l'élève vers le calcul.
      const c = pick([5, 7, 12, 20, 30, 50, 90, 150, 200, 500] as const);
      const bonne = `$x = \\sqrt[3]{${c}}$`;
      return {
        text: `Quelle est la solution exacte de l'équation $x^3 = ${c}$ ?`,
        format: "qcm",
        choices: shuffle([
          bonne,
          `$x = \\sqrt{${c}}$`,
          `$x = ${c}^3$`,
          `$x = \\dfrac{${c}}{3}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La racine cubique d'un réel positif $c$ est l'unique nombre dont le cube vaut $c$. On la note $\\sqrt[3]{c}$, ou encore $c^{\\frac{1}{3}}$ : les deux écritures désignent le même nombre.",
          "On reconnaît l'équation $x^3 = c$ et l'on écrit sa solution avec la notation, sans chercher de valeur décimale.",
          `$${c}$ n'est pas le cube d'un entier : la solution ne s'écrit pas simplement. ` +
            `À la calculatrice, $\\sqrt[3]{${c}} \\approx ${fr(Math.round(Math.cbrt(c) * 100) / 100)}$, ` +
            `mais la valeur EXACTE demandée est $\\sqrt[3]{${c}}$.`,
          `La solution exacte est $\\sqrt[3]{${c}}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$x = \\dfrac{${c}}{3}$`,
            cause: "a divisé par 3 : l'exposant $3$ n'est pas un facteur",
          },
        ],
      };
    },
  },
];
