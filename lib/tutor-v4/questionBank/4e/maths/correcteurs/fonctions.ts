import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE fonctions.bank.ts (notion fonction_dependance, 08/10/2026).
// Ils relisent DANS LE TEXTE la règle (« 4 € de prise en charge, puis 2 € par
// kilomètre »), le programme de calcul (en phrase, en liste, en flèches), la
// formule (« A = 3 × n + 1 »), les offres ; et DANS LE CANVAS le tableau ou le
// nuage de points. Puis ils recalculent l'image ou remontent à l'antécédent,
// retrouvent la règle d'un tableau par ses écarts, éprouvent chaque formule et
// chaque programme proposés sur plusieurs valeurs. Ils vérifient l'unité de la
// réponse (« 40 € », « 6 heures ») et que le canvas ne montre pas la réponse.
// Vide = juste.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(String(s).trim().replace(/−/g, "-").replace(/\s/g, "").replace(",", "."));
/** « 1 296 » s'écrit avec une espace fine insécable (U+202F) : c'est UN nombre. */
const RE_NB = /−?\d{1,3}(?:[  ]\d{3})+(?:,\d+)?|−?\d+(?:,\d+)?/g;
const nombres = (t: string) => (String(t).match(RE_NB) ?? []).map(num);
const dernier = (t: string) => {
  const n = nombres(t);
  return n.length ? n[n.length - 1] : NaN;
};
const egal = (a: number, b: number) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-9;

// ─── unités ─────────────────────────────────────────────────────────────────

const sing = (u: string) => u.replace(/s$/, "");
/** L'unité de mesure d'une colonne « prix (€) », « durée (h) », « semaines ». */
function uniteColonne(col: string): string {
  const p = col.match(/\(([^)]+)\)/)?.[1];
  const m: Record<string, string> = { "€": "€", km: "km", h: "heures", min: "min", L: "litres", "%": "%", "°C": "°C", cm: "cm", kg: "kg", "m³": "m³" };
  if (p) return m[p] ?? "";
  if (/^semaines$/.test(col)) return "semaines";
  if (/^jours$/.test(col)) return "jours";
  if (/^Go/.test(col)) return "Go";
  return "";
}
function verifierUnite(q: Q, voulue: string): string[] {
  const lue = String(q.expected[0]).replace(/^[−-]?[\d\s,]+/, "").trim();
  return sing(lue) === sing(voulue) ? [] : [`unité de la réponse « ${lue} » au lieu de « ${voulue} »`];
}
function verifierNombre(q: Q, juste: number, unite: string | null): string[] {
  const p: string[] = [];
  if (!Number.isFinite(juste)) return ["calcul impossible à refaire"];
  if (!egal(num(String(q.expected[0]).match(/^[−-]?[\d\s,]+/)?.[0] ?? "NaN"), juste)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${juste}`);
  for (const e of q.expected.slice(1)) if (!egal(num(e.match(/^[−-]?[\d\s,]+/)?.[0] ?? "NaN"), juste)) p.push(`variante acceptée « ${e} » ≠ ${juste}`);
  if (unite != null) p.push(...verifierUnite(q, unite));
  return p;
}

// ─── la règle « b fixe, puis a par unité » ──────────────────────────────────

type Regle = { a: number; b: number; uy: string; ux: string };
const PAR_X: Record<string, string> = { heure: "heures", minute: "min", kilomètre: "km", semaine: "semaines", Go: "Go" };

function lireRegle(t: string): Regle | null {
  const phrases = t.split(/(?<=[.?!])\s+/);
  for (let k = 0; k < phrases.length; k++) {
    const ph = phrases[k];
    let m = ph.match(/(\d+) (€|%|°C|km|cm|litres) (?:par|chaque) (heure|minute|kilomètre|semaine|séance|Go|pizza|cours|tee-shirt|affiche|partie)/);
    let a: number, uy: string, ux: string;
    if (m) {
      a = Number(m[1]);
      uy = m[2];
      ux = PAR_X[m[3]] ?? "";
    } else if ((m = ph.match(/chaque partie coûte (\d+) €/))) {
      a = Number(m[1]);
      uy = "€";
      ux = "";
    } else continue;
    const autres = nombres(ph).filter((x) => x !== a);
    const b = autres.length === 1 ? autres[0] : k > 0 ? nombres(phrases[k - 1])[0] : NaN;
    if (!Number.isFinite(b)) return null;
    return { a, b, uy, ux };
  }
  return null;
}

// ─── le canvas ──────────────────────────────────────────────────────────────

type Table = { xs: number[]; ys: (number | null)[]; ux: string; uy: string; missing?: number; highlight?: number };
function lireTable(q: Q): Table | null {
  const c = q.canvas as any;
  if (!c) return null;
  if (c.kind === "fonction_tableau")
    return { xs: c.xValues, ys: c.yValues.map((y: number, i: number) => (c.missing?.index === i ? null : y)), ux: uniteColonne(c.etiquettes?.x ?? ""), uy: uniteColonne(c.etiquettes?.y ?? ""), missing: c.missing?.index, highlight: c.highlightIndex };
  if (c.kind === "tableau_donnees" && c.rows?.length === 1)
    return { xs: c.headers.slice(1).map(num), ys: c.rows[0].values.slice(1).map((v: string) => (v === "?" ? null : num(v))), ux: uniteColonne(c.headers[0]), uy: uniteColonne(c.rows[0].values[0]) };
  return null;
}
function lirePoints(q: Q): { x: number; y: number }[] | null {
  const c = q.canvas as any;
  return c?.kind === "fonctionGraphique" ? c.courbes?.[0]?.points ?? null : null;
}
function uniteGraphe(q: Q): { ux: string; uy: string } {
  const t = String((q.canvas as any)?.titre ?? "").split(" → ");
  return { ux: uniteColonne(t[0] ?? ""), uy: uniteColonne(t[1] ?? "") };
}

/** La règle « × a puis + b » d'un tableau, par ses écarts (null si les écarts ne sont pas constants). */
function regleTable(xs: number[], ys: (number | null)[]): { a: number; b: number } | null {
  const pts = xs.map((x, i) => ({ x, y: ys[i] })).filter((p) => p.y != null) as { x: number; y: number }[];
  if (pts.length < 2) return null;
  const a = (pts[1].y - pts[0].y) / (pts[1].x - pts[0].x);
  const b = pts[0].y - a * pts[0].x;
  return pts.every((p) => egal(a * p.x + b, p.y)) ? { a, b } : null;
}

/** La table d'abord affine, cohérente avec la règle du texte s'il y en a une. */
function coherence(q: Q, xs: number[], ys: (number | null)[]): string[] {
  const r = regleTable(xs, ys);
  if (!r) return ["les valeurs du canvas ne suivent pas une règle « × a puis + b »"];
  const t = lireRegle(q.text);
  if (t && !(egal(t.a, r.a) && egal(t.b, r.b))) return [`le texte dit × ${t.a} puis + ${t.b}, le tableau suit × ${r.a} puis + ${r.b}`];
  return [];
}

// ─── fonction_tableau_lire ──────────────────────────────────────────────────

function corrigerLireImage(q: Q): string[] {
  const T = lireTable(q);
  if (!T) return ["tableau illisible"];
  const n = dernier(q.text);
  const i = T.xs.indexOf(n);
  if (i < 0 || T.ys[i] == null) return [`${n} n'est pas une colonne lisible du tableau`];
  const p = [...coherence(q, T.xs, T.ys), ...verifierNombre(q, T.ys[i]!, T.uy)];
  if (T.highlight != null && T.highlight !== i) p.push(`la colonne surlignée (${T.highlight}) n'est pas celle de ${n}`);
  return p;
}

function corrigerLireAntecedent(q: Q): string[] {
  const T = lireTable(q);
  if (!T) return ["tableau illisible"];
  const v = dernier(q.text);
  const i = T.ys.indexOf(v);
  if (i < 0) return [`${v} n'est pas dans la ligne du bas`];
  return [...coherence(q, T.xs, T.ys), ...verifierNombre(q, T.xs[i], T.ux)];
}

function corrigerCompleter(q: Q): string[] {
  const T = lireTable(q);
  if (!T) return ["tableau illisible"];
  const n = dernier(q.text);
  const i = T.xs.indexOf(n);
  if (T.missing == null || T.missing !== i) return [`la case effacée n'est pas celle de ${n}`];
  const r = regleTable(T.xs, T.ys);
  if (!r) return ["le tableau ne suit pas de règle"];
  return [...coherence(q, T.xs, T.ys), ...verifierNombre(q, r.a * n + r.b, T.uy)];
}

function corrigerProlonger(q: Q): string[] {
  const T = lireTable(q);
  if (!T) return ["tableau illisible"];
  const n = dernier(q.text);
  if (T.xs.includes(n)) return [`${n} est déjà dans le tableau : rien à prolonger`];
  const r = regleTable(T.xs, T.ys);
  if (!r) return ["le tableau ne suit pas de règle"];
  const juste = r.a * n + r.b;
  const p = [...coherence(q, T.xs, T.ys), ...verifierNombre(q, juste, T.uy)];
  if (T.uy === "%" && juste > 100) p.push(`${juste} % : impossible pour une batterie`);
  if (T.uy === "°C" && juste > 100) p.push(`${juste} °C : l'eau bout avant`);
  return p;
}

// ─── fonction_graphique_lire ────────────────────────────────────────────────

function aligne(pts: { x: number; y: number }[]) {
  return regleTable(pts.map((p) => p.x), pts.map((p) => p.y));
}

function corrigerGrapheImage(depart: boolean) {
  return (q: Q): string[] => {
    const pts = lirePoints(q);
    if (!pts) return ["graphique illisible"];
    const n = depart ? 0 : dernier(q.text);
    const pt = pts.find((p) => p.x === n);
    if (!pt) return [`aucun point au-dessus de ${n}`];
    const p = [...(aligne(pts) ? [] : ["points non alignés"]), ...verifierNombre(q, pt.y, uniteGraphe(q).uy)];
    const ev = (q.canvas as any).misesEnEvidence?.[0];
    if (ev && ev.point?.x !== n) p.push("le trait de lecture ne part pas de la bonne valeur");
    if (ev?.point?.label && ev.point.label !== "?") p.push(`le graphique écrit la réponse (« ${ev.point.label} »)`);
    return p;
  };
}

function corrigerGrapheAntecedent(sansAide: boolean) {
  return (q: Q): string[] => {
    const pts = lirePoints(q);
    if (!pts) return ["graphique illisible"];
    const v = dernier(q.text);
    const pt = pts.filter((p) => p.y === v);
    if (pt.length !== 1) return [`${pt.length} point(s) à la hauteur ${v}`];
    const p = [...(aligne(pts) ? [] : ["points non alignés"]), ...verifierNombre(q, pt[0].x, uniteGraphe(q).ux)];
    if (sansAide && (q.canvas as any).misesEnEvidence) p.push("le graphique « sans aide » trace les traits de lecture");
    return p;
  };
}

// ─── fonction_programme ─────────────────────────────────────────────────────

type Op = { k: "mul" | "add" | "sub" | "carre"; v: number };
function lireOp(s: string): Op | null {
  const t = s.trim();
  let m: RegExpMatchArray | null;
  if (/lui-même|au carré/.test(t)) return { k: "carre", v: 0 };
  if (/\bdouble\b|double-le/.test(t)) return { k: "mul", v: 2 };
  if (/\btriple\b|triple-le/.test(t)) return { k: "mul", v: 3 };
  if ((m = t.match(/multipli\S* (?:le résultat )?par (\d+)|^× (\d+)$/))) return { k: "mul", v: Number(m[1] ?? m[2]) };
  if ((m = t.match(/ajout\S*(?: lui| -lui)? (\d+)|^\+ (\d+)$/))) return { k: "add", v: Number(m[1] ?? m[2]) };
  if ((m = t.match(/(?:retir|soustrai)\S* (\d+)|^− (\d+)$/))) return { k: "sub", v: Number(m[1] ?? m[2]) };
  return null;
}
const appliquer = (x: number, o: Op) => (o.k === "mul" ? x * o.v : o.k === "add" ? x + o.v : o.k === "sub" ? x - o.v : x * x);
const executer = (x: number, ops: Op[]) => ops.reduce(appliquer, x);

/** Le programme du texte, et ce qui reste après lui (la question). */
function lireProgramme(t: string): { ops: Op[]; debut?: string; fin?: string; reste: string } | null {
  const ch = t.match(/(−?\d+|\?) → ((?:[^→]+ → )+)(−?\d+|\?)/);
  if (ch) {
    const ops = ch[2].split(" → ").filter(Boolean).map(lireOp);
    return ops.every(Boolean) ? { ops: ops as Op[], debut: ch[1], fin: ch[3], reste: "" } : null;
  }
  const m =
    t.match(/pense à un nombre\. (?:Il|Elle) (.+?)\.(?: |$)/) ??
    t.match(/choisis un nombre, (.+?)\.(?: |$)/) ??
    t.match(/① choisir un nombre ; (.+?)\.(?: |$)/) ??
    t.match(/Elle doit (.+?)\.(?: |$)/);
  if (!m) return null;
  const morceaux = m[1].split(/ ; [②③④⑤] |, puis |, /).map((s) => s.replace(/^[②③④⑤] /, ""));
  const ops = morceaux.map(lireOp);
  if (!ops.every(Boolean)) return null;
  return { ops: ops as Op[], reste: t.slice(m.index! + m[0].length) };
}

function corrigerAller(q: Q): string[] {
  const P = lireProgramme(q.text);
  if (!P) return ["programme illisible"];
  const x = P.debut != null ? num(P.debut) : (() => {
    const ns = nombres(P.reste);
    return ns.length === 1 ? ns[0] : NaN;
  })();
  if (!Number.isFinite(x)) return ["nombre de départ illisible"];
  if (P.fin != null && P.fin !== "?") return ["la chaîne devrait finir par « ? »"];
  const r = executer(x, P.ops);
  const p = verifierNombre(q, r, null);
  if (Math.abs(r) > 1000) p.push(`${r} : trop grand pour un calcul mental`);
  return p;
}

function corrigerRetour(q: Q): string[] {
  const P = lireProgramme(q.text);
  if (!P) return ["programme illisible"];
  let y: number;
  if (P.fin != null) {
    if (P.debut !== "?") return ["la chaîne devrait commencer par « ? »"];
    y = num(P.fin);
  } else {
    const ns = nombres(P.reste);
    if (ns.length !== 1) return [`un seul résultat attendu dans la question, lus : ${ns.join(", ")}`];
    y = ns[0];
  }
  // On remonte : la dernière étape d'abord, par l'opération contraire.
  let x = y;
  for (const o of [...P.ops].reverse()) {
    if (o.k === "carre") return ["un carré ne se remonte pas en 4e"];
    x = o.k === "mul" ? x / o.v : o.k === "add" ? x - o.v : x + o.v;
  }
  const p = verifierNombre(q, x, null);
  if (!Number.isInteger(x)) p.push(`départ ${x} non entier`);
  if (!egal(executer(x, P.ops), y)) p.push("la remontée ne redonne pas le résultat");
  return p;
}

const INFINITIF = /multiplier par \d+|ajouter \d+|soustraire \d+|retirer \d+|élever au carré/g;
function corrigerOrdre(q: Q): string[] {
  const x = num(q.text.match(/(?:de|nombre) (−?\d+)[.,]/)?.[1] ?? "NaN");
  const ops = (q.text.match(INFINITIF) ?? []).map((s) => lireOp(s)!);
  if (!Number.isFinite(x) || ops.length !== 4) return [`départ ou étapes illisibles (${x}, ${ops.length} étapes)`];
  const r1 = executer(x, ops.slice(0, 2));
  const r2 = executer(x, ops.slice(2));
  if (JSON.stringify(ops.slice(0, 2)) !== JSON.stringify([ops[3], ops[2]])) return ["le second programme n'est pas le premier à l'envers"];
  // Qui fait le premier programme : le nom qui apparaît le premier dans le texte.
  const noms = [...new Set((q.choices ?? []).flatMap((c) => [...c.matchAll(/(?:non : |et )(\S+) (?:obtient|donne)/g)].map((m) => m[1])))];
  if (noms.length !== 2) return [`deux noms attendus dans les propositions, lus : ${noms.join(", ")}`];
  const pos = (n: string) => q.text.search(new RegExp(`(?<![\\p{L}])${n}(?![\\p{L}])`, "u"));
  const [premier, second] = [...noms].sort((a, b) => pos(a) - pos(b));
  const fr = (v: number) => String(v);
  const juste = (c: string): boolean => {
    let m: RegExpMatchArray | null;
    if ((m = c.match(/^oui : les deux donnent ([\d\s]+)$/))) return r1 === r2 && num(m[1]) === r1;
    if ((m = c.match(/^non : (\S+) (?:obtient|donne) ([\d\s]+) et (\S+) (?:obtient|donne) ([\d\s]+)$/))) {
      const [u, w] = [fr(num(m[2])), fr(num(m[4]))];
      return r1 !== r2 && ((m[1] === premier && u === fr(r1) && m[3] === second && w === fr(r2)) || (m[1] === second && u === fr(r2) && m[3] === premier && w === fr(r1)));
    }
    return false;
  };
  return qcmUnique(q, juste);
}

// ─── fonction_changer_mode ──────────────────────────────────────────────────

function corrigerProgrammeTableau(q: Q): string[] {
  const abstrait = q.text.match(/multiplier par (\d+), puis ajouter (\d+)/);
  const R = abstrait ? { a: Number(abstrait[1]), b: Number(abstrait[2]) } : lireRegle(q.text);
  if (!R) return ["règle illisible"];
  const L = q.text.match(/(\d+), (\d+) et (\d+)/);
  if (!L) return ["valeurs de départ illisibles"];
  const xs = L.slice(1, 4).map(Number);
  const bonne = xs.map((x) => R.a * x + R.b).join(" ; ");
  const p = qcmUnique(q, (c) => c === bonne);
  const T = lireTable(q);
  if (!T || T.xs.join() !== xs.join()) p.push("le tableau du canvas n'a pas les valeurs du texte");
  else if (T.ys.some((y) => y != null)) p.push("le tableau du canvas donne la réponse");
  if (lireRegle(q.text) && T && !abstrait && T.uy !== lireRegle(q.text)!.uy && !(T.uy === "litres" && lireRegle(q.text)!.uy === "litres")) p.push(`unité du tableau « ${T.uy} » au lieu de « ${lireRegle(q.text)!.uy} »`);
  return p;
}

/** « M = 9 × n + 4 » : la lettre de gauche, l'expression de droite. */
function evalFormule(f: string, x: number): { gauche: string; v: number } | null {
  const m = f.match(/^([A-Za-z]) = (.+)$/);
  if (!m) return null;
  const lettres = [...new Set(m[2].match(/[A-Za-z]/g) ?? [])];
  if (lettres.length !== 1) return null;
  const js = m[2].replace(new RegExp(lettres[0], "g"), `(${x})`).replace(/×/g, "*").replace(/−/g, "-").replace(/(\d),(\d)/g, "$1.$2");
  if (!/^[\d\s()+\-*.]+$/.test(js)) return null;
  return { gauche: m[1], v: Function(`return ${js};`)() as number };
}

function corrigerPhraseFormule(q: Q): string[] {
  const R = lireRegle(q.text);
  if (!R) return ["règle illisible"];
  const Y = q.expected[0].match(/^([A-Za-z]) =/)?.[1];
  const p = qcmUnique(q, (c) => [0, 1, 2, 5, 9].every((x) => {
    const e = evalFormule(c, x);
    return !!e && e.gauche === Y && egal(e.v, R.a * x + R.b);
  }));
  // Les deux lettres sont présentées dans le texte.
  const n = q.expected[0].match(/× ([A-Za-z])/)?.[1];
  if (!n || !Y || !new RegExp(`\\b${n}\\b`).test(q.text) || !new RegExp(`\\b${Y}\\b`).test(q.text)) p.push("les lettres de la formule ne sont pas présentées dans le texte");
  return p;
}

function corrigerTableauProgramme(q: Q): string[] {
  const T = lireTable(q);
  if (!T) return ["tableau illisible"];
  const prog = (c: string): Op[] | null => {
    const ops = c.split(", puis ").map(lireOp);
    return ops.every(Boolean) ? (ops as Op[]) : null;
  };
  const p = qcmUnique(q, (c) => {
    const ops = prog(c);
    return !!ops && T.xs.every((x, i) => egal(executer(x, ops), T.ys[i]!));
  });
  // Le texte qui recopie les valeurs doit recopier les mêmes.
  const m = q.text.match(/donne ([\d ;]+) pour les valeurs ([\d ;]+)\./);
  if (m && (m[1] !== T.ys.join(" ; ") || m[2] !== T.xs.join(" ; "))) p.push("les valeurs du texte ne sont pas celles du tableau");
  return [...p, ...coherence(q, T.xs, T.ys)];
}

function corrigerTableauFormule(q: Q): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "tableau_donnees") return ["tableau illisible"];
  const n = c.headers[0];
  const Y = c.rows[0].values[0];
  const xs = c.headers.slice(1).map(num);
  const ys = c.rows[0].values.slice(1).map(num);
  const p: string[] = [];
  const f = q.expected[0];
  if (!f.startsWith(`${Y} = `) || !new RegExp(`\\b${n}\\b`).test(f.slice(4))) p.push(`la formule « ${f} » ne relie pas ${Y} à ${n}`);
  for (let i = 0; i < xs.length; i++) {
    const e = evalFormule(f, xs[i]);
    if (!e || !egal(e.v, ys[i])) p.push(`« ${f} » ne redonne pas ${ys[i]} pour ${n} = ${xs[i]}`);
  }
  return [...p, ...(regleTable(xs, ys) ? [] : ["le tableau ne suit pas de règle"])];
}

// ─── fonction_probleme ──────────────────────────────────────────────────────

function corrigerAbonnement(q: Q): string[] {
  const R = lireRegle(q.text);
  if (!R) return ["règle illisible"];
  const n = dernier(q.text);
  return verifierNombre(q, R.a * n + R.b, R.uy === "litres" ? "litres" : R.uy);
}

function corrigerRemonterProbleme(q: Q): string[] {
  const R = lireRegle(q.text);
  if (!R) return ["règle illisible"];
  const v = dernier(q.text);
  const n = (v - R.b) / R.a;
  const p = verifierNombre(q, n, R.ux);
  if (!Number.isInteger(n) || n <= 0) p.push(`${n} : pas un nombre entier positif d'unités`);
  return p;
}

/** La formule écrite dans le texte, et la valeur de sa lettre. */
function corrigerFormule(q: Q): string[] {
  const m = q.text.match(/\b([A-Za-z]) = ((?:\d+(?:,\d+)?|[A-Za-z]|[×+−()]| )+?)(?=,? (?:où|pour|mètres|personnes)|[,.](?: |$))/);
  if (!m) return ["formule illisible"];
  const lettre = [...new Set(m[2].match(/[A-Za-z]/g) ?? [])];
  if (lettre.length !== 1) return [`formule à une lettre attendue : ${m[0]}`];
  const reste = q.text.replace(m[0], " ");
  const ns = nombres(reste);
  if (ns.length !== 1) return [`une seule valeur attendue pour ${lettre[0]}, lues : ${ns.join(", ")}`];
  const e = evalFormule(`${m[1]} = ${m[2].trim()}`, ns[0]);
  if (!e) return ["formule incalculable"];
  const t = q.text;
  const unite = /\baire\b/.test(t) ? "cm²" : /volume/.test(t) ? "cm³" : /périmètre|clôture|tombé|chute/.test(t) ? "m" : /cuisson|cuire/.test(t) ? "minutes" : /course|trajet/.test(t) ? "€" : "";
  const p = verifierNombre(q, e.v, unite);
  if (!Number.isInteger(e.v)) p.push(`${e.v} : le calcul ne tombe pas juste`);
  return p;
}

const UNITES_DIMINUE: [RegExp, string, string][] = [
  [/bougie/, "cm", "heures"],
  [/carte de bus/, "€", ""],
  [/bord de la mer/, "°C", "km"],
  [/réservoir/, "litres", "heures"],
  [/piscine/, "m³", "heures"],
  [/téléphone chargé/, "%", "heures"],
  [/cantine/, "kg", "jours"],
];

function corrigerDiminue(q: Q): string[] {
  const t = q.text.replace(/de 1 km/, " ");
  const ns = nombres(t);
  if (ns.length !== 3) return [`trois nombres attendus (départ, baisse, question), lus : ${ns.join(", ")}`];
  const [b, a, w] = ns;
  const u = UNITES_DIMINUE.find(([re]) => re.test(t));
  if (!u) return ["situation inconnue du correcteur"];
  const retour = /Depuis combien|ont été faits|a-t-on regardées|À quelle altitude/.test(t);
  if (retour) {
    const n = (b - w) / a;
    const p = verifierNombre(q, n, u[2]);
    if (!Number.isInteger(n) || n <= 0) p.push(`${n} : pas un nombre entier positif`);
    return p;
  }
  const v = b - a * w;
  const p = verifierNombre(q, v, u[1]);
  if (v <= 0 && u[1] !== "°C") p.push(`il resterait ${v} : impossible`);
  return p;
}

// ─── fonction_defi ──────────────────────────────────────────────────────────

function lireOffres(t: string) {
  const m = t.match(/Offre A : (\d+) € .+?\. Offre B : (\d+) € pour .+?, puis (\d+) € /);
  return m ? { uA: Number(m[1]), F: Number(m[2]), uB: Number(m[3]) } : null;
}

function corrigerComparerOffres(q: Q): string[] {
  const O = lireOffres(q.text);
  if (!O) return ["offres illisibles"];
  const n = num(q.text.match(/(?:Pour|prévois|Avec) (\d+) /)?.[1] ?? "NaN");
  const A = O.uA * n, B = O.F + O.uB * n;
  if (A === B) return ["les deux offres coûtent pareil"];
  const p = qcmUnique(q, (c) => c === (A < B ? "l'offre A" : "l'offre B"));
  const rows = ((q.canvas as any)?.rows ?? []) as { values: string[] }[];
  const attendu = [["1", String(O.uA), String(O.F + O.uB)], [String(n), String(A), String(B)]];
  if (rows.map((r) => r.values.map((v) => v.replace(/ /g, "")).join("|")).join("/") !== attendu.map((r) => r.join("|")).join("/")) p.push("le tableau ne donne pas les bons prix");
  if (O.uB >= O.uA) p.push("l'offre B n'est pas moins chère à l'unité");
  return p;
}

function corrigerSeuil(q: Q): string[] {
  const O = lireOffres(q.text);
  if (!O) return ["offres illisibles"];
  let n = 1;
  while (O.F + O.uB * n >= O.uA * n && n < 1000) n++;
  return verifierNombre(q, n, null);
}

function corrigerGrapheProportion(q: Q): string[] {
  const pts = lirePoints(q);
  if (!pts) return ["graphique illisible"];
  const p0 = pts.find((p) => p.x === 0);
  if (!p0) return ["pas de point au-dessus de 0"];
  const r = aligne(pts);
  const croissant = pts.every((p, i) => i === 0 || p.y > pts[i - 1].y);
  const prop = !!r && egal(r.b, 0);
  const juste = (c: string): boolean => {
    let m: RegExpMatchArray | null;
    if (c.startsWith("oui")) return prop;
    if ((m = c.match(/^non : pour 0 \S+, la valeur est déjà (\d+)/))) return !prop && Number(m[1]) === p0.y;
    if (c === "non : les points ne sont pas alignés") return !r;
    if (c === "non : la valeur diminue") return !croissant;
    return false;
  };
  const p = qcmUnique(q, juste);
  const m = q.expected[0].match(/^non : pour 0 (\S+), la valeur est déjà \d+ (.+)$/);
  const u = uniteGraphe(q);
  if (m && ((u.ux && sing(m[1]) !== sing(u.ux)) || sing(m[2]) !== sing(u.uy))) {
    if (!(m[1] === "heure" && u.ux === "heures") && !(m[2] === "litres" && u.uy === "litres")) p.push(`unités « 0 ${m[1]} … ${m[2]} » ≠ graphique (${u.ux}, ${u.uy})`);
  }
  return p;
}

function corrigerDeuxSens(q: Q): string[] {
  const T = lireTable(q);
  if (!T) return ["tableau illisible"];
  const r = regleTable(T.xs, T.ys);
  if (!r) return ["le tableau ne suit pas de règle"];
  const v = dernier(q.text);
  if (T.ys.includes(v)) return [`${v} est déjà dans le tableau`];
  const n = (v - r.b) / r.a;
  const p = [...coherence(q, T.xs, T.ys), ...verifierNombre(q, n, T.ux)];
  if (!Number.isInteger(n)) p.push(`${n} : pas entier`);
  return p;
}

// ─── fonction_reconnaitre ───────────────────────────────────────────────────

// Mes propres jugements (08/10) : connaître la première grandeur fixe-t-il la seconde ?
const NE_DETERMINE_PAS = [
  "la couleur des yeux d'un élève selon son âge",
  "la hauteur d'un arbre selon le jour de la semaine",
  "la pointure d'un adhérent selon son prénom",
  "le nombre de fenêtres d'une maison selon son numéro dans la rue",
  "la vitesse maximale d'une voiture selon sa couleur",
  "le nombre de frères et sœurs d'un élève selon son mois de naissance",
  "le nombre de syllabes d'un mot selon sa première lettre",
  "le nombre de buts d'un joueur selon le numéro de son maillot",
  "le nombre de pages d'un livre selon la couleur de sa couverture",
  "la note d'un élève au dernier contrôle selon sa taille",
  "la masse d'un article selon son prix",
  "le nombre d'habitants d'un appartement selon son étage",
  "le nombre de maisons d'une rue selon la longueur de son nom",
  "le nombre de fruits d'un arbre selon sa hauteur",
  "le parfum de glace choisi selon la température extérieure",
  "le nombre de cases avancées par un pion selon sa couleur",
];
/** Une grandeur « de départ » qui ne fixe rien : couleur, prénom, numéro, jour… */
const SANS_EFFET = /couleur|prénom|nom du|nom de|marque|jour|heure|position|endroit|matière|sujet|numéro|taille du|lieu|température de l'air|épaisseur|forme du verre|durée du concert|musique|baigneurs|mois|première lettre|âge|étage|parfum|pointure/;

const INTROS_INDEPENDANCE = /^(Dans une classe de 4e|Dans un jardin|Dans un club de sport|Dans une ville|Sur un parking|Dans un collège|Dans un dictionnaire|Dans un championnat de football|Dans une bibliothèque|Dans une classe|Au supermarché|Dans un immeuble|Dans un verger|Chez un marchand de glaces|Dans un jeu de société)\./;
const INTROS_DEPENDANCE = /^(Au marché, les letchis|Un car scolaire|Une voiture roule|On s'intéresse à un (carré|cube)|Une photocopieuse|Un radiateur|Une salle d'escalade|On remplit un bassin|Un taxi|Une salle de concert|Un robinet|On découpe des disques|Une imprimante|Un rectangle a une largeur|Un boulanger|Une voiture consomme|Un parking|Une plante pousse|On convertit des températures|Un forfait téléphonique)/;

function accords(t: string): string[] {
  const p: string[] = [];
  for (const m of t.matchAll(/(?:^|[.?] )(Le|La|Sa) [^.?]+? (?:détermine|est)-t?-?(il|elle)\b/g))
    if ((m[1] === "Le") !== (m[2] === "il")) p.push(`accord : « ${m[0].trim()} »`);
  for (const m of t.matchAll(/, (le|la|sa) [^,?]+? est-(il|elle) fixé(e?) /g))
    if ((m[1] === "le") !== (m[2] === "il") || (m[2] === "elle") !== (m[3] === "e")) p.push(`accord : « ${m[0].trim()} »`);
  for (const m of t.matchAll(/(?:^|[.?] )(Le|La|Sa) [^,]+? étant connu(e?),/g))
    if ((m[1] === "Le") !== (m[2] === "")) p.push(`accord : « ${m[0].trim()} »`);
  return p;
}

function corrigerDepend(q: Q): string[] {
  const indep = INTROS_INDEPENDANCE.test(q.text);
  const dep = INTROS_DEPENDANCE.test(q.text);
  if (indep === dep) return ["situation inconnue du correcteur"];
  const p = qcmUnique(q, (c) => (dep ? c.startsWith("oui") : c.startsWith("non")));
  return [...p, ...accords(q.text)];
}

function corrigerLaquelle(q: Q): string[] {
  if (!INTROS_DEPENDANCE.test(q.text)) return ["situation inconnue du correcteur"];
  return qcmUnique(q, (c) => !SANS_EFFET.test(c));
}

function corrigerIntruse(q: Q): string[] {
  return qcmUnique(q, (c) => NE_DETERMINE_PAS.includes(c));
}

function corrigerProportionnel(q: Q): string[] {
  // Une seule donnée chiffrée : y = a × x (proportionnel). Deux : une part fixe s'ajoute.
  const ns = nombres(q.text);
  const prop = ns.length === 1;
  if (ns.length > 2 || ns.length === 0) return [`un ou deux nombres attendus, lus : ${ns.join(", ")}`];
  return qcmUnique(q, (c) => c === (prop ? "il y a dépendance et proportionnalité" : "il y a dépendance, mais pas proportionnalité"));
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_fonction_reconnaitre_tpl_1": corrigerDepend,
  "4e_fonction_reconnaitre_tpl_3_laquelle": corrigerLaquelle,
  "4e_fonction_reconnaitre_tpl_2_intruse": corrigerIntruse,
  "4e_fonction_reconnaitre_tpl_4_proportionnel": corrigerProportionnel,
  "4e_fonction_programme_tpl_1_appliquer": corrigerAller,
  "4e_fonction_programme_tpl_4_fleches": corrigerAller,
  "4e_fonction_programme_tpl_2_remonter": corrigerRetour,
  "4e_fonction_programme_tpl_5_remonter_trois": corrigerRetour,
  "4e_fonction_programme_tpl_3_ordre": corrigerOrdre,
  "4e_fonction_programme_tpl_6_trois_etapes": corrigerAller,
  "4e_fonction_tableau_lire_tpl_1_valeur": corrigerLireImage,
  "4e_fonction_tableau_lire_tpl_4_releve": corrigerLireImage,
  "4e_fonction_tableau_lire_tpl_2_antecedent": corrigerLireAntecedent,
  "4e_fonction_tableau_lire_tpl_5_releve_inverse": corrigerLireAntecedent,
  "4e_fonction_tableau_lire_tpl_3_completer": corrigerCompleter,
  "4e_fonction_tableau_lire_tpl_6_prolonger": corrigerProlonger,
  "4e_fonction_graphique_lire_tpl_1_ordonnee": corrigerGrapheImage(false),
  "4e_fonction_graphique_lire_tpl_3_depart": corrigerGrapheImage(true),
  "4e_fonction_graphique_lire_tpl_2_abscisse": corrigerGrapheAntecedent(false),
  "4e_fonction_graphique_lire_tpl_4_abscisse_sans_aide": corrigerGrapheAntecedent(true),
  "4e_fonction_changer_mode_tpl_1_programme_tableau": corrigerProgrammeTableau,
  "4e_fonction_changer_mode_tpl_3_phrase_formule": corrigerPhraseFormule,
  "4e_fonction_changer_mode_tpl_2_tableau_programme": corrigerTableauProgramme,
  "4e_fonction_changer_mode_tpl_4_tableau_formule": corrigerTableauFormule,
  "4e_fonction_probleme_tpl_1_abonnement": corrigerAbonnement,
  "4e_fonction_probleme_tpl_2_remonter": corrigerRemonterProbleme,
  "4e_fonction_probleme_tpl_3_formule": corrigerFormule,
  "4e_fonction_probleme_tpl_4_diminue": corrigerDiminue,
  "4e_fonction_defi_tpl_1_comparer_offres": corrigerComparerOffres,
  "4e_fonction_defi_tpl_4_seuil": corrigerSeuil,
  "4e_fonction_defi_tpl_2_graphique_situation": corrigerGrapheProportion,
  "4e_fonction_defi_tpl_3_deux_sens": corrigerDeuxSens,
});
