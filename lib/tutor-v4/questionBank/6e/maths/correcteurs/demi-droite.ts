import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { attendu, deuxDecimalesEnSituation, egal, lireNombre, nombres, qcmUnique, uniteAttendue } from "./decimaux";

// LES CORRECTEURS DE demi-droite.bank.ts (06/10/2026, voir types.ts).
// Ils relisent la FIGURE (graduations, points et leurs noms) et le texte, puis
// refont la lecture : jamais le gabarit.

type Ligne = { min: number; max: number; step: number; points: { value: number; label?: string }[] };
const r6 = (x: number) => Math.round(x * 1e6) / 1e6;

/** La figure est-elle lisible ? Cinq intervalles au plus, chaque point au milieu d'un intervalle ou sur un trait. */
function verifierFigure(c: Ligne | undefined): string[] {
  if (!c) return ["pas de figure"];
  const p: string[] = [];
  const nb = r6((c.max - c.min) / c.step);
  if (nb > 5 || !Number.isInteger(nb)) p.push(`figure de ${nb} intervalles (cinq au plus)`);
  for (const pt of c.points) {
    const k = r6((pt.value - c.min) / c.step);
    if (pt.value < c.min || pt.value > c.max) p.push(`le point ${pt.label} sort de la figure`);
    if (!Number.isInteger(r6(k * 2))) p.push(`le point ${pt.label} n'est ni sur un trait ni au milieu d'un intervalle : illisible`);
  }
  const noms = c.points.map((x) => x.label);
  if (new Set(noms).size !== noms.length) p.push("deux points portent le même nom");
  return p;
}

function uniteDuTexte(t: string) {
  return t.match(/gradu(?:é|ée) en (km|cm|L|°C|kg|m)\b/)?.[1] ?? (t.match(/gradu(?:é|ée) en °C/) ? "°C" : "");
}

/** Le point nommé dans l'énoncé (« le point R »). */
const pointNomme = (t: string) => t.match(/point ([A-Z])(?![a-zA-Zé])/)?.[1];

function corrigerLire(q: TutorGeneratedQuestionV4): string[] {
  const c = q.canvas as Ligne | undefined;
  const p = verifierFigure(c);
  if (!c) return p;
  const L = pointNomme(q.text);
  const pt = c.points.find((x) => x.label === L);
  if (!pt) return [...p, `le point ${L} de l'énoncé n'est pas sur la figure`];
  if (q.format === "qcm") return [...p, ...qcmUnique(q, (ch) => egal(lireNombre(ch), pt.value))];
  if (!egal(attendu(q), pt.value)) p.push(`attendu ${q.expected[0]}, la figure place ${L} à ${pt.value}`);
  const u = uniteDuTexte(q.text);
  if (u !== uniteAttendue(q)) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  return p;
}

function corrigerPlacer(q: TutorGeneratedQuestionV4): string[] {
  const c = q.canvas as Ligne | undefined;
  const p = verifierFigure(c);
  if (!c) return p;
  const x = nombres(q.text).pop();
  if (x == null) return [...p, "aucune abscisse dans l'énoncé"];
  const noms = c.points.map((pt) => pt.label!);
  if (!noms.every((n) => q.choices?.includes(n))) p.push("les noms des points de la figure ne sont pas les propositions");
  const juste = c.points.find((pt) => egal(pt.value, x))?.label ?? "aucun des trois";
  return [...p, ...qcmUnique(q, (ch) => ch === juste)];
}

const MOTS_PARTS: Record<string, number> = { "en deux": 2, "en tiers": 3, "en quarts": 4, "en cinquièmes": 5, "en sixièmes": 6, "en huitièmes": 8, "en dixièmes": 10 };

function corrigerFraction(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const c = q.canvas as Ligne | undefined;
  const frac = t.match(/(\d+)\/(\d+)/);
  if (q.format === "short") {
    const p = verifierFigure(c);
    if (!c) return p;
    const d = Number(t.match(/en (\d+) parts/)?.[1]);
    if (!egal(c.step * d, 1)) p.push(`l'énoncé partage l'unité en ${d}, la figure en pas de ${c.step}`);
    const pt = c.points.find((x) => x.label === pointNomme(t));
    if (!pt) return [...p, "le point de l'énoncé n'est pas sur la figure"];
    const m = String(q.expected[0]).match(/^(\d+)\/(\d+)$/);
    if (!m) return [...p, "la réponse attendue n'est pas une fraction"];
    if (Number(m[2]) !== d) p.push(`dénominateur ${m[2]} au lieu de ${d}`);
    if (!egal(Number(m[1]) / Number(m[2]), pt.value)) p.push(`${q.expected[0]} n'est pas l'abscisse ${pt.value} du point`);
    return p;
  }
  const valeurFr = (ch: string) => {
    const m = ch.match(/^(\d+)\/(\d+)$/);
    return m ? Number(m[1]) / Number(m[2]) : NaN;
  };
  const cote = t.match(/le plus à (droite|gauche)/)?.[1];
  if (cote) {
    const vals = (q.choices ?? []).map(valeurFr);
    const cible = cote === "droite" ? Math.max(...vals) : Math.min(...vals);
    return qcmUnique(q, (ch) => egal(valeurFr(ch), cible));
  }
  if (!frac) return ["aucune fraction dans l'énoncé"];
  const v = Number(frac[1]) / Number(frac[2]);
  if (c) {
    const p = verifierFigure(c);
    if (!c.points.every((pt) => q.choices?.includes(pt.label!))) p.push("les noms des points de la figure ne sont pas les propositions");
    const juste = c.points.find((pt) => egal(pt.value, r6(v)))?.label ?? "aucun des trois";
    return [...p, ...qcmUnique(q, (ch) => ch === juste)];
  }
  if ((q.choices ?? []).some((ch) => ch.startsWith("entre"))) {
    const e = Math.floor(v);
    return qcmUnique(q, (ch) => ch === `entre ${e} et ${e + 1}`);
  }
  return qcmUnique(q, (ch) => {
    const m = ch.match(/^(\d+)\/(\d+)$/);
    return !!m && egal(Number(m[1]) / Number(m[2]), v);
  });
}

function corrigerGraduer(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  const L = nombres(t)[0];
  const u = t.match(/\d (cm|m)\b/)?.[1] ?? "";
  const motParts = Object.keys(MOTS_PARTS).find((k) => t.includes(`partage ${k}`));
  const parts = Number(t.match(/en (\d+) parts/)?.[1]) || (motParts ? MOTS_PARTS[motParts] : NaN);
  let rep: number;
  let avecUnite = false;
  const espace = t.match(/(?:tous les|espacées de) (\d+(?:,\d+)?)/);
  if (espace) rep = r6(L / lireNombre(espace[1])!);
  else if (!parts) return ["nombre de parts introuvable"];
  else if (/une part|Tous les combien/.test(t)) {
    rep = r6(L / parts);
    avecUnite = true;
  } else if (/graduation/.test(t) && /distance|Où place/.test(t)) {
    const k = Number(t.match(/la (\d+)(?:re|e) graduation/)?.[1] ?? t.match(/graduation (\d+)\//)?.[1]);
    if (!(k > 0 && k < parts)) return [`graduation ${k} hors du segment`];
    rep = r6((k * L) / parts);
    avecUnite = true;
  } else if (/intérieur|sans compter/.test(t)) rep = parts - 1;
  else if (/en tout|extrémités comprises/.test(t)) rep = parts + 1;
  else return ["question non reconnue"];
  if (!Number.isInteger(rep) && !avecUnite) return [`${rep} parts : le partage ne tombe pas juste`];
  const p = egal(attendu(q), rep) ? [] : [`attendu ${q.expected[0]} au lieu de ${rep}`];
  if (avecUnite && uniteAttendue(q) !== u) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  return p;
}

const BASE: CorrecteursMaths = {
  abscisse_lire_tpl_et2: corrigerLire,
  abscisse_lire_tpl_1: corrigerLire,
  abscisse_lire_tpl_ouverte: corrigerLire,
  abscisse_placer_tpl_et2: corrigerPlacer,
  abscisse_placer_tpl_1: corrigerPlacer,
  abscisse_placer_tpl_ouverte: corrigerPlacer,
  abscisse_fraction_tpl_et2: corrigerFraction,
  abscisse_fraction_tpl_1: corrigerFraction,
  abscisse_fraction_tpl_et4: corrigerFraction,
  abscisse_fraction_tpl_ouverte: corrigerFraction,
  abscisse_graduer_tpl_et2: corrigerGraduer,
  abscisse_graduer_tpl_1: corrigerGraduer,
  abscisse_graduer_tpl_ouverte: corrigerGraduer,
};

// ⛔ 06/10/2026 : en situation, deux chiffres après la virgule au plus (voir decimaux.ts).
export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(BASE).map(([id, corriger]) => [id, (q: TutorGeneratedQuestionV4) => [...corriger(q), ...deuxDecimalesEnSituation(q)]]),
);
