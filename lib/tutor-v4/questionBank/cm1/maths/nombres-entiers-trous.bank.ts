// NOMBRES ENTIERS : LES TROUS DU PROGRAMME DE CM1 (05/11/2026).
// Demi-droite graduée, diviseurs, encadrer et intercaler. QCM seulement.
// ★1-★2 : phrase courte, sans prénom ni contexte. Contexte à partir de ★3.

import type { CanvasFigure, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { LETTRES, atelier, entre, etapes, fr, melange, qcm, qcmN, tournure, un } from "./trous-outils";

const droite = (min: number, max: number, step: number, minorStep: number | undefined, points: { value: number; label: string }[]) =>
  ({ kind: "number_line", size: { width: 320, height: 100 }, min, max, step, ...(minorStep ? { minorStep } : {}), points, display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true } }) as CanvasFigure;

/** Un pas écrit et sa petite graduation. */
const PAS: [number, number][] = [[10, 2], [20, 5], [50, 10], [100, 20], [100, 10], [200, 50], [500, 100], [1000, 200], [1000, 100]];
const GRANDS: [number, number][] = [[1000, 200], [5000, 1000], [10000, 2000], [10000, 1000], [50000, 10000], [100000, 20000]];

/** Une valeur sur une petite graduation, hors des graduations écrites. */
function surPetite(min: number, n: number, S: number, m: number): number {
  const c: number[] = [];
  for (let v = min + m; v < min + n * S; v += m) if ((v - min) % S !== 0) c.push(v);
  return un(c);
}

/* ═════════════════ entier_droite ═════════════════ */
const D = atelier("cm1", "nombre_entier", "entier_droite", "cm1_");
const LIRE = ["Quel nombre repère le point {L} ?", "Le point {L} repère quel nombre ?", "Lis le nombre du point {L}.", "Quel nombre se trouve au point {L} ?", "Quel est le nombre du point {L} ?", "Regarde la droite. Quel nombre est en {L} ?"];
const HINT_LIRE = "Compte de combien on avance à chaque petite graduation.";
const lireExpl = (S: number, m: number, base: number, v: number, L: string) =>
  etapes(
    `entre deux nombres écrits, il y a ${fr(S)}. Chaque petite graduation vaut ${fr(m)}.`,
    `à partir de ${fr(base)}, on compte ${(v - base) / m} petite(s) graduation(s) : ${fr(base)} + ${(v - base) / m} × ${fr(m)} = ${fr(v)}.`,
    `le point ${L} repère ${fr(v)}.`,
  );

const entierDroite: TutorBankItemV4[] = [
  D(1, 1, HINT_LIRE, () => {
    const [S, m] = un(PAS);
    const v = surPetite(0, 4, S, m);
    const L = un(LETTRES);
    return {
      text: un(LIRE).replace("{L}", L),
      ...qcmN(v, [v + m, v - m, v + S, v - S, v + 1, v * 2], "", m),
      canvas: droite(0, 4 * S, S, m, [{ value: v, label: L }]),
      explanation: lireExpl(S, m, Math.floor(v / S) * S, v, L),
    };
  }),
  D(2, 1, "Regarde entre deux nombres écrits : combien de petits espaces ?", () => {
    const [S, m] = un(PAS);
    return {
      text: tournure(["Regarde la droite.", "Observe la droite.", "Lis la droite.", "Voici une droite graduée.", "Compte les petits espaces."], ["Que vaut une petite graduation ?", "De combien avance-t-on à chaque petite graduation ?", "Quel est le pas d’une petite graduation ?", "Combien vaut un petit espace ?", "Une petite graduation vaut combien ?", "Que vaut un petit espace ?"]),
      ...qcmN(m, [S, S / 2, m * 2, m + 1, 1], "", 1),
      canvas: droite(0, 4 * S, S, m, []),
      explanation: etapes(`on regarde l’espace entre deux nombres écrits et on compte les petits espaces.`, `il y a ${S / m} petits espaces pour ${fr(S)}, et ${fr(S)} ÷ ${S / m} = ${fr(m)}.`, `une petite graduation vaut ${fr(m)}.`),
    };
  }),
  D(3, 2, "Trouve d’abord le pas des petites graduations.", () => {
    const [S, m] = un(PAS);
    const min = entre(0, 3) * S;
    const c = new Set<number>();
    while (c.size < 3) c.add(surPetite(min, 4, S, m));
    const l = melange(LETTRES).slice(0, 3).sort();
    const vs = melange([...c]);
    const pts = vs.map((value, i) => ({ value, label: l[i] }));
    const cible = un(pts);
    return {
      text: un(["Où se place {n} ?", "Quel point repère {n} ?", "Quel point est sur {n} ?", "Cherche {n} sur la droite. Quel point est-ce ?", "Place {n}. Quel point convient ?", "Le nombre {n} est à quel point ?"]).replace("{n}", fr(cible.value)),
      ...qcm(`Point ${cible.label}`, pts.filter((p) => p !== cible).map((p) => `Point ${p.label}`)),
      canvas: droite(min, min + 4 * S, S, m, pts),
      explanation: lireExpl(S, m, Math.floor(cible.value / S) * S, cible.value, cible.label),
    };
  }),
  D(4, 2, HINT_LIRE, () => {
    const [S, m] = un(GRANDS);
    const min = entre(1, 8) * S;
    const v = surPetite(min, 4, S, m);
    const L = un(LETTRES);
    return {
      text: tournure(["Voici un morceau de droite graduée.", "La droite commence ici à {min}.", "Ce morceau de droite part de {min}."], LIRE.slice(0, 5)).replace("{L}", L).replace("{min}", fr(min)),
      ...qcmN(v, [v + m, v - m, v + S, v - S, v + 10 * m], "", m),
      canvas: droite(min, min + 4 * S, S, m, [{ value: v, label: L }]),
      explanation: lireExpl(S, m, Math.floor(v / S) * S, v, L),
    };
  }),
  D(5, 3, HINT_LIRE, () => {
    const c = un([
      { t: "Sur une route, le panneau {L} donne la distance depuis le départ.", S: 20, m: 5, u: "km", min: 0 },
      { t: "Sur cette frise, le point {L} marque une année.", S: 20, m: 5, u: "", min: 1900 },
      { t: "Une fusée monte. Le point {L} donne son altitude.", S: 1000, m: 200, u: "m", min: 0 },
      { t: "Une usine compte ses bouteilles. Le point {L} donne le stock du jour.", S: 5000, m: 1000, u: "bouteilles", min: 0 },
      { t: "Sur le parcours d’un marathon, {L} est un point d’eau.", S: 10000, m: 2000, u: "m", min: 0 },
      { t: "Une vidéo gagne des vues. Le point {L} montre le nombre de vues.", S: 100000, m: 20000, u: "vues", min: 0 },
      { t: "Une cycliste note sa distance. Le point {L} montre où elle en est.", S: 50, m: 10, u: "km", min: 0 },
      { t: "Dans une tour, le point {L} donne la hauteur d’un étage.", S: 100, m: 20, u: "m", min: 0 },
      { t: "Une cuve se remplit. Le point {L} donne le volume d’eau.", S: 500, m: 100, u: "L", min: 0 },
      { t: "Un stade compte ses spectateurs. Le point {L} donne le nombre de personnes.", S: 10000, m: 2000, u: "personnes", min: 0 },
      { t: "Un musée range ses œuvres sur une frise. Le point {L} marque une année.", S: 50, m: 10, u: "", min: 1700 },
      { t: "Sur un sentier de montagne, le point {L} donne l’altitude.", S: 500, m: 100, u: "m", min: 1000 },
    ]);
    const L = un(LETTRES);
    const v = surPetite(c.min, 4, c.S, c.m);
    const annee = c.u === "" && c.min >= 1000;
    const q = qcmN(v, [v + c.m, v - c.m, v + c.S, v - c.S], c.u, c.m);
    const sansEsp = (s: string) => (annee ? s.replace(/ /g, "") : s);
    return {
      text: tournure([c.t], ["Quelle valeur lit-on ?", "Que lis-tu sur la droite ?", "Quel nombre indique-t-il ?"]).replace("{L}", L),
      ...q,
      choices: q.choices!.map(sansEsp),
      expected: q.expected.map(sansEsp),
      canvas: droite(c.min, c.min + 4 * c.S, c.S, c.m, [{ value: v, label: L }]),
      explanation: sansEsp(lireExpl(c.S, c.m, c.min + Math.floor((v - c.min) / c.S) * c.S, v, L)),
    };
  }),
  D(6, 3, "Le milieu de deux graduations : la moitié du pas en plus.", () => {
    const S = un([10, 20, 100, 200, 1000, 2000, 10000]);
    const k = entre(0, 3);
    const v = k * S + S / 2;
    const L = un(LETTRES);
    return {
      text: tournure(["{L} est au milieu de deux graduations.", "Le point {L} est juste au milieu de deux graduations.", "Une grenouille saute et s’arrête en {L}, au milieu de deux graduations.", "Un robot s’arrête en {L}, au milieu de deux graduations.", "Une bille roule jusqu’en {L}, au milieu de deux graduations."], ["Quel nombre repère-t-il ?", "Quel nombre est en {L} ?", "Quelle est sa valeur ?"]).replace(/\{L\}/g, L),
      ...qcmN(v, [k * S, (k + 1) * S, v + S, v + S / 10, k * S + S / 4], "", S / 2),
      canvas: droite(0, 4 * S, S, undefined, [{ value: v, label: L }]),
      explanation: etapes(`le point est au milieu : on ajoute la moitié du pas.`, `le pas vaut ${fr(S)}, sa moitié ${fr(S / 2)}. ${fr(k * S)} + ${fr(S / 2)} = ${fr(v)}.`, `${L} repère ${fr(v)}.`),
    };
  }),
  D(7, 4, "Lis les deux nombres, puis soustrais le plus petit au plus grand.", () => {
    const [S, m] = un([...PAS, ...GRANDS]);
    const a = surPetite(0, 2, S, m);
    const b = surPetite(2 * S, 2, S, m);
    const [L1, L2] = melange(LETTRES);
    return {
      text: tournure(["Combien y a-t-il entre {a} et {b} ?", "Quel écart sépare {a} et {b} ?", "Une tortue va de {a} à {b}. De combien avance-t-elle ?", "Un train roule de {a} à {b}. Quelle distance sur la droite ?", "On part de {a} pour aller à {b}. Quel est l’écart ?"]).replace("{a}", L1).replace("{b}", L2),
      ...qcmN(b - a, [a + b, b - a + m, b - a - m, b - a + S, b], "", m),
      canvas: droite(0, 4 * S, S, m, [{ value: a, label: L1 }, { value: b, label: L2 }]),
      explanation: etapes(`on lit les deux nombres, puis on soustrait.`, `${L1} repère ${fr(a)} et ${L2} repère ${fr(b)}. ${fr(b)} − ${fr(a)} = ${fr(b - a)}.`, `l’écart est ${fr(b - a)}.`),
    };
  }),
  D(8, 4, "Divise l’écart entre les deux nombres écrits par le nombre de parts.", () => {
    const n = un([2, 4, 5, 10]);
    const m = un([5, 10, 20, 50, 100, 200, 500, 1000]);
    const a = entre(1, 9) * 1000;
    const k = entre(1, n - 1);
    const L = un(LETTRES);
    const v = a + k * m;
    return {
      text: tournure(["Seuls deux nombres sont écrits.", "Ici, les petites graduations n’ont pas de nombre.", "Le segment est coupé en parts égales."], LIRE.slice(0, 5)).replace("{L}", L),
      ...qcmN(v, [a + k, a + k * 10, v + m, v - m, a + (k + 1) * m], "", m),
      canvas: droite(a, a + n * m, n * m, m, [{ value: v, label: L }]),
      explanation: etapes(`on trouve d’abord la valeur d’une part.`, `${fr(n * m)} ÷ ${n} = ${fr(m)}, puis ${fr(a)} + ${k} × ${fr(m)} = ${fr(v)}.`, `${L} repère ${fr(v)}.`),
    };
  }),
];

/* ═════════════════ entier_diviseur ═════════════════ */
const V = atelier("cm1", "nombre_entier", "entier_diviseur", "cm1_");
const estDiv = (d: number, n: number) => n % d === 0;
const explDiv = (d: number, n: number) =>
  etapes(
    `${d} est un diviseur de ${n} si la division de ${n} par ${d} tombe juste, avec un reste égal à 0.`,
    estDiv(d, n) ? `${n} ÷ ${d} = ${n / d}, reste 0.` : `${n} ÷ ${d} = ${Math.floor(n / d)}, reste ${n % d}.`,
    estDiv(d, n) ? `${d} est un diviseur de ${n}.` : `${d} n’est pas un diviseur de ${n}.`,
  );
const tirerDN = () => {
  const d = entre(2, 10);
  const k = entre(3, 15);
  return Math.random() < 0.5 ? { d, n: d * k } : { d, n: d * k + entre(1, d - 1) };
};
const CONTEXTE_RANGER = [
  ["œufs", "dans chaque boîte"], ["crayons", "dans chaque pot"], ["billes", "dans chaque sac"], ["photos", "sur chaque page"], ["bouteilles", "dans chaque caisse"], ["livres", "sur chaque étagère"], ["gâteaux", "sur chaque plateau"],
  ["chaises", "dans chaque rangée"], ["timbres", "sur chaque ligne"], ["graines", "dans chaque pot"], ["coquillages", "dans chaque bocal"], ["cartes", "dans chaque paquet"], ["tomates", "dans chaque cagette"], ["vélos", "dans chaque rang"], ["ballons", "dans chaque filet"],
];
const CLUBS = ["Un club de judo", "Une école de danse", "Un centre de loisirs", "Une chorale", "Une classe de neige", "Un club de rugby", "Un groupe de scouts", "Un atelier de théâtre", "Une colonie", "Un club de natation", "Une équipe de bénévoles", "Un orchestre"];
const NON_DIV = (n: number) => [2, 3, 4, 5, 6, 7, 8, 9, 10].filter((x) => n % x !== 0);
const QUEL_DIV = (n: number) => [`Quel nombre est un diviseur de ${n} ?`, `Lequel divise ${n} ?`, `Quel diviseur de ${n} vois-tu ?`, `Lequel de ces nombres divise ${n} ?`, `Choisis un diviseur de ${n}.`, `Trouve un diviseur de ${n}.`];

const entierDiviseur: TutorBankItemV4[] = [
  V(1, 1, "Fais la division : si le reste est 0, c’est un diviseur.", () => {
    const { d, n } = tirerDN();
    return {
      text: un(["Est-ce que {d} est un diviseur de {n} ?", "{d} est-il un diviseur de {n} ?", "Le nombre {d} divise-t-il {n} ?", "{d} divise-t-il {n} exactement ?", "La division de {n} par {d} tombe-t-elle juste ?", "{n} ÷ {d} a-t-il un reste égal à 0 ?", "Peut-on dire que {d} est un diviseur de {n} ?", "{n} a-t-il {d} pour diviseur ?"]).replace(/\{d\}/g, String(d)).replace(/\{n\}/g, String(n)),
      ...qcm(estDiv(d, n) ? "Oui" : "Non", [estDiv(d, n) ? "Non" : "Oui"]),
      explanation: explDiv(d, n),
    };
  }),
  V(2, 1, "Dans une multiplication, chaque facteur est un diviseur du résultat.", () => {
    let d = 0, k = 0, n = 0;
    do { d = entre(2, 10); k = entre(3, 12); n = d * k; } while (NON_DIV(n).length < 3);
    return {
      text: tournure([`${d} × ${k} = ${n}.`, `On sait que ${d} × ${k} = ${n}.`, `Voici un produit : ${d} × ${k} = ${n}.`, `Regarde : ${d} × ${k} = ${n}.`, `Observe : ${d} × ${k} = ${n}.`], QUEL_DIV(n)),
      ...qcmN(d, NON_DIV(n)),
      explanation: etapes(`dans ${d} × ${k} = ${n}, on peut partager ${n} en ${d} parts égales.`, `${n} ÷ ${d} = ${k}, reste 0.`, `${d} est un diviseur de ${n}.`),
    };
  }),
  V(3, 2, "Essaie chaque nombre : un seul tombe juste.", () => {
    let d = 0, n = 0;
    do { d = entre(2, 10); n = d * entre(4, 15); } while (NON_DIV(n).length < 3);
    return {
      text: tournure(["Pense aux tables.", "Essaie chaque nombre.", "Fais les divisions."], ["Parmi ces nombres, lequel est un diviseur de {n} ?", "Lequel de ces nombres divise {n} ?", "Quel nombre est un diviseur de {n} ?", "Choisis le diviseur de {n}.", "Cherche le diviseur de {n}.", "Un seul nombre divise {n}. Lequel ?", "Trouve le diviseur de {n} dans la liste."]).replace("{n}", String(n)),
      ...qcmN(d, NON_DIV(n)),
      explanation: explDiv(d, n),
    };
  }),
  V(4, 2, "Quel nombre est dans la table ?", () => {
    const d = entre(3, 10);
    const n = d * entre(3, 12);
    const faux = [1, 2, 3, 4, 5, 6].map((k) => n + k).filter((x) => x % d !== 0);
    return {
      text: tournure(["Pense à la table.", "Cherche dans la table.", "Fais les divisions."], ["Quel nombre a {d} pour diviseur ?", "{d} est un diviseur de quel nombre ?", "{d} divise lequel de ces nombres ?", "Lequel de ces nombres est divisible par {d} ?", "Choisis le nombre qui a {d} pour diviseur.", "Quel nombre se divise par {d} sans reste ?", "Trouve le nombre que {d} divise."]).replace(/\{d\}/g, String(d)),
      ...qcmN(n, faux),
      explanation: etapes(`on cherche le nombre qui est dans la table de ${d}.`, `${n} = ${d} × ${n / d}, donc ${n} ÷ ${d} = ${n / d}, reste 0.`, `${d} est un diviseur de ${n}.`),
    };
  }),
  V(5, 2, "Regarde le reste.", () => {
    const { d, n } = tirerDN();
    const q = Math.floor(n / d);
    const r = n % d;
    return {
      text: tournure([`${n} ÷ ${d} = ${q}, reste ${r}.`, `Dans ${n} ÷ ${d}, le quotient est ${q} et le reste ${r}.`, `On divise ${n} par ${d} : on trouve ${q}, reste ${r}.`, `La division de ${n} par ${d} donne ${q}, reste ${r}.`], [`${d} est-il un diviseur de ${n} ?`, `Peut-on dire que ${d} divise ${n} ?`, `${n} a-t-il ${d} pour diviseur ?`, `${d} divise-t-il ${n} ?`, `Alors, ${d} est-il un diviseur de ${n} ?`]),
      ...qcm(r === 0 ? "Oui" : "Non", [r === 0 ? "Non" : "Oui"]),
      explanation: explDiv(d, n),
    };
  }),
  V(6, 3, "On peut tout ranger si la division tombe juste.", () => {
    const { d, n } = tirerDN();
    const [obj, lieu] = un(CONTEXTE_RANGER);
    return {
      text: tournure([`On a ${n} ${obj}.`, `Il y a ${n} ${obj}.`, `Un magasin reçoit ${n} ${obj}.`], [`On veut ${d} ${obj} ${lieu}.`, `On met ${d} ${obj} ${lieu}.`], ["Peut-on tout ranger sans reste ?", "Tombe-t-on juste ?", "Reste-t-il zéro à la fin ?"]),
      ...qcm(estDiv(d, n) ? "Oui" : "Non", [estDiv(d, n) ? "Non" : "Oui"]),
      explanation: explDiv(d, n),
    };
  }),
  V(7, 3, "La taille d’une équipe doit être un diviseur du nombre de personnes.", () => {
    let d = 0, n = 0;
    do { d = entre(2, 10); n = d * entre(4, 12); } while (NON_DIV(n).length < 3 || n < 12);
    return {
      text: tournure([`${un(CLUBS)} compte ${n} membres.`], ["On veut des équipes égales, sans personne de côté.", "On forme des groupes de même taille, sans reste."], ["Quelle taille d’équipe convient ?", "Combien de membres par groupe ?"]),
      ...qcmN(d, NON_DIV(n), "membres"),
      explanation: explDiv(d, n),
    };
  }),
  V(8, 4, "Teste les nombres un par un.", () => {
    const n = un([12, 18, 20, 24, 28, 30, 36, 40, 42, 45, 48, 50, 54, 56, 60, 63, 70, 72, 75, 80, 84, 90]);
    const liste = melange([2, 3, 4, 5, 6, 7, 8, 9, 10]).slice(0, 4).sort((a, b) => a - b);
    const nb = liste.filter((x) => n % x === 0);
    return {
      text: tournure([`Voici des nombres : ${liste.join(", ")}.`, `Regarde cette liste : ${liste.join(", ")}.`, `Liste : ${liste.join(", ")}.`, `Une affiche montre ${liste.join(", ")}.`, `Un jeu donne ${liste.join(", ")}.`, `Un tableau porte ${liste.join(", ")}.`, `Un dé spécial affiche ${liste.join(", ")}.`, `Une carte indique ${liste.join(", ")}.`], [`Combien sont des diviseurs de ${n} ?`, `Combien divisent ${n} ?`, `Combien de ces nombres divisent ${n} ?`]),
      format: "qcm",
      choices: ["0", "1", "2", "3", "4"],
      expected: [String(nb.length)],
      comparator: "mcq_exact",
      explanation: etapes(`on teste chaque nombre : la division de ${n} tombe-t-elle juste ?`, liste.map((x) => `${n} ÷ ${x} : reste ${n % x}`).join(" ; ") + ".", `${nb.length} nombre(s) divise(nt) ${n}.`),
    };
  }),
  V(10, 1, "Reste égal à 0 : c’est un diviseur.", () => {
    const { d, n } = tirerDN();
    const r = n % d;
    const oui = `${d} est un diviseur de ${n}`;
    const non = `${d} n’est pas un diviseur de ${n}`;
    return {
      text: un(["Le reste de {n} ÷ {d} est {r}. Que peut-on dire ?", "{n} ÷ {d} donne un reste de {r}. Que dis-tu ?", "Dans {n} ÷ {d}, il reste {r}. Quelle phrase est juste ?", "On calcule {n} ÷ {d}. Reste : {r}. Choisis la phrase juste.", "Reste de {n} ÷ {d} : {r}. Que peut-on écrire ?", "{n} ÷ {d} : le reste vaut {r}. Quelle phrase convient ?", "La division {n} ÷ {d} laisse {r}. Que peut-on dire ?", "Reste {r} pour {n} ÷ {d}. Que conclure ?"]).replace(/\{n\}/g, String(n)).replace(/\{d\}/g, String(d)).replace(/\{r\}/g, String(r)),
      ...qcm(r === 0 ? oui : non, [r === 0 ? non : oui]),
      explanation: explDiv(d, n),
    };
  }),
  V(9, 4, "Le bon nombre est dans les deux tables.", () => {
    const [a, b] = un([[2, 5], [2, 3], [3, 5], [2, 7], [3, 4], [4, 5], [3, 7], [5, 7]] as const);
    const n = a * b * entre(1, Math.floor(100 / (a * b)));
    const seul = (x: number) => (x % a === 0) !== (x % b === 0);
    const faux: number[] = [];
    while (faux.length < 3) {
      const x = (Math.random() < 0.5 ? a : b) * entre(2, 15);
      if (seul(x) && !faux.includes(x)) faux.push(x);
    }
    return {
      text: tournure(["Un code secret est un nombre.", "Un nombre mystère se cache ici.", "Un coffre s’ouvre avec un nombre.", "Une énigme cherche un nombre.", "Un jeu cache un nombre."], [`Il a ${a} et ${b} pour diviseurs.`, `${a} et ${b} sont ses diviseurs.`, `Il est divisible par ${a} et par ${b}.`], ["Lequel est-ce ?", "Quel est ce nombre ?"]),
      ...qcmN(n, faux),
      explanation: etapes(`le nombre doit être dans la table de ${a} ET dans celle de ${b}.`, `${n} ÷ ${a} = ${n / a} et ${n} ÷ ${b} = ${n / b}, sans reste.`, `c’est ${n}.`),
    };
  }),
];

/* ═════════════════ entier_encadrer ═════════════════ */
const E = atelier("cm1", "nombre_entier", "entier_encadrer", "cm1_");
const UNITE = [{ mot: "dizaine", p: 10 }, { mot: "centaine", p: 100 }, { mot: "millier", p: 1000 }] as const;
/** Un nombre qui n'est pas un multiple de p. */
const nonRond = (p: number, min = 1000, max = 99999) => {
  for (;;) {
    const n = entre(min, max);
    if (n % p !== 0) return n;
  }
};
const trio = (a: number, n: number, b: number) => `${fr(a)} < ${fr(n)} < ${fr(b)}`;
/** Des encadrements FAUX seulement : aucun leurre ne doit être une vérité plus large. */
const leurresTrio = (a: number, n: number, p: number) => [trio(a - p, n, a), trio(a + p, n, a + 2 * p), trio(a + p, n, a)];

const entierEncadrer: TutorBankItemV4[] = [
  E(1, 1, "Le nombre doit être plus grand que le premier et plus petit que le second.", () => {
    const p = un([10, 100, 1000]);
    const a = entre(3, 99) * p;
    const b = a + p;
    const n = a + entre(1, p - 1);
    return {
      text: un(["Quel nombre est compris entre {a} et {b} ?", "Quel nombre est entre {a} et {b} ?", "Choisis un nombre entre {a} et {b}.", "Lequel se place entre {a} et {b} ?", "Intercale un nombre entre {a} et {b}.", "Complète : {a} < … < {b}.", "Trouve le nombre situé entre {a} et {b}.", "Quel nombre peut-on placer entre {a} et {b} ?", "Cherche un nombre plus grand que {a} et plus petit que {b}.", "Plus grand que {a}, plus petit que {b} : lequel ?", "Quel nombre vient après {a} et avant {b} ?", "Un seul nombre est entre {a} et {b}. Lequel ?", "Quel nombre dépasse {a} sans atteindre {b} ?", "Écris un nombre entre {a} et {b}."]).replace(/\{a\}/g, fr(a)).replace(/\{b\}/g, fr(b)),
      ...qcmN(n, [a - entre(1, p), b + entre(1, p), a - p, b + p, a * 10], "", p),
      explanation: etapes(`on cherche un nombre plus grand que ${fr(a)} et plus petit que ${fr(b)}.`, `${trio(a, n, b)}.`, `le nombre est ${fr(n)}.`),
    };
  }),
  E(10, 1, "Regarde si le nombre dépasse la première borne, puis s’il reste sous la seconde.", () => {
    const p = un([10, 100, 1000]);
    const a = entre(3, 99) * p;
    const b = a + p;
    const dedans = Math.random() < 0.5;
    const n = dedans ? a + entre(1, p - 1) : un([a - entre(1, p), b + entre(1, p)]);
    return {
      text: un(["{n} est-il entre {a} et {b} ?", "Le nombre {n} est-il compris entre {a} et {b} ?", "Est-ce que {n} se place entre {a} et {b} ?", "{n} se trouve-t-il entre {a} et {b} ?", "A-t-on {a} < {n} < {b} ?", "Peut-on écrire {a} < {n} < {b} ?", "L’écriture {a} < {n} < {b} est-elle juste ?", "{n} est-il plus grand que {a} et plus petit que {b} ?"]).replace(/\{n\}/g, fr(n)).replace(/\{a\}/g, fr(a)).replace(/\{b\}/g, fr(b)),
      ...qcm(dedans ? "Oui" : "Non", [dedans ? "Non" : "Oui"]),
      explanation: etapes(`on compare ${fr(n)} à ${fr(a)}, puis à ${fr(b)}.`, dedans ? `${trio(a, n, b)}.` : n < a ? `${fr(n)} < ${fr(a)} : il est avant.` : `${fr(n)} > ${fr(b)} : il est après.`, dedans ? `oui, il est entre les deux.` : `non, il n’est pas entre les deux.`),
    };
  }),
  E(2, 1, "Une dizaine se termine par 0.", () => {
    const n = nonRond(10, 100, 9999);
    const a = Math.floor(n / 10) * 10;
    const apres = Math.random() < 0.5;
    const juste = apres ? a + 10 : a;
    return {
      text: (apres
        ? un(["Quelle dizaine vient juste après {n} ?", "{n} est entre {a} et quelle dizaine ?", "Complète : {n} < …, la dizaine juste après.", "Quelle est la dizaine juste au-dessus de {n} ?", "Cherche la dizaine qui suit {n}.", "Après {n}, quelle est la dizaine suivante ?"])
        : un(["Quelle dizaine vient juste avant {n} ?", "Quelle est la dizaine juste en dessous de {n} ?", "Complète : … < {n}, la dizaine juste avant.", "Cherche la dizaine qui précède {n}.", "Avant {n}, quelle est la dizaine précédente ?", "{n} est juste après quelle dizaine ?"])
      ).replace(/\{n\}/g, fr(n)).replace("{a}", fr(a)),
      ...qcmN(juste, [apres ? a : a + 10, apres ? a + 20 : a - 10, n, n + 1, a + 100], "", 10),
      explanation: etapes(`une dizaine se termine par 0.`, `${trio(a, n, a + 10)}.`, `la réponse est ${fr(juste)}.`),
    };
  }),
  E(3, 2, "Garde les chiffres de gauche, remplace les autres par des 0.", () => {
    const { mot, p } = un(UNITE);
    const n = nonRond(p);
    const a = Math.floor(n / p) * p;
    const lPh = mot === "millier" ? "au millier" : `à la ${mot}`;
    return {
      text: un([`Encadre ${fr(n)} ${lPh}.`, `Quel est le bon encadrement de ${fr(n)} ${lPh} ?`, `Choisis l’encadrement ${lPh} de ${fr(n)}.`, `Encadrement ${lPh} de ${fr(n)} : lequel est juste ?`]),
      ...qcm(trio(a, n, a + p), leurresTrio(a, n, p)),
      explanation: etapes(`on cherche les deux nombres ronds ${lPh} qui entourent ${fr(n)}.`, `${fr(a)} est juste avant et ${fr(a + p)} juste après.`, `${trio(a, n, a + p)}.`),
    };
  }),
  E(4, 2, "Le nombre cherché doit vérifier les deux signes.", () => {
    const a = entre(10, 900) * 10;
    const b = a + un([2, 4, 5, 10]);
    const n = entre(a + 1, b - 1);
    return {
      text: un(["Complète : {a} < … < {b}.", "Quel nombre peut-on écrire ? {a} < … < {b}.", "Choisis le nombre qui convient : {a} < … < {b}.", "Intercale un nombre : {a} < … < {b}.", "Trouve le nombre manquant : {a} < … < {b}.", "Lequel complète {a} < … < {b} ?"]).replace("{a}", fr(a)).replace("{b}", fr(b)),
      ...qcmN(n, [a, b, a - 1, b + 1, a - 5, b + 5]),
      explanation: etapes(`le nombre doit être plus grand que ${fr(a)} et plus petit que ${fr(b)}.`, `${trio(a, n, b)}.`, `${fr(n)} convient.`),
    };
  }),
  E(5, 2, "Le point est entre deux nombres écrits sur la droite.", () => {
    const S = un([10, 100, 1000, 10000]);
    const k = entre(0, 4);
    const m = S / 5;
    const v = k * S + entre(1, 4) * m;
    const L = un(LETTRES);
    const a = k * S;
    return {
      text: un(["Entre quels nombres écrits se trouve {L} ?", "{L} est entre quels nombres ?", "Encadre le point {L} par deux nombres écrits.", "Le point {L} est compris entre quels nombres ?", "Quel encadrement convient au point {L} ?"]).replace("{L}", L),
      ...qcm(`Entre ${fr(a)} et ${fr(a + S)}`, [`Entre ${fr(a + S)} et ${fr(a + 2 * S)}`, `Entre ${fr(a + 2 * S)} et ${fr(a + 3 * S)}`, `Entre ${fr(a + 3 * S)} et ${fr(a + 4 * S)}`]),
      canvas: droite(0, 6 * S, S, m, [{ value: v, label: L }]),
      explanation: etapes(`on regarde le nombre écrit juste à gauche du point et celui juste à droite.`, `à gauche : ${fr(a)} ; à droite : ${fr(a + S)}.`, `${L} est entre ${fr(a)} et ${fr(a + S)}.`),
    };
  }),
  E(6, 3, "Remplace les derniers chiffres par des 0.", () => {
    const { mot, p } = un(UNITE);
    const c = un([
      ["Un stade a", "places"], ["Une ville compte", "habitants"], ["Une voiture a roulé", "km"], ["Un festival a reçu", "visiteurs"], ["Une vidéo a", "vues"], ["Un livre s’est vendu à", "exemplaires"],
      ["Un musée a reçu", "visiteurs"], ["Un port voit passer", "bateaux"], ["Une ferme récolte", "pommes"], ["Une piscine contient", "litres"], ["Une bibliothèque a", "livres"], ["Un marathon réunit", "coureurs"],
    ]);
    const n = nonRond(p);
    const a = Math.floor(n / p) * p;
    const lPh = mot === "millier" ? "au millier" : `à la ${mot}`;
    return {
      text: tournure([`${c[0]} ${fr(n)} ${c[1]}.`], [`Encadre ce nombre ${lPh}.`, `Quel est l’encadrement ${lPh} ?`]),
      ...qcm(trio(a, n, a + p), leurresTrio(a, n, p)),
      explanation: etapes(`on cherche les deux nombres ronds ${lPh} qui entourent ${fr(n)}.`, `${fr(a)} est juste avant et ${fr(a + p)} juste après.`, `${trio(a, n, a + p)}.`),
    };
  }),
  E(7, 3, "Le nombre doit rester entre les deux bornes.", () => {
    const a = entre(2, 90) * 1000;
    const b = a + un([1000, 2000]);
    const n = a + entre(1, (b - a) / 100 - 1) * 100;
    const c = un([["Le prix d’une voiture est compris", "€"], ["Le prix d’un bateau est compris", "€"], ["La masse d’un camion est comprise", "kg"], ["La hauteur d’un avion est comprise", "m"], ["Le nombre de spectateurs est compris", "personnes"], ["La longueur d’un trajet est comprise", "km"], ["La masse d’une baleine est comprise", "kg"], ["La distance d’une course est comprise", "m"], ["Le prix d’un terrain est compris", "€"]]);
    return {
      text: tournure([`${c[0]} entre ${fr(a)} et ${fr(b)} ${c[1]}.`], ["Quelle valeur est possible ?", "Quelle valeur peut convenir ?", "Choisis une valeur possible."]),
      ...qcmN(n, [a - 100, b + 100, a - 1000, b + 1000, a / 10, b * 2], c[1], 1000),
      explanation: etapes(`la valeur doit être plus grande que ${fr(a)} et plus petite que ${fr(b)}.`, `${trio(a, n, b)}.`, `${fr(n)} ${c[1]} est possible.`),
    };
  }),
  E(8, 4, "Écris-les tous, sans compter les deux bornes.", () => {
    const a = entre(100, 9900);
    const nb = entre(3, 9);
    const b = a + nb + 1;
    return {
      text: tournure(["Compte les nombres entiers entre {a} et {b}.", "Un compteur va de {a} à {b}.", "Un guichet distribue des tickets de {a} à {b}.", "Un jeu passe de {a} à {b}.", "Des dossards vont de {a} à {b}.", "Des maisons sont numérotées de {a} à {b}.", "Des billets vont du numéro {a} au numéro {b}.", "Des pages vont de {a} à {b}."], ["Sans compter {a} ni {b}, combien de nombres entiers y a-t-il ?", "Combien de nombres entiers y a-t-il entre les deux, sans {a} ni {b} ?", "On retire {a} et {b}. Combien de nombres entiers reste-t-il entre eux ?"]).replace(/\{a\}/g, fr(a)).replace(/\{b\}/g, fr(b)),
      ...qcmN(nb, [nb + 1, nb + 2, nb - 1, nb * 10]),
      explanation: etapes(`on écrit les nombres après ${fr(a)} et avant ${fr(b)}.`, `${fr(a + 1)}, …, ${fr(b - 1)}. ${fr(b)} − ${fr(a)} − 1 = ${nb}.`, `il y a ${nb} nombres entiers.`),
    };
  }),
  E(9, 4, "Écris les nombres de l’intervalle, puis regarde le chiffre demandé.", () => {
    const a = entre(10, 900) * 10;
    const u = entre(1, 9);
    const n = a + u;
    return {
      text: tournure(["Je suis un nombre mystère.", "Un élève cherche un nombre.", "Un coffre a un code.", "Un robot pense à un nombre.", "Une devinette cache un nombre.", "Un dossard porte un nombre."], [`Il est entre ${fr(a)} et ${fr(a + 10)}.`, `Il est compris entre ${fr(a)} et ${fr(a + 10)}.`], [`Son chiffre des unités est ${u}.`], ["Quel est ce nombre ?", "Lequel est-ce ?"]),
      ...qcmN(n, [n + 10, n - 10, n + 20, u === 5 ? a + 6 : a + 10 - u]),
      explanation: etapes(`entre ${fr(a)} et ${fr(a + 10)}, un seul nombre a ${u} pour chiffre des unités.`, `${fr(a)} + ${u} = ${fr(n)}.`, `c’est ${fr(n)}.`),
    };
  }),
];

export const nombresEntiersTrousBank: TutorBankItemV4[] = [...entierDroite, ...entierDiviseur, ...entierEncadrer];
