import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/4e/maths/correcteurs/types";
import type { TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import { avecRegleMotsCles, qcmUnique } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egales, evaluer, lettresDe } from "./expressions";

// LES CORRECTEURS DE litteral-demontrer.bank.ts. Ils relisent les expressions du
// texte et des propositions, et les éprouvent sur des valeurs tirées : une
// proposition fausse qui vaudrait la bonne, ou une propriété qui serait fausse pour
// un entier, est trouvée ici. Vide = juste.

type Q = TutorGeneratedQuestionV4;
const n = (s: string) => Number(s.replace(/[−–]/g, "-").replace(",", "."));
const ENTIERS = Array.from({ length: 41 }, (_, i) => i - 20);

/** Valeurs entières de l'expression, sur des entiers de −20 à 20 pour chaque lettre (deux lettres : grille). */
function valeursEntieres(e: string): number[] {
  const ls = lettresDe(e);
  if (ls.length === 0) return [evaluer(e, {})];
  if (ls.length === 1) return ENTIERS.map((v) => evaluer(e, { [ls[0]]: v }));
  const r: number[] = [];
  for (const a of ENTIERS) for (const b of [-7, -2, 0, 1, 3, 8]) r.push(evaluer(e, { [ls[0]]: a, [ls[1]]: b }));
  return r;
}
const toutesMultiples = (e: string, d: number) => valeursEntieres(e).every((v) => Math.abs(v % d) < 1e-9);
const toutesImpaires = (e: string) => valeursEntieres(e).every((v) => Math.abs(Math.abs(v % 2) - 1) < 1e-9);
const distinctes = (q: Q): string[] => {
  const c = q.choices ?? [];
  const p: string[] = [];
  for (let i = 0; i < c.length; i++) for (let j = i + 1; j < c.length; j++) if (egales(c[i], c[j])) p.push(`deux propositions de même valeur : ${c[i]} | ${c[j]}`);
  return p;
};

/* ───── entiers ───── */
function ecriture(q: Q): string[] {
  const pair = /entier pair/.test(q.text);
  if (!pair && !/entier impair/.test(q.text)) return ["pair ou impair illisible"];
  return [...qcmUnique(q, (c) => (pair ? toutesMultiples(c, 2) : toutesImpaires(c))), ...distinctes(q)];
}
function represente(q: Q): string[] {
  const m = q.text.match(/(2[a-z](?: [+−] \d+)?)/);
  if (!m) return ["expression illisible"];
  return qcmUnique(q, (c) => {
    if (/multiple de 3/.test(c)) return toutesMultiples(m[1], 3);
    if (/négatif/.test(c)) return valeursEntieres(m[1]).every((v) => v < 0);
    if (/impair/.test(c)) return toutesImpaires(m[1]);
    if (/pair/.test(c)) return toutesMultiples(m[1], 2);
    return false;
  });
}
function forme2n(q: Q): string[] {
  const f = q.text.match(/2([a-z])( \+ 1)?/);
  const N = q.text.replace(/2[a-z]( \+ 1)?/g, " ").match(/\d+/);
  if (!N || !f) return ["nombre ou forme illisibles"];
  const val = n(N[0]);
  const juste = f[2] ? (val - 1) / 2 : val / 2;
  if (!Number.isInteger(juste)) return [`${val} ne s’écrit pas sous cette forme`];
  return q.expected.every((x) => Number(x.match(/\d+/)?.[0]) === juste) ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}
function suivants(q: Q): string[] {
  const L = q.text.match(/\b([a-z])\b/u)?.[1];
  const v = q.text.match(/2([a-z]) \+ 1/)?.[1];
  if (/trois entiers/i.test(q.text)) {
    return qcmUnique(q, (c) => {
      const t = c.split(", ");
      if (t.length !== 3) return false;
      const l = lettresDe(c)[0];
      return [4, -3, 11].every((x) => evaluer(t[1], { [l]: x }) === evaluer(t[0], { [l]: x }) + 1 && evaluer(t[2], { [l]: x }) === evaluer(t[0], { [l]: x }) + 2);
    });
  }
  if (v) return [...qcmUnique(q, (c) => egales(c, `2${v} + 3`)), ...distinctes(q)];
  const delta = /suivant|après|suit/.test(q.text) ? 1 : /précédent|avant|précède/.test(q.text) ? -1 : 0;
  if (!delta || !L) return ["question illisible"];
  return [...qcmUnique(q, (c) => egales(c, `${L} ${delta > 0 ? "+" : "−"} 1`)), ...distinctes(q)];
}
function reduire(q: Q): string[] {
  const m = q.text.match(/(\(?\d*[a-z]\b(?: [+−] \d+)?\)?(?: \+ \(?\d*[a-z]\b(?: [+−] \d+)?\)?)+)/);
  if (!m) return ["somme illisible"];
  return [...qcmUnique(q, (c) => egales(c, m[1])), ...distinctes(q)];
}
function facteurNombre(q: Q): string[] {
  const m = q.text.match(/(\d+[a-z] \+ \d+)/);
  const d = q.text.match(/(\d+)[a-z] \+/);
  if (!m || !d) return ["expression illisible"];
  const dd = n(d[1]);
  if (!toutesMultiples(m[1], dd)) return [`${m[1]} n’est pas un multiple de ${dd}`];
  return [...qcmUnique(q, (c) => egales(c, m[1])), ...distinctes(q)];
}
function essaiConsecutifs(q: Q): string[] {
  const m = q.text.match(/(\d+), (\d+) et (\d+)/);
  if (!m) return ["liste illisible"];
  const [a, b, c] = [n(m[1]), n(m[2]), n(m[3])];
  if (b !== a + 1 || c !== b + 1) return ["les entiers ne sont pas consécutifs"];
  const juste = /Divise|divisée|quotient|combien de fois/.test(q.text) ? (a + b + c) / 3 : a + b + c;
  return n(q.expected[0]) === juste ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}
function sommeMultiples(q: Q): string[] {
  const m = q.text.match(/(\d+[a-z] \+ \d+[a-z])/);
  if (!m) return ["expression illisible"];
  return [...qcmUnique(q, (c) => egales(c, m[1])), ...distinctes(q)];
}
function ligneSuivante(q: Q): string[] {
  // La dernière écriture de la ligne donnée : celle qu'il faut transformer.
  const l = q.text.match(/(?:écrit : |ligne : |écrit |en être à |en est à |à )([^.]*?)(?:\. |$)/);
  const dernier = l?.[1]?.split(" = ").pop();
  const prem = l?.[1]?.split(" = ")[0];
  if (!dernier || !prem) return ["ligne illisible"];
  const p = qcmUnique(q, (c) => {
    const [g, d] = c.split(" = ");
    return !!d && egales(g, dernier) && egales(d, prem) && /\(/.test(d);
  });
  // La propriété annoncée est vraie : on l'éprouve sur l'expression.
  const dit = q.text.match(/(?:que |: )(la somme|le produit)[^.]*?(multiple de 3|impaire|paire|impair)(?=[.,])/);
  if (!dit) return [...p, "propriété illisible"];
  const prop = dit[2];
  const ok = prop.startsWith("multiple") ? toutesMultiples(dernier, 3) : prop.startsWith("impair") ? toutesImpaires(dernier) : toutesMultiples(dernier, 2);
  return ok ? p : [...p, `${dernier} n’est pas ${prop}`];
}
function conclusion(q: Q): string[] {
  const m = q.text.match(/(\d\([^ ]*(?:[^,.]*?)\)(?: \+ 1)?)/);
  if (!m) return ["écriture illisible"];
  const e = m[1].replace(/,$/, "");
  return qcmUnique(q, (c) => {
    const d = c.match(/multiple de (\d)/);
    if (d) return toutesMultiples(e, n(d[1]));
    if (/impair/.test(c)) return toutesImpaires(e);
    if (/pair/.test(c)) return toutesMultiples(e, 2);
    return false;
  });
}
function magie(q: Q): string[] {
  const m = q.text.match(/ajoute (\d+), multiplie par (\d+), enlève (\d+), divise par (\d+)/);
  if (!m) return ["programme illisible"];
  const [a, k, b, k2] = m.slice(1).map(n);
  const prog = (x: number) => ((x + a) * k - b) / k2;
  return qcmUnique(q, (c) => {
    const l = lettresDe(c)[0];
    return !!l && [1, 4, 9, 2.5].every((x) => Math.abs(evaluer(c, { [l]: x }) - prog(x)) < 1e-9);
  });
}
function contreExemple(q: Q): string[] {
  const t = q.text;
  const d = /est paire/.test(t) ? 2 : n(t.match(/multiple de (\d+)/)?.[1] ?? "0");
  if (!d) return ["affirmation illisible"];
  const test = (x: number) => x % d === 0;
  const nbTermes = /cinq/.test(t) ? 5 : /quatre/.test(t) ? 4 : /trois/.test(t) ? 3 : 2;
  const p: string[] = [];
  for (const c of q.choices ?? []) {
    const m = c.split(" = ");
    const termes = m[0].split(" + ").map(n);
    if (termes.length !== nbTermes) p.push(`« ${c} » n’a pas ${nbTermes} termes`);
    if (termes.reduce((x, y) => x + y, 0) !== n(m[1])) p.push(`« ${c} » : somme fausse`);
    for (let i = 1; i < termes.length; i++) if (termes[i] !== termes[i - 1] + 1) p.push(`« ${c} » : entiers non consécutifs`);
  }
  return [...p, ...qcmUnique(q, (c) => !test(n(c.split(" = ")[1])))];
}
function identite(q: Q): string[] {
  const m = q.text.match(/(\(\d*[a-z] [+−] \d+\)²(?: − (?:\([a-z] − \d\)²|[a-z]²))?|[a-z]\([a-z] \+ 1\) \+ [a-z] \+ 1)/);
  if (!m) return ["expression illisible"];
  const p = [...qcmUnique(q, (c) => egales(c, m[1])), ...distinctes(q)];
  const pr = q.text.match(/est (un nombre impair|un multiple de (\d)|un carré parfait)/);
  if (!pr) return [...p, "propriété illisible"];
  const vals = valeursEntieres(m[1]);
  const ok = pr[2] ? vals.every((v) => v % n(pr[2]) === 0) : /impair/.test(pr[1]) ? toutesImpaires(m[1]) : vals.every((v) => Number.isInteger(Math.sqrt(v)));
  return ok ? p : [...p, `${m[1]} n’est pas ${pr[1]}`];
}
function sommeK(q: Q): string[] {
  const m = q.text.match(/([a-z](?: \+ \([a-z] \+ \d\))+)/);
  if (!m) return ["somme illisible"];
  const k = m[1].split(" + (").length;
  const d = q.text.match(/par (\d)/)?.[1] ?? q.text.match(/multiple de (\d)/)?.[1];
  if (n(d ?? "0") !== k) return [`${k} termes, facteur annoncé ${d}`];
  if (!toutesMultiples(m[1], k)) return [`${m[1]} n’est pas un multiple de ${k}`];
  return [...qcmUnique(q, (c) => egales(c, m[1])), ...distinctes(q)];
}
function vraiFaux(q: Q): string[] {
  const m = q.text.match(/le (?:produit|nombre) ([^ ]*(?: [+] [^ ]+| [+] \d+)*) est toujours (pair|impair|multiple de (\d))/);
  if (!m) return ["affirmation illisible"];
  const positifs = Array.from({ length: 40 }, (_, i) => i + 1);
  const l = lettresDe(m[1])[0];
  const v = positifs.map((x) => evaluer(m[1], { [l]: x }));
  const ok = m[3] ? v.every((x) => x % n(m[3]) === 0) : m[2] === "pair" ? v.every((x) => x % 2 === 0) : v.every((x) => Math.abs(x % 2) === 1);
  return qcmUnique(q, (c) => (ok ? /^Vrai pour tous/.test(c) : /^Faux/.test(c)));
}

/* ───── fractions ───── */
/** Toutes les écritures « $…$ » d'un texte. */
const maths = (t: string) => [...t.matchAll(/\$([^$]+)\$/g)].map((m) => m[1]);

function fractionEgale(q: Q): string[] {
  const e = maths(q.text).find((x) => /frac/.test(x) && !/=/.test(x));
  if (!e) return ["expression illisible"];
  return [...qcmUnique(q, (c) => egales(c, e)), ...distinctes(q)];
}
function definitionNombre(q: Q): string[] {
  const fr = maths(q.text)[0].match(/\\dfrac\{(\d+)\}\{(\d+)\}/);
  if (!fr) return ["fraction illisible"];
  const juste = /…/.test(q.text) || /Par quel/.test(q.text) ? n(fr[2]) : n(fr[1]);
  return n(q.expected[0]) === juste ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}
/** Une égalité « $A = B$ » : vraie pour toutes les valeurs ? */
const egaliteVraie = (c: string) => {
  const m = maths(c)[0];
  if (!m || !m.includes("=")) return false;
  const [g, d] = m.split("=");
  return egales(g, d);
};
function definitionLettres(q: Q): string[] {
  const p = qcmUnique(q, egaliteVraie);
  const lue = maths(String(q.expected[0]))[0];
  if (!/\\times/.test(lue) || !/frac/.test(lue)) p.push("la réponse ne traduit pas la définition");
  return p;
}
function croixNombres(q: Q): string[] {
  const fs = [...q.text.matchAll(/\\dfrac\{(\d+)\}\{(\d+)\}/g)].slice(0, 2).map((m) => [n(m[1]), n(m[2])]);
  if (fs.length !== 2 || fs[0][0] * fs[1][1] !== fs[0][1] * fs[1][0]) return ["fractions illisibles ou inégales"];
  const juste = /…/.test(q.text) ? (fs[0][0] * fs[1][1]) / fs[0][1] : fs[0][0] * fs[1][1];
  return n(q.expected[0]) === juste ? [] : [`attendu ${q.expected[0]}, juste ${juste}`];
}
/** « On pose k = a/b » : la proposition juste, une fois k remplacé, est une égalité vraie. */
function pose(q: Q): string[] {
  const m = maths(q.text)[0].match(/^([a-z]) = (\\dfrac\{[a-z]\}\{[a-z]\})$/);
  if (!m) return ["pose illisible"];
  return qcmUnique(q, (c) => {
    const [g, d] = maths(c)[0].split("=");
    return egales(g.replace(new RegExp(m[1], "g"), `(${m[2]})`), d.replace(new RegExp(m[1], "g"), `(${m[2]})`));
  });
}
function sommeFact(q: Q): string[] {
  const ms = maths(q.text);
  const a = ms[0].match(/^([a-z]) = ([a-z])([a-z])$/);
  const c = ms[1].match(/^([a-z]) = ([a-z])([a-z])$/);
  if (!a || !c) return ["hypothèses illisibles"];
  const remplace = (s: string) => s.replace(new RegExp(`\\b${a[1]}\\b`, "g"), `${a[2]}${a[3]}`).replace(new RegExp(`\\b${c[1]}\\b`, "g"), `${c[2]}${c[3]}`);
  return qcmUnique(q, (x) => {
    const [g, d] = maths(x)[0].split("=");
    return egales(remplace(g), d);
  });
}
function croixLettres(q: Q): string[] {
  const m = maths(q.text)[0].match(/\\dfrac\{([a-z])\}\{([a-z])\} = \\dfrac\{([a-z])\}\{([a-z])\}/);
  if (!m) return ["égalité illisible"];
  const [, a, b, c, d] = m;
  return qcmUnique(q, (x) => {
    const [g, dr] = maths(x)[0].split("=");
    // L'égalité doit être vraie quand a/b = c/d : on tire b, d, c, et a = c × b ÷ d.
    return [[3, 7, 5], [2, 9, 4], [11, 4, 6]].every(([vb, vd, vc]) => {
      const e = { [b]: vb, [d]: vd, [c]: vc, [a]: (vc * vb) / vd };
      return Math.abs(evaluer(g, e) - evaluer(dr, e)) < 1e-9;
    });
  });
}
function produitOuSimplifier(q: Q): string[] {
  return fractionEgale(q);
}
function ligneSomme(q: Q): string[] {
  const ms = maths(q.text);
  const k = ms[0].match(/^([a-z]) = (\\dfrac\{[a-z]\}\{[a-z]\})$/);
  const r = ms[1].match(/^([a-z]) = (\\dfrac\{[a-z]\}\{[a-z]\})$/);
  if (!k || !r) return ["pose illisible"];
  return qcmUnique(q, (c) => {
    const [g, d] = maths(c)[0].split("=");
    const dd = d.replace(new RegExp(`\\b${k[1]}\\b`, "g"), `(${k[2]})`).replace(new RegExp(`\\b${r[1]}\\b`, "g"), `(${r[2]})`);
    return /frac/.test(g) && egales(g, dd);
  });
}
function croixDemo(q: Q): string[] {
  const eg = maths(q.text).find((x) => /^\\dfrac\{[a-z]\}\{[a-z]\} = \\dfrac\{[a-z]\}\{[a-z]\}$/.test(x)) ?? maths(q.text)[0];
  const lettres = [...eg.matchAll(/\\dfrac\{([a-z])\}\{([a-z])\}/g)];
  if (lettres.length < 2) return ["égalité illisible"];
  const [a, b] = [lettres[0][1], lettres[0][2]];
  const [c, d] = [lettres[1][1], lettres[1][2]];
  if (/^par /.test(String(q.expected[0])))
    return qcmUnique(q, (x) => {
      const m = maths(x)[0];
      return egales(m, `${b} × ${d}`);
    });
  return qcmUnique(q, (x) => {
    const [g, dr] = maths(x)[0].split("=");
    return [[3, 7, 5], [2, 9, 4]].every(([vb, vd, vc]) => {
      const e = { [b]: vb, [d]: vd, [c]: vc, [a]: (vc * vb) / vd };
      return Math.abs(evaluer(g, e) - evaluer(dr, e)) < 1e-9;
    }) && !/^\s*[a-z]\s*$/.test(g);
  });
}
function addFausse(q: Q): string[] {
  const m = q.text.match(/\\dfrac\{(\d+)\}\{(\d+)\} \+ \\dfrac\{(\d+)\}\{(\d+)\} = \\dfrac\{(\d+)\}\{(\d+)\}/);
  if (!m) return ["égalité illisible"];
  const [a, b, c, d, h, bas] = m.slice(1).map(n);
  if (b !== d) return ["dénominateurs différents"];
  if (Math.abs(a / b + c / d - h / bas) < 1e-9) return ["l’égalité écrite par l’élève est juste"];
  const vals = (q.choices ?? []).map((x) => evaluer(x, {}));
  const p = qcmUnique(q, (x) => Math.abs(evaluer(x, {}) - (a / b + c / d)) < 1e-9);
  if (new Set(vals.map((v) => v.toFixed(9))).size !== vals.length) p.push("deux propositions de même valeur");
  return p;
}
function conjecture(q: Q): string[] {
  const aff = maths(q.text)[0];
  const [g, d] = aff.split("=");
  const p: string[] = [];
  const vraie = egales(g, d);
  // L'exemple proposé dit la même chose que la propriété.
  const ex = q.text.match(/([a-z]) = (\d+) et ([a-z]) = (\d+)/);
  if (!ex) return ["exemple illisible"];
  const e = { [ex[1]]: n(ex[2]), [ex[3]]: n(ex[4]) };
  const surExemple = Math.abs(evaluer(g, e) - evaluer(d, e)) < 1e-9;
  if (surExemple !== vraie) p.push(`l’exemple ${ex[0]} ne tranche pas`);
  return [...p, ...qcmUnique(q, (c) => (vraie ? /^Oui/.test(c) : /^Non/.test(c)))];
}
function divisionFractions(q: Q): string[] {
  const e = maths(q.text).find((x) => /\\div/.test(x));
  if (!e) return ["division illisible"];
  return [...qcmUnique(q, (c) => egales(c, e.replace(/\\div/g, "÷"))), ...distinctes(q)];
}
function sommesHautBas(q: Q): string[] {
  const m = q.text.match(/\\dfrac\{(\d+)\}\{(\d+)\} = \\dfrac\{(\d+)\}\{(\d+)\}/);
  if (!m) return ["égalité illisible"];
  const [a, b, c, d] = m.slice(1).map(n);
  if (a * d !== b * c) return ["fractions inégales"];
  const juste = (a + c) / (b + d);
  const vals = (q.choices ?? []).map((x) => evaluer(x, {}));
  const p = qcmUnique(q, (x) => Math.abs(evaluer(x, {}) - juste) < 1e-9);
  if (new Set(vals.map((v) => v.toFixed(9))).size !== vals.length) p.push("deux propositions de même valeur");
  return p;
}
function justification(q: Q): string[] {
  const [l1, l2] = maths(q.text);
  if (!l1 || !l2) return ["lignes illisibles"];
  const deux = [l1, l2];
  const juste = deux.some((l) => /\\div/.test(l))
    ? "la multiplication par l’inverse"
    : deux.some((l) => /^[a-z] = \\dfrac/.test(l))
      ? "la définition du quotient"
      : deux.some((l) => /\(/.test(l))
        ? "la mise en facteur"
        : deux.some((l) => /frac/.test(l))
          ? "l’égalité des produits en croix"
          : "";
  return q.expected[0] === juste ? [] : [`attendu « ${q.expected[0]} », lu « ${juste} »`];
}

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  "3e_litteral_demontrer_entiers_tpl_1": ecriture,
  "3e_litteral_demontrer_entiers_tpl_2": represente,
  "3e_litteral_demontrer_entiers_tpl_3": forme2n,
  "3e_litteral_demontrer_entiers_tpl_4": suivants,
  "3e_litteral_demontrer_entiers_tpl_5": reduire,
  "3e_litteral_demontrer_entiers_tpl_6": facteurNombre,
  "3e_litteral_demontrer_entiers_tpl_7": essaiConsecutifs,
  "3e_litteral_demontrer_entiers_tpl_8": sommeMultiples,
  "3e_litteral_demontrer_entiers_tpl_9": ligneSuivante,
  "3e_litteral_demontrer_entiers_tpl_10": conclusion,
  "3e_litteral_demontrer_entiers_tpl_11": magie,
  "3e_litteral_demontrer_entiers_tpl_12": contreExemple,
  "3e_litteral_demontrer_entiers_tpl_13": identite,
  "3e_litteral_demontrer_entiers_tpl_14": sommeK,
  "3e_litteral_demontrer_entiers_tpl_15": vraiFaux,

  "3e_litteral_demontrer_fraction_tpl_1": fractionEgale,
  "3e_litteral_demontrer_fraction_tpl_2": definitionNombre,
  "3e_litteral_demontrer_fraction_tpl_3": definitionLettres,
  "3e_litteral_demontrer_fraction_tpl_4": croixNombres,
  "3e_litteral_demontrer_fraction_tpl_5": pose,
  "3e_litteral_demontrer_fraction_tpl_6": sommeFact,
  "3e_litteral_demontrer_fraction_tpl_7": croixLettres,
  "3e_litteral_demontrer_fraction_tpl_8": produitOuSimplifier,
  "3e_litteral_demontrer_fraction_tpl_9": ligneSomme,
  "3e_litteral_demontrer_fraction_tpl_10": croixDemo,
  "3e_litteral_demontrer_fraction_tpl_11": addFausse,
  "3e_litteral_demontrer_fraction_tpl_12": conjecture,
  "3e_litteral_demontrer_fraction_tpl_13": fractionEgale,
  "3e_litteral_demontrer_fraction_tpl_14": divisionFractions,
  "3e_litteral_demontrer_fraction_tpl_15": sommesHautBas,
  "3e_litteral_demontrer_fraction_tpl_16": justification,
});
