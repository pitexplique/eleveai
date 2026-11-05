import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egal, net, nombres, num, reponse, texte, type Q } from "./outils";

// LES CORRECTEURS DE operations-decimales.bank.ts. Vide = juste.

const unite = (q: Q) => String(q.expected[0]).replace(/^[\d ,]+/, "").trim();
/** La dernière opération écrite dans le texte : « 2,3 × 4 », « 17 ÷ 4 ». */
const operation = (t: string) => {
  const l = [...t.matchAll(/(\d[\d ]*(?:,\d+)?) ([×÷]) (\d+)/g)];
  const m = l[l.length - 1];
  return m ? { a: num(m[1]), op: m[2], b: Number(m[3]) } : null;
};
const calcul = (q: Q) => {
  // S'il y a un « On sait que … = … », c'est la question finale qui compte.
  const o = operation(q.text.replace(/^.*= [\d ,]+\. /, ""));
  if (!o) return ["opération illisible"];
  return reponse(q, o.op === "×" ? o.a * o.b : o.a / o.b);
};
/** La figure posée doit porter les deux nombres et jamais le résultat. */
const figure = (q: Q) => {
  const f = q.canvas as any;
  if (!f) return ["figure absente"];
  if (f.result || f.division?.quotient) return ["la figure donne la réponse"];
  const [a, b] = f.numbers.map(num);
  return reponse(q, f.operation === "multiplication" ? a * b : a / b);
};
const ouiJuste = (q: Q) => {
  const m = q.text.match(/trouve ([\d ,]+) pour ([\d,]+) × (\d+)/);
  if (!m) return ["annonce illisible"];
  return texte(q, egal(num(m[1]), net(num(m[2]) * Number(m[3]))) ? "Oui" : "Non");
};
const prixTotal = (q: Q) => {
  const m = q.text.match(/(\d+) [^\d]+? à ([\d,]+) € l’?'?unité/);
  if (!m) return ["prix illisible"];
  return reponse(q, Number(m[1]) * num(m[2]), "€");
};
const mesureRepetee = (q: Q) => {
  const [x, y] = nombres(q.text);
  return reponse(q, x * y, unite(q));
};

/* division à quotient décimal */
const resteDixiemes = (q: Q) => {
  const o = operation(q.text);
  if (!o) return ["opération illisible"];
  const r = o.a % o.b;
  const t = nombres(q.text);
  if (!t.includes(r) || !t.includes(Math.floor(o.a / o.b))) return ["quotient ou reste écrit faux"];
  return reponse(q, r * 10);
};
const inverse = (q: Q) => {
  const [a, b] = nombres(q.text);
  const fois = q.text.match(/… × (\d+) = (\d+)/) || q.text.match(/multiplié par (\d+), donne (\d+)/);
  if (fois) return reponse(q, Number(fois[2]) / Number(fois[1]));
  // « 8 × … = 30 », « multiplier 8 pour obtenir 30 »
  return reponse(q, b / a);
};
const partage = (q: Q) => {
  const [a, b] = nombres(q.text);
  const [d, n] = /^\d+ (?:amis|randonneurs|voisins|scientifiques|chevaux|sacs|marcheurs)/.test(q.text) ? [a, b] : [b, a];
  return reponse(q, n / d, unite(q));
};
const prixUnite = (q: Q) => {
  const [d, n] = nombres(q.text);
  return reponse(q, n / d, "€");
};

/* dividende décimal */
const dixiemesAPartager = (q: Q) => {
  const o = operation(q.text);
  const m = q.text.match(/on a écrit (\d+), et il reste (\d+) unité/);
  if (!o || !m) return ["illisible"];
  const e = Number(m[1]);
  const r = Number(m[2]);
  if (e !== Math.floor(o.a / o.b)) return ["quotient entier écrit faux"];
  if (r !== Math.floor(o.a) - e * o.b) return ["reste écrit faux"];
  return reponse(q, Math.round((o.a - Math.floor(o.a)) * 10) + r * 10);
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  multiplication_decimale_posee_tpl_1: calcul,
  multiplication_decimale_posee_tpl_2: calcul,
  multiplication_decimale_posee_tpl_3: figure,
  multiplication_decimale_posee_tpl_4: calcul,
  multiplication_decimale_posee_tpl_5: calcul,
  multiplication_decimale_posee_tpl_6: calcul,
  multiplication_decimale_posee_tpl_7: prixTotal,
  multiplication_decimale_posee_tpl_8: mesureRepetee,
  multiplication_decimale_posee_tpl_9: ouiJuste,
  division_decimale_posee_tpl_1: calcul,
  division_decimale_posee_tpl_2: resteDixiemes,
  division_decimale_posee_tpl_3: figure,
  division_decimale_posee_tpl_4: calcul,
  division_decimale_posee_tpl_5: calcul,
  division_decimale_posee_tpl_6: inverse,
  division_decimale_posee_tpl_7: partage,
  division_decimale_posee_tpl_8: prixUnite,
  division_decimale_dividende_tpl_1: calcul,
  division_decimale_dividende_tpl_2: calcul,
  division_decimale_dividende_tpl_3: figure,
  division_decimale_dividende_tpl_4: calcul,
  division_decimale_dividende_tpl_5: calcul,
  division_decimale_dividende_tpl_6: dixiemesAPartager,
  division_decimale_dividende_tpl_7: partage,
  division_decimale_dividende_tpl_8: prixUnite,
});
