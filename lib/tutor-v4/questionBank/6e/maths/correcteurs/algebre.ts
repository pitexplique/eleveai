import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { PRENOMS } from "../fractions.bank";

// Les correcteurs de algebre.bank.ts (06/10/2026, voir types.ts).
// Chacun relit les nombres DANS LE TEXTE vu par l'élève et refait le
// raisonnement du schéma en barres ou du motif, sans rien emprunter au gabarit.
// ⛔ Ici on n'est pas dans les fractions : AUCUNE barre « / » entre deux nombres
// (« 12/4 » pour 12 ÷ 4), ni dans l'énoncé, ni dans les propositions, ni dans la
// réponse, ni dans l'explication (Frédéric, 06/10 : « les élèves ne savent pas
// que 5/2 signifie 5 : 2 »). « km/h » reste permis.

const NOMBRE = String.raw`\d+(?:,\d+)?`;
const nb = (s: string) => Number(s.replace(",", "."));
const NOMS = PRENOMS.map((x) => x.p);

/** Aucune division écrite « a/b » entre deux nombres. */
function sansBarre(q: TutorGeneratedQuestionV4): string[] {
  const tout = [q.text, ...(q.choices ?? []), ...q.expected, q.explanation ?? "", JSON.stringify(q.canvas ?? "")];
  const m = tout.join(" ¦ ").match(/\d\s*\/\s*\d/);
  return m ? [`barre de fraction « ${m[0]} » hors des fractions : écrire « ÷ »`] : [];
}

/** Valeur d'une suite « 6 + 24 × 5 » (priorités : × et ÷ d'abord). */
function evalue(expr: string): number {
  const t = expr.trim().split(" ");
  const termes: number[] = [];
  const signes: string[] = [];
  let courant = nb(t[0]);
  for (let i = 1; i < t.length; i += 2) {
    const op = t[i];
    const v = nb(t[i + 1]);
    if (op === "×") courant *= v;
    else if (op === "÷") courant /= v;
    else {
      termes.push(courant);
      signes.push(op);
      courant = v;
    }
  }
  termes.push(courant);
  return termes.slice(1).reduce((acc, v, i) => (signes[i] === "+" ? acc + v : acc - v), termes[0]);
}

/** Toutes les égalités chiffrées d'un texte (« 48 − 12 = 36 », « 6 + 24 × 5 = 126 ») sont justes. */
export function calculsJustes(t: string): string[] {
  const expr = `${NOMBRE}(?: [+−×÷] ${NOMBRE})*`;
  const re = new RegExp(`${expr}(?: = ${expr})+`, "g");
  const p: string[] = [];
  for (const m of t.matchAll(re)) {
    const membres = m[0].split(" = ").map(evalue);
    if (membres.some((v) => Math.abs(v - membres[0]) > 1e-9)) p.push(`calcul faux : ${m[0]}`);
  }
  return p;
}

/** La réponse attendue vaut v (« 15 » ou « 15 € »), et toutes ses écritures aussi. */
function attendu(q: TutorGeneratedQuestionV4, v: number, unite?: string): string[] {
  const p: string[] = [];
  const lu = (s: string) => {
    const m = String(s).match(new RegExp(`^(${NOMBRE})(?: (.+))?$`));
    return m ? { v: nb(m[1]), u: m[2] } : null;
  };
  const e0 = lu(String(q.expected[0]));
  if (!e0 || Math.abs(e0.v - v) > 1e-9) p.push(`réponse attendue ${q.expected[0]} au lieu de ${v}`);
  if (unite && e0?.u !== unite) p.push(`la réponse devrait porter l'unité ${unite}`);
  for (const e of q.expected) {
    const x = lu(String(e));
    if (x && Math.abs(x.v - v) > 1e-9) p.push(`écriture acceptée fausse : ${e}`);
  }
  if (!Number.isInteger(v) || v <= 0) p.push(`réponse ${v} : pas un entier positif`);
  return p;
}

/** Le dernier prénom cité dans la question (la dernière phrase). */
function prenomDeLaQuestion(t: string, candidats: string[]): string | null {
  const phrases = t.split(/(?<=[.?!])\s+/);
  for (let i = phrases.length - 1; i >= 0; i--) {
    const qui = candidats.filter((c) => new RegExp(`(^|[^\\p{L}])${c}([^\\p{L}]|$)`, "u").test(phrases[i]));
    if (qui.length === 1) return qui[0];
    if (qui.length > 1) return null;
  }
  return null;
}

/** Valeur d'un calcul avec parenthèses simples : « (320 − 70 + 80) ÷ 3 ». */
function evalueParentheses(s: string): number {
  return evalue(s.replace(/\(([^()]+)\)/g, (_, e: string) => String(evalue(e))));
}

/**
 * Les anciennes questions d'explication (« _tpl_ouverte »).
 * 08/10/2026 : plus AUCUNE question ouverte (Frédéric : « les questions open
 * doivent être précises »). Chaque cas est relu dans le texte et recalculé :
 * réponse courte = la bonne valeur ; QCM = UN SEUL choix juste, et c'est l'attendu.
 */
export function ouverte(q: TutorGeneratedQuestionV4): string[] {
  if (q.format === "open" || q.comparator === "contains_keyword") return ["question ouverte : elle doit être un cas précis (08/10)"];
  const p: string[] = [];
  const t = q.text;
  const ch = q.choices ?? [];
  if (q.format === "qcm") {
    if (q.comparator !== "mcq_exact" || !ch.includes(String(q.expected[0]))) p.push("QCM mal formé");
    if (new Set(ch).size !== ch.length) p.push("choix en double");
    if (ch.length < 3) p.push("au moins trois choix attendus");
    // Frédéric (08/10) : l'élève calcule le nombre, il ne choisit pas une formule.
    for (const c of ch) if (/[+−×÷]/.test(c)) p.push(`choix en formule : ${c}`);
  }
  /** Un seul choix chiffré vaut `bon`, et c'est l'attendu. */
  const unSeul = (bon: number) => {
    const justes = ch.filter((c) => /^[\d ()+−×÷]+$/.test(c) && Math.abs(evalueParentheses(c) - bon) < 1e-9);
    if (justes.length !== 1 || justes[0] !== q.expected[0]) p.push(`une seule proposition doit valoir ${bon} : ${justes.join(" | ")}`);
  };
  let m: RegExpMatchArray | null;
  if ((m = t.match(/la première en demande (\d+), chaque maison ajoutée (\d+) de plus\. .*? pour (\d+) maisons/))) {
    const [d, pas, n] = m.slice(1).map(Number);
    p.push(...attendu(q, d + (n - 1) * pas));
  } else if ((m = t.match(/somme (\d+)\. Le plus grand dépasse le plus petit de (\d+)\. Quel est le plus petit/))) {
    const [S, e] = m.slice(1).map(Number);
    if ((S - e) % 2 || S <= e) p.push(`${S} − ${e} ne se partage pas en deux`);
    unSeul((S - e) / 2);
  } else if ((m = t.match(/prime de (\d+) € .*?L’or a (\d+) € de plus .*?le bronze (\d+) € de moins/))) {
    const [T, P, M] = m.slice(1).map(Number);
    if ((T - P + M) % 3) p.push("la prime d'argent n'est pas entière");
    p.push(...attendu(q, (T - P + M) / 3, "€"));
  } else if ((m = t.match(/(\d+) barres égales\. Elles font (\d+) en tout/))) {
    const [n, T] = m.slice(1).map(Number);
    if (T % n) p.push(`${T} ne se partage pas en ${n}`);
    p.push(...attendu(q, T / n));
  } else if (/Deux paniers contiennent les mêmes/.test(t)) {
    m = t.match(/a (\d+) .+? de plus et coûte (\d+) € de plus/);
    if (!m) return [...p, "deux paniers : nombre ou prix en plus introuvable"];
    const [n, d] = m.slice(1).map(Number);
    if (d % n) p.push(`${d} € ne se partage pas en ${n}`);
    p.push(...attendu(q, d / n, "€"));
  } else if ((m = t.match(/coûtent (\d+) € ensemble\. Peut-on trouver/))) {
    if (!/^non/.test(String(q.expected[0]))) p.push("une seule information ne suffit pas : la réponse est non");
    if (ch.filter((c) => /^non/.test(c)).length !== 1) p.push("un seul choix « non » attendu");
  } else if ((m = t.match(/^.+? coûte (\d+) €\. .+? et (\d+) .+? coûtent (\d+) €\./))) {
    const [P, n, T] = m.slice(1).map(Number);
    if ((T - P) % n || T <= P) p.push(`${T} − ${P} ne se partage pas en ${n}`);
    p.push(...attendu(q, (T - P) / n, "€"));
  } else if ((m = t.match(/vaut (\d+) à l’étape 1\. On ajoute (\d+) à chaque étape\. Combien vaut l’étape (\d+)/))) {
    const [a, pas, k] = m.slice(1).map(Number);
    unSeul(a + (k - 1) * pas);
  } else if ((m = t.match(/commence par (\d+), (\d+), (\d+)… De combien augmente/))) {
    const [a, b, c] = m.slice(1).map(Number);
    if (b - a !== c - b || b <= a) p.push("l'écart n'est pas constant");
    p.push(...attendu(q, b - a));
  } else if ((m = t.match(/: (\d+) \S+ à l’étape 1, puis (\d+) de plus à chaque étape\. .*?a utilisé (\d+) /))) {
    const [d, pas, T] = m.slice(1).map(Number);
    if ((T - d) % pas || T <= d) p.push(`${T} − ${d} ne se partage pas en ajouts de ${pas}`);
    p.push(...attendu(q, (T - d) / pas + 1));
  } else if (/le double du premier/.test(t) && /le triple/.test(t)) {
    // Trois enfants, double et triple : 1 + 2 + 3 = 6 parts.
    p.push(...attendu(q, 6));
  } else if ((m = t.match(/(\d+) parts égales et encore (\d+) font (\d+) en tout/))) {
    const [n, k, T] = m.slice(1).map(Number);
    if ((T - k) % n || T <= k) p.push(`${T} − ${k} ne se partage pas en ${n}`);
    p.push(...attendu(q, (T - k) / n));
  } else p.push("cas inconnu");
  return p;
}

const avecBarre =(f: (q: TutorGeneratedQuestionV4) => string[]) => (q: TutorGeneratedQuestionV4) => [
  ...sansBarre(q),
  ...calculsJustes(String(q.explanation ?? "")),
  ...f(q),
];

/** Un motif : le pas (« 5 de plus », « on ajoute 5 », « +5 »), les étapes citées, les autres nombres. */
function lireMotif(t: string) {
  const mp = t.match(/(\d+) (?:\S+ )?de plus|ajoute (\d+)|\+(\d+)/);
  const pas = mp ? Number(mp[1] ?? mp[2] ?? mp[3]) : NaN;
  const etapes = [...t.matchAll(/[ée]tape (\d+)/gi)].map((m) => Number(m[1]));
  const reste = t.replace(mp?.[0] ?? "§", " ").replace(/[ée]tape \d+/gi, " ");
  const autres = [...reste.matchAll(/\d+/g)].map((m) => Number(m[0]));
  return { pas, etapes, autres };
}

export const CORRECTEURS: CorrecteursMaths = {
  // Étape n = départ + (n − 1) × pas.
  algebre_motif_tpl_1: avecBarre((q) => {
    const { pas, etapes, autres } = lireMotif(q.text);
    const rang = etapes.find((e) => e !== 1);
    if (Number.isNaN(pas) || !rang || autres.length !== 1) return ["départ, pas ou étape introuvable"];
    const p = attendu(q, autres[0] + (rang - 1) * pas);
    const c = q.canvas as any;
    if (c?.terms && (c.terms[0] !== autres[0] || c.terms[1] !== autres[0] + pas)) p.push("le dessin du motif ne suit pas l'énoncé");
    return p;
  }),
  // Trois étapes données : la quatrième = la troisième + l'écart constant.
  algebre_motif_tpl_suivant: avecBarre((q) => {
    const reste = q.text.replace(/[ée]tape (\d+)/gi, " ");
    const t = [...reste.matchAll(/\d+/g)].map((m) => Number(m[0]));
    if (t.length !== 3) return [`trois étapes attendues, lu ${t.join(", ")}`];
    if (t[1] - t[0] !== t[2] - t[1] || t[1] <= t[0]) return ["les trois étapes n'augmentent pas régulièrement"];
    return attendu(q, t[2] + (t[2] - t[1]));
  }),
  // Grand rang : une seule proposition vaut départ + (n − 1) × pas.
  algebre_motif_tpl_grand_rang: avecBarre((q) => {
    const { pas, etapes, autres } = lireMotif(q.text);
    const rang = etapes.find((e) => e !== 1);
    const depart = autres.length === 1 ? autres[0] : q.text.match(/\((\d+) au départ/)?.[1];
    if (Number.isNaN(pas) || !rang || depart === undefined) return ["départ, pas ou étape introuvable"];
    const bon = Number(depart) + (rang - 1) * pas;
    const valeur = (c: string) => Number(String(c.split(" = ").pop()).replace(",", "."));
    const p: string[] = [];
    const justes = (q.choices ?? []).filter((c) => valeur(c) === bon);
    if (justes.length !== 1) p.push(`${justes.length} propositions valent ${bon}`);
    if (q.expected[0] !== justes[0]) p.push(`réponse attendue ${q.expected[0]} au lieu de ${justes[0]}`);
    for (const c of q.choices ?? []) p.push(...calculsJustes(c));
    return p;
  }),
  // Le chemin à l'envers : étape = (total − départ) ÷ pas + 1.
  algebre_defi_tpl_1: avecBarre((q) => {
    const { pas, autres } = lireMotif(q.text);
    if (Number.isNaN(pas) || autres.length !== 2) return ["départ, pas et total attendus"];
    const [depart, total] = [Math.min(...autres), Math.max(...autres)];
    if ((total - depart) % pas) return [`${total} − ${depart} ne se partage pas en ajouts de ${pas}`];
    return attendu(q, (total - depart) / pas + 1);
  }),
  algebre_motif_tpl_ouverte: avecBarre(ouverte),
  algebre_defi_tpl_ouverte: avecBarre(ouverte),
  // Somme S et écart e : petit = (S − e) ÷ 2, grand = petit + e.
  algebre_barres_tpl_1: avecBarre((q) => {
    const unite = /€/.test(q.text) ? "€" : undefined;
    const e = q.text.match(/(\d+) (?:\S+ )?de (plus|moins)/) ?? q.text.match(/dépasse le plus petit de (\d+)/);
    const S = q.text.match(/(?:somme|ensemble|ont) (\d+)/);
    if (!e || !S) return ["somme ou écart introuvable"];
    const [ecart, total] = [Number(e[1]), Number(S[1])];
    if ((total - ecart) % 2 || total <= ecart) return [`${total} − ${ecart} ne se partage pas en deux parts entières`];
    const petit = (total - ecart) / 2;
    let veutGrand: boolean;
    if (/Deux nombres/.test(q.text)) veutGrand = /le plus grand \?/.test(q.text);
    else {
      const r = q.text.match(new RegExp(`(\\p{Lu}\\p{L}+) (?:en )?a \\d+ (?:\\S+ )?de (plus|moins) qu(?:e |’)(\\p{Lu}\\p{L}+)`, "u"));
      if (!r) return ["relation « de plus / de moins » illisible"];
      const grand = r[2] === "plus" ? r[1] : r[3];
      const qui = prenomDeLaQuestion(q.text.slice(q.text.indexOf(r[0]) + r[0].length), [r[1], r[3]]);
      if (!qui) return ["on ne sait pas de qui on demande la part"];
      veutGrand = qui === grand;
    }
    return attendu(q, veutGrand ? petit + ecart : petit, unite);
  }),
  // Le grand vaut k fois le petit : une part = S ÷ (k + 1).
  algebre_barres_tpl_multiple: avecBarre((q) => {
    const unite = /€/.test(q.text) ? "€" : undefined;
    const km = q.text.match(/le double|le triple|(deux|trois|quatre|cinq) fois plus/);
    if (!km) return ["rapport « double / triple / k fois » introuvable"];
    const k = km[0] === "le double" ? 2 : km[0] === "le triple" ? 3 : ["deux", "trois", "quatre", "cinq"].indexOf(km[1]) + 2;
    const nombres = [...q.text.matchAll(/\d+/g)].map((m) => Number(m[0]));
    const S = Math.max(...nombres);
    if (S % (k + 1)) return [`${S} ne se partage pas en ${k + 1} parts`];
    const avant = q.text.slice(0, km.index);
    const noms = NOMS.filter((n) => q.text.includes(n));
    if (noms.length !== 2) return ["deux prénoms attendus"];
    const grand = noms.reduce((a, b) => (avant.lastIndexOf(a) > avant.lastIndexOf(b) ? a : b));
    const qui = prenomDeLaQuestion(q.text.slice(km.index! + km[0].length), noms);
    if (!qui) return ["on ne sait pas de qui on demande la part"];
    const part = S / (k + 1);
    return attendu(q, qui === grand ? k * part : part, unite);
  }),
  // Trois parts : a = b + plus, c = b − moins ; b = (T − plus + moins) ÷ 3.
  algebre_barres_tpl_trois_parts: avecBarre((q) => {
    const T = Number(q.text.match(/\d+/)![0]);
    const plus = q.text.match(/reçoit (\d+) de plus/);
    const moins = q.text.match(/(\d+) de moins/);
    const noms =
      q.text.match(/entre (?:trois associations : )?(.+?), (.+?) et (.+?)\./) ?? q.text.match(/^(.+?), (.+?) et (.+?) se partagent/);
    if (!plus || !moins || !noms) return ["énoncé illisible"];
    const [a, b, c] = noms.slice(1, 4);
    const [P, M] = [Number(plus[1]), Number(moins[1])];
    if ((T - P + M) % 3) return [`${T} − ${P} + ${M} ne se partage pas en trois`];
    const milieu = (T - P + M) / 3;
    if (milieu - M <= 0) return ["la troisième part serait nulle ou négative"];
    const question = q.text.slice(q.text.indexOf(". ", q.text.indexOf("de moins")) + 2);
    const cible = [c, b, a].find((n) => question.includes(n));
    if (!cible) return ["on ne sait pas quelle part est demandée"];
    const v = cible === a ? milieu + P : cible === b ? milieu : milieu - M;
    return attendu(q, v, /€/.test(q.text) ? "€" : undefined);
  }),
  algebre_barres_tpl_ouverte: avecBarre(ouverte),
  algebre_inconnues_tpl_ouverte: avecBarre(ouverte),
  // n objets identiques pour T € : un objet = T ÷ n.
  algebre_inconnues_tpl_identiques: avecBarre((q) => {
    const T = q.text.match(/(\d+) €/);
    const autres = [...q.text.replace(/\d+ €/g, " ").matchAll(/\d+/g)].map((m) => Number(m[0]));
    if (!T || autres.length !== 1) return ["un prix total et un nombre d'objets attendus"];
    const [total, n] = [Number(T[1]), autres[0]];
    if (total % n) return [`${total} € ne se partage pas en ${n}`];
    return attendu(q, total / n, "€");
  }),
  // Un objet connu à P €, n objets identiques, total T : un objet = (T − P) ÷ n.
  algebre_inconnues_tpl_1: avecBarre((q) => {
    const montants = [...q.text.matchAll(/(\d+) €/g)];
    const connu = q.text.match(/(?:coûte|à) (\d+) €/);
    const n = q.text.match(/(\d+) [^\d€]+? identiques/);
    if (montants.length !== 2 || !connu || !n) return ["prix connu, total et nombre d'objets attendus"];
    const P = Number(connu[1]);
    const T = montants.map((m) => Number(m[1])).find((v, i) => montants[i].index !== connu.index! + connu[0].indexOf(connu[1]))!;
    const N = Number(n[1]);
    if ((T - P) % N || T <= P) return [`(${T} − ${P}) ne se partage pas en ${N}`];
    const p = attendu(q, (T - P) / N, "€");
    const c = q.canvas as any;
    if (c && (c.total !== `${T} €` || c.parts.filter((x: any) => x.unknown).length !== N)) p.push("le schéma ne reprend pas l'énoncé");
    return p;
  }),
  // Même partie A dans deux achats ; la différence vient des B en plus.
  algebre_inconnues_tpl_deux_paniers: avecBarre((q) => {
    const achats = [...q.text.matchAll(/achète (.+?) et (.+?) pour (\d+) €/g)];
    if (achats.length !== 2) return ["deux achats attendus"];
    const combien = (lot: string) => (/^une? /.test(lot) ? 1 : Number(lot.match(/^\d+/)?.[0] ?? NaN));
    const [a1, a2] = achats;
    if (a1[1] !== a2[1]) return ["la partie commune n'est pas la même"];
    const [n1, n2, t1, t2] = [combien(a1[2]), combien(a2[2]), Number(a1[3]), Number(a2[3])];
    if (!(n2 > n1) || (t2 - t1) % (n2 - n1)) return ["différence non partageable"];
    return attendu(q, (t2 - t1) / (n2 - n1), "€");
  }),
};
