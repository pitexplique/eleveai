import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE ordres-grandeur.bank.ts (notion ordre_grandeur, 08/10/2026).
// Ils relisent dans le TEXTE les mesures écrites avec leur préfixe (« 6 kilomètres »,
// « 500 milligrammes »), les objets du monde et les nombres des situations, puis
// refont le raisonnement avec LEURS PROPRES tables (valeurs réelles en unités de
// base, puissances des préfixes) : ordre de grandeur = exposant de l'écriture
// scientifique, produit = somme des exposants, quotient = différence, conversion
// = écart des exposants. Vide = juste.

type Q = TutorGeneratedQuestionV4;

const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
const num = (s: string) => Number(s.replace(/[  ]/g, "").replace(",", "."));
/** Égalité RELATIVE : 7 × 10⁻⁹ et 8 × 10⁻⁹ diffèrent, même s'ils sont tous deux minuscules. */
const proche = (a: number, b: number) => a === b || Math.abs(a - b) <= 1e-9 * Math.max(Math.abs(a), Math.abs(b));
/** L'exposant de l'écriture scientifique : 2 500 → 3 ; 0,02 → −2. */
const exposant = (v: number) => Math.floor(Math.log10(v) + 1e-9);

/** Le texte sans espaces insécables. */
const plat = (s: string) => String(s).replace(/[  ]/g, " ");

// ─── Préfixes et unités (table propre au correcteur) ───────────────────────

const PREF: Record<string, number> = { nano: -9, micro: -6, milli: -3, centi: -2, "": 0, kilo: 3, méga: 6, giga: 9 };
const BASES = "mètre|gramme|seconde|octet|watt|litre|hertz|volt";
// ⚠️ « diamètre » contient « mètre » : le mot d'unité commence au début d'un mot.
const MOT = `(?<![\\p{L}])(nano|micro|milli|centi|kilo|méga|giga)?(${BASES})(s?)(?![\\p{L}])`;

/** Les mots d'unité préfixés du texte, dans l'ordre : « kilomètre » → { e: 3, base: "mètre" }. */
function motsUnite(t: string): { e: number; base: string; mot: string; i: number }[] {
  return [...plat(t).matchAll(new RegExp(MOT, "gu"))].map((m) => ({ e: PREF[m[1] ?? ""], base: m[2], mot: m[0], i: m.index! }));
}

/** Les mesures « nombre + mot d'unité » : « 6 kilomètres » → { v: 6, e: 3, base: "mètre" }. */
function mesuresPrefixees(t: string): { v: number; e: number; base: string; mot: string }[] {
  return [...plat(t).matchAll(new RegExp(`${NB} ${MOT}`, "gu"))].map((m) => ({ v: num(m[1]), e: PREF[m[2] ?? ""], base: m[3], mot: m[0].slice(m[1].length + 1) }));
}

/** « $10^{-6}$ » → −6 (null si la proposition n'est pas une puissance de 10 écrite). */
const exposantEcrit = (c: string) => {
  const m = c.match(/\$10\^\{(-?\d+)\}\$/);
  return m ? Number(m[1]) : null;
};

const SUP: Record<string, string> = { "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4", "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9", "⁻": "-" };

/** La valeur d'une réponse écrite : « 4 000 », « 4,5 × 10^-9 », « 6. 10³ », « 10^3 », suivie ou non d'une unité permise. */
function valeurEcrite(s: string, unites: readonly string[]): number | null {
  let t = plat(s).trim();
  for (const u of [...unites].sort((a, b) => b.length - a.length))
    if (t.toLowerCase().endsWith(" " + u.toLowerCase())) {
      t = t.slice(0, t.length - u.length - 1).trim();
      break;
    }
  const simple = t.match(new RegExp(`^${NB}$`));
  if (simple) return num(simple[1]);
  const m = t.match(new RegExp(`^(?:${NB} ?(?:×|x|\\*|\\.) ?)?10(?:\\^\\(?\\{?([−-]?\\d+)\\}?\\)?|([⁻⁰¹²³⁴⁵⁶⁷⁸⁹]+))$`));
  if (!m) return null;
  const e = m[2] != null ? Number(m[2].replace("−", "-")) : Number(m[3].split("").map((c) => SUP[c]).join(""));
  return (m[1] ? num(m[1]) : 1) * Math.pow(10, e);
}

/** Toutes les écritures acceptées valent `juste` (avec une unité permise). */
function toutesValent(q: Q, juste: number, unites: readonly string[]): string[] {
  const p: string[] = [];
  for (const e of q.expected) {
    const v = valeurEcrite(e, unites);
    if (v == null || !proche(v, juste)) p.push(`écriture acceptée « ${e} » ≠ ${juste}`);
  }
  return p;
}

// ─── ordre_prefixe ──────────────────────────────────────────────────────────

/** Un mot préfixé : la puissance de 10 du préfixe (QCM). */
function corrigerPuissance(q: Q): string[] {
  const mots = motsUnite(q.text).filter((m) => m.e !== 0);
  const es = [...new Set(mots.map((m) => m.e))];
  if (es.length !== 1) return [`un seul préfixe attendu, lus : ${mots.map((m) => m.mot).join(", ")}`];
  const e = es[0];
  const p = [...(exposantEcrit(q.expected[0]) === e ? [] : [`attendu « ${q.expected[0]} », le préfixe vaut 10^${e}`]), ...qcmUnique(q, (c) => exposantEcrit(c) === e)];
  const pts = (q.canvas as { points?: { value: number; label: string }[] } | undefined)?.points ?? [];
  const surligne = pts.filter((x) => /←/.test(x.label)).map((x) => x.value);
  if (surligne.length !== 1 || surligne[0] !== e) p.push(`l'axe surligne ${surligne.join(", ")} au lieu de ${e}`);
  return p;
}

const SYMBOLES: Record<string, string> = { mètre: "m", gramme: "g", seconde: "s", octet: "o", watt: "W", litre: "L", hertz: "Hz", volt: "V" };

/** « 6 kilomètres … en mètres, en notation scientifique » : 6 × 10³. */
function corrigerConvertirSci(q: Q): string[] {
  const ms = mesuresPrefixees(q.text);
  if (ms.length !== 1) return [`une mesure préfixée attendue, lues : ${ms.map((m) => `${m.v} ${m.mot}`).join(", ")}`];
  const { v, e, base } = ms[0];
  const p: string[] = [];
  if (e === 0) p.push("la mesure n'a pas de préfixe");
  if (v < 1 || v >= 10) p.push(`${v} : la réponse « ${v} × 10^${e} » ne serait pas une notation scientifique`);
  // L'unité demandée est l'unité de base, au pluriel.
  const pl = base === "hertz" ? "hertz" : base + "s";
  if (!new RegExp(`(?:en|de|d'|d’) ?${pl}(?![\\p{L}])`, "iu").test(q.text)) p.push(`l'énoncé ne demande pas la conversion en ${pl}`);
  if (!/notation scientifique|a \\times 10\^\{n\}/.test(q.text)) p.push("l'énoncé ne demande pas la notation scientifique");
  const unites = [SYMBOLES[base], base + "s", base];
  p.push(...toutesValent(q, v * Math.pow(10, e), unites));
  if (!/× ?10/.test(q.expected[0])) p.push(`la première réponse « ${q.expected[0]} » n'est pas en notation scientifique`);
  return p;
}

/** Deux préfixes de la même unité : le rapport 10^(écart des exposants) (QCM). */
function corrigerComparerPrefixes(q: Q): string[] {
  const mots = motsUnite(q.text);
  if (mots.length !== 2 || mots[0].base !== mots[1].base || mots[0].e === mots[1].e)
    return [`deux préfixes distincts de la même unité attendus, lus : ${mots.map((m) => m.mot).join(", ")}`];
  const k = Math.abs(mots[0].e - mots[1].e);
  const p: string[] = [];
  const sens = q.text.match(/plus (grand|petit)/)?.[1];
  if (sens && (sens === "grand") !== mots[0].e > mots[1].e) p.push(`« plus ${sens} » est faux : ${mots[0].mot} contre ${mots[1].mot}`);
  p.push(...(exposantEcrit(q.expected[0]) === k ? [] : [`attendu « ${q.expected[0]} », l'écart vaut 10^${k}`]));
  p.push(...qcmUnique(q, (c) => exposantEcrit(c) === k));
  return p;
}

// ─── ordre_associer ─────────────────────────────────────────────────────────

// Valeurs réelles, en unité de base (m, kg, s, octets) : table propre au correcteur.
const MONDE: { nom: string; v: number; u: string; ul: string }[] = [
  { nom: "le diamètre d'un atome", v: 1e-10, u: "m", ul: "mètres" },
  { nom: "la taille d'un virus de la grippe", v: 1e-7, u: "m", ul: "mètres" },
  { nom: "la taille d'une bactérie", v: 2e-6, u: "m", ul: "mètres" },
  { nom: "le diamètre d'une alvéole pulmonaire", v: 2e-4, u: "m", ul: "mètres" },
  { nom: "l'épaisseur d'une pièce de 1 euro", v: 2.33e-3, u: "m", ul: "mètres" },
  { nom: "la longueur d'un stylo", v: 0.14, u: "m", ul: "mètres" },
  { nom: "la taille d'un adulte", v: 1.7, u: "m", ul: "mètres" },
  { nom: "la hauteur d'un immeuble de cinq étages", v: 15, u: "m", ul: "mètres" },
  { nom: "la longueur d'un terrain de football", v: 105, u: "m", ul: "mètres" },
  { nom: "l'altitude du puy de Dôme", v: 1465, u: "m", ul: "mètres" },
  { nom: "l'altitude du Piton des Neiges", v: 3070, u: "m", ul: "mètres" },
  { nom: "la distance d'un semi-marathon", v: 21097, u: "m", ul: "mètres" },
  { nom: "la longueur de la Loire", v: 1.006e6, u: "m", ul: "mètres" },
  { nom: "le diamètre de la Terre", v: 1.274e7, u: "m", ul: "mètres" },
  { nom: "la distance de la Terre au Soleil", v: 1.496e11, u: "m", ul: "mètres" },
  { nom: "la masse d'un grain de riz", v: 2.5e-5, u: "kg", ul: "kilogrammes" },
  { nom: "la masse d'une pièce de 1 centime", v: 2.3e-3, u: "kg", ul: "kilogrammes" },
  { nom: "la masse d'une baguette de pain", v: 0.25, u: "kg", ul: "kilogrammes" },
  { nom: "la masse d'un litre d'eau", v: 1, u: "kg", ul: "kilogrammes" },
  { nom: "la masse d'une voiture", v: 1200, u: "kg", ul: "kilogrammes" },
  { nom: "la masse d'un autobus", v: 12000, u: "kg", ul: "kilogrammes" },
  { nom: "la masse de la tour Eiffel", v: 1.01e7, u: "kg", ul: "kilogrammes" },
  { nom: "la durée d'un 100 mètres pour un sprinteur", v: 10, u: "s", ul: "secondes" },
  { nom: "la durée d'une mi-temps de football", v: 45 * 60, u: "s", ul: "secondes" },
  { nom: "la durée d'un mois de 30 jours", v: 30 * 24 * 3600, u: "s", ul: "secondes" },
  { nom: "la durée d'une vie de 80 ans", v: 80 * 365.25 * 24 * 3600, u: "s", ul: "secondes" },
  { nom: "la taille d'un SMS", v: 140, u: "octets", ul: "octets" },
];

/** Les objets de MONDE cités dans le texte, dans l'ordre d'apparition. */
function objetsCites(t: string) {
  const bas = plat(t).toLowerCase();
  // L'article change avec la phrase (« associe AU diamètre… ») : on cherche le nom sans lui.
  const sansArticle = (n: string) => n.toLowerCase().replace(/^(le |la |les |l')/, "");
  return MONDE.map((o) => ({ o, i: bas.indexOf(sansArticle(o.nom)) }))
    .filter((x) => x.i >= 0)
    // « la taille d'une bactérie » ne doit pas être lu dans un nom plus long.
    .filter((x, _, tous) => !tous.some((y) => y !== x && y.i <= x.i && y.i + y.o.nom.length >= x.i + x.o.nom.length && y.o.nom.length > x.o.nom.length))
    .sort((a, b) => a.i - b.i)
    .map((x) => x.o);
}

/** « environ $10^{-6}$ m » → { e: −6, u: "m" }. */
function ordreEcrit(c: string): { e: number; u: string } | null {
  const m = c.match(/^environ \$10\^\{(-?\d+)\}\$(?: (.+))?$/);
  return m ? { e: Number(m[1]), u: (m[2] ?? "").trim() } : null;
}

/** Un objet du monde : son ordre de grandeur dans l'unité demandée (QCM). */
function corrigerObjet(q: Q): string[] {
  const os = objetsCites(q.text);
  if (os.length !== 1) return [`un objet connu attendu, lus : ${os.map((o) => o.nom).join(", ")}`];
  const o = os[0];
  const p: string[] = [];
  if (!q.text.includes(`en ${o.ul}`)) p.push(`l'énoncé ne demande pas l'ordre de grandeur en ${o.ul}`);
  const e = exposant(o.v);
  const juste = (c: string) => {
    const r = ordreEcrit(c);
    return !!r && r.e === e && r.u === o.u;
  };
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} », ${o.nom} vaut environ ${o.v} ${o.u}, soit 10^${e}`);
  p.push(...qcmUnique(q, juste));
  return p;
}

/** Trois objets à ranger du plus petit au plus grand (QCM). */
function corrigerRanger(q: Q): string[] {
  const liste = plat(q.text).split(":").slice(1).join(":");
  const os = objetsCites(liste);
  if (os.length !== 3) return [`trois objets attendus, lus : ${os.map((o) => o.nom).join(", ")}`];
  if (new Set(os.map((o) => o.u)).size !== 1) return ["les trois grandeurs n'ont pas la même unité"];
  const tries = [...os].sort((a, b) => a.v - b.v);
  const p: string[] = [];
  if (new Set(tries.map((o) => exposant(o.v))).size !== 3) p.push("deux grandeurs du même rang : le rangement est ambigu");
  const juste = tries.map((o) => o.nom).join(" < ");
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », le bon rangement est « ${juste} »`);
  p.push(...qcmUnique(q, (c) => c === juste));
  const rows = (q.canvas as { rows?: { values: string[] }[] } | undefined)?.rows;
  if (rows && rows.map((r) => r.values[0]).join(" < ") !== juste) p.push("le tableau ne range pas les grandeurs dans le bon ordre");
  if (rows)
    for (let i = 0; i < rows.length; i++) {
      const [ordre, u] = rows[i].values[1].split(" ");
      const v = valeurEcrite(ordre, []);
      if (v == null || !proche(v, Math.pow(10, exposant(tries[i].v))) || u !== tries[i].u) p.push(`tableau : « ${rows[i].values[1]} » pour ${tries[i].nom}`);
    }
  return p;
}

// Populations (milieu des années 2020) : table propre au correcteur.
const HABITANTS: [string, number][] = [
  ["Paris", 2.1e6], ["Saint-Denis, à La Réunion", 1.53e5], ["Bordeaux", 2.6e5], ["Lille", 2.36e5], ["Grenoble", 1.57e5],
  ["la Belgique", 1.18e7], ["les Pays-Bas", 1.79e7], ["la Suède", 1.05e7], ["le Portugal", 1.05e7], ["l'Australie", 2.7e7],
  ["le Sénégal", 1.8e7], ["la Tunisie", 1.2e7], ["l'île Maurice", 1.26e6], ["le Japon", 1.24e8], ["le Brésil", 2.12e8],
  ["le Mexique", 1.3e8], ["la Chine", 1.41e9], ["l'Inde", 1.45e9], ["le continent africain", 1.5e9],
];
const DE_LIEU = (l: string) => (l.startsWith("le ") ? "du " + l.slice(3) : l.startsWith("les ") ? "des " + l.slice(4) : "de " + l);

/** La population d'un lieu : sa puissance de 10 (QCM). */
function corrigerPopulation(q: Q): string[] {
  const t = plat(q.text);
  const lus = HABITANTS.filter(([l]) => t.includes(DE_LIEU(l)) || t.startsWith(l.charAt(0).toUpperCase() + l.slice(1) + " :"));
  // « Saint-Denis, à La Réunion » contient « La Réunion » : on garde le plus long.
  const lieux = lus.filter(([l]) => !lus.some(([m]) => m !== l && m.includes(l)));
  if (lieux.length !== 1) return [`un lieu connu attendu, lus : ${lieux.map(([l]) => l).join(", ")}`];
  const e = exposant(lieux[0][1]);
  const juste = (c: string) => ordreEcrit(c)?.e === e && ordreEcrit(c)?.u === "";
  return [...(juste(q.expected[0]) ? [] : [`attendu « ${q.expected[0]} », ${lieux[0][0]} compte environ 10^${e} habitants`]), ...qcmUnique(q, juste)];
}

// ─── ordre_estimer ──────────────────────────────────────────────────────────

/** Les nombres de la situation (sans « puissance de 10 », ni la consigne « Réponds par 10, 100… », ni les formules). */
function nombresSituation(t: string): number[] {
  const s = plat(t)
    .replace(/\(Réponds par[^)]*\)/g, " ")
    .replace(/puissance de 10/g, " ")
    .replace(/\$[^$]*\$/g, " ")
    .replace(/\b4e\b/g, " ");
  return [...s.matchAll(new RegExp(NB, "g"))].map((m) => num(m[1]));
}

/** Un produit de deux nombres : l'ordre de grandeur = somme des exposants (QCM). */
function corrigerProduit(q: Q): string[] {
  const ns = nombresSituation(q.text);
  if (ns.length !== 2) return [`deux nombres attendus, lus : ${ns.join(", ")}`];
  const k = exposant(ns[0]) + exposant(ns[1]);
  const p: string[] = [];
  if (exposant(ns[0] * ns[1]) !== k) p.push(`le produit exact ${ns[0] * ns[1]} n'a pas l'ordre 10^${k} : estimation ambiguë`);
  const juste = (c: string) => ordreEcrit(c)?.e === k && ordreEcrit(c)?.u === "";
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} », le produit est de l'ordre de 10^${k}`);
  p.push(...qcmUnique(q, juste));
  return p;
}

/** Un montant total : la puissance de 10, en euros (réponse courte). */
function corrigerMontant(q: Q): string[] {
  const ns = nombresSituation(q.text);
  if (ns.length !== 2) return [`deux nombres attendus, lus : ${ns.join(", ")}`];
  const k = exposant(ns[0]) + exposant(ns[1]);
  const p: string[] = [];
  if (exposant(ns[0] * ns[1]) !== k) p.push(`le total exact ${ns[0] * ns[1]} n'a pas l'ordre 10^${k}`);
  if (!/en euros|d'euros/.test(q.text)) p.push("l'énoncé ne dit pas l'unité (euros)");
  if (!/€$/.test(q.expected[0])) p.push(`la réponse « ${q.expected[0]} » n'a pas son unité`);
  p.push(...toutesValent(q, Math.pow(10, k), ["€"]));
  if (q.comparator !== "number_equal") p.push("comparateur");
  return p;
}

// Qui divise qui : table propre au correcteur, lue sur les mots de la phrase.
const DIVISIONS: { re: RegExp; n: number; d: number }[] = [
  { re: new RegExp(`ses ${NB} livres sur des étagères de ${NB} livres`), n: 1, d: 2 },
  { re: new RegExp(`trajet de ${NB} km se fait en voiture à ${NB} km/h`), n: 1, d: 2 },
  { re: new RegExp(`budget de ${NB} € est partagé équitablement entre ${NB} associations`), n: 1, d: 2 },
  { re: new RegExp(`citerne de ${NB} litres se vide par un robinet qui débite ${NB} litres par minute`), n: 1, d: 2 },
  { re: new RegExp(`fichier de ${NB} mégaoctets se télécharge à ${NB} mégaoctets par seconde`), n: 1, d: 2 },
  { re: new RegExp(`récolte ${NB} kg de pommes de terre et les met en sacs de ${NB} kg`), n: 1, d: 2 },
  { re: new RegExp(`parcourt ${NB} mètres en ${NB} secondes`), n: 1, d: 2 },
  { re: new RegExp(`pays de ${NB} habitants compte ${NB} médecins`), n: 1, d: 2 },
  { re: new RegExp(`entreprise de ${NB} salariés réalise un chiffre d'affaires de ${NB} €`), n: 2, d: 1 },
  { re: new RegExp(`forêt de ${NB} arbres s'étend sur ${NB} hectares`), n: 1, d: 2 },
  { re: new RegExp(`festival de ${NB} spectateurs installe ${NB} points d'eau`), n: 1, d: 2 },
  { re: new RegExp(`piste cyclable de ${NB} m est éclairée par ${NB} lampadaires`), n: 1, d: 2 },
  { re: new RegExp(`conte de ${NB} mots est imprimé à raison de ${NB} mots par page`), n: 1, d: 2 },
  { re: new RegExp(`remplit ${NB} bouteilles en ${NB} heures`), n: 1, d: 2 },
  { re: new RegExp(`pile de ${NB} feuilles de papier mesure ${NB} mm`), n: 2, d: 1 },
  { re: new RegExp(`sac de riz de ${NB} g contient environ ${NB} grains`), n: 1, d: 2 },
  { re: new RegExp(`groupe de ${NB} amis partage une addition de ${NB} €`), n: 2, d: 1 },
];

/** Un quotient : l'ordre de grandeur = différence des exposants (QCM). */
function corrigerQuotient(q: Q): string[] {
  const t = plat(q.text);
  const lus = DIVISIONS.map((d) => ({ d, m: t.match(d.re) })).filter((x) => x.m);
  if (lus.length !== 1) return [`situation de division non reconnue : ${t}`];
  const { d, m } = lus[0];
  const n = num(m![d.n]);
  const de = num(m![d.d]);
  const k = exposant(n) - exposant(de);
  const p: string[] = [];
  if (exposant(n / de) !== k) p.push(`le quotient exact ${n / de} n'a pas l'ordre 10^${k} : estimation ambiguë`);
  const juste = (c: string) => ordreEcrit(c)?.e === k && ordreEcrit(c)?.u === "";
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} », ${n} ÷ ${de} est de l'ordre de 10^${k}`);
  p.push(...qcmUnique(q, juste));
  return p;
}

// ─── ordre_vraisemblance ────────────────────────────────────────────────────

/** Arrondi à un chiffre significatif : 48 → 50. */
const unChiffre = (x: number) => {
  const e = exposant(x);
  return Math.round(x / Math.pow(10, e)) * Math.pow(10, e);
};

/** Un produit annoncé, juste ou décalé d'un facteur 10 ou 100 : le verdict (QCM). */
function corrigerFacteurDix(q: Q): string[] {
  const t = plat(q.text);
  const a = t.match(new RegExp(`(?:et annonce|et trouvé|trouve| :) ${NB}`));
  if (!a) return ["résultat annoncé illisible"];
  const annonce = num(a[1]);
  const reste = t.slice(0, a.index!) + " " + t.slice(a.index! + a[0].length);
  const ns = [...reste.matchAll(new RegExp(NB, "g"))].map((m) => num(m[1]));
  if (ns.length !== 2) return [`deux nombres attendus dans le calcul, lus : ${ns.join(", ")}`];
  const exact = ns[0] * ns[1];
  const r = annonce / exact;
  const p: string[] = [];
  let juste: string;
  if (proche(r, 1)) juste = "plausible : le bon nombre de chiffres";
  else if (r >= 10 || r <= 0.1) juste = "faux : l'ordre de grandeur ne colle pas";
  else return [`annonce ${annonce} pour ${exact} : écart ambigu`];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », ${ns[0]} × ${ns[1]} = ${exact}, annoncé ${annonce}`);
  p.push(...qcmUnique(q, (c) => c === juste));
  const est = unChiffre(ns[0]) * unChiffre(ns[1]);
  const rows = (q.canvas as { rows?: { values: string[] }[] } | undefined)?.rows;
  const lu = rows?.[0]?.values[0]?.match(new RegExp(`≈ ${NB}`));
  if (!lu || !proche(num(lu[1]), est)) p.push(`le tableau n'annonce pas l'estimation ${est} (${rows?.[0]?.values[0]})`);
  if (rows && valeurEcrite(rows[0].values[1].replace(/ ?[^\d\s]+$/, ""), []) !== annonce) p.push("le tableau ne montre pas le résultat annoncé");
  return p;
}

/** Une valeur écrite avec son unité, ramenée à l'unité de base de sa grandeur. */
const FACTEURS: [RegExp, number, string][] = [
  [/^km\/h$/, 1, "vitesse"],
  [/^km$/, 1000, "longueur"],
  [/^kg$/, 1000, "masse"],
  [/^tonnes?$/, 1e6, "masse"],
  [/^heures?$/, 3600, "durée"],
  [/^minutes?$/, 60, "durée"],
  [/^€$/, 1, "prix"],
];
const GRANDEUR: Record<string, string> = { mètre: "longueur", gramme: "masse", seconde: "durée", litre: "volume", octet: "information", watt: "puissance", hertz: "fréquence", volt: "tension" };

function enBase(v: number, u: string): { x: number; g: string } | null {
  for (const [re, f, g] of FACTEURS) if (re.test(u)) return { x: v * f, g };
  const m = u.match(new RegExp(`^${MOT}$`, "u"));
  return m ? { x: v * Math.pow(10, PREF[m[1] ?? ""]), g: GRANDEUR[m[2]] } : null;
}

// Valeurs réelles (unités de base : m, g, s, L, €, km/h) : table propre au correcteur.
const REPERES: [string, number, string][] = [
  ["la masse d'un chat adulte", 4000, "masse"],
  ["la hauteur d'une porte d'appartement", 2.04, "longueur"],
  ["la longueur d'un crayon neuf", 0.175, "longueur"],
  ["la masse d'une pomme", 150, "masse"],
  ["la durée d'un film au cinéma", 2 * 3600, "durée"],
  ["la vitesse d'un cycliste en balade", 15, "vitesse"],
  ["le volume d'une grande bouteille d'eau", 1.5, "volume"],
  ["la longueur d'une piscine olympique", 50, "longueur"],
  ["la masse d'une voiture", 1.2e6, "masse"],
  ["le prix d'une baguette de pain", 1.1, "prix"],
  ["la hauteur d'un immeuble de dix étages", 30, "longueur"],
  ["l'épaisseur d'un téléphone portable", 0.008, "longueur"],
  ["la masse d'un éléphant d'Afrique adulte", 5e6, "masse"],
  ["la longueur d'une fourmi", 0.005, "longueur"],
  ["la vitesse d'un avion de ligne", 900, "vitesse"],
  ["le volume d'eau d'une baignoire pleine", 150, "volume"],
  ["la distance à vol d'oiseau entre Paris et Lyon", 392000, "longueur"],
  ["la taille d'une bactérie", 2e-6, "longueur"],
  ["la masse d'un nouveau-né", 3300, "masse"],
  ["l'altitude du Piton des Neiges", 3070, "longueur"],
  ["la longueur d'un terrain de football", 105, "longueur"],
  ["la durée d'une nuit de sommeil", 8 * 3600, "durée"],
  ["la masse d'un sac de ciment", 25000, "masse"],
  ["la hauteur de la tour Eiffel", 330, "longueur"],
  ["le volume d'une canette de soda", 0.33, "volume"],
];

const VERDICTS = {
  ok: "plausible : c'est le bon ordre de grandeur",
  grand: "absurde : beaucoup trop grand",
  petit: "absurde : beaucoup trop petit",
};

/** Une valeur annoncée pour un objet du monde : plausible, trop grande, trop petite (QCM). */
function corrigerSituation(q: Q): string[] {
  const t = plat(q.text);
  const objets = REPERES.filter(([o]) => t.toLowerCase().includes(o.toLowerCase()));
  if (objets.length !== 1) return [`un objet connu attendu, lus : ${objets.map(([o]) => o).join(", ")}`];
  const [obj, vrai, g] = objets[0];
  const sansObj = t.replace(new RegExp(obj.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), " ");
  const m = sansObj.match(new RegExp(`${NB} ((?:nano|micro|milli|centi|kilo)?(?:mètre|gramme|litre)s?|km/h|km|kg|tonnes?|heures?|minutes?|€)(?![\\p{L}])`, "u"));
  if (!m) return ["valeur annoncée illisible"];
  const lu = enBase(num(m[1]), m[2]);
  if (!lu || lu.g !== g) return [`unité « ${m[2]} » : pas une ${g}`];
  const r = lu.x / vrai;
  const cas = r >= 1 / 3 && r <= 3 ? "ok" : r >= 10 ? "grand" : r <= 0.1 ? "petit" : null;
  if (!cas) return [`${m[1]} ${m[2]} pour ${obj} : écart ambigu (× ${r})`];
  const juste = VERDICTS[cas];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », ${m[1]} ${m[2]} pour ${obj} est « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

// Valeurs réelles en unités de base (m, g, s, o, W, L, Hz, V) : table propre au correcteur.
const MESURES_REELLES: [string, number][] = [
  ["l'épaisseur d'une feuille de papier", 1e-4], ["la longueur d'une salle de classe", 8], ["la capacité d'une clé USB", 6.4e10],
  ["la taille d'une photo de téléphone", 3e6], ["la masse d'un sac de riz", 5000], ["la quantité de paracétamol dans un comprimé", 0.5],
  ["le temps d'un sprinteur sur 100 mètres", 10], ["la taille d'une bactérie", 2e-6], ["la taille d'un virus", 1e-7],
  ["la puissance d'une bouilloire", 2000], ["la puissance d'un réacteur de centrale nucléaire", 1e9], ["la fréquence du processeur d'un ordinateur", 3e9],
  ["la longueur d'un semi-marathon", 21097], ["la longueur d'une fourmi", 5e-3], ["le volume d'une cuillère à café", 5e-3],
  ["le volume d'une canette", 0.33], ["la tension d'une pile bâton", 1.5], ["la tension d'une prise électrique en France", 230],
  ["la durée d'un clignement d'œil", 0.3], ["l'épaisseur d'un cheveu", 7e-5], ["la masse d'un grain de riz", 0.025],
  ["la distance de la Terre à la Lune", 3.84e8], ["la masse d'une voiture", 1.2e6], ["la taille d'un courriel sans pièce jointe", 5000],
];
const UNITE_VERDICTS = {
  ok: "l'ordre de grandeur est cohérent",
  grand: "absurde : l'unité choisie est beaucoup trop grande",
  petit: "absurde : l'unité choisie est beaucoup trop petite",
};

/** Une mesure écrite avec un préfixe : unité cohérente, trop grande ou trop petite (QCM). */
function corrigerUnite(q: Q): string[] {
  const t = plat(q.text).toLowerCase();
  const lus = MESURES_REELLES.filter(([o]) => t.includes(o.toLowerCase()));
  const objets = lus.filter(([o]) => !lus.some(([p]) => p !== o && p.includes(o)));
  if (objets.length !== 1) return [`un objet connu attendu, lus : ${objets.map(([o]) => o).join(", ")}`];
  const [obj, vrai] = objets[0];
  const ms = mesuresPrefixees(plat(q.text).replace(new RegExp(obj.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), " "));
  if (ms.length !== 1) return [`une mesure attendue, lues : ${ms.map((m) => `${m.v} ${m.mot}`).join(", ")}`];
  const r = (ms[0].v * Math.pow(10, ms[0].e)) / vrai;
  const cas = r >= 0.1 && r <= 10 ? "ok" : r >= 100 ? "grand" : r <= 0.01 ? "petit" : null;
  if (!cas) return [`${ms[0].v} ${ms[0].mot} pour ${obj} : écart ambigu (× ${r})`];
  const juste = UNITE_VERDICTS[cas];
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », ${ms[0].v} ${ms[0].mot} pour ${obj} : « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

// ─── ordre_defi ─────────────────────────────────────────────────────────────

/** Deux objets du monde : combien de fois l'un est plus grand (10^écart des exposants, QCM). */
function corrigerCombienDeFois(q: Q): string[] {
  const os = objetsCites(q.text);
  if (os.length !== 2 || os[0].u !== os[1].u) return [`deux objets de même unité attendus, lus : ${os.map((o) => o.nom).join(", ")}`];
  const [grand, petit] = [...os].sort((a, b) => b.v - a.v);
  const k = exposant(grand.v) - exposant(petit.v);
  const p: string[] = [];
  if (k < 2) p.push(`écart de ${k} rang : trop serré pour un ordre de grandeur`);
  if (Math.abs(Math.log10(grand.v / petit.v) - k) > 1) p.push(`le vrai rapport ${grand.v / petit.v} est loin de 10^${k}`);
  // Le texte nomme bien le plus grand comme le plus grand.
  if (/plus grande? que/.test(q.text) && plat(q.text).toLowerCase().indexOf(grand.nom.toLowerCase()) > plat(q.text).toLowerCase().indexOf(petit.nom.toLowerCase()))
    p.push("le texte inverse le plus grand et le plus petit");
  const juste = (c: string) => {
    const m = c.match(/^environ \$10\^\{(-?\d+)\}\$( fois)?$/);
    return !!m && Number(m[1]) === k;
  };
  if (!juste(q.expected[0])) p.push(`attendu « ${q.expected[0]} », le rapport est 10^${k}`);
  p.push(...qcmUnique(q, juste));
  return p;
}

/** Une conversion annoncée fausse d'un facteur 1 000 : la bonne valeur et le diagnostic (QCM). */
function corrigerErreur(q: Q): string[] {
  const ms = mesuresPrefixees(q.text);
  if (ms.length !== 2 || ms[0].base !== ms[1].base) return [`deux mesures de même unité attendues, lues : ${ms.map((m) => `${m.v} ${m.mot}`).join(", ")}`];
  const [de, vers] = ms;
  const juste = de.v * Math.pow(10, de.e - vers.e);
  const p: string[] = [];
  if (de.e <= vers.e) p.push("la conversion ne va pas vers une unité plus petite");
  if (proche(vers.v, juste)) p.push("la conversion annoncée est juste : il n'y a pas d'erreur à trouver");
  const bon = (c: string) => {
    const m = plat(c).match(new RegExp(`^c'est ${NB} ${MOT} : (?:il manque un facteur ${NB}|il y a un facteur ${NB} de trop)$`, "u"));
    if (!m) return false;
    const v = num(m[1]);
    if (!proche(v, juste) || PREF[m[2] ?? ""] !== vers.e || m[3] !== de.base) return false;
    return m[5] != null ? proche(num(m[5]), juste / vers.v) && juste > vers.v : proche(num(m[6]), vers.v / juste) && vers.v > juste;
  };
  if (!bon(q.expected[0])) p.push(`attendu « ${q.expected[0]} », ${de.v} ${de.mot} = ${juste} ${vers.mot.replace(/^\d+ /, "")}`);
  p.push(...qcmUnique(q, bon));
  return p;
}

/** Une mesure à convertir vers un préfixe plus petit : la valeur, avec son unité. */
function corrigerConversionDefi(q: Q): string[] {
  // « le 100 mètres » est le nom d'une épreuve, pas une donnée.
  const t = plat(q.text).replace("le 100 mètres", "l'épreuve");
  const ms = mesuresPrefixees(t);
  if (ms.length !== 1) return [`une mesure attendue, lues : ${ms.map((m) => `${m.v} ${m.mot}`).join(", ")}`];
  const question = t.replace(new RegExp(`${NB} ${ms[0].mot}`), " ");
  const cibles = motsUnite(question).filter((m) => m.base === ms[0].base);
  if (cibles.length !== 1) return [`unité demandée illisible : ${question}`];
  const vers = cibles[0];
  const juste = ms[0].v * Math.pow(10, ms[0].e - vers.e);
  const p: string[] = [];
  if (vers.e >= ms[0].e) p.push("la conversion ne va pas vers une unité plus petite");
  if (Math.abs(juste - Math.round(juste)) > 1e-9) p.push(`${juste} n'est pas entier`);
  const sym = (Object.entries(PREF).find(([, e]) => e === vers.e)?.[0] ?? "") === "micro" ? "µ" : "";
  const unites = [vers.base, vers.base + "s", vers.mot.replace(/s$/, ""), vers.mot.replace(/s?$/, "s"), sym + SYMBOLES[vers.base]];
  const prefSym: Record<number, string> = { [-9]: "n", [-6]: "µ", [-3]: "m", 0: "", 3: "k", 6: "M", 9: "G" };
  unites.push(prefSym[vers.e] + SYMBOLES[vers.base]);
  p.push(...toutesValent(q, juste, unites));
  const e0 = plat(q.expected[0]).match(new RegExp(`^${NB} ${MOT}$`, "u"));
  if (!e0 || PREF[e0[2] ?? ""] !== vers.e) p.push(`la première réponse « ${q.expected[0]} » n'a pas l'unité demandée`);
  if (q.comparator !== "number_equal") p.push("comparateur");
  return p;
}

const CORRIGER: CorrecteursMaths = {
  "4e_ordre_prefixe_tpl_1_puissance": corrigerPuissance,
  "4e_ordre_prefixe_tpl_2_convertir": corrigerConvertirSci,
  "4e_ordre_prefixe_tpl_3_comparer": corrigerComparerPrefixes,
  "4e_ordre_associer_tpl_1_objet": corrigerObjet,
  "4e_ordre_associer_tpl_2_ranger": corrigerRanger,
  "4e_ordre_associer_tpl_3_population": corrigerPopulation,
  "4e_ordre_estimer_tpl_1_produit": corrigerProduit,
  "4e_ordre_estimer_tpl_2_situation": corrigerMontant,
  "4e_ordre_estimer_tpl_3_quotient": corrigerQuotient,
  "4e_ordre_vraisemblance_tpl_1_facteur_dix": corrigerFacteurDix,
  "4e_ordre_vraisemblance_tpl_2_situation": corrigerSituation,
  "4e_ordre_vraisemblance_tpl_3_unite": corrigerUnite,
  "4e_ordre_defi_tpl_1_combien_de_fois": corrigerCombienDeFois,
  "4e_ordre_defi_tpl_2_erreur_a_trouver": corrigerErreur,
  "4e_ordre_defi_tpl_3_prefixe_et_calcul": corrigerConversionDefi,
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles(CORRIGER);
