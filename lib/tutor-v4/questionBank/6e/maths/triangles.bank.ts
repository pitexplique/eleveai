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
  { nom: "l’entrée d’une tente", u: "m", min: 1, max: 3 },
  { nom: "un morceau de tissu", u: "cm", min: 10, max: 60 },
  { nom: "une pièce de puzzle", u: "cm", min: 3, max: 9 },
  { nom: "un carreau de mosaïque", u: "cm", min: 4, max: 15 },
  { nom: "une étagère d’angle", u: "cm", min: 25, max: 60 },
  { nom: "un champ", u: "m", min: 40, max: 150 },
  { nom: "une rampe de skate", u: "m", min: 1, max: 4 },
  { nom: "un demi-sandwich", u: "cm", min: 8, max: 14 },
  { nom: "une serviette pliée", u: "cm", min: 15, max: 35 },
  { nom: "un panneau de randonnée", u: "cm", min: 30, max: 80 },
];
const objet = () => pick(OBJETS);

/** La phrase qui pose le triangle `nom` dans sa situation. */
function situation(nom: string, o: Objet, P: Prenom) {
  // 03/11/2026 : des phrases courtes, une information chacune (★3 : 25 mots au plus).
  return pick([
    `${P.nom} dessine ${o.nom} : c’est le triangle ${nom}.`,
    `${cap(o.nom)} a la forme du triangle ${nom}.`,
    `Le triangle ${nom} représente ${o.nom}.`,
    `${P.nom} trace ${o.nom}. C’est le triangle ${nom}.`,
  ]);
}

/* ⛔⛔ 03/11/2026 — D'ABORD LE GESTE NU (Frédéric, ../REGLES-6E.md) : à ★1 et
   ★2, ni prénom, ni objet (voile, pignon, tissu…), ni histoire — « Dans le
   triangle CMS, Ĉ = 61° et M̂ = 50°. Calcule l'angle en S. », 12 mots au plus
   à ★1, 15 à ★2, verbe d'action en tête. Chaque générateur prend `ctx` :
   `false` (défaut) donne l'énoncé nu, souvent porté par la FIGURE (longueurs,
   angles, codages écrits dessus) ; `true` garde les situations d'avant, que
   les gabarits « _ctx3 » servent à ★3. */
/** Les dimensions d'un triangle nu : des centimètres, des mètres parfois. */
const nu = (): Objet => (Math.random() < 0.75 ? { nom: "", u: "cm", min: 3, max: 12 } : { nom: "", u: "m", min: 2, max: 9 });
/** L'angle d'un sommet écrit comme en classe : $\widehat{C}$. */
const chapeau = (S: string) => `$\\widehat{${S}}$`;

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
function genNommerDepuisSommets(ctx = false): Q {
  const [X, Y, Z] = sommetsTriangle();
  const o = objet();
  const P = prenom();
  const W = autreLettre([X, Y, Z]);
  const intro = ctx
    ? pick([
        `${P.nom} dessine ${o.nom}. Ses trois sommets sont ${X}, ${Y} et ${Z}.`,
        `${cap(o.nom)} a trois coins : les points ${X}, ${Y} et ${Z}.`,
        `Sur le dessin ${de(P.nom)}, ${o.nom} a pour sommets ${X}, ${Y} et ${Z}.`,
        `On représente ${o.nom} par un triangle. Ses sommets sont ${X}, ${Y} et ${Z}.`,
      ])
    : "";
  const question = ctx
    ? pick([
        "Comment nomme-t-on ce triangle ?",
        "Quel nom peut-on donner à ce triangle ?",
        "Quelle écriture désigne ce triangle ?",
        "Choisis le bon nom pour ce triangle.",
      ])
    : pick([
        `Choisis le nom du triangle de sommets ${X}, ${Y} et ${Z}.`,
        `Un triangle a pour sommets ${X}, ${Y} et ${Z}. Choisis son nom.`,
        `Trouve le nom du triangle de sommets ${X}, ${Y} et ${Z}.`,
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
    text: ctx ? `${intro} ${question}` : question,
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
function genNommerLireNom(ctx = false): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = shuffle([X, Y, Z]).join("");
  const o = objet();
  const P = prenom();
  const W = autreLettre([X, Y, Z]);
  const intro = ctx ? situation(N, o, P) : pick([`Observe le triangle ${N}.`, `Voici le triangle ${N}.`]);
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
      text: `${intro} ${pick(
        ctx
          ? [`Laquelle de ces écritures désigne le même triangle ?`, `${P.nom} veut l’écrire autrement. Quelle écriture convient ?`, `Quel autre nom peut-on lui donner ?`]
          : [`Quel autre nom peut-on lui donner ?`, `Choisis un autre nom pour ce même triangle.`],
      )}`,
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
      text: ctx ? `${intro} Le point ${T} est-il un sommet de ce triangle ?` : `Le point ${T} est-il un sommet du triangle ${N} ?`,
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
    text: `${intro} ${ctx ? pick(["Combien de lettres faut-il pour nommer un triangle ?", "Pour nommer ce triangle, combien de lettres utilise-t-on ?"]) : "Combien de lettres faut-il pour le nommer ?"}`,
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
function triangleEnSituation(ctx = true) {
  const [X, Y, Z] = sommetsTriangle();
  const N = shuffle([X, Y, Z]).join("");
  const o = objet();
  const P = prenom();
  return { X, Y, Z, N, o, P, W: autreLettre([X, Y, Z]), intro: ctx ? situation(N, o, P) : "", canvas: dessinQuelconque(shuffle([X, Y, Z]) as [string, string, string]) };
}
/** L'énoncé : la situation puis la question (★3), ou la question nue seule (★1-★2). */
const enonce = (intro: string, ctx: boolean, avec: string[], sans: string[]) => (ctx ? `${intro} ${pick(avec)}` : pick(sans));
function genSommetCoteCompter(ctx = false): Q {
  const { X, Y, Z, N, W, intro, canvas } = triangleEnSituation(ctx);
  const mode = pick(["compter", "compter", "cotes", "estCote"] as const);
  if (mode === "compter") {
    const quoi = pick(["sommets", "côtés", "angles"]);
    return {
      text: enonce(
        intro,
        ctx,
        [`Combien de ${quoi} a ce triangle ?`, `Combien de ${quoi} compte le triangle ${N} ?`, `Le triangle ${N} a combien de ${quoi} ?`],
        [`Combien de ${quoi} a le triangle ${N} ?`, `Observe le triangle ${N}. Combien de ${quoi} a-t-il ?`, `Compte les ${quoi} du triangle ${N}.`],
      ),
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
      text: enonce(
        intro,
        ctx,
        ["Quels sont les côtés de ce triangle ?", `Quels sont les côtés du triangle ${N} ?`, "Cite les trois côtés de ce triangle."],
        [`Quels sont les côtés du triangle ${N} ?`, `Cite les trois côtés du triangle ${N}.`],
      ),
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
    text: ctx ? `${intro} Le segment ${seg(U, V)} est-il un côté de ce triangle ?` : `Le segment ${seg(U, V)} est-il un côté du triangle ${N} ?`,
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
function genSommetCoteRelier(ctx = false): Q {
  const { X, Y, Z, N, W, intro, canvas } = triangleEnSituation(ctx);
  const [S, U, V] = shuffle([X, Y, Z]);
  const mode = pick(["relie", "extremites", "pasCote"] as const);
  if (mode === "relie") {
    return {
      text: enonce(
        intro,
        ctx,
        [`Quel côté relie les sommets ${U} et ${V} ?`, `Quel côté va de ${U} à ${V} ?`, `Comment s’appelle le côté qui joint ${U} et ${V} ?`],
        [`Dans le triangle ${N}, quel côté relie les sommets ${U} et ${V} ?`, `Quel côté du triangle ${N} va de ${U} à ${V} ?`],
      ),
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
      text: enonce(
        intro,
        ctx,
        [`Quelles sont les extrémités du côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} relie quels sommets ?`],
        [`Dans le triangle ${N}, quelles sont les extrémités du côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} du triangle ${N} relie quels sommets ?`],
      ),
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
    text: enonce(
      intro,
      ctx,
      ["Quel segment n’est PAS un côté de ce triangle ?", `Quel segment n’est PAS un côté du triangle ${N} ?`],
      [`Quel segment n’est PAS un côté du triangle ${N} ?`, `Coche le segment qui n’est PAS un côté du triangle ${N}.`],
    ),
    format: "qcm",
    choices: shuffle([intrus, seg(X, Y), seg(Y, Z), seg(X, Z)]),
    expected: [intrus],
    comparator: "mcq_exact",
    explanation: expl(`Les côtés du triangle ${N} sont ${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}. ${intrus} n’en fait pas partie : ${W} n’est pas un sommet.`),
    canvas,
  };
}
function genSommetCoteOppose(): Q {
  const { X, Y, Z, N, intro, canvas } = triangleEnSituation(true);
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
  "Quel mot le décrit le mieux ?",
  "Choisis le nom le plus précis.",
  "Est-il équilatéral, isocèle ou quelconque ?",
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
function triangleDeNature(n: NatureCotes, o: Objet = objet()) {
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as [string, string, string];
  const [lAB, lBC, lCA] = shuffle(longueurs(o, n));
  return { o, X, Y, Z, noms, lAB, lBC, lCA, pts: pointsParCotes(lAB, lBC, lCA) };
}
function genTypeCoteLongueurs(ctx = false): Q {
  const n = pick(NATURES_COTES);
  const { o, X, Y, Z, noms, lAB, lBC, lCA, pts } = triangleDeNature(n, ctx ? objet() : nu());
  const P = prenom();
  const N = `${X}${Y}${Z}`;
  const u = o.u;
  const [A, B, C] = noms;
  const canvas = figure(pts, noms, { sideLabels: { AB: `${fr(lAB)} ${u}`, BC: `${fr(lBC)} ${u}`, CA: `${fr(lCA)} ${u}` } });
  if (!ctx)
    // ★1 : les longueurs sont écrites sur la figure, l'élève les lit et les compare.
    return {
      text: pick([
        `Observe les longueurs. Le triangle ${N} est-il équilatéral, isocèle ou quelconque ?`,
        `Lis les côtés du triangle ${N}. Quel mot le décrit le mieux ?`,
        `Quelle est la nature la plus précise du triangle ${N} ?`,
      ]),
      format: "qcm",
      choices: shuffle([...NATURES_COTES]),
      expected: [n],
      comparator: "mcq_exact",
      explanation: expl(`On compare les trois longueurs de la figure : ${fr(lAB)} ${u}, ${fr(lBC)} ${u} et ${fr(lCA)} ${u}. ${pourquoiNature(n)}`),
      canvas,
    };
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
    canvas,
  };
}
function genTypeCoteCodages(ctx = false): Q {
  const n = pick(NATURES_COTES);
  const { o, X, Y, Z, noms, lAB, lBC, lCA, pts } = triangleDeNature(n, ctx ? objet() : nu());
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
      text: ctx
        ? `${situation(N, o, P)} ${pick(["Observe les codages de la figure.", "Regarde les petits traits sur les côtés.", `${P.nom} a codé les côtés de même longueur.`])} ${pick(QUESTION_NATURE)}`
        : pick([
            `Observe les codages. Le triangle ${N} est-il équilatéral, isocèle ou quelconque ?`,
            `Lis les codages du triangle ${N}. Quelle est sa nature la plus précise ?`,
          ]),
      format: "qcm",
      choices: shuffle([...NATURES_COTES]),
      expected: [n],
      comparator: "mcq_exact",
      explanation: expl(`Des côtés qui portent le même codage ont la même longueur. ${pourquoiNature(n)}`),
      canvas: figure(pts, noms, { marks: { equalSides: n === "équilatéral" ? [["AB", "BC"], ["BC", "CA"]] : egaux } }),
    };
  }
  // Les égalités écrites en toutes lettres, sans nombre.
  if (!ctx) {
    // ★2 nu : « Dans le triangle N, XY = YZ… », sans « on sait que ».
    const [c1, c2] = egaux[0] ?? ["AB", "BC"];
    const c3 = cotes.find((c) => c !== c1 && c !== c2)!;
    const text =
      n === "équilatéral"
        ? `Dans le triangle ${N}, ${nomCote.AB} = ${nomCote.BC} = ${nomCote.CA}. Quelle est sa nature la plus précise ?`
        : n === "isocèle"
          ? `Dans le triangle ${N}, ${nomCote[c1]} = ${nomCote[c2]} et ${nomCote[c3]} est plus ${l[c3] > l[c1] ? "long" : "court"}. Quelle est sa nature ?`
          : `Les côtés du triangle ${N} ont 3 longueurs différentes. Quelle est sa nature ?`;
    return {
      text,
      format: "qcm",
      choices: shuffle([...NATURES_COTES]),
      expected: [n],
      comparator: "mcq_exact",
      explanation: expl(pourquoiNature(n)),
      canvas: figure(pts, noms),
    };
  }
  const phrase =
    n === "équilatéral"
      ? `On a ${nomCote.AB} = ${nomCote.BC} = ${nomCote.CA}.`
      : n === "isocèle"
        ? (() => {
            const [c1, c2] = egaux[0];
            const c3 = cotes.find((c) => c !== c1 && c !== c2)!;
            return `On a ${nomCote[c1]} = ${nomCote[c2]}, et ${nomCote[c3]} est ${l[c3] > l[c1] ? "plus long" : "plus court"}.`;
          })()
        : `Ses côtés ont 3 longueurs différentes.`;
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
  "Quel est son type ?",
  "Quel est son type selon ses angles ?",
  "Est-il rectangle, obtusangle ou acutangle ?",
];
/** Un triangle d'angles donnés : le plus grand au sommet du haut (C du dessin). */
function triangleAngles(n: NatAngle) {
  const [a, b, g] = anglesDeNature(n);
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as [string, string, string];
  const [angA, angB] = shuffle([a, b]);
  return { a, b, g, X, Y, Z, N: `${X}${Y}${Z}`, noms, angA, angB, pts: pointsParAngles(angA, angB), o: objet(), P: prenom() };
}
function genTypeAngleMesures(ctx = false): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { g, N, noms, angA, angB, pts, o, P } = triangleAngles(n);
  const [A, B, C] = noms;
  const donnees = pick([
    `Ses angles mesurent ${angA}°, ${angB}° et ${g}°.`,
    `${P.nom} mesure ses angles : ${g}°, ${angA}° et ${angB}°.`,
  ]);
  return {
    // ★1 nu : les trois angles sont écrits sur la figure.
    text: ctx
      ? `${situation(N, o, P)} ${donnees} ${pick(QUESTION_ANGLES)}`
      : pick([
          `Observe les angles du triangle ${N}. Quel est son type ?`,
          `Lis les angles. Le triangle ${N} est-il rectangle, obtusangle ou acutangle ?`,
          `Quel est le type du triangle ${N} selon ses angles ?`,
        ]),
    format: "qcm",
    choices: shuffle(Object.values(NAT_ANGLES)),
    expected: [NAT_ANGLES[n]],
    comparator: "mcq_exact",
    explanation: expl(`On regarde le plus grand angle. ${pourquoiAngles(n, g)}`),
    canvas: figure(pts, noms, { angleLabels: { A: `${angA}°`, B: `${angB}°`, C: `${g}°` } }),
  };
}
function genTypeAngleFigure(ctx = false): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { g, N, noms, angA, angB, pts, o, P } = triangleAngles(n);
  const marque = n === "rectangle" && Math.random() < 0.6;
  return {
    text: ctx
      ? `${situation(N, o, P)} ${pick(["Observe la figure.", "Regarde bien la figure.", `${P.nom} a complété la figure.`])} ${pick(QUESTION_ANGLES)}`
      : pick([
          `Observe la figure. Quel est le type du triangle ${N} selon ses angles ?`,
          `Regarde la figure. Le triangle ${N} est-il rectangle, obtusangle ou acutangle ?`,
          `Observe les angles du triangle ${N}. Choisis son type.`,
          `Regarde le triangle ${N}. Quel est son type selon ses angles ?`,
          `Le triangle ${N} est-il rectangle, obtusangle ou acutangle ? Observe la figure.`,
          `Lis la figure. Quel est le type du triangle ${N} ?`,
        ]),
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
function genTypeAngleDeux(ctx = false): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { a, b, g, N, o, P } = triangleAngles(n);
  // On donne deux angles ; le troisième est à retrouver (180° en tout).
  const [d1, d2, cache] = shuffle([a, b, g]);
  return {
    text: ctx
      ? `${situation(N, o, P)} ${pick([
          `Deux de ses angles mesurent ${d1}° et ${d2}°.`,
          `On connaît deux angles : ${d1}° et ${d2}°.`,
        ])} ${pick(QUESTION_ANGLES)}`
      : pick([
          `Dans le triangle ${N}, deux angles mesurent ${d1}° et ${d2}°. Quel est son type ?`,
          `Le triangle ${N} a deux angles de ${d1}° et ${d2}°. Quel est son type ?`,
          `Deux angles du triangle ${N} mesurent ${d1}° et ${d2}°. Choisis son type.`,
          `Le triangle ${N} a un angle de ${d1}° et un de ${d2}°. Choisis son type.`,
          `Un angle du triangle ${N} mesure ${d1}°, un autre ${d2}°. Trouve son type.`,
          `Dans le triangle ${N}, deux angles font ${d1}° et ${d2}°. Choisis son type.`,
        ]),
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
/**
 * ★2 nu : la figure porte les longueurs et, s'il y en a un, le codage de
 * l'angle droit ; l'énoncé ne fait que demander la nature la plus précise.
 * Le sommet particulier (angle droit, sommet principal) est C, en haut.
 */
/** Sans codage, un angle de 84° à 96° se prendrait pour un angle droit : on retire. */
function presqueDroit(x: number, y: number, z: number) {
  const [p, q, r] = [x, y, z].sort((u, v) => u - v);
  const deg = (Math.acos((p * p + q * q - r * r) / (2 * p * q)) * 180) / Math.PI;
  return Math.abs(deg - 90) < 6;
}
function genDefiReconnaissanceNue(): Q {
  const o: Objet = { nom: "", u: "cm", min: 3, max: 12 };
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const noms = shuffle([X, Y, Z]) as [string, string, string];
  const u = o.u;
  const n = pick(NATURES_DEFI);
  const L = (x: number) => `${fr(x)} ${u}`;
  let canvas: TriangleCanvasData;
  let pourquoi: string;
  if (n === "équilatéral") {
    const [a] = longueurs(o, "équilatéral");
    canvas = figure(pointsParCotes(a, a, a), noms, { sideLabels: { AB: L(a), BC: L(a), CA: L(a) } });
    pourquoi = "Ses trois côtés sont égaux : il est équilatéral. Ses trois angles mesurent alors 60°, il ne peut pas être rectangle.";
  } else if (n === "rectangle isocèle") {
    const [a] = longueurs(o, "équilatéral");
    canvas = figure(pointsParAngles(45, 45), noms, { sideLabels: { BC: L(a), CA: L(a) }, marks: { rightAngleAt: "C" } });
    pourquoi = "Il a deux côtés égaux (isocèle) ET un angle droit codé (rectangle) : c’est un triangle rectangle isocèle.";
  } else if (n === "rectangle") {
    const [a, b, c] = pick(TRIPLETS_DROITS.filter((tr) => tr[2] <= 15));
    // BC = a et CA = b se coupent à angle droit en C ; AB = c est le grand côté.
    canvas = figure(pointsParCotes(c, a, b), noms, { sideLabels: { AB: L(c), BC: L(a), CA: L(b) }, marks: { rightAngleAt: "C" } });
    pourquoi = "Il a un angle droit codé, et ses trois côtés sont différents : il est rectangle (mais pas isocèle).";
  } else if (n === "isocèle") {
    let [a, b] = longueurs(o, "isocèle");
    while (presqueDroit(b, a, a)) [a, b] = longueurs(o, "isocèle");
    canvas = figure(pointsParCotes(b, a, a), noms, { sideLabels: { AB: L(b), BC: L(a), CA: L(a) } });
    pourquoi = "Deux côtés seulement sont égaux, et aucun angle droit n’est codé : il est isocèle.";
  } else {
    let [a, b, c] = longueurs(o, "quelconque");
    while (presqueDroit(a, b, c)) [a, b, c] = longueurs(o, "quelconque");
    canvas = figure(pointsParCotes(a, b, c), noms, { sideLabels: { AB: L(a), BC: L(b), CA: L(c) } });
    pourquoi = "Ses trois côtés sont différents, et aucun angle droit n’est codé : il est quelconque.";
  }
  return {
    text: pick([
      `Observe la figure. Quelle est la nature la plus précise du triangle ${N} ?`,
      `Lis la figure. Choisis le nom le plus précis du triangle ${N}.`,
      `Observe la figure. Choisis le nom le plus précis du triangle ${N}.`,
      `Lis la figure. Quelle est la nature la plus précise du triangle ${N} ?`,
      `Regarde la figure. Quel est le nom le plus précis du triangle ${N} ?`,
      `Lis les longueurs. Quel est le nom le plus précis du triangle ${N} ?`,
      `Regarde le dessin. Trouve la nature la plus précise du triangle ${N}.`,
      `Quel est le nom le plus précis du triangle ${N} ? Observe la figure.`,
      `Trouve le nom le plus précis du triangle ${N} sur la figure.`,
    ]),
    format: "qcm",
    choices: quatreDont(n, NATURES_DEFI),
    expected: [n],
    comparator: "mcq_exact",
    explanation: expl(pourquoi),
    canvas,
  };
}
function genDefiReconnaissance(ctx = false): Q {
  if (!ctx) return genDefiReconnaissanceNue();
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
    donnees = `Ses côtés mesurent ${fr(a)} ${u}, ${fr(b)} ${u} et ${fr(c)} ${u}. Il a un angle droit.`;
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
    text: `${situation(N, o, P)} ${donnees} ${pick(["Quelle est sa nature la plus précise ?", "Choisis le nom le plus précis."])}`,
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
function genSommeConnaitre(ctx = false): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { a, b, g, X, Y, Z, N, noms, angA, angB, pts, o, P } = triangleAngles(n);
  const mode = ctx ? pick(["valeur", "addition", "decoupage"] as const) : pick(["valeur", "addition"] as const);
  if (!ctx && mode === "addition")
    // ★1 nu : les trois angles sont écrits sur la figure, on les additionne.
    return {
      text: pick([`Calcule la somme des angles du triangle ${N}.`, `Additionne les angles du triangle ${N}. Que trouves-tu ?`, `Trouve la somme des angles du triangle ${N}.`, `Ajoute les 3 angles du triangle ${N}.`]),
      format: "short",
      expected: ["180°"],
      comparator: "number_equal",
      explanation: expl(`${angA} + ${angB} + ${g} = 180. On retrouve 180°, comme dans tous les triangles.`),
      canvas: figure(pts, noms, { angleLabels: { A: `${angA}°`, B: `${angB}°`, C: `${g}°` } }),
    };
  if (mode === "valeur") {
    return {
      text: enonce(
        situation(N, o, P),
        ctx,
        [`Que vaut la somme des angles de ce triangle ?`, `Additionne les angles en ${X}, en ${Y} et en ${Z}. Que trouves-tu ?`, `Combien font ses trois angles réunis ?`],
        [`Quelle est la somme des angles du triangle ${N} ?`, `Que vaut la somme des 3 angles du triangle ${N} ?`, `Combien font les 3 angles du triangle ${N} ?`, `Donne la somme des angles du triangle ${N}.`],
      ),
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
    text: `${P.nom} découpe ${o.nom} en papier. ${P.f ? "Elle" : "Il"} colle ses 3 coins côte à côte, pointes réunies. ${pick(["Quel angle obtient-on ?", `Quel angle forment les 3 coins ?`])}`,
    format: "qcm",
    choices: shuffle([juste, "un angle droit (90°)", "un tour complet (360°)", "un angle de 270°"]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl("Les trois coins sont les trois angles du triangle. Mis côte à côte, ils forment un angle plat : leur somme vaut 180°."),
  };
}
function genSommeDeuxAutres(ctx = false): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { angA, angB, g, N, noms, pts, o, P } = triangleAngles(n);
  // L'angle connu est celui du sommet S, sur la figure comme dans le texte.
  const k = randomInt(0, 2);
  const S = noms[k];
  const connu = [angA, angB, g][k];
  const reste = 180 - connu;
  return {
    text: ctx
      ? `${situation(N, o, P)} L’angle en ${S} mesure ${connu}°. ${pick([
          "Quelle est la somme des deux autres angles ?",
          "Combien mesurent les deux autres angles réunis ?",
          "Calcule la somme des deux angles restants.",
        ])}`
      : pick([
          `Dans le triangle ${N}, l’angle en ${S} mesure ${connu}°. Combien font les deux autres angles ?`,
          `Dans le triangle ${N}, ${chapeau(S)} = ${connu}°. Calcule la somme des deux autres angles.`,
          `Dans le triangle ${N}, l’angle en ${S} mesure ${connu}°. Calcule la somme des deux autres.`,
          `Dans le triangle ${N}, ${chapeau(S)} = ${connu}°. Combien font les deux autres angles ?`,
          `Dans le triangle ${N}, ${chapeau(S)} = ${connu}°. Que vaut la somme des deux autres ?`,
          `Dans le triangle ${N}, l’angle en ${S} mesure ${connu}°. Que reste-t-il pour les deux autres ?`,
        ]),
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
    `L’angle en ${U} mesure ${a}°. L’angle en ${V} mesure ${b}°.`,
  ]);
}
/**
 * ★2 nu : « Dans le triangle CMS, Ĉ = 61° et M̂ = 50°. Calcule l'angle en S. »,
 * ou la figure seule (deux angles écrits, « ? » sur le troisième). La figure
 * est toujours là : elle est fidèle aux mesures et remplace la lecture.
 */
function angleManquantNu(t: ReturnType<typeof angleManquant>) {
  const { N, noms, angA, angB, g, pts, vals, cache, U, V } = t;
  const lab: Record<"A" | "B" | "C", string> = { A: `${angA}°`, B: `${angB}°`, C: `${g}°` };
  lab[(["A", "B", "C"] as const)[noms.indexOf(cache)]] = "?";
  const text =
    Math.random() < 0.6
      ? `Dans le triangle ${N}, ${chapeau(U)} = ${vals[U]}° et ${chapeau(V)} = ${vals[V]}°. ${pick([`Calcule l’angle en ${cache}.`, `Trouve l’angle en ${cache}.`, `Combien mesure l’angle en ${cache} ?`, `Écris l’angle en ${cache}.`, `Quelle est la mesure de ${chapeau(cache)} ?`, `Calcule ${chapeau(cache)}.`, `Trouve ${chapeau(cache)}.`])}`
      : pick([
          `Observe la figure. Calcule l’angle en ${cache} du triangle ${N}.`,
          `Lis la figure. Combien mesure l’angle en ${cache} du triangle ${N} ?`,
          `Regarde la figure. Trouve l’angle en ${cache} du triangle ${N}.`,
          `Lis la figure. Quelle est la mesure de ${chapeau(cache)} dans le triangle ${N} ?`,
          `Observe le triangle ${N}. Calcule l’angle marqué « ? ».`,
          `Regarde le triangle ${N}. Quel angle cache le « ? » ?`,
        ]);
  return { text, canvas: figure(pts, noms, { angleLabels: lab }) };
}
function genAngleManquantQcm(ctx = false): Q {
  const t = angleManquant();
  const { N, o, P, vals, cache, U, V, rep } = t;
  const a = vals[U];
  const b = vals[V];
  const pieges = [180 - a, 180 - b, a + b, 90 - Math.min(a, b), rep + 10, rep - 10].filter((x) => x > 0 && x < 180 && x !== rep);
  return {
    ...(ctx
      ? { text: `${situation(N, o, P)} ${donneesDeuxAngles(U, V, a, b, P)} ${pick([`Combien mesure l’angle en ${cache} ?`, `Trouve l’angle en ${cache}.`])}` }
      : angleManquantNu(t)),
    format: "qcm",
    choices: shuffle([`${rep}°`, ...shuffle([...new Set(pieges)]).slice(0, 3).map((x) => `${x}°`)]),
    expected: [`${rep}°`],
    comparator: "mcq_exact",
    explanation: expl(`Les trois angles font 180° en tout. L’angle en ${cache} mesure 180 − ${a} − ${b} = ${rep}°.`),
  };
}
function genAngleManquantCourt(ctx = false): Q {
  const t = angleManquant();
  const { N, o, P, vals, cache, U, V, rep } = t;
  const a = vals[U];
  const b = vals[V];
  return {
    ...(ctx
      ? { text: `${situation(N, o, P)} ${donneesDeuxAngles(U, V, a, b, P)} ${pick([`Calcule l’angle en ${cache}.`, `Combien mesure l’angle en ${cache} ?`, `Quel est le troisième angle ?`])}` }
      : angleManquantNu(t)),
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
/** ★2 nu : trois longueurs, sans baguette ni bambou. */
const MATERIAUX_NUS: Materiau[] = [
  { nom: "", u: "cm", min: 2, max: 15, demi: false },
  { nom: "", u: "cm", min: 2, max: 12, demi: false },
  { nom: "", u: "m", min: 1, max: 9, demi: false },
];
function genPossibleSimple(ctx = false): Q {
  const m = pick(ctx ? MATERIAUX : MATERIAUX_NUS);
  const cas = pick(["possible", "impossible"] as const);
  const ls = troisLongueurs(m, cas, 0.2);
  const [a, b, c] = ls.map((x) => `${fr(x)} ${m.u}`);
  return {
    text: ctx
      ? questionPossible(m, ls)
      : pick([
          `Peut-on construire un triangle de côtés ${a}, ${b} et ${c} ?`,
          `Existe-t-il un triangle de côtés ${a}, ${b} et ${c} ?`,
          `Un triangle peut-il avoir des côtés de ${a}, ${b} et ${c} ?`,
          `Ces longueurs forment-elles un triangle : ${a}, ${b} et ${c} ?`,
          `${a}, ${b} et ${c} : ces côtés forment-ils un triangle ?`,
          `Un triangle a des côtés de ${a}, ${b} et ${c}. Est-ce possible ?`,
          `Essaie : ${a}, ${b} et ${c}. Peut-on fermer le triangle ?`,
        ]),
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
function genDefiAnglesPossibles(ctx = false): Q {
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
    text: pick(
      ctx
        ? [
            `${P.nom} dit avoir dessiné ${o.nom} en forme de triangle, avec des angles de ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
            `Sur le cahier ${de(P.nom)}, un triangle a des angles de ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
            `${P.nom} mesure les angles d’un triangle : ${a}°, ${b}° et ${c}°. Ces mesures sont-elles possibles ?`,
            `${cap(o.nom)} a la forme d’un triangle. ${P.nom} annonce des angles de ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
          ]
        : [
            `Un triangle peut-il avoir des angles de ${a}°, ${b}° et ${c}° ?`,
            `Existe-t-il un triangle d’angles ${a}°, ${b}° et ${c}° ?`,
            `Trois angles mesurent ${a}°, ${b}° et ${c}°. Est-ce un triangle possible ?`,
            `Les angles d’un triangle font ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
            `Ces angles forment-ils un triangle : ${a}°, ${b}° et ${c}° ?`,
            `Peut-on tracer un triangle d’angles ${a}°, ${b}° et ${c}° ?`,
            `Voici 3 angles : ${a}°, ${b}° et ${c}°. Forment-ils un triangle ?`,
            `Un triangle d’angles ${a}°, ${b}° et ${c}° existe-t-il ?`,
          ],
    ),
    format: "qcm",
    choices: shuffle(["oui", "non"]),
    expected: [s === 180 ? "oui" : "non"],
    comparator: "mcq_exact",
    explanation: expl(`${a} + ${b} + ${c} = ${s}. ${s === 180 ? "On trouve 180° : c’est possible." : "Ce n’est pas 180° : ce triangle n’existe pas (ou les mesures sont fausses)."}`),
  };
}
function genDefiDeuxAngles(ctx = false): Q {
  const P = prenom();
  const [a, b] = pick([
    [90, 90], [90, randomInt(91, 130)], [randomInt(91, 120), randomInt(91, 120)], [90, randomInt(20, 80)],
    [randomInt(100, 150), randomInt(10, 170 - 100)], [randomInt(60, 89), randomInt(60, 89)], [randomInt(95, 120), randomInt(61, 90)],
  ]);
  const ok = a + b < 180;
  const nomAngle = (x: number) => (x === 90 ? "un angle droit" : x > 90 ? `un angle obtus de ${x}°` : `un angle de ${x}°`);
  // « un angle droit et un angle droit » se dit « deux angles droits ».
  const deux = a === 90 && b === 90 ? "deux angles droits" : `${nomAngle(a)} et ${nomAngle(b)}`;
  return {
    text: pick(
      ctx
        ? [
            `${P.nom} se demande si un triangle peut avoir ${deux}. Est-ce possible ?`,
            `${P.nom} veut dessiner un triangle avec ${deux}. Est-ce possible ?`,
            `${P.nom} affirme avoir tracé un triangle avec ${deux}. Est-ce possible ?`,
          ]
        : [`Un triangle peut-il avoir ${deux} ?`, `Existe-t-il un triangle avec ${deux} ?`],
    ),
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

// =====================================================================
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT, le contrôle ne le voyait pas : il
// comptait un énoncé comme neuf dès qu'une LETTRE de sommet changeait. Lettres
// et nombres neutralisés (scripts/mesurer-squelettes-coach.ts --lettres), on
// mesurait 8 à 17 répétitions de phrase sur 20. Pour tomber à 4 au plus, il faut
// une quarantaine de phrases à peu près équiprobables par étoile : chaque gabarit
// ci-dessous pose la question de plusieurs FAÇONS (lire la figure, trouver la
// lettre qui manque, l'intrus, vrai/faux, compléter, nombre à trouver, prendre la
// question par l'autre bout), chaque façon avec plusieurs tournures.
// ★1 : 12 mots au plus. ★2 : 15 mots au plus. Aucun prénom, aucun objet, aucune
// situation (../REGLES-6E.md). Une figure ne donne jamais la réponse d'un calcul
// et ne contredit jamais l'énoncé. Correcteurs : correcteurs/triangles.ts.
// =====================================================================
type Noms = [string, string, string];
type CoteFig = "AB" | "BC" | "CA";
const voir = () => pick(["Observe la figure.", "Regarde la figure.", "Lis la figure."]);
function qcm(text: string, juste: string, faux: string[], calcul: string, canvas?: TriangleCanvasData): Q {
  return { text, format: "qcm", choices: shuffle([juste, ...faux]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}) };
}
function court(text: string, juste: string, calcul: string, canvas?: TriangleCanvasData): Q {
  return { text, format: "short", expected: [juste], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}) };
}
/** Réponse courte en lettres : toutes les écritures justes sont acceptées. */
function courtLettres(text: string, justes: string[], calcul: string, canvas?: TriangleCanvasData): Q {
  return { text, format: "short", expected: justes, comparator: "exact_text", explanation: expl(calcul), ...(canvas ? { canvas } : {}) };
}
const ouiNon = (text: string, oui: boolean, calcul: string, canvas?: TriangleCanvasData) => qcm(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
const vraiFaux = (text: string, vrai: boolean, calcul: string, canvas?: TriangleCanvasData) => qcm(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul, canvas);
const permutations = (x: string, y: string, z: string) => [x + y + z, x + z + y, y + x + z, y + z + x, z + x + y, z + y + x];
/** Trois sommets, deux lettres étrangères et une figure quelconque aux mêmes noms. */
function troisSommets() {
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as Noms;
  const W = autreLettre([X, Y, Z]);
  const W2 = autreLettre([X, Y, Z, W]);
  const W3 = autreLettre([X, Y, Z, W, W2]);
  return { X, Y, Z, W, W2, W3, noms, N: noms.join(""), canvas: dessinQuelconque(noms) };
}

// ----- TRIANGLE_NOMMER, ★1
function genNommerLire(): Q {
  const { X, Y, Z, W, canvas } = troisSommets();
  const perms = permutations(X, Y, Z);
  const pourquoi = `Un triangle se nomme avec ses 3 sommets, dans n’importe quel ordre : ${X}, ${Y} et ${Z}.`;
  const mode = pick(["ecrire", "choisir", "sommets"] as const);
  if (mode === "ecrire")
    return courtLettres(
      `${voir()} ${pick(["Écris le nom de ce triangle.", "Écris le nom du triangle tracé.", "Comment s’appelle ce triangle ?", "Donne le nom de ce triangle."])}`,
      [...perms, ...perms.map((p) => `triangle ${p}`)],
      pourquoi,
      canvas,
    );
  if (mode === "choisir")
    return qcm(
      `${voir()} ${pick(["Choisis le nom de ce triangle.", "Quel nom convient à ce triangle ?", "Quel est le bon nom de ce triangle ?", "Coche le nom de ce triangle."])}`,
      `triangle ${pick(perms)}`,
      [`triangle ${X}${Y}`, `triangle ${X}${Y}${W}`, `segment ${seg(X, Y)}`],
      pourquoi,
      canvas,
    );
  return qcm(
    `${voir()} ${pick(["Quels sont les sommets de ce triangle ?", "Cite les sommets de ce triangle.", "Choisis les trois sommets de ce triangle."])}`,
    `${X}, ${Y} et ${Z}`,
    [`${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}`, `${X} et ${Y}`, `${X}, ${Y}, ${Z} et ${W}`],
    `Les sommets sont les trois points du triangle : ${X}, ${Y} et ${Z}. Les crochets désignent des côtés.`,
    canvas,
  );
}
function genNommerLettre(): Q {
  const { X, Y, Z, W, N, canvas } = troisSommets();
  const mode = pick(["manque", "manque", "trop", "combien", "intrus"] as const);
  if (mode === "manque") {
    const [p, q, r] = shuffle([X, Y, Z]);
    const d = `${p}${q}`;
    return qcm(
      pick([
        `Complète le nom : « triangle ${d}… ».`,
        `Le nom « triangle ${d}… » est incomplet. Quelle lettre manque ?`,
        `Quelle lettre manque dans « triangle ${d}… » ?`,
        `Termine le nom : « triangle ${d}… ».`,
        `Observe la figure. Complète : « triangle ${d}… ».`,
      ]),
      r,
      [p, W],
      `Le triangle a trois sommets : ${X}, ${Y} et ${Z}. Le nom contient déjà ${p} et ${q} : il manque ${r}.`,
      canvas,
    );
  }
  if (mode === "trop") {
    const n = shuffle([X, Y, Z, W]).join("");
    return qcm(
      pick([
        `Quelle lettre est en trop dans « triangle ${n} » ?`,
        `Une lettre est en trop : « triangle ${n} ». Laquelle ?`,
        `Observe la figure. Quelle lettre retirer de « triangle ${n} » ?`,
        `Barre la lettre en trop : « triangle ${n} ».`,
      ]),
      W,
      [X, Y, Z],
      `Le nom d’un triangle a 3 lettres, ses 3 sommets. Sur la figure, ${W} n’est pas un sommet.`,
      canvas,
    );
  }
  if (mode === "combien")
    return qcm(
      pick(["Combien de lettres faut-il pour nommer un triangle ?", "Un nom de triangle a combien de lettres ?", "Combien de lettres compte le nom d’un triangle ?"]),
      "3",
      ["2", "4", "6"],
      `Un triangle a 3 sommets, donc 3 lettres, comme « triangle ${N} ».`,
      canvas,
    );
  return qcm(
    pick([`Quel point n’est pas un sommet du triangle ${N} ?`, "Trouve l’intrus : quel point n’est pas un sommet ?", "Trouve le point qui n’est pas un sommet."]),
    W,
    [X, Y, Z],
    `Les sommets du triangle sont ${X}, ${Y} et ${Z}. ${W} n’en fait pas partie.`,
    canvas,
  );
}
function genNommerOuiNon(): Q {
  const { X, Y, Z, W, N, canvas } = troisSommets();
  const mode = pick(["sommet", "nom", "meme", "designe", "designe"] as const);
  const oui = Math.random() < 0.5;
  if (mode === "sommet") {
    const T = oui ? pick([X, Y, Z]) : W;
    return ouiNon(
      pick([`Le point ${T} est-il un sommet du triangle ${N} ?`, `${T} est-il un sommet du triangle ${N} ?`, `Le triangle ${N} a-t-il un sommet ${T} ?`, `${T} fait-il partie des sommets du triangle ${N} ?`]),
      oui,
      `Les sommets du triangle ${N} sont les trois lettres de son nom : ${X}, ${Y} et ${Z}.`,
      canvas,
    );
  }
  if (mode === "nom") {
    const C = oui ? `triangle ${pick(permutations(X, Y, Z))}` : pick([`triangle ${X}${Y}${W}`, `triangle ${Y}${Z}`, `triangle ${X}${Z}`]);
    return ouiNon(
      pick([`« ${C} » est-il un nom de ce triangle ?`, `Peut-on appeler ce triangle « ${C} » ?`, `Ce triangle s’appelle-t-il « ${C} » ?`, `Observe la figure. « ${C} » convient-il ?`]),
      oui,
      `Le nom doit contenir les 3 sommets ${X}, ${Y} et ${Z}, et eux seuls, dans n’importe quel ordre.`,
      canvas,
    );
  }
  if (mode === "meme") {
    const autre = oui ? pick(permutations(X, Y, Z).filter((p) => p !== N)) : shuffle([X, Y, W]).join("");
    return ouiNon(
      pick([
        `« triangle ${N} » et « triangle ${autre} » : est-ce le même triangle ?`,
        `« triangle ${N} » et « triangle ${autre} » désignent-ils le même triangle ?`,
        `Est-ce le même triangle : « triangle ${N} » et « triangle ${autre} » ?`,
      ]),
      oui,
      oui ? "Mêmes lettres dans un autre ordre : c’est le même triangle." : "Une lettre change : ce n’est plus le même sommet, donc plus le même triangle.",
    );
  }
  const cas = pick([
    { e: seg(X, Y), r: "un côté", p: "Deux lettres entre crochets désignent un côté." },
    { e: X, r: "un sommet", p: "Une lettre seule désigne un point : ici, un sommet." },
    { e: `triangle ${N}`, r: "le triangle", p: "Trois lettres désignent le triangle tout entier." },
  ]);
  return qcm(
    pick([`Que désigne « ${cas.e} » ?`, `Que veut dire « ${cas.e} » ?`, `Sur cette figure, que désigne « ${cas.e} » ?`]),
    cas.r,
    ["un sommet", "un côté", "le triangle"].filter((c) => c !== cas.r),
    cas.p,
    canvas,
  );
}

// ----- TRIANGLE_NOMMER, ★2
function genNommerEcritures(): Q {
  const { X, Y, Z, W, N, canvas } = troisSommets();
  const perms = permutations(X, Y, Z);
  const autres = perms.filter((p) => p !== N);
  const mode = pick(["facons", "meme", "meme", "autre", "commence", "ecrisDebut"] as const);
  const ordre = `On peut écrire les 3 lettres dans n’importe quel ordre : ${perms.join(", ")}.`;
  if (mode === "facons")
    return qcm(
      pick([`De combien de façons peut-on écrire le nom du triangle ${N} ?`, `Le triangle ${N} a combien de noms possibles ?`, `Combien d’ordres de lettres sont possibles pour le triangle ${N} ?`]),
      "6",
      ["1", "3", "9"],
      `${ordre} Cela fait 6 écritures.`,
      canvas,
    );
  if (mode === "meme")
    return qcm(
      pick([
        `Quelle écriture désigne le même triangle que « triangle ${N} » ?`,
        `Choisis un autre nom pour le triangle ${N}.`,
        `Quel autre nom peut-on donner au triangle ${N} ?`,
        `Le triangle ${N} s’écrit aussi comment ?`,
      ]),
      `triangle ${pick(autres)}`,
      [`triangle ${X}${Y}${W}`, `triangle ${W}${Y}${Z}`, `triangle ${Y}${Z}`],
      ordre,
      canvas,
    );
  if (mode === "autre") {
    const liste = shuffle(autres);
    return courtLettres(
      pick([`Écris un autre nom pour le triangle ${N}.`, `Change l’ordre des lettres : écris un autre nom du triangle ${N}.`, `Donne un autre nom du triangle ${N}.`]),
      [...liste, ...liste.map((p) => `triangle ${p}`)],
      ordre,
      canvas,
    );
  }
  if (mode === "commence") {
    const D = pick([X, Y, Z]);
    return qcm(
      pick([`Combien de noms du triangle ${N} commencent par ${D} ?`, `Un nom du triangle ${N} commence par ${D}. Combien de noms sont possibles ?`]),
      "2",
      ["1", "3", "6"],
      `${perms.filter((p) => p[0] === D).join(" et ")} : deux noms commencent par ${D}.`,
      canvas,
    );
  }
  const D = pick([X, Y, Z]);
  const bons = perms.filter((p) => p[0] === D);
  return courtLettres(
    pick([`Écris un nom du triangle ${N} qui commence par ${D}.`, `Un nom du triangle ${N} commence par ${D}. Écris-le.`, `Commence par ${D} : écris un nom du triangle ${N}.`]),
    [...bons, ...bons.map((p) => `triangle ${p}`)],
    `${bons.join(" et ")} commencent par ${D}.`,
    canvas,
  );
}
function genNommerIntrus(): Q {
  const { X, Y, Z, W, canvas } = troisSommets();
  const trois = shuffle(permutations(X, Y, Z)).slice(0, 3).map((p) => `triangle ${p}`);
  const mode = pick(["intrus", "double", "corrige"] as const);
  if (mode === "intrus")
    return qcm(
      `${pick(["Trois noms désignent ce triangle. Trouve l’intrus.", "Quel nom ne convient pas à ce triangle ?", "Trouve le nom faux pour ce triangle.", "Observe la figure. Quel nom est faux ?"])}`,
      `triangle ${shuffle([X, Y, W]).join("")}`,
      trois,
      `Les sommets sont ${X}, ${Y} et ${Z}. Le point ${W} n’est pas un sommet.`,
      canvas,
    );
  if (mode === "double") {
    const [p, q] = shuffle([X, Y, Z]);
    return qcm(
      pick(["Un seul nom est mal écrit. Lequel ?", "Quel nom de ce triangle est mal écrit ?", "Trouve l’écriture fausse pour ce triangle."]),
      `triangle ${p}${q}${q}`,
      trois,
      "Un triangle a 3 sommets différents : une lettre ne peut pas revenir deux fois dans son nom.",
      canvas,
    );
  }
  const [p, q, r] = shuffle([X, Y, Z]);
  const faux = `${p}${q}${q}`;
  return qcm(
    pick([
      `Le nom « triangle ${faux} » est faux : une lettre revient deux fois. Quelle lettre manque ?`,
      `Le nom « triangle ${faux} » est faux. Quelle lettre manque ?`,
      `Dans « triangle ${faux} », quel sommet est oublié ?`,
    ]),
    r,
    [p, q, W],
    `Les sommets sont ${X}, ${Y} et ${Z}. Dans « ${faux} », le sommet ${r} est oublié.`,
    canvas,
  );
}
function genNommerParCotes(): Q {
  const { X, Y, Z, W, W2, W3, N } = troisSommets();
  const perms = permutations(X, Y, Z);
  const [a, b, c] = shuffle([seg(X, Y), seg(Y, Z), seg(X, Z)]);
  const [U, V, S] = shuffle([X, Y, Z]);
  const mode = pick(["cotes", "coteSommet", "appartient"] as const);
  if (mode === "cotes")
    return courtLettres(
      pick([`Les côtés sont ${a}, ${b} et ${c}. Écris le nom du triangle.`, `Un triangle a pour côtés ${a}, ${b} et ${c}. Écris son nom.`, `Écris le nom du triangle de côtés ${a}, ${b} et ${c}.`]),
      [...perms, ...perms.map((p) => `triangle ${p}`)],
      `Les lettres des côtés sont ${X}, ${Y} et ${Z} : ce sont les trois sommets.`,
    );
  const juste = `triangle ${N}`;
  if (mode === "coteSommet")
    return qcm(
      pick([`Un triangle a le côté ${seg(U, V)} et le sommet ${S}. Choisis son nom.`, `Le côté ${seg(U, V)} et le sommet ${S} forment quel triangle ?`, `Quel triangle a le côté ${seg(U, V)} et le sommet ${S} ?`]),
      juste,
      [`triangle ${U}${V}${W}`, `triangle ${U}${S}${W}`, `triangle ${V}${S}${W}`],
      `Le côté ${seg(U, V)} donne les sommets ${U} et ${V}. Avec ${S}, le triangle a pour sommets ${X}, ${Y} et ${Z}.`,
    );
  return qcm(
    pick([`Quel triangle a pour côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} appartient à quel triangle ?`, `Trouve le triangle qui a le côté ${seg(U, V)}.`]),
    juste,
    [`triangle ${U}${S}${W}`, `triangle ${V}${S}${W}`, `triangle ${S}${W}${W2}`, `triangle ${U}${W2}${W3}`].slice(0, 3),
    `Le côté ${seg(U, V)} relie ${U} et ${V} : les deux lettres doivent être dans le nom du triangle.`,
  );
}

function genNommerSommets2(): Q {
  const { X, Y, Z, W, W2, N, canvas } = troisSommets();
  const [p, q, r] = shuffle([X, Y, Z]);
  const mode = pick(["troisieme", "ouiNon", "ouiNon", "choisir", "alpha"] as const);
  if (mode === "troisieme")
    return qcm(
      pick([`Deux sommets du triangle ${N} sont ${p} et ${q}. Quel est le troisième ?`, `Le triangle ${N} a les sommets ${p} et ${q}. Quel sommet reste-t-il ?`, `Dans le triangle ${N}, ${p} et ${q} sont des sommets. Trouve l’autre.`]),
      r,
      [p, W, W2],
      `Les trois lettres du nom sont les trois sommets : il reste ${r}.`,
    );
  if (mode === "ouiNon") {
    const oui = Math.random() < 0.5;
    const T = oui ? r : W;
    return ouiNon(
      pick([`D’après son nom, le triangle ${N} a-t-il le sommet ${T} ?`, `Sans figure : ${T} est-il un sommet du triangle ${N} ?`, `Lis le nom du triangle ${N}. ${T} en est-il un sommet ?`]),
      oui,
      `Les sommets du triangle ${N} sont les trois lettres de son nom.`,
    );
  }
  if (mode === "choisir")
    return qcm(
      pick([`Quel triangle a pour sommets ${p}, ${q} et ${r} ?`, `Les sommets sont ${p}, ${q} et ${r}. Quel est ce triangle ?`, `${p}, ${q} et ${r} sont les sommets de quel triangle ?`]),
      `triangle ${N}`,
      [`triangle ${p}${q}`, `triangle ${p}${q}${W}`, `triangle ${q}${r}${W}`],
      "Le nom du triangle contient ses trois sommets, et eux seuls.",
    );
  const alpha = `${X}${Y}${Z}`;
  if (N === alpha) return genNommerSommets2(); // déjà rangé : rien à faire.
  return courtLettres(
    pick([`Écris le nom du triangle ${N} avec ses lettres rangées dans l’ordre de l’alphabet.`, `Range les lettres du triangle ${N} dans l’ordre de l’alphabet.`, `Dans l’ordre de l’alphabet, comment s’écrit le triangle ${N} ?`]),
    [alpha, `triangle ${alpha}`],
    `Rangées dans l’ordre de l’alphabet, les lettres donnent ${alpha}.`,
    canvas,
  );
}

// ----- TRIANGLE_SOMMET_COTE, ★1
function genSommetLire(): Q {
  const { X, Y, Z, W, W2, W3, canvas } = troisSommets();
  const cotes = `${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}`;
  const mode = pick(["sommets", "cotes", "unCote", "unSommet"] as const);
  if (mode === "sommets")
    return qcm(
      `${voir()} ${pick(["Quels sont les sommets de ce triangle ?", "Choisis les 3 sommets de ce triangle.", "Cite les sommets du triangle."])}`,
      `${X}, ${Y} et ${Z}`,
      [cotes, `${X} et ${Y}`, `${X}, ${Y}, ${Z} et ${W}`],
      `Les sommets sont les trois points : ${X}, ${Y} et ${Z}.`,
      canvas,
    );
  if (mode === "cotes")
    return qcm(
      `${voir()} ${pick(["Quels sont les côtés de ce triangle ?", "Choisis les 3 côtés de ce triangle.", "Cite les côtés du triangle."])}`,
      cotes,
      [`${X}, ${Y} et ${Z}`, `${seg(X, Y)} et ${seg(Y, Z)}`, `${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, W)}`],
      `Un côté relie deux sommets : ${cotes}.`,
      canvas,
    );
  if (mode === "unCote") {
    const [p, q] = shuffle([X, Y, Z]);
    return qcm(
      `${voir()} ${pick(["Quel segment est un côté du triangle ?", "Choisis un côté de ce triangle.", "Trouve un côté de ce triangle."])}`,
      seg(p, q),
      [seg(p, W), seg(q, W), seg(W, W2)],
      `${seg(p, q)} relie deux sommets du triangle. ${W} n’est pas un sommet.`,
      canvas,
    );
  }
  const S = pick([X, Y, Z]);
  return qcm(
    `${voir()} ${pick(["Quel point est un sommet du triangle ?", "Choisis un sommet de ce triangle.", "Trouve un sommet de ce triangle."])}`,
    S,
    [W, W2, W3],
    `Les sommets sont les points du triangle : ${X}, ${Y} et ${Z}.`,
    canvas,
  );
}
function genSommetMots(): Q {
  const { X, Y, Z, canvas } = troisSommets();
  const [S, U, V] = shuffle([X, Y, Z]);
  const mode = pick(["motCote", "motSommet", "partent", "extremites", "compter"] as const);
  if (mode === "motCote")
    return qcm(
      pick([`Sur la figure, ${seg(U, V)} est-il un sommet ou un côté ?`, `${seg(U, V)} est-il un sommet ou un côté ?`, `Dans ce triangle, ${seg(U, V)} est un sommet ou un côté ?`, `Choisis le bon mot pour ${seg(U, V)}.`]),
      "un côté",
      ["un sommet"],
      "Deux lettres entre crochets désignent un segment : c’est un côté.",
      canvas,
    );
  if (mode === "motSommet")
    return qcm(
      pick([`Sur la figure, ${S} est-il un sommet ou un côté ?`, `${S} est-il un sommet ou un côté ?`, `Dans ce triangle, ${S} est un sommet ou un côté ?`, `Choisis le bon mot pour ${S}.`]),
      "un sommet",
      ["un côté"],
      "Une seule lettre désigne un point : c’est un sommet.",
      canvas,
    );
  if (mode === "partent")
    return qcm(
      pick([`Combien de côtés partent du sommet ${S} ?`, `Combien de côtés touchent le sommet ${S} ?`, `Au sommet ${S}, combien de côtés se rejoignent ?`, `Compte les côtés qui arrivent en ${S}.`]),
      "2",
      ["1", "3", "4"],
      `${seg(S, U)} et ${seg(S, V)} partent de ${S} : 2 côtés.`,
      canvas,
    );
  if (mode === "extremites")
    return qcm(
      pick([`Combien d’extrémités a le côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} relie combien de sommets ?`, `Combien de sommets touche le côté ${seg(U, V)} ?`]),
      "2",
      ["1", "3", "4"],
      `${seg(U, V)} va de ${U} à ${V} : il relie 2 sommets.`,
      canvas,
    );
  const quoi = pick(["sommets", "côtés", "angles"]);
  return qcm(
    `${voir()} ${pick([`Compte les ${quoi} du triangle.`, `Combien de ${quoi} vois-tu ?`, `Ce triangle a combien de ${quoi} ?`])}`,
    "3",
    ["2", "4", "6"],
    `Un triangle a 3 sommets, 3 côtés et 3 angles.`,
    canvas,
  );
}
function genSommetOuiNon(): Q {
  const { X, Y, Z, W, N, canvas } = troisSommets();
  const oui = Math.random() < 0.5;
  const mode = pick(["sommet", "cote", "relie", "relie"] as const);
  if (mode === "sommet") {
    const T = oui ? pick([X, Y, Z]) : W;
    return ouiNon(
      pick([`${T} est-il un sommet de ce triangle ?`, `Ce triangle a-t-il un sommet ${T} ?`, `Observe la figure. ${T} est-il un sommet ?`, `Le point ${T} est-il sur la figure ?`]),
      oui,
      `Les sommets sont ${X}, ${Y} et ${Z}.`,
      canvas,
    );
  }
  if (mode === "cote") {
    const [p, q] = shuffle([X, Y, Z]);
    const C = oui ? seg(p, q) : seg(p, W);
    return ouiNon(
      pick([`${C} est-il un côté du triangle ${N} ?`, `Le triangle ${N} a-t-il le côté ${C} ?`, `Observe la figure. ${C} est-il un côté ?`, `${C} fait-il partie des côtés de ce triangle ?`]),
      oui,
      `Les côtés sont ${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}.`,
      canvas,
    );
  }
  const [S, U, V] = shuffle([X, Y, Z]);
  return qcm(
    pick([`Quel côté relie ${U} et ${V} ?`, `Quel côté va de ${U} à ${V} ?`, `Choisis le côté qui joint ${U} et ${V}.`, `Observe la figure. Quel côté relie ${U} et ${V} ?`]),
    seg(U, V),
    [seg(S, U), seg(S, V)],
    `Le côté qui relie ${U} et ${V} porte ces deux lettres : ${seg(U, V)}.`,
    canvas,
  );
}

// ----- TRIANGLE_SOMMET_COTE, ★2
function genSommetOpposes(): Q {
  const { X, Y, Z, canvas } = troisSommets();
  const [S, U, V] = shuffle([X, Y, Z]);
  const mode = pick(["cote", "sommet", "vf"] as const);
  const p = `${seg(S, U)} et ${seg(S, V)} partent de ${S}. Le côté ${seg(U, V)} ne touche pas ${S} : il lui est opposé.`;
  if (mode === "cote")
    return qcm(
      pick([`Quel côté est opposé au sommet ${S} ?`, `Quel côté se trouve en face du sommet ${S} ?`, `Dans ce triangle, quel côté ne touche pas ${S} ?`, `Trouve le côté en face de ${S}.`]),
      seg(U, V),
      [seg(S, U), seg(S, V)],
      p,
      canvas,
    );
  if (mode === "sommet")
    return qcm(
      pick([`Quel sommet est opposé au côté ${seg(U, V)} ?`, `Quel sommet se trouve en face du côté ${seg(U, V)} ?`, `Quel sommet ne touche pas ${seg(U, V)} ?`, `Trouve le sommet en face de ${seg(U, V)}.`]),
      S,
      [U, V],
      p,
      canvas,
    );
  const oui = Math.random() < 0.5;
  const C = oui ? seg(U, V) : seg(S, U);
  return ouiNon(
    pick([`Le côté ${C} est-il opposé au sommet ${S} ?`, `Le côté ${C} est-il en face du sommet ${S} ?`, `${S} est-il le sommet opposé au côté ${C} ?`]),
    oui,
    p,
    canvas,
  );
}
function genSommetCommuns(): Q {
  const { X, Y, Z, canvas } = troisSommets();
  const [S, U, V] = shuffle([X, Y, Z]);
  const mode = pick(["commun", "partent", "troisieme", "lettre"] as const);
  const [a, b] = shuffle([seg(S, U), seg(S, V)]);
  if (mode === "commun")
    return qcm(
      pick([`Quel sommet est commun à ${a} et ${b} ?`, `Quel point appartient à ${a} et à ${b} ?`, `${a} et ${b} se rejoignent en quel sommet ?`, `Trouve le sommet commun à ${a} et ${b}.`]),
      S,
      [U, V],
      `La lettre présente dans ${a} et dans ${b} est ${S}.`,
      canvas,
    );
  if (mode === "partent")
    return qcm(
      pick([`Quels côtés partent du sommet ${S} ?`, `Quels côtés touchent le sommet ${S} ?`, `Choisis les 2 côtés qui arrivent en ${S}.`]),
      `${seg(S, U)} et ${seg(S, V)}`,
      [`${seg(S, U)} et ${seg(U, V)}`, `${seg(S, V)} et ${seg(U, V)}`],
      `Les côtés qui partent de ${S} portent la lettre ${S} : ${seg(S, U)} et ${seg(S, V)}.`,
      canvas,
    );
  if (mode === "troisieme")
    return qcm(
      pick([`Ce triangle a les côtés ${a} et ${b}. Quel est le troisième ?`, `Deux côtés sont ${a} et ${b}. Trouve le dernier côté.`, `Quel côté manque : ${a}, ${b} et … ?`]),
      seg(U, V),
      [a, b],
      `Les trois côtés relient les sommets deux à deux. Il reste ${seg(U, V)}.`,
      canvas,
    );
  // La lettre qui manque dans un côté, les deux lettres rangées dans l'ordre alphabétique.
  const [p, q] = [U, V].sort();
  return qcm(
    pick([`Le côté [${p}…] va de ${p} à ${q}. Quelle lettre manque ?`, `Complète : le côté qui relie ${p} et ${q} s’écrit [${p}…].`, `Quelle lettre termine le côté [${p}…] qui relie ${p} et ${q} ?`]),
    q,
    [p, S],
    `Le côté porte les lettres de ses deux extrémités : ${seg(p, q)}.`,
    canvas,
  );
}
function genSommetExtremites(): Q {
  const { X, Y, Z, W, canvas } = troisSommets();
  const [S, U, V] = shuffle([X, Y, Z]);
  const mode = pick(["vf", "pasExtremite", "relie", "coteEnTrop"] as const);
  if (mode === "vf") {
    const oui = Math.random() < 0.5;
    const E = oui ? U : S;
    return ouiNon(
      pick([`${E} est-il une extrémité du côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} touche-t-il le sommet ${E} ?`, `Le côté ${seg(U, V)} part-il du sommet ${E} ?`]),
      oui,
      `Les extrémités de ${seg(U, V)} sont ses deux lettres : ${U} et ${V}.`,
      canvas,
    );
  }
  if (mode === "pasExtremite")
    return qcm(
      pick([`Quel sommet n’est pas une extrémité de ${seg(U, V)} ?`, `Quel sommet ne touche pas le côté ${seg(U, V)} ?`, `Trouve le sommet hors du côté ${seg(U, V)}.`]),
      S,
      [U, V],
      `Les extrémités de ${seg(U, V)} sont ${U} et ${V}. Il reste ${S}.`,
      canvas,
    );
  if (mode === "relie") {
    const [p, q] = [U, V].sort();
    return qcm(
      pick([`Quels sommets relie le côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} va de quel sommet à quel sommet ?`, `Choisis les extrémités du côté ${seg(U, V)}.`]),
      `${p} et ${q}`,
      [[S, U].sort().join(" et "), [S, V].sort().join(" et "), `${S} et ${W}`],
      `Les deux lettres de ${seg(U, V)} sont ses extrémités.`,
      canvas,
    );
  }
  return qcm(
    pick([`Ces 4 segments : un seul n’est pas un côté de ce triangle. Lequel ?`, `Trouve le segment en trop pour ce triangle.`, `Observe la figure. Quel segment est en trop ?`]),
    seg(S, W),
    [seg(S, U), seg(S, V), seg(U, V)],
    `${W} n’est pas un sommet du triangle.`,
    canvas,
  );
}

// ----- TRIANGLE_TYPE_COTE
/** Un triangle nu d'une nature voulue : figure avec longueurs, ou figure avec codages. */
function natureNue(n: NatureCotes) {
  const t = triangleDeNature(n, nu());
  const u = t.o.u;
  const L = (x: number) => `${fr(x)} ${u}`;
  const paires: Array<[CoteFig, CoteFig]> =
    n === "équilatéral" ? [["AB", "BC"], ["BC", "CA"]] : n === "isocèle" ? (t.lAB === t.lBC ? [["AB", "BC"]] : t.lBC === t.lCA ? [["BC", "CA"]] : [["AB", "CA"]]) : [];
  return {
    ...t,
    u,
    N: `${t.X}${t.Y}${t.Z}`,
    figLongueurs: figure(t.pts, t.noms, { sideLabels: { AB: L(t.lAB), BC: L(t.lBC), CA: L(t.lCA) } }),
    figCodages: figure(t.pts, t.noms, { marks: { equalSides: paires } }),
    figNue: figure(t.pts, t.noms),
  };
}
/** Un triangle isocèle nu : les deux côtés égaux partent de S. */
function isoceleNu() {
  const o = nu();
  const [X, Y, Z] = sommetsTriangle();
  const [S, U, V] = shuffle([X, Y, Z]);
  const [a, b] = longueurs(o, "isocèle");
  return { X, Y, Z, S, U, V, a, b, u: o.u, N: `${X}${Y}${Z}` };
}
const QUESTION_NATURE_NUE = ["Quel mot décrit le mieux ce triangle ?", "Choisis le nom le plus précis.", "Quelle est sa nature la plus précise ?", "Ce triangle est-il équilatéral, isocèle ou quelconque ?"];
function genCoteLire(): Q {
  const n = pick(NATURES_COTES);
  const t = natureNue(n);
  if (Math.random() < 0.5)
    return qcm(
      `${pick(["Lis les longueurs.", "Observe les longueurs.", "Regarde les côtés."])} ${pick(QUESTION_NATURE_NUE)}`,
      n,
      NATURES_COTES.filter((x) => x !== n),
      `On compare les longueurs écrites sur la figure. ${pourquoiNature(n)}`,
      t.figLongueurs,
    );
  return qcm(
    `${pick(["Lis les codages.", "Observe les codages.", "Regarde les petits traits."])} ${pick(QUESTION_NATURE_NUE)}`,
    n,
    NATURES_COTES.filter((x) => x !== n),
    `Des côtés qui portent le même codage ont la même longueur. ${pourquoiNature(n)}`,
    t.figCodages,
  );
}
function genCoteMots(): Q {
  const n = pick(NATURES_COTES);
  const d = n === "équilatéral" ? "3 côtés égaux" : n === "isocèle" ? "exactement 2 côtés égaux" : "3 côtés différents";
  if (Math.random() < 0.6)
    return qcm(
      pick([`Quel triangle a ${d} ?`, `Comment s’appelle un triangle à ${d} ?`, `Choisis le nom d’un triangle à ${d}.`, `Un triangle a ${d}. Quelle est sa nature ?`]),
      n,
      NATURES_COTES.filter((x) => x !== n),
      pourquoiNature(n),
    );
  if (n === "isocèle")
    return qcm(
      pick(["Un triangle isocèle a au moins combien de côtés égaux ?", "Au moins combien de côtés égaux a un triangle isocèle ?", "Complète : un triangle isocèle a au moins … côtés égaux."]),
      "2",
      ["0", "1", "4"],
      "Un triangle isocèle a au moins 2 côtés de même longueur.",
    );
  const r = n === "équilatéral" ? "3" : "0";
  return qcm(
    pick([`Un triangle ${n} a combien de côtés égaux ?`, `Combien de côtés égaux a un triangle ${n} ?`, `Complète : un triangle ${n} a … côtés égaux.`]),
    r,
    ["0", "1", "2", "3"].filter((x) => x !== r),
    pourquoiNature(n),
  );
}
function genCoteEgaux(): Q {
  const mode = pick(["meme", "compte", "isocele", "equilateral", "longueur"] as const);
  if (mode === "meme") {
    const { S, U, V, a, b } = isoceleNu();
    const [A, B] = shuffle([seg(S, U), seg(S, V)]);
    return qcm(
      pick([`Quel côté a la même longueur que ${A} ?`, `Trouve le côté égal à ${A}.`, `Lis les codages. Quel côté est égal à ${A} ?`]),
      B,
      [seg(U, V), "aucun côté"],
      `Le même codage est porté par ${A} et ${B}.`,
      figureIsocele(S, U, V, a, b),
    );
  }
  if (mode === "compte") {
    const n = pick(NATURES_COTES);
    const t = natureNue(n);
    const r = n === "équilatéral" ? "3" : n === "isocèle" ? "2" : "0";
    return qcm(
      pick(["Lis les codages. Combien de côtés sont égaux ?", "Combien de côtés portent un codage ?", "Observe les petits traits. Combien de côtés sont codés ?"]),
      r,
      ["0", "1", "2", "3"].filter((x) => x !== r),
      `On compte les côtés qui portent le même codage : ${r}.`,
      t.figCodages,
    );
  }
  if (mode === "isocele") {
    const oui = Math.random() < 0.5;
    const t = natureNue(oui ? "isocèle" : "quelconque");
    return ouiNon(`${pick(["Lis les longueurs.", "Observe les longueurs."])} ${pick(["Ce triangle est-il isocèle ?", "Ce triangle a-t-il 2 côtés égaux ?", "Ce triangle a-t-il 2 côtés de même longueur ?"])}`, oui, pourquoiNature(oui ? "isocèle" : "quelconque"), t.figLongueurs);
  }
  if (mode === "equilateral") {
    const oui = Math.random() < 0.5;
    const t = natureNue(oui ? "équilatéral" : "isocèle");
    return ouiNon(`${pick(["Lis les codages.", "Observe les codages."])} ${pick(["Ce triangle est-il équilatéral ?", "Ce triangle a-t-il ses 3 côtés égaux ?", "Ses 3 côtés sont-ils égaux ?"])}`, oui, pourquoiNature(oui ? "équilatéral" : "isocèle"), t.figCodages);
  }
  const o = nu();
  const [c] = longueurs(o, "équilatéral");
  const [X, Y, Z] = sommetsTriangle();
  const [p, q, r] = shuffle([X, Y, Z]);
  const canvas = figure(pointsParCotes(1, 1, 1), [p, q, r], { marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] } });
  return court(
    pick([
      `Triangle équilatéral, ${lg(p, q)} = ${fr(c)} ${o.u}. Combien mesure ${lg(q, r)} ?`,
      `Triangle équilatéral : ${lg(p, q)} = ${fr(c)} ${o.u}. Trouve ${lg(q, r)}.`,
      `${lg(p, q)} = ${fr(c)} ${o.u}. Ce triangle est équilatéral. Calcule ${lg(q, r)}.`,
    ]),
    `${fr(c)} ${o.u}`,
    `Dans un triangle équilatéral, les trois côtés sont égaux : ${fr(c)} ${o.u}.`,
    canvas,
  );
}
function genCoteIsocele(): Q {
  const { X, Y, Z, S, U, V, a, b, u, N } = isoceleNu();
  const canvas = figureIsocele(S, U, V, a, b);
  const mode = pick(["sommet", "base", "longueur", "deduire"] as const);
  if (mode === "sommet")
    return qcm(
      pick(["Ce triangle est isocèle. En quel sommet ?", "En quel sommet ce triangle est-il isocèle ?", "Trouve le sommet principal de ce triangle isocèle.", "Lis les codages. Quel est le sommet principal ?"]),
      S,
      [U, V],
      `Les deux côtés codés, ${seg(S, U)} et ${seg(S, V)}, partent de ${S}.`,
      canvas,
    );
  if (mode === "base")
    return qcm(
      pick(["Quelle est la base de ce triangle isocèle ?", "Trouve la base de ce triangle isocèle.", `Le triangle ${N} est isocèle en ${S}. Quelle est sa base ?`, `Triangle isocèle en ${S} : quel côté est la base ?`]),
      seg(U, V),
      [seg(S, U), seg(S, V)],
      `La base est le côté opposé au sommet principal ${S} : ${seg(U, V)}.`,
      canvas,
    );
  if (mode === "longueur")
    return court(
      `Le triangle ${N} est isocèle en ${S}, ${lg(S, U)} = ${fr(a)} ${u}. ${pick([`Combien mesure ${lg(S, V)} ?`, `Calcule ${lg(S, V)}.`, `Trouve la longueur ${lg(S, V)}.`, `Écris la longueur ${lg(S, V)}.`])}`,
      `${fr(a)} ${u}`,
      `Isocèle en ${S} : les côtés qui partent de ${S} sont égaux. ${lg(S, V)} = ${lg(S, U)} = ${fr(a)} ${u}.`,
      canvas,
    );
  return qcm(
    `${lg(S, U)} = ${lg(S, V)}. ${pick([`En quel sommet le triangle ${N} est-il isocèle ?`, `Quel est le sommet principal du triangle ${N} ?`, `Le triangle ${N} est isocèle en quel sommet ?`])}`,
    S,
    [U, V],
    `Les deux côtés égaux partent du même sommet : ${S}.`,
    figure(pointsParCotes(b, a, a), [U, V, S]),
  );
}
const trio = (ls: number[], u: string) => `${fr(ls[0])} ${u}, ${fr(ls[1])} ${u} et ${fr(ls[2])} ${u}`;
const CM: Objet = { nom: "", u: "cm", min: 3, max: 12 };
/** Plusieurs séries de longueurs différentes de la nature voulue. */
function series(n: NatureCotes, combien: number, deja: string[] = []) {
  const r: string[] = [];
  for (let k = 0; r.length < combien && k < 200; k++) {
    const s = trio(longueurs(CM, n), "cm");
    if (!r.includes(s) && !deja.includes(s)) r.push(s);
  }
  return r;
}
function genCoteTrios(): Q {
  const mode = pick(["choisir", "choisir", "intrus", "vf"] as const);
  if (mode === "choisir") {
    const n = pick(NATURES_COTES);
    const juste = series(n, 1)[0];
    const faux =
      n === "équilatéral" ? [...series("isocèle", 2), ...series("quelconque", 1)] : n === "isocèle" ? series("quelconque", 3) : [...series("isocèle", 2), ...series("équilatéral", 1)];
    return qcm(
      pick([`Quelles longueurs forment un triangle ${n} ?`, `Choisis les côtés d’un triangle ${n}.`, `Quelles longueurs donnent un triangle ${n} ?`]),
      juste,
      faux,
      pourquoiNature(n),
    );
  }
  if (mode === "intrus") {
    const iso = series("isocèle", 3);
    return qcm(
      pick(["Quelles longueurs ne donnent pas un triangle isocèle ?", "Trouve l’intrus : ces côtés ne forment pas un triangle isocèle.", "Trois triangles sont isocèles. Lequel ne l’est pas ?"]),
      series("quelconque", 1)[0],
      iso,
      "Un triangle isocèle a 2 côtés de même longueur. L’intrus a 3 longueurs différentes.",
    );
  }
  const n = pick(NATURES_COTES);
  const vrai = Math.random() < 0.5;
  const claim = vrai ? n : pick(NATURES_COTES.filter((x) => x !== n && !(n === "équilatéral" && x === "isocèle")));
  const s = series(n, 1)[0];
  return vraiFaux(
    pick([`Avec ${s}, le triangle est ${claim}, vrai ou faux ?`, `Longueurs ${s} : le triangle est ${claim}, vrai ou faux ?`]),
    vrai,
    pourquoiNature(n),
  );
}
const VF_COTES: Array<[string, boolean, string]> = [
  ["Un triangle équilatéral est aussi isocèle.", true, "Il a au moins 2 côtés égaux : il est aussi isocèle."],
  ["Un triangle isocèle est toujours équilatéral.", false, "Deux côtés égaux ne suffisent pas : le troisième peut être différent."],
  ["Un triangle quelconque a 2 côtés égaux.", false, "Un triangle quelconque a 3 côtés de longueurs différentes."],
  ["Un triangle équilatéral a 3 côtés égaux.", true, "C’est sa définition."],
  ["Un triangle isocèle a au moins 2 côtés égaux.", true, "C’est sa définition."],
  ["Un triangle quelconque a 3 côtés différents.", true, "C’est sa définition."],
  ["Un triangle isocèle a 3 côtés différents.", false, "Un triangle isocèle a au moins 2 côtés égaux."],
  ["Un triangle équilatéral a 2 côtés différents.", false, "Ses 3 côtés sont égaux."],
];
function genCoteProprietes(): Q {
  const mode = pick(["vf", "vf", "perEqui", "perIso", "egalites"] as const);
  if (mode === "vf") {
    const [t, v, r] = pick(VF_COTES);
    return vraiFaux(`${t} Vrai ou faux ?`, v, r);
  }
  if (mode === "perEqui") {
    const o = nu();
    const [c] = longueurs(o, "équilatéral");
    const [X, Y, Z] = sommetsTriangle();
    const C = `${fr(c)} ${o.u}`;
    return court(
      pick([`Le triangle ${X}${Y}${Z} est équilatéral, ${lg(X, Y)} = ${C}. Calcule son périmètre.`, `Triangle équilatéral de côté ${C} : quel est son périmètre ?`, `Un triangle équilatéral a un côté de ${C}. Trouve son périmètre.`]),
      `${fr(3 * c)} ${o.u}`,
      `Ses 3 côtés sont égaux : 3 × ${fr(c)} = ${fr(3 * c)} ${o.u}.`,
      figure(pointsParCotes(1, 1, 1), shuffle([X, Y, Z]) as Noms, { marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] } }),
    );
  }
  if (mode === "perIso") {
    const { S, U, V, a, b, u } = isoceleNu();
    const per = 2 * a + b;
    return court(
      pick([
        `Triangle isocèle en ${S} : ${lg(S, U)} = ${fr(a)} ${u}, ${lg(U, V)} = ${fr(b)} ${u}. Quel est son périmètre ?`,
        `Triangle isocèle en ${S}, ${lg(S, U)} = ${fr(a)} ${u}, ${lg(U, V)} = ${fr(b)} ${u}. Calcule le périmètre.`,
      ]),
      `${fr(per)} ${u}`,
      `Isocèle en ${S} : ${lg(S, V)} = ${lg(S, U)} = ${fr(a)} ${u}. Périmètre : ${fr(a)} + ${fr(a)} + ${fr(b)} = ${fr(per)} ${u}.`,
      figureIsocele(S, U, V, a, b),
    );
  }
  const n = pick(NATURES_COTES);
  const t = natureNue(n);
  const [A, B, C] = t.noms;
  return qcm(
    `${lg(A, B)} = ${fr(t.lAB)} ${t.u}, ${lg(B, C)} = ${fr(t.lBC)} ${t.u}, ${lg(C, A)} = ${fr(t.lCA)} ${t.u}. ${pick(["Quelle est sa nature ?", "Quel est son type ?", "Choisis le nom précis."])}`,
    n,
    NATURES_COTES.filter((x) => x !== n),
    pourquoiNature(n),
    t.figNue,
  );
}

// ----- TRIANGLE_TYPE_ANGLE, ★1
const NATURES_UN_ANGLE = ["aigu", "droit", "obtus"] as const;
function mesureDUnAngle(n: (typeof NATURES_UN_ANGLE)[number]) {
  return n === "droit" ? 90 : n === "aigu" ? randomInt(15, 85) : randomInt(95, 140);
}
const pourquoiUnAngle = (v: number) => (v === 90 ? "90° : c’est un angle droit." : v < 90 ? `${v}° est moins que 90° : l’angle est aigu.` : `${v}° est plus que 90° : l’angle est obtus.`);
function genAngleSeul(): Q {
  const n = pick(NATURES_UN_ANGLE);
  const v = mesureDUnAngle(n);
  const mode = pick(["texte", "texte", "figure", "mots"] as const);
  if (mode === "texte")
    return qcm(
      pick([`Un angle mesure ${v}°. Est-il aigu, droit ou obtus ?`, `Un angle de ${v}° est-il aigu, droit ou obtus ?`, `Un angle de ${v} degrés est-il aigu, droit ou obtus ?`, `Quel mot décrit un angle de ${v}° ?`, `Choisis le mot pour un angle de ${v}°.`]),
      n,
      NATURES_UN_ANGLE.filter((x) => x !== n),
      pourquoiUnAngle(v),
    );
  if (mode === "figure") {
    const [X, Y, Z] = sommetsTriangle();
    const noms = shuffle([X, Y, Z]) as Noms;
    const autre = randomInt(20, Math.min(60, 170 - v));
    return qcm(
      pick([`Lis l’angle en ${noms[0]}. Est-il aigu, droit ou obtus ?`, `Regarde l’angle en ${noms[0]}. Est-il aigu, droit ou obtus ?`, `Observe la figure. Quel mot décrit l’angle en ${noms[0]} ?`]),
      n,
      NATURES_UN_ANGLE.filter((x) => x !== n),
      pourquoiUnAngle(v),
      figure(pointsParAngles(v, autre), noms, { angleLabels: { A: `${v}°` } }),
    );
  }
  const cas = pick([
    { t: pick(["Un angle droit mesure combien de degrés ?", "Combien de degrés mesure un angle droit ?"]), r: "90°" },
    { t: pick(["Un angle aigu mesure moins de combien de degrés ?", "Un angle aigu reste sous combien de degrés ?"]), r: "90°" },
    { t: pick(["Un angle obtus mesure plus de combien de degrés ?", "Un angle obtus dépasse combien de degrés ?"]), r: "90°" },
  ]);
  return court(cas.t, cas.r, "L’angle droit, 90°, sert de repère : un angle aigu est plus petit, un angle obtus est plus grand.");
}
function genAngleFigure1(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const t = triangleAngles(n);
  const canvas = figure(t.pts, t.noms, { angleLabels: { A: `${t.angA}°`, B: `${t.angB}°`, C: `${t.g}°` } });
  const mode = pick(["nature", "nature", "grand", "droitOu", "ouiNon"] as const);
  if (mode === "nature")
    return qcm(
      `${pick(["Lis les angles.", "Observe les angles.", "Regarde la figure."])} ${pick(["Quel est le type de ce triangle ?", "Ce triangle est-il rectangle, obtusangle ou acutangle ?", "Choisis le type de ce triangle."])}`,
      NAT_ANGLES[n],
      Object.values(NAT_ANGLES).filter((x) => x !== NAT_ANGLES[n]),
      `On regarde le plus grand angle. ${pourquoiAngles(n, t.g)}`,
      canvas,
    );
  if (mode === "grand") {
    if (Math.max(t.angA, t.angB) === t.g) return genAngleFigure1(); // deux « plus grands » : on retire.
    const [A, B, C] = t.noms;
    return qcm(
      `${voir()} ${pick(["Quel est le plus grand angle ?", "Où est le plus grand angle ?", "Trouve le plus grand angle de ce triangle."])}`,
      `l’angle en ${C}`,
      [`l’angle en ${A}`, `l’angle en ${B}`],
      `Le plus grand nombre écrit est ${t.g}°, en ${C}.`,
      canvas,
    );
  }
  if (mode === "droitOu") {
    const aigu = randomInt(25, 40);
    const [X, Y, Z] = sommetsTriangle();
    const noms = shuffle([X, Y, Z]) as Noms;
    return qcm(
      pick(["Où est l’angle droit ?", "En quel sommet est l’angle droit ?", "Ce triangle est rectangle. En quel sommet ?", "Observe le petit carré. Quel sommet porte l’angle droit ?"]),
      noms[2],
      [noms[0], noms[1]],
      `Le petit carré marque l’angle droit : il est en ${noms[2]}.`,
      figure(pointsParAngles(aigu, 90 - aigu), noms, { marks: { rightAngleAt: "C" } }),
    );
  }
  const q = pick(["rectangle", "obtus"] as const);
  const oui = n === q;
  return ouiNon(
    `${pick(["Lis les angles.", "Observe les angles."])} ${q === "rectangle" ? pick(["Ce triangle est-il rectangle ?", "Ce triangle a-t-il un angle droit ?"]) : pick(["Ce triangle a-t-il un angle obtus ?", "Ce triangle est-il obtusangle ?"])}`,
    oui,
    pourquoiAngles(n, t.g),
    canvas,
  );
}
function genAngleMots1(): Q {
  const mode = pick(["def", "def", "compte", "vf"] as const);
  if (mode === "def") {
    const cas = pick([
      { d: "un angle droit", r: "rectangle" },
      { d: "un angle obtus", r: "obtusangle" },
      { d: "3 angles aigus", r: "acutangle" },
    ]);
    return qcm(
      pick([`Quel triangle a ${cas.d} ?`, `Comment s’appelle un triangle avec ${cas.d} ?`, `Choisis le nom d’un triangle avec ${cas.d}.`, `Un triangle a ${cas.d}. Quel est son type ?`]),
      cas.r,
      ["rectangle", "obtusangle", "acutangle"].filter((x) => x !== cas.r),
      `Un triangle ${cas.r} a ${cas.d}.`,
    );
  }
  if (mode === "compte") {
    const cas = pick([
      { m: "rectangle", r: "2" },
      { m: "obtusangle", r: "2" },
      { m: "acutangle", r: "3" },
    ]);
    return qcm(
      pick([`Un triangle ${cas.m} a combien d’angles aigus ?`, `Combien d’angles aigus a un triangle ${cas.m} ?`, `Compte les angles aigus d’un triangle ${cas.m}.`]),
      cas.r,
      ["0", "1", "2", "3"].filter((x) => x !== cas.r),
      `Un triangle ${cas.m} a ${cas.r} angles aigus : la somme des trois angles vaut 180°.`,
    );
  }
  const cas = pick([
    { t: "Un triangle rectangle a-t-il un angle droit ?", o: true },
    { t: "Un triangle rectangle a-t-il un angle obtus ?", o: false },
    { t: "Un triangle obtusangle a-t-il un angle obtus ?", o: true },
    { t: "Un triangle obtusangle a-t-il un angle droit ?", o: false },
    { t: "Un triangle acutangle a-t-il un angle droit ?", o: false },
    { t: "Un triangle acutangle a-t-il un angle obtus ?", o: false },
  ]);
  return ouiNon(cas.t, cas.o, "Rectangle : un angle droit. Obtusangle : un angle obtus. Acutangle : trois angles aigus.");
}

// ----- TRIANGLE_TYPE_ANGLE, ★2
function genAngleDeuxNommes(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const { a, b, g, N, X, Y, Z } = triangleAngles(n);
  const [d1, d2, reste] = shuffle([a, b, g]);
  const [U, V] = shuffle([X, Y, Z]);
  const pourquoi = `Le troisième angle mesure 180 − ${d1} − ${d2} = ${reste}°. ${pourquoiAngles(n, g)}`;
  if (Math.random() < 0.7)
    return qcm(
      pick([
        `Triangle ${N} : ${chapeau(U)} = ${d1}° et ${chapeau(V)} = ${d2}°. Quel est son type ?`,
        `Deux angles mesurent ${d1}° et ${d2}°. Le triangle est-il rectangle, obtusangle ou acutangle ?`,
        `Calcule le troisième angle, puis le type : ${d1}° et ${d2}°.`,
        `Un triangle a des angles de ${d1}° et ${d2}°. Choisis son type.`,
      ]),
      NAT_ANGLES[n],
      Object.values(NAT_ANGLES).filter((x) => x !== NAT_ANGLES[n]),
      pourquoi,
    );
  return ouiNon(
    pick([`Deux angles mesurent ${d1}° et ${d2}°. Le triangle est-il rectangle ?`, `${chapeau(U)} = ${d1}° et ${chapeau(V)} = ${d2}°. Le triangle ${N} est-il rectangle ?`, `Un triangle a des angles de ${d1}° et ${d2}°. Ce triangle a-t-il un angle droit ?`]),
    n === "rectangle",
    pourquoi,
  );
}
const trioAngles = (n: NatAngle) => {
  const [a, b, g] = anglesDeNature(n);
  const [p, q, r] = shuffle([a, b, g]);
  return { s: `${p}°, ${q}° et ${r}°`, g };
};
function genAngleTrios(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const nomN = { rectangle: "rectangle", obtus: "obtusangle", aigu: "acutangle" }[n];
  const autres = (["rectangle", "obtus", "aigu"] as const).filter((x) => x !== n);
  const mode = pick(["choisir", "type", "vf"] as const);
  const t = trioAngles(n);
  if (mode === "choisir")
    return qcm(
      pick([`Quels angles forment un triangle ${nomN} ?`, `Choisis les angles d’un triangle ${nomN}.`, `Trouve les 3 angles d’un triangle ${nomN}.`]),
      t.s,
      [trioAngles(autres[0]).s, trioAngles(autres[1]).s],
      `Il faut regarder le plus grand angle de chaque série. ${pourquoiAngles(n, t.g)}`,
    );
  if (mode === "type")
    return qcm(
      pick([`Un triangle a pour angles ${t.s}. Quel est son type ?`, `Un triangle a des angles de ${t.s}. Choisis son type.`, `Les angles d’un triangle mesurent ${t.s}. Quel est son type ?`]),
      NAT_ANGLES[n],
      Object.values(NAT_ANGLES).filter((x) => x !== NAT_ANGLES[n]),
      pourquoiAngles(n, t.g),
    );
  const vrai = Math.random() < 0.5;
  const claim = vrai ? nomN : { rectangle: "rectangle", obtus: "obtusangle", aigu: "acutangle" }[pick(autres)];
  return vraiFaux(
    pick([`Le triangle d’angles ${t.s} est ${claim}. Vrai ou faux ?`, `Un triangle a pour angles ${t.s}. Il est ${claim} : vrai ou faux ?`]),
    vrai,
    pourquoiAngles(n, t.g),
  );
}
function genAngleLire2(): Q {
  const mode = pick(["obtus", "droit", "aigus", "petit", "autres"] as const);
  if (mode === "autres") {
    const cas = pick([
      { d: `un angle de ${randomInt(95, 150)}°`, p: "Un angle obtus prend plus de 90°" },
      { d: "un angle droit", p: "L’angle droit prend 90°" },
    ]);
    return qcm(
      pick([`Un triangle a ${cas.d}. Comment sont les deux autres angles ?`, `Un triangle a ${cas.d}. Les deux autres sont-ils aigus, droits ou obtus ?`]),
      "aigus",
      ["droits", "obtus"],
      `${cas.p} : il reste moins de 90° pour les deux autres, qui sont donc aigus.`,
    );
  }
  const n = mode === "obtus" ? "obtus" : mode === "droit" ? "rectangle" : pick(["rectangle", "obtus", "aigu"] as const);
  const t = triangleAngles(n);
  const [A, B, C] = t.noms;
  const canvas = figure(t.pts, t.noms, { angleLabels: { A: `${t.angA}°`, B: `${t.angB}°`, C: `${t.g}°` } });
  if (mode === "obtus")
    return qcm(pick(["Quel angle de ce triangle est obtus ?", "Observe la figure. Quel angle est obtus ?", "Trouve l’angle obtus de ce triangle."]), `l’angle en ${C}`, [`l’angle en ${A}`, `l’angle en ${B}`], `${t.g}° est plus que 90° : l’angle en ${C} est obtus.`, canvas);
  if (mode === "droit")
    return qcm(pick(["Quel angle de ce triangle est droit ?", "Observe la figure. Quel angle est droit ?", "Trouve l’angle droit de ce triangle."]), `l’angle en ${C}`, [`l’angle en ${A}`, `l’angle en ${B}`], `L’angle en ${C} mesure 90° : il est droit.`, canvas);
  if (mode === "aigus") {
    const r = n === "aigu" ? "3" : "2";
    return qcm(pick(["Combien d’angles aigus a ce triangle ?", "Observe la figure. Compte les angles aigus.", "Ce triangle a combien d’angles aigus ?"]), r, ["0", "1", "2", "3"].filter((x) => x !== r), `On compte les angles de moins de 90° : ${r}.`, canvas);
  }
  const vals: Array<[string, number]> = [[A, t.angA], [B, t.angB], [C, t.g]];
  const petit = [...vals].sort((u, v) => u[1] - v[1])[0];
  return qcm(
    pick(["Quel angle de ce triangle est le plus petit ?", "Observe la figure. Trouve le plus petit angle.", "Où est le plus petit angle ?"]),
    `l’angle en ${petit[0]}`,
    vals.filter((x) => x[0] !== petit[0]).map((x) => `l’angle en ${x[0]}`),
    `Le plus petit nombre écrit est ${petit[1]}°, en ${petit[0]}.`,
    canvas,
  );
}

// ----- TRIANGLE_TYPE_ANGLE, ★3 : une deuxième façon, portée par un métier ou un objet.
const METIERS_ANGLES: string[] = [
  "Une charpentière trace la ferme d’un toit.",
  "Un architecte dessine le pignon d’une maison.",
  "Une couturière coupe un fanion de tissu.",
  "Un marin hisse une voile en triangle.",
  "Une graphiste dessine un logo en triangle.",
  "Un menuisier découpe une cale triangulaire.",
  "Une carreleuse pose un carreau triangulaire.",
  "Un géomètre relève les limites d’un champ en triangle.",
  "Une pâtissière coupe une part de gâteau.",
  "Un ingénieur dessine un renfort triangulaire de pont.",
  "Une paysagiste trace un massif de fleurs en triangle.",
  "Un dessinateur de BD trace un toit pointu.",
  "Une maçonne coule une dalle triangulaire.",
  "Un skateur dessine sa rampe vue de côté.",
  "Une pilote lit un triangle de navigation.",
  "Un cordonnier découpe une pièce de cuir en triangle.",
  "Une vitrière taille une vitre triangulaire.",
  "Un dessinateur trace une montagne de manga.",
  "Une cycliste observe le cadre de son vélo.",
  "Une éclairagiste relie trois projecteurs sur une scène.",
  "Une biologiste dessine une feuille en triangle.",
  "Un créateur de jeux dessine une pièce en triangle.",
  "Une astronome relie trois étoiles sur sa carte.",
  "Une géographe relie trois villes sur une carte.",
  // ⛔ La Réunion : 1 fois sur 25 au plus.
  "Une géologue trace un triangle autour du Piton de la Fournaise.",
];
function genTypeAngleMetier(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const [a, b, g] = anglesDeNature(n);
  const [d1, d2, reste] = shuffle([a, b, g]);
  const debut = `${pick(METIERS_ANGLES)} ${pick([`Deux angles mesurent ${d1}° et ${d2}°.`, `Deux angles relevés : ${d1}° et ${d2}°.`])}`;
  const pourquoi = `Le troisième angle mesure 180 − ${d1} − ${d2} = ${reste}°. ${pourquoiAngles(n, g)}`;
  if (Math.random() < 0.65)
    return qcm(`${debut} ${pick(["Quel est le type du triangle ?", "Choisis le type du triangle."])}`, NAT_ANGLES[n], Object.values(NAT_ANGLES).filter((x) => x !== NAT_ANGLES[n]), pourquoi);
  return ouiNon(`${debut} ${pick(["Ce triangle est-il rectangle ?", "Ce triangle a-t-il un angle droit ?"])}`, n === "rectangle", pourquoi);
}

// ----- TRIANGLE_DEFI, ★1
type NatureCodee = "équilatéral" | "isocèle" | "rectangle" | "rectangle isocèle";
const NATURES_CODEES: NatureCodee[] = ["équilatéral", "isocèle", "rectangle", "rectangle isocèle"];
/** Une figure codée d'une des quatre natures ; le sommet particulier est C, en haut. */
function figureCodee(n: NatureCodee, noms: Noms) {
  const aigu = randomInt(28, 38);
  if (n === "rectangle") return figure(pointsParAngles(aigu, 90 - aigu), noms, { marks: { rightAngleAt: "C" } });
  if (n === "isocèle") return figure(pointsParCotes(pick([3.5, 4, 6.5, 7.5]), 5, 5), noms, { marks: { equalSides: [["BC", "CA"]] } });
  if (n === "équilatéral") return figure(pointsParCotes(1, 1, 1), noms, { marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] } });
  return figure(pointsParAngles(45, 45), noms, { marks: { rightAngleAt: "C", equalSides: [["BC", "CA"]] } });
}
const pourquoiCodee: Record<NatureCodee, string> = {
  équilatéral: "Les trois côtés portent le même codage : il est équilatéral.",
  isocèle: "Deux côtés portent le même codage, sans angle droit : il est isocèle.",
  rectangle: "Un petit carré, aucun côté codé égal : il est rectangle.",
  "rectangle isocèle": "Un petit carré ET deux côtés codés égaux : il est rectangle isocèle.",
};
function genDefiLireCodes(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const noms = shuffle([X, Y, Z]) as Noms;
  const n = pick(NATURES_CODEES);
  return qcm(
    `${pick(["Lis les codages.", "Observe les codages.", "Regarde la figure."])} ${pick([`Quel mot décrit le mieux le triangle ${N} ?`, `Choisis le nom le plus précis du triangle ${N}.`, `Triangle ${N} : quelle est sa nature la plus précise ?`])}`,
    n,
    NATURES_CODEES.filter((x) => x !== n),
    pourquoiCodee[n],
    figureCodee(n, noms),
  );
}
function genDefiCodesOuiNon(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as Noms;
  const q = pick(["rectangle", "droit", "isocele", "egaux", "equi"] as const);
  // Un équilatéral est aussi isocèle : on ne pose pas cette question-piège à ★1.
  const n = q === "isocele" || q === "egaux" ? pick(NATURES_CODEES.filter((x) => x !== "équilatéral")) : pick(NATURES_CODEES);
  const droit = n === "rectangle" || n === "rectangle isocèle";
  const oui = q === "rectangle" || q === "droit" ? droit : q === "equi" ? n === "équilatéral" : n === "isocèle" || n === "rectangle isocèle";
  const fin = {
    rectangle: ["Ce triangle est-il rectangle ?", "Le triangle est-il rectangle ?"],
    droit: ["Ce triangle a-t-il un angle droit ?", "Vois-tu un angle droit ?"],
    isocele: ["Ce triangle est-il isocèle ?", "Le triangle est-il isocèle ?"],
    egaux: ["Ce triangle a-t-il 2 côtés égaux ?", "Vois-tu 2 côtés égaux ?"],
    equi: ["Ce triangle est-il équilatéral ?", "Le triangle est-il équilatéral ?"],
  }[q];
  return ouiNon(`${pick(["Lis les codages.", "Observe les codages."])} ${pick(fin)}`, oui, pourquoiCodee[n], figureCodee(n, noms));
}
function genDefiMots1(): Q {
  const mode = pick(["nombre", "nom", "nom"] as const);
  if (mode === "nombre") {
    const cas = pick([
      { t: pick(["Un triangle rectangle isocèle a combien d’angles droits ?", "Combien d’angles droits a un triangle rectangle isocèle ?"]), r: "1" },
      { t: pick(["Un triangle rectangle isocèle a combien de côtés égaux ?", "Combien de côtés égaux a un triangle rectangle isocèle ?"]), r: "2" },
      { t: pick(["Un triangle équilatéral a combien d’angles droits ?", "Combien d’angles droits a un triangle équilatéral ?"]), r: "0" },
      { t: pick(["Un triangle équilatéral a combien de côtés égaux ?", "Combien de côtés égaux a un triangle équilatéral ?"]), r: "3" },
    ]);
    return qcm(cas.t, cas.r, ["0", "1", "2", "3"].filter((x) => x !== cas.r), "Rectangle : un angle droit. Isocèle : 2 côtés égaux. Équilatéral : 3 côtés égaux, trois angles de 60°.");
  }
  const cas = pick([
    { d: "un angle droit et 2 côtés égaux", r: "rectangle isocèle" as NatureCodee },
    { d: "un angle droit et 3 côtés différents", r: "rectangle" as NatureCodee },
    { d: "3 côtés égaux", r: "équilatéral" as NatureCodee },
    { d: "2 côtés égaux, sans angle droit", r: "isocèle" as NatureCodee },
  ]);
  return qcm(
    pick([`Quel triangle a ${cas.d} ?`, `Comment s’appelle un triangle avec ${cas.d} ?`, `Choisis le triangle avec ${cas.d}.`]),
    cas.r,
    NATURES_CODEES.filter((x) => x !== cas.r),
    `Le triangle ${cas.r} a ${cas.d}.`,
  );
}

// ----- TRIANGLE_DEFI, ★2
function genDefiAnglesNature(): Q {
  const cas = pick([
    { a: [60, 60, 60], r: "équilatéral", p: "Ses trois angles sont égaux : il est équilatéral." },
    { a: (() => { const b = pick([40, 50, 55, 65, 70, 75]); return [b, b, 180 - 2 * b]; })(), r: "isocèle", p: "Deux angles égaux, aucun angle droit : il est isocèle." },
    { a: (() => { const b = randomInt(25, 40); return [90, b, 90 - b]; })(), r: "rectangle", p: "Un angle de 90°, les deux autres différents : il est rectangle." },
    { a: [90, 45, 45], r: "rectangle isocèle", p: "Un angle de 90° et deux angles égaux : il est rectangle isocèle." },
    { a: (() => { for (;;) { const b = randomInt(35, 50); const c = randomInt(55, 70); const d = 180 - b - c; if (d !== 90 && d !== b && d !== c) return [b, c, d]; } })(), r: "quelconque", p: "Trois angles différents, aucun angle droit : il est quelconque." },
  ]);
  const [p, q, r] = shuffle(cas.a);
  return qcm(
    pick([
      `Un triangle a des angles de ${p}°, ${q}° et ${r}°. Quel nom précis ?`,
      `Les angles d’un triangle mesurent ${p}°, ${q}° et ${r}°. Quelle est sa nature ?`,
      `Les angles d’un triangle font ${p}°, ${q}° et ${r}°. Quel mot le décrit le mieux ?`,
      `Un triangle a pour angles ${p}°, ${q}° et ${r}°. Quelle est sa nature ?`,
      `Un triangle a pour angles ${p}°, ${q}° et ${r}°. Choisis son nom précis.`,
      `Voici les angles d’un triangle : ${p}°, ${q}° et ${r}°. Choisis son nom.`,
      `Voici les angles d’un triangle : ${p}°, ${q}° et ${r}°. Quelle est sa nature ?`,
      `Un triangle a des angles de ${p}°, ${q}° et ${r}°. Trouve sa nature.`,
    ]),
    cas.r,
    shuffle(NATURES_DEFI.filter((x) => x !== cas.r)).slice(0, 3),
    cas.p,
  );
}
function genDefiEgalites(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const [S, U, V] = shuffle([X, Y, Z]);
  const n = pick(NATURES_CODEES);
  const aS = randomInt(3, 7) * 10 + 5; // un sommet principal bien loin de 60° et de 90°
  const faits =
    n === "équilatéral"
      ? `${lg(S, U)} = ${lg(U, V)} = ${lg(S, V)}.`
      : n === "isocèle"
        ? `${lg(S, U)} = ${lg(S, V)} et ${chapeau(S)} = ${aS}°.`
        : n === "rectangle"
          ? `${chapeau(S)} = 90°, ${lg(S, U)} et ${lg(S, V)} sont différents.`
          : `${lg(S, U)} = ${lg(S, V)} et ${chapeau(S)} = 90°.`;
  const pts =
    n === "équilatéral"
      ? pointsParCotes(1, 1, 1)
      : n === "isocèle"
        ? pointsParAngles((180 - aS) / 2, (180 - aS) / 2)
        : n === "rectangle"
          ? pointsParAngles(32, 58)
          : pointsParAngles(45, 45);
  // La figure est à l'échelle, sans codage : c'est l'énoncé qui donne les égalités.
  return qcm(
    `${faits} ${pick(["Quelle est sa nature ?", "Quel mot le décrit le mieux ?", "Choisis le nom le plus précis."])}`,
    n,
    NATURES_CODEES.filter((x) => x !== n),
    pourquoiCodee[n],
    n === "équilatéral" ? figure(pts, shuffle([X, Y, Z]) as Noms) : figure(pts, [U, V, S]),
  );
}
const VF_DEFI: Array<[string, boolean, string]> = [
  ["Un triangle rectangle peut avoir 2 côtés égaux.", true, "Oui : c’est le triangle rectangle isocèle, comme la moitié d’un carré."],
  ["Un triangle équilatéral peut être rectangle.", false, "Non : ses trois angles mesurent 60°."],
  ["Un triangle isocèle peut avoir un angle droit.", true, "Oui : c’est le triangle rectangle isocèle."],
  ["Un triangle rectangle est toujours isocèle.", false, "Non : ses trois côtés peuvent être différents."],
  ["Un triangle équilatéral est aussi isocèle.", true, "Oui : il a au moins 2 côtés égaux."],
  ["Un triangle rectangle a toujours 3 côtés différents.", false, "Non : il peut avoir 2 côtés égaux, c’est le triangle rectangle isocèle."],
  ["Un triangle rectangle isocèle a 3 côtés égaux.", false, "Non : il en a 2, le grand côté est plus long."],
  ["Un triangle rectangle isocèle a 2 angles de 45°.", true, "Oui : 90 + 45 + 45 = 180."],
  ["Un triangle équilatéral a 3 angles de 60°.", true, "Oui : 180 ÷ 3 = 60."],
  ["Un triangle isocèle a toujours un angle droit.", false, "Non : l’angle droit n’est pas obligatoire."],
];
function genDefiVraiFaux(): Q {
  const mode = pick(["vf", "vf", "vf", "existe", "angleOuCote"] as const);
  if (mode === "vf") {
    const [t, v, r] = pick(VF_DEFI);
    return vraiFaux(`${t} Vrai ou faux ?`, v, r);
  }
  if (mode === "existe")
    return qcm(
      pick(["Quel triangle n’existe pas ?", "Trouve le triangle impossible.", "Lequel de ces triangles est impossible ?"]),
      "rectangle et équilatéral",
      ["rectangle et isocèle", "isocèle et acutangle", "isocèle et obtusangle"],
      "Un triangle équilatéral a trois angles de 60° : aucun ne peut être droit.",
    );
  const cas = pick([
    { t: pick(["Que regarde-t-on pour dire « isocèle » : les côtés ou les angles droits ?", "Pour dire « isocèle », regarde-t-on les côtés ou les angles droits ?"]), r: "les côtés", f: "les angles droits" },
    { t: pick(["Que regarde-t-on pour dire « rectangle » : les côtés ou les angles ?", "Pour dire « rectangle », regarde-t-on les côtés ou les angles ?"]), r: "les angles", f: "les côtés" },
  ]);
  return qcm(cas.t, cas.r, [cas.f], "« Isocèle » parle des côtés égaux. « Rectangle » parle de l’angle droit.");
}

// ----- TRIANGLE_SOMME_ANGLE, ★1
function trioPossible() {
  const [a, b, g] = anglesDeNature(pick(["rectangle", "obtus", "aigu"] as const));
  return shuffle([a, b, g]) as [number, number, number];
}
/** Trois angles dont la somme n'est pas 180°, écart bien visible. */
function trioFaux() {
  const [a, b, c] = trioPossible();
  const d = pick([-20, -10, 10, 20, 30]);
  const c2 = c + d > 5 && c + d < 170 ? c + d : c >= 150 ? c - 20 : c + 20;
  return shuffle([a, b, c2]) as [number, number, number];
}
const ecrireTrio = (t: number[]) => `${t[0]}°, ${t[1]}° et ${t[2]}°`;
/** n séries différentes, pour un QCM sans deux choix identiques. */
function seriesAngles(tirer: () => number[], n: number) {
  const r = new Set<string>();
  while (r.size < n) r.add(ecrireTrio(tirer()));
  return [...r];
}
function genSommeAddition(): Q {
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const t = triangleAngles(n);
  const [p, q, r] = shuffle([t.a, t.b, t.g]);
  const pourquoi = `${t.angA} + ${t.angB} + ${t.g} = 180 : on retrouve 180°, comme dans tous les triangles.`;
  if (Math.random() < 0.5) return court(pick([`Calcule ${p}° + ${q}° + ${r}°.`, `Effectue ${p}° + ${q}° + ${r}°.`, `Combien font ${p}° + ${q}° + ${r}° ?`]), "180°", pourquoi);
  return court(
    `${voir()} ${pick(["Additionne les angles de ce triangle.", "Combien font ses 3 angles ensemble ?", "Calcule la somme de ces angles."])}`,
    "180°",
    pourquoi,
    figure(t.pts, t.noms, { angleLabels: { A: `${t.angA}°`, B: `${t.angB}°`, C: `${t.g}°` } }),
  );
}
function genSommeVraiFaux(): Q {
  const vrai = Math.random() < 0.5;
  const v = vrai ? 180 : pick([90, 100, 200, 270, 360]);
  const mode = pick(["vf", "vf", "complete"] as const);
  if (mode === "complete")
    return court(
      pick(["Complète : la somme des angles d’un triangle vaut … °.", "Complète : les 3 angles d’un triangle font … °.", "Dans un triangle, les 3 angles font combien de degrés ?"]),
      "180°",
      "Dans TOUS les triangles, la somme des trois angles vaut 180°.",
    );
  return vraiFaux(
    pick([`La somme des angles d’un triangle vaut ${v}°. Vrai ou faux ?`, `Les 3 angles d’un triangle font ${v}°. Vrai ou faux ?`, `Tout triangle a des angles qui font ${v}°. Vrai ou faux ?`, `Dans un triangle, les 3 angles font ${v}°. Vrai ou faux ?`, `Les angles d’un triangle font toujours ${v}° en tout. Vrai ou faux ?`, `Un triangle a toujours ${v}° d’angles en tout. Vrai ou faux ?`]),
    vrai,
    "Dans TOUS les triangles, la somme des trois angles vaut 180°.",
  );
}
function genSommeTrios(): Q {
  const mode = pick(["choisir", "intrus", "ouiNon", "ouiNon"] as const);
  if (mode === "choisir")
    return qcm(
      pick(["Quels angles peuvent être ceux d’un triangle ?", "Choisis les 3 angles d’un vrai triangle.", "Trouve les angles qui font 180°."]),
      ecrireTrio(trioPossible()),
      seriesAngles(trioFaux, 3),
      "On additionne chaque série. Seule la bonne série fait 180°.",
    );
  if (mode === "intrus") {
    const justes = seriesAngles(trioPossible, 3);
    return qcm(pick(["Quels angles ne font pas 180° ?", "Trouve l’intrus : ces angles ne font pas 180°.", "Quelle série n’est pas celle d’un triangle ?"]), ecrireTrio(trioFaux()), justes, "On additionne chaque série. L’intrus ne fait pas 180°.");
  }
  const oui = Math.random() < 0.5;
  const t = oui ? trioPossible() : trioFaux();
  const s = t[0] + t[1] + t[2];
  return ouiNon(
    pick([`${ecrireTrio(t)} font-ils 180° ?`, `Ces angles font-ils 180° : ${ecrireTrio(t)} ?`, `Additionne ${ecrireTrio(t)}. Trouves-tu 180° ?`]),
    s === 180,
    `${t[0]} + ${t[1]} + ${t[2]} = ${s}.`,
  );
}

// ----- TRIANGLE_SOMME_ANGLE, ★2
function genSommeReste(): Q {
  const mode = pick(["unAngle", "unAngle", "droit", "deux"] as const);
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const t = triangleAngles(n);
  const k = randomInt(0, 2);
  const S = t.noms[k];
  const v = [t.angA, t.angB, t.g][k];
  if (mode === "unAngle")
    return court(
      pick([`Un angle du triangle mesure ${v}°. Combien font les 2 autres ?`, `Dans ce triangle, un angle mesure ${v}°. Combien font les 2 autres ?`, `${chapeau(S)} = ${v}°. Calcule la somme des 2 autres angles.`, `Observe la figure. Combien font les 2 angles sans mesure ?`]),
      `${180 - v}°`,
      `Les trois angles font 180°. Il reste 180 − ${v} = ${180 - v}°.`,
      figure(t.pts, t.noms, { angleLabels: { [["A", "B", "C"][k]]: `${v}°` } as TriangleCanvasData["angleLabels"] }),
    );
  if (mode === "droit")
    return court(
      pick(["Un triangle a un angle droit. Combien font les 2 autres angles ?", "Avec un angle droit, combien font les 2 autres angles ?", "Triangle rectangle : calcule la somme des 2 angles aigus."]),
      "90°",
      "L’angle droit prend 90°. Il reste 180 − 90 = 90° pour les deux autres.",
    );
  const d = t.a + t.b;
  return court(
    pick([`Dans un triangle, deux angles font ${d}° en tout. Combien mesure le troisième ?`, `Dans un triangle, deux angles font ${d}°. Calcule le troisième.`, `Il reste un angle. Les 2 autres font ${d}°. Combien mesure-t-il ?`]),
    `${180 - d}°`,
    `180 − ${d} = ${180 - d}°.`,
  );
}
function genSommeEcart(): Q {
  const mode = pick(["manque", "trop", "somme", "somme"] as const);
  if (mode === "manque" || mode === "trop") {
    const [a, b, c] = trioPossible();
    const d = pick([10, 20, 30]);
    const faux = mode === "manque" ? [a, b, c - d > 5 ? c - d : c] : [a, b, c + d];
    const s = faux[0] + faux[1] + faux[2];
    if (s === 180) return genSommeEcart();
    return court(
      mode === "manque"
        ? pick([`Trois angles mesurent ${ecrireTrio(faux)}. Combien manque-t-il pour faire 180° ?`, `Trois angles mesurent ${ecrireTrio(faux)}. Calcule l’écart de leur total avec 180°.`])
        : pick([`Trois angles mesurent ${ecrireTrio(faux)}. Leur total dépasse 180° de combien ?`, `Trois angles mesurent ${ecrireTrio(faux)}. Combien de degrés de trop pour faire 180° ?`]),
      `${Math.abs(180 - s)}°`,
      `${faux[0]} + ${faux[1]} + ${faux[2]} = ${s}. L’écart avec 180 est ${Math.abs(180 - s)}°.`,
    );
  }
  const oui = Math.random() < 0.5;
  const v = oui ? 180 : pick([170, 190, 200, 210, 360]);
  const [X, Y, Z] = sommetsTriangle();
  return vraiFaux(
    pick([`Les angles du triangle ${X}${Y}${Z} font ${v}° en tout. Vrai ou faux ?`, `La somme des angles d’un triangle peut valoir ${v}°. Vrai ou faux ?`, `Les 3 angles d’un triangle font ${v}° en tout. Vrai ou faux ?`]),
    oui,
    "La somme des angles d’un triangle vaut toujours 180°.",
  );
}
function genSommeEgaux(): Q {
  const mode = pick(["trois", "deuxConnus", "deuxInconnus"] as const);
  if (mode === "trois")
    return court(
      pick(["Trois angles égaux font 180°. Combien mesure chacun ?", "Un triangle a 3 angles égaux. Calcule un de ces angles.", "Les 3 angles d’un triangle sont égaux. Combien mesure chacun ?"]),
      "60°",
      "180 ÷ 3 = 60°.",
    );
  if (mode === "deuxConnus") {
    const b = pick([20, 30, 40, 50, 70, 80]);
    return court(
      pick([`Dans un triangle, deux angles mesurent ${b}° chacun. Calcule le troisième.`, `Dans un triangle, deux angles égaux font ${b}° chacun. Combien mesure le troisième ?`, `Dans un triangle, deux angles mesurent ${b}° chacun. Trouve le dernier.`, `Dans un triangle, deux angles mesurent ${b}° chacun. Que reste-t-il pour le troisième ?`]),
      `${180 - 2 * b}°`,
      `${b} + ${b} = ${2 * b}. Il reste 180 − ${2 * b} = ${180 - 2 * b}°.`,
    );
  }
  const c = pick([20, 40, 60, 80, 100, 120]);
  return court(
    pick([`Dans un triangle, un angle mesure ${c}°. Les 2 autres sont égaux. Combien mesure chacun ?`, `Un triangle a un angle de ${c}°. Les 2 autres sont égaux. Calcule chacun.`, `Dans un triangle, un angle mesure ${c}°. Les 2 autres sont égaux. Trouve leur mesure.`]),
    `${(180 - c) / 2}°`,
    `180 − ${c} = ${180 - c}, puis ${180 - c} ÷ 2 = ${(180 - c) / 2}°.`,
  );
}

// ----- TRIANGLE_ANGLE_MANQUANT, ★1 : le geste nu, avec des dizaines.
function deuxAnglesRonds() {
  for (;;) {
    const a = randomInt(3, 9) * 10;
    const b = randomInt(3, 9) * 10;
    const rep = 180 - a - b;
    if (rep >= 20 && !(a === 90 && b === 90)) return { a, b, rep };
  }
}
const pourquoiManquant = (a: number, b: number, rep: number) => `Les trois angles font 180°. 180 − ${a} − ${b} = ${rep}°.`;
function pieges(a: number, b: number, rep: number) {
  return shuffle([...new Set([a + b, 180 - a, 180 - b, rep + 10, rep - 10, 360 - a - b])].filter((x) => x > 0 && x !== rep)).slice(0, 3).map((x) => `${x}°`);
}
function genManquantCalcul(): Q {
  const { a, b, rep } = deuxAnglesRonds();
  const mode = pick(["calcul", "trou", "somme"] as const);
  if (mode === "calcul") return court(pick([`Calcule 180° − ${a}° − ${b}°.`, `Effectue 180° − ${a}° − ${b}°.`, `Combien font 180° − ${a}° − ${b}° ?`]), `${rep}°`, pourquoiManquant(a, b, rep));
  if (mode === "trou") return court(pick([`Complète : ${a}° + ${b}° + … = 180°.`, `Trouve ce qui manque : ${a}° + ${b}° + … = 180°.`, `Quel angle manque : ${a}° + ${b}° + … = 180° ?`, `Trouve l’angle qui manque : ${a}° + … + ${b}° = 180°.`]), `${rep}°`, pourquoiManquant(a, b, rep));
  const d = a + b;
  return court(pick([`Dans un triangle, deux angles font ${d}° en tout. Trouve le troisième.`, `Dans un triangle, deux angles font ${d}°. Combien mesure le troisième ?`, `Calcule le troisième angle : les 2 autres font ${d}°.`]), `${rep}°`, `Les trois angles font 180°. 180 − ${d} = ${rep}°.`);
}
function genManquantFigure1(): Q {
  const { a, b, rep } = deuxAnglesRonds();
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as Noms;
  const canvas = figure(pointsParAngles(a, b), noms, { angleLabels: { A: `${a}°`, B: `${b}°`, C: "?" } });
  if (Math.random() < 0.5)
    return court(`${voir()} ${pick(["Calcule l’angle marqué « ? ».", "Combien mesure l’angle marqué « ? » ?", "Trouve l’angle marqué « ? »."])}`, `${rep}°`, pourquoiManquant(a, b, rep), canvas);
  return qcm(`${voir()} ${pick(["Choisis la mesure de l’angle « ? ».", "Quelle est la mesure de l’angle « ? » ?", "Quel nombre remplace le « ? » ?"])}`, `${rep}°`, pieges(a, b, rep), pourquoiManquant(a, b, rep), canvas);
}
function genManquantQcm1(): Q {
  const { a, b, rep } = deuxAnglesRonds();
  if (Math.random() < 0.3)
    return court(pick([`Deux angles mesurent ${a}° et ${b}°. Combien font-ils ensemble ?`, `Additionne les angles ${a}° et ${b}°.`]), `${a + b}°`, `${a} + ${b} = ${a + b}°. Pour le troisième, on enlèverait ce nombre à 180°.`);
  return qcm(
    pick([
      `Deux angles mesurent ${a}° et ${b}°. Choisis le troisième.`,
      `Un triangle a des angles de ${a}° et ${b}°. Trouve le dernier.`,
      `Deux angles d’un triangle valent ${a}° et ${b}°. Quel est le troisième ?`,
      `Trouve le troisième angle : ${a}° et ${b}°.`,
      `Choisis le troisième angle : ${a}° et ${b}°.`,
      `Deux angles valent ${a}° et ${b}°. Trouve le dernier.`,
      `Quel angle complète ${a}° et ${b}° ?`,
      `Un triangle : ${a}°, ${b}° et … Quel angle manque ?`,
    ]),
    `${rep}°`,
    pieges(a, b, rep),
    pourquoiManquant(a, b, rep),
  );
}

function genManquantNomme1(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const noms = shuffle([X, Y, Z]) as Noms;
  const [U, V, S] = noms;
  if (Math.random() < 0.65) {
    const { a, b, rep } = deuxAnglesRonds();
    return court(
      `${pick([`Dans le triangle ${N},`, `Triangle ${N} :`])} ${chapeau(U)} = ${a}° et ${chapeau(V)} = ${b}°. ${pick([`Calcule ${chapeau(S)}.`, `Trouve ${chapeau(S)}.`, `Combien mesure ${chapeau(S)} ?`, `Donne ${chapeau(S)}.`])}`,
      `${rep}°`,
      pourquoiManquant(a, b, rep),
      figure(pointsParAngles(a, b), noms, { angleLabels: { A: `${a}°`, B: `${b}°`, C: "?" } }),
    );
  }
  // Le petit carré vaut 90° : on le dit, l'élève fait le calcul.
  const a = pick([20, 30, 40, 50, 60, 70]);
  return court(
    `${pick(["Le petit carré marque 90°.", "Le petit carré vaut 90°.", "Ici, un angle est droit."])} ${pick(["Calcule l’angle marqué « ? ».", "Trouve l’angle marqué « ? ».", "Combien mesure l’angle marqué « ? » ?"])}`,
    `${90 - a}°`,
    `180 − 90 − ${a} = ${90 - a}°.`,
    figure(pointsParAngles(a, 90 - a), noms, { marks: { rightAngleAt: "C" }, angleLabels: { A: `${a}°`, B: "?", C: "90°" } }),
  );
}

// ----- TRIANGLE_ANGLE_MANQUANT, ★2
function genManquantRectIso(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const [S, U, V] = shuffle([X, Y, Z]);
  if (Math.random() < 0.5) {
    const a = randomInt(20, 70);
    if (a === 45) return genManquantRectIso();
    return court(
      `${pick([`Le triangle ${N} est rectangle en ${S},`, `Dans le triangle ${N} rectangle en ${S},`])} ${chapeau(U)} = ${a}°. ${pick([`Calcule ${chapeau(V)}.`, `Trouve ${chapeau(V)}.`, `Combien mesure ${chapeau(V)} ?`, `Quelle est la mesure de ${chapeau(V)} ?`])}`,
      `${90 - a}°`,
      `L’angle droit en ${S} mesure 90°. 180 − 90 − ${a} = ${90 - a}°.`,
      figure(pointsParAngles(a, 90 - a), [U, V, S], { marks: { rightAngleAt: "C" }, angleLabels: { A: `${a}°`, B: "?" } }),
    );
  }
  const base = pick([20, 30, 35, 40, 50, 55, 65, 70, 75, 80]);
  const som = 180 - 2 * base;
  if (Math.random() < 0.5)
    return court(
      `${pick([`Le triangle ${N} est isocèle en ${S},`, `Dans le triangle ${N} isocèle en ${S},`])} ${chapeau(U)} = ${base}°. ${pick([`Calcule ${chapeau(V)}.`, `Trouve ${chapeau(V)}.`, `Combien mesure ${chapeau(V)} ?`])}`,
      `${base}°`,
      `Isocèle en ${S} : les angles en ${U} et en ${V} sont égaux.`,
      figure(pointsParAngles(base, base), [U, V, S], { marks: { equalSides: [["BC", "CA"]] }, angleLabels: { A: `${base}°`, B: "?" } }),
    );
  return court(
    `${pick([`Le triangle ${N} est isocèle en ${S},`, `Dans le triangle ${N} isocèle en ${S},`])} ${chapeau(U)} = ${base}°. ${pick([`Calcule ${chapeau(S)}.`, `Trouve ${chapeau(S)}.`, `Combien mesure ${chapeau(S)} ?`])}`,
    `${som}°`,
    `Isocèle en ${S} : l’angle en ${V} mesure aussi ${base}°. 180 − ${base} − ${base} = ${som}°.`,
    figure(pointsParAngles(base, base), [U, V, S], { marks: { equalSides: [["BC", "CA"]] }, angleLabels: { A: `${base}°`, C: "?" } }),
  );
}
function genManquantEgaux(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const [S, U, V] = shuffle([X, Y, Z]);
  if (Math.random() < 0.33) {
    // La question par l'autre bout : on donne la somme des deux, pas les deux.
    const n = pick(["rectangle", "obtus", "aigu"] as const);
    const [p, q, g] = anglesDeNature(n);
    return court(
      pick([
        `${chapeau(U)} + ${chapeau(V)} = ${p + q}°. Calcule ${chapeau(S)}.`,
        `${chapeau(U)} + ${chapeau(V)} = ${p + q}°. Trouve ${chapeau(S)}.`,
        `${chapeau(U)} + ${chapeau(V)} = ${p + q}°. Combien mesure ${chapeau(S)} ?`,
        `Combien mesure ${chapeau(S)} si ${chapeau(U)} + ${chapeau(V)} = ${p + q}° ?`,
      ]),
      `${g}°`,
      `Les trois angles font 180°. 180 − ${p + q} = ${g}°.`,
    );
  }
  if (Math.random() < 0.5) {
    const b = pick([20, 30, 40, 50, 70, 80]);
    return court(
      pick([
        `${chapeau(U)} et ${chapeau(V)} mesurent ${b}° chacun. Calcule ${chapeau(S)}.`,
        `${chapeau(U)} et ${chapeau(V)} mesurent ${b}° chacun. Trouve ${chapeau(S)}.`,
        `Combien mesure ${chapeau(S)} si ${chapeau(U)} et ${chapeau(V)} mesurent ${b}° chacun ?`,
      ]),
      `${180 - 2 * b}°`,
      `${b} + ${b} = ${2 * b}. 180 − ${2 * b} = ${180 - 2 * b}°.`,
      figure(pointsParAngles(b, b), [U, V, S], { angleLabels: { A: `${b}°`, B: `${b}°`, C: "?" } }),
    );
  }
  const c = pick([20, 40, 80, 100, 120, 140]);
  const r = (180 - c) / 2;
  return court(
    pick([
      `${chapeau(S)} = ${c}°. ${chapeau(U)} et ${chapeau(V)} sont égaux. Calcule ${chapeau(U)}.`,
      `${chapeau(S)} = ${c}°. Les 2 autres angles sont égaux. Trouve ${chapeau(U)}.`,
      `${chapeau(U)} et ${chapeau(V)} sont égaux, ${chapeau(S)} = ${c}°. Combien mesure ${chapeau(U)} ?`,
    ]),
    `${r}°`,
    `180 − ${c} = ${180 - c}, puis ${180 - c} ÷ 2 = ${r}°.`,
    figure(pointsParAngles(r, r), [U, V, S], { angleLabels: { A: "?", C: `${c}°` } }),
  );
}
function genManquantLire2(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const noms = shuffle([X, Y, Z]) as Noms;
  const mode = pick(["general", "general", "carre", "code"] as const);
  if (mode === "general") {
    const t = triangleAngles(pick(["obtus", "aigu"] as const));
    const canvas = figure(t.pts, noms, { angleLabels: { A: `${t.angA}°`, B: `${t.angB}°`, C: "?" } });
    const pourquoi = pourquoiManquant(t.angA, t.angB, t.g);
    if (Math.random() < 0.5) return qcm(`${voir()} ${pick(["Quel angle cache le « ? » ?", "Choisis la mesure de l’angle « ? ».", "Quel nombre remplace le « ? » ?"])}`, `${t.g}°`, pieges(t.angA, t.angB, t.g), pourquoi, canvas);
    return court(`${voir()} ${pick(["Calcule l’angle « ? ».", "Écris la mesure de l’angle « ? ».", "Trouve le nombre caché par « ? »."])}`, `${t.g}°`, pourquoi, canvas);
  }
  if (mode === "carre") {
    let a = randomInt(20, 70);
    if (a === 45) a = 40;
    return court(
      `${pick(["Le petit carré vaut 90°.", "Un angle est droit.", "Lis le petit carré."])} ${pick(["Calcule l’angle « ? ».", "Écris la mesure de l’angle « ? ».", "Trouve le nombre caché par « ? »."])}`,
      `${90 - a}°`,
      `180 − 90 − ${a} = ${90 - a}°.`,
      figure(pointsParAngles(a, 90 - a), noms, { marks: { rightAngleAt: "C" }, angleLabels: { A: `${a}°`, B: "?", C: "90°" } }),
    );
  }
  const base = pick([30, 35, 40, 50, 55, 65, 70, 75]);
  const som = 180 - 2 * base;
  const cas = pick([
    { lab: { A: `${base}°`, B: "?" }, r: base, p: "Les deux côtés codés sont égaux : les angles à leur pied aussi." },
    { lab: { A: `${base}°`, C: "?" }, r: som, p: `Les deux angles du bas mesurent ${base}°. 180 − ${base} − ${base} = ${som}°.` },
    { lab: { C: `${som}°`, A: "?" }, r: base, p: `180 − ${som} = ${2 * base}, puis ${2 * base} ÷ 2 = ${base}°.` },
  ]);
  return court(
    `${pick(["Deux côtés sont codés égaux.", "Ce triangle est isocèle.", "Lis les codages."])} ${pick(["Calcule l’angle « ? ».", "Écris la mesure de l’angle « ? ».", "Trouve le nombre caché par « ? »."])}`,
    `${cas.r}°`,
    cas.p,
    figure(pointsParAngles(base, base), noms, { marks: { equalSides: [["BC", "CA"]] }, angleLabels: cas.lab as TriangleCanvasData["angleLabels"] }),
  );
}
function genManquantControle(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const [P1, P2, P3] = shuffle([X, Y, Z]);
  const n = pick(["rectangle", "obtus", "aigu"] as const);
  const [p, q, g] = anglesDeNature(n);
  const mode = pick(["vf", "nature", "trou"] as const);
  if (mode === "vf") {
    const vrai = Math.random() < 0.5;
    const annonce = vrai ? g : g + pick([-10, 10, 20]);
    return vraiFaux(
      pick([
        `${chapeau(P1)} = ${p}° et ${chapeau(P2)} = ${q}°, donc ${chapeau(P3)} = ${annonce}°. Vrai ou faux ?`,
        `Si ${chapeau(P1)} = ${p}° et ${chapeau(P2)} = ${q}°, alors ${chapeau(P3)} = ${annonce}°. Vrai ou faux ?`,
        `${chapeau(P1)} = ${p}°, ${chapeau(P2)} = ${q}° et ${chapeau(P3)} = ${annonce}° : vrai ou faux ?`,
      ]),
      vrai,
      `180 − ${p} − ${q} = ${g}°.`,
    );
  }
  if (mode === "nature") {
    const r = n === "rectangle" ? "droit" : n === "obtus" ? "obtus" : "aigu";
    return qcm(
      `${chapeau(P1)} = ${p}° et ${chapeau(P2)} = ${q}°. ${pick([`${chapeau(P3)} est-il aigu, droit ou obtus ?`, `Quel mot décrit ${chapeau(P3)} ?`, `Choisis le mot pour ${chapeau(P3)}.`])}`,
      r,
      NATURES_UN_ANGLE.filter((x) => x !== r),
      `180 − ${p} − ${q} = ${g}°. ${pourquoiUnAngle(g)}`,
    );
  }
  const [u, v] = shuffle([p, q, g]);
  const w = 180 - u - v;
  return court(
    pick([`Angles du triangle : ${u}°, … et ${v}°. Trouve l’angle manquant.`, `Complète les angles du triangle : ${u}°, ${v}° et … .`, `Le triangle a les angles ${u}° et ${v}°. Écris le dernier.`]),
    `${w}°`,
    `180 − ${u} − ${v} = ${w}°.`,
  );
}

// ----- TRIANGLE_POSSIBLE_OU_NON, ★1 : le geste nu de l'inégalité triangulaire.
/** Trois longueurs entières distinctes, écart franc, dans le désordre. */
function longueursClaires(cas: "possible" | "impossible", u: "cm" | "m" = Math.random() < 0.75 ? "cm" : "m") {
  for (;;) {
    const ls = [randomInt(2, 15), randomInt(2, 15), randomInt(2, 15)];
    if (new Set(ls).size !== 3) continue;
    const [x, y, z] = [...ls].sort((p, q) => p - q);
    const e = (x + y - z) / z;
    if (cas === "possible" && e < 0.25) continue;
    if (cas === "impossible" && e > -0.25) continue;
    return { ls, x, y, z, u };
  }
}
const liste3 = (ls: number[], u: string, lien = "et") => `${ls[0]} ${u}, ${ls[1]} ${u} ${lien} ${ls[2]} ${u}`;
function genPossibleGrand(): Q {
  const { ls, x, y, z, u } = longueursClaires(pick(["possible", "impossible"] as const));
  const mode = pick(["grand", "petits", "somme"] as const);
  if (mode === "grand")
    return qcm(
      pick([`Le plus grand : ${liste3(ls, u, "ou")} ?`, `Choisis le plus grand côté : ${liste3(ls, u)}.`, `Trouve le plus long côté : ${liste3(ls, u)}.`, `Plus grand côté : ${liste3(ls, u, "ou")} ?`]),
      `${z} ${u}`,
      [`${x} ${u}`, `${y} ${u}`],
      `On compare les trois longueurs : le plus grand côté mesure ${z} ${u}.`,
    );
  if (mode === "petits")
    return qcm(
      pick([`Les 2 plus petits côtés : ${liste3(ls, u)} ?`, `Choisis les 2 plus petits : ${liste3(ls, u)}.`, `Trouve les 2 plus courts : ${liste3(ls, u)}.`]),
      `${x} ${u} et ${y} ${u}`,
      [`${x} ${u} et ${z} ${u}`, `${y} ${u} et ${z} ${u}`],
      `Le plus grand est ${z} ${u}. Il reste ${x} ${u} et ${y} ${u}.`,
    );
  return court(
    pick([`Additionne les 2 plus petits : ${liste3(ls, u)}.`, `Additionne les 2 plus courts : ${liste3(ls, u)}.`, `Ajoute les 2 plus petits : ${liste3(ls, u)}.`, `Somme des 2 plus petits : ${liste3(ls, u)} ?`]),
    `${x + y} ${u}`,
    `Les deux plus petits sont ${x} et ${y} : ${x} + ${y} = ${x + y} ${u}.`,
  );
}
function genPossibleComparer(): Q {
  const cas = pick(["<", ">", "="] as const);
  let x = randomInt(2, 12);
  let y = randomInt(2, 12);
  if (x === y) y += 1;
  if (x > y) [x, y] = [y, x];
  const z = cas === "=" ? x + y : cas === ">" ? x + y - randomInt(1, Math.max(1, x - 1)) : x + y + randomInt(1, 6);
  return qcm(
    pick([
      `Compare ${x} + ${y} et ${z}. Choisis <, > ou =.`,
      `Quel signe entre ${x} + ${y} et ${z} ?`,
      `Choisis le signe : ${x} + ${y} … ${z}.`,
      `Écris <, > ou = : ${x} + ${y} … ${z}.`,
      `Que mettre entre ${x} + ${y} et ${z} : <, > ou = ?`,
      `Complète avec <, > ou = : ${x} + ${y} … ${z}.`,
      `Compare ${x} + ${y} et ${z}.`,
      `Quel signe convient : ${x} + ${y} … ${z} ?`,
      `Calcule d’abord. Quel signe entre ${x} + ${y} et ${z} ?`,
      `Quel signe faut-il : ${x} + ${y} … ${z} ?`,
    ]),
    cas,
    ["<", ">", "="].filter((c) => c !== cas),
    `${x} + ${y} = ${x + y}. On compare ${x + y} et ${z}.`,
  );
}
function genPossibleConclure(): Q {
  const c = pick(["possible", "impossible"] as const);
  const { ls, x, y, z, u } = longueursClaires(c);
  const mode = pick(["petitsFont", "petitsFont", "direct", "direct", "regle"] as const);
  const oui = c === "possible";
  const pourquoi = pourquoiPossible(ls, u);
  if (mode === "petitsFont")
    return ouiNon(
      pick([
        `Les petits côtés font ${x + y} ${u}, le grand ${z} ${u}. Est-ce possible ?`,
        `Les petits côtés font ${x + y} ${u}. Le grand fait ${z} ${u}. Possible ?`,
        `Le grand côté fait ${z} ${u}, les autres ensemble ${x + y} ${u}. Possible ?`,
        `Le grand fait ${z} ${u}, les petits font ${x + y} ${u}. Est-ce possible ?`,
        `Le grand fait ${z} ${u}, les petits ${x + y} ${u} en tout. Possible ?`,
        `Les petits font ${x + y} ${u} en tout, le grand ${z} ${u}. Possible ?`,
      ]),
      oui,
      pourquoi,
    );
  if (mode === "direct") return ouiNon(pick([`Un triangle de côtés ${liste3(ls, u)} existe-t-il ?`, `Existe-t-il un triangle de ${liste3(ls, u)} ?`, `Peut-on tracer un triangle de ${liste3(ls, u)} ?`, `Ces longueurs forment-elles un triangle : ${liste3(ls, u)} ?`, `Forme-t-on un triangle avec ${liste3(ls, u)} ?`]), oui, pourquoi);
  const vrai = Math.random() < 0.5;
  return ouiNon(
    vrai
      ? pick(["Les 2 petits côtés doivent-ils faire plus que le grand ?", "Le grand côté doit-il être plus court que les 2 autres réunis ?"])
      : pick(["Les 2 petits côtés doivent-ils faire moins que le grand ?", "Le grand côté doit-il être plus long que les 2 autres réunis ?"]),
    vrai,
    "Pour qu’un triangle existe, les deux petits côtés réunis doivent dépasser le grand : sinon, ils ne se rejoignent pas.",
  );
}

// ----- TRIANGLE_POSSIBLE_OU_NON, ★2
function genPossibleTroisieme(): Q {
  const a = randomInt(5, 14);
  const b = randomInt(3, a - 1);
  const lo = a - b;
  const hi = a + b;
  const dedans: number[] = [];
  for (let x = lo + 1; x < hi; x++) dedans.push(x);
  const dehors = shuffle([hi, hi + 1, hi + 2, hi + 4, lo, lo > 1 ? lo - 1 : hi + 3].filter((x) => x > 0));
  const uniques = [...new Set(dehors)];
  if (Math.random() < 0.6)
    return qcm(
      pick([
        `Un triangle a des côtés de ${a} cm et ${b} cm. Choisis le troisième.`,
        `Deux côtés mesurent ${a} cm et ${b} cm. Quel troisième côté convient ?`,
        `Deux côtés mesurent ${a} cm et ${b} cm. Quelle longueur peut fermer le triangle ?`,
        `Quel troisième côté va avec ${a} cm et ${b} cm ?`,
        `Avec ${a} cm et ${b} cm, quelle longueur peut fermer le triangle ?`,
        `Trouve le troisième côté possible : ${a} cm et ${b} cm.`,
      ]),
      `${pick(dedans)} cm`,
      uniques.slice(0, 3).map((x) => `${x} cm`),
      `Le troisième côté doit être plus petit que ${a} + ${b} = ${hi} cm et plus grand que ${a} − ${b} = ${lo} cm.`,
    );
  const bons = shuffle(dedans).slice(0, 3).map((x) => `${x} cm`);
  return qcm(
    pick([`Deux côtés font ${a} cm et ${b} cm. Quel troisième côté est impossible ?`, `Deux côtés mesurent ${a} cm et ${b} cm. Trouve le troisième côté impossible.`, `Quel troisième côté est impossible avec ${a} cm et ${b} cm ?`]),
    `${uniques[0]} cm`,
    bons,
    `Le troisième côté doit être plus petit que ${a} + ${b} = ${hi} cm et plus grand que ${a} − ${b} = ${lo} cm.`,
  );
}
function genPossibleSeries(): Q {
  const ser = (c: "possible" | "impossible") => {
    const { ls } = longueursClaires(c, "cm");
    return liste3(ls, "cm");
  };
  const uniques = (c: "possible" | "impossible", n: number) => {
    const r = new Set<string>();
    while (r.size < n) r.add(ser(c));
    return [...r];
  };
  if (Math.random() < 0.5)
    return qcm(
      pick(["Quelles longueurs forment un triangle ?", "Choisis les 3 côtés d’un vrai triangle.", "Trouve les longueurs d’un triangle possible.", "Avec quelles longueurs peut-on fermer le triangle ?", "Quelle série donne un vrai triangle ?"]),
      ser("possible"),
      uniques("impossible", 3),
      "On additionne les deux plus petits de chaque série. Seule la bonne série dépasse son plus grand côté.",
    );
  return qcm(
    pick(["Quelles longueurs ne forment pas de triangle ?", "Trouve l’intrus : quelle série ne forme pas de triangle ?", "Quelle série ne peut pas fermer un triangle ?", "Avec quelles longueurs le triangle reste-t-il ouvert ?", "Quelle série est impossible pour un triangle ?"]),
    ser("impossible"),
    uniques("possible", 3),
    "On additionne les deux plus petits de chaque série. Pour l’intrus, ils ne rejoignent pas le plus grand.",
  );
}
function genPossibleNomme(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const c = pick(["possible", "impossible"] as const);
  const { x, y, z, u } = longueursClaires(c);
  const mode = pick(["troisieme", "troisieme", "max", "min", "petits", "addition", "addition"] as const);
  const oui = c === "possible";
  if (mode === "addition")
    return ouiNon(
      pick([
        `${x} + ${y} = ${x + y} et le grand côté mesure ${z} ${u}. Le triangle existe-t-il ?`,
        `Le grand côté fait ${z} ${u}. Petits côtés : ${x} + ${y} = ${x + y}. Le triangle existe-t-il ?`,
        `${x} + ${y} = ${x + y}. Le grand côté mesure ${z} ${u}. Peut-on fermer le triangle ?`,
      ]),
      oui,
      pourquoiPossible([x, y, z], u),
    );
  if (mode === "troisieme") {
    // Les deux premiers côtés sont les deux plus petits : le troisième est-il atteignable ?
    return ouiNon(
      pick([
        `${lg(X, Y)} = ${x} ${u} et ${lg(Y, Z)} = ${y} ${u}. ${lg(X, Z)} peut-il mesurer ${z} ${u} ?`,
        `${lg(X, Z)} peut-il mesurer ${z} ${u} si ${lg(X, Y)} = ${x} ${u} et ${lg(Y, Z)} = ${y} ${u} ?`,
        `${lg(X, Y)} = ${x} ${u}, ${lg(Y, Z)} = ${y} ${u}, ${lg(X, Z)} = ${z} ${u}. Ce triangle existe-t-il ?`,
      ]),
      oui,
      pourquoiPossible([x, y, z], u),
    );
  }
  const a = randomInt(5, 14);
  const b = randomInt(2, a - 1);
  if (mode === "max")
    return court(
      pick([`Deux côtés mesurent ${a} cm et ${b} cm. Donne le plus grand troisième côté entier.`, `Deux côtés font ${a} cm et ${b} cm. Trouve le plus grand troisième côté entier.`]),
      `${a + b - 1} cm`,
      `Il doit rester plus petit que ${a} + ${b} = ${a + b} cm. En cm entiers : ${a + b - 1} cm.`,
    );
  if (mode === "min")
    return court(
      pick([`Deux côtés mesurent ${a} cm et ${b} cm. Trouve le plus petit troisième côté entier.`, `Deux côtés font ${a} cm et ${b} cm. Donne le plus petit troisième côté entier.`]),
      `${a - b + 1} cm`,
      `Il doit être plus grand que ${a} − ${b} = ${a - b} cm. En cm entiers : ${a - b + 1} cm.`,
    );
  return ouiNon(
    pick([`Les 2 petits côtés font ${x + y} ${u}. Le grand mesure ${z} ${u}. Le triangle existe-t-il ?`, `Le grand côté fait ${z} ${u}, les 2 autres font ${x + y} ${u}. Le triangle existe-t-il ?`]),
    oui,
    pourquoiPossible([x, y, z], u),
  );
}

// ----- TRIANGLE_PROPRIETE_DEFI, ★1
function genProprieteSomme1(): Q {
  const oui = Math.random() < 0.5;
  const t = oui ? trioPossible() : trioFaux();
  const s = t[0] + t[1] + t[2];
  const mode = pick(["calcul", "choisir"] as const);
  if (mode === "calcul")
    return ouiNon(
      pick([
        `Calcule ${t[0]}° + ${t[1]}° + ${t[2]}°. Ce triangle existe-t-il ?`,
        `Additionne ${ecrireTrio(t)}. Ce triangle existe-t-il ?`,
        `Un triangle a des angles de ${ecrireTrio(t)}. Existe-t-il ?`,
        `Un triangle a des angles de ${ecrireTrio(t)}. Possible ?`,
      ]),
      s === 180,
      `${t[0]} + ${t[1]} + ${t[2]} = ${s}. ${s === 180 ? "On trouve 180° : c’est possible." : "Ce n’est pas 180° : ce triangle n’existe pas."}`,
    );
  return qcm(
    pick(["Quels angles forment un vrai triangle ?", "Choisis les angles d’un triangle possible.", "Quel triangle existe ?"]),
    ecrireTrio(trioPossible()),
    seriesAngles(trioFaux, 3),
    "On additionne chaque série : seule la bonne fait 180°.",
  );
}
function genProprieteCalcul1(): Q {
  const mode = pick(["equi", "troisieme", "troisieme", "isocele"] as const);
  if (mode === "equi")
    return court(
      pick(["Un triangle équilatéral : combien mesure chaque angle ?", "Combien mesure un angle d’un triangle équilatéral ?", "Calcule un angle d’un triangle équilatéral."]),
      "60°",
      "Ses trois angles sont égaux : 180 ÷ 3 = 60°.",
    );
  if (mode === "isocele") {
    const b = pick([30, 40, 50, 60, 70]);
    return court(
      pick([`Deux angles égaux mesurent ${b}°. Calcule le troisième.`, `Un triangle a 2 angles de ${b}°. Trouve le troisième.`, `Un triangle a deux angles de ${b}°. Combien mesure le troisième ?`]),
      `${180 - 2 * b}°`,
      `${b} + ${b} = ${2 * b}. 180 − ${2 * b} = ${180 - 2 * b}°.`,
    );
  }
  const { a, b, rep } = deuxAnglesRonds();
  return court(
    pick([`Dans un triangle, deux angles mesurent ${a}° et ${b}°. Calcule le troisième.`, `Deux angles d’un triangle font ${a}° et ${b}°. Combien mesure le troisième ?`, `Un triangle a des angles de ${a}° et ${b}°. Trouve le dernier.`]),
    `${rep}°`,
    pourquoiManquant(a, b, rep),
  );
}
const VF_PROPRIETE_1: Array<[string, boolean, string]> = [
  ["Un triangle peut avoir 2 angles droits.", false, "90 + 90 = 180 : il ne reste rien pour le troisième angle."],
  ["Un triangle peut avoir un angle droit.", true, "C’est un triangle rectangle."],
  ["Un triangle peut avoir 2 angles obtus.", false, "Deux angles obtus font déjà plus de 180°."],
  ["Un triangle peut avoir un angle obtus.", true, "C’est un triangle obtusangle."],
  ["Un triangle peut avoir 3 angles aigus.", true, "C’est un triangle acutangle."],
  ["Les 3 angles d’un triangle font 180°.", true, "C’est vrai dans tous les triangles."],
  ["Les 3 angles d’un triangle font 360°.", false, "Ils font 180°."],
  ["Un triangle équilatéral a 3 angles de 60°.", true, "180 ÷ 3 = 60."],
  ["Un triangle a toujours un angle droit.", false, "Seul un triangle rectangle en a un."],
  ["Un triangle a au moins 2 angles aigus.", true, "Sinon, deux grands angles feraient déjà 180° ou plus."],
];
function genProprieteVrai1(): Q {
  const [t, v, r] = pick(VF_PROPRIETE_1);
  return vraiFaux(`${t} Vrai ou faux ?`, v, r);
}

// ----- TRIANGLE_PROPRIETE_DEFI, ★2
function genProprieteIsocele2(): Q {
  const [X, Y, Z] = sommetsTriangle();
  const N = `${X}${Y}${Z}`;
  const [S, U, V] = shuffle([X, Y, Z]);
  const base = pick([20, 30, 35, 40, 50, 55, 65, 70, 75, 80]);
  const som = 180 - 2 * base;
  const canvas = (lab: TriangleCanvasData["angleLabels"]) => figure(pointsParAngles(base, base), [U, V, S], { marks: { equalSides: [["BC", "CA"]] }, angleLabels: lab });
  const mode = pick(["base", "sommet", "reponseVraie", "rect"] as const);
  if (mode === "base")
    return court(
      `Triangle isocèle en ${S}, ${chapeau(U)} = ${base}°. ${pick([`Calcule ${chapeau(S)}.`, `Trouve ${chapeau(S)}.`, `Combien mesure ${chapeau(S)} ?`])}`,
      `${som}°`,
      `Isocèle en ${S} : l’angle en ${V} mesure aussi ${base}°. 180 − ${base} − ${base} = ${som}°.`,
      canvas({ A: `${base}°`, C: "?" }),
    );
  if (mode === "sommet")
    return court(
      `Le triangle ${N} est isocèle en ${S}, ${chapeau(S)} = ${som}°. ${pick([`Calcule ${chapeau(U)}.`, `Trouve ${chapeau(U)}.`, `Combien mesure ${chapeau(U)} ?`])}`,
      `${base}°`,
      `180 − ${som} = ${2 * base}, puis ${2 * base} ÷ 2 = ${base}°.`,
      canvas({ C: `${som}°`, A: "?" }),
    );
  if (mode === "reponseVraie") {
    const vrai = Math.random() < 0.5;
    const annonce = vrai ? som : som + pick([-10, 10, 20]);
    return vraiFaux(
      `Triangle isocèle en ${S}, ${chapeau(U)} = ${base}°, donc ${chapeau(S)} = ${annonce}°. Vrai ou faux ?`,
      vrai,
      `180 − ${base} − ${base} = ${som}°.`,
      canvas({ A: `${base}°` }),
    );
  }
  const r = pick([U, V]);
  return court(
    pick([`Le triangle ${N} est rectangle et isocèle en ${S}. Calcule ${chapeau(r)}.`, `Triangle rectangle isocèle en ${S} : combien mesure ${chapeau(r)} ?`, `Triangle rectangle isocèle en ${S}. Trouve ${chapeau(r)}.`]),
    "45°",
    "L’angle droit prend 90°. Les deux autres se partagent 90° : 45° chacun.",
    figure(pointsParAngles(45, 45), [U, V, S], { marks: { rightAngleAt: "C", equalSides: [["BC", "CA"]] } }),
  );
}
const VF_PROPRIETE_2: Array<[string, boolean, string]> = [
  ["Un triangle peut avoir un angle droit et un angle obtus.", false, "90° + plus de 90° : on dépasse déjà 180°."],
  ["Un triangle rectangle a 2 angles aigus.", true, "Les deux autres se partagent 90° : chacun fait moins de 90°."],
  ["Un triangle obtusangle a 2 angles aigus.", true, "Il reste moins de 90° pour les deux autres."],
  ["Un triangle isocèle a 2 angles égaux.", true, "Les angles à la base sont égaux."],
  ["Un triangle peut avoir un angle de 180°.", false, "Il ne resterait rien pour les deux autres : les trois points seraient alignés."],
  ["Les 2 angles aigus d’un triangle rectangle font 90°.", true, "180 − 90 = 90."],
  ["Un triangle de côtés 3 cm, 4 cm et 9 cm existe.", false, "3 + 4 = 7, moins que 9."],
  ["Un triangle de côtés 5 cm, 6 cm et 7 cm existe.", true, "5 + 6 = 11, plus que 7."],
];
function genProprieteAuPlus(): Q {
  const mode = pick(["nombre", "vf", "vf"] as const);
  if (mode === "vf") {
    const [t, v, r] = pick(VF_PROPRIETE_2);
    return vraiFaux(`${t} Vrai ou faux ?`, v, r);
  }
  const cas = pick([
    { t: pick(["Combien d’angles obtus un triangle a-t-il au plus ?", "Un triangle a au plus combien d’angles obtus ?"]), r: "1", p: "Deux angles obtus feraient déjà plus de 180°." },
    { t: pick(["Combien d’angles droits un triangle a-t-il au plus ?", "Un triangle a au plus combien d’angles droits ?"]), r: "1", p: "Deux angles droits feraient déjà 180°." },
    { t: pick(["Combien d’angles aigus un triangle a-t-il au moins ?", "Un triangle a au moins combien d’angles aigus ?"]), r: "2", p: "Un seul angle peut être droit ou obtus : les deux autres sont aigus." },
    { t: pick(["Combien d’angles aigus un triangle a-t-il au plus ?", "Un triangle a au plus combien d’angles aigus ?"]), r: "3", p: "Le triangle acutangle a ses 3 angles aigus." },
  ]);
  return qcm(cas.t, cas.r, ["0", "1", "2", "3"].filter((x) => x !== cas.r), cas.p);
}
function genProprieteMelange(): Q {
  const mode = pick(["troisAngles", "cotes", "intrus", "somme"] as const);
  if (mode === "troisAngles") {
    const a = pick([50, 60, 70, 80, 90]);
    return ouiNon(
      pick([`Un triangle peut-il avoir 3 angles de ${a}° ?`, `Trois angles de ${a}° : ce triangle existe-t-il ?`, `Existe-t-il un triangle à 3 angles de ${a}° ?`]),
      a === 60,
      `3 × ${a} = ${3 * a}. ${a === 60 ? "On trouve 180°." : "Ce n’est pas 180°."}`,
    );
  }
  if (mode === "cotes") {
    const c = pick(["possible", "impossible"] as const);
    const { ls, u } = longueursClaires(c);
    return ouiNon(
      pick([`Peut-on tracer un triangle de côtés ${liste3(ls, u)} ?`, `${liste3(ls, u)} : ces côtés ferment-ils un triangle ?`, `Peut-on fermer un triangle avec ${liste3(ls, u)} ?`]),
      c === "possible",
      pourquoiPossible(ls, u),
    );
  }
  if (mode === "intrus") {
    const justes = seriesAngles(trioPossible, 3);
    return qcm(pick(["Quel triangle n’existe pas ?", "Trouve le triangle impossible.", "Quels angles sont impossibles pour un triangle ?"]), ecrireTrio(trioFaux()), justes, "On additionne chaque série : l’intrus ne fait pas 180°.");
  }
  const [a, b] = pick([[90, 90], [100, 90], [120, 70], [110, 80], [100, 100]] as const);
  return qcm(
    pick([`Deux angles mesurent ${a}° et ${b}°. Combien reste-t-il pour le troisième ?`, `Avec ${a}° et ${b}°, combien reste-t-il pour le troisième angle ?`]),
    "rien : ce triangle n’existe pas",
    [`${a + b}°`, `${Math.abs(180 - a - b) + 10}°`, "90°"],
    `${a} + ${b} = ${a + b} : on atteint déjà ou on dépasse 180°, il ne reste rien.`,
  );
}

/** Un gabarit de ces séries : mêmes champs que les autres, le code en moins. */
function gabarit(
  id: string,
  notionId: "triangle_figure" | "triangle_propriete",
  microId: string,
  difficulty: 1 | 2 | 3,
  hint: string,
  tags: string[],
  generate: () => Q,
): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId, microId, difficulty, theme: "neutral", hint, tags: ["template", notionId, ...tags], generate };
}
const F = "triangle_figure" as const;
const P_ = "triangle_propriete" as const;
const GABARITS_07_11: TutorBankItemV4[] = [
  gabarit("triangle_nommer_tpl_lire", F, "triangle_nommer", 1, "On nomme un triangle avec ses trois sommets.", ["nommage"], genNommerLire),
  gabarit("triangle_nommer_tpl_lettre", F, "triangle_nommer", 1, "Regarde les trois sommets sur la figure.", ["nommage"], genNommerLettre),
  gabarit("triangle_nommer_tpl_oui_non", F, "triangle_nommer", 1, "Le nom contient les trois sommets, et eux seuls.", ["nommage"], genNommerOuiNon),
  gabarit("triangle_nommer_tpl_ecritures", F, "triangle_nommer", 2, "Les trois lettres peuvent s’écrire dans n’importe quel ordre.", ["nommage"], genNommerEcritures),
  gabarit("triangle_nommer_tpl_intrus", F, "triangle_nommer", 2, "Vérifie les trois lettres : ce sont les trois sommets, tous différents.", ["nommage"], genNommerIntrus),
  gabarit("triangle_nommer_tpl_par_cotes", F, "triangle_nommer", 2, "Les lettres des côtés sont les sommets du triangle.", ["nommage"], genNommerParCotes),

  gabarit("triangle_nommer_tpl_sommets_nus", F, "triangle_nommer", 2, "Les trois lettres du nom sont les trois sommets.", ["nommage"], genNommerSommets2),

  gabarit("triangle_sommet_cote_tpl_lire", F, "triangle_sommet_cote", 1, "Une lettre : un sommet. Deux lettres entre crochets : un côté.", ["sommets", "cotes"], genSommetLire),
  gabarit("triangle_sommet_cote_tpl_mots", F, "triangle_sommet_cote", 1, "Une lettre : un sommet. Deux lettres entre crochets : un côté.", ["sommets", "cotes"], genSommetMots),
  gabarit("triangle_sommet_cote_tpl_oui_non", F, "triangle_sommet_cote", 1, "Regarde les lettres écrites sur la figure.", ["sommets", "cotes"], genSommetOuiNon),
  gabarit("triangle_sommet_cote_tpl_opposes", F, "triangle_sommet_cote", 2, "Le côté opposé à un sommet ne touche pas ce sommet.", ["sommets", "cotes"], genSommetOpposes),
  gabarit("triangle_sommet_cote_tpl_communs", F, "triangle_sommet_cote", 2, "Cherche la lettre présente dans les deux côtés.", ["sommets", "cotes"], genSommetCommuns),
  gabarit("triangle_sommet_cote_tpl_extremites", F, "triangle_sommet_cote", 2, "Les extrémités d’un côté sont ses deux lettres.", ["sommets", "cotes"], genSommetExtremites),

  gabarit("triangle_type_cote_tpl_lire", F, "triangle_type_cote", 1, "Compte les côtés égaux : 3, 2 ou aucun.", ["cotes"], genCoteLire),
  gabarit("triangle_type_cote_tpl_mots", F, "triangle_type_cote", 1, "Équilatéral : 3 côtés égaux. Isocèle : 2. Quelconque : aucun.", ["cotes"], genCoteMots),
  gabarit("triangle_type_cote_tpl_egaux", F, "triangle_type_cote", 1, "Le même codage veut dire la même longueur.", ["cotes"], genCoteEgaux),
  gabarit("triangle_type_cote_tpl_isocele_nu", F, "triangle_type_cote", 2, "Les deux côtés égaux partent du sommet principal.", ["cotes"], genCoteIsocele),
  gabarit("triangle_type_cote_tpl_trios", F, "triangle_type_cote", 2, "Compare les longueurs de chaque série.", ["cotes"], genCoteTrios),
  gabarit("triangle_type_cote_tpl_proprietes", F, "triangle_type_cote", 2, "Équilatéral : 3 côtés égaux. Isocèle : au moins 2.", ["cotes"], genCoteProprietes),

  gabarit("triangle_type_angle_tpl_seul", F, "triangle_type_angle", 1, "Compare à 90° : moins, c’est aigu ; plus, c’est obtus.", ["angle_mesure"], genAngleSeul),
  gabarit("triangle_type_angle_tpl_figure_nue", F, "triangle_type_angle", 1, "Regarde le plus grand angle.", ["angle_mesure"], genAngleFigure1),
  gabarit("triangle_type_angle_tpl_mots", F, "triangle_type_angle", 1, "Rectangle : un angle droit. Obtusangle : un angle obtus. Acutangle : trois angles aigus.", ["angle_mesure"], genAngleMots1),
  gabarit("triangle_type_angle_tpl_deux_nommes", F, "triangle_type_angle", 2, "Trouve le troisième angle : les trois font 180°.", ["angle_mesure"], genAngleDeuxNommes),
  gabarit("triangle_type_angle_tpl_trios", F, "triangle_type_angle", 2, "Regarde le plus grand angle de chaque série.", ["angle_mesure"], genAngleTrios),
  gabarit("triangle_type_angle_tpl_lire", F, "triangle_type_angle", 2, "Compare chaque angle à 90°.", ["angle_mesure"], genAngleLire2),
  gabarit("triangle_type_angle_tpl_metiers", F, "triangle_type_angle", 3, "Trouve le troisième angle, puis regarde le plus grand.", ["angle_mesure", "contexte"], genTypeAngleMetier),

  gabarit("triangle_defi_tpl_lire_codes", F, "triangle_defi", 1, "Petit carré : angle droit. Mêmes petits traits : côtés égaux.", ["defi"], genDefiLireCodes),
  gabarit("triangle_defi_tpl_codes_oui_non", F, "triangle_defi", 1, "Petit carré : angle droit. Mêmes petits traits : côtés égaux.", ["defi"], genDefiCodesOuiNon),
  gabarit("triangle_defi_tpl_mots", F, "triangle_defi", 1, "Rectangle parle de l’angle, isocèle parle des côtés.", ["defi"], genDefiMots1),
  gabarit("triangle_defi_tpl_angles_nature", F, "triangle_defi", 2, "Un angle de 90° ? Des angles égaux ?", ["defi", "angle_mesure"], genDefiAnglesNature),
  gabarit("triangle_defi_tpl_egalites", F, "triangle_defi", 2, "Lis les égalités de côtés, puis l’angle.", ["defi"], genDefiEgalites),
  gabarit("triangle_defi_tpl_vrai_faux", F, "triangle_defi", 2, "Rectangle parle de l’angle, isocèle parle des côtés.", ["defi"], genDefiVraiFaux),

  gabarit("triangle_somme_angle_tpl_addition", P_, "triangle_somme_angle", 1, "Additionne les trois angles.", ["angle_mesure"], genSommeAddition),
  gabarit("triangle_somme_angle_tpl_vrai_faux", P_, "triangle_somme_angle", 1, "Les trois angles d’un triangle font toujours 180°.", ["angle_mesure"], genSommeVraiFaux),
  gabarit("triangle_somme_angle_tpl_trios", P_, "triangle_somme_angle", 1, "Additionne chaque série : il faut 180°.", ["angle_mesure"], genSommeTrios),
  gabarit("triangle_somme_angle_tpl_reste", P_, "triangle_somme_angle", 2, "Enlève ce que tu connais à 180°.", ["angle_mesure"], genSommeReste),
  gabarit("triangle_somme_angle_tpl_ecart", P_, "triangle_somme_angle", 2, "Additionne, puis compare à 180°.", ["angle_mesure"], genSommeEcart),
  gabarit("triangle_somme_angle_tpl_egaux", P_, "triangle_somme_angle", 2, "Des angles égaux se partagent ce qui reste de 180°.", ["angle_mesure"], genSommeEgaux),

  gabarit("triangle_angle_manquant_tpl_calcul", P_, "triangle_angle_manquant", 1, "Enlève les deux angles à 180°.", ["angle_mesure"], genManquantCalcul),
  gabarit("triangle_angle_manquant_tpl_figure_nue", P_, "triangle_angle_manquant", 1, "Les trois angles font 180°.", ["angle_mesure"], genManquantFigure1),
  gabarit("triangle_angle_manquant_tpl_qcm_nu", P_, "triangle_angle_manquant", 1, "Les trois angles font 180°.", ["angle_mesure"], genManquantQcm1),
  gabarit("triangle_angle_manquant_tpl_nomme_nu", P_, "triangle_angle_manquant", 1, "Les trois angles font 180°.", ["angle_mesure"], genManquantNomme1),
  gabarit("triangle_angle_manquant_tpl_rect_iso", P_, "triangle_angle_manquant", 2, "Rectangle : un angle de 90°. Isocèle : deux angles égaux.", ["angle_mesure"], genManquantRectIso),
  gabarit("triangle_angle_manquant_tpl_egaux", P_, "triangle_angle_manquant", 2, "Des angles égaux se partagent ce qui reste de 180°.", ["angle_mesure"], genManquantEgaux),
  gabarit("triangle_angle_manquant_tpl_lire", P_, "triangle_angle_manquant", 2, "Les trois angles font 180°. Lis les codages de la figure.", ["angle_mesure"], genManquantLire2),
  gabarit("triangle_angle_manquant_tpl_controle", P_, "triangle_angle_manquant", 2, "Calcule d’abord le troisième angle.", ["angle_mesure"], genManquantControle),

  gabarit("triangle_possible_ou_non_tpl_grand", P_, "triangle_possible_ou_non", 1, "Range les longueurs de la plus petite à la plus grande.", ["longueurs"], genPossibleGrand),
  gabarit("triangle_possible_ou_non_tpl_comparer", P_, "triangle_possible_ou_non", 1, "Calcule d’abord l’addition.", ["longueurs"], genPossibleComparer),
  gabarit("triangle_possible_ou_non_tpl_conclure", P_, "triangle_possible_ou_non", 1, "Les 2 petits côtés doivent faire plus que le grand.", ["longueurs"], genPossibleConclure),
  gabarit("triangle_possible_ou_non_tpl_troisieme_nu", P_, "triangle_possible_ou_non", 2, "Le troisième côté reste entre la différence et la somme.", ["longueurs"], genPossibleTroisieme),
  gabarit("triangle_possible_ou_non_tpl_series", P_, "triangle_possible_ou_non", 2, "Dans chaque série, additionne les 2 plus petits.", ["longueurs"], genPossibleSeries),
  gabarit("triangle_possible_ou_non_tpl_nomme", P_, "triangle_possible_ou_non", 2, "Les 2 petits côtés doivent faire plus que le grand.", ["longueurs"], genPossibleNomme),

  gabarit("triangle_propriete_defi_tpl_somme_nue", P_, "triangle_propriete_defi", 1, "Additionne les trois angles : il faut 180°.", ["defi", "angle_mesure"], genProprieteSomme1),
  gabarit("triangle_propriete_defi_tpl_calcul_nu", P_, "triangle_propriete_defi", 1, "Les trois angles font 180°.", ["defi", "angle_mesure"], genProprieteCalcul1),
  gabarit("triangle_propriete_defi_tpl_vrai_faux", P_, "triangle_propriete_defi", 1, "Les trois angles font 180° : pense à ce qui reste.", ["defi", "angle_mesure"], genProprieteVrai1),
  gabarit("triangle_propriete_defi_tpl_isocele_nu", P_, "triangle_propriete_defi", 2, "Isocèle : deux angles égaux. Rectangle : un angle de 90°.", ["defi", "angle_mesure"], genProprieteIsocele2),
  gabarit("triangle_propriete_defi_tpl_au_plus", P_, "triangle_propriete_defi", 2, "Deux grands angles feraient déjà 180° ou plus.", ["defi", "angle_mesure"], genProprieteAuPlus),
  gabarit("triangle_propriete_defi_tpl_melange", P_, "triangle_propriete_defi", 2, "Angles : il faut 180°. Côtés : les 2 petits dépassent le grand.", ["defi"], genProprieteMelange),
];

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
    // 08/10/2026 : précise et corrigée strictement (Frédéric). L’ordre des lettres est libre.
    expected: ["ABC", "ACB", "BAC", "BCA", "CAB", "CBA", "triangle ABC", "triangle ACB", "triangle BAC", "triangle BCA", "triangle CAB", "triangle CBA"],
    comparator: "exact_text",
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
    text: "Un triangle a pour sommets D, E et F. Écris son nom.",
    format: "short",
    // 08/10/2026 : précise et corrigée strictement (Frédéric). L’ordre des lettres est libre.
    expected: ["DEF", "DFE", "EDF", "EFD", "FDE", "FED", "triangle DEF", "triangle DFE", "triangle EDF", "triangle EFD", "triangle FDE", "triangle FED"],
    comparator: "exact_text",
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
    text: "Choisis le nom du triangle de sommets A, B et C.",
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un triangle a deux côtés de même longueur. Quel est son type ?",
    format: "qcm",
    choices: ["isocèle", "équilatéral", "rectangle", "quelconque"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un triangle a trois côtés de même longueur. Quel est son type ?",
    format: "qcm",
    choices: ["isocèle", "équilatéral", "rectangle", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
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
        A: { x: 160, y: 71 },
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un triangle a un angle droit. Quel est son type ?",
    format: "qcm",
    choices: ["isocèle", "équilatéral", "rectangle", "quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Un angle du triangle mesure plus de 90°. Quel est son type ?",
    format: "qcm",
    choices: ["rectangle", "obtusangle", "équilatéral", "isocèle"],
    expected: ["obtusangle"],
    comparator: "mcq_exact",
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
        A: { x: 90, y: 215 },
        B: { x: 230, y: 215 },
        C: { x: 176, y: 66 },
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Peut-on construire un triangle de côtés 2 cm, 3 cm et 6 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Calcule 2 + 3 et compare avec 6.",
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
        A: { x: 60, y: 205 },
        B: { x: 188, y: 205 },
        C: { x: 220, y: 48 },
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
    text: "Deux angles d’un triangle mesurent 40° et 60°. Calcule le troisième.",
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric). Texte varié : doublon de triangle_type_cote_fixed_1.
    // 03/11/2026 : ★1 nu — les longueurs sont écrites sur la figure (à l'échelle : 3 cm de base, 5 cm de côté).
    text: "Observe les longueurs. Quel est le type du triangle ABC ?",
    format: "qcm",
    choices: ["isocèle", "équilatéral", "rectangle", "quelconque"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Combien de côtés ont la même longueur ?",
    canvas: {
      kind: "triangle",
      size: { width: 320, height: 250 },
      points: { A: { x: 160, y: 73 }, B: { x: 115, y: 216 }, C: { x: 205, y: 216 } },
      sideLabels: { AB: "5 cm", BC: "3 cm", CA: "5 cm" },
      display: { showPoints: true, showLabels: true, showSides: true },
    },
    explanation:
      "Définition : un triangle est un polygone qui possède 3 côtés.\n\n" +
      "Méthode : on observe les côtés, les sommets et les angles du triangle.\n\n" +
      "Calcul : " +
      ("AB = AC = 5 cm : deux côtés ont la même longueur. Un triangle qui a deux côtés égaux est un triangle isocèle.") +
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
        A: { x: 160, y: 71 },
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
    text: "Un triangle a pour sommets K, L et M. Écris son nom.",
    format: "short",
    // 08/10/2026 : précise et corrigée strictement (Frédéric). L’ordre des lettres est libre.
    expected: ["KLM", "KML", "LKM", "LMK", "MKL", "MLK", "triangle KLM", "triangle KML", "triangle LKM", "triangle LMK", "triangle MKL", "triangle MLK"],
    comparator: "exact_text",
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
    text: "Un triangle a pour sommets R, S et T. Écris son nom.",
    format: "short",
    // 08/10/2026 : précise et corrigée strictement (Frédéric). L’ordre des lettres est libre.
    expected: ["RST", "RTS", "SRT", "STR", "TRS", "TSR", "triangle RST", "triangle RTS", "triangle SRT", "triangle STR", "triangle TRS", "triangle TSR"],
    comparator: "exact_text",
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
    text: "Comment note-t-on le triangle de sommets X, Y et Z ?",
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
    text: "Quel segment n’est PAS un côté du triangle ABC ?",
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
    text: "Un triangle a 3 côtés. Combien a-t-il de sommets ?",
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
    text: "Un angle d’un triangle mesure 90°. Combien font les deux autres angles ?",
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
    text: "La somme des angles d’un triangle peut-elle valoir 200° ?",
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
    text: "Les longueurs 5 cm, 5 cm et 5 cm forment-elles un triangle ?",
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
    // 08/10/2026 : précise et corrigée strictement (Frédéric).
    text: "Avec 6 cm, 8 cm et 10 cm, peut-on construire un triangle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
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

  // =========================
  // ⛔⛔ 03/11/2026 — LES SITUATIONS PASSENT À ★3 (../REGLES-6E.md)
  // Les gabarits ★1-★2 donnent l'énoncé nu ; ceux-ci gardent les situations
  // d'avant (toit, voile, fanion, parcelle, baguettes…) pour l'élève qui sait
  // déjà le geste. Mêmes générateurs, appelés avec `ctx = true`.
  // =========================
  {
    kind: "template",
    id: "triangle_nommer_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nommer",
    difficulty: 3,
    theme: "neutral",
    hint: "On nomme un triangle avec ses trois sommets, dans n’importe quel ordre.",
    tags: ["triangle_figure", "nommage", "template", "contexte"],
    generate: () => pick([genNommerDepuisSommets, genNommerLireNom])(true),
  },
  {
    kind: "template",
    id: "triangle_sommet_cote_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_sommet_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Un côté relie deux sommets : il porte leurs deux lettres.",
    tags: ["triangle_figure", "sommets", "cotes", "template", "contexte"],
    generate: () => pick([genSommetCoteCompter, genSommetCoteRelier])(true),
  },
  {
    kind: "template",
    id: "triangle_type_cote_tpl_longueurs_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les trois longueurs : combien sont égales ?",
    tags: ["triangle_figure", "cotes", "template", "qcm", "contexte"],
    generate: () => genTypeCoteLongueurs(true),
  },
  {
    kind: "template",
    id: "triangle_type_cote_tpl_codages_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_cote",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux côtés égaux → isocèle ; trois côtés égaux → équilatéral.",
    tags: ["triangle_figure", "cotes", "template", "contexte"],
    generate: () => genTypeCoteCodages(true),
  },
  {
    kind: "template",
    id: "triangle_type_angle_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_type_angle",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le plus grand angle : 90° droit, plus de 90° obtus, moins de 90° aigu.",
    tags: ["triangle_figure", "template", "qcm", "angle_mesure", "contexte"],
    generate: () => pick([genTypeAngleMesures, genTypeAngleFigure, genTypeAngleDeux])(true),
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans tous les triangles, la somme des trois angles vaut 180°.",
    tags: ["triangle_figure", "template", "angle_mesure", "contexte"],
    generate: () => genSommeConnaitre(true),
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_deux_autres_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    hint: "Les trois angles font 180° : enlève l’angle connu.",
    tags: ["triangle_figure", "template", "angle_mesure", "contexte"],
    generate: () => genSommeDeuxAutres(true),
  },
  {
    kind: "template",
    id: "triangle_angle_manquant_tpl_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_angle_manquant",
    difficulty: 3,
    theme: "neutral",
    hint: "Fais 180 moins les deux angles connus.",
    tags: ["triangle_figure", "template", "angle_mesure", "contexte"],
    generate: () => pick([genAngleManquantQcm, genAngleManquantCourt])(true),
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_angles_possibles_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les trois angles : un triangle fait toujours 180°.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure", "qcm", "contexte"],
    generate: () => genDefiAnglesPossibles(true),
  },
  {
    kind: "template",
    id: "triangle_propriete_defi_tpl_deux_angles_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_propriete",
    microId: "triangle_propriete_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux angles doivent faire MOINS de 180° pour laisser de la place au troisième.",
    tags: ["triangle_figure", "defi", "template", "angle_mesure", "qcm", "contexte"],
    generate: () => genDefiDeuxAngles(true),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_reconnaissance_ctx3",
    niveau: "6e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'abord les côtés : combien sont égaux ?",
    tags: ["triangle_figure", "defi", "template", "contexte"],
    generate: () => genDefiReconnaissance(true),
  },
  ...GABARITS_07_11,
];
