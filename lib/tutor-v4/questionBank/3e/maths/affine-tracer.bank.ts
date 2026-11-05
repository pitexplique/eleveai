// REPRÉSENTER UNE FONCTION AFFINE (05/11/2026).
//
// Trou du programme de cycle 4 (BO 2020, p. 134) : « représenter graphiquement une
// fonction linéaire, une fonction affine ». `affine_graphique` ne fait que LIRE une
// droite déjà tracée. Ici : calculer deux images, placer les points, reconnaître LA
// droite parmi plusieurs, dans une seule figure à droites colorées.
//
// ⛔ Règles du collège : ★1-★2 phrase courte, sans prénom ni contexte. Virgule
// décimale, jamais de barre de fraction (0,5x, pas x/2).
// ⚠️ Pour le correcteur : la fonction s'écrit toujours « f(x) = 2x − 3 » (ou g, h) ;
// un point « (2 ; 5) ». Le correcteur relit les droites DANS LA FIGURE.

import type { TutorBankItemV4, FonctionGraphiqueCanvasData, DifficultyLevel } from "@/lib/tutor-v4/types";

const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
const melange = <T,>(l: T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);

const fr = (n: number) => String(Math.round(n * 1000) / 1000).replace(".", ",").replace("-", "−");
const expl = (def: string, meth: string, calc: string, concl: string) =>
  `Définition : ${def}\n\nMéthode : ${meth}\n\nCalcul : ${calc}\n\nConclusion : ${concl}`;
function qcm(juste: string, faux: string[]) {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}

/** « 2x − 3 », « −x + 1 », « 0,5x », « 3 ». */
function expr(a: number, b: number): string {
  const ax = a === 1 ? "x" : a === -1 ? "−x" : `${fr(a)}x`;
  if (a === 0) return fr(b);
  if (b === 0) return ax;
  return b > 0 ? `${ax} + ${fr(b)}` : `${ax} − ${fr(-b)}`;
}
const NOM = () => un(["f", "f", "g", "h"] as const);
const pt = (x: number, y: number) => `(${fr(x)} ; ${fr(y)})`;

const DEF_DROITE = "la représentation graphique de f(x) = ax + b est une droite ; elle coupe l’axe vertical au point (0 ; b).";
const DEF_IMAGE = "un point (x ; y) est sur la droite de f si y = f(x).";

/* ───────────────────────── les droites colorées ───────────────────────── */

const COULEURS = [
  { nom: "rouge", hex: "#dc2626" },
  { nom: "bleue", hex: "#2563eb" },
  { nom: "verte", hex: "#16a34a" },
] as const;

type Droite = { a: number; b: number };
const FEN = { xmin: -5, xmax: 5, ymin: -6, ymax: 6 };

/** Une droite se lit si deux nœuds du quadrillage sont visibles dans la fenêtre. */
function lisible(d: Droite, f: { xmin: number; xmax: number; ymin: number; ymax: number } = FEN) {
  let n = 0;
  for (let x = f.xmin; x <= f.xmax; x++) {
    const y = d.a * x + d.b;
    if (Number.isInteger(y) && y >= f.ymin && y <= f.ymax) n++;
  }
  return n >= 2;
}

/** Deux leurres qui ressemblent à la bonne droite : signe de a, signe de b, a et b échangés. */
function leurres(d: Droite, f = FEN): Droite[] {
  const cands: Droite[] = [
    { a: -d.a, b: d.b },
    { a: d.a, b: -d.b },
    { a: d.b, b: d.a },
    { a: d.a + 1, b: d.b },
    { a: d.a, b: d.b + 2 },
    { a: d.a, b: d.b - 2 },
    { a: -d.a, b: -d.b },
  ].filter((c) => c.a !== 0 && !(c.a === d.a && c.b === d.b) && lisible(c, f));
  const uniques = cands.filter((c, i) => cands.findIndex((e) => e.a === c.a && e.b === c.b) === i);
  return melange(uniques).slice(0, 2);
}

/** La figure à trois droites : les couleurs sont mélangées, la bonne n'est jamais à la même place. */
function figureCouleurs(d: Droite, f = FEN) {
  const autres = leurres(d, f);
  const cs = melange([...COULEURS]);
  const droites = melange([d, ...autres]);
  const figure: FonctionGraphiqueCanvasData = {
    kind: "fonctionGraphique",
    size: { width: 320, height: 320 },
    ...f,
    grille: true,
    courbes: droites.map((x, i) => ({ id: `d${i}`, type: "affine" as const, a: x.a, b: x.b, couleur: cs[i].hex })),
  };
  const i = droites.indexOf(d);
  const juste = `la droite ${cs[i].nom}`;
  return { figure, juste, choix: melange(droites.map((_, k) => `la droite ${cs[k].nom}`)) };
}

/** Une droite seule : pour lire son expression. */
const figureUne = (d: Droite, f = FEN): FonctionGraphiqueCanvasData => ({
  kind: "fonctionGraphique",
  size: { width: 320, height: 320 },
  ...f,
  grille: true,
  courbes: [{ id: "d", type: "affine", a: d.a, b: d.b, couleur: "#2563eb" }],
});

/** Tire a et b entiers, et une droite qui se lit. */
function tirer(aMax = 3, bMax = 4, sansB = false): Droite {
  for (;;) {
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, aMax);
    const b = sansB ? 0 : (Math.random() < 0.5 ? 1 : -1) * entre(1, bMax);
    if (lisible({ a, b }) && leurres({ a, b }).length === 2) return { a, b };
  }
}

const tpl = (n: number, difficulty: DifficultyLevel, hint: string, generate: () => any): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `3e_affine_tracer_tpl_${n}`,
    niveau: "3e",
    matiere: "maths",
    notionId: "affine_fonction",
    microId: "affine_tracer",
    difficulty,
    theme: "neutral",
    hint,
    tags: ["affine", "tracer", "template"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── contextes (★3 et plus) ───────────────────────── */

type Ctx = { texte: (a: number, b: number) => string; a: [number, number]; b: [number, number]; desc?: boolean };
const SITUATIONS: Ctx[] = [
  { a: [1, 3], b: [1, 4], texte: (a, b) => `Un taxi coûte ${b} € au départ, puis ${a} € par kilomètre.` },
  { a: [1, 3], b: [1, 5], texte: (a, b) => `Louer un vélo coûte ${b} € d’assurance, puis ${a} € par heure.` },
  { a: [2, 3], b: [1, 4], texte: (a, b) => `Une piscine demande ${b} € à l’inscription, puis ${a} € par séance.` },
  { a: [1, 2], b: [2, 6], texte: (a, b) => `Une cuve contient ${b} L. Un robinet y ajoute ${a} L par minute.` },
  { a: [1, 2], b: [1, 5], texte: (a, b) => `Une plante mesure ${b} cm. Elle grandit de ${a} cm par semaine.` },
  { a: [1, 3], b: [2, 6], texte: (a, b) => `Une tirelire contient ${b} €. On y met ${a} € par mois.` },
  { a: [1, 3], b: [1, 4], texte: (a, b) => `Un jeu en ligne donne ${b} points au départ, puis ${a} point${a > 1 ? "s" : ""} par niveau réussi.` },
  { a: [1, 2], b: [2, 5], texte: (a, b) => `La neige atteint ${b} cm. Il en tombe ${a} cm par heure.` },
  { a: [1, 2], b: [8, 12], desc: true, texte: (a, b) => `Une bougie mesure ${b} cm. Elle perd ${a} cm par heure.` },
  { a: [1, 2], b: [8, 12], desc: true, texte: (a, b) => `Un évier contient ${b} L d’eau. Il se vide de ${a} L par minute.` },
  { a: [1, 3], b: [9, 12], desc: true, texte: (a, b) => `Une carte de cantine contient ${b} €. Chaque jour, on retire ${a} €.` },
  { a: [1, 2], b: [8, 12], desc: true, texte: (a, b) => `Un plongeur est à ${b} m de la surface. Il remonte de ${a} m par seconde.` },
];

/* ───────────────────────── les gabarits ───────────────────────── */

export const affineTracerBank: TutorBankItemV4[] = [
  // ★1 : calculer l'image pour placer un point.
  tpl(1, 1, "Remplace x par le nombre donné.", () => {
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, 5);
    const b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const x = un([0, 1, 2, 3, -1, -2]);
    const y = a * x + b;
    const text = un([
      `Pour tracer ${f}(x) = ${expr(a, b)}, calcule ${f}(${fr(x)}).`,
      `Soit ${f}(x) = ${expr(a, b)}. Calcule l’image de ${fr(x)}.`,
      `${f}(x) = ${expr(a, b)}. Le point d’abscisse ${fr(x)} a quelle ordonnée ?`,
      `Droite de ${f}(x) = ${expr(a, b)} : quelle ordonnée pour x = ${fr(x)} ?`,
      `${f}(x) = ${expr(a, b)}. Quelle est l’ordonnée pour x = ${fr(x)} ?`,
      `Droite de ${f}(x) = ${expr(a, b)} : pour x = ${fr(x)}, que vaut y ?`,
    ]);
    return {
      text,
      format: "short",
      expected: [fr(y), ...(y < 0 ? [String(y)] : [])],
      comparator: "exact_text",
      explanation: expl(DEF_IMAGE, `on remplace x par ${fr(x)}.`, `${fr(a)} × ${x < 0 ? `(${fr(x)})` : fr(x)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${fr(y)}.`, `le point a pour ordonnée ${fr(y)}.`),
    };
  }),

  // ★1 : quel point est sur la droite.
  tpl(2, 1, "Le point d’abscisse 0 a pour ordonnée le nombre b.", () => {
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(2, 5);
    let b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    while (Math.abs(b) === Math.abs(a)) b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const juste = pt(0, b);
    const text = un([
      `Quel point est sur la droite de ${f}(x) = ${expr(a, b)} ?`,
      `La droite de ${f}(x) = ${expr(a, b)} passe par quel point ?`,
      `Par quel point passe la droite de ${f}(x) = ${expr(a, b)} ?`,
      `Quel point de l’axe vertical est sur la droite de ${f}(x) = ${expr(a, b)} ?`,
      `Choisis un point de la droite de ${f}(x) = ${expr(a, b)}.`,
      `Où la droite de ${f}(x) = ${expr(a, b)} coupe-t-elle l’axe vertical ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, ([[b, 0], [0, a], [a, 0], [0, -b], [1, a + b + 1], [0, b + 1]] as const).filter(([x, y]) => a * x + b !== y).map(([x, y]) => pt(x, y))),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_DROITE, "on calcule l’image de 0.", `${f}(0) = ${fr(a)} × 0 ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${fr(b)}.`, `la droite passe par ${juste}.`),
    };
  }),

  // ★1 : la droite d'une fonction linéaire, dans la figure.
  tpl(3, 1, "Une fonction linéaire passe par l’origine. Regarde le point d’abscisse 1.", () => {
    const f = NOM();
    const d: Droite = { a: (Math.random() < 0.5 ? 1 : -1) * entre(1, 4), b: 0 };
    const autres = melange([
      { a: -d.a, b: 0 },
      { a: d.a, b: un([2, -2]) },
      { a: d.a > 0 ? d.a + 1 : d.a - 1, b: 0 },
    ]).slice(0, 2);
    const cs = melange([...COULEURS]);
    const droites = melange([d, ...autres]);
    const figure: FonctionGraphiqueCanvasData = {
      kind: "fonctionGraphique",
      size: { width: 320, height: 320 },
      ...FEN,
      grille: true,
      courbes: droites.map((x, i) => ({ id: `d${i}`, type: x.b === 0 ? ("lineaire" as const) : ("affine" as const), a: x.a, b: x.b, couleur: cs[i].hex })),
    };
    const juste = `la droite ${cs[droites.indexOf(d)].nom}`;
    const text = un([
      `Quelle droite représente ${f}(x) = ${expr(d.a, 0)} ?`,
      `Laquelle de ces droites représente ${f}(x) = ${expr(d.a, 0)} ?`,
      `Regarde la figure. Quelle droite est celle de ${f}(x) = ${expr(d.a, 0)} ?`,
      `Trouve la droite de ${f}(x) = ${expr(d.a, 0)}.`,
      `Sur cette figure, où est la droite de ${f}(x) = ${expr(d.a, 0)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange(droites.map((_, k) => `la droite ${cs[k].nom}`)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure,
      explanation: expl("la droite d’une fonction linéaire f(x) = ax passe par l’origine et par le point (1 ; a).", "on cherche la droite qui passe par (0 ; 0) et par (1 ; a).", `${f}(1) = ${fr(d.a)} : le point (1 ; ${fr(d.a)}) est sur la droite.`, `c’est ${juste}.`),
    };
  }),

  // ★1 : l'allure.
  tpl(4, 1, "Le coefficient a dit si la droite monte ou descend.", () => {
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, 6);
    const b = entre(-9, 9);
    const MONTE = "Elle monte.";
    const DESC = "Elle descend.";
    const juste = a > 0 ? MONTE : DESC;
    const text = un([
      `La droite de ${f}(x) = ${expr(a, b)} monte-t-elle ou descend-elle ?`,
      `De gauche à droite, que fait la droite de ${f}(x) = ${expr(a, b)} ?`,
      `Que fait la droite de ${f}(x) = ${expr(a, b)} quand x augmente ?`,
      `${f}(x) = ${expr(a, b)}. Sa droite monte ou descend ?`,
      `Quelle est l’allure de la droite de ${f}(x) = ${expr(a, b)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: melange([MONTE, DESC, "Elle est horizontale.", "Elle est verticale."]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("si a > 0, la droite monte ; si a < 0, elle descend ; si a = 0, elle est horizontale.", "on lit le coefficient a, devant x.", `a = ${fr(a)}.`, juste),
    };
  }),

  // ★2 : la droite d'une fonction affine, dans la figure.
  tpl(5, 2, "Commence par le point (0 ; b), puis vérifie un deuxième point.", () => {
    const f = NOM();
    const d = tirer();
    const { figure, juste, choix } = figureCouleurs(d);
    const text = un([
      `Quelle droite représente ${f}(x) = ${expr(d.a, d.b)} ?`,
      `Laquelle de ces droites représente ${f}(x) = ${expr(d.a, d.b)} ?`,
      `Regarde la figure. Quelle droite est celle de ${f}(x) = ${expr(d.a, d.b)} ?`,
      `Trouve la droite de ${f}(x) = ${expr(d.a, d.b)}.`,
      `Sur cette figure, où est la droite de ${f}(x) = ${expr(d.a, d.b)} ?`,
      `Calcule ${f}(0) et ${f}(1). Quelle droite représente ${f}(x) = ${expr(d.a, d.b)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: choix,
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure,
      explanation: expl(DEF_DROITE, "on calcule deux images, puis on cherche la droite qui passe par les deux points.", `${f}(0) = ${fr(d.b)} et ${f}(1) = ${fr(d.a + d.b)} : les points (0 ; ${fr(d.b)}) et (1 ; ${fr(d.a + d.b)}).`, `c’est ${juste}.`),
    };
  }),

  // ★2 : deux points pour tracer.
  tpl(6, 2, "Calcule l’image de chaque abscisse.", () => {
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, 5);
    const b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const x2 = entre(1, 4);
    const y2 = a * x2 + b;
    const juste = `${pt(0, b)} et ${pt(x2, y2)}`;
    const text = un([
      `Quels points placer pour tracer ${f}(x) = ${expr(a, b)} ?`,
      `Quels sont deux points de la droite de ${f}(x) = ${expr(a, b)} ?`,
      `Pour tracer ${f}(x) = ${expr(a, b)}, quels points choisir ?`,
      `La droite de ${f}(x) = ${expr(a, b)} passe par quels points ?`,
      `Choisis deux points pour tracer la droite de ${f}(x) = ${expr(a, b)}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, ([[[b, 0], [x2, y2]], [[0, b], [y2, x2]], [[0, a], [x2, a * x2]], [[0, b], [x2, y2 + 1]], [[0, -b], [x2, y2]]] as number[][][]).filter((c) => c.some(([x, y]) => a * x + y * 0 + b !== y)).map((c) => `${pt(c[0][0], c[0][1])} et ${pt(c[1][0], c[1][1])}`)),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_IMAGE, "on calcule deux images.", `${f}(0) = ${fr(b)} et ${f}(${x2}) = ${fr(y2)}.`, `on place ${juste}.`),
    };
  }),

  // ★2 : lire la fonction sur une droite tracée.
  tpl(7, 2, "b se lit sur l’axe vertical ; a est ce qu’on gagne quand x augmente de 1.", () => {
    const f = NOM();
    const d = tirer();
    const juste = `${f}(x) = ${expr(d.a, d.b)}`;
    const text = un([
      `Quelle fonction a pour représentation cette droite ?`,
      `Cette droite représente quelle fonction ?`,
      `Lis la figure. Quelle est la fonction tracée ?`,
      `Quelle expression correspond à la droite tracée ?`,
      `Regarde la droite. Quelle fonction est-ce ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`${f}(x) = ${expr(d.b, d.a)}`, `${f}(x) = ${expr(-d.a, d.b)}`, `${f}(x) = ${expr(d.a, -d.b)}`, `${f}(x) = ${expr(d.a + 1, d.b)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figureUne(d),
      explanation: expl(DEF_DROITE, "on lit b à l’axe vertical, puis a en avançant de 1.", `la droite passe par (0 ; ${fr(d.b)}) et (1 ; ${fr(d.a + d.b)}) : b = ${fr(d.b)} et a = ${fr(d.a)}.`, `c’est ${juste}.`),
    };
  }),

  // ★2 : un point est-il sur la droite ?
  tpl(8, 2, "Calcule l’image de l’abscisse, puis compare à l’ordonnée.", () => {
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, 5);
    const b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 9);
    const x = entre(1, 6);
    const oui = Math.random() < 0.5;
    const yv = a * x + b;
    const y = oui ? yv : yv + un([1, -1, 2, -2]);
    const p = pt(x, y);
    const text = un([
      `Le point ${p} est-il sur la droite de ${f}(x) = ${expr(a, b)} ?`,
      `La droite de ${f}(x) = ${expr(a, b)} passe-t-elle par ${p} ?`,
      `${f}(x) = ${expr(a, b)}. Le point ${p} est-il sur sa droite ?`,
      `Doit-on placer ${p} sur la droite de ${f}(x) = ${expr(a, b)} ?`,
      `Vérifie : ${p} appartient-il à la droite de ${f}(x) = ${expr(a, b)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(DEF_IMAGE, `on calcule ${f}(${x}), puis on compare à ${fr(y)}.`, `${f}(${x}) = ${fr(a)} × ${x} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${fr(yv)}.`, oui ? `${fr(yv)} = ${fr(y)} : le point est sur la droite.` : `${fr(yv)} ≠ ${fr(y)} : le point n’est pas sur la droite.`),
    };
  }),

  // ★3 : une situation, trois droites.
  tpl(9, 3, "Le nombre de départ se lit à x = 0 ; le reste dit si la droite monte ou descend.", () => {
    const S = un(SITUATIONS);
    const a = (S.desc ? -1 : 1) * entre(S.a[0], S.a[1]);
    const b = entre(S.b[0], S.b[1]);
    const d: Droite = { a, b };
    const fen = { xmin: -1, xmax: 6, ymin: -1, ymax: 14 };
    const autres: Droite[] = [];
    for (const c of melange([{ a: -a, b }, { a: a + (a > 0 ? 1 : -1), b }, { a, b: b + 2 }, { a, b: b - 1 }, { a: b, b: a }])) {
      if (c.a !== 0 && c.b >= 0 && !(c.a === a && c.b === b) && !autres.some((e) => e.a === c.a && e.b === c.b) && lisible(c, fen)) autres.push(c);
    }
    const choisies = autres.slice(0, 2);
    const cs = melange([...COULEURS]);
    const droites = melange([d, ...choisies]);
    const figure: FonctionGraphiqueCanvasData = {
      kind: "fonctionGraphique",
      size: { width: 320, height: 320 },
      ...fen,
      grille: true,
      courbes: droites.map((x, i) => ({ id: `d${i}`, type: "affine" as const, a: x.a, b: x.b, couleur: cs[i].hex })),
    };
    const juste = `la droite ${cs[droites.indexOf(d)].nom}`;
    const text = `${S.texte(Math.abs(a), b)} ${un(["Quelle droite représente cette situation ?", "Quelle droite montre cette évolution ?", "Laquelle de ces droites convient ?"])}`;
    return {
      text,
      format: "qcm",
      choices: melange(droites.map((_, k) => `la droite ${cs[k].nom}`)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure,
      explanation: expl(DEF_DROITE, "on écrit la fonction, puis on place le point de départ et un deuxième point.", `f(x) = ${expr(a, b)} : les points (0 ; ${b}) et (1 ; ${a + b}).`, `c’est ${juste}.`),
    };
  }),

  // ★3 : un coefficient décimal.
  tpl(10, 3, "Avec 0,5 : prends un x pair, tu tombes sur un nœud du quadrillage.", () => {
    const f = NOM();
    const a = un([0.5, -0.5]);
    const b = un([-3, -2, -1, 1, 2, 3, 4]);
    const d: Droite = { a, b };
    const { figure, juste, choix } = figureCouleurs(d);
    const text = un([
      `Quelle droite représente ${f}(x) = ${expr(a, b)} ?`,
      `Laquelle de ces droites représente ${f}(x) = ${expr(a, b)} ?`,
      `Calcule ${f}(0) et ${f}(2). Quelle droite représente ${f}(x) = ${expr(a, b)} ?`,
      `Trouve la droite de ${f}(x) = ${expr(a, b)}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: choix,
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure,
      explanation: expl(DEF_DROITE, "on prend x = 0 et x = 2, pour tomber sur des nœuds du quadrillage.", `${f}(0) = ${fr(b)} et ${f}(2) = ${fr(2 * a + b)}.`, `c’est ${juste}.`),
    };
  }),

  // ★3 : le deuxième point, à partir du premier.
  tpl(11, 3, "En avançant de 1 vers la droite, on monte de a (ou on descend si a est négatif).", () => {
    const P = un(["Inès", "Noah", "Maëlle", "Yanis", "Chloé", "Sacha", "Lina", "Tom"]);
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, 5);
    const b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 7);
    const k = entre(1, 3);
    const juste = pt(k, b + k * a);
    const debut = un([
      `${P} trace ${f}(x) = ${expr(a, b)}. Le premier point est ${pt(0, b)}.`,
      `Sur son cahier, ${P} place ${pt(0, b)} pour tracer ${f}(x) = ${expr(a, b)}.`,
      `Pour tracer ${f}(x) = ${expr(a, b)}, ${P} part du point ${pt(0, b)}.`,
    ]);
    const fin = un([`Quel point d’abscisse ${k} doit-on placer ensuite ?`, `Quel point d’abscisse ${k} convient ensuite ?`, `Où est le point d’abscisse ${k} ?`]);
    return {
      text: `${debut} ${fin}`,
      format: "qcm",
      choices: qcm(juste, [pt(k, b + k), pt(k, a + k), pt(k, b - k * a), pt(k, k * a), pt(b + k * a, k)]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(DEF_DROITE, `quand x augmente de ${k}, y change de ${fr(a)} × ${k}.`, `${fr(b)} + ${fr(a)} × ${k} = ${fr(b + k * a)}.`, `le point est ${juste}.`),
    };
  }),

  // ★4 : droites parallèles.
  tpl(12, 4, "Deux droites de même coefficient a sont parallèles.", () => {
    const d = tirer();
    const { a, b } = d;
    const b2 = b + un([-3, -2, 2, 3]);
    const juste = `g(x) = ${expr(a, b2)}`;
    const text = un([
      `Quelle fonction a une droite parallèle à celle de f(x) = ${expr(a, b)} ?`,
      `Laquelle de ces fonctions a une droite parallèle à celle de f(x) = ${expr(a, b)} ?`,
      `On trace f(x) = ${expr(a, b)}. Quelle fonction donne une droite parallèle ?`,
      `Choisis la fonction dont la droite est parallèle à celle de f(x) = ${expr(a, b)}.`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`g(x) = ${expr(-a, b)}`, `g(x) = ${expr(a + 1, b)}`, `g(x) = ${expr(a + 2, b2)}`, `g(x) = ${expr(a === 1 || a === -1 ? 2 * a : 1, b2)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("deux droites qui ont le même coefficient a sont parallèles.", "on cherche le même coefficient devant x.", `le coefficient de f est ${fr(a)}.`, `c’est ${juste}.`),
    };
  }),

  // ★4 : le point d'intersection de deux droites.
  tpl(13, 4, "Au point commun, les deux fonctions ont la même image.", () => {
    let a1 = 0, a2 = 0, x0 = 0, y0 = 0, b1 = 0, b2 = 0;
    for (;;) {
      a1 = (Math.random() < 0.5 ? 1 : -1) * entre(1, 3);
      a2 = (Math.random() < 0.5 ? 1 : -1) * entre(1, 3);
      x0 = entre(-3, 3);
      y0 = entre(-4, 4);
      b1 = y0 - a1 * x0;
      b2 = y0 - a2 * x0;
      if (a1 !== a2 && b1 !== 0 && b2 !== 0 && lisible({ a: a1, b: b1 }) && lisible({ a: a2, b: b2 }) && x0 !== 0 && x0 !== y0) break;
    }
    const cs = melange([...COULEURS]).slice(0, 2);
    const figure: FonctionGraphiqueCanvasData = {
      kind: "fonctionGraphique",
      size: { width: 320, height: 320 },
      ...FEN,
      grille: true,
      courbes: [
        { id: "f", type: "affine", a: a1, b: b1, couleur: cs[0].hex },
        { id: "g", type: "affine", a: a2, b: b2, couleur: cs[1].hex },
      ],
    };
    const juste = pt(x0, y0);
    const text = un([
      `Voici f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)}. En quel point leurs droites se coupent-elles ?`,
      `Les droites de f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)} se coupent. Quel est le point commun ?`,
      `On trace f(x) = ${expr(a1, b1)} et g(x) = ${expr(a2, b2)}. Lis leur point commun.`,
      `Quel point appartient aux droites de f(x) = ${expr(a1, b1)} et de g(x) = ${expr(a2, b2)} ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [pt(y0, x0), pt(-x0, y0), pt(x0, -y0), pt(x0 + 1, y0)].filter((c) => c !== juste)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure,
      explanation: expl("le point commun à deux droites vérifie les deux fonctions.", `on remplace x par ${fr(x0)} dans f et dans g.`, `f(${fr(x0)}) = ${fr(y0)} et g(${fr(x0)}) = ${fr(y0)}.`, `les droites se coupent en ${juste}.`),
    };
  }),

  // ★4 : la droite qui passe par deux points.
  tpl(14, 4, "a = (écart des ordonnées) ÷ (écart des abscisses), puis b se lit en x = 0.", () => {
    const f = NOM();
    const a = (Math.random() < 0.5 ? 1 : -1) * entre(1, 4);
    const b = (Math.random() < 0.5 ? 1 : -1) * entre(1, 7);
    const x1 = entre(1, 2);
    const x2 = x1 + entre(1, 3);
    const y1 = a * x1 + b;
    const y2 = a * x2 + b;
    const juste = `${f}(x) = ${expr(a, b)}`;
    const text = un([
      `Une droite passe par ${pt(x1, y1)} et ${pt(x2, y2)}. Quelle fonction représente-t-elle ?`,
      `Quelle fonction affine a une droite passant par ${pt(x1, y1)} et ${pt(x2, y2)} ?`,
      `On a placé ${pt(x1, y1)} et ${pt(x2, y2)}, puis tracé la droite. Quelle fonction est-ce ?`,
      `Les points ${pt(x1, y1)} et ${pt(x2, y2)} sont sur la droite de ${f}. Quelle est l’expression de ${f}(x) ?`,
    ]);
    return {
      text,
      format: "qcm",
      choices: qcm(juste, [`${f}(x) = ${expr(-a, b)}`, `${f}(x) = ${expr(a, -b)}`, `${f}(x) = ${expr(a + 1, b)}`, `${f}(x) = ${expr(a, b + 1)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl("pour f(x) = ax + b, a est le quotient de l’écart des ordonnées par l’écart des abscisses.", "on calcule a, puis b.", `a = (${fr(y2)} − ${y1 < 0 ? `(${fr(y1)})` : fr(y1)}) ÷ ${x2 - x1} = ${fr(a)} ; b = ${fr(y1)} − ${fr(a)} × ${x1} = ${fr(b)}.`, `c’est ${juste}.`),
    };
  }),

  // ★4 : situation : droite proportionnelle ou non.
  tpl(15, 4, "Une situation de proportionnalité est représentée par une droite qui passe par l’origine.", () => {
    const CAS = [
      { p: "Des tomates coûtent", u: "€ le kilo", x: "le prix selon la masse", a: [2, 3] },
      { p: "Une marcheuse parcourt", u: "km par heure", x: "la distance selon la durée", a: [3, 4] },
      { p: "Un robinet débite", u: "L par minute", x: "le volume selon le temps", a: [2, 3] },
      { p: "Une imprimante sort", u: "pages par minute", x: "le nombre de pages selon le temps", a: [2, 4] },
      { p: "Un cahier coûte", u: "€", x: "le prix selon le nombre de cahiers", a: [2, 3] },
      { p: "Un carré de chocolat apporte", u: "g de sucre", x: "le sucre selon le nombre de carrés", a: [2, 3] },
    ];
    const C = un(CAS);
    const a = entre(C.a[0], C.a[1]);
    const d: Droite = { a, b: 0 };
    const b1 = entre(1, 3);
    const fen = { xmin: -1, xmax: 6, ymin: -1, ymax: 14 };
    const autres = melange<Droite>([{ a, b: b1 }, { a: a === 1 ? 2 : a - 1, b: b1 + 1 }, { a: a + 1, b: 1 }]).slice(0, 2);
    const cs = melange([...COULEURS]);
    const droites = melange([d, ...autres]);
    const figure: FonctionGraphiqueCanvasData = {
      kind: "fonctionGraphique",
      size: { width: 320, height: 320 },
      ...fen,
      grille: true,
      courbes: droites.map((x, i) => ({ id: `d${i}`, type: x.b === 0 ? ("lineaire" as const) : ("affine" as const), a: x.a, b: x.b, couleur: cs[i].hex })),
    };
    const juste = `la droite ${cs[droites.indexOf(d)].nom}`;
    const text = `${C.p} ${a} ${C.u}. ${un([`Quelle droite montre ${C.x} ?`, `Laquelle de ces droites représente ${C.x} ?`, `Quelle droite convient pour ${C.x} ?`])}`;
    return {
      text,
      format: "qcm",
      choices: melange(droites.map((_, k) => `la droite ${cs[k].nom}`)),
      expected: [juste],
      comparator: "mcq_exact",
      canvas: figure,
      explanation: expl("une situation de proportionnalité est représentée par une droite qui passe par l’origine.", `on cherche la droite qui passe par (0 ; 0) et (1 ; ${a}).`, `f(x) = ${a}x, donc f(1) = ${a}.`, `c’est ${juste}.`),
    };
  }),
];
