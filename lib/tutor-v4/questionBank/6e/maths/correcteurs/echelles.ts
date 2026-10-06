import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { attendu, avecRegleMotsCles, egal, lireNombre, qcmUnique, uniteAttendue } from "./pourcentages";

// LES CORRECTEURS DE echelles.bank.ts (06/10/2026, voir types.ts).
// Ils relisent dans le texte la CORRESPONDANCE connue (« 1 cm représente 5 m »,
// « 3 cm pour 12 m », « l'échelle 1/200 »), les autres mesures en cm ou en m,
// et la FIGURE quand il y en a une ; puis ils refont le calcul (linéarité ou
// retour à l'unité). Jamais la formule du gabarit. Vide = juste.

const num = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const NB = "(\\d+(?:,\\d+)?)";
/** « 24 » ou « 7,5 » : comme les gabarits écrivent les nombres. */
const fr = (x: number) => String(Math.round(x * 100) / 100).replace(".", ",");

/** La correspondance connue : c cm (sur le papier) ↔ r u (en vrai). */
function correspondance(t: string) {
  const re = new RegExp(`${NB} cm(?: sur (?:le plan|la carte|la maquette))?(?: correspond(?:ent)? à| représente(?:nt)?| pour) ${NB} (m|km)\\b`);
  const m = t.match(re);
  if (!m) return null;
  return { c: num(m[1]), r: num(m[2]), u: m[3], reste: t.replace(m[0], " ") };
}

/** Les mesures en cm d'un texte (hors correspondance). */
const mesuresCm = (t: string) => [...t.matchAll(new RegExp(`${NB} cm(?![²a-zà-ü])`, "g"))].map((m) => num(m[1]));
/** Les longueurs réelles « 36 m », « 7,5 km » d'un texte (hors correspondance). */
const mesuresReelles = (t: string) =>
  [...t.matchAll(new RegExp(`${NB} (m|km)(?![²a-zà-ü])`, "g"))].map((m) => ({ v: num(m[1]), u: m[2] }));

/** Le texte sans l'échelle « 1/n » ni son explication « 1 cm sur … représente n cm en vrai ». */
const sansExplication = (t: string, n: number) =>
  t
    .replace(new RegExp(`1 cm sur (?:le plan|la maquette|la carte) représente ${n} cm en vrai`, "g"), " ")
    .replace(/1\/\d+/g, " ")
    .replace(/« [^»]* »/g, " ");

/** L'échelle 1/n, et son explication dans l'énoncé (exigée, Frédéric le 06/10). */
function echelleFraction(t: string): { n: number; pb: string[] } | null {
  const m = t.match(/1\/(\d+)/);
  if (!m) return null;
  const n = Number(m[1]);
  const pb = new RegExp(`1 cm sur (?:le plan|la maquette|la carte) représente ${n} cm en vrai`).test(t) ? [] : [`l'échelle 1/${n} n'est pas expliquée dans l'énoncé`];
  return { n, pb };
}

/** Échelle 1/n, une mesure en cm sur le papier : la longueur réelle en mètres. */
function corrigerFractionVersReel(q: TutorGeneratedQuestionV4): string[] {
  const e = echelleFraction(q.text);
  if (!e) return ["pas d'échelle 1/n"];
  const cms = mesuresCm(sansExplication(q.text, e.n));
  if (cms.length !== 1) return [...e.pb, `une mesure en cm attendue, lues : ${cms.join(", ")}`];
  const juste = (cms[0] * e.n) / 100;
  if (juste > 500) e.pb.push(`longueur réelle ${juste} m peu plausible`);
  return [...e.pb, ...verifierReponse(q, juste, "m"), ...verifierFigure(q, [`1/${e.n}`, `${fr(cms[0])} cm`])];
}

/** Échelle 1/n, une longueur réelle en m : la mesure sur le papier en cm. */
function corrigerFractionVersPlan(q: TutorGeneratedQuestionV4): string[] {
  const e = echelleFraction(q.text);
  if (!e) return ["pas d'échelle 1/n"];
  const reels = mesuresReelles(sansExplication(q.text, e.n)).filter((x) => x.u === "m");
  if (reels.length !== 1) return [...e.pb, `une longueur réelle en m attendue, lues : ${reels.map((x) => x.v).join(", ")}`];
  const juste = (reels[0].v * 100) / e.n;
  if (juste > 40) e.pb.push(`${juste} cm : ne tient pas sur une feuille`);
  return [...e.pb, ...verifierReponse(q, juste, "cm"), ...verifierFigure(q, [`1/${e.n}`, `${fr(reels[0].v)} m`])];
}

/** Une réponse courte : la valeur, l'unité, au plus deux décimales. */
function verifierReponse(q: TutorGeneratedQuestionV4, juste: number, u: string): string[] {
  const p: string[] = [];
  if (!egal(attendu(q), Math.round(juste * 100) / 100) || Math.abs(juste * 100 - Math.round(juste * 100)) > 1e-9)
    p.push(`attendu « ${q.expected[0]} », le texte donne ${juste} ${u}`);
  if (uniteAttendue(q) && uniteAttendue(q) !== u) p.push(`unité « ${uniteAttendue(q)} » au lieu de « ${u} »`);
  if (!new RegExp(`en ${u}\\b|${u === "m" ? "mètres" : u === "km" ? "kilomètres" : "centimètres"}`).test(q.text)) p.push(`l'énoncé ne dit pas l'unité de la réponse (${u})`);
  return p;
}

/** La figure doit porter les mêmes nombres que le texte. */
function verifierFigure(q: TutorGeneratedQuestionV4, attendus: string[]): string[] {
  const c = q.canvas as Record<string, unknown> | undefined;
  if (!c) return [];
  const labels = Object.values(c).filter((v) => typeof v === "string").join(" | ");
  return attendus.filter((a) => !labels.includes(a)).map((a) => `la figure ne montre pas « ${a} » (elle montre : ${labels})`);
}

// ─── Du plan vers la réalité (et comprendre) ────────────────────────────────

/** c cm ↔ r u connu, une autre mesure en cm : sa longueur réelle. */
function corrigerVersReel(q: TutorGeneratedQuestionV4): string[] {
  const k = correspondance(q.text);
  if (!k) return ["aucune correspondance « … cm représente … » dans le texte"];
  const autres = mesuresCm(k.reste);
  if (autres.length !== 1) return [`une seule autre mesure en cm attendue, lues : ${autres.join(", ")}`];
  const juste = (autres[0] * k.r) / k.c;
  return [
    ...verifierReponse(q, juste, k.u),
    ...verifierFigure(q, [`${fr(k.r)} ${k.u}`, `${fr(autres[0])} cm`]),
  ];
}

// ─── Défi : le périmètre d'un rectangle ─────────────────────────────────────

/** Un rectangle « a u sur b u » et 1 cm ↔ k m : le périmètre du dessin (cm) ou le périmètre réel (m). */
function perimetreAttendu(t: string): { v: number; u: string } | null {
  const k = Number(t.match(/1 cm (?:représente|pour) (\d+) m\b/)?.[1]);
  const r = t.match(new RegExp(`${NB} (m|cm) sur ${NB} (m|cm)`));
  if (!k || !r || r[2] !== r[4]) return null;
  const tour = 2 * (num(r[1]) + num(r[3]));
  return r[2] === "m" ? { v: tour / k, u: "cm" } : { v: tour * k, u: "m" };
}

function corrigerPerimetre(q: TutorGeneratedQuestionV4): string[] {
  const p = perimetreAttendu(q.text);
  if (!p) return ["rectangle ou échelle illisible"];
  return verifierReponse(q, p.v, p.u);
}

// ─── De la réalité vers le plan ─────────────────────────────────────────────

/** 1 cm ↔ k u connu, une longueur réelle : sa mesure sur le papier, en cm. */
function corrigerVersPlan(q: TutorGeneratedQuestionV4): string[] {
  const k = correspondance(q.text);
  if (!k) return ["aucune correspondance « 1 cm représente … » dans le texte"];
  const reels = mesuresReelles(k.reste).filter((x) => x.u === k.u);
  if (reels.length !== 1) return [`une seule longueur réelle attendue, lues : ${reels.map((x) => x.v).join(", ")}`];
  const juste = (reels[0].v * k.c) / k.r;
  const p = juste > 40 ? [`${juste} cm : ne tient pas sur une feuille`] : [];
  return [...p, ...verifierReponse(q, juste, "cm"), ...verifierFigure(q, [`${fr(k.r)} ${k.u}`, `${fr(reels[0].v)} ${k.u}`])];
}

/** « Que veut dire 1/n ? » : 1 cm sur le papier représente n cm en vrai. */
function corrigerSensFraction(q: TutorGeneratedQuestionV4): string[] {
  const n = Number(q.text.match(/1\/(\d+)/)?.[1]);
  if (!n) return ["pas d'échelle 1/n dans le texte"];
  return qcmUnique(q, (c) => new RegExp(`^1 cm sur (?:le plan|la maquette|la carte) représente ${n} cm en vrai$`).test(c));
}

/**
 * Les anciennes questions ouvertes, FERMÉES le 06/10 (coordinateur) : réponse
 * courte (nombre + unité) ou QCM sur les pièges. On reconnaît le cas au texte,
 * on refait le calcul, et la proposition juste doit porter le bon nombre.
 */
function corrigerFermee(q: TutorGeneratedQuestionV4): string[] {
  const t = q.text;
  if (q.format === "short") {
    if (/1\/\d+/.test(t)) return corrigerFractionVersReel(q);
    const k = correspondance(t);
    if (k && mesuresReelles(k.reste).length === 1 && mesuresCm(k.reste).length === 0) return corrigerVersPlan(q);
    return corrigerVersReel(q);
  }
  if (q.format !== "qcm") return [`format « ${q.format} » inattendu`];
  // QCM : une seule proposition porte le bon raisonnement ET le bon nombre.
  if (/périmètre/.test(t)) {
    const per = perimetreAttendu(t);
    if (!per) return ["rectangle ou échelle illisible"];
    return qcmUnique(q, (c) => /^réduire chaque côté/.test(c) && c.endsWith(`: ${fr(per.v)} ${per.u}`));
  }
  const frac = t.match(/1\/(\d+)/);
  if (frac) {
    const e = echelleFraction(t)!;
    return [...e.pb, ...qcmUnique(q, (c) => c.includes(`représente ${e.n} cm, pas ${e.n} m`))];
  }
  const k = correspondance(t);
  if (!k) return ["aucune correspondance dans le texte"];
  const cms = mesuresCm(k.reste);
  const reels = mesuresReelles(k.reste);
  if (/pense qu(?:e |’)/.test(t)) {
    if (cms.length !== 1 || reels.length !== 1) return ["erreur racontée illisible"];
    const p: string[] = [];
    if (/en vrai\) doit mesurer/.test(t)) {
      // Vers le plan : l'erreur racontée est « a multiplié » (réel × k, en cm).
      if (!egal(cms[0], Math.round(reels[0].v * k.r * 100) / 100)) p.push(`l'erreur racontée (${cms[0]} cm) n'est pas ${reels[0].v} × ${k.r}`);
      return [...p, ...qcmUnique(q, (c) => c.includes("multiplié au lieu de diviser") && c.endsWith(`tracer ${fr(reels[0].v / k.r)} cm`))];
    }
    if (!egal(reels[0].v, Math.round((cms[0] / k.r) * 100) / 100)) p.push(`l'erreur racontée (${reels[0].v}) n'est pas ${cms[0]} ÷ ${k.r}`);
    return [...p, ...qcmUnique(q, (c) => c.includes("divisé au lieu de multiplier") && c.endsWith(`est ${fr(cms[0] * k.r)} ${k.u}`))];
  }
  if (/nombre à virgule/.test(t)) {
    if (cms.length !== 1 || reels.length !== 1) return ["données illisibles"];
    const juste = reels[0].v / k.r;
    const p = egal(cms[0], juste) ? [] : [`${reels[0].v} ÷ ${k.r} = ${juste}, pas ${cms[0]}`];
    if (Number.isInteger(juste)) p.push("le résultat est entier : la question n'a pas de sens");
    return [...p, ...qcmUnique(q, (c) => c.startsWith("oui") && c.includes(`${fr(juste)} cm`))];
  }
  if (/Pourquoi/.test(t) && cms.length === 1 && reels.length === 1) {
    const juste = (cms[0] * k.r) / k.c;
    const p = egal(reels[0].v, juste) ? [] : [`le texte affirme ${reels[0].v} ${reels[0].u}, le calcul donne ${juste}`];
    const fois = fr(cms[0] / k.c);
    return [...p, ...qcmUnique(q, (c) => c.startsWith(`${fr(cms[0])} cm, c'est ${fois} fois ${fr(k.c)} cm`))];
  }
  return ["QCM illisible"];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "6e_echelle_comprendre_tpl_1": corrigerVersReel,
  "6e_echelle_comprendre_tpl_lire": corrigerVersReel,
  "6e_echelle_comprendre_qcm_tpl_fraction": corrigerSensFraction,
  "6e_echelle_comprendre_tpl_ouverte": corrigerFermee,
  "6e_echelle_reelle_tpl_1": corrigerVersReel,
  "6e_echelle_reelle_tpl_fraction": corrigerFractionVersReel,
  "6e_echelle_reelle_tpl_ouverte": corrigerFermee,
  "6e_echelle_plan_tpl_1": corrigerVersPlan,
  "6e_echelle_plan_tpl_fraction": corrigerFractionVersPlan,
  "6e_echelle_plan_tpl_ouverte": corrigerFermee,
  "6e_echelle_defi_tpl_1": corrigerVersReel,
  "6e_echelle_defi_tpl_perimetre": corrigerPerimetre,
  "6e_echelle_defi_tpl_ouverte": corrigerFermee,
});

void lireNombre;
