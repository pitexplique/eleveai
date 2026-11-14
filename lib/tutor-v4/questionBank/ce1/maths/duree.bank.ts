// lib/tutor-v4/questionBank/ce1/maths/duree.bank.ts
//
// Le temps et les durées du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) — cinq attendus :
//   — lire l'heure sur une horloge à aiguilles, UNIQUEMENT en heures entières,
//     en demi-heures et en quarts d'heure. Les minutes de 5 en 5, c'est le
//     CE2. Aucune question ne doit demander « 4 h 20 » ;
//   — positionner les aiguilles pour une heure donnée, mêmes cas ;
//   — distinguer les heures du matin de celles de l'après-midi ;
//   — connaître les unités heure et minute, et leurs symboles h et min ;
//   — comparer et mesurer une durée écoulée dans la même journée.
//
// LES DEUX PIÈGES DE LA NOTION :
//   1. la petite aiguille, à 3 h 45, est presque sur le 4 : l'élève lit
//      « 4 h 45 ». Elle avance pendant l'heure, elle ne saute pas ;
//   2. 1 h = 60 min, pas 100. Le quart d'heure vaut 15 min parce que 60 se
//      partage en quatre, pas parce que 100 se partagerait.
//
// ⛔ CANVAS : `duree` avec `showDigital: true` imprime l'heure en chiffres
// sous le cadran — sur une question de lecture, il donne la réponse. On écrit
// donc toujours `showDigital: false`. La variante `double_horloge` est sûre
// pour les durées écoulées : elle montre le début et la fin, pas l'écart.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

import type { DureeCanvasData, TutorBankItemV4, TutorGeneratedQuestionV4 } from "@/lib/tutor-v4/types";
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

function dureeCanvas(data: Omit<DureeCanvasData, "kind">): DureeCanvasData {
  return { kind: "duree", ...data };
}

/** 3 h 5 s'écrit « 3 h 05 » : les minutes tiennent sur deux chiffres. */
function heure(h: number, m: number): string {
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les seules minutes lisibles au CE1 : l'heure pile, les quarts, la demie. */
const MINUTES_CE1 = [0, 15, 30, 45] as const;

/* =========================================================
   LES GABARITS (10/11/2026) — situations × tournures × nombres
   ---------------------------------------------------------
   ⛔ Mesure du 10/11 : 2 à 44 squelettes par micro, jusqu'à 18
   répétitions sur 20. « Quelle heure indique cette horloge ? »
   est la MÊME phrase à chaque tirage : l'enfant la reconnaît.
   Chaque gabarit tire donc une FAMILLE (lire, régler, dire
   autrement, par l'autre bout), puis un moment de la journée
   d'un enfant et une tournure. Enfants de 7 ans : phrases
   courtes, la troupe (Nina, Téo, Zoé, Ravi, Pic) et des
   prénoms variés. L'horloge porte la question, jamais la
   réponse : `showDigital: false` partout.
   Mesure : scripts/mesurer-squelettes-coach.ts ce1 duree.
========================================================= */

type Q = TutorGeneratedQuestionV4;
type Enfant = { nom: string; il: "il" | "elle" };

const ENFANTS: readonly Enfant[] = [
  { nom: "Nina", il: "elle" }, { nom: "Téo", il: "il" }, { nom: "Zoé", il: "elle" },
  { nom: "Ravi", il: "il" }, { nom: "Lou", il: "elle" }, { nom: "Malo", il: "il" },
  { nom: "Inès", il: "elle" }, { nom: "Sacha", il: "il" }, { nom: "Amir", il: "il" },
  { nom: "Jade", il: "elle" }, { nom: "Naïa", il: "elle" }, { nom: "Tom", il: "il" },
  { nom: "Lina", il: "elle" }, { nom: "Yanis", il: "il" },
];
const enfant = () => randomChoice(ENFANTS);
/** « de Nina », « d'Amir ». */
const deNom = (nom: string) => (/^[AEIOUYÉÈÎ]/.test(nom) ? `d'${nom}` : `de ${nom}`);
/** « du match de foot », « de la sieste », « de l'atelier ». */
const deAct = (nom: string) => (nom.startsWith("le ") ? `du ${nom.slice(3)}` : `de ${nom}`);
const tirer = (familles: readonly (() => Q)[]): Q => randomChoice(familles)();
const maj = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

function qcm(text: string, bonne: string, pieges: readonly string[], explanation: string, canvas?: Q["canvas"]): Q {
  return {
    text,
    format: "qcm",
    choices: makeChoices(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation,
    ...(canvas ? { canvas } : {}),
  };
}

function gab(id: string, microId: string, difficulty: 1 | 2 | 3 | 4 | 5, hint: string, generate: () => Q, tags: string[] = []): TutorBankItemV4 {
  return {
    kind: "template",
    id,
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId,
    difficulty,
    theme: "neutral",
    hint,
    tags: ["ce1", "duree", "template", ...tags],
    generate,
  };
}

/** L'horloge à aiguilles, sans l'heure écrite dessous. */
const horloge = (h: number, m: number): DureeCanvasData =>
  dureeCanvas({
    variant: "horloge",
    time: { hour: h % 12 === 0 ? 12 : h % 12, minute: m },
    display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
  });

const deuxHorloges = (h1: number, m1: number, h2: number, m2: number): DureeCanvasData =>
  dureeCanvas({
    variant: "double_horloge",
    start: { hour: h1 % 12 === 0 ? 12 : h1 % 12, minute: m1, label: "Début" },
    end: { hour: h2 % 12 === 0 ? 12 : h2 % 12, minute: m2, label: "Fin" },
    display: { showNumbers: true, showMinuteTicks: true, showDigital: false, showLabels: true },
  });

/** Sur le cadran : 1 à 12. */
const h12 = (h: number) => (h % 12 === 0 ? 12 : h % 12);
const suivante = (h: number) => (h12(h) === 12 ? 1 : h12(h) + 1);
const precedente = (h: number) => (h12(h) === 1 ? 12 : h12(h) - 1);
const heures = (n: number) => (n === 1 ? "1 heure" : `${n} heures`);
const minutes = (n: number) => (n === 1 ? "1 minute" : `${n} minutes`);

/** Les moments d'une journée d'enfant, avec l'heure qui leur va (0 à 24 h). */
type Moment = { txt: (p: Enfant) => string; h: readonly number[] };
const MOMENTS: readonly Moment[] = [
  { txt: (p) => `${p.nom} prend son petit-déjeuner.`, h: [7, 8] },
  { txt: (p) => `${p.nom} part à l'école.`, h: [7, 8] },
  { txt: () => "La classe commence.", h: [8, 9] },
  { txt: () => "La récré commence.", h: [10] },
  { txt: () => "La cantine sert le repas.", h: [11, 12] },
  { txt: (p) => `${p.nom} arrive au cirque.`, h: [14, 15, 16] },
  { txt: () => "Le spectacle de marionnettes commence.", h: [14, 15, 16, 17] },
  { txt: (p) => `${p.nom} prend son goûter.`, h: [16] },
  { txt: (p) => `${p.nom} saute dans la piscine.`, h: [14, 15, 16, 17] },
  { txt: () => "Les croissants sortent du four.", h: [6, 7] },
  { txt: () => "La vétérinaire soigne un petit chat.", h: [9, 10, 11, 14, 15] },
  { txt: () => "Les girafes du zoo mangent.", h: [9, 10, 11] },
  { txt: () => "Pic se réveille.", h: [6, 7, 8] },
  { txt: (p) => `${p.nom} plante des radis au jardin.`, h: [9, 10, 15, 16, 17] },
  { txt: () => "Le petit train démarre.", h: [14, 15, 16, 17] },
  { txt: (p) => `Le match de foot ${deNom(p.nom)} commence.`, h: [10, 11, 14, 15] },
  { txt: () => "La bibliothèque ouvre ses portes.", h: [9, 10] },
  { txt: (p) => `${p.nom} prend son bain.`, h: [18, 19] },
  { txt: (p) => `${p.nom} lit une histoire au lit.`, h: [20] },
  { txt: () => "Le gâteau d'anniversaire sort du four.", h: [15, 16, 17] },
  { txt: () => "Les pompiers visitent l'école.", h: [9, 10, 11] },
  { txt: () => "Le bateau pirate quitte le port.", h: [14, 15, 16] },
];
const moment = () => {
  const m = randomChoice(MOMENTS);
  return { txt: m.txt(enfant()), h: randomChoice(m.h) };
};

const LIRE = [
  "Quelle heure indique l'horloge ?",
  "Regarde l'horloge. Quelle heure est-il ?",
  "Lis l'heure sur le cadran.",
  "Quelle heure montre la pendule ?",
  "Quelle heure est-il sur l'horloge ?",
];

/** Les pièges de lecture : la petite aiguille qui « saute », le chiffre lu tel quel. */
function piegesLecture(h: number, m: number): string[] {
  const H = h12(h);
  const lu: Record<number, number> = { 0: 12, 15: 3, 30: 6, 45: 9 };
  return [
    heure(suivante(H), m),
    heure(precedente(H), m),
    m === 0 ? "12 h" : heure(H, lu[m]),
    heure(H, m === 15 ? 45 : m === 45 ? 15 : m === 30 ? 0 : 30),
  ];
}

function questionLecture(minutesPossibles: readonly number[]): Q {
  const mo = moment();
  const m = randomChoice(minutesPossibles);
  const H = h12(mo.h);
  const bonne = heure(H, m);
  return qcm(
    `${mo.txt} ${randomChoice(LIRE)}`,
    bonne,
    piegesLecture(H, m),
    exp(
      "La petite aiguille donne l'heure, la grande donne les minutes.",
      "On lit d'abord le nombre que la petite aiguille a dépassé, puis la place de la grande.",
      m === 0
        ? `La grande aiguille est sur le 12 : l'heure est pile. La petite est sur le ${H}.`
        : `La grande aiguille marque ${m} minutes. La petite a dépassé le ${H} : il est ${H} heures passées.`,
      `Il est ${bonne}.`,
    ),
    horloge(H, m),
  );
}

const PLACE_GRANDE: Record<number, number> = { 0: 12, 15: 3, 30: 6, 45: 9 };

/** Où est la petite aiguille à h h m. */
function placePetite(h: number, m: number): string {
  const H = h12(h);
  if (m === 0) return `sur le ${H}`;
  if (m === 15) return `entre le ${H} et le ${suivante(H)}, tout près du ${H}`;
  if (m === 30) return `au milieu, entre le ${H} et le ${suivante(H)}`;
  return `entre le ${H} et le ${suivante(H)}, tout près du ${suivante(H)}`;
}
const PLACES_PETITE = (h: number) => [0, 15, 30, 45].map((m) => placePetite(h, m)).concat(`sur le ${suivante(h)}`);

/** Les activités d'une demi-journée, avec leur pronom. */
const ACTIVITES: readonly { nom: string; il: "il" | "elle" }[] = [
  { nom: "le match de foot", il: "il" },
  { nom: "la séance de piscine", il: "elle" },
  { nom: "le spectacle de cirque", il: "il" },
  { nom: "la visite du zoo", il: "elle" },
  { nom: "l'atelier gâteaux", il: "il" },
  { nom: "la promenade en forêt", il: "elle" },
  { nom: "le dessin animé", il: "il" },
  { nom: "la sieste de Pic", il: "elle" },
  { nom: "la leçon de musique", il: "elle" },
  { nom: "la chasse au trésor", il: "elle" },
  { nom: "le pique-nique", il: "il" },
  { nom: "la sortie à la ferme", il: "elle" },
  { nom: "le cours de judo", il: "il" },
  { nom: "la partie de cache-cache", il: "elle" },
  { nom: "le tour en petit train", il: "il" },
  { nom: "la fête d'anniversaire", il: "elle" },
  { nom: "le concert de l'école", il: "il" },
  { nom: "la visite du château", il: "elle" },
];
const activite = () => randomChoice(ACTIVITES);

/** Ce qu'un enfant fait pendant un moment. */
const OCCUPATIONS = [
  "joue au ballon", "lit une BD", "fait un puzzle", "dessine un dragon", "arrose le jardin",
  "range sa chambre", "fait du vélo", "nourrit les poules", "construit une cabane",
  "joue du tambour", "prépare un gâteau", "nage à la piscine", "fait ses devoirs",
  "promène le chien", "joue aux pirates", "fabrique une fusée en carton",
];
/** Une activité en un verbe : la phrase reste courte quand la durée est en mots. */
const VERBES = ["joue", "lit", "dessine", "nage", "chante", "danse", "peint", "jardine", "cuisine", "bricole"];
function deuxVerbes(): [string, string] {
  const a = randomChoice(VERBES);
  let b = randomChoice(VERBES);
  while (b === a) b = randomChoice(VERBES);
  return [a, b];
}
function deuxOccupations(): [string, string] {
  const a = randomChoice(OCCUPATIONS);
  let b = randomChoice(OCCUPATIONS);
  while (b === a) b = randomChoice(OCCUPATIONS);
  return [a, b];
}

const MOTS_DUREE: Record<number, string> = {
  15: "un quart d'heure",
  30: "une demi-heure",
  45: "trois quarts d'heure",
  60: "une heure",
};

const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const MOIS = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];
const PROJETS = [
  "va à la piscine", "a son cours de judo", "fête son anniversaire", "va au marché",
  "visite la ferme", "part à la mer", "joue un match de foot", "va à la bibliothèque",
  "va voir le cirque", "plante des fleurs avec sa mamie", "va au zoo", "monte à cheval",
];

/** La même chose, au passé : « Hier, Nina est allée à la piscine. » */
const FAITS = (p: Enfant) => {
  const e = p.il === "elle" ? "e" : "";
  return [
    `est allé${e} à la piscine`, `a eu son cours de judo`, `a fêté son anniversaire`, `est allé${e} au marché`,
    `a visité la ferme`, `a joué un match de foot`, `est allé${e} voir le cirque`, `a planté des fleurs avec sa mamie`,
    `est allé${e} au zoo`, `a fait du poney`,
  ];
};

/** Deux semaines de calendrier, le jour d'aujourd'hui surligné : on compte les cases. */
function calendrier(ligne: 0 | 1, col: number): Q["canvas"] {
  const lundi = randomInt(1, 14);
  return {
    kind: "tableau_donnees",
    title: `Le calendrier de ${randomChoice(MOIS)}`,
    headers: ["lun.", "mar.", "mer.", "jeu.", "ven.", "sam.", "dim."],
    rows: [0, 1].map((r) => ({ values: Array.from({ length: 7 }, (_, k) => lundi + 7 * r + k) })),
    highlight: { cell: { row: ligne, col } },
    display: { compact: true },
    questionLabel: "La case jaune, c'est aujourd'hui.",
  };
}

const GABARITS: TutorBankItemV4[] = [
  /* ---------- LIRE L'HEURE ---------- */
  gab("ce1_duree_lire_tpl_3", "ce1_duree_lire_heure_demi", 1, "La petite aiguille montre l'heure. La grande est sur le 12 : l'heure est pile.", () =>
    tirer([
      () => questionLecture([0]),
      () => {
        const mo = moment();
        const H = h12(mo.h);
        return qcm(
          `${mo.txt} ${randomChoice([
            "Sur quel nombre est la petite aiguille ?",
            "Regarde la petite aiguille. Sur quel nombre est-elle ?",
            "La petite aiguille montre un nombre. Lequel ?",
          ])}`,
          `sur le ${H}`,
          [`sur le ${suivante(H)}`, `sur le ${precedente(H)}`, "sur le 12"],
          exp(
            "La petite aiguille est la plus courte : elle montre l'heure.",
            "On repère l'aiguille la plus courte et on lit le nombre qu'elle touche.",
            `La petite aiguille touche le ${H}. La grande, la plus longue, est sur le 12.`,
            `La petite aiguille est sur le ${H} : il est ${H} h.`,
          ),
          horloge(H, 0),
        );
      },
    ]), ["lire", "canvas"]),
  gab("ce1_duree_lire_tpl_2", "ce1_duree_lire_heure_demi", 2, "Un tour de cadran fait 60 minutes : la moitié du tour, c'est 30 minutes.", () =>
    tirer([
      () => questionLecture([0, 30, 30]),
      () => {
        const mo = moment();
        const m = randomChoice([15, 30, 45]);
        return qcm(
          `${mo.txt} ${randomChoice([
            "Combien de minutes depuis l'heure pile ?",
            "Combien de minutes la grande aiguille montre-t-elle ?",
            "La grande aiguille compte les minutes. Combien en montre-t-elle ?",
          ])}`,
          minutes(m),
          [minutes(PLACE_GRANDE[m]), minutes(m === 30 ? 50 : 30), minutes(m === 15 ? 45 : 15), "60 minutes"],
          exp(
            "La grande aiguille fait le tour du cadran en 60 minutes.",
            "On compte 5 minutes par nombre du cadran, en partant du 12.",
            `La grande aiguille est sur le ${PLACE_GRANDE[m]} : ${PLACE_GRANDE[m]} fois 5 minutes, cela fait ${m} minutes.`,
            `Elle montre ${m} minutes.`,
          ),
          horloge(mo.h, m),
        );
      },
    ]), ["lire", "canvas"]),
  gab("ce1_duree_lire_tpl_1", "ce1_duree_lire_heure_demi", 3, "La petite aiguille donne l'heure DÉJÀ dépassée.", () =>
    tirer([() => questionLecture([15, 30, 45]), () => questionLecture([0, 15, 45])]), ["lire", "canvas"]),
  gab("ce1_duree_lire_tpl_4", "ce1_duree_lire_heure_demi", 4, "« Presque sur le 4 » : il n'est pas encore 4 heures.", () =>
    tirer([
      () => questionLecture([45]),
      () => {
        const p = enfant();
        const H = randomInt(1, 11);
        const m = randomChoice([15, 30, 45]);
        const petite =
          m === 15 ? `juste après le ${H}` : m === 30 ? `entre le ${H} et le ${H + 1}` : `presque sur le ${H + 1}`;
        const bonne = heure(H, m);
        return qcm(
          `${randomChoice([`Grande aiguille sur le ${PLACE_GRANDE[m]}, petite ${petite}.`, `Petite aiguille ${petite}, grande sur le ${PLACE_GRANDE[m]}.`])} ${randomChoice([
            "Quelle heure est-il ?",
            "Quelle heure lit-on ?",
            `Quelle heure lit ${p.nom} ?`,
            "Il est quelle heure ?",
            `Quelle heure voit ${p.nom} ?`,
          ])}`,
          bonne,
          [heure(H + 1, m), heure(H, PLACE_GRANDE[m]), heure(PLACE_GRANDE[m], H), heure(H, m === 45 ? 15 : 45)],
          exp(
            "La petite aiguille avance pendant toute l'heure : elle ne saute pas d'un nombre à l'autre.",
            "On lit le nombre que la petite aiguille a déjà dépassé, puis la place de la grande.",
            `La petite a dépassé le ${H} : il est ${H} heures passées. La grande sur le ${PLACE_GRANDE[m]} marque ${m} minutes.`,
            `Il est ${bonne}.`,
          ),
        );
      },
    ]), ["lire", "piege", "canvas"]),

  /* ---------- POSITIONNER LES AIGUILLES ---------- */
  gab("ce1_duree_positionner_tpl_1", "ce1_duree_positionner_aiguilles", 3, "Heure pile : le 12. Et un quart : le 3. Et demie : le 6. Moins le quart de l'heure suivante : le 9.", () =>
    tirer([
      () => {
        const mo = moment();
        const m = randomChoice([0, 15, 30, 45]);
        const H = h12(mo.h);
        return qcm(
          `${mo.txt.replace(/\.$/, "")} à ${heure(H, m)}. ${randomChoice([
            "Sur quel nombre est la grande aiguille ?",
            "Où faut-il mettre la grande aiguille ?",
            "Sur quel nombre pointe la grande aiguille ?",
          ])}`,
          `sur le ${PLACE_GRANDE[m]}`,
          ["sur le 12", "sur le 3", "sur le 6", "sur le 9", `sur le ${H}`],
          exp(
            "La grande aiguille compte les minutes : 5 minutes par nombre du cadran.",
            "On part du 12 et on avance de 5 minutes à chaque nombre.",
            m === 0 ? "À l'heure pile, la grande aiguille est sur le 12." : `${m} minutes, c'est ${m / 5} nombres après le 12 : le ${PLACE_GRANDE[m]}.`,
            `La grande aiguille est sur le ${PLACE_GRANDE[m]}.`,
          ),
        );
      },
      () => {
        const p = enfant();
        const H = randomInt(1, 11);
        const m = randomChoice([15, 30, 45]);
        return qcm(
          `L'horloge montre ${H} h. ${randomChoice([`${p.nom} la règle sur ${heure(H, m)}.`, `Règle-la sur ${heure(H, m)}.`])} Où va la grande aiguille ?`,
          `sur le ${PLACE_GRANDE[m]}`,
          ["sur le 12", "sur le 3", "sur le 6", "sur le 9", `sur le ${H + 1}`],
          exp(
            "La grande aiguille compte les minutes : 5 minutes par nombre du cadran.",
            "On part du 12 et on avance de 5 minutes à chaque nombre.",
            `${m} minutes, c'est ${m / 5} nombres après le 12 : le ${PLACE_GRANDE[m]}.`,
            `Il faut la mettre sur le ${PLACE_GRANDE[m]}.`,
          ),
          horloge(H, 0),
        );
      },
    ]), ["positionner", "canvas"]),
  gab("ce1_duree_positionner_tpl_2", "ce1_duree_positionner_aiguilles", 4, "La petite aiguille avance un peu pendant l'heure : à la demie, elle est au milieu.", () =>
    tirer([
      () => {
        const mo = moment();
        const m = randomChoice([15, 30, 45]);
        const H = h12(mo.h);
        const bonne = placePetite(H, m);
        return qcm(
          `${mo.txt.replace(/\.$/, "")} à ${heure(H, m)}. ${randomChoice([
            "Où est la petite aiguille ?",
            "Où faut-il mettre la petite aiguille ?",
            "Où se trouve la petite aiguille ?",
          ])}`,
          bonne,
          PLACES_PETITE(H),
          exp(
            "La petite aiguille avance doucement pendant toute l'heure.",
            "À la demie, elle est au milieu ; au quart, juste après l'heure ; à moins le quart, presque sur l'heure suivante.",
            `À ${heure(H, m)}, elle a dépassé le ${H} : elle est ${bonne}.`,
            `Elle est ${bonne}.`,
          ),
        );
      },
      () => {
        const p = enfant();
        const H = randomInt(1, 11);
        const m = randomChoice([15, 30, 45]);
        const bonne = placePetite(H, m);
        return qcm(
          `Il est ${H} h. ${p.nom} avance jusqu'à ${heure(H, m)}. Où sera la petite aiguille ?`,
          bonne,
          PLACES_PETITE(H),
          exp(
            "Quand la grande aiguille tourne, la petite avance un peu avec elle.",
            "On regarde quelle part du tour la grande aiguille a faite.",
            m === 30
              ? "La grande a fait un demi-tour : la petite est à mi-chemin."
              : m === 15
                ? "La grande a fait un quart de tour : la petite a juste un peu avancé."
                : "La grande a fait trois quarts de tour : la petite est presque arrivée.",
            `Elle sera ${bonne}.`,
          ),
          horloge(H, 0),
        );
      },
    ]), ["positionner", "piege", "canvas"]),

  /* ---------- MATIN, APRÈS-MIDI, SOIR ---------- */
  gab("ce1_duree_matin_tpl_2", "ce1_duree_matin_apres_midi", 2, "Avant midi, c'est le matin. De 13 h à 18 h, c'est l'après-midi.", () =>
    tirer([
      () => {
        const a = activite();
        const periode = randomChoice(["le matin", "l'après-midi", "le soir"] as const);
        const H = periode === "le matin" ? randomInt(8, 11) : periode === "l'après-midi" ? randomInt(13, 17) : randomInt(19, 21);
        return qcm(
          `${maj(a.nom)} est à ${H} h. ${randomChoice([
            "Est-ce le matin, l'après-midi ou le soir ?",
            "À quel moment de la journée est-ce ?",
            "C'est quel moment de la journée ?",
          ])}`,
          periode,
          ["le matin", "l'après-midi", "le soir"],
          exp(
            "Une journée a 24 heures. Le matin va jusqu'à midi (12 h), l'après-midi jusqu'à 18 h environ, puis vient le soir.",
            "On regarde si l'heure est avant 12, entre 13 et 18, ou après.",
            `${H} h est ${periode === "le matin" ? "avant midi" : periode === "l'après-midi" ? "entre 13 h et 18 h" : "après 18 h"}.`,
            `C'est ${periode}.`,
          ),
        );
      },
      () => {
        const p = enfant();
        const apresMidi = randomChoice([true, false]);
        const bonne = apresMidi ? randomInt(13, 17) : randomInt(7, 11);
        const autres = new Set<number>();
        while (autres.size < 3) {
          const x = apresMidi ? randomInt(7, 11) : randomInt(13, 17);
          autres.add(x);
        }
        const a = activite();
        return qcm(
          `${maj(a.nom)} a lieu ${apresMidi ? "l'après-midi" : "le matin"}. ${randomChoice([
            `À quelle heure peut-${a.il} commencer ?`,
            "Laquelle de ces heures convient ?",
            `${p.nom} lit l'heure sur l'affiche. Laquelle est-ce ?`,
          ])}`,
          `${bonne} h`,
          [...autres].map((x) => `${x} h`),
          exp(
            "Le matin va de minuit à midi ; l'après-midi commence à 12 h.",
            apresMidi ? "On cherche l'heure qui est après midi." : "On cherche l'heure qui est avant midi.",
            `${bonne} h est ${apresMidi ? "après" : "avant"} 12 h ; les autres heures sont ${apresMidi ? "le matin" : "l'après-midi"}.`,
            `C'est ${bonne} h.`,
          ),
        );
      },
      () => {
        const p = enfant();
        const H = randomInt(1, 5);
        const quoi = randomChoice(["goûte", "joue au parc", "sort de l'école", "nage à la piscine", "fait un gâteau", "va au cirque"]);
        return qcm(
          `${p.nom} ${quoi} l'après-midi. L'horloge montre cette heure. ${randomChoice([`Est-il ${H} h ou ${H + 12} h ?`, "Quelle heure est-il vraiment ?"])}`,
          `${H + 12} h`,
          [`${H} h`, `${H + 10} h`],
          exp(
            "L'horloge à aiguilles ne fait que 12 heures : elle montre la même chose le matin et l'après-midi.",
            "L'après-midi, on ajoute 12 à l'heure lue.",
            `L'horloge montre ${H} h. ${H} + 12 = ${H + 12}.`,
            `Il est ${H + 12} h.`,
          ),
          horloge(H, 0),
        );
      },
    ]), ["matin", "canvas"]),
  gab("ce1_duree_matin_tpl_1", "ce1_duree_matin_apres_midi", 3, "Après midi, on enlève 12 : 15 h, c'est 3 heures de l'après-midi.", () =>
    tirer([
      () => {
        const H = randomChoice([13, 14, 15, 16, 17, 19, 20, 21]);
        const n = H - 12;
        const moment_ = H >= 19 ? "du soir" : "de l'après-midi";
        const autre = H >= 19 ? "de l'après-midi" : "du soir";
        const a = activite();
        const bonne = `${heures(n)} ${moment_}`;
        return qcm(
          randomChoice([
            `Il est ${H} h. Comment dit-on cette heure autrement ?`,
            `${maj(a.nom)} commence à ${H} h. Comment le dire autrement ?`,
            `Sur la montre de ${enfant().nom}, il est ${H} h. Quelle phrase dit la même heure ?`,
          ]),
          bonne,
          [`${heures(n)} du matin`, `${heures(H - 10)} ${moment_}`, `${heures(n + 1)} ${moment_}`, `${heures(n)} ${autre}`],
          exp(
            "Après midi, on compte les heures de 13 à 24. On peut aussi dire « de l'après-midi » ou « du soir ».",
            "On enlève 12 au nombre d'heures.",
            `${H} − 12 = ${n}.`,
            `${H} h, c'est ${bonne}.`,
          ),
        );
      },
      () => {
        const n = randomInt(1, 5);
        const H = n + 12;
        const a = activite();
        const p = enfant();
        return qcm(
          randomChoice([
            `${maj(a.nom)} est à ${heures(n)} de l'après-midi. Comment l'écrire sur une montre ?`,
            `${p.nom} dit : « Rendez-vous à ${heures(n)} de l'après-midi. » Quelle heure est-ce ?`,
            `Quelle heure veut dire « ${heures(n)} de l'après-midi » ?`,
          ]),
          `${H} h`,
          [`${n} h`, `${n + 10} h`, `${H + 1} h`, `${H - 1} h`],
          exp(
            "L'après-midi, on compte les heures après 12.",
            "On ajoute 12 au nombre d'heures.",
            `${n} + 12 = ${H}.`,
            `C'est ${H} h.`,
          ),
        );
      },
      () => {
        const p = enfant();
        const H = randomInt(1, 5);
        return qcm(
          `${p.nom} goûte l'après-midi. L'horloge montre cette heure. Quelle heure est-il, de 0 h à 24 h ?`,
          `${H + 12} h`,
          [`${H} h`, `${H + 10} h`, `${H + 13} h`, `${H + 11} h`],
          exp(
            "L'horloge à aiguilles ne fait que 12 heures. L'après-midi, on ajoute 12.",
            "On lit l'heure sur l'horloge, puis on ajoute 12.",
            `L'horloge montre ${H} h. ${H} + 12 = ${H + 12}.`,
            `Il est ${H + 12} h.`,
          ),
          horloge(H, 0),
        );
      },
    ]), ["matin", "canvas"]),

  /* ---------- HEURES ET MINUTES ---------- */
  gab("ce1_duree_unites_tpl_2", "ce1_duree_unites_h_min", 1, "Une minute, c'est court. Une heure, c'est long : 60 minutes.", () =>
    tirer([
      () => {
        const cas = randomChoice([
          { t: "se brosse les dents pendant 3", u: "minutes", apres: "" },
          { t: "se lave les mains pendant 1", u: "minute", apres: "" },
          { t: "chante une chanson qui dure 3", u: "minutes", apres: "" },
          { t: "fait cuire un œuf pendant 10", u: "minutes", apres: "" },
          { t: "fait un tour de manège de 5", u: "minutes", apres: "" },
          { t: "joue à la récré pendant 15", u: "minutes", apres: "" },
          { t: "dort pendant 10", u: "heures", apres: " chaque nuit" },
          { t: "passe 6", u: "heures", apres: " à l'école dans la journée" },
          { t: "regarde un film qui dure 2", u: "heures", apres: "" },
          { t: "visite le zoo pendant 3", u: "heures", apres: "" },
          { t: "part en vacances pendant 7", u: "jours", apres: "" },
          { t: "reste chez sa mamie pendant 3", u: "jours", apres: "" },
        ]);
        const p = enfant();
        const pieges: Record<string, string[]> = {
          minute: ["heure", "jour"],
          minutes: ["heures", "jours"],
          heures: ["minutes", "jours"],
          jours: ["minutes", "heures"],
        };
        return qcm(
          `${p.nom} ${cas.t} …${cas.apres ? `${cas.apres}.` : ""} ${randomChoice(["Quel mot manque ?", "Choisis la bonne unité.", "Quelle unité faut-il écrire ?"])}`,
          cas.u,
          pieges[cas.u],
          exp(
            "Pour une durée, on choisit l'unité qui va avec : minute (court), heure (plus long), jour (très long).",
            "On imagine l'activité et on se demande si cela dure quelques minutes, quelques heures ou quelques jours.",
            `${p.nom} ${cas.t} ${cas.u}${cas.apres} : c'est la durée qui a du sens.`,
            `Il faut écrire « ${cas.u} ».`,
          ),
        );
      },
      () => {
        const p = enfant();
        const a = activite();
        return qcm(
          `${maj(a.nom)} dure 1 heure. ${randomChoice([
            "Combien de minutes cela fait-il ?",
            "Cela fait combien de minutes ?",
            `${p.nom} veut le dire en minutes. Combien ?`,
          ])}`,
          "60 minutes",
          ["100 minutes", "10 minutes", "30 minutes", "12 minutes"],
          exp(
            "Une heure, c'est le temps que met la grande aiguille pour faire un tour complet.",
            "Un tour de cadran compte 60 minutes.",
            "1 h = 60 min.",
            "1 heure, c'est 60 minutes.",
          ),
          (() => { const H = randomInt(1, 10); return deuxHorloges(H, 0, H + 1, 0); })(),
        );
      },
      () => {
        const p = enfant();
        const cas = randomChoice([
          { ecrit: "15 min", sens: "minutes", pieges: ["mètres", "mois", "heures"] },
          { ecrit: "30 min", sens: "minutes", pieges: ["mètres", "mois", "heures"] },
          { ecrit: "2 h", sens: "heures", pieges: ["minutes", "jours", "hauteurs"] },
          { ecrit: "1 h", sens: "heure", pieges: ["minute", "jour", "hauteur"] },
        ]);
        const quoi = randomChoice(["la recette de gâteau", "l'affiche du cirque", "le carnet de la maîtresse", "le panneau de la piscine", "le programme du zoo"]);
        const lettres = cas.ecrit.split(" ")[1];
        return qcm(
          `Sur ${quoi}, ${p.nom} lit « ${cas.ecrit} ». Que veut dire « ${lettres} » ?`,
          cas.sens,
          cas.pieges,
          exp(
            "« h » est le symbole de l'heure, « min » celui de la minute.",
            "On reconnaît le symbole écrit après le nombre.",
            `« ${cas.ecrit} » se lit « ${cas.ecrit.split(" ")[0]} ${cas.sens} ».`,
            `« ${lettres} » veut dire ${cas.sens}.`,
          ),
        );
      },
    ]), ["unites"]),
  gab("ce1_duree_unites_tpl_3", "ce1_duree_unites_h_min", 2, "Une heure = 60 minutes. La moitié de 60, c'est 30 ; le quart, c'est 15.", () =>
    tirer([
      () => {
        const d = randomChoice([15, 30] as const);
        const quoi = randomChoice([
          "La sieste de Pic", "La récré", "Le dessin animé", "La leçon de piano", "La promenade du chien",
          "Le tour de poney", "La partie de billes", "La cuisson du gâteau",
        ]);
        return qcm(
          `${quoi} dure ${MOTS_DUREE[d]}. ${randomChoice(["Combien de minutes cela fait-il ?", "Cela fait combien de minutes ?", "Combien de minutes cela dure-t-il ?"])}`,
          minutes(d),
          d === 30 ? ["50 minutes", "20 minutes", "15 minutes", "60 minutes"] : ["25 minutes", "4 minutes", "30 minutes", "10 minutes"],
          exp(
            "Une heure, c'est 60 minutes.",
            d === 30 ? "Une demi-heure, c'est la moitié d'une heure." : "Un quart d'heure, c'est une heure partagée en 4.",
            d === 30 ? "La moitié de 60, c'est 30 (30 + 30 = 60)." : "15 + 15 + 15 + 15 = 60.",
            `${maj(MOTS_DUREE[d])}, c'est ${d} minutes.`,
          ),
          (() => { const H = randomInt(1, 11); return deuxHorloges(H, 0, H, d); })(),
        );
      },
      () => {
        const d = randomChoice([15, 30, 60] as const);
        const p = enfant();
        const quoi = randomChoice(["joue aux Lego", "fait du trampoline", "lit avec Pic", "peint un arc-en-ciel", "joue au marchand", "fait des bulles"]);
        return qcm(
          `${p.nom} ${quoi} pendant ${d} minutes. ${randomChoice(["Comment le dire autrement ?", "Quelle phrase dit la même durée ?", "C'est combien de temps ?"])}`,
          MOTS_DUREE[d],
          ["un quart d'heure", "une demi-heure", "une heure", "trois quarts d'heure"],
          exp(
            "Une heure, c'est 60 minutes ; une demi-heure, 30 minutes ; un quart d'heure, 15 minutes.",
            "On compare le nombre de minutes à 60.",
            d === 60 ? "60 minutes font un tour complet du cadran." : d === 30 ? "30, c'est la moitié de 60." : "15, c'est le quart de 60.",
            `${d} minutes, c'est ${MOTS_DUREE[d]}.`,
          ),
          (() => { const H = randomInt(1, 10); return deuxHorloges(H, 0, d === 60 ? H + 1 : H, d % 60); })(),
        );
      },
    ]), ["unites"]),
  gab("ce1_duree_unites_tpl_1", "ce1_duree_unites_h_min", 3, "Compare en minutes : 1 heure, c'est 60 minutes, pas 100.", () =>
    tirer([
      () => {
        const [p, q] = (() => { const a = enfant(); let b = enfant(); while (b.nom === a.nom) b = enfant(); return [a, b]; })();
        const verbe = randomChoice(["joue au foot", "lit", "dessine", "nage", "fait du vélo", "chante", "danse"]);
        const cas = randomChoice([
          { a: "1 heure", va: 60, b: `${randomChoice([40, 45, 50, 55])} minutes` },
          { a: "1 heure", va: 60, b: `${randomChoice([70, 75, 80, 90])} minutes` },
          { a: "une demi-heure", va: 30, b: `${randomChoice([20, 25, 40, 45])} minutes` },
          { a: "un quart d'heure", va: 15, b: `${randomChoice([10, 20, 25])} minutes` },
        ]);
        const vb = Number(cas.b.split(" ")[0]);
        const bonne = cas.va > vb ? p.nom : q.nom;
        return qcm(
          `${p.nom} ${verbe} ${cas.a}, ${q.nom} ${cas.b}. Qui ${verbe} le plus longtemps ?`,
          bonne,
          [p.nom, q.nom, "les deux pareil"],
          exp(
            "Pour comparer deux durées, on les écrit dans la même unité.",
            "On écrit tout en minutes.",
            `${cas.a} = ${cas.va} minutes, et ${cas.va} ${cas.va > vb ? ">" : "<"} ${vb}.`,
            `C'est ${bonne}.`,
          ),
        );
      },
      () => {
        const n = randomChoice([1, 2, 3]);
        const demi = n < 3 && randomChoice([true, false]);
        const total = n * 60 + (demi ? 30 : 0);
        const a = activite();
        const duree = demi ? `${n} h 30 min` : heures(n);
        return qcm(
          `${maj(a.nom)} dure ${duree}. ${randomChoice(["Combien de minutes cela fait-il ?", "Cela fait combien de minutes ?", "Écris cette durée en minutes."])}`,
          minutes(total),
          demi
            ? [minutes(n * 100 + 30), minutes(total - 30), minutes(total + 30)]
            : [minutes(n * 100), minutes(n * 10), minutes(total + 30), minutes(total - 30)].filter((x) => x !== "0 minutes"),
          exp(
            "1 heure, c'est 60 minutes.",
            "On compte 60 minutes pour chaque heure, puis on ajoute les minutes.",
            demi ? `${Array(n).fill("60").join(" + ")} + 30 = ${total}.` : `${Array(n).fill("60").join(" + ")} = ${total}.`,
            `${duree}, c'est ${total} minutes.`,
          ),
        );
      },
      () => {
        const quoi = randomChoice(["Le pique-nique", "La visite de la ferme", "Le spectacle de clowns", "La séance de cinéma", "La balade à vélo"]);
        return qcm(
          `${quoi} dure trois quarts d'heure. ${randomChoice(["Combien de minutes cela fait-il ?", "Cela fait combien de minutes ?"])}`,
          "45 minutes",
          ["75 minutes", "34 minutes", "30 minutes", "60 minutes"],
          exp(
            "Un quart d'heure, c'est 15 minutes.",
            "Trois quarts d'heure, c'est trois fois un quart d'heure.",
            "15 + 15 + 15 = 45.",
            "Trois quarts d'heure, c'est 45 minutes.",
          ),
          (() => { const H = randomInt(1, 11); return deuxHorloges(H, 0, H, 45); })(),
        );
      },
    ]), ["unites"]),

  /* ---------- CALCULER UNE DURÉE ---------- */
  gab("ce1_duree_calculer_tpl_3", "ce1_duree_calculer_simple", 2, "Regarde où était la grande aiguille au début, et où elle est à la fin.", () =>
    tirer([
      () => {
        const a = activite();
        const H = randomInt(1, 11);
        const d = randomChoice([15, 30, 45, 60]);
        const bonne = d === 60 ? "1 heure" : minutes(d);
        const fin = d === 60 ? [H + 1, 0] : [H, d];
        return qcm(
          `Voici le début et la fin ${deAct(a.nom)}. ${randomChoice([
            `Combien de temps dure-t-${a.il} ?`,
            "Quelle est sa durée ?",
          ])}`,
          bonne,
          ["15 minutes", "30 minutes", "45 minutes", "1 heure", minutes(PLACE_GRANDE[d === 60 ? 0 : d])],
          exp(
            "Une durée, c'est le temps qui passe entre le début et la fin.",
            "On regarde de combien la grande aiguille a tourné.",
            d === 60 ? "La grande aiguille a fait un tour complet : 60 minutes." : `La grande aiguille est passée du 12 au ${PLACE_GRANDE[d]} : ${d} minutes.`,
            `${maj(a.nom)} dure ${bonne}.`,
          ),
          deuxHorloges(H, 0, fin[0], fin[1]),
        );
      },
      () => {
        const a = activite();
        const H = randomInt(8, 17);
        const d = randomChoice([15, 30, 45]);
        return qcm(
          `${maj(a.nom)} : de ${H} h à ${heure(H, d)}. ${randomChoice([
            `Combien de minutes dure-t-${a.il} ?`,
            "Quelle est sa durée ?",
            `Combien de temps dure-t-${a.il} ?`,
          ])}`,
          minutes(d),
          ["15 minutes", "30 minutes", "45 minutes", "1 heure", minutes(d + 10)],
          exp(
            "Une durée, c'est le temps qui passe entre le début et la fin.",
            "Le début est une heure pile : on lit les minutes de la fin.",
            `De ${H} h à ${heure(H, d)}, il passe ${d} minutes.`,
            `${maj(a.nom)} dure ${d} minutes.`,
          ),
          deuxHorloges(H, 0, H, d),
        );
      },
    ]), ["calculer", "canvas"]),
  gab("ce1_duree_calculer_tpl_1", "ce1_duree_calculer_simple", 3, "Compte les heures une par une, du début jusqu'à la fin.", () =>
    tirer([
      () => {
        const a = activite();
        const H = randomInt(8, 14);
        const n = randomInt(1, 4);
        return qcm(
          `${maj(a.nom)} : de ${H} h à ${H + n} h. ${randomChoice([
            `Combien de temps dure-t-${a.il} ?`,
            "Quelle est sa durée ?",
            `Combien d'heures dure-t-${a.il} ?`,
          ])}`,
          heures(n),
          [heures(n + 1), n > 1 ? heures(n - 1) : "30 minutes", `${H + n} heures`, minutes(n * 10)].filter((x) => x !== heures(n)),
          exp(
            "Une durée, c'est le temps qui passe entre le début et la fin.",
            "On compte les heures en avançant d'une heure à la fois.",
            `${Array.from({ length: n + 1 }, (_, i) => `${H + i} h`).join(" → ")} : ${n} saut${n > 1 ? "s" : ""} d'une heure.`,
            `${maj(a.nom)} dure ${heures(n)}.`,
          ),
          deuxHorloges(H, 0, H + n, 0),
        );
      },
      () => {
        const a = activite();
        const H = randomInt(1, 9);
        const n = randomInt(1, 3);
        return qcm(
          `Voici le début et la fin ${deAct(a.nom)}. ${randomChoice([
            `Combien d'heures dure-t-${a.il} ?`,
            "Quelle est sa durée ?",
          ])}`,
          heures(n),
          [heures(n + 1), n > 1 ? heures(n - 1) : "30 minutes", heures(H + n), minutes(n * 10)].filter((x) => x !== heures(n)),
          exp(
            "Une durée, c'est le temps qui passe entre le début et la fin.",
            "La grande aiguille est sur le 12 aux deux horloges : on compte de combien la petite a avancé.",
            `La petite aiguille passe du ${H} au ${H + n} : ${n} heure${n > 1 ? "s" : ""}.`,
            `${maj(a.nom)} dure ${heures(n)}.`,
          ),
          deuxHorloges(H, 0, H + n, 0),
        );
      },
      () => {
        const a = activite();
        const H = randomInt(8, 16);
        return qcm(
          `${maj(a.nom)} : de ${heure(H, 30)} à ${H + 1} h. ${randomChoice([`Combien de temps dure-t-${a.il} ?`, "Quelle est sa durée ?"])}`,
          "30 minutes",
          ["1 heure", "70 minutes", "15 minutes", "1 heure 30 minutes"],
          exp(
            "Une durée, c'est le temps qui passe entre le début et la fin.",
            "De la demie à l'heure suivante, la grande aiguille fait un demi-tour.",
            `De ${heure(H, 30)} à ${H + 1} h : une demi-heure.`,
            "Cela dure 30 minutes.",
          ),
          deuxHorloges(H, 30, H + 1, 0),
        );
      },
    ]), ["calculer", "canvas"]),
  gab("ce1_duree_calculer_tpl_2", "ce1_duree_calculer_simple", 4, "Avance d'abord jusqu'à l'heure pile, puis compte ce qui reste.", () =>
    tirer([
      () => {
        const p = enfant();
        const a = activite();
        const H = randomInt(8, 16);
        const m = randomChoice([15, 30, 45]);
        const reste = 60 - m;
        return qcm(
          `Il est ${heure(H, m)}. ${maj(a.nom)} : ${H + 1} h. ${randomChoice([
            "Dans combien de minutes ?",
            "Combien de minutes d'attente ?",
          ])}`,
          minutes(reste),
          [minutes(m), minutes(100 - m), minutes(reste === 30 ? 15 : 30), "1 heure"].filter((x) => x !== minutes(reste)),
          exp(
            "Une heure, c'est 60 minutes.",
            "On compte les minutes qui manquent pour arriver à l'heure pile.",
            `${m} + ${reste} = 60.`,
            `Il reste ${reste} minutes.`,
          ),
          horloge(H, m),
        );
      },
      () => {
        const a = activite();
        const H = randomInt(1, 5);
        const cas = randomChoice([
          { m1: 30, h2: H + 2, m2: 0, rep: "1 heure 30 minutes", pieges: ["2 heures 30 minutes", "1 heure", "2 heures", "30 minutes"] },
          { m1: 0, h2: H + 1, m2: 30, rep: "1 heure 30 minutes", pieges: ["1 heure", "30 minutes", "2 heures", "1 heure 15 minutes"] },
          { m1: 15, h2: H + 1, m2: 15, rep: "1 heure", pieges: ["15 minutes", "1 heure 15 minutes", "30 minutes", "2 heures"] },
          { m1: 0, h2: H + 1, m2: 15, rep: "1 heure 15 minutes", pieges: ["15 minutes", "1 heure", "1 heure 30 minutes", "2 heures 15 minutes"] },
          { m1: 30, h2: H + 1, m2: 15, rep: "45 minutes", pieges: ["15 minutes", "1 heure 15 minutes", "1 heure 45 minutes", "30 minutes"] },
        ]);
        const avecDessin = randomChoice([true, false]);
        return qcm(
          avecDessin
            ? `Voici le début et la fin ${deAct(a.nom)}. ${randomChoice([`Combien de temps dure-t-${a.il} ?`, "Quelle est sa durée ?"])}`
            : `${maj(a.nom)} : de ${heure(H + 12, cas.m1)} à ${heure(cas.h2 + 12, cas.m2)}. ${randomChoice([`Combien de temps dure-t-${a.il} ?`, "Quelle est sa durée ?"])}`,
          cas.rep,
          cas.pieges,
          exp(
            "Une durée, c'est le temps qui passe entre le début et la fin.",
            "On avance par bonds : jusqu'à l'heure pile, puis d'heure en heure, puis les minutes.",
            `Du début à la fin, on compte ${cas.rep}.`,
            `${maj(a.nom)} dure ${cas.rep}.`,
          ),
          avecDessin ? deuxHorloges(H, cas.m1, cas.h2, cas.m2) : undefined,
        );
      },
    ]), ["calculer", "canvas"]),

  /* ---------- AJOUTER DES DURÉES ---------- */
  gab("ce1_duree_ajouter_tpl_3", "ce1_duree_ajouter", 3, "Écris chaque durée en minutes, puis ajoute.", () => {
    const p = enfant();
    const [o1, o2] = deuxVerbes();
    const [d1, d2] = randomChoice([[15, 30], [30, 15], [15, 15], [10, 20], [20, 10], [5, 15], [10, 30], [30, 30], [15, 45], [20, 20]] as const);
    const dit = (d: number) => (MOTS_DUREE[d] && randomChoice([true, false]) ? MOTS_DUREE[d] : minutes(d));
    const total = d1 + d2;
    const bonne = total === 60 ? "60 minutes" : minutes(total);
    const avecFrise = true;
    return qcm(
      `${p.nom} ${o1} pendant ${dit(d1)}, puis ${o2} ${dit(d2)}. ${randomChoice([
        "Combien de minutes en tout ?",
        "Combien de temps en tout ?",
        "Quelle est la durée totale ?",
      ])}`,
      bonne,
      [minutes(total + 10), minutes(Math.abs(d1 - d2) || 5), minutes(total - 5), minutes(total + 15)],
      exp(
        "Pour ajouter des durées, on les écrit toutes en minutes.",
        "Un quart d'heure = 15 min, une demi-heure = 30 min, trois quarts d'heure = 45 min.",
        `${d1} + ${d2} = ${total}.`,
        `En tout, cela fait ${total} minutes${total === 60 ? ", soit une heure" : ""}.`,
      ),
      avecFrise
        ? dureeCanvas({
            variant: "frise",
            frise: { startLabel: "début", endLabel: "fin", steps: [{ label: minutes(d1).replace("minutes", "min"), minutes: d1 }, { label: minutes(d2).replace("minutes", "min"), minutes: d2 }] },
          })
        : undefined,
    );
  }, ["ajouter", "canvas"]),
  gab("ce1_duree_ajouter_tpl_1", "ce1_duree_ajouter", 4, "Écris tout en minutes. Au-delà de 60 minutes, il y a une heure.", () => {
    const p = enfant();
    const [o1, o2] = deuxVerbes();
    const [d1, d2] = randomChoice([[45, 15], [30, 30], [45, 30], [30, 45], [45, 45], [60, 15], [60, 30], [15, 45]] as const);
    const total = d1 + d2;
    const bonne = total === 60 ? "1 heure" : `1 heure ${total - 60} minutes`;
    return qcm(
      `${p.nom} ${o1} pendant ${MOTS_DUREE[d1]}, puis ${o2} ${MOTS_DUREE[d2]}. ${randomChoice([
        "Combien de temps en tout ?",
        "Quelle est la durée totale ?",
      ])}`,
      bonne,
      total === 60
        ? ["45 minutes", "1 heure 15 minutes", "2 heures", "1 heure 30 minutes"]
        : [minutes(total - 60), "1 heure", `1 heure ${total - 45} minutes`, `2 heures ${total - 60} minutes`].filter((x) => x !== bonne),
      exp(
        "Une heure, c'est 60 minutes.",
        "On écrit chaque durée en minutes, on ajoute, puis on regroupe 60 minutes en une heure.",
        `${d1} + ${d2} = ${total} minutes${total > 60 ? ` = 60 + ${total - 60}` : ""}.`,
        `En tout : ${bonne}.`,
      ),
      dureeCanvas({
        variant: "frise",
        frise: { startLabel: "début", endLabel: "fin", steps: [{ label: `${d1} min`, minutes: d1 }, { label: `${d2} min`, minutes: d2 }] },
      }),
    );
  }, ["ajouter", "canvas"]),
  gab("ce1_duree_ajouter_tpl_2", "ce1_duree_ajouter", 4, "Ce qui reste, c'est la durée totale moins ce qui est déjà passé.", () => {
    const a = activite();
    const p = enfant();
    const [tot, passe] = randomChoice([[45, 30], [60, 45], [60, 15], [30, 15], [45, 15], [60, 30], [50, 20], [40, 10]] as const);
    const reste = tot - passe;
    const avecFrise = true;
    return qcm(
      `${maj(a.nom)} dure ${tot === 60 ? "1 heure" : minutes(tot)}. ${minutes(passe)} sont passées. ${randomChoice([
        "Combien de minutes reste-t-il ?",
        "Combien de temps reste-t-il ?",
      ])}`,
      minutes(reste),
      [minutes(tot + passe), minutes(reste + 10), minutes(passe), minutes(Math.abs(reste - 5) || 25)].filter((x) => x !== minutes(reste)),
      exp(
        "Ce qui reste, c'est ce qu'il faut ajouter à ce qui est passé pour arriver au total.",
        `On cherche combien il faut ajouter à ${passe} pour arriver à ${tot}.`,
        `${passe} + ${reste} = ${tot}.`,
        `Il reste ${reste} minutes.`,
      ),
      avecFrise
        ? dureeCanvas({
            variant: "frise",
            frise: { startLabel: "début", endLabel: "fin", steps: [{ label: `${passe} min`, minutes: passe }, { label: "?", minutes: reste }] },
          })
        : undefined,
    );
  }, ["ajouter", "canvas"]),

  /* ---------- LE CALENDRIER ---------- */
  gab("ce1_duree_calendrier_tpl_2", "ce1_duree_calendrier", 1, "Récite les jours dans l'ordre : lundi, mardi, mercredi…", () => {
    const p = enfant();
    const i = randomInt(0, 6);
    const sens = randomChoice(["demain", "hier", "après", "avant"] as const);
    const j = sens === "demain" || sens === "après" ? (i + 1) % 7 : (i + 6) % 7;
    const text =
      sens === "demain"
        ? `Aujourd'hui, c'est ${JOURS[i]}. Demain, ${p.nom} ${randomChoice(PROJETS)}. Quel jour sera-t-on demain ?`
        : sens === "hier"
          ? `Aujourd'hui, c'est ${JOURS[i]}. Hier, ${p.nom} ${randomChoice(FAITS(p))}. Quel jour était-on hier ?`
          : sens === "après"
            ? `${randomChoice(["Quel jour vient juste après", "Quel jour suit", "Dans la semaine, quel jour vient après"])} ${JOURS[i]} ?`
            : `${randomChoice(["Quel jour vient juste avant", "Quel jour précède", "Dans la semaine, quel jour vient avant"])} ${JOURS[i]} ?`;
    return qcm(
      text,
      JOURS[j],
      [JOURS[(j + 1) % 7], JOURS[(j + 6) % 7], JOURS[(j + 2) % 7], JOURS[i]].filter((x) => x !== JOURS[j]),
      exp(
        "Les sept jours de la semaine reviennent toujours dans le même ordre : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.",
        "On récite les jours dans l'ordre à partir du jour donné.",
        sens === "demain" || sens === "après" ? `Après ${JOURS[i]} vient ${JOURS[j]}.` : `Avant ${JOURS[i]} vient ${JOURS[j]}.`,
        `C'est ${JOURS[j]}.`,
      ),
    );
  }, ["calendrier"]),
  gab("ce1_duree_calendrier_tpl_3", "ce1_duree_calendrier", 2, "Récite les mois dans l'ordre : janvier, février, mars…", () =>
    tirer([
      () => {
        const p = enfant();
        const i = randomInt(0, 11);
        const apres = randomChoice([true, false]);
        const j = apres ? (i + 1) % 12 : (i + 11) % 12;
        return qcm(
          randomChoice([
            `L'anniversaire ${deNom(p.nom)} est en ${MOIS[i]}. Quel mois vient juste ${apres ? "après" : "avant"} ?`,
            `Quel mois vient juste ${apres ? "après" : "avant"} ${MOIS[i]} ?`,
            `Pic compte les mois. Il dit « ${MOIS[i]} ». Quel mois vient juste ${apres ? "après" : "avant"} ?`,
          ]),
          MOIS[j],
          [MOIS[(j + 1) % 12], MOIS[(j + 11) % 12], MOIS[(j + 2) % 12], MOIS[i]].filter((x) => x !== MOIS[j]),
          exp(
            "Une année compte 12 mois, toujours dans le même ordre, de janvier à décembre.",
            "On récite les mois à partir du mois donné.",
            `${apres ? "Après" : "Avant"} ${MOIS[i]} vient ${MOIS[j]}.`,
            `C'est ${MOIS[j]}.`,
          ),
        );
      },
      () => {
        const n = randomInt(2, 4);
        const p = enfant();
        return qcm(
          `${p.nom} ${randomChoice(["part en colonie", "reste chez ses grands-parents", "garde le lapin de la classe", "fait un stage de cirque"])} pendant ${n} semaines. Combien de jours cela fait-il ?`,
          `${n * 7} jours`,
          [`${n * 7 + 1} jours`, `${n * 5} jours`, `${n * 10} jours`, `${n + 7} jours`],
          exp(
            "Une semaine compte 7 jours.",
            "On ajoute 7 jours pour chaque semaine.",
            `${Array(n).fill("7").join(" + ")} = ${n * 7}.`,
            `Cela fait ${n * 7} jours.`,
          ),
        );
      },
    ]), ["calendrier"]),
  gab("ce1_duree_calendrier_tpl_1", "ce1_duree_calendrier", 3, "Avance d'un jour à la fois, et recommence à lundi après dimanche.", () => {
    const p = enfant();
    const i = randomInt(0, 6);
    const n = randomInt(2, 6);
    const futur = randomChoice([true, true, false]);
    const j = futur ? (i + n) % 7 : (i - n + 7) % 7;
    const text = futur
      ? randomChoice([
          `Aujourd'hui, on est ${JOURS[i]}. Quel jour sera-t-on dans ${n} jours ?`,
          `Nous sommes ${JOURS[i]}. ${p.nom} ${randomChoice(PROJETS)} dans ${n} jours. Quel jour est-ce ?`,
          `On est ${JOURS[i]}. Pic revient dans ${n} jours. Quel jour reviendra-t-il ?`,
        ])
      : randomChoice([
          `Aujourd'hui, on est ${JOURS[i]}. Quel jour était-on il y a ${n} jours ?`,
          `Nous sommes ${JOURS[i]}. ${p.nom} a planté une graine il y a ${n} jours. Quel jour était-ce ?`,
        ]);
    return qcm(
      text,
      JOURS[j],
      [JOURS[(j + 1) % 7], JOURS[(j + 6) % 7], JOURS[futur ? (i + n - 1) % 7 : (i - n + 8) % 7], JOURS[i]].filter((x) => x !== JOURS[j]),
      exp(
        "Les jours de la semaine reviennent dans le même ordre ; après dimanche, on recommence à lundi.",
        futur ? "On avance d'un jour à la fois, autant de fois qu'il le faut." : "On recule d'un jour à la fois.",
        futur
          ? Array.from({ length: n + 1 }, (_, k) => JOURS[(i + k) % 7]).join(" → ")
          : Array.from({ length: n + 1 }, (_, k) => JOURS[(i - k + 14) % 7]).join(" → "),
        `C'est ${JOURS[j]}.`,
      ),
      randomInt(1, 4) > 1 ? calendrier(futur ? 0 : 1, i) : undefined,
    );
  }, ["calendrier", "canvas"]),

  /* ---------- DÉFIS ---------- */
  gab("ce1_duree_defi_tpl_1", "ce1_duree_defi", 5, "Avance jusqu'à l'heure pile, puis ajoute les minutes qui restent.", () => {
    const a = activite();
    const H = randomInt(1, 10);
    const [m, d] = randomChoice([[45, 30], [30, 45], [45, 45], [15, 60], [30, 30], [45, 15], [15, 45], [30, 60]] as const);
    const tot = m + d;
    const fh = H + Math.floor(tot / 60);
    const fm = tot % 60;
    const bonne = heure(fh, fm);
    const dureeMots = d === 60 ? "1 heure" : randomChoice([MOTS_DUREE[d], minutes(d)]);
    const avecDessin = randomInt(1, 3) > 1;
    return qcm(
      avecDessin
        ? `${maj(a.nom)} commence ici et dure ${dureeMots}. À quelle heure finit-${a.il} ?`
        : `${maj(a.nom)} commence à ${heure(H, m)} et dure ${dureeMots}. Quand finit-${a.il} ?`,
      bonne,
      [heure(H, fm), heure(fh + 1, fm), heure(fh, fm === 0 ? 30 : fm === 45 ? 15 : 45), heure(H + 1, m)].filter((x) => x !== bonne),
      exp(
        "Pour trouver l'heure de fin, on ajoute la durée à l'heure du début.",
        "On avance d'abord jusqu'à l'heure pile, puis on ajoute les minutes qui restent.",
        d - (60 - m) > 0
          ? `${heure(H, m)} + ${d} min : ${60 - m} min pour arriver à ${H + 1} h, puis encore ${d - (60 - m)} min.`
          : `${heure(H, m)} + ${d} min : ${d} min, c'est juste ce qu'il faut pour arriver à ${H + 1} h.`,
        `${maj(a.nom)} finit à ${bonne}.`,
      ),
      avecDessin ? horloge(H, m) : undefined,
    );
  }, ["defi", "canvas"]),
  gab("ce1_duree_defi_tpl_2", "ce1_duree_defi", 5, "Mets les deux durées dans la même unité avant de comparer.", () =>
    tirer([
      () => {
        const p = enfant();
        let q = enfant();
        while (q.nom === p.nom) q = enfant();
        const verbe = randomChoice(["lit", "nage", "dessine", "joue du piano", "fait du vélo", "chante"]);
        const cas = randomChoice([
          { a: "trois quarts d'heure", va: 45, vb: randomChoice([40, 50, 55]) },
          { a: "une demi-heure", va: 30, vb: randomChoice([25, 35, 40]) },
          { a: "1 heure", va: 60, vb: randomChoice([50, 70, 80]) },
          { a: "un quart d'heure", va: 15, vb: randomChoice([12, 20]) },
        ]);
        const bonne = cas.va > cas.vb ? p.nom : q.nom;
        return qcm(
          `${p.nom} ${verbe} ${cas.a}, ${q.nom} ${cas.vb} minutes. Qui ${verbe} le plus longtemps ?`,
          bonne,
          [p.nom, q.nom, "les deux pareil"],
          exp(
            "Pour comparer deux durées, on les écrit dans la même unité.",
            "On écrit tout en minutes.",
            `${cas.a} = ${cas.va} minutes ; ${cas.va} ${cas.va > cas.vb ? ">" : "<"} ${cas.vb}.`,
            `C'est ${bonne}.`,
          ),
        );
      },
      () => {
        const n = randomInt(1, 6);
        const demie = randomChoice([true, false]);
        const a = activite();
        const bonne = heure(n + 12, demie ? 30 : 15);
        const dit = `${heures(n)} et ${demie ? "demie" : "quart"} de l'après-midi`;
        return qcm(
          randomChoice([
            `${maj(a.nom)} : ${dit}. Quelle heure est-ce, sur 24 h ?`,
            `Quelle heure veut dire « ${dit} » ?`,
          ]),
          bonne,
          [heure(n, demie ? 30 : 15), heure(n + 12, demie ? 50 : 25), heure(n + 13, demie ? 30 : 15), heure(n + 12, demie ? 15 : 30)],
          exp(
            "L'après-midi, on ajoute 12 au nombre d'heures. « Et demie » = 30 minutes, « et quart » = 15 minutes.",
            "On ajoute 12 aux heures, puis on écrit les minutes.",
            `${n} + 12 = ${n + 12}, et ${demie ? "demie" : "quart"} = ${demie ? 30 : 15} minutes.`,
            `C'est ${bonne}.`,
          ),
        );
      },
    ]), ["defi"]),
];

export const dureeBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DUREE_LIRE_HEURE_DEMI — lire l'heure sur le cadran
     LE piège : à 3 h 45, la petite aiguille est presque sur le
     4. Elle avance tout le long de l'heure, elle ne saute pas.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_lire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_lire_heure_demi",
    difficulty: 4,
    theme: "neutral",
    text: "La grande aiguille est sur le 9, la petite presque sur le 4. Quelle heure est-il ?",
    format: "qcm",
    choices: ["3 h 45", "4 h 45", "3 h 09", "9 h 04"],
    expected: ["3 h 45"],
    comparator: "mcq_exact",
    hint: "« Presque sur le 4 » veut dire qu'il n'est pas encore 4 heures.",
    explanation: exp(
      "La petite aiguille avance tout au long de l'heure : à la fin de l'heure, elle touche presque le nombre suivant.",
      "On lit le nombre que la petite aiguille a dépassé, jamais celui vers lequel elle va.",
      "Elle a dépassé le 3 et s'approche du 4 : il est 3 heures passées. La grande sur le 9 marque trois quarts d'heure, c'est-à-dire 45 minutes.",
      "Il est 3 h 45.",
    ),
    canvas: dureeCanvas({
      variant: "horloge",
      time: { hour: 3, minute: 45 },
      display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
    }),
    tags: ["ce1", "duree", "lire", "piege", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_lire_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_lire_heure_demi",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle aiguille donne les minutes ?",
    format: "qcm",
    choices: [
      "la grande",
      "la petite",
      "les deux ensemble",
      "celle qui va le moins vite",
    ],
    expected: ["la grande"],
    comparator: "mcq_exact",
    hint: "Regarde celle qui tourne le plus vite.",
    explanation: exp(
      "Sur une horloge à aiguilles, la petite donne l'heure et la grande donne les minutes.",
      "On repère la longueur des deux aiguilles avant de lire.",
      "La grande aiguille fait un tour complet en une heure : c'est elle qui compte les 60 minutes. La petite met douze heures à faire son tour.",
      "C'est la grande aiguille.",
    ),
    tags: ["ce1", "duree", "lire", "definition", "qcm"],
  },

  /* =========================================================
     CE1_DUREE_POSITIONNER_AIGUILLES — placer les aiguilles
     La lecture à l'envers : on connaît l'heure, on cherche où
     pointent les aiguilles.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_positionner_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_positionner_aiguilles",
    difficulty: 4,
    theme: "neutral",
    text: "Il est 7 h 45. Où se trouve la PETITE aiguille ?",
    format: "qcm",
    choices: [
      "entre le 7 et le 8, tout près du 8",
      "exactement sur le 7",
      "exactement sur le 8",
      "sur le 9, comme la grande",
    ],
    expected: ["entre le 7 et le 8, tout près du 8"],
    comparator: "mcq_exact",
    hint: "La petite aiguille avance un peu à chaque minute qui passe.",
    explanation: exp(
      "La petite aiguille avance sans arrêt : elle glisse d'un nombre au suivant pendant toute l'heure.",
      "On regarde combien de l'heure est déjà passé : ici, trois quarts.",
      "À 7 h 45, les trois quarts de l'heure sont passés : la petite aiguille a fait les trois quarts du chemin entre le 7 et le 8. Elle est tout près du 8, mais elle ne l'a pas atteint.",
      "Elle est entre le 7 et le 8, tout près du 8.",
    ),
    tags: ["ce1", "duree", "positionner", "piege", "qcm"],
  },

  /* =========================================================
     CE1_DUREE_MATIN_APRES_MIDI — 15 h ou 3 h de l'après-midi
     Le cadran ne porte que douze nombres : c'est la journée qui
     dit s'il faut ajouter douze.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_matin_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_matin_apres_midi",
    difficulty: 2,
    theme: "neutral",
    text: "Il est 15 h. Comment dit-on cette heure autrement ?",
    format: "qcm",
    choices: [
      "3 heures de l'après-midi",
      "3 heures du matin",
      "5 heures de l'après-midi",
      "15 heures du matin",
    ],
    expected: ["3 heures de l'après-midi"],
    comparator: "mcq_exact",
    hint: "Après midi, on recommence à compter à partir de 12.",
    explanation: exp(
      "Une journée compte 24 heures, mais le cadran n'en porte que 12 : les aiguilles font donc deux tours.",
      "Après midi, on enlève 12 pour retrouver le nombre écrit sur le cadran.",
      "15 - 12 = 3. À 15 h, la petite aiguille est sur le 3, mais c'est l'après-midi : on dit 3 heures de l'après-midi.",
      "15 h, c'est 3 heures de l'après-midi.",
    ),
    tags: ["ce1", "duree", "matin_apres_midi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_matin_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_matin_apres_midi",
    difficulty: 3,
    theme: "neutral",
    text: "L'école à 8 h, la sieste à 13 h. Laquelle de ces heures est le matin ?",
    format: "qcm",
    choices: ["8 h", "13 h", "les deux", "aucune des deux"],
    expected: ["8 h"],
    comparator: "mcq_exact",
    hint: "Le matin s'arrête à midi.",
    explanation: exp(
      "Le matin va de minuit à midi ; l'après-midi va de midi à minuit.",
      "On compare chaque heure à 12 h, qui est midi.",
      "8 h vient avant 12 h : c'est le matin. 13 h vient après : c'est l'après-midi, une heure après midi.",
      "8 h est le matin.",
    ),
    tags: ["ce1", "duree", "matin_apres_midi", "qcm"],
  },

  /* =========================================================
     CE1_DUREE_UNITES_H_MIN — l'heure, la minute, h et min
     LE piège : croire que 1 h = 100 min. Le cadran compte
     jusqu'à 60, pas jusqu'à 100.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_unites_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_unites_h_min",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de minutes dans 1 heure ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Compte les petits traits du cadran.",
    explanation: exp(
      "1 heure vaut 60 minutes.",
      "On compte les petits traits du cadran : il y en a 60, un par minute.",
      "La grande aiguille passe sur les 60 traits pour faire un tour complet. Ce tour dure une heure.",
      "1 h = 60 min.",
    ),
    tags: ["ce1", "duree", "unites", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_unites_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_unites_h_min",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 h = 100 min ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 h = 60 min",
      "oui",
      "non, 1 h = 50 min",
      "non, 1 h = 12 min",
    ],
    expected: ["non, 1 h = 60 min"],
    comparator: "mcq_exact",
    hint: "Le temps ne compte pas comme les euros ou les centimètres.",
    explanation: exp(
      "1 heure vaut 60 minutes, et pas 100.",
      "On vérifie sur le cadran : on compte les petits traits.",
      "Le cadran porte 60 traits, pas 100. Le temps est la seule mesure du CE1 qui ne compte pas par centaines : 1 m fait 100 cm, 1 € fait 100 centimes, mais 1 h ne fait que 60 min.",
      "Non : 1 h = 60 min.",
    ),
    tags: ["ce1", "duree", "unites", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_unites_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_unites_h_min",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de minutes dure un quart d'heure ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Un quart, c'est l'heure partagée en quatre.",
    explanation: exp(
      "Un quart d'heure, c'est une heure partagée en quatre parts égales.",
      "On partage les 60 minutes de l'heure en quatre.",
      "15 + 15 + 15 + 15 = 60. Chaque part fait donc 15 minutes.",
      "Un quart d'heure dure 15 min.",
    ),
    tags: ["ce1", "duree", "unites", "remarquable"],
  },

  /* =========================================================
     CE1_DUREE_CALCULER_SIMPLE — mesurer une durée écoulée
     Toujours dans la même journée, et sur des heures rondes ou
     des demi-heures : c'est ce que demande le programme.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_calculer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calculer_simple",
    difficulty: 2,
    theme: "neutral",
    text: "La récréation : de 10 h à 10 h 15. Combien de minutes dure-t-elle ?",
    canvas: deuxHorloges(10, 0, 10, 15),
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "Compte ce qui s'est passé entre le début et la fin.",
    explanation: exp(
      "Une durée, c'est ce qui sépare le début de la fin.",
      "On part de l'heure de début et on compte jusqu'à l'heure de fin.",
      "De 10 h à 10 h 15, il s'écoule 15 minutes : la grande aiguille passe du 12 au 3.",
      "La récréation dure 15 min.",
    ),
    tags: ["ce1", "duree", "calculer"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_calculer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calculer_simple",
    difficulty: 4,
    theme: "neutral",
    text: "Le film commence à 14 h 30 et finit à 16 h. Combien de temps dure-t-il ?",
    format: "qcm",
    choices: [
      "1 h 30",
      "2 h",
      "1 h 70",
      "2 h 30",
    ],
    expected: ["1 h 30"],
    comparator: "mcq_exact",
    hint: "Va d'abord jusqu'à 15 h, puis compte la suite.",
    explanation: exp(
      "Une durée se calcule par étapes : on avance jusqu'à l'heure ronde, puis on continue.",
      "On compte d'abord la demi-heure qui manque, puis les heures entières.",
      "De 14 h 30 à 15 h, il y a 30 minutes. De 15 h à 16 h, il y a 1 heure. En tout : 1 h 30. Attention, 30 + 60 ne s'écrit pas 1 h 70 — 60 minutes font déjà une heure.",
      "Le film dure 1 h 30.",
    ),
    canvas: dureeCanvas({
      variant: "double_horloge",
      start: { hour: 14, minute: 30, label: "Début — 14 h 30" },
      end: { hour: 16, minute: 0, label: "Fin — 16 h" },
      display: { showNumbers: true, showMinuteTicks: true, showLabels: true, showDigital: false },
    }),
    tags: ["ce1", "duree", "calculer", "piege", "qcm", "canvas"],
  },

  /* =========================================================
     CE1_DUREE_AJOUTER — ajouter ou soustraire des durées
     Le programme en donne l'exemple : « Mamie a passé un quart
     d'heure à tailler ses rosiers et une demi-heure à bêcher
     son potager. Combien de temps est-elle restée dans le
     jardin ? »
     LE piège : additionner comme des nombres ordinaires et
     écrire 1 h 75 au lieu de 2 h 15.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_ajouter_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_ajouter",
    difficulty: 3,
    theme: "neutral",
    text: "Mamie taille ses rosiers un quart d'heure, puis bêche une demi-heure. Combien de minutes en tout ?",
    canvas: dureeCanvas({ variant: "frise", frise: { startLabel: "début", endLabel: "fin", steps: [{ label: "un quart d'heure", minutes: 15 }, { label: "une demi-heure", minutes: 30 }] } }),
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Écris les deux durées en minutes avant d'additionner.",
    explanation: exp(
      "Pour additionner deux durées, on les écrit d'abord dans la même unité.",
      "On transforme le quart d'heure et la demi-heure en minutes, puis on additionne.",
      "Un quart d'heure fait 15 min, une demi-heure fait 30 min. 15 + 30 = 45.",
      "Elle est restée 45 min dans le jardin.",
    ),
    tags: ["ce1", "duree", "ajouter"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_ajouter_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_ajouter",
    difficulty: 4,
    theme: "neutral",
    text: "Combien de quarts d'heure faut-il pour faire une heure ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Un quart, c'est une part sur quatre.",
    explanation: exp(
      "Un quart d'heure, c'est l'heure partagée en quatre parts égales.",
      "On additionne les quarts jusqu'à retrouver l'heure entière.",
      "15 + 15 + 15 + 15 = 60. Il faut donc 4 quarts d'heure. Et deux quarts d'heure font une demi-heure.",
      "Il faut 4 quarts d'heure.",
    ),
    tags: ["ce1", "duree", "ajouter", "remarquable"],
  },

  /* =========================================================
     CE1_DUREE_CALENDRIER — lire un calendrier
     ⚠️ Cette micro-compétence n'est pas un attendu de fin
     d'année du CE1. Gardée en attendant l'arbitrage : on reste
     donc au ras du concret, sur ce qui se lit dans la classe.
     ⚠️ « mois » ne prend pas de s au pluriel.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_calendrier_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calendrier",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de jours dans une semaine ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Compte de lundi à dimanche.",
    explanation: exp(
      "Une semaine compte 7 jours.",
      "On les récite dans l'ordre : lundi, mardi, mercredi, jeudi, vendredi, samedi, dimanche.",
      "Cela fait 7 jours, et la semaine suivante recommence par lundi.",
      "Une semaine a 7 jours.",
    ),
    tags: ["ce1", "duree", "calendrier", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_calendrier_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calendrier",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de mois dans une année ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "De janvier à décembre.",
    explanation: exp(
      "Une année compte 12 mois.",
      "On les récite dans l'ordre, de janvier à décembre.",
      "C'est le même 12 que sur le cadran de l'horloge : douze nombres, douze mois.",
      "Une année a 12 mois.",
    ),
    tags: ["ce1", "duree", "calendrier", "remarquable"],
  },

  /* =========================================================
     CE1_DUREE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Léa dit « 4 heures et demie de l'après-midi », Kevin dit « 16 h 30 ». Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même heure",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même heure"],
    comparator: "mcq_exact",
    hint: "Ajoute 12 à 4 heures de l'après-midi.",
    explanation: exp(
      "Une même heure se dit de deux façons : avec le nombre du cadran, ou avec le nombre de la journée.",
      "Après midi, on ajoute 12 au nombre du cadran pour obtenir l'heure de la journée.",
      "4 + 12 = 16, et « et demie » veut dire 30 minutes. Les deux disent bien 16 h 30.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "duree", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Le car part à 6 h 45. Le trajet dure 30 minutes. À quelle heure arrive-t-il ?",
    canvas: horloge(6, 45),
    format: "qcm",
    choices: ["7 h 15", "6 h 75", "7 h 45", "6 h 15"],
    expected: ["7 h 15"],
    comparator: "mcq_exact",
    hint: "Va d'abord jusqu'à 7 h, puis ajoute ce qui reste.",
    explanation: exp(
      "Pour ajouter une durée, on avance d'abord jusqu'à l'heure ronde.",
      "On compte ce qui manque pour arriver à l'heure pile, puis on ajoute le reste.",
      "De 6 h 45 à 7 h, il y a 15 minutes. Il reste 30 - 15 = 15 minutes à ajouter : on arrive à 7 h 15. « 6 h 75 » n'existe pas, une heure s'arrête à 60 minutes.",
      "Le car arrive à 7 h 15.",
    ),
    tags: ["ce1", "duree", "defi", "reunion", "piege", "qcm"],
  },
  ...GABARITS,
];
