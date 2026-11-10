// PRIX D'ACHAT, DE REVIENT, DE VENTE, BÉNÉFICE, PERTE ; INTÉRÊT ; FACTURE ET TVA (06/11/2026).
//
// Belgique, Sénégal, Côte d'Ivoire. Hors programme français : micros masquées
// (`lib/tutor-v4/micros-masquees.ts`). ⛔ CM : aucune question ouverte. ★1-★2 sans contexte.
// La monnaie est tirée entre l'euro et le franc CFA : les montants en F CFA sont des
// multiples de 50, le correcteur relit les nombres et l'unité dans le texte.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, eur, exp, fr, gabarits, net, qcm, qcmN, un, v } from "./trous-outils";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

/* ───────────────────────── la monnaie et l'écriture ───────────────────────── */

type Monnaie = { u: string; k: number };
/** `k` : ce que vaut, dans cette monnaie, un « pas » de calcul. */
const monnaie = (): Monnaie => un([{ u: "€", k: 1 }, { u: "€", k: 1 }, { u: "F CFA", k: 250 }, { u: "F CFA", k: 500 }, { u: "F CFA", k: 1000 }]);
/** La conclusion reprend le choix sans sa majuscule de tête : « F CFA » et « A » restent en capitales. */
const minuscule1 = (t: string) => t.charAt(0).toLowerCase() + t.slice(1);
const nb = (x: number) => (Number.isInteger(net(x)) ? fr(x) : eur(x));
/** Un montant lisible : jamais coupé en bout de ligne. */
const ms = (x: number, m: Monnaie) => `${nb(x)} ${m.u}`;
const ins = (t: string) => t.replace(/(\d) (?=\d{3}(?!\d))/g, "$1 ").replace(/(\d) (?=€|F CFA|%|ans?\b|mois\b|kWh|m³)/g, "$1 ").replace(/F CFA/g, "F CFA").replace(/\bde emballage/g, "d'emballage");
const q = (juste: number, faux: readonly number[], explication: string, texte: string, m: Monnaie, canvas?: CanvasFigure) => qcmN(juste, faux.filter((f) => f > 0), explication, ins(texte), canvas, m.u);
const qt = (juste: string, faux: readonly string[], explication: string, texte: string, canvas?: CanvasFigure) => qcm(juste, faux, explication, ins(texte), canvas);

/* ───────────────────────── prix_revient_vente_benefice ───────────────────────── */

const rv = gabarits("prix_revient_vente_benefice", "calculs_commerciaux", ["commerce"]);
const FRAIS = ["transport", "livraison", "douane", "emballage", "stockage", "manutention", "réparation", "port"];
const achat = (m: Monnaie) => entre(6, 90) * 10 * m.k;
const petit = (m: Monnaie) => entre(2, 20) * 5 * m.k;
const DEF_R = "le prix de revient, c'est le prix d'achat plus les frais.";
const DEF_B = "bénéfice = prix de vente − prix de revient, quand on vend plus cher que ce que l'objet a coûté. Sinon, c'est une perte : prix de revient − prix de vente.";

export const prixRevientVenteBeneficeBank: TutorBankItemV4[] = [
  rv(1, "Prix de revient = prix d'achat + frais.", () => {
    const m = monnaie();
    const A = achat(m);
    const F = petit(m);
    const f = un(FRAIS);
    const [a, b] = [ms(A, m), ms(F, m)];
    return q(A + F, [A - F, A, F, A + 2 * F, A + F + 10 * m.k], exp(DEF_R, "on ajoute les frais au prix d'achat.", `${a} + ${b} = ${ms(A + F, m)}.`, `le prix de revient est ${ms(A + F, m)}.`), v([
      `Prix d'achat : ${a}. Frais de ${f} : ${b}. Quel est le prix de revient ?`,
      `Un article est acheté ${a}, avec ${b} de frais de ${f}. Quel est son prix de revient ?`,
      `Achat : ${a}. Frais de ${f} : ${b}. Calcule le prix de revient.`,
      `On achète un objet ${a} et on paie ${b} de ${f}. Combien revient-il ?`,
      `Un objet coûte ${a} à l'achat et ${b} de ${f}. Trouve son prix de revient.`,
      `Prix d'achat ${a}, frais de ${f} ${b} : quel est le prix de revient ?`,
      `Un objet acheté ${a} entraîne ${b} de frais de ${f}. À combien revient-il ?`,
      `Quel est le prix de revient d'un article acheté ${a}, avec ${b} de ${f} ?`,
    ]), m);
  }),
  rv(1, "Bénéfice = prix de vente − prix de revient.", () => {
    const m = monnaie();
    const R = achat(m);
    const B = petit(m);
    const V = R + B;
    const [r, w] = [ms(R, m), ms(V, m)];
    return q(B, [R + V, V, R, B + 10 * m.k, B + 5 * m.k], exp(DEF_B, "on enlève le prix de revient du prix de vente.", `${w} − ${r} = ${ms(B, m)}.`, `le bénéfice est ${ms(B, m)}.`), v([
      `Prix de revient : ${r}. Prix de vente : ${w}. Quel est le bénéfice ?`,
      `Un article revient à ${r} et se vend ${w}. Quel est le bénéfice ?`,
      `Un objet revient à ${r}. Il est vendu ${w}. Combien rapporte la vente ?`,
      `Calcule le bénéfice : prix de revient ${r}, prix de vente ${w}.`,
      `Revient : ${r}. Vente : ${w}. Quel bénéfice fait-on ?`,
      `Un objet qui revient à ${r} est revendu ${w}. Trouve le bénéfice.`,
      `On gagne combien sur un article qui revient à ${r} et se vend ${w} ?`,
      `Quel est le bénéfice sur un objet de prix de revient ${r}, vendu ${w} ?`,
    ]), m);
  }),
  rv(1, "Perte = prix de revient − prix de vente.", () => {
    const m = monnaie();
    const R = achat(m);
    const P = Math.min(petit(m), R - 10 * m.k);
    const V = R - P;
    const [r, w] = [ms(R, m), ms(V, m)];
    return q(P, [R + V, V, R, P + 10 * m.k, P + 5 * m.k], exp(DEF_B, "on vend moins cher que le prix de revient : on enlève le prix de vente du prix de revient.", `${r} − ${w} = ${ms(P, m)}.`, `la perte est ${ms(P, m)}.`), v([
      `Prix de revient : ${r}. Prix de vente : ${w}. Quelle est la perte ?`,
      `Un article revient à ${r} et se vend ${w}. Quelle est la perte ?`,
      `Un objet revient à ${r}. Il est soldé ${w}. Combien perd-on ?`,
      `Calcule la perte : prix de revient ${r}, prix de vente ${w}.`,
      `Revient : ${r}. Vente : ${w}. Quelle perte fait-on ?`,
      `Un objet qui revient à ${r} est revendu ${w}. Trouve la perte.`,
      `On perd combien sur un article qui revient à ${r} et se vend ${w} ?`,
      `Quelle est la perte sur un objet de prix de revient ${r}, vendu ${w} ?`,
    ]), m);
  }),
  rv(1, "Vendu plus cher que le prix de revient : bénéfice. Moins cher : perte.", () => {
    const m = monnaie();
    const R = achat(m);
    const d = Math.min(petit(m), R - 10 * m.k);
    const gagne = Math.random() < 0.5;
    const V = gagne ? R + d : R - d;
    const [r, w, e] = [ms(R, m), ms(V, m), ms(d, m)];
    const juste = gagne ? `Un bénéfice de ${e}` : `Une perte de ${e}`;
    return qt(juste, [gagne ? `Une perte de ${e}` : `Un bénéfice de ${e}`, `Un bénéfice de ${ms(R + V, m)}`, `Une perte de ${ms(R + V, m)}`, "Ni bénéfice ni perte"], exp(DEF_B, "on compare le prix de vente et le prix de revient, puis on calcule l'écart.", `l'écart entre ${r} et ${w} est ${e}.`, `${minuscule1(juste)}.`), v([
      `Prix de revient : ${r}. Prix de vente : ${w}. Que fait-on ?`,
      `Un article revient à ${r} et se vend ${w}. Que fait-on sur cette vente ?`,
      `Revient : ${r}. Vente : ${w}. Bénéfice ou perte ?`,
      `Un objet qui revient à ${r} est revendu ${w}. Choisis ce qui est vrai.`,
      `Bénéfice ou perte, et de combien ? Prix de revient ${r}, prix de vente ${w}.`,
      `Sur un objet de prix de revient ${r}, vendu ${w}, que fait le vendeur ?`,
      `Un objet revient à ${r}, puis on le vend ${w}. Quel est le résultat ?`,
      `Choisis le résultat de la vente : revient ${r}, vente ${w}.`,
    ]));
  }),

  rv(2, "D'abord le prix de revient, puis le bénéfice.", () => {
    const m = monnaie();
    const A = achat(m);
    const F = petit(m);
    const B = petit(m);
    const V = A + F + B;
    const f = un(FRAIS);
    const [a, b, w] = [ms(A, m), ms(F, m), ms(V, m)];
    return q(B, [B + F, V - F, A + F, V, B + 2 * F], exp(DEF_B, "on calcule le prix de revient, puis on l'enlève du prix de vente.", `${a} + ${b} = ${ms(A + F, m)} ; ${w} − ${ms(A + F, m)} = ${ms(B, m)}.`, `le bénéfice est ${ms(B, m)}.`), v([
      `Achat : ${a}. Frais de ${f} : ${b}. Vente : ${w}. Quel est le bénéfice ?`,
      `Un objet acheté ${a}, avec ${b} de frais de ${f}, est vendu ${w}. Quel est le bénéfice ?`,
      `Prix d'achat ${a}, frais de ${f} ${b}, prix de vente ${w} : calcule le bénéfice.`,
      `On achète ${a}, on paie ${b} de ${f}, on revend ${w}. Combien gagne-t-on ?`,
      `Trouve le bénéfice : achat ${a}, ${f} ${b}, vente ${w}.`,
      `Un article coûte ${a}, plus ${b} de ${f}. Il se vend ${w}. Quel bénéfice fait-on ?`,
      `Un objet acheté ${a} coûte encore ${b} de ${f}. Revendu ${w}, que rapporte-t-il ?`,
      `Quel bénéfice sur un objet acheté ${a}, ${f} ${b}, et revendu ${w} ?`,
    ]), m);
  }),
  rv(2, "Prix de vente = prix de revient + bénéfice, ou prix de revient − perte.", () => {
    const m = monnaie();
    const A = achat(m);
    const F = petit(m);
    const gagne = Math.random() < 0.5;
    const D = Math.min(petit(m), A);
    const V = gagne ? A + F + D : A + F - D;
    const mot = gagne ? "bénéfice" : "perte";
    const f = un(FRAIS);
    const [a, b, d] = [ms(A, m), ms(F, m), ms(D, m)];
    return q(V, [gagne ? A + F - D : A + F + D, A + D, A + F, gagne ? A + D - F : A - D - F], exp(DEF_B, gagne ? "un bénéfice s'ajoute au prix de revient." : "une perte s'enlève du prix de revient.", `${a} + ${b} = ${ms(A + F, m)} ; ${gagne ? `${ms(A + F, m)} + ${d}` : `${ms(A + F, m)} − ${d}`} = ${ms(V, m)}.`, `le prix de vente est ${ms(V, m)}.`), v([
      `Achat : ${a}. Frais de ${f} : ${b}. ${gagne ? "Bénéfice" : "Perte"} : ${d}. Quel est le prix de vente ?`,
      `Un objet acheté ${a}, avec ${b} de ${f}, laisse ${gagne ? "un bénéfice" : "une perte"} de ${d}. À quel prix est-il vendu ?`,
      `Prix d'achat ${a}, frais de ${f} ${b}, ${mot} ${d} : trouve le prix de vente.`,
      `On achète ${a}, on paie ${b} de ${f}. La vente laisse ${gagne ? "un bénéfice" : "une perte"} de ${d}. Quel est le prix de vente ?`,
      `Calcule le prix de vente : achat ${a}, ${f} ${b}, ${mot} ${d}.`,
      `Un article coûte ${a} et ${b} de ${f}. ${gagne ? "On veut un bénéfice" : "On accepte une perte"} de ${d}. À combien le vendre ?`,
      `À quel prix vend-on un objet acheté ${a}, ${f} ${b}, avec ${gagne ? "un bénéfice" : "une perte"} de ${d} ?`,
      `Achat ${a}, ${f} ${b}, ${mot} ${d} : quel est le prix de vente ?`,
    ]), m);
  }),
  rv(2, "Prix d'achat = prix de revient − frais.", () => {
    const m = monnaie();
    const A = achat(m);
    const F = petit(m);
    const R = A + F;
    const f = un(FRAIS);
    const [r, b] = [ms(R, m), ms(F, m)];
    return q(A, [R + F, F, R, A - F], exp(DEF_R, "on enlève les frais du prix de revient.", `${r} − ${b} = ${ms(A, m)}.`, `le prix d'achat est ${ms(A, m)}.`), v([
      `Prix de revient : ${r}. Frais de ${f} : ${b}. Quel est le prix d'achat ?`,
      `Un objet revient à ${r}, dont ${b} de ${f}. Quel était son prix d'achat ?`,
      `Un article revient à ${r}. Les frais de ${f} sont de ${b}. Trouve le prix d'achat.`,
      `Revient : ${r}. Frais de ${f} : ${b}. Combien l'objet a-t-il été acheté ?`,
      `Calcule le prix d'achat : prix de revient ${r}, ${f} ${b}.`,
      `Le prix de revient est ${r}. Il comprend ${b} de ${f}. Quel est le prix d'achat ?`,
      `Sur un prix de revient de ${r}, il y a ${b} de ${f}. Que vaut le prix d'achat ?`,
      `À quel prix a-t-on acheté un objet qui revient à ${r}, avec ${b} de ${f} ?`,
    ]), m);
  }),
  rv(2, "Bénéfice : on retire. Perte : on ajoute.", () => {
    const m = monnaie();
    const V = achat(m);
    const D = Math.min(petit(m), V - 10 * m.k);
    const gagne = Math.random() < 0.5;
    const R = gagne ? V - D : V + D;
    const [w, d] = [ms(V, m), ms(D, m)];
    return q(R, [gagne ? V + D : V - D, D, V, R + 10 * m.k], exp(DEF_B, gagne ? "le prix de vente contient le bénéfice : on l'enlève." : "le prix de vente est plus petit que le prix de revient : on ajoute la perte.", `${gagne ? `${w} − ${d}` : `${w} + ${d}`} = ${ms(R, m)}.`, `le prix de revient est ${ms(R, m)}.`), v([
      `Prix de vente : ${w}. ${gagne ? "Bénéfice" : "Perte"} : ${d}. Quel est le prix de revient ?`,
      `Un objet vendu ${w} laisse ${gagne ? "un bénéfice" : "une perte"} de ${d}. Combien revenait-il ?`,
      `Vente : ${w}. ${gagne ? "Bénéfice" : "Perte"} : ${d}. Trouve le prix de revient.`,
      `Calcule le prix de revient : vente ${w}, ${gagne ? "bénéfice" : "perte"} ${d}.`,
      `On revend ${w} et on ${gagne ? "gagne" : "perd"} ${d}. À combien revenait l'objet ?`,
      `Un article se vend ${w}, avec ${gagne ? "un bénéfice" : "une perte"} de ${d}. Quel est son prix de revient ?`,
      `Quel est le prix de revient d'un objet vendu ${w}, avec ${gagne ? "un bénéfice" : "une perte"} de ${d} ?`,
      `${gagne ? "Bénéfice" : "Perte"} de ${d} pour une vente de ${w} : que vaut le prix de revient ?`,
    ]), m);
  }),

  rv(3, "Calcule le coût de tout le lot, frais compris, puis compare à la vente.", () => {
    const m = monnaie();
    const C = un([
      { q: "Une fleuriste", o: "bouquets", f: "livraison" }, { q: "Un libraire", o: "atlas", f: "port" }, { q: "Une coopérative", o: "sacs de riz", f: "transport" },
      { q: "Un vendeur de vélos", o: "vélos", f: "transport" }, { q: "Une couturière", o: "coupons de tissu", f: "livraison" }, { q: "Un luthier", o: "violons d'étude", f: "douane" },
      { q: "Une pépiniériste", o: "arbres fruitiers", f: "transport" }, { q: "Un club de sport", o: "maillots", f: "livraison" }, { q: "Une informaticienne", o: "claviers", f: "port" },
      { q: "Un apiculteur", o: "ruches", f: "transport" }, { q: "Une disquaire", o: "guitares", f: "douane" }, { q: "Un primeur", o: "cageots de letchis", f: "transport" },
    ]);
    const n = entre(3, 12);
    const p = entre(2, 12) * 5 * m.k;
    const F = petit(m);
    const B = petit(m);
    const pv = n * p + F + B;
    const [up, uf, uv] = [ms(p, m), ms(F, m), ms(pv, m)];
    return q(B, [pv - n * p, B + F, n * p + F, pv - p - F, B + 2 * F], exp(DEF_B, "le prix de revient du lot = nombre × prix d'un objet + frais.", `${n} × ${up} = ${ms(n * p, m)} ; ${ms(n * p, m)} + ${uf} = ${ms(n * p + F, m)} ; ${uv} − ${ms(n * p + F, m)} = ${ms(B, m)}.`, `le bénéfice est ${ms(B, m)}.`), `${C.q} achète ${n} ${C.o} à ${up} l'un et paie ${uf} de ${C.f}. Le lot est revendu ${uv} au total. ${v(["Quel est le bénéfice ?", "Combien gagne-t-on sur ce lot ?", "Que rapporte cette vente ?", "Quel est le bénéfice sur le lot ?"])}`, m);
  }),
  rv(3, "Le lot, frais compris, partagé par le nombre d'objets.", () => {
    const m = monnaie();
    const C = un([
      { t: "Un marchand de fruits", o: "cageots" }, { t: "Une boulangère", o: "sacs de farine" }, { t: "Un jardinier", o: "sacs de terreau" }, { t: "Une libraire", o: "cartons de livres" },
      { t: "Un électricien", o: "rouleaux de câble" }, { t: "Une couturière", o: "bobines" }, { t: "Un pêcheur", o: "filets" }, { t: "Une musicienne", o: "jeux de cordes" },
      { t: "Une peintre", o: "pots de peinture" }, { t: "Un maçon", o: "sacs de ciment" },
    ]);
    const n = un([4, 5, 8, 10, 20, 25]);
    const r = entre(8, 40) * 5 * m.k;
    const R = n * r;
    const F = Math.max(n, 5) * 5 * m.k * entre(1, 4);
    const A = R - F;
    const [a, b] = [ms(A, m), ms(F, m)];
    return q(r, [A / n, F / n, r + 5 * m.k, R, r - 5 * m.k], exp(DEF_R, "on ajoute les frais au prix du lot, puis on partage par le nombre d'objets.", `${a} + ${b} = ${ms(R, m)} ; ${ms(R, m)} ÷ ${n} = ${ms(r, m)}.`, `chacun revient à ${ms(r, m)}.`), `${C.t} achète un lot de ${n} ${C.o} pour ${a}. Les frais sont de ${b}. ${v(["Combien revient un seul objet du lot ?", "Quel est le prix de revient de chacun ?", "À combien revient chaque objet ?", "Quel est le prix de revient d'un seul ?"])}`, m);
  }),
  rv(3, "Le bénéfice est une part du prix d'achat : calcule-la, puis ajoute.", () => {
    const m = monnaie();
    const C = un(["Un commerçant", "Une commerçante", "Une coopérative de femmes", "Un brocanteur", "Une brocanteuse", "Un revendeur", "Une revendeuse", "Un marchand", "Une marchande", "Une gérante de boutique"]);
    const O = un(["une table", "un lot de chaises", "un vélo", "un lot de vases", "une armoire", "un tapis", "un lot de pots", "une guitare"]);
    const t = un([10, 20, 25, 50]);
    const A = entre(1, 20) * 20 * m.k;
    const B = (A * t) / 100;
    const [a, p] = [ms(A, m), `${t} %`];
    return q(A + B, [A - B, B, A + t * m.k, A + 2 * B, A], exp(DEF_B, "on calcule le pourcentage du prix d'achat, puis on l'ajoute.", `${t} % de ${a} = ${ms(B, m)} ; ${a} + ${ms(B, m)} = ${ms(A + B, m)}.`, `le prix de vente est ${ms(A + B, m)}.`), `${C} achète ${O} ${a} et veut gagner ${p} du prix d'achat. ${v(["À quel prix doit se faire la vente ?", "Quel sera le prix de vente ?", "Quel prix de vente faut-il afficher ?", "À combien faut-il revendre ?"])}`, m);
  }),
  rv(3, "Combien de fois le prix de vente dans le prix de revient ?", () => {
    const m = monnaie();
    const C = un([
      { t: "Une équipe de basket", o: "gourdes" }, { t: "Une chorale", o: "programmes" }, { t: "Une classe", o: "calendriers" }, { t: "Un club de danse", o: "billets" }, { t: "Une association de pêcheurs", o: "tee-shirts" },
      { t: "Un groupe de musiciens", o: "disques" }, { t: "Un club de théâtre", o: "affiches" }, { t: "Une association de jardiniers", o: "plants" }, { t: "Une école de judo", o: "casquettes" }, { t: "Une fanfare", o: "badges" },
    ]);
    const n = entre(8, 40);
    const u = entre(1, 8) * 5 * m.k;
    const R = n * u;
    return qcmN(n, [n + 1, n - 1, n + 5, n * 2, Math.round(n / 2)], exp("sans perte, le montant des ventes doit égaler le prix de revient.", "on divise le prix de revient par le prix de vente d'un objet.", `${ms(R, m)} ÷ ${ms(u, m)} = ${n}.`, `il faut en vendre ${n}.`), ins(`${C.t} a payé ${ms(R, m)} pour ses ${C.o}. Chacun se vend ${ms(u, m)}. ${v(["Combien faut-il en vendre pour ne rien perdre ?", "Combien de ventes remboursent la dépense ?", "À partir de combien de ventes ne perd-on plus ?", "Combien de ventes faut-il au minimum pour couvrir le prix de revient ?"])}`));
  }),
];

/* ───────────────────────── interet_simple ───────────────────────── */

const is_ = gabarits("interet_simple", "calculs_commerciaux", ["commerce", "interet"]);
const TAUX = [2, 3, 4, 5, 6, 8, 10];
const DEF_I = "le capital est la somme placée ; le taux dit ce qu'elle rapporte, en %, chaque année ; l'intérêt est ce qu'elle rapporte.";
/** Un capital dont les intérêts annuels tombent juste, en euros ou en F CFA. */
const capital = () => {
  const m: Monnaie = un([{ u: "€", k: 1 }, { u: "F CFA", k: 500 }]);
  return { m, C: entre(2, 40) * 100 * m.k };
};
/** Un capital divisible par 1 200, pour un placement en mois. */
const capitalMois = () => {
  const m: Monnaie = un([{ u: "€", k: 1 }, { u: "F CFA", k: 50 }]);
  return { m, C: entre(1, 10) * 1200 * m.k };
};

export const interetSimpleBank: TutorBankItemV4[] = [
  is_(1, "Intérêt d'un an = capital × taux ÷ 100.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const I = (C * t) / 100;
    const c = ms(C, m);
    return q(I, [C + I, C - I, I * 10, I * 2, I * 5], exp(DEF_I, "on prend le pourcentage du capital.", `${c} × ${t} ÷ 100 = ${ms(I, m)}.`, `l'intérêt d'un an est ${ms(I, m)}.`), v([
      `Capital : ${c}. Taux : ${t} % par an. Quel est l'intérêt en un an ?`,
      `On place ${c} à ${t} % par an. Quel intérêt rapporte ce placement en un an ?`,
      `Calcule l'intérêt d'un an : capital ${c}, taux ${t} %.`,
      `Un capital de ${c} est placé à ${t} %. Combien rapporte-t-il en un an ?`,
      `Quel est l'intérêt annuel de ${c} placés à ${t} % ?`,
      `Placement de ${c} au taux de ${t} %. Trouve l'intérêt pour un an.`,
      `${c} placés à ${t} % par an : que vaut l'intérêt au bout d'un an ?`,
      `Au taux annuel de ${t} %, combien rapporte un capital de ${c} en un an ?`,
    ]), m);
  }),
  is_(1, "Au bout du placement, on a le capital et l'intérêt.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const I = (C * t) / 100;
    const [c, i] = [ms(C, m), ms(I, m)];
    return q(C + I, [C - I, I, C, C + 2 * I], exp(DEF_I, "on ajoute l'intérêt au capital.", `${c} + ${i} = ${ms(C + I, m)}.`, `on dispose de ${ms(C + I, m)}.`), v([
      `Capital : ${c}. Intérêt : ${i}. Quelle somme a-t-on à la fin ?`,
      `On place ${c}. L'intérêt est de ${i}. De combien dispose-t-on à la fin ?`,
      `Un capital de ${c} rapporte ${i}. Quelle somme récupère-t-on ?`,
      `Capital placé ${c}, intérêt ${i} : quelle est la somme finale ?`,
      `${c} placés rapportent ${i}. Combien a-t-on en tout ?`,
      `Calcule la somme finale : capital ${c}, intérêt ${i}.`,
      `Après un placement de ${c}, l'intérêt vaut ${i}. Que retire-t-on de la banque ?`,
      `Quelle somme retire-t-on si le capital est ${c} et l'intérêt ${i} ?`,
    ]), m);
  }),
  is_(1, "Le même intérêt revient chaque année : on multiplie.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const I = (C * t) / 100;
    const n = entre(2, 6);
    const i = ms(I, m);
    return q(n * I, [I, I + n, (n + 1) * I, (n - 1) * I, 2 * n * I], exp(DEF_I, "chaque année rapporte le même intérêt : on multiplie par le nombre d'années.", `${i} × ${n} = ${ms(n * I, m)}.`, `l'intérêt total est ${ms(n * I, m)}.`), v([
      `Un placement rapporte ${i} par an. Combien rapporte-t-il en ${n} ans ?`,
      `Intérêt d'un an : ${i}. Quel est l'intérêt de ${n} ans ?`,
      `Chaque année, l'intérêt est de ${i}. Que vaut l'intérêt total sur ${n} ans ?`,
      `Intérêt annuel ${i}, durée ${n} ans : calcule l'intérêt total.`,
      `Un capital rapporte ${i} chaque année. Quel intérêt après ${n} ans ?`,
      `Sur ${n} ans, à ${i} par an, combien d'intérêts touche-t-on ?`,
      `Trouve l'intérêt de ${n} ans, si une année rapporte ${i}.`,
      `Quel intérêt en ${n} ans, avec ${i} par an ?`,
    ]), m);
  }),
  is_(1, "Capital = somme placée ; taux = le % ; intérêt = ce que ça rapporte ; durée = le temps du placement.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const n = entre(2, 6);
    const I = (C * t * n) / 100;
    const [c, i] = [ms(C, m), ms(I, m)];
    const taux = `${t} %`;
    const duree = `${n} ans`;
    const Q = un([
      { mot: "le capital", j: c }, { mot: "le taux", j: taux }, { mot: "l'intérêt", j: i }, { mot: "la durée", j: duree },
    ]);
    const tous = [c, taux, i, duree];
    return qt(Q.j, tous.filter((x) => x !== Q.j), exp(DEF_I, "on reconnaît chaque mot dans la phrase.", `capital ${c}, taux ${taux}, durée ${duree}, intérêt ${i}.`, `${Q.mot} : ${Q.j}.`), v([
      `On place ${c} à ${taux} pendant ${duree}, et on gagne ${i}. Quel nombre donne ${Q.mot} ?`,
      `${c} placés à ${taux} rapportent ${i} en ${duree}. Lequel est ${Q.mot} ?`,
      `Un placement de ${c}, au taux de ${taux}, sur ${duree}, rapporte ${i}. Quelle est la valeur de ${Q.mot} ?`,
      `Banque : ${c} déposés, ${taux} par an, ${duree}, gain de ${i}. Que vaut ${Q.mot} ?`,
      `Quand ${c} sont placés ${duree} à ${taux}, ils rapportent ${i}. Choisis ${Q.mot}.`,
      `Dans ce placement, trouve ${Q.mot} : ${c}, ${taux}, ${duree}, ${i} de gain.`,
    ]).replace(/Lequel est le taux/, "Quel est le taux").replace(/Lequel est l'intérêt/, "Quel est l'intérêt").replace(/Lequel est la durée/, "Quelle est la durée").replace(/Lequel est le capital/, "Quel est le capital"));
  }),

  is_(2, "Intérêt = capital × taux ÷ 100 × nombre d'années.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const n = entre(2, 6);
    const I = (C * t) / 100;
    const c = ms(C, m);
    return q(n * I, [I, C + n * I, (n + 1) * I, (n - 1) * I, C * t / 10], exp(DEF_I, "on calcule l'intérêt d'un an, puis on multiplie par le nombre d'années.", `${c} × ${t} ÷ 100 = ${ms(I, m)} ; ${ms(I, m)} × ${n} = ${ms(n * I, m)}.`, `l'intérêt est ${ms(n * I, m)}.`), v([
      `Capital : ${c}. Taux : ${t} %. Durée : ${n} ans. Quel est l'intérêt ?`,
      `On place ${c} à ${t} % par an pendant ${n} ans. Quel est l'intérêt ?`,
      `Calcule l'intérêt de ${c} placés ${n} ans à ${t} %.`,
      `${c} placés à ${t} % : que rapportent-ils en ${n} ans ?`,
      `Un capital de ${c}, un taux de ${t} %, une durée de ${n} ans : combien d'intérêt ?`,
      `Quel intérêt donne un placement de ${c} à ${t} % sur ${n} ans ?`,
      `Trouve l'intérêt : ${c}, ${t} % par an, ${n} ans.`,
      `Combien rapportent ${c} placés à ${t} % durant ${n} ans ?`,
    ]), m);
  }),
  is_(2, "Une année a 12 mois : on prend la part de l'intérêt annuel.", () => {
    const { m, C } = capitalMois();
    const t = un([2, 3, 4, 5, 6, 8, 10]);
    const d = un([2, 3, 4, 6, 8, 9, 10]);
    const I = (C * t * d) / 1200;
    const A = (C * t) / 100;
    const c = ms(C, m);
    return q(I, [A, A / 12, C + I, I * 2, A + I], exp(DEF_I, "on calcule l'intérêt d'un an, on le divise par 12, puis on multiplie par le nombre de mois.", `${c} × ${t} ÷ 100 = ${ms(A, m)} ; ${ms(A, m)} ÷ 12 × ${d} = ${ms(I, m)}.`, `l'intérêt est ${ms(I, m)}.`), v([
      `Capital : ${c}. Taux : ${t} % par an. Durée : ${d} mois. Quel est l'intérêt ?`,
      `On place ${c} à ${t} % par an pendant ${d} mois. Quel est l'intérêt ?`,
      `Calcule l'intérêt de ${c} placés ${d} mois, au taux annuel de ${t} %.`,
      `${c} placés à ${t} % par an : que rapportent-ils en ${d} mois ?`,
      `Quel intérêt donne un placement de ${c} à ${t} % par an sur ${d} mois ?`,
      `Trouve l'intérêt : ${c}, ${t} % par an, ${d} mois.`,
      `Combien rapportent ${c} placés au taux annuel de ${t} %, durant ${d} mois ?`,
      `Un capital de ${c} reste ${d} mois à ${t} % par an. Quel intérêt touche-t-on ?`,
    ]), m);
  }),
  is_(2, "Taux = intérêt d'un an × 100 ÷ capital.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const I = (C * t) / 100;
    const [c, i] = [ms(C, m), ms(I, m)];
    const s = (x: number) => `${x} %`;
    return qt(s(t), [t + 1, t + 2, t === 2 ? 12 : t - 1, t * 2, t + 10].map(s), exp(DEF_I, "on cherche combien rapportent 100 de capital.", `${i} × 100 ÷ ${c} = ${t}.`, `le taux est ${t} %.`), v([
      `${c} rapportent ${i} en un an. Quel est le taux ?`,
      `Capital : ${c}. Intérêt d'un an : ${i}. Quel est le taux annuel ?`,
      `Un placement de ${c} donne ${i} d'intérêt par an. Trouve le taux.`,
      `On gagne ${i} par an avec ${c} placés. À quel taux ?`,
      `À quel taux faut-il placer ${c} pour gagner ${i} en un an ?`,
      `Capital ${c}, intérêt annuel ${i} : calcule le taux.`,
      `Quel taux donne ${i} d'intérêt par an pour ${c} ?`,
      `Un capital de ${c} a rapporté ${i} en un an. Quel était le taux ?`,
    ]));
  }),
  is_(2, "Capital = intérêt d'un an × 100 ÷ taux.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const I = (C * t) / 100;
    const i = ms(I, m);
    return q(C, [I * t, I * 10, C + I, C * 2, C / 2], exp(DEF_I, "l'intérêt est le taux pour cent du capital : on multiplie par 100 et on divise par le taux.", `${i} × 100 ÷ ${t} = ${ms(C, m)}.`, `le capital est ${ms(C, m)}.`), v([
      `Un capital placé à ${t} % rapporte ${i} en un an. Que vaut ce capital ?`,
      `Taux : ${t} %. Intérêt d'un an : ${i}. Quel est le capital ?`,
      `Quelle somme faut-il placer à ${t} % pour gagner ${i} en un an ?`,
      `Au taux de ${t} %, l'intérêt annuel est de ${i}. Trouve le capital placé.`,
      `On gagne ${i} par an à ${t} %. Combien a-t-on placé ?`,
      `Taux ${t} %, intérêt annuel ${i} : calcule le capital.`,
      `Quel capital rapporte ${i} en un an au taux de ${t} % ?`,
      `Un placement à ${t} % a donné ${i} en un an. Quelle somme était placée ?`,
    ]), m);
  }),

  is_(3, "Durée = intérêt total ÷ intérêt d'un an.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const n = entre(2, 8);
    const I = (C * t * n) / 100;
    const W = un(["Une coopérative agricole", "Une association de musiciens", "Un club de football", "Une infirmière", "Un menuisier", "Une famille", "Une troupe de théâtre", "Un boulanger", "Une chercheuse", "Une équipe de plongeurs"]);
    const c = ms(C, m);
    return qt(`${n} ans`, [n + 1, n + 2, n - 1, n * 2, t].filter((x) => x > 1 && x !== n).map((x) => `${x} ans`), exp(DEF_I, "on calcule l'intérêt d'un an, puis on cherche combien de fois il entre dans l'intérêt total.", `${c} × ${t} ÷ 100 = ${ms((C * t) / 100, m)} ; ${ms(I, m)} ÷ ${ms((C * t) / 100, m)} = ${n}.`, `le placement a duré ${n} ans.`), `${W} place ${c} à ${t} % par an et touche ${ms(I, m)} d'intérêts en tout. ${v(["Combien de temps a duré le placement ?", "Quelle est la durée du placement ?", "Pendant combien d'années l'argent est-il resté placé ?", "Sur quelle durée s'étend ce placement ?"])}`);
  }),
  is_(3, "La somme finale = capital + intérêt de toutes les années.", () => {
    const { m, C } = capital();
    const t = un(TAUX);
    const n = entre(2, 6);
    const I = (C * t * n) / 100;
    const W = un([
      "Pour acheter un bateau de pêche, un armateur", "Pour un atelier de couture, une styliste", "Pour un voyage scolaire, une école", "Pour ses études d'ingénieur, une lycéenne", "Pour un nouveau tracteur, une agricultrice",
      "Pour un studio de musique, un batteur", "Pour une salle de sport, une entraîneuse", "Pour une ruche connectée, un apiculteur", "Pour un four neuf, une boulangère", "Pour un cabinet dentaire, une dentiste",
    ]);
    const c = ms(C, m);
    return q(C + I, [I, C, C + I / n, C + 2 * I], exp(DEF_I, "on calcule l'intérêt total, puis on l'ajoute au capital.", `${c} × ${t} ÷ 100 × ${n} = ${ms(I, m)} ; ${c} + ${ms(I, m)} = ${ms(C + I, m)}.`, `la somme finale est ${ms(C + I, m)}.`), `${W} place ${c} à ${t} % par an pendant ${n} ans. ${v(["De quelle somme dispose-t-on à la fin ?", "Quelle somme retire-t-on au bout de cette durée ?", "Combien y a-t-il sur le compte à la fin ?", "Que vaut le placement à la fin ?"])}`, m);
  }),
  is_(3, "Calcule l'intérêt de chaque placement, puis compare.", () => {
    const { m, C } = capital();
    const [t1, n1, t2, n2] = (() => {
      for (;;) {
        const a = [un(TAUX), entre(2, 6), un(TAUX), entre(2, 6)];
        if (a[0] !== a[2] && a[1] !== a[3]) return a;
      }
    })();
    const I1 = (C * t1 * n1) / 100;
    const I2 = (C * t2 * n2) / 100;
    const W = un(["Une entraîneuse de natation", "Un chauffeur de bus", "Une vétérinaire", "Un guide de montagne", "Une pharmacienne", "Un musicien", "Une pilote", "Un cuisinier", "Une agricultrice", "Un mécanicien"]);
    const juste = I1 === I2 ? "Les deux rapportent autant" : I1 > I2 ? "Le placement A" : "Le placement B";
    return qt(juste, ["Le placement A", "Le placement B", "Les deux rapportent autant"], exp(DEF_I, "on calcule les deux intérêts sur le même capital.", `A : ${ms(I1, m)} ; B : ${ms(I2, m)}.`, `${minuscule1(juste)}.`), `${W} hésite pour placer ${ms(C, m)}. Placement A : ${t1} % par an pendant ${n1} ans. Placement B : ${t2} % par an pendant ${n2} ans. ${v(["Lequel rapporte le plus ?", "Quel placement donne le plus d'intérêts ?", "Quel est le meilleur choix ?", "Lequel faut-il choisir pour gagner le plus ?"])}`);
  }),
  is_(3, "Le capital reste moins d'un an : l'intérêt est une part de l'intérêt annuel.", () => {
    const { m, C } = capitalMois();
    const t = un([3, 4, 5, 6, 8, 10]);
    const d = un([2, 3, 4, 6, 8, 9, 10]);
    const I = (C * t * d) / 1200;
    const A = (C * t) / 100;
    const W = un(["Une photographe met de côté", "Un groupe de rock met de côté", "Un pêcheur dépose", "Une épicière dépose", "Une équipe de cyclistes dépose", "Un maraîcher met de côté", "Une architecte dépose", "Un tailleur met de côté", "Une kinésithérapeute dépose", "Un joueur de tennis dépose"]);
    const c = ms(C, m);
    return q(C + I, [C + A, I, C, C + A / 12], exp(DEF_I, "on calcule l'intérêt pour les mois du placement, puis on ajoute le capital.", `${c} × ${t} ÷ 100 = ${ms(A, m)} ; ${ms(A, m)} ÷ 12 × ${d} = ${ms(I, m)} ; ${c} + ${ms(I, m)} = ${ms(C + I, m)}.`, `il y a ${ms(C + I, m)}.`), `${W} ${c} à ${t} % par an. L'argent reste ${d} mois. ${v(["Quelle somme y a-t-il à la fin ?", "Combien récupère-t-on au bout de ces mois ?", "Que vaut le placement à la fin ?", "Quelle somme retire-t-on ?"])}`, m);
  }),
];

/* ───────────────────────── facture_tva ───────────────────────── */

const ft = gabarits("facture_tva", "calculs_commerciaux", ["commerce", "facture"]);
const ARTICLES = ["Stylos", "Cahiers", "Ampoules", "Pots de peinture", "Sacs de ciment", "Câbles", "Ballons", "Livres", "Chaises", "Bobines de fil", "Plants de tomate", "Cordes de guitare", "Boîtes de vis", "Paires de gants"];
const trois = () => {
  const l = melangeEnPlace([...ARTICLES]);
  return l.slice(0, 3);
};
const TVA = [5, 10, 18, 20, 21];
const DEF_T = "le prix hors taxes (HT) plus la TVA donne le prix toutes taxes comprises (TTC). La TVA est un pourcentage du prix HT.";
const DEF_F = "sur une facture, montant d'une ligne = quantité × prix unitaire ; le total est la somme des montants.";
const entete = (m: Monnaie) => ["Article", "Qté", `Prix unitaire (${m.u})`, `Montant (${m.u})`];
const tableau = (m: Monnaie, rows: (string | number)[][]): CanvasFigure => ({
  kind: "tableau_donnees",
  headers: entete(m),
  rows: rows.map((values) => ({ values })),
  // Vu à 375 px : sans `compact`, le tableau poussait la page à 447 px de large.
  display: { compact: true },
}) as CanvasFigure;
const n2 = (x: number) => nb(x);
const lignes = (m: Monnaie) =>
  trois().map((a) => {
    const n = entre(2, 12);
    const p = entre(1, 18) * 5 * m.k;
    return { a, n, p, t: n * p };
  });

export const factureTvaBank: TutorBankItemV4[] = [
  ft(1, "Montant d'une ligne = quantité × prix unitaire.", () => {
    const m = monnaie();
    const l = lignes(m);
    const i = entre(0, 2);
    const X = l[i];
    return q(X.t, [X.t + X.p, X.t - X.p, X.t + 2 * X.p, X.p, X.t * 2], exp(DEF_F, "on multiplie la quantité par le prix unitaire.", `${X.n} × ${ms(X.p, m)} = ${ms(X.t, m)}.`, `le montant est ${ms(X.t, m)}.`), v([
      `Quel montant manque sur cette facture ?`, `Complète la ligne « ? » de cette facture.`, `Que faut-il écrire à la place de « ? » ?`, `Lis la facture. Quel est le montant manquant ?`, `Calcule le montant de la ligne marquée « ? ».`, `Cette facture a une case vide. Combien vaut-elle ?`, `Trouve le montant qui manque dans ce tableau.`, `Quel nombre remplace « ? » sur la facture ?`,
    ]), m, tableau(m, l.map((x, k) => [x.a, x.n, n2(x.p), k === i ? "?" : n2(x.t)])));
  }),
  ft(1, "Le total est la somme des montants.", () => {
    const m = monnaie();
    const l = lignes(m);
    const S = l.reduce((s, x) => s + x.t, 0);
    return q(S, [S + l[0].t, S - l[0].t, S - l[2].t, S + l[1].p, l[0].p + l[1].p + l[2].p], exp(DEF_F, "on ajoute les montants de toutes les lignes.", `${l.map((x) => n2(x.t)).join(" + ")} = ${ms(S, m)}.`, `le total est ${ms(S, m)}.`), v([
      `Quel est le total de cette facture ?`, `Combien faut-il payer pour cette facture ?`, `Calcule le total à payer.`, `Que vaut « ? » sur la dernière ligne ?`, `Additionne les montants : quel est le total ?`, `Quelle somme indique le bas de cette facture ?`, `Trouve le total de la facture.`, `Lis la facture. Quel est son total ?`,
    ]), m, tableau(m, [...l.map((x) => [x.a, x.n, n2(x.p), n2(x.t)]), ["Total", "", "", "?"]]));
  }),
  ft(1, "TTC = HT + TVA.", () => {
    const m = monnaie();
    const HT = entre(2, 30) * 100 * m.k;
    const t = un(TVA);
    const T = (HT * t) / 100;
    const [a, b] = [ms(HT, m), ms(T, m)];
    return q(HT + T, [HT - T, HT, T, HT + 2 * T], exp(DEF_T, "on ajoute la TVA au prix HT.", `${a} + ${b} = ${ms(HT + T, m)}.`, `le prix TTC est ${ms(HT + T, m)}.`), v([
      `Prix HT : ${a}. TVA : ${b}. Quel est le prix TTC ?`,
      `Hors taxes : ${a}. TVA : ${b}. Combien paie-t-on toutes taxes comprises ?`,
      `Un article coûte ${a} HT, avec ${b} de TVA. Quel est son prix TTC ?`,
      `Calcule le prix TTC : ${a} HT et ${b} de TVA.`,
      `Sur une facture, on lit ${a} HT et ${b} de TVA. Que vaut le TTC ?`,
      `Montant HT ${a}, TVA ${b} : trouve le montant TTC.`,
      `À ${a} hors taxes s'ajoutent ${b} de TVA. Quel est le total TTC ?`,
      `Quel est le prix TTC d'un article à ${a} HT, si la TVA est de ${b} ?`,
    ]), m);
  }),
  ft(1, "La différence entre TTC et HT, c'est la TVA.", () => {
    const m = monnaie();
    const HT = entre(2, 30) * 100 * m.k;
    const t = un(TVA);
    const T = (HT * t) / 100;
    const [a, b] = [ms(HT, m), ms(HT + T, m)];
    return q(T, [2 * HT + T, HT, HT + T, T + 10 * m.k, 2 * T], exp(DEF_T, "on enlève le prix HT du prix TTC.", `${b} − ${a} = ${ms(T, m)}.`, `la TVA est de ${ms(T, m)}.`), v([
      `Prix HT : ${a}. Prix TTC : ${b}. Quel est le montant de la TVA ?`,
      `Hors taxes : ${a}. Toutes taxes comprises : ${b}. Combien de TVA paie-t-on ?`,
      `Un article coûte ${a} HT et ${b} TTC. Quelle est sa TVA ?`,
      `Calcule la TVA : ${a} HT et ${b} TTC.`,
      `Sur une facture, on lit ${a} HT et ${b} TTC. Que vaut la TVA ?`,
      `Montant HT ${a}, montant TTC ${b} : trouve la TVA.`,
      `De ${a} HT, on passe à ${b} TTC. De combien est la TVA ?`,
      `Quelle est la TVA d'un article à ${a} HT et ${b} TTC ?`,
    ]), m);
  }),

  ft(2, "TVA = prix HT × taux ÷ 100.", () => {
    const m = monnaie();
    const HT = entre(2, 30) * 100 * m.k;
    const t = un(TVA);
    const T = (HT * t) / 100;
    const a = ms(HT, m);
    return q(T, [HT + T, HT - T, 2 * T, T + 10 * m.k, T * 10], exp(DEF_T, "on prend le pourcentage du prix HT.", `${a} × ${t} ÷ 100 = ${ms(T, m)}.`, `la TVA est de ${ms(T, m)}.`), v([
      `Prix HT : ${a}. Taux de TVA : ${t} %. Quel est le montant de la TVA ?`,
      `Un article coûte ${a} HT. La TVA est à ${t} %. Combien de TVA paie-t-on ?`,
      `Calcule la TVA à ${t} % sur ${a} HT.`,
      `Montant HT ${a}, TVA à ${t} % : combien vaut la TVA ?`,
      `Sur ${a} hors taxes, quelle TVA paie-t-on au taux de ${t} % ?`,
      `Une facture de ${a} HT supporte une TVA de ${t} %. Trouve son montant.`,
      `Taux de TVA ${t} %, prix HT ${a} : que vaut la TVA ?`,
      `Quelle est la TVA d'un article à ${a} HT, au taux de ${t} % ?`,
    ]), m);
  }),
  ft(2, "Calcule la TVA, puis ajoute-la au prix HT.", () => {
    const m = monnaie();
    const HT = entre(2, 30) * 100 * m.k;
    const t = un(TVA);
    const T = (HT * t) / 100;
    const a = ms(HT, m);
    return q(HT + T, [T, HT - T, HT + 2 * T, HT + t * m.k, HT], exp(DEF_T, "on calcule la TVA, puis on l'ajoute.", `${a} × ${t} ÷ 100 = ${ms(T, m)} ; ${a} + ${ms(T, m)} = ${ms(HT + T, m)}.`, `le prix TTC est ${ms(HT + T, m)}.`), v([
      `Prix HT : ${a}. Taux de TVA : ${t} %. Quel est le prix TTC ?`,
      `Un article coûte ${a} HT. La TVA est à ${t} %. Combien paie-t-on en tout ?`,
      `Calcule le prix TTC de ${a} HT, avec une TVA à ${t} %.`,
      `Montant HT ${a}, TVA à ${t} % : que vaut le montant TTC ?`,
      `Sur ${a} hors taxes, la TVA est de ${t} %. Quel est le total ?`,
      `Une facture de ${a} HT supporte une TVA de ${t} %. Trouve le prix TTC.`,
      `Taux de TVA ${t} %, prix HT ${a} : quel est le prix TTC ?`,
      `Quel est le prix TTC d'un article à ${a} HT, au taux de ${t} % ?`,
    ]), m);
  }),
  ft(2, "Consommation × prix de l'unité, puis on ajoute l'abonnement.", () => {
    const m: Monnaie = un([{ u: "€", k: 1 }, { u: "F CFA", k: 250 }]);
    const eau = Math.random() < 0.5;
    const unite = eau ? "m³" : "kWh";
    const c = eau ? entre(2, 30) * 5 : entre(2, 30) * 20;
    const pu = m.u === "€" ? (eau ? un([2, 3, 4]) : un([0.2, 0.25, 0.5])) : (eau ? un([200, 250, 300, 400]) : un([50, 75, 100]));
    const ab = (m.u === "€" ? entre(2, 8) * 5 : entre(2, 8) * 500);
    const S = net(c * pu);
    const nom = eau ? "d'eau" : "d'électricité";
    const [p, b] = [ms(pu, m), ms(ab, m)];
    return q(S + ab, [S, S + 2 * ab, S + ab + 10 * pu, S - ab > 0 ? S - ab : S + 3 * ab], exp(DEF_F, "on multiplie la consommation par le prix de l'unité, puis on ajoute l'abonnement.", `${c} × ${p} = ${ms(S, m)} ; ${ms(S, m)} + ${b} = ${ms(S + ab, m)}.`, `la facture est de ${ms(S + ab, m)}.`), v([
      `Facture ${nom} : ${c} ${unite} à ${p} l'unité, abonnement ${b}. Quel est le total ?`,
      `Consommation ${nom} : ${c} ${unite} à ${p} l'unité. Abonnement : ${b}. Combien faut-il payer ?`,
      `On consomme ${c} ${unite} ${nom} à ${p} l'unité, plus ${b} d'abonnement. Calcule la facture.`,
      `Quel est le montant d'une facture ${nom} de ${c} ${unite} à ${p} l'unité, avec ${b} d'abonnement ?`,
      `${c} ${unite} ${nom}, à ${p} l'unité, et ${b} d'abonnement : quel total ?`,
      `Pour ${c} ${unite} ${nom} à ${p} l'unité et un abonnement de ${b}, que paie-t-on ?`,
    ]), m);
  }),
  ft(2, "Quantité = montant ÷ prix unitaire.", () => {
    const m = monnaie();
    const l = lignes(m);
    const i = entre(0, 2);
    const X = l[i];
    return qcmN(X.n, [X.n + 1, X.n - 1, X.n + 2, X.n * 2, X.n + 5], exp(DEF_F, "on divise le montant par le prix unitaire.", `${ms(X.t, m)} ÷ ${ms(X.p, m)} = ${X.n}.`, `la quantité est ${X.n}.`), v([
      `Quelle quantité manque sur cette facture ?`, `Complète la quantité marquée « ? ».`, `Combien d'articles a-t-on sur la ligne « ? » ?`, `Lis la facture. Quelle quantité faut-il écrire ?`, `Quel nombre remplace « ? » dans la colonne des quantités ?`, `Cette facture a perdu une quantité. Laquelle ?`, `Trouve la quantité qui manque dans ce tableau.`, `Combien d'articles ont été achetés sur la ligne « ? » ?`,
    ]), tableau(m, l.map((x, k) => [x.a, k === i ? "?" : x.n, n2(x.p), n2(x.t)])));
  }),

  ft(3, "Total des lignes, puis on enlève la remise.", () => {
    const m = monnaie();
    const C = un([
      { t: "Un menuisier", a: "boîtes de vis", b: "planches" }, { t: "Une école de musique", a: "pupitres", b: "métronomes" }, { t: "Une couturière", a: "bobines", b: "coupons" }, { t: "Un club de natation", a: "bonnets", b: "lunettes" },
      { t: "Une boulangère", a: "sacs de farine", b: "moules" }, { t: "Une jardinière", a: "sacs de terreau", b: "arrosoirs" }, { t: "Un laboratoire", a: "tubes", b: "pipettes" }, { t: "Une bibliothécaire", a: "atlas", b: "dictionnaires" },
      { t: "Un pêcheur", a: "filets", b: "lignes" }, { t: "Une électricienne", a: "câbles", b: "prises" },
    ]);
    const [n1, n2_] = [entre(2, 9), entre(2, 9)];
    const [p1, p2] = [entre(1, 9) * 20 * m.k, entre(1, 9) * 20 * m.k];
    const S = n1 * p1 + n2_ * p2;
    const r = un([5, 10, 20, 25]);
    const R = (S * r) / 100;
    return q(S - R, [S, S + R, R, S - r * m.k], exp(DEF_F, "on calcule le total, puis on enlève le pourcentage de remise.", `${n1} × ${ms(p1, m)} + ${n2_} × ${ms(p2, m)} = ${ms(S, m)} ; ${r} % de ${ms(S, m)} = ${ms(R, m)} ; ${ms(S, m)} − ${ms(R, m)} = ${ms(S - R, m)}.`, `à payer : ${ms(S - R, m)}.`), `${C.t} commande ${n1} ${C.a} à ${ms(p1, m)} et ${n2_} ${C.b} à ${ms(p2, m)}. La facture comporte une remise de ${r} %. ${v(["Quel est le montant à payer ?", "Combien reste-t-il à payer ?", "Que vaut le net à payer ?", "Quelle somme est due après la remise ?"])}`, m);
  }),
  ft(3, "TTC = HT × (100 + taux) ÷ 100 : on remonte au prix HT.", () => {
    const m = monnaie();
    const HT = entre(2, 30) * 100 * m.k;
    const t = un(TVA);
    const T = (HT * t) / 100;
    const O = un(["Une trottinette", "Un ordinateur", "Une guitare", "Une tente", "Un microscope", "Une paire de jumelles", "Un vélo", "Un télescope", "Une machine à coudre", "Un tableau blanc"]);
    const b = ms(HT + T, m);
    return q(HT, [HT + T, HT + 2 * T, T, HT - T], exp(DEF_T, `${100 + t} % du prix HT donnent ${b} : on divise le prix TTC par ${100 + t}, puis on multiplie par 100.`, `${b} ÷ ${100 + t} × 100 = ${ms(HT, m)}.`, `le prix HT est ${ms(HT, m)}.`), `${O} est affiché ${b} TTC. La TVA est à ${t} %. ${v(["Quel est son prix hors taxes ?", "Combien coûte-t-il sans la TVA ?", "Que vaut son prix HT ?", "Quel prix HT figure sur la facture ?"])}`.replace(/^(Une .*?) est affiché/, "$1 est affichée").replace(/^Une (.*?) est affichée(.*)Combien coûte-t-il/, "Une $1 est affichée$2Combien coûte-t-elle"), m);
  }),
  ft(3, "HT = quantité × prix unitaire ; on ajoute la TVA.", () => {
    const m = monnaie();
    const C = un([
      { t: "Un atelier de réparation commande", o: "pneus" }, { t: "Une salle de sport commande", o: "tapis" }, { t: "Un lycée achète", o: "calculatrices" }, { t: "Une chorale achète", o: "micros" }, { t: "Une ferme commande", o: "clôtures" },
      { t: "Une boulangerie commande", o: "plaques de four" }, { t: "Un cabinet médical achète", o: "tensiomètres" }, { t: "Un théâtre commande", o: "projecteurs" }, { t: "Un port de pêche achète", o: "bouées" }, { t: "Un observatoire commande", o: "lunettes" },
    ]);
    const n = un([2, 4, 5, 10, 20, 25]);
    const HT = entre(1, 20) * 100 * m.k * (n > 5 ? 1 : 2);
    const p = HT / n;
    const t = un(TVA);
    const T = (HT * t) / 100;
    return q(HT + T, [HT, T, p + T, HT - T], exp(DEF_T, "on calcule le prix HT, puis la TVA, puis on ajoute.", `${n} × ${ms(p, m)} = ${ms(HT, m)} ; ${t} % de ${ms(HT, m)} = ${ms(T, m)} ; ${ms(HT, m)} + ${ms(T, m)} = ${ms(HT + T, m)}.`, `la facture est de ${ms(HT + T, m)} TTC.`), `${C.t} ${n} ${C.o} à ${ms(p, m)} HT l'unité. La TVA est à ${t} %. ${v(["Quel est le montant TTC de la facture ?", "Combien coûte la commande, taxes comprises ?", "Que paie-t-on en tout ?", "Quel total TTC figure sur la facture ?"])}`, m);
  }),
  ft(3, "Refais la somme des montants et compare au total annoncé.", () => {
    const m = monnaie();
    const l = lignes(m);
    const S = l.reduce((s, x) => s + x.t, 0);
    const ecart = entre(1, 8) * 10 * m.k;
    const juste = Math.random() < 0.5;
    const A = juste ? S : un([S + ecart, Math.max(S - ecart, 5 * m.k)]);
    const verdict = A === S ? "Oui, le total est juste" : A > S ? `Non, il y a ${ms(A - S, m)} de trop` : `Non, il manque ${ms(S - A, m)}`;
    const W = un(["Une pharmacienne", "Un entraîneur", "Un boulanger", "Une ingénieure", "Un photographe", "Une agricultrice", "Un facteur de pianos", "Une marin", "Un cuisinier", "Une libraire"]);
    return qt(verdict, ["Oui, le total est juste", `Non, il y a ${ms(ecart + (A === S ? 0 : 10 * m.k), m)} de trop`, `Non, il manque ${ms(ecart + (A === S ? 0 : 10 * m.k), m)}`, A > S ? `Non, il manque ${ms(A - S, m)}` : `Non, il y a ${ms(Math.max(S - A, 5 * m.k), m)} de trop`], exp(DEF_F, "on additionne les montants, puis on compare au total écrit.", `${l.map((x) => n2(x.t)).join(" + ")} = ${ms(S, m)}. Le total annoncé est ${ms(A, m)}.`, `${minuscule1(verdict)}.`), `${W} vérifie cette facture. ${v(["Le total est-il juste ?", "Le total écrit est-il exact ?", "Faut-il corriger le total ?", "Le bas de la facture est-il correct ?"])}`, tableau(m, [...l.map((x) => [x.a, x.n, n2(x.p), n2(x.t)]), ["Total", "", "", n2(A)]]));
  }),
];

export const commercePrixBank: TutorBankItemV4[] = [...prixRevientVenteBeneficeBank, ...interetSimpleBank, ...factureTvaBank];
