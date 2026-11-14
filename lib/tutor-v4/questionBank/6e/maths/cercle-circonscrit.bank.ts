// ─── Médiatrices d'un triangle et cercle circonscrit (6e) ──────────────────────
//
// ⛔ POURQUOI CETTE BANQUE EXISTE (22/08/2026). Le programme de 6e demande, sous
// « Triangles » : « Savoir que les médiatrices d'un triangle sont concourantes »
// et « Connaître et construire le cercle circonscrit à un triangle ». Le coach
// n'en avait aucune micro.
//
// ⭐ C'EST LA PREMIÈRE PREUVE DE L'ANNÉE, ET LE BO LE DIT : « l'élève comprend
// POURQUOI les trois médiatrices d'un triangle sont concourantes et il est
// capable de RESTITUER LES ARGUMENTS DE LA PREUVE de ce résultat ». Ce n'est
// donc pas un résultat à admettre — c'est un raisonnement à refaire. D'où le
// poids donné ici aux questions ouvertes : restituer une preuve ne se coche pas
// dans un QCM.
//
// La preuve, en trois lignes, et elle ne tient que par la propriété
// caractéristique de la médiatrice, dans les DEUX sens :
//   · O est sur la médiatrice de [AB], donc OA = OB ;
//   · O est sur la médiatrice de [BC], donc OB = OC ;
//   · donc OA = OC, donc O est sur la médiatrice de [AC].
// Le troisième pas utilise le sens « équidistant ⇒ sur la médiatrice », celui
// que l'élève oublie. C'est pour cela que `mediatrice_propriete` le porte dans
// les deux ordres : cette notion-ci en dépend entièrement.
//
// ⭐ ET LE CERCLE CIRCONSCRIT TOMBE TOUT SEUL : OA = OB = OC, donc les trois
// sommets sont à la même distance de O — ils sont sur un même cercle de centre
// O. La construction n'est que la lecture de la preuve.

import type { TutorBankItemV4, TutorGeneratedQuestionV4, CercleCanvasData } from "@/lib/tutor-v4/types";
import { PRENOMS, pick } from "./entiers.bank";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import * as geo from "@/lib/canvas/construction";

function shuffle<T>(arr: T[]): T[] {
  return melangeEnPlace([...arr]);
}

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function expl(calcul: string) {
  return (
    "Définition : le cercle circonscrit à un triangle est le cercle qui passe par ses trois sommets.\n\n" +
    "Méthode : son centre est le point de concours des médiatrices des côtés — c'est le seul point à égale distance des trois sommets.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

/**
 * Un triangle INSCRIT dans son cercle circonscrit : les trois sommets sur le
 * cercle, les trois côtés dessinés comme des cordes, le centre O au milieu.
 *
 * ⚠️ Le canvas `triangle` ne sait pas dessiner de cercle, et le canvas `cercle`
 * ne sait pas dessiner de triangle — mais il sait tracer des CORDES. Trois
 * cordes bout à bout font le triangle, et c'est la figure exacte dont on a
 * besoin : elle montre en même temps le triangle, le cercle et le centre.
 */
function triangleInscrit(opts: { centreVisible: boolean; rayons?: boolean }): CercleCanvasData {
  const cx = 170;
  const cy = 155;
  const r = 95;
  const pos = (deg: number) => ({
    x: cx + r * Math.cos((deg * Math.PI) / 180),
    y: cy - r * Math.sin((deg * Math.PI) / 180),
  });
  const A = pos(205);
  const B = pos(335);
  const C = pos(95);

  const points: CercleCanvasData["points"] = [
    { id: "A", x: A.x, y: A.y, label: "A" },
    { id: "B", x: B.x, y: B.y, label: "B" },
    { id: "C", x: C.x, y: C.y, label: "C" },
  ];
  const segments: CercleCanvasData["segments"] = [
    { id: "AB", kind: "corde", from: "A", to: "B" },
    { id: "BC", kind: "corde", from: "B", to: "C" },
    { id: "CA", kind: "corde", from: "C", to: "A" },
  ];

  if (opts.centreVisible) {
    points.push({ id: "O", x: cx, y: cy, label: "O", color: "#ef4444", highlight: true });
    if (opts.rayons) {
      segments.push(
        { id: "OA", kind: "rayon", from: "O", to: "A", dashed: true },
        { id: "OB", kind: "rayon", from: "O", to: "B", dashed: true },
        { id: "OC", kind: "rayon", from: "O", to: "C", dashed: true }
      );
    }
  }

  return {
    kind: "cercle",
    size: { width: 340, height: 310 },
    circle: { cx, cy, r, showCircle: true },
    points,
    segments,
    display: { showLabels: true, showPoints: true, showCenter: opts.centreVisible },
  };
}

// =========================
// ⭐ 06/10/2026 — LETTRES, SITUATIONS, PRÉNOMS, TOURNURES
// (PASSATION-COACH-MATHS-6E-CONSIGNE.md). Mesuré le 06/10 : 6 à 11 squelettes
// par micro, 10 à 16 répétitions sur 20 : le triangle s'appelait toujours ABC
// et le centre O. Les questions ouvertes à mots-clés (toute réponse contenant
// « médiatrice » passait) deviennent des QCM sur CHAQUE PAS de la preuve et du
// programme de construction : la restitution se fait pas à pas, et elle est
// corrigée. Correcteurs : correcteurs/cercle-circonscrit.ts.
// =========================

const LETTRES = "ABCDEFGHIJKLMNPRSTUVWXYZ".split("");
function lettres(k: number): string[] {
  return shuffle(LETTRES).slice(0, k);
}
const maj = (s: string) => s[0].toUpperCase() + s.slice(1);
/** Un triangle R S T, son centre K : des lettres tirées au sort. */
function triangleEtCentre() {
  const [a, b, c, o] = lettres(4);
  return { a, b, c, o, nom: `${a}${b}${c}` };
}
/**
 * Le triangle inscrit, avec les lettres de l'énoncé, une forme qui change, et
 * (si `rayon`) la longueur écrite sur le rayon [o s].
 */
function triangleInscritNomme(
  t: { a: string; b: string; c: string; o: string },
  opts: { rayon?: { vers: string; label: string } } = {},
): CercleCanvasData {
  const cx = 170;
  const cy = 155;
  const r = 95;
  const pos = (deg: number) => ({
    x: Math.round(cx + r * Math.cos((deg * Math.PI) / 180)),
    y: Math.round(cy - r * Math.sin((deg * Math.PI) / 180)),
  });
  const angles = [randomInt(190, 230), randomInt(310, 350), randomInt(70, 120)];
  const [A, B, C] = angles.map(pos);
  return {
    kind: "cercle",
    size: { width: 340, height: 310 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: t.a, x: A.x, y: A.y, label: t.a },
      { id: t.b, x: B.x, y: B.y, label: t.b },
      { id: t.c, x: C.x, y: C.y, label: t.c },
      { id: t.o, x: cx, y: cy, label: t.o, color: "#ef4444", highlight: true },
    ],
    segments: [
      { id: "c1", kind: "corde", from: t.a, to: t.b },
      { id: "c2", kind: "corde", from: t.b, to: t.c },
      { id: "c3", kind: "corde", from: t.c, to: t.a },
      ...[t.a, t.b, t.c].map((s) => ({
        id: `r${s}`,
        kind: "rayon" as const,
        from: t.o,
        to: s,
        dashed: !(opts.rayon && opts.rayon.vers === s),
        ...(opts.rayon && opts.rayon.vers === s ? { label: opts.rayon.label, highlight: true } : {}),
      })),
    ],
    display: { showLabels: true, showPoints: true, showCenter: true },
  };
}

// =====================================================================
// ⭐ 07/11/2026 — LA MÊME PHRASE REVENAIT (mesurer-squelettes-coach.ts --lettres :
// jusqu'à 10,9 répétitions sur 20). Deux gabarits et quatre figés sur quatre
// étoiles : chaque étoile reçoit ici ses gabarits « à plusieurs façons » (compter,
// vrai/faux, lire la figure, enchaîner les égalités, repérer un raisonnement faux,
// calculer un périmètre, prendre la propriété dans l'autre sens). ★2 : 15 mots au
// plus, sans contexte. ★3 : 25 mots au plus, une situation simple.
// Correcteurs : correcteurs/cercle-circonscrit.ts, section du 07/11.
// =====================================================================
type G = TutorGeneratedQuestionV4;
type Fig = CercleCanvasData | ConstructionCanvasData;
const qc = (text: string, juste: string, faux: string[], calcul: string, canvas?: Fig): G => ({
  text, format: "qcm", choices: shuffle([juste, ...faux]), expected: [juste], comparator: "mcq_exact", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte : une longueur, l'unité est facultative pour l'élève. */
const lg = (text: string, v: number, calcul: string, canvas?: Fig, u = "cm"): G => ({
  text, format: "short", expected: [`${v} ${u}`, String(v)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte : un nombre sans unité. */
const nb = (text: string, n: number, calcul: string, canvas?: Fig): G => ({
  text, format: "short", expected: [String(n)], comparator: "number_equal", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
/** Réponse courte en lettres : toutes les écritures justes sont acceptées. */
const lt = (text: string, justes: string[], calcul: string, canvas?: Fig): G => ({
  text, format: "short", expected: justes, comparator: "exact_text", explanation: expl(calcul), ...(canvas ? { canvas } : {}),
});
const ouiNon = (text: string, oui: boolean, calcul: string, canvas?: Fig) => qc(text, oui ? "oui" : "non", [oui ? "non" : "oui"], calcul, canvas);
const vraiFaux = (text: string, vrai: boolean, calcul: string) => qc(text, vrai ? "vrai" : "faux", [vrai ? "faux" : "vrai"], calcul);

/** Les sommets dans l'ordre alphabétique : les segments s'écrivent [AB], [AC], [BC]. */
function tri() {
  const [x, y, z, o] = lettres(4);
  const [a, b, c] = [x, y, z].sort();
  return { a, b, c, o, nom: `${a}${b}${c}` };
}
type Tri = ReturnType<typeof tri>;

/**
 * Figure sans aucun repère de couleur : le centre n'est pas surligné, pour que
 * « quel point est le centre ? » se lise sur le dessin sans être donné. `rayons`
 * trace les trois rayons ; `hors` écarte ce sommet du cercle (dedans ou dehors).
 */
function figureSobre(t: Tri, opts: { rayons?: boolean; hors?: string } = {}): Fig {
  const cx = 170;
  const cy = 155;
  const r = 95;
  const pos = (deg: number, k: number) => ({
    x: Math.round(cx + k * r * Math.cos((deg * Math.PI) / 180)),
    y: Math.round(cy - k * r * Math.sin((deg * Math.PI) / 180)),
  });
  const k = pick([0.6, 1.3]);
  const [A, B, C] = [t.a, t.b, t.c].map((s, i) => pos([randomInt(190, 230), randomInt(310, 350), randomInt(70, 120)][i], s === opts.hors ? k : 1));
  return {
    kind: "cercle",
    size: { width: 340, height: 310 },
    circle: { cx, cy, r, showCircle: true },
    points: [
      { id: t.a, x: A.x, y: A.y, label: t.a },
      { id: t.b, x: B.x, y: B.y, label: t.b },
      { id: t.c, x: C.x, y: C.y, label: t.c },
      { id: t.o, x: cx, y: cy, label: t.o },
    ],
    segments: [
      { id: "c1", kind: "corde", from: t.a, to: t.b },
      { id: "c2", kind: "corde", from: t.b, to: t.c },
      { id: "c3", kind: "corde", from: t.c, to: t.a },
      ...(opts.rayons ? [t.a, t.b, t.c].map((s) => ({ id: `r${s}`, kind: "rayon" as const, from: t.o, to: s, dashed: true })) : []),
    ],
    display: { showLabels: true, showPoints: true, showCenter: false },
  };
}
// =====================================================================
// ⭐ 14/11/2026 — UNE FIGURE PAR ÉNONCÉ (ses 6e lisent difficilement). Canvas
// `construction` : le triangle est construit DEPUIS son centre O, chaque sommet à la
// distance demandée (`dist`) : quand les trois sont égales, O est vraiment le centre du
// cercle circonscrit ; quand l'énoncé donne trois distances différentes, la figure les
// respecte. Les médiatrices sont calculées (milieu + perpendiculaire), jamais posées.
// ⛔ Rien de ce qui est demandé n'est tracé : ni la médiatrice cherchée, ni le cercle
// quand on demande par où il passe ; une longueur cherchée s'écrit « ? ».
// =====================================================================
type Cote = "ab" | "bc" | "ac";
function figCC(
  t: { a: string; b: string; c: string; o: string },
  op: {
    centre?: boolean;
    cercle?: boolean;
    meds?: Cote[];
    /** Les rayons en pointillés, sommet → texte (true : sans texte). */
    rayons?: Partial<Record<string, string | true>>;
    /** Les distances de O à a, b, c (par défaut égales). */
    dist?: [number, number, number];
    /** false : les points seuls, sans les côtés. */
    cotes?: boolean;
    angles?: [number, number, number];
    /** false : points sans nom (des lieux d'une situation). */
    noms?: boolean;
    /** Les côtés codés égaux (nombre de tirets), donnée de l'énoncé. */
    codesCotes?: Partial<Record<Cote, number>>;
    /** Un autre point posé à la distance `d` de O. */
    autre?: { nom: string; d: number; angle: number };
  } = {},
): ConstructionCanvasData {
  const [da, db, dc] = op.dist ?? [3, 3, 3];
  const [ta, tb, tc] = op.angles ?? [randomInt(200, 230), randomInt(310, 340), randomInt(75, 110)];
  const O = geo.point(0, 0);
  const pts: Record<string, geo.P> = { [t.a]: geo.surCercle(O, da, ta), [t.b]: geo.surCercle(O, db, tb), [t.c]: geo.surCercle(O, dc, tc) };
  const cache: string[] = [];
  if (op.centre || op.cercle || op.rayons) {
    pts[t.o] = O;
    if (!op.centre) cache.push(t.o);
  }
  if (op.autre) pts[op.autre.nom] = geo.surCercle(O, op.autre.d, op.autre.angle);
  const segments: NonNullable<ConstructionCanvasData["segments"]> = [];
  const droites: NonNullable<ConstructionCanvasData["droites"]> = [];
  const angles: NonNullable<ConstructionCanvasData["angles"]> = [];
  const bouts: Record<Cote, [string, string]> = { ab: [t.a, t.b], bc: [t.b, t.c], ac: [t.a, t.c] };
  (["ab", "bc", "ac"] as Cote[]).forEach((k, i) => {
    const [x, y] = bouts[k];
    if (!op.meds?.includes(k)) {
      if (op.cotes !== false) segments.push({ a: x, b: y, code: op.codesCotes?.[k] });
      return;
    }
    const m = geo.milieu(pts[x], pts[y]);
    const dx = pts[y].x - pts[x].x;
    const dy = pts[y].y - pts[x].y;
    const n = Math.hypot(dx, dy) || 1;
    const l = 0.12 * (da + db + dc);
    pts[`_m${k}`] = m;
    pts[`_n${k}`] = { x: m.x - (dy / n) * l, y: m.y + (dx / n) * l };
    cache.push(`_m${k}`, `_n${k}`);
    segments.push({ a: x, b: `_m${k}`, code: i + 1 }, { a: `_m${k}`, b: y, code: i + 1 });
    droites.push({ a: `_m${k}`, b: `_n${k}`, couleur: "#2563eb" });
    angles.push({ sommet: `_m${k}`, de: y, vers: `_n${k}`, droit: true, rayon: 9 });
  });
  for (const [s, texte] of Object.entries(op.rayons ?? {})) {
    if (texte) segments.push({ a: t.o, b: s, pointille: true, couleur: "#7c3aed", texte: texte === true ? undefined : texte });
  }
  const fig = geo.figureConstruction(pts, { segments, droites, angles, cercles: op.cercle ? [{ centre: t.o, rayon: da, couleur: "#059669" }] : undefined }, cache);
  if (op.noms === false) fig.points = fig.points.map((p) => ({ ...p, nom: "" }));
  return fig;
}
/** Le triangle inscrit dans le cercle de rayon r, avec [ab] = x et [bc] = y (ou [ac] = y) : les angles au centre des cordes. */
function cordes(r: number, x: number, y: number, yEnAC: boolean): { dist: [number, number, number]; angles: [number, number, number] } {
  const angle = (l: number) => (2 * Math.asin(l / (2 * r)) * 180) / Math.PI;
  const ta = randomInt(190, 220);
  return { dist: [r, r, r], angles: [ta, ta + angle(x), yEnAC ? ta - angle(y) : ta + angle(x) + angle(y)] };
}
/** La figure par défaut d'un gabarit, si la phrase tirée n'a pas déjà la sienne. */
const avec = (q: G, canvas: ConstructionCanvasData | Fig): G => (q.canvas ? q : { ...q, canvas });

/** Un gabarit de la notion cercle_circonscrit. */
function gab(id: string, microId: string, difficulty: 2 | 3 | 4 | 5, hint: string, tags: string[], generate: () => G): TutorBankItemV4 {
  return { kind: "template", id, niveau: "6e", matiere: "maths", notionId: "cercle_circonscrit", microId, difficulty, theme: "neutral", hint, tags, generate: () => sansLettresEnTrop(generate()) } as TutorBankItemV4;
}
/** Une figure ne montre que les lettres de l'énoncé (ou de ses propositions) : les autres sommets restent sans nom. */
function sansLettresEnTrop(q: G): G {
  const c = q.canvas as ConstructionCanvasData | undefined;
  if (!c || c.kind !== "construction") return q;
  const lu = new Set([q.text, ...(q.choices ?? [])].join(" ").match(/(?<![\p{L}’])[A-Z]{1,3}(?![\p{L}’])/gu)?.flatMap((m) => [...m]) ?? []);
  const points = c.points.map((p) => {
    const n = p.nom ?? p.id;
    return p.cache || n === "" || n === "?" || (n.length === 1 && lu.has(n)) ? p : { ...p, nom: "" };
  });
  return { ...q, canvas: { ...c, points } };
}
/** Une phrase et sa construction : on tire l'une, la réponse vient avec. */
const tirePhrase = (phrases: Array<() => G>): G => pick(phrases)();

const EGALE_DISTANCE = "Tout point de la médiatrice d’un segment est à égale distance de ses extrémités.";
const INVERSE = "Un point à égale distance des extrémités d’un segment est sur sa médiatrice.";
const CONCOURS = "Les trois médiatrices d’un triangle se coupent en un même point : le centre du cercle circonscrit.";

// ----- CONCOURANTES, ★2
function genC2Compter(): G {
  const T = tri();
  const { nom, o } = T;
  const tous = "Un triangle a trois côtés, donc trois médiatrices, et elles passent par un même point.";
  return avec(tirePhrase([
    () => nb("Combien de médiatrices a un triangle ?", 3, "Une médiatrice par côté : trois côtés, trois médiatrices."),
    () => nb("Chaque côté d’un triangle a combien de médiatrices ?", 1, "Un segment a une seule médiatrice."),
    () => nb("En combien de points se coupent les trois médiatrices d’un triangle ?", 1, CONCOURS),
    () => nb(`Les médiatrices du triangle ${nom} ont combien de points communs ?`, 1, CONCOURS),
    () => nb("Combien de médiatrices passent par le centre du cercle circonscrit ?", 3, tous),
    () => nb("Deux médiatrices d’un triangle se coupent en combien de points ?", 1, "Deux droites qui se coupent ont un seul point commun."),
    () => nb(`Les médiatrices de ${nom} se coupent en ${o}. Combien passent par ${o} ?`, 3, tous),
    () => nb(`Combien de sommets de ${nom} sont sur son cercle circonscrit ?`, 3, "Le cercle circonscrit passe par les trois sommets."),
  ]), figCC(T));
}
function genC2VraiFaux(): G {
  const [t, v, p] = pick<[string, boolean, string]>([
    ["les trois médiatrices d’un triangle se coupent en un même point.", true, CONCOURS],
    ["les médiatrices d’un triangle sont toujours parallèles.", false, CONCOURS],
    ["les médiatrices d’un triangle sont concourantes.", true, CONCOURS],
    ["le point de concours est toujours le milieu d’un côté.", false, "Ce n’est pas toujours le cas : il dépend de la forme du triangle."],
    ["le point de concours est toujours à l’intérieur du triangle.", false, "Dans un triangle très ouvert, il est à l’extérieur."],
    ["le point de concours est à égale distance des trois sommets.", true, "Il est sur les trois médiatrices, donc à égale distance des trois sommets."],
    ["le point de concours est à égale distance des trois côtés.", false, "Il est à égale distance des trois SOMMETS, pas des côtés."],
    ["le point de concours est le centre du cercle circonscrit.", true, CONCOURS],
    ["un triangle a seulement deux médiatrices.", false, "Un triangle a trois côtés, donc trois médiatrices."],
    ["concourantes veut dire : qui passent par un même point.", true, "Des droites concourantes passent par un même point."],
  ]);
  // Un triangle quelconque, sans rien de tracé : la phrase reste à juger.
  return avec(vraiFaux(`Vrai ou faux : ${t}`, v, p), figCC(tri()));
}
function genC2Mot(): G {
  const T = tri();
  const { o, nom } = T;
  const conc = (text: string) => qc(text, "concourantes", ["parallèles", "perpendiculaires", "égales"], "Des droites concourantes passent par un même point.");
  return avec(tirePhrase([
    () => conc("Trois droites passent par un même point. Comment sont-elles ?"),
    () => conc("Quel mot veut dire « qui passent par un même point » ?"),
    () => conc("Complète : les trois médiatrices d’un triangle sont …"),
    () => qc("Comment s’appelle le point où se coupent les médiatrices ?", "le point de concours", ["le sommet", "le milieu", "le rayon"], CONCOURS),
    () => qc("Le point de concours des médiatrices est le centre de quoi ?", "du cercle circonscrit", ["du plus grand côté", "de la médiatrice", "du premier sommet"], CONCOURS),
    () => qc(`Les médiatrices de ${nom} se coupent en ${o}. Que représente ${o} ?`, "le centre du cercle circonscrit", ["un sommet du triangle", "le milieu du plus grand côté", "un point du cercle circonscrit"], CONCOURS),
    () => qc("Quel cercle a pour centre le point de concours des médiatrices ?", "le cercle circonscrit", ["le cercle inscrit", "le cercle de diamètre le plus grand côté", "aucun cercle"], CONCOURS),
    () => qc("Où est le point de concours par rapport aux sommets ?", "à la même distance des trois", ["plus près du plus grand côté", "sur l’un des trois", "à des distances toutes différentes"], "Il est sur les trois médiatrices, donc à la même distance des trois sommets."),
  ]), figCC(T, { centre: true, meds: ["ab", "bc", "ac"] }));
}
function genC2Figure(): G {
  const T = tri();
  const { a, b, c, o } = T;
  const lettres4 = [a, b, c];
  const centre = "Sur le dessin, le centre est le point à la même distance des trois sommets.";
  return tirePhrase([
    () => qc("Observe la figure. Quel point est le centre du cercle ?", o, lettres4, centre, figureSobre(T)),
    () => qc("Sur la figure, quel point est à égale distance des trois sommets ?", o, lettres4, centre, figureSobre(T)),
    () => qc("Les médiatrices de ce triangle se coupent en quel point ?", o, lettres4, CONCOURS, figureSobre(T)),
    () => lt("Observe la figure. Écris la lettre du point de concours des médiatrices.", [o], CONCOURS, figureSobre(T)),
    () => qc(`Sur la figure, quelle longueur est égale à ${o}${a} ?`, `${o}${b}`, [`${a}${b}`, `${a}${c}`, `${b}${c}`], `${o}${a} et ${o}${b} sont deux rayons du cercle.`, figureSobre(T, { rayons: true })),
    () => qc("Sur la figure, quel segment est un rayon du cercle ?", `[${o}${c}]`, [`[${a}${b}]`, `[${a}${c}]`, `[${b}${c}]`], `[${o}${c}] va du centre à un point du cercle.`, figureSobre(T, { rayons: true })),
    () => qc(`Sur la figure, quels points sont à égale distance de ${o} ?`, `${a}, ${b} et ${c}`, [`${a} et ${o}`, `${a} et ${b} seulement`, `${b} et ${c} seulement`], "Les trois sommets sont sur le cercle de centre " + o + ".", figureSobre(T)),
    () => nb("Sur la figure, combien de rayons égaux sont tracés ?", 3, "Les trois pointillés vont du centre à un sommet : ce sont trois rayons.", figureSobre(T, { rayons: true })),
  ]);
}
function genC2Egalite(): G {
  const { a, b, c, o } = tri();
  const d = randomInt(3, 12);
  const sur = `${o} est sur la médiatrice de [${a}${b}].`;
  const med = (text: string) => qc(text, `celle de [${a}${b}]`, [`celle de [${a}${c}]`, `celle de [${b}${c}]`, "aucune"], INVERSE);
  return avec(tirePhrase([
    () => qc(`${sur} Quelle égalité est juste ?`, `${o}${a} = ${o}${b}`, [`${o}${a} = ${a}${b}`, `${o}${b} = ${a}${b}`, `${o}${a} = ${o}${c}`], EGALE_DISTANCE),
    () => lt(`${sur} Complète : ${o}${a} = …`, [`${o}${b}`, `${b}${o}`], EGALE_DISTANCE),
    () => med(`${o}${a} = ${o}${b}. Sur quelle médiatrice est ${o} ?`),
    () => med(`${o} est à égale distance de ${a} et de ${b}. Sur quelle médiatrice est-il ?`),
    () => med(`Quelle médiatrice passe par ${o} si ${o}${a} = ${o}${b} ?`),
    () => qc(`${sur} De quels points est-il à égale distance ?`, `${a} et ${b}`, [`${a} et ${c}`, `${b} et ${c}`, `${a} et ${o}`], EGALE_DISTANCE),
    () => lg(`${sur} ${o}${a} = ${d} cm. Combien mesure ${o}${b} ?`, d, EGALE_DISTANCE),
    () => qc(`${sur} Que dire de ${o}${a} et de ${o}${b} ?`, "elles sont égales", [`${o}${a} est plus grande`, `${o}${b} est plus grande`, "on ne peut rien dire"], EGALE_DISTANCE),
  ]), figCC({ a, b, c, o }, { centre: true, dist: [3, 3, 4.2] }));
}
function genC2Longueur(): G {
  const T = tri();
  const { a, b, c, o, nom } = T;
  const d = randomInt(3, 12);
  const [x, y] = shuffle([a, b, c]);
  const fig = () => triangleInscritNomme(T, { rayon: { vers: x, label: `${d} cm` } });
  const pq = `Les trois distances de ${o} aux sommets sont égales.`;
  return avec(tirePhrase([
    () => lg(`Les médiatrices de ${nom} se coupent en ${o}. ${o}${x} = ${d} cm. Combien mesure ${o}${y} ?`, d, pq),
    () => lg(`${o} est sur les trois médiatrices de ${nom}. ${o}${x} = ${d} cm. Donne ${o}${y}.`, d, pq, fig()),
    () => lg(`${o} est le centre du cercle circonscrit à ${nom}. ${o}${x} = ${d} cm. Calcule ${o}${y}.`, d, pq),
    () => lg(`Observe la figure. Le rayon ${o}${x} mesure ${d} cm. Combien mesure ${o}${y} ?`, d, pq, fig()),
    () => qc(`Sur la figure, ${o}${x} = ${d} cm. Quelle autre longueur vaut ${d} cm ?`, `${o}${y}`, [`${a}${b}`, `${a}${c}`, `${b}${c}`], pq, fig()),
    () => lg(`Sur la figure, tous les rayons sont égaux. ${o}${x} = ${d} cm. Écris ${o}${y}.`, d, pq, fig()),
  ]), fig());
}

// ----- CONCOURANTES, ★3
function genC3Chaine(): G {
  const { a, b, c, o } = tri();
  const d = randomInt(3, 12);
  const pq = `${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}, donc ${o}${a} = ${o}${c} = ${d} cm.`;
  return avec(tirePhrase([
    () => lg(`${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}]. ${o}${a} = ${d} cm. Combien mesure ${o}${c} ?`, d, pq),
    () => lg(`Les médiatrices de [${a}${b}] et de [${b}${c}] se coupent en ${o}. ${o}${c} = ${d} cm. Calcule ${o}${a}.`, d, pq),
    () => lg(`${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}. ${o}${a} mesure ${d} cm. Combien mesure ${o}${c} ?`, d, pq),
    () => lg(`${o} est sur la médiatrice de [${a}${b}], puis sur celle de [${b}${c}]. ${o}${a} = ${d} cm. Que vaut ${o}${c} ?`, d, pq),
    () => lg(`${o} est sur la médiatrice de [${a}${b}]. ${o}${a} = ${o}${c} et ${o}${c} = ${d} cm. Donne ${o}${b}.`, d, `${o}${b} = ${o}${a} = ${o}${c} = ${d} cm.`),
    () => lg(`${o}${b} = ${d} cm. ${o} est sur la médiatrice de [${a}${b}]. Combien mesure ${o}${a} ?`, d, `${o} est à égale distance de ${a} et de ${b}.`),
  ]), figCC({ a, b, c, o }, { centre: true, meds: ["ab", "bc"] }));
}
function genC3Test(): G {
  const { a, b, c, o, nom } = tri();
  const d = randomInt(4, 11);
  const autre = d + pick([-1, 1, 2, 3]);
  const paire = pick(["ab", "ac", "bc", "toutes"]);
  const la = paire === "bc" ? autre : d;
  const lb = paire === "ac" ? autre : d;
  const lc = paire === "ab" ? autre : d;
  const debut = `Triangle ${nom} : ${o}${a} = ${la} cm, ${o}${b} = ${lb} cm et ${o}${c} = ${lc} cm.`;
  const toutes = paire === "toutes";
  const pq = toutes ? `Les trois distances sont égales : ${o} est sur les trois médiatrices.` : "Seules deux distances sont égales : le point est sur une seule médiatrice.";
  const seg = paire === "ab" ? `${a}${b}` : paire === "ac" ? `${a}${c}` : `${b}${c}`;
  const quelleMed = (q: string) =>
    qc(`${debut} ${q}`, toutes ? "les trois médiatrices" : `celle de [${seg}]`, toutes ? [`seulement celle de [${a}${b}]`, `seulement celle de [${a}${c}]`, `seulement celle de [${b}${c}]`] : ["les trois médiatrices", "aucune", ...[`${a}${b}`, `${a}${c}`, `${b}${c}`].filter((s) => s !== seg).slice(0, 1).map((s) => `celle de [${s}]`)], pq);
  return avec(tirePhrase([
    () => quelleMed(`Sur quelle médiatrice est ${o} ?`),
    () => quelleMed(`Quelle médiatrice passe par ${o} ?`),
    () => ouiNon(`${debut} ${o} est-il le centre du cercle circonscrit à ${nom} ?`, toutes, pq),
    () => ouiNon(`${debut} ${o} est-il sur la médiatrice de [${a}${c}] ?`, la === lc, `${o}${a} et ${o}${c} ${la === lc ? "sont égales" : "sont différentes"}.`),
    () => ouiNon(`${debut} Un cercle de centre ${o} passe par ${a}. Passe-t-il par ${b} et ${c} ?`, toutes, pq),
    () => ouiNon(`${debut} Les trois médiatrices passent-elles par ${o} ?`, toutes, pq),
    () => nb(`${debut} Combien de médiatrices de ${nom} passent par ${o} ?`, toutes ? 3 : 1, pq),
    () => nb(`${debut} Combien de sommets sont sur le cercle de centre ${o} passant par ${a} ?`, [la, lb, lc].filter((x) => x === la).length, "On compte les sommets à la même distance de " + o + " que " + a + "."),
  ]), figCC({ a, b, c, o }, { centre: true, dist: [la, lb, lc], rayons: { [a]: `${la} cm`, [b]: `${lb} cm`, [c]: `${lc} cm` } }));
}
function genC3Somme(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(3, 9);
  const med = `Les médiatrices de ${nom} se coupent en ${o}.`;
  const cer = `Le cercle circonscrit à ${nom} a pour centre ${o}.`;
  const pq = `${o}${a} = ${o}${b} = ${o}${c} = ${r} cm.`;
  return avec(tirePhrase([
    () => lg(`${med} ${o}${a} = ${r} cm. Calcule ${o}${a} + ${o}${b} + ${o}${c}.`, 3 * r, `${pq} Trois fois ${r} : ${3 * r} cm.`),
    () => lg(`${med} ${o}${a} + ${o}${b} = ${2 * r} cm. Combien mesure ${o}${c} ?`, r, `${2 * r} ÷ 2 = ${r}. ${pq}`),
    () => lg(`${med} ${o}${a} + ${o}${b} + ${o}${c} = ${3 * r} cm. Combien mesure ${o}${b} ?`, r, `${3 * r} ÷ 3 = ${r}. ${pq}`),
    () => lg(`${med} ${o}${c} = ${r} cm. Calcule ${o}${a} + ${o}${b}.`, 2 * r, `${pq} Deux fois ${r} : ${2 * r} cm.`),
    () => lg(`${cer} ${o}${a} + ${o}${b} = ${2 * r} cm. Quel est son rayon ?`, r, `${2 * r} ÷ 2 = ${r}. ${pq}`),
    () => lg(`${cer} ${o}${a} + ${o}${b} + ${o}${c} = ${3 * r} cm. Quel est son rayon ?`, r, `${3 * r} ÷ 3 = ${r}. ${pq}`),
    () => lg(`${med} ${o}${a} = ${r} cm. Calcule ${o}${b} − ${o}${c}.`, 0, `${o}${b} et ${o}${c} sont égales : leur différence vaut 0.`),
  ]), figCC({ a, b, c, o }, { centre: true, meds: ["ab", "bc", "ac"] }));
}
const SITUATIONS_CENTRE = [
  { quoi: "Une antenne", il: "Elle", lieux: "trois villages", prem: "du premier", der: "du dernier", u: "km" },
  { quoi: "Une fontaine", il: "Elle", lieux: "trois arbres", prem: "du premier", der: "du dernier", u: "m" },
  { quoi: "Un lampadaire", il: "Il", lieux: "trois bancs", prem: "du premier", der: "du dernier", u: "m" },
  { quoi: "Un arroseur", il: "Il", lieux: "trois rosiers", prem: "du premier", der: "du dernier", u: "m" },
  { quoi: "Un drone", il: "Il", lieux: "trois balises", prem: "de la première", der: "de la dernière", u: "m" },
  { quoi: "Un phare", il: "Il", lieux: "trois bouées", prem: "de la première", der: "de la dernière", u: "km" },
  { quoi: "Une caserne", il: "Elle", lieux: "trois écoles", prem: "de la première", der: "de la dernière", u: "km" },
  { quoi: "Un micro", il: "Il", lieux: "trois chanteurs", prem: "du premier", der: "du dernier", u: "m" },
];
function genC3Situation(): G {
  const s = pick(SITUATIONS_CENTRE);
  const r = randomInt(2, 15);
  // Les trois lieux et l'objet, sans nom : la distance donnée, et « ? » sur celle qu'on cherche.
  const lieux = { a: "_1", b: "_2", c: "_3", o: "_0" };
  if (Math.random() < 0.6)
    return lg(`${s.quoi} est à égale distance de ${s.lieux}. ${s.il} est à ${r} ${s.u} ${s.prem}. À quelle distance est-${s.il.toLowerCase()} ${s.der} ?`, r, `Égale distance : la même longueur pour les trois, ${r} ${s.u}.`, figCC(lieux, { centre: true, cotes: false, noms: false, rayons: { _1: `${r} ${s.u}`, _2: true, _3: "?" } }), s.u);
  return lg(`${s.quoi} est à la même distance de ${s.lieux} : ${r} ${s.u}. Quel est le diamètre du cercle passant par les trois ?`, 2 * r, `Le rayon vaut ${r} ${s.u}. Le diamètre : 2 × ${r} = ${2 * r} ${s.u}.`, figCC(lieux, { centre: true, cotes: false, noms: false, cercle: true, rayons: { _1: `${r} ${s.u}` } }), s.u);
}
function genC3Preuve(): G {
  const { a, b, c, o } = tri();
  const med = (text: string) => qc(text, `celle de [${a}${c}]`, [`celle de [${a}${b}]`, `celle de [${b}${c}]`, "aucune"], INVERSE);
  return avec(tirePhrase([
    () => qc(`${o} est sur la médiatrice de [${a}${b}]. Pourquoi ${o}${a} = ${o}${b} ?`, `tout point de cette médiatrice est à égale distance de ${a} et de ${b}`, [`${o} est le milieu de [${a}${b}]`, "le triangle est équilatéral", `[${a}${b}] est le plus grand côté`], EGALE_DISTANCE),
    () => qc(`Les médiatrices de [${a}${b}] et de [${a}${c}] se coupent en ${o}. Quelle médiatrice passe aussi par ${o} ?`, `celle de [${b}${c}]`, ["aucune autre", "seulement si le triangle est équilatéral", `une droite parallèle à [${b}${c}]`], CONCOURS),
    () => nb("Pour prouver que les médiatrices sont concourantes, combien en prend-on au départ ?", 2, "On part de deux médiatrices, puis on montre que la troisième passe par leur point commun."),
    () => qc(`La preuve part de deux médiatrices qui se coupent en ${o}. Que reste-t-il à prouver ?`, `la troisième médiatrice passe aussi par ${o}`, [`${o} est le milieu d’un côté`, "le triangle est équilatéral", "ces deux médiatrices se coupent"], "Tout le raisonnement sert à montrer que la troisième médiatrice passe par ce point."),
    () => qc(`${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}. Que peut-on écrire ?`, `${o}${a} = ${o}${c}`, [`${o}${a} = ${a}${b}`, `${o}${b} = ${a}${c}`, `${a}${b} = ${b}${c}`], "Deux longueurs égales à une même troisième sont égales."),
    () => lt(`${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}. Complète : ${o}${a} = …`, [`${o}${c}`, `${c}${o}`, `${o}${b}`, `${b}${o}`], "Les trois longueurs sont égales."),
    () => med(`${o}${a} = ${o}${c}. Sur quelle médiatrice est ${o} ?`),
    () => med(`${o} est à égale distance de ${a} et de ${c}. Sur quelle médiatrice est-il ?`),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genC3Figure(): G {
  const T = tri();
  const { a, b, c, o } = T;
  const d = randomInt(3, 12);
  const fig = () => triangleInscritNomme(T, { rayon: { vers: a, label: `${d} cm` } });
  const iso = `${o}${a} = ${o}${b} : le triangle ${o}${a}${b} a deux côtés égaux, il est isocèle en ${o}.`;
  return avec(tirePhrase([
    () => lg(`Observe la figure : ${o}${a} = ${d} cm. Calcule ${o}${b} + ${o}${c}.`, 2 * d, `${o}${b} = ${o}${c} = ${d} cm, donc ${d} + ${d} = ${2 * d} cm.`, fig()),
    () => qc(`${o} est sur la médiatrice de [${a}${b}]. Quelle est la nature du triangle ${o}${a}${b} ?`, `isocèle en ${o}`, [`rectangle en ${o}`, "équilatéral", `isocèle en ${a}`], iso),
    () => ouiNon(`${o} est sur la médiatrice de [${b}${c}]. Le triangle ${o}${b}${c} est-il isocèle ?`, true, `${o}${b} = ${o}${c} : deux côtés égaux.`),
    () => nb(`Sur la figure, combien de triangles sont isocèles en ${o} ?`, 3, `${o}${a}${b}, ${o}${b}${c} et ${o}${a}${c} ont chacun deux rayons pour côtés.`, figureSobre(T, { rayons: true })),
    () => nb(`Sur la figure, combien d’autres segments ont la même longueur que [${o}${a}] ?`, 2, `[${o}${b}] et [${o}${c}] sont aussi des rayons.`, figureSobre(T, { rayons: true })),
    () => qc(`Sur la figure, quel triangle est isocèle en ${o} ?`, `${o}${a}${b}`, [`${a}${b}${c}`], iso, figureSobre(T, { rayons: true })),
  ]), figCC(T, { centre: true }));
}

// ----- CONCOURANTES, ★4
function genC4Argument(): G {
  const { a, b, c, o } = tri();
  const sensDirect = "sur la médiatrice, donc à égale distance";
  const sensInverse = "à égale distance, donc sur la médiatrice";
  return avec(tirePhrase([
    () => qc(`Dans la preuve, ${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}. Quel argument place ${o} sur la médiatrice de [${a}${c}] ?`, `${o}${a} = ${o}${c}, donc ${o} est à égale distance de ${a} et de ${c}`, [`${o} est le milieu de [${a}${c}]`, `[${a}${c}] est le plus grand côté`, `${o} est à l’intérieur du triangle`], INVERSE),
    () => qc(`Pourquoi écrit-on ${o}${a} = ${o}${b} quand ${o} est sur la médiatrice de [${a}${b}] ?`, "un point de la médiatrice est à égale distance des extrémités", [`${o} est le milieu de [${a}${b}]`, `${o} est un sommet du triangle`, "les deux côtés sont parallèles"], EGALE_DISTANCE),
    () => qc("Que montre-t-on à la fin de la preuve ?", "la troisième médiatrice passe par le point commun des deux autres", ["le triangle est équilatéral", "les médiatrices sont parallèles", "le point commun est un sommet"], CONCOURS),
    () => qc("Quel sens de la propriété sert à la fin de la preuve ?", sensInverse, [sensDirect, "milieu du côté, donc sur la médiatrice seulement", "aucun des deux"], INVERSE),
    () => qc("Quel sens de la propriété sert au début de la preuve ?", sensDirect, [sensInverse, "milieu du côté, donc sur la médiatrice seulement", "aucun des deux"], EGALE_DISTANCE),
    () => qc("Pourquoi la preuve part-elle de deux médiatrices seulement ?", "on ne peut pas supposer ce qu’on veut démontrer", ["une troisième médiatrice n’existe pas toujours", "deux médiatrices sont toujours égales", "la troisième est parallèle aux deux autres"], "Partir des trois reviendrait à admettre le résultat."),
    () => qc("Pourquoi deux médiatrices d’un triangle se coupent-elles toujours ?", "les deux côtés ne sont pas parallèles", ["les deux côtés sont égaux", "elles passent par un sommet", "elles sont parallèles"], "Chaque médiatrice est perpendiculaire à son côté. Deux côtés d’un triangle ne sont pas parallèles, donc leurs médiatrices non plus."),
    () => qc(`${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}]. Que sait-on de la médiatrice de [${a}${c}] sans la tracer ?`, `elle passe par ${o}`, [`elle est parallèle à [${a}${b}]`, `elle passe par ${b}`, "elle n’existe pas"], CONCOURS),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genC4Perimetre(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(4, 10);
  const cote = randomInt(3, 2 * r - 1);
  const p = 2 * r + cote;
  const med = `Les médiatrices de ${nom} se coupent en ${o}.`;
  const pq = `${o}${a} = ${o}${b} = ${r} cm. Périmètre : ${r} + ${r} + ${cote} = ${p} cm.`;
  // Chaque phrase dit sur quel côté porte la longueur : le triangle est inscrit avec CE côté exact.
  const phrases: Array<[() => G, Cote]> = [
    [() => lg(`${o} est sur la médiatrice de [${a}${b}]. ${o}${a} = ${r} cm et ${a}${b} = ${cote} cm. Quel est le périmètre du triangle ${o}${a}${b} ?`, p, pq), "ab"],
    [() => lg(`${med} ${o}${a} = ${r} cm et ${b}${c} = ${cote} cm. Quel est le périmètre du triangle ${o}${b}${c} ?`, p, `${o}${b} = ${o}${c} = ${o}${a} = ${r} cm. Périmètre : ${r} + ${r} + ${cote} = ${p} cm.`), "bc"],
    [() => lg(`${o} est sur la médiatrice de [${a}${b}]. Le triangle ${o}${a}${b} a pour périmètre ${p} cm, et ${a}${b} = ${cote} cm. Combien mesure ${o}${a} ?`, r, `${p} − ${cote} = ${2 * r}, puis ${2 * r} ÷ 2 = ${r} cm.`), "ab"],
    [() => lg(`${med} Le triangle ${o}${a}${b} a pour périmètre ${p} cm, et ${a}${b} = ${cote} cm. Combien mesure ${o}${c} ?`, r, `${p} − ${cote} = ${2 * r}, puis ${2 * r} ÷ 2 = ${r} cm. Et ${o}${c} = ${o}${a}.`), "ab"],
    [() => lg(`${o} est sur la médiatrice de [${a}${b}]. ${o}${a} = ${r} cm. Le triangle ${o}${a}${b} a pour périmètre ${p} cm. Combien mesure ${a}${b} ?`, cote, `${r} + ${r} = ${2 * r}, puis ${p} − ${2 * r} = ${cote} cm.`), "ab"],
    [() => lg(`${med} ${o}${c} = ${r} cm et ${a}${c} = ${cote} cm. Quel est le périmètre du triangle ${o}${a}${c} ?`, p, `${o}${a} = ${o}${c} = ${r} cm. Périmètre : ${r} + ${r} + ${cote} = ${p} cm.`), "ac"],
  ];
  const [phrase, k] = pick(phrases);
  const th = (2 * Math.asin(cote / (2 * r)) * 180) / Math.PI;
  const ta = randomInt(190, 220);
  const libre = ta + th + (360 - th) / 2; // le troisième sommet, au milieu de l'autre arc
  const ang: Record<Cote, [number, number, number]> = { ab: [ta, ta + th, libre], bc: [libre, ta, ta + th], ac: [ta, libre, ta + th] };
  return avec(phrase(), figCC({ a, b, c, o }, { centre: true, dist: [r, r, r], angles: ang[k] }));
}
function genC4Raisonnement(): G {
  const { a, b, c, o, nom } = tri();
  const [dit, juste, p] = pick<[string, boolean, string]>([
    [`${o} est sur la médiatrice de [${a}${b}], donc ${o}${a} = ${o}${c}.`, false, `Cette médiatrice donne ${o}${a} = ${o}${b}, pas ${o}${a} = ${o}${c}.`],
    [`${o} est sur la médiatrice de [${a}${b}], donc ${o} est le milieu de [${a}${b}].`, false, "Le milieu est un seul des points de la médiatrice."],
    [`${o}${a} = ${o}${b}, donc ${o} est sur la médiatrice de [${a}${b}].`, true, INVERSE],
    [`${o}${a} = ${o}${b}, donc ${o} est le milieu de [${a}${b}].`, false, "Le point peut être ailleurs sur la médiatrice."],
    [`${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}, donc ${o}${a} = ${o}${c}.`, true, "Deux longueurs égales à une même troisième sont égales."],
    [`${o} est sur la médiatrice de [${a}${b}], donc ${o}${a} = ${a}${b}.`, false, `Il faut comparer ${o}${a} et ${o}${b}, pas ${o}${a} et ${a}${b}.`],
    [`${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}], donc ${o}${a} = ${o}${c}.`, true, `${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}.`],
    [`Les médiatrices de ${nom} se coupent en ${o}, donc ${nom} est équilatéral.`, false, "C’est vrai pour tous les triangles, pas seulement les équilatéraux."],
  ]);
  return ouiNon(`Un élève écrit : « ${dit} » Son raisonnement est-il juste ?`, juste, p, figCC({ a, b, c, o }));
}
function genC4Forcement(): G {
  const { a, b, c, nom } = tri();
  const k = pick("KMNPRSTU".split("").filter((x) => ![a, b, c].includes(x)));
  const [t, oui, p] = pick<[string, boolean, string]>([
    [`${k} est sur la médiatrice de [${a}${b}]. A-t-on forcément ${k}${a} = ${k}${c} ?`, false, `On a seulement ${k}${a} = ${k}${b}.`],
    [`${k} est sur les médiatrices de [${a}${b}] et de [${a}${c}]. A-t-on forcément ${k}${b} = ${k}${c} ?`, true, `${k}${b} = ${k}${a} et ${k}${a} = ${k}${c}.`],
    [`${k}${a} = ${k}${b}. ${k} est-il forcément le centre du cercle circonscrit à ${nom} ?`, false, "Il manque le troisième sommet."],
    [`${k}${a} = ${k}${b} = ${k}${c}. ${k} est-il le centre du cercle circonscrit à ${nom} ?`, true, "Il est à la même distance des trois sommets."],
    [`${k}${a} = ${k}${b} = ${k}${c}. ${k} est-il sur la médiatrice de [${b}${c}] ?`, true, INVERSE],
    [`${k}${a} = ${k}${c}. ${k} est-il forcément sur la médiatrice de [${a}${c}] ?`, true, INVERSE],
    [`${k} est sur la médiatrice de [${a}${b}]. ${k} est-il forcément le milieu de [${a}${b}] ?`, false, "La médiatrice a beaucoup d’autres points que le milieu."],
    [`${k} est le milieu de [${a}${b}]. ${k} est-il sur la médiatrice de [${a}${b}] ?`, true, "La médiatrice passe par le milieu du segment."],
  ]);
  // Le triangle seul : le point K n'est pas placé (où il est, c'est la question).
  return ouiNon(t, oui, p, figCC({ a, b, c, o: "O" }));
}
function genC4Mesure(): G {
  const { a, b, c, o, nom } = tri();
  const bon = randomInt(4, 10);
  const faux = bon + pick([1, 2, 3]);
  const [x, y, z] = shuffle([a, b, c]);
  const med = `Les médiatrices de ${nom} se coupent en ${o}.`;
  const lu = `On mesure ${o}${a} = ${z === a ? faux : bon} cm, ${o}${b} = ${z === b ? faux : bon} cm et ${o}${c} = ${z === c ? faux : bon} cm.`;
  const pq = `Les trois distances doivent être égales. Deux valent ${bon} cm : c’est ${o}${z} qui est fausse.`;
  const quelle = (q: string) => qc(`${med} ${lu} ${q}`, `${o}${z}`, [`${o}${x}`, `${o}${y}`, "aucune"], pq);
  return tirePhrase([
    () => quelle("Quelle mesure est fausse ?"),
    () => quelle("Quelle longueur faut-il mesurer à nouveau ?"),
    () => lg(`${med} ${lu} Quelle valeur devrait-on lire à la place de la mesure fausse ?`, bon, pq),
    () => ouiNon(`${med} ${lu} Ces trois mesures peuvent-elles être toutes justes ?`, false, pq),
    () => ouiNon(`${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}]. On lit ${o}${a} = ${bon} cm et ${o}${c} = ${faux} cm. Est-ce possible ?`, false, `${o}${a} et ${o}${c} doivent être égales.`),
    () => ouiNon(`Dans le triangle ${nom}, ${o} est sur la médiatrice de [${a}${b}]. On lit ${o}${a} = ${bon} cm et ${o}${c} = ${faux} cm. Est-ce possible ?`, true, `Cette médiatrice ne parle que de ${a} et de ${b} : ${o}${c} peut être différente.`),
  ]);
}
function genC4SansTracer(): G {
  const { a, b, c, o } = tri();
  const d = randomInt(3, 12);
  const depart = `Les médiatrices de [${a}${b}] et de [${a}${c}] se coupent en ${o}.`;
  return avec(tirePhrase([
    () => qc(`Seules les médiatrices de [${a}${b}] et de [${a}${c}] sont tracées. Elles se coupent en ${o}. Quelle autre médiatrice passe par ${o} ?`, `celle de [${b}${c}]`, ["aucune autre", "une hauteur du triangle", `la parallèle à [${b}${c}]`], CONCOURS),
    () => qc(`${depart} Quelle égalité peut-on écrire sans mesurer ?`, `${o}${b} = ${o}${c}`, [`${o}${b} = ${b}${c}`, `${o}${a} = ${b}${c}`, `${o}${c} = ${b}${c}`], `${o}${b} = ${o}${a} et ${o}${a} = ${o}${c}.`),
    () => nb(`${depart} Combien de médiatrices faut-il encore tracer pour trouver le point de concours ?`, 0, `Le point ${o} est déjà trouvé : deux médiatrices suffisent.`),
    () => qc(`${depart} On trace la médiatrice de [${b}${c}] : elle passe à côté de ${o}. Que conclure ?`, "le tracé manque de précision", ["ce triangle n’a pas de cercle circonscrit", "la propriété ne marche pas ici", "le triangle n’est pas équilatéral"], "Les trois médiatrices sont toujours concourantes : l’écart vient du tracé."),
    () => lg(`${depart} ${o}${b} = ${d} cm. Combien mesure ${o}${c} ?`, d, `${o}${b} = ${o}${a} et ${o}${a} = ${o}${c}.`),
    () => lg(`${depart} ${o}${a} = ${d} cm. Calcule ${o}${b} + ${o}${c}.`, 2 * d, `${o}${b} = ${o}${c} = ${d} cm, donc ${2 * d} cm.`),
  ]), figCC({ a, b, c, o }, { centre: true, meds: ["ab", "ac"] }));
}

// ----- CONCOURANTES, ★5
function genC5Ordre(): G {
  const { a, b, c, o, nom } = tri();
  const pref = `Preuve pour le triangle ${nom} :`;
  const fin = `${o} est sur la médiatrice de [${a}${c}]`;
  const eg = `${o}${a} = ${o}${c}`;
  const pas = [`${o}${a} = ${o}${b}`, `${o}${b} = ${o}${c}`, eg, fin];
  const leurres = (bon: string) => pas.filter((x) => x !== bon).slice(0, 3);
  return avec(tirePhrase([
    () => qc(`${pref} on a écrit ${o}${a} = ${o}${b} et ${o}${b} = ${o}${c}. Quel pas vient ensuite ?`, eg, leurres(eg), "Deux longueurs égales à une même troisième sont égales."),
    () => qc(`${pref} on vient d’écrire ${eg}. Quel pas vient ensuite ?`, fin, leurres(fin), INVERSE),
    () => qc(`${pref} quel pas vient juste avant « ${fin} » ?`, eg, leurres(eg), INVERSE),
    () => qc(`${pref} quel est le dernier pas ?`, fin, leurres(fin), "On finit quand la troisième médiatrice passe par le point commun."),
    () => qc(`${pref} quelle phrase ne fait pas partie de la preuve ?`, `${o} est le milieu de [${a}${c}]`, pas.slice(0, 3), "Le point n’a aucune raison d’être un milieu."),
    () => qc(`${pref} ${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}]. Quelle égalité ne vient pas directement d’une de ces deux médiatrices ?`, eg, [`${o}${a} = ${o}${b}`, `${o}${b} = ${o}${c}`], `${eg} se déduit des deux premières égalités.`),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genC5Perimetres(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(5, 11);
  const x = randomInt(3, 2 * r - 2);
  const y = randomInt(3, 2 * r - 2);
  const pAB = 2 * r + x;
  const med = `Les médiatrices de ${nom} se coupent en ${o}.`;
  const perim = randomInt(3 * r, 5 * r);
  const rayon = `${pAB} − ${x} = ${2 * r}, puis ${2 * r} ÷ 2 = ${r} cm : c’est la distance de ${o} à chaque sommet.`;
  return avec(tirePhrase([
    () => lg(`${med} Le triangle ${o}${a}${b} a pour périmètre ${pAB} cm. ${a}${b} = ${x} cm et ${b}${c} = ${y} cm. Quel est le périmètre du triangle ${o}${b}${c} ?`, 2 * r + y, `${rayon} Puis ${r} + ${r} + ${y} = ${2 * r + y} cm.`),
    () => lg(`${med} Le triangle ${o}${a}${b} a pour périmètre ${pAB} cm, et ${a}${b} = ${x} cm. Quel est le diamètre du cercle circonscrit ?`, 2 * r, `${rayon} Le diamètre vaut le double.`),
    () => lg(`${med} ${o}${a} + ${o}${b} + ${o}${c} = ${3 * r} cm et ${a}${b} = ${x} cm. Quel est le périmètre du triangle ${o}${a}${b} ?`, pAB, `${3 * r} ÷ 3 = ${r}, puis ${r} + ${r} + ${x} = ${pAB} cm.`),
    () => lg(`Le cercle circonscrit à ${nom} a pour centre ${o} et pour diamètre ${2 * r} cm. ${a}${b} = ${x} cm. Quel est le périmètre du triangle ${o}${a}${b} ?`, pAB, `Rayon : ${2 * r} ÷ 2 = ${r} cm, puis ${r} + ${r} + ${x} = ${pAB} cm.`),
    () => lg(`${med} Le triangle ${nom} a pour périmètre ${perim} cm et ${o}${a} = ${r} cm. Calcule la somme des périmètres de ${o}${a}${b}, ${o}${b}${c} et ${o}${a}${c}.`, perim + 6 * r, `Chaque côté compte une fois (${perim} cm) et chaque rayon deux fois (6 × ${r} = ${6 * r} cm).`),
  ]), figCC({ a, b, c, o }, { centre: true, ...cordes(r, x, y, false) }));
}
function genC5Quatre(): G {
  const [p, q, r, s, e, o] = lettres(6);
  const [a, b, c, d, f] = [p, q, r, s, e].sort();
  const v = randomInt(3, 12);
  const trois = `${o} est sur les médiatrices de [${a}${b}], [${b}${c}] et [${c}${d}].`;
  const chaine = `${o}${a} = ${o}${b} = ${o}${c} = ${o}${d}`;
  return tirePhrase([
    () => lg(`${trois} ${o}${a} = ${v} cm. Combien mesure ${o}${d} ?`, v, `${chaine} = ${v} cm.`),
    () => nb(`${trois} Par combien des points ${a}, ${b}, ${c} et ${d} passe le cercle de centre ${o} passant par ${a} ?`, 4, `${chaine} : les quatre points sont sur le cercle.`),
    () => qc(`${trois} Sur quelle autre médiatrice est forcément ${o} ?`, `celle de [${a}${d}]`, [`celle de [${a}${f}]`, `celle de [${d}${f}]`, "aucune autre"], `${o}${a} = ${o}${d}, donc ${o} est sur la médiatrice de [${a}${d}].`),
    () => lg(`${o} est sur les médiatrices de [${a}${b}], [${b}${c}], [${c}${d}] et [${d}${f}]. ${o}${a} = ${v} cm. Combien mesure ${o}${f} ?`, v, "L’égalité se transmet de point en point, jusqu’au dernier."),
    () => ouiNon(`${o} est sur les médiatrices de [${a}${b}] et de [${c}${d}]. ${o}${a} = ${v} cm. Peut-on en déduire ${o}${c} ?`, false, `On sait ${o}${a} = ${o}${b} et ${o}${c} = ${o}${d}, mais rien ne relie les deux égalités.`),
    () => ouiNon(`${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}]. ${o}${a} = ${v} cm. Peut-on en déduire ${o}${d} ?`, false, `Le point ${d} n’apparaît dans aucune de ces deux médiatrices.`),
  ]);
}
function genC5Sens(): G {
  const { a, b, c, o } = tri();
  const direct = "sur la médiatrice, donc à égale distance";
  const inverse = "à égale distance, donc sur la médiatrice";
  const phraseD = `${o} est sur la médiatrice de [${a}${b}], donc ${o}${a} = ${o}${b}`;
  const phraseI = `${o}${a} = ${o}${c}, donc ${o} est sur la médiatrice de [${a}${c}]`;
  const leurres = (bon: string) => [bon === direct ? inverse : direct, "le milieu, donc sur la médiatrice", "sur la médiatrice, donc au milieu"];
  return avec(tirePhrase([
    () => qc(`On écrit : « ${phraseD} ». Quel sens de la propriété utilise-t-on ?`, direct, leurres(direct), EGALE_DISTANCE),
    () => qc(`On écrit : « ${phraseI} ». Quel sens de la propriété utilise-t-on ?`, inverse, leurres(inverse), INVERSE),
    () => qc(`Quelle phrase utilise le sens « à égale distance, donc sur la médiatrice » ?`, phraseI, [phraseD, `${o} est le milieu de [${a}${c}], donc ${o} est sur la médiatrice de [${a}${c}]`, `${o} est sur la médiatrice de [${b}${c}], donc ${o}${b} = ${o}${c}`], INVERSE),
    () => qc(`Quelle phrase utilise le sens « sur la médiatrice, donc à égale distance » ?`, phraseD, [phraseI, `${o} est le milieu de [${a}${c}], donc ${o} est sur la médiatrice de [${a}${c}]`, `${o}${b} = ${o}${c}, donc ${o} est sur la médiatrice de [${b}${c}]`], EGALE_DISTANCE),
    () => qc(`${o} est sur les médiatrices de [${a}${b}] et de [${b}${c}]. Quel pas de la preuve utilise le sens « à égale distance, donc sur la médiatrice » ?`, "le dernier", ["le premier", "le deuxième", "aucun"], INVERSE),
    () => qc("Sans quel sens de la propriété la preuve s’arrête-t-elle avant la troisième médiatrice ?", inverse, leurres(inverse), INVERSE),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genC5Isocele(): G {
  const { a, b, c, o, nom } = tri();
  const d = randomInt(3, 12);
  const iso = `Le triangle ${nom} est isocèle en ${a}.`;
  const pq = `${a}${b} = ${a}${c} : ${a} est à égale distance de ${b} et de ${c}, donc sur la médiatrice de [${b}${c}].`;
  // Isocèle en a : a sur l'axe, b et c symétriques (OB = OC), les deux côtés égaux codés.
  const ouvert = randomInt(125, 150);
  const isoFig = figCC({ a, b, c, o }, { centre: true, angles: [90, 90 + ouvert, 90 - ouvert], codesCotes: { ab: 1, ac: 1 } });
  const equiFig = figCC({ a, b, c, o }, { angles: [90, 210, 330], codesCotes: { ab: 1, ac: 1, bc: 1 } });
  return avec(tirePhrase([
    () => qc(`${iso} Quel sommet est sur la médiatrice de [${b}${c}] ?`, a, [b, c, "aucun"], pq),
    () => qc(`${a}${b} = ${a}${c}. Sur quelle médiatrice est le point ${a} ?`, `celle de [${b}${c}]`, [`celle de [${a}${b}]`, `celle de [${a}${c}]`, "aucune"], pq),
    () => qc(`${iso} ${o} est le centre de son cercle circonscrit, distinct de ${a}. Quelle droite est la médiatrice de [${b}${c}] ?`, `(${o}${a})`, [`(${o}${b})`, `(${o}${c})`, `(${a}${b})`], `${o} et ${a} sont tous les deux sur la médiatrice de [${b}${c}].`),
    () => nb(`Le triangle ${nom} est équilatéral. Combien de ses sommets sont chacun sur une médiatrice ?`, 3, "Chaque sommet est à égale distance des deux autres.", equiFig),
    () => lg(`${iso} ${o} est le centre de son cercle circonscrit. ${o}${b} = ${d} cm. Combien mesure ${o}${c} ?`, d, `${o}${b} et ${o}${c} sont deux rayons.`),
    () => ouiNon(`Le triangle ${nom} est isocèle en ${a}. Le centre de son cercle circonscrit est-il sur la médiatrice de [${b}${c}] ?`, true, "Le centre est sur les trois médiatrices, quel que soit le triangle."),
  ]), isoFig);
}
function genC5CompteCercle(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(5, 11);
  const autre = r + pick([1, 2, 3]);
  const seule = `${o} est sur la médiatrice de [${a}${b}]. ${o}${a} = ${r} cm et ${o}${c} = ${autre} cm.`;
  const med = `Les médiatrices de ${nom} se coupent en ${o}. ${o}${a} = ${r} cm.`;
  return tirePhrase([
    () => nb(`${seule} Par combien de sommets de ${nom} passe le cercle de centre ${o} et de rayon ${r} cm ?`, 2, `${a} et ${b} sont à ${r} cm de ${o}, ${c} à ${autre} cm.`),
    () => nb(`${seule} Par combien de sommets de ${nom} passe le cercle de centre ${o} et de rayon ${autre} cm ?`, 1, `Seul ${c} est à ${autre} cm de ${o}.`),
    () => nb(`${seule} Par combien de sommets de ${nom} passe le cercle de centre ${o} et de rayon ${autre + 1} cm ?`, 0, `Aucun sommet n’est à ${autre + 1} cm de ${o}.`),
    () => nb(`${med} Par combien de sommets passe le cercle de centre ${o} et de rayon ${r} cm ?`, 3, "Les trois sommets sont à cette distance."),
    () => nb(`${med} Par combien de sommets passe le cercle de centre ${o} et de rayon ${r + 1} cm ?`, 0, `Les trois sommets sont à ${r} cm, pas à ${r + 1} cm.`),
    () => lg(`${seule} De combien faut-il changer le rayon pour passer de ${a} à ${c} ?`, autre - r, `${autre} − ${r} = ${autre - r} cm.`),
  ]);
}

function genC4Inegalite(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(3, 9);
  const possible = randomInt(2, 2 * r - 1);
  const trop = 2 * r + randomInt(1, 4);
  const med = `Les médiatrices de ${nom} se coupent en ${o}. ${o}${a} = ${r} cm.`;
  const pq = `${o}${a} + ${o}${b} = ${2 * r} cm : un côté ne peut pas dépasser cette longueur.`;
  // Les médiatrices concourantes en O et le rayon donné ; aucun côté n'est coté (c'est lui qu'on juge).
  const fig = figCC({ a, b, c, o }, { centre: true, meds: ["ab", "bc", "ac"], rayons: { [a]: `${r} cm` } });
  return tirePhrase([
    () => ouiNon(`${med} Le côté [${a}${b}] peut-il mesurer ${trop} cm ?`, false, pq, fig),
    () => ouiNon(`${med} Le côté [${a}${b}] peut-il mesurer ${possible} cm ?`, true, `${possible} cm ne dépasse pas ${2 * r} cm.`, fig),
    () => lg(`${med} Quelle est la plus grande longueur possible pour un côté ?`, 2 * r, `${r} + ${r} = ${2 * r} cm, le diamètre.`, fig),
    () => qc(`${med} Quelle longueur est possible pour [${b}${c}] ?`, `${possible} cm`, [`${trop} cm`, `${trop + 1} cm`, `${trop + 2} cm`], pq, fig),
    () => qc(`${o} est sur la médiatrice de [${a}${b}] et sur le segment [${a}${b}]. Quel est ce point ?`, `le milieu de [${a}${b}]`, [`le point ${a}`, `le point ${b}`, `le point ${c}`], "Le seul point du segment à égale distance de ses extrémités est son milieu."),
    () => lg(`Le centre ${o} du cercle circonscrit à ${nom} est sur le côté [${a}${b}]. ${o}${c} = ${r} cm. Combien mesure ${a}${b} ?`, 2 * r, `${o} est le milieu de [${a}${b}], et ${o}${a} = ${o}${b} = ${r} cm.`, figCC({ a, b, c, o }, { centre: true, angles: [180, 0, randomInt(60, 120)], rayons: { [c]: `${r} cm` } })),
  ]);
}
function genDeuxPoints(): G {
  const [p, q, m, n] = lettres(4);
  const [a, b] = [p, q].sort();
  const d = randomInt(3, 9);
  const e = d + randomInt(1, 4);
  const sur = `${m} et ${n} sont sur la médiatrice de [${a}${b}].`;
  // [AB], M au-dessus et N au-dessous, CALCULÉS à leurs distances (MA = d, NB = e) ; la médiatrice n'est pas tracée.
  const w = 0.6 * d;
  const figMN = (t: { ma?: string; mb?: string; na?: string; nb?: string } = {}) =>
    geo.figureConstruction(
      { [a]: geo.point(-w, 0), [b]: geo.point(w, 0), [m]: geo.point(0, Math.sqrt(d * d - w * w)), [n]: geo.point(0, -Math.sqrt(e * e - w * w)) },
      {
        segments: [
          { a, b },
          { a: m, b: a, pointille: true, couleur: "#7c3aed", texte: t.ma },
          { a: m, b, pointille: true, couleur: "#7c3aed", texte: t.mb },
          { a: n, b: a, pointille: true, couleur: "#7c3aed", texte: t.na },
          { a: n, b, pointille: true, couleur: "#7c3aed", texte: t.nb },
        ],
      },
    );
  return avec(tirePhrase([
    () => lg(`${sur} ${m}${a} = ${d} cm et ${n}${b} = ${e} cm. Calcule ${m}${b} + ${n}${a}.`, d + e, `${m}${b} = ${d} cm et ${n}${a} = ${e} cm.`, figMN({ ma: `${d} cm`, nb: `${e} cm`, mb: "?", na: "?" })),
    () => lg(`${sur} ${m}${a} = ${d} cm et ${n}${b} = ${e} cm. Quel est le périmètre du quadrilatère ${a}${m}${b}${n} ?`, 2 * (d + e), `${d} + ${d} + ${e} + ${e} = ${2 * (d + e)} cm.`, figMN({ ma: `${d} cm`, nb: `${e} cm` })),
    () => qc(`${sur} Quelle droite est la médiatrice de [${a}${b}] ?`, `(${m}${n})`, [`(${a}${b})`, `(${a}${m})`, `(${b}${n})`], "Deux points suffisent à tracer une droite."),
    () => qc(`${m}${a} = ${m}${b} et ${n}${a} = ${n}${b}. Quelle droite est la médiatrice de [${a}${b}] ?`, `(${m}${n})`, [`(${a}${b})`, `(${a}${m})`, `(${b}${n})`], INVERSE),
    () => qc(`${sur} La droite (${m}${n}) coupe [${a}${b}] en un point. Quel est ce point ?`, `le milieu de [${a}${b}]`, [`le point ${a}`, `le point ${m}`, "un point quelconque"], "La médiatrice coupe le segment en son milieu."),
    // Ici, seulement [AB] : deux points dessinés feraient croire qu'il y en a deux.
    () => qc(`Combien de points sont à égale distance de ${a} et de ${b} ?`, "une infinité", ["un seul", "deux", "aucun"], "Tous les points de la médiatrice conviennent.", geo.figureConstruction({ [a]: geo.point(-3, 0), [b]: geo.point(3, 0) }, { segments: [{ a, b }] })),
    () => ouiNon(`${sur} ${m}${a} = ${d} cm et ${n}${a} = ${e} cm. A-t-on ${m}${b} = ${n}${b} ?`, false, `${m}${b} = ${d} cm et ${n}${b} = ${e} cm.`, figMN({ ma: `${d} cm`, na: `${e} cm` })),
  ]), figMN());
}
function genC5Cas(): G {
  const [a, b, c] = lettres(3).sort();
  const al = `${a}, ${b} et ${c} sont alignés.`;
  const nal = `${a}, ${b} et ${c} ne sont pas alignés.`;
  const para = "Deux droites perpendiculaires à une même droite sont parallèles.";
  // Les trois points seuls, alignés ou non comme le dit l'énoncé ; aucune médiatrice tracée.
  const xb = randomInt(-10, 15) / 10;
  const aligne = geo.figureConstruction({ [a]: geo.point(-3, 0), [b]: geo.point(xb, 0), [c]: geo.point(3, 0) });
  const triangle = geo.figureConstruction({ [a]: geo.point(-3, 0), [b]: geo.point(xb, 2.4), [c]: geo.point(3, 0.4) });
  return tirePhrase([
    () => nb(`${al} Combien de points sont à égale distance des trois ?`, 0, para, aligne),
    () => nb(`${nal} Combien de points sont à égale distance des trois ?`, 1, CONCOURS, triangle),
    () => qc(`Les médiatrices de [${a}${b}] et de [${b}${c}] sont parallèles. Que dire de ${a}, ${b} et ${c} ?`, "ils sont alignés", ["ils forment un triangle", "ils sont confondus", "ils sont sur un cercle"], para),
    () => qc(`Les médiatrices de [${a}${b}] et de [${b}${c}] se coupent. Que dire de ${a}, ${b} et ${c} ?`, "ils ne sont pas alignés", ["ils sont alignés", "ils sont confondus", "ils forment un triangle équilatéral"], "Si les points étaient alignés, ces médiatrices seraient parallèles."),
    () => qc(`${al} Comment sont les médiatrices de [${a}${b}] et de [${b}${c}] ?`, "parallèles", ["concourantes", "perpendiculaires", "sécantes en " + b], para, aligne),
    () => nb(`${nal} Combien de cercles passent par les trois ?`, 1, "Un seul centre possible, donc un seul cercle.", triangle),
  ]);
}
function genC5Variante(): G {
  const { a, b, c, o } = tri();
  const dep = `La preuve part des médiatrices de [${a}${b}] et de [${a}${c}], qui se coupent en ${o}.`;
  return avec(tirePhrase([
    () => qc(`${dep} Quelles égalités obtient-on ?`, `${o}${a} = ${o}${b} et ${o}${a} = ${o}${c}`, [`${o}${a} = ${o}${b} et ${o}${b} = ${a}${c}`, `${o}${b} = ${a}${b} et ${o}${c} = ${a}${c}`, `${a}${b} = ${a}${c} et ${o}${a} = ${o}${b}`], EGALE_DISTANCE),
    () => qc(`${dep} Quelle est la conclusion ?`, `${o} est sur la médiatrice de [${b}${c}]`, [`${o} est le milieu de [${b}${c}]`, `${o} est sur le segment [${b}${c}]`, `${a}${b} = ${a}${c}`], INVERSE),
    () => qc(`${dep} Quelle égalité donne la conclusion ?`, `${o}${b} = ${o}${c}`, [`${a}${b} = ${a}${c}`, `${o}${b} = ${b}${c}`, `${o}${c} = ${b}${c}`], INVERSE),
    () => qc(`La preuve part des médiatrices de [${a}${c}] et de [${b}${c}]. Quelle médiatrice reste à étudier ?`, `celle de [${a}${b}]`, [`celle de [${a}${c}]`, `celle de [${b}${c}]`, "aucune"], CONCOURS),
    () => qc(`La preuve part des médiatrices de [${a}${c}] et de [${b}${c}], qui se coupent en ${o}. Quelle égalité obtient-on à la fin ?`, `${o}${a} = ${o}${b}`, [`${a}${c} = ${b}${c}`, `${o}${a} = ${a}${b}`, `${o}${b} = ${a}${b}`], "Chacune des deux distances est égale à " + o + c + "."),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genK4Diametre(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(3, 11);
  const trop = 2 * r + randomInt(1, 3);
  const mil = `Le centre ${o} du cercle circonscrit à ${nom} est le milieu de [${a}${b}].`;
  const ray = `Le cercle circonscrit à ${nom} a pour rayon ${r} cm.`;
  // O milieu de [AB] : A et B diamétralement opposés, C sur le cercle (triangle rectangle en C).
  const angC = randomInt(55, 125);
  const figMil = (rayonC?: string) => figCC({ a, b, c, o }, { centre: true, cercle: true, angles: [180, 0, angC], rayons: rayonC ? { [c]: rayonC } : undefined });
  const figRay = figCC({ a, b, c, o }, { centre: true, cercle: true, rayons: { [a]: `${r} cm` } });
  return avec(tirePhrase([
    () => lg(`${mil} ${a}${b} = ${2 * r} cm. Quel est le rayon ?`, r, `${2 * r} ÷ 2 = ${r} cm.`),
    () => lg(`${mil} ${a}${b} = ${2 * r} cm. Combien mesure ${o}${c} ?`, r, `${o}${c} est un rayon : ${2 * r} ÷ 2 = ${r} cm.`),
    () => lg(`${mil} ${o}${c} = ${r} cm. Combien mesure ${a}${b} ?`, 2 * r, `[${a}${b}] est un diamètre : 2 × ${r} = ${2 * r} cm.`, figMil(`${r} cm`)),
    () => ouiNon(`${ray} Un côté peut-il mesurer ${trop} cm ?`, false, `Le plus long possible est le diamètre, ${2 * r} cm.`, figRay),
    () => lg(`${ray} Quelle est la plus grande longueur possible pour un côté ?`, 2 * r, `Le diamètre : 2 × ${r} = ${2 * r} cm.`, figRay),
    () => ouiNon(`${mil} Le segment [${a}${b}] est-il un diamètre du cercle ?`, true, `Il passe par le centre, et ses extrémités sont sur le cercle.`),
    () => qc(`${mil} Comment appelle-t-on [${a}${b}] pour ce cercle ?`, "un diamètre", ["un rayon", "une médiatrice", "un arc"], "Il passe par le centre, et ses extrémités sont sur le cercle."),
  ]), figMil());
}
function genK5Cercles(): G {
  const [p, q, k, c] = lettres(4);
  const [a, b] = [p, q].sort();
  return tirePhrase([
    () => qc(`Deux cercles passent par ${a} et ${b}. Où sont leurs centres ?`, `sur la médiatrice de [${a}${b}]`, [`sur la droite (${a}${b})`, `au milieu de [${a}${b}]`, `sur le segment [${a}${b}]`], EGALE_DISTANCE),
    () => qc(`Combien de cercles passent par ${a} et ${b} ?`, "une infinité", ["un seul", "deux", "aucun"], "Chaque point de la médiatrice peut servir de centre."),
    () => nb(`${a}, ${b} et ${c} ne sont pas alignés. Combien de cercles passent par ces trois points ?`, 1, "Un seul centre possible, donc un seul cercle."),
    () => nb(`${a}, ${b} et ${c} sont alignés. Combien de cercles passent par ces trois points ?`, 0, "Les médiatrices sont parallèles : aucun centre."),
    () => ouiNon(`${k} est sur la médiatrice de [${a}${b}]. Le cercle de centre ${k} passant par ${a} passe-t-il par ${b} ?`, true, `${k}${a} = ${k}${b}.`),
    () => ouiNon(`Le cercle de centre ${k} passant par ${a} passe aussi par ${b}. ${k} est-il sur la médiatrice de [${a}${b}] ?`, true, `${k}${a} = ${k}${b}.`),
  ]);
}

// ----- CONSTRUIRE, ★2
function genK2Mot(): G {
  const { a, b, c, o, nom } = tri();
  return avec(tirePhrase([
    () => qc("Par quels points passe le cercle circonscrit à un triangle ?", "par les trois sommets", ["par les milieux des côtés", "par un seul sommet", "par son propre centre"], "Le cercle circonscrit passe par les trois sommets."),
    () => qc(`Le cercle circonscrit à ${nom} passe par quels points ?`, `${a}, ${b} et ${c}`, [`${a} et ${b} seulement`, `${b} et ${c} seulement`, `${a} et ${c} seulement`], "Il passe par les trois sommets."),
    () => nb("Combien de sommets sont sur le cercle circonscrit ?", 3, "Le cercle circonscrit passe par les trois sommets."),
    () => ouiNon(`Le point ${a} est-il sur le cercle circonscrit à ${nom} ?`, true, `${a} est un sommet : il est sur le cercle.`),
    () => ouiNon(`Le centre ${o} est-il sur le cercle circonscrit à ${nom} ?`, false, "Le centre est à l’intérieur du cercle, pas dessus."),
    () => qc("Comment s’appelle le cercle qui passe par les trois sommets ?", "le cercle circonscrit", ["le cercle inscrit", "le cercle médian", "le cercle concourant"], "Circonscrit veut dire tracé autour."),
    () => qc("Quel instrument trace le cercle circonscrit ?", "le compas", ["le rapporteur", "l’équerre", "la règle"], "Un cercle se trace au compas."),
    () => qc("Quels instruments tracent une médiatrice ?", "la règle graduée et l’équerre", ["le rapporteur seul", "le compas seul", "la calculatrice"], "On place le milieu à la règle, puis la perpendiculaire à l’équerre."),
  ]), figCC({ a, b, c, o }));
}
function genK2Centre(): G {
  const pq = "Le centre est le point de concours des médiatrices.";
  return avec(tirePhrase([
    () => qc("Où est le centre du cercle circonscrit ?", "au point de concours des médiatrices", ["au milieu du plus grand côté", "sur un sommet", "au milieu d’une médiatrice"], pq),
    () => nb("Le centre du cercle circonscrit est sur combien de médiatrices ?", 3, pq),
    () => nb("Il faut au moins combien de médiatrices pour trouver le centre ?", 2, "Deux droites qui se coupent donnent déjà un point."),
    () => qc("Quelles droites trace-t-on pour trouver le centre ?", "les médiatrices des côtés", ["les parallèles aux côtés", "les droites passant par deux sommets", "les rayons du cercle"], pq),
    () => ouiNon("Une seule médiatrice suffit-elle pour trouver le centre ?", false, "Une droite ne donne pas un point : il en faut deux."),
    () => ouiNon("Deux médiatrices suffisent-elles pour trouver le centre ?", true, "Elles se coupent en un point : c’est le centre."),
    () => qc("Le rayon du cercle circonscrit va de quel point à quel point ?", "du centre à un sommet", ["d’un sommet à un autre", "du centre au milieu d’un côté", "du milieu d’un côté à un sommet"], "Le rayon est la distance du centre à un sommet."),
    () => qc("Dans un triangle, une médiatrice se trace pour quel élément ?", "un côté", ["un sommet", "un angle"], "Une médiatrice est celle d’un segment : un côté."),
  ]), figCC(tri()));
}
function genK2Figure(): G {
  const T = tri();
  const { a, b, c, o } = T;
  const hors = pick([a, b, c]);
  // Une fois sur deux, un sommet est écarté : la phrase ne donne pas la réponse.
  const ecarte = Math.random() < 0.5;
  const verdict = ecarte ? `Le sommet ${hors} n’est pas sur le cercle.` : "Il passe par les trois sommets.";
  const figVerdict = () => figureSobre(T, ecarte ? { hors } : {});
  return tirePhrase([
    () => qc("Observe la figure. Quel point est le centre du cercle ?", o, [a, b, c], "Le centre est au milieu du cercle, à la même distance des sommets.", figureSobre(T)),
    () => qc("Sur la figure, quels points sont sur le cercle ?", `${a}, ${b} et ${c}`, [`${a}, ${b} et ${o}`, `${b}, ${c} et ${o}`, `${a}, ${c} et ${o}`], "Les trois sommets sont sur le cercle, pas le centre.", figureSobre(T)),
    () => qc("Sur la figure, quel segment est un rayon ?", `[${o}${b}]`, [`[${a}${b}]`, `[${a}${c}]`, `[${b}${c}]`], "Le rayon part du centre.", figureSobre(T, { rayons: true })),
    () => qc("Sur la figure, quel segment est un côté du triangle ?", `[${a}${c}]`, [`[${o}${a}]`, `[${o}${b}]`, `[${o}${c}]`], "Un côté relie deux sommets.", figureSobre(T, { rayons: true })),
    () => ouiNon("Observe la figure. Ce cercle est-il circonscrit au triangle ?", !ecarte, verdict, figVerdict()),
    () => ouiNon("Observe la figure. Ce cercle est-il bien le cercle circonscrit ?", !ecarte, verdict, figVerdict()),
    () => qc("Observe la figure. Quel sommet n’est pas sur le cercle ?", hors, [a, b, c].filter((x) => x !== hors), "Les deux autres sommets sont sur le cercle.", figureSobre(T, { hors })),
    () => nb("Sur la figure, combien de sommets du triangle sont sur le cercle ?", ecarte ? 2 : 3, verdict, figVerdict()),
  ]);
}
function genK2Rayon(): G {
  const T = tri();
  const { a, b, c, o, nom } = T;
  const r = randomInt(3, 12);
  const s = pick([a, b, c]);
  const cer = `Cercle circonscrit à ${nom} : centre ${o}`;
  const fig = () => triangleInscritNomme(T, { rayon: { vers: s === a ? b : a, label: `${r} cm` } });
  // Le rayon n'est écrit sur la figure que lorsque l'énoncé le DONNE (sinon le cercle seul).
  return avec(tirePhrase([
    () => lg(`${cer}, rayon ${r} cm. Combien mesure ${o}${s} ?`, r, `[${o}${s}] est un rayon.`, fig()),
    () => lg(`${cer}. ${o}${s} = ${r} cm. Quel est le rayon ?`, r, `[${o}${s}] est un rayon.`),
    () => lg(`${cer}, diamètre ${2 * r} cm. Combien mesure ${o}${s} ?`, r, `${2 * r} ÷ 2 = ${r}.`),
    () => lg(`${cer}, rayon ${r} cm. Quel est son diamètre ?`, 2 * r, `2 × ${r} = ${2 * r}.`, fig()),
    () => lg(`${cer}. ${o}${s} = ${r} cm. Quel écart de compas faut-il ?`, r, "L’écart du compas est le rayon."),
    () => lg(`Observe la figure. Le compas s’ouvre de ${o} à un sommet. Quel écart prend-il ?`, r, "L’écart du compas est le rayon.", fig()),
    () => lg(`Sur la figure, quel est le diamètre du cercle ?`, 2 * r, `2 × ${r} = ${2 * r}.`, fig()),
    () => lg(`Observe la figure. Combien mesure ${o}${s} ?`, r, `[${o}${s}] est un rayon, comme celui qui est écrit.`, fig()),
  ]), triangleInscritNomme(T));
}
function genK2Ordre(): G {
  const un = "tracer deux médiatrices";
  const deux = "marquer leur point d’intersection";
  const trois = "ouvrir le compas jusqu’à un sommet";
  const quatre = "tracer le cercle";
  const ordre = [un, deux, trois, quatre];
  const pq = `L’ordre : ${ordre.join(", puis ")}.`;
  const q = (text: string, bon: string) => qc(text, bon, ordre.filter((x) => x !== bon), pq);
  return avec(tirePhrase([
    () => q("Quelle est la première étape pour tracer le cercle circonscrit ?", un),
    () => q("Que fait-on juste après avoir tracé deux médiatrices ?", deux),
    () => q("Que fait-on juste après avoir marqué le centre ?", trois),
    () => q("Quelle est la dernière étape du tracé ?", quatre),
    () => qc("Où pique-t-on le compas pour le cercle circonscrit ?", "sur le centre", ["sur un sommet", "au milieu d’un côté", "sur une médiatrice, n’importe où"], "Le compas se pique au centre."),
    () => qc("Jusqu’où ouvre-t-on le compas pour le cercle circonscrit ?", "jusqu’à un sommet", ["jusqu’au milieu d’un côté", "de la longueur d’un côté", "n’importe comment"], "L’écart du compas est le rayon : du centre à un sommet."),
    () => qc("Le compas est piqué au centre. Où pose-t-on la mine ?", "sur un sommet", ["au milieu d’un côté", "sur le centre", "sur une médiatrice"], "L’écart du compas est le rayon : du centre à un sommet."),
    () => qc("Quelle étape se fait au compas ?", quatre, [un, deux], "Le compas trace le cercle, à la fin."),
  ]), figCC(tri()));
}
function genK2VraiFaux(): G {
  const [t, v, p] = pick<[string, boolean, string]>([
    ["le cercle circonscrit passe par les trois sommets.", true, "C’est sa définition."],
    ["le cercle circonscrit passe par les milieux des côtés.", false, "Il passe par les sommets, pas par les milieux."],
    ["le cercle circonscrit est tracé à l’intérieur du triangle.", false, "Il est tracé autour du triangle."],
    ["le rayon va du centre à un sommet.", true, "Les sommets sont sur le cercle."],
    ["chaque triangle a un seul cercle circonscrit.", true, "Il a un seul point de concours, donc un seul centre."],
    ["le centre est le point de concours des médiatrices.", true, "C’est le seul point à égale distance des trois sommets."],
    ["deux médiatrices suffisent pour trouver le centre.", true, "Elles se coupent déjà en ce point."],
    ["une seule médiatrice suffit pour trouver le centre.", false, "Une droite ne donne pas un point."],
    ["le diamètre du cercle vaut deux rayons.", true, "Le diamètre est le double du rayon."],
  ]);
  // Un triangle quelconque, sans rien de tracé : la phrase reste à juger.
  return avec(vraiFaux(`Vrai ou faux : ${t}`, v, p), figCC(tri()));
}

// ----- CONSTRUIRE, ★3
function genK3Etape(): G {
  const { a, b, c, o, nom } = tri();
  const ensuite = `nommer ${o} le point où elles se coupent`;
  const compas = `pointer le compas en ${o} et l’ouvrir jusqu’à un sommet`;
  const cercle = "tracer le cercle";
  const debut = "tracer deux médiatrices";
  const q = (text: string, bon: string) => qc(text, bon, [debut, ensuite, compas, cercle].filter((x) => x !== bon), `L’ordre : ${debut}, ${ensuite}, ${compas}, ${cercle}.`);
  return avec(tirePhrase([
    () => q(`Dans le triangle ${nom}, on a tracé les médiatrices de [${a}${b}] et de [${a}${c}]. Que fait-on ensuite ?`, ensuite),
    () => q(`${o} est le point d’intersection de deux médiatrices de ${nom}. Que fait-on ensuite ?`, compas),
    () => q(`Le compas est pointé en ${o} et ouvert jusqu’à ${a}. Que reste-t-il à faire ?`, cercle),
    () => q(`On veut le cercle circonscrit à ${nom}. Que fait-on d’abord ?`, debut),
    () => ouiNon(`Pour le triangle ${nom}, peut-on choisir n’importe quels côtés pour tracer les deux médiatrices ?`, true, "Les trois médiatrices passent par le même point."),
    () => ouiNon(`Le compas est pointé en ${o} et ouvert jusqu’au milieu de [${a}${b}]. Le cercle passera-t-il par ${a} ?`, false, "Il faut ouvrir jusqu’à un sommet."),
    () => ouiNon(`Le compas est pointé en ${o}. On l’ouvre jusqu’à ${b} au lieu de ${a}. Le cercle circonscrit change-t-il ?`, false, `${o}${a} = ${o}${b} : le même écart, le même cercle.`),
    () => qc(`On a trouvé ${o} avec deux médiatrices de ${nom}. Comment vérifier sa place ?`, "tracer la troisième médiatrice", ["mesurer le plus grand côté", "tracer une hauteur", "recommencer avec le même côté"], "La troisième médiatrice doit passer par le même point."),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genK3Mesures(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(3, 12);
  const cer = `Le cercle circonscrit à ${nom} a pour centre ${o}.`;
  return avec(tirePhrase([
    () => lg(`${cer} ${o}${a} = ${r} cm. Quel est son diamètre ?`, 2 * r, `Le rayon vaut ${r} cm. 2 × ${r} = ${2 * r} cm.`),
    () => lg(`Le diamètre du cercle circonscrit à ${nom} mesure ${2 * r} cm. Quel écart de compas faut-il ?`, r, `${2 * r} ÷ 2 = ${r} cm.`),
    () => lg(`Le compas est réglé à ${r} cm pour tracer le cercle circonscrit à ${nom}. Combien vaut ${o}${a} + ${o}${b} si ${o} est le centre ?`, 2 * r, `${o}${a} = ${o}${b} = ${r} cm.`),
    () => lg(`On règle le compas sur ${o}${a} = ${r} cm. ${o} est le centre du cercle circonscrit à ${nom}. Combien mesure ${o}${c} ?`, r, "Les sommets sont tous sur le cercle."),
    () => lg(`${cer} ${o}${a} + ${o}${b} = ${2 * r} cm. Quel écart de compas faut-il ?`, r, `${2 * r} ÷ 2 = ${r} cm.`),
    () => lg(`${cer} ${o}${a} + ${o}${b} + ${o}${c} = ${3 * r} cm. Quel écart de compas faut-il ?`, r, `${3 * r} ÷ 3 = ${r} cm.`),
    () => lg(`Le diamètre du cercle circonscrit à ${nom} mesure ${2 * r} cm. ${o} est son centre. Calcule ${o}${a} + ${o}${b} + ${o}${c}.`, 3 * r, `Le rayon vaut ${r} cm, donc 3 × ${r} = ${3 * r} cm.`),
  ]), figCC({ a, b, c, o }, { centre: true, cercle: true }));
}
function genK3Position(): G {
  const { a, b, c, o, nom } = tri();
  const k = pick("KMNPRSTU".split("").filter((x) => ![a, b, c, o].includes(x)));
  const r = randomInt(4, 11);
  const ecart = pick([-2, -1, 0, 1, 2]);
  const d = r + ecart;
  const cer = `Cercle circonscrit à ${nom} : centre ${o}, rayon ${r} cm.`;
  const dist = `${k} est à ${d} cm de ${o}.`;
  const lieu = ecart === 0 ? "sur le cercle" : ecart < 0 ? "à l’intérieur du cercle" : "à l’extérieur du cercle";
  const lb = r + pick([1, 2]);
  const debut = `Cercle de centre ${o}, rayon ${r} cm. ${o}${a} = ${r} cm, ${o}${b} = ${r} cm et ${o}${c} = ${lb} cm.`;
  return tirePhrase([
    () => ouiNon(`${cer} ${dist} ${k} est-il sur le cercle ?`, ecart === 0, `On compare ${d} cm au rayon, ${r} cm.`),
    () => qc(`${cer} ${dist} Où est ${k} ?`, lieu, ["sur le cercle", "à l’intérieur du cercle", "à l’extérieur du cercle"].filter((x) => x !== lieu), `On compare ${d} cm au rayon, ${r} cm.`),
    () => ouiNon(`${cer} ${a} est-il à ${r} cm de ${o} ?`, true, "Un sommet est sur le cercle."),
    () => ouiNon(`${debut} Ce cercle est-il circonscrit à ${nom} ?`, false, `${c} n’est pas sur le cercle.`),
    () => qc(`${debut} Quel sommet est hors du cercle ?`, c, [a, b, "aucun"], `${o}${c} est plus grand que le rayon.`),
    () => nb(`${debut} Combien de sommets sont sur le cercle ?`, 2, `${a} et ${b} seulement.`),
  ]);
}
const METIERS_CERCLE = [
  { qui: "Une paysagiste", il: "elle", trois: "trois arbres", un: "l’un d’eux", u: "m" },
  { qui: "Un architecte", il: "il", trois: "trois colonnes", un: "l’une d’elles", u: "m" },
  { qui: "Une ingénieure", il: "elle", trois: "trois antennes", un: "l’une d’elles", u: "km" },
  { qui: "Un menuisier", il: "il", trois: "trois clous", un: "l’un d’eux", u: "cm" },
  { qui: "Une archéologue", il: "elle", trois: "trois pierres", un: "l’une d’elles", u: "m" },
  { qui: "Un géomètre", il: "il", trois: "trois bornes", un: "l’une d’elles", u: "m" },
  { qui: "Une cartographe", il: "elle", trois: "trois repères", un: "l’un d’eux", u: "m" },
  { qui: "Un guide réunionnais", il: "il", trois: "trois gîtes", un: "l’un d’eux", u: "km" },
];
function genK3Metier(): G {
  const s = pick(METIERS_CERCLE);
  const r = randomInt(3, 20);
  const m = pick(["droites", "autres", "diametre"] as const);
  if (m === "droites")
    return qc(`${s.qui} veut un cercle passant par ${s.trois}. Quelles droites trace-t-${s.il} pour trouver le centre ?`, "deux médiatrices", ["deux hauteurs", "deux parallèles", "une seule médiatrice"], "Deux médiatrices se coupent au centre.", figCC({ a: "_1", b: "_2", c: "_3", o: "_0" }, { cotes: false, noms: false }));
  const debut = `${s.qui} trace un cercle passant par ${s.trois}. Le centre est à ${r} ${s.u} de ${s.un}.`;
  // Le cercle, les trois points sans nom et le centre ; seule la distance donnée est écrite.
  const lieux = { a: "_1", b: "_2", c: "_3", o: "_0" };
  if (m === "autres") return lg(`${debut} À quelle distance est-il des autres ?`, r, "Les trois points sont sur le cercle, à la même distance du centre.", figCC(lieux, { centre: true, cotes: false, noms: false, cercle: true, rayons: { _1: `${r} ${s.u}`, _2: "?", _3: "?" } }), s.u);
  return lg(`${debut} Quel est le diamètre du cercle ?`, 2 * r, `2 × ${r} = ${2 * r} ${s.u}.`, figCC(lieux, { centre: true, cotes: false, noms: false, cercle: true, rayons: { _1: `${r} ${s.u}` } }), s.u);
}
function genK3Verif(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(3, 11);
  const autre = r + pick([1, 2]);
  const cercleFaux = "revoir la place du centre";
  // Les mesures lues sont dessinées telles quelles (le sommet trop loin l'est vraiment).
  const lues = (lc: number) => figCC({ a, b, c, o }, { centre: true, dist: [r, r, lc], rayons: { [a]: `${r} cm`, [b]: `${r} cm`, [c]: `${lc} cm` } });
  return avec(tirePhrase([
    () => qc(`On a tracé deux médiatrices de ${nom}. La troisième passe à côté de ${o}. Que faut-il faire ?`, "reprendre le tracé avec plus de soin", ["changer de triangle", "garder ce tracé", "effacer le triangle"], "Les trois médiatrices passent toujours par un même point."),
    () => qc(`La troisième médiatrice de ${nom} passe bien par ${o}. Que montre ce résultat ?`, "le tracé est précis", ["le triangle est équilatéral", `${o} est un sommet`, "le cercle n’existe pas"], "C’est la vérification attendue."),
    () => qc("À quoi sert la troisième médiatrice, une fois le centre trouvé ?", "à vérifier le tracé", ["à trouver le rayon", "à tracer le cercle", "à mesurer un côté"], "Deux suffisent. La troisième vérifie."),
    () => ouiNon(`On mesure ${o}${a} = ${r} cm, ${o}${b} = ${r} cm et ${o}${c} = ${r} cm. Le centre du cercle circonscrit à ${nom} est-il bien placé ?`, true, "Les trois distances sont égales.", lues(r)),
    () => ouiNon(`On mesure ${o}${a} = ${r} cm, ${o}${b} = ${r} cm et ${o}${c} = ${autre} cm. Le centre du cercle circonscrit à ${nom} est-il bien placé ?`, false, "Les trois distances doivent être égales.", lues(autre)),
    () => qc(`Le cercle de centre ${o} passe par ${a} et ${b}, mais pas par ${c}. Que faut-il revoir ?`, cercleFaux, ["la place du sommet " + c, "le nom du triangle", "la longueur de [" + a + b + "]"], "Le centre doit être à égale distance des trois sommets.", figCC({ a, b, c, o }, { centre: true, cercle: true, dist: [3, 3, 3.9] })),
  ]), figCC({ a, b, c, o }, { centre: true }));
}

// ----- CONSTRUIRE, ★4
function genK4Erreur(): G {
  const { a, b, c, o } = tri();
  const med = `Un élève trace le cercle circonscrit à ${a}${b}${c}.`;
  const q = (dit: string, bon: string, faux: string[], p: string) => qc(`${med} ${dit} Quelle est son erreur ?`, bon, faux, p);
  return avec(tirePhrase([
    () => q(`Il pique le compas en ${a}.`, "il faut piquer au centre", ["il faut piquer au milieu d’un côté", "il faut piquer en dehors du triangle", "il n’y a pas d’erreur"], "Le compas se pique au centre."),
    () => q(`Il ouvre le compas jusqu’au milieu de [${a}${b}].`, "il faut ouvrir jusqu’à un sommet", ["il faut ouvrir de la longueur de [" + a + b + "]", "il faut ouvrir au hasard", "il n’y a pas d’erreur"], "Le rayon va du centre à un sommet."),
    () => q(`Il trace une seule médiatrice, puis place ${o} dessus au hasard.`, "il faut deux médiatrices pour trouver le centre", ["il faut placer " + o + " sur un sommet", "il faut tracer une hauteur", "il n’y a pas d’erreur"], "Une droite ne donne pas un point."),
    () => q(`Il prend le milieu de [${a}${c}] pour centre.`, "le centre est là où les médiatrices se coupent", ["il faut prendre le milieu de [" + b + c + "]", "il faut prendre le sommet " + b, "il n’y a pas d’erreur"], "Le centre est à égale distance des trois sommets."),
    () => q(`Il pique le compas en ${o} et l’ouvre de la longueur de [${a}${b}].`, `il faut ouvrir de ${o} à un sommet`, ["il faut piquer en " + a, "il faut ouvrir de la moitié de [" + a + b + "]", "il n’y a pas d’erreur"], "Le rayon va du centre à un sommet."),
    () => q(`Il trace les médiatrices de [${a}${b}] et de [${a}${b}].`, "il a pris deux fois le même côté", ["il devait tracer trois hauteurs", `il devait partir de ${c}`, "il n’y a pas d’erreur"], "Il faut deux côtés différents, sinon il n’y a qu’une droite."),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genK4Perimetre(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(4, 10);
  const x = randomInt(3, 2 * r - 1);
  const p = 2 * r + x;
  const cer = `Le cercle circonscrit à ${nom} a pour centre ${o}`;
  const pq = `${o}${a} = ${o}${b} = ${r} cm. Périmètre : ${r} + ${r} + ${x} = ${p} cm.`;
  return avec(tirePhrase([
    () => lg(`${cer} et pour rayon ${r} cm. ${a}${b} = ${x} cm. Quel est le périmètre du triangle ${o}${a}${b} ?`, p, pq),
    () => lg(`${cer} et pour diamètre ${2 * r} cm. ${a}${b} = ${x} cm. Quel est le périmètre du triangle ${o}${a}${b} ?`, p, pq),
    () => lg(`${cer}. Le triangle ${o}${a}${b} a pour périmètre ${p} cm et ${a}${b} = ${x} cm. Quel est le rayon du cercle ?`, r, `${p} − ${x} = ${2 * r}, puis ${2 * r} ÷ 2 = ${r} cm.`),
    () => lg(`${cer}. Le triangle ${o}${a}${b} a pour périmètre ${p} cm et ${a}${b} = ${x} cm. Quel est le diamètre du cercle ?`, 2 * r, `${p} − ${x} = ${2 * r} cm : c’est le double du rayon.`),
    () => lg(`${cer} et pour rayon ${r} cm. Le triangle ${o}${b}${c} a pour périmètre ${p} cm. Combien mesure ${b}${c} ?`, x, `${r} + ${r} = ${2 * r}, puis ${p} − ${2 * r} = ${x} cm.`),
    () => lg(`${cer}. Quel écart de compas faut-il, si ${o}${a} + ${o}${b} + ${a}${b} = ${p} cm et ${a}${b} = ${x} cm ?`, r, `${p} − ${x} = ${2 * r}, puis ${2 * r} ÷ 2 = ${r} cm.`),
  ]), figCC({ a, b, c, o }, { centre: true, cercle: true }));
}
function genK4Autres(): G {
  const { a, b, c, o, nom } = tri();
  const d = pick("KMNPRSTU".split("").filter((x) => ![a, b, c, o].includes(x)));
  const r = randomInt(3, 11);
  const sur = `${d} est un autre point du cercle circonscrit à ${nom}, de centre ${o}.`;
  return avec(tirePhrase([
    () => nb("Combien de cercles circonscrits a un triangle ?", 1, "Un seul point de concours, donc un seul centre et un seul cercle."),
    () => ouiNon(`On déplace le sommet ${c} de ${nom}. Le centre du cercle circonscrit peut-il changer ?`, true, "Les médiatrices de [" + a + c + "] et de [" + b + c + "] changent."),
    () => ouiNon("Deux triangles différents peuvent-ils avoir le même cercle circonscrit ?", true, "Il suffit de prendre trois autres points du même cercle."),
    () => nb(`Les points ${a}, ${b}, ${c} et ${d} sont sur un même cercle. Combien de triangles ont ces points pour sommets ?`, 4, "On enlève un point à la fois : quatre triangles."),
    () => qc(`${sur} Quel est le centre du cercle circonscrit à ${a}${b}${d} ?`, o, [a, b, d], `Le même cercle passe par ${a}, ${b} et ${d}.`),
    () => lg(`${sur} ${o}${a} = ${r} cm. Combien mesure ${o}${d} ?`, r, `[${o}${d}] est aussi un rayon.`),
    () => ouiNon(`${sur} Est-il forcément sur la médiatrice de [${a}${b}] ?`, false, `Il faudrait ${d}${a} = ${d}${b}, et rien ne le dit. C’est ${o} qui est sur cette médiatrice.`),
  ]), figCC({ a, b, c, o }, { centre: true, cercle: true, autre: { nom: d, d: 3, angle: randomInt(150, 180) } }));
}
function genK4Passe(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(3, 11);
  // Le cercle passe par les sommets que dit l'énoncé ; un sommet « libre » est posé à côté du cercle.
  const par = (sur: string[]) => figCC({ a, b, c, o }, { centre: true, cercle: true, dist: [a, b, c].map((s) => (sur.includes(s) ? 3 : 3.9)) as [number, number, number] });
  return avec(tirePhrase([
    () => qc(`Un cercle de centre ${o} passe par ${a} et ${b}. Quelle médiatrice passe par ${o} ?`, `celle de [${a}${b}]`, [`celle de [${a}${c}]`, `celle de [${b}${c}]`, "aucune"], `${o}${a} = ${o}${b} : deux rayons.`),
    () => nb(`Un cercle de centre ${o} passe par ${a}, ${b} et ${c}. Combien de médiatrices de ${nom} passent par ${o} ?`, 3, "Les trois distances sont égales.", par([a, b, c])),
    () => lg(`Un cercle de centre ${o} passe par ${a} et ${c}. ${o}${a} = ${r} cm. Combien mesure ${o}${c} ?`, r, "Deux rayons du même cercle.", par([a, c])),
    () => ouiNon(`Un cercle de centre ${o} passe par ${a} et ${b}, mais pas par ${c}. ${o} est-il sur la médiatrice de [${a}${c}] ?`, false, `${o}${a} et ${o}${c} sont différentes.`),
    () => ouiNon(`Un cercle de centre ${o} passe par ${a} et ${b}. Le triangle ${o}${a}${b} est-il isocèle ?`, true, "Deux côtés sont des rayons."),
    () => qc(`Un cercle de centre ${o} passe par ${a} et ${b}. Quelle égalité est juste ?`, `${o}${a} = ${o}${b}`, [`${o}${a} = ${a}${b}`, `${o}${b} = ${a}${b}`, `${a}${b} = ${o}${a} + ${o}${b}`], "Deux rayons du même cercle."),
  ]), par([a, b]));
}
function genK4Figure(): G {
  const T = tri();
  const { a, b, c, o } = T;
  const r = randomInt(3, 11);
  const x = randomInt(3, 2 * r - 1);
  const fig = () => triangleInscritNomme(T, { rayon: { vers: a, label: `${r} cm` } });
  return tirePhrase([
    () => lg("Observe la figure. Quel est le diamètre du cercle ?", 2 * r, `2 × ${r} = ${2 * r} cm.`, fig()),
    () => lg(`Sur la figure, calcule ${o}${a} + ${o}${b} + ${o}${c}.`, 3 * r, `3 × ${r} = ${3 * r} cm.`, fig()),
    () => lg(`Sur la figure, ${b}${c} = ${x} cm. Quel est le périmètre du triangle ${o}${b}${c} ?`, 2 * r + x, `${r} + ${r} + ${x} = ${2 * r + x} cm.`, fig()),
    () => lg(`Observe la figure. Pour tracer ce cercle, quel écart de compas faut-il ?`, r, "L’écart du compas est le rayon.", fig()),
    () => lg(`Observe la figure. De combien faut-il agrandir le rayon pour un diamètre de ${2 * r + 4} cm ?`, 2, `${2 * r + 4} ÷ 2 = ${r + 2}, puis ${r + 2} − ${r} = 2 cm.`, fig()),
  ]);
}
const CORDES = [
  { qui: "Un jardinier", quoi: "les arbres" },
  { qui: "Une éleveuse", quoi: "les piquets" },
  { qui: "Un architecte", quoi: "les colonnes" },
  { qui: "Une géomètre", quoi: "les bornes" },
];
function genK4Corde(): G {
  const T = tri();
  const { a, b, c, o } = T;
  const s = pick(CORDES);
  const r = randomInt(3, 12);
  const debut = `${s.qui} attache une corde de ${r} m au point ${o}. Tendue, elle atteint ${s.quoi} ${a}, ${b} et ${c}.`;
  // Le piquet O et les trois points atteints ; la corde tendue vers a porte sa longueur.
  if (Math.random() < 0.5) return lg(`${debut} Quelle distance sépare ${o} de ${b} ?`, r, `La corde est un rayon : ${r} m.`, figCC(T, { centre: true, cotes: false, rayons: { [a]: `${r} m`, [b]: "?", [c]: true } }), "m");
  return lg(`${debut} Quel est le diamètre du cercle tracé ?`, 2 * r, `2 × ${r} = ${2 * r} m.`, figCC(T, { centre: true, cotes: false, cercle: true, rayons: { [a]: `${r} m` } }), "m");
}

// ----- CONSTRUIRE, ★5
function genK5Programme(): G {
  const { a, b, c, o, nom } = tri();
  const E = [
    `tracer les médiatrices de [${a}${b}] et de [${b}${c}]`,
    `nommer ${o} le point d’intersection de ces médiatrices`,
    `ouvrir le compas de ${o} jusqu’à ${a}`,
    `tracer le cercle de centre ${o} passant par ${a}`,
  ];
  const k = randomInt(0, 3);
  const restes = E.filter((_, i) => i !== k);
  return qc(`Pour le triangle ${nom}, voici un programme : ${restes.join(" ; ")}. Quelle étape manque ?`, E[k], [`tracer la hauteur issue de ${a}`, `mesurer le plus grand côté`, `placer le milieu de [${a}${c}]`], `Le programme complet : ${E.join(" ; ")}.`, figCC({ a, b, c, o }));
}
function genK5Pourquoi(): G {
  const { a, b, c, o, nom } = tri();
  return avec(tirePhrase([
    () => qc(`Pourquoi peut-on ouvrir le compas jusqu’à n’importe quel sommet de ${nom} ?`, "les trois distances au centre sont égales", ["les trois côtés sont égaux", "le centre est un sommet", "le compas s’ajuste tout seul"], "Le centre est à égale distance des trois sommets."),
    () => qc(`Pourquoi le centre du cercle circonscrit à ${nom} est-il sur la médiatrice de [${a}${b}] ?`, `il est à égale distance de ${a} et de ${b}`, [`il est le milieu de [${a}${b}]`, `il est sur le côté [${a}${b}]`, `[${a}${b}] est le plus grand côté`], INVERSE),
    () => qc(`Pourquoi le milieu de [${a}${c}] n’est-il pas toujours le centre du cercle circonscrit ?`, `il n’est pas toujours à la même distance de ${b}`, [`il n’est pas sur [${a}${c}]`, `il n’est jamais sur la médiatrice de [${a}${c}]`, "un milieu ne peut pas être un centre"], "Le centre doit être à égale distance des TROIS sommets."),
    () => qc(`Pourquoi le cercle de centre ${o} passant par ${a} passe-t-il aussi par ${c}, si ${o} est sur les trois médiatrices ?`, `${o}${a} = ${o}${c}`, [`${o} est le milieu de [${a}${c}]`, `${a}${b} = ${b}${c}`, `${a}${c} est le plus grand côté`], "Les deux sommets sont à la même distance du centre."),
    () => qc("Pourquoi trace-t-on des médiatrices pour trouver le centre, et pas des hauteurs ?", "la médiatrice rassemble les points à égale distance de deux sommets", ["les hauteurs n’existent pas toujours", "une médiatrice se trace plus vite", "les hauteurs sont toujours parallèles"], EGALE_DISTANCE),
  ]), figCC({ a, b, c, o }, { centre: true }));
}
function genK5Calcul(): G {
  const { a, b, c, o, nom } = tri();
  const r = randomInt(5, 11);
  const x = randomInt(3, 2 * r - 2);
  const y = randomInt(3, 2 * r - 2);
  const per = randomInt(3 * r, 5 * r);
  const y0 = randomInt(1, 4);
  const cer = `Le cercle circonscrit à ${nom} a pour centre ${o}`;
  return avec(tirePhrase([
    () => lg(`${cer}. Le triangle ${o}${a}${b} a pour périmètre ${2 * r + x} cm, ${a}${b} = ${x} cm et ${a}${c} = ${y} cm. Quel est le périmètre de ${o}${a}${c} ?`, 2 * r + y, `Le rayon vaut ${r} cm, donc ${r} + ${r} + ${y} = ${2 * r + y} cm.`),
    () => lg(`${cer} et pour diamètre ${2 * r} cm. ${nom} a pour périmètre ${per} cm. Calcule la somme des périmètres de ${o}${a}${b}, ${o}${b}${c} et ${o}${a}${c}.`, per + 6 * r, `Les côtés comptent une fois (${per} cm) et les rayons deux fois (6 × ${r} = ${6 * r} cm).`),
    () => lg(`${cer}. La somme ${o}${a} + ${o}${b} + ${o}${c} vaut ${3 * r} cm. Quel est le diamètre du cercle ?`, 2 * r, `${3 * r} ÷ 3 = ${r}, puis 2 × ${r} = ${2 * r} cm.`),
    () => lg(`${cer}. Le compas est ouvert de ${r} cm. On l’ouvre encore de ${y0} cm. De combien grandit le diamètre ?`, 2 * y0, `Le diamètre est le double du rayon : 2 × ${y0} = ${2 * y0} cm.`),
    () => lg(`${cer} et pour diamètre ${2 * r} cm. ${a}${b} = ${x} cm. De combien le périmètre de ${o}${a}${b} dépasse-t-il le diamètre ?`, x, `Le périmètre vaut ${2 * r} + ${x} : il dépasse de ${x} cm.`),
  ]), figCC({ a, b, c, o }, { centre: true, cercle: true, ...cordes(r, x, y, true) }));
}
function genK5Quatre(): G {
  const [p, q, r, s, o] = lettres(5);
  const [a, b, c, d] = [p, q, r, s].sort();
  const v = randomInt(3, 11);
  const sur = `Les points ${a}, ${b}, ${c} et ${d} sont sur un cercle de centre ${o}.`;
  // Les quatre points sur le cercle, le centre ; le dernier cas (D hors du cercle) reste sans figure.
  const O0 = geo.point(0, 0);
  const quatre = geo.figureConstruction(
    { [o]: O0, [a]: geo.surCercle(O0, 3, randomInt(195, 225)), [b]: geo.surCercle(O0, 3, randomInt(285, 315)), [c]: geo.surCercle(O0, 3, randomInt(15, 45)), [d]: geo.surCercle(O0, 3, randomInt(105, 135)) },
    { cercles: [{ centre: o, rayon: 3, couleur: "#059669" }] },
  );
  const avecQuatre = (q: G) => (q.text.includes("+ 1 cm") ? q : avec(q, quatre));
  return avecQuatre(tirePhrase([
    () => ouiNon(`${sur} La médiatrice de [${a}${d}] passe-t-elle par ${o} ?`, true, `${o}${a} = ${o}${d} : deux rayons.`),
    () => nb(`${sur} Combien de segments reliant deux de ces points ont une médiatrice passant par ${o} ?`, 6, "Les six segments ont leurs extrémités sur le cercle."),
    () => qc(`${sur} ${o}${a} = ${v} cm. Lesquels de ces points sont à ${v} cm de ${o} ?`, "les quatre", [`seulement ${a}`, `seulement ${a} et ${b}`, "aucun autre"], "Tous sont sur le cercle."),
    () => ouiNon(`Les médiatrices de [${a}${b}] et de [${b}${c}] se coupent en ${o}, et ${o}${d} = ${o}${a}. ${d} est-il sur le cercle de centre ${o} passant par ${a} ?`, true, `${d} est à la même distance de ${o} que ${a}.`),
    () => ouiNon(`Les médiatrices de [${a}${b}] et de [${b}${c}] se coupent en ${o}, et ${o}${d} = ${o}${a} + 1 cm. ${d} est-il sur le cercle de centre ${o} passant par ${a} ?`, false, `${d} est plus loin de ${o} que ${a}.`),
  ]));
}
const OBJETS_RONDS = [
  { qui: "Une archéologue", il: "Elle", objet: "d’assiette ronde", nom: "l’assiette", bord: "son bord" },
  { qui: "Une mécanicienne", il: "Elle", objet: "de roue", nom: "la roue", bord: "son bord" },
  { qui: "Un potier", il: "Il", objet: "de plat rond", nom: "le plat", bord: "son bord" },
  { qui: "Un horloger", il: "Il", objet: "de cadran", nom: "le cadran", bord: "son bord" },
  { qui: "Une vitrière", il: "Elle", objet: "de hublot", nom: "le hublot", bord: "son bord" },
];
function genK5Morceau(): G {
  const { a, b, c, o } = tri();
  const s = pick(OBJETS_RONDS);
  const r = randomInt(4, 15);
  const debut = `${s.qui} trouve un morceau ${s.objet}. ${s.il} marque trois points ${a}, ${b} et ${c} sur ${s.bord}.`;
  // Le morceau = un arc du cercle (de a à c en passant par b) ; le centre caché tant que l'énoncé ne le donne pas.
  const angles: [number, number, number] = [randomInt(150, 170), randomInt(80, 100), randomInt(10, 30)];
  const morceau = (fig: ConstructionCanvasData) => {
    fig.points.push({ id: "_o", x: 0, y: 0, cache: true }, { id: "_e", x: 0, y: -0.5, cache: true });
    fig.arcs = [{ centre: "_o", de: a, vers: c, eviter: "_e", couleur: "#059669" }];
    return fig;
  };
  if (Math.random() < 0.5)
    return qc(`${debut} Comment retrouver le centre ?`, `tracer les médiatrices de [${a}${b}] et de [${b}${c}]`, [`prendre le milieu de [${a}${c}]`, `tracer la hauteur issue de ${b}`, `diviser [${a}${b}] par 2`], `Le centre est à égale distance des trois points du bord.`, morceau(figCC({ a, b, c, o }, { cotes: false, angles })));
  return lg(`${debut} Les médiatrices de [${a}${b}] et de [${b}${c}] se coupent en ${o}, et ${o}${a} = ${r} cm. Quel est le diamètre de ${s.nom} ?`, 2 * r, `${o} est le centre, ${o}${a} un rayon. 2 × ${r} = ${2 * r} cm.`, morceau(figCC({ a, b, c, o }, { centre: true, cotes: false, meds: ["ab", "bc"], angles, rayons: { [a]: `${r} cm` } })));
}
function genK5Rayon(): G {
  const { a, b, c, o } = tri();
  const r = randomInt(4, 11);
  const autre = r + pick([1, 2, 3]);
  const lu = `Sur un tracé, ${o}${a} = ${r} cm, ${o}${b} = ${r} cm et ${o}${c} = ${autre} cm.`;
  return avec(tirePhrase([
    () => nb(`${lu} Par combien de sommets passe le cercle de centre ${o} et de rayon ${r} cm ?`, 2, `${a} et ${b} seulement.`),
    () => qc(`${lu} Où est ${c} par rapport au cercle de centre ${o} passant par ${a} ?`, "à l’extérieur", ["sur le cercle", "à l’intérieur", "au centre"], `${autre} cm dépasse le rayon, ${r} cm.`),
    () => qc(`${lu} Que peut-on dire de ${o} ?`, `il est sur la médiatrice de [${a}${b}] seulement`, [`il est sur les trois médiatrices`, `il est sur la médiatrice de [${a}${c}] seulement`, "il n’est sur aucune médiatrice"], `${o}${a} = ${o}${b} seulement.`),
    () => lg(`${lu} De combien faut-il rapprocher ${c} de ${o} pour que ${o} soit le centre ?`, autre - r, `${autre} − ${r} = ${autre - r} cm.`),
    () => nb(`${lu} Combien de médiatrices du triangle passent par ${o} ?`, 1, `Celle de [${a}${b}] seulement.`),
  ]), figCC({ a, b, c, o }, { centre: true, dist: [r, r, autre], rayons: { [a]: `${r} cm`, [b]: `${r} cm`, [c]: `${autre} cm` } }));
}

export const cercleCirconscritBank: TutorBankItemV4[] = [
  // =========================
  // CIRCONSCRIT_CONCOURANTES — le résultat, et sa preuve
  // =========================
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 2,
    theme: "neutral",
    text: "Que peut-on dire des trois médiatrices des côtés d'un triangle ?",
    format: "qcm",
    choices: [
      "elles se coupent toutes les trois en un même point",
      "elles sont parallèles entre elles",
      "elles se coupent deux à deux en trois points différents",
      "elles passent toutes les trois par le milieu du plus grand côté",
    ],
    expected: ["elles se coupent toutes les trois en un même point"],
    comparator: "mcq_exact",
    hint: "On dit qu'elles sont concourantes.",
    explanation: expl(
      "Les trois médiatrices d'un triangle sont CONCOURANTES : elles passent toutes par un même point. Ce point est à égale distance des trois sommets, et c'est le centre du cercle circonscrit."
    ),
    tags: ["cercle_circonscrit", "concourantes", "qcm"],
    canvas: triangleInscrit({ centreVisible: true, rayons: true }),
  },
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 3,
    theme: "neutral",
    text: "Le point O est le point de concours des médiatrices du triangle ABC. Que peut-on dire des longueurs OA, OB et OC ?",
    format: "qcm",
    choices: [
      "elles sont toutes les trois égales",
      "OA = OB, mais OC peut être différente",
      "elles sont toutes différentes",
      "leur somme est égale au périmètre du triangle",
    ],
    expected: ["elles sont toutes les trois égales"],
    comparator: "mcq_exact",
    hint: "Sur chaque médiatrice, deux distances sont égales.",
    explanation: expl(
      "O est sur la médiatrice de [AB], donc OA = OB. O est sur la médiatrice de [BC], donc OB = OC. Les trois longueurs sont donc égales : OA = OB = OC. C'est ce qui fait de O le centre d'un cercle passant par les trois sommets."
    ),
    tags: ["cercle_circonscrit", "concourantes", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 4,
    theme: "neutral",
    text: "Dans la preuve, on sait déjà que OA = OB et que OB = OC. Quel argument permet de conclure que O est aussi sur la médiatrice de [AC] ?",
    format: "qcm",
    choices: [
      "OA = OC, or tout point équidistant de A et de C est sur la médiatrice de [AC]",
      "O est le milieu de [AC]",
      "les trois côtés du triangle ont la même longueur",
      "O est le centre de gravité du triangle",
    ],
    expected: [
      "OA = OC, or tout point équidistant de A et de C est sur la médiatrice de [AC]",
    ],
    comparator: "mcq_exact",
    hint: "C'est le sens de la propriété caractéristique qui sert à démontrer.",
    explanation: expl(
      "De OA = OB et OB = OC, on tire OA = OC : le point O est à égale distance de A et de C. Or tout point équidistant des deux extrémités d'un segment appartient à sa médiatrice. Donc O est sur la médiatrice de [AC] — et les trois médiatrices passent bien par O."
    ),
    tags: ["cercle_circonscrit", "concourantes", "preuve", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_concourantes_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 3,
    theme: "neutral",
    text: "Pour démontrer que les trois médiatrices sont concourantes, par quoi commence-t-on ?",
    format: "qcm",
    choices: [
      "on appelle O le point d'intersection de DEUX des médiatrices",
      "on suppose que les trois se coupent au même point",
      "on mesure les trois médiatrices",
      "on trace le cercle circonscrit puis on cherche son centre",
    ],
    expected: ["on appelle O le point d'intersection de DEUX des médiatrices"],
    comparator: "mcq_exact",
    hint: "On ne peut pas partir de ce qu'on veut démontrer.",
    explanation: expl(
      "On part de deux médiatrices seulement — elles ne sont pas parallèles, donc elles se coupent en un point qu'on nomme O. Tout le raisonnement consiste ensuite à montrer que la TROISIÈME passe elle aussi par ce point. Supposer d'emblée que les trois se coupent reviendrait à admettre ce qu'on veut prouver."
    ),
    tags: ["cercle_circonscrit", "concourantes", "preuve", "qcm"],
  },
  {
    kind: "template",
    id: "circonscrit_concourantes_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 3,
    theme: "neutral",
    hint: "Toutes les distances du centre aux sommets sont égales.",
    tags: ["cercle_circonscrit", "concourantes", "template"],
    // ⭐ 06/10 : lettres tirées au sort (triangle et centre), situations, tournures.
    generate: () => {
      const d = randomInt(3, 12);
      const T = triangleEtCentre();
      const { a, b, c, o } = T;
      const [x, y] = shuffle([a, b, c]).slice(0, 2);
      const p = pick(PRENOMS);
      const t = pick([
        `Le point ${o} est le point de concours des médiatrices du triangle ${T.nom}, et ${o}${x} = ${d} cm. Combien mesure ${o}${y} ?`,
        `Les médiatrices des côtés du triangle ${T.nom} se coupent en ${o}. On mesure ${o}${x} = ${d} cm. Que vaut ${o}${y} ?`,
        `${p.nom} trace les trois médiatrices du triangle ${T.nom} : elles se coupent en ${o}. ${p.f ? "Elle" : "Il"} mesure ${o}${x} = ${d} cm. Combien mesure ${o}${y} ?`,
        `Dans le triangle ${T.nom}, ${o} est sur les trois médiatrices. Sachant que ${o}${x} = ${d} cm, donne ${o}${y}.`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${d} cm`, String(d)],
        comparator: "number_equal",
        explanation: expl(
          `${o} est sur les médiatrices des trois côtés, donc il est à égale distance des trois sommets : ${o}${a} = ${o}${b} = ${o}${c}. Comme ${o}${x} = ${d} cm, on a ${o}${y} = ${d} cm.`,
        ),
        canvas: triangleInscritNomme(T, { rayon: { vers: x, label: `${d} cm` } }),
      };
    },
  },
  {
    kind: "template",
    id: "circonscrit_concourantes_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_concourantes",
    difficulty: 5,
    theme: "neutral",
    hint: "Chaque étape se justifie par la propriété caractéristique de la médiatrice.",
    tags: ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"],
    // ⭐ 06/10 : la preuve se restitue PAS À PAS (cinq pas), lettres tirées au
    // sort. La question ouverte acceptait toute réponse contenant « médiatrice ».
    generate: () => {
      const { a, b, c, o, nom } = triangleEtCentre();
      const p = pick(PRENOMS);
      const intro = pick([
        `On démontre que les trois médiatrices du triangle ${nom} sont concourantes.`,
        `${p.nom} rédige la preuve : les médiatrices du triangle ${nom} sont concourantes.`,
        `Preuve, pour le triangle ${nom} : ses trois médiatrices passent par un même point.`,
      ]);
      const debut = `on appelle ${o} le point d’intersection des médiatrices de [${a}${b}] et de [${b}${c}]`;
      const PAS = [
        {
          q: `Par quoi commence la preuve ?`,
          bon: debut,
          faux: [`on suppose que les trois médiatrices se coupent en ${o}`, `on place ${o} au milieu de [${a}${c}]`, `on trace le cercle de centre ${o} qui passe par ${a}`],
          pourquoi: `On ne peut pas partir de ce qu’on veut démontrer : on part de DEUX médiatrices, qui se coupent en un point qu’on nomme ${o}.`,
        },
        {
          q: `${maj(debut)}. ${o} est sur la médiatrice de [${a}${b}]. Qu’en déduit-on ?`,
          bon: `${o}${a} = ${o}${b}`,
          faux: [`${o}${a} = ${o}${c}`, `${o}${b} = ${o}${c}`, `${o} est le milieu de [${a}${b}]`],
          pourquoi: `Tout point de la médiatrice de [${a}${b}] est à égale distance de ${a} et de ${b} : ${o}${a} = ${o}${b}.`,
        },
        {
          q: `${maj(debut)}. ${o} est sur la médiatrice de [${b}${c}]. Qu’en déduit-on ?`,
          bon: `${o}${b} = ${o}${c}`,
          faux: [`${o}${a} = ${o}${b}`, `${o}${a} = ${o}${c}`, `${o} est le milieu de [${b}${c}]`],
          pourquoi: `Tout point de la médiatrice de [${b}${c}] est à égale distance de ${b} et de ${c} : ${o}${b} = ${o}${c}.`,
        },
        {
          q: `On sait que ${o}${a} = ${o}${b} et que ${o}${b} = ${o}${c}. Qu’en déduit-on ?`,
          bon: `${o}${a} = ${o}${c}, donc ${o} est sur la médiatrice de [${a}${c}]`,
          faux: [`${o} est le milieu de [${a}${c}]`, `le triangle ${nom} est équilatéral`, `les médiatrices de [${a}${b}] et de [${b}${c}] sont parallèles`],
          pourquoi: `${o}${a} = ${o}${b} = ${o}${c}, donc ${o}${a} = ${o}${c} : ${o} est à égale distance de ${a} et de ${c}, il est donc sur la médiatrice de [${a}${c}].`,
        },
        {
          q: `Pourquoi ${o} est-il sur la médiatrice de [${a}${c}] ?`,
          bon: `parce que ${o} est à égale distance de ${a} et de ${c}`,
          faux: [`parce que ${o} est le milieu de [${a}${c}]`, `parce que [${a}${c}] est le plus grand côté`, `parce que ${o} est à l’intérieur du triangle`],
          pourquoi: `Un point à égale distance de ${a} et de ${c} est sur la médiatrice de [${a}${c}] : c’est la propriété de la médiatrice, utilisée dans l’autre sens.`,
        },
      ];
      const k = randomInt(0, PAS.length - 1);
      const s = PAS[k];
      // Aux pas 4 et 5, on rappelle d'où vient le point (sinon il tombe du ciel).
      const rappel = k >= 3 ? ` ${maj(debut)}.` : "";
      return {
        text: `${intro}${rappel} ${s.q}`,
        format: "qcm",
        choices: shuffle([s.bon, ...s.faux]),
        expected: [s.bon],
        comparator: "mcq_exact",
        explanation: expl(`${s.pourquoi} La preuve complète : ${debut} ; ${o}${a} = ${o}${b} ; ${o}${b} = ${o}${c} ; donc ${o}${a} = ${o}${c}, et ${o} est sur la médiatrice de [${a}${c}].`),
        // Les deux médiatrices de départ et leur point O (au premier pas, le triangle seul :
        // la figure ne doit pas souffler par quoi commencer). Celle de [AC] n'est jamais tracée.
        canvas: k === 0 ? figCC({ a, b, c, o }) : figCC({ a, b, c, o }, { centre: true, meds: ["ab", "bc"] }),
      };
    },
  },

  // =========================
  // CIRCONSCRIT_CONSTRUIRE
  // =========================
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'appelle-t-on le cercle circonscrit à un triangle ?",
    format: "qcm",
    choices: [
      "le cercle qui passe par les trois sommets du triangle",
      "le cercle tracé à l'intérieur du triangle, touchant les trois côtés",
      "le cercle de centre le milieu du plus grand côté",
      "le plus petit cercle qui contient le triangle",
    ],
    expected: ["le cercle qui passe par les trois sommets du triangle"],
    comparator: "mcq_exact",
    hint: "« Circonscrit » veut dire « tracé autour ».",
    explanation: expl(
      "Le cercle circonscrit passe par les trois SOMMETS. Son centre est le point de concours des médiatrices, et son rayon est la distance commune de ce centre aux trois sommets."
    ),
    tags: ["cercle_circonscrit", "construire", "canvas", "qcm"],
    canvas: triangleInscrit({ centreVisible: false }),
  },
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de médiatrices faut-il tracer, au minimum, pour trouver le centre du cercle circonscrit ?",
    // ⭐ 06/10 : QCM — le mot-clé « 2 » acceptait « 2 ou 3 », « 12 »…
    format: "qcm",
    choices: ["une", "deux", "trois", "aucune, le compas suffit"],
    expected: ["deux"],
    comparator: "mcq_exact",
    hint: "Deux droites qui se coupent donnent déjà un point.",
    explanation: expl(
      "Deux suffisent : leur point d'intersection est déjà à égale distance des trois sommets, puisque la troisième médiatrice y passe forcément. On trace souvent la troisième quand même — comme vérification, pour voir si elle tombe bien sur le même point."
    ),
    tags: ["cercle_circonscrit", "construire", "short"],
  },
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 3,
    theme: "neutral",
    text: "Une fois le centre O trouvé, comment règle-t-on l'écartement du compas pour tracer le cercle circonscrit ?",
    format: "qcm",
    choices: [
      "on pointe en O et on ouvre le compas jusqu'à l'un des trois sommets",
      "on ouvre le compas de la longueur du plus grand côté",
      "on ouvre le compas de la moitié du plus grand côté",
      "on ouvre le compas au hasard, puis on ajuste",
    ],
    expected: ["on pointe en O et on ouvre le compas jusqu'à l'un des trois sommets"],
    comparator: "mcq_exact",
    hint: "Le rayon, c'est la distance du centre à un sommet.",
    explanation: expl(
      "Le rayon du cercle circonscrit est OA, c'est-à-dire la distance de O à n'importe lequel des trois sommets — elles sont égales. On pointe donc en O, on ouvre jusqu'à A, et on trace : le cercle passe alors aussi par B et par C."
    ),
    tags: ["cercle_circonscrit", "construire", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_construire_fixed_4",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 4,
    theme: "neutral",
    text: "Le rayon du cercle circonscrit au triangle ABC mesure 6 cm. Combien mesure la distance du centre O au sommet B ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Les trois sommets sont sur le cercle.",
    explanation: expl(
      "B est un point du cercle de centre O, donc [OB] est un rayon : OB = 6 cm. C'est vrai pour les trois sommets, puisqu'ils sont tous sur ce cercle."
    ),
    tags: ["cercle_circonscrit", "construire", "canvas", "short"],
    canvas: triangleInscrit({ centreVisible: true, rayons: true }),
  },
  {
    kind: "template",
    id: "circonscrit_construire_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 3,
    theme: "neutral",
    hint: "Tous les sommets sont à la même distance du centre.",
    tags: ["cercle_circonscrit", "construire", "template"],
    // ⭐ 06/10 : lettres tirées au sort ; le rayon donné, ou le diamètre.
    generate: () => {
      const r = randomInt(3, 11);
      const T = triangleEtCentre();
      const { o, nom } = T;
      const sommet = pick([T.a, T.b, T.c]);
      const p = pick(PRENOMS);
      const parDiametre = Math.random() < 0.35;
      const t = parDiametre
        ? pick([
            `Le cercle circonscrit au triangle ${nom} a pour centre ${o} et pour diamètre ${2 * r} cm. Combien mesure ${o}${sommet} ?`,
            `${p.nom} trace le cercle circonscrit au triangle ${nom} : centre ${o}, diamètre ${2 * r} cm. Quelle est la longueur ${o}${sommet} ?`,
          ])
        : pick([
            `Le cercle circonscrit au triangle ${nom} a pour centre ${o} et pour rayon ${r} cm. Combien mesure ${o}${sommet} ?`,
            `${p.nom} a tracé le cercle circonscrit au triangle ${nom}, de centre ${o}, avec un écart de compas de ${r} cm. Combien mesure ${o}${sommet} ?`,
            `Le cercle de centre ${o} et de rayon ${r} cm passe par les trois sommets du triangle ${nom}. Donne la longueur ${o}${sommet}.`,
          ]);
      return {
        text: t,
        format: "short",
        expected: [`${r} cm`, String(r)],
        comparator: "number_equal",
        explanation: expl(
          `${sommet} est un sommet du triangle, donc il est sur le cercle circonscrit : [${o}${sommet}] est un rayon${parDiametre ? `, la moitié du diamètre : ${2 * r} ÷ 2 = ${r} cm` : `, et ${o}${sommet} = ${r} cm`}.`,
        ),
        canvas: triangleInscritNomme(T, parDiametre ? {} : { rayon: { vers: sommet === T.a ? T.b : T.a, label: `${r} cm` } }),
      };
    },
  },
  {
    kind: "template",
    id: "circonscrit_construire_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_construire",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux médiatrices, leur point d'intersection, puis le compas ouvert jusqu'à un sommet.",
    tags: ["cercle_circonscrit", "construire", "template", "qcm"],
    // ⭐ 06/10 : le programme de construction se restitue étape par étape, et
    // ses deux « pourquoi » ; lettres tirées au sort. La question ouverte
    // acceptait toute réponse contenant « rayon ».
    generate: () => {
      const { a, b, c, o, nom } = triangleEtCentre();
      const p = pick(PRENOMS);
      // Les deux médiatrices forment UNE étape : l'une ou l'autre peut venir
      // en premier, les séparer donnerait deux bonnes réponses.
      const ETAPES = [
        `tracer les médiatrices de [${a}${b}] et de [${b}${c}]`,
        `appeler ${o} le point d’intersection de ces deux médiatrices`,
        `pointer le compas en ${o} et l’ouvrir jusqu’à ${a}`,
        `tracer le cercle de centre ${o} qui passe par ${a}`,
      ];
      const RANGS = ["la première", "la deuxième", "la troisième", "la dernière"];
      const cas = randomInt(0, 5);
      if (cas <= 3) {
        const k = cas;
        const t = pick([
          `${p.nom} construit le cercle circonscrit au triangle ${nom}. Quelle est ${RANGS[k]} étape ?`,
          `Programme de construction du cercle circonscrit au triangle ${nom} : quelle est ${RANGS[k]} étape ?`,
        ]);
        return {
          text: t,
          format: "qcm",
          choices: shuffle(ETAPES),
          expected: [ETAPES[k]],
          comparator: "mcq_exact",
          explanation: expl(`Le programme : ${ETAPES.map((e, i) => `${i + 1}) ${e}`).join(" ; ")}.`),
          // Le triangle seul : rien de la construction n'est montré.
          canvas: figCC({ a, b, c, o }),
        };
      }
      if (cas === 4) {
        const bon = `parce que ${o}${a} = ${o}${b} = ${o}${c}`;
        return {
          text: pick([
            `${p.nom} trace le cercle de centre ${o} qui passe par ${a}. Pourquoi passe-t-il aussi par ${b} et par ${c} ?`,
            `Le cercle de centre ${o} passe par ${a}. Pourquoi est-on sûr qu’il passe aussi par ${b} et ${c} ?`,
          ]),
          format: "qcm",
          choices: shuffle([bon, `parce que ${o} est le milieu de [${b}${c}]`, `parce que le triangle ${nom} est équilatéral`, `parce qu’on a bien tenu le compas`]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`${o} est sur les trois médiatrices, donc à égale distance des trois sommets : ${o}${a} = ${o}${b} = ${o}${c}. Le cercle de rayon ${o}${a} passe donc par ${b} et ${c}.`),
          canvas: triangleInscritNomme({ a, b, c, o }),
        };
      }
      const bon = "parce que la troisième médiatrice passe forcément par leur point d’intersection";
      return {
        text: pick([
          `Pour trouver le centre du cercle circonscrit au triangle ${nom}, ${p.nom} ne trace que deux médiatrices. Pourquoi cela suffit-il ?`,
          `Pourquoi deux médiatrices suffisent-elles pour trouver le centre ${o} du cercle circonscrit au triangle ${nom} ?`,
        ]),
        format: "qcm",
        choices: shuffle([bon, "parce que la troisième médiatrice est toujours parallèle aux deux autres", `parce que le centre est toujours le milieu de [${a}${c}]`, "parce que deux droites ne se coupent jamais"]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: expl("On a démontré que les trois médiatrices d’un triangle sont concourantes : la troisième passe par le point d’intersection des deux premières. La tracer ne sert qu’à vérifier."),
        canvas: figCC({ a, b, c, o }, { centre: true, meds: ["ab", "bc"] }),
      };
    },
  },

  // =========================
  // CIRCONSCRIT_DEFI
  // =========================
  {
    kind: "fixed",
    id: "circonscrit_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois maisons ne sont pas alignées. On veut creuser un puits à égale distance des trois. Où faut-il le placer ?",
    format: "qcm",
    choices: [
      "au point de concours des médiatrices du triangle formé par les trois maisons",
      "au milieu de la maison la plus centrale",
      "n'importe où sur la médiatrice de deux d'entre elles",
      "il n'existe aucun emplacement possible",
    ],
    expected: ["au point de concours des médiatrices du triangle formé par les trois maisons"],
    comparator: "mcq_exact",
    hint: "Le point à égale distance de trois points, c'est exactement le centre du cercle circonscrit.",
    explanation: expl(
      "Les trois maisons forment un triangle. Le seul point à égale distance de ses trois sommets est le point de concours des médiatrices — le centre du cercle circonscrit. Une seule médiatrice ne suffirait pas : elle donne une droite entière de candidats, tous à égale distance de DEUX maisons seulement."
    ),
    tags: ["cercle_circonscrit", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "circonscrit_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois points A, B et C sont ALIGNÉS. Peut-on tracer un cercle qui passe par les trois ?",
    format: "qcm",
    choices: [
      "non : les médiatrices sont alors parallèles et ne se coupent jamais",
      "oui : il suffit de prendre un cercle assez grand",
      "oui : le centre est le milieu de [AC]",
      "oui, mais seulement si B est le milieu de [AC]",
    ],
    expected: ["non : les médiatrices sont alors parallèles et ne se coupent jamais"],
    comparator: "mcq_exact",
    hint: "Trace les médiatrices de [AB] et de [BC] quand les trois points sont sur une même droite.",
    explanation: expl(
      "Si A, B et C sont alignés, les médiatrices de [AB] et de [BC] sont toutes deux perpendiculaires à la même droite : elles sont donc parallèles et ne se coupent pas. Il n'existe aucun point à égale distance des trois, donc aucun cercle ne passe par eux. C'est pourquoi on parle du cercle circonscrit à un TRIANGLE — et un triangle a ses trois sommets non alignés."
    ),
    tags: ["cercle_circonscrit", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "circonscrit_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le rayon est la distance commune du centre aux sommets.",
    tags: ["cercle_circonscrit", "defi", "template"],
    // ⭐ 06/10 : lettres tirées au sort ; en situation (puits, lampadaire,
    // arroseur à égale distance de trois points), en mètres.
    generate: () => {
      const T = triangleEtCentre();
      const { o, nom } = T;
      const s = pick([T.a, T.b, T.c]);
      const p = pick(PRENOMS);
      if (Math.random() < 0.5) {
        const r = randomInt(4, 12);
        const t = pick([
          `Le centre ${o} du cercle circonscrit au triangle ${nom} vérifie ${o}${s} = ${r} cm. Quel est le diamètre de ce cercle ?`,
          `${o} est le point de concours des médiatrices du triangle ${nom}, et ${o}${s} = ${r} cm. Quel est le diamètre du cercle circonscrit ?`,
        ]);
        return {
          text: t,
          format: "short",
          expected: [`${2 * r} cm`, String(2 * r)],
          comparator: "number_equal",
          explanation: expl(
            `${o}${s} est un rayon du cercle circonscrit, donc le rayon vaut ${r} cm. Le diamètre est le double du rayon : 2 × ${r} = ${2 * r} cm.`,
          ),
          canvas: triangleInscritNomme(T, { rayon: { vers: s, label: `${r} cm` } }),
        };
      }
      const sit = pick([
        { quoi: "un puits", trois: "trois maisons", chacun: "chacune" },
        { quoi: "un lampadaire", trois: "trois bancs", chacun: "chacun" },
        { quoi: "un arroseur", trois: "trois arbres", chacun: "chacun" },
        { quoi: "une antenne", trois: "trois villages", chacun: "chacun" },
        { quoi: "une table de pique-nique", trois: "trois tentes", chacun: "chacune" },
      ]);
      const r = sit.trois === "trois villages" ? randomInt(2, 9) : randomInt(5, 30);
      const u = sit.trois === "trois villages" ? "km" : "m";
      const t = pick([
        `${sit.quoi[0].toUpperCase()}${sit.quoi.slice(1)} est placé${sit.quoi.startsWith("une") ? "e" : ""} en ${o}, à égale distance de ${sit.trois} ${T.a}, ${T.b} et ${T.c}. ${o}${s} = ${r} ${u}. Quel est le diamètre du cercle qui passe par ${T.a}, ${T.b} et ${T.c} ?`,
        `${p.nom} repère ${sit.trois} ${T.a}, ${T.b} et ${T.c}, et ${sit.quoi} en ${o} à ${r} ${u} de ${sit.chacun}. Quel est le diamètre du cercle de centre ${o} qui passe par ${T.a}, ${T.b} et ${T.c} ?`,
      ]);
      return {
        text: t,
        format: "short",
        expected: [`${2 * r} ${u}`, String(2 * r)],
        comparator: "number_equal",
        explanation: expl(`${o} est à ${r} ${u} des trois points : c’est le centre de leur cercle circonscrit, de rayon ${r} ${u}. Diamètre : 2 × ${r} = ${2 * r} ${u}.`),
        canvas: figCC(T, { centre: true, cotes: false, rayons: { [T.a]: `${r} ${u}`, [T.b]: true, [T.c]: true } }),
      };
    },
  },
  {
    kind: "template",
    id: "circonscrit_defi_tpl_ouverte",
    niveau: "6e",
    matiere: "maths",
    notionId: "cercle_circonscrit",
    microId: "circonscrit_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Reviens toujours à « à égale distance de… ».",
    tags: ["cercle_circonscrit", "defi", "template", "qcm"],
    // ⭐ 06/10 : la question ouverte à mots-clés devient trois défis en QCM,
    // lettres et situations tirées au sort : où placer le point à égale
    // distance de trois lieux ; trois points alignés ; deux lieux seulement.
    generate: () => {
      const [a, b, c] = lettres(3);
      const p = pick(PRENOMS);
      const sit = pick([
        { quoi: "un puits", trois: "maisons", f: true },
        { quoi: "une antenne", trois: "villages", f: false },
        { quoi: "un lampadaire", trois: "bancs", f: false },
        { quoi: "une fontaine", trois: "arbres", f: false },
        { quoi: "le ballon", trois: "joueurs", f: false },
        { quoi: "une table de pique-nique", trois: "tentes", f: true },
      ]);
      const alignes = sit.f ? "alignées" : "alignés";
      const le = sit.quoi.startsWith("une") ? "la" : "le";
      const cas = randomInt(0, 2);
      if (cas === 0) {
        const bon = `au point de concours des médiatrices du triangle ${a}${b}${c}`;
        const t = pick([
          `Les ${sit.trois} ${a}, ${b} et ${c} ne sont pas ${alignes}. On veut placer ${sit.quoi} à égale distance des trois. Où ?`,
          `${p.nom} veut mettre ${sit.quoi} à la même distance des ${sit.trois} ${a}, ${b} et ${c}, qui ne sont pas ${alignes}. Où doit-${p.f ? "elle" : "il"} ${le} placer ?`,
        ]);
        return {
          text: t,
          format: "qcm",
          choices: shuffle([bon, `au milieu de [${a}${c}]`, `n’importe où sur la médiatrice de [${a}${b}]`, "aucun endroit ne convient"]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`Le seul point à égale distance de ${a}, ${b} et ${c} est le point de concours des médiatrices du triangle ${a}${b}${c} : le centre de son cercle circonscrit. Une seule médiatrice ne donne l’égalité que pour deux des trois.`),
          // Les trois lieux seuls, non alignés.
          canvas: figCC({ a, b, c, o: "_0" }, { cotes: false }),
        };
      }
      if (cas === 1) {
        const bon = "non : les médiatrices sont parallèles et ne se coupent pas";
        const t = pick([
          `Les ${sit.trois} ${a}, ${b} et ${c} sont ${alignes}. Peut-on placer ${sit.quoi} à égale distance des trois ?`,
          `${p.nom} remarque que ${a}, ${b} et ${c} sont alignés. Existe-t-il un cercle qui passe par les trois ?`,
        ]);
        return {
          text: t,
          format: "qcm",
          choices: shuffle([bon, `oui : au milieu de [${a}${c}]`, "oui : il suffit de prendre un cercle assez grand", `oui, mais seulement si ${b} est le milieu de [${a}${c}]`]),
          expected: [bon],
          comparator: "mcq_exact",
          explanation: expl(`${a}, ${b} et ${c} sont sur une même droite : les médiatrices de [${a}${b}] et de [${b}${c}] sont perpendiculaires à cette droite, donc parallèles. Elles ne se coupent pas : aucun point n’est à égale distance des trois.`),
          // Les trois points alignés, b entre a et c ; aucune médiatrice.
          canvas: geo.figureConstruction({ [a]: geo.point(-3, 0), [b]: geo.point(randomInt(-10, 15) / 10, 0), [c]: geo.point(3, 0) }),
        };
      }
      const bon = `tous les points de la médiatrice de [${a}${b}]`;
      const t = pick([
        `Il n’y a que deux ${sit.trois}, ${a} et ${b}. Quels endroits sont à égale distance des deux ?`,
        `${p.nom} cherche où placer ${sit.quoi} à égale distance de deux ${sit.trois} seulement, ${a} et ${b}. Quels endroits conviennent ?`,
      ]);
      return {
        text: t,
        format: "qcm",
        choices: shuffle([bon, `seulement le milieu de [${a}${b}]`, "aucun endroit", `seulement les points du segment [${a}${b}]`]),
        expected: [bon],
        comparator: "mcq_exact",
        explanation: expl(`Avec deux points seulement, tous les points de la médiatrice de [${a}${b}] sont à égale distance de ${a} et de ${b} : il y en a une infinité. Il faut un troisième point pour n’en garder qu’un.`),
        canvas: geo.figureConstruction({ [a]: geo.point(-3, 0), [b]: geo.point(3, 0.8) }),
      };
    },
  },

  // =========================
  // ⭐ 07/11/2026 — GABARITS « À PLUSIEURS FAÇONS »
  // =========================
  gab("circonscrit_concourantes_tpl_compter", "circonscrit_concourantes", 2, "Trois côtés, trois médiatrices, un seul point commun.", ["cercle_circonscrit", "concourantes", "template"], genC2Compter),
  gab("circonscrit_concourantes_tpl_vrai_faux", "circonscrit_concourantes", 2, "Les médiatrices se coupent en un seul point.", ["cercle_circonscrit", "concourantes", "template", "qcm"], genC2VraiFaux),
  gab("circonscrit_concourantes_tpl_mot", "circonscrit_concourantes", 2, "Concourantes : qui passent par un même point.", ["cercle_circonscrit", "concourantes", "template", "qcm"], genC2Mot),
  gab("circonscrit_concourantes_tpl_figure", "circonscrit_concourantes", 2, "Regarde le point à la même distance des sommets.", ["cercle_circonscrit", "concourantes", "template", "canvas"], genC2Figure),
  gab("circonscrit_concourantes_tpl_egalite", "circonscrit_concourantes", 2, "Sur la médiatrice : à égale distance des extrémités.", ["cercle_circonscrit", "concourantes", "template"], genC2Egalite),
  gab("circonscrit_concourantes_tpl_longueur", "circonscrit_concourantes", 2, "Les trois distances au centre sont égales.", ["cercle_circonscrit", "concourantes", "template"], genC2Longueur),

  gab("circonscrit_concourantes_tpl_chaine", "circonscrit_concourantes", 3, "Une égalité, puis une autre : elles s’enchaînent.", ["cercle_circonscrit", "concourantes", "template"], genC3Chaine),
  gab("circonscrit_concourantes_tpl_test", "circonscrit_concourantes", 3, "Compare les distances deux à deux.", ["cercle_circonscrit", "concourantes", "template"], genC3Test),
  gab("circonscrit_concourantes_tpl_somme", "circonscrit_concourantes", 3, "Les trois distances sont égales.", ["cercle_circonscrit", "concourantes", "template"], genC3Somme),
  gab("circonscrit_concourantes_tpl_situation", "circonscrit_concourantes", 3, "Égale distance : la même longueur pour les trois.", ["cercle_circonscrit", "concourantes", "template", "contexte"], genC3Situation),
  gab("circonscrit_concourantes_tpl_preuve_pas", "circonscrit_concourantes", 3, "Sur la médiatrice : à égale distance des extrémités.", ["cercle_circonscrit", "concourantes", "preuve", "template"], genC3Preuve),
  gab("circonscrit_concourantes_tpl_isocele", "circonscrit_concourantes", 3, "Deux rayons égaux font un triangle isocèle.", ["cercle_circonscrit", "concourantes", "template", "canvas"], genC3Figure),

  gab("circonscrit_concourantes_tpl_argument", "circonscrit_concourantes", 4, "La propriété de la médiatrice marche dans les deux sens.", ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"], genC4Argument),
  gab("circonscrit_concourantes_tpl_perimetre", "circonscrit_concourantes", 4, "Le triangle a deux côtés égaux.", ["cercle_circonscrit", "concourantes", "template"], genC4Perimetre),
  gab("circonscrit_concourantes_tpl_raisonnement", "circonscrit_concourantes", 4, "Une médiatrice ne parle que de deux points.", ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"], genC4Raisonnement),
  gab("circonscrit_concourantes_tpl_forcement", "circonscrit_concourantes", 4, "« Forcément » : toujours vrai, sans exception.", ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"], genC4Forcement),
  gab("circonscrit_concourantes_tpl_mesure", "circonscrit_concourantes", 4, "Les trois distances doivent être égales.", ["cercle_circonscrit", "concourantes", "template"], genC4Mesure),
  gab("circonscrit_concourantes_tpl_sans_tracer", "circonscrit_concourantes", 4, "La troisième médiatrice passe par le même point.", ["cercle_circonscrit", "concourantes", "template"], genC4SansTracer),

  gab("circonscrit_concourantes_tpl_ordre", "circonscrit_concourantes", 5, "D’abord deux égalités, puis la troisième, puis la médiatrice.", ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"], genC5Ordre),
  gab("circonscrit_concourantes_tpl_perimetres", "circonscrit_concourantes", 5, "Retrouve d’abord la distance du centre aux sommets.", ["cercle_circonscrit", "concourantes", "template"], genC5Perimetres),
  gab("circonscrit_concourantes_tpl_quatre_points", "circonscrit_concourantes", 5, "Les égalités doivent s’enchaîner par une lettre commune.", ["cercle_circonscrit", "concourantes", "template"], genC5Quatre),
  gab("circonscrit_concourantes_tpl_sens", "circonscrit_concourantes", 5, "Lis ce qui est su et ce qui est conclu.", ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"], genC5Sens),
  gab("circonscrit_concourantes_tpl_isocele_defi", "circonscrit_concourantes", 5, "Un sommet à égale distance des deux autres est sur une médiatrice.", ["cercle_circonscrit", "concourantes", "template"], genC5Isocele),
  gab("circonscrit_concourantes_tpl_compte_cercle", "circonscrit_concourantes", 5, "Compte les sommets à la bonne distance.", ["cercle_circonscrit", "concourantes", "template"], genC5CompteCercle),

  gab("circonscrit_concourantes_tpl_inegalite", "circonscrit_concourantes", 4, "Un côté ne dépasse pas la somme de deux rayons.", ["cercle_circonscrit", "concourantes", "template"], genC4Inegalite),
  gab("circonscrit_concourantes_tpl_deux_points", "circonscrit_concourantes", 4, "Chaque point de la médiatrice est à égale distance des extrémités.", ["cercle_circonscrit", "concourantes", "template"], genDeuxPoints),
  gab("circonscrit_concourantes_tpl_cas", "circonscrit_concourantes", 5, "Alignés : médiatrices parallèles. Non alignés : elles se coupent.", ["cercle_circonscrit", "concourantes", "template"], genC5Cas),
  gab("circonscrit_concourantes_tpl_variante", "circonscrit_concourantes", 5, "Change les côtés de départ : le raisonnement reste le même.", ["cercle_circonscrit", "concourantes", "preuve", "template", "qcm"], genC5Variante),

  gab("circonscrit_construire_tpl_mot", "circonscrit_construire", 2, "Circonscrit : tracé autour, par les trois sommets.", ["cercle_circonscrit", "construire", "template"], genK2Mot),
  gab("circonscrit_construire_tpl_centre", "circonscrit_construire", 2, "Le centre est là où les médiatrices se coupent.", ["cercle_circonscrit", "construire", "template"], genK2Centre),
  gab("circonscrit_construire_tpl_figure", "circonscrit_construire", 2, "Regarde si chaque sommet touche le cercle.", ["cercle_circonscrit", "construire", "template", "canvas"], genK2Figure),
  gab("circonscrit_construire_tpl_rayon", "circonscrit_construire", 2, "Du centre à un sommet : le rayon.", ["cercle_circonscrit", "construire", "template"], genK2Rayon),
  gab("circonscrit_construire_tpl_ordre", "circonscrit_construire", 2, "Médiatrices, centre, compas, cercle.", ["cercle_circonscrit", "construire", "template", "qcm"], genK2Ordre),
  gab("circonscrit_construire_tpl_vrai_faux", "circonscrit_construire", 2, "Le cercle circonscrit passe par les trois sommets.", ["cercle_circonscrit", "construire", "template", "qcm"], genK2VraiFaux),

  gab("circonscrit_construire_tpl_etape", "circonscrit_construire", 3, "Médiatrices, centre, compas, cercle.", ["cercle_circonscrit", "construire", "template"], genK3Etape),
  gab("circonscrit_construire_tpl_mesures", "circonscrit_construire", 3, "L’écart du compas est le rayon.", ["cercle_circonscrit", "construire", "template"], genK3Mesures),
  gab("circonscrit_construire_tpl_position", "circonscrit_construire", 3, "Compare la distance au rayon.", ["cercle_circonscrit", "construire", "template"], genK3Position),
  gab("circonscrit_construire_tpl_metier", "circonscrit_construire", 3, "Le centre est à égale distance des trois points.", ["cercle_circonscrit", "construire", "template", "contexte"], genK3Metier),
  gab("circonscrit_construire_tpl_verif", "circonscrit_construire", 3, "La troisième médiatrice vérifie le tracé.", ["cercle_circonscrit", "construire", "template"], genK3Verif),

  gab("circonscrit_construire_tpl_erreur", "circonscrit_construire", 4, "Centre au point de concours, compas jusqu’à un sommet.", ["cercle_circonscrit", "construire", "template", "qcm"], genK4Erreur),
  gab("circonscrit_construire_tpl_perimetre", "circonscrit_construire", 4, "Deux rayons, plus le côté.", ["cercle_circonscrit", "construire", "template"], genK4Perimetre),
  gab("circonscrit_construire_tpl_autres_points", "circonscrit_construire", 4, "Tous les points du cercle sont à la même distance du centre.", ["cercle_circonscrit", "construire", "template"], genK4Autres),
  gab("circonscrit_construire_tpl_passe_par", "circonscrit_construire", 4, "Deux points du cercle : deux rayons égaux.", ["cercle_circonscrit", "construire", "template"], genK4Passe),
  gab("circonscrit_construire_tpl_figure_calcul", "circonscrit_construire", 4, "Lis le rayon écrit sur la figure.", ["cercle_circonscrit", "construire", "template", "canvas"], genK4Figure),
  gab("circonscrit_construire_tpl_corde", "circonscrit_construire", 4, "La corde tendue est un rayon.", ["cercle_circonscrit", "construire", "template", "contexte"], genK4Corde),

  gab("circonscrit_construire_tpl_diametre", "circonscrit_construire", 4, "Un diamètre passe par le centre : c’est deux rayons.", ["cercle_circonscrit", "construire", "template"], genK4Diametre),

  gab("circonscrit_construire_tpl_programme", "circonscrit_construire", 5, "Médiatrices, centre, compas, cercle.", ["cercle_circonscrit", "construire", "template", "qcm"], genK5Programme),
  gab("circonscrit_construire_tpl_pourquoi", "circonscrit_construire", 5, "Reviens à « à égale distance ».", ["cercle_circonscrit", "construire", "template", "qcm"], genK5Pourquoi),
  gab("circonscrit_construire_tpl_calcul", "circonscrit_construire", 5, "Retrouve d’abord le rayon.", ["cercle_circonscrit", "construire", "template"], genK5Calcul),
  gab("circonscrit_construire_tpl_quatre_points", "circonscrit_construire", 5, "Tous les points du cercle sont à la même distance du centre.", ["cercle_circonscrit", "construire", "template"], genK5Quatre),
  gab("circonscrit_construire_tpl_morceau", "circonscrit_construire", 5, "Trois points du bord suffisent pour retrouver le centre.", ["cercle_circonscrit", "construire", "template", "contexte"], genK5Morceau),
  gab("circonscrit_construire_tpl_rayon_faux", "circonscrit_construire", 5, "Compare chaque distance au rayon.", ["cercle_circonscrit", "construire", "template"], genK5Rayon),
  gab("circonscrit_construire_tpl_cercles", "circonscrit_construire", 5, "Le centre d’un cercle passant par deux points est sur leur médiatrice.", ["cercle_circonscrit", "construire", "template"], genK5Cercles),
];

// `shuffle` sert aux gabarits à choix multiples ; il reste ici pour la symétrie
// avec les autres banques du niveau.
void shuffle;
