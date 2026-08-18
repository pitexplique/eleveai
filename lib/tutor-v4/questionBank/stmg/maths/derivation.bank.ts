// lib/tutor-v4/questionBank/stmg/maths/derivation.bank.ts
//
// Notions : der_secante_tangente, der_nombre_derive, der_tangente_equation,
//           der_formules, der_polynome, der_variations, der_optimisation
//           (domaine STMGDE — « La dérivation comme concept mathématique
//            traduisant une évolution instantanée »)
//
// L'ordre du BO est un ordre de sens, et il est tenu ici : sécantes, puis
// tangente comme position limite, puis nombre dérivé, puis seulement les
// formules. « La notion de nombre dérivé est introduite à l'aide du taux de
// variation » — le calcul vient après l'image, jamais avant.
//
// ⛔ « Il est recommandé de ne pas donner la définition formelle de la notion
// de limite et de s'en tenir à une approche intuitive à partir d'exemples. »
// Aucun item ne manipule donc de limite : la tangente est décrite comme la
// position vers laquelle penchent les sécantes quand le second point se
// rapproche du premier.
//
// ⭐ Ce domaine est le plus graphique du programme, et c'est voulu : la
// dérivation ne se comprend pas en calcul pur. Sécante et tangente sont
// tracées côte à côte, le tableau de variations est affiché, la courbe de
// bénéfice accompagne le problème d'optimisation. Le calcul des dérivées
// arrive une fois l'image installée.
//
// Le contexte de gestion est celui que le texte nomme : « dans un cadre
// économique, le nombre dérivé est relié au coût marginal », et les
// « problèmes d'optimisation » sont cités comme l'usage principal.

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

function terme(c: number, partie: string, premier = false): string {
  if (c === 0) return "";
  const signe = c < 0 ? "-" : premier ? "" : "+";
  const abs = Math.abs(c);
  const nombre = abs === 1 && partie !== "" ? "" : String(abs);
  return `${signe}${premier && c > 0 ? "" : " "}${nombre}${partie}`;
}

/** Polynôme $ax^3 + bx^2 + cx + d$, termes nuls omis. */
function polynome(a: number, b: number, c: number, d: number): string {
  const m = [
    terme(a, "x^3", true),
    terme(b, "x^2", a === 0),
    terme(c, "x", a === 0 && b === 0),
    terme(d, "", a === 0 && b === 0 && c === 0),
  ].filter((x) => x !== "");
  return m.length === 0 ? "0" : m.join(" ").replace(/\s+/g, " ").trim();
}

/** Parabole seule, ou parabole + une droite (sécante ou tangente). */
function canvasParaboleDroite(
  a: number,
  b: number,
  c: number,
  droite: { pente: number; ordonnee: number; id: string } | null,
  titre: string,
  marques?: { x: number; label?: string }[]
): CanvasFigure {
  const f = (x: number) => a * x * x + b * x + c;
  const echantillon = [-6, -4, -2, 0, 2, 4, 6].map(f);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin: -6,
    xmax: 6,
    ymin: Math.floor(Math.min(...echantillon, 0)) - 2,
    ymax: Math.ceil(Math.max(...echantillon, 0)) + 2,
    grille: true,
    courbes: [
      { id: "f", type: "quadratique", a, b, c },
      ...(droite ? [{ id: droite.id, type: "affine" as const, a: droite.pente, b: droite.ordonnee }] : []),
    ],
    misesEnEvidence: marques?.map((m) => ({ point: { x: m.x, y: Math.round(f(m.x) * 100) / 100, label: m.label } })),
  };
}

/** Courbe quelconque échantillonnée en points (degré 3, courbes de gestion). */
function canvasCourbePoints(
  f: (x: number) => number,
  xmin: number,
  xmax: number,
  titre: string,
  options?: { pas?: number; marques?: number[]; droite?: { pente: number; ordonnee: number } }
): CanvasFigure {
  const pas = options?.pas ?? (xmax - xmin) / 60;
  const points: { x: number; y: number }[] = [];
  for (let x = xmin; x <= xmax + 1e-9; x += pas) {
    const y = f(x);
    if (Number.isFinite(y) && Math.abs(y) < 1e5) {
      points.push({ x: Math.round(x * 1000) / 1000, y: Math.round(y * 1000) / 1000 });
    }
  }
  const ys = points.map((p) => p.y);
  const marge = Math.max(1, (Math.max(...ys) - Math.min(...ys)) * 0.12);
  return {
    kind: "fonctionGraphique",
    titre,
    xmin,
    xmax,
    ymin: Math.floor(Math.min(...ys, 0) - marge),
    ymax: Math.ceil(Math.max(...ys, 0) + marge),
    grille: true,
    courbes: [
      { id: "f", type: "points", points },
      ...(options?.droite
        ? [{ id: "t", type: "affine" as const, a: options.droite.pente, b: options.droite.ordonnee }]
        : []),
    ],
    points: options?.marques?.map((x) => ({ x, y: Math.round(f(x) * 100) / 100 })),
  };
}

/* ─────────────────── réservoirs de contexte ─────────────────── */

/**
 * « de » contracté devant une grandeur qui porte déjà son article.
 *
 * Sans lui, le distracteur « la valeur de {grandeur} » donnait « la valeur de
 * le coût de production » — une faute dans une proposition de QCM.
 */
function deNomGrandeur(nom: string): string {
  if (nom.startsWith("le ")) return `du ${nom.slice(3)}`;
  if (nom.startsWith("les ")) return `des ${nom.slice(4)}`;
  return `de ${nom}`;
}

/**
 * ⚠️ CHAQUE PRODUCTION PORTE SON GENRE ET SON SINGULIER (18/08/2026).
 *
 * `unite.slice(0, -1)` rend bien « table » à partir de « tables », mais
 * l'article, lui, restait figé : « produire UN table de plus », « chacun des
 * 40 tables ». Trois des six productions sont féminines. Même famille que les
 * réservoirs des données croisées et des probabilités, qui portent déjà leur
 * genre : ne jamais ajouter une production sans le sien.
 */
const PRODUCTIONS = [
  { objet: "des paniers garnis", unite: "paniers", un: "un panier", chacun: "chacun", genre: "m" },
  { objet: "des coffrets cadeaux", unite: "coffrets", un: "un coffret", chacun: "chacun", genre: "m" },
  { objet: "des tables basses", unite: "tables", un: "une table", chacun: "chacune", genre: "f" },
  { objet: "des ruches", unite: "ruches", un: "une ruche", chacun: "chacune", genre: "f" },
  { objet: "des paires de sandales", unite: "paires", un: "une paire", chacun: "chacune", genre: "f" },
  { objet: "des sacs isothermes", unite: "sacs", un: "un sac", chacun: "chacun", genre: "m" },
] as const;

export const derivationBank: TutorBankItemV4[] = [
  /* ═══════════════════ der_secante_tracer ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_secante_tracer_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_secante_tangente",
    microId: "der_secante_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "Une sécante coupe la courbe en DEUX points : elle passe par les deux, pas seulement par un.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 1, 2, -1, -2, 3] as const);
      const c = pick([0, 1, -2, 2, -3] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x1 = randomInt(-4, 0);
      const x2 = x1 + randomInt(2, 5);
      const pente = (f(x2) - f(x1)) / (x2 - x1);
      return {
        text:
          `La courbe de $f$ est tracée, ainsi qu'une droite. ` +
          `Par quels points cette droite coupe-t-elle la courbe ?`,
        format: "qcm",
        choices: makeChoices(`les points d'abscisses $${x1}$ et $${x2}$`, [
          `le seul point d'abscisse $${x1}$`,
          `le seul point d'abscisse $${x2}$`,
          `les points d'abscisses $${x1 - 1}$ et $${x2}$`,
          `les points d'abscisses $${x1}$ et $${x2 + 1}$`,
          "elle ne coupe pas la courbe",
        ]),
        expected: [`les points d'abscisses $${x1}$ et $${x2}$`],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente, ordonnee: f(x1) - pente * x1, id: "sec" },
          "La courbe de f et une sécante",
          [
            { x: x1, label: `A(${x1})` },
            { x: x2, label: `B(${x2})` },
          ]
        ),
        explanation: exp(
          "Une sécante à une courbe est une droite qui la coupe en deux points distincts.",
          "On repère les deux points de contact marqués sur la figure, et l'on lit leurs abscisses.",
          `La droite passe par $A(${x1}\\,;\\,${fr(f(x1))})$ et $B(${x2}\\,;\\,${fr(f(x2))})$, ` +
            `et son coefficient directeur vaut $${fr(pente)}$ — le taux de variation de $f$ entre $${x1}$ et $${x2}$.`,
          `Elle coupe la courbe aux points d'abscisses $${x1}$ et $${x2}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — CHIFFRER la sécante, au lieu de l'identifier. Le premier item
    // demande quels points elle joint ; celui-ci demande sa pente. C'est le
    // taux de variation, et c'est par lui que le BO fait entrer la dérivation :
    // « la notion de nombre dérivé est introduite à l'aide du taux de
    // variation ». Une sécante reconnue mais jamais calculée ne mène nulle part.
    kind: "template",
    id: "stmg_der_secante_tracer_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_secante_tangente",
    microId: "der_secante_tracer",
    difficulty: 2,
    theme: "neutral",
    hint: "Coefficient directeur $= \\dfrac{\\text{différence des ordonnées}}{\\text{différence des abscisses}}$, dans le même ordre en haut et en bas.",
    tags: ["stmg", "maths", "derivation", "canvas", "template", "short"],
    generate: () => {
      // On choisit les abscisses pour que la pente tombe sur un entier : la
      // question porte sur le geste, pas sur un arrondi.
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 1, 2, -1, -2, 3] as const);
      const c = pick([0, 1, -2, 2, -3] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x1 = randomInt(-4, 0);
      const x2 = x1 + randomInt(2, 5);
      const pente = (f(x2) - f(x1)) / (x2 - x1);
      const ord = f(x1) - pente * x1;
      return {
        text:
          `La sécante tracée joint les points de la courbe d'abscisses $${x1}$ et $${x2}$. ` +
          `Quel est son coefficient directeur ?`,
        format: "short",
        expected: [fr(pente)],
        comparator: "number_equal",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente, ordonnee: ord, id: "secante" },
          "Une sécante à la courbe",
          [{ x: x1 }, { x: x2 }]
        ),
        explanation: exp(
          "Le coefficient directeur d'une sécante est le TAUX DE VARIATION de la fonction entre les deux points : de combien $f$ varie, rapporté à la variation de $x$.",
          "On lit les deux points sur la courbe, puis on divise la différence des ordonnées par la différence des abscisses — en gardant le même ordre au numérateur et au dénominateur.",
          `$f(${x1}) = ${fr(f(x1))}$ et $f(${x2}) = ${fr(f(x2))}$. ` +
            `Donc le taux vaut $\\dfrac{${fr(f(x2))} - ${fr(f(x1))}}{${x2} - (${x1})} = \\dfrac{${fr(f(x2) - f(x1))}}{${x2 - x1}} = ${fr(pente)}$. ` +
            `⚠️ Inverser l'ordre en haut sans l'inverser en bas donnerait $${fr(-pente)}$ — le signe contraire.`,
          `Le coefficient directeur de la sécante vaut $${fr(pente)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ der_tangente_limite ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_tangente_limite_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_secante_tangente",
    microId: "der_tangente_limite",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand le second point se rapproche du premier, la sécante penche de plus en plus vers une position unique.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1] as const);
      const b = pick([0, 1, -2, 2] as const);
      const c = pick([0, 1, -1] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x0 = randomInt(-3, 3);
      const h = pick([2, 1.5, 1, 0.5] as const);
      const penteSec = (f(x0 + h) - f(x0)) / h;
      const penteTan = 2 * a * x0 + b;
      return {
        text:
          `La sécante tracée passe par les points d'abscisses $${x0}$ et $${fr(x0 + h)}$. ` +
          `Vers quoi tend cette sécante lorsque le second point se rapproche du premier ?`,
        format: "qcm",
        choices: shuffle([
          `vers la tangente à la courbe au point d'abscisse $${x0}$`,
          `vers l'axe des abscisses`,
          `vers une droite verticale`,
          `elle ne tend vers rien de particulier`,
        ]),
        expected: [`vers la tangente à la courbe au point d'abscisse $${x0}$`],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: penteSec, ordonnee: f(x0) - penteSec * x0, id: "sec" },
          "La sécante, quand le second point se rapproche",
          [
            { x: x0, label: `A(${x0})` },
            { x: x0 + h, label: "B" },
          ]
        ),
        explanation: exp(
          "La tangente à une courbe en un point est la position LIMITE des sécantes passant par ce point, lorsque le second point s'en rapproche.",
          "On observe le mouvement de la sécante : sa pente évolue et se stabilise sur une valeur.",
          `Ici la sécante a pour pente $${fr(penteSec)}$ ; en rapprochant $B$ de $A$, cette pente tend vers $${fr(penteTan)}$, ` +
            `qui est le nombre dérivé $f'(${x0})$.`,
          `La sécante tend vers la tangente au point d'abscisse $${x0}$.`
        ),
        choiceDiagnostics: [
          {
            choice: "elle ne tend vers rien de particulier",
            cause: "c'est précisément cette position limite qui définit la tangente",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — la limite VUE SUR DES NOMBRES. Le premier item demande vers
    // quoi penche la sécante ; celui-ci donne trois pentes successives, de plus
    // en plus proches, et fait lire vers quel nombre elles vont.
    //
    // ⛔ Le BO l'écrit : « il est recommandé de ne pas donner la définition
    // formelle de la notion de limite et de s'en tenir à une approche
    // intuitive à partir d'exemples ». Trois nombres qui se resserrent, c'est
    // exactement cette approche-là — aucune limite n'est écrite.
    kind: "template",
    id: "stmg_der_tangente_limite_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_secante_tangente",
    microId: "der_tangente_limite",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde de quel nombre les trois pentes se rapprochent quand le second point rejoint le premier.",
    tags: ["stmg", "maths", "derivation", "canvas", "template", "short"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 1, 2, -2] as const);
      const c = pick([0, 1, -1] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x0 = randomInt(-3, 3);
      const penteTan = 2 * a * x0 + b;
      // Trois écarts qui se resserrent : les pentes valent $2ax_0 + b + ah$.
      const hs = [1, 0.5, 0.1] as const;
      const pentes = hs.map((h) => Math.round((2 * a * x0 + b + a * h) * 1000) / 1000);
      const ordDerniere = f(x0) - pentes[2] * x0;
      return {
        text:
          `On trace des sécantes à la courbe partant du point d'abscisse $${x0}$, ` +
          `en rapprochant le second point : leurs coefficients directeurs valent successivement ` +
          `$${fr(pentes[0])}$, puis $${fr(pentes[1])}$, puis $${fr(pentes[2])}$. ` +
          `Vers quel nombre se dirigent-ils ?`,
        format: "short",
        expected: [fr(penteTan)],
        comparator: "number_equal",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: pentes[2], ordonnee: ordDerniere, id: "secante" },
          `La dernière sécante, presque confondue avec la tangente`,
          [{ x: x0 }]
        ),
        explanation: exp(
          "Quand le second point se rapproche du premier, la sécante penche de plus en plus vers une position limite : la TANGENTE. Son coefficient directeur est le nombre dérivé.",
          "On observe la suite des coefficients directeurs et l'on voit vers quel nombre ils se resserrent — sans avoir besoin d'écrire une limite.",
          `Les écarts entre le second point et le premier valent $1$, puis $0{,}5$, puis $0{,}1$ : ` +
            `les pentes passent de $${fr(pentes[0])}$ à $${fr(pentes[1])}$ puis $${fr(pentes[2])}$. ` +
            `Elles se resserrent autour de $${fr(penteTan)}$ — et c'est bien $f'(${x0}) = ${2 * a} \\times ${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(penteTan)}$.`,
          `Les coefficients directeurs se dirigent vers $${fr(penteTan)}$, le nombre dérivé en $${x0}$.`
        ),
      };
    },
  },

  /* ═══════════════ der_tangente_reconnaitre ═══════════════ */

  {
    kind: "template",
    id: "stmg_der_tangente_reconnaitre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_secante_tangente",
    microId: "der_tangente_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "La tangente touche la courbe en un point et suit sa direction ; la sécante la traverse en deux points.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 1, 2, -1, -3] as const);
      const c = pick([0, 1, -1, 2] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x0 = randomInt(-3, 3);
      const estTangente = Math.random() < 0.5;
      const pente = estTangente ? 2 * a * x0 + b : (f(x0 + 3) - f(x0)) / 3;
      return {
        text: `La droite tracée est-elle la tangente à la courbe au point d'abscisse $${x0}$, ou une sécante ?`,
        format: "qcm",
        choices: shuffle(["la tangente", "une sécante", "ni l'une ni l'autre", "les deux à la fois"]),
        expected: [estTangente ? "la tangente" : "une sécante"],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente, ordonnee: f(x0) - pente * x0, id: "d" },
          "Tangente ou sécante ?",
          [{ x: x0, label: `x = ${x0}` }]
        ),
        explanation: exp(
          "La tangente en un point touche la courbe sans la traverser au voisinage de ce point : elle en épouse la direction. Une sécante coupe la courbe en deux points distincts.",
          "On regarde combien de fois la droite rencontre la courbe autour du point marqué.",
          estTangente
            ? `La droite a pour pente $${fr(pente)}$, qui vaut exactement $f'(${x0}) = ${fr(2 * a * x0 + b)}$ : elle épouse la courbe.`
            : `La droite a pour pente $${fr(pente)}$, alors que la tangente en $${x0}$ aurait pour pente $${fr(2 * a * x0 + b)}$ : elle traverse la courbe.`,
          `C'est ${estTangente ? "la tangente" : "une sécante"}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le CRITÈRE, au lieu du cas particulier. Le premier item montre
    // une droite et demande si c'est la tangente ; celui-ci demande à quoi on
    // la reconnaît. Un élève peut trancher juste plusieurs fois de suite « au
    // feeling » sans savoir dire ce qu'il regarde — et se tromper dès que la
    // courbe change d'allure.
    kind: "template",
    id: "stmg_der_tangente_reconnaitre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_secante_tangente",
    microId: "der_tangente_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Une sécante TRAVERSE la courbe en deux points ; une tangente l'ÉPOUSE en un seul, sur tout un voisinage.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 1, 2, -1, -3] as const);
      const c = pick([0, 1, -1, 2] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x0 = randomInt(-3, 3);
      const pente = 2 * a * x0 + b;
      const ord = f(x0) - pente * x0;
      const bonne =
        "elle touche la courbe en un seul point et suit sa direction tout autour de ce point";
      return {
        text: `À quoi reconnaît-on que la droite tracée est la TANGENTE à la courbe, et non une sécante ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "elle coupe la courbe en deux points rapprochés",
          "elle est horizontale",
          "elle passe par l'origine du repère",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente, ordonnee: ord, id: "tangente" },
          `Tangente au point d'abscisse ${x0}`,
          [{ x: x0 }]
        ),
        explanation: exp(
          "Une sécante joint DEUX points de la courbe. Une tangente est la position limite de ces sécantes quand les deux points se rejoignent : elle ne touche plus qu'en un point, et elle épouse la direction de la courbe autour de lui.",
          "On regarde le contact : deux points d'intersection nets, c'est une sécante ; un seul contact où la droite se confond avec la courbe, c'est la tangente.",
          `Ici la droite touche la courbe en $x = ${x0}$ et suit sa pente à cet endroit : son coefficient directeur vaut ` +
            `$f'(${x0}) = ${2 * a} \\times ${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(pente)}$. ` +
            `Une tangente peut très bien n'être ni horizontale ni passer par l'origine : ces deux traits ne la définissent pas.`,
          `On la reconnaît à son contact unique, où elle suit la direction de la courbe.`
        ),
        choiceDiagnostics: [
          {
            choice: "elle est horizontale",
            cause: "une tangente n'est horizontale qu'aux extremums : partout ailleurs elle penche",
          },
          {
            choice: "elle coupe la courbe en deux points rapprochés",
            cause: "c'est la description d'une SÉCANTE — la tangente est ce vers quoi elle tend quand les deux points se rejoignent",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_nd_definition ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_nd_definition_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre dérivé décrit une vitesse INSTANTANÉE ; le taux de variation, une vitesse MOYENNE.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const grandeur = pick([
        { nom: "la position d'un véhicule", instant: "sa vitesse instantanée", moyen: "sa vitesse moyenne" },
        { nom: "le coût de production", instant: "le coût marginal", moyen: "le coût moyen d'une tranche" },
        { nom: "le nombre d'abonnés", instant: "le rythme de croissance instantané", moyen: "la croissance moyenne" },
        { nom: "la température d'une chambre froide", instant: "la vitesse de refroidissement instantanée", moyen: "le refroidissement moyen" },
        { nom: "le stock d'un entrepôt", instant: "le rythme d'écoulement instantané", moyen: "l'écoulement moyen" },
      ] as const);
      const t = randomInt(2, 12);
      return {
        text:
          `On note $f(x)$ ${grandeur.nom} en fonction de $x$. Que représente $f'(${t})$ ?`,
        format: "qcm",
        choices: shuffle([
          `${grandeur.instant} à l'instant $${t}$`,
          `${grandeur.moyen} entre $0$ et $${t}$`,
          `la valeur ${deNomGrandeur(grandeur.nom)} à l'instant $${t}$`,
          `le nombre de fois où ${grandeur.nom} a changé`,
        ]),
        expected: [`${grandeur.instant} à l'instant $${t}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre dérivé $f'(a)$ est la limite du taux de variation lorsque le second point se rapproche de $a$ : il mesure une variation INSTANTANÉE, en un point.",
          "On distingue ce qui se mesure sur un intervalle (le taux de variation, une moyenne) de ce qui se mesure en un point (le nombre dérivé).",
          `$f(${t})$ donne la VALEUR de la grandeur ; $f'(${t})$ donne la VITESSE à laquelle elle change à cet instant précis.`,
          `$f'(${t})$ représente ${grandeur.instant} à l'instant $${t}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `la valeur ${deNomGrandeur(grandeur.nom)} à l'instant $${t}$`,
            cause: "a confondu f'(t) et f(t) : l'un mesure la vitesse, l'autre la valeur",
          },
          {
            choice: `${grandeur.moyen} entre $0$ et $${t}$`,
            cause: "a décrit le taux de variation sur un intervalle, pas le nombre dérivé en un point",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — CALCULER le taux moyen, pour sentir ce que l'instantané n'est
    // pas. Le premier item oppose les deux notions en mots ; celui-ci fait
    // faire le calcul du taux MOYEN sur un intervalle, et montre en conclusion
    // que le nombre dérivé en donne une autre valeur. C'est la marche que le BO
    // impose : « la notion de nombre dérivé est introduite à l'aide du taux de
    // variation » — d'abord la moyenne, ensuite seulement l'instantané.
    kind: "template",
    id: "stmg_der_nd_definition_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_definition",
    difficulty: 2,
    theme: "neutral",
    hint: "Taux moyen $= \\dfrac{f(b) - f(a)}{b - a}$ : c'est la pente de la sécante entre les deux points.",
    tags: ["stmg", "maths", "derivation", "canvas", "template", "short"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 2, 4, -2, 3] as const);
      const c = pick([0, 1, 2, -1] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const x1 = randomInt(-4, 1);
      const x2 = x1 + randomInt(2, 5);
      const taux = (f(x2) - f(x1)) / (x2 - x1);
      const ord = f(x1) - taux * x1;
      const ndDebut = 2 * a * x1 + b;
      return {
        text:
          `Sur cette courbe, quel est le TAUX DE VARIATION MOYEN de $f$ entre $${x1}$ et $${x2}$ ?`,
        format: "short",
        expected: [fr(taux)],
        comparator: "number_equal",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: taux, ordonnee: ord, id: "secante" },
          `Taux moyen entre ${x1} et ${x2}`,
          [{ x: x1 }, { x: x2 }]
        ),
        explanation: exp(
          "Le taux de variation moyen entre deux valeurs mesure la variation de $f$ rapportée à celle de $x$. Géométriquement, c'est le coefficient directeur de la SÉCANTE qui joint les deux points.",
          "On calcule $\\dfrac{f(x_2) - f(x_1)}{x_2 - x_1}$ : la différence des ordonnées divisée par celle des abscisses.",
          `$f(${x1}) = ${fr(f(x1))}$ et $f(${x2}) = ${fr(f(x2))}$, d'où ` +
            `$\\dfrac{${fr(f(x2))} - ${fr(f(x1))}}{${x2} - (${x1})} = ${fr(taux)}$. ` +
            `⚠️ Ce nombre est une MOYENNE sur tout l'intervalle. À l'instant $${x1}$ précisément, la variation vaut ` +
            `$f'(${x1}) = ${fr(ndDebut)}$ — un autre nombre, celui de la tangente et non de la sécante.`,
          `Le taux de variation moyen vaut $${fr(taux)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ der_nd_geometrique ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_nd_geometrique_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_geometrique",
    difficulty: 2,
    theme: "neutral",
    hint: "$f'(a)$ EST le coefficient directeur de la tangente au point d'abscisse $a$.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 2, 4, -2, -4] as const);
      const c = pick([0, 1, -1, 3] as const);
      const x0 = randomInt(-3, 3);
      const nd = 2 * a * x0 + b;
      const f = (x: number) => a * x * x + b * x + c;
      return {
        text: `La tangente à la courbe au point d'abscisse $${x0}$ est tracée. Que représente son coefficient directeur ?`,
        format: "qcm",
        choices: shuffle([
          `le nombre dérivé $f'(${x0})$`,
          `l'image $f(${x0})$`,
          `l'ordonnée à l'origine de la tangente`,
          `le taux de variation de $f$ entre $0$ et $${x0}$`,
        ]),
        expected: [`le nombre dérivé $f'(${x0})$`],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: nd, ordonnee: f(x0) - nd * x0, id: "tan" },
          "La courbe de f et sa tangente",
          [{ x: x0, label: `x = ${x0}` }]
        ),
        explanation: exp(
          "L'interprétation géométrique du nombre dérivé : $f'(a)$ est le coefficient directeur de la tangente à la courbe au point d'abscisse $a$.",
          "On lit la pente de la tangente, et l'on sait qu'elle vaut le nombre dérivé.",
          `Ici la tangente a pour coefficient directeur $${fr(nd)}$, donc $f'(${x0}) = ${fr(nd)}$.`,
          `Le coefficient directeur de la tangente est le nombre dérivé $f'(${x0})$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le SIGNE, lu sur la figure. Le premier item nomme ce que
    // représente le coefficient directeur de la tangente ; celui-ci fait
    // conclure de son allure. C'est la lecture la plus rentable du chapitre :
    // avant tout calcul, une tangente qui descend annonce une fonction qui
    // décroît, donc un bénéfice qui s'effrite.
    kind: "template",
    id: "stmg_der_nd_geometrique_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_geometrique",
    difficulty: 2,
    theme: "neutral",
    hint: "Une tangente qui MONTE a un coefficient directeur positif ; une tangente qui DESCEND, négatif.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 2, 4, -2, -4] as const);
      const c = pick([0, 1, -1, 3] as const);
      const f = (x: number) => a * x * x + b * x + c;
      // On écarte le sommet : sur une tangente horizontale, « monte » et
      // « descend » ne veulent plus rien dire et la question n'aurait pas de
      // réponse.
      let x0 = randomInt(-3, 3);
      for (let essai = 0; essai < 40 && 2 * a * x0 + b === 0; essai++) x0 = randomInt(-3, 3);
      const nd = 2 * a * x0 + b;
      const ord = f(x0) - nd * x0;
      const monte = nd > 0;
      const bonne = monte
        ? `$f'(${x0})$ est POSITIF : la courbe monte en ce point`
        : `$f'(${x0})$ est NÉGATIF : la courbe descend en ce point`;
      return {
        text:
          `La tangente à la courbe au point d'abscisse $${x0}$ est tracée. ` +
          `Que peut-on dire du nombre dérivé $f'(${x0})$, sans le calculer ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          monte
            ? `$f'(${x0})$ est négatif : la courbe descend en ce point`
            : `$f'(${x0})$ est positif : la courbe monte en ce point`,
          `$f'(${x0})$ est nul : la tangente est horizontale`,
          `$f'(${x0})$ a le même signe que $f(${x0})$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: nd, ordonnee: ord, id: "tangente" },
          `Tangente au point d'abscisse ${x0}`,
          [{ x: x0 }]
        ),
        explanation: exp(
          "Le nombre dérivé est le coefficient directeur de la tangente. Son SIGNE se lit donc directement sur l'inclinaison de la droite, sans aucun calcul.",
          "On regarde si la tangente monte ou descend en allant vers la droite : elle donne le signe du nombre dérivé, et donc le sens de variation de la fonction en ce point.",
          `La tangente ${monte ? "monte" : "descend"} : son coefficient directeur est ${monte ? "positif" : "négatif"}. ` +
            `Le calcul le confirme : $f'(${x0}) = ${2 * a} \\times ${x0} ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(nd)}$. ` +
            `⚠️ Ici $f(${x0}) = ${fr(f(x0))}$ : le signe de $f$ et celui de $f'$ n'ont aucune raison de coïncider.`,
          bonne.replace(/\$f'\(.*?\)\$ est/, `$f'(${x0})$ est donc`) + "."
        ),
        choiceDiagnostics: [
          {
            choice: `$f'(${x0})$ a le même signe que $f(${x0})$`,
            cause: "le signe de $f$ dit où est la courbe, celui de $f'$ dit dans quel sens elle va : deux lectures indépendantes",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_nd_lire_graphique ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_nd_lire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_lire_graphique",
    difficulty: 2,
    theme: "neutral",
    hint: "Sur la tangente : on avance de $1$, on lit la montée ou la descente.",
    tags: ["stmg", "maths", "derivation", "canvas", "template", "short"],
    generate: () => {
      const nd = pick([1, 2, 3, 4, 5, -1, -2, -3, -4, -5] as const);
      const x0 = randomInt(-3, 3);
      const a = pick([1, -1] as const);
      const b = nd - 2 * a * x0;
      const c = pick([0, 1, 2, -1, -2] as const);
      const f = (x: number) => a * x * x + b * x + c;
      return {
        text: `La tangente au point d'abscisse $${x0}$ est tracée. Lis graphiquement $f'(${x0})$.`,
        format: "short",
        expected: [fr(nd)],
        comparator: "number_equal",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: nd, ordonnee: f(x0) - nd * x0, id: "tan" },
          "Lire le nombre dérivé sur la tangente",
          [{ x: x0, label: `x = ${x0}` }]
        ),
        explanation: exp(
          "Le nombre dérivé se lit comme le coefficient directeur de la tangente : la variation verticale pour une avancée horizontale de $1$.",
          "On part du point de contact, on avance d'une unité vers la droite le long de la tangente, et on mesure la montée.",
          `En avançant de $1$, la tangente ${nd > 0 ? "monte" : "descend"} de $${Math.abs(nd)}$ : $f'(${x0}) = ${fr(nd)}$.`,
          `$f'(${x0}) = ${fr(nd)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — CALCULER la pente de la tangente à partir de deux de ses
    // points, au lieu de la lire d'un coup d'œil. Le premier item fait lire
    // $f'(x_0)$ sur la figure ; celui-ci donne deux points par lesquels la
    // tangente passe et fait poser le quotient. C'est ce qu'on fait vraiment
    // devant un graphique de bac, où la pente n'est jamais un entier évident.
    kind: "template",
    id: "stmg_der_nd_lire_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_lire_graphique",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux points de la TANGENTE suffisent : sa pente est le nombre dérivé.",
    tags: ["stmg", "maths", "derivation", "canvas", "template", "short"],
    generate: () => {
      const nd = pick([1, 2, 3, 4, 5, -1, -2, -3, -4, -5] as const);
      const x0 = randomInt(-3, 3);
      const a = pick([1, -1] as const);
      const b = nd - 2 * a * x0;
      const c = pick([0, 1, 2, -1, -2] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const ord = f(x0) - nd * x0;
      const pas = pick([2, 3] as const);
      const xB = x0 + pas;
      const yA = f(x0);
      const yB = nd * xB + ord;
      return {
        text:
          `La tangente à la courbe au point d'abscisse $${x0}$ est tracée. ` +
          `Elle passe par $(${x0}\\,;\\,${fr(yA)})$ et par $(${xB}\\,;\\,${fr(yB)})$. ` +
          `Que vaut $f'(${x0})$ ?`,
        format: "short",
        expected: [fr(nd)],
        comparator: "number_equal",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente: nd, ordonnee: ord, id: "tangente" },
          `Tangente au point d'abscisse ${x0}`,
          [{ x: x0 }, { x: xB }]
        ),
        explanation: exp(
          "Le nombre dérivé $f'(x_0)$ est le coefficient directeur de la tangente en $x_0$. Deux points de cette tangente suffisent donc à le calculer.",
          "On prend les deux points DE LA TANGENTE — pas de la courbe — et l'on divise la différence des ordonnées par celle des abscisses.",
          `$\\dfrac{${fr(yB)} - ${fr(yA)}}{${xB} - (${x0})} = \\dfrac{${fr(yB - yA)}}{${pas}} = ${fr(nd)}$. ` +
            `⚠️ Le second point est sur la TANGENTE : la courbe, elle, passe par $(${xB}\\,;\\,${fr(f(xB))})$ — ` +
            `un autre point, qui donnerait le taux moyen et non le nombre dérivé.`,
          `$f'(${x0}) = ${fr(nd)}$.`
        ),
      };
    },
  },

  /* ═══════════════════ der_nd_cout_marginal ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_nd_marginal_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_cout_marginal",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coût marginal, c'est ce que coûte À PEU PRÈS l'unité suivante.",
    tags: ["stmg", "maths", "derivation", "gestion", "open", "template"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const q = pick([20, 40, 50, 80, 100, 120, 150, 200] as const);
      const marginal = pick([3, 5, 8, 12, 15, 18, 24, 30] as const);
      return {
        text:
          `Une entreprise produit ${prod.objet}. Son coût total de production, en euros, est $C(x)$ pour $x$ ${prod.unite}. ` +
          `On a calculé $C'(${q}) = ${marginal}$. Explique ce que ce nombre signifie pour l'entreprise.`,
        format: "open",
        // ⛔ Pas de nombre nu en mot-clé : `contains_keyword` valide sur la
        // SOUS-CHAÎNE, donc « 8 » accepterait « 18 », « 80 » et « je sais pas 8 ».
        // Les trois mots de gestion suffisent à reconnaître une explication juste.
        expected: ["marginal", "unite suivante", "unité suivante", "supplementaire", "supplémentaire"],
        comparator: "contains_keyword",
        explanation: exp(
          "Dans un cadre économique, le nombre dérivé du coût total est le COÛT MARGINAL : le coût approximatif de l'unité supplémentaire.",
          "On traduit la vitesse instantanée de variation du coût en langage de gestion.",
          `$C'(${q}) = ${marginal}$ signifie qu'au niveau de production de $${q}$ ${prod.unite}, ` +
            `le coût augmente d'environ $${marginal}$ € par unité supplémentaire produite.`,
          `Par exemple : « Produire la ${q + 1}ᵉ unité coûterait environ ${marginal} € de plus. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DÉCIDER avec le coût marginal, au lieu de l'expliquer. Le
    // premier item est une ouverte, jugée par mots-clés ; celui-ci pose la
    // question que se pose vraiment l'entreprise : au prix de vente actuel,
    // a-t-on intérêt à produire une unité de plus ? La réponse tient à une
    // comparaison — marginal contre prix — et c'est là que le nombre dérivé
    // devient un outil de gestion et non un exercice.
    kind: "template",
    id: "stmg_der_nd_marginal_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_nombre_derive",
    microId: "der_nd_cout_marginal",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare ce que l'unité suivante COÛTE à ce qu'elle RAPPORTE.",
    tags: ["stmg", "maths", "derivation", "gestion", "canvas", "template"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const q = pick([20, 40, 50, 80, 100, 120] as const);
      const marginal = pick([12, 15, 18, 24, 30] as const);
      // Le prix de vente tombe soit au-dessus, soit en dessous du coût marginal :
      // les deux cas se produisent, et la décision s'inverse.
      const rentable = Math.random() < 0.5;
      const prix = rentable ? marginal + pick([4, 6, 10] as const) : marginal - pick([3, 5, 8] as const);
      const bonne = rentable
        ? `oui : ${prod.un} de plus rapporte $${prix}$ € et n'en coûte que $${marginal}$ €`
        : `non : ${prod.un} de plus coûte $${marginal}$ € et n'en rapporte que $${prix}$ €`;
      // ⚠️ LE DISTRACTEUR INVERSE L'ATTRIBUTION, PAS LA CONCLUSION. Écrit
      // « non : … coûte 12 € et n'en rapporte que 16 € », il se contredisait
      // tout seul — $16$ est plus grand que $12$ — et se laissait écarter sans
      // rien comprendre. En échangeant les deux nombres, il devient la vraie
      // erreur : confondre ce qui coûte et ce qui rapporte.
      const contraire = rentable
        ? `non : ${prod.un} de plus coûte $${prix}$ € et n'en rapporte que $${marginal}$ €`
        : `oui : ${prod.un} de plus rapporte $${marginal}$ € et n'en coûte que $${prix}$ €`;
      // Un coût dont la dérivée en q vaut « marginal » : C(x) = m/(2q) x² + m/2 x.
      const coef = marginal / (2 * q);
      const C = (x: number) => coef * x * x + (marginal / 2) * x;
      return {
        text:
          `Une entreprise produit ${prod.objet}. On a calculé $C'(${q}) = ${marginal}$, ` +
          `où $C$ est le coût total en euros. Chaque ${prod.un.slice(3)} se vend $${prix}$ €. ` +
          `L'entreprise a-t-elle intérêt à produire ${prod.un} de plus ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          contraire,
          `on ne peut pas savoir sans connaître le coût TOTAL $C(${q})$`,
          `oui dans tous les cas : produire plus fait toujours baisser le coût unitaire`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(C, 0, q * 2, `Coût total en fonction du nombre de ${prod.unite}`, {
          marques: [q],
        }),
        explanation: exp(
          "Le coût marginal $C'(q)$ est ce que coûte la production d'une unité supplémentaire à partir du niveau $q$. La décision de produire cette unité se prend en le comparant au PRIX auquel elle sera vendue.",
          "On compare deux nombres et deux seulement : le coût marginal et le prix de vente unitaire. Le coût total, lui, ne dit rien sur l'unité suivante.",
          `La ${prod.un.slice(3)} suivante coûte $${marginal}$ € et se vend $${prix}$ €. ` +
            (rentable
              ? `Elle laisse donc $${prix - marginal}$ € de marge : la produire augmente le bénéfice.`
              : `Elle fait donc perdre $${marginal - prix}$ € : la produire diminue le bénéfice.`) +
            ` ⚠️ Le coût TOTAL déjà engagé n'entre pas dans cette décision — il est le même quoi qu'on décide.`,
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + "."
        ),
        choiceDiagnostics: [
          {
            choice: contraire,
            cause: `a échangé les deux nombres : $${marginal}$ € est ce que la production COÛTE, $${prix}$ € ce que la vente RAPPORTE`,
          },
          {
            choice: `on ne peut pas savoir sans connaître le coût TOTAL $C(${q})$`,
            cause: "le coût total est déjà engagé : seule compte la comparaison entre le coût MARGINAL et le prix",
          },
          {
            choice: `oui dans tous les cas : produire plus fait toujours baisser le coût unitaire`,
            cause: "faux dès que le coût marginal dépasse le prix — c'est même ce qui fixe la quantité optimale",
          },
        ],
      };
    },
  },

  /* ═══════════════ der_tg_equation_reduite ═══════════════ */

  {
    kind: "template",
    id: "stmg_der_tg_equation_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_tangente_equation",
    microId: "der_tg_equation_reduite",
    difficulty: 3,
    theme: "neutral",
    hint: "La tangente a pour pente $f'(a)$ et passe par le point $(a\\,;\\,f(a))$.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 2, 3, -2, -4] as const);
      const c = pick([0, 1, 2, -1, -3] as const);
      const x0 = randomInt(-3, 3);
      const f = (x: number) => a * x * x + b * x + c;
      const pente = 2 * a * x0 + b;
      const ord = f(x0) - pente * x0;
      const ecrire = (p: number, o: number) =>
        `$y = ${p === 1 ? "" : p === -1 ? "-" : p}x ${o >= 0 ? "+" : "-"} ${Math.abs(o)}$`;
      return {
        text:
          `Soit $f(x) = ${polynome(0, a, b, c)}$. ` +
          `Quelle est l'équation réduite de la tangente à la courbe au point d'abscisse $${x0}$ ?`,
        format: "qcm",
        choices: makeChoices(ecrire(pente, ord), [
          ecrire(f(x0), ord),
          ecrire(pente, f(x0)),
          ecrire(-pente, ord),
          ecrire(pente, ord + 1),
          ecrire(pente + 1, ord),
          ecrire(pente, ord - 2),
          ecrire(pente + 2, ord),
          ecrire(pente, x0),
        ]),
        expected: [ecrire(pente, ord)],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente, ordonnee: ord, id: "tan" },
          "La tangente au point d'abscisse " + x0,
          [{ x: x0, label: `x = ${x0}` }]
        ),
        explanation: exp(
          "La tangente au point d'abscisse $a$ a pour coefficient directeur $f'(a)$ et passe par le point de coordonnées $(a\\,;\\,f(a))$.",
          "On calcule d'abord la pente avec la dérivée, puis l'ordonnée à l'origine en utilisant le point de contact.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$, donc $f'(${x0}) = ${fr(pente)}$. ` +
            `Le point de contact est $(${x0}\\,;\\,${fr(f(x0))})$, d'où $${fr(f(x0))} = ${fr(pente)} \\times ${x0} + p$ et $p = ${fr(ord)}$.`,
          `L'équation réduite est ${ecrire(pente, ord)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(f(x0), ord),
            cause: "a pris f(x₀) comme pente au lieu de f'(x₀)",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_tg_construire ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_tg_construire_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_tangente_equation",
    microId: "der_tg_construire",
    difficulty: 2,
    theme: "neutral",
    hint: "Pour tracer la tangente : on part du point de contact et on avance de $1$ en montant de $f'(a)$.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const b = pick([0, 2, 4, -2, -4, 6] as const);
      const c = pick([0, 1, -1, 2, -2] as const);
      const x0 = randomInt(-3, 3);
      const f = (x: number) => a * x * x + b * x + c;
      const pente = 2 * a * x0 + b;
      const y1 = f(x0) + pente;
      return {
        text:
          `On veut tracer la tangente à la courbe au point d'abscisse $${x0}$, où $f'(${x0}) = ${fr(pente)}$. ` +
          `Après le point de contact $(${x0}\\,;\\,${fr(f(x0))})$, quel second point permet de la tracer ?`,
        format: "qcm",
        choices: makeChoices(`$(${x0 + 1}\\,;\\,${fr(y1)})$`, [
          `$(${x0 + 1}\\,;\\,${fr(f(x0 + 1))})$`,
          `$(${x0 + 1}\\,;\\,${fr(f(x0))})$`,
          `$(${x0}\\,;\\,${fr(y1)})$`,
          `$(${x0 + 1}\\,;\\,${fr(f(x0) - pente)})$`,
          `$(${fr(pente)}\\,;\\,${x0 + 1})$`,
          `$(${x0 + 2}\\,;\\,${fr(y1)})$`,
          `$(${x0 + 1}\\,;\\,${fr(y1 + 1)})$`,
          `$(${x0 + 1}\\,;\\,${fr(pente)})$`,
        ]),
        expected: [`$(${x0 + 1}\\,;\\,${fr(y1)})$`],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(
          a,
          b,
          c,
          { pente, ordonnee: f(x0) - pente * x0, id: "tan" },
          "Construire la tangente au point marqué",
          [{ x: x0, label: `contact` }]
        ),
        explanation: exp(
          "Une droite se trace avec deux points. Depuis le point de contact, le coefficient directeur donne le déplacement : $+1$ horizontalement, $f'(a)$ verticalement.",
          "On part du point de contact et on applique ce déplacement.",
          `Depuis $(${x0}\\,;\\,${fr(f(x0))})$, on avance de $1$ et l'on ${pente >= 0 ? "monte" : "descend"} de $${fr(Math.abs(pente))}$ : ` +
            `on arrive en $(${x0 + 1}\\,;\\,${fr(y1)})$.`,
          `Le second point est $(${x0 + 1}\\,;\\,${fr(y1)})$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$(${x0 + 1}\\,;\\,${fr(f(x0 + 1))})$`,
            cause: "a pris un second point SUR LA COURBE : on obtiendrait une sécante, pas la tangente",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_tg_verifier_point ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_tg_verifier_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_tangente_equation",
    microId: "der_tg_verifier_point",
    difficulty: 2,
    theme: "neutral",
    hint: "Un point est sur la tangente si ses coordonnées vérifient son équation.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const pente = pick([1, 2, 3, -1, -2, -3, 4, -4] as const);
      const ord = pick([1, 2, 3, -1, -2, -3, 0, 5] as const);
      const x = randomInt(-4, 5);
      const surLaDroite = Math.random() < 0.5;
      const y = pente * x + ord + (surLaDroite ? 0 : pick([1, -1, 2, -2] as const));
      const a = pick([1, -1] as const);
      const c = pick([0, 1, -1] as const);
      return {
        text:
          `La tangente tracée a pour équation $y = ${pente === 1 ? "" : pente === -1 ? "-" : pente}x ${ord >= 0 ? "+" : "-"} ${Math.abs(ord)}$. ` +
          `Le point $M(${x}\\,;\\,${y})$ appartient-il à cette tangente ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [surLaDroite ? "oui" : "non"],
        comparator: "mcq_exact",
        canvas: canvasParaboleDroite(a, 0, c, { pente, ordonnee: ord, id: "tan" }, "La tangente d'équation donnée"),
        explanation: exp(
          "Un point appartient à une droite si, et seulement si, ses coordonnées vérifient l'équation de cette droite.",
          "On remplace $x$ par l'abscisse du point et l'on compare le résultat à son ordonnée.",
          `Pour $x = ${x}$ : $${pente} \\times ${x} ${ord >= 0 ? "+" : "-"} ${Math.abs(ord)} = ${pente * x + ord}$, ` +
            `alors que l'ordonnée de $M$ vaut $${y}$.`,
          surLaDroite
            ? `Les deux coïncident : $M$ appartient à la tangente.`
            : `Les deux diffèrent : $M$ n'appartient pas à la tangente.`
        ),
      };
    },
  },

  /* ═══════════════════ der_f_carre ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_f_carre_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_carre",
    difficulty: 1,
    theme: "neutral",
    hint: "L'exposant descend en facteur, puis diminue de $1$.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const k = pick([1, 2, 3, 4, 5, 6, 7, 8, 10, 12, -1, -2, -3, -4, -5] as const);
      return {
        text: `Soit $f(x) = ${k === 1 ? "" : k === -1 ? "-" : k}x^2$. Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$${2 * k}x$`, [
          `$${k}x$`,
          `$${2 * k}x^2$`,
          `$${k}x^3$`,
          `$${2 * k}$`,
          `$${k * k}x$`,
        ]),
        expected: [`$${2 * k}x$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $x^2$ est $2x$ ; multiplier la fonction par un réel multiplie sa dérivée par ce même réel.",
          "On dérive $x^2$, puis on multiplie par le coefficient.",
          `$f(x) = ${k}x^2$, donc $f'(x) = ${k} \\times 2x = ${2 * k}x$.`,
          `$f'(x) = ${2 * k}x$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — REMONTER de la dérivée à la fonction. Le premier item descend
    // $kx^2 \to 2kx$ ; celui-ci fait le chemin inverse. C'est le geste qu'on
    // n'entraîne jamais, et pourtant le seul qui prouve que la règle est
    // comprise et pas récitée : il faut savoir que le $2$ vient de l'exposant,
    // et diviser par lui.
    kind: "template",
    id: "stmg_der_f_carre_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_carre",
    difficulty: 2,
    theme: "neutral",
    hint: "Dériver $kx^2$ donne $2kx$ : le coefficient est DOUBLÉ au passage.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const k = pick([1, 2, 3, 4, 5, 6, 7, 8, 10, 12, -1, -2, -3, -4, -5] as const);
      const ecrire = (n: number) => `$f(x) = ${n === 1 ? "" : n === -1 ? "-" : n}x^2$`;
      return {
        text:
          `Une fonction $f$ a pour dérivée $f'(x) = ${2 * k}x$. ` +
          `Parmi ces quatre expressions, laquelle peut être celle de $f$ ?`,
        format: "qcm",
        choices: makeChoices(ecrire(k), [
          ecrire(2 * k),
          ecrire(4 * k),
          `$f(x) = ${2 * k === 1 ? "" : 2 * k === -1 ? "-" : 2 * k}x^3$`,
        ]),
        expected: [ecrire(k)],
        comparator: "mcq_exact",
        explanation: exp(
          "Dériver $x^2$ fait descendre l'exposant devant : $kx^2$ a pour dérivée $2kx$. Le coefficient est donc multiplié par $2$, et l'exposant baisse d'un rang.",
          "Pour remonter, on fait l'inverse : on divise le coefficient de la dérivée par $2$, et l'on remet l'exposant $2$.",
          `$f'(x) = ${2 * k}x$, donc le coefficient de $f$ vaut $\\dfrac{${2 * k}}{2} = ${k}$ : ` +
            `$f(x) = ${k === 1 ? "" : k === -1 ? "-" : k}x^2$. ` +
            `Vérification : la dérivée de $${k === 1 ? "" : k === -1 ? "-" : k}x^2$ vaut bien $${2 * k}x$.`,
          `$f(x) = ${k === 1 ? "" : k === -1 ? "-" : k}x^2$ convient.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(2 * k),
            cause: "a recopié le coefficient de la dérivée : il faut le DIVISER par 2, pas le garder",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_f_cube ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_f_cube_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_cube",
    difficulty: 2,
    theme: "neutral",
    hint: "La dérivée de $x^3$ est $3x^2$ — l'exposant descend, puis baisse d'un cran.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const k = pick([1, 2, 3, 4, 5, 6, 8, 10, -1, -2, -3, -4, -6] as const);
      return {
        text: `Soit $f(x) = ${k === 1 ? "" : k === -1 ? "-" : k}x^3$. Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$${3 * k}x^2$`, [
          `$${3 * k}x$`,
          `$${k}x^2$`,
          `$${2 * k}x^2$`,
          `$${3 * k}x^3$`,
          `$${k * 3}$`,
        ]),
        expected: [`$${3 * k}x^2$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $x^3$ est $3x^2$.",
          "L'exposant passe devant en facteur, puis diminue de $1$ ; on multiplie ensuite par le coefficient.",
          `$f(x) = ${k}x^3$, donc $f'(x) = ${k} \\times 3x^2 = ${3 * k}x^2$.`,
          `$f'(x) = ${3 * k}x^2$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${3 * k}x$`,
            cause: "a fait descendre l'exposant mais l'a ramené à 1 au lieu de 2",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — un NOMBRE, pas une expression. Le premier item rend $3kx^2$ en
    // QCM ; celui-ci demande la valeur en un point, en saisie libre. Deux
    // pièges s'y logent que le QCM masquait : oublier le carré, et oublier que
    // $(-x)^2$ est positif. Aucune proposition où se rattraper.
    kind: "template",
    id: "stmg_der_f_cube_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_cube",
    difficulty: 2,
    theme: "neutral",
    hint: "Dérive d'abord — l'exposant descend et baisse d'un rang —, remplace ensuite.",
    tags: ["stmg", "maths", "derivation", "template", "short"],
    generate: () => {
      const k = pick([1, 2, 3, 4, 5, 6, 8, 10, -1, -2, -3, -4, -6] as const);
      const x0 = pick([-3, -2, -1, 1, 2, 3, 4] as const);
      const valeur = 3 * k * x0 * x0;
      return {
        text: `Soit $f(x) = ${k === 1 ? "" : k === -1 ? "-" : k}x^3$. Que vaut $f'(${x0})$ ?`,
        format: "short",
        expected: [String(valeur)],
        comparator: "number_equal",
        explanation: exp(
          "La dérivée de $kx^3$ est $3kx^2$ : l'exposant $3$ descend en facteur, et il ne reste qu'un carré.",
          "On écrit d'abord la dérivée sous forme d'expression, PUIS on y remplace $x$ par la valeur demandée — jamais l'inverse.",
          `$f'(x) = ${3 * k}x^2$, donc $f'(${x0}) = ${3 * k} \\times (${x0})^2 = ${3 * k} \\times ${x0 * x0} = ${valeur}$. ` +
            (x0 < 0
              ? `⚠️ $(${x0})^2 = ${x0 * x0}$, positif : le carré efface le signe de $x$, seul celui de $${3 * k}$ compte.`
              : `Le carré reste, il ne disparaît pas : $f'$ n'est pas une constante.`),
          `$f'(${x0}) = ${valeur}$.`
        ),
      };
    },
  },

  /* ═══════════════════ der_f_kf ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_f_kf_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_kf",
    difficulty: 1,
    theme: "neutral",
    hint: "Un facteur constant se garde tel quel dans la dérivée.",
    tags: ["stmg", "maths", "derivation", "template", "short"],
    generate: () => {
      const k = pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20] as const);
      const x = randomInt(1, 8);
      return {
        text: `Soit $f(x) = ${k}x$. Que vaut $f'(${x})$ ?`,
        format: "short",
        expected: [String(k)],
        comparator: "number_equal",
        explanation: exp(
          "La dérivée de $kx$ est la constante $k$ : la fonction est affine, sa pente ne dépend pas du point.",
          "On dérive $x$, dont la dérivée vaut $1$, puis on multiplie par le coefficient.",
          `$f'(x) = ${k} \\times 1 = ${k}$ pour tout $x$, donc $f'(${x}) = ${k}$.`,
          `$f'(${x}) = ${k}$ — et ce serait la même valeur en tout autre point.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — POURQUOI la dérivée d'une fonction affine ne bouge pas. Le
    // premier item fait calculer $f'(x)$ pour $kx$ et attend le nombre $k$ ;
    // celui-ci demande la raison. Elle tient en une image, et c'est l'image qui
    // fonde tout le chapitre : le nombre dérivé est une PENTE, et la pente
    // d'une droite est la même partout.
    kind: "template",
    id: "stmg_der_f_kf_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_kf",
    difficulty: 2,
    theme: "neutral",
    hint: "Le nombre dérivé est le coefficient directeur de la tangente. Quelle est la tangente à une droite ?",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const k = pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20] as const);
      const x1 = randomInt(1, 4);
      const x2 = randomInt(20, 90);
      const bonne =
        "la courbe de $f$ est une DROITE : sa pente est la même en tout point, et le nombre dérivé est cette pente";
      return {
        text:
          `Soit $f(x) = ${k}x$. On trouve $f'(${x1}) = ${k}$, et aussi $f'(${x2}) = ${k}$. ` +
          `Pourquoi le nombre dérivé ne dépend-il pas du point choisi ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "parce que $f$ ne s'annule jamais",
          `parce que $${x1}$ et $${x2}$ sont tous les deux positifs`,
          "c'est une coïncidence : pour d'autres valeurs, on trouverait autre chose",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre dérivé en un point est le coefficient directeur de la TANGENTE en ce point. Pour une fonction affine, la courbe est une droite : elle est sa propre tangente partout.",
          "On regarde l'allure de la courbe : si elle est droite, sa pente ne change pas, donc le nombre dérivé non plus.",
          `Entre deux points d'abscisses $${x1}$ et $${x2}$, le taux de variation vaut ` +
            `$\\dfrac{${k} \\times ${x2} - ${k} \\times ${x1}}{${x2} - ${x1}} = ${k}$ — ` +
            `et ce serait encore $${k}$ pour n'importe quel autre couple de points. ` +
            `C'est ce qui distingue une droite d'une parabole, dont la pente change à chaque point.`,
          `Parce que la courbe de $f$ est une droite : sa pente vaut $${k}$ partout.`
        ),
        choiceDiagnostics: [
          {
            choice: "c'est une coïncidence : pour d'autres valeurs, on trouverait autre chose",
            cause: "non : pour une fonction affine, le nombre dérivé est constant, quel que soit le point",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_f_somme ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_f_somme_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_somme",
    difficulty: 2,
    theme: "neutral",
    hint: "On dérive chaque terme séparément ; la constante disparaît.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, 5, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 5, 6, 8, -1, -2, -4, -7] as const);
      const c = pick([1, 2, 4, 5, 9, -3, -6, -8] as const);
      return {
        text: `Soit $f(x) = ${polynome(0, a, b, c)}$. Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$${polynome(0, 0, 2 * a, b)}$`, [
          `$${polynome(0, 0, 2 * a, c)}$`,
          `$${polynome(0, 0, a, b)}$`,
          `$${polynome(0, 0, 2 * a, b + c)}$`,
          `$${polynome(0, 0, 2 * a, 0)}$`,
          `$${polynome(0, a, b, 0)}$`,
        ]),
        expected: [`$${polynome(0, 0, 2 * a, b)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée d'une somme est la somme des dérivées ; la dérivée d'une constante est nulle.",
          "On dérive terme à terme, sans oublier de faire disparaître le terme constant.",
          `$(${a}x^2)' = ${2 * a}x$ ; $(${b}x)' = ${b}$ ; $(${c})' = 0$.`,
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `$${polynome(0, 0, 2 * a, c)}$`,
            cause: "a gardé le terme constant au lieu de dériver le terme en x",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le TERME CONSTANT, qui disparaît. Le premier item fait dériver
    // la somme entière ; celui-ci isole le seul morceau qui se traîne d'un
    // bout à l'autre du chapitre. Un « $- 7$ » recopié dans la dérivée fausse
    // ensuite le signe de $f'$, donc les variations, donc l'optimisation : une
    // étourderie d'un caractère qui se paie trois notions plus loin.
    kind: "template",
    id: "stmg_der_f_somme_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_formules",
    microId: "der_f_somme",
    difficulty: 2,
    theme: "neutral",
    hint: "Une constante ne varie pas : sa courbe est une droite horizontale, de pente nulle.",
    tags: ["stmg", "maths", "derivation", "piege", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, 5, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 5, 6, 8, -1, -2, -4, -7] as const);
      const c = pick([2, 4, 5, 9, 11, -3, -6, -8] as const);
      const juste = polynome(0, 0, 2 * a, b);
      const faux = polynome(0, 0, 2 * a, b) + (c >= 0 ? ` + ${c}` : ` - ${-c}`);
      const bonne = `le terme constant $${c >= 0 ? c : `(${c})`}$ DISPARAÎT : sa dérivée est nulle`;
      return {
        text:
          `Un élève dérive $f(x) = ${polynome(0, a, b, c)}$ et écrit « $f'(x) = ${faux}$ ». ` +
          `Où est l'erreur ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `le terme en $x$ devait disparaître, pas la constante`,
          `il fallait écrire $${2 * a}x^2$ au lieu de $${2 * a}x$`,
          "il n'y a pas d'erreur : chaque terme a bien été dérivé",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive une somme terme à terme. Un terme CONSTANT ne varie pas : sa courbe est une droite horizontale, sa pente vaut $0$, et il disparaît de la dérivée.",
          "On dérive chaque morceau séparément, et l'on vérifie qu'aucune constante n'a survécu au passage.",
          `$${a === 1 ? "" : a === -1 ? "-" : a}x^2 \\to ${2 * a}x$ ; ` +
            `$${b >= 0 ? "+" : "-"} ${Math.abs(b)}x \\to ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$ ; ` +
            `$${c >= 0 ? "+" : "-"} ${Math.abs(c)} \\to 0$. ` +
            `Donc $f'(x) = ${juste}$, sans le $${c >= 0 ? c : `(${c})`}$.`,
          `L'erreur est d'avoir gardé la constante : $f'(x) = ${juste}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `le terme en $x$ devait disparaître, pas la constante`,
            cause: `$${b >= 0 ? "+" : "-"} ${Math.abs(b)}x$ a bien une pente, égale à $${b}$ : c'est la constante qui n'en a pas`,
          },
          {
            choice: "il n'y a pas d'erreur : chaque terme a bien été dérivé",
            cause: "la constante a été recopiée telle quelle, pas dérivée — sa dérivée vaut zéro",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_p_degre2 ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_p_degre2_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_degre2",
    difficulty: 2,
    theme: "neutral",
    hint: "Un coût total du second degré : sa dérivée est le coût marginal.",
    tags: ["stmg", "maths", "derivation", "gestion", "template"],
    generate: () => {
      const a = pick([0.5, 1, 2, 3, 4, 5] as const);
      const b = pick([2, 4, 6, 8, 10, 12, 15, -3, -5, -8] as const);
      const c = pick([50, 80, 100, 120, 150, 200, 250] as const);
      const prod = pick(PRODUCTIONS);
      const derA = 2 * a;
      const ecrire = (p: number, q: number) =>
        `$C'(x) = ${p === 1 ? "" : p}x ${q >= 0 ? "+" : "-"} ${Math.abs(q)}$`;
      return {
        text:
          `Le coût total de production de $x$ ${prod.unite} est $C(x) = ${fr(a)}x^2 ${b >= 0 ? "+" : "-"} ${Math.abs(b)}x + ${c}$. ` +
          `Quelle est l'expression du coût marginal $C'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(ecrire(derA, b), [
          ecrire(derA, c),
          ecrire(a, b),
          `$C'(x) = ${fr(derA)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} + ${c}$`,
          ecrire(derA, b + 1),
          ecrire(derA * 2, b),
        ]),
        expected: [ecrire(derA, b)],
        comparator: "mcq_exact",
        explanation: exp(
          "On dérive terme à terme : $(ax^2)' = 2ax$, $(bx)' = b$, et la dérivée de la constante est nulle.",
          "Les charges fixes disparaissent à la dérivation — c'est cohérent : elles ne changent pas quand on produit une unité de plus.",
          `$C'(x) = ${fr(derA)}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)}$.`,
          `Le coût marginal est ${ecrire(derA, b)}.`
        ),
        choiceDiagnostics: [
          {
            choice: ecrire(derA, c),
            cause: "a gardé les charges fixes : or elles ne dépendent pas de la quantité produite",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — LIRE le coût marginal, au lieu de l'écrire. Le premier item
    // rend l'expression $C'(x)$ ; celui-ci en donne une valeur et demande ce
    // qu'elle veut dire dans l'atelier. Le BO le pose noir sur blanc : « dans
    // un cadre économique, le nombre dérivé est relié au coût marginal ».
    // Une expression juste dont on ne sait rien dire ne sert à rien.
    kind: "template",
    id: "stmg_der_p_degre2_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_degre2",
    difficulty: 3,
    theme: "neutral",
    hint: "Le coût marginal est le coût de l'unité SUIVANTE : c'est une variation, pas un total.",
    tags: ["stmg", "maths", "derivation", "gestion", "template"],
    generate: () => {
      const a = pick([0.5, 1, 2] as const);
      const b = pick([4, 6, 8, 10, 12, 15] as const);
      const c = pick([80, 100, 120, 150, 200] as const);
      const prod = pick(PRODUCTIONS);
      const x0 = pick([10, 20, 25, 30, 40, 50] as const);
      const marginal = Math.round((2 * a * x0 + b) * 100) / 100;
      const total = Math.round((a * x0 * x0 + b * x0 + c) * 100) / 100;
      const bonne = `produire ${prod.un} de plus coûterait environ $${fr(marginal)}$ €`;
      return {
        text:
          `Le coût total de production de $x$ ${prod.unite} est $C(x) = ${fr(a)}x^2 + ${b}x + ${c}$, en euros. ` +
          `On calcule $C'(${x0}) = ${fr(marginal)}$. Que signifie ce nombre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `produire $${x0}$ ${prod.unite} coûte $${fr(marginal)}$ €`,
          `${prod.chacun} des $${x0}$ ${prod.unite} a coûté $${fr(marginal)}$ € en moyenne`,
          `le coût total diminue de $${fr(marginal)}$ € à partir de $${x0}$ ${prod.unite}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        // ⭐ LA COURBE DE COÛT, avec le point de production marqué. La question
        // porte sur l'INTERPRÉTATION, pas sur une lecture : la figure ne donne
        // donc aucune réponse, elle montre seulement ce dont on parle — une
        // courbe qui monte de plus en plus vite, et un point où l'on mesure sa
        // pente.
        canvas: canvasCourbePoints(
          (x) => a * x * x + b * x + c,
          0,
          x0 * 2,
          `Coût total en fonction du nombre de ${prod.unite}`,
          { marques: [x0] }
        ),
        explanation: exp(
          "Le nombre dérivé mesure une variation instantanée. En gestion, $C'(x)$ est le COÛT MARGINAL : ce que coûte, approximativement, la production d'une unité supplémentaire à partir du niveau $x$.",
          "On distingue trois nombres qui se ressemblent : le coût TOTAL $C(x)$, le coût MOYEN $\\dfrac{C(x)}{x}$, et le coût MARGINAL $C'(x)$.",
          `Ici $C(${x0}) = ${fr(total)}$ € au total, soit $${fr(Math.round((total / x0) * 100) / 100)}$ € en moyenne par ${prod.un.slice(3)}. ` +
            `Mais $C'(${x0}) = ${fr(marginal)}$ € : c'est le coût ${prod.genre === 'f' ? 'de la' : 'du'} ${prod.un.slice(3)} SUIVANT${prod.genre === 'f' ? 'E' : ''}. ` +
            `Vérification : $C(${x0 + 1}) - C(${x0}) = ${fr(Math.round((a * (x0 + 1) * (x0 + 1) + b * (x0 + 1) + c - total) * 100) / 100)}$ €, ` +
            `tout proche de $${fr(marginal)}$.`,
          `$C'(${x0})$ est le coût de l'unité suivante, environ $${fr(marginal)}$ €.`
        ),
        choiceDiagnostics: [
          {
            choice: `${prod.chacun} des $${x0}$ ${prod.unite} a coûté $${fr(marginal)}$ € en moyenne`,
            cause: `c'est le coût MOYEN, qui vaut ici $${fr(Math.round((total / x0) * 100) / 100)}$ € — un autre nombre`,
          },
          {
            choice: `le coût total diminue de $${fr(marginal)}$ € à partir de $${x0}$ ${prod.unite}`,
            cause: "un coût marginal positif signale que le coût total AUGMENTE, pas qu'il baisse",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_p_degre3 ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_p_degre3_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_degre3",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque exposant descend en facteur et perd un cran.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 5, 6, -1, -2, -4, -6] as const);
      const c = pick([1, 2, 4, 5, 7, -3, -5, -9] as const);
      const d = pick([1, 3, 6, 8, 12, -2, -4, -10] as const);
      return {
        text: `Soit $f(x) = ${polynome(a, b, c, d)}$. Quelle est l'expression de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(`$${polynome(0, 3 * a, 2 * b, c)}$`, [
          `$${polynome(0, 3 * a, 2 * b, d)}$`,
          `$${polynome(0, 3 * a, b, c)}$`,
          `$${polynome(0, 2 * a, 3 * b, c)}$`,
          `$${polynome(0, 3 * a, 2 * b, 0)}$`,
          `$${polynome(0, a, b, c)}$`,
        ]),
        expected: [`$${polynome(0, 3 * a, 2 * b, c)}$`],
        comparator: "mcq_exact",
        explanation: exp(
          "La dérivée de $x^n$ est $nx^{n-1}$, appliquée terme à terme.",
          "On traite chaque terme séparément, en n'oubliant pas que la constante disparaît.",
          `$(${a}x^3)' = ${3 * a}x^2$ ; $(${b}x^2)' = ${2 * b}x$ ; $(${c}x)' = ${c}$ ; $(${d})' = 0$.`,
          `$f'(x) = ${polynome(0, 3 * a, 2 * b, c)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — l'exposant qui NE DESCEND PAS. Le premier item fait dériver un
    // degré 3 en QCM ; celui-ci montre la dérivation faite à moitié — les
    // coefficients multipliés, les exposants laissés en place. C'est l'erreur
    // qui se voit le moins à la relecture, parce que le résultat « ressemble »
    // à une dérivée.
    kind: "template",
    id: "stmg_der_p_degre3_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_degre3",
    difficulty: 3,
    theme: "neutral",
    hint: "Dériver fait DEUX choses à chaque terme : l'exposant descend en facteur, puis il baisse d'un rang.",
    tags: ["stmg", "maths", "derivation", "piege", "template"],
    generate: () => {
      const a = pick([1, 2, 3, 4, -1, -2, -3] as const);
      const b = pick([1, 2, 3, 5, 6, -1, -2, -4, -6] as const);
      const c = pick([1, 2, 4, 5, 7, -3, -5, -9] as const);
      const d = pick([1, 3, 6, 8, 12, -2, -4, -10] as const);
      const juste = polynome(0, 3 * a, 2 * b, c);
      // Coefficients multipliés, exposants laissés tels quels.
      const faux = polynome(3 * a, 2 * b, c, 0);
      const bonne = "les exposants n'ont pas baissé d'un rang : ils ont seulement été multipliés devant";
      return {
        text:
          `Un élève dérive $f(x) = ${polynome(a, b, c, d)}$ et écrit « $f'(x) = ${faux}$ ». ` +
          `Qu'a-t-il oublié ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il a oublié de faire disparaître le terme constant",
          "il a multiplié par les mauvais nombres : il fallait diviser par les exposants",
          "il n'a rien oublié : cette dérivée est correcte",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dériver $x^n$ donne $nx^{n-1}$ : l'exposant descend en facteur ET il baisse d'un rang. Les deux gestes vont ensemble ; en oublier un donne une expression du même degré que $f$, ce qui est impossible pour une dérivée de polynôme.",
          "On dérive terme à terme, en vérifiant que le degré a bien baissé de un.",
          `$${a === 1 ? "" : a === -1 ? "-" : a}x^3 \\to ${3 * a}x^2$ (et non $${3 * a}x^3$) ; ` +
            `$${b >= 0 ? "+" : "-"} ${Math.abs(b)}x^2 \\to ${b >= 0 ? "+" : "-"} ${Math.abs(2 * b)}x$ ; ` +
            `$${c >= 0 ? "+" : "-"} ${Math.abs(c)}x \\to ${c >= 0 ? "+" : "-"} ${Math.abs(c)}$ ; ` +
            `$${d >= 0 ? "+" : "-"} ${Math.abs(d)} \\to 0$. ` +
            `Donc $f'(x) = ${juste}$ — un degré 2, pas un degré 3.`,
          `Il a bien fait descendre les exposants, mais il ne les a pas baissés : $f'(x) = ${juste}$.`
        ),
        choiceDiagnostics: [
          {
            choice: "il n'a rien oublié : cette dérivée est correcte",
            cause: "la dérivée d'un degré 3 est un degré 2 : ici le $x^3$ est resté, c'est le signe que le geste est incomplet",
          },
          {
            choice: "il a oublié de faire disparaître le terme constant",
            cause: `la constante $${d}$ a bien disparu — le défaut est ailleurs, dans les exposants`,
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_p_nombre_derive ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_p_nd_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_nombre_derive",
    difficulty: 2,
    theme: "neutral",
    hint: "On calcule d'abord l'expression de $f'$, PUIS on y remplace $x$.",
    tags: ["stmg", "maths", "derivation", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2] as const);
      const b = pick([2, 3, 5, 6, 8, -2, -4, -7] as const);
      const c = pick([1, 4, 5, 9, -3, -6] as const);
      const x0 = randomInt(-4, 6);
      const nd = 2 * a * x0 + b;
      return {
        text: `Soit $f(x) = ${polynome(0, a, b, c)}$. Calcule $f'(${x0})$.`,
        format: "short",
        expected: [fr(nd)],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre dérivé $f'(a)$ s'obtient en remplaçant $x$ par $a$ dans l'expression de la fonction dérivée.",
          "On dérive d'abord, on substitue ensuite — jamais l'inverse.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$, donc $f'(${x0}) = ${2 * a} \\times (${x0}) ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = ${fr(nd)}$.`,
          `$f'(${x0}) = ${fr(nd)}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — RÉSOUDRE $f'(x) = 0$, au lieu de calculer $f'$ en un point
    // donné. Le premier item évalue la dérivée là où on le lui dit ; celui-ci
    // cherche OÙ elle s'annule — c'est-à-dire où la tangente est horizontale.
    // C'est la question qui ouvre l'optimisation, et elle se pose avant de
    // savoir dresser un tableau de variations.
    kind: "template",
    id: "stmg_der_p_nombre_derive_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_nombre_derive",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris $f'(x)$, puis résous l'équation $f'(x) = 0$ : c'est une équation du premier degré.",
    tags: ["stmg", "maths", "derivation", "template", "short"],
    generate: () => {
      // On part de la solution pour qu'elle tombe sur un entier : avec
      // $f'(x) = 2ax + b$, choisir $b = -2a x_0$ place la racine en $x_0$.
      const a = pick([1, 2, 3, -1, -2] as const);
      const x0 = randomInt(-4, 6);
      const b = -2 * a * x0;
      const c = pick([1, 4, 5, 9, -3, -6] as const);
      return {
        text:
          `Soit $f(x) = ${polynome(0, a, b, c)}$. ` +
          `Pour quelle valeur de $x$ la tangente à la courbe est-elle HORIZONTALE ?`,
        format: "short",
        expected: [String(x0)],
        comparator: "number_equal",
        explanation: exp(
          "Une tangente horizontale a un coefficient directeur nul. Comme ce coefficient est le nombre dérivé, chercher une tangente horizontale revient à résoudre $f'(x) = 0$.",
          "On écrit la dérivée, on l'égale à zéro, et l'on résout — pour un polynôme du second degré, c'est une équation du premier degré.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$. ` +
            `On résout $${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0$, soit $${2 * a}x = ${-b}$, donc $x = ${x0}$. ` +
            `En ce point, la parabole atteint son ${a > 0 ? "MINIMUM" : "MAXIMUM"} : la dérivée change de signe en le traversant.`,
          `La tangente est horizontale en $x = ${x0}$.`
        ),
      };
    },
  },

  /* ═══════════════ der_p_forme_factorisee ═══════════════ */

  {
    kind: "template",
    id: "stmg_der_p_factorisee_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_forme_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Développe la forme factorisée proposée et compare-la à la dérivée que tu as calculée.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      // f(x) = a x³ + b x² + c x + d, avec f'(x) = 3a x² + 2b x + c factorisable
      // par construction : on choisit les racines de f' d'abord.
      // ⚠️ L'écart entre les racines est PAIR : $b = -\frac{3k(r_1+r_2)}{2}$ ne
      // serait pas entier sinon, et l'énoncé afficherait « −1,5x² ».
      const r1 = randomInt(-4, 0);
      const r2 = r1 + 2 * randomInt(1, 3);
      const k = pick([1, 2, 3] as const);
      // f'(x) = 3k(x - r1)(x - r2) = 3k x² - 3k(r1+r2) x + 3k r1 r2
      const A = 3 * k;
      const B = -3 * k * (r1 + r2);
      const C = 3 * k * r1 * r2;
      const a = k;
      const b = B / 2;
      const c = C;
      const d = pick([0, 1, 2, -1, -3, 5] as const);
      const correcte = Math.random() < 0.5;
      const s2 = correcte ? r2 : r2 + pick([1, -1] as const);
      const facteur = (r: number) => (r === 0 ? "x" : r > 0 ? `(x - ${r})` : `(x + ${-r})`);
      return {
        text:
          `Soit $f(x) = ${polynome(a, b, c, d)}$. ` +
          `On affirme que $f'(x) = ${A}${facteur(r1)}${facteur(s2)}$. Cette forme factorisée est-elle exacte ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [correcte ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Vérifier une forme factorisée de la dérivée, c'est la développer et la comparer à la dérivée calculée terme à terme.",
          "On calcule d'abord $f'$, puis on développe la proposition.",
          `$f'(x) = ${polynome(0, 3 * a, 2 * b, c)}$. ` +
            `La forme proposée $${A}${facteur(r1)}${facteur(s2)}$ se développe en $${polynome(0, A, -A * (r1 + s2), A * r1 * s2)}$.`,
          correcte
            ? "Les deux coïncident : la forme factorisée est exacte."
            : "Les deux diffèrent : la forme factorisée est fausse."
        ),
      };
    },
  },

  {
    // ANGLE 2 — SE SERVIR de la forme factorisée. Le premier item ne laisse que
    // « oui » ou « non » — deux propositions, donc une chance sur deux au
    // hasard ; celui-ci part de la forme factorisée et demande ce qu'elle
    // donne : les deux points où la tangente est horizontale. C'est pour cela
    // qu'on factorise une dérivée, et pas pour le plaisir de la factoriser.
    kind: "template",
    id: "stmg_der_p_factorisee_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_polynome",
    microId: "der_p_forme_factorisee",
    difficulty: 3,
    theme: "neutral",
    hint: "Un produit est nul quand l'un de ses facteurs l'est : $(x - r)$ s'annule en $x = r$, pas en $-r$.",
    tags: ["stmg", "maths", "derivation", "piege", "template"],
    generate: () => {
      // ⛔ RACINES NON OPPOSÉES. Le distracteur « on a recopié les nombres des
      // parenthèses » propose $-r_1$ et $-r_2$ : si $r_2 = -r_1$, il désigne le
      // MÊME couple que la bonne réponse, dans l'autre ordre. Deux propositions
      // justes, l'élève a raison et il est compté faux — la faute des racines
      // opposées, déjà trouvée à la lecture du 16/08 sur un autre item.
      let r1 = randomInt(-4, 0);
      let r2 = r1 + 2 * randomInt(1, 3);
      for (let essai = 0; essai < 40 && r1 === -r2; essai++) {
        r1 = randomInt(-4, 0);
        r2 = r1 + 2 * randomInt(1, 3);
      }
      const k = pick([1, 2, 3] as const);
      const A = 3 * k;
      const facteur = (r: number) => (r === 0 ? "x" : r > 0 ? `(x - ${r})` : `(x + ${-r})`);
      const bonne = `en $x = ${r1}$ et en $x = ${r2}$`;
      return {
        text:
          `La dérivée d'une fonction $f$ se factorise en $f'(x) = ${A}${facteur(r1)}${facteur(r2)}$. ` +
          `En quels points la tangente à la courbe de $f$ est-elle HORIZONTALE ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `en $x = ${-r1}$ et en $x = ${-r2}$`,
          `en $x = ${A}$ seulement`,
          "en aucun point : une dérivée ne s'annule jamais",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        // ⭐ LA COURBE DE $f$, avec ses deux paliers marqués. On remonte de
        // $f'$ à $f$ en primitivant terme à terme — $f'(x) = 3k(x-r_1)(x-r_2)$
        // développée donne $3kx^2 - 3k(r_1+r_2)x + 3k r_1 r_2$, dont une
        // primitive est $kx^3 - \frac{3k}{2}(r_1+r_2)x^2 + 3k r_1 r_2 x$.
        // Sans la figure, « tangente horizontale » reste un mot ; avec elle,
        // l'élève voit les deux endroits où la courbe s'aplatit.
        canvas: canvasCourbePoints(
          (x) =>
            k * x * x * x -
            ((3 * k) / 2) * (r1 + r2) * x * x +
            3 * k * r1 * r2 * x,
          Math.min(r1, r2) - 2,
          Math.max(r1, r2) + 2,
          "Courbe de f : deux paliers",
          { marques: [r1, r2] }
        ),
        explanation: exp(
          "La tangente est horizontale là où le nombre dérivé est nul. Une dérivée écrite sous forme factorisée donne ces points sans aucun calcul : un produit s'annule quand l'un de ses facteurs s'annule.",
          "On lit chaque facteur $(x - r)$ et l'on note la valeur $r$ qui l'annule — en faisant attention au signe, qui s'inverse au passage.",
          `$${facteur(r1)}$ s'annule en $x = ${r1}$, et $${facteur(r2)}$ en $x = ${r2}$. ` +
            `Le facteur $${A}$, lui, ne s'annule jamais. ` +
            `Entre $${r1}$ et $${r2}$, les deux parenthèses sont de signes contraires : $f'$ y est négative, donc $f$ décroît. ` +
            `Ailleurs, $f$ croît.`,
          `La tangente est horizontale en $x = ${r1}$ et en $x = ${r2}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `en $x = ${-r1}$ et en $x = ${-r2}$`,
            cause: "a recopié les nombres écrits dans les parenthèses : $(x - 3)$ s'annule en $3$, pas en $-3$",
          },
          {
            choice: "en aucun point : une dérivée ne s'annule jamais",
            cause: "c'est justement quand elle s'annule que la courbe change de sens — c'est là que se trouvent les extremums",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_v_signe_derivee ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_v_signe_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "La dérivée est ici du premier degré : elle s'annule une fois et change de signe.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const racine = randomInt(-4, 5);
      const b = -2 * a * racine;
      const c = pick([0, 1, 2, -1, -3, 4] as const);
      const positifApres = a > 0;
      const bonne = positifApres
        ? `positive sur $]${racine}\\,;\\,+\\infty[$, négative avant`
        : `négative sur $]${racine}\\,;\\,+\\infty[$, positive avant`;
      return {
        text: `Soit $f(x) = ${polynome(0, a, b, c)}$. Quel est le signe de $f'(x)$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          positifApres
            ? `négative sur $]${racine}\\,;\\,+\\infty[$, positive avant`
            : `positive sur $]${racine}\\,;\\,+\\infty[$, négative avant`,
          "positive sur $\\mathbb{R}$",
          "négative sur $\\mathbb{R}$",
          `positive sur $]${racine + 1}\\,;\\,+\\infty[$, négative avant`,
          `positive sur $]0\\,;\\,+\\infty[$, négative avant`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour un polynôme de degré 2, la dérivée est du premier degré : elle s'annule en une valeur et change de signe à cet endroit.",
          "On calcule la dérivée, on cherche où elle s'annule, puis on regarde le signe de son coefficient directeur.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$, qui s'annule pour $x = ${racine}$. ` +
            `Son coefficient $${2 * a}$ est ${a > 0 ? "positif" : "négatif"}, donc $f'$ est ${a > 0 ? "négative avant et positive après" : "positive avant et négative après"}.`,
          `$f'$ est ${bonne}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — le signe SERT à décider. Le premier item demande le signe de
    // $f'$ sur une expression nue ; celui-ci le fait servir : jusqu'à quelle
    // quantité le bénéfice augmente-t-il encore ? C'est la même inéquation,
    // et c'est la raison pour laquelle le programme fait étudier des signes de
    // dérivées — le BO cite les « problèmes d'optimisation » comme usage
    // principal du chapitre.
    kind: "template",
    id: "stmg_der_v_signe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_signe_derivee",
    difficulty: 3,
    theme: "neutral",
    hint: "Tant que $B'(x)$ reste positive, le bénéfice augmente encore. Cherche où elle s'annule.",
    tags: ["stmg", "maths", "derivation", "gestion", "template", "short"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const a = pick([2, 3, 4, 5, 6] as const);
      const xOpt = pick([10, 15, 20, 25, 30, 40] as const);
      // $B'(x) = -2a x + 2a x_{opt}$ s'annule en $x_{opt}$ et change de signe.
      const pente = 2 * a;
      const ordonnee = 2 * a * xOpt;
      return {
        text:
          `Le bénéfice tiré de la vente de $x$ ${prod.unite} a pour dérivée ` +
          `$B'(x) = -${pente}x + ${ordonnee}$. ` +
          `Jusqu'à combien de ${prod.unite} le bénéfice AUGMENTE-t-il encore ?`,
        format: "short",
        expected: [String(xOpt)],
        comparator: "number_equal",
        // ⭐ LA DROITE DE B' EST TRACÉE. Le BO veut ce chapitre graphique, et
        // ici la figure ne donne pas la réponse : elle montre POURQUOI il y a
        // une réponse — la dérivée traverse l'axe une fois, et une seule.
        canvas: canvasCourbePoints(
          (x) => -pente * x + ordonnee,
          0,
          xOpt * 2,
          `Dérivée du bénéfice : B'(x)`,
          { marques: [xOpt] }
        ),
        explanation: exp(
          "Une fonction croît là où sa dérivée est positive, et décroît là où elle est négative. Le point de bascule est celui où la dérivée s'annule.",
          "On résout $B'(x) > 0$, ce qui donne l'intervalle de croissance. Comme le coefficient devant $x$ est négatif, l'inégalité se retourne à la division.",
          `$-${pente}x + ${ordonnee} > 0$ donne $${pente}x < ${ordonnee}$, donc $x < ${xOpt}$. ` +
            `Le bénéfice augmente jusqu'à $${xOpt}$ ${prod.unite}, puis il diminue : ` +
            `au-delà, $B'(x)$ devient négative — chaque ${prod.un.slice(3)} supplémentaire rapporte moins qu'${prod.genre === "f" ? "elle" : "il"} ne coûte.`,
          `Le bénéfice augmente jusqu'à $${xOpt}$ ${prod.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ der_v_lien_signe ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_v_lien_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_lien_signe",
    difficulty: 2,
    theme: "neutral",
    hint: "Dérivée positive, fonction croissante — c'est le lien admis par le programme.",
    tags: ["stmg", "maths", "derivation", "template"],
    generate: () => {
      const positive = Math.random() < 0.5;
      const borneG = randomInt(-6, 0);
      const borneD = borneG + randomInt(2, 7);
      return {
        text:
          `Sur l'intervalle $[${borneG}\\,;\\,${borneD}]$, la dérivée $f'$ est strictement ${positive ? "positive" : "négative"}. ` +
          `Que peut-on en déduire pour $f$ ?`,
        format: "qcm",
        choices: shuffle([
          `$f$ est croissante sur $[${borneG}\\,;\\,${borneD}]$`,
          `$f$ est décroissante sur $[${borneG}\\,;\\,${borneD}]$`,
          `$f$ est positive sur $[${borneG}\\,;\\,${borneD}]$`,
          `$f$ est négative sur $[${borneG}\\,;\\,${borneD}]$`,
        ]),
        expected: [
          positive
            ? `$f$ est croissante sur $[${borneG}\\,;\\,${borneD}]$`
            : `$f$ est décroissante sur $[${borneG}\\,;\\,${borneD}]$`,
        ],
        comparator: "mcq_exact",
        explanation: exp(
          "Le programme admet le lien entre le signe de la dérivée et le sens de variation : dérivée positive, fonction croissante ; dérivée négative, fonction décroissante.",
          "On lit le SIGNE de $f'$, et l'on en déduit le SENS DE VARIATION de $f$ — pas le signe de $f$.",
          `Ici $f'$ est ${positive ? "positive" : "négative"} sur tout l'intervalle, donc $f$ y est ${positive ? "croissante" : "décroissante"}.`,
          `$f$ est ${positive ? "croissante" : "décroissante"} sur $[${borneG}\\,;\\,${borneD}]$.`
        ),
        choiceDiagnostics: [
          {
            choice: positive
              ? `$f$ est positive sur $[${borneG}\\,;\\,${borneD}]$`
              : `$f$ est négative sur $[${borneG}\\,;\\,${borneD}]$`,
            cause: "a transféré le signe de f' à f : le signe de la dérivée renseigne sur les VARIATIONS, pas sur le signe de la fonction",
          },
        ],
      };
    },
  },

  {
    // ANGLE 2 — le signe de $f$ N'EST PAS celui de $f'$. Le premier item relie
    // le signe de la dérivée au sens de variation ; celui-ci met les deux
    // signes en conflit — une fonction négative dont la dérivée est positive —
    // et demande ce qu'elle fait. C'est la confusion la plus tenace du
    // chapitre : une entreprise qui perd de l'argent peut très bien être en
    // train de redresser la barre.
    kind: "template",
    id: "stmg_der_v_lien_signe_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_lien_signe",
    difficulty: 3,
    theme: "neutral",
    hint: "Le signe de $f$ dit OÙ SE TROUVE la courbe ; le signe de $f'$ dit dans quel SENS elle va.",
    tags: ["stmg", "maths", "derivation", "piege", "template"],
    generate: () => {
      const negative = Math.random() < 0.5;
      const borneG = randomInt(-6, 1);
      const borneD = borneG + randomInt(2, 6);
      // ⭐ LA COURBE EST TRACÉE, et c'est elle qui règle la question. Une
      // fonction sous l'axe qui monte vers lui : dit en mots, c'est abstrait ;
      // vu une fois, ça ne se réoublie pas. La droite affine ci-dessous est
      // négative et croissante sur l'intervalle (ou l'inverse), par
      // construction — sa pente et son ordonnée sont calées sur les bornes.
      const pente = negative ? 1 : -1;
      const ordonnee = negative ? -(borneD + 2) : borneD + 2;
      const signeF = negative ? "NÉGATIVE" : "POSITIVE";
      const signeFprime = negative ? "POSITIVE" : "NÉGATIVE";
      const bonne = negative
        ? "elle CROÎT, tout en restant en dessous de l'axe des abscisses"
        : "elle DÉCROÎT, tout en restant au-dessus de l'axe des abscisses";
      return {
        text:
          `Sur l'intervalle $]${borneG}\\,;\\,${borneD}[$, une fonction $f$ est ${signeF}, ` +
          `et sa dérivée $f'$ est ${signeFprime}. Que fait la courbe de $f$ sur cet intervalle ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          negative
            ? "elle décroît, puisqu'elle est négative"
            : "elle croît, puisqu'elle est positive",
          "c'est impossible : $f$ et $f'$ ont toujours le même signe",
          "elle reste constante",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(
          (x) => pente * x + ordonnee,
          borneG,
          borneD,
          `Courbe de f sur [${borneG} ; ${borneD}]`
        ),
        explanation: exp(
          "Le signe de $f$ et celui de $f'$ répondent à deux questions différentes. $f(x) > 0$ dit que la courbe est AU-DESSUS de l'axe ; $f'(x) > 0$ dit qu'elle MONTE. Rien n'oblige les deux à coïncider.",
          "On sépare les deux lectures : d'abord la position par rapport à l'axe, ensuite le sens de variation.",
          negative
            ? `Ici $f$ est négative : la courbe est sous l'axe. Mais $f'$ est positive : elle monte. ` +
              `Elle remonte donc vers l'axe sans l'avoir encore atteint — le cas d'une entreprise déficitaire dont les pertes se réduisent.`
            : `Ici $f$ est positive : la courbe est au-dessus de l'axe. Mais $f'$ est négative : elle descend. ` +
              `Elle redescend donc vers l'axe sans l'avoir encore atteint — le cas d'un bénéfice encore positif, mais qui s'effrite.`,
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + "."
        ),
        choiceDiagnostics: [
          {
            choice: "c'est impossible : $f$ et $f'$ ont toujours le même signe",
            cause: "les deux signes sont indépendants : l'un donne la position de la courbe, l'autre son sens",
          },
          {
            choice: negative
              ? "elle décroît, puisqu'elle est négative"
              : "elle croît, puisqu'elle est positive",
            cause: "a lu le signe de $f$ pour conclure sur le sens : c'est le signe de $f'$ qui décide du sens",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_v_tableau ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_v_tableau_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "La ligne du signe de $f'$ commande la ligne des flèches.",
    tags: ["stmg", "maths", "derivation", "canvas", "template"],
    generate: () => {
      const a = pick([1, 2, -1, -2] as const);
      const racine = randomInt(-3, 4);
      const b = -2 * a * racine;
      const c = pick([0, 1, 2, -2, 5, -4] as const);
      const f = (x: number) => a * x * x + b * x + c;
      const borneG = racine - randomInt(2, 4);
      const borneD = racine + randomInt(2, 4);
      const croissantApres = a > 0;
      const bonne = croissantApres
        ? `décroissante sur $[${borneG}\\,;\\,${racine}]$, croissante sur $[${racine}\\,;\\,${borneD}]$`
        : `croissante sur $[${borneG}\\,;\\,${racine}]$, décroissante sur $[${racine}\\,;\\,${borneD}]$`;
      return {
        text:
          `Le tableau donne le signe de $f'$ sur $[${borneG}\\,;\\,${borneD}]$. ` +
          `Quel est le sens de variation de $f$ ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          croissantApres
            ? `croissante sur $[${borneG}\\,;\\,${racine}]$, décroissante sur $[${racine}\\,;\\,${borneD}]$`
            : `décroissante sur $[${borneG}\\,;\\,${racine}]$, croissante sur $[${racine}\\,;\\,${borneD}]$`,
          `croissante sur tout $[${borneG}\\,;\\,${borneD}]$`,
          `décroissante sur tout $[${borneG}\\,;\\,${borneD}]$`,
          `constante sur $[${borneG}\\,;\\,${borneD}]$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: {
          kind: "tableau_donnees",
          title: `Signe de f' sur [${borneG} ; ${borneD}]`,
          caption: "La ligne du signe de f' commande le sens de variation de f",
          headers: ["x", String(borneG), "→", String(racine), "→", String(borneD)],
          rows: [
            {
              label: "signe de f'(x)",
              values: [a > 0 ? "−" : "+", a > 0 ? "−" : "+", "0", a > 0 ? "+" : "−", a > 0 ? "+" : "−"],
            },
            { label: "variations de f", values: ["?", "?", fr(f(racine)), "?", "?"] },
          ],
        } satisfies CanvasFigure,
        explanation: exp(
          "Le tableau de variations se déduit du tableau de signes de la dérivée : là où $f'$ est positive, $f$ croît ; là où elle est négative, $f$ décroît.",
          "On lit la ligne du signe, et l'on place les flèches en conséquence. Le changement de signe marque l'extremum.",
          `$f'$ s'annule en $${racine}$ en passant du ${a > 0 ? "négatif au positif" : "positif au négatif"} : ` +
            `$f$ y atteint donc un ${a > 0 ? "minimum" : "maximum"}, égal à $${fr(f(racine))}$.`,
          `$f$ est ${bonne}.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — DRESSER le tableau, au lieu de le lire. Le premier item affiche
    // le tableau de signes et fait conclure ; celui-ci ne donne que
    // l'expression et demande où placer la barre — l'abscisse où $f'$ s'annule
    // et où le sens s'inverse. C'est la première ligne du tableau, celle sans
    // laquelle les deux autres ne peuvent pas s'écrire.
    kind: "template",
    id: "stmg_der_v_tableau_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_tableau",
    difficulty: 3,
    theme: "neutral",
    hint: "La barre du tableau se place là où $f'$ s'annule : résous $f'(x) = 0$.",
    // ⛔ PAS DE FIGURE ICI, ET C'EST VOLONTAIRE. Tracer la parabole donnerait
    // l'abscisse du sommet à la lecture, et l'item deviendrait un doublon de
    // `der_nd_lire_graphique`. Ce qu'on travaille ici, c'est le CALCUL qui
    // permet de dresser le tableau quand aucune courbe n'est fournie — le cas
    // d'un sujet de bac. Même raison pour `der_p_nombre_derive_tpl_2`.
    tags: ["stmg", "maths", "derivation", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const racine = randomInt(-3, 5);
      const b = -2 * a * racine;
      const c = pick([0, 1, 2, -2, 5, -4] as const);
      const borneG = racine - randomInt(2, 4);
      const borneD = racine + randomInt(2, 4);
      return {
        text:
          `On veut dresser le tableau de variations de $f(x) = ${polynome(0, a, b, c)}$ ` +
          `sur $[${borneG}\\,;\\,${borneD}]$. ` +
          `À quelle abscisse faut-il placer la barre qui sépare les deux sens de variation ?`,
        format: "short",
        expected: [String(racine)],
        comparator: "number_equal",
        explanation: exp(
          "Un tableau de variations se sépare aux abscisses où la dérivée s'annule : ce sont les seuls points où le sens peut changer.",
          "On dérive, on résout $f'(x) = 0$, et l'on porte la solution comme colonne de séparation. Les deux sens se déduisent ensuite du signe de $f'$ de part et d'autre.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$. On résout $${2 * a}x ${b >= 0 ? "+" : "-"} ${Math.abs(b)} = 0$, ` +
            `d'où $x = ${racine}$. ` +
            `Comme $a = ${a}$ est ${a > 0 ? "positif" : "négatif"}, $f'$ est ${a > 0 ? "négative avant et positive après" : "positive avant et négative après"} : ` +
            `$f$ ${a > 0 ? "décroît puis croît, avec un MINIMUM" : "croît puis décroît, avec un MAXIMUM"} en $x = ${racine}$.`,
          `La barre se place en $x = ${racine}$.`
        ),
      };
    },
  },

  /* ═══════════════════ der_v_extremum ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_v_extremum_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "L'extremum est atteint là où la dérivée s'annule : trouve d'abord cette abscisse.",
    tags: ["stmg", "maths", "derivation", "canvas", "template", "short"],
    generate: () => {
      const a = pick([1, 2, 3, -1, -2, -3] as const);
      const racine = randomInt(-4, 5);
      const b = -2 * a * racine;
      const c = pick([0, 1, 3, -2, -5, 6, 10] as const);
      const f = (x: number) => a * x * x + b * x + c;
      return {
        text:
          `Soit $f(x) = ${polynome(0, a, b, c)}$. ` +
          `Quelle est la valeur du ${a > 0 ? "minimum" : "maximum"} de $f$ ?`,
        format: "short",
        expected: [fr(f(racine))],
        comparator: "number_equal",
        canvas: canvasParaboleDroite(a, b, c, null, "Courbe de f", [{ x: racine, label: a > 0 ? "minimum" : "maximum" }]),
        explanation: exp(
          "Un extremum d'une fonction dérivable est atteint là où la dérivée s'annule en changeant de signe.",
          "On dérive, on annule, on résout, puis on calcule l'image de la valeur trouvée.",
          `$f'(x) = ${polynome(0, 0, 2 * a, b)}$ s'annule pour $x = ${racine}$. ` +
            `L'extremum vaut alors $f(${racine}) = ${fr(f(racine))}$.`,
          `Le ${a > 0 ? "minimum" : "maximum"} de $f$ vaut $${fr(f(racine))}$, atteint en $x = ${racine}$.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — $f'(x_0) = 0$ NE SUFFIT PAS. Le premier item calcule la valeur
    // de l'extremum ; celui-ci interroge la condition elle-même. Un élève
    // apprend « la dérivée s'annule, donc c'est un extremum » et l'applique
    // sans jamais vérifier le CHANGEMENT DE SIGNE — qui est la vraie condition,
    // et la seule qui distingue un sommet d'un simple palier.
    kind: "template",
    id: "stmg_der_v_extremum_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_variations",
    microId: "der_v_extremum",
    difficulty: 3,
    theme: "neutral",
    hint: "Une dérivée qui s'annule SANS changer de signe donne un palier, pas un sommet.",
    tags: ["stmg", "maths", "derivation", "piege", "template"],
    generate: () => {
      const x0 = randomInt(-3, 5);
      const bonne =
        `il faut vérifier que $f'$ CHANGE DE SIGNE en $${x0}$ : s'annuler ne suffit pas`;
      return {
        text:
          `Un élève affirme : « $f'(${x0}) = 0$, donc $f$ admet un extremum en $${x0}$. » ` +
          `Que faut-il lui répondre ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `c'est juste : une dérivée qui s'annule donne toujours un extremum`,
          `il faut aussi que $f(${x0})$ soit nul`,
          `il faut d'abord vérifier que $f$ est positive en $${x0}$`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        // ⭐ LE CONTRE-EXEMPLE EST TRACÉ. $x \mapsto x^3$ a une tangente
        // horizontale en zéro et ne s'y retourne pas : c'est la seule chose à
        // voir, et une phrase ne la fait pas voir. La courbe est décalée en
        // $x_0$ pour coller à l'énoncé.
        canvas: canvasCourbePoints(
          (x) => Math.pow(x - x0, 3),
          x0 - 3,
          x0 + 3,
          `Un exemple : une courbe à tangente horizontale en ${x0}, sans extremum`,
          { marques: [x0] }
        ),
        explanation: exp(
          "Un extremum se produit là où la fonction cesse de monter pour descendre — ou l'inverse. La dérivée y est nulle, mais cela ne suffit pas : il faut qu'elle CHANGE DE SIGNE en ce point.",
          "On dresse le tableau de signes de $f'$ autour du point, et l'on regarde si le signe s'inverse de part et d'autre.",
          `Contre-exemple : pour $f(x) = x^3$, on a $f'(x) = 3x^2$, donc $f'(0) = 0$. ` +
            `Mais $3x^2$ reste positive de chaque côté de zéro : la fonction continue de croître, et il n'y a AUCUN extremum en $0$ — ` +
            `seulement un palier, une tangente horizontale traversée sans changer de sens.`,
          `La dérivée doit s'annuler ET changer de signe.`
        ),
        choiceDiagnostics: [
          {
            choice: `c'est juste : une dérivée qui s'annule donne toujours un extremum`,
            cause: "$f(x) = x^3$ le contredit : $f'(0) = 0$ et pourtant la fonction ne cesse jamais de croître",
          },
          {
            choice: `il faut aussi que $f(${x0})$ soit nul`,
            cause: "la valeur de $f$ n'a rien à voir : un maximum peut valoir n'importe quel nombre",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_o_benefice ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_o_benefice_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_optimisation",
    microId: "der_o_benefice",
    difficulty: 3,
    theme: "neutral",
    hint: "Le bénéfice est maximal là où sa dérivée s'annule en passant du positif au négatif.",
    tags: ["stmg", "maths", "derivation", "gestion", "optimisation", "canvas", "template", "short"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      // B(x) = -a x² + b x - c, maximum en x = b/(2a) — choisi entier.
      const a = pick([1, 2, 4, 5] as const);
      const xOpt = pick([10, 15, 20, 25, 30, 40, 50] as const);
      const b = 2 * a * xOpt;
      const c = pick([100, 200, 400, 500, 800] as const);
      const B = (x: number) => -a * x * x + b * x - c;
      return {
        text:
          `Le bénéfice, en euros, réalisé pour la vente de $x$ ${prod.unite} est ` +
          `$B(x) = -${a}x^2 + ${b}x - ${c}$. ` +
          `Pour quelle quantité le bénéfice est-il maximal ?`,
        format: "short",
        expected: [String(xOpt)],
        comparator: "number_equal",
        canvas: canvasCourbePoints(B, 0, xOpt * 2, `Bénéfice en fonction de la quantité vendue`, {
          pas: Math.max(0.5, xOpt / 25),
          marques: [xOpt],
        }),
        explanation: exp(
          "Le bénéfice est maximal là où sa dérivée s'annule en changeant de signe, du positif vers le négatif.",
          "On dérive, on annule, on résout — et l'on vérifie sur la courbe que c'est bien un maximum.",
          `$B'(x) = -${2 * a}x + ${b}$, qui s'annule pour $x = \\dfrac{${b}}{${2 * a}} = ${xOpt}$. ` +
            `Avant, $B'$ est positive (le bénéfice monte) ; après, négative (il redescend).`,
          `Le bénéfice est maximal pour $${xOpt}$ ${prod.unite}, et vaut alors $${fr(B(xOpt))}$ €.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — COMBIEN, et non plus POUR COMBIEN. Le premier item donne la
    // quantité qui maximise le bénéfice ; celui-ci demande le bénéfice
    // lui-même. Deux nombres tout à fait différents, et l'élève s'arrête
    // presque toujours au premier : il a trouvé $x_{opt}$ et croit avoir fini,
    // alors que la question du chef d'entreprise est « ça rapporte combien ? ».
    kind: "template",
    id: "stmg_der_o_benefice_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_optimisation",
    microId: "der_o_benefice",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d'abord la quantité qui annule $B'$, puis REMPLACE-la dans $B$ — pas dans $B'$.",
    tags: ["stmg", "maths", "derivation", "gestion", "canvas", "template", "short"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const a = pick([1, 2, 4, 5] as const);
      const xOpt = pick([10, 15, 20, 25, 30, 40] as const);
      const b = 2 * a * xOpt;
      const c = pick([100, 200, 400, 500, 800] as const);
      const B = (x: number) => -a * x * x + b * x - c;
      const maxi = B(xOpt);
      return {
        text:
          `Le bénéfice, en euros, réalisé pour la vente de $x$ ${prod.unite} est ` +
          `$B(x) = -${a}x^2 + ${b}x - ${c}$. ` +
          `Quel est le bénéfice MAXIMAL, en euros ?`,
        format: "short",
        expected: [String(maxi)],
        comparator: "number_equal",
        canvas: canvasCourbePoints(B, 0, xOpt * 2, `Bénéfice en fonction de la quantité vendue`, {
          marques: [xOpt],
        }),
        explanation: exp(
          "Optimiser se fait en deux temps : on cherche d'abord OÙ l'extremum se produit — l'abscisse qui annule la dérivée —, puis COMBIEN il vaut, en remplaçant cette abscisse dans la fonction de départ.",
          "On dérive, on résout $B'(x) = 0$ pour obtenir la quantité, puis on calcule $B$ de cette quantité. C'est bien dans $B$ qu'on remplace, jamais dans $B'$ — qui vaut zéro à cet endroit.",
          `$B'(x) = -${2 * a}x + ${b}$ s'annule pour $x = ${xOpt}$ ${prod.unite}. ` +
            `Le bénéfice maximal vaut alors $B(${xOpt}) = -${a} \\times ${xOpt * xOpt} + ${b} \\times ${xOpt} - ${c} = ${maxi}$ €. ` +
            `⚠️ $${xOpt}$ est une QUANTITÉ, $${maxi}$ est un MONTANT : les deux ne se confondent pas.`,
          `Le bénéfice maximal est de $${maxi}$ €, atteint pour $${xOpt}$ ${prod.unite}.`
        ),
      };
    },
  },

  /* ═══════════════════ der_o_cout ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_o_cout_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_optimisation",
    microId: "der_o_cout",
    difficulty: 3,
    theme: "neutral",
    hint: "Même méthode que pour le bénéfice, mais la parabole est tournée vers le haut : la dérivée passe du négatif au positif.",
    tags: ["stmg", "maths", "derivation", "gestion", "optimisation", "canvas", "template", "short"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const a = pick([1, 2, 3, 5] as const);
      const xOpt = pick([8, 12, 16, 20, 24, 30, 36] as const);
      const b = 2 * a * xOpt;
      const c = pick([200, 300, 500, 700, 1000] as const);
      const C = (x: number) => a * x * x - b * x + c;
      return {
        text:
          `Le coût de fabrication, en euros, de $x$ ${prod.unite} par lot est ` +
          `$C(x) = ${a}x^2 - ${b}x + ${c}$. ` +
          `Pour quelle taille de lot le coût est-il minimal ?`,
        format: "short",
        expected: [String(xOpt)],
        comparator: "number_equal",
        canvas: canvasCourbePoints(C, 0, xOpt * 2, "Coût en fonction de la taille du lot", {
          pas: Math.max(0.5, xOpt / 25),
          marques: [xOpt],
        }),
        explanation: exp(
          "Un coût est minimal là où sa dérivée s'annule en passant du négatif au positif.",
          "On dérive, on annule, on résout, puis on vérifie le sens du changement de signe.",
          `$C'(x) = ${2 * a}x - ${b}$, qui s'annule pour $x = \\dfrac{${b}}{${2 * a}} = ${xOpt}$. ` +
            `Avant, $C'$ est négative (le coût baisse) ; après, positive (il remonte).`,
          `Le coût est minimal pour un lot de $${xOpt}$ ${prod.unite}, et vaut alors $${fr(C(xOpt))}$ €.`
        ),
      };
    },
  },

  {
    // ANGLE 2 — MINIMUM ou MAXIMUM ? Le premier item trouve la taille de lot
    // qui minimise le coût ; celui-ci demande comment on SAIT que c'est un
    // minimum. La dérivée s'annule dans les deux cas — c'est le signe du
    // coefficient dominant, ou le sens du changement de signe de $C'$, qui
    // tranche. Sans cette étape, on annonce un coût minimal là où il est
    // maximal, et la décision de gestion s'inverse.
    kind: "template",
    id: "stmg_der_o_cout_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_optimisation",
    microId: "der_o_cout",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le signe de $C'$ AVANT et APRÈS le point : négatif puis positif, la courbe descend puis remonte.",
    tags: ["stmg", "maths", "derivation", "gestion", "piege", "template"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const a = pick([1, 2, 3, 5] as const);
      const xOpt = pick([8, 12, 16, 20, 24, 30] as const);
      const b = 2 * a * xOpt;
      const bonne =
        `$C'$ est NÉGATIVE avant $${xOpt}$ et POSITIVE après : le coût descend puis remonte`;
      return {
        text:
          `Le coût de production d'un lot de $x$ ${prod.unite} est $C(x) = ${a}x^2 - ${b}x + 500$, en euros. ` +
          `On trouve $C'(${xOpt}) = 0$. Comment sait-on qu'il s'agit d'un MINIMUM et non d'un maximum ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `parce que $C(${xOpt})$ est le plus petit nombre de l'énoncé`,
          `parce que $C'(${xOpt}) = 0$ : une dérivée nulle annonce toujours un minimum`,
          `parce que le coût ne peut pas être négatif`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        // ⭐ La courbe du coût, avec son creux marqué : le minimum se VOIT, et
        // la question porte sur la justification, pas sur la lecture.
        canvas: canvasCourbePoints(
          (x) => a * x * x - b * x + 500,
          0,
          xOpt * 2,
          "Coût en fonction de la taille du lot",
          { marques: [xOpt] }
        ),
        explanation: exp(
          "Une dérivée nulle signale un extremum, mais ne dit pas lequel. C'est le SENS du changement de signe de la dérivée qui distingue un minimum d'un maximum : négatif puis positif pour un minimum, positif puis négatif pour un maximum.",
          "On étudie le signe de $C'$ de part et d'autre du point, ou l'on regarde le coefficient de $x^2$ : positif, la parabole est tournée vers le haut, donc creuse un minimum.",
          `$C'(x) = ${2 * a}x - ${b}$. Pour $x < ${xOpt}$, elle est négative — le coût baisse. ` +
            `Pour $x > ${xOpt}$, elle est positive — le coût remonte. Le point $${xOpt}$ est donc bien le creux. ` +
            `Le coefficient de $x^2$, $${a}$, est positif : la parabole s'ouvre vers le haut, ce qui confirme le minimum.`,
          `C'est un minimum parce que $C'$ passe du négatif au positif en $${xOpt}$.`
        ),
        choiceDiagnostics: [
          {
            choice: `parce que $C'(${xOpt}) = 0$ : une dérivée nulle annonce toujours un minimum`,
            cause: "une dérivée nulle annonce un extremum sans dire lequel — un maximum l'annule tout autant",
          },
          {
            choice: `parce que le coût ne peut pas être négatif`,
            cause: "le signe du coût n'a rien à voir avec le sens de ses variations",
          },
        ],
      };
    },
  },

  /* ═══════════════════ der_o_conclure ═══════════════════ */

  {
    kind: "template",
    id: "stmg_der_o_conclure_tpl_1",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_optimisation",
    microId: "der_o_conclure",
    difficulty: 2,
    theme: "neutral",
    hint: "Une conclusion reprend la quantité, la grandeur optimisée et son unité.",
    tags: ["stmg", "maths", "derivation", "gestion", "open", "template"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const xOpt = pick([12, 18, 25, 30, 45, 60, 75] as const);
      const valeur = pick([420, 680, 950, 1250, 1840, 2300] as const);
      const nature = pick(["bénéfice maximal", "coût minimal"] as const);
      return {
        text:
          `Une étude sur la production ${prod.objet} conduit à $x = ${xOpt}$ et à un ${nature} de $${valeur}$ €. ` +
          `Rédige la phrase de conclusion, dans le contexte.`,
        format: "open",
        // ⛔ Pas de « € » seul en mot-clé : un caractère, validé par toute
        // réponse citant un montant. « euros » écrit en toutes lettres reste.
        expected: [String(xOpt), String(valeur), prod.unite, "euros"],
        comparator: "contains_keyword",
        explanation: exp(
          "Un résultat de calcul ne devient une réponse que replacé dans le contexte : la quantité, la grandeur optimisée, son unité.",
          "On reprend les termes de l'énoncé et l'on y insère les valeurs trouvées.",
          `La valeur $${xOpt}$ est une QUANTITÉ (en ${prod.unite}) ; la valeur $${valeur}$ est un MONTANT (en euros). ` +
            `Les confondre est l'erreur la plus fréquente en fin de problème.`,
          `Par exemple : « Pour ${xOpt} ${prod.unite}, on obtient un ${nature} de ${valeur} €. »`
        ),
      };
    },
  },

  {
    // ANGLE 2 — TRIER les conclusions, quand le premier item fait RÉDIGER.
    // L'ouverte est jugée par mots-clés : elle récompense celui qui écrit, et
    // laisse démuni celui qui ne sait pas par où commencer. Ici les quatre
    // phrases sont posées, et trois échouent chacune sur un point précis :
    // l'unité oubliée, la quantité prise pour le montant, l'extremum inversé.
    kind: "template",
    id: "stmg_der_o_conclure_tpl_2",
    niveau: "stmg",
    matiere: "maths",
    notionId: "der_optimisation",
    microId: "der_o_conclure",
    difficulty: 2,
    theme: "neutral",
    hint: "Une conclusion nomme trois choses : la quantité, ce qu'on optimise, et l'unité de chacune.",
    tags: ["stmg", "maths", "derivation", "gestion", "template"],
    generate: () => {
      const prod = pick(PRODUCTIONS);
      const xOpt = pick([12, 18, 25, 30, 45, 60, 75] as const);
      const valeur = pick([420, 680, 950, 1250, 1840, 2300] as const);
      const maxi = Math.random() < 0.5;
      // ⭐ LA COURBE DE L'ÉTUDE, avec son sommet ou son creux marqué. Elle ne
      // souffle aucune des quatre phrases — la question porte sur la FORMULATION
      // —, mais elle rappelle ce que les deux nombres désignent : une quantité
      // en abscisse, un montant en ordonnée. C'est justement ce que la mauvaise
      // conclusion intervertit.
      const courbe = (x: number) =>
        maxi
          ? valeur - Math.pow(x - xOpt, 2) * (valeur / (xOpt * xOpt))
          : valeur + Math.pow(x - xOpt, 2) * (valeur / (xOpt * xOpt));
      const nature = maxi ? "bénéfice maximal" : "coût minimal";
      const verbe = maxi ? "maximal" : "minimal";
      const contraire = maxi ? "minimal" : "maximal";
      const bonne =
        `Pour $${xOpt}$ ${prod.unite}, le ${maxi ? "bénéfice" : "coût"} est ${verbe} et vaut $${valeur}$ euros.`;
      return {
        text:
          `Une étude sur la production ${prod.objet} conduit à $x = ${xOpt}$ et à un ${nature} de $${valeur}$ €. ` +
          `Laquelle de ces quatre conclusions est correcte ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `Pour $${valeur}$ ${prod.unite}, le ${maxi ? "bénéfice" : "coût"} est ${verbe} et vaut $${xOpt}$ euros.`,
          `Pour $${xOpt}$ ${prod.unite}, le ${maxi ? "bénéfice" : "coût"} est ${contraire} et vaut $${valeur}$ euros.`,
          `Le résultat de l'étude est $${xOpt}$ et $${valeur}$.`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        canvas: canvasCourbePoints(
          courbe,
          0,
          xOpt * 2,
          `${maxi ? "Bénéfice" : "Coût"} en fonction du nombre de ${prod.unite}`,
          { marques: [xOpt] }
        ),
        explanation: exp(
          "Une conclusion de problème d'optimisation répond à la question posée, en langage ordinaire : elle donne la quantité optimale avec SON unité, la grandeur optimisée avec la sienne, et précise s'il s'agit d'un maximum ou d'un minimum.",
          "On vérifie les trois points l'un après l'autre : la quantité et son unité, le montant et la sienne, puis la nature de l'extremum.",
          `Ici $x = ${xOpt}$ est une QUANTITÉ, en ${prod.unite} ; $${valeur}$ est un MONTANT, en euros. ` +
            `Les échanger donne une phrase qui n'a plus de sens — $${valeur}$ ${prod.unite} produits pour $${xOpt}$ euros. ` +
            `Et annoncer un ${contraire} là où l'étude trouve un ${verbe} inverse complètement la décision de gestion.`,
          `« ${bonne} »`
        ),
        choiceDiagnostics: [
          {
            choice: `Le résultat de l'étude est $${xOpt}$ et $${valeur}$.`,
            cause: "deux nombres sans unité ni grandeur : cette phrase ne dit pas de quoi elle parle",
          },
          {
            choice: `Pour $${valeur}$ ${prod.unite}, le ${maxi ? "bénéfice" : "coût"} est ${verbe} et vaut $${xOpt}$ euros.`,
            cause: "a échangé la quantité et le montant : les unités ne suivent plus",
          },
        ],
      };
    },
  },
];
