// TANGENTE À UN CERCLE, POSITION D'UNE DROITE ET D'UN CERCLE (06/11/2026).
//
// Maroc (1AC), Suisse romande (11H), Côte d'Ivoire (4e). Le BO du cycle 4
// (`docs/bo-maths-cycle4-recopie.md`) ne dit « tangente » que pour la trigonométrie, et
// celui de 6e n'en parle pas. Notion masquée, voir `lib/tutor-v4/micros-masquees.ts`.
//
// ⛔ ★1-★2 : phrase courte, sans contexte. Figures calculées. Quand la question porte sur
// la position, ou sur l'angle droit, la figure ne montre pas la réponse.

import { figureConstruction, point, surCercle, type P } from "@/lib/canvas/construction";
import { ang, cap, enDegres, entre, expliquer, fr, melange, mesure, qcm, un, UNITES } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { fabriqueInsecable } from "./outils-insecables";

const tpl = fabriqueInsecable("tangente_cercle", ["cercle", "tangente", "pythagore", "canvas"]);

const DEF_T = "la tangente à un cercle en un point T est la droite qui touche le cercle seulement en T ; elle est perpendiculaire au rayon qui arrive en T.";
const DEF_P = "on compare la distance d du centre à la droite au rayon r : si d < r, la droite coupe le cercle en deux points ; si d = r, elle est tangente ; si d > r, elle ne touche pas le cercle.";

const phrase = (debuts: readonly string[], fins: readonly string[]) => `${un(debuts)} ${un(fins)}`;

/* [rayon ou côté, côté, hypoténuse] */
const TRIPLETS: [number, number, number][] = [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [7, 24, 25], [20, 21, 29]];
const LIGNES = ["(d)", "(Δ)", "(D)", "(d₁)"];
const TROIS: [string, string, string][] = [["(d₁)", "(d₂)", "(d₃)"], ["(d)", "(d′)", "(d″)"], ["(a)", "(b)", "(c)"]];

const noms = () => {
  const O = un(["O", "O", "O", "I", "C"]);
  const [T, M] = melange(["T", "A", "B", "E", "M", "P"]);
  return { O, T, M, d: un(LIGNES) };
};

const dirTangente = (th: number): P => point(-Math.sin((th * Math.PI) / 180), Math.cos((th * Math.PI) / 180));
const decale = (p: P, u: P, k: number) => point(p.x + u.x * k, p.y + u.y * k);

/** Le cercle, la tangente en T, et le point M à la distance x de T. */
function figTangente(n: { O: string; T: string; M?: string; d?: string }, o: { r: number; x?: number; droit?: boolean; texteOT?: string; texteTM?: string; texteOM?: string; rayon?: boolean; om?: boolean; angleO?: string }) {
  const th = un([20, 65, 110, 150, 200, 250, 300, 340]);
  const u = dirTangente(th);
  const x = o.x ?? o.r * 1.3;
  // Le nom de la droite va du côté sans M : il ne se colle ni à M ni au point de contact.
  const gauche = Math.max(x * 0.9, o.r);
  const O0 = point(0, 0);
  const T0 = surCercle(O0, o.r, th);
  const pts: Record<string, P> = { [n.O]: O0, [n.T]: T0, y1: decale(T0, u, -gauche), y2: decale(T0, u, x * 1.25), y3: decale(T0, u, -gauche * 0.4) };
  if (n.M) pts[n.M] = decale(T0, u, x);
  return figureConstruction(
    pts,
    {
      cercles: [{ centre: n.O, rayon: o.r, couleur: "#2563eb" }],
      droites: [{ a: "y1", b: "y2" }],
      segments: [
        ...(n.d ? [{ a: "y1", b: "y3", couleur: "#2563eb", texte: n.d, sansTrait: true }] : []),
        ...(o.rayon === false ? [] : [{ a: n.O, b: n.T, couleur: "#dc2626", texte: o.texteOT }]),
        ...(n.M && o.texteTM ? [{ a: n.T, b: n.M, texte: o.texteTM }] : []),
        ...(n.M && o.om ? [{ a: n.O, b: n.M, couleur: "#64748b", texte: o.texteOM }] : []),
      ],
      angles: [
        ...(o.droit ? [{ sommet: n.T, de: n.O, vers: n.M ?? "y2", droit: true }] : []),
        ...(o.angleO && n.M ? [{ sommet: n.O, de: n.T, vers: n.M, texte: o.angleO }] : []),
      ],
      description: "Un cercle, son centre, et une droite qui le touche en un point",
    },
    ["y1", "y2", "y3"],
  );
}

/** Trois droites par T, dont une seule est perpendiculaire au rayon. */
function figTroisPassantParT(n: { O: string; T: string }, r: number, noms3: [string, string, string]) {
  const th = un([30, 80, 130, 210, 260, 320]);
  const T0 = surCercle(point(0, 0), r, th);
  const ecarts = melange([0, un([28, 34, 40]), -un([28, 34, 40])]);
  const pts: Record<string, P> = { [n.O]: point(0, 0), [n.T]: T0 };
  const droites: { a: string; b: string }[] = [];
  const segments: { a: string; b: string; couleur?: string; texte?: string; sansTrait?: boolean }[] = [{ a: n.O, b: n.T, couleur: "#dc2626" }];
  ecarts.forEach((e, i) => {
    const u = dirTangente(th + e);
    pts[`p${i}`] = decale(T0, u, -r * 1.2);
    pts[`q${i}`] = decale(T0, u, r * 1.5);
    pts[`m${i}`] = decale(T0, u, r * 1.25);
    droites.push({ a: `p${i}`, b: `q${i}` });
    segments.push({ a: `m${i}`, b: `q${i}`, couleur: "#2563eb", texte: noms3[i], sansTrait: true });
  });
  return figureConstruction(pts, { cercles: [{ centre: n.O, rayon: r, couleur: "#2563eb" }], droites, segments, description: "Un cercle et trois droites passant par un de ses points" }, Object.keys(pts).filter((k) => /^[pqm]\d$/.test(k)));
}

/** Trois droites autour du cercle : une sécante, une tangente, une extérieure, dans un ordre tiré. */
function figTroisPositions(O: string, r: number, noms3: [string, string, string]) {
  const ecarts = melange([r * 0.45, r, r * 1.4]);
  const depart = un([10, 40, 75]);
  const pts: Record<string, P> = { [O]: point(0, 0) };
  const droites: { a: string; b: string }[] = [];
  const segments: { a: string; b: string; couleur?: string; texte?: string; sansTrait?: boolean }[] = [];
  ecarts.forEach((d, i) => {
    const th = depart + i * 120;
    const pied = surCercle(point(0, 0), d, th);
    const u = dirTangente(th);
    pts[`p${i}`] = decale(pied, u, -r * 1.6);
    pts[`q${i}`] = decale(pied, u, r * 1.6);
    pts[`m${i}`] = decale(pied, u, r * 1.35);
    droites.push({ a: `p${i}`, b: `q${i}` });
    segments.push({ a: `m${i}`, b: `q${i}`, couleur: "#2563eb", texte: noms3[i], sansTrait: true });
  });
  return figureConstruction(pts, { cercles: [{ centre: O, rayon: r, couleur: "#dc2626" }], droites, segments, description: "Un cercle et trois droites" }, Object.keys(pts).filter((k) => k !== O));
}

/** O, une droite, le pied H et un point A : sans le cercle, pour ne pas donner la position. */
function figPied(n: { O: string; H: string; A: string; d: string }, h: number, x: number, o?: { rayon?: number; texte?: string }) {
  const pts: Record<string, P> = { [n.O]: point(0, h), [n.H]: point(0, 0), [n.A]: point(x, 0), x1: point(-1.2 * x, 0), x2: point(1.4 * x, 0), x3: point(1.2 * x, 0) };
  return figureConstruction(
    pts,
    {
      droites: [{ a: "x1", b: "x2" }],
      segments: [{ a: "x3", b: "x2", couleur: "#2563eb", texte: n.d, sansTrait: true }, { a: n.O, b: n.H, couleur: "#64748b" }, { a: n.O, b: n.A, couleur: "#64748b", texte: o?.texte }],
      cercles: o?.rayon ? [{ centre: n.O, rayon: o.rayon, couleur: "#2563eb" }] : [],
      angles: [{ sommet: n.H, de: n.O, vers: n.A, droit: true }],
      description: "Un centre, une droite et le pied de la perpendiculaire",
    },
    ["x1", "x2", "x3"],
  );
}

const SEC = (d: string) => `${d} coupe le cercle en deux points`;
const TAN = (d: string) => `${d} est tangente au cercle`;
const EXT = (d: string) => `${d} ne touche pas le cercle`;
const CENTRE = (d: string) => `${d} passe par le centre du cercle`;
const position = (dist: number, r: number, d: string) => (dist < r ? SEC(d) : dist === r ? TAN(d) : EXT(d));
const quatre = (d: string) => [SEC(d), TAN(d), EXT(d), CENTRE(d)];

/** Une distance tirée pour que les trois positions soient aussi fréquentes. */
const distanceEtRayon = () => {
  const r = entre(3, 20);
  const cas = un([-1, 0, 1]);
  return { r, dist: cas === 0 ? r : cas < 0 ? entre(1, r - 1) : r + entre(1, 8) };
};

/* Un objet rond, et une ligne droite qui le frôle. */
const RONDS: { o: string; trait: string; u: string; k: number }[] = [
  { o: "Une poulie", trait: "une courroie tendue", u: "cm", k: 2 },
  { o: "Un rond-point", trait: "une route droite", u: "m", k: 5 },
  { o: "Un bassin rond", trait: "une allée droite", u: "m", k: 1 },
  { o: "Un silo, vu de dessus,", trait: "un câble tendu", u: "m", k: 1 },
  { o: "Une tour ronde, vue de dessus,", trait: "un chemin droit", u: "m", k: 2 },
  { o: "Un kiosque", trait: "une barrière droite", u: "dm", k: 5 },
  { o: "Un tronc d’arbre, vu de dessus,", trait: "une corde tendue", u: "cm", k: 5 },
  { o: "Un manège", trait: "une piste droite", u: "m", k: 2 },
  { o: "Une piscine ronde", trait: "une planche", u: "dm", k: 2 },
  { o: "Un tonneau, vu de dessus,", trait: "une règle", u: "cm", k: 5 },
  { o: "Un îlot presque rond", trait: "la route d’un bateau", u: "m", k: 50 },
  { o: "Le cratère Dolomieu, presque rond,", trait: "un sentier droit", u: "m", k: 20 },
];

/* Ce qui agit autour de soi jusqu'à une certaine distance, et une ligne droite. */
const ZONES: { em: string; agit: string; de: string; trait: string; u: string; R: [number, number] }[] = [
  { em: "Un arroseur", agit: "arrose jusqu’à", de: "de l’arroseur", trait: "une allée droite", u: "m", R: [3, 15] },
  { em: "Une antenne Wi-Fi", agit: "capte jusqu’à", de: "de l’antenne", trait: "un couloir droit", u: "m", R: [10, 40] },
  { em: "Un phare", agit: "éclaire jusqu’à", de: "du phare", trait: "la route droite d’un bateau", u: "km", R: [8, 30] },
  { em: "Un radar", agit: "détecte jusqu’à", de: "du radar", trait: "la route droite d’un avion", u: "km", R: [20, 90] },
  { em: "Un lampadaire", agit: "éclaire jusqu’à", de: "du lampadaire", trait: "un trottoir droit", u: "m", R: [5, 18] },
  { em: "Une chèvre attachée à un piquet", agit: "broute jusqu’à", de: "du piquet", trait: "une clôture droite", u: "m", R: [3, 12] },
  { em: "Une sirène", agit: "s’entend jusqu’à", de: "de la sirène", trait: "une route droite", u: "km", R: [2, 9] },
  { em: "Un drone", agit: "vole jusqu’à", de: "du point de départ du drone", trait: "une voie ferrée droite", u: "km", R: [2, 12] },
  { em: "Un robot tondeuse", agit: "tond jusqu’à", de: "de la base du robot", trait: "une haie droite", u: "m", R: [8, 30] },
  { em: "Un haut-parleur", agit: "porte jusqu’à", de: "du haut-parleur", trait: "une tribune droite", u: "m", R: [15, 60] },
  { em: "Une balise de mer", agit: "se voit jusqu’à", de: "de la balise", trait: "la route droite d’un voilier", u: "km", R: [3, 15] },
  { em: "Un talkie-walkie", agit: "porte jusqu’à", de: "du talkie-walkie", trait: "un sentier droit", u: "km", R: [2, 8] },
];

/** « Un phare » → « Le phare » : on reparle de ce qu'on vient de nommer. */
const defini = (x: string) => x.replace(/^Une ([aeiouéh])/, "L’$1").replace(/^Un ([aeiouéh])(?!aut)/, "L’$1").replace(/^Une /, "La ").replace(/^Un /, "Le ");

const POINTS_ZONE = ["Seulement une portion", "Un seul point", "Aucun point", "Tous les points"];

export const tangenteCercleBank = [
  /* ===== LA TANGENTE ET LE RAYON ===== */

  tpl("tangente_rayon", 1, 1, "La tangente est perpendiculaire au rayon qui arrive au point de contact.", () => {
    const n = noms();
    const text = `${un([`${n.d} est tangente en ${n.T} au cercle de centre ${n.O}, et ${n.M} est un autre point de ${n.d}.`, `Le cercle de centre ${n.O} a pour tangente ${n.d} en ${n.T}, et ${n.M} est un autre point de ${n.d}.`, `${n.M} est un point de ${n.d}, la tangente en ${n.T} au cercle de centre ${n.O}.`])} ${un([`Que vaut ${ang(n.O, n.T, n.M)} ?`, `Quelle est la mesure de ${ang(n.O, n.T, n.M)} ?`, `Combien mesure ${ang(n.O, n.T, n.M)} ?`, `Donne la mesure de ${ang(n.O, n.T, n.M)}.`])}`;
    return { text, format: "short", expected: enDegres(90), comparator: "number_equal", canvas: figTangente(n, { r: 4, x: 5 }), explanation: expliquer(DEF_T, `(${n.O}${n.T}) est le rayon qui arrive en ${n.T}, et ${n.M} est sur la tangente.`, "c’est un angle droit.", `${ang(n.O, n.T, n.M)} mesure 90°.`) };
  }),

  tpl("tangente_rayon", 2, 1, "Une tangente et le rayon au point de contact font un angle droit.", () => {
    const n = noms();
    const r = `(${n.O}${n.T})`;
    const juste = `${n.d} et ${r} sont perpendiculaires`;
    const text = `${un([`${n.d} est tangente en ${n.T} au cercle de centre ${n.O}.`, `Le cercle de centre ${n.O} a pour tangente ${n.d} en ${n.T}.`, `Un cercle a pour centre ${n.O}, et ${n.d} lui est tangente en ${n.T}.`])} ${un([`Que peut-on dire de ${n.d} et ${r} ?`, `Quelle est la position de ${n.d} par rapport à ${r} ?`, "Laquelle de ces phrases est juste ?", `Que sait-on de ${n.d} et ${r} ?`])}`;
    return { text, format: "qcm", choices: qcm(juste, [`${n.d} et ${r} sont parallèles`, `${n.d} et ${r} sont confondues`, `${n.d} coupe ${r} en ${n.O}`]), expected: [juste], comparator: "mcq_exact", canvas: figTangente({ ...n, M: undefined }, { r: 4 }), explanation: expliquer(DEF_T, `${r} est le rayon qui arrive au point de contact.`, "la tangente lui est perpendiculaire.", `${juste}.`) };
  }),

  tpl("tangente_rayon", 3, 1, "Tangente : un seul point commun avec le cercle.", () => {
    const n = noms();
    const juste = "Un seul point";
    const text = un([
      `${n.d} est tangente au cercle de centre ${n.O}. Combien a-t-elle de points communs avec ce cercle ?`,
      `Combien de points communs ont un cercle et une tangente ${n.d} à ce cercle ?`,
      `La droite ${n.d} est tangente en ${n.T} à un cercle. Combien de points partage-t-elle avec lui ?`,
      `En combien de points une tangente ${n.d} touche-t-elle son cercle ?`,
      `Le cercle de centre ${n.O} a pour tangente ${n.d}. En combien de points se touchent-ils ?`,
      `${n.d} est tangente en ${n.T} au cercle de centre ${n.O}. En dehors de ${n.T}, ${n.d} touche-t-elle encore le cercle ? Combien de points communs en tout ?`,
    ]);
    return { text, format: "qcm", choices: qcm(juste, ["Aucun point", "Deux points", "Trois points"]), expected: [juste], comparator: "mcq_exact", canvas: figTangente({ ...n, M: undefined }, { r: 4 }), explanation: expliquer(DEF_T, "une tangente touche le cercle sans le traverser.", "il n’y a que le point de contact.", "un seul point commun.") };
  }),

  tpl("tangente_rayon", 4, 1, "Cherche la droite qui fait un angle droit avec le rayon.", () => {
    const { O, T } = noms();
    const trois = un(TROIS);
    const canvas = figTroisPassantParT({ O, T }, 4, trois);
    const text = phrase(
      [`Sur la figure, trois droites passent par ${T}, un point du cercle de centre ${O}.`, `Voici un cercle de centre ${O}, et trois droites passant par ${T}.`, `Regarde la figure : le rayon [${O}${T}] est en rouge.`, `Trois droites passent par le point ${T} du cercle de centre ${O}.`],
      [`Laquelle est tangente au cercle en ${T} ?`, `Quelle droite est la tangente en ${T} ?`, `Laquelle de ces droites est la tangente au cercle en ${T} ?`],
    );
    const juste = trois[(canvas.segments ?? []).filter((s) => s.sansTrait).findIndex((s) => {
      const [a, b] = [canvas.points.find((p) => p.id === s.a)!, canvas.points.find((p) => p.id === s.b)!];
      const c = canvas.points.find((p) => p.id === O)!;
      const t = canvas.points.find((p) => p.id === T)!;
      return Math.abs((a.x - b.x) * (c.x - t.x) + (a.y - b.y) * (c.y - t.y)) < 1e-9;
    })];
    return { text, format: "qcm", choices: melange([...trois]), expected: [juste], comparator: "mcq_exact", canvas, explanation: expliquer(DEF_T, `la tangente est perpendiculaire au rayon [${O}${T}].`, "une seule droite fait un angle droit avec lui.", `c’est ${juste}.`) };
  }),

  tpl("tangente_rayon", 5, 2, "Le triangle est rectangle au point de contact : l’hypoténuse part du centre.", () => {
    const n = noms();
    const u = un(UNITES);
    const [r, x, h] = un(TRIPLETS);
    const text = `${un([`${n.d} est tangente en ${n.T} au cercle de centre ${n.O}, et ${n.M} est sur ${n.d}.`, `${n.M} est un point de ${n.d}, tangente en ${n.T} au cercle de centre ${n.O}.`, `Le cercle de centre ${n.O} a pour tangente ${n.d} en ${n.T}, et ${n.M} est sur ${n.d}.`])} ${un([`On a ${n.O}${n.T} = ${r} ${u} et ${n.T}${n.M} = ${x} ${u}.`, `On sait que ${n.O}${n.T} = ${r} ${u} et ${n.T}${n.M} = ${x} ${u}.`])} ${un([`Calcule ${n.O}${n.M}.`, `Quelle est la longueur ${n.O}${n.M} ?`, `Que vaut ${n.O}${n.M} ?`])}`;
    return { text, format: "short", expected: mesure(h, u), comparator: "number_equal", canvas: figTangente(n, { r, x, droit: true, om: true }), explanation: expliquer(DEF_T, `le triangle ${n.O}${n.T}${n.M} est rectangle en ${n.T} : Pythagore.`, `${r}² + ${x}² = ${r * r} + ${x * x} = ${h * h}.`, `${n.O}${n.M} = ${h} ${u}.`) };
  }),

  tpl("tangente_rayon", 6, 2, "Pythagore : le côté cherché est un côté de l’angle droit, on soustrait.", () => {
    const n = noms();
    const u = un(UNITES);
    const [r, x, h] = un(TRIPLETS);
    const text = `${un([`${n.d} est tangente en ${n.T} au cercle de centre ${n.O}, et ${n.M} est sur ${n.d}.`, `${n.M} est un point de ${n.d}, tangente en ${n.T} au cercle de centre ${n.O}.`, `Le cercle de centre ${n.O} a pour tangente ${n.d} en ${n.T}, et ${n.M} est sur ${n.d}.`])} ${un([`On a ${n.O}${n.T} = ${r} ${u} et ${n.O}${n.M} = ${h} ${u}.`, `On sait que ${n.O}${n.M} = ${h} ${u} et ${n.O}${n.T} = ${r} ${u}.`])} ${un([`Calcule ${n.T}${n.M}.`, `Quelle est la longueur ${n.T}${n.M} ?`, `Que vaut ${n.T}${n.M} ?`])}`;
    return { text, format: "short", expected: mesure(x, u), comparator: "number_equal", canvas: figTangente(n, { r, x, droit: true, om: true }), explanation: expliquer(DEF_T, `le triangle ${n.O}${n.T}${n.M} est rectangle en ${n.T} : Pythagore.`, `${h}² − ${r}² = ${h * h} − ${r * r} = ${x * x}.`, `${n.T}${n.M} = ${x} ${u}.`) };
  }),

  tpl("tangente_rayon", 7, 2, "Le rayon est un côté de l’angle droit : Pythagore, puis on soustrait.", () => {
    const n = noms();
    const u = un(UNITES);
    const [r, x, h] = un(TRIPLETS);
    const text = `${un([`${n.d} est tangente en ${n.T} au cercle de centre ${n.O}, et ${n.M} est sur ${n.d}.`, `${n.M} est un point de ${n.d}, tangente en ${n.T} au cercle de centre ${n.O}.`, `Le cercle de centre ${n.O} a pour tangente ${n.d} en ${n.T}, et ${n.M} est sur ${n.d}.`])} ${un([`On a ${n.T}${n.M} = ${x} ${u} et ${n.O}${n.M} = ${h} ${u}.`, `On sait que ${n.O}${n.M} = ${h} ${u} et ${n.T}${n.M} = ${x} ${u}.`])} ${un(["Quel est le rayon du cercle ?", "Calcule le rayon du cercle.", "Que vaut le rayon de ce cercle ?"])}`;
    return { text, format: "short", expected: mesure(r, u), comparator: "number_equal", canvas: figTangente(n, { r, x, droit: true, om: true }), explanation: expliquer(DEF_T, `le triangle ${n.O}${n.T}${n.M} est rectangle en ${n.T} : Pythagore.`, `${h}² − ${x}² = ${h * h} − ${x * x} = ${r * r}.`, `le rayon vaut ${r} ${u}.`) };
  }),

  tpl("tangente_rayon", 8, 2, "La droite est tangente si le triangle est rectangle au point du cercle : vérifie avec Pythagore.", () => {
    const n = noms();
    const u = un(UNITES);
    const [r, x, h] = un(TRIPLETS);
    const vrai = Math.random() < 0.5;
    const om = vrai ? h : h + un([-1, 1, 2]);
    const cosT = (r * r + x * x - om * om) / (2 * r * x);
    const sinT = Math.sqrt(1 - cosT * cosT);
    // O à l'origine, T sur l'axe ; M donné par les trois longueurs, droite ou non.
    const pO = point(0, 0);
    const pT = point(r, 0);
    const pM = point(r - x * cosT, x * sinT);
    const oui = `Oui, car le triangle ${n.O}${n.T}${n.M} est rectangle en ${n.T}`;
    const non = `Non, car le triangle ${n.O}${n.T}${n.M} n’est pas rectangle en ${n.T}`;
    const juste = vrai ? oui : non;
    const text = `${un([`${n.T} est un point du cercle de centre ${n.O}, et ${n.M} un point extérieur.`, `Le cercle de centre ${n.O} passe par ${n.T}, et ${n.M} est en dehors du cercle.`])} ${un([`On a ${n.O}${n.T} = ${r} ${u}, ${n.T}${n.M} = ${x} ${u} et ${n.O}${n.M} = ${om} ${u}.`, `On mesure ${n.O}${n.T} = ${r} ${u}, ${n.T}${n.M} = ${x} ${u} et ${n.O}${n.M} = ${om} ${u}.`])} ${un([`(${n.T}${n.M}) est-elle tangente au cercle en ${n.T} ?`, `La droite (${n.T}${n.M}) est-elle tangente au cercle ?`, `Peut-on dire que (${n.T}${n.M}) est tangente au cercle en ${n.T} ?`])}`;
    const canvas = figureConstruction({ [n.O]: pO, [n.T]: pT, [n.M]: pM }, { cercles: [{ centre: n.O, rayon: r, couleur: "#2563eb" }], droites: [{ a: n.T, b: n.M }], segments: [{ a: n.O, b: n.T, couleur: "#dc2626" }, { a: n.O, b: n.M, couleur: "#64748b" }], description: "Un cercle, un rayon et une droite passant par son extrémité" });
    return { text, format: "qcm", choices: qcm(juste, [vrai ? non : oui, `Oui, car ${n.T} est sur le cercle`, "On ne peut pas savoir"]), expected: [juste], comparator: "mcq_exact", canvas, explanation: expliquer(DEF_T, `on compare ${n.O}${n.M}² à ${n.O}${n.T}² + ${n.T}${n.M}².`, `${om}² = ${om * om} et ${r}² + ${x}² = ${r * r + x * x}.`, `${juste}.`) };
  }),

  tpl("tangente_rayon", 9, 3, "Le rayon, la ligne droite et la distance au centre forment un triangle rectangle.", () => {
    const s = un(RONDS);
    const [r0, x0, h0] = un(TRIPLETS);
    const [r, x, h] = [r0 * s.k, x0 * s.k, h0 * s.k];
    const text = phrase(
      [
        `${s.o} forme un cercle de rayon ${fr(r)} ${s.u}. ${cap(s.trait)} touche ce cercle en un seul point T, et passe par un point M situé à ${fr(h)} ${s.u} du centre.`,
        `${cap(s.trait)} touche en un seul point T le cercle de rayon ${fr(r)} ${s.u} que forme ${s.o.charAt(0).toLowerCase() + s.o.slice(1).replace(/,$/, "")}. Le point M de cette ligne est à ${fr(h)} ${s.u} du centre.`,
      ],
      ["Quelle est la distance entre M et T ?", "À quelle distance de T se trouve M ?", "Quelle longueur sépare M de T ?", "Calcule la distance MT."],
    );
    return { text, format: "short", expected: mesure(x, s.u), comparator: "number_equal", canvas: figTangente({ O: "O", T: "T", M: "M" }, { r: r0, x: x0, droit: true, om: true, texteOT: r0 / x0 >= 0.5 ? `${fr(r)} ${s.u}` : undefined }), explanation: expliquer(DEF_T, "le triangle formé par le centre, T et M est rectangle en T : Pythagore.", `${fr(h)}² − ${fr(r)}² = ${fr(x * x)}.`, `la distance est de ${fr(x)} ${s.u}.`) };
  }),

  tpl("tangente_rayon", 10, 3, "Le segment qui part du centre est l’hypoténuse.", () => {
    const s = un(RONDS);
    const [r0, x0, h0] = un(TRIPLETS);
    const [r, x, h] = [r0 * s.k, x0 * s.k, h0 * s.k];
    const text = phrase(
      [
        `${s.o} forme un cercle de rayon ${fr(r)} ${s.u}. ${cap(s.trait)} touche ce cercle en un seul point T. Un point M de cette ligne est à ${fr(x)} ${s.u} de T.`,
        `${cap(s.trait)} touche en un seul point T le cercle de rayon ${fr(r)} ${s.u} que forme ${s.o.charAt(0).toLowerCase() + s.o.slice(1).replace(/,$/, "")}. On place M sur cette ligne, à ${fr(x)} ${s.u} de T.`,
      ],
      ["À quelle distance du centre se trouve M ?", "Quelle est la distance de M au centre ?", "Quelle longueur sépare M du centre ?", "Calcule la distance du centre à M."],
    );
    return { text, format: "short", expected: mesure(h, s.u), comparator: "number_equal", canvas: figTangente({ O: "O", T: "T", M: "M" }, { r: r0, x: x0, droit: true, om: true, texteOT: r0 / x0 >= 0.5 ? `${fr(r)} ${s.u}` : undefined }), explanation: expliquer(DEF_T, "le triangle formé par le centre, T et M est rectangle en T : Pythagore.", `${fr(r)}² + ${fr(x)}² = ${fr(h * h)}.`, `la distance est de ${fr(h)} ${s.u}.`) };
  }),

  tpl("tangente_rayon", 11, 3, "L’angle en T est droit : les deux autres angles font 90° ensemble.", () => {
    const n = noms();
    const a = entre(22, 68);
    const r = 4;
    const x = r * Math.tan((a * Math.PI) / 180);
    const cherche = ang(n.T, n.M, n.O);
    const text = `${un([`${n.d} est tangente en ${n.T} au cercle de centre ${n.O}, et ${n.M} est sur ${n.d}.`, `${n.M} est un point de ${n.d}, tangente en ${n.T} au cercle de centre ${n.O}.`, `Le cercle de centre ${n.O} a pour tangente ${n.d} en ${n.T}, et ${n.M} est sur ${n.d}.`])} ${un([`On a ${ang(n.T, n.O, n.M)} = ${a}°.`, `On mesure ${ang(n.T, n.O, n.M)} = ${a}°.`])} ${un([`Que vaut ${cherche} ?`, `Quelle est la mesure de ${cherche} ?`, `Combien mesure ${cherche} ?`])}`;
    return { text, format: "short", expected: enDegres(90 - a), comparator: "number_equal", canvas: figTangente(n, { r, x, om: true, droit: true, angleO: `${a}°` }), explanation: expliquer(DEF_T, `le triangle ${n.O}${n.T}${n.M} est rectangle en ${n.T}.`, `90° − ${a}° = ${90 - a}°.`, `${cherche} = ${90 - a}°.`) };
  }),

  tpl("tangente_rayon", 12, 3, "Deux tangentes issues d’un même point ont la même longueur.", () => {
    const n = noms();
    const S = un(["S", "U", "V"].filter((x) => ![n.O, n.T, n.M].includes(x)));
    const u = un(UNITES);
    const [r, x, h] = un(TRIPLETS);
    const per = 2 * (r + x);
    const nom = `${n.O}${n.T}${n.M}${S}`;
    const text = `${un([`Depuis un point ${n.M}, deux droites sont tangentes en ${n.T} et en ${S} au cercle de centre ${n.O}.`, `Le cercle de centre ${n.O} a deux tangentes passant par ${n.M}, qui le touchent en ${n.T} et en ${S}.`, `Les droites (${n.M}${n.T}) et (${n.M}${S}) sont tangentes au cercle de centre ${n.O}, en ${n.T} et en ${S}.`])} ${un([`On a ${n.O}${n.T} = ${r} ${u} et ${n.O}${n.M} = ${h} ${u}.`, `On sait que ${n.O}${n.M} = ${h} ${u} et ${n.O}${n.T} = ${r} ${u}.`])} ${un([`Quel est le périmètre du quadrilatère ${nom} ?`, `Calcule le périmètre du quadrilatère ${nom}.`, `Que vaut le périmètre de ${nom} ?`])}`;
    // T et S, symétriques par rapport à (OM) : O à l'origine, M sur l'axe.
    const yT = (r * x) / h;
    const xT = (r * r) / h;
    const canvas = figureConstruction(
      { [n.O]: point(0, 0), [n.M]: point(h, 0), [n.T]: point(xT, yT), [S]: point(xT, -yT) },
      { cercles: [{ centre: n.O, rayon: r, couleur: "#2563eb" }], polygones: [{ sommets: [n.O, n.T, n.M, S] }], angles: [{ sommet: n.T, de: n.O, vers: n.M, droit: true }, { sommet: S, de: n.O, vers: n.M, droit: true }], description: "Un cercle et les deux tangentes issues d’un point extérieur" },
    );
    return { text, format: "short", expected: mesure(per, u), comparator: "number_equal", canvas, explanation: expliquer(DEF_T, `Pythagore dans ${n.O}${n.T}${n.M} donne ${n.T}${n.M}, et les deux triangles rectangles sont symétriques par rapport à (${n.O}${n.M}).`, `${n.T}${n.M} = ${x}, puis 2 × (${r} + ${x}) = ${per}.`, `le périmètre vaut ${per} ${u}.`) };
  }),

  /* ===== LA POSITION D'UNE DROITE ET D'UN CERCLE ===== */

  tpl("cercle_droite_position", 1, 1, "Compare la distance du centre à la droite et le rayon.", () => {
    const n = noms();
    const u = un(UNITES);
    const { r, dist } = distanceEtRayon();
    const text = phrase(
      [
        `Un cercle de centre ${n.O} a pour rayon ${r} ${u}. La distance de ${n.O} à ${n.d} vaut ${dist} ${u}.`,
        `La distance de ${n.O} à ${n.d} vaut ${dist} ${u}. Le cercle de centre ${n.O} a pour rayon ${r} ${u}.`,
        `Le cercle de centre ${n.O} a un rayon de ${r} ${u}, et ${n.O} est à ${dist} ${u} de ${n.d}.`,
        `Le point ${n.O} est à ${dist} ${u} de ${n.d}. On trace le cercle de centre ${n.O} et de rayon ${r} ${u}.`,
      ],
      ["Quelle phrase est juste ?", `Quelle est la position de ${n.d} par rapport au cercle ?`, "Que peut-on dire de la droite et du cercle ?", `Que fait ${n.d} avec ce cercle ?`],
    );
    const juste = position(dist, r, n.d);
    return { text, format: "qcm", choices: qcm(juste, quatre(n.d)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_P, "on compare les deux longueurs.", `distance ${dist} et rayon ${r}.`, `${juste}.`) };
  }),

  tpl("cercle_droite_position", 2, 1, "Distance plus petite que le rayon : 2 points. Égale : 1 point. Plus grande : 0 point.", () => {
    const n = noms();
    const u = un(UNITES);
    const { r, dist } = distanceEtRayon();
    const nb = dist < r ? 2 : dist === r ? 1 : 0;
    const text = phrase(
      [
        `Un cercle de centre ${n.O} a pour rayon ${r} ${u}. La distance de ${n.O} à ${n.d} vaut ${dist} ${u}.`,
        `La distance de ${n.O} à ${n.d} vaut ${dist} ${u}. Le cercle de centre ${n.O} a pour rayon ${r} ${u}.`,
        `Le cercle de centre ${n.O} a un rayon de ${r} ${u}, et ${n.O} est à ${dist} ${u} de ${n.d}.`,
      ],
      [`Combien de points communs ont ${n.d} et le cercle ?`, `En combien de points ${n.d} touche-t-elle le cercle ?`, `Combien ${n.d} a-t-elle de points communs avec le cercle ?`, "Combien de points communs y a-t-il ? Écris un nombre."],
    );
    return { text, format: "short", expected: [String(nb)], comparator: "number_equal", explanation: expliquer(DEF_P, "on compare les deux longueurs.", `distance ${dist} et rayon ${r}.`, `il y a ${nb} point${nb > 1 ? "s" : ""} commun${nb > 1 ? "s" : ""}.`) };
  }),

  tpl("cercle_droite_position", 3, 1, "Une tangente est à une distance du centre égale au rayon.", () => {
    const n = noms();
    const u = un(UNITES);
    const v = entre(2, 40);
    const versDistance = Math.random() < 0.5;
    const text = versDistance
      ? phrase(
          [`${n.d} est tangente au cercle de centre ${n.O} et de rayon ${v} ${u}.`, `Un cercle de centre ${n.O} a pour rayon ${v} ${u}, et ${n.d} lui est tangente.`, `Le cercle de centre ${n.O} a un rayon de ${v} ${u}. La droite ${n.d} lui est tangente.`],
          [`Quelle est la distance de ${n.O} à ${n.d} ?`, `À quelle distance de ${n.d} se trouve ${n.O} ?`, `Que vaut la distance de ${n.O} à ${n.d} ?`],
        )
      : phrase(
          [`${n.d} est tangente au cercle de centre ${n.O}. La distance de ${n.O} à ${n.d} vaut ${v} ${u}.`, `Le point ${n.O} est à ${v} ${u} de ${n.d}, et ${n.d} est tangente au cercle de centre ${n.O}.`, `La distance de ${n.O} à ${n.d} vaut ${v} ${u}, et ${n.d} est tangente au cercle de centre ${n.O}.`],
          ["Quel est le rayon du cercle ?", "Que vaut le rayon de ce cercle ?", "Combien mesure le rayon du cercle ?"],
        );
    return { text, format: "short", expected: mesure(v, u), comparator: "number_equal", canvas: figTangente({ O: n.O, T: n.T, d: n.d }, { r: 4, droit: true }), explanation: expliquer(DEF_P, "la droite est tangente : la distance est égale au rayon.", `distance = rayon = ${v}.`, versDistance ? `la distance vaut ${v} ${u}.` : `le rayon vaut ${v} ${u}.`) };
  }),

  tpl("cercle_droite_position", 4, 1, "Regarde combien de fois chaque droite touche le cercle.", () => {
    const { O } = noms();
    const trois = un(TROIS);
    const canvas = figTroisPositions(O, 4, trois);
    const cible = un([
      { q: `Laquelle est tangente au cercle ?`, d: 1 },
      { q: `Quelle droite touche le cercle en un seul point ?`, d: 1 },
      { q: `Laquelle coupe le cercle en deux points ?`, d: 0 },
      { q: `Quelle droite traverse le cercle ?`, d: 0 },
      { q: `Laquelle ne touche pas le cercle ?`, d: 2 },
      { q: `Quelle droite reste à l’extérieur du cercle ?`, d: 2 },
    ]);
    const c0 = canvas.points.find((p) => p.id === O)!;
    const distances = (canvas.segments ?? []).map((s) => {
      const a = canvas.points.find((p) => p.id === s.a)!;
      const b = canvas.points.find((p) => p.id === s.b)!;
      return Math.abs((b.x - a.x) * (a.y - c0.y) - (b.y - a.y) * (a.x - c0.x)) / Math.hypot(b.x - a.x, b.y - a.y);
    });
    const ordre = [...distances].sort((x, y) => x - y);
    const juste = trois[distances.indexOf(ordre[cible.d])];
    const text = `${un([`Regarde le cercle de centre ${O} et les trois droites.`, `Voici un cercle de centre ${O} et trois droites.`, "Sur la figure, trois droites sont tracées autour d’un cercle."])} ${cible.q}`;
    return { text, format: "qcm", choices: melange([...trois]), expected: [juste], comparator: "mcq_exact", canvas, explanation: expliquer(DEF_P, "on regarde les points communs de chaque droite avec le cercle.", "deux points : elle le coupe ; un point : elle est tangente ; aucun : elle reste à l’extérieur.", `c’est ${juste}.`) };
  }),

  tpl("cercle_droite_position", 5, 2, "Le rayon est la moitié du diamètre : c’est lui qu’on compare à la distance.", () => {
    const n = noms();
    const u = un(UNITES);
    const r = entre(3, 20);
    const dist = un([-1, 0, 1]) === 0 ? r : un([r - entre(1, Math.min(2, r - 1)), r + entre(1, 3), r]);
    const D = 2 * r;
    const text = phrase(
      [
        `Un cercle de centre ${n.O} a pour diamètre ${D} ${u}. La distance de ${n.O} à ${n.d} vaut ${dist} ${u}.`,
        `La distance de ${n.O} à ${n.d} vaut ${dist} ${u}. Le cercle de centre ${n.O} a un diamètre de ${D} ${u}.`,
        `Le diamètre du cercle de centre ${n.O} mesure ${D} ${u}, et ${n.O} est à ${dist} ${u} de ${n.d}.`,
      ],
      ["Quelle phrase est juste ?", `Quelle est la position de ${n.d} par rapport au cercle ?`, "Que peut-on dire de la droite et du cercle ?", `Que fait ${n.d} avec ce cercle ?`],
    );
    const juste = position(dist, r, n.d);
    return { text, format: "qcm", choices: qcm(juste, quatre(n.d)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_P, "le rayon vaut la moitié du diamètre.", `${D} ÷ 2 = ${r} ; distance ${dist}.`, `${juste}.`) };
  }),

  tpl("cercle_droite_position", 6, 2, "Pour couper : rayon plus grand que la distance. Tangente : égal. Sans contact : plus petit.", () => {
    const n = noms();
    const u = un(UNITES);
    const dist = entre(6, 30);
    const cas = un([
      { q: `coupe le cercle en deux points`, juste: dist + entre(1, 5), faux: [dist, dist - 1, dist - entre(2, 4)] },
      { q: `soit tangente au cercle`, juste: dist, faux: [dist + 1, dist - 1, dist + entre(2, 4)] },
      { q: `ne touche pas le cercle`, juste: dist - entre(1, 4), faux: [dist, dist + 1, dist + entre(2, 5)] },
    ]);
    const verbe = cas.q;
    const text = phrase(
      [`Le point ${n.O} est à ${dist} ${u} de ${n.d}.`, `La distance de ${n.O} à ${n.d} vaut ${dist} ${u}.`, `${n.d} passe à ${dist} ${u} du point ${n.O}.`],
      [`Quel rayon faut-il au cercle de centre ${n.O} pour que ${n.d} ${verbe} ?`, `Pour quel rayon du cercle de centre ${n.O} a-t-on ${n.d} qui ${verbe.replace(/^soit/, "est")} ?`, `Avec quel rayon, pour le cercle de centre ${n.O}, ${n.d} ${verbe.replace(/^soit/, "est")} ?`],
    );
    const juste = `${cas.juste} ${u}`;
    return { text, format: "qcm", choices: qcm(juste, cas.faux.map((x) => `${x} ${u}`)), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_P, "on compare chaque rayon à la distance.", `la distance vaut ${dist}.`, `c’est ${juste}.`) };
  }),

  tpl("cercle_droite_position", 7, 2, "Calcule d’abord la distance par Pythagore, puis compare-la au rayon.", () => {
    const n = noms();
    const H = "H";
    const A = un(["A", "B", "E"].filter((x) => x !== n.O));
    const u = un(UNITES);
    const [x, h, o] = un(TRIPLETS);
    const r = un([h, h - 1 > 0 ? h - 1 : h, h + 1, h + 2, Math.max(1, h - 2)]);
    const text = `${un([`${H} est le pied de la perpendiculaire à ${n.d} passant par ${n.O}.`, `La perpendiculaire à ${n.d} passant par ${n.O} coupe ${n.d} en ${H}.`, `(${n.O}${H}) est perpendiculaire à ${n.d}, avec ${H} sur ${n.d}.`])} ${A} est un autre point de ${n.d}, avec ${n.O}${A} = ${o} ${u} et ${H}${A} = ${x} ${u}. Le cercle de centre ${n.O} a pour rayon ${r} ${u}. ${un(["Quelle phrase est juste ?", `Quelle est la position de ${n.d} par rapport au cercle ?`, "Que peut-on dire de la droite et du cercle ?"])}`;
    const juste = position(h, r, n.d);
    return { text, format: "qcm", choices: qcm(juste, quatre(n.d)), expected: [juste], comparator: "mcq_exact", canvas: figPied({ O: n.O, H, A, d: n.d }, h, x), explanation: expliquer(DEF_P, `le triangle ${n.O}${H}${A} est rectangle en ${H} : ${n.O}${H} est la distance.`, `${o}² − ${x}² = ${h * h}, donc ${n.O}${H} = ${h} ; rayon ${r}.`, `${juste}.`) };
  }),

  tpl("cercle_droite_position", 8, 2, "Un point de la droite est à l’intérieur du cercle : la droite doit le traverser.", () => {
    const n = noms();
    const u = un(UNITES);
    const A = un(["A", "B", "E"].filter((x) => x !== n.O));
    const r = entre(5, 25);
    const oa = entre(1, r - 1);
    const text = phrase(
      [
        `Le cercle de centre ${n.O} a pour rayon ${r} ${u}. Le point ${A} est sur ${n.d}, avec ${n.O}${A} = ${oa} ${u}.`,
        `${A} est un point de ${n.d}, et ${n.O}${A} = ${oa} ${u}. Le cercle de centre ${n.O} a un rayon de ${r} ${u}.`,
        `La droite ${n.d} passe par ${A}, avec ${n.O}${A} = ${oa} ${u}. On trace le cercle de centre ${n.O} et de rayon ${r} ${u}.`,
      ],
      ["Quelle phrase est forcément juste ?", `Que peut-on affirmer sur ${n.d} et le cercle ?`, `Que sait-on sûrement de ${n.d} ?`],
    );
    const juste = SEC(n.d);
    const canvas = figureConstruction({ [n.O]: point(0, 0), [A]: surCercle(point(0, 0), oa, un([30, 120, 210, 300])) }, { cercles: [{ centre: n.O, rayon: r, couleur: "#2563eb" }], segments: [{ a: n.O, b: A, couleur: "#64748b" }], description: "Un cercle, son centre, et un point d’une droite" });
    return { text, format: "qcm", choices: qcm(juste, quatre(n.d)), expected: [juste], comparator: "mcq_exact", canvas, explanation: expliquer(DEF_P, `${A} est à l’intérieur du cercle, car ${oa} < ${r}. Sa distance au centre est au moins la distance du centre à la droite.`, `distance ≤ ${oa} < ${r}.`, `${juste}.`) };
  }),

  tpl("cercle_droite_position", 9, 3, "Compare la portée et la distance : plus courte, égale ou plus longue.", () => {
    const s = un(ZONES);
    const { r, dist } = (() => {
      const r0 = entre(s.R[0], s.R[1]);
      const cas = un([-1, 0, 1]);
      return { r: r0, dist: cas === 0 ? r0 : cas < 0 ? entre(1, r0 - 1) : r0 + entre(1, Math.max(2, Math.round(r0 / 2))) };
    })();
    const juste = dist < r ? POINTS_ZONE[0] : dist === r ? POINTS_ZONE[1] : POINTS_ZONE[2];
    const text = phrase(
      [
        `${s.em} ${s.agit} ${r} ${s.u}. ${cap(s.trait)} passe à ${dist} ${s.u} ${s.de}, au plus près.`,
        `${cap(s.trait)} passe, au plus près, à ${dist} ${s.u} ${s.de}. ${defini(s.em)} ${s.agit} ${r} ${s.u}.`,
      ],
      [`Quels points de cette ligne sont atteints ?`, `Quelle partie de cette ligne est atteinte ?`, `Que peut-on atteindre sur cette ligne ?`],
    );
    return { text, format: "qcm", choices: qcm(juste, POINTS_ZONE), expected: [juste], comparator: "mcq_exact", explanation: expliquer(DEF_P, "la zone atteinte est un disque, et son rayon est la portée.", `distance ${dist} et portée ${r}.`, `${juste}.`) };
  }),

  tpl("cercle_droite_position", 10, 3, "La moitié de la portion atteinte, la distance et la portée forment un triangle rectangle.", () => {
    const s = un(ZONES);
    const k = Math.max(1, Math.round(s.R[1] / 15));
    const [d0, x0, r0] = un(TRIPLETS);
    const [r, dist, x] = [r0 * k, d0 * k, x0 * k];
    const text = phrase(
      [
        `${s.em} ${s.agit} ${r} ${s.u}. ${cap(s.trait)} passe à ${dist} ${s.u} ${s.de}, au plus près.`,
        `${cap(s.trait)} passe, au plus près, à ${dist} ${s.u} ${s.de}. ${defini(s.em)} ${s.agit} ${r} ${s.u}.`,
      ],
      ["Quelle longueur de cette ligne est atteinte ?", "Sur quelle longueur cette ligne est-elle atteinte ?", "Calcule la longueur de la portion atteinte."],
    );
    const canvas = figureConstruction(
      { O: point(0, d0), H: point(0, 0), P: point(-x0, 0), Q: point(x0, 0), x1: point(-1.3 * r0, 0), x2: point(1.3 * r0, 0) },
      { cercles: [{ centre: "O", rayon: r0, couleur: "#2563eb" }], droites: [{ a: "x1", b: "x2" }], segments: [{ a: "O", b: "H", couleur: "#64748b" }, { a: "O", b: "Q", couleur: "#64748b" }, { a: "P", b: "Q", couleur: "#dc2626", epais: true }], angles: [{ sommet: "H", de: "O", vers: "Q", droit: true }], description: "Un disque et la portion d’une droite qui le traverse" },
      ["x1", "x2"],
    );
    return { text, format: "short", expected: mesure(2 * x, s.u), comparator: "number_equal", canvas, explanation: expliquer(DEF_P, "le pied de la perpendiculaire partage la portion en deux moitiés : Pythagore dans un triangle rectangle.", `${fr(r)}² − ${fr(dist)}² = ${fr(x * x)}, donc la moitié vaut ${fr(x)}.`, `la portion mesure ${fr(2 * x)} ${s.u}.`) };
  }),

  tpl("cercle_droite_position", 11, 3, "Pour toucher tout juste, la portée doit être égale à la distance.", () => {
    const s = un(ZONES);
    const r = entre(s.R[0], s.R[1]);
    const manque = entre(1, Math.max(2, Math.round(r / 2)));
    const dist = r + manque;
    const text = phrase(
      [
        `${s.em} ${s.agit} ${r} ${s.u}. ${cap(s.trait)} passe à ${dist} ${s.u} ${s.de}, au plus près.`,
        `${cap(s.trait)} passe, au plus près, à ${dist} ${s.u} ${s.de}. ${defini(s.em)} ${s.agit} ${r} ${s.u}.`,
      ],
      ["De combien faut-il augmenter la portée pour atteindre tout juste cette ligne ?", "Quelle portée manque-t-il pour atteindre cette ligne en un seul point ?", "Il manque quelle longueur pour toucher cette ligne en un seul point ?"],
    );
    const canvas = figPied({ O: "O", H: "H", A: "A", d: "(d)" }, dist, dist * 0.8, { rayon: r });
    return { text, format: "short", expected: mesure(manque, s.u), comparator: "number_equal", canvas, explanation: expliquer(DEF_P, "la droite est tangente quand la portée égale la distance.", `${dist} − ${r} = ${manque}.`, `il manque ${manque} ${s.u}.`) };
  }),

  tpl("cercle_droite_position", 12, 3, "La plus petite portée est la distance à la droite, à trouver par Pythagore.", () => {
    const s = un(ZONES);
    const k = Math.max(1, Math.round(s.R[1] / 15));
    const [x0, d0, o0] = un(TRIPLETS);
    const [x, dist, o] = [x0 * k, d0 * k, o0 * k];
    const text = phrase(
      [
        `${s.em} est à ${o} ${s.u} d’un point A sur ${s.trait}. Ce point A est à ${x} ${s.u} du point H, le point de la ligne le plus proche.`,
        `Sur ${s.trait}, le point H est le plus proche ${s.de}, et A est à ${x} ${s.u} de H. ${s.em} est à ${o} ${s.u} de A.`,
      ],
      ["Quelle est la plus petite portée qui permet d’atteindre cette ligne ?", "Quelle portée minimale faut-il pour atteindre cette ligne ?", "Quelle est la distance la plus courte jusqu’à cette ligne ?"],
    );
    return { text, format: "short", expected: mesure(dist, s.u), comparator: "number_equal", canvas: figPied({ O: "O", H: "H", A: "A", d: "(d)" }, d0, x0), explanation: expliquer(DEF_P, "la plus petite portée est la distance à la droite : Pythagore.", `${o}² − ${x}² = ${dist * dist}.`, `il faut ${dist} ${s.u}.`) };
  }),
];
