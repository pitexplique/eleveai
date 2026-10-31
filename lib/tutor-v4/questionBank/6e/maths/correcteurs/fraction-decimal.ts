import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { egal, valeur, verifierAttendu, verifierQcm } from "./fractions";

// Les correcteurs de fraction-decimal.bank.ts (31/10/2026). Chacun relit le
// TEXTE et la FIGURE vus par l'élève, refait la lecture ou la conversion, et ne
// fait jamais confiance au gabarit.

type Point = { value: number; label?: string; below?: string };
const pointsDe = (q: TutorGeneratedQuestionV4): Point[] => ((q.canvas as any)?.points ?? []) as Point[];
const DEN = [10, 100, 1000];

/** La droite elle-même : de 0 à 2 au plus, graduée en dixièmes. */
function droite(q: TutorGeneratedQuestionV4): string[] {
  const c = q.canvas as any;
  if (c?.kind !== "number_line") return ["figure : une droite graduée attendue"];
  const p: string[] = [];
  if (c.min !== 0 || c.max > 2 || c.step !== 1 || c.minorStep !== 0.1) p.push("droite : de 0 à 2 au plus, graduée en dixièmes");
  for (const pt of pointsDe(q)) {
    const n = Math.round(pt.value * 10);
    if (!egal(pt.value * 10, n)) p.push(`point ${pt.label} hors d'une graduation`);
    if (n <= 0 || n % 10 === 0 || pt.value > c.max) p.push(`point ${pt.label} sur un entier ou hors de la droite`);
  }
  return p;
}

function lire(q: TutorGeneratedQuestionV4, sup1: boolean): string[] {
  const pts = pointsDe(q);
  if (pts.length !== 1) return ["un seul point attendu"];
  const { value, label } = pts[0];
  const n = Math.round(value * 10);
  const p = droite(q);
  if (!q.text.includes(`point ${label}`)) p.push(`le texte ne nomme pas le point ${label}`);
  if (!/partagée en 10/.test(q.text)) p.push("le texte doit dire que l'unité est partagée en 10");
  if (sup1 !== n > 10) p.push(`${n}/10 : ${sup1 ? "devrait dépasser 1" : "devrait être plus petit que 1"}`);
  if (q.comparator === "exact_text") {
    if (!/dénominateur 10|… \/ 10/.test(q.text)) p.push("la fraction demandée doit être précisée (dénominateur 10)");
    if (q.expected.length !== 1 || q.expected[0] !== `${n}/10`) p.push(`réponse attendue ${q.expected.join(" | ")} au lieu de ${n}/10`);
    return p;
  }
  if (!/virgule|décimal/.test(q.text)) p.push("la consigne doit demander une virgule");
  return [...p, ...verifierAttendu(q, n / 10)];
}

function sous(q: TutorGeneratedQuestionV4): string[] {
  const pts = pointsDe(q);
  if (pts.length !== 1) return ["un seul point attendu"];
  const m = q.text.match(/(\d+)\/10\b/);
  if (!m) return ["fraction n/10 introuvable dans le texte"];
  const n = Number(m[1]);
  const p = droite(q);
  if (pts[0].label !== `${n}/10` || pts[0].below !== "?") p.push("la figure doit porter la fraction du texte au-dessus et « ? » dessous");
  if (!egal(pts[0].value, n / 10)) p.push("le point n'est pas à la place de la fraction");
  return [...p, ...verifierQcm(q, n / 10)];
}

function placer(q: TutorGeneratedQuestionV4): string[] {
  const m = q.text.match(/(?:abscisse|cherche|est à) (\d+(?:,\d)?(?:\/10)?)/);
  if (!m) return ["nombre cherché introuvable"];
  const v = valeur(m[1]);
  const pts = pointsDe(q);
  const p = droite(q);
  if (pts.length !== 3) p.push("trois points attendus");
  const bons = pts.filter((pt) => egal(pt.value, v));
  if (bons.length !== 1) return [...p, `${m[1]} : ${bons.length} point(s) à cette place`];
  for (let i = 0; i < pts.length; i++)
    for (let j = i + 1; j < pts.length; j++)
      if (Math.abs(pts[i].value - pts[j].value) < 0.15) p.push("deux points trop proches pour être distingués");
  if (q.expected[0] !== bons[0].label) p.push(`réponse attendue ${q.expected[0]} au lieu de ${bons[0].label}`);
  const labels = pts.map((pt) => pt.label).sort().join();
  if ((q.choices ?? []).slice().sort().join() !== labels) p.push("les choix ne sont pas les noms des points");
  return p;
}

/** n/d avec d = 10, 100 ou 1 000 : le décimal attendu (ou les choix). */
function versDecimal(q: TutorGeneratedQuestionV4, qcm: boolean): string[] {
  const m = q.text.match(/(\d+)\/(\d+)/);
  if (!m) return ["fraction introuvable"];
  const [n, d] = [Number(m[1]), Number(m[2])];
  const p: string[] = [];
  if (!DEN.includes(d)) p.push(`${d} n'est pas 10, 100 ou 1 000`);
  if (n % 10 === 0) p.push(`${n}/${d} se simplifie : pas l'esprit de la question`);
  if (n / d > 4) p.push(`${n}/${d} : trop grand pour la 6e`);
  return [...p, ...(qcm ? verifierQcm(q, n / d) : verifierAttendu(q, n / d))];
}

function versFraction(q: TutorGeneratedQuestionV4): string[] {
  const m = q.text.match(/(\d+(?:,\d+)?) = … \/ (\d+)/);
  if (!m) return ["« décimal = … / d » introuvable"];
  const d = Number(m[2]);
  const v = valeur(m[1]) * d;
  const p: string[] = [];
  if (!DEN.includes(d)) p.push(`${d} n'est pas 10, 100 ou 1 000`);
  if (!egal(v, Math.round(v))) p.push(`${m[1]} n'a pas un nombre entier de ${d}e : la réponse ne serait pas entière`);
  return [...p, ...verifierAttendu(q, Math.round(v))];
}

/** « a/10 = b + c/10 » est-elle juste ? (c peut être sur 100). */
function egaliteJuste(s: string): boolean | null {
  const m = s.match(/^(\d+)\/(\d+) = (\d+) \+ (\d+)\/(\d+)$/);
  if (!m) return null;
  const [a, b, e, c, d] = m.slice(1).map(Number);
  return egal(a / b, e + c / d);
}

function decomposer(q: TutorGeneratedQuestionV4): string[] {
  if (q.format === "qcm") {
    const p: string[] = [];
    const justes = (q.choices ?? []).filter((c) => egaliteJuste(c) === true);
    if ((q.choices ?? []).some((c) => egaliteJuste(c) === null)) p.push("une proposition n'est pas une égalité lisible");
    if (justes.length !== 1) p.push(`${justes.length} égalités justes`);
    if (justes[0] !== q.expected[0]) p.push(`réponse attendue ${q.expected[0]} au lieu de ${justes[0]}`);
    return p;
  }
  const m = q.text.match(/(\d+)\/10 = (\d+) \+ … \/ 10/);
  if (!m) return ["« n/10 = e + … / 10 » introuvable"];
  const [n, e] = [Number(m[1]), Number(m[2])];
  const r = n - 10 * e;
  if (r <= 0 || r >= 10) return [`${n}/10 = ${e} + ? : pas de reste entre 1 et 9`];
  return verifierAttendu(q, r);
}

export const CORRECTEURS: CorrecteursMaths = {
  fraction_decimal_tpl_lire: (q) => lire(q, false),
  fraction_decimal_tpl_lire_sup1: (q) => lire(q, true),
  fraction_decimal_tpl_sous: sous,
  fraction_decimal_tpl_placer: placer,
  fraction_decimal_tpl_vers_decimal: (q) => versDecimal(q, false),
  fraction_decimal_tpl_vers_decimal_centiemes: (q) => versDecimal(q, false),
  fraction_decimal_tpl_vers_fraction: versFraction,
  fraction_decimal_tpl_vers_fraction_centiemes: versFraction,
  fraction_decimal_tpl_piege_centiemes: (q) => versDecimal(q, true),
  fraction_decimal_tpl_decomposer: decomposer,
};
