import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { NB, cle, lireValeur, num, proche, verifierReponse } from "./pythagore";

// LES CORRECTEURS DE thales.bank.ts (notion thales_theoreme, 08/10/2026).
//
// Ils relisent DANS LE TEXTE la configuration : le triangle, les deux points et
// les côtés où ils sont (« M ∈ [AB] », « coupe [AB] en M », « A, M, B alignés
// dans cet ordre »), le sommet commun, le parallélisme DONNÉ (énoncé ou codage)
// ou seulement « à l'air » ; les longueurs (cm et m mêlés convertis) ; sur la
// FIGURE, les mêmes noms de points, les mêmes longueurs, le « ? » sur la
// longueur cherchée et les marques de parallélisme SEULEMENT quand il est donné
// (jamais dans une réciproque, où c'est à prouver). Puis ils refont le
// raisonnement : rapports associés demi-droite par demi-droite (petit sur grand,
// côtés parallèles ensemble), coefficient, produit en croix, quatrième
// proportionnelle, conclusion par le théorème ou par la réciproque. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Role = "AM" | "AB" | "AN" | "AC" | "MN" | "BC" | "MB" | "NC" | "MC" | "NB";
type Config = { tri: string; A: string; B: string; C: string; M: string; N: string };

/** Les points placés sur un segment, toutes les façons de l'écrire. */
function positions(t: string): [string, string][] {
  const p: [string, string][] = [];
  for (const m of t.matchAll(/\b([A-Z]) (?:est )?(?:sur|∈|appartient au segment) \[([A-Z]{2})\]/g)) p.push([m[1], m[2]]);
  for (const m of t.matchAll(/\bet ([A-Z]) au segment \[([A-Z]{2})\]/g)) p.push([m[1], m[2]]);
  for (const m of t.matchAll(/les points ([A-Z]) et ([A-Z]) sont placés sur \[([A-Z]{2})\] et \[([A-Z]{2})\]/g)) p.push([m[1], m[3]], [m[2], m[4]]);
  for (const m of t.matchAll(/coupe \[([A-Z]{2})\] en ([A-Z]) et \[([A-Z]{2})\] en ([A-Z])/g)) p.push([m[2], m[1]], [m[4], m[3]]);
  for (const m of t.matchAll(/les points ([A-Z]), ([A-Z]), ([A-Z]) sont alignés dans cet ordre, ainsi que ([A-Z]), ([A-Z]), ([A-Z])/g))
    p.push([m[2], m[1] + m[3]], [m[5], m[4] + m[6]]);
  for (const m of t.matchAll(/les points ([A-Z]), ([A-Z]), ([A-Z]) et ([A-Z]), ([A-Z]), ([A-Z]) sont alignés/g)) p.push([m[2], m[1] + m[3]], [m[5], m[4] + m[6]]);
  return p;
}

/** La configuration de Thalès lue dans le texte (null si les points ne sont pas sur deux côtés issus d'un même sommet). */
function lireConfig(t: string): { c: Config | null; pb: string[] } {
  const nomme = t.match(/triangle ([A-Z]{3})\b/)?.[1];
  const pos = positions(t);
  const uniques = [...new Map(pos.map((x) => [x[0], x])).values()];
  if (uniques.length !== 2) return { c: null, pb: [`deux points placés attendus, lus : ${uniques.map((x) => `${x[0]}∈[${x[1]}]`).join(", ")}`] };
  const [[M, s1], [N, s2]] = uniques;
  const pb: string[] = [];
  if (nomme) for (const s of [s1, s2]) if (![...s].every((x) => nomme.includes(x))) pb.push(`[${s}] n'est pas un côté de ${nomme}`);
  const A = [...s1].find((x) => s2.includes(x));
  if (!A || s1 === s2 || cle(s1) === cle(s2)) return { c: null, pb };
  const B = [...s1].find((x) => x !== A)!;
  const C = [...s2].find((x) => x !== A)!;
  if (new Set([A, B, C, M, N]).size !== 5) pb.push("cinq points distincts attendus");
  // Sans nom écrit (« on étudie un triangle coupé par une droite »), le triangle est ABC.
  return { c: { tri: nomme ?? A + B + C, A, B, C, M, N }, pb };
}

/** Le rôle d'un segment dans la configuration : « SE » → « AM ». */
function role(c: Config, seg: string): Role | null {
  const inv: Record<string, string> = { [c.A]: "A", [c.B]: "B", [c.C]: "C", [c.M]: "M", [c.N]: "N" };
  if (seg.length !== 2 || !inv[seg[0]] || !inv[seg[1]]) return null;
  const k = cle(inv[seg[0]] + inv[seg[1]]);
  const R: Record<string, Role> = { AM: "AM", AB: "AB", AN: "AN", AC: "AC", MN: "MN", BC: "BC", BM: "MB", CN: "NC", CM: "MC", BN: "NB" };
  return R[k] ?? null;
}
const nommer = (c: Config, r: string) => [...r].map((x) => (c as unknown as Record<string, string>)[x]).join("");

/** Les longueurs du texte, par rôle, en cm (le mètre est converti). */
function longueurs(c: Config, t: string): { L: Map<Role, number>; brut: Map<Role, string>; unites: Set<string>; pb: string[] } {
  const L = new Map<Role, number>();
  const brut = new Map<Role, string>();
  const unites = new Set<string>();
  const pb: string[] = [];
  for (const m of t.matchAll(new RegExp(`\\b([A-Z]{2}) = ${NB} (cm|m)\\b`, "g"))) {
    const r = role(c, m[1]);
    if (!r) {
      pb.push(`[${m[1]}] n'est pas un segment de la configuration`);
      continue;
    }
    L.set(r, num(m[2]) * (m[3] === "m" ? 100 : 1));
    brut.set(r, `${m[2]} ${m[3]}`);
    unites.add(m[3]);
  }
  // M entre A et B, N entre A et C : la petite longueur est la plus courte.
  for (const [p, g] of [["AM", "AB"], ["AN", "AC"], ["MN", "BC"]] as [Role, Role][])
    if (L.has(p) && L.has(g) && !(L.get(p)! < L.get(g)!)) pb.push(`${nommer(c, p)} (${brut.get(p)}) n'est pas plus court que ${nommer(c, g)} (${brut.get(g)})`);
  if (L.has("AM") && L.has("AN") && L.has("MN")) {
    const [a, b, d] = [L.get("AM")!, L.get("AN")!, L.get("MN")!];
    if (!(a < b + d && b < a + d && d < a + b)) pb.push("le petit triangle n'existe pas");
  }
  return { L, brut, unites, pb };
}

/** La figure : mêmes points, mêmes longueurs, « ? » sur la longueur cherchée, parallèles codées seulement quand c'est donné. */
function verifierFigure(q: Q, c: Config | null, o: { parallele: boolean; brut?: Map<Role, string>; inconnu?: Role | null }): string[] {
  const f = q.canvas as
    | { kind?: string; labels?: Record<string, string>; sideLabels?: Record<string, string>; display?: { showParallelMarks?: boolean; highlightParallel?: boolean } }
    | undefined;
  if (!f) return [];
  if (f.kind !== "thales") return ["figure : une configuration de Thalès attendue"];
  const p: string[] = [];
  if (c) for (const k of ["A", "B", "C", "M", "N"] as const) if (f.labels?.[k] !== c[k]) p.push(`figure : le point ${k} s'appelle ${f.labels?.[k]} au lieu de ${c[k]}`);
  if (!!f.display?.showParallelMarks !== o.parallele || !!f.display?.highlightParallel !== o.parallele)
    p.push(o.parallele ? "figure : le parallélisme donné n'est pas codé" : "figure : des parallèles sont codées alors que rien ne les donne");
  const sl = f.sideLabels ?? {};
  for (const [k, v] of Object.entries(sl)) {
    if (v === "?") {
      if (o.inconnu !== undefined && o.inconnu !== k) p.push(`figure : « ? » sur ${k} au lieu de ${o.inconnu}`);
      continue;
    }
    const lu = o.brut?.get(k as Role);
    if (!lu) p.push(`figure : ${k} porte « ${v} », absent du texte`);
    else if (lu !== v) p.push(`figure : ${k} porte « ${v} », le texte dit « ${lu} »`);
  }
  if (o.brut) for (const [k, v] of o.brut) if (Object.keys(sl).length && sl[k] !== v) p.push(`figure : ${k} = ${v} n'est pas écrit`);
  if (o.inconnu && Object.keys(sl).length && sl[o.inconnu] !== "?") p.push("figure : la longueur cherchée n'est pas marquée « ? »");
  return p;
}

// ─── Rapports ───────────────────────────────────────────────────────────────

const CHAINE: [Role, Role][] = [["AM", "AB"], ["AN", "AC"], ["MN", "BC"]];
/** « SE / ST » → ["AM", "AB"]. */
function lireRapport(c: Config, s: string): [Role | null, Role | null] | null {
  const m = s.trim().match(/^([A-Z]{2}) ?\/ ?([A-Z]{2})$/);
  return m ? [role(c, m[1]), role(c, m[2])] : null;
}
/** Le rapport est-il dans la chaîne de Thalès (sens 1 : petit/grand ; sens -1 : grand/petit) ? */
function sensRapport(r: [Role | null, Role | null] | null): { i: number; sens: 1 | -1 } | null {
  if (!r) return null;
  for (let i = 0; i < 3; i++) {
    if (r[0] === CHAINE[i][0] && r[1] === CHAINE[i][1]) return { i, sens: 1 };
    if (r[0] === CHAINE[i][1] && r[1] === CHAINE[i][0]) return { i, sens: -1 };
  }
  return null;
}
/** « X/Y = Z/W » est une égalité de Thalès : deux rapports différents de la chaîne, dans le même sens. */
function egaliteThales(c: Config, e: string): { i: number; j: number } | null {
  const [g, d] = e.split(" = ");
  if (!g || !d) return null;
  const a = sensRapport(lireRapport(c, g));
  const b = sensRapport(lireRapport(c, d));
  return a && b && a.i !== b.i && a.sens === b.sens ? { i: a.i, j: b.i } : null;
}

/**
 * Une égalité VRAIE dans la configuration, même si ce n'est pas la forme de
 * Thalès écrite en classe : la chaîne (AM/AB = AN/AC…), et aussi les rapports
 * pris dans un même triangle (AM/AN = AB/AC, AM/MN = AB/BC, AN/MN = AC/BC).
 */
function egaliteVraie(c: Config, e: string): boolean {
  if (egaliteThales(c, e)) return true;
  const [g, d] = e.split(" = ").map((x) => lireRapport(c, x ?? ""));
  if (!g || !d) return false;
  const PETIT: Role[] = ["AM", "AN", "MN"];
  const GRAND: Role[] = ["AB", "AC", "BC"];
  const versGrand = (r: Role | null) => (r ? GRAND[PETIT.indexOf(r)] : undefined);
  // g = petit/petit et d = grand/grand correspondants (ou l'inverse, ou les deux renversés).
  const ok = (a: [Role | null, Role | null], b: [Role | null, Role | null]) =>
    !!a[0] && !!a[1] && a[0] !== a[1] && PETIT.includes(a[0]) && PETIT.includes(a[1]) && b[0] === versGrand(a[0]) && b[1] === versGrand(a[1]);
  return ok(g, d) || ok(d, g);
}

/** ⛔ Frédéric (08/10) : aucun leurre n'est une égalité vraie — l'élève qui le choisit aurait raison. */
function aucunLeurreVrai(q: Q, c: Config): string[] {
  return (q.choices ?? [])
    .filter((x) => x !== q.expected[0] && /^[A-Z]{2} ?\/ ?[A-Z]{2} = [A-Z]{2} ?\/ ?[A-Z]{2}$/.test(x) && egaliteVraie(c, x))
    .map((x) => `leurre vrai : « ${x} »`);
}

/** La configuration est-elle complète, le parallélisme donné ? */
function cadreTheoreme(q: Q): { c: Config | null; p: string[] } {
  const { c, pb } = lireConfig(q.text);
  if (!c) return { c, p: pb.length ? pb : ["configuration illisible"] };
  const pa = `\\(${c.M}${c.N}\\)|\\(${c.N}${c.M}\\)|\\[${c.M}${c.N}\\]`;
  const pc = `\\(${c.B}${c.C}\\)|\\(${c.C}${c.B}\\)`;
  const donne = new RegExp(`(?:${pa})(?:,| est| est codée)? (?:parallèle|//)[^.?]*?(?:${pc})`).test(q.text);
  return { c, p: [...pb, ...(donne ? [] : [`le parallélisme (${c.M}${c.N}) // (${c.B}${c.C}) n'est pas donné`])] };
}

/** Compléter : « HU / HS = … » → l'un des deux autres rapports de la chaîne. */
function corrigerCompleter(q: Q): string[] {
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  const g = q.text.match(/(?:Complète : |À quel rapport |Quel rapport est égal à |On écrit )([A-Z]{2} \/ [A-Z]{2})/)?.[1];
  const sg = g ? sensRapport(lireRapport(c, g)) : null;
  if (!sg) return [...p, `rapport de départ illisible ou hors de la chaîne : ${g}`];
  return [...p, ...qcmUnique(q, (x) => {
    const s = sensRapport(lireRapport(c, x));
    return !!s && s.i !== sg.i && s.sens === sg.sens;
  }), ...verifierFigure(q, c, { parallele: true })];
}

/** Quelle égalité de rapports est juste (lettres) ? */
function corrigerEgalite(q: Q): string[] {
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  return [...p, ...qcmUnique(q, (x) => !!egaliteThales(c, x)), ...aucunLeurreVrai(q, c), ...verifierFigure(q, c, { parallele: true })];
}

/** L'intrus : la seule égalité qui n'est PAS une égalité de Thalès. */
function corrigerIntrus(q: Q): string[] {
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  if (!/PAS|fausse/.test(q.text)) p.push("la question ne demande pas l'égalité fausse");
  return [...p, ...qcmUnique(q, (x) => !egaliteThales(c, x)), ...verifierFigure(q, c, { parallele: true })];
}

/** L'égalité écrite avec des nombres : vraie, et rapports associés comme dans Thalès. */
function corrigerNombres(q: Q): string[] {
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  const lg = longueurs(c, q.text);
  p.push(...lg.pb);
  const parRole = (v: number) => [...lg.L].filter(([, x]) => proche(x, v * (lg.unites.has("m") ? 100 : 1))).map(([r]) => r);
  const juste = (x: string) => {
    const m = x.match(new RegExp(`^${NB}/${NB} = ${NB}/${NB}$`));
    if (!m) return false;
    const [a, b, d, e] = [m[1], m[2], m[3], m[4]].map(num);
    if (!proche(a * e, b * d, 1e-6)) return false;
    // Associées demi-droite par demi-droite : chaque nombre désigne un rôle, les rapports sont dans la chaîne.
    const roles = [a, b, d, e].map(parRole);
    if (roles.some((r) => r.length !== 1)) return true;
    const s1 = sensRapport([roles[0][0], roles[1][0]]);
    const s2 = sensRapport([roles[2][0], roles[3][0]]);
    return !!s1 && !!s2 && s1.i !== s2.i && s1.sens === s2.sens;
  };
  return [...p, ...qcmUnique(q, juste), ...verifierFigure(q, c, { parallele: true, brut: lg.brut })];
}

// ─── Calculer une longueur ──────────────────────────────────────────────────

/** La longueur demandée par la question (le dernier segment nommé de la dernière phrase). */
function cible(c: Config, t: string): Role | null {
  const fin = t.slice(t.lastIndexOf(". ", t.length - 3) + 2);
  const segs = [...fin.matchAll(/\b([A-Z]{2})\b/g)].map((m) => role(c, m[1]));
  return segs.length ? segs[segs.length - 1] : null;
}

/** La quatrième proportionnelle : le coefficient vient d'une paire connue. */
function calculer(L: Map<Role, number>, T: Role): number | null {
  const paire = CHAINE.find((x) => x.includes(T))!;
  const partenaire = paire[0] === T ? paire[1] : paire[0];
  const complete = CHAINE.find((x) => x !== paire && L.has(x[0]) && L.has(x[1]));
  if (!complete || !L.has(partenaire)) return null;
  const k = L.get(complete[1])! / L.get(complete[0])!;
  return paire[0] === T ? L.get(partenaire)! / k : L.get(partenaire)! * k;
}

function corrigerCalcul(q: Q): string[] {
  const t = q.text;
  const objet = / est schématisée? par le triangle /.test(t);
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  const lg = longueurs(c, t);
  p.push(...lg.pb);
  const T = cible(c, t);
  if (!T || !CHAINE.flat().includes(T)) return [...p, "longueur cherchée illisible"];
  if (lg.L.has(T)) p.push("la longueur cherchée est déjà donnée");
  if (lg.L.size !== 3) p.push(`trois longueurs attendues, lues : ${lg.L.size}`);
  if (lg.unites.size !== 1) p.push("unités mélangées");
  const v = calculer(lg.L, T);
  if (v == null) return [...p, "les longueurs données ne permettent pas le calcul"];
  const u = [...lg.unites][0];
  const juste = u === "m" ? v / 100 : v;
  if (Math.abs(juste * 100 - Math.round(juste * 100)) > 1e-6) p.push(`${juste} : plus de deux décimales`);
  if (q.format === "qcm") p.push(...qcmUnique(q, (x) => proche(lireValeur(x)?.v, juste, 1e-6) && lireValeur(x)?.u === u));
  else p.push(...verifierReponse(q, juste, u));
  if (objet && q.canvas) p.push("figure inattendue pour un objet réel");
  return [...p, ...verifierFigure(q, c, { parallele: true, brut: lg.brut, inconnu: T })];
}

// ─── Configuration ──────────────────────────────────────────────────────────

/** Parallélisme donné, ou seulement « on ne sait pas » ? */
function corrigerOuiNon(q: Q): string[] {
  const { c, pb } = lireConfig(q.text);
  if (!c) return pb;
  const manque = /mais (?:on ne sait pas si|rien n'indique que|l'énoncé ne dit rien)/.test(q.text);
  const p = manque ? pb : cadreTheoreme(q).p;
  return [...p, ...qcmUnique(q, (x) => x === (manque ? "non" : "oui")), ...verifierFigure(q, c, { parallele: !manque })];
}

/** Codé sur la figure, ou seulement « à l'air » parallèle ? */
function corrigerCodage(q: Q): string[] {
  const { c, pb } = lireConfig(q.text);
  if (!c) return pb;
  const code = /(?<!n')est codée parallèle|le codage indique/.test(q.text);
  const air = /semble parallèle|aucun codage|aucune droite n'est codée|a l'air parallèle/.test(q.text);
  if (code === air) return [...pb, "codage illisible"];
  return [...pb, ...qcmUnique(q, (x) => x === (code ? "oui" : "non")), ...verifierFigure(q, c, { parallele: code })];
}

/** Les points sont-ils sur deux côtés issus d'un même sommet, la droite parallèle au troisième ? */
function corrigerPosition(q: Q): string[] {
  const { c, pb } = lireConfig(q.text);
  const nonPara = /perpendiculaire|coupe la droite/.test(q.text);
  const ok = !!c && !pb.length && !nonPara && cadreTheoreme(q).p.length === 0;
  const p: string[] = [];
  if (!c && !/\(et non sur/.test(q.text)) p.push("configuration illisible sans raison annoncée");
  if (q.canvas) p.push("figure inattendue : elle placerait toujours bien les points");
  return [...p, ...qcmUnique(q, (x) => x === (ok ? "oui" : "non"))];
}

/** Sommet commun, droite parallèle, côté d'un point, petit triangle, côté associé. */
function corrigerElements(q: Q): string[] {
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  const t = q.text;
  const fin = t.slice(t.lastIndexOf(". ") + 2);
  const lettres = (x: string) => cle(x.replace(/[^A-Z]/g, ""));
  let bon: (x: string) => boolean;
  if (/sommet commun|sommet à la fois/.test(fin)) bon = (x) => x === c.A;
  else if (/droite est parallèle à|est-elle parallèle/.test(fin)) bon = (x) => /^\(/.test(x) && lettres(x) === cle(c.M + c.N);
  else if (/le point ([A-Z])/.test(fin)) {
    const P = fin.match(/le point ([A-Z])/)![1];
    const s = P === c.M ? c.A + c.B : P === c.N ? c.A + c.C : null;
    if (!s) return [...p, `le point ${P} n'est ni ${c.M} ni ${c.N}`];
    bon = (x) => /^\[/.test(x) && lettres(x) === cle(s);
  } else if (/petit triangle de cette|réduction/.test(fin)) bon = (x) => /^[A-Z]{3}$/.test(x) && lettres(x) === cle(c.A + c.M + c.N);
  else if (/correspond au côté|associé à/.test(fin)) bon = (x) => /^\[/.test(x) && lettres(x) === cle(c.M + c.N);
  else return [...p, `question illisible : ${fin}`];
  return [...p, ...qcmUnique(q, bon), ...verifierFigure(q, c, { parallele: true })];
}

// ─── Réciproque ─────────────────────────────────────────────────────────────

/** La configuration de la réciproque : SANS parallélisme donné. */
function cadreReciproque(q: Q): { c: Config | null; p: string[] } {
  const { c, pb } = lireConfig(q.text);
  if (!c) return { c, p: pb.length ? pb : ["configuration illisible"] };
  // L'hypothèse s'arrête là où commencent les mesures, les calculs ou la question.
  const avant = q.text.split(/ [Oo]n (?:veut savoir|a vérifié|a calculé|donne|sait|a mesuré|a )| Les (?:mesures|calculs)|\?/)[0];
  if (/est parallèle à|\/\/|parallèle (?:au|à la|à l')/.test(avant)) return { c, p: [...pb, "le parallélisme est donné : ce n'est plus une réciproque"] };
  return { c, p: pb };
}

/** Les rapports AM/AB et AN/AC sont-ils égaux ? (produit en croix, unités converties) */
function rapportsEgaux(L: Map<Role, number>): boolean | null {
  const [am, ab, an, ac] = (["AM", "AB", "AN", "AC"] as Role[]).map((r) => L.get(r));
  if ([am, ab, an, ac].some((x) => x == null)) return null;
  return proche(am! * ac!, ab! * an!, 1e-6);
}

function corrigerRecipOuiNon(q: Q): string[] {
  const { c, p } = cadreReciproque(q);
  if (!c) return p;
  const lg = longueurs(c, q.text);
  p.push(...lg.pb);
  const eg = rapportsEgaux(lg.L);
  if (eg == null) return [...p, "les quatre longueurs ne sont pas toutes lues"];
  if (/\(([A-Z]{2})\)/.test(q.text)) {
    // La question nomme des droites : ce sont bien (MN) et (BC).
    for (const m of q.text.matchAll(/\(([A-Z]{2})\)/g)) {
      const r = role(c, m[1]);
      if (r !== "MN" && r !== "BC") p.push(`la droite (${m[1]}) n'est pas (${c.M}${c.N}) ni (${c.B}${c.C})`);
    }
  }
  // La question porte sur les rapports qu'elle écrit : ce sont AM/AB et AN/AC.
  for (const m of q.text.matchAll(/\b([A-Z]{2})\/([A-Z]{2})\b/g)) {
    const s = sensRapport([role(c, m[1]), role(c, m[2])]);
    if (!s || s.i === 2) p.push(`le rapport ${m[1]}/${m[2]} n'est pas ${c.A}${c.M}/${c.A}${c.B} ni ${c.A}${c.N}/${c.A}${c.C}`);
  }
  const brut = lg.brut;
  return [...p, ...qcmUnique(q, (x) => x === (eg ? "oui" : "non")), ...verifierFigure(q, c, { parallele: false, brut })];
}

/** Conclure : parallèles ou non (QCM de phrases). */
function phraseParallele(c: Config, eg: boolean) {
  return eg ? `(${c.M}${c.N}) est parallèle à (${c.B}${c.C})` : `(${c.M}${c.N}) n'est pas parallèle à (${c.B}${c.C})`;
}

function corrigerConclureQcm(q: Q): string[] {
  const { c, p } = cadreReciproque(q);
  if (!c) return p;
  const lg = longueurs(c, q.text);
  p.push(...lg.pb);
  const eg = rapportsEgaux(lg.L);
  if (eg == null) return [...p, "les quatre longueurs ne sont pas toutes lues"];
  return [...p, ...qcmUnique(q, (x) => x === phraseParallele(c, eg)), ...verifierFigure(q, c, { parallele: false, brut: lg.brut })];
}

/** Conclure à partir des rapports annoncés (égaux, différents, ou deux valeurs). */
function corrigerConclureAnnonce(q: Q): string[] {
  const { c, p } = cadreReciproque(q);
  if (!c) return p;
  const t = q.text;
  let eg: boolean | null = null;
  const vals = t.match(new RegExp(`([A-Z]{2})/([A-Z]{2}) = ${NB} et ([A-Z]{2})/([A-Z]{2}) = ${NB}`));
  if (vals) eg = proche(num(vals[3]), num(vals[6]));
  else if (/vérifié que [A-Z]{2}\/[A-Z]{2} = /.test(t)) eg = true;
  else if (/vérifié que [A-Z]{2}\/[A-Z]{2} ≠ /.test(t)) eg = false;
  if (eg == null) return [...p, "rapports annoncés illisibles"];
  for (const m of t.matchAll(/\b([A-Z]{2})\/([A-Z]{2})\b/g)) {
    const s = sensRapport([role(c, m[1]), role(c, m[2])]);
    if (!s || s.i === 2 || s.sens !== 1) p.push(`le rapport ${m[1]}/${m[2]} n'est pas un rapport de la réciproque`);
  }
  return [...p, ...qcmUnique(q, (x) => x === phraseParallele(c, eg!)), ...verifierFigure(q, c, { parallele: false, brut: new Map() })];
}

/** Quels rapports comparer, ou la valeur décimale d'un rapport. */
function corrigerRecipRapports(q: Q): string[] {
  const { c, p } = cadreReciproque(q);
  if (!c) return p;
  if (q.format === "qcm") {
    const juste = (x: string) => {
      const [g, d] = x.split(" et ");
      const a = sensRapport(lireRapport(c, g ?? ""));
      const b = sensRapport(lireRapport(c, d ?? ""));
      return !!a && !!b && a.sens === b.sens && cle(`${a.i}${b.i}`) === "01";
    };
    return [...p, ...qcmUnique(q, juste), ...verifierFigure(q, c, { parallele: false, brut: new Map() })];
  }
  const lg = longueurs(c, q.text);
  p.push(...lg.pb);
  const r = q.text.match(/rapport ([A-Z]{2})\/([A-Z]{2})|quotient ([A-Z]{2})\/([A-Z]{2})|Que vaut ([A-Z]{2})\/([A-Z]{2})/);
  if (!r) return [...p, "rapport demandé illisible"];
  const [x, y] = [r[1] ?? r[3] ?? r[5], r[2] ?? r[4] ?? r[6]].map((s) => role(c, s));
  if (!x || !y || !lg.L.has(x) || !lg.L.has(y)) return [...p, "longueurs du rapport illisibles"];
  if (!sensRapport([x, y])) p.push("le rapport demandé n'est pas un rapport de Thalès");
  const v = lg.L.get(x)! / lg.L.get(y)!;
  if (Math.abs(v * 100 - Math.round(v * 100)) > 1e-9) p.push(`${v} : pas une écriture décimale courte`);
  return [...p, ...verifierReponse(q, v, ""), ...verifierFigure(q, c, { parallele: false, brut: lg.brut })];
}

// ─── Rédiger ────────────────────────────────────────────────────────────────

/** « Dans le triangle ABC, M ∈ [AB], N ∈ [AC] et (MN) // (BC). » : la configuration exacte. */
function debutJuste(c: Config, x: string): boolean {
  const m = x.match(/^Dans le triangle ([A-Z]{3}), ([A-Z]) ∈ \[([A-Z]{2})\], ([A-Z]) ∈ \[([A-Z]{2})\] et \(([A-Z]{2})\) \/\/ \(([A-Z]{2})\)\./);
  if (!m || cle(m[1]) !== cle(c.tri)) return false;
  const ok = (P: string, s: string) => (P === c.M && cle(s) === cle(c.A + c.B)) || (P === c.N && cle(s) === cle(c.A + c.C));
  return ok(m[2], m[3]) && ok(m[4], m[5]) && m[2] !== m[4] && role(c, m[6]) === "MN" && role(c, m[7]) === "BC";
}

/** La valeur annoncée après « donc T = v u. » est-elle la bonne ? */
function finJuste(c: Config, x: string, L: Map<Role, number>, u: string): boolean {
  const m = x.match(new RegExp(`^D'après le théorème de Thalès, ([A-Z]{2}/[A-Z]{2} = [A-Z]{2}/[A-Z]{2}), donc ([A-Z]{2}) = ${NB} (cm|m)\\.$`));
  if (!m) return false;
  const e = egaliteThales(c, m[1].replace(/\//g, "/"));
  const T = role(c, m[2]);
  if (!e || !T || m[4] !== u) return false;
  // L'égalité contient la longueur cherchée et, à part elle, des longueurs connues.
  const segs = m[1].split(/ = |\//).map((s) => role(c, s));
  if (!segs.includes(T) || segs.some((s) => s !== T && (!s || !L.has(s)))) return false;
  const v = calculer(L, T);
  return v != null && proche(num(m[3]), u === "m" ? v / 100 : v, 1e-6);
}

function corrigerRedigerQcm(q: Q): string[] {
  const t = q.text;
  const { c, pb } = lireConfig(t);
  if (!c) return pb;
  if (/vérifié que/.test(t)) {
    const p = cadreReciproque(q).p;
    if (!/[A-Z]{2}\/[A-Z]{2} = [A-Z]{2}\/[A-Z]{2}/.test(t)) p.push("l'égalité des rapports n'est pas annoncée");
    const bon = `D'après la réciproque du théorème de Thalès, (${c.M}${c.N}) // (${c.B}${c.C}).`;
    return [...p, ...qcmUnique(q, (x) => x === bon), ...verifierFigure(q, c, { parallele: false })];
  }
  const { p } = cadreTheoreme(q);
  if (/commencer|commence-t-on|première phrase/.test(t)) return [...p, ...qcmUnique(q, (x) => debutJuste(c, x)), ...verifierFigure(q, c, { parallele: true })];
  const lg = longueurs(c, t);
  p.push(...lg.pb);
  const u = [...lg.unites][0];
  const T = Object.entries(((q.canvas as { sideLabels?: Record<string, string> } | undefined)?.sideLabels ?? {})).find(([, v]) => v === "?")?.[0] as Role | undefined;
  return [...p, ...qcmUnique(q, (x) => finJuste(c, x, lg.L, u)), ...verifierFigure(q, c, { parallele: true, brut: lg.brut, inconnu: T ?? null })];
}

/** La rédaction (QCM depuis le 08/10) : début, égalité utile, démonstration complète. */
function corrigerRediger(q: Q): string[] {
  const t = q.text;
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  const lg = longueurs(c, t);
  p.push(...lg.pb);
  const u = [...lg.unites][0];
  const T = role(c, t.match(/(?:trouver|calculer|calcul de|mène à|donne) ([A-Z]{2})\b/)?.[1] ?? "");
  if (!T) return [...p, "longueur cherchée illisible"];
  if (lg.L.has(T)) p.push("la longueur cherchée est déjà donnée");
  let juste: (x: string) => boolean;
  if (/Quel début/.test(t)) {
    juste = (x) => {
      const m = x.match(/^(.*\.) D'après le théorème de Thalès, ([A-Z]{2}\/[A-Z]{2}) = ([A-Z]{2}\/[A-Z]{2}) = ([A-Z]{2}\/[A-Z]{2})\.$/);
      if (!m || !debutJuste(c, m[1])) return false;
      const s = [m[2], m[3], m[4]].map((r) => sensRapport(lireRapport(c, r)));
      return s.every((y) => y && y.sens === s[0]!.sens) && new Set(s.map((y) => y!.i)).size === 3;
    };
  } else if (/égalité de rapports|rapports égaux/.test(t)) {
    juste = (x) => {
      if (!egaliteThales(c, x)) return false;
      const segs = x.split(/ = |\//).map((s) => role(c, s));
      return segs.includes(T) && segs.every((s) => s === T || (!!s && lg.L.has(s)));
    };
  } else {
    juste = (x) => {
      const m = x.match(new RegExp(`^D'après le théorème de Thalès, ([A-Z]{2}/[A-Z]{2} = [A-Z]{2}/[A-Z]{2}), donc ([A-Z]{2}) = ${NB} (cm|m)\\.$`));
      return !!m && role(c, m[2]) === T && finJuste(c, x, lg.L, u);
    };
  }
  return [...p, ...qcmUnique(q, juste), ...aucunLeurreVrai(q, c), ...verifierFigure(q, c, { parallele: true, brut: lg.brut, inconnu: T })];
}

// ─── Défis ──────────────────────────────────────────────────────────────────

/** L'objet réel : la pièce relie M à N, et la réciproque dit si elle est parallèle. */
function corrigerDefiReciproque(q: Q): string[] {
  const { c, p } = cadreReciproque(q);
  if (!c) return p;
  if (!new RegExp(`relie ${c.M} à ${c.N}`).test(q.text)) p.push("la pièce ne relie pas les deux points");
  const lg = longueurs(c, q.text);
  p.push(...lg.pb);
  const eg = rapportsEgaux(lg.L);
  if (eg == null) return [...p, "les quatre longueurs ne sont pas toutes lues"];
  return [...p, ...qcmUnique(q, (x) => x === (eg ? "oui" : "non")), ...verifierFigure(q, c, { parallele: false, brut: lg.brut })];
}

/** Les ombres : hauteurs et ombres proportionnelles (unités converties). */
function corrigerOmbre(q: Q): string[] {
  const t = q.text;
  const ms = [...t.matchAll(new RegExp(`${NB} (cm|m)\\b`, "g"))].map((m) => num(m[1]) * (m[2] === "cm" ? 0.01 : 1));
  if (ms.length !== 3) return [`trois mesures attendues, lues : ${ms.length}`];
  const [h, o, x] = ms;
  const p: string[] = [];
  const petit = t.split(/Au même moment/)[0];
  if (!/de haut|haute? de|plante/.test(petit) || !/ombre/.test(petit)) p.push("hauteur et ombre du petit objet illisibles");
  const ombreDonnee = /Au même moment, l'ombre/.test(t);
  const juste = ombreDonnee ? (h * x) / o : (o * x) / h;
  if (ombreDonnee && !/hauteur|de haut/.test(t.slice(t.lastIndexOf(". ") + 1))) p.push("la question ne demande pas la hauteur");
  if (!ombreDonnee && !/ombre/.test(t.slice(t.lastIndexOf(". ") + 1))) p.push("la question ne demande pas l'ombre");
  const H = ombreDonnee ? juste : x;
  if (H < 2 || H > 60) p.push(`hauteur de ${H} m : invraisemblable`);
  return [...p, ...verifierReponse(q, Math.round(juste * 100) / 100, "m", 1e-6)];
}

/** Le coefficient d'agrandissement (grand ÷ petit) ou de réduction (petit ÷ grand). */
function corrigerCoefficient(q: Q): string[] {
  const t = q.text;
  const { c, p } = cadreTheoreme(q);
  if (!c) return p;
  const lg = longueurs(c, t);
  p.push(...lg.pb);
  const paire = CHAINE.find(([a, b]) => lg.L.has(a) && lg.L.has(b));
  if (!paire || lg.L.size !== 2) return [...p, "deux longueurs correspondantes attendues"];
  const [pt, gd] = paire.map((r) => lg.L.get(r)!);
  let juste: number;
  const mult = t.match(/multiplie-t-on ([A-Z]{2}) pour obtenir ([A-Z]{2})/);
  if (mult) {
    const [x, y] = [role(c, mult[1]), role(c, mult[2])];
    if (!x || !y || !lg.L.has(x) || !lg.L.has(y)) return [...p, "longueurs de la question illisibles"];
    juste = lg.L.get(y)! / lg.L.get(x)!;
  } else if (/réduction/.test(t)) juste = pt / gd;
  else if (/agrandissement|petit triangle à celles du grand/.test(t)) juste = gd / pt;
  else return [...p, "question illisible"];
  if (Math.abs(juste * 100 - Math.round(juste * 100)) > 1e-9) p.push(`${juste} : pas un décimal court`);
  return [...p, ...verifierReponse(q, juste, ""), ...verifierFigure(q, c, { parallele: true, brut: lg.brut })];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  // Configuration
  thales_theoreme_configuration_tpl_1: corrigerOuiNon,
  thales_theoreme_configuration_tpl_2: corrigerCodage,
  thales_theoreme_configuration_tpl_3: corrigerPosition,
  thales_theoreme_configuration_tpl_4: corrigerElements,
  // Rapports
  thales_theoreme_rapport_tpl_1: corrigerCompleter,
  thales_theoreme_rapport_tpl_2: corrigerNombres,
  thales_theoreme_rapport_tpl_3: corrigerEgalite,
  thales_theoreme_rapport_tpl_4: corrigerNombres,
  thales_theoreme_rapport_tpl_5: corrigerIntrus,
  // Calculer une longueur
  thales_theoreme_calculer_longueur_tpl_1: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_2: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_3: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_4: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_5: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_6: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_7: corrigerCalcul,
  thales_theoreme_calculer_longueur_tpl_8: corrigerCalcul,
  // Réciproque : vérifier
  thales_theoreme_reciproque_verifier_tpl_1: corrigerRecipOuiNon,
  thales_theoreme_reciproque_verifier_tpl_2: corrigerRecipOuiNon,
  thales_theoreme_reciproque_verifier_tpl_3: corrigerRecipOuiNon,
  thales_theoreme_reciproque_verifier_tpl_4: corrigerRecipRapports,
  thales_theoreme_reciproque_verifier_tpl_5: corrigerRecipOuiNon,
  // Réciproque : conclure
  thales_theoreme_reciproque_conclure_tpl_1: corrigerRecipOuiNon,
  thales_theoreme_reciproque_conclure_tpl_2: corrigerRecipOuiNon,
  thales_theoreme_reciproque_conclure_tpl_3: corrigerConclureQcm,
  thales_theoreme_reciproque_conclure_tpl_4: corrigerConclureAnnonce,
  // Rédiger
  thales_theoreme_rediger_tpl_1: corrigerRediger,
  thales_theoreme_rediger_tpl_2: corrigerRediger,
  thales_theoreme_rediger_tpl_3: corrigerRediger,
  thales_theoreme_rediger_tpl_4: corrigerRedigerQcm,
  // Défis
  thales_theoreme_defi_tpl_1: corrigerCalcul,
  thales_theoreme_defi_tpl_5: corrigerCalcul,
  thales_theoreme_defi_tpl_2: corrigerDefiReciproque,
  thales_theoreme_defi_tpl_3: corrigerOmbre,
  thales_theoreme_defi_tpl_6: corrigerOmbre,
  thales_theoreme_defi_tpl_4: corrigerCoefficient,
});
