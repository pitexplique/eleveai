import type { TutorBankItemV4, TriangleCanvasData, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS, de, type Prenom } from "./entiers.bank";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

// Des noms de sommets variés — le triangle n'est pas toujours ABC. Sans O ni Q,
// trop proches à l'écran. Rangés dans l'ordre alphabétique pour le NOM du
// triangle (« triangle DKR »), comme on l'écrit en classe.
const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function sommetsTriangle(): [string, string, string] {
  const [x, y, z] = shuffle(LETTRES).slice(0, 3).sort();
  return [x, y, z];
}

/** Un segment nommé avec ses extrémités dans l'ordre alphabétique : [DK], pas [KD]. */
function seg(p: string, q: string) {
  return `[${[p, q].sort().join("")}]`;
}

/** Longueur d'un côté, sans les crochets : DK. */
function lg(p: string, q: string) {
  return [p, q].sort().join("");
}

function expl(calcul: string) {
  return (
    "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
    "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

// =====================================================================
// ⭐ 06/10/2026 — DES SITUATIONS, PAS UNE PHRASE (PASSATION-COACH-MATHS-6E-CONSIGNE.md).
// Mesuré le 05/10 : 5 à 15 squelettes par micro, 15 à 18 répétitions sur 20 —
// « Combien de côtés possède un triangle ? » revenait à l'identique. Chaque
// gabarit compose maintenant un OBJET réel (toit, voile, fanion…) × une
// TOURNURE × un prénom × des noms de sommets tirés au hasard. Les figures sont
// FIDÈLES aux mesures de l'énoncé (un triangle rectangle est vraiment droit,
// un isocèle a vraiment deux côtés égaux) et portent les noms de l'énoncé.
// Chaque gabarit a son correcteur : correcteurs/triangles.ts.
// =====================================================================
type Q = TutorGeneratedQuestionV4;
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
/** Virgule décimale française, deux décimales au plus. */
const fr = (n: number) => String(Math.round(n * 100) / 100).replace(".", ",");
const prenom = (): Prenom => pick(PRENOMS);

/** Un objet réel en forme de triangle, avec l'unité et l'ordre de grandeur de ses côtés. */
type Objet = { nom: string; u: "cm" | "m"; min: number; max: number };
const OBJETS: Objet[] = [
  { nom: "le toit d’une cabane", u: "m", min: 2, max: 6 },
  { nom: "la voile d’un bateau", u: "m", min: 2, max: 9 },
  { nom: "un fanion de supporter", u: "cm", min: 15, max: 45 },
  { nom: "une parcelle de jardin", u: "m", min: 4, max: 25 },
  { nom: "un cerf-volant", u: "cm", min: 40, max: 95 },
  { nom: "le pignon d’une maison", u: "m", min: 4, max: 10 },
  { nom: "une tente vue de face", u: "m", min: 1, max: 3 },
  { nom: "un morceau de tissu", u: "cm", min: 10, max: 60 },
  { nom: "une pièce de puzzle", u: "cm", min: 3, max: 9 },
  { nom: "un carreau de mosaïque", u: "cm", min: 4, max: 15 },
  { nom: "une étagère d’angle", u: "cm", min: 25, max: 60 },
  { nom: "un champ", u: "m", min: 40, max: 150 },
  { nom: "une rampe de skate vue de côté", u: "m", min: 1, max: 4 },
  { nom: "un sandwich coupé en deux", u: "cm", min: 8, max: 14 },
  { nom: "une serviette pliée", u: "cm", min: 15, max: 35 },
  { nom: "un panneau de randonnée", u: "cm", min: 30, max: 80 },
];
const objet = () => pick(OBJETS);

/** La phrase qui pose le triangle `nom` dans sa situation. */
function situation(nom: string, o: Objet, P: Prenom) {
  return pick([
    `${P.nom} dessine ${o.nom} : c’est le triangle ${nom}.`,
    `${cap(o.nom)} a la forme du triangle ${nom}.`,
    `On représente ${o.nom} par le triangle ${nom}.`,
    `Sur le cahier ${de(P.nom)}, le triangle ${nom} représente ${o.nom}.`,
    `${P.nom} observe ${o.nom}. Sa forme est celle du triangle ${nom}.`,
  ]);
}

/** Une lettre qui n'est PAS un sommet du triangle. */
function autreLettre(sauf: string[]) {
  return pick(LETTRES.filter((l) => !sauf.includes(l)));
}

type Pt = { x: number; y: number };
/** Met trois points (repère mathématique, y vers le haut) dans le cadre du dessin. */
function cadrer(p: Pt[], W = 320, H = 250, m = 42): [Pt, Pt, Pt] {
  const xs = p.map((q) => q.x);
  const ys = p.map((q) => q.y);
  const [x0, x1, y0, y1] = [Math.min(...xs), Math.max(...xs), Math.min(...ys), Math.max(...ys)];
  const s = Math.min((W - 2 * m) / Math.max(x1 - x0, 1e-6), (H - 2 * m) / Math.max(y1 - y0, 1e-6));
  const ox = (W - (x1 - x0) * s) / 2;
  const oy = (H - (y1 - y0) * s) / 2;
  return p.map((q) => ({ x: Math.round(ox + (q.x - x0) * s), y: Math.round(H - oy - (q.y - y0) * s) })) as [Pt, Pt, Pt];
}
/** Triangle de côtés AB = c, BC = a, CA = b : A à gauche, B à droite, C en haut. */
function pointsParCotes(c: number, a: number, b: number) {
  const x = (b * b + c * c - a * a) / (2 * c);
  const y = Math.sqrt(Math.max(b * b - x * x, 0));
  return cadrer([{ x: 0, y: 0 }, { x: c, y: 0 }, { x, y }]);
}
/** Triangle d'angles A = angA et B = angB (en degrés), base [AB] horizontale. */
function pointsParAngles(angA: number, angB: number) {
  const r = (d: number) => (d * Math.PI) / 180;
  const tA = Math.tan(r(angA));
  const tB = Math.tan(r(angB));
  // C est à l'intersection de y = tA·x et y = tB·(1 − x) (angles droits traités à part).
  let x: number;
  if (angA === 90) x = 0;
  else if (angB === 90) x = 1;
  else x = tB / (tA + tB);
  const y = angA === 90 ? tB * 1 : x * tA;
  return cadrer([{ x: 0, y: 0 }, { x: 1, y: 0 }, { x, y }]);
}
/** Le canvas triangle : sommets A, B, C du dessin nommés comme dans l'énoncé. */
function figure(
  pts: [Pt, Pt, Pt],
  noms: [string, string, string],
  plus: Partial<TriangleCanvasData> = {},
): TriangleCanvasData {
  return {
    kind: "triangle",
    size: { width: 320, height: 250 },
    points: { A: pts[0], B: pts[1], C: pts[2] },
    labels: { A: noms[0], B: noms[1], C: noms[2] },
    display: { showPoints: true, showLabels: true, showSides: Boolean(plus.sideLabels), showAngles: Boolean(plus.angleLabels) },
    ...plus,
  };
}
/** Trois longueurs (même unité) qui forment un triangle de la nature voulue. */
function longueurs(o: Objet, nature: "équilatéral" | "isocèle" | "quelconque"): [number, number, number] {
  const tirer = () => (o.u === "m" && o.max <= 10 ? randomInt(o.min * 2, o.max * 2) / 2 : randomInt(o.min, o.max));
  for (;;) {
    const a = tirer();
    let b = tirer();
    let c = tirer();
    if (nature === "équilatéral") return [a, a, a];
    if (nature === "isocèle") c = a;
    // Des différences VISIBLES sur la figure (15 % au moins entre deux côtés différents).
    const loin = (u: number, v: number) => Math.abs(u - v) >= 0.15 * Math.max(u, v);
    if (nature === "isocèle" && (!loin(a, b) || b >= 2 * a)) continue;
    if (nature === "quelconque" && (!loin(a, b) || !loin(b, c) || !loin(a, c))) continue;
    const [p, q, r] = [a, b, c].sort((u, v) => u - v);
    if (p + q <= r * 1.15) continue; // un triangle bien visible, pas presque plat
    // Pas de triangle rectangle caché (3, 4, 5…) : « quelconque » serait discutable.
    if (Math.abs(p * p + q * q - r * r) < 0.03 * r * r) continue;
    return [a, b, c];
  }
}
/** Un triangle « quelconque » dessiné pour illustrer (nommer, sommets, côtés). */
function dessinQuelconque(noms: [string, string, string]) {
  const [c, a, b] = pick([[6, 5, 4], [7, 6, 5], [6, 4.5, 4.5], [7, 5, 6], [8, 6, 5.5]]);
  return figure(pointsParCotes(c, a, b), noms);
}

// ----- TRIANGLE_NOMMER
function genNommerDepuisSommets(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const o = objet();
  const P = prenom();
  const W = autreLettre([X, Y, Z]);
  const intro = pick([
    `${P.nom} dessine ${o.nom}. Ses trois sommets sont ${X}, ${Y} et ${Z}.`,
    `${cap(o.nom)} a trois coins : les points ${X}, ${Y} et ${Z}.`,
    `Sur le dessin ${de(P.nom)}, ${o.nom} a pour sommets ${X}, ${Y} et ${Z}.`,
    `On représente ${o.nom} par un triangle. Ses sommets sont ${X}, ${Y} et ${Z}.`,
  ]);
  const question = pick([
    "Comment nomme-t-on ce triangle ?",
    "Quel nom peut-on donner à ce triangle ?",
    "Quelle écriture désigne ce triangle ?",
    "Choisis le bon nom pour ce triangle.",
  ]);
  const juste = `triangle ${shuffle([X, Y, Z]).join("")}`;
  const pieges = shuffle([
    `triangle ${X}${Y}`,
    `triangle ${Y}${Z}`,
    `segment [${X}${Y}]`,
    `triangle ${X}${Y}${Z}${W}`,
    `triangle ${X}${W}${Z}`,
  ]).slice(0, 3);
  return {
    text: `${intro} ${question}`,
    format: "qcm",
    choices: shuffle([juste, ...pieges]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(
      `Un triangle se nomme avec ses TROIS sommets, dans n’importe quel ordre. Ici, les sommets sont ${X}, ${Y} et ${Z} : « ${juste} » convient. Deux lettres désignent un côté, et une lettre en trop désigne un autre point.`,
    ),
    canvas: dessinQuelconque(shuffle([X, Y, Z]) as [string, string, string]),
  };
}
function genNommerLireNom(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = shuffle([X, Y, Z]).join("");
  const o = objet();
  const P = prenom();
  const W = autreLettre([X, Y, Z]);
  const intro = situation(N, o, P);
  const mode = pick(["sommets", "meme", "sommet?", "lettres"] as const);
  const canvas = dessinQuelconque(shuffle([X, Y, Z]) as [string, string, string]);
  if (mode === "sommets") {
    const juste = `${X}, ${Y} et ${Z}`;
    return {
      text: `${intro} ${pick(["Quels sont ses sommets ?", "Quels sont les sommets de ce triangle ?", "Cite les sommets de ce triangle."])}`,
      format: "qcm",
      choices: shuffle([juste, `${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}`, `${X} et ${Y}`, `${X}, ${Y}, ${Z} et ${W}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Le nom « triangle ${N} » donne les trois sommets : ${X}, ${Y} et ${Z}. Les crochets, comme ${seg(X, Y)}, désignent des côtés.`),
      canvas,
    };
  }
  if (mode === "meme") {
    let autre = shuffle([X, Y, Z]).join("");
    while (autre === N) autre = shuffle([X, Y, Z]).join("");
    const juste = `triangle ${autre}`;
    return {
      text: `${intro} ${pick([
        `Laquelle de ces écritures désigne le même triangle ?`,
        `${P.nom} veut l’écrire autrement. Quelle écriture convient ?`,
        `Quel autre nom peut-on lui donner ?`,
      ])}`,
      format: "qcm",
      choices: shuffle([juste, `triangle ${X}${Y}${W}`, `triangle ${Z}${X}`, `segment ${seg(Y, Z)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`On peut citer les trois sommets dans n’importe quel ordre : « triangle ${autre} » et « triangle ${N} » désignent le même triangle, car ils ont les mêmes sommets ${X}, ${Y} et ${Z}.`),
      canvas,
    };
  }
  if (mode === "sommet?") {
    const T = pick([X, Y, Z, W, W]);
    const oui = T !== W;
    return {
      text: `${intro} Le point ${T} est-il un sommet de ce triangle ?`,
      format: "qcm",
      choices: shuffle(["oui", "non"]),
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(
        oui
          ? `Les sommets du triangle ${N} sont les trois lettres de son nom : ${X}, ${Y} et ${Z}. ${T} en fait partie.`
          : `Les sommets du triangle ${N} sont les trois lettres de son nom : ${X}, ${Y} et ${Z}. ${T} n’en fait pas partie.`,
      ),
      canvas,
    };
  }
  return {
    text: `${intro} ${pick(["Combien de lettres faut-il pour nommer un triangle ?", "Pour nommer ce triangle, combien de lettres utilise-t-on ?"])}`,
    format: "qcm",
    choices: shuffle(["2", "3", "4", "6"]),
    expected: ["3"],
    comparator: "mcq_exact",
    explanation: expl(`Un triangle a 3 sommets. On le nomme avec ces 3 lettres, comme « triangle ${N} ».`),
    canvas,
  };
}

// ----- TRIANGLE_SOMMET_COTE
/** Le triangle d'une situation : nom, sommets, lettre étrangère, intro, figure. */
function triangleEnSituation() {
  const [X, Y, Z] = sommetsTriangle();
  const N = shuffle([X, Y, Z]).join("");
  const o = objet();
  const P = prenom();
  return { X, Y, Z, N, o, P, W: autreLettre([X, Y, Z]), intro: situation(N, o, P), canvas: dessinQuelconque(shuffle([X, Y, Z]) as [string, string, string]) };
}
function genSommetCoteCompter(): Q {
  const { X, Y, Z, N, W, intro, canvas } = triangleEnSituation();
  const mode = pick(["compter", "compter", "cotes", "estCote"] as const);
  if (mode === "compter") {
    const quoi = pick(["sommets", "côtés", "angles"]);
    return {
      text: `${intro} ${pick([`Combien de ${quoi} a ce triangle ?`, `Combien de ${quoi} compte le triangle ${N} ?`, `Le triangle ${N} a combien de ${quoi} ?`])}`,
      format: "qcm",
      choices: shuffle(["2", "3", "4", "6"]),
      expected: ["3"],
      comparator: "mcq_exact",
      explanation: expl(`Tout triangle a 3 sommets (${X}, ${Y} et ${Z}), 3 côtés (${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}) et 3 angles, un à chaque sommet.`),
      canvas,
    };
  }
  if (mode === "cotes") {
    const juste = `${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}`;
    return {
      text: `${intro} ${pick(["Quels sont les côtés de ce triangle ?", `Quels sont les côtés du triangle ${N} ?`, "Cite les trois côtés de ce triangle."])}`,
      format: "qcm",
      choices: shuffle([juste, `${X}, ${Y} et ${Z}`, `${seg(X, Y)} et ${seg(Y, Z)}`, `${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, W)}`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Un côté relie deux sommets. Avec les sommets ${X}, ${Y} et ${Z}, les trois côtés sont ${juste}. Les lettres seules désignent les sommets.`),
      canvas,
    };
  }
  const [U, V] = pick([[X, Y], [Y, Z], [X, Z], [X, W], [W, Z]]);
  const oui = U !== W && V !== W;
  return {
    text: `${intro} Le segment ${seg(U, V)} est-il un côté de ce triangle ?`,
    format: "qcm",
    choices: shuffle(["oui", "non"]),
    expected: [oui ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      oui
        ? `${U} et ${V} sont deux sommets du triangle ${N} : le segment ${seg(U, V)} est un de ses côtés.`
        : `${W} n’est pas un sommet du triangle ${N} : ${seg(U, V)} n’est donc pas un de ses côtés.`,
    ),
    canvas,
  };
}
function genSommetCoteRelier(): Q {
  const { X, Y, Z, N, W, intro, canvas } = triangleEnSituation();
  const [S, U, V] = shuffle([X, Y, Z]);
  const mode = pick(["relie", "extremites", "pasCote"] as const);
  if (mode === "relie") {
    return {
      text: `${intro} ${pick([`Quel côté relie les sommets ${U} et ${V} ?`, `Quel côté va de ${U} à ${V} ?`, `Comment s’appelle le côté qui joint ${U} et ${V} ?`])}`,
      format: "qcm",
      choices: shuffle([seg(U, V), seg(S, U), seg(S, V), seg(U, W)]),
      expected: [seg(U, V)],
      comparator: "mcq_exact",
      explanation: expl(`Le côté qui relie ${U} et ${V} porte ces deux lettres : ${seg(U, V)}.`),
      canvas,
    };
  }
  if (mode === "extremites") {
    const juste = `${[U, V].sort().join(" et ")}`;
    return {
      text: `${intro} ${pick([`Quelles sont les extrémités du côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} relie quels sommets ?`])}`,
      format: "qcm",
      choices: shuffle([juste, `${[S, U].sort().join(" et ")}`, `${[S, V].sort().join(" et ")}`, `${S} seulement`]),
      expected: [juste],
      comparator: "mcq_exact",
      explanation: expl(`Les deux lettres de ${seg(U, V)} sont ses extrémités : ${juste}.`),
      canvas,
    };
  }
  const intrus = seg(pick([X, Y, Z]), W);
  return {
    text: `${intro} ${pick(["Lequel de ces segments n’est PAS un côté de ce triangle ?", `Quel segment n’est PAS un côté du triangle ${N} ?`])}`,
    format: "qcm",
    choices: shuffle([intrus, seg(X, Y), seg(Y, Z), seg(X, Z)]),
    expected: [intrus],
    comparator: "mcq_exact",
    explanation: expl(`Les côtés du triangle ${N} sont ${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}. ${intrus} n’en fait pas partie : ${W} n’est pas un sommet.`),
    canvas,
  };
}
function genSommetCoteOppose(): Q {
  const { X, Y, Z, N, intro, canvas } = triangleEnSituation();
  const [S, U, V] = shuffle([X, Y, Z]);
  if (Math.random() < 0.5) {
    return {
      text: `${intro} ${pick([`Quel est le côté opposé au sommet ${S} ?`, `Quel côté se trouve en face du sommet ${S} ?`, `Dans ce triangle, quel côté est opposé à ${S} ?`])}`,
      format: "qcm",
      choices: shuffle([seg(U, V), seg(S, U), seg(S, V)]),
      expected: [seg(U, V)],
      comparator: "mcq_exact",
      explanation: expl(`Les côtés ${seg(S, U)} et ${seg(S, V)} partent de ${S}. Le seul côté qui ne touche pas ${S} est ${seg(U, V)} : c’est le côté opposé à ${S}.`),
      canvas,
    };
  }
  return {
    text: `${intro} ${pick([`Quel sommet est opposé au côté ${seg(U, V)} ?`, `Quel sommet se trouve en face du côté ${seg(U, V)} ?`, `Dans le triangle ${N}, quel sommet fait face au côté ${seg(U, V)} ?`])}`,
    format: "qcm",
    choices: shuffle([S, U, V]),
    expected: [S],
    comparator: "mcq_exact",
    explanation: expl(`${U} et ${V} sont les extrémités du côté ${seg(U, V)}. Le sommet qui lui fait face est le troisième : ${S}.`),
    canvas,
  };
}

// ----- TRIANGLE_TYPE_COTE
const NATURES_COTES = ["équilatéral", "isocèle", "quelconque"] as const;
type NatureCotes = (typeof NATURES_COTES)[number];
const QUESTION_NATURE = [
  "Quelle est sa nature la plus précise ?",
  "Quel mot décrit le mieux ce triangle ?",
  "Choisis le nom le plus précis pour ce triangle.",
  "Ce triangle est-il équilatéral, isocèle ou quelconque ?",
];
function pourquoiNature(n: NatureCotes) {
  return n === "équilatéral"
    ? "Les trois côtés ont la même longueur : le triangle est équilatéral (il est aussi isocèle, mais « équilatéral » est plus précis)."
    : n === "isocèle"
      ? "Deux côtés, et deux seulement, ont la même longueur : le triangle est isocèle."
      : "Les trois côtés ont des longueurs différentes : le triangle est quelconque.";
}
/**
 * Un triangle de la nature voulue, avec ses longueurs, ses noms, et sa figure
 * à l'échelle : noms[0] et noms[1] sont les sommets A et B du dessin.
 */
function triangleDeNature(n: NatureCotes) {
  const o = objet();
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as [string, string, string];
  const [lAB, lBC, lCA] = shuffle(longueurs(o, n));
  return { o, X, Y, Z, noms, lAB, lBC, lCA, pts: pointsParCotes(lAB, lBC, lCA) };
}
function genTypeCoteLongueurs(): Q {
  const n = pick(NATURES_COTES);
  const { o, X, Y, Z, noms, lAB, lBC, lCA, pts } = triangleDeNature(n);
  const P = prenom();
  const N = `${X}${Y}${Z}`;
  const u = o.u;
  const [A, B, C] = noms;
  const donnees = pick([
    `Ses côtés mesurent ${fr(lAB)} ${u}, ${fr(lBC)} ${u} et ${fr(lCA)} ${u}.`,
    `On mesure ${lg(A, B)} = ${fr(lAB)} ${u}, ${lg(B, C)} = ${fr(lBC)} ${u} et ${lg(C, A)} = ${fr(lCA)} ${u}.`,
    `${P.nom} mesure ses côtés : ${fr(lAB)} ${u}, ${fr(lBC)} ${u} et ${fr(lCA)} ${u}.`,
  ]);
  return {
    text: `${situation(N, o, P)} ${donnees} ${pick(QUESTION_NATURE)}`,
    format: "qcm",
    choices: shuffle([...NATURES_COTES]),
    expected: [n],
    comparator: "mcq_exact",
    explanation: expl(`On compare les trois longueurs : ${fr(lAB)} ${u}, ${fr(lBC)} ${u} et ${fr(lCA)} ${u}. ${pourquoiNature(n)}`),
    canvas: figure(pts, noms, { sideLabels: { AB: `${fr(lAB)} ${u}`, BC: `${fr(lBC)} ${u}`, CA: `${fr(lCA)} ${u}` } }),
  };
}
function genTypeCoteCodages(): Q {
  const n = pick(NATURES_COTES);
  const { o, X, Y, Z, noms, lAB, lBC, lCA, pts } = triangleDeNature(n);
  const P = prenom();
  const N = `${X}${Y}${Z}`;
  const [A, B, C] = noms;
  type Cote = "AB" | "BC" | "CA";
  const l: Record<Cote, number> = { AB: lAB, BC: lBC, CA: lCA };
  const cotes: Cote[] = ["AB", "BC", "CA"];
  const egaux: Array<[Cote, Cote]> = [];
  for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) if (l[cotes[i]] === l[cotes[j]]) egaux.push([cotes[i], cotes[j]]);
  const nomCote: Record<Cote, string> = { AB: lg(A, B), BC: lg(B, C), CA: lg(C, A) };
  if (Math.random() < 0.5) {
    return {
      text: `${situation(N, o, P)} ${pick(["Observe les codages de la figure.", "Regarde les petits traits sur les côtés.", `${P.nom} a codé les côtés de même longueur.`])} ${pick(QUESTION_NATURE)}`,
      format: "qcm",
      choices: shuffle([...NATURES_COTES]),
      expected: [n],
      comparator: "mcq_exact",
      explanation: expl(`Des côtés qui portent le même codage ont la même longueur. ${pourquoiNature(n)}`),
      canvas: figure(pts, noms, { marks: { equalSides: n === "équilatéral" ? [["AB", "BC"], ["BC", "CA"]] : egaux } }),
    };
  }
  // Les égalités écrites en toutes lettres, sans nombre.
  const phrase =
    n === "équilatéral"
      ? `On sait que ${nomCote.AB} = ${nomCote.BC} = ${nomCote.CA}.`
      : n === "isocèle"
        ? (() => {
            const [c1, c2] = egaux[0];
            const c3 = cotes.find((c) => c !== c1 && c !== c2)!;
            return `On sait que ${nomCote[c1]} = ${nomCote[c2]}, et que ${nomCote[c3]} est ${l[c3] > l[c1] ? "plus long" : "plus court"}.`;
          })()
        : `On sait que ${nomCote.AB}, ${nomCote.BC} et ${nomCote.CA} ont trois longueurs différentes.`;
  return {
    text: `${situation(N, o, P)} ${phrase} ${pick(QUESTION_NATURE)}`,
    format: "qcm",
    choices: shuffle([...NATURES_COTES]),
    expected: [n],
    comparator: "mcq_exact",
    explanation: expl(pourquoiNature(n)),
    canvas: figure(pts, noms),
  };
}
/** Un triangle isocèle en S : les deux côtés égaux partent de S. Longueurs dans l'unité de l'objet. */
function isoceleEn() {
  const o = objet();
  const [X, Y, Z] = sommetsTriangle();
  const [S, U, V] = shuffle([X, Y, Z]);
  const [a, b] = longueurs(o, "isocèle"); // deux côtés de a, une base de b
  return { o, X, Y, Z, S, U, V, a, b, u: o.u, P: prenom(), N: `${X}${Y}${Z}` };
}
/** La figure d'un isocèle en S : S en haut (sommet C du dessin). */
function figureIsocele(S: string, U: string, V: string, a: number, b: number, plus: Partial<TriangleCanvasData> = {}) {
  return figure(pointsParCotes(b, a, a), [U, V, S], { marks: { equalSides: [["BC", "CA"]] }, ...plus });
}
function genTypeCoteIsoceleEn(): Q {
  const { o, X, Y, Z, S, U, V, a, b, u, P, N } = isoceleEn();
  const mesures = shuffle([`${lg(S, U)} = ${fr(a)} ${u}`, `${lg(S, V)} = ${fr(a)} ${u}`, `${lg(U, V)} = ${fr(b)} ${u}`]);
  return {
    text: `${situation(N, o, P)} On a ${mesures[0]}, ${mesures[1]} et ${mesures[2]}. ${pick([
      "Ce triangle est isocèle : en quel sommet ?",
      "Quel est le sommet principal de ce triangle isocèle ?",
      `Le triangle ${N} est isocèle. Quel est son sommet principal ?`,
    ])}`,
    format: "qcm",
    choices: shuffle([X, Y, Z]),
    expected: [S],
    comparator: "mcq_exact",
    explanation: expl(
      `Les deux côtés égaux sont ${seg(S, U)} et ${seg(S, V)} (${fr(a)} ${u} chacun). Ils ont le sommet ${S} en commun : le triangle est isocèle en ${S}, et ${seg(U, V)} est sa base.`,
    ),
    canvas: figure(pointsParCotes(b, a, a), [U, V, S]),
  };
}
function genTypeCoteEquilateralPerimetre(): Q {
  const o = objet();
  const [X, Y, Z] = sommetsTriangle();
  const P = prenom();
  const N = `${X}${Y}${Z}`;
  const [c] = longueurs(o, "équilatéral");
  const per = 3 * c;
  const [p, q] = shuffle([X, Y, Z]);
  const u = o.u;
  return {
    text: `${situation(N, o, P)} Ce triangle est équilatéral et son périmètre mesure ${fr(per)} ${u}. ${pick([
      `Combien mesure le côté ${seg(p, q)} ?`,
      `Quelle est la longueur de ${seg(p, q)} ?`,
      `Calcule la longueur d’un côté.`,
    ])}`,
    format: "short",
    expected: [`${fr(c)} ${u}`],
    comparator: "number_equal",
    explanation: expl(`Équilatéral : ses trois côtés sont égaux. Le périmètre est la somme des trois : chaque côté mesure ${fr(per)} ÷ 3 = ${fr(c)} ${u}.`),
    canvas: figure(pointsParCotes(1, 1, 1), shuffle([X, Y, Z]) as [string, string, string], { marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] } }),
  };
}
function genTypeCoteIsocelePerimetre(): Q {
  const { o, S, U, V, a, b, u, P, N } = isoceleEn();
  const per = 2 * a + b;
  return {
    text: `${situation(N, o, P)} Ce triangle est isocèle en ${S}, avec ${lg(S, U)} = ${fr(a)} ${u} et ${lg(U, V)} = ${fr(b)} ${u}. ${pick([
      "Quel est son périmètre ?",
      "Calcule son périmètre.",
      `Combien mesure le tour du triangle ${N} ?`,
    ])}`,
    format: "short",
    expected: [`${fr(per)} ${u}`],
    comparator: "number_equal",
    explanation: expl(
      `Isocèle en ${S} : les côtés ${seg(S, U)} et ${seg(S, V)} sont égaux, donc ${lg(S, V)} = ${fr(a)} ${u} aussi. Périmètre : ${fr(a)} + ${fr(a)} + ${fr(b)} = ${fr(per)} ${u}.`,
    ),
    canvas: figureIsocele(S, U, V, a, b),
  };
}

// ----- TRIANGLE_TYPE_ANGLE
const NAT_ANGLES = {
  rectangle: "rectangle (un angle droit)",
  obtus: "obtusangle (un angle obtus)",
  aigu: "acutangle (trois angles aigus)",
} as const;
type NatAngle = keyof typeof NAT_ANGLES;
/** Trois angles entiers de somme 180°, le plus grand en dernier. */
function anglesDeNature(n: NatAngle): [number, number, number] {
  for (;;) {
    const g = n === "rectangle" ? 90 : n === "obtus" ? randomInt(95, 150) : randomInt(62, 85);
    const a = randomInt(Math.max(15, 180 - g - g), Math.min(g - 1, 180 - g - 15));
    const b = 180 - g - a;
    if (b < 15 || b > g || a === b) continue;
    return [a, b, g];
  }
}
function pourquoiAngles(n: NatAngle, g: number) {
  return n === "rectangle"
    ? `Un angle mesure 90° : c’est un angle droit, le triangle est rectangle.`
    : n === "obtus"
      ? `Le plus grand angle mesure ${g}°, plus que 90° : c’est un angle obtus, le triangle est obtusangle.`
      : `Le plus grand angle mesure ${g}°, moins que 90° : les trois angles sont aigus, le triangle est acutangle.`;
}
const QUESTION_ANGLES = [
  "Que peut-on dire de ce triangle ?",
  "Quel est le type de ce triangle selon ses angles ?",
  "Choisis la bonne description de ce triangle.",
];
/** Un triangle d'angles donnés : le plus grand au sommet du haut (C du dessin). */
function triangleAngles(n: NatAngle) {
  const [a, b, g] = anglesDeNature(n);
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as [string, string, string];
  const [angA, angB] = shuffle([a, b]);
  return { a, b, g, X, Y, Z, N: `${X}${Y}${Z}`, noms, angA, angB, pts: pointsParAngles(angA, angB), o: objet(), P: prenom() };
}
function genTypeAngleMesures(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { g, N, noms, angA, angB, pts, o, P } = triangleAngles(n);
  const [A, B, C] = noms;
  const donnees = pick([
    `Ses angles mesurent ${angA}°, ${angB}° et ${g}°.`,
    `${P.nom} mesure ses angles au rapporteur : ${g}°, ${angA}° et ${angB}°.`,
    `L’angle en ${A} mesure ${angA}°, l’angle en ${B} mesure ${angB}° et l’angle en ${C} mesure ${g}°.`,
  ]);
  return {
    text: `${situation(N, o, P)} ${donnees} ${pick(QUESTION_ANGLES)}`,
    format: "qcm",
    choices: shuffle(Object.values(NAT_ANGLES)),
    expected: [NAT_ANGLES[n]],
    comparator: "mcq_exact",
    explanation: expl(`On regarde le plus grand angle. ${pourquoiAngles(n, g)}`),
    canvas: figure(pts, noms, { angleLabels: { A: `${angA}°`, B: `${angB}°`, C: `${g}°` } }),
  };
}
function genTypeAngleFigure(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { g, N, noms, angA, angB, pts, o, P } = triangleAngles(n);
  const marque = n === "rectangle" && Math.random() < 0.6;
  return {
    text: `${situation(N, o, P)} ${pick(["Observe la figure.", "Regarde bien la figure.", `${P.nom} a complété la figure.`])} ${pick(QUESTION_ANGLES)}`,
    format: "qcm",
    choices: shuffle(Object.values(NAT_ANGLES)),
    expected: [NAT_ANGLES[n]],
    comparator: "mcq_exact",
    explanation: expl(marque ? "Le petit carré marque un angle droit : le triangle est rectangle." : `On lit les angles sur la figure. ${pourquoiAngles(n, g)}`),
    canvas: marque
      ? figure(pts, noms, { marks: { rightAngleAt: "C" } })
      : figure(pts, noms, { angleLabels: { A: `${angA}°`, B: `${angB}°`, C: `${g}°` } }),
  };
}
function genTypeAngleDeux(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { a, b, g, N, o, P } = triangleAngles(n);
  // On donne deux angles ; le troisième est à retrouver (180° en tout).
  const [d1, d2, cache] = shuffle([a, b, g]);
  return {
    text: `${situation(N, o, P)} ${pick([
      `Deux de ses angles mesurent ${d1}° et ${d2}°.`,
      `${P.nom} a mesuré deux de ses angles : ${d1}° et ${d2}°.`,
      `On connaît deux angles : ${d1}° et ${d2}°.`,
    ])} ${pick(QUESTION_ANGLES)}`,
    format: "qcm",
    choices: shuffle(Object.values(NAT_ANGLES)),
    expected: [NAT_ANGLES[n]],
    comparator: "mcq_exact",
    explanation: expl(`Le troisième angle mesure 180 − ${d1} − ${d2} = ${cache}°. ${pourquoiAngles(n, g)}`),
  };
}

// ----- TRIANGLE_DEFI
const NATURES_DEFI = ["équilatéral", "isocèle", "rectangle", "rectangle isocèle", "quelconque"] as const;
/** Choisit 4 propositions dont la bonne. */
function quatreDont(juste: string, toutes: readonly string[]) {
  return shuffle([juste, ...shuffle(toutes.filter((x) => x !== juste)).slice(0, 3)]);
}
const TRIPLETS_DROITS: Array<[number, number, number]> = [[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 15, 17], [9, 12, 15], [12, 16, 20], [7, 24, 25], [20, 21, 29]];
function genDefiReconnaissance(): Q {
  const o = objet();
  const P = prenom();
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const u = o.u;
  const n = pick(NATURES_DEFI);
  let donnees: string;
  let pourquoi: string;
  if (n === "équilatéral") {
    const [a] = longueurs(o, "équilatéral");
    donnees = `Ses côtés mesurent ${fr(a)} ${u}, ${fr(a)} ${u} et ${fr(a)} ${u}.`;
    pourquoi = "Ses trois côtés sont égaux : il est équilatéral. Ses trois angles mesurent alors 60°, il ne peut pas être rectangle.";
  } else if (n === "rectangle isocèle") {
    const [a] = longueurs(o, "équilatéral");
    donnees = `Deux de ses côtés mesurent chacun ${fr(a)} ${u}, et l’angle entre eux est droit.`;
    pourquoi = "Il a deux côtés égaux (isocèle) ET un angle droit (rectangle) : c’est un triangle rectangle isocèle.";
  } else if (n === "rectangle") {
    const k = o.u === "m" && o.max <= 10 ? 0.5 : o.u === "cm" && o.max <= 15 ? 0.5 : pick([1, 2, 3]);
    const [a, b, c] = pick(TRIPLETS_DROITS.filter((tr) => tr[2] * k <= o.max * 1.5)).map((x) => x * k);
    donnees = `Ses côtés mesurent ${fr(a)} ${u}, ${fr(b)} ${u} et ${fr(c)} ${u}, et il a un angle droit.`;
    pourquoi = "Il a un angle droit, et ses trois côtés sont différents : il est rectangle (mais pas isocèle).";
  } else if (n === "isocèle") {
    const [a, b] = longueurs(o, "isocèle");
    donnees = `Ses côtés mesurent ${fr(a)} ${u}, ${fr(b)} ${u} et ${fr(a)} ${u}. Il n’a pas d’angle droit.`;
    pourquoi = "Deux côtés seulement sont égaux, et il n’a pas d’angle droit : il est isocèle.";
  } else {
    const [a, b, c] = longueurs(o, "quelconque");
    donnees = `Ses côtés mesurent ${fr(a)} ${u}, ${fr(b)} ${u} et ${fr(c)} ${u}. Il n’a pas d’angle droit.`;
    pourquoi = "Ses trois côtés sont différents, et il n’a pas d’angle droit : il est quelconque.";
  }
  return {
    text: `${situation(N, o, P)} ${donnees} ${pick(["Quelle est sa nature la plus précise ?", "Choisis le nom le plus précis pour ce triangle.", "Quel mot décrit le mieux ce triangle ?"])}`,
    format: "qcm",
    choices: quatreDont(n, NATURES_DEFI),
    expected: [n],
    comparator: "mcq_exact",
    explanation: expl(pourquoi),
  };
}
/** Les idées à connaître, posées dans une situation : la bonne raison parmi des raisons fausses. */
function genDefiRaisons(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const o = objet();
  const P = prenom();
  const intro = situation(N, o, P);
  const il = P.f ? "elle" : "il";
  const cas = pick([
    {
      q: `${P.nom} dit : « Il a l’air rectangle, donc il est rectangle. » A-t-${il} raison ?`,
      juste: "non : il faut un codage d’angle droit ou une mesure de 90°",
      faux: ["oui : on voit bien l’angle droit", "oui, si le triangle est assez grand", "non : un triangle n’est jamais rectangle"],
      r: "Un dessin peut tromper. Seul le petit carré (le codage) ou une mesure de 90° au rapporteur permet de dire qu’un angle est droit.",
    },
    {
      q: `Le triangle ${N} est équilatéral. Est-il aussi isocèle ?`,
      juste: "oui : il a au moins deux côtés égaux",
      faux: ["non : il a trois côtés égaux, pas deux", "oui, mais seulement s’il est rectangle", "non : un isocèle n’a jamais trois côtés égaux"],
      r: "Un triangle isocèle a AU MOINS deux côtés égaux. L’équilatéral en a trois : il est donc aussi isocèle. L’inverse est faux.",
    },
    {
      q: `Le triangle ${N} peut-il être à la fois rectangle et isocèle ?`,
      juste: "oui : deux côtés égaux qui forment un angle droit",
      faux: ["non : c’est impossible", "oui, mais seulement s’il est équilatéral", "non : un triangle rectangle a trois côtés différents"],
      r: "Il suffit de tracer deux côtés de même longueur à angle droit : on obtient un triangle rectangle isocèle, comme la moitié d’un carré coupé par sa diagonale.",
    },
    {
      q: `Le triangle ${N} est équilatéral. Peut-il être rectangle ?`,
      juste: "non : ses trois angles mesurent 60°",
      faux: ["oui : si un angle mesure 90°", "oui, s’il est grand", "non : il n’a aucun angle"],
      r: "Dans un triangle équilatéral, les trois angles sont égaux. Leur somme vaut 180°, donc chacun mesure 180 ÷ 3 = 60° : aucun ne peut être droit.",
    },
    {
      q: `Pour savoir si le triangle ${N} est isocèle sans mesurer ses angles, que regarde ${P.nom} ?`,
      juste: "si deux côtés ont la même longueur",
      faux: ["s’il a un angle droit", "si ses côtés sont tracés en couleur", "si sa base est horizontale"],
      r: "Un triangle isocèle a deux côtés de même longueur : on les mesure, ou on lit leur codage (les petits traits identiques).",
    },
  ]);
  return {
    text: `${intro} ${cas.q}`,
    format: "qcm",
    choices: shuffle([cas.juste, ...cas.faux]),
    expected: [cas.juste],
    comparator: "mcq_exact",
    explanation: expl(cas.r),
  };
}
function genDefiCodages(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const o = objet();
  const P = prenom();
  // Le sommet particulier (angle droit, sommet principal) est le sommet C du dessin, en haut.
  const [nA, nB, nC] = shuffle([X, Y, Z]);
  type Cote = "AB" | "BC" | "CA";
  const aigu = randomInt(28, 38);
  const cas = pick([
    { rep: "rectangle", pts: pointsParAngles(aigu, 90 - aigu), marks: { rightAngleAt: "C" as const } },
    { rep: "isocèle", pts: pointsParCotes(pick([3.5, 4, 6.5, 7.5]), 5, 5), marks: { equalSides: [["BC", "CA"]] as Array<[Cote, Cote]> } },
    { rep: "équilatéral", pts: pointsParCotes(1, 1, 1), marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] as Array<[Cote, Cote]> } },
    { rep: "rectangle isocèle", pts: pointsParAngles(45, 45), marks: { rightAngleAt: "C" as const, equalSides: [["BC", "CA"]] as Array<[Cote, Cote]> } },
  ]);
  // Rectangle « seul » : angles aigus de 28-38° et 52-62°, jamais un dessin presque isocèle.
  const pourquoi: Record<string, string> = {
    rectangle: `Un seul codage : l’angle droit en ${nC}. Aucun côté n’est codé égal : le triangle est rectangle en ${nC}.`,
    isocèle: `Deux côtés portent le même codage, ${seg(nC, nA)} et ${seg(nC, nB)}, et il n’y a pas d’angle droit : le triangle est isocèle en ${nC}.`,
    équilatéral: "Les trois côtés portent le même codage : le triangle est équilatéral (il est aussi isocèle, mais « équilatéral » est plus précis).",
    "rectangle isocèle": `Il y a un angle droit en ${nC} ET deux côtés égaux, ${seg(nC, nA)} et ${seg(nC, nB)} : le triangle est rectangle isocèle en ${nC}. Dire seulement « rectangle » ou « isocèle » oublie un des deux codages.`,
  };
  return {
    text: `${situation(N, o, P)} ${pick(["Observe tous les codages.", "Lis bien les codages de la figure.", `${P.nom} a codé la figure.`])} ${pick(["Quelle est sa nature la plus précise ?", "Quel mot décrit le mieux ce triangle ?", "Choisis le nom le plus précis."])}`,
    format: "qcm",
    choices: shuffle(["rectangle", "isocèle", "équilatéral", "rectangle isocèle"]),
    expected: [cas.rep],
    comparator: "mcq_exact",
    explanation: expl(pourquoi[cas.rep]),
    canvas: figure(cas.pts, [nA, nB, nC], { marks: cas.marks }),
  };
}
function genDefiIsoceleCoteManquant(): Q {
  const { o, S, U, V, a, b, u, P, N } = isoceleEn();
  const per = 2 * a + b;
  if (Math.random() < 0.5) {
    const demande = pick([U, V]);
    return {
      text: `${situation(N, o, P)} Ce triangle est isocèle en ${S}. Son périmètre mesure ${fr(per)} ${u} et ${lg(U, V)} = ${fr(b)} ${u}. ${pick([`Combien mesure ${lg(S, demande)} ?`, `Calcule la longueur ${lg(S, demande)}.`, `Quelle est la longueur du côté ${seg(S, demande)} ?`])}`,
      format: "short",
      expected: [`${fr(a)} ${u}`],
      comparator: "number_equal",
      explanation: expl(
        `Isocèle en ${S} : ${lg(S, U)} = ${lg(S, V)}. Sans la base ${seg(U, V)}, il reste ${fr(per)} − ${fr(b)} = ${fr(2 * a)} ${u} pour ces deux côtés égaux, donc chacun mesure ${fr(2 * a)} ÷ 2 = ${fr(a)} ${u}.`,
      ),
      canvas: figureIsocele(S, U, V, a, b),
    };
  }
  const connu = pick([U, V]);
  return {
    text: `${situation(N, o, P)} Ce triangle est isocèle en ${S}. Son périmètre mesure ${fr(per)} ${u} et ${lg(S, connu)} = ${fr(a)} ${u}. ${pick([`Combien mesure la base ${seg(U, V)} ?`, `Calcule la longueur ${lg(U, V)}.`, `Quelle est la longueur de ${seg(U, V)} ?`])}`,
    format: "short",
    expected: [`${fr(b)} ${u}`],
    comparator: "number_equal",
    explanation: expl(
      `Isocèle en ${S} : ${lg(S, U)} = ${lg(S, V)} = ${fr(a)} ${u}. La base mesure ${fr(per)} − ${fr(a)} − ${fr(a)} = ${fr(b)} ${u}.`,
    ),
    canvas: figureIsocele(S, U, V, a, b),
  };
}

// ----- TRIANGLE_SOMME_ANGLE
function genSommeConnaitre(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { a, b, g, X, Y, Z, N, noms, angA, angB, pts, o, P } = triangleAngles(n);
  const mode = pick(["valeur", "addition", "decoupage"] as const);
  if (mode === "valeur") {
    return {
      text: `${situation(N, o, P)} ${pick([
        `Que vaut la somme des angles de ce triangle ?`,
        `Si on additionne les angles en ${X}, en ${Y} et en ${Z}, que trouve-t-on ?`,
        `Combien font ses trois angles réunis ?`,
      ])}`,
      format: "qcm",
      choices: shuffle(["90°", "180°", "270°", "360°"]),
      expected: ["180°"],
      comparator: "mcq_exact",
      explanation: expl("Dans TOUS les triangles, quelle que soit leur forme, la somme des trois angles vaut 180°."),
      canvas: figure(pts, noms),
    };
  }
  if (mode === "addition") {
    return {
      text: `${situation(N, o, P)} Ses angles mesurent ${a}°, ${b}° et ${g}°. ${pick(["Calcule la somme de ses trois angles.", "Combien font ces trois angles en tout ?", `${P.nom} additionne les trois angles. Que trouve-t-${P.f ? "elle" : "il"} ?`])}`,
      format: "short",
      expected: ["180°"],
      comparator: "number_equal",
      explanation: expl(`${a} + ${b} + ${g} = 180. On retrouve 180°, comme dans tous les triangles.`),
      canvas: figure(pts, noms, { angleLabels: { A: `${angA}°`, B: `${angB}°`, C: `${g}°` } }),
    };
  }
  const juste = "un angle plat (180°)";
  return {
    text: `${P.nom} découpe ${o.nom} en papier. ${P.f ? "Elle" : "Il"} déchire les trois coins et les colle côte à côte, les pointes réunies. ${pick(["Quel angle obtient-on ?", `Quel angle forment les trois coins ?`])}`,
    format: "qcm",
    choices: shuffle([juste, "un angle droit (90°)", "un tour complet (360°)", "un angle de 270°"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl("Les trois coins sont les trois angles du triangle. Mis côte à côte, ils forment un angle plat : leur somme vaut 180°."),
  };
}
function genSommeDeuxAutres(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { angA, angB, g, N, noms, pts, o, P } = triangleAngles(n);
  // L'angle connu est celui du sommet S, sur la figure comme dans le texte.
  const k = randomInt(0, 2);
  const S = noms[k];
  const connu = [angA, angB, g][k];
  const reste = 180 - connu;
  return {
    text: `${situation(N, o, P)} L’angle en ${S} mesure ${connu}°. ${pick([
      "Quelle est la somme des deux autres angles ?",
      "Combien mesurent les deux autres angles réunis ?",
      "Calcule la somme des deux angles restants.",
    ])}`,
    format: "short",
    expected: [`${reste}°`],
    comparator: "number_equal",
    explanation: expl(`Les trois angles font 180° en tout. Les deux autres font donc 180 − ${connu} = ${reste}°.`),
    canvas: figure(pts, noms, { angleLabels: { [["A", "B", "C"][k]]: `${connu}°` } as TriangleCanvasData["angleLabels"] }),
  };
}

// ----- TRIANGLE_ANGLE_MANQUANT
/** Deux angles connus, le troisième à trouver ; noms et figure fidèles. */
function angleManquant() {
  const n = pick(["rectangle", "obtus", "aigu", "aigu"] as const);
  const t = triangleAngles(n);
  const vals: Record<string, number> = { [t.noms[0]]: t.angA, [t.noms[1]]: t.angB, [t.noms[2]]: t.g };
  const cache = pick(t.noms);
  const [U, V] = t.noms.filter((x) => x !== cache);
  return { ...t, vals, cache, U, V, rep: vals[cache] };
}
function donneesDeuxAngles(U: string, V: string, a: number, b: number, P: Prenom) {
  return pick([
    `L’angle en ${U} mesure ${a}° et l’angle en ${V} mesure ${b}°.`,
    `${P.nom} a mesuré l’angle en ${U} : ${a}°, et l’angle en ${V} : ${b}°.`,
    `On sait que l’angle en ${U} mesure ${a}° et que l’angle en ${V} mesure ${b}°.`,
  ]);
}
function genAngleManquantQcm(): Q {
  const { N, o, P, vals, cache, U, V, rep } = angleManquant();
  const a = vals[U];
  const b = vals[V];
  const pieges = [180 - a, 180 - b, a + b, 90 - Math.min(a, b), rep + 10, rep - 10].filter((x) => x > 0 && x < 180 && x !== rep);
  return {
    text: `${situation(N, o, P)} ${donneesDeuxAngles(U, V, a, b, P)} ${pick([`Combien mesure l’angle en ${cache} ?`, `Quelle est la mesure de l’angle en ${cache} ?`, `Trouve l’angle en ${cache}.`])}`,
    format: "qcm",
    choices: shuffle([`${rep}°`, ...shuffle([...new Set(pieges)]).slice(0, 3).map((x) => `${x}°`)]),
    expected: [`${rep}°`],
    comparator: "mcq_exact",
    explanation: expl(`Les trois angles font 180° en tout. L’angle en ${cache} mesure 180 − ${a} − ${b} = ${rep}°.`),
  };
}
function genAngleManquantCourt(): Q {
  const { N, o, P, vals, cache, U, V, rep } = angleManquant();
  const a = vals[U];
  const b = vals[V];
  return {
    text: `${situation(N, o, P)} ${donneesDeuxAngles(U, V, a, b, P)} ${pick([`Calcule l’angle en ${cache}.`, `Combien mesure l’angle en ${cache} ?`, `Quel est le troisième angle ?`])}`,
    format: "short",
    expected: [`${rep}°`],
    comparator: "number_equal",
    explanation: expl(`La somme des angles d’un triangle vaut 180°. Donc l’angle en ${cache} vaut 180 − ${a} − ${b} = ${rep}°.`),
  };
}
function genAngleManquantFigure(): Q {
  const o = objet();
  const P = prenom();
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const mode = pick(["general", "isocele", "rectangle"] as const);
  if (mode === "general") {
    const { noms, angA, angB, g, pts, cache, rep } = angleManquant();
    // Les noms de l'énoncé remplacent ceux du tirage.
    const map: Record<string, string> = { [noms[0]]: X, [noms[1]]: Y, [noms[2]]: Z };
    const nn = noms.map((k) => map[k]) as [string, string, string];
    const lab = { A: `${angA}°`, B: `${angB}°`, C: `${g}°` };
    const k = (["A", "B", "C"] as const)[noms.indexOf(cache)];
    lab[k] = "?";
    return {
      text: `${situation(N, o, P)} Observe la figure. ${pick([`Calcule l’angle en ${map[cache]}.`, `Combien mesure l’angle en ${map[cache]} ?`, `Quelle est la mesure de l’angle marqué « ? » ?`])}`,
      format: "short",
      expected: [`${rep}°`],
      comparator: "number_equal",
      explanation: expl(`La somme des trois angles vaut 180°. L’angle en ${map[cache]} vaut 180 moins les deux angles connus : ${rep}°.`),
      canvas: figure(pts, nn, { angleLabels: lab }),
    };
  }
  if (mode === "isocele") {
    // Isocèle en C (sommet du haut) : angles à la base égaux.
    const base = randomInt(20, 80);
    const sommet = 180 - 2 * base;
    const [U, V, S] = shuffle([X, Y, Z]);
    const donneSommet = Math.random() < 0.5;
    const pts = pointsParAngles(base, base);
    return {
      text: `${situation(N, o, P)} Ce triangle est isocèle en ${S}. ${donneSommet ? `L’angle en ${S} mesure ${sommet}°.` : `L’angle en ${U} mesure ${base}°.`} ${donneSommet ? `Combien mesure l’angle en ${U} ?` : `Combien mesure l’angle en ${S} ?`}`,
      format: "short",
      expected: [`${donneSommet ? base : sommet}°`],
      comparator: "number_equal",
      explanation: expl(
        donneSommet
          ? `Isocèle en ${S} : les angles en ${U} et en ${V} sont égaux. Ils se partagent 180 − ${sommet} = ${2 * base}°, donc chacun mesure ${2 * base} ÷ 2 = ${base}°.`
          : `Isocèle en ${S} : l’angle en ${V} mesure aussi ${base}°. L’angle en ${S} vaut 180 − ${base} − ${base} = ${sommet}°.`,
      ),
      canvas: figure(pts, [U, V, S], {
        marks: { equalSides: [["BC", "CA"]] },
        angleLabels: donneSommet ? { C: `${sommet}°`, A: "?" } : { A: `${base}°`, C: "?" },
      }),
    };
  }
  const aigu = randomInt(20, 70);
  const autre = 90 - aigu;
  const [U, V, S] = shuffle([X, Y, Z]);
  return {
    text: `${situation(N, o, P)} Ce triangle est rectangle en ${S}, et l’angle en ${U} mesure ${aigu}°. ${pick([`Combien mesure l’angle en ${V} ?`, `Calcule l’angle en ${V}.`])}`,
    format: "short",
    expected: [`${autre}°`],
    comparator: "number_equal",
    explanation: expl(`L’angle droit en ${S} mesure 90°. L’angle en ${V} vaut 180 − 90 − ${aigu} = ${autre}°.`),
    canvas: figure(pointsParAngles(aigu, autre), [U, V, S], { marks: { rightAngleAt: "C" }, angleLabels: { A: `${aigu}°`, B: "?" } }),
  };
}

// ----- TRIANGLE_POSSIBLE_OU_NON (l'inégalité triangulaire)
type Materiau = { nom: string; u: "cm" | "m"; min: number; max: number; demi: boolean };
const MATERIAUX: Materiau[] = [
  { nom: "baguettes", u: "cm", min: 3, max: 30, demi: false },
  { nom: "pailles", u: "cm", min: 5, max: 24, demi: true },
  { nom: "planches", u: "m", min: 1, max: 4, demi: true },
  { nom: "tiges de bambou", u: "m", min: 1, max: 3, demi: true },
  { nom: "bâtons", u: "cm", min: 10, max: 80, demi: false },
  { nom: "morceaux de fil de fer", u: "cm", min: 4, max: 40, demi: false },
  { nom: "câbles", u: "m", min: 2, max: 12, demi: true },
  { nom: "lattes de bois", u: "cm", min: 20, max: 120, demi: false },
  { nom: "bandes de carton", u: "cm", min: 6, max: 35, demi: true },
  { nom: "tuyaux", u: "m", min: 1, max: 6, demi: true },
];
const longueurMat = (m: Materiau) => (m.demi && Math.random() < 0.4 ? randomInt(m.min * 2, m.max * 2) / 2 : randomInt(m.min, m.max));
/** Trois longueurs : `possible`, `impossible` (somme des deux petites < grande) ou `plat` (égale). */
function troisLongueurs(m: Materiau, cas: "possible" | "impossible" | "plat", marge: number): [number, number, number] {
  for (;;) {
    const a = longueurMat(m);
    const b = longueurMat(m);
    const c = cas === "plat" ? a + b : longueurMat(m);
    const [x, y, z] = [a, b, c].sort((u, v) => u - v);
    const ecart = (x + y - z) / z;
    if (cas === "possible" && ecart < marge) continue;
    if (cas === "impossible" && ecart > -marge) continue;
    if (cas === "plat" && z > m.max * 1.5) continue;
    return shuffle([a, b, c]) as [number, number, number];
  }
}
function questionPossible(m: Materiau, ls: [number, number, number]) {
  const P = prenom();
  const [a, b, c] = ls.map((x) => `${fr(x)} ${m.u}`);
  return pick([
    `${P.nom} a trois ${m.nom} de ${a}, ${b} et ${c}. Peut-on fabriquer un triangle avec ces trois ${m.nom} ?`,
    `Avec trois ${m.nom} de ${a}, ${b} et ${c}, ${P.nom} veut construire un triangle. Est-ce possible ?`,
    `Peut-on construire un triangle dont les côtés mesurent ${a}, ${b} et ${c} ?`,
    `${P.nom} veut tracer un triangle de côtés ${a}, ${b} et ${c}. Y arrivera-t-${P.f ? "elle" : "il"} ?`,
  ]);
}
function pourquoiPossible(ls: number[], u: string) {
  const [x, y, z] = [...ls].sort((p, q) => p - q);
  const s = Math.round((x + y) * 100) / 100;
  return x + y > z
    ? `On additionne les deux plus petits côtés : ${fr(x)} + ${fr(y)} = ${fr(s)} ${u}. C’est plus grand que le plus grand côté (${fr(z)} ${u}) : le triangle est possible.`
    : x + y === z
      ? `${fr(x)} + ${fr(y)} = ${fr(s)} ${u}, exactement le plus grand côté : les trois points seraient alignés, le triangle est « aplati ». Ce n’est pas un vrai triangle.`
      : `On additionne les deux plus petits côtés : ${fr(x)} + ${fr(y)} = ${fr(s)} ${u}. C’est plus petit que le plus grand côté (${fr(z)} ${u}) : les deux petits côtés ne se rejoignent pas, le triangle est impossible.`;
}
function genPossibleSimple(): Q {
  const m = pick(MATERIAUX);
  const cas = pick(["possible", "impossible"] as const);
  const ls = troisLongueurs(m, cas, 0.2);
  return {
    text: questionPossible(m, ls),
    format: "qcm",
    choices: shuffle(["oui", "non"]),
    expected: [cas === "possible" ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(pourquoiPossible(ls, m.u)),
  };
}
function genPossibleLimite(): Q {
  const m = pick(MATERIAUX);
  const cas = pick(["possible", "impossible", "plat"] as const);
  const ls = troisLongueurs(m, cas, 0.02);
  return {
    text: questionPossible(m, ls),
    format: "qcm",
    choices: shuffle(["oui", "non"]),
    expected: [cas === "possible" ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(pourquoiPossible(ls, m.u)),
  };
}
function genTroisiemeCote(): Q {
  const m = pick(MATERIAUX);
  const P = prenom();
  let a = longueurMat(m);
  let b = longueurMat(m);
  while (a === b || Math.abs(a - b) < 1) b = longueurMat(m);
  if (a < b) [a, b] = [b, a];
  const lo = Math.round((a - b) * 100) / 100;
  const hi = Math.round((a + b) * 100) / 100;
  const pas = m.demi ? 0.5 : 1;
  // Une seule longueur strictement entre a − b et a + b ; les autres hors de l'intervalle.
  const valides: number[] = [];
  for (let x = lo + pas; x < hi; x = Math.round((x + pas) * 100) / 100) valides.push(x);
  const juste = pick(valides);
  const fausses = shuffle([hi, hi + pas, hi + 2 * pas, Math.round(hi * 1.5), lo, lo > pas ? lo - pas : hi + 3 * pas]).filter((x) => x > 0);
  const choix = [juste, ...[...new Set(fausses)].slice(0, 3)];
  return {
    text: `${P.nom} a deux ${m.nom} de ${fr(a)} ${m.u} et ${fr(b)} ${m.u}. ${pick([
      `Quelle longueur peut avoir un troisième morceau pour fermer un triangle ?`,
      `Quel troisième côté permet de construire un triangle ?`,
      `Parmi ces longueurs, laquelle convient pour le troisième côté du triangle ?`,
    ])}`,
    format: "qcm",
    choices: shuffle(choix.map((x) => `${fr(x)} ${m.u}`)),
    expected: [`${fr(juste)} ${m.u}`],
    comparator: "mcq_exact",
    explanation: expl(
      `Le troisième côté doit être plus petit que ${fr(a)} + ${fr(b)} = ${fr(hi)} ${m.u}, et plus grand que ${fr(a)} − ${fr(b)} = ${fr(lo)} ${m.u} (sinon les deux autres ne se rejoignent pas). Seul ${fr(juste)} ${m.u} convient.`,
    ),
  };
}

// ----- TRIANGLE_PROPRIETE_DEFI
function genDefiAnglesPossibles(): Q {
  const P = prenom();
  const o = objet();
  const ok = Math.random() < 0.5;
  let [a, b, c] = anglesDeNature(pick(["rectangle", "obtus", "aigu"] as const));
  if (!ok) {
    const decale = pick([-20, -10, 10, 20, 30]);
    c = c + decale > 5 ? c + decale : c + 20;
  }
  [a, b, c] = shuffle([a, b, c]);
  const s = a + b + c;
  return {
    text: pick([
      `${P.nom} dit avoir dessiné ${o.nom} en forme de triangle, avec des angles de ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
      `Sur le cahier ${de(P.nom)}, un triangle a des angles de ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
      `${P.nom} mesure les angles d’un triangle : ${a}°, ${b}° et ${c}°. Ces mesures sont-elles possibles ?`,
      `${cap(o.nom)} a la forme d’un triangle. ${P.nom} annonce des angles de ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
    ]),
    format: "qcm",
    choices: shuffle(["oui", "non"]),
    expected: [s === 180 ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(`${a} + ${b} + ${c} = ${s}. ${s === 180 ? "On trouve 180° : c’est possible." : "Ce n’est pas 180° : ce triangle n’existe pas (ou les mesures sont fausses)."}`),
  };
}
function genDefiDeuxAngles(): Q {
  const P = prenom();
  const [a, b] = pick([
    [90, 90], [90, randomInt(91, 130)], [randomInt(91, 120), randomInt(91, 120)], [90, randomInt(20, 80)],
    [randomInt(100, 150), randomInt(10, 170 - 100)], [randomInt(60, 89), randomInt(60, 89)], [randomInt(95, 120), randomInt(61, 90)],
  ]);
  const ok = a + b < 180;
  const nomAngle = (x: number) => (x === 90 ? "un angle droit" : x > 90 ? `un angle obtus de ${x}°` : `un angle de ${x}°`);
  return {
    text: pick([
      `${P.nom} se demande si un triangle peut avoir ${nomAngle(a)} et ${nomAngle(b)}. Est-ce possible ?`,
      `${P.nom} veut dessiner un triangle avec ${nomAngle(a)} et ${nomAngle(b)}. Est-ce possible ?`,
      `${P.nom} affirme avoir tracé un triangle avec ${nomAngle(a)} et ${nomAngle(b)}. Est-ce possible ?`,
    ]),
    format: "qcm",
    choices: shuffle(["oui", "non"]),
    expected: [ok ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(
      ok
        ? `${a} + ${b} = ${a + b}, moins que 180 : il reste ${180 - a - b}° pour le troisième angle. C’est possible.`
        : `${a} + ${b} = ${a + b} : on atteint ou on dépasse déjà 180°, il ne reste rien pour le troisième angle. C’est impossible.`,
    ),
  };
}
function genDefiIsoceleAngles(): Q {
  const P = prenom();
  const o = objet();
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const [S, U] = shuffle([X, Y, Z]);
  const mode = pick(["sommet", "base", "equi", "rectIso"] as const);
  if (mode === "equi")
    return {
      text: `${situation(N, o, P)} Ce triangle est équilatéral. ${pick(["Combien mesure chacun de ses angles ?", `Combien mesure l’angle en ${S} ?`])}`,
      format: "short",
      expected: ["60°"],
      comparator: "number_equal",
      explanation: expl("Ses trois angles sont égaux et font 180° en tout : chacun mesure 180 ÷ 3 = 60°."),
    };
  if (mode === "rectIso")
    return {
      text: `${situation(N, o, P)} Ce triangle est rectangle et isocèle en ${S}. Combien mesure l’angle en ${U} ?`,
      format: "short",
      expected: ["45°"],
      comparator: "number_equal",
      explanation: expl(`L’angle droit en ${S} mesure 90°. Les deux autres angles sont égaux et se partagent 180 − 90 = 90°, donc chacun mesure 90 ÷ 2 = 45°.`),
    };
  if (mode === "sommet") {
    const sommet = randomInt(20, 150);
    const base = (180 - sommet) / 2;
    return {
      text: `${situation(N, o, P)} Ce triangle est isocèle en ${S}, et l’angle en ${S} mesure ${sommet}°. Combien mesure l’angle en ${U} ?`,
      format: "short",
      expected: [`${fr(base)}°`],
      comparator: "number_equal",
      explanation: expl(`Les deux angles à la base sont égaux. Ils se partagent 180 − ${sommet} = ${180 - sommet}°, donc chacun mesure ${180 - sommet} ÷ 2 = ${fr(base)}°.`),
    };
  }
  const base = randomInt(15, 85);
  return {
    text: `${situation(N, o, P)} Ce triangle est isocèle en ${S}, et l’angle en ${U} mesure ${base}°. Combien mesure l’angle en ${S} ?`,
    format: "short",
    expected: [`${180 - 2 * base}°`],
    comparator: "number_equal",
    explanation: expl(`Les deux angles à la base mesurent ${base}° chacun. L’angle en ${S} vaut 180 − ${base} − ${base} = ${180 - 2 * base}°.`),
  };
}
function genDefiIsoceleBase(): Q {
  const P = prenom();
  const ok = Math.random() < 0.55;
  // Jamais 60° : le triangle serait équilatéral, et deux propositions coïncideraient.
  const base = ok ? pick([randomInt(20, 59), randomInt(61, 89)]) : pick([90, randomInt(91, 120)]);
  const sommet = 180 - 2 * base;
  const juste = ok ? `oui : ses angles mesurent ${base}°, ${base}° et ${sommet}°` : `non : ${base} + ${base} = ${2 * base}, il ne reste rien`;
  const faux = ok
    ? [`non : ${base} + ${base} = ${2 * base}, il ne reste rien`, `oui : ses angles mesurent ${base}°, ${base}° et ${base}°`, `non : un angle à la base mesure toujours 60°`]
    : [`oui : ses angles mesurent ${base}°, ${base}° et ${Math.abs(sommet)}°`, `oui : ses angles mesurent ${base}°, ${base}° et ${base}°`, `non : un angle à la base mesure toujours 60°`];
  return {
    text: pick([
      `${P.nom} veut tracer un triangle isocèle dont les angles à la base mesurent ${base}°. Est-ce possible ?`,
      `${P.nom} se demande si un triangle isocèle peut avoir deux angles à la base de ${base}°. Qu’en penses-tu ?`,
      `Pour ${pick(OBJETS).nom}, ${P.nom} imagine un triangle isocèle avec deux angles à la base de ${base}°. Est-ce possible ?`,
    ]),
    format: "qcm",
    choices: shuffle([juste, ...faux]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(
      ok
        ? `Les deux angles à la base font ${2 * base}°. Il reste 180 − ${2 * base} = ${sommet}° pour le sommet principal : c’est possible.`
        : `Les deux angles à la base font déjà ${2 * base}°, soit 180° ou plus : il ne reste rien pour le troisième angle. C’est impossible.`,
    ),
  };
}
function genDefiIsocelePerimetreDeuxCotes(): Q {
  const P = prenom();
  const o = objet();
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  // Deux longueurs a < b avec b ≥ 2a : seul le triangle a, b, b existe (a, a, b est aplati ou impossible).
  let a: number;
  let b: number;
  do {
    a = o.u === "m" && o.max <= 10 ? randomInt(o.min * 2, o.max * 2) / 2 : randomInt(o.min, o.max);
    b = Math.round(a * pick([2, 2.5, 3]) * 2) / 2;
  } while (b > o.max * 3);
  const per = Math.round((a + 2 * b) * 100) / 100;
  const [l1, l2] = shuffle([a, b]);
  return {
    text: `${situation(N, o, P)} Ce triangle est isocèle. Deux de ses côtés mesurent ${fr(l1)} ${o.u} et ${fr(l2)} ${o.u}. ${pick(["Quel est son périmètre ?", "Calcule son périmètre.", "Combien mesure son tour complet ?"])}`,
    format: "short",
    expected: [`${fr(per)} ${o.u}`],
    comparator: "number_equal",
    explanation: expl(
      `Deux cas possibles : ${fr(a)}, ${fr(a)}, ${fr(b)} ou ${fr(a)}, ${fr(b)}, ${fr(b)}. Le premier est impossible : ${fr(a)} + ${fr(a)} = ${fr(2 * a)}, pas plus grand que ${fr(b)}. Il reste ${fr(a)} + ${fr(b)} + ${fr(b)} = ${fr(per)} ${o.u}.`,
    ),
  };
}

export const trianglesBank: TutorBankItemV4[] = [
  // =========================
  // TRIANGLE_NOMMER
  // =========================
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    text: "Comment nomme-t-on un triangle qui a pour sommets A, B et C ?",
    format: "short",
    expected: ["triangle abc", "abc", "ABC"],
    comparator: "contains_keyword",
    hint: "On écrit souvent : triangle ABC.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle se nomme avec ses trois sommets. Ici, on peut l’appeler triangle ABC.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "nommage"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 70 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a pour sommets D, E et F. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle def", "def", "DEF"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets dans l’ordre : triangle DEF.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Pour nommer un triangle, on utilise les lettres de ses trois sommets. Ici, c’est le triangle DEF.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "nommage"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 150, y: 75 },
      },
      labels: {
        A: "D",
        B: "E",
        C: "F",
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_nommer_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    text: "Quel est le bon nom pour un triangle de sommets A, B et C ?",
    format: "qcm",
    choices: ["triangle AB", "triangle ABC", "triangle AC", "triangle ACBF"],
    expected: ["triangle ABC"],
    comparator: "mcq_exact",
    hint: "Un triangle se nomme avec ses trois sommets.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle se nomme avec ses trois sommets. La bonne réponse est donc triangle ABC.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "nommage", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 80, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 65 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "template",
    id: "triangle_nommer_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nommer",
    difficulty: 1,
    theme: "neutral",
    hint: "On nomme un triangle avec les trois sommets.",
    tags: ["triangle_figure", "nommage", "template"],
    generate: () => genNommerDepuisSommets(),
  },

  // =========================
  // TRIANGLE_SOMMETS_COTES
  // =========================
  {
    kind: "fixed",
    id: "triangle_sommet_cote_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Combien de côtés possède un triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "6"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Un triangle a toujours 3 côtés.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle est une figure qui possède toujours 3 côtés.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "cotes", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 60, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 60 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 1,
    theme: "neutral",
    text: "Observe la figure. Combien de sommets possède ce triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Un triangle a 3 sommets.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Les trois sommets du triangle sont les trois points de la figure. Un triangle possède donc 3 sommets.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "sommets", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 150, y: 70 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
      },
      sideLabels: {
        AB: "AB",
        BC: "BC",
        CA: "CA",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Sur la figure, quel segment est un côté du triangle ?",
    format: "qcm",
    choices: ["AB", "AD", "AE", "BD"],
    expected: ["AB"],
    comparator: "mcq_exact",
    hint: "Les côtés relient deux sommets du triangle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un côté d’un triangle relie deux sommets du triangle. Ici, AB est bien un côté du triangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "cotes", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 75, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 75 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
      },
      sideLabels: {
        AB: "AB",
        BC: "BC",
        CA: "CA",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, quel est le sommet opposé au côté BC ?",
    format: "qcm",
    choices: ["A", "B", "C"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Le côté BC ne contient pas le sommet A.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le côté BC relie les sommets B et C. Le sommet opposé à ce côté est donc A.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "sommets", "cotes"],
  },
  {
    kind: "template",
    id: "triangle_sommet_cote_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 2,
    theme: "neutral",
    hint: "Un triangle a toujours 3 sommets et 3 côtés.",
    tags: ["triangle_figure", "sommets", "cotes", "template"],
    generate: () => genSommetCoteRelier(),
  },
  {
    kind: "template",
    id: "triangle_sommet_cote_tpl_compter",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 1,
    theme: "neutral",
    hint: "Un triangle a 3 sommets, 3 côtés et 3 angles. Un côté relie deux sommets.",
    tags: ["triangle_figure", "sommets", "cotes", "template"],
    generate: () => genSommetCoteCompter(),
  },

  // =========================
  // TRIANGLE_TYPE_COTES
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_cote_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a deux côtés de même longueur. Quel est son type ?",
    format: "short",
    expected: ["isocèle", "isocele"],
    comparator: "contains_keyword",
    hint: "Deux côtés égaux → triangle isocèle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui possède deux côtés de même longueur est un triangle isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a trois côtés de même longueur. Quel est son type ?",
    format: "short",
    expected: ["équilatéral", "equilateral"],
    comparator: "contains_keyword",
    hint: "Trois côtés égaux → triangle équilatéral.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui possède trois côtés de même longueur est un triangle équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Observe les codages. Quel est le type de ce triangle selon ses côtés ?",
    format: "qcm",
    choices: ["rectangle", "isocèle", "quelconque", "obtus"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Les deux côtés marqués de la même façon sont égaux.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Deux côtés ont le même codage, donc ils sont égaux. Le triangle est donc isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "canvas", "qcm", "cotes"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 70, y: 210 },
        C: { x: 250, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["CA", "AB"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Quel triangle possède trois côtés égaux ?",
    format: "qcm",
    choices: ["rectangle", "équilatéral", "obtus", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Trois côtés égaux → équilatéral.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le triangle qui possède trois côtés égaux est le triangle équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "qcm", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 2,
    theme: "neutral",
    text: "Observe les codages. Quel est le type de ce triangle ?",
    format: "qcm",
    choices: ["équilatéral", "isocèle", "rectangle", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Les trois côtés sont marqués comme égaux.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Les trois côtés portent le même codage, donc ils sont tous égaux. Le triangle est équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "canvas", "qcm", "cotes"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 55 },
        B: { x: 80, y: 210 },
        C: { x: 240, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CA"]],
      },
    },
  },
  {
    kind: "template",
    id: "triangle_type_cote_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux côtés égaux → isocèle ; trois côtés égaux → équilatéral.",
    tags: ["triangle_figure", "cotes", "template"],
    generate: () => genTypeCoteCodages(),
  },
  {
    kind: "template",
    id: "triangle_type_cote_tpl_longueurs",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 1,
    theme: "neutral",
    hint: "Compare les trois longueurs : combien sont égales ?",
    tags: ["triangle_figure", "cotes", "template", "qcm"],
    generate: () => genTypeCoteLongueurs(),
  },

  // =========================
  // TRIANGLE_TYPE_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_angle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle possède un angle droit. Quel est son type ?",
    format: "short",
    expected: ["rectangle"],
    comparator: "contains_keyword",
    hint: "Un angle droit → triangle rectangle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui possède un angle droit est un triangle rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a un angle supérieur à 90°. Quel est son type ?",
    format: "short",
    expected: ["obtus"],
    comparator: "contains_keyword",
    hint: "Un angle > 90° → triangle obtusangle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Quand un triangle possède un angle supérieur à 90°, c’est un triangle obtusangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a tous ses angles inférieurs à 90°. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "obtus", "aigu"],
    expected: ["aigu"],
    comparator: "mcq_exact",
    hint: "Tous les angles < 90°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Quand les trois angles d’un triangle sont inférieurs à 90°, on dit que c’est un triangle aigu.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "qcm", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le codage. Quel est le type de ce triangle selon ses angles ?",
    format: "qcm",
    choices: ["aigu", "rectangle", "obtus"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Le petit carré indique un angle droit.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le petit carré montre qu’il y a un angle droit. Le triangle est donc rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "canvas", "qcm", "angle_mesure"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 250, y: 80 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAngleAt: "B",
      },
    },
  },
  {
    kind: "template",
    id: "triangle_type_angle_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si un angle est droit, obtus ou si tous sont aigus.",
    tags: ["triangle_figure", "template", "qcm", "angle_mesure"],
    generate: () => genTypeAngleFigure(),
  },
  {
    kind: "template",
    id: "triangle_type_angle_tpl_mesures",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 1,
    theme: "neutral",
    hint: "Regarde le plus grand angle : 90° droit, plus de 90° obtus, moins de 90° aigu.",
    tags: ["triangle_figure", "template", "qcm", "angle_mesure"],
    generate: () => genTypeAngleMesures(),
  },

  // =========================
  // TRIANGLE_SOMME_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle est la somme des angles d’un triangle ?",
    format: "short",
    expected: ["180°"],
    comparator: "number_equal",
    hint: "Dans tout triangle, la somme est 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Dans tous les triangles, la somme des trois angles est toujours égale à 180°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le triangle ci-dessous, quelle est toujours la somme des angles ?",
    format: "qcm",
    choices: ["90°", "180°", "270°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété valable pour tous les triangles.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Quelle que soit la forme du triangle, la somme de ses angles vaut toujours 180°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "angle_mesure", "qcm", "canvas"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 160, y: 75 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showAngles: true,
      },
      angleLabels: {
        A: "A",
        B: "B",
        C: "C",
      },
    },
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans tous les triangles, la somme vaut 180°.",
    tags: ["triangle_figure", "template", "angle_mesure"],
    generate: () => genSommeConnaitre(),
  },

  // =========================
  // TRIANGLE_ANGLE_MANQUANT
  // =========================
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 60° et 70°. Combien mesure le troisième ?",
    format: "short",
    expected: ["50°"],
    comparator: "number_equal",
    hint: "180 - 60 - 70",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("La somme des angles d’un triangle vaut 180°. Donc le troisième angle vaut 180 - 60 - 70 = 50°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure et calcule l’angle C.",
    format: "short",
    expected: ["50°"],
    comparator: "number_equal",
    hint: "La somme des angles d’un triangle vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("On connaît deux angles : 60° et 70°. L’angle manquant vaut donc 180 - 60 - 70 = 50°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "canvas", "angle_mesure"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 260, y: 210 },
        C: { x: 160, y: 70 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showAngles: true,
      },
      angleLabels: {
        A: "60°",
        B: "70°",
        C: "?",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 40° et 90°. Combien mesure le troisième ?",
    format: "qcm",
    choices: ["40°", "50°", "60°", "70°"],
    expected: ["50°"],
    comparator: "mcq_exact",
    hint: "180 - 40 - 90",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le troisième angle vaut 180 - 40 - 90 = 50°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "qcm", "angle_mesure"],
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 2,
    theme: "neutral",
    hint: "La somme des angles vaut 180°.",
    tags: ["triangle_figure", "template", "angle_mesure"],
    generate: () => genAngleManquantQcm(),
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_canvas_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 3,
    theme: "neutral",
    hint: "Utilise 180°.",
    tags: ["triangle_figure", "template", "canvas", "angle_mesure"],
    generate: () => genAngleManquantFigure(),
  },

  // =========================
  // TRIANGLE_POSSIBLE_OU_NON
  // =========================
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle de côtés 2 cm, 3 cm et 6 cm ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "2 + 3 < 6, donc ce n’est pas possible.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Pour construire un triangle, la somme de deux côtés doit être plus grande que le troisième. Ici 2 + 3 = 5, et 5 est plus petit que 6. Ce n’est donc pas possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle de côtés 4 cm, 5 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "4 + 5 > 7",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("On vérifie : 4 + 5 = 9, et 9 est plus grand que 7. Le triangle est donc possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "qcm", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    text: "Avec les longueurs indiquées sur les côtés, peut-on construire un triangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie si la somme de deux côtés est plus grande que le troisième.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("On vérifie 4 + 5 = 9, et 9 est plus grand que 7. On peut donc construire ce triangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "canvas", "qcm", "construction"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 75, y: 210 },
        B: { x: 255, y: 210 },
        C: { x: 165, y: 75 },
      },
      display: {
        showPoints: true,
        showLabels: true,
        showSides: true,
      },
      sideLabels: {
        AB: "4 cm",
        BC: "5 cm",
        CA: "7 cm",
      },
    },
  },
  {
    kind: "template",
    id: "triangle_possible_ou_non_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_possible_ou_non",
    difficulty: 3,
    theme: "neutral",
    hint: "La somme de deux côtés doit être plus grande que le troisième.",
    tags: ["triangle_figure", "template", "construction"],
    generate: () => genPossibleLimite(),
  },
  {
    kind: "template",
    id: "triangle_possible_ou_non_tpl_simple",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_possible_ou_non",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne les deux plus petites longueurs et compare à la plus grande.",
    tags: ["triangle_figure", "template", "construction", "qcm"],
    generate: () => genPossibleSimple(),
  },

  // =========================
  // TRIANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a deux angles de 40° et 60°. Combien mesure le troisième angle ?",
    format: "short",
    expected: ["80°"],
    comparator: "number_equal",
    hint: "La somme des angles d’un triangle vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le troisième angle vaut 180 - 40 - 60 = 80°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 1,
    theme: "neutral",
    text: "Un triangle a deux côtés égaux. Quel est son type ?",
    format: "short",
    expected: ["isocèle", "isocele"],
    comparator: "contains_keyword",
    hint: "Deux côtés égaux → triangle isocèle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Un triangle qui a deux côtés égaux est un triangle isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "types"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle a pour angles 90°, 45° et 45°. Est-ce possible ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Vérifie la somme des angles.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("90 + 45 + 45 = 180. Ce triangle est donc possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "qcm", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Peut-on construire un triangle avec les longueurs 3 cm, 4 cm et 8 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La somme de deux côtés doit être plus grande que le troisième.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("3 + 4 = 7, et 7 est plus petit que 8. On ne peut donc pas construire ce triangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_canvas_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la figure. Ce triangle est-il rectangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Le petit carré rouge indique un angle droit.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Le petit carré rouge indique un angle droit. Le triangle est donc rectangle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "canvas", "qcm"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 70, y: 210 },
        B: { x: 250, y: 210 },
        C: { x: 250, y: 90 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        rightAngleAt: "B",
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a deux angles égaux et un angle de 100°. Combien mesurent les deux autres angles ?",
    format: "short",
    expected: ["40°"],
    comparator: "number_equal",
    hint: "Les deux autres angles sont égaux et la somme totale vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Il reste 180 - 100 = 80° pour les deux autres angles. Comme ils sont égaux, chacun mesure 40°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "raisonnement", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_5",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on avoir un triangle avec deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Deux angles droits valent déjà 90 + 90 = 180°. Il ne resterait plus rien pour le troisième angle. Ce n’est donc pas possible.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "logique", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_canvas_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Observe les codages. Ce triangle est-il isocèle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Deux traits identiques sur deux côtés signifient que ces côtés sont égaux.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Deux côtés portent le même codage, donc ils sont égaux. Le triangle est donc isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "canvas", "qcm", "types"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 50 },
        B: { x: 70, y: 210 },
        C: { x: 250, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["CA", "AB"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle a un angle droit et deux côtés égaux. Quel est son type précis ?",
    format: "qcm",
    choices: [
      "triangle rectangle",
      "triangle isocèle",
      "triangle rectangle isocèle",
      "triangle équilatéral",
    ],
    expected: ["triangle rectangle isocèle"],
    comparator: "mcq_exact",
    hint: "Il est à la fois rectangle et isocèle.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Il possède un angle droit, donc il est rectangle, et deux côtés égaux, donc il est isocèle. C’est donc un triangle rectangle isocèle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "types", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_6",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle équilatéral, combien mesure chaque angle ?",
    format: "short",
    expected: ["60°"],
    comparator: "number_equal",
    hint: "Les trois angles sont égaux et leur somme vaut 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Dans un triangle équilatéral, les trois angles sont égaux. Comme leur somme vaut 180°, chaque angle mesure 180 ÷ 3 = 60°.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "equilateral", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_canvas_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Observe la figure. Ce triangle est-il équilatéral ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Les trois côtés portent le même codage.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Les trois côtés sont codés égaux. Le triangle est donc équilatéral.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "canvas", "qcm", "equilateral"],
    canvas: {
      kind: "triangle",
      points: {
        A: { x: 160, y: 55 },
        B: { x: 80, y: 210 },
        C: { x: 240, y: 210 },
      },
      display: {
        showPoints: true,
        showLabels: true,
      },
      marks: {
        equalSides: [["AB", "BC"], ["BC", "CA"]],
      },
    },
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_7",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on avoir un triangle dont un angle mesure 179° ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "C’est possible si les deux autres angles sont très petits.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Oui. Si un angle mesure 179°, il reste 180 − 179 = 1° pour les deux autres : par exemple 0,5° et 0,5°. Le triangle est très aplati, mais il existe.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_8",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Peut-on connaître exactement les longueurs des côtés d’un triangle si on connaît seulement ses trois angles ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux triangles peuvent avoir les mêmes angles mais des tailles différentes.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Non. Deux triangles peuvent avoir les mêmes angles tout en ayant des tailles différentes. Les angles seuls ne suffisent donc pas à connaître exactement les longueurs.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "logique", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_propriete_defi_fixed_9",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Pourquoi ne peut-on pas construire un triangle ayant deux angles droits ?",
    format: "qcm",
    choices: [
      "deux angles droits font déjà 180° : il ne reste rien pour le troisième",
      "un triangle n’a jamais d’angle droit",
      "deux angles droits feraient un carré",
      "on peut, si le triangle est très grand",
    ],
    expected: ["deux angles droits font déjà 180° : il ne reste rien pour le troisième"],
    comparator: "mcq_exact",
    hint: "Deux angles droits font déjà 180°.",
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("Dans un triangle, la somme des angles vaut 180°. Or deux angles droits font déjà 180°. Il ne resterait donc plus de place pour le troisième angle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["triangle_figure", "defi", "raisonnement"],
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_10",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Additionne mentalement les angles et compare à 180°.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure"],
    generate: () => genDefiIsoceleBase(),
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_angles_possibles",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 1,
    theme: "neutral",
    hint: "Additionne les trois angles : un triangle fait toujours 180°.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure", "qcm"],
    generate: () => genDefiAnglesPossibles(),
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_deux_angles",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux angles doivent faire MOINS de 180° pour laisser de la place au troisième.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure", "qcm"],
    generate: () => genDefiDeuxAngles(),
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_isocele_angles",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans un triangle isocèle, les deux angles à la base sont égaux.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure", "isocele"],
    generate: () => genDefiIsoceleAngles(),
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_11",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Teste si la somme de deux côtés est plus grande que le troisième.",
    tags: ["triangle_figure", "defi", "template", "construction"],
    generate: () => genDefiIsocelePerimetreDeuxCotes(),
  },

  // =========================
  // TOP-UP — TRIANGLE_NOMMER
  // =========================
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Un triangle a pour sommets K, L et M. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle klm", "klm", "KLM"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets : triangle KLM.",
    explanation: expl("On nomme un triangle avec ses trois sommets : triangle KLM."),
    tags: ["triangle_figure", "nommage"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_fixed_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Un triangle a pour sommets R, S et T. Comment peut-on le nommer ?",
    format: "short",
    expected: ["triangle rst", "rst", "RST"],
    comparator: "contains_keyword",
    hint: "On écrit les trois sommets : triangle RST.",
    explanation: expl("On nomme un triangle avec ses trois sommets : triangle RST."),
    tags: ["triangle_figure", "nommage"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Comment note-t-on le triangle dont les sommets sont X, Y et Z ?",
    format: "qcm",
    choices: ["triangle XYZ", "segment XYZ", "angle XYZ", "triangle XY"],
    expected: ["triangle XYZ"],
    comparator: "mcq_exact",
    hint: "Un triangle se note avec ses trois sommets.",
    explanation: expl("Un triangle se note avec ses trois sommets : triangle XYZ."),
    tags: ["triangle_figure", "nommage", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 2, theme: "neutral",
    text: "Les écritures « triangle ABC » et « triangle CBA » désignent-elles le même triangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "On peut citer les sommets dans n’importe quel ordre.",
    explanation: expl("Un triangle est défini par ses trois sommets, peu importe l’ordre dans lequel on les cite. ABC et CBA désignent donc le même triangle."),
    tags: ["triangle_figure", "nommage", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_nommer_short_5",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    text: "Combien de sommets utilise-t-on pour nommer un triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "6"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Un triangle a 3 sommets.",
    explanation: expl("On nomme un triangle avec ses 3 sommets."),
    tags: ["triangle_figure", "nommage"],
  },
  {
    kind: "template",
    id: "triangle_nommer_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_nommer",
    difficulty: 1, theme: "neutral",
    hint: "On nomme un triangle avec ses trois sommets.",
    tags: ["triangle_figure", "nommage", "template"],
    generate: () => genNommerLireNom(),
  },

  // =========================
  // TOP-UP — TRIANGLE_SOMMET_COTE
  // =========================
  {
    kind: "fixed",
    id: "triangle_sommet_cote_fixed_5",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 1, theme: "neutral",
    text: "Combien d’angles possède un triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "6"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Un triangle a autant d’angles que de sommets.",
    explanation: expl("Un triangle possède 3 sommets, 3 côtés et 3 angles."),
    tags: ["triangle_figure", "angles"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 2, theme: "neutral",
    text: "Dans le triangle ABC, quel est le côté opposé au sommet A ?",
    format: "qcm",
    choices: ["BC", "AB", "AC", "AD"],
    expected: ["BC"],
    comparator: "mcq_exact",
    hint: "Le côté opposé à A ne contient pas A.",
    explanation: expl("Le côté opposé au sommet A est celui qui ne contient pas A, c’est-à-dire BC."),
    tags: ["triangle_figure", "cotes", "sommets", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_short_6",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 2, theme: "neutral",
    text: "Dans le triangle DEF, quel sommet est opposé au côté DE ?",
    format: "qcm",
    choices: ["D", "E", "F"],
    expected: ["F"],
    comparator: "mcq_exact",
    hint: "Le côté DE relie D et E.",
    explanation: expl("Le côté DE relie les sommets D et E. Le sommet opposé à ce côté est donc F."),
    tags: ["triangle_figure", "sommets", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 2, theme: "neutral",
    text: "Dans le triangle ABC, lequel de ces segments n’est PAS un côté du triangle ?",
    format: "qcm",
    choices: ["BD", "AB", "BC", "CA"],
    expected: ["BD"],
    comparator: "mcq_exact",
    hint: "Les côtés relient deux sommets du triangle (A, B ou C).",
    explanation: expl("Les côtés du triangle ABC sont AB, BC et CA. BD n’est pas un côté car D n’est pas un sommet du triangle."),
    tags: ["triangle_figure", "cotes", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_sommet_cote_short_7",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_sommet_cote",
    difficulty: 1, theme: "neutral",
    text: "Un triangle a autant de sommets que de côtés. Combien en a-t-il ?",
    format: "qcm",
    choices: ["2", "3", "4", "6"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "3 sommets et 3 côtés.",
    explanation: expl("Un triangle possède 3 sommets et 3 côtés."),
    tags: ["triangle_figure", "sommets", "cotes"],
  },

  // =========================
  // TOP-UP — TRIANGLE_TYPE_COTE
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_cote_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 3, theme: "neutral",
    text: "Un triangle équilatéral est aussi un triangle...",
    format: "qcm",
    choices: ["isocèle", "rectangle", "quelconque", "obtus"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Il a (au moins) deux côtés égaux.",
    explanation: expl("Un triangle équilatéral a ses trois côtés égaux, donc il a aussi deux côtés égaux : c’est un cas particulier de triangle isocèle."),
    tags: ["triangle_figure", "types", "cotes", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 1, theme: "neutral",
    text: "Combien de côtés égaux possède un triangle équilatéral ?",
    format: "qcm",
    choices: ["0", "2", "3", "4"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Équilatéral = tous les côtés égaux.",
    explanation: expl("Un triangle équilatéral a ses 3 côtés de même longueur."),
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_short_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 2, theme: "neutral",
    text: "Au minimum, combien de côtés égaux possède un triangle isocèle ?",
    format: "qcm",
    choices: ["1", "2", "3", "4"],
    expected: ["2"],
    comparator: "mcq_exact",
    hint: "Isocèle = deux côtés de même longueur.",
    explanation: expl("Un triangle isocèle possède au moins 2 côtés de même longueur."),
    tags: ["triangle_figure", "types", "cotes"],
  },
  {
    kind: "fixed",
    id: "triangle_type_cote_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_cote",
    difficulty: 2, theme: "neutral",
    text: "Quel type de triangle a ses trois côtés de longueurs différentes ?",
    format: "qcm",
    choices: ["quelconque", "isocèle", "équilatéral", "rectangle isocèle"],
    expected: ["quelconque"],
    comparator: "mcq_exact",
    hint: "Aucun côté égal aux autres.",
    explanation: expl("Un triangle dont les trois côtés ont des longueurs toutes différentes est un triangle quelconque."),
    tags: ["triangle_figure", "types", "cotes", "qcm"],
  },

  // =========================
  // TOP-UP — TRIANGLE_TYPE_ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_type_angle_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 1, theme: "neutral",
    text: "Un triangle rectangle possède un angle de combien de degrés ?",
    format: "short",
    expected: ["90°"],
    comparator: "number_equal",
    hint: "Un angle droit mesure 90°.",
    explanation: expl("Un triangle rectangle possède un angle droit, c’est-à-dire un angle de 90°."),
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    text: "Un triangle obtusangle possède un angle...",
    format: "qcm",
    choices: ["supérieur à 90°", "égal à 90°", "de 0°", "toujours de 60°"],
    expected: ["supérieur à 90°"],
    comparator: "mcq_exact",
    hint: "Obtus = angle plus grand qu’un angle droit.",
    explanation: expl("Un triangle obtusangle possède un angle obtus, c’est-à-dire un angle supérieur à 90°."),
    tags: ["triangle_figure", "types", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle aigu, tous les angles sont inférieurs à combien de degrés ?",
    format: "short",
    expected: ["90°"],
    comparator: "number_equal",
    hint: "Aigu = tous les angles plus petits qu’un angle droit.",
    explanation: expl("Dans un triangle aigu, les trois angles sont inférieurs à 90°."),
    tags: ["triangle_figure", "types", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_type_angle_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    text: "Un triangle possède un angle de 120°. Quel est son type selon ses angles ?",
    format: "qcm",
    choices: ["obtus", "rectangle", "aigu", "équilatéral"],
    expected: ["obtus"],
    comparator: "mcq_exact",
    hint: "120° est plus grand que 90°.",
    explanation: expl("L’angle de 120° est supérieur à 90° : c’est un angle obtus. Le triangle est donc obtusangle."),
    tags: ["triangle_figure", "types", "angle_mesure", "qcm"],
  },
  {
    kind: "template",
    id: "triangle_type_angle_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_figure", microId: "triangle_type_angle",
    difficulty: 2, theme: "neutral",
    hint: "Regarde le plus grand angle : > 90° obtus, = 90° rectangle, < 90° aigu.",
    tags: ["triangle_figure", "types", "angle_mesure", "template"],
    generate: () => genTypeAngleDeux(),
  },

  // =========================
  // TOP-UP — TRIANGLE_SOMME_ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 1, theme: "neutral",
    text: "Dans n’importe quel triangle, la somme des trois angles est égale à...",
    format: "qcm",
    choices: ["180°", "90°", "360°", "60°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété valable pour tous les triangles.",
    explanation: expl("Dans tous les triangles, la somme des trois angles vaut 180°."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Un triangle a ses trois angles égaux. Combien mesure chacun de ses angles ?",
    format: "short",
    expected: ["60°"],
    comparator: "number_equal",
    hint: "180 ÷ 3.",
    explanation: expl("La somme des angles vaut 180°. Comme les trois angles sont égaux, chacun mesure 180 ÷ 3 = 60°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_short_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle rectangle, un angle vaut 90°. Combien vaut la somme des deux autres angles ?",
    format: "short",
    expected: ["90°"],
    comparator: "number_equal",
    hint: "180 - 90.",
    explanation: expl("La somme des trois angles vaut 180°. Si un angle vaut 90°, il reste 180 - 90 = 90° pour les deux autres angles."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Peut-il exister un triangle dont la somme des angles vaut 200° ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "La somme des angles d’un triangle est fixe.",
    explanation: expl("Dans un triangle, la somme des angles vaut toujours 180°. Elle ne peut donc pas valoir 200°."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 1, theme: "neutral",
    text: "La somme des angles d’un triangle équilatéral vaut...",
    format: "qcm",
    choices: ["180°", "60°", "90°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "Comme pour tous les triangles.",
    explanation: expl("La somme des angles d’un triangle vaut toujours 180°, y compris pour le triangle équilatéral."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_short_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    text: "Deux angles d’un triangle valent 80° et 60°. Quelle est la somme des trois angles ?",
    format: "short",
    expected: ["180°"],
    comparator: "number_equal",
    hint: "C’est toujours la même valeur.",
    explanation: expl("Quelle que soit la forme du triangle, la somme de ses trois angles vaut toujours 180°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_somme_angle",
    difficulty: 2, theme: "neutral",
    hint: "Somme des deux autres = 180 − l’angle connu.",
    tags: ["triangle_figure", "angle_mesure", "template"],
    generate: () => genSommeDeuxAutres(),
  },

  // =========================
  // TOP-UP — TRIANGLE_ANGLE_MANQUANT
  // =========================
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 30° et 80°. Combien mesure le troisième ?",
    format: "short",
    expected: ["70°"],
    comparator: "number_equal",
    hint: "180 - 30 - 80.",
    explanation: expl("Le troisième angle vaut 180 - 30 - 80 = 70°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 3, theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu mesure 35°. Combien mesure l’autre angle aigu ?",
    format: "short",
    expected: ["55°"],
    comparator: "number_equal",
    hint: "Les deux angles aigus d’un triangle rectangle ont une somme de 90°.",
    explanation: expl("Un angle vaut 90°. Les deux angles aigus ont donc pour somme 90°. L’autre angle aigu vaut 90 - 35 = 55°."),
    tags: ["triangle_figure", "angle_mesure"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 2, theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième ?",
    format: "qcm",
    choices: ["70°", "60°", "80°", "50°"],
    expected: ["70°"],
    comparator: "mcq_exact",
    hint: "180 - 50 - 60.",
    explanation: expl("Le troisième angle vaut 180 - 50 - 60 = 70°."),
    tags: ["triangle_figure", "angle_mesure", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_angle_manquant_fixed_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 3, theme: "neutral",
    text: "Un triangle isocèle a son angle au sommet qui mesure 40°. Combien mesure chacun des deux angles à la base ?",
    format: "short",
    expected: ["70°"],
    comparator: "number_equal",
    hint: "Les deux angles à la base sont égaux ; il reste 180 - 40 à partager en deux.",
    explanation: expl("Il reste 180 - 40 = 140° pour les deux angles à la base. Comme ils sont égaux, chacun mesure 140 ÷ 2 = 70°."),
    tags: ["triangle_figure", "angle_mesure", "isocele"],
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_angle_manquant",
    difficulty: 2, theme: "neutral",
    hint: "Troisième angle = 180 − les deux autres.",
    tags: ["triangle_figure", "angle_mesure", "template"],
    generate: () => genAngleManquantCourt(),
  },

  // =========================
  // TOP-UP — TRIANGLE_POSSIBLE_OU_NON
  // =========================
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 2, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 5 cm, 5 cm et 5 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "5 + 5 > 5.",
    explanation: expl("La somme de deux côtés (5 + 5 = 10) est plus grande que le troisième (5). Le triangle est possible : c’est un triangle équilatéral."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_3",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 1 cm, 2 cm et 10 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "1 + 2 < 10.",
    explanation: expl("La somme des deux plus petits côtés (1 + 2 = 3) est plus petite que le troisième (10). Le triangle est impossible."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_short_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 2, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 6 cm, 8 cm et 10 cm ? Réponds par oui ou non.",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "6 + 8 > 10.",
    explanation: expl("La somme de deux côtés (6 + 8 = 14) est plus grande que le troisième (10). Le triangle est possible."),
    tags: ["triangle_figure", "construction"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_4",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    text: "Pour qu’un triangle existe, la somme de deux côtés doit être ... au troisième côté.",
    format: "qcm",
    choices: ["supérieure", "inférieure", "égale", "nulle"],
    expected: ["supérieure"],
    comparator: "mcq_exact",
    hint: "C’est l’inégalité triangulaire.",
    explanation: expl("Pour qu’un triangle existe, la somme de deux côtés doit toujours être supérieure à la longueur du troisième côté."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_possible_ou_non_qcm_5",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    text: "Peut-on construire un triangle de côtés 3 cm, 4 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "3 + 4 = 7 : ce n’est pas strictement plus grand.",
    explanation: expl("On a 3 + 4 = 7, ce qui est égal au troisième côté et non strictement supérieur. Les trois points seraient alignés : le triangle est impossible (triangle « aplati »)."),
    tags: ["triangle_figure", "construction", "qcm"],
  },
  {
    kind: "template",
    id: "triangle_possible_ou_non_tpl_2",
    niveau: "6e", matiere: "maths",
    notionId: "triangle_propriete", microId: "triangle_possible_ou_non",
    difficulty: 3, theme: "neutral",
    hint: "Compare la somme des deux plus petits côtés au plus grand.",
    tags: ["triangle_figure", "construction", "template"],
    generate: () => genTroisiemeCote(),
  },

  // =========================
  // TRIANGLE_DEFI — LES GÉNÉRATEURS DE RECONNAISSANCE
  //
  // ⛔ RÉPARATION DU 22/08/2026. La coupe de `triangle_figure` en deux notions a
  // emporté les DEUX générateurs de `triangle_defi` vers `triangle_propriete`
  // (ils portaient sur la somme des angles et sur la constructibilité). La micro
  // de reconnaissance s'est donc retrouvée avec cinq questions figées — et la
  // règle d'or de Frédéric est qu'un élève ne doit pas retomber sur la même
  // question en dix minutes, soit dix variantes au minimum par micro.
  //
  // ⭐ Une micro CONCEPTUELLE se paramètre sur la SITUATION, pas sur les
  // nombres : ici le type du triangle et ses mesures changent, le raisonnement
  // reste le même, et l'élève ne peut plus reconnaître la question sans la
  // refaire.
  // =========================
  {
    kind: "template",
    id: "triangle_defi_tpl_reconnaissance",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde d'abord les côtés : combien sont égaux ?",
    tags: ["triangle_figure", "defi", "template"],
    generate: () => genDefiReconnaissance(),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Pense aux définitions : isocèle = AU MOINS deux côtés égaux ; rectangle = un angle droit codé ou mesuré.",
    tags: ["triangle_figure", "defi", "template", "qcm"],
    generate: () => genDefiRaisons(),
  },

  // =========================
  // GÉNÉRATEURS DU 29/09/2026 — L'ÉVALUATION PAR CHAPITRES
  //
  // Le mode Défi (difficultés 3 à 5) n'offrait que 7 questions distinctes sur
  // « Triangles : reconnaître et nommer ». Six générateurs : les noms des
  // sommets changent à chaque tirage, et les questions exigeantes font
  // TRAVAILLER la définition (isocèle EN un sommet, périmètre d'un triangle
  // particulier) au lieu de la réciter.
  // =========================
  {
    kind: "template",
    id: "triangle_sommet_cote_qcm_tpl_oppose",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Le côté opposé à un sommet est le seul côté qui ne passe pas par ce sommet.",
    tags: ["triangle_figure", "sommet_cote", "qcm", "template"],
    generate: () => genSommetCoteOppose(),
  },
  {
    kind: "template",
    id: "triangle_type_cote_qcm_tpl_isocele_en",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère les deux côtés égaux : quel sommet ont-ils en commun ?",
    tags: ["triangle_figure", "type_cote", "qcm", "template", "isocele"],
    generate: () => genTypeCoteIsoceleEn(),
  },
  {
    kind: "template",
    id: "triangle_type_cote_tpl_equilateral_perimetre",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "Dans un triangle équilatéral, les trois côtés ont la même longueur.",
    tags: ["triangle_figure", "type_cote", "template", "equilateral", "perimetre"],
    generate: () => genTypeCoteEquilateralPerimetre(),
  },
  {
    kind: "template",
    id: "triangle_type_cote_tpl_isocele_perimetre",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 4,
    theme: "neutral",
    hint: "« Isocèle en X » : les deux côtés qui partent de X sont égaux.",
    tags: ["triangle_figure", "type_cote", "template", "isocele", "perimetre"],
    generate: () => genTypeCoteIsocelePerimetre(),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_isocele_cote_manquant",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Retire la base du périmètre : il reste les deux côtés égaux.",
    tags: ["triangle_figure", "defi", "template", "isocele", "perimetre"],
    generate: () => genDefiIsoceleCoteManquant(),
  },
  {
    kind: "template",
    id: "triangle_defi_qcm_tpl_codages",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis TOUS les codages : le petit carré (angle droit) et les petits traits (côtés égaux).",
    tags: ["triangle_figure", "defi", "qcm", "template", "canvas", "codage"],
    generate: () => genDefiCodages(),
  },
];