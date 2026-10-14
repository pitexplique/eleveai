import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4, TriangleCanvasData } from "@/lib/tutor-v4/types";
import { anglesFig, cotesFig } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/triangles";

// LES CORRECTEURS DE triangles.bank.ts (notion triangle_figure, 13/10/2026).
// Ils relisent le TEXTE (le nom du triangle, « l’angle en X mesure 35° »,
// « XY = 4 cm », « isocèle en X », « rectangle en X », les trois longueurs
// d'un triangle à construire) et la FIGURE (coordonnées des sommets, noms,
// étiquettes d'angles et de côtés, codages) ; ils vérifient que le dessin dit
// la même chose que le texte, puis refont le raisonnement : vocabulaire,
// nature, somme des angles, inégalité triangulaire, construction. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Cle = "A" | "B" | "C";
const CLES: Cle[] = ["A", "B", "C"];
const num = (s: string) => Number(String(s).replace(/\s/g, "").replace(",", "."));
const egal = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;

function qcmUnique(q: Q, juste: (c: string) => boolean): string[] {
  if (q.format !== "qcm") return [`format ${q.format} au lieu d’un QCM`];
  const justes = (q.choices ?? []).filter(juste);
  if (justes.length !== 1) return [`${justes.length} proposition(s) juste(s) : ${justes.join(" | ") || "aucune"}`];
  if (justes[0] !== q.expected[0]) return [`réponse attendue « ${q.expected[0]} », recalculée « ${justes[0]} »`];
  return [];
}
/** Une réponse chiffrée avec son unité (« ° » ou « cm »). */
function attendu(q: Q, juste: number, unite: "°" | "cm", quoi = "recalculé"): string[] {
  const p: string[] = [];
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?)\s*(°|cm)?$/);
  if (!m) return [`réponse attendue illisible « ${q.expected[0]} »`];
  if (!egal(num(m[1]), juste, 1e-9)) p.push(`attendu « ${q.expected[0]} », ${quoi} : ${juste} ${unite}`);
  if ((m[2] ?? "") !== unite) p.push(`unité « ${unite} » absente de la réponse « ${q.expected[0]} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  for (const x of String(q.expected[0]).matchAll(/\d+,(\d+)/g)) if (x[1].length > 2) p.push("plus de deux décimales");
  return p;
}
const seg = (x: string, y: string) => `[${[x, y].sort().join("")}]`;

/* ─── LA FIGURE ────────────────────────────────────────────────────────── */

type Fig = { f: TriangleCanvasData; cle: Record<string, Cle>; nom: Record<Cle, string>; ang: Record<Cle, number>; cot: Record<string, number> };
function lireFig(q: Q): Fig | null {
  const f = q.canvas as TriangleCanvasData | undefined;
  if (!f || f.kind !== "triangle") return null;
  const nom = { A: f.labels?.A ?? "A", B: f.labels?.B ?? "B", C: f.labels?.C ?? "C" } as Record<Cle, string>;
  const cle: Record<string, Cle> = {};
  for (const k of CLES) cle[nom[k]] = k;
  const c = cotesFig(f);
  const cot: Record<string, number> = {};
  const paire = (u: Cle, v: Cle, l: number) => {
    cot[nom[u] + nom[v]] = l;
    cot[nom[v] + nom[u]] = l;
  };
  paire("A", "B", c.AB);
  paire("B", "C", c.BC);
  paire("C", "A", c.CA);
  return { f, cle, nom, ang: anglesFig(f), cot };
}
const COTE_CLE: Record<string, [Cle, Cle]> = { AB: ["A", "B"], BC: ["B", "C"], CA: ["C", "A"] };

/** Les angles écrits dans le texte : « l’angle en X mesure 35° » → { X: 35 }. */
function anglesTexte(t: string): Record<string, number> {
  const r: Record<string, number> = {};
  for (const m of t.matchAll(/angle en ([A-Z]) (?:qui )?(?:mesure|vaut) (\d+)°/g)) r[m[1]] = num(m[2]);
  for (const m of t.matchAll(/angle ([A-Z])([A-Z])([A-Z]) (?:mesure|vaut) (\d+)°/g)) r[m[2]] = num(m[4]);
  return r;
}
/** Les côtés écrits dans le texte : « XY = 4 cm », « [XY] mesure 4 cm ». */
function cotesTexte(t: string): Record<string, number> {
  const r: Record<string, number> = {};
  for (const m of t.matchAll(/(?<![A-Z[])([A-Z])([A-Z]) = (\d+(?:,\d+)?) cm/g)) r[m[1] + m[2]] = r[m[2] + m[1]] = num(m[3]);
  for (const m of t.matchAll(/\[([A-Z])([A-Z])\] mesure (\d+(?:,\d+)?) cm/g)) r[m[1] + m[2]] = r[m[2] + m[1]] = num(m[3]);
  return r;
}

/** Le dessin dit-il ce que dit le texte ? */
function verifierFig(q: Q, F: Fig): string[] {
  const p: string[] = [];
  const t = q.text;
  const { f, ang, cot, cle, nom } = F;
  for (const k of CLES) {
    const pt = f.points[k];
    if (pt.x < 10 || pt.x > (f.size?.width ?? 280) - 10 || pt.y < 10 || pt.y > (f.size?.height ?? 240) - 10) p.push(`sommet ${nom[k]} hors du cadre`);
  }
  if (new Set(Object.values(nom)).size !== 3) p.push("deux sommets portent le même nom");
  const nomT = t.match(/triangle ([A-Z])([A-Z])([A-Z])(?![A-Za-z])/);
  if (nomT && [nomT[1], nomT[2], nomT[3]].sort().join("") !== Object.values(nom).sort().join(""))
    p.push(`le texte nomme le triangle ${nomT[1]}${nomT[2]}${nomT[3]}, la figure ${nom.A}${nom.B}${nom.C}`);
  // Les étiquettes d'angles = le dessin.
  for (const k of CLES) {
    const l = f.angleLabels?.[k];
    const m = l?.match(/^(\d+)°$/);
    if (m && Math.abs(ang[k] - num(m[1])) > 1) p.push(`angle en ${nom[k]} étiqueté ${l}, dessiné ${ang[k].toFixed(1)}°`);
  }
  // Les angles du texte = le dessin.
  for (const [s, v] of Object.entries(anglesTexte(t))) {
    if (!cle[s]) p.push(`angle en ${s} : pas de sommet ${s} sur la figure`);
    else if (Math.abs(ang[cle[s]] - v) > 1) p.push(`angle en ${s} : ${v}° dans le texte, ${ang[cle[s]].toFixed(1)}° sur la figure`);
  }
  // Les longueurs (texte et étiquettes) sont proportionnelles au dessin.
  const rapports: [string, number][] = [];
  for (const [s, v] of Object.entries(cotesTexte(t))) if (cot[s] !== undefined) rapports.push([s, cot[s] / v]);
  for (const [s, l] of Object.entries(f.sideLabels ?? {})) {
    const m = String(l).match(/^(\d+(?:,\d+)?) cm$/);
    if (m) {
      const [u, v] = COTE_CLE[s];
      rapports.push([nom[u] + nom[v], cot[nom[u] + nom[v]] / num(m[1])]);
    }
  }
  if (rapports.length > 1) {
    const r0 = rapports[0][1];
    for (const [s, r] of rapports) if (Math.abs(r / r0 - 1) > 0.02) p.push(`le côté ${s} n’est pas à l’échelle du dessin`);
  }
  // Codages.
  if (f.marks?.rightAngleAt && Math.abs(ang[f.marks.rightAngleAt] - 90) > 1) p.push(`angle droit codé en ${nom[f.marks.rightAngleAt]}, dessiné ${ang[f.marks.rightAngleAt].toFixed(1)}°`);
  for (const [s1, s2] of f.marks?.equalSides ?? []) {
    const l1 = cotesFig(f)[s1], l2 = cotesFig(f)[s2];
    if (Math.abs(l1 / l2 - 1) > 0.01) p.push(`côtés ${s1} et ${s2} codés égaux, dessinés ${l1.toFixed(0)} et ${l2.toFixed(0)}`);
  }
  // « rectangle en X », « isocèle en X » : sur le dessin aussi.
  const rect = t.match(/rectangle en ([A-Z])/);
  if (rect && cle[rect[1]] && Math.abs(ang[cle[rect[1]]] - 90) > 1) p.push(`triangle dit rectangle en ${rect[1]}, angle dessiné ${ang[cle[rect[1]]].toFixed(1)}°`);
  const iso = t.match(/isocèle en ([A-Z])/);
  if (iso && cle[iso[1]]) {
    const [u, v] = CLES.filter((k) => k !== cle[iso[1]]);
    if (Math.abs(cot[iso[1] + nom[u]] / cot[iso[1] + nom[v]] - 1) > 0.01) p.push(`triangle dit isocèle en ${iso[1]}, côtés dessinés inégaux`);
  }
  return p;
}

/* ─── TRIANGLE_RECONNAITRE ─────────────────────────────────────────────── */

function corrigerReconnaitre(q: Q): string[] {
  const t = q.text;
  const F = lireFig(q);
  if (!F) return ["pas de figure"];
  const p = verifierFig(q, F);
  const S = Object.values(F.nom);
  const est = (x: string) => S.includes(x);
  const ch = q.choices ?? [];
  // Les segments s'écrivent dans l'ordre alphabétique (convention du fichier).
  for (const m of [t, ...ch].join(" ").matchAll(/\[([A-Z])([A-Z])\]/g)) if (m[1] > m[2]) p.push(`segment écrit à l’envers : ${m[0]}`);
  let m: RegExpMatchArray | null;
  let juste: (c: string) => boolean;
  if (/Combien/.test(t)) juste = (c) => c === "3";
  else if ((m = t.match(/Le point ([A-Z]) est-il un sommet/))) juste = (c) => c === (est(m![1]) ? "oui" : "non");
  else if (/sommets/.test(t))
    juste = (c) => {
      const x = c.match(/^([A-Z]), ([A-Z]) et ([A-Z])$/);
      return !!x && [x[1], x[2], x[3]].sort().join("") === [...S].sort().join("");
    };
  else if ((m = t.match(/opposé au sommet ([A-Z])|ne touche pas le sommet ([A-Z])/))) {
    const s = m[1] ?? m[2];
    juste = (c) => {
      const x = c.match(/^\[([A-Z])([A-Z])\]$/);
      return !!x && est(x[1]) && est(x[2]) && x[1] !== x[2] && x[1] !== s && x[2] !== s;
    };
  } else if ((m = t.match(/sommet est opposé au côté \[([A-Z])([A-Z])\]|côté \[([A-Z])([A-Z])\] est opposé à quel sommet/))) {
    const [u, v] = m[1] ? [m[1], m[2]] : [m[3], m[4]];
    juste = (c) => est(c) && c !== u && c !== v;
  } else if ((m = t.match(/(?:côtés|entre) \[([A-Z])([A-Z])\] et \[([A-Z])([A-Z])\]/))) {
    const a = [m[1], m[2]], b = [m[3], m[4]];
    const commun = a.find((x) => b.includes(x));
    if (!commun) return [...p, "les deux côtés n’ont pas de sommet commun"];
    const autres = [...a, ...b].filter((x) => x !== commun).sort().join("");
    if (ch.some((c) => c.startsWith("l’angle")))
      juste = (c) => {
        const x = c.match(/^l’angle ([A-Z])([A-Z])([A-Z])$/);
        return !!x && x[2] === commun && [x[1], x[3]].sort().join("") === autres;
      };
    else juste = (c) => c === commun;
  } else if ((m = t.match(/angles ([A-Z])([A-Z])([A-Z]) et ([A-Z])([A-Z])([A-Z])/))) {
    const s1 = m[2], s2 = m[5];
    juste = (c) => c === seg(s1, s2);
  } else return [...p, "question non reconnue"];
  return [...p, ...qcmUnique(q, juste)];
}

/* ─── TRIANGLE_NATURE ──────────────────────────────────────────────────── */

/** La nature d'un triangle de côtés l (trois longueurs) : une seule, ou « ambigu ». */
function natureCotes(l: number[]): string {
  const [p, q, r] = [...l].sort((x, y) => x - y);
  const droit = Math.abs(p * p + q * q - r * r) < 0.005 * r * r;
  const eg = new Set(l).size;
  if (droit && eg < 3) return "ambigu";
  if (eg === 1) return "équilatéral";
  if (droit) return "rectangle";
  if (Math.abs(p * p + q * q - r * r) < 0.06 * r * r) return "presque rectangle";
  return eg === 2 ? "isocèle" : "quelconque";
}
function natureAngles(a: number[]): string {
  const eg = new Set(a).size;
  if (a.includes(90) && eg < 3) return "ambigu";
  if (a.includes(90)) return "rectangle";
  if (eg === 1) return "équilatéral";
  return eg === 2 ? "isocèle" : "quelconque";
}
function corrigerNature(q: Q): string[] {
  const t = q.text;
  const F = lireFig(q);
  if (!F) return ["pas de figure"];
  const p = verifierFig(q, F);
  const S = Object.values(F.nom);
  const L = cotesTexte(t);
  const A = anglesTexte(t);
  const lg = (u: string, v: string) => L[u + v];
  const troisCotes = S.every((u) => S.every((v) => u === v || lg(u, v) !== undefined));
  let juste: (c: string) => boolean;
  if (/isocèle/.test(t) && /(?:quel sommet|sommet principal)/.test(t)) {
    if (!troisCotes) return [...p, "longueurs illisibles"];
    const s = S.filter((x) => {
      const [u, v] = S.filter((y) => y !== x);
      return lg(x, u) === lg(x, v);
    });
    if (s.length !== 1) return [...p, `${s.length} sommet(s) principal(aux) possible(s)`];
    juste = (c) => c === s[0];
  } else if (/rectangle : en quel sommet|angle droit \?/.test(t)) {
    const connus = Object.entries(A);
    if (connus.length !== 2) return [...p, "deux angles attendus dans le texte"];
    const s = S.find((x) => A[x] === undefined)!;
    if (180 - connus[0][1] - connus[1][1] !== 90) p.push(`l’angle en ${s} mesure ${180 - connus[0][1] - connus[1][1]}°, pas 90°`);
    juste = (c) => c === s;
  } else {
    let nat: string;
    if (troisCotes) nat = natureCotes(S.map((u, i) => lg(u, S[(i + 1) % 3])));
    else if (Object.keys(A).length === 2) {
      const v = Object.values(A);
      nat = natureAngles([...v, 180 - v[0] - v[1]]);
    } else {
      const m = F.f.marks ?? {};
      const eg = m.equalSides?.length ?? 0;
      if (m.rightAngleAt && eg) nat = "ambigu";
      else nat = m.rightAngleAt ? "rectangle" : eg >= 2 ? "équilatéral" : eg === 1 ? "isocèle" : "illisible";
    }
    if (["ambigu", "illisible", "presque rectangle"].includes(nat)) return [...p, `nature ${nat}`];
    if (nat === "équilatéral" && (q.choices ?? []).includes("isocèle")) p.push("« isocèle » proposé à côté d’un équilatéral juste : deux bonnes réponses");
    juste = (c) => c === nat;
  }
  return [...p, ...qcmUnique(q, juste)];
}

/* ─── TRIANGLE_CONSTRUIRE ──────────────────────────────────────────────── */

/** Les trois longueurs forment-elles un vrai triangle (marge d'au moins 0,5 cm) ? */
const constructible = (l: number[]) => {
  const [p, q, r] = [...l].sort((x, y) => x - y);
  return p + q > r;
};
function corrigerConstruire(q: Q): string[] {
  const t = q.text;
  const F = lireFig(q);
  const p = F ? verifierFig(q, F) : [];
  const L = cotesTexte(t);
  const A = anglesTexte(t);
  let m: RegExpMatchArray | null;
  if ((m = t.match(/trace \[([A-Z])([A-Z])\] de (\d+(?:,\d+)?) cm, puis un arc de centre ([A-Z]) et de rayon (\d+(?:,\d+)?) cm, et un arc de centre ([A-Z]) et de rayon (\d+(?:,\d+)?) cm/))) {
    const l = [num(m[3]), num(m[5]), num(m[7])];
    if ([m[4], m[6]].sort().join("") !== [m[1], m[2]].sort().join("")) p.push("les centres des arcs ne sont pas les extrémités du segment");
    const [a, b, c] = [...l].sort((x, y) => x - y);
    if (Math.abs(a + b - c) < 0.5) p.push("cas limite : les arcs se touchent à peine");
    return [...p, ...qcmUnique(q, (x) => x === (constructible(l) ? "oui" : "non"))];
  }
  if ((m = t.match(/trace \[([A-Z])([A-Z])\] de (\d+) cm et un arc de centre ([A-Z]) de rayon (\d+) cm\. Quelle est la plus petite longueur entière/))) {
    const xy = num(m[3]), r1 = num(m[5]);
    // Le plus petit entier r tel que |r1 − r| < xy < r1 + r.
    let r = 1;
    while (!(Math.abs(r1 - r) < xy && xy < r1 + r)) r++;
    return [...p, ...attendu(q, r, "cm", "plus petit rayon entier")];
  }
  const ch = q.choices ?? [];
  const S = F ? Object.values(F.nom) : [];
  const troisCotes = S.length === 3 && S.every((u) => S.every((v) => u === v || L[u + v] !== undefined));
  if (troisCotes && !constructible(S.map((u, i) => L[u + S[(i + 1) % 3]]))) p.push("les trois longueurs ne forment pas de triangle");
  if (q.format === "qcm") {
    let juste: string;
    if (/rectangle en/.test(t)) juste = "l’équerre";
    else if (Object.keys(A).length) juste = "le rapporteur";
    else if (troisCotes) juste = "le compas";
    else return [...p, "données de construction illisibles"];
    if (juste === "l’équerre" && ch.includes("le rapporteur")) p.push("le rapporteur trace aussi un angle droit : deux bonnes réponses");
    return [...p, ...qcmUnique(q, (c) => c === juste)];
  }
  if ((m = t.match(/arc de centre ([A-Z])/))) {
    const centre = m[1];
    const autre = t.match(/Pour placer ([A-Z])|\[([A-Z])([A-Z])\] est déjà tracé/);
    if (!troisCotes || !autre) return [...p, "longueurs ou segment tracé illisibles"];
    const trace = autre[2] ? [autre[2], autre[3]] : S.filter((x) => x !== autre[1]);
    const libre = S.find((x) => !trace.includes(x))!;
    if (!trace.includes(centre)) p.push(`le centre ${centre} n’est pas une extrémité du segment tracé`);
    return [...p, ...attendu(q, L[centre + libre], "cm", `distance ${centre}${libre}`)];
  }
  const connus = Object.entries(A);
  if (connus.length !== 2) return [...p, "deux angles attendus"];
  if ((m = t.match(/tracer en ([A-Z]) \?|rapporteur en ([A-Z]) \?/))) {
    const s = m[1] ?? m[2];
    if (A[s] === undefined) return [...p, `angle en ${s} absent du texte`];
    return [...p, ...attendu(q, A[s], "°", `angle donné en ${s}`)];
  }
  const total = connus[0][1] + connus[1][1];
  if (total >= 180) p.push("les deux angles font 180° ou plus : pas de triangle");
  return [...p, ...attendu(q, 180 - total, "°", "troisième angle")];
}

/* ─── TRIANGLE_INEGALITE ───────────────────────────────────────────────── */

const longueurs = (t: string) => [...t.matchAll(/(\d+(?:,\d+)?) cm/g)].map((m) => num(m[1]));
function corrigerInegalite(q: Q): string[] {
  const t = q.text;
  const l = longueurs(t);
  const p: string[] = [];
  for (const m of t.matchAll(/\d+,(\d+)/g)) if (m[1].length > 2) p.push(`plus de deux décimales : ${m[0]}`);
  if (/troisième côté/.test(t)) {
    if (l.length !== 2) return [...p, `deux longueurs attendues, ${l.length} lues`];
    const [a, b] = l;
    const lo = Math.abs(a - b), hi = a + b;
    if (/plus grande longueur entière/.test(t)) return [...p, ...attendu(q, Math.ceil(hi) - 1, "cm", "plus grand entier sous la somme")];
    const v = (c: string) => num(c.replace(" cm", ""));
    for (const c of q.choices ?? []) {
      if (!/^\d+(?:,\d+)? cm$/.test(c)) p.push(`proposition sans unité : « ${c} »`);
      if (egal(v(c), lo) || egal(v(c), hi)) p.push(`proposition ${c} : triangle aplati, ni oui ni non`);
    }
    return [...p, ...qcmUnique(q, (c) => v(c) > lo && v(c) < hi)];
  }
  if (l.length !== 3) return [...p, `trois longueurs attendues, ${l.length} lues`];
  const [a, b, c] = [...l].sort((x, y) => x - y);
  if (Math.abs(a + b - c) < 0.5) p.push(`cas limite ${a} + ${b} ≈ ${c} : triangle aplati`);
  return [...p, ...qcmUnique(q, (x) => x === (a + b > c ? "oui" : "non"))];
}

/* ─── TRIANGLE_SOMME_ANGLE ─────────────────────────────────────────────── */

/** Les trois angles, déduits du texte (angles donnés, « rectangle en », « isocèle en »). */
function resoudreAngles(t: string, S: string[]): Record<string, number> | string {
  const A = { ...anglesTexte(t) };
  const rect = t.match(/rectangle en ([A-Z])/)?.[1];
  if (rect) {
    if (A[rect] !== undefined && A[rect] !== 90) return `rectangle en ${rect} mais l’angle y mesure ${A[rect]}°`;
    A[rect] = 90;
  }
  const iso = t.match(/isocèle en ([A-Z])/)?.[1];
  if (iso) {
    const [u, v] = S.filter((x) => x !== iso);
    if (A[u] !== undefined && A[v] === undefined) A[v] = A[u];
    else if (A[v] !== undefined && A[u] === undefined) A[u] = A[v];
    else if (A[iso] !== undefined && A[u] === undefined) A[u] = A[v] = (180 - A[iso]) / 2;
  }
  const inconnus = S.filter((x) => A[x] === undefined);
  if (inconnus.length === 1) A[inconnus[0]] = 180 - S.filter((x) => x !== inconnus[0]).reduce((s, x) => s + A[x], 0);
  if (S.some((x) => A[x] === undefined)) return "angles insuffisants dans le texte";
  if (!egal(S.reduce((s, x) => s + A[x], 0), 180)) return "les angles du texte ne font pas 180°";
  if (S.some((x) => !(A[x] > 0) || !Number.isInteger(A[x]))) return `angle impossible : ${S.map((x) => A[x]).join(", ")}`;
  return A;
}
function corrigerSomme(q: Q): string[] {
  const t = q.text;
  const F = lireFig(q);
  if (!F) return ["pas de figure"];
  const p = verifierFig(q, F);
  const S = Object.values(F.nom);
  if (q.format === "qcm") return [...p, ...qcmUnique(q, (c) => c === "180°")];
  const A = resoudreAngles(t, S);
  if (typeof A === "string") return [...p, A];
  const cherche = [...t.matchAll(/angle en ([A-Z])/g)].pop()?.[1];
  if (!cherche || !S.includes(cherche)) return [...p, "angle cherché illisible"];
  if (Object.keys(anglesTexte(t)).includes(cherche)) p.push(`l’angle cherché en ${cherche} est déjà donné`);
  // L'étiquette « ? » est sur l'angle cherché.
  if (F.f.angleLabels?.[F.cle[cherche]] !== "?") p.push(`la figure ne met pas « ? » sur l’angle en ${cherche}`);
  // Le dessin a bien ces trois angles.
  for (const x of S) if (Math.abs(F.ang[F.cle[x]] - A[x]) > 1) p.push(`angle en ${x} : ${A[x]}° d’après le texte, ${F.ang[F.cle[x]].toFixed(1)}° sur la figure`);
  return [...p, ...attendu(q, A[cherche], "°", `angle en ${cherche}`)];
}

/* ─── TRIANGLE_DEFI ────────────────────────────────────────────────────── */

function corrigerDefiTri(q: Q): string[] {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if (q.format === "qcm") {
    if ((m = t.match(/deux angles de (\d+)°/))) return qcmUnique(q, (c) => c === (2 * num(m![1]) < 180 ? "oui" : "non"));
    const v = [...t.matchAll(/(\d+)°/g)].map((x) => num(x[1]));
    if (v.length !== 3) return [`trois angles attendus, ${v.length} lus`];
    if (v.some((x) => x <= 0)) return ["angle nul ou négatif"];
    return qcmUnique(q, (c) => c === (v[0] + v[1] + v[2] === 180 ? "oui" : "non"));
  }
  const F = lireFig(q);
  if (!F) return ["pas de figure"];
  const p = verifierFig(q, F);
  const S = Object.values(F.nom);
  const cherche = [...t.matchAll(/angle en ([A-Z])/g)].pop()?.[1];
  if (!cherche) return [...p, "angle cherché illisible"];
  let juste: number;
  if ((m = t.match(/angle en ([A-Z]) mesure le double de l’angle en ([A-Z]), et l’angle en ([A-Z]) mesure (\d+)°/))) {
    // x + 2x + c = 180.
    if (m[2] !== cherche) return [...p, "angle cherché inattendu"];
    juste = (180 - num(m[4])) / 3;
  } else if ((m = t.match(/angle en ([A-Z]) mesure (\d+)°, et l’angle en ([A-Z]) a (\d+)° de plus que l’angle en ([A-Z])/))) {
    // c + (x + d) + x = 180.
    if (m[5] !== cherche) return [...p, "angle cherché inattendu"];
    juste = (180 - num(m[2]) - num(m[4])) / 2;
  } else {
    const A = resoudreAngles(t, S);
    if (typeof A === "string") return [...p, A];
    juste = A[cherche];
  }
  if (!(juste > 0) || !Number.isInteger(juste)) p.push(`angle cherché impossible : ${juste}`);
  if (F.f.angleLabels?.[F.cle[cherche]] !== "?") p.push(`la figure ne met pas « ? » sur l’angle en ${cherche}`);
  if (Math.abs(F.ang[F.cle[cherche]] - juste) > 1) p.push(`angle en ${cherche} dessiné ${F.ang[F.cle[cherche]].toFixed(1)}°, recalculé ${juste}°`);
  return [...p, ...attendu(q, juste, "°", `angle en ${cherche}`)];
}

export const CORRECTEURS: CorrecteursMaths = {
  triangle_defi_tpl_1: corrigerDefiTri,
  triangle_defi_tpl_2: corrigerDefiTri,
  triangle_defi_tpl_3: corrigerDefiTri,
  triangle_somme_angle_tpl_1: corrigerSomme,
  triangle_somme_angle_tpl_2: corrigerSomme,
  triangle_somme_angle_tpl_3: corrigerSomme,
  triangle_somme_angle_tpl_4: corrigerSomme,
  triangle_somme_angle_tpl_5: corrigerSomme,
  triangle_construire_tpl_1: corrigerInegalite,
  triangle_construire_tpl_2: corrigerInegalite,
  triangle_construire_tpl_3: corrigerConstruire,
  triangle_construire_tpl_4: corrigerConstruire,
  triangle_construire_tpl_5: corrigerConstruire,
  triangle_nature_tpl_1: corrigerNature,
  triangle_nature_tpl_2: corrigerNature,
  triangle_nature_tpl_3: corrigerNature,
  triangle_reconnaitre_tpl_1: corrigerReconnaitre,
  triangle_reconnaitre_tpl_2: corrigerReconnaitre,
  triangle_reconnaitre_tpl_3: corrigerReconnaitre,
};
