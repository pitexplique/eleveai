import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { valeurCalcul } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/operations-relatifs";
import { evaluer } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/puissances";
import { ecriture, relatifs, valeur } from "./nombres-relatifs";

// LES CORRECTEURS DE operations-relatifs.bank.ts (notion relatif_operation, 5e, 09/10/2026).
// Ils relisent le TEXTE que voit l'élève et refont le calcul sans le gabarit :
//  - un calcul écrit (« −3 + (−4) − (+2) », « Complète : −4 + … = 3 ») passe par
//    le lecteur d'expressions des correcteurs de 4e (`valeurCalcul`, `evaluer`) ;
//  - une consigne en mots (« Ajoute −4 à 8 », « la différence de −7 et de 3 »,
//    « Soustrais 5 de −2 ») est relue mot à mot ;
//  - une situation (température, ascenseur, compte, jeu, plongée, golf…) est
//    relue phrase par phrase : la valeur de départ, puis chaque hausse (« monte »,
//    « gagne », « reçoit »…) ou baisse (« baisse », « descend », « paie »…) ;
//  - une liste « +5 ; −3 ; −7 » est additionnée ; un écart est recalculé.
// Ils vérifient aussi l'unité imposée par l'énoncé et l'écriture des relatifs
// (« − » et pas « - », parenthèses après une opération). Vide = juste.

type Q = TutorGeneratedQuestionV4;
const R = String.raw`([−+]?\d+)`;
const attendu = (q: Q) => valeur(String(q.expected[0]));

function uniteDuTexte(t: string): string {
  if (/°C/.test(t)) return "°C";
  if (/\d+ m\b/.test(t)) return "m";
  if (/€/.test(t)) return "€";
  return "";
}

/* ── Les consignes en mots ─────────────────────────────────────────────── */
const MOTS: [RegExp, (a: number, b: number) => number][] = [
  [new RegExp(`[Aa]jouter? ${R} à ${R}`), (a, b) => b + a],
  [new RegExp(`[Aa]dditionne ${R} et ${R}`), (a, b) => a + b],
  [new RegExp(`somme de ${R} et de ${R}`), (a, b) => a + b],
  [new RegExp(`[Ss]oustrai(?:s|re) ${R} de ${R}`), (a, b) => b - a],
  [new RegExp(`[Ee]nlève ${R} à ${R}`), (a, b) => b - a],
  [new RegExp(`différence de ${R} et de ${R}`), (a, b) => a - b],
  [new RegExp(`Au nombre ${R}, on soustrait ${R}`), (a, b) => a - b],
  [new RegExp(`ajouter à ${R} pour obtenir ${R}`), (a, b) => b - a],
  [new RegExp(`soustraire à ${R} pour obtenir ${R}`), (a, b) => a - b],
];
function valeurMots(t: string): number | null {
  for (const [re, f] of MOTS) {
    const m = t.match(re);
    if (m) return f(valeur(m[1])!, valeur(m[2])!);
  }
  return null;
}

/* ── Les situations ────────────────────────────────────────────────────── */
const HAUSSE = /monte|reçoit|gagne|de plus que|don de/;
const BAISSE = /baisse|descend|paie|perd|de moins que/;
const phrases = (t: string) => t.split(/(?<=[.?])\s+/).filter(Boolean);

/** Départ (premier relatif écrit), puis chaque phrase de changement : ± le premier nombre de la phrase. */
function valeurEvolution(t: string): number | null {
  const ph = phrases(t);
  const changements = ph.slice(1).filter((s) => !s.endsWith("?"));
  if (!changements.length || !changements.every((s) => HAUSSE.test(s) !== BAISSE.test(s))) return null;
  const depart = relatifs(ph[0]);
  if (depart.length !== 1) return null;
  let v = depart[0];
  for (const s of changements) {
    const n = s.match(/\d+/);
    if (!n) return null;
    v += (HAUSSE.test(s) ? 1 : -1) * Number(n[0]);
  }
  return v;
}

/** Une liste « : +5 ; −3 ; −7 ; +2. » → la somme. */
function valeurListe(t: string): number | null {
  const m = t.match(/: ((?:[−+]?\d+(?: °C| €)?)(?: ; [−+]?\d+(?: °C| €)?)+)\./);
  return m ? relatifs(m[1]).reduce((s, x) => s + x, 0) : null;
}

/** « passe de s à e » ou « l'écart » entre deux valeurs : la distance entre elles. */
function valeurVariation(t: string): number | null {
  if (!/passe d|écart/.test(t)) return null;
  const vs = relatifs(t);
  return vs.length === 2 ? Math.abs(vs[1] - vs[0]) : null;
}
/** Le mot de la question (« monté », « perdus »…) va dans le sens de la variation. */
function sensVariation(t: string): string[] {
  if (!/passe d/.test(t)) return [];
  const [s, e] = relatifs(t);
  if (/monté|augmenté|remonté|gagnés/.test(t) && !(e > s)) return [`la question dit une hausse, mais ${s} → ${e}`];
  if (/baissé|descendu|diminué|perdus/.test(t) && !(e < s)) return [`la question dit une baisse, mais ${s} → ${e}`];
  return [];
}

/** La valeur demandée, quelle que soit la forme. */
export function valeurOperation(t: string): number | null {
  // « (+8 + 4) » : le lecteur de 4e ne commence pas un calcul par « (+ » ; « (+8 » vaut « (8 ».
  return valeurListe(t) ?? valeurMots(t) ?? valeurVariation(t) ?? valeurEvolution(t) ?? valeurCalcul(t.replace(/\(\+/g, "("));
}

function corrigerOperation(q: Q): string[] {
  const v = valeurOperation(q.text);
  if (v == null) return [`énoncé illisible pour le correcteur : ${q.text}`];
  const p: string[] = [...sensVariation(q.text)];
  if (attendu(q) !== v) p.push(`attendu ${q.expected[0]}, le calcul donne ${v}`);
  const u = uniteDuTexte(q.text);
  if (u && !String(q.expected[0]).endsWith(u)) p.push(`l'unité « ${u} » manque dans la réponse`);
  return p;
}

/** Retrouver le départ : « La température a baissé de 6 °C. Il fait maintenant −4 °C. » → −4 + 6. */
function corrigerDepart(q: Q): string[] {
  const ph = phrases(q.text);
  const a = ph[0].match(/\d+/);
  const fin = q.text.match(new RegExp(`maintenant (?:à |au niveau |à l’altitude )?${R}`));
  if (!a || !fin) return ["changement ou valeur finale introuvable"];
  const hausse = /a monté|a reçu|remontée?|a gagné|est montée?/.test(ph[0]);
  const baisse = /a baissé|a payé|descendue?|a perdu/.test(ph[0]);
  if (hausse === baisse) return ["sens du changement illisible"];
  const e = valeur(fin[1])!;
  const juste = hausse ? e - Number(a[0]) : e + Number(a[0]);
  const p: string[] = [];
  if (attendu(q) !== juste) p.push(`attendu ${q.expected[0]}, le départ était ${juste}`);
  const u = uniteDuTexte(q.text);
  if (u && !String(q.expected[0]).endsWith(u)) p.push(`l'unité « ${u} » manque dans la réponse`);
  if (u === "m" && (juste > 0 || e > 0)) p.push("le plongeur sort de l'eau");
  return p;
}

/** « Trouve l'erreur » : le calcul écrit est refait ; le résultat montré est bien faux ; une seule proposition juste. */
function corrigerErreur(q: Q): string[] {
  const v = valeurCalcul(q.text);
  if (v == null) return ["calcul illisible"];
  const montre = q.text.match(new RegExp(`= ${R}`));
  const p: string[] = [];
  if (!montre || valeur(montre[1]) === v) p.push("le résultat montré n'est pas faux");
  return [...p, ...qcmUnique(q, (c) => valeur(c) === v)];
}

/** Un programme de calcul : départ, puis « Ajoute x. », « Soustrais x. », « Ajoute l'opposé de x. ». */
function corrigerProgramme(q: Q): string[] {
  const d = q.text.match(new RegExp(`(?:choisit|choisissant|applique à) ${R}`));
  if (!d) return ["nombre de départ introuvable"];
  let v = valeur(d[1])!;
  const etapes = [...q.text.matchAll(new RegExp(`(Ajoute l’opposé de|Ajoute|Soustrais) ${R}\\.`, "g"))];
  if (etapes.length < 2) return ["étapes du programme introuvables"];
  for (const e of etapes) v += (e[1] === "Ajoute" ? 1 : -1) * valeur(e[2])!;
  return attendu(q) === v ? [] : [`attendu ${q.expected[0]}, le programme donne ${v}`];
}

export const CORRECTEURS: CorrecteursMaths = Object.fromEntries(
  Object.entries(
    avecRegleMotsCles({
      relatif_addition_tpl_1: corrigerOperation,
      relatif_addition_tpl_x1: corrigerOperation,
      relatif_addition_tpl_2_simple: corrigerOperation,
      relatif_addition_tpl_3_quatre: corrigerOperation,
      relatif_soustraction_tpl_1: corrigerOperation,
      relatif_soustraction_tpl_x1: corrigerOperation,
      relatif_soustraction_tpl_2_simple: corrigerOperation,
      relatif_calcul_tpl_1: corrigerOperation,
      relatif_calcul_tpl_x1: corrigerOperation,
      relatif_calcul_tpl_2_trois: corrigerOperation,
      relatif_probleme_tpl_x1: corrigerOperation,
      relatif_probleme_tpl_2_deux_etapes: corrigerOperation,
      relatif_probleme_tpl_3_depart: corrigerDepart,
      relatif_operation_defi_tpl_1: corrigerErreur,
      relatif_operation_defi_tpl_x1: corrigerProgramme,
      relatif_operation_defi_tpl_2_trou: corrigerOperation,
    }),
  ).map(([id, f]) => [id, (q: Q) => [...ecriture(q), ...f(q)]]),
);

export { evaluer, qcmUnique };
