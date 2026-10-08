import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE reperage.bank.ts (notion reperage, 08/10/2026).
// Ils relisent dans le TEXTE les abscisses, les coordonnées « (x ; y) » ou
// « (x ; y ; z) », les déplacements, les latitudes et longitudes, et dans le
// CANVAS (droite graduée, plan quadrillé, repère 3D) les points et leurs noms ;
// puis ils refont le repérage (abscisse, distance, côté et nombre de
// graduations, fraction d'unité, symétrique, milieu, sommet du pavé). Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** « -3 », « −3 », « 2,5 » → nombre. */
export const nb = (s: string) => Number(String(s).replace(/[−–]/g, "-").replace(/ /g, "").replace(",", "."));

/** Toutes les coordonnées « (x ; y) » ou « (x ; y ; z) » d'un texte, dans l'ordre. */
export function coordonnees(t: string): number[][] {
  return [...String(t).matchAll(/\(\s*([-−]?\d+(?:,\d+)?)\s*;\s*([-−]?\d+(?:,\d+)?)(?:\s*;\s*([-−]?\d+(?:,\d+)?))?\s*\)/g)].map((m) =>
    [m[1], m[2], m[3]].filter((x) => x != null).map(nb),
  );
}
/** Une seule coordonnée lue dans une proposition « (x ; y) ». */
export const coord = (s: string) => {
  const c = coordonnees(s);
  return c.length === 1 ? c[0] : null;
};
export const memeCoord = (a: number[] | null, b: number[] | null) =>
  !!a && !!b && a.length === b.length && a.every((x, i) => egal(x, b[i]));

/** Les points du canvas, quel que soit son type. */
export function pointsCanvas(q: Q): { x: number; y: number; z?: number; label?: string; value?: number }[] {
  const c = q.canvas as any;
  return Array.isArray(c?.points) ? c.points : [];
}

/** Les nombres « relatifs » d'un texte (signe moins compris). */
const relatifs = (t: string) => [...t.matchAll(/(?<![\d,])[-−]?\d+(?:,\d+)?/g)].map((m) => nb(m[0]));

// ─── abscisse_lire ──────────────────────────────────────────────────────────

/** Une droite graduée : un point, l'abscisse lue sur le canvas. */
function corrLireAbscisse(q: Q): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "number_line") return ["il faut une droite graduée"];
  const nom = q.text.match(/du point ([A-Z])\b/)?.[1];
  const pts = pointsCanvas(q);
  if (!nom || pts.length !== 1) return ["un point nommé dans le texte et un seul point sur la droite"];
  const p: string[] = [];
  if (pts[0].label !== nom) p.push(`le point du canvas s'appelle ${pts[0].label}, le texte dit ${nom}`);
  const v = pts[0].value!;
  if (!(v > c.min && v < c.max)) p.push(`le point ${v} est hors de la droite (${c.min} ; ${c.max}) ou sur un bout`);
  if (!Number.isInteger(v / c.step)) p.push(`le point ${v} n'est pas sur une graduation (pas ${c.step})`);
  if (!egal(nb(q.expected[0]), v)) p.push(`attendu ${q.expected[0]}, le canvas place ${nom} en ${v}`);
  return p;
}

/** Deux points : la distance, positive. */
function corrDistance(q: Q): string[] {
  const m = q.text.match(/entre les points ([A-Z]) et ([A-Z])/);
  const pts = pointsCanvas(q);
  if (!m || pts.length !== 2) return ["deux points nommés attendus"];
  const a = pts.find((x) => x.label === m[1]);
  const b = pts.find((x) => x.label === m[2]);
  if (!a || !b) return [`les noms du canvas (${pts.map((x) => x.label).join(", ")}) ne sont pas ceux du texte`];
  const juste = Math.abs(a.value! - b.value!);
  return egal(nb(q.expected[0]), juste) ? [] : [`attendu ${q.expected[0]}, la distance vaut ${juste}`];
}

// ─── abscisse_placer ────────────────────────────────────────────────────────

/** « à droite de l'origine, à 2 graduations » → { cote, n } ; « sur l'origine » → n = 0. */
function lirePlacement(s: string): { cote: number; n: number } | null {
  if (s === "sur l'origine") return { cote: 0, n: 0 };
  const m = s.match(/^à (gauche|droite) de l'origine, à (\d+) (graduations?)$/);
  if (!m) return null;
  const n = Number(m[2]);
  if ((n > 1) !== (m[3] === "graduations")) return null; // accord faux : illisible
  return { cote: m[1] === "gauche" ? -1 : 1, n };
}

function corrOuPlacer(q: Q): string[] {
  const m = q.text.match(/point ([A-Z]) d'abscisse ([-−]?\d+) sur cette droite graduée de pas (\d+)/);
  if (!m) return ["énoncé illisible"];
  const v = nb(m[2]);
  const pas = Number(m[3]);
  const c = q.canvas as any;
  const p: string[] = [];
  if (c?.kind !== "number_line" || c.step !== pas) p.push(`le canvas n'a pas le pas ${pas}`);
  else if (!(v > c.min && v < c.max)) p.push(`${v} n'est pas sur la droite dessinée`);
  if (pointsCanvas(q).length) p.push("le point à placer est déjà dessiné");
  const juste = (s: string) => {
    const l = lirePlacement(s);
    return !!l && l.cote === Math.sign(v) && l.n === Math.abs(v) / pas;
  };
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} » : ${v} est à ${Math.abs(v) / pas} graduation(s) ${v < 0 ? "à gauche" : "à droite"}`);
  for (const ch of q.choices ?? []) if (!lirePlacement(ch)) p.push(`proposition illisible ou mal accordée : « ${ch} »`);
  return [...p, ...qcmUnique(q, juste)];
}

function corrPlusADroite(q: Q): string[] {
  const m = q.text.match(/le point ([A-Z]) a pour abscisse ([-−]?\d+) et le point ([A-Z]) a pour abscisse ([-−]?\d+)\. Lequel est le plus à DROITE/);
  if (!m) return ["énoncé illisible"];
  const a = nb(m[2]);
  const b = nb(m[4]);
  if (a === b) return ["deux abscisses égales"];
  const juste = a > b ? m[1] : m[3];
  const p: string[] = [];
  for (const [n, v] of [[m[1], a], [m[3], b]] as const)
    if (!pointsCanvas(q).some((x) => x.label === n && x.value === v)) p.push(`le canvas ne place pas ${n} en ${v}`);
  if (q.expected[0] !== juste) p.push(`attendu ${q.expected[0]}, le plus à droite est ${juste}`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

// ─── abscisse_fraction ──────────────────────────────────────────────────────

/** « $-\dfrac{7}{3}$ » → -7/3 ; « $2$ » → 2. */
export function valeurLatex(s: string): number | null {
  const f = s.match(/^\$\s*([-−]?)\\dfrac\{(\d+)\}\{(\d+)\}\s*\$$/);
  if (f) return (f[1] ? -1 : 1) * (Number(f[2]) / Number(f[3]));
  const e = s.match(/^\$\s*([-−]?\d+)\s*\$$/);
  return e ? nb(e[1]) : null;
}

function corrLireFraction(q: Q): string[] {
  const t = q.text;
  const den = Number(
    t.match(/découpée en (\d+) parts égales|compte (\d+) graduations|partagée en (\d+) parts égales|(\d+) graduations par unité/)?.slice(1).find(Boolean),
  );
  const compte = Number(t.match(/à (\d+) parts?\b|(\d+) graduations? (?:vers|à gauche|à droite|plus loin)/)?.slice(1).find(Boolean));
  const gauche = /gauche/.test(t);
  const droite = /droite de|vers la droite|à droite/.test(t.replace(/droite graduée/g, ""));
  if (!den || !compte || gauche === droite) return [`énoncé illisible (den ${den}, parts ${compte}, côté ?)`];
  const juste = (gauche ? -1 : 1) * (compte / den);
  const p: string[] = [];
  if (gauche && !/droite graduée|thermomètre|altitudes|compte en banque/.test(t)) p.push("abscisse négative sur un support où elle n'a pas de sens");
  if (compte % den === 0) p.push("la fraction tombe sur un entier");
  if (!egal(valeurLatex(q.expected[0]), juste)) p.push(`attendu ${q.expected[0]}, le texte donne ${gauche ? "-" : ""}${compte}/${den}`);
  return [...p, ...qcmUnique(q, (c) => egal(valeurLatex(c), juste))];
}

function corrEncadrer(q: Q): string[] {
  const fr = [...q.text.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].map((m) => [Number(m[1]), Number(m[2])]);
  if (!fr.length || fr.some((f) => f[0] !== fr[0][0] || f[1] !== fr[0][1])) return ["une seule fraction attendue"];
  const [n, d] = fr[0];
  if (n % d === 0) return ["la fraction est un entier"];
  if (!/GAUCHE|plus petite des deux|plus grand nombre entier inférieur/.test(q.text)) return ["la question ne dit pas quel entier donner"];
  const juste = Math.floor(n / d);
  return egal(nb(q.expected[0]), juste) ? [] : [`attendu ${q.expected[0]}, ${n} ÷ ${d} est entre ${juste} et ${juste + 1}`];
}

// ─── repere_plan ────────────────────────────────────────────────────────────

function corrLirePlan(q: Q): string[] {
  const nom = q.text.match(/(?:du |le )?point ([A-Z])\b/)?.[1];
  const pts = pointsCanvas(q);
  if (!nom || pts.length !== 1) return ["un point nommé et un seul point dessiné attendus"];
  if (pts[0].label !== nom) return [`le canvas nomme ${pts[0].label}, le texte ${nom}`];
  const juste = [pts[0].x, pts[0].y];
  const c = q.canvas as any;
  const p: string[] = [];
  if (juste[0] < 0 || juste[1] < 0 || juste[0] > c.grid.cols || juste[1] > c.grid.rows) p.push("point hors du quadrillage");
  if (!memeCoord(coord(q.expected[0]), juste)) p.push(`attendu ${q.expected[0]}, le canvas place ${nom} en (${juste.join(" ; ")})`);
  return [...p, ...qcmUnique(q, (s) => memeCoord(coord(s), juste))];
}

function corrOrdre(q: Q): string[] {
  const cs = coordonnees(q.text);
  if (cs.length !== 2) return ["deux couples de coordonnées attendus"];
  const meme = memeCoord(cs[0], cs[1]);
  const p: string[] = [];
  if (!(cs[0][0] === cs[1][1] && cs[0][1] === cs[1][0])) p.push("le second couple n'est pas le premier échangé");
  const juste = (s: string) => (meme ? /^oui/.test(s) : /^non/.test(s));
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} »`);
  const pts = pointsCanvas(q);
  for (const c of cs) if (!pts.some((x) => x.x === c[0] && x.y === c[1])) p.push(`le canvas ne place pas (${c.join(" ; ")})`);
  return [...p, ...qcmUnique(q, juste)];
}

function corrSensAxes(q: Q): string[] {
  const t = q.text;
  const cs = coordonnees(t);
  const m = t.match(/(\d+) (?:carreaux?|cases?|unités?) vers le (HAUT|BAS|NORD|SUD)/);
  if (cs.length !== 1 || !m) return ["un départ et un déplacement vertical attendus"];
  const d = Number(m[1]);
  const p: string[] = [];
  if (/NORD|SUD/.test(m[2]) && !/le nord en haut/.test(t)) p.push("NORD/SUD sans « le nord en haut »");
  if (d > 1 && !new RegExp(`${d} (carreaux|cases|unités)`).test(t)) p.push("accord du déplacement");
  if (d === 1 && /(?<!\d)1 (carreaux|cases|unités)/.test(t)) p.push("accord : « 1 » au singulier");
  const s = /HAUT|NORD/.test(m[2]) ? 1 : -1;
  const juste = [cs[0][0], cs[0][1] + s * d];
  if (!memeCoord(coord(q.expected[0]), juste)) p.push(`attendu ${q.expected[0]}, l'arrivée est (${juste.join(" ; ")})`);
  return [...p, ...qcmUnique(q, (c) => memeCoord(coord(c), juste))];
}

// ─── repere_espace ──────────────────────────────────────────────────────────

function corrSommet(q: Q): string[] {
  const t = q.text;
  const NB = "(\\d+)(?: (?:dm|m))?";
  const m =
    t.match(new RegExp(`longueur ${NB} \\(le long de l'axe des abscisses\\), pour largeur ${NB} \\(en profondeur\\) et pour hauteur ${NB}`)) ??
    t.match(new RegExp(`: ${NB} le long de l'axe des abscisses, ${NB} en profondeur et ${NB} en hauteur`)) ??
    t.match(new RegExp(`: ${NB} en abscisse, ${NB} en profondeur, ${NB} en altitude`));
  if (!m) return ["dimensions illisibles"];
  const [L, l, h] = [m[1], m[2], m[3]].map(Number);
  let juste: number[] | null = null;
  const dessus = t.match(/juste au-dessus du point \((\d+) ; (\d+) ; 0\)/);
  if (/sommet opposé à l'origine/.test(t)) juste = [L, l, h];
  else if (/juste au-dessus de l'origine/.test(t)) juste = [0, 0, h];
  else if (/axe des abscisses \?|arête posée sur l'axe des abscisses/.test(t)) juste = [L, 0, 0];
  else if (/arête posée sur l'axe des profondeurs/.test(t)) juste = [0, l, 0];
  else if (/face du bas le plus éloigné/.test(t)) juste = [L, l, 0];
  else if (dessus) {
    const a = Number(dessus[1]);
    const b = Number(dessus[2]);
    if (!((a === L && b === 0) || (a === 0 && b === l))) return [`le point (${a} ; ${b} ; 0) n'est pas un sommet du pavé`];
    juste = [a, b, h];
  }
  if (!juste) return ["sommet demandé illisible"];
  const p: string[] = [];
  if (!memeCoord(coord(q.expected[0]), juste)) p.push(`attendu ${q.expected[0]}, le sommet est (${juste.join(" ; ")})`);
  const inc = pointsCanvas(q).find((x) => x.label === "?");
  if (!inc || !memeCoord([inc.x, inc.y, inc.z!], juste)) p.push("le canvas ne marque pas le bon sommet");
  if (/un pavé droit occupe un pavé droit/.test(t)) p.push("« un pavé droit occupe un pavé droit »");
  return [...p, ...qcmUnique(q, (c) => memeCoord(coord(c), juste))];
}

/** Le nombre de coordonnées, d'après le SUPPORT nommé dans le texte. */
function dimension(t: string): number | null {
  if (/droite graduée|ruban|fil tendu|voie ferrée|autoroute|sentier balisé/.test(t)) return 1;
  if (/plan d'une feuille|surface de la Terre|échiquier|en pleine mer|plan d'une ville|plateau de jeu/.test(t)) return 2;
  if (/pavé droit|mouche|aquarium|drone|ampoule|volière/.test(t)) return 3;
  return null;
}
function corrCombien(q: Q): string[] {
  const juste = dimension(q.text);
  if (juste == null) return ["support inconnu du correcteur"];
  return [...(nb(q.expected[0]) === juste ? [] : [`attendu ${q.expected[0]}, il faut ${juste} nombre(s)`]), ...qcmUnique(q, (c) => nb(c) === juste)];
}

// ─── repere_terre ───────────────────────────────────────────────────────────

const LAT = /(\d{1,2})° (\d{2})′ (NORD|SUD)/;
const LON = /(\d{1,3})° (\d{2})′ (EST|OUEST)/;
function valide(t: string): string[] {
  const p: string[] = [];
  const a = t.match(LAT);
  const o = t.match(LON);
  if (a && (Number(a[1]) > 90 || Number(a[2]) > 59)) p.push(`latitude impossible : ${a[0]}`);
  if (o && (Number(o[1]) > 180 || Number(o[2]) > 59)) p.push(`longitude impossible : ${o[0]}`);
  return p;
}

function corrLatLon(q: Q): string[] {
  const t = q.text;
  const a = t.match(LAT)?.[0];
  const o = t.match(LON)?.[0];
  if (!a || !o) return ["latitude et longitude attendues dans le texte"];
  const veutLat = /LATITUDE|depuis l'équateur/.test(t);
  const veutLon = /LONGITUDE|depuis le méridien de Greenwich/.test(t);
  if (veutLat === veutLon) return ["on ne sait pas ce qui est demandé"];
  const juste = veutLat ? a : o;
  const p = valide(t);
  if (q.expected[0] !== juste) p.push(`attendu ${q.expected[0]}, la ${veutLat ? "latitude" : "longitude"} est ${juste}`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

function corrHemisphere(q: Q): string[] {
  const t = q.text;
  const p = valide(t);
  let juste: string;
  if (/Greenwich/.test(t)) {
    const o = t.match(LON);
    if (!o) return ["longitude attendue"];
    juste = `à l'${o[3] === "EST" ? "est" : "ouest"} du méridien de Greenwich`;
  } else {
    const a = t.match(LAT);
    if (!a) return ["latitude attendue"];
    juste = `l'hémisphère ${a[3] === "NORD" ? "nord" : "sud"}`;
  }
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

// ─── repere_defi ────────────────────────────────────────────────────────────

function corrSymetrique(q: Q): string[] {
  const cs = coordonnees(q.text);
  if (cs.length !== 1) return ["un point de départ attendu"];
  const [x, y] = cs[0];
  const juste = /par rapport à l'axe des abscisses/.test(q.text)
    ? [x, -y]
    : /par rapport à l'axe des ordonnées/.test(q.text)
      ? [-x, y]
      : /par rapport à l'origine/.test(q.text)
        ? [-x, -y]
        : null;
  if (!juste) return ["symétrie illisible"];
  return [
    ...(memeCoord(coord(q.expected[0]), juste) ? [] : [`attendu ${q.expected[0]}, le symétrique est (${juste.join(" ; ")})`]),
    ...qcmUnique(q, (c) => memeCoord(coord(c), juste)),
  ];
}

function corrMilieu(q: Q): string[] {
  const cs = coordonnees(q.text);
  if (cs.length !== 2) return ["deux points attendus"];
  const veutX = /ABSCISSE|abscisse de/.test(q.text);
  const veutY = /ORDONNÉE|ordonnée de/.test(q.text);
  if (veutX === veutY) return ["coordonnée demandée illisible"];
  const mil = [(cs[0][0] + cs[1][0]) / 2, (cs[0][1] + cs[1][1]) / 2];
  const juste = veutX ? mil[0] : mil[1];
  const p: string[] = [];
  if (!egal(nb(q.expected[0]), juste)) p.push(`attendu ${q.expected[0]}, le milieu est (${mil.join(" ; ")})`);
  const pts = pointsCanvas(q);
  const inc = pts.find((x) => x.label === "?");
  if (!inc || inc.x !== mil[0] || inc.y !== mil[1]) p.push("le canvas ne marque pas le milieu");
  for (const c of cs) if (!pts.some((x) => x.x === c[0] && x.y === c[1])) p.push(`le canvas ne place pas (${c.join(" ; ")})`);
  // Les noms du segment [AB] sont ceux du canvas.
  const seg = q.text.match(/\[([A-Z])([A-Z])\]/);
  if (seg) for (const n of [seg[1], seg[2]]) if (!pts.some((x) => x.label === n)) p.push(`le canvas ne nomme pas ${n}`);
  return p;
}

const LL = "latitude et longitude";
const LLA = "latitude, longitude et altitude";
const XY = "abscisse et ordonnée";
const X = "une seule abscisse";
const XYZ = "trois coordonnées";
/** Le repérage qui convient, d'après la situation (indépendamment du gabarit). */
function support(t: string): string | null {
  if (/avion|ballon-sonde|parapentiste|satellite/.test(t)) return LLA;
  if (/bateau|phare|île|globe/.test(t)) return LL;
  if (/câble|autoroute|perle|wagon/.test(t)) return X;
  if (/pièce|salle|aquarium|carton/.test(t)) return XYZ;
  if (/case|pion|papier millimétré|bataille navale/.test(t)) return XY;
  return null;
}
function corrSupport(q: Q): string[] {
  const juste = support(q.text);
  if (!juste) return ["situation inconnue du correcteur"];
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
  // « trois coordonnées » et « latitude, longitude et altitude » disent la même chose.
  const ch = q.choices ?? [];
  if ((juste === LLA && ch.includes(XYZ)) || (juste === XYZ && ch.includes(LLA))) p.push("deux propositions justes : trois coordonnées / latitude, longitude, altitude");
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_abscisse_lire_tpl_1_entier": corrLireAbscisse,
  "4e_abscisse_lire_tpl_2_deux_points": corrDistance,
  "4e_abscisse_placer_tpl_1_ou": corrOuPlacer,
  "4e_abscisse_placer_tpl_2_lequel_droite": corrPlusADroite,
  "4e_abscisse_fraction_tpl_1_lire": corrLireFraction,
  "4e_abscisse_fraction_tpl_2_encadrer": corrEncadrer,
  "4e_repere_plan_tpl_1_lire": corrLirePlan,
  "4e_repere_plan_tpl_2_ordre": corrOrdre,
  "4e_repere_plan_tpl_3_sens_des_axes": corrSensAxes,
  "4e_repere_espace_tpl_1_sommet": corrSommet,
  "4e_repere_espace_tpl_2_combien": corrCombien,
  "4e_repere_terre_tpl_1_lire": corrLatLon,
  "4e_repere_terre_tpl_2_hemisphere": corrHemisphere,
  "4e_repere_defi_tpl_1_symetrique": corrSymetrique,
  "4e_repere_defi_tpl_2_milieu": corrMilieu,
  "4e_repere_defi_tpl_3_quel_support": corrSupport,
});

/** Pour les autres fichiers de géométrie de 4e. */
export { relatifs };
