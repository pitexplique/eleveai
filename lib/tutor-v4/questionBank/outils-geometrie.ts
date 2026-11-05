// LES OUTILS DES BANQUES DE GÉOMÉTRIE PARTAGÉES PAR PLUSIEURS PAYS (05/11/2026) :
// tirages, écritures admises, explications, et lecture du texte pour les correcteurs.
//
// ⚠️ `fabriqueGabarits` fixe la classe et la notion ; chaque banque reste un fichier
// de générateurs. Les correcteurs n'importent d'ici que la LECTURE, jamais un calcul.

import type { TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { ConstructionCanvasData } from "@/lib/tutor-v4/types_canvas";
import { qcmUnique, egal } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { NB, num, net, verifierReponse } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/grandeurs";

export const entre = (a: number, b: number) => Math.floor(Math.random() * (b - a + 1)) + a;
export const un = <T,>(l: readonly T[]): T => l[Math.floor(Math.random() * l.length)];
export const melange = <T,>(l: readonly T[]): T[] => l.map((x) => [Math.random(), x] as const).sort((a, b) => a[0] - b[0]).map((x) => x[1]);
export const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

export const fr = (n: number): string => {
  const [e, d] = String(Math.round(n * 1000) / 1000).split(".");
  const ent = e.length > 4 ? e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : e;
  return d ? `${ent},${d}` : ent;
};

export const UNITES = ["cm", "cm", "dm", "m", "mm"] as const;

/** La réponse attendue d'une mesure : « 12 cm », et le nombre seul. */
export function mesure(x: number, u: string): string[] {
  const f = fr(x);
  const l = [`${f} ${u}`, f];
  if (f.includes(" ")) l.push(`${f.replace(/ /g, "")} ${u}`, f.replace(/ /g, ""));
  if (/[²³]/.test(u)) l.push(`${f} ${u.replace("²", "2").replace("³", "3")}`);
  return [...new Set(l)];
}

/** Valeur exacte « aπ » : le coefficient seul n'est jamais accepté. */
export function valeurPi(c: number, u: string): string[] {
  const a = String(Math.round(c * 1000) / 1000);
  const v = fr(c);
  const formes = [`${v}π`, `${a}π`, `${a} × π`, `${a} * π`, `${a} pi`];
  return [`${v}π ${u}`, ...formes, ...formes.flatMap((f) => [`${f} ${u}`, `${f} ${u.replace("²", "2")}`])].filter((x, i, t) => t.indexOf(x) === i);
}

export const enDegres = (x: number) => [`${fr(x)}°`, fr(x), `${fr(x)} °`, `${fr(x)} degrés`];

export function qcm(juste: string, faux: string[]): string[] {
  const d = melange([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return melange([juste, ...d]);
}

/** L'explication en quatre temps du coach. */
export const expliquer = (definition: string, methode: string, calcul: string, conclusion: string) =>
  `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

/** L'angle écrit en LaTeX : $\widehat{BAC}$. */
export const ang = (a: string, s: string, b: string) => `$\\widehat{${a}${s}${b}}$`;

const TRIPLETS = ["ABC", "DEF", "KLM", "RST", "UVW", "PQR", "XYZ", "JKL", "NPQ", "EFT"];

/** Trois noms de sommets, jamais G, H, I, O (réservés aux centres), dans un ordre tourné. */
export function nomsTriangle(): [string, string, string] {
  const t = un(TRIPLETS).split("");
  const k = entre(0, 2);
  return [t[k], t[(k + 1) % 3], t[(k + 2) % 3]];
}

/** Des noms de points libres, hors de ceux déjà pris. */
export function nomsLibres(pris: readonly string[], n: number): string[] {
  return melange(["M", "N", "P", "Q", "D", "E", "J", "S", "T", "U"].filter((x) => !pris.includes(x))).slice(0, n);
}

export function fabriqueGabarits(niveau: "5e" | "4e" | "3e", notionId: string, tags: string[]) {
  return (microId: string, n: number, difficulty: number, hint: string, generate: () => TutorGeneratedQuestionV4 | Record<string, unknown>): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `${microId}_tpl_${n}`,
      niveau,
      matiere: "maths",
      notionId,
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: [...tags, "template"],
      generate,
    }) as unknown as TutorBankItemV4;
}

/* ───────────────────────── la lecture, pour les correcteurs ───────────────────────── */

type Q = TutorGeneratedQuestionV4;

/** Les mesures du texte, dans l'ordre : « 12 cm », « 40 cm² », « 9π cm³ ». */
export function mesuresDe(t: string) {
  const res: { v: number; pi: boolean; u: string }[] = [];
  for (const m of t.matchAll(new RegExp(`${NB}(π)? ?(mm|cm|dm|km|m)([²³]?)(?![\\p{L}\\d])`, "gu"))) res.push({ v: num(m[1]), pi: !!m[2], u: m[3] + m[4] });
  return res;
}
export const longueursDe = (t: string) => mesuresDe(t).filter((m) => !/[²³]/.test(m.u));
export const airesDe = (t: string) => mesuresDe(t).filter((m) => m.u.endsWith("²"));
export const degresDe = (t: string) => [...t.matchAll(new RegExp(`${NB} ?°`, "g"))].map((m) => num(m[1]));

export function reponseLongueur(q: Q, juste: number, u: string): string[] {
  return verifierReponse(q, juste, u);
}

export function reponseDegres(q: Q, juste: number): string[] {
  const p: string[] = [];
  for (const x of q.expected) {
    const m = String(x).match(new RegExp(`^${NB}(?: ?°| degrés)?$`));
    if (!m || !egal(net(num(m[1])), net(juste))) p.push(`écriture admise « ${x} » ≠ ${juste}°`);
  }
  if (!(juste > 0 && juste < 360)) p.push(`angle impossible : ${juste}°`);
  return p;
}

export function reponsePi(q: Q, a: number, u: string): string[] {
  const p: string[] = [];
  if (!Number.isInteger(a) && !Number.isInteger(a * 100)) p.push(`coefficient ${a} trop long`);
  const lu = String(q.expected[0]).match(new RegExp(`^${NB}π ${u}$`));
  if (!lu || !egal(net(num(lu[1])), net(a))) p.push(`attendu « ${q.expected[0]} », juste : ${a}π ${u}`);
  for (const x of q.expected) if (/^[\d ,]+$/.test(String(x).trim())) p.push("coefficient seul accepté");
  return p;
}

export function reponseQcm(q: Q, juste: string): string[] {
  return [...(q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste « ${juste} »`]), ...qcmUnique(q, (c) => c === juste)];
}

/** Les sommets écrits après « triangle » : « triangle ABC » → [A, B, C]. */
export const sommetsDe = (t: string): string[] => (t.match(/[Tt]riangle ([A-Z]{3})/)?.[1] ?? "").split("");

const pointDe = (q: Q, id: string) => {
  const c = q.canvas as ConstructionCanvasData | undefined;
  return c?.kind === "construction" ? c.points.find((p) => p.id === id) : undefined;
};

/** La figure dit-elle bien que m est le milieu de [a b] ? */
export function estMilieuSurFigure(q: Q, m: string, a: string, b: string): boolean {
  const pm = pointDe(q, m);
  const pa = pointDe(q, a);
  const pb = pointDe(q, b);
  return !!pm && !!pa && !!pb && Math.hypot(pm.x - (pa.x + pb.x) / 2, pm.y - (pa.y + pb.y) / 2) < 1e-9;
}

/** La figure dit-elle bien que (s p) est perpendiculaire à (a b) ? */
export function perpendiculaireSurFigure(q: Q, s: string, p: string, a: string, b: string): boolean {
  const ps = pointDe(q, s);
  const pp = pointDe(q, p);
  const pa = pointDe(q, a);
  const pb = pointDe(q, b);
  return !!ps && !!pp && !!pa && !!pb && Math.abs((ps.x - pp.x) * (pa.x - pb.x) + (ps.y - pp.y) * (pa.y - pb.y)) < 1e-9;
}

/** Les trois sommets sur la figure, pour les recalculs (centres, angles). */
export function coordonneesFigure(q: Q, ids: readonly string[]) {
  return ids.map((id) => pointDe(q, id));
}
