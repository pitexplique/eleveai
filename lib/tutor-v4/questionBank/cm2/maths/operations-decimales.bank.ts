// OPÉRATIONS POSÉES AVEC LES DÉCIMAUX (05/11/2026). Trous du programme de CM2 :
// cm2-N-operations-3 (décimal × entier), -4 (quotient décimal), -5 (dividende décimal).

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, eur, exp, fr, gabarits, net, qcm, qcmN, un, v } from "./trous-outils";

const poseMul = (a: number, b: number): CanvasFigure => ({ kind: "calcul_pose", operation: "multiplication", numbers: [fr(a), String(b)], display: { showResult: false, compact: true } });
const poseDiv = (a: number, b: number): CanvasFigure => ({ kind: "calcul_pose", operation: "division", numbers: [fr(a), String(b)], division: { dividende: fr(a), diviseur: String(b) }, display: { showResult: false, compact: true } });

/* ───────────────────────── multiplication_decimale_posee ───────────────────────── */
const mu = gabarits("multiplication_decimale_posee", "multiplication", ["pose", "decimal"]);
const nbDecimales = (x: number) => (String(net(x)).split(".")[1] ?? "").length;
const expMu = (a: number, b: number) => {
  const d = nbDecimales(a);
  const sv = net(a * 10 ** d);
  const nomD = d === 1 ? "dixièmes" : "centièmes";
  return exp(
    `${fr(a)} contient ${fr(sv)} ${nomD}.`,
    `on calcule sans la virgule, avec des ${nomD}, puis on écrit le résultat en ${nomD}.`,
    `${fr(sv)} × ${b} = ${fr(sv * b)} ${nomD}, c'est-à-dire ${fr(a * b)}.`,
    `${fr(a)} × ${b} = ${fr(a * b)}.`,
  );
};
/** Les leurres : virgule mal placée, ou retenue oubliée. */
const fauxMu = (a: number, b: number) => {
  const r = net(a * b);
  return [net(r * 10), net(r / 10), net(r * 100), net(r + 1), net(r + 0.1), net(r - 1), net(Math.floor(a) * b + (a - Math.floor(a)))].filter((f) => f !== r && f > 0);
};
const un1 = () => net(entre(1, 19) + entre(1, 9) / 10);
const un2 = () => {
  let x = net(entre(1, 9) + entre(1, 99) / 100);
  while (nbDecimales(x) !== 2) x = net(entre(1, 9) + entre(1, 99) / 100);
  return x;
};
const POSE = ["", "Pose l'opération.", "Pose-la sur ton brouillon.", "Sans calculatrice.", "Compte les dixièmes."];
const POSE2 = ["", "Pose l'opération.", "Pose-la sur ton brouillon.", "Sans calculatrice.", "Compte les centièmes."];
const PROD = (c: string) => [`Calcule ${c}.`, `Combien font ${c} ?`, `${c} = ?`, `Quel est le résultat de ${c} ?`, `Que vaut ${c} ?`];
const multiplicationDecimalePosee: TutorBankItemV4[] = [
  mu(1, "Compte en dixièmes : 2,3, c'est 23 dixièmes.", () => {
    const a = un1();
    const b = entre(2, 9);
    return qcmN(a * b, fauxMu(a, b), expMu(a, b), v(POSE, PROD(`${fr(a)} × ${b}`)));
  }),
  mu(1, "Le calcul sans virgule est déjà fait : écris le résultat en dixièmes.", () => {
    const a = un1();
    const b = entre(2, 9);
    const sv = net(a * 10);
    return qcmN(a * b, [sv * b, net((sv * b) / 100), net(a * b + 1), net(a * b - 1)], expMu(a, b), v([`On sait que ${fr(sv)} × ${b} = ${fr(sv * b)}.`, `Voici un calcul juste : ${fr(sv)} × ${b} = ${fr(sv * b)}.`, `Tu sais déjà que ${fr(sv)} × ${b} = ${fr(sv * b)}.`], PROD(`${fr(a)} × ${b}`)));
  }),
  mu(1, "Lis l'opération posée. Le nombre a un seul chiffre après la virgule.", () => {
    const a = un1();
    const b = entre(2, 9);
    return qcmN(a * b, fauxMu(a, b), expMu(a, b), v(["Voici une multiplication posée.", "Regarde l'opération.", "Lis cette opération."], ["Quel est le résultat ?", "Quel résultat faut-il écrire ?", "Que trouve-t-on ?", "Quel nombre écrire sous le trait ?", "Quel est le produit ?"]), poseMul(a, b));
  }),
  mu(2, "Compte en centièmes : 3,25, c'est 325 centièmes.", () => {
    const a = un2();
    const b = entre(2, 9);
    return qcmN(a * b, fauxMu(a, b), expMu(a, b), v(POSE2, PROD(`${fr(a)} × ${b}`)));
  }),
  mu(2, "Multiplie par un nombre à deux chiffres, puis reviens aux dixièmes.", () => {
    const a = net(entre(1, 9) + entre(1, 9) / 10);
    const b = entre(11, 25);
    return qcmN(a * b, fauxMu(a, b), expMu(a, b), v(POSE, PROD(`${fr(a)} × ${b}`)));
  }),
  mu(2, "Regarde d'abord l'ordre de grandeur.", () => {
    const a = un2();
    const b = entre(2, 9);
    const r = net(a * b);
    return qcm(fr(r), [fr(net(r * 10)), fr(net(r / 10)), fr(net(r * 100))], expMu(a, b), `${v(["On sait que", "Voici un calcul juste :", "Tu sais déjà que"])} ${fr(net(a * 100))} × ${b} = ${fr(net(r * 100))}. ${v(PROD(`${fr(a)} × ${b}`))}`);
  }),
  mu(3, "Prix d'un objet × nombre d'objets.", () => {
    const a = net(entre(1, 19) + un([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 0.95, 0.15, 0.35]));
    const b = entre(3, 12);
    const O = un(["cahiers", "tickets de bus", "stylos", "bouteilles d'eau", "cartes de jeu", "sachets de graines", "places de piscine", "billets de tram", "boîtes de craies", "goûters", "balles de tennis", "petits pots de peinture"]);
    return qcmN(a * b, fauxMu(a, b), expMu(a, b), `${v(["On achète", "Une classe achète", "Un club prend", "Une famille prend"])} ${b} ${O} à ${eur(a)} € l'unité. ${v(["Quel est le prix total ?", "Combien cela coûte-t-il ?", "Combien faut-il payer ?"])}`, undefined, "€");
  }),
  mu(3, "Une mesure, répétée plusieurs fois : c'est une multiplication.", () => {
    const a = net(entre(1, 9) + un([0.2, 0.25, 0.4, 0.5, 0.6, 0.75, 0.8, 0.35, 0.15]));
    const b = entre(3, 12);
    const C = un([
      { t: `Un tour de piste mesure ${fr(a)} km. Une coureuse fait ${b} tours`, q: "Quelle distance parcourt-elle ?", u: "km" }, { t: `Un carton pèse ${fr(a)} kg. Un camion en porte ${b}`, q: "Quelle masse transporte-t-il ?", u: "kg" }, { t: `Une bouteille contient ${fr(a)} L. On en vide ${b} dans une cuve`, q: "Combien de litres dans la cuve ?", u: "L" }, { t: `Une planche mesure ${fr(a)} m. On aligne ${b} planches`, q: "Quelle longueur obtient-on ?", u: "m" },
      { t: `Une dose de farine pèse ${fr(a)} kg. Une boulangère en utilise ${b}`, q: "Quelle masse utilise-t-elle ?", u: "kg" }, { t: `Un rouleau contient ${fr(a)} m de fil. Une couturière utilise ${b} rouleaux`, q: "Quelle longueur de fil utilise-t-elle ?", u: "m" }, { t: `Une étape de vélo fait ${fr(a)} km. Il y a ${b} étapes`, q: "Quelle est la distance totale ?", u: "km" }, { t: `Une pierre pèse ${fr(a)} kg. Un maçon en porte ${b}`, q: "Quelle masse porte-t-il en tout ?", u: "kg" },
      { t: `Un sac de sable pèse ${fr(a)} kg. On en commande ${b}`, q: "Quelle est la masse commandée ?", u: "kg" }, { t: `Une tortue marine parcourt ${fr(a)} km chaque jour pendant ${b} jours`, q: "Quelle distance fait-elle ?", u: "km" },
    ]);
    return qcmN(a * b, fauxMu(a, b), expMu(a, b), `${C.t}. ${C.q}`, undefined, C.u);
  }),
  mu(3, "Vérifie avec un calcul proche.", () => {
    const a = net(entre(2, 9) + un([0.5, 0.2, 0.4, 0.8, 0.6]));
    const b = entre(4, 12);
    const r = net(a * b);
    const oui = Math.random() < 0.5;
    const annonce = oui ? r : un([net(r * 10), net(r / 10)]);
    const P = un(["Un élève", "Une caissière", "Un maçon", "Une infirmière", "Une cuisinière", "Un jardinier"]);
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], expMu(a, b) + `\n\nOn vérifie avec un calcul proche : c'est environ ${Math.round(a)} × ${b}.`, `${P} trouve ${fr(annonce)} pour ${fr(a)} × ${b}. ${v(["Est-ce juste ?", "Ce résultat est-il juste ?", "Le résultat est-il bon ?"])}`);
  }),
];

/* ───────────────────────── division_decimale_posee ───────────────────────── */
const dv = gabarits("division_decimale_posee", "division", ["pose", "decimal"]);
const DIVISEURS = [2, 4, 5, 8];
/** Dividende entier non multiple de d, quotient décimal exact (fini : 2, 4, 5, 8). */
const tireDiv = (d: number, max = 90) => {
  let n = entre(d + 1, max);
  while (n % d === 0) n = entre(d + 1, max);
  return n;
};
const expDv = (n: number, d: number) => {
  const q = Math.floor(n / d);
  const r = n - q * d;
  return exp(
    "un reste peut encore se partager : on l'écrit en dixièmes, puis en centièmes.",
    "quand les unités sont finies, on place la virgule au quotient, et le reste devient des dixièmes.",
    `${n} ÷ ${d} : ${q} unités, il reste ${r} unité${r > 1 ? "s" : ""}, soit ${r * 10} dixièmes. On continue jusqu'à un reste 0.`,
    `${n} ÷ ${d} = ${fr(n / d)}.`,
  );
};
const fauxDv = (n: number, d: number) => {
  const q = Math.floor(n / d);
  const r = n - q * d;
  const j = net(n / d);
  // « Le reste écrit derrière la virgule » : l'erreur la plus fréquente.
  return [net(q + r / 10), q, q + 1, net(j + 1), net(j / 10), net(j * 10), net(j - 1)].filter((f) => f !== j && f > 0);
};
const QUOT = (c: string) => [`Calcule ${c}.`, `Combien font ${c} ?`, `${c} = ?`, `Quel est le résultat de ${c} ?`, `Que vaut ${c} ?`];
const POSED = ["", "Pose la division.", "Continue après la virgule.", "Ne t'arrête pas au reste.", "Va jusqu'à un reste 0."];
const divisionDecimalePosee: TutorBankItemV4[] = [
  dv(1, "Le reste devient des dixièmes : 1 unité = 10 dixièmes.", () => {
    const d = un([2, 5]);
    const n = tireDiv(d, 49);
    return qcmN(n / d, fauxDv(n, d), expDv(n, d), v(POSED, QUOT(`${n} ÷ ${d}`)));
  }),
  dv(1, "Une unité, c'est 10 dixièmes.", () => {
    const d = un(DIVISEURS);
    const n = tireDiv(d, 60);
    const q = Math.floor(n / d);
    const r = n - q * d;
    return qcmN(r * 10, [r, r * 100, r + 10, r * 10 + 1, d * 10], expDv(n, d), v([`On calcule ${n} ÷ ${d}. Le quotient entier est ${q} et il reste ${r}.`, `Dans ${n} ÷ ${d}, on trouve ${q}, reste ${r}.`, `Pour ${n} ÷ ${d} : ${q} au quotient, et il reste ${r}.`], ["On continue : ce reste vaut combien de dixièmes ?", "Combien de dixièmes faut-il partager maintenant ?", "En dixièmes, que vaut ce reste ?", "Ce reste fait combien de dixièmes ?"]));
  }),
  dv(1, "Lis la division posée et continue après la virgule.", () => {
    const d = un([2, 5]);
    const n = tireDiv(d, 49);
    return qcmN(n / d, fauxDv(n, d), expDv(n, d), v(["Voici une division posée.", "Regarde cette division.", "Lis l'opération."], ["Quel est le quotient exact ?", "Quel est le quotient, reste 0 ?", "Quel nombre écrire au quotient ?", "Quel est le résultat, avec la virgule ?", "Que trouve-t-on au quotient ?"]), poseDiv(n, d));
  }),
  dv(2, "Divise par 4 : le reste devient des dixièmes, puis des centièmes.", () => {
    const n = tireDiv(4, 90);
    return qcmN(n / 4, fauxDv(n, 4), expDv(n, 4), v(POSED, QUOT(`${n} ÷ 4`)));
  }),
  dv(2, "Divise par 8 : continue jusqu'aux millièmes si besoin.", () => {
    const n = tireDiv(8, 90);
    return qcmN(n / 8, fauxDv(n, 8), expDv(n, 8), v(["Le quotient a parfois trois décimales.", "Continue jusqu'aux millièmes.", "Les millièmes peuvent servir.", "Pousse jusqu'aux millièmes.", "Trois décimales, parfois."], QUOT(`${n} ÷ 8`)));
  }),
  dv(2, "Le quotient est bon si quotient × diviseur redonne le nombre.", () => {
    const d = un(DIVISEURS);
    const n = tireDiv(d, 90);
    return qcmN(n / d, fauxDv(n, d), expDv(n, d) + `\n\nOn vérifie : ${fr(n / d)} × ${d} = ${n}.`, v(["", "Vérifie avec une multiplication.", "Va jusqu'au bout.", "Multiplie pour vérifier."], [`Quel nombre, multiplié par ${d}, donne ${n} ?`, `… × ${d} = ${n}. Quel nombre manque ?`, `${d} × … = ${n}. Quel nombre manque ?`, `Par quel nombre multiplier ${d} pour obtenir ${n} ?`]));
  }),
  dv(3, "Partager à parts égales, c'est diviser, jusqu'au reste 0.", () => {
    const d = un(DIVISEURS);
    const n = tireDiv(d, 90);
    const C = un([
      { t: `${d} amis se partagent ${n} € à parts égales`, u: "€" }, { t: `${n} kg de riz sont répartis dans ${d} sacs égaux`, u: "kg" }, { t: `${n} L de jus remplissent ${d} carafes égales`, u: "L" }, { t: `Une corde de ${n} m est coupée en ${d} morceaux égaux`, u: "m" }, { t: `${d} randonneurs se partagent ${n} kg de matériel`, u: "kg" }, { t: `Une course de ${n} km se fait en ${d} étapes égales`, u: "km" },
      { t: `${n} m de tissu donnent ${d} robes identiques`, u: "m" }, { t: `Une addition de ${n} € est payée par ${d} personnes à parts égales`, u: "€" }, { t: `${n} kg de foin nourrissent ${d} chevaux, à parts égales`, u: "kg" }, { t: `${n} L d'eau sont versés dans ${d} seaux, à parts égales`, u: "L" }, { t: `${d} voisins se partagent ${n} kg de mangues`, u: "kg" }, { t: `${n} m de grillage font ${d} côtés égaux`, u: "m" },
    ].filter((c) => c.u !== "€" || d !== 8));
    return qcmN(n / d, fauxDv(n, d), expDv(n, d), `${C.t}. ${v(["Combien pour une part ?", "Que vaut une part ?", "Quelle est la valeur d'une part ?"])}`, undefined, C.u);
  }),
  dv(3, "Prix total ÷ nombre d'objets.", () => {
    const d = un([2, 4, 5]);
    const n = tireDiv(d, 90);
    const O = un(["cahiers", "tickets", "stylos", "balles", "sachets de bonbons", "bouteilles", "paires de chaussettes", "pots de confiture", "cartes", "livres d'occasion", "cadenas", "lampes de poche"]);
    return qcmN(n / d, fauxDv(n, d), expDv(n, d), `${d} ${O} identiques coûtent ${n} €. ${v(["Quel est le prix d'une unité ?", "Combien coûte une unité ?", "Combien paie-t-on par unité ?"])}`, undefined, "€");
  }),
];

/* ───────────────────────── division_decimale_dividende ───────────────────────── */
const dd = gabarits("division_decimale_dividende", "division", ["pose", "decimal"]);
const expDd = (a: number, d: number) => {
  const dec = Math.max(nbDecimales(a), nbDecimales(a / d));
  const n = dec === 1 ? "dixièmes" : "centièmes";
  const sv = net(a * 10 ** dec);
  return exp(
    `${fr(a)}, c'est ${fr(sv)} ${n}.`,
    `on partage les ${n}, et on écrit le résultat en ${n}.`,
    `${fr(sv)} ${n} ÷ ${d} = ${fr(sv / d)} ${n}, c'est-à-dire ${fr(a / d)}.`,
    `${fr(a)} ÷ ${d} = ${fr(a / d)}.`,
  );
};
const fauxDd2 = (a: number, d: number) => {
  const j = net(a / d);
  return [net(j * 10), net(j / 10), net(j + 1), net(j + 0.1), net(j - 0.1), net(j * 100), net(j + 0.01)].filter((f) => f !== j && f > 0);
};
/** a ÷ d exact avec 1 décimale au quotient : on part du quotient. */
const tireD1 = (d: number) => {
  let q = net(entre(1, 19) + entre(1, 9) / 10);
  while (Number.isInteger(net(q * d))) q = net(entre(1, 19) + entre(1, 9) / 10);
  return { a: net(q * d), q };
};
/** Le piège du zéro : 6,18 ÷ 6 = 1,03. */
const tireZero = (d: number) => {
  const q = net(entre(1, 9) + entre(1, 9) / 100);
  return { a: net(q * d), q };
};
const POSEE = ["", "Pose la division.", "Place la virgule au bon moment.", "Sans calculatrice.", "Partage les dixièmes."];
const divisionDecimaleDividende: TutorBankItemV4[] = [
  dd(1, "Partage d'abord les unités, mets la virgule au quotient, puis partage les dixièmes.", () => {
    const d = entre(2, 9);
    const { a } = tireD1(d);
    return qcmN(a / d, fauxDd2(a, d), expDd(a, d), v(POSEE, QUOT(`${fr(a)} ÷ ${d}`)));
  }),
  dd(1, "Écris le nombre en dixièmes, partage, puis reviens aux unités.", () => {
    const d = entre(2, 9);
    const { a } = tireD1(d);
    const sv = net(a * 10);
    return qcmN(a / d, [sv / d, net(sv / d / 100), net(a / d + 1), net(a / d - 0.1)], expDd(a, d), v([`On sait que ${fr(sv)} ÷ ${d} = ${fr(sv / d)}.`, `Voici un calcul juste : ${fr(sv)} ÷ ${d} = ${fr(sv / d)}.`, `Tu sais déjà que ${fr(sv)} ÷ ${d} = ${fr(sv / d)}.`], QUOT(`${fr(a)} ÷ ${d}`)));
  }),
  dd(1, "Lis la division posée. La virgule arrive quand on passe aux dixièmes.", () => {
    const d = entre(2, 9);
    const { a } = tireD1(d);
    return qcmN(a / d, fauxDd2(a, d), expDd(a, d), v(["Voici une division posée.", "Regarde cette division.", "Lis l'opération."], ["Quel est le quotient ?", "Quel nombre écrire au quotient ?", "Quel est le résultat ?", "Que trouve-t-on au quotient ?", "Quel est le résultat, avec la virgule ?"]), poseDiv(a, d));
  }),
  dd(2, "Attention aux dixièmes : s'il n'y en a pas assez, écris un 0 au quotient.", () => {
    const d = entre(2, 9);
    const { a, q } = tireZero(d);
    const f = fr(q).split(",");
    return qcmN(q, [Number(`${f[0]}.${Number(f[1])}`), net(q * 10), net(q + 1), net(q / 10), net(q + 0.1)], expDd(a, d), v(["", "Attention au zéro.", "Pas assez de dixièmes ?", "Regarde les dixièmes.", "Attention au chiffre des dixièmes."], QUOT(`${fr(a)} ÷ ${d}`)));
  }),
  dd(2, "Partage les centièmes aussi.", () => {
    const d = entre(2, 9);
    let q = net(entre(1, 9) + entre(11, 99) / 100);
    while (Number.isInteger(net(q * d)) || nbDecimales(q) !== 2) q = net(entre(1, 9) + entre(11, 99) / 100);
    const a = net(q * d);
    return qcmN(q, fauxDd2(a, d), expDd(a, d), v(["", "Pose la division.", "Place la virgule au bon moment.", "Sans calculatrice.", "Va jusqu'aux centièmes."], QUOT(`${fr(a)} ÷ ${d}`)));
  }),
  dd(2, "Compte combien de dixièmes il faut partager.", () => {
    const d = entre(2, 9);
    let { a, q } = tireD1(d);
    while (Math.floor(a) === Math.floor(q) * d) ({ a, q } = tireD1(d));
    const e = Math.floor(q);
    const resteU = Math.floor(a) - e * d;
    const dix = Math.round((a - Math.floor(a)) * 10) + resteU * 10;
    return qcmN(dix, [resteU, dix + 10, dix + 1, dix - 1, Math.round((a - Math.floor(a)) * 10), resteU + 10].filter((x) => x !== dix && x >= 0), expDd(a, d), v([`On pose ${fr(a)} ÷ ${d}.`, `On calcule ${fr(a)} ÷ ${d}.`, `Voici ${fr(a)} ÷ ${d}.`], [`Au quotient, on a écrit ${e}, et il reste ${resteU} unité${resteU > 1 ? "s" : ""}.`], ["Combien de dixièmes faut-il partager maintenant ?", "Combien de dixièmes y a-t-il à partager ?", "Quel nombre de dixièmes reste à partager ?"]));
  }),
  dd(3, "Partager à parts égales : le total ÷ le nombre de parts.", () => {
    const d = entre(2, 9);
    const { a } = tireD1(d);
    const C = un([
      { t: `${d} amis se partagent ${fr(a)} kg de mangues`, u: "kg" }, { t: `Une corde de ${fr(a)} m est coupée en ${d} morceaux égaux`, u: "m" }, { t: `${fr(a)} L de jus remplissent ${d} carafes égales`, u: "L" }, { t: `Un trajet de ${fr(a)} km se fait en ${d} étapes égales`, u: "km" }, { t: `${d} chevaux se partagent ${fr(a)} kg de foin`, u: "kg" }, { t: `${fr(a)} m de ruban servent à ${d} paquets identiques`, u: "m" },
      { t: `${d} scientifiques partagent ${fr(a)} L de solution`, u: "L" }, { t: `${d} sacs identiques pèsent ${fr(a)} kg en tout`, u: "kg" }, { t: `${d} marcheurs relaient un parcours de ${fr(a)} km à parts égales`, u: "km" }, { t: `Une table de ${fr(a)} m accueille ${d} enfants, chacun avec la même place`, u: "m" },
    ]);
    return qcmN(a / d, fauxDd2(a, d), expDd(a, d), `${C.t}. ${v(["Combien pour une part ?", "Que vaut une part ?", "Quelle est la valeur d'une part ?"])}`, undefined, C.u);
  }),
  dd(3, "Prix total ÷ nombre d'objets.", () => {
    const d = entre(2, 9);
    const q = un([net(entre(1, 9) + un([0.5, 0.2, 0.4, 0.8, 0.25, 0.75, 0.15, 0.05, 0.6])), net(entre(1, 5) + un([0.05, 0.02, 0.08]))]);
    const a = Number.isInteger(net(q * d)) ? net(q * d + d * 0.1) : net(q * d);
    const O = un(["cahiers", "tickets", "stylos", "balles", "sachets de bonbons", "bouteilles", "paires de chaussettes", "pots de confiture", "cartes", "gommes", "cadenas", "lampes de poche"]);
    return qcmN(a / d, fauxDd2(a, d), expDd(a, d), `${d} ${O} identiques coûtent ${eur(a)} €. ${v(["Quel est le prix d'une unité ?", "Combien coûte une unité ?", "Combien paie-t-on par unité ?"])}`, undefined, "€");
  }),
];

export const operationsDecimalesBank: TutorBankItemV4[] = [
  ...multiplicationDecimalePosee,
  ...divisionDecimalePosee,
  ...divisionDecimaleDividende,
];
