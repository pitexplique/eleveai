import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Correcteurs des gabarits de cercle.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT les longueurs écrites (nombre + unité), les lettres
// des points, et le canvas : la nature d'un segment (rayon, diamètre, corde) se
// recalcule à partir des COORDONNÉES dessinées, pas du gabarit.

type Q = TutorGeneratedQuestionV4;
export const nombreFr = (s: string) => Number(String(s).replace(/[  ]/g, "").replace(",", "."));
/** Les longueurs « 12 cm », « 3,5 m » du texte, dans l'ordre. */
export const longueurs = (t: string) =>
  [...t.matchAll(/(\d+(?:,\d+)?)\s*(cm|m)(?![a-zà-ÿ²])/g)].map((m) => ({ v: nombreFr(m[1]), u: m[2] }));
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6;
const decimales = (v: number) => (String(Math.round(v * 1e6) / 1e6).split(".")[1] ?? "").length;

/** Réponse courte attendue « v u » (unité obligatoire, deux décimales au plus). */
export function attendu(q: Q, v: number, u: string): string[] {
  const p: string[] = [];
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?) (cm|m|km)$/);
  if (!m) return [`réponse attendue sans unité ou illisible : « ${q.expected[0]} »`];
  if (!egal(nombreFr(m[1]), v)) p.push(`réponse attendue ${m[1]}, recalculée ${String(Math.round(v * 100) / 100).replace(".", ",")}`);
  if (m[2] !== u) p.push(`unité attendue ${m[2]}, recalculée ${u}`);
  if (decimales(v) > 2) p.push(`plus de deux décimales : ${v}`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour une longueur`);
  return p;
}
export function qcm(q: Q, juste: string): string[] {
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${juste} »`);
  if (!(q.choices ?? []).includes(juste)) p.push(`« ${juste} » n’est pas parmi les propositions`);
  return p;
}

/** Les diamètres plausibles des objets ronds (ma table, en cm). */
const RONDS: [RegExp, number, number][] = [
  [/roue de vélo/, 40, 80], [/roue de trottinette/, 10, 30], [/pizza/, 20, 50], [/assiette/, 15, 32],
  [/cerceau/, 50, 100], [/horloge/, 15, 60], [/trampoline/, 150, 600], [/rond-point/, 1000, 6000],
  [/bassin/, 200, 1500], [/piscine ronde/, 200, 800], [/tambour/, 15, 60], [/piste de cirque/, 1000, 1500],
  [/couvercle/, 4, 15], [/table ronde/, 60, 160], [/manège/, 400, 2000], [/galette/, 15, 40],
];
export function plausibleDiametre(t: string, d: number, u: string): string[] {
  const o = RONDS.find(([re]) => re.test(t));
  if (!o) return [];
  const cm = u === "m" ? d * 100 : d;
  return cm < o[1] || cm > o[2] ? [`diamètre invraisemblable : ${d} ${u} (${o[0]})`] : [];
}

/** Ce que dessine le canvas : centre, rayon en pixels, points par lettre. */
function figure(q: Q) {
  const c = q.canvas as any;
  if (c?.kind !== "cercle") return null;
  const pts = new Map<string, { x: number; y: number }>((c.points ?? []).map((p: any) => [p.label ?? p.id, p]));
  const centre = (c.points ?? []).find((p: any) => p.x === c.circle.cx && p.y === c.circle.cy);
  return { c, pts, centre: centre?.label as string | undefined, R: c.circle.r as number };
}
/** La nature d'un segment, recalculée sur les coordonnées. */
function natureSegment(q: Q, a: string, b: string): "rayon" | "diametre" | "corde" | "autre" | null {
  const f = figure(q);
  if (!f) return null;
  const A = f.pts.get(a), B = f.pts.get(b);
  const O = f.pts.get(f.centre ?? "");
  if (!A || !B || !O) return null;
  const dist = (P: any, Q2: any) => Math.hypot(P.x - Q2.x, P.y - Q2.y);
  const surCercle = (P: any) => Math.abs(dist(P, O) - f.R) <= 2;
  if ((a === f.centre && surCercle(B)) || (b === f.centre && surCercle(A))) return "rayon";
  if (!surCercle(A) || !surCercle(B)) return "autre";
  return Math.abs(dist(A, B) - 2 * f.R) <= 3 ? "diametre" : "corde";
}
/** Le canvas parle-t-il des mêmes lettres et des mêmes longueurs que l'énoncé ? */
function canvasCercle(q: Q, centreTexte: string | null, mesures: { v: number; u: string }[] = []): string[] {
  const f = figure(q);
  if (!f) return q.canvas ? [`canvas inattendu : ${(q.canvas as any).kind}`] : [];
  const p: string[] = [];
  if (centreTexte && f.centre !== centreTexte) p.push(`centre dessiné ${f.centre}, énoncé ${centreTexte}`);
  for (const l of f.pts.keys()) if (l && !new RegExp(`\\b${l}\\b|${l}(?=[A-Z\\]\\)])|(?<=[A-Z\\[(])${l}`).test(q.text)) p.push(`le point ${l} dessiné n’est pas dans l’énoncé`);
  for (const s of f.c.segments ?? []) {
    if (!s.label) continue;
    const m = String(s.label).match(/^(\d+(?:,\d+)?) (cm|m)$/);
    if (!m || !mesures.some((x) => egal(x.v, nombreFr(m[1])) && x.u === m[2])) p.push(`longueur dessinée « ${s.label} » absente de l’énoncé`);
  }
  return p;
}
const centreDuTexte = (t: string) => t.match(/centre ([A-Z])\b/)?.[1] ?? null;

// ----- CERCLE_VOCABULAIRE
function corrigerRayonVersDiametre(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return [`une seule longueur attendue, lu : ${L.length}`];
  const { v, u } = L[0];
  return [...attendu(q, 2 * v, u), ...plausibleDiametre(q.text, 2 * v, u), ...canvasCercle(q, centreDuTexte(q.text), L)];
}
function corrigerDiametreVersRayon(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return [`une seule longueur attendue, lu : ${L.length}`];
  const { v, u } = L[0];
  return [...attendu(q, v / 2, u), ...plausibleDiametre(q.text, v, u), ...canvasCercle(q, centreDuTexte(q.text), L)];
}
function corrigerNommer(q: Q): string[] {
  const t = q.text;
  if (/contour/.test(t)) return qcm(q, "un cercle");
  if (/intérieur/.test(t)) return qcm(q, "un disque");
  const s = t.match(/segment \[([A-Z])([A-Z])\]/);
  if (!s) return ["segment illisible"];
  const n = natureSegment(q, s[1], s[2]);
  if (!n || n === "autre") return [`segment [${s[1]}${s[2]}] introuvable ou hors du cercle sur la figure`];
  const juste = n === "rayon" ? "un rayon" : n === "diametre" ? "un diamètre" : "une corde";
  return [...qcm(q, juste), ...canvasCercle(q, centreDuTexte(t))];
}

// ----- CERCLE_PROPORTIONNEL
const tour = (d: number) => Math.round(d * 3.14 * 100) / 100;
/** Le tableau dessiné : diamètres, tours, case manquante, unité. */
function canvasTableau(q: Q, diam: number[], u: string, manque: { row: number; col: number }): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "tableau_proportionnalite") return ["pas de tableau"];
  const p: string[] = [];
  if (!c.rowLabels?.[0]?.includes(`(${u})`) || !c.rowLabels?.[1]?.includes(`(${u})`)) p.push(`unité du tableau ≠ ${u}`);
  const v0 = c.values[0].map(nombreFr), v1 = c.values[1].map(nombreFr);
  diam.forEach((d, i) => {
    if (!egal(v0[i], d)) p.push(`diamètre ${i + 1} du tableau : ${c.values[0][i]} au lieu de ${d}`);
    if (!egal(v1[i], tour(d))) p.push(`tour ${i + 1} du tableau : ${c.values[1][i]} au lieu de ${tour(d)}`);
  });
  const m = c.missing?.[0];
  if (!m || m.row !== manque.row || m.col !== manque.col) p.push("la case cachée n’est pas celle demandée");
  return p;
}
function corrigerTableau(q: Q): string[] {
  const L = longueurs(q.text).filter((x) => !egal(x.v, 1) && !egal(x.v, 3.14));
  if (L.length !== 1) return [`un seul diamètre attendu, lu : ${L.map((x) => x.v).join(", ")}`];
  const { v: d, u } = L[0];
  if (/1 (cm|m) de diamètre|diamètre 1 (cm|m)/.test(q.text) && !/3,14 (cm|m)/.test(q.text)) return ["le tour de 3,14 pour 1 de diamètre manque"];
  return [...attendu(q, tour(d), u), ...plausibleDiametre(q.text, d, u), ...canvasTableau(q, [1, d], u, { row: 1, col: 1 })];
}
function corrigerPetitGrand(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 3) return [`trois longueurs attendues, lu : ${L.length}`];
  const [a, b, c] = L;
  const u = a.u;
  if (L.some((x) => x.u !== u)) return ["unités mélangées"];
  // Le texte donne diamètre puis tour du petit (dans un ordre ou l'autre).
  const [d, t] = egal(tour(a.v), b.v) ? [a.v, b.v] : egal(tour(b.v), a.v) ? [b.v, a.v] : [NaN, NaN];
  if (Number.isNaN(d)) return ["le tour du petit ne vaut pas 3,14 × son diamètre"];
  if (/[Qq]uel est le tour|son tour \?/.test(q.text)) {
    const k = c.v / d;
    if (!Number.isInteger(k) || k < 2) return [`le grand diamètre n’est pas un multiple du petit (${c.v} ÷ ${d})`];
    return [...attendu(q, Math.round(t * k * 100) / 100, u), ...canvasTableau(q, [d, c.v], u, { row: 1, col: 1 })];
  }
  if (/son diamètre \?/.test(q.text)) {
    const k = Math.round((c.v / t) * 1e6) / 1e6;
    if (!Number.isInteger(k) || k < 2) return [`le grand tour n’est pas un multiple du petit (${c.v} ÷ ${t})`];
    return [...attendu(q, d * k, u), ...canvasTableau(q, [d, d * k], u, { row: 0, col: 1 })];
  }
  return ["question illisible"];
}

// ----- CERCLE_PERIMETRE
function corrigerPerimetre(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return [`une seule longueur attendue, lu : ${L.length}`];
  if (!/π ≈ 3,14/.test(q.text)) return ["la valeur de π n’est pas donnée"];
  const { v, u } = L[0];
  const rayon = /rayon/.test(q.text) && !/diamètre/.test(q.text);
  const d = rayon ? 2 * v : v;
  return [...attendu(q, tour(d), u), ...plausibleDiametre(q.text, d, u), ...canvasCercle(q, centreDuTexte(q.text), L)];
}

// ----- CERCLE_DEFI
function corrigerToursOuInverse(q: Q): string[] {
  const t = q.text;
  const L = longueurs(t);
  if (L.length !== 1) return [`une seule longueur attendue, lu : ${L.length}`];
  const { v, u } = L[0];
  const k = Number(t.match(/(\d+) (?:tours|fois le tour)/)?.[1] ?? NaN);
  if (/diamètre de|de diamètre/.test(t) && !Number.isNaN(k)) {
    const total = Math.round(tour(v) * k * 100) / 100;
    const p = [...attendu(q, total, u), ...plausibleDiametre(t.replace(/cerceau/, "cerceau de gym"), v, u)];
    if (u === "cm" && total >= 1000) p.push("plus de 1 000 cm : il faudrait l’espace des milliers");
    if (/Combien de mètres/.test(t) && u !== "m") p.push("on demande des mètres, la réponse n’en est pas");
    return p;
  }
  if (/tour de|il faut/.test(t) && /(rayon|diamètre) \(π/.test(t)) {
    const d = Math.round((v / 3.14) * 1e6) / 1e6;
    if (!Number.isInteger(d)) return [`${v} ÷ 3,14 ne tombe pas juste`];
    const r = /rayon \(π/.test(t) ? d / 2 : d;
    return [...attendu(q, r, u), ...plausibleDiametre(t, d, u)];
  }
  return ["tournure inconnue du correcteur"];
}
function corrigerComparerTours(q: Q): string[] {
  const t = q.text;
  const L = longueurs(t);
  const ray = t.match(/rayon (?:de )?(\d+) (cm|m)/);
  const dia = t.match(/diamètre (?:de )?(\d+) (cm|m)/);
  if (ray && dia && !/ruban/.test(t)) {
    const [d1, d2] = [2 * Number(ray[1]), Number(dia[1])];
    if (d1 === d2) return ["les deux tours sont égaux : pas de bonne réponse unique"];
    // Le premier prénom nommé est celui du rayon.
    const noms = (q.choices ?? []).filter((c) => !/deux/.test(c));
    const iRay = t.indexOf(ray[0]), iDia = t.indexOf(dia[0]);
    const premier = noms.find((c) => t.indexOf(c.split(/ d’| de /).pop()!) === Math.min(...noms.map((x) => t.indexOf(x.split(/ d’| de /).pop()!))));
    const second = noms.find((c) => c !== premier);
    const [cRay, cDia] = iRay < iDia ? [premier, second] : [second, premier];
    return [...qcm(q, (d1 > d2 ? cRay : cDia) ?? "?"), ...plausibleDiametre(t, d1, ray[2]), ...plausibleDiametre(t, d2, dia[2])];
  }
  const ruban = t.match(/ruban de (\d+) cm/);
  const diaR = t.match(/diamètre (\d+) cm|(\d+) cm de diamètre/);
  if (ruban && diaR) {
    const D = Number(diaR[1] ?? diaR[2]);
    const P = tour(D);
    const juste = `${Number(ruban[1]) > P ? "oui" : "non"}, le tour mesure ${String(P).replace(".", ",")} cm`;
    if (Math.abs(Number(ruban[1]) - P) < 1) return ["ruban presque égal au tour : trop serré pour trancher"];
    return [...qcm(q, juste), ...plausibleDiametre(t, D, "cm")];
  }
  if (L.length < 2) return ["énoncé illisible"];
  return ["tournure inconnue du correcteur"];
}
function corrigerDefi5(q: Q): string[] {
  const t = q.text;
  const err = t.match(/rayon (\d+) cm.*?(\d+(?:,\d+)?) cm/);
  if (/erreur|trompé/.test(t) && err) {
    const r = Number(err[1]), trouve = nombreFr(err[2]);
    if (!egal(trouve, tour(r))) return ["la valeur trouvée par l’élève n’est pas 3,14 × rayon"];
    const bon = (q.choices ?? []).find((c) => /par le rayon au lieu du diamètre/.test(c));
    return bon ? qcm(q, bon) : ["l’erreur juste n’est pas proposée"];
  }
  if (/demi-disque/.test(t)) {
    const d = longueurs(t)[0].v;
    return attendu(q, Math.round((tour(d) / 2 + d) * 100) / 100, "cm");
  }
  const piste = t.match(/lignes droites de (\d+) m.*diamètre (\d+) m/);
  if (piste) {
    const [L, d] = [Number(piste[1]), Number(piste[2])];
    return attendu(q, Math.round((2 * L + tour(d)) * 100) / 100, "m");
  }
  const k = t.match(/(?:multiplie le diamètre d’une roue par|diamètre d’un disque) (\d+|double|triple|quadruple)/);
  if (k) {
    const n = { double: 2, triple: 3, quadruple: 4 }[k[1]] ?? Number(k[1]);
    // Qui dit « multiplié par n » ?
    const m = [...t.matchAll(/([A-ZÀ-Ý][a-zà-ÿë ï]+?)(?: dit : « Le| pense que le) tour est multiplié par (\d+)/g)];
    const juste = m.find((x) => Number(x[2]) === n)?.[1];
    if (!juste) return ["personne ne dit la bonne réponse"];
    return qcm(q, juste.trim());
  }
  return ["tournure inconnue du correcteur"];
}

// ----- CERCLE_ENSEMBLE
/** Le rayon et la distance du point au centre, lus dans le texte. */
function rayonEtDistance(t: string): { r: number; x: number } | null {
  const r = t.match(/rayon (?:de )?(\d+) cm|écarté de (\d+) cm/);
  const x = t.match(/[A-Z]{2} = (\d+) cm|à (\d+) cm de [A-Z]/);
  if (!r || !x) return null;
  return { r: Number(r[1] ?? r[2]), x: Number(x[1] ?? x[2]) };
}
function corrigerOuEstLePoint(q: Q): string[] {
  const rx = rayonEtDistance(q.text);
  if (!rx) return ["rayon ou distance illisible"];
  const { r, x } = rx;
  const juste = x === r ? "sur le cercle" : x < r ? "à l'intérieur du disque, mais pas sur le cercle" : "à l'extérieur du disque";
  const p = [...qcm(q, juste), ...canvasCercle(q, centreDuTexte(q.text) ?? q.text.match(/compas en ([A-Z])/)?.[1] ?? null, [{ v: x, u: "cm" }])];
  // Le point dessiné est-il à la bonne distance, rapportée au rayon dessiné ?
  const f = figure(q);
  if (f) {
    const P = [...f.pts.entries()].find(([l]) => l && l !== f.centre)?.[1];
    const O = f.pts.get(f.centre ?? "");
    if (P && O && Math.abs(Math.hypot(P.x - O.x, P.y - O.y) / f.R - x / r) > 0.03) p.push("le point n’est pas dessiné à la bonne distance du centre");
  }
  return p;
}
function corrigerQuiARaisonEnsemble(q: Q): string[] {
  const rx = rayonEtDistance(q.text);
  if (!rx) return ["rayon ou distance illisible"];
  const { r, x } = rx;
  const dits = [...q.text.matchAll(/([A-ZÀ-Ý][\p{L}]+) (?:dit|affirme|répond) : « (.+?)\. »/gu)].map((m) => ({ qui: m[1], s: m[2].toLowerCase() }));
  if (dits.length !== 2) return [`deux affirmations attendues, lu : ${dits.length}`];
  // Ma propre table de vérité, mot à mot.
  const vrai = (s: string) =>
    /ça dépend/.test(s) ? false
    : /pas sur le cercle/.test(s) ? x < r
    : /sur le cercle/.test(s) ? x === r
    : /extérieur/.test(s) ? x > r
    : /dans le disque/.test(s) ? x <= r
    : null;
  const v = dits.map((d) => vrai(d.s));
  if (v.includes(null)) return ["affirmation inconnue du correcteur"];
  const juste = v[0] && v[1] ? "les deux" : v[0] ? dits[0].qui : v[1] ? dits[1].qui : "aucun des deux";
  return qcm(q, juste);
}

// ----- CERCLE_DISTANCE
function corrigerPortee(q: Q): string[] {
  const t = q.text;
  const portee = t.match(/à (\d+) m au plus/);
  const lieu = t.match(/est en ([A-Z]), à (\d+) m de ([A-Z])/);
  const centre = t.match(/en ([A-Z])[ .]/);
  if (!portee || !lieu || !centre) return ["portée, distance ou centre illisible"];
  const [N, D] = [Number(portee[1]), Number(lieu[2])];
  if (lieu[3] !== centre[1]) return ["la distance n’est pas mesurée depuis le centre"];
  const M = lieu[1], C = centre[1];
  const juste = D <= N ? `oui, ${M} est dans le disque de centre ${C} et de rayon ${N} m` : `non, ${M} est en dehors du disque de centre ${C} et de rayon ${N} m`;
  const p = [...qcm(q, juste), ...canvasCercle(q, C, [{ v: D, u: "m" }])];
  const rep = t.match(/(?<!\p{L})(\p{L}+) \1(?!\p{L})/u);
  if (rep) p.push(`mot répété : « ${rep[0]} »`);
  // Accord : « Est-elle arrosée ? » après un lieu féminin.
  const lieuNom = t.match(/\. (Le|La|L’)([^.]*?) est en/);
  const q2 = t.match(/Est-(elle|il) (\S+) \?/);
  if (lieuNom && q2) {
    const fem = lieuNom[1] === "La" || /^(allée|haie)/.test(lieuNom[2].trim());
    if ((q2[1] === "elle") !== fem) p.push(`pronom « ${q2[1]} » mal accordé avec « ${lieuNom[1]}${lieuNom[2]} »`);
    if (fem !== /e$/.test(q2[2])) p.push(`participe « ${q2[2]} » mal accordé`);
  }
  const f = figure(q);
  if (f) {
    const P = f.pts.get(M), O = f.pts.get(C);
    if (P && O && Math.abs(Math.hypot(P.x - O.x, P.y - O.y) / f.R - D / N) > 0.03) p.push("le point n’est pas dessiné à la bonne distance");
    if (!f.c.display?.showDisk) p.push("la zone (un disque) n’est pas coloriée");
  }
  return p;
}
function corrigerDeuxCercles(q: Q): string[] {
  const t = q.text;
  const ab = t.match(/([A-Z])([A-Z]) = (\d+) (cm|m)|qui sont à (\d+) m l’un de l’autre/);
  const da = [...t.matchAll(/à (\d+) (cm|m) (?:de l’arbre |du puits |de )?([A-Z])\b/g)];
  const ray = [...t.matchAll(/centre ([A-Z]) et de rayon (\d+) cm/g)];
  let a: number, b: number;
  if (ray.length === 2) [a, b] = [Number(ray[0][2]), Number(ray[1][2])];
  else {
    const d2 = [...t.matchAll(/à (\d+) (?:cm|m) (?:de l’arbre|du rocher|du puits|du chêne|de) ([A-Z])\b/g)];
    if (d2.length !== 2) return [`deux distances attendues, lu : ${d2.length || da.length}`];
    [a, b] = [Number(d2[0][1]), Number(d2[1][1])];
  }
  if (!ab) return ["distance entre les deux centres illisible"];
  const c = Number(ab[3] ?? ab[5]);
  const juste = c > a + b ? "aucun" : c === a + b ? "un seul" : c > Math.abs(a - b) ? "deux" : c === Math.abs(a - b) ? "un seul" : "aucun";
  return qcm(q, juste);
}
function corrigerZone(q: Q): string[] {
  const t = q.text;
  const m = t.match(/piquet ([A-Z]) (?:par|avec) une corde de (\d+) m/);
  if (!m) return ["piquet ou corde illisible"];
  const [P, L] = [m[1], Number(m[2])];
  const p = canvasCercle(q, P, [{ v: L, u: "m" }]);
  if (/plus grande distance/.test(t)) return [...p, ...attendu(q, 2 * L, "m")];
  return [...p, ...qcm(q, `dans le disque de centre ${P} et de rayon ${L} m`)];
}

export const CORRECTEURS: CorrecteursMaths = {
  cercle_distance_tpl_1: corrigerPortee,
  cercle_distance_tpl_ouverte: corrigerDeuxCercles,
  cercle_distance_tpl_zone: corrigerZone,
  cercle_ensemble_tpl_1: corrigerOuEstLePoint,
  cercle_ensemble_tpl_ouverte: corrigerQuiARaisonEnsemble,
  cercle_defi_tpl_1: corrigerToursOuInverse,
  cercle_defi_tpl_comparer: corrigerComparerTours,
  cercle_defi_tpl_2: corrigerDefi5,
  cercle_perimetre_tpl_1: corrigerPerimetre,
  cercle_perimetre_tpl_2: corrigerPerimetre,
  cercle_proportionnel_tpl_1: corrigerPetitGrand,
  cercle_proportionnel_tpl_2: corrigerTableau,
  cercle_vocabulaire_tpl_1: corrigerRayonVersDiametre,
  cercle_vocabulaire_tpl_2: corrigerDiametreVersRayon,
  cercle_vocabulaire_tpl_nommer: corrigerNommer,
};
