import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { reglesEcriture, nombresDuTexte } from "./entiers";

// Rempli par la réparation du 06/10/2026 (voir types.ts).
// Chaque correcteur relit le TEXTE que voit l'élève : s'il y a une écriture
// (« 47 + 8 », « … ÷ 6 = 12 »), il la calcule ou la résout lui-même ; sinon
// (situation), il refait l'opération que la situation demande sur les nombres
// lus. Puis il compare à la réponse attendue.

/** Valeur d'un nombre écrit à la française (« 1 250,5 »). */
export const val = (s: string) => Number(String(s).replace(/[  ]/g, "").replace(",", ".").replace(/[^\d.\-]/g, ""));

/** Les nombres d'un texte, décimaux compris. */
export function nombresDecimaux(t: string): number[] {
  return (t.match(/\d{1,3}(?:[  ]\d{3})+(?:,\d+)?(?!\d)|\d+(?:,\d+)?/g) ?? []).map(val);
}

/** Évalue une écriture avec + − × ÷ et parenthèses ; « … » vaut x. */
export function evaluer(expr: string, x = 0): number {
  const toks = (expr.match(/\d{1,3}(?:[  ]\d{3})+(?:,\d+)?(?!\d)|\d+(?:,\d+)?|…|[+\-−×÷()]/g) ?? []).map((t) => t.trim());
  let i = 0;
  const prim = (): number => {
    const t = toks[i++];
    if (t === "(") {
      const v = somme();
      i++;
      return v;
    }
    if (t === "…") return x;
    return val(t);
  };
  const produit = (): number => {
    let v = prim();
    while (toks[i] === "×" || toks[i] === "÷") v = toks[i++] === "×" ? v * prim() : v / prim();
    return v;
  };
  const somme = (): number => {
    let v = produit();
    while (toks[i] === "+" || toks[i] === "-" || toks[i] === "−") v = toks[i++] === "+" ? v + produit() : v - produit();
    return v;
  };
  return somme();
}

const proche = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/** Résout « gauche = droite » où « … » apparaît une fois. */
export function resoudre(gauche: string, droite: string): number {
  const f = (x: number) => evaluer(gauche, x) - evaluer(droite, x);
  const f0 = f(0);
  const f1 = f(1);
  if (Number.isFinite(f0) && proche(f(2), 2 * f1 - f0) && !proche(f1, f0)) return Math.round((-f0 / (f1 - f0)) * 1e6) / 1e6;
  // « 84 ÷ … = 12 » : l'inconnue au diviseur, on cherche parmi les entiers.
  for (let x = 1; x <= 20000; x++) if (proche(f(x), 0)) return x;
  return NaN;
}

/** L'écriture à calculer dans une ligne (la plus longue suite de nombres et d'opérations). */
export function ecritureDuTexte(t: string): string | null {
  const m = (t.match(/[\d(…][\d\s,+\-−×÷()…]*[\d)…]/g) ?? []).filter((e) => /[+\-−×÷]/.test(e));
  return m.sort((a, b) => b.length - a.length)[0] ?? null;
}

type Sens = "somme" | "difference" | "produit" | "quotient";

/** La réponse juste lue dans le texte : écriture calculée ou résolue, sinon l'opération de la situation. */
export function reponseJuste(t: string, sens: Sens): { v: number; ecrite: boolean } {
  const lignes = t.split("\n");
  for (const l of lignes)
    if (l.includes("=") && l.includes("…")) {
      const [g, d] = l.split("=");
      return { v: resoudre(g.slice(g.search(/[\d(…]/)), d), ecrite: true };
    }
  for (const l of lignes) {
    const e = ecritureDuTexte(l);
    if (e) return { v: evaluer(e), ecrite: true };
  }
  const n = nombresDecimaux(t);
  if (sens === "somme") return { v: n.reduce((a, b) => a + b, 0), ecrite: false };
  if (sens === "produit") return { v: n.reduce((a, b) => a * b, 1), ecrite: false };
  const max = Math.max(...n);
  const autres = [...n];
  autres.splice(n.indexOf(max), 1);
  if (sens === "difference") return { v: max - autres.reduce((a, b) => a + b, 0), ecrite: false };
  return { v: autres.length === 1 ? max / autres[0] : NaN, ecrite: false };
}

/** Correcteur générique d'un calcul (écrit ou en situation). */
export function corrigerCalcul(sens: Sens, opts: { entier?: boolean } = {}) {
  return (q: TutorGeneratedQuestionV4): string[] => {
    const p = reglesEcriture(q);
    const { v, ecrite } = reponseJuste(q.text, sens);
    if (!Number.isFinite(v)) return [...p, "calcul illisible dans le texte"];
    const attendu = val(q.expected[0]);
    if (!proche(attendu, v)) p.push(`réponse attendue ${q.expected[0]}, recalculée ${v}`);
    if (v < 0) p.push("résultat négatif");
    if (opts.entier && !Number.isInteger(v)) p.push(`résultat non entier : ${v}`);
    if (!ecrite && nombresDecimaux(q.text).length < 2) p.push("la situation ne donne pas assez de nombres");
    // L'unité acceptée doit être celle des nombres de l'énoncé.
    for (const e of q.expected.slice(1)) {
      const u = e.replace(/^[\d  ,.]+/, "").trim();
      if (u && !q.text.includes(` ${u}`) && !(u === "s" && q.text.includes("secondes")) && !(u === "min" && q.text.includes("minutes")) && !(u === "m" && q.text.includes("mètres")))
        p.push(`unité « ${u} » absente de l'énoncé`);
    }
    // En QCM : une seule proposition vaut la réponse.
    if (q.format === "qcm") {
      const justes = (q.choices ?? []).filter((c) => proche(val(c), v));
      if (justes.length !== 1) p.push(`${justes.length} propositions justes`);
    }
    return p;
  };
}

const FACTEURS: Record<string, number> = { double: 2, triple: 3, moitié: 1 / 2, quart: 1 / 4 };

/** Stratégies : le MOT porte l'opération (double, moitié…), sinon l'écriture ou la situation. */
function corrigerStrategie(q: TutorGeneratedQuestionV4): string[] {
  const m = q.text.match(/(double|triple|moitié|quart)/);
  if (!m) {
    const sens = /partag|répart|égaux|autant dans|Divise|quotient/.test(q.text) ? "quotient" : "produit";
    return corrigerCalcul(sens)(q);
  }
  const p = reglesEcriture(q);
  const n = nombresDecimaux(q.text);
  if (n.length !== 1) return [...p, `il faut un seul nombre, lu : ${n.join(", ")}`];
  const juste = n[0] * FACTEURS[m[1]];
  if (!proche(val(q.expected[0]), juste)) p.push(`réponse attendue ${q.expected[0]}, recalculée ${juste}`);
  if (!Number.isInteger(juste)) p.push(`${m[1]} non entier en 6e ici : ${juste}`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = {
  entier_calcul_mental_defi_tpl_1: corrigerCalcul("somme", { entier: true }),
  entier_calcul_mental_defi_tpl_2: corrigerCalcul("produit", { entier: true }),
  entier_calcul_mental_defi_aire_longueur_tpl_1: corrigerCalcul("somme", { entier: true }),
  entier_calcul_mental_defi_aire_longueur_tpl_2: corrigerCalcul("difference", { entier: true }),
  entier_calcul_mental_defi_aire_longueur_tpl_3: corrigerCalcul("produit", { entier: true }),
  entier_calcul_mental_defi_aire_longueur_tpl_4: corrigerCalcul("quotient", { entier: true }),
  entier_calcul_mental_defi_aire_longueur_tpl_5: corrigerCalcul("difference", { entier: true }),
  entier_strategie_mentale_tpl_1: corrigerStrategie,
  entier_strategie_mentale_tpl_2: corrigerStrategie,
  entier_strategie_mentale_tpl_3_astuces: corrigerCalcul("produit", { entier: true }),
  entier_addition_mentale_tpl_1: corrigerCalcul("somme", { entier: true }),
  entier_addition_mentale_tpl_2: corrigerCalcul("somme", { entier: true }),
  entier_soustraction_mentale_tpl_1: corrigerCalcul("difference", { entier: true }),
  entier_soustraction_mentale_tpl_2: corrigerCalcul("difference", { entier: true }),
  entier_multiplication_mentale_tpl_1: corrigerCalcul("produit", { entier: true }),
  entier_multiplication_mentale_tpl_2: corrigerCalcul("produit", { entier: true }),
  entier_division_mentale_tpl_1: corrigerCalcul("quotient", { entier: true }),
  entier_division_mentale_tpl_2: corrigerCalcul("quotient"),
  entier_division_mentale_tpl_3_etoile_2: corrigerCalcul("quotient", { entier: true }),
};

// Pour les tests : nombresDuTexte reste celui des entiers.
export { nombresDuTexte };
