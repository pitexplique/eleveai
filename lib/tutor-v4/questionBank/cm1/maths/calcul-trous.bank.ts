// CALCUL, PROGRAMMES, AIGUILLES, ISSUES : LES TROUS DU PROGRAMME DE CM1 (05/11/2026).
// Poser décimal × entier, exécuter un programme de calcul, estimer, procédures de
// calcul mental, placer les aiguilles, recenser les issues. QCM seulement.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { CALC, atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "./trous-outils";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

const arr = (v: number) => Math.round(v * 1000) / 1000;
const euro = (v: number) => `${v.toFixed(2).replace(".", ",")} €`;

/* ═════════════════ multiplication_decimale_posee ═════════════════ */
const M = atelier("cm1", "multiplication", "multiplication_decimale_posee", "cm1_");
const HINT_M = "Multiplie comme si la virgule n’était pas là, puis remets autant de chiffres après la virgule.";
const pose = (x: number, n: number) => ({ kind: "calcul_pose", operation: "multiplication", numbers: [fr(x), String(n)], display: { showResult: false, showRetenues: false } }) as CanvasFigure;
const sansVirg = (x: number, dec: number) => Math.round(x * 10 ** dec);
const explM = (x: number, n: number, dec: number) => {
  const s = sansVirg(x, dec);
  return etapes(`on multiplie sans la virgule, puis on remet ${dec} chiffre${dec > 1 ? "s" : ""} après la virgule.`, `${fr(s)} × ${n} = ${fr(s * n)}. ${fr(x)} a ${dec} chiffre${dec > 1 ? "s" : ""} après la virgule, le résultat aussi.`, `${fr(x)} × ${n} = ${fr(arr(x * n))}.`);
};
const leurresM = (x: number, n: number, dec: number) => {
  const p = arr(x * n);
  const s = sansVirg(x, dec) * n;
  return [s, p * 10, p / 10, p + 1, arr(x + n), Math.floor(x) * n + (x - Math.floor(x))];
};
/** Un décimal dont le produit ne se termine pas par 0 : la virgule reste visible. */
function tirerM(dec: 1 | 2) {
  for (;;) {
    const s = dec === 1 ? entre(11, 99) : entre(101, 999);
    const n = entre(2, 9);
    if (s % 10 !== 0 && (s * n) % 10 !== 0) return { x: s / 10 ** dec, n, s };
  }
}
const OBJ_PRIX: [string, string][] = [["Un stylo", "stylos"], ["Un cahier", "cahiers"], ["Une pomme", "pommes"], ["Un ticket de bus", "tickets"], ["Une baguette", "baguettes"], ["Un jus", "jus"], ["Une gomme", "gommes"], ["Un croissant", "croissants"], ["Un citron", "citrons"], ["Une règle", "règles"], ["Un timbre", "timbres"], ["Une place de cinéma", "places"], ["Un feutre", "feutres"], ["Une crêpe", "crêpes"]];
const OBJ_LONG = [["Une planche mesure", "m", "On en met {n} bout à bout.", "Quelle longueur obtient-on ?"], ["Un paquet pèse", "kg", "On en porte {n}.", "Quelle masse porte-t-on ?"], ["Une bouteille contient", "L", "On en vide {n}.", "Quel volume obtient-on ?"], ["Une dalle mesure", "m", "On en pose {n} en ligne.", "Quelle longueur couvre-t-on ?"], ["Un tour de piste fait", "km", "Une coureuse en fait {n}.", "Quelle distance parcourt-elle ?"], ["Un sac de riz pèse", "kg", "Un cuisinier en achète {n}.", "Quelle masse achète-t-il ?"], ["Un arrosoir contient", "L", "Une jardinière en verse {n}.", "Quel volume verse-t-elle ?"], ["Un tuyau mesure", "m", "Une plombière en raccorde {n}.", "Quelle longueur obtient-elle ?"], ["Un carton pèse", "kg", "Un livreur en charge {n}.", "Quelle masse charge-t-il ?"], ["Un étage mesure", "m", "Une tour a {n} étages.", "Quelle est sa hauteur ?"], ["Une longueur de bassin fait", "km", "Une nageuse en fait {n}.", "Quelle distance nage-t-elle ?"], ["Un seau contient", "L", "Un pompier en jette {n}.", "Quel volume jette-t-il ?"]] as const;

const multiplicationDecimale: TutorBankItemV4[] = [
  M(1, 1, HINT_M, () => {
    const { x, n } = tirerM(1);
    return { text: tournure(["", "Pose l’opération.", "Multiplie, puis place la virgule."], CALC(`${fr(x)} × ${n}`)), ...qcmN(arr(x * n), leurresM(x, n, 1)), canvas: pose(x, n), explanation: explM(x, n, 1) };
  }),
  M(2, 1, "Le calcul est déjà fait sans virgule : il reste à la placer.", () => {
    const { x, n, s } = tirerM(1);
    return {
      text: tournure([`On sait que ${s} × ${n} = ${fr(s * n)}.`, `Voici un calcul : ${s} × ${n} = ${fr(s * n)}.`, `${s} × ${n} = ${fr(s * n)}.`, `Regarde : ${s} × ${n} = ${fr(s * n)}.`], [`Combien fait ${fr(x)} × ${n} ?`, `Que vaut ${fr(x)} × ${n} ?`, `Trouve ${fr(x)} × ${n}.`, `Calcule ${fr(x)} × ${n}.`, `Déduis-en ${fr(x)} × ${n}.`]),
      ...qcmN(arr(x * n), [s * n, arr(x * n * 10), arr(x * n / 10), arr(x * n / 100)]),
      explanation: explM(x, n, 1),
    };
  }),
  M(3, 1, "Compte les chiffres après la virgule du nombre de départ.", () => {
    const dec = un([1, 2] as const);
    const { x, n } = tirerM(dec);
    return {
      text: un([`Dans ${fr(x)} × ${n}, combien de chiffres après la virgule au résultat ?`, `${fr(x)} × ${n} : combien de chiffres après la virgule ?`, `Le résultat de ${fr(x)} × ${n} a combien de chiffres après la virgule ?`, `Combien de chiffres après la virgule pour ${fr(x)} × ${n} ?`, `On pose ${fr(x)} × ${n}. Combien de chiffres après la virgule ?`, `Où va la virgule dans ${fr(x)} × ${n} ? Combien de chiffres après ?`, `Compte pour ${fr(x)} × ${n} : combien de chiffres après la virgule ?`, `Pour ${fr(x)} × ${n}, combien de chiffres mets-tu après la virgule ?`]),
      ...qcm(`${dec} chiffre${dec > 1 ? "s" : ""}`, [`${dec === 1 ? 2 : 1} chiffre${dec === 1 ? "s" : ""}`, "3 chiffres", "Aucun chiffre"]),
      explanation: etapes(`le résultat a autant de chiffres après la virgule que ${fr(x)}.`, `${fr(x)} a ${dec} chiffre${dec > 1 ? "s" : ""} après la virgule.`, `${fr(x)} × ${n} = ${fr(arr(x * n))}.`),
    };
  }),
  M(4, 2, HINT_M, () => {
    const { x, n } = tirerM(2);
    return { text: tournure(["", "Pose l’opération.", "Attention aux retenues."], CALC(`${fr(x)} × ${n}`)), ...qcmN(arr(x * n), leurresM(x, n, 2)), canvas: pose(x, n), explanation: explM(x, n, 2) };
  }),
  M(5, 2, "Le calcul est déjà fait sans virgule : il reste à la placer.", () => {
    const { x, n, s } = tirerM(2);
    return {
      text: tournure([`On sait que ${s} × ${n} = ${fr(s * n)}.`, `Voici un calcul : ${s} × ${n} = ${fr(s * n)}.`, `${s} × ${n} = ${fr(s * n)}.`, `Regarde : ${s} × ${n} = ${fr(s * n)}.`], [`Combien fait ${fr(x)} × ${n} ?`, `Que vaut ${fr(x)} × ${n} ?`, `Trouve ${fr(x)} × ${n}.`, `Calcule ${fr(x)} × ${n}.`, `Déduis-en ${fr(x)} × ${n}.`]),
      ...qcmN(arr(x * n), [s * n, arr(x * n * 10), arr(x * n / 10), arr(x * n * 100)]),
      explanation: explM(x, n, 2),
    };
  }),
  M(6, 2, HINT_M, () => {
    const dec = un([1, 2] as const);
    const { x, n } = tirerM(dec);
    return {
      text: tournure(["Regarde l’opération posée.", "Voici l’opération posée.", "L’opération est posée.", "Cette multiplication est posée."], ["Quel est le résultat ?", "Quel résultat trouves-tu ?", "Que trouve-t-on ?", "Termine le calcul.", "Quel nombre obtient-on ?", "Calcule le résultat."]),
      ...qcmN(arr(x * n), leurresM(x, n, dec)),
      canvas: pose(x, n),
      explanation: explM(x, n, dec),
    };
  }),
  M(7, 3, HINT_M, () => {
    const [o, pl] = un(OBJ_PRIX);
    const c = un([35, 45, 75, 85, 95, 115, 125, 135, 145, 165, 185, 195, 215, 245]);
    const x = c / 100, n = un([3, 7, 9, 3, 7]);
    return {
      text: tournure([`${o} coûte ${fr(x)} €.`], [`Combien coûtent ${n} ${pl} ?`, `Quel est le prix de ${n} ${pl} ?`, `Quel montant pour ${n} ${pl} ?`, `On en achète ${n}. Quel est le total ?`, `On en prend ${n}. Combien paie-t-on ?`]),
      ...qcmN(arr(x * n), [c * n, arr(x * n * 10), arr(x * n / 10), arr(x + n)], "€"),
      explanation: explM(x, n, 2),
    };
  }),
  M(8, 3, HINT_M, () => {
    const o = un(OBJ_LONG);
    const { x, n } = tirerM(1);
    return {
      text: `${o[0]} ${fr(x)} ${o[1]}. ${o[2].replace("{n}", String(n))} ${o[3]}${un(["", " Pose l’opération.", " Calcule en posant."])}`,
      ...qcmN(arr(x * n), leurresM(x, n, 1), o[1]),
      explanation: explM(x, n, 1),
    };
  }),
  M(9, 4, "Quand le résultat finit par 0 après la virgule, on peut enlever ce 0.", () => {
    const [x, n] = un<[number, number]>([[2.5, 4], [1.5, 6], [0.5, 8], [1.25, 8], [0.25, 4], [0.75, 4], [3.5, 2], [4.5, 2], [2.25, 4], [1.2, 5], [2.4, 5], [0.6, 5], [1.6, 5], [3.2, 5], [1.5, 4], [2.5, 8]]);
    const p = arr(x * n);
    return {
      text: tournure(["Attention au résultat.", "Un nombre rond se cache ici.", "Regarde bien la fin du calcul."], CALC(`${fr(x)} × ${n}`)),
      ...qcmN(p, [p * 10, p / 10, p + 1, arr(x + n), Math.max(p - 1, 1)]),
      canvas: pose(x, n),
      explanation: etapes(`on multiplie sans la virgule, puis on la remet. Un 0 à la fin des décimales ne sert à rien.`, `${fr(x)} × ${n} = ${fr(p)}.`, `le résultat est ${fr(p)}.`),
    };
  }),
  M(10, 4, "Calcule le prix total, puis la monnaie rendue.", () => {
    const [o, pl] = un(OBJ_PRIX);
    const c = un([115, 125, 135, 145, 165, 185, 195, 215, 245]);
    const x = c / 100, n = un([2, 3, 4]);
    const tot = arr(x * n);
    const b = tot < 5 ? 5 : tot < 10 ? 10 : 20;
    const r = arr(b - tot);
    return {
      text: tournure([`${o} coûte ${fr(x)} €. On achète ${n} ${pl}.`, `On achète ${n} ${pl}. ${o} coûte ${fr(x)} €.`], [`On paie avec ${b} €.`, `On donne un billet de ${b} €.`], ["Combien rend-on ?", "Quelle somme est rendue ?"]),
      ...qcm(euro(r), [...new Set([tot, arr(b - x), arr(r + 1), arr(r + 0.1), arr(r + 0.5)].filter((v) => v > 0 && v !== r).map(euro))]),
      explanation: etapes(`on calcule le prix total, puis on soustrait.`, `${fr(x)} × ${n} = ${fr(tot)}, puis ${b} − ${fr(tot)} = ${fr(r)}.`, `on rend ${euro(r)}.`),
    };
  }),
];

/* ═════════════════ algebre_programme_calcul ═════════════════ */
const A = atelier("cm1", "algebre", "algebre_programme_calcul", "cm1_");
const HINT_A = "Fais les étapes dans l’ordre, une par une.";
type Et = { t: string; f: (v: number) => number; i: (v: number) => number };
const ajoute = (k: number): Et => ({ t: `ajoute ${k}`, f: (v) => v + k, i: (v) => v - k });
const retire = (k: number): Et => ({ t: `retire ${k}`, f: (v) => v - k, i: (v) => v + k });
const fois = (k: number): Et => ({ t: `multiplie par ${k}`, f: (v) => v * k, i: (v) => v / k });
const double = (): Et => ({ t: "prends le double", f: (v) => v * 2, i: (v) => v / 2 });
const etAdd = (): Et => (Math.random() < 0.6 ? ajoute(entre(2, 12)) : retire(entre(1, 3)));
const etMul = (): Et => (Math.random() < 0.75 ? fois(entre(2, 6)) : double());
const cap1 = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
const DEPART = (n: number) => [`Choisis ${n}.`, `Pars de ${n}.`, `Prends ${n}.`, `Le nombre de départ est ${n}.`, `Écris ${n}.`];
const FIN = ["Quel résultat obtiens-tu ?", "Quel nombre trouves-tu ?", "Que trouves-tu à la fin ?"];
const execute = (n: number, l: Et[]) => l.reduce((v, e) => e.f(v), n);
const suiteV = (n: number, l: Et[]) => {
  let v = n;
  return l.map((e) => { const a = v; v = e.f(v); return `${a} → ${v} (${e.t})`; }).join(", ");
};
const explA = (n: number, l: Et[]) => etapes(`on suit les étapes dans l’ordre.`, `${suiteV(n, l)}.`, `le résultat est ${execute(n, l)}.`);
const leurresA = (n: number, l: Et[]) => {
  const r = execute(n, l);
  return [execute(n, [...l].reverse()), r + 1, r - 1, r + 2, l.length > 1 ? execute(n, l.slice(0, -1)) : n, r * 2];
};
const PERSONNES: [string, string][] = [["Une magicienne dit", "Elle"], ["Un maître du jeu dit", "Il"], ["Ana lit une carte", "Elle"], ["Une énigme dit", "Elle"], ["Un robot affiche", "Il"], ["Noé lit un défi", "Il"], ["Une machine affiche", "Elle"], ["Une coach propose", "Elle"], ["Un jeu vidéo affiche", "Il"], ["Un animateur annonce", "Il"], ["Une affiche dit", "Elle"], ["Une carte secrète dit", "Elle"]];

const algebreProgramme: TutorBankItemV4[] = [
  A(1, 1, HINT_A, () => {
    const m = entre(7, 15);
    const l = Math.random() < 0.5 ? [etAdd(), etMul()] : [etMul(), etAdd()];
    return { text: tournure(DEPART(m), [`${cap1(l[0].t)}, puis ${l[1].t}.`], FIN), ...qcmN(execute(m, l), leurresA(m, l)), explanation: explA(m, l) };
  }),
  A(2, 1, HINT_A, () => {
    const n = entre(4, 15);
    const l = [un([etAdd, etMul])()];
    return { text: tournure(DEPART(n), [`${cap1(l[0].t)}.`], FIN), ...qcmN(execute(n, l), leurresA(n, l)), explanation: explA(n, l) };
  }),
  A(3, 1, HINT_A, () => {
    const n = entre(8, 15);
    const l = [etAdd(), etAdd()];
    return { text: tournure(DEPART(n), [`${cap1(l[0].t)}.`], [`${cap1(l[1].t)}.`], FIN), ...qcmN(execute(n, l), leurresA(n, l)), explanation: explA(n, l) };
  }),
  A(4, 2, HINT_A, () => {
    const n = entre(8, 14);
    const l = un([[etAdd(), etMul(), etAdd()], [etMul(), etAdd(), etMul()], [etAdd(), etAdd(), etMul()], [etMul(), etAdd(), etAdd()]]);
    return { text: tournure(DEPART(n), [`${cap1(l[0].t)}. ${cap1(l[1].t)}. ${cap1(l[2].t)}.`, `${cap1(l[0].t)}, puis ${l[1].t}, puis ${l[2].t}.`], FIN), ...qcmN(execute(n, l), leurresA(n, l)), explanation: explA(n, l) };
  }),
  A(5, 2, "Calcule les deux programmes avec le même nombre.", () => {
    const n = entre(3, 12);
    const a = ajoute(entre(2, 9)), f = fois(entre(2, 6));
    const premierPlus = Math.random() < 0.5;
    const [la, lb] = premierPlus ? [[a, f], [f, a]] : [[f, a], [a, f]];
    const ra = execute(n, la), rb = execute(n, lb);
    const juste = ra > rb ? "Programme A" : "Programme B";
    return {
      text: tournure(DEPART(n), [`Programme A : ${la[0].t}, puis ${la[1].t}. Programme B : ${lb[0].t}, puis ${lb[1].t}.`], ["Quel programme donne le plus grand résultat ?", "Lequel donne le plus grand nombre ?", "Quel programme va le plus haut ?"]),
      ...qcm(juste, [juste === "Programme A" ? "Programme B" : "Programme A", "Le même résultat"]),
      explanation: etapes(`on calcule les deux programmes.`, `A : ${suiteV(n, la)}. B : ${suiteV(n, lb)}.`, `${juste} donne le plus grand résultat.`),
    };
  }),
  A(6, 2, "Cherche l’étape qui fait passer d’un nombre au suivant.", () => {
    const n = entre(3, 12);
    const e = un([etAdd, etMul])();
    const r = e.f(n);
    const faux = [ajoute(Math.abs(r - n) + 1).t, fois(entre(2, 6)).t, retire(entre(1, 3)).t, ajoute(n).t, ajoute(entre(1, 9)).t].filter((t) => t !== e.t);
    return {
      text: un([`Une étape change ${n} en ${r}. Laquelle ?`, `Quelle étape transforme ${n} en ${r} ?`, `Quelle étape fait passer de ${n} à ${r} ?`, `${n} devient ${r}. Quelle est l’étape ?`, `On part de ${n} et on arrive à ${r}. Quelle étape ?`, `Le programme change ${n} en ${r}. Que fait-il ?`, `Entre ${n} et ${r}, quelle étape convient ?`, `Choisis l’étape qui change ${n} en ${r}.`]),
      ...qcmEtape(e.t, faux, n, r),
      explanation: etapes(`on essaie chaque étape avec ${n}.`, `${n} → ${r} (${e.t}).`, `l’étape est : ${e.t}.`),
    };
  }),
  A(7, 3, HINT_A, () => {
    const n = entre(4, 12);
    const l = Math.random() < 0.5 ? [etAdd(), etMul()] : [etMul(), etAdd()];
    const [qui] = un(PERSONNES);
    return { text: tournure([`${qui} : « ${tournure(DEPART(n))} ${cap1(l[0].t)}, puis ${l[1].t}. »`], FIN.slice(0, 2)), ...qcmN(execute(n, l), leurresA(n, l)), explanation: explA(n, l) };
  }),
  A(8, 3, HINT_A, () => {
    const c = un<[string, string]>([["Un boulanger a", "pains"], ["Une fermière a", "œufs"], ["Un fleuriste a", "roses"], ["Une libraire a", "livres"], ["Un pêcheur a", "poissons"], ["Une coach a", "ballons"], ["Un maraîcher a", "melons"], ["Une pâtissière a", "gâteaux"], ["Un bibliothécaire a", "romans"], ["Une couturière a", "boutons"], ["Un apiculteur a", "pots"], ["Une vétérinaire a", "dossiers"]]);
    const n = entre(4, 15);
    const k = entre(2, 5), a = entre(2, 9);
    const l = [fois(k), ajoute(a)];
    return {
      text: tournure([`${c[0]} ${n} ${c[1]}.`], [`Le stock est multiplié par ${k}, puis on ajoute ${a} ${c[1]}.`], ["Combien y en a-t-il à la fin ?", "Quel est le nouveau total ?"]),
      ...qcmN(execute(n, l), leurresA(n, l)),
      explanation: explA(n, l),
    };
  }),
  A(9, 4, "Remonte le programme : fais les étapes inverses, de la dernière à la première.", () => {
    const n = entre(3, 12);
    const a = ajoute(entre(2, 9)), f = fois(entre(2, 6));
    const l = un([[a, f], [f, a]]);
    const r = execute(n, l);
    return {
      text: tournure([`Un programme : ${l[0].t}, puis ${l[1].t}.`, `Voici un programme : ${l[0].t}, puis ${l[1].t}.`, `On applique : ${l[0].t}, puis ${l[1].t}.`, `Un défi : ${l[0].t}, puis ${l[1].t}.`], [`À la fin, on trouve ${r}.`, `Le résultat est ${r}.`, `On arrive à ${r}.`], ["Quel était le nombre de départ ?", "Quel nombre avait-on au début ?"]),
      ...qcmN(n, [execute(r, l), r, n + 1, n + 2, Math.max(n - 1, 1)]),
      explanation: etapes(`on remonte en faisant les opérations inverses.`, `${l.slice().reverse().map((e) => e.t).join(" puis ")} : on fait l’inverse et on retombe sur ${n}. Vérifions : ${suiteV(n, l)}.`, `le nombre de départ est ${n}.`),
    };
  }),
  A(10, 4, "Essaie chaque programme avec le nombre de départ.", () => {
    const n = entre(3, 9);
    const juste = un([[ajoute(entre(2, 6)), fois(entre(2, 4))], [fois(entre(2, 4)), ajoute(entre(2, 6))]]);
    const r = execute(n, juste);
    const t = (l: Et[]) => `${cap1(l[0].t)}, puis ${l[1].t}`;
    const faux: string[] = [];
    for (let k = 0; faux.length < 3 && k < 60; k++) {
      const l = un([[ajoute(entre(2, 6)), fois(entre(2, 4))], [fois(entre(2, 4)), ajoute(entre(2, 6))]]);
      if (execute(n, l) !== r && !faux.includes(t(l))) faux.push(t(l));
    }
    return {
      text: tournure([`Quel programme change ${n} en ${r} ?`, `Quel programme transforme ${n} en ${r} ?`, `On part de ${n} et on arrive à ${r}. Quel programme convient ?`, `En partant de ${n}, choisis le programme qui donne ${r}.`, `Un robot change ${n} en ${r}. Quel programme suit-il ?`, `Une machine reçoit ${n} et rend ${r}. Quel est son programme ?`, `Une carte transforme ${n} en ${r}. Quel programme porte-t-elle ?`, `Un jeu change ${n} en ${r}. Quel programme utilise-t-il ?`], ["", "Essaie chaque programme."]),
      ...qcm(t(juste), faux),
      explanation: etapes(`on essaie chaque programme avec ${n}.`, `${suiteV(n, juste)}.`, `le programme est : ${t(juste)}.`),
    };
  }),
];
/** Les leurres d'étape ne doivent pas donner le même résultat. */
function qcmEtape(juste: string, faux: string[], n: number, r: number) {
  const rend = (t: string) => {
    const m = t.match(/(ajoute|retire|multiplie par) (\d+)/);
    if (!m) return n * 2;
    const k = Number(m[2]);
    return m[1] === "ajoute" ? n + k : m[1] === "retire" ? n - k : n * k;
  };
  const f = [...new Set(faux)].filter((t) => rend(t) !== r);
  return qcm(juste, f);
}

/* ═════════════════ calcul_estimer ═════════════════ */
const E = atelier("cm1", "calcul", "calcul_estimer", "cm1_");
const HINT_E = "Remplace chaque nombre par un nombre rond proche, puis calcule de tête.";
const FORMES_E = (x: string) => [`Quel est l’ordre de grandeur de ${x} ?`, `Estime ${x}.`, `${x} fait environ combien ?`, `Environ combien fait ${x} ?`, `Arrondis puis calcule : ${x}.`, `Donne une estimation de ${x}.`, `Quel résultat est proche de ${x} ?`, `Sans poser, combien fait à peu près ${x} ?`];
const lointains = (v: number) => [v * 10, v / 10, v * 2, v * 5, v / 2].filter((x) => Number.isInteger(x) || x * 10 === Math.round(x * 10));
const proche = (rond: number) => rond + un([-3, -2, -1, 1, 2, 3, 4]) * (rond >= 100 ? 1 : 0) + (rond < 100 ? un([-1, 1, 2]) : 0);
const leCalculE = (a: number, op: string, b: number, ra: number, rb: number, r: number) => etapes(`on remplace par des nombres ronds.`, `${fr(a)} est proche de ${fr(ra)}, ${fr(b)} est proche de ${fr(rb)}. ${fr(ra)} ${op} ${fr(rb)} = ${fr(r)}.`, `le résultat est proche de ${fr(r)}.`);
const tirerAS = (p: number) => {
  const ra = entre(3, 9) * p, rb = entre(1, 2) * p;
  const plus = Math.random() < 0.5;
  return { ra, rb, a: proche(ra), b: proche(rb), plus, r: plus ? ra + rb : ra - rb, op: plus ? "+" : "−" };
};
const tirerMul = () => {
  const ra = un([20, 30, 40, 50, 60, 70, 80, 90, 200, 300, 400, 500]);
  const rb = un([2, 3, 4, 5, 6]);
  return { ra, rb, a: proche(ra), b: rb, r: ra * rb };
};
const tirerDiv = () => {
  const d = un([2, 3, 4, 5, 6, 7, 8, 9]);
  const q = un([20, 30, 40, 50, 60, 70, 80]);
  return { d, q, rond: d * q, a: proche(d * q) };
};

const calculEstimer: TutorBankItemV4[] = [
  E(1, 1, HINT_E, () => {
    const { a, b, ra, rb, r, op } = tirerAS(100);
    return { text: un(FORMES_E(`${fr(a)} ${op} ${fr(b)}`)), ...qcmN(r, lointains(r)), explanation: leCalculE(a, op, b, ra, rb, r) };
  }),
  E(2, 1, HINT_E, () => {
    const { a, b, ra, rb, r, op } = tirerAS(10);
    return { text: tournure(["", "Arrondis à la dizaine."], FORMES_E(`${fr(a)} ${op} ${fr(b)}`)), ...qcmN(r, lointains(r)), explanation: leCalculE(a, op, b, ra, rb, r) };
  }),
  E(3, 1, "Quel nombre rond est le plus proche ?", () => {
    const { a, b, ra, rb, op } = tirerAS(100);
    const x = `${fr(a)} ${op} ${fr(b)}`;
    return {
      text: un([`Pour estimer ${x}, quel calcul fais-tu ?`, `Quel calcul simple remplace ${x} ?`, `Quel calcul rond est proche de ${x} ?`, `Pour estimer ${x}, quel calcul choisir ?`, `Choisis le calcul simple pour ${x}.`, `Quel calcul donne une estimation de ${x} ?`, `Avec des nombres ronds, ${x} devient quel calcul ?`, `Remplace ${x} par un calcul simple.`]),
      ...qcm(`${fr(ra)} ${op} ${fr(rb)}`, [`${fr(ra + 100)} ${op} ${fr(rb + 100)}`, `${fr(ra / 10)} ${op} ${fr(rb / 10)}`, `${fr(ra * 10)} ${op} ${fr(rb)}`, `${fr(ra + 100)} ${op} ${fr(rb)}`]),
      explanation: etapes(`on prend le nombre rond le plus proche de chaque nombre.`, `${fr(a)} → ${fr(ra)} ; ${fr(b)} → ${fr(rb)}.`, `on calcule ${fr(ra)} ${op} ${fr(rb)}.`),
    };
  }),
  E(4, 2, HINT_E, () => {
    const { a, b, ra, rb, r } = tirerMul();
    return { text: tournure(["", "Arrondis d’abord.", "Prends un nombre rond."], FORMES_E(`${fr(a)} × ${b}`)), ...qcmN(r, lointains(r)), explanation: leCalculE(a, "×", b, ra, rb, r) };
  }),
  E(5, 2, "Cherche un multiple du diviseur tout proche.", () => {
    const { d, q, rond, a } = tirerDiv();
    return {
      text: tournure(["", "Cherche un nombre rond dans la table.", "Pense à la table du diviseur."], FORMES_E(`${fr(a)} ÷ ${d}`)),
      ...qcmN(q, lointains(q)),
      explanation: etapes(`on remplace le nombre par un nombre proche, facile à diviser.`, `${fr(a)} est proche de ${fr(rond)}, et ${fr(rond)} ÷ ${d} = ${q}.`, `le résultat est proche de ${q}.`),
    };
  }),
  E(6, 2, "Quel calcul se fait de tête et reste proche ?", () => {
    const fois = Math.random() < 0.5;
    if (fois) {
      const { a, b, ra } = tirerMul();
      const x = `${fr(a)} × ${b}`;
      return {
        text: un([`Pour estimer ${x}, quel calcul fais-tu ?`, `Quel calcul simple remplace ${x} ?`, `Quel calcul rond est proche de ${x} ?`, `Pour estimer ${x}, quel calcul choisir ?`, `Choisis le calcul simple pour ${x}.`, `Quel calcul donne une estimation de ${x} ?`, `Avec des nombres ronds, ${x} devient quel calcul ?`, `Remplace ${x} par un calcul simple.`]),
        ...qcm(`${fr(ra)} × ${b}`, [`${fr(ra * 10)} × ${b}`, `${fr(ra)} × ${b * 10}`, `${fr(ra / 10)} × ${b}`, `${fr(ra)} + ${b}`]),
        explanation: etapes(`on prend le nombre rond le plus proche.`, `${fr(a)} → ${fr(ra)}.`, `on calcule ${fr(ra)} × ${b}.`),
      };
    }
    const { d, rond, a } = tirerDiv();
    const x = `${fr(a)} ÷ ${d}`;
    return {
      text: un([`Pour estimer ${x}, quel calcul fais-tu ?`, `Quel calcul simple remplace ${x} ?`, `Quel calcul rond est proche de ${x} ?`, `Pour estimer ${x}, quel calcul choisir ?`, `Choisis le calcul simple pour ${x}.`, `Quel calcul donne une estimation de ${x} ?`, `Avec des nombres ronds, ${x} devient quel calcul ?`, `Remplace ${x} par un calcul simple.`]),
      ...qcm(`${fr(rond)} ÷ ${d}`, [`${fr(rond * 10)} ÷ ${d}`, `${fr(rond)} ÷ ${d * 10}`, `${fr(rond / 10)} ÷ ${d}`, `${fr(rond)} − ${d}`]),
      explanation: etapes(`on prend un nombre proche, facile à diviser par ${d}.`, `${fr(a)} → ${fr(rond)}.`, `on calcule ${fr(rond)} ÷ ${d}.`),
    };
  }),
  E(7, 3, HINT_E, () => {
    const [o, pl] = un<[string, string]>([["Un cahier", "cahiers"], ["Un livre", "livres"], ["Une place de concert", "places"], ["Un ballon", "ballons"], ["Une chemise", "chemises"], ["Un jeu", "jeux"], ["Une lampe", "lampes"], ["Un sac", "sacs"], ["Une plante", "plantes"], ["Un pull", "pulls"], ["Une paire de gants", "paires"], ["Un outil", "outils"]]);
    const ra = un([3, 4, 5, 6, 7, 8, 9, 20, 30, 40]);
    const px = ra - un([0.1, 0.2, 0.05]);
    const n = un([3, 4, 5, 6, 7]);
    const r = ra * n;
    return {
      text: tournure([`${o} coûte ${euro(px)}. On en achète ${n}.`, `On achète ${n} ${pl} à ${euro(px)} l’unité.`], ["Environ combien paie-t-on ?", "Quel est le prix, à peu près ?", "Quel est l’ordre de grandeur du prix ?"]),
      ...qcmN(r, lointains(r), "€"),
      explanation: etapes(`on remplace le prix par un nombre rond proche.`, `${euro(px)} est proche de ${ra} €. ${ra} × ${n} = ${r}.`, `on paie environ ${r} €.`),
    };
  }),
  E(8, 3, HINT_E, () => {
    const c = un<[string, string, string, string]>([["Une école a", "filles", "garçons", "Environ combien d’élèves ?"], ["Un train a", "places assises", "places debout", "Environ combien de places ?"], ["Une ferme a", "poules", "canards", "Environ combien d’oiseaux ?"], ["Un cinéma reçoit", "enfants", "adultes", "Environ combien de personnes ?"], ["Un stade compte", "joueurs", "joueuses", "Environ combien de sportifs ?"], ["Un magasin vend", "stylos", "crayons", "Environ combien d’articles ?"], ["Une bibliothèque a", "romans", "BD", "Environ combien de livres ?"], ["Un verger a", "pommiers", "poiriers", "Environ combien d’arbres ?"], ["Un port a", "voiliers", "barques", "Environ combien de bateaux ?"], ["Un parking a", "voitures", "motos", "Environ combien de véhicules ?"], ["Un zoo reçoit", "visiteuses", "visiteurs", "Environ combien de visites ?"], ["Une salle a", "chaises", "tabourets", "Environ combien de sièges ?"]]);
    const ra = entre(2, 9) * 100, rb = entre(1, 5) * 100;
    const a = proche(ra), b = proche(rb);
    const r = ra + rb;
    return {
      text: `${c[0]} ${fr(a)} ${c[1]} et ${fr(b)} ${c[2]}. ${c[3]}`,
      ...qcmN(r, lointains(r)),
      explanation: leCalculE(a, "+", b, ra, rb, r),
    };
  }),
  E(9, 4, "Estime le calcul, puis compare au résultat proposé.", () => {
    const { a, b, r } = tirerMul();
    const exact = a * b;
    const juste = Math.random() < 0.5;
    const propose = juste ? exact : un([exact * 10, Math.round(exact / 10)]);
    const nom = un(["Tom", "Une élève", "Sami", "Un camarade", "Lina", "Un joueur", "Maya", "Une voisine", "Ilyes", "Un cousin", "Jade", "Une amie"]);
    return {
      text: tournure([`${nom} trouve ${fr(propose)} pour ${fr(a)} × ${b}.`], ["Ce résultat est-il possible ?", "Peut-on y croire ?"]),
      ...qcm(juste ? "Oui" : "Non", [juste ? "Non" : "Oui"]),
      explanation: etapes(`on estime le calcul.`, `${fr(a)} × ${b} est proche de ${fr(r)}. ${fr(propose)} en est ${juste ? "proche" : "très loin"}.`, juste ? `oui, le résultat est possible.` : `non, le résultat n’est pas possible.`),
    };
  }),
  E(10, 4, "Sans poser : estime, puis garde le résultat le plus proche.", () => {
    const { a, b } = tirerMul();
    const exact = a * b;
    return {
      text: tournure(["Sans poser l’opération.", "Un seul résultat est possible.", "Estime d’abord.", "Sans calculatrice.", "De tête."], [`Quel résultat est le bon pour ${fr(a)} × ${b} ?`, `Quel nombre donne ${fr(a)} × ${b} ?`, `Choisis le résultat de ${fr(a)} × ${b}.`, `${fr(a)} × ${b} : quel résultat ?`, `Quel résultat convient à ${fr(a)} × ${b} ?`]),
      ...qcmN(exact, [exact * 10, Math.round(exact / 10), exact * 100, exact * 5]),
      explanation: etapes(`on estime le calcul.`, `${fr(a)} × ${b} est proche de ${fr(Math.round(exact / 10) * 10)}.`, `le seul résultat proche est ${fr(exact)}.`),
    };
  }),
];

/* ═════════════════ calcul_procedures ═════════════════ */
const P = atelier("cm1", "calcul", "calcul_procedures", "cm1_");
const PROC_ADD: Record<number, [string, string]> = { 9: ["ajouter 10, puis retirer 1", "Ajoute 10, puis retire 1."], 19: ["ajouter 20, puis retirer 1", "Ajoute 20, puis retire 1."], 8: ["ajouter 10, puis retirer 2", "Ajoute 10, puis retire 2."], 18: ["ajouter 20, puis retirer 2", "Ajoute 20, puis retire 2."] };
const PROC_MUL: Record<number, [string, string, string]> = { 5: ["multiplier par 10, puis prendre la moitié", "Multiplie par 10, puis prends la moitié.", "× 5, c’est × 10 puis la moitié"], 4: ["prendre le double, puis encore le double", "Prends le double, puis encore le double.", "× 4, c’est le double du double"], 8: ["prendre le double, trois fois de suite", "Prends le double, trois fois de suite.", "× 8, c’est trois doubles de suite"] };
const FORMES_PROC = (x: string) => [`Pour calculer ${x}, que peut-on faire ?`, `Quelle méthode rapide pour ${x} ?`, `Comment calculer ${x} de tête ?`, `Quelle astuce convient pour ${x} ?`, `Quel chemin choisir pour ${x} ?`, `${x} : quelle méthode de tête ?`, `Choisis la bonne astuce pour ${x}.`, `De tête, comment faire ${x} ?`];
const explAdd = (n: number, k: number) => {
  const r = k >= 18 ? 20 : 10, m = r - k;
  return etapes(`${k} est proche de ${r} : on ajoute ${r}, puis on retire ${m}.`, `${n} + ${r} = ${n + r}, puis ${n + r} − ${m} = ${n + k}.`, `${n} + ${k} = ${n + k}.`);
};
const explMul = (n: number, k: number) => {
  const c = k === 5 ? `${n} × 10 = ${n * 10}, puis ${n * 10} ÷ 2 = ${n * 5}` : k === 4 ? `le double de ${n} est ${n * 2}, le double de ${n * 2} est ${n * 4}` : `${n} → ${n * 2} → ${n * 4} → ${n * 8}`;
  return etapes(`${PROC_MUL[k][2]}.`, `${c}.`, `${n} × ${k} = ${n * k}.`);
};
const tirerPair = () => 2 * entre(6, 49);

const calculProcedures: TutorBankItemV4[] = [
  P(1, 1, "Regarde quel nombre rond est tout proche.", () => {
    const k = un([9, 19, 8, 18]);
    const n = entre(13, 88);
    const r = k >= 18 ? 20 : 10, m = r - k;
    return {
      text: tournure(["", "Pense au nombre rond.", "Ne pose pas l’opération.", "Une astuce existe.", "Sans poser.", "Va vite."], FORMES_PROC(`${n} + ${k}`)),
      ...qcm(PROC_ADD[k][0], [`ajouter ${r}, puis ajouter ${m}`, `ajouter ${r}, puis retirer ${m + 1}`, `retirer ${r}, puis ajouter ${m}`, `ajouter ${k + 2}, puis retirer ${m}`]),
      explanation: explAdd(n, k),
    };
  }),
  P(2, 1, "Regarde quel nombre rond est tout proche.", () => {
    const k = un([9, 19, 8, 18]);
    const n = entre(13, 88);
    return { text: tournure([PROC_ADD[k][1], "Pense au nombre rond."], CALC(`${n} + ${k}`)), ...qcmN(n + k, [n + k + 2, n + k - 2, n + (k >= 18 ? 20 : 10), n + k + 10, n + k - 10]), explanation: explAdd(n, k) };
  }),
  P(3, 1, "× 5 : × 10 puis la moitié. × 4 : deux doubles. × 8 : trois doubles.", () => {
    const k = un([5, 4, 8]);
    const n = tirerPair();
    const faux = Object.values(PROC_MUL).map((p) => p[0]).filter((p) => p !== PROC_MUL[k][0]);
    return {
      text: un(FORMES_PROC(`${n} × ${k}`)),
      ...qcm(PROC_MUL[k][0], [...faux, `multiplier par ${k}0, puis ajouter ${k}`]),
      explanation: explMul(n, k),
    };
  }),
  P(4, 2, "× 5 : × 10 puis la moitié. × 4 : deux doubles. × 8 : trois doubles.", () => {
    const k = un([5, 4, 8]);
    const n = tirerPair();
    return { text: tournure([PROC_MUL[k][1]], CALC(`${n} × ${k}`)), ...qcmN(n * k, [n * k + k, n * k - k, n * 10, n * (k + 1), n * k * 2]), explanation: explMul(n, k) };
  }),
  P(5, 2, "Décompose le plus grand nombre : 12 = 10 + 2.", () => {
    const d = entre(1, 4), u = entre(1, 9), m = entre(3, 9);
    const n = d * 10 + u;
    const x = `${n} × ${m}`;
    return {
      text: tournure(["", "Décompose le premier nombre."], [`Quel calcul est égal à ${x} ?`, `${x} est égal à quel calcul ?`, `Décompose ${n} pour calculer ${x}.`, `Choisis le calcul égal à ${x}.`, `Quelle décomposition convient pour ${x} ?`, `Trouve le calcul égal à ${x}.`, `Quel calcul remplace ${x} ?`, `De tête, ${x} se calcule comment ?`]),
      ...qcm(`${d * 10} × ${m} + ${u} × ${m}`, [`${d * 10} × ${m} + ${u}`, `${d * 10} + ${u} × ${m}`, `${d} × ${m} + ${u} × ${m}`, `${d * 10} × ${u} + ${m}`]),
      explanation: etapes(`on découpe ${n} en ${d * 10} + ${u}, et on multiplie chaque morceau par ${m}.`, `${d * 10} × ${m} = ${d * 10 * m} et ${u} × ${m} = ${u * m}. ${d * 10 * m} + ${u * m} = ${n * m}.`, `${x} = ${d * 10} × ${m} + ${u} × ${m}.`),
    };
  }),
  P(6, 2, "Retirer 9, c’est retirer 10 puis ajouter 1.", () => {
    const k = un([9, 19, 8, 18]);
    const n = entre(30, 99);
    const r = k >= 18 ? 20 : 10, m = r - k;
    return {
      text: tournure([`Retire ${r}, puis ajoute ${m}.`, "Pense au nombre rond."], CALC(`${n} − ${k}`)),
      ...qcmN(n - k, [n - r - m, n - r, n - k + 10, n - k - 10, n - k + 2]),
      explanation: etapes(`${k} est proche de ${r} : on retire ${r}, puis on ajoute ${m}.`, `${n} − ${r} = ${n - r}, puis ${n - r} + ${m} = ${n - k}.`, `${n} − ${k} = ${n - k}.`),
    };
  }),
  P(7, 3, "Regarde quel nombre rond est tout proche.", () => {
    const c = un<[string, string, string]>([["Un car a", "passagers", "montent"], ["Un cinéma a", "spectateurs", "arrivent"], ["Un bus a", "voyageurs", "montent"], ["Un restaurant a", "clients", "entrent"], ["Une salle a", "élèves", "arrivent"], ["Un musée a", "visiteurs", "entrent"], ["Un magasin a", "clients", "entrent"], ["Une piscine a", "nageurs", "arrivent"], ["Un concert a", "fans", "arrivent"], ["Un avion a", "voyageurs", "embarquent"], ["Une kermesse a", "enfants", "arrivent"], ["Un gymnase a", "sportifs", "entrent"]]);
    const k = un([9, 19, 8, 18]);
    const n = entre(13, 80);
    return {
      text: tournure([`${c[0]} ${n} ${c[1]}. ${k} autres ${c[2]}.`], ["Combien sont-ils maintenant ?", "Combien y en a-t-il en tout ?"]),
      ...qcmN(n + k, [n + k + 2, n + k - 2, n + (k >= 18 ? 20 : 10), n + k + 10, n + k - 10]),
      explanation: explAdd(n, k),
    };
  }),
  P(8, 3, "Décompose le plus grand nombre.", () => {
    const c = un<[string, string, string]>([["Une boîte contient", "œufs", "boîtes"], ["Un paquet contient", "biscuits", "paquets"], ["Un rang compte", "chaises", "rangs"], ["Une caisse contient", "bouteilles", "caisses"], ["Un sachet contient", "billes", "sachets"], ["Une page contient", "photos", "pages"], ["Un plateau porte", "gâteaux", "plateaux"], ["Une équipe compte", "joueuses", "équipes"], ["Un casier contient", "fruits", "casiers"], ["Une rangée compte", "plants", "rangées"], ["Un filet contient", "oranges", "filets"], ["Un carton contient", "livres", "cartons"]]);
    const de = /^[aeiouœ]/.test(c[1]) ? "d’" : "de ";
    const d = entre(1, 2), u = entre(2, 9), m = entre(3, 9);
    const n = d * 10 + u;
    return {
      text: tournure([`${c[0]} ${n} ${c[1]}. On prend ${m} ${c[2]}.`], [`Combien ${de}${c[1]} en tout ?`, `Décompose ${n}. Combien ${de}${c[1]} ?`]),
      ...qcmN(n * m, [d * 10 * m + u, n + m, d * 10 * m, n * m + m, n * m - m]),
      explanation: etapes(`on découpe ${n} en ${d * 10} + ${u}.`, `${d * 10} × ${m} = ${d * 10 * m} et ${u} × ${m} = ${u * m}. ${d * 10 * m} + ${u * m} = ${n * m}.`, `il y a ${n * m} ${c[1]}.`),
    };
  }),
  P(9, 4, "Le morceau manquant : le chiffre des unités × le même nombre.", () => {
    const d = entre(1, 4), u = entre(1, 9), m = entre(3, 9);
    const n = d * 10 + u;
    const t = `${n} × ${m} = ${d * 10} × ${m} + …`;
    return {
      text: tournure(["Un défi.", "Un calcul à finir.", "Une astuce de calcul.", "Sur un cahier de brouillon.", "Une élève décompose."], [`Complète : ${t}`, `Quel calcul manque ? ${t}`, `Trouve la fin : ${t}`, `Termine : ${t}`, `Que faut-il écrire ? ${t}`]),
      ...qcm(`${u} × ${m}`, [`${u} + ${m}`, `${u * 10} × ${m}`, `${d} × ${m}`, `${u} × ${d}`].filter((x) => x !== `${u} × ${m}`)),
      explanation: etapes(`on découpe ${n} en ${d * 10} + ${u}, chaque morceau est multiplié par ${m}.`, `${d * 10} × ${m} + ${u} × ${m} = ${d * 10 * m} + ${u * m} = ${n * m}.`, `il manque ${u} × ${m}.`),
    };
  }),
  P(10, 4, "× 9, c’est × 10 moins une fois le nombre.", () => {
    const n = entre(12, 49);
    const k = un([9, 11]);
    const moins = k === 9;
    return {
      text: tournure([moins ? "Multiplie par 10, puis retire le nombre." : "Multiplie par 10, puis ajoute le nombre.", "Une astuce de tête.", "Un défi de calcul."], CALC(`${n} × ${k}`)),
      ...qcmN(n * k, [n * 10, n * k + 10, n * k - 10, n + k, n * (k + 1)]),
      explanation: etapes(`${k} = 10 ${moins ? "−" : "+"} 1 : on multiplie par 10, puis on ${moins ? "retire" : "ajoute"} ${n}.`, `${n} × 10 = ${n * 10}, puis ${n * 10} ${moins ? "−" : "+"} ${n} = ${n * k}.`, `${n} × ${k} = ${n * k}.`),
    };
  }),
];

/* ═════════════════ duree_positionner_aiguilles ═════════════════ */
const D = atelier("cm1", "duree", "duree_positionner_aiguilles", "cm1_");
const HINT_D = "Grande aiguille : les minutes (chaque nombre vaut 5 min). Petite aiguille : les heures.";
const HEURE = (h: number, m: number) => (m ? `${h} h ${String(m).padStart(2, "0")}` : `${h} h`);
const STEMS = (t: string) => [`Il est ${t}.`, `L’horloge doit indiquer ${t}.`, `On veut afficher ${t}.`, `Place les aiguilles pour ${t}.`];
const NOMS_G = ["Où est la grande aiguille ?", "Sur quel nombre pointe la grande aiguille ?", "Où mets-tu la grande aiguille ?", "Où va la grande aiguille ?"];
const NOMS_P = ["Où est la petite aiguille ?", "Où pointe la petite aiguille ?", "Où mets-tu la petite aiguille ?", "Où va la petite aiguille ?"];
const surNb = (m: number) => (m === 0 ? 12 : m / 5);
const leurresNb = (j: number) => melangeEnPlace([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter((x) => x !== j)).slice(0, 3).map((x) => `Sur le ${x}`);
const explG = (t: string, m: number) => etapes(`la grande aiguille compte les minutes. Chaque nombre vaut 5 minutes.`, m === 0 ? `0 minute : elle est sur le 12.` : `${m} ÷ 5 = ${m / 5}.`, `à ${t}, la grande aiguille est sur le ${surNb(m)}.`);
const suiv = (h: number) => (h === 12 ? 1 : h + 1);
/** Où est la petite aiguille à h:m (h sur 12). */
const petite = (h: number, m: number) => (m === 0 ? `Sur le ${h}` : m < 20 ? `Juste après le ${h}` : m <= 40 ? `Entre le ${h} et le ${suiv(h)}` : `Juste avant le ${suiv(h)}`);
const leurresP = (h: number, m: number) => [`Sur le ${h}`, `Juste après le ${h}`, `Entre le ${h} et le ${suiv(h)}`, `Juste avant le ${suiv(h)}`, `Sur le ${suiv(h)}`, `Juste avant le ${h}`].filter((x) => x !== petite(h, m));
const explP2 = (t: string, h: number, m: number) => etapes(`la petite aiguille avance doucement entre deux nombres pendant l’heure.`, m === 0 ? `il est ${h} h pile.` : `${m} minutes sont passées après ${h} h. ${m < 20 ? "C’est le début de l’heure." : m <= 40 ? "C’est vers le milieu de l’heure." : "C’est presque la fin de l’heure."}`, `à ${t}, la petite aiguille est : ${petite(h, m).toLowerCase()}.`);
const CTX_D = ["Le train part à {t}.", "Le film commence à {t}.", "La cantine ouvre à {t}.", "Le bus passe à {t}.", "Le match débute à {t}.", "La récréation sonne à {t}.", "Le cours de danse commence à {t}.", "Le marché ouvre à {t}.", "Le ferry part à {t}.", "Le concert démarre à {t}.", "La piscine ouvre à {t}.", "Le rendez-vous chez le médecin est à {t}."];
const clock = (h: number, m: number) => ({ kind: "duree", variant: "horloge", time: { hour: h, minute: m }, display: { showNumbers: true, showMinuteTicks: true, showDigital: false, showLabels: false } }) as CanvasFigure;

const dureeAiguilles: TutorBankItemV4[] = [
  D(1, 1, HINT_D, () => {
    const h = entre(1, 12);
    const grande = Math.random() < 0.5;
    const t = HEURE(h, 0);
    return {
      text: tournure(STEMS(t), grande ? NOMS_G : NOMS_P),
      ...(grande ? qcm("Sur le 12", leurresNb(12)) : qcm(`Sur le ${h}`, leurresNb(h))),
      explanation: grande ? explG(t, 0) : explP2(t, h, 0),
    };
  }),
  D(2, 1, HINT_D, () => {
    const h = entre(1, 12);
    const grande = Math.random() < 0.5;
    const t = HEURE(h, 30);
    return {
      text: tournure(STEMS(t), grande ? NOMS_G : NOMS_P),
      ...(grande ? qcm("Sur le 6", leurresNb(6)) : qcm(petite(h, 30), leurresP(h, 30))),
      explanation: grande ? explG(t, 30) : explP2(t, h, 30),
    };
  }),
  D(3, 1, HINT_D, () => {
    const h = entre(1, 12);
    const m = un([15, 45]);
    const t = HEURE(h, m);
    return { text: tournure(STEMS(t), NOMS_G), ...qcm(`Sur le ${surNb(m)}`, leurresNb(surNb(m))), explanation: explG(t, m) };
  }),
  D(4, 2, HINT_D, () => {
    const h = entre(1, 12);
    const m = 5 * entre(1, 11);
    const t = HEURE(h, m);
    return { text: tournure(STEMS(t), NOMS_G), ...qcm(`Sur le ${surNb(m)}`, [`Sur le ${h === surNb(m) ? suiv(h) : h}`, ...leurresNb(surNb(m))].slice(0, 3)), explanation: explG(t, m) };
  }),
  D(5, 2, "Regarde si l’heure commence, ou si elle finit bientôt.", () => {
    const h = entre(1, 12);
    const m = un([5, 10, 15, 25, 30, 35, 45, 50, 55]);
    const t = HEURE(h, m);
    return { text: tournure(STEMS(t), NOMS_P), ...qcm(petite(h, m), leurresP(h, m)), explanation: explP2(t, h, m) };
  }),
  D(6, 2, "L’après-midi : 13 h, c’est le 1 ; 16 h, c’est le 4.", () => {
    const h12 = entre(1, 11);
    const h = h12 + 12;
    const t = HEURE(h, 0);
    return {
      text: tournure(STEMS(t), ["Où est la petite aiguille ?", "Sur quel nombre pointe la petite aiguille ?", "Où mets-tu la petite aiguille ?", "Où va la petite aiguille ?"]),
      ...qcm(`Sur le ${h12}`, [...leurresNb(h12)]),
      explanation: etapes(`l’après-midi, on retire 12 pour trouver le nombre de l’horloge.`, `${h} − 12 = ${h12}.`, `la petite aiguille est sur le ${h12}.`),
    };
  }),
  D(7, 3, HINT_D, () => {
    const pm = Math.random() < 0.5;
    const h12 = entre(1, 11);
    const h = pm ? h12 + 12 : h12;
    const m = 5 * entre(1, 11);
    const t = HEURE(h, m);
    return { text: tournure([un(CTX_D).replace("{t}", t)], NOMS_G), ...qcm(`Sur le ${surNb(m)}`, leurresNb(surNb(m))), explanation: explG(t, m) };
  }),
  D(8, 3, HINT_D, () => {
    const pm = Math.random() < 0.5;
    const h12 = entre(1, 11);
    const h = pm ? h12 + 12 : h12;
    const m = un([0, 5, 10, 30, 50, 55]);
    const t = HEURE(h, m);
    return { text: tournure([un(CTX_D).replace("{t}", t)], NOMS_P), ...qcm(petite(h12, m), leurresP(h12, m)), explanation: explP2(t, h12, m) };
  }),
  D(9, 4, "Ajoute les minutes, puis cherche le nombre.", () => {
    const h = entre(1, 11);
    const m = 5 * entre(0, 6);
    const dt = 5 * entre(1, 5);
    const r = m + dt;
    return {
      text: tournure(["L’horloge indique l’heure.", "Regarde cette horloge.", "Voici l’heure du départ.", "Voici l’heure de la sonnerie.", "Cette pendule est à l’heure."], [`Dans ${dt} minutes, où sera la grande aiguille ?`, `${dt} minutes passent. Où est alors la grande aiguille ?`, `Où sera la grande aiguille ${dt} minutes plus tard ?`, `Après ${dt} minutes, sur quel nombre est la grande aiguille ?`]),
      ...qcm(`Sur le ${surNb(r)}`, leurresNb(surNb(r))),
      canvas: clock(h, m),
      explanation: etapes(`on ajoute les minutes à celles de l’horloge.`, `${m} + ${dt} = ${r}, et ${r} ÷ 5 = ${r / 5}.`, `la grande aiguille sera sur le ${surNb(r)}.`),
    };
  }),
  D(10, 4, "En 1 heure, la grande aiguille fait un tour : elle passe sur les 12 nombres.", () => {
    const m = 5 * entre(1, 11);
    return {
      text: tournure(["Une heure se déroule.", "Un film commence.", "Un match se joue.", "Une sieste commence.", "Un gâteau cuit.", "Une séance démarre."], [`En ${m} minutes, de combien de nombres avance la grande aiguille ?`, `La grande aiguille tourne pendant ${m} minutes. Elle passe combien de nombres ?`, `Pendant ${m} minutes, combien de nombres la grande aiguille passe-t-elle ?`, `${m} minutes passent. La grande aiguille avance de combien de nombres ?`]),
      ...qcmN(m / 5, [m, m / 5 + 1, m / 5 + 2, Math.max(m / 5 - 1, 1), 12], "", 1),
      explanation: etapes(`chaque nombre de l’horloge vaut 5 minutes.`, `${m} ÷ 5 = ${m / 5}.`, `la grande aiguille avance de ${m / 5} nombres.`),
    };
  }),
];

/* ═════════════════ probabilite_issues ═════════════════ */
const I = atelier("cm1", "probabilite", "probabilite_issues", "cm1_");
const HINT_I = "Une issue, c’est un résultat possible de l’expérience.";
const COUL = [["rouge", "#ef4444"], ["bleu", "#3b82f6"], ["vert", "#22c55e"], ["jaune", "#eab308"], ["violet", "#a855f7"], ["orange", "#f97316"]] as const;
const BILLE: Record<string, string> = { rouge: "rouge", bleu: "bleue", vert: "verte", jaune: "jaune", violet: "violette", orange: "orange" };
const uneListe = (l: string[]) => (l.length > 1 ? `${l.slice(0, -1).join(", ")} et ${l[l.length - 1]}` : l[0]);
const ROUES = (n: number) => melange([...COUL]).slice(0, n);
const billes = (cols: readonly (readonly [string, string])[]) => ({ kind: "probabilites", variant: "billes", billes: { elements: melange(cols.flatMap(([, c]) => Array.from({ length: entre(1, 3) }, () => ({ couleur: c })))) } }) as CanvasFigure;
const roue = (cols: readonly (readonly [string, string])[]) => ({ kind: "probabilites", variant: "roue", roue: { segments: cols.map(([l, c]) => ({ label: l, poids: 1, couleur: c })) } }) as CanvasFigure;
const EXP_NB = [
  { t: "On lance un dé à 6 faces.", n: 6 }, { t: "On lance une pièce.", n: 2 }, { t: "On lance un dé à 8 faces.", n: 8 }, { t: "On lance un dé à 4 faces.", n: 4 }, { t: "On lance un dé à 12 faces.", n: 12 },
  { t: "On tourne une roue à 5 cases.", n: 5 }, { t: "On tourne une roue à 3 cases.", n: 3 }, { t: "On tourne une roue à 10 cases.", n: 10 }, { t: "On tire un jour de la semaine.", n: 7 }, { t: "On tire une saison.", n: 4 }, { t: "On tire un mois de l’année.", n: 12 }, { t: "On tire un numéro de 1 à 9.", n: 9 },
];
const explN = (n: number) => etapes(`on compte tous les résultats possibles.`, `il y en a ${n}.`, `il y a ${n} issues.`);

const probabiliteIssues: TutorBankItemV4[] = [
  I(1, 1, HINT_I, () => {
    const e = un(EXP_NB);
    return { text: tournure([e.t], ["Combien d’issues y a-t-il ?", "Combien de résultats sont possibles ?", "Compte les issues."]), ...qcmN(e.n, [e.n + 1, e.n - 1, e.n * 2, 1]), explanation: explN(e.n) };
  }),
  I(2, 1, HINT_I, () => {
    const c = un<[string, string, string[]]>([
      ["On lance une pièce.", "Pile et Face", ["Pile seulement", "Face seulement", "Pile, Face et Tranche"]],
      ["On lance un dé à 6 faces.", "1, 2, 3, 4, 5 et 6", ["1 et 6", "1, 2 et 3", "2, 4 et 6"]],
      ["On lance un dé à 4 faces.", "1, 2, 3 et 4", ["1 et 4", "2 et 4", "1, 2, 3, 4, 5 et 6"]],
      ["On tire une saison.", "Printemps, été, automne et hiver", ["Été et hiver", "Printemps et été", "Lundi et mardi"]],
      ["On tire un nombre de 1 à 3.", "1, 2 et 3", ["1 et 3", "2 et 3", "1, 2, 3 et 4"]],
      ["On lance un dé à 3 faces.", "1, 2 et 3", ["1 et 3", "1 et 2", "1, 2, 3 et 4"]],
    ]);
    return { text: tournure([c[0]], ["Quelles sont les issues ?", "Quels résultats sont possibles ?", "Quelle liste donne toutes les issues ?"]), ...qcm(c[1], c[2]), explanation: etapes(`on écrit tous les résultats possibles, sans en oublier.`, `${c[1]}.`, `les issues sont : ${c[1]}.`) };
  }),
  I(3, 1, HINT_I, () => {
    const f = un([4, 6, 8, 10, 12]);
    const oui = Math.random() < 0.5;
    const v = oui ? entre(1, f) : f + entre(1, 6);
    return {
      text: tournure([`On lance un dé à ${f} faces, numérotées à partir de 1.`], [`${v} est-il une issue ?`, `Peut-on obtenir ${v} ?`, `Le résultat ${v} est-il possible ?`, `${v} fait-il partie des issues ?`, `Est-ce que ${v} peut sortir ?`]),
      ...qcm(oui ? "Oui" : "Non", [oui ? "Non" : "Oui"]),
      explanation: etapes(`les issues vont de 1 à ${f}.`, `${v} ${oui ? "est" : "n’est pas"} entre 1 et ${f}.`, oui ? `oui, c’est une issue.` : `non, ce n’est pas une issue.`),
    };
  }),
  I(4, 2, "Regarde les couleurs des billes : chaque couleur est une issue.", () => {
    const n = entre(2, 4);
    const cols = ROUES(n);
    const noms = cols.map((c) => c[0]);
    const autres = COUL.map((c) => c[0]).filter((c) => !noms.includes(c));
    const aff = uneListe(noms);
    return {
      text: tournure(["On tire une bille dans ce sac.", "On pioche une bille sans regarder.", "Une main tire une bille du sac."], ["Quelles couleurs peut-on obtenir ?", "Quelle liste donne toutes les issues ?", "Quelles sont les issues ?", "Quels résultats sont possibles ?"]),
      ...qcm(aff, [uneListe(noms.slice(0, -1)), uneListe([...noms, autres[0]]), uneListe([...noms.slice(1), autres[0]])].filter((x) => x !== aff)),
      canvas: billes(cols),
      explanation: etapes(`on regarde les couleurs dans le sac.`, `il y a du ${noms.join(", du ")}.`, `les issues sont : ${aff}.`),
    };
  }),
  I(5, 2, "Compte les résultats différents.", () => {
    const n = entre(2, 6);
    const cols = ROUES(n);
    return {
      text: tournure(["On tourne cette roue.", "La flèche s’arrête sur une couleur.", "Voici une roue de loterie.", "Une roue tourne."], ["Combien d’issues y a-t-il ?", "Combien de couleurs peut-on obtenir ?", "Compte les issues.", "Combien de résultats sont possibles ?"]),
      ...qcmN(n, [n + 1, Math.max(n - 1, 1), n + 2, 7]),
      canvas: roue(cols),
      explanation: explN(n),
    };
  }),
  I(6, 2, "Écris les faces qui conviennent, puis compte-les.", () => {
    const c = un<[string, (x: number) => boolean]>([["un nombre pair", (x) => x % 2 === 0], ["un nombre impair", (x) => x % 2 === 1], ["plus de 4", (x) => x > 4], ["moins de 3", (x) => x < 3], ["au moins 5", (x) => x >= 5], ["au plus 2", (x) => x <= 2], ["un multiple de 3", (x) => x % 3 === 0]]);
    const l = [1, 2, 3, 4, 5, 6].filter(c[1]);
    return {
      text: tournure(["On lance un dé à 6 faces.", "Un dé à 6 faces roule.", "Lance un dé à 6 faces."], [`On veut ${c[0]}. Combien d’issues conviennent ?`, `Pour obtenir ${c[0]}, combien d’issues conviennent ?`, `Combien d’issues donnent ${c[0]} ?`]),
      ...qcmN(l.length, [l.length + 1, Math.max(l.length - 1, 1), 6, 5, 4]),
      explanation: etapes(`on écrit les faces qui conviennent.`, `${l.join(", ")}.`, `${l.length} issue(s) conviennent.`),
    };
  }),
  I(7, 3, "Une même lettre écrite deux fois ne compte qu’une issue.", () => {
    const mots = ["BALLON", "ARBRE", "SALADE", "TOMATE", "BANANE", "CARTABLE", "PIRATE", "MARGOUILLAT", "CHOCOLAT", "VOLCAN", "ABRICOT", "COLLINE"];
    const m = un(mots);
    const n = new Set(m).size;
    return {
      text: tournure([`Noé écrit le mot ${m}. Il tire une lettre au hasard.`, `Une affiche montre le mot ${m}. On tire une de ses lettres.`], ["Combien de lettres différentes peut-il sortir ?", "Combien d’issues y a-t-il ?"]),
      ...qcmN(n, [m.length, n + 1, Math.max(n - 1, 1), n + 2]),
      explanation: etapes(`on compte chaque lettre une seule fois.`, `${[...new Set(m)].join(", ")}.`, `il y a ${n} issues.`),
    };
  }),
  I(8, 3, HINT_I, () => {
    const c = un<[string, string]>([["Un pâtissier a des gâteaux", "On en choisit un au hasard."], ["Une fleuriste a des bouquets", "On en choisit un au hasard."], ["Un magasin a des pulls", "Un client en prend un au hasard."], ["Une école a des ballons", "Un élève en prend un au hasard."], ["Un loueur a des vélos", "Une cliente en prend un au hasard."], ["Une mercière a des rubans", "On en prend un au hasard."], ["Un garagiste a des voitures", "Il en sort une au hasard."], ["Une peintre a des pots", "Elle en prend un au hasard."], ["Un club a des maillots", "Une joueuse en prend un au hasard."], ["Une crèche a des cubes", "Un enfant en prend un au hasard."], ["Un chef a des assiettes", "Il en prend une au hasard."], ["Une boutique a des chapeaux", "On en prend un au hasard."]]);
    const n = entre(2, 5);
    const noms = ROUES(n).map((x) => x[0]);
    return {
      text: tournure([`${c[0]} : ${noms.join(", ")}. ${c[1]}`], ["Combien d’issues y a-t-il pour la couleur ?", "Combien de couleurs peut-on obtenir ?"]),
      ...qcmN(n, [n + 1, Math.max(n - 1, 1), n + 2, 1]),
      explanation: explN(n),
    };
  }),
  I(9, 4, "Écris les faces qui conviennent, sans en oublier.", () => {
    const c = un<[string, (x: number) => boolean]>([["un nombre pair", (x) => x % 2 === 0], ["un nombre impair", (x) => x % 2 === 1], ["plus de 4", (x) => x > 4], ["moins de 3", (x) => x < 3], ["plus de 2", (x) => x > 2], ["moins de 5", (x) => x < 5], ["un multiple de 3", (x) => x % 3 === 0], ["au moins 4", (x) => x >= 4], ["au plus 3", (x) => x <= 3]]);
    const l = [1, 2, 3, 4, 5, 6].filter(c[1]);
    const nl = [1, 2, 3, 4, 5, 6].filter((x) => !c[1](x));
    const juste = l.join(", ");
    return {
      text: tournure(["Un jeu de dé à 6 faces.", "Pour gagner à ce jeu de dé,", "Une règle de jeu avec un dé à 6 faces :", "Sami lance un dé à 6 faces.", "Inès joue avec un dé à 6 faces."], [`il faut ${c[0]}.`], ["Quelles issues font gagner ?", "Quelle liste est complète ?"]).replace(/\. il faut/, ". Il faut"),
      ...qcm(juste, [nl.join(", "), l.slice(0, -1).join(", ") || `${l[0] === 6 ? 5 : 6}`, [...l, nl[0]].sort().join(", "), "1, 2, 3, 4, 5, 6"]),
      explanation: etapes(`on teste les 6 faces.`, `conviennent : ${juste}.`, `les issues gagnantes sont ${juste}.`),
    };
  }),
  I(10, 4, "Compte les couleurs du sac : une couleur absente ne peut pas sortir.", () => {
    const n = entre(2, 4);
    const cols = ROUES(n);
    const noms = cols.map((c) => c[0]);
    const absentes = COUL.map((c) => c[0]).filter((c) => !noms.includes(c));
    const imp = Math.random() < 0.5;
    const juste = imp ? `Tirer une bille ${BILLE[absentes[0]]}` : `Tirer une bille ${BILLE[noms[0]]}`;
    return {
      text: tournure(["Regarde ce sac de billes.", "On tire une bille de ce sac.", "Voici le sac du jeu."], [imp ? "Quel résultat est impossible ?" : "Quel résultat est possible ?", imp ? "Quelle issue ne peut pas sortir ?" : "Quelle issue peut sortir ?"]),
      ...qcm(juste, imp ? noms.slice(0, 3).map((c) => `Tirer une bille ${BILLE[c]}`) : absentes.slice(0, 3).map((c) => `Tirer une bille ${BILLE[c]}`)),
      canvas: billes(cols),
      explanation: etapes(`on regarde les couleurs du sac.`, `dans le sac : ${uneListe(noms)}.`, imp ? `${absentes[0]} n’y est pas : c’est impossible.` : `${noms[0]} y est : c’est possible.`),
    };
  }),
];

export const calculTrousBank: TutorBankItemV4[] = [...multiplicationDecimale, ...algebreProgramme, ...calculEstimer, ...calculProcedures, ...dureeAiguilles, ...probabiliteIssues];
