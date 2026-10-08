import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE transformations.bank.ts (notion sym_transformation, 08/10/2026).
// Sur les figures quadrillées, ils relisent le CANVAS (figure bleue, figure rouge,
// axe, centre, et leurs noms) et refont la transformation point par point :
// miroir d'axe vertical ou horizontal, demi-tour, quart de tour (l'écran a son
// axe des ordonnées vers le BAS : le sens des aiguilles d'une montre se calcule
// dans ce repère), glissement. Dans le TEXTE, ils relisent les coordonnées
// « (3;5) », les déplacements (« 4 carreaux vers la droite et 1 vers le haut »,
// dans un repère dont l'ordonnée MONTE), les distances au centre ou à l'axe,
// les angles, et refont le calcul (moitié/double, conservation des longueurs,
// des angles, des périmètres, composition des transformations). Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Pt = { x: number; y: number };
const num = (s: string) => Number(String(s).replace(/[−–]/g, "-").replace(/ /g, "").replace(",", "."));

/* ─── LES FIGURES ─────────────────────────────────────────────────────────── */

const memes = (a: Pt[], b: Pt[]) =>
  a.length === b.length && a.every((p) => b.some((r) => egal(r.x, p.x) && egal(r.y, p.y))) && b.every((p) => a.some((r) => egal(r.x, p.x) && egal(r.y, p.y)));
const miroirV = (a: number) => (p: Pt) => ({ x: 2 * a - p.x, y: p.y });
const miroirH = (a: number) => (p: Pt) => ({ x: p.x, y: 2 * a - p.y });
const demiTour = (c: Pt) => (p: Pt) => ({ x: 2 * c.x - p.x, y: 2 * c.y - p.y });
/** Quart de tour dans le sens des aiguilles d'une montre À L'ÉCRAN (y vers le bas) : droite → bas. */
const quartH = (c: Pt) => (p: Pt) => ({ x: c.x - (p.y - c.y), y: c.y + (p.x - c.x) });
const quartAH = (c: Pt) => (p: Pt) => ({ x: c.x + (p.y - c.y), y: c.y - (p.x - c.x) });
const coin = (a: Pt[]) => ({ x: Math.min(...a.map((p) => p.x)), y: Math.min(...a.map((p) => p.y)) });
/** Le glissement qui envoie a sur b, s'il existe. */
function glissement(a: Pt[], b: Pt[]): Pt | null {
  const v = { x: coin(b).x - coin(a).x, y: coin(b).y - coin(a).y };
  return memes(a.map((p) => ({ x: p.x + v.x, y: p.y + v.y })), b) ? v : null;
}

/** Les noms des figures et leur nombre de sommets (relus dans le texte). */
const SOMMETS: Record<string, number> = { triangle: 3, drapeau: 3, équerre: 3, fanion: 3, flèche: 3, voile: 3, trapèze: 4, "lettre L": 6, quadrilatère: 4 };

/** Le canvas : deux figures, des sommets entiers dans la grille, le nom de la figure du texte. */
function lireFigure(q: Q): { c: any; S: Pt[]; I: Pt[]; p: string[] } | null {
  const c = q.canvas as any;
  if (c?.kind !== "transformation" || !c.image) return null;
  const S: Pt[] = c.source.points;
  const I: Pt[] = c.image.points;
  const p: string[] = [];
  for (const pt of [...S, ...I]) {
    if (!Number.isInteger(pt.x) || !Number.isInteger(pt.y)) p.push("sommet hors des nœuds du quadrillage");
    if (pt.x < 0 || pt.y < 0 || pt.x > c.grid.cols || pt.y > c.grid.rows) p.push("sommet hors de la grille");
  }
  const nom = Object.keys(SOMMETS).find((n) => new RegExp(`${n} (?:bleu|rouge)`).test(q.text));
  if (nom && SOMMETS[nom] !== S.length) p.push(`« ${nom} » dans le texte, ${S.length} sommets sur la figure`);
  if (S.length !== I.length) p.push("la figure et son image n'ont pas le même nombre de sommets");
  return { c, S, I, p: [...new Set(p)] };
}

const ouiNon = (q: Q, oui: boolean): string[] => {
  const juste = q.choices?.includes("vrai") ? (oui ? "vrai" : "faux") : oui ? "oui" : "non";
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (x) => x === juste)];
};

/** Le texte nomme bien l'axe ou le centre de la figure. */
function nomCanvas(q: Q, c: any): string[] {
  const p: string[] = [];
  if (c.axis?.label && !q.text.includes(c.axis.label)) p.push(`l'axe de la figure s'appelle ${c.axis.label}, le texte ne le nomme pas`);
  if (c.center?.label && !new RegExp(`(?:centre|point|autour de|autour du point|rapport au point) ${c.center.label}\\b|${c.center.label} est`).test(q.text))
    p.push(`le centre de la figure s'appelle ${c.center.label}, le texte ne le nomme pas`);
  return p;
}

function corrMiroir(q: Q): string[] {
  const f = lireFigure(q);
  if (!f) return ["il faut une figure et son image"];
  const ax = f.c.axis;
  if (!ax) return ["il faut un axe"];
  const m = ax.type === "vertical" ? miroirV(ax.x) : ax.type === "horizontal" ? miroirH(ax.y) : null;
  if (!m) return ["axe oblique non vérifié"];
  if (/horizontal/.test(q.text) && ax.type !== "horizontal") return ["« axe horizontal » mais axe vertical sur la figure"];
  // La figure bleue est entièrement d'un seul côté de l'axe.
  const cote = f.S.map((p) => Math.sign(ax.type === "vertical" ? p.x - ax.x : p.y - ax.y));
  const p = [...f.p, ...nomCanvas(q, f.c)];
  if (cote.some((s) => s !== cote[0]) || cote[0] === 0) p.push("la figure touche ou traverse l'axe");
  return [...p, ...ouiNon(q, memes(f.S.map(m), f.I))];
}

function corrDemiTour(q: Q): string[] {
  const f = lireFigure(q);
  if (!f || !f.c.center) return ["il faut une figure, son image et un centre"];
  return [...f.p, ...nomCanvas(q, f.c), ...ouiNon(q, memes(f.S.map(demiTour(f.c.center.point)), f.I))];
}

function corrGlissement(q: Q): string[] {
  const f = lireFigure(q);
  if (!f) return ["il faut une figure et son image"];
  return [...f.p, ...ouiNon(q, glissement(f.S, f.I) != null)];
}

function corrTourne(q: Q): string[] {
  const f = lireFigure(q);
  if (!f || !f.c.center) return ["il faut une figure, son image et un centre"];
  const c = f.c.center.point;
  const oui = [quartH(c), quartAH(c), demiTour(c)].some((r) => memes(f.S.map(r), f.I));
  return [...f.p, ...nomCanvas(q, f.c), ...ouiNon(q, oui)];
}

const QH = "un quart de tour dans le sens des aiguilles d'une montre";
const QAH = "un quart de tour dans le sens inverse des aiguilles d'une montre";
function corrQuelleRotation(q: Q): string[] {
  const f = lireFigure(q);
  if (!f || !f.c.center) return ["il faut une figure, son image et un centre"];
  const c = f.c.center.point;
  const L = f.c.center.label;
  const cands: [string, boolean][] = [
    [QH, memes(f.S.map(quartH(c)), f.I)],
    [QAH, memes(f.S.map(quartAH(c)), f.I)],
    ["un demi-tour", memes(f.S.map(demiTour(c)), f.I)],
    [`aucune rotation de centre ${L} : la figure a glissé`, glissement(f.S, f.I) != null],
  ];
  const vrais = cands.filter((x) => x[1]).map((x) => x[0]);
  if (vrais.length !== 1) return [`${vrais.length} descriptions justes : ${vrais.join(" | ")}`];
  const juste = vrais[0];
  return [...f.p, ...nomCanvas(q, f.c), ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (x) => x === juste)];
}

/** « 3 carreaux à droite et 1 vers le bas » (repère de l'ÉCRAN : bas = y augmente). */
function lireDeplacementEcran(s: string): Pt | null {
  const m = s.match(/^(\d+) (carreaux?) (?:à|vers) la (droite|gauche)|^(\d+) (carreaux?) à (droite|gauche)/);
  const m2 = s.match(/et (\d+) vers le (haut|bas)$/);
  if (!m || !m2) return null;
  const n = Number(m[1] ?? m[4]);
  const mot = m[2] ?? m[5];
  if ((n > 1) !== (mot === "carreaux")) return null;
  const sens = m[3] ?? m[6];
  return { x: sens === "droite" ? n : -n, y: m2[2] === "bas" ? Number(m2[1]) : -Number(m2[1]) };
}

function corrTrouverDeplacement(q: Q): string[] {
  const f = lireFigure(q);
  if (!f) return ["il faut une figure et son image"];
  const v = glissement(f.S, f.I);
  if (!v) return ["l'image n'est pas une translation de la figure"];
  if (v.x === 0 || v.y === 0) return ["déplacement nul dans une direction : la phrase « n à droite et m vers le bas » ne convient plus"];
  const juste = (s: string) => {
    const d = lireDeplacementEcran(s);
    return !!d && d.x === v.x && d.y === v.y;
  };
  return [...f.p, ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », le dessin glisse de (${v.x} ; ${v.y}) à l'écran`]), ...qcmUnique(q, juste)];
}

function corrDeuxDeplacements(q: Q): string[] {
  const t = q.text;
  const re = /de (\d+) (carreaux?) vers la (droite|gauche) et (\d+) vers le (haut|bas)/g;
  const d = [...t.matchAll(re)].map((m) => ({ x: (m[3] === "droite" ? 1 : -1) * Number(m[1]), y: (m[5] === "bas" ? 1 : -1) * Number(m[4]), ok: (Number(m[1]) > 1) === (m[2] === "carreaux") }));
  if (d.length !== 2) return ["deux déplacements attendus"];
  if (d.some((x) => !x.ok)) return ["accord de « carreau »"];
  const tot = { x: d[0].x + d[1].x, y: d[0].y + d[1].y };
  if (tot.x === 0 || tot.y === 0) return ["déplacement total nul dans une direction"];
  const juste = (s: string) => {
    const e = lireDeplacementEcran(s);
    return !!e && e.x === tot.x && e.y === tot.y;
  };
  const p: string[] = [];
  const f = lireFigure(q);
  if (f) {
    const v = glissement(f.S, f.I);
    if (!v || v.x !== tot.x || v.y !== tot.y) p.push("la figure ne montre pas le déplacement total");
    p.push(...f.p);
  }
  return [...p, ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », total (${tot.x} ; ${tot.y}) à l'écran`]), ...qcmUnique(q, juste)];
}

/** Sans axe ni centre : quelle transformation ? (cherchée sur toute la grille, elle doit être unique) */
function corrReconnaitreFigure(q: Q): string[] {
  const f = lireFigure(q);
  if (!f) return ["il faut une figure et son image"];
  const { S, I } = f;
  const trouve: string[] = [];
  if (glissement(S, I)) trouve.push("translation");
  const centres: Pt[] = [];
  for (let x = -2; x <= 30; x += 0.5) for (let y = -2; y <= 30; y += 0.5) centres.push({ x, y });
  if (centres.some((c) => memes(S.map(demiTour(c)), I))) trouve.push("symétrie centrale");
  const miroirs: ((p: Pt) => Pt)[] = [];
  for (let a = -2; a <= 30; a += 0.5) miroirs.push(miroirV(a), miroirH(a));
  for (let k = -30; k <= 30; k += 1) miroirs.push((p) => ({ x: p.y - k, y: p.x + k }), (p) => ({ x: k - p.y, y: k - p.x }));
  if (miroirs.some((m) => memes(S.map(m), I))) trouve.push("symétrie axiale");
  if (centres.some((c) => memes(S.map(quartH(c)), I) || memes(S.map(quartAH(c)), I))) trouve.push("rotation d'un quart de tour");
  if (trouve.length !== 1) return [`${trouve.length} transformations possibles : ${trouve.join(", ")}`];
  const juste = trouve[0];
  return [...f.p, ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (x) => x === juste)];
}

/* ─── LES DISTANCES ───────────────────────────────────────────────────────── */

/** La réponse « 12 cm » : valeur et unité. */
function verifier(q: Q, juste: number, u: string): string[] {
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?)\s*(.*)$/);
  const p: string[] = [];
  if (!m || !egal(num(m[1]), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste}`);
  else if (m[2].trim() !== u) p.push(`unité de la réponse « ${m[2]} » au lieu de « ${u} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator}`);
  return p;
}
const NBU = "(\\d+) (cm|mm|m|pixels)(?![a-z²])";

/** Symétrie centrale : OP' = OP, PP' = 2 × OP. */
function corrMilieu(q: Q): string[] {
  const t = q.text;
  const d = t.match(new RegExp(`(?:est à |= )${NBU}`));
  if (!d) return ["distance au centre illisible"];
  // (« L'olive » n'est pas un point : un nom de point n'est jamais suivi d'une lettre.)
  const P = t.match(/\b([A-Z])'(?![a-zà-ü])/)?.[1];
  if (!P) return ["point illisible"];
  const fin = t.slice(t.lastIndexOf(". ") + 2);
  const double = new RegExp(`${P}${P}'|sépare ${P} de ${P}'|\\[${P}${P}'\\]`).test(fin);
  if (!/symétrique|opposé|demi-tour|image/.test(t)) return ["rien ne dit que c'est une symétrie centrale"];
  return verifier(q, double ? 2 * Number(d[1]) : Number(d[1]), d[2]);
}

/** Rotation : OP' = OP ; PP' = 2 × OP seulement pour un demi-tour. */
function corrDistanceRotation(q: Q): string[] {
  const t = q.text;
  const d = t.match(new RegExp(`(?:est à |mesure |situé à )${NBU}`));
  if (!d) return ["distance au centre illisible"];
  const P = t.match(/\b([A-Z])'(?![a-zà-ü])/)?.[1];
  if (!P) return ["point illisible"];
  const demi = /demi-tour|180°/.test(t);
  const fin = t.slice(t.lastIndexOf(". ") + 2);
  const double = new RegExp(`sépare ${P} de ${P}'|${P}${P}'`).test(fin);
  if (double && !demi) return [`${P}${P}' demandé sans demi-tour : ce n'est pas le double de la distance au centre`];
  return verifier(q, double ? 2 * Number(d[1]) : Number(d[1]), d[2]);
}

/** Symétrie axiale : même distance à l'axe ; entre le point et son image, le double. */
function corrReflet(q: Q): string[] {
  const t = q.text;
  const d = t.match(new RegExp(`(?:à |de )${NBU}`));
  if (!d) return ["distance à l'axe illisible"];
  const fin = t.slice(t.lastIndexOf(". ") + 2);
  const double = /distance entre|sépare .+ de (?!l'axe|la surface|la couture|la ligne|l'allée|la diagonale|du miroir|du pli|de la couture)/.test(fin) || /qui sépare .+ (?:de la tache|du bouton|de son|de la fleur|de la statue|de la fenêtre|du point|du losange|de l'adversaire|de son adversaire)/.test(fin);
  const simple = /(?:À quelle distance|Combien de \S+ séparent) .*(?:de la surface|du miroir|du pli|de l'axe|de la couture|de la ligne|de l'allée|de la diagonale|du filet|de cet axe|de l'axe central|de l'allée centrale|de la couture centrale|de la ligne médiane)/.test(fin);
  if (double === simple) return [`question illisible : ${fin}`];
  return verifier(q, double ? 2 * Number(d[1]) : Number(d[1]), d[2]);
}

function corrCarreauxAxe(q: Q): string[] {
  const f = lireFigure(q);
  if (!f || !f.c.axis) return ["il faut une figure, son image et un axe"];
  const ax = f.c.axis;
  const m = ax.type === "vertical" ? miroirV(ax.x) : miroirH(ax.y);
  const p = [...f.p];
  if (!memes(f.S.map(m), f.I)) p.push("l'image dessinée n'est pas la symétrique");
  const P = f.S[0];
  const lettre = q.text.match(/Le sommet ([A-Z]) /)?.[1];
  if (f.c.source.label !== lettre || f.c.image.label !== `${lettre}'`) p.push("les noms des sommets du texte ne sont pas sur la figure");
  if (!egal(m(P).x, f.I[0].x) || !egal(m(P).y, f.I[0].y)) p.push(`${lettre}' n'est pas l'image de ${lettre} sur la figure`);
  const dist = Math.abs(ax.type === "vertical" ? P.x - ax.x : P.y - ax.y);
  const double = /de son image|\[[A-Z][A-Z]'\]/.test(q.text);
  const r = String(q.expected[0]).match(/^(\d+)$/);
  if (!r || Number(r[1]) !== (double ? 2 * dist : dist)) p.push(`attendu ${q.expected[0]}, il faut ${double ? 2 * dist : dist} carreaux`);
  return p;
}

/* ─── LES COORDONNÉES (repère : l'ordonnée MONTE) ─────────────────────────── */

const coord = (s: string): Pt | null => {
  const m = String(s).match(/\(([−-]?\d+);([−-]?\d+)\)/);
  return m ? { x: num(m[1]), y: num(m[2]) } : null;
};
const memePt = (a: Pt | null, b: Pt) => !!a && a.x === b.x && a.y === b.y;

function corrCoordTranslation(q: Q): string[] {
  const t = q.text;
  const P = coord(t);
  const m = t.match(/(\d+) (carreaux?) (?:vers la |plus à )(droite|gauche) et (\d+) (?:vers le |plus )(haut|bas)/);
  if (!P || !m) return ["point ou déplacement illisible"];
  if ((Number(m[1]) > 1) !== (m[2] === "carreaux")) return ["accord de « carreau »"];
  const juste = { x: P.x + (m[3] === "droite" ? 1 : -1) * Number(m[1]), y: P.y + (m[5] === "haut" ? 1 : -1) * Number(m[4]) };
  return [...(memePt(coord(q.expected[0]), juste) ? [] : [`attendu ${q.expected[0]}, l'arrivée est (${juste.x};${juste.y})`]), ...qcmUnique(q, (c) => memePt(coord(c), juste))];
}

function corrCoordMiroir(q: Q): string[] {
  const t = q.text;
  const P = coord(t);
  const v = t.match(/verticale formée des points d'abscisse (\d+)/);
  const h = t.match(/horizontale formée des points d'ordonnée (\d+)/);
  if (!P || (!v && !h)) return ["point ou axe illisible"];
  const juste = v ? { x: 2 * Number(v[1]) - P.x, y: P.y } : { x: P.x, y: 2 * Number(h![1]) - P.y };
  return [...(memePt(coord(q.expected[0]), juste) ? [] : [`attendu ${q.expected[0]}, le symétrique est (${juste.x};${juste.y})`]), ...qcmUnique(q, (c) => memePt(coord(c), juste))];
}

/* ─── LES PROPRIÉTÉS ──────────────────────────────────────────────────────── */

const TRANSFOS = /symétrie axiale|symétrie d'axe|symétrie centrale|symétrie de centre|translation|rotation/;

/** Longueur, angle, périmètre : conservés. */
function corrConserve(u: "longueur" | "angle" | "perimetre") {
  return (q: Q): string[] => {
    const t = q.text;
    if (!TRANSFOS.test(t)) return ["transformation absente"];
    if (/homothétie|agrandissement/.test(t)) return ["transformation qui ne conserve pas"];
    if (u === "angle") {
      const a = t.match(/(\d+)°/);
      return a ? verifier(q, Number(a[1]), "°") : ["angle illisible"];
    }
    const re = u === "perimetre" ? new RegExp(`périmètre de ${NBU}`) : new RegExp(`(?:mesure |de |segment de )${NBU}(?! de long)|${NBU} de long`);
    const m = t.match(re);
    if (!m) return ["mesure illisible"];
    return verifier(q, Number(m[1] ?? m[3]), m[2] ?? m[4]);
  };
}

function corrResteEgal(q: Q): string[] {
  const m = q.text.match(/(\d+)( cm²| cm|°)\. On lui applique/);
  if (!m) return ["mesure illisible"];
  const juste = (s: string) => new RegExp(`^(?:Elle|Il) reste égale? à ${m[1]}${m[2]}$`).test(s);
  const p: string[] = [];
  if (/(Elle) reste égal à|(Il) reste égale à/.test(q.expected[0])) p.push("accord de « égal »");
  return [...p, ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} »`]), ...qcmUnique(q, juste)];
}

function corrAngleRotation(q: Q): string[] {
  const t = q.text;
  let juste: number | null = null;
  let m: RegExpMatchArray | null;
  const FR: Record<string, number> = { "un quart de tour": 90, "un demi-tour": 180, "trois quarts de tour": 270, "un tiers de tour": 120, "un sixième de tour": 60, "un huitième de tour": 45 };
  const CARD = ["au nord", "à l'est", "au sud", "à l'ouest"];
  const accord = (n: number, mot: string) => new RegExp(`${n} ${mot}${n > 1 ? "s" : ""}\\b`).test(t);
  if ((m = t.match(/passe du (\d+) au (\d+), dans le sens des aiguilles/))) juste = 30 * ((Number(m[2]) - Number(m[1]) + 12) % 12);
  else if ((m = t.match(/En (\d+) minutes, .*grande aiguille/))) juste = 6 * Number(m[1]);
  else if ((m = t.match(/petite aiguille .* en (\d+) heures?/))) juste = accord(Number(m[1]), "heure") ? 30 * Number(m[1]) : null;
  else if ((m = t.match(/En (\d+) secondes, .*trotteuse/))) juste = 6 * Number(m[1]);
  else if ((m = t.match(/porte (\d+) nacelles régulièrement espacées.* (\d+) rangs? plus loin/))) juste = accord(Number(m[2]), "rang") ? (360 / Number(m[1])) * Number(m[2]) : null;
  else if ((m = t.match(/a (\d+) rayons régulièrement espacés/))) juste = 360 / Number(m[1]);
  else if ((m = t.match(/a (\d+) pales régulièrement espacées/))) juste = 360 / Number(m[1]);
  else if ((m = t.match(/porte (\d+) chevaux de bois régulièrement espacés\. Il tourne de (\d+) places?/))) juste = accord(Number(m[2]), "place") ? (360 / Number(m[1])) * Number(m[2]) : null;
  else if ((m = t.match(/fait face (au nord|à l'est|au sud|à l'ouest)\. .* dans le sens des aiguilles d'une montre, jusqu'à faire face (au nord|à l'est|au sud|à l'ouest)/)))
    juste = 90 * ((CARD.indexOf(m[2]) - CARD.indexOf(m[1]) + 4) % 4);
  else if ((m = t.match(/roue dentée de (\d+) dents tourne de (\d+) dents?/))) juste = accord(Number(m[2]), "dent") ? (360 / Number(m[1])) * Number(m[2]) : null;
  else if ((m = t.match(/a (\d+) pétales identiques régulièrement répartis/))) juste = 360 / Number(m[1]);
  else if ((m = t.match(/fait (un quart de tour|un demi-tour|trois quarts de tour|un tiers de tour|un sixième de tour|un huitième de tour)\./))) juste = FR[m[1]];
  if (juste === 0) return ["rotation nulle"];
  if (juste == null) return [`situation inconnue du correcteur : ${t.slice(0, 80)}`];
  if (!Number.isInteger(juste)) return [`angle non entier : ${juste}`];
  return verifier(q, juste, "°");
}

/** Situations : quelle transformation ? (lue sur les mots du texte, pas sur le gabarit) */
function transfoDeSituation(t: string): string | null {
  if (/miroir|reflète|reflet|replie ses ailes|plie la bande|pliée|inversés|à l'envers|chaussure gauche et la chaussure droite/.test(t)) return "axiale";
  if (/demi-tour|180°|tête-bêche|diamétralement opposées|à l'opposé|de part et d'autre du (?:centre|pivot)|opposé de la valve/.test(t)) return "centrale";
  // « sans tourner » est un glissement : on le teste AVANT les mots de la rotation.
  if (/gliss|tout droit|sans tourner|monte|descend|recopié|se répète|avance|roule|tiroir/.test(t)) return "translation";
  if (/tourn|pivot|passe du 12 au 3|autour d|quart de tour|huitième de tour/.test(t)) return "rotation";
  return null;
}
function corrSituation(q: Q): string[] {
  const k = transfoDeSituation(q.text);
  if (!k) return ["situation inconnue du correcteur"];
  const juste = (s: string) =>
    k === "axiale" ? /symétrie axiale/.test(s) : k === "centrale" ? /symétrie centrale/.test(s) : k === "translation" ? /^(?:une )?translation$/.test(s) : /^(?:une )?rotation(?: d'un quart de tour)?$/.test(s);
  const p: string[] = [];
  // Un demi-tour EST une rotation : « rotation » sans précision serait une seconde bonne réponse.
  if (k === "centrale" && (q.choices ?? []).some((c) => /^(?:une )?rotation$/.test(c))) p.push("« rotation » proposée pour un demi-tour : deux bonnes réponses");
  return [...p, ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », situation : ${k}`]), ...qcmUnique(q, juste)];
}

function corrJuger(q: Q): string[] {
  const a = q.text.match(/« (.+) »/)?.[1];
  if (!a) return ["affirmation illisible"];
  let vrai: boolean | null = null;
  let m: RegExpMatchArray | null;
  if ((m = a.match(/^([A-Z]) est à (\d+) cm de l'axe \S+, donc \1\1' = (\d+) cm\.$/))) vrai = Number(m[3]) === 2 * Number(m[2]);
  else if ((m = a.match(/^([A-Z])' est à (\d+) cm de l'axe \S+, donc \1 est à (\d+) cm de l'axe\.$/))) vrai = m[2] === m[3];
  else if ((m = a.match(/mesure (\d+) cm, donc \[[A-Z]'[A-Z]'\] mesure (?:aussi )?(\d+) cm/))) vrai = m[1] === m[2];
  else if ((m = a.match(/mesure (\d+)°, donc l'angle (?:image|[A-Z]'[A-Z]'[A-Z]') mesure (?:aussi )?(\d+)°/))) vrai = m[1] === m[2];
  else if ((m = a.match(/aire de (\d+) cm², donc son image a aussi une aire de (\d+) cm²/))) vrai = m[1] === m[2];
  else if (/est sur l'axe .+ son image .+ est le point .+ lui-même/.test(a)) vrai = true;
  else if (/est perpendiculaire à l'axe/.test(a)) vrai = true;
  else if (/est parallèle à l'axe/.test(a)) vrai = false;
  if (vrai == null) return [`affirmation inconnue : ${a}`];
  return ouiNon(q, vrai);
}

/** Composition : on suit les angles (même centre) et les déplacements. */
function corrComposees(q: Q): string[] {
  const t = q.text;
  const O = t.match(/centre ([A-Z])/)?.[1];
  // Bilan : angle de rotation (sens horaire positif) et déplacement horizontal.
  let ang = 0;
  let dx = 0;
  let axes = 0;
  const etapes = t.slice(t.indexOf(" applique") + 1).split(/, puis /);
  for (const e of etapes) {
    let m: RegExpMatchArray | null;
    if (/de nouveau la symétrie d'axe/.test(e)) axes++;
    else if (/symétrie d'axe/.test(e)) axes++;
    else if (/symétrie de centre/.test(e)) ang += 180;
    else if ((m = e.match(/translation de (\d+) cm vers la (droite|gauche)/))) dx += (m[2] === "droite" ? 1 : -1) * Number(m[1]);
    else if (/quart de tour .*dans le sens inverse/.test(e)) ang -= 90;
    else if (/quart de tour/.test(e)) ang += 90;
    else if ((m = e.match(/trois rotations successives de centre [A-Z] et d'angle (\d+)°/))) ang += 3 * Number(m[1]);
    else if ((m = e.match(/rotation de centre [A-Z] de (\d+)°/))) ang += Number(m[1]);
    else return [`étape illisible : ${e}`];
  }
  if (axes % 2 === 1) return ["un nombre impair de symétries axiales n'est pas traité"];
  ang = ((ang % 360) + 360) % 360;
  const RETOUR = "aucune : la figure revient à sa position de départ";
  let juste: string;
  if (ang === 0 && dx === 0) juste = RETOUR;
  else if (ang === 0) juste = `une translation de ${Math.abs(dx)} cm vers la ${dx > 0 ? "droite" : "gauche"}`;
  else if (dx === 0 && ang === 180) juste = `la symétrie de centre ${O}`;
  else if (dx === 0) juste = `une rotation de centre ${O} de ${ang}° dans le sens des aiguilles d'une montre`;
  else return ["rotation et translation mêlées : non traité"];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrEnchainement(q: Q): string[] {
  const t = q.text;
  if (/homothétie/.test(t)) return ["homothétie : rien n'est conservé"];
  let m: RegExpMatchArray | null;
  if ((m = t.match(/est à (\d+) cm du point ([A-Z])\. On lui applique une rotation de centre \2, puis la symétrie de centre \2/))) return verifier(q, Number(m[1]), "cm");
  if ((m = t.match(/mesure (\d+) cm\./))) return verifier(q, Number(m[1]), "cm");
  if ((m = t.match(/mesure (\d+)°\./))) return verifier(q, Number(m[1]), "°");
  if ((m = t.match(/aire de (\d+) cm²\./))) return verifier(q, Number(m[1]), "cm²");
  if ((m = t.match(/périmètre de (\d+) cm\./))) return verifier(q, Number(m[1]), "cm");
  return ["mesure illisible"];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_sym_axiale_tpl_1": corrMiroir,
  "4e_sym_axiale_tpl_2_axe_horizontal": corrMiroir,
  "4e_sym_axiale_tpl_3": corrReflet,
  "4e_sym_axiale_tpl_4": corrCarreauxAxe,
  "4e_sym_axiale_tpl_5_coordonnees": corrCoordMiroir,
  "4e_sym_axiale_tpl_6_juger": corrJuger,
  "4e_sym_centrale_tpl_1": corrDemiTour,
  "4e_sym_centrale_tpl_2_milieu": corrMilieu,
  "4e_sym_centrale_tpl_3_piege_non": corrDemiTour,
  "4e_sym_centrale_tpl_4": corrDemiTour,
  "4e_sym_centrale_tpl_5_objets": corrSituation,
  "4e_sym_translation_tpl_1": corrGlissement,
  "4e_sym_translation_tpl_2_coordonnees": corrCoordTranslation,
  "4e_sym_translation_tpl_3_trouver_deplacement": corrTrouverDeplacement,
  "4e_sym_translation_tpl_4": corrCoordTranslation,
  "4e_sym_translation_tpl_5_objets": corrSituation,
  "4e_sym_rotation_tpl_1": corrTourne,
  "4e_sym_rotation_tpl_2_distance": corrDistanceRotation,
  "4e_sym_rotation_tpl_3_angle_qcm": corrQuelleRotation,
  "4e_sym_rotation_tpl_4": corrDistanceRotation,
  "4e_sym_rotation_tpl_5_angles": corrAngleRotation,
  "4e_sym_transformation_propriete_tpl_1": corrConserve("longueur"),
  "4e_sym_transformation_propriete_tpl_2_angle": corrConserve("angle"),
  "4e_sym_transformation_propriete_tpl_3_perimetre": corrConserve("perimetre"),
  "4e_sym_transformation_propriete_tpl_4_conserve": corrResteEgal,
  "4e_sym_transformation_defi_tpl_1": corrSituation,
  "4e_sym_transformation_defi_tpl_2_reunion_canvas": corrDeuxDeplacements,
  "4e_sym_transformation_defi_tpl_3": corrReconnaitreFigure,
  "4e_sym_transformation_defi_tpl_4": corrSituation,
  "4e_sym_transformation_defi_tpl_5_composees": corrComposees,
  "4e_sym_transformation_defi_tpl_6_enchainement": corrEnchainement,
});
