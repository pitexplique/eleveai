import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Correcteurs des gabarits de cercle-circonscrit.bank.ts (06/10/2026, voir
// types.ts). Chaque correcteur RELIT les lettres du triangle et du centre, les
// longueurs, refait le raisonnement (centre à égale distance des trois sommets,
// pas de la preuve, ordre du programme de construction) et relit le canvas :
// sommets SUR le cercle, centre au centre, lettres et longueur de l'énoncé.

type Q = TutorGeneratedQuestionV4;
const nombreFr = (s: string) => Number(String(s).replace(/[  ]/g, "").replace(",", "."));

function attendu(q: Q, v: number, u: string): string[] {
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?) (cm|m|km)$/);
  if (!m) return [`réponse attendue sans unité ou illisible : « ${q.expected[0]} »`];
  const p: string[] = [];
  if (Math.abs(nombreFr(m[1]) - v) > 1e-9) p.push(`réponse attendue ${m[1]}, recalculée ${v}`);
  if (m[2] !== u) p.push(`unité attendue ${m[2]}, recalculée ${u}`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator}`);
  return p;
}
function qcm(q: Q, juste: string): string[] {
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${juste} »`);
  if (!(q.choices ?? []).includes(juste)) p.push(`« ${juste} » n’est pas parmi les propositions`);
  return p;
}

/** Le triangle (trois lettres) et le centre nommés dans le texte. */
function triangle(t: string) {
  const tri = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/) ?? t.match(/\b([A-Z]), ([A-Z]) et ([A-Z])\b/);
  const centre =
    [
      /centre ([A-Z])\b/,
      /point ([A-Z]) est le point de concours/,
      /\b([A-Z]) est le point de concours/,
      /se coupent en ([A-Z])\b/,
      /\b([A-Z]) est sur les trois médiatrices/,
      /placée? en ([A-Z])\b/,
      /en ([A-Z]) à \d/,
    ]
      .map((re) => t.match(re)?.[1])
      .find(Boolean) ?? null;
  return tri ? { s: [tri[1], tri[2], tri[3]], o: centre } : null;
}

/** Le canvas : sommets sur le cercle, centre au centre, lettres et longueur de l'énoncé. */
function canvasTriangle(q: Q, s: string[], o: string, longueur?: string): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.kind === "construction") return constructionRelue(q, { s, o });
  if (c.kind !== "cercle") return [`canvas inattendu : ${c.kind}`];
  const p: string[] = [];
  const pt = (l: string) => (c.points ?? []).find((x: any) => x.label === l);
  const O = pt(o);
  if (!O || O.x !== c.circle.cx || O.y !== c.circle.cy) p.push(`le centre ${o} n’est pas au centre du cercle dessiné`);
  for (const l of s) {
    const P = pt(l);
    if (!P) p.push(`le sommet ${l} manque sur la figure`);
    else if (Math.abs(Math.hypot(P.x - c.circle.cx, P.y - c.circle.cy) - c.circle.r) > 2) p.push(`le sommet ${l} n’est pas sur le cercle`);
  }
  const lettresFig = (c.points ?? []).map((x: any) => x.label).filter(Boolean);
  if (lettresFig.some((l: string) => ![...s, o].includes(l))) p.push(`lettre dessinée absente de l’énoncé : ${lettresFig.join("")}`);
  for (const seg of c.segments ?? [])
    if (seg.label && seg.label !== longueur) p.push(`longueur dessinée « ${seg.label} », énoncé « ${longueur ?? "aucune"} »`);
  return p;
}

// ----- CIRCONSCRIT_CONCOURANTES / CONSTRUIRE / DEFI : les longueurs
function corrigerDistanceSommet(q: Q): string[] {
  const t = q.text;
  const tri = triangle(t);
  if (!tri || !tri.o) return ["triangle ou centre illisible"];
  const o = tri.o;
  const L = [...t.matchAll(/(\d+) (cm|m|km)/g)].map((m) => ({ v: Number(m[1]), u: m[2] }));
  if (L.length !== 1) return [`une seule longueur attendue, lu : ${L.length}`];
  const { v, u } = L[0];
  const demande = t.match(/(?:mesure|vaut|donne|longueur) ([A-Z])([A-Z]) ?[?.]/);
  const parDiametre = /diamètre (?:de )?\d+|diamètre \d+|centre [A-Z], diamètre/.test(t);
  const veutDiametre = /Quel est le diamètre/.test(t);
  const p: string[] = [];
  if (veutDiametre) p.push(...attendu(q, 2 * v, u));
  else {
    if (!demande || demande[1] !== o || !tri.s.includes(demande[2])) return [`la longueur demandée n’est pas centre → sommet : ${demande?.[0]}`];
    p.push(...attendu(q, parDiametre ? v / 2 : v, u));
  }
  // La longueur donnée est-elle bien du centre à un sommet (ou le rayon, le diamètre) ?
  const donnee = t.match(new RegExp(`${o}([A-Z]) = ${v}`));
  if (donnee && !tri.s.includes(donnee[1])) p.push(`${o}${donnee[1]} n’est pas une distance centre → sommet`);
  const lab = (q.canvas as any)?.segments?.find((x: any) => x.label)?.label;
  if (lab && lab !== `${v} ${u}`) p.push(`longueur dessinée « ${lab} » ≠ ${v} ${u}`);
  return [...p, ...canvasTriangle(q, tri.s, o, lab ? `${v} ${u}` : undefined)];
}

// ----- La preuve, pas à pas
function corrigerPreuve(q: Q): string[] {
  const t = q.text;
  const tri = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/);
  if (!tri) return ["triangle illisible"];
  const dansTri = (...l: string[]) => l.every((x) => `${tri[1]}${tri[2]}${tri[3]}`.includes(x));
  // Le pas 4 : de deux égalités, la troisième (transitivité), puis la médiatrice.
  const sait = t.match(/On sait que ([A-Z])([A-Z]) = ([A-Z])([A-Z]) et que ([A-Z])([A-Z]) = ([A-Z])([A-Z])\./);
  if (sait) {
    const [, o1, a, o2, b, o3, b2, o4, c] = sait;
    if (new Set([o1, o2, o3, o4]).size !== 1 || b !== b2 || !dansTri(a, b, c)) return ["les deux égalités ne s’enchaînent pas"];
    return qcm(q, `${o1}${a} = ${o1}${c}, donc ${o1} est sur la médiatrice de [${a}${c}]`);
  }
  // Le pas 5 : la propriété de la médiatrice dans l'autre sens.
  const pq = t.match(/Pourquoi ([A-Z]) est-il sur la médiatrice de \[([A-Z])([A-Z])\]/);
  if (pq) {
    if (!dansTri(pq[2], pq[3])) return ["le segment n’est pas un côté du triangle"];
    return qcm(q, `parce que ${pq[1]} est à égale distance de ${pq[2]} et de ${pq[3]}`);
  }
  const deb = t.match(/le point d’intersection des médiatrices de \[([A-Z])([A-Z])\] et de \[([A-Z])([A-Z])\]/);
  const c = q.choices ?? [];
  // Le point de départ, lu dans le texte ou dans la proposition qui le décrit.
  const src = deb ? t : c.find((x) => /point d’intersection des médiatrices/.test(x)) ?? "";
  const d = src.match(/appelle ([A-Z]) le point d’intersection des médiatrices de \[([A-Z])([A-Z])\] et de \[([A-Z])([A-Z])\]/);
  if (!tri || !d) return ["triangle ou point de départ illisible"];
  const [, o, a, b, b2, cc] = d;
  if (b !== b2) return ["les deux médiatrices de départ n’ont pas de sommet commun"];
  if (new Set([a, b, cc]).size !== 3 || ![a, b, cc].every((x) => `${tri[1]}${tri[2]}${tri[3]}`.includes(x))) return ["les médiatrices ne sont pas celles des côtés du triangle"];
  let juste: string;
  if (/Par quoi commence/.test(t)) juste = `on appelle ${o} le point d’intersection des médiatrices de [${a}${b}] et de [${b}${cc}]`;
  else if (new RegExp(`${o} est sur la médiatrice de \\[${a}${b}\\]\\. Qu’en`).test(t)) juste = `${o}${a} = ${o}${b}`;
  else if (new RegExp(`${o} est sur la médiatrice de \\[${b}${cc}\\]\\. Qu’en`).test(t)) juste = `${o}${b} = ${o}${cc}`;
  else if (/On sait que/.test(t)) juste = `${o}${a} = ${o}${cc}, donc ${o} est sur la médiatrice de [${a}${cc}]`;
  else if (/Pourquoi/.test(t)) juste = `parce que ${o} est à égale distance de ${a} et de ${cc}`;
  else return ["pas de la preuve inconnu du correcteur"];
  return qcm(q, juste);
}

// ----- Le programme de construction
function corrigerConstruction(q: Q): string[] {
  const t = q.text;
  const c = q.choices ?? [];
  const rang = ["première", "deuxième", "troisième", "dernière"].findIndex((r) => t.includes(`la ${r} étape`));
  if (rang >= 0) {
    // Mon propre ordre, reconnu au verbe de chaque étape.
    const ordre = [/^tracer les médiatrices/, /^appeler/, /^pointer le compas/, /^tracer le cercle/];
    const juste = c.find((x) => ordre[rang].test(x));
    if (!juste) return ["l’étape juste n’est pas proposée"];
    if (c.length !== 4 || ordre.some((re) => c.filter((x) => re.test(x)).length !== 1)) return ["les propositions ne sont pas les quatre étapes"];
    return qcm(q, juste);
  }
  const tri = t.match(/triangle ([A-Z])([A-Z])([A-Z])\b/);
  if (/Pourquoi passe-t-il aussi|Pourquoi est-on sûr/.test(t)) {
    const m = t.match(/cercle de centre ([A-Z]) (?:qui )?passe par ([A-Z])/);
    const autres = t.match(/par ([A-Z]) et (?:par )?([A-Z]) \?/);
    if (!m || !autres) return ["énoncé illisible"];
    const [o, a, b, cc] = [m[1], m[2], autres[1], autres[2]];
    const p = qcm(q, `parce que ${o}${a} = ${o}${b} = ${o}${cc}`);
    if (q.canvas) p.push(...canvasTriangle(q, [a, b, cc], o));
    return p;
  }
  if (/deux médiatrices/.test(t) && tri) return qcm(q, "parce que la troisième médiatrice passe forcément par leur point d’intersection");
  return ["tournure inconnue du correcteur"];
}

// ----- Les défis en situation
function corrigerDefiSituation(q: Q): string[] {
  const t = q.text;
  const pts = t.match(/\b([A-Z]), ([A-Z]) et ([A-Z])\b/);
  if (/sont (?:pas )?alignée?s/.test(t) && pts) {
    const [, a, b, c] = pts;
    if (/ne sont pas alignée?s/.test(t)) return qcm(q, `au point de concours des médiatrices du triangle ${a}${b}${c}`);
    return qcm(q, "non : les médiatrices sont parallèles et ne se coupent pas");
  }
  const deux = t.match(/\b([A-Z]) et ([A-Z])\b/);
  if (/deux/.test(t) && deux) return qcm(q, `tous les points de la médiatrice de [${deux[1]}${deux[2]}]`);
  return ["tournure inconnue du correcteur"];
}
/** Accords des situations : « trois maisons … alignées », « de chacune ». */
function accords(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  const fem = /maisons|tentes/.test(t);
  if (/alignés/.test(t) && fem) p.push("« alignés » après un nom féminin");
  if (/alignées/.test(t) && !fem) p.push("« alignées » après un nom masculin");
  if (/de chacun\b/.test(t) && fem) p.push("« chacun » au lieu de « chacune »");
  if (/de chacune\b/.test(t) && !fem) p.push("« chacune » au lieu de « chacun »");
  if (/une (antenne|fontaine|table)[^.?]*\. Où doit-(il|elle) le placer/.test(t)) p.push("« le placer » pour un nom féminin");
  return p;
}

// =====================================================================
// ⭐ 07/11/2026 — LES GABARITS « À PLUSIEURS FAÇONS ». Chaque gabarit a sa liste
// de règles : un motif de phrase (avec renvois \1 : une lettre doit revenir à la
// même place, sinon la phrase est illisible) et le calcul refait d'après ce motif.
// Une tournure qu'aucune règle ne lit est un défaut, jamais une réponse devinée.
// La figure, quand il y en a une, est relue à part : le centre au centre, les
// sommets sur le cercle (sauf si la question porte sur le sommet écarté), les
// lettres de l'énoncé dessinées, la longueur demandée non écrite sur le dessin.
// =====================================================================
type R = { q: string } | { oui: boolean } | { vrai: boolean } | { n: number } | { l: number; u?: string } | { t: string[] } | { err: string };
type Regle = [RegExp, (m: RegExpMatchArray, q: Q) => R];
const n1 = (): R => ({ n: 1 });
const n3 = (): R => ({ n: 3 });
const vrai = (): R => ({ vrai: true });
const faux = (): R => ({ vrai: false });
const oui = (): R => ({ oui: true });
const non = (): R => ({ oui: false });
const dans = (nom: string, ...l: string[]) => l.every((x) => nom.includes(x)) && new Set(l).size === l.length;
const hors = (msg: string): R => ({ err: msg });

function juger(q: Q, r: R): string[] {
  if ("err" in r) return [r.err];
  if ("q" in r) return q.comparator === "mcq_exact" ? qcm(q, r.q) : [`comparateur ${q.comparator}`];
  if ("oui" in r) return qcm(q, r.oui ? "oui" : "non");
  if ("vrai" in r) return qcm(q, r.vrai ? "vrai" : "faux");
  if ("l" in r) return attendu(q, r.l, r.u ?? "cm");
  if ("n" in r) {
    const p: string[] = [];
    if (q.expected[0] !== String(r.n)) p.push(`réponse attendue ${q.expected[0]}, recalculée ${r.n}`);
    if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator}`);
    return p;
  }
  const p: string[] = [];
  if (q.comparator !== "exact_text") p.push(`comparateur ${q.comparator}`);
  if (!r.t.includes(String(q.expected[0]))) p.push(`réponse attendue « ${q.expected[0]} », recalculée « ${r.t.join(" / ")} »`);
  for (const x of r.t) if (!q.expected.includes(x)) p.push(`l’écriture « ${x} » n’est pas acceptée`);
  return p;
}

// ----- Lecture de la figure
type Pt = { label: string; x: number; y: number };
function lireFig(q: Q) {
  const c = q.canvas as any;
  if (!c || c.kind !== "cercle") return null;
  const pts: Pt[] = c.points ?? [];
  const centre = pts.filter((p) => p.x === c.circle.cx && p.y === c.circle.cy);
  const sommets = pts.filter((p) => !centre.includes(p));
  const horsCercle = sommets.filter((p) => Math.abs(Math.hypot(p.x - c.circle.cx, p.y - c.circle.cy) - c.circle.r) > 2);
  const longueur = (c.segments ?? []).find((s: any) => s.label);
  return { centre, sommets, horsCercle, rayons: (c.segments ?? []).filter((s: any) => s.kind === "rayon"), longueur };
}
const centreFig = (q: Q) => lireFig(q)?.centre[0]?.label ?? "?";
/** La longueur écrite sur la figure, lue sur le dessin : « 7 cm » → 7. */
const rayonFig = (q: Q) => Number(String(lireFig(q)?.longueur?.label ?? "").match(/^(\d+) cm$/)?.[1] ?? NaN);
/* ⭐ 14/11/2026 — LE CANVAS `construction` (figures tracées : triangle, médiatrices
   codées, rayons, cercle), RELU et non simplement accepté. On vérifie :
   1. chaque segment, droite, cercle, arc, angle s'appuie sur des points existants ;
   2. un angle codé droit est droit au dessin (à 1° près) ;
   3. des segments de même code ont la même longueur (à 2 % près) — avec 2, les
      médiatrices codées sont perpendiculaires et passent par le milieu ;
   4. une médiatrice tracée (une droite ou un segment qui porte l'angle droit au
      milieu d'un côté codé) est équidistante des extrémités du côté ;
   5. les lettres affichées sont celles de l'énoncé ou de ses propositions ;
   6. les longueurs de l'énoncé entre deux points dessinés sont à la même échelle ;
   7. le centre nommé par l'énoncé est à égale distance des trois sommets dessinés,
      et un cercle de centre O passe par les trois sommets (sauf question « hors du cercle ») ;
   8. la figure n'écrit pas la réponse attendue, ni de longueur qui n'est pas dans l'énoncé
      (seul « ? » marque la longueur cherchée). */
type PtC = { id: string; x: number; y: number; nom?: string; cache?: boolean };
const LETTRES_TEXTE = (t: string) => new Set([...t.matchAll(/(?<![\p{L}’])([A-Z]{1,3})(?![\p{L}’])/gu)].flatMap((m) => [...m[1]]));
export function constructionRelue(q: Q, tri: { s: string[]; o: string | null } | null = triangle(q.text)): string[] {
  const c = q.canvas as any;
  const p: string[] = [];
  const pts: PtC[] = c.points ?? [];
  const parId = new Map(pts.map((x) => [x.id, x]));
  const nom = (x: PtC) => x.nom ?? x.id;
  const visible = (x: PtC) => !x.cache && nom(x) !== "" && nom(x) !== "?";
  const parNom = (l: string) => pts.find((x) => visible(x) && nom(x) === l);
  const d = (a: PtC, b: PtC) => Math.hypot(a.x - b.x, a.y - b.y);
  // 1. Les références.
  const refs: string[] = [
    ...(c.segments ?? []).flatMap((g: any) => [g.a, g.b]),
    ...(c.droites ?? []).flatMap((g: any) => [g.a, g.b]),
    ...(c.cercles ?? []).map((g: any) => g.centre),
    ...(c.arcs ?? []).flatMap((g: any) => [g.centre, g.de, g.vers, ...(g.eviter ? [g.eviter] : [])]),
    ...(c.angles ?? []).flatMap((g: any) => [g.sommet, g.de, g.vers]),
    ...(c.polygones ?? []).flatMap((g: any) => g.sommets),
  ];
  for (const r of refs) if (!parId.has(r)) p.push(`figure : point « ${r} » inconnu`);
  if (p.length) return p;
  const P = (id: string) => parId.get(id)!;
  // 2. Les angles droits.
  const droits = (c.angles ?? []).filter((a: any) => a.droit);
  for (const a of droits) {
    const o = P(a.sommet), u = P(a.de), v = P(a.vers);
    const cos = ((u.x - o.x) * (v.x - o.x) + (u.y - o.y) * (v.y - o.y)) / (d(u, o) * d(v, o));
    if (Math.abs(cos) > 0.0175) p.push(`figure : angle codé droit en ${nom(o) || a.sommet}, dessiné à ${Math.round((Math.acos(cos) * 180) / Math.PI)}°`);
  }
  // 3. Les codes de longueur.
  const parCode = new Map<number, number[]>();
  for (const g of c.segments ?? []) if (g.code) parCode.set(g.code, [...(parCode.get(g.code) ?? []), d(P(g.a), P(g.b))]);
  for (const [k, ls] of parCode) if (Math.max(...ls) / Math.min(...ls) > 1.02) p.push(`figure : segments codés ${k} de longueurs différentes (${ls.map((x) => x.toFixed(2)).join(", ")})`);
  // 4. Les médiatrices : l'angle droit posé au milieu d'un segment codé en deux moitiés égales.
  for (const a of droits) {
    const m = P(a.sommet);
    const moities = (c.segments ?? []).filter((g: any) => g.code && (g.a === a.sommet || g.b === a.sommet));
    const bouts = moities.map((g: any) => P(g.a === a.sommet ? g.b : g.a));
    for (let i = 0; i < bouts.length; i++)
      for (let j = i + 1; j < bouts.length; j++) {
        const [e, f] = [bouts[i], bouts[j]];
        const g1 = moities[i], g2 = moities[j];
        if (g1.code !== g2.code) continue;
        const aligne = Math.abs((e.x - m.x) * (f.y - m.y) - (e.y - m.y) * (f.x - m.x)) < 1e-6 * Math.max(1, d(e, f) ** 2);
        if (!aligne) continue;
        // La droite de l'angle droit (autre que [EF]) : chacun de ses points est équidistant de E et F.
        const autre = [P(a.de), P(a.vers)].find((x) => Math.abs((x.x - m.x) * (f.y - e.y) - (x.y - m.y) * (f.x - e.x)) > 1e-6);
        if (autre && Math.abs(d(autre, e) - d(autre, f)) / d(e, f) > 0.02) p.push(`figure : la médiatrice tracée en ${nom(m) || a.sommet} n’est pas équidistante de ${nom(e)} et ${nom(f)}`);
      }
  }
  // 5. Les lettres affichées sont celles de l'énoncé.
  const lettres = LETTRES_TEXTE([q.text, ...(q.choices ?? [])].join(" "));
  for (const x of pts) if (visible(x) && !(nom(x).length === 1 && lettres.has(nom(x)))) p.push(`figure : lettre « ${nom(x)} » absente de l’énoncé`);
  // 6. Les longueurs de l'énoncé, à la même échelle.
  const echelles: { quoi: string; k: number }[] = [];
  for (const m of q.text.matchAll(/(?<!\+ )\[?\b([A-Z])([A-Z])\]? (?:=|mesure) (\d+(?:,\d+)?) (?:cm|m|km)\b/g)) {
    const [a, b] = [parNom(m[1]), parNom(m[2])];
    if (a && b) echelles.push({ quoi: `${m[1]}${m[2]} = ${m[3]}`, k: d(a, b) / nombreFr(m[3]) });
  }
  if (echelles.length > 1) {
    const ks = echelles.map((e) => e.k);
    if (Math.max(...ks) / Math.min(...ks) > 1.03) p.push(`figure : longueurs dessinées pas à l’échelle de l’énoncé (${echelles.map((e) => e.quoi).join(", ")})`);
  }
  // 7. Le centre nommé, à égale distance des sommets ; le cercle qui en part passe par eux.
  if (tri?.o && !tri.s.includes(tri.o)) {
    const O = parNom(tri.o);
    const S = tri.s.map(parNom).filter(Boolean) as PtC[];
    if (O && S.length === 3) {
      const ds = S.map((x) => d(O, x));
      if (Math.max(...ds) / Math.min(...ds) > 1.02) p.push(`figure : ${tri.o} n’est pas à égale distance de ${tri.s.join(", ")}`);
    }
    if (O) {
      const hors = /n’est pas sur le cercle|hors du cercle|bien le cercle circonscrit|circonscrit au triangle/.test(q.text);
      for (const k of (c.cercles ?? []).filter((k: any) => k.centre === O.id))
        for (const x of S) if (!hors && Math.abs(d(O, x) - k.rayon) / k.rayon > 0.02) p.push(`figure : ${nom(x)} n’est pas sur le cercle de centre ${tri.o}`);
    }
  }
  // 8. La figure n'écrit ni la réponse, ni une longueur absente de l'énoncé.
  const textes = [...(c.segments ?? []), ...(c.angles ?? [])].map((g: any) => g.texte).filter(Boolean) as string[];
  const rep = String(q.expected?.[0] ?? "");
  for (const x of textes) {
    if (x === "?") continue;
    if (x === rep && !q.text.includes(rep)) p.push(`figure : la réponse « ${rep} » est écrite sur le dessin`);
    else if (/\d/.test(x) && !q.text.includes(x.replace(" ", " ")) && !q.text.includes(x)) p.push(`figure : « ${x} » écrit sur le dessin, absent de l’énoncé`);
  }
  return p;
}
function figureRelue(q: Q): string[] {
  const f = lireFig(q);
  if (!q.canvas) return [];
  if ((q.canvas as any).kind === "construction") return constructionRelue(q);
  if (!f) return [`canvas inattendu : ${(q.canvas as any).kind}`];
  const p: string[] = [];
  if (f.centre.length !== 1) p.push("pas exactement un point au centre du cercle dessiné");
  if (f.sommets.length !== 3) p.push(`${f.sommets.length} sommets dessinés`);
  if (f.horsCercle.length > 1) p.push("plusieurs sommets hors du cercle");
  if (f.horsCercle.length === 1 && !/circonscrit au triangle|bien le cercle circonscrit|n’est pas sur le cercle|sommets du triangle sont sur le cercle/.test(q.text)) p.push(`le sommet ${f.horsCercle[0].label} est hors du cercle sans que la question le demande`);
  const labels = [...f.centre, ...f.sommets].map((x) => x.label);
  for (const m of q.text.matchAll(/(?<![\p{L}’])([A-Z]{1,3})(?![\p{L}’])/gu))
    for (const l of m[1]) if (!labels.includes(l)) p.push(`lettre ${l} absente de la figure`);
  if (f.longueur) {
    const lab = String(f.longueur.label);
    const vers = f.longueur.to;
    // La longueur écrite sur le rayon dessiné est celle du texte, quand le texte la nomme…
    const ecrite = q.text.match(new RegExp(`\\b[A-Z]${vers} (?:= |mesure )(\\d+) cm`));
    if (ecrite && `${ecrite[1]} cm` !== lab) p.push(`longueur dessinée « ${lab} », écrite « ${ecrite[1]} cm »`);
    // … et le dessin n'écrit pas la longueur demandée.
    const demande = q.text.match(/(?:mesure|Donne|Calcule|Écris) ([A-Z])([A-Z]) ?[?.]/);
    if (demande && demande[2] === vers) p.push(`la figure donne la longueur demandée ${demande[0]}`);
  }
  return p;
}

/** Le correcteur d'un gabarit : la première règle dont le motif lit la phrase. */
function parRegles(regles: Regle[]) {
  return (q: Q): string[] => {
    for (const [re, f] of regles) {
      const m = q.text.match(re);
      if (m) return [...juger(q, f(m, q)), ...figureRelue(q)];
    }
    return [`tournure inconnue du correcteur : ${q.text}`];
  };
}
const num = (s: string) => Number(s);

// ----- CONCOURANTES, ★2
const C2_COMPTER = parRegles([
  [/^Combien de médiatrices a un triangle \?$/, n3],
  [/^Chaque côté d’un triangle a combien de médiatrices \?$/, n1],
  [/^En combien de points se coupent les trois médiatrices d’un triangle \?$/, n1],
  [/^Les médiatrices du triangle [A-Z]{3} ont combien de points communs \?$/, n1],
  [/^Combien de médiatrices passent par le centre du cercle circonscrit \?$/, n3],
  [/^Deux médiatrices d’un triangle se coupent en combien de points \?$/, n1],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. Combien passent par \1 \?$/, n3],
  [/^Combien de sommets de [A-Z]{3} sont sur son cercle circonscrit \?$/, n3],
]);
const C2_VRAI_FAUX = parRegles([
  [/^Vrai ou faux : les trois médiatrices d’un triangle se coupent en un même point\.$/, vrai],
  [/^Vrai ou faux : les médiatrices d’un triangle sont toujours parallèles\.$/, faux],
  [/^Vrai ou faux : les médiatrices d’un triangle sont concourantes\.$/, vrai],
  [/^Vrai ou faux : le point de concours est toujours le milieu d’un côté\.$/, faux],
  [/^Vrai ou faux : le point de concours est toujours à l’intérieur du triangle\.$/, faux],
  [/^Vrai ou faux : le point de concours est à égale distance des trois sommets\.$/, vrai],
  [/^Vrai ou faux : le point de concours est à égale distance des trois côtés\.$/, faux],
  [/^Vrai ou faux : le point de concours est le centre du cercle circonscrit\.$/, vrai],
  [/^Vrai ou faux : un triangle a seulement deux médiatrices\.$/, faux],
  [/^Vrai ou faux : concourantes veut dire : qui passent par un même point\.$/, vrai],
]);
const C2_MOT = parRegles([
  [/^Trois droites passent par un même point\. Comment sont-elles \?$/, () => ({ q: "concourantes" })],
  [/^Quel mot veut dire « qui passent par un même point » \?$/, () => ({ q: "concourantes" })],
  [/^Complète : les trois médiatrices d’un triangle sont …$/, () => ({ q: "concourantes" })],
  [/^Comment s’appelle le point où se coupent les médiatrices \?$/, () => ({ q: "le point de concours" })],
  [/^Le point de concours des médiatrices est le centre de quoi \?$/, () => ({ q: "du cercle circonscrit" })],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. Que représente \1 \?$/, () => ({ q: "le centre du cercle circonscrit" })],
  [/^Quel cercle a pour centre le point de concours des médiatrices \?$/, () => ({ q: "le cercle circonscrit" })],
  [/^Où est le point de concours par rapport aux sommets \?$/, () => ({ q: "à la même distance des trois" })],
]);
const rayonParmi = (q: Q): R => {
  const o = centreFig(q);
  const r = (q.choices ?? []).filter((c) => c.includes(o));
  return r.length === 1 ? { q: r[0] } : hors(`${r.length} propositions passent par le centre`);
};
const C2_FIGURE = parRegles([
  [/^Observe la figure\. Quel point est le centre du cercle \?$/, (_, q) => ({ q: centreFig(q) })],
  [/^Sur la figure, quel point est à égale distance des trois sommets \?$/, (_, q) => ({ q: centreFig(q) })],
  [/^Les médiatrices de ce triangle se coupent en quel point \?$/, (_, q) => ({ q: centreFig(q) })],
  [/^Observe la figure\. Écris la lettre du point de concours des médiatrices\.$/, (_, q) => ({ t: [centreFig(q)] })],
  [/^Sur la figure, quelle longueur est égale à ([A-Z])([A-Z]) \?$/, (m, q) => {
    if (m[1] !== centreFig(q)) return hors("la longueur n’est pas un rayon");
    const r = (q.choices ?? []).filter((c) => c[0] === m[1] && c[1] !== m[2]);
    return r.length === 1 ? { q: r[0] } : hors(`${r.length} rayons proposés`);
  }],
  [/^Sur la figure, quel segment est un rayon du cercle \?$/, (_, q) => rayonParmi(q)],
  [/^Sur la figure, quels points sont à égale distance de ([A-Z]) \?$/, (m, q) => {
    if (m[1] !== centreFig(q)) return hors("ce point n’est pas le centre");
    const [x, y, z] = lireFig(q)!.sommets.map((s) => s.label);
    return { q: `${x}, ${y} et ${z}` };
  }],
  [/^Sur la figure, combien de rayons égaux sont tracés \?$/, (_, q) => ({ n: lireFig(q)!.rayons.length })],
]);
const C2_EGALITE = parRegles([
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Quelle égalité est juste \?$/, (m) => ({ q: `${m[1]}${m[2]} = ${m[1]}${m[3]}` })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Complète : \1\2 = …$/, (m) => ({ t: [`${m[1]}${m[3]}`, `${m[3]}${m[1]}`] })],
  [/^([A-Z])([A-Z]) = \1([A-Z])\. Sur quelle médiatrice est \1 \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^([A-Z]) est à égale distance de ([A-Z]) et de ([A-Z])\. Sur quelle médiatrice est-il \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^Quelle médiatrice passe par ([A-Z]) si \1([A-Z]) = \1([A-Z]) \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. De quels points est-il à égale distance \?$/, (m) => ({ q: `${m[2]} et ${m[3]}` })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\2 = (\d+) cm\. Combien mesure \1\3 \?$/, (m) => ({ l: num(m[4]) })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Que dire de \1\2 et de \1\3 \?$/, () => ({ q: "elles sont égales" })],
]);
const distance = (nom: string, x: string, y: string, v: string): R => (dans(nom, x, y) ? { l: num(v) } : hors("les longueurs ne vont pas du centre à deux sommets différents"));
const C2_LONGUEUR = parRegles([
  [/^Les médiatrices de ([A-Z]{3}) se coupent en ([A-Z])\. \2([A-Z]) = (\d+) cm\. Combien mesure \2([A-Z]) \?$/, (m) => distance(m[1], m[3], m[5], m[4])],
  [/^([A-Z]) est sur les trois médiatrices de ([A-Z]{3})\. \1([A-Z]) = (\d+) cm\. Donne \1([A-Z])\.$/, (m) => distance(m[2], m[3], m[5], m[4])],
  [/^([A-Z]) est le centre du cercle circonscrit à ([A-Z]{3})\. \1([A-Z]) = (\d+) cm\. Calcule \1([A-Z])\.$/, (m) => distance(m[2], m[3], m[5], m[4])],
  [/^Observe la figure\. Le rayon ([A-Z])([A-Z]) mesure (\d+) cm\. Combien mesure \1([A-Z]) \?$/, (m, q) => (m[2] !== m[4] && num(m[3]) === rayonFig(q) ? { l: num(m[3]) } : hors("rayon demandé ou longueur dessinée incohérents"))],
  [/^Sur la figure, ([A-Z])([A-Z]) = (\d+) cm\. Quelle autre longueur vaut \3 cm \?$/, (m, q) => {
    const r = (q.choices ?? []).filter((c) => c[0] === m[1] && c[1] !== m[2]);
    return r.length === 1 ? { q: r[0] } : hors("pas un seul autre rayon proposé");
  }],
  [/^Sur la figure, tous les rayons sont égaux\. ([A-Z])([A-Z]) = (\d+) cm\. Écris \1([A-Z])\.$/, (m) => (m[2] !== m[4] ? { l: num(m[3]) } : hors("même rayon"))],
]);

// ----- CONCOURANTES, ★3
const C3_CHAINE = parRegles([
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\] et de \[\3([A-Z])\]\. \1\2 = (\d+) cm\. Combien mesure \1\4 \?$/, (m) => ({ l: num(m[5]) })],
  [/^Les médiatrices de \[([A-Z])([A-Z])\] et de \[\2([A-Z])\] se coupent en ([A-Z])\. \4\3 = (\d+) cm\. Calcule \4\1\.$/, (m) => ({ l: num(m[5]) })],
  [/^([A-Z])([A-Z]) = \1([A-Z]) et \1\3 = \1([A-Z])\. \1\2 mesure (\d+) cm\. Combien mesure \1\4 \?$/, (m) => ({ l: num(m[5]) })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\], puis sur celle de \[\3([A-Z])\]\. \1\2 = (\d+) cm\. Que vaut \1\4 \?$/, (m) => ({ l: num(m[5]) })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\2 = \1([A-Z]) et \1\4 = (\d+) cm\. Donne \1\3\.$/, (m) => ({ l: num(m[5]) })],
  [/^([A-Z])([A-Z]) = (\d+) cm\. \1 est sur la médiatrice de \[([A-Z])\2\]\. Combien mesure \1\4 \?$/, (m) => ({ l: num(m[3]) })],
]);
const C3_TEST = parRegles([
  [/^Triangle [A-Z]{3} : ([A-Z])([A-Z]) = (\d+) cm, \1([A-Z]) = (\d+) cm et \1([A-Z]) = (\d+) cm\. (.+)$/, (m) => {
    const [o, a, b, c] = [m[1], m[2], m[4], m[6]];
    const [la, lb, lc] = [num(m[3]), num(m[5]), num(m[7])];
    const fin = m[8];
    const paires: string[] = [];
    if (la === lb) paires.push(`${a}${b}`);
    if (la === lc) paires.push(`${a}${c}`);
    if (lb === lc) paires.push(`${b}${c}`);
    const toutes = paires.length === 3;
    if (fin === `Sur quelle médiatrice est ${o} ?` || fin === `Quelle médiatrice passe par ${o} ?`) {
      if (toutes) return { q: "les trois médiatrices" };
      return paires.length === 1 ? { q: `celle de [${paires[0]}]` } : hors("aucune paire égale");
    }
    if (fin === `${o} est-il le centre du cercle circonscrit à ${a}${b}${c} ?`) return { oui: toutes };
    const med = fin.match(/est-il sur la médiatrice de \[([A-Z])([A-Z])\] \?$/);
    if (med) return { oui: paires.includes(`${med[1]}${med[2]}`) };
    if (fin === `Un cercle de centre ${o} passe par ${a}. Passe-t-il par ${b} et ${c} ?`) return { oui: toutes };
    if (fin === `Les trois médiatrices passent-elles par ${o} ?`) return { oui: toutes };
    if (fin === `Combien de médiatrices de ${a}${b}${c} passent par ${o} ?`) return { n: paires.length };
    if (fin === `Combien de sommets sont sur le cercle de centre ${o} passant par ${a} ?`) return { n: [la, lb, lc].filter((x) => x === la).length };
    return hors(`fin de phrase inconnue : ${fin}`);
  }],
]);
const MED = /^Les médiatrices de ([A-Z]{3}) se coupent en ([A-Z])\./.source;
const C3_SOMME = parRegles([
  [new RegExp(`${MED} \\2([A-Z]) = (\\d+) cm\\. Calcule \\2[A-Z] \\+ \\2[A-Z] \\+ \\2[A-Z]\\.$`), (m) => ({ l: 3 * num(m[4]) })],
  [new RegExp(`${MED} \\2[A-Z] \\+ \\2[A-Z] = (\\d+) cm\\. Combien mesure \\2[A-Z] \\?$`), (m) => ({ l: num(m[3]) / 2 })],
  [new RegExp(`${MED} \\2[A-Z] \\+ \\2[A-Z] \\+ \\2[A-Z] = (\\d+) cm\\. Combien mesure \\2[A-Z] \\?$`), (m) => ({ l: num(m[3]) / 3 })],
  [new RegExp(`${MED} \\2[A-Z] = (\\d+) cm\\. Calcule \\2[A-Z] \\+ \\2[A-Z]\\.$`), (m) => ({ l: 2 * num(m[3]) })],
  [new RegExp(`${MED} \\2[A-Z] = \\d+ cm\\. Calcule \\2[A-Z] − \\2[A-Z]\\.$`), () => ({ l: 0 })],
  [/^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z])\. \1[A-Z] \+ \1[A-Z] = (\d+) cm\. Quel est son rayon \?$/, (m) => ({ l: num(m[2]) / 2 })],
  [/^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z])\. \1[A-Z] \+ \1[A-Z] \+ \1[A-Z] = (\d+) cm\. Quel est son rayon \?$/, (m) => ({ l: num(m[2]) / 3 })],
]);
/** Accords de la situation : Une … Elle, Un … Il ; premier/première selon le nom. */
function accordsSituation(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  const f = /^Une /.test(t);
  if (/(?:^|\. )Elle est/.test(t) && !f) p.push("« Elle » après un nom masculin");
  if (/(?:^|\. )Il est/.test(t) && f) p.push("« Il » après un nom féminin");
  if (/est-elle/.test(t) && !f) p.push("« est-elle » après un nom masculin");
  if (/est-il/.test(t) && f) p.push("« est-il » après un nom féminin");
  const lieuF = /trois (balises|bouées|écoles)/.test(t);
  if (/du premier|du dernier/.test(t) && lieuF) p.push("« du premier » après un nom féminin");
  if (/de la première|de la dernière/.test(t) && !lieuF) p.push("« de la première » après un nom masculin");
  return p;
}
const C3_SITUATION_BRUT = parRegles([
  [/à égale distance de trois [\p{L}]+\. (?:Elle|Il) est à (\d+) (m|km) (?:du premier|de la première)\. À quelle distance est-(?:elle|il) (?:du dernier|de la dernière) \?$/u, (m) => ({ l: num(m[1]), u: m[2] })],
  [/à la même distance de trois [\p{L}]+ : (\d+) (m|km)\. Quel est le diamètre du cercle passant par les trois \?$/u, (m) => ({ l: 2 * num(m[1]), u: m[2] })],
]);
const C3_SITUATION = (q: Q) => [...C3_SITUATION_BRUT(q), ...accordsSituation(q)];
const C3_PREUVE = parRegles([
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Pourquoi \1\2 = \1\3 \?$/, (m) => ({ q: `tout point de cette médiatrice est à égale distance de ${m[2]} et de ${m[3]}` })],
  [/^Les médiatrices de \[([A-Z])([A-Z])\] et de \[\1([A-Z])\] se coupent en ([A-Z])\. Quelle médiatrice passe aussi par \4 \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^Pour prouver que les médiatrices sont concourantes, combien en prend-on au départ \?$/, () => ({ n: 2 })],
  [/^La preuve part de deux médiatrices qui se coupent en ([A-Z])\. Que reste-t-il à prouver \?$/, (m) => ({ q: `la troisième médiatrice passe aussi par ${m[1]}` })],
  [/^([A-Z])([A-Z]) = \1([A-Z]) et \1\3 = \1([A-Z])\. Que peut-on écrire \?$/, (m) => ({ q: `${m[1]}${m[2]} = ${m[1]}${m[4]}` })],
  [/^([A-Z])([A-Z]) = \1([A-Z]) et \1\3 = \1([A-Z])\. Complète : \1\2 = …$/, (m) => ({ t: [`${m[1]}${m[4]}`, `${m[4]}${m[1]}`, `${m[1]}${m[3]}`, `${m[3]}${m[1]}`] })],
  [/^([A-Z])([A-Z]) = \1([A-Z])\. Sur quelle médiatrice est \1 \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^([A-Z]) est à égale distance de ([A-Z]) et de ([A-Z])\. Sur quelle médiatrice est-il \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
]);
const C3_FIGURE = parRegles([
  [/^Observe la figure : ([A-Z])([A-Z]) = (\d+) cm\. Calcule \1([A-Z]) \+ \1([A-Z])\.$/, (m, q) => (num(m[3]) === rayonFig(q) ? { l: 2 * num(m[3]) } : hors("longueur dessinée différente"))],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Quelle est la nature du triangle \1\2\3 \?$/, (m) => ({ q: `isocèle en ${m[1]}` })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Le triangle \1\2\3 est-il isocèle \?$/, oui],
  [/^Sur la figure, combien de triangles sont isocèles en ([A-Z]) \?$/, (m, q) => (m[1] === centreFig(q) ? { n: lireFig(q)!.rayons.length } : hors("ce point n’est pas le centre"))],
  [/^Sur la figure, combien d’autres segments ont la même longueur que \[([A-Z])[A-Z]\] \?$/, (m, q) => (m[1] === centreFig(q) ? { n: lireFig(q)!.rayons.length - 1 } : hors("ce segment n’est pas un rayon"))],
  [/^Sur la figure, quel triangle est isocèle en ([A-Z]) \?$/, (m, q) => {
    const r = (q.choices ?? []).filter((c) => c.startsWith(m[1]));
    return r.length === 1 && m[1] === centreFig(q) ? { q: r[0] } : hors("pas un seul triangle de sommet principal le centre");
  }],
]);

// ----- CONCOURANTES, ★4
const C4_ARGUMENT = parRegles([
  [/^Dans la preuve, ([A-Z])([A-Z]) = \1([A-Z]) et \1\3 = \1([A-Z])\. Quel argument place \1 sur la médiatrice de \[\2\4\] \?$/, (m) => ({ q: `${m[1]}${m[2]} = ${m[1]}${m[4]}, donc ${m[1]} est à égale distance de ${m[2]} et de ${m[4]}` })],
  [/^Pourquoi écrit-on ([A-Z])([A-Z]) = \1([A-Z]) quand \1 est sur la médiatrice de \[\2\3\] \?$/, () => ({ q: "un point de la médiatrice est à égale distance des extrémités" })],
  [/^Que montre-t-on à la fin de la preuve \?$/, () => ({ q: "la troisième médiatrice passe par le point commun des deux autres" })],
  [/^Quel sens de la propriété sert à la fin de la preuve \?$/, () => ({ q: "à égale distance, donc sur la médiatrice" })],
  [/^Quel sens de la propriété sert au début de la preuve \?$/, () => ({ q: "sur la médiatrice, donc à égale distance" })],
  [/^Pourquoi la preuve part-elle de deux médiatrices seulement \?$/, () => ({ q: "on ne peut pas supposer ce qu’on veut démontrer" })],
  [/^Pourquoi deux médiatrices d’un triangle se coupent-elles toujours \?$/, () => ({ q: "les deux côtés ne sont pas parallèles" })],
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\] et de \[\3([A-Z])\]\. Que sait-on de la médiatrice de \[\2\4\] sans la tracer \?$/, (m) => ({ q: `elle passe par ${m[1]}` })],
]);
const perimetre = (r: number, c: number): R => ({ l: 2 * r + c });
const C4_PERIMETRE = parRegles([
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\2 = (\d+) cm et \2\3 = (\d+) cm\. Quel est le périmètre du triangle \1\2\3 \?$/, (m) => perimetre(num(m[4]), num(m[5]))],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. \1[A-Z] = (\d+) cm et ([A-Z])([A-Z]) = (\d+) cm\. Quel est le périmètre du triangle \1\3\4 \?$/, (m) => perimetre(num(m[2]), num(m[5]))],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Le triangle \1\2\3 a pour périmètre (\d+) cm, et \2\3 = (\d+) cm\. Combien mesure \1\2 \?$/, (m) => ({ l: (num(m[4]) - num(m[5])) / 2 })],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. Le triangle \1([A-Z])([A-Z]) a pour périmètre (\d+) cm, et \2\3 = (\d+) cm\. Combien mesure \1[A-Z] \?$/, (m) => ({ l: (num(m[4]) - num(m[5])) / 2 })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\2 = (\d+) cm\. Le triangle \1\2\3 a pour périmètre (\d+) cm\. Combien mesure \2\3 \?$/, (m) => ({ l: num(m[5]) - 2 * num(m[4]) })],
]);
const C4_RAISONNEMENT = parRegles([
  [/« ([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\], donc \1\2 = \1([A-Z])\. »/, (m) => ({ oui: m[4] === m[3] })],
  [/« ([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\], donc \1 est le milieu de \[\2\3\]\. »/, non],
  [/« ([A-Z])([A-Z]) = \1([A-Z]), donc \1 est sur la médiatrice de \[\2\3\]\. »/, oui],
  [/« ([A-Z])([A-Z]) = \1([A-Z]), donc \1 est le milieu de \[\2\3\]\. »/, non],
  [/« ([A-Z])([A-Z]) = \1([A-Z]) et \1\3 = \1([A-Z]), donc \1\2 = \1\4\. »/, oui],
  [/« ([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\], donc \1\2 = \2\3\. »/, non],
  [/« ([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\] et de \[\3([A-Z])\], donc \1\2 = \1\4\. »/, oui],
  [/« Les médiatrices de ([A-Z]{3}) se coupent en [A-Z], donc \1 est équilatéral\. »/, non],
]);
const C4_FORCEMENT = parRegles([
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. A-t-on forcément \1\2 = \1([A-Z]) \?$/, (m) => ({ oui: m[4] === m[3] })],
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\] et de \[\2([A-Z])\]\. A-t-on forcément \1\3 = \1\4 \?$/, oui],
  [/^([A-Z])[A-Z] = \1[A-Z]\. \1 est-il forcément le centre du cercle circonscrit à [A-Z]{3} \?$/, non],
  [/^([A-Z])[A-Z] = \1[A-Z] = \1[A-Z]\. \1 est-il le centre du cercle circonscrit à [A-Z]{3} \?$/, oui],
  [/^([A-Z])([A-Z]) = \1([A-Z]) = \1([A-Z])\. \1 est-il sur la médiatrice de \[\3\4\] \?$/, oui],
  [/^([A-Z])([A-Z]) = \1([A-Z])\. \1 est-il forcément sur la médiatrice de \[\2\3\] \?$/, oui],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1 est-il forcément le milieu de \[\2\3\] \?$/, non],
  [/^([A-Z]) est le milieu de \[([A-Z])([A-Z])\]\. \1 est-il sur la médiatrice de \[\2\3\] \?$/, oui],
]);
/** Trois mesures dont une seule s'écarte : la lettre fausse et la bonne valeur. */
function mesureFausse(m: RegExpMatchArray) {
  const v = [num(m[2]), num(m[4]), num(m[6])];
  const l = [m[1], m[3], m[5]];
  const k = v.findIndex((x, i) => v.filter((y) => y === x).length === 1 && i >= 0);
  return { k, lettre: l[k], bonne: v[(k + 1) % 3], distinctes: new Set(v).size };
}
const LU = /se coupent en ([A-Z])\. On mesure \1([A-Z]) = (\d+) cm, \1([A-Z]) = (\d+) cm et \1([A-Z]) = (\d+) cm\./.source;
const lectureC4 = (m: RegExpMatchArray) => mesureFausse([m[0], m[2], m[3], m[4], m[5], m[6], m[7]] as unknown as RegExpMatchArray);
const C4_MESURE = parRegles([
  [new RegExp(`${LU} (?:Quelle mesure est fausse|Quelle longueur faut-il mesurer à nouveau) \\?$`), (m) => {
    const f = lectureC4(m);
    return f.distinctes === 2 ? { q: `${m[1]}${f.lettre}` } : hors("il faut exactement une mesure fausse");
  }],
  [new RegExp(`${LU} Quelle valeur devrait-on lire à la place de la mesure fausse \\?$`), (m) => {
    const f = lectureC4(m);
    return f.distinctes === 2 ? { l: f.bonne } : hors("il faut exactement une mesure fausse");
  }],
  [new RegExp(`${LU} Ces trois mesures peuvent-elles être toutes justes \\?$`), (m) => ({ oui: lectureC4(m).distinctes === 1 })],
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\] et de \[\3([A-Z])\]\. On lit \1\2 = (\d+) cm et \1\4 = (\d+) cm\. Est-ce possible \?$/, (m) => ({ oui: m[5] === m[6] })],
  [/^Dans le triangle ([A-Z]{3}), ([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. On lit \2\3 = \d+ cm et \2([A-Z]) = \d+ cm\. Est-ce possible \?$/, (m) => (dans(m[1], m[3], m[4], m[5]) ? { oui: true } : hors("le point lu n’est pas le troisième sommet"))],
]);
const C4_SANS_TRACER = parRegles([
  [/^Seules les médiatrices de \[([A-Z])([A-Z])\] et de \[\1([A-Z])\] sont tracées\. Elles se coupent en ([A-Z])\. Quelle autre médiatrice passe par \4 \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^Les médiatrices de \[([A-Z])([A-Z])\] et de \[\1([A-Z])\] se coupent en ([A-Z])\. (.+)$/, (m) => {
    const [, , b, c, o, fin] = m;
    if (fin === "Quelle égalité peut-on écrire sans mesurer ?") return { q: `${o}${b} = ${o}${c}` };
    if (/^Combien de médiatrices faut-il encore tracer/.test(fin)) return { n: 0 };
    if (fin === `On trace la médiatrice de [${b}${c}] : elle passe à côté de ${o}. Que conclure ?`) return { q: "le tracé manque de précision" };
    const lo = fin.match(new RegExp(`^${o}${b} = (\\d+) cm\\. Combien mesure ${o}${c} \\?$`));
    if (lo) return { l: num(lo[1]) };
    const so = fin.match(new RegExp(`^${o}[A-Z] = (\\d+) cm\\. Calcule ${o}${b} \\+ ${o}${c}\\.$`));
    if (so) return { l: 2 * num(so[1]) };
    return hors(`fin de phrase inconnue : ${fin}`);
  }],
]);

// ----- CONCOURANTES, ★5
const P5 = "^Preuve pour le triangle ([A-Z]{3}) : ";
const C5_ORDRE = parRegles([
  [new RegExp(`${P5}on a écrit ([A-Z])([A-Z]) = \\2([A-Z]) et \\2\\4 = \\2([A-Z])\\. Quel pas vient ensuite \\?$`), (m) => ({ q: `${m[2]}${m[3]} = ${m[2]}${m[5]}` })],
  [new RegExp(`${P5}on vient d’écrire ([A-Z])([A-Z]) = \\2([A-Z])\\. Quel pas vient ensuite \\?$`), (m) => ({ q: `${m[2]} est sur la médiatrice de [${m[3]}${m[4]}]` })],
  [new RegExp(`${P5}quel pas vient juste avant « ([A-Z]) est sur la médiatrice de \\[([A-Z])([A-Z])\\] » \\?$`), (m) => ({ q: `${m[2]}${m[3]} = ${m[2]}${m[4]}` })],
  [new RegExp(`${P5}quel est le dernier pas \\?$`), (m, q) => {
    const r = (q.choices ?? []).filter((c) => /est sur la médiatrice/.test(c));
    return r.length === 1 && dans(m[1], ...(r[0].match(/\[([A-Z])([A-Z])\]/) ?? []).slice(1)) ? { q: r[0] } : hors("le dernier pas n’est pas proposé");
  }],
  [new RegExp(`${P5}quelle phrase ne fait pas partie de la preuve \\?$`), (_, q) => {
    const r = (q.choices ?? []).filter((c) => /est le milieu de/.test(c));
    return r.length === 1 ? { q: r[0] } : hors("pas d’intrus unique");
  }],
  [new RegExp(`${P5}([A-Z]) est sur les médiatrices de \\[([A-Z])([A-Z])\\] et de \\[\\4([A-Z])\\]\\. Quelle égalité ne vient pas directement d’une de ces deux médiatrices \\?$`), (m) => ({ q: `${m[2]}${m[3]} = ${m[2]}${m[5]}` })],
]);
const C5_PERIMETRES = parRegles([
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. Le triangle \1([A-Z])([A-Z]) a pour périmètre (\d+) cm\. \2\3 = (\d+) cm et \3([A-Z]) = (\d+) cm\. Quel est le périmètre du triangle \1\3\6 \?$/, (m) => ({ l: num(m[4]) - num(m[5]) + num(m[7]) })],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. Le triangle \1([A-Z])([A-Z]) a pour périmètre (\d+) cm, et \2\3 = (\d+) cm\. Quel est le diamètre du cercle circonscrit \?$/, (m) => ({ l: num(m[4]) - num(m[5]) })],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. \1[A-Z] \+ \1[A-Z] \+ \1[A-Z] = (\d+) cm et ([A-Z])([A-Z]) = (\d+) cm\. Quel est le périmètre du triangle \1\3\4 \?$/, (m) => perimetre(num(m[2]) / 3, num(m[5]))],
  [/^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z]) et pour diamètre (\d+) cm\. ([A-Z])([A-Z]) = (\d+) cm\. Quel est le périmètre du triangle \1\3\4 \?$/, (m) => ({ l: num(m[2]) + num(m[5]) })],
  [/^Les médiatrices de ([A-Z]{3}) se coupent en ([A-Z])\. Le triangle \1 a pour périmètre (\d+) cm et \2[A-Z] = (\d+) cm\. Calcule la somme des périmètres de \2[A-Z]{2}, \2[A-Z]{2} et \2[A-Z]{2}\.$/, (m) => ({ l: num(m[3]) + 6 * num(m[4]) })],
]);
const C5_QUATRE = parRegles([
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\], \[\3([A-Z])\] et \[\4([A-Z])\]\. (.+)$/, (m) => {
    const [, o, a, , , d, fin] = m;
    const lo = fin.match(new RegExp(`^${o}${a} = (\\d+) cm\\. Combien mesure ${o}${d} \\?$`));
    if (lo) return { l: num(lo[1]) };
    if (new RegExp(`^Par combien des points [A-Z], [A-Z], [A-Z] et ${d} passe le cercle de centre ${o} passant par ${a} \\?$`).test(fin)) return { n: 4 };
    if (/^Sur quelle autre médiatrice est forcément/.test(fin)) return { q: `celle de [${a}${d}]` };
    return hors(`fin de phrase inconnue : ${fin}`);
  }],
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\], \[\3([A-Z])\], \[\4([A-Z])\] et \[\5([A-Z])\]\. \1\2 = (\d+) cm\. Combien mesure \1\6 \?$/, (m) => ({ l: num(m[7]) })],
  [/^([A-Z]) est sur les médiatrices de \[([A-Z])([A-Z])\] et de \[([A-Z])([A-Z])\]\. \1\2 = \d+ cm\. Peut-on en déduire \1([A-Z]) \?$/, (m) => ({ oui: [m[2], m[3], m[4], m[5]].filter((x, i, t) => t.indexOf(x) === i).length === 3 && m[3] === m[4] && m[6] === m[5] })],
]);
const C5_SENS = parRegles([
  [/^On écrit : « ([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\], donc \1\2 = \1\3 »\. Quel sens/, () => ({ q: "sur la médiatrice, donc à égale distance" })],
  [/^On écrit : « ([A-Z])([A-Z]) = \1([A-Z]), donc \1 est sur la médiatrice de \[\2\3\] »\. Quel sens/, () => ({ q: "à égale distance, donc sur la médiatrice" })],
  [/^Quelle phrase utilise le sens « à égale distance, donc sur la médiatrice » \?$/, (_, q) => {
    const r = (q.choices ?? []).filter((c) => /^[A-Z]{2} = [A-Z]{2}, donc [A-Z] est sur la médiatrice/.test(c));
    return r.length === 1 ? { q: r[0] } : hors(`${r.length} phrases dans ce sens`);
  }],
  [/^Quelle phrase utilise le sens « sur la médiatrice, donc à égale distance » \?$/, (_, q) => {
    const r = (q.choices ?? []).filter((c) => /^[A-Z] est sur la médiatrice de \[[A-Z]{2}\], donc [A-Z]{2} = [A-Z]{2}$/.test(c));
    return r.length === 1 ? { q: r[0] } : hors(`${r.length} phrases dans ce sens`);
  }],
  [/Quel pas de la preuve utilise le sens « à égale distance, donc sur la médiatrice » \?$/, () => ({ q: "le dernier" })],
  [/^Sans quel sens de la propriété la preuve s’arrête-t-elle avant la troisième médiatrice \?$/, () => ({ q: "à égale distance, donc sur la médiatrice" })],
]);
const C5_ISOCELE = parRegles([
  [/^Le triangle ([A-Z]{3}) est isocèle en ([A-Z])\. Quel sommet est sur la médiatrice de \[([A-Z])([A-Z])\] \?$/, (m) => (dans(m[1], m[2], m[3], m[4]) ? { q: m[2] } : hors("segment hors du triangle"))],
  [/^([A-Z])([A-Z]) = \1([A-Z])\. Sur quelle médiatrice est le point \1 \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^Le triangle [A-Z]{3} est isocèle en ([A-Z])\. ([A-Z]) est le centre de son cercle circonscrit, distinct de \1\. Quelle droite est la médiatrice de \[[A-Z]{2}\] \?$/, (m) => ({ q: `(${m[2]}${m[1]})` })],
  [/^Le triangle [A-Z]{3} est équilatéral\. Combien de ses sommets sont chacun sur une médiatrice \?$/, n3],
  [/^Le triangle [A-Z]{3} est isocèle en [A-Z]\. ([A-Z]) est le centre de son cercle circonscrit\. \1[A-Z] = (\d+) cm\. Combien mesure \1[A-Z] \?$/, (m) => ({ l: num(m[2]) })],
  [/^Le triangle [A-Z]{3} est isocèle en [A-Z]\. Le centre de son cercle circonscrit est-il sur la médiatrice de \[[A-Z]{2}\] \?$/, oui],
]);
const C5_COMPTE = parRegles([
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\2 = (\d+) cm et \1([A-Z]) = (\d+) cm\. Par combien de sommets de [A-Z]{3} passe le cercle de centre \1 et de rayon (\d+) cm \?$/, (m) => {
    const dist = [num(m[4]), num(m[4]), num(m[6])];
    return { n: dist.filter((d) => d === num(m[7])).length };
  }],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. \1[A-Z] = (\d+) cm\. Par combien de sommets passe le cercle de centre \1 et de rayon (\d+) cm \?$/, (m) => ({ n: m[2] === m[3] ? 3 : 0 })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\2 = (\d+) cm et \1([A-Z]) = (\d+) cm\. De combien faut-il changer le rayon pour passer de \2 à \5 \?$/, (m) => ({ l: num(m[6]) - num(m[4]) })],
]);

// ----- CONSTRUIRE, ★2
const K2_MOT = parRegles([
  [/^Par quels points passe le cercle circonscrit à un triangle \?$/, () => ({ q: "par les trois sommets" })],
  [/^Le cercle circonscrit à ([A-Z])([A-Z])([A-Z]) passe par quels points \?$/, (m) => ({ q: `${m[1]}, ${m[2]} et ${m[3]}` })],
  [/^Combien de sommets sont sur le cercle circonscrit \?$/, n3],
  [/^Le point ([A-Z]) est-il sur le cercle circonscrit à ([A-Z]{3}) \?$/, (m) => ({ oui: m[2].includes(m[1]) })],
  [/^Le centre ([A-Z]) est-il sur le cercle circonscrit à [A-Z]{3} \?$/, non],
  [/^Comment s’appelle le cercle qui passe par les trois sommets \?$/, () => ({ q: "le cercle circonscrit" })],
  [/^Quel instrument trace le cercle circonscrit \?$/, () => ({ q: "le compas" })],
  [/^Quels instruments tracent une médiatrice \?$/, () => ({ q: "la règle graduée et l’équerre" })],
]);
const K2_CENTRE = parRegles([
  [/^Où est le centre du cercle circonscrit \?$/, () => ({ q: "au point de concours des médiatrices" })],
  [/^Le centre du cercle circonscrit est sur combien de médiatrices \?$/, n3],
  [/^Il faut au moins combien de médiatrices pour trouver le centre \?$/, () => ({ n: 2 })],
  [/^Quelles droites trace-t-on pour trouver le centre \?$/, () => ({ q: "les médiatrices des côtés" })],
  [/^Une seule médiatrice suffit-elle pour trouver le centre \?$/, non],
  [/^Deux médiatrices suffisent-elles pour trouver le centre \?$/, oui],
  [/^Le rayon du cercle circonscrit va de quel point à quel point \?$/, () => ({ q: "du centre à un sommet" })],
  [/^Dans un triangle, une médiatrice se trace pour quel élément \?$/, () => ({ q: "un côté" })],
]);
const K2_FIGURE = parRegles([
  [/^Observe la figure\. Quel point est le centre du cercle \?$/, (_, q) => ({ q: centreFig(q) })],
  [/^Sur la figure, quels points sont sur le cercle \?$/, (_, q) => {
    const [x, y, z] = lireFig(q)!.sommets.map((s) => s.label);
    return { q: `${x}, ${y} et ${z}` };
  }],
  [/^Sur la figure, quel segment est un rayon \?$/, (_, q) => rayonParmi(q)],
  [/^Sur la figure, quel segment est un côté du triangle \?$/, (_, q) => {
    const o = centreFig(q);
    const r = (q.choices ?? []).filter((c) => !c.includes(o));
    return r.length === 1 ? { q: r[0] } : hors(`${r.length} côtés proposés`);
  }],
  [/^Observe la figure\. Ce cercle est-il (?:circonscrit au triangle|bien le cercle circonscrit) \?$/, (_, q) => ({ oui: lireFig(q)!.horsCercle.length === 0 })],
  [/^Observe la figure\. Quel sommet n’est pas sur le cercle \?$/, (_, q) => {
    const h = lireFig(q)!.horsCercle;
    return h.length === 1 ? { q: h[0].label } : hors("il faut un seul sommet hors du cercle");
  }],
  [/^Sur la figure, combien de sommets du triangle sont sur le cercle \?$/, (_, q) => ({ n: 3 - lireFig(q)!.horsCercle.length })],
]);
const CER = "^Cercle circonscrit à [A-Z]{3} : centre ([A-Z])";
const K2_RAYON = parRegles([
  [new RegExp(`${CER}, rayon (\\d+) cm\\. Combien mesure \\1[A-Z] \\?$`), (m) => ({ l: num(m[2]) })],
  [new RegExp(`${CER}\\. \\1[A-Z] = (\\d+) cm\\. Quel est le rayon \\?$`), (m) => ({ l: num(m[2]) })],
  [new RegExp(`${CER}, diamètre (\\d+) cm\\. Combien mesure \\1[A-Z] \\?$`), (m) => ({ l: num(m[2]) / 2 })],
  [new RegExp(`${CER}, rayon (\\d+) cm\\. Quel est son diamètre \\?$`), (m) => ({ l: 2 * num(m[2]) })],
  [new RegExp(`${CER}\\. \\1[A-Z] = (\\d+) cm\\. Quel écart de compas faut-il \\?$`), (m) => ({ l: num(m[2]) })],
  [/^Observe la figure\. Le compas s’ouvre de [A-Z] à un sommet\. Quel écart prend-il \?$/, (_, q) => ({ l: rayonFig(q) })],
  [/^Sur la figure, quel est le diamètre du cercle \?$/, (_, q) => ({ l: 2 * rayonFig(q) })],
  [/^Observe la figure\. Combien mesure [A-Z]{2} \?$/, (_, q) => ({ l: rayonFig(q) })],
]);
const K2_ORDRE = parRegles([
  [/^Quelle est la première étape pour tracer le cercle circonscrit \?$/, () => ({ q: "tracer deux médiatrices" })],
  [/^Que fait-on juste après avoir tracé deux médiatrices \?$/, () => ({ q: "marquer leur point d’intersection" })],
  [/^Que fait-on juste après avoir marqué le centre \?$/, () => ({ q: "ouvrir le compas jusqu’à un sommet" })],
  [/^Quelle est la dernière étape du tracé \?$/, () => ({ q: "tracer le cercle" })],
  [/^Où pique-t-on le compas pour le cercle circonscrit \?$/, () => ({ q: "sur le centre" })],
  [/^Jusqu’où ouvre-t-on le compas pour le cercle circonscrit \?$/, () => ({ q: "jusqu’à un sommet" })],
  [/^Le compas est piqué au centre\. Où pose-t-on la mine \?$/, () => ({ q: "sur un sommet" })],
  [/^Quelle étape se fait au compas \?$/, () => ({ q: "tracer le cercle" })],
]);
const K2_VRAI_FAUX = parRegles([
  [/^Vrai ou faux : le cercle circonscrit passe par les trois sommets\.$/, vrai],
  [/^Vrai ou faux : le cercle circonscrit passe par les milieux des côtés\.$/, faux],
  [/^Vrai ou faux : le cercle circonscrit est tracé à l’intérieur du triangle\.$/, faux],
  [/^Vrai ou faux : le rayon va du centre à un sommet\.$/, vrai],
  [/^Vrai ou faux : chaque triangle a un seul cercle circonscrit\.$/, vrai],
  [/^Vrai ou faux : le centre est le point de concours des médiatrices\.$/, vrai],
  [/^Vrai ou faux : deux médiatrices suffisent pour trouver le centre\.$/, vrai],
  [/^Vrai ou faux : une seule médiatrice suffit pour trouver le centre\.$/, faux],
  [/^Vrai ou faux : le diamètre du cercle vaut deux rayons\.$/, vrai],
]);

// ----- CONSTRUIRE, ★3
const K3_ETAPE = parRegles([
  [/^Dans le triangle [A-Z]{3}, on a tracé les médiatrices de \[[A-Z]{2}\] et de \[[A-Z]{2}\]\. Que fait-on ensuite \?$/, (_, q) => {
    const r = (q.choices ?? []).filter((c) => /^nommer [A-Z] le point où elles se coupent$/.test(c));
    return r.length === 1 ? { q: r[0] } : hors("étape absente");
  }],
  [/^([A-Z]) est le point d’intersection de deux médiatrices de [A-Z]{3}\. Que fait-on ensuite \?$/, (m) => ({ q: `pointer le compas en ${m[1]} et l’ouvrir jusqu’à un sommet` })],
  [/^Le compas est pointé en ([A-Z]) et ouvert jusqu’à [A-Z]\. Que reste-t-il à faire \?$/, () => ({ q: "tracer le cercle" })],
  [/^On veut le cercle circonscrit à [A-Z]{3}\. Que fait-on d’abord \?$/, () => ({ q: "tracer deux médiatrices" })],
  [/^Pour le triangle [A-Z]{3}, peut-on choisir n’importe quels côtés pour tracer les deux médiatrices \?$/, oui],
  [/^Le compas est pointé en [A-Z] et ouvert jusqu’au milieu de \[[A-Z]{2}\]\. Le cercle passera-t-il par [A-Z] \?$/, non],
  [/^Le compas est pointé en [A-Z]\. On l’ouvre jusqu’à [A-Z] au lieu de [A-Z]\. Le cercle circonscrit change-t-il \?$/, non],
  [/^On a trouvé [A-Z] avec deux médiatrices de [A-Z]{3}\. Comment vérifier sa place \?$/, () => ({ q: "tracer la troisième médiatrice" })],
]);
const K3_MESURES = parRegles([
  [/^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z])\. \1[A-Z] = (\d+) cm\. Quel est son diamètre \?$/, (m) => ({ l: 2 * num(m[2]) })],
  [/^Le diamètre du cercle circonscrit à [A-Z]{3} mesure (\d+) cm\. Quel écart de compas faut-il \?$/, (m) => ({ l: num(m[1]) / 2 })],
  [/^Le compas est réglé à (\d+) cm pour tracer le cercle circonscrit à [A-Z]{3}\. Combien vaut ([A-Z])[A-Z] \+ \2[A-Z] si \2 est le centre \?$/, (m) => ({ l: 2 * num(m[1]) })],
  [/^On règle le compas sur ([A-Z])[A-Z] = (\d+) cm\. \1 est le centre du cercle circonscrit à [A-Z]{3}\. Combien mesure \1[A-Z] \?$/, (m) => ({ l: num(m[2]) })],
  [/^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z])\. \1[A-Z] \+ \1[A-Z] = (\d+) cm\. Quel écart de compas faut-il \?$/, (m) => ({ l: num(m[2]) / 2 })],
  [/^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z])\. \1[A-Z] \+ \1[A-Z] \+ \1[A-Z] = (\d+) cm\. Quel écart de compas faut-il \?$/, (m) => ({ l: num(m[2]) / 3 })],
  [/^Le diamètre du cercle circonscrit à [A-Z]{3} mesure (\d+) cm\. ([A-Z]) est son centre\. Calcule \2[A-Z] \+ \2[A-Z] \+ \2[A-Z]\.$/, (m) => ({ l: (3 * num(m[1])) / 2 })],
]);
const lieuDe = (d: number, r: number) => (d === r ? "sur le cercle" : d < r ? "à l’intérieur du cercle" : "à l’extérieur du cercle");
const POS = /^Cercle circonscrit à [A-Z]{3} : centre ([A-Z]), rayon (\d+) cm\. ([A-Z]) est à (\d+) cm de \1\./.source;
const DEB = /^Cercle de centre ([A-Z]), rayon (\d+) cm\. \1([A-Z]) = (\d+) cm, \1([A-Z]) = (\d+) cm et \1([A-Z]) = (\d+) cm\./.source;
const compteSur = (m: RegExpMatchArray) => [m[4], m[6], m[8]].filter((v) => v === m[2]);
const K3_POSITION = parRegles([
  [new RegExp(`${POS} \\3 est-il sur le cercle \\?$`), (m) => ({ oui: m[2] === m[4] })],
  [new RegExp(`${POS} Où est \\3 \\?$`), (m) => ({ q: lieuDe(num(m[4]), num(m[2])) })],
  [/^Cercle circonscrit à ([A-Z]{3}) : centre ([A-Z]), rayon (\d+) cm\. ([A-Z]) est-il à \3 cm de \2 \?$/, (m) => ({ oui: m[1].includes(m[4]) })],
  [new RegExp(`${DEB} Ce cercle est-il circonscrit à [A-Z]{3} \\?$`), (m) => ({ oui: compteSur(m).length === 3 })],
  [new RegExp(`${DEB} Quel sommet est hors du cercle \\?$`), (m) => {
    const h = [[m[3], m[4]], [m[5], m[6]], [m[7], m[8]]].filter(([, v]) => v !== m[2]);
    return h.length === 1 ? { q: h[0][0] } : hors("il faut un seul sommet hors du cercle");
  }],
  [new RegExp(`${DEB} Combien de sommets sont sur le cercle \\?$`), (m) => ({ n: compteSur(m).length })],
]);
const K3_METIER_BRUT = parRegles([
  [/^(?:Une|Un) [^.]+ veut un cercle passant par trois [\p{L}]+\. Quelles droites trace-t-(?:elle|il) pour trouver le centre \?$/u, () => ({ q: "deux médiatrices" })],
  [/trace un cercle passant par trois [\p{L}]+\. Le centre est à (\d+) (cm|m|km) de l’(?:un d’eux|une d’elles)\. À quelle distance est-il des autres \?$/u, (m) => ({ l: num(m[1]), u: m[2] })],
  [/trace un cercle passant par trois [\p{L}]+\. Le centre est à (\d+) (cm|m|km) de l’(?:un d’eux|une d’elles)\. Quel est le diamètre du cercle \?$/u, (m) => ({ l: 2 * num(m[1]), u: m[2] })],
]);
function accordsMetier(q: Q): string[] {
  const t = q.text;
  const p: string[] = [];
  if (/^Une /.test(t) && /trace-t-il/.test(t)) p.push("« trace-t-il » après un nom féminin");
  if (/^Un /.test(t) && /trace-t-elle/.test(t)) p.push("« trace-t-elle » après un nom masculin");
  const lieuF = /trois (colonnes|antennes|pierres|bornes)/.test(t);
  if (/l’un d’eux/.test(t) && lieuF) p.push("« l’un d’eux » après un nom féminin");
  if (/l’une d’elles/.test(t) && !lieuF) p.push("« l’une d’elles » après un nom masculin");
  return p;
}
const K3_METIER = (q: Q) => [...K3_METIER_BRUT(q), ...accordsMetier(q)];
const K3_VERIF = parRegles([
  [/^On a tracé deux médiatrices de [A-Z]{3}\. La troisième passe à côté de [A-Z]\. Que faut-il faire \?$/, () => ({ q: "reprendre le tracé avec plus de soin" })],
  [/^La troisième médiatrice de [A-Z]{3} passe bien par [A-Z]\. Que montre ce résultat \?$/, () => ({ q: "le tracé est précis" })],
  [/^À quoi sert la troisième médiatrice, une fois le centre trouvé \?$/, () => ({ q: "à vérifier le tracé" })],
  [/^On mesure ([A-Z])[A-Z] = (\d+) cm, \1[A-Z] = (\d+) cm et \1[A-Z] = (\d+) cm\. Le centre du cercle circonscrit à [A-Z]{3} est-il bien placé \?$/, (m) => ({ oui: m[2] === m[3] && m[3] === m[4] })],
  [/^Le cercle de centre [A-Z] passe par [A-Z] et [A-Z], mais pas par [A-Z]\. Que faut-il revoir \?$/, () => ({ q: "revoir la place du centre" })],
]);

// ----- CONSTRUIRE, ★4
const K4_ERREUR = parRegles([
  [/Il pique le compas en ([A-Z])\. Quelle est son erreur \?$/, () => ({ q: "il faut piquer au centre" })],
  [/Il ouvre le compas jusqu’au milieu de \[[A-Z]{2}\]\. Quelle est son erreur \?$/, () => ({ q: "il faut ouvrir jusqu’à un sommet" })],
  [/Il trace une seule médiatrice, puis place [A-Z] dessus au hasard\. Quelle est son erreur \?$/, () => ({ q: "il faut deux médiatrices pour trouver le centre" })],
  [/Il prend le milieu de \[[A-Z]{2}\] pour centre\. Quelle est son erreur \?$/, () => ({ q: "le centre est là où les médiatrices se coupent" })],
  [/Il pique le compas en ([A-Z]) et l’ouvre de la longueur de \[[A-Z]{2}\]\. Quelle est son erreur \?$/, (m) => ({ q: `il faut ouvrir de ${m[1]} à un sommet` })],
  [/Il trace les médiatrices de \[([A-Z]{2})\] et de \[\1\]\. Quelle est son erreur \?$/, () => ({ q: "il a pris deux fois le même côté" })],
]);
const CC = "^Le cercle circonscrit à [A-Z]{3} a pour centre ([A-Z])";
const K4_PERIMETRE = parRegles([
  [new RegExp(`${CC} et pour rayon (\\d+) cm\\. ([A-Z])([A-Z]) = (\\d+) cm\\. Quel est le périmètre du triangle \\1\\3\\4 \\?$`), (m) => perimetre(num(m[2]), num(m[5]))],
  [new RegExp(`${CC} et pour diamètre (\\d+) cm\\. ([A-Z])([A-Z]) = (\\d+) cm\\. Quel est le périmètre du triangle \\1\\3\\4 \\?$`), (m) => ({ l: num(m[2]) + num(m[5]) })],
  [new RegExp(`${CC}\\. Le triangle \\1([A-Z])([A-Z]) a pour périmètre (\\d+) cm et \\2\\3 = (\\d+) cm\\. Quel est le rayon du cercle \\?$`), (m) => ({ l: (num(m[4]) - num(m[5])) / 2 })],
  [new RegExp(`${CC}\\. Le triangle \\1([A-Z])([A-Z]) a pour périmètre (\\d+) cm et \\2\\3 = (\\d+) cm\\. Quel est le diamètre du cercle \\?$`), (m) => ({ l: num(m[4]) - num(m[5]) })],
  [new RegExp(`${CC} et pour rayon (\\d+) cm\\. Le triangle \\1([A-Z])([A-Z]) a pour périmètre (\\d+) cm\\. Combien mesure \\3\\4 \\?$`), (m) => ({ l: num(m[5]) - 2 * num(m[2]) })],
  [new RegExp(`${CC}\\. Quel écart de compas faut-il, si \\1([A-Z]) \\+ \\1([A-Z]) \\+ \\2\\3 = (\\d+) cm et \\2\\3 = (\\d+) cm \\?$`), (m) => ({ l: (num(m[4]) - num(m[5])) / 2 })],
]);
const K4_AUTRES = parRegles([
  [/^Combien de cercles circonscrits a un triangle \?$/, n1],
  [/^On déplace le sommet [A-Z] de [A-Z]{3}\. Le centre du cercle circonscrit peut-il changer \?$/, oui],
  [/^Deux triangles différents peuvent-ils avoir le même cercle circonscrit \?$/, oui],
  [/^Les points [A-Z], [A-Z], [A-Z] et [A-Z] sont sur un même cercle\. Combien de triangles ont ces points pour sommets \?$/, () => ({ n: 4 })],
  [/^[A-Z] est un autre point du cercle circonscrit à [A-Z]{3}, de centre ([A-Z])\. Quel est le centre du cercle circonscrit à [A-Z]{3} \?$/, (m) => ({ q: m[1] })],
  [/^[A-Z] est un autre point du cercle circonscrit à [A-Z]{3}, de centre ([A-Z])\. \1[A-Z] = (\d+) cm\. Combien mesure \1[A-Z] \?$/, (m) => ({ l: num(m[2]) })],
  [/^[A-Z] est un autre point du cercle circonscrit à [A-Z]{3}, de centre [A-Z]\. Est-il forcément sur la médiatrice de \[[A-Z]{2}\] \?$/, non],
]);
const K4_PASSE = parRegles([
  [/^Un cercle de centre ([A-Z]) passe par ([A-Z]) et ([A-Z])\. Quelle médiatrice passe par \1 \?$/, (m) => ({ q: `celle de [${m[2]}${m[3]}]` })],
  [/^Un cercle de centre [A-Z] passe par [A-Z], [A-Z] et [A-Z]\. Combien de médiatrices de [A-Z]{3} passent par [A-Z] \?$/, n3],
  [/^Un cercle de centre ([A-Z]) passe par ([A-Z]) et ([A-Z])\. \1\2 = (\d+) cm\. Combien mesure \1\3 \?$/, (m) => ({ l: num(m[4]) })],
  [/^Un cercle de centre ([A-Z]) passe par ([A-Z]) et ([A-Z]), mais pas par ([A-Z])\. \1 est-il sur la médiatrice de \[\2\4\] \?$/, non],
  [/^Un cercle de centre ([A-Z]) passe par ([A-Z]) et ([A-Z])\. Le triangle \1\2\3 est-il isocèle \?$/, oui],
  [/^Un cercle de centre ([A-Z]) passe par ([A-Z]) et ([A-Z])\. Quelle égalité est juste \?$/, (m) => ({ q: `${m[1]}${m[2]} = ${m[1]}${m[3]}` })],
]);
const K4_FIGURE = parRegles([
  [/^Observe la figure\. Quel est le diamètre du cercle \?$/, (_, q) => ({ l: 2 * rayonFig(q) })],
  [/^Sur la figure, calcule ([A-Z])[A-Z] \+ \1[A-Z] \+ \1[A-Z]\.$/, (_, q) => ({ l: 3 * rayonFig(q) })],
  [/^Sur la figure, [A-Z]{2} = (\d+) cm\. Quel est le périmètre du triangle [A-Z]{3} \?$/, (m, q) => perimetre(rayonFig(q), num(m[1]))],
  [/^Observe la figure\. Pour tracer ce cercle, quel écart de compas faut-il \?$/, (_, q) => ({ l: rayonFig(q) })],
  [/^Observe la figure\. De combien faut-il agrandir le rayon pour un diamètre de (\d+) cm \?$/, (m, q) => ({ l: num(m[1]) / 2 - rayonFig(q) })],
]);
const K4_CORDE = parRegles([
  [/attache une corde de (\d+) m au point ([A-Z])\. Tendue, elle atteint les [\p{L}]+ [A-Z], [A-Z] et [A-Z]\. Quelle distance sépare \2 de [A-Z] \?$/u, (m) => ({ l: num(m[1]), u: "m" })],
  [/attache une corde de (\d+) m au point [A-Z]\. Tendue, elle atteint les [\p{L}]+ [A-Z], [A-Z] et [A-Z]\. Quel est le diamètre du cercle tracé \?$/u, (m) => ({ l: 2 * num(m[1]), u: "m" })],
]);

// ----- CONSTRUIRE, ★5
function corrigerProgramme(q: Q): string[] {
  const t = q.text;
  const mot = [/tracer les médiatrices de/, /nommer [A-Z] le point d’intersection/, /ouvrir le compas de/, /tracer le cercle de centre/];
  const debut = t.match(/^Pour le triangle [A-Z]{3}, voici un programme : (.+)\. Quelle étape manque \?$/);
  if (!debut) return [`tournure inconnue du correcteur : ${t}`];
  const absentes = mot.filter((re) => !re.test(debut[1]));
  if (absentes.length !== 1) return [`${absentes.length} étapes manquent dans le texte`];
  const r = (q.choices ?? []).filter((c) => absentes[0].test(c));
  return r.length === 1 ? qcm(q, r[0]) : ["l’étape manquante n’est pas proposée une seule fois"];
}
const K5_POURQUOI = parRegles([
  [/^Pourquoi peut-on ouvrir le compas jusqu’à n’importe quel sommet de [A-Z]{3} \?$/, () => ({ q: "les trois distances au centre sont égales" })],
  [/^Pourquoi le centre du cercle circonscrit à [A-Z]{3} est-il sur la médiatrice de \[([A-Z])([A-Z])\] \?$/, (m) => ({ q: `il est à égale distance de ${m[1]} et de ${m[2]}` })],
  [/^Pourquoi le milieu de \[([A-Z])([A-Z])\] n’est-il pas toujours le centre du cercle circonscrit \?$/, (_, q) => {
    const r = (q.choices ?? []).filter((c) => /^il n’est pas toujours à la même distance de [A-Z]$/.test(c));
    return r.length === 1 ? { q: r[0] } : hors("raison absente");
  }],
  [/^Pourquoi le cercle de centre ([A-Z]) passant par ([A-Z]) passe-t-il aussi par ([A-Z]), si \1 est sur les trois médiatrices \?$/, (m) => ({ q: `${m[1]}${m[2]} = ${m[1]}${m[3]}` })],
  [/^Pourquoi trace-t-on des médiatrices pour trouver le centre, et pas des hauteurs \?$/, () => ({ q: "la médiatrice rassemble les points à égale distance de deux sommets" })],
]);
const K5_CALCUL = parRegles([
  [new RegExp(`${CC}\\. Le triangle \\1([A-Z])([A-Z]) a pour périmètre (\\d+) cm, \\2\\3 = (\\d+) cm et \\2([A-Z]) = (\\d+) cm\\. Quel est le périmètre de \\1\\2\\6 \\?$`), (m) => ({ l: num(m[4]) - num(m[5]) + num(m[7]) })],
  [new RegExp(`${CC} et pour diamètre (\\d+) cm\\. [A-Z]{3} a pour périmètre (\\d+) cm\\. Calcule la somme des périmètres de \\1[A-Z]{2}, \\1[A-Z]{2} et \\1[A-Z]{2}\\.$`), (m) => ({ l: num(m[3]) + 3 * num(m[2]) })],
  [new RegExp(`${CC}\\. La somme \\1[A-Z] \\+ \\1[A-Z] \\+ \\1[A-Z] vaut (\\d+) cm\\. Quel est le diamètre du cercle \\?$`), (m) => ({ l: (2 * num(m[2])) / 3 })],
  [new RegExp(`${CC}\\. Le compas est ouvert de \\d+ cm\\. On l’ouvre encore de (\\d+) cm\\. De combien grandit le diamètre \\?$`), (m) => ({ l: 2 * num(m[2]) })],
  [new RegExp(`${CC} et pour diamètre \\d+ cm\\. ([A-Z])([A-Z]) = (\\d+) cm\\. De combien le périmètre de \\1\\2\\3 dépasse-t-il le diamètre \\?$`), (m) => ({ l: num(m[4]) })],
]);
const SUR4 = "^Les points ([A-Z]), ([A-Z]), ([A-Z]) et ([A-Z]) sont sur un cercle de centre ([A-Z])\\.";
const K5_QUATRE = parRegles([
  [new RegExp(`${SUR4} La médiatrice de \\[\\1\\4\\] passe-t-elle par \\5 \\?$`), oui],
  [new RegExp(`${SUR4} Combien de segments reliant deux de ces points ont une médiatrice passant par \\5 \\?$`), () => ({ n: 6 })],
  [new RegExp(`${SUR4} \\5\\1 = (\\d+) cm\\. Lesquels de ces points sont à \\6 cm de \\5 \\?$`), () => ({ q: "les quatre" })],
  [/^Les médiatrices de \[([A-Z])([A-Z])\] et de \[\2([A-Z])\] se coupent en ([A-Z]), et \4([A-Z]) = \4\1\. \5 est-il sur le cercle de centre \4 passant par \1 \?$/, oui],
  [/^Les médiatrices de \[([A-Z])([A-Z])\] et de \[\2([A-Z])\] se coupent en ([A-Z]), et \4([A-Z]) = \4\1 \+ 1 cm\. \5 est-il sur le cercle de centre \4 passant par \1 \?$/, non],
]);
const K5_MORCEAU = parRegles([
  [/marque trois points ([A-Z]), ([A-Z]) et ([A-Z]) sur son bord\. Comment retrouver le centre \?$/, (m) => ({ q: `tracer les médiatrices de [${m[1]}${m[2]}] et de [${m[2]}${m[3]}]` })],
  [/marque trois points ([A-Z]), ([A-Z]) et ([A-Z]) sur son bord\. Les médiatrices de \[\1\2\] et de \[\2\3\] se coupent en ([A-Z]), et \4\1 = (\d+) cm\. Quel est le diamètre de (?:l’assiette|la roue|le plat|le cadran|le hublot) \?$/, (m) => ({ l: 2 * num(m[5]) })],
]);
const TR = /^Sur un tracé, ([A-Z])([A-Z]) = (\d+) cm, \1([A-Z]) = (\d+) cm et \1([A-Z]) = (\d+) cm\./.source;
const K5_RAYON = parRegles([
  [new RegExp(`${TR} Par combien de sommets passe le cercle de centre \\1 et de rayon (\\d+) cm \\?$`), (m) => ({ n: [m[3], m[5], m[7]].filter((v) => v === m[8]).length })],
  [new RegExp(`${TR} Où est \\6 par rapport au cercle de centre \\1 passant par \\2 \\?$`), (m) => ({ q: num(m[7]) === num(m[3]) ? "sur le cercle" : num(m[7]) > num(m[3]) ? "à l’extérieur" : "à l’intérieur" })],
  [new RegExp(`${TR} Que peut-on dire de \\1 \\?$`), (m) => (m[3] === m[5] && m[5] !== m[7] ? { q: `il est sur la médiatrice de [${m[2]}${m[4]}] seulement` } : hors("les distances ne donnent pas une seule médiatrice"))],
  [new RegExp(`${TR} De combien faut-il rapprocher \\6 de \\1 pour que \\1 soit le centre \\?$`), (m) => (m[3] === m[5] ? { l: num(m[7]) - num(m[3]) } : hors("les deux premières distances diffèrent"))],
  [new RegExp(`${TR} Combien de médiatrices du triangle passent par \\1 \\?$`), (m) => ({ n: m[3] === m[5] && m[5] === m[7] ? 3 : m[3] === m[5] || m[5] === m[7] || m[3] === m[7] ? 1 : 0 })],
]);

const C4_INEGALITE = parRegles([
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. \1[A-Z] = (\d+) cm\. Le côté \[[A-Z]{2}\] peut-il mesurer (\d+) cm \?$/, (m) => ({ oui: num(m[3]) <= 2 * num(m[2]) })],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. \1[A-Z] = (\d+) cm\. Quelle est la plus grande longueur possible pour un côté \?$/, (m) => ({ l: 2 * num(m[2]) })],
  [/^Les médiatrices de [A-Z]{3} se coupent en ([A-Z])\. \1[A-Z] = (\d+) cm\. Quelle longueur est possible pour \[[A-Z]{2}\] \?$/, (m, q) => {
    const r = (q.choices ?? []).filter((c) => parseInt(c) <= 2 * num(m[2]));
    return r.length === 1 ? { q: r[0] } : hors(`${r.length} longueurs possibles`);
  }],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\] et sur le segment \[\2\3\]\. Quel est ce point \?$/, (m) => ({ q: `le milieu de [${m[2]}${m[3]}]` })],
  [/^Le centre ([A-Z]) du cercle circonscrit à [A-Z]{3} est sur le côté \[[A-Z]{2}\]\. \1[A-Z] = (\d+) cm\. Combien mesure [A-Z]{2} \?$/, (m) => ({ l: 2 * num(m[2]) })],
]);
const DEUX_POINTS = parRegles([
  [/^([A-Z]) et ([A-Z]) sont sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\3 = (\d+) cm et \2\4 = (\d+) cm\. Calcule \1\4 \+ \2\3\.$/, (m) => ({ l: num(m[5]) + num(m[6]) })],
  [/^([A-Z]) et ([A-Z]) sont sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\3 = (\d+) cm et \2\4 = (\d+) cm\. Quel est le périmètre du quadrilatère \3\1\4\2 \?$/, (m) => ({ l: 2 * (num(m[5]) + num(m[6])) })],
  [/^([A-Z]) et ([A-Z]) sont sur la médiatrice de \[([A-Z])([A-Z])\]\. Quelle droite est la médiatrice de \[\3\4\] \?$/, (m) => ({ q: `(${m[1]}${m[2]})` })],
  [/^([A-Z])([A-Z]) = \1([A-Z]) et ([A-Z])\2 = \4\3\. Quelle droite est la médiatrice de \[\2\3\] \?$/, (m) => ({ q: `(${m[1]}${m[4]})` })],
  [/^([A-Z]) et ([A-Z]) sont sur la médiatrice de \[([A-Z])([A-Z])\]\. La droite \(\1\2\) coupe \[\3\4\] en un point\. Quel est ce point \?$/, (m) => ({ q: `le milieu de [${m[3]}${m[4]}]` })],
  [/^Combien de points sont à égale distance de [A-Z] et de [A-Z] \?$/, () => ({ q: "une infinité" })],
  [/^([A-Z]) et ([A-Z]) sont sur la médiatrice de \[([A-Z])([A-Z])\]\. \1\3 = (\d+) cm et \2\3 = (\d+) cm\. A-t-on \1\4 = \2\4 \?$/, (m) => ({ oui: m[5] === m[6] })],
]);
const C5_CAS = parRegles([
  [/^[A-Z], [A-Z] et [A-Z] sont alignés\. Combien de points sont à égale distance des trois \?$/, () => ({ n: 0 })],
  [/^[A-Z], [A-Z] et [A-Z] ne sont pas alignés\. Combien de points sont à égale distance des trois \?$/, n1],
  [/^Les médiatrices de \[[A-Z]{2}\] et de \[[A-Z]{2}\] sont parallèles\. Que dire de/, () => ({ q: "ils sont alignés" })],
  [/^Les médiatrices de \[[A-Z]{2}\] et de \[[A-Z]{2}\] se coupent\. Que dire de/, () => ({ q: "ils ne sont pas alignés" })],
  [/^[A-Z], [A-Z] et [A-Z] sont alignés\. Comment sont les médiatrices de/, () => ({ q: "parallèles" })],
  [/^[A-Z], [A-Z] et [A-Z] ne sont pas alignés\. Combien de cercles passent par les trois \?$/, n1],
]);
const DEP = /^La preuve part des médiatrices de \[([A-Z])([A-Z])\] et de \[\1([A-Z])\], qui se coupent en ([A-Z])\./.source;
const C5_VARIANTE = parRegles([
  [new RegExp(`${DEP} Quelles égalités obtient-on \\?$`), (m) => ({ q: `${m[4]}${m[1]} = ${m[4]}${m[2]} et ${m[4]}${m[1]} = ${m[4]}${m[3]}` })],
  [new RegExp(`${DEP} Quelle est la conclusion \\?$`), (m) => ({ q: `${m[4]} est sur la médiatrice de [${m[2]}${m[3]}]` })],
  [new RegExp(`${DEP} Quelle égalité donne la conclusion \\?$`), (m) => ({ q: `${m[4]}${m[2]} = ${m[4]}${m[3]}` })],
  [/^La preuve part des médiatrices de \[([A-Z])([A-Z])\] et de \[([A-Z])\2\]\. Quelle médiatrice reste à étudier \?$/, (m) => ({ q: `celle de [${m[1]}${m[3]}]` })],
  [/^La preuve part des médiatrices de \[([A-Z])([A-Z])\] et de \[([A-Z])\2\], qui se coupent en ([A-Z])\. Quelle égalité obtient-on à la fin \?$/, (m) => ({ q: `${m[4]}${m[1]} = ${m[4]}${m[3]}` })],
]);
const MIL = /^Le centre ([A-Z]) du cercle circonscrit à [A-Z]{3} est le milieu de \[([A-Z])([A-Z])\]\./.source;
const RAY = /^Le cercle circonscrit à [A-Z]{3} a pour rayon (\d+) cm\./.source;
const K4_DIAMETRE = parRegles([
  [new RegExp(`${MIL} \\2\\3 = (\\d+) cm\\. Quel est le rayon \\?$`), (m) => ({ l: num(m[4]) / 2 })],
  [new RegExp(`${MIL} \\2\\3 = (\\d+) cm\\. Combien mesure \\1[A-Z] \\?$`), (m) => ({ l: num(m[4]) / 2 })],
  [new RegExp(`${MIL} \\1[A-Z] = (\\d+) cm\\. Combien mesure \\2\\3 \\?$`), (m) => ({ l: 2 * num(m[4]) })],
  [new RegExp(`${RAY} Un côté peut-il mesurer (\\d+) cm \\?$`), (m) => ({ oui: num(m[2]) <= 2 * num(m[1]) })],
  [new RegExp(`${RAY} Quelle est la plus grande longueur possible pour un côté \\?$`), (m) => ({ l: 2 * num(m[1]) })],
  [new RegExp(`${MIL} Le segment \\[\\2\\3\\] est-il un diamètre du cercle \\?$`), oui],
  [new RegExp(`${MIL} Comment appelle-t-on \\[\\2\\3\\] pour ce cercle \\?$`), () => ({ q: "un diamètre" })],
]);
const K5_CERCLES = parRegles([
  [/^Deux cercles passent par ([A-Z]) et ([A-Z])\. Où sont leurs centres \?$/, (m) => ({ q: `sur la médiatrice de [${m[1]}${m[2]}]` })],
  [/^Combien de cercles passent par [A-Z] et [A-Z] \?$/, () => ({ q: "une infinité" })],
  [/^[A-Z], [A-Z] et [A-Z] ne sont pas alignés\. Combien de cercles passent par ces trois points \?$/, n1],
  [/^[A-Z], [A-Z] et [A-Z] sont alignés\. Combien de cercles passent par ces trois points \?$/, () => ({ n: 0 })],
  [/^([A-Z]) est sur la médiatrice de \[([A-Z])([A-Z])\]\. Le cercle de centre \1 passant par \2 passe-t-il par \3 \?$/, oui],
  [/^Le cercle de centre ([A-Z]) passant par ([A-Z]) passe aussi par ([A-Z])\. \1 est-il sur la médiatrice de \[\2\3\] \?$/, oui],
]);

export const CORRECTEURS: CorrecteursMaths = {
  circonscrit_concourantes_tpl_inegalite: C4_INEGALITE,
  circonscrit_concourantes_tpl_deux_points: DEUX_POINTS,
  circonscrit_concourantes_tpl_cas: C5_CAS,
  circonscrit_concourantes_tpl_variante: C5_VARIANTE,
  circonscrit_construire_tpl_diametre: K4_DIAMETRE,
  circonscrit_construire_tpl_cercles: K5_CERCLES,
  circonscrit_concourantes_tpl_compter: C2_COMPTER,
  circonscrit_concourantes_tpl_vrai_faux: C2_VRAI_FAUX,
  circonscrit_concourantes_tpl_mot: C2_MOT,
  circonscrit_concourantes_tpl_figure: C2_FIGURE,
  circonscrit_concourantes_tpl_egalite: C2_EGALITE,
  circonscrit_concourantes_tpl_longueur: C2_LONGUEUR,
  circonscrit_concourantes_tpl_chaine: C3_CHAINE,
  circonscrit_concourantes_tpl_test: C3_TEST,
  circonscrit_concourantes_tpl_somme: C3_SOMME,
  circonscrit_concourantes_tpl_situation: C3_SITUATION,
  circonscrit_concourantes_tpl_preuve_pas: C3_PREUVE,
  circonscrit_concourantes_tpl_isocele: C3_FIGURE,
  circonscrit_concourantes_tpl_argument: C4_ARGUMENT,
  circonscrit_concourantes_tpl_perimetre: C4_PERIMETRE,
  circonscrit_concourantes_tpl_raisonnement: C4_RAISONNEMENT,
  circonscrit_concourantes_tpl_forcement: C4_FORCEMENT,
  circonscrit_concourantes_tpl_mesure: C4_MESURE,
  circonscrit_concourantes_tpl_sans_tracer: C4_SANS_TRACER,
  circonscrit_concourantes_tpl_ordre: C5_ORDRE,
  circonscrit_concourantes_tpl_perimetres: C5_PERIMETRES,
  circonscrit_concourantes_tpl_quatre_points: C5_QUATRE,
  circonscrit_concourantes_tpl_sens: C5_SENS,
  circonscrit_concourantes_tpl_isocele_defi: C5_ISOCELE,
  circonscrit_concourantes_tpl_compte_cercle: C5_COMPTE,
  circonscrit_construire_tpl_mot: K2_MOT,
  circonscrit_construire_tpl_centre: K2_CENTRE,
  circonscrit_construire_tpl_figure: K2_FIGURE,
  circonscrit_construire_tpl_rayon: K2_RAYON,
  circonscrit_construire_tpl_ordre: K2_ORDRE,
  circonscrit_construire_tpl_vrai_faux: K2_VRAI_FAUX,
  circonscrit_construire_tpl_etape: K3_ETAPE,
  circonscrit_construire_tpl_mesures: K3_MESURES,
  circonscrit_construire_tpl_position: K3_POSITION,
  circonscrit_construire_tpl_metier: K3_METIER,
  circonscrit_construire_tpl_verif: K3_VERIF,
  circonscrit_construire_tpl_erreur: K4_ERREUR,
  circonscrit_construire_tpl_perimetre: K4_PERIMETRE,
  circonscrit_construire_tpl_autres_points: K4_AUTRES,
  circonscrit_construire_tpl_passe_par: K4_PASSE,
  circonscrit_construire_tpl_figure_calcul: K4_FIGURE,
  circonscrit_construire_tpl_corde: K4_CORDE,
  circonscrit_construire_tpl_programme: corrigerProgramme,
  circonscrit_construire_tpl_pourquoi: K5_POURQUOI,
  circonscrit_construire_tpl_calcul: K5_CALCUL,
  circonscrit_construire_tpl_quatre_points: K5_QUATRE,
  circonscrit_construire_tpl_morceau: K5_MORCEAU,
  circonscrit_construire_tpl_rayon_faux: K5_RAYON,
  circonscrit_concourantes_tpl_1: corrigerDistanceSommet,
  circonscrit_concourantes_tpl_ouverte: corrigerPreuve,
  circonscrit_construire_tpl_1: corrigerDistanceSommet,
  circonscrit_construire_tpl_ouverte: corrigerConstruction,
  circonscrit_defi_tpl_1: (q) => [...corrigerDistanceSommet(q), ...accords(q)],
  circonscrit_defi_tpl_ouverte: (q) => [...corrigerDefiSituation(q), ...accords(q)],
};

/* ⭐ 14/11/2026 — UN CAS DE REFUS : une construction FAUSSE que constructionRelue doit
   refuser (scripts ou tests : `casRefusConstruction()` doit renvoyer des problèmes).
   Le centre O est décalé (OA = 5, OB ≈ 5,4, OC ≈ 4,9 : B et C hors du cercle de
   rayon 5), l’angle « droit » de la médiatrice de [AB] est faux, ses deux moitiés
   codées sont inégales, et une lettre K absente de l’énoncé est affichée : six refus. */
export function casRefusConstruction(): string[] {
  const q = {
    text: "Les médiatrices du triangle ABC se coupent en O. OA = 5 cm. Combien mesure OB ?",
    format: "short",
    expected: ["5 cm"],
    comparator: "number_equal",
    explanation: "",
    canvas: {
      kind: "construction",
      points: [
        { id: "O", x: 0.4, y: 0 },
        { id: "A", x: -4.6, y: 0 },
        { id: "B", x: 0, y: 5.4 },
        { id: "C", x: 4.7, y: -1.2 },
        { id: "_m", x: -2.1, y: 2.9, cache: true },
        { id: "_n", x: -0.3, y: 4.2, cache: true },
        { id: "K", x: 2, y: 3 },
      ],
      segments: [
        { a: "A", b: "_m", code: 1 },
        { a: "_m", b: "B", code: 1 },
        { a: "B", b: "C" },
        { a: "A", b: "C" },
        { a: "O", b: "B", texte: "5 cm" },
      ],
      droites: [{ a: "_m", b: "_n" }],
      angles: [{ sommet: "_m", de: "B", vers: "_n", droit: true }],
      cercles: [{ centre: "O", rayon: 5 }],
    },
  } as unknown as Q;
  return constructionRelue(q);
}
