import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egal, net, nombres, reponse, texte, unique, valeur, type Q } from "./outils";

// LES CORRECTEURS DE calcul-mental-decimal.bank.ts. Vide = juste.

const unite = (q: Q) => String(q.expected[0]).replace(/^[\d ,]+/, "").trim();
const moitie = (q: Q) => reponse(q, nombres(q.text)[0] / 2);
const double = (q: Q) => reponse(q, nombres(q.text)[0] * 2);

/* moitié d'un impair */
const impair = (q: Q) => {
  const n = nombres(q.text)[0];
  if (n % 2 !== 1 || n > 15) return [`${n} n'est pas un impair jusqu'à 15`];
  return reponse(q, n / 2);
};
const barreImpair = (q: Q) => {
  const f = q.canvas as any;
  const n = nombres(q.text)[0];
  if (f && Number(f.total) !== n) return ["figure différente du texte"];
  return reponse(q, n / 2);
};
const dernierNombreMoitie = (q: Q) => {
  // « … + … = 7 », « 2 × … = 7 », « Le double de quel nombre donne 7 ».
  const l = nombres(q.text);
  return reponse(q, l[l.length - 1] / 2);
};
const deuxMoities = (q: Q) => {
  const [a, b] = nombres(q.text);
  return reponse(q, (a + b) / 2);
};
const ouiMoitie = (q: Q) => {
  const n = nombres(q.text);
  const x = /^(?:.*\. )?La moitié de (\d+) est-elle/.test(q.text) ? n[1] : n[0];
  const N = /La moitié de (\d+) est-elle/.test(q.text) ? n[0] : n[n.length - 1];
  return texte(q, egal(x * 2, N) ? "Oui" : "Non");
};
const partageImpair = (q: Q) => {
  const n = nombres(q.text.replace(/\best coupée? en deux/, ""))[0];
  return reponse(q, n / 2);
};

/* double d'un décimal */
const barreDouble = (q: Q) => {
  const f = q.canvas as any;
  const x = nombres(q.text)[0];
  if (f.parts.some((p: any) => valeur(p.value) !== x)) return ["figure différente du texte"];
  return reponse(q, x * 2);
};
const nombreDeDepart = (q: Q) => reponse(q, nombres(q.text.replace(/… × 2/, "…"))[0] / 2);
const doubleContexte = (q: Q) => {
  const x = nombres(q.text)[0];
  return reponse(q, x * 2, unite(q));
};
const perimetre = (q: Q) => {
  const [L, l] = nombres(q.text);
  return reponse(q, 2 * (L + l), "m");
};

/* moitié d'un décimal */
const barreMoitie = (q: Q) => {
  const f = q.canvas as any;
  const x = nombres(q.text)[0];
  if (valeur(f.total) !== x) return ["figure différente du texte"];
  return reponse(q, x / 2);
};
const departMoitie = (q: Q) => reponse(q, nombres(q.text.replace(/… ÷ 2/, "…"))[0] * 2);
const moitieContexte = (q: Q) => reponse(q, nombres(q.text)[0] / 2, unite(q));

/* ÷ 4, ÷ 8 */
const division = (q: Q) => {
  const m = q.text.match(/(\d+) ÷ (\d)/);
  if (!m) return ["division illisible"];
  return reponse(q, Number(m[1]) / Number(m[2]));
};
const premiereMoitie = (q: Q) => {
  const m = q.text.match(/(\d+) ÷ 4/);
  if (!m) return ["division illisible"];
  return reponse(q, Number(m[1]) / 2);
};
const combienMoities = (q: Q) => {
  const d = Number(q.text.match(/(?:par|÷) (\d)/)?.[1]);
  return reponse(q, Math.log2(d));
};
const etapeManquante = (q: Q) => {
  const l = nombres(q.text.replace(/par 8/, ""));
  // Le dernier nombre écrit est le résultat final : l'étape manquante en est le double.
  const fin = l[l.length - 1];
  const debut = l[0];
  if (debut === 8) return ["illisible"];
  return reponse(q, fin * 2);
};
const partage48 = (q: Q) => {
  const l = nombres(q.text);
  const [a, b] = l;
  const d = a === 4 || a === 8 ? a : b;
  const n = a === 4 || a === 8 ? b : a;
  return reponse(q, n / d, unite(q));
};

/* × 5, × 50 */
const produit = (q: Q) => {
  const m = q.text.match(/([\d,]+) × (50|5)(?!\d)/);
  if (!m) return ["produit illisible"];
  return reponse(q, Number(m[1].replace(",", ".")) * Number(m[2]));
};
const astuceCalcul = (q: Q) => {
  const m = q.text.match(/(\d+) × (50|5)(?!\d)/);
  if (!m) return ["produit illisible"];
  const x = Number(m[1]);
  const k = Number(m[2]);
  const ev = (c: string) => {
    const t = c.match(/^(\d+) ([×÷+]) (\d+)(?: ([×÷]) (\d+))?$/);
    if (!t) return NaN;
    const op = (a: number, o: string, b: number) => (o === "×" ? a * b : o === "÷" ? a / b : a + b);
    let r = op(Number(t[1]), t[2], Number(t[3]));
    if (t[4]) r = op(r, t[4], Number(t[5]));
    return r;
  };
  // Le juste : la bonne valeur ET la forme « × 10 (ou 100) ÷ 2 ». « x × 2 ÷ 10 » vaut x ÷ 5, pas x × 5.
  return unique(q, (c) => egal(ev(c), x * k));
};
const etape100 = (q: Q) => reponse(q, nombres(q.text)[0] * 100);
const achat50 = (q: Q) => {
  const m = q.text.match(/50 .* à ([\d,]+) €/);
  if (!m) return ["prix illisible"];
  return reponse(q, 50 * Number(m[1].replace(",", ".")), "€");
};
const mesure50 = (q: Q) => {
  const [k, x] = nombres(q.text);
  return reponse(q, k * x, unite(q));
};

/* ordre de grandeur : on calcule exactement, l'estimation doit être la proposition la plus proche, et à moins de 25 %. */
function estimation(q: Q, exact: number): string[] {
  const vals = (q.choices ?? []).map(valeur).map(net);
  const p: string[] = [];
  if (new Set(vals).size !== vals.length) p.push("deux propositions de même valeur");
  const e = valeur(q.expected[0]);
  const pres = [...vals].sort((a, b) => Math.abs(a - exact) - Math.abs(b - exact))[0];
  if (!egal(pres, e)) p.push(`exact ${exact} : la plus proche est ${pres}, pas ${e}`);
  if (Math.abs(e - exact) > 0.25 * exact) p.push(`estimation ${e} trop loin de ${exact}`);
  return p;
}
const lireOperation = (t: string) => {
  const m = t.match(/(\d[\d ]*(?:,\d+)?) ([+−×÷]) (\d[\d ]*(?:,\d+)?)/);
  if (!m) return null;
  const a = Number(m[1].trim().replace(/ /g, "").replace(",", "."));
  const b = Number(m[3].trim().replace(/ /g, "").replace(",", "."));
  return m[2] === "+" ? a + b : m[2] === "−" ? a - b : m[2] === "×" ? a * b : a / b;
};
const estimeOp = (q: Q) => {
  const x = lireOperation(q.text);
  return x == null ? ["opération illisible"] : estimation(q, x);
};
const estimeTotal = (q: Q) => {
  const t = q.text.match(/([\d,]+) €, .* à ([\d,]+) € et .* à ([\d,]+) €/);
  if (!t) return ["prix illisibles"];
  return estimation(q, t.slice(1).reduce((s, x) => s + Number(x.replace(",", ".")), 0));
};
const assezArgent = (q: Q) => {
  const k = nombres(q.text)[0];
  const m = q.text.match(/coûtent ([\d,]+) € chacun/);
  const d = q.text.match(/(?:On a|Le budget est de|Il reste) ([\d ]+) €/);
  if (!m || !d) return ["données illisibles"];
  return texte(q, k * Number(m[1].replace(",", ".")) <= Number(d[1].replace(/ /g, "")) ? "Oui" : "Non");
};
const raisonnable = (q: Q) => {
  const m = q.text.match(/([\d ]+) pour (\d+) × (\d+)/);
  if (!m) return ["annonce illisible"];
  const annonce = Number(m[1].replace(/ /g, ""));
  const exact = Number(m[2]) * Number(m[3]);
  return texte(q, annonce === exact ? "Oui" : "Non");
};

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  calcul_moitie_impair_tpl_1: impair,
  calcul_moitie_impair_tpl_2: impair,
  calcul_moitie_impair_tpl_3: barreImpair,
  calcul_moitie_impair_tpl_4: dernierNombreMoitie,
  calcul_moitie_impair_tpl_5: deuxMoities,
  calcul_moitie_impair_tpl_6: ouiMoitie,
  calcul_moitie_impair_tpl_7: partageImpair,
  calcul_moitie_impair_tpl_8: moitie,
  calcul_double_decimal_tpl_1: double,
  calcul_double_decimal_tpl_2: double,
  calcul_double_decimal_tpl_3: barreDouble,
  calcul_double_decimal_tpl_4: double,
  calcul_double_decimal_tpl_5: double,
  calcul_double_decimal_tpl_6: nombreDeDepart,
  calcul_double_decimal_tpl_7: doubleContexte,
  calcul_double_decimal_tpl_8: perimetre,
  calcul_double_decimal_tpl_9: doubleContexte,
  calcul_moitie_decimal_tpl_1: moitie,
  calcul_moitie_decimal_tpl_2: moitie,
  calcul_moitie_decimal_tpl_3: barreMoitie,
  calcul_moitie_decimal_tpl_4: moitie,
  calcul_moitie_decimal_tpl_5: moitie,
  calcul_moitie_decimal_tpl_6: departMoitie,
  calcul_moitie_decimal_tpl_7: moitieContexte,
  calcul_moitie_decimal_tpl_8: moitieContexte,
  calcul_diviser_4_8_tpl_1: division,
  calcul_diviser_4_8_tpl_2: premiereMoitie,
  calcul_diviser_4_8_tpl_3: combienMoities,
  calcul_diviser_4_8_tpl_4: division,
  calcul_diviser_4_8_tpl_5: division,
  calcul_diviser_4_8_tpl_6: etapeManquante,
  calcul_diviser_4_8_tpl_7: partage48,
  calcul_diviser_4_8_tpl_8: partage48,
  calcul_multiplier_50_tpl_1: produit,
  calcul_multiplier_50_tpl_2: produit,
  calcul_multiplier_50_tpl_3: astuceCalcul,
  calcul_multiplier_50_tpl_4: produit,
  calcul_multiplier_50_tpl_5: produit,
  calcul_multiplier_50_tpl_6: etape100,
  calcul_multiplier_50_tpl_7: achat50,
  calcul_multiplier_50_tpl_8: mesure50,
  calcul_ordre_grandeur_tpl_1: estimeOp,
  calcul_ordre_grandeur_tpl_2: estimeOp,
  calcul_ordre_grandeur_tpl_3: estimeOp,
  calcul_ordre_grandeur_tpl_4: estimeOp,
  calcul_ordre_grandeur_tpl_5: estimeOp,
  calcul_ordre_grandeur_tpl_6: estimeOp,
  calcul_ordre_grandeur_tpl_7: estimeTotal,
  calcul_ordre_grandeur_tpl_8: assezArgent,
  calcul_ordre_grandeur_tpl_9: raisonnable,
});
