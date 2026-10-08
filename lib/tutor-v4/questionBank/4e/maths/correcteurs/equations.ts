import type { CorrecteursMaths } from "./types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";

// LES CORRECTEURS DE equations.bank.ts (notion equation_resolution, 08/10/2026).
//
// ⭐ La règle : on lit l'équation DANS LE TEXTE ($…$), on y REMPLACE la solution
// attendue et on vérifie l'égalité (et qu'elle est la seule : l'équation est du
// premier degré, non dégénérée). Les phrases à traduire sont relues par un petit
// traducteur propre au correcteur (« le triple de la somme de x et de 7 vaut 45 »
// → 3(x + 7) = 45) et comparées membre à membre sur plusieurs valeurs. Les
// problèmes sont remis en équation À PARTIR DU TEXTE, situation par situation,
// avec l'unité de la réponse. Les QCM « justifier » et « l'erreur » sont refaits
// par le calcul. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const num = (s: string) => Number(String(s).trim().replace(/−/g, "-").replace(/\{,\}/g, ".").replace(",", "."));
const egal = (a: number, b: number) => Number.isFinite(a) && Number.isFinite(b) && Math.abs(a - b) < 1e-9;

// ─── écriture → calcul ──────────────────────────────────────────────────────

/** « $3(x + 2) - \frac{x}{4}$ », « 4x - 5 », « 2{,}5a » → expression JavaScript en `v`. */
function versJs(s0: string): { js: string; lettres: string[] } {
  let s = String(s0)
    .replace(/\$/g, "")
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "(($1)/($2))")
    .replace(/\{,\}/g, ".")
    .replace(/(\d),(\d)/g, "$1.$2")
    .replace(/\\times/g, "*")
    .replace(/\\div/g, "/")
    .replace(/[−–]/g, "-")
    .replace(/\^/g, "**")
    .replace(/\s+/g, "");
  s = s.replace(/(\d)([a-z(])/g, "$1*$2").replace(/\)([a-z0-9(])/g, ")*$1").replace(/([a-z])\(/g, "$1*(");
  if (!/^[\d.+\-*/()a-z]*$/.test(s)) throw new Error(`écriture illisible : ${s0}`);
  const lettres = [...new Set(s.match(/[a-z]/g) ?? [])];
  return { js: s, lettres };
}
function evaluer(expr: string, L: string | null, x: number): number {
  const { js, lettres } = versJs(expr);
  if (lettres.some((l) => l !== L)) throw new Error(`lettre inattendue dans ${expr}`);
  return Function("v", `return ${L ? js.replace(new RegExp(L, "g"), "(v)") : js};`)(x) as number;
}

/** « A = B » → les deux membres. */
function membres(eq: string): [string, string] | null {
  const p = eq.replace(/\$/g, "").split("=");
  return p.length === 2 ? [p[0].trim(), p[1].trim()] : null;
}
const lettreDe = (eq: string) => versJs(eq.replace(/=/g, "+")).lettres;

/** La solution vérifie-t-elle l'équation, et est-elle la seule ? */
function verifierSolution(eq: string, x: number): string[] {
  const m = membres(eq);
  if (!m) return [`équation illisible : ${eq}`];
  const ls = lettreDe(eq);
  if (ls.length !== 1) return [`une inconnue attendue dans ${eq}`];
  const L = ls[0];
  const f = (v: number) => evaluer(m[0], L, v) - evaluer(m[1], L, v);
  const p: string[] = [];
  if (!egal(f(x), 0)) p.push(`${x} ne vérifie pas ${eq} (${evaluer(m[0], L, x)} ≠ ${evaluer(m[1], L, x)})`);
  if (egal(f(x + 1), f(x))) p.push(`${eq} n'a pas une solution unique`);
  return p;
}

/** La seule formule $…$ du texte qui est une équation (un « = » et une lettre). */
function equationDuTexte(t: string): string | null {
  const eqs = [...t.matchAll(/\$([^$]*=[^$]*)\$/g)].map((m) => m[1]).filter((e) => {
    try {
      return lettreDe(e).length === 1 && !/^\s*[a-z]\s*=\s*-?[\d{},]+\s*$/.test(e);
    } catch {
      return false;
    }
  });
  return eqs.length === 1 ? eqs[0] : null;
}

const valeurAttendue = (q: Q) => num(String(q.expected[0]).match(/^[−-]?[\d{},]+/)?.[0] ?? "NaN");
const uniteAttendue = (q: Q) => String(q.expected[0]).replace(/^[−-]?[\d{},]+/, "").trim();
const sing = (u: string) => u.replace(/s$/, "");
function verifierUnite(q: Q, u: string): string[] {
  return sing(uniteAttendue(q)) === sing(u) ? [] : [`unité de la réponse « ${uniteAttendue(q)} » au lieu de « ${u} »`];
}
/** Toutes les réponses acceptées disent le même nombre. */
function memesValeurs(q: Q, v: number): string[] {
  return q.expected.filter((e) => !egal(num(e.match(/^[−-]?[\d{},]+/)?.[0] ?? "NaN"), v)).map((e) => `réponse acceptée « ${e} » ≠ ${v}`);
}

// ─── reconnaître ────────────────────────────────────────────────────────────

const estEquation = (c: string) => {
  try {
    return c.includes("=") && lettreDe(c).length >= 1;
  } catch {
    return false;
  }
};

function corrigerReconnaitre(q: Q): string[] {
  const t = q.text;
  let m: RegExpMatchArray | null;
  if (/quelle est l’inconnue|Quelle lettre/i.test(t)) {
    const eq = equationDuTexte(t);
    if (!eq) return ["équation illisible"];
    const L = lettreDe(eq)[0];
    return qcmUnique(q, (c) => c === `$${L}$`);
  }
  if ((m = t.match(/(premier|second) membre/))) {
    const eq = equationDuTexte(t);
    const mb = eq && membres(eq);
    if (!mb) return ["équation illisible"];
    const bon = m[1] === "premier" ? mb[0] : mb[1];
    return qcmUnique(q, (c) => c.replace(/\$/g, "").trim() === bon);
  }
  if (/coefficient|multiplie l’inconnue|l’inconnue est-elle multipliée/.test(t)) {
    const eq = equationDuTexte(t);
    const mb = eq && membres(eq);
    if (!mb) return ["équation illisible"];
    const L = lettreDe(eq!)[0];
    const cote = mb.find((x) => x.includes(L))!;
    const coef = evaluer(cote, L, 1) - evaluer(cote, L, 0);
    return qcmUnique(q, (c) => egal(num(c.replace(/\$/g, "")), coef));
  }
  if (/est-elle une équation|est-ce une équation|est une équation\. A-t|que .+ est une équation \?/.test(t)) {
    const ecr = t.match(/\$([^$]+)\$/)?.[1];
    if (!ecr) return ["écriture illisible"];
    return qcmUnique(q, (c) => c === (estEquation(ecr) ? "oui" : "non"));
  }
  // « Laquelle de ces écritures est une équation ? »
  return qcmUnique(q, (c) => estEquation(c));
}

// ─── traduire ───────────────────────────────────────────────────────────────

const MULT: Record<string, number> = { double: 2, triple: 3, quadruple: 4 };

/** Une expression en français → JavaScript (en la lettre L). */
function lireExpr(s0: string, L: string): string {
  const s = s0.trim().replace(/^,\s*|,\s*$/g, "").trim();
  let m: RegExpMatchArray | null;
  if (s === `$${L}$` || s === "ce nombre") return L;
  if (/^\d+$/.test(s)) return s;
  if ((m = s.match(/^son (double|triple|quadruple)$/))) return `${MULT[m[1]]}*${L}`;
  // Les « augmenté de / diminué de » s'appliquent à ce qui précède (le dernier, le plus extérieur).
  if ((m = s.match(/^(.+\S),? (augmenté de|plus|diminué de|moins) (\S+)$/))) {
    const o = /augmenté|plus/.test(m[2]) ? "+" : "-";
    return `(${lireExpr(m[1], L)})${o}(${lireExpr(m[3], L)})`;
  }
  if ((m = s.match(/^le (double|triple|quadruple) de (.+)$/))) return `${MULT[m[1]]}*(${lireExpr(m[2], L)})`;
  if ((m = s.match(/^(\d+) fois (.+)$/))) return `${m[1]}*(${lireExpr(m[2], L)})`;
  if ((m = s.match(/^le produit de (\d+) par (.+)$/))) return `${m[1]}*(${lireExpr(m[2], L)})`;
  if ((m = s.match(/^le produit de (.+) par (\d+)$/))) return `(${lireExpr(m[1], L)})*${m[2]}`;
  if ((m = s.match(/^la somme de (.+?) et de (.+)$/))) return `(${lireExpr(m[1], L)})+(${lireExpr(m[2], L)})`;
  if ((m = s.match(/^la différence entre (.+?) et (.+)$/))) return `(${lireExpr(m[1], L)})-(${lireExpr(m[2], L)})`;
  if ((m = s.match(/^la moitié de (.+)$/))) return `(${lireExpr(m[1], L)})/2`;
  throw new Error(`expression française illisible : « ${s} »`);
}

/** La phrase entière → [membre de gauche, membre de droite]. */
function traduire(ph: string): { L: string; g: string; d: string } {
  const L = ph.match(/\$([a-z])\$/)?.[1];
  if (!L) throw new Error("inconnue illisible");
  let m: RegExpMatchArray | null;
  if ((m = ph.match(/^un sac contient \$\w\$ billes ; on en ajoute (\d+) et on en compte alors (\d+)$/))) return { L, g: `${L}+${m[1]}`, d: m[2] };
  if ((m = ph.match(/^un triangle équilatéral de côté \$\w\$ cm a un périmètre de (\d+) cm$/))) return { L, g: `3*${L}`, d: m[1] };
  if ((m = ph.match(/^\S+ a \$\w\$ ans ; dans (\d+) ans, (?:il|elle) aura (\d+) ans$/))) return { L, g: `${L}+${m[1]}`, d: m[2] };
  if ((m = ph.match(/^\S+ achète (\d+) cahiers à \$\w\$ € l’un et un stylo à (\d+) € ; (?:il|elle) paie (\d+) €$/))) return { L, g: `${m[1]}*${L}+${m[2]}`, d: m[3] };
  if ((m = ph.match(/^un rectangle de largeur \$\w\$ cm et de longueur (\d+) cm a un périmètre de (\d+) cm$/))) return { L, g: `2*(${L}+${m[1]})`, d: m[2] };
  if ((m = ph.match(/^un club demande (\d+) € d’inscription puis (\d+) € par séance ; pour \$\w\$ séances, on paie (\d+) €$/))) return { L, g: `${m[2]}*${L}+${m[1]}`, d: m[3] };
  if ((m = ph.match(/^la somme de trois nombres entiers consécutifs, dont le plus petit est \$\w\$, (?:vaut|est égale à|donne|fait) (\d+)$/))) return { L, g: `${L}+(${L}+1)+(${L}+2)`, d: m[1] };
  m = ph.match(/^(.+?) (vaut|est égale? à|est égal au|donne|fait) (.+)$/);
  if (!m) throw new Error(`verbe introuvable : ${ph}`);
  const droite = m[2] === "est égal au" ? `le ${m[3]}` : m[3];
  return { L, g: lireExpr(m[1], L), d: lireExpr(droite, L) };
}

/** Deux équations égales membre à membre (dans un sens ou dans l'autre). */
function memeEquation(eq: string, T: { L: string; g: string; d: string }): boolean {
  const mb = membres(eq);
  if (!mb) return false;
  const f = (js: string, x: number) => Function("v", `return ${js.replace(new RegExp(T.L, "g"), "(v)")};`)(x) as number;
  const xs = [1.5, -2, 3, 7.25];
  try {
    const egaux = (a: string, b: string) => xs.every((x) => egal(evaluer(a, T.L, x), f(b, x)));
    return (egaux(mb[0], T.g) && egaux(mb[1], T.d)) || (egaux(mb[0], T.d) && egaux(mb[1], T.g));
  } catch {
    return false;
  }
}

function corrigerTraduire(q: Q): string[] {
  const ph = q.text.match(/« (.+?) »/)?.[1] ?? q.text.match(/^(.+?)\. (?:Quelle|Laquelle|Choisis|Écris|Mets)/)?.[1];
  if (!ph) return ["phrase illisible"];
  let T: { L: string; g: string; d: string };
  try {
    T = traduire(ph.charAt(0).toLowerCase() + ph.slice(1));
  } catch (e) {
    return [(e as Error).message];
  }
  if (q.format === "qcm") return qcmUnique(q, (c) => memeEquation(c, T));
  return memeEquation(q.expected[0], T) ? [] : [`« ${q.expected[0]} » ne traduit pas « ${ph} »`];
}

// ─── résoudre ───────────────────────────────────────────────────────────────

/** Les petites histoires de `situationSimple` : l'équation donnée doit être la bonne. */
function histoire(t: string, x: number): string[] {
  let m: RegExpMatchArray | null;
  const p: string[] = [];
  const voir = (ok: boolean, quoi: string) => (ok ? [] : [`l'équation ne traduit pas l'histoire (${quoi})`]);
  if ((m = t.match(/a monté de (\d+) °C pour atteindre \$(-?\d+)\$ °C/))) p.push(...voir(x + num(m[1]) === num(m[2]), "température"));
  if ((m = t.match(/Après un achat de (\d+) €, il affiche \$(-?\d+)\$ €/))) p.push(...voir(x - num(m[1]) === num(m[2]), "compte"), ...(x < 0 ? ["solde de départ négatif"] : []));
  if ((m = t.match(/(\d+) boîtes en contiennent (\d+) au total/))) p.push(...voir(num(m[1]) * x === num(m[2]), "crayons"));
  if ((m = t.match(/en perd (\d+) et termine avec \$(-?\d+)\$ points/))) p.push(...voir(x - num(m[1]) === num(m[2]), "points"));
  if ((m = t.match(/et une masse de (\d+) g ; de l’autre, (\d+) g/))) p.push(...voir(x + num(m[1]) === num(m[2]), "balance"));
  if ((m = t.match(/monte de (\d+) étages : il arrive à l’étage (-?\d+)/))) p.push(...voir(x + num(m[1]) === num(m[2]), "ascenseur"));
  if ((m = t.match(/(\d+) amis se partagent équitablement une addition de (\d+) €/))) p.push(...voir(num(m[1]) * x === num(m[2]), "addition"));
  const u = /sur le compte|paie chacun/.test(t) ? "€" : /masse du paquet/.test(t) ? "g" : "";
  return u ? [...p, `__unite:${u}`] : p;
}

function corrigerResoudre(q: Q): string[] {
  const eq = equationDuTexte(q.text);
  if (!eq) return ["équation illisible dans le texte"];
  const x = valeurAttendue(q);
  const h = histoire(q.text, x);
  const u = h.find((s) => s.startsWith("__unite:"))?.slice(8) ?? "";
  return [...verifierSolution(eq, x), ...memesValeurs(q, x), ...h.filter((s) => !s.startsWith("__")), ...verifierUnite(q, u)];
}

// ─── vérifier une solution ──────────────────────────────────────────────────

function corrigerVerifier(q: Q): string[] {
  const t = q.text;
  const eq = equationDuTexte(t);
  if (!eq) return ["équation illisible"];
  const mb = membres(eq)!;
  const L = lettreDe(eq)[0];
  const vraie = (k: number) => egal(evaluer(mb[0], L, k), evaluer(mb[1], L, k));
  if ((q.choices ?? []).every((c) => /^\$[−-]?[\d{},]+\$$/.test(c))) return qcmUnique(q, (c) => vraie(num(c.replace(/\$/g, ""))));
  const k = num(t.match(new RegExp(`\\$${L} = ([−-]?[\\d{},]+)\\$`))?.[1] ?? t.match(/\$([−-]?[\d{},]+)\$/)?.[1] ?? "NaN");
  if (!Number.isFinite(k)) return ["valeur proposée illisible"];
  return qcmUnique(q, (c) => c === (vraie(k) ? "oui" : "non"));
}

// ─── défis ──────────────────────────────────────────────────────────────────

function corrigerDeuxMembres(q: Q): string[] {
  if (q.format !== "qcm") return corrigerResoudre(q);
  const m = q.text.match(/\$([a-z]) = ([−-]?[\d{},]+)\$|le nombre \$([−-]?[\d{},]+)\$/);
  if (!m) return ["solution visée illisible"];
  const s = num(m[2] ?? m[3]);
  return qcmUnique(q, (c) => {
    try {
      return verifierSolution(c.replace(/\$/g, ""), s).length === 0;
    } catch {
      return false;
    }
  });
}

/** « Quel calcul montre que k est solution ? » : le calcul doit être JUSTE, remplacer CE nombre, et donner l'égalité. */
function corrigerJustifier(q: Q): string[] {
  const eq = equationDuTexte(q.text);
  const k = num(q.text.match(/\$(?:[a-z] = )?([−-]?[\d{},]+)\$/)?.[1] ?? "NaN");
  if (!eq || !Number.isFinite(k)) return ["équation ou nombre illisibles"];
  const mb = membres(eq)!;
  const L = lettreDe(eq)[0];
  const G = evaluer(mb[0], L, k), D = evaluer(mb[1], L, k);
  if (!egal(G, D)) return [`${k} n'est pas solution de ${eq}`];
  const prouve = (c: string): boolean => {
    const calculs = [...c.matchAll(/\$([^$=]+)=([^$=]+)\$/g)];
    if (!calculs.length) return false;
    return calculs.every((x) => {
      try {
        const v = evaluer(x[1], null, 0);
        return egal(v, evaluer(x[2], null, 0)) && egal(v, G);
      } catch {
        return false;
      }
    });
  };
  return qcmUnique(q, prouve);
}

/** Le calcul fautif de l'élève : on reconnaît l'étape, et on vérifie qu'elle est bien fausse. */
function corrigerErreur(q: Q): string[] {
  const c = q.text.match(/« (.+?) »/)?.[1] ?? "";
  let m: RegExpMatchArray | null;
  let diag: RegExp | null = null;
  let p: string[] = [];
  const faux = (eq: string, x: number) => (verifierSolution(eq, x).length ? [] : [`le calcul de l'élève est juste (${x} vérifie ${eq})`]);
  if ((m = c.match(/^\$(\d+)([a-z]) = (\d+)\$, donc \$\2 = \3 - \1 = (-?\d+)\$$/))) {
    diag = new RegExp(`a soustrait ${m[1]} au lieu de diviser par ${m[1]}`);
    p = faux(`${m[1]}${m[2]} = ${m[3]}`, num(m[4]));
  } else if ((m = c.match(/^\$([a-z]) \+ (\d+) = (\d+)\$, donc \$\1 = \3 \+ \2 = (\d+)\$$/))) {
    diag = new RegExp(`a ajouté ${m[2]} au lieu de soustraire ${m[2]}`);
    p = faux(`${m[1]} + ${m[2]} = ${m[3]}`, num(m[4]));
  } else if ((m = c.match(/^\$(\d+)\(([a-z]) \+ (\d+)\) = (\d+)\$, donc \$\1\2 \+ \3 = \4\$$/))) {
    diag = new RegExp(`n’a multiplié que \\$${m[2]}\\$ par ${m[1]}, pas le ${m[3]}`);
    if (Number(m[1]) * Number(m[3]) === Number(m[3])) p.push("la parenthèse développée à moitié donnerait le même résultat");
  } else if ((m = c.match(/^\$(\d+)([a-z]) \+ (\d+) = (\d*)\2 \+ (\d+)\$, donc \$(\d+)\2 = (-?\d+)\$$/))) {
    const cc = m[4] === "" ? 1 : Number(m[4]);
    diag = new RegExp(`a ajouté \\$${cc === 1 ? "" : cc}${m[2]}\\$ au lieu de le soustraire`);
    if (Number(m[6]) !== Number(m[1]) + cc) p.push("l'étape fautive n'est pas « ajouter au lieu de soustraire »");
  } else if ((m = c.match(/^\$\\frac\{([a-z])\}\{(\d+)\} = (\d+)\$, donc \$\1 = \3 \\div \2\$$/))) {
    diag = new RegExp(`a divisé par ${m[2]} au lieu de multiplier par ${m[2]}`);
    p = faux(`\\frac{${m[1]}}{${m[2]}} = ${m[3]}`, num(m[3]) / num(m[2]));
  } else if ((m = c.match(/^\$(\d+) - ([a-z]) = (-?\d+)\$, donc \$\2 = \3 - \1 = (-?\d+)\$$/))) {
    diag = /a oublié le signe « − » devant/;
    p = faux(`${m[1]} - ${m[2]} = ${m[3]}`, num(m[4]));
  }
  if (!diag) return [`calcul de l'élève non reconnu : ${c}`];
  // Frédéric (08/10) : chaque piège doit être une erreur POSSIBLE sur l'équation tirée.
  const eqEleve = c.split(", donc")[0];
  const nbsEq = new Set(eqEleve.replace(/\\frac\{([a-z])\}\{(\d+)\}/, "$1 $2").match(/\d+/g) ?? []);
  for (const ch of q.choices ?? []) {
    for (const n of ch.replace(/\$[^$]*\$/g, " ").match(/\d+/g) ?? []) if (!nbsEq.has(n)) p.push(`piège « ${ch} » : ${n} n'est pas dans l'équation`);
    if (/parenthèse/.test(ch) && !eqEleve.includes("(")) p.push(`piège « ${ch} » : pas de parenthèse dans l'équation`);
    if (/signe « − » devant/.test(ch) && !/- [a-z]/.test(eqEleve)) p.push(`piège « ${ch} » : pas de « − ${"x"} » dans l'équation`);
    for (const t of ch.match(/\$(\d*[a-z])\$/g) ?? []) if (!eqEleve.includes(t.slice(1, -1))) p.push(`piège « ${ch} » : ${t} n'est pas dans l'équation`);
  }
  return [...p, ...qcmUnique(q, (x) => diag!.test(x))];
}

// ─── problèmes ──────────────────────────────────────────────────────────────

type Modele = { f: (x: number) => number; u: string; reponse?: (x: number) => number; entier?: boolean };
const N = "(\\d+(?:,\\d+)?)";
const K: Record<string, number> = { "le double": 2, "le triple": 3, "le quadruple": 4, "cinq fois": 5 };

/** Chaque situation, remise en équation à partir du texte : f(x) = membre de gauche − membre de droite. */
const SITUATIONS: [RegExp, (m: number[], t: string, brut: RegExpMatchArray) => Modele][] = [
  [/pense à un nombre\. \S+ le multiplie par (\d+), puis ajoute (\d+) : \S+ obtient (\d+)/, ([a, b, c]) => ({ f: (x) => a * x + b - c, u: "" })],
  [/Si l’on ajoute (\d+) au produit d’un nombre par (\d+), on obtient (\d+)/, ([b, a, c]) => ({ f: (x) => a * x + b - c, u: "" })],
  [/choisit un nombre, le multiplie par (\d+) et ajoute (\d+) au résultat\. \S+ trouve (\d+)/, ([a, b, c]) => ({ f: (x) => a * x + b - c, u: "" })],
  [/le multiplie par (\d+), puis retire (\d+) : \S+ obtient (\d+)/, ([a, b, c]) => ({ f: (x) => a * x - b - c, u: "" })],
  [/Si l’on retranche (\d+) au produit d’un nombre par (\d+), on trouve (\d+)/, ([b, a, c]) => ({ f: (x) => a * x - b - c, u: "" })],
  [/facture (\d+) € de prise en charge, puis (\d+) € par kilomètre\. Une course a coûté (\d+) €/, ([b, a, c]) => ({ f: (x) => a * x + b - c, u: "km" })],
  [/a coûté (\d+) €\. Le chauffeur compte (\d+) € de prise en charge et (\d+) € par kilomètre/, ([c, b, a]) => ({ f: (x) => a * x + b - c, u: "km" })],
  [/carte annuelle à (\d+) €, puis (\d+) € par .+?\. \S+ a dépensé (\d+) €/, ([F, pu, T]) => ({ f: (x) => F + pu * x - T, u: "", entier: true })],
  [/a payé (\d+) € en tout : (\d+) € pour la carte annuelle, puis (\d+) € par/, ([T, F, pu]) => ({ f: (x) => F + pu * x - T, u: "", entier: true })],
  [/a déjà (\d+) € dans sa tirelire\. Chaque semaine, \S+ y ajoute (\d+) €\. .+? aura-t-\S+ (\d+) €/, ([E, e, T]) => ({ f: (x) => E + e * x - T, u: "semaines", entier: true })],
  [/un objet à (\d+) €, \S+ part de (\d+) € d’économies et met (\d+) € de côté chaque semaine/, ([T, E, e]) => ({ f: (x) => E + e * x - T, u: "semaines", entier: true })],
  [/contient déjà (\d+) L\. Pendant un orage, il se remplit de (\d+) L par minute\. .+? contiendra-t-il (\d+) L/, ([d, r, T]) => ({ f: (x) => d + r * x - T, u: "minutes" })],
  [/une cuve qui contenait (\d+) L reçoit (\d+) L d’eau par minute\. Elle contient maintenant (\d+) L/, ([d, r, T]) => ({ f: (x) => d + r * x - T, u: "minutes" })],
  [/a des billes\. \S+ en a (le double|le triple|le quadruple)\. .+? en ont (\d+)/, (_m, _t, b) => ({ f: (x) => x + K[b[1]] * x - Number(b[2]), u: "", entier: true })],
  [/possède (le double|le triple|le quadruple) du nombre de cartes .+?\. Ensemble, \S+ ont (\d+) cartes/, (_m, _t, b) => ({ f: (x) => x + K[b[1]] * x - Number(b[2]), u: "", entier: true })],
  [/a déjà parcouru (\d+) km\. Il marche ensuite à (\d+) km\/h\. .+? parcouru (\d+) km en tout/, ([d, v, T]) => ({ f: (x) => d + v * x - T, u: "heures" })],
  [/Sur un sentier de (\d+) km, une randonneuse a déjà fait (\d+) km\. Elle avance à (\d+) km\/h/, ([T, d, v]) => ({ f: (x) => d + v * x - T, u: "heures" })],
  [/mesure (\d+) cm au repos\. Chaque masse de 50 g accrochée l’allonge de (\d+) cm\. .+? il mesure (\d+) cm/, ([L0, a, T]) => ({ f: (x) => L0 + a * x - T, u: "", entier: true })],
  [/un ressort de (\d+) cm s’allonge de (\d+) cm par masse de 50 g\. Il mesure maintenant (\d+) cm/, ([L0, a, T]) => ({ f: (x) => L0 + a * x - T, u: "", entier: true })],
  [/Un plant de tomate mesure (\d+) cm\. Il grandit de (\d+) cm par semaine\. .+? mesurera-t-il (\d+) cm/, ([h, g, T]) => ({ f: (x) => h + g * x - T, u: "semaines" })],
  [/un tournesol de (\d+) cm pousse de (\d+) cm chaque semaine\. .+? atteindra-t-il (\d+) cm/, ([h, g, T]) => ({ f: (x) => h + g * x - T, u: "semaines" })],
  [/(\d+) € de frais de réservation, puis (\d+) € par heure\. La note s’élève à (\d+) €/, ([F, pu, T]) => ({ f: (x) => F + pu * x - T, u: "heures" })],
  [/compte (\d+) € de réservation et (\d+) € de l’heure\. Une chorale a payé (\d+) €/, ([F, pu, T]) => ({ f: (x) => F + pu * x - T, u: "heures" })],
  [/coûte (\d+) € par mois, plus (\d+) € par Go supplémentaire\. Ce mois-ci, la facture est de (\d+) €/, ([F, pu, T]) => ({ f: (x) => F + pu * x - T, u: "Go" })],
  [/s’élève à (\d+) € : (\d+) € d’abonnement et (\d+) € par Go/, ([T, F, pu]) => ({ f: (x) => F + pu * x - T, u: "Go" })],
  [/achète des mangues à (\d+) € pièce et un ananas à (\d+) €\. \S+ paie (\d+) €/, ([pu, an, T]) => ({ f: (x) => pu * x + an - T, u: "", entier: true })],
  // P4
  [/a (\d+) ans de plus que (?:son|sa) \S+\. À \S+ deux, \S+ ont (\d+) ans/, ([a, S]) => ({ f: (x) => x + x + a - S, u: "ans" })],
  [/La somme des âges .+? est (\d+) ans\. .+? est l’aînée?, de (\d+) ans/, ([S, a]) => ({ f: (x) => x + x + a - S, u: "ans" })],
  [/a (le triple de|le quadruple de|cinq fois) l’âge de .+?\. À eux deux, ils ont (\d+) ans/, (_m, _t, b) => ({ f: (x) => x + K[b[1].replace(/ de$/, "")] * x - Number(b[2]), u: "ans" })],
  [/La somme des âges .+? vaut (\d+) ans ; l’âge de l’adulte est (le triple de|le quadruple de|cinq fois) celui de l’enfant/, (_m, _t, b) => ({ f: (x) => x + K[b[2].replace(/ de$/, "")] * x - Number(b[1]), u: "ans" })],
  [/dépasse sa largeur de (\d+) (m|cm)\. Son périmètre est de (\d+) (?:m|cm)/, (_m, _t, b) => ({ f: (x) => 2 * (x + x + Number(b[1])) - Number(b[3]), u: b[2] })],
  [/Le périmètre .+? mesure (\d+) (m|cm), et sa longueur mesure (\d+) (?:m|cm) de plus que sa largeur/, (_m, _t, b) => ({ f: (x) => 2 * (x + x + Number(b[3])) - Number(b[1]), u: b[2] })],
  [/une base de (\d+) cm et un périmètre de (\d+) cm/, ([b, P]) => ({ f: (x) => 2 * x + b - P, u: "cm" })],
  [/un périmètre de (\d+) dm ; sa base mesure (\d+) dm/, ([P, b]) => ({ f: (x) => 2 * x + b - P, u: "dm" })],
  [/se partagent (?:une cagnotte de|un gain de|une prime de) (\d+) €\. (\S+) reçoit (\d+) € de plus .+?\. Combien reçoit (\S+) \?/, (_m, _t, b) => ({ f: (x) => (b[2] === b[4] ? NaN : x + x + Number(b[3]) - Number(b[1])), u: "€" })],
  [/On partage (\d+) € entre .+?, de sorte que (\S+) ait (\d+) € de plus\. Quelle est la part (?:de |d’)(\S+) \?/, (_m, _t, b) => ({ f: (x) => (b[2] === b[4] ? NaN : x + x + Number(b[3]) - Number(b[1])), u: "€" })],
  [/(?:La somme de trois nombres entiers consécutifs est|Trois entiers qui se suivent ont pour somme) (\d+)\. Quel est le (plus grand|plus petit)/, (_m, _t, b) => ({ f: (x) => x + x + 1 + x + 2 - Number(b[1]), u: "", reponse: (x) => (b[2] === "plus grand" ? x + 2 : x) })],
  [new RegExp(`achète (\\d+) .+? et .+? à ${N} €\\. \\S+ paie ${N} €`), ([n, t0, T]) => ({ f: (x) => n * x + t0 - T, u: "€" })],
  [new RegExp(`Pour (\\d+) .+? et .+? à ${N} €, \\S+ a payé ${N} €`), ([n, t0, T]) => ({ f: (x) => n * x + t0 - T, u: "€" })],
  [/compte (\d+) choristes\. Il y a (\d+) garçons de moins que de filles/, ([T, a]) => ({ f: (x) => x + x - a - T, u: "", entier: true })],
  [/orchestre de (\d+) musiciens, les filles sont (\d+) de plus que les garçons/, ([T, a]) => ({ f: (x) => x + x - a - T, u: "", entier: true })],
  [/ajoute (\d+) à un nombre, puis multiplie le résultat par (\d+)\. \S+ obtient (\d+)/, ([b, a, c]) => ({ f: (x) => a * (x + b) - c, u: "" })],
  [/Si l’on multiplie par (\d+) la somme d’un nombre et de (\d+), on obtient (\d+)/, ([a, b, c]) => ({ f: (x) => a * (x + b) - c, u: "" })],
  [/On partage (\d+) \S+ entre trois enfants\. Le deuxième en reçoit le double du premier, et le troisième (\d+) de plus que le premier/, ([S, d]) => ({ f: (x) => x + 2 * x + x + d - S, u: "", entier: true })],
  [/le double de la première ; la troisième, (\d+) de moins que la première\. En tout : (\d+) bouchons/, ([d, T]) => ({ f: (x) => x + 2 * x + x - d - T, u: "", entier: true })],
  [/court (\d+) km de plus que lundi ; mercredi, le double de lundi\. En trois jours, \S+ a couru (\d+) km/, ([d, T]) => ({ f: (x) => x + x + d + 2 * x - T, u: "km" })],
  // P5
  [/sans carte, (\d+) € l’entrée ; avec une carte à (\d+) €, (\d+) € l’entrée/, ([pu, F, q2]) => ({ f: (x) => pu * x - (F + q2 * x), u: "", entier: true })],
  [/on paie (\d+) € l’entrée, ou bien (\d+) € l’entrée après avoir acheté une carte à (\d+) €/, ([pu, q2, F]) => ({ f: (x) => pu * x - (F + q2 * x), u: "", entier: true })],
  [/le loueur A demande (\d+) € puis (\d+) € par (heure|jour) ; le loueur B demande (\d+) € puis (\d+) € par/, (_m, _t, b) => ({ f: (x) => +b[1] + +b[2] * x - (+b[4] + +b[5] * x), u: `${b[3]}s` })],
  [/formule A à (\d+) € plus (\d+) € par (heure|jour), formule B à (\d+) € plus (\d+) € par/, (_m, _t, b) => ({ f: (x) => +b[1] + +b[2] * x - (+b[4] + +b[5] * x), u: `${b[3]}s` })],
  [/a (\d+) ans et (?:son|sa) \S+ a? ?(\d+) ans\. Dans combien d’années .+? (le double|le triple)/, (_m, _t, b) => ({ f: (x) => +b[2] + x - K[b[3]] * (+b[1] + x), u: "ans" })],
  [/(\S+) a (\d+) € et économise (\d+) € par semaine\. (\S+) a (\d+) € et économise (\d+) € par semaine/, (_m, _t, b) => ({ f: (x) => +b[2] + +b[3] * x - (+b[5] + +b[6] * x), u: "semaines" })],
  [/part de (\d+) € et ajoute (\d+) € chaque semaine ; \S+ part de (\d+) € et ajoute (\d+) € chaque semaine/, ([E2, e2, E1, e1]) => ({ f: (x) => E1 + e1 * x - (E2 + e2 * x), u: "semaines" })],
  [/contient (\d+) L et se remplit de (\d+) L par minute\. Une autre contient (\d+) L et se vide de (\d+) L par minute/, ([V1, r1, V2, r2]) => ({ f: (x) => V1 + r1 * x - (V2 - r2 * x), u: "minutes" })],
  [/Un bassin de (\d+) L se vide de (\d+) L par minute pendant qu’un autre, qui contient (\d+) L, se remplit de (\d+) L par minute/, ([V2, r2, V1, r1]) => ({ f: (x) => V1 + r1 * x - (V2 - r2 * x), u: "minutes" })],
  [/Une bougie mesure (\d+) cm et raccourcit de (\d+) cm par heure\. Une autre mesure (\d+) cm et raccourcit de (\d+) cm par heure/, ([h1, a, h2, b]) => ({ f: (x) => h1 - a * x - (h2 - b * x), u: "heures" })],
  [/l’une de (\d+) cm, qui perd (\d+) cm par heure, l’autre de (\d+) cm, qui perd (\d+) cm par heure/, ([h1, a, h2, b]) => ({ f: (x) => h1 - a * x - (h2 - b * x), u: "heures" })],
  [/mesure (\d+) cm et pousse de (\d+) cm par jour, l’autre mesure (\d+) cm et pousse de (\d+) cm par jour/, ([h1, a, h2, b]) => ({ f: (x) => h1 + a * x - (h2 + b * x), u: "jours" })],
  [/fait (\d+) cm et grandit de (\d+) cm par jour ; .+? fait (\d+) cm et grandit de (\d+) cm par jour/, ([h1, a, h2, b]) => ({ f: (x) => h1 + a * x - (h2 + b * x), u: "jours" })],
  [/multiplie un nombre par (\d+) et que j’ajoute (\d+), j’obtiens le même résultat qu’en le multipliant par (\d+) et en ajoutant (\d+)/, ([a, b, c, d]) => ({ f: (x) => a * x + b - (c * x + d), u: "" })],
  [/(\d+) fois un nombre plus (\d+) donne autant que (\d+) fois ce nombre plus (\d+)/, ([a, b, c, d]) => ({ f: (x) => a * x + b - (c * x + d), u: "" })],
  [/Forfait A : (\d+) € par mois et (\d+) € par Go consommé\. Forfait B : (\d+) € par mois et (\d+) € par Go/, ([fa, pa, fb, pb]) => ({ f: (x) => fa + pa * x - (fb + pb * x), u: "Go" })],
  [/(\d+) € par mois plus (\d+) € par Go, ou (\d+) € par mois plus (\d+) € par Go/, ([fa, pa, fb, pb]) => ({ f: (x) => fa + pa * x - (fb + pb * x), u: "Go" })],
  [/vend les mangues (\d+) € pièce\. Son voisin propose un panier à (\d+) €, puis (\d+) € par mangue/, ([pu, F, q2]) => ({ f: (x) => pu * x - (F + q2 * x), u: "", entier: true })],
  [/mangues à (\d+) € pièce, ou panier à (\d+) € puis (\d+) € la mangue/, ([pu, F, q2]) => ({ f: (x) => pu * x - (F + q2 * x), u: "", entier: true })],
  [/part avec (\d+) km d’avance et roule à (\d+) km\/h\. \S+ part derrière lui à (\d+) km\/h/, ([d, v1, v2]) => ({ f: (x) => d + v1 * x - v2 * x, u: "heures" })],
  [/(\S+) a (\d+) km de retard sur (\S+)\. \3 roule à (\d+) km\/h et \1 à (\d+) km\/h/, (_m, _t, b) => ({ f: (x) => +b[2] + +b[4] * x - +b[5] * x, u: "heures" })],
  [/carré a pour côté \$x \+ (\d+)\$ cm et un triangle équilatéral a pour côté \$x \+ (\d+)\$ cm/, ([a, b]) => ({ f: (x) => 4 * (x + a) - 3 * (x + b), u: "" })],
  [/Le côté d’un carré mesure \$x \+ (\d+)\$ cm ; celui d’un triangle équilatéral, \$x \+ (\d+)\$ cm/, ([a, b]) => ({ f: (x) => 4 * (x + a) - 3 * (x + b), u: "" })],
  [/compte (\d+) habitants et en gagne (\d+) par an\. Un autre compte (\d+) habitants et en perd (\d+) par an/, ([P1, g, P2, pe]) => ({ f: (x) => P1 + g * x - (P2 - pe * x), u: "ans" })],
  [/la première a (\d+) habitants et grandit de (\d+) habitants par an ; la seconde a (\d+) habitants et en perd (\d+)/, ([P1, g, P2, pe]) => ({ f: (x) => P1 + g * x - (P2 - pe * x), u: "ans" })],
];

function corrigerProbleme(q: Q): string[] {
  const t = q.text;
  const trouvees = SITUATIONS.filter(([re]) => re.test(t));
  if (trouvees.length !== 1) return [`situation ${trouvees.length ? "ambiguë" : "inconnue du correcteur"} : ${t.slice(0, 80)}`];
  const [re, modele] = trouvees[0];
  const brut = t.match(re)!;
  const M = modele(brut.slice(1).filter((x) => x != null && /^\d+(?:,\d+)?$/.test(x)).map(num), t, brut);
  const v = valeurAttendue(q);
  // On REMPLACE la réponse dans l'équation tirée du texte.
  let x = v;
  if (M.reponse) {
    const cands = Array.from({ length: 400 }, (_, i) => i - 50).filter((c) => egal(M.reponse!(c), v));
    x = cands.length === 1 ? cands[0] : NaN;
  }
  const p: string[] = [];
  if (!egal(M.f(x), 0)) p.push(`la réponse ${v} ne vérifie pas l'équation de l'énoncé (écart ${M.f(x)})`);
  if (egal(M.f(x + 1), M.f(x))) p.push("l'équation de l'énoncé n'a pas une solution unique");
  if (!(v > 0)) p.push(`${v} : réponse impossible pour la situation`);
  if (M.entier && !Number.isInteger(v)) p.push(`${v} : il faut un nombre entier`);
  if (Math.abs(v * 100 - Math.round(v * 100)) > 1e-9) p.push(`${v} : plus de deux décimales`);
  return [...p, ...memesValeurs(q, v), ...verifierUnite(q, M.u)];
}

const RESOUDRE = corrigerResoudre;
export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  equation_reconnaitre_tpl_1: corrigerReconnaitre,
  equation_reconnaitre_tpl_2: corrigerReconnaitre,
  equation_reconnaitre_tpl_3: corrigerReconnaitre,
  equation_reconnaitre_tpl_4: corrigerReconnaitre,
  equation_traduire_tpl_1: corrigerTraduire,
  equation_traduire_tpl_2: corrigerTraduire,
  equation_traduire_tpl_3: corrigerTraduire,
  equation_traduire_tpl_4: corrigerTraduire,
  equation_resoudre_simple_tpl_1: RESOUDRE,
  equation_resoudre_simple_tpl_2: RESOUDRE,
  equation_resoudre_simple_tpl_3: RESOUDRE,
  equation_resoudre_simple_tpl_4: RESOUDRE,
  equation_resoudre_simple_tpl_5: RESOUDRE,
  equation_resoudre_reduction_tpl_1: RESOUDRE,
  equation_resoudre_reduction_tpl_2: RESOUDRE,
  equation_resoudre_reduction_tpl_3: RESOUDRE,
  equation_resoudre_reduction_tpl_4: RESOUDRE,
  equation_resoudre_reduction_tpl_5: RESOUDRE,
  equation_resoudre_litteral_distributivite_tpl_1: RESOUDRE,
  equation_resoudre_litteral_distributivite_tpl_2: RESOUDRE,
  equation_resoudre_litteral_distributivite_tpl_3: RESOUDRE,
  equation_resoudre_litteral_distributivite_tpl_4: RESOUDRE,
  equation_resoudre_litteral_distributivite_tpl_5: RESOUDRE,
  equation_verifier_tpl_1: corrigerVerifier,
  equation_verifier_tpl_2: corrigerVerifier,
  equation_verifier_tpl_3: corrigerVerifier,
  equation_verifier_tpl_4: corrigerVerifier,
  equation_probleme_tpl_1: corrigerProbleme,
  equation_probleme_tpl_2: corrigerProbleme,
  equation_probleme_tpl_3: corrigerProbleme,
  equation_probleme_tpl_4: corrigerProbleme,
  equation_probleme_tpl_5: corrigerProbleme,
  equation_probleme_tpl_6: corrigerProbleme,
  equation_open_justifier_1: corrigerJustifier,
  equation_open_erreur_1: corrigerErreur,
  equation_defi_tpl_deux_membres_1: corrigerDeuxMembres,
  equation_defi_tpl_deux_membres_2: corrigerDeuxMembres,
  equation_defi_tpl_verdict_1: corrigerVerifier,
});
