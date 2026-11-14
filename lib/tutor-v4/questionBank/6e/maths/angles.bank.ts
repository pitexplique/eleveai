import type { TutorBankItemV4, TutorGeneratedQuestionV4, AngleCanvasData, DroitesCanvasData } from "@/lib/tutor-v4/types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import { PRENOMS, de, type Prenom } from "./entiers.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Des noms de points variés : l'angle n'est pas toujours AOB. Pas de O (pris
// pour le zéro) ni de Q (trop proche du O à l'écran).
const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function lettres(k: number): string[] {
  return shuffle(LETTRES).slice(0, k);
}

type NatureAngle = "nul" | "aigu" | "droit" | "obtus" | "plat" | "plein";

function natureAngle(v: number): NatureAngle {
  if (v === 0) return "nul";
  if (v < 90) return "aigu";
  if (v === 90) return "droit";
  if (v < 180) return "obtus";
  if (v === 180) return "plat";
  return "plein";
}

/**
 * Plusieurs demi-droites de même origine, chacune à sa direction (en degrés,
 * sens inverse des aiguilles d'une montre, 0 vers la droite). Le canvas
 * `angle` ne sait dessiner qu'un angle ; `droites` en pose plusieurs au même
 * sommet — angles adjacents, supplémentaires, opposés par le sommet.
 */
function figureRayons(sommet: string, rayons: Array<{ nom: string; deg: number }>): DroitesCanvasData {
  const O = { x: 170, y: 130 };
  const L = 105;
  const rad = (d: number) => (d * Math.PI) / 180;
  const bout = (d: number) => ({
    x: Math.round(O.x + L * Math.cos(rad(d))),
    y: Math.round(O.y - L * Math.sin(rad(d))),
  });
  return {
    kind: "droites",
    size: { width: 340, height: 260 },
    lines: rayons.map((r) => ({ id: `${sommet}${r.nom}`, type: "demi_droite" as const, from: O, to: bout(r.deg) })),
    points: [
      { x: O.x, y: O.y, label: sommet, highlight: true },
      ...rayons.map((r) => ({ ...bout(r.deg), label: r.nom })),
    ],
    display: { showLabels: true, showPoints: true },
  };
}

/** Un angle posé sur son rapporteur, sans la mesure écrite : c'est à l'élève de la lire. */
function angleAuRapporteur(
  deg: number,
  noms: { sommet: string; gauche: string; droite: string },
  echelle: "simple" | "double" = "simple",
): AngleCanvasData {
  return {
    kind: "angle",
    size: { width: 320, height: 240 },
    angle: {
      angleDeg: deg,
      labels: { vertex: noms.sommet, left: noms.gauche, right: noms.droite },
      display: { showLabels: true, showMeasure: false, showArc: true, showProtractor: true, protractorScale: echelle },
    },
  };
}

function expl(calcul: string) {
  return (
    "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
    "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// =========================
// ⭐ 06/10/2026 — SITUATIONS × TOURNURES × PRÉNOMS × NOMS DE POINTS
// (PASSATION-COACH-MATHS-6E-CONSIGNE.md). Mesuré le 06/10 : 8 à 15 squelettes
// par micro, 12 à 18 répétitions sur 20. Les élèves reconnaissent la PHRASE.
// Chaque gabarit compose maintenant un objet réel où l'on voit un angle, des
// noms de points tirés au sort, un prénom et une tournure. Les correcteurs
// (correcteurs/angles.ts) relisent la mesure, les noms des points ET le canvas.
// =========================

/** Un objet de la vie courante où l'on voit un angle, et les mesures plausibles. */
type ObjetAngle = { phrase: (p: Prenom) => string; cotes: string; min: number; max: number };
const OBJETS_ANGLE: ObjetAngle[] = [
  { phrase: (p) => `${p.nom} ouvre son compas.`, cotes: "les deux branches du compas", min: 10, max: 120 },
  { phrase: (p) => `${p.nom} ouvre une paire de ciseaux.`, cotes: "les deux lames des ciseaux", min: 10, max: 80 },
  { phrase: (p) => `${p.nom} coupe une part de pizza.`, cotes: "les deux bords de la part", min: 20, max: 90 },
  { phrase: (p) => `${p.nom} déplie un éventail.`, cotes: "les deux bords de l’éventail", min: 60, max: 180 },
  { phrase: (p) => `${p.nom} ouvre la porte de sa chambre.`, cotes: "le mur et la porte", min: 10, max: 120 },
  { phrase: (p) => `${p.nom} grimpe en haut du toboggan.`, cotes: "la pente du toboggan et le sol", min: 20, max: 60 },
  { phrase: (p) => `${p.nom} ouvre son ordinateur portable.`, cotes: "l’écran et le clavier", min: 90, max: 140 },
  { phrase: (p) => `${p.nom} ouvre un livre sur la table.`, cotes: "les deux moitiés du livre", min: 30, max: 180 },
  { phrase: (p) => `${p.nom} règle le dossier d’une chaise longue.`, cotes: "le dossier et l’assise", min: 100, max: 170 },
  { phrase: (p) => `${p.nom} pose une échelle contre le mur du jardin.`, cotes: "l’échelle et le sol", min: 60, max: 80 },
  { phrase: (p) => `${p.nom} écarte les bras pour danser.`, cotes: "ses deux bras", min: 30, max: 180 },
  { phrase: (p) => `${p.nom} photographie un oiseau en vol.`, cotes: "les deux ailes de l’oiseau", min: 60, max: 170 },
  { phrase: (p) => `${p.nom} monte sur une rampe de skate.`, cotes: "la rampe et le sol", min: 10, max: 45 },
  { phrase: (p) => `${p.nom} joue avec une grue.`, cotes: "le bras de la grue et le sol", min: 10, max: 80 },
  { phrase: (p) => `${p.nom} regarde l’horloge de la cuisine.`, cotes: "les deux aiguilles de l’horloge", min: 0, max: 180 },
  { phrase: (p) => `${p.nom} arrive à vélo à un carrefour.`, cotes: "les deux routes", min: 30, max: 150 },
];
/** Un objet où la mesure `v` est plausible. */
function objetPour(v: number): ObjetAngle {
  return pick(OBJETS_ANGLE.filter((o) => o.min <= v && v <= o.max));
}
/** « il » ou « elle ». */
const il = (p: Prenom) => (p.f ? "elle" : "il");
/** Un angle nommé : trois lettres, le sommet au milieu. */
type NomAngle = { g: string; s: string; d: string; nom: string };
function nomAngle(): NomAngle {
  const [g, s, d] = lettres(3);
  return { g, s, d, nom: `${g}${s}${d}` };
}
/** Un angle dessiné (sans rapporteur), nommé comme dans l'énoncé. */
function figureAngle(deg: number, n: NomAngle, opts: { mesure?: boolean; droit?: boolean } = {}): AngleCanvasData {
  return {
    kind: "angle",
    size: { width: 320, height: 240 },
    angle: {
      angleDeg: deg,
      labels: { vertex: n.s, left: n.g, right: n.d },
      display: { showLabels: true, showMeasure: !!opts.mesure, showArc: !opts.droit, showRightAngle: !!opts.droit },
    },
  };
}
// ⭐ 14/11/2026 — PLUS DE FIGURES : les 6e lisent difficilement, la figure porte
// la donnée. Elle ne donne JAMAIS la réponse : la mesure cherchée ne s'écrit pas
// (« ? » ou rien), pas de petit carré quand on demande si l'angle est droit.
/** Ce que les gabarits d'angles peuvent dessiner. */
type FigAngle = AngleCanvasData | DroitesCanvasData | ConstructionCanvasData;
/**
 * L'angle dont parle l'énoncé, dessiné À sa mesure. Nommé si le texte le nomme,
 * sans aucune lettre sinon. `mesure` : « ecrite » (l'énoncé la donne), « ? »
 * (c'est elle qu'on cherche), « rien » (on demande la NATURE ou si l'angle est
 * droit : ni mesure ni petit carré ne la soufflent). `droit` : le petit carré,
 * seulement quand l'énoncé DIT que l'angle est droit.
 */
function figureMesure(deg: number, n: NomAngle | null, texte: string, opts: { mesure?: "ecrite" | "?" | "rien"; droit?: boolean } = {}): AngleCanvasData {
  const nomme = !!n && texte.includes(n.nom);
  const mesure = opts.mesure ?? "ecrite";
  const montre = mesure === "ecrite";
  return {
    kind: "angle",
    size: { width: 320, height: 240 },
    angle: {
      angleDeg: deg,
      labels: n && nomme ? { vertex: n.s, left: n.g, right: n.d } : { vertex: "", left: "", right: "" },
      display: {
        showLabels: nomme,
        showMeasure: montre && !opts.droit,
        showArc: !opts.droit,
        showRightAngle: !!opts.droit,
        ...(mesure === "?" ? { placeholder: "?" } : {}),
      },
    },
  };
}
/** Des demi-droites de même origine, SANS lettre (l'énoncé n'en nomme aucune). */
function rayonsSansNom(degs: number[]): DroitesCanvasData {
  const f = figureRayons("", degs.map((deg, k) => ({ nom: `_${k}`, deg })));
  return { ...f, points: (f.points ?? []).map((pt) => ({ ...pt, label: "" })), display: { showLabels: false, showPoints: true } };
}
/**
 * Deux angles côte à côte, chacun avec ce que l'énoncé en dit (`textes` : sa
 * mesure, ou « ? » pour celle qu'on cherche ; rien sinon). `longs` : la longueur
 * des côtés de chacun — le piège « longs côtés = grand angle » se voit. Canvas
 * `construction` (le canvas `angle` n'en dessine qu'un).
 */
function deuxAngles(a: number, b: number, o: { textes?: [string, string]; longs?: [number, number] } = {}): ConstructionCanvasData {
  const rad = (d: number) => (d * Math.PI) / 180;
  const [L1, L2] = o.longs ?? [4, 4];
  const x2 = L1 + 1.6 + L2 * Math.max(0, -Math.cos(rad(b)));
  const r = (x: number) => Math.round(x * 1000) / 1000;
  return {
    kind: "construction",
    points: [
      { id: "S1", x: 0, y: 0, cache: true },
      { id: "D1", x: L1, y: 0, cache: true },
      { id: "G1", x: r(L1 * Math.cos(rad(a))), y: r(L1 * Math.sin(rad(a))), cache: true },
      { id: "S2", x: r(x2), y: 0, cache: true },
      { id: "D2", x: r(x2 + L2), y: 0, cache: true },
      { id: "G2", x: r(x2 + L2 * Math.cos(rad(b))), y: r(L2 * Math.sin(rad(b))), cache: true },
    ],
    segments: [{ a: "S1", b: "D1" }, { a: "S1", b: "G1" }, { a: "S2", b: "D2" }, { a: "S2", b: "G2" }],
    angles: [
      { sommet: "S1", de: "D1", vers: "G1", ...(o.textes?.[0] ? { texte: o.textes[0] } : {}) },
      { sommet: "S2", de: "D2", vers: "G2", ...(o.textes?.[1] ? { texte: o.textes[1] } : {}) },
    ],
    description: "Deux angles",
  };
}

/**
 * Le même angle que `figureMesure`, tracé par le canvas `construction`. ⚠️ Pour
 * les gabarits où l'énoncé porte TOUTE la donnée (une mesure, une nature) : les
 * correcteurs lisent un canvas `angle` comme « la réponse se lit sur la figure »
 * (estimation à l'œil, rapporteur) ; ici la figure ILLUSTRE, elle n'est pas la
 * donnée. Un angle plat se trace sans arc (le « petit angle » y est ambigu).
 */
function angleTrace(deg: number, n: NomAngle | null, texte: string, o: { mesure?: "ecrite" | "?" | "rien"; droit?: boolean } = {}): ConstructionCanvasData {
  const nomme = !!n && texte.includes(n.nom);
  const rad = (deg * Math.PI) / 180;
  const r = (x: number) => Math.round(x * 1000) / 1000;
  const mesure = o.mesure ?? "ecrite";
  const ecrit = o.droit ? undefined : mesure === "ecrite" ? `${deg}°` : mesure === "?" ? "?" : undefined;
  const nom = (l: string) => (n && nomme ? { nom: l } : { cache: true });
  return {
    kind: "construction",
    points: [
      { id: "S", x: 0, y: 0, ...nom(n?.s ?? "") },
      { id: "D", x: 4, y: 0, ...nom(n?.d ?? "") },
      { id: "G", x: r(4 * Math.cos(rad)), y: r(4 * Math.sin(rad)), ...nom(n?.g ?? "") },
    ],
    segments: [{ a: "S", b: "D" }, { a: "S", b: "G" }],
    angles: deg >= 180 ? [] : [{ sommet: "S", de: "D", vers: "G", ...(o.droit ? { droit: true } : {}), ...(ecrit ? { texte: ecrit } : {}) }],
    description: "Un angle",
  };
}
/** Des demi-droites de même origine, sans lettre, par le canvas `construction` (même raison que `angleTrace`). */
function rayonsTrace(degs: number[]): ConstructionCanvasData {
  const r = (x: number) => Math.round(x * 1000) / 1000;
  return {
    kind: "construction",
    points: [{ id: "O", x: 0, y: 0, nom: "" }, ...degs.map((d, k) => ({ id: `R${k}`, x: r(4 * Math.cos((d * Math.PI) / 180)), y: r(4 * Math.sin((d * Math.PI) / 180)), cache: true }))],
    segments: degs.map((_, k) => ({ a: "O", b: `R${k}` })),
    description: "Des demi-droites de même origine",
  };
}
/** Deux droites perpendiculaires, nommées par l'énoncé (« (AB) et (CD) ») ou sans nom ; pas de petit carré. */
function perpendiculairesTrace(noms?: [string, string, string, string]): ConstructionCanvasData {
  const r = (x: number) => Math.round(x * 1000) / 1000;
  const c = Math.cos(Math.PI / 9), sn = Math.sin(Math.PI / 9);
  const pts = [{ x: 3 * c, y: 3 * sn }, { x: -3 * c, y: -3 * sn }, { x: -3 * sn, y: 3 * c }, { x: 3 * sn, y: -3 * c }];
  return {
    kind: "construction",
    points: [
      { id: "O", x: 0, y: 0, cache: true },
      ...pts.map((pt, k) => ({ id: `P${k}`, x: r(pt.x), y: r(pt.y), ...(noms ? { nom: noms[k] } : { cache: true }) })),
    ],
    droites: [{ a: "P0", b: "P1" }, { a: "P2", b: "P3" }],
    description: "Deux droites perpendiculaires",
  };
}

/** Une mesure multiple de 5 entre a et b, différente de celles de `sauf`. */
function mesure5(a: number, b: number, sauf: number[] = []): number {
  const v = 5 * randomInt(Math.ceil(a / 5), Math.floor(b / 5));
  return sauf.includes(v) ? mesure5(a, b, sauf) : v;
}
function deuxPrenoms(): [Prenom, Prenom] {
  const p = pick(PRENOMS);
  let q = pick(PRENOMS);
  while (q.nom === p.nom) q = pick(PRENOMS);
  return [p, q];
}
/** Des objets qu'on ouvre plus ou moins : « Inès ouvre son compas à 40°. » */
const OUVRABLES = [
  { son: "son compas", sien: "le sien", min: 20, max: 120 },
  { son: "ses ciseaux", sien: "les siens", min: 10, max: 80 },
  { son: "son éventail", sien: "le sien", min: 60, max: 170 },
  { son: "son livre", sien: "le sien", min: 30, max: 170 },
  { son: "son ordinateur portable", sien: "le sien", min: 90, max: 140 },
  { son: "la porte de sa chambre", sien: "la sienne", min: 20, max: 120 },
];

// ⭐ 03/11/2026 (REGLES-6E.md) : à ★1-★2, des énoncés NUS — pas de prénom,
// pas d'objet, ★1 ≤ 12 mots, ★2 ≤ 15 mots. Les situations (compas, ciseaux,
// porte, prénoms…) ne sont pas jetées : elles passent dans les gabarits
// « _ctx3 » (★3), avec les mêmes correcteurs.

/** Comparer DEUX angles : la réponse est la mesure du plus grand ou du plus petit. */
function comparerDeux(plusGrand: boolean, ctx = false) {
  const [p, q] = deuxPrenoms();
  const cas = ctx ? randomInt(0, 2) : 3;
  const obj = pick(OUVRABLES);
  const [lo, hi] = cas === 2 ? [obj.min, obj.max] : [20, 170];
  const a = 10 * randomInt(Math.ceil(lo / 10), Math.floor(hi / 10));
  let b = a;
  while (Math.abs(b - a) < 20) b = 10 * randomInt(Math.ceil(lo / 10), Math.floor(hi / 10));
  const r = plusGrand ? Math.max(a, b) : Math.min(a, b);
  const mot = plusGrand ? "grand" : "petit";
  const [n1, n2] = [nomAngle(), nomAngle()];
  let text: string;
  if (cas === 0)
    text = pick([
      `${p.nom} mesure l’angle ${n1.nom} : ${a}°, puis l’angle ${n2.nom} : ${b}°. Quel angle est le plus ${mot} ? Donne sa mesure.`,
      `${p.nom} compare un angle de ${a}° et un angle de ${b}°. Quelle est la mesure du plus ${mot} ?`,
    ]);
  else if (cas === 1)
    text = pick([
      `${p.nom} trace un angle de ${a}°. ${q.nom} trace un angle de ${b}°. Donne la mesure du plus ${mot} des deux.`,
      `${p.nom} mesure ${a}° et ${q.nom} mesure ${b}°, chacun sur son angle. Quelle est la plus ${mot}e mesure ?`,
    ]);
  else if (cas === 2)
    text = `${p.nom} ouvre ${obj.son} à ${a}°. ${q.nom} ouvre ${obj.sien} à ${b}°. ${plusGrand ? "Quel est le plus grand angle d’ouverture" : "Quel est le plus petit angle d’ouverture"} ? Donne sa mesure.`;
  else
    // ★1 nu : 12 mots au plus.
    text = pick([
      `Quel angle est le plus ${mot} : ${a}° ou ${b}° ?`,
      `Deux angles mesurent ${a}° et ${b}°. Écris la mesure du plus ${mot}.`,
      `${n1.nom} = ${a}° et ${n2.nom} = ${b}°. Donne la mesure du plus ${mot}.`,
      `Écris la mesure du plus ${mot} angle : ${a}° ou ${b}°.`,
      // ⭐ 05/11/2026 : ★1 mesuré à 8,6 répétitions sur 20 → dix tournures de plus.
      `Le plus ${mot} : ${a}° ou ${b}° ?`,
      `Entre ${a}° et ${b}°, quel angle est le plus ${mot} ?`,
      `${a}° et ${b}° : lequel est le plus ${mot} ?`,
      `Compare ${a}° et ${b}°. Écris le plus ${mot}.`,
      `Regarde les mesures : ${a}° et ${b}°. Quel angle est le plus ${mot} ?`,
      `Angle 1 : ${a}°. Angle 2 : ${b}°. Écris le plus ${mot}.`,
      `Voici deux angles : ${a}° et ${b}°. Lequel est le plus ${mot} ?`,
      `Garde le plus ${mot} angle : ${a}° ou ${b}°.`,
      `Sur ces deux angles, ${a}° et ${b}°, écris le plus ${mot}.`,
      `L’angle ${n1.nom} mesure ${a}°, l’angle ${n2.nom} ${b}°. Écris le plus ${mot}.`,
    ]);
  return {
    text,
    format: "short" as const,
    expected: [`${r}°`, String(r)],
    comparator: "number_equal" as const,
    explanation: expl(
      `On compare les nombres de degrés : ${Math.min(a, b)} < ${Math.max(a, b)}. Le plus ${mot} angle mesure ${r}°. La longueur des côtés ne compte pas.`,
    ),

    canvas: deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] }),
  };
}

/** ★1 nu (05/11/2026) : le signe < ou > entre deux mesures. */
function genComparerSigne(): G {
  const a = 10 * randomInt(2, 17);
  let b = a;
  while (Math.abs(b - a) < 20) b = 10 * randomInt(2, 17);
  const s = a < b ? "<" : ">";
  return {
    text: pick([
      `Complète avec < ou > : ${a}° … ${b}°.`,
      `Choisis le bon signe : ${a}° … ${b}°.`,
      `${a}° … ${b}° : quel signe mets-tu ?`,
      `Quel signe va entre ${a}° et ${b}° ?`,
    ]),
    format: "qcm",
    choices: ["<", ">", "="],
    expected: [s],
    comparator: "mcq_exact",
    explanation: expl(`On compare les nombres de degrés : ${a} ${s} ${b}, donc ${a}° ${s} ${b}°.`),
    canvas: deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] }),
  };
}

/** ★1 nu et dessiné (05/11/2026) : deux angles au même sommet, on choisit à l'œil. */
function genComparerDessin(plusGrand: boolean): G {
  const [s, c0, c1, c2] = lettres(4);
  const v1 = 10 * randomInt(2, 17);
  let v2 = v1;
  while (Math.abs(v2 - v1) < 40) v2 = 10 * randomInt(2, 17);
  const [n1, n2] = [`${c0}${s}${c1}`, `${c0}${s}${c2}`];
  const bon = (v1 > v2) === plusGrand ? n1 : n2;
  const mot = plusGrand ? "grand" : "petit";
  return {
    text: pick([
      `Regarde la figure. Quel angle est le plus ${mot} ?`,
      `Sur la figure, quel angle est le plus ${mot} ?`,
      `Sans mesurer, choisis le plus ${mot} angle.`,
      `Observe les deux angles. Lequel est le plus ${mot} ?`,
    ]),
    format: "qcm",
    choices: shuffle([`l’angle ${n1}`, `l’angle ${n2}`]),
    expected: [`l’angle ${bon}`],
    comparator: "mcq_exact",
    explanation: expl(`On regarde l’ouverture entre les côtés. L’angle ${bon} est ${plusGrand ? "le plus ouvert" : "le moins ouvert"} : c’est le plus ${mot}.`),
    canvas: figureRayons(s, [{ nom: c0, deg: 0 }, { nom: c1, deg: v1 }, { nom: c2, deg: v2 }]),
  };
}

/** Comparer QUATRE angles nommés : la réponse est un nom d'angle. */
function comparerQuatre(plusGrand: boolean, ctx = false) {
  const ls = lettres(12);
  const noms = [0, 1, 2, 3].map((k) => ls.slice(3 * k, 3 * k + 3).join(""));
  const ms: number[] = [];
  while (ms.length < 4) {
    const v = mesure5(15, 175);
    if (ms.every((m) => Math.abs(m - v) >= 10)) ms.push(v);
  }
  const r = plusGrand ? Math.max(...ms) : Math.min(...ms);
  const bon = noms[ms.indexOf(r)];
  const p = pick(PRENOMS);
  const mot = plusGrand ? "le plus grand" : "le plus petit";
  let text: string;
  if (ctx) {
    const liste = noms.map((n, k) => `${n} mesure ${ms[k]}°`).join(", ");
    text = pick([
      `${p.nom} a mesuré quatre angles : ${liste}. Quel angle est ${mot} ?`,
      `Dans la figure ${de(p.nom)}, ${liste}. Quel angle est ${plusGrand ? "le plus ouvert" : "le moins ouvert"} ?`,
    ]);
  } else {
    // ★2 nu : « ABC = 40° », la liste se lit d'un coup d'œil.
    const liste = noms.map((n, k) => `${n} = ${ms[k]}°`).join(", ");
    text = pick([`Quel angle est ${mot} ? ${liste}.`, `Choisis ${mot} angle : ${liste}.`, `${liste}. Quel angle est ${mot} ?`, `Lis les mesures : ${liste}. Trouve ${mot}.`, `Compare : ${liste}. Coche ${mot}.`]);
  }
  return {
    text,
    format: "qcm" as const,
    choices: noms.map((n) => `l’angle ${n}`),
    expected: [`l’angle ${bon}`],
    comparator: "mcq_exact" as const,
    explanation: expl(`On compare les mesures : ${[...ms].sort((x, y) => x - y).join("° < ")}°. ${mot[0].toUpperCase()}${mot.slice(1)} est ${bon} (${r}°).`),
  };
}

/** Comparer un angle à l'angle droit, avec les lettres ou en situation (★3). */
const PETIT = "plus petit qu’un angle droit";
const GRAND = "plus grand qu’un angle droit";
const EGAL = "égal à un angle droit";
function comparerAuDroit(v: number, enSituation: boolean, intrus: string) {
  const p = pick(PRENOMS);
  const n = nomAngle();
  let text: string;
  if (enSituation) {
    const o = objetPour(v);
    text = pick([
      `${o.phrase(p)} L’angle entre ${o.cotes} mesure ${v}°. Cet angle est :`,
      `${o.phrase(p)} ${o.cotes[0].toUpperCase()}${o.cotes.slice(1)} font un angle de ${v}°. Compare-le à un angle droit.`,
      `${o.phrase(p)} ${p.f ? "Elle" : "Il"} mesure ${v}° entre ${o.cotes}. Que peut-on dire de cet angle ?`,
      `${p.nom} a tracé l’angle ${n.nom} de ${v}°. Cet angle est :`,
    ]);
  } else
    text = pick([
      `L’angle ${n.nom} mesure ${v}°. Compare-le à un angle droit.`,
      `Un angle de ${v}° est :`,
      `Compare un angle de ${v}° à un angle droit.`,
      `${v}° : compare cet angle à un angle droit.`,
      `Par rapport à un angle droit, ${v}° est :`,
    ]);
  const juste = v < 90 ? PETIT : v > 90 ? GRAND : EGAL;
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([PETIT, EGAL, GRAND, intrus]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(`Un angle droit mesure 90°. ${v} ${v < 90 ? "<" : ">"} 90 : l’angle de ${v}° est ${juste}.`),
    // Nommé et nu : la mesure écrite (comme avant). Sinon l'angle seul, ni mesure ni carré : on compare à 90°.
    canvas: !enSituation && text.includes(n.nom) ? figureAngle(v, n, { mesure: true }) : figureMesure(v, n, text, { mesure: "rien" }),
  };
}

/** ★2 nu et dessiné : on compare À L'ŒIL l'angle de la figure à un angle droit (pas de mesure écrite). */
function comparerAuDroitDessine(petit: boolean) {
  const n = nomAngle();
  const v = petit ? mesure5(15, 65) : mesure5(115, 170);
  const text = pick([
    `Observe l’angle ${n.nom}. Compare-le à un angle droit.`,
    `Regarde la figure. L’angle ${n.nom} est :`,
    `Sans mesurer, compare l’angle ${n.nom} à un angle droit.`,
    `Imagine ton équerre sur l’angle ${n.nom}. Il est :`,
    `Par rapport à un angle droit, l’angle ${n.nom} est :`,
  ]);
  const juste = petit ? PETIT : GRAND;
  return {
    text,
    format: "qcm" as const,
    choices: shuffle([PETIT, EGAL, GRAND]),
    expected: [juste],
    comparator: "mcq_exact" as const,
    explanation: expl(
      `Un angle droit a la forme du coin d’une équerre. L’angle ${n.nom} est ${petit ? "plus fermé" : "plus ouvert"} que ce coin : il est ${juste}.`,
    ),
    canvas: figureAngle(v, n),
  };
}

type G = TutorGeneratedQuestionV4;

// ----- Générateurs des gabarits ★1-★2 (nus) et ★3 (_ctx3, en situation).

/** Sommet, côtés, nom d'un angle (★1 nu) ; en situation : l'objet réel (★3). */
function genReconnaitre(ctx: boolean): G {
  const n = nomAngle();
  const v = mesure5(25, 155, [90]);
  const p = pick(PRENOMS);
  const cas = ctx ? pick([0, 1, 2, 2, 3]) : randomInt(0, 3);
  if (cas === 0) {
    const t = ctx
      ? `${p.nom} a tracé l’angle ${n.nom}. Quel point est son sommet ?`
      : pick([`Quel point est le sommet de l’angle ${n.nom} ?`, `Observe l’angle ${n.nom}. Quel est son sommet ?`]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`le point ${n.s}`, `le point ${n.g}`, `le point ${n.d}`, "aucun de ces points"]),
      expected: [`le point ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Dans le nom ${n.nom}, la lettre du milieu est le sommet : c’est ${n.s}. Les deux côtés partent de ${n.s}.`),
      canvas: figureAngle(v, n),
    };
  }
  if (cas === 1) {
    const t = ctx
      ? `${p.nom} repasse en rouge les côtés de l’angle ${n.nom}. Lesquels ?`
      : pick([`Quels sont les côtés de l’angle ${n.nom} ?`, `L’angle ${n.nom} a pour côtés :`]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([
        `[${n.s}${n.g}) et [${n.s}${n.d})`,
        `[${n.g}${n.s}) et [${n.g}${n.d})`,
        `[${n.d}${n.g}) et [${n.d}${n.s})`,
        `[${n.g}${n.d}) et [${n.d}${n.g})`,
      ]),
      expected: [`[${n.s}${n.g}) et [${n.s}${n.d})`],
      comparator: "mcq_exact",
      explanation: expl(`Les côtés d’un angle sont deux demi-droites qui partent du sommet. Le sommet de ${n.nom} est ${n.s} : les côtés sont [${n.s}${n.g}) et [${n.s}${n.d}).`),
      canvas: figureAngle(v, n),
    };
  }
  if (cas === 2) {
    if (ctx) {
      const o = objetPour(v);
      const t = pick([
        `${o.phrase(p)} ${o.cotes[0].toUpperCase()}${o.cotes.slice(1)} forment un angle. Leur point commun s’appelle :`,
        `${o.phrase(p)} Regarde l’angle entre ${o.cotes}. Comment s’appelle le point de départ commun ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle(["le sommet", "le centre", "le milieu", "la graduation"]),
        expected: ["le sommet"],
        comparator: "mcq_exact",
        explanation: expl("Les deux côtés d’un angle partent d’un même point : c’est le sommet de l’angle."),
      };
    }
    // Nu : le point du milieu, montré sur la figure.
    return {
      text: pick([`Comment s’appelle le point ${n.s} de l’angle ${n.nom} ?`, `Dans l’angle ${n.nom}, le point ${n.s} est :`]),
      format: "qcm",
      choices: shuffle(["le sommet", "le centre", "le milieu", "un côté"]),
      expected: ["le sommet"],
      comparator: "mcq_exact",
      explanation: expl(`${n.s} est la lettre du milieu de ${n.nom} : les deux côtés partent de ${n.s}. C’est le sommet.`),
      canvas: figureAngle(v, n),
    };
  }
  const t = ctx
    ? `${p.nom} trace [${n.s}${n.g}) et [${n.s}${n.d}). Quel nom donne-t-${il(p)} à l’angle obtenu ?`
    : pick([
        `Les demi-droites [${n.s}${n.g}) et [${n.s}${n.d}) forment un angle. Comment le nomme-t-on ?`,
        `Nomme l’angle formé par [${n.s}${n.g}) et [${n.s}${n.d}).`,
      ]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle([n.nom, `${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`, `${n.s}${n.d}${n.g}`]),
    expected: [n.nom],
    comparator: "mcq_exact",
    explanation: expl(`Le sommet s’écrit au MILIEU du nom. Le sommet est ${n.s} : l’angle s’appelle ${n.nom} (ou ${n.d}${n.s}${n.g}).`),
    canvas: figureAngle(v, n),
  };
}

/** De quoi est fait un angle, et sa nature d'après sa mesure (★2 nu ; ★3 en situation). */
function genReconnaitreQcm(ctx: boolean): G {
  const n = nomAngle();
  const p = pick(PRENOMS);
  if (Math.random() < 0.3) {
    const t = ctx
      ? `${p.nom} dessine l’angle ${n.nom}. Que trace-t-${il(p)} ?`
      : pick([`L’angle ${n.nom} est formé par :`, `De quoi est fait l’angle ${n.nom} ?`]);
    const v = mesure5(25, 155, [90]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([
        `deux demi-droites d’origine ${n.s}`,
        `deux demi-droites d’origine ${n.g}`,
        `trois segments [${n.g}${n.s}], [${n.s}${n.d}] et [${n.g}${n.d}]`,
        `un cercle de centre ${n.s}`,
      ]),
      expected: [`deux demi-droites d’origine ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Un angle est formé par deux demi-droites de même origine. Ici, l’origine commune est le sommet ${n.s} : [${n.s}${n.g}) et [${n.s}${n.d}).`),
      canvas: figureAngle(v, n),
    };
  }
  // Nature d'après une mesure franche (loin de 90°) : le piège fin est à ★3.
  const v = pick([mesure5(15, 70), mesure5(15, 70), mesure5(110, 170), mesure5(110, 170), 90, 180]);
  const nature = natureAngle(v);
  const o = objetPour(v);
  const t = ctx
    ? pick([
        `${o.phrase(p)} L’angle ${n.nom} formé par ${o.cotes} mesure ${v}°. C’est un angle :`,
        `${o.phrase(p)} ${p.f ? "Elle" : "Il"} mesure l’angle entre ${o.cotes} : ${v}°. Cet angle est :`,
        `${p.nom} lit ${v}° sur son rapporteur pour l’angle ${n.nom}. Cet angle est :`,
      ])
    : pick([
        `L’angle ${n.nom} mesure ${v}°. Comment s’appelle cet angle ?`,
        `L’angle ${n.nom} mesure ${v}°. C’est un angle :`,
        `Un angle mesure ${v}°. Est-il aigu, droit, obtus ou plat ?`,
      ]);
  const regle: Record<string, string> = {
    aigu: `${v}° est plus petit que 90° : l’angle est aigu.`,
    droit: "90° : c’est un angle droit.",
    obtus: `${v}° est entre 90° et 180° : l’angle est obtus.`,
    plat: "180° : les deux côtés sont alignés, c’est un angle plat.",
  };
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["aigu", "droit", "obtus", "plat"]),
    expected: [nature],
    comparator: "mcq_exact",
    explanation: expl(regle[nature]),
    ...(v < 180 && t.includes(n.nom) ? { canvas: figureAngle(v, n, { mesure: true, droit: v === 90 }) } : {}),
  };
}

/** Le coin d'une figure est droit : 90° (★1 nu) ; le coin d'un objet réel (★3). */
function genDroitCoin(ctx: boolean): G {
  let text: string;
  if (ctx) {
    const p = pick(PRENOMS);
    const coin = pick([
      "le coin d’une feuille de papier", "le coin d’un carreau de la cuisine", "le coin d’une porte",
      "le coin du tableau de la classe", "le coin d’un écran de téléphone", "le coin d’un terrain de foot",
      "le coin d’une boîte à chaussures", "le coin de son cahier", "le coin d’une fenêtre",
      "le coin d’une table rectangulaire", "le coin d’une carte postale", "le coin d’un échiquier",
      "le coin d’un panneau de basket", "le coin d’une tablette de chocolat",
    ]);
    const debut = pick([
      `${p.nom} pose son équerre sur ${coin} : elle colle parfaitement.`,
      `${p.nom} observe ${coin}. C’est un angle droit.`,
      `${coin[0].toUpperCase()}${coin.slice(1)} forme un angle droit, vérifie ${p.nom} avec son équerre.`,
    ]);
    const fin = pick(["Combien mesure cet angle ?", "Quelle est la mesure de cet angle, en degrés ?", "Complète : cet angle mesure … °.", "Donne la mesure de cet angle."]);
    text = `${debut} ${fin}`;
  } else {
    const coin = pick(["Le coin d’un carré", "Le coin d’un rectangle"]);
    text = pick([
      `${coin} est un angle droit. Combien mesure-t-il ?`,
      `${coin} forme un angle droit. Donne sa mesure.`,
      `${coin} est un angle droit. Il mesure … °.`,
    ]);
  }
  return {
    text,
    format: "short",
    expected: ["90°", "90"],
    comparator: "number_equal",
    explanation: expl("Un angle droit mesure toujours 90°, quelle que soit la taille de la figure."),
    // L'énoncé DIT que l'angle est droit : le petit carré, aucune mesure écrite.
    canvas: figureMesure(90, null, text, { droit: true }),
  };
}

/** Quatre angles nommés, un seul droit : la réponse est un NOM d'angle. */
function genDroitListe(ctx: boolean): G {
  const ls = lettres(12);
  const noms = [0, 1, 2, 3].map((k) => ls.slice(3 * k, 3 * k + 3).join(""));
  const m1 = mesure5(20, 80);
  const m2 = mesure5(100, 175);
  const mesures = shuffle([90, m1, m2, mesure5(20, 175, [90, m1, m2])]);
  const droit = noms[mesures.indexOf(90)];
  const p = pick(PRENOMS);
  let t: string;
  if (ctx) {
    const liste = noms.map((n, k) => `${n} mesure ${mesures[k]}°`).join(", ");
    t = pick([
      `${p.nom} a mesuré quatre angles : ${liste}. Quel angle est droit ?`,
      `Dans la figure ${de(p.nom)}, ${liste}. Où dessine-t-${il(p)} le petit carré ?`,
    ]);
  } else {
    const liste = noms.map((n, k) => `${n} = ${mesures[k]}°`).join(", ");
    t = pick([`Quel angle est droit ? ${liste}.`, `Choisis l’angle droit : ${liste}.`]);
  }
  return {
    text: t,
    format: "qcm",
    choices: noms.map((n) => `l’angle ${n}`),
    expected: [`l’angle ${droit}`],
    comparator: "mcq_exact",
    explanation: expl(`Un angle droit mesure exactement 90°. Ici, c’est l’angle ${droit}.`),
  };
}

/** Cet angle est-il droit ? (★2 nu ; ★3 en situation) */
function genDroitOuiNon(ctx: boolean): G {
  const n = nomAngle();
  const p = pick(PRENOMS);
  const v = Math.random() < 0.4 ? 90 : mesure5(40, 140, [90]);
  const o = objetPour(v);
  const t = ctx
    ? pick([
        `${p.nom} mesure l’angle ${n.nom} : ${v}°. Cet angle est-il droit ?`,
        `${o.phrase(p)} L’angle entre ${o.cotes} mesure ${v}°. Est-ce un angle droit ?`,
        `${p.nom} lit ${v}° sur son rapporteur. A-t-${il(p)} mesuré un angle droit ?`,
      ])
    : pick([
        `L’angle ${n.nom} mesure ${v}°. Est-ce un angle droit ?`,
        `Un angle mesure ${v}°. Est-il droit ?`,
        `Observe l’angle ${n.nom} de ${v}°. Est-il droit ?`,
      ]);
  const juste = v === 90 ? "oui, il mesure 90°" : v < 90 ? "non, il est plus petit qu’un angle droit" : "non, il est plus grand qu’un angle droit";
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["oui, il mesure 90°", "non, il est plus petit qu’un angle droit", "non, il est plus grand qu’un angle droit"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(v === 90 ? "90° pile : c’est un angle droit." : `${v}° n’est pas 90°. ${v < 90 ? `${v} < 90 : l’angle est plus petit` : `${v} > 90 : l’angle est plus grand`} qu’un angle droit.`),
    canvas: t.includes(n.nom) ? figureAngle(v, n, { mesure: true, droit: v === 90 }) : figureMesure(v, null, t, { mesure: "rien" }),
  };
}

/** L'instrument ou l'unité pour mesurer un angle (★1 nu, figure dessinée ; ★3 en situation). */
function genMesurerInstrument(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const instrument = Math.random() < 0.5;
  let t: string;
  if (ctx) {
    const o = pick(OBJETS_ANGLE);
    const quoi = pick([`l’angle ${n.nom} de sa figure`, `l’angle entre ${o.cotes}`, `l’angle ${n.nom} dessiné au tableau`]);
    const intro = quoi.includes("entre") ? `${o.phrase(p)} ${p.f ? "Elle" : "Il"} veut mesurer ${quoi}.` : `${p.nom} veut mesurer ${quoi}.`;
    t = instrument
      ? pick([`${intro} Quel instrument prend-${il(p)} ?`, `${intro} Avec quoi peut-${il(p)} le faire ?`, `${intro} Quel outil faut-il ?`])
      : pick([`${intro} En quelle unité écrit-${il(p)} le résultat ?`, `${intro} En quelle unité s’exprime la mesure ?`]);
  } else
    t = instrument
      ? pick([`Avec quel instrument mesures-tu l’angle ${n.nom} ?`, `Mesure l’angle ${n.nom}. Quel instrument prends-tu ?`])
      : pick([`En quelle unité mesures-tu l’angle ${n.nom} ?`, `La mesure de l’angle ${n.nom} s’écrit dans quelle unité ?`]);
  const canvas = ctx ? {} : { canvas: figureAngle(mesure5(30, 150, [90]), n) };
  if (instrument)
    return {
      text: t,
      format: "qcm",
      choices: shuffle(["un rapporteur", "une règle graduée", "un compas", "une équerre"]),
      expected: ["un rapporteur"],
      comparator: "mcq_exact",
      explanation: expl("Le rapporteur est gradué en degrés : il sert à mesurer les angles. L’équerre ne vérifie que l’angle droit, la règle mesure des longueurs."),
      ...canvas,
    };
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["en degrés", "en centimètres", "en mètres", "en grammes"]),
    expected: ["en degrés"],
    comparator: "mcq_exact",
    explanation: expl("Un angle se mesure en degrés (symbole °). La taille des côtés ne compte pas."),
    ...canvas,
  };
}

/** La méthode du rapporteur, avec les noms de points de l'angle (★2 nu ; ★3 avec un prénom). */
function genMesurerMethode(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const cas = randomInt(0, 2);
  if (cas === 0) {
    const t = ctx
      ? pick([
          `Pour mesurer l’angle ${n.nom}, où ${p.nom} place-t-${il(p)} le centre du rapporteur ?`,
          `${p.nom} mesure l’angle ${n.nom}. Sur quel point pose-t-${il(p)} le centre du rapporteur ?`,
        ])
      : pick([
          `Pour mesurer l’angle ${n.nom}, où poses-tu le centre du rapporteur ?`,
          `On mesure l’angle ${n.nom}. Où met-on le centre du rapporteur ?`,
        ]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`sur le point ${n.s}`, `sur le point ${n.g}`, `sur le point ${n.d}`, `au milieu de [${n.g}${n.d}]`]),
      expected: [`sur le point ${n.s}`],
      comparator: "mcq_exact",
      explanation: expl(`Le centre du rapporteur se pose sur le sommet. Le sommet de ${n.nom} est la lettre du milieu : ${n.s}.`),
      canvas: figureAngle(mesure5(30, 150, [90]), n),
    };
  }
  if (cas === 1) {
    const t = ctx
      ? `${p.nom} mesure l’angle ${n.nom}. ${p.f ? "Elle" : "Il"} pose le centre du rapporteur sur ${n.s} et le 0 sur [${n.s}${n.d}). Sur quel côté lit-${il(p)} la mesure ?`
      : pick([
          `Le 0 du rapporteur est sur [${n.s}${n.d}). Où lis-tu la mesure de l’angle ${n.nom} ?`,
          `Angle ${n.nom} : le 0 du rapporteur est sur [${n.s}${n.d}). Où lis-tu la mesure ?`,
        ]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`sur [${n.s}${n.g})`, `sur [${n.s}${n.d})`, `sur [${n.g}${n.d}]`, `sur [${n.d}${n.g})`]),
      expected: [`sur [${n.s}${n.g})`],
      comparator: "mcq_exact",
      explanation: expl(`Le 0 est sur un côté, [${n.s}${n.d}). On lit la mesure là où passe l’AUTRE côté : [${n.s}${n.g}).`),
      canvas: figureAngle(mesure5(30, 150, [90]), n),
    };
  }
  // Les deux graduations : aigu ou obtus tranche.
  const v = pick([20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160]);
  const w = 180 - v;
  const nat = v < 90 ? "aigu" : "obtus";
  const [x, y] = shuffle([v, w]);
  const t = ctx
    ? pick([
        `L’angle ${n.nom} est ${nat}. Sur le rapporteur, ${p.nom} lit ${x}° sur une graduation et ${y}° sur l’autre. Quelle est sa mesure ?`,
        `${p.nom} hésite pour l’angle ${n.nom}, qui est ${nat} : ${x}° ou ${y}° ? Quelle est la bonne mesure ?`,
      ])
    : pick([
        `L’angle ${n.nom} est ${nat}. Le rapporteur indique ${x}° et ${y}°. Quelle est sa mesure ?`,
        `L’angle ${n.nom} est ${nat} : ${x}° ou ${y}° ? Choisis sa mesure.`,
      ]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle([`${v}°`, `${w}°`]),
    expected: [`${v}°`],
    comparator: "mcq_exact",
    explanation: expl(`Un angle ${nat} mesure ${nat === "aigu" ? "moins" : "plus"} de 90°. Entre ${v}° et ${w}°, c’est donc ${v}°.`),
    canvas: figureAngle(v, n),
  };
}

/** Tracer un angle : l'instrument, la graduation, la nature prévue (★2 nu ; ★3 avec un prénom). */
function genTracer(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const v = mesure5(20, 160, [90]);
  const cas = randomInt(0, 2);
  if (cas === 0) {
    const t = ctx
      ? pick([
          `${p.nom} doit tracer l’angle ${n.nom} de ${v}°. Quel instrument lui faut-il ?`,
          `Pour tracer un angle de ${v}°, ${p.nom} sort sa trousse. Que prend-${il(p)} ?`,
        ])
      : pick([`Quel instrument faut-il pour tracer un angle de ${v}° ?`, `Tu traces l’angle ${n.nom} de ${v}°. Quel instrument prends-tu ?`]);
    return {
      text: t,
      format: "qcm",
      choices: shuffle(["un rapporteur", "une équerre", "un compas", "une gomme"]),
      expected: ["un rapporteur"],
      comparator: "mcq_exact",
      explanation: expl(`Pour obtenir ${v}°, il faut un instrument gradué en degrés : le rapporteur. L’équerre ne donne que 90°.`),
      canvas: figureMesure(v, n, t),
    };
  }
  if (cas === 1) {
    const t = ctx
      ? `${p.nom} trace l’angle ${n.nom} de ${v}°. ${p.f ? "Elle" : "Il"} pose le 0 du rapporteur sur [${n.s}${n.d}). À quelle graduation fait-${il(p)} son repère ?`
      : `Angle ${n.nom} de ${v}° : le 0 du rapporteur est sur [${n.s}${n.d}). Quelle graduation prends-tu ?`;
    const w = 180 - v;
    const leurres = [...new Set([w, v + 10, v - 10, v + 20])].filter((x) => x !== v).slice(0, 3);
    return {
      text: t,
      format: "qcm",
      choices: shuffle([`${v}°`, ...leurres.map((x) => `${x}°`)]),
      expected: [`${v}°`],
      comparator: "mcq_exact",
      explanation: expl(`On compte à partir du 0 posé sur [${n.s}${n.d}) jusqu’à ${v}. Contrôle : ${v < 90 ? "l’angle sera aigu" : "l’angle sera obtus"}, donc ${w}° est la lecture sur la mauvaise graduation.`),
      canvas: figureAngle(v, n, { mesure: true }),
    };
  }
  const t = ctx
    ? `${p.nom} trace au rapporteur un angle ${n.nom} de ${v}°. Quelle sorte d’angle obtient-${il(p)} ?`
    : pick([`Tu traces un angle de ${v}°. Cet angle sera :`, `On trace l’angle ${n.nom} de ${v}°. Cet angle sera :`]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle(["aigu", "droit", "obtus", "plat"]),
    expected: [v < 90 ? "aigu" : "obtus"],
    comparator: "mcq_exact",
    explanation: expl(`${v}° est ${v < 90 ? "plus petit" : "plus grand"} que 90° : l’angle sera ${v < 90 ? "aigu" : "obtus"}.`),
    canvas: figureMesure(v, n, t, { mesure: "rien" }),
  };
}

/** L'ordre des étapes, avec les lettres de l'angle à tracer. */
function genEtapes(ctx: boolean): G {
  const p = pick(PRENOMS);
  const n = nomAngle();
  const v = mesure5(20, 160, [90]);
  const etapes = [
    `tracer [${n.s}${n.d})`,
    `poser le centre du rapporteur sur ${n.s} et le 0 sur [${n.s}${n.d})`,
    `faire un repère à ${v}°`,
    `tracer [${n.s}${n.g}) en passant par le repère`,
  ];
  const k = randomInt(0, 3);
  const mot = ["la première", "la deuxième", "la troisième", "la dernière"][k];
  const t = ctx
    ? `${p.nom} trace l’angle ${n.nom} de ${v}°. Quelle est ${mot} étape ?`
    : pick([`Pour tracer l’angle ${n.nom} de ${v}° au rapporteur, quelle est ${mot} étape ?`, `Tu traces l’angle ${n.nom} de ${v}°. Quelle est ${mot} étape ?`]);
  return {
    text: t,
    format: "qcm",
    choices: shuffle([...etapes]),
    expected: [etapes[k]],
    comparator: "mcq_exact",
    explanation: expl(`Dans l’ordre : 1) ${etapes[0]} ; 2) ${etapes[1]} ; 3) ${etapes[2]} ; 4) ${etapes[3]}.`),
    canvas: figureAngle(v, n, { mesure: true }),
  };
}

/** Un gabarit de la notion angle_mesure. */
function gabarit(id: string, microId: string, difficulty: number, hint: string, tags: string[], generate: () => G): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId: "angle_mesure", microId, difficulty, theme: "neutral", hint, tags, generate } as TutorBankItemV4;
}

// =====================================================================
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT (scripts/mesurer-squelettes-coach.ts
// --lettres : jusqu'à 18 répétitions sur 20). Pour tomber à 4 au plus, il faut
// une quarantaine de phrases à peu près équiprobables par étoile : chaque gabarit
// ci-dessous pose la question de plusieurs FAÇONS (lire la figure, l'intrus,
// vrai/faux, compléter, nombre à trouver, prendre la question par l'autre bout).
// ★1 : 12 mots au plus. ★2 : 15 mots au plus. Aucun prénom, aucun objet à ★1-★2
// (../REGLES-6E.md). Correcteurs : correcteurs/angles.ts, section du 07/11.
// =====================================================================
const qc = (text: string, juste: string, faux: string[], calcul: string, canvas?: FigAngle): G => ({
  text, format: "qcm", choices: shuffle([juste, ...faux]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte en degrés. */
const dg = (text: string, v: number, calcul: string, canvas?: FigAngle): G => ({
  text, format: "short", expected: [`${v}°`, String(v)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte : un nombre sans unité. */
const nb = (text: string, n: number, calcul: string, canvas?: FigAngle): G => ({
  text, format: "short", expected: [String(n)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte en lettres : toutes les écritures justes sont acceptées. */
const lt = (text: string, justes: string[], calcul: string, canvas?: FigAngle): G => ({
  text, format: "short", expected: justes, comparator: "exact_text", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
const ouiNon = (text: string, oui: boolean, calcul: string, canvas?: FigAngle) => qc(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
const vraiFaux = (text: string, vrai: boolean, calcul: string, canvas?: FigAngle) => qc(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul, canvas);
/** Une mesure franche, aiguë ou obtune : loin de 90° pour se juger à l'œil. */
const mesureFranche = () => (Math.random() < 0.5 ? mesure5(20, 60) : mesure5(120, 165));
const NATURES = ["aigu", "droit", "obtus", "plat"];

// ----- ANGLE_RECONNAITRE, ★1 : le sommet, le nom, les côtés
function genRecSommetFigure(): G {
  const n = nomAngle();
  const fig = figureAngle(mesureFranche(), n);
  const pourquoi = `Les deux côtés partent du point ${n.s} : c’est le sommet.`;
  if (Math.random() < 0.65)
    return qc(
      pick(["Observe la figure. Quel point est le sommet ?", "Regarde l’angle. Quel point est son sommet ?", "Trouve le sommet de cet angle.", "Où est le sommet de cet angle ?", "Les deux côtés partent de quel point ?", "Quel point est sur les deux côtés ?", "Choisis le sommet de l’angle tracé."]),
      n.s, [n.g, n.d], pourquoi, fig,
    );
  return lt(pick(["Écris la lettre du sommet de cet angle.", "Observe la figure. Écris le sommet de l’angle.", "Quelle lettre marque le sommet ?", "Regarde les côtés. Écris le point du sommet."]), [n.s], pourquoi, fig);
}
function genRecSommetNom(): G {
  const n = nomAngle();
  const pourquoi = `Le sommet s’écrit au milieu du nom. Dans ${n.nom}, c’est ${n.s}.`;
  const mode = pick(["choix", "ecrit", "nom", "nom"] as const);
  if (mode === "choix")
    return qc(pick([`Dans le nom ${n.nom}, quelle lettre est le sommet ?`, `Angle ${n.nom} : quelle lettre est le sommet ?`, `Quel point est le sommet de ${n.nom} ?`, `Pour l’angle ${n.nom}, choisis le sommet.`]), n.s, [n.g, n.d], pourquoi);
  if (mode === "ecrit")
    return lt(pick([`Écris le sommet de l’angle ${n.nom}.`, `Quel est le sommet de l’angle ${n.nom} ?`, `L’angle ${n.nom} a pour sommet quel point ?`, `Lis le nom ${n.nom}. Écris son sommet.`]), [n.s], pourquoi);
  return qc(
    pick([`Quel angle a pour sommet ${n.s} ?`, `Choisis l’angle de sommet ${n.s}.`, `Coche l’angle dont le sommet est ${n.s}.`, `Le sommet est ${n.s}. Quel nom convient ?`, `Le sommet est ${n.s}. Choisis le nom de l’angle.`]),
    n.nom, [`${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`], pourquoi,
  );
}
function genRecNomFigure(): G {
  const n = nomAngle();
  const fig = figureAngle(mesureFranche(), n);
  const inverse = `${n.d}${n.s}${n.g}`;
  const pourquoi = `Le sommet ${n.s} s’écrit au milieu : ${n.nom} ou ${inverse}.`;
  const mode = pick(["choix", "ecrit", "verdict", "manque"] as const);
  if (mode === "choix")
    return qc(pick(["Observe la figure. Comment s’appelle cet angle ?", "Choisis le nom de cet angle.", "Quel nom convient à cet angle ?", "Regarde la figure. Quel est le nom de l’angle ?", "Coche le bon nom de cet angle."]), n.nom, [`${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`, `${n.s}${n.d}${n.g}`], pourquoi, fig);
  if (mode === "ecrit")
    return lt(pick(["Écris le nom de cet angle.", "Donne le nom de l’angle tracé.", "Lis la figure. Écris le nom de l’angle."]), [n.nom, inverse], pourquoi, fig);
  if (mode === "verdict") {
    const juste = Math.random() < 0.5;
    const x = juste ? pick([n.nom, inverse]) : pick([`${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`]);
    return ouiNon(pick([`Cet angle peut-il s’appeler ${x} ?`, `Observe la figure. ${x} est-il le nom de l’angle ?`, `Le nom ${x} convient-il à cet angle ?`, `Regarde le sommet. Cet angle est-il ${x} ?`]), juste, pourquoi, fig);
  }
  return lt(pick([`Complète le nom de l’angle : ${n.g} … ${n.d}.`, `Quelle lettre manque au nom : ${n.g} … ${n.d} ?`, `Le nom est ${n.g} … ${n.d}. Écris la lettre du milieu.`]), [n.s], pourquoi, fig);
}
function genRecCotes(): G {
  const n = nomAngle();
  const fig = figureAngle(mesureFranche(), n);
  const [c1, c2] = [`[${n.s}${n.g})`, `[${n.s}${n.d})`];
  const pourquoi = `Les côtés partent du sommet ${n.s} : ${c1} et ${c2}.`;
  const mode = pick(["compter", "un", "autre", "verdict"] as const);
  if (mode === "compter") {
    const cotes = Math.random() < 0.6;
    return qc(
      cotes ? pick(["Combien de côtés a un angle ?", "Un angle a combien de côtés ?", "Compte les côtés d’un angle.", "Regarde l’angle. Combien de côtés vois-tu ?"]) : pick(["Combien de sommets a un angle ?", "Un angle a combien de sommets ?", "Regarde l’angle. Combien de sommets vois-tu ?"]),
      cotes ? "2" : "1", cotes ? ["1", "3", "4"] : ["2", "3", "4"], cotes ? "Un angle a 2 côtés : deux demi-droites." : "Un angle a 1 sommet : le point d’où partent les côtés.", fig,
    );
  }
  if (mode === "un")
    return qc(pick(["Observe la figure. Quelle demi-droite est un côté de l’angle ?", "Choisis un côté de cet angle.", `Trouve un côté de l’angle ${n.nom}.`, `Quelle demi-droite est un côté de l’angle ${n.nom} ?`]), c1, [`[${n.g}${n.s})`, `[${n.g}${n.d})`, `[${n.d}${n.s})`], pourquoi, fig);
  if (mode === "autre")
    return qc(pick([`${c1} est un côté de l’angle ${n.nom}. Quel est l’autre ?`, `L’angle ${n.nom} a le côté ${c1}. Trouve l’autre côté.`, `Angle ${n.nom} : un côté est ${c1}. Choisis l’autre.`]), c2, [`[${n.d}${n.s})`, `[${n.g}${n.d})`, `[${n.g}${n.s})`], pourquoi, fig);
  const juste = Math.random() < 0.5;
  const x = juste ? pick([c1, c2]) : pick([`[${n.g}${n.s})`, `[${n.g}${n.d})`, `[${n.d}${n.s})`]);
  return ouiNon(pick([`${x} est-elle un côté de l’angle ${n.nom} ?`, `Angle ${n.nom} : ${x} est-elle un de ses côtés ?`, `La demi-droite ${x} est-elle un côté de ${n.nom} ?`]), juste, pourquoi, fig);
}
function genRecVerdict(): G {
  const n = nomAngle();
  const mode = pick(["sommet", "meme", "definition"] as const);
  if (mode === "sommet") {
    const x = pick([n.s, n.s, n.g, n.d]);
    const pourquoi = `Le sommet est la lettre du milieu de ${n.nom} : ${n.s}.`;
    return pick([
      () => vraiFaux(`Vrai ou faux : ${x} est le sommet de l’angle ${n.nom}.`, x === n.s, pourquoi),
      () => ouiNon(`${x} est-il le sommet de l’angle ${n.nom} ?`, x === n.s, pourquoi),
      () => ouiNon(`Le sommet de l’angle ${n.nom} est-il ${x} ?`, x === n.s, pourquoi),
    ])();
  }
  if (mode === "meme") {
    const memes = Math.random() < 0.5;
    const b = memes ? `${n.d}${n.s}${n.g}` : `${n.s}${n.g}${n.d}`;
    const pourquoi = memes ? `Les deux noms ont le même sommet ${n.s} et les mêmes côtés.` : `Les sommets diffèrent : ${n.s} et ${n.g}.`;
    return ouiNon(pick([`Les noms ${n.nom} et ${b} désignent-ils le même angle ?`, `${n.nom} et ${b} : est-ce le même angle ?`, `L’angle ${n.nom} est-il aussi l’angle ${b} ?`]), memes, pourquoi);
  }
  const [t, v] = pick([
    ["Vrai ou faux : un angle a deux côtés.", true],
    ["Vrai ou faux : un angle a trois côtés.", false],
    ["Vrai ou faux : les deux côtés partent du sommet.", true],
    ["Vrai ou faux : un angle a deux sommets.", false],
    ["Vrai ou faux : le sommet est au milieu du nom.", true],
    ["Vrai ou faux : les côtés d’un angle sont des demi-droites.", true],
  ] as const);
  return vraiFaux(t, v, "Un angle : deux côtés, des demi-droites, qui partent d’un seul sommet. Le sommet s’écrit au milieu du nom.");
}

// ----- ANGLE_RECONNAITRE, ★2 : la nature de l'angle
const REGLE_NATURE = "Aigu : moins de 90°. Droit : 90°. Obtus : entre 90° et 180°. Plat : 180°.";
function genNatMesure(): G {
  const n = nomAngle();
  const v = pick([mesure5(15, 75), mesure5(15, 75), mesure5(105, 170), mesure5(105, 170), 90, 180]);
  const t = pick([`${v}° : quelle est la nature de cet angle ?`, `Donne la nature d’un angle de ${v}°.`, `Quel type d’angle mesure ${v}° ?`, `Choisis le nom d’un angle de ${v}°.`, `L’angle ${n.nom} fait ${v}°. Quelle est sa nature ?`, `Lis la mesure : ${v}°. Choisis la nature de l’angle.`, `Un angle de ${v}° est :`, `Quelle nature a l’angle ${n.nom} de ${v}° ?`]);
  // On demande la nature : l'angle à sa mesure, sans mesure écrite ni petit carré.
  return qc(t, natureAngle(v), NATURES.filter((x) => x !== natureAngle(v)), `${REGLE_NATURE} Ici, ${v}°.`, angleTrace(v, n, t, { mesure: "rien" }));
}
function genNatFigure(): G {
  const n = nomAngle();
  const droit = Math.random() < 0.2;
  const v = droit ? 90 : mesureFranche();
  const juste = natureAngle(v);
  return qc(
    pick(["Observe la figure. Quelle est la nature de cet angle ?", `Regarde l’angle ${n.nom}. Quelle est sa nature ?`, `À l’œil, l’angle ${n.nom} est :`, "Sans mesurer, donne la nature de cet angle.", "Regarde son ouverture. Cet angle est :", `Observe l’angle ${n.nom}. Il est :`, "Compare au coin de ton équerre. Cet angle est :", "Quelle est la nature de l’angle tracé ?"]),
    juste, ["aigu", "droit", "obtus"].filter((x) => x !== juste), `On compare au coin de l’équerre. ${REGLE_NATURE}`, figureAngle(v, n, { droit }),
  );
}
function genNatPourMesure(): G {
  const nat = pick(["aigu", "aigu", "obtus", "obtus", "droit", "plat"]);
  const justeV = nat === "aigu" ? mesure5(15, 80) : nat === "obtus" ? mesure5(100, 170) : nat === "droit" ? 90 : 180;
  const faux = [nat === "aigu" ? mesure5(100, 170) : mesure5(15, 80), ...[90, 180].filter((x) => x !== justeV), nat === "obtus" ? mesure5(15, 80) : mesure5(100, 170)];
  const uniques = [...new Set(faux)].filter((x) => natureAngle(x) !== nat).slice(0, 3);
  return qc(
    pick([`Quelle mesure convient à un angle ${nat} ?`, `Choisis la mesure d’un angle ${nat}.`, `Un angle est ${nat}. Quelle peut être sa mesure ?`, `Coche la mesure d’un angle ${nat}.`, `Trouve l’angle ${nat} parmi ces mesures.`, `Quelle mesure donne un angle ${nat} ?`]),
    `${justeV}°`, uniques.map((x) => `${x}°`), REGLE_NATURE, angleTrace(justeV, null, "", { mesure: "?", droit: nat === "droit" }),
  );
}
/** Un angle de la nature que DIT l'énoncé (le carré seulement s'il dit « droit ») ; aucune mesure écrite. */
function figureNature(nat: "aigu" | "droit" | "obtus" | "plat"): ConstructionCanvasData {
  const v = nat === "aigu" ? mesure5(25, 65) : nat === "obtus" ? mesure5(115, 160) : nat === "droit" ? 90 : 180;
  return angleTrace(v, null, "", { mesure: "rien", droit: nat === "droit" });
}
function genNatIntervalle(): G {
  const nat = pick(["aigu", "obtus", "droit", "plat"] as const);
  const def = { aigu: "moins de 90°", droit: "exactement 90°", obtus: "entre 90° et 180°", plat: "exactement 180°" };
  if (Math.random() < 0.5)
    return qc(pick([`Un angle ${nat} mesure :`, `Quelle mesure décrit un angle ${nat} ?`, `Comment est la mesure d’un angle ${nat} ?`, `Choisis la mesure d’un angle ${nat} :`]), def[nat], Object.values(def).filter((x) => x !== def[nat]), REGLE_NATURE, figureNature(nat));
  return qc(pick([`Un angle mesure ${def[nat]}. Comment s’appelle-t-il ?`, `Mesure : ${def[nat]}. Quelle est la nature de l’angle ?`, `Quel angle mesure ${def[nat]} ?`]), nat, NATURES.filter((x) => x !== nat), REGLE_NATURE);
}
function genNatCompter(): G {
  const veut = pick(["aigus", "obtus"] as const);
  const liste = shuffle([mesure5(15, 80), mesure5(15, 80), mesure5(100, 170), pick([90, 180]), Math.random() < 0.5 ? mesure5(15, 80) : mesure5(100, 170)]);
  const n = liste.filter((x) => natureAngle(x) === (veut === "aigus" ? "aigu" : "obtus")).length;
  const txt = liste.map((x) => `${x}°`).join(", ");
  if (Math.random() < 0.55)
    return nb(pick([`Combien d’angles ${veut} ici ? ${txt}.`, `Compte les angles ${veut} : ${txt}.`, `Dans cette liste, combien d’angles sont ${veut} ? ${txt}.`, `Mesures : ${txt}. Combien d’angles ${veut} ?`]), n, `${REGLE_NATURE} Il y en a ${n}.`);
  const v = mesureFranche();
  const a = pick(["aigu", "obtus"]);
  const vrai = natureAngle(v) === a;
  return pick([
    () => vraiFaux(`Vrai ou faux : un angle de ${v}° est ${a}.`, vrai, REGLE_NATURE, angleTrace(v, null, "", { mesure: "rien" })),
    () => ouiNon(`Un angle de ${v}° est-il ${a} ?`, vrai, REGLE_NATURE, angleTrace(v, null, "", { mesure: "rien" })),
    () => ouiNon(`${v}° : est-ce un angle ${a} ?`, vrai, REGLE_NATURE, angleTrace(v, null, "", { mesure: "rien" })),
    () => vraiFaux(`${v}° donne un angle ${a}. Vrai ou faux ?`, vrai, REGLE_NATURE, angleTrace(v, null, "", { mesure: "rien" })),
  ])();
}
function genNatOrigine(): G {
  const n = nomAngle();
  const pourquoi = `Les deux côtés partent de la même origine : le sommet ${n.s}.`;
  const mode = pick(["origine", "origine", "nom", "sommet"] as const);
  if (mode === "origine")
    return lt(pick([`Quelle est l’origine des côtés de l’angle ${n.nom} ?`, `Les côtés de l’angle ${n.nom} partent de quel point ?`, `Écris l’origine des deux côtés de ${n.nom}.`, `Angle ${n.nom} : de quel point partent ses côtés ?`]), [n.s], pourquoi);
  if (mode === "nom")
    return qc(pick([`[${n.s}${n.g}) et [${n.s}${n.d}) forment quel angle ?`, `Quel angle ont pour côtés [${n.s}${n.g}) et [${n.s}${n.d}) ?`, `Choisis l’angle de côtés [${n.s}${n.g}) et [${n.s}${n.d}).`]), n.nom, [`${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`, `${n.s}${n.d}${n.g}`], pourquoi);
  return lt(pick([`[${n.s}${n.g}) et [${n.s}${n.d}) forment un angle. Écris son sommet.`, `Deux demi-droites d’origine ${n.s} forment un angle. Quel est son sommet ?`]), [n.s], pourquoi);
}

// ----- ANGLE_DROIT, ★1
function genDroitCodage(): G {
  const n = nomAngle();
  const droit = Math.random() < 0.5;
  const v = droit ? 90 : mesureFranche();
  const pourquoi = droit ? "Le petit carré au sommet code un angle droit." : "Aucun petit carré au sommet, et l’ouverture est loin du coin de l’équerre.";
  return ouiNon(
    pick(["Observe la figure. Cet angle est-il droit ?", `Regarde le sommet. L’angle ${n.nom} est-il droit ?`, "La figure montre-t-elle un angle droit ?", `L’angle ${n.nom} est-il droit ?`, "Regarde le coin. Est-ce un angle droit ?", "Vois-tu un petit carré au sommet ?"]),
    droit, pourquoi, figureAngle(v, n, { droit }),
  );
}
function genDroitMesureVerdict(): G {
  const n = nomAngle();
  const v = Math.random() < 0.45 ? 90 : pick([mesure5(20, 80), mesure5(100, 170), 80, 100]);
  const droit = v === 90;
  const pourquoi = "Un angle droit mesure exactement 90°.";
  // L'angle à sa mesure, sans mesure écrite ni carré. « Un angle droit mesure 80° » : pas de figure, elle contredirait l'énoncé.
  const fig = (t: string) => angleTrace(v, n, t, { mesure: "rien" });
  const avec = (t: string, f: (t: string, b: boolean, w: string, c?: FigAngle) => G) => f(t, droit, pourquoi, fig(t));
  return pick([
    () => avec(`Un angle de ${v}° est-il droit ?`, ouiNon),
    () => avec(`${v}° : est-ce un angle droit ?`, ouiNon),
    () => avec(`Vrai ou faux : ${v}° est un angle droit.`, vraiFaux),
    () => avec(`L’angle ${n.nom} fait ${v}°. Est-il droit ?`, ouiNon),
    () => vraiFaux(`Un angle droit mesure ${v}°. Vrai ou faux ?`, droit, pourquoi),
    () => ouiNon(`Un angle droit peut-il mesurer ${v}° ?`, droit, pourquoi),
  ])();
}
function genDroitSigne(): G {
  if (Math.random() < 0.5)
    return qc(pick(["Quel signe code un angle droit ?", "Comment code-t-on un angle droit ?", "Sur une figure, quel signe montre un angle droit ?", "Quel dessin marque un angle droit ?"]), "un petit carré", ["un petit trait", "une petite croix", "un petit rond"], "Un angle droit se code par un petit carré au sommet.");
  return qc(pick(["Que veut dire un petit carré au sommet ?", "Un petit carré au sommet : quel angle est-ce ?", "Que code le petit carré sur un angle ?", "Un angle a un petit carré. Quelle est sa nature ?"]), "un angle droit", ["un angle aigu", "un angle obtus", "un angle plat"], "Le petit carré au sommet code un angle droit.");
}
function genDroitOutil(): G {
  const mode = pick(["equerre", "equerre", "nom", "combien"] as const);
  if (mode === "equerre")
    return qc(pick(["Quel instrument vérifie vite un angle droit ?", "Avec quoi traces-tu vite un angle droit ?", "Quel instrument possède un coin droit ?", "Choisis l’instrument qui contrôle un angle droit.", "Quel instrument pose-t-on sur un coin pour le vérifier ?"]), "une équerre", ["un compas", "une gomme", "un crayon"], "L’équerre a un coin droit : elle vérifie et trace les angles droits.");
  if (mode === "nom")
    return qc(pick(["Comment s’appelle un angle de 90° ?", "90° : quel est le nom de cet angle ?", "Un angle de 90° est :", "Donne le nom d’un angle de 90°."]), "un angle droit", ["un angle aigu", "un angle obtus", "un angle plat"], "90° pile : c’est un angle droit.");
  return dg(pick(["Combien de degrés dans un angle droit ?", "Écris la mesure d’un angle droit.", "Angle droit : combien de degrés ?", "Donne en degrés la mesure d’un angle droit."]), 90, "Un angle droit mesure toujours 90°.", angleTrace(90, null, "", { droit: true }));
}
function genDroitTrouver(): G {
  if (Math.random() < 0.55) {
    const [a, b] = [mesure5(20, 80), mesure5(100, 170)];
    return qc(pick([`Trouve l’angle droit : ${a}°, 90° ou ${b}° ?`, `Choisis l’angle droit parmi ces mesures.`, `Quelle mesure est celle d’un angle droit ?`, `Coche la mesure de l’angle droit.`, `Lequel est un angle droit : ${b}°, ${a}° ou 90° ?`]), "90°", [`${a}°`, `${b}°`], "Un angle droit mesure 90°.");
  }
  const [t, r, w] = pick([
    ["Combien d’angles droits a un carré ?", 4, "Un carré a 4 angles droits."],
    ["Combien d’angles droits a un rectangle ?", 4, "Un rectangle a 4 angles droits."],
    ["Un carré a combien d’angles droits ?", 4, "Un carré a 4 angles droits."],
    ["Compte les angles droits d’un rectangle.", 4, "Un rectangle a 4 angles droits."],
    ["Un triangle rectangle a combien d’angles droits ?", 1, "Un triangle rectangle a 1 angle droit."],
  ] as const);
  return nb(t, r, w);
}

// ----- ANGLE_DROIT, ★2
function genDroitOeil(): G {
  const [s, a, b, c] = lettres(4);
  const dep = randomInt(0, 6) * 5;
  const w = pick([40, 50, 130, 140, 150]);
  const t = pick(["Observe la figure. Quel angle est droit ?", "Sans mesurer, trouve l’angle droit.", "Regarde la figure. Choisis l’angle droit.", "Imagine ton équerre. Quel angle est droit ?", "Quel angle de la figure mesure 90° ?", "Où est l’angle droit sur la figure ?"]);
  return qc(t, `l’angle ${a}${s}${b}`, [`l’angle ${a}${s}${c}`, `l’angle ${b}${s}${c}`], `On pose le coin de l’équerre. Seul l’angle ${a}${s}${b} est droit.`, figureRayons(s, [{ nom: a, deg: dep }, { nom: b, deg: dep + 90 }, { nom: c, deg: dep + w }]));
}
function genDroitComplement(): G {
  const a = mesure5(10, 80);
  const r = 90 - a;
  const pourquoi = `Un angle droit mesure 90°. 90 − ${a} = ${r}.`;
  const figure = Math.random() < 0.65;
  if (figure) {
    const [s, x, y, z] = lettres(4);
    return dg(pick([`L’angle ${x}${s}${z} est droit. L’angle ${x}${s}${y} mesure ${a}°. Trouve l’angle ${y}${s}${z}.`, `Angle droit ${x}${s}${z}. L’angle ${x}${s}${y} mesure ${a}°. Combien mesure l’angle ${y}${s}${z} ?`]), r, pourquoi, figureRayons(s, [{ nom: z, deg: 10 }, { nom: y, deg: 10 + r }, { nom: x, deg: 100 }]));
  }
  return dg(pick([`Combien ajouter à ${a}° pour obtenir un angle droit ?`, `${a}° + … = 90°. Complète.`, `Il manque combien de degrés à ${a}° pour faire 90° ?`, `Complète : ${a}° et … ° font un angle droit.`, `Un angle droit contient un angle de ${a}°. Combien mesure l’autre partie ?`, `Angle droit coupé en deux. Une partie mesure ${a}°. Trouve l’autre.`]), r, pourquoi);
}
function genDroitPlusieurs(): G {
  const mode = pick(["somme", "combien", "partage"] as const);
  if (mode === "somme") {
    const k = pick([2, 3, 4]);
    return dg(pick([`${k} angles droits font combien de degrés ?`, `Combien mesurent ${k} angles droits ensemble ?`, `Ajoute ${k} angles droits. Combien de degrés ?`, `Calcule la mesure de ${k} angles droits côte à côte.`]), 90 * k, `${k} × 90 = ${90 * k}.`);
  }
  if (mode === "combien") {
    const plat = Math.random() < 0.5;
    return nb(plat ? pick(["Combien d’angles droits faut-il pour un angle plat ?", "Un angle plat vaut combien d’angles droits ?", "Angle plat : combien d’angles droits dedans ?"]) : pick(["Un tour complet vaut combien d’angles droits ?", "Combien d’angles droits dans un tour complet ?", "Tour complet : combien d’angles droits dedans ?"]), plat ? 2 : 4, plat ? "180 ÷ 90 = 2." : "360 ÷ 90 = 4.");
  }
  const k = pick([2, 3, 5, 6]);
  return dg(pick([`Un angle droit est coupé en ${k} parts égales. Combien mesure une part ?`, `Partage un angle droit en ${k} angles égaux. Calcule chaque angle.`, `Angle droit, ${k} parts égales : combien de degrés par part ?`]), 90 / k, `90 ÷ ${k} = ${90 / k}.`, rayonsTrace(Array.from({ length: k + 1 }, (_, i) => 20 + (i * 90) / k)));
}
function genDroitPerpendiculaire(): G {
  const [s, a, b, c, d] = lettres(5);
  const mode = pick(["nom", "mesure", "figure", "compte"] as const);
  if (mode === "nom")
    return qc(pick(["Deux droites perpendiculaires forment quel angle ?", "Deux droites perpendiculaires se coupent. Quel angle forment-elles ?", "Quel angle voit-on entre deux droites perpendiculaires ?"]), "un angle droit", ["un angle aigu", "un angle obtus", "un angle plat"], "Perpendiculaires : elles se coupent en formant des angles droits.");
  if (mode === "mesure")
    return dg(pick([`(${a}${b}) et (${c}${d}) sont perpendiculaires. Quelle est la mesure de leur angle ?`, `Droites (${a}${b}) et (${c}${d}) perpendiculaires : combien mesure leur angle ?`]), 90, "Deux droites perpendiculaires forment un angle de 90°.", perpendiculairesTrace([a, b, c, d]));
  if (mode === "compte")
    return nb(pick(["Deux droites perpendiculaires forment combien d’angles droits ?", "Perpendiculaires : combien d’angles droits au croisement ?"]), 4, "Au croisement, les 4 angles sont droits.", perpendiculairesTrace());
  const droit = Math.random() < 0.5;
  const t = droit ? 90 : pick([40, 50, 60, 130, 140]);
  return ouiNon(pick([`Observe les deux droites. L’angle ${a}${s}${c} est-il droit ?`, `Regarde le croisement. L’angle ${a}${s}${c} est-il droit ?`]), droit, droit ? "Le coin de l’équerre colle : l’angle est droit." : "Le coin de l’équerre ne colle pas : l’angle est trop ouvert ou trop fermé.", figureRayons(s, [{ nom: a, deg: 10 }, { nom: c, deg: 10 + t }, { nom: b, deg: 190 }, { nom: d, deg: 190 + t }]));
}
function genDroitVraiFaux(): G {
  const v = pick([85, 89, 91, 95]);
  const [t, b, w] = pick([
    ["Vrai ou faux : un angle droit mesure 90°.", true, "Un angle droit mesure 90°."],
    [`Vrai ou faux : un angle de ${v}° est droit.`, false, "Droit veut dire 90° exactement."],
    ["Vrai ou faux : tous les angles droits ont la même mesure.", true, "Tous mesurent 90°."],
    ["Vrai ou faux : avec de longs côtés, un angle droit dépasse 90°.", false, "La longueur des côtés ne change pas la mesure."],
    ["Vrai ou faux : un carré a 4 angles droits.", true, "Un carré a 4 angles droits."],
    ["Vrai ou faux : un rectangle a 2 angles droits.", false, "Un rectangle a 4 angles droits."],
    ["Vrai ou faux : un angle plat vaut 2 angles droits.", true, "180 = 2 × 90."],
    ["Vrai ou faux : un angle droit est plus grand qu’un angle aigu.", true, "Un angle aigu mesure moins de 90°."],
    ["Vrai ou faux : un angle droit est plus grand qu’un angle obtus.", false, "Un angle obtus mesure plus de 90°."],
  ] as const);
  return vraiFaux(t, b, w);
}

// ----- ANGLE_DROIT, ★3 : des métiers, des objets
const METIERS_COIN = [
  { qui: "Une maçonne", coin: "le coin d’un mur" }, { qui: "Un menuisier", coin: "le coin d’une porte" }, { qui: "Une carreleuse", coin: "le coin d’un carreau" },
  { qui: "Un charpentier", coin: "le coin d’une poutre" }, { qui: "Une architecte", coin: "le coin d’une pièce sur son plan" }, { qui: "Un géomètre", coin: "le coin d’un terrain" },
  { qui: "Une ébéniste", coin: "le coin d’une table" }, { qui: "Un vitrier", coin: "le coin d’une vitre" },
];
function genDroitMetier(): G {
  const m = pick(METIERS_COIN);
  const v = pick([90, 90, 88, 92, 85, 95]);
  const droit = v === 90;
  return ouiNon(
    pick([`${m.qui} mesure ${m.coin} : ${v}°. Ce coin est-il droit ?`, `${m.qui} vérifie ${m.coin}. Le rapporteur indique ${v}°. Ce coin est-il droit ?`, `${m.qui} trouve ${v}° pour ${m.coin}. L’angle est-il droit ?`, `${m.qui} lit ${v}° sur son rapporteur pour ${m.coin}. L’angle est-il droit ?`]),
    droit, droit ? "90° pile : l’angle est droit." : `${v}° n’est pas 90° : l’angle n’est pas droit, même s’il en est proche.`,
    figureMesure(v, null, "", { mesure: "rien" }),
  );
}
function genDroitHorloge(): G {
  const h = pick([1, 2, 3, 3, 3, 4, 5, 6, 7, 8, 9, 9, 9, 10, 11]);
  const d = Math.min(h, 12 - h) * 30;
  const juste = natureAngle(d);
  return qc(
    pick([`Une horloge indique ${h} h. Quelle sorte d’angle font les aiguilles ?`, `À ${h} h, les aiguilles d’une horloge forment un angle. Quelle est sa nature ?`, `Il est ${h} h pile. Les deux aiguilles font quel type d’angle ?`, `Regarde une horloge à ${h} h. L’angle des aiguilles est :`]),
    juste, NATURES.filter((x) => x !== juste), `Entre deux chiffres de l’horloge, il y a 30°. À ${h} h, l’angle mesure ${d}° : il est ${juste}.`,
  );
}
function genDroitChantier(): G {
  const m = pick(METIERS_COIN);
  const mode = pick(["partage", "carreaux", "tour"] as const);
  if (mode === "partage") {
    const k = pick([2, 3, 5, 6]);
    return dg(pick([`${m.qui} partage ${m.coin}, un angle droit, en ${k} parts égales. Combien mesure chaque part ?`, `${m.qui} divise un coin droit en ${k} angles égaux. Quelle est la mesure de chacun ?`]), 90 / k, `Un angle droit mesure 90°. 90 ÷ ${k} = ${90 / k}.`, rayonsSansNom(Array.from({ length: k + 1 }, (_, i) => 20 + (i * 90) / k)));
  }
  if (mode === "carreaux") {
    const k = pick([2, 3, 4]);
    return dg(pick([`Une carreleuse pose ${k} carreaux carrés côte à côte autour d’un point. Combien de degrés font leurs coins ensemble ?`, `Autour d’un point, ${k} carreaux carrés se touchent par un coin. Calcule la mesure de ces ${k} coins ensemble.`]), 90 * k, `Chaque coin mesure 90°. ${k} × 90 = ${90 * k}.`);
  }
  const [mot, r] = pick([["un quart de tour", 90], ["un demi-tour", 180], ["trois quarts de tour", 270], ["un tour complet", 360]] as const);
  const [who, verbe] = pick([["Une pilote", "tourne"], ["Un marin", "vire"], ["Une grutière", "tourne"], ["Un danseur", "tourne"], ["Une patineuse", "tourne"]] as const);
  return dg(pick([`${who} ${verbe} de ${mot.replace(/^un /, "").replace(/^trois quarts/, "trois quarts")}. De combien de degrés ?`, `${who} fait ${mot}. Combien de degrés cela fait-il ?`]), r, `Un tour complet mesure 360°. ${mot[0].toUpperCase()}${mot.slice(1)} : ${r}°.`);
}

// ----- ANGLE_COMPARER, ★1
function genCompOuvert(): G {
  const a = 10 * randomInt(2, 17);
  let b = a;
  while (Math.abs(b - a) < 20) b = 10 * randomInt(2, 17);
  const [n1, n2] = [nomAngle(), nomAngle()];
  const ouvert = Math.random() < 0.5;
  const r = ouvert ? Math.max(a, b) : Math.min(a, b);
  const mot = ouvert ? "le plus ouvert" : "le moins ouvert";
  return dg(
    pick([`Quel angle est ${mot} : ${a}° ou ${b}° ?`, `${n1.nom} = ${a}° et ${n2.nom} = ${b}°. Écris la mesure ${ouvert ? "la plus ouverte" : "la moins ouverte"}.`, `Écris l’angle ${mot} : ${a}° ou ${b}°.`, `Entre ${a}° et ${b}°, écris l’angle ${mot}.`]),
    r, `L’angle ${mot} a la mesure la plus ${ouvert ? "grande" : "petite"} : ${r}°.`, deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] }),
  );
}
function genCompVerdict(): G {
  const a = 10 * randomInt(2, 17);
  let b = a;
  while (Math.abs(b - a) < 20) b = 10 * randomInt(2, 17);
  const pourquoi = `On compare les nombres de degrés : ${a} et ${b}.`;
  const fig = deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] });
  return pick([
    () => vraiFaux(`Vrai ou faux : ${a}° est plus grand que ${b}°.`, a > b, pourquoi, fig),
    () => ouiNon(`${a}° est-il plus petit que ${b}° ?`, a < b, pourquoi, fig),
    () => ouiNon(`Un angle de ${a}° est-il plus grand qu’un angle de ${b}° ?`, a > b, pourquoi, fig),
    () => vraiFaux(`${a}° < ${b}°. Vrai ou faux ?`, a < b, pourquoi, fig),
    () => vraiFaux(`${a}° > ${b}°. Vrai ou faux ?`, a > b, pourquoi, fig),
    () => ouiNon(`Un angle de ${a}° est-il plus petit qu’un angle de ${b}° ?`, a < b, pourquoi, fig),
  ])();
}
function genCompCotes(): G {
  return pick<() => G>([
    () => ouiNon(pick(["On allonge les côtés d’un angle. Sa mesure change-t-elle ?", "Tu prolonges les côtés. La mesure de l’angle change-t-elle ?", "La longueur des côtés change-t-elle la mesure ?", "Des côtés plus longs changent-ils la mesure de l’angle ?"]), false, "La mesure dépend de l’ouverture, pas de la longueur des côtés."),
    () => qc(pick(["Pour comparer deux angles, que regardes-tu ?", "Qu’est-ce qui compte pour comparer deux angles ?", "Compare deux angles : que compares-tu ?"]), "leur ouverture", ["la longueur de leurs côtés", "la lettre du sommet", "la place sur la feuille"], "Seule l’ouverture compte."),
  ])();
}
function genCompEgaux(): G {
  const a = 10 * randomInt(2, 17);
  const egal = Math.random() < 0.5;
  const b = egal ? a : a + pick([-10, 10, 20]);
  const pourquoi = `Deux angles sont égaux s’ils ont la même mesure : ${a}° et ${b}°.`;
  return ouiNon(pick([`Deux angles mesurent ${a}° et ${b}°. Sont-ils égaux ?`, `${a}° et ${b}° : est-ce la même mesure ?`, `Ces angles sont-ils égaux : ${a}° et ${b}° ?`, `Un angle de ${a}° est-il égal à un angle de ${b}° ?`]), egal, pourquoi, deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] }));
}

// ----- ANGLE_COMPARER, ★2
function troisMesures() {
  const m: number[] = [];
  while (m.length < 3) {
    const v = mesure5(15, 175);
    if (m.every((x) => Math.abs(x - v) >= 15)) m.push(v);
  }
  return m;
}
function genCompRanger(): G {
  const m = troisMesures();
  const croissant = Math.random() < 0.5;
  const tri = [...m].sort((x, y) => (croissant ? x - y : y - x));
  const signe = croissant ? " < " : " > ";
  const ecr = (l: number[]) => l.map((x) => `${x}°`).join(signe);
  const txt = m.map((x) => `${x}°`).join(", ");
  return qc(
    croissant ? pick([`Range du plus petit au plus grand : ${txt}.`, `Range ces angles par ordre croissant : ${txt}.`, `Classe du plus petit au plus grand : ${txt}.`, `Quel rangement est juste, du plus petit au plus grand ? ${txt}.`]) : pick([`Range du plus grand au plus petit : ${txt}.`, `Range ces angles par ordre décroissant : ${txt}.`, `Classe du plus grand au plus petit : ${txt}.`, `Quel rangement est juste, du plus grand au plus petit ? ${txt}.`]),
    ecr(tri), [ecr([tri[1], tri[0], tri[2]]), ecr([tri[0], tri[2], tri[1]])], `On compare les nombres de degrés : ${ecr(tri)}.`,
  );
}
function genCompEntre(): G {
  const a = mesure5(20, 90);
  const b = a + 40 + 5 * randomInt(0, 6);
  const juste = a + 5 * randomInt(2, (b - a) / 5 - 2);
  const faux = [a - 10, b + 10, b + 30];
  return qc(pick([`Quelle mesure est entre ${a}° et ${b}° ?`, `Choisis un angle plus grand que ${a}° et plus petit que ${b}°.`, `Trouve la mesure comprise entre ${a}° et ${b}°.`, `Coche la mesure située entre ${a}° et ${b}°.`]), `${juste}°`, faux.map((x) => `${x}°`), `${a} < ${juste} < ${b}.`);
}
function genCompEcart(): G {
  const a = mesure5(60, 170);
  const b = mesure5(15, a - 15);
  const n = nomAngle();
  return dg(pick([`De combien de degrés ${a}° dépasse-t-il ${b}° ?`, `Calcule l’écart entre ${a}° et ${b}°.`, `Combien de degrés de plus a ${a}° que ${b}° ?`, `Quel est l’écart entre ces angles : ${b}° et ${a}° ?`, `Un angle mesure ${a}°, l’angle ${n.nom} ${b}°. Calcule leur écart.`]), a - b, `${a} − ${b} = ${a - b}.`, deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] }));
}
const RANG_NATURE = ["aigu", "droit", "obtus", "plat"];
function genCompNatures(): G {
  const i = randomInt(0, 2);
  const j = randomInt(i + 1, 3);
  const [X, Y] = Math.random() < 0.5 ? [RANG_NATURE[i], RANG_NATURE[j]] : [RANG_NATURE[j], RANG_NATURE[i]];
  const xPetit = RANG_NATURE.indexOf(X) < RANG_NATURE.indexOf(Y);
  const grand = xPetit ? Y : X;
  const pourquoi = `${REGLE_NATURE} Du plus petit au plus grand : aigu, droit, obtus, plat.`;
  return pick([
    () => ouiNon(`Un angle ${X} est-il plus petit qu’un angle ${Y} ?`, xPetit, pourquoi),
    () => vraiFaux(`Vrai ou faux : un angle ${X} est plus grand qu’un angle ${Y}.`, !xPetit, pourquoi),
    () => qc(`Lequel est le plus grand : un angle ${X} ou un angle ${Y} ?`, `un angle ${grand}`, [`un angle ${grand === X ? Y : X}`], pourquoi),
    () => qc(`Sans mesurer, quel angle est le plus petit : un angle ${X} ou un angle ${Y} ?`, `un angle ${grand === X ? Y : X}`, [`un angle ${grand}`], pourquoi),
  ])();
}
function genCompTroisDessin(): G {
  const [s, a, b, c] = lettres(4);
  const v1 = pick([30, 40, 50]);
  const v2 = v1 + pick([70, 80, 90]);
  const grand = Math.random() < 0.5;
  const noms = [`${a}${s}${b}`, `${b}${s}${c}`, `${a}${s}${c}`];
  const mes = [v1, v2 - v1, v2];
  const r = grand ? Math.max(...mes) : Math.min(...mes);
  const bon = noms[mes.indexOf(r)];
  const mot = grand ? "grand" : "petit";
  return qc(
    pick([`Observe la figure. Quel est le plus ${mot} des trois angles ?`, `Sans mesurer, choisis le plus ${mot} des trois angles.`, `Regarde les trois angles. Lequel est le plus ${mot} ?`, `Sur la figure, trouve le plus ${mot} angle.`]),
    `l’angle ${bon}`, noms.filter((x) => x !== bon).map((x) => `l’angle ${x}`), `On regarde l’ouverture : l’angle ${bon} est le plus ${mot}.`, figureRayons(s, [{ nom: a, deg: 5 }, { nom: b, deg: 5 + v1 }, { nom: c, deg: 5 + v2 }]),
  );
}
function genCompDePlus(): G {
  const a = mesure5(30, 120);
  const d = 5 * randomInt(2, 8);
  const plus = Math.random() < 0.5;
  const r = plus ? a + d : a - d;
  const n = nomAngle();
  return dg(
    plus ? pick([`Un angle mesure ${a}°. Un autre a ${d}° de plus. Combien mesure-t-il ?`, `L’angle ${n.nom} a ${d}° de plus qu’un angle de ${a}°. Calcule sa mesure.`, `Ajoute ${d}° à un angle de ${a}°. Quelle mesure obtiens-tu ?`]) : pick([`Un angle mesure ${a}°. Un autre a ${d}° de moins. Combien mesure-t-il ?`, `L’angle ${n.nom} a ${d}° de moins qu’un angle de ${a}°. Calcule sa mesure.`, `Retire ${d}° à un angle de ${a}°. Quelle mesure obtiens-tu ?`]),
    r, `${a} ${plus ? "+" : "−"} ${d} = ${r}.`, deuxAngles(a, r, { textes: [`${a}°`, "?"] }),
  );
}

// ----- ANGLE_COMPARER, ★3 : en situation
function genCompPentes(): G {
  const [qui, quoi] = pick([["Une architecte dessine", "deux rampes"], ["Un charpentier trace", "deux toits"], ["Une skieuse regarde", "deux pistes"], ["Un cycliste compare", "deux côtes"], ["Une ingénieure dessine", "deux routes de montagne"], ["Un paysagiste trace", "deux talus"]] as const);
  const a = 5 * randomInt(2, 9);
  let b = a;
  while (Math.abs(b - a) < 10) b = 5 * randomInt(2, 9);
  const raide = Math.random() < 0.5;
  const r = raide ? Math.max(a, b) : Math.min(a, b);
  const mot = raide ? "plus raide" : "plus douce";
  return dg(pick([`${qui} ${quoi} : ${a}° et ${b}° avec le sol. Quelle mesure est la pente la ${mot} ?`, `${qui} ${quoi}, à ${a}° et à ${b}°. Écris la mesure de la pente la ${mot}.`]), r, `Plus l’angle avec le sol est grand, plus la pente est raide. La pente la ${mot} : ${r}°.`);
}
function genCompPiegeCotes(): G {
  const [p, q] = deuxPrenoms();
  const a = 10 * randomInt(2, 8);
  const b = a + 10 * randomInt(2, 8);
  const grandLong = Math.random() < 0.5;
  const [va, vb] = grandLong ? [b, a] : [a, b];
  return dg(pick([`${p.nom} trace un angle de ${va}° à longs côtés. ${q.nom} trace un angle de ${vb}° à courts côtés. Quelle est la plus grande mesure ?`, `Au tableau, l’angle de ${p.nom} a de longs côtés : ${va}°. Celui de ${q.nom} a de petits côtés : ${vb}°. Écris la plus grande mesure.`]), Math.max(a, b), `La longueur des côtés ne compte pas. On compare les degrés : ${Math.max(a, b)}° est le plus grand.`,
    // Le piège se VOIT : à gauche les longs côtés, à droite les courts.
    deuxAngles(va, vb, { textes: [`${va}°`, `${vb}°`], longs: [5.5, 2.2] }));
}
function genCompOuvrir(): G {
  const p = pick(PRENOMS);
  const o = pick(OUVRABLES);
  const a = 10 * randomInt(Math.ceil(o.min / 10), Math.floor(o.max / 10) - 2);
  const b = a + 10 * randomInt(2, Math.floor((o.max - a) / 10));
  const elle = p.f ? "elle" : "il";
  return dg(pick([`${p.nom} ouvre ${o.son} à ${a}°, puis à ${b}°. De combien de degrés l’ouverture a-t-elle grandi ?`, `${p.nom} ouvre ${o.son} : d’abord ${a}°, ensuite ${b}°. Calcule l’écart entre ces deux ouvertures.`, `D’abord, ${p.nom} ouvre ${o.son} à ${a}°. Puis ${elle} l’amène à ${b}°. De combien a-t-${elle} ouvert en plus ?`]), b - a, `${b} − ${a} = ${b - a}.`, deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] }));
}
function genCompHorloge(): G {
  const p = pick(PRENOMS);
  const h1 = randomInt(1, 5);
  let h2 = h1;
  while (h2 === h1) h2 = randomInt(1, 5);
  const grand = Math.random() < 0.5;
  const r = (h1 > h2) === grand ? h1 : h2;
  const mot = grand ? "grand" : "petit";
  return qc(pick([`${p.nom} regarde l’horloge à ${h1} h, puis à ${h2} h. À quelle heure l’angle des aiguilles est-il le plus ${mot} ?`, `Compare l’angle des aiguilles d’une horloge à ${h1} h et à ${h2} h. Quand est-il le plus ${mot} ?`]), `à ${r} h`, [`à ${r === h1 ? h2 : h1} h`, "c’est le même angle"], `Chaque heure ajoute 30° entre 12 h et 6 h : ${h1 * 30}° à ${h1} h, ${h2 * 30}° à ${h2} h.`);
}

// ----- ANGLE_MESURER, ★1
function genMesRapporteur(double: boolean): G {
  const v = 10 * pick([2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 16]);
  const n = nomAngle();
  const nat = v < 90 ? "aigu" : "obtus";
  const t = double
    ? pick([`L’angle ${n.nom} est ${nat}. Que lis-tu sur le rapporteur ?`, `Deux graduations : quelle est la mesure de l’angle ${n.nom}, qui est ${nat} ?`, `Le 0 est sur un côté. Lis la mesure de l’angle ${n.nom}.`, `Regarde la bonne graduation. Combien mesure l’angle ${n.nom} ?`, `Observe si l’angle ${n.nom} est aigu ou obtus. Choisis sa mesure.`, `Lis la mesure de l’angle ${n.nom} sur la bonne graduation.`])
    : pick([`Lis la mesure de l’angle ${n.nom}.`, `Observe le rapporteur. Combien mesure l’angle ${n.nom} ?`, `Le rapporteur est sur l’angle ${n.nom}. Choisis sa mesure.`, `Regarde le rapporteur. Quelle est la mesure de l’angle ${n.nom} ?`, `Que lis-tu pour l’angle ${n.nom} ?`, `Quelle graduation donne l’angle ${n.nom} ?`]);
  return qc(t, `${v}°`, [...new Set([180 - v, v + 10, v - 10])].filter((x) => x !== v).map((x) => `${x}°`), `Le 0 est sur un côté. L’autre côté passe par ${v}. L’angle est ${nat} : ${v}° convient, pas ${180 - v}°.`, angleAuRapporteur(v, { sommet: n.s, gauche: n.g, droite: n.d }, double ? "double" : "simple"));
}
function genMesSymbole(): G {
  const v = mesure5(15, 170);
  const mode = pick(["sens", "lire", "ecrire", "unite"] as const);
  if (mode === "sens")
    return qc(pick([`Dans ${v}°, que veut dire le petit rond ?`, "Que veut dire le symbole ° ?", `Que signifie le ° dans ${v}° ?`]), "degrés", ["centimètres", "minutes", "grammes"], "Le symbole ° veut dire degrés.");
  if (mode === "lire")
    return qc(pick([`Comment lis-tu ${v}° ?`, `Lis cette mesure : ${v}°. Que dis-tu ?`, `Comment dit-on ${v}° à voix haute ?`]), `${v} degrés`, [`${v} centimètres`, `${v} ronds`, `${v} mètres`], `${v}° se lit « ${v} degrés ».`);
  if (mode === "ecrire")
    return qc(pick([`Écris ${v} degrés avec le symbole.`, `Comment écrit-on ${v} degrés ?`, `Choisis l’écriture de ${v} degrés.`]), `${v}°`, [`${v} cm`, `${v} m`, `${v} g`], `${v} degrés s’écrit ${v}°.`);
  return qc(pick(["Quelle écriture est une mesure d’angle ?", "Coche la mesure d’un angle.", "Choisis la mesure qui convient à un angle."]), `${v}°`, [`${v} cm`, `${v} g`, `${v} min`], "Un angle se mesure en degrés.");
}
function genMesGeste(): G {
  const P = ["sur le sommet", "sur un côté", "au milieu de l’angle", "en dehors de l’angle"];
  const quoi = pick(["centre", "centre", "zero", "lecture"] as const);
  if (quoi === "centre")
    return qc(pick(["Où poses-tu le centre du rapporteur ?", "Le centre du rapporteur va où ?", "Sur quel point de l’angle poses-tu le centre ?", "Mesure un angle : où va le centre du rapporteur ?"]), P[0], P.slice(1), "Le centre du rapporteur se pose sur le sommet.");
  if (quoi === "zero")
    return qc(pick(["Où poses-tu le 0 du rapporteur ?", "Le 0 du rapporteur va où ?", "Mesure un angle : où places-tu le 0 ?"]), P[1], [P[0], P[2], P[3]], "Le 0 du rapporteur se place sur un côté de l’angle.");
  return qc(pick(["Le 0 est sur un côté. Où lis-tu la mesure ?", "Où lis-tu la mesure sur le rapporteur ?"]), "sur l’autre côté", ["sur le sommet", "sur le même côté", "au centre du rapporteur"], "On lit la mesure là où passe l’autre côté.");
}
function genMesEstimer(): G {
  const n = nomAngle();
  const t = pick([30, 90, 150]);
  const v = t === 90 ? 90 : t + pick([-5, 0, 5]);
  return qc(
    pick(["À l’œil, cet angle mesure environ :", "Sans rapporteur, choisis la mesure de cet angle.", "Estime la mesure de cet angle.", `Observe l’angle ${n.nom}. Quelle mesure est possible ?`, `Regarde l’ouverture de l’angle ${n.nom}. Il mesure environ :`, "Quelle mesure ressemble à cet angle ?"]),
    `${t}°`, [30, 90, 150].filter((x) => x !== t).map((x) => `${x}°`), `On compare au coin de l’équerre : l’angle mesure environ ${t}°.`, figureAngle(v, n),
  );
}
function genMesQuoi(): G {
  const mode = pick(["rapporteur", "regle", "angle"] as const);
  if (mode === "rapporteur")
    return qc(pick(["Que mesure un rapporteur ?", "Un rapporteur sert à mesurer quoi ?", "Avec un rapporteur, que mesures-tu ?"]), "des angles", ["des longueurs", "des masses", "des durées"], "Le rapporteur mesure des angles, en degrés.");
  if (mode === "regle")
    return qc(pick(["Quel instrument mesure une longueur ?", "Avec quoi mesures-tu la longueur d’un côté ?"]), "une règle graduée", ["un rapporteur", "un compas", "une équerre"], "Une longueur se mesure à la règle graduée. Le rapporteur mesure les angles.");
  return qc(pick(["Quel instrument mesure un angle de 37° ?", "Quel instrument donne la mesure d’un angle aigu ?", "Avec quoi mesures-tu un angle obtus ?"]), "un rapporteur", ["une règle graduée", "un compas", "une équerre"], "Seul le rapporteur est gradué en degrés.");
}
function genMesBornes(): G {
  const n = nomAngle();
  const canvas = angleAuRapporteur(10 * randomInt(2, 8), { sommet: n.s, gauche: n.g, droite: n.d });
  if (Math.random() < 0.6)
    return nb(pick(["Observe ce rapporteur. Quelle est sa plus grande graduation ?", "Ce rapporteur va de 0 à combien ?", "Quel nombre finit la graduation de ce rapporteur ?", "Regarde ce rapporteur. Quel est son dernier nombre ?"]), 180, "Ce rapporteur va de 0° à 180°.", canvas);
  return nb(pick(["Observe ce rapporteur. Par quel nombre commence-t-il ?", "Quel nombre commence la graduation de ce rapporteur ?"]), 0, "La graduation commence à 0.", canvas);
}

// ----- ANGLE_MESURER, ★2
function genMesLecture(): G {
  const v = pick([20, 30, 40, 50, 60, 70, 80, 100, 110, 120, 130, 140, 150, 160]);
  const nat = v < 90 ? "aigu" : "obtus";
  const [x, y] = shuffle([v, 180 - v]);
  return qc(
    pick([`Tu lis ${x}° et ${y}°. L’angle est ${nat}. Choisis sa mesure.`, `Deux lectures : ${x}° et ${y}°. L’angle est ${nat}. Laquelle convient ?`, `Un angle ${nat} : laquelle convient, ${x}° ou ${y}° ?`, `Pour un angle ${nat}, choisis la bonne lecture : ${x}° ou ${y}°.`, `Angle ${nat}. Le rapporteur donne ${x}° et ${y}°. Quelle est sa mesure ?`]),
    `${v}°`, [`${180 - v}°`], `Un angle ${nat} mesure ${v < 90 ? "moins" : "plus"} de 90° : c’est ${v}°.`, angleTrace(v, null, "", { mesure: "?" }),
  );
}
function genMesPossible(): G {
  const nat = pick(["aigu", "obtus"]);
  const w = mesureFranche();
  const n = nomAngle();
  const ok = natureAngle(w) === nat;
  const pourquoi = `Un angle ${nat} mesure ${nat === "aigu" ? "moins" : "plus"} de 90°. ${w}° ${ok ? "convient" : "ne convient pas : c’est l’autre graduation"}.`;
  return ouiNon(pick([`Un angle est ${nat}. Peut-il mesurer ${w}° ?`, `L’angle ${n.nom} est ${nat}. Une lecture donne ${w}°. Est-ce possible ?`, `Angle ${nat} lu à ${w}° : est-ce possible ?`, `Tu lis ${w}° pour un angle ${nat}. Cette lecture est-elle juste ?`]), ok, pourquoi);
}
function genMesEtapes(): G {
  const n = nomAngle();
  const e = [`poser le centre sur ${n.s}`, "mettre le 0 sur un côté", "lire la mesure sur l’autre côté"];
  const leurre = "tracer un cercle";
  const k = randomInt(0, 2);
  const t = k === 0
    ? pick([`Tu mesures l’angle ${n.nom}. Que fais-tu en premier ?`, `Quelle est la première étape pour mesurer l’angle ${n.nom} ?`])
    : k === 1
      ? pick([`Le centre est posé sur ${n.s}. Que fais-tu ensuite pour l’angle ${n.nom} ?`, `Angle ${n.nom} : quelle est la deuxième étape de la mesure ?`])
      : pick([`Tu mesures l’angle ${n.nom}. Que fais-tu en dernier ?`, `Quelle est la dernière étape pour mesurer l’angle ${n.nom} ?`]);
  return qc(t, e[k], [...e.filter((_, i) => i !== k), leurre], `Dans l’ordre : ${e.join(", ")}.`, angleTrace(mesureFranche(), n, t, { mesure: "rien" }));
}
function genMesEstimerFin(): G {
  const n = nomAngle();
  const v = 10 * pick([3, 4, 5, 6, 12, 13, 14, 15]);
  const faux = [v + 40, v - 40 > 0 ? v - 40 : v + 80, v + 80 <= 175 ? v + 80 : v - 80 > 0 ? v - 80 : v + 60].filter((x, i, a) => x > 0 && x < 180 && x !== v && a.indexOf(x) === i);
  return qc(pick([`Estime la mesure de l’angle ${n.nom}.`, `Sans rapporteur, quelle mesure convient à l’angle ${n.nom} ?`, `Regarde l’angle ${n.nom}. Quelle mesure semble juste ?`, `À l’œil, combien mesure l’angle ${n.nom} ?`]), `${v}°`, faux.map((x) => `${x}°`), `L’angle est ${v < 90 ? "aigu" : "obtus"} : ${v}° est la mesure la plus proche.`, figureAngle(v, n));
}
function genMesGraduations(): G {
  const a = 10 * randomInt(1, 6);
  const b = a + 10 * randomInt(3, 10);
  if (Math.random() < 0.35) return dg(pick([`Le 0 est sur un côté. L’autre côté passe par ${b}. Combien mesure l’angle ?`, `Un côté est sur le 0, l’autre sur ${b}. Donne la mesure de l’angle.`]), b, `L’angle se lit directement : ${b}°.`);
  return dg(pick([`Un côté passe par ${a}, l’autre par ${b}. Combien mesure l’angle ?`, `Les côtés passent par ${a} et ${b}. Calcule l’angle.`, `Le 0 est mal placé : côtés sur ${a} et ${b}. Calcule l’angle.`, `Sur le rapporteur, les côtés sont à ${a} et à ${b}. Trouve l’angle.`]), b - a, `On compte l’écart entre les graduations : ${b} − ${a} = ${b - a}.`);
}

// ----- ANGLE_TRACER, ★1
function genTrInstrument(): G {
  const v = mesure5(20, 160, [90]);
  if (Math.random() < 0.25)
    return qc(pick(["Tu traces un angle de 90°. Quel outil est le plus rapide ?", "Pour tracer vite 90°, que prends-tu ?"]), "une équerre", ["un compas", "une gomme", "un crayon"], "L’équerre a un coin droit : elle trace 90° d’un seul geste.", figureMesure(90, null, "", { droit: true }));
  return qc(pick([`Quel instrument trace un angle de ${v}° ?`, `Tu traces ${v}°. Que prends-tu ?`, `Que prends-tu pour tracer un angle de ${v}° ?`, `Pour tracer ${v}°, quel outil gradué prends-tu ?`, `Choisis l’instrument pour tracer ${v}°.`, `Trace un angle de ${v}° : quel instrument faut-il ?`]), "un rapporteur", ["une équerre", "un compas", "une gomme"], `Pour obtenir ${v}°, il faut un instrument gradué en degrés : le rapporteur.`, figureMesure(v, null, ""));
}
function genTrCotes(): G {
  const n = nomAngle();
  const mode = pick(["combien", "origine", "sommet", "nom"] as const);
  if (mode === "combien")
    return nb(pick(["Combien de demi-droites traces-tu pour un angle ?", "Pour tracer un angle, combien de côtés traces-tu ?", "Tu traces un angle : combien de traits droits ?"]), 2, "Un angle a deux côtés : deux demi-droites.");
  if (mode === "origine")
    return qc(pick([`Tu traces l’angle ${n.nom}. D’où part chaque côté ?`, `Angle ${n.nom} à tracer : de quel point partent les côtés ?`]), n.s, [n.g, n.d], `Les deux côtés partent du sommet ${n.s}.`);
  if (mode === "sommet")
    return lt(pick([`Tu traces l’angle ${n.nom}. Quel point est le sommet ?`, `Avant de tracer ${n.nom}, écris son sommet.`, `Tu dois tracer l’angle ${n.nom}. Écris le sommet.`]), [n.s], `Le sommet est la lettre du milieu : ${n.s}.`);
  return qc(pick([`Tu traces [${n.s}${n.g}) et [${n.s}${n.d}). Quel angle obtiens-tu ?`, `Quel angle donnent [${n.s}${n.g}) et [${n.s}${n.d}) ?`]), n.nom, [`${n.s}${n.g}${n.d}`, `${n.g}${n.d}${n.s}`], `Le sommet ${n.s} s’écrit au milieu : ${n.nom}.`);
}
function genTrRepere(): G {
  const v = mesure5(20, 160, [90]);
  const n = nomAngle();
  const faux = [...new Set([180 - v, v + 10, v - 10])].filter((x) => x !== v);
  return qc(pick([`Tu traces un angle de ${v}°. Quelle graduation cherches-tu ?`, `Tu veux ${v}°. À quelle graduation fais-tu le repère ?`, `Repère à quelle graduation pour ${v}° ?`, `Angle ${n.nom} de ${v}° : où fais-tu le repère ?`, `Le 0 est sur un côté. Quel repère pour ${v}° ?`, `Trace ${v}° : quel nombre repères-tu ?`, `Pour obtenir ${v}°, quelle graduation vises-tu ?`]), `${v}°`, faux.map((x) => `${x}°`), `On compte à partir du 0 jusqu’à ${v}.`, figureMesure(v, null, "", { mesure: "rien" }));
}
function genTrNature(): G {
  const v = mesureFranche();
  const juste = natureAngle(v);
  if (Math.random() < 0.6)
    return qc(pick([`Tu traces ${v}°. Cet angle sera-t-il aigu ou obtus ?`, `Angle à tracer : ${v}°. Il sera aigu ou obtus ?`, `Tu vas tracer ${v}°. Quelle sera sa nature ?`, `Prévois la nature d’un angle de ${v}° à tracer.`, `Avant de tracer ${v}° : aigu ou obtus ?`]), juste, [juste === "aigu" ? "obtus" : "aigu"], `${v}° est ${v < 90 ? "plus petit" : "plus grand"} que 90°.`, figureMesure(v, null, "", { mesure: "rien" }));
  const a = pick(["aigu", "obtus"]);
  return ouiNon(pick([`Tu traces ${v}°. L’angle sera-t-il ${a} ?`, `Un tracé de ${v}° donne-t-il un angle ${a} ?`]), juste === a, `${v}° est ${v < 90 ? "plus petit" : "plus grand"} que 90° : l’angle sera ${juste}.`, figureMesure(v, null, "", { mesure: "rien" }));
}
function genTrVerifier(): G {
  const n = nomAngle();
  const v = 10 * pick([3, 4, 5, 6, 7, 11, 12, 13, 14, 15]);
  const juste = Math.random() < 0.5;
  const d = juste ? v : pick([180 - v, v + 20]);
  return ouiNon(
    pick([`On demande ${d}°. Ce tracé est-il juste ?`, `Tu devais tracer ${d}°. Est-ce réussi ?`, `L’angle ${n.nom} doit mesurer ${d}°. Est-ce le cas ?`, `Tracé demandé : ${d}°. Le rapporteur le confirme-t-il ?`, `Regarde le rapporteur. L’angle mesure-t-il ${d}° ?`]),
    juste, `Le rapporteur indique ${v}°, ${juste ? "c’est bien ce qui est demandé" : `pas ${d}°`}.`, angleAuRapporteur(v, { sommet: n.s, gauche: n.g, droite: n.d }),
  );
}
function genTrPoser(): G {
  const n = nomAngle();
  if (Math.random() < 0.5)
    return qc(pick([`Tu traces l’angle ${n.nom}. Où poses-tu le centre du rapporteur ?`, `Angle ${n.nom} : où va le centre du rapporteur ?`, `Pour tracer ${n.nom}, sur quel point va le centre ?`, `Trace l’angle ${n.nom} : sur quel point mets-tu le centre ?`, `Choisis la place du centre pour tracer ${n.nom}.`]), `sur ${n.s}`, [`sur ${n.g}`, `sur ${n.d}`], `Le centre va sur le sommet, la lettre du milieu : ${n.s}.`);
  return qc(pick([`[${n.s}${n.d}) est tracée. Où poses-tu le 0 du rapporteur ?`, `Tu as tracé [${n.s}${n.d}). Où mets-tu le 0 ?`, `Après [${n.s}${n.d}), où va le 0 du rapporteur ?`]), `sur [${n.s}${n.d})`, [`sur ${n.g}`, `sur [${n.g}${n.d}]`], `Le 0 se pose sur le côté déjà tracé : [${n.s}${n.d}).`);
}

// ----- ANGLE_TRACER, ★2
function genTrSuite(): G {
  const n = nomAngle();
  const v = mesure5(20, 160, [90]);
  return qc(pick([`[${n.s}${n.d}) est tracée, le repère est à ${v}°. Que traces-tu pour l’angle ${n.nom} ?`, `Angle ${n.nom} de ${v}°. Il reste à tracer quel côté après [${n.s}${n.d}) ?`, `Tu as [${n.s}${n.d}) et un repère à ${v}°. Quel côté traces-tu pour ${n.nom} ?`, `Pour finir l’angle ${n.nom}, quel côté rejoint le repère ? [${n.s}${n.d}) est tracée.`]), `[${n.s}${n.g})`, [`[${n.g}${n.s})`, `[${n.g}${n.d})`, `[${n.d}${n.g})`], `Le second côté part du sommet ${n.s} et passe par le repère : [${n.s}${n.g}).`);
}
function genTrErreur(): G {
  const v = mesureFranche();
  const vu = pick(["aigu", "obtus"]);
  const ok = natureAngle(v) === vu;
  return ouiNon(pick([`Tu devais tracer ${v}°. Ton angle est ${vu}. Est-ce possible ?`, `Tu traces ${v}° et tu vois un angle ${vu}. Ton tracé est-il juste ?`, `Angle demandé : ${v}°. Angle obtenu : ${vu}. Le tracé peut-il être juste ?`, `Tu vises ${v}°. Le résultat est ${vu}. La graduation est-elle la bonne ?`]), ok, `${v}° donne un angle ${natureAngle(v)}.${ok ? "" : " Tu as lu la mauvaise graduation."}`);
}
function genTrCalcul(): G {
  const a = mesure5(20, 80);
  const b = mesure5(20, 80);
  const m = 10 * randomInt(2, 8) * 2;
  const mode = pick(["double", "moitie", "somme"] as const);
  if (mode === "double") return dg(pick([`Trace le double de ${a}°. Quelle mesure traces-tu ?`, `Angle à tracer : le double de ${a}°. Quel repère fais-tu ?`]), 2 * a, `2 × ${a} = ${2 * a}.`);
  if (mode === "moitie") return dg(pick([`Trace la moitié de ${m}°. Quel repère fais-tu ?`, `Angle à tracer : la moitié de ${m}°. Quelle mesure traces-tu ?`]), m / 2, `${m} ÷ 2 = ${m / 2}.`);
  return dg(pick([`Tu traces ${a}° puis ${b}° côte à côte. Quel angle total obtiens-tu ?`, `Deux angles côte à côte : ${a}° et ${b}°. Quelle mesure a l’angle total ?`]), a + b, `${a} + ${b} = ${a + b}.`, rayonsSansNom([10, 10 + a, 10 + a + b]));
}
function genTrEquerre(): G {
  const v = Math.random() < 0.45 ? 90 : mesure5(20, 160, [90]);
  const ok = v === 90;
  return ouiNon(pick([`Tu traces un angle de ${v}°. L’équerre suffit-elle ?`, `Peux-tu tracer ${v}° avec la seule équerre ?`, `Angle de ${v}° : l’équerre seule convient-elle ?`, `L’équerre seule trace-t-elle un angle de ${v}° ?`]), ok, ok ? "Le coin de l’équerre fait 90°." : `L’équerre ne donne que 90°. Pour ${v}°, il faut le rapporteur.`, figureMesure(v, null, "", { mesure: "rien" }));
}

// ----- ANGLE_DEFI, ★4
function genDefiParts(): G {
  const p = pick(PRENOMS);
  const k = pick([4, 5, 6, 8, 9, 10, 12]);
  const m = randomInt(2, k - 2);
  const [quoi, partage] = pick([["une pizza ronde", "partagée"], ["une tarte", "partagée"], ["un gâteau rond", "partagé"], ["une galette", "partagée"], ["un disque de carton", "partagé"]] as const);
  const r = (360 / k) * m;
  const pourquoi = `Le tour complet mesure 360°. Une part : 360 ÷ ${k} = ${360 / k}°. ${m} parts : ${m} × ${360 / k} = ${r}°.`;
  return dg(pick([
    `${p.nom} coupe ${quoi} en ${k} parts égales, depuis le centre. ${p.f ? "Elle" : "Il"} prend ${m} parts. Quel angle forment ces ${m} parts ?`,
    `${quoi[0].toUpperCase()}${quoi.slice(1)} est ${partage} en ${k} parts égales depuis le centre. Calcule l’angle formé par ${m} parts côte à côte.`,
    `Un cercle est coupé en ${k} parts égales. Combien mesure l’angle de ${m} parts côte à côte ?`,
    `Une roue a ${k} rayons régulièrement espacés. Quel angle forment ${m + 1} rayons voisins, du premier au dernier ?`,
    `Sur ${quoi}, on trace ${k} parts égales. Quel est l’angle total de ${m} parts voisines ?`,
  ]), r, pourquoi, rayonsSansNom(Array.from({ length: k }, (_, i) => 90 + (i * 360) / k)));
}
function genDefiMinutes(): G {
  const p = pick(PRENOMS);
  const m = 5 * randomInt(1, 11);
  const h = randomInt(1, 5);
  const mode = pick(["minutes", "minutes", "heures", "heures"] as const);
  if (mode === "minutes") {
    const r = m * 6;
    return dg(pick([
      `En 60 minutes, la grande aiguille fait un tour. De combien de degrés tourne-t-elle en ${m} minutes ?`,
      `${p.nom} attend ${m} minutes. De quel angle a tourné la grande aiguille de sa montre ?`,
      `Un tour complet dure 60 minutes pour la grande aiguille. Quel angle fait-elle en ${m} minutes ?`,
      `La grande aiguille d’une horloge avance de ${m} minutes. Calcule l’angle parcouru.`,
    ]), r, `360 ÷ 60 = 6° par minute. ${m} × 6 = ${r}°.`);
  }
  return dg(pick([
    `Les 12 heures font le tour de l’horloge. Quel angle font les aiguilles à ${h} h pile ?`,
    `À ${h} h pile, quel angle mesurent les deux aiguilles d’une horloge ?`,
    `${p.nom} regarde l’horloge à ${h} h. Combien de degrés entre les aiguilles ?`,
    `Entre deux heures voisines, l’horloge compte 30°. Quel angle voit-on à ${h} h pile ?`,
  ]), h * 30, `360 ÷ 12 = 30° par heure. ${h} × 30 = ${h * 30}°.`);
}
function genDefiTroisAngles(): G {
  const [s, a, b, c, d] = lettres(5);
  const plat = Math.random() < 0.5;
  const total = plat ? 180 : 90;
  const x = 5 * randomInt(2, plat ? 11 : 6);
  const y = 5 * randomInt(2, plat ? 11 : 6);
  const r = total - x - y;
  if (r < 10) return genDefiTroisAngles();
  const fig = figureRayons(s, [{ nom: a, deg: 0 }, { nom: b, deg: x }, { nom: c, deg: x + y }, { nom: d, deg: total }]);
  const debut = plat ? `Les points ${a}, ${s} et ${d} sont alignés.` : `L’angle ${a}${s}${d} est droit.`;
  const pourquoi = `L’angle ${a}${s}${d} mesure ${total}°. ${total} − ${x} − ${y} = ${r}°.`;
  return dg(pick([
    `${debut} L’angle ${a}${s}${b} mesure ${x}° et l’angle ${b}${s}${c} mesure ${y}°. Combien mesure l’angle ${c}${s}${d} ?`,
    `${debut} On sait : l’angle ${a}${s}${b} mesure ${x}°, l’angle ${b}${s}${c} mesure ${y}°. Calcule l’angle ${c}${s}${d}.`,
    `L’angle ${a}${s}${b} mesure ${x}° et l’angle ${b}${s}${c} mesure ${y}°. ${debut} Trouve l’angle ${c}${s}${d}.`,
  ]), r, pourquoi, fig);
}
function genDefiTours(): G {
  const p = pick(PRENOMS);
  const [m1, v1] = pick([["un quart de tour", 90], ["un demi-tour", 180]] as const);
  const [m2, v2] = pick([["un quart de tour", 90], ["un demi-tour", 180], ["trois quarts de tour", 270]] as const);
  const r = v1 + v2;
  const pourquoi = `${m1} : ${v1}°. ${m2} : ${v2}°. ${v1} + ${v2} = ${r}°.`;
  const qui = pick(["Une danseuse", "Un patineur", "Une pilote de drone", "Un robot", "Une gymnaste"]);
  return dg(pick([
    `${qui} fait ${m1}, puis ${m2} dans le même sens. De combien de degrés a-t-on tourné en tout ?`,
    `${p.nom} programme un robot : ${m1}, puis ${m2}, toujours dans le même sens. Calcule l’angle total.`,
    `Dans le même sens : ${m1}, puis ${m2}. Combien de degrés au total ?`,
    `${qui} enchaîne ${m1} et ${m2}, sans changer de sens. Quel angle au total ?`,
  ]), r, pourquoi);
}

// ----- ANGLE_DEFI, ★5
function genDefiMoitie(): G {
  const [s, a, b, c] = lettres(4);
  const m = 5 * randomInt(4, 16);
  const fig = figureRayons(s, [{ nom: a, deg: 0 }, { nom: b, deg: m }, { nom: c, deg: 2 * m }]);
  if (Math.random() < 0.5)
    return dg(pick([
      `La demi-droite [${s}${b}) partage l’angle ${a}${s}${c} en deux angles égaux. L’angle ${a}${s}${c} mesure ${2 * m}°. Combien mesure l’angle ${a}${s}${b} ?`,
      `L’angle ${a}${s}${c} mesure ${2 * m}°. [${s}${b}) le coupe en deux angles égaux. Calcule l’angle ${b}${s}${c}.`,
      `L’angle ${a}${s}${c} mesure ${2 * m}°. Il contient deux angles égaux, séparés par [${s}${b}). Combien mesure l’angle ${b}${s}${c} ?`,
    ]), m, `Deux angles égaux : ${2 * m} ÷ 2 = ${m}°.`, fig);
  return dg(pick([
    `La demi-droite [${s}${b}) partage l’angle ${a}${s}${c} en deux angles égaux. L’angle ${a}${s}${b} mesure ${m}°. Combien mesure l’angle ${a}${s}${c} ?`,
    `L’angle ${a}${s}${b} mesure ${m}°. [${s}${b}) coupe l’angle ${a}${s}${c} en deux angles égaux. Calcule l’angle ${a}${s}${c}.`,
      `L’angle ${a}${s}${b} mesure ${m}°. L’angle ${a}${s}${c} contient deux angles égaux, séparés par [${s}${b}). Combien mesure l’angle ${a}${s}${c} ?`,
  ]), 2 * m, `Le grand angle vaut le double : 2 × ${m} = ${2 * m}°.`, fig);
}
function genDefiFoisPlus(): G {
  const plat = Math.random() < 0.6;
  const total = plat ? 180 : 90;
  const nom = plat ? "plat" : "droit";
  const k = plat ? pick([2, 3, 4, 5, 8, 9]) : pick([2, 4, 5, 9]);
  const petit = total / (k + 1);
  const veutPetit = Math.random() < 0.5;
  const r = veutPetit ? petit : k * petit;
  const mot = veutPetit ? "petit" : "grand";
  const fois = k === 2 ? "le double de" : k === 3 ? "le triple de" : `${k} fois`;
  return dg(pick([
    `Deux angles côte à côte forment un angle ${nom}. L’un mesure ${fois} l’autre. Combien mesure le plus ${mot} ?`,
    `Un angle ${nom} est coupé en deux angles. Le plus grand mesure ${fois} le plus petit. Calcule le plus ${mot}.`,
    `On partage un angle ${nom} en deux. Un des deux angles vaut ${fois} l’autre. Quelle est la mesure du plus ${mot} ?`,
    `Deux angles ont pour somme un angle ${nom}. L’un vaut ${fois} l’autre. Trouve le plus ${mot}.`,
  ]), r, `L’angle ${nom} fait ${k + 1} parts égales : ${total} ÷ ${k + 1} = ${petit}°. Le grand : ${k} × ${petit} = ${k * petit}°.`, rayonsSansNom([0, petit, total]));
}
function genDefiCroixSomme(): G {
  const [A, B, C, D, O] = lettres(5);
  const a = 5 * pick([5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 20, 22, 25, 28, 30]);
  const fig = figureRayons(O, [{ nom: A, deg: 0 }, { nom: C, deg: a }, { nom: B, deg: 180 }, { nom: D, deg: 180 + a }]);
  const debut = pick([`Les droites (${A}${B}) et (${C}${D}) se coupent en ${O}.`, `(${A}${B}) et (${C}${D}) se croisent en ${O}.`]);
  const m = `L’angle ${A}${O}${C} mesure ${a}°.`;
  const mode = pick(["deux_opposes", "voisin_plus", "quatre", "tous_sauf"] as const);
  if (mode === "deux_opposes")
    return dg(`${debut} ${m} ${pick(["Calcule", "Trouve", "Donne"])} la somme des angles ${A}${O}${C} et ${B}${O}${D}.`, 2 * a, `Ces deux angles sont opposés par le sommet : ${a} + ${a} = ${2 * a}°.`, fig);
  if (mode === "voisin_plus")
    return dg(`${debut} ${m} ${pick(["Calcule", "Trouve", "Donne"])} la somme des angles ${A}${O}${C} et ${C}${O}${B}.`, 180, `${A}, ${O} et ${B} sont alignés : la somme vaut 180°, quelle que soit la mesure de l’angle.`, fig);
  if (mode === "quatre")
    return dg(`${debut} ${m} ${pick(["Quelle est la somme", "Que vaut la somme"])} des quatre angles autour de ${O} ?`, 360, `Les quatre angles font le tour de ${O} : 360°.`, fig);
  return dg(`${debut} ${m} Trois des quatre angles sont ${A}${O}${C}, ${C}${O}${B} et ${B}${O}${D}. ${pick(["Calcule", "Trouve", "Donne"])} leur somme.`, 180 + a, `${a} + ${180 - a} + ${a} = ${180 + a}°.`, fig);
}
function genDefiRayons(): G {
  const k = pick([3, 4, 5, 6, 8, 9, 10, 12]);
  const r = 360 / k;
  if (Math.random() < 0.5)
    return dg(pick([
      `${k} demi-droites de même origine partagent le tour en ${k} angles égaux. Combien mesure chaque angle ?`,
      `Autour d’un point, ${k} angles égaux font un tour complet. Calcule la mesure d’un angle.`,
      `Une étoile a ${k} branches régulières. Quel angle sépare deux branches voisines ?`,
    ]), r, `Un tour complet : 360°. 360 ÷ ${k} = ${r}°.`, rayonsSansNom(Array.from({ length: k }, (_, i) => 90 + i * r)));
  return nb(pick([
    `Autour d’un point, des angles de ${r}° font un tour complet. Combien y a-t-il d’angles ?`,
    `Un tour complet est coupé en angles égaux de ${r}°. Combien d’angles obtient-on ?`,
    `Une roue a des rayons espacés de ${r}°. Combien de rayons a-t-elle ?`,
    `Une étoile a des branches espacées de ${r}°. Combien de branches a-t-elle ?`,
  ]), k, `360 ÷ ${r} = ${k}.`);
}
function genDefiHeures(): G {
  const p = pick(PRENOMS);
  const h1 = randomInt(1, 3);
  const h2 = randomInt(h1 + 1, 6);
  if (Math.random() < 0.5)
    return dg(pick([
      `L’angle des aiguilles est mesuré à ${h1} h, puis à ${h2} h. De combien a-t-il grandi ?`,
      `${p.nom} note l’angle des aiguilles à ${h1} h et à ${h2} h. Calcule l’écart entre les deux.`,
    ]), (h2 - h1) * 30, `À ${h1} h : ${h1 * 30}°. À ${h2} h : ${h2 * 30}°. Écart : ${(h2 - h1) * 30}°.`);
  const r = h2 * 30;
  return nb(pick([
    `Entre 12 h et 6 h, à quelle heure pile les aiguilles font-elles ${r}° ?`,
    `${p.nom} voit un angle de ${r}° entre les aiguilles, entre 12 h et 6 h. Quelle heure pile est-il ?`,
  ]), h2, `${r} ÷ 30 = ${h2} : il est ${h2} h.`);
}
function genDefiPartageInegal(): G {
  const [s, a, b, c, d] = lettres(5);
  const x = 5 * randomInt(3, 9);
  const y = 5 * randomInt(3, 12);
  const T = 2 * x + y;
  if (T >= 175) return genDefiPartageInegal();
  const fig = figureRayons(s, [{ nom: a, deg: 0 }, { nom: b, deg: x }, { nom: c, deg: x + y }, { nom: d, deg: T }]);
  const debut = `L’angle ${a}${s}${d} mesure ${T}°. Il est coupé en trois : ${a}${s}${b}, ${b}${s}${c} et ${c}${s}${d}.`;
  return dg(pick([
    `${debut} ${a}${s}${b} et ${c}${s}${d} mesurent ${x}° chacun. Combien mesure l’angle ${b}${s}${c} ?`,
    `${debut} Les angles ${a}${s}${b} et ${c}${s}${d} valent ${x}° chacun. Calcule l’angle ${b}${s}${c}.`,
    `${debut} Les deux angles du bord font ${x}° chacun. Trouve l’angle ${b}${s}${c}.`,
  ]), y, `${T} − ${x} − ${x} = ${y}°.`, fig);
}

// ----- ANGLE_RELATIONS, ★1 (les autres gabarits sont dans programme-trous.bank.ts)
const chapeau = (x: string) => `$\\widehat{${x}}$`;
function genRelVerdict(): G {
  const a = mesure5(20, 160);
  const ok = Math.random() < 0.5;
  const b = ok ? 180 - a : 180 - a + pick([-20, -10, 10, 20]);
  const pourquoi = `Supplémentaires : la somme fait 180°. ${a} + ${b} = ${a + b}.`;
  const fig = deuxAngles(a, b, { textes: [`${a}°`, `${b}°`] });
  return pick([
    () => ouiNon(`${a}° et ${b}° sont-ils supplémentaires ?`, ok, pourquoi, fig),
    () => vraiFaux(`Vrai ou faux : ${a}° et ${b}° sont supplémentaires.`, ok, pourquoi, fig),
    () => ouiNon(`${a}° et ${b}° font-ils 180° ensemble ?`, ok, pourquoi, fig),
    () => ouiNon(`Ces angles sont-ils supplémentaires : ${a}° et ${b}° ?`, ok, pourquoi, fig),
    () => ouiNon(`Additionne ${a}° et ${b}°. Sont-ils supplémentaires ?`, ok, pourquoi, fig),
  ])();
}
function genRelVocab(): G {
  return pick<() => G>([
    () => dg(pick(["Deux angles supplémentaires font combien de degrés ?", "Quelle somme font deux angles supplémentaires ?", "Supplémentaires : quelle est la somme des deux angles ?"]), 180, "Deux angles supplémentaires font 180° ensemble."),
    () => ouiNon(pick(["Deux angles opposés par le sommet ont-ils la même mesure ?", "Des angles opposés par le sommet sont-ils égaux ?"]), true, "Deux angles opposés par le sommet ont la même mesure."),
    () => ouiNon(pick(["Deux angles adjacents ont-ils le même sommet ?", "Des angles adjacents partagent-ils leur sommet ?"]), true, "Deux angles adjacents ont le même sommet et un côté commun."),
    () => nb(pick(["Deux angles adjacents ont combien de côtés communs ?", "Adjacents : combien de côtés en commun ?"]), 1, "Deux angles adjacents ont exactement un côté commun."),
    () => qc(pick(["Quel mot désigne deux angles qui font 180° ?", "Deux angles font 180°. Comment sont-ils ?"]), "supplémentaires", ["adjacents", "opposés", "droits"], "Deux angles qui font 180° sont supplémentaires."),
    () => qc(pick(["Deux droites se coupent. Comment sont les angles face à face ?", "Quel mot désigne deux angles face à face ?"]), "opposés par le sommet", ["adjacents", "supplémentaires", "droits"], "Face à face au croisement : opposés par le sommet."),
  ])();
}
function genRelOppose(): G {
  const [s, a, b, c, d] = lettres(5);
  const t = 5 * pick([8, 9, 10, 11, 12, 14, 15, 20, 22, 24]);
  const fig = figureRayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + t }, { nom: c, deg: 190 }, { nom: d, deg: 190 + t }]);
  return qc(
    pick([`Quel angle est opposé par le sommet à ${chapeau(a + s + b)} ?`, `Regarde la figure. Trouve l’opposé de ${chapeau(a + s + b)}.`, `Choisis l’angle face à ${chapeau(a + s + b)}.`, `Observe le croisement. Quel angle est en face de ${chapeau(a + s + b)} ?`, `Deux droites se coupent. Choisis l’opposé de ${chapeau(a + s + b)}.`]),
    `l’angle ${c + s + d}`, [`l’angle ${b + s + c}`, `l’angle ${d + s + a}`], `${a}, ${s}, ${c} sont alignés, ${b}, ${s}, ${d} aussi : l’angle ${c + s + d} est en face.`, fig,
  );
}

// ----- ANGLE_RELATIONS, ★2
function genRelComplete(): G {
  const a = mesure5(20, 160);
  return dg(pick([`${a}° + … = 180°. Complète.`, `Il manque combien de degrés à ${a}° pour faire 180° ?`, `Complète : ${a}° et … ° sont supplémentaires.`, `Combien ajouter à ${a}° pour obtenir un angle plat ?`, `Trouve le supplémentaire de ${a}°.`, `Un angle plat contient un angle de ${a}°. Combien mesure l’autre ?`]), 180 - a, `180 − ${a} = ${180 - a}.`, rayonsSansNom([0, a, 180]));
}
function genRelDifference(): G {
  const [s, a, b, c] = lettres(4);
  const x = mesure5(25, 75);
  const y = mesure5(25, 75);
  const fig = figureRayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + x }, { nom: c, deg: 10 + x + y }]);
  return dg(pick([`${chapeau(a + s + c)} = ${x + y}° et ${chapeau(a + s + b)} = ${x}°. Combien mesure ${chapeau(b + s + c)} ?`, `${chapeau(a + s + c)} mesure ${x + y}°, ${chapeau(a + s + b)} mesure ${x}°. Trouve ${chapeau(b + s + c)}.`, `Calcule ${chapeau(b + s + c)}. On sait : ${chapeau(a + s + c)} = ${x + y}° et ${chapeau(a + s + b)} = ${x}°.`, `Adjacents dans ${chapeau(a + s + c)} = ${x + y}° : ${chapeau(a + s + b)} = ${x}°. Calcule ${chapeau(b + s + c)}.`]), y, `${x + y} − ${x} = ${y}.`, fig);
}
function genRelVoisin(): G {
  const t = mesure5(40, 130, [90]);
  const fig = rayonsSansNom([10, 10 + t, 190, 190 + t]);
  if (Math.random() < 0.55)
    return dg(pick([`Deux droites se coupent. Un angle mesure ${t}°. Combien mesure son voisin ?`, `Un angle de ${t}° a un voisin sur la même droite. Trouve ce voisin.`, `Deux droites se croisent. Un angle fait ${t}°. Calcule son voisin.`, `Au croisement, un angle mesure ${t}°. Quelle est la mesure de son voisin ?`]), 180 - t, `Deux angles voisins sur une droite font 180°. 180 − ${t} = ${180 - t}.`, fig);
  return dg(pick([`Deux droites se coupent. Un angle mesure ${t}°. Combien mesure l’angle opposé ?`, `Deux droites se croisent. Un angle fait ${t}°. Donne l’angle en face.`, `Au croisement, un angle mesure ${t}°. Quelle est la mesure de l’angle opposé ?`]), t, "Deux angles opposés par le sommet ont la même mesure.", fig);
}
function genRelReconnaitre(): G {
  const [s, a, b, c, d] = lettres(5);
  const t = 5 * pick([8, 9, 10, 11, 12, 14, 15, 20, 22, 24]);
  const fig = figureRayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + t }, { nom: c, deg: 190 }, { nom: d, deg: 190 + t }]);
  const [h1, h2, opp] = pick([[a + s + b, c + s + d, true], [a + s + b, b + s + c, false], [b + s + c, d + s + a, true], [b + s + c, c + s + d, false]] as const);
  const pourquoi = opp ? "Ces deux angles sont face à face : opposés par le sommet." : "Ces deux angles ont un côté commun : ils sont voisins, pas opposés.";
  return pick([
    () => ouiNon(`${chapeau(h1)} et ${chapeau(h2)} sont-ils opposés par le sommet ?`, opp, pourquoi, fig),
    () => vraiFaux(`Vrai ou faux : ${chapeau(h1)} et ${chapeau(h2)} sont opposés par le sommet.`, opp, pourquoi, fig),
    () => ouiNon(`Regarde la figure. ${chapeau(h1)} et ${chapeau(h2)} sont-ils adjacents ?`, !opp, pourquoi, fig),
    () => vraiFaux(`Vrai ou faux : ${chapeau(h1)} et ${chapeau(h2)} sont adjacents.`, !opp, pourquoi, fig),
  ])();
}
function genRelMemeMesure(): G {
  const [s, a, b, c, d] = lettres(5);
  const t = 5 * pick([8, 9, 10, 11, 12, 14, 15, 20, 22, 24]);
  const fig = figureRayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + t }, { nom: c, deg: 190 }, { nom: d, deg: 190 + t }]);
  return qc(
    pick([`Deux droites se coupent. Quel angle a la même mesure que ${chapeau(a + s + b)} ?`, `Observe la figure. Quel angle est égal à ${chapeau(a + s + b)} ?`, `Sans mesurer, trouve l’angle égal à ${chapeau(a + s + b)}.`, `Regarde le croisement. Choisis l’angle égal à ${chapeau(a + s + b)}.`, `Coche l’angle de même mesure que ${chapeau(a + s + b)}.`, `${chapeau(a + s + b)} mesure ${t}°. Quel autre angle mesure ${t}° ?`]),
    `l’angle ${c + s + d}`, [`l’angle ${b + s + c}`, `l’angle ${d + s + a}`], `Les angles opposés par le sommet sont égaux : l’angle ${c + s + d}.`, fig,
  );
}

// ----- ANGLE_RELATIONS, ★4
function genRelCroixSomme(): G {
  const [s, a, b, c, d] = lettres(5);
  const t = 5 * pick([8, 9, 10, 11, 12, 14, 15, 20, 22, 24]);
  const fig = figureRayons(s, [{ nom: a, deg: 10 }, { nom: b, deg: 10 + t }, { nom: c, deg: 190 }, { nom: d, deg: 190 + t }]);
  const base = pick([`Deux droites se coupent en ${s}.`, `Sur la figure, deux droites se croisent en ${s}.`, `Regarde le croisement en ${s}.`]);
  const m = `${chapeau(a + s + b)} mesure ${t}°.`;
  return pick<() => G>([
    () => dg(`${base} ${m} Calcule ${chapeau(a + s + b)} + ${chapeau(c + s + d)}.`, 2 * t, `Opposés par le sommet : ${t} + ${t} = ${2 * t}°.`, fig),
    () => dg(`${base} ${m} Calcule ${chapeau(a + s + b)} + ${chapeau(b + s + c)}.`, 180, `${a}, ${s} et ${c} sont alignés : la somme vaut 180°.`, fig),
    () => dg(`${base} ${m} Calcule ${chapeau(b + s + c)} + ${chapeau(d + s + a)}.`, 2 * (180 - t), `Chacun mesure 180 − ${t} = ${180 - t}°. La somme : ${2 * (180 - t)}°.`, fig),
    () => dg(`${base} ${m} Quelle est la somme des quatre angles ?`, 360, `Les quatre angles font un tour complet : 360°.`, fig),
  ])();
}
function genRelDouble(): G {
  const k = pick([2, 3, 4, 5, 8, 9]);
  const petit = 180 / (k + 1);
  const veutPetit = Math.random() < 0.5;
  const mot = veutPetit ? "petit" : "grand";
  const fois = k === 2 ? "le double de" : k === 3 ? "le triple de" : `${k} fois`;
  return dg(pick([
    `Deux angles sont supplémentaires. L’un vaut ${fois} l’autre. Combien mesure le plus ${mot} ?`,
    `Deux angles adjacents forment 180°. L’un vaut ${fois} l’autre. Calcule le plus ${mot}.`,
    `Deux droites se coupent. Un angle vaut ${fois} son voisin. Quelle est la mesure du plus ${mot} ?`,
    `Une droite et une demi-droite forment deux angles. L’un vaut ${fois} l’autre. Trouve le plus ${mot}.`,
  ]), veutPetit ? petit : k * petit, `180° font ${k + 1} parts égales : 180 ÷ ${k + 1} = ${petit}°. Le grand : ${k} × ${petit} = ${k * petit}°.`, rayonsSansNom([0, petit, 180]));
}
function genRelExtreme(): G {
  const t = 5 * pick([6, 7, 8, 9, 10, 11, 12, 14, 15, 16, 20, 22, 24, 26, 28, 30]);
  const grand = Math.random() < 0.5;
  const r = grand ? Math.max(t, 180 - t) : Math.min(t, 180 - t);
  const mot = grand ? "grand" : "petit";
  return dg(pick([
    `Deux droites se coupent. Un angle mesure ${t}°. Combien mesure le plus ${mot} des quatre angles ?`,
    `Deux droites se croisent et un angle fait ${t}°. Écris le plus ${mot} des quatre angles.`,
    `Un des quatre angles d’un croisement mesure ${t}°. Calcule le plus ${mot} des quatre angles.`,
    `Au croisement de deux droites, un angle vaut ${t}°. Trouve le plus ${mot} des quatre angles.`,
  ]), r, `Les quatre angles valent ${t}° et ${180 - t}°, deux fois chacun. Le plus ${mot} : ${r}°.`, rayonsSansNom([10, 10 + t, 190, 190 + t]));
}
function genRelEcart(): G {
  const d = 10 * randomInt(1, 8);
  const petit = (180 - d) / 2;
  const veutPetit = Math.random() < 0.5;
  const r = veutPetit ? petit : petit + d;
  const mot = veutPetit ? "petit" : "grand";
  return dg(pick([
    `Deux angles sont supplémentaires. L’un mesure ${d}° de plus que l’autre. Combien mesure le plus ${mot} ?`,
    `Deux angles adjacents forment un angle plat. Leur écart est de ${d}°. Calcule le plus ${mot}.`,
    `Deux droites se coupent. Deux angles voisins diffèrent de ${d}°. Quelle est la mesure du plus ${mot} ?`,
    `Deux angles voisins sur une droite ont ${d}° d’écart. Trouve le plus ${mot}.`,
    `Un angle plat est coupé en deux. L’écart entre les deux parts est de ${d}°. Calcule le plus ${mot}.`,
  ]), r, `Sans l’écart : 180 − ${d} = ${180 - d}, puis ${180 - d} ÷ 2 = ${petit}°. Le grand : ${petit} + ${d} = ${petit + d}°.`, rayonsSansNom([0, petit, 180]));
}
function genRelTourComplet(): G {
  const [s, a, b, c, d] = lettres(5);
  const x = 5 * randomInt(9, 20);
  const y = 5 * randomInt(9, 20);
  const r = 360 - x - y;
  if (r < 45 || r > 175) return genRelTourComplet();
  const fig = figureRayons(s, [{ nom: a, deg: 0 }, { nom: b, deg: x }, { nom: c, deg: x + y }]);
  void d;
  return dg(pick([
    `Trois angles font le tour de ${s} : ${chapeau(a + s + b)} = ${x}°, ${chapeau(b + s + c)} = ${y}°. Combien mesure ${chapeau(c + s + a)} ?`,
    `Autour de ${s}, le tour complet est coupé en trois. ${chapeau(a + s + b)} = ${x}°, ${chapeau(b + s + c)} = ${y}°. Calcule ${chapeau(c + s + a)}.`,
    `Un tour complet autour de ${s} : ${chapeau(a + s + b)} = ${x}°, ${chapeau(b + s + c)} = ${y}°. Trouve ${chapeau(c + s + a)}.`,
    `Regarde le tour autour de ${s}. ${chapeau(a + s + b)} mesure ${x}° et ${chapeau(b + s + c)} mesure ${y}°. Quelle est la mesure de ${chapeau(c + s + a)} ?`,
  ]), r, `Un tour complet fait 360°. 360 − ${x} − ${y} = ${r}°.`, fig);
}

export const anglesBank: TutorBankItemV4[] = [
  // =========================
  // ANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "angle_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    // ⭐ 06/10 : QCM — le mot-clé « 2 » acceptait toute réponse contenant un 2.
    text: "Un angle est formé par combien de demi-droites ?",
    format: "qcm",
    choices: ["une", "deux", "trois", "quatre"],
    expected: ["deux"],
    comparator: "mcq_exact",
    hint: "Elles ont la même origine.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle est formé par deux demi-droites qui partent du même point. Ce point commun s’appelle le sommet de l’angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Comment s’appelle le point commun aux deux côtés d’un angle ?",
    format: "qcm",
    choices: ["le sommet", "le milieu", "le centre", "le côté"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point de départ des deux demi-droites.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les deux côtés d’un angle partent du même point. Ce point commun s’appelle le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle est formé par :",
    format: "qcm",
    choices: [
      "deux segments sans lien",
      "deux demi-droites de même origine",
      "trois droites",
      "un cercle et un segment",
    ],
    expected: ["deux demi-droites de même origine"],
    comparator: "mcq_exact",
    hint: "Les deux côtés partent du même point.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle est formé par deux demi-droites de même origine. Leur point commun est le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_reconnaitre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un angle, le point commun aux deux côtés est :",
    format: "qcm",
    choices: ["le milieu", "le centre", "le sommet", "la base"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point où les deux côtés se rencontrent.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Le point commun aux deux côtés d’un angle s’appelle le sommet.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },

  // =========================
  // ANGLE_DROIT
  // =========================
  {
    kind: "fixed",
    id: "angle_droit_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Un angle droit mesure combien de degrés ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Le coin d’un carré mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit a toujours la même mesure : 90 degrés. On le retrouve par exemple dans les coins d’un carré ou d’un rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : un angle droit mesure ___ degrés.",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit vaut toujours 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Par définition, un angle droit mesure 90 degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la mesure d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Toujours 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit se reconnaît à sa mesure : 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Coche la mesure d’un angle droit.",
    format: "qcm",
    choices: ["45°", "90°", "100°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi les mesures proposées, seule 90° correspond à un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis la mesure d’un angle droit.",
    format: "qcm",
    choices: ["60°", "90°", "120°", "150°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Le bon choix est 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit ne mesure ni 60°, ni 120°, ni 150°. Il mesure exactement 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_droit_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle a la même mesure qu’un coin de rectangle ?",
    format: "qcm",
    choices: ["45°", "90°", "135°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "Tous les angles d’un rectangle sont droits.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les coins d’un rectangle sont des angles droits. Ils mesurent donc 90°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "angle_droit", "qcm"],
  },

  // =========================
  // ANGLE_COMPARE
  // =========================
  {
    kind: "fixed",
    id: "angle_comparer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus grand : 30° ou 80° ?",
    format: "short",
    expected: ["80", "80°"],
    comparator: "number_equal",
    hint: "Compare les nombres.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour comparer deux angles donnés en degrés, on compare leurs mesures. Comme 80 est plus grand que 30, l’angle de 80° est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus petit : 120° ou 70° ?",
    format: "short",
    expected: ["70", "70°"],
    comparator: "number_equal",
    hint: "Le plus petit angle a la plus petite mesure.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 70 est plus petit que 120, l’angle de 70° est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus grand : 45° ou 95° ?",
    format: "short",
    expected: ["95", "95°"],
    comparator: "number_equal",
    hint: "Cherche la plus grande mesure.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("95° est plus grand que 45°. Donc l’angle de 95° est le plus grand.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel angle est le plus petit : 85° ou 55° ?",
    format: "short",
    expected: ["55", "55°"],
    comparator: "number_equal",
    hint: "Compare les deux nombres.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 55 est plus petit que 85, l’angle de 55° est le plus petit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle mesure 45°. Comparé à un angle droit, il est :",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["plus petit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Comme 45° est inférieur à 90°, un angle de 45° est plus petit qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle mesure 120°. Comparé à un angle droit, il est :",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["plus grand"],
    comparator: "mcq_exact",
    hint: "Compare 120° à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Comme 120° est supérieur à 90°, un angle de 120° est plus grand qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle est le plus grand ?",
    format: "qcm",
    choices: ["25°", "65°", "85°", "45°"],
    expected: ["85°"],
    comparator: "mcq_exact",
    hint: "Cherche le plus grand nombre.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi 25°, 65°, 85° et 45°, la plus grande mesure est 85°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Quel angle est le plus petit ?",
    format: "qcm",
    choices: ["110°", "95°", "70°", "100°"],
    expected: ["70°"],
    comparator: "mcq_exact",
    hint: "Cherche le plus petit nombre.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Parmi les mesures proposées, 70° est la plus petite.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis l’angle le plus grand.",
    format: "qcm",
    choices: ["40°", "75°", "55°", "65°"],
    expected: ["75°"],
    comparator: "mcq_exact",
    hint: "Compare les quatre mesures.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("75° est plus grand que 40°, 55° et 65°. C’est donc le plus grand angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Choisis l’angle le plus petit.",
    format: "qcm",
    choices: ["35°", "25°", "45°", "30°"],
    expected: ["25°"],
    comparator: "mcq_exact",
    hint: "L’angle le plus petit a la mesure la plus petite.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("25° est la plus petite des quatre mesures proposées.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 60° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "impossible à savoir",
    ],
    expected: ["plus petit qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 60° est inférieur à 90°, cet angle est plus petit qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_comparer_qcm_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Un angle de 100° est :",
    format: "qcm",
    choices: [
      "plus petit qu’un angle droit",
      "égal à un angle droit",
      "plus grand qu’un angle droit",
      "nul",
    ],
    expected: ["plus grand qu’un angle droit"],
    comparator: "mcq_exact",
    hint: "Compare 100° à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme 100° est supérieur à 90°, cet angle est plus grand qu’un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "comparaison", "qcm", "angle_droit"],
  },

  // =========================
  // ANGLE_MESURER
  // =========================
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 1,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Avec quel instrument mesure-t-on un angle en degrés ?",
    format: "qcm",
    choices: ["l’équerre", "le rapporteur", "le compas", "la règle graduée"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est l’instrument gradué utilisé en géométrie.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour mesurer un angle, on utilise un rapporteur. Il est gradué en degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    // ⭐ 06/10 : QCM — le mot-clé « ° » acceptait toute mesure, « 45° » compris.
    text: "En quelle unité mesure-t-on un angle ?",
    format: "qcm",
    choices: ["en centimètres", "en degrés", "en mètres carrés", "en litres"],
    expected: ["en degrés"],
    comparator: "mcq_exact",
    hint: "On note souvent cette unité avec le symbole °.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("On mesure les angles en degrés. Le symbole utilisé est °.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "unite"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour mesurer un angle, on utilise :",
    format: "qcm",
    choices: ["une règle", "un compas", "un rapporteur", "une équerre"],
    expected: ["un rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est l’instrument gradué en degrés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("L’instrument adapté pour mesurer un angle est le rapporteur.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_mesurer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "L’unité de mesure d’un angle est :",
    format: "qcm",
    choices: ["le centimètre", "le degré", "le mètre", "le litre"],
    expected: ["le degré"],
    comparator: "mcq_exact",
    hint: "On écrit souvent 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Les angles se mesurent en degrés. Les autres unités proposées servent à mesurer autre chose.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "mesure", "qcm"],
  },

  // =========================
  // ANGLE_TRACER
  // =========================
  {
    kind: "fixed",
    id: "angle_tracer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Quel instrument est le plus utile pour tracer un angle de 40° ?",
    format: "qcm",
    choices: ["le compas", "l’équerre", "le rapporteur", "la règle graduée"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "C’est le même instrument que pour mesurer un angle.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour tracer précisément un angle de 40°, on utilise un rapporteur, car il permet de placer la bonne mesure en degrés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "instrument"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Pour tracer un angle, que place-t-on en premier ?",
    format: "qcm",
    choices: ["le sommet", "les graduations", "le 2e côté"],
    expected: ["le sommet"],
    comparator: "mcq_exact",
    hint: "Les deux côtés partent de ce point.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Pour tracer un angle, on commence par placer le sommet, car les deux côtés de l’angle partent de ce point.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "vocabulaire"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle de 70°, l’instrument le plus adapté est :",
    format: "qcm",
    choices: ["la règle seule", "le compas seul", "le rapporteur", "la gomme"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "Il permet de lire les degrés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Le rapporteur est l’instrument adapté pour tracer un angle d’une mesure donnée.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_tracer_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_tracer",
    difficulty: 2,
    theme: "neutral",
    text: "Pour tracer un angle, on part d’abord :",
    format: "qcm",
    choices: [
      "du sommet",
      "de la dernière graduation",
      "du milieu du segment",
      "du nom de la figure",
    ],
    expected: ["du sommet"],
    comparator: "mcq_exact",
    hint: "C’est le point commun des deux côtés.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("On commence par le sommet, car c’est depuis ce point que l’on trace les deux côtés de l’angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "tracer", "qcm"],
  },

  // =========================
  // ANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "angle_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle mesure 90°. Comparé à un angle droit, il est :",
    format: "qcm",
    choices: ["plus petit", "égal", "plus grand"],
    expected: ["égal"],
    comparator: "mcq_exact",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Comme un angle droit mesure exactement 90°, un angle de 90° est égal à un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "angle_droit"],
  },
  {
    kind: "fixed",
    id: "angle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Parmi 35°, 90°, 120° et 75°, quel est l’angle le plus proche d’un angle droit ?",
    format: "short",
    expected: ["90", "90°"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle droit mesure 90°. Parmi les valeurs proposées, 90° est exactement un angle droit, donc c’est le plus proche.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "comparaison"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel angle est plus petit qu’un angle droit ?",
    format: "qcm",
    choices: ["110°", "90°", "60°", "120°"],
    expected: ["60°"],
    comparator: "mcq_exact",
    hint: "Un angle droit vaut 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle plus petit qu’un angle droit doit mesurer moins de 90°. Parmi les choix, seul 60° convient.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quel angle est plus grand qu’un angle droit ?",
    format: "qcm",
    choices: ["45°", "75°", "100°", "90°"],
    expected: ["100°"],
    comparator: "mcq_exact",
    hint: "Cherche une mesure supérieure à 90°.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle plus grand qu’un angle droit mesure plus de 90°. Ici, 100° est le bon choix.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "angle_defi_qcm_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "reunion",
    text: "Sur une rosace observée à La Réunion, un angle mesure 90°. C’est :",
    format: "qcm",
    choices: [
      "un angle plus petit qu’un angle droit",
      "un angle droit",
      "un angle plus grand qu’un angle droit",
      "un angle plat",
    ],
    expected: ["un angle droit"],
    comparator: "mcq_exact",
    hint: "90° correspond à un angle droit.",
    explanation:
      "Définition : un angle mesure l’ouverture entre deux demi-droites.\n\n" +
      "Méthode : on observe le codage ou la mesure, puis on compare avec les angles de référence.\n\n" +
      "Calcul : " +
      ("Un angle de 90° est exactement un angle droit.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["angle_mesure", "defi", "reunion", "qcm"],
  },

  // =========================
  // TEMPLATES (★1-★2 nus, 03/11/2026 ; les situations sont dans les « _ctx3 » plus bas)
  // =========================
  gabarit("angle_reconnaitre_tpl_1", "angle_reconnaitre", 1, "Un angle a deux côtés et un sommet : le sommet est la lettre du MILIEU.",
    ["angle_mesure", "reconnaitre", "template"], () => genReconnaitre(false)),
  gabarit("angle_reconnaitre_qcm_tpl_1", "angle_reconnaitre", 2, "Aigu : moins de 90°. Droit : 90°. Obtus : entre 90° et 180°. Plat : 180°.",
    ["angle_mesure", "reconnaitre", "qcm", "template"], () => genReconnaitreQcm(false)),
  gabarit("angle_droit_tpl_1", "angle_droit", 1, "Toujours 90°.", ["angle_mesure", "angle_droit", "template"], () => genDroitCoin(false)),
  {
    kind: "template",
    id: "angle_droit_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_droit",
    difficulty: 1,
    theme: "neutral",
    hint: "Le petit carré dans le coin veut dire : angle droit.",
    tags: ["angle_mesure", "angle_droit", "template", "canvas"],
    generate: () => {
      const n = nomAngle();
      const t = pick([
        `Un petit carré code l’angle ${n.nom}. Combien mesure-t-il ?`,
        `L’angle ${n.nom} est un angle droit. Quelle est sa mesure ?`,
        `Complète : l’angle droit ${n.nom} mesure … °.`,
        `Observe le codage de l’angle ${n.nom}. Combien mesure-t-il ?`,
      ]);
      return {
        text: t,
        format: "short",
        expected: ["90°", "90"],
        comparator: "number_equal",
        explanation: expl(`Le petit carré au sommet ${n.s} code un angle droit. Un angle droit mesure toujours 90°.`),
        canvas: figureAngle(90, n, { droit: true }),
      };
    },
  },
  gabarit("angle_droit_qcm_tpl_1", "angle_droit", 2, "Un angle droit mesure 90°.", ["angle_mesure", "angle_droit", "qcm", "template"], () => genDroitListe(false)),
  gabarit("angle_droit_qcm_tpl_2", "angle_droit", 2, "Droit : 90° pile. Moins : plus petit. Plus : plus grand.",
    ["angle_mesure", "angle_droit", "qcm", "template"], () => genDroitOuiNon(false)),
  gabarit("angle_comparer_tpl_1", "angle_comparer", 1, "L’angle le plus grand a la plus grande mesure.", ["angle_mesure", "comparaison", "template"], () => comparerDeux(true)),
  gabarit("angle_comparer_tpl_2", "angle_comparer", 1, "L’angle le plus petit a la plus petite mesure.", ["angle_mesure", "comparaison", "template"], () => comparerDeux(false)),
  gabarit("angle_comparer_tpl_signe", "angle_comparer", 1, "Compare les deux nombres de degrés.", ["angle_mesure", "comparaison", "qcm", "template"], genComparerSigne),
  gabarit("angle_comparer_tpl_dessin_grand", "angle_comparer", 1, "Regarde l’ouverture entre les côtés.", ["angle_mesure", "comparaison", "qcm", "template", "canvas"], () => genComparerDessin(true)),
  gabarit("angle_comparer_tpl_dessin_petit", "angle_comparer", 1, "Regarde l’ouverture entre les côtés.", ["angle_mesure", "comparaison", "qcm", "template", "canvas"], () => genComparerDessin(false)),
  gabarit("angle_comparer_tpl_3", "angle_comparer", 2, "Compare à 90°.", ["angle_mesure", "comparaison", "template", "angle_droit"],
    () => comparerAuDroit(mesure5(15, 85), false, "plat")),
  gabarit("angle_comparer_tpl_4", "angle_comparer", 2, "Compare à 90°.", ["angle_mesure", "comparaison", "template", "angle_droit"],
    () => comparerAuDroit(mesure5(95, 175), false, "nul")),
  gabarit("angle_comparer_qcm_tpl_1", "angle_comparer", 2, "Compare toutes les mesures proposées.", ["angle_mesure", "comparaison", "qcm", "template"], () => comparerQuatre(true)),
  gabarit("angle_comparer_qcm_tpl_2", "angle_comparer", 2, "Cherche la plus petite mesure.", ["angle_mesure", "comparaison", "qcm", "template"], () => comparerQuatre(false)),
  // ★2 dessinés : l'angle de la figure, comparé à l'œil au coin de l'équerre.
  gabarit("angle_comparer_qcm_tpl_3", "angle_comparer", 2, "Imagine le coin de ton équerre posé sur le sommet.",
    ["angle_mesure", "comparaison", "qcm", "template", "angle_droit", "canvas"], () => comparerAuDroitDessine(true)),
  gabarit("angle_comparer_qcm_tpl_4", "angle_comparer", 2, "Imagine le coin de ton équerre posé sur le sommet.",
    ["angle_mesure", "comparaison", "qcm", "template", "angle_droit", "canvas"], () => comparerAuDroitDessine(false)),
  gabarit("angle_mesurer_tpl_1", "angle_mesurer", 1, "C’est l’instrument gradué en degrés.", ["angle_mesure", "mesure", "template"], () => genMesurerInstrument(false)),
  gabarit("angle_mesurer_qcm_tpl_1", "angle_mesurer", 2, "Centre sur le sommet, 0 sur un côté, lecture sur l’autre côté.",
    ["angle_mesure", "mesure", "qcm", "template"], () => genMesurerMethode(false)),
  gabarit("angle_tracer_tpl_1", "angle_tracer", 2, "On utilise l’instrument gradué en degrés.", ["angle_mesure", "tracer", "template"], () => genTracer(false)),
  gabarit("angle_tracer_qcm_tpl_1", "angle_tracer", 2, "L’angle part d’un point commun aux deux côtés.", ["angle_mesure", "tracer", "qcm", "template"], () => genEtapes(false)),

  // =========================
  // ★3 EN SITUATION (03/11/2026) : les objets, les prénoms, les tournures
  // qui étaient à ★1-★2 — le geste est su, le contexte arrive.
  // =========================
  gabarit("angle_reconnaitre_tpl_ctx3", "angle_reconnaitre", 3, "Le sommet est le point d’où partent les deux côtés.",
    ["angle_mesure", "reconnaitre", "qcm", "template", "contexte"], () => (Math.random() < 0.5 ? genReconnaitre(true) : genReconnaitreQcm(true))),
  gabarit("angle_droit_tpl_ctx3", "angle_droit", 3, "Un angle droit mesure toujours 90°.", ["angle_mesure", "angle_droit", "template", "contexte"],
    () => pick([genDroitCoin, genDroitListe, genDroitOuiNon])(true)),
  gabarit("angle_comparer_tpl_ctx3", "angle_comparer", 3, "Compare les nombres de degrés, ou compare à 90°.", ["angle_mesure", "comparaison", "template", "contexte"],
    () => {
      const k = randomInt(0, 3);
      if (k === 0) return comparerDeux(Math.random() < 0.5, true);
      if (k === 1) return comparerQuatre(Math.random() < 0.5, true);
      return Math.random() < 0.5 ? comparerAuDroit(mesure5(15, 85), true, "plat") : comparerAuDroit(mesure5(95, 170), true, "nul");
    }),
  gabarit("angle_mesurer_tpl_ctx3", "angle_mesurer", 3, "Le rapporteur : centre sur le sommet, 0 sur un côté.", ["angle_mesure", "mesure", "template", "contexte"],
    () => (Math.random() < 0.4 ? genMesurerInstrument(true) : genMesurerMethode(true))),
  gabarit("angle_tracer_tpl_ctx3", "angle_tracer", 3, "On trace d’abord un côté, puis on utilise le rapporteur.", ["angle_mesure", "tracer", "template", "contexte"],
    () => (Math.random() < 0.6 ? genTracer(true) : genEtapes(true))),

  // =========================
  // TEMPLATES - ANGLE_DEFIS
  // =========================
  {
    kind: "template",
    id: "angle_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare à 90°.",
    tags: ["angle_mesure", "defi", "template"],
    // ⭐ 06/10 : réponse libre à mot-clé → partage d'un angle en parts égales
    // (pizza, tarte, roue, angle droit ou plat partagé) et comparaison au
    // droit en QCM, avec lettres et prénoms.
    generate: () => {
      const p = pick(PRENOMS);
      const n = nomAngle();
      const cas = randomInt(0, 2);
      if (cas === 0) {
        const k = pick([3, 4, 5, 6, 8, 10, 12]);
        const r = 360 / k;
        const quoi = pick(["une pizza ronde", "une tarte aux pommes", "un gâteau d’anniversaire", "une galette", "une quiche"]);
        const t = pick([
          `${p.nom} coupe ${quoi} en ${k} parts égales, depuis le centre. Combien mesure l’angle de chaque part ?`,
          `${quoi[0].toUpperCase()}${quoi.slice(1)} est partagée en ${k} parts égales à partir du centre. Quel est l’angle d’une part ?`,
          `Un tour complet fait 360°. ${p.nom} partage ${quoi} en ${k} parts égales. Quel angle mesure une part ?`,
        ]);
        return {
          text: t.replace(/gâteau d’anniversaire est partagée/, "gâteau d’anniversaire est partagé"),
          format: "short",
          expected: [`${r}°`, String(r)],
          comparator: "number_equal",
          explanation: expl(`Le tour complet autour du centre mesure 360°. ${k} parts égales : 360 ÷ ${k} = ${r}°.`),
          canvas: rayonsSansNom(Array.from({ length: k }, (_, i) => 90 + i * r)),
        };
      }
      if (cas === 1) {
        const [base, total] = pick([["droit", 90], ["plat", 180]] as const);
        const k = total === 90 ? pick([2, 3]) : pick([2, 3, 4, 6]);
        const r = total / k;
        const t = pick([
          `L’angle ${n.nom} est ${base}. ${p.nom} le partage en ${k} angles égaux. Combien mesure chacun ?`,
          `On partage un angle ${base} ${n.nom} en ${k} angles égaux. Quelle est la mesure de chaque angle ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [`${r}°`, String(r)],
          comparator: "number_equal",
          explanation: expl(`Un angle ${base} mesure ${total}°. En ${k} angles égaux : ${total} ÷ ${k} = ${r}°.`),
          canvas: rayonsSansNom(Array.from({ length: k + 1 }, (_, i) => 10 + i * r)),
        };
      }
      const v = pick([90, 90, mesure5(40, 85), mesure5(95, 140)]);
      const t = pick([
        `L’angle ${n.nom} mesure ${v}°. Est-il plus petit, égal ou plus grand qu’un angle droit ?`,
        `${p.nom} a mesuré ${v}° pour l’angle ${n.nom}. Compare-le à un angle droit.`,
      ]);
      const juste = v < 90 ? "plus petit qu’un angle droit" : v > 90 ? "plus grand qu’un angle droit" : "égal à un angle droit";
      return {
        text: t,
        format: "qcm",
        choices: shuffle(["plus petit qu’un angle droit", "égal à un angle droit", "plus grand qu’un angle droit"]),
        expected: [juste],
        comparator: "mcq_exact",
        explanation: expl(`On compare ${v}° à 90° : l’angle est ${juste}.`),
        canvas: figureAngle(v, n, { mesure: true, droit: v === 90 }),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche la mesure inférieure à 90°.",
    tags: ["angle_mesure", "defi", "qcm", "template"],
    // ⭐ 06/10 : quatre angles nommés, un seul aigu (ou un seul obtus) ; le
    // piège est l'angle droit et les mesures proches de 90°.
    generate: () => {
      const ls = lettres(12);
      const noms = [0, 1, 2, 3].map((k) => ls.slice(3 * k, 3 * k + 3).join(""));
      const veutAigu = Math.random() < 0.5;
      const bon = veutAigu ? mesure5(45, 85) : mesure5(95, 135);
      const autres = veutAigu ? [90, mesure5(95, 170), mesure5(95, 170, [])] : [90, mesure5(20, 85), mesure5(20, 85)];
      const ms = shuffle([bon, ...autres]);
      const nomBon = noms[ms.indexOf(bon)];
      const p = pick(PRENOMS);
      const liste = noms.map((x, k) => `${x} mesure ${ms[k]}°`).join(", ");
      const crit = veutAigu ? "plus petit qu’un angle droit" : "plus grand qu’un angle droit";
      const t = pick([
        `${liste[0].toUpperCase()}${liste.slice(1)}. Quel angle est ${crit} ?`,
        `${p.nom} a mesuré quatre angles : ${liste}. Lequel est ${veutAigu ? "aigu" : "obtus"} ?`,
        `Voici quatre angles : ${liste}. Un seul est ${crit}. Lequel ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: noms.map((x) => `l’angle ${x}`),
        expected: [`l’angle ${nomBon}`],
        comparator: "mcq_exact",
        explanation: expl(`On compare chaque mesure à 90°. Seul ${nomBon} (${bon}°) est ${veutAigu ? "plus petit que 90° : aigu" : "entre 90° et 180° : obtus"}. 90° est droit, ni aigu ni obtus.`),
      };
    },
  },

  // ========== TOP-UP — ANGLE_RECONNAITRE ==========
  {
    kind: "fixed", id: "angle_reconnaitre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 1, theme: "neutral",
    text: "Comment s’appelle un angle qui mesure exactement 90° ?",
    format: "qcm", choices: ["un angle droit", "un angle aigu", "un angle obtus", "un angle plat"],
    expected: ["un angle droit"], comparator: "mcq_exact",
    hint: "90° = angle du coin d’une feuille.",
    explanation: expl("Un angle qui mesure exactement 90° est un angle droit. On le code par un petit carré."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "angle_reconnaitre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 1, theme: "neutral",
    text: "Comment s’appelle un angle qui mesure moins de 90° ?",
    format: "qcm", choices: ["un angle aigu", "un angle droit", "un angle obtus", "un angle plat"],
    expected: ["un angle aigu"], comparator: "mcq_exact",
    hint: "Plus petit que l’angle droit.",
    explanation: expl("Un angle qui mesure moins de 90° est un angle aigu."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "angle_reconnaitre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Comment s’appelle un angle entre 90° et 180° ?",
    format: "qcm", choices: ["un angle obtus", "un angle aigu", "un angle droit", "un angle plat"],
    expected: ["un angle obtus"], comparator: "mcq_exact",
    hint: "Plus grand que l’angle droit.",
    explanation: expl("Un angle qui mesure plus de 90° et moins de 180° est un angle obtus."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "angle_reconnaitre_topup_4", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Comment s’appelle un angle de 180° ?",
    format: "qcm", choices: ["un angle plat", "un angle droit", "un angle aigu", "un angle obtus"],
    expected: ["un angle plat"], comparator: "mcq_exact",
    hint: "Les deux demi-droites forment une droite.",
    explanation: expl("Un angle qui mesure exactement 180° est un angle plat : ses deux côtés sont alignés et forment une droite."),
    tags: ["angle_mesure", "reconnaitre", "qcm"],
  },

  // ========== TOP-UP — ANGLE_MESURER ==========
  {
    kind: "fixed", id: "angle_mesurer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 1, theme: "neutral",
    text: "Combien de degrés mesure un angle droit ?",
    format: "short", expected: ["90", "90°"], comparator: "number_equal",
    hint: "C’est l’angle du coin d’une feuille.",
    explanation: expl("Un angle droit mesure 90°."),
    tags: ["angle_mesure", "mesure"],
  },
  {
    kind: "fixed", id: "angle_mesurer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 1, theme: "neutral",
    text: "Combien de degrés mesure un angle plat ?",
    format: "short", expected: ["180", "180°"], comparator: "number_equal",
    hint: "Ses deux côtés sont alignés.",
    explanation: expl("Un angle plat mesure 180° : ses deux côtés forment une droite."),
    tags: ["angle_mesure", "mesure"],
  },
  {
    kind: "fixed", id: "angle_mesurer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 1, theme: "neutral",
    text: "Le rapporteur est gradué dans quelle unité ?",
    format: "qcm", choices: ["en degrés", "en centimètres", "en grammes", "en litres"],
    expected: ["en degrés"], comparator: "mcq_exact",
    hint: "Le symbole est °.",
    explanation: expl("Les angles se mesurent en degrés (symbole °), graduations que l’on lit sur le rapporteur."),
    tags: ["angle_mesure", "mesure", "qcm"],
  },
  {
    kind: "fixed", id: "angle_mesurer_topup_4", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_mesurer", difficulty: 2, theme: "neutral",
    text: "Un angle mesure 45°. Est-il aigu, droit ou obtus ?",
    format: "qcm", choices: ["aigu", "droit", "obtus", "plat"], expected: ["aigu"], comparator: "mcq_exact",
    hint: "Compare 45° à 90°.",
    explanation: expl("45° est inférieur à 90°. C’est donc un angle aigu."),
    tags: ["angle_mesure", "mesure", "qcm"],
  },

  // ========== TOP-UP — ANGLE_TRACER ==========
  {
    kind: "fixed", id: "angle_tracer_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 1, theme: "neutral",
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Quel instrument utilise-t-on pour tracer précisément un angle de 60° ?",
    format: "qcm", choices: ["l’équerre", "le compas", "la règle graduée", "le rapporteur"],
    expected: ["le rapporteur"], comparator: "mcq_exact",
    hint: "Le même que pour mesurer un angle.",
    explanation: expl("Pour tracer précisément un angle de 60°, on utilise un rapporteur, gradué en degrés."),
    tags: ["angle_mesure", "tracer", "instrument"],
  },
  {
    kind: "fixed", id: "angle_tracer_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 2, theme: "neutral",
    text: "Quel instrument sert à tracer vite un angle droit ?",
    format: "qcm", choices: ["une équerre", "une balance", "un compas seul", "un chronomètre"],
    expected: ["une équerre"], comparator: "mcq_exact",
    hint: "Son coin forme un angle droit.",
    explanation: expl("L’équerre possède un coin à 90° : elle permet de tracer directement un angle droit."),
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed", id: "angle_tracer_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 3, theme: "neutral",
    text: "Pour tracer un angle au rapporteur, où place-t-on le centre du rapporteur ?",
    format: "qcm", choices: ["sur le sommet de l’angle", "au bout d’un côté", "n’importe où", "sur le milieu d’un côté"],
    expected: ["sur le sommet de l’angle"], comparator: "mcq_exact",
    hint: "Le sommet est le point de départ des deux côtés.",
    explanation: expl("On place le centre du rapporteur sur le sommet de l’angle, et la ligne de base le long d’un côté."),
    tags: ["angle_mesure", "tracer", "qcm"],
  },
  {
    kind: "fixed", id: "angle_tracer_topup_4", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_tracer", difficulty: 2, theme: "neutral",
    text: "On veut tracer un angle de 120°. Quel type d’angle obtient-on ?",
    format: "qcm", choices: ["obtus", "aigu", "droit", "plat"], expected: ["obtus"], comparator: "mcq_exact",
    hint: "Compare 120° à 90° et 180°.",
    explanation: expl("120° est plus grand que 90° et plus petit que 180° : c’est un angle obtus."),
    tags: ["angle_mesure", "tracer", "qcm"],
  },

  // ========== TOP-UP — ANGLE_DEFI ==========
  {
    kind: "fixed", id: "angle_defi_topup_1", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un angle droit est partagé en deux angles égaux. Combien mesure chacun ?",
    format: "short", expected: ["45", "45°"], comparator: "number_equal",
    hint: "90 ÷ 2.",
    explanation: expl("Un angle droit mesure 90°. Partagé en deux angles égaux, chacun mesure 90 ÷ 2 = 45°."),
    tags: ["angle_mesure", "defi"],
  },
  {
    kind: "fixed", id: "angle_defi_topup_2", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_defi", difficulty: 3, theme: "neutral",
    text: "Défi : un angle plat est partagé en deux angles égaux. Combien mesure chacun ?",
    format: "short", expected: ["90", "90°"], comparator: "number_equal",
    hint: "180 ÷ 2.",
    explanation: expl("Un angle plat mesure 180°. Partagé en deux angles égaux, chacun mesure 180 ÷ 2 = 90° (deux angles droits)."),
    tags: ["angle_mesure", "defi"],
  },
  {
    kind: "fixed", id: "angle_defi_topup_3", niveau: "6e", matiere: "maths",
    notionId: "angle_mesure", microId: "angle_defi", difficulty: 4, theme: "neutral",
    text: "Défi : deux angles côte à côte forment un angle plat. L’un mesure 110°. Combien mesure l’autre ?",
    format: "short", expected: ["70", "70°"], comparator: "number_equal",
    hint: "Les deux angles ont pour somme 180°.",
    explanation: expl("Les deux angles forment un angle plat de 180°. L’autre angle vaut donc 180 - 110 = 70°."),
    tags: ["angle_mesure", "defi"],
  },

  // =========================
  // GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES
  //
  // Le mode Défi (difficultés 3 à 5) n'offrait que 15 questions distinctes sur
  // « Angles ». Six générateurs, qui couvrent aussi le lexique du programme de
  // 6e resté sans question : angle nul, angle plein, angles adjacents,
  // supplémentaires, opposés par le sommet. Les noms des points changent à
  // chaque tirage.
  // =========================
  {
    kind: "template",
    id: "angle_reconnaitre_qcm_tpl_nature",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare la mesure à 0°, 90°, 180° et 360°.",
    tags: ["angle_mesure", "reconnaitre", "qcm", "template", "vocabulaire"],
    generate: () => {
      const v =
        Math.random() < 0.25
          ? pick([0, 90, 180, 360])
          : pick(Array.from({ length: 35 }, (_, i) => 5 * (i + 1)).filter((x) => x !== 90));
      const nature = natureAngle(v);
      const voisins: Record<NatureAngle, NatureAngle[]> = {
        nul: ["aigu", "plat", "plein"],
        aigu: ["droit", "obtus", "plat"],
        droit: ["aigu", "obtus", "plat"],
        obtus: ["aigu", "droit", "plat"],
        plat: ["obtus", "droit", "plein"],
        plein: ["plat", "nul", "obtus"],
      };
      const regle: Record<NatureAngle, string> = {
        nul: "Un angle de 0° a ses deux côtés confondus : c’est un angle nul.",
        aigu: `${v}° est compris entre 0° et 90° : c’est un angle aigu.`,
        droit: "Un angle de 90° est un angle droit.",
        obtus: `${v}° est compris entre 90° et 180° : c’est un angle obtus.`,
        plat: "Un angle de 180° a ses deux côtés alignés, dans des sens opposés : c’est un angle plat.",
        plein: "Un angle de 360° fait un tour complet : c’est un angle plein.",
      };
      // ⭐ 06/10 : noms de points, objets réels et tournures (une seule phrase avant).
      const n = nomAngle();
      const p = pick(PRENOMS);
      const enSituation = v > 0 && v < 180 && Math.random() < 0.5;
      const o = enSituation ? objetPour(v) : null;
      const t = o
        ? pick([
            `${o.phrase(p)} L’angle ${n.nom} entre ${o.cotes} mesure ${v}°. Comment l’appelle-t-on ?`,
            `${o.phrase(p)} ${o.cotes[0].toUpperCase()}${o.cotes.slice(1)} forment un angle de ${v}°. Quelle est sa nature ?`,
          ])
        : pick([
            `L’angle ${n.nom} mesure ${v}°. Comment l’appelle-t-on ?`,
            `Un angle mesure ${v}°. Quelle est sa nature ?`,
            `${p.nom} mesure l’angle ${n.nom} et trouve ${v}°. Choisis le bon nom pour cet angle.`,
            `Quel nom donne-t-on à un angle de ${v}° comme l’angle ${n.nom} ?`,
          ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([nature, ...voisins[nature]].map((x) => `un angle ${x}`)),
        expected: [`un angle ${nature}`],
        comparator: "mcq_exact",
        explanation: expl(regle[nature]),
        // On demande la nature : l'angle à sa mesure, ni mesure écrite ni carré (0° et 360° ne se dessinent pas).
        ...(v > 0 && v < 360 ? { canvas: figureMesure(v, n, t, { mesure: "rien" }) } : {}),
      };
    },
  },
  {
    kind: "template",
    id: "angle_mesurer_qcm_tpl_rapporteur",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Avant de lire, regarde si l’angle est aigu ou obtus : cela élimine une mauvaise lecture.",
    tags: ["angle_mesure", "mesure", "qcm", "template", "canvas", "rapporteur"],
    generate: () => {
      const v = 10 * randomInt(2, 16);
      const [gauche, sommet, droite] = lettres(3);
      const autre = v === 90 ? 110 : 180 - v;
      // ⭐ 29/09 : une fois sur deux, le rapporteur de classe à DEUX graduations.
      const double = Math.random() < 0.5;
      const p = pick(PRENOMS);
      const nom = `${gauche}${sommet}${droite}`;
      return {
        // ⭐ 06/10 : tournures et prénoms (une seule phrase servait).
        text: pick([
          `Le rapporteur est posé sur l’angle ${nom}. Quelle est la mesure de cet angle ?`,
          `${p.nom} a posé son rapporteur sur l’angle ${nom}. Lis la mesure de l’angle.`,
          `Lis sur le rapporteur la mesure de l’angle ${nom}.`,
          `${p.nom} mesure l’angle ${nom} de sa figure. Que lit-${p.f ? "elle" : "il"} sur le rapporteur ?`,
          `Quelle mesure le rapporteur donne-t-il pour l’angle ${nom} ?`,
        ]),
        format: "qcm",
        choices: shuffle([`${v}°`, `${autre}°`, `${v + 10}°`, `${v - 10}°`]),
        expected: [`${v}°`],
        comparator: "mcq_exact",
        explanation: expl(
          `Le centre du rapporteur est sur le sommet ${sommet} et le 0 sur le côté [${sommet}${droite}). ` +
            (double
              ? `Ce rapporteur a deux graduations : on lit celle dont le 0 est sur [${sommet}${droite}), la graduation extérieure. Le côté [${sommet}${gauche}) y passe par ${v}. `
              : `Le côté [${sommet}${gauche}) passe par la graduation ${v}. `) +
            (v === 90
              ? "C’est un angle droit : 90°."
              : `Vérification : l’angle est ${v < 90 ? "aigu, donc sa mesure est inférieure" : "obtus, donc sa mesure est supérieure"} à 90° — ce qui écarte ${180 - v}°, la lecture sur la mauvaise graduation.`),
        ),
        canvas: angleAuRapporteur(v, { sommet, gauche, droite }, double ? "double" : "simple"),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_supplementaires",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Trois points alignés forment un angle plat : 180°.",
    tags: ["angle_mesure", "defi", "template", "canvas", "supplementaires"],
    generate: () => {
      const [X, O, Y, Z] = lettres(4);
      const a = randomInt(15, 165);
      const r = 180 - a;
      return {
        text: pick([
          `Les points ${X}, ${O} et ${Z} sont alignés, et ${O} est entre ${X} et ${Z}. L’angle ${X}${O}${Y} mesure ${a}°. Combien mesure l’angle ${Y}${O}${Z} ?`,
          `L’angle ${X}${O}${Y} mesure ${a}°. Les points ${X}, ${O} et ${Z} sont alignés, et ${O} est entre ${X} et ${Z}. Calcule l’angle ${Y}${O}${Z}.`,
          `Les points ${X}, ${O} et ${Z} sont alignés, et ${O} est entre ${X} et ${Z}. On donne : l’angle ${X}${O}${Y} mesure ${a}°. Trouve l’angle ${Y}${O}${Z}.`,
          `Sur la figure, les points ${X}, ${O} et ${Z} sont alignés, et ${O} est entre ${X} et ${Z}. L’angle ${X}${O}${Y} mesure ${a}°. Quelle est la mesure de l’angle ${Y}${O}${Z} ?`,
        ]),
        format: "short",
        expected: [`${r}°`, String(r)],
        comparator: "number_equal",
        explanation: expl(
          `L’angle ${X}${O}${Z} est plat : il mesure 180°. Les angles ${X}${O}${Y} et ${Y}${O}${Z} sont adjacents et le remplissent : ils sont supplémentaires. Donc ${Y}${O}${Z} = 180 − ${a} = ${r}°.`,
        ),
        canvas: figureRayons(O, [
          { nom: Z, deg: 0 },
          { nom: Y, deg: 180 - a },
          { nom: X, deg: 180 },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_adjacents",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux petits angles, côte à côte, forment le grand.",
    tags: ["angle_mesure", "defi", "template", "canvas", "adjacents"],
    generate: () => {
      const [A, O, B, C] = lettres(4);
      const T = randomInt(50, 170);
      const a = randomInt(10, T - 10);
      const r = T - a;
      return {
        text: pick([
          `L’angle ${A}${O}${C} mesure ${T}°. La demi-droite [${O}${B}) est à l’intérieur de cet angle, et l’angle ${A}${O}${B} mesure ${a}°. Combien mesure l’angle ${B}${O}${C} ?`,
          `[${O}${B}) coupe l’angle ${A}${O}${C} en deux. L’angle ${A}${O}${C} mesure ${T}° et l’angle ${A}${O}${B} mesure ${a}°. Calcule l’angle ${B}${O}${C}.`,
          `L’angle ${A}${O}${B} mesure ${a}°. L’angle ${A}${O}${C}, qui le contient, mesure ${T}°. Trouve l’angle ${B}${O}${C}.`,
          `Sur la figure, l’angle ${A}${O}${C} mesure ${T}° et l’angle ${A}${O}${B} mesure ${a}°. Quelle est la mesure de l’angle ${B}${O}${C} ?`,
        ]),
        format: "short",
        expected: [`${r}°`, String(r)],
        comparator: "number_equal",
        explanation: expl(
          `Les angles ${A}${O}${B} et ${B}${O}${C} sont adjacents : ensemble, ils forment l’angle ${A}${O}${C}. Donc ${B}${O}${C} = ${T} − ${a} = ${r}°.`,
        ),
        canvas: figureRayons(O, [
          { nom: C, deg: 0 },
          { nom: B, deg: r },
          { nom: A, deg: T },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_opposes_par_le_sommet",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux angles opposés par le sommet ont la même mesure ; deux angles côte à côte sur une droite font 180°.",
    tags: ["angle_mesure", "defi", "template", "canvas", "opposes_par_le_sommet"],
    generate: () => {
      const [A, B, C, D, O] = lettres(5);
      let a = randomInt(20, 160);
      if (a === 90) a = 70;
      const cas = pick([
        {
          angle: `${B}${O}${D}`,
          r: a,
          pourquoi: `Les angles ${A}${O}${C} et ${B}${O}${D} sont opposés par le sommet : ils ont la même mesure, ${a}°.`,
        },
        {
          angle: `${C}${O}${B}`,
          r: 180 - a,
          pourquoi: `${A}, ${O} et ${B} sont alignés : l’angle ${A}${O}${B} est plat. Les angles ${A}${O}${C} et ${C}${O}${B} sont donc supplémentaires : 180 − ${a} = ${180 - a}°.`,
        },
        {
          angle: `${A}${O}${D}`,
          r: 180 - a,
          pourquoi: `${C}, ${O} et ${D} sont alignés : l’angle ${C}${O}${D} est plat. Les angles ${A}${O}${C} et ${A}${O}${D} sont donc supplémentaires : 180 − ${a} = ${180 - a}°.`,
        },
      ]);
      return {
        text: pick([
          `Les droites (${A}${B}) et (${C}${D}) se coupent en ${O}. L’angle ${A}${O}${C} mesure ${a}°. Combien mesure l’angle ${cas.angle} ?`,
          `L’angle ${A}${O}${C} mesure ${a}°. Les droites (${A}${B}) et (${C}${D}) se coupent en ${O}. Calcule l’angle ${cas.angle}.`,
          `(${A}${B}) et (${C}${D}) se coupent en ${O}. L’angle ${A}${O}${C} mesure ${a}°. Trouve l’angle ${cas.angle}.`,
          `Sur la figure, (${A}${B}) et (${C}${D}) se coupent en ${O}. L’angle ${A}${O}${C} mesure ${a}°. Quelle est la mesure de l’angle ${cas.angle} ?`,
          `Regarde le croisement : (${A}${B}) et (${C}${D}) se coupent en ${O}. L’angle ${A}${O}${C} mesure ${a}°. Donne la mesure de l’angle ${cas.angle}.`,
        ]),
        format: "short",
        expected: [`${cas.r}°`, String(cas.r)],
        comparator: "number_equal",
        explanation: expl(cas.pourquoi),
        canvas: figureRayons(O, [
          { nom: A, deg: 0 },
          { nom: C, deg: a },
          { nom: B, deg: 180 },
          { nom: D, deg: 180 + a },
        ]),
      };
    },
  },
  {
    kind: "template",
    id: "angle_defi_tpl_angle_plein",
    niveau: "6e",
    matiere: "maths",
    notionId: "angle_mesure",
    microId: "angle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Un tour complet, c’est un angle plein : 360°.",
    tags: ["angle_mesure", "defi", "template", "canvas", "angle_plein"],
    generate: () => {
      const [O, P, R, S] = lettres(4);
      // Trois angles saillants (moins de 180° chacun) qui font le tour.
      const a = randomInt(60, 170);
      const b = randomInt(Math.max(60, 185 - a), Math.min(170, 300 - a));
      const c = 360 - a - b;
      return {
        text: pick([
          `Autour du point ${O}, les trois angles ${P}${O}${R}, ${R}${O}${S} et ${S}${O}${P} font un tour complet. L’angle ${P}${O}${R} mesure ${a}° et l’angle ${R}${O}${S} mesure ${b}°. Combien mesure l’angle ${S}${O}${P} ?`,
          `Trois angles font un tour complet autour de ${O}. L’angle ${P}${O}${R} mesure ${a}°, l’angle ${R}${O}${S} mesure ${b}°. Calcule l’angle ${S}${O}${P}.`,
          `L’angle ${P}${O}${R} mesure ${a}° et l’angle ${R}${O}${S} mesure ${b}°. Avec l’angle ${S}${O}${P}, ils font un tour complet. Trouve l’angle ${S}${O}${P}.`,
          `Un tour complet autour de ${O} est coupé en trois. L’angle ${P}${O}${R} mesure ${a}°, l’angle ${R}${O}${S} mesure ${b}°. Quelle est la mesure de l’angle ${S}${O}${P} ?`,
          `Regarde le tour complet autour de ${O}. L’angle ${P}${O}${R} mesure ${a}° et l’angle ${R}${O}${S} mesure ${b}°. Donne la mesure de l’angle ${S}${O}${P}.`,
        ]),
        format: "short",
        expected: [`${c}°`, String(c)],
        comparator: "number_equal",
        explanation: expl(
          `Un tour complet est un angle plein : 360°. Donc ${S}${O}${P} = 360 − ${a} − ${b} = ${c}°.`,
        ),
        canvas: figureRayons(O, [
          { nom: P, deg: 0 },
          { nom: R, deg: a },
          { nom: S, deg: a + b },
        ]),
      };
    },
  },

  // =========================
  // ⭐ 07/11/2026 — GABARITS « À PLUSIEURS FAÇONS » : une quarantaine de phrases par étoile.
  // =========================
  gabarit("angle_reconnaitre_tpl_sommet_figure", "angle_reconnaitre", 1, "Le sommet est le point d’où partent les deux côtés.", ["angle_mesure", "reconnaitre", "template", "canvas"], genRecSommetFigure),
  gabarit("angle_reconnaitre_tpl_sommet_nom", "angle_reconnaitre", 1, "Le sommet s’écrit au milieu du nom.", ["angle_mesure", "reconnaitre", "template"], genRecSommetNom),
  gabarit("angle_reconnaitre_tpl_nom_figure", "angle_reconnaitre", 1, "Le sommet s’écrit au milieu du nom.", ["angle_mesure", "reconnaitre", "template", "canvas"], genRecNomFigure),
  gabarit("angle_reconnaitre_tpl_cotes", "angle_reconnaitre", 1, "Les deux côtés sont des demi-droites qui partent du sommet.", ["angle_mesure", "reconnaitre", "template", "canvas"], genRecCotes),
  gabarit("angle_reconnaitre_tpl_verdict", "angle_reconnaitre", 1, "Le sommet est la lettre du milieu.", ["angle_mesure", "reconnaitre", "template"], genRecVerdict),
  gabarit("angle_reconnaitre_tpl_nature_mesure", "angle_reconnaitre", 2, REGLE_NATURE, ["angle_mesure", "reconnaitre", "template", "nature"], genNatMesure),
  gabarit("angle_reconnaitre_tpl_nature_figure", "angle_reconnaitre", 2, "Compare l’ouverture au coin de ton équerre.", ["angle_mesure", "reconnaitre", "template", "nature", "canvas"], genNatFigure),
  gabarit("angle_reconnaitre_tpl_mesure_pour_nature", "angle_reconnaitre", 2, REGLE_NATURE, ["angle_mesure", "reconnaitre", "template", "nature"], genNatPourMesure),
  gabarit("angle_reconnaitre_tpl_intervalle", "angle_reconnaitre", 2, REGLE_NATURE, ["angle_mesure", "reconnaitre", "template", "nature"], genNatIntervalle),
  gabarit("angle_reconnaitre_tpl_compter_nature", "angle_reconnaitre", 2, REGLE_NATURE, ["angle_mesure", "reconnaitre", "template", "nature"], genNatCompter),
  gabarit("angle_reconnaitre_tpl_origine", "angle_reconnaitre", 2, "L’origine des deux côtés est le sommet.", ["angle_mesure", "reconnaitre", "template"], genNatOrigine),

  gabarit("angle_droit_tpl_codage", "angle_droit", 1, "Un petit carré au sommet code un angle droit.", ["angle_mesure", "angle_droit", "template", "canvas"], genDroitCodage),
  gabarit("angle_droit_tpl_mesure_verdict", "angle_droit", 1, "Droit : exactement 90°.", ["angle_mesure", "angle_droit", "template"], genDroitMesureVerdict),
  gabarit("angle_droit_tpl_signe", "angle_droit", 1, "Regarde le sommet : un petit carré.", ["angle_mesure", "angle_droit", "template"], genDroitSigne),
  gabarit("angle_droit_tpl_outil", "angle_droit", 1, "L’équerre a un coin droit.", ["angle_mesure", "angle_droit", "template"], genDroitOutil),
  gabarit("angle_droit_tpl_trouver", "angle_droit", 1, "Droit : exactement 90°.", ["angle_mesure", "angle_droit", "template"], genDroitTrouver),
  gabarit("angle_droit_qcm_tpl_oeil", "angle_droit", 2, "Imagine le coin de ton équerre posé sur le sommet.", ["angle_mesure", "angle_droit", "template", "canvas"], genDroitOeil),
  gabarit("angle_droit_tpl_complement", "angle_droit", 2, "Un angle droit, c’est 90° : cherche ce qui manque.", ["angle_mesure", "angle_droit", "template"], genDroitComplement),
  gabarit("angle_droit_tpl_plusieurs", "angle_droit", 2, "Un angle droit, c’est 90°.", ["angle_mesure", "angle_droit", "template"], genDroitPlusieurs),
  gabarit("angle_droit_tpl_perpendiculaire", "angle_droit", 2, "Perpendiculaires : elles forment des angles droits.", ["angle_mesure", "angle_droit", "template"], genDroitPerpendiculaire),
  gabarit("angle_droit_tpl_vrai_faux", "angle_droit", 2, "Droit : exactement 90°, quels que soient les côtés.", ["angle_mesure", "angle_droit", "template"], genDroitVraiFaux),
  gabarit("angle_droit_tpl_ctx3_metier", "angle_droit", 3, "Droit veut dire 90° exactement.", ["angle_mesure", "angle_droit", "template", "contexte"], genDroitMetier),
  gabarit("angle_droit_tpl_ctx3_horloge", "angle_droit", 3, "Entre deux chiffres de l’horloge : 30°.", ["angle_mesure", "angle_droit", "template", "contexte"], genDroitHorloge),
  gabarit("angle_droit_tpl_ctx3_chantier", "angle_droit", 3, "Un coin droit mesure 90°, un tour complet 360°.", ["angle_mesure", "angle_droit", "template", "contexte"], genDroitChantier),

  gabarit("angle_comparer_tpl_ouvert", "angle_comparer", 1, "Le plus ouvert a la plus grande mesure.", ["angle_mesure", "comparaison", "template"], genCompOuvert),
  gabarit("angle_comparer_tpl_verdict", "angle_comparer", 1, "Compare les deux nombres de degrés.", ["angle_mesure", "comparaison", "template"], genCompVerdict),
  gabarit("angle_comparer_tpl_cotes", "angle_comparer", 1, "Seule l’ouverture compte, pas la longueur des côtés.", ["angle_mesure", "comparaison", "template"], genCompCotes),
  gabarit("angle_comparer_tpl_egaux", "angle_comparer", 1, "Égaux : la même mesure.", ["angle_mesure", "comparaison", "template"], genCompEgaux),
  gabarit("angle_comparer_tpl_ranger", "angle_comparer", 2, "Lis les nombres de degrés, puis range-les.", ["angle_mesure", "comparaison", "template"], genCompRanger),
  gabarit("angle_comparer_tpl_entre", "angle_comparer", 2, "Plus grand que le premier, plus petit que le second.", ["angle_mesure", "comparaison", "template"], genCompEntre),
  gabarit("angle_comparer_tpl_ecart", "angle_comparer", 2, "L’écart : le grand moins le petit.", ["angle_mesure", "comparaison", "template"], genCompEcart),
  gabarit("angle_comparer_tpl_natures", "angle_comparer", 2, "Dans l’ordre : aigu, droit, obtus, plat.", ["angle_mesure", "comparaison", "template"], genCompNatures),
  gabarit("angle_comparer_tpl_trois_dessin", "angle_comparer", 2, "Regarde l’ouverture de chaque angle.", ["angle_mesure", "comparaison", "template", "canvas"], genCompTroisDessin),
  gabarit("angle_comparer_tpl_de_plus", "angle_comparer", 2, "De plus : on ajoute. De moins : on retire.", ["angle_mesure", "comparaison", "template"], genCompDePlus),
  gabarit("angle_comparer_tpl_ctx3_pentes", "angle_comparer", 3, "Plus l’angle avec le sol est grand, plus la pente est raide.", ["angle_mesure", "comparaison", "template", "contexte"], genCompPentes),
  gabarit("angle_comparer_tpl_ctx3_piege_cotes", "angle_comparer", 3, "La longueur des côtés ne compte pas.", ["angle_mesure", "comparaison", "template", "contexte"], genCompPiegeCotes),
  gabarit("angle_comparer_tpl_ctx3_ouvrir", "angle_comparer", 3, "L’écart : le grand moins le petit.", ["angle_mesure", "comparaison", "template", "contexte"], genCompOuvrir),
  gabarit("angle_comparer_tpl_ctx3_horloge", "angle_comparer", 3, "Chaque heure ajoute 30°, jusqu’à 6 h.", ["angle_mesure", "comparaison", "template", "contexte"], genCompHorloge),

  gabarit("angle_mesurer_tpl_rapporteur_simple", "angle_mesurer", 1, "Pars du 0, suis la graduation jusqu’à l’autre côté.", ["angle_mesure", "mesure", "template", "canvas", "rapporteur"], () => genMesRapporteur(false)),
  gabarit("angle_mesurer_tpl_symbole", "angle_mesurer", 1, "Le symbole ° veut dire degrés.", ["angle_mesure", "mesure", "template"], genMesSymbole),
  gabarit("angle_mesurer_tpl_geste", "angle_mesurer", 1, "Centre sur le sommet, 0 sur un côté, lecture sur l’autre.", ["angle_mesure", "mesure", "template"], genMesGeste),
  gabarit("angle_mesurer_tpl_estimer", "angle_mesurer", 1, "Compare au coin de ton équerre : 90°.", ["angle_mesure", "mesure", "template", "canvas"], genMesEstimer),
  gabarit("angle_mesurer_tpl_quoi", "angle_mesurer", 1, "Rapporteur : les angles. Règle : les longueurs.", ["angle_mesure", "mesure", "template"], genMesQuoi),
  gabarit("angle_mesurer_tpl_bornes", "angle_mesurer", 1, "Lis les nombres au bout de la graduation.", ["angle_mesure", "mesure", "template", "canvas", "rapporteur"], genMesBornes),
  gabarit("angle_mesurer_tpl_rapporteur_double", "angle_mesurer", 2, "Aigu ou obtus ? Cela écarte la mauvaise graduation.", ["angle_mesure", "mesure", "template", "canvas", "rapporteur"], () => genMesRapporteur(true)),
  gabarit("angle_mesurer_tpl_lecture", "angle_mesurer", 2, "Aigu : moins de 90°. Obtus : plus de 90°.", ["angle_mesure", "mesure", "template"], genMesLecture),
  gabarit("angle_mesurer_tpl_possible", "angle_mesurer", 2, "Aigu : moins de 90°. Obtus : plus de 90°.", ["angle_mesure", "mesure", "template"], genMesPossible),
  gabarit("angle_mesurer_tpl_etapes", "angle_mesurer", 2, "Centre, puis 0, puis lecture.", ["angle_mesure", "mesure", "template"], genMesEtapes),
  gabarit("angle_mesurer_tpl_estimer_fin", "angle_mesurer", 2, "Aigu ou obtus ? Puis compare au coin de l’équerre.", ["angle_mesure", "mesure", "template", "canvas"], genMesEstimerFin),
  gabarit("angle_mesurer_tpl_graduations", "angle_mesurer", 2, "L’angle est l’écart entre les deux graduations.", ["angle_mesure", "mesure", "template"], genMesGraduations),

  gabarit("angle_tracer_tpl_instrument", "angle_tracer", 1, "L’instrument gradué en degrés.", ["angle_mesure", "tracer", "template"], genTrInstrument),
  gabarit("angle_tracer_tpl_cotes", "angle_tracer", 1, "Deux côtés, qui partent du sommet.", ["angle_mesure", "tracer", "template"], genTrCotes),
  gabarit("angle_tracer_tpl_repere", "angle_tracer", 1, "Compte à partir du 0.", ["angle_mesure", "tracer", "template"], genTrRepere),
  gabarit("angle_tracer_tpl_nature", "angle_tracer", 1, "Compare la mesure à 90°.", ["angle_mesure", "tracer", "template"], genTrNature),
  gabarit("angle_tracer_tpl_verifier", "angle_tracer", 1, "Lis la graduation qui part du 0.", ["angle_mesure", "tracer", "template", "canvas", "rapporteur"], genTrVerifier),
  gabarit("angle_tracer_tpl_poser", "angle_tracer", 1, "Centre sur le sommet, 0 sur le côté tracé.", ["angle_mesure", "tracer", "template"], genTrPoser),
  gabarit("angle_tracer_tpl_suite", "angle_tracer", 2, "Le second côté part du sommet et passe par le repère.", ["angle_mesure", "tracer", "template"], genTrSuite),
  gabarit("angle_tracer_tpl_erreur", "angle_tracer", 2, "Compare la mesure à 90°.", ["angle_mesure", "tracer", "template"], genTrErreur),
  gabarit("angle_tracer_tpl_calcul", "angle_tracer", 2, "Calcule d’abord la mesure à tracer.", ["angle_mesure", "tracer", "template"], genTrCalcul),
  gabarit("angle_tracer_tpl_equerre", "angle_tracer", 2, "L’équerre ne donne que 90°.", ["angle_mesure", "tracer", "template"], genTrEquerre),

  gabarit("angle_defi_tpl_parts", "angle_defi", 4, "Une part d’abord : 360 ÷ le nombre de parts.", ["angle_mesure", "defi", "template", "contexte"], genDefiParts),
  gabarit("angle_defi_tpl_minutes", "angle_defi", 4, "Un tour : 360°. En 60 minutes ou en 12 heures.", ["angle_mesure", "defi", "template", "contexte"], genDefiMinutes),
  gabarit("angle_defi_tpl_trois_angles", "angle_defi", 4, "Retire les deux angles connus de l’angle total.", ["angle_mesure", "defi", "template", "canvas"], genDefiTroisAngles),
  gabarit("angle_defi_tpl_tours", "angle_defi", 4, "Quart de tour : 90°. Demi-tour : 180°.", ["angle_mesure", "defi", "template", "contexte"], genDefiTours),
  gabarit("angle_defi_tpl_moitie", "angle_defi", 5, "Deux angles égaux : le grand angle vaut le double.", ["angle_mesure", "defi", "template", "canvas"], genDefiMoitie),
  gabarit("angle_defi_tpl_fois_plus", "angle_defi", 5, "Compte les parts égales : le double fait 3 parts en tout.", ["angle_mesure", "defi", "template"], genDefiFoisPlus),
  gabarit("angle_defi_tpl_croix_somme", "angle_defi", 5, "Opposés : égaux. Voisins : 180° à deux. Les quatre : 360°.", ["angle_mesure", "defi", "template", "canvas"], genDefiCroixSomme),
  gabarit("angle_defi_tpl_rayons", "angle_defi", 5, "Un tour complet : 360°.", ["angle_mesure", "defi", "template", "contexte"], genDefiRayons),
  gabarit("angle_defi_tpl_heures", "angle_defi", 5, "Chaque heure ajoute 30°, jusqu’à 6 h.", ["angle_mesure", "defi", "template", "contexte"], genDefiHeures),
  gabarit("angle_defi_tpl_partage_inegal", "angle_defi", 5, "Retire les deux angles égaux de l’angle total.", ["angle_mesure", "defi", "template", "canvas"], genDefiPartageInegal),

  gabarit("angle_relations_tpl_verdict", "angle_relations", 1, "Supplémentaires : 180° ensemble.", ["angle_mesure", "relations", "template"], genRelVerdict),
  gabarit("angle_relations_tpl_vocab", "angle_relations", 1, "Adjacents, opposés, supplémentaires : retiens leur définition.", ["angle_mesure", "relations", "template"], genRelVocab),
  gabarit("angle_relations_tpl_oppose", "angle_relations", 1, "Opposés par le sommet : face à face au croisement.", ["angle_mesure", "relations", "template", "canvas"], genRelOppose),
  gabarit("angle_relations_tpl_complete", "angle_relations", 2, "Un angle plat : 180°.", ["angle_mesure", "relations", "template"], genRelComplete),
  gabarit("angle_relations_tpl_difference", "angle_relations", 2, "Des angles adjacents s’ajoutent : retire le petit du total.", ["angle_mesure", "relations", "template", "canvas"], genRelDifference),
  gabarit("angle_relations_tpl_reconnaitre", "angle_relations", 2, "Face à face : opposés. Un côté commun : adjacents.", ["angle_mesure", "relations", "template", "canvas"], genRelReconnaitre),
  gabarit("angle_relations_tpl_meme_mesure", "angle_relations", 2, "Deux angles opposés par le sommet sont égaux.", ["angle_mesure", "relations", "template", "canvas"], genRelMemeMesure),
  gabarit("angle_relations_tpl_voisin", "angle_relations", 2, "Voisin : 180° à deux. Opposé : la même mesure.", ["angle_mesure", "relations", "template"], genRelVoisin),
  gabarit("angle_relations_tpl_double", "angle_relations", 4, "Compte les parts égales : le double fait 3 parts en tout.", ["angle_mesure", "relations", "template"], genRelDouble),
  gabarit("angle_relations_tpl_extreme", "angle_relations", 4, "Deux mesures seulement : l’angle donné et 180° moins cet angle.", ["angle_mesure", "relations", "template"], genRelExtreme),
  gabarit("angle_relations_tpl_croix_somme", "angle_relations", 4, "Opposés : égaux. Voisins : 180° à deux. Les quatre : 360°.", ["angle_mesure", "relations", "template", "canvas"], genRelCroixSomme),
  gabarit("angle_relations_tpl_ecart", "angle_relations", 4, "Retire l’écart de 180°, puis partage en deux.", ["angle_mesure", "relations", "template"], genRelEcart),
  gabarit("angle_relations_tpl_tour_complet", "angle_relations", 4, "Un tour complet : 360°.", ["angle_mesure", "relations", "template", "canvas"], genRelTourComplet),
];