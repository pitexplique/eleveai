import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE pourcentages.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les NOMBRES DU TEXTE que voit l'élève (« 25 % », le total, la
// fraction…), refait le calcul, et compare à la réponse attendue et aux
// propositions. Jamais la formule du gabarit. Vide = juste.
// Les outils de lecture sont exportés : proportionnalite.ts et echelles.ts
// s'en servent aussi.

// ─── Lecture du texte ───────────────────────────────────────────────────────

const RE_NB = /\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g;
const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));

/** « 1 234,5 € » → 1234.5 ; null si la chaîne ne commence pas par un nombre. */
export function lireNombre(s: string): number | null {
  const m = String(s).trim().match(/^(\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?)/);
  return m ? num(m[1]) : null;
}

/** Tous les nombres d'un texte, dans l'ordre. */
export function nombres(t: string): number[] {
  return (t.match(RE_NB) ?? []).map(num);
}

export const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Math.abs(a - b) < 1e-9;

/** La valeur de la réponse attendue (« 12 km » → 12). */
export const attendu = (q: TutorGeneratedQuestionV4) => lireNombre(String(q.expected?.[0] ?? ""));

/** L'unité écrite après le nombre dans la réponse attendue (« 12 km » → « km »). */
export const uniteAttendue = (q: TutorGeneratedQuestionV4) =>
  String(q.expected?.[0] ?? "").replace(/^[\d ,]+/, "").trim();

/** Exactement une proposition juste, et c'est l'attendue. */
export function qcmUnique(q: TutorGeneratedQuestionV4, juste: (c: string) => boolean): string[] {
  const p: string[] = [];
  const justes = (q.choices ?? []).filter(juste);
  if (justes.length !== 1) p.push(`${justes.length} proposition(s) juste(s) au lieu d'une : ${justes.join(" | ")}`);
  else if (justes[0] !== q.expected[0]) p.push(`la proposition juste « ${justes[0]} » n'est pas l'attendue « ${q.expected[0]} »`);
  return p;
}

/** ⛔ Plus aucun mot-clé purement numérique en `contains_keyword` (coordinateur, 06/10) : « 4 » acceptait « 14 », « 40 »… */
export function sansMotCleNumerique(q: TutorGeneratedQuestionV4): string[] {
  if (q.comparator !== "contains_keyword") return [];
  const nus = (q.expected ?? []).filter((m) => /^\s*\d+(?:[,.]\d+)?\s*%?\s*$/.test(String(m)));
  return nus.length ? [`mot-clé purement numérique en contains_keyword : ${nus.join(", ")} (écrire number_equal ou un QCM)`] : [];
}

/** Ajoute cette règle à chaque correcteur d'un fichier. */
export function avecRegleMotsCles(c: CorrecteursMaths): CorrecteursMaths {
  return Object.fromEntries(Object.entries(c).map(([id, f]) => [id, (q: TutorGeneratedQuestionV4) => [...sansMotCleNumerique(q), ...f(q)]]));
}

/** Les nombres suivis de « % » et les autres (hors fractions « a/b »), dans l'ordre. */
function donnees(t: string) {
  const pcts: number[] = [];
  const autres: number[] = [];
  const fractions: [number, number][] = [];
  const sansFrac = t.replace(/(\d+)\/(\d+)/g, (_, a, b) => {
    fractions.push([Number(a), Number(b)]);
    return " ";
  });
  for (const m of sansFrac.matchAll(RE_NB)) {
    const apres = sansFrac.slice(m.index! + m[0].length);
    (/^\s?%/.test(apres) ? pcts : autres).push(num(m[0]));
  }
  return { pcts, autres, fractions };
}

const entier = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
const valeurPct = (c: string) => (/^\d+(?:,\d+)? ?%$/.test(c.trim()) ? lireNombre(c) : null);

/** Réponse courte numérique : la valeur, entière, plausible. */
function verifierValeur(q: TutorGeneratedQuestionV4, juste: number, quoi: string): string[] {
  const p: string[] = [];
  if (!entier(juste)) p.push(`${quoi} ne tombe pas juste (${juste})`);
  if (!egal(attendu(q), juste)) p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} (${quoi})`);
  return p;
}

/** Plausibilité d'un total de collection. */
function totalPlausible(N: number | undefined): string[] {
  if (N == null) return ["aucun total dans le texte"];
  return N < 2 || N > 1000 ? [`total ${N} peu plausible`] : [];
}

// ─── Comprendre ─────────────────────────────────────────────────────────────

/** « p % » : sur combien ? (100) — ou « sur 100 …, combien ? » (p) — ou p % d'un total. */
function partDemandee(t: string): { valeur: number; quoi: string } | null {
  const { pcts, autres } = donnees(t);
  const p = pcts[0];
  if (p == null) return null;
  if (/sur combien|sur …|sur quel nombre/.test(t)) return { valeur: 100, quoi: "un pourcentage se lit sur 100" };
  const base = t.match(/(?:Sur|Pour|Imagine) (\d+) /)?.[1];
  const N = base != null ? Number(base) : autres[0];
  return { valeur: (p * N) / 100, quoi: `${p} % de ${N}` };
}

function corrigerComprendre(q: TutorGeneratedQuestionV4): string[] {
  const { pcts, autres } = donnees(q.text);
  const p: string[] = totalPlausible(autres[0]);
  if (pcts.length) {
    const d = partDemandee(q.text);
    if (!d) return [...p, "aucun pourcentage lisible"];
    return [...p, ...verifierValeur(q, d.valeur, d.quoi)];
  }
  // Pas de « % » dans le texte : on demande le pourcentage k sur N.
  const [N, k] = autres;
  return [...p, ...verifierValeur(q, (100 * k) / N, `${k} sur ${N} en pourcentage`)];
}

function corrigerSens(q: TutorGeneratedQuestionV4): string[] {
  const p = donnees(q.text).pcts[0];
  return qcmUnique(q, (c) => {
    const m = c.match(/^(\d+) .+ sur (\d[\d ]*)$/);
    return !!m && Number(m[1]) === p && num(m[2]) === 100;
  });
}

/** QCM « quel pourcentage ? » : k sur N. */
function corrigerQuelPct(q: TutorGeneratedQuestionV4): string[] {
  const { autres } = donnees(q.text);
  const [N, k] = autres;
  const juste = (100 * k) / N;
  const p = totalPlausible(N);
  if (!entier(juste)) p.push(`${k} sur ${N} ne fait pas un pourcentage entier`);
  return [...p, ...qcmUnique(q, (c) => egal(valeurPct(c), juste))];
}

// ─── Fractions ──────────────────────────────────────────────────────────────

const valeurFraction = (c: string) => {
  const m = c.match(/^(\d+)\/(\d+)/);
  return m ? Number(m[1]) / Number(m[2]) : null;
};

/** Le même pourcentage partout dans le texte, et un seul. */
function lePct(t: string): { p: number; pb: string[] } {
  const { pcts } = donnees(t);
  const pb = pcts.length && pcts.every((x) => x === pcts[0]) ? [] : [`pourcentages du texte incohérents : ${pcts.join(", ")}`];
  return { p: pcts[0], pb };
}

function corrigerPctVersFraction(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  if (q.expected[0].replace(/ /g, "") !== `${p}/100`) pb.push(`attendu « ${q.expected[0]} » au lieu de ${p}/100`);
  return pb;
}

function corrigerCentVersPct(q: TutorGeneratedQuestionV4): string[] {
  const f = donnees(q.text).fractions[0];
  if (!f || f[1] !== 100) return ["pas de fraction sur 100 dans le texte"];
  return verifierValeur(q, f[0], `${f[0]}/100 en pourcentage`);
}

function corrigerQcmFraction(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  return [...pb, ...qcmUnique(q, (c) => egal(valeurFraction(c), p / 100))];
}

function corrigerFractionVersPct(q: TutorGeneratedQuestionV4): string[] {
  const { fractions, autres } = donnees(q.text);
  const f = fractions[0];
  if (!f) return ["pas de fraction dans le texte"];
  const pb: string[] = [];
  const N = autres[0];
  if (N != null && !entier((N * f[0]) / f[1])) pb.push(`${f[0]}/${f[1]} de ${N} ne tombe pas juste`);
  return [...pb, ...qcmUnique(q, (c) => egal(valeurPct(c), (100 * f[0]) / f[1]))];
}

// ─── Écriture décimale ──────────────────────────────────────────────────────

function corrigerPctVersDecimal(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  if (!/^\d+(,\d+)?$/.test(q.expected[0])) pb.push(`la réponse « ${q.expected[0]} » n'est pas un décimal écrit à la française`);
  if (!egal(attendu(q), p / 100)) pb.push(`attendu ${q.expected[0]} au lieu de ${p / 100}`);
  return pb;
}

function corrigerQcmDecimal(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  return [...pb, ...qcmUnique(q, (c) => egal(lireNombre(c), p / 100))];
}

function corrigerDecimalVersPct(q: TutorGeneratedQuestionV4): string[] {
  const d = q.text.match(/\d+,\d+/)?.[0];
  if (!d) return ["pas de nombre décimal dans le texte"];
  const v = num(d);
  if (v >= 1) return [`${d} n'est pas une part (plus grand que 1)`];
  return verifierValeur(q, Math.round(v * 1e6) / 1e4, `${d} en pourcentage`);
}

function corrigerEgalite(q: TutorGeneratedQuestionV4): string[] {
  return qcmUnique(q, (c) => {
    const m = c.match(/^(\d+) % = (\d+(?:,\d+)?)$/);
    return !!m && egal(num(m[2]), Number(m[1]) / 100);
  });
}

// ─── Lire un pourcentage dans une phrase ────────────────────────────────────

const echapper = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

/**
 * La question demande « combien de X <propriété> » : on cherche dans le texte
 * le pourcentage écrit devant CETTE propriété ; s'il n'y en a pas et qu'un seul
 * pourcentage est donné, c'est le complément à 100 %. Le total est le premier
 * nombre qui n'est pas un pourcentage.
 */
export function valeurCategorie(t: string): { valeur: number; quoi: string } | null {
  const { pcts, autres } = donnees(t);
  const derniere = t.slice(t.lastIndexOf(".", t.length - 2) + 1);
  const prop = derniere.match(/(?:[Cc]ombien (?:d’|de )\S+|qui) (.+?) ?[?.]$/)?.[1];
  const N = autres[0];
  if (!prop || N == null) return null;
  const m = t.match(new RegExp(`(\\d+) % (?:des \\S+ |de ces \\S+ )?${echapper(prop)}`));
  if (m) return { valeur: (Number(m[1]) * N) / 100, quoi: `${m[1]} % de ${N}` };
  if (pcts.length === 1) return { valeur: ((100 - pcts[0]) * N) / 100, quoi: `le reste : ${100 - pcts[0]} % de ${N}` };
  return null;
}

function corrigerCategorie(q: TutorGeneratedQuestionV4): string[] {
  const d = valeurCategorie(q.text);
  if (!d) return ["impossible de relier la question à une donnée du texte"];
  const pb = totalPlausible(donnees(q.text).autres[0]);
  if (q.format === "qcm") {
    if (!entier(d.valeur)) pb.push(`${d.quoi} ne tombe pas juste`);
    return [...pb, ...qcmUnique(q, (c) => egal(lireNombre(c), d.valeur))];
  }
  return [...pb, ...verifierValeur(q, d.valeur, d.quoi)];
}

const PARTS_MOTS: Record<string, number> = {
  "la moitié": 0.5,
  "le quart": 0.25,
  "les trois quarts": 0.75,
  "le dixième": 0.1,
  "le cinquième": 0.2,
};

function corrigerReduc(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  const inconnus = (q.choices ?? []).filter((c) => PARTS_MOTS[c] == null);
  if (inconnus.length) pb.push(`propositions illisibles : ${inconnus.join(" | ")}`);
  return [...pb, ...qcmUnique(q, (c) => egal(PARTS_MOTS[c], p / 100))];
}

// ─── Appliquer un pourcentage ───────────────────────────────────────────────

function corrigerApplique(q: TutorGeneratedQuestionV4): string[] {
  const nu = q.text.match(/(\d+) % de (\d+)/);
  if (nu) {
    const r = (Number(nu[1]) * Number(nu[2])) / 100;
    if (q.format === "qcm") return [...(entier(r) ? [] : ["ne tombe pas juste"]), ...qcmUnique(q, (c) => egal(lireNombre(c), r))];
    return verifierValeur(q, r, `${nu[1]} % de ${nu[2]}`);
  }
  return corrigerCategorie(q);
}

/** L'unité que demande la question (« Combien de kilomètres… » → km). */
function uniteDemandee(t: string): string | null {
  const q = t.slice(t.lastIndexOf(".", t.length - 2) + 1);
  const table: [RegExp, string][] = [
    [/kilogrammes/, "kg"],
    [/kilomètres/, "km"],
    [/centimètres/, "cm"],
    [/grammes/, "g"],
    [/minutes/, "min"],
    [/litres/, "L"],
    [/euros|coûte/, "€"],
    [/pages|points/, ""],
  ];
  for (const [re, u] of table) if (re.test(q)) return u;
  return null;
}

function corrigerQuantite(q: TutorGeneratedQuestionV4): string[] {
  const { pcts, autres } = donnees(q.text);
  const [p, n] = [pcts[0], autres[0]];
  if (p == null || n == null) return ["données illisibles"];
  const pb = verifierValeur(q, (p * n) / 100, `${p} % de ${n}`);
  const u = uniteDemandee(q.text);
  if (u == null) pb.push("la question ne dit pas ce qu'on cherche");
  else if (u !== uniteAttendue(q)) pb.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  // L'unité de la réponse est celle de la donnée.
  if (u && !new RegExp(`${n} ${u === "€" ? "€" : u}\\b|${n} ${u}`).test(q.text)) pb.push(`la donnée ${n} n'est pas en ${u}`);
  return pb;
}

// ─── Défis ──────────────────────────────────────────────────────────────────

const PARTS_DEFI: Record<string, number> = { ...PARTS_MOTS, "les deux cinquièmes": 0.4, "les trois dixièmes": 0.3 };

function corrigerPartEnMots(q: TutorGeneratedQuestionV4): string[] {
  const cles = Object.keys(PARTS_DEFI)
    .sort((a, b) => b.length - a.length)
    .filter((k) => q.text.includes(k));
  if (!cles.length) return ["aucune part en mots dans le texte"];
  return verifierValeur(q, Math.round(PARTS_DEFI[cles[0]] * 100), `${cles[0]} en pourcentage`);
}

/** La propriété sur laquelle porte la question (dernière phrase). */
function proprieteDemandee(t: string): string | undefined {
  const d = t.slice(t.lastIndexOf(".", t.length - 2) + 1).trim();
  return (
    d.match(/^(?:Quel pourcentage|Combien de pour cent) des \S+ (.+?) \?$/)?.[1] ??
    d.match(/qui (.+?)\.$/)?.[1] ??
    d.match(/^[Cc]ombien (?:d’|de )\S+ (.+?) \?$/)?.[1]
  );
}

/** « Quel pourcentage des X … ? » : depuis des effectifs (k sur N) ou depuis un pourcentage donné. */
function corrigerPctDemande(q: TutorGeneratedQuestionV4): string[] {
  const { pcts, autres } = donnees(q.text);
  const prop = proprieteDemandee(q.text);
  if (!prop) return ["question illisible"];
  const donne = new RegExp(`(\\d+)(?: %)? (?:des )?\\S+ ${echapper(prop)}`).exec(q.text.slice(0, q.text.lastIndexOf(".", q.text.length - 2)));
  const reste = q.text.includes(`Les autres ${prop}.`);
  if (pcts.length) {
    const p = pcts[0];
    const juste = donne && !reste ? p : 100 - p;
    return verifierValeur(q, juste, reste ? `100 − ${p}` : `${p} % lu`);
  }
  const [N, k] = autres;
  const effectif = reste ? N - k : k;
  return [...totalPlausible(N), ...verifierValeur(q, (100 * effectif) / N, `${effectif} sur ${N}`)];
}

function corrigerAvantRemise(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  const paye = Number(q.text.match(/(\d+) €/)?.[1]);
  const avant = (paye * 100) / (100 - p);
  if (!entier(avant)) pb.push(`prix de départ non entier : ${avant}`);
  if (avant > 400) pb.push(`prix de départ peu plausible : ${avant} €`);
  return [...pb, ...qcmUnique(q, (c) => egal(lireNombre(c), avant))];
}

function corrigerSoldes(q: TutorGeneratedQuestionV4): string[] {
  const { p, pb } = lePct(q.text);
  const prix = Number(q.text.match(/(\d+) €/)?.[1]);
  const nouveau = prix - (p * prix) / 100;
  if (!entier(nouveau)) pb.push(`nouveau prix non entier : ${nouveau}`);
  if (!/€$/.test(q.expected[0])) pb.push("la réponse n'est pas en euros");
  return [...pb, ...qcmUnique(q, (c) => egal(lireNombre(c), nouveau))];
}

function corrigerTroisGroupes(q: TutorGeneratedQuestionV4): string[] {
  const { pcts, autres } = donnees(q.text);
  const N = autres[0];
  if (pcts.length !== 2) return [`deux pourcentages attendus, lus : ${pcts.join(", ")}`];
  const reste = 100 - pcts[0] - pcts[1];
  if (reste <= 0) return [`les pourcentages dépassent 100 % (${pcts.join(" + ")})`];
  return [...totalPlausible(N), ...verifierValeur(q, (reste * N) / 100, `${reste} % de ${N}`)];
}

function corrigerComparer(q: TutorGeneratedQuestionV4): string[] {
  const c = q.choices ?? [];
  const purs = [...q.text.matchAll(/(\d+) % de (\d+)/g)];
  let vals: { choix: string; v: number }[] = [];
  if (purs.length >= 2) {
    vals = c
      .map((x) => x.match(/^(\d+) % de (\d+)$/))
      .filter((m): m is RegExpMatchArray => !!m)
      .map((m) => ({ choix: m[0], v: (Number(m[1]) * Number(m[2])) / 100 }));
  } else {
    const paires = [...q.text.matchAll(/compte (\d+) \S+ ; (\d+) %/g)].map((m) => (Number(m[1]) * Number(m[2])) / 100);
    const groupes = c
      .map((x) => ({ x, i: q.text.toLowerCase().indexOf(x.toLowerCase()) }))
      .filter((g) => g.i >= 0)
      .sort((a, b) => a.i - b.i);
    if (paires.length !== 2 || groupes.length !== 2) return ["les deux groupes ne se relisent pas"];
    vals = groupes.map((g, k) => ({ choix: g.x, v: paires[k] }));
  }
  if (vals.length !== 2) return ["deux propositions chiffrées attendues"];
  if (!vals.every((x) => entier(x.v))) return ["un des calculs ne tombe pas juste"];
  const egaux = c.find((x) => !vals.some((v) => v.choix === x));
  const juste = vals[0].v === vals[1].v ? egaux : vals[0].v > vals[1].v ? vals[0].choix : vals[1].choix;
  return qcmUnique(q, (x) => x === juste);
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  pourcentage_defi_tpl_1: corrigerPartEnMots,
  pourcentage_defi_qcm_tpl_1: corrigerAvantRemise,
  pourcentage_defi_tpl_complement_pct: corrigerPctDemande,
  pourcentage_defi_tpl_complement: corrigerPctDemande,
  pourcentage_defi_tpl_deux_etapes: corrigerCategorie,
  pourcentage_defi_qcm_tpl_soldes: corrigerSoldes,
  pourcentage_defi_tpl_reste: corrigerTroisGroupes,
  pourcentage_defi_qcm_tpl_comparer: corrigerComparer,
  pourcentage_calcul_simple_tpl_1: corrigerApplique,
  pourcentage_calcul_simple_qcm_tpl_1: corrigerApplique,
  pourcentage_calcul_simple_tpl_contexte: corrigerApplique,
  pourcentage_calcul_simple_tpl_quantite: corrigerQuantite,
  pourcentage_calcul_simple_tpl_quantite3: corrigerQuantite,
  pourcentage_lire_tpl_1: corrigerCategorie,
  pourcentage_lire_qcm_tpl_1: corrigerCategorie,
  pourcentage_lire_qcm_tpl_reduc: corrigerReduc,
  pourcentage_lire_tpl_reste: corrigerCategorie,
  pourcentage_decimal_tpl_1: corrigerPctVersDecimal,
  pourcentage_decimal_qcm_tpl_1: corrigerQcmDecimal,
  pourcentage_decimal_tpl_inverse: corrigerDecimalVersPct,
  pourcentage_decimal_qcm_tpl_egalite: corrigerEgalite,
  pourcentage_fraction_tpl_1: corrigerPctVersFraction,
  pourcentage_fraction_tpl_cent: corrigerCentVersPct,
  pourcentage_fraction_qcm_tpl_1: corrigerQcmFraction,
  pourcentage_fraction_qcm_tpl_simple: corrigerQcmFraction,
  pourcentage_fraction_qcm_tpl_fraction_vers_pourcentage: corrigerFractionVersPct,
  pourcentage_fraction_tpl_proportion: corrigerComprendre,
  pourcentage_comprendre_tpl_1: corrigerComprendre,
  pourcentage_comprendre_qcm_tpl_sens: corrigerSens,
  pourcentage_comprendre_qcm_tpl_1: corrigerQuelPct,
  pourcentage_comprendre_tpl_cent: corrigerComprendre,
});
