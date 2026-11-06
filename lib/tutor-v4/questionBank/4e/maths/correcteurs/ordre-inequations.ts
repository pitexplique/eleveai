import type { CorrecteursMaths } from "./types";
import type { NumberLineCanvasData } from "@/lib/tutor-v4/types_canvas";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { reponseQcm } from "@/lib/tutor-v4/questionBank/outils-geometrie";
import { texteLu } from "../outils-insecables";

// LES CORRECTEURS DE ordre-inequations.bank.ts (06/11/2026). Ils lisent chaque formule en
// (coefficient, constante), appliquent la règle du signe, et testent CHAQUE proposition :
// jamais une valeur du gabarit. Vide = juste.

type Q = TutorGeneratedQuestionV4;
type Sym = "<" | "≤" | ">" | "≥";
type Lin = { k: number; c: number; v: string | null };
type Ineg = { g: Lin; s: Sym; d: Lin };

const INV: Record<Sym, Sym> = { "<": ">", "≤": "≥", ">": "<", "≥": "≤" };
const STRICT = (s: Sym) => s === "<" || s === ">";
const VERS_LE_BAS = (s: Sym) => s === "<" || s === "≤";

/** « 3a + 5 », « 7 - 2a », « -a », « 12 » → coefficient, constante, lettre. */
function lineaire(src: string): Lin | null {
  const s = src.replace(/\\nobreak|\s/g, "").replace(/−/g, "-");
  if (!s) return null;
  const termes = s.match(/[+-]?[^+-]+/g);
  if (!termes) return null;
  const r: Lin = { k: 0, c: 0, v: null };
  for (const t of termes) {
    const m = t.match(/^([+-]?)(\d*)([a-zA-Z])?$/);
    if (!m || (!m[2] && !m[3])) return null;
    const signe = m[1] === "-" ? -1 : 1;
    if (m[3]) {
      if (r.v && r.v !== m[3]) return null;
      r.v = m[3];
      r.k += signe * (m[2] ? Number(m[2]) : 1);
    } else r.c += signe * Number(m[2]);
  }
  return r;
}

function inegalite(f: string): Ineg | null {
  const m = f.replace(/\$/g, "").replace(/\\nobreak/g, "").match(/^(.*?)\s*(\\le|\\ge|<|>)\s*(.*)$/);
  if (!m) return null;
  const [g, d] = [lineaire(m[1]), lineaire(m[3])];
  const s = ({ "\\le": "≤", "\\ge": "≥", "<": "<", ">": ">" } as Record<string, Sym>)[m[2]];
  return g && d && s ? { g, s, d } : null;
}

const formules = (q: Q) => [...texteLu(q).matchAll(/\$([^$]*)\$/g)].map((m) => m[1]);

/** La proposition exactement juste parmi les choix, et c'est l'attendue. */
function uneSeule(q: Q, juste: (c: string) => boolean) {
  const js = (q.choices ?? []).filter(juste);
  return js.length === 1 ? reponseQcm(q, js[0]) : [`${js.length} proposition(s) juste(s) : ${js.join(" | ")}`];
}

/** « a ? b » donne « ka + c ? kb + c » : mêmes k et c, sens renversé si k < 0. */
function regleLettres(q: Q) {
  const h = inegalite(formules(q)[0] ?? "");
  if (!h?.g.v || !h.d.v) return ["hypothèse illisible"];
  return uneSeule(q, (c) => {
    const i = inegalite(c);
    if (!i || i.g.v !== h.g.v || i.d.v !== h.d.v || i.g.k !== i.d.k || i.g.k === 0) return false;
    const sens = i.g.k > 0 ? h.s : INV[h.s];
    if (VERS_LE_BAS(sens) !== VERS_LE_BAS(i.s)) return false;
    if (i.g.c === i.d.c) return STRICT(sens) || !STRICT(i.s);
    return VERS_LE_BAS(sens) ? i.g.c < i.d.c : i.g.c > i.d.c;
  });
}

/** Des nombres : on applique l'opération lue dans le texte et on regarde qui est vrai. */
function regleNombres(q: Q) {
  const t = texteLu(q);
  const h = inegalite(formules(q)[0] ?? "");
  if (!h || h.g.v || h.d.v) return ["hypothèse illisible"];
  const [x, y] = [h.g.c, h.d.c];
  const vraiSymbole = h.s === "<" ? x < y : x > y;
  if (!vraiSymbole) return [`l’hypothèse ${x} ${h.s} ${y} est fausse`];
  const m = t.match(/On (ajoute|soustrait) (\d+)/);
  const p = t.match(/multiplie les deux membres par (−?)(\d+)/);
  const f = m ? (n: number) => n + (m[1] === "ajoute" ? 1 : -1) * Number(m[2]) : p ? (n: number) => n * (p[1] ? -1 : 1) * Number(p[2]) : null;
  if (!f) return ["opération illisible"];
  const [g2, d2] = [f(x), f(y)];
  return uneSeule(q, (c) => {
    const i = inegalite(c);
    return !!i && i.g.c === g2 && i.d.c === d2 && (i.s === "<" ? g2 < d2 : g2 > d2);
  });
}

/** Tout nombre vérifiant « v h b » vérifie-t-il « kv + c ch w » ? */
function impliquee(h: Ineg, ch: Ineg) {
  if (!h.g.v || ch.g.v !== h.g.v || ch.d.v || ch.g.k === 0) return false;
  const b = h.d.c;
  const sens = ch.g.k > 0 ? h.s : INV[h.s];
  const limite = ch.g.k * b + ch.g.c;
  const w = ch.d.c;
  if (VERS_LE_BAS(sens) !== VERS_LE_BAS(ch.s)) return false;
  if (limite === w) return STRICT(sens) || !STRICT(ch.s);
  return VERS_LE_BAS(sens) ? limite < w : limite > w;
}

function dedureBorne(q: Q) {
  const h = inegalite(formules(q)[0] ?? "");
  if (!h) return ["hypothèse illisible"];
  return uneSeule(q, (c) => {
    const i = inegalite(c);
    return !!i && impliquee(h, i);
  });
}

/** Le contexte dit la quantité : « 7 °C de plus », « 5 cm de moins ». La formule attendue doit le dire. */
function contexteAjout(q: Q) {
  const t = texteLu(q);
  const h = inegalite(formules(q)[0] ?? "");
  const m = t.match(/(\d+) (?:°C|minutes|kg|cm|points|secondes|%|personnes|km|L) de (plus|moins)/);
  if (!h || !m) return ["hypothèse ou quantité illisible"];
  const dc = (m[2] === "plus" ? 1 : -1) * Number(m[1]);
  return uneSeule(q, (c) => {
    const i = inegalite(c);
    return !!i && i.g.k === 1 && i.g.c === dc && impliquee(h, i);
  });
}

/** La seconde formule du texte dit la quantité : « 3v », « −3t ». */
function contexteProduit(q: Q) {
  const fs = formules(q);
  const h = inegalite(fs[0] ?? "");
  const e = lineaire(fs[1] ?? "");
  if (!h || !e) return ["formules illisibles"];
  if (e.v !== h.g.v) return ["la lettre change"];
  return uneSeule(q, (c) => {
    const i = inegalite(c);
    return !!i && i.g.k === e.k && i.g.c === e.c && impliquee(h, i);
  });
}

/** Encadrement « l ≤ v ≤ h » et quantité « kv » : les bornes sont k·l et k·h. */
function encadrement(q: Q) {
  const fs = formules(q);
  const lire = (f: string) => {
    const m = f.replace(/\\nobreak/g, "").match(/^\s*(-?\d+)\s*\\le\s*(.+?)\s*\\le\s*(-?\d+)\s*$/);
    const e = m ? lineaire(m[2]) : null;
    return m && e ? { l: Number(m[1]), e, h: Number(m[3]) } : null;
  };
  const h = lire(fs[0] ?? "");
  const e = lineaire(fs[1] ?? "");
  if (!h || !e || e.v !== h.e.v) return ["encadrement illisible"];
  return uneSeule(q, (c) => {
    const i = lire(c.replace(/\$/g, ""));
    return !!i && i.e.k === e.k && i.l === e.k * h.l + e.c && i.h === e.k * h.h + e.c;
  });
}

/** kx + c ? v, résolue en « x ? limite ». */
function resoudre(i: Ineg) {
  if (!i.g.v || i.d.v || i.g.k === 0) return null;
  return { v: i.g.v, s: i.g.k > 0 ? i.s : INV[i.s], val: (i.d.c - i.g.c) / i.g.k };
}

function solutionsQcm(q: Q) {
  const i = inegalite(formules(q)[0] ?? "");
  const r = i && resoudre(i);
  if (!r) return ["inéquation illisible"];
  if (!Number.isInteger(r.val)) return [`solution non entière : ${r.val}`];
  return uneSeule(q, (c) => {
    const ch = inegalite(c);
    return !!ch && ch.g.v === r.v && ch.g.k === 1 && ch.g.c === 0 && ch.s === r.s && ch.d.c === r.val;
  });
}

const vraie = (s: Sym, x: number, y: number) => (s === "<" ? x < y : s === "≤" ? x <= y : s === ">" ? x > y : x >= y);

function nombreSolution(q: Q) {
  const i = inegalite(formules(q)[0] ?? "");
  if (!i?.g.v) return ["inéquation illisible"];
  return uneSeule(q, (c) => {
    const x = Number(c.replace("−", "-"));
    return vraie(i.s, i.g.k * x + i.g.c, i.d.c);
  });
}

function entierExtreme(q: Q) {
  const t = texteLu(q);
  const i = inegalite(formules(q)[0] ?? "");
  const r = i && resoudre(i);
  if (!r) return ["inéquation illisible"];
  const veutGrand = /plus grand/.test(t);
  if (veutGrand !== VERS_LE_BAS(r.s)) return ["la question ne va pas dans le sens de l’inégalité"];
  const juste = r.s === "<" ? Math.ceil(r.val) - 1 : r.s === "≤" ? Math.floor(r.val) : r.s === ">" ? Math.floor(r.val) + 1 : Math.ceil(r.val);
  return String(q.expected[0]) === String(juste) ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}

function lireDroite(q: Q) {
  const iv = (q.canvas as NumberLineCanvasData)?.intervalles?.[0];
  if (!iv) return ["droite illisible"];
  const versDroite = iv.de != null;
  const val = (versDroite ? iv.de : iv.a) as number;
  const inclus = versDroite ? iv.deInclus : iv.aInclus;
  const voulu: Sym = versDroite ? (inclus ? "≥" : ">") : inclus ? "≤" : "<";
  return uneSeule(q, (c) => {
    const i = inegalite(c);
    const r = i && resoudre(i);
    return !!r && r.s === voulu && r.val === val;
  });
}

/** Les trois nombres du texte, dans l'ordre des gabarits : le départ b, le pas a, la limite c. */
function troisNombres(q: Q) {
  const n = [...texteLu(q).matchAll(/(\d+)/g)].map((m) => Number(m[1]));
  return n;
}

function problemeAuPlus(q: Q) {
  const n = troisNombres(q);
  if (n.length !== 3) return [`${n.length} nombres lus au lieu de trois`];
  const [b, a, c] = n;
  const juste = Math.floor((c - b) / a);
  if (juste < 1) return [`réponse absurde : ${juste}`];
  return String(q.expected[0]) === String(juste) ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}

function problemeAuMoins(q: Q) {
  const n = troisNombres(q);
  if (n.length !== 3) return [`${n.length} nombres lus au lieu de trois`];
  const [b, a, c] = n;
  const juste = Math.ceil((c - b) / a);
  if (juste < 1) return [`réponse absurde : ${juste}`];
  return String(q.expected[0]) === String(juste) ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}

function problemeBaisse(q: Q) {
  const n = troisNombres(q);
  if (n.length !== 3) return [`${n.length} nombres lus au lieu de trois`];
  const [b, a, c] = n;
  const juste = Math.floor((b - c) / a);
  if (juste < 1) return [`réponse absurde : ${juste}`];
  return String(q.expected[0]) === String(juste) ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}

const MOT: Record<string, number> = { double: 2, triple: 3, quadruple: 4, quintuple: 5 };

function traduction(q: Q) {
  const t = texteLu(q);
  const m = t.match(/Le (double|triple|quadruple|quintuple) de x, (augmenté|diminué) de (\d+), est (inférieur ou égal à|au plus égal à|strictement inférieur à|supérieur ou égal à|au moins égal à|strictement supérieur à) (\d+)/);
  if (!m) return ["phrase illisible"];
  const s: Sym = /strictement inférieur/.test(m[4]) ? "<" : /strictement supérieur/.test(m[4]) ? ">" : /inférieur|au plus/.test(m[4]) ? "≤" : "≥";
  const [k, c, v] = [MOT[m[1]], (m[2] === "augmenté" ? 1 : -1) * Number(m[3]), Number(m[5])];
  return uneSeule(q, (ch) => {
    const i = inegalite(ch);
    return !!i && i.g.k === k && i.g.c === c && i.s === s && i.d.c === v;
  });
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  ordre_regles_tpl_1: regleLettres,
  ordre_regles_tpl_2: regleLettres,
  ordre_regles_tpl_3: regleLettres,
  ordre_regles_tpl_4: regleNombres,
  ordre_regles_tpl_5: regleLettres,
  ordre_regles_tpl_6: regleLettres,
  ordre_regles_tpl_7: dedureBorne,
  ordre_regles_tpl_8: regleLettres,
  ordre_regles_tpl_9: contexteAjout,
  ordre_regles_tpl_10: contexteProduit,
  ordre_regles_tpl_11: contexteProduit,
  ordre_regles_tpl_12: encadrement,

  inequation_college_tpl_1: solutionsQcm,
  inequation_college_tpl_2: solutionsQcm,
  inequation_college_tpl_3: nombreSolution,
  inequation_college_tpl_4: entierExtreme,
  inequation_college_tpl_5: solutionsQcm,
  inequation_college_tpl_6: solutionsQcm,
  inequation_college_tpl_7: solutionsQcm,
  inequation_college_tpl_8: lireDroite,
  inequation_college_tpl_9: problemeAuPlus,
  inequation_college_tpl_10: problemeAuMoins,
  inequation_college_tpl_11: traduction,
  inequation_college_tpl_12: problemeBaisse,
});
