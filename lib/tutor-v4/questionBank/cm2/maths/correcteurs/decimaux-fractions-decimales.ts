import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egal, net, nombres, reponse, texte, unique, type Q } from "./outils";

// LES CORRECTEURS DE decimaux-fractions-decimales.bank.ts. Ils relisent les fractions
// écrites dans le texte (ou dans les propositions) et recalculent. Vide = juste.

/** Toutes les fractions « a/b » d'un texte. */
const fractions = (t: string) => [...t.matchAll(/(\d+)\/(\d+)/g)].map((m) => [Number(m[1]), Number(m[2])] as [number, number]);
const val = ([a, b]: [number, number]) => net(a / b);
const lireSomme = (s: string) => {
  // « 35 + 7/10 + 8/100 » dans n'importe quel ordre.
  const sf = s.replace(/\d+\/\d+/g, " ");
  const e = [...sf.matchAll(/\d+/g)].reduce((t, m) => t + Number(m[0]), 0);
  return net(e + fractions(s).reduce((t, f) => t + val(f), 0));
};
/** Un seul nombre à virgule (ou entier) dans le texte : le premier. */
const premier = (t: string) => nombres(t)[0];

/* somme */
const sommeEgale = (q: Q) => {
  const x = premier(q.text);
  return unique(q, (c) => egal(lireSomme(c), x));
};
const numerateurDixiemes = (q: Q) => {
  const m = q.text.match(/(\d+,\d+) = (\d+) \+ …\/10/);
  if (!m) return ["égalité illisible"];
  return reponse(q, net((Number(m[1].replace(",", ".")) - Number(m[2])) * 10));
};
const nombreDeSomme = (q: Q) => {
  const m = q.text.match(/\d+(?: \+ \d+\/\d+)+/);
  if (!m) return ["somme illisible"];
  return reponse(q, lireSomme(m[0]));
};
const sommeZero = (q: Q) => {
  const m = q.text.match(/\d+,0\d/);
  if (!m) return ["le zéro n'est pas dans le nombre"];
  return unique(q, (c) => egal(lireSomme(c), Number(m[0].replace(",", "."))) && !/0\/10/.test(c));
};
const sommeFraction = (q: Q) => {
  const [f] = fractions(q.text);
  return unique(q, (c) => egal(lireSomme(c), val(f)));
};
const grille = (q: Q) => {
  const shaded = (q.canvas as any).grid.shaded;
  return unique(q, (c) => egal(lireSomme(c), net(shaded / 100)));
};
const sommeMesure = (q: Q) => {
  const m = q.text.match(/\d+,\d+/);
  if (!m) return ["mesure illisible"];
  return unique(q, (c) => egal(lireSomme(c), Number(m[0].replace(",", "."))));
};
const desordre = (q: Q) => {
  const m = q.text.match(/\d+(?:\/\d+)?(?: \+ \d+(?:\/\d+)?)+/);
  if (!m) return ["somme illisible"];
  return reponse(q, lireSomme(m[0]));
};
const pieces = (q: Q) => {
  const m = q.text.match(/(\d+) pièces de 1 €, (\d+) pièces de 10 centimes et (\d+) pièces de 1 centime/);
  if (!m) return ["pièces illisibles"];
  return reponse(q, Number(m[1]) + Number(m[2]) / 10 + Number(m[3]) / 100, "€");
};

/* comparer */
const signeJuste = (a: number, b: number) => (a < b ? "<" : a > b ? ">" : "=");
const signeEntre = (q: Q) => {
  const [a, b] = fractions(q.text);
  return texte(q, signeJuste(val(a), val(b)));
};
const plusGrande = (q: Q) => {
  const [a, b] = fractions(q.text);
  if (val(a) === val(b)) return texte(q, "Elles sont égales");
  const g = val(a) > val(b) ? a : b;
  return texte(q, `${g[0]}/${g[1]}`);
};
const complete = (q: Q) => {
  const m = q.text.match(/(\d+)\/(\d+) = …\/(\d+)/);
  if (!m) return ["égalité illisible"];
  return reponse(q, (Number(m[1]) * Number(m[3])) / Number(m[2]));
};
const encadreEntiers = (q: Q) => {
  const [f] = fractions(q.text);
  const e = Math.floor(val(f));
  return texte(q, `entre ${e} et ${e + 1}`);
};
const lectureDroite = (q: Q) => {
  const pts = (q.canvas as any).points as { value: number; label: string }[];
  const [A, B] = pts;
  const g = /plus grand/.test(q.text);
  const j = g === A.value > B.value ? A : B;
  const f = q.expected[0].match(/(\d+)\/10 \(point ([AB])\)/);
  if (!f || f[2] !== j.label || !egal(Number(f[1]) / 10, j.value)) return [`attendu « ${q.expected[0]} », juste : point ${j.label}`];
  return [];
};
const intercale = (q: Q) => {
  const [a, b] = fractions(q.text);
  return unique(q, (c) => {
    const [f] = fractions(c);
    return val(a) < val(f) && val(f) < val(b);
  });
};
const situation = (q: Q) => {
  const [a, b] = fractions(q.text);
  const A = q.text.split(/ (?:a couru|a parcouru|a sauté|pèse|contient|mesure|a nagé|a marché) /)[0];
  const B = q.text.split(". ")[1].split(/ (?:a couru|a parcouru|a sauté|pèse|contient|mesure|a nagé|a marché) /)[0];
  const j = val(a) > val(b) ? A : B;
  return String(q.expected[0]).toLowerCase() === j.toLowerCase() ? [] : [`attendu « ${q.expected[0]} », juste « ${j} »`];
};
const encadreDixiemes = (q: Q) => {
  const [f] = fractions(q.text);
  const bas = Math.floor(val(f) * 10);
  return texte(q, `${bas}/10 < ${f[0]}/${f[1]} < ${bas + 1}/10`);
};

/* ordonner */
const croissant = (q: Q) => (/décroissant/.test(q.text) ? -1 : 1);
const ordre = (q: Q) => {
  const l = fractions(q.text);
  const j = [...l].sort((a, b) => croissant(q) * (val(a) - val(b)));
  if (new Set(l.map(val)).size !== l.length) return ["deux fractions de même valeur"];
  const p = texte(q, j.map((f) => `${f[0]}/${f[1]}`).join(" ; "));
  const ch = (q.choices ?? []).map((c) => fractions(c).map(val).join());
  return new Set(ch).size === ch.length ? p : [...p, "deux propositions équivalentes"];
};
const extremum = (q: Q) => {
  const l = fractions(q.text);
  const g = /plus grande|le plus/.test(q.text);
  const j = [...l].sort((a, b) => (g ? -1 : 1) * (val(a) - val(b)))[0];
  return valeurFraction(q, j);
};
const valeurFraction = (q: Q, j: [number, number]) => {
  const [e] = fractions(q.expected[0]);
  return e && e[0] === j[0] && e[1] === j[1] ? [] : [`attendu « ${q.expected[0]} », juste ${j[0]}/${j[1]}`];
};
const milieu = (q: Q) => {
  const l = fractions(q.text);
  const j = [...l].sort((a, b) => val(a) - val(b))[1];
  return valeurFraction(q, j);
};

/* ÷ 10, 100, 1 000 */
const division = (q: Q) => {
  const m = q.text.match(/([\d ,]*\d) ÷ (1 000|100|10)(?!\d)/);
  if (!m) return ["division illisible"];
  const x = Number(m[1].trim().replace(/ /g, "").replace(",", "."));
  const k = Number(m[2].replace(/ /g, ""));
  return [...reponse(q, x / k), ...tableauJuste(q, x, k)];
};
function tableauJuste(q: Q, x: number, k: number): string[] {
  const f = q.canvas as any;
  if (!f) return [];
  if (f.kind !== "tableau_donnees") return ["figure inattendue"];
  const lire = (vals: string[]) => {
    const heads: string[] = f.headers.slice(1);
    const poids: Record<string, number> = { c: 100, d: 10, u: 1, dixièmes: 0.1, centièmes: 0.01, millièmes: 0.001, "dix-mill.": 0.0001 };
    return net(vals.reduce((t, c, i) => t + (c === "" ? 0 : Number(c) * poids[heads[i]]), 0));
  };
  const a = lire(f.rows[0].values);
  const b = lire(f.rows[1].values);
  if (!egal(a, net(x))) return [`le tableau lit ${a}, le texte ${x}`];
  if (!egal(b, net(x / k))) return [`le tableau donne ${b}, le calcul ${net(x / k)}`];
  return [];
}
const rang = (q: Q) => {
  const RANGS = ["dizaines", "unités", "dixièmes", "centièmes"];
  const m = q.text.match(/(dizaines|unités|dixièmes)/);
  if (!m) return ["rang illisible"];
  return texte(q, `Les ${RANGS[RANGS.indexOf(m[1]) + 1]}`);
};
const trou = (q: Q) => {
  const m = q.text.match(/([\d ,]*\d|…) ÷ ([\d ]*\d|…) = (\d[\d ,]*)/);
  if (!m) return ["égalité illisible"];
  const r = Number(m[3].trim().replace(/ /g, "").replace(",", "."));
  if (m[2] === "…") return reponse(q, Number(m[1].trim().replace(/ /g, "").replace(",", ".")) / r);
  return reponse(q, r * Number(m[2].trim().replace(/ /g, "")));
};
const quelNombre = (q: Q) => {
  const m = q.text.match(/divisé par ([\d ]*\d) donne (\d[\d ,]*)/);
  if (m) return reponse(q, Number(m[1].replace(/ /g, "")) * Number(m[2].trim().replace(/ /g, "").replace(",", ".")));
  return trou(q);
};
const prixUn = (q: Q) => {
  const k = Number(q.text.match(/de (10|100) /)?.[1]);
  const m = q.text.match(/coûte ([\d ,]*\d) €/);
  if (!k || !m) return ["prix illisible"];
  return reponse(q, Number(m[1].replace(/ /g, "").replace(",", ".")) / k, "€");
};
const masseUn = (q: Q) => {
  const m = q.text.match(/^([\d ]*\d) .* pèsent ([\d ,]*\d) g/);
  if (!m) return ["masse illisible"];
  return reponse(q, Number(m[2].replace(/ /g, "").replace(",", ".")) / Number(m[1].replace(/ /g, "")), "g");
};
const partEgale = (q: Q) => {
  const m = q.text.match(/de ([\d ,]*\d) (m|km|L) .* en (10|100) parts/);
  if (!m) return ["part illisible"];
  return reponse(q, Number(m[1].replace(/ /g, "").replace(",", ".")) / Number(m[3]), m[2]);
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  decimal_somme_fractions_tpl_1: sommeEgale,
  decimal_somme_fractions_tpl_2: numerateurDixiemes,
  decimal_somme_fractions_tpl_3: nombreDeSomme,
  decimal_somme_fractions_tpl_4: sommeZero,
  decimal_somme_fractions_tpl_5: sommeFraction,
  decimal_somme_fractions_tpl_6: grille,
  decimal_somme_fractions_tpl_7: sommeMesure,
  decimal_somme_fractions_tpl_8: desordre,
  decimal_somme_fractions_tpl_9: pieces,
  fraction_decimale_comparer_tpl_1: signeEntre,
  fraction_decimale_comparer_tpl_2: plusGrande,
  fraction_decimale_comparer_tpl_3: complete,
  fraction_decimale_comparer_tpl_4: signeEntre,
  fraction_decimale_comparer_tpl_5: encadreEntiers,
  fraction_decimale_comparer_tpl_6: lectureDroite,
  fraction_decimale_comparer_tpl_7: intercale,
  fraction_decimale_comparer_tpl_8: situation,
  fraction_decimale_comparer_tpl_9: encadreDixiemes,
  fraction_decimale_ordonner_tpl_1: ordre,
  fraction_decimale_ordonner_tpl_2: ordre,
  fraction_decimale_ordonner_tpl_3: extremum,
  fraction_decimale_ordonner_tpl_4: ordre,
  fraction_decimale_ordonner_tpl_5: ordre,
  fraction_decimale_ordonner_tpl_6: ordre,
  fraction_decimale_ordonner_tpl_7: ordre,
  fraction_decimale_ordonner_tpl_8: milieu,
  fraction_decimale_ordonner_tpl_9: extremum,
  decimal_diviser_puissance_dix_tpl_1: division,
  decimal_diviser_puissance_dix_tpl_2: rang,
  decimal_diviser_puissance_dix_tpl_3: division,
  decimal_diviser_puissance_dix_tpl_4: division,
  decimal_diviser_puissance_dix_tpl_5: division,
  decimal_diviser_puissance_dix_tpl_6: quelNombre,
  decimal_diviser_puissance_dix_tpl_7: prixUn,
  decimal_diviser_puissance_dix_tpl_8: masseUn,
  decimal_diviser_puissance_dix_tpl_9: partEgale,
});
