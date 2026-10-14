import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, egal, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE volumes.bank.ts (notion volume_solide, 13/10/2026).
// Ils relisent le TEXTE (dimensions, aire de base, rayon ou diamètre, volumes
// des parties, unités et conversions) et le SOLIDE dessiné (cubes comptés un à
// un, étiquettes = valeurs du texte), puis refont le calcul : pavé L × l × h,
// prisme et cylindre aire de base × hauteur, π × r × r × h, sommes et
// différences de volumes, 1 L = 1 dm³, 1 dm³ = 1 000 cm³, 1 m³ = 1 000 L. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(String(s).replace(/ /g, "").replace(",", "."));
// Un nombre écrit à la française : 3 330 ; 12,5.
const NB = "(\\d{1,3}(?: \\d{3})+(?:,\\d+)?|\\d+(?:,\\d+)?)";
const U = "(mm|cm|dm|m)";
const fr = (x: number) => {
  const [e, d] = String(Math.round(x * 1000) / 1000).split(".");
  return e.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? `,${d}` : "");
};

/** La réponse attendue « 120 cm³ » : la valeur juste et l'unité. */
function reponse(q: Q, juste: number, unite: string): string[] {
  const m = String(q.expected[0]).match(/^(\d{1,3}(?: \d{3})*(?:,\d+)?)\s*(.*)$/);
  const p: string[] = [];
  if (!m || !egal(num(m[1]), Math.round(juste * 1000) / 1000)) p.push(`attendu « ${q.expected[0]} », le calcul donne ${fr(juste)}`);
  else if (m[1] !== fr(juste)) p.push(`écriture « ${m[1]} » au lieu de « ${fr(juste)} »`);
  else if (m[2].trim() !== unite) p.push(`unité « ${m[2]} » au lieu de « ${unite} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  if (Math.abs(juste * 100 - Math.round(juste * 100)) > 1e-6) p.push("plus de deux décimales");
  return p;
}

/** Les étiquettes du solide dessiné doivent être celles du texte. */
function etiquettes(q: Q, attendues: Record<string, string>): string[] {
  const cv = q.canvas as any;
  if (!cv || cv.kind !== "solide_3d") return ["pas de solide dessiné"];
  const p: string[] = [];
  for (const [k, v] of Object.entries(attendues)) if (cv.labels?.[k] !== v) p.push(`étiquette ${k} du dessin « ${cv.labels?.[k]} » au lieu de « ${v} »`);
  return p;
}

/* ─── VOLUME_COMPRENDRE ─────────────────────────────────────────────────── */

function cubesEmpiles(q: Q): string[] {
  const m = q.text.match(/(\d+) cubes en longueur, (\d+) en largeur et (\d+) étages?/);
  const u = q.text.match(/de 1 (cm|dm|m)³/);
  const cv = q.canvas as any;
  if (!m || !u || !cv?.cubes) return ["dimensions, unité ou cubes non lus"];
  const n = Number(m[1]) * Number(m[2]) * Number(m[3]);
  const p = reponse(q, n, `${u[1]}³`);
  const vus = new Set(cv.cubes.map((c: any) => `${c.x};${c.y};${c.z}`));
  if (vus.size !== cv.cubes.length) p.push("cubes en double sur le dessin");
  if (cv.cubes.length !== n) p.push(`le dessin a ${cv.cubes.length} cubes, le texte en dit ${n}`);
  const max = (k: string) => Math.max(...cv.cubes.map((c: any) => c[k])) + 1;
  if (max("x") !== Number(m[1]) || max("y") !== Number(m[2]) || max("z") !== Number(m[3])) p.push("le dessin n'a pas les dimensions du texte");
  return p;
}
const MOTS: Record<string, string> = { centimètres: "cm", décimètres: "dm", mètres: "m" };
function uniteVolume(q: Q): string[] {
  const m = q.text.match(/en (centimètres|décimètres|mètres)/);
  if (!m) return ["unité des longueurs non lue"];
  return qcmUnique(q, (c) => c === `${MOTS[m[1]]}³`);
}
function grandeur(q: Q): string[] {
  const t = q.text;
  const sorte = /hauteur|longueur/.test(t) ? 1 : /surface|aire/.test(t) ? 2 : /place|volume|espace/.test(t) ? 3 : 0;
  if (!sorte) return ["grandeur non reconnue"];
  const unites = (q.choices ?? []).filter((c) => /^(cm|dm|m)$/.test(c));
  if (unites.length !== 1) return ["l'unité de longueur des propositions est introuvable"];
  const u = unites[0];
  return qcmUnique(q, (c) => c === (sorte === 1 ? u : `${u}${sorte === 2 ? "²" : "³"}`));
}
function facteurs(q: Q): string[] {
  const m = q.text.match(new RegExp(`((?:${NB} ${U} × )+${NB} ${U})`));
  if (!m) return ["calcul non lu"];
  const f = [...m[1].matchAll(new RegExp(`${NB} ${U}`, "g"))];
  const u = f[0][2];
  if (f.some((x) => x[2] !== u)) return ["unités mélangées"];
  const P = f.reduce((s, x) => s * num(x[1]), 1);
  if (f.length < 2 || f.length > 3) return [`${f.length} facteurs`];
  const p = qcmUnique(q, (c) => c === `${fr(P)} ${u}${f.length === 2 ? "²" : "³"}`);
  if (egal(P, f.reduce((s, x) => s + num(x[1]), 0))) p.push("produit = somme : leurres ambigus");
  return p;
}

/* ─── PAVÉ DROIT ────────────────────────────────────────────────────────── */

/** Les trois dimensions d'un pavé écrites dans le texte. */
function dimsPave(t: string): { L: number; l: number; h: number; u: string } | null {
  const a = t.match(new RegExp(`(?:mesure|de) ${NB} ${U} de long, ${NB} ${U} de large et ${NB} ${U} de haut`));
  if (a && a[2] === a[4] && a[4] === a[6]) return { L: num(a[1]), l: num(a[3]), h: num(a[5]), u: a[2] };
  const r = t.match(new RegExp(`rectangle de ${NB} ${U} sur ${NB} ${U}`));
  const h = t.match(new RegExp(`hauteur est ${NB} ${U}`));
  if (r && h && r[2] === r[4] && r[2] === h[2]) return { L: num(r[1]), l: num(r[3]), h: num(h[1]), u: r[2] };
  const c = t.match(new RegExp(`cube d’arête ${NB} ${U}`));
  if (c) return { L: num(c[1]), l: num(c[1]), h: num(c[1]), u: c[2] };
  return null;
}
function etiquettesPave(q: Q, d: { L: number; l: number; h: number; u: string }): string[] {
  return etiquettes(q, { longueur: `${fr(d.L)} ${d.u}`, largeur: `${fr(d.l)} ${d.u}`, hauteur: `${fr(d.h)} ${d.u}`, aireBase: `${fr(d.L * d.l)} ${d.u}²` });
}
function volumePave(q: Q): string[] {
  const d = dimsPave(q.text);
  if (!d) return ["dimensions du pavé non lues"];
  const V = d.L * d.l * d.h;
  const r = q.format === "qcm" ? qcmUnique(q, (c) => c === `${fr(V)} ${d.u}³`) : reponse(q, V, `${d.u}³`);
  return [...r, ...(q.canvas ? etiquettesPave(q, d) : [])];
}

/* ─── PRISME DROIT ──────────────────────────────────────────────────────── */

/** L'aire de la base (donnée, ou triangle base × hauteur ÷ 2) et la hauteur du prisme. */
function prisme(t: string): { B: number; h: number; u: string; P?: number } | null {
  const h = t.match(new RegExp(`hauteur du prisme est ${NB} ${U}`));
  if (!h) return null;
  const a = t.match(new RegExp(`(?:aire de sa base est|base a une aire de) ${NB} ${U}²`));
  const tri = t.match(new RegExp(`triangle de base ${NB} ${U} et de hauteur ${NB} ${U}`));
  const per = t.match(new RegExp(`périmètre de ${NB} ${U}`));
  const B = a ? num(a[1]) : tri ? (num(tri[1]) * num(tri[3])) / 2 : null;
  const u = a ? a[2] : tri ? tri[2] : null;
  if (B == null || u !== h[2]) return null;
  return { B, h: num(h[1]), u, P: per ? num(per[1]) : undefined };
}
function volumePrisme(q: Q): string[] {
  const d = prisme(q.text);
  if (!d) return ["aire de base ou hauteur du prisme non lues"];
  const V = d.B * d.h;
  const p = q.format === "qcm" ? qcmUnique(q, (c) => c === `${fr(V)} ${d.u}³`) : reponse(q, V, `${d.u}³`);
  if (d.P != null && d.P * d.P < 12 * Math.sqrt(3) * d.B) p.push("aucun triangle n'a cette aire avec ce périmètre");
  if (q.canvas) p.push(...etiquettes(q, { aireBase: `${fr(d.B)} ${d.u}²`, hauteur: `${fr(d.h)} ${d.u}` }));
  return p;
}

/* ─── CYLINDRE ──────────────────────────────────────────────────────────── */

function cylindre(q: Q): string[] {
  const t = q.text;
  const h = t.match(new RegExp(`hauteur est ${NB} ${U}`));
  const r = t.match(new RegExp(`rayon est ${NB} ${U}`));
  const d = t.match(new RegExp(`diamètre est ${NB} ${U}`));
  const B = t.match(new RegExp(`(?:aire de sa base|aire de son disque de base) est ${NB} ${U}²`));
  if (!h) return ["hauteur non lue"];
  const u = h[2], H = num(h[1]);
  if (B) {
    if (B[2] !== u) return ["unités mélangées"];
    return [...reponse(q, num(B[1]) * H, `${u}³`), ...etiquettes(q, { aireBase: `${B[1]} ${u}²`, hauteur: `${h[1]} ${u}` })];
  }
  const R = r ? num(r[1]) : d ? num(d[1]) / 2 : null;
  if (R == null) return ["rayon ou diamètre non lus"];
  if ((r?.[2] ?? d?.[2]) !== u) return ["unités mélangées"];
  const k = R * R * H;
  const p: string[] = [];
  if (/π = 3,14/.test(t)) p.push(...reponse(q, Math.round(314 * k) / 100, `${u}³`));
  else p.push(...qcmUnique(q, (c) => c === `${fr(k)}π ${u}³`));
  if (r) p.push(...etiquettes(q, { rayon: `${r[1]} ${u}`, hauteur: `${h[1]} ${u}`, aireBase: `${fr(R * R)}π ${u}²` }));
  if (d) {
    p.push(...etiquettes(q, { diametre: `${d[1]} ${u}`, hauteur: `${h[1]} ${u}` }));
    if ((q.canvas as any)?.labels?.rayon) p.push("le dessin donne le rayon : le piège du diamètre disparaît");
  }
  return p;
}

/* ─── ASSEMBLAGES ───────────────────────────────────────────────────────── */

function sommeVolumes(q: Q): string[] {
  const V = [...q.text.matchAll(new RegExp(`${NB} ${U}³`, "g"))];
  if (V.length !== 2 || V[0][2] !== V[1][2]) return ["deux volumes de même unité attendus"];
  return reponse(q, num(V[0][1]) + num(V[1][1]), `${V[0][2]}³`);
}
function maisonToit(q: Q): string[] {
  const d = dimsPave(q.text);
  const pr = prisme(q.text);
  if (!d || !pr || d.u !== pr.u) return ["pavé ou toit non lus"];
  const p = reponse(q, d.L * d.l * d.h + pr.B * pr.h, `${d.u}³`);
  if (!egal(pr.h, d.L)) p.push("le toit n'a pas la longueur de la maison");
  return p;
}
function contenances(q: Q): string[] {
  const a = q.text.match(new RegExp(`${NB} (m³|dm³)`));
  const b = q.text.match(new RegExp(`${NB} L(?![a-z])`));
  if (!a || !b) return ["les deux contenances non lues"];
  const enL = a[2] === "m³" ? num(a[1]) * 1000 : num(a[1]);
  return reponse(q, enL + num(b[1]), "L");
}
function paveCreuse(q: Q): string[] {
  const d = q.text.match(new RegExp(`${NB} ${U} de long, ${NB} ${U} de large et ${NB} ${U} de haut`));
  const c = q.text.match(new RegExp(`cube d’arête ${NB} ${U}`));
  if (!d || !c) return ["pavé ou cube non lus"];
  const [L, l, h, a] = [num(d[1]), num(d[3]), num(d[5]), num(c[1])];
  const p = reponse(q, L * l * h - a ** 3, `${d[2]}³`);
  if (a >= Math.min(L, l, h)) p.push("le trou est plus grand que le bloc");
  return p;
}

/* ─── UNITÉS ET CONVERSIONS ─────────────────────────────────────────────── */

const EN_ML: Record<string, number> = { mL: 1, "cm³": 1, cL: 10, L: 1000, "dm³": 1000, "m³": 1_000_000 };
const UV = "(mL|cL|L|cm³|dm³|m³)";
function convertir(q: Q): string[] {
  const v = q.text.match(new RegExp(`${NB} ${UV}(?![a-zA-Z²³])`));
  const vers = q.text.match(new RegExp(`en ${UV} ?(?:\\?|\\.)$`));
  if (!v || !vers) return ["volume donné ou unité demandée non lus"];
  if (v[2] === vers[1]) return ["on demande l'unité déjà donnée"];
  return reponse(q, (num(v[1]) * EN_ML[v[2]]) / EN_ML[vers[1]], vers[1]);
}
function contenance(q: Q): string[] {
  const usuel: [RegExp, string][] = [
    [/bouteille|baignoire|arrosoir|seau/, "L"],
    [/cuillère|seringue|parfum/, "mL"],
    [/verre|canette/, "cL"],
    [/piscine|citerne|château d’eau/, "m³"],
  ];
  const u = usuel.find(([re]) => re.test(q.text))?.[1];
  if (!u) return ["objet non reconnu"];
  const p = qcmUnique(q, (c) => c === u);
  const volumes = (q.choices ?? []).filter((c) => c in EN_ML);
  if (volumes.length !== 1) p.push(`${volumes.length} unités de volume parmi les propositions`);
  return p;
}

/* ─── DÉFIS ─────────────────────────────────────────────────────────────── */

function contenanceLitres(q: Q): string[] {
  const d = dimsPave(q.text);
  if (!d) return ["dimensions non lues"];
  const V = d.L * d.l * d.h;
  return [...reponse(q, (V * EN_ML[`${d.u}³`]) / 1000, "L"), ...etiquettesPave(q, d)];
}
function paveOuCylindre(q: Q): string[] {
  const a = q.text.match(new RegExp(`^(\\S+) a une? .*?pavé droit de ${NB} ${U} de long, ${NB} ${U} de large et ${NB} ${U} de haut`));
  const b = q.text.match(new RegExp(`\\. (\\S+) a une? .*?cylindrique de rayon ${NB} ${U} et de hauteur ${NB} ${U}`));
  if (!a || !b || !/π = 3,14/.test(q.text)) return ["les deux solides non lus"];
  const vA = num(a[2]) * num(a[4]) * num(a[6]);
  const vB = 3.14 * num(b[2]) ** 2 * num(b[4]);
  const juste = egal(Math.round(vA * 100), Math.round(vB * 100)) ? "les deux ont le même volume" : vA > vB ? a[1] : b[1];
  return qcmUnique(q, (c) => c === juste);
}
function cylindrePlusPrisme(q: Q): string[] {
  const c = q.text.match(new RegExp(`rayon ${NB} ${U}, hauteur ${NB} ${U}`));
  const pr = q.text.match(new RegExp(`prisme droit de ${NB} ${U}³`));
  if (!c || !pr) return ["cylindre ou prisme non lus"];
  const k = num(c[1]) ** 2 * num(c[3]);
  const p = qcmUnique(q, (x) => x === `${fr(k)}π + ${pr[1]} ${pr[2]}³`);
  if (q.canvas) p.push(...etiquettes(q, { rayon: `${c[1]} ${c[2]}`, hauteur: `${c[3]} ${c[4]}` }));
  return p;
}
function remplissage(q: Q): string[] {
  const d = dimsPave(q.text);
  const deb = q.text.match(new RegExp(`${NB} L par minute`));
  if (!d || !deb || d.u !== "cm") return ["dimensions en cm ou débit non lus"];
  return reponse(q, (d.L * d.l * d.h) / 1000 / num(deb[1]), "min");
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "5e_volume_defi_tpl_1": contenanceLitres,
  "5e_volume_defi_tpl_2": paveOuCylindre,
  "5e_volume_defi_tpl_3": cylindrePlusPrisme,
  "5e_volume_defi_tpl_x1": remplissage,
  "5e_volume_unite_tpl_1": convertir,
  "5e_volume_unite_tpl_2": convertir,
  "5e_volume_unite_tpl_3": convertir,
  "5e_volume_unite_tpl_4_contenance": contenance,
  "5e_volume_assemblage_tpl_1": sommeVolumes,
  "5e_volume_assemblage_tpl_2": maisonToit,
  "5e_volume_assemblage_tpl_3": contenances,
  "5e_volume_assemblage_tpl_x1": paveCreuse,
  "5e_volume_cylindre_tpl_1": cylindre,
  "5e_volume_cylindre_tpl_2": cylindre,
  "5e_volume_cylindre_erreur_tpl_1": cylindre,
  "5e_volume_cylindre_tpl_x1": cylindre,
  "5e_volume_prisme_tpl_1": volumePrisme,
  "5e_volume_prisme_tpl_2": volumePrisme,
  "5e_volume_prisme_tpl_x1": volumePrisme,
  "5e_volume_pave_tpl_1": volumePave,
  "5e_volume_pave_tpl_2": volumePave,
  "5e_volume_pave_qcm_tpl_1": volumePave,
  "5e_volume_pave_tpl_x1": volumePave,
  "5e_volume_comprendre_tpl_1": cubesEmpiles,
  "5e_volume_comprendre_tpl_2": uniteVolume,
  "5e_volume_comprendre_tpl_3_grandeur": grandeur,
  "5e_volume_comprendre_tpl_4_facteurs": facteurs,
});
