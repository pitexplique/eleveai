import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE parallelogrammes.bank.ts (notion quadrilatere_parallelogramme, 08/10/2026).
// Ils relisent dans le TEXTE le nom du quadrilatère, les longueurs (« KL = 6 cm »,
// « [RS] mesure 8 m », « Ses côtés [X] et [Y] mesurent a et b »), les angles
// (« l'angle DAB », « l'angle de sommet A », « l'angle en A »), les diagonales,
// la base et la hauteur ; et dans le CANVAS les lettres, les codages
// (côtés parallèles, angles droits, côtés égaux : vrais sur les points), les
// étiquettes chiffrées (mêmes nombres que le texte, et même FORME : rapports
// des côtés, angles, hauteur). Puis ils refont le raisonnement : côtés opposés,
// angles opposés et consécutifs, diagonales de même milieu, réciproques,
// cas particuliers, aire, périmètre. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type S = "A" | "B" | "C" | "D";
const SS: S[] = ["A", "B", "C", "D"];
const NB = "(\\d{1,3}(?: \\d{3})+|\\d+(?:,\\d+)?)";
const U = "(cm|dm|m|km)";
const num = (s: string) => Number(String(s).replace(/[  ]/g, "").replace(",", "."));
const ent = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;

/** Le nombre et l'unité de la réponse attendue (« 24 cm » → 24, « cm »). */
function rep(q: Q): { v: number | null; u: string } {
  const m = String(q.expected[0]).match(/^(-?\d+(?:,\d+)?)\s*(.*)$/);
  return m ? { v: num(m[1]), u: m[2].trim() } : { v: null, u: "" };
}
/** La réponse attendue vaut `juste`, avec l'unité `u` (vide : pas d'unité exigée). */
function verifier(q: Q, juste: number, u: string): string[] {
  const p: string[] = [];
  const r = rep(q);
  if (!egal(r.v, juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste}`);
  if (r.u !== u) p.push(`unité de la réponse « ${r.u} » au lieu de « ${u} »`);
  if (!ent(juste * 100)) p.push(`${juste} : plus de deux décimales`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

const NOMS = ["ABCD", "EFGH", "KLMN", "RSTU", "PQRS", "MNPQ", "UVWX", "DEFG", "WXYZ"];
/** Les noms de quadrilatères du texte, dans l'ordre. */
const noms = (t: string) => [...t.matchAll(/(?<![A-Z])([A-Z]{4})(?![A-Z])/g)].map((m) => m[1]).filter((n, i, a) => NOMS.includes(n) && a.indexOf(n) === i);
/** Le segment « AB » d'un nom (n = « EFGH », g = « AB » → « EF »). */
const sg = (n: string, g: string) => [...g].map((l) => n["ABCD".indexOf(l)]).join("");
const memeSeg = (a: string, b: string) => a === b || a === [...b].reverse().join("");
/** Deux segments du nom sont des côtés opposés (aucune lettre commune). */
const opposes = (a: string, b: string) => ![...a].some((l) => b.includes(l));

/**
 * Les longueurs du texte, par segment : « XY = n u », « XY = ZW = n u », « [XY] mesure n u »,
 * « [XY] n u », « [XY] de n u », « Ses côtés [X] et [Y] mesurent a u et b u », « n u ([XY]) ».
 */
function longueurs(t: string): { s: string; v: number; u: string }[] {
  const out: { s: string; v: number; u: string }[] = [];
  const add = (s: string, v: string, u: string) => out.push({ s, v: num(v), u });
  for (const m of t.matchAll(new RegExp(`\\[?([A-Z]{2})\\]? et \\[?([A-Z]{2})\\]?(?: du parallélogramme [A-Z]{4})? (?:mesurent|de) ${NB} ${U} et ${NB} ${U}`, "g"))) {
    add(m[1], m[3], m[4]);
    add(m[2], m[5], m[6]);
  }
  for (const m of t.matchAll(new RegExp(`(?<![A-Z])([A-Z]{2}) = (?:([A-Z]{2}) = )?${NB} ${U}`, "g"))) {
    add(m[1], m[3], m[4]);
    if (m[2]) add(m[2], m[3], m[4]);
  }
  for (const m of t.matchAll(new RegExp(`\\[([A-Z]{2})\\],? (?:mesure |de |: )?${NB} ${U}`, "g"))) add(m[1], m[2], m[3]);
  for (const m of t.matchAll(new RegExp(`${NB} ${U} \\(\\[([A-Z]{2})\\]\\)`, "g"))) add(m[3], m[1], m[2]);
  return out;
}
const longueurDe = (t: string, s: string) => longueurs(t).find((x) => memeSeg(x.s, s)) ?? null;

/* ─── LA FIGURE ───────────────────────────────────────────────────────────── */

const pt = (c: any, k: S) => c.points[k] as { x: number; y: number };
const vec = (c: any, a: S, b: S) => ({ x: pt(c, b).x - pt(c, a).x, y: pt(c, b).y - pt(c, a).y });
const lg = (c: any, s: string) => Math.hypot(vec(c, s[0] as S, s[1] as S).x, vec(c, s[0] as S, s[1] as S).y);
const angleEntre = (u: { x: number; y: number }, v: { x: number; y: number }) =>
  (Math.acos(Math.max(-1, Math.min(1, (u.x * v.x + u.y * v.y) / Math.hypot(u.x, u.y) / Math.hypot(v.x, v.y)))) * 180) / Math.PI;
const VOIS: Record<S, [S, S]> = { A: ["D", "B"], B: ["A", "C"], C: ["B", "D"], D: ["C", "A"] };
const angleFig = (c: any, k: S) => angleEntre(vec(c, k, VOIS[k][0]), vec(c, k, VOIS[k][1]));
const paralleles = (c: any, s1: string, s2: string) => {
  const a = angleEntre(vec(c, s1[0] as S, s1[1] as S), vec(c, s2[0] as S, s2[1] as S));
  return a < 1 || a > 179;
};
const etiq = (s: unknown) => {
  const m = String(s ?? "").match(/^(\d+(?:,\d+)?)/);
  return m ? num(m[1]) : null;
};

/** La figure : lettres, codages vrais sur les points, étiquettes = texte, forme = mesures. */
function verifierFigure(q: Q, nom: string, donneesSurLaFigure = false): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.kind !== "quadrilatere") return ["canvas qui n'est pas un quadrilatère"];
  const p: string[] = [];
  const lettres = SS.map((k) => c.labels?.[k] ?? k).join("");
  if (lettres !== nom) p.push(`la figure s'appelle ${lettres}, le texte ${nom}`);
  for (const [s1, s2] of c.marks?.parallelSides ?? []) if (!paralleles(c, s1, s2)) p.push(`[${s1}] et [${s2}] codés parallèles mais dessinés sécants`);
  for (const k of c.marks?.rightAnglesAt ?? []) if (Math.abs(angleFig(c, k) - 90) > 1) p.push(`angle droit codé en ${k} mais dessiné à ${angleFig(c, k).toFixed(0)}°`);
  for (const [s1, s2] of c.marks?.equalSides ?? []) if (Math.abs(lg(c, s1) / lg(c, s2) - 1) > 0.02) p.push(`[${s1}] et [${s2}] codés égaux mais dessinés inégaux`);
  for (const k of SS) if (pt(c, k).x < 15 || pt(c, k).x > 285 || pt(c, k).y < 20 || pt(c, k).y > 215) p.push(`le point ${k} sort du cadre`);
  // Chaque étiquette chiffrée est un nombre du texte.
  const nombresTexte = [...q.text.matchAll(/\d+(?:,\d+)?/g)].map((m) => num(m[0]));
  const etiquettes: [string, unknown][] = [
    ...Object.entries(c.sideLabels ?? {}),
    ...Object.entries(c.angleLabels ?? {}),
    ...(c.height?.label ? [["hauteur", c.height.label] as [string, unknown]] : []),
  ];
  // (Sauf quand la question dit « d'après la figure » : les données sont SUR la figure.)
  for (const [k, v] of donneesSurLaFigure ? [] : etiquettes) {
    const x = etiq(v);
    if (x != null && !nombresTexte.includes(x)) p.push(`l'étiquette ${k} = « ${v} » n'est pas dans le texte`);
  }
  // Sur un parallélogramme dessiné, la forme suit les mesures.
  const estPara = paralleles(c, "AB", "CD") && paralleles(c, "BC", "DA");
  if (estPara) {
    const cotes = (["AB", "BC", "CD", "DA", "AC", "BD"] as const)
      .map((s) => ({ s, v: etiq(c.sideLabels?.[s]) }))
      .filter((x) => x.v != null && (["AB", "BC", "CD", "DA"].includes(x.s) || c.display?.showDiagonals));
    for (let i = 0; i < cotes.length; i++)
      for (let j = i + 1; j < cotes.length; j++)
        if (Math.abs(cotes[i].v! / cotes[j].v! / (lg(c, cotes[i].s) / lg(c, cotes[j].s)) - 1) > 0.03)
          p.push(`[${cotes[i].s}] et [${cotes[j].s}] n'ont pas sur la figure le rapport de leurs étiquettes (${cotes[i].v} et ${cotes[j].v})`);
    for (const k of SS) {
      const v = etiq(c.angleLabels?.[k]);
      if (v != null && Math.abs(angleFig(c, k) - v) > 2) p.push(`l'angle en ${k} est étiqueté ${v}° mais dessiné à ${angleFig(c, k).toFixed(0)}°`);
    }
    const h = etiq(c.height?.label);
    const base = etiq(c.sideLabels?.AB);
    if (h != null && base != null) {
      const hFig = Math.abs(vec(c, "A", "B").x * vec(c, "A", "D").y - vec(c, "A", "B").y * vec(c, "A", "D").x) / lg(c, "AB");
      if (Math.abs(h / base / (hFig / lg(c, "AB")) - 1) > 0.03) p.push("la hauteur dessinée n'a pas le rapport de son étiquette à la base");
    }
  }
  return p;
}

/* ─── RECONNAÎTRE ─────────────────────────────────────────────────────────── */

/** Le codage seul dit-il « parallélogramme » ? true / false / null (indécidable). */
function parCodage(c: any): boolean | null {
  const par = c.marks?.parallelSides ?? [];
  if (par.length === 2) return true;
  if ((c.marks?.rightAnglesAt ?? []).length === 4) return true;
  const l = (s: string) => etiq(c.sideLabels?.[s]);
  if ([l("AB"), l("CD")].every((x) => x != null) && l("AB") !== l("CD")) return false;
  if ([l("BC"), l("DA")].every((x) => x != null) && l("BC") !== l("DA")) return false;
  if (["AB", "BC", "CD", "DA"].every((s) => l(s) != null) && l("AB") === l("CD") && l("BC") === l("DA")) return true;
  return null;
}
const ouiNon = (q: Q, oui: boolean) => (q.choices?.includes("vrai") ? (oui ? "vrai" : "faux") : oui ? "oui" : "non");
function choixOuiNon(q: Q, oui: boolean): string[] {
  const juste = ouiNon(q, oui);
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrCodage(q: Q): string[] {
  const n = noms(q.text)[0];
  if (!n || !q.canvas) return ["un quadrilatère nommé et une figure attendus"];
  const oui = parCodage(q.canvas);
  if (oui == null) return ["le codage ne permet pas de trancher"];
  if (!/cod|figure/.test(q.text)) return ["la question ne renvoie pas à la figure codée"];
  return [...choixOuiNon(q, oui), ...verifierFigure(q, n, true)];
}

const FAMILLE: Record<string, boolean> = { rectangle: true, losange: true, carré: true, trapèze: false };
function corrFamille(q: Q): string[] {
  const n = noms(q.text)[0];
  const f = q.text.match(/(?:d'un|par un|est un) (rectangle|losange|carré|trapèze)/)?.[1];
  if (!n || !f) return ["famille illisible"];
  const c = q.canvas as any;
  const p: string[] = [];
  if (f === "trapèze" && !/seuls les côtés/.test(q.text)) p.push("trapèze sans préciser qu'une seule paire est parallèle");
  if (c) {
    const angDroits = (c.marks?.rightAnglesAt ?? []).length === 4;
    const par = (c.marks?.parallelSides ?? []).length;
    if ((f === "rectangle" || f === "carré") !== angDroits) p.push(`un ${f} dessiné ${angDroits ? "avec" : "sans"} angles droits`);
    if (f === "trapèze" && par !== 1) p.push("le trapèze n'a pas une seule paire codée parallèle");
    if (f === "losange" && Math.abs(lg(c, "AB") / lg(c, "BC") - 1) > 0.02) p.push("losange dessiné aux côtés inégaux");
    if (f === "carré" && Math.abs(lg(c, "AB") / lg(c, "BC") - 1) > 0.02) p.push("carré dessiné aux côtés inégaux");
  }
  return [...p, ...choixOuiNon(q, FAMILLE[f]), ...verifierFigure(q, n)];
}

/** Une propriété est-elle vraie dans TOUT parallélogramme ? (d'après son énoncé) */
function toujoursVraie(prop: string, n: string): boolean | null {
  let m = prop.match(/les côtés \[([A-Z]{2})\] et \[([A-Z]{2})\] ont la même longueur/);
  if (m) return opposes(m[1], m[2]);
  m = prop.match(/les droites \(([A-Z]{2})\) et \(([A-Z]{2})\) sont parallèles/);
  if (m) return opposes(m[1], m[2]);
  m = prop.match(/les angles en ([A-Z]) et en ([A-Z]) ont la même mesure/);
  if (m) return Math.abs(n.indexOf(m[1]) - n.indexOf(m[2])) === 2;
  m = prop.match(/les angles en ([A-Z]) et en ([A-Z]) ont pour somme 180°/);
  if (m) return Math.abs(n.indexOf(m[1]) - n.indexOf(m[2])) !== 2;
  if (/se coupent en leur milieu/.test(prop)) return true;
  if (/sont perpendiculaires|ont la même longueur|est droit|partage l'angle/.test(prop)) return false;
  return null;
}
function corrToujours(q: Q): string[] {
  const n = noms(q.text)[0];
  const prop = q.text.match(/(?:sûr que |parallélogramme [A-Z]{4}, |affirmer que |vrai que )(.+?)(?: \?|\.)$/)?.[1];
  if (!n || !prop) return ["propriété illisible"];
  const v = toujoursVraie(prop, n);
  if (v == null) return [`propriété inconnue : ${prop}`];
  return [...choixOuiNon(q, v), ...verifierFigure(q, n)];
}

function corrNature(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  if (!n) return ["quadrilatère sans nom"];
  const paires = [...t.matchAll(/\(([A-Z]{2})\) (?:et \(([A-Z]{2})\) (?:sont parallèles|ne le sont pas|se coupent)|\/\/ \(([A-Z]{2})\))/g)];
  const deuxParText = /ses côtés opposés sont parallèles deux à deux/.test(t);
  const uneSeuleText = /seuls ses côtés \[([A-Z]{2})\] et \[([A-Z]{2})\] sont parallèles/.exec(t);
  let par = 0;
  const p: string[] = [];
  if (deuxParText) par = 2;
  else if (uneSeuleText) {
    par = 1;
    if (!opposes(uneSeuleText[1], uneSeuleText[2])) p.push("la paire parallèle n'est pas une paire de côtés opposés");
  } else {
    // « (X) et (Y) sont parallèles, ainsi que (Z) et (W) » ; « (X) // (Y) et que (Z) // (W) » ; négations.
    const neg = /ne le sont pas|se coupent|sans autre paire/.test(t);
    const segs = [...t.matchAll(/\(([A-Z]{2})\)/g)].map((m) => m[1]);
    if (segs.length === 2 && /sans autre paire/.test(t)) {
      if (!opposes(segs[0], segs[1])) p.push("la paire « parallèle » n'est pas une paire de côtés opposés");
      par = 1;
    } else {
      if (segs.length !== 4) return ["quatre droites attendues"];
      if (!opposes(segs[0], segs[1]) || !opposes(segs[2], segs[3])) p.push("une paire « parallèle » n'est pas une paire de côtés opposés");
      par = neg ? 1 : 2;
    }
  }
  void paires;
  const juste = par === 2 ? "un parallélogramme" : "un trapèze qui n'est pas un parallélogramme";
  return [
    ...p,
    ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]),
    ...qcmUnique(q, (c) => c === juste),
    ...verifierFigure(q, n),
  ];
}

/* ─── PROPRIÉTÉS : CÔTÉS ET ANGLES ───────────────────────────────────────── */

/** La longueur demandée : le côté opposé (ou égal) connu dans le texte. */
function corrCoteOppose(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  const cible = t.match(/(?:longueur de \[|longueur du côté \[|mesure le côté (?:opposé )?\[|longueur |mesure \[)([A-Z]{2})\]?(?:,| \?|\.)/)?.[1];
  if (!n || !cible) return ["côté demandé illisible"];
  const connus = longueurs(t).filter((x) => !memeSeg(x.s, cible));
  const opp = connus.find((x) => opposes(x.s, cible) && [...x.s].every((l) => n.includes(l)));
  if (!opp) return [`aucun côté opposé à [${cible}] dans le texte`];
  for (const x of connus) if (![...x.s].every((l) => n.includes(l)) || x.s[0] === x.s[1]) return [`[${x.s}] n'est pas un côté de ${n}`];
  return [...verifier(q, opp.v, opp.u), ...verifierFigure(q, n)];
}

/** Les angles nommés du texte, dans l'ordre : « l'angle DAB », « l'angle de sommet A », « l'angle en A ». */
function anglesNommes(t: string, n: string): { k: string; i: number }[] {
  const out: { k: string; i: number }[] = [];
  for (const m of t.matchAll(/[Ll]'angle (?:([A-Z])([A-Z])([A-Z])|de sommet ([A-Z])|en ([A-Z]))/g)) {
    if (m[2]) {
      // « DAB » : le sommet est au milieu, entouré de ses deux voisins.
      const i = n.indexOf(m[2]);
      const v = [n[(i + 3) % 4], n[(i + 1) % 4]];
      if (!(v.includes(m[1]) && v.includes(m[3]) && m[1] !== m[3])) return [{ k: "?", i: m.index! }];
      out.push({ k: m[2], i: m.index! });
    } else out.push({ k: m[4] ?? m[5], i: m.index! });
  }
  return out;
}
function corrAngle(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  if (!n) return ["quadrilatère sans nom"];
  const v = t.match(/(\d+)°/);
  if (!v) return ["angle connu illisible"];
  const val = Number(v[1]);
  const a = anglesNommes(t, n);
  if (a.some((x) => x.k === "?")) return ["un angle à trois lettres n'a pas son sommet au milieu"];
  if (!a.length || !n.includes(a[0].k)) return ["angle connu illisible"];
  const X = a[0].k;
  const opp = (u: string, w: string) => Math.abs(n.indexOf(u) - n.indexOf(w)) === 2;
  let juste: number;
  if (/somme des quatre angles/.test(t)) juste = 360;
  else {
    const somme = t.match(/somme des mesures des deux angles en ([A-Z]) et en ([A-Z])/);
    if (somme) {
      if (!opp(somme[1], somme[2]) || somme[1] === X || somme[2] === X || opp(somme[1], X) || opp(somme[2], X)) return ["les deux angles ne sont pas les voisins de l'angle connu"];
      juste = 2 * (180 - val);
    } else {
      // L'angle demandé : le premier nommé après la valeur connue.
      // (« On mesure 110° pour l'angle TUR » : la valeur vient avant son angle.)
      const Y = a[0].i > v.index! ? a[1]?.k : a.find((x) => x.i > v.index!)?.k;
      if (!Y) return ["angle demandé illisible"];
      if (Y === X) return ["l'angle demandé est l'angle connu"];
      juste = opp(X, Y) ? val : 180 - val;
    }
  }
  const p = verifier(q, juste, "°");
  // La figure : l'angle étiqueté est bien en X.
  const c = q.canvas as any;
  if (c) {
    const k = SS.find((s) => c.labels?.[s] === X);
    if (!k || etiq(c.angleLabels?.[k]) !== val) p.push(`la figure n'étiquette pas ${val}° en ${X}`);
  }
  return [...p, ...verifierFigure(q, n)];
}

/** Le périmètre à partir de deux côtés CONSÉCUTIFS. */
function perimetre(t: string, n: string | undefined): { v: number; u: string } | string {
  const l = longueurs(t);
  let a: { v: number; u: string } | undefined, b: { v: number; u: string } | undefined;
  if (l.length >= 2) {
    if (n && l.some((x) => ![...x.s].every((c) => n.includes(c)))) return "un côté hors du quadrilatère";
    if (opposes(l[0].s, l[1].s)) return "les deux côtés donnés sont opposés, pas consécutifs";
    [a, b] = l;
  } else {
    const m = t.match(new RegExp(`(?:côtés consécutifs mesurent|côtés mesurent|côtés consécutifs de) ${NB} ${U} et ${NB} ${U}`));
    if (!m) return "deux côtés consécutifs attendus";
    a = { v: num(m[1]), u: m[2] };
    b = { v: num(m[3]), u: m[4] };
  }
  if (a.u !== b.u) return "unités différentes";
  return { v: 2 * (a.v + b.v), u: a.u };
}
function corrPerimetre(q: Q): string[] {
  const n = noms(q.text)[0];
  const r = perimetre(q.text, n);
  if (typeof r === "string") return [r];
  return [...verifier(q, r.v, r.u), ...(n ? verifierFigure(q, n) : [])];
}

/* ─── DIAGONALES ─────────────────────────────────────────────────────────── */

/** Les deux diagonales du nom et leurs longueurs données. */
function diagonales(t: string, n: string) {
  const AC = sg(n, "AC");
  const BD = sg(n, "BD");
  return { AC, BD, p: longueurDe(t, AC), q: longueurDe(t, BD) };
}

function corrTriangleCentre(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  const tri = t.match(/triangle ([A-Z])([A-Z])([A-Z])/);
  if (!n || !tri) return ["triangle illisible"];
  const O = tri[1];
  const { p, q: qq } = diagonales(t, n);
  const cote = longueurDe(t, tri[2] + tri[3]);
  if (!p || !qq || !cote) return ["diagonales ou côté illisibles"];
  if (!opposes(tri[2] + tri[3], sg(n, "AC")) && false) return [];
  // [XY] est un côté : X et Y consécutifs dans le nom, l'un sur chaque diagonale.
  const i = n.indexOf(tri[2]), j = n.indexOf(tri[3]);
  if (Math.abs(i - j) % 2 !== 1) return [`[${tri[2]}${tri[3]}] n'est pas un côté de ${n}`];
  if (!new RegExp(`(?:en|centre) ${O}\\b`).test(t)) return [`${O} n'est pas le centre`];
  const juste = p.v / 2 + qq.v / 2 + cote.v;
  const pb: string[] = [];
  if (!(cote.v < p.v / 2 + qq.v / 2 && cote.v > Math.abs(p.v - qq.v) / 2)) pb.push("le triangle du centre n'existe pas");
  return [...pb, ...verifier(q, juste, "cm"), ...verifierFigure(q, n)];
}

function corrNatureDiagonales(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  if (!n) return ["quadrilatère sans nom"];
  const perp = /perpendiculaires|à angle droit/.test(t);
  let egales: boolean | null = null;
  const m = t.match(new RegExp(`([A-Z])[A-Z] = \\1[A-Z] = ${NB} cm et \\1[A-Z] = \\1[A-Z] = ${NB} cm`));
  if (/ont la même longueur|deux baguettes de/.test(t)) egales = true;
  else if (m) egales = num(m[2]) === num(m[3]);
  else if (/une baguette de (\d+) cm et une baguette de (\d+) cm/.test(t)) {
    const b = t.match(/une baguette de (\d+) cm et une baguette de (\d+) cm/)!;
    egales = b[1] === b[2];
  } else {
    const d = diagonales(t, n);
    if (d.p && d.q) egales = d.p.v === d.q.v;
    else if (/se coupent en leur milieu/.test(t)) egales = false;
  }
  if (egales == null) return ["longueurs des diagonales illisibles"];
  if (!/milieu|même milieu|[A-Z][A-Z] = [A-Z][A-Z] =/.test(t)) return ["rien ne dit que les diagonales ont le même milieu"];
  const juste = egales && perp ? "un carré" : egales ? "un rectangle" : perp ? "un losange" : "un parallélogramme, sans plus de précision";
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/** OX, la diagonale entière, ou le segment symétrique : par le milieu des diagonales. */
function corrMoitie(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  if (!n) return ["quadrilatère sans nom"];
  const O = t.match(/(?:en|centre|point) ([OI])\b/)?.[1] ?? t.match(/\b([OI])(?=[A-Z]\b| est l'intersection|, point)/)?.[1];
  if (!O) return ["centre illisible"];
  const diag = (L: string) => (sg(n, "AC").includes(L) ? sg(n, "AC") : sg(n, "BD"));
  // Ce qui est demandé (en fin de phrase).
  const fin = t.slice(t.lastIndexOf(". ", t.length - 3) + 1);
  const demandeDemi = fin.match(new RegExp(`(?:${O}([A-Z])|([A-Z])${O})(?:\\]| \\?|\\.|$)`)) ?? fin.match(new RegExp(`sommet ([A-Z]) se trouve le point ${O}`));
  const demandeDiag = fin.match(/(?:diagonale \[|longueur |Combien mesure )([A-Z]{2})\]?(?: \?|\.)/);
  const lu = longueurs(t);
  const demiConnu = t.match(new RegExp(`(?:${O}([A-Z])|([A-Z])${O})(?: =| mesure) ${NB} ${U}`)) ?? t.match(new RegExp(`à ${NB} ${U} du sommet ([A-Z])`));
  let juste: number | null = null;
  let u = "";
  if (demandeDiag && !demandeDemi) {
    const D = demandeDiag[1];
    if (!demiConnu) return ["la moitié connue est illisible"];
    // « OX = n u » (groupes 1-2 : la lettre, 3 : n, 4 : u) ou « à n u du sommet X » (1 : n, 2 : u, 3 : X).
    const enA = demiConnu[0].startsWith("à");
    const val = num(enA ? demiConnu[1] : demiConnu[3]);
    const unit = enA ? demiConnu[2] : demiConnu[4];
    const S = enA ? demiConnu[3] : (demiConnu[1] ?? demiConnu[2]);
    if (!memeSeg(diag(S), D)) return [`${O}${S} n'est pas sur la diagonale [${D}]`];
    juste = 2 * val;
    u = unit;
  } else if (demandeDemi) {
    const S = demandeDemi[1] ?? demandeDemi[2];
    const D = diag(S);
    const dl = lu.find((x) => memeSeg(x.s, D));
    if (dl) {
      juste = dl.v / 2;
      u = dl.u;
    } else if (demiConnu && !demiConnu[0].startsWith("à")) {
      const S2 = demiConnu[1] ?? demiConnu[2];
      if (S2 === S) return ["la donnée est la réponse"];
      if (!D.includes(S2)) return [`${O}${S2} n'est pas sur la même diagonale que ${O}${S}`];
      juste = num(demiConnu[3]);
      u = demiConnu[4];
    } else {
      // Rectangle ou carré : diagonales égales, on donne l'autre diagonale.
      const autre = lu.find((x) => memeSeg(x.s, D === sg(n, "AC") ? sg(n, "BD") : sg(n, "AC")));
      if (!autre || !/rectangle|carré/.test(t)) return ["la diagonale de " + S + " est inconnue"];
      juste = autre.v / 2;
      u = autre.u;
    }
  }
  if (juste == null) return ["question illisible"];
  return [...verifier(q, juste, u), ...verifierFigure(q, n)];
}

function corrCasParticulier(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  if (!n) return ["quadrilatère sans nom"];
  if (/losange/.test(t)) {
    const p = verifier(q, 90, "°");
    if (!/angle|baguettes/.test(t)) p.push("question illisible");
    return [...p, ...verifierFigure(q, n)];
  }
  if (!/rectangle|carré/.test(t)) return ["famille illisible"];
  const c = q.canvas as any;
  const p: string[] = [];
  if (c && (c.marks?.rightAnglesAt ?? []).length !== 4) p.push("rectangle dessiné sans ses angles droits");
  return [...p, ...corrMoitie(q)];
}

/* ─── MONTRER ─────────────────────────────────────────────────────────────── */

/** Ce que disent les données : paires parallèles, paires égales, milieux des diagonales. */
function donnees(d: string, n: string) {
  const par: string[][] = [...d.matchAll(/\(([A-Z]{2})\) \/\/ \(([A-Z]{2})\)/g)].map((m) => [m[1], m[2]]);
  const eg: string[][] = [];
  for (const m of d.matchAll(/(?<![A-Z(])([A-Z]{2}) = ([A-Z]{2})(?![A-Z])/g)) eg.push([m[1], m[2]]);
  // « AD = 7 cm et BC = 3 cm » : deux longueurs différentes, pas une égalité.
  const lu = longueurs(d).filter((x) => x.s.length === 2 && [...x.s].every((l) => n.includes(l)));
  for (let i = 0; i < lu.length; i++)
    for (let j = i + 1; j < lu.length; j++) if (lu[i].v === lu[j].v && !eg.some((e) => (memeSeg(e[0], lu[i].s) && memeSeg(e[1], lu[j].s)) || (memeSeg(e[1], lu[i].s) && memeSeg(e[0], lu[j].s)))) eg.push([lu[i].s, lu[j].s]);
  const O = d.match(/\b([OI])\b/)?.[1];
  let milieux = 0;
  if (/milieu de \[[A-Z]{2}\] et (?:de|celui de) \[[A-Z]{2}\]|ont le même milieu|se coupent en leur milieu/.test(d)) milieux = 2;
  else if (O) {
    const m1 = d.match(new RegExp(`${O}([A-Z]) = ${O}([A-Z]) = ${NB}`, "g")) ?? [];
    milieux = m1.filter((s) => {
      const x = s.match(new RegExp(`${O}([A-Z]) = ${O}([A-Z])`))!;
      return Math.abs(n.indexOf(x[1]) - n.indexOf(x[2])) === 2;
    }).length;
    if (/est le milieu de \[[A-Z]{2}\]$|est le milieu de \[[A-Z]{2}\](?! et)/.test(d)) milieux = Math.max(milieux, 1);
  }
  const parOpp = par.filter(([a, b]) => opposes(a, b));
  const egOpp = eg.filter(([a, b]) => opposes(a, b));
  const unCouple = parOpp.some(([a, b]) => egOpp.some(([c, e]) => (memeSeg(a, c) && memeSeg(b, e)) || (memeSeg(a, e) && memeSeg(b, c))));
  return { parOpp: parOpp.length, egOpp: egOpp.length, milieux, unCouple };
}
const estPara = (x: ReturnType<typeof donnees>) => x.parOpp >= 2 || x.egOpp >= 2 || x.milieux >= 2 || x.unCouple;

/** Les données du texte (« on sait que … ») prouvent-elles « parallélogramme » ? */
function corrPreuve(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  const d = t.match(/(?:on sait que |on relève dans le quadrilatère [A-Z]{4} : |« |Dans [A-Z]{4}, |information sur le quadrilatère [A-Z]{4} : |le quadrilatère [A-Z]{4} : |le quadrilatère [A-Z]{4}, |Savoir seulement que |suffit-elle pour conclure que c'est un parallélogramme : « )(.+?)(?:\. [A-Z]| »|, donc|, est-ce| \?)/)?.[1];
  if (!n || !d) return ["données illisibles"];
  const x = donnees(d, n);
  const oui = estPara(x);
  const p: string[] = [];
  // Les données chiffrées ne se contredisent pas : OB = x + y et OD = y, c'est bien « pas le milieu ».
  return [...p, ...choixOuiNon(q, oui), ...(q.canvas ? verifierFigure(q, n) : [])];
}

const P1 = "côtés opposés parallèles deux à deux";
const P2 = "côtés opposés de même longueur deux à deux";
const P3 = "diagonales qui se coupent en leur milieu";
const P4 = "un couple de côtés opposés parallèles et de même longueur";
function corrQuellePropriete(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  const d = t.match(/(?:dans [A-Z]{4} : |constate que |Dans le quadrilatère [A-Z]{4}, )(.+?)(?:\. (?:Quelle|Sur|Pour))/)?.[1];
  if (!n || !d) return ["données illisibles"];
  const x = donnees(d, n);
  const juste = x.parOpp >= 2 ? P1 : x.unCouple ? P4 : x.egOpp >= 2 ? P2 : x.milieux >= 2 ? P3 : null;
  if (!juste) return ["les données ne prouvent rien"];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

const DEFI = "un quadrilatère dont les côtés opposés sont parallèles deux à deux est un parallélogramme (définition)";
const LONG = "un quadrilatère non croisé dont les côtés opposés ont la même longueur deux à deux est un parallélogramme";
const DIAG = "un quadrilatère dont les diagonales se coupent en leur milieu est un parallélogramme";
function corrJustifier(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  const d = t.match(/(?:l'on sait que |, |où )(.+?)\. /)?.[1];
  if (!n || !d) return ["données illisibles"];
  const x = donnees(d, n);
  const juste = x.parOpp >= 2 ? DEFI : x.egOpp >= 2 ? LONG : x.milieux >= 2 ? DIAG : null;
  if (!juste) return ["les données ne prouvent rien"];
  const p: string[] = [];
  if (q.comparator === "contains_keyword" || q.format === "open") p.push("question ouverte à mots-clés");
  return [...p, ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/* ─── AIRE ET PROBLÈMES ───────────────────────────────────────────────────── */

/**
 * Base, hauteur et côté incliné, lus dans le texte : chaque mesure est classée
 * par ce qui la précède depuis la mesure précédente (« hauteur », « distance »,
 * « base », le segment de la base, un autre côté).
 */
function baseHauteur(t: string, n: string | undefined) {
  const out: { base?: number; h?: number; cote?: number; u?: string; aire?: number } = {};
  const baseSeg = t.match(/(?:relative à|sur|base) \[([A-Z]{2})\]/)?.[1] ?? t.match(/droites \(([A-Z]{2})\)/)?.[1] ?? (n ? sg(n, "AB") : "");
  // « Ses côtés mesurent 12 m et 8 m, et la distance entre ses deux côtés de 12 m est de 4 m »
  const sp = t.match(new RegExp(`côtés mesurent ${NB} ${U} et ${NB} ${U}, et la distance entre ses deux côtés de ${NB} ${U} est de ${NB} ${U}`));
  if (sp) return { base: num(sp[5]), h: num(sp[7]), cote: num(sp[1]) === num(sp[5]) ? num(sp[3]) : num(sp[1]), u: sp[2] };
  const re = new RegExp(`${NB} (cm²|m²|cm|dm|m|km)(?![a-zé²])`, "g");
  let prec = 0;
  const pre = t
    .replace(/\[([A-Z]{2})\] et \[([A-Z]{2})\] mesurent (\S+) (\S+) et/, "[$1] mesure $3 $4 et [$2] mesure")
    // « HK = 16 cm est la hauteur sur [EF] » : la hauteur est nommée APRÈS sa mesure.
    .replace(/([A-Z]{2}) = (\d+) (cm|m) est la hauteur/, "la hauteur $1 = $2 $3, qui est la hauteur");
  for (const m of pre.matchAll(re)) {
    const avant = pre.slice(prec, m.index);
    prec = m.index! + m[0].length;
    const v = num(m[1]);
    if (m[2].endsWith("²")) {
      out.aire = v;
      continue;
    }
    out.u = m[2];
    if (/hauteur|distance|distants/.test(avant)) out.h = v;
    else if (/base/.test(avant) || (baseSeg && new RegExp(`(?<![A-Z])\\[?(${baseSeg}|${[...baseSeg].reverse().join("")})\\]?(?![A-Z])`).test(avant))) out.base = v;
    else out.cote = v;
  }
  return out;
}

function corrAire(q: Q): string[] {
  const n = noms(q.text)[0];
  const b = baseHauteur(q.text, n);
  if (b.base == null || b.h == null) return [`base ou hauteur illisible (${JSON.stringify(b)})`];
  const p: string[] = [];
  if (b.cote != null && b.cote <= b.h) p.push(`côté incliné ${b.cote} plus court que la hauteur ${b.h}`);
  return [...p, ...verifier(q, b.base * b.h, `${b.u}²`), ...(n ? verifierFigure(q, n) : [])];
}

function corrAireAnnoncee(q: Q): string[] {
  const n = noms(q.text)[0];
  const ann = q.text.match(/(?:vaut|trouve|est|indique) (\d+) cm²/);
  const b = baseHauteur(q.text.replace(/(?:vaut|trouve|est|indique) \d+ cm²/, ""), n);
  if (!ann || b.base == null || b.h == null || b.cote == null) return ["données illisibles"];
  const juste = Number(ann[1]) === b.base * b.h;
  const p: string[] = [];
  if (b.cote <= b.h) p.push("côté incliné plus court que la hauteur");
  return [...p, ...choixOuiNon(q, juste), ...(n ? verifierFigure(q, n) : [])];
}

/** La hauteur ou la base, à partir de l'aire. */
function corrInverse(q: Q): string[] {
  const n = noms(q.text)[0];
  const b = baseHauteur(q.text, n);
  if (b.aire == null) return ["aire illisible"];
  // Exactement l'une des deux est donnée : l'autre est demandée.
  let juste: number;
  if (b.base != null && b.h == null) juste = b.aire / b.base;
  else if (b.h != null && b.base == null) juste = b.aire / b.h;
  else return [`question illisible (${JSON.stringify(b)})`];
  if (!/hauteur|distance|base|longueur|mesure/.test(q.text.slice(q.text.lastIndexOf(". ") + 1))) return ["grandeur demandée illisible"];
  return [...verifier(q, juste, b.u ?? ""), ...(n ? verifierFigure(q, n) : [])];
}

function corrDeuxHauteurs(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  if (!n) return ["quadrilatère sans nom"];
  const AB = longueurDe(t, sg(n, "AB")) ?? (() => {
    const m = t.match(new RegExp(`base \\[${sg(n, "AB")}\\] de ${NB} cm`));
    return m ? { s: sg(n, "AB"), v: num(m[1]), u: "cm" } : null;
  })();
  const AD = longueurDe(t, sg(n, "AD")) ?? (() => {
    const m = t.match(new RegExp(`\\[${sg(n, "AD")}\\], longue de ${NB} cm`));
    return m ? { s: sg(n, "AD"), v: num(m[1]), u: "cm" } : null;
  })();
  const h1 = t.match(new RegExp(`(?:hauteur (?:relative à|sur la base|sur) \\[${sg(n, "AB")}\\]|distance entre \\(${sg(n, "AB")}\\) et \\(${sg(n, "CD")}\\)|\\[${sg(n, "AB")}\\] de \\d+ cm, la hauteur)(?: mesure| vaut| est)? ${NB} cm`));
  if (!AB || !AD || !h1) return ["côtés ou hauteur illisibles"];
  const aire = AB.v * num(h1[1]);
  const p: string[] = [];
  if (num(h1[1]) >= AD.v) p.push("la hauteur sur [AB] dépasse le côté [AD]");
  const h2 = aire / AD.v;
  if (h2 >= AB.v) p.push("la seconde hauteur dépasse le côté [AB]");
  const veutAire = /Quelle est l'aire|Calcule son aire/.test(t);
  return [...p, ...(veutAire ? verifier(q, aire, "cm²") : verifier(q, h2, "cm")), ...verifierFigure(q, n)];
}

function corrCout(q: Q): string[] {
  const n = noms(q.text)[0];
  const prix = q.text.match(/(\d+) € le m²/);
  const b = baseHauteur(q.text.replace(/\d+ € le m²/, ""), n);
  if (!prix || b.base == null || b.h == null) return ["données illisibles"];
  return verifier(q, b.base * b.h * Number(prix[1]), "€");
}

function corrCloture(q: Q): string[] {
  const n = noms(q.text)[0];
  const ouv = q.text.match(/ouverture de (\d+) m/);
  const r = perimetre(q.text.replace(/ouverture de \d+ m/, ""), n);
  if (typeof r === "string") return [r];
  return verifier(q, r.v - (ouv ? Number(ouv[1]) : 0), "m");
}

function corrAutreCote(q: Q): string[] {
  const t = q.text;
  const n = noms(t)[0];
  const P = t.match(new RegExp(`(?:périmètre (?:est de|vaut)|Il faut|tour de [A-Z]{4} mesure) ${NB} ${U}`));
  const cible = t.match(/(?:longueur |côté \[|calcule |longueur du côté \[)([A-Z]{2})\]?(?: \?|\.|,)/)?.[1];
  if (!n || !P || !cible) return ["données illisibles"];
  const connu = longueurs(t).find((x) => !memeSeg(x.s, cible));
  if (!connu) return ["côté connu illisible"];
  if (opposes(connu.s, cible)) return ["le côté connu est opposé au côté cherché"];
  const juste = num(P[1]) / 2 - connu.v;
  if (juste <= 0) return ["côté négatif"];
  return verifier(q, juste, P[2]);
}

function corrAireOuPerimetre(q: Q): string[] {
  return /périmètre|tour/.test(q.text) ? corrPerimetre(q) : corrAire(q);
}

/* ─── DÉFIS ───────────────────────────────────────────────────────────────── */

/** « tout X est un Y » : vrai si X = Y, si X est le carré, ou si Y est le parallélogramme. */
const inclus = (x: string, y: string) => x === y || x === "carré" || y === "parallélogramme";

function corrInclusions(q: Q): string[] {
  const fam = [...q.text.matchAll(/(carré|rectangle|losange|parallélogramme)/g)].map((m) => m[1]);
  // Deux questions : X → Y puis Y → X.
  const paires: [string, string][] = [];
  const re = /(?:[Uu]n|si [A-Z]{4} est un|« Tout) (carré|rectangle|losange|parallélogramme)[^?»]*?(?:toujours un|forcément un|est un) (carré|rectangle|losange|parallélogramme)/g;
  for (const m of q.text.matchAll(re)) paires.push([m[1], m[2]]);
  if (paires.length !== 2 || fam.length < 4) return [`deux questions attendues (${paires.length})`];
  const juste = paires.map(([x, y]) => (inclus(x, y) ? "oui" : "non")).join(" / ");
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrInclusion(q: Q): string[] {
  const m =
    q.text.match(/est un (carré|rectangle|losange|parallélogramme)[^?]*?(?:forcément un|aussi un|c'est un) (carré|rectangle|losange|parallélogramme)/) ??
    q.text.match(/tout (carré|rectangle|losange|parallélogramme) est un (carré|rectangle|losange|parallélogramme)/) ??
    q.text.match(/par un (carré|rectangle|losange|parallélogramme) [A-Z]{4}\. Peut-on affirmer que [A-Z]{4} est aussi un (carré|rectangle|losange|parallélogramme)/);
  if (!m) return ["familles illisibles"];
  if (m[1] === m[2]) return ["deux fois la même famille"];
  return choixOuiNon(q, inclus(m[1], m[2]));
}

/** Les mesures d'un parallélogramme NOMMÉ : « N : base a u, hauteur b u », « N a une base de a … ». */
function mesuresDe(t: string, N: string) {
  const b = t.match(new RegExp(`${N}[^.;]*?base (?:de )?${NB} ${U}`));
  const h = t.match(new RegExp(`${N}(?: :| \\(| a une base| une base| a pour)[^.;]*?hauteur (?:de )?${NB} ${U}`)) ?? t.match(new RegExp(`${N}, de base \\d+ cm et de hauteur ${NB} ${U}`));
  return { b: b ? num(b[1]) : null, h: h ? num(h[1]) : null, u: b?.[2] ?? h?.[2] ?? "" };
}

function corrMemeAire(q: Q): string[] {
  const ns = noms(q.text);
  if (ns.length !== 2 || [...ns[0]].some((l) => ns[1].includes(l))) return ["deux quadrilatères sans lettre commune attendus"];
  const m = ns.map((N) => mesuresDe(q.text, N));
  const i = m.findIndex((x) => x.h == null);
  if (i < 0 || m[1 - i].h == null || m[i].b == null || m[1 - i].b == null) return [`mesures illisibles ${JSON.stringify(m)}`];
  return verifier(q, (m[1 - i].b! * m[1 - i].h!) / m[i].b!, "cm");
}

function corrComparerAires(q: Q): string[] {
  const ns = noms(q.text);
  if (ns.length !== 2) return ["deux quadrilatères attendus"];
  const m = ns.map((N) => mesuresDe(q.text, N));
  if (m.some((x) => x.b == null || x.h == null)) return [`mesures illisibles ${JSON.stringify(m)}`];
  const [a1, a2] = m.map((x) => x.b! * x.h!);
  const juste = a1 > a2 ? `le parallélogramme ${ns[0]}` : a2 > a1 ? `le parallélogramme ${ns[1]}` : "les deux ont la même aire";
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrRectangle(q: Q): string[] {
  const r = q.text.match(new RegExp(`${NB} cm (?:sur|par) ${NB} cm`));
  const h = q.text.match(/hauteur(?: de [A-Z]{4})?(?: relative à \[[A-Z]{2}\])? (?:mesure |vaut |de )?(\d+) cm/);
  if (!r || !h) return ["rectangle ou hauteur illisible"];
  const juste = (num(r[1]) * num(r[2])) / Number(h[1]);
  const p: string[] = [];
  if (!ent(juste)) p.push("base non entière");
  return [...p, ...verifier(q, juste, "cm")];
}

const MULT: Record<string, number> = { double: 2, triple: 3, quadruple: 4 };
function corrMultiplier(q: Q): string[] {
  const t = q.text;
  const kb = /sans changer sa base/.test(t) ? 1 : MULT[t.match(/on (double|triple|quadruple) sa base/)?.[1] ?? ""];
  const kh = /sans changer sa hauteur/.test(t) ? 1 : MULT[t.match(/on (double|triple|quadruple) sa hauteur/)?.[1] ?? ""];
  if (!kb || !kh) return ["transformation illisible"];
  if (kb * kh === 1) return ["rien ne change"];
  const b = t.match(/base de (\d+) cm et une hauteur de (\d+) cm/);
  const a = t.match(/aire de (\d+) cm²/);
  if (/nouvelle aire/.test(t)) {
    const aire = b ? Number(b[1]) * Number(b[2]) : a ? Number(a[1]) : null;
    if (aire == null) return ["aire de départ illisible"];
    return verifier(q, aire * kb * kh, "cm²");
  }
  return verifier(q, kb * kh, "");
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  quadrilatere_parallelogramme_reconnaitre_tpl_1: corrCodage,
  quadrilatere_parallelogramme_reconnaitre_tpl_2: corrFamille,
  quadrilatere_parallelogramme_reconnaitre_tpl_3: corrToujours,
  quadrilatere_parallelogramme_reconnaitre_tpl_4: corrNature,
  quadrilatere_parallelogramme_propriete_tpl_1: corrCoteOppose,
  quadrilatere_parallelogramme_propriete_tpl_2: corrAngle,
  quadrilatere_parallelogramme_propriete_tpl_3: corrPerimetre,
  quadrilatere_parallelogramme_propriete_tpl_4: corrAngle,
  quadrilatere_parallelogramme_propriete_tpl_5: corrCoteOppose,
  quadrilatere_parallelogramme_diagonale_tpl_1: corrTriangleCentre,
  quadrilatere_parallelogramme_diagonale_tpl_2: corrNatureDiagonales,
  quadrilatere_parallelogramme_diagonale_tpl_3: corrMoitie,
  quadrilatere_parallelogramme_diagonale_tpl_4: corrMoitie,
  quadrilatere_parallelogramme_diagonale_tpl_5: corrMoitie,
  quadrilatere_parallelogramme_diagonale_tpl_6: corrCasParticulier,
  quadrilatere_parallelogramme_montrer_tpl_1: corrPreuve,
  quadrilatere_parallelogramme_montrer_tpl_2: corrPreuve,
  quadrilatere_parallelogramme_montrer_tpl_3: corrQuellePropriete,
  quadrilatere_parallelogramme_montrer_tpl_4: corrPreuve,
  quadrilatere_parallelogramme_aire_tpl_1: corrAire,
  quadrilatere_parallelogramme_aire_tpl_2: corrAireAnnoncee,
  quadrilatere_parallelogramme_aire_tpl_3: corrAire,
  quadrilatere_parallelogramme_aire_tpl_4: corrInverse,
  quadrilatere_parallelogramme_aire_tpl_5: corrInverse,
  quadrilatere_parallelogramme_aire_tpl_6: corrDeuxHauteurs,
  quadrilatere_parallelogramme_aire_tpl_7: corrAire,
  quadrilatere_parallelogramme_probleme_tpl_1: corrCout,
  quadrilatere_parallelogramme_probleme_tpl_2: corrAire,
  quadrilatere_parallelogramme_probleme_tpl_3: corrCloture,
  quadrilatere_parallelogramme_probleme_tpl_4: corrAutreCote,
  quadrilatere_parallelogramme_probleme_tpl_5: corrInverse,
  quadrilatere_parallelogramme_probleme_tpl_6: corrAngle,
  quadrilatere_parallelogramme_probleme_tpl_7: corrAireOuPerimetre,
  quadrilatere_parallelogramme_defi_tpl_1: corrInclusions,
  quadrilatere_parallelogramme_defi_tpl_2: corrJustifier,
  quadrilatere_parallelogramme_defi_tpl_3: corrMemeAire,
  quadrilatere_parallelogramme_defi_tpl_4: corrComparerAires,
  quadrilatere_parallelogramme_defi_tpl_5: corrRectangle,
  quadrilatere_parallelogramme_defi_tpl_6: corrMultiplier,
  quadrilatere_parallelogramme_defi_tpl_7: corrInclusion,
});
