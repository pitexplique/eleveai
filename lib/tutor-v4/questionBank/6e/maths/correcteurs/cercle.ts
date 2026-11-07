import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "../entiers.bank";

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
const centreDuTexte = (t: string) => t.match(/[Cc]entre ([A-Z])\b/)?.[1] ?? t.match(/point ([A-Z]) est le centre/)?.[1] ?? null;

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
  // ★1 nu (03/11/2026) : la figure montre le trait seul, ou la surface coloriée.
  if (/partie coloriée|trait rond/.test(t)) {
    const disque = !!(q.canvas as any)?.display?.showDisk;
    if (/partie coloriée/.test(t) !== disque) return ["la figure ne colorie pas ce que dit l’énoncé"];
    return qcm(q, disque ? "un disque" : "un cercle");
  }
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
  if (/(?<![\d,])1 (cm|m) de diamètre|diamètre 1 (cm|m)/.test(q.text) && !/3,14 (cm|m)/.test(q.text)) return ["le tour de 3,14 pour 1 de diamètre manque"];
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
  const rayon = /[Rr]ayon/.test(q.text) && !/[Dd]iamètre/.test(q.text);
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
  const r = t.match(/[Rr]ayon (?:de |: |mesure )?(\d+) cm|écarté de (\d+) cm/);
  const x = t.match(/[A-Z]{2} = (\d+) cm|à (\d+) cm d(?:e|u centre) [A-Z]|Distance [A-Z]{2} : (\d+) cm/);
  if (!r || !x) return null;
  return { r: Number(r[1] ?? r[2]), x: Number(x[1] ?? x[2] ?? x[3]) };
}
function corrigerOuEstLePoint(q: Q): string[] {
  const rx = rayonEtDistance(q.text);
  if (!rx) return ["rayon ou distance illisible"];
  const { r, x } = rx;
  const juste = x === r ? "sur le cercle" : x < r ? "à l'intérieur du disque, mais pas sur le cercle" : "à l'extérieur du disque";
  const p = [...qcm(q, juste), ...canvasCercle(q, centreDuTexte(q.text) ?? q.text.match(/compas en ([A-Z])/)?.[1] ?? null, [{ v: r, u: "cm" }])];
  // 07/11 : le point dont on demande la place n'est pas dessiné, il donnerait la réponse.
  const f = figure(q);
  if (f && [...f.pts.keys()].some((l) => l && l !== f.centre)) p.push("la figure dessine le point : elle donne la réponse");
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
  const p = [...qcm(q, juste), ...canvasCercle(q, C, [{ v: N, u: "m" }])];
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
    if (f.pts.has(M)) p.push("la figure dessine le point : elle donne la réponse");
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
  // 07/11 : pas de disque colorié quand on demande la zone, il donnerait la réponse.
  if ((q.canvas as any)?.display?.showDisk) p.push("le disque colorié donne la réponse");
  return [...p, ...qcm(q, `dans le disque de centre ${P} et de rayon ${L} m`)];
}

// =====================================================================
// ⭐ 07/11/2026 — CORRECTEURS DES GABARITS « À PLUSIEURS FAÇONS ». Même contrat :
// on relit le texte et la figure, on refait le raisonnement, jamais on ne recopie
// la réponse. Une tournure non reconnue est un défaut.
// =====================================================================
const INCONNUE = ["tournure inconnue du correcteur"];
/** Exactement une proposition juste, et c'est l'attendue. */
function seule(q: Q, juste: (c: string) => boolean): string[] {
  const ch = q.choices ?? [];
  const bons = ch.filter(juste);
  if (bons.length !== 1) return [`${bons.length} proposition(s) justes : ${ch.join(" | ")}`];
  return bons[0] === q.expected[0] ? [] : [`proposition juste « ${bons[0]} », attendue « ${q.expected[0]} »`];
}
const a = (q: Q, c: string) => (q.choices ?? []).includes(c);
const trancher = (q: Q, vrai: boolean) => seule(q, (c) => c === (a(q, "vrai") ? (vrai ? "vrai" : "faux") : vrai ? "oui" : "non"));
const seTranche = (q: Q) => a(q, "oui") || a(q, "vrai");
const reponseNombre = (q: Q, v: number): string[] => {
  const p = egal(nombreFr(String(q.expected[0])), v) ? [] : [`réponse attendue « ${q.expected[0]} », recalculée ${v}`];
  return q.comparator === "number_equal" ? p : [...p, `comparateur ${q.comparator} pour un nombre`];
};
/** Un seul motif de la table doit reconnaître l'énoncé : il dit la réponse juste. */
function parTable<T>(t: string, table: [RegExp, T][]): T | undefined {
  return table.find(([re]) => re.test(t))?.[1];
}
/** Le dessin : points et segments relus par leur identifiant (les points sans nom compris). */
function dessin(q: Q) {
  const c = q.canvas as any;
  if (c?.kind !== "cercle") return null;
  const parId = new Map<string, { x: number; y: number }>((c.points ?? []).map((p: any) => [p.id, p]));
  const R = c.circle.r as number;
  const O = { x: c.circle.cx as number, y: c.circle.cy as number };
  const dist = (P: { x: number; y: number }, Q2: { x: number; y: number }) => Math.hypot(P.x - Q2.x, P.y - Q2.y);
  const surCercle = (P: { x: number; y: number }) => Math.abs(dist(P, O) - R) <= 2;
  const estCentre = (P: { x: number; y: number }) => dist(P, O) <= 1;
  const natureSeg = (s: any): "rayon" | "diametre" | "autre" => {
    const A = parId.get(s.from), B = parId.get(s.to);
    if (!A || !B) return "autre";
    if ((estCentre(A) && surCercle(B)) || (estCentre(B) && surCercle(A))) return "rayon";
    return surCercle(A) && surCercle(B) && Math.abs(dist(A, B) - 2 * R) <= 3 ? "diametre" : "autre";
  };
  return { c, parId, R, O, dist, surCercle, estCentre, natureSeg };
}

// ----- CERCLE_VOCABULAIRE ★1
const DEF_VOC: [RegExp, string][] = [
  [/sans passer par le centre/, "une corde"],
  [/va du centre à un point/, "un rayon"],
  [/par le centre/, "un diamètre"],
  [/même distance de tout le cercle/, "le centre"],
  [/moitié d’un diamètre/, "un rayon"],
  [/mesure deux rayons/, "un diamètre"],
  [/plus longue corde/, "un diamètre"],
  [/le tour et tout l’intérieur/, "le disque"],
  [/le tour du disque/, "le cercle"],
];
function corrVocDef(q: Q): string[] {
  const j = parTable(q.text, DEF_VOC);
  return j ? seule(q, (c) => c === j) : INCONNUE;
}
const VF_VOC: [RegExp, boolean][] = [
  [/un diamètre passe par le centre/, true], [/un rayon part du centre/, true], [/un rayon joint deux points/, false],
  [/une corde passe toujours/, false], [/le diamètre vaut deux rayons/, true], [/le rayon vaut deux diamètres/, false],
  [/tous les rayons .* sont égaux/, true], [/le centre est sur le cercle/, false],
  [/le disque comprend le tour et l’intérieur/, true], [/le cercle comprend tout l’intérieur/, false],
];
function corrVocVF(q: Q): string[] {
  const v = parTable(q.text, VF_VOC);
  return v === undefined ? INCONNUE : trancher(q, v);
}
function corrVocLire(q: Q): string[] {
  const t = q.text;
  const f = figure(q);
  if (!f) return ["pas de figure"];
  if (/centre/.test(t)) {
    if (q.format === "qcm") return seule(q, (c) => c === f.centre);
    if (q.comparator !== "exact_text") return [`comparateur ${q.comparator} pour une lettre`];
    return q.expected[0] === f.centre ? [] : [`attendu ${q.expected[0]}, centre dessiné ${f.centre}`];
  }
  const quoi = t.match(/un rayon|un diamètre|une corde/)?.[0];
  if (!quoi) return INCONNUE;
  const voulu = quoi === "un rayon" ? "rayon" : quoi === "un diamètre" ? "diametre" : "corde";
  return seule(q, (c) => {
    const m = c.match(/^\[([A-Z])([A-Z])\]$/);
    return !!m && natureSegment(q, m[1], m[2]) === voulu;
  });
}
function corrVocCompter(q: Q): string[] {
  const f = dessin(q);
  if (!f) return ["pas de figure"];
  const segs: any[] = f.c.segments ?? [];
  if (/rayons/.test(q.text)) return reponseNombre(q, segs.filter((s) => f.natureSeg(s) === "rayon").length);
  if (/diamètres/.test(q.text)) return reponseNombre(q, segs.filter((s) => f.natureSeg(s) === "diametre").length);
  if (/points/.test(q.text)) return reponseNombre(q, (f.c.points as any[]).filter((p) => f.surCercle(p)).length);
  return INCONNUE;
}
/** Le premier mot rencontré dit ce qui est donné ; le second, ce qu'on cherche. */
function corrVocCalcul(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return [`une seule longueur attendue, lu : ${L.length}`];
  const mots = [...q.text.matchAll(/rayon|diamètre/gi)].map((m) => m[0].toLowerCase());
  if (mots.length !== 2 || mots[0] === mots[1]) return INCONNUE;
  return attendu(q, mots[0] === "rayon" ? 2 * L[0].v : L[0].v / 2, L[0].u);
}
function corrVocOutil(q: Q): string[] {
  const t = q.text;
  const L = longueurs(t);
  if (/instrument trace un cercle/.test(t)) return seule(q, (c) => c === "un compas");
  if (/pointe du compas/.test(t)) return seule(q, (c) => c === "au centre");
  if (/écart du compas donne/.test(t)) return seule(q, (c) => c === "le rayon");
  if (/mesure-t-on un rayon/.test(t)) return seule(q, (c) => c === "une règle graduée");
  if (L.length !== 1) return INCONNUE;
  const { v, u } = L[0];
  if (/^Compas écarté.*le rayon \?$/.test(t)) return attendu(q, v, u);
  if (/^Compas écarté.*le diamètre \?$/.test(t)) return attendu(q, 2 * v, u);
  if (/^Rayon de .*écarter le compas/.test(t)) return attendu(q, v, u);
  if (/^Diamètre de .*écarter le compas/.test(t)) return attendu(q, v / 2, u);
  return INCONNUE;
}

// ----- CERCLE_VOCABULAIRE ★2
function corrVocCorde(q: Q): string[] {
  const t = q.text;
  const L = longueurs(t);
  const dRay = t.match(/[Rr]ayon(?: de| :) (\d+) cm/);
  const dDia = t.match(/[Dd]iamètre(?: mesure| :) (\d+) cm/);
  if (/plus longue corde/.test(t)) {
    if (L.length !== 1) return ["une seule longueur attendue"];
    return attendu(q, /Quel est (?:son|le) rayon/.test(t) ? L[0].v / 2 : 2 * L[0].v, L[0].u);
  }
  const c = t.match(/corde (?:peut-elle mesurer|de) (\d+) cm/);
  if (!c || (!dRay && !dDia) || !seTranche(q)) return INCONNUE;
  const d = dRay ? 2 * Number(dRay[1]) : Number(dDia![1]);
  const x = Number(c[1]);
  if (x === d) return ["corde égale au diamètre : cas qui n’est pas tiré ici"];
  return trancher(q, x < d);
}
function corrVocEgal(q: Q): string[] {
  const t = q.text;
  const donne = t.match(/([A-Z]{2}) = (\d+) cm/) ?? t.match(/\[([A-Z]{2})\] : (\d+) cm/);
  if (!donne) return ["longueur donnée illisible"];
  const noms = [...t.matchAll(/\b[A-Z]{2}\b/g)].map((m) => m[0]);
  const cherche = noms[noms.length - 1];
  const nd = natureSegment(q, donne[1][0], donne[1][1]);
  const nc = natureSegment(q, cherche[0], cherche[1]);
  const fact = (n: string | null) => (n === "rayon" ? 1 : n === "diametre" ? 2 : NaN);
  if (Number.isNaN(fact(nd)) || Number.isNaN(fact(nc))) return [`segments ${donne[1]} (${nd}) ou ${cherche} (${nc}) illisibles sur la figure`];
  return [...attendu(q, (Number(donne[2]) / fact(nd)) * fact(nc), "cm"), ...canvasCercle(q, centreDuTexte(t))];
}
function corrVocLireMesure(q: Q): string[] {
  const f = dessin(q);
  if (!f) return ["pas de figure"];
  const s = (f.c.segments ?? [])[0];
  const m = String(s?.label ?? "").match(/^(\d+) (cm|m)$/);
  if (!m) return ["longueur illisible sur la figure"];
  const n = f.natureSeg(s);
  if (n === "autre") return ["le segment dessiné n’est ni un rayon ni un diamètre"];
  const mots = [...q.text.matchAll(/rayon|diamètre/g)].map((x) => x[0]);
  const cherche = mots[mots.length - 1];
  if (!cherche) return INCONNUE;
  if ((cherche === "rayon") === (n === "rayon")) return ["la figure donne déjà ce qu’on demande"];
  if (mots.length === 2 && (mots[0] === "rayon") !== (n === "rayon")) return ["le texte et la figure ne disent pas le même segment"];
  return attendu(q, n === "rayon" ? 2 * Number(m[1]) : Number(m[1]) / 2, m[2]);
}
/** Un choix « rayon 5 cm » ou « diamètre 8 cm », ramené au diamètre. */
const diametreDuChoix = (c: string) => {
  const m = c.match(/^(rayon|diamètre) (\d+) cm$/);
  return m ? (m[1] === "rayon" ? 2 * Number(m[2]) : Number(m[2])) : NaN;
};
function corrComparerDisques(q: Q): string[] {
  const ds = (q.choices ?? []).map(diametreDuChoix);
  if (ds.some(Number.isNaN)) return ["proposition illisible"];
  if (new Set(ds).size !== ds.length) return ["deux propositions de même taille"];
  const grand = /plus (grand|long)/.test(q.text);
  if (!grand && !/plus (petit|court)/.test(q.text)) return INCONNUE;
  const v = grand ? Math.max(...ds) : Math.min(...ds);
  return seule(q, (c) => diametreDuChoix(c) === v);
}
function corrVocVF2(q: Q): string[] {
  const t = q.text;
  const r = t.match(/\b[Rr]ayon(?: de| mesure-t-il)? (\d+) cm|\br = (\d+) cm/);
  const d = t.match(/[Dd]iamètre(?: de)? (\d+) cm|\bd = (\d+) cm/);
  if (!r || !d || !seTranche(q)) return INCONNUE;
  return trancher(q, 2 * Number(r[1] ?? r[2]) === Number(d[1] ?? d[2]));
}

// ----- CERCLE_PROPORTIONNEL ★1
function corrPropEffet(q: Q): string[] {
  const t = q.text;
  const mot = t.match(/\b(double|triple)\b/)?.[1];
  const n = mot ? (mot === "double" ? 2 : 3) : Number(t.match(/par (\d+)/)?.[1] ?? NaN);
  if (Number.isNaN(n)) return INCONNUE;
  if (/multiplié par combien/.test(t)) return reponseNombre(q, n);
  return seule(q, (c) => c === (/divisé/.test(t) ? `il est divisé par ${n}` : `il est multiplié par ${n}`));
}
const VF_PROP: [RegExp, boolean][] = [
  [/plus grand diamètre donne un plus grand tour/, true], [/même diamètre ont le même tour/, true], [/ne dépend pas du diamètre/, false],
  [/est proportionnel au diamètre/, true], [/vaut exactement 2 diamètres/, false], [/donne toujours le même nombre/, true],
  [/change avec la taille/, false], [/vaut environ 3 diamètres/, true], [/le tour quadruple/, false], [/plus petit diamètre donne un plus grand tour/, false],
];
function corrPropVF(q: Q): string[] {
  const v = parTable(q.text, VF_PROP);
  return v === undefined ? INCONNUE : trancher(q, v);
}
function corrPropChoisir(q: Q): string[] {
  const ds = (q.choices ?? []).map((c) => Number(c.match(/^(\d+) cm$/)?.[1] ?? NaN));
  if (ds.some(Number.isNaN)) return ["proposition illisible"];
  const grand = /plus (grand|long)/.test(q.text);
  if (!grand && !/plus (petit|court)/.test(q.text)) return INCONNUE;
  return seule(q, (c) => parseInt(c) === (grand ? Math.max(...ds) : Math.min(...ds)));
}
/** Deux longueurs : le rapport du plus grand au plus petit, entier. */
function rapportLu(t: string): number | null {
  const L = longueurs(t);
  if (L.length !== 2) return null;
  const k = Math.round((Math.max(L[0].v, L[1].v) / Math.min(L[0].v, L[1].v)) * 1e6) / 1e6;
  return Number.isInteger(k) && k >= 2 ? k : null;
}
function corrPropRapport(q: Q): string[] {
  const k = rapportLu(q.text);
  if (k === null) return ["rapport illisible ou non entier"];
  if (q.format === "qcm") return seule(q, (c) => c === `il est multiplié par ${k}`);
  return reponseNombre(q, k);
}
function corrPropPi(q: Q): string[] {
  const t = q.text;
  if (/1 (cm|m)\b/.test(t)) {
    const u = longueurs(t)[0].u;
    return attendu(q, 3.14, u);
  }
  if (/Tour ÷ diamètre vaut|Le nombre π vaut|Par quel nombre multiplier/.test(t)) return seule(q, (c) => c === "3,14");
  if (/nombre tour ÷ diamètre/.test(t)) return seule(q, (c) => c === "π");
  if (/combien de diamètres font un tour/.test(t)) return seule(q, (c) => c === "environ 3");
  if (/π change-t-il/.test(t)) return trancher(q, false);
  return INCONNUE;
}
function corrPropTableau1(q: Q): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "tableau_proportionnalite") return ["pas de tableau"];
  const m = c.missing?.[0];
  if (!m || m.row !== 1) return ["la case cachée n’est pas un tour"];
  const autre = m.col === 0 ? 1 : 0;
  const v0 = c.values[0].map(nombreFr), v1 = c.values[1].map(nombreFr);
  const coef = v1[autre] / v0[autre];
  if (Math.abs(coef - 3.14) > 1e-6) return [`la colonne visible donne ${coef}, pas 3,14`];
  const u = c.rowLabels?.[0]?.match(/\((cm|m)\)/)?.[1];
  if (!u) return ["unité du tableau illisible"];
  return attendu(q, tour(v0[m.col]), u);
}

// ----- CERCLE_PROPORTIONNEL ★2
function corrPropValeur(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 3) return [`trois longueurs attendues, lu : ${L.length}`];
  const [x, y, c] = L;
  const [d, t] = egal(tour(x.v), y.v) ? [x.v, y.v] : egal(tour(y.v), x.v) ? [y.v, x.v] : [NaN, NaN];
  if (Number.isNaN(d)) return ["le tour donné ne vaut pas 3,14 × le diamètre donné"];
  if (/Quel diamètre/.test(q.text)) return attendu(q, Math.round((c.v / t) * d * 1e6) / 1e6, "cm");
  const k = Math.round((Math.max(c.v, d) / Math.min(c.v, d)) * 1e6) / 1e6;
  if (!Number.isInteger(k) || k < 2) return [`le rapport des diamètres n’est pas entier (${c.v} et ${d})`];
  return attendu(q, tour(c.v), "cm");
}
function corrPropQuotient(q: Q): string[] {
  const c = q.canvas as any;
  let t: number, d: number;
  const division = q.text.match(/calcule (\d+(?:,\d+)?) ÷ (\d+)/);
  if (c?.kind === "tableau_proportionnalite") {
    d = nombreFr(c.values[0][0]);
    t = nombreFr(c.values[1][0]);
  } else if (division) {
    t = nombreFr(division[1]);
    d = Number(division[2]);
  } else {
    const L = longueurs(q.text);
    if (L.length !== 2) return ["deux longueurs attendues"];
    t = Math.max(L[0].v, L[1].v);
    d = Math.min(L[0].v, L[1].v);
  }
  return reponseNombre(q, Math.round((t / d) * 100) / 100);
}
function corrPropVerifier(q: Q): string[] {
  const t = q.text;
  if (!seTranche(q)) return INCONNUE;
  const calc = t.match(/(\d+) × 3,14 = (\d+(?:,\d+)?) \?/);
  if (calc) return trancher(q, egal(tour(Number(calc[1])), nombreFr(calc[2])));
  const L = longueurs(t);
  if (L.length !== 2) return ["deux longueurs attendues"];
  const dia = t.match(/[Dd]iamètre(?: de| peut-il mesurer)? (\d+) cm|(\d+) cm de diamètre/);
  if (!dia) return ["diamètre illisible"];
  const d = Number(dia[1] ?? dia[2]);
  const autre = L.find((x) => !egal(x.v, d));
  // Un tour égal au diamètre n'est jamais tiré : il y a toujours deux valeurs.
  if (!autre) return ["une seule valeur lue"];
  return trancher(q, egal(tour(d), autre.v));
}
function corrPropIntrus(q: Q): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "tableau_proportionnalite") return ["pas de tableau"];
  if ((c.missing ?? []).length) return ["ce tableau ne doit pas avoir de case cachée"];
  const v0: number[] = c.values[0].map(nombreFr), v1: number[] = c.values[1].map(nombreFr);
  const fausses = v0.filter((d, i) => !egal(tour(d), v1[i]));
  if (seTranche(q)) {
    if (fausses.length > 1) return ["plusieurs colonnes fausses"];
    return trancher(q, fausses.length === 0);
  }
  if (fausses.length !== 1) return [`${fausses.length} colonne(s) fausses, une seule attendue`];
  return seule(q, (x) => parseInt(x) === fausses[0]);
}

// ----- CERCLE_PERIMETRE ★1
const FORMULES: [RegExp, string][] = [
  [/formule .* avec le diamètre/, "P = π × d"],
  [/formule .* avec le rayon/, "P = 2 × π × r"],
  [/^Complète : P = π × …/, "d"],
  [/^Complète : P = 2 × π × …/, "r"],
  [/^Complète : P = … × d/, "π"],
  [/que désigne d \?/, "le diamètre"],
  [/que désigne P \?/, "le périmètre"],
  [/que désigne r \?/, "le rayon"],
  [/quelle valeur prend-on pour π/, "3,14"],
];
function corrPeriFormule(q: Q): string[] {
  const j = parTable(q.text, FORMULES);
  return j ? seule(q, (c) => c === j) : INCONNUE;
}
const SENS_VF: [RegExp, boolean][] = [
  [/est une longueur/, true], [/: P = π × d\./, true], [/: P = π × r\./, false], [/: P = 2 × π × r\./, true],
  [/est la surface/, false], [/vaut environ 3,14/, true], [/vaut exactement 3/, false],
];
function corrPeriSens(q: Q): string[] {
  const t = q.text;
  if (/^Vrai ou faux/.test(t)) {
    const v = parTable(t, SENS_VF);
    return v === undefined ? INCONNUE : trancher(q, v);
  }
  if (/périmètre d’un disque, c’est|Que mesure le périmètre/.test(t)) return seule(q, (c) => c === "la longueur de son tour");
  if (/le tour d’un disque \?/.test(t)) return seule(q, (c) => c === "le périmètre");
  if (/quelle unité/.test(t)) return seule(q, (c) => c === "cm");
  return INCONNUE;
}
function corrPeriChoisirCalcul(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return ["une seule longueur attendue"];
  const v = L[0].v;
  const rayon = /rayon/i.test(q.text);
  if (!rayon && !/diamètre/i.test(q.text)) return INCONNUE;
  return seule(q, (c) => c === (rayon ? `2 × 3,14 × ${v}` : `3,14 × ${v}`));
}
function corrPeriDansFormule(q: Q): string[] {
  const t = q.text;
  const deux = t.match(/P = 2 × 3,14 × (\d+) cm/);
  const un = t.match(/P = 3,14 × (\d+) cm/);
  if (deux || un) {
    const d = deux ? 2 * Number(deux[1]) : Number(un![1]);
    if (/Quel est le rayon/.test(t)) return attendu(q, d / 2, "cm");
    if (/Quel est le diamètre|Que vaut d/.test(t)) return attendu(q, d, "cm");
    return INCONNUE;
  }
  const r = t.match(/[Rr]ayon(?: est)? (\d+) cm|r = (\d+) cm/);
  if (r && /(mettre|vaut d)/.test(t)) return attendu(q, 2 * Number(r[1] ?? r[2]), "cm");
  return INCONNUE;
}

// ----- CERCLE_PERIMETRE ★2
function corrPeriFigure(q: Q): string[] {
  const f = dessin(q);
  if (!f) return ["pas de figure"];
  if (longueurs(q.text).length) return ["la longueur doit être sur la figure seulement"];
  if (!/π ≈ 3,14/.test(q.text)) return ["la valeur de π n’est pas donnée"];
  const s = (f.c.segments ?? [])[0];
  const m = String(s?.label ?? "").match(/^(\d+) (cm|m)$/);
  if (!m) return ["longueur illisible sur la figure"];
  const n = f.natureSeg(s);
  if (n === "autre") return ["le segment dessiné n’est ni un rayon ni un diamètre"];
  return attendu(q, tour(n === "rayon" ? 2 * Number(m[1]) : Number(m[1])), m[2]);
}
function corrPeriInverse(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return ["une seule longueur attendue"];
  if (!/π ≈ 3,14/.test(q.text)) return ["la valeur de π n’est pas donnée"];
  const d = Math.round((L[0].v / 3.14) * 1e6) / 1e6;
  if (!Number.isInteger(d)) return [`${L[0].v} ÷ 3,14 ne tombe pas juste`];
  if (/rayon/.test(q.text)) return attendu(q, d / 2, L[0].u);
  if (/diamètre/.test(q.text)) return attendu(q, d, L[0].u);
  return INCONNUE;
}
function corrPeriErreur(q: Q): string[] {
  const t = q.text;
  const v = t.match(/(rayon|diamètre)(?: de)? (\d+) cm/i);
  const x = t.match(/3,14 × (\d+)/);
  if (!v || !x || !seTranche(q)) return INCONNUE;
  const bon = v[1].toLowerCase() === "rayon" ? 2 * Number(v[2]) : Number(v[2]);
  return trancher(q, bon === Number(x[1]));
}
function corrPeriEstimer(q: Q): string[] {
  const L = longueurs(q.text);
  if (L.length !== 1) return ["une seule longueur attendue"];
  const m = q.text.match(/rayon|diamètre/i);
  if (!m) return INCONNUE;
  const P = tour(m[0].toLowerCase() === "rayon" ? 2 * L[0].v : L[0].v);
  const vals = (q.choices ?? []).map((c) => Number(c.match(/^environ (\d+) cm$/)?.[1] ?? NaN));
  if (vals.some(Number.isNaN)) return ["proposition illisible"];
  const proche = vals.reduce((x, y) => (Math.abs(y - P) < Math.abs(x - P) ? y : x));
  if (new Set(vals).size !== vals.length) return ["deux propositions égales"];
  return seule(q, (c) => parseInt(c.replace("environ ", "")) === proche);
}

// ----- CERCLE_ENSEMBLE ★2
/** Oui/non sur la place d'un point, d'après le mot de la question. */
function corrPlaceOuiNon(q: Q): string[] {
  const rx = rayonEtDistance(q.text);
  if (!rx || !seTranche(q)) return ["rayon, distance ou question illisible"];
  const { r, x } = rx;
  if (/hors du disque/.test(q.text)) return trancher(q, x > r);
  if (/sur (?:le|ce) cercle \?|dessus \?/.test(q.text)) return trancher(q, x === r);
  if (/dans le disque \?|dedans \?/.test(q.text)) return trancher(q, x <= r);
  return INCONNUE;
}
/** Un point SUR le cercle : on cherche OM, le rayon ou le diamètre. */
function corrPointDessus(q: Q): string[] {
  const t = q.text;
  const L = longueurs(t);
  if (L.length !== 1) return ["une seule longueur attendue"];
  const { v, u } = L[0];
  const dist = /[A-Z]{2} = \d+ cm/.test(t);
  if (dist) {
    if (/le rayon(?: \?|\.)/.test(t)) return attendu(q, v, u);
    if (/le diamètre(?: \?|\.)/.test(t)) return attendu(q, 2 * v, u);
    return INCONNUE;
  }
  if (!/(?:Calcule|Combien mesure) [A-Z]{2}/.test(t)) return INCONNUE;
  return attendu(q, /[Dd]iamètre/.test(t) ? v / 2 : v, u);
}
function corrChoixPoint(q: Q): string[] {
  const f = dessin(q);
  if (!f) return ["pas de figure"];
  const t = q.text;
  const distance = (lettre: string) => {
    const p = (f.c.points as any[]).find((x) => x.label === lettre);
    return p ? f.dist(p, f.O) / f.R : NaN;
  };
  const ds = (q.choices ?? []).map(distance);
  if (ds.some(Number.isNaN)) return ["un point proposé n’est pas sur la figure"];
  const sur = (x: number) => Math.abs(x - 1) <= 0.03;
  if (/pas sur le cercle|plus près/.test(t)) return seule(q, (c) => distance(c) < 0.97 && (!/plus près/.test(t) || distance(c) === Math.min(...ds)));
  if (/sur le cercle/.test(t)) return seule(q, (c) => sur(distance(c)));
  if (/extérieur|hors du disque/.test(t)) return seule(q, (c) => distance(c) > 1.03);
  if (/plus loin/.test(t)) return seule(q, (c) => distance(c) === Math.max(...ds));
  return INCONNUE;
}
function corrEnsDef(q: Q): string[] {
  const t = q.text;
  const m = t.match(/(\d+) cm/);
  if (!m) return INCONNUE;
  const r = m[1];
  const O = t.match(/ de ([A-Z])\b/)?.[1] ?? t.match(/centre ([A-Z])\b/)?.[1];
  if (/quelle distance au centre/i.test(t)) return attendu(q, Number(r), "cm");
  if (/^Combien de points/.test(t)) return seule(q, (c) => c === "une infinité");
  if (/^Le cercle de centre/.test(t)) return seule(q, (c) => c === `à ${r} cm de ${O}`);
  if (/^Le disque de centre/.test(t)) return seule(q, (c) => c === `à ${r} cm au plus de ${O}`);
  if (/au plus de|ou moins de/.test(t)) return seule(q, (c) => c === "un disque");
  if (/forment|exactement/.test(t)) return seule(q, (c) => c === "un cercle");
  return INCONNUE;
}
const VF_ENS: [RegExp, boolean][] = [
  [/un point du cercle est aussi dans le disque/, true], [/le centre est sur le cercle/, false], [/le centre est dans le disque/, true],
  [/à la même distance du centre/, true], [/un point du disque est toujours sur le cercle/, false], [/le cercle est le bord du disque/, true],
  [/à plus d’un rayon du centre est dans le disque/, false], [/à moins d’un rayon du centre est dans le disque/, true],
];
function corrEnsVF(q: Q): string[] {
  const v = parTable(q.text, VF_ENS);
  return v === undefined ? INCONNUE : trancher(q, v);
}

// ----- CERCLE_ENSEMBLE ★3
function corrListe(q: Q): string[] {
  const t = q.text;
  const lus = [...t.matchAll(/[A-Z]([A-Z]) = (\d+) cm/g)].map((m) => ({ l: m[1], x: Number(m[2]) }));
  const r = t.match(/rayon (\d+) cm|rayon du cercle de centre [A-Z] est (\d+) cm/);
  if (lus.length !== 3 || !r) return ["distances ou rayon illisibles"];
  const R = Number(r[1] ?? r[2]);
  const test = /sur le cercle/.test(t) ? (x: number) => x === R : /hors du disque/.test(t) ? (x: number) => x > R : /à l’intérieur/.test(t) ? (x: number) => x < R : null;
  if (!test) return INCONNUE;
  return seule(q, (c) => test(lus.find((p) => p.l === c)?.x ?? NaN));
}
function corrChoixDistance(q: Q): string[] {
  const t = q.text;
  const r = t.match(/rayon (\d+) cm|écarte son compas de (\d+) cm/);
  if (!r) return ["rayon illisible"];
  const R = Number(r[1] ?? r[2]);
  const test = /sur le cercle/.test(t) ? (x: number) => x === R : /à l’intérieur/.test(t) ? (x: number) => x < R : /hors du disque/.test(t) ? (x: number) => x > R : null;
  if (!test) return INCONNUE;
  return seule(q, (c) => test(Number(c.match(/= (\d+) cm$/)?.[1] ?? NaN)));
}
function corrCorde3(q: Q): string[] {
  const t = q.text;
  if (/sans passer par/.test(t)) return seule(q, (c) => c === "une corde");
  if (/passe par|en passant par/.test(t)) return seule(q, (c) => c === "un diamètre");
  if (/(?:joint|relie) le centre/.test(t)) return seule(q, (c) => c === "un rayon");
  return INCONNUE;
}

/** Énoncé ★1-★2 : aucun prénom, aucun objet rond (REGLES-6E.md, 03/11/2026). */
const aPrenom = (t: string) => PRENOMS.some((x) => new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u").test(t));
const aObjet = (t: string) => RONDS.some(([re]) => re.test(t));
function nu(f: (q: Q) => string[]) {
  return (q: Q) => [
    ...f(q),
    ...(aPrenom(q.text) ? ["prénom dans un énoncé nu (★1-★2)"] : []),
    ...(aObjet(q.text) ? ["objet de la vie courante dans un énoncé nu (★1-★2)"] : []),
  ];
}
function enSituation(f: (q: Q) => string[]) {
  return (q: Q) => [...f(q), ...(aPrenom(q.text) || aObjet(q.text) ? [] : ["gabarit ★3 sans situation"])];
}
const demandeLeRayon = (t: string) => /(rayon|compas) \?$|son rayon\.$/.test(t);

// ⭐ 07/11/2026 — deux cercles ★5 : on relit les rayons et la distance dans le texte.
const distanceCentres = (t: string) => t.match(/\b[A-Z]{2} = (\d+) (?:cm|m)\b/);
function corrigerDeuxExtreme(q: Q): string[] {
  const d = [...q.text.matchAll(/à (\d+) cm de ([A-Z])\b/g)].map((m) => Number(m[1]));
  if (d.length !== 2) return [`deux distances attendues, lu : ${d.length}`];
  const grand = /plus grande|au plus/.test(q.text);
  if (!grand && !/plus petite|au moins/.test(q.text)) return ["ni la plus grande ni la plus petite distance demandée"];
  return attendu(q, grand ? d[0] + d[1] : Math.abs(d[0] - d[1]), "cm");
}
function corrigerDeuxTouche(q: Q): string[] {
  const r = q.text.match(/(?:rayon de |pour rayon |rayon du cercle de centre [A-Z] est |et pour rayon |de rayon )(\d+) cm/);
  const c = distanceCentres(q.text);
  if (!r || !c) return ["rayon ou distance entre les centres illisible"];
  const touche = Number(c[1]) - Number(r[1]);
  return attendu(q, /sans le toucher/.test(q.text) ? touche - 1 : touche, "cm");
}
function corrigerDeuxCoupent(q: Q): string[] {
  const r = [...q.text.matchAll(/centre [A-Z] et de rayon (\d+) cm/g)].map((m) => Number(m[1]));
  const c = distanceCentres(q.text);
  if (r.length !== 2 || !c) return ["deux rayons et une distance attendus"];
  const d = Number(c[1]);
  if (d === r[0] + r[1] || d === Math.abs(r[0] - r[1])) return ["cercles tangents : « se coupent » serait discutable"];
  return qcm(q, d > Math.abs(r[0] - r[1]) && d < r[0] + r[1] ? "oui" : "non");
}
function corrigerDeuxZone(q: Q): string[] {
  const r = [...q.text.matchAll(/à moins de (\d+) m de [A-Z]\b/g)].map((m) => Number(m[1]));
  const c = distanceCentres(q.text);
  if (r.length !== 2 || !c) return ["deux portées et une distance attendues"];
  if (Number(c[1]) === r[0] + r[1]) return ["disques tangents : la réponse serait discutable"];
  return qcm(q, Number(c[1]) < r[0] + r[1] ? "oui" : "non");
}
function corrigerDeuxSomme(q: Q): string[] {
  const r = [...q.text.matchAll(/centre [A-Z] et de rayon (\d+) cm/g)].map((m) => Number(m[1]));
  if (r.length !== 2) return [`deux rayons attendus, lu : ${r.length}`];
  if (!/périmètre/.test(q.text)) return attendu(q, r[0] + r[1], "cm");
  const c = distanceCentres(q.text);
  if (!c) return ["distance entre les centres illisible"];
  const d = Number(c[1]);
  if (d >= r[0] + r[1] || d <= Math.abs(r[0] - r[1])) return ["triangle impossible"];
  return attendu(q, r[0] + r[1] + d, "cm");
}

export const CORRECTEURS: CorrecteursMaths = {
  cercle_distance_tpl_deux_plus_grande: corrigerDeuxExtreme,
  cercle_distance_tpl_deux_plus_petite: corrigerDeuxExtreme,
  cercle_distance_tpl_deux_touche: corrigerDeuxTouche,
  cercle_distance_tpl_deux_sans_toucher: corrigerDeuxTouche,
  cercle_distance_tpl_deux_coupent: corrigerDeuxCoupent,
  cercle_distance_tpl_deux_zone: corrigerDeuxZone,
  cercle_distance_tpl_deux_somme: corrigerDeuxSomme,
  cercle_distance_tpl_1: corrigerPortee,
  cercle_distance_tpl_ouverte: corrigerDeuxCercles,
  cercle_distance_tpl_zone: corrigerZone,
  cercle_ensemble_tpl_1: corrigerOuEstLePoint,
  cercle_ensemble_tpl_ouverte: corrigerQuiARaisonEnsemble,
  cercle_defi_tpl_1: corrigerToursOuInverse,
  cercle_defi_tpl_comparer: corrigerComparerTours,
  cercle_defi_tpl_2: corrigerDefi5,
  cercle_perimetre_tpl_1: nu(corrigerPerimetre),
  cercle_perimetre_tpl_ctx3: enSituation(corrigerPerimetre),
  cercle_perimetre_tpl_2: corrigerPerimetre,
  cercle_proportionnel_tpl_1: corrigerPetitGrand,
  cercle_proportionnel_tpl_2: nu(corrigerTableau),
  cercle_proportionnel_tpl_ctx3: enSituation(corrigerTableau),
  cercle_vocabulaire_tpl_1: nu(corrigerRayonVersDiametre),
  cercle_vocabulaire_tpl_2: nu(corrigerDiametreVersRayon),
  cercle_vocabulaire_tpl_nommer: nu(corrigerNommer),
  cercle_vocabulaire_tpl_ctx3: enSituation((q) =>
    q.format === "qcm" ? corrigerNommer(q) : demandeLeRayon(q.text) ? corrigerDiametreVersRayon(q) : corrigerRayonVersDiametre(q),
  ),
  // ⭐ 07/11/2026
  cercle_vocabulaire_tpl_def: nu(corrVocDef),
  cercle_vocabulaire_tpl_vrai_faux: nu(corrVocVF),
  cercle_vocabulaire_tpl_lire: nu(corrVocLire),
  cercle_vocabulaire_tpl_compter: nu(corrVocCompter),
  cercle_vocabulaire_tpl_calcul: nu(corrVocCalcul),
  cercle_vocabulaire_tpl_outil: nu(corrVocOutil),
  cercle_vocabulaire_tpl_corde: nu(corrVocCorde),
  cercle_vocabulaire_tpl_egal: nu(corrVocEgal),
  cercle_vocabulaire_tpl_lire_mesure: nu(corrVocLireMesure),
  cercle_vocabulaire_tpl_comparer: nu(corrComparerDisques),
  cercle_vocabulaire_tpl_vrai_faux2: nu(corrVocVF2),
  cercle_proportionnel_tpl_effet: nu(corrPropEffet),
  cercle_proportionnel_tpl_vrai_faux: nu(corrPropVF),
  cercle_proportionnel_tpl_choisir: nu(corrPropChoisir),
  cercle_proportionnel_tpl_rapport1: nu(corrPropRapport),
  cercle_proportionnel_tpl_pi: nu(corrPropPi),
  cercle_proportionnel_tpl_tableau1: nu(corrPropTableau1),
  cercle_proportionnel_tpl_valeur: nu(corrPropValeur),
  cercle_proportionnel_tpl_quotient: nu(corrPropQuotient),
  cercle_proportionnel_tpl_verifier: nu(corrPropVerifier),
  cercle_proportionnel_tpl_rapport2: nu(corrPropRapport),
  cercle_proportionnel_tpl_intrus: nu(corrPropIntrus),
  cercle_perimetre_tpl_formule: nu(corrPeriFormule),
  cercle_perimetre_tpl_sens: nu(corrPeriSens),
  cercle_perimetre_tpl_choisir_calcul: nu(corrPeriChoisirCalcul),
  cercle_perimetre_tpl_calcul1: nu(corrigerPerimetre),
  cercle_perimetre_tpl_dans_formule: nu(corrPeriDansFormule),
  cercle_perimetre_tpl_rayon2: nu(corrigerPerimetre),
  cercle_perimetre_tpl_figure2: nu(corrPeriFigure),
  cercle_perimetre_tpl_inverse2: nu(corrPeriInverse),
  cercle_perimetre_tpl_comparer2: nu(corrComparerDisques),
  cercle_perimetre_tpl_erreur2: nu(corrPeriErreur),
  cercle_perimetre_tpl_estimer2: nu(corrPeriEstimer),
  cercle_ensemble_tpl_position2: nu(corrigerOuEstLePoint),
  cercle_ensemble_tpl_oui_non2: nu(corrPlaceOuiNon),
  cercle_ensemble_tpl_distance2: nu(corrPointDessus),
  cercle_ensemble_tpl_choix_point2: nu(corrChoixPoint),
  cercle_ensemble_tpl_definition2: nu(corrEnsDef),
  cercle_ensemble_tpl_vrai_faux2: nu(corrEnsVF),
  cercle_ensemble_tpl_ctx3_compas: enSituation(corrPlaceOuiNon),
  cercle_ensemble_tpl_rayon3: enSituation(corrPointDessus),
  cercle_ensemble_tpl_liste3: corrListe,
  cercle_ensemble_tpl_choix_distance3: corrChoixDistance,
  cercle_ensemble_tpl_corde3: corrCorde3,
};
