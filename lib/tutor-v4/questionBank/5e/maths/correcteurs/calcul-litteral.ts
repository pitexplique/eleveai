import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { estReduite } from "@/lib/tutor/evaluation/expressionAlgebrique";
import {
  avecReglesLitteral,
  cibleNonReduite,
  coef,
  equiv,
  lettresDe,
  valeur,
  valeursDonnees,
  plusLongue,
  poly,
  qcmExpression,
  reponseExpression,
  reponseNombre,
  texteLisible,
  traduire,
} from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/expressions-litterales";

// LES CORRECTEURS DE calcul-litteral.bank.ts (5e, notion litteral_calcul, 09/10/2026).
// Voir 6e/maths/correcteurs/types.ts. Ils relisent l'expression écrite dans le
// TEXTE (la plus longue expression littérale, ou l'égalité entre « »), les
// valeurs données (« pour x = 7 »), la phrase citée (« le double de x augmenté
// de 3 »), et refont le calcul avec les outils du calcul littéral de 4e
// (polynômes exacts : deux expressions sont égales si leurs polynômes le sont).
// Ils vérifient : la réponse attendue, la forme demandée (réduite, développée),
// en QCM une seule proposition juste, l'unité en situation, le signe « − ».
// Règles communes (4e) : aucune question à mots-clés, pas de formule
// d'identité remarquable.

type Q = TutorGeneratedQuestionV4;

/** ⛔ Le signe moins s'écrit « − » (pas le tiret) dans ce que voit l'élève. */
function signeMoins(q: Q): string[] {
  for (const s of [q.text, ...(q.choices ?? [])].map(String))
    if (/\d\s-\s|[a-z]\s-\s\d|(^|\s)-\d/.test(s)) return [`tiret au lieu du signe moins « − » : « ${s} »`];
  return [];
}
function avecRegles(c: CorrecteursMaths): CorrecteursMaths {
  const r = avecReglesLitteral(c);
  return Object.fromEntries(Object.entries(r).map(([id, f]) => [id, (q: Q) => [...signeMoins(q), ...f(q)]]));
}

/* ── comprendre ─────────────────────────────────────────────────────────── */

function cComprendre(q: Q): string[] {
  const t = texteLisible(q.text);
  const E = plusLongue(q.text);
  const P = E ? poly(E) : null;
  if (!E || !P) return ["expression introuvable"];
  const L = lettresDe(P);
  if (L.length !== 1) return [`une seule lettre attendue dans ${E}`];
  if (q.format === "qcm") {
    // « que veut dire 7k ? » : le produit interrogé, pas toute l'expression
    const m = t.match(/(?:signifie|veut dire|l’écriture) (\d+[a-z])\b/);
    return qcmExpression(q, m ? poly(m[1]) : P);
  }
  if (/coefficient|multiplie|multiplié/.test(t)) return reponseNombre(q, coef(P, L[0]), `coefficient de ${L[0]} dans ${E}`);
  if (/terme constant|nombre seul|ne contient pas de lettre/.test(t)) return reponseNombre(q, coef(P, ""), `terme constant de ${E}`);
  return ["question illisible"];
}

/* ── traduire ───────────────────────────────────────────────────────────── */

const phraseCitee = (t: string) => texteLisible(t).match(/« (.+?) »/)?.[1] ?? null;

function cTraduire(q: Q): string[] {
  const ph = phraseCitee(q.text);
  if (!ph) return ["phrase citée introuvable"];
  const juste = traduire(ph);
  if (!juste) return [`phrase non comprise : « ${ph} »`];
  if (q.format === "qcm") return qcmExpression(q, juste);
  const p = reponseExpression(q, juste, `« ${ph} »`);
  // la lettre de la réponse est celle de la phrase
  const l = ph.match(/(?<![a-zà-ÿ])([a-z])(?![a-zà-ÿ’'])/)?.[1];
  if (l && !String(q.expected[0]).includes(l)) p.push(`la réponse n'utilise pas la lettre ${l}`);
  return p;
}

/* ── outils communs (13/10/2026) ────────────────────────────────────────── */

const nb = (s: string) => Number(String(s).replace(/\s/g, "").replace(/[−–]/g, "-").replace(",", "."));
/** « 17 cm » → { v: 17, u: "cm" } ; « −3 » → { v: −3, u: "" }. */
function lireReponse(s: string): { v: number; u: string } | null {
  const m = String(s).trim().match(/^([−-]?\d+(?:,\d+)?)\s*(.*)$/);
  return m ? { v: nb(m[1]), u: m[2].trim() } : null;
}
/** La réponse numérique (QCM : une seule proposition juste ; sinon l'attendue), avec son unité. */
function verifierNombre(q: Q, juste: number, unite: string, quoi: string): string[] {
  const p: string[] = [];
  if (q.format === "qcm") {
    const js = (q.choices ?? []).filter((c) => lireReponse(c)?.v === juste);
    if (js.length !== 1) p.push(`${js.length} propositions valent ${juste} (${quoi})`);
    else if (js[0] !== q.expected[0]) p.push(`attendu « ${q.expected[0]} », la proposition juste est « ${js[0]} »`);
    for (const c of q.choices ?? []) if (!lireReponse(c)) p.push(`proposition illisible « ${c} »`);
    return p;
  }
  const r = lireReponse(String(q.expected[0]));
  if (!r || Math.abs(r.v - juste) > 1e-9) p.push(`attendu « ${q.expected[0]} », le calcul refait donne ${juste} (${quoi})`);
  else if (r.u !== unite) p.push(`unité « ${r.u} » au lieu de « ${unite} »`);
  if (q.comparator !== "number_equal") p.push(`comparateur ${q.comparator} pour un nombre`);
  return p;
}
/** Les nombres écrits dans un morceau de texte (signe « − » compris). */
const nombres = (t: string) => (t.match(/[−-]?\d+(?:,\d+)?/g) ?? []).map(nb);

/* ── substituer ─────────────────────────────────────────────────────────── */

function cSubstituer(q: Q): string[] {
  const t = texteLisible(q.text);
  const v = valeursDonnees(q.text);
  const L = Object.keys(v);
  if (!L.length) return ["valeur de la lettre introuvable"];
  const E = plusLongue(q.text, L);
  if (!E) return ["expression introuvable"];
  const P = poly(E)!;
  const lettres = lettresDe(P);
  if (lettres.some((l) => !(l in v))) return [`une lettre de ${E} n'a pas de valeur`];
  const r = valeur(E, v);
  if (r == null) return [`calcul impossible : ${E}`];
  const p: string[] = [];
  // unité imposée par le texte : « …, en cm », « … km. »
  const i = t.indexOf(E);
  const apres = t.slice(i + E.length, i + E.length + 8);
  const unite = /^,? en cm/.test(apres) ? "cm" : /^ km\b/.test(apres) ? "km" : "";
  // en situation, le récit dit les nombres de l'expression
  const l = lettres[0];
  if (/tables carrées/.test(t)) {
    if (!equiv(E, `2${l} + 2`)) p.push(`${E} : des tables carrées bout à bout donnent 2${l} + 2 places`);
  } else if (/frise de/.test(t)) {
    const k = /triangles/.test(t) ? 2 : /carrés/.test(t) ? 3 : /pentagones/.test(t) ? 4 : 0;
    if (!equiv(E, `${k}${l} + 1`)) p.push(`${E} : la frise demande ${k}${l} + 1 allumettes`);
  } else if (/rectangle/.test(t)) {
    const w = t.match(/largeur (\d+) cm/);
    if (!w || !equiv(E, `2${l} + 2 × ${w[1]}`)) p.push(`${E} n'est pas le périmètre du rectangle`);
  } else if (/ par (semaine|étoile|heure|jour|minute|gâteau)|rangées de|chaque semaine/.test(t)) {
    const avant = nombres(t.slice(0, i));
    for (const c of [coef(P, l), coef(P, "")]) if (!avant.includes(c)) p.push(`le nombre ${c} de ${E} n'est pas dans le récit`);
    if (v[l] <= 0) p.push(`valeur ${v[l]} : pas plausible en situation`);
  }
  if (!/^[a-z]+$/.test(l)) p.push("lettre illisible");
  return [...p, ...verifierNombre(q, r, unite, `${E} pour ${L.map((x) => `${x} = ${v[x]}`).join(", ")}`)];
}

/* ── réduire ────────────────────────────────────────────────────────────── */

/** En situation, la somme à réduire se lit dans le récit ; sinon c'est l'expression non réduite du texte. */
function sommeDuRecit(t: string): string | null {
  const tri = t.match(/côtés de longueurs (\S+), (\S+) et (\d+) \(en cm\)/);
  if (tri) return `${tri[1]} + ${tri[2]} + ${tri[3]}`;
  const trois = t.match(/range (\S+) livres, puis (\d+) livres, puis encore (\S+) livres/);
  if (trois) return `${trois[1]} + ${trois[2]} + ${trois[3]}`;
  const deux =
    t.match(/ a (\S+) images\. \S+ en a (\S+)\./) ??
    t.match(/contient (\S+) perles rouges et (\S+) perles bleues/) ??
    t.match(/marche (\S+) mètres le matin et (\S+) mètres le soir/);
  if (deux) return `${deux[1]} + ${deux[2]}`;
  return null;
}

function cReduire5(q: Q): string[] {
  const t = texteLisible(q.text);
  const E = sommeDuRecit(t) ?? cibleNonReduite(q.text) ?? plusLongue(q.text);
  if (!E) return ["expression introuvable"];
  const P = poly(E);
  if (!P) return [`expression illisible : ${E}`];
  if (estReduite(E) && !E.includes("×") && !sommeDuRecit(t)) return [`${E} est déjà réduite : rien à faire`];
  const p = q.format === "qcm" ? qcmExpression(q, P) : reponseExpression(q, P, `${E} réduite`);
  if (!estReduite(String(q.expected[0]))) p.push(`la réponse « ${q.expected[0]} » n'est pas réduite`);
  return p;
}

/* ── tester une égalité ─────────────────────────────────────────────────── */

function cTester(q: Q): string[] {
  const t = texteLisible(q.text);
  const egs = [...t.matchAll(/«\s*([^»]+?)\s*»/g)].map((m) => m[1]);
  if (egs.length !== 1 || (egs[0].match(/=/g) ?? []).length !== 1) return ["une égalité entre « » attendue"];
  const [G, D] = egs[0].split("=").map((s) => s.trim());
  const PG = poly(G), PD = poly(D);
  if (!PG || !PD) return [`égalité illisible : ${egs[0]}`];
  const L = lettresDe(PG).concat(lettresDe(PD)).filter((x, i, a) => a.indexOf(x) === i);
  if (L.length !== 1) return [`une seule lettre attendue dans ${egs[0]}`];
  const l = L[0];
  const f = (x: number) => (valeur(G, { [l]: x }) ?? NaN) - (valeur(D, { [l]: x }) ?? NaN);
  const vraieEn = (x: number) => Math.abs(f(x)) < 1e-9;
  const dehors = t.replace(/«[^»]*»/g, "«»");
  const vals = [...dehors.matchAll(new RegExp(`(?<![a-zà-ÿ])${l} = ([−-]?\\d+)|remplace ${l} par ([−-]?\\d+)`, "g"))].map((m) => nb(m[1] ?? m[2]));
  const ch = q.choices ?? [];
  const p: string[] = [];
  if (q.format !== "qcm") return ["QCM attendu"];
  if (ch.some((c) => c === "toutes" || c === "aucune")) {
    // pour quelles valeurs ? d(x) = f(0) + (f(1) − f(0))·x
    const f0 = f(0), pente = f(1) - f(0);
    const juste = Math.abs(pente) < 1e-9 ? (Math.abs(f0) < 1e-9 ? "toutes" : "aucune") : `${l} = ${signe(-f0 / pente)}`;
    if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », il faut « ${juste} »`);
    if (!ch.includes(juste)) p.push(`« ${juste} » n'est pas proposée`);
    return p;
  }
  if (ch.every((c) => new RegExp(`^${l} = [−-]?\\d+$`).test(c))) {
    const js = ch.filter((c) => vraieEn(nb(c.split("= ")[1])));
    if (js.length !== 1) p.push(`${js.length} valeurs rendent l'égalité vraie : ${js.join(" | ")}`);
    else if (js[0] !== q.expected[0]) p.push(`attendu « ${q.expected[0]} », la bonne valeur est « ${js[0]} »`);
    return p;
  }
  const [oui, non] = ch.includes("vrai") ? ["vrai", "faux"] : ["oui", "non"];
  if (!(ch.length === 2 && ch.includes(oui) && ch.includes(non))) return [`propositions inattendues : ${ch.join(" | ")}`];
  if (/Vrai ou faux/.test(t) !== (oui === "vrai")) p.push("« Vrai ou faux ? » se répond par vrai / faux, une question par oui / non");
  if (!vals.length) return ["valeur testée introuvable"];
  // « vraie pour x = 3. Est-elle vraie aussi pour x = 5 ? » : la première affirmation doit être juste
  if (vals.length === 2 && !vraieEn(vals[0])) p.push(`l'égalité n'est pas vraie pour ${l} = ${vals[0]}, contrairement au texte`);
  if (vals.length > 2) p.push("trop de valeurs dans le texte");
  const juste = vraieEn(vals[vals.length - 1]) ? oui : non;
  if (q.expected[0] !== juste) p.push(`attendu « ${q.expected[0]} », recalculé « ${juste} » pour ${l} = ${vals[vals.length - 1]}`);
  return p;
}

const signe = (v: number) => (v < 0 ? `−${-v}` : String(v));

/* ── défis ──────────────────────────────────────────────────────────────── */

/** La valeur demandée « pour x = 5 » (dernière du texte), ou null. */
function valeurDemandee(t: string, l: string): number | null {
  const ms = [...t.replace(/«[^»]*»/g, "«»").matchAll(new RegExp(`(?<![a-zà-ÿ])${l} = ([−-]?\\d+)`, "g"))];
  return ms.length ? nb(ms[ms.length - 1][1]) : null;
}

function cDefi(q: Q): string[] {
  const t = texteLisible(q.text);
  const ch = q.choices ?? [];
  // programme de calcul
  const prog = t.match(/Choisis un nombre ([a-z])\. Multiplie-le par (\d+)\. (Ajoute|Soustrais) (\d+) au résultat\./);
  if (prog) {
    const [, l, k, op, n] = prog;
    const E = `${k}${l} ${op === "Ajoute" ? "+" : "−"} ${n}`;
    const v = valeurDemandee(t.slice(prog.index! + prog[0].length), l);
    return v == null ? reponseExpression(q, E, "le programme") : verifierNombre(q, valeur(E, { [l]: v })!, "", `${E} pour ${l} = ${v}`);
  }
  // périmètre d'un rectangle de longueur (x + b) et de largeur w
  const rect = t.match(/longueur (?:mesure )?\(([^)]+)\) (cm|m) et (?:pour largeur |sa largeur )(\d+) (cm|m)/);
  if (rect) {
    const [, L, u1, w, u2] = rect;
    if (u1 !== u2) return ["unités différentes"];
    const E = `2(${L}) + 2 × ${w}`;
    const l = lettresDe(poly(L)!)[0];
    const v = valeurDemandee(t.slice(rect.index! + rect[0].length), l);
    if (v == null) {
      const p = reponseExpression(q, E, "le périmètre");
      if (!estReduite(String(q.expected[0]))) p.push("périmètre non réduit");
      return p;
    }
    return verifierNombre(q, valeur(E, { [l]: v })!, u1, `${E} pour ${l} = ${v}`);
  }
  // traduire une phrase puis calculer
  const ph = t.match(/« (.+?) »/)?.[1];
  if (ph && !ph.includes("=")) {
    const E = traduire(ph);
    if (!E) return [`phrase non comprise : « ${ph} »`];
    const l = lettresDe(poly(E)!)[0];
    const v = valeurDemandee(t, l);
    if (v == null) return ["valeur introuvable"];
    return verifierNombre(q, valeur(E, { [l]: v })!, "", `« ${ph} » = ${E} pour ${l} = ${v}`);
  }
  // l'erreur d'un élève : « Un élève écrit : 3x + 2x = 5x². »
  const err = t.match(/(?:écrit|on lit) : (.+?) = (.+?)\. /);
  if (err) {
    const [, A, B] = err;
    const p = equiv(A, B) ? [`l'écriture de l'élève ${A} = ${B} est juste : ce n'est pas une erreur`] : [];
    return [...p, ...qcmExpression(q, poly(A))];
  }
  // quelle réduction est correcte ?
  if (ch.length && ch.every((c) => c.includes("="))) {
    const js = ch.filter((c) => {
      const [A, B] = c.split("=");
      return equiv(A, B);
    });
    if (js.length !== 1) return [`${js.length} égalités justes : ${js.join(" | ")}`];
    return js[0] === q.expected[0] ? [] : [`attendu « ${q.expected[0]} », la juste est « ${js[0]} »`];
  }
  // peut-on réduire ?
  if (/réduire|plus simplement/.test(t) && ch.length === 2) {
    const E = plusLongue(q.text);
    const P = E ? poly(E) : null;
    if (!E || !P) return ["expression introuvable"];
    const ecrits = E.split(/ [+−-] /).length;
    const oui = E.includes("×") || ecrits > P.size;
    const [o, n] = ch.includes("vrai") ? ["vrai", "faux"] : ["oui", "non"];
    const p: string[] = [];
    if (/Vrai ou faux/.test(t) !== (o === "vrai")) p.push("« Vrai ou faux ? » se répond par vrai / faux");
    if (q.expected[0] !== (oui ? o : n)) p.push(`attendu « ${q.expected[0]} » : ${E} ${oui ? "se réduit" : "ne se réduit pas"}`);
    return p;
  }
  // réduire un produit
  if (/×/.test(t) && !/calcule|valeur|remplace/i.test(t)) return cReduire5(q);
  // réduire puis calculer
  return cSubstituer(q);
}

/* ── distributivité ─────────────────────────────────────────────────────── */

/** « Complète : 4(x + …) = 4x + 12 » : le nombre caché, en résolvant l'identité (… → z). */
function nombreCache(egalite: string): number | null {
  const [G, D] = egalite.replace(/…/g, "z").split("=").map((s) => s.trim());
  const PG = poly(G), PD = poly(D);
  if (!PG || !PD) return null;
  const F = new Map(PG);
  for (const [k, c] of PD) F.set(k, (F.get(k) ?? 0) - c);
  // F = A + z·B : z = −A/B, le même pour chaque monôme
  let z: number | null = null;
  const A = new Map<string, number>(), B = new Map<string, number>();
  for (const [k, c] of F) {
    if (Math.abs(c) < 1e-9) continue;
    if (/z1/.test(k)) B.set(k.replace("z1", ""), c);
    else A.set(k, c);
  }
  for (const [k, b] of B) {
    const zz = -(A.get(k) ?? 0) / b;
    if (z == null) z = zz;
    else if (Math.abs(z - zz) > 1e-9) return null;
  }
  for (const k of A.keys()) if (!B.has(k)) return null;
  return z;
}

function cDistributivite(q: Q): string[] {
  const t = texteLisible(q.text);
  // calcul astucieux : 7 × 98 = 7 × (100 − 2)
  const astuce = t.match(/(\d+) = (10|100) ([+−]) (\d+)/);
  if (astuce) {
    const [, N, n, op, d] = astuce;
    const p: string[] = [];
    if (nb(N) !== nb(n) + (op === "+" ? 1 : -1) * nb(d)) p.push(`${N} n'est pas égal à ${n} ${op} ${d}`);
    const prod = t.match(/(\d+) × (\d+)/) ?? t.match(/(\d+) paquets de (\d+) graines/);
    if (!prod || (prod[2] !== N && prod[1] !== N)) return [...p, "produit introuvable"];
    return [...p, ...verifierNombre(q, nb(prod[1]) * nb(prod[2]), "", `${prod[1]} × ${prod[2]}`)];
  }
  const comp = t.match(/Complète : (.+)$/);
  if (comp) {
    const z = nombreCache(comp[1]);
    if (z == null) return [`égalité à compléter illisible : ${comp[1]}`];
    return verifierNombre(q, z, "", comp[1]);
  }
  const rect = t.match(/largeur (\d+) cm et (?:pour|de) longueur (\(.+?\)) cm/);
  const E = rect ? `${rect[1]}${rect[2]}` : cibleNonReduite(q.text);
  if (!E || !E.includes("(")) return ["produit à développer introuvable"];
  const P = poly(E);
  if (!P) return [`expression illisible : ${E}`];
  const p = q.format === "qcm" ? qcmExpression(q, P) : reponseExpression(q, P, `${E} développée`);
  const e = String(q.expected[0]);
  if (e.includes("(") || !estReduite(e)) p.push(`la réponse « ${e} » n'est pas développée et réduite`);
  return p;
}

export const CORRECTEURS: CorrecteursMaths = avecRegles({
  litteral_defi_tpl_1: cDefi,
  litteral_defi_tpl_2: cDefi,
  litteral_defi_tpl_3: cDefi,
  litteral_defi_tpl_s4: cDefi,
  litteral_distributivite_tpl_1: cDistributivite,
  litteral_distributivite_tpl_2: cDistributivite,
  litteral_distributivite_tpl_s2: cDistributivite,
  litteral_distributivite_tpl_s5: cDistributivite,
  litteral_tester_tpl_1: cTester,
  litteral_tester_tpl_2: cTester,
  litteral_tester_tpl_s2: cTester,
  litteral_tester_tpl_s5: cTester,
  litteral_reduire_tpl_1: cReduire5,
  litteral_reduire_tpl_s2: cReduire5,
  litteral_reduire_tpl_s4: cReduire5,
  litteral_substituer_tpl_1: cSubstituer,
  litteral_substituer_tpl_x1: cSubstituer,
  litteral_substituer_tpl_s1: cSubstituer,
  litteral_substituer_tpl_s2: cSubstituer,
  litteral_traduire_tpl_1: cTraduire,
  litteral_traduire_tpl_x1: cTraduire,
  litteral_traduire_tpl_s1: cTraduire,
  litteral_traduire_tpl_s3: cTraduire,
  litteral_expression_comprendre_tpl_1: cComprendre,
  litteral_expression_comprendre_tpl_s1: cComprendre,
});
