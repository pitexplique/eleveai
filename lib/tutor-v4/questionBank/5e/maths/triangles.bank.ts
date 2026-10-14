// Triangles (5e). L'inégalité triangulaire a son propre micro depuis le
// 04/08/2026 (triangle_inegalite) : savoir si un triangle est constructible
// n'est pas le même geste que le construire au compas.
// ⚠️ C'est le microId de chaque item qui fait foi, PAS le commentaire de
// section au-dessus : les items déplacés sont restés à leur place dans le
// fichier pour garder leur id, et donc l'historique des réponses des élèves.

import type { TutorBankItemV4, TriangleCanvasData } from "@/lib/tutor-v4/types";
import { PRENOMS, pick, de, type Prenom } from "@/lib/tutor-v4/questionBank/6e/maths/entiers.bank";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  // Jamais deux fois la même ligne. Un gabarit dont le piège coïncide avec la
  // bonne réponse (les coordonnées inversées quand x = y, un arrondi égal à la
  // valeur de départ…) affichait la même proposition deux fois, et l'élève
  // voyait deux réponses justes.
  // ⚠️ 04/08/2026 — la version précédente dédoublonnait PUIS coupait à quatre :
  // avec cinq distracteurs, le mélange pouvait renvoyer la bonne réponse en
  // cinquième position et le découpage l'emportait. L'élève ne pouvait alors
  // pas réussir, et rien ne le signalait. On met désormais la bonne réponse de
  // côté, on tire trois distracteurs, puis on mélange l'ensemble.
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function triangleCanvas(params: {
  type?: "quelconque" | "isocele" | "equilateral" | "rectangle";
  angleLabels?: Partial<Record<"A" | "B" | "C", string>>;
  sideLabels?: Partial<Record<"AB" | "BC" | "CA", string>>;
}): TriangleCanvasData {
  const type = params.type ?? "quelconque";

  if (type === "rectangle") {
    return {
      kind: "triangle",
      points: {
        A: { x: 45, y: 190 },
        B: { x: 210, y: 190 },
        C: { x: 45, y: 55 },
      },
      angleLabels: params.angleLabels,
      sideLabels: params.sideLabels,
      marks: { rightAngleAt: "A" },
    };
  }

  if (type === "isocele") {
    return {
      kind: "triangle",
      points: {
        A: { x: 45, y: 190 },
        B: { x: 215, y: 190 },
        C: { x: 130, y: 50 },
      },
      angleLabels: params.angleLabels,
      sideLabels: params.sideLabels,
      marks: { equalSides: [["CA", "BC"]] },
    };
  }

  if (type === "equilateral") {
    return {
      kind: "triangle",
      points: {
        A: { x: 45, y: 190 },
        B: { x: 215, y: 190 },
        C: { x: 130, y: 45 },
      },
      angleLabels: params.angleLabels,
      sideLabels: params.sideLabels,
      marks: {
        equalSides: [
          ["AB", "BC"],
          ["BC", "CA"],
        ],
      },
    };
  }

  return {
    kind: "triangle",
    points: {
      A: { x: 45, y: 185 },
      B: { x: 220, y: 175 },
      C: { x: 105, y: 45 },
    },
    angleLabels: params.angleLabels,
    sideLabels: params.sideLabels,
  };
}

function expl(calcul: string) {
  return (
    "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
    "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle."
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// GABARITS VARIÉS (13/10/2026). Mesuré le 13/10 : 5 à 13 squelettes par
// micro, jusqu'à 18 répétitions sur 20. Chaque gabarit compose une SITUATION ×
// une TOURNURE × des PRÉNOMS × des NOMS DE SOMMETS ; la figure est CALCULÉE à
// partir des longueurs ou des angles de l'énoncé, avec les mêmes noms.
// Correcteurs : correcteurs/triangles.ts.
// ═══════════════════════════════════════════════════════════════════════════

type Gen = ReturnType<Extract<TutorBankItemV4, { kind: "template" }>["generate"]>;
type Cle = "A" | "B" | "C";
const LETTRES = "ABCDEFGHKLMNPRSTUVXYZ".split("");
const lettres = (n: number) => shuffle(LETTRES).slice(0, n);
const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
const multiple = (a: number, b: number, pas: number) => pas * ri(Math.ceil(a / pas), Math.floor(b / pas));
const il = (p: Prenom) => (p.f ? "elle" : "il");
const cm = (x: number) => `${String(Math.round(x * 100) / 100).replace(".", ",")} cm`;
/** [XY] avec les lettres dans l'ordre alphabétique. */
const seg = (x: string, y: string) => `[${[x, y].sort().join("")}]`;

/**
 * Les triangles de la vie courante. ⚠️ Aucun objet dont la FORME est imposée
 * (une équerre est rectangle, un panneau « travaux » équilatéral, un pignon
 * isocèle) : l'énoncé donne ensuite des angles ou des longueurs quelconques.
 */
const OBJETS_TRI = [
  "une voile de bateau",
  "un morceau de fromage",
  "un morceau de tissu",
  "une parcelle de jardin",
  "un champ entre trois chemins",
  "le parcours d’une course d’orientation entre trois balises",
  "le trajet d’un randonneur entre trois refuges",
  "un bout de carton découpé",
  "une plaque de bois découpée",
  "un coin de pelouse entre trois allées",
  "une zone de jeu dans la cour",
  "un éclat de vitre",
];
function intro(P: Prenom, nom: string) {
  return pick([
    `${P.nom} dessine ${pick(OBJETS_TRI)} : c’est le triangle ${nom}.`,
    `Sur le cahier ${de(P.nom)}, le triangle ${nom} représente ${pick(OBJETS_TRI)}.`,
    `${P.nom} trace le triangle ${nom}.`,
    `On observe le triangle ${nom}.`,
    `${P.nom} a découpé le triangle ${nom} dans du carton.`,
  ]);
}

/**
 * La figure d'un triangle, posée sur sa base [AB] (clés du canvas), les noms
 * affichés pris dans `noms` (A → noms[0]…). C est donné par ses coordonnées
 * dans le repère où A = (0, 0), B = (c, 0) ; la figure est mise à l'échelle.
 */
function placerTriangle(
  noms: string[],
  c: number,
  Cx: number,
  Cy: number,
  opts: Pick<TriangleCanvasData, "angleLabels" | "sideLabels" | "marks">,
): TriangleCanvasData {
  const xs = [0, c, Cx];
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const s = Math.min(230 / (maxX - minX), 160 / Cy);
  const x0 = 160 - ((maxX - minX) * s) / 2;
  const P = (x: number, y: number) => ({ x: Math.round((x0 + (x - minX) * s) * 10) / 10, y: Math.round((205 - y * s) * 10) / 10 });
  return {
    kind: "triangle",
    size: { width: 320, height: 240 },
    points: { A: P(0, 0), B: P(c, 0), C: P(Cx, Cy) },
    labels: { A: noms[0], B: noms[1], C: noms[2] },
    ...opts,
  };
}
/** Le triangle de côtés AB, BC, CA (supposé constructible). */
function figCotes(noms: string[], AB: number, BC: number, CA: number, opts: Pick<TriangleCanvasData, "angleLabels" | "sideLabels" | "marks"> = {}) {
  const Cx = (CA * CA + AB * AB - BC * BC) / (2 * AB);
  return placerTriangle(noms, AB, Cx, Math.sqrt(Math.max(CA * CA - Cx * Cx, 0)), opts);
}
/** Le triangle d'angles a en A et b en B (degrés). */
function figAngles(noms: string[], a: number, b: number, opts: Pick<TriangleCanvasData, "angleLabels" | "sideLabels" | "marks"> = {}) {
  const r = Math.PI / 180;
  const AC = Math.sin(b * r) / Math.sin((a + b) * r);
  return placerTriangle(noms, 1, AC * Math.cos(a * r), AC * Math.sin(a * r), opts);
}

/** Un gabarit ajouté le 13/10/2026. */
function tpl(id: string, microId: string, difficulty: number, hint: string, generate: () => Gen): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["triangle_figure", microId.replace("triangle_", ""), "template"],
    generate,
  } as TutorBankItemV4;
}

// ─── TRIANGLE_NATURE ───────────────────────────────────────────────────────
/** Les propositions : jamais « isocèle » à côté d'un « équilatéral » juste (un équilatéral EST isocèle). */
function choixNature(juste: string) {
  return shuffle(juste === "équilatéral" ? ["équilatéral", "rectangle", "quelconque"] : ["équilatéral", "isocèle", "rectangle", "quelconque"]);
}
/** Trois longueurs en cm (une décimale au plus) d'une nature donnée, jamais d'un triangle rectangle. */
function longueursNature(nat: "équilatéral" | "isocèle" | "quelconque"): number[] {
  for (;;) {
    const l = () => ri(20, 90) / 10;
    const a = nat === "quelconque" ? ri(3, 9) + (Math.random() < 0.4 ? ri(1, 9) / 10 : 0) : Math.round(l() * 2) / 2;
    let c: number[];
    if (nat === "équilatéral") c = [a, a, a];
    else if (nat === "isocèle") c = [a, a, Math.round(ri(Math.ceil(a * 4), Math.floor(a * 18)) / 10 * 2) / 2];
    else c = [a, ri(3, 9) + (Math.random() < 0.4 ? 0.5 : 0), ri(3, 9)];
    c = c.map((x) => Math.round(x * 10) / 10);
    const [p, q, r] = [...c].sort((x, y) => x - y);
    if (!(p + q > r + 0.5)) continue;
    if (Math.abs(p * p + q * q - r * r) < 0.06 * r * r) continue; // trop près d'un angle droit
    const egaux = new Set(c).size;
    if (nat === "isocèle" && egaux !== 2) continue;
    if (nat === "quelconque" && egaux !== 3) continue;
    return c;
  }
}
function genNature(etoile: 2 | 3): Gen {
  const P = pick(PRENOMS);
  const noms = lettres(3);
  const [X, Y, Z] = noms;
  const nom = `${X}${Y}${Z}`;
  const intr = intro(P, nom);
  const forme = pick(etoile === 2 ? ["cotes", "cotes", "codage"] : ["angles", "angles", "isoceleEn", "rectangleEn"]);
  const question = pick(["Quelle est sa nature ?", `Quelle est la nature du triangle ${nom} ?`, `Le triangle ${nom} est :`, "Comment s’appelle ce triangle ?"]);
  if (forme === "cotes") {
    const nat = pick(["équilatéral", "isocèle", "isocèle", "quelconque", "quelconque"] as const);
    const c = shuffle(longueursNature(nat)); // XY, YZ, ZX
    const fig = figCotes(noms, c[0], c[1], c[2], { sideLabels: { AB: cm(c[0]), BC: cm(c[1]), CA: cm(c[2]) } });
    return {
      text: `${intr} ${X}${Y} = ${cm(c[0])}, ${Y}${Z} = ${cm(c[1])} et ${Z}${X} = ${cm(c[2])}. ${question}`,
      format: "qcm",
      choices: choixNature(nat),
      expected: [nat],
      comparator: "mcq_exact",
      explanation: expl(
        nat === "équilatéral"
          ? `Les trois côtés mesurent ${cm(c[0])} : le triangle est équilatéral.`
          : nat === "isocèle"
            ? `Deux côtés ont la même longueur, pas le troisième : le triangle est isocèle.`
            : `Les trois côtés ont des longueurs différentes, et aucun angle n’est droit : le triangle est quelconque.`,
      ),
      canvas: fig,
    };
  }
  if (forme === "codage") {
    const nat = pick(["équilatéral", "isocèle", "rectangle"] as const);
    let fig: TriangleCanvasData;
    if (nat === "équilatéral") fig = figCotes(noms, 5, 5, 5, { marks: { equalSides: [["AB", "BC"], ["BC", "CA"]] } });
    else if (nat === "isocèle") {
      // Pas 7 : 5, 5, 7 a presque un angle droit, l'œil hésiterait.
      const b = pick([3, 4, 6]);
      fig = figCotes(noms, b, 5, 5, { marks: { equalSides: [["BC", "CA"]] } });
    } else fig = figAngles(noms, 90, pick([30, 35, 40, 50, 55, 60]), { marks: { rightAngleAt: "A" } });
    return {
      text: `${intr} ${pick(["Observe les codages de la figure.", "Regarde les codages.", "Les codages sont sur la figure."])} ${question}`,
      format: "qcm",
      choices: choixNature(nat),
      expected: [nat],
      comparator: "mcq_exact",
      explanation: expl(
        nat === "équilatéral"
          ? "Les trois côtés portent le même codage : ils ont la même longueur. Le triangle est équilatéral."
          : nat === "isocèle"
            ? "Deux côtés portent le même codage : ils ont la même longueur. Le triangle est isocèle."
            : "Le petit carré code un angle droit : le triangle est rectangle.",
      ),
      canvas: fig,
    };
  }
  if (forme === "angles") {
    const nat = pick(["rectangle", "isocèle", "isocèle", "équilatéral", "quelconque", "quelconque"] as const);
    let t: number[];
    for (;;) {
      if (nat === "rectangle") { const a = ri(20, 70); t = [90, a, 90 - a]; }
      else if (nat === "isocèle") { const a = ri(25, 80); t = [a, a, 180 - 2 * a]; }
      else if (nat === "équilatéral") t = [60, 60, 60];
      else { const a = ri(25, 85), b = ri(25, 150 - a); t = [a, b, 180 - a - b]; }
      const distincts = new Set(t).size;
      if (t.includes(90) !== (nat === "rectangle")) continue;
      if (nat === "isocèle" && distincts !== 2) continue;
      if ((nat === "quelconque" || nat === "rectangle") && distincts !== 3) continue;
      break;
    }
    t = shuffle(t); // angles en X, Y, Z
    const fig = figAngles(noms, t[0], t[1], { angleLabels: { A: `${t[0]}°`, B: `${t[1]}°`, C: "?" } });
    return {
      text: `${intr} L’angle en ${X} mesure ${t[0]}° et l’angle en ${Y} mesure ${t[1]}°. ${question}`,
      format: "qcm",
      choices: choixNature(nat),
      expected: [nat],
      comparator: "mcq_exact",
      explanation: expl(`Le troisième angle mesure 180 − ${t[0]} − ${t[1]} = ${t[2]}°. Les angles sont ${t[0]}°, ${t[1]}° et ${t[2]}° : le triangle est ${nat}.`),
      canvas: fig,
    };
  }
  if (forme === "isoceleEn") {
    const c = longueursNature("isocèle"); // c[0] = c[1]
    // Le sommet principal est entre les deux côtés égaux.
    const S = pick(noms);
    const [U, V] = noms.filter((x) => x !== S);
    const L: Record<string, number> = { [S + U]: c[0], [S + V]: c[1], [U + V]: c[2] };
    const lg = (a: string, b: string) => L[a + b] ?? L[b + a];
    const fig = figCotes(noms, lg(X, Y), lg(Y, Z), lg(Z, X), { sideLabels: { AB: cm(lg(X, Y)), BC: cm(lg(Y, Z)), CA: cm(lg(Z, X)) } });
    return {
      text: `${intr} ${X}${Y} = ${cm(lg(X, Y))}, ${Y}${Z} = ${cm(lg(Y, Z))} et ${Z}${X} = ${cm(lg(Z, X))}. ${pick([`En quel sommet le triangle ${nom} est-il isocèle ?`, "Il est isocèle : quel est son sommet principal ?"])}`,
      format: "qcm",
      choices: shuffle([...noms]),
      expected: [S],
      comparator: "mcq_exact",
      explanation: expl(`Les deux côtés égaux, ${seg(S, U)} et ${seg(S, V)}, partent de ${S} : le triangle est isocèle en ${S}.`),
      canvas: fig,
    };
  }
  // rectangleEn : deux angles qui font 90° ensemble.
  const a = ri(20, 70);
  const S = pick(noms);
  const [U, V] = noms.filter((x) => x !== S);
  const ang: Record<string, number> = { [S]: 90, [U]: a, [V]: 90 - a };
  const fig = figAngles(noms, ang[X], ang[Y], { angleLabels: { A: X === S ? "?" : `${ang[X]}°`, B: Y === S ? "?" : `${ang[Y]}°`, C: Z === S ? "?" : `${ang[Z]}°` } });
  return {
    text: `${intr} L’angle en ${U} mesure ${a}° et l’angle en ${V} mesure ${90 - a}°. ${pick([`Le triangle ${nom} est rectangle : en quel sommet ?`, "En quel sommet ce triangle a-t-il un angle droit ?"])}`,
    format: "qcm",
    choices: shuffle([...noms]),
    expected: [S],
    comparator: "mcq_exact",
    explanation: expl(`L’angle en ${S} mesure 180 − ${a} − ${90 - a} = 90° : le triangle est rectangle en ${S}.`),
    canvas: fig,
  };
}

// ─── TRIANGLE_CONSTRUIRE ───────────────────────────────────────────────────
/** Trois longueurs entières constructibles (écart d'au moins 1 cm). */
function troisLongueurs(): [number, number, number] {
  for (;;) {
    const c = [ri(3, 10), ri(3, 10), ri(3, 10)] as [number, number, number];
    const [p, q, r] = [...c].sort((x, y) => x - y);
    if (p + q >= r + 1 && new Set(c).size === 3) return c;
  }
}
const INSTRUMENTS = ["le compas", "le rapporteur", "l’équerre", "la calculatrice"];
function genConstruire(etoile: 2 | 3 | 4): Gen {
  const P = pick(PRENOMS);
  const noms = lettres(3);
  const [X, Y, Z] = noms;
  const nom = `${X}${Y}${Z}`;
  const qui = pick([`${P.nom} veut construire`, `${P.nom} doit construire`, "On veut construire", `Pour son exposé, ${P.nom} construit`]);
  const formes = { 2: ["compas", "rapporteur", "equerre", "angleCompris"], 3: ["ecartement", "ecartement", "angleEnY"], 4: ["arcs", "arcs", "troisieme", "rayonMin"] }[etoile];
  const forme = pick(formes);
  if (forme === "compas" || forme === "ecartement") {
    const [xy, yz, zx] = troisLongueurs();
    const fig = figCotes(noms, xy, yz, zx, { sideLabels: { AB: cm(xy), BC: cm(yz), CA: cm(zx) } });
    const donnees = `${qui} le triangle ${nom} avec ${X}${Y} = ${cm(xy)}, ${Y}${Z} = ${cm(yz)} et ${Z}${X} = ${cm(zx)}. ${seg(X, Y)} est déjà tracé.`;
    if (forme === "compas")
      return {
        text: `${donnees} ${pick([`Quel instrument sert à placer le point ${Z} ?`, `Avec quel instrument reporte-t-on les longueurs ${Y}${Z} et ${Z}${X} ?`])}`,
        format: "qcm",
        choices: shuffle([...INSTRUMENTS]),
        expected: ["le compas"],
        comparator: "mcq_exact",
        explanation: expl(`${Z} est à ${cm(zx)} de ${X} et à ${cm(yz)} de ${Y} : on trace deux arcs de cercle au compas, ${Z} est à leur croisement.`),
        canvas: fig,
      };
    const centre = pick([X, Y]);
    const r = centre === X ? zx : yz;
    return {
      text: `${donnees} ${pick([`Quel écartement faut-il au compas pour l’arc de centre ${centre} ?`, `Pour placer ${Z}, on trace un arc de centre ${centre}. Quel est son rayon ?`])}`,
      format: "short",
      expected: [cm(r)],
      comparator: "number_equal",
      explanation: expl(`L’arc de centre ${centre} contient les points à la distance ${centre}${Z} de ${centre} : ${centre}${Z} = ${cm(r)}.`),
      canvas: fig,
    };
  }
  if (forme === "rapporteur" || forme === "angleEnY" || forme === "troisieme") {
    const xy = ri(4, 10);
    const a = multiple(25, 85, 5), b = multiple(25, 150 - a, 5);
    const fig = figAngles(noms, a, b, { angleLabels: { A: `${a}°`, B: `${b}°`, C: "?" }, sideLabels: { AB: cm(xy) } });
    const donnees = `${qui} le triangle ${nom} avec ${X}${Y} = ${cm(xy)}, l’angle en ${X} qui mesure ${a}° et l’angle en ${Y} qui mesure ${b}°.`;
    if (forme === "rapporteur")
      return {
        text: `${donnees} ${pick(["Quel instrument sert à tracer les angles ?", "Avec quel instrument trace-t-on les deux angles ?"])}`,
        format: "qcm",
        choices: shuffle([...INSTRUMENTS]),
        expected: ["le rapporteur"],
        comparator: "mcq_exact",
        explanation: expl(`On trace ${seg(X, Y)} à la règle, puis les angles de ${a}° et de ${b}° au rapporteur ; ${Z} est au croisement des deux côtés.`),
        canvas: fig,
      };
    if (forme === "angleEnY")
      return {
        text: `${donnees} ${seg(X, Y)} et l’angle en ${X} sont tracés. ${pick([`Quelle mesure faut-il tracer en ${Y} ?`, `Combien de degrés repère-t-on au rapporteur en ${Y} ?`])}`,
        format: "short",
        expected: [`${b}°`],
        comparator: "number_equal",
        explanation: expl(`En ${Y}, on trace l’angle donné par l’énoncé : ${b}°.`),
        canvas: fig,
      };
    return {
      text: `${donnees} ${pick([`Une fois le triangle construit, combien mesurera l’angle en ${Z} ?`, `Sans le construire, calcule l’angle en ${Z}.`])}`,
      format: "short",
      expected: [`${180 - a - b}°`],
      comparator: "number_equal",
      explanation: expl(`La somme des angles d’un triangle vaut 180° : 180 − ${a} − ${b} = ${180 - a - b}°.`),
      canvas: fig,
    };
  }
  if (forme === "equerre" || forme === "angleCompris") {
    const [xz, xy] = [ri(3, 8), ri(3, 8)];
    if (forme === "equerre") {
      const fig = placerTriangle(noms, xy, 0, xz, { marks: { rightAngleAt: "A" }, sideLabels: { AB: cm(xy), CA: cm(xz) } });
      return {
        text: `${qui} le triangle ${nom}, rectangle en ${X}, avec ${X}${Y} = ${cm(xy)} et ${X}${Z} = ${cm(xz)}. ${pick([`Quel instrument sert à tracer l’angle droit en ${X} ?`, "Avec quel instrument trace-t-on l’angle droit ?"])}`,
        format: "qcm",
        choices: shuffle(["l’équerre", "le compas", "la calculatrice", "la gomme"]),
        expected: ["l’équerre"],
        comparator: "mcq_exact",
        explanation: expl(`On trace ${seg(X, Y)} à la règle, puis la perpendiculaire en ${X} à l’équerre, et on y reporte ${cm(xz)}.`),
        canvas: fig,
      };
    }
    const a = multiple(30, 140, 5);
    const r = (a * Math.PI) / 180;
    const fig = placerTriangle(noms, xy, xz * Math.cos(r), xz * Math.sin(r), { angleLabels: { A: `${a}°` }, sideLabels: { AB: cm(xy), CA: cm(xz) } });
    return {
      text: `${qui} le triangle ${nom} avec ${X}${Y} = ${cm(xy)}, ${X}${Z} = ${cm(xz)} et l’angle en ${X} qui mesure ${a}°. ${pick(["Quel instrument sert à tracer l’angle ?", `Avec quel instrument trace-t-on l’angle en ${X} ?`])}`,
      format: "qcm",
      choices: shuffle([...INSTRUMENTS]),
      expected: ["le rapporteur"],
      comparator: "mcq_exact",
      explanation: expl(`On trace ${seg(X, Y)}, puis l’angle de ${a}° en ${X} au rapporteur ; on reporte ensuite ${cm(xz)} sur le second côté.`),
      canvas: fig,
    };
  }
  if (forme === "arcs") {
    // Les arcs de centres X (rayon r1) et Y (rayon r2) se coupent si et seulement si |r1 − r2| < XY < r1 + r2.
    let xy: number, r1: number, r2: number;
    const oui = Math.random() < 0.5;
    for (;;) {
      xy = ri(5, 12); r1 = ri(2, 10); r2 = ri(2, 10);
      const coupe = Math.abs(r1 - r2) < xy && xy < r1 + r2;
      const marge = Math.min(Math.abs(xy - Math.abs(r1 - r2)), Math.abs(r1 + r2 - xy));
      if (coupe === oui && marge >= 1) break;
    }
    return {
      text: `${P.nom} trace ${seg(X, Y)} de ${cm(xy)}, puis un arc de centre ${X} et de rayon ${cm(r1)}, et un arc de centre ${Y} et de rayon ${cm(r2)}. ${pick(["Les deux arcs se coupent-ils ?", `Peut-${il(P)} placer le point ${Z} à leur croisement ?`])}`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(
        oui
          ? `Le triangle ${nom} de côtés ${cm(xy)}, ${cm(r1)} et ${cm(r2)} existe : chaque côté est plus petit que la somme des deux autres. Les arcs se coupent.`
          : `Un côté est trop long par rapport aux deux autres (${[xy, r1, r2].sort((u, v) => v - u)[0]} ≥ somme des deux autres) : les arcs ne se coupent pas.`,
      ),
    };
  }
  // rayonMin : la plus petite longueur entière qui fait se couper les arcs.
  const xy = ri(6, 12), r1 = ri(2, xy - 3);
  return {
    text: `${P.nom} trace ${seg(X, Y)} de ${cm(xy)} et un arc de centre ${X} de rayon ${cm(r1)}. Quelle est la plus petite longueur entière (en cm) du rayon de l’arc de centre ${Y} pour que les deux arcs se coupent ?`,
    format: "short",
    expected: [cm(xy - r1 + 1)],
    comparator: "number_equal",
    explanation: expl(`Il faut ${X}${Y} < ${X}${Z} + ${Y}${Z}, soit ${xy} < ${r1} + rayon : le rayon doit dépasser ${xy} − ${r1} = ${xy - r1} cm. La plus petite longueur entière est ${xy - r1 + 1} cm.`),
  };
}

// ─── TRIANGLE_INEGALITE ────────────────────────────────────────────────────
const BAGUETTES = [
  (p: Prenom, l: string) => `${p.nom} a trois baguettes de ${l}. Peut-${il(p)} former un triangle en les joignant bout à bout ?`,
  (p: Prenom, l: string) => `Avec trois pailles de ${l}, ${p.nom} veut fabriquer un triangle. Est-ce possible ?`,
  (_p: Prenom, l: string) => `Peut-on construire un triangle ${lettres(3).join("")} dont les côtés mesurent ${l} ?`,
  (p: Prenom, l: string) => `Pour sa maquette, ${p.nom} découpe trois tiges de bois de ${l}. Peuvent-elles former un triangle ?`,
  (p: Prenom, l: string) => `${p.nom} veut tendre une ficelle en triangle entre trois piquets, avec des côtés de ${l}. Est-ce possible ?`,
  (p: Prenom, l: string) => `Au club de bricolage, ${p.nom} a trois planchettes de ${l}. Peut-${il(p)} en faire un cadre triangulaire ?`,
  (p: Prenom, l: string) => `${p.nom} affirme qu’un triangle peut avoir des côtés de ${l}. A-t-${il(p)} raison ?`,
];
const listeCm = (l: number[]) => `${cm(l[0])}, ${cm(l[1])} et ${cm(l[2])}`;
function genInegalite(etoile: 3 | 4): Gen {
  const P = pick(PRENOMS);
  const forme = etoile === 3 ? "possible" : pick(["possible", "troisieme", "maxEntier"]);
  if (forme === "possible") {
    const oui = Math.random() < 0.5;
    let l: number[];
    for (;;) {
      l = etoile === 3 ? [ri(2, 12), ri(2, 12), ri(2, 12)] : [ri(15, 120) / 10, ri(15, 120) / 10, ri(15, 120) / 10];
      const [p, q, r] = [...l].sort((x, y) => x - y);
      if (oui ? p + q - r >= 0.5 : r - (p + q) >= 0.5) break;
    }
    const [p, q, r] = [...l].sort((x, y) => x - y);
    return {
      text: pick(BAGUETTES)(P, listeCm(l)),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(
        oui
          ? `Le plus grand côté, ${cm(r)}, est plus petit que la somme des deux autres : ${cm(p)} + ${cm(q)} = ${cm(Math.round((p + q) * 10) / 10)}. Le triangle existe.`
          : `Le plus grand côté, ${cm(r)}, est plus long que la somme des deux autres : ${cm(p)} + ${cm(q)} = ${cm(Math.round((p + q) * 10) / 10)}. Les deux petits côtés ne se rejoignent pas.`,
      ),
    };
  }
  const a = ri(3, 12), b = ri(2, a - 1);
  const intro2 = pick([
    `Deux côtés d’un triangle mesurent ${cm(a)} et ${cm(b)}.`,
    `${P.nom} a deux baguettes de ${cm(a)} et ${cm(b)} pour faire un triangle.`,
    `Dans le triangle de ${P.nom}, deux côtés mesurent ${cm(a)} et ${cm(b)}.`,
  ]);
  if (forme === "maxEntier")
    return {
      text: `${intro2} Quelle est la plus grande longueur entière (en cm) possible pour le troisième côté ?`,
      format: "short",
      expected: [cm(a + b - 1)],
      comparator: "number_equal",
      explanation: expl(`Le troisième côté doit être plus petit que ${a} + ${b} = ${a + b} cm. Le plus grand nombre entier possible est ${a + b - 1} cm.`),
    };
  // troisieme : une seule longueur possible parmi les propositions.
  const juste = ri(a - b + 1, a + b - 1);
  // Trop courtes : de 1 à a − b − 1 ; trop longues : au-delà de a + b (jamais le cas plat a − b ni a + b).
  const tropCourtes = Array.from({ length: Math.max(0, a - b - 1) }, (_, i) => i + 1);
  const faux = shuffle([...tropCourtes, a + b + 1, a + b + 2, a + b + 4]).slice(0, 3);
  return {
    text: `${intro2} ${pick(["Quelle longueur peut avoir le troisième côté ?", "Parmi ces longueurs, laquelle convient pour le troisième côté ?"])}`,
    format: "qcm",
    choices: shuffle([cm(juste), ...faux.map(cm)]),
    expected: [cm(juste)],
    comparator: "mcq_exact",
    explanation: expl(`Le troisième côté doit être plus grand que ${a} − ${b} = ${a - b} cm (sinon les deux petits ne rejoignent pas le grand) et plus petit que ${a} + ${b} = ${a + b} cm. Seule ${cm(juste)} convient.`),
  };
}

// ─── TRIANGLE_SOMME_ANGLE ──────────────────────────────────────────────────
/** La figure d'un triangle d'angles t = [en X, en Y, en Z] ; étiquette « ? » sur l'angle cherché. */
function figTroisAngles(noms: string[], t: number[], cache: number, marks?: TriangleCanvasData["marks"]) {
  const lab = (i: number) => (i === cache ? "?" : `${t[i]}°`);
  return figAngles(noms, t[0], t[1], { angleLabels: { A: lab(0), B: lab(1), C: lab(2) }, ...(marks ? { marks } : {}) });
}
const QUESTION_ANGLE = (s: string) => pick([`Combien mesure l’angle en ${s} ?`, `Calcule la mesure de l’angle en ${s}.`, `Quelle est la mesure de l’angle en ${s} ?`]);
function genSomme(etoile: 1 | 2 | 3 | 4): Gen {
  const P = pick(PRENOMS);
  const noms = lettres(3);
  const nom = noms.join("");
  const intr = etoile === 1 ? `Dans le triangle ${nom},` : `${intro(P, nom)} Dans ce triangle,`;
  if (etoile === 1 && Math.random() < 0.25)
    return {
      text: `${pick([`${P.nom} trace le triangle ${nom}.`, `On observe le triangle ${nom}.`])} ${pick(["Combien vaut la somme de ses trois angles ?", `La somme des angles du triangle ${nom} vaut :`])}`,
      format: "qcm",
      choices: shuffle(["180°", "90°", "360°", "100°"]),
      expected: ["180°"],
      comparator: "mcq_exact",
      explanation: expl("Dans tout triangle, la somme des trois angles vaut 180°."),
      canvas: figAngles(noms, ri(40, 80), ri(40, 70)),
    };
  if (etoile <= 3) {
    const pas = etoile === 1 ? 10 : etoile === 2 ? 5 : 1;
    let t: number[];
    do {
      const a = multiple(20, 120, pas), b = multiple(20, 160 - a, pas);
      t = shuffle([a, b, 180 - a - b]);
    } while (t.some((x) => x < 15));
    const k = ri(0, 2);
    const [i, j] = [0, 1, 2].filter((x) => x !== k);
    return {
      text: `${intr} l’angle en ${noms[i]} mesure ${t[i]}° et l’angle en ${noms[j]} mesure ${t[j]}°. ${QUESTION_ANGLE(noms[k])}`,
      format: "short",
      expected: [`${t[k]}°`],
      comparator: "number_equal",
      explanation: expl(`La somme des angles d’un triangle vaut 180° : 180 − ${t[i]} − ${t[j]} = ${t[k]}°.`),
      canvas: figTroisAngles(noms, t, k),
    };
  }
  const forme = pick(["isoBase", "isoSommet", "rect", "rect"]);
  const [S, U, V] = shuffle([...noms]);
  if (forme === "rect") {
    const a = ri(15, 75);
    const ang: Record<string, number> = { [S]: 90, [U]: a, [V]: 90 - a };
    const t = noms.map((x) => ang[x]);
    return {
      text: `${intro(P, nom)} Il est rectangle en ${S}, et l’angle en ${U} mesure ${a}°. ${QUESTION_ANGLE(V)}`,
      format: "short",
      expected: [`${90 - a}°`],
      comparator: "number_equal",
      explanation: expl(`L’angle en ${S} est droit : 90°. Il reste 180 − 90 − ${a} = ${90 - a}° pour l’angle en ${V}.`),
      canvas: figTroisAngles(noms, t, noms.indexOf(V), { rightAngleAt: (["A", "B", "C"] as Cle[])[noms.indexOf(S)] }),
    };
  }
  // Isocèle en S : les angles en U et V sont égaux. La figure : base [UV] sur les clés A, B ; S en C.
  const base = forme === "isoBase" ? ri(20, 80) : 0;
  const sommet = forme === "isoBase" ? 180 - 2 * base : 2 * ri(10, 75);
  const b = forme === "isoBase" ? base : (180 - sommet) / 2;
  const fig = figAngles([U, V, S], b, b, {
    angleLabels: forme === "isoBase" ? { A: `${b}°`, C: "?" } : { C: `${sommet}°`, A: "?" },
    marks: { equalSides: [["CA", "BC"]] },
  });
  return {
    text:
      forme === "isoBase"
        ? `${intro(P, nom)} Il est isocèle en ${S}, et l’angle en ${U} mesure ${b}°. ${QUESTION_ANGLE(S)}`
        : `${intro(P, nom)} Il est isocèle en ${S}, et l’angle en ${S} mesure ${sommet}°. ${QUESTION_ANGLE(U)}`,
    format: "short",
    expected: [forme === "isoBase" ? `${sommet}°` : `${b}°`],
    comparator: "number_equal",
    explanation: expl(
      forme === "isoBase"
        ? `Isocèle en ${S} : les angles en ${U} et en ${V} sont égaux, ${b}° chacun. Angle en ${S} : 180 − ${b} − ${b} = ${sommet}°.`
        : `Isocèle en ${S} : les angles en ${U} et en ${V} sont égaux. Ensemble, ils font 180 − ${sommet} = ${180 - sommet}°, donc chacun ${180 - sommet} ÷ 2 = ${b}°.`,
    ),
    canvas: fig,
  };
}

// ─── TRIANGLE_DEFI ─────────────────────────────────────────────────────────
function genDefiTri(etoile: 4 | 5): Gen {
  const P = pick(PRENOMS);
  const noms = lettres(3);
  const nom = noms.join("");
  const [S, U, V] = shuffle([...noms]);
  const forme = pick(etoile === 4 ? ["possible", "possible", "deuxEgaux", "rect"] : ["double", "deplus", "iso", "possible"]);
  if (forme === "possible") {
    const oui = Math.random() < 0.5;
    const a = ri(20, 100), b = ri(20, 150 - a);
    const c = oui ? 180 - a - b : 180 - a - b + pick([-1, 1]) * ri(3, 15);
    return {
      text: pick([
        `Un triangle peut-il avoir des angles de ${a}°, ${b}° et ${c}° ?`,
        `${P.nom} affirme avoir tracé un triangle ${nom} dont les angles mesurent ${a}°, ${b}° et ${c}°. Est-ce possible ?`,
        `Sur le schéma ${de(P.nom)}, un triangle a des angles de ${a}°, ${b}° et ${c}°. Ce triangle peut-il exister ?`,
      ]),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(`${a} + ${b} + ${c} = ${a + b + c}°. ${oui ? "La somme vaut bien 180° : c’est possible." : "La somme des angles d’un triangle doit valoir 180° : c’est impossible."}`),
    };
  }
  if (forme === "deuxEgaux") {
    const a = pick([30, 40, 45, 50, 60, 70, 75, 80, 85, 89, 90, 91, 95, 100, 110, 120]);
    const oui = 2 * a < 180;
    return {
      text: pick([
        `Un triangle peut-il avoir deux angles de ${a}° ?`,
        `${P.nom} veut tracer un triangle ${nom} avec deux angles de ${a}°. Est-ce possible ?`,
      ]),
      format: "qcm",
      choices: ["oui", "non"],
      expected: [oui ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation: expl(`Deux angles de ${a}° font ${2 * a}°. ${oui ? `Il reste 180 − ${2 * a} = ${180 - 2 * a}° pour le troisième : c’est possible.` : "Il ne reste rien (ou moins que rien) pour le troisième angle : impossible."}`),
    };
  }
  if (forme === "rect") {
    const a = ri(12, 78);
    return {
      text: `${intro(P, nom)} Il est rectangle en ${S}, et l’angle en ${U} mesure ${a}°. ${QUESTION_ANGLE(V)}`,
      format: "short",
      expected: [`${90 - a}°`],
      comparator: "number_equal",
      explanation: expl(`Les deux angles aigus d’un triangle rectangle font 90° ensemble : 90 − ${a} = ${90 - a}°.`),
      canvas: figTroisAngles(noms, noms.map((x) => (x === S ? 90 : x === U ? a : 90 - a)), noms.indexOf(V), { rightAngleAt: (["A", "B", "C"] as Cle[])[noms.indexOf(S)] }),
    };
  }
  if (forme === "iso") {
    const sommet = 2 * ri(10, 75);
    const b = (180 - sommet) / 2;
    const fig = figAngles([U, V, S], b, b, { angleLabels: { C: `${sommet}°`, B: "?" }, marks: { equalSides: [["CA", "BC"]] } });
    return {
      text: `${pick([`Le toit de la cabane ${de(P.nom)} forme un triangle ${nom} isocèle en ${S}.`, `La voile du bateau ${de(P.nom)} est un triangle ${nom} isocèle en ${S}.`, `Le triangle ${nom} est isocèle en ${S}.`])} L’angle en ${S} mesure ${sommet}°. ${QUESTION_ANGLE(V)}`,
      format: "short",
      expected: [`${b}°`],
      comparator: "number_equal",
      explanation: expl(`Isocèle en ${S} : les angles en ${U} et ${V} sont égaux. Ils font ensemble 180 − ${sommet} = ${180 - sommet}°, donc chacun ${180 - sommet} ÷ 2 = ${b}°.`),
      canvas: fig,
    };
  }
  if (forme === "double") {
    const y = ri(15, 50);
    const c = 180 - 3 * y;
    const t = noms.map((x) => (x === S ? 2 * y : x === U ? y : c));
    return {
      text: `Dans le triangle ${nom}, l’angle en ${S} mesure le double de l’angle en ${U}, et l’angle en ${V} mesure ${c}°. ${QUESTION_ANGLE(U)}`,
      format: "short",
      expected: [`${y}°`],
      comparator: "number_equal",
      explanation: expl(`Les angles en ${S} et ${U} font ensemble 180 − ${c} = ${180 - c}°. L’angle en ${S} compte pour 2 parts, celui en ${U} pour 1 : 3 parts. ${180 - c} ÷ 3 = ${y}°.`),
      canvas: figTroisAngles(noms, t, noms.indexOf(U)),
    };
  }
  // deplus : l'angle en S dépasse de d celui en U.
  const y = ri(20, 60), d = ri(5, 40);
  const c = 180 - 2 * y - d;
  if (c < 15) return genDefiTri(etoile);
  const t = noms.map((x) => (x === S ? y + d : x === U ? y : c));
  return {
    text: `Dans le triangle ${nom}, l’angle en ${V} mesure ${c}°, et l’angle en ${S} a ${d}° de plus que l’angle en ${U}. ${QUESTION_ANGLE(U)}`,
    format: "short",
    expected: [`${y}°`],
    comparator: "number_equal",
    explanation: expl(`Les angles en ${S} et ${U} font ensemble 180 − ${c} = ${180 - c}°. On retire les ${d}° de plus : ${180 - c} − ${d} = ${180 - c - d}, partagé en deux : ${180 - c - d} ÷ 2 = ${y}°.`),
    canvas: figTroisAngles(noms, t, noms.indexOf(U)),
  };
}

// ─── TRIANGLE_RECONNAITRE ──────────────────────────────────────────────────
function genReconnaitre(etoile: 1 | 2 | 3): Gen {
  const P = pick(PRENOMS);
  const [X, Y, Z, W] = lettres(4);
  const nom = `${X}${Y}${Z}`;
  const intr = intro(P, nom);
  const fig = figAngles([X, Y, Z], ri(40, 80), ri(40, 80));
  const formes = { 1: ["sommets", "compter", "estSommet"], 2: ["oppose", "sommetOppose", "rencontre"], 3: ["angleEntre", "coteCommun", "rencontre"] }[etoile];
  const forme = pick(formes);
  const qcm = (text: string, juste: string, faux: string[], e: string): Gen => ({
    text,
    format: "qcm",
    choices: shuffle([juste, ...faux]),
    expected: [juste],
    comparator: "mcq_exact",
    explanation: expl(e),
    canvas: fig,
  });
  if (forme === "sommets")
    return qcm(
      `${intr} ${pick(["Quels sont ses sommets ?", "Cite les sommets de ce triangle.", `Quels sont les sommets du triangle ${nom} ?`])}`,
      `${X}, ${Y} et ${Z}`,
      [`${seg(X, Y)}, ${seg(Y, Z)} et ${seg(X, Z)}`, `${X} et ${Y}`, `${X}, ${Y}, ${Z} et ${W}`],
      `Les sommets sont les trois points du nom : ${X}, ${Y} et ${Z}. Les côtés, eux, s’écrivent avec des crochets.`,
    );
  if (forme === "compter") {
    const quoi = pick(["sommets", "côtés", "angles"]);
    return qcm(`${intr} ${pick([`Combien de ${quoi} a le triangle ${nom} ?`, `Combien le triangle ${nom} a-t-il de ${quoi} ?`])}`, "3", ["2", "4", "6"], `Un triangle a 3 sommets, 3 côtés et 3 angles : ${quoi === "sommets" ? `${X}, ${Y}, ${Z}` : quoi === "côtés" ? `${seg(X, Y)}, ${seg(Y, Z)}, ${seg(X, Z)}` : `un en ${X}, un en ${Y}, un en ${Z}`}.`);
  }
  if (forme === "estSommet") {
    const oui = Math.random() < 0.5;
    const p = oui ? pick([X, Y, Z]) : W;
    return qcm(`${intr} Le point ${p} est-il un sommet du triangle ${nom} ?`, oui ? "oui" : "non", [oui ? "non" : "oui"], oui ? `${p} est une des trois lettres du nom ${nom} : c’est un sommet.` : `Les sommets sont ${X}, ${Y} et ${Z} : ${p} n’en fait pas partie.`);
  }
  const [S, U, V] = shuffle([X, Y, Z]);
  if (forme === "oppose")
    return qcm(
      `${intr} ${pick([`Quel côté est opposé au sommet ${S} ?`, `Dans le triangle ${nom}, quel est le côté opposé au sommet ${S} ?`, `Quel côté du triangle ${nom} ne touche pas le sommet ${S} ?`])}`,
      seg(U, V),
      [seg(S, U), seg(S, V)],
      `Le côté opposé à ${S} est celui qui ne passe pas par ${S} : ${seg(U, V)}.`,
    );
  if (forme === "sommetOppose")
    return qcm(
      `${intr} ${pick([`Quel sommet est opposé au côté ${seg(U, V)} ?`, `Le côté ${seg(U, V)} est opposé à quel sommet ?`])}`,
      S,
      [U, V],
      `Le sommet opposé à ${seg(U, V)} est le seul qui n’est pas sur ce côté : ${S}.`,
    );
  if (forme === "rencontre")
    return qcm(
      `${intr} ${pick([`En quel sommet les côtés ${seg(S, U)} et ${seg(S, V)} se rejoignent-ils ?`, `Les côtés ${seg(S, U)} et ${seg(S, V)} forment un angle. Quel est son sommet ?`])}`,
      S,
      [U, V],
      `Les deux côtés ont une lettre commune : ${S}. C’est là qu’ils se rejoignent.`,
    );
  if (forme === "angleEntre")
    return qcm(
      `${intr} ${pick([`Quel angle est formé par les côtés ${seg(S, U)} et ${seg(S, V)} ?`, `Comment nomme-t-on l’angle compris entre ${seg(S, U)} et ${seg(S, V)} ?`])}`,
      `l’angle ${U}${S}${V}`,
      [`l’angle ${S}${U}${V}`, `l’angle ${U}${V}${S}`],
      `Le sommet de cet angle est la lettre commune ${S} : on l’écrit au milieu, l’angle ${U}${S}${V} (ou ${V}${S}${U}).`,
    );
  // coteCommun : les angles en U et en V ont en commun le côté [UV].
  return qcm(
    `${intr} ${pick([`Quel côté est commun aux angles ${S}${U}${V} et ${S}${V}${U} ?`, `Les angles ${S}${U}${V} et ${U}${V}${S} ont un côté en commun. Lequel ?`])}`,
    seg(U, V),
    [seg(S, U), seg(S, V)],
    `Le premier angle a pour sommet ${U}, le second ${V} : leur côté commun relie ${U} et ${V}, c’est ${seg(U, V)}.`,
  );
}

export const trianglesBank: TutorBankItemV4[] = [
  // =========================
  // TRIANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien de côtés possède un triangle ?",
    format: "qcm",
    choices: ["2", "3", "4", "5"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Le mot triangle commence par tri-, qui indique trois.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Un triangle possède 3 côtés, 3 sommets et 3 angles.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Dans le triangle ABC, quels sont les sommets ?",
    format: "qcm",
    choices: ["A, B et C", "AB, BC et CA", "A seulement", "ABC seulement"],
    expected: ["A, B et C"],
    comparator: "mcq_exact",
    hint: "Les sommets sont les points du triangle.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Les sommets du triangle ABC sont les points A, B et C.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "sommets", "qcm"],
    canvas: triangleCanvas({}),
  },
  // 08/10/2026 : « triangle_reconnaitre_open_1 » (une figure à 3 côtés, son nom ?)
  // supprimée par Frédéric : trop facile pour la 5e.

  // =========================
  // TRIANGLE_NATURE
  // =========================
  {
    kind: "fixed",
    id: "triangle_nature_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle est la nature du triangle représenté ?",
    format: "qcm",
    choices: ["triangle quelconque", "triangle isocèle", "triangle rectangle", "triangle équilatéral"],
    expected: ["triangle rectangle"],
    comparator: "mcq_exact",
    hint: "Cherche le codage de l’angle droit.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Le petit carré rouge indique un angle droit. Le triangle est donc rectangle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "rectangle", "qcm"],
    canvas: triangleCanvas({ type: "rectangle" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Observe le codage des côtés. Quelle est la nature de ce triangle ?",
    format: "qcm",
    choices: ["triangle isocèle", "triangle rectangle", "triangle quelconque", "quadrilatère"],
    expected: ["triangle isocèle"],
    comparator: "mcq_exact",
    hint: "Deux côtés portent le même codage.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Deux côtés sont codés égaux. Le triangle est donc isocèle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "isocele", "qcm"],
    canvas: triangleCanvas({ type: "isocele" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle qui possède trois côtés de même longueur est...",
    format: "qcm",
    choices: ["équilatéral", "rectangle", "quelconque", "obtusangle"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Équi- signifie égal.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Un triangle avec trois côtés égaux est un triangle équilatéral.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "nature", "equilateral", "qcm"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Sur la figure, le petit carré code un angle droit. En quel sommet est l’angle droit ?",
    format: "qcm",
    choices: ["A","B","C"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Cherche le petit carré dans un coin du triangle.",
    explanation: expl("Le petit carré est dans le coin A. L’angle en A est droit : il mesure 90°. Le triangle ABC est rectangle en A."),
    tags: ["triangle_figure","nature","rectangle","qcm"],
    canvas: triangleCanvas({ type: "rectangle" }),
  },
  {
    kind: "template",
    id: "triangle_nature_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le troisième angle : 180° en tout.",
    tags: ["triangle_figure", "nature", "template", "canvas"],
    generate: () => genNature(3),
  },

  // =========================
  // TRIANGLE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_construire_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un triangle ABC connaissant AB = 6 cm, AC = 4 cm et BC = 5 cm, quel instrument est indispensable pour reporter les longueurs ?",
    format: "qcm",
    choices: ["un compas", "un rapporteur", "une calculatrice", "une équerre seulement"],
    expected: ["un compas"],
    comparator: "mcq_exact",
    hint: "On reporte des distances avec un compas.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Pour construire un triangle à partir de trois longueurs, on utilise notamment le compas pour reporter les distances.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "instrument", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les côtés mesurent 2 cm, 3 cm et 8 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Dans un triangle, le plus grand côté doit être plus petit que la somme des deux autres.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("2 + 3 = 5, et 5 est plus petit que 8. On ne peut donc pas construire ce triangle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "inegalite_triangulaire", "piege"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    text: "Peut-on construire un triangle dont les côtés mesurent 4 cm, 5 cm et 7 cm ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Compare le plus grand côté avec la somme des deux autres.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Le plus grand côté est 7 cm. Or 4 + 5 = 9, et 9 > 7. Le triangle est constructible.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "construire", "inegalite_triangulaire"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Un triangle aurait des côtés de 2 cm, 3 cm et 8 cm. Combien font les deux plus petits côtés ensemble ?",
    format: "short",
    expected: ["5 cm","5"],
    comparator: "number_equal",
    hint: "Additionne 2 et 3.",
    explanation: expl("2 + 3 = 5. Or 5 est plus petit que 8. Les deux petits côtés sont trop courts pour se rejoindre : on ne peut pas construire ce triangle."),
    tags: ["triangle_figure","construire","short","raisonnement"],
  },
  {
    kind: "template",
    id: "triangle_construire_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 4,
    theme: "neutral",
    hint: "Le plus grand côté doit être plus petit que la somme des deux autres.",
    tags: ["triangle_figure", "construire", "template", "inegalite_triangulaire"],
    generate: () => genInegalite(4),
  },

  // =========================
  // TRIANGLE_SOMME_ANGLES
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un triangle, la somme des trois angles vaut...",
    format: "qcm",
    choices: ["90°", "120°", "180°", "360°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale des triangles.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Dans tout triangle, la somme des mesures des trois angles est égale à 180°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "qcm"],
    canvas: triangleCanvas({
      angleLabels: { A: "60°", B: "70°", C: "50°" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 50° et 60°. Combien mesure le troisième angle ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "Calcule 180 - 50 - 60.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("La somme des angles vaut 180°. Donc le troisième angle vaut 180 - 50 - 60 = 70°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "calcul"],
    canvas: triangleCanvas({
      angleLabels: { A: "50°", B: "60°", C: "?" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle possède deux angles de 45° et 45°. Le troisième angle mesure...",
    format: "qcm",
    choices: ["45°", "60°", "90°", "180°"],
    expected: ["90°"],
    comparator: "mcq_exact",
    hint: "45 + 45 = 90, puis complète jusqu’à 180.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("45° + 45° = 90°. Il reste donc 180° - 90° = 90°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "somme_angle", "rectangle", "qcm"],
    canvas: triangleCanvas({
      type: "rectangle",
      angleLabels: { A: "90°", B: "45°", C: "45°" },
    }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Dans le triangle ABC, l’angle en A mesure 70° et l’angle en B mesure 45°. Combien mesure l’angle en C ?",
    format: "short",
    expected: ["65°","65"],
    comparator: "number_equal",
    hint: "Les trois angles font 180° en tout.",
    explanation: expl("Les trois angles font 180°. 70 + 45 = 115. 180 − 115 = 65. L’angle en C mesure 65°."),
    tags: ["triangle_figure","somme_angle","short","methode"],
    canvas: triangleCanvas({ angleLabels: { A: "70°", B: "45°", C: "?" } }),
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Somme des angles : 180°. Rectangle : un angle de 90°. Isocèle : deux angles égaux.",
    tags: ["triangle_figure", "somme_angle", "template", "calcul"],
    generate: () => genSomme(4),
  },

  // =========================
  // TRIANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "triangle_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Un élève dit : « ce triangle est rectangle car il a un côté horizontal ». Ses angles mesurent 50°, 60° et 70°. Est-il rectangle ?",
    format: "qcm",
    choices: ["oui","non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Un triangle rectangle a un angle de 90°.",
    explanation: expl("Un triangle rectangle a un angle de 90°. Ici, les angles mesurent 50°, 60° et 70° : aucun ne fait 90°. Il n’est pas rectangle. Un côté horizontal ne veut rien dire."),
    tags: ["triangle_figure","defi","qcm","piege","rectangle"],
    canvas: triangleCanvas({ type: "quelconque", angleLabels: { A: "60°", B: "50°", C: "70°" } }),
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle peut-il avoir deux angles droits ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Deux angles droits feraient déjà 180°.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("Non. Deux angles droits feraient 90° + 90° = 180°, il ne resterait plus de place pour le troisième angle.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "defi", "somme_angle", "piege"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Sur un plan de randonnée à La Réunion, trois chemins forment un triangle. Deux angles mesurent 35° et 85°. Quelle est la mesure du troisième angle ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Utilise 180 - 35 - 85.",
    explanation: "Définition : un triangle est une figure à trois côtés et trois sommets.\n\n" +
          "Méthode : on utilise les propriétés des triangles, des angles ou des constructions.\n\nCalcul : " +
          ("La somme des angles d’un triangle vaut 180°. Le troisième angle mesure 180 - 35 - 85 = 60°.") +
          "\n\nConclusion : la propriété ou la mesure obtenue convient pour ce triangle.",
    tags: ["triangle_figure", "defi", "reunion", "somme_angle"],
    canvas: triangleCanvas({
      angleLabels: { A: "35°", B: "85°", C: "?" },
    }),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La somme des trois angles vaut 180° : pars de là.",
    tags: ["triangle_figure", "defi", "template", "somme_angle", "piege"],
    // ⚠️ 13/10/2026 : l'ancienne version dessinait un triangle étiqueté
    // 100°, 50°, 40° (190° au total) : la figure montrait l'impossible.
    generate: () => genDefiTri(5),
  },

  // =========================
  // TOP-UP — TRIANGLE_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Combien d’angles possède un triangle ?",
    format: "qcm",
    choices: ["3", "2", "4", "1"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Autant que de sommets.",
    explanation: expl("Un triangle a 3 angles, autant que de sommets."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le triangle ABC, comment note-t-on le côté opposé au sommet A ?",
    format: "qcm",
    choices: ["[BC]", "[AB]", "[AC]", "[AA]"],
    expected: ["[BC]"],
    comparator: "mcq_exact",
    hint: "Le côté opposé à A ne contient pas la lettre A.",
    explanation: expl("Le côté opposé au sommet A est celui qui ne contient pas A : c’est [BC]."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle figure n’est PAS un triangle ?",
    format: "qcm",
    choices: [
      "une figure à 4 côtés",
      "une figure à 3 côtés",
      "une figure à 3 sommets",
      "une figure à 3 angles",
    ],
    expected: ["une figure à 4 côtés"],
    comparator: "mcq_exact",
    hint: "Tri- veut dire trois.",
    explanation: expl("Une figure à 4 côtés est un quadrilatère, pas un triangle."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de sommets relie-t-on pour tracer un triangle ?",
    format: "qcm",
    choices: ["3 points non alignés", "2 points", "4 points", "3 points alignés"],
    expected: ["3 points non alignés"],
    comparator: "mcq_exact",
    hint: "Trois points alignés ne forment pas de triangle.",
    explanation: expl("On relie 3 points non alignés : trois points alignés donneraient un segment, pas un triangle."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Dans le triangle ABC, les côtés [AB] et [AC] forment un angle. En quel sommet est cet angle ?",
    format: "qcm",
    choices: ["A","B","C"],
    expected: ["A"],
    comparator: "mcq_exact",
    hint: "Quel point [AB] et [AC] ont-ils en commun ?",
    explanation: expl("[AB] et [AC] partent tous les deux du point A. Ils forment l’angle en A. Un triangle a 3 côtés, 3 sommets et 3 angles."),
    tags: ["triangle_figure","reconnaitre","qcm"],
    canvas: triangleCanvas({}),
  },
  {
    kind: "fixed",
    id: "triangle_reconnaitre_fixed_7",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Dans le triangle ABC, [AB] est un :",
    format: "qcm",
    choices: ["côté", "sommet", "angle", "axe"],
    expected: ["côté"],
    comparator: "mcq_exact",
    hint: "Deux lettres entre crochets désignent un segment.",
    explanation: expl("[AB] désigne le segment reliant A et B : c’est un côté du triangle."),
    tags: ["triangle_figure", "reconnaitre", "qcm"],
    canvas: triangleCanvas({ sideLabels: { AB: "?" } }),
  },
  {
    kind: "template",
    id: "triangle_reconnaitre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Le côté opposé à un sommet ne contient pas sa lettre.",
    tags: ["triangle_figure", "reconnaitre", "template"],
    generate: () => genReconnaitre(2),
  },

  // =========================
  // TOP-UP — TRIANGLE_NATURE
  // =========================
  {
    kind: "fixed",
    id: "triangle_nature_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui a ses trois côtés de même longueur s’appelle :",
    format: "qcm",
    choices: ["équilatéral", "isocèle", "rectangle", "quelconque"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "« équi » signifie égal.",
    explanation: expl("Un triangle équilatéral a ses trois côtés égaux (et ses trois angles de 60°)."),
    tags: ["triangle_figure", "nature", "qcm"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 2,
    theme: "neutral",
    text: "Un triangle qui possède exactement deux côtés de même longueur s’appelle :",
    format: "qcm",
    choices: ["isocèle", "équilatéral", "rectangle", "quelconque"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Deux côtés égaux.",
    explanation: expl("Un triangle isocèle a deux côtés de même longueur."),
    tags: ["triangle_figure", "nature", "qcm"],
    canvas: triangleCanvas({ type: "isocele" }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    text: "Un triangle a un angle de 90°. Quelle est sa nature ?",
    format: "qcm",
    choices: ["rectangle", "équilatéral", "isocèle", "quelconque"],
    expected: ["rectangle"],
    comparator: "mcq_exact",
    hint: "Un angle droit.",
    explanation: expl("Un triangle avec un angle droit (90°) est un triangle rectangle."),
    tags: ["triangle_figure", "nature", "qcm"],
    canvas: triangleCanvas({ type: "rectangle", angleLabels: { A: "90°" } }),
  },
  {
    kind: "fixed",
    id: "triangle_nature_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Un triangle a des côtés de 5 cm, 5 cm et 3 cm. Quelle est sa nature ?",
    format: "qcm",
    choices: ["isocèle","équilatéral","rectangle"],
    expected: ["isocèle"],
    comparator: "mcq_exact",
    hint: "Compte les côtés égaux.",
    explanation: expl("Deux côtés sont égaux (5 cm et 5 cm), le troisième non (3 cm). Le triangle est isocèle. Équilatéral, il faudrait trois côtés égaux."),
    tags: ["triangle_figure","nature","qcm"],
  },
  {
    kind: "template",
    id: "triangle_nature_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_nature",
    difficulty: 3,
    theme: "neutral",
    hint: "Isocèle : deux côtés égaux, ou deux angles égaux. Rectangle : un angle droit.",
    tags: ["triangle_figure", "nature", "template"],
    // ⚠️ 13/10/2026 : l'ancienne version donnait « 3 cm, 4 cm et 5 cm » pour un
    // triangle quelconque — c'est un triangle RECTANGLE (3² + 4² = 5²).
    generate: () => genNature(3),
  },

  // =========================
  // TOP-UP — TRIANGLE_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "triangle_construire_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Quel instrument utilise-t-on pour reporter une longueur de côté lors de la construction d’un triangle ?",
    format: "qcm",
    choices: ["le compas", "le rapporteur", "l’équerre seule", "la calculatrice"],
    expected: ["le compas"],
    comparator: "mcq_exact",
    hint: "On reporte les longueurs avec un écartement.",
    explanation: expl("On reporte une longueur avec le compas (et la règle pour mesurer)."),
    tags: ["triangle_figure", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Pour construire un triangle dont on connaît un côté et les deux angles à ses extrémités, quel instrument trace les angles ?",
    format: "qcm",
    choices: ["le rapporteur", "le compas", "la gomme", "la calculatrice"],
    expected: ["le rapporteur"],
    comparator: "mcq_exact",
    hint: "Un instrument pour les angles.",
    explanation: expl("On trace les angles avec le rapporteur."),
    tags: ["triangle_figure", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    text: "On veut construire un triangle de côtés 5 cm, 6 cm et 8 cm. Par quoi commence-t-on ?",
    format: "qcm",
    choices: [
      "tracer un des côtés à la règle",
      "tracer les trois angles",
      "tracer un cercle complet",
      "écrire la réponse",
    ],
    expected: ["tracer un des côtés à la règle"],
    comparator: "mcq_exact",
    hint: "On pose d’abord une base.",
    explanation: expl("On commence par tracer un côté (la base) à la règle, puis on reporte les deux autres longueurs au compas."),
    tags: ["triangle_figure", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_construire_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "On construit le triangle ABC : AB = 8 cm, AC = 5 cm, BC = 6 cm. [AB] est tracé. Quel écartement faut-il au compas pour l’arc de centre B ?",
    format: "short",
    expected: ["6 cm","6"],
    comparator: "number_equal",
    hint: "Le compas pointé en B reporte la longueur BC.",
    explanation: expl("Pointe en B, on reporte BC = 6 cm. Pointe en A, on reporte AC = 5 cm. Les deux arcs se coupent en C."),
    tags: ["triangle_figure","construire","short"],
  },
  {
    kind: "template",
    id: "triangle_construire_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_inegalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour un triangle réalisable, le plus grand côté doit être inférieur à la somme des deux autres.",
    tags: ["triangle_figure", "construire", "template", "inegalite"],
    generate: () => genInegalite(3),
  },

  // =========================
  // TOP-UP — TRIANGLE_SOMME_ANGLE
  // =========================
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 1,
    theme: "neutral",
    text: "Combien vaut la somme des angles d’un triangle ?",
    format: "qcm",
    choices: ["180°", "90°", "360°", "100°"],
    expected: ["180°"],
    comparator: "mcq_exact",
    hint: "C’est une propriété fondamentale.",
    explanation: expl("La somme des trois angles d’un triangle vaut toujours 180°."),
    tags: ["triangle_figure", "somme_angle", "qcm"],
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle, deux angles mesurent 90° et 30°. Combien mesure le troisième ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "180 - 90 - 30.",
    explanation: expl("Troisième angle = 180 - 90 - 30 = 60°."),
    tags: ["triangle_figure", "somme_angle", "calcul"],
    canvas: triangleCanvas({ type: "rectangle", angleLabels: { A: "90°", B: "30°", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_fixed_6",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un triangle équilatéral, combien mesure chaque angle ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "180 ÷ 3.",
    explanation: expl("Les trois angles sont égaux : chacun mesure 180 ÷ 3 = 60°."),
    tags: ["triangle_figure", "somme_angle", "equilateral"],
    canvas: triangleCanvas({ type: "equilateral", angleLabels: { A: "?", B: "?", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_somme_angle_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 3,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    text: "Dans un triangle, deux angles mesurent 25° et 110°. Combien mesure le troisième ?",
    format: "short",
    expected: ["45°","45"],
    comparator: "number_equal",
    hint: "Pars de 180°.",
    explanation: expl("Les trois angles font 180°. 25 + 110 = 135. 180 − 135 = 45. Le troisième angle mesure 45°."),
    tags: ["triangle_figure","somme_angle","short"],
  },
  {
    kind: "template",
    id: "triangle_somme_angle_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_somme_angle",
    difficulty: 4,
    theme: "neutral",
    hint: "Un triangle isocèle a deux angles égaux ; la somme des trois fait 180°.",
    tags: ["triangle_figure", "somme_angle", "template", "isocele"],
    generate: () => genSomme(4),
  },

  // =========================
  // TOP-UP — TRIANGLE_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "triangle_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un triangle rectangle, un angle aigu mesure 37°. Combien mesure l’autre angle aigu ?",
    format: "short",
    expected: ["53"],
    comparator: "number_equal",
    hint: "Les deux angles aigus font ensemble 90°.",
    explanation: expl("Dans un triangle rectangle, les deux angles aigus font 90°. L’autre angle = 90 - 37 = 53°."),
    tags: ["triangle_figure", "defi", "rectangle", "somme_angle"],
    canvas: triangleCanvas({ type: "rectangle", angleLabels: { A: "90°", B: "37°", C: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un triangle peut-il être à la fois rectangle et isocèle ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Pense à un angle de 90° et deux angles de 45°.",
    explanation: expl("Oui : avec un angle droit et deux angles de 45°, le triangle est rectangle et isocèle."),
    tags: ["triangle_figure", "defi", "qcm", "nature"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_open_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 4,
    theme: "neutral",
    // 08/10/2026 : précise et simple (Frédéric).
    // Frédéric (08/10) : l'élève conclut lui-même.
    text: "Un triangle peut-il avoir des angles de 100°, 50° et 40° ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne les trois angles et compare avec 180°.",
    explanation: expl("100 + 50 + 40 = 190. Dans un triangle, les trois angles font toujours 180°. 190 n’est pas 180 : ce triangle n’existe pas, l’élève se trompe."),
    tags: ["triangle_figure","defi","short","somme_angle","erreur"],
  },
  {
    kind: "fixed",
    id: "triangle_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans un triangle isocèle, l’angle au sommet mesure 40°. Combien mesure chaque angle à la base ?",
    format: "short",
    expected: ["70"],
    comparator: "number_equal",
    hint: "(180 - 40) ÷ 2.",
    explanation: expl("Angles de base = (180 - 40) ÷ 2 = 140 ÷ 2 = 70°."),
    tags: ["triangle_figure", "defi", "isocele", "somme_angle"],
    canvas: triangleCanvas({ type: "isocele", angleLabels: { C: "40°", A: "?", B: "?" } }),
  },
  {
    kind: "fixed",
    id: "triangle_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un triangle a un angle de 60° et est isocèle avec ce sommet. Quelle est sa nature exacte ?",
    format: "qcm",
    choices: ["équilatéral", "rectangle", "quelconque", "aplati"],
    expected: ["équilatéral"],
    comparator: "mcq_exact",
    hint: "Calcule les deux autres angles : (180 - 60) ÷ 2.",
    explanation: expl("Les deux angles de base valent (180 - 60) ÷ 2 = 60°. Les trois angles font 60° : le triangle est équilatéral."),
    tags: ["triangle_figure", "defi", "qcm", "nature"],
    canvas: triangleCanvas({ type: "equilateral" }),
  },
  {
    kind: "template",
    id: "triangle_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "La somme des trois angles vaut 180° : pars de là.",
    tags: ["triangle_figure", "defi", "template", "somme_angle"],
    generate: () => genDefiTri(5),
  },

  /* ===== TRIANGLE_CONSTRUIRE =====
     Les deux générateurs de ce micro portaient sur l'inégalité triangulaire et
     l'ont suivie le 04/08/2026. Celui-ci reste sur le geste de construction :
     quel instrument, dans quel ordre. */
  {
    kind: "template",
    id: "triangle_construire_tpl_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Une longueur se reporte au compas, un angle se trace au rapporteur.",
    tags: ["triangle_figure", "construire", "template", "instrument"],
    generate: () => genConstruire(3),
  },
  {
    kind: "template",
    id: "triangle_construire_tpl_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "triangle_figure",
    microId: "triangle_construire",
    difficulty: 4,
    theme: "neutral",
    hint: "Deux arcs se coupent quand chaque longueur est plus petite que la somme des deux autres.",
    tags: ["triangle_figure", "construire", "template", "ordre"],
    generate: () => genConstruire(4),
  },

  // =========================
  // GABARITS AJOUTÉS LE 13/10/2026 (une étoile servie sans gabarit varié)
  // =========================
  tpl("triangle_reconnaitre_tpl_2", "triangle_reconnaitre", 1, "Les sommets sont les lettres du nom ; un côté s’écrit entre crochets.", () => genReconnaitre(1)),
  tpl("triangle_reconnaitre_tpl_3", "triangle_reconnaitre", 3, "Un angle se nomme avec son sommet au milieu.", () => genReconnaitre(3)),
  tpl("triangle_nature_tpl_3", "triangle_nature", 2, "Compare les longueurs des côtés, ou lis les codages.", () => genNature(2)),
  tpl("triangle_construire_tpl_5", "triangle_construire", 2, "Une longueur se reporte au compas, un angle se trace au rapporteur, un angle droit à l’équerre.", () => genConstruire(2)),
  tpl("triangle_somme_angle_tpl_3", "triangle_somme_angle", 1, "La somme des trois angles d’un triangle vaut 180°.", () => genSomme(1)),
  tpl("triangle_somme_angle_tpl_4", "triangle_somme_angle", 2, "La somme des trois angles d’un triangle vaut 180°.", () => genSomme(2)),
  tpl("triangle_somme_angle_tpl_5", "triangle_somme_angle", 3, "Ajoute les deux angles connus, puis retire-les de 180°.", () => genSomme(3)),
  tpl("triangle_defi_tpl_3", "triangle_defi", 4, "La somme des trois angles vaut 180° ; dans un triangle rectangle, les deux angles aigus font 90°.", () => genDefiTri(4)),
];