import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE frequences.bank.ts — 4e, notion proba_frequence
// (08/10/2026, voir 6e/maths/correcteurs/types.ts).
// Chacun relit ce que voit l'élève : l'EXPÉRIENCE décrite (dé, pièce, roue,
// sac, cartes, jetons, tableur, coffre… — la probabilité se recalcule à partir
// de la description ; punaise, bouchon, tartine, météo… n'en ont PAS : décision
// de Frédéric, elles ne sont pas équiprobables), le nombre d'essais, le nombre
// de succès, les fréquences écrites, le diagramme ou le tableau. Il refait le
// calcul — fréquence, nombre attendu, écart, loi binomiale pour juger un écart —
// et rend la liste des problèmes (vide = juste). Jamais la formule du gabarit.

type Q = TutorGeneratedQuestionV4;

// ─── Lecture ───────────────────────────────────────────────────────────────

/** Un nombre français : « 2 000 », « 12,5 ». */
const NB = String.raw`\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?`;
const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-6;
const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;

/** « 3/10 », « 0,3 », « 30 % », « 4 points » → valeur (un pourcentage reste en pourcentage). */
function valeur(s: string): number | null {
  const t = String(s).trim();
  const f = t.match(/^(\d+)\/(\d+)$/);
  if (f) return Number(f[1]) / Number(f[2]);
  const m = t.match(new RegExp(`^(${NB})(?:\\s*(?:%|points?))?$`));
  return m ? num(m[1]) : null;
}
const estFraction = (s: string) => /^\d+\/\d+$/.test(String(s).trim());
const pgcd = (a: number, b: number): number => (b === 0 ? a : pgcd(b, a % b));
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

/** Réponse courte numérique : TOUTES les écritures acceptées valent la bonne valeur. */
function reponse(q: Q, juste: number | null, quoi: string, opts: { pct?: boolean } = {}): string[] {
  if (juste == null || !Number.isFinite(juste)) return [`calcul impossible à refaire (${quoi})`];
  if (q.format === "qcm") return ["QCM inattendu pour une réponse numérique"];
  const p: string[] = [];
  for (const e of q.expected.map(String)) {
    const v = valeur(e);
    // Une fraction écrite à côté d'un pourcentage vaut la fréquence, pas le pourcentage.
    const vv = opts.pct && estFraction(e) ? (v ?? NaN) * 100 : v;
    if (!egal(vv, juste)) p.push(`attendu « ${e} », le texte donne ${juste} (${quoi})`);
  }
  if (opts.pct && !/%$/.test(String(q.expected[0]).trim())) p.push(`pourcentage demandé : « ${q.expected[0]} » sans « % »`);
  return p;
}

/**
 * La probabilité de l'issue, recalculée à partir de la DESCRIPTION de
 * l'expérience (null : situation non équiprobable — punaise, bouchon, météo…).
 */
function probaExperience(t: string): number | null {
  let m: RegExpMatchArray | null;
  if (/punaise|bouchon|gobelet|tartine|lancers francs|graines|ampoules|feu tricolore|dauphins|tirs au but|météo/.test(t)) return null;
  if ((m = t.match(/sac de (\d+) boules vertes et (\d+) boules jaunes/))) return Number(m[1]) / (Number(m[1]) + Number(m[2]));
  if ((m = t.match(/partagée en (\d+) secteurs égaux/))) return 1 / Number(m[1]);
  if ((m = t.match(/jetons numérotés de 1 à (\d+)/))) return 1 / Number(m[1]);
  if ((m = t.match(/une chance sur (\d+)/))) return 1 / Number(m[1]);
  if (/entier au hasard entre 1 et 10/.test(t)) return 1 / 10;
  if (/jeu de 32 cartes/.test(t) && /cœur/.test(t)) return 1 / 4;
  if (/4 faces/.test(t)) return 1 / 4;
  if (/pièce/.test(t) && /pile/.test(t)) return 1 / 2;
  // ⚠️ \b ne marche pas après « é » : on cherche « dé » entre deux espaces.
  const de = /(?:^|[\s'])dé(?=[\s,.])/i.test(t);
  if (de && /nombres? pairs?/.test(t)) return 1 / 2;
  if (de && /(cubique|six faces|jeu de société|dé équilibré)/.test(t)) return 1 / 6;
  return null;
}

/** La probabilité ÉCRITE dans l'énoncé (« vaut 1/6 », « est de 25 % », « probabilité 1/4 »). */
function probaEcrite(t: string): number | null {
  const m =
    t.match(/probabilité(?: de l'issue « [^»]+ »)? (?:vaut|est|de|a une probabilité de|,)? ?(\d+)\/(\d+)/) ??
    t.match(/a une probabilité de (\d+)\/(\d+)/) ??
    t.match(/probabilité,? (\d+)\/(\d+)/);
  if (m) return Number(m[1]) / Number(m[2]);
  const p = t.match(new RegExp(`probabilité est de (${NB}) %`));
  return p ? num(p[1]) / 100 : null;
}

/** Les phrases de RÉSULTAT : elles donnent le nombre de succès. */
const RES: RegExp[] = [
  /« [^»]+ » (NB) fois, « [^»]+ » (NB) fois/,
  /\ble \d+ (?:sort|est sorti) (NB) fois/i,
  /\bun nombre pair (?:sort|est sorti) (NB) fois/i,
  /(?:elle tombe|pièce est tombée) (NB) fois sur « pile »/i,
  /roue s'(?:arrête|est arrêtée) (NB) fois sur le rouge/i,
  /une boule verte (?:sort|est sortie) (NB) fois/i,
  /un cœur (?:sort|est sorti) (NB) fois/i,
  /le jeton n° \d+ (?:sort|est sorti) (NB) fois/i,
  /un objet rare (?:apparaît|est apparu) (NB) fois/i,
  /retomb(?:e|ée|é) (NB) fois (?:pointe en haut|sur le côté|debout)/i,
  /(?:atterrit|atterri) (NB) fois côté beurre/i,
  /\b(NB) (?:sont réussis|ont été réussis)/,
  /\b(NB) (?:d'entre elles germent|ont germé)/,
  /\b(NB) (?:sont défectueuses|étaient défectueuses)/,
  /le feu (?:est|était) rouge (NB) fois/i,
  /aperçus (NB) fois/i,
  /(?:part|parti) (NB) fois à droite/i,
  /il (?:pleut|a plu) (NB) jours/i,
  /obtient l'issue « [^»]+ » (NB) fois/,
  /on l'obtient (NB) fois/,
  /elle sort (NB) fois/,
].map((r) => new RegExp(r.source.replace(/NB/g, NB), r.flags));

const ESSAIS = "fois|lancers francs|lancers|graines|coffres|ampoules|matins|sorties|tirs|jours|tirages|passages|chutes|tours";

/** Nombre d'essais n et de succès k d'une série racontée. */
function serie(t: string): { n: number; k: number } | null {
  let k: number | null = null;
  let reste = t;
  let note: number | null = null;
  for (const r of RES) {
    const m = t.match(r);
    if (!m) continue;
    k = num(m[1]);
    if (m[2]) note = k + num(m[2]);
    reste = t.replace(m[0], " ");
    break;
  }
  if (k == null) return null;
  reste = reste.replace(new RegExp(`attendait(?: donc)? (${NB}) fois`, "g"), " ");
  const m = reste.match(new RegExp(`(${NB}) (?:${ESSAIS})\\b`));
  if (!m) return null;
  const n = num(m[1]);
  if (note != null && note !== n) return null;
  return { n, k };
}

/** P(X ≥ k) au-dessus de la moyenne, P(X ≤ k) au-dessous : X suit la loi binomiale (n, p). */
function queue(n: number, p: number, k: number): number {
  const lf = [0];
  for (let i = 1; i <= n; i++) lf[i] = lf[i - 1] + Math.log(i);
  const pmf = (i: number) => Math.exp(lf[n] - lf[i] - lf[n - i] + i * Math.log(p) + (n - i) * Math.log(1 - p));
  let s = 0;
  if (k >= n * p) for (let i = Math.ceil(k); i <= n; i++) s += pmf(i);
  else for (let i = 0; i <= Math.floor(k); i++) s += pmf(i);
  return Math.min(1, s);
}

/** L'expérience est-elle équiprobable, et la probabilité écrite est-elle la bonne ? */
function probaVerifiee(t: string, ecriteObligatoire = false): { p: number | null; pb: string[] } {
  const p = probaExperience(t);
  const e = probaEcrite(t);
  const pb: string[] = [];
  if (p == null) pb.push("expérience sans probabilité calculable (non équiprobable) ou illisible");
  if (ecriteObligatoire && e == null) pb.push("probabilité écrite illisible");
  if (p != null && e != null && !egal(p, e)) pb.push(`probabilité écrite ${e}, l'expérience donne ${p}`);
  return { p, pb };
}

/** La face surlignée du dé dessiné est bien la face de l'énoncé. */
function canvasDe(q: Q): string[] {
  const c = q.canvas as { kind?: string; variant?: string; de?: { surligne?: number[] } } | undefined;
  if (c?.kind !== "probabilites" || c.variant !== "de") return [];
  const s = c.de?.surligne ?? [];
  if (/nombres? pairs?/.test(q.text)) return s.join() === "2,4,6" ? [] : [`dé surligné ${s} pour « nombre pair »`];
  const f = q.text.match(/\ble (\d) (?:sort|est sorti)/i) ?? q.text.match(/« (\d) »/) ?? q.text.match(/\bdu (\d)\b/);
  return f && s.join() === f[1] ? [] : [`dé surligné ${s}, l'énoncé parle de ${f?.[1]}`];
}

// ─── proba_frequence_calculer ─────────────────────────────────────────────

function cFraction(q: Q): string[] {
  const s = serie(q.text);
  if (!s) return ["série illisible"];
  const { n, k } = s;
  const p: string[] = [];
  if (!(k > 0 && k < n)) p.push(`succès ${k} sur ${n} : pas plausible`);
  if (!estFraction(q.expected[0])) p.push(`fraction demandée, attendu « ${q.expected[0]} »`);
  return [...p, ...reponse(q, k / n, "fréquence"), ...canvasDe(q)];
}

function cEcriture(q: Q): string[] {
  const s = serie(q.text);
  if (!s) return ["série illisible"];
  const { n, k } = s;
  return [
    // Par la VALEUR : « 60/100 » à côté de « 30/50 » serait une seconde bonne réponse.
    ...qcmUnique(q, (c) => egal(estFraction(c) ? valeur(c) : (valeur(c) ?? NaN) / (/%/.test(c) ? 100 : 1), k / n)),
    ...(String(q.expected[0]) === `${k}/${n}` ? [] : [`attendu « ${q.expected[0]} » au lieu de ${k}/${n}`]),
    ...canvasDe(q),
  ];
}

function cDe(q: Q): string[] {
  const s = serie(q.text) ?? (() => {
    const k = q.text.match(new RegExp(`le \\d (?:sort|est sorti) (${NB}) fois`, "i"));
    const n = q.text.match(new RegExp(`Sur (${NB}) lancers`));
    return k && n ? { n: num(n[1]), k: num(k[1]) } : null;
  })();
  if (!s) return ["série illisible"];
  return [...reponse(q, (100 * s.k) / s.n, "fréquence en %", { pct: true }), ...canvasDe(q)];
}

const STEM = /(roug|bleu|vert|jaun|noir|violet)/;
const HEX: Record<string, string> = { "#dc2626": "roug", "#2563eb": "bleu", "#16a34a": "vert", "#facc15": "jaun", "#111827": "noir", "#7c3aed": "violet" };

function cBilles(q: Q): string[] {
  const [recit, ...qs] = q.text.split(/(?<=\.) (?=[A-ZÉ][^.]*\?)/);
  const question = qs.join(" ");
  const groupes = new Map<string, number>();
  for (const m of recit.matchAll(/(\d+) (?:\S+ )?(rouges|bleus|bleues|verts|vertes|jaunes|noirs|noires|violets|violettes)\b/g))
    groupes.set(m[2].match(STEM)![1], Number(m[1]));
  const tot = recit.match(/ de (\d+) (?:billes|jetons|boules|perles|bonbons|cubes)\b/);
  const autres = recit.match(/les autres sont (\S+)/);
  if (tot && autres && groupes.size === 1) groupes.set(autres[1].match(STEM)?.[1] ?? "?", Number(tot[1]) - [...groupes.values()][0]);
  if (groupes.size !== 2) return [`composition illisible : ${[...groupes].join(" ; ")}`];
  const total = [...groupes.values()].reduce((a, b) => a + b, 0);
  const cible = question.match(STEM)?.[1];
  if (!cible || !groupes.has(cible)) return [`couleur demandée illisible dans « ${question} »`];
  const juste = Math.round((1000 * groupes.get(cible)!) / total) / 10;
  const p: string[] = [];
  if (!entier(juste * 10) || !egal((100 * groupes.get(cible)!) / total, juste)) p.push(`fréquence ${(100 * groupes.get(cible)!) / total} % non exacte au dixième`);
  const c = q.canvas as { billes?: { elements: { couleur: string }[] } } | undefined;
  if (c?.billes) {
    const vus = new Map<string, number>();
    for (const e of c.billes.elements) vus.set(HEX[e.couleur] ?? e.couleur, (vus.get(HEX[e.couleur] ?? e.couleur) ?? 0) + 1);
    for (const [k, v] of groupes) if (vus.get(k) !== v) p.push(`dessin : ${vus.get(k) ?? 0} « ${k} » au lieu de ${v}`);
  }
  // Par la VALEUR : « 0,4 » à côté de « 40 % » serait une seconde bonne réponse.
  const enPct = (x: string) => (/%$/.test(x) ? valeur(x) : estFraction(x) ? (valeur(x) ?? NaN) * 100 : (valeur(x) ?? NaN) * 100);
  if (!/%$/.test(String(q.expected[0]))) p.push(`pourcentage demandé, attendu « ${q.expected[0]} »`);
  return [...p, ...qcmUnique(q, (x) => egal(enPct(x), juste))];
}

function cSituations(q: Q): string[] {
  const s = serie(q.text);
  if (!s) return ["série illisible"];
  const { n, k } = s;
  const p: string[] = [];
  if (/en pourcentage/.test(q.text)) return [...reponse(q, (100 * k) / n, "fréquence en %", { pct: true }), ...canvasDe(q)];
  if (/irréductible/.test(q.text)) {
    if (!irreductible(q.expected[0])) p.push(`fraction irréductible demandée, attendu « ${q.expected[0]} »`);
    return [...p, ...reponse(q, k / n, "fréquence"), ...canvasDe(q)];
  }
  if (/décima/.test(q.text)) {
    if (estFraction(q.expected[0])) p.push(`écriture décimale demandée, attendu « ${q.expected[0]} »`);
    return [...p, ...reponse(q, k / n, "fréquence"), ...canvasDe(q)];
  }
  return ["forme demandée illisible"];
}

function cEffectif(q: Q): string[] {
  const t = q.text;
  const n = t.match(new RegExp(`(${NB}) (?:${ESSAIS})\\b`));
  const f =
    t.match(new RegExp(`(?:est|a été) de (${NB}) %`)) ? num(t.match(new RegExp(`(?:est|a été) de (${NB}) %`))![1]) / 100
    : t.match(/est égale à (\d+)\/(\d+)/) ? Number(t.match(/est égale à (\d+)\/(\d+)/)![1]) / Number(t.match(/est égale à (\d+)\/(\d+)/)![2])
    : t.match(new RegExp(`vaut (${NB})\\.`)) ? num(t.match(new RegExp(`vaut (${NB})\\.`))![1])
    : null;
  if (!n || f == null) return ["énoncé illisible"];
  const k = f * num(n[1]);
  const p: string[] = [];
  if (!entier(k)) p.push(`effectif ${k} non entier`);
  if (!/ombien [^.]*\?$/.test(t)) p.push("question « Combien… ? » absente");
  return [...p, ...reponse(q, k, "effectif"), ...canvasDe(q)];
}

// ─── proba_frequence_comparer ─────────────────────────────────────────────

/** Nombre d'essais n, nombre observé o (phrase de résultat ou « on en observe »). */
function essaisObserves(t: string): { n: number; o: number } | null {
  const s = serie(t);
  if (s) return { n: s.n, o: s.k };
  const o = t.match(new RegExp(`(?:observe|obtient l'issue « [^»]+ ») (${NB})`));
  const reste = o ? t.replace(o[0], " ") : t;
  const n = reste
    .replace(new RegExp(`attendait(?: donc)? (${NB}) fois`, "g"), " ")
    .match(new RegExp(`(${NB}) (?:${ESSAIS})\\b`));
  return o && n ? { n: num(n[1]), o: num(o[1]) } : null;
}

/** Le nombre ATTENDU écrit dans l'énoncé. */
function attenduEcrit(t: string): number | null {
  const m = t.match(new RegExp(`(?:attendait(?: donc)?|au lieu des) (${NB})`));
  return m ? num(m[1]) : null;
}

/** Valeur de la (seule) fraction d'une proposition. */
const fractionDe = (c: string) => {
  const m = c.match(/(\d+)\/(\d+)/);
  return m ? Number(m[1]) / Number(m[2]) : null;
};

/** Un écart observé, et ce qu'en dit la loi binomiale. */
function jugerEcart(t: string, banal: boolean): { pb: string[]; n: number; p: number } | { pb: string[] } {
  const { p, pb } = probaVerifiee(t);
  const no = essaisObserves(t);
  if (p == null || !no) return { pb: [...pb, "essais ou observation illisibles"] };
  const { n, o } = no;
  const a = attenduEcrit(t);
  if (a != null && !egal(a, n * p)) pb.push(`attendu écrit ${a}, la probabilité donne ${n * p} sur ${n}`);
  if (!(o >= 0 && o <= n)) pb.push(`observé ${o} sur ${n} : impossible`);
  const qv = queue(n, p, o);
  if (banal && qv < 0.05) pb.push(`écart dit « normal » mais P = ${qv.toFixed(4)} (rare)`);
  if (!banal && qv >= 0.01) pb.push(`écart dit « suspect » mais P = ${qv.toFixed(4)} (banal)`);
  if (o === n * p) pb.push("aucun écart : la question n'a plus d'objet");
  return { pb, n, p };
}

function cHasard(q: Q): string[] {
  return [...jugerEcart(q.text, true).pb, ...qcmUnique(q, (c) => /^l'écart est normal/.test(c)), ...canvasDe(q)];
}

function cEcart(q: Q): string[] {
  const { p, pb } = probaVerifiee(q.text);
  const s = serie(q.text);
  if (p == null || !s) return [...pb, "série illisible"];
  const fObs = (100 * s.k) / s.n;
  const e = Math.abs(fObs - 100 * p);
  if (!entier(fObs)) pb.push(`fréquence observée ${fObs} % non entière`);
  const c = q.canvas as { data?: { label: string; value: number }[] } | undefined;
  if (c?.data && !(egal(c.data[0]?.value, 100 * p) && egal(c.data[1]?.value, fObs))) pb.push("diagramme incohérent avec l'énoncé");
  return [...pb, ...reponse(q, e, "écart en points")];
}

function cSituer(q: Q): string[] {
  const { p, pb } = probaVerifiee(q.text, true);
  const s = serie(q.text);
  if (p == null || !s) return [...pb, "série illisible"];
  const f = s.k / s.n;
  const mot = egal(f, p) ? "égale" : f > p ? "supérieure" : "inférieure";
  return [...pb, ...qcmUnique(q, (c) => c.startsWith(mot)), ...canvasDe(q)];
}

function cAttendu(q: Q): string[] {
  const { p, pb } = probaVerifiee(q.text);
  const n = q.text.match(new RegExp(`(${NB}) (?:${ESSAIS})\\b`));
  if (p == null || !n) return [...pb, "essais illisibles"];
  const a = num(n[1]) * p;
  if (!entier(a)) pb.push(`nombre attendu ${a} non entier`);
  return [...pb, ...reponse(q, a, "nombre attendu"), ...canvasDe(q)];
}

// ─── proba_frequence_repeter ──────────────────────────────────────────────

function cSerieLongue(q: Q): string[] {
  const { p, pb } = probaVerifiee(q.text);
  const fs = [...q.text.matchAll(new RegExp(`(${NB}) %`, "g"))].map((m) => num(m[1]));
  if (p == null || fs.length !== 3) return [...pb, `fréquences illisibles : ${fs}`];
  const d = fs.map((f) => Math.abs(f - 100 * p));
  if (!(d[2] < d[1] && d[1] < d[0])) pb.push(`l'écart ne se resserre pas : ${d.join(" ; ")}`);
  const c = q.canvas as { data?: { value: number }[] } | undefined;
  if (c?.data && !c.data.every((x, i) => Math.abs(x.value - fs[i]) < 0.051)) pb.push("diagramme incohérent avec les fréquences");
  return [
    ...pb,
    ...qcmUnique(q, (x) => {
      const m = x.match(new RegExp(`se rapproche de la probabilité, (${NB}) %`));
      return !!m && egal(num(m[1]), 100 * p);
    }),
  ];
}

const deQui = (x: string) => (/^[AEIOUÉÈÂ]/.test(x) ? `d'${x}` : `de ${x}`);

/** Français : élision devant une voyelle (pas devant Y), pas de parenthèses imbriquées. */
function francais(q: Q): string[] {
  const p: string[] = [];
  const tout = [q.text, ...(q.choices ?? [])].join(" ");
  if (/\([^()]*\(/.test(q.text)) p.push("parenthèses imbriquées dans l'énoncé");
  const m = tout.match(/\b(?:de|celle de|relevé de) ([AEIOUÉÈÂ][a-zéèëï]+)/) ?? tout.match(/\bd'(Y[a-z]+)/);
  if (m) p.push(`élision fautive : « ${m[0]} »`);
  return p;
}

function cChoisir(q: Q): string[] {
  const noms = (q.choices ?? []).map((c) => c.match(/^celle (?:de |d')(.+)$/)?.[1]).filter((x): x is string => !!x);
  if (noms.length !== 2) return ["deux prénoms attendus dans les propositions"];
  const tailles = new Map<string, number>();
  for (const seg of q.text.split(/[;.]| et (?=[A-ZÉ])|, (?=[A-ZÉ])/)) {
    const nom = noms.find((x) => seg.trim().startsWith(x + " "));
    const m = seg.match(new RegExp(`(${NB}) (?:${ESSAIS})\\b`));
    if (nom && m && !tailles.has(nom)) tailles.set(nom, num(m[1]));
  }
  if (tailles.size !== 2) return [`tailles illisibles : ${[...tailles]}`];
  const [a, b] = noms;
  const p: string[] = [];
  for (const x of noms) if (!q.choices!.includes(`celle ${deQui(x)}`)) p.push(`élision : « celle ${deQui(x)} » attendu`);
  const grand = tailles.get(a)! > tailles.get(b)! ? a : b;
  return [...p, ...qcmUnique(q, (c) => c === `celle ${deQui(grand)}`)];
}

function cEstimation(q: Q): string[] {
  const pb: string[] = [];
  if (probaExperience(q.text) != null) pb.push("expérience équiprobable : la probabilité se calcule, on ne l'estime pas");
  const paires = [...q.text.matchAll(new RegExp(`(${NB}) % (?:après|sur) (${NB})`, "g"))].map((m) => ({ f: num(m[1]), n: num(m[2]) }));
  if (paires.length !== 4) return [...pb, `relevés illisibles : ${paires.length}`];
  const best = paires.reduce((a, b) => (b.n > a.n ? b : a));
  return [...pb, ...qcmUnique(q, (c) => egal(valeur(c), best.f))];
}

function cMemoire(q: Q): string[] {
  const { p, pb } = probaVerifiee(q.text);
  if (p == null) return pb;
  return [
    ...pb,
    ...qcmUnique(q, (c) => /comme avant|vaut toujours|se trompe : la probabilité reste/.test(c) && egal(fractionDe(c), p)),
    ...(q.choices ?? []).filter((c) => /^\d+\/1$/.test(c) || /^(\d+)\/\1$/.test(c)).map((c) => `leurre mal écrit : « ${c} »`),
    ...(q.choices ?? []).filter((c) => !/comme avant/.test(c) && egal(valeur(c), p)).map((c) => `leurre égal à la probabilité : « ${c} »`),
  ];
}

// ─── proba_frequence_echantillon ──────────────────────────────────────────

function cPetit(q: Q): string[] {
  const j = jugerEcart(q.text, true);
  if (!("n" in j)) return j.pb;
  return [
    ...j.pb,
    ...qcmUnique(q, (c) => {
      const m = c.match(new RegExp(`^non : (?:sur )?(${NB}) .*(?:trop peu pour conclure|peut venir du hasard)`));
      return !!m && num(m[1]) === j.n;
    }),
  ];
}

function cTaille(q: Q): string[] {
  const ns = (q.choices ?? []).map((c) => c.match(new RegExp(`^celle sur (${NB}) `))?.[1]).filter((x): x is string => !!x);
  if (ns.length !== 3) return ["trois tailles attendues"];
  const p: string[] = [];
  for (const x of ns) if (!q.text.includes(x)) p.push(`la taille ${x} n'est pas dans l'énoncé`);
  const max = Math.max(...ns.map(num));
  return [...p, ...qcmUnique(q, (c) => (c.match(new RegExp(`^celle sur (${NB}) `)) ? num(c.match(new RegExp(`^celle sur (${NB}) `))![1]) === max : false))];
}

function cMemePourcentage(q: Q): string[] {
  const t = q.text;
  const p = probaExperience(t) ?? probaEcrite(t);
  const e = probaEcrite(t);
  const pb: string[] = [];
  if (p == null) return ["probabilité illisible"];
  if (e != null && !egal(e, p)) pb.push(`probabilité écrite ${e}, l'expérience donne ${p}`);
  const ns = [
    ...[...t.matchAll(new RegExp(`(${NB}) (?:${ESSAIS})\\b`, "g"))].map((m) => num(m[1])),
    ...[...t.matchAll(new RegExp(`l'autre sur (${NB})`, "g"))].map((m) => num(m[1])),
  ];
  const f = t.match(new RegExp(`(${NB}) %`));
  if (ns.length !== 2 || !f) return [...pb, `séries illisibles : ${ns}`];
  const [petit, grand] = [Math.min(...ns), Math.max(...ns)];
  const fo = num(f[1]) / 100;
  if (queue(petit, p, petit * fo) < 0.05) pb.push("la petite série est déjà suspecte");
  if (queue(grand, p, grand * fo) >= 0.01) pb.push("la grande série n'est pas suspecte");
  return [...pb, ...qcmUnique(q, (c) => {
    const m = c.match(new RegExp(`^la série de (${NB}) `));
    return !!m && num(m[1]) === grand;
  })];
}

function cSondage(q: Q): string[] {
  const t = q.text;
  const pc = t.match(new RegExp(`(${NB}) %`));
  const n = t.replace(pc?.[0] ?? "", " ").match(new RegExp(`(${NB})`));
  if (!pc || !n) return ["sondage illisible"];
  const k = (num(pc[1]) * num(n[1])) / 100;
  const pb: string[] = [];
  if (!entier(k)) pb.push(`${pc[1]} % de ${n[1]} n'est pas un nombre entier de cas`);
  if (num(n[1]) > 30) pb.push(`échantillon de ${n[1]} : pas si petit`);
  return [...pb, ...qcmUnique(q, (c) => /trop petit/.test(c))];
}

function cExces(q: Q): string[] {
  const { p, pb } = probaVerifiee(q.text);
  const n = q.text.match(new RegExp(`(${NB}) (?:${ESSAIS})\\b`));
  const pcs = [...q.text.matchAll(new RegExp(`(${NB}) %`, "g"))].map((m) => num(m[1]));
  if (p == null || !n || !pcs.length) return [...pb, "énoncé illisible"];
  if (pcs[1] != null && !egal(pcs[1], 100 * p)) pb.push(`probabilité écrite ${pcs[1]} %, l'expérience donne ${100 * p} %`);
  const N = num(n[1]);
  const exces = (N * pcs[0]) / 100 - N * p;
  if (!entier(exces) || exces <= 0) pb.push(`excès ${exces} : pas un entier positif`);
  return [...pb, ...reponse(q, exces, "excès")];
}

// ─── proba_frequence_defi ─────────────────────────────────────────────────

function cTruque(q: Q): string[] {
  return [...jugerEcart(q.text, false).pb, ...qcmUnique(q, (c) => /^oui : l'écart est trop grand/.test(c)), ...canvasDe(q)];
}

function cDeuxErreurs(q: Q): string[] {
  const j = jugerEcart(q.text, true);
  if (!("p" in j)) return j.pb;
  return [...j.pb, ...qcmUnique(q, (c) => /^aucun des deux/.test(c) && egal(fractionDe(c), j.p))];
}

function cEstimer(q: Q): string[] {
  const pb: string[] = [];
  if (probaExperience(q.text) != null) pb.push("expérience équiprobable : la probabilité se calcule");
  const s = serie(q.text);
  if (!s) return [...pb, "série illisible"];
  const f = (100 * s.k) / s.n;
  const c = q.canvas as { data?: { value: number }[] } | undefined;
  if (c?.data && !(egal(c.data[0]?.value, f) && egal(c.data[1]?.value, 100 - f))) pb.push("diagramme incohérent");
  return [...pb, ...reponse(q, f, "estimation en %", { pct: true })];
}

function cPrevoir(q: Q): string[] {
  const t = q.text;
  const pc = t.match(new RegExp(`(${NB}) %`));
  const dec = t.match(new RegExp(`fréquence de (0,\\d+)`));
  const f = pc ? num(pc[1]) / 100 : dec ? num(dec[1]) : null;
  const m = t.match(new RegExp(`(?:avec|[Ss]ur|sur) (${NB}) (?:autres|nouveaux)`));
  const pb: string[] = [];
  if (probaExperience(t) != null) pb.push("expérience équiprobable : la probabilité se calcule");
  if (f == null || !m) return [...pb, "énoncé illisible"];
  const prevu = f * num(m[1]);
  if (!entier(prevu)) pb.push(`prévision ${prevu} non entière`);
  return [...pb, ...reponse(q, prevu, "prévision")];
}

const BASE: CorrecteursMaths = avecRegleMotsCles({
  "4e_proba_frequence_comparer_tpl_1": cHasard,
  "4e_proba_frequence_comparer_tpl_2_ecart": cEcart,
  "4e_proba_frequence_comparer_tpl_3_situer": cSituer,
  "4e_proba_frequence_comparer_tpl_4_attendu": cAttendu,
  "4e_proba_frequence_repeter_tpl_1_serie": cSerieLongue,
  "4e_proba_frequence_repeter_tpl_2_choisir": cChoisir,
  "4e_proba_frequence_repeter_tpl_3_estimation": cEstimation,
  "4e_proba_frequence_repeter_tpl_4_memoire": cMemoire,
  "4e_proba_frequence_echantillon_tpl_3_petit": cPetit,
  "4e_proba_frequence_echantillon_tpl_4_taille": cTaille,
  "4e_proba_frequence_echantillon_tpl_1_meme_pourcentage": cMemePourcentage,
  "4e_proba_frequence_echantillon_tpl_2_sondage": cSondage,
  "4e_proba_frequence_echantillon_tpl_5_exces": cExces,
  "4e_proba_frequence_defi_tpl_1_de_truque": cTruque,
  "4e_proba_frequence_defi_tpl_2_deux_erreurs": cDeuxErreurs,
  "4e_proba_frequence_defi_tpl_3_estimer": cEstimer,
  "4e_proba_frequence_defi_tpl_4_prevoir": cPrevoir,
  "4e_proba_frequence_calculer_tpl_4_fraction": cFraction,
  "4e_proba_frequence_calculer_tpl_5_ecriture": cEcriture,
  "4e_proba_frequence_calculer_tpl_1_de": cDe,
  "4e_proba_frequence_calculer_tpl_2_billes": cBilles,
  "4e_proba_frequence_calculer_tpl_3_situations": cSituations,
  "4e_proba_frequence_calculer_tpl_6_effectif": cEffectif,
});

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(BASE).map(([id, f]) => [id, (q: Q) => [...francais(q), ...f(q)]]),
);
