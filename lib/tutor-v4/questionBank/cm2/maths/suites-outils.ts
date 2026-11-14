// lib/tutor-v4/questionBank/cm2/maths/suites-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DES SUITES DU CM2 (notion `suite`). Avant : 2 à 9
// squelettes par micro, beaucoup de répétitions. Pas de vidéo : vocabulaire du
// cycle 3 (« suite », « terme », « rang », « règle », « on ajoute », « on
// enlève », « on multiplie », « on divise », « croissante », « décroissante »,
// « motif qui se répète »).
// Architecture reprise du CM1 (cm1/maths/suites-outils.ts, 65b82b93), niveau CM2 :
// pas décimaux jusqu'aux centièmes, ×2 / ×3 / ×10 / ÷2 / ÷10, grands nombres,
// suites de figures (allumettes, tables, wagons), terme de rang 50 ou 100.
// Chaque gabarit tire une SITUATION (métiers, sport, cuisine, jardin, école…)
// × une TOURNURE × des nombres.
// ⛔ CM2 = zéro clavier : que des QCM, leurres = vraies erreurs d'élève
// (ajouter au lieu d'enlever, se tromper de pas, compter N sauts au lieu de
// N − 1, oublier la retenue des centièmes, garder le même écart dans une suite
// qui double, compter les intervalles au lieu des poteaux…).
// ⛔ Le dessin porte les DONNÉES, jamais la réponse : sur les questions de règle
// et de sens (croissante / décroissante), les flèches « +3 » sont cachées.
// Dessins : `suite` (les termes en cases, les motifs en frise) et
// `tableau_donnees` (rang → terme).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { SuiteCanvasData, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, qcm, un } from "@/lib/tutor-v4/questionBank/cm1/maths/trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

/** « de Amir » → « d'Amir », « que Inès » → « qu'Inès ». */
const elide = (t: string) => t.replace(/(de|que) (?=[AEIOUÉ][a-zéèï])/g, (_m, w: string) => (w === "de" ? "d'" : "qu'"));
const elider = (g: () => G) => () => {
  const q = g();
  return { ...q, text: elide(q.text) };
};

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, gen: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm2_${microId}_tpl_${n}`,
    niveau: "cm2",
    matiere: "maths",
    notionId: "suite",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm2", "suite", microId, "template", "canvas"],
    generate: elider(gen),
  }) as TutorBankItemV4;

/* ───────────────────────── Les nombres ───────────────────────── */

const arr = (x: number) => Math.round(x * 10000) / 10000;
/** Un prix : 1.3 → « 1,30 » ; 12 → « 12 ». */
const eur = (v: number) => (Number.isInteger(arr(v)) ? fr(v) : `${fr(Math.floor(arr(v)))},${arr(v).toFixed(2).split(".")[1]}`);
const val = (v: number, u: string) => (!u ? fr(v) : u === "€" ? `${eur(v)} €` : `${fr(v)} ${u}`);
const suiteTxt = (l: readonly (number | string)[]) => l.map((v) => (typeof v === "number" ? fr(v) : v)).join(" ; ");
const suiteU = (l: readonly number[], u: string) => l.map((v) => val(v, u)).join(" ; ");
const listePuis = (l: readonly number[], u: string) => l.map((v) => val(v, u)).join(", puis ");
const listeEt = (l: readonly number[], u: string) => {
  const s = l.map((v) => val(v, u));
  return `${s.slice(0, -1).join(", ")} et ${s[s.length - 1]}`;
};
const liste = (l: readonly number[], u: string) => (Math.random() < 0.5 ? listePuis(l, u) : listeEt(l, u));
/** Un multiple de `m` entre min et max. */
const tire = (min: number, max: number, m = 1) => entre(Math.ceil(min / m), Math.floor(max / m)) * m;
const termes = (a: number, k: number, n = 4) => Array.from({ length: n }, (_, i) => arr(a + i * k));
const signe = (sens: 1 | -1) => (sens === 1 ? "+" : "−");

/** QCM de nombres : leurres distincts en VALEUR (et positifs), complétés par des voisins. */
function qN(juste: number, faux: readonly number[], u = "") {
  const j = arr(juste);
  const vals: number[] = [];
  for (const x of [...faux].map(arr).sort(() => Math.random() - 0.5)) if (x > 0 && x !== j && !vals.includes(x)) vals.push(x);
  const dec = (String(j).split(".")[1] ?? "").length;
  const pas = 10 ** -dec;
  for (let k = 1; vals.length < 3 && k < 30; k++)
    for (const x of [arr(j + k * pas), arr(j - k * pas)]) if (x > 0 && !vals.includes(x) && vals.length < 3) vals.push(x);
  return qcm(val(j, u), vals.slice(0, 3).map((x) => val(x, u)));
}

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alma", "Nour", "Clara"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules", "Adam", "Moussa"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
function perso(metier?: readonly [string, string]): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
}
function deux(): [Perso, Perso] {
  const p = perso();
  let q = perso();
  while (q.nom === p.nom) q = perso();
  return [p, q];
}

/* ───────────────────────── Les situations ───────────────────────── */

/** Une suite de la vie : qui, ce qu'on relève, l'unité, les pas possibles, la plage de départ. */
type Sit = {
  titre: string;
  u: string;
  m?: readonly [string, string];
  dit: (p: Perso, l: string) => string;
  q: (p: Perso) => string[];
  pas: number[];
  min: number;
  max: number;
  mult?: number;
};
const S = (titre: string, u: string, m: readonly [string, string] | undefined, dit: Sit["dit"], q: Sit["q"], pas: number[], min: number, max: number, mult = 1): Sit => ({ titre, u, m, dit, q, pas, min, max, mult });

/** Des suites qui MONTENT : min et max bornent le premier terme. */
const SIT_PLUS: Sit[] = [
  S("Les baguettes vendues", "", ["boulangère", "boulanger"], (p, l) => `${p.txt} compte les baguettes vendues depuis l'ouverture, heure après heure : ${l}.`, () => ["Combien de baguettes seront vendues à l'heure suivante ?", "Quel total comptera-t-on l'heure suivante ?"], [12, 15, 24, 25], 20, 80),
  S("Les rangées de poireaux", "", ["maraîchère", "maraîcher"], (p, l) => `Dans son champ, ${p.txt} compte les poireaux plantés après chaque rangée : ${l}.`, () => ["Combien de poireaux seront plantés après la rangée suivante ?"], [6, 8, 12, 15], 10, 40),
  S("Les livres rangés", "", ["bibliothécaire", "bibliothécaire"], (p, l) => `${p.txt} range des livres ; le total rangé passe à ${l}, jour après jour.`, () => ["Quel sera le total le jour suivant ?"], [25, 30, 40, 50], 100, 300, 5),
  S("L'entraînement de course", "km", ["coureuse", "coureur"], (p, l) => `Chaque semaine, ${p.txt} court un peu plus : ${l}.`, (p) => [`Combien de kilomètres courra-t-${p.il} la semaine suivante ?`], [2, 3, 5], 5, 15),
  S("La tirelire", "€", undefined, (p, l) => `${p.txt} compte l'argent de sa tirelire à la fin de chaque mois : ${l}.`, (p) => [`Combien aura-t-${p.il} le mois suivant ?`], [15, 20, 25, 50], 20, 120, 5),
  S("La plante qui pousse", "cm", ["botaniste", "botaniste"], (p, l) => `${p.txt} mesure une jeune plante semaine après semaine : ${l}.`, () => ["Combien mesurera-t-elle la semaine suivante ?"], [3, 4, 6, 7], 5, 25),
  S("Le mur de briques", "", ["maçonne", "maçon"], (p, l) => `${p.txt} monte un mur : à la fin de chaque heure, ${l} briques sont posées.`, () => ["Combien de briques seront posées à la fin de l'heure suivante ?"], [45, 50, 60, 75], 50, 200, 5),
  S("Les colis livrés", "", ["livreuse", "livreur"], (p, l) => `${p.txt} compte les colis livrés après chaque arrêt : ${l}.`, () => ["Combien de colis seront livrés après l'arrêt suivant ?"], [7, 8, 9, 12], 10, 40),
  S("Les points du jeu", "points", undefined, (p, l) => `Dans un jeu vidéo, ${p.txt} a ${l} après chaque niveau.`, (p) => [`Combien de points aura-t-${p.il} après le niveau suivant ?`], [75, 150, 250, 125], 100, 500, 25),
  S("Les sièges du stade", "", undefined, (_p, l) => `Au stade, les sièges du bord de chaque rangée portent les numéros ${l}.`, () => ["Quel numéro porte le siège du bord de la rangée suivante ?"], [18, 22, 24, 25], 1, 20),
  S("Les œufs du poulailler", "", ["agricultrice", "agriculteur"], (p, l) => `${p.txt} note le total d'œufs ramassés, matin après matin : ${l}.`, (p) => [`Quel total notera-t-${p.il} le matin suivant ?`], [18, 24, 36], 20, 60),
  S("Les longueurs de bassin", "", ["nageuse", "nageur"], (p, l) => `À chaque séance, ${p.txt} nage un peu plus : ${l} longueurs.`, (p) => [`Combien de longueurs nagera-t-${p.il} à la séance suivante ?`], [4, 6, 8], 10, 30),
  S("Le chiot sur la balance", "g", ["vétérinaire", "vétérinaire"], (p, l) => `${p.txt} pèse un chiot chaque semaine : ${l}.`, () => ["Combien pèsera le chiot la semaine suivante ?"], [150, 250, 300], 800, 2000, 50),
  S("Les répétitions de violon", "min", ["violoniste", "violoniste"], (p, l) => `Chaque jour, ${p.txt} répète un peu plus longtemps : ${l}.`, (p) => [`Combien de minutes répétera-t-${p.il} le jour suivant ?`], [5, 10, 15], 15, 45, 5),
  S("Les fournées de macarons", "", ["pâtissière", "pâtissier"], (p, l) => `${p.txt} prépare des macarons : ${l} sont prêts après chaque fournée.`, () => ["Combien de macarons seront prêts après la fournée suivante ?"], [24, 36, 48], 24, 100),
  S("L'album de cartes", "", undefined, (p, l) => `${p.txt} complète son album mois après mois : ${l} cartes collées.`, (p) => [`Combien de cartes aura-t-${p.il} collées le mois suivant ?`], [12, 15, 18], 20, 60),
  S("Les abonnés de la chaîne", "", ["vidéaste", "vidéaste"], (p, l) => `La chaîne de ${p.txt} compte ${l} abonnés, semaine après semaine.`, () => ["Combien d'abonnés comptera-t-elle la semaine suivante ?"], [125, 150, 250], 500, 2000, 25),
  S("Le compteur du camion", "km", ["routière", "routier"], (p, l) => `Le compteur du camion de ${p.txt} affiche ${l} à la fin de chaque journée.`, () => ["Qu'affichera-t-il à la fin de la journée suivante ?"], [350, 420, 480], 12000, 30000, 50),
  S("Les visiteurs du musée", "", ["guide", "guide"], (p, l) => `${p.txt} compte les visiteurs du musée depuis le matin, heure après heure : ${l}.`, () => ["Combien de visiteurs comptera-t-on l'heure suivante ?"], [120, 150, 175], 300, 900, 5),
  S("Les tickets du manège", "", ["forain", "forain"], (p, l) => `${p.txt} compte les tickets vendus pour son manège, jour après jour : ${l}.`, () => ["Quel total aura-t-on le jour suivant ?"], [35, 45, 60], 40, 150, 5),
];

/** Des suites qui DESCENDENT : min et max bornent le DERNIER terme connu. */
const SIT_MOINS: Sit[] = [
  S("La batterie de la tablette", "%", undefined, (p, l) => `La batterie de la tablette de ${p.nom} affiche ${l}, heure après heure.`, () => ["Quel pourcentage affichera-t-elle l'heure suivante ?"], [5, 10, 15, 20], 25, 35, 5),
  S("La bougie qui fond", "cm", undefined, (_p, l) => `Une grande bougie mesure ${l}, heure après heure.`, () => ["Combien mesurera-t-elle l'heure suivante ?"], [2, 3], 6, 12),
  S("La cuve du jardin", "L", ["jardinière", "jardinier"], (p, l) => `La cuve d'eau de ${p.txt} contient ${l}, jour après jour.`, () => ["Combien de litres contiendra-t-elle le jour suivant ?"], [15, 25, 40], 50, 200, 5),
  S("Les places du concert", "", undefined, (_p, l) => `Il reste ${l} places à vendre pour le concert, heure après heure.`, () => ["Combien de places restera-t-il l'heure suivante ?"], [25, 40, 50], 50, 300, 5),
  S("Le roman à finir", "", undefined, (p, l) => `Il reste à ${p.nom} ${l} pages à lire, soir après soir.`, () => ["Combien de pages lui restera-t-il le soir suivant ?"], [12, 15, 18, 25], 30, 150),
  S("Le compte à rebours", "s", undefined, (_p, l) => `Avant le départ d'une fusée, le compte à rebours affiche ${l}.`, () => ["Qu'affichera-t-il ensuite ?"], [5, 10, 15], 15, 60, 5),
  S("Le stock d'agendas", "", ["libraire", "libraire"], (p, l) => `${p.txt} vend des agendas ; le stock passe à ${l}, jour après jour.`, () => ["Combien d'agendas restera-t-il le jour suivant ?"], [7, 9, 12], 20, 80),
  S("Le four qui refroidit", "°C", ["cuisinière", "cuisinier"], (p, l) => `${p.txt} éteint son four, qui refroidit : ${l}.`, () => ["Quelle température affichera le four ensuite ?"], [15, 20, 25, 35], 40, 120, 5),
  S("La descente de la montagne", "m", ["guide de montagne", "guide de montagne"], (p, l) => `Pendant la descente, ${p.txt} note l'altitude : ${l}.`, (p) => [`Quelle altitude notera-t-${p.il} ensuite ?`], [150, 250, 300], 800, 2500, 50),
  S("Le réservoir de la voiture", "L", ["chauffeuse", "chauffeur"], (p, l) => `Après chaque trajet, le réservoir de la voiture de ${p.txt} contient ${l}.`, () => ["Combien contiendra-t-il après le trajet suivant ?"], [4, 5, 6], 10, 30),
  S("Les pots de glace", "", ["marchande de glaces", "marchand de glaces"], (p, l) => `${p.txt} vend ses glaces ; il reste ${l} pots, heure après heure.`, () => ["Combien de pots restera-t-il l'heure suivante ?"], [6, 7, 8], 12, 40),
  S("L'argent de poche", "€", undefined, (p, l) => `${p.nom} dépense son argent de poche ; il lui reste ${l}, semaine après semaine.`, () => ["Combien lui restera-t-il la semaine suivante ?"], [3, 4, 6], 6, 40),
  S("Le sac de graines", "g", ["agricultrice", "agriculteur"], (p, l) => `${p.txt} sème des graines ; il reste ${l} dans le sac, rang après rang.`, () => ["Combien de grammes restera-t-il après le rang suivant ?"], [125, 150, 250], 250, 1000, 25),
  S("Les boîtes de pansements", "", ["pharmacienne", "pharmacien"], (p, l) => `${p.txt} vend des boîtes de pansements ; il en reste ${l}, jour après jour.`, () => ["Combien de boîtes restera-t-il le jour suivant ?"], [12, 15, 24], 30, 120),
  S("La neige qui fond", "cm", ["pisteuse", "pisteur"], (p, l) => `Au printemps, ${p.txt} mesure la neige sur la piste : ${l}, jour après jour.`, () => ["Quelle hauteur mesurera-t-on le jour suivant ?"], [3, 4, 5], 5, 20),
];

/** Des suites DÉCIMALES qui montent : pas en dixièmes. */
const SIT_DEC: Sit[] = [
  S("La pousse de bambou", "cm", undefined, (_p, l) => `Une pousse de bambou mesure ${l}, jour après jour.`, () => ["Combien mesurera-t-elle le jour suivant ?"], [0.5, 1.5, 2.5], 1, 9),
  S("Le prix des tomates", "€", ["maraîchère", "maraîcher"], (p, l) => `Sur l'étal de ${p.txt} le kilo de tomates passe à ${l}, semaine après semaine.`, () => ["Quel sera le prix la semaine suivante ?"], [0.1, 0.2, 0.3], 1, 3),
  S("La course du matin", "km", ["coureuse", "coureur"], (p, l) => `${p.txt} court chaque jour un peu plus : ${l}.`, (p) => [`Combien de kilomètres courra-t-${p.il} le jour suivant ?`], [0.5, 0.2, 0.4], 1, 5),
  S("Le bébé sur la balance", "kg", ["sage-femme", "sage-femme"], (p, l) => `${p.txt} pèse un bébé chaque mois : ${l}.`, () => ["Combien pèsera le bébé le mois suivant ?"], [0.3, 0.4, 0.5], 3, 5),
  S("Le pluviomètre", "cm", undefined, (_p, l) => `Le pluviomètre de l'école indique ${l}, heure après heure.`, () => ["Qu'indiquera-t-il l'heure suivante ?"], [0.2, 0.3, 0.5], 1, 4),
  S("Le compteur du taxi", "€", ["chauffeuse de taxi", "chauffeur de taxi"], (p, l) => `Dans le taxi de ${p.nom}, le compteur affiche ${l}, kilomètre après kilomètre.`, () => ["Qu'affichera le compteur au kilomètre suivant ?"], [1.5, 2.5], 3, 8),
  S("Les rubans", "m", ["couturière", "couturier"], (p, l) => `${p.txt} coupe des rubans de plus en plus longs : ${l}.`, (p) => ["Quelle longueur aura le ruban suivant ?", `Quelle longueur coupera-t-${p.il} ensuite ?`], [0.5, 1.5, 0.3], 1, 4),
  S("Le saut en longueur", "m", ["athlète", "athlète"], (p, l) => `À chaque essai, ${p.txt} saute un peu plus loin : ${l}.`, (p) => [`Quelle longueur sautera-t-${p.il} à l'essai suivant ?`], [0.1, 0.2], 2, 4),
];

/** Des suites DÉCIMALES qui montent : pas en centièmes. */
const SIT_CENT: Sit[] = [
  S("Le prix du café", "€", ["serveuse", "serveur"], (p, l) => `${p.txt} affiche le prix du café, année après année : ${l}.`, () => ["Quel sera le prix l'année suivante ?"], [0.05, 0.15], 1, 2),
  S("Le tournesol", "m", ["jardinière", "jardinier"], (p, l) => `${p.txt} mesure un tournesol chaque semaine : ${l}.`, () => ["Combien mesurera-t-il la semaine suivante ?"], [0.05, 0.15, 0.04], 0, 1),
  S("Le prix du timbre", "€", ["postière", "postier"], (p, l) => `${p.txt} affiche le prix d'un timbre, année après année : ${l}.`, () => ["Quel sera le prix du timbre l'année suivante ?"], [0.05, 0.15, 0.25], 1, 2),
  S("Le bassin qui se remplit", "m", ["maître-nageuse", "maître-nageur"], (p, l) => `${p.txt} remplit un bassin ; la hauteur d'eau est de ${l}, heure après heure.`, () => ["Quelle sera la hauteur d'eau l'heure suivante ?"], [0.05, 0.25, 0.15], 1, 1),
  S("Les pièces de la cagnotte", "€", undefined, (p, l) => `Chaque jour, ${p.nom} glisse des pièces dans une cagnotte : ${l}.`, () => ["Combien y aura-t-il le jour suivant ?"], [0.25, 0.75, 0.5], 1, 5),
  S("La rivière qui monte", "m", ["hydrologue", "hydrologue"], (p, l) => `Après l'orage, ${p.txt} relève le niveau de la rivière : ${l}.`, () => ["Quel niveau relèvera-t-on ensuite ?"], [0.05, 0.15, 0.02], 1, 3),
  S("Le carburant qui coûte plus", "€", ["garagiste", "garagiste"], (p, l) => `Chez ${p.txt} le litre d'essence coûte ${l}, mois après mois.`, () => ["Quel sera le prix du litre le mois suivant ?"], [0.02, 0.03, 0.05], 1, 1),
];

const departDec = (k: number, s: Sit) => (k < 1 ? arr(entre(s.min, s.max) + entre(1, Math.round(1 / k) - 1) * k) : arr(entre(s.min, s.max) + un([0, 0.5])));

/** Les termes d'une situation : 4 termes, et le suivant. */
function tirerSit(s: Sit, sens: 1 | -1, dec = false) {
  const k = un(s.pas);
  if (sens === 1) {
    const a = dec ? departDec(k, s) : tire(s.min, s.max, s.mult ?? 1);
    const t = termes(a, k);
    return { k, t, next: arr(a + 4 * k) };
  }
  const fin = tire(Math.max(s.min, k * 2), s.max, s.mult ?? 1);
  const t = termes(fin + 3 * k, -k);
  return { k, t, next: arr(fin - k) };
}

/* ───────────────────────── Les dessins ───────────────────────── */

function frise(terms: (number | string)[], o: { titre?: string; fleches?: string[]; manquant?: number; phrase?: string } = {}): SuiteCanvasData {
  const manquant = o.manquant ?? terms.indexOf("?");
  return {
    kind: "suite",
    theme: "nombre",
    titre: o.titre,
    terms: terms.map((t) => (typeof t === "number" ? fr(t) : t)),
    ...(manquant >= 0 ? { missingIndex: manquant } : {}),
    ...(o.fleches ? { arrows: o.fleches } : {}),
    ...(o.phrase ? { phrase: o.phrase } : {}),
    display: { showIcons: false, showArrows: !!o.fleches, showRule: false, showLabels: true },
  };
}

function tableauRang(coin: string, ligne: string, rangs: (number | string)[], valeurs: (number | string)[], titre?: string): TableauDonneesCanvasData {
  return {
    kind: "tableau_donnees",
    ...(titre ? { title: titre } : {}),
    coin,
    headers: rangs.map((r) => (typeof r === "number" ? fr(r) : r)),
    rows: [{ label: ligne, values: valeurs.map((v) => (typeof v === "number" ? fr(v) : v)) }],
    highlight: { cell: { row: 0, col: valeurs.length - 1 } },
    display: { compact: true },
  } as TableauDonneesCanvasData;
}

/* ───────────────────────── Les motifs ───────────────────────── */

type Mo = { e: string; n: string };
const M = (e: string, n: string): Mo => ({ e, n });
const PERLES = [M("🔴", "perle rouge"), M("🔵", "perle bleue"), M("🟢", "perle verte"), M("🟡", "perle jaune"), M("🟣", "perle violette")];
const CARREAUX = [M("🟥", "carreau rouge"), M("🟦", "carreau bleu"), M("🟩", "carreau vert"), M("🟨", "carreau jaune"), M("⬛", "carreau noir")];
const FLEURS = [M("🌷", "tulipe"), M("🌻", "tournesol"), M("🌹", "rose"), M("🌼", "marguerite"), M("🪻", "jacinthe")];
const FRUITS = [M("🍓", "fraise"), M("🍌", "banane"), M("🍇", "raisin"), M("🍍", "ananas"), M("🥝", "kiwi")];
const FORMES = [M("🔺", "triangle"), M("⭐", "étoile"), M("❤️", "cœur"), M("🌙", "lune"), M("🔷", "losange")];
const FRIANDISES = [M("🍬", "bonbon"), M("🍫", "carré de chocolat"), M("🍪", "biscuit"), M("🍭", "sucette"), M("🧁", "petit gâteau")];
const LAMPIONS = [M("🔴", "lampion rouge"), M("🔵", "lampion bleu"), M("🟢", "lampion vert"), M("🟡", "lampion jaune"), M("🟣", "lampion violet")];
const DRAPEAUX = [M("🟥", "fanion rouge"), M("🟦", "fanion bleu"), M("🟩", "fanion vert"), M("🟨", "fanion jaune"), M("⬜", "fanion blanc")];

type SitMotif = { titre: string; m?: readonly [string, string]; dit: (p: Perso) => string; pal: Mo[]; suivant: (p: Perso) => string; rang: (n: number) => string; mot: string };
const SITS_MOTIF: SitMotif[] = [
  { titre: "Le collier de perles", m: ["bijoutière", "bijoutier"], dit: (p) => `${p.txt} enfile des perles sur un très long collier.`, pal: PERLES, suivant: (p) => `Quelle perle enfilera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e perle du collier ?`, mot: "perle" },
  { titre: "La frise de carreaux", m: ["carreleuse", "carreleur"], dit: (p) => `${p.txt} pose une frise de carreaux le long d'un mur.`, pal: CARREAUX, suivant: (p) => `Quel carreau posera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e carreau de la frise ?`, mot: "carreau" },
  { titre: "La jardinière de fleurs", m: ["fleuriste", "fleuriste"], dit: (p) => `${p.txt} plante des fleurs dans une longue jardinière, toujours dans le même ordre.`, pal: FLEURS, suivant: (p) => `Quelle fleur plantera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e fleur ?`, mot: "fleur" },
  { titre: "La brochette de fruits", m: ["traiteuse", "traiteur"], dit: (p) => `${p.txt} prépare une très longue brochette de fruits.`, pal: FRUITS, suivant: (p) => `Quel fruit piquera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e fruit de la brochette ?`, mot: "fruit" },
  { titre: "La frise de la classe", dit: (p) => `Sur la frise de la classe, ${p.nom} colle des gommettes.`, pal: FORMES, suivant: (p) => `Quelle gommette collera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e gommette ?`, mot: "gommette" },
  { titre: "La vitrine décorée", m: ["confiseuse", "confiseur"], dit: (p) => `${p.txt} aligne des friandises dans sa vitrine.`, pal: FRIANDISES, suivant: (p) => `Quelle friandise posera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e friandise ?`, mot: "friandise" },
  { titre: "Le ruban brodé", m: ["brodeuse", "brodeur"], dit: (p) => `${p.txt} brode des motifs sur un long ruban.`, pal: FORMES, suivant: (p) => `Quel motif brodera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e motif du ruban ?`, mot: "motif" },
  { titre: "La guirlande de la fête", m: ["décoratrice", "décorateur"], dit: (p) => `Pour la fête du quartier, ${p.txt} accroche une guirlande de lampions.`, pal: LAMPIONS, suivant: (p) => `Quel lampion accrochera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e lampion ?`, mot: "lampion" },
  { titre: "Les fanions du stade", m: ["animatrice", "animateur"], dit: (p) => `Au stade, ${p.txt} accroche des fanions tout autour du terrain.`, pal: DRAPEAUX, suivant: (p) => `Quel fanion accrochera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e fanion ?`, mot: "fanion" },
];

const PATRONS = ["AB", "ABC", "AAB", "ABB", "AABB", "ABCD", "ABCB", "AABC"] as const;
const choixMo = (m: Mo) => `${m.e} ${m.n}`;

/** Un motif : la situation, le groupe qui se répète, les objets de la palette. */
function tirerMotif(patrons: readonly string[] = PATRONS) {
  const s = un(SITS_MOTIF);
  const p = perso(s.m);
  const patron = un(patrons);
  const pal = [...s.pal].sort(() => Math.random() - 0.5);
  const lettres = [...new Set(patron.split(""))];
  const objet = (c: string) => pal[lettres.indexOf(c)];
  const groupe = patron.split("").map(objet);
  const extra = pal[lettres.length];
  const a = (i: number) => groupe[i % groupe.length];
  return { s, p, patron, groupe, extra, a, utiles: lettres.map(objet) };
}

function motifRang(m: ReturnType<typeof tirerMotif>, nMin: number, nMax: number): G {
  const { s, p, groupe, extra, a, utiles } = m;
  const g = groupe.length;
  const vus = Array.from({ length: Math.min(8, g * 2) }, (_, i) => a(i));
  const n = entre(Math.max(nMin, g * 3 + 1), nMax);
  const juste = a(n - 1);
  const q = Math.floor((n - 1) / g);
  const r = ((n - 1) % g) + 1;
  const calcul =
    r === g
      ? `Le groupe ${groupe.map((x) => x.e).join(" ")} a ${g} motifs. ${g} × ${q + 1} = ${n} : le ${n}e est le dernier d'un groupe.`
      : `Le groupe ${groupe.map((x) => x.e).join(" ")} a ${g} motifs. ${g} × ${q} = ${g * q} : le ${g * q}e finit un groupe, le ${n}e est le ${r === 1 ? "1er" : `${r}e`} du groupe suivant.`;
  return {
    text: `${s.dit(p)} ${un([s.rang(n), `Sans tout dessiner : ${minus(s.rang(n))}`, `${s.rang(n)} Pense aux groupes qui se répètent.`, `${cap(p.nom)} se demande : ${minus(s.rang(n))}`])}`,
    ...qcm(choixMo(juste), [...utiles.map(choixMo), choixMo(extra)].filter((c) => c !== choixMo(juste)).sort(() => Math.random() - 0.5)),
    explanation: etapes("On repère le groupe qui se répète et on compte par groupes entiers.", calcul, `Le ${n}e est : ${choixMo(juste)}.`),
    canvas: frise([...vus.map((v) => v.e), "…"], { titre: s.titre, manquant: -1 }),
  };
}

/* ═════════════════════════ SUITE_CONTINUER ═════════════════════════ */

const C = "suite_continuer";

const QSUIVANT = (s: string, p: Perso) => [
  `Continue la suite : ${s} ; ?`,
  `Quel est le nombre suivant dans la suite ${s} ?`,
  `Voici une suite : ${s}. Quel nombre vient ensuite ?`,
  `${p.nom} écrit la suite ${s}. Quel nombre écrit-${p.il} ensuite ?`,
  `Trouve le terme suivant : ${s} ; ?`,
  `Sur son cahier, ${p.nom} a commencé une suite : ${s}. Quel est le nombre suivant ?`,
  `Au tableau, on lit la suite ${s}. Quel terme vient après ?`,
  `${p.nom} dicte la suite ${s} à sa voisine. Quel nombre dira-t-${p.il} ensuite ?`,
  `Dans le cahier de ${p.nom}, la suite ${s} s'arrête. Quel nombre faut-il écrire après ?`,
  `${p.nom} continue la suite ${s}. Quel est le prochain nombre ?`,
];

const leurresSuivant = (last: number, k: number, sens: 1 | -1) => [
  last - sens * k, // ajouter au lieu d'enlever (ou l'inverse)
  last + sens * (k + 1), // se tromper de pas
  last + sens * (k - 1),
  last + sens * 2 * k, // sauter un terme
  last + sens * 10 * k,
];

export const suiteContinuerGabarits: TutorBankItemV4[] = [
  // ★1 — le nombre suivant, nombres nus, pas entiers.
  tpl(C, "1_addition", 1, "Trouve ce qu'on ajoute à chaque fois.", () => {
    const k = un([5, 9, 11, 12, 15, 20, 25, 50, 100]);
    const a = k >= 50 ? tire(50, 900, 25) : entre(3, 120);
    const t = termes(a, k);
    const next = a + 4 * k;
    const p = perso();
    return {
      text: un(QSUIVANT(suiteTxt(t), p)),
      ...qN(next, leurresSuivant(t[3], k, 1)),
      explanation: etapes("On cherche l'écart entre deux nombres voisins.", `${fr(t[1])} − ${fr(t[0])} = ${k} : on ajoute ${k} à chaque fois. ${fr(t[3])} + ${k} = ${fr(next)}.`, `Le nombre suivant est ${fr(next)}.`),
      canvas: frise([...t, "?"], { titre: "Continuer la suite", fleches: t.map(() => `+${k}`) }),
    };
  }),

  // ★1 — une situation de la vie qui monte.
  tpl(C, "c2_situation_plus", 1, "Regarde de combien on avance à chaque fois.", () => {
    const s = un(SIT_PLUS);
    const p = perso(s.m);
    const { k, t, next } = tirerSit(s, 1);
    return {
      text: `${s.dit(p, liste(t, s.u))} ${un(s.q(p))}`,
      ...qN(next, leurresSuivant(t[3], k, 1), s.u),
      explanation: etapes("On cherche ce qu'on ajoute d'une valeur à la suivante.", `On ajoute ${val(k, s.u)} à chaque fois : ${fr(t[3])} + ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, s.u)}.`),
      canvas: frise([...t.map((v) => val(v, s.u)), "?"], { titre: s.titre, fleches: t.map(() => `+${fr(k)}`) }),
    };
  }),

  // ★1 — le motif suivant d'une frise.
  tpl(C, "c3_motif_suivant", 1, "Cherche le groupe de motifs qui se répète.", () => {
    const { s, p, groupe, extra, a, utiles } = tirerMotif();
    const n = Math.min(9, Math.max(5, groupe.length * 2 + entre(0, groupe.length - 1)));
    const vus = Array.from({ length: n }, (_, i) => a(i));
    const juste = a(n);
    const q = un([s.suivant(p), "Quel est l'objet suivant ?", "Que faut-il mettre à la place du « ? » ?"]);
    return {
      text: `${s.dit(p)} ${q}`,
      ...qcm(choixMo(juste), [...utiles.map(choixMo), choixMo(extra)]),
      explanation: etapes("On repère le groupe qui se répète, puis on continue dans le même ordre.", `Le groupe est ${groupe.map((g) => g.e).join(" ")}. Après ${vus[n - 1].e}, on reprend la suite du groupe.`, `L'objet suivant est : ${choixMo(juste)}.`),
      canvas: frise([...vus.map((v) => v.e), "?"], { titre: s.titre }),
    };
  }),

  // ★1 — grands nombres : on passe le millier.
  tpl(C, "c4_grands_nombres", 1, "Ajoute le pas au dernier nombre, en surveillant les milliers.", () => {
    const k = un([10, 100, 250, 500, 1000]);
    const a = k === 10 ? tire(1950, 9950, 10) - 30 : k === 1000 ? tire(5000, 95000, 1000) : tire(1000, 20000, 100) - 2 * k;
    const t = termes(a, k);
    const next = a + 4 * k;
    const p = perso();
    return {
      text: un(QSUIVANT(suiteTxt(t), p)),
      ...qN(next, [t[3] - k, t[3] + 10 * k, t[3] + 2 * k, ...(k >= 100 ? [t[3] + k / 10] : [t[3] + 1]), next + 1000]),
      explanation: etapes("On cherche l'écart entre deux nombres voisins.", `On ajoute ${fr(k)} à chaque fois : ${fr(t[3])} + ${fr(k)} = ${fr(next)}.`, `Le nombre suivant est ${fr(next)}.`),
      canvas: frise([...t, "?"], { titre: "Des grands nombres", fleches: t.map(() => `+${fr(k)}`) }),
    };
  }),

  // ★2 — le nombre suivant d'une suite qui descend (nombres nus ou situation).
  tpl(C, "2_soustraction", 2, "La suite descend : cherche ce qu'on enlève.", () => {
    if (Math.random() < 0.45) {
      const k = un([3, 4, 6, 7, 8, 9, 12, 15, 25, 50]);
      const fin = entre(2, 60);
      const t = termes(fin + 4 * k, -k);
      const next = fin;
      const p = perso();
      return {
        text: un(QSUIVANT(suiteTxt(t), p)),
        ...qN(next, leurresSuivant(t[3], k, -1)),
        explanation: etapes("La suite diminue : on cherche ce qu'on enlève.", `${fr(t[0])} − ${fr(t[1])} = ${k} : on enlève ${k} à chaque fois. ${fr(t[3])} − ${k} = ${fr(next)}.`, `Le nombre suivant est ${fr(next)}.`),
        canvas: frise([...t, "?"], { titre: "Une suite qui descend" }),
      };
    }
    const s = un(SIT_MOINS);
    const p = perso(s.m);
    const { k, t, next } = tirerSit(s, -1);
    return {
      text: `${s.dit(p, liste(t, s.u))} ${un(s.q(p))}`,
      ...qN(next, leurresSuivant(t[3], k, -1), s.u),
      explanation: etapes("Les valeurs diminuent : on cherche ce qu'on enlève.", `On enlève ${val(k, s.u)} à chaque fois : ${fr(t[3])} − ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, s.u)}.`),
      canvas: frise([...t.map((v) => val(v, s.u)), "?"], { titre: s.titre }),
    };
  }),

  // ★2 — le terme manquant au milieu.
  tpl(C, "c5_terme_manquant", 2, "Le nombre manquant respecte la même règle que les autres.", () => {
    const sens: 1 | -1 = Math.random() < 0.6 ? 1 : -1;
    const k = un([4, 6, 7, 8, 9, 11, 12, 15, 25]);
    const a = sens === 1 ? entre(2, 80) : entre(2, 80) + 4 * k;
    const t = termes(a, sens * k, 5);
    const i = entre(1, 3);
    const juste = t[i];
    const vus: (number | string)[] = t.map((v, j) => (j === i ? "?" : v));
    const s = suiteTxt(vus);
    const p = perso();
    const text = un([
      `Quel nombre manque dans la suite ${s} ?`,
      `Complète la suite : ${s}`,
      `Trouve le nombre caché : ${s}`,
      `Une case de la suite est effacée : ${s}. Quel nombre y était écrit ?`,
      `${p.nom} a taché sa suite : ${s}. Quel nombre est sous la tache ?`,
    ]);
    return {
      text,
      ...qN(juste, [juste + 1, juste - 1, t[i - 1] - sens * k, juste + sens * 2 * k, t[i - 1] + sens]),
      explanation: etapes("On trouve la règle avec deux nombres voisins connus, puis on l'applique.", `La règle est « ${sens === 1 ? "ajouter" : "enlever"} ${k} » : ${fr(t[i - 1])} ${signe(sens)} ${k} = ${fr(juste)}, et ${fr(juste)} ${signe(sens)} ${k} = ${fr(t[i + 1])}.`, `Le nombre manquant est ${fr(juste)}.`),
      canvas: frise(vus, { titre: "Le nombre manquant" }),
    };
  }),

  // ★2 — suites décimales : pas en dixièmes.
  tpl(C, "c6_decimaux", 2, "Ajoute le même nombre décimal à chaque fois : attention aux dixièmes.", () => {
    const s = un(SIT_DEC);
    const p = perso(s.m);
    const { k, t, next } = tirerSit(s, 1, true);
    const last = t[3];
    // L'erreur de retenue : 2,5 + 0,5 écrit « 2,10 », c'est-à-dire 2,1.
    const dixiemes = Math.round((last % 1) * 10) + Math.round((k % 1) * 10);
    const retenue = dixiemes >= 10 ? arr(Math.floor(last) + Math.floor(k) + dixiemes / 100) : arr(next + 1);
    const faux = [arr(last + 10 * k), arr(last - k), retenue, arr(next + 0.1), arr(next - 0.1)];
    const pur = Math.random() < 0.35;
    const text = pur ? un(QSUIVANT(suiteTxt(t), p)) : `${s.dit(p, liste(t, s.u))} ${un(s.q(p))}`;
    const u = pur ? "" : s.u;
    return {
      text,
      ...qN(next, faux, u),
      explanation: etapes("On cherche ce qu'on ajoute d'un terme au suivant.", `On ajoute ${fr(k)} à chaque fois : ${fr(last)} + ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, u)}.`),
      canvas: frise([...t.map((v) => val(v, u)), "?"], { titre: pur ? "Une suite de nombres décimaux" : s.titre }),
    };
  }),

  // ★2 — suites qui doublent ou qui se multiplient par 10.
  tpl(C, "c7_double_dix", 2, "L'écart change à chaque fois ? C'est peut-être une multiplication.", () => {
    const f = un([2, 2, 10]);
    const a = f === 10 ? un([2, 3, 4, 5, 6, 7, 8, 9]) : entre(2, 15);
    const t = [a, a * f, a * f * f, a * f ** 3];
    const juste = a * f ** 4;
    const p = perso();
    const s = suiteTxt(t);
    const text = un([
      `Continue la suite : ${s} ; ?`,
      `${p.nom} écrit la suite ${s}. Quel nombre écrit-${p.il} ensuite ?`,
      `Quel est le terme suivant de la suite ${s} ?`,
      `Chaque nombre de la suite ${s} se calcule à partir du précédent. Quel est le suivant ?`,
      `Trouve le nombre qui vient après ${s}.`,
    ]);
    return {
      text,
      ...qN(juste, [t[3] + (t[3] - t[2]), t[3] + a, t[3] * (f + 1), t[3] + f, juste * f]),
      explanation: etapes("Les écarts ne sont pas égaux : on regarde si on multiplie.", `${fr(a)} × ${f} = ${fr(t[1])}, ${fr(t[1])} × ${f} = ${fr(t[2])}… donc ${fr(t[3])} × ${f} = ${fr(juste)}.`, `Le nombre suivant est ${fr(juste)}.`),
      canvas: frise([...t, "?"], { titre: "Une suite qui se multiplie" }),
    };
  }),

  // ★2 — le motif suivant d'une frise plus longue (groupes de 3 ou 4).
  tpl(C, "c8_motif_long", 2, "Le groupe qui se répète peut avoir 3 ou 4 motifs.", () => {
    const { s, p, groupe, extra, a, utiles } = tirerMotif(["ABCD", "ABCB", "AABC", "ABBC", "ABC"]);
    const n = Math.min(10, groupe.length * 2 + entre(1, groupe.length - 1));
    const vus = Array.from({ length: n }, (_, i) => a(i));
    const juste = a(n);
    const q = un([s.suivant(p), "Quel objet vient ensuite ?", "Que faut-il mettre à la place du « ? » ?"]);
    return {
      text: `${s.dit(p)} ${q}`,
      ...qcm(choixMo(juste), [...utiles.map(choixMo), choixMo(extra)]),
      explanation: etapes("On cherche quand la frise recommence depuis le début.", `Le groupe ${groupe.map((g) => g.e).join(" ")} a ${groupe.length} motifs ; après ${vus[n - 1].e}, on continue le groupe.`, `L'objet suivant est : ${choixMo(juste)}.`),
      canvas: frise([...vus.map((v) => v.e), "?"], { titre: s.titre }),
    };
  }),

  // ★3 — suites décimales : pas en centièmes (la retenue des centièmes).
  tpl(C, "4_decimal", 3, "Ajoute les centièmes avec les centièmes : 0,95 + 0,05 = 1.", () => {
    const pur = Math.random() < 0.4;
    const s = un(SIT_CENT);
    const p = perso(s.m);
    let k: number, t: number[], next: number;
    if (pur) {
      k = un([0.05, 0.25, 0.15, 0.02, 0.5]);
      // Un départ en centièmes qui fait souvent passer l'unité (0,95 + 0,05 = 1).
      const a = k === 0.02 ? arr(entre(0, 6) + entre(80, 92) / 100) : k === 0.5 ? arr(entre(0, 6) + un([0.25, 0.75, 0.35, 0.65])) : arr(entre(0, 6) + entre(1, 19) * 0.05);
      t = termes(a, k);
      next = arr(a + 4 * k);
    } else ({ k, t, next } = tirerSit(s, 1, true));
    const last = t[3];
    const cents = Math.round((last % 1) * 100) + Math.round((k % 1) * 100);
    const retenue = cents >= 100 ? arr(Math.floor(last) + Math.floor(k) + cents / 1000) : arr(next + 0.1);
    const faux = [arr(last + 10 * k), retenue, arr(next + 0.1), arr(last - k), arr(next + 0.01)];
    const u = pur ? "" : s.u;
    const text = pur ? un(QSUIVANT(suiteTxt(t), p)) : `${s.dit(p, liste(t, s.u))} ${un(s.q(p))}`;
    return {
      text,
      ...qN(next, faux, u),
      explanation: etapes("On calcule l'écart entre deux termes, en centièmes.", `On ajoute ${fr(k)} à chaque fois : ${fr(last)} + ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, u)}.`),
      canvas: frise([...t.map((v) => val(v, u)), "?"], { titre: pur ? "Des centièmes" : s.titre }),
    };
  }),

  // ★3 — le terme d'un rang éloigné (tableau rang → terme), jusqu'au rang 50.
  tpl(C, "c9_rang", 3, "Du rang 1 au rang N, on fait N − 1 sauts.", () => {
    const k = un([2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15]);
    const a = entre(1, 30);
    const n = un([10, 12, 15, 20, 25, 30, 40, 50, entre(11, 49)]);
    const t = termes(a, k);
    const juste = a + (n - 1) * k;
    const s = suiteTxt(t);
    const p = perso();
    const text = un([
      `Voici le début d'une suite : ${s}. Quel est son ${n}e terme ?`,
      `Dans la suite ${s}, quel nombre est au rang ${n} ?`,
      `On continue la suite ${s} avec la même règle. Quel nombre trouve-t-on à la ${n}e case ?`,
      `${p.nom} écrit la suite ${s} et continue avec la même règle. Quel sera son ${n}e nombre ?`,
      `Sans tout écrire, trouve le ${n}e terme de la suite ${s}.`,
      `Le tableau montre les premiers termes de la suite ${s}. Que vaut le terme du rang ${n} ?`,
    ]);
    return {
      text,
      ...qN(juste, [a + n * k, n * k, juste - k, t[3] + k, a * n]),
      explanation: etapes(`Du 1er terme au ${n}e, il y a ${n - 1} sauts de ${k}.`, `${a} + ${n - 1} × ${k} = ${a} + ${(n - 1) * k} = ${juste}.`, `Le ${n}e terme est ${fr(juste)}.`),
      canvas: tableauRang("Rang", "Terme", [1, 2, 3, 4, "…", n], [...t, "…", "?"], "Rang → terme"),
    };
  }),

  // ★3 — deux cases plus loin.
  tpl(C, "c10_deux_pas", 3, "Il faut faire deux sauts, pas un seul.", () => {
    const sens: 1 | -1 = Math.random() < 0.6 ? 1 : -1;
    const k = un([6, 7, 8, 9, 11, 12, 15, 19, 25, 125]);
    const a = sens === 1 ? entre(2, 90) : entre(5, 90) + 5 * k;
    const t = termes(a, sens * k);
    const juste = arr(t[3] + 2 * sens * k);
    const s = suiteTxt(t);
    const p = perso();
    const text = un([
      `Continue la suite : ${s} ; … ; ?. Quel nombre remplace le « ? » ?`,
      `Dans la suite ${s}, quel nombre viendra deux cases après ${fr(t[3])} ?`,
      `On écrit encore deux nombres après ${s}. Quel est le deuxième ?`,
      `${p.nom} continue la suite ${s} en écrivant deux nombres de plus. Quel est le dernier qu'${p.il} écrit ?`,
      `Quel est le 6e terme de la suite ${s} ?`,
    ]);
    return {
      text,
      ...qN(juste, [t[3] + sens * k, t[3] - 2 * sens * k, t[3] + 3 * sens * k, juste + 1, juste - 1]),
      explanation: etapes(`La règle est « ${sens === 1 ? "ajouter" : "enlever"} ${k} », et on la fait deux fois.`, `${fr(t[3])} ${signe(sens)} ${k} = ${fr(t[3] + sens * k)}, puis ${fr(t[3] + sens * k)} ${signe(sens)} ${k} = ${fr(juste)}.`, `Le nombre cherché est ${fr(juste)}.`),
      canvas: frise([...t, "…", "?"], { titre: "Deux cases plus loin" }),
    };
  }),

  // ★3 — ×3, moitié, ×10 et ÷10 avec des décimaux.
  tpl(C, "c11_fois_moitie", 3, "Compare chaque terme au précédent : combien de fois plus grand, ou plus petit ?", () => {
    const cas = un(["x3", "moitie", "x10dec", "div10"] as const);
    let t: number[];
    let juste: number;
    let calc: string;
    let faux: number[];
    if (cas === "x3") {
      const a = entre(1, 6);
      t = [a, 3 * a, 9 * a, 27 * a];
      juste = 81 * a;
      calc = `On multiplie par 3 : ${fr(t[3])} × 3 = ${fr(juste)}.`;
      faux = [t[3] + (t[3] - t[2]), t[3] * 2, t[3] + 3, t[3] * 4];
    } else if (cas === "moitie") {
      const fin = un([3, 5, 7, 9, 11, 15, 25]);
      t = [fin * 16, fin * 8, fin * 4, fin * 2];
      juste = fin;
      calc = `On prend la moitié, on divise par 2 : ${fr(t[3])} ÷ 2 = ${fr(juste)}.`;
      faux = [t[3] - (t[2] - t[3]) / 2 + 1, t[3] - 2, fin * 4, t[3] - fin / 2 + 0.5];
    } else if (cas === "x10dec") {
      const a = un([0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9]);
      t = [a, arr(a * 10), arr(a * 100), arr(a * 1000)];
      juste = arr(a * 10000);
      calc = `On multiplie par 10 : ${fr(t[3])} × 10 = ${fr(juste)}.`;
      faux = [t[3] + 10, arr(t[3] * 100), arr(t[3] + t[3] - t[2]), arr(t[3] * 2)];
    } else {
      const b = un([2, 3, 4, 5, 6, 7, 8, 9]);
      t = [b * 1000, b * 100, b * 10, b];
      juste = arr(b / 10);
      calc = `On divise par 10 : ${fr(t[3])} ÷ 10 = ${fr(juste)}.`;
      faux = [arr(b / 100), b * 10, b - 1, arr(b / 2)];
    }
    const s = suiteTxt(t);
    const p = perso();
    const text = un([
      `Continue la suite : ${s} ; ?`,
      `Quel est le terme suivant de la suite ${s} ?`,
      `${p.nom} écrit la suite ${s}. Quel nombre écrit-${p.il} ensuite ?`,
      `Les nombres ${s} suivent une règle. Quel est le suivant ?`,
      `Trouve le terme qui suit ${s}.`,
      `Dans le cahier de ${p.nom}, on lit ${s}. Quel nombre vient ensuite ?`,
      `${p.nom} continue la suite ${s} avec la même règle. Quel nombre écrit-${p.il} ?`,
    ]);
    return {
      text,
      ...qN(juste, faux),
      explanation: etapes("Les écarts changent : on compare chaque terme au précédent avec × ou ÷.", calc, `Le nombre suivant est ${fr(juste)}.`),
      canvas: frise([...t, "?"], { titre: "Multiplier ou diviser" }),
    };
  }),

  // ★3 — le motif d'un rang éloigné.
  tpl(C, "c12_motif_rang", 3, "Compte combien de motifs il y a dans le groupe qui se répète.", () => motifRang(tirerMotif(), 15, 60)),
];

/* ═════════════════════════ SUITE_REGLE ═════════════════════════ */

const R = "suite_regle";

const QREGLE = (s: string, p: Perso) => [
  `Quelle est la règle de la suite ${s} ?`,
  `Comment passe-t-on d'un nombre au suivant dans la suite ${s} ?`,
  `${p.nom} a écrit la suite ${s}. Quelle règle a-t-${p.il} utilisée ?`,
  `Observe la suite ${s}. Quelle est sa règle ?`,
  `Par quelle règle obtient-on la suite ${s} ?`,
  `Quelle règle permet d'écrire la suite ${s} ?`,
  `${p.nom} doit trouver la règle de la suite ${s}. Que doit-${p.il} répondre ?`,
  `Dans le cahier de ${p.nom}, on lit ${s}. Quelle règle a été suivie ?`,
  `La maîtresse écrit ${s} au tableau. Quelle règle a-t-elle suivie ?`,
  `Pour passer d'un terme au suivant dans ${s}, que fait-on ?`,
  `${p.nom} invente une suite : ${s}. Quelle est sa règle ?`,
];
const QREGLE_SIT = ["Quelle est la règle de cette suite ?", "Comment passe-t-on d'une valeur à la suivante ?", "Quelle règle suit ce relevé ?", "Quelle règle relie deux valeurs voisines ?"];

const ajout = (k: number, u = "") => `ajouter ${val(k, u)}`;
const retrait = (k: number, u = "") => `enlever ${val(k, u)}`;
const fois = (f: number) => `multiplier par ${fr(f)}`;
const divise = (f: number) => `diviser par ${fr(f)}`;

export const suiteRegleGabarits: TutorBankItemV4[] = [
  // ★2 — règle additive, nombres nus.
  tpl(R, "1_addition", 2, "Calcule l'écart : le nombre suivant moins le précédent.", () => {
    const k = un([6, 7, 8, 9, 11, 12, 15, 19, 25, 50, 100]);
    const a = entre(1, 150);
    const t = termes(a, k);
    const p = perso();
    return {
      text: un(QREGLE(suiteTxt(t), p)),
      ...qcm(ajout(k), [retrait(k), ajout(k + 1), ajout(k - 1), ajout(2 * k), fois(2)]),
      explanation: etapes("On calcule l'écart entre deux nombres voisins, et on vérifie partout.", `${fr(t[1])} − ${fr(t[0])} = ${k}, ${fr(t[2])} − ${fr(t[1])} = ${k}, ${fr(t[3])} − ${fr(t[2])} = ${k}.`, `La règle est : ajouter ${k}.`),
      canvas: frise(t, { titre: "Quelle est la règle ?" }),
    };
  }),

  // ★2 — règle soustractive (nombres nus ou situation qui descend).
  tpl(R, "2_soustraction", 2, "La suite descend : quelle quantité enlève-t-on ?", () => {
    if (Math.random() < 0.5) {
      const k = un([6, 7, 8, 9, 11, 12, 15, 25, 50]);
      const a = entre(2, 80) + 3 * k;
      const t = termes(a, -k);
      const p = perso();
      return {
        text: un(QREGLE(suiteTxt(t), p)),
        ...qcm(retrait(k), [ajout(k), retrait(k + 1), retrait(k - 1), retrait(2 * k)]),
        explanation: etapes("La suite diminue : on calcule ce qu'on enlève.", `${fr(t[0])} − ${fr(t[1])} = ${k}, et c'est pareil à chaque passage.`, `La règle est : enlever ${k}.`),
        canvas: frise(t, { titre: "Quelle est la règle ?" }),
      };
    }
    const s = un(SIT_MOINS);
    const p = perso(s.m);
    const { k, t } = tirerSit(s, -1);
    return {
      text: `${s.dit(p, liste(t, s.u))} ${un(QREGLE_SIT)}`,
      ...qcm(retrait(k, s.u), [ajout(k, s.u), retrait(k + (s.mult ?? 1), s.u), retrait(2 * k, s.u), ajout(2 * k, s.u)]),
      explanation: etapes("Les valeurs diminuent : on calcule ce qu'on enlève entre deux relevés.", `${fr(t[0])} − ${fr(t[1])} = ${fr(k)}, et c'est pareil à chaque passage.`, `La règle est : enlever ${val(k, s.u)}.`),
      canvas: frise(t.map((v) => val(v, s.u)), { titre: s.titre }),
    };
  }),

  // ★2 — règle d'une situation qui monte.
  tpl(R, "r3_situation_plus", 2, "Compare deux valeurs voisines.", () => {
    const s = un(SIT_PLUS);
    const p = perso(s.m);
    const { k, t } = tirerSit(s, 1);
    return {
      text: `${s.dit(p, liste(t, s.u))} ${un(QREGLE_SIT)}`,
      ...qcm(ajout(k, s.u), [retrait(k, s.u), ajout(t[1], s.u), ajout(2 * k, s.u), ajout(k + (s.mult ?? 1), s.u)]),
      explanation: etapes("On calcule l'écart entre deux valeurs voisines.", `${fr(t[1])} − ${fr(t[0])} = ${fr(k)}, et c'est pareil à chaque passage.`, `La règle est : ajouter ${val(k, s.u)}.`),
      canvas: frise(t.map((v) => val(v, s.u)), { titre: s.titre }),
    };
  }),

  // ★2 — le groupe de motifs qui se répète.
  tpl(R, "r4_motif_groupe", 2, "Cherche le plus petit groupe qui revient toujours dans le même ordre.", () => {
    const { s, p, patron, groupe, a } = tirerMotif(["AB", "ABC", "AAB", "ABB", "AABB", "ABCD"]);
    const objet = (c: string) => groupe[patron.indexOf(c)];
    const ecrire = (mot: string) => mot.split("").map((c) => objet(c).e).join(" ");
    const FAUX: Record<string, string[]> = {
      AB: ["ABB", "AAB", "ABA"],
      ABC: ["AB", "ACB", "ABCC"],
      AAB: ["AB", "ABB", "AABB"],
      ABB: ["AB", "AAB", "ABBB"],
      AABB: ["AB", "AAB", "ABB"],
      ABCD: ["ABC", "ABDC", "ABCDA"],
    };
    const n = Math.min(9, groupe.length * 2 + 1);
    const vus = Array.from({ length: n }, (_, i) => a(i).e);
    const pluriel = s.mot.endsWith("eau") ? `${s.mot}x` : `${s.mot}s`;
    const text = `${s.dit(p)} ${un(["Quel groupe de motifs se répète, depuis le début ?", "Quel est le groupe qui se répète dans cette frise ?", `Quelle suite de ${pluriel} revient sans cesse, depuis le début ?`, "Quelle est la règle de cette frise ?"])}`;
    return {
      text,
      ...qcm(ecrire(patron), FAUX[patron].map(ecrire)),
      explanation: etapes("On lit la frise depuis le début et on cherche quand elle recommence.", `La frise recommence après ${groupe.length} motifs : ${ecrire(patron)}.`, `Le groupe qui se répète est ${ecrire(patron)}.`),
      canvas: frise([...vus, "…"], { titre: s.titre, manquant: -1 }),
    };
  }),

  // ★3 — règle multiplicative.
  tpl(R, "3_multiplication", 3, "Les écarts grandissent ? Essaie une multiplication.", () => {
    const f = un([2, 2, 3, 4, 5, 10]);
    const a = f === 10 ? entre(1, 9) : f >= 4 ? entre(1, 4) : entre(1, 12);
    const t = [a, a * f, a * f * f, a * f ** 3];
    const p = perso();
    return {
      text: un(QREGLE(suiteTxt(t), p)),
      ...qcm(fois(f), [ajout(t[1] - t[0]), ajout(f), fois(f + 1), ajout(t[2] - t[1])]),
      explanation: etapes("Les écarts ne sont pas égaux : on vérifie si on multiplie toujours par le même nombre.", `${fr(a)} × ${f} = ${fr(t[1])}, ${fr(t[1])} × ${f} = ${fr(t[2])}, ${fr(t[2])} × ${f} = ${fr(t[3])}.`, `La règle est : multiplier par ${f}.`),
      canvas: frise(t, { titre: "Quelle est la règle ?" }),
    };
  }),

  // ★3 — règle de division (÷2, ÷10).
  tpl(R, "r5_division", 3, "La suite descend de moins en moins vite ? Essaie une division.", () => {
    const f = un([2, 2, 10]);
    const fin = f === 10 ? un([2, 3, 4, 5, 6, 7, 8, 9]) : un([3, 5, 7, 9, 11, 13, 15, 25]);
    const t = [fin * f ** 3, fin * f ** 2, fin * f, fin];
    const p = perso();
    const s = suiteTxt(t);
    const text = Math.random() < 0.3 ? un([`Sur un écran, un nombre devient ${s}, seconde après seconde. Quelle est la règle ?`, `${p.nom} partage ses billes en deux encore et encore : ${s}. Quelle règle suit-${p.il} ?`].slice(0, f === 2 ? 2 : 1)) : un(QREGLE(s, p));
    return {
      text,
      ...qcm(divise(f), [retrait(t[0] - t[1]), divise(f * 2), retrait(f), fois(f)]),
      explanation: etapes("Les écarts ne sont pas égaux : on vérifie si on divise toujours par le même nombre.", `${fr(t[0])} ÷ ${f} = ${fr(t[1])}, ${fr(t[1])} ÷ ${f} = ${fr(t[2])}, ${fr(t[2])} ÷ ${f} = ${fr(t[3])}.`, `La règle est : diviser par ${f}.`),
      canvas: frise(t, { titre: "Quelle est la règle ?" }),
    };
  }),

  // ★3 — règle décimale (dixièmes), dans les deux sens.
  tpl(R, "4_decimal", 3, "Calcule l'écart en dixièmes.", () => {
    const k = un([0.1, 0.2, 0.3, 0.4, 0.5, 1.5, 2.5]);
    const sens: 1 | -1 = Math.random() < 0.65 ? 1 : -1;
    const a = k < 1 ? arr(entre(1, 8) + entre(0, 9) / 10) : arr(entre(1, 9) + un([0, 0.5]));
    const t = termes(sens === 1 ? a : arr(a + 3 * k), sens * k);
    const p = perso();
    const juste = sens === 1 ? ajout(k) : retrait(k);
    const faux = sens === 1 ? [ajout(arr(k * 10)), ajout(arr(k / 10)), retrait(k), ajout(1)] : [retrait(arr(k * 10)), retrait(arr(k / 10)), ajout(k), retrait(1)];
    return {
      text: un(QREGLE(suiteTxt(t), p)),
      ...qcm(juste, faux),
      explanation: etapes("On calcule l'écart entre deux nombres voisins.", sens === 1 ? `${fr(t[1])} − ${fr(t[0])} = ${fr(k)}.` : `${fr(t[0])} − ${fr(t[1])} = ${fr(k)}.`, `La règle est : ${juste}.`),
      canvas: frise(t, { titre: "Quelle est la règle ?" }),
    };
  }),

  // ★3 — la règle lue dans un tableau rang → terme.
  tpl(R, "r8_tableau", 3, "Compare deux colonnes voisines du tableau.", () => {
    const op = un(["+", "-", "×", "÷"] as const);
    const k = op === "×" ? un([2, 3]) : op === "÷" ? 2 : un([7, 8, 9, 11, 12, 15, 25]);
    const a = op === "×" ? entre(1, 6) : op === "÷" ? un([3, 5, 7, 9, 11]) * 8 : op === "+" ? entre(1, 40) : entre(5, 40) + 3 * k;
    const t = op === "×" ? [a, a * k, a * k * k, a * k ** 3] : op === "÷" ? [a, a / 2, a / 4, a / 8] : termes(a, op === "+" ? k : -k);
    const juste = op === "×" ? fois(k) : op === "÷" ? divise(2) : op === "+" ? ajout(k) : retrait(k);
    const faux =
      op === "×" ? [ajout(t[1] - t[0]), ajout(k), fois(k + 1)] : op === "÷" ? [retrait(t[0] - t[1]), retrait(2), divise(4)] : op === "+" ? [retrait(k), ajout(k + 1), fois(2), ajout(t[0])] : [ajout(k), retrait(k - 1), retrait(2 * k)];
    const s = suiteTxt(t);
    const text = un([
      `Le tableau donne les premiers termes d'une suite : ${s}. Quelle est sa règle ?`,
      `Dans ce tableau, les termes des rangs 1 à 4 sont ${s}. Quelle règle permet de passer d'un terme au suivant ?`,
      `D'un rang au suivant, que fait-on aux termes ${s} de ce tableau ?`,
      `${perso().nom} a rempli ce tableau avec les termes ${s}. Quelle règle a servi ?`,
      `${perso().nom} lit le tableau : ${s}. Comment passe-t-on d'une colonne à la suivante ?`,
    ]);
    return {
      text,
      ...qcm(juste, faux),
      explanation: etapes("On compare chaque terme au suivant.", op === "×" || op === "÷" ? `${fr(t[0])} ${op} ${k} = ${fr(t[1])}, ${fr(t[1])} ${op} ${k} = ${fr(t[2])}.` : `L'écart est ${k} à chaque colonne, la suite ${op === "+" ? "monte" : "descend"}.`, `La règle est : ${juste}.`),
      canvas: tableauRang("Rang", "Terme", [1, 2, 3, 4], t),
    };
  }),

  // ★4 — vérifier une règle annoncée.
  tpl(R, "5_piege_ecarts_variables", 4, "Une règle doit marcher à CHAQUE passage.", () => {
    const k = un([3, 4, 6, 7, 8, 9, 12, 15]);
    const a = entre(2, 60);
    const cas = un(["oui", "debut", "sens", "fois"] as const);
    const t =
      cas === "oui" ? termes(a, k) : cas === "debut" ? [a, a + k, a + 2 * k + 1, a + 3 * k + 3] : cas === "sens" ? termes(a + 3 * k, -k) : [k, 2 * k, 4 * k, 8 * k];
    const p = perso();
    const s = suiteTxt(t);
    const OUI = "Oui, à chaque passage";
    const DEBUT = "Non, ça ne marche qu'au début";
    const SENS = `Non, on enlève ${k}`;
    const FOIS = "Non, on multiplie par 2";
    const juste = cas === "oui" ? OUI : cas === "debut" ? DEBUT : cas === "sens" ? SENS : FOIS;
    const text = un([
      `${p.nom} affirme : « Dans la suite ${s}, on ajoute toujours ${k}. » A-t-${p.il} raison ?`,
      `D'après ${p.nom}, la règle de la suite ${s} est « ajouter ${k} ». Est-ce vrai ?`,
      `La suite ${s} suit-elle la règle « ajouter ${k} » ?`,
      `Un élève lit la suite ${s} et dit : « la règle est ajouter ${k} ». Que penses-tu de sa réponse ?`,
      `${p.nom} écrit au tableau : « ${s} : on ajoute ${k} à chaque fois. » Est-ce juste ?`,
      `Pour ${p.nom}, la suite ${s} se fabrique en ajoutant ${k}. A-t-${p.il} raison ?`,
    ]);
    const calc =
      cas === "oui"
        ? `${fr(t[1])} − ${fr(t[0])} = ${k}, ${fr(t[2])} − ${fr(t[1])} = ${k}, ${fr(t[3])} − ${fr(t[2])} = ${k}.`
        : cas === "debut"
          ? `${fr(t[1])} − ${fr(t[0])} = ${k}, mais ${fr(t[2])} − ${fr(t[1])} = ${k + 1}.`
          : cas === "sens"
            ? `La suite descend : ${fr(t[0])} − ${fr(t[1])} = ${k}, on enlève ${k}.`
            : `${fr(t[1])} − ${fr(t[0])} = ${k}, mais ${fr(t[2])} − ${fr(t[1])} = ${2 * k} : chaque terme est le double du précédent.`;
    return {
      text,
      ...qcm(juste, [OUI, DEBUT, SENS, FOIS].filter((x) => x !== juste).sort(() => Math.random() - 0.5).slice(0, 3)),
      explanation: etapes("On vérifie chaque passage entre deux nombres voisins.", calc, `Réponse : ${juste}.`),
      canvas: frise(t, { titre: "Vérifier une règle" }),
    };
  }),

  // ★4 — règle décimale en centièmes.
  tpl(R, "r6_centiemes", 4, "Écris les nombres avec deux chiffres après la virgule pour comparer.", () => {
    const k = un([0.05, 0.25, 0.15, 0.02, 0.75]);
    const sens: 1 | -1 = Math.random() < 0.65 ? 1 : -1;
    const a = arr(entre(1, 6) + entre(0, 19) * 0.05);
    const t = termes(sens === 1 ? a : arr(a + 3 * k), sens * k);
    const p = perso();
    const juste = sens === 1 ? ajout(k) : retrait(k);
    const op = sens === 1 ? ajout : retrait;
    const faux = [op(arr(k * 10)), sens === 1 ? retrait(k) : ajout(k), op(arr(k + 0.1)), op(arr(k / 5 >= 0.01 ? k * 2 : k + 0.01))];
    const sit = un([
      ...QREGLE(suiteTxt(t), p),
      `Chez le marchand, le prix d'un article passe à ${suiteU(t, "€")}. Quelle est la règle ?`,
      `${p.nom} relève la hauteur d'eau d'un bassin : ${suiteU(t, "m")}. Quelle est la règle ?`,
    ]);
    return {
      text: sit,
      ...qcm(sit.includes("€") ? (sens === 1 ? ajout(k, "€") : retrait(k, "€")) : sit.includes("hauteur") ? (sens === 1 ? ajout(k, "m") : retrait(k, "m")) : juste, faux.map((f) => (sit.includes("€") ? `${f} €` : sit.includes("hauteur") ? `${f} m` : f))),
      explanation: etapes("On calcule l'écart entre deux nombres voisins, en centièmes.", sens === 1 ? `${fr(t[1])} − ${fr(t[0])} = ${fr(k)}.` : `${fr(t[0])} − ${fr(t[1])} = ${fr(k)}.`, `La règle est : ${juste}.`),
      canvas: frise(t.map((v) => (sit.includes("€") ? val(v, "€") : v)), { titre: "Quelle est la règle ?" }),
    };
  }),

  // ★4 — la règle avec des cases effacées : l'écart sur deux cases.
  tpl(R, "r9_cases_effacees", 4, "Entre deux nombres connus, il y a parfois DEUX sauts.", () => {
    const k = un([3, 4, 5, 6, 7, 8, 9, 12, 15, 25]);
    const a = entre(1, 60);
    const t = termes(a, k, 5);
    const vus: (number | string)[] = [t[0], "?", t[2], "?", t[4]];
    const s = suiteTxt(vus);
    const p = perso();
    const text = un([
      `Dans la suite ${s}, on ajoute toujours le même nombre. Lequel ?`,
      `${p.nom} a effacé deux cases de sa suite : ${s}. Quelle était la règle ?`,
      `Quelle règle donne la suite ${s} ?`,
      `On passe d'une case à la suivante en ajoutant toujours le même nombre : ${s}. Quelle est la règle ?`,
      `Sur la feuille de ${p.nom}, deux nombres sont cachés : ${s}. On ajoute toujours le même nombre. Lequel ?`,
      `${p.nom} a renversé de l'encre sur sa suite ${s}. Quelle règle avait-${p.il} choisie, sachant qu'${p.il} ajoutait toujours le même nombre ?`,
    ]);
    return {
      text,
      ...qcm(ajout(k), [ajout(2 * k), ajout(k + 1), fois(2), ajout(k * 4)]),
      explanation: etapes("Entre deux nombres connus, il y a deux sauts égaux.", `${fr(t[2])} − ${fr(t[0])} = ${2 * k}, et ${2 * k} ÷ 2 = ${k}.`, `La règle est : ajouter ${k}.`),
      canvas: frise(vus, { titre: "Des cases effacées", manquant: -1 }),
    };
  }),

  // ★4 — du rang au terme : terme = rang × k + b.
  tpl(R, "r10_rang_formule", 4, "Compare chaque terme à son rang : regarde la table de multiplication de l'écart.", () => {
    const k = un([2, 3, 4, 5, 6, 7, 8, 9, 10]);
    const b = un([0, 1, 2, 3, 4, 5]);
    const t = [1, 2, 3, 4].map((r) => r * k + b);
    const juste = b === 0 ? `multiplier le rang par ${k}` : `multiplier le rang par ${k}, puis ajouter ${b}`;
    const faux = [
      `ajouter ${k} au rang`,
      b === 0 ? `multiplier le rang par ${k}, puis ajouter ${k}` : `multiplier le rang par ${k}`,
      `multiplier le rang par ${k + b}`,
      `multiplier le rang par ${t[0]}`,
      b === 0 ? `ajouter ${k - 1} au rang` : `multiplier le rang par ${b}, puis ajouter ${k}`,
    ];
    const p = perso();
    const text = un([
      `Voici une suite rangée dans un tableau. Comment calcule-t-on un terme à partir de son rang ?`,
      `${p.nom} veut trouver n'importe quel terme de cette suite sans tout écrire. Quel calcul doit-${p.il} faire avec le rang ?`,
      `Dans ce tableau, quel calcul transforme le rang en terme ?`,
      `Pour trouver le terme d'un rang, que fait-on au rang dans cette suite ?`,
      `${p.nom} remarque qu'on peut calculer chaque terme avec son rang. Quel calcul a-t-${p.il} trouvé ?`,
      `Dans le tableau de ${p.nom}, quel calcul permet de passer du rang au terme ?`,
    ]);
    return {
      text,
      ...qcm(juste, faux),
      explanation: etapes(`L'écart est ${k} : on pense à la table de ${k}.`, `Rang 1 : 1 × ${k}${b ? ` + ${b}` : ""} = ${t[0]} ; rang 4 : 4 × ${k}${b ? ` + ${b}` : ""} = ${t[3]}.`, `On doit ${juste}.`),
      canvas: tableauRang("Rang", "Terme", [1, 2, 3, 4], t, "Rang → terme"),
    };
  }),

  // ★4 — quelle suite suit cette règle ?
  tpl(R, "r11_quelle_suite", 4, "Applique la règle au premier nombre, puis au suivant.", () => {
    const cas = un(["fois2", "plus", "moitie", "dec"] as const);
    const a = entre(2, 12);
    const k = un([3, 4, 5, 6]);
    let regle: string;
    let juste: number[];
    let faux: number[][];
    if (cas === "fois2") {
      regle = "multiplier par 2";
      juste = [a, 2 * a, 4 * a, 8 * a];
      faux = [[a, 2 * a, 3 * a, 4 * a], [a, a + 2, a + 4, a + 6], [a, 2 * a, 4 * a, 6 * a]];
    } else if (cas === "plus") {
      regle = `ajouter ${k}`;
      juste = termes(a, k);
      faux = [[a, a * k, a * k * k, a * k ** 3], termes(a, k + 1), [a, a + k, a + 2 * k, a + 4 * k]];
    } else if (cas === "moitie") {
      regle = "diviser par 2";
      juste = [a * 8, a * 4, a * 2, a];
      faux = [[a * 8, a * 8 - 2, a * 8 - 4, a * 8 - 6], [a * 8, a * 6, a * 4, a * 2], [a * 8, a * 4, a * 2, a * 2]];
    } else {
      regle = "ajouter 0,5";
      const d = arr(a + 0.5);
      juste = termes(d, 0.5);
      faux = [termes(d, 5), [d, arr(d + 0.5), arr(d + 1.5), arr(d + 2)], termes(d, 0.05)];
    }
    const p = perso();
    const text = un([
      `Quelle suite suit la règle « ${regle} » ?`,
      `${p.nom} doit écrire une suite avec la règle « ${regle} ». Quelle suite est juste ?`,
      `La règle est « ${regle} ». Laquelle de ces suites la respecte à chaque passage ?`,
      `Trouve la suite fabriquée avec la règle « ${regle} ».`,
    ]);
    return {
      text,
      ...qcm(suiteTxt(juste), faux.map(suiteTxt)),
      explanation: etapes("On applique la règle à chaque terme, du premier au dernier.", `${suiteTxt(juste)} : on fait « ${regle} » à chaque passage.`, `La bonne suite est ${suiteTxt(juste)}.`),
      canvas: frise([juste[0], "?", "?", "?"], { titre: `Règle : ${regle}`, manquant: -1 }),
    };
  }),
];

/* ═════════════════════════ SUITE_CROISSANTE_DECROISSANTE ═════════════════════════ */

const K = "suite_croissante_decroissante";
const CR = "croissante";
const DE = "décroissante";
const NI = "ni l’une ni l’autre";
const sens3 = (juste: string) => ({ format: "qcm" as const, comparator: "mcq_exact" as const, choices: [CR, DE, NI].sort(() => Math.random() - 0.5), expected: [juste] });

const QSENS = (s: string, p: Perso) => [
  `La suite ${s} est-elle croissante ou décroissante ?`,
  `Observe la suite ${s}. Est-elle croissante, décroissante, ou ni l’une ni l’autre ?`,
  `${p.nom} écrit la suite ${s}. Sa suite est-elle croissante ou décroissante ?`,
  `Comment est la suite ${s} : croissante ou décroissante ?`,
  `Les nombres ${s} forment-ils une suite croissante ou décroissante ?`,
  `Au tableau, la maîtresse écrit ${s}. Cette suite est-elle croissante ou décroissante ?`,
  `${p.nom} a rangé les nombres ${s} dans cet ordre. Forment-ils une suite croissante ou décroissante ?`,
  `Dans son carnet, ${p.nom} note ${s}. Comment est cette suite ?`,
  `Regarde bien chaque passage de la suite ${s}. Est-elle croissante ou décroissante ?`,
  `Quel mot décrit la suite ${s} ?`,
];

const motSens = (j: string) => (j === CR ? "Chaque nombre est plus grand que le précédent : la suite monte." : j === DE ? "Chaque nombre est plus petit que le précédent : la suite descend." : "La suite ne monte pas à chaque passage, et ne descend pas à chaque passage.");

/** Des grandeurs dont le SENS se devine (une bougie fond, une plante pousse). */
type Gr = { txt: string; monte: boolean; u: string; pas: number[]; min: number; max: number; mult: number };
const GR = (txt: string, monte: boolean, u: string, pas: number[], min: number, max: number, mult = 1): Gr => ({ txt, monte, u, pas, min, max, mult });
const GRANDEURS: Gr[] = [
  GR("Une bougie allumée fond : on mesure sa hauteur toutes les heures.", false, "cm", [1, 2], 2, 8),
  GR("Une plante pousse : on mesure sa hauteur chaque semaine.", true, "cm", [2, 3, 4], 2, 12),
  GR("Un glaçon fond au soleil : on le pèse toutes les minutes.", false, "g", [2, 3, 5], 4, 20),
  GR("Une tirelire se remplit : on compte son argent chaque mois.", true, "€", [5, 10], 5, 40, 5),
  GR("La batterie d'un téléphone se vide : on relève son niveau chaque heure.", false, "%", [10, 15], 10, 40, 5),
  GR("Un bébé grandit : la sage-femme le mesure chaque mois.", true, "cm", [2, 3], 50, 56),
  GR("Une baignoire se vide : on relève la quantité d'eau chaque minute.", false, "L", [10, 20], 20, 60, 10),
  GR("Un avion se pose : la pilote relève son altitude chaque minute.", false, "m", [100, 200, 250], 200, 800, 100),
  GR("Un train démarre : le conducteur relève la distance parcourue chaque minute.", true, "m", [300, 400, 500], 300, 900, 100),
  GR("Le soleil se couche : on relève la température chaque heure.", false, "°C", [1, 2], 12, 20),
  GR("Une file d'attente avance au guichet : on compte les personnes devant nous chaque minute.", false, "", [1, 2], 2, 8),
  GR("Une potière remplit un four de bols : elle compte les bols posés après chaque étagère.", true, "", [6, 8, 10], 6, 20),
  GR("Un coureur s'éloigne de la ligne de départ : son entraîneuse note la distance chaque minute.", true, "m", [150, 200, 250], 150, 300, 50),
  GR("Un gâteau se mange part après part : on compte les parts qui restent.", false, "", [1, 2], 1, 4),
  GR("Un camion-citerne remplit une cuve : on relève la quantité d'eau dans la cuve chaque minute.", true, "L", [50, 100], 100, 500, 50),
  GR("Une plongeuse remonte vers la surface : elle lit sa profondeur chaque minute.", false, "m", [3, 4, 5], 2, 10),
];

export const suiteCroissanteGabarits: TutorBankItemV4[] = [
  // ★1 — nombres nus qui montent ou descendent.
  tpl(K, "1", 1, "Regarde si les nombres montent ou descendent.", () => {
    const sens: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
    const k = un([2, 5, 9, 10, 25, 100, 1000]);
    const a = (k >= 100 ? tire(k, 30 * k, k) : entre(1, 200)) + (sens === -1 ? 3 * k : 0);
    const t = termes(a, sens * k);
    const juste = sens === 1 ? CR : DE;
    return {
      text: un(QSENS(suiteTxt(t), perso())),
      ...sens3(juste),
      explanation: etapes("On compare chaque nombre au précédent.", motSens(juste), `La suite est ${juste}.`),
      canvas: frise(t, { titre: "Monte ou descend ?" }),
    };
  }),

  // ★1 — une situation de la vie.
  tpl(K, "k2_situation", 1, "Les valeurs augmentent ou diminuent ?", () => {
    const monte = Math.random() < 0.5;
    const s = un(monte ? SIT_PLUS : SIT_MOINS);
    const p = perso(s.m);
    const { t } = tirerSit(s, monte ? 1 : -1);
    const juste = monte ? CR : DE;
    const q = un(["Cette suite est-elle croissante ou décroissante ?", "Ces valeurs forment-elles une suite croissante ou décroissante ?", "La suite de ces valeurs est-elle croissante ou décroissante ?"]);
    return {
      text: `${s.dit(p, liste(t, s.u))} ${q}`,
      ...sens3(juste),
      explanation: etapes("On compare chaque valeur à la précédente.", monte ? "Les valeurs augmentent à chaque fois." : "Les valeurs diminuent à chaque fois.", `La suite est ${juste}.`),
      canvas: frise(t.map((v) => val(v, s.u)), { titre: s.titre }),
    };
  }),

  // ★2 — les pièges : constante, en zigzag, ou qui monte avec des écarts différents.
  tpl(K, "2_constante", 2, "Vérifie TOUS les passages, pas seulement le premier et le dernier.", () => {
    const cas = un(["constante", "zigzag", "zigzag", "irreguliere_monte", "irreguliere_descend"] as const);
    const a = entre(3, 90);
    let t: number[];
    if (cas === "constante") t = [a, a, a, a];
    else if (cas === "zigzag") {
      const b = a + entre(3, 9);
      const c = b - entre(1, 2);
      t = Math.random() < 0.5 ? [a, b, c, c + entre(3, 8)] : [c + 10, a + 5, a + 8, a];
    } else if (cas === "irreguliere_monte") t = [a, a + 1, a + 4, a + 9];
    else t = [a + 15, a + 9, a + 4, a];
    const juste = cas === "irreguliere_monte" ? CR : cas === "irreguliere_descend" ? DE : NI;
    const calc =
      cas === "constante"
        ? "Tous les nombres sont égaux : la suite ne monte pas et ne descend pas."
        : cas === "zigzag"
          ? "La suite monte à un passage et descend à un autre."
          : `Les écarts ne sont pas égaux, mais la suite ${juste === CR ? "monte" : "descend"} à CHAQUE passage.`;
    return {
      text: un(QSENS(suiteTxt(t), perso())),
      ...sens3(juste),
      explanation: etapes("On compare chaque nombre au précédent, sans en sauter.", calc, juste === NI ? "Elle n'est ni croissante ni décroissante." : `La suite est ${juste}.`),
      canvas: frise(t, { titre: "Vérifie chaque passage" }),
    };
  }),

  // ★2 — laquelle de ces suites ?
  tpl(K, "k4_laquelle", 2, "Lis chaque suite en entier.", () => {
    const cherche = un([CR, DE]);
    const a = entre(2, 90);
    const k = un([3, 4, 5, 7, 9, 10, 12]);
    const monte = termes(a, k);
    const descend = termes(a + 3 * k, -k);
    const presque = cherche === CR ? [a, a + k, a + 2 * k, a + k + 1] : [a + 3 * k, a + 2 * k, a + k, a + 2 * k - 1];
    const plat = [a + k, a + k, a + k, a + k];
    const juste = suiteTxt(cherche === CR ? monte : descend);
    const p = perso();
    const text = un([
      `Laquelle de ces suites est ${cherche} ?`,
      `${p.nom} cherche une suite ${cherche}. Laquelle choisir ?`,
      `Quelle suite est ${cherche} ?`,
      `Parmi ces suites, une seule est ${cherche}. Laquelle ?`,
      `${p.nom} doit entourer la suite ${cherche}. Laquelle doit-${p.il} entourer ?`,
      `Trouve la suite qui est ${cherche} à chaque passage.`,
    ]);
    return {
      text,
      ...qcm(juste, [suiteTxt(cherche === CR ? descend : monte), suiteTxt(presque), suiteTxt(plat)]),
      explanation: etapes(`Une suite ${cherche} ${cherche === CR ? "monte" : "descend"} à chaque passage.`, `${juste} : ${cherche === CR ? "chaque nombre est plus grand" : "chaque nombre est plus petit"} que le précédent. L'autre suite qui commence bien change de sens à la fin.`, `La bonne suite est ${juste}.`),
    };
  }),

  // ★2 — décimaux : dixièmes et centièmes mélangés (le piège de la longueur du nombre).
  tpl(K, "k5_decimaux", 2, "Compare les décimaux chiffre à chiffre, en commençant par les dixièmes.", () => {
    const sens: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
    const b = entre(1, 19);
    const d = entre(1, 6);
    const pas = un([0.05, 0.1, 0.2, 0.25]);
    const base = arr(b + d / 10);
    const t = sens === 1 ? termes(base, pas) : termes(arr(base + 3 * pas), -pas);
    const juste = sens === 1 ? CR : DE;
    return {
      text: un(QSENS(suiteTxt(t), perso())),
      ...sens3(juste),
      explanation: etapes("On compare les parties entières, puis les dixièmes, puis les centièmes.", `${fr(t[0])} ${sens === 1 ? "<" : ">"} ${fr(t[1])} ${sens === 1 ? "<" : ">"} ${fr(t[2])} ${sens === 1 ? "<" : ">"} ${fr(t[3])}.`, `La suite est ${juste}.`),
      canvas: frise(t, { titre: "Des nombres décimaux" }),
    };
  }),

  // ★2 — grands nombres aux mêmes chiffres.
  tpl(K, "k6_grands_nombres", 2, "Compare les grands nombres classe par classe, en partant de la gauche.", () => {
    const tete = entre(10, 98);
    const vus = new Set<number>();
    while (vus.size < 4) vus.add(tete * 1000 + entre(0, 999));
    const tri = [...vus].sort((x, y) => x - y);
    const cas = un(["monte", "descend", "zigzag"] as const);
    const t = cas === "monte" ? tri : cas === "descend" ? [...tri].reverse() : [tri[0], tri[2], tri[1], tri[3]];
    const juste = cas === "monte" ? CR : cas === "descend" ? DE : NI;
    return {
      text: un(QSENS(suiteTxt(t), perso())),
      ...sens3(juste),
      explanation: etapes("Les milliers sont les mêmes : on compare les centaines, puis les dizaines, puis les unités.", cas === "zigzag" ? `${fr(t[1])} > ${fr(t[2])} : la suite redescend à un passage.` : motSens(juste), juste === NI ? "Elle n'est ni croissante ni décroissante." : `La suite est ${juste}.`),
      canvas: frise(t, { titre: "Des grands nombres" }),
    };
  }),

  // ★3 — quel nombre mettre à la place du « ? » pour garder le sens ?
  tpl(K, "3_piege_monte_descend", 3, "Le nombre caché doit être entre ses deux voisins.", () => {
    const cherche = un([CR, DE]);
    const a = entre(5, 300);
    const e1 = entre(2, 9);
    const e2 = entre(3, 9);
    const b = a + e1;
    const c = b + e2;
    const d = c + entre(2, 9);
    const juste = b + entre(1, e2 - 1);
    const t: (number | string)[] = cherche === CR ? [a, b, "?", c, d] : [d, c, "?", b, a];
    const faux = [b - 1, c + 1, a, d + 2, c + e2];
    const p = perso();
    const s = suiteTxt(t);
    const text = un([
      `Quel nombre peut remplacer le « ? » pour que la suite ${s} soit ${cherche} ?`,
      `${p.nom} veut que sa suite ${s} soit ${cherche}. Quel nombre doit-${p.il} écrire à la place du « ? » ?`,
      `La suite ${s} est ${cherche}. Quel nombre peut se cacher sous le « ? » ?`,
      `${p.nom} a effacé un nombre de sa suite ${cherche} : ${s}. Quel nombre pouvait être écrit ?`,
      `Complète la suite ${s} pour qu'elle reste ${cherche}.`,
    ]);
    return {
      text,
      ...qN(juste, faux.filter((f) => f <= b || f >= c)),
      explanation: etapes(`Le nombre caché doit être entre ${b} et ${c}.`, `${b} < ${juste} < ${c}. Les autres nombres font ${cherche === CR ? "descendre" : "monter"} la suite à un passage.`, `On peut écrire ${juste}.`),
      canvas: frise(t, { titre: `Garder une suite ${cherche}` }),
    };
  }),

  // ★3 — décimaux : le nombre le plus long n'est pas le plus grand.
  tpl(K, "4_decimal", 3, "2,45 est plus petit que 2,5 : compare d'abord les dixièmes.", () => {
    const b = entre(1, 12);
    const d = entre(1, 7);
    const base = arr(b + d / 10);
    const t0 = [base, arr(base + 0.05), arr(base + 0.1), arr(base + 0.15)];
    const cas = un(["monte", "descend", "zigzag"] as const);
    const t = cas === "monte" ? t0 : cas === "descend" ? [...t0].reverse() : [t0[0], t0[2], t0[1], t0[3]];
    const juste = cas === "monte" ? CR : cas === "descend" ? DE : NI;
    const p = perso();
    const sit = un([
      ...QSENS(suiteTxt(t), p),
      `${p.nom} relève ses temps au 50 m nage libre, en minutes : ${suiteTxt(t)}. Cette suite est-elle croissante ou décroissante ?`,
      `Au marché, le prix du kilo de pommes est ${t.map((x) => val(x, "€")).join(" ; ")}, mois après mois. Cette suite est-elle croissante ou décroissante ?`,
    ]);
    return {
      text: sit,
      ...sens3(juste),
      explanation: etapes("On écrit chaque nombre avec deux chiffres après la virgule : 2,5 = 2,50.", cas === "zigzag" ? `${fr(t[1])} > ${fr(t[2])} : la suite redescend à un passage.` : `${t.map((x) => x.toFixed(2).replace(".", ",")).join(cas === "monte" ? " < " : " > ")}.`, juste === NI ? "Elle n'est ni croissante ni décroissante." : `La suite est ${juste}.`),
      canvas: frise(t, { titre: "Dixièmes et centièmes" }),
    };
  }),

  // ★3 — quelle liste peut décrire la situation ? (le sens se devine au réel)
  tpl(K, "k7_situation_liste", 3, "Demande-toi d'abord : dans la vraie vie, ça monte ou ça descend ?", () => {
    const g = un(GRANDEURS);
    const k = un(g.pas);
    const a = tire(g.min, g.max, g.mult);
    const t = g.monte ? termes(a, k) : termes(a + 3 * k, -k);
    const inverse = [...t].reverse();
    const zig = [t[0], t[2], t[1], t[3]];
    const plat = [t[1], t[1], t[1], t[1]];
    const L = (l: number[]) => suiteU(l, g.u);
    const q = un(["Quelle liste peut être ce relevé ?", "Laquelle de ces listes est possible ?", "Quels relevés peut-on obtenir ?"]);
    const sens = g.monte ? CR : DE;
    return {
      text: `${g.txt} ${q}`,
      ...qcm(L(t), [L(inverse), L(zig), L(plat)]),
      explanation: etapes(`${g.monte ? "Ça augmente" : "Ça diminue"} à chaque relevé : la suite est ${sens}.`, `${L(t)} ${g.monte ? "monte" : "descend"} à chaque passage.`, `La bonne liste est ${L(t)}.`),
    };
  }),

  // ★3 — d'après la règle, sans écrire la suite.
  tpl(K, "k8_regle", 3, "Pense à ce que la règle fait au nombre.", () => {
    const cas = un(["plus", "moins", "fois", "moitie", "zero", "dec"] as const);
    const a = entre(5, 60);
    const k = un([3, 4, 5, 6, 7, 8, 9, 12, 15]);
    const regle = cas === "plus" ? `on ajoute ${k}` : cas === "moins" ? `on enlève ${k}` : cas === "fois" ? "on multiplie par 2" : cas === "moitie" ? "on divise par 2" : cas === "zero" ? "on ajoute 0" : "on enlève 0,5";
    const juste = cas === "moins" || cas === "moitie" || cas === "dec" ? DE : cas === "zero" ? NI : CR;
    const depart = cas === "moins" ? a + 10 * k : cas === "moitie" ? a * 8 : a;
    const t =
      cas === "fois" ? [depart, depart * 2, depart * 4] : cas === "moitie" ? [depart, depart / 2, depart / 4] : termes(depart, cas === "plus" ? k : cas === "moins" ? -k : cas === "dec" ? -0.5 : 0, 3);
    const p = perso();
    const regleIl = regle.replace(/^on /, `${p.il} `);
    const text = un([
      `${p.nom} part de ${fr(depart)} et, à chaque étape, ${regleIl}. Sa suite est-elle croissante ou décroissante ?`,
      `Une suite commence à ${fr(depart)}. À chaque étape, ${regle}. Comment est cette suite ?`,
      `On part de ${fr(depart)} et ${regle} à chaque fois. La suite obtenue est-elle croissante ou décroissante ?`,
      `Pour fabriquer une suite, ${p.nom} écrit ${fr(depart)}, puis ${regleIl} encore et encore. Comment sera sa suite ?`,
      `Règle du jeu : on commence à ${fr(depart)} et, à chaque tour, ${regle}. Les nombres obtenus forment-ils une suite croissante ou décroissante ?`,
    ]);
    return {
      text,
      ...sens3(juste),
      explanation: etapes("On imagine les premiers termes.", `${suiteTxt(t)} …`, juste === NI ? "Les nombres ne changent pas : ni l'une ni l'autre." : `La suite est ${juste}.`),
      canvas: frise([depart, "?", "?", "…"], { titre: "D'après la règle", manquant: -1 }),
    };
  }),
];

/* ═════════════════════════ SUITE_DEFI ═════════════════════════ */

const D = "suite_defi";

/** Une suite qui monte, racontée au rang 1, 2, 3… */
type SitRang = { titre: string; m?: readonly [string, string]; coin: string; ligne: string; u: string; dit: (p: Perso, a: number, k: number) => string; q: (p: Perso, n: number) => string; pas: number[]; min: number; max: number };
const SITS_RANG: SitRang[] = [
  { titre: "La lecture", coin: "Jour", ligne: "Pages", u: "pages", dit: (p, a, k) => `Le 1er jour, ${p.nom} lit ${a} pages. Chaque jour, ${p.il} lit ${k} pages de plus que la veille.`, q: (p, n) => `Combien de pages lira-t-${p.il} le ${n}e jour ?`, pas: [2, 3, 4, 5], min: 3, max: 15 },
  { titre: "L'entraînement", m: ["athlète", "athlète"], coin: "Semaine", ligne: "Tours", u: "tours", dit: (p, a, k) => `${p.txt} fait ${a} tours de piste la 1re semaine, puis ${k} tours de plus chaque semaine.`, q: (p, n) => `Combien de tours fera-t-${p.il} la ${n}e semaine ?`, pas: [2, 3, 4], min: 4, max: 12 },
  { titre: "Les économies", coin: "Mois", ligne: "Euros", u: "€", dit: (p, a, k) => `${p.nom} a ${a} € dans sa tirelire le 1er mois. Chaque mois, ${p.il} ajoute ${k} €.`, q: (p, n) => `Combien aura-t-${p.il} le ${n}e mois ?`, pas: [5, 10, 15, 20, 25], min: 5, max: 50 },
  { titre: "Les gradins", m: ["architecte", "architecte"], coin: "Rangée", ligne: "Places", u: "places", dit: (p, a, k) => `${p.txt} dessine des gradins : ${a} places au 1er rang, et ${k} places de plus à chaque rang.`, q: (_p, n) => `Combien de places y aura-t-il au ${n}e rang ?`, pas: [2, 4, 5, 6, 8], min: 10, max: 40 },
  { titre: "La plante", m: ["botaniste", "botaniste"], coin: "Semaine", ligne: "Hauteur (cm)", u: "cm", dit: (p, a, k) => `${p.txt} mesure une plante : ${a} cm la 1re semaine, puis elle grandit de ${k} cm chaque semaine.`, q: (_p, n) => `Combien mesurera-t-elle la ${n}e semaine ?`, pas: [2, 3, 4, 5], min: 3, max: 15 },
  { titre: "Les cartons", m: ["magasinière", "magasinier"], coin: "Heure", ligne: "Cartons", u: "cartons", dit: (p, a, k) => `${p.txt} a rangé ${a} cartons à la fin de la 1re heure, puis ${k} de plus chaque heure.`, q: (p, n) => `Combien de cartons aura-t-${p.il} rangés à la fin de la ${n}e heure ?`, pas: [6, 8, 12, 15], min: 6, max: 25 },
  { titre: "Le vélo", coin: "Jour", ligne: "km", u: "km", dit: (p, a, k) => `Pendant ses vacances, ${p.nom} roule ${a} km le 1er jour, puis ${k} km de plus chaque jour.`, q: (p, n) => `Combien de kilomètres roulera-t-${p.il} le ${n}e jour ?`, pas: [2, 3, 5], min: 5, max: 20 },
  { titre: "Les clients fidèles", m: ["fromagère", "fromager"], coin: "Mois", ligne: "Clients", u: "clients", dit: (p, a, k) => `${p.txt} a ${a} clients fidèles le 1er mois, puis ${k} de plus chaque mois.`, q: (p, n) => `Combien de clients fidèles aura-t-${p.il} le ${n}e mois ?`, pas: [3, 4, 5, 6, 12], min: 10, max: 40 },
  { titre: "Les abonnés", m: ["vidéaste", "vidéaste"], coin: "Semaine", ligne: "Abonnés", u: "abonnés", dit: (p, a, k) => `La chaîne de ${p.txt} a ${a} abonnés la 1re semaine, puis ${k} abonnés de plus chaque semaine.`, q: (_p, n) => `Combien d'abonnés aura la chaîne la ${n}e semaine ?`, pas: [25, 40, 50, 75], min: 100, max: 400 },
  { titre: "Les pompes", m: ["pompière", "pompier"], coin: "Jour", ligne: "Pompes", u: "pompes", dit: (p, a, k) => `Pour son entraînement, ${p.txt} fait ${a} pompes le 1er jour, puis ${k} de plus chaque jour.`, q: (p, n) => `Combien de pompes fera-t-${p.il} le ${n}e jour ?`, pas: [2, 3, 4, 5], min: 5, max: 20 },
];

/** Des objets posés à intervalles réguliers depuis le départ. */
type SitPos = { titre: string; m: readonly [string, string]; dit: (p: Perso, k: number) => string; q: (n: number) => string; objet: string; pas: number[]; long: string };
const SITS_POS: SitPos[] = [
  { titre: "Les poteaux de la clôture", m: ["agricultrice", "agriculteur"], dit: (p, k) => `${p.txt} plante un poteau de clôture tous les ${k} m. Le 1er poteau est à ${k} m du portail.`, q: (n) => `À combien de mètres du portail est le ${n}e poteau ?`, objet: "Poteau", pas: [2, 3, 4, 5], long: "un champ" },
  { titre: "Les arbres de l'allée", m: ["paysagiste", "paysagiste"], dit: (p, k) => `${p.txt} plante un arbre tous les ${k} m le long d'une allée. Le 1er arbre est à ${k} m de l'entrée.`, q: (n) => `À combien de mètres de l'entrée sera le ${n}e arbre ?`, objet: "Arbre", pas: [4, 5, 6, 8, 10], long: "une allée" },
  { titre: "Les lampadaires", m: ["électricienne", "électricien"], dit: (p, k) => `${p.txt} installe un lampadaire tous les ${k} m dans une rue. Le 1er est à ${k} m du carrefour.`, q: (n) => `À quelle distance du carrefour sera le ${n}e lampadaire ?`, objet: "Lampadaire", pas: [15, 20, 25, 30], long: "une rue" },
  { titre: "Les bouées", m: ["maître-nageuse", "maître-nageur"], dit: (p, k) => `${p.txt} place une bouée tous les ${k} m depuis la plage. La 1re est à ${k} m du bord.`, q: (n) => `À combien de mètres du bord sera la ${n}e bouée ?`, objet: "Bouée", pas: [5, 10, 20, 25], long: "un couloir de nage" },
  { titre: "Les plots du parcours", m: ["entraîneuse", "entraîneur"], dit: (p, k) => `${p.txt} pose un plot tous les ${k} m sur la piste. Le 1er plot est à ${k} m de la ligne de départ.`, q: (n) => `À combien de mètres du départ sera le ${n}e plot ?`, objet: "Plot", pas: [3, 4, 5, 6, 12], long: "une piste" },
  { titre: "Les bornes de la route", m: ["cantonnière", "cantonnier"], dit: (p, k) => `${p.txt} pose une borne tous les ${k} m le long d'une route. La 1re est à ${k} m du village.`, q: (n) => `À combien de mètres du village sera la ${n}e borne ?`, objet: "Borne", pas: [50, 100, 250], long: "une route" },
];

/** Une quantité qui baisse à chaque étape. */
type SitReste = { titre: string; m?: readonly [string, string]; u: string; coin: string; dit: (p: Perso, s0: number, k: number) => string; q: (n: number) => string; pas: number[]; mult: number };
const SITS_RESTE: SitReste[] = [
  { titre: "La cuve d'eau", m: ["maraîchère", "maraîcher"], u: "L", coin: "Jour", dit: (p, s0, k) => `La cuve de ${p.txt} contient ${fr(s0)} L. Chaque jour, ${p.il} prend ${k} L pour arroser.`, q: (n) => `Combien de litres restera-t-il au bout de ${n} jours ?`, pas: [15, 25, 40], mult: 10 },
  { titre: "Le livre", u: "pages", coin: "Soir", dit: (p, s0, k) => `Il reste ${s0} pages à lire dans le livre de ${p.nom}. Chaque soir, ${p.il} en lit ${k}.`, q: (n) => `Combien de pages restera-t-il après ${n} soirs ?`, pas: [12, 15, 18, 25], mult: 2 },
  { titre: "Le bocal de bonbons", m: ["confiseuse", "confiseur"], u: "bonbons", coin: "Heure", dit: (p, s0, k) => `${p.txt} remplit un bocal de ${s0} bonbons. Chaque heure, ${p.il} en vend ${k}.`, q: (n) => `Combien de bonbons restera-t-il au bout de ${n} heures ?`, pas: [12, 15, 24, 35], mult: 5 },
  { titre: "L'argent de poche", u: "€", coin: "Semaine", dit: (p, s0, k) => `${p.nom} a ${s0} €. Chaque semaine, ${p.il} dépense ${k} €.`, q: (n) => `Combien lui restera-t-il au bout de ${n} semaines ?`, pas: [3, 4, 6, 7], mult: 2 },
  { titre: "La batterie", u: "%", coin: "Heure", dit: (p, s0, k) => `La batterie du téléphone de ${p.nom} est à ${s0} %. Elle perd ${k} % chaque heure.`, q: (n) => `À combien sera-t-elle au bout de ${n} heures ?`, pas: [5, 6, 8], mult: 5 },
  { titre: "Les cahiers en stock", m: ["secrétaire de l'école", "secrétaire de l'école"], u: "cahiers", coin: "Jour", dit: (p, s0, k) => `${p.txt} a ${s0} cahiers en réserve. Chaque jour, ${p.il} en distribue ${k}.`, q: (n) => `Combien de cahiers restera-t-il après ${n} jours ?`, pas: [12, 15, 24, 25], mult: 10 },
  { titre: "La corde à couper", m: ["alpiniste", "alpiniste"], u: "m", coin: "Morceau", dit: (p, s0, k) => `${p.txt} a une corde de ${s0} m. ${cap(p.il)} coupe des morceaux de ${k} m, l'un après l'autre.`, q: (n) => `Quelle longueur restera-t-il après ${n} morceaux ?`, pas: [3, 4, 6, 7], mult: 5 },
  { titre: "Le rouleau de tissu", m: ["tapissière", "tapissier"], u: "m", coin: "Fauteuil", dit: (p, s0, k) => `${p.txt} a un rouleau de ${s0} m de tissu. Pour chaque fauteuil, ${p.il} utilise ${k} m.`, q: (n) => `Combien de mètres restera-t-il après ${n} fauteuils ?`, pas: [2, 3, 4], mult: 5 },
];

/** Deux suites qui se rejoignent. */
type SitDuo = { titre: string; coin: string; dit: (p: Perso, q: Perso, a: number, k1: number, b: number, k2: number) => string; quand: string };
const SITS_DUO: SitDuo[] = [
  { titre: "Les deux tirelires", coin: "Semaine", dit: (p, q, a, k1, b, k2) => `${p.nom} a ${a} € et ajoute ${k1} € chaque semaine. ${q.nom} a ${b} € et ajoute ${k2} € chaque semaine.`, quand: "Au bout de combien de semaines auront-ILS la même somme ?" },
  { titre: "Les deux plantes", coin: "Semaine", dit: (p, q, a, k1, b, k2) => `La plante de ${p.nom} mesure ${a} cm et grandit de ${k1} cm par semaine. Celle de ${q.nom} mesure ${b} cm et grandit de ${k2} cm par semaine.`, quand: "Au bout de combien de semaines auront-elles la même taille ?" },
  { titre: "Les deux albums", coin: "Mois", dit: (p, q, a, k1, b, k2) => `${p.nom} a ${a} cartes et en colle ${k1} de plus chaque mois. ${q.nom} en a ${b} et en colle ${k2} de plus chaque mois.`, quand: "Au bout de combien de mois auront-ILS le même nombre de cartes ?" },
  { titre: "Les deux équipes", coin: "Minute", dit: (p, q, a, k1, b, k2) => `Dans une course de relais, l'équipe de ${p.nom} a fait ${a} tours et en fait ${k1} par minute. L'équipe de ${q.nom} a fait ${b} tours et en fait ${k2} par minute.`, quand: "Au bout de combien de minutes auront-elles fait le même nombre de tours ?" },
  { titre: "Les deux chaînes", coin: "Jour", dit: (p, q, a, k1, b, k2) => `La chaîne de ${p.nom} a ${a} abonnés et en gagne ${k1} par jour. Celle de ${q.nom} en a ${b} et en gagne ${k2} par jour.`, quand: "Au bout de combien de jours auront-elles le même nombre d'abonnés ?" },
];

/** Une figure qui grandit : allumettes, tables, wagons… (valeur = a + k × (n − 1)). */
type SitFig = { pourquoi: string; titre: string; m?: readonly [string, string]; coin: string; ligne: string; a: number; k: number; dit: (p: Perso) => string; q: (n: number) => string; seul: number; u: string };
const SITS_FIG: SitFig[] = [
  { pourquoi: "chaque carré collé partage un côté avec le précédent, il n'ajoute que 3 allumettes", titre: "Les carrés d'allumettes", coin: "Carrés", ligne: "Allumettes", a: 4, k: 3, seul: 4, u: "allumettes", dit: (p) => `${p.nom} aligne des carrés faits d'allumettes, collés les uns aux autres : 1 carré → 4 allumettes, 2 carrés → 7, 3 carrés → 10.`, q: (n) => `Combien d'allumettes faut-il pour ${n} carrés ?` },
  { pourquoi: "chaque triangle collé partage un côté avec le précédent, il n'ajoute que 2 allumettes", titre: "Les triangles d'allumettes", coin: "Triangles", ligne: "Allumettes", a: 3, k: 2, seul: 3, u: "allumettes", dit: (p) => `${p.nom} forme une bande de triangles d'allumettes, pointe en haut puis pointe en bas : 1 triangle → 3 allumettes, 2 triangles → 5, 3 triangles → 7.`, q: (n) => `Combien d'allumettes faut-il pour ${n} triangles ?` },
  { pourquoi: "chaque table collée ajoute 2 chaises, une de chaque côté", titre: "Les tables de la cantine", m: ["cantinière", "cantinier"], coin: "Tables", ligne: "Chaises", a: 4, k: 2, seul: 4, u: "chaises", dit: (p) => `${p.txt} met des tables carrées bout à bout : 1 table → 4 chaises, 2 tables → 6 chaises, 3 tables → 8 chaises.`, q: (n) => `Combien de chaises peut-on placer autour de ${n} tables ?` },
  { pourquoi: "chaque maison collée partage un mur avec la précédente, elle n'ajoute que 5 allumettes", titre: "Les maisons d'allumettes", coin: "Maisons", ligne: "Allumettes", a: 6, k: 5, seul: 6, u: "allumettes", dit: (p) => `${p.nom} construit une rangée de maisons d'allumettes (un carré et un toit), collées entre elles : 1 maison → 6 allumettes, 2 maisons → 11, 3 maisons → 16.`, q: (n) => `Combien d'allumettes faut-il pour ${n} maisons ?` },
  { pourquoi: "chaque wagon ajoute 4 roues", titre: "Le train de wagons", m: ["cheminote", "cheminot"], coin: "Wagons", ligne: "Roues", a: 6, k: 4, seul: 6, u: "roues", dit: (p) => `${p.txt} compte les roues d'un train : avec 1 wagon, le train a 6 roues ; avec 2 wagons, 10 roues ; avec 3 wagons, 14 roues.`, q: (n) => `Combien de roues aura le train avec ${n} wagons ?` },
  { pourquoi: "chaque case collée partage une planche avec la précédente, elle n'en ajoute que 3", titre: "La barrière en bois", m: ["menuisière", "menuisier"], coin: "Cases", ligne: "Planches", a: 4, k: 3, seul: 4, u: "planches", dit: (p) => `${p.txt} fabrique une barrière en cases carrées collées : 1 case → 4 planches, 2 cases → 7 planches, 3 cases → 10 planches.`, q: (n) => `Combien de planches faut-il pour ${n} cases ?` },
  { pourquoi: "chaque hexagone collé partage un côté avec le précédent, il n'ajoute que 5 allumettes", titre: "Les hexagones d'allumettes", coin: "Hexagones", ligne: "Allumettes", a: 6, k: 5, seul: 6, u: "allumettes", dit: (p) => `${p.nom} colle des hexagones d'allumettes en ligne : 1 hexagone → 6 allumettes, 2 hexagones → 11, 3 hexagones → 16.`, q: (n) => `Combien d'allumettes faut-il pour ${n} hexagones ?` },
  { pourquoi: "chaque table rectangulaire collée ajoute 4 chaises, deux de chaque côté", titre: "Le banquet", m: ["traiteuse", "traiteur"], coin: "Tables", ligne: "Chaises", a: 6, k: 4, seul: 6, u: "chaises", dit: (p) => `Pour un banquet, ${p.txt} met des grandes tables bout à bout : 1 table → 6 chaises, 2 tables → 10 chaises, 3 tables → 14 chaises.`, q: (n) => `Combien de chaises faut-il pour ${n} tables ?` },
  { pourquoi: "chaque mètre de chemin en plus ajoute 3 dalles", titre: "Le chemin de dalles", m: ["paysagiste", "paysagiste"], coin: "Mètres", ligne: "Dalles", a: 5, k: 3, seul: 5, u: "dalles", dit: (p) => `${p.txt} pose un chemin de dalles : 1 m de chemin → 5 dalles, 2 m → 8 dalles, 3 m → 11 dalles.`, q: (n) => `Combien de dalles faut-il pour ${n} m de chemin ?` },
];
const minus = (q: string) => q.charAt(0).toLowerCase() + q.slice(1);

export const suiteDefiGabarits: TutorBankItemV4[] = [
  // ★3 — le terme d'un rang donné, en situation.
  tpl(D, "d1_rang_contexte", 3, "Du 1er au Ne, on ajoute N − 1 fois.", () => {
    const s = un(SITS_RANG);
    const p = perso(s.m);
    const k = un(s.pas);
    const a = entre(s.min, s.max);
    const n = entre(5, 15);
    const juste = a + (n - 1) * k;
    const vals = termes(a, k);
    return {
      text: `${s.dit(p, a, k)} ${s.q(p, n)}`,
      ...qN(juste, [a + n * k, n * k, a + k, juste - k], s.u),
      explanation: etapes(`Du 1er au ${n}e, on ajoute ${n - 1} fois ${k} (pas ${n} fois : le 1er est déjà compté).`, `${a} + ${n - 1} × ${k} = ${a} + ${(n - 1) * k} = ${juste}.`, `La réponse est ${val(juste, s.u)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, 4, "…", n], [...vals, "…", "?"], s.titre),
    };
  }),

  // ★3 — des objets posés à intervalles réguliers.
  tpl(D, "3_sentier", 3, "Le 1er est déjà à un intervalle du départ.", () => {
    const s = un(SITS_POS);
    const p = perso(s.m);
    const k = un(s.pas);
    const n = entre(5, 20);
    const juste = n * k;
    return {
      text: `${s.dit(p, k)} ${s.q(n)}`,
      ...qN(juste, [(n - 1) * k, (n + 1) * k, n + k], "m"),
      explanation: etapes(`Les distances forment la suite ${fr(k)} ; ${fr(2 * k)} ; ${fr(3 * k)} … : au rang n, c'est n × ${fr(k)}.`, `${n} × ${fr(k)} = ${fr(juste)}.`, `Le ${n}e est à ${fr(juste)} m.`),
      canvas: tableauRang(s.objet, "Distance (m)", [1, 2, 3, "…", n], [k, 2 * k, 3 * k, "…", "?"], s.titre),
    };
  }),

  // ★3 — ce qui reste après plusieurs étapes.
  tpl(D, "d3_reste", 3, "On enlève la même quantité à chaque fois, autant de fois qu'il y a d'étapes.", () => {
    const s = un(SITS_RESTE);
    const p = perso(s.m);
    const k = un(s.pas);
    const n = entre(3, 8);
    const reste = tire(Math.max(k, 5), s.u === "%" ? 100 - n * k : 60, s.mult);
    const s0 = reste + n * k;
    return {
      text: `${s.dit(p, s0, k)} ${s.q(n)}`,
      ...qN(reste, [s0 - (n + 1) * k, s0 - (n - 1) * k, s0 - k, s0 + n * k], s.u),
      explanation: etapes(`En ${n} fois, on enlève ${n} × ${k} = ${n * k}.`, `${fr(s0)} − ${n * k} = ${fr(reste)}.`, `Il reste ${val(reste, s.u)}.`),
      canvas: tableauRang(s.coin, "Reste", [0, 1, 2, "…", n], [s0, s0 - k, s0 - 2 * k, "…", "?"], s.titre),
    };
  }),

  // ★3 — le motif d'un rang éloigné, en situation.
  tpl(D, "d4_motif_rang", 3, "Compte par groupes entiers de motifs.", () => motifRang(tirerMotif(["ABC", "AAB", "ABB", "AABB", "ABCD"]), 20, 50)),

  // ★4 — à quel rang atteint-on une valeur ?
  tpl(D, "d5_quand", 4, "Le 1er rang compte déjà : cherche combien de pas il faut, puis ajoute 1.", () => {
    const s = un(SITS_RANG.filter((x) => !["Rangée", "Heure"].includes(x.coin)));
    const p = perso(s.m);
    const k = un(s.pas);
    const a = entre(s.min, s.max);
    const m = entre(4, 14);
    const cible = a + m * k;
    const periode = s.coin.toLowerCase();
    const fem = periode === "semaine";
    const rang = (r: number) => `${fem ? "la" : "le"} ${r}e ${periode}`;
    const faux = [m, m + 2, Math.round(cible / k), m - 1].filter((r) => r >= 2 && r !== m + 1).map(rang);
    return {
      text: `${s.dit(p, a, k)} ${fem ? "Quelle" : "Quel"} ${periode} arrivera-t-on à ${val(cible, s.u)} ?`,
      ...qcm(rang(m + 1), faux),
      explanation: etapes("On calcule ce qu'il manque, puis le nombre de pas, sans oublier que le départ est déjà le 1er.", `${cible} − ${a} = ${m * k}, et ${m * k} ÷ ${k} = ${m} pas. 1 + ${m} = ${m + 1}.`, `On y arrive ${rang(m + 1)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, "…", "?"], [a, a + k, a + 2 * k, "…", cible], s.titre),
    };
  }),

  // ★4 — deux suites qui se rejoignent.
  tpl(D, "d6_rattraper", 4, "À chaque étape, l'écart entre les deux diminue de la même quantité.", () => {
    const s = un(SITS_DUO);
    const [p, q] = deux();
    const k2 = entre(1, 9);
    const k1 = k2 + un([1, 2, 3, 4, 5]);
    const m = entre(3, 12);
    const a = entre(2, 40);
    const b = a + m * (k1 - k2);
    const unite = s.coin.toLowerCase();
    const plur = unite === "mois" ? "mois" : `${unite}s`;
    return {
      text: `${s.dit(p, q, a, k1, b, k2)} ${s.quand.replace("ILS", p.il === "elle" && q.il === "elle" ? "elles" : "ils")}`,
      ...qN(m, [m + 1, m - 1, b - a, m * 2], plur),
      explanation: etapes(`L'écart de départ est ${b} − ${a} = ${b - a}. À chaque ${unite}, il diminue de ${k1} − ${k2} = ${k1 - k2}.`, `${b - a} ÷ ${k1 - k2} = ${m}. Vérification : ${a} + ${m} × ${k1} = ${a + m * k1} et ${b} + ${m} × ${k2} = ${b + m * k2}.`, `Au bout de ${m} ${plur}.`),
      canvas: {
        kind: "tableau_donnees",
        title: s.titre,
        coin: s.coin,
        headers: ["0", "1", "2", "3", "…"],
        rows: [
          { label: p.nom, values: [a, a + k1, a + 2 * k1, a + 3 * k1, "…"].map(String) },
          { label: q.nom, values: [b, b + k2, b + 2 * k2, b + 3 * k2, "…"].map(String) },
        ],
        display: { compact: true },
      } as TableauDonneesCanvasData,
    };
  }),

  // ★4 — ce qui reste, en grand : beaucoup d'étapes.
  tpl(D, "4_eau_decroissante", 4, "Multiplie la quantité enlevée par le nombre d'étapes, puis soustrais.", () => {
    const s = un(SITS_RESTE.filter((x) => x.u !== "%"));
    const p = perso(s.m);
    const k = un(s.pas);
    const n = entre(9, 20);
    const reste = tire(Math.max(k, 5), 80, s.mult);
    const s0 = reste + n * k;
    return {
      text: `${s.dit(p, s0, k)} ${s.q(n)}`,
      ...qN(reste, [s0 - (n + 1) * k, s0 - (n - 1) * k, s0 - k, n * k], s.u),
      explanation: etapes(`En ${n} fois, on enlève ${n} × ${k} = ${n * k}.`, `${fr(s0)} − ${fr(n * k)} = ${fr(reste)}.`, `Il reste ${val(reste, s.u)}.`),
      canvas: tableauRang(s.coin, "Reste", [0, 1, 2, "…", n], [s0, s0 - k, s0 - 2 * k, "…", "?"], s.titre),
    };
  }),

  // ★4 — une quantité qui double (ou triple).
  tpl(D, "d7_double", 4, "Doubler, ce n'est pas ajouter toujours le même nombre.", () => {
    const f = un([2, 2, 3]);
    const mot = f === 2 ? "double" : "triple";
    const sits = [
      { t: "Les nénuphars", dit: (a: number) => `Sur un étang, il y a ${a} nénuphars le 1er jour, et leur nombre ${mot} chaque jour.`, q: (n: number) => `Combien y en aura-t-il le ${n}e jour ?`, coin: "Jour" },
      { t: "Le journal de l'école", dit: (a: number) => `Le 1er jour, ${a} personnes lisent le journal de l'école. Chaque jour, le nombre de lecteurs ${mot}.`, q: (n: number) => `Combien de lecteurs y aura-t-il le ${n}e jour ?`, coin: "Jour" },
      { t: "Les lapins de la ferme", dit: (a: number) => `Une éleveuse a ${a} lapins la 1re année. Chaque année, le nombre de lapins ${mot}.`, q: (n: number) => `Combien de lapins aura-t-elle la ${n}e année ?`, coin: "Année" },
      { t: "Les vues de la vidéo", dit: (a: number) => `La vidéo de la classe a ${a} vues le 1er jour, et ce nombre ${mot} chaque jour.`, q: (n: number) => `Combien de vues aura-t-elle le ${n}e jour ?`, coin: "Jour" },
      { t: "Les bactéries", dit: (a: number) => `Une biologiste observe ${a} bactéries à la 1re heure. Leur nombre ${mot} toutes les heures.`, q: (n: number) => `Combien de bactéries y aura-t-il à la ${n}e heure ?`, coin: "Heure" },
      { t: "La chaîne de messages", dit: (a: number) => `Un message est envoyé à ${a} personnes le 1er jour. Chaque jour, le nombre de personnes qui le reçoivent ${mot}.`, q: (n: number) => `Combien de personnes le recevront le ${n}e jour ?`, coin: "Jour" },
    ];
    const s = un(sits);
    const a = f === 2 ? entre(2, 9) : entre(2, 5);
    const n = f === 2 ? entre(5, 7) : entre(4, 5);
    const juste = a * f ** (n - 1);
    const vals = [a, f * a, f * f * a];
    return {
      text: `${s.dit(a)} ${s.q(n)}`,
      ...qN(juste, [a + (n - 1) * a * (f - 1), juste / f, juste * f, a * n * f]),
      explanation: etapes(`On ${f === 2 ? "double" : "triple"} à chaque étape : on multiplie par ${f}.`, `${Array.from({ length: n }, (_, i) => fr(a * f ** i)).join(" ; ")} : au ${n}e, ${fr(juste)}.`, `La réponse est ${fr(juste)}.`),
      canvas: tableauRang(s.coin, "Nombre", [1, 2, 3, "…", n], [...vals, "…", "?"], s.t),
    };
  }),

  // ★4 — une figure qui grandit (allumettes, tables…).
  tpl(D, "d8_figures", 4, "Regarde ce qu'on ajoute quand on colle une figure de plus.", () => {
    const s = un(SITS_FIG);
    const p = perso(s.m);
    const n = entre(6, 15);
    const juste = s.a + (n - 1) * s.k;
    return {
      text: `${s.dit(p)} ${s.q(n)}`,
      ...qN(juste, [s.seul * n, s.k * n, juste + s.k, s.a + n * s.k], s.u),
      explanation: etapes(`Au début, il en faut ${s.a}, puis ${s.pourquoi}.`, `${s.a} + ${n - 1} × ${s.k} = ${s.a} + ${(n - 1) * s.k} = ${juste}.`, `Il faut ${val(juste, s.u)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, "…", n], [s.a, s.a + s.k, s.a + 2 * s.k, "…", "?"], s.titre),
    };
  }),

  // ★5 — une figure de rang 50 ou 100.
  tpl(D, "d9_figures_50", 5, "Le 1er compte à part : 1 figure, puis N − 1 ajouts.", () => {
    const s = un(SITS_FIG);
    const p = perso(s.m);
    const n = un([20, 25, 30, 40, 50, 50, 100]);
    const juste = s.a + (n - 1) * s.k;
    return {
      text: `${s.dit(p)} ${un([s.q(n), `Sans tout dessiner, ${minus(s.q(n))}`, `Défi : ${minus(s.q(n))}`, `${s.q(n)} Cherche sans tout dessiner.`])}`,
      ...qN(juste, [s.seul * n, s.k * n, s.a + n * s.k, juste - s.k, s.k * n + s.a * 2]),
      explanation: etapes(`La 1re figure demande ${s.a}, puis ${s.pourquoi}.`, `${s.a} + ${n - 1} × ${s.k} = ${s.a} + ${(n - 1) * s.k} = ${juste}.`, `Il faut ${val(juste, s.u)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, "…", n], [s.a, s.a + s.k, s.a + 2 * s.k, "…", "?"], s.titre),
    };
  }),

  // ★5 — le terme de rang 50 ou 100, avec des entiers ou des décimaux.
  tpl(D, "d10_rang_50", 5, "Du rang 1 au rang N, il y a N − 1 sauts.", () => {
    const dec = Math.random() < 0.35;
    const k = dec ? un([0.5, 0.25, 1.5]) : un([3, 4, 6, 7, 8, 9, 11, 12, 15]);
    const a = dec ? un([0.5, 1, 1.5, 2, 2.5, 3]) : entre(1, 25);
    const n = un([50, 100, 60, 75, 80, 40]);
    const t = termes(a, k);
    const juste = arr(a + (n - 1) * k);
    const s = suiteTxt(t);
    const p = perso();
    const text = un([
      `Voici le début d'une suite : ${s}. Quel est son ${n}e terme ?`,
      `Dans la suite ${s}, quel nombre est au rang ${n} ?`,
      `${p.nom} affirme qu'${p.il} peut trouver le ${n}e terme de la suite ${s} sans tout écrire. Quel est ce terme ?`,
      `Défi : quel nombre sera dans la ${n}e case de la suite ${s} ?`,
      `La suite ${s} continue toujours avec la même règle. Que vaut son terme de rang ${n} ?`,
    ]);
    return {
      text,
      ...qN(juste, [arr(a + n * k), arr(n * k), arr(juste - k), arr(a * n), arr(juste + 1)]),
      explanation: etapes(`Du 1er terme au ${n}e, il y a ${n - 1} sauts de ${fr(k)}.`, `${fr(a)} + ${n - 1} × ${fr(k)} = ${fr(a)} + ${fr(arr((n - 1) * k))} = ${fr(juste)}.`, `Le ${n}e terme est ${fr(juste)}.`),
      canvas: tableauRang("Rang", "Terme", [1, 2, 3, 4, "…", n], [...t, "…", "?"], "Rang → terme"),
    };
  }),

  // ★5 — les poteaux et les intervalles (aux deux bouts).
  tpl(D, "d11_intervalles", 5, "Compte les intervalles, puis ajoute le poteau du début.", () => {
    const s = un(SITS_POS);
    const p = perso(s.m);
    const k = un(s.pas);
    const m = entre(6, 25);
    const L = m * k;
    const objet = s.objet.toLowerCase();
    const fem = ["bouée", "borne"].includes(objet);
    const pl = objet.endsWith("eau") ? `${objet}x` : `${objet}s`;
    const dePl = /^[aeiouéh]/.test(pl) ? `d'${pl}` : `de ${pl}`;
    const text = un([
      `${p.txt} installe ${fem ? "une" : "un"} ${objet} tous les ${fr(k)} m le long d'${s.long} de ${fr(L)} m, en commençant au début et en finissant au bout. Combien ${dePl} lui faut-il ?`,
      `Le long d'${s.long} de ${fr(L)} m, on place ${fem ? "une" : "un"} ${objet} tous les ${fr(k)} m, ${fem ? "une" : "un"} à chaque bout. Combien ${dePl} faut-il ?`,
      `${p.txt} veut ${fem ? "une" : "un"} ${objet} tous les ${fr(k)} m sur ${s.long} de ${fr(L)} m, y compris aux deux extrémités. Combien ${dePl} doit-${p.il} prévoir ?`,
    ]);
    return {
      text,
      ...qN(m + 1, [m, m + 2, m - 1, m + 3], pl),
      explanation: etapes(`${fr(L)} ÷ ${fr(k)} = ${m} intervalles.`, `Il y a ${fem ? "une" : "un"} ${objet} au début, puis ${fem ? "une" : "un"} au bout de chaque intervalle : 1 + ${m} = ${m + 1}.`, `Il faut ${m + 1} ${pl}.`),
      canvas: tableauRang(s.objet, "Distance (m)", [1, 2, 3, "…", "?"], [0, k, 2 * k, "…", L], s.titre),
    };
  }),

  // ★5 — deux règles qui alternent.
  tpl(D, "5_alternance", 5, "Observe chaque passage : deux règles peuvent alterner.", () => {
    const add = un([3, 4, 5, 6, 7, 8, 9, 10]);
    const sub = entre(1, add - 1);
    const a = entre(2, 30);
    const t = [a];
    for (let i = 1; i < 8; i++) t.push(i % 2 === 1 ? t[i - 1] + add : t[i - 1] - sub);
    const loin = Math.random() < 0.5;
    const vus = t.slice(0, 5);
    const juste = loin ? t[7] : t[5];
    const s = suiteTxt(vus);
    const p = perso();
    const text = loin
      ? un([`Défi : dans la suite ${s} …, quel est le 8e terme ?`, `${p.nom} continue la suite ${s} avec les mêmes règles. Quel sera son 8e nombre ?`, `La suite ${s} continue de la même façon. Que vaut le terme de rang 8 ?`])
      : un([`Défi : continue la suite ${s} ; ?`, `${p.nom} a écrit ${s}. Quel nombre vient ensuite ?`, `Quel est le terme suivant de la suite ${s} ?`, `Trouve le nombre qui suit : ${s}.`]);
    return {
      text,
      ...qN(juste, loin ? [t[6], t[7] + add, t[7] + sub, a + 7 * add] : [t[4] - sub + add + add, t[4] + add, t[4] - add, t[4] + sub]),
      explanation: etapes("Les écarts ne sont pas tous les mêmes : on regarde les passages un par un.", `On fait +${add}, puis −${sub}, puis +${add}, puis −${sub}… : ${suiteTxt(t.slice(0, loin ? 8 : 6))}.`, `La réponse est ${fr(juste)}.`),
      canvas: frise([...vus, loin ? "…" : "?"], { titre: "Défi : deux règles", manquant: loin ? -1 : 5 }),
    };
  }),

  // ★5 — doubler ou tripler sur beaucoup d'étapes, en contexte.
  tpl(D, "2_piege_multiplicatif", 5, "Multiplier à chaque étape, ce n'est pas ajouter toujours la même chose.", () => {
    const f = un([2, 2, 3]);
    const a = f === 2 ? entre(1, 5) : entre(1, 3);
    const n = f === 2 ? entre(7, 9) : entre(5, 6);
    const juste = a * f ** (n - 1);
    const [p] = deux();
    const sits = [
      `${p.nom} propose un marché : ${a} € le 1er jour, puis ${f === 2 ? "le double" : "le triple"} de la veille chaque jour. Combien recevra-t-${p.il} le ${n}e jour ?`,
      `Dans un jeu, on gagne ${a} point${a > 1 ? "s" : ""} au 1er niveau, puis ${f === 2 ? "deux" : "trois"} fois plus qu'au niveau précédent. Combien de points gagne-t-on au ${n}e niveau ?`,
      `Une rumeur : ${a} élève${a > 1 ? "s" : ""} la connai${a > 1 ? "ssent" : "t"} le 1er jour, et chaque jour ce nombre est multiplié par ${f}. Combien d'élèves la connaîtront le ${n}e jour ?`,
      `Une pâte à pain contient ${a} millier${a > 1 ? "s" : ""} de levures à la 1re heure ; leur nombre est multiplié par ${f} chaque heure. Combien de milliers à la ${n}e heure ?`,
      `${p.nom} pose ${a === 1 ? "une feuille" : `${a} feuilles l'une sur l'autre`} et plie ${a === 1 ? "la feuille" : "le paquet"} en ${f === 2 ? "deux" : "trois"}, encore et encore. Chaque pliage multiplie le nombre d'épaisseurs par ${f}. Combien y a-t-il d'épaisseurs après ${n - 1} pliages ?`,
    ];
    return {
      text: un(sits),
      ...qN(juste, [a + (n - 1) * a * (f - 1), juste / f, juste * f, a * f * n, a * f ** n + a]),
      explanation: etapes(`On multiplie par ${f} à chaque étape, ${n - 1} fois.`, `${Array.from({ length: n }, (_, i) => fr(a * f ** i)).join(" ; ")}.`, `La réponse est ${fr(juste)}.`),
      canvas: tableauRang("Étape", "Nombre", [1, 2, 3, "…", n], [a, a * f, a * f * f, "…", "?"], f === 2 ? "On double" : "On triple"),
    };
  }),

  // ★5 — à partir de quel rang dépasse-t-on un nombre ?
  tpl(D, "d12_depasser", 5, "Cherche le rang où l'on atteint la valeur, puis vérifie s'il faut aller un rang plus loin.", () => {
    const s = un(SITS_RANG.filter((x) => !["Rangée", "Heure"].includes(x.coin)));
    const p = perso(s.m);
    const k = un(s.pas);
    const a = entre(s.min, s.max);
    const cible = a + entre(6, 20) * k + entre(1, k - 1 > 0 ? k - 1 : 1);
    // plus petit n tel que a + (n − 1) k > cible
    const n = Math.floor((cible - a) / k) + 2;
    const periode = s.coin.toLowerCase();
    const fem = periode === "semaine";
    const rang = (r: number) => `${fem ? "la" : "le"} ${r}e ${periode}`;
    const text = `${s.dit(p, a, k)} ${un([`À partir de ${fem ? "quelle" : "quel"} ${periode} dépassera-t-on ${val(cible, s.u)} ?`, `${fem ? "Quelle" : "Quel"} ${periode} passera-t-on pour la première fois au-dessus de ${val(cible, s.u)} ?`])}`;
    return {
      text,
      ...qcm(rang(n), [n - 1, n + 1, Math.floor(cible / k), n - 2].filter((r) => r >= 2 && r !== n).map(rang)),
      explanation: etapes(`On cherche le premier rang où ${a} + (rang − 1) × ${k} dépasse ${cible}.`, `Au rang ${n - 1} : ${a} + ${n - 2} × ${k} = ${a + (n - 2) * k}, pas encore. Au rang ${n} : ${a} + ${n - 1} × ${k} = ${a + (n - 1) * k}.`, `On dépasse ${val(cible, s.u)} ${rang(n)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, "…", "?"], [a, a + k, a + 2 * k, "…", `> ${fr(cible)}`], s.titre),
    };
  }),
];
