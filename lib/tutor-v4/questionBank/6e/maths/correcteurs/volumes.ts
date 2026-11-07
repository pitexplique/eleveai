import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "../entiers.bank";
import { accordPronom, lireReponse, mesures, val, verifierQcm, verifierReponse, AIRE, LONGUEUR } from "./aires";

// LES CORRECTEURS DE volumes.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les nombres et les unités du texte que voit l'élève, refait le
// calcul (compter, additionner, multiplier les trois dimensions…) avec ses
// propres tables, et rend la liste des problèmes (vide = juste).

type Q = TutorGeneratedQuestionV4;
const VOLUME = "dm³|cm³|mm³|m³";
const NB = String.raw`\d{1,3}(?:[  ]\d{3})+(?:,\d+)?|\d+(?:,\d+)?`;

// ─── volume_unite ───────────────────────────────────────────────────────────

const PETITS = ["dé à jouer", "gomme", "sucre", "allumettes", "yaourt", "balle de tennis", "verre", "craies", "bijoux"];
const GRANDS = ["piscine", "chambre", "camion", "conteneur", "citerne", "abri de jardin", "salle de sport"];

function corrigerUnite(q: Q): string[] {
  const t = q.text;
  const petit = PETITS.some((o) => t.includes(o));
  const grand = GRANDS.some((o) => t.includes(o));
  if (petit === grand) return ["objet introuvable ou ambigu"];
  const classe = petit ? "cm" : "m";
  const p: string[] = [];
  const cubes = (q.choices ?? []).filter((c) => /³/.test(c));
  if (cubes.length !== 1) p.push(`il faut une seule unité cube : ${(q.choices ?? []).join(" | ")}`);
  if (q.expected[0] !== cubes[0]) p.push(`l'attendue « ${q.expected[0]} » n'est pas la mesure de volume`);
  const u = lireReponse(q.expected[0]).u || q.expected[0];
  if (u !== `${classe}³`) p.push(`unité « ${u} » peu adaptée : il faut ${classe}³`);
  if (/\d/.test(q.expected[0])) {
    const v = lireReponse(q.expected[0]).v;
    const [lo, hi] = petit ? [1, 500] : [1, 3000];
    if (!(v >= lo && v <= hi)) p.push(`volume peu plausible : ${q.expected[0]}`);
    if (new Set((q.choices ?? []).map((c) => lireReponse(c).v)).size !== 1) p.push("les propositions n'ont pas toutes le même nombre");
  }
  return [...p, ...accordPronom(t)];
}

const REMPLIR = ["remplir", "contient", "tiennent", "place prend", "combien d’air"];
const COUVRIR = ["recouvrir", "peindre", "coller du tissu"];
const TOUR = ["tout autour"];

function corrigerGrandeur(q: Q): string[] {
  const t = q.text;
  const n = [REMPLIR, COUVRIR, TOUR].map((l) => l.some((m) => t.includes(m)));
  if (n.filter(Boolean).length !== 1) return ["action ambiguë"];
  const juste = n[0] ? "le volume" : n[1] ? "l’aire" : "le périmètre";
  const p: string[] = [];
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
  return [...p, ...accordPronom(t)];
}

// 03/11/2026 : le genre se lit dans les propositions (une unité cube = question
// d'unité) : les énoncés ★1-★2 disent « mesure » ou « unité » sans « mesures ».
const corrigerUniteOuGrandeur = (q: Q) => ((q.choices ?? []).some((c) => /³/.test(c)) ? corrigerUnite(q) : corrigerGrandeur(q));

// ─── volume_compter, volume_assemblage ──────────────────────────────────────

/**
 * Relit une construction de cubes unités : « 3 couches de 4 rangées de 2
 * cubes » (produit), « 3 étages de 5 cubes » (produit), « retire 2 cubes »
 * (soustrait), tout autre nombre (ajouté). Rend l'unité du cube unité.
 */
export function lireCubes(t: string): { total: number; u: string; nombres: number[] } | string {
  const unites = [...t.matchAll(new RegExp(`\\b1 (${VOLUME})`, "g"))].map((m) => m[1]);
  if (unites.length !== 1) return "le cube unité (« 1 cm³ ») est absent ou en double";
  let reste = t.replace(new RegExp(`\\b1 (${VOLUME})`), " ");
  let total = 0;
  const nombres: number[] = [];
  for (const m of reste.matchAll(/(\d+) couches de (\d+) rangées de (\d+) cubes/g)) {
    total += Number(m[1]) * Number(m[2]) * Number(m[3]);
    nombres.push(Number(m[1]), Number(m[2]), Number(m[3]));
  }
  reste = reste.replace(/(\d+) couches de (\d+) rangées de (\d+) cubes/g, " ");
  for (const m of reste.matchAll(/(\d+) (?:étages|couches|rangées) de (\d+) cubes/g)) {
    total += Number(m[1]) * Number(m[2]);
    nombres.push(Number(m[1]), Number(m[2]));
  }
  reste = reste.replace(/(\d+) (?:étages|couches|rangées) de (\d+) cubes/g, " ");
  for (const m of reste.matchAll(/retire (\d+) cubes?/g)) {
    total -= Number(m[1]);
    nombres.push(Number(m[1]));
  }
  reste = reste.replace(/retire (\d+) cubes?/g, " ");
  for (const m of reste.matchAll(/\d+(?:,\d+)?/g)) {
    total += val(m[0]);
    nombres.push(val(m[0]));
  }
  return { total, u: unites[0], nombres };
}

function corrigerCubes(q: Q): string[] {
  const l = lireCubes(q.text);
  if (typeof l === "string") return [l];
  const p: string[] = [];
  if (l.total <= 0) p.push("le solide n'a plus de cube");
  if (l.nombres.some((x) => !Number.isInteger(x) || x < 1 || x > 15)) p.push(`compte peu plausible : ${l.nombres.join(", ")}`);
  p.push(...verifierReponse(q, l.total, l.u));
  if (q.format === "qcm") p.push(...verifierQcm(q, l.total, l.u));
  return [...p, ...accordPronom(q.text)];
}

/** 03/11/2026 : ★2, les cubes DESSINÉS. On compte la figure, on vérifie qu'aucun
 *  cube ne flotte ni ne se cache (une seule rangée de face), que le texte ne dit
 *  aucun nombre hors du cube unité, et que l'étiquette ne donne pas le compte. */
function corrigerCubesFigure(q: Q): string[] {
  const c = q.canvas as { kind?: string; cubes?: { x: number; y: number; z: number }[]; display?: { showLabels?: boolean } } | undefined;
  if (!c || c.kind !== "solide_3d" || !c.cubes?.length) return ["figure de cubes absente"];
  const unite = new RegExp(`\\b1 (${VOLUME})`, "g");
  const unites = [...q.text.matchAll(unite)].map((m) => m[1]);
  if (unites.length !== 1) return ["le cube unité (« 1 cm³ ») est absent ou en double"];
  const p: string[] = [];
  if (/\d/.test(q.text.replace(unite, ""))) p.push("un nombre en trop dans le texte");
  if (c.display?.showLabels !== false) p.push("l'étiquette de la figure donne le compte");
  const cle = (x: number, y: number, z: number) => `${x},${y},${z}`;
  const ici = new Set(c.cubes.map((k) => cle(k.x, k.y, k.z)));
  if (ici.size !== c.cubes.length) p.push("deux cubes à la même place");
  if (c.cubes.some((k) => k.y !== 0) && c.cubes.some((k) => k.z !== 0)) p.push("un cube peut être caché derrière un autre");
  if (c.cubes.some((k) => k.z > 0 && !ici.has(cle(k.x, k.y, k.z - 1)))) p.push("un cube flotte");
  if (c.cubes.length > 18) p.push("trop de cubes à compter");
  p.push(...verifierReponse(q, c.cubes.length, unites[0]));
  return p;
}

// ─── volume_comparer ────────────────────────────────────────────────────────

const derniere = (t: string) => t.split(/(?<=[.?!])\s+/).pop() ?? "";
function sens(t: string): "grand" | "petit" | null {
  const f = derniere(t);
  const g = /plus grand/.test(f);
  const p = /plus petit/.test(f);
  return g === p ? null : g ? "grand" : "petit";
}
function prenomsDansLOrdre(t: string): string[] {
  return PRENOMS.map((x) => ({ n: x.nom, i: t.search(new RegExp(`(^|[^\\p{L}])${x.nom}(?![\\p{L}])`, "u")) }))
    .filter((o) => o.i >= 0)
    .sort((a, b) => a.i - b.i)
    .map((o) => o.n);
}
/** En QCM « celui de X / celui de Y / même volume » : la proposition juste d'après deux valeurs. */
function verifierQuiGagne(q: Q, v1: number, v2: number, s: "grand" | "petit"): string[] {
  const noms = prenomsDansLOrdre(q.text);
  if (noms.length !== 2) return [`il faut deux prénoms, lu : ${noms.join(", ")}`];
  const choix = q.choices ?? [];
  const deQui = (n: string) => choix.filter((c) => new RegExp(`(^|[^\\p{L}])${n}$`, "u").test(c));
  const egal = choix.filter((c) => /même/.test(c));
  if (deQui(noms[0]).length !== 1 || deQui(noms[1]).length !== 1 || egal.length !== 1) return [`propositions mal formées : ${choix.join(" | ")}`];
  const juste = v1 === v2 ? egal[0] : (v1 > v2) === (s === "grand") ? deQui(noms[0])[0] : deQui(noms[1])[0];
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », recalculé « ${juste} » (${v1} et ${v2})`];
}

function corrigerComparerDeux(q: Q): string[] {
  const v = mesures(q.text, VOLUME);
  if (v.length !== 2) return [`il faut deux volumes, lu : ${v.length}`];
  if (v[0].u !== v[1].u) return ["les deux volumes ne sont pas dans la même unité"];
  if (v[0].v === v[1].v) return ["les deux volumes sont égaux"];
  const s = sens(q.text);
  if (!s) return ["la question ne dit pas « plus grand » ou « plus petit »"];
  return verifierReponse(q, s === "grand" ? Math.max(v[0].v, v[1].v) : Math.min(v[0].v, v[1].v), v[0].u);
}

function corrigerComparerPiles(q: Q): string[] {
  const m = [...q.text.matchAll(/(\d+) (?:étages|couches) de (\d+) cubes/g)];
  if (m.length !== 2) return [`il faut deux constructions, lu : ${m.length}`];
  const s = sens(q.text);
  if (!s) return ["sens de la question illisible"];
  const v1 = Number(m[0][1]) * Number(m[0][2]);
  const v2 = Number(m[1][1]) * Number(m[1][2]);
  const p = verifierQuiGagne(q, v1, v2, s);
  if (!/Mêmes cubes/.test(q.text)) p.push("rien ne dit que les cubes sont identiques");
  return p;
}

// ─── volume_lire ────────────────────────────────────────────────────────────

function corrigerLireMesures(q: Q): string[] {
  const v = mesures(q.text, VOLUME);
  if (v.length !== 1) return [`il faut une seule mesure de volume dans le texte, lu : ${v.length}`];
  const toutes = mesures(q.text, `${VOLUME}|dm²|cm²|m²|kg|g|${LONGUEUR}`);
  // 03/11/2026 : à ★1-★2, la liste n'est pas annoncée (« Quelle mesure est un volume : … ou … ? ») : 2 ou 4.
  const annonce = /deux mesures/.test(q.text) ? 2 : /quatre mesures/.test(q.text) ? 4 : toutes.length === 2 || toutes.length === 4 ? toutes.length : -1;
  const p: string[] = [];
  if (toutes.length !== annonce) p.push(`le texte annonce ${annonce} mesures, il y en a ${toutes.length}`);
  p.push(...verifierReponse(q, v[0].v, v[0].u));
  return [...p, ...accordPronom(q.text)];
}

// Table propre au correcteur : les mots des nombres.
const UNITES: Record<string, number> = {
  zéro: 0, un: 1, deux: 2, trois: 3, quatre: 4, cinq: 5, six: 6, sept: 7, huit: 8, neuf: 9, dix: 10,
  onze: 11, douze: 12, treize: 13, quatorze: 14, quinze: 15, seize: 16, vingt: 20, trente: 30,
  quarante: 40, cinquante: 50, soixante: 60, cent: 100, cents: 100,
};
/** « deux cent quarante-trois » → 243 ; null si un mot est inconnu. */
export function lettresVersNombre(s: string): number | null {
  const mots = s.replace(/-/g, " ").replace(/\bet\b/g, " ").split(/\s+/).filter(Boolean);
  let total = 0;
  let courant = 0;
  for (let i = 0; i < mots.length; i++) {
    const m = mots[i];
    if (m === "quatre" && /^vingts?$/.test(mots[i + 1] ?? "")) {
      courant += 80;
      i++;
      continue;
    }
    if (!(m in UNITES)) return null;
    const v = UNITES[m];
    if (v === 100) {
      courant = (courant || 1) * 100;
      total += courant;
      courant = 0;
    } else courant += v;
  }
  return total + courant;
}
const UNITE_MOTS: Record<string, string> = { "centimètres cubes": "cm³", "décimètres cubes": "dm³", "mètres cubes": "m³" };
function lireEnLettres(s: string): { v: number; u: string } | null {
  const m = s.match(/^(.*) (centimètres|décimètres|mètres) (cubes|carrés)$/);
  if (!m) return null;
  const v = lettresVersNombre(m[1]);
  if (v == null) return null;
  return { v, u: m[3] === "cubes" ? UNITE_MOTS[`${m[2]} cubes`] : `${UNITE_MOTS[`${m[2]} cubes`].replace("³", "²")}` };
}

function corrigerLireLettres(q: Q): string[] {
  const p: string[] = [];
  const cite = q.text.match(/« ([^»]+) »/);
  if (cite) {
    // Des lettres vers les chiffres.
    const l = lireEnLettres(cite[1].trim());
    if (!l) return [`lecture des lettres impossible : « ${cite[1]} »`];
    p.push(...verifierReponse(q, l.v, l.u), ...verifierQcm(q, l.v, l.u));
  } else {
    // Des chiffres vers les lettres.
    const v = mesures(q.text, VOLUME);
    if (v.length !== 1) return [`il faut un seul volume chiffré, lu : ${v.length}`];
    const justes = (q.choices ?? []).filter((c) => {
      const l = lireEnLettres(c);
      if (!l) p.push(`proposition illisible : « ${c} »`);
      return l && l.v === v[0].v && l.u === v[0].u;
    });
    if (justes.length !== 1 || justes[0] !== q.expected[0]) p.push(`propositions justes : ${justes.join(" | ") || "aucune"} ; attendue « ${q.expected[0]} »`);
  }
  return [...p, ...accordPronom(q.text)];
}

// ─── volume_defi ────────────────────────────────────────────────────────────

function corrigerPave(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (ls.length !== 3 || new Set(ls.map((x) => x.u)).size !== 1) return [`il faut trois dimensions dans la même unité, lu : ${ls.length}`];
  const V = ls[0].v * ls[1].v * ls[2].v;
  const u = /Combien de cubes de 1/.test(q.text) ? "cubes" : `${ls[0].u}³`;
  if (u === "cubes" && !new RegExp(`cubes de 1 ${ls[0].u}³`).test(q.text)) return ["le cube unité n'est pas dans l'unité des dimensions"];
  return [...verifierReponse(q, V, u), ...accordPronom(q.text)];
}

function corrigerDefiQcm(q: Q): string[] {
  const ls = mesures(q.text, LONGUEUR);
  if (/d’arête/.test(q.text)) {
    if (ls.length !== 1) return [`il faut une seule arête, lu : ${ls.length}`];
    const V = ls[0].v ** 3;
    return [...verifierQcm(q, V, `${ls[0].u}³`), ...verifierReponse(q, V, `${ls[0].u}³`), ...accordPronom(q.text)];
  }
  if (ls.length !== 6) return [`il faut deux boîtes de trois dimensions, lu : ${ls.length}`];
  const v1 = ls[0].v * ls[1].v * ls[2].v;
  const v2 = ls[3].v * ls[4].v * ls[5].v;
  const s = sens(q.text);
  if (!s) return ["sens illisible"];
  return verifierQuiGagne(q, v1, v2, s);
}

function corrigerDefiInverse(q: Q): string[] {
  const v = mesures(q.text, VOLUME);
  const ls = mesures(q.text, LONGUEUR);
  if (v.length !== 1) return [`il faut un seul volume, lu : ${v.length}`];
  const u = v[0].u.replace("³", "");
  if (ls.length === 0) {
    const a = Math.round(Math.cbrt(v[0].v));
    if (a ** 3 !== v[0].v) return [`${v[0].v} n'est pas le cube d'un entier`];
    return verifierReponse(q, a, u);
  }
  if (ls.length !== 2 || ls.some((x) => x.u !== u)) return ["il faut les deux côtés du fond, dans l'unité du volume"];
  const h = v[0].v / (ls[0].v * ls[1].v);
  const p = verifierReponse(q, h, u);
  if (!Number.isInteger(h)) p.push("la hauteur ne tombe pas juste");
  return [...p, ...accordPronom(q.text)];
}

// ─── ⭐ 07/11/2026 : les modes neufs de ★1-★2 ────────────────────────────────

/** Le solide dessiné : le nombre de cubes, ou les défauts de la figure. */
function compterFigure(q: Q): { n: number; p: string[] } {
  const c = q.canvas as { kind?: string; cubes?: { x: number; y: number; z: number }[]; display?: { showLabels?: boolean } } | undefined;
  if (!c || c.kind !== "solide_3d" || !c.cubes?.length) return { n: NaN, p: ["figure de cubes absente"] };
  const p: string[] = [];
  if (c.display?.showLabels !== false) p.push("l'étiquette de la figure donne le compte");
  const cle = (x: number, y: number, z: number) => `${x},${y},${z}`;
  const ici = new Set(c.cubes.map((k) => cle(k.x, k.y, k.z)));
  if (ici.size !== c.cubes.length) p.push("deux cubes à la même place");
  if (c.cubes.some((k) => k.y !== 0) && c.cubes.some((k) => k.z !== 0)) p.push("un cube peut être caché derrière un autre");
  if (c.cubes.some((k) => k.z > 0 && !ici.has(cle(k.x, k.y, k.z - 1)))) p.push("un cube flotte");
  if (c.cubes.length > 18) p.push("trop de cubes à compter");
  return { n: c.cubes.length, p };
}

/** « 1 cm³ » et un autre volume, dans la même unité. */
function uniteEtVolume(t: string): { v: number; u: string } | string {
  const m = mesures(t, VOLUME);
  const un = m.filter((x) => x.v === 1);
  const autres = m.filter((x) => x.v !== 1);
  if (un.length !== 1 || autres.length !== 1) return `il faut le cube de 1 et un volume, lu : ${m.length}`;
  if (un[0].u !== autres[0].u) return "le cube unité et le volume n'ont pas la même unité";
  return autres[0];
}

function corrigerCompterAjouter(q: Q): string[] {
  const f = compterFigure(q);
  const l = uniteEtVolume(q.text);
  if (typeof l === "string") return [...f.p, l];
  if (!/ajout|manqu|poses-tu/i.test(q.text)) return [...f.p, "tournure non reconnue"];
  if (l.v <= f.n) return [...f.p, "il n'y a rien à ajouter"];
  return [...f.p, ...verifierReponse(q, l.v - f.n, "cubes")];
}

function corrigerCompterEnlever(q: Q): string[] {
  const f = compterFigure(q);
  const m = q.text.match(/(?:enlèves?|retire|perd|sans) (\d+) cubes/i);
  const u = [...q.text.matchAll(new RegExp(`\\b1 (${VOLUME})`, "g"))].map((x) => x[1]);
  if (!m || u.length !== 1) return [...f.p, "tournure non reconnue"];
  const reste = f.n - Number(m[1]);
  if (reste < 1) return [...f.p, "il ne reste aucun cube"];
  return [...f.p, ...verifierReponse(q, reste, u[0])];
}

function corrigerCompterGrosCube(q: Q): string[] {
  const f = compterFigure(q);
  const m = mesures(q.text, VOLUME);
  if (m.length !== 1 || m[0].v < 2) return [...f.p, `il faut le volume d'un cube, lu : ${m.length}`];
  return [...f.p, ...verifierReponse(q, f.n * m[0].v, m[0].u)];
}

function corrigerCompterQcmFigure(q: Q): string[] {
  const f = compterFigure(q);
  const m = mesures(q.text, VOLUME);
  if (m.length !== 1 || m[0].v !== 1) return [...f.p, "le cube unité est absent ou en double"];
  return [...f.p, ...verifierReponse(q, f.n, m[0].u), ...verifierQcm(q, f.n, m[0].u)];
}

/** Deux volumes dans la même unité, dans l'ordre du texte. */
function deuxVolumes(t: string): { a: number; b: number; u: string } | string {
  const m = mesures(t, VOLUME);
  if (m.length !== 2) return `il faut deux volumes, lu : ${m.length}`;
  if (m[0].u !== m[1].u) return "les deux volumes ne sont pas dans la même unité";
  return { a: m[0].v, b: m[1].v, u: m[0].u };
}

function corrigerAssemblerManque(q: Q): string[] {
  const d = deuxVolumes(q.text);
  if (typeof d === "string") return [d];
  if (d.a === d.b) return ["les deux volumes sont égaux"];
  if (!/autre|manqu|\?\s*=|retire/.test(q.text)) return ["tournure non reconnue"];
  return verifierReponse(q, Math.abs(d.a - d.b), d.u);
}

function corrigerAssemblerPartage(q: Q): string[] {
  const m = mesures(q.text, VOLUME);
  const n = q.text.match(/(\d+) (?:morceaux|blocs) égaux/);
  if (m.length !== 1 || !n) return ["tournure non reconnue"];
  const v = m[0].v / Number(n[1]);
  if (!Number.isInteger(v)) return ["le partage ne tombe pas juste"];
  return verifierReponse(q, v, m[0].u);
}

function corrigerAssemblerAjout(q: Q): string[] {
  const d = deuxVolumes(q.text);
  if (typeof d === "string") return [d];
  if (!/coll|total|assembl|ensemble|ajoute|grandit/i.test(q.text)) return ["tournure non reconnue"];
  return verifierReponse(q, d.a + d.b, d.u);
}

function corrigerAssemblerFois(q: Q): string[] {
  const m = mesures(q.text, VOLUME);
  const n = q.text.match(/(\d+) (?:blocs|morceaux) de/) ?? q.text.match(/en (?:assemble|colle) (\d+)/);
  if (m.length !== 1 || !n) return ["tournure non reconnue"];
  return verifierReponse(q, Number(n[1]) * m[0].v, m[0].u);
}

function corrigerAssemblerForme(q: Q): string[] {
  const m = mesures(q.text, VOLUME);
  if (m.length !== 1) return [`il faut un seul volume, lu : ${m.length}`];
  if (!/mêmes cubes|tous les cubes|ses cubes|les cubes d’un/i.test(q.text)) return ["rien ne dit que les cubes sont les mêmes"];
  return [...verifierReponse(q, m[0].v, m[0].u), ...verifierQcm(q, m[0].v, m[0].u)];
}

function corrigerComparerSigne(q: Q): string[] {
  const d = deuxVolumes(q.text);
  if (typeof d === "string") return [d];
  const juste = d.a < d.b ? "<" : d.a > d.b ? ">" : "=";
  const p = q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », recalculé « ${juste} »`];
  if ([...(q.choices ?? [])].sort().join() !== ["<", "=", ">"].join()) p.push(`propositions : ${(q.choices ?? []).join(" | ")}`);
  return p;
}

function corrigerComparerEcart(q: Q): string[] {
  const d = deuxVolumes(q.text);
  if (typeof d === "string") return [d];
  const t = q.text;
  const p: string[] = [];
  if (!/écart|différence|dépasse|ajouter|manque|plus petit que/.test(t)) return ["tournure non reconnue"];
  if (/dépasse/.test(t) && d.a <= d.b) p.push("le premier volume ne dépasse pas le second");
  if (/ajouter|manque|plus petit que/.test(t) && d.a >= d.b) p.push("le premier volume n'est pas le plus petit");
  return [...p, ...verifierReponse(q, Math.abs(d.a - d.b), d.u)];
}

// Table propre au correcteur : les volumes rapportés au cm³.
const EN_CM3: Record<string, number> = { "cm³": 1, "dm³": 1000, "m³": 1000000 };

function corrigerComparerUnites(q: Q): string[] {
  const m = mesures(q.text, VOLUME);
  if (m.length !== 2) return [`il faut deux volumes, lu : ${m.length}`];
  if (m[0].u === m[1].u) return ["les deux volumes ont la même unité"];
  if (!(m[0].u in EN_CM3) || !(m[1].u in EN_CM3)) return ["unité inconnue"];
  const s = sens(q.text);
  if (!s) return ["sens illisible"];
  const [x, y] = m.map((o) => o.v * EN_CM3[o.u]);
  if (x === y) return ["les deux volumes sont égaux"];
  const juste = (x > y) === (s === "grand") ? m[0] : m[1];
  return verifierReponse(q, juste.v, juste.u);
}

function corrigerComparerParmi(q: Q): string[] {
  const s = sens(q.text);
  if (!s) return ["sens illisible"];
  const c = (q.choices ?? []).map((x) => lireReponse(x));
  if (c.length !== 4 || new Set(c.map((x) => x.u)).size !== 1 || new Set(c.map((x) => x.v)).size !== 4) return [`propositions mal formées : ${(q.choices ?? []).join(" | ")}`];
  const v = s === "grand" ? Math.max(...c.map((x) => x.v)) : Math.min(...c.map((x) => x.v));
  return verifierReponse(q, v, c[0].u);
}

function corrigerComparerEntre(q: Q): string[] {
  const d = deuxVolumes(q.text);
  if (typeof d === "string") return [d];
  if (d.a >= d.b) return ["les bornes sont dans le mauvais ordre"];
  const dedans = (q.choices ?? []).filter((x) => {
    const r = lireReponse(x);
    return r.u === d.u && r.v > d.a && r.v < d.b;
  });
  if (dedans.length !== 1 || dedans[0] !== q.expected[0]) return [`volumes entre les bornes : ${dedans.join(" | ") || "aucun"} ; attendu « ${q.expected[0]} »`];
  return (q.choices ?? []).some((x) => lireReponse(x).v <= 0) ? ["un volume nul ou négatif"] : [];
}

function corrigerComparerFigure(q: Q): string[] {
  const f = compterFigure(q);
  const l = uniteEtVolume(q.text);
  if (typeof l === "string") return [...f.p, l];
  const plus = /dépasse|plus grand|plus de|au-dessus|passe-t-il/.test(q.text);
  const moins = /plus petit|moins de|en dessous/.test(q.text);
  if (plus === moins) return [...f.p, "tournure non reconnue"];
  if (l.v === f.n) return [...f.p, "le volume dessiné égale le volume écrit"];
  const juste = (plus ? f.n > l.v : f.n < l.v) ? "oui" : "non";
  return [...f.p, ...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », recalculé « ${juste} »`])];
}

function corrigerLireGrandeur(q: Q): string[] {
  const m = mesures(q.text, `${VOLUME}|${AIRE}|kg|g|${LONGUEUR}`);
  if (m.length !== 1) return [`il faut une seule mesure, lu : ${m.length}`];
  const u = m[0].u;
  const juste = u.endsWith("³") ? "un volume" : u.endsWith("²") ? "une aire" : /g$/.test(u) ? "une masse" : "une longueur";
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut « ${juste} »`];
}

function corrigerLireEnCubes(q: Q): string[] {
  const l = uniteEtVolume(q.text);
  if (typeof l === "string") return [l];
  return verifierReponse(q, l.v, "cubes");
}

// Table propre au correcteur : le nom des unités.
const NOM_UNITE: Record<string, string> = { cm: "centimètre", dm: "décimètre", m: "mètre" };

function corrigerLireNomUnite(q: Q): string[] {
  const m = [...q.text.matchAll(/(?<!\p{L})(cm|dm|m)([²³])/gu)];
  if (m.length !== 1) return [`il faut un seul symbole, lu : ${m.length}`];
  const juste = `${NOM_UNITE[m[0][1]]} ${m[0][2] === "³" ? "cube" : "carré"}`;
  const p = q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut « ${juste} »`];
  if ((q.choices ?? []).filter((c) => c === juste).length !== 1) p.push("la bonne réponse manque aux propositions");
  return p;
}

function corrigerLireOuiNon(q: Q): string[] {
  const m = mesures(q.text, `${VOLUME}|${AIRE}|kg|g|${LONGUEUR}`);
  if (m.length !== 1) return [`il faut une seule mesure, lu : ${m.length}`];
  if (!/volume/.test(q.text)) return ["tournure non reconnue"];
  const estVolume = m[0].u.endsWith("³");
  const juste = /Vrai ou faux/i.test(q.text) ? (estVolume ? "vrai" : "faux") : estVolume ? "oui" : "non";
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », il faut « ${juste} »`];
}

export const CORRECTEURS: CorrecteursMaths = {
  volume_comparer_tpl_1: corrigerComparerDeux,
  volume_comparer_qcm_tpl_1: corrigerComparerPiles,
  volume_lire_tpl_e1: corrigerLireMesures,
  volume_lire_tpl_1: corrigerLireMesures,
  volume_lire_qcm_tpl_1: corrigerLireLettres,
  volume_defi_tpl_e3: corrigerPave,
  volume_defi_tpl_1: corrigerDefiQcm,
  volume_defi_tpl_2: corrigerDefiInverse,
  volume_compter_tpl_1: corrigerCubesFigure,
  // 03/11/2026 : les situations montées de ★1-★2 à ★3 (mêmes correcteurs).
  volume_compter_tpl_3_situation: corrigerCubes,
  volume_comparer_tpl_2_situation: corrigerComparerDeux,
  volume_assemblage_tpl_2_situation: corrigerCubes,
  volume_lire_tpl_2_situation: corrigerLireMesures,
  volume_unite_tpl_3_situation: corrigerUniteOuGrandeur,
  volume_compter_tpl_2: corrigerCubes,
  volume_compter_qcm_tpl_1: corrigerCubes,
  volume_assemblage_tpl_e2: corrigerCubes,
  volume_assemblage_tpl_1: corrigerCubes,
  volume_assemblage_qcm_tpl_1: corrigerCubes,
  volume_unite_tpl_1: corrigerUniteOuGrandeur,
  volume_unite_tpl_2: corrigerUniteOuGrandeur,
  // ⭐ 07/11/2026 : les modes neufs de ★1-★2.
  volume_compter_tpl_e2_ajouter: corrigerCompterAjouter,
  volume_compter_tpl_e2_enlever: corrigerCompterEnlever,
  volume_compter_tpl_e2_rangees: corrigerCubes,
  volume_compter_tpl_e2_nombre: corrigerCubes,
  volume_compter_tpl_e2_gros_cube: corrigerCompterGrosCube,
  volume_compter_qcm_tpl_e2_figure: corrigerCompterQcmFigure,
  volume_assemblage_tpl_e2_manque: corrigerAssemblerManque,
  volume_assemblage_tpl_e2_partage: corrigerAssemblerPartage,
  volume_assemblage_tpl_e2_ajout: corrigerAssemblerAjout,
  volume_assemblage_tpl_e2_fois: corrigerAssemblerFois,
  volume_assemblage_qcm_tpl_e2_forme: corrigerAssemblerForme,
  volume_comparer_qcm_tpl_e2_signe: corrigerComparerSigne,
  volume_comparer_tpl_e2_ecart: corrigerComparerEcart,
  volume_comparer_tpl_e2_unites: corrigerComparerUnites,
  volume_comparer_qcm_tpl_e2_parmi: corrigerComparerParmi,
  volume_comparer_qcm_tpl_e2_entre: corrigerComparerEntre,
  volume_comparer_qcm_tpl_e2_figure: corrigerComparerFigure,
  volume_lire_qcm_tpl_e1_chiffres: corrigerLireLettres,
  volume_lire_qcm_tpl_e1_dire: corrigerLireLettres,
  volume_lire_qcm_tpl_e1_grandeur: corrigerLireGrandeur,
  volume_lire_tpl_e1_cubes: corrigerLireEnCubes,
  volume_lire_qcm_tpl_e1_nom: corrigerLireNomUnite,
  volume_lire_qcm_tpl_e1_oui_non: corrigerLireOuiNon,
};
