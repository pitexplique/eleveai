import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// LES CORRECTEURS DE decimaux.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les NOMBRES DU TEXTE que voit l'élève et refait le calcul, sans
// rien emprunter au gabarit. Vide = juste.

// ─── Lecture du texte ───────────────────────────────────────────────────────

const RE_NB = /\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g;

/** « 1 234,5 » → 1234.5 ; null si ce n'est pas un nombre. */
export function lireNombre(s: string): number | null {
  const m = s.trim().match(/^(\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?)/);
  return m ? Number(m[1].replace(/ /g, "").replace(",", ".")) : null;
}

/** Tous les nombres écrits dans un texte, dans l'ordre. */
export function nombres(t: string): number[] {
  return (t.match(RE_NB) ?? []).map((x) => Number(x.replace(/ /g, "").replace(",", ".")));
}

export const egal = (a: number | null | undefined, b: number | null | undefined) =>
  a != null && b != null && Math.abs(a - b) < 1e-9;

/** La valeur de la réponse attendue (« 3,45 m » → 3.45). */
export const attendu = (q: TutorGeneratedQuestionV4) => lireNombre(String(q.expected?.[0] ?? ""));

/** L'unité écrite après le nombre dans la réponse attendue (« 3,45 m » → « m »). */
export const uniteAttendue = (q: TutorGeneratedQuestionV4) =>
  String(q.expected?.[0] ?? "").replace(/^[\d ,]+/, "").trim();

const MOTS: Record<string, number> = { une: 1, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9 };
const RANGS: Record<string, number> = { unité: 1, dixième: 0.1, centième: 0.01, millième: 0.001 };

/** « trois unités et sept centièmes » → 3.07 ; null si aucun morceau reconnu. */
export function motsVersNombre(s: string): number | null {
  const re = /\b(une|un|deux|trois|quatre|cinq|six|sept|huit|neuf) (unité|dixième|centième|millième)s?(?![a-zàâéèêëîïôûü])/g;
  let total = 0;
  let vu = false;
  for (const m of s.matchAll(re)) {
    total += MOTS[m[1]] * RANGS[m[2]];
    vu = true;
  }
  return vu ? Math.round(total * 1e6) / 1e6 : null;
}

/** En QCM : les propositions dont la valeur vérifie `juste` — il en faut une seule, l'attendue. */
export function qcmUnique(q: TutorGeneratedQuestionV4, juste: (c: string) => boolean): string[] {
  const p: string[] = [];
  const justes = (q.choices ?? []).filter(juste);
  if (justes.length !== 1) p.push(`${justes.length} proposition(s) juste(s) au lieu d'une : ${justes.join(" | ")}`);
  else if (justes[0] !== q.expected[0]) p.push(`la proposition juste « ${justes[0]} » n'est pas l'attendue « ${q.expected[0]} »`);
  return p;
}

const UNITES_MOTS: Record<string, string> = {
  mètres: "m",
  kilogrammes: "kg",
  litres: "L",
  kilomètres: "km",
  secondes: "s",
  centimètres: "cm",
};

// ─── decimal_lire_ecrire ────────────────────────────────────────────────────

function valeurLireEcrire(t: string): { v: number | null; unite: string } {
  const mesure = t.match(/(\d+) (mètres|kilogrammes|litres|kilomètres|secondes|centimètres) et (\d+) (dixièmes|centièmes)/);
  if (mesure)
    return {
      v: Number(mesure[1]) + Number(mesure[3]) / (mesure[4] === "dixièmes" ? 10 : 100),
      unite: UNITES_MOTS[mesure[2]],
    };
  const deco = t.match(/(\d+) \+ (?:(\d+)\/10 \+ )?(\d+)\/100/);
  if (deco) return { v: Number(deco[1]) + Number(deco[2] ?? 0) / 10 + Number(deco[3]) / 100, unite: "" };
  const frac = t.match(/(\d+)\/(\d+)/);
  if (frac) return { v: Number(frac[1]) / Number(frac[2]), unite: "" };
  const lu = t.match(/nombre (\d+,\d+)/);
  if (lu) return { v: lireNombre(lu[1]), unite: "" };
  return { v: motsVersNombre(t), unite: "" };
}

function corrigerLireEcrire(q: TutorGeneratedQuestionV4): string[] {
  const p: string[] = [];
  const { v, unite } = valeurLireEcrire(q.text);
  if (v == null) return ["aucun nombre lisible dans l'énoncé"];
  if (q.format === "qcm") {
    return qcmUnique(q, (c) => egal(lireNombre(c) ?? motsVersNombre(c), v));
  }
  if (!egal(attendu(q), Math.round(v * 1e6) / 1e6)) p.push(`attendu ${q.expected[0]}, le texte donne ${v}`);
  if (unite !== uniteAttendue(q)) p.push(`unité attendue « ${uniteAttendue(q)} » au lieu de « ${unite} »`);
  return p;
}

// ─── decimal_rang ───────────────────────────────────────────────────────────

const ORDRE_RANGS = ["dizaine", "unité", "dixième", "centième", "millième"];

/** Le rang (« centième ») du caractère d'indice i dans « 12,764 ». */
function rangDuCaractere(ecrit: string, i: number): string | null {
  const v = ecrit.indexOf(",");
  const ecart = i < v ? v - i : -(i - v); // 1 = unités, 2 = dizaines, -1 = dixièmes…
  const k = ecart > 0 ? 2 - ecart : 1 - ecart;
  return ORDRE_RANGS[k] ?? null;
}

function corrigerRang(q: TutorGeneratedQuestionV4): string[] {
  const n = q.text.match(/\d+,\d+/)?.[0];
  if (!n) return ["aucun nombre à virgule dans l'énoncé"];
  const d = q.text.match(/chiffre (\d)(?![\d,])/)?.[1];
  if (d) {
    // On donne le chiffre, on demande son rang (ou sa valeur).
    const positions = [...n].map((c, i) => (c === d ? i : -1)).filter((i) => i >= 0);
    if (positions.length !== 1) return [`le chiffre ${d} apparaît ${positions.length} fois dans ${n}`];
    const rang = rangDuCaractere(n, positions[0]);
    return qcmUnique(q, (c) => c.replace(/s$/, "").endsWith(rang!) && (!/^\d/.test(c) || c.startsWith(`${d} `)));
  }
  const rang = q.text.match(/(dizaine|unité|dixième|centième|millième)s/)?.[1];
  if (!rang) return ["aucun rang demandé dans l'énoncé"];
  const i = [...n].findIndex((_, k) => n[k] !== "," && rangDuCaractere(n, k) === rang);
  if (i < 0) return [`${n} n'a pas de chiffre des ${rang}s`];
  return egal(attendu(q), Number(n[i])) ? [] : [`le chiffre des ${rang}s de ${n} est ${n[i]}, pas ${q.expected[0]}`];
}

// ─── decimal_comparer ───────────────────────────────────────────────────────

/** Le sens de la question : chercher le plus petit (temps, prix, « le moins ») ou le plus grand. */
function sensCherche(t: string): "min" | "max" | null {
  const phrases = t.split(/[.?]/).filter((s) => /plus|moins/.test(s));
  const q = phrases[phrases.length - 1] ?? "";
  if (/plus rapide|plus vite|le moins|plus léger|plus petit|plus petite/.test(q)) return "min";
  if (/plus loin|plus grand|plus grande|plus haut|plus lourd|le plus/.test(q)) return "max";
  return null;
}

/** Le premier nombre écrit après le prénom dans le texte. */
function nombreApres(t: string, nom: string): number | null {
  const i = t.indexOf(nom);
  if (i < 0) return null;
  return nombres(t.slice(i + nom.length))[0] ?? null;
}

function corrigerComparer(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  if (/ordre (dé)?croissant/.test(t)) {
    const donnes = nombres(t.slice(t.lastIndexOf(":") + 1)).sort((a, b) => a - b);
    const croissant = !/décroissant/.test(t);
    return qcmUnique(q, (c) => {
      const v = nombres(c);
      const trie = [...donnes].sort((a, b) => (croissant ? a - b : b - a));
      return v.length === trie.length && v.every((x, i) => egal(x, trie[i])) && c.includes(croissant ? "<" : ">");
    });
  }
  const ns = nombres(t);
  if (q.format === "qcm" && (q.choices ?? []).includes("<")) {
    if (ns.length !== 2) return [`${ns.length} nombres dans l'énoncé au lieu de 2`];
    const s = egal(ns[0], ns[1]) ? "=" : ns[0] > ns[1] ? ">" : "<";
    return qcmUnique(q, (c) => c === s);
  }
  const sens = sensCherche(t);
  if (!sens) return ["l'énoncé ne dit pas s'il faut le plus grand ou le plus petit"];
  if (q.format === "qcm") {
    // Duel de deux prénoms : la valeur de chacun est le premier nombre écrit après lui.
    const valeur = (c: string) => nombreApres(t, c.replace(/^celui (de |d')/, ""));
    const vals = (q.choices ?? []).map(valeur);
    if (vals.some((v) => v == null)) return ["une proposition n'a pas de nombre dans l'énoncé"];
    const best = sens === "max" ? Math.max(...(vals as number[])) : Math.min(...(vals as number[]));
    return qcmUnique(q, (c) => egal(valeur(c), best));
  }
  if (ns.length !== 2) return [`${ns.length} nombres dans l'énoncé au lieu de 2`];
  if (egal(ns[0], ns[1])) return ["les deux nombres sont égaux"];
  const rep = sens === "max" ? Math.max(...ns) : Math.min(...ns);
  const p: string[] = [];
  if (!egal(attendu(q), rep)) p.push(`attendu ${q.expected[0]} au lieu de ${rep}`);
  const u = t.match(/\d(?:,\d+)? (m|s|kg|€|cm|L|km)\b/)?.[1] ?? (t.includes(" €") ? "€" : "");
  if (u !== uniteAttendue(q)) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  return p;
}

// ─── decimal_defi ───────────────────────────────────────────────────────────

const POIDS: Record<string, number> = { dizaines: 10, unités: 1, dixièmes: 0.1, centièmes: 0.01, millièmes: 0.001 };
const lv = (s: string) => Number(s.replace(",", "."));
const r6 = (x: number) => Math.round(x * 1e6) / 1e6;

function valeurDefi(t: string): number | boolean | string {
  const indices = [...t.matchAll(/chiffre des (dizaines|unités|dixièmes|centièmes) est (\d)/g)];
  if (indices.length) return r6(indices.reduce((s, m) => s + POIDS[m[1]] * Number(m[2]), 0));

  const etiq = t.match(/étiquettes : ([\d, et]+), et une virgule/);
  if (etiq) {
    const chiffres = nombres(etiq[1]);
    const apres = /un seul chiffre/.test(t) ? 1 : /deux chiffres/.test(t) ? 2 : /trois chiffres/.test(t) ? 3 : 0;
    const grand = /plus grand/.test(t);
    const s = [...chiffres].sort((a, b) => (grand ? b - a : a - b)).join("");
    return lv(`${s.slice(0, s.length - apres)},${s.slice(s.length - apres)}`);
  }

  const dit = t.match(/« (.*) »/)?.[1];
  if (dit) {
    let m = dit.match(/(\d+,\d+) est plus grand que (\d+,\d+)/);
    if (m) return lv(m[1]) > lv(m[2]);
    m = dit.match(/(\d+,\d+) est égal à (\d+,\d+)/);
    if (m) return egal(lv(m[1]), lv(m[2]));
    m = dit.match(/aucun nombre entre (\d+,\d+) et (\d+,\d+)/);
    if (m) return egal(lv(m[1]), lv(m[2])); // entre deux décimaux différents, il y en a toujours
    const u = Number(dit.match(/compris entre (\d) et/)?.[1]);
    const t10 = /dixièmes est le double/.test(dit) ? 2 * u : /dixièmes est le triple/.test(dit) ? 3 * u : /dixièmes vaut un de plus/.test(dit) ? u + 1 : /dixièmes vaut un de moins/.test(dit) ? u - 1 : NaN;
    const c = /centièmes est la somme/.test(dit) ? u + t10 : /centièmes est le double de mon chiffre des dixièmes/.test(dit) ? 2 * t10 : /centièmes est la différence/.test(dit) ? t10 - u : /centièmes est égal à mon chiffre des unités/.test(dit) ? u : NaN;
    if (!(t10 >= 0 && t10 <= 9 && c >= 1 && c <= 9)) return "devinette impossible (un chiffre sort de 0 à 9)";
    return r6(u + t10 / 10 + c / 100);
  }

  let m = t.match(/deux chiffres après la virgule compris entre (\d+,\d+) et (\d+,\d+)/);
  if (m) return Math.round((lv(m[2]) - lv(m[1])) * 100) - 1;
  m = t.match(/plus petit nombre à deux chiffres après la virgule qui soit plus grand que (\d+(?:,\d+)?)/);
  if (m) return r6((Math.floor(r6(lv(m[1]) * 100)) + 1) / 100);
  m = t.match(/plus grand nombre à un chiffre après la virgule qui soit plus petit que (\d+(?:,\d+)?)/);
  if (m) return r6((Math.ceil(r6(lv(m[1]) * 10)) - 1) / 10);
  return "énoncé non reconnu";
}

function corrigerDefi(q: TutorGeneratedQuestionV4): string[] {
  const v = valeurDefi(q.text);
  if (typeof v === "string") return [v];
  if (typeof v === "boolean") return qcmUnique(q, (c) => (v ? /^(Vrai|Oui)$/ : /^(Faux|Non)$/).test(c));
  return egal(attendu(q), v) ? [] : [`attendu ${q.expected[0]}, le texte donne ${v}`];
}

// ─── decimal_arrondir ───────────────────────────────────────────────────────

/** L'arrondi au rang `dec`, 5 et plus on monte — refait sur des entiers. */
function arrondiRef(x: number, dec: number) {
  const f = 10 ** dec;
  return r6(Math.floor(r6(x * f) + 0.5) / f);
}

function rangDuTexte(t: string): number | null {
  if (/à l'unité|à l'euro près/.test(t)) return 0;
  if (/au dixième/.test(t)) return 1;
  if (/au centième/.test(t)) return 2;
  return null;
}

/** La figure : un zoom entre les deux voisins, le point au bon endroit. */
function verifierZoom(q: TutorGeneratedQuestionV4, n: number, dec: number): string[] {
  const c = q.canvas as any;
  if (!c) return [];
  const p: string[] = [];
  const f = 10 ** dec;
  const bas = r6(Math.floor(r6(n * f)) / f);
  if (!egal(c.min, bas) || !egal(c.max, r6(bas + 1 / f))) p.push(`la figure va de ${c.min} à ${c.max} au lieu des voisins ${bas} et ${r6(bas + 1 / f)}`);
  if (!c.points?.length || !egal(c.points[0].value, n)) p.push("le point de la figure n'est pas le nombre de l'énoncé");
  if ((c.max - c.min) / c.step > 6) p.push("trop de graduations sur la figure");
  return p;
}

function corrigerArrondir(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const dec = rangDuTexte(t);
  if (dec == null) return ["aucun rang d'arrondi dans l'énoncé"];
  const ns = nombres(t);
  if (/a pour arrondi|a arrondi un nombre|s'arrondit à/.test(t)) {
    const cible = ns[0];
    return qcmUnique(q, (c) => egal(arrondiRef(lireNombre(c) ?? NaN, dec), cible));
  }
  const n = ns[0];
  if (n == null || ns.length < 1) return ["aucun nombre dans l'énoncé"];
  const r = arrondiRef(n, dec);
  if (/et trouve (\d+(?:,\d+)?)/.test(t)) {
    const propose = lireNombre(t.match(/et trouve (\d+(?:,\d+)?)/)![1]);
    const juste = egal(propose, r);
    return qcmUnique(q, (c) => (juste ? /^Oui/ : /^Non/).test(c));
  }
  if (q.format === "qcm") return qcmUnique(q, (c) => egal(lireNombre(c), r));
  const p: string[] = [];
  if (!egal(attendu(q), r)) p.push(`l'arrondi de ${n} est ${r}, pas ${q.expected[0]}`);
  const u = t.match(/\d (€|km|s|m|kg|L|°C|cm)(?![a-z])/)?.[1] ?? "";
  if (u !== uniteAttendue(q)) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  return [...p, ...verifierZoom(q, n, dec)];
}

// ─── decimal_encadrer ───────────────────────────────────────────────────────

const NB_OU_TROU = String.raw`(…|\d+(?:,\d+)?)`;

function corrigerEncadrer(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const entre =
    t.match(/entre (\d+(?:,\d+)?)(?: [a-zA-Z]+)? et (\d+(?:,\d+)?)/) ?? t.match(/plus de (\d+(?:,\d+)?) [a-zA-Z]+ mais moins de (\d+(?:,\d+)?)/);
  if (entre && q.format === "qcm") {
    const [a, b] = [lv(entre[1]), lv(entre[2])];
    return qcmUnique(q, (c) => {
      const x = lireNombre(c);
      return x != null && x > a && x < b;
    });
  }
  const dec = rangDuTexte(t);
  if (dec == null) return ["aucun rang d'encadrement dans l'énoncé"];
  const pas = 10 ** -dec;
  if (q.format === "qcm") {
    const n = nombres(t)[0];
    return qcmUnique(q, (c) => {
      const [a, x, b] = nombres(c);
      return egal(x, n) && a < n && n < b && egal(r6(b - a), pas) && egal(r6(a * 10 ** dec), Math.round(a * 10 ** dec));
    });
  }
  const m = t.match(new RegExp(`${NB_OU_TROU} < (\\d+(?:,\\d+)?) < ${NB_OU_TROU}`));
  if (!m) return ["pas d'encadrement « … < n < … » dans l'énoncé"];
  const n = lv(m[2]);
  const bas = r6(Math.floor(r6(n / pas)) * pas);
  const haut = r6(bas + pas);
  const p: string[] = [];
  if (m[1] === "…") {
    if (!egal(lv(m[3]), haut)) p.push(`la borne donnée ${m[3]} n'est pas ${haut}`);
    if (!egal(attendu(q), bas)) p.push(`attendu ${q.expected[0]} au lieu de ${bas}`);
  } else {
    if (!egal(lv(m[1]), bas)) p.push(`la borne donnée ${m[1]} n'est pas ${bas}`);
    if (!egal(attendu(q), haut)) p.push(`attendu ${q.expected[0]} au lieu de ${haut}`);
  }
  if (egal(n, bas)) p.push("le nombre tombe sur une borne : rien à encadrer");
  return [...p, ...verifierZoom(q, n, dec)];
}

// ─── decimal_additionner ────────────────────────────────────────────────────

/** L'unité écrite juste après le premier nombre de l'énoncé (« 12,5 km » → « km »). */
function uniteDuTexte(t: string): string {
  return t.match(/\d (€|km|kg|cL|cm|mm|mL|L|m|s|g|°C)(?![a-zA-Zé])/)?.[1] ?? "";
}

/** Plausibilité grossière d'une mesure de la vie d'un enfant. */
function plausible(v: number, u: string): string[] {
  const max: Record<string, number> = { "€": 200, km: 600, kg: 100, L: 200, cL: 500, m: 2000, cm: 5000, s: 600, g: 5000, mL: 5000 };
  return v <= 0 || (max[u] != null && v > max[u]) ? [`${v} ${u} n'est pas plausible`] : [];
}

function verifierUnite(q: TutorGeneratedQuestionV4, valeur: number): string[] {
  const u = uniteDuTexte(q.text);
  const p: string[] = [];
  if (u !== uniteAttendue(q)) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  return [...p, ...plausible(valeur, u)];
}

function corrigerAddition(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  let rep: number;
  const egaliteATrou = t.match(/((?:…|\d+(?:,\d+)?)(?: \+ (?:…|\d+(?:,\d+)?))+) = (\d+(?:,\d+)?)/);
  const pense = t.match(/ajoute (\d+(?:,\d+)?), (?:il|elle) obtient (\d+(?:,\d+)?)/) ?? t.match(/ajouter à (\d+(?:,\d+)?) pour obtenir (\d+(?:,\d+)?)/);
  if (egaliteATrou && egaliteATrou[1].includes("…")) {
    rep = r6(lv(egaliteATrou[2]) - nombres(egaliteATrou[1]).reduce((s, x) => s + x, 0));
  } else if (pense) {
    rep = r6(lv(pense[2]) - lv(pense[1]));
  } else if (/en tout/.test(t) && /déjà/.test(t)) {
    const total = nombres(t.slice(0, t.indexOf("en tout"))).pop()!;
    const deja = nombres(t.slice(t.indexOf("déjà")))[0];
    rep = r6(total - deja);
  } else {
    rep = r6(nombres(t).reduce((s, x) => s + x, 0));
  }
  if (rep <= 0) return [`réponse négative ou nulle (${rep})`];
  const p = egal(attendu(q), rep) ? [] : [`attendu ${q.expected[0]} au lieu de ${rep}`];
  return [...p, ...verifierUnite(q, rep)];
}

// ─── decimal_multiplier ─────────────────────────────────────────────────────

function corrigerMultiplication(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const ns = nombres(t);
  let rep: number;
  const parCombien =
    t.match(/multiplier (\d+(?:,\d+)?) pour obtenir (\d[\d ]*(?:,\d+)?)/) ??
    t.match(/(\d+(?:,\d+)?) × … = (\d[\d ]*(?:,\d+)?)/) ??
    t.match(/multiplié (\d+(?:,\d+)?) et a obtenu (\d[\d ]*(?:,\d+)?)/);
  if (parCombien) {
    rep = r6(lireNombre(parCombien[2])! / lv(parCombien[1]));
    if (![10, 100, 1000].includes(rep)) return [`le facteur ${rep} n'est pas 10, 100 ou 1 000`];
  } else if (ns.length === 4) {
    rep = r6(ns[0] * ns[1] + ns[2] * ns[3]);
  } else if (ns.length === 2) {
    rep = r6(ns[0] * ns[1]);
  } else return [`${ns.length} nombres dans l'énoncé`];
  const p = egal(attendu(q), rep) ? [] : [`attendu ${q.expected[0]} au lieu de ${rep}`];
  if (/ajout\w* (un |des |deux |trois )?z[ée]ros?/i.test(q.explanation ?? "")) p.push("l'explication parle d'« ajouter un zéro » (décision de Frédéric du 05/10)");
  return [...p, ...verifierUnite(q, rep)];
}

// ─── decimal_diviser_par_entier ─────────────────────────────────────────────

const NB = String.raw`(\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?)`;

function corrigerDivision(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  let rep: number;
  const parCombien =
    t.match(new RegExp(`diviser ${NB} pour obtenir ${NB}`)) ??
    t.match(new RegExp(`divisé ${NB} et a obtenu ${NB}`)) ??
    t.match(new RegExp(`${NB} ÷ … = ${NB}`));
  const division = t.match(new RegExp(`${NB} ÷ ${NB}`));
  const trou = t.match(new RegExp(`${NB} × … = ${NB}`)) ?? t.match(new RegExp(`multiplié par ${NB}, donne ${NB}`)) ?? t.match(new RegExp(`multiplié par ${NB} donne ${NB}`));
  if (parCombien) {
    rep = r6(lireNombre(parCombien[1])! / lireNombre(parCombien[2])!);
    if (![10, 100, 1000].includes(rep)) return [`le diviseur ${rep} n'est pas 10, 100 ou 1 000`];
  } else if (division) rep = r6(lireNombre(division[1])! / lireNombre(division[2])!);
  else if (trou) rep = r6(lireNombre(trou[2])! / lireNombre(trou[1])!);
  else {
    const ns = nombres(t);
    if (ns.length !== 2) return [`${ns.length} nombres dans l'énoncé`];
    rep = r6(ns[0] / ns[1]);
  }
  // Le quotient doit tomber juste : un décimal qui s'écrit avec au plus quatre chiffres après la virgule.
  if (!egal(rep, Math.round(rep * 1e4) / 1e4)) return [`le quotient ${rep} ne tombe pas juste`];
  const p = egal(attendu(q), rep) ? [] : [`attendu ${q.expected[0]} au lieu de ${rep}`];
  return [...p, ...verifierUnite(q, rep)];
}

// ─── decimal_calcul_defi ────────────────────────────────────────────────────

function corrigerCalculDefi(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const ns = nombres(t);
  if (q.format === "qcm") {
    // Ordre de grandeur : la proposition la plus proche (en rapport) du produit exact.
    if (ns.length !== 2) return [`${ns.length} nombres dans l'énoncé`];
    const exact = ns[0] * ns[1];
    const ecart = (c: string) => Math.abs(Math.log10((lireNombre(c.replace(/^environ /, "")) ?? 1e-9) / exact));
    const best = Math.min(...(q.choices ?? []).map(ecart));
    if (best > Math.log10(2)) return ["aucune proposition n'est un bon ordre de grandeur"];
    return qcmUnique(q, (c) => ecart(c) === best);
  }
  let rep: number;
  const pct = t.match(/(\d+) %/);
  if (pct) {
    const taux = Number(pct[1]);
    const base = ns.find((x) => x !== taux || ns.filter((y) => y === x).length > 1)!;
    rep = r6((base * taux) / 100);
    if (/nouveau prix|au final/.test(t)) rep = r6(base - rep);
  } else if (/moitié/.test(t)) rep = r6(ns[0] / 2);
  else if (/quart/.test(t)) rep = r6(ns[0] / 4);
  else if (/double/.test(t)) rep = r6(ns[0] * 2);
  else return ["énoncé non reconnu"];
  const p = egal(attendu(q), rep) ? [] : [`attendu ${q.expected[0]} au lieu de ${rep}`];
  return [...p, ...verifierUnite(q, rep)];
}

// ─── decimal_multiplier_par_01 ──────────────────────────────────────────────

function evaluer(expr: string): number | null {
  const m = expr.match(new RegExp(`^${NB} ([×÷]) ${NB}$`));
  if (!m) return null;
  const [a, b] = [lireNombre(m[1])!, lireNombre(m[3])!];
  return r6(m[2] === "×" ? a * b : a / b);
}

function corrigerFois01(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const facteur =
    t.match(new RegExp(`${NB} × … = ${NB}`)) ??
    t.match(new RegExp(`multiplier ${NB} pour obtenir ${NB}`)) ??
    t.match(new RegExp(`multiplié ${NB} par 0,1, 0,01 ou 0,001 et a obtenu ${NB}`));
  if (facteur) {
    const f = r6(lireNombre(facteur[2])! / lireNombre(facteur[1])!);
    if (![0.1, 0.01, 0.001].includes(f)) return [`le facteur ${f} n'est ni 0,1, ni 0,01, ni 0,001`];
    return egal(attendu(q), f) ? [] : [`attendu ${q.expected[0]} au lieu de ${f}`];
  }
  if (q.format === "qcm") {
    const m = t.match(new RegExp(`${NB} × (0,0*1)`));
    if (!m) return ["pas de produit par 0,1 · 0,01 · 0,001 dans l'énoncé"];
    const n = lireNombre(m[1])!;
    const v = r6(n * lv(m[2]));
    if ((q.choices ?? []).some((c) => /plus petit|plus grand|égal/.test(c)))
      return qcmUnique(q, (c) => c.startsWith(v < n ? "plus petit" : v > n ? "plus grand" : "égal"));
    return qcmUnique(q, (c) => egal(evaluer(c), v));
  }
  const produit = t.match(new RegExp(`${NB} × ${NB}`));
  const ns = produit ? [lireNombre(produit[1])!, lireNombre(produit[2])!] : nombres(t);
  if (ns.length !== 2) return [`${ns.length} nombres dans l'énoncé`];
  if (![0.1, 0.01, 0.001].some((f) => ns.includes(f))) return ["aucun facteur 0,1 · 0,01 · 0,001 dans l'énoncé"];
  const rep = r6(ns[0] * ns[1]);
  const p = egal(attendu(q), rep) ? [] : [`attendu ${q.expected[0]} au lieu de ${rep}`];
  return [...p, ...verifierUnite(q, rep)];
}

const BASE: CorrecteursMaths = {
  decimal_mult01_tpl_et2: corrigerFois01,
  decimal_mult01_tpl_1: corrigerFois01,
  decimal_mult01_tpl_ouverte: corrigerFois01,
  decimal_calcul_defi_tpl_et1: corrigerCalculDefi,
  decimal_calcul_defi_tpl_et2: corrigerCalculDefi,
  decimal_calcul_defi_tpl_1: corrigerCalculDefi,
  decimal_calcul_defi_tpl_2: corrigerCalculDefi,
  decimal_divide_tpl_1: corrigerDivision,
  decimal_divide_tpl_2: corrigerDivision,
  decimal_divide_reunion_tpl_1: corrigerDivision,
  decimal_multiply_tpl_1: corrigerMultiplication,
  decimal_multiply_tpl_2: corrigerMultiplication,
  decimal_multiply_reunion_tpl_1: corrigerMultiplication,
  decimal_add_tpl_1: corrigerAddition,
  decimal_add_tpl_2: corrigerAddition,
  decimal_add_reunion_tpl_1: corrigerAddition,
  decimal_add_tpl_et5: corrigerAddition,
  decimal_encadrer_tpl_et2: corrigerEncadrer,
  decimal_encadrer_tpl_1: corrigerEncadrer,
  decimal_encadrer_tpl_ouverte: corrigerEncadrer,
  decimal_arrondir_tpl_et2: corrigerArrondir,
  decimal_arrondir_tpl_1: corrigerArrondir,
  decimal_arrondir_tpl_ouverte: corrigerArrondir,
  decimal_defi_tpl_et1: corrigerDefi,
  decimal_defi_tpl_et2: corrigerDefi,
  decimal_defi_tpl_1: corrigerDefi,
  decimal_defi_tpl_2: corrigerDefi,
  decimal_defi_tpl_et5: corrigerDefi,
  decimal_compare_tpl_1: corrigerComparer,
  decimal_compare_tpl_2: corrigerComparer,
  decimal_compare_qcm_tpl_1: corrigerComparer,
  decimal_compare_tpl_3: corrigerComparer,
  decimal_rang_tpl_1: corrigerRang,
  decimal_rang_tpl_2: corrigerRang,
  decimal_rang_tpl_3: corrigerRang,
  decimal_lire_ecrire_tpl_1: corrigerLireEcrire,
  decimal_lire_ecrire_tpl_2: corrigerLireEcrire,
  decimal_lire_ecrire_qcm_tpl_1: corrigerLireEcrire,
};

/**
 * ⛔ Décision de Frédéric (06/10/2026) : une mesure EN SITUATION (une unité
 * après un nombre, ou une demi-droite « graduée en km ») n'a jamais plus de
 * deux chiffres après la virgule — un lancer à 18,283 m n'existe pas. Trois
 * chiffres seulement en calcul nu. S'applique au texte, aux propositions et à
 * la réponse attendue.
 */
export function deuxDecimalesEnSituation(q: TutorGeneratedQuestionV4): string[] {
  const textes = [q.text, ...(q.choices ?? []), ...(q.expected ?? [])].map(String);
  const enSituation = textes.some((s) => /\d (€|km|kg|cL|cm|mm|mL|L|m|s|g|°C)(?![a-zA-Zé])/.test(s)) || /gradu(é|ée) en /.test(q.text);
  if (!enSituation) return [];
  const longs = textes.flatMap((s) => s.match(/\d+,\d{3,}/g) ?? []);
  return longs.length ? [`mesure en situation à plus de deux chiffres après la virgule : ${[...new Set(longs)].join(", ")}`] : [];
}

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(BASE).map(([id, corriger]) => [id, (q: TutorGeneratedQuestionV4) => [...corriger(q), ...deuxDecimalesEnSituation(q)]]),
);
