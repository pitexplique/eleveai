// lib/tutor-v4/questionBank/cp/maths/nombres-entiers.bank.ts
//
// Les nombres du CP, écrits à la main. Première banque de la classe : elle
// pose le patron des douze autres.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — les nombres entiers vont jusqu'à CENT. Au plus tard en période 2
//     jusqu'à cinquante-neuf, en période 3 jusqu'à cent ;
//   — l'aspect décimal (les groupes de dix) et l'aspect positionnel (la valeur
//     d'un chiffre dépend de sa place) sont travaillés dès la période 1 ;
//   — les ordinaux vont jusqu'à « vingtième » ;
//   — l'écriture EN LETTRES n'est maitrisée que jusqu'à cinquante : on ne la
//     demande donc jamais au-delà ;
//   — la demi-droite est graduée DE UN EN UN.
//
// LE PIÈGE DE LA NOTION, et le BO l'écrit lui-même : « L'élève sait expliquer,
// en s'appuyant sur la numération, pourquoi 23 n'est pas le même nombre que 32
// bien que les écritures des deux nombres soient composées des mêmes
// chiffres. » Tout part de là — un chiffre ne vaut pas la même chose selon sa
// place. Ses deux cousins : « soixante-douze » qu'on écrit 6012 parce qu'on
// écrit ce qu'on entend, et le RANG qu'on confond avec la quantité (le
// troisième de la file n'a que deux personnes devant lui).
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.
//
// ⛔ LES SQUELETTES (10/11/2026). Mesure de départ : 11 micros sur 12 sous le
// seuil (2 à 36 squelettes, 9 à 19 répétitions sur 20). Chaque gabarit tire
// désormais une FAMILLE (prendre la question par un autre bout), une SITUATION
// d'enfant (goûter, zoo, pirates, fusée, kermesse…) et une TOURNURE.
// Mesure : scripts/mesurer-squelettes-coach.ts cp nombre_entier.
//
// ⭐ LES DESSINS (10/11/2026) : un enfant de 6 ans lit mal, le dessin porte la
// question. `base_dix` (barres de dix et cubes, cadres de dix) pour dénombrer
// et décomposer, `objets` pour compter et pour les files, `number_line` sans
// jamais écrire la valeur cherchée, `personnage` quand un enfant DIT le nombre.

import type {
  BaseDixCanvasData,
  CanvasFigure,
  NumberLineCanvasData,
  ObjetId,
  PersonnageId,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return melangeEnPlace([...items]);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

/** Choix numériques : distracteurs entiers entre 0 et 100, jamais en double. */
function choixNombres(correct: number, wrongs: readonly number[], unite = ""): string[] {
  const f = (n: number) => `${n}${unite}`;
  const ok = Array.from(new Set(wrongs)).filter((w) => Number.isInteger(w) && w >= 0 && w <= 100 && w !== correct);
  const secours = [correct + 1, correct - 1, correct + 10, correct - 10, correct + 2, correct - 2];
  for (const s of secours) if (ok.length < 3 && s >= 0 && s <= 100 && s !== correct && !ok.includes(s)) ok.push(s);
  return shuffle([f(correct), ...shuffle(ok).slice(0, 3).map(f)]);
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

type Q = TutorGeneratedQuestionV4;
type Famille = () => Q;
const tirer = (familles: readonly Famille[]): Q => randomChoice(familles)();

function qcm(text: string, choices: string[], correct: string, explanation: string, canvas?: CanvasFigure): Q {
  return { text, format: "qcm", choices, expected: [correct], comparator: "mcq_exact", explanation, ...(canvas ? { canvas } : {}) };
}

/** Un item gabarit de la notion. */
function gab(
  id: string,
  microId: string,
  difficulty: 1 | 2 | 3 | 4 | 5,
  hint: string,
  tags: string[],
  familles: readonly Famille[],
): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["cp", "nombre_entier", ...tags, "template"],
    generate: () => tirer(familles),
  };
}

/* ---------------------------------------------------------
   LES NOMS DES NOMBRES (orthographe de 1990 : traits d'union partout)
--------------------------------------------------------- */
const UNITES_NOMS = [
  "zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf",
  "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize",
];
const DIZAINES_NOMS: Record<number, string> = { 2: "vingt", 3: "trente", 4: "quarante", 5: "cinquante", 6: "soixante" };

function nomFr(n: number): string {
  if (n <= 16) return UNITES_NOMS[n];
  if (n < 20) return `dix-${UNITES_NOMS[n - 10]}`;
  if (n === 100) return "cent";
  if (n < 70) {
    const d = Math.floor(n / 10);
    const u = n % 10;
    if (u === 0) return DIZAINES_NOMS[d];
    if (u === 1) return `${DIZAINES_NOMS[d]}-et-un`;
    return `${DIZAINES_NOMS[d]}-${UNITES_NOMS[u]}`;
  }
  if (n < 80) return n === 71 ? "soixante-et-onze" : `soixante-${nomFr(n - 60)}`;
  if (n === 80) return "quatre-vingts";
  return `quatre-vingt-${nomFr(n - 80)}`;
}

const RANGS = [
  "premier", "deuxième", "troisième", "quatrième", "cinquième", "sixième",
  "septième", "huitième", "neuvième", "dixième", "onzième", "douzième",
  "treizième", "quatorzième", "quinzième", "seizième", "dix-septième",
  "dix-huitième", "dix-neuvième", "vingtième",
];

/* ---------------------------------------------------------
   LES ENFANTS : la troupe du site et des prénoms variés
--------------------------------------------------------- */
type Prenom = { nom: string; il: "il" | "elle" };
const PRENOMS: readonly Prenom[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" }, { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" }, { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" }, { nom: "Rose", il: "elle" },
  { nom: "Noé", il: "il" },
];
const quelquun = () => randomChoice(PRENOMS);
/** « de Lou », « d'Inès ». */
const deN = (nom: string) => (/^[AEIOUYÉÈÎ]/i.test(nom) ? `d'${nom}` : `de ${nom}`);
/** « de jetons », « d'images ». */
const de = (mot: string) => (/^[aeiouyàâéèêëîïôœ]/i.test(mot) ? `d'${mot}` : `de ${mot}`);

function deuxEnfants(): [Prenom, Prenom] {
  const a = quelquun();
  let b = quelquun();
  while (b.nom === a.nom) b = quelquun();
  return [a, b];
}

/** Un personnage dessiné de la troupe, avec ce qu'il dit. */
const TROUPE: readonly { id: PersonnageId; nom: string; il: "il" | "elle" }[] = [
  { id: "nina", nom: "Nina", il: "elle" },
  { id: "teo", nom: "Téo", il: "il" },
  { id: "zoe", nom: "Zoé", il: "elle" },
  { id: "ravi", nom: "Ravi", il: "il" },
  { id: "pic", nom: "Pic", il: "il" },
];
function parle(id: PersonnageId, texte: string): CanvasFigure {
  return {
    kind: "personnage",
    personnage: id,
    pose: "montre",
    expression: randomChoice(["sourire", "rire", "pense"] as const),
    bulle: { texte },
    mode: "couleur",
  };
}

/* ---------------------------------------------------------
   LES DESSINS
--------------------------------------------------------- */
function materiel(dizaines: number, unites: number, extra: Partial<BaseDixCanvasData> = {}): BaseDixCanvasData {
  return { kind: "base_dix", dizaines, unites, ...extra };
}
function cadres(nombre: number, nbCadres: number, ajout?: number): BaseDixCanvasData {
  return { kind: "base_dix", variante: "cadres", nombre, cadres: nbCadres, ...(ajout ? { ajout } : {}) };
}
/** `n` objets séparés, rangés par lignes de cinq : on peut les compter. */
function tas(quoi: ObjetId, n: number): CanvasFigure {
  return { kind: "objets", mode: "couleur", colonnes: 5, size: { width: 400 }, elements: Array.from({ length: n }, () => ({ quoi })) };
}
/** Une file de `n` objets, l'un d'eux entouré (rang `k`, 1 = le plus à gauche). */
function file(quoi: ObjetId, n: number, k: number): CanvasFigure {
  return {
    kind: "objets",
    mode: "couleur",
    colonnes: n,
    size: { width: 75 * n },
    elements: Array.from({ length: n }, (_, i) => ({ quoi, ...(i === k - 1 ? { marque: true } : {}) })),
  };
}
function droite(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", step: 1, size: { width: 360, height: 90 }, ...data };
}

/* ---------------------------------------------------------
   LES COLLECTIONS À COMPTER (dessinées par `objets`)
--------------------------------------------------------- */
type Collection = { quoi: ObjetId; mots: string; lieu: string };
const COLLECTIONS: readonly Collection[] = [
  { quoi: "pomme", mots: "pommes", lieu: "dans le panier du goûter" },
  { quoi: "poisson", mots: "poissons", lieu: "dans l'aquarium" },
  { quoi: "oiseau", mots: "oiseaux", lieu: "sur le fil" },
  { quoi: "papillon", mots: "papillons", lieu: "dans le jardin" },
  { quoi: "fleur", mots: "fleurs", lieu: "dans le pré" },
  { quoi: "etoile", mots: "étoiles", lieu: "autour de la fusée" },
  { quoi: "ballon", mots: "ballons", lieu: "à la kermesse" },
  { quoi: "voiture", mots: "petites voitures", lieu: "sur le tapis de jeu" },
  { quoi: "livre", mots: "livres", lieu: "à la bibliothèque" },
  { quoi: "chat", mots: "chats", lieu: "chez la vétérinaire" },
  { quoi: "bateau", mots: "bateaux", lieu: "dans le port" },
  { quoi: "banane", mots: "bananes", lieu: "sur l'étal du marché" },
  { quoi: "tasse", mots: "tasses", lieu: "sur la table de la cuisine" },
  { quoi: "chapeau", mots: "chapeaux", lieu: "dans la loge du cirque" },
  { quoi: "cle", mots: "clés", lieu: "dans le coffre du pirate" },
  { quoi: "feuille", mots: "feuilles", lieu: "dans la forêt" },
];

/** Ce qu'on range par dix (sans dessin d'objet : barres, sachets, paquets). */
type Rangement = { mots: string; paquet: string; paquets: string; f?: boolean };
/** « tout seuls », « toutes seules ». */
const seuls = (r: Rangement) => (r.f ? "toutes seules" : "tout seuls");
const RANGEMENTS: readonly Rangement[] = [
  { mots: "jetons", paquet: "sachet de dix", paquets: "sachets de dix" },
  { f: true, mots: "billes", paquet: "sac de dix", paquets: "sacs de dix" },
  { mots: "bûchettes", paquet: "paquet de dix", paquets: "paquets de dix" },
  { f: true, mots: "perles", paquet: "collier de dix", paquets: "colliers de dix" },
  { f: true, mots: "graines", paquet: "sachet de dix", paquets: "sachets de dix" },
  { mots: "crayons", paquet: "boîte de dix", paquets: "boîtes de dix" },
  { mots: "œufs", paquet: "boîte de dix", paquets: "boîtes de dix" },
  { f: true, mots: "images", paquet: "pochette de dix", paquets: "pochettes de dix" },
  { mots: "bonbons", paquet: "cornet de dix", paquets: "cornets de dix" },
  { mots: "coquillages", paquet: "seau de dix", paquets: "seaux de dix" },
  { f: true, mots: "pièces d'or", paquet: "bourse de dix", paquets: "bourses de dix" },
  { mots: "gâteaux", paquet: "plateau de dix", paquets: "plateaux de dix" },
];

/** Qui a construit le matériel dessiné. */
const BATISSEURS = [
  (p: Prenom) => `${p.nom} a construit ce nombre avec des barres de dix et des cubes.`,
  (p: Prenom) => `Voici les cubes ${deN(p.nom)}.`,
  (p: Prenom) => `${p.nom} a posé ses cubes sur la table.`,
  (p: Prenom) => `Pic le paille-en-queue a rangé ses cubes comme ceci.`,
  (p: Prenom) => `À l'atelier, ${p.nom} a fait ce dessin.`,
  (p: Prenom) => `${p.nom} montre ses barres de dix et ses cubes tout seuls.`,
  (p: Prenom) => `La maîtresse a posé ce matériel au tableau.`,
];

const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/** « 4 dizaines et 7 unités », accordé. */
const du = (d: number, u: number) => `${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""}`;

/** `k` nombres différents entre `min` et `max`. */
function differents(k: number, min: number, max: number): number[] {
  const s = new Set<number>();
  while (s.size < k) s.add(randomInt(min, max));
  return [...s];
}

/** Deux nombres qui font tomber : chiffres inversés, même dizaine, passage de dizaine. */
function paireTroublante(): [number, number] {
  const cas = randomInt(0, 2);
  if (cas === 0) {
    const x = randomInt(1, 8);
    const y = randomInt(x + 1, 9);
    return shuffle([x * 10 + y, y * 10 + x]) as [number, number];
  }
  if (cas === 1) {
    const d = randomInt(1, 9) * 10;
    const [a, b] = differents(2, 0, 9);
    return [d + a, d + b];
  }
  // 59 et 61 : le 9 est plus gros que le 1, mais 61 est plus grand.
  const d = randomInt(2, 8) * 10;
  return shuffle([d + randomInt(5, 9), d + 10 + randomInt(0, 3)]) as [number, number];
}

/** Des listes de nombres dans un monde d'enfant. */
const LISTES: readonly ((s: string) => string)[] = [
  (s) => `Voici les dossards des coureurs : ${s}.`,
  (s) => `Les maisons de la rue portent les numéros ${s}.`,
  (s) => `Pic a trouvé des cartes : ${s}.`,
  (s) => `Au cirque, les places ont les numéros ${s}.`,
  (s) => `Les wagons du train portent les numéros ${s}.`,
  (s) => `Au musée, les dinosaures ont les numéros ${s}.`,
  (s) => `À la bibliothèque, les livres portent les numéros ${s}.`,
  (s) => `Les cabines de la piscine ont les numéros ${s}.`,
  (s) => `Au loto de la kermesse, on a tiré ${s}.`,
  (s) => `Les fusées du club d'astronomie portent les numéros ${s}.`,
  (s) => `Les coffres du pirate ont les numéros ${s}.`,
  (s) => `Au marché, les stands ont les numéros ${s}.`,
];

/** Ranger `k` nombres, du plus petit au plus grand ou l'inverse. */
function rangement(k: number, croissant: boolean): Q {
  // Deux nombres de la même dizaine, pour que les unités comptent aussi.
  const d = randomInt(1, 8) * 10;
  const base = [d + randomInt(0, 4), d + randomInt(5, 9)];
  const ns = [...base];
  while (ns.length < k) {
    const x = randomInt(3, 99);
    if (!ns.includes(x)) ns.push(x);
  }
  const tri = [...ns].sort((a, b) => (croissant ? a - b : b - a));
  const bon = tri.join(" ; ");
  const inverse = [...tri].reverse().join(" ; ");
  const echange = [...tri];
  const i = randomInt(0, k - 2);
  [echange[i], echange[i + 1]] = [echange[i + 1], echange[i]];
  const parUnites = [...ns].sort((a, b) => (croissant ? 1 : -1) * ((a % 10) - (b % 10) || a - b)).join(" ; ");
  const ctx = randomChoice(LISTES);
  const sens = croissant ? "du plus petit au plus grand" : "du plus grand au plus petit";
  const t = `${ctx(shuffle(ns).join(" ; "))} Range-les ${sens}.`;
  return qcm(t, makeChoices(bon, [inverse, echange.join(" ; "), parUnites]), bon,
    exp("Ranger, c'est mettre chaque nombre à sa place.", "On compare les dizaines, puis les unités quand les dizaines sont pareilles.",
      `On obtient ${tri.join(croissant ? " < " : " > ")}.`, `L'ordre est ${bon}.`));
}

/** Le nombre dessiné contre un nombre écrit : qui en a le plus ? */
function compareDessin(piege: boolean): Q {
  const [x, y] = deuxEnfants();
  const d = randomInt(2, 8);
  let u = randomInt(0, 9);
  if (piege && u === d) u = (u + 1) % 10;
  const a = d * 10 + u;
  let b = piege ? (u > 0 ? u * 10 + d : a + randomChoice([-1, 1])) : randomInt(20, 95);
  while (b === a || b < 10 || b > 99) b = randomInt(20, 95);
  const gagnant = a > b ? x : y;
  const t = randomChoice([
    `Voici les cubes ${deN(x.nom)}. ${y.nom} a ${b} cubes. Qui en a le plus ?`,
    `${x.nom} a construit ce nombre. ${y.nom} a écrit ${b}. Qui a le plus grand nombre ?`,
    `Pic compare les cubes ${deN(x.nom)}, sur le dessin, et les ${b} cubes ${deN(y.nom)}. Qui en a le plus ?`,
  ]);
  return qcm(t, makeChoices(gagnant.nom, [gagnant === x ? y.nom : x.nom, "ils en ont autant"]), gagnant.nom,
    exp("Le nombre qui a le plus de dizaines est le plus grand.", "On compte le dessin, puis on compare les dizaines.",
      `${x.nom} a ${a} cubes, ${y.nom} en a ${b}.`, `${gagnant.nom} en a le plus.`),
    materiel(d, u));
}

/** Lire un point sur une droite graduée de un en un. */
function pointSurDroite(dur: boolean): Q {
  const dz = randomInt(1, 9) * 10;
  const min = dur ? dz - randomInt(1, 4) : dz - 10 >= 0 && Math.random() < 0.5 ? dz - 10 : dz;
  const max = Math.min(100, min + 10);
  const ecrits = dur ? [dz] : [min, max];
  let v = randomInt(min + 1, max - 1);
  while (ecrits.includes(v)) v = randomInt(min + 1, max - 1);
  const k = randomChoice(TROUPE);
  const p = quelquun();
  const t = randomChoice([
    "Quel nombre est marqué par le point ?",
    `Pic s'est posé sur le point. Sur quel nombre est-il ?`,
    `${k.nom} a caché un nombre sous le point. Lequel ?`,
    `La grenouille ${deN(p.nom)} saute et s'arrête sur le point. Quel nombre est-ce ?`,
    `${p.nom} a posé son jeton sur la droite. Sur quel nombre est-il ?`,
    `Le lapin ${deN(p.nom)} fait la course sur la droite. Il s'arrête au point. Sur quel nombre ?`,
    `${k.nom} montre le point avec le doigt. Quel nombre montre-t-${k.il} ?`,
    `La coccinelle ${deN(p.nom)} se pose sur la droite. Quel est ce nombre ?`,
    `Le petit train ${deN(p.nom)} s'arrête au point. Quel est ce nombre ?`,
    `${p.nom} doit trouver le nombre caché. Quel est-il ?`,
  ]);
  const ref = dur ? dz : min;
  return qcm(t, choixNombres(v, [v + 1, v - 1, v + 10, v - 10, (v % 10) * 10 + Math.floor(v / 10)]), String(v),
    exp("Sur cette droite, chaque graduation avance de un.", `On part de ${ref} et on compte les graduations jusqu'au point.`,
      v > ref ? `De ${ref}, on avance de ${v - ref} : ${v}.` : `De ${ref}, on recule de ${ref - v} : ${v}.`, `Le point est sur ${v}.`),
    droite({ min, max, valeursEcrites: ecrits, points: [{ value: v, label: "?" }] }));
}

/** Écrire en chiffres un nombre de la zone difficile (60 à 99). */
function ecrireGrand(min: number, max: number, dessin: boolean): Q {
  const n = randomInt(min, max);
  const nom = nomFr(n);
  const faux: number[] = [];
  const fauxTexte: string[] = [];
  if (n >= 70 && n < 80) {
    fauxTexte.push(`60${n - 60}`, `6${n - 60}`);
    faux.push(n - 10, n + 10);
  } else if (n >= 80 && n < 90) {
    fauxTexte.push(`420${n - 80}`, `4${20 + n - 80}`);
    faux.push(n - 20, n + 10);
  } else if (n >= 90) {
    fauxTexte.push(`80${n - 80}`, `4${20 + n - 80}`.slice(0, 4));
    faux.push(n - 10, n - 20);
  } else {
    fauxTexte.push(`60${n % 10}`);
    faux.push(n + 10, n % 10 * 10 + 6);
  }
  const wrongs = [...fauxTexte, ...faux.filter((x) => x >= 0 && x <= 100 && x !== n).map(String)];
  const choix = makeChoices(String(n), shuffle(wrongs));
  const expl = exp("Un nombre à deux chiffres n'a que deux places : les dizaines et les unités.",
    "On ne recopie pas les mots un par un : on cherche la dizaine, puis on compte ce qui vient après.",
    n >= 70 && n < 80 ? `Après soixante-dix viennent soixante-et-onze, soixante-douze… « ${nom} », c'est 70 + ${n - 70} = ${n}.`
      : n >= 80 ? `Quatre-vingts, c'est 80. « ${nom} », c'est 80 + ${n - 80} = ${n}.`
        : `Soixante, c'est 60. « ${nom} », c'est 60 + ${n - 60} = ${n}.`,
    `« ${nom} » s'écrit ${n}.`);
  if (dessin) {
    const k = randomChoice(TROUPE);
    const t = randomChoice([
      `${k.nom} dit un nombre. Comment l'écrit-on en chiffres ?`,
      `${k.nom} annonce le numéro de son ticket. Quel numéro est-ce ?`,
      `${k.nom} dit combien de pages ${k.il} a lues. Écris ce nombre en chiffres.`,
      `Au loto, ${k.nom} entend ce nombre. Quel nombre doit-${k.il} cocher ?`,
    ]);
    return qcm(t, choix, String(n), expl, parle(k.id, `${maj(nom)} !`));
  }
  const p = quelquun();
  const t = randomChoice([
    `Comment s'écrit en chiffres le nombre « ${nom} » ?`,
    `La maîtresse dicte « ${nom} ». Qu'écrit ${p.nom} ?`,
    `À la boulangerie, on appelle le ticket « ${nom} ». Quel numéro est-ce ?`,
    `Le chauffeur du bus annonce « ${nom} ». Quel nombre est-ce ?`,
    `Au zoo, le soigneur compte « ${nom} » flamants roses. Écris ce nombre en chiffres.`,
  ]);
  return qcm(t, choix, String(n), expl);
}

/** « Dans 64, quel est le chiffre des unités ? » */
function qcmChiffre(n: number): Q {
  const d = Math.floor(n / 10);
  const u = n % 10;
  const p = quelquun();
  const dizaines = Math.random() < 0.5;
  const ctx = randomChoice([
    `Dans le nombre ${n},`,
    `${p.nom} a ${n} images. Dans ${n},`,
    `Le train de la ferme porte le numéro ${n}. Dans ${n},`,
    `Pic a compté ${n} graines. Dans ${n},`,
    `La cabane ${deN(p.nom)} porte le numéro ${n}. Dans ${n},`,
  ]);
  const t = `${ctx} quel est le chiffre des ${dizaines ? "dizaines" : "unités"} ?`;
  const bon = dizaines ? d : u;
  return qcm(t, choixNombres(bon, [dizaines ? u : d, n, bon * 10, d + u]), String(bon),
    exp("Le chiffre de gauche dit les dizaines, celui de droite les unités.", "On regarde la place du chiffre.",
      `${n} : ${d} dizaines et ${u} unités.`, `Le chiffre des ${dizaines ? "dizaines" : "unités"} est ${bon}.`),
    Math.random() < 0.5 ? materiel(d, u, { etiquettes: true }) : undefined);
}

/** « Dans 58, que vaut le chiffre 5 ? » (`dizaine` : on demande le chiffre de gauche). */
function valeurChiffre(dizaine: boolean): Q {
  const d = randomInt(1, 9);
  let u = randomInt(1, 9);
  if (u === d) u = u === 9 ? 1 : u + 1;
  const n = d * 10 + u;
  const gauche = dizaine || Math.random() < 0.5;
  const c = gauche ? d : u;
  const bon = gauche ? d * 10 : u;
  const p = quelquun();
  const ctx = randomChoice([
    `Dans le nombre ${n},`,
    `Le dossard ${deN(p.nom)} porte le numéro ${n}. Dans ${n},`,
    `Le livre ${deN(p.nom)} a ${n} pages. Dans ${n},`,
    `Le dragon du château a ${n} écailles dorées. Dans ${n},`,
    `La boulangère a fait ${n} croissants. Dans ${n},`,
    `Pic a vu ${n} poissons. Dans ${n},`,
  ]);
  const t = `${ctx} ${randomChoice([`que vaut le chiffre ${c} ?`, `combien vaut le ${c} ?`])}`;
  return qcm(t, choixNombres(bon, gauche ? [d, u, n, d + u] : [u * 10, d, n, d * 10]), String(bon),
    exp("La valeur d'un chiffre dépend de sa place.", "À gauche, il compte des dizaines ; à droite, des unités.",
      `${n} = ${d * 10} + ${u}.`, `Le chiffre ${c} vaut ${bon}.`),
    Math.random() < 0.5 ? materiel(d, u, { etiquettes: true }) : undefined);
}

/** « premier » / « première », puis « deuxième »… */
/** « du chat », « de la pomme », « de l'oiseau ». */
const duLe = (le: string) => (le.startsWith("le ") ? `du ${le.slice(3)}` : `de ${le}`);

const rangDe = (k: number, feminin: boolean) => (k === 1 ? (feminin ? "première" : "premier") : RANGS[k - 1]);

/** Les files dessinées : `le` et `les` pour la phrase, `f` pour accorder. */
type FileObjets = { quoi: ObjetId; mots: string; le: string; les: string; phrase: string; f: boolean };
const FILES: readonly FileObjets[] = [
  { quoi: "voiture", mots: "voitures", le: "la voiture", les: "les voitures", phrase: "attendent au feu rouge", f: true },
  { quoi: "poisson", mots: "poissons", le: "le poisson", les: "les poissons", phrase: "nagent en file", f: false },
  { quoi: "oiseau", mots: "oiseaux", le: "l'oiseau", les: "les oiseaux", phrase: "sont posés sur le fil", f: false },
  { quoi: "bateau", mots: "bateaux", le: "le bateau", les: "les bateaux", phrase: "font la course", f: false },
  { quoi: "livre", mots: "livres", le: "le livre", les: "les livres", phrase: "sont rangés sur l'étagère", f: false },
  { quoi: "ballon", mots: "ballons", le: "le ballon", les: "les ballons", phrase: "sont alignés au stade", f: false },
  { quoi: "chat", mots: "chats", le: "le chat", les: "les chats", phrase: "attendent leur repas", f: false },
  { quoi: "pomme", mots: "pommes", le: "la pomme", les: "les pommes", phrase: "sont posées sur le rebord", f: true },
  { quoi: "tasse", mots: "tasses", le: "la tasse", les: "les tasses", phrase: "sont prêtes pour le goûter", f: true },
  { quoi: "fleur", mots: "fleurs", le: "la fleur", les: "les fleurs", phrase: "poussent dans la jardinière", f: true },
  { quoi: "chapeau", mots: "chapeaux", le: "le chapeau", les: "les chapeaux", phrase: "sont accrochés dans la loge du clown", f: false },
  { quoi: "papillon", mots: "papillons", le: "le papillon", les: "les papillons", phrase: "volent en file", f: false },
];

const QUEUES = [
  "au toboggan", "à la cantine", "devant la piscine", "au stand de barbe à papa",
  "pour monter dans le petit train", "à la bibliothèque", "devant le manège",
  "chez la vétérinaire", "pour voir les dinosaures du musée", "pour la photo de classe",
];

/** Les cartes à chiffres : le plus grand (ou le plus petit) nombre à deux chiffres. */
function cartes(k: number, grand: boolean): Q {
  const cs = differents(k, 1, 9);
  const tri = [...cs].sort((a, b) => (grand ? b - a : a - b));
  const bon = tri[0] * 10 + tri[1];
  const p = quelquun();
  const liste = cs.length === 2 ? `${cs[0]} et ${cs[1]}` : `${cs[0]}, ${cs[1]} et ${cs[2]}`;
  const t = randomChoice([
    `${p.nom} a les cartes ${liste}. Quel est le ${grand ? "plus grand" : "plus petit"} nombre à deux chiffres qu'${p.il} peut faire ?`,
    `Pic a trouvé les cartes ${liste} dans le coffre du pirate. Quel est le ${grand ? "plus grand" : "plus petit"} nombre à deux chiffres qu'il peut écrire ?`,
    `Avec les cartes ${liste}, fabrique le ${grand ? "plus grand" : "plus petit"} nombre à deux chiffres.`,
    `Au jeu de cartes de la récré, ${p.nom} tire ${liste}. Quel est le ${grand ? "plus grand" : "plus petit"} nombre à deux chiffres possible ?`,
    `${p.nom} veut gagner le défi : faire le ${grand ? "plus grand" : "plus petit"} nombre à deux chiffres avec ${liste}. Lequel ?`,
    `Ti Margo donne à ${p.nom} les cartes ${liste}. Quel est le ${grand ? "plus grand" : "plus petit"} nombre à deux chiffres qu'on peut écrire ?`,
  ]);
  const autres = [tri[1] * 10 + tri[0], tri[0] + tri[1]];
  if (k === 3) autres.push(tri[0] * 10 + tri[2], tri[2] * 10 + tri[1]);
  return qcm(t, choixNombres(bon, autres), String(bon),
    exp("Le chiffre des dizaines compte le plus.", `On met le ${grand ? "plus grand" : "plus petit"} chiffre aux dizaines, puis le suivant aux unités.`,
      `${tri[0]} aux dizaines, ${tri[1]} aux unités : ${bon}.`, `C'est ${bon}.`));
}

export const nombresEntiersBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_ENTIER_DENOMBRE — dénombrer en organisant
     Le BO insiste : on ne compte pas un par un, on groupe par
     dix. C'est la porte d'entrée de toute la numération.
  ========================================================= */
  gab("cp_entier_denombre_tpl_1", "cp_entier_denombre", 2,
    "Une barre vaut dix. Compte de dix en dix, puis ajoute les cubes tout seuls.",
    ["denombrer", "canvas"], [
    // Le matériel : barres et cubes.
    () => {
      const d = randomInt(1, 9);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const p = quelquun();
      const q = randomChoice([
        "Combien y a-t-il de cubes en tout ?",
        "Combien de cubes vois-tu ?",
        "Quel nombre a-t-il fait ?",
        "Compte les cubes. Combien y en a-t-il ?",
      ]);
      return qcm(`${randomChoice(BATISSEURS)(p)} ${q}`, choixNombres(n, [u * 10 + d, d + u, n + 10, n - 1]), String(n),
        exp("Une barre, c'est dix cubes collés.", "On compte les barres de dix en dix, puis les cubes un par un.",
          `${d} barres font ${d * 10}. On ajoute ${u} cubes : ${d * 10} + ${u} = ${n}.`, `Il y a ${n} cubes.`),
        materiel(d, u));
    },
    // Des objets à compter, rangés par lignes de cinq.
    () => {
      const c = randomChoice(COLLECTIONS);
      const n = randomInt(11, 20);
      const p = quelquun();
      const t = randomChoice([
        `Combien y a-t-il ${de(c.mots)} ${c.lieu} ?`,
        `${p.nom} compte les ${c.mots} ${c.lieu}. Combien en trouve-t-${p.il} ?`,
        `Pic a caché des ${c.mots} ${c.lieu}. Combien en vois-tu ?`,
        `Regarde les ${c.mots}. Combien y en a-t-il ?`,
      ]);
      return qcm(t, choixNombres(n, [n - 1, n + 1, n - 5, n + 5]), String(n),
        exp("Le dernier nombre dit en comptant donne la quantité.", "On compte ligne par ligne : chaque ligne pleine en a cinq.",
          `Les lignes pleines font ${Math.floor(n / 5) * 5}, il en reste ${n % 5} : cela fait ${n}.`, `Il y a ${n} ${c.mots}.`),
        tas(c.quoi, n));
    },
    // Les cadres de dix.
    () => {
      const n = randomInt(11, 20);
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} a rempli des cadres de dix avec des jetons. Combien de jetons a-t-${p.il} posés ?`,
        "Combien de jetons y a-t-il dans les cadres ?",
        `Voici les jetons du jeu ${deN(p.nom)}. Combien y en a-t-il ?`,
        "Un cadre plein compte dix jetons. Combien de jetons vois-tu en tout ?",
      ]);
      return qcm(t, choixNombres(n, [n - 10, n + 1, n - 1, 20 - n + 10]), String(n),
        exp("Un cadre plein contient dix jetons.", "On compte dix pour le cadre plein, puis les jetons de l'autre cadre.",
          `10 + ${n - 10} = ${n}.`, `Il y a ${n} jetons.`),
        cadres(n, 2));
    },
  ]),
  gab("cp_entier_denombre_tpl_3", "cp_entier_denombre", 3,
    "Compte de dix en dix pour les paquets, puis de un en un.",
    ["denombrer"], [
    // Le comptage dit à voix haute.
    () => {
      const d = randomInt(2, 7);
      const u = randomInt(1, 6);
      const n = d * 10 + u;
      const p = quelquun();
      const r = randomChoice(RANGEMENTS);
      const dix = Array.from({ length: d }, (_, i) => (i + 1) * 10);
      const un = Array.from({ length: u }, (_, i) => d * 10 + i + 1);
      const t = randomChoice([
        `${p.nom} compte ses ${r.mots} à voix haute : « ${dix.join(", ")}, ${un.join(", ")} ». Combien a-t-${p.il} ${de(r.mots)} ?`,
        `Pour compter ses ${r.mots}, ${p.nom} dit : « ${dix.join(", ")}, ${un.join(", ")} ». Combien y en a-t-il ?`,
        `On entend ${p.nom} compter : « ${dix.join(", ")}, ${un.join(", ")} ». Combien ${de(r.mots)} a-t-${p.il} comptés ?`,
      ]);
      return qcm(t, choixNombres(n, [d + u, u * 10 + d, n - 1, d * 10]), String(n),
        exp("Le dernier nombre dit en comptant donne la quantité.", "On écoute le dernier nombre dit.",
          `${p.nom} s'arrête sur ${n} : ${d} paquets de dix, puis ${u} tout seuls.`, `Il y a ${n} ${r.mots}.`));
    },
    // Des paquets de dix racontés.
    () => {
      const d = randomInt(3, 9);
      const u = randomChoice([0, 2, 3, 4, 5, 6, 7, 8, 9]);
      const n = d * 10 + u;
      const p = quelquun();
      const r = randomChoice(RANGEMENTS);
      const reste = u === 0 ? "Il ne reste rien." : `Il reste ${u} ${r.mots} ${seuls(r)}.`;
      const t = randomChoice([
        `${p.nom} range ses ${r.mots}. ${p.il === "il" ? "Il" : "Elle"} remplit ${d} ${r.paquets}. ${reste} Combien ${de(r.mots)} a-t-${p.il} ?`,
        `Dans le placard, il y a ${d} ${r.paquets}. ${reste} Combien y a-t-il ${de(r.mots)} ?`,
        `Pic compte les ${r.mots} ${deN(p.nom)} : ${d} ${r.paquets}. ${reste} Combien en tout ?`,
      ]);
      return qcm(t, choixNombres(n, [d + u, u * 10 + d, n + 10, d]), String(n),
        exp("Un paquet de dix vaut dix.", "On compte les paquets de dix en dix, puis on ajoute ce qui reste.",
          `${d} paquets font ${d * 10}${u ? `, plus ${u} : ${n}` : ""}.`, `Il y a ${n} ${r.mots}.`));
    },
    // Le matériel, nombres plus grands.
    () => {
      const d = randomInt(4, 9);
      const u = randomInt(0, 9);
      const n = d * 10 + u;
      const p = quelquun();
      const q = randomChoice(["Quel nombre montre ce dessin ?", "Combien de cubes en tout ?", "Combien vaut ce dessin ?"]);
      return qcm(`${randomChoice(BATISSEURS)(p)} ${q}`, choixNombres(n, [u * 10 + d, d + u, n - 10, n + 1]), String(n),
        exp("Une barre, c'est dix cubes.", "On compte les barres de dix en dix, puis les cubes.",
          `${d} barres font ${d * 10}${u ? `, plus ${u} cubes : ${n}` : ""}.`, `Le dessin montre ${n}.`),
        materiel(d, u));
    },
  ]),
  gab("cp_entier_denombre_fixed_2", "cp_entier_denombre", 3,
    "Qu'est-ce qui t'évite de perdre le compte au milieu ?",
    ["denombrer", "methode"], [
    // La bonne méthode.
    () => {
      const p = quelquun();
      const n = randomInt(4, 9) * 10 + randomInt(1, 9);
      const r = randomChoice(RANGEMENTS);
      const bonne = "faire des paquets de 10, puis compter les paquets";
      const t = randomChoice([
        `${p.nom} veut compter ${r.mots === "œufs" ? "beaucoup d'œufs" : `un grand tas ${de(r.mots)}`}. Que doit-${p.il} faire ?`,
        `Il y a environ ${n} ${r.mots} sur la table. Comment les compter sans se tromper ?`,
        `Pic veut compter ses ${r.mots}. Il y en a beaucoup ! Quelle est la meilleure idée ?`,
      ]);
      return qcm(t, makeChoices(bonne, ["compter un par un sans rien bouger", "compter deux fois très vite", "deviner en regardant le tas"]), bonne,
        exp("Organiser une collection, c'est la ranger en paquets de dix.", "On fait des paquets de dix, on les compte, puis on compte ce qui reste.",
          "Avec des paquets de dix, on ne se perd pas : 4 paquets et 6 tout seuls, cela fait 46.", "On fait des paquets de 10, puis on compte les paquets."));
    },
    // A-t-il bien compté ?
    () => {
      const p = quelquun();
      const d = randomInt(2, 8);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const juste = Math.random() < 0.5;
      const dit = juste ? n : randomChoice([d + u, u * 10 + d, n + 10].filter((x) => x !== n && x <= 100));
      const avecDessin = Math.random() < 0.6;
      const t = avecDessin
        ? `${p.nom} a construit ce nombre avec ses cubes. ${p.il === "il" ? "Il" : "Elle"} dit : « J'en ai ${dit}. » A-t-${p.il} raison ?`
        : `${p.nom} a fait ${d} paquets de dix et il reste ${u} tout seuls. ${p.il === "il" ? "Il" : "Elle"} dit : « J'en ai ${dit}. » A-t-${p.il} raison ?`;
      const bonne = juste ? "oui" : `non, il y en a ${n}`;
      return qcm(t, makeChoices(bonne, ["oui", `non, il y en a ${n}`, `non, il y en a ${d + u === dit ? n + 1 : d + u}`]), bonne,
        exp("Un paquet de dix vaut dix.", "On compte les paquets de dix en dix, puis on ajoute ce qui reste.",
          `${d} ${avecDessin ? "barres" : "paquets"} font ${d * 10}, plus ${u} : ${n}.`, juste ? `Oui, il y en a bien ${n}.` : `Non : il y en a ${n}.`),
        avecDessin ? materiel(d, u) : undefined);
    },
  ]),
  gab("cp_entier_denombre_tpl_2", "cp_entier_denombre", 4,
    "Il y a plus de dix cubes tout seuls : avec dix d'entre eux, on fait encore une barre.",
    ["denombrer", "piege", "canvas"], [
    // Le BO : une collection PARTIELLEMENT groupée. L'élève qui s'arrête à
    // « 3 dizaines et 15 unités » n'a pas fini son travail.
    () => {
      const d = randomInt(2, 6);
      const u = randomInt(11, 19);
      const n = d * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} a ${d} barres de dix et beaucoup de cubes tout seuls. Combien de cubes en tout ?`,
        `Attention, il y a plus de dix cubes tout seuls ! Combien de cubes y a-t-il en tout ?`,
        `Voici le trésor de cubes ${deN(p.nom)}. Quel nombre fait-il ?`,
        `Pic a renversé ses cubes à côté de ses barres. Combien de cubes en tout ?`,
      ]);
      return qcm(t, choixNombres(n, [n - 10, d + u, d * 10 + (u % 10), n + 1]), String(n),
        exp("Dix cubes tout seuls font une barre de plus.", "On fait une nouvelle barre avec dix cubes, puis on compte.",
          `Avec ${u} cubes, on fait 1 barre et il en reste ${u - 10}. Il y a alors ${d + 1} barres et ${u - 10} cubes : ${n}.`, `Il y a ${n} cubes.`),
        materiel(d, u, { echange: "unites" }));
    },
    () => {
      const d = randomInt(2, 6);
      const u = randomInt(11, 19);
      const n = d * 10 + u;
      const p = quelquun();
      const r = randomChoice(RANGEMENTS);
      const t = randomChoice([
        `${p.nom} a ${d} ${r.paquets} et ${u} ${r.mots} ${seuls(r)}. Combien ${de(r.mots)} a-t-${p.il} en tout ?`,
        `Sur l'étagère : ${d} ${r.paquets}, et ${u} ${r.mots} en vrac. Combien ${de(r.mots)} en tout ?`,
        `Pic a trouvé ${d} ${r.paquets} et encore ${u} ${r.mots}. Combien en a-t-il ?`,
      ]);
      return qcm(t, choixNombres(n, [n - 10, d + u, d * 10 + (u % 10), n + 1]), String(n),
        exp("Dix objets tout seuls font un paquet de plus.", "On refait un paquet de dix, puis on compte.",
          `${d} paquets font ${d * 10}. On ajoute ${u} : ${d * 10} + ${u} = ${n}.`, `Il y a ${n} ${r.mots}.`));
    },
  ]),

  /* =========================================================
     CP_ENTIER_LIRE_ECRIRE — lire et écrire jusqu'à cent
     Le piège vit entre soixante et cent : on écrit ce qu'on
     entend, et « soixante-douze » devient 6012.
  ========================================================= */
  gab("cp_entier_lire_ecrire_tpl_2", "cp_entier_lire_ecrire", 2,
    "Le premier chiffre dit les dizaines : 4, c'est quarante.",
    ["lire_ecrire", "canvas"], [
    // Des chiffres vers le nom.
    () => {
      const n = randomInt(11, 50);
      const d = Math.floor(n / 10);
      const u = n % 10;
      const p = quelquun();
      const t = randomChoice([
        `Comment se lit le nombre ${n} ?`,
        `Le maillot ${deN(p.nom)} porte le numéro ${n}. Comment se dit ce nombre ?`,
        `Le livre ${deN(p.nom)} a ${n} pages. Comment se lit ${n} ?`,
        `La fusée de Pic porte le numéro ${n}. Comment le dit-on ?`,
        `Au loto de la kermesse, on tire le ${n}. Que dit-on ?`,
      ]);
      const faux = [u * 10 + d, n + 10, n - 10, n + 1].filter((x) => x >= 11 && x <= 99 && x !== n).map(nomFr);
      return qcm(t, makeChoices(nomFr(n), faux), nomFr(n),
        exp("Un nombre à deux chiffres : d'abord les dizaines, puis les unités.", "On lit le chiffre des dizaines, puis celui des unités.",
          `${n} : ${d} dizaines, c'est « ${nomFr(d * 10)} »${u ? `, puis ${u}` : ""}.`, `${n} se lit « ${nomFr(n)} ».`),
        t.startsWith("Comment se lit") ? materiel(d, u) : undefined);
    },
    // Un enfant dit le nombre, on l'écrit en chiffres.
    () => {
      const n = randomInt(11, 69);
      const d = Math.floor(n / 10);
      const u = n % 10;
      const k = randomChoice(TROUPE);
      const t = randomChoice([
        `${k.nom} dit un nombre. Comment l'écrit-on en chiffres ?`,
        `${k.nom} annonce son score. Quel nombre faut-il écrire ?`,
        `${k.nom} dit combien de billes ${k.il} a. Écris ce nombre en chiffres.`,
        `${k.nom} lit le numéro de sa maison. Quel est ce numéro ?`,
      ]);
      return qcm(t, choixNombres(n, [u * 10 + d, n + 10, n - 10, n + 1]), String(n),
        exp("Un nombre à deux chiffres : d'abord les dizaines, puis les unités.", "On cherche la dizaine qu'on entend, puis les unités.",
          `« ${nomFr(n)} » : ${d} dizaines et ${u} unités.`, `On écrit ${n}.`),
        parle(k.id, `${maj(nomFr(n))} !`));
    },
  ]),
  gab("cp_entier_lire_ecrire_tpl_1", "cp_entier_lire_ecrire", 3,
    "Cherche la dizaine qu'on entend en premier, puis compte ce qui vient après.",
    ["lire_ecrire", "piege", "canvas"], [
    () => ecrireGrand(60, 99, true),
    () => ecrireGrand(60, 99, false),
  ]),
  gab("cp_entier_lire_ecrire_fixed_1", "cp_entier_lire_ecrire", 3,
    "Soixante-douze, c'est soixante ET douze : soixante-dix, soixante-et-onze, soixante-douze.",
    ["lire_ecrire", "piege", "canvas"], [
    () => ecrireGrand(70, 79, true),
    () => ecrireGrand(70, 79, false),
  ]),
  gab("cp_entier_lire_ecrire_fixed_2", "cp_entier_lire_ecrire", 3,
    "Quatre-vingts, c'est 80. Puis on ajoute ce qui vient après.",
    ["lire_ecrire", "piege", "canvas"], [
    () => ecrireGrand(80, 99, true),
    () => ecrireGrand(80, 99, false),
  ]),

  /* =========================================================
     CP_ENTIER_CONSTRUIRE_COLLECTION — fabriquer une quantité
  ========================================================= */
  gab("cp_entier_construire_collection_tpl_3", "cp_entier_construire_collection", 2,
    "Un cadre plein a dix cases. Compte les cases vides.",
    ["construire", "canvas"], [
    // Compléter le cadre de dix.
    () => {
      const k = randomInt(2, 9);
      const p = quelquun();
      const t = randomChoice([
        "Combien de jetons faut-il ajouter pour remplir le cadre ?",
        `${p.nom} veut 10 jetons dans son cadre. Combien doit-${p.il} en ajouter ?`,
        `Pic veut remplir le cadre de dix. Combien de jetons lui manque-t-il ?`,
        "Combien de cases sont encore vides ?",
      ]);
      return qcm(t, choixNombres(10 - k, [k, 10 - k + 1, 10 - k - 1, 10]), String(10 - k),
        exp("Un cadre de dix a dix cases.", "On compte les cases vides.", `${k} + ${10 - k} = 10.`, `Il faut ajouter ${10 - k} jetons.`),
        cadres(k, 1));
    },
    // Prendre des paquets de dix.
    () => {
      const d = randomInt(2, 9);
      const n = d * 10;
      const p = quelquun();
      const r = randomChoice(RANGEMENTS);
      const t = randomChoice([
        `${p.nom} doit prendre ${n} ${r.mots}. ${r.f ? "Elles sont rangées" : "Ils sont rangés"} en ${r.paquets}. Combien de ${r.paquets} prend-${p.il} ?`,
        `Pour la fête, il faut ${n} ${r.mots}. Combien de ${r.paquets} faut-il prendre ?`,
        `Pic veut ${n} ${r.mots}. Combien de ${r.paquets} doit-il prendre ?`,
      ]);
      return qcm(t, choixNombres(d, [n, d + 1, d - 1, 10]), String(d),
        exp("Un paquet contient dix objets.", "On compte de dix en dix jusqu'au nombre voulu.",
          `${n}, c'est ${d} dizaines : ${d} paquets de dix.`, `Il faut ${d} ${r.paquets}.`));
    },
  ]),
  gab("cp_entier_construire_collection_tpl_1", "cp_entier_construire_collection", 3,
    "Regarde le chiffre des unités : c'est le nombre de cubes tout seuls.",
    ["construire", "canvas"], [
    // Combien de cubes ajouter au dessin ?
    () => {
      const d = randomInt(2, 8);
      const u = randomInt(0, 4);
      const v = randomInt(u + 2, 9);
      const n = d * 10 + v;
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} veut faire ${n} avec ses cubes. Voici ce qu'${p.il} a déjà. Combien de cubes doit-${p.il} ajouter ?`,
        `Pic veut obtenir ${n}. Combien de cubes tout seuls lui manque-t-il ?`,
        `Il faut ${n} cubes. Combien en manque-t-il sur la table ?`,
      ]);
      return qcm(t, choixNombres(v - u, [v, u, v - u + 1, n - d * 10 - u + 10]), String(v - u),
        exp("Le chiffre des unités dit combien de cubes tout seuls il faut.", "On compare les cubes qu'on a et ceux qu'il faut.",
          `${n}, c'est ${d} barres et ${v} cubes. On a déjà ${u} cube${u > 1 ? "s" : ""} : il manque ${v - u}.`, `Il faut ajouter ${v - u} cubes.`),
        materiel(d, u));
    },
    // Combien de barres ajouter ?
    () => {
      const d = randomInt(1, 5);
      const e = randomInt(d + 1, 9);
      const u = randomInt(1, 9);
      const n = e * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} veut faire ${n}. Voici ses cubes. Combien de barres de dix doit-${p.il} ajouter ?`,
        `Pic doit obtenir ${n}. Combien de barres de dix lui manque-t-il ?`,
        `Pour faire ${n}, combien de barres faut-il encore ajouter au dessin ?`,
      ]);
      return qcm(t, choixNombres(e - d, [e, d, e - d + 1, 10 * (e - d)]), String(e - d),
        exp("Le chiffre des dizaines dit combien de barres il faut.", "On compare les barres qu'on a et celles qu'il faut.",
          `${n}, c'est ${e} barres et ${u} cubes. Il y a déjà ${d} barre${d > 1 ? "s" : ""} : il en manque ${e - d}.`, `Il faut ajouter ${e - d} barres.`),
        materiel(d, u));
    },
    // Sans dessin : combien de cubes tout seuls ?
    () => {
      const n = randomInt(2, 9) * 10 + randomInt(1, 9);
      const d = Math.floor(n / 10);
      const u = n % 10;
      const p = quelquun();
      const demandeBarres = Math.random() < 0.5;
      const t = demandeBarres
        ? `${p.nom} fabrique ${n} avec des barres de dix et des cubes. Combien de barres prend-${p.il} ?`
        : `${p.nom} fabrique ${n} avec des barres de dix et des cubes. Combien de cubes tout seuls prend-${p.il} ?`;
      const bon = demandeBarres ? d : u;
      return qcm(t, choixNombres(bon, demandeBarres ? [u, n, d + 1] : [d, n, u + 1]), String(bon),
        exp("Dans un nombre, les dizaines sont les barres et les unités les cubes.", "On lit le chiffre des dizaines et celui des unités.",
          `${n} : ${d} dizaines et ${u} unités.`, demandeBarres ? `Il prend ${d} barres.` : `Il prend ${u} cubes tout seuls.`));
    },
  ]),
  gab("cp_entier_construire_collection_tpl_2", "cp_entier_construire_collection", 4,
    "Compte d'abord les barres qui manquent, puis les cubes.",
    ["construire", "canvas"], [
    // Barres ET cubes à ajouter.
    () => {
      const d = randomInt(1, 5);
      const u = randomInt(0, 4);
      const e = randomInt(d + 1, 9);
      const v = randomInt(u + 1, 9);
      const n = e * 10 + v;
      const p = quelquun();
      const bon = `${e - d} barre${e - d > 1 ? "s" : ""} et ${v - u} cube${v - u > 1 ? "s" : ""}`;
      const f = (b: number, c: number) => `${b} barre${b > 1 ? "s" : ""} et ${c} cube${c > 1 ? "s" : ""}`;
      const t = randomChoice([
        `${p.nom} veut faire ${n}. Voici ce qu'${p.il} a déjà. Que doit-${p.il} ajouter ?`,
        `Pic veut obtenir ${n} avec ces cubes. Que lui manque-t-il ?`,
        `Pour faire ${n}, que faut-il ajouter au dessin ?`,
      ]);
      return qcm(t, makeChoices(bon, [f(e, v), f(v - u, e - d), f(e - d + 1, v - u)]), bon,
        exp("Les dizaines sont des barres, les unités des cubes.", "On compare barres avec barres, cubes avec cubes.",
          `${n} : ${e} barres et ${v} cubes. Il y a ${d} barre${d > 1 ? "s" : ""} et ${u} cube${u > 1 ? "s" : ""}.`, `Il faut ajouter ${bon}.`),
        materiel(d, u));
    },
    // Compléter des paquets de dix.
    () => {
      const d = randomInt(2, 7);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const p = quelquun();
      const r = randomChoice(RANGEMENTS);
      const t = randomChoice([
        `${p.nom} a déjà ${d} ${r.paquets}. Il lui faut ${n} ${r.mots} en tout. Combien ${de(r.mots)} ${seuls(r)} doit-${p.il} ajouter ?`,
        `Pour la kermesse, il faut ${n} ${r.mots}. On a ${d} ${r.paquets}. Combien en manque-t-il ?`,
        `Pic veut ${n} ${r.mots}. Il a ${d} ${r.paquets}. Combien lui en manque-t-il ?`,
      ]);
      return qcm(t, choixNombres(u, [n - d, u + 10, d, u + 1]), String(u),
        exp("Un paquet de dix vaut dix.", "On compte ce qu'on a, puis ce qui manque.",
          `${d} paquets font ${d * 10}. Pour aller à ${n}, il manque ${u}.`, `Il faut ajouter ${u} ${r.mots}.`));
    },
  ]),

  /* =========================================================
     CP_ENTIER_DIZAINE_UNITE — la valeur d'un chiffre selon sa place
  ========================================================= */
  gab("cp_entier_dizaine_unite_tpl_1", "cp_entier_dizaine_unite", 2,
    "Le chiffre de gauche dit les dizaines, celui de droite les unités.",
    ["position", "canvas"], [
    () => {
      const n = randomInt(2, 9) * 10 + randomInt(1, 9);
      const d = Math.floor(n / 10);
      const u = n % 10;
      if (u === d) return qcmChiffre(n + 1 > 99 ? n - 1 : n + 1);
      return qcmChiffre(n);
    },
    // Lire les dizaines sur le dessin.
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const p = quelquun();
      const dizaines = Math.random() < 0.5;
      const t = dizaines
        ? `${randomChoice(BATISSEURS)(p)} Quel est le chiffre des dizaines de ce nombre ?`
        : `${randomChoice(BATISSEURS)(p)} Quel est le chiffre des unités de ce nombre ?`;
      const bon = dizaines ? d : u;
      return qcm(t, choixNombres(bon, [dizaines ? u : d, d * 10 + u, bon * 10, bon + 1]), String(bon),
        exp("Les barres sont les dizaines, les cubes tout seuls sont les unités.", dizaines ? "On compte les barres." : "On compte les cubes tout seuls.",
          `Il y a ${d} barres et ${u} cubes : le nombre est ${d * 10 + u}.`, `Le chiffre des ${dizaines ? "dizaines" : "unités"} est ${bon}.`),
        materiel(d, u));
    },
    // Écrire le nombre à partir des dizaines et unités.
    () => {
      const d = randomInt(1, 9);
      const u = randomInt(0, 9);
      const n = d * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `Quel nombre a ${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""} ?`,
        `${p.nom} pense à un nombre : ${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""}. Lequel ?`,
        `Pic écrit ${d} dizaine${d > 1 ? "s" : ""} et ${u} unité${u > 1 ? "s" : ""}. Quel nombre est-ce ?`,
      ]);
      return qcm(t, choixNombres(n, [u * 10 + d, d + u, n + 10, n + 1]), String(n),
        exp("Le chiffre des dizaines s'écrit à gauche, celui des unités à droite.", "On écrit les dizaines, puis les unités.",
          `${d} dizaines et ${u} unités : ${n}.`, `C'est ${n}.`));
    },
  ]),
  gab("cp_entier_dizaine_unite_fixed_1", "cp_entier_dizaine_unite", 3,
    "Le chiffre de gauche compte des paquets de dix.",
    ["position", "piege"], [
    () => valeurChiffre(true),
  ]),
  gab("cp_entier_dizaine_unite_fixed_2", "cp_entier_dizaine_unite", 4,
    "Mêmes chiffres, mais pas à la même place : regarde le chiffre des dizaines.",
    ["position", "piege"], [
    // Les mêmes chiffres en euros : les billets de 10 € montrent les dizaines.
    () => {
      const [a, b] = deuxEnfants();
      const x = randomInt(1, 4);
      const y = randomInt(x + 1, 5);
      const [da, ua] = Math.random() < 0.5 ? [x, y] : [y, x];
      const na = da * 10 + ua;
      const nb = ua * 10 + da;
      const plus = na > nb ? a : b;
      const t = randomChoice([
        `${a.nom} a ${na} € et ${b.nom} a ${nb} €. Ce sont les mêmes chiffres. Qui a le plus d'argent ?`,
        `Voici l'argent ${deN(a.nom)} et ${deN(b.nom)} : ${na} € et ${nb} €. Qui en a le plus ?`,
      ]);
      return qcm(t, makeChoices(plus.nom, [plus === a ? b.nom : a.nom, "ils ont autant", "on ne peut pas savoir"]), plus.nom,
        exp("Un chiffre ne vaut pas la même chose selon sa place.", "Le chiffre des dizaines compte les billets de 10 €.",
          `${na} € : ${da} billets de 10 €. ${nb} € : ${ua} billets de 10 €.`, `${plus.nom} a le plus d'argent.`),
        {
          kind: "monnaie",
          groupes: [
            { nom: a.nom, elements: [{ valeur: "10e", nombre: da }, { valeur: "1e", nombre: ua }] },
            { nom: b.nom, elements: [{ valeur: "10e", nombre: ua }, { valeur: "1e", nombre: da }] },
          ],
        });
    },
    // 23 et 32 : les mêmes chiffres, pas le même nombre (le BO).
    () => {
      const [a, b] = deuxEnfants();
      let x = randomInt(1, 8);
      let y = randomInt(x + 1, 9);
      if (Math.random() < 0.5) [x, y] = [y, x];
      const na = x * 10 + y;
      const nb = y * 10 + x;
      const r = randomChoice(RANGEMENTS);
      const plus = na > nb ? a : b;
      const t = randomChoice([
        `${a.nom} a ${na} ${r.mots}. ${b.nom} en a ${nb}. ${a.nom} dit : « On en a autant, ce sont les mêmes chiffres ! » Qui a le plus ${de(r.mots)} ?`,
        `${a.nom} a ${na} ${r.mots} et ${b.nom} en a ${nb}. Les chiffres sont les mêmes. Qui en a le plus ?`,
      ]);
      return qcm(t, makeChoices(plus.nom, [plus === a ? b.nom : a.nom, "ils en ont autant", "on ne peut pas savoir"]), plus.nom,
        exp("Un chiffre ne vaut pas la même chose selon sa place.", "On compare d'abord les dizaines.",
          `${na} a ${Math.floor(na / 10)} dizaines, ${nb} en a ${Math.floor(nb / 10)}.`, `${plus.nom} en a le plus.`));
    },
    () => {
      const x = randomInt(1, 8);
      const y = randomInt(x + 1, 9);
      const p = quelquun();
      const bon = "les chiffres ne sont pas à la même place";
      const t = randomChoice([
        `${x}${y} et ${y}${x} s'écrivent avec les mêmes chiffres. Pourquoi ne sont-ils pas le même nombre ?`,
        `${p.nom} demande : « ${x}${y} et ${y}${x}, c'est pareil ? » Que lui répondre ?`,
      ]);
      const bonne = t.includes("Pourquoi") ? bon : "non, les chiffres ne sont pas à la même place";
      return qcm(t, makeChoices(bonne, t.includes("Pourquoi")
        ? ["on les prononce autrement", `${y}${x} est écrit à l'envers`, "ce sont bien le même nombre"]
        : ["oui, ce sont les mêmes chiffres", `non, ${x}${y} est plus grand`, "oui, on les dit pareil"]), bonne,
        exp("Un chiffre ne vaut pas la même chose selon sa place.", "On regarde le chiffre des dizaines de chaque nombre.",
          `${x}${y} a ${x} dizaines, ${y}${x} en a ${y}.`, "Les chiffres ne sont pas à la même place."));
    },
  ]),
  gab("cp_entier_dizaine_unite_tpl_2", "cp_entier_dizaine_unite", 4,
    "Le même chiffre ne vaut pas la même chose à gauche et à droite.",
    ["position", "piege"], [
    () => valeurChiffre(false),
    // Le même chiffre deux fois.
    () => {
      const c = randomInt(2, 9);
      const n = c * 11;
      const p = quelquun();
      const premier = Math.random() < 0.5;
      const bon = premier ? c * 10 : c;
      const t = randomChoice([
        `Dans ${n}, que vaut le ${premier ? "premier" : "deuxième"} ${c} ?`,
        `Le dossard ${deN(p.nom)} porte le numéro ${n}. Que vaut le ${c} de ${premier ? "gauche" : "droite"} ?`,
      ]);
      return qcm(t, choixNombres(bon, [premier ? c : c * 10, n, c + c]), String(bon),
        exp("La valeur d'un chiffre dépend de sa place.", "À gauche, il compte des dizaines ; à droite, des unités.",
          `${n} = ${c * 10} + ${c}.`, `Il vaut ${bon}.`));
    },
  ]),

  /* =========================================================
     CP_ENTIER_REPRESENTATIONS — chiffres, mots, matériel
  ========================================================= */
  gab("cp_entier_representations_tpl_2", "cp_entier_representations", 3,
    "Les barres sont les dizaines, les cubes tout seuls les unités.",
    ["representations", "canvas"], [
    // Le dessin vers « d dizaines et u unités ».
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const p = quelquun();
      const bon = du(d, u);
      const t = `${randomChoice(BATISSEURS)(p)} ${randomChoice(["Quelle phrase va avec ce dessin ?", "Comment dire ce nombre ?", "Que montre ce dessin ?"])}`;
      return qcm(t, makeChoices(bon, [du(u, d), du(d, u + 1), `${d + u} unités`]), bon,
        exp("Une barre est une dizaine, un cube est une unité.", "On compte les barres, puis les cubes.",
          `${d} barres et ${u} cubes.`, `${bon}.`),
        materiel(d, u));
    },
    // Le nombre vers « d dizaines et u unités ».
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const n = d * 10 + u;
      const p = quelquun();
      const bon = du(d, u);
      const t = randomChoice([
        `Comment dit-on ${n} en dizaines et en unités ?`,
        `${p.nom} a ${n} billes. Combien de dizaines et d'unités ?`,
        `Pic veut fabriquer ${n} avec des barres et des cubes. Que lui faut-il ?`,
      ]);
      return qcm(t, makeChoices(bon, [du(u, d), du(d, u + 1), `${d + u} unités`]), bon,
        exp("Le chiffre de gauche dit les dizaines, celui de droite les unités.", "On lit les deux chiffres.",
          `${n} = ${d * 10} + ${u}.`, `${n}, c'est ${bon}.`));
    },
  ]),
  gab("cp_entier_representations_tpl_1", "cp_entier_representations", 3,
    "Compte les barres de dix en dix, puis les cubes un par un.",
    ["representations", "canvas"], [
    () => {
      const d = randomInt(2, 9);
      const u = randomInt(0, 9);
      const n = d * 10 + u;
      const p = quelquun();
      return qcm(`${randomChoice(BATISSEURS)(p)} ${randomChoice(["Quel nombre est représenté ?", "Quel nombre vois-tu ?", "Écris ce nombre en chiffres."])}`,
        choixNombres(n, [u * 10 + d, d + u, n + 10, n - 1]), String(n),
        exp("Une barre vaut dix, un cube vaut un.", "On compte les barres de dix en dix, puis les cubes.",
          `${d} barres : ${d * 10}${u ? `, et ${u} cubes : ${n}` : ""}.`, `Le nombre est ${n}.`),
        materiel(d, u));
    },
    // Les cadres de dix (jusqu'à 30).
    () => {
      const n = randomInt(12, 29);
      const p = quelquun();
      const t = randomChoice([
        "Quel nombre montrent ces cadres de dix ?",
        `${p.nom} a posé ses jetons dans les cadres. Combien en a-t-${p.il} ?`,
        "Combien de jetons y a-t-il dans les cadres ?",
      ]);
      return qcm(t, choixNombres(n, [n - 10, n + 10, n - 1, (n % 10) * 10 + Math.floor(n / 10)]), String(n),
        exp("Un cadre plein vaut dix.", "On compte les cadres pleins de dix en dix, puis les jetons du dernier cadre.",
          `${Math.floor(n / 10)} cadres pleins et ${n % 10} jetons : ${n}.`, `Les cadres montrent ${n}.`),
        cadres(n, 3));
    },
    // Des barres et des cubes racontés.
    () => {
      const d = randomInt(2, 9);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `${p.nom} a ${d} barres de dix et ${u} cube${u > 1 ? "s" : ""}. Quel nombre a-t-${p.il} fait ?`,
        `Pic a ${u} cube${u > 1 ? "s" : ""} et ${d} barres de dix. Quel nombre a-t-il fait ?`,
      ]);
      return qcm(t, choixNombres(n, [u * 10 + d, d + u, n + 10]), String(n),
        exp("Une barre vaut dix, un cube vaut un.", "On met les dizaines à gauche, même si on les dit après.",
          `${d} barres et ${u} cubes : ${n}.`, `C'est ${n}.`));
    },
  ]),
  gab("cp_entier_representations_fixed_2", "cp_entier_representations", 5,
    "Plus de dix unités ? Avec dix d'entre elles, fais une dizaine de plus.",
    ["representations", "piege", "canvas"], [
    // « 2 dizaines et 15 unités » : il reste un échange à faire.
    () => {
      const d = randomInt(1, 6);
      const u = randomInt(11, 19);
      const n = d * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `Quel nombre s'écrit « ${d} dizaine${d > 1 ? "s" : ""} et ${u} unités » ?`,
        `${p.nom} a ${d} dizaine${d > 1 ? "s" : ""} et ${u} unités. Quel nombre est-ce ?`,
        `Pic dit : « J'ai ${u} unités et ${d} dizaine${d > 1 ? "s" : ""}. » Quel est son nombre ?`,
        `${p.nom} compte ${d} paquet${d > 1 ? "s" : ""} de dix billes et ${u} billes toutes seules. Combien de billes ?`,
        `Le pirate a ${d} bourse${d > 1 ? "s" : ""} de dix pièces d'or et ${u} pièces en vrac. Combien de pièces en tout ?`,
        `La boulangère a ${d} plateau${d > 1 ? "x" : ""} de dix croissants et ${u} croissants à part. Combien de croissants ?`,
      ]);
      return qcm(t, choixNombres(n, [d * 10 + (u - 10), d + u, n - 10, n + 10]), String(n),
        exp("Dix unités font une dizaine.", "On fait une dizaine avec dix unités, puis on compte.",
          `${u} unités = 1 dizaine et ${u - 10} unités. On a donc ${d + 1} dizaines et ${u - 10} unités : ${n}.`, `C'est ${n}.`));
    },
    // Le même piège, dessiné.
    () => {
      const d = randomInt(1, 6);
      const u = randomInt(11, 19);
      const n = d * 10 + u;
      const p = quelquun();
      const t = `${randomChoice(BATISSEURS)(p)} ${randomChoice(["Il y a beaucoup de cubes tout seuls ! Quel nombre est représenté ?", "Quel nombre montre ce dessin ?"])}`;
      return qcm(t, choixNombres(n, [d * 10 + (u - 10), d + u, n + 10]), String(n),
        exp("Dix cubes font une barre.", "On fait une barre avec dix cubes, puis on compte.",
          `${d} barres et ${u} cubes, c'est ${d + 1} barres et ${u - 10} cubes : ${n}.`, `Le dessin montre ${n}.`),
        materiel(d, u, { echange: "unites" }));
    },
    // Zéro unité ou zéro dizaine.
    () => {
      const d = randomInt(2, 9);
      const n = d * 10;
      const p = quelquun();
      const t = randomChoice([
        `Quel nombre s'écrit « ${d} dizaines et 0 unité » ?`,
        `${p.nom} a ${d} dizaines et aucune unité. Quel nombre est-ce ?`,
        `Pic a rempli ${d} sachets de dix graines. Il n'en reste aucune. Combien de graines a-t-il ?`,
        `${p.nom} a ${d} boîtes de dix crayons, rien d'autre. Combien de crayons a-t-${p.il} ?`,
      ]);
      return qcm(t, choixNombres(n, [d, n + d, n + 1]), String(n),
        exp("Quand il n'y a pas d'unités, on écrit 0 à leur place.", "On écrit les dizaines, puis 0.",
          `${d} dizaines et 0 unité : ${n}.`, `C'est ${n}.`),
        Math.random() < 0.5 ? materiel(d, 0) : undefined);
    },
  ]),

  /* =========================================================
     CP_ENTIER_DECOMPOSER — 47 = 40 + 7
  ========================================================= */
  gab("cp_entier_decomposer_fixed_1", "cp_entier_decomposer", 2,
    "Les barres font les dizaines : 4 barres, c'est 40.",
    ["decomposer", "canvas"], [
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const p = quelquun();
      const bon = `${d * 10} + ${u}`;
      const t = `${randomChoice(BATISSEURS)(p)} ${randomChoice(["Quelle addition va avec ce dessin ?", "Quel calcul montre ce dessin ?", "Quelle est la bonne addition ?"])}`;
      return qcm(t, makeChoices(bon, [`${d} + ${u}`, `${u * 10} + ${d}`, `${d * 10} + ${u * 10}`]), bon,
        exp("Les barres font les dizaines, les cubes les unités.", "On écrit la valeur des barres, puis celle des cubes.",
          `${d} barres = ${d * 10} et ${u} cubes = ${u}.`, `Le dessin montre ${bon}.`),
        materiel(d, u));
    },
  ]),
  gab("cp_entier_decomposer_tpl_1", "cp_entier_decomposer", 2,
    "Le chiffre des dizaines vaut des dizaines : 4 dans 47, c'est 40.",
    ["decomposer"], [
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const n = d * 10 + u;
      const p = quelquun();
      const bon = `${d * 10} + ${u}`;
      const t = randomChoice([
        `Quelle est la bonne décomposition de ${n} ?`,
        `${p.nom} veut écrire ${n} avec une addition. Laquelle est juste ?`,
        `Pic cherche l'addition qui fait ${n}. Laquelle ?`,
      ]);
      return qcm(t, makeChoices(bon, [`${d} + ${u}`, `${u * 10} + ${d}`, `${d * 10} + ${u * 10}`]), bon,
        exp("Décomposer, c'est séparer les dizaines et les unités.", "On écrit la valeur de chaque chiffre.",
          `${n} = ${d * 10} + ${u}.`, `${n} = ${bon}.`),
        Math.random() < 0.5 ? materiel(d, u) : undefined);
    },
    // Le nombre manquant.
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const n = d * 10 + u;
      const p = quelquun();
      const manqueU = Math.random() < 0.5;
      const t = manqueU
        ? randomChoice([`Complète : ${n} = ${d * 10} + …`, `${p.nom} écrit ${n} = ${d * 10} + … Quel nombre manque ?`])
        : randomChoice([`Complète : ${n} = … + ${u}`, `${p.nom} écrit ${n} = … + ${u}. Quel nombre manque ?`]);
      const bon = manqueU ? u : d * 10;
      return qcm(t, choixNombres(bon, manqueU ? [d, u * 10, u + 1] : [d, u * 10, d * 10 + 10]), String(bon),
        exp("Décomposer, c'est séparer les dizaines et les unités.", "On cherche la valeur du chiffre qui manque.",
          `${n} = ${d * 10} + ${u}.`, `Il manque ${bon}.`),
        materiel(d, u));
    },
  ]),
  gab("cp_entier_decomposer_tpl_2", "cp_entier_decomposer", 3,
    "Des dizaines plus des unités : on écrit les deux chiffres côte à côte.",
    ["decomposer"], [
    () => {
      const d = randomInt(2, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const n = d * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `Calcule : ${d * 10} + ${u}`,
        `Calcule : ${u} + ${d * 10}`,
        `${p.nom} a ${d * 10} billes et en gagne ${u}. Combien en a-t-${p.il} ?`,
        `Pic a ${d * 10} graines. Il en trouve encore ${u}. Combien en a-t-il ?`,
        `Dans le bus de la sortie au zoo, il y a ${d * 10} enfants et ${u} adultes. Combien de personnes en tout ?`,
      ]);
      return qcm(t, choixNombres(n, [u * 10 + d, d + u, n + 10, n - 1]), String(n),
        exp("Ajouter des unités à des dizaines, c'est écrire les deux chiffres.", "Les dizaines à gauche, les unités à droite.",
          `${d * 10} + ${u} = ${n}.`, `Le résultat est ${n}.`),
        t.startsWith("Calcule") ? materiel(d, u) : undefined);
    },
    () => {
      const d = randomInt(2, 9);
      const u = randomInt(1, 9);
      const n = d * 10 + u;
      const p = quelquun();
      const t = randomChoice([
        `Quel nombre fait ${d} dizaines plus ${u} ?`,
        `${p.nom} écrit ${d * 10} + ${u} = … Quel nombre trouve-t-${p.il} ?`,
      ]);
      return qcm(t, choixNombres(n, [u * 10 + d, d + u, n + 10]), String(n),
        exp("Ajouter des unités à des dizaines, c'est écrire les deux chiffres.", "Les dizaines à gauche, les unités à droite.",
          `${d * 10} + ${u} = ${n}.`, `C'est ${n}.`),
        materiel(d, u));
    },
  ]),

  /* =========================================================
     CP_ENTIER_COMPARER — plus grand, plus petit, signes
  ========================================================= */
  gab("cp_entier_comparer_tpl_1", "cp_entier_comparer", 2,
    "Compare d'abord les dizaines. Si elles sont pareilles, compare les unités.",
    ["comparer", "canvas"], [
    // Le signe.
    () => {
      const a = randomInt(10, 99);
      const b = Math.random() < 0.15 ? a : randomInt(10, 99);
      const bon = a < b ? "<" : a > b ? ">" : "=";
      const t = randomChoice([
        `Quel signe faut-il écrire entre ${a} et ${b} ?`,
        `Complète : ${a} … ${b}`,
      ]);
      return qcm(t, ["<", ">", "="], bon,
        exp("« < » veut dire « plus petit que », « > » « plus grand que ».", "On compare les dizaines, puis les unités.",
          `${a} ${bon} ${b}.`, `On écrit ${a} ${bon} ${b}.`));
    },
    // Le plus grand, le plus petit.
    () => {
      let a = randomInt(10, 99);
      let b = randomInt(10, 99);
      while (b === a) b = randomInt(10, 99);
      const grand = Math.random() < 0.5;
      const bon = grand ? Math.max(a, b) : Math.min(a, b);
      const t = grand ? `Quel est le plus grand nombre : ${a} ou ${b} ?` : `Quel est le plus petit nombre : ${a} ou ${b} ?`;
      return qcm(t, makeChoices(String(bon), [String(grand ? Math.min(a, b) : Math.max(a, b)), "ils sont égaux"]), String(bon),
        exp("Le nombre qui a le plus de dizaines est le plus grand.", "On compare les dizaines, puis les unités.",
          `${Math.min(a, b)} < ${Math.max(a, b)}.`, `Le plus ${grand ? "grand" : "petit"} est ${bon}.`));
    },
    // Un enfant de la troupe affirme : vrai ou faux ?
    () => {
      let a = randomInt(10, 99);
      let b = randomInt(10, 99);
      while (b === a) b = randomInt(10, 99);
      const k = randomChoice(TROUPE);
      const signe = Math.random() < 0.5 ? "plus grand" : "plus petit";
      const vrai = signe === "plus grand" ? a > b : a < b;
      return qcm(`${k.nom} dit quelque chose. A-t-${k.il} raison ?`, ["oui", "non"], vrai ? "oui" : "non",
        exp("Le nombre qui a le plus de dizaines est le plus grand.", "On compare les dizaines, puis les unités.",
          `${Math.min(a, b)} < ${Math.max(a, b)}.`, vrai ? `Oui, ${a} est ${signe} que ${b}.` : `Non, ${a} n'est pas ${signe} que ${b}.`),
        parle(k.id, `${a} est ${signe} que ${b}.`));
    },
  ]),
  gab("cp_entier_comparer_fixed_1", "cp_entier_comparer", 3,
    "Compare d'abord les dizaines des deux nombres.",
    ["comparer", "piege"], [
    () => compareDessin(false),
    () => {
      const [x, y] = deuxEnfants();
      const r = randomChoice(RANGEMENTS);
      let a = randomInt(20, 99);
      let b = randomInt(20, 99);
      while (Math.abs(a - b) < 2) b = randomInt(20, 99);
      const plus = Math.random() < 0.6;
      const gagnant = plus ? (a > b ? x : y) : (a < b ? x : y);
      const t = randomChoice([
        `${x.nom} a ${a} ${r.mots}. ${y.nom} en a ${b}. Qui en a le ${plus ? "plus" : "moins"} ?`,
        `À la récré, ${x.nom} compte ${a} ${r.mots} et ${y.nom} en compte ${b}. Qui en a le ${plus ? "plus" : "moins"} ?`,
        `Pic regarde les ${r.mots} : ${x.nom} en a ${a}, ${y.nom} en a ${b}. Qui en a le ${plus ? "plus" : "moins"} ?`,
      ]);
      return qcm(t, makeChoices(gagnant.nom, [gagnant === x ? y.nom : x.nom, "ils en ont autant", "on ne peut pas savoir"]), gagnant.nom,
        exp("Le nombre qui a le plus de dizaines est le plus grand.", "On compare les dizaines, puis les unités.",
          `${Math.min(a, b)} < ${Math.max(a, b)}.`, `${gagnant.nom} en a le ${plus ? "plus" : "moins"}.`));
    },
    () => {
      const [x, y] = deuxEnfants();
      let a = randomInt(20, 99);
      let b = randomInt(20, 99);
      while (Math.abs(a - b) < 2) b = randomInt(20, 99);
      const jeu = randomChoice(["au jeu de fléchettes", "au chamboule-tout", "au jeu de l'oie", "au basket", "à la course en sac"]);
      const gagnant = a > b ? x : y;
      const t = `${jeu.charAt(0).toUpperCase() + jeu.slice(1)}, ${x.nom} marque ${a} points et ${y.nom} ${b} points. Qui a gagné ?`;
      return qcm(t, makeChoices(gagnant.nom, [gagnant === x ? y.nom : x.nom, "personne", "on ne peut pas savoir"]), gagnant.nom,
        exp("Le nombre qui a le plus de dizaines est le plus grand.", "On compare les dizaines, puis les unités.",
          `${Math.min(a, b)} < ${Math.max(a, b)}.`, `${gagnant.nom} a gagné.`));
    },
  ]),
  gab("cp_entier_comparer_tpl_2", "cp_entier_comparer", 4,
    "Ce sont les dizaines qui décident, pas le plus gros chiffre.",
    ["comparer", "piege"], [
    () => compareDessin(true),
    // Les pièges : chiffres inversés, unités plus grandes.
    () => {
      const [a, b] = paireTroublante();
      const p = quelquun();
      const grand = Math.random() < 0.6;
      const bon = grand ? Math.max(a, b) : Math.min(a, b);
      const t = randomChoice([
        `Quel est le ${grand ? "plus grand" : "plus petit"} nombre : ${a} ou ${b} ?`,
        `${p.nom} hésite entre ${a} et ${b}. Lequel est le ${grand ? "plus grand" : "plus petit"} ?`,
      ]);
      return qcm(t, makeChoices(String(bon), [String(grand ? Math.min(a, b) : Math.max(a, b)), "ils sont égaux", "on ne peut pas savoir"]), String(bon),
        exp("Ce sont les dizaines qui comptent d'abord.", "On compare les dizaines ; si elles sont égales, les unités.",
          `${Math.min(a, b)} < ${Math.max(a, b)}.`, `Le ${grand ? "plus grand" : "plus petit"} est ${bon}.`));
    },
    () => {
      const [a, b] = paireTroublante();
      const [x, y] = deuxEnfants();
      const lieu = randomChoice(["la bibliothèque", "le château", "la cabane", "le musée des dinosaures"]);
      const gagnant = a > b ? x : y;
      const t = `Pour aller à ${lieu}, ${x.nom} marche ${a} pas et ${y.nom} ${b} pas. Qui fait le plus de pas ?`;
      return qcm(t, makeChoices(gagnant.nom, [gagnant === x ? y.nom : x.nom, "ils en font autant"]), gagnant.nom,
        exp("Ce sont les dizaines qui comptent d'abord.", "On compare les dizaines, puis les unités.",
          `${Math.min(a, b)} < ${Math.max(a, b)}.`, `${gagnant.nom} fait le plus de pas.`));
    },
  ]),

  /* =========================================================
     CP_ENTIER_ORDONNER — ranger des nombres
  ========================================================= */
  gab("cp_entier_ordonner_tpl_2", "cp_entier_ordonner", 2,
    "Cherche le nombre qui a le plus de dizaines.",
    ["ordonner"], [
    // Le nombre du dessin parmi d'autres.
    () => {
      const d = randomInt(2, 8);
      const u = randomInt(0, 9);
      const a = d * 10 + u;
      const autres = differents(4, 10, 99).filter((x) => x !== a).slice(0, 3);
      const grand = Math.random() < 0.5;
      const tous = [a, ...autres];
      const bon = grand ? Math.max(...tous) : Math.min(...tous);
      const p = quelquun();
      const t = `${randomChoice(BATISSEURS)(p)} On compare ce nombre avec ${autres.join(", ")}. Quel est le ${grand ? "plus grand" : "plus petit"} ?`;
      return qcm(t, shuffle(tous.map(String)), String(bon),
        exp("Le plus grand nombre a le plus de dizaines.", "On compte le dessin, puis on compare les dizaines et les unités.",
          `Le dessin montre ${a}. Rangés : ${[...tous].sort((x, y) => x - y).join(" < ")}.`, `Le ${grand ? "plus grand" : "plus petit"} est ${bon}.`),
        materiel(d, u));
    },
    () => {
      const ns = differents(4, 10, 99);
      const grand = Math.random() < 0.5;
      const bon = grand ? Math.max(...ns) : Math.min(...ns);
      const ctx = randomChoice(LISTES);
      const t = `${ctx(ns.join(" ; "))} Quel est le ${grand ? "plus grand" : "plus petit"} ?`;
      return qcm(t, shuffle(ns.map(String)), String(bon),
        exp("Le plus grand nombre a le plus de dizaines.", "On compare les dizaines, puis les unités.",
          `Rangés : ${[...ns].sort((a, b) => a - b).join(" < ")}.`, `Le ${grand ? "plus grand" : "plus petit"} est ${bon}.`));
    },
  ]),
  gab("cp_entier_ordonner_tpl_1", "cp_entier_ordonner", 3,
    "Commence par le plus petit, puis cherche celui qui vient juste après.",
    ["ordonner"], [
    () => rangement(4, true),
    () => rangement(4, false),
  ]),
  gab("cp_entier_ordonner_tpl_3", "cp_entier_ordonner", 4,
    "Attention aux nombres qui ont la même dizaine : compare leurs unités.",
    ["ordonner"], [
    () => rangement(5, true),
    () => rangement(5, false),
    // Le nombre mal rangé.
    () => {
      const ns = differents(5, 10, 99).sort((a, b) => a - b);
      const i = randomInt(1, 3);
      const faux = [...ns];
      [faux[i], faux[i + 1]] = [faux[i + 1], faux[i]];
      const p = quelquun();
      const t = `${p.nom} a rangé des nombres du plus petit au plus grand : ${faux.join(" ; ")}. Deux nombres sont échangés. Lesquels ?`;
      const bon = `${faux[i]} et ${faux[i + 1]}`;
      const autres = [0, 1, 2, 3].filter((j) => j !== i).map((j) => `${faux[j]} et ${faux[j + 1]}`);
      return qcm(t, makeChoices(bon, autres), bon,
        exp("Ranger du plus petit au plus grand : chaque nombre est plus petit que le suivant.", "On compare chaque nombre avec le suivant.",
          `${faux[i]} > ${faux[i + 1]} : ils ne sont pas dans l'ordre.`, `Il faut échanger ${bon}.`));
    },
  ]),

  /* =========================================================
     CP_ENTIER_DROITE — la demi-droite graduée de un en un
     ⛔ Le dessin n'écrit jamais la valeur cherchée : seules
     quelques graduations portent leur nombre (`valeursEcrites`).
  ========================================================= */
  gab("cp_entier_droite_tpl_1", "cp_entier_droite", 3,
    "Pars du nombre écrit et compte les graduations une par une.",
    ["droite_graduee", "canvas"], [
    () => pointSurDroite(false),
  ]),
  gab("cp_entier_droite_tpl_3", "cp_entier_droite", 3,
    "Chaque graduation avance de un.",
    ["droite_graduee", "canvas"], [
    // Juste avant, juste après, entre deux.
    () => {
      const a = randomInt(12, 95);
      const cas = randomChoice(["apres", "avant", "entre"] as const);
      const bon = cas === "avant" ? a - 1 : a + 1;
      const min = Math.max(0, a - randomInt(3, 5));
      const pts = cas === "entre"
        ? [{ value: a, label: String(a) }, { value: a + 1, label: "?" }, { value: a + 2, label: String(a + 2) }]
        : cas === "apres"
          ? [{ value: a, label: String(a) }, { value: a + 1, label: "?" }]
          : [{ value: a - 1, label: "?" }, { value: a, label: String(a) }];
      const k = randomChoice(TROUPE);
      const p = quelquun();
      const t = cas === "entre"
        ? randomChoice([`Quel nombre se trouve entre ${a} et ${a + 2} ?`, `${k.nom} cherche le nombre caché entre ${a} et ${a + 2}. Lequel est-ce ?`, `${p.nom} a effacé le nombre entre ${a} et ${a + 2}. Lequel était-ce ?`, `Quel nombre se cache sous le point d'interrogation ?`])
        : cas === "apres"
          ? randomChoice([`Quel nombre vient juste après ${a} sur la droite ?`, `${k.nom} avance d'une graduation après ${a}. Où arrive-t-${k.il} ?`, `Le crapaud ${deN(p.nom)} saute une graduation après ${a}. Où arrive-t-il ?`, `Quel nombre se cache sous le point d'interrogation ?`])
          : randomChoice([`Quel nombre vient juste avant ${a} sur la droite ?`, `${k.nom} recule d'une graduation avant ${a}. Où arrive-t-${k.il} ?`, `Le crabe ${deN(p.nom)} recule d'une graduation depuis ${a}. Où arrive-t-il ?`, `Quel nombre se cache sous le point d'interrogation ?`]);
      return qcm(t, choixNombres(bon, [cas === "avant" ? a + 1 : a - 1, bon + 10, bon - 10, a]), String(bon),
        exp("Sur cette droite, chaque graduation avance de un.", "On avance ou on recule d'une graduation.",
          cas === "avant" ? `${a} − 1 = ${bon}.` : `${a} + 1 = ${bon}.`, `Le nombre est ${bon}.`),
        droite({ min, max: min + 10, valeursEcrites: [], points: pts }));
    },
  ]),
  gab("cp_entier_droite_tpl_2", "cp_entier_droite", 4,
    "Repère le seul nombre écrit, puis compte les graduations jusqu'au point.",
    ["droite_graduee", "canvas"], [
    () => pointSurDroite(true),
    // Quel point est placé sur ce nombre ?
    () => {
      const dz = randomInt(1, 9) * 10;
      const min = dz - randomInt(0, 4);
      const max = min + 10;
      const vals = differents(3, min + 1, max - 1).sort((a, b) => a - b);
      const lettres = shuffle(["A", "B", "C"]);
      const cible = randomChoice(vals);
      const bon = lettres[vals.indexOf(cible)];
      const p = quelquun();
      const t = randomChoice([
        `Quel point est placé sur ${cible} ?`,
        `${p.nom} a posé son jeton sur ${cible}. Sur quel point est-il ?`,
        `Pic s'est posé sur ${cible}. Sur quel point est-il ?`,
      ]);
      return qcm(t, ["A", "B", "C"], bon,
        exp("Sur cette droite, chaque graduation avance de un.", `On part du nombre écrit et on compte jusqu'à ${cible}.`,
          `${cible} est sous le point ${bon}.`, `C'est le point ${bon}.`),
        droite({ min, max, valeursEcrites: [dz], points: vals.map((v, i) => ({ value: v, label: lettres[i] })) }));
    },
  ]),

  /* =========================================================
     CP_ENTIER_ORDINAL — premier, deuxième… vingtième
     Quatre attendus du BO, et pas une question jusqu'ici.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_entier_ordinal_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 1,
    theme: "neutral",
    text: "Dans une file d'attente, la voiture blanche est la quatrième. Combien de voitures y a-t-il avant elle ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "La première, la deuxième, la troisième… puis la voiture blanche.",
    explanation: exp(
      "Un nombre ordinal donne une PLACE dans une file : premier, deuxième, troisième…",
      "On compte les places occupées avant celle qu'on cherche.",
      "Avant la quatrième, il y a la première, la deuxième et la troisième : cela fait 3 voitures.",
      "Il y a 3 voitures avant elle.",
    ),
    tags: ["cp", "nombre_entier", "ordinal", "piege"],
  },
  {
    kind: "fixed",
    id: "cp_entier_ordinal_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 2,
    theme: "neutral",
    text: "Le jeton est caché sous le sixième gobelet en partant de la gauche. Quel gobelet faut-il soulever ?",
    format: "qcm",
    choices: [
      "le 6ᵉ en comptant depuis la gauche",
      "le 6ᵉ en comptant depuis la droite",
      "le gobelet du milieu",
      "le dernier gobelet",
    ],
    expected: ["le 6ᵉ en comptant depuis la gauche"],
    comparator: "mcq_exact",
    hint: "« En partant de la gauche » dit par où commencer à compter.",
    explanation: exp(
      "Un rang n'a de sens que si l'on sait d'où l'on compte et dans quel sens.",
      "On repère le point de départ donné par la consigne, puis on compte.",
      "La consigne dit « en partant de la gauche » : on pose le doigt sur le premier gobelet à gauche et on compte jusqu'à six. En comptant depuis la droite, on tomberait sur un autre gobelet.",
      "Il faut soulever le sixième gobelet à partir de la gauche.",
    ),
    tags: ["cp", "nombre_entier", "ordinal", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_entier_ordinal_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte les places une à une, en partant du début.",
    tags: ["cp", "nombre_entier", "ordinal", "template"],
    generate: () => {
      const rang = randomInt(2, 12);
      const objets = randomChoice([
        { pluriel: "wagons", singulier: "wagon" },
        { pluriel: "gobelets", singulier: "gobelet" },
        { pluriel: "camions", singulier: "camion" },
        { pluriel: "lapins", singulier: "lapin" },
      ]);
      return {
        text: `Dans une file de ${objets.pluriel}, quel est le rang du ${objets.singulier} qui a ${rang - 1} ${rang - 1 > 1 ? objets.pluriel : objets.singulier} devant lui ?`,
        format: "qcm",
        choices: makeChoices(RANGS[rang - 1], [
          RANGS[rang - 2],
          RANGS[rang],
          RANGS[Math.min(rang + 1, RANGS.length - 1)],
        ]),
        expected: [RANGS[rang - 1]],
        comparator: "mcq_exact",
        explanation: exp(
          "Le rang d'un objet, c'est le nombre d'objets devant lui, plus lui-même.",
          "On compte ceux qui sont devant, puis on ajoute un.",
          `Il y a ${rang - 1} ${objets.pluriel} devant, et il faut le compter lui aussi : ${rang - 1} + 1 = ${rang}. Il est donc ${RANGS[rang - 1]}.`,
          `Il est ${RANGS[rang - 1]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_entier_ordinal_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "nombre_entier",
    microId: "cp_entier_ordinal",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la lettre qui occupe cette place, en comptant depuis le début.",
    tags: ["cp", "nombre_entier", "ordinal", "template"],
    generate: () => {
      const motif = randomChoice(["AB", "ABC", "AAB", "ABB"]);
      const rang = randomInt(5, 20);
      const lettre = motif[(rang - 1) % motif.length];
      const suite = Array.from({ length: 8 }, (_, i) => motif[i % motif.length]).join("");
      // Trois distracteurs toujours disponibles : un motif « AAB » n'offre
      // sinon qu'une seule autre lettre, et le QCM tomberait à deux lignes.
      const autres = ["A", "B", "C", "D"].filter((l) => l !== lettre);
      return {
        text: `Dans la suite qui se répète « ${suite}… », quelle est la ${RANGS[rang - 1]} lettre ?`,
        format: "qcm",
        choices: makeChoices(lettre, [...autres, "Z"]),
        expected: [lettre],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une suite qui se répète, le motif revient toujours identique.",
          "On repère le motif, puis on compte les lettres jusqu'au rang cherché.",
          `Le motif est « ${motif} », il fait ${motif.length} lettres. On compte les lettres une à une jusqu'à la ${RANGS[rang - 1]} : on tombe sur ${lettre}.`,
          `La ${RANGS[rang - 1]} lettre est ${lettre}.`,
        ),
      };
    },
  },


  /* =========================================================
     CP_ENTIER_RANG — le rang et ce qui le précède
     Le piège : le troisième de la file n'a que DEUX personnes
     devant lui. On confond le rang et la quantité.
  ========================================================= */
  gab("cp_entier_rang_fixed_1", "cp_entier_rang", 3,
    "Pose ton doigt sur le premier à gauche, puis compte jusqu'à celui qui est entouré.",
    ["rang", "piege", "canvas"], [
    // Le rang de l'objet entouré.
    () => {
      const f = randomChoice(FILES);
      const n = randomInt(5, 8);
      const k = randomInt(2, n - 1);
      const bon = rangDe(k, f.f);
      const t = randomChoice([
        `${maj(f.les)} ${f.phrase}. En partant de la gauche, à quel rang est ${f.le} entouré${f.f ? "e" : ""} ?`,
        `Regarde la file. En comptant depuis la gauche, quelle place a ${f.le} entouré${f.f ? "e" : ""} ?`,
        `Pic montre ${f.le} entouré${f.f ? "e" : ""}. En partant de la gauche, quelle est sa place ?`,
      ]);
      return qcm(t, makeChoices(bon, [rangDe(k - 1, f.f), rangDe(k + 1, f.f), rangDe(n - k + 1, f.f)]), bon,
        exp("Le rang dit la place dans une file : premier, deuxième, troisième…", "On part de la gauche et on compte jusqu'à l'objet entouré.",
          `En comptant depuis la gauche, on arrive à ${k}.`, `C'est ${f.f ? "la" : "le"} ${bon}.`),
        file(f.quoi, n, k));
    },
    // Combien avant lui ?
    () => {
      const f = randomChoice(FILES);
      const n = randomInt(5, 8);
      const k = randomInt(2, n - 1);
      const t = randomChoice([
        `${maj(f.les)} ${f.phrase}. Combien ${de(f.mots)} y a-t-il à gauche ${duLe(f.le)} entouré${f.f ? "e" : ""} ?`,
        `Combien ${de(f.mots)} sont avant ${f.le} entouré${f.f ? "e" : ""}, en partant de la gauche ?`,
      ]);
      return qcm(t, choixNombres(k - 1, [k, k + 1, n - k]), String(k - 1),
        exp("Le rang compte aussi l'objet lui-même.", "On compte seulement ceux qui sont à gauche.",
          `${maj(f.le)} entouré${f.f ? "e" : ""} est ${rangDe(k, f.f)} : il y en a ${k - 1} avant.`, `Il y en a ${k - 1}.`),
        file(f.quoi, n, k));
    },
  ]),
  gab("cp_entier_rang_tpl_2", "cp_entier_rang", 3,
    "Le troisième de la file a deux personnes devant lui.",
    ["rang"], [
    // En partant de la droite.
    () => {
      const f = randomChoice(FILES);
      const n = randomInt(5, 8);
      const k = randomInt(2, n - 1);
      const r = n - k + 1;
      const e = f.f ? "e" : "";
      const bon = rangDe(r, f.f);
      const t = randomChoice([
        `${maj(f.les)} ${f.phrase}. En partant de la DROITE, à quel rang est ${f.le} entouré${e} ?`,
        `Cette fois, on compte depuis la droite. Quelle place a ${f.le} entouré${e} ?`,
      ]);
      return qcm(t, makeChoices(bon, [rangDe(k, f.f), rangDe(r - 1, f.f), rangDe(r + 1, f.f), rangDe(r + 2, f.f)]), bon,
        exp("Le rang dépend du côté d'où l'on part.", "On pose le doigt sur le premier à DROITE, puis on compte.",
          `Depuis la droite, on arrive à ${r}.`, `C'est ${f.f ? "la" : "le"} ${bon}.`),
        file(f.quoi, n, k));
    },
    // La file d'attente.
    () => {
      const p = quelquun();
      const lieu = randomChoice(QUEUES);
      const n = randomInt(5, 12);
      const k = randomInt(2, n);
      const t = randomChoice([
        `${n} enfants font la queue ${lieu}. ${p.nom} est ${rangDe(k, p.il === "elle")}. Combien d'enfants sont devant ${p.il === "il" ? "lui" : "elle"} ?`,
        `${maj(lieu)}, ${p.nom} est ${rangDe(k, p.il === "elle")} de la file. Combien d'enfants passent avant ${p.il === "il" ? "lui" : "elle"} ?`,
      ]);
      return qcm(t, choixNombres(k - 1, [k, k + 1, n - k]), String(k - 1),
        exp("Le rang compte aussi la personne elle-même.", "On enlève la personne : on compte seulement ceux de devant.",
          `${rangDe(k, p.il === "elle")} : ${k} − 1 = ${k - 1} devant.`, `Il y a ${k - 1} enfants devant.`));
    },
    // Le k-ième d'une liste.
    () => {
      const pas = randomChoice([1, 2, 5, 10]);
      const depart = randomInt(1, 9);
      const liste = Array.from({ length: 6 }, (_, i) => depart + i * pas);
      const k = randomInt(2, 6);
      const ctx = randomChoice(LISTES);
      const t = `${ctx(liste.join(" ; "))} Quel est le ${RANGS[k - 1]} nombre ?`;
      return qcm(t, choixNombres(liste[k - 1], [liste[k - 2], liste[Math.min(5, k)], k]), String(liste[k - 1]),
        exp("Le rang dit la place dans la liste.", "On compte les nombres depuis le début.",
          `Le ${RANGS[k - 1]} nombre est ${liste[k - 1]}.`, `C'est ${liste[k - 1]}.`));
    },
  ]),
  gab("cp_entier_rang_tpl_1", "cp_entier_rang", 4,
    "Compte ceux qui sont derrière, sans compter la personne elle-même.",
    ["rang", "piege", "canvas"], [
    // Derrière, dans la queue.
    () => {
      const p = quelquun();
      const lieu = randomChoice(QUEUES);
      const n = randomInt(6, 15);
      const k = randomInt(2, n - 1);
      const t = randomChoice([
        `${n} enfants font la queue ${lieu}. ${p.nom} est ${rangDe(k, p.il === "elle")}. Combien d'enfants sont derrière ${p.il === "il" ? "lui" : "elle"} ?`,
        `${maj(lieu)}, il y a ${n} enfants. ${p.nom} est ${rangDe(k, p.il === "elle")}. Combien passent après ${p.il === "il" ? "lui" : "elle"} ?`,
      ]);
      return qcm(t, choixNombres(n - k, [n - k + 1, k, k - 1, n - k - 1]), String(n - k),
        exp("Le rang dit combien de personnes sont devant, et la personne elle-même.", "On enlève ceux de devant et la personne.",
          `${n} − ${k} = ${n - k}.`, `Il y a ${n - k} enfants derrière.`));
    },
    // Après l'objet entouré, sur le dessin.
    () => {
      const f = randomChoice(FILES);
      const n = randomInt(6, 8);
      const k = randomInt(2, n - 2);
      const t = randomChoice([
        `${maj(f.les)} ${f.phrase}. Combien ${de(f.mots)} sont à droite ${duLe(f.le)} entouré${f.f ? "e" : ""} ?`,
        `Combien ${de(f.mots)} viennent après ${f.le} entouré${f.f ? "e" : ""}, en allant vers la droite ?`,
      ]);
      return qcm(t, choixNombres(n - k, [n - k + 1, k, k - 1]), String(n - k),
        exp("On compte seulement ce qui est après l'objet.", "On part de l'objet entouré et on compte vers la droite.",
          `Il y a ${n} ${f.mots} ; ${f.le} entouré${f.f ? "e" : ""} est ${rangDe(k, f.f)} : ${n} − ${k} = ${n - k}.`, `Il y en a ${n - k}.`),
        file(f.quoi, n, k));
    },
  ]),

  /* =========================================================
     CP_ENTIER_DEFI — devinettes et cartes à chiffres
  ========================================================= */
  gab("cp_entier_defi_fixed_1", "cp_entier_defi", 4,
    "Pour le plus grand nombre, mets le plus grand chiffre aux dizaines.",
    ["defi", "piege"], [
    // Les chiffres échangés.
    () => {
      const d = randomInt(1, 9);
      let u = randomInt(1, 9);
      if (u === d) u = u === 9 ? 1 : u + 1;
      const a = d * 10 + u;
      const bon = u * 10 + d;
      const p = quelquun();
      const t = randomChoice([
        `${randomChoice(BATISSEURS)(p)} Pic échange les deux chiffres de ce nombre. Quel nombre obtient-il ?`,
        "Voici un nombre en cubes. Si on échange ses deux chiffres, quel nombre obtient-on ?",
        `${p.nom} écrit le nombre du dessin à l'envers. Quel nombre écrit-${p.il} ?`,
      ]);
      return qcm(t, choixNombres(bon, [a, d + u, bon + 10, bon - 1]), String(bon),
        exp("Un chiffre change de valeur quand il change de place.", "On compte le dessin, puis on échange les deux chiffres.",
          `Le dessin montre ${a} : on obtient ${bon}.`, `C'est ${bon}.`),
        materiel(d, u));
    },
    () => cartes(2, true),
    () => cartes(3, true),
  ]),
  gab("cp_entier_defi_tpl_1", "cp_entier_defi", 5,
    "Lis les indices un par un.",
    ["defi", "canvas"], [
    // Les devinettes.
    () => {
      const d = randomInt(1, 8);
      const u = randomInt(0, 9);
      const n = d * 10 + u;
      const k = randomChoice(TROUPE);
      const indice = randomChoice([
        `J'ai ${du(d, u)}.`,
        `Je suis entre ${d * 10} et ${d * 10 + 10}. Mon chiffre des unités est ${u}.`,
        `Mon chiffre des dizaines est ${d}. Mon chiffre des unités est ${u}.`,
        `J'ai ${u} unité${u > 1 ? "s" : ""} et ${d} dizaine${d > 1 ? "s" : ""}.`,
      ]);
      const p = quelquun();
      const t = randomChoice([
        `${k.nom} pose une devinette. Qui est ce nombre ?`,
        `${k.nom} fait deviner un nombre à ${p.nom}. Quel est ce nombre ?`,
        `Écoute la devinette de ${k.nom}. Quel nombre est-ce ?`,
        `${p.nom} doit trouver le nombre de ${k.nom}. Lequel est-ce ?`,
      ]);
      return qcm(t, choixNombres(n, [u * 10 + d, n + 10, n - 10, d + u]), String(n),
        exp("Un nombre à deux chiffres : les dizaines, puis les unités.", "On écrit le chiffre des dizaines, puis celui des unités.",
          `${d} dizaines et ${u} unités : ${n}.`, `C'est ${n}.`),
        parle(k.id, `Je suis un nombre. ${indice}`));
    },
    // Pic ajoute une barre.
    () => {
      const d = randomInt(1, 8);
      const u = randomInt(1, 9);
      const ajout = randomChoice(["une barre", "un cube"] as const);
      const n = ajout === "une barre" ? (d + 1) * 10 + u : d * 10 + u + 1;
      const p = quelquun();
      const t = randomChoice([
        `Voici des cubes. Pic ajoute ${ajout}. Quel nombre obtient-il ?`,
        `${p.nom} a fait ce nombre. ${p.il === "il" ? "Il" : "Elle"} ajoute ${ajout}. Quel nombre a-t-${p.il} maintenant ?`,
        `Voici les cubes ${deN(p.nom)}. Si on ajoute ${ajout}, quel nombre obtient-on ?`,
      ]);
      return qcm(t, choixNombres(n, [d * 10 + u, ajout === "une barre" ? d * 10 + u + 1 : (d + 1) * 10 + u, n + 1]), String(n),
        exp("Une barre vaut dix, un cube vaut un.", `On compte le dessin, puis on ajoute ${ajout === "une barre" ? "10" : "1"}.`,
          `${d * 10 + u} + ${ajout === "une barre" ? 10 : 1} = ${n}.`, `Pic obtient ${n}.`),
        materiel(d, u));
    },
  ]),
  gab("cp_entier_defi_tpl_2", "cp_entier_defi", 5,
    "Pour le plus petit nombre, mets le plus petit chiffre aux dizaines. Mais jamais 0 devant !",
    ["defi", "piege"], [
    // Une dizaine de moins.
    () => {
      const d = randomInt(2, 9);
      const u = randomInt(0, 9);
      const a = d * 10 + u;
      const bon = a - 10;
      const p = quelquun();
      const t = randomChoice([
        `${randomChoice(BATISSEURS)(p)} Quel nombre a une dizaine de moins ?`,
        `Pic emporte une barre de dix dans son nid. Quel nombre reste-t-il sur le dessin ?`,
        `${p.nom} enlève 10 cubes à ce nombre. Que reste-t-il ?`,
      ]);
      return qcm(t, choixNombres(bon, [a - 1, a + 10, a, bon - 1]), String(bon),
        exp("Une dizaine, c'est une barre de dix.", "On compte le dessin, puis on enlève une barre.",
          `${a} − 10 = ${bon}.`, `Il reste ${bon}.`),
        materiel(d, u));
    },
    () => cartes(2, false),
    () => cartes(3, false),
    // Avec la carte 0.
    () => {
      const x = randomInt(1, 9);
      const p = quelquun();
      const petit = Math.random() < 0.5;
      const bon = petit ? x * 10 : x * 10;
      const t = petit
        ? `${p.nom} a deux cartes : 0 et ${x}. Quel est le plus petit nombre à deux chiffres qu'${p.il} peut faire ?`
        : `${p.nom} a deux cartes : ${x} et 0. Quel nombre à deux chiffres peut-${p.il} écrire ?`;
      return qcm(t, choixNombres(bon, [x, x + 10, x * 10 + 1]), String(bon),
        exp("Un nombre à deux chiffres ne commence jamais par 0.", "On met le 0 à la place des unités.",
          `0${x}, c'est seulement ${x} : un chiffre. Il faut écrire ${x}0.`, `C'est ${bon}.`));
    },
  ]),
];
