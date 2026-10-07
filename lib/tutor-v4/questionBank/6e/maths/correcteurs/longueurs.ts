import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";

// Correcteurs des gabarits de longueurs.bank.ts (06/10/2026, voir types.ts).
// Chaque correcteur RELIT les longueurs écrites dans le texte (nombre + unité),
// refait la conversion ou le calcul, et compare à la réponse attendue.

type Q = TutorGeneratedQuestionV4;
export const UNITES_LONGUEUR: Record<string, number> = { mm: -3, cm: -2, dm: -1, m: 0, dam: 1, hm: 2, km: 3 };
const NOMS: Record<string, string> = {
  millimètre: "mm", centimètre: "cm", décimètre: "dm", mètre: "m",
  décamètre: "dam", hectomètre: "hm", kilomètre: "km",
};
export type Longueur = { v: number; u: string; i: number };

/** Un nombre écrit à la française : « 1 250,5 » → 1250.5. */
export const nombreFr = (s: string) => Number(String(s).replace(/[  ]/g, "").replace(",", "."));

/** Toutes les longueurs « nombre unité » du texte, dans l'ordre de lecture. */
export function longueursDuTexte(t: string): Longueur[] {
  const re = /(\d{1,3}(?:[  ]\d{3})+|\d+)(?:,(\d+))?\s*(km|hm|dam|dm|cm|mm|m)(?![a-zà-ÿ²³])/g;
  const out: Longueur[] = [];
  for (const m of t.matchAll(re)) out.push({ v: nombreFr(m[1] + (m[2] ? "," + m[2] : "")), u: m[3], i: m.index ?? 0 });
  return out;
}
/** La réponse attendue « 1 250 m » → { v, u }. */
export function longueurAttendue(s: string): { v: number; u: string } | null {
  const m = String(s).match(/^(\d{1,3}(?:[  ]\d{3})+|\d+)(?:,(\d+))?\s*(km|hm|dam|dm|cm|mm|m)$/);
  return m ? { v: nombreFr(m[1] + (m[2] ? "," + m[2] : "")), u: m[3] } : null;
}
export const enUnite = (v: number, de: string, vers: string) =>
  Math.round(v * 10 ** (UNITES_LONGUEUR[de] - UNITES_LONGUEUR[vers]) * 1e6) / 1e6;
const enMetres = (l: { v: number; u: string }) => enUnite(l.v, l.u, "m");
const egal = (a: number, b: number) => Math.abs(a - b) < 1e-6;
const decimales = (v: number) => (String(Math.round(v * 1e6) / 1e6).split(".")[1] ?? "").length;

/** L'unité cible nommée dans le texte (« en mètres », « en cm », « de centimètres »). */
export function uniteNommee(t: string, u: string) {
  const nom = Object.entries(NOMS).find(([, a]) => a === u)?.[0] ?? "";
  return new RegExp(`(?:^|[^a-zà-ÿ])${u}(?![a-zà-ÿ])`).test(t) || t.includes(nom);
}

/** Règles communes : unité dans la réponse, deux décimales au plus, pas de barre de division. */
function communes(q: Q): string[] {
  const p: string[] = [];
  for (const s of [q.text, ...(q.choices ?? []), ...(q.expected ?? []), q.explanation ?? ""])
    if (/\d\s*\/\s*\d/.test(s)) p.push(`barre de division entre deux nombres : « ${s.slice(0, 60)} »`);
  for (const l of longueursDuTexte(q.text)) if (decimales(l.v) > 2) p.push(`plus de deux décimales : ${l.v}`);
  return p;
}

// ----- MESURER
// Ma propre table, écrite à partir des mots de l'objet (pas celle du gabarit).
const TAILLES: [RegExp, string][] = [
  [/épaisseur|fourmi|grain de riz|perle|coccinelle/, "mm"],
  [/crayon|cahier|banane|chaussure|verre|livre|raquette|plante en pot/, "cm"],
  [/piscine|immeuble|terrain de foot|bus|arbre|baleine|couloir/, "m"],
  [/villes|Tour de France|fleuve|marathon|avion|randonnée|autoroute/, "km"],
];
function uniteDeLObjet(t: string) {
  return TAILLES.find(([re]) => re.test(t))?.[1] ?? null;
}
function corrigerMesurer(q: Q): string[] {
  const p = communes(q);
  const u = uniteDeLObjet(q.text);
  if (!u) return [...p, "objet inconnu : je ne sais pas quelle unité convient"];
  const c = q.choices ?? [];
  if (c.length !== 4) p.push("il faut quatre propositions");
  const lues = c.map((x) => (/^\D+$/.test(x) ? { v: NaN, u: x } : longueurAttendue(x)));
  if (lues.some((l) => !l)) return [...p, `proposition illisible : ${c.join(" | ")}`];
  if (new Set(lues.map((l) => l!.u)).size !== 4) p.push("les propositions n'ont pas quatre unités différentes");
  const nombres = new Set(lues.map((l) => String(l!.v)));
  if (nombres.size !== 1) p.push("les propositions n'ont pas le même nombre");
  const att = /^\D+$/.test(q.expected[0]) ? q.expected[0] : longueurAttendue(q.expected[0])?.u;
  if (att !== u) p.push(`unité attendue ${att}, recalculée ${u}`);
  // Vraisemblance du nombre (★2) : bornes larges, par unité.
  const v = lues[0]!.v;
  if (!Number.isNaN(v)) {
    const bornes: Record<string, [number, number]> = { mm: [1, 9], cm: [5, 60], m: [10, 120], km: [10, 9000] };
    const [lo, hi] = bornes[u];
    if (v < lo || v > hi) p.push(`${v} ${u} n'est pas vraisemblable pour cet objet`);
  }
  return p;
}

// ----- UNITÉS : « 1 km = … m »
function corrigerUnite(q: Q): string[] {
  const p = communes(q);
  const m = q.text.match(/(?:^|[\s:])1 (km|hm|dam|dm|cm|mm|m|kilomètre|hectomètre|décamètre|décimètre|centimètre|millimètre|mètre)(?![a-zà-ÿ])/);
  if (!m) return [...p, "je ne trouve pas « 1 unité » dans le texte"];
  const grande = NOMS[m[1]] ?? m[1];
  const att = longueurAttendue(q.expected[0]);
  if (!att) return [...p, `réponse sans unité : ${q.expected[0]}`];
  if (q.format !== "qcm" && !uniteNommee(q.text, att.u))
    p.push(`l'unité de la réponse (${att.u}) n'est pas demandée dans le texte`);
  if (UNITES_LONGUEUR[grande] <= UNITES_LONGUEUR[att.u]) p.push(`${att.u} n'est pas plus petite que ${grande}`);
  const juste = enUnite(1, grande, att.u);
  if (!egal(att.v, juste)) p.push(`réponse ${q.expected[0]}, recalculée ${juste} ${att.u}`);
  if (q.format === "qcm") {
    const c = (q.choices ?? []).map(longueurAttendue);
    if (c.some((x) => !x || x.u !== att.u)) p.push("une proposition n'est pas dans la même unité");
    if (c.filter((x) => x && egal(x.v, juste)).length !== 1) p.push("la bonne valeur n'est pas proposée une seule fois");
  }
  return p;
}

// ----- CONVERTIR : une seule longueur dans le texte, la réponse est la même longueur dans l'unité demandée.
function corrigerConvertir(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 1) return [...p, `il faut une seule longueur dans le texte, lu : ${ls.map((l) => l.v + " " + l.u).join(", ")}`];
  const src = ls[0];
  const att = longueurAttendue(q.expected[0]);
  if (!att) return [...p, `réponse sans unité : ${q.expected[0]}`];
  if (att.u === src.u) p.push("l'unité demandée est déjà celle de l'énoncé");
  if (!uniteNommee(q.text.slice(src.i + 1), att.u)) p.push(`l'unité ${att.u} n'est pas demandée après la longueur`);
  const juste = enUnite(src.v, src.u, att.u);
  if (!egal(att.v, juste)) p.push(`réponse ${q.expected[0]}, recalculée ${juste} ${att.u}`);
  if (decimales(juste) > 2) p.push(`résultat à plus de deux décimales : ${juste}`);
  if (q.format === "qcm") {
    const c = (q.choices ?? []).map(longueurAttendue);
    if (c.some((x) => !x || x.u !== att.u)) p.push("une proposition n'est pas dans l'unité demandée");
    if (c.filter((x) => x && egal(x.v, juste)).length !== 1) p.push("la bonne valeur n'est pas proposée une seule fois");
  }
  // Plausibilité : rien sous 1 mm, rien au-delà de 1 000 km.
  const m = enUnite(src.v, src.u, "m");
  if (m < 0.001 || m > 1e6) p.push(`longueur peu plausible : ${src.v} ${src.u}`);
  return p;
}

// ----- COMPARER
/** « le moins », « la plus petite », « la plus courte » → min ; sinon « le plus … » → max. */
function sensDemande(t: string): "max" | "min" | null {
  const q = t.split("\n").pop() ?? t;
  if (/moins|plus petit|plus court/.test(q)) return "min";
  if (/plus/.test(q)) return "max";
  return null;
}
function corrigerComparer(q: Q): string[] {
  const p = communes(q);
  const sens = sensDemande(q.text);
  if (!sens) return [...p, "sens de la comparaison illisible"];
  const choix = q.choices ?? [];
  const ext = (vals: number[]) => (sens === "max" ? Math.max(...vals) : Math.min(...vals));
  if (q.format === "qcm" && choix.every((c) => !/\d/.test(c))) {
    // Deux prénoms : chacun est suivi de SA longueur.
    const ls = longueursDuTexte(q.text);
    if (ls.length !== 2) return [...p, "il faut deux longueurs dans le texte"];
    const m = ls.map(enMetres);
    if (egal(m[0], m[1])) p.push("les deux longueurs sont égales");
    const qui = choix.map((nom) => {
      const i = q.text.indexOf(nom);
      const l = ls.find((x) => x.i > i);
      return { nom, m: l ? enMetres(l) : NaN, i };
    });
    if (qui.some((x) => x.i < 0 || Number.isNaN(x.m))) return [...p, "un prénom n'a pas de longueur après lui"];
    if (qui[0].m === qui[1].m) p.push("les deux prénoms renvoient à la même longueur");
    const juste = qui.find((x) => x.m === ext(qui.map((y) => y.m)))!.nom;
    if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
    return p;
  }
  if (q.format === "qcm") {
    const c = choix.map(longueurAttendue);
    if (c.some((x) => !x)) return [...p, "proposition illisible"];
    const m = c.map((x) => enMetres(x!));
    if (new Set(m).size !== m.length) p.push("deux propositions de même longueur");
    const juste = choix[m.indexOf(ext(m))];
    if (q.expected[0] !== juste) p.push(`réponse ${q.expected[0]}, recalculée ${juste}`);
    return p;
  }
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 2) return [...p, "il faut deux longueurs dans le texte"];
  const m = ls.map(enMetres);
  if (egal(m[0], m[1])) p.push("les deux longueurs sont égales");
  const att = longueurAttendue(q.expected[0]);
  if (!att) return [...p, `réponse sans unité : ${q.expected[0]}`];
  if (!egal(enMetres(att), ext(m))) p.push(`réponse ${q.expected[0]}, recalculée ${ext(m)} m`);
  for (const e of q.expected) {
    const l = longueurAttendue(e);
    if (l && !egal(enMetres(l), ext(m))) p.push(`écriture acceptée fausse : ${e}`);
  }
  return p;
}

// ----- PROBLÈMES : l'opération se lit dans les mots du texte.
function corrigerProbleme(q: Q): string[] {
  const p = communes(q);
  const t = q.text;
  const ls = longueursDuTexte(t);
  if (!ls.length) return [...p, "aucune longueur dans le texte"];
  const m = ls.map(enMetres);
  let juste: number;
  const partage = t.match(/(\d+) (?:morceaux|parts|étapes) éga/);
  const fois = t.match(/(\d+) (?:tours|bandes|pas|longueurs)(?![a-zà-ÿ])/);
  if (partage) {
    if (ls.length !== 1) return [...p, "partage : il faut une seule longueur"];
    juste = m[0] / Number(partage[1]);
  } else if (fois) {
    if (ls.length !== 1) return [...p, "répétition : il faut une seule longueur"];
    juste = m[0] * Number(fois[1]);
  } else if (/écart|différence/.test(t)) {
    if (ls.length !== 2) return [...p, "écart : il faut deux longueurs"];
    juste = Math.abs(m[0] - m[1]);
    if (egal(juste, 0)) p.push("les deux longueurs sont égales");
  } else if (/reste/.test(t)) {
    juste = m.slice(1).reduce((s, v) => s - v, m[0]);
    if (juste <= 0) p.push("il ne reste rien, ou moins que rien");
  } else if (/en tout|total|bout à bout/.test(t)) {
    juste = m.reduce((s, v) => s + v, 0);
  } else return [...p, "je ne reconnais pas l'opération du problème"];
  const att = longueurAttendue(q.expected[0]);
  if (!att) return [...p, `réponse sans unité : ${q.expected[0]}`];
  const demandee = t.match(/Donne la réponse en ([a-zéè]+)/);
  if (demandee) {
    if (NOMS[demandee[1].replace(/s$/, "")] !== att.u) p.push(`unité demandée ${demandee[1]}, réponse en ${att.u}`);
  } else if (ls.some((l) => l.u !== att.u)) p.push(`la réponse (${att.u}) n'est pas dans l'unité de l'énoncé`);
  if (!egal(enMetres(att), juste)) p.push(`réponse ${q.expected[0]}, recalculée ${enUnite(juste, "m", att.u)} ${att.u}`);
  if (decimales(att.v) > 2) p.push("réponse à plus de deux décimales");
  return p;
}

// ----- DÉFIS
/** « 1 m 52 cm » → une seule unité. */
function corrigerDeuxUnites(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 2) return [...p, "il faut une longueur écrite en deux unités"];
  if (UNITES_LONGUEUR[ls[0].u] <= UNITES_LONGUEUR[ls[1].u]) p.push("la première unité doit être la plus grande");
  if (enMetres(ls[1]) >= enUnite(1, ls[0].u, "m")) p.push(`${ls[1].v} ${ls[1].u} dépasse 1 ${ls[0].u}`);
  const att = longueurAttendue(q.expected[0]);
  if (!att) return [...p, `réponse sans unité : ${q.expected[0]}`];
  if (!uniteNommee(q.text.split("\n").pop() ?? "", att.u)) p.push(`l'unité ${att.u} n'est pas demandée`);
  const juste = enMetres(ls[0]) + enMetres(ls[1]);
  if (!egal(enMetres(att), juste)) p.push(`réponse ${q.expected[0]}, recalculée ${enUnite(juste, "m", att.u)} ${att.u}`);
  return p;
}
/** Combien de morceaux / tours : une division exacte. */
function corrigerMorceaux(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 2) return [...p, "il faut deux longueurs"];
  const [a, b] = ls.map(enMetres);
  const quotient = Math.max(a, b) / Math.min(a, b);
  if (!egal(quotient, Math.round(quotient))) p.push(`la division ne tombe pas juste : ${quotient}`);
  const n = Number(String(q.expected[0]).match(/^\d+/)?.[0]);
  if (n !== Math.round(quotient)) p.push(`réponse ${q.expected[0]}, recalculée ${Math.round(quotient)}`);
  if (quotient < 2 || quotient > 60) p.push(`nombre de morceaux peu plausible : ${quotient}`);
  if (!/^\d+ [a-zà-ÿ]+$/.test(q.expected[0])) p.push("la réponse doit dire ce qu'on compte (« 8 morceaux »)");
  return p;
}
/** Une seule proposition strictement entre les deux bornes. */
function corrigerEncadrement(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  if (ls.length !== 2) return [...p, "il faut deux bornes"];
  const [lo, hi] = ls.map(enMetres).sort((x, y) => x - y);
  if (egal(lo, hi)) p.push("bornes égales");
  const c = (q.choices ?? []).map(longueurAttendue);
  if (c.some((x) => !x)) return [...p, "proposition illisible"];
  const dedans = (q.choices ?? []).filter((_, i) => {
    const v = enMetres(c[i]!);
    return v > lo + 1e-9 && v < hi - 1e-9;
  });
  if (dedans.length !== 1) p.push(`${dedans.length} propositions entre les bornes : ${dedans.join(" | ")}`);
  else if (q.expected[0] !== dedans[0]) p.push(`réponse ${q.expected[0]}, recalculée ${dedans[0]}`);
  if (c.some((x) => egal(enMetres(x!), lo) || egal(enMetres(x!), hi))) p.push("une proposition est égale à une borne");
  return p;
}
/** Tours de piste : à deux, ou ce qui reste pour atteindre un objectif. */
function corrigerTours(q: Q): string[] {
  const p = communes(q);
  const ls = longueursDuTexte(q.text);
  const tours = [...q.text.matchAll(/(\d+) tours/g)].map((m) => Number(m[1]));
  const tour = ls.find((l) => l.u === "m");
  if (!tour || !tours.length) return [...p, "tour ou nombre de tours illisible"];
  let juste: number;
  if (/deux/.test(q.text)) {
    if (tours.length !== 2) return [...p, "il faut deux nombres de tours"];
    juste = (tours[0] + tours[1]) * tour.v;
  } else {
    const objectif = ls.find((l) => l.u === "km");
    if (!objectif || tours.length !== 1) return [...p, "objectif illisible"];
    juste = enMetres(objectif) - tours[0] * tour.v;
    if (juste <= 0) p.push("l'objectif est déjà atteint");
  }
  const att = longueurAttendue(q.expected[0]);
  if (!att) return [...p, `réponse sans unité : ${q.expected[0]}`];
  const demandee = q.text.match(/Donne la réponse en ([a-zéè]+)/);
  if (!demandee || NOMS[demandee[1].replace(/s$/, "")] !== att.u) p.push("unité de la réponse non demandée");
  if (!egal(enMetres(att), juste)) p.push(`réponse ${q.expected[0]}, recalculée ${juste} m`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  aire_longueur_defi_tpl_1: corrigerEncadrement,
  aire_longueur_defi_tpl_2: corrigerTours,
  aire_longueur_defi_tpl_3: corrigerDeuxUnites,
  aire_longueur_defi_tpl_4: corrigerMorceaux,
  aire_aire_longueur_probleme_tpl_1: corrigerProbleme,
  aire_aire_longueur_probleme_tpl_2: corrigerProbleme,
  aire_longueur_probleme_tpl_3: corrigerProbleme,
  aire_aire_longueur_comparer_tpl_1: corrigerComparer,
  aire_aire_longueur_comparer_tpl_2: corrigerComparer,
  aire_aire_longueur_convertir_tpl_1: corrigerConvertir,
  aire_aire_longueur_convertir_tpl_2: corrigerConvertir,
  aire_longueur_convertir_tpl_3: corrigerConvertir,
  aire_aire_longueur_convertir_qcm_tpl_1: corrigerConvertir,
  aire_longueur_unite_tpl_1: corrigerUnite,
  aire_longueur_unite_tpl_2: corrigerUnite,
  aire_aire_longueur_mesurer_tpl_1: corrigerMesurer,
  aire_longueur_mesurer_tpl_2: corrigerMesurer,
};
