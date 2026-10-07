import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import {
  attendu,
  avecRegleMotsCles,
  egal,
  qcmUnique,
  uniteAttendue,
} from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE ratios.bank.ts (notion prop_ratio, 07/10/2026).
// Ils relisent dans le TEXTE le ratio (« le ratio filles : garçons est 2 : 3 »),
// les quantités (« 12 filles », « 40 kg de ciment », « 770 € »), et la figure
// quand il y en a une ; puis ils refont le calcul (simplifier, retour à une
// part, partage selon la somme des parts). Jamais la formule du gabarit.
// Vide = juste.

type Q = TutorGeneratedQuestionV4;

const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;

/** Les noms du ratio écrit en mots : « le ratio filles : garçons est… » → [filles, garçons]. */
function noms(t: string): string[] | null {
  const m = t.match(
    /ratio ((?:[^:,.?=0-9](?! :))*?[^:,.?=0-9 ]) : ((?:[^:,.?=0-9](?! :))*?[^:,.?=0-9 ])(?: : ((?:[^:,.?=0-9](?! :))*?[^:,.?=0-9 ]))?(?= est| vaut| =| doit|,| simplifié| \?| devient| devienne| sous| avec|\.)/,
  );
  if (!m) return null;
  return [m[1], m[2], m[3]].filter(Boolean).map((s) => s.trim());
}

/** Le premier ratio écrit en nombres, à deux ou trois termes : « 2 : 3 » ou « 2 : 3 : 7 ». */
function ratioNombres(t: string): number[] | null {
  const m = t.match(/(?<![\d,])(\d+) : (\d+)(?: : (\d+))?(?!\d|,\d)/);
  if (!m) return null;
  return [m[1], m[2], m[3]].filter(Boolean).map(Number);
}

/** La quantité écrite devant un nom : « 12 filles », « 40 kg de ciment », « 120 mL d'eau ». */
function quantite(t: string, nom: string): number | null {
  const re = new RegExp(`(?<![\\d,])(\\d+(?:,\\d+)?) (?:(?:kg|g|mL|cL|L|m²|€) )?(?:de |d')?${echapper(nom)}(?![a-zà-ü])`);
  const m = t.match(re);
  return m ? num(m[1]) : null;
}

/** « 2 : 3 » → [2, 3]. */
const lireRatio = (s: string) => s.split(":").map((x) => Number(x.trim()));
const memeRatio = (a: number[], b: number[]) => a.length === b.length && a.every((x, i) => x * b[0] === b[i] * a[0]);
const simplifie = (a: number[]) => a.reduce(pgcd) === 1;

/** Une réponse courte : la valeur, l'unité si l'énoncé en impose une. */
function verifierReponse(q: Q, juste: number, u: string): string[] {
  const p: string[] = [];
  if (!egal(attendu(q), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste}`);
  if (!entier(juste * 100)) p.push(`${juste} : plus de deux décimales`);
  if (u && uniteAttendue(q) !== u) p.push(`unité de la réponse « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  if (q.comparator !== "number_equal" && q.format !== "qcm") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}

/** L'unité de mesure collée à un nombre du texte (« 120 mL ») : la première trouvée. */
function uniteMesure(t: string): string {
  return t.match(/\d (kg|g|mL|cL|L|m²|€|km|m|cm|min|kWh)(?![a-zà-ü²])/)?.[1] ?? "";
}

// ─── prop_rapport ───────────────────────────────────────────────────────────

/** Deux quantités données : le ratio simplifié, dans l'ordre demandé. */
function corrigerExprimer(q: Q): string[] {
  const n = noms(q.text);
  if (!n || n.length !== 2) return [`ratio en mots illisible : ${q.text}`];
  const qa = quantite(q.text, n[0]);
  const qb = quantite(q.text, n[1]);
  if (qa == null || qb == null) return [`quantités illisibles pour « ${n[0]} » et « ${n[1]} »`];
  const g = pgcd(qa, qb);
  const juste = `${qa / g} : ${qb / g}`;
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste}`);
  p.push(...qcmUnique(q, (c) => memeRatio(lireRatio(c), [qa, qb]) && simplifie(lireRatio(c))));
  const data = (q.canvas as { data?: { label: string; value: number }[] } | undefined)?.data;
  if (data) {
    const v = (nom: string) => data.find((x) => x.label === nom)?.value;
    if (v(n[0]) !== qa || v(n[1]) !== qb) p.push(`le camembert ne montre pas ${qa} et ${qb}`);
  }
  return p;
}

/** Un ratio p : q et une quantité connue : l'autre quantité. */
function corrigerUtiliser(q: Q): string[] {
  const n = noms(q.text);
  const r = ratioNombres(q.text);
  if (!n || n.length !== 2 || !r || r.length !== 2) return [`ratio illisible : ${q.text}`];
  const qa = quantite(q.text, n[0]);
  const qb = quantite(q.text, n[1]);
  if ((qa == null) === (qb == null)) return [`il faut exactement une quantité connue (lues : ${qa}, ${qb})`];
  const juste = qa != null ? (qa / r[0]) * r[1] : (qb! / r[1]) * r[0];
  const connue = qa ?? qb!;
  const p = verifierReponse(q, juste, uniteMesure(q.text));
  if (!entier(connue / (qa != null ? r[0] : r[1]))) p.push("la quantité connue n'est pas un multiple de sa part");
  if (!entier(juste)) p.push(`réponse non entière : ${juste}`);
  return p;
}

/** Deux ratios : lequel est égal au ratio donné. */
function corrigerEgaux(q: Q): string[] {
  const r = ratioNombres(q.text);
  if (!r || r.length !== 2) return ["ratio illisible"];
  return qcmUnique(q, (c) => memeRatio(lireRatio(c), r));
}

// ─── prop_ratio_quotients ───────────────────────────────────────────────────

/** « x ÷ 6 = y ÷ 7 (= z ÷ 2) » → { x: 6, y: 7 } ; ou « x et y sont dans le ratio 6 : 7 ». */
function partsDesLettres(t: string): Record<string, number> | null {
  const m = t.match(/\b([a-z]) ÷ (\d+) = ([a-z]) ÷ (\d+)(?: = ([a-z]) ÷ (\d+))?/);
  if (m) {
    const r: Record<string, number> = { [m[1]]: Number(m[2]), [m[3]]: Number(m[4]) };
    if (m[5]) r[m[5]] = Number(m[6]);
    return r;
  }
  const l = t.match(/nombres ([a-z])(?:, ([a-z]))? et ([a-z]) sont dans le ratio/);
  const r = ratioNombres(t);
  if (!l || !r) return null;
  const lettres = [l[1], l[2], l[3]].filter(Boolean);
  if (lettres.length !== r.length) return null;
  return Object.fromEntries(lettres.map((x, i) => [x, r[i]]));
}

/** Une lettre connue (« x = 66 ») et une lettre cherchée (« que vaut y ? ») : la valeur cherchée. */
function corrigerLettreCherchee(q: Q): string[] {
  if (/\b\d+\s*\/\s*\d+\b|\b[a-z]\/\d/.test(q.text)) return ["barre de division dans l'énoncé"];
  const parts = partsDesLettres(q.text);
  const connue = q.text.match(/\b([a-z]) = (\d+)(?!\d)/);
  const cherchee = q.text.match(/(?:vaut|Calcule) ([a-z])\b/);
  if (!parts || !connue || !cherchee) return [`énoncé illisible : ${q.text}`];
  const K = connue[1];
  const U = cherchee[1];
  if (!(K in parts) || !(U in parts) || K === U) return [`lettres incohérentes (${K}, ${U})`];
  const commune = Number(connue[2]) / parts[K];
  if (!entier(commune)) return [`${connue[2]} n'est pas un multiple de ${parts[K]}`];
  return verifierReponse(q, commune * parts[U], "");
}

/** Une égalité de quotients : le ratio dans l'ordre demandé. */
function corrigerReconnaitre(q: Q): string[] {
  const parts = partsDesLettres(q.text);
  if (!parts) return ["égalité de quotients illisible"];
  let ordre: string[] | null = null;
  const lettres = q.text.match(/ratio ([a-z]) : ([a-z])\b/) ?? q.text.match(/ratio sont ([a-z]) et ([a-z])\b/);
  if (lettres) ordre = [lettres[1], lettres[2]];
  else {
    // « on note x le nombre de filles et y le nombre de garçons … le ratio filles : garçons »
    const n = noms(q.text.slice(q.text.lastIndexOf("ratio")));
    const notes = q.text.match(/on note ([a-z]) (.+?) et ([a-z]) (.+?)\./);
    if (!n || !notes) return ["ratio demandé illisible"];
    const lettreDe = (nom: string) =>
      new RegExp(`(?:de |d')${echapper(nom)}(?: \\(|$)`).test(notes[2]) ? notes[1] : new RegExp(`(?:de |d')${echapper(nom)}(?: \\(|$)`).test(notes[4]) ? notes[3] : null;
    const o = n.map(lettreDe);
    if (o.some((x) => !x)) return [`lettres des noms introuvables (${n.join(", ")})`];
    ordre = o as string[];
  }
  const juste = ordre.map((l) => parts[l]);
  if (juste.some((x) => x == null)) return ["lettre du ratio absente de l'égalité"];
  const p: string[] = [];
  if (q.expected[0] !== juste.join(" : ")) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste.join(" : ")}`);
  p.push(...qcmUnique(q, (c) => memeRatio(lireRatio(c), juste)));
  return p;
}

/** « $\frac{2}{9}$ » → 2/9. */
function lireFrac(s: string): number | null {
  const m = s.match(/^\$\\frac\{(\d+)\}\{(\d+)\}\$$/);
  return m ? Number(m[1]) / Number(m[2]) : null;
}

/** Ratio p : q : quelle fraction du TOTAL représente l'une des quantités. */
function corrigerFractionTotal(q: Q): string[] {
  const r = ratioNombres(q.text);
  if (!r || r.length !== 2) return ["ratio illisible"];
  const fin = q.text.slice(q.text.lastIndexOf(". ") + 2);
  let i: number;
  const lettres = q.text.match(/nombres ([a-z]) et ([a-z]) sont/);
  if (lettres) {
    const x = fin.match(/représente ([a-z]) \?$/)?.[1];
    i = x === lettres[1] ? 0 : x === lettres[2] ? 1 : -1;
  } else {
    const n = noms(q.text);
    if (!n || n.length !== 2) return ["noms du ratio illisibles"];
    const fini = (nom: string) => new RegExp(`(?:le |la |les |l'|au |à la |aux |à l')${echapper(nom)} \\?$`).test(fin);
    i = fini(n[0]) && !fini(n[1]) ? 0 : fini(n[1]) && !fini(n[0]) ? 1 : -1;
  }
  if (i < 0) return [`quantité demandée illisible : ${fin}`];
  const juste = r[i] / (r[0] + r[1]);
  const p: string[] = [];
  if (!egal(lireFrac(q.expected[0]), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${r[i]} sur ${r[0] + r[1]}`);
  if ((q.choices ?? []).some((c) => lireFrac(c) == null)) p.push("une proposition n'est pas une fraction posée");
  p.push(...qcmUnique(q, (c) => egal(lireFrac(c), juste)));
  const data = (q.canvas as { data?: { value: number }[] } | undefined)?.data;
  if (data && (data[0]?.value !== r[0] || data[1]?.value !== r[1])) p.push("le camembert ne montre pas le ratio du texte");
  return p;
}

// ─── prop_ratio_trois ───────────────────────────────────────────────────────

/** Ratio à trois termes, une quantité connue : une autre quantité. */
function corrigerTroisCalculer(q: Q): string[] {
  const r = ratioNombres(q.text);
  if (!r || r.length !== 3) return ["ratio à trois termes illisible"];
  if (/nombres [a-z], [a-z] et [a-z]/.test(q.text)) return corrigerLettreCherchee(q);
  const n = noms(q.text);
  if (!n || n.length !== 3) return [`trois noms attendus : ${q.text}`];
  const qs = n.map((x) => quantite(q.text, x));
  const connues = qs.flatMap((v, i) => (v == null ? [] : [i]));
  if (connues.length !== 1) return [`une seule quantité connue attendue (lues : ${qs.join(", ")})`];
  const i = connues[0];
  const fin = q.text.slice(q.text.lastIndexOf("ombien"));
  const j = n.findIndex((x) => new RegExp(`(?:de |d')${echapper(x)}(?:,| \\?)`).test(fin));
  if (j < 0 || j === i) return [`quantité demandée illisible : ${fin}`];
  const commune = qs[i]! / r[i];
  const p: string[] = [];
  if (!entier(commune)) p.push(`${qs[i]} n'est pas un multiple de ${r[i]}`);
  p.push(...verifierReponse(q, commune * r[j], uniteMesure(q.text)));
  const parts = (q.canvas as { parts?: { value?: string }[] } | undefined)?.parts;
  if (parts && parts[i]?.value !== String(qs[i])) p.push("la barre ne montre pas la quantité connue");
  return p;
}

/** Ratio à trois termes : l'égalité des trois quotients. */
function corrigerTroisEgalite(q: Q): string[] {
  const r = ratioNombres(q.text);
  const note = q.text.match(/on note ([a-z]) (.+?), ([a-z]) (.+?) et ([a-z]) (.+?)\./);
  const l = note ? [note[0], note[1], note[3], note[5]] : q.text.match(/\b([a-z]), ([a-z]) et ([a-z])\b/);
  if (!r || r.length !== 3 || !l) return ["ratio ou lettres illisibles"];
  if (note) {
    // Chaque lettre doit nommer la quantité du ratio à la même place.
    const n = noms(q.text.slice(q.text.indexOf("Le ratio")));
    if (!n || n.length !== 3) return ["noms du ratio illisibles"];
    const faux = [note[2], note[4], note[6]].findIndex((g, i) => !g.includes(n[i]));
    if (faux >= 0) return [`la lettre ${l[faux + 1]} ne nomme pas « ${n[faux]} »`];
  }
  const part: Record<string, number> = { [l[1]]: r[0], [l[2]]: r[1], [l[3]]: r[2] };
  const juste = (c: string) => {
    const m = c.match(/^([a-z]) ÷ (\d+) = ([a-z]) ÷ (\d+) = ([a-z]) ÷ (\d+)$/);
    return !!m && new Set([m[1], m[3], m[5]]).size === 3 && [1, 3, 5].every((k) => part[m[k]] === Number(m[k + 1]));
  };
  return qcmUnique(q, juste);
}

// ─── prop_ratio_partager (et le défi qui réunit deux parts) ─────────────────

/** Les bénéficiaires qu'on reconnaît sans prénom, par groupes, dans l'ordre où le texte les cite. */
const GROUPES = [
  ["4e A", "4e B"],
  ["potager", "pelouse"],
  ["tomates", "rosiers"],
  ["animaux", "forêt"],
  ["transport", "repas", "activités"],
  ["théâtre", "robotique", "chorale"],
];
const PAS_PRENOM = new Set(["Un", "Une", "Le", "La", "Les", "Au", "Aux", "Lors", "Pour", "Deux", "Trois", "Saint", "Denis", "On", "Ils", "Elles", "Combien", "Quel", "Quelle", "Que", "Dans", "Sur", "Une"]);
const ORDINAUX: [RegExp, number][] = [
  [/\b(?:premier|première)\b/, 0],
  [/\b(?:second|seconde|deuxième)\b/, 1],
  [/\btroisième\b/, 2],
];

/** Les bénéficiaires, dans l'ordre où la phrase de situation les cite. */
function roles(sit: string): string[] {
  const g = GROUPES.find((gr) => gr.every((x) => sit.includes(x)));
  if (g) return [...g].sort((x, y) => sit.indexOf(x) - sit.indexOf(y));
  const prenoms = [...sit.matchAll(/(?<![\p{L}-])\p{Lu}\p{Ll}+(?![\p{L}-])/gu)].map((m) => m[0]).filter((w) => !PAS_PRENOM.has(w));
  return [...new Set(prenoms)];
}

/** Les rangs des bénéficiaires cités dans un fragment, dans l'ordre du fragment. */
function rangsCites(fragment: string, liste: string[]): number[] {
  const trouves: { pos: number; rang: number }[] = [];
  // Par ordinaux : on découpe le fragment en morceaux « … la part de la première … et celle de la troisième … ».
  for (const morceau of fragment.split(/ et celle | et (?=la part|le|la)/)) {
    const pos = fragment.indexOf(morceau);
    const o = ORDINAUX.find(([re]) => re.test(morceau));
    if (o) {
      trouves.push({ pos, rang: o[1] });
      continue;
    }
    const nom = liste.find((x) => new RegExp(`(?<![\\p{L}])${echapper(x)}(?![\\p{L}])`, "u").test(morceau));
    if (nom) trouves.push({ pos: pos + morceau.indexOf(nom), rang: liste.indexOf(nom) });
  }
  return trouves.sort((a, b) => a.pos - b.pos).map((x) => x.rang);
}

const UNITES = "€|km|m²|m|kg|g|min|L|cm|élèves|kWh";

/** La situation (sans la question), son total « 770 € », son ratio. */
function partage(t: string) {
  const fin = t.lastIndexOf(". ");
  const sit = t.slice(0, fin + 1);
  const question = t.slice(fin + 2);
  const r = ratioNombres(sit);
  const sansRatio = sit.replace(/\d+ : \d+(?: : \d+)?/g, " ").replace(/4e [AB]/g, "    ");
  const totaux = [...sansRatio.matchAll(new RegExp(`(?<![\\d,])(\\d+) (${UNITES})(?![\\p{L}²])`, "gu"))];
  return { sit, question, r, totaux, sansRatio };
}

/** Un total partagé selon un ratio : la part de l'un. */
function corrigerPartage(q: Q): string[] {
  const { sit, question, r, totaux, sansRatio } = partage(q.text);
  if (!r) return ["ratio illisible"];
  if (totaux.length !== 1 || (sansRatio.match(/\d+/g) ?? []).length !== 1) return [`un seul total attendu dans « ${sit} »`];
  const total = Number(totaux[0][1]);
  const u = totaux[0][2];
  const liste = roles(sit);
  if (liste.length && liste.length !== r.length) return [`${liste.length} bénéficiaires lus (${liste.join(", ")}) pour un ratio à ${r.length} termes`];
  const rangs = rangsCites(question, liste);
  if (rangs.length !== 1) return [`bénéficiaire demandé illisible : ${question}`];
  const somme = r.reduce((a, b) => a + b, 0);
  const part = total / somme;
  const p: string[] = [];
  if (!entier(part)) p.push(`${total} ne se partage pas en ${somme} parts entières`);
  p.push(...verifierReponse(q, part * r[rangs[0]], u));
  const c = q.canvas as { total?: string } | undefined;
  if (c && c.total !== `${total} ${u}`) p.push(`la barre affiche le total « ${c.total} »`);
  return p;
}

/** Ratio et une part connue : le total. */
function corrigerRemonter(q: Q): string[] {
  const phrases = q.text.split(/(?<=\.) /);
  const sit = phrases[0];
  const r = ratioNombres(sit);
  if (!r || r.length !== 2) return ["ratio illisible"];
  const connu = phrases.slice(1).join(" ");
  const m = connu.replace(/4e [AB]/g, "    ").match(new RegExp(`(?<![\\d,])(\\d+) (${UNITES})(?![\\p{L}²])`, "u"));
  if (!m) return [`part connue illisible : ${connu}`];
  const liste = roles(sit);
  const rangs = rangsCites(connu.slice(0, connu.indexOf(m[0])), liste);
  if (rangs.length !== 1) return [`bénéficiaire connu illisible : ${connu}`];
  const part = Number(m[1]) / r[rangs[0]];
  const juste = part * (r[0] + r[1]);
  const p: string[] = [];
  if (!entier(part)) p.push(`${m[1]} n'est pas un multiple de ${r[rangs[0]]}`);
  const lire = (s: string) => s.match(/^(\d+) (.+)$/);
  const e = lire(q.expected[0]);
  if (!e || Number(e[1]) !== juste || e[2] !== m[2]) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} ${m[2]}`);
  p.push(...qcmUnique(q, (c) => Number(lire(c)?.[1]) === juste && lire(c)?.[2] === m[2]));
  return p;
}

/** Trois parts : la différence ou la somme de deux d'entre elles. */
function corrigerReunion(q: Q): string[] {
  const { sit, question, r, totaux } = partage(q.text);
  if (!r || r.length !== 3 || totaux.length !== 1) return ["ratio ou total illisible"];
  const total = Number(totaux[0][1]);
  const liste = roles(sit);
  if (liste.length && liste.length !== 3) return [`bénéficiaires lus : ${liste.join(", ")}`];
  const rangs = rangsCites(question.slice(question.indexOf("la part")), liste);
  if (rangs.length !== 2 || rangs[0] === rangs[1]) return [`deux bénéficiaires attendus : ${question}`];
  const part = total / (r[0] + r[1] + r[2]);
  const [x, y] = rangs.map((k) => r[k] * part);
  const juste = /différence/.test(question) ? Math.abs(x - y) : /ensemble/.test(question) ? x + y : NaN;
  if (Number.isNaN(juste)) return ["ni différence ni somme"];
  return verifierReponse(q, juste, totaux[0][2]);
}

// ─── prop_ratio_defi ────────────────────────────────────────────────────────

/** Ratio p : q et l'ÉCART entre les deux quantités : une quantité, ou le total. */
function corrigerEcart(q: Q): string[] {
  const n = noms(q.text);
  const r = ratioNombres(q.text);
  if (!n || n.length !== 2 || !r || r.length !== 2) return ["ratio illisible"];
  const m = q.text.match(/(\d+) (?:(?:kg|g|mL|cL|L) )?(?:de |d')?([^\d.,:]+?) de plus que (?:de |d')([^\d.,:]+?)[.,]/);
  if (!m) return ["écart illisible"];
  const iPlus = n.indexOf(m[2]);
  const iMoins = n.indexOf(m[3]);
  if (iPlus < 0 || iMoins < 0 || iPlus === iMoins) return [`écart entre « ${m[2]} » et « ${m[3]} » : noms inconnus`];
  if (r[iPlus] <= r[iMoins]) return [`« ${m[2]} » a moins de parts que « ${m[3]} » dans le ratio : il ne peut pas y en avoir plus`];
  const part = Number(m[1]) / (r[iPlus] - r[iMoins]);
  const vals = [r[0] * part, r[1] * part];
  const fin = q.text.slice(q.text.lastIndexOf(". ") + 2);
  let juste: number;
  if (/en tout|totale/.test(fin)) juste = vals[0] + vals[1];
  else {
    const i = n.findIndex((x) => new RegExp(`(?:de |d')${echapper(x)}(?:,| \\?)`).test(fin));
    if (i < 0) return [`quantité demandée illisible : ${fin}`];
    juste = vals[i];
  }
  const p: string[] = [];
  if (!entier(part)) p.push(`une part ne vaut pas un nombre entier (${part})`);
  p.push(...verifierReponse(q, juste, uniteMesure(q.text)));
  return p;
}

/** a : b = p : q et b : c = r : s : le ratio a : b : c simplifié. */
function corrigerEnchainer(q: Q): string[] {
  const n = noms(q.text.slice(q.text.lastIndexOf("ratio")));
  if (!n || n.length !== 3) return ["ratio à trois termes demandé illisible"];
  const lire = (x: string, y: string) => {
    const m = q.text.match(new RegExp(`${echapper(x)} : ${echapper(y)} (?:=|est) (\\d+) : (\\d+)`));
    return m ? [Number(m[1]), Number(m[2])] : null;
  };
  const ab = lire(n[0], n[1]);
  const bc = lire(n[1], n[2]);
  if (!ab || !bc) return ["les deux ratios donnés sont illisibles"];
  const brut = [ab[0] * bc[0], ab[1] * bc[0], ab[1] * bc[1]];
  const g = brut.reduce(pgcd);
  const juste = brut.map((x) => x / g);
  const p: string[] = [];
  if (q.expected[0] !== juste.join(" : ")) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste.join(" : ")}`);
  p.push(...qcmUnique(q, (c) => memeRatio(lireRatio(c), juste) && simplifie(lireRatio(c))));
  return p;
}

/** On AJOUTE d'une seule quantité pour atteindre un nouveau ratio. */
function corrigerAjouter(q: Q): string[] {
  const iDev = q.text.indexOf("devienne");
  if (iDev < 0) return ["nouveau ratio illisible"];
  const n = noms(q.text.slice(q.text.lastIndexOf("ratio", iDev)));
  const cible = ratioNombres(q.text.slice(iDev));
  if (!n || n.length !== 2 || !cible) return ["ratio cible illisible"];
  const ajoute = q.text.match(/(?:Combien|quantité) (?:de |d')(.+?) faut-il ajouter/)?.[1];
  const c = ajoute ? n.indexOf(ajoute) : -1;
  if (c < 0) return [`quantité à ajouter illisible (${ajoute})`];
  const o = 1 - c;
  const debut = q.text.slice(0, q.text.lastIndexOf(". ", iDev) + 1) || q.text.slice(0, q.text.search(/(?:Combien|Quelle quantité) [^?]*faut-il ajouter/));
  const qs = [quantite(debut, n[0]), quantite(debut, n[1])];
  const depart = ratioNombres(debut);
  if (qs[c] == null && qs[o] == null) return ["aucune quantité de départ"];
  // L'une manque : on la déduit du ratio de départ.
  if (qs[c] == null || qs[o] == null) {
    if (!depart) return ["ratio de départ absent"];
    const k = qs[c] != null ? c : o;
    const part = qs[k]! / depart[k];
    if (!entier(part)) return [`${qs[k]} n'est pas un multiple de ${depart[k]}`];
    qs[1 - k] = depart[1 - k] * part;
  }
  const nouveau = (qs[o]! / cible[o]) * cible[c];
  const juste = nouveau - qs[c]!;
  const p: string[] = [];
  if (!(juste > 0)) p.push(`il faudrait ajouter ${juste} : impossible`);
  if (!entier(nouveau)) p.push(`nouvelle quantité non entière (${nouveau})`);
  p.push(...verifierReponse(q, juste, uniteMesure(q.text)));
  return p;
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "4e_prop_ratio_defi_tpl_4_ecart": corrigerEcart,
  "4e_prop_ratio_defi_tpl_5_enchainer": corrigerEnchainer,
  "4e_prop_ratio_defi_tpl_6_ajouter": corrigerAjouter,
  "4e_prop_ratio_partager_tpl_1_deux_parts": corrigerPartage,
  "4e_prop_ratio_partager_tpl_2_trois_parts": corrigerPartage,
  "4e_prop_ratio_partager_tpl_3_remonter": corrigerRemonter,
  "4e_prop_ratio_defi_tpl_2_reunion": corrigerReunion,
  "4e_prop_ratio_quotients_tpl_1_trouver": corrigerLettreCherchee,
  "4e_prop_ratio_quotients_tpl_2_reconnaitre": corrigerReconnaitre,
  "4e_prop_ratio_quotients_tpl_3_fraction_du_total": corrigerFractionTotal,
  "4e_prop_ratio_trois_tpl_1_calculer": corrigerTroisCalculer,
  "4e_prop_ratio_trois_tpl_2_egalite": corrigerTroisEgalite,
  "4e_prop_rapport_tpl_1_exprimer": corrigerExprimer,
  "4e_prop_rapport_tpl_2_utiliser": corrigerUtiliser,
  "4e_prop_rapport_tpl_4_melange": corrigerUtiliser,
  "4e_prop_rapport_tpl_3_egaux": corrigerEgaux,
});
