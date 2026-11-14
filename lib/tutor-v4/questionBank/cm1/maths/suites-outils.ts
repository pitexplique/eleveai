// lib/tutor-v4/questionBank/cm1/maths/suites-outils.ts
//
// ⭐ 14/11/2026 — LES GABARITS DES SUITES DU CM1 (notion `suite`). Avant : 6 à
// 12 squelettes par micro, 12 à 17 répétitions sur 20. Les micros n'ont pas de
// vidéo : vocabulaire du cycle 3 (« suite », « terme », « règle », « on ajoute »,
// « on enlève », « croissante », « décroissante », « motif qui se répète »).
// Chaque gabarit tire une SITUATION (métiers, sport, cuisine, jardin, école…)
// × une TOURNURE × des nombres.
// ⛔ CM1 = zéro clavier : que des QCM, leurres = vraies erreurs d'élève
// (ajouter au lieu d'enlever, se tromper de pas, compter le premier terme deux
// fois, oublier le départ, garder le même écart dans une suite qui double…).
// ⛔ Le dessin porte les DONNÉES, jamais la réponse : sur les questions de règle
// et de sens (croissante / décroissante), les flèches « +3 » sont cachées.
// Dessins : `suite` (les termes en cases, les motifs en frise) et
// `tableau_donnees` (rang → terme).

import type { CanvasFigure, DifficultyLevel, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
import type { SuiteCanvasData, TableauDonneesCanvasData } from "@/lib/tutor-v4/types_canvas";
import { cap, entre, etapes, fr, qcm, qcmN, un } from "./trous-outils";

type G = Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const tpl = (microId: string, n: string, difficulty: DifficultyLevel, hint: string, generate: () => G): TutorBankItemV4 =>
  ({
    kind: "template",
    id: `cm1_${microId}_tpl_${n}`,
    niveau: "cm1",
    matiere: "maths",
    notionId: "suite",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cm1", "suite", microId, "template", "canvas"],
    generate,
  }) as TutorBankItemV4;

/* ───────────────────────── Les nombres ───────────────────────── */

const arr = (x: number) => Math.round(x * 1000) / 1000;
const val = (v: number, u: string) => (u ? `${fr(v)} ${u}` : fr(v));
const suiteTxt = (l: readonly (number | string)[]) => l.map((v) => (typeof v === "number" ? fr(v) : v)).join(" ; ");
const listePuis = (l: readonly number[], u: string) => l.map((v) => val(v, u)).join(", puis ");
const listeEt = (l: readonly number[], u: string) => {
  const s = l.map((v) => val(v, u));
  return `${s.slice(0, -1).join(", ")} et ${s[s.length - 1]}`;
};
const liste = (l: readonly number[], u: string) => (Math.random() < 0.5 ? listePuis(l, u) : listeEt(l, u));
/** Un multiple de `m` entre min et max. */
const tire = (min: number, max: number, m = 1) => entre(Math.ceil(min / m), Math.floor(max / m)) * m;
const termes = (a: number, k: number, n = 4) => Array.from({ length: n }, (_, i) => arr(a + i * k));

/* ───────────────────────── Les personnes ───────────────────────── */

const NOMS_F = ["Nina", "Zoé", "Lou", "Inès", "Jade", "Maya", "Lina", "Emma", "Léa", "Sarah", "Chloé", "Aya", "Rose", "Alma"];
const NOMS_M = ["Téo", "Ravi", "Malo", "Sacha", "Amir", "Tom", "Yanis", "Noé", "Lucas", "Karim", "Hugo", "Enzo", "Bilal", "Jules"];
type Perso = { nom: string; il: "il" | "elle"; txt: string };
function perso(metier?: readonly [string, string]): Perso {
  const f = Math.random() < 0.5;
  const nom = un(f ? NOMS_F : NOMS_M);
  const m = metier ? (f ? metier[0] : metier[1]) : "";
  return { nom, il: f ? "elle" : "il", txt: m && Math.random() < 0.75 ? `${nom}, ${m},` : nom };
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
const S = (
  titre: string,
  u: string,
  m: readonly [string, string] | undefined,
  dit: Sit["dit"],
  q: Sit["q"],
  pas: number[],
  min: number,
  max: number,
  mult = 1,
): Sit => ({ titre, u, m, dit, q, pas, min, max, mult });

/** Des suites qui MONTENT : min et max bornent le premier terme. */
const SIT_PLUS: Sit[] = [
  S("Les plateaux de croissants", "", ["boulangère", "boulanger"], (p, l) => `${p.txt} garnit ses plateaux : ${l} croissants.`, (p) => ["Combien de croissants y aura-t-il sur le plateau suivant ?", `Combien de croissants mettra-t-${p.il} sur le plateau suivant ?`], [2, 3, 4, 5], 2, 12),
  S("Les rangées de salades", "", ["jardinière", "jardinier"], (p, l) => `Dans son potager, ${p.txt} plante des rangées de salades : ${l} pieds.`, () => ["Combien de pieds y aura-t-il dans la rangée suivante ?"], [2, 3, 4, 5], 3, 12),
  S("Les étagères de livres", "", ["bibliothécaire", "bibliothécaire"], (p, l) => `${p.txt} range des livres sur les étagères, de haut en bas : ${l} livres.`, () => ["Combien de livres y aura-t-il sur l'étagère suivante ?"], [3, 4, 5, 6], 4, 15),
  S("L'entraînement de course", "km", ["coureuse", "coureur"], (p, l) => `Chaque semaine, ${p.txt} court un peu plus : ${l}.`, (p) => [`Combien de kilomètres courra-t-${p.il} la semaine suivante ?`], [1, 2, 3], 1, 6),
  S("La tirelire", "€", undefined, (p, l) => `${p.txt} compte l'argent de sa tirelire à la fin de chaque mois : ${l}.`, (p) => [`Combien aura-t-${p.il} le mois suivant ?`], [4, 5, 10, 20], 5, 30),
  S("La plante qui pousse", "cm", undefined, (_p, l) => `Une jeune plante mesure ${l}, semaine après semaine.`, () => ["Combien mesurera-t-elle la semaine suivante ?"], [2, 3, 4, 5], 2, 10),
  S("Le mur de briques", "", ["maçonne", "maçon"], (p, l) => `${p.txt} monte un mur : à la fin de chaque heure, ${l} briques sont posées.`, () => ["Combien de briques seront posées à la fin de l'heure suivante ?"], [10, 20, 25], 10, 40, 5),
  S("Les colis livrés", "", ["livreuse", "livreur"], (p, l) => `${p.txt} compte les colis livrés après chaque arrêt : ${l}.`, () => ["Combien de colis seront livrés après l'arrêt suivant ?"], [3, 4, 5, 6], 3, 10),
  S("Les points du jeu", "points", undefined, (p, l) => `Dans un jeu vidéo, ${p.txt} a ${l} après chaque niveau.`, (p) => [`Combien de points aura-t-${p.il} après le niveau suivant ?`], [10, 20, 25, 50], 10, 50, 5),
  S("Les sièges du cinéma", "", undefined, (_p, l) => `Au cinéma, les sièges du bord de chaque rangée portent les numéros ${l}.`, () => ["Quel numéro porte le siège du bord de la rangée suivante ?"], [10, 12, 15, 20], 1, 10),
  S("Les œufs du poulailler", "", ["agricultrice", "agriculteur"], (p, l) => `${p.txt} note le total d'œufs ramassés, matin après matin : ${l}.`, (p) => [`Quel total notera-t-${p.il} le matin suivant ?`], [6, 8, 12], 6, 20),
  S("Les longueurs de piscine", "", ["nageuse", "nageur"], (p, l) => `À chaque séance, ${p.txt} nage un peu plus : ${l} longueurs.`, (p) => [`Combien de longueurs nagera-t-${p.il} à la séance suivante ?`], [2, 4, 5], 4, 12),
  S("Le chiot sur la balance", "g", ["vétérinaire", "vétérinaire"], (p, l) => `${p.txt} pèse un chiot chaque semaine : ${l}.`, () => ["Combien pèsera le chiot la semaine suivante ?"], [100, 150, 200], 500, 1200, 50),
  S("Les répétitions de piano", "min", ["pianiste", "pianiste"], (p, l) => `Chaque jour, ${p.txt} répète un peu plus longtemps : ${l}.`, (p) => [`Combien de minutes répétera-t-${p.il} le jour suivant ?`], [5, 10], 10, 30, 5),
  S("Les cahiers distribués", "", ["professeure", "professeur"], (p, l) => `${p.txt} distribue des cahiers table après table ; le total distribué passe à ${l}.`, () => ["Quel sera le total après la table suivante ?"], [4, 5, 6], 4, 12),
  S("Les fournées de macarons", "", ["pâtissière", "pâtissier"], (p, l) => `${p.txt} prépare des macarons : ${l} sont prêts après chaque fournée.`, () => ["Combien de macarons seront prêts après la fournée suivante ?"], [12, 16, 20, 24], 12, 30),
  S("L'album de cartes", "", undefined, (p, l) => `${p.txt} complète son album mois après mois : ${l} cartes collées.`, (p) => [`Combien de cartes aura-t-${p.il} collées le mois suivant ?`], [5, 6, 8, 10], 5, 20),
  S("Les marches de l'immeuble", "", ["gardienne", "gardien"], (p, l) => `${p.txt} compte les marches depuis le rez-de-chaussée, étage après étage : ${l}.`, () => ["Combien de marches compte-t-on à l'étage suivant ?"], [12, 15, 18, 20], 12, 20),
];

/** Des suites qui DESCENDENT : min et max bornent le DERNIER terme connu. */
const SIT_MOINS: Sit[] = [
  S("La batterie de la tablette", "%", undefined, (p, l) => `La batterie de la tablette de ${p.nom} affiche ${l}, heure après heure.`, () => ["Quel pourcentage affichera-t-elle l'heure suivante ?"], [5, 10, 15], 20, 60, 5),
  S("La bougie qui fond", "cm", undefined, (_p, l) => `Une bougie mesure ${l}, heure après heure.`, () => ["Combien mesurera-t-elle l'heure suivante ?"], [1, 2, 3], 4, 10),
  S("La cuve du jardin", "L", undefined, (p, l) => `La cuve d'eau du jardin de ${p.nom} contient ${l}, jour après jour.`, () => ["Combien de litres contiendra-t-elle le jour suivant ?"], [5, 10, 20], 30, 80, 5),
  S("Les places du spectacle", "", undefined, (_p, l) => `Il reste ${l} places à vendre pour le spectacle, heure après heure.`, () => ["Combien de places restera-t-il l'heure suivante ?"], [5, 10, 20], 25, 60, 5),
  S("Le livre à finir", "", undefined, (p, l) => `Il reste à ${p.nom} ${l} pages à lire, soir après soir.`, () => ["Combien de pages lui restera-t-il le soir suivant ?"], [5, 6, 8, 10], 20, 50),
  S("Le compte à rebours", "s", undefined, (_p, l) => `Avant le départ d'une course, le compte à rebours affiche ${l}.`, () => ["Qu'affichera-t-il ensuite ?"], [1, 2, 5], 6, 20),
  S("Le stock d'agendas", "", ["libraire", "libraire"], (p, l) => `${p.txt} vend des agendas ; le stock passe à ${l}, jour après jour.`, () => ["Combien d'agendas restera-t-il le jour suivant ?"], [3, 4, 6, 8], 15, 40),
  S("Le four qui refroidit", "°C", ["cuisinière", "cuisinier"], (p, l) => `${p.txt} éteint son four, qui refroidit : ${l}.`, () => ["Quelle température affichera le four ensuite ?"], [10, 20, 25], 40, 120, 5),
  S("La descente de la montagne", "m", ["guide", "guide"], (p, l) => `Pendant la descente, ${p.txt} note l'altitude : ${l}.`, (p) => [`Quelle altitude notera-t-${p.il} ensuite ?`], [50, 100, 150], 200, 900, 50),
  S("La gourde", "cL", undefined, (p, l) => `Après chaque pause, la gourde de ${p.nom} contient ${l}.`, () => ["Combien contiendra-t-elle après la pause suivante ?"], [5, 10], 20, 50, 5),
  S("Les pots de glace", "", ["marchande de glaces", "marchand de glaces"], (p, l) => `${p.txt} vend ses glaces ; il reste ${l} pots, heure après heure.`, () => ["Combien de pots restera-t-il l'heure suivante ?"], [4, 5, 6], 12, 40),
  S("L'argent de poche", "€", undefined, (p, l) => `${p.nom} dépense son argent de poche ; il lui reste ${l}, semaine après semaine.`, () => ["Combien lui restera-t-il la semaine suivante ?"], [2, 3, 5], 6, 30),
  S("Le sac de graines", "g", ["agricultrice", "agriculteur"], (p, l) => `${p.txt} sème des graines ; il reste ${l} dans le sac, rang après rang.`, () => ["Combien de grammes restera-t-il après le rang suivant ?"], [50, 100], 150, 500, 50),
];

/** Des suites DÉCIMALES qui montent (pas : 0,1 · 0,2 · 0,5 · 1,5 · 2,5). */
const SIT_DEC: Sit[] = [
  S("La pousse de bambou", "cm", undefined, (_p, l) => `Une pousse de bambou mesure ${l}, jour après jour.`, () => ["Combien mesurera-t-elle le jour suivant ?"], [0.5, 1.5], 1, 6),
  S("Le prix des tomates", "€", undefined, (_p, l) => `Au marché, le prix d'un kilo de tomates passe à ${l}, semaine après semaine.`, () => ["Quel sera le prix la semaine suivante ?"], [0.1, 0.2], 1, 3),
  S("La course du matin", "km", ["coureuse", "coureur"], (p, l) => `${p.txt} court chaque jour un peu plus : ${l}.`, (p) => [`Combien de kilomètres courra-t-${p.il} le jour suivant ?`], [0.5, 0.2], 1, 4),
  S("Le bébé sur la balance", "kg", ["sage-femme", "sage-femme"], (p, l) => `${p.txt} pèse un bébé chaque mois : ${l}.`, () => ["Combien pèsera le bébé le mois suivant ?"], [0.5], 3, 5),
  S("Le pluviomètre", "cm", undefined, (_p, l) => `Le pluviomètre de l'école indique ${l}, heure après heure.`, () => ["Qu'indiquera-t-il l'heure suivante ?"], [0.2, 0.5], 1, 3),
  S("Le compteur du taxi", "€", ["chauffeuse de taxi", "chauffeur de taxi"], (p, l) => `Dans la voiture de ${p.txt}${p.txt.endsWith(",") ? "" : ","} le compteur affiche ${l}, kilomètre après kilomètre.`, () => ["Qu'affichera le compteur au kilomètre suivant ?"], [1.5, 2.5], 3, 8),
  S("Les rubans", "m", ["couturière", "couturier"], (p, l) => `${p.txt} coupe des rubans de plus en plus longs : ${l}.`, (p) => [`Quelle longueur aura le ruban suivant ?`, `Quelle longueur coupera-t-${p.il} ensuite ?`], [0.5, 1.5], 1, 4),
];

const departDec = (k: number, s: Sit) => (k === 0.1 || k === 0.2 ? arr(entre(s.min, s.max) + entre(1, 9) / 10) : arr(entre(s.min, s.max) + un([0, 0.5])));

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
    terms,
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
const FLEURS = [M("🌷", "tulipe"), M("🌻", "tournesol"), M("🌹", "rose"), M("🌼", "marguerite")];
const FRUITS = [M("🍓", "fraise"), M("🍌", "banane"), M("🍇", "raisin"), M("🍍", "ananas"), M("🥝", "kiwi")];
const FORMES = [M("🔺", "triangle"), M("⭐", "étoile"), M("❤️", "cœur"), M("🌙", "lune"), M("🔷", "losange")];
const FRIANDISES = [M("🍬", "bonbon"), M("🍫", "carré de chocolat"), M("🍪", "biscuit"), M("🍭", "sucette")];
const LAMPIONS = [M("🔴", "lampion rouge"), M("🔵", "lampion bleu"), M("🟢", "lampion vert"), M("🟡", "lampion jaune")];

type SitMotif = { titre: string; m?: readonly [string, string]; dit: (p: Perso) => string; pal: Mo[]; suivant: (p: Perso) => string; rang: (n: number) => string; mot: string };
const SITS_MOTIF: SitMotif[] = [
  { titre: "Le collier de perles", m: ["bijoutière", "bijoutier"], dit: (p) => `${p.txt} enfile des perles sur un collier.`, pal: PERLES, suivant: (p) => `Quelle perle enfilera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e perle du collier ?`, mot: "perle" },
  { titre: "La frise de carreaux", m: ["carreleuse", "carreleur"], dit: (p) => `${p.txt} pose une frise de carreaux le long d'un mur.`, pal: CARREAUX, suivant: (p) => `Quel carreau posera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e carreau de la frise ?`, mot: "carreau" },
  { titre: "La jardinière de fleurs", m: ["fleuriste", "fleuriste"], dit: (p) => `${p.txt} plante des fleurs dans une longue jardinière, toujours dans le même ordre.`, pal: FLEURS, suivant: (p) => `Quelle fleur plantera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e fleur ?`, mot: "fleur" },
  { titre: "La brochette de fruits", m: ["cuisinière", "cuisinier"], dit: (p) => `${p.txt} prépare une très longue brochette de fruits.`, pal: FRUITS, suivant: (p) => `Quel fruit piquera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e fruit de la brochette ?`, mot: "fruit" },
  { titre: "La frise de la classe", dit: (p) => `Sur la frise de la classe, ${p.nom} colle des gommettes.`, pal: FORMES, suivant: (p) => `Quelle gommette collera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e gommette ?`, mot: "gommette" },
  { titre: "Le gâteau décoré", m: ["pâtissière", "pâtissier"], dit: (p) => `${p.txt} aligne des friandises sur un long gâteau.`, pal: FRIANDISES, suivant: (p) => `Quelle friandise posera-t-${p.il} ensuite ?`, rang: (n) => `Quelle sera la ${n}e friandise ?`, mot: "friandise" },
  { titre: "Le ruban brodé", m: ["couturière", "couturier"], dit: (p) => `${p.txt} brode des motifs sur un ruban.`, pal: FORMES, suivant: (p) => `Quel motif brodera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e motif du ruban ?`, mot: "motif" },
  { titre: "La guirlande de la fête", m: ["décoratrice", "décorateur"], dit: (p) => `Pour la fête du quartier, ${p.txt} accroche une guirlande de lampions.`, pal: LAMPIONS, suivant: (p) => `Quel lampion accrochera-t-${p.il} ensuite ?`, rang: (n) => `Quel sera le ${n}e lampion ?`, mot: "lampion" },
];

const PATRONS = ["AB", "ABC", "AAB", "ABB", "AABB"] as const;
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

/* ═════════════════════════ SUITE_CONTINUER ═════════════════════════ */

const C = "suite_continuer";

const QSUIVANT = (s: string, p: Perso) => [
  `Continue la suite : ${s} ; ?`,
  `Quel est le nombre suivant dans la suite ${s} ?`,
  `Voici une suite : ${s}. Quel nombre vient ensuite ?`,
  `${p.nom} écrit la suite ${s}. Quel nombre écrit-${p.il} ensuite ?`,
  `Trouve le terme suivant : ${s} ; ?`,
  `Sur son cahier, ${p.nom} a commencé une suite : ${s}. Quel est le nombre suivant ?`,
];

const continuerPur = (sens: 1 | -1, pas: number[], debut: [number, number]) => {
  const k = un(pas);
  const a = sens === 1 ? entre(debut[0], debut[1]) : entre(debut[0], debut[1]) + 4 * k;
  const t = termes(a, sens * k);
  return { k, t, next: arr(a + 4 * sens * k) };
};

const leurresSuivant = (last: number, k: number, sens: 1 | -1) => [
  last - sens * k, // ajouter au lieu d'enlever (ou l'inverse)
  last + sens * (k + 1), // se tromper de pas
  last + sens * (k - 1),
  last + sens * 2 * k, // sauter un terme
  last + sens,
];

export const suiteContinuerGabarits: TutorBankItemV4[] = [
  // ★1 — le nombre suivant d'une suite qui monte, nombres nus.
  tpl(C, "1_addition", 1, "Trouve ce qu'on ajoute à chaque fois.", () => {
    const { k, t, next } = continuerPur(1, [2, 3, 4, 5, 10], [1, 20]);
    const p = perso();
    const last = t[3];
    return {
      text: un(QSUIVANT(suiteTxt(t), p)),
      ...qcmN(next, leurresSuivant(last, k, 1)),
      explanation: etapes("On cherche l'écart entre deux nombres voisins.", `${fr(t[1])} − ${fr(t[0])} = ${k} : on ajoute ${k} à chaque fois. ${fr(last)} + ${k} = ${fr(next)}.`, `Le nombre suivant est ${fr(next)}.`),
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
      ...qcmN(next, leurresSuivant(t[3], k, 1), s.u),
      explanation: etapes("On cherche ce qu'on ajoute d'une valeur à la suivante.", `On ajoute ${val(k, s.u)} à chaque fois : ${fr(t[3])} + ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, s.u)}.`),
      canvas: frise([...t.map((v) => val(v, s.u)), "?"], { titre: s.titre, fleches: t.map(() => `+${fr(k)}`) }),
    };
  }),

  // ★1 — le motif suivant d'une frise.
  tpl(C, "c3_motif_suivant", 1, "Cherche le groupe de motifs qui se répète.", () => {
    const { s, p, groupe, extra, a, utiles } = tirerMotif();
    const n = Math.min(8, Math.max(5, groupe.length * 2 + entre(0, groupe.length - 1)));
    const vus = Array.from({ length: n }, (_, i) => a(i));
    const juste = a(n);
    const q = un([s.suivant(p), `Quel est l'objet suivant ?`, `Que faut-il mettre à la place du « ? » ?`]);
    return {
      text: `${s.dit(p)} ${q}`,
      ...qcm(choixMo(juste), [...utiles.map(choixMo), choixMo(extra)]),
      explanation: etapes("On repère le groupe qui se répète, puis on continue dans le même ordre.", `Le groupe est ${groupe.map((g) => g.e).join(" ")}. Après ${vus[n - 1].e}, on reprend la suite du groupe.`, `L'objet suivant est : ${choixMo(juste)}.`),
      canvas: frise([...vus.map((v) => v.e), "?"], { titre: s.titre }),
    };
  }),

  // ★2 — le nombre suivant d'une suite qui descend (nombres nus ou situation).
  tpl(C, "2_soustraction", 2, "La suite descend : cherche ce qu'on enlève.", () => {
    if (Math.random() < 0.5) {
      const { k, t, next } = continuerPur(-1, [2, 3, 4, 5, 10, 25], [3, 30]);
      const p = perso();
      return {
        text: un(QSUIVANT(suiteTxt(t), p)),
        ...qcmN(next, leurresSuivant(t[3], k, -1)),
        explanation: etapes("La suite diminue : on cherche ce qu'on enlève.", `${fr(t[0])} − ${fr(t[1])} = ${k} : on enlève ${k} à chaque fois. ${fr(t[3])} − ${k} = ${fr(next)}.`, `Le nombre suivant est ${fr(next)}.`),
        canvas: frise([...t, "?"], { titre: "Une suite qui descend" }),
      };
    }
    const s = un(SIT_MOINS);
    const p = perso(s.m);
    const { k, t, next } = tirerSit(s, -1);
    return {
      text: `${s.dit(p, liste(t, s.u))} ${un(s.q(p))}`,
      ...qcmN(next, leurresSuivant(t[3], k, -1), s.u),
      explanation: etapes("Les valeurs diminuent : on cherche ce qu'on enlève.", `On enlève ${val(k, s.u)} à chaque fois : ${fr(t[3])} − ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, s.u)}.`),
      canvas: frise([...t.map((v) => val(v, s.u)), "?"], { titre: s.titre }),
    };
  }),

  // ★2 — le terme manquant au milieu.
  tpl(C, "3_terme_manquant", 2, "Le nombre manquant respecte la même règle que les autres.", () => {
    const sens: 1 | -1 = Math.random() < 0.65 ? 1 : -1;
    const k = un([2, 3, 4, 5, 6, 10]);
    const a = sens === 1 ? entre(1, 25) : entre(1, 25) + 4 * k;
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
      ...qcmN(juste, [juste + 1, juste - 1, t[i - 1] - sens * k, juste + sens * 2 * k, t[i - 1] + sens]),
      explanation: etapes("On trouve la règle avec deux nombres voisins connus, puis on l'applique.", `La règle est « ${sens === 1 ? "ajouter" : "enlever"} ${k} » : ${fr(t[i - 1])} ${sens === 1 ? "+" : "−"} ${k} = ${fr(juste)}, et ${fr(juste)} ${sens === 1 ? "+" : "−"} ${k} = ${fr(t[i + 1])}.`, `Le nombre manquant est ${fr(juste)}.`),
      canvas: frise(vus, { titre: "Le nombre manquant" }),
    };
  }),

  // ★2 — suites décimales simples.
  tpl(C, "c6_decimaux", 2, "Ajoute le même nombre décimal à chaque fois : attention aux dixièmes.", () => {
    const s = un(SIT_DEC);
    const p = perso(s.m);
    const { k, t, next } = tirerSit(s, 1, true);
    const last = t[3];
    // L'erreur de retenue : 2,5 + 0,5 écrit « 2,10 », c'est-à-dire 2,1.
    const dixiemes = Math.round((last % 1) * 10) + Math.round((k % 1) * 10);
    const retenue = dixiemes >= 10 ? arr(Math.floor(last) + Math.floor(k) + dixiemes / 100) : arr(next + 1);
    const faux = [arr(last + k / 10), arr(last + 10 * k), arr(last - k), retenue, arr(next + 0.1)];
    const pur = Math.random() < 0.4;
    const text = pur ? un(QSUIVANT(suiteTxt(t), p)) : `${s.dit(p, liste(t, s.u))} ${un(s.q(p))}`;
    const u = pur ? "" : s.u;
    return {
      text,
      ...qcmN(next, faux, u),
      explanation: etapes("On cherche ce qu'on ajoute d'un terme au suivant.", `On ajoute ${fr(k)} à chaque fois : ${fr(last)} + ${fr(k)} = ${fr(next)}.`, `La réponse est ${val(next, u)}.`),
      canvas: frise([...t.map((v) => val(v, u)), "?"], { titre: pur ? "Une suite de nombres décimaux" : s.titre }),
    };
  }),

  // ★3 — le terme d'un rang éloigné (tableau rang → terme).
  tpl(C, "c7_rang", 3, "Du rang 1 au rang N, on fait N − 1 sauts.", () => {
    const k = un([2, 3, 4, 5, 6, 10]);
    const a = entre(2, 15);
    const n = entre(6, 10);
    const t = termes(a, k);
    const juste = a + (n - 1) * k;
    const s = suiteTxt(t);
    const p = perso();
    const text = un([
      `Voici le début d'une suite : ${s}. Quel est son ${n}e terme ?`,
      `Dans la suite ${s}, quel nombre est au rang ${n} ?`,
      `On continue la suite ${s} avec la même règle. Quel nombre trouve-t-on à la ${n}e case ?`,
      `La suite commence par ${s}. Quel sera le ${n}e nombre ?`,
      `${p.nom} écrit la suite ${s} et continue avec la même règle. Quel sera son ${n}e nombre ?`,
      `Sans tout écrire, trouve le ${n}e terme de la suite ${s}.`,
      `Le tableau montre les premiers termes de la suite ${s}. Que vaut le terme du rang ${n} ?`,
      `${p.nom} doit remplir la ${n}e case de la suite ${s}. Quel nombre doit-${p.il} écrire ?`,
    ]);
    return {
      text,
      ...qcmN(juste, [a + n * k, n * k, t[3] + k, juste - k, juste + 1]),
      explanation: etapes(`Du 1er terme au ${n}e, il y a ${n - 1} sauts de ${k}.`, `${a} + ${n - 1} × ${k} = ${a} + ${(n - 1) * k} = ${juste}.`, `Le ${n}e terme est ${juste}.`),
      canvas: tableauRang("Rang", "Terme", [1, 2, 3, 4, "…", n], [...t, "…", "?"], "Rang → terme"),
    };
  }),

  // ★3 — deux cases plus loin.
  tpl(C, "c8_deux_pas", 3, "Il faut faire deux sauts, pas un seul.", () => {
    const sens: 1 | -1 = Math.random() < 0.6 ? 1 : -1;
    const k = un([3, 4, 5, 6, 7, 8, 9, 11, 12, 15]);
    const a = sens === 1 ? entre(2, 40) : entre(5, 40) + 5 * k;
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
      `La suite ${s} continue. Quel nombre sera écrit dans la 6e case ?`,
    ]);
    return {
      text,
      ...qcmN(juste, [t[3] + sens * k, t[3] - 2 * sens * k, t[3] + 3 * sens * k, juste + 1, juste - 1]),
      explanation: etapes(`La règle est « ${sens === 1 ? "ajouter" : "enlever"} ${k} », et on la fait deux fois.`, `${fr(t[3])} ${sens === 1 ? "+" : "−"} ${k} = ${fr(t[3] + sens * k)}, puis ${fr(t[3] + sens * k)} ${sens === 1 ? "+" : "−"} ${k} = ${fr(juste)}.`, `Le nombre cherché est ${fr(juste)}.`),
      canvas: frise([...t, "…", "?"], { titre: "Deux cases plus loin" }),
    };
  }),

  // ★3 — suites qui doublent (ou triplent, ou ×10).
  tpl(C, "c9_double", 3, "Attention : l'écart change, c'est une multiplication.", () => {
    const f = un([2, 2, 3, 10]);
    const a = f === 10 ? entre(1, 9) : f === 3 ? entre(1, 4) : entre(1, 12);
    const t = [a, a * f, a * f * f, a * f ** 3];
    const juste = a * f ** 4;
    const p = perso();
    const s = suiteTxt(t);
    const quoi = un([
      ["nénuphars sur l'étang", "le jour suivant"],
      ["lecteurs du journal de l'école", "la semaine suivante"],
      ["graines récoltées par la jardinière", "l'année suivante"],
      ["vues de la vidéo de la classe", "le jour suivant"],
      ["bactéries observées par le biologiste", "l'heure suivante"],
    ] as const);
    const text = un([
      `Continue la suite : ${s} ; ?`,
      `${p.nom} écrit la suite ${s}. Quel nombre écrit-${p.il} ensuite ?`,
      `Quel est le terme suivant de la suite ${s} ?`,
      `Défi : quel nombre vient après ${s} ?`,
      ...(f === 10 ? [] : [`Voici le nombre de ${quoi[0]} : ${s}. Combien y en aura-t-il ${quoi[1]} si la règle continue ?`]),
      `${p.nom} remarque que chaque nombre de la suite ${s} se calcule à partir du précédent. Quel est le suivant ?`,
    ]);
    return {
      text,
      ...qcmN(juste, [t[3] + (t[3] - t[2]), t[3] + a, t[3] * (f + 1), t[3] + f, juste * f]),
      explanation: etapes("Les écarts ne sont pas égaux : on regarde si on multiplie.", `${a} × ${f} = ${fr(t[1])}, ${fr(t[1])} × ${f} = ${fr(t[2])}… donc ${fr(t[3])} × ${f} = ${fr(juste)}.`, `Le nombre suivant est ${fr(juste)}.`),
      canvas: frise([...t, "?"], { titre: "Une suite qui se multiplie" }),
    };
  }),

  // ★3 — le motif d'un rang éloigné.
  tpl(C, "c10_motif_rang", 3, "Compte combien de motifs il y a dans le groupe qui se répète.", () => {
    const m = tirerMotif();
    return motifRang(m);
  }),
];

function motifRang(m: ReturnType<typeof tirerMotif>): G {
  const { s, p, groupe, extra, a, utiles } = m;
  const g = groupe.length;
  const vus = Array.from({ length: Math.min(8, g * 2) }, (_, i) => a(i));
  const n = entre(Math.max(10, g * 3 + 1), 30);
  const juste = a(n - 1);
  const q = Math.floor((n - 1) / g);
  const r = ((n - 1) % g) + 1;
  const calcul =
    r === g
      ? `Le groupe ${groupe.map((x) => x.e).join(" ")} a ${g} motifs. ${g} × ${q + 1} = ${n} : le ${n}e est le dernier d'un groupe.`
      : `Le groupe ${groupe.map((x) => x.e).join(" ")} a ${g} motifs. ${g} × ${q} = ${g * q} : le ${g * q}e finit un groupe, le ${n}e est le ${r === 1 ? "1er" : `${r}e`} du groupe suivant.`;
  return {
    text: `${s.dit(p)} ${s.rang(n)}`,
    ...qcm(choixMo(juste), [...utiles.map(choixMo), choixMo(extra)]),
    explanation: etapes("On repère le groupe qui se répète et on compte par groupes entiers.", calcul, `Le ${n}e est : ${choixMo(juste)}.`),
    canvas: frise([...vus.map((v) => v.e), "…"], { titre: s.titre, manquant: -1 }),
  };
}

/* ═════════════════════════ SUITE_REGLE ═════════════════════════ */

const R = "suite_regle";

const QREGLE = (s: string, p: Perso) => [
  `Quelle est la règle de la suite ${s} ?`,
  `Comment passe-t-on d'un nombre au suivant dans la suite ${s} ?`,
  `${p.nom} a écrit la suite ${s}. Quelle règle a-t-${p.il} utilisée ?`,
  `Observe la suite ${s}. Quelle est sa règle ?`,
  `Par quelle règle obtient-on la suite ${s} ?`,
];
const QREGLE_SIT = ["Quelle est la règle de cette suite ?", "Comment passe-t-on d'une valeur à la suivante ?", "Quelle règle suit ce relevé ?"];

const ajout = (k: number, u = "") => `ajouter ${val(k, u)}`;
const retrait = (k: number, u = "") => `enlever ${val(k, u)}`;
const fois = (f: number) => `multiplier par ${fr(f)}`;

export const suiteRegleGabarits: TutorBankItemV4[] = [
  // ★2 — règle additive, nombres nus.
  tpl(R, "1_addition", 2, "Calcule l'écart : le nombre suivant moins le précédent.", () => {
    const k = un([2, 3, 4, 5, 6, 7, 8, 9, 10, 20]);
    const a = entre(1, 30);
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
      const k = un([2, 3, 4, 5, 6, 10, 25]);
      const a = entre(2, 30) + 3 * k;
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
    const { s, p, patron, groupe, a } = tirerMotif();
    const objet = (c: string) => groupe[patron.indexOf(c)];
    const ecrire = (mot: string) => mot.split("").map((c) => objet(c).e).join(" ");
    const FAUX: Record<string, string[]> = {
      AB: ["ABB", "AAB", "ABA"],
      ABC: ["AB", "ACB", "ABCC"],
      AAB: ["AB", "ABB", "AABB"],
      ABB: ["AB", "AAB", "ABBB"],
      AABB: ["AB", "AAB", "ABB"],
    };
    const n = Math.min(8, groupe.length * 2 + 1);
    const vus = Array.from({ length: n }, (_, i) => a(i).e);
    const text = `${s.dit(p)} ${un(["Quel groupe de motifs se répète, depuis le début ?", "Quel est le groupe qui se répète dans cette frise ?", `Quelle suite de ${s.mot.endsWith("eau") ? `${s.mot}x` : `${s.mot}s`} revient sans cesse, depuis le début ?`])}`;
    return {
      text,
      ...qcm(ecrire(patron), FAUX[patron].map(ecrire)),
      explanation: etapes("On lit la frise depuis le début et on cherche quand elle recommence.", `La frise recommence après ${groupe.length} motifs : ${ecrire(patron)}.`, `Le groupe qui se répète est ${ecrire(patron)}.`),
      canvas: frise([...vus, "…"], { titre: s.titre, manquant: -1 }),
    };
  }),

  // ★3 — règle multiplicative.
  tpl(R, "3_multiplication", 3, "Les écarts grandissent ? Essaie une multiplication.", () => {
    const f = un([2, 2, 3, 10]);
    const a = f === 10 ? entre(1, 9) : f === 3 ? entre(1, 5) : entre(1, 15);
    const t = [a, a * f, a * f * f, a * f ** 3];
    const p = perso();
    return {
      text: un(QREGLE(suiteTxt(t), p)),
      ...qcm(fois(f), [ajout(t[1] - t[0]), ajout(f), fois(f + 1), ajout(t[2] - t[1])]),
      explanation: etapes("Les écarts ne sont pas égaux : on vérifie si on multiplie toujours par le même nombre.", `${a} × ${f} = ${fr(t[1])}, ${fr(t[1])} × ${f} = ${fr(t[2])}, ${fr(t[2])} × ${f} = ${fr(t[3])}.`, `La règle est : multiplier par ${f}.`),
      canvas: frise(t, { titre: "Quelle est la règle ?" }),
    };
  }),

  // ★3 — règle décimale.
  tpl(R, "r6_decimaux", 3, "Calcule l'écart en dixièmes.", () => {
    const k = un([0.1, 0.2, 0.5, 1.5, 2.5]);
    const sens: 1 | -1 = Math.random() < 0.7 ? 1 : -1;
    const a = k < 0.5 ? arr(entre(1, 5) + entre(1, 9) / 10) : arr(entre(1, 6) + un([0, 0.5]));
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

  // ★3 — vérifier une règle annoncée.
  tpl(R, "4_piege_ecarts_variables", 3, "Une règle doit marcher à CHAQUE passage.", () => {
    const k = un([2, 3, 4, 5, 10]);
    const a = entre(2, 20);
    const cas = un(["oui", "debut", "sens"] as const);
    const t =
      cas === "oui" ? termes(a, k) : cas === "debut" ? [a, a + k, a + 2 * k + 1, a + 3 * k + 3] : termes(a + 3 * k, -k);
    const p = perso();
    const s = suiteTxt(t);
    const OUI = "Oui, à chaque passage";
    const DEBUT = "Non, ça ne marche qu'au début";
    const SENS = `Non, on enlève ${k}`;
    const FAUX4 = `Non, on ajoute ${k + 1}`;
    const juste = cas === "oui" ? OUI : cas === "debut" ? DEBUT : SENS;
    const text = un([
      `${p.nom} affirme : « Dans la suite ${s}, on ajoute toujours ${k}. » A-t-${p.il} raison ?`,
      `D'après ${p.nom}, la règle de la suite ${s} est « ajouter ${k} ». Est-ce vrai ?`,
      `La suite ${s} suit-elle la règle « ajouter ${k} » ?`,
    ]);
    const calc =
      cas === "oui"
        ? `${fr(t[1])} − ${fr(t[0])} = ${k}, ${fr(t[2])} − ${fr(t[1])} = ${k}, ${fr(t[3])} − ${fr(t[2])} = ${k}.`
        : cas === "debut"
          ? `${fr(t[1])} − ${fr(t[0])} = ${k}, mais ${fr(t[2])} − ${fr(t[1])} = ${k + 1}.`
          : `La suite descend : ${fr(t[0])} − ${fr(t[1])} = ${k}, on enlève ${k}.`;
    return {
      text,
      ...qcm(juste, [OUI, DEBUT, SENS, FAUX4]),
      explanation: etapes("On vérifie chaque passage entre deux nombres voisins.", calc, `Réponse : ${juste}.`),
      canvas: frise(t, { titre: "Vérifier une règle" }),
    };
  }),

  // ★3 — la règle lue dans un tableau rang → terme.
  tpl(R, "r8_tableau", 3, "Compare deux colonnes voisines du tableau.", () => {
    const op = un(["+", "-", "×"] as const);
    const k = op === "×" ? un([2, 3]) : un([3, 4, 5, 6, 7, 8, 9, 11, 12, 15]);
    const a = op === "×" ? entre(1, 6) : op === "+" ? entre(1, 20) : entre(5, 20) + 3 * k;
    const t = op === "×" ? [a, a * k, a * k * k, a * k ** 3] : termes(a, op === "+" ? k : -k);
    const juste = op === "×" ? fois(k) : op === "+" ? ajout(k) : retrait(k);
    const faux =
      op === "×" ? [ajout(t[1] - t[0]), ajout(k), fois(k + 1)] : op === "+" ? [retrait(k), ajout(k + 1), fois(2), ajout(t[0])] : [ajout(k), retrait(k - 1), retrait(2 * k)];
    const s = suiteTxt(t);
    const text = un([
      `Le tableau donne les premiers termes d'une suite : ${s}. Quelle est sa règle ?`,
      `Dans ce tableau, les termes des rangs 1 à 4 sont ${s}. Quelle règle permet de passer d'un terme au suivant ?`,
      `D'un rang au suivant, que fait-on aux termes ${s} de ce tableau ?`,
    ]);
    return {
      text,
      ...qcm(juste, faux),
      explanation: etapes("On compare chaque terme au suivant.", op === "×" ? `${fr(t[0])} × ${k} = ${fr(t[1])}, ${fr(t[1])} × ${k} = ${fr(t[2])}.` : `L'écart est ${k} à chaque colonne, la suite ${op === "+" ? "monte" : "descend"}.`, `La règle est : ${juste}.`),
      canvas: tableauRang("Rang", "Terme", [1, 2, 3, 4], t),
    };
  }),
];

/* ═════════════════════════ SUITE_CROISSANTE_DECROISSANTE ═════════════════════════ */

const K = "suite_croissante_decroissante";
const CR = "croissante";
const DE = "décroissante";
const NI = "ni l’une ni l’autre";
const SENS3 = { format: "qcm" as const, comparator: "mcq_exact" as const };
const sens3 = (juste: string) => ({ ...SENS3, choices: [CR, DE, NI].sort(() => Math.random() - 0.5), expected: [juste] });

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
  GR("Un train démarre et accélère : on relève sa vitesse toutes les 10 secondes.", true, "km/h", [10, 15, 20], 10, 30, 5),
  GR("Le soleil se couche : on relève la température chaque heure.", false, "°C", [1, 2], 12, 20),
  GR("Une file d'attente avance au guichet : on compte les personnes devant nous chaque minute.", false, "", [1, 2], 2, 8),
  GR("Un potier remplit un four de bols : il compte les bols posés après chaque étagère.", true, "", [6, 8, 10], 6, 20),
  GR("Un coureur s'éloigne de la ligne de départ : son coach note la distance chaque minute.", true, "m", [150, 200, 250], 150, 300, 50),
  GR("Un gâteau se mange part après part : on compte les parts qui restent.", false, "", [1, 2], 1, 4),
];

export const suiteCroissanteGabarits: TutorBankItemV4[] = [
  // ★1 — nombres nus qui montent ou descendent.
  tpl(K, "1", 1, "Regarde si les nombres montent ou descendent.", () => {
    const sens: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
    const k = un([1, 2, 3, 5, 10, 100]);
    const a = (k === 100 ? tire(100, 600, 100) : entre(1, 40)) + (sens === -1 ? 3 * k : 0);
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
    const a = entre(3, 30);
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
    const a = entre(2, 30);
    const k = un([2, 3, 4, 5, 10]);
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
      `La maîtresse demande une suite ${cherche}. Quelle réponse est juste ?`,
      `${p.nom} doit entourer la suite ${cherche}. Laquelle doit-${p.il} entourer ?`,
      `Trouve la suite qui est ${cherche} à chaque passage.`,
    ]);
    return {
      text,
      ...qcm(juste, [suiteTxt(cherche === CR ? descend : monte), suiteTxt(presque), suiteTxt(plat)]),
      explanation: etapes(`Une suite ${cherche} ${cherche === CR ? "monte" : "descend"} à chaque passage.`, `${juste} : ${cherche === CR ? "chaque nombre est plus grand" : "chaque nombre est plus petit"} que le précédent. L'autre suite qui commence bien change de sens à la fin.`, `La bonne suite est ${juste}.`),
    };
  }),

  // ★2 — décimaux : 1,2 ; 1,25 ; 1,3 (le piège de la longueur du nombre).
  tpl(K, "k5_decimaux", 2, "Compare les décimaux chiffre à chiffre, en commençant par les dixièmes.", () => {
    const sens: 1 | -1 = Math.random() < 0.5 ? 1 : -1;
    const b = entre(1, 9);
    const d = entre(1, 6);
    const pas = un([0.05, 0.1, 0.2]);
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

  // ★3 — quel nombre mettre à la place du « ? » pour garder le sens ?
  tpl(K, "3_piege_monte_descend", 3, "Le nombre caché doit être entre ses deux voisins.", () => {
    const cherche = un([CR, DE]);
    const a = entre(5, 60);
    const e1 = entre(2, 6);
    const e2 = entre(3, 7);
    const b = a + e1;
    const c = b + e2;
    const d = c + entre(2, 6);
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
      ...qcmN(juste, faux),
      explanation: etapes(`Le nombre caché doit être entre ${cherche === CR ? b : c} et ${cherche === CR ? c : b}.`, `${b} < ${juste} < ${c}. Les autres nombres font ${cherche === CR ? "descendre" : "monter"} la suite à un passage.`, `On peut écrire ${juste}.`),
      canvas: frise(t, { titre: `Garder une suite ${cherche}` }),
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
    const L = (l: number[]) => l.map((v) => val(v, g.u)).join(" ; ");
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
    const cas = un(["plus", "moins", "fois", "zero"] as const);
    const a = entre(5, 60);
    const k = un([2, 3, 4, 5, 6, 7, 8, 9]);
    const regle = cas === "plus" ? `on ajoute ${k}` : cas === "moins" ? `on enlève ${k}` : cas === "fois" ? "on multiplie par 2" : "on ajoute 0";
    const juste = cas === "moins" ? DE : cas === "zero" ? NI : CR;
    const depart = cas === "moins" ? a + 10 * k : a;
    const t = cas === "fois" ? [depart, depart * 2, depart * 4] : termes(depart, cas === "plus" ? k : cas === "moins" ? -k : 0, 3);
    const p = perso();
    const regleIl = regle.replace(/^on /, `${p.il} `);
    const text = un([
      `${p.nom} part de ${depart} et, à chaque étape, ${regleIl}. Sa suite est-elle croissante ou décroissante ?`,
      `Une suite commence à ${depart}. À chaque étape, ${regle}. Comment est cette suite ?`,
      `On part de ${depart} et ${regle} à chaque fois. La suite obtenue est-elle croissante ou décroissante ?`,
      `Pour fabriquer une suite, ${p.nom} écrit ${depart}, puis ${regleIl} encore et encore. Comment sera sa suite ?`,
      `Règle du jeu : on commence à ${depart} et, à chaque tour, ${regle}. Les nombres obtenus forment-ils une suite croissante ou décroissante ?`,
    ]);
    return {
      text,
      ...sens3(juste),
      explanation: etapes("On imagine les premiers termes.", `${suiteTxt(t)} …`, juste === NI ? "Les nombres ne changent pas : ni l'une ni l'autre." : `La suite est ${juste}.`),
      canvas: frise([...t, "…"], { titre: "D'après la règle", manquant: -1 }),
    };
  }),
];

/* ═════════════════════════ SUITE_DEFI ═════════════════════════ */

const D = "suite_defi";

/** Une suite qui monte, racontée au rang 1, 2, 3… */
type SitRang = { titre: string; m?: readonly [string, string]; coin: string; ligne: string; u: string; dit: (p: Perso, a: number, k: number) => string; q: (p: Perso, n: number) => string; pas: number[]; min: number; max: number };
const SITS_RANG: SitRang[] = [
  { titre: "La lecture", coin: "Jour", ligne: "Pages", u: "pages", dit: (p, a, k) => `Le 1er jour, ${p.nom} lit ${a} pages. Chaque jour, ${p.il} lit ${k} pages de plus que la veille.`, q: (p, n) => `Combien de pages lira-t-${p.il} le ${n}e jour ?`, pas: [2, 3, 4, 5], min: 3, max: 12 },
  { titre: "L'entraînement", m: ["athlète", "athlète"], coin: "Semaine", ligne: "Tours", u: "tours", dit: (p, a, k) => `${p.txt} fait ${a} tours de piste la 1re semaine, puis ${k} tours de plus chaque semaine.`, q: (p, n) => `Combien de tours fera-t-${p.il} la ${n}e semaine ?`, pas: [2, 3, 4], min: 4, max: 10 },
  { titre: "Les économies", coin: "Mois", ligne: "Euros", u: "€", dit: (p, a, k) => `${p.nom} a ${a} € dans sa tirelire le 1er mois. Chaque mois, ${p.il} ajoute ${k} €.`, q: (p, n) => `Combien aura-t-${p.il} le ${n}e mois ?`, pas: [5, 10, 15, 20], min: 5, max: 30 },
  { titre: "Les gradins", m: ["architecte", "architecte"], coin: "Rangée", ligne: "Places", u: "places", dit: (p, a, k) => `${p.txt} dessine des gradins : ${a} places au 1er rang, et ${k} places de plus à chaque rang.`, q: (_p, n) => `Combien de places y aura-t-il au ${n}e rang ?`, pas: [2, 4, 5, 6], min: 10, max: 30 },
  { titre: "La plante", m: ["botaniste", "botaniste"], coin: "Semaine", ligne: "Hauteur (cm)", u: "cm", dit: (p, a, k) => `${p.txt} mesure une plante : ${a} cm la 1re semaine, puis elle grandit de ${k} cm chaque semaine.`, q: (_p, n) => `Combien mesurera-t-elle la ${n}e semaine ?`, pas: [2, 3, 4, 5], min: 3, max: 15 },
  { titre: "Les cartons", m: ["magasinière", "magasinier"], coin: "Heure", ligne: "Cartons", u: "cartons", dit: (p, a, k) => `${p.txt} a rangé ${a} cartons à la fin de la 1re heure, puis ${k} de plus chaque heure.`, q: (p, n) => `Combien de cartons aura-t-${p.il} rangés à la fin de la ${n}e heure ?`, pas: [6, 8, 10, 12], min: 6, max: 20 },
  { titre: "La pyramide de boîtes", m: ["vendeuse", "vendeur"], coin: "Étage", ligne: "Boîtes", u: "boîtes", dit: (p, a, k) => `${p.txt} empile des boîtes en vitrine : ${a} boîtes à l'étage du haut, et ${k} de plus à chaque étage en descendant.`, q: (_p, n) => `Combien de boîtes y a-t-il au ${n}e étage en partant du haut ?`, pas: [2, 3], min: 2, max: 5 },
  { titre: "Le vélo", coin: "Jour", ligne: "km", u: "km", dit: (p, a, k) => `Pendant ses vacances, ${p.nom} roule ${a} km le 1er jour, puis ${k} km de plus chaque jour.`, q: (p, n) => `Combien de kilomètres roulera-t-${p.il} le ${n}e jour ?`, pas: [2, 3, 5], min: 5, max: 15 },
  { titre: "Les clients fidèles", m: ["fromagère", "fromager"], coin: "Mois", ligne: "Clients", u: "clients", dit: (p, a, k) => `${p.txt} a ${a} clients fidèles le 1er mois, puis ${k} de plus chaque mois.`, q: (p, n) => `Combien de clients fidèles aura-t-${p.il} le ${n}e mois ?`, pas: [3, 4, 5, 6], min: 10, max: 30 },
];

/** Des objets posés à intervalles réguliers depuis le départ. */
type SitPos = { titre: string; m: readonly [string, string]; dit: (p: Perso, k: number) => string; q: (n: number) => string; objet: string; pas: number[] };
const SITS_POS: SitPos[] = [
  { titre: "Les poteaux de la clôture", m: ["agricultrice", "agriculteur"], dit: (p, k) => `${p.txt} plante un poteau de clôture tous les ${k} m. Le 1er poteau est à ${k} m du portail.`, q: (n) => `À combien de mètres du portail est le ${n}e poteau ?`, objet: "Poteau", pas: [2, 3, 4, 5] },
  { titre: "Les arbres de l'allée", m: ["paysagiste", "paysagiste"], dit: (p, k) => `${p.txt} plante un arbre tous les ${k} m le long d'une allée. Le 1er arbre est à ${k} m de l'entrée.`, q: (n) => `À combien de mètres de l'entrée sera le ${n}e arbre ?`, objet: "Arbre", pas: [4, 5, 6, 8, 10] },
  { titre: "Les lampadaires", m: ["électricienne", "électricien"], dit: (p, k) => `${p.txt} installe un lampadaire tous les ${k} m dans une rue. Le 1er est à ${k} m du carrefour.`, q: (n) => `À quelle distance du carrefour sera le ${n}e lampadaire ?`, objet: "Lampadaire", pas: [10, 15, 20, 25] },
  { titre: "Les bouées", m: ["maître-nageuse", "maître-nageur"], dit: (p, k) => `${p.txt} place une bouée tous les ${k} m depuis la plage. La 1re est à ${k} m du bord.`, q: (n) => `À combien de mètres du bord sera la ${n}e bouée ?`, objet: "Bouée", pas: [5, 10, 20] },
  { titre: "Les plots du parcours", m: ["entraîneuse", "entraîneur"], dit: (p, k) => `${p.txt} pose un plot tous les ${k} m sur la piste. Le 1er plot est à ${k} m de la ligne de départ.`, q: (n) => `À combien de mètres du départ sera le ${n}e plot ?`, objet: "Plot", pas: [3, 4, 5, 6] },
  { titre: "Les panneaux du sentier", m: ["garde forestière", "garde forestier"], dit: (p, k) => `${p.txt} pose un panneau tous les ${k * 100} m sur un sentier. Le 1er est à ${k * 100} m du parking.`, q: (n) => `À combien de mètres du parking sera le ${n}e panneau ?`, objet: "Panneau", pas: [2, 3, 5] },
];

/** Une quantité qui baisse chaque jour. */
type SitReste = { titre: string; m?: readonly [string, string]; u: string; coin: string; dit: (p: Perso, s0: number, k: number) => string; q: (n: number) => string; pas: number[]; mult: number };
const SITS_RESTE: SitReste[] = [
  { titre: "La cuve d'eau", m: ["maraîchère", "maraîcher"], u: "L", coin: "Jour", dit: (p, s0, k) => `La cuve de ${p.txt} contient ${s0} L. Chaque jour, ${p.il} prend ${k} L pour arroser.`, q: (n) => `Combien de litres restera-t-il au bout de ${n} jours ?`, pas: [5, 10, 20], mult: 10 },
  { titre: "Le livre", u: "pages", coin: "Soir", dit: (p, s0, k) => `Il reste ${s0} pages à lire dans le livre de ${p.nom}. Chaque soir, ${p.il} en lit ${k}.`, q: (n) => `Combien de pages restera-t-il après ${n} soirs ?`, pas: [4, 5, 6, 8], mult: 2 },
  { titre: "Le bocal de bonbons", m: ["confiseuse", "confiseur"], u: "bonbons", coin: "Heure", dit: (p, s0, k) => `${p.txt} remplit un bocal de ${s0} bonbons. Chaque heure, ${p.il} en vend ${k}.`, q: (n) => `Combien de bonbons restera-t-il au bout de ${n} heures ?`, pas: [6, 8, 12, 15], mult: 5 },
  { titre: "L'argent de poche", u: "€", coin: "Semaine", dit: (p, s0, k) => `${p.nom} a ${s0} €. Chaque semaine, ${p.il} dépense ${k} €.`, q: (n) => `Combien lui restera-t-il au bout de ${n} semaines ?`, pas: [2, 3, 4, 5], mult: 2 },
  { titre: "La batterie", u: "%", coin: "Heure", dit: (p, s0, k) => `La batterie du téléphone de ${p.nom} est à ${s0} %. Elle perd ${k} % chaque heure.`, q: (n) => `À combien sera-t-elle au bout de ${n} heures ?`, pas: [5, 10], mult: 5 },
  { titre: "Les cahiers en stock", m: ["secrétaire de l'école", "secrétaire de l'école"], u: "cahiers", coin: "Jour", dit: (p, s0, k) => `${p.txt} a ${s0} cahiers en réserve. Chaque jour, ${p.il} en distribue ${k}.`, q: (n) => `Combien de cahiers restera-t-il après ${n} jours ?`, pas: [6, 8, 10, 12], mult: 10 },
  { titre: "La corde à couper", m: ["alpiniste", "alpiniste"], u: "m", coin: "Morceau", dit: (p, s0, k) => `${p.txt} a une corde de ${s0} m. ${cap(p.il)} coupe des morceaux de ${k} m, l'un après l'autre.`, q: (n) => `Quelle longueur restera-t-il après ${n} morceaux ?`, pas: [2, 3, 4, 5], mult: 5 },
];

/** Deux suites qui se rejoignent. */
type SitDuo = { titre: string; coin: string; u: string; dit: (p: Perso, q: Perso, a: number, k1: number, b: number, k2: number) => string; quand: string };
const SITS_DUO: SitDuo[] = [
  { titre: "Les deux tirelires", coin: "Semaine", u: "€", dit: (p, q, a, k1, b, k2) => `${p.nom} a ${a} € et ajoute ${k1} € chaque semaine. ${q.nom} a ${b} € et ajoute ${k2} € chaque semaine.`, quand: "Au bout de combien de semaines auront-ILS la même somme ?" },
  { titre: "Les deux plantes", coin: "Semaine", u: "cm", dit: (p, q, a, k1, b, k2) => `La plante de ${p.nom} mesure ${a} cm et grandit de ${k1} cm par semaine. Celle de ${q.nom} mesure ${b} cm et grandit de ${k2} cm par semaine.`, quand: "Au bout de combien de semaines auront-elles la même taille ?" },
  { titre: "Les deux albums", coin: "Mois", u: "cartes", dit: (p, q, a, k1, b, k2) => `${p.nom} a ${a} cartes et en colle ${k1} de plus chaque mois. ${q.nom} en a ${b} et en colle ${k2} de plus chaque mois.`, quand: "Au bout de combien de mois auront-ILS le même nombre de cartes ?" },
  { titre: "Les deux coureurs", coin: "Minute", u: "tours", dit: (p, q, a, k1, b, k2) => `Dans une course de relais, l'équipe de ${p.nom} a fait ${a} tours et en fait ${k1} par minute. L'équipe de ${q.nom} a fait ${b} tours et en fait ${k2} par minute.`, quand: "Au bout de combien de minutes auront-elles fait le même nombre de tours ?" },
];

/** Une figure qui grandit : allumettes, tables, wagons… (valeur = a + k × (n − 1)). */
type SitFig = { pourquoi: string; titre: string; m?: readonly [string, string]; coin: string; ligne: string; a: number; k: number; dit: (p: Perso) => string; q: (n: number) => string; seul: number; u: string };
const SITS_FIG: SitFig[] = [
  { pourquoi: "chaque carré collé partage un côté avec le précédent, il n'ajoute que 3 allumettes", titre: "Les carrés d'allumettes", coin: "Carrés", ligne: "Allumettes", a: 4, k: 3, seul: 4, u: "allumettes", dit: (p) => `${p.nom} aligne des carrés faits d'allumettes, collés les uns aux autres : 1 carré → 4 allumettes, 2 carrés → 7, 3 carrés → 10.`, q: (n) => `Combien d'allumettes faut-il pour ${n} carrés ?` },
  { pourquoi: "chaque triangle collé partage un côté avec le précédent, il n'ajoute que 2 allumettes", titre: "Les triangles d'allumettes", coin: "Triangles", ligne: "Allumettes", a: 3, k: 2, seul: 3, u: "allumettes", dit: (p) => `${p.nom} forme une bande de triangles d'allumettes, collés pointe en haut puis pointe en bas : 1 triangle → 3 allumettes, 2 triangles → 5, 3 triangles → 7.`, q: (n) => `Combien d'allumettes faut-il pour ${n} triangles ?` },
  { pourquoi: "chaque table collée ajoute 2 chaises, une de chaque côté", titre: "Les tables de la cantine", m: ["cantinière", "cantinier"], coin: "Tables", ligne: "Chaises", a: 4, k: 2, seul: 4, u: "chaises", dit: (p) => `${p.txt} met des tables carrées bout à bout : 1 table → 4 chaises, 2 tables → 6 chaises, 3 tables → 8 chaises.`, q: (n) => `Combien de chaises peut-on placer autour de ${n} tables ?` },
  { pourquoi: "chaque maison collée partage un mur avec la précédente, elle n'ajoute que 5 allumettes", titre: "Les maisons d'allumettes", coin: "Maisons", ligne: "Allumettes", a: 6, k: 5, seul: 6, u: "allumettes", dit: (p) => `${p.nom} construit une rangée de maisons d'allumettes (un carré et un toit), collées entre elles : 1 maison → 6 allumettes, 2 maisons → 11, 3 maisons → 16.`, q: (n) => `Combien d'allumettes faut-il pour ${n} maisons ?` },
  { pourquoi: "chaque wagon ajoute 4 roues", titre: "Le train de wagons", m: ["cheminote", "cheminot"], coin: "Wagons", ligne: "Roues", a: 6, k: 4, seul: 6, u: "roues", dit: (p) => `${p.txt} compte les roues d'un train : avec 1 wagon, le train a 6 roues ; avec 2 wagons, 10 roues ; avec 3 wagons, 14 roues.`, q: (n) => `Combien de roues aura le train avec ${n} wagons ?` },
  { pourquoi: "chaque case collée partage une planche avec la précédente, elle n'en ajoute que 3", titre: "La barrière en bois", m: ["menuisière", "menuisier"], coin: "Cases", ligne: "Planches", a: 4, k: 3, seul: 4, u: "planches", dit: (p) => `${p.txt} fabrique une barrière en cases carrées collées : 1 case → 4 planches, 2 cases → 7 planches, 3 cases → 10 planches.`, q: (n) => `Combien de planches faut-il pour ${n} cases ?` },
];

export const suiteDefiGabarits: TutorBankItemV4[] = [
  // ★3 — le terme d'un rang donné, en situation.
  tpl(D, "d1_rang_contexte", 3, "Du 1er au Ne, on ajoute N − 1 fois.", () => {
    const s = un(SITS_RANG);
    const p = perso(s.m);
    const k = un(s.pas);
    const a = entre(s.min, s.max);
    const n = entre(5, 10);
    const juste = a + (n - 1) * k;
    const vals = termes(a, k);
    return {
      text: `${s.dit(p, a, k)} ${s.q(p, n)}`,
      ...qcmN(juste, [a + n * k, n * k, a + k, juste - k], s.u),
      explanation: etapes(`Du 1er au ${n}e, on ajoute ${n - 1} fois ${k} (pas ${n} fois : le 1er est déjà compté).`, `${a} + ${n - 1} × ${k} = ${a} + ${(n - 1) * k} = ${juste}.`, `La réponse est ${val(juste, s.u)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, 4, "…", n], [...vals, "…", "?"], s.titre),
    };
  }),

  // ★3 — des objets posés à intervalles réguliers.
  tpl(D, "d2_balises", 3, "Le 1er est déjà à un intervalle du départ.", () => {
    const s = un(SITS_POS);
    const p = perso(s.m);
    const k = un(s.pas);
    const ecart = s.titre === "Les panneaux du sentier" ? k * 100 : k;
    const n = entre(5, 12);
    const juste = n * ecart;
    return {
      text: `${s.dit(p, k)} ${s.q(n)}`,
      ...qcmN(juste, [(n - 1) * ecart, (n + 1) * ecart, n + ecart], "m"),
      explanation: etapes(`Les distances forment la suite ${ecart} ; ${2 * ecart} ; ${3 * ecart} … : au rang n, c'est n × ${ecart}.`, `${n} × ${ecart} = ${juste}.`, `Le ${n}e est à ${juste} m.`),
      canvas: tableauRang(s.objet, "Distance (m)", [1, 2, 3, "…", n], [ecart, 2 * ecart, 3 * ecart, "…", "?"], s.titre),
    };
  }),

  // ★3 — ce qui reste après plusieurs jours.
  tpl(D, "d3_reste", 3, "On enlève la même quantité à chaque fois, autant de fois qu'il y a de jours.", () => {
    const s = un(SITS_RESTE);
    const p = perso(s.m);
    const k = un(s.pas);
    const n = entre(3, 7);
    const reste = tire(Math.max(k, 5), s.u === "%" ? 100 - n * k : 40, s.mult);
    const s0 = reste + n * k;
    return {
      text: `${s.dit(p, s0, k)} ${s.q(n)}`,
      ...qcmN(reste, [s0 - (n + 1) * k, s0 - (n - 1) * k, s0 - k, s0 + n * k], s.u),
      explanation: etapes(`En ${n} fois, on enlève ${n} × ${k} = ${n * k}.`, `${s0} − ${n * k} = ${reste}.`, `Il reste ${val(reste, s.u)}.`),
      canvas: tableauRang(s.coin, "Reste", [0, 1, 2, "…", n], [s0, s0 - k, s0 - 2 * k, "…", "?"], s.titre),
    };
  }),

  // ★3 — le motif d'un rang éloigné, en situation.
  tpl(D, "d4_motif_rang", 3, "Compte par groupes entiers de motifs.", () => motifRang(tirerMotif(["ABC", "AAB", "ABB", "AABB"]))),

  // ★4 — à quel rang atteint-on une valeur ?
  tpl(D, "d5_quand", 4, "Le 1er rang compte déjà : cherche combien de pas il faut, puis ajoute 1.", () => {
    const s = un(SITS_RANG.filter((x) => !["Étage", "Rangée", "Heure"].includes(x.coin)));
    const p = perso(s.m);
    const k = un(s.pas);
    const a = entre(s.min, s.max);
    const m = entre(3, 9);
    const cible = a + m * k;
    const periode = s.coin.toLowerCase();
    const fem = periode === "semaine";
    const rang = (r: number) => `${fem ? "la" : "le"} ${r}e ${periode}`;
    const faux = [m, m + 2, Math.round(cible / k), m - 1].filter((r) => r >= 2).map(rang);
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
    const p = perso();
    let q = perso();
    while (q.nom === p.nom) q = perso();
    const k2 = entre(1, 5);
    const k1 = k2 + un([1, 2, 3, 4]);
    const m = entre(2, 8);
    const a = entre(2, 20);
    const b = a + m * (k1 - k2);
    const unite = s.coin.toLowerCase();
    const plur = unite === "mois" ? "mois" : `${unite}s`;
    return {
      text: `${s.dit(p, q, a, k1, b, k2)} ${s.quand.replace("ILS", p.il === "elle" && q.il === "elle" ? "elles" : "ils")}`,
      ...qcmN(m, [m + 1, m - 1, b - a, m * 2], plur),
      explanation: etapes(`L'écart de départ est ${b} − ${a} = ${b - a}. À chaque ${unite}, il diminue de ${k1} − ${k2} = ${k1 - k2}.`, `${b - a} ÷ ${k1 - k2} = ${m}. Vérification : ${a} + ${m} × ${k1} = ${a + m * k1} et ${b} + ${m} × ${k2} = ${b + m * k2}.`, `Au bout de ${m} ${plur}.`),
      canvas: {
        kind: "tableau_donnees",
        title: s.titre,
        coin: s.coin,
        headers: ["0", "1", "2", "3", "…"],
        rows: [
          { label: p.nom, values: [a, a + k1, a + 2 * k1, a + 3 * k1, "…"] },
          { label: q.nom, values: [b, b + k2, b + 2 * k2, b + 3 * k2, "…"] },
        ],
        display: { compact: true },
      } as TableauDonneesCanvasData,
    };
  }),

  // ★4 — une quantité qui double.
  tpl(D, "d7_double", 4, "Doubler, ce n'est pas ajouter toujours le même nombre.", () => {
    const sits = [
      { t: "Le nombre de nénuphars", dit: (a: number) => `Sur un étang, il y a ${a} nénuphars le 1er jour, et leur nombre double chaque jour.`, q: (n: number) => `Combien y en aura-t-il le ${n}e jour ?`, coin: "Jour" },
      { t: "Le message partagé", dit: (a: number) => `Le 1er jour, ${a} personnes lisent le journal de l'école. Chaque jour, le nombre de lecteurs double.`, q: (n: number) => `Combien de lecteurs y aura-t-il le ${n}e jour ?`, coin: "Jour" },
      { t: "Les lapins de la ferme", dit: (a: number) => `Une éleveuse a ${a} lapins la 1re année. Chaque année, le nombre de lapins double.`, q: (n: number) => `Combien de lapins aura-t-elle la ${n}e année ?`, coin: "Année" },
      { t: "Les vues de la vidéo", dit: (a: number) => `La vidéo de la classe a ${a} vues le 1er jour, et ce nombre double chaque jour.`, q: (n: number) => `Combien de vues aura-t-elle le ${n}e jour ?`, coin: "Jour" },
      { t: "Les bactéries", dit: (a: number) => `Une biologiste observe ${a} bactéries à la 1re heure. Leur nombre double toutes les heures.`, q: (n: number) => `Combien de bactéries y aura-t-il à la ${n}e heure ?`, coin: "Heure" },
    ];
    const s = un(sits);
    const a = entre(2, 6);
    const n = entre(5, 6);
    const juste = a * 2 ** (n - 1);
    const vals = [a, 2 * a, 4 * a];
    return {
      text: `${s.dit(a)} ${s.q(n)}`,
      ...qcmN(juste, [a + (n - 1) * a, juste / 2, juste * 2, a * n * 2]),
      explanation: etapes("On double à chaque étape : on multiplie par 2.", `${vals.join(" ; ")} ; ${8 * a}${n === 6 ? ` ; ${16 * a}` : ""} ; … au ${n}e : ${juste}.`, `La réponse est ${juste}.`),
      canvas: tableauRang(s.coin, "Nombre", [1, 2, 3, "…", n], [...vals, "…", "?"], s.t),
    };
  }),

  // ★4 — une figure qui grandit (allumettes, tables…).
  tpl(D, "d8_figures", 4, "Regarde ce qu'on ajoute quand on colle une figure de plus.", () => {
    const s = un(SITS_FIG);
    const p = perso(s.m);
    const n = entre(5, 12);
    const juste = s.a + (n - 1) * s.k;
    return {
      text: `${s.dit(p)} ${s.q(n)}`,
      ...qcmN(juste, [s.seul * n, s.k * n, juste + s.k, s.a + n * s.k], s.u),
      explanation: etapes(`Au début, il en faut ${s.a}, puis ${s.pourquoi}.`, `${s.a} + ${n - 1} × ${s.k} = ${s.a} + ${(n - 1) * s.k} = ${juste}.`, `Il faut ${val(juste, s.u)}.`),
      canvas: tableauRang(s.coin, s.ligne, [1, 2, 3, "…", n], [s.a, s.a + s.k, s.a + 2 * s.k, "…", "?"], s.titre),
    };
  }),
];
