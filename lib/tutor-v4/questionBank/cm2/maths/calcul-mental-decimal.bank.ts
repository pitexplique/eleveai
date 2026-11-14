// CALCUL MENTAL SUR LES DÉCIMAUX, MOITIÉS, × 50, ORDRE DE GRANDEUR (05/11/2026).
// Trous du programme de CM2 : cm2-N-mental-2, -13, -14, -15, -17 ; partiel cm2-N-operations-1.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import type { CanvasFigure } from "@/lib/tutor-v4/types_canvas";
import { entre, eur, exp, fr, gabarits, net, qcm, qcmN, un, v } from "./trous-outils";

const barre = (total: string, a: string, b: string, inconnu = true): CanvasFigure => ({
  kind: "schema_barre",
  total,
  parts: [{ label: "moitié", value: a, unknown: inconnu }, { label: "moitié", value: b, unknown: inconnu }],
  display: { showTotal: true, showPartLabels: true, showValues: !inconnu },
});

/* ───────────────────────── calcul_moitie_impair ───────────────────────── */
const mi = gabarits("calcul_moitie_impair", "calcul", ["moitie"]);
const IMPAIRS = [1, 3, 5, 7, 9, 11, 13, 15];
const expMi = (n: number) =>
  exp("la moitié d'un nombre, c'est ce nombre partagé en 2 parts égales.", `${n} = ${n - 1} + 1. On prend la moitié de chaque morceau.`, `moitié de ${n - 1} : ${(n - 1) / 2} ; moitié de 1 : 0,5 ; ${(n - 1) / 2} + 0,5 = ${fr(n / 2)}.`, `la moitié de ${n} est ${fr(n / 2)}.`);
const INTRO_M = ["", "De tête.", "Sans poser l'opération.", "Calcul mental."];
const fauxMi = (n: number) => [Math.floor(n / 2), Math.ceil(n / 2), net(n / 2 + 1), n * 2, net(n / 2 - 1), n / 10];
const calculMoitieImpair: TutorBankItemV4[] = [
  mi(1, "Coupe le nombre : un nombre pair + 1. La moitié de 1, c'est 0,5.", () => {
    const n = un(IMPAIRS);
    return qcmN(n / 2, fauxMi(n), expMi(n), v(INTRO_M, [`Quelle est la moitié de ${n} ?`, `Combien fait la moitié de ${n} ?`, `Trouve la moitié de ${n}.`, `Que vaut la moitié de ${n} ?`, `Choisis la moitié de ${n}.`]));
  }),
  mi(1, "Le double du résultat doit redonner le nombre.", () => {
    const n = un(IMPAIRS);
    return qcmN(n / 2, fauxMi(n), expMi(n) + `\n\nOn vérifie : ${fr(n / 2)} + ${fr(n / 2)} = ${n}.`, v(INTRO_M, [`${n} ÷ 2 = ?`, `Combien font ${n} ÷ 2 ?`, `Calcule ${n} ÷ 2.`, `Quel est le résultat de ${n} ÷ 2 ?`, `Que vaut ${n} ÷ 2 ?`]));
  }),
  mi(1, "Regarde le schéma : deux parts égales.", () => {
    const n = un(IMPAIRS);
    return qcmN(n / 2, fauxMi(n), expMi(n), v(["Le tout vaut " + n + " et il est coupé en deux.", "La barre vaut " + n + ".", "Ce schéma partage " + n + " en deux parts égales."], ["Que vaut une part ?", "Combien vaut chaque part ?", "Quelle est la valeur d'une part ?", "Combien vaut une moitié ?", "Que vaut une moitié ?"]), barre(String(n), "?", "?"));
  }),
  mi(2, "Cherche le nombre qui, ajouté à lui-même, donne le total.", () => {
    const n = un(IMPAIRS);
    return qcmN(n / 2, fauxMi(n), expMi(n), v(INTRO_M, [`Le double de quel nombre donne ${n} ?`, `Quel nombre, ajouté à lui-même, donne ${n} ?`, `… + … = ${n}, avec deux fois le même nombre. Lequel ?`, `2 × … = ${n}. Quel nombre manque ?`, `Quel nombre multiplié par 2 fait ${n} ?`]));
  }),
  mi(2, "Ajoute les deux moitiés.", () => {
    const a = un(IMPAIRS);
    let b = un(IMPAIRS);
    while (b === a) b = un(IMPAIRS);
    const r = (a + b) / 2;
    return qcmN(r, [a + b, r + 1, net(r + 0.5), net(r - 0.5), r - 1], exp("la moitié d'un impair se termine par ,5.", "on calcule chaque moitié, puis on ajoute.", `${fr(a / 2)} + ${fr(b / 2)} = ${fr(r)}.`, `le résultat est ${fr(r)}.`), v(INTRO_M, [`Ajoute la moitié de ${a} et la moitié de ${b}.`, `Combien font la moitié de ${a} plus la moitié de ${b} ?`, `Calcule : moitié de ${a} + moitié de ${b}.`, `Que donne la moitié de ${a} ajoutée à la moitié de ${b} ?`]));
  }),
  mi(2, "Compare : le nombre et le double de l'autre.", () => {
    const n = un(IMPAIRS.filter((x) => x > 1));
    const f = un([net(n / 2 + 0.5), net(n / 2 - 0.5), net(n / 2 + 1)]);
    const oui = Math.random() < 0.5;
    const x = oui ? net(n / 2) : f;
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], expMi(n), v(INTRO_M, [`La moitié de ${n} est-elle égale à ${fr(x)} ?`, `Est-ce que ${fr(x)} est la moitié de ${n} ?`, `A-t-on ${fr(x)} + ${fr(x)} = ${n} ?`, `${fr(x)} est-il la moitié de ${n} ?`]));
  }),
  mi(3, "On partage en deux : chacun a la moitié.", () => {
    const n = un(IMPAIRS.filter((x) => x > 1));
    const C = un([
      { t: `Deux amis se partagent ${n} kg de mangues`, u: "kg" }, { t: `Deux sœurs partagent ${n} € à parts égales`, u: "€" }, { t: `Un ruban de ${n} m est coupé en deux morceaux égaux`, u: "m" }, { t: `Deux cuves se partagent ${n} L d'eau à parts égales`, u: "L" },
      { t: `Une course de ${n} km est coupée en deux étapes égales`, u: "km" }, { t: `Deux frères se partagent ${n} kg de riz`, u: "kg" }, { t: `Un relais de ${n} km se court à deux, à parts égales`, u: "km" }, { t: `Deux voisines se partagent ${n} m de tissu`, u: "m" },
    ]);
    return qcmN(n / 2, fauxMi(n), expMi(n), `${C.t}. ${v(["Combien pour une part ?", "Que vaut une part ?", "Quelle est la valeur d'une part ?"])}`, undefined, C.u);
  }),
  mi(3, "Le prix de deux divisé par 2 donne le prix d'un.", () => {
    const n = un(IMPAIRS.filter((x) => x > 1));
    const O = un(["sandwichs", "livres", "billets de cinéma", "ballons", "cahiers", "jeux de cartes", "bouteilles", "gâteaux", "t-shirts", "places de concert"]);
    return qcmN(n / 2, fauxMi(n), expMi(n), `Deux ${O} identiques coûtent ${n} €. ${v(["Quel est le prix d'un seul ?", "Combien coûte un seul ?", "Quel est le prix à l'unité ?", "Combien paie-t-on pour une unité ?"])}`, undefined, "€");
  }),
];

/* ───────────────────────── calcul_double_decimal ───────────────────────── */
const dd = gabarits("calcul_double_decimal", "calcul", ["double"]);
const expDd = (x: number) => {
  const e = Math.floor(x);
  const d = net(x - e);
  return exp("le double d'un nombre, c'est ce nombre ajouté à lui-même.", "on double la partie entière, puis la partie après la virgule.", `${e} × 2 = ${e * 2} ; ${fr(d)} × 2 = ${fr(d * 2)} ; ${e * 2} + ${fr(d * 2)} = ${fr(x * 2)}.`, `le double de ${fr(x)} est ${fr(x * 2)}.`);
};
const fauxDd = (x: number) => {
  const r = net(x * 2);
  const e = Math.floor(x);
  const d = net(x - e);
  return [net(e * 2 + d), net(e + d * 2), net(r + 1), net(r - 1), net(r / 10), net(x + 2), net(r + 0.1)].filter((f) => f !== r);
};
const sansRetenue = () => net(entre(1, 40) + entre(1, 4) / 10);
const avecRetenue = () => net(entre(1, 40) + un([0.5, 0.6, 0.7, 0.8, 0.9, 0.25, 0.75, 0.15, 0.35]));
const DBL = (c: string) => [`Quel est le double de ${c} ?`, `Calcule le double de ${c}.`, `Trouve le double de ${c}.`, `Que vaut le double de ${c} ?`, `Choisis le double de ${c}.`];
const DBL2 = (c: string) => [`${c} × 2 = ?`, `Combien font ${c} × 2 ?`, `Combien font ${c} + ${c} ?`, `Calcule ${c} + ${c}.`, `Calcule ${c} × 2.`];
const calculDoubleDecimal: TutorBankItemV4[] = [
  dd(1, "Double la partie entière, puis les dixièmes.", () => {
    const x = sansRetenue();
    return qcmN(x * 2, fauxDd(x), expDd(x), v(INTRO_M, DBL(fr(x))));
  }),
  dd(1, "Double : le nombre ajouté à lui-même.", () => {
    const x = sansRetenue();
    return qcmN(x * 2, fauxDd(x), expDd(x), v(INTRO_M, DBL2(fr(x))));
  }),
  dd(1, "Lis le schéma : deux parts égales font le total.", () => {
    const x = sansRetenue();
    return qcmN(x * 2, fauxDd(x), expDd(x), v([`Chaque part vaut ${fr(x)}.`, `Les deux parts valent ${fr(x)} chacune.`, `Une part de la barre vaut ${fr(x)}.`], ["Que vaut toute la barre ?", "Combien vaut le total ?", "Quel est le total ?", "Combien font les deux parts ?", "Que vaut le tout ?"]), { kind: "schema_barre", total: "?", parts: [{ label: "part", value: fr(x) }, { label: "part", value: fr(x) }], display: { showTotal: true, showPartLabels: false, showValues: true } });
  }),
  dd(2, "Attention : 10 dixièmes font 1 unité.", () => {
    const x = avecRetenue();
    return qcmN(x * 2, fauxDd(x), expDd(x), v(["", "Attention à la retenue.", "Dix dixièmes font une unité.", "Pense aux dixièmes."], DBL(fr(x))));
  }),
  dd(2, "Coupe le nombre en deux morceaux faciles.", () => {
    const x = avecRetenue();
    return qcmN(x * 2, fauxDd(x), expDd(x), v(["", "Attention à la retenue.", "Dix dixièmes font une unité.", "Pense aux dixièmes."], DBL2(fr(x))));
  }),
  dd(2, "On cherche le nombre de départ : c'est la moitié du résultat.", () => {
    const x = avecRetenue();
    return qcmN(x, [net(x * 2), net(x + 1), net(x - 1), net(x * 4), net(x + 0.1)], expDd(x), v(INTRO_M, [`Le double d'un nombre vaut ${fr(x * 2)}. Quel est ce nombre ?`, `Quel nombre a pour double ${fr(x * 2)} ?`, `… × 2 = ${fr(x * 2)}. Quel nombre manque ?`, `De quel nombre ${fr(x * 2)} est-il le double ?`]));
  }),
  dd(3, "Deux fois plus, c'est le double.", () => {
    const x = un([sansRetenue(), avecRetenue()]);
    const C = un([
      { t: `Un sac de riz pèse ${fr(x)} kg. Un autre pèse deux fois plus`, q: "Combien pèse le deuxième ?", u: "kg" }, { t: `Une planche mesure ${fr(x)} m. Une autre est deux fois plus longue`, q: "Combien mesure la deuxième ?", u: "m" }, { t: `Une gourde contient ${fr(x)} L. Un bidon contient deux fois plus`, q: "Combien contient le bidon ?", u: "L" }, { t: `Un livre coûte ${eur(x)} €. Un jeu coûte deux fois plus`, q: "Combien coûte le jeu ?", u: "€" },
      { t: `Une tortue parcourt ${fr(x)} km. Un dauphin parcourt deux fois plus`, q: "Quelle distance fait le dauphin ?", u: "km" }, { t: `Un chat pèse ${fr(x)} kg. Un chien pèse le double`, q: "Combien pèse le chien ?", u: "kg" }, { t: `Une affiche fait ${fr(x)} dm de large. Une autre fait le double`, q: "Quelle largeur a la deuxième ?", u: "dm" }, { t: `Une randonnée fait ${fr(x)} km à l'aller. Le retour fait la même distance`, q: "Quelle est la distance totale ?", u: "km" },
      { t: `Un timbre vaut ${eur(x)} €. On en achète deux`, q: "Quel est le prix à payer ?", u: "€" }, { t: `Un seau contient ${fr(x)} L. On en verse deux dans un bac`, q: "Combien de litres dans le bac ?", u: "L" },
    ]);
    return qcmN(x * 2, fauxDd(x), expDd(x), `${C.t}. ${C.q}`, undefined, C.u);
  }),
  dd(3, "Double la longueur et la largeur, ou fais longueur + largeur, puis × 2.", () => {
    const L = net(entre(2, 15) + un([0.5, 0.2, 0.4]));
    const O = un(["Un jardin", "Une table", "Un tapis", "Une affiche", "Une cour", "Un terrain de jeu", "Un cahier", "Un bassin"]);
    const l = entre(1, 5);
    const s = net(L + l);
    return qcmN(s * 2, [s, net(L * 2 + l), net(L + l * 2), net(s * 2 + 1), net(L * l)], exp("le périmètre d'un rectangle, c'est le double de longueur + largeur.", "on ajoute la longueur et la largeur, puis on double.", `${fr(L)} + ${l} = ${fr(s)} ; ${fr(s)} × 2 = ${fr(s * 2)}.`, `le périmètre est ${fr(s * 2)} m.`), `${O} rectangulaire mesure ${fr(L)} m sur ${l} m. ${v(["Quel est son périmètre ?", "Combien mesure son tour ?", "Quelle longueur fait son tour complet ?"])}`, undefined, "m");
  }),
  dd(3, "Deux fois plus de tout : on double la quantité.", () => {
    const x = net(entre(1, 6) + un([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.25, 0.75]));
    const C = un([
      { t: `Une recette demande ${fr(x)} kg de farine`, u: "kg" }, { t: `Un gâteau demande ${fr(x)} L de lait`, u: "L" }, { t: `Une peinture demande ${fr(x)} L d'eau`, u: "L" }, { t: `Un mur demande ${fr(x)} kg de ciment`, u: "kg" },
      { t: `Une robe demande ${fr(x)} m de tissu`, u: "m" }, { t: `Un cerf-volant demande ${fr(x)} m de ficelle`, u: "m" }, { t: `Un jus de fruits demande ${fr(x)} kg de mangues`, u: "kg" }, { t: `Un parcours demande ${fr(x)} km de marche`, u: "km" },
    ]);
    return qcmN(x * 2, fauxDd(x), expDd(x), `${C.t}. ${v(["On veut en faire deux.", "On en prépare deux.", "On le fait deux fois."])} ${v(["Combien en faut-il en tout ?", "Quelle quantité faut-il ?", "Quelle est la quantité totale ?"])}`, undefined, C.u);
  }),
];

/* ───────────────────────── calcul_moitie_decimal ───────────────────────── */
const md = gabarits("calcul_moitie_decimal", "calcul", ["moitie"]);
const expMd = (x: number) => {
  const e = Math.floor(x);
  const d = net(x - e);
  return exp("la moitié d'un nombre, c'est ce nombre partagé en 2 parts égales.", "on prend la moitié de la partie entière, puis celle de la partie après la virgule.", `moitié de ${e} : ${fr(e / 2)} ; moitié de ${fr(d)} : ${fr(d / 2)} ; ${fr(e / 2)} + ${fr(d / 2)} = ${fr(x / 2)}.`, `la moitié de ${fr(x)} est ${fr(x / 2)}.`);
};
const fauxMd = (x: number) => {
  const r = net(x / 2);
  const e = Math.floor(x);
  const d = net(x - e);
  return [net(e / 2 + d), net(e + d / 2), net(r + 1), net(r + 0.1), net(x * 2), net(r * 10), net(r + 0.5)].filter((f) => f !== r && f > 0);
};
/** Parties paires : 8,4 ; 12,6. */
const moitieFacile = () => net(2 * entre(1, 20) + 2 * entre(1, 4) / 10);
/** Partie entière impaire : 7,6 → 3,8. */
const moitieDure = () => net(2 * entre(1, 20) + 1 + 2 * entre(1, 4) / 10);
const MOI = (c: string) => [`Quelle est la moitié de ${c} ?`, `Calcule la moitié de ${c}.`, `Trouve la moitié de ${c}.`, `Que vaut la moitié de ${c} ?`, `Choisis la moitié de ${c}.`];
const MOI2 = (c: string) => [`${c} ÷ 2 = ?`, `Combien font ${c} ÷ 2 ?`, `Calcule ${c} ÷ 2.`, `Quel est le résultat de ${c} ÷ 2 ?`, `Que vaut ${c} ÷ 2 ?`];
const calculMoitieDecimal: TutorBankItemV4[] = [
  md(1, "Prends la moitié de chaque morceau.", () => {
    const x = moitieFacile();
    return qcmN(x / 2, fauxMd(x), expMd(x), v(INTRO_M, MOI(fr(x))));
  }),
  md(1, "Diviser par 2, c'est prendre la moitié.", () => {
    const x = moitieFacile();
    return qcmN(x / 2, fauxMd(x), expMd(x), v(INTRO_M, MOI2(fr(x))));
  }),
  md(1, "Le schéma coupe le nombre en deux parts égales.", () => {
    const x = moitieFacile();
    return qcmN(x / 2, fauxMd(x), expMd(x), v([`La barre vaut ${fr(x)}.`, `Le tout vaut ${fr(x)}, coupé en deux.`, `Ce schéma partage ${fr(x)} en deux parts égales.`], ["Que vaut une part ?", "Combien vaut chaque part ?", "Quelle est la valeur d'une part ?", "Combien vaut une moitié ?", "Que vaut une moitié ?"]), barre(fr(x), "?", "?"));
  }),
  md(2, "La moitié de la partie entière peut finir par ,5 : ajoute-la au reste.", () => {
    const x = moitieDure();
    return qcmN(x / 2, fauxMd(x), expMd(x), v(["", "Attention : la partie entière est impaire.", "Coupe en deux morceaux faciles.", "Pense à la moitié d'un impair."], MOI(fr(x))));
  }),
  md(2, "La moitié d'un entier impair se termine par ,5.", () => {
    const x = moitieDure();
    return qcmN(x / 2, fauxMd(x), expMd(x), v(["", "Attention : la partie entière est impaire.", "Coupe en deux morceaux faciles.", "Pense à la moitié d'un impair."], MOI2(fr(x))));
  }),
  md(2, "Le nombre de départ est le double.", () => {
    const x = un([moitieFacile(), moitieDure()]);
    return qcmN(x, [net(x / 2), net(x / 4), net(x + 1), net(x + 0.2), net(x - 1)], exp("si on connaît la moitié, on retrouve le nombre avec le double.", "on multiplie la moitié par 2.", `${fr(x / 2)} × 2 = ${fr(x)}.`, `le nombre est ${fr(x)}.`), v(INTRO_M, [`La moitié d'un nombre vaut ${fr(x / 2)}. Quel est ce nombre ?`, `Quel nombre a pour moitié ${fr(x / 2)} ?`, `… ÷ 2 = ${fr(x / 2)}. Quel nombre manque ?`, `De quel nombre ${fr(x / 2)} est-il la moitié ?`]));
  }),
  md(3, "Partager en deux, c'est diviser par 2.", () => {
    const x = un([moitieFacile(), moitieDure()]);
    const C = un([
      { t: `Deux amis partagent ${fr(x)} kg de mangues`, u: "kg" }, { t: `Une corde de ${fr(x)} m est coupée en son milieu`, u: "m" }, { t: `Deux seaux se partagent ${fr(x)} L d'eau`, u: "L" }, { t: `Une addition de ${eur(x)} € est payée à deux`, u: "€" },
      { t: `Un trajet de ${fr(x)} km se fait en deux étapes égales`, u: "km" }, { t: `Deux chevaux se partagent ${fr(x)} kg de foin`, u: "kg" }, { t: `Une bande de ${fr(x)} dm est pliée en deux`, u: "dm" }, { t: `Deux équipes se partagent ${fr(x)} km de relais`, u: "km" }, { t: `Une pizza à ${eur(x)} € est partagée entre deux amis`, u: "€" }, { t: `Une bouteille de ${fr(x)} L remplit deux carafes égales`, u: "L" },
    ]);
    return qcmN(x / 2, fauxMd(x), expMd(x), `${C.t}. ${v(["Combien pour une part ?", "Que vaut une part ?", "Quelle est la valeur d'une part ?"])}`, undefined, C.u);
  }),
  md(3, "Moitié prix : on divise le prix par 2.", () => {
    const x = un([moitieFacile(), moitieDure()]);
    const O = un(["Un jeu", "Un sac", "Un livre", "Un ballon", "Une paire de chaussettes", "Un casque", "Une lampe", "Un maillot", "Une trousse", "Un cartable"]);
    return qcmN(x / 2, fauxMd(x), expMd(x), `${O} coûte ${eur(x)} €. ${v(["Le magasin fait moitié prix.", "Les soldes divisent le prix par deux.", "Aujourd'hui, c'est moitié prix."])} ${v(["Quel est le nouveau prix ?", "Combien faut-il payer maintenant ?", "Que paie-t-on maintenant ?"])}`, undefined, "€");
  }),
];

/* ───────────────────────── calcul_diviser_4_8 ───────────────────────── */
const d48 = gabarits("calcul_diviser_4_8", "calcul", ["moitie"]);
const expD4 = (n: number) => exp("diviser par 4, c'est prendre la moitié de la moitié.", "on prend la moitié, puis encore la moitié.", `${n} → ${n / 2} → ${n / 4}.`, `${n} ÷ 4 = ${n / 4}.`);
const expD8 = (n: number) => exp("diviser par 8, c'est prendre trois fois la moitié.", "on prend la moitié, encore la moitié, encore la moitié.", `${n} → ${n / 2} → ${n / 4} → ${n / 8}.`, `${n} ÷ 8 = ${n / 8}.`);
const fauxQ = (n: number, d: number) => {
  const r = n / d;
  return [n / 2, r + 1, r - 1, r + 2, r * 2, n - d, r + 10].filter((f) => f !== r && Number.isInteger(f) && f > 0);
};
const MOITIES = ["", "Prends des moitiés.", "Pas besoin de poser.", "La moitié, encore la moitié…"];
const DIV = (n: number, d: number) => [`Combien font ${n} ÷ ${d} ?`, `Calcule ${n} ÷ ${d}.`, `${n} ÷ ${d} = ?`, `Quel est le résultat de ${n} ÷ ${d} ?`, `Que vaut ${n} ÷ ${d} ?`];
const calculDiviser48: TutorBankItemV4[] = [
  d48(1, "La moitié, puis encore la moitié.", () => {
    const n = 4 * entre(3, 30);
    return qcmN(n / 4, fauxQ(n, 4), expD4(n), v(MOITIES, DIV(n, 4)));
  }),
  d48(1, "Pense à deux moitiés de suite.", () => {
    const n = 4 * entre(3, 30);
    return qcmN(n / 2, [n / 4, n - 2, n * 2, n / 2 + 1, n / 2 - 1], expD4(n), v([`On calcule ${n} ÷ 4 avec des moitiés.`, `Pour faire ${n} ÷ 4, on prend deux moitiés.`, `${n} ÷ 4 se fait en deux moitiés.`], ["Quelle est la première étape ?", "Quel nombre obtient-on d'abord ?", "Quel résultat trouve-t-on après la première moitié ?", "Quelle est la première moitié ?", "Que trouve-t-on en premier ?"]));
  }),
  d48(1, "Diviser par 4 = deux fois la moitié ; diviser par 8 = trois fois la moitié.", () => {
    const d = un([4, 8]);
    const k = d === 4 ? 2 : 3;
    const n = d * entre(3, 15);
    return qcmN(k, [1, 4, d, d / 2, k + 2].filter((x) => x !== k), d === 4 ? expD4(n) : expD8(n), v(MOITIES, [`Pour diviser par ${d}, combien de moitiés faut-il prendre ?`, `Combien de fois faut-il prendre la moitié pour diviser par ${d} ?`, `Diviser par ${d}, c'est prendre la moitié combien de fois ?`, `Combien de moitiés de suite remplacent ÷ ${d} ?`]));
  }),
  d48(2, "Trois moitiés de suite.", () => {
    const n = 8 * entre(3, 25);
    return qcmN(n / 8, fauxQ(n, 8), expD8(n), v(MOITIES, DIV(n, 8)));
  }),
  d48(2, "Quatre, c'est deux moitiés : essaie aussi sur un grand nombre.", () => {
    const n = 4 * entre(30, 250);
    return qcmN(n / 4, fauxQ(n, 4), expD4(n), v(["Un grand nombre, mais ça reste facile.", "Commence par la moitié.", "Des moitiés suffisent.", "Grand nombre : coupe en deux."], DIV(n, 4)));
  }),
  d48(2, "Cherche l'étape qui manque.", () => {
    const n = 8 * entre(3, 25);
    return qcmN(n / 4, [n / 8, n / 2, n / 4 + 1, n / 4 - 1, n / 4 + 2], expD8(n), v([`${n} → ${n / 2} → … → ${n / 8}.`, `On divise ${n} par 8 : ${n}, ${n / 2}, …, ${n / 8}.`, `Moitiés de ${n} : ${n / 2}, puis …, puis ${n / 8}.`], ["Quel nombre manque ?", "Quelle étape a été effacée ?", "Quelle étape manque ?", "Quelle moitié manque ?", "Quel nombre faut-il écrire ?"]));
  }),
  d48(3, "Partager entre 4 ou 8, c'est prendre des moitiés.", () => {
    const d = un([4, 8]);
    const n = d * entre(6, 25);
    const C = un([
      { t: `${d} amis se partagent ${n} €`, u: "€" }, { t: `${n} billes sont rangées en ${d} sacs égaux`, u: "billes" }, { t: `${n} élèves forment ${d} équipes égales`, u: "élèves" }, { t: `${d} randonneurs se partagent ${n} kg de matériel`, u: "kg" }, { t: `${n} L d'eau remplissent ${d} cuves égales`, u: "L" }, { t: `${n} photos remplissent ${d} pages égales`, u: "photos" },
      { t: `${n} m de corde sont coupés en ${d} morceaux égaux`, u: "m" }, { t: `Un trajet de ${n} km se fait en ${d} étapes égales`, u: "km" }, { t: `${n} graines sont réparties dans ${d} pots`, u: "graines" }, { t: `${d} pêcheurs se partagent ${n} kg de poissons`, u: "kg" }, { t: `${n} cartes sont distribuées à ${d} joueurs`, u: "cartes" }, { t: `${n} bonbons sont répartis en ${d} sachets égaux`, u: "bonbons" },
    ]);
    return qcmN(n / d, fauxQ(n, d), d === 4 ? expD4(n) : expD8(n), `${C.t}. ${v(["Combien pour chaque part ?", "Combien dans chaque part ?", "Que vaut une part ?"])}`, undefined, C.u);
  }),
  d48(3, "Le prix d'un seul : total ÷ nombre d'objets.", () => {
    const d = un([4, 8]);
    const n = d * entre(5, 30);
    const O = un(["places de cinéma", "billets de train", "t-shirts", "livres", "pizzas", "boîtes de feutres", "ballons", "masques de plongée", "cahiers de dessin", "tickets de concert"]);
    return qcmN(n / d, fauxQ(n, d), d === 4 ? expD4(n) : expD8(n), `${d} ${O} coûtent ${n} € en tout. ${v(["Quel est le prix d'une unité ?", "Combien coûte une unité ?", "Combien paie-t-on par unité ?"])}`, undefined, "€");
  }),
];

/* ───────────────────────── calcul_multiplier_50 ───────────────────────── */
const m5 = gabarits("calcul_multiplier_50", "calcul", ["mental"]);
const expM5 = (x: number) => exp("× 5, c'est × 10, puis la moitié.", "× 10 rend chaque chiffre 10 fois plus grand ; puis on prend la moitié.", `${fr(x)} × 10 = ${fr(x * 10)} ; ${fr(x * 10)} ÷ 2 = ${fr(x * 5)}.`, `${fr(x)} × 5 = ${fr(x * 5)}.`);
const expM50 = (x: number) => exp("× 50, c'est × 100, puis la moitié.", "× 100 rend chaque chiffre 100 fois plus grand ; puis on prend la moitié.", `${fr(x)} × 100 = ${fr(x * 100)} ; ${fr(x * 100)} ÷ 2 = ${fr(x * 50)}.`, `${fr(x)} × 50 = ${fr(x * 50)}.`);
const fauxM = (x: number, k: number) => {
  const r = net(x * k);
  return [net(x * k * 2), net(r / 10), net(r * 10), net(r + k), net(x + k), net(r - k), net(r / 2)].filter((f) => f !== r && f > 0);
};
const MUL = (c: string) => [`Combien font ${c} ?`, `Calcule ${c}.`, `${c} = ?`, `Quel est le résultat de ${c} ?`, `Que vaut ${c} ?`];
const ASTUCE5 = ["", "Astuce : × 10, puis la moitié.", "De tête.", "Sans poser.", "Calcul mental.", "Pense à la moitié de × 10."];
const ASTUCE50 = ["", "Astuce : × 100, puis la moitié.", "De tête.", "Sans poser.", "Calcul mental.", "Pense à la moitié de × 100."];
const decimal50 = () => net(entre(1, 40) + un([0.2, 0.4, 0.5, 0.6, 0.8, 0.1, 0.3]));
const petit50 = () => net(entre(1, 6) + un([0.2, 0.4, 0.5, 0.6, 0.8, 0.1, 0.3]));
// ⭐ 14/11/2026 — le dessin de l'astuce : × 5 = cinq fois le nombre ; × 50 = la moitié de × 100.
const barreM = (x: string, k: number): CanvasFigure =>
  k === 5
    ? { kind: "schema_barre", total: "?", parts: Array.from({ length: 5 }, () => ({ label: "", value: x })), display: { showTotal: true, showPartLabels: false, showValues: true } }
    : barre(`${x} × 100`, "?", "?");
const calculMultiplier50: TutorBankItemV4[] = [
  m5(1, "Multiplie par 10, puis prends la moitié.", () => {
    const x = entre(6, 80);
    return qcmN(x * 5, fauxM(x, 5), expM5(x), v(ASTUCE5, MUL(`${x} × 5`)), barreM(fr(x), 5));
  }),
  m5(1, "Multiplie par 100, puis prends la moitié.", () => {
    const x = entre(3, 40);
    return qcmN(x * 50, fauxM(x, 50), expM50(x), v(ASTUCE50, MUL(`${x} × 50`)), barreM(fr(x), 50));
  }),
  m5(1, "× 5, c'est la moitié de × 10 ; × 50, la moitié de × 100.", () => {
    const k = un([5, 50]);
    const x = entre(6, 60);
    const pre = k === 5 ? 10 : 100;
    return qcm(`${x} × ${pre} ÷ 2`, [`${x} × ${pre} × 2`, `${x} ÷ ${pre} × 2`, `${x} + ${k}`, `${x} × 2 ÷ ${pre}`], k === 5 ? expM5(x) : expM50(x), v(["", "De tête.", "Sans poser.", "Calcul mental."], [`Quel calcul donne ${x} × ${k} ?`, `Quel calcul est égal à ${x} × ${k} ?`, `Choisis un calcul égal à ${x} × ${k}.`, `Par quel calcul remplacer ${x} × ${k} ?`, `Quelle astuce donne ${x} × ${k} ?`]));
  }),
  m5(2, "Multiplie le décimal par 100, puis prends la moitié.", () => {
    const x = decimal50();
    return qcmN(x * 50, fauxM(x, 50), expM50(x), v(ASTUCE50, MUL(`${fr(x)} × 50`)), barreM(fr(x), 50));
  }),
  m5(2, "Multiplie le décimal par 10, puis prends la moitié.", () => {
    const x = decimal50();
    return qcmN(x * 5, fauxM(x, 5), expM5(x), v(ASTUCE5, MUL(`${fr(x)} × 5`)), barreM(fr(x), 5));
  }),
  m5(2, "Cherche l'étape qui manque.", () => {
    const x = decimal50();
    return qcmN(x * 100, [x * 10, x * 50, x * 1000, x * 100 + 2].map(net), expM50(x), v([`Pour ${fr(x)} × 50, on fait d'abord × 100.`, `${fr(x)} × 50 : on commence par multiplier par 100.`, `On calcule ${fr(x)} × 50 avec l'astuce du × 100.`], ["Quel nombre obtient-on d'abord ?", "Quel est le résultat de cette première étape ?", "Que vaut la première étape ?", "Que trouve-t-on avant de prendre la moitié ?", "Quel nombre faut-il couper en deux ensuite ?"]));
  }),
  m5(3, "Multiplie le prix par 50 : × 100, puis la moitié.", () => {
    const x = petit50();
    const O = un(["stylos", "cahiers", "tickets", "ballons", "repas", "bouteilles", "livres", "sachets de graines", "goûters", "cartes postales", "gourdes", "classeurs", "billets de bus", "plants de tomates", "pots de miel", "badges", "gommes", "places de piscine"]);
    const P = un(["Une école achète", "Un club commande", "Une association offre", "Un magasin vend", "Un centre de loisirs prend", "Une mairie paie", "Une bibliothécaire commande", "Un entraîneur achète", "Une directrice d'école commande", "Un collège réserve", "Une cantine achète", "Un comité des fêtes offre", "Une infirmière scolaire commande", "Un jardinier achète"]);
    const U = un(["l'unité", "pièce"]);
    return qcmN(x * 50, fauxM(x, 50), expM50(x), v(["", "De tête.", "Sans poser.", "Calcul mental."], [`${P} 50 ${O} à ${eur(x)} € ${U}.`], ["Quel est le prix total ?", "Combien cela coûte-t-il en tout ?", "Quelle est la somme totale ?", "Combien faut-il payer ?", "Quel est le montant de la facture ?", "Combien cela fait-il au total ?"]), barreM(`${eur(x)} €`, 50), "€");
  }),
  m5(3, "Multiplie la mesure par 5 ou par 50.", () => {
    const k = un([5, 50]);
    const x = petit50();
    const MASSE = ["Quelle est la masse totale ?", "Combien cela pèse-t-il en tout ?", "Quelle masse cela fait-il ?"];
    const LONG = ["Quelle est la longueur totale ?", "Quelle longueur cela fait-il ?", "Combien cela mesure-t-il en tout ?"];
    const VOL = ["Quelle est la contenance totale ?", "Combien de litres en tout ?", "Quel volume cela fait-il ?"];
    const DIST = ["Quelle est la distance totale ?", "Combien de kilomètres en tout ?", "Quelle distance cela fait-il ?"];
    const C = un([
      { t: "sacs de", o: "kg", q: MASSE, s: ["On compte", "Un camion livre", "Une épicerie reçoit", "Un fermier remplit"] },
      { t: "planches de", o: "m", q: LONG, s: ["On compte", "Un menuisier scie", "On met bout à bout", "Une scierie livre"] },
      { t: "bouteilles de", o: "L", q: VOL, s: ["On compte", "Un magasin reçoit", "Une cantine utilise", "On remplit"] },
      { t: "morceaux de ruban de", o: "m", q: LONG, s: ["Une couturière coupe", "On colle bout à bout", "Une fleuriste utilise"] },
      { t: "colis de", o: "kg", q: MASSE, s: ["Un livreur transporte", "La poste reçoit", "Un avion cargo emporte"] },
      { t: "bidons de", o: "L", q: VOL, s: ["Un garage stocke", "Une agricultrice remplit", "On range"] },
      { t: "étapes de", o: "km", q: DIST, s: ["Un cycliste enchaîne", "Une course comporte", "Une randonneuse parcourt"] },
      { t: "tours de piste de", o: "km", q: DIST, s: ["Une athlète court", "Un cycliste fait", "Une équipe de relais court"] },
      { t: "seaux de", o: "L", q: VOL, s: ["Un jardinier verse", "Une peintre utilise", "On vide"] },
      { t: "barquettes de", o: "kg", q: MASSE, s: ["Un maraîcher prépare", "Une primeuse vend", "On pèse"] },
      { t: "rouleaux de câble de", o: "m", q: LONG, s: ["Une électricienne pose", "Un magasin vend", "On déroule"] },
      { t: "sorties en kayak de", o: "km", q: DIST, s: ["Une kayakiste enchaîne", "Un moniteur de kayak fait", "Le club de canoë compte"] },
    ]);
    return qcmN(x * k, fauxM(x, k), k === 5 ? expM5(x) : expM50(x), v(["", "De tête.", "Sans poser.", "Calcul mental."], [`${un(C.s)} ${k} ${C.t} ${fr(x)} ${C.o}.`], C.q), barreM(`${fr(x)} ${C.o}`, k), C.o);
  }),
];

/* ───────────────────────── calcul_ordre_grandeur ───────────────────────── */
const og = gabarits("calcul_ordre_grandeur", "calcul", ["estimer"]);
/** Arrondi au rang du premier chiffre : 398 → 400 ; 72 → 70. */
const rond = (n: number) => {
  const p = 10 ** Math.floor(Math.log10(n));
  return Math.round(n / p) * p;
};
const expOg = (calc: string, approx: string, r: number) =>
  exp("estimer, c'est trouver un résultat proche, avec des nombres ronds.", "on remplace chaque nombre par un nombre rond proche, puis on calcule de tête.", `${calc} ≈ ${approx} = ${fr(r)}.`, `le résultat est proche de ${fr(r)}.`);
/** Quatre ordres de grandeur bien séparés : × 10, ÷ 10, et un voisin franc. */
const fauxOg = (r: number) => [r * 10, r / 10, r * 2, r * 100].filter((f) => f >= 1 && f !== r);
const ESTIME = (c: string) => [`Quel est l'ordre de grandeur de ${c} ?`, `Estime ${c}.`, `${c} est proche de quel nombre ?`, `Sans poser, de quel nombre ${c} est-il proche ?`, `Choisis la meilleure estimation de ${c}.`];
const INTRO_OG = ["", "Arrondis d'abord.", "Prends des nombres ronds.", "Ne calcule pas exactement."];
/** Un nombre qui s'arrondit proprement : 3 chiffres et un écart ≤ 3 % à l'arrondi. */
const presDe = (r: number) => {
  const e = Math.max(1, Math.floor(r * 0.03));
  let x = r;
  while (x === r) x = r + entre(-e, e);
  return x;
};
const calculOrdreGrandeur: TutorBankItemV4[] = [
  og(1, "Arrondis chaque nombre à la centaine, puis ajoute.", () => {
    const A = 100 * entre(2, 8);
    const B = 100 * entre(2, 8);
    const a = presDe(A);
    const b = presDe(B);
    return qcmN(A + B, fauxOg(A + B), expOg(`${a} + ${b}`, `${A} + ${B}`, A + B), v(INTRO_OG, ESTIME(`${a} + ${b}`)));
  }),
  og(1, "Arrondis chaque nombre, puis soustrais.", () => {
    const B = 100 * entre(2, 5);
    const A = B + 100 * entre(2, 6);
    const a = presDe(A);
    const b = presDe(B);
    return qcmN(A - B, fauxOg(A - B), expOg(`${a} − ${b}`, `${A} − ${B}`, A - B), v(INTRO_OG, ESTIME(`${a} − ${b}`)));
  }),
  og(1, "Des milliers cette fois : arrondis au millier.", () => {
    const A = 1000 * entre(2, 8);
    const B = 1000 * entre(1, 8);
    const a = presDe(A);
    const b = presDe(B);
    return qcmN(A + B, fauxOg(A + B), expOg(`${fr(a)} + ${fr(b)}`, `${fr(A)} + ${fr(B)}`, A + B), v(INTRO_OG, ESTIME(`${fr(a)} + ${fr(b)}`)));
  }),
  og(2, "Arrondis le grand nombre, puis multiplie.", () => {
    const A = 100 * entre(2, 9);
    const k = entre(2, 9);
    const a = presDe(A);
    return qcmN(A * k, fauxOg(A * k), expOg(`${a} × ${k}`, `${A} × ${k}`, A * k), v(INTRO_OG, ESTIME(`${a} × ${k}`)));
  }),
  og(2, "Cherche un multiple rond du diviseur, proche du nombre.", () => {
    const k = entre(2, 9);
    const q = 10 * entre(2, 9) * un([1, 10]);
    const A = k * q;
    const a = presDe(A);
    return qcmN(q, fauxOg(q), expOg(`${fr(a)} ÷ ${k}`, `${fr(A)} ÷ ${k}`, q), v(INTRO_OG, ESTIME(`${fr(a)} ÷ ${k}`)));
  }),
  og(2, "Arrondis les décimaux à l'entier ou à la dizaine.", () => {
    const op = un(["+", "−", "×"] as const);
    const A = op === "×" ? entre(2, 9) : 10 * entre(3, 9);
    const B = op === "×" ? 10 * entre(2, 9) : op === "+" ? 10 * entre(1, 9) : 10 * entre(1, 2);
    const a = net(A + un([-0.1, -0.2, 0.1, 0.2]));
    const b = net(B + un([-0.2, -0.3, 0.2, 0.3]));
    const r = op === "+" ? A + B : op === "−" ? A - B : A * B;
    return qcmN(r, fauxOg(r), expOg(`${fr(a)} ${op} ${fr(b)}`, `${A} ${op} ${B}`, r), v(INTRO_OG, ESTIME(`${fr(a)} ${op} ${fr(b)}`)));
  }),
  og(3, "Arrondis les prix, puis ajoute.", () => {
    const A = entre(3, 9);
    const B = entre(2, 9);
    const C = entre(2, 9);
    const fin = () => un([-0.05, -0.1, -0.02, 0.05, 0.1]);
    const a = net(A * 10 + fin());
    const b = net(B * 10 + fin());
    const c = net(C * 10 + fin());
    const r = (A + B + C) * 10;
    const L = un([["un casque", "un ballon", "un livre"], ["des chaussures", "un sac", "une lampe"], ["un jeu", "un maillot", "une montre"], ["une tente", "un duvet", "une gourde"], ["une raquette", "un short", "un filet"], ["un masque", "un tuba", "des palmes"]]);
    return qcmN(r, fauxOg(r), expOg(`${fr(a)} + ${fr(b)} + ${fr(c)}`, `${A * 10} + ${B * 10} + ${C * 10}`, r), `${v(["Au magasin, on achète", "Pour un cadeau, on choisit", "Une famille prend"])} ${L[0]} à ${eur(a)} €, ${L[1]} à ${eur(b)} € et ${L[2]} à ${eur(c)} €. ${v(["Quel est l'ordre de grandeur du total ?", "De quelle somme le total est-il proche ?", "Combien cela fait-il environ ?"])}`, undefined, "€");
  }),
  og(3, "Compare le total arrondi à l'argent disponible.", () => {
    const k = entre(3, 9);
    const P = 10 * entre(2, 9);
    const p = net(P + un([-0.1, -0.2, -0.05, 0.1, 0.2]));
    const r = k * P;
    const dispo = r > 100 && Math.random() < 0.5 ? r - 100 : r + 100;
    const assez = dispo > r;
    const O = un(["billets d'avion", "tickets", "manteaux", "vélos", "jeux", "repas", "places de spectacle", "sièges", "lampes", "tentes"]);
    return qcm(assez ? "Oui" : "Non", [assez ? "Non" : "Oui"], expOg(`${k} × ${fr(p)}`, `${k} × ${P}`, r) + `\n\nOn a ${dispo} € : ${assez ? "c'est assez" : "ce n'est pas assez"}.`, `${k} ${O} coûtent ${eur(p)} € chacun. ${v(["On a", "Le budget est de", "Il reste"])} ${dispo} €. ${v(["A-t-on assez d'argent ?", "Est-ce suffisant ?", "Cela suffit-il ?"])}`);
  }),
  og(3, "Le résultat doit être proche de l'estimation.", () => {
    const k = entre(3, 9);
    const A = 100 * entre(2, 9);
    const a = presDe(A);
    const juste = a * k;
    const C = un(["Un élève trouve", "Une calculatrice affiche", "Une camarade annonce", "Un robot affiche", "Le cahier indique", "Un joueur annonce"]);
    const faux = un([juste * 10, Math.round(juste / 10)]);
    const oui = Math.random() < 0.5;
    const annonce = oui ? juste : faux;
    return qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"], expOg(`${a} × ${k}`, `${A} × ${k}`, A * k), `${C} ${fr(annonce)} pour ${a} × ${k}. ${v(["Est-ce possible ?", "Ce résultat est-il raisonnable ?", "Peut-on y croire ?"])}`);
  }),
];

export const calculMentalDecimalBank: TutorBankItemV4[] = [
  ...calculMoitieImpair,
  ...calculDoubleDecimal,
  ...calculMoitieDecimal,
  ...calculDiviser48,
  ...calculMultiplier50,
  ...calculOrdreGrandeur,
];
