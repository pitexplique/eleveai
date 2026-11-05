import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE stat-histogramme.bank.ts (05/11/2026). Ils relisent les bornes et
// les hauteurs DANS LA FIGURE, la classe ou le seuil DANS LE TEXTE, et refont le
// calcul. Une figure illisible (barres hors graduation, classes inégales) est en
// défaut. Vide = juste.

type Q = TutorGeneratedQuestionV4;

/** La figure, contrôlée. `trou` : une barre effacée est admise. */
function lire(q: Q, trou = false) {
  const f = q.canvas as any;
  if (f?.kind !== "stat_graph" || f.graphType !== "histogramme") return { p: ["pas d’histogramme"], B: [] as number[], E: [] as number[] };
  const B: number[] = f.bornes ?? [];
  const E: number[] = f.data.map((d: any) => d.value);
  const p: string[] = [];
  if (B.length !== E.length + 1) p.push("bornes et barres incohérentes");
  const w = B[1] - B[0];
  if (B.some((b, i) => i > 0 && b - B[i - 1] !== w)) p.push("classes inégales");
  if (E.some((e) => e % f.display.step !== 0)) p.push("une barre tombe entre deux graduations");
  if (!trou && E.some((e) => e <= 0)) p.push("une barre vide");
  if (f.data.some((d: any, i: number) => d.label !== `de ${B[i]} à ${B[i + 1]}`)) p.push("étiquette de classe fausse");
  return { p, B, E };
}
const somme = (l: number[]) => l.reduce((s, x) => s + x, 0);
const classes = (t: string) => [...t.matchAll(/de (\d+) à (\d+)/g)].map((m) => [Number(m[1]), Number(m[2])] as const);
const indice = (B: number[], c: readonly [number, number]) => B.findIndex((b, i) => b === c[0] && B[i + 1] === c[1]);
function rep(q: Q, juste: number): string[] {
  return q.expected.length === 1 && Number(q.expected[0]) === juste ? [] : [`attendu ${q.expected.join(" | ")}, juste ${juste}`];
}
function effectifClasse(q: Q): string[] {
  const { p, B, E } = lire(q);
  const c = classes(q.text);
  if (c.length !== 1) return [...p, "une classe attendue"];
  const i = indice(B, c[0]);
  if (i < 0) return [...p, "classe absente de la figure"];
  return [...p, ...rep(q, E[i])];
}
function extreme(q: Q): string[] {
  const { p, B, E } = lire(q);
  const grand = /plus grand|plus haute|le plus d|mieux/.test(q.text);
  const petit = /plus petit|plus basse|le moins|moins remplie/.test(q.text);
  if (grand === petit) return [...p, "sens illisible"];
  const v = grand ? Math.max(...E) : Math.min(...E);
  if (E.filter((e) => e === v).length !== 1) return [...p, "deux barres à égalité"];
  const i = E.indexOf(v);
  return [
    ...p,
    ...qcmUnique(q, (c) => {
      const k = classes(c);
      return k.length === 1 && k[0][0] === B[i] && k[0][1] === B[i + 1];
    }),
  ];
}
function nombreClasses(q: Q): string[] {
  const { p, E } = lire(q);
  return [...p, ...rep(q, E.length)];
}
function amplitude(q: Q): string[] {
  const { p, B } = lire(q);
  return [...p, ...rep(q, B[1] - B[0])];
}
function total(q: Q): string[] {
  const { p, E } = lire(q);
  return [...p, ...rep(q, somme(E))];
}
/** Seuil lu dans le texte : somme des barres avant (moins de) ou après (au moins). Le seuil doit être une borne. */
function seuil(q: Q): { p: string[]; r: number; T: number } {
  const { p, B, E } = lire(q);
  const m = q.text.match(/au moins (\d+)/);
  const n = q.text.match(/(?:inférieures à|moins de) (\d+)/);
  const X = Number(m?.[1] ?? n?.[1] ?? NaN);
  if (!Number.isFinite(X) || (!m && !n)) return { p: [...p, "seuil illisible"], r: NaN, T: 0 };
  const k = B.indexOf(X);
  if (k < 0) return { p: [...p, `${X} n’est pas une borne`], r: NaN, T: 0 };
  return { p, r: m ? somme(E.slice(k)) : somme(E.slice(0, k)), T: somme(E) };
}
function sousSeuil(q: Q): string[] {
  const { p, r } = seuil(q);
  return [...p, ...rep(q, r)];
}
function ecart(q: Q): string[] {
  const { p, B, E } = lire(q);
  const c = classes(q.text);
  if (c.length !== 2) return [...p, "deux classes attendues"];
  const [i, j] = [indice(B, c[0]), indice(B, c[1])];
  if (i < 0 || j < 0) return [...p, "classe absente de la figure"];
  if (E[i] <= E[j]) return [...p, "la première classe doit dépasser la seconde"];
  return [...p, ...rep(q, E[i] - E[j])];
}
function classeDeValeur(q: Q): string[] {
  const { p, B } = lire(q);
  const m = q.text.match(/valeur (\d+)/);
  if (!m) return [...p, "valeur illisible"];
  const v = Number(m[1]);
  return [
    ...p,
    ...qcmUnique(q, (c) => {
      const k = classes(c);
      return k.length === 1 && k[0][0] <= v && v < k[0][1];
    }),
  ];
}
function frequence(q: Q): string[] {
  const { p, B, E } = lire(q);
  const c = classes(q.text);
  if (c.length !== 1) return [...p, "une classe attendue"];
  const i = indice(B, c[0]);
  if (i < 0) return [...p, "classe absente"];
  const j = (E[i] * 100) / somme(E);
  if (!Number.isInteger(j)) return [...p, `${j} % n’est pas entier`];
  return [...p, ...rep(q, j)];
}
function pourcentSeuil(q: Q): string[] {
  const { p, r, T } = seuil(q);
  const j = (r * 100) / T;
  if (!Number.isInteger(j)) return [...p, `${j} % n’est pas entier`];
  return [...p, ...rep(q, j)];
}
/** « exactement X », ou « moins de X » avec X à l'intérieur d'une classe : l'histogramme ne le dit pas. */
function indecidable(q: Q): string[] {
  const { p, B } = lire(q);
  const e = q.text.match(/exactement (\d+)/);
  const m = q.text.match(/moins de (\d+)/);
  if (!e && !m) return [...p, "question illisible"];
  if (m && B.includes(Number(m[1]))) return [...p, "le seuil est une borne : on peut répondre"];
  return [...p, ...qcmUnique(q, (c) => /On ne peut pas/.test(c))];
}
function barreEffacee(q: Q): string[] {
  const { p, B, E } = lire(q, true);
  const T = Number(q.text.match(/(?:Il y a|On compte|total est de) (\d+)/)?.[1] ?? NaN);
  const c = classes(q.text);
  if (!Number.isFinite(T) || c.length !== 1) return [...p, "total ou classe illisibles"];
  const i = indice(B, c[0]);
  if (i < 0) return [...p, "classe absente"];
  if (E[i] !== 0) return [...p, "la barre n’est pas effacée"];
  if (E.filter((e) => e === 0).length !== 1) return [...p, "plusieurs barres vides"];
  const r = T - somme(E);
  if (r <= 0) return [...p, "effectif négatif"];
  return [...p, ...rep(q, r)];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  stat_histogramme_lire_tpl_1: effectifClasse,
  stat_histogramme_lire_tpl_2: extreme,
  stat_histogramme_lire_tpl_3: nombreClasses,
  stat_histogramme_lire_tpl_4: amplitude,
  stat_histogramme_lire_tpl_5: total,
  stat_histogramme_lire_tpl_6: sousSeuil,
  stat_histogramme_lire_tpl_7: ecart,
  stat_histogramme_lire_tpl_8: classeDeValeur,
  stat_histogramme_lire_tpl_9: effectifClasse,
  stat_histogramme_lire_tpl_10: sousSeuil,
  stat_histogramme_lire_tpl_11: extreme,
  stat_histogramme_lire_tpl_12: total,
  stat_histogramme_lire_tpl_13: frequence,
  stat_histogramme_lire_tpl_14: pourcentSeuil,
  stat_histogramme_lire_tpl_15: indecidable,
  stat_histogramme_lire_tpl_16: barreEffacee,
});
