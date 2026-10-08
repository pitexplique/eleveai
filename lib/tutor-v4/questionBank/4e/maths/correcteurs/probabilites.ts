import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE probabilites.bank.ts — 4e, notion proba_experience
// (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// Chacun relit l'EXPÉRIENCE décrite dans le texte que voit l'élève — un
// univers numéroté (« numérotés de 1 à 20 », « qui compte 31 jours »), un sac
// et sa composition (« 3 billes rouges et 5 billes bleues »), un mot (une
// lettre par carte), une roue (secteurs égaux comptés, ou angles) —, relit
// l'ÉVÉNEMENT entre guillemets ou après « la probabilité de », RECOMPTE les
// issues favorables, et refait le raisonnement : issue possible, certain /
// impossible, contraire, équiprobabilité (penalty, punaise, météo, pièce
// lestée : NON équiprobables, décision de Frédéric), P(A) en fraction,
// décimal ou pourcentage, comparaison. Le dessin (billes, roue, dé, tableau)
// doit dire la même chose que le texte. Vide = juste.

type Q = TutorGeneratedQuestionV4;

// ─── Nombres ───────────────────────────────────────────────────────────────

const NB = String.raw`\d+(?:,\d+)?`;
const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-9;
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));

/** « 3/8 », « 0,375 », « 37,5 % », « 7 » → valeur (le pourcentage ramené sur 1). */
function valeur(s: string): number | null {
  const t = String(s).trim();
  let m = t.match(/^(\d+)\/(\d+)$/);
  if (m) return Number(m[2]) ? Number(m[1]) / Number(m[2]) : null;
  m = t.match(new RegExp(`^(${NB}) ?%$`));
  if (m) return num(m[1]) / 100;
  m = t.match(new RegExp(`^${NB}$`));
  return m ? num(t) : null;
}
const estFraction = (s: string) => /^\d+\/\d+$/.test(String(s).trim());
const irreductible = (s: string) => {
  const m = String(s).trim().match(/^(\d+)\/(\d+)$/);
  return !!m && pgcd(Number(m[1]), Number(m[2])) === 1 && m[2] !== "1";
};

/** Exactement une proposition juste, et c'est l'attendue. */
function qcmUnique(q: Q, juste: (c: string) => boolean): string[] {
  if (q.format !== "qcm") return ["QCM attendu"];
  const js = (q.choices ?? []).filter((c) => juste(c.trim()));
  if (js.length !== 1) return [`${js.length} proposition(s) juste(s) au lieu d'une : ${js.join(" | ")}`];
  if (js[0] !== q.expected[0]) return [`la proposition juste « ${js[0]} » n'est pas l'attendue « ${q.expected[0]} »`];
  return [];
}
const ouiNon = (q: Q, oui: boolean) => qcmUnique(q, (c) => c === (oui ? "oui" : "non"));

/** Réponse courte : toutes les écritures acceptées valent v ; formes exigées par la consigne. */
function reponse(q: Q, v: number | null, quoi: string): string[] {
  if (v == null || !Number.isFinite(v)) return [`calcul impossible à refaire (${quoi})`];
  if (q.format === "qcm") return ["QCM inattendu pour une réponse courte"];
  const p: string[] = [];
  const pct = /pourcentage/.test(q.text);
  for (const e of q.expected.map(String)) {
    const x = pct && !/%/.test(e) ? (valeur(e) ?? NaN) / 100 : valeur(e);
    if (!egal(x, v)) p.push(`attendu « ${e} », le texte donne ${v} (${quoi})`);
  }
  const e0 = String(q.expected[0]);
  if (/irréductible/.test(q.text)) {
    if (!irreductible(e0)) p.push(`fraction irréductible demandée, attendu « ${e0} »`);
    if (q.expected.length !== 1) p.push("fraction irréductible demandée, mais d'autres écritures sont acceptées");
  } else if (/fraction/.test(q.text) && !estFraction(e0)) p.push(`fraction demandée, attendu « ${e0} »`);
  if (pct && !/%$/.test(e0)) p.push(`pourcentage demandé, attendu « ${e0} »`);
  if (/décima/.test(q.text) && (estFraction(e0) || /%/.test(e0))) p.push(`écriture décimale demandée, attendu « ${e0} »`);
  return p;
}

// ─── L'expérience ──────────────────────────────────────────────────────────

type Issue = { v: string | number; w: number };
type Univers =
  | { kind: "num"; n: number }
  | { kind: "sac"; groupes: { cle: string; n: number }[] }
  | { kind: "mot"; mot: string }
  | { kind: "roue"; secteurs: { cle: string; w: number }[] };

/** « billes rouges » et « une bille rouge » ont la même clé ; « l'orange » aussi. */
const cle = (s: string) =>
  s.toLowerCase().replace(/’/g, "'").trim().split(/\s+/).map((w) => w.replace(/[sx]$/, "")).join(" ");

/** Une liste « 3 billes rouges, une bille verte et 5 billes bleues » → groupes ; null sinon. */
function liste(seg: string): { cle: string; n: number }[] | null {
  const items = seg.split(/, | et /);
  if (items.length < 2) return null;
  const out: { cle: string; n: number }[] = [];
  for (const it of items) {
    const m = it.trim().match(/^(\d+|un|une) (.+)$/);
    if (!m) return null;
    out.push({ cle: cle(m[2]), n: /^\d+$/.test(m[1]) ? Number(m[1]) : 1 });
  }
  return out;
}

/** L'expérience décrite dans un passage de texte (hors guillemets). */
function lireUnivers(t0: string): Univers | null {
  const t = t0.replace(/«[^»]*»/g, "«»");
  let m: RegExpMatchArray | null;
  if ((m = t.match(/du mot ([A-ZÉ]{2,})/))) return { kind: "mot", mot: m[1] };
  if ((m = t.match(/numérot\S* de 1 à (\d+)|les nombres de 1 à (\d+)|qui compte (\d+) jours/))) return { kind: "num", n: Number(m[1] ?? m[2] ?? m[3]) };
  if ((m = t.match(/partagée en (\d+) secteurs égaux, de couleurs ([^.]+)\./))) {
    const cs = m[2].split(/, | et /).map((c) => ({ cle: cle(c), w: 1 }));
    return cs.length === Number(m[1]) ? { kind: "roue", secteurs: cs } : null;
  }
  if ((m = t.match(/partagée en (\d+) secteurs égaux : ([^.]+)\./))) {
    const cs: { cle: string; w: number }[] = [];
    for (const it of m[2].split(/, | et /)) {
      const x = it.match(/^(\d+) secteurs? (\S+)$/);
      if (!x) return null;
      for (let k = 0; k < Number(x[1]); k++) cs.push({ cle: cle(x[2]), w: 1 });
    }
    return cs.length === Number(m[1]) ? { kind: "roue", secteurs: cs } : null;
  }
  if ((m = t.match(/partagée en (\d+) secteurs : (un secteur [^.]+°)\./))) {
    const cs = [...m[2].matchAll(/un secteur (\S+) de (\d+)°/g)].map((x) => ({ cle: cle(x[1]), w: Number(x[2]) }));
    return cs.length === Number(m[1]) ? { kind: "roue", secteurs: cs } : null;
  }
  if ((m = t.match(/partagée en 3 secteurs de même taille : un (\S+), un (\S+) et un (\S+)\./)))
    return { kind: "roue", secteurs: [m[1], m[2], m[3]].map((c) => ({ cle: cle(c), w: 1 })) };
  if ((m = t.match(/partagée en 3 secteurs : (?:le |l')(\S+) occupe la moitié de la roue, (?:le |l')(\S+) et (?:le |l')(\S+) un quart chacun/)))
    return { kind: "roue", secteurs: [{ cle: cle(m[1]), w: 2 }, { cle: cle(m[2]), w: 1 }, { cle: cle(m[3]), w: 1 }] };
  for (const x of t.matchAll(/(?:contient|compte|il y a) ([^.]+)\./g)) {
    const g = liste(x[1]);
    if (g) return { kind: "sac", groupes: g };
  }
  return null;
}

const VOYELLES = "AEIOUY";
function issuesDe(u: Univers): Issue[] {
  if (u.kind === "num") return Array.from({ length: u.n }, (_, i) => ({ v: i + 1, w: 1 }));
  if (u.kind === "mot") return u.mot.split("").map((L) => ({ v: L, w: 1 }));
  if (u.kind === "roue") return u.secteurs.map((s) => ({ v: s.cle, w: s.w }));
  return u.groupes.flatMap((g) => Array.from({ length: g.n }, () => ({ v: g.cle, w: 1 })));
}

const premier = (k: number) => {
  if (k < 2) return false;
  for (let d = 2; d * d <= k; d++) if (k % d === 0) return false;
  return true;
};

/** Un événement sur un univers numéroté : la condition lue, ou null. */
function predNum(s: string): ((k: number) => boolean) | null {
  let m: RegExpMatchArray | null;
  if ((m = s.match(/strictement inférieur à (\d+) ou strictement supérieur à (\d+)/))) { const [a, b] = [+m[1], +m[2]]; return (k) => k < a || k > b; }
  if ((m = s.match(/compris entre (\d+) et (\d+)/))) { const [a, b] = [+m[1], +m[2]]; return (k) => k >= a && k <= b; }
  if (/nombre impair/.test(s)) return (k) => k % 2 === 1;
  if (/nombre pair/.test(s)) return (k) => k % 2 === 0;
  if (/qui n'est pas premier/.test(s)) return (k) => !premier(k);
  if (/nombre premier/.test(s)) return premier;
  if ((m = s.match(/strictement supérieur à (\d+)/))) { const a = +m[1]; return (k) => k > a; }
  if ((m = s.match(/supérieur ou égal à (\d+)/))) { const a = +m[1]; return (k) => k >= a; }
  if ((m = s.match(/inférieur ou égal à (\d+)/))) { const a = +m[1]; return (k) => k <= a; }
  if ((m = s.match(/strictement inférieur à (\d+)/))) { const a = +m[1]; return (k) => k < a; }
  if ((m = s.match(/qui n'est pas un multiple de (\d+)/))) { const a = +m[1]; return (k) => k % a !== 0; }
  if ((m = s.match(/multiple de (\d+)/))) { const a = +m[1]; return (k) => k % a === 0; }
  if (/à deux chiffres/.test(s)) return (k) => k >= 10 && k <= 99;
  if (/à un seul chiffre/.test(s)) return (k) => k <= 9;
  if (/à trois chiffres/.test(s)) return (k) => k >= 100 && k <= 999;
  if ((m = s.match(/qui ne se termine pas par (\d)/))) { const a = +m[1]; return (k) => k % 10 !== a; }
  if ((m = s.match(/qui se termine par (\d)/))) { const a = +m[1]; return (k) => k % 10 === a; }
  if ((m = s.match(/qui n'est pas un diviseur de (\d+)/))) { const a = +m[1]; return (k) => a % k !== 0; }
  if ((m = s.match(/diviseur de (\d+)/))) { const a = +m[1]; return (k) => a % k === 0; }
  if (/nombre entier|strictement positif/.test(s)) return () => true;
  if (/nombre négatif|décimal non entier/.test(s)) return () => false;
  if ((m = s.match(/le nombre (\d+)$/))) { const a = +m[1]; return (k) => k === a; }
  if ((m = s.match(/(?:^obtenir|secteur|numéro|dossard) (\d+)$/) ?? s.match(/^choisir le (\d+)(?:er)? \S+$/))) { const a = +m[1]; return (k) => k === a; }
  return null;
}

const VERBES = /^(?:tirer|piocher|prendre|attraper|sortir|tomber sur|désigner|choisir|semer|obtenir) /;

/** L'événement relu sur l'univers : vrai/faux pour une issue ; null si illisible. */
function lireEvenement(E0: string, u: Univers): ((v: string | number) => boolean) | null {
  let s = E0.trim().replace(/’/g, "'");
  s = s.charAt(0).toLowerCase() + s.slice(1);
  let neg = false;
  if (/^ne pas /.test(s)) (neg = true), (s = s.slice(7));
  let f: ((v: string | number) => boolean) | null = null;
  if (u.kind === "mot") {
    let m: RegExpMatchArray | null;
    if (/une voyelle ou une consonne|une lettre du mot/.test(s)) f = () => true;
    else if (/une voyelle/.test(s)) f = (v) => VOYELLES.includes(String(v));
    else if (/une consonne/.test(s)) f = (v) => !VOYELLES.includes(String(v));
    else if ((m = s.match(/la lettre ([A-Z])$/))) { const L = m[1]; f = (v) => v === L; }
  } else if (u.kind === "roue") {
    const m = s.match(/^obtenir (?:le |l')(\S+)$/);
    if (m) { const c = cle(m[1]); f = (v) => v === c; }
  } else if (u.kind === "sac") {
    const cles = s.split(/ ou /).map((p) => cle(p.replace(VERBES, "").replace(/^(?:un |une |de |d')/, "")));
    if (cles.every((c) => c.length > 2)) f = (v) => cles.includes(String(v));
  } else {
    const p = predNum(s);
    if (p) f = (v) => p(Number(v));
  }
  if (!f) return null;
  const g = f;
  return neg ? (v) => !g(v) : g;
}

/** Cas favorables et possibles (pondérés par la place sur une roue à angles). */
function compter(E: string, u: Univers): { fav: number; tot: number; favs: Issue[] } | null {
  const f = lireEvenement(E, u);
  if (!f) return null;
  const is = issuesDe(u);
  const favs = is.filter((i) => f(i.v));
  return { fav: favs.reduce((a, i) => a + i.w, 0), tot: is.reduce((a, i) => a + i.w, 0), favs };
}

const guillemets = (t: string) => [...t.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);

/** L'événement dont on demande la probabilité : « l'événement « E » », ou « la probabilité de E ? ». */
function evenementDemande(t: string): string | null {
  const g = t.match(/(?:l'événement|On note A l'événement) « ([^»]+) »/g);
  if (g) return g[g.length - 1].replace(/^.*« /, "").replace(/ »$/, "");
  const all = [...t.matchAll(/probabilité (?:de |d')(.+?)(?: \?|\.(?= |$))/g)];
  return all.length ? all[all.length - 1][1] : null;
}

/** Le dessin dit-il la même chose que le texte ? */
function verifierCanvas(q: Q, u: Univers | null): string[] {
  const cv = q.canvas as any;
  if (!cv || !u) return [];
  const p: string[] = [];
  const multiset = (xs: number[]) => [...xs].sort((a, b) => a - b).join(",");
  if (cv.variant === "billes") {
    if (u.kind !== "sac") return ["sac dessiné pour une expérience qui n'est pas un tirage d'objets"];
    const m = new Map<string, number>();
    for (const el of cv.billes?.elements ?? []) m.set(el.couleur, (m.get(el.couleur) ?? 0) + 1);
    if (multiset([...m.values()]) !== multiset(u.groupes.map((g) => g.n))) p.push(`le dessin (${[...m.values()]}) ne montre pas la composition (${u.groupes.map((g) => g.n)})`);
  }
  if (cv.variant === "de" && !(u.kind === "num" && u.n === 6)) p.push("dé à 6 faces dessiné pour une autre expérience");
  if (cv.variant === "roue") {
    const segs: { label: string; poids: number }[] = cv.roue?.segments ?? [];
    if (u.kind === "num") {
      if (segs.length !== u.n || segs.some((s, i) => s.label !== String(i + 1))) p.push("roue dessinée sans les bons numéros");
    } else if (u.kind === "roue") {
      const agg = (xs: { cle: string; w: number }[]) => {
        const m = new Map<string, number>();
        for (const x of xs) m.set(x.cle, (m.get(x.cle) ?? 0) + x.w);
        return [...m].sort().join(";");
      };
      if (agg(segs.map((s) => ({ cle: cle(s.label), w: s.poids }))) !== agg(u.secteurs)) p.push("la roue dessinée ne correspond pas au texte");
    } else p.push("roue dessinée pour une autre expérience");
  }
  return p;
}

/** Univers lu + dessin cohérent ; sinon le problème. */
function experience(q: Q): { u: Univers; pb: string[] } | { u: null; pb: string[] } {
  const u = lireUnivers(q.text);
  if (!u) return { u: null, pb: ["expérience illisible"] };
  const pb = verifierCanvas(q, u);
  if (u.kind === "sac" && u.groupes.some((g) => g.n < 1)) pb.push("une catégorie vide dans la composition");
  return { u, pb };
}

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const nature = (c: { fav: number; tot: number }) => (c.fav === 0 ? "impossible" : c.fav === c.tot ? "certain" : "possible");

// ─── proba_vocabulaire ─────────────────────────────────────────────────────

/** Expérience aléatoire ou non : le hasard intervient-il dans l'action ? */
function cAleatoire(q: Q): string[] {
  const s = guillemets(q.text)[0];
  if (!s) return ["action illisible"];
  const alea = /hasard|aléatoire|sans regarder|au sort|yeux fermés|(?:^|\s)(?:tir|pioch|lanc|tourn|attrap)/i.test(s);
  const oui = /toujours le même résultat/.test(q.text) ? !alea : alea;
  return ouiNon(q, oui);
}

/** Le résultat proposé fait-il partie des issues ? */
function cIssuePossible(q: Q): string[] {
  const { u, pb } = experience(q);
  const R = guillemets(q.text).pop();
  if (!u || !R) return [...pb, "résultat illisible"];
  let m: RegExpMatchArray | null;
  let ok: boolean | null = null;
  if (u.kind === "num" && (m = R.match(/^(\d+)$/))) ok = +m[1] >= 1 && +m[1] <= u.n;
  else if (u.kind === "mot" && (m = R.match(/^[Ll]a lettre ([A-Z])$/))) ok = u.mot.includes(m[1]);
  else if (u.kind === "sac" && (m = R.match(/^(?:[Uu]n|[Uu]ne) (.+)$/))) ok = u.groupes.some((g) => g.cle === cle(m![1]));
  if (ok == null) return [...pb, `résultat « ${R} » illisible`];
  return [...pb, ...ouiNon(q, ok)];
}

/** L'action, UN résultat, ou un ensemble de résultats ? */
function cVocabNature(q: Q): string[] {
  const { u, pb } = experience(q);
  const X = guillemets(q.text).pop();
  if (!u || !X) return [...pb, "énoncé illisible"];
  const c = compter(X, u);
  let sorte: string | null = null;
  if (!c) sorte = /hasard|et noter|et lire|au sort|sans regarder|sphère|attribuer/.test(X) ? "une expérience aléatoire" : null;
  else sorte = c.favs.length === 1 ? "une issue" : c.favs.length >= 2 ? "un événement" : null;
  if (!sorte) return [...pb, `« ${X} » ne se classe pas`];
  return [...pb, ...qcmUnique(q, (x) => x === sorte)];
}

/** Probabilité 0, 1, ou entre les deux. */
function cProba01(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = evenementDemande(q.text);
  const c = u && E ? compter(E, u) : null;
  if (!c) return [...pb, `événement illisible : « ${E} »`];
  const rep = { impossible: "0", certain: "1", possible: "un nombre strictement compris entre 0 et 1" }[nature(c)];
  return [...pb, ...qcmUnique(q, (x) => x === rep)];
}

// ─── proba_issue ───────────────────────────────────────────────────────────

function cTotalSac(q: Q): string[] {
  const { u, pb } = experience(q);
  if (u?.kind !== "sac") return [...pb, "composition illisible"];
  return [...pb, ...reponse(q, u.groupes.reduce((a, g) => a + g.n, 0), "nombre d'issues")];
}

function cNbIssues(q: Q): string[] {
  const { u, pb } = experience(q);
  if (!u) return pb;
  if (u.kind === "mot" && new Set(u.mot).size !== u.mot.length) pb.push(`le mot ${u.mot} a des lettres répétées : « résultats différents » ambigu`);
  return [...pb, ...reponse(q, issuesDe(u).length, "nombre d'issues")];
}

function cFavorables(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text)[0];
  const c = u && E ? compter(E, u) : null;
  if (!c) return [...pb, `événement illisible : « ${E} »`];
  return [...pb, ...reponse(q, c.favs.length, "issues favorables")];
}

/** La liste exacte des issues (sans oubli ni ajout). */
function cListe(q: Q): string[] {
  const { u, pb } = experience(q);
  if (!u) return pb;
  const vraies = [...new Set(issuesDe(u).map((i) => String(i.v)))].sort().join("|");
  return [
    ...pb,
    ...qcmUnique(q, (c) => {
      const xs = c.split(", ").map((x) => (u.kind === "roue" ? cle(x) : x));
      return new Set(xs).size === xs.length && [...xs].sort().join("|") === vraies;
    }),
  ];
}

// ─── proba_evenement ───────────────────────────────────────────────────────

function cCertImp(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text).pop();
  const c = u && E ? compter(E, u) : null;
  if (!c) return [...pb, `événement illisible : « ${E} »`];
  const n = nature(c);
  if (n === "possible") return [...pb, "événement ni certain ni impossible"];
  return [...pb, ...qcmUnique(q, (x) => x === n)];
}

function cNature3(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text).pop();
  const c = u && E ? compter(E, u) : null;
  if (!c) return [...pb, `événement illisible : « ${E} »`];
  const n = nature(c);
  return [...pb, ...qcmUnique(q, (x) => x === (n === "possible" ? "possible, sans être certain" : n))];
}

/** Le résultat obtenu réalise-t-il l'événement ? */
function cRealise(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text).pop();
  if (!u || !E) return [...pb, "énoncé illisible"];
  const f = lireEvenement(E, u);
  const t = q.text;
  let m: RegExpMatchArray | null;
  let v: string | number | null = null;
  if (u.kind === "num" && (m = t.match(/(?:Le résultat est|On obtient|L'issue) (\d+)\b/))) v = +m[1];
  else if (u.kind === "mot" && (m = t.match(/(?:On tire la lettre|est la lettre|L'issue «) ([A-Z])\b/))) v = m[1];
  else if (u.kind === "sac" && (m = t.match(/(?:Résultat du tirage :|Le tirage donne|On obtient) (?:un|une) ([^.]+)\./))) v = cle(m[1]);
  if (!f || v == null) return [...pb, "résultat ou événement illisible"];
  if (!issuesDe(u).some((i) => i.v === v)) pb.push(`le résultat ${v} n'est pas une issue possible`);
  return [...pb, ...ouiNon(q, f(v))];
}

/** Les issues du contraire, dans l'ordre de l'univers. */
function contraire(E: string, u: Univers): boolean[] | null {
  const f = lireEvenement(E, u);
  return f ? issuesDe(u).map((i) => !f(i.v)) : null;
}

function cContraireQcm(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text)[0];
  const cible = u && E ? contraire(E, u) : null;
  if (!u || !cible) return [...pb, `événement illisible : « ${E} »`];
  return [
    ...pb,
    ...qcmUnique(q, (c) => {
      const f = lireEvenement(c, u);
      return !!f && issuesDe(u).every((i, k) => f(i.v) === cible[k]);
    }),
  ];
}

function cContraireListe(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text)[0];
  if (u?.kind !== "num" || !E) return [...pb, "énoncé illisible"];
  const f = lireEvenement(E, u);
  if (!f) return [...pb, `événement illisible : « ${E} »`];
  const comp = issuesDe(u).filter((i) => !f(i.v)).map((i) => i.v).join(", ");
  return [...pb, ...qcmUnique(q, (c) => c === comp)];
}

function cContraireCompte(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = guillemets(q.text)[0];
  const c = u && E ? contraire(E, u) : null;
  if (!c) return [...pb, `événement illisible : « ${E} »`];
  return [...pb, ...reponse(q, c.filter(Boolean).length, "issues du contraire")];
}

// ─── proba_equiprobabilite ─────────────────────────────────────────────────

/**
 * Équiprobable ou non. Décision de Frédéric : penalty, punaise, météo, objet
 * truqué ou lesté, grand secteur, effectifs différents → NON.
 */
function cEquiSituation(q: Q): string[] {
  const t = q.text;
  let oui: boolean | null = null;
  const deux = t.match(/On s'intéresse aux issues « (.+?) » et « (.+?) »/);
  if (/truqué|lestée|punaise|penalty|pleuvoir|moitié de la roue|lunettes|plus lourd|« pas 6 »/.test(t)) oui = false;
  else if (deux) {
    const u = lireUnivers(t);
    const a = u ? compter(deux[1], u) : null;
    const b = u ? compter(deux[2], u) : null;
    if (a && b) oui = a.fav === b.fav;
  } else if (/équilibré|identiques|secteurs égaux|bien équilibrée/.test(t)) oui = true;
  if (oui == null) return ["situation illisible"];
  return ouiNon(q, oui);
}

/** Les couleurs d'une roue ont-elles la même place ? */
function cEquiRoue(q: Q): string[] {
  const { u, pb } = experience(q);
  if (u?.kind !== "roue") return [...pb, "roue illisible"];
  const place = new Map<string, number>();
  for (const s of u.secteurs) place.set(s.cle, (place.get(s.cle) ?? 0) + s.w);
  return [...pb, ...ouiNon(q, new Set(place.values()).size === 1)];
}

/** Deux catégories : autant de chances ? combien en ajouter pour égaliser ? */
function cEquiSac(q: Q): string[] {
  const { u, pb } = experience(q);
  if (u?.kind !== "sac" || u.groupes.length !== 2) return [...pb, "composition illisible"];
  const [a, b] = u.groupes;
  if (/ajouter/.test(q.text)) {
    const petit = a.n < b.n ? a : b;
    const m = q.text.match(/Combien (?:de |d')(.+?) (?:faudrait-il|faut-il) ajouter/);
    if (!m || cle(m[1]) !== petit.cle) pb.push(`on doit ajouter des ${petit.cle}, l'énoncé dit « ${m?.[1]} »`);
    if (a.n === b.n) pb.push("catégories déjà égales");
    return [...pb, ...reponse(q, Math.abs(a.n - b.n), "objets à ajouter")];
  }
  return [...pb, ...ouiNon(q, a.n === b.n)];
}

/** Issues équiprobables : chacune vaut 1/n. */
function cChaqueIssue(q: Q): string[] {
  const { u, pb } = experience(q);
  if (!u) return pb;
  if (u.kind === "mot" && new Set(u.mot).size !== u.mot.length) pb.push("lettres répétées : les issues « lettres » ne sont pas équiprobables");
  return [...pb, ...reponse(q, 1 / issuesDe(u).length, "probabilité de chaque issue")];
}

// ─── proba_calculer_fraction, proba_defi : P(A) ───────────────────────────

function probaDemandee(q: Q): { p: number; pb: string[] } | { p: null; pb: string[] } {
  const { u, pb } = experience(q);
  const E = evenementDemande(q.text);
  const c = u && E ? compter(E, u) : null;
  if (!c) return { p: null, pb: [...pb, `événement illisible : « ${E} »`] };
  if (c.fav === 0 || c.fav === c.tot) pb.push(`événement ${nature(c)} : la question n'a pas d'intérêt ici`);
  return { p: c.fav / c.tot, pb };
}

function cProbaQcm(q: Q): string[] {
  const r = probaDemandee(q);
  if (r.p == null) return r.pb;
  return [...r.pb, ...qcmUnique(q, (c) => egal(valeur(c), r.p))];
}

function cProbaCourte(q: Q): string[] {
  const r = probaDemandee(q);
  if (r.p == null) return r.pb;
  return [...r.pb, ...reponse(q, r.p, "probabilité")];
}

/** Roue à angles : la couleur la plus probable (QCM), ou P(couleur) en fraction. */
function cRoueAngles(q: Q): string[] {
  const { u, pb } = experience(q);
  if (u?.kind !== "roue") return [...pb, "roue illisible"];
  if (u.secteurs.reduce((a, s) => a + s.w, 0) !== 360) pb.push("les angles ne font pas 360°");
  if (q.format !== "qcm") return [...pb, ...cProbaCourte(q)];
  const max = Math.max(...u.secteurs.map((s) => s.w));
  const gagnants = u.secteurs.filter((s) => s.w === max);
  if (gagnants.length !== 1) return [...pb, "deux secteurs ex aequo"];
  return [...pb, ...qcmUnique(q, (c) => /^(?:le |l')/.test(c) && cle(c.replace(/^(?:le |l')/, "")) === gagnants[0].cle)];
}

/** Pourquoi la grande couleur est la plus probable : sa part de la roue. */
function cExplique(q: Q): string[] {
  const m = q.text.match(/le secteur (\S+) est (\d+) fois plus grand que chacun des secteurs (\S+) et (\S+)\./);
  if (!m) return ["énoncé illisible"];
  const k = +m[2];
  const p: string[] = [];
  const cv = q.canvas as any;
  const poids = (cv?.roue?.segments ?? []).map((s: { poids: number }) => s.poids).sort((a: number, b: number) => a - b).join(",");
  if (poids !== `1,1,${k}`) p.push(`roue dessinée ${poids} au lieu de 1,1,${k}`);
  return [...p, ...qcmUnique(q, (c) => c.includes(`secteur ${m[1]} occupe ${k} parts sur ${k + 2}`))];
}

// ─── proba_convertir ───────────────────────────────────────────────────────

/** La probabilité ÉCRITE dans l'énoncé : fraction, décimal ou pourcentage. */
function probaEcrite(t: string): number | null {
  const m = t.match(new RegExp(`(?:est|vaut|égale à|de) (\\d+/\\d+|${NB} ?%|0,\\d+)(?=[.,]| :| \\?|$)`));
  return m ? valeur(m[1]) : null;
}

function cConvertir(q: Q): string[] {
  const v = probaEcrite(q.text);
  if (v == null) return ["probabilité écrite illisible"];
  if (!(v > 0 && v < 1)) return [`probabilité ${v} hors de ]0 ; 1[`];
  return reponse(q, v, "conversion");
}

function cPctQcm(q: Q): string[] {
  const v = probaEcrite(q.text);
  if (v == null) return ["probabilité écrite illisible"];
  // Par la VALEUR : « 0,35 » à côté de « 35 % » serait une seconde bonne réponse.
  const p = /%$/.test(String(q.expected[0])) ? [] : [`pourcentage demandé, attendu « ${q.expected[0]} »`];
  return [...p, ...qcmUnique(q, (c) => egal(valeur(c), v))];
}

function cVersFraction(q: Q): string[] {
  const v = probaEcrite(q.text);
  if (v == null) return ["probabilité écrite illisible"];
  // Une seule proposition de cette VALEUR (« 6/10 » à côté de « 3/5 » troublerait), et c'est l'irréductible.
  const p = irreductible(String(q.expected[0])) ? [] : [`fraction irréductible demandée, attendu « ${q.expected[0]} »`];
  return [...p, ...qcmUnique(q, (c) => egal(valeur(c), v))];
}

/** P(A) recalculée, donnée en pourcentage. */
const cProbaPct = cProbaCourte;

// ─── proba_comparer ────────────────────────────────────────────────────────

/** Deux sacs A et B : où l'événement est-il le plus probable ? */
function cDeuxSacs(q: Q): string[] {
  const t = q.text;
  const m = t.match(/^(.+?) A (?:contient|compte) ([^;]+) ; (.+?) B (?:contient|compte) ([^.]+)\./);
  const E = t.match(/Pour (.+?), vaut-il/)?.[1] ?? t.match(/chances (?:de |d')(.+?) :/)?.[1] ?? t.match(/probabilité (?:de |d')(.+?) est-elle/)?.[1];
  const A = m ? liste(m[2]) : null;
  const B = m ? liste(m[4]) : null;
  if (!A || !B || !E) return ["énoncé illisible"];
  const p = (g: { cle: string; n: number }[]) => compter(E, { kind: "sac", groupes: g });
  const a = p(A);
  const b = p(B);
  if (!a || !b) return [`événement illisible : « ${E} »`];
  const pa = a.fav / a.tot;
  const pb = b.fav / b.tot;
  const pbm: string[] = [];
  const cv = q.canvas as any;
  const lignes: string[][] = cv?.tableau?.lignes ?? [];
  const attendu = [A, B].map((g, i) => [i ? "B" : "A", ...g.map((x) => String(x.n)), String(g.reduce((s, x) => s + x.n, 0))].join("|"));
  if (lignes.map((l) => l.join("|")).join("/") !== attendu.join("/")) pbm.push("tableau dessiné différent du texte");
  return [...pbm, ...qcmUnique(q, (c) => (egal(pa, pb) ? /autant/.test(c) : / A$/.test(c) ? pa > pb : / B$/.test(c) ? pb > pa : false))];
}

const sensPlus = (t: string) => (/le moins/.test(t) ? false : /le plus|vaut-il mieux/.test(t) ? true : null);

function cDeuxEvts(q: Q): string[] {
  const { u, pb } = experience(q);
  const [E1, E2] = guillemets(q.text).slice(-2);
  const a = u && E1 ? compter(E1, u) : null;
  const b = u && E2 ? compter(E2, u) : null;
  const plus = sensPlus(q.text);
  if (!a || !b || plus == null) return [...pb, "événements illisibles"];
  const juste = a.fav === b.fav ? null : (a.fav > b.fav) === plus ? E1 : E2;
  return [...pb, ...qcmUnique(q, (c) => (juste == null ? /aussi probables/.test(c) : c === juste))];
}

/** Probabilités de gagner à des jeux nommés : « au chamboule-tout est 3/7 », « de 35 % à la loterie ». */
function probasDesJeux(q: Q, motif: (core: string) => RegExp): { nom: string; v: number }[] | null {
  const noms = (q.choices ?? []).filter((c) => !/se valent|autant de chances/.test(c));
  const out: { nom: string; v: number }[] = [];
  for (const nom of noms) {
    const core = esc(nom.replace(/^(?:Le |La |L'|Les )/, ""));
    const m = q.text.match(motif(core));
    const v = m ? valeur(m[1]) : null;
    if (v == null) return null;
    out.push({ nom, v });
  }
  return out;
}

function cTroisEcritures(q: Q): string[] {
  const js = probasDesJeux(q, (c) => new RegExp(`de (\\d+/\\d+|${NB} %|${NB}) (?:au|aux|à la|à l'|à) ${c}`));
  const plus = sensPlus(q.text);
  if (!js || js.length !== 3 || plus == null) return ["jeux illisibles"];
  const ext = plus ? Math.max(...js.map((j) => j.v)) : Math.min(...js.map((j) => j.v));
  if (js.filter((j) => egal(j.v, ext)).length !== 1) return ["deux jeux ex aequo"];
  return qcmUnique(q, (c) => js.some((j) => j.nom === c && egal(j.v, ext)));
}

function cDeuxJeux(q: Q): string[] {
  const js = probasDesJeux(q, (c) => new RegExp(`gagner (?:au|aux|à la|à l'|à) ${c} est (\\d+/\\d+)`));
  const plus = sensPlus(q.text);
  if (!js || js.length !== 2 || plus == null) return ["jeux illisibles"];
  const [a, b] = js;
  const juste = egal(a.v, b.v) ? null : (a.v > b.v) === plus ? a.nom : b.nom;
  return qcmUnique(q, (c) => (juste == null ? /autant de chances/.test(c) : c === juste));
}

/** Un sac à trois catégories : l'événement le plus (ou le moins) probable. */
function cSacTrois(q: Q): string[] {
  const { u, pb } = experience(q);
  const plus = sensPlus(q.text);
  if (u?.kind !== "sac" || plus == null) return [...pb, "énoncé illisible"];
  const ns = u.groupes.map((g) => g.n);
  const ext = plus ? Math.max(...ns) : Math.min(...ns);
  const tous = new Set(ns).size === 1;
  if (!tous && ns.filter((n) => n === ext).length > 1) return [...pb, "deux catégories ex aequo"];
  return [
    ...pb,
    ...qcmUnique(q, (c) => {
      if (/aussi probables/.test(c)) return tous;
      const k = compter(c, u);
      return !tous && !!k && k.fav === ext;
    }),
  ];
}

// ─── proba_defi ────────────────────────────────────────────────────────────

/** Combien en ajouter pour que P(A) devienne p/q. */
function cAjouter(q: Q): string[] {
  const { u, pb } = experience(q);
  const E = q.text.match(/probabilité (?:de |d')(.+?) (?:soit|devienne)/)?.[1];
  const cibleM = q.text.match(/(?:égale à|devienne) (\d+)\/(\d+)/);
  if (u?.kind !== "sac" || u.groupes.length !== 2 || !E || !cibleM) return [...pb, "énoncé illisible"];
  const f = lireEvenement(E, u);
  const g = u.groupes.find((x) => f?.(x.cle));
  const h = u.groupes.find((x) => x !== g);
  if (!g || !h) return [...pb, `événement illisible : « ${E} »`];
  const [p, d] = [+cibleM[1], +cibleM[2]];
  const x = (p * h.n) / (d - p) - g.n;
  if (!Number.isInteger(x) || x < 1) pb.push(`il faudrait ajouter ${x} objets : pas un entier positif`);
  const ajout = q.text.match(/Combien (?:de |d')(.+?) faut-il ajouter/)?.[1];
  if (!ajout || cle(ajout) !== g.cle) pb.push(`on doit ajouter des objets de l'événement, l'énoncé dit « ${ajout} »`);
  return [...pb, ...reponse(q, x, "objets à ajouter")];
}

/** Trois catégories : P(3e) = 1 − P1 − P2. */
function cTroisieme(q: Q): string[] {
  const m = q.text.match(/est (\d+\/\d+), et celle (?:de |d').+? est (\d+\/\d+)\./);
  if (!m) return ["probabilités données illisibles"];
  const v = 1 - valeur(m[1])! - valeur(m[2])!;
  const p: string[] = [];
  if (!(v > 1e-9)) p.push(`la troisième probabilité vaudrait ${v}`);
  return [...p, ...reponse(q, v, "probabilité restante")];
}

/** P(contraire) = 1 − P(A), dans l'écriture demandée. */
function cContraireValeur(q: Q): string[] {
  const v = probaEcrite(q.text);
  if (v == null) return ["probabilité donnée illisible"];
  return reponse(q, 1 - v, "probabilité du contraire");
}

/** On connaît un effectif et sa probabilité : le total, ou l'autre effectif. */
function cEffectifManquant(q: Q): string[] {
  const t = q.text;
  const ng = t.match(/Il y a (\d+|un|une) /);
  const pr = t.match(/est (\d+)\/(\d+)\./);
  if (!ng || !pr) return ["énoncé illisible"];
  const n = /^\d+$/.test(ng[1]) ? +ng[1] : 1;
  const T = (n * +pr[2]) / +pr[1];
  const p: string[] = [];
  if (!Number.isInteger(T)) p.push(`total ${T} non entier`);
  return [...p, ...reponse(q, /en tout/.test(t) ? T : T - n, /en tout/.test(t) ? "total" : "autre catégorie")];
}

/** Français : élision devant une voyelle (« d'obtenir »), jamais devant Y. */
function francais(q: Q): string[] {
  const tout = [q.text, ...(q.choices ?? [])].join(" ");
  const m = tout.match(/\b(?:de|que de) (obtenir|attraper|ajouter|[AEIOUÉÈÂ][a-zéèëï]+)\b/) ?? tout.match(/\bd'(Y[a-z]+)/);
  return m ? [`élision fautive : « ${m[0]} »`] : [];
}

const BASE_MAP: CorrecteursMaths = avecRegleMotsCles({
  proba_vocabulaire_tpl_1: cVocabNature,
  proba_vocabulaire_tpl_2: cProba01,
  proba_vocabulaire_tpl_3: cAleatoire,
  proba_vocabulaire_tpl_4: cIssuePossible,
  proba_issue_tpl_1: cTotalSac,
  proba_issue_tpl_2: cNbIssues,
  proba_issue_tpl_3: cFavorables,
  proba_issue_tpl_4: cListe,
  proba_evenement_tpl_1: cContraireQcm,
  proba_evenement_tpl_2: cNature3,
  proba_evenement_tpl_3: cContraireListe,
  proba_evenement_tpl_4: cCertImp,
  proba_evenement_tpl_5: cRealise,
  proba_evenement_tpl_6: cContraireCompte,
  proba_equiprobabilite_tpl_1: cEquiRoue,
  proba_equiprobabilite_tpl_2: cEquiSac,
  proba_equiprobabilite_tpl_3: cEquiSituation,
  proba_equiprobabilite_tpl_4: cChaqueIssue,
  proba_calculer_fraction_tpl_1: cProbaQcm,
  proba_calculer_fraction_tpl_2: cProbaQcm,
  proba_calculer_fraction_tpl_3: cProbaCourte,
  proba_calculer_fraction_tpl_4: cProbaCourte,
  proba_calculer_fraction_tpl_5: cProbaQcm,
  proba_convertir_tpl_1: cProbaPct,
  proba_convertir_tpl_2: cVersFraction,
  proba_convertir_tpl_3: cConvertir,
  proba_convertir_tpl_4: cConvertir,
  proba_convertir_tpl_5: cPctQcm,
  proba_comparer_tpl_1: cDeuxSacs,
  proba_comparer_tpl_2: cDeuxEvts,
  proba_comparer_tpl_3: cTroisEcritures,
  proba_comparer_tpl_4: cSacTrois,
  proba_comparer_tpl_5: cDeuxJeux,
  proba_defi_tpl_1: cProbaCourte,
  proba_defi_tpl_2: cRoueAngles,
  proba_defi_open_1: cExplique,
  proba_defi_tpl_3: cAjouter,
  proba_defi_tpl_4_contraire: cTroisieme,
  proba_defi_tpl_5: cContraireValeur,
  proba_defi_tpl_6: cEffectifManquant,
});

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(BASE_MAP).map(([id, f]) => [id, (q: Q) => [...francais(q), ...f(q)]]),
);
