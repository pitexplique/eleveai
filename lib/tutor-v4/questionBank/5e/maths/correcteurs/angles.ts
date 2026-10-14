import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4, AngleCanvasData } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE angles.bank.ts (notion angle_mesure, 13/10/2026).
// Ils relisent le TEXTE (le nom de l'angle « l’angle GSD », les mesures
// « 35° », les heures, les directions, les rayons d'une roue…) et la FIGURE
// (l'angle dessiné, ses lettres, la mesure écrite, le rapporteur ; pour les
// parallèles, les coordonnées des huit points nommés), puis refont le
// raisonnement : sommet, côtés, nature, lecture du rapporteur, estimation,
// angles complémentaires, supplémentaires, opposés par le sommet, adjacents,
// alternes-internes et correspondants. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(String(s).replace(/\s/g, "").replace(",", "."));
const egal = (a: number, b: number, tol = 1e-6) => Math.abs(a - b) < tol;

/** La dernière phrase (la question). */
function question(t: string) {
  const morceaux = t.split(/(?<=[.?!;:]) /);
  return morceaux[morceaux.length - 1];
}
/** QCM : une seule proposition juste, et c'est la réponse attendue. */
function qcmUnique(q: Q, juste: (c: string) => boolean): string[] {
  if (q.format !== "qcm") return [`format ${q.format} au lieu d’un QCM`];
  const justes = (q.choices ?? []).filter(juste);
  if (justes.length !== 1) return [`${justes.length} proposition(s) juste(s) : ${justes.join(" | ") || "aucune"}`];
  if (justes[0] !== q.expected[0]) return [`réponse attendue « ${q.expected[0]} », recalculée « ${justes[0]} »`];
  return [];
}
/** Une réponse en degrés : la valeur, l'unité « ° », le comparateur. */
function degresAttendus(q: Q, juste: number, quoi = "recalculé"): string[] {
  const p: string[] = [];
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?)\s*(°?)$/);
  if (!m) return [`réponse attendue illisible « ${q.expected[0]} »`];
  if (!egal(num(m[1]), juste)) p.push(`attendu « ${q.expected[0]} », ${quoi} : ${juste}°`);
  if (m[2] !== "°") p.push(`unité « ° » absente de la réponse « ${q.expected[0]} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}
const nature = (a: number) => (a < 90 ? "aigu" : a === 90 ? "droit" : a < 180 ? "obtus" : "plat");

/* ─── LA FIGURE D'UN ANGLE ─────────────────────────────────────────────── */

type FigAngle = { a: number; s: string; g: string; d: string; c: AngleCanvasData };
function figAngle(q: Q): FigAngle | null {
  const c = q.canvas as AngleCanvasData | undefined;
  if (!c || c.kind !== "angle") return null;
  const l = c.angle.labels ?? {};
  return { a: c.angle.angleDeg, s: l.vertex ?? "O", g: l.left ?? "A", d: l.right ?? "B", c };
}
/** La figure dit la même chose que le texte : lettres, mesure écrite, angle droit codé. */
function verifierFigAngle(q: Q, f: FigAngle): string[] {
  const p: string[] = [];
  const disp = f.c.angle.display ?? {};
  if (!(f.a > 0 && f.a < 180)) p.push(`angle dessiné de ${f.a}°`);
  if (disp.showMeasure && f.c.angle.labels?.angle !== `${f.a}°`)
    p.push(`la figure affiche « ${f.c.angle.labels?.angle} » pour un angle dessiné de ${f.a}°`);
  if ((disp.showRightAngle ?? f.a === 90) !== (f.a === 90)) p.push(`codage d’angle droit sur un angle de ${f.a}°`);
  if (disp.showProtractor && f.a % 10 !== 0) p.push(`rapporteur gradué de 10 en 10 pour un angle de ${f.a}°`);
  if (new Set([f.s, f.g, f.d]).size !== 3) p.push("deux points de la figure portent la même lettre");
  // Le nom écrit dans le texte : le sommet au milieu, les côtés aux bouts.
  for (const m of q.text.matchAll(/angle ([A-Z])([A-Z])([A-Z])(?![A-Za-z])/g)) {
    if (m[2] !== f.s || [m[1], m[3]].sort().join("") !== [f.g, f.d].sort().join(""))
      p.push(`le texte nomme l’angle ${m[1]}${m[2]}${m[3]}, la figure a pour sommet ${f.s} et pour côtés ${f.g}, ${f.d}`);
  }
  // Une mesure écrite dans le texte pour cet angle = la mesure dessinée.
  const m = q.text.match(/angle [A-Z]{3} mesure (\d+)°/);
  if (m && num(m[1]) !== f.a) p.push(`le texte dit ${m[1]}°, la figure dessine ${f.a}°`);
  return p;
}

/* ─── ANGLE_LIRE ───────────────────────────────────────────────────────── */

function corrigerLire(q: Q): string[] {
  const f = figAngle(q);
  if (!f) return ["pas de figure d’angle"];
  const p = verifierFigAngle(q, f);
  const t = q.text;
  const ch = q.choices ?? [];
  if (q.format === "short") {
    if (!f.c.angle.display?.showMeasure) p.push("mesure demandée, mais la figure ne l’écrit pas");
    p.push(...degresAttendus(q, f.a, "mesure écrite sur la figure"));
  } else if (ch.some((c) => c.startsWith("l’angle "))) {
    // Le nom de l'angle : le sommet au milieu.
    const s = t.match(/sommet (?:de l’angle est |est |de l’angle |)([A-Z])\b/)?.[1] ?? t.match(/pour sommet ([A-Z])\b/)?.[1];
    if (!s || s !== f.s) p.push(`sommet lu dans le texte « ${s} », figure ${f.s}`);
    const pp = t.match(/passent par ([A-Z]) et (?:par )?([A-Z])\b/);
    if (pp && [pp[1], pp[2]].sort().join("") !== [f.g, f.d].sort().join("")) p.push("les côtés du texte ne sont pas ceux de la figure");
    p.push(
      ...qcmUnique(q, (c) => {
        const m = c.match(/^l’angle ([A-Z])([A-Z])([A-Z])$/);
        return !!m && m[2] === f.s && [m[1], m[3]].sort().join("") === [f.g, f.d].sort().join("");
      }),
    );
  } else if (ch.some((c) => c.includes(" et ["))) {
    p.push(
      ...qcmUnique(q, (c) => {
        const m = c.match(/^\[([A-Z])([A-Z])\) et \[([A-Z])([A-Z])\)$/);
        return !!m && m[1] === f.s && m[3] === f.s && [m[2], m[4]].sort().join("") === [f.g, f.d].sort().join("");
      }),
    );
  } else if (ch.includes("aigu")) {
    const m = t.match(/mesure (\d+)°/);
    const a = m ? num(m[1]) : f.a;
    if (!m && !f.c.angle.display?.showMeasure) p.push("nature demandée sans mesure ni dans le texte ni sur la figure");
    p.push(...qcmUnique(q, (c) => c === nature(a)));
  } else if (/sommet|même point/.test(t)) {
    p.push(...qcmUnique(q, (c) => c === f.s));
  } else p.push("forme de question non reconnue");
  return p;
}

/* ─── ANGLE_MESURER ────────────────────────────────────────────────────── */

/** Les deux lectures d'un rapporteur double écrites dans le texte (extérieure, intérieure). */
function lecturesTexte(t: string): { ext: number; int: number } | null {
  const m =
    t.match(/passe par (\d+) sur la graduation extérieure et par (\d+) sur l’intérieure/) ??
    t.match(/passe par (\d+) \(extérieure\) et (\d+) \(intérieure\)/);
  return m ? { ext: num(m[1]), int: num(m[2]) } : null;
}
/** La graduation dont le 0 est sur un côté, lue dans le texte. */
const zeroSur = (t: string) => t.match(/le 0 de la graduation (extérieure|intérieure)/i)?.[1] ?? null;

function corrigerMesurer(q: Q): string[] {
  const t = q.text;
  const f = figAngle(q);
  const L = lecturesTexte(t);
  if (!f) {
    // Sans figure : tout est dans le texte.
    if (!L) return ["ni figure ni lectures du rapporteur dans le texte"];
    const p: string[] = [];
    if (L.ext + L.int !== 180) p.push(`lectures ${L.ext} et ${L.int} : leur somme n’est pas 180`);
    const z = zeroSur(t);
    if (!z) return [...p, "graduation du 0 illisible"];
    p.push(...degresAttendus(q, z === "extérieure" ? L.ext : L.int, `lu sur la graduation ${z}`));
    return p;
  }
  const p = verifierFigAngle(q, f);
  if (!f.c.angle.display?.showProtractor) p.push("mesure au rapporteur sans rapporteur sur la figure");
  if (f.c.angle.display?.showMeasure) p.push("la figure écrit la mesure qu’on demande de lire");
  // Le 0 extérieur est, sur le dessin du moteur, sur le côté horizontal [SD).
  const z = zeroSur(t);
  if (z === "intérieure") p.push("le texte met le 0 intérieur sur un côté : la figure a le 0 extérieur sur le côté horizontal");
  for (const m of t.matchAll(/(?:0 (?:de la graduation extérieure )?(?:est )?sur (?:le côté )?|0 sur )\[([A-Z])([A-Z])\)/g))
    if (m[1] !== f.s || m[2] !== f.d) p.push(`le 0 est sur [${f.s}${f.d}) dans la figure, pas sur [${m[1]}${m[2]})`);
  const ch = q.choices ?? [];
  if (q.format === "qcm" && ch.some((c) => c.startsWith("sur le point"))) {
    p.push(...qcmUnique(q, (c) => c === `sur le point ${f.s}`));
  } else if (q.format === "qcm") {
    const lu = t.match(/lit (\d+)°|annonce (\d+)°/);
    if (!lu) p.push("mesure fausse annoncée illisible");
    else if (num(lu[1] ?? lu[2]) === f.a) p.push("la mesure annoncée comme fausse est la bonne");
    p.push(...qcmUnique(q, (c) => c === `${f.a}°`));
  } else p.push(...degresAttendus(q, f.a, "angle dessiné sous le rapporteur"));
  return p;
}

/* ─── ANGLE_TRACER ─────────────────────────────────────────────────────── */

/** L'angle nommé dans le texte : sommet au milieu. */
function nomTexte(t: string) {
  const m = t.match(/angle ([A-Z])([A-Z])([A-Z])(?![A-Za-z])/);
  return m ? { g: m[1], s: m[2], d: m[3] } : null;
}
function corrigerTracer(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  const f = figAngle(q);
  if (f) p.push(...verifierFigAngle(q, f));
  const n = nomTexte(t);
  const cible = t.match(/de (\d+)°|voulait (\d+)°/);
  const a = cible ? num(cible[1] ?? cible[2]) : null;
  const ch = q.choices ?? [];
  if (/même endroit/.test(t)) {
    const m = t.match(/(?:montre|repère) (\d+)/);
    if (!m) return ["nombre de la graduation extérieure illisible"];
    return [...p, ...degresAttendus(q, 180 - num(m[1]), "graduation intérieure au même endroit")];
  }
  if (!n || a === null) return [...p, "angle ou mesure à tracer illisible"];
  if (ch.some((c) => c.startsWith("sur le point"))) return [...p, ...qcmUnique(q, (c) => c === `sur le point ${n.s}`)];
  if (ch.some((c) => c.startsWith("tracer une demi-droite")))
    return [...p, ...qcmUnique(q, (c) => c === `tracer une demi-droite d’origine ${n.s}`)];
  if (ch.includes("aigu")) return [...p, ...qcmUnique(q, (c) => c === nature(a))];
  if (ch.some((c) => c.startsWith("la graduation"))) {
    const z = zeroSur(t);
    if (!z) return [...p, "graduation du 0 illisible"];
    return [...p, ...qcmUnique(q, (c) => c === `la graduation ${z}`)];
  }
  if (/mauvaise graduation|la graduation était la mauvaise/.test(t)) {
    if (!f) return [...p, "erreur de tracé sans la figure de l’élève"];
    if (f.a !== 180 - a) p.push(`l’angle dessiné (${f.a}°) n’est pas celui de la mauvaise graduation (${180 - a}°)`);
    const dit = t.match(/(?:obtient un angle|L’angle est) (aigu|droit|obtus)/)?.[1];
    if (dit !== nature(f.a)) p.push(`le texte dit l’angle « ${dit} », la figure dessine ${f.a}°`);
    return [...p, ...degresAttendus(q, f.a, "angle tracé avec la mauvaise graduation")];
  }
  if (f && f.a !== a) p.push(`la figure dessine ${f.a}° pour un angle de ${a}°`);
  if (f && f.d !== n.d) p.push(`le premier côté [${n.s}${n.d}) n’est pas le côté horizontal de la figure`);
  return [...p, ...degresAttendus(q, a, "graduation à repérer")];
}

/* ─── ANGLE_ESTIMER ────────────────────────────────────────────────────── */

function corrigerEstimer(q: Q): string[] {
  const f = figAngle(q);
  if (!f) return ["estimation sans figure"];
  const p = verifierFigAngle(q, f);
  if (f.c.angle.display?.showMeasure || f.c.angle.display?.showProtractor) p.push("la figure donne la mesure qu’on demande d’estimer");
  if (/\d+°/.test(q.text)) p.push("le texte donne une mesure");
  const ch = q.choices ?? [];
  if (ch.includes("aigu")) {
    if (f.a !== 90 && Math.abs(f.a - 90) < 25) p.push(`angle de ${f.a}° trop proche de 90° pour une estimation à l’œil`);
    p.push(...qcmUnique(q, (c) => c === nature(f.a)));
  } else {
    const v = ch.map((c) => num(c.replace("°", "")));
    // La proposition juste est la plus proche du dessin, et les autres en sont loin.
    p.push(...qcmUnique(q, (c) => Math.abs(num(c.replace("°", "")) - f.a) < 10));
    for (const x of v) if (Math.abs(x - f.a) >= 10 && Math.abs(x - f.a) < 30) p.push(`proposition ${x}° trop proche de l’angle dessiné (${f.a}°)`);
  }
  return p;
}

/* ─── ANGLE_DEFI ───────────────────────────────────────────────────────── */

const CAP: Record<string, number> = {
  nord: 0, "nord-est": 45, est: 90, "sud-est": 135, sud: 180, "sud-ouest": 225, ouest: 270, "nord-ouest": 315,
};
const plusPetit = (x: number) => {
  const r = ((x % 360) + 360) % 360;
  return r > 180 ? 360 - r : r;
};
function corrigerDefi(q: Q): string[] {
  const t = q.text;
  let juste: number | null = null;
  const p: string[] = [];
  let m: RegExpMatchArray | null;
  if ((m = t.match(/indique (\d+) h (pile|30)/))) {
    const h = num(m[1]);
    if (h < 1 || h > 11) p.push(`heure ${h} hors du cadran`);
    // Positions depuis le 12 : grande aiguille 0° (pile) ou 180° (demie) ; petite 30° par heure + 0,5° par minute.
    const grande = m[2] === "pile" ? 0 : 180;
    const petite = 30 * h + (m[2] === "pile" ? 0 : 15);
    juste = plusPetit(petite - grande);
    if (!/plus petit angle/.test(t)) p.push("« le plus petit angle » n’est pas précisé : deux angles possibles");
  } else if ((m = t.match(/(\d+) (?:rayons|parts égales|nacelles|pales|secteurs égaux)/))) {
    const k = num(m[1]);
    if (360 % k !== 0) p.push(`360 ÷ ${k} n’est pas entier`);
    juste = 360 / k;
  } else if ((m = t.match(/(?:vers|direction) (?:le |l’)?([a-z-]+?)(?:,| puis| et|\.)[^?]*(?:vers|direction) (?:le |l’)?([a-z-]+)/))) {
    const a = CAP[m[1]], b = CAP[m[2]];
    if (a === undefined || b === undefined) return [`directions illisibles « ${m[1]} », « ${m[2]} »`];
    if (a === b) p.push("deux fois la même direction");
    juste = plusPetit(a - b);
  } else if ((m = t.match(/tourne de (\d+)°, puis de (\d+)°/))) {
    const tot = /demi-tour/.test(t) ? 180 : /tour complet/.test(t) ? 360 : NaN;
    juste = tot - num(m[1]) - num(m[2]);
    if (!(juste > 0)) p.push(`il ne reste rien à tourner (${juste}°)`);
  } else return ["défi non reconnu"];
  if (q.format === "qcm") return [...p, ...qcmUnique(q, (c) => c === nature(juste!))];
  return [...p, ...degresAttendus(q, juste)];
}

/* ─── ANGLE_PAIRES ─────────────────────────────────────────────────────── */

/** Les mesures en degrés écrites dans le texte, dans l'ordre. */
const degres = (t: string) => [...t.matchAll(/(\d+)°/g)].map((m) => num(m[1]));
function corrigerPaires(q: Q): string[] {
  const t = q.text;
  const v = degres(t);
  const p: string[] = [];
  for (const x of v) if (!(x > 0 && x < 180)) p.push(`mesure ${x}° impossible pour un de ces angles`);
  if (q.format === "qcm") {
    if (v.length !== 2) return [...p, `deux mesures attendues, ${v.length} lues`];
    const s = v[0] + v[1];
    const juste = s === 90 ? "complémentaires" : s === 180 ? "supplémentaires" : "ni l’un ni l’autre";
    return [...p, ...qcmUnique(q, (c) => c === juste)];
  }
  let juste: number;
  // Les droites nommées : (AC) et (BD) se coupent en O ; on vérifie les lettres.
  const dr = t.match(/droites \(([A-Z])([A-Z])\) et \(([A-Z])([A-Z])\) (?:qui )?se coupent en ([A-Z])/);
  const aligne = (x: string, y: string) => !!dr && ((x === dr[1] && y === dr[2]) || (x === dr[2] && y === dr[1]) || (x === dr[3] && y === dr[4]) || (x === dr[4] && y === dr[3]));
  if (/complémentaires/.test(t) && /supplémentaire/.test(t)) {
    if (v.length !== 1) return [`une mesure attendue, ${v.length} lues`];
    juste = 180 - (90 - v[0]);
  } else if (/alignés/.test(t) && /adjacents/.test(t)) {
    if (v.length !== 2) return [`deux mesures attendues, ${v.length} lues`];
    const m = t.match(/les points ([A-Z]), ([A-Z]) et ([A-Z]) sont alignés/);
    const angles = [...t.matchAll(/angles ([A-Z]{3}), ([A-Z]{3}) et ([A-Z]{3}) sont adjacents/g)][0];
    if (!m || !angles || angles[1][0] !== m[1] || angles[3][2] !== m[3] || angles[1][1] !== m[2]) p.push("les points alignés ne sont pas les bords des trois angles");
    juste = 180 - v[0] - v[1];
  } else if (/adjacent/.test(t)) {
    if (v.length !== 2) return [`deux mesures attendues, ${v.length} lues`];
    juste = v[0] + v[1];
  } else if (/somme des deux angles voisins/.test(t)) {
    if (v.length !== 1) return [`une mesure attendue, ${v.length} lues`];
    juste = 2 * (180 - v[0]);
  } else if (/opposé/.test(t)) {
    if (v.length !== 1) return [`une mesure attendue, ${v.length} lues`];
    juste = v[0];
    const m = t.match(/angle ([A-Z])([A-Z])([A-Z]) mesure.*angle ([A-Z])([A-Z])([A-Z]), opposé/);
    if (m && !(aligne(m[1], m[4]) && aligne(m[3], m[6]) && m[2] === m[5])) p.push(`${m[4]}${m[5]}${m[6]} n’est pas opposé par le sommet à ${m[1]}${m[2]}${m[3]}`);
  } else if (/voisin/.test(t)) {
    if (v.length !== 1) return [`une mesure attendue, ${v.length} lues`];
    juste = 180 - v[0];
    const m = t.match(/angle ([A-Z])([A-Z])([A-Z]) mesure.*angle ([A-Z])([A-Z])([A-Z]), voisin/);
    // Voisins : un côté commun, les deux autres côtés sur la même droite.
    if (m && !(m[3] === m[4] && aligne(m[1], m[6]))) p.push(`${m[4]}${m[5]}${m[6]} n’est pas voisin de ${m[1]}${m[2]}${m[3]} le long d’une droite`);
  } else if (/complémentaire|angle droit/.test(t)) {
    if (v.length !== 1) return [`une mesure attendue, ${v.length} lues`];
    juste = 90 - v[0];
  } else if (/supplémentaire|de l’autre côté/.test(t)) {
    if (v.length !== 1) return [`une mesure attendue, ${v.length} lues`];
    if (/de l’autre côté/.test(t) && !/sol plat|sur un sol plat/.test(t)) p.push("« de l’autre côté » sans sol plat (ligne droite)");
    juste = 180 - v[0];
  } else return ["relation entre les angles non reconnue"];
  if (!(juste > 0 && juste < 360)) p.push(`résultat impossible : ${juste}°`);
  return [...p, ...degresAttendus(q, juste)];
}

/* ─── ANGLE_PARALLELES ─────────────────────────────────────────────────── */

type Pt = { x: number; y: number };
const sub = (a: Pt, b: Pt) => ({ x: a.x - b.x, y: a.y - b.y });
const cross = (a: Pt, b: Pt) => a.x * b.y - a.y * b.x;
const dot = (a: Pt, b: Pt) => a.x * b.x + a.y * b.y;
function angleAuSommet(V: Pt, P1: Pt, P2: Pt) {
  const u = sub(P1, V), w = sub(P2, V);
  return (Math.acos(Math.max(-1, Math.min(1, dot(u, w) / Math.hypot(u.x, u.y) / Math.hypot(w.x, w.y)))) * 180) / Math.PI;
}
type FigPara = { P: Record<string, Pt>; d1: [Pt, Pt]; d2: [Pt, Pt]; s: [Pt, Pt] };
function figPara(q: Q): FigPara | string {
  const c = q.canvas as any;
  if (!c || c.kind !== "droites") return "pas de figure de droites";
  const P: Record<string, Pt> = {};
  for (const p of c.points ?? []) if (p.label) P[p.label] = { x: p.x, y: p.y };
  const L = (id: string) => c.lines.find((l: any) => l.id === id);
  const [d1, d2, s] = [L("d1"), L("d2"), L("s")];
  if (!d1 || !d2 || !s) return "droites (d1), (d2), (s) absentes";
  return { P, d1: [d1.from, d1.to], d2: [d2.from, d2.to], s: [s.from, s.to] };
}
const surDroite = (p: Pt, d: [Pt, Pt]) => Math.abs(cross(sub(d[1], d[0]), sub(p, d[0]))) / Math.hypot(d[1].x - d[0].x, d[1].y - d[0].y) < 1.5;
/** Où est l'angle « XVY » : sommet sur (d1) ou (d2), côté de la sécante, sens le long de la sécante. */
function placer(f: FigPara, nom: string) {
  const [X, V, Y] = [...nom].map((k) => f.P[k]);
  if (!X || !V || !Y) return null;
  const sur1 = surDroite(V, f.d1) && surDroite(V, f.s), sur2 = surDroite(V, f.d2) && surDroite(V, f.s);
  if (!sur1 && !sur2) return null;
  const d = sur1 ? f.d1 : f.d2;
  // Le côté porté par la sécante, et le côté porté par la droite.
  const [S, D] = surDroite(X, f.s) && surDroite(Y, d) ? [X, Y] : surDroite(Y, f.s) && surDroite(X, d) ? [Y, X] : [null, null];
  if (!S || !D) return null;
  const sdir = sub(f.s[1], f.s[0]);
  return {
    droite: sur1 ? 1 : 2,
    V,
    cote: Math.sign(cross(sdir, sub(D, V))),
    sens: Math.sign(dot(sdir, sub(S, V))),
    rayons: [X, Y],
  };
}
function relation(f: FigPara, n1: string, n2: string): string {
  const a = placer(f, n1), b = placer(f, n2);
  if (!a || !b) return "illisible";
  if (a.droite === b.droite) {
    // Même sommet : opposés si aucun côté commun, et chaque côté prolonge un côté de l'autre.
    const communs = a.rayons.filter((r) => b.rayons.some((s) => s.x === r.x && s.y === r.y)).length;
    return communs === 0 ? "opposés par le sommet" : "adjacents";
  }
  const [h, l] = a.droite === 1 ? [a, b] : [b, a];
  // L'intérieur : du côté de l'autre droite le long de la sécante.
  const versBas = Math.sign(dot(sub(f.s[1], f.s[0]), sub(l.V, h.V)));
  const interieurH = h.sens === versBas, interieurL = l.sens === -versBas;
  if (h.cote === l.cote && h.sens === l.sens) return "correspondants";
  if (h.cote !== l.cote && interieurH && interieurL) return "alternes-internes";
  return "autre";
}
function corrigerParalleles(q: Q): string[] {
  const t = q.text;
  if (!q.canvas) {
    // La réciproque, sans figure.
    const m = t.match(/angles (alternes-internes|correspondants) (?:formés par une sécante et deux droites : |mesurent )(\d+)° et (\d+)°/);
    if (!m) return ["réciproque illisible"];
    return qcmUnique(q, (c) => c === (num(m[2]) === num(m[3]) ? "oui" : "non"));
  }
  const f = figPara(q);
  if (typeof f === "string") return [f];
  const p: string[] = [];
  // Les parallèles annoncées le sont sur le dessin, et codées.
  if (/parallèles/.test(t) && Math.abs(cross(sub(f.d1[1], f.d1[0]), sub(f.d2[1], f.d2[0]))) > 1e-6) p.push("(d1) et (d2) ne sont pas parallèles sur la figure");
  const it = t.match(/coup(?:e|ées) (?:par la sécante \(s\) )?en ([A-Z]) et ([A-Z])/);
  if (!it) p.push("points d’intersection illisibles");
  else {
    if (!f.P[it[1]] || !surDroite(f.P[it[1]], f.d1) || !surDroite(f.P[it[1]], f.s)) p.push(`${it[1]} n’est pas l’intersection de (d1) et (s) sur la figure`);
    if (!f.P[it[2]] || !surDroite(f.P[it[2]], f.d2) || !surDroite(f.P[it[2]], f.s)) p.push(`${it[2]} n’est pas l’intersection de (d2) et (s) sur la figure`);
  }
  const noms = [...t.matchAll(/(?<![A-Za-zÀ-ÿ(])([A-Z]{3})(?![A-Za-zÀ-ÿ])/g)].map((m) => m[1]);
  for (const n of noms) if (!placer(f, n)) p.push(`l’angle ${n} ne se lit pas sur la figure`);
  if (p.length) return p;
  if (q.format === "qcm") {
    if (noms.length !== 2) return [`deux angles attendus, ${noms.length} lus`];
    const r = relation(f, noms[0], noms[1]);
    return qcmUnique(q, (c) => c === r);
  }
  const donne = t.match(/angle ([A-Z]{3}) mesure (\d+)°/);
  if (!donne || noms.length !== 2) return ["angle donné ou cherché illisible"];
  const mes = (n: string) => angleAuSommet(f.P[n[1]], f.P[n[0]], f.P[n[2]]);
  if (Math.abs(mes(donne[1]) - num(donne[2])) > 0.6) p.push(`l’angle ${donne[1]} est dessiné à ${mes(donne[1]).toFixed(1)}°, le texte dit ${donne[2]}°`);
  const cherche = noms.find((n) => n !== donne[1])!;
  if (placer(f, cherche)!.droite === placer(f, donne[1])!.droite) p.push("l’angle cherché a le même sommet que l’angle donné");
  // Avec des parallèles, l'angle cherché est égal ou supplémentaire au donné : on le relit sur la figure.
  const v = Math.round(mes(cherche));
  const donneV = num(donne[2]);
  if (v !== donneV && v + donneV !== 180) p.push(`angle cherché ${v}° ni égal ni supplémentaire de ${donneV}°`);
  return [...p, ...degresAttendus(q, v, `angle ${cherche} lu sur la figure`)];
}

export const CORRECTEURS: CorrecteursMaths = {
  angle_paralleles_tpl_1: corrigerParalleles,
  angle_paralleles_tpl_2: corrigerParalleles,
  angle_paralleles_tpl_3: corrigerParalleles,
  angle_paralleles_tpl_4: corrigerParalleles,
  angle_paires_tpl_1: corrigerPaires,
  angle_paires_tpl_2: corrigerPaires,
  angle_paires_tpl_3: corrigerPaires,
  angle_paires_tpl_4: corrigerPaires,
  angle_defi_tpl_2: corrigerPaires,
  angle_defi_tpl_1: corrigerDefi,
  angle_defi_open_tpl_1: corrigerDefi,
  angle_defi_tpl_3: corrigerDefi,
  angle_estimer_tpl_1: corrigerEstimer,
  angle_estimer_tpl_2: corrigerEstimer,
  angle_estimer_tpl_3: corrigerEstimer,
  angle_tracer_tpl_1: corrigerTracer,
  angle_tracer_tpl_2: corrigerTracer,
  angle_tracer_tpl_3: corrigerTracer,
  angle_tracer_tpl_4: corrigerTracer,
  angle_mesurer_tpl_1: corrigerMesurer,
  angle_mesurer_tpl_2: corrigerMesurer,
  angle_mesurer_tpl_3: corrigerMesurer,
  angle_lire_tpl_1: corrigerLire,
  angle_lire_tpl_2: corrigerLire,
  angle_lire_tpl_3: corrigerLire,
};
