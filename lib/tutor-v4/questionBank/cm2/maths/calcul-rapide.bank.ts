// CALCUL RAPIDE : × 11, × 25, ÷ 25, × 0,5, × 0,25, ÷ 0,5, ÷ 0,25 (06/11/2026).
//
// Belgique, Sénégal, Côte d'Ivoire. Le programme français de cours moyen laisse les
// stratégies de calcul libres et ne nomme aucun de ces multiplicateurs : micros masquées.
// `multiplication_mental` a déjà quelques × 11 et × 25 sur de petits entiers ; ici, ces
// calculs sont l'objet de la séance, avec les divisions et la méthode.
// ⛔ CM : QCM seulement. ★1-★2 sans contexte. Division « ÷ ».

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { entre, exp, fr, gabarits, net, qcm, qcmN, un, v } from "./trous-outils";

const INTRO = ["", "De tête.", "Sans poser l'opération.", "Calcul rapide."];
const COUPE = (t: string) => t.replace(/ ([×÷=]) /g, " $1 ");
const QN = (juste: number, faux: readonly number[], explication: string, texte: string, u = "") => qcmN(juste, faux.filter((f) => f > 0), explication, COUPE(texte), undefined, u);

const DEMANDE = (c: string) => [`Calcule ${c}.`, `Combien font ${c} ?`, `Que vaut ${c} ?`, `Quel est le résultat de ${c} ?`, `${c} = ?`, `Choisis le résultat de ${c}.`];

/* ───────────────────────── × 11, × 25, ÷ 25 ───────────────────────── */

const a = gabarits("calcul_fois_11_25", "calcul", ["calcul_rapide"]);
const DEF_11 = "multiplier par 11, c'est multiplier par 10, puis ajouter le nombre une fois.";
const DEF_25 = "4 × 25 = 100 : multiplier par 25, c'est multiplier par 100, puis diviser par 4.";
const DEF_D25 = "diviser par 25, c'est diviser par 100, puis multiplier par 4 : dans 100, il y a 4 fois 25.";
const exp11 = (n: number) => exp(DEF_11, "on multiplie par 10, puis on ajoute le nombre.", `${n} × 10 = ${n * 10} ; ${n * 10} + ${n} = ${n * 11}.`, `${n} × 11 = ${fr(n * 11)}.`);
const exp25 = (n: number) => exp(DEF_25, "on multiplie par 100, puis on divise par 4.", `${n} × 100 = ${fr(n * 100)} ; ${fr(n * 100)} ÷ 4 = ${fr(n * 25)}.`, `${n} × 25 = ${fr(n * 25)}.`);
const expD25 = (n: number) => exp(DEF_D25, "on divise par 100, puis on multiplie par 4.", `${fr(n)} ÷ 100 = ${fr(n / 100)} ; ${fr(n / 100)} × 4 = ${fr(n / 25)}.`, `${fr(n)} ÷ 25 = ${fr(n / 25)}.`);
const faux11 = (n: number) => [n * 10, n * 12, n * 11 + 10, n * 11 - 10, n * 11 + 1, n * 110];
const faux25 = (n: number) => [n * 20, n * 50, n * 4, n * 25 + 25, n * 25 - 25, n * 250];
const fauxD25 = (n: number) => [n / 5, n / 50, n / 100, n / 25 + 1, n / 25 - 1, n / 25 + 4];

export const calculFois1125Bank: TutorBankItemV4[] = [
  a(1, "× 11 : le nombre × 10, plus le nombre.", () => {
    const n = entre(12, 99);
    return QN(n * 11, faux11(n), exp11(n), v(INTRO, DEMANDE(`${n} × 11`)));
  }),
  a(1, "× 25 : le nombre × 100, puis ÷ 4.", () => {
    const n = entre(2, 24) * 2;
    return QN(n * 25, faux25(n), exp25(n), v(INTRO, DEMANDE(`${n} × 25`)));
  }),
  a(1, "÷ 25 : dans 100, il y a 4 fois 25.", () => {
    const k = entre(2, 40);
    const n = k * 25;
    return QN(k, fauxD25(n), expD25(n), v(INTRO, DEMANDE(`${fr(n)} ÷ 25`)));
  }),
  a(1, "Coupe le calcul en deux morceaux faciles.", () => {
    const n = entre(12, 99);
    const j = `${n} × 10 + ${n}`;
    return qcm(COUPE(j), [`${n} × 10 + 1`, `${n} × 100 + ${n}`, `${n} × 10 + 11`, `${n} + 11`].map(COUPE), exp11(n), COUPE(v(INTRO, [`Quel calcul donne ${n} × 11 ?`, `Pour trouver ${n} × 11, que peut-on faire ?`, `Quel calcul revient au même que ${n} × 11 ?`, `Quelle méthode convient pour ${n} × 11 ?`, `Choisis un calcul égal à ${n} × 11.`, `${n} × 11 est égal à quel calcul ?`])));
  }),

  a(2, "× 11 : le nombre × 10, plus le nombre, même à trois chiffres.", () => {
    const n = entre(101, 909);
    return QN(n * 11, faux11(n), exp11(n), v(INTRO, DEMANDE(`${n} × 11`)));
  }),
  a(2, "× 25 : × 100, puis ÷ 4. Le résultat peut finir par 25, 50 ou 75.", () => {
    const n = entre(13, 99);
    return QN(n * 25, faux25(n), exp25(n), v(INTRO, DEMANDE(`${n} × 25`)));
  }),
  a(2, "÷ 25 : ÷ 100, puis × 4.", () => {
    const k = entre(41, 200);
    const n = k * 25;
    return QN(k, fauxD25(n), expD25(n), v(INTRO, DEMANDE(`${fr(n)} ÷ 25`)));
  }),
  a(2, "Cherche le nombre : défais le calcul.", () => {
    const mode = un(["f11", "f25", "d25"]);
    if (mode === "f11") {
      const n = entre(12, 99);
      const r = fr(n * 11);
      return QN(n, [n + 1, n - 1, n * 10, n + 10], exp11(n), v(INTRO, [`… × 11 = ${r}. Quel nombre manque ?`, `Quel nombre multiplié par 11 donne ${r} ?`, `Par quel nombre multiplier 11 pour obtenir ${r} ?`, `Trouve le nombre : … × 11 = ${r}.`]));
    }
    if (mode === "f25") {
      const n = entre(6, 60);
      const r = fr(n * 25);
      return QN(n, [n + 1, n - 1, n * 2, n + 10], exp25(n), v(INTRO, [`… × 25 = ${r}. Quel nombre manque ?`, `Quel nombre multiplié par 25 donne ${r} ?`, `Par quel nombre multiplier 25 pour obtenir ${r} ?`, `Trouve le nombre : … × 25 = ${r}.`]));
    }
    const k = entre(6, 60);
    const n = k * 25;
    return QN(n, [n + 25, n - 25, k * 5, k * 100], expD25(n), v(INTRO, [`… ÷ 25 = ${k}. Quel nombre manque ?`, `Quel nombre divisé par 25 donne ${k} ?`, `Trouve le nombre : … ÷ 25 = ${k}.`, `De quel nombre part-on, si … ÷ 25 = ${k} ?`]));
  }),

  a(3, "Le même nombre dans chaque groupe : × 11 ou × 25.", () => {
    const P = un([
      { t: "Une équipe de football aligne 11 joueurs.", q: (n: number) => `Combien de joueurs alignent ${n} équipes ?`, f: 11 },
      { t: "Une équipe de cricket compte 11 joueurs.", q: (n: number) => `Combien de joueurs y a-t-il dans ${n} équipes ?`, f: 11 },
      { t: "Un orchestre range 11 pupitres par rangée.", q: (n: number) => `Combien de pupitres dans ${n} rangées ?`, f: 11 },
      { t: "Un jardinier plante 11 arbres par ligne.", q: (n: number) => `Combien d'arbres pour ${n} lignes ?`, f: 11 },
      { t: "Une couveuse reçoit 11 œufs par plateau.", q: (n: number) => `Combien d'œufs pour ${n} plateaux ?`, f: 11 },
      { t: "Une boîte contient 25 crayons.", q: (n: number) => `Combien de crayons dans ${n} boîtes ?`, f: 25 },
      { t: "Une salle de classe accueille 25 élèves.", q: (n: number) => `Combien d'élèves dans ${n} salles pareilles ?`, f: 25 },
      { t: "Une piscine fait 25 m de long.", q: (n: number) => `Combien de mètres nage-t-on en ${n} longueurs ?`, f: 25 },
      { t: "Une ruche donne 25 kg de miel par an.", q: (n: number) => `Combien de kilos donnent ${n} ruches ?`, f: 25 },
      { t: "Un car transporte 25 passagers.", q: (n: number) => `Combien de passagers dans ${n} cars ?`, f: 25 },
    ]);
    const n = entre(12, 48);
    return QN(n * P.f, P.f === 11 ? faux11(n) : faux25(n), P.f === 11 ? exp11(n) : exp25(n), `${P.t} ${P.q(n)}`);
  }),
  a(3, "On range par 25 : on divise par 25.", () => {
    const O = un([
      { o: "photos", b: "pages d'album" }, { o: "graines", b: "sachets" }, { o: "crayons", b: "boîtes" }, { o: "œufs", b: "plateaux" }, { o: "élèves", b: "groupes" },
      { o: "tickets", b: "carnets" }, { o: "bouteilles", b: "caisses" }, { o: "partitions", b: "classeurs" }, { o: "boulons", b: "sacs" }, { o: "dossards", b: "lots" },
    ]);
    const k = entre(8, 80);
    const n = k * 25;
    return QN(k, fauxD25(n), expD25(n), `On répartit ${fr(n)} ${O.o} par 25 dans des ${O.b}. ${v(["Combien en faut-il ?", "Combien en remplit-on ?", "Combien sont nécessaires ?", "Combien sont utilisés ?"])}`);
  }),
  a(3, "Compare les deux résultats de tête.", () => {
    const n = entre(12, 40);
    const m = n * 11 === 25 * n ? n + 1 : entre(12, 40);
    const [A, B] = [n * 11, m * 25];
    const W = un(["Deux bergers comptent leurs bêtes", "Deux coureuses comparent leurs distances", "Deux fermes comparent leurs récoltes", "Deux chorales comparent leurs recettes", "Deux pêcheurs comparent leurs prises", "Deux libraires comparent leurs stocks", "Deux clubs comparent leurs points", "Deux usines comparent leurs pièces", "Deux apicultrices comparent leurs pots", "Deux musiciens comparent leurs mesures"]);
    const juste = A === B ? "Les deux sont égaux" : A > B ? `${n} × 11` : `${m} × 25`;
    return qcm(COUPE(juste), [`${n} × 11`, `${m} × 25`, "Les deux sont égaux"].map(COUPE), exp("× 11 et × 25 se calculent de tête.", "on calcule chaque produit.", `${n} × 11 = ${fr(A)} ; ${m} × 25 = ${fr(B)}.`, `${juste}.`), COUPE(`${W} : le premier total vaut ${n} × 11, le second ${m} × 25. ${v(["Quel est le plus grand nombre ?", "Quel total est le plus grand ?", "Quel résultat est le plus grand ?", "Quel calcul donne le plus ?"])}`));
  }),
  a(3, "Le prix d'un lot : quantité × 25 ou × 11.", () => {
    const f = un([11, 25]);
    const O = un(["cahiers", "ballons", "plants", "livres", "pinceaux", "cordes", "gourdes", "billets", "bocaux", "maillots"]);
    const W = un(["Une école commande", "Un club achète", "Une coopérative commande", "Une troupe achète", "Une pépinière commande", "Un atelier achète", "Une équipe commande", "Une chorale achète"]);
    const u = un(["€", "F CFA"]);
    const pas = u === "€" ? 1 : 100;
    const n = entre(12, 48);
    const p = f * pas;
    return QN(n * p, (f === 11 ? faux11(n) : faux25(n)).map((x) => x * pas), f === 11 ? exp11(n) : exp25(n), `${W} ${n} ${O} à ${fr(p)} ${u} l'un. ${v(["Quel est le prix total ?", "Combien coûte la commande ?", "Quelle somme faut-il payer ?", "Combien paie-t-on en tout ?"])}`.replace(/(\d) (€|F CFA)/g, "$1 $2"), u);
  }),
];

/* ───────────────────────── × 0,5 ; × 0,25 ; ÷ 0,5 ; ÷ 0,25 ───────────────────────── */

const b = gabarits("calcul_fois_05_025", "calcul", ["calcul_rapide"]);
const DEF_05 = "0,5 est la moitié de 1 : multiplier par 0,5, c'est prendre la moitié.";
const DEF_025 = "0,25 est le quart de 1 : multiplier par 0,25, c'est prendre le quart, donc la moitié de la moitié.";
const DEF_D05 = "dans 1, il y a 2 fois 0,5 : diviser par 0,5, c'est multiplier par 2.";
const DEF_D025 = "dans 1, il y a 4 fois 0,25 : diviser par 0,25, c'est multiplier par 4.";
const eX05 = (x: number) => exp(DEF_05, "on prend la moitié.", `la moitié de ${fr(x)} est ${fr(x / 2)}.`, `${fr(x)} × 0,5 = ${fr(x / 2)}.`);
const eX025 = (x: number) => exp(DEF_025, "on prend deux fois la moitié.", `${fr(x)} ÷ 2 = ${fr(x / 2)} ; ${fr(x / 2)} ÷ 2 = ${fr(x / 4)}.`, `${fr(x)} × 0,25 = ${fr(x / 4)}.`);
const eD05 = (x: number) => exp(DEF_D05, "on multiplie par 2.", `${fr(x)} × 2 = ${fr(x * 2)}.`, `${fr(x)} ÷ 0,5 = ${fr(x * 2)}.`);
const eD025 = (x: number) => exp(DEF_D025, "on multiplie par 4.", `${fr(x)} × 4 = ${fr(x * 4)}.`, `${fr(x)} ÷ 0,25 = ${fr(x * 4)}.`);
// Les erreurs d'élève : confondre × et ÷, prendre le quart pour la moitié, déplacer la virgule.
const leurres = (x: number) => [x / 2, x * 2, x / 4, x * 4, x * 5, x / 5, x / 10, x + 0.5, net(x * 25), x + 2].map(net);

export const calculFois05025Bank: TutorBankItemV4[] = [
  b(1, "× 0,5 : la moitié.", () => {
    const x = entre(2, 60) * 2;
    return QN(x / 2, leurres(x), eX05(x), v(INTRO, DEMANDE(`${x} × 0,5`)));
  }),
  b(1, "× 0,25 : le quart.", () => {
    const x = entre(2, 30) * 4;
    return QN(x / 4, leurres(x), eX025(x), v(INTRO, DEMANDE(`${x} × 0,25`)));
  }),
  b(1, "÷ 0,5 : le double.", () => {
    const x = entre(2, 60);
    return QN(x * 2, leurres(x), eD05(x), v(INTRO, DEMANDE(`${x} ÷ 0,5`)));
  }),
  b(1, "÷ 0,25 : quatre fois plus.", () => {
    const x = entre(2, 40);
    return QN(x * 4, leurres(x), eD025(x), v(INTRO, DEMANDE(`${x} ÷ 0,25`)));
  }),

  b(2, "× 0,5 : la moitié, même d'un impair ou d'un décimal.", () => {
    const x = un([entre(3, 49) * 2 + 1, net(entre(2, 40) * 2 + entre(1, 4) * 0.2)]);
    return QN(x / 2, leurres(x), eX05(x), v(INTRO, DEMANDE(`${fr(x)} × 0,5`)));
  }),
  b(2, "× 0,25 : la moitié de la moitié.", () => {
    const x = un([entre(2, 40) * 2, entre(2, 25) * 4 + 2, entre(10, 60)]);
    return QN(x / 4, leurres(x), eX025(x), v(INTRO, DEMANDE(`${x} × 0,25`)));
  }),
  b(2, "Diviser par 0,5 ou 0,25 fait grandir le nombre.", () => {
    const quart = Math.random() < 0.5;
    const x = net(entre(1, 20) + un([0.5, 0.2, 0.4, 0.1, 0.3, 0.25]));
    return QN(quart ? x * 4 : x * 2, leurres(x), quart ? eD025(x) : eD05(x), v(INTRO, DEMANDE(`${fr(x)} ÷ ${quart ? "0,25" : "0,5"}`)));
  }),
  b(2, "Quel calcul plus simple revient au même ?", () => {
    const P = un([
      { o: "× 0,5", j: "÷ 2", f: ["× 2", "÷ 5", "× 5"], d: DEF_05 }, { o: "× 0,25", j: "÷ 4", f: ["× 4", "÷ 25", "÷ 2"], d: DEF_025 },
      { o: "÷ 0,5", j: "× 2", f: ["÷ 2", "× 5", "÷ 5"], d: DEF_D05 }, { o: "÷ 0,25", j: "× 4", f: ["÷ 4", "× 25", "× 2"], d: DEF_D025 },
    ]);
    const x = entre(4, 90);
    const j = `${x} ${P.j}`;
    return qcm(COUPE(j), P.f.map((f) => COUPE(`${x} ${f}`)), exp(P.d, "on remplace le décimal par un entier.", `${x} ${P.o} = ${x} ${P.j}.`, `${x} ${P.o} revient à ${x} ${P.j}.`), COUPE(v(INTRO, [`${x} ${P.o} revient à quel calcul ?`, `Quel calcul donne le même résultat que ${x} ${P.o} ?`, `Pour trouver ${x} ${P.o}, que peut-on faire ?`, `Choisis un calcul égal à ${x} ${P.o}.`, `Quel calcul plus simple remplace ${x} ${P.o} ?`, `On veut ${x} ${P.o}. Quel calcul fait-on ?`])));
  }),

  b(3, "Combien de fois 0,5 ou 0,25 dans la quantité : on divise.", () => {
    const quart = Math.random() < 0.5;
    const d = quart ? "0,25" : "0,5";
    const f = quart ? 4 : 2;
    const C = un([
      { t: `On verse ${"#"} L de jus dans des verres de ${d} L.`, q: "Combien de verres remplit-on ?" }, { t: `Un maraîcher répartit ${"#"} kg de tomates en sachets de ${d} kg.`, q: "Combien de sachets obtient-il ?" }, { t: `Une couturière coupe ${"#"} m de ruban en morceaux de ${d} m.`, q: "Combien de morceaux obtient-elle ?" },
      { t: `Une infirmière répartit ${"#"} L de solution en flacons de ${d} L.`, q: "Combien de flacons remplit-elle ?" }, { t: `Une chimiste partage ${"#"} L de liquide en tubes de ${d} L.`, q: "Combien de tubes remplit-elle ?" }, { t: `Un coureur fait ${"#"} km en tours de ${d} km.`, q: "Combien de tours fait-il ?" },
      { t: `Un apiculteur met ${"#"} kg de miel en pots de ${d} kg.`, q: "Combien de pots remplit-il ?" }, { t: `Une musicienne joue ${"#"} minutes de morceaux de ${d} minute.`, q: "Combien de morceaux joue-t-elle ?" }, { t: `Une pâtissière partage ${"#"} kg de farine en doses de ${d} kg.`, q: "Combien de doses obtient-elle ?" }, { t: `Un jardinier découpe ${"#"} m de tuyau en bouts de ${d} m.`, q: "Combien de bouts obtient-il ?" },
    ]);
    const x = entre(3, 40);
    return QN(x * f, leurres(x), quart ? eD025(x) : eD05(x), `${C.t.replace("#", String(x))} ${C.q}`);
  }),
  b(3, "Chaque objet pèse ou contient 0,5 ou 0,25 : on multiplie.", () => {
    const quart = Math.random() < 0.5;
    const d = quart ? "0,25" : "0,5";
    const C = un([
      { t: "Une caisse contient # bouteilles de", u: "L", q: "Quelle est la quantité totale ?" }, { t: "Une épicière range # paquets de", u: "kg", q: "Quelle est la masse totale ?" }, { t: "Une nageuse enchaîne # longueurs de", u: "km", q: "Quelle distance parcourt-elle ?" },
      { t: "Un chef utilise # pots de", u: "L", q: "Quel volume utilise-t-il ?" }, { t: "Un pêcheur vend # filets de poisson de", u: "kg", q: "Quelle masse vend-il ?" }, { t: "Une randonneuse fait # étapes de", u: "km", q: "Quelle distance fait-elle ?" },
      { t: "Un pharmacien range # flacons de", u: "L", q: "Quel volume range-t-il ?" }, { t: "Une boulangère prépare # sacs de", u: "kg", q: "Quelle masse prépare-t-elle ?" }, { t: "Un maçon verse # seaux de", u: "L", q: "Quel volume verse-t-il ?" }, { t: "Un cycliste roule # tours de", u: "km", q: "Quelle distance roule-t-il ?" },
    ]);
    const x = (quart ? entre(2, 25) * 4 : entre(3, 45) * 2);
    return QN(quart ? x / 4 : x / 2, leurres(x), quart ? eX025(x) : eX05(x), `${C.t.replace("#", String(x))} ${d} ${C.u}. ${C.q}`.replace(/(\d) (L|kg|km)\b/g, "$1 $2"), C.u);
  }),
  b(3, "Cherche le nombre de départ : défais le calcul.", () => {
    const P = un([
      { o: "× 0,5", f: (r: number) => r * 2, e: eX05 }, { o: "× 0,25", f: (r: number) => r * 4, e: eX025 },
      { o: "÷ 0,5", f: (r: number) => r / 2, e: eD05 }, { o: "÷ 0,25", f: (r: number) => r / 4, e: eD025 },
    ]);
    const r = entre(3, 30) * 4;
    const x = P.f(r);
    const W = un(["Une physicienne", "Un ébéniste", "Une pharmacienne", "Un cuisinier", "Une géomètre", "Un boulanger", "Une ingénieure", "Un électricien", "Une météorologue", "Un chocolatier"]);
    return QN(x, leurres(r), P.e(x), `${W} part d'un nombre, fait ${P.o} et trouve ${r}. ${v(["Quel était ce nombre ?", "De quel nombre est-on parti ?", "Quel nombre avait-on au départ ?", "Quel est le nombre de départ ?"])}`);
  }),
  b(3, "Partage, puis prends la moitié ou le quart.", () => {
    const quart = Math.random() < 0.5;
    const d = quart ? "0,25" : "0,5";
    const n = entre(3, 12);
    const p = (quart ? 4 : 2) * entre(2, 20);
    const S = quart ? n * p * 0.25 : n * p * 0.5;
    const O = un(["cordes", "plaques", "bandes de tissu", "planches", "rouleaux", "barres", "tuyaux", "câbles", "filets", "tubes"]);
    const W = un(["Un atelier", "Une équipe de voile", "Un chantier", "Une ferme", "Un théâtre", "Un laboratoire", "Un club d'escalade", "Une usine", "Un port", "Une école"]);
    return QN(S, [n * p, S * 2, S + n, n * p * 2, S + p], exp(quart ? DEF_025 : DEF_05, `on calcule la longueur totale, puis on multiplie par ${d}.`, `${n} × ${p} = ${n * p} ; ${n * p} × ${d} = ${fr(S)}.`, `il faut ${fr(S)} m.`), `${W} a ${n} ${O} de ${p} m. On en utilise ${quart ? "le quart" : "la moitié"}, soit la longueur totale × ${d}. ${v(["Quelle longueur est utilisée ?", "Combien de mètres utilise-t-on ?", "Quelle est la longueur utilisée ?", "Que vaut cette longueur ?"])}`.replace(/(\d) m\b/g, "$1 m"), "m");
  }),
];

export const calculRapideBank: TutorBankItemV4[] = [...calculFois1125Bank, ...calculFois05025Bank];
