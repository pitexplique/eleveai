import type { CorrecteursMaths } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/types";
import { avecRegleMotsCles } from "@/lib/tutor-v4/questionBank/6e/maths/correcteurs/pourcentages";
import { egal, net, reponse, texte, unique, type Q } from "./outils";

// LES CORRECTEURS DE commerce-prix.bank.ts (06/11/2026). Ils relisent les montants, les
// taux et les durées dans le TEXTE (ou le tableau affiché), refont le calcul, contrôlent
// l'unité et, en F CFA, que le montant est un multiple de 25. Vide = juste.

const net_ = (t: string) => t.replace(/[  ]/g, " ");
const nombre = (s: string) => Number(s.replace(/ /g, "").replace(",", "."));
const RE_M = /(\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?) (€|F CFA)/g;
const montants = (t: string) => [...net_(t).matchAll(RE_M)].map((x) => ({ v: nombre(x[1]), u: x[2] }));
const lus = (q: Q) => montants(q.text).map((m) => m.v);
const unite = (q: Q) => (/F CFA/.test(net_(q.text)) ? "F CFA" : /€/.test(q.text) ? "€" : ((q.canvas as any)?.headers?.join(" ").includes("CFA") ? "F CFA" : "€"));
const taux = (q: Q) => Number(net_(q.text).match(/(\d+) %/)?.[1]);
const ans = (q: Q) => Number(net_(q.text).match(/(\d+) ans/)?.[1]);
const mois = (q: Q) => Number(net_(q.text).match(/(\d+) mois/)?.[1]);

/** Bon montant, bonne monnaie, et en F CFA des nombres ronds. */
function montant(q: Q, juste: number): string[] {
  const u = unite(q);
  const p = reponse(q, net(juste), u);
  if (u === "F CFA") {
    for (const m of montants(q.text)) if (m.v % 25 !== 0) p.push(`montant non rond en F CFA : ${m.v}`);
    if (net(juste) % 25 !== 0) p.push(`réponse non ronde en F CFA : ${juste}`);
  }
  if (juste <= 0) p.push(`réponse impossible : ${juste}`);
  if (!Number.isInteger(net(juste * 100))) p.push(`plus de deux décimales : ${juste}`);
  return p;
}

const gagne = (q: Q) => /bénéfice|gagne/i.test(q.text) && !/perte|perd/i.test(q.text);

/* ───── facture : le tableau affiché ───── */
type Ligne = (string | number)[];
const tab = (q: Q): Ligne[] => ((q.canvas as any)?.rows ?? []).map((r: any) => r.values);
const nb = (x: string | number) => (typeof x === "number" ? x : nombre(String(x)));
function ligneSaine(l: Ligne): string[] {
  if (l[1] === "?" || l[3] === "?" || l[0] === "Total") return [];
  return egal(nb(l[1]) * nb(l[2]), nb(l[3])) ? [] : [`ligne fausse : ${l.join(" | ")}`];
}
const lignes = (q: Q) => tab(q).filter((l) => l[0] !== "Total");
const lignesSaines = (q: Q) => lignes(q).flatMap(ligneSaine);
const sommeMontants = (l: Ligne[]) => l.reduce((s, x) => s + nb(x[3]), 0);

export const CORRECTEURS: CorrecteursMaths = avecRegleMotsCles({
  /* prix */
  prix_revient_vente_benefice_tpl_1: (q) => {
    const [a, f] = lus(q);
    return montant(q, a + f);
  },
  prix_revient_vente_benefice_tpl_2: (q) => {
    const [r, v] = lus(q);
    return v > r ? montant(q, v - r) : ["vente sans bénéfice"];
  },
  prix_revient_vente_benefice_tpl_3: (q) => {
    const [r, v] = lus(q);
    return v < r && v > 0 ? montant(q, r - v) : ["vente sans perte"];
  },
  prix_revient_vente_benefice_tpl_4: (q) => {
    const [r, v] = lus(q);
    const u = unite(q);
    const e = new RegExp(`^(Un bénéfice|Une perte) de ([\\d ]+) ${u}$`).exec(net_(String(q.expected[0])));
    if (!e) return [`attendu illisible : ${q.expected[0]}`];
    const p: string[] = [];
    if ((e[1] === "Un bénéfice") !== v > r) p.push(`sens faux : revient ${r}, vente ${v}`);
    if (!egal(nombre(e[2]), Math.abs(v - r))) p.push(`écart faux : ${e[2]}`);
    return [...p, ...unique(q, (c) => c === q.expected[0])];
  },
  prix_revient_vente_benefice_tpl_5: (q) => {
    const [a, f, v] = lus(q);
    return v > a + f ? montant(q, v - a - f) : ["vente sans bénéfice"];
  },
  prix_revient_vente_benefice_tpl_6: (q) => {
    const [a, f, d] = lus(q);
    return montant(q, /perte/i.test(q.text) ? a + f - d : a + f + d);
  },
  prix_revient_vente_benefice_tpl_7: (q) => {
    const [r, f] = lus(q);
    return montant(q, r - f);
  },
  prix_revient_vente_benefice_tpl_8: (q) => {
    const [x, y] = lus(q);
    // Une seule tournure cite l'écart avant la vente.
    const [V, D] = /pour une vente de/.test(net_(q.text)) ? [y, x] : [x, y];
    return montant(q, gagne(q) ? V - D : V + D);
  },
  prix_revient_vente_benefice_tpl_9: (q) => {
    const n = Number(net_(q.text).match(/achète (\d+) /)?.[1]);
    const [p, f, v] = lus(q);
    return v > n * p + f ? montant(q, v - n * p - f) : ["lot sans bénéfice"];
  },
  prix_revient_vente_benefice_tpl_10: (q) => {
    const n = Number(net_(q.text).match(/lot de (\d+) /)?.[1]);
    const [a, f] = lus(q);
    return a > 0 ? montant(q, (a + f) / n) : ["lot gratuit"];
  },
  prix_revient_vente_benefice_tpl_11: (q) => {
    const [a] = lus(q);
    return montant(q, a * (1 + taux(q) / 100));
  },
  prix_revient_vente_benefice_tpl_12: (q) => {
    const [r, u] = lus(q);
    return reponse(q, r / u);
  },

  /* intérêt */
  interet_simple_tpl_1: (q) => montant(q, (lus(q)[0] * taux(q)) / 100),
  interet_simple_tpl_2: (q) => {
    const [c, i] = lus(q);
    return montant(q, c + i);
  },
  interet_simple_tpl_3: (q) => montant(q, lus(q)[0] * ans(q)),
  interet_simple_tpl_4: (q) => {
    const [c, i] = lus(q);
    const t = net_(q.text);
    const p: string[] = [];
    if (!egal((c * taux(q) * ans(q)) / 100, i)) p.push("placement incohérent");
    const u = unite(q);
    const juste = /le capital/.test(t) ? c : /l['’]intérêt/.test(t) ? i : null;
    const e = net_(String(q.expected[0]));
    if (juste !== null && (!e.endsWith(u) || !egal(nombre(e.replace(u, "").trim()), juste))) p.push(`attendu ${e}, juste ${juste} ${u}`);
    if (/le taux/.test(t) && e !== `${taux(q)} %`) p.push(`attendu ${e}, taux ${taux(q)}`);
    if (/la durée/.test(t) && e !== `${ans(q)} ans`) p.push(`attendu ${e}, durée ${ans(q)}`);
    return [...p, ...unique(q, (x) => x === q.expected[0])];
  },
  interet_simple_tpl_5: (q) => montant(q, (lus(q)[0] * taux(q) * ans(q)) / 100),
  interet_simple_tpl_6: (q) => montant(q, (lus(q)[0] * taux(q) * mois(q)) / 1200),
  interet_simple_tpl_7: (q) => {
    // L'intérêt d'un an, à 10 % au plus, est toujours le plus petit des deux montants.
    const c = Math.max(...lus(q));
    const i = Math.min(...lus(q));
    return texte(q, `${net((i * 100) / c)} %`);
  },
  interet_simple_tpl_8: (q) => montant(q, (lus(q)[0] * 100) / taux(q)),
  interet_simple_tpl_9: (q) => {
    const [c, i] = lus(q);
    return texte(q, `${net((i * 100) / (c * taux(q)))} ans`);
  },
  interet_simple_tpl_10: (q) => {
    const [c] = lus(q);
    return montant(q, c + (c * taux(q) * ans(q)) / 100);
  },
  interet_simple_tpl_11: (q) => {
    const t = net_(q.text);
    const a = t.match(/Placement A : (\d+) % par an pendant (\d+) ans/);
    const b = t.match(/Placement B : (\d+) % par an pendant (\d+) ans/);
    if (!a || !b) return ["placements illisibles"];
    const A = Number(a[1]) * Number(a[2]);
    const B = Number(b[1]) * Number(b[2]);
    return texte(q, A === B ? "Les deux rapportent autant" : A > B ? "Le placement A" : "Le placement B");
  },
  interet_simple_tpl_12: (q) => {
    const [c] = lus(q);
    return montant(q, c + (c * taux(q) * mois(q)) / 1200);
  },

  /* facture */
  facture_tva_tpl_1: (q) => {
    const l = lignes(q).find((x) => x[3] === "?");
    return l ? [...lignesSaines(q), ...montant(q, nb(l[1]) * nb(l[2]))] : ["pas de case « ? »"];
  },
  facture_tva_tpl_2: (q) => (tab(q).at(-1)?.[3] === "?" ? [...lignesSaines(q), ...montant(q, sommeMontants(lignes(q)))] : ["pas de total à trouver"]),
  facture_tva_tpl_3: (q) => {
    const [h, t] = lus(q);
    return montant(q, h + t);
  },
  facture_tva_tpl_4: (q) => {
    const [h, t] = lus(q);
    return t > h ? montant(q, t - h) : ["TTC sous le HT"];
  },
  facture_tva_tpl_5: (q) => montant(q, (lus(q)[0] * taux(q)) / 100),
  facture_tva_tpl_6: (q) => montant(q, lus(q)[0] * (1 + taux(q) / 100)),
  facture_tva_tpl_7: (q) => {
    const t = net_(q.text);
    const c = Number(t.match(/(\d+) (?:kWh|m³)/)?.[1]);
    const [pu, ab] = lus(q);
    return montant(q, c * pu + ab);
  },
  facture_tva_tpl_8: (q) => {
    const l = lignes(q).find((x) => x[1] === "?");
    return l ? [...lignesSaines(q), ...reponse(q, nb(l[3]) / nb(l[2]))] : ["pas de case « ? »"];
  },
  facture_tva_tpl_9: (q) => {
    const t = net_(q.text);
    const n = [...t.matchAll(/(?:commande |et )(\d+) /g)].map((x) => Number(x[1]));
    const [p1, p2] = lus(q);
    return n.length === 2 ? montant(q, (n[0] * p1 + n[1] * p2) * (1 - taux(q) / 100)) : ["quantités illisibles"];
  },
  facture_tva_tpl_10: (q) => montant(q, (lus(q)[0] * 100) / (100 + taux(q))),
  facture_tva_tpl_11: (q) => {
    const n = Number(net_(q.text).match(/(?:commande|achète) (\d+) /)?.[1]);
    return montant(q, n * lus(q)[0] * (1 + taux(q) / 100));
  },
  facture_tva_tpl_12: (q) => {
    const l = lignes(q);
    const S = sommeMontants(l);
    const A = nb(tab(q).at(-1)![3]);
    const u = unite(q);
    const f = (x: number) => (x >= 1000 ? String(x).replace(/\B(?=(\d{3})+(?!\d))/g, " ") : String(x));
    const juste = A === S ? "Oui, le total est juste" : A > S ? `Non, il y a ${f(A - S)} ${u} de trop` : `Non, il manque ${f(S - A)} ${u}`;
    return [...lignesSaines(q), ...texte(q, juste)];
  },
});
