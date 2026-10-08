import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE triangles.bank.ts (notion triangle_figure, 08/10/2026).
// Ils relisent dans le TEXTE les noms des triangles, les longueurs (« KL = 6 km »,
// « [RS] mesure 8 m »), les angles (« 46° en M », « l'angle en R mesure 56° »),
// et dans le CANVAS les lettres, les étiquettes et la FORME (les angles et les
// rapports de longueurs calculés sur les points doivent respecter les codages) ;
// puis ils refont le raisonnement : inégalité triangulaire, somme des angles,
// cas d'égalité, correspondance des sommets, rapport de similitude, définition
// des droites remarquables, étape d'un protocole. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type K = "A" | "B" | "C";
const KS: K[] = ["A", "B", "C"];
const num = (s: string) => Number(String(s).replace(/ /g, "").replace(",", "."));
const NB = "(\\d+(?:,\\d+)?)";
const U = "(cm|m|km)";

/** Les noms de triangles du texte, dans l'ordre (« triangle KLM », « triangles RST et JKL »). */
function nomsTriangles(t: string): string[] {
  const out: string[] = [];
  for (const m of t.matchAll(/triangles? ([A-Z]{3})(?: et ([A-Z]{3}))?|(?:^|[ (,:])([A-Z]{3})(?=,| \(| de côtés| sont| a |, de)/g))
    for (const n of [m[1], m[2], m[3]]) if (n && !out.includes(n)) out.push(n);
  return out;
}

/** Longueur d'un côté écrite « XY = n u », « XY = ZW = n u » ou « [XY] mesure n u » (dans les deux sens). */
function longueur(t: string, x: string, y: string): number | null {
  for (const s of [x + y, y + x]) {
    const m =
      t.match(new RegExp(`(?<![A-Z])${s} = (?:[A-Z]{2} = )?${NB} ${U}`)) ??
      t.match(new RegExp(`(?<![A-Z])[A-Z]{2} = ${s} = ${NB} ${U}`)) ??
      t.match(new RegExp(`\\[${s}\\] mesure ${NB} ${U}`));
    if (m) return num(m[1]);
  }
  return null;
}

/** L'angle en L : « 46° en L », « l'angle en L mesure 46° », « les angles en L et en M mesurent 46° ». */
function angleEn(t: string, L: string): number | null {
  // « les angles en E et en F mesurent 37° et 103° » : respectivement.
  const resp = t.match(new RegExp(`angles en ([A-Z]) et en ([A-Z]) mesurent ${NB}° et ${NB}°`));
  if (resp && (resp[1] === L || resp[2] === L)) return num(resp[1] === L ? resp[3] : resp[4]);
  const m =
    t.match(new RegExp(`${NB}° en ${L}(?![A-Za-z])`)) ??
    t.match(new RegExp(`angle en ${L} (?:mesure|vaut) ${NB}°`)) ??
    t.match(new RegExp(`angles en ${L} et en [A-Z] mesurent (?:tous deux )?${NB}°`)) ??
    t.match(new RegExp(`angles en [A-Z] et en ${L} mesurent (?:tous deux )?${NB}°`)) ??
    t.match(new RegExp(`${NB}° en [A-Z] et en ${L}(?![A-Za-z])`));
  return m ? num(m[1]) : null;
}

/** La réponse attendue « 40° », « 12 cm » : la valeur ET l'unité imposée par l'énoncé. */
function reponse(q: Q, juste: number, unite: string, quoi: string): string[] {
  const m = String(q.expected[0]).match(/^(\d+(?:,\d+)?)\s*(.*)$/);
  const p: string[] = [];
  if (!m || !egal(num(m[1]), juste)) p.push(`attendu « ${q.expected[0]} », ${quoi} : ${juste}`);
  else if (m[2].trim() !== unite) p.push(`unité de la réponse « ${m[2]} » au lieu de « ${unite} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

/* ─── LE CANVAS ────────────────────────────────────────────────────────────── */

/** Les angles (en degrés) calculés sur les points du canvas. */
function anglesFigure(c: any): Record<K, number> {
  const P = c.points;
  const a = (k: K, u: K, v: K) => {
    const x1 = P[u].x - P[k].x, y1 = P[u].y - P[k].y, x2 = P[v].x - P[k].x, y2 = P[v].y - P[k].y;
    return (Math.acos((x1 * x2 + y1 * y2) / Math.hypot(x1, y1) / Math.hypot(x2, y2)) * 180) / Math.PI;
  };
  return { A: a("A", "B", "C"), B: a("B", "A", "C"), C: a("C", "A", "B") };
}
const longueurFigure = (c: any, s: string) => Math.hypot(c.points[s[0]].x - c.points[s[1]].x, c.points[s[0]].y - c.points[s[1]].y);
const etiq = (s: unknown) => {
  const m = String(s ?? "").match(/^(\d+(?:,\d+)?)/);
  return m ? num(m[1]) : null;
};

/**
 * La figure : lettres = celles d'un triangle du texte ; chaque étiquette d'angle
 * ou de côté = la mesure du texte ; et la FORME respecte les étiquettes
 * (angles à 1,5° près, rapports de côtés à 2 % près).
 */
function verifierFigure(q: Q, nom?: string): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  if (c.kind !== "triangle") return ["canvas qui n'est pas un triangle"];
  const p: string[] = [];
  const lab: Record<K, string> = { A: c.labels?.A ?? "A", B: c.labels?.B ?? "B", C: c.labels?.C ?? "C" };
  const lettres = KS.map((k) => lab[k]).sort().join("");
  const noms = nom ? [nom] : nomsTriangles(q.text);
  if (!noms.some((n) => [...n].sort().join("") === lettres)) p.push(`les lettres de la figure (${lettres}) ne sont pas celles du triangle ${noms.join(" / ")}`);
  const fig = anglesFigure(c);
  for (const k of KS) {
    const v = etiq(c.angleLabels?.[k]);
    if (v == null) continue;
    if (Math.abs(fig[k] - v) > 1.5) p.push(`l'angle en ${lab[k]} est étiqueté ${v}° mais dessiné à ${fig[k].toFixed(0)}°`);
    const texte = angleEn(q.text, lab[k]);
    if (texte !== v) p.push(`l'angle en ${lab[k]} vaut ${texte}° dans le texte, ${v}° sur la figure`);
  }
  const cotes = (["AB", "BC", "CA"] as const).map((s) => ({ s, v: etiq(c.sideLabels?.[s]) })).filter((x) => x.v != null);
  for (const { s, v } of cotes) {
    const texte = longueur(q.text, lab[s[0] as K], lab[s[1] as K]);
    if (texte !== v) p.push(`le côté ${lab[s[0] as K]}${lab[s[1] as K]} vaut ${texte} dans le texte, ${v} sur la figure`);
  }
  for (let i = 0; i < cotes.length; i++)
    for (let j = i + 1; j < cotes.length; j++) {
      const r1 = cotes[i].v! / cotes[j].v!;
      const r2 = longueurFigure(c, cotes[i].s) / longueurFigure(c, cotes[j].s);
      if (Math.abs(r1 / r2 - 1) > 0.02) p.push(`les côtés ${cotes[i].s} et ${cotes[j].s} n'ont pas sur la figure le rapport de leurs étiquettes`);
    }
  const P = c.points;
  for (const k of KS) if (P[k].x < 10 || P[k].x > 230 || P[k].y < 25 || P[k].y > 170) p.push(`le point ${lab[k]} sort du cadre`);
  if (c.height) {
    const S = lab[c.height.fromVertex as K];
    const base = KS.filter((k) => k !== c.height.fromVertex).map((k) => lab[k]);
    if (!new RegExp(`^\\((${base.join("")}|${[...base].reverse().join("")})\\)$`).test(c.height.baseLabel ?? ""))
      p.push(`la hauteur issue de ${S} n'a pas pour base la droite (${base.join("")})`);
  }
  return p;
}

/* ─── TRIANGLE_INEGALITE ───────────────────────────────────────────────────── */

/** Les longueurs « n u » du texte. */
const longueurs = (t: string) => [...t.matchAll(new RegExp(`${NB} ${U}(?![a-zé])`, "g"))].map((m) => num(m[1]));

function corrConstructible(q: Q): string[] {
  const l = longueurs(q.text);
  if (l.length !== 3) return [`trois longueurs attendues, lues : ${l.join(", ")}`];
  const max = Math.max(...l);
  const reste = l[0] + l[1] + l[2] - max;
  if (max === reste) return ["triangle plat : ni oui ni non"];
  const juste = max < reste ? "oui, il est constructible" : "non, il est impossible";
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », ${max} et ${reste}`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrEncadrer(q: Q): string[] {
  const n = nomsTriangles(q.text)[0];
  if (!n) return ["triangle sans nom"];
  const [A, B, C] = [...n];
  const ab = longueur(q.text, A, B);
  const ac = longueur(q.text, A, C);
  const u = q.text.match(new RegExp(`${A}${B} = ${NB} ${U}`))?.[2];
  if (ab == null || ac == null || !u) return ["deux côtés attendus"];
  if (!new RegExp(`(?:longueur |pour |situer )${B}${C}(?: \\?| du)`).test(q.text)) return [`la question ne porte pas sur ${B}${C}`];
  const lire = (s: string) => s.match(new RegExp(`^entre ${NB} et ${NB} ${U}$`));
  const juste = (s: string) => {
    const m = lire(s);
    return !!m && egal(num(m[1]), Math.abs(ab - ac)) && egal(num(m[2]), ab + ac) && m[3] === u;
  };
  return [
    ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », il faut entre ${Math.abs(ab - ac)} et ${ab + ac} ${u}`]),
    ...qcmUnique(q, juste),
    ...verifierFigure(q, n),
  ];
}

/* ─── TRIANGLE_SOMME_ANGLE ─────────────────────────────────────────────────── */

const angles = (t: string) => [...t.matchAll(/(\d+)°/g)].map((m) => Number(m[1]));

function corrManquant(q: Q): string[] {
  const n = nomsTriangles(q.text)[0];
  const a = angles(q.text);
  const cible = q.text.match(/(?:mesure de l'angle en|l'angle en) ([A-Z])(?= \?|,| si)/)?.[1];
  if (!n || a.length !== 2 || !cible) return ["deux angles et l'angle demandé attendus"];
  const juste = 180 - a[0] - a[1];
  const p: string[] = [];
  if (juste <= 0) p.push(`angles impossibles : ${a.join(" + ")}`);
  if (!n.includes(cible) || [...n].filter((L) => L !== cible).some((L) => angleEn(q.text, L) == null)) p.push("les angles connus ne sont pas aux deux autres sommets");
  p.push(...reponse(q, juste, "°", "l'angle manquant vaut"));
  const c = q.canvas as any;
  const k = KS.find((x) => c?.labels?.[x] === cible);
  if (!k || c.angleLabels?.[k] !== "?") p.push("la figure ne marque pas « ? » sur l'angle demandé");
  return [...p, ...verifierFigure(q, n)];
}

function corrSommeImpossible(q: Q): string[] {
  const a = angles(q.text);
  if (a.length !== 3) return ["trois angles attendus"];
  const juste = a[0] + a[1] + a[2] === 180 ? "oui, ce triangle peut exister" : "non, c'est impossible";
  if (a.some((x) => x <= 0)) return ["angle nul ou négatif"];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/* ─── TRIANGLE_DROITES ─────────────────────────────────────────────────────── */

/** Le sommet S et les deux autres lettres, dans l'ordre du nom. */
function sommetEtBase(n: string, S: string): [string, string] {
  const b = [...n].filter((L) => L !== S);
  return [b[0], b[1]];
}

function corrHauteur(q: Q): string[] {
  const n = nomsTriangles(q.text)[0];
  if (!n) return ["triangle sans nom"];
  let S = q.text.match(/hauteur issue (?:du sommet |de )([A-Z])/)?.[1];
  const rel = q.text.match(/relative au côté \[([A-Z])([A-Z])\]/);
  if (rel) S = [...n].find((L) => L !== rel[1] && L !== rel[2]);
  if (!S || !n.includes(S)) return ["sommet illisible"];
  const [X, Y] = sommetEtBase(n, S);
  const juste = `du sommet ${S}, perpendiculairement à la droite (${X}${Y})`;
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  const c = q.canvas as any;
  if (!c?.height || c.labels?.[c.height.fromVertex] !== S) p.push(`la figure ne trace pas la hauteur issue de ${S}`);
  return [...p, ...qcmUnique(q, (x) => x === juste), ...verifierFigure(q, n)];
}

function corrDistinguer(q: Q): string[] {
  const n = nomsTriangles(q.text)[0];
  if (!n) return ["triangle sans nom"];
  let juste: string | null = null;
  const h = q.text.match(/la hauteur issue de ([A-Z])/);
  const md = q.text.match(/la médiane issue de ([A-Z])/);
  const mt = q.text.match(/la médiatrice de \[([A-Z])([A-Z])\]/);
  if (h) {
    const [X, Y] = sommetEtBase(n, h[1]);
    juste = `passe par ${h[1]} et est perpendiculaire à la droite (${X}${Y})`;
  } else if (md) {
    const [X, Y] = sommetEtBase(n, md[1]);
    juste = `passe par ${md[1]} et par le milieu de [${X}${Y}]`;
  } else if (mt) juste = `passe par le milieu de [${mt[1]}${mt[2]}] et est perpendiculaire à [${mt[1]}${mt[2]}]`;
  if (!juste) return ["droite demandée illisible"];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (x) => x === juste)];
}

function corrMediatrice(q: Q): string[] {
  const t = q.text;
  const m = t.match(new RegExp(`O([A-Z]) = ${NB} ${U}`)) ?? t.match(new RegExp(`à ${NB} ${U} de ([A-Z])`));
  if (!m) return ["distance donnée illisible"];
  const [P, d, u] = m[0].startsWith("O") ? [m[1], num(m[2]), m[3]] : [m[3], num(m[1]), m[2]];
  const Qd = t.match(/(?:mesure|vaut|distance) O([A-Z]) \?/)?.[1];
  if (!Qd || Qd === P) return ["distance demandée illisible"];
  const seg = t.match(/médiatrice du segment \[([A-Z])([A-Z])\]/);
  const p: string[] = [];
  if (seg) {
    if (![seg[1], seg[2]].includes(P) || ![seg[1], seg[2]].includes(Qd)) p.push(`${P} et ${Qd} ne sont pas les extrémités de [${seg[1]}${seg[2]}]`);
  } else {
    const n = nomsTriangles(t)[0] ?? t.match(/trois [^.]*? ([A-Z]), ([A-Z]) et ([A-Z])/)?.slice(1).join("");
    if (!n || !n.includes(P) || !n.includes(Qd)) p.push("les points ne sont pas les sommets du triangle");
    if (!/cercle circonscrit|médiatrices|égale distance/.test(t)) p.push("rien ne dit que O est à égale distance des sommets");
  }
  return [...p, ...reponse(q, d, u, `O${Qd} = O${P}`)];
}

/* ─── TRIANGLE_EGALITE et TRIANGLE_CONSTRUIRE ─────────────────────────────── */

/**
 * Les données d'UN triangle (lettres du nom) : quels côtés et quels angles sont
 * connus. Puis la règle des trois cas d'égalité.
 */
function donneesConnues(t: string, n: string) {
  const [A, B, C] = [...n];
  const cotes = ([[A, B], [B, C], [A, C]] as [string, string][]).filter(([x, y]) => longueur(t, x, y) != null);
  const angs = [A, B, C].filter((L) => angleEn(t, L) != null || new RegExp(`angle de \\d+° en ${L}(?![A-Za-z])`).test(t));
  return { cotes, angs };
}
function casEgalite(d: { cotes: [string, string][]; angs: string[] }): boolean {
  if (d.cotes.length === 3) return true;
  if (d.cotes.length === 2) {
    const commun = d.cotes[0].find((x) => d.cotes[1].includes(x))!;
    return d.angs.includes(commun);
  }
  if (d.cotes.length === 1) return d.cotes[0].every((x) => d.angs.includes(x)) || d.angs.length === 3;
  return false;
}

function corrReconnaitreCas(q: Q): string[] {
  const noms = nomsTriangles(q.text);
  if (noms.length < 2) return ["deux triangles attendus"];
  const d = donneesConnues(q.text, noms[0]);
  const d2 = donneesConnues(q.text, noms[1]);
  const p: string[] = [];
  if (d.cotes.length !== d2.cotes.length || d.angs.length !== d2.angs.length) p.push("les deux triangles n'ont pas les mêmes données");
  const juste = casEgalite(d) ? "oui : c'est un cas d'égalité" : "non : ils sont seulement semblables";
  if (!casEgalite(d) && !(d.cotes.length === 0 && d.angs.length === 3)) p.push("ni cas d'égalité ni triangles semblables : la réponse « semblables » serait fausse");
  const a = d.angs.map((L) => angleEn(q.text, L)!);
  if (a.length === 3 && a[0] + a[1] + a[2] !== 180) p.push(`angles de somme ${a[0] + a[1] + a[2]}°`);
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  return [...p, ...qcmUnique(q, (c) => c === juste), ...verifierFigure(q, noms[0])];
}

function corrDeduire(q: Q): string[] {
  const t = q.text;
  const noms = nomsTriangles(t);
  if (noms.length < 2) return ["deux triangles attendus"];
  if (!/dans l'ordre des lettres|correspond à/.test(t)) return ["la correspondance des sommets n'est pas dite"];
  // Le premier nommé dans « Dans XYZ, … » porte les données.
  const src = t.match(/[Dd]ans (?:le triangle )?([A-Z]{3}),/)?.[1];
  if (!src) return ["triangle des données illisible"];
  const dst = noms.find((n) => n !== src)!;
  const vers = (L: string) => src[dst.indexOf(L)];
  const qCote = t.match(/(?:mesure|mesure de) \[([A-Z])([A-Z])\](?: \?|\.)/);
  const qAng = t.match(/(?:mesure|mesure de) l'angle en ([A-Z])(?: \?|\.)/);
  let juste: number | null = null;
  let unite = "";
  if (qCote) {
    if (!dst.includes(qCote[1]) || !dst.includes(qCote[2])) return ["le côté demandé n'est pas du second triangle"];
    juste = longueur(t, vers(qCote[1]), vers(qCote[2]));
    unite = "longueur";
  } else if (qAng) {
    if (!dst.includes(qAng[1])) return ["l'angle demandé n'est pas du second triangle"];
    juste = angleEn(t, vers(qAng[1]));
    unite = "angle";
  }
  if (juste == null) return [`la donnée correspondante n'est pas dans le texte (${unite || "question illisible"})`];
  const p: string[] = [];
  // Le triangle des données doit EXISTER : un angle hors des deux côtés donnés exige
  // que le côté opposé atteigne la demi-droite.
  const d = donneesConnues(t, src);
  if (d.cotes.length === 2 && d.angs.length === 1) {
    const V = d.angs[0];
    const commun = d.cotes[0].find((x) => d.cotes[1].includes(x));
    if (V !== commun) {
      const adj = d.cotes.find((c) => c.includes(V))!;
      const opp = d.cotes.find((c) => !c.includes(V))!;
      const la = longueur(t, adj[0], adj[1])!;
      const lo = longueur(t, opp[0], opp[1])!;
      if (lo <= la * Math.sin(((angleEn(t, V) ?? 0) * Math.PI) / 180)) p.push("triangle impossible : le côté opposé à l'angle est trop court");
    }
  }
  const u = unite === "angle" ? "°" : (t.match(new RegExp(`${NB} ${U}`))?.[2] ?? "");
  p.push(...reponse(q, juste, u, "la mesure correspondante vaut"));
  return p;
}

function corrProtocole(q: Q): string[] {
  const t = q.text;
  const n = nomsTriangles(t)[0];
  if (!n) return ["triangle sans nom"];
  const [A, B, C] = [...n];
  let juste: (s: string) => boolean;
  if (/Par quoi commence le protocole/.test(t)) {
    juste = (s) => {
      const m = s.match(/^tracer \[([A-Z])([A-Z])\] de (\d+) cm$/);
      return !!m && longueur(t, m[1], m[2]) === Number(m[3]);
    };
  } else if (/Comment place-t-on/.test(t)) {
    juste = (s) => {
      const m = s.match(/^avec le cercle de centre ([A-Z]) et de rayon (\d+) cm et le cercle de centre ([A-Z]) et de rayon (\d+) cm$/);
      return !!m && m[1] !== m[3] && [A, B].includes(m[1]) && [A, B].includes(m[3]) && longueur(t, m[1], C) === Number(m[2]) && longueur(t, m[3], C) === Number(m[4]);
    };
  } else if (/Quelle est l'étape suivante/.test(t)) {
    const ang = t.match(/un angle de (\d+)° en ([A-Z])/);
    if (!ang) return ["angle illisible"];
    juste = (s) => s === `tracer au rapporteur une demi-droite d'origine ${ang[2]} qui fait ${ang[1]}° avec [${A}${B}]`;
  } else if (/Comment obtient-on/.test(t)) {
    const a1 = t.match(/un angle de (\d+)° en ([A-Z]) et un angle de (\d+)° en ([A-Z])/);
    if (!a1) return ["angles illisibles"];
    juste = (s) => {
      const m = s.match(/^on trace un angle de (\d+)° en ([A-Z]) et un angle de (\d+)° en ([A-Z]) : ([A-Z]) est là où leurs côtés se coupent$/);
      if (!m || m[5] !== C) return false;
      const lu: Record<string, string> = { [m[2]]: m[1], [m[4]]: m[3] };
      return lu[a1[2]] === a1[1] && lu[a1[4]] === a1[3];
    };
  } else return ["étape demandée illisible"];
  // Le protocole doit décrire un triangle qui existe.
  const p: string[] = [];
  const ab = longueur(t, A, B), ac = longueur(t, A, C), bc = longueur(t, B, C);
  if (ab && ac && bc && Math.max(ab, ac, bc) * 2 >= ab + ac + bc) p.push("trois longueurs qui ne ferment pas un triangle");
  const somme = (t.match(/(\d+)° en/g) ?? []).map((x) => parseInt(x)).reduce((s, x) => s + x, 0);
  if (somme >= 180) p.push("angles de somme ≥ 180°");
  return [...p, ...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} » : faux`]), ...qcmUnique(q, juste)];
}

function corrSuffisantes(q: Q): string[] {
  const n = nomsTriangles(q.text)[0];
  if (!n) return ["triangle sans nom"];
  const d = donneesConnues(q.text, n);
  const unique = casEgalite(d) && !(d.cotes.length === 0);
  const juste = unique ? "oui : le triangle obtenu est toujours le même" : "non : plusieurs triangles différents conviennent";
  const p: string[] = [];
  const a = (q.text.match(/(\d+)° en/g) ?? []).map((x) => parseInt(x));
  if (a.length === 3 && a[0] + a[1] + a[2] !== 180) p.push("trois angles de somme ≠ 180°");
  if (a.length === 2 && a[0] + a[1] >= 180) p.push("deux angles de somme ≥ 180°");
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

/* ─── TRIANGLE_SEMBLABLE ───────────────────────────────────────────────────── */

function corrSemblables(q: Q): string[] {
  const triples = [...q.text.matchAll(new RegExp(`${NB} cm, ${NB} cm et ${NB} cm`, "g"))].map((m) => [m[1], m[2], m[3]].map(num).sort((a, b) => a - b));
  if (triples.length !== 2) return ["deux triplets de côtés attendus"];
  const [s, g] = triples;
  const p: string[] = [];
  for (const x of triples) if (x[2] >= x[0] + x[1]) p.push(`${x.join(", ")} ne ferme pas un triangle`);
  const r = g[0] / s[0];
  const memeRapport = g.every((v, i) => egal(v / s[i], r));
  const juste = memeRapport
    ? egal(r, 1)
      ? "ils sont égaux"
      : "ils sont semblables, mais pas égaux"
    : "ils ne sont pas semblables : les côtés n'ont pas été multipliés par un même nombre";
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

function corrCoteManquant(q: Q): string[] {
  const t = q.text;
  const noms = nomsTriangles(t);
  if (noms.length < 2) return ["deux triangles attendus"];
  if (!/dans l'ordre des lettres|correspond à/.test(t)) return ["la correspondance des sommets n'est pas dite"];
  const [t1, t2] = noms;
  const cible = t.match(/(?:calcule|mesure) ([A-Z]{2})(?:\.| \?)/)?.[1];
  if (!cible) return ["côté demandé illisible"];
  // Le triangle du côté demandé, et son homologue.
  const [ici, la] = t1.includes(cible[0]) && t1.includes(cible[1]) ? [t1, t2] : [t2, t1];
  const hom = (s: string) => s.split("").map((L) => la[ici.indexOf(L)]).join("");
  // Un couple de côtés homologues connus des deux côtés donne le rapport.
  let r: number | null = null;
  for (const [x, y] of [[0, 1], [1, 2], [0, 2]]) {
    const s = ici[x] + ici[y];
    const a = longueur(t, s[0], s[1]);
    const b = longueur(t, hom(s)[0], hom(s)[1]);
    if (a != null && b != null) r = a / b;
  }
  const connu = longueur(t, hom(cible)[0], hom(cible)[1]);
  if (r == null || connu == null) return ["rapport ou côté homologue introuvable"];
  const juste = connu * r;
  const p: string[] = [];
  p.push(...reponse(q, juste, "cm", "le côté homologue × le rapport donne"));
  if (!Number.isInteger(juste * 100)) p.push(`${juste} : plus de deux décimales`);
  // « Le triangle G est un agrandissement du triangle P » : les côtés de G sont plus longs.
  const ag = t.match(/triangle ([A-Z]{3}) est un agrandissement du triangle ([A-Z]{3})/);
  if (ag) {
    const lg = longueur(t, ag[1][0], ag[1][1]);
    const lp = longueur(t, ag[2][0], ag[2][1]);
    if (lg != null && lp != null && lg <= lp) p.push("l'« agrandissement » n'est pas plus grand");
  }
  return [...p, ...verifierFigure(q)];
}

/* ─── TRIANGLE_DEFI ───────────────────────────────────────────────────────── */

function corrEgauxOuSemblables(q: Q): string[] {
  const noms = nomsTriangles(q.text);
  if (noms.length < 2) return ["deux triangles attendus"];
  const d = donneesConnues(q.text, noms[0]);
  const a = d.angs.map((L) => angleEn(q.text, L)!);
  const p: string[] = [];
  if (a.reduce((s, x) => s + x, 0) >= 180) p.push("angles de somme ≥ 180°");
  const juste = casEgalite(d) ? "égaux : un côté et ses deux angles suffisent" : "semblables seulement : la taille n'est pas fixée";
  if (d.angs.length !== 2) p.push("deux angles attendus");
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

function corrDefiImpossible(q: Q): string[] {
  const a = angles(q.text);
  const l = longueurs(q.text);
  let juste: string;
  if (a.length === 3 && l.length === 0) juste = a[0] + a[1] + a[2] === 180 ? "possible" : "impossible : la somme des angles ne fait pas 180°";
  else if (l.length === 3 && a.length === 0) {
    const max = Math.max(...l);
    const reste = l[0] + l[1] + l[2] - max;
    if (max === reste) return ["triangle plat"];
    juste = max < reste ? "possible" : "impossible : un côté dépasse la somme des deux autres";
  } else return ["trois angles OU trois côtés attendus"];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

function corrDemontrer(q: Q): string[] {
  const t = q.text;
  const noms = nomsTriangles(t);
  const n = noms[0];
  if (!n) return ["triangle sans nom"];
  const d = donneesConnues(t, n);
  const p: string[] = [];
  let juste: string | null = null;
  if (/n'existe pas/.test(t)) {
    const l = longueurs(t);
    const max = Math.max(...l);
    if (l.length !== 3 || max <= l[0] + l[1] + l[2] - max) p.push("le triangle annoncé existe pourtant");
    juste = "l'inégalité triangulaire";
  } else if (/que l'angle en ([A-Z]) mesure (\d+)°/.test(t)) {
    const a = angles(t);
    if (a.length !== 3 || a[0] + a[1] + a[2] !== 180) p.push("l'angle à prouver est faux");
    juste = "la somme des angles d'un triangle";
  } else if (/agrandissement ou une réduction/.test(t)) {
    juste = "la définition des triangles semblables";
  } else if (/sont égaux/.test(t)) {
    if (d.cotes.length === 3) juste = "le cas d'égalité « les trois côtés »";
    else if (d.cotes.length === 2 && casEgalite(d)) juste = "le cas d'égalité « deux côtés et l'angle compris »";
  }
  if (!juste) return ["but illisible"];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », juste : « ${juste} »`);
  return [...p, ...qcmUnique(q, (c) => c === juste)];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_triangle_inegalite_tpl_1_constructible": corrConstructible,
  "4e_triangle_inegalite_tpl_2_troisieme_cote": corrEncadrer,
  "4e_triangle_somme_angle_tpl_1_manquant": corrManquant,
  "4e_triangle_somme_angle_tpl_2_impossible": corrSommeImpossible,
  "4e_triangle_droites_tpl_1_hauteur": corrHauteur,
  "4e_triangle_droites_tpl_2_distinguer": corrDistinguer,
  "4e_triangle_droites_tpl_3_mediatrice_distance": corrMediatrice,
  "4e_triangle_egalite_tpl_1_reconnaitre_cas": corrReconnaitreCas,
  "4e_triangle_egalite_tpl_2_deduire": corrDeduire,
  "4e_triangle_construire_tpl_1_protocole": corrProtocole,
  "4e_triangle_construire_tpl_2_donnees_suffisantes": corrSuffisantes,
  "4e_triangle_semblable_tpl_1_reconnaitre": corrSemblables,
  "4e_triangle_semblable_tpl_2_cote_manquant": corrCoteManquant,
  "4e_triangle_defi_tpl_1_egaux_ou_semblables": corrEgauxOuSemblables,
  "4e_triangle_defi_tpl_2_impossible": corrDefiImpossible,
  "4e_triangle_defi_tpl_3_demontrer": corrDemontrer,
});
