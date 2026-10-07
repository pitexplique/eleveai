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

export const CORRECTEURS: CorrecteursMaths = {
  circonscrit_concourantes_tpl_1: corrigerDistanceSommet,
  circonscrit_concourantes_tpl_ouverte: corrigerPreuve,
  circonscrit_construire_tpl_1: corrigerDistanceSommet,
  circonscrit_construire_tpl_ouverte: corrigerConstruction,
  circonscrit_defi_tpl_1: (q) => [...corrigerDistanceSommet(q), ...accords(q)],
  circonscrit_defi_tpl_ouverte: (q) => [...corrigerDefiSituation(q), ...accords(q)],
};
