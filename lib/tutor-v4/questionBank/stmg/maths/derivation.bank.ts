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

const PRODUCTIONS = [
  { objet: "des paniers garnis", unite: "paniers" },
  { objet: "des coffrets cadeaux", unite: "coffrets" },
  { objet: "des tables basses", unite: "tables" },
  { objet: "des ruches", unite: "ruches" },
  { objet: "des paires de sandales", unite: "paires" },
  { objet: "des sacs isothermes", unite: "sacs" },
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
          `la valeur de ${grandeur.nom} à l'instant $${t}$`,
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
            choice: `la valeur de ${grandeur.nom} à l'instant $${t}$`,
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
        expected: ["marginal", "unite suivante", "unité suivante", "supplementaire", "supplémentaire", String(marginal)],
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
        expected: [String(xOpt), String(valeur), prod.unite, "euros", "€"],
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
];
