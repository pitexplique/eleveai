import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egales, memeEnsemble } from "./expressions";

// LES CORRECTEURS DE equations-carre.bank.ts. Ils relisent L'ÉQUATION écrite dans
// le texte, la résolvent eux-mêmes, et comparent. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const n = (s: string) => Number(s.replace(/[−–]/g, "-").replace(",", "."));

/** Résout k·L² = D. */
function racines(D: number): number[] {
  if (D < 0) return [];
  if (D === 0) return [0];
  return [Math.sqrt(D), -Math.sqrt(D)];
}

/** L'équation du texte → ses solutions, ou null si aucune forme n'est reconnue. */
export function resoudreTexte(t: string): { L: string; sol: number[] } | null {
  let m = t.match(/\(([a-z]) − (\d+)\)\(\1 \+ \2\) = 0/);
  if (m) return { L: m[1], sol: [n(m[2]), -n(m[2])] };
  // (kx ± p)² − q = 0
  m = t.match(/\((\d*)([a-z]) ([+−]) (\d+)\)² − (\d+) = 0/);
  if (m) {
    const k = m[1] ? n(m[1]) : 1;
    const p = (m[3] === "+" ? 1 : -1) * n(m[4]);
    return { L: m[2], sol: racines(n(m[5])).map((r) => (r - p) / k) };
  }
  // (kx ± p)² = a
  m = t.match(/\((\d*)([a-z]) ([+−]) (\d+)\)² = ([−-]?\d+)/);
  if (m) {
    const k = m[1] ? n(m[1]) : 1;
    const p = (m[3] === "+" ? 1 : -1) * n(m[4]);
    return { L: m[2], sol: racines(n(m[5])).map((r) => (r - p) / k) };
  }
  // k·x² ± c = d
  m = t.match(/(?<![\d)])(\d*)([a-z])² ([+−]) (\d+) = ([−-]?\d+)/);
  if (m) {
    const k = m[1] ? n(m[1]) : 1;
    const c = (m[3] === "+" ? 1 : -1) * n(m[4]);
    return { L: m[2], sol: racines((n(m[5]) - c) / k) };
  }
  // k·x² = d
  m = t.match(/(?<![\d)])(\d*)([a-z])² = ([−-]?\d+)/);
  if (m) {
    const k = m[1] ? n(m[1]) : 1;
    return { L: m[2], sol: racines(n(m[3]) / k) };
  }
  return null;
}

/** Les valeurs annoncées par une proposition : « x = √7 ou x = −√7 », « aucune solution »… */
export function valeursChoix(c: string): number[] | null {
  if (/aucune/i.test(c)) return [];
  const r = [...c.replace(/\$/g, "").matchAll(/= ?([−-])?(?:√(\d+)|\\dfrac\{(\d+)\}\{(\d+)\}|(\d+(?:,\d+)?))/g)];
  if (!r.length) return null;
  return r.map((m) => {
    const s = m[1] ? -1 : 1;
    if (m[2]) return s * Math.sqrt(n(m[2]));
    if (m[3]) return (s * n(m[3])) / n(m[4]);
    return s * n(m[5]);
  });
}

function qcmSolutions(q: Q): string[] {
  const R = resoudreTexte(q.text);
  if (!R) return [`équation illisible : ${q.text}`];
  const p = qcmUnique(q, (c) => {
    const v = valeursChoix(c);
    return !!v && memeEnsemble(v, R.sol);
  });
  for (const c of q.choices ?? []) if (!valeursChoix(c)) p.push(`proposition illisible : ${c}`);
  return p;
}

/** Vérifie un nombre de solutions, écrit en chiffre et en mots. */
function nombreSolutions(q: Q, juste: number): string[] {
  const p: string[] = [];
  if (q.expected[0] !== String(juste)) p.push(`attendu ${q.expected[0]}, juste ${juste}`);
  for (const x of q.expected) {
    const v = /aucune|zéro|^0/.test(x) ? 0 : /deux|^2/.test(x) ? 2 : /une|^1/.test(x) ? 1 : -1;
    if (v !== juste) p.push(`écriture admise « ${x} » ≠ ${juste}`);
  }
  return p;
}
function combien(q: Q): string[] {
  const R = resoudreTexte(q.text);
  if (!R) return [`équation illisible : ${q.text}`];
  return nombreSolutions(q, R.sol.length);
}
function combienFigure(q: Q): string[] {
  const R = resoudreTexte(q.text);
  const a = q.text.match(/x² = ([−-]?\d+)/);
  const c = q.canvas as any;
  if (!R || !a || c?.kind !== "fonctionGraphique") return ["équation ou figure illisibles"];
  const courbe = c.courbes?.[0];
  if (courbe?.type !== "quadratique" || courbe.a !== 1 || courbe.b !== 0 || courbe.c !== 0) return ["la figure ne trace pas y = x²"];
  const h = c.misesEnEvidence?.[0]?.horizontale?.y;
  if (h !== n(a[1])) return [`droite y = ${h} sur la figure, x² = ${a[1]} dans le texte`];
  if (h < c.ymin || h > c.ymax) return ["la droite sort de la figure"];
  if (h > 0 && Math.sqrt(h) > c.xmax) return ["les points communs sortent de la figure"];
  return nombreSolutions(q, R.sol.length);
}

/** « la solution positive / négative » ou « la plus grande / petite » : une valeur. */
function uneSolution(q: Q): string[] {
  const R = resoudreTexte(q.text);
  if (!R) return [`équation illisible : ${q.text}`];
  const t = q.text;
  const v = /positive|plus grande/.test(t) ? Math.max(...R.sol) : /négative|plus petite/.test(t) ? Math.min(...R.sol) : NaN;
  const p: string[] = [];
  for (const x of q.expected) {
    const lu = valeursChoix(x.startsWith(`${R.L} =`) ? x : `= ${x}`);
    if (!lu || lu.length !== 1 || !memeEnsemble(lu, [v])) p.push(`écriture admise « ${x} » ≠ ${v}`);
  }
  return p;
}

function solutionAvecRacine(q: Q): string[] {
  const R = resoudreTexte(q.text);
  const a = q.text.match(/[a-z]² = (\d+)/);
  if (!R || !a) return ["équation illisible"];
  if (Number.isInteger(Math.sqrt(n(a[1])))) return [`${a[1]} est un carré parfait : √ inutile`];
  const pos = /positive/.test(q.text);
  const juste = `${pos ? "" : "−"}√${a[1]}`;
  const p = q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », juste « ${juste} »`];
  for (const x of q.expected) {
    if (!x.includes(a[1])) p.push(`écriture admise « ${x} » sans ${a[1]}`);
    if (pos === /[−-]|moins/.test(x)) p.push(`écriture admise « ${x} » de mauvais signe`);
  }
  return p;
}

function laquelle(q: Q): string[] {
  const voulu = /aucune/.test(q.text) ? 0 : /une seule/.test(q.text) ? 1 : /deux/.test(q.text) ? 2 : -1;
  return qcmUnique(q, (c) => resoudreTexte(c)?.sol.length === voulu);
}

function ligneSuivante(q: Q): string[] {
  const m = q.text.match(/(?<![\d)])(\d*)([a-z])²(?: ([+−]) (\d+))? = ([−-]?\d+)/);
  if (!m) return ["équation illisible"];
  const k = m[1] ? n(m[1]) : 1;
  const c = m[3] ? (m[3] === "+" ? 1 : -1) * n(m[4]) : 0;
  const juste = `${m[2]}² = ${(n(m[5]) - c) / k}`;
  return qcmUnique(q, (x) => x === juste);
}

/** Une longueur ou une durée : relue, et son unité. */
function reponse(q: Q, juste: number, u: string): string[] {
  const p: string[] = [];
  if (q.expected[0] !== `${juste} ${u}`) p.push(`attendu « ${q.expected[0]} », juste « ${juste} ${u} »`);
  if (!Number.isInteger(juste)) p.push(`${juste} n’est pas entier`);
  for (const x of q.expected) if (Number(x.match(/\d+/)?.[0]) !== juste) p.push(`écriture admise « ${x} » ≠ ${juste}`);
  return p;
}

function coteCarre(q: Q): string[] {
  const m = q.text.match(/(\d+) (mm|cm|dm|m)²/);
  if (!m) return ["aire illisible"];
  return reponse(q, Math.sqrt(n(m[1])), m[2]);
}
function formule(q: Q): string[] {
  const k = q.text.match(/(\d+) × [a-zA-Z]²/);
  const v = q.text.match(/(\d+) (W|m²|cm²|m)(?![\p{L}\d])/u);
  if (!k || !v) return ["formule illisible"];
  const u = /× t²/.test(q.text) ? "s" : /× I²/.test(q.text) ? "A" : v[2].replace("²", "");
  return reponse(q, Math.sqrt(n(v[1]) / n(k[1])), u);
}
function erreurEleve(q: Q): string[] {
  const m = q.text.match(/« ([a-z])² = ([−-]?\d+) donc \1 = (\d+)( ou \1 = [−-]\3)? »/);
  if (!m) return ["copie illisible"];
  const a = n(m[2]);
  const r = n(m[3]);
  if (a > 0 && r * r !== a) return [`${r}² ≠ ${a}`];
  const motif = a < 0 ? /^Il n’y a aucune/ : m[4] ? /^C’est juste/ : new RegExp(`^Il manque la solution ${m[1]} = −${r}\\.`);
  return qcmUnique(q, (c) => motif.test(c));
}
function qcmOuUne(q: Q): string[] {
  return q.format === "qcm" ? qcmSolutions(q) : uneSolution(q);
}
function solide(q: Q): string[] {
  const h = q.text.match(/hauteur (?:de |vaut )?(\d+) (cm|dm|m)(?![\p{L}\d²³])/u);
  const V = q.text.match(/(\d+)π? (cm|dm|m)³/);
  if (!h || !V || h[2] !== V[2]) return ["hauteur ou volume illisibles"];
  return reponse(q, Math.sqrt(n(V[1]) / n(h[1])), h[2]);
}
function raisonner(q: Q): string[] {
  const s = q.text.match(/([−-]?\d+)/);
  if (!s) return ["solution illisible"];
  const v = n(s[1]);
  const juste = /autre/.test(q.text) ? -v : v * v;
  const p: string[] = [];
  for (const x of q.expected) {
    const lu = x.match(/([−-]?\d+)/);
    if (!lu || n(lu[1]) !== juste) p.push(`écriture admise « ${x} » ≠ ${juste}`);
  }
  return p;
}
function exact(q: Q): string[] {
  const lire = (c: string) => {
    const m = c.match(/^(−)?(√)?(\d+(?:,\d+)?) /);
    if (!m) return NaN;
    return (m[1] ? -1 : 1) * (m[2] ? Math.sqrt(n(m[3])) : n(m[3]));
  };
  const aire = q.text.match(/(\d+) (?:cm|m|dm)²/);
  const hyp = q.text.match(/hypoténuse[^.]*?(\d+) (?:cm|m|dm)/);
  const v = hyp ? Math.sqrt((n(hyp[1]) * n(hyp[1])) / 2) : aire ? Math.sqrt(n(aire[1])) : NaN;
  if (Number.isNaN(v)) return ["mesure illisible"];
  return qcmUnique(q, (c) => Math.abs(lire(c) - v) < 1e-9);
}

/* ───── factoriser ───── */
function factorisation(q: Q): string[] {
  const m = q.text.match(/((?:\([a-z] [+−] \d+\)|[a-z])² − \d+)/);
  if (!m) return ["expression illisible"];
  const p = qcmUnique(q, (c) => egales(c, m[1]));
  const ch = q.choices ?? [];
  for (let i = 0; i < ch.length; i++) for (let j = i + 1; j < ch.length; j++) if (egales(ch[i], ch[j])) p.push(`deux propositions de même valeur : ${ch[i]} | ${ch[j]}`);
  if (!/\)\(/.test(String(q.expected[0]))) p.push("la réponse n’est pas un produit de deux facteurs");
  return p;
}
function nombreManquant(q: Q): string[] {
  const m = q.text.match(/[a-z]² − (\d+) =/);
  if (!m) return ["expression illisible"];
  const r = Math.sqrt(n(m[1]));
  return q.expected.length === 1 && n(q.expected[0]) === r ? [] : [`attendu ${q.expected[0]}, juste ${r}`];
}
const estCarre = (x: number) => Number.isInteger(Math.sqrt(x));
function reconnaitre(q: Q): string[] {
  return qcmUnique(q, (c) => {
    const m = c.match(/^[a-z]² − (\d+)$/);
    return !!m && estCarre(n(m[1]));
  });
}
function ligneCarre(q: Q): string[] {
  const m = q.text.match(/\(([a-z] [+−] \d+)\)² = (\d+)/);
  if (!m) return ["équation illisible"];
  const r = Math.sqrt(n(m[2]));
  const juste = `${m[1]} = ${r} ou ${m[1]} = −${r}`;
  return qcmUnique(q, (c) => c === juste);
}
function agrandir(q: Q): string[] {
  const p = q.text.match(/(\d+) (cm|dm|m)(?![\p{L}\d²])/u);
  const A = q.text.match(/(\d+) (?:cm|dm|m)²/);
  if (!p || !A) return ["mesures illisibles"];
  return reponse(q, Math.sqrt(n(A[1])) - n(p[1]), p[2]);
}
function rectangle(q: Q): string[] {
  const p = q.text.match(/x \+ (\d+)/);
  const p2 = q.text.match(/x − (\d+)/);
  const A = q.text.match(/(\d+) (mm|cm|dm|m)²/);
  if (!p || !p2 || !A || p[1] !== p2[1]) return ["côtés ou aire illisibles"];
  return reponse(q, Math.sqrt(n(A[1]) + n(p[1]) ** 2), A[2]);
}
function factOuSolutions(q: Q): string[] {
  return /Factorise|produit/.test(q.text) ? factorisation(q) : qcmSolutions(q);
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "3e_equation_carre_egal_a_tpl_1": qcmSolutions,
  "3e_equation_carre_egal_a_tpl_2": combien,
  "3e_equation_carre_egal_a_tpl_3": uneSolution,
  "3e_equation_carre_egal_a_tpl_4": (q) => {
    const R = resoudreTexte(q.text);
    if (!R) return ["équation illisible"];
    return qcmUnique(q, (c) => R.sol.some((s) => Math.abs(s - n(c)) < 1e-9));
  },
  "3e_equation_carre_egal_a_tpl_5": qcmSolutions,
  "3e_equation_carre_egal_a_tpl_6": qcmSolutions,
  "3e_equation_carre_egal_a_tpl_7": combienFigure,
  "3e_equation_carre_egal_a_tpl_8": solutionAvecRacine,
  "3e_equation_carre_egal_a_tpl_9": laquelle,
  "3e_equation_carre_egal_a_tpl_10": qcmSolutions,
  "3e_equation_carre_egal_a_tpl_11": ligneSuivante,
  "3e_equation_carre_egal_a_tpl_12": coteCarre,
  "3e_equation_carre_egal_a_tpl_13": formule,
  "3e_equation_carre_egal_a_tpl_14": erreurEleve,
  "3e_equation_carre_egal_a_tpl_15": qcmOuUne,
  "3e_equation_carre_egal_a_tpl_16": solide,
  "3e_equation_carre_egal_a_tpl_17": raisonner,
  "3e_equation_carre_egal_a_tpl_18": exact,

  "3e_equation_carre_factoriser_tpl_1": factorisation,
  "3e_equation_carre_factoriser_tpl_2": nombreManquant,
  "3e_equation_carre_factoriser_tpl_3": qcmSolutions,
  "3e_equation_carre_factoriser_tpl_4": reconnaitre,
  "3e_equation_carre_factoriser_tpl_5": qcmSolutions,
  "3e_equation_carre_factoriser_tpl_6": uneSolution,
  "3e_equation_carre_factoriser_tpl_7": ligneCarre,
  "3e_equation_carre_factoriser_tpl_8": uneSolution,
  "3e_equation_carre_factoriser_tpl_9": qcmSolutions,
  "3e_equation_carre_factoriser_tpl_10": combien,
  "3e_equation_carre_factoriser_tpl_11": qcmSolutions,
  "3e_equation_carre_factoriser_tpl_12": agrandir,
  "3e_equation_carre_factoriser_tpl_13": factOuSolutions,
  "3e_equation_carre_factoriser_tpl_14": qcmSolutions,
  "3e_equation_carre_factoriser_tpl_15": rectangle,
  "3e_equation_carre_factoriser_tpl_16": factOuSolutions,
});
