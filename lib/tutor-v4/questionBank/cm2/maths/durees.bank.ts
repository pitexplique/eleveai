// lib/tutor-v4/question-banks/maths/cm2/durees.bank.ts

import type {
  CanvasFigure,
  DifficultyLevel,
  DureeCanvasData,
  TutorBankItemV4,
  TutorGeneratedQuestionV4,
} from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { cap, entre, fr, un } from "./trous-outils";

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

function dureeCanvas(data: Omit<DureeCanvasData, "kind">): DureeCanvasData {
  return {
    kind: "duree",
    ...data,
  };
}

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function watchColors(index = 0): DureeCanvasData["colors"] {
  const palettes: NonNullable<DureeCanvasData["colors"]>[] = [
    {
      face: "#fefce8",
      bezel: "#0f172a",
      hourHand: "#2563eb",
      minuteHand: "#ef4444",
      accent: "#f59e0b",
      strap: "#38bdf8",
      text: "#0f172a",
    },
    {
      face: "#ecfeff",
      bezel: "#155e75",
      hourHand: "#7c3aed",
      minuteHand: "#f97316",
      accent: "#22c55e",
      strap: "#a7f3d0",
      text: "#0f172a",
    },
    {
      face: "#fff1f2",
      bezel: "#be123c",
      hourHand: "#0f172a",
      minuteHand: "#2563eb",
      accent: "#facc15",
      strap: "#fecdd3",
      text: "#0f172a",
    },
  ];

  return palettes[index % palettes.length];
}

/* ════════════════════════════════════════════════════════════════════
   GABARITS DES DURÉES CM2 (14/11/2026)

   Avant : 2 à 8 squelettes par micro, 15 à 19 répétitions sur 20 (une
   phrase figée par gabarit, des réponses courtes sans unité). Chaque gabarit
   tire ici une SITUATION (métiers, sport, cuisine, voyages, histoire…) × une
   TOURNURE × des nombres. Zéro question ouverte (CM2 = zéro clavier).

   LE NIVEAU CM2 (au-delà du modèle CM1, cm1/maths/durees.bank.ts) :
   - la SECONDE (nouveauté du programme) : 08:25:40, chronomètres, min et s ;
   - l'heure lue à la minute près, « 10 h moins 10 » ;
   - les heures décimales : 1,25 h = 1 h 15 min, 0,75 h = 45 min ;
   - siècles et millénaires : 1 siècle = 100 ans, 1789 est au 18e siècle ;
   - les durées sur plusieurs jours, de nuit (en passant par minuit) ;
   - les vitesses simples : « 120 km par heure », combien de temps, quelle distance.

   LES PIÈGES SONT DES ERREURS D'ÉLÈVE :
   - « 1 h = 100 min » (et « 1 min = 100 s ») ;
   - « 1,5 h = 1 h 50 min », « 1 h 30 min = 1,3 h » ;
   - les aiguilles inversées, l'heure voisine, minutes et secondes échangées ;
   - oublier de passer l'heure (« 10 h 85 »), oublier la retenue ;
   - 1789 lu « 17e siècle » ; un jour de plus ou de moins sur plusieurs jours.
   Les choix portent TOUJOURS leur unité, et jamais deux écritures de la même
   durée dans un QCM (« 75 min » à côté de « 1 h 15 min », « 1,5 h » à côté de
   « 1 h 30 min » : ce seraient deux réponses justes).
   ════════════════════════════════════════════════════════════════════ */

type Gen = () => Omit<TutorGeneratedQuestionV4, "canvas"> & { canvas?: CanvasFigure };

const atelier =
  (microId: string) =>
  (n: number, difficulty: DifficultyLevel, hint: string, generate: Gen): TutorBankItemV4 =>
    ({
      kind: "template",
      id: `cm2_${microId}_g${n}`,
      niveau: "cm2",
      matiere: "maths",
      notionId: "duree",
      microId,
      difficulty,
      theme: "neutral",
      hint,
      tags: ["cm2", "duree", microId, "template"],
      generate,
    }) as TutorBankItemV4;

/** QCM écrit : jamais deux fois la même proposition, 4 au plus, la bonne toujours dedans. */
function qcm(juste: string, faux: string[]): Pick<TutorGeneratedQuestionV4, "format" | "choices" | "expected" | "comparator"> {
  const d = melangeEnPlace([...new Set(faux)].filter((x) => x !== juste)).slice(0, 3);
  return { format: "qcm", choices: melangeEnPlace([juste, ...d]), expected: [juste], comparator: "mcq_exact" };
}

const etapes = (methode: string, calcul: string, conclusion: string) =>
  `Méthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;

const PRENOMS = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Maya", "Noé", "Eliott", "Sofia", "Bilal", "Romane"];
const METIERS = [
  "La boulangère", "Le pompier", "L’infirmier", "La pilote", "Le chauffeur de bus", "La vétérinaire", "Le cuisinier",
  "La gardienne du musée", "Le facteur", "La pharmacienne", "L’électricienne", "Le chef de gare", "La journaliste", "Le maître-nageur",
];
const N = () => un(PRENOMS);
/** « de Nina », mais « d’Inès » : l'élision devant une voyelle. */
const deN = () => {
  const n = N();
  return /^[AEIOUYÉÈÎ]/.test(n) ? `d’${n}` : `de ${n}`;
};
const qui = () => (Math.random() < 0.6 ? N() : un(METIERS));
const deuxPrenoms = (): [string, string] => {
  const [a, b] = melangeEnPlace([...PRENOMS]);
  return [a, b];
};
const troisPrenoms = (): [string, string, string] => {
  const [a, b, c] = melangeEnPlace([...PRENOMS]);
  return [a, b, c];
};

/** Un horaire : « 8 h 05 ». */
const hh = (h: number, m: number) => `${h} h ${pad2(m)}`;
/** Un horaire à partir des minutes depuis minuit. */
const hT = (t: number) => hh(Math.floor(t / 60), t % 60);
/** Une durée : « 45 min », « 2 h », « 1 h 5 min ». */
const dur = (t: number) => {
  const h = Math.floor(t / 60);
  const m = t % 60;
  return h === 0 ? `${m} min` : m === 0 ? `${h} h` : `${h} h ${m} min`;
};
/** Une durée en secondes : « 45 s », « 2 min », « 2 min 15 s ». */
const durS = (t: number) => {
  const q = Math.floor(t / 60);
  const r = t % 60;
  return q === 0 ? `${r} s` : r === 0 ? `${q} min` : `${q} min ${r} s`;
};
/** « 2 min 15 s » écrit tel quel (pour les pièges), « 15 s » sans minute. */
const ms = (q: number, r: number) => (q === 0 ? `${r} s` : `${q} min ${r} s`);
const hms = (h: number, m: number, s: number) => `${h} h ${m} min ${s} s`;
const suivante = (h: number) => (h === 12 ? 1 : h + 1);
const precedente = (h: number) => (h === 1 ? 12 : h - 1);
/** Un multiple de 5 entre a et b. */
const pas5 = (a: number, b: number) => 5 * entre(Math.ceil(a / 5), Math.floor(b / 5));
/** Les aiguilles inversées : la grande lue comme les heures, la petite comme les minutes. */
const inverse = (h: number, m: number) => hh(m === 0 ? 12 : m / 5, (h % 12) * 5);
/** « Au goûter, la boulangère regarde… » : la minuscule seulement sur un article, jamais sur un prénom. */
const avecPrefixe = (prefixes: string[], phrase: string) =>
  Math.random() < 0.5 ? `${un(prefixes)}, ${/^(Le |La |L’)/.test(phrase) ? phrase.charAt(0).toLowerCase() + phrase.slice(1) : phrase}` : phrase;
/** Les chiffres après la virgule d'une heure décimale, lus comme des minutes (le piège 1,5 h = 1 h 50 min). */
const luEnMinutes = (x: number) => {
  // Seulement pour une heure décimale à deux chiffres au plus (1,25 h) : 0,666… h n'a pas de « lecture fautive ».
  if (Math.round(x * 100) !== x * 100) return Math.round(60 * x) + 30;
  const ent = Math.floor(x);
  const ds = String(x).split(".")[1] ?? "0";
  return 60 * ent + Number(ds.padEnd(2, "0"));
};

const horloge = (hour: number, minute: number, label?: string): DureeCanvasData =>
  dureeCanvas({
    variant: "horloge",
    time: { hour, minute, label },
    display: { showDigital: false, showLabels: !!label },
    colors: watchColors(hour + minute),
  });
const deuxHorloges = (a: [number, number, string], b: [number, number, string]): DureeCanvasData =>
  dureeCanvas({
    variant: "double_horloge",
    start: { hour: a[0], minute: a[1], label: a[2] },
    end: { hour: b[0], minute: b[1], label: b[2] },
    display: { showDigital: false, showLabels: true },
  });
const frise = (startLabel: string, endLabel: string, steps: [string, number, string?][]): DureeCanvasData =>
  dureeCanvas({
    variant: "frise",
    frise: { startLabel, endLabel, steps: steps.map(([label, minutes, color]) => ({ label, minutes, ...(color ? { color } : {}) })) },
  });
const ecranD = (text: string, label: string): DureeCanvasData =>
  dureeCanvas({ variant: "digital", digital: { text, label }, colors: watchColors(text.length + text.charCodeAt(text.length - 1)) });
const nFois = (n: number, label: string, v: number): [string, number][] => Array.from({ length: n }, () => [label, v] as [string, number]);

/* ───────────── duree_lire ───────────── */

const L = atelier("duree_lire");
const LIEUX_HORLOGE = [
  "l’horloge de la classe", "la pendule de la cuisine", "l’horloge de la gare", "le réveil de la chambre",
  "l’horloge de la mairie", "la montre de son grand-père", "l’horloge du gymnase", "la pendule de la boulangerie",
  "l’horloge de la bibliothèque", "l’horloge de la salle d’attente", "la montre du maître", "l’horloge du stade",
  "l’horloge de la piscine", "la pendule du garage", "l’horloge du clocher", "la montre de plongée de sa tante",
];
const VERBES_REGARDER = ["regarde", "observe", "lève les yeux vers", "vérifie l’heure sur"];
const MOMENTS_LIRE = ["Pendant la récréation", "Au goûter", "Avant l’entraînement", "Après la sieste", "Pendant la visite du musée", "À la pause", "Pendant le cours d’arts plastiques", "Avant le dîner"];
const Q_HEURE = ["Quelle heure est-il ?", "Quelle heure indiquent les aiguilles ?", "Quelle heure lit-on ?", "Quelle heure est affichée ?"];
const regarde = () => avecPrefixe(MOMENTS_LIRE, `${qui()} ${un(VERBES_REGARDER)} ${un(LIEUX_HORLOGE)}.`);
const HINT_LIRE = "La petite aiguille donne l’heure, la grande aiguille donne les minutes (chaque nombre vaut 5 min, chaque petite graduation 1 min).";
const explLire = (h: number, m: number) =>
  etapes(
    "la petite aiguille donne l’heure, la grande aiguille donne les minutes.",
    m === 0
      ? `la grande aiguille est sur le 12 : 0 minute. La petite aiguille est sur le ${h}.`
      : m % 5 === 0
        ? `la grande aiguille est sur le ${m / 5} : ${m / 5} × 5 = ${m} min. La petite aiguille a dépassé le ${h}.`
        : `la grande aiguille a dépassé le ${Math.floor(m / 5) || 12} de ${m % 5} graduation${m % 5 > 1 ? "s" : ""} : ${5 * Math.floor(m / 5)} + ${m % 5} = ${m} min. La petite aiguille a dépassé le ${h}.`,
    `il est ${hh(h, m)}.`,
  );
const APPAREILS = [
  "L’écran du four", "Le cadran du micro-ondes", "Le tableau des départs de la gare", "L’écran du téléphone",
  "Le radio-réveil", "L’écran de la caisse du supermarché", "Le tableau de bord de la voiture", "Le panneau de l’arrêt de bus",
  "La montre de sport de la coach", "L’écran de la box", "Le distributeur de tickets du parking", "L’horloge numérique de la pharmacie",
];
const APPAREILS_SECONDES = [
  "L’horloge du laboratoire", "Le chronomètre officiel du marathon", "La montre connectée de la cycliste", "L’écran du contrôleur aérien",
  "L’horloge du studio de radio", "Le tableau d’affichage du stade", "L’écran de la salle de contrôle du barrage", "La console de la pilote de rallye",
  "L’horloge de la station météo", "L’écran du chef de gare", "Le tableau de bord de la fusée miniature", "L’horloge de la régie du théâtre",
];
const CHRONOS: ((e: string) => string)[] = [
  (e) => `À l’arrivée du 800 m, le chronomètre ${deN()} affiche ${e}.`,
  (e) => `Le chronomètre de la nageuse affiche ${e} à la fin de sa course.`,
  (e) => `Le minuteur de la pâtissière affiche ${e}.`,
  (e) => `À la fin de la chanson, le lecteur de musique affiche ${e}.`,
  (e) => `Le chrono du jeu vidéo ${deN()} indique ${e}.`,
  (e) => `L’écran du tapis de course affiche ${e}.`,
  (e) => `À la fin du sprint, la montre du cycliste indique ${e}.`,
  (e) => `Le chronomètre de l’arbitre montre ${e}.`,
  (e) => `Le minuteur du micro-ondes affiche ${e}.`,
  (e) => `L’écran de la vidéo de cuisine indique ${e}.`,
  (e) => `Le chrono de la course en sac affiche ${e}.`,
  (e) => `La montre de la plongeuse affiche ${e} à la remontée.`,
];

const dureeLireGabarits: TutorBankItemV4[] = [
  // ★1 — horloge à aiguilles, minutes de 5 en 5.
  L(1, 1, HINT_LIRE, () => {
    const h = entre(1, 12);
    const m = pas5(0, 55);
    const sym = (60 - m) % 60;
    return {
      text: `${regarde()} ${un(Q_HEURE)}`,
      ...qcm(hh(h, m), [
        inverse(h, m),
        m === 0 ? `${h} h 12` : `${h} h ${pad2(m / 5)}`,
        m > 30 ? hh(suivante(h), m) : hh(precedente(h), m),
        hh(h, sym === m ? (m + 30) % 60 : sym),
      ]),
      explanation: explLire(h, m),
      canvas: horloge(h, m),
    };
  }),
  // ★1 — affichage numérique de 0 h à 23 h.
  L(2, 1, "Dans 14:25, le nombre avant les deux points donne les heures, celui d’après les minutes.", () => {
    const h = entre(0, 23);
    const m = entre(0, 59);
    const ecran = `${pad2(h)}:${pad2(m)}`;
    const faux = [hh((h + 1) % 24, m), hh((h + 23) % 24, m), hh(h, (m + 10) % 60)];
    if (m <= 23 && m !== h) faux.push(`${m} h ${pad2(h)}`);
    return {
      text: `${un(APPAREILS)} ${un(["affiche", "indique", "montre"])} ${ecran}. ${un(["Comment lit-on cette heure ?", "Quelle heure est-il ?", "Comment écrit-on cette heure en heures et minutes ?"])}`,
      ...qcm(hh(h, m), faux),
      explanation: etapes("avant les deux points : les heures ; après : les minutes.", `${ecran} : ${h} heure${h > 1 ? "s" : ""} et ${m} minute${m > 1 ? "s" : ""}.`, `on écrit ${hh(h, m)}.`),
      canvas: ecranD(ecran, "Affichage"),
    };
  }),
  // ★1 — affichage avec les secondes (nouveauté du CM2).
  L(3, 1, "Dans 08:25:40, on lit dans l’ordre les heures, les minutes, puis les secondes.", () => {
    const h = entre(6, 22);
    const m = entre(1, 59);
    let s = entre(1, 59);
    if (s === m) s = (s % 59) + 1;
    const ecran = `${pad2(h)}:${pad2(m)}:${pad2(s)}`;
    const faux = [hms(h, s, m), `${h} h ${m} min`];
    faux.push(m <= 23 && m !== h ? `${m} h ${h} min ${s} s` : hms(h, m, (s + 10) % 60 || 5));
    return {
      text: `${un(APPAREILS_SECONDES)} ${un(["affiche", "indique", "montre"])} ${ecran}. ${un(["Comment lit-on cette heure ?", "Quelle heure est-il, à la seconde près ?", "Comment écrit-on cette heure avec h, min et s ?"])}`,
      ...qcm(hms(h, m, s), faux),
      explanation: etapes("on lit dans l’ordre : heures, minutes, secondes.", `${ecran} : ${h} h, ${m} min et ${s} s.`, `on écrit ${hms(h, m, s)}.`),
      canvas: ecranD(ecran, "h : min : s"),
    };
  }),
  // ★2 — horloge à aiguilles, à la minute près.
  L(4, 2, HINT_LIRE, () => {
    const h = entre(1, 12);
    let m = entre(1, 58);
    if (m % 5 === 0) m += 1;
    const k = Math.floor(m / 5);
    return {
      text: `${regarde()} ${un(["Quelle heure est-il, à la minute près ?", "Quelle heure lit-on, à la minute près ?", ...Q_HEURE])}`,
      ...qcm(hh(h, m), [
        hh(h, m + 5 <= 59 ? m + 5 : m - 5),
        m > 30 ? hh(suivante(h), m) : hh(precedente(h), m),
        hh(h, 60 - m),
        k >= 1 ? `${h} h ${pad2(k)}` : hh(h, m + 10),
      ]),
      explanation: explLire(h, m),
      canvas: horloge(h, m),
    };
  }),
  // ★2 — matin ou après-midi : écrire l'heure de 0 h à 24 h.
  L(5, 2, "L’après-midi et le soir, on ajoute 12 h : 3 h de l’après-midi, c’est 15 h.", () => {
    const pm = Math.random() < 0.6;
    const soir = pm && Math.random() < 0.5;
    const h = pm ? (soir ? entre(6, 10) : entre(1, 5)) : entre(7, 11);
    const m = pas5(0, 55);
    const juste = pm ? hh(h + 12, m) : hh(h, m);
    const moment = pm ? (soir ? un(["C’est le soir.", "La nuit commence à tomber."]) : un(["C’est l’après-midi.", "On est en plein après-midi."])) : un(["C’est le matin.", "On est en matinée."]);
    return {
      text: `${moment} ${qui()} ${un(VERBES_REGARDER)} ${un(LIEUX_HORLOGE)}. ${un(["Quelle heure est-il, en comptant de 0 h à 24 h ?", "Comment écrit-on cette heure de 0 h à 24 h ?", "Quelle heure afficherait un écran qui compte jusqu’à 24 h ?"])}`,
      ...qcm(juste, pm ? [hh(h, m), hh(h + 10, m), hh(h + 11, m)] : [hh(h + 12, m), inverse(h, m), hh(suivante(h), m)]),
      explanation: etapes(
        "on lit l’horloge, puis on regarde le moment de la journée.",
        pm ? `l’horloge montre ${hh(h, m)} et c’est ${soir ? "le soir" : "l’après-midi"} : ${h} + 12 = ${h + 12}.` : `l’horloge montre ${hh(h, m)} et c’est le matin : on ne change rien.`,
        `il est ${juste}.`,
      ),
      canvas: horloge(h, m),
    };
  }),
  // ★2 — « 10 h moins 10 » : dire l'heure avec « moins ».
  L(6, 2, "Après la demie, on peut compter les minutes qui manquent jusqu’à l’heure suivante : 9 h 50, c’est 10 h moins 10.", () => {
    const h = entre(1, 11);
    const m = un([35, 40, 45, 50, 55]);
    const r = 60 - m;
    const H = h + 1;
    const juste = m === 45 ? `${H} h moins le quart` : `${H} h moins ${r}`;
    const faux = m === 45 ? [`${h} h moins le quart`, `${H} h et quart`, `${h} h et quart`] : [`${h} h moins ${r}`, `${H} h moins ${m}`, `${h} h moins ${m}`];
    return {
      text: `${regarde()} Il est ${hh(h, m)}. ${un(["Comment peut-on aussi dire cette heure ?", "Quelle est l’autre façon de dire cette heure ?", "Comment dit-on cette heure avec le mot « moins » ?"])}`,
      ...qcm(juste, faux),
      explanation: etapes(
        "on compte les minutes qui manquent jusqu’à l’heure suivante.",
        `de ${hh(h, m)} à ${hh(H, 0)}, il manque 60 − ${m} = ${r} min.`,
        `${hh(h, m)}, c’est ${juste}.`,
      ),
      canvas: horloge(h, m),
    };
  }),
  // ★2 — lire une durée sur un chronomètre (minutes : secondes).
  L(7, 2, "Sur un chronomètre, avant les deux points : les minutes ; après : les secondes.", () => {
    const m = entre(1, 9);
    let s = entre(5, 55);
    if (s === m) s += 1;
    const ecran = `${pad2(m)}:${pad2(s)}`;
    return {
      text: `${un(CHRONOS)(ecran)} ${un(["Quelle durée cela fait-il ?", "Combien de temps s’est écoulé ?", "Comment lit-on cette durée ?"])}`,
      ...qcm(`${m} min ${s} s`, [`${m} h ${s} min`, `${s} min ${m} s`, `${100 * m + s} s`]),
      explanation: etapes("sur un chronomètre, on lit les minutes, puis les secondes.", `${ecran} : ${m} min et ${s} s.`, `la durée est ${m} min ${s} s.`),
      canvas: ecranD(ecran, "Chronomètre (min : s)"),
    };
  }),
];

/* ───────────── duree_convertir ───────────── */

const C = atelier("duree_convertir");
const SUJETS_DUREE = [
  "Le film", "La randonnée", "Le trajet en car", "La cuisson du rôti", "Le tournoi de foot", "La répétition de la chorale",
  "Le vol en avion", "La sortie au musée", "Le spectacle de cirque", "La traversée en ferry", "La leçon de piano",
  "Le match de rugby", "L’atelier de poterie", "La partie de pêche", "La visite du zoo", "Le chantier du maçon",
  "La garde de l’infirmière", "Le concert de l’orchestre",
];
const dure = (x: string) => `${un(SUJETS_DUREE)} ${un(["dure", "a duré", "va durer"])} ${x}.`;
const Q_EN_MIN = ["Combien de minutes cela fait-il ?", "Cela fait combien de minutes ?", "Convertis cette durée en minutes.", "Quelle est cette durée en minutes ?"];
const Q_EN_HMIN = ["Écris cette durée en heures et minutes.", "Combien d’heures et de minutes cela fait-il ?", "Quelle est cette durée en h et min ?", "Convertis en heures et minutes."];
const Q_EN_S = ["Combien de secondes cela fait-il ?", "Cela fait combien de secondes ?", "Convertis cette durée en secondes.", "Quelle est cette durée en secondes ?"];
const HINT_60 = "1 h = 60 min (et pas 100 min).";

const SITUATIONS_SECONDES: ((x: string) => string)[] = [
  (x) => `Le sablier se vide en ${x}.`,
  (x) => `Il faut se brosser les dents pendant ${x}.`,
  (x) => `Le lait chauffe au micro-ondes pendant ${x}.`,
  (x) => `L’œuf à la coque cuit ${x}.`,
  (x) => `La chanson préférée ${deN()} dure ${x}.`,
  (x) => `L’exercice de gainage dure ${x}.`,
  (x) => `Le tour de manège dure ${x}.`,
  (x) => `Le minuteur du cuisinier sonne au bout de ${x}.`,
  (x) => `La vidéo du maître dure ${x}.`,
  (x) => `L’arbitre accorde ${x} de temps additionnel.`,
  (x) => `La pâtissière fouette la crème pendant ${x}.`,
  (x) => `Le pompier enfile sa tenue en ${x}.`,
  (x) => `Le record ${deN()} au 1 000 m est de ${x}.`,
  (x) => `La plongeuse reste sous l’eau ${x}.`,
];
const SITUATIONS_JOURS: ((n: number) => string)[] = [
  (n) => `La classe de découverte dure ${n} jours.`,
  (n) => `Le séjour au ski dure ${n} jours.`,
  (n) => `La course de voile dure ${n} jours.`,
  (n) => `Le festival de musique dure ${n} jours.`,
  (n) => `Le stage de foot dure ${n} jours.`,
  (n) => `La fête du village dure ${n} jours.`,
  (n) => `La foire agricole dure ${n} jours.`,
  (n) => `La mission de l’astronaute dans la capsule dure ${n} jours.`,
];
const SITUATIONS_SEMAINES: ((n: number) => string)[] = [
  (n) => `Les vacances de la famille ${deN()} durent ${n} semaines.`,
  (n) => `Le chantier du maçon dure ${n} semaines.`,
  (n) => `${N()} garde son plâtre ${n} semaines.`,
  (n) => `Les radis du jardin poussent en ${n} semaines.`,
  (n) => `Le stage de natation dure ${n} semaines.`,
  (n) => `L’exposition de la bibliothèque reste ${n} semaines.`,
  (n) => `Les œufs de la poule couveuse éclosent en ${n} semaines.`,
];
const SITUATIONS_ANS: ((n: number) => string)[] = [
  (n) => `Le chien ${deN()} a ${n} ans.`,
  (n) => `Le contrat de location de l’appartement dure ${n} ans.`,
  (n) => `Le pommier du verger a été planté il y a ${n} ans.`,
  (n) => `La tortue de la classe vit chez nous depuis ${n} ans.`,
  (n) => `Les travaux de la nouvelle gare durent ${n} ans.`,
  (n) => `La garantie de la machine à laver dure ${n} ans.`,
];
const SITUATIONS_SIECLES: ((x: string) => string)[] = [
  (x) => `Le château fort a été construit il y a ${x}.`,
  (x) => `Ce chêne de la forêt a ${x}.`,
  (x) => `La cathédrale a mis ${x} à être terminée.`,
  (x) => `Ce village existe depuis ${x}.`,
  (x) => `Les ruines du théâtre romain ont plus de ${x}.`,
  (x) => `Cette recette de pain se transmet depuis ${x}.`,
  (x) => `Le vieux moulin tourne depuis ${x}.`,
  (x) => `Ce volcan endormi n’est plus entré en éruption depuis ${x}.`,
  (x) => `L’université de la ville a été fondée il y a ${x}.`,
  (x) => `Cette grotte ornée est connue depuis ${x}.`,
];
const SITUATIONS_SEC_LONGUES: ((T: number) => string)[] = [
  (T) => `Le record ${deN()} au 1 500 m est de ${T} s.`,
  (T) => `La musique du spectacle dure ${T} s.`,
  (T) => `La vidéo du maître dure ${T} s.`,
  (T) => `La plongeuse reste sous l’eau ${T} s.`,
  (T) => `Le minuteur de la pâtissière est réglé sur ${T} s.`,
  (T) => `Le tour de grand huit dure ${T} s.`,
  (T) => `Le chrono du nageur affiche ${T} s.`,
  (T) => `La chanson préférée ${deN()} dure ${T} s.`,
  (T) => `La course de relais de la classe dure ${T} s.`,
  (T) => `Le micro-ondes chauffe la soupe pendant ${T} s.`,
  (T) => `La publicité avant le film dure ${T} s.`,
  (T) => `Le pompier grimpe à la grande échelle en ${T} s.`,
];
const SITUATIONS_HEURES_LONGUES: ((T: number) => string)[] = [
  (T) => `La panne d’électricité du quartier dure ${T} h.`,
  (T) => `Le voyage en bateau dure ${T} h.`,
  (T) => `Le festival de musique dure ${T} h.`,
  (T) => `La course de voile en solitaire dure ${T} h.`,
  (T) => `La tempête souffle pendant ${T} h.`,
  (T) => `Le bloc de glace met ${T} h à fondre.`,
  (T) => `La colle de la maquette sèche pendant ${T} h.`,
  (T) => `La garde de la vétérinaire dure ${T} h.`,
  (T) => `Le pain au levain du boulanger fermente pendant ${T} h.`,
  (T) => `La fête foraine reste ouverte ${T} h sans s’arrêter.`,
];
const SITUATIONS_JOURS_LONGS: ((T: number) => string)[] = [
  (T) => `Le tour de France à vélo dure ${T} jours.`,
  (T) => `La traversée de l’océan en voilier dure ${T} jours.`,
  (T) => `Le stage de théâtre dure ${T} jours.`,
  (T) => `Les graines de tomate germent en ${T} jours.`,
  (T) => `Le chantier du pont dure ${T} jours.`,
  (T) => `La cure du chat chez la vétérinaire dure ${T} jours.`,
  (T) => `La mission du sous-marin dure ${T} jours.`,
  (T) => `L’exposition de dinosaures reste ouverte ${T} jours.`,
];
const EVENEMENTS: [string, number][] = [
  ["La Révolution française commence en", 1789],
  ["Christophe Colomb atteint l’Amérique en", 1492],
  ["Le premier homme marche sur la Lune en", 1969],
  ["La tour Eiffel est inaugurée en", 1889],
  ["Gutenberg imprime sa première Bible vers", 1455],
  ["Louis XIV devient roi en", 1643],
  ["Napoléon devient empereur en", 1804],
  ["L’esclavage est aboli en France en", 1848],
  ["Les frères Lumière montrent leur premier film en", 1895],
  ["Jeanne d’Arc libère Orléans en", 1429],
  ["Hugues Capet devient roi des Francs en", 987],
  ["Les femmes votent pour la première fois en France en", 1945],
];
const OBJETS_DATES: [(Y: number) => string, number, number][] = [
  [(Y) => `Le château fort a été construit en ${Y}.`, 1001, 1480],
  [(Y) => `Ce pont de pierre date de ${Y}.`, 1101, 1890],
  [(Y) => `Ce tableau a été peint en ${Y}.`, 1401, 2020],
  [(Y) => `Cette église a été bâtie en ${Y}.`, 1001, 1890],
  [(Y) => `Le moulin du village date de ${Y}.`, 1201, 1880],
  [(Y) => `Cette carte ancienne a été dessinée en ${Y}.`, 1401, 1880],
  [(Y) => `Le phare a été allumé pour la première fois en ${Y}.`, 1701, 1980],
  [(Y) => `Ce violon a été fabriqué en ${Y}.`, 1601, 1990],
  [(Y) => `L’école du quartier a ouvert en ${Y}.`, 1851, 2020],
  [(Y) => `Ce livre de recettes a été imprimé en ${Y}.`, 1501, 1990],
];

const dureeConvertirGabarits: TutorBankItemV4[] = [
  // ★1 — heures entières en minutes.
  C(1, 1, HINT_60, () => {
    const n = entre(1, 8);
    return {
      text: `${dure(`${n} h`)} ${un(Q_EN_MIN)}`,
      ...qcm(`${60 * n} min`, [`${100 * n} min`, `${10 * n} min`, n > 1 ? `${60 * (n - 1)} min` : "30 min"]),
      explanation: etapes("1 h = 60 min.", `${n} × 60 = ${60 * n}.`, `${n} h = ${60 * n} min.`),
      canvas: frise("début", "fin", nFois(n, "1 h", 60)),
    };
  }),
  // ★1 — minutes en secondes.
  C(2, 1, "1 min = 60 s (et pas 100 s).", () => {
    const n = entre(1, 10);
    return {
      text: `${un(SITUATIONS_SECONDES)(`${n} min`)} ${un(Q_EN_S)}`,
      ...qcm(`${60 * n} s`, [`${100 * n} s`, `${10 * n} s`, n > 1 ? `${60 * (n - 1)} s` : "30 s"]),
      explanation: etapes("1 min = 60 s.", `${n} × 60 = ${60 * n}.`, `${n} min = ${60 * n} s.`),
      canvas: ecranD(`${pad2(n)}:00`, "Chronomètre (min : s)"),
    };
  }),
  // ★1 — jours, semaines, années.
  C(3, 1, "1 jour = 24 h ; 1 semaine = 7 jours ; 1 an = 12 mois.", () => {
    const cas = entre(0, 2);
    if (cas === 0) {
      const n = entre(2, 5);
      return {
        text: `${un(SITUATIONS_JOURS)(n)} ${un(["Combien d’heures cela fait-il ?", "Cela fait combien d’heures ?", "Convertis cette durée en heures."])}`,
        ...qcm(`${24 * n} h`, [`${12 * n} h`, `${10 * n} h`, `${24 * (n - 1)} h`]),
        explanation: etapes("1 jour = 24 h.", `${n} × 24 = ${24 * n}.`, `${n} jours = ${24 * n} h.`),
        canvas: frise("début", "fin", nFois(n, "1 jour", 1)),
      };
    }
    if (cas === 1) {
      const n = entre(2, 8);
      return {
        text: `${un(SITUATIONS_SEMAINES)(n)} ${un(["Combien de jours cela fait-il ?", "Cela fait combien de jours ?", "Convertis cette durée en jours."])}`,
        ...qcm(`${7 * n} jours`, [`${5 * n} jours`, `${10 * n} jours`, `${7 * n - 7} jours`]),
        explanation: etapes("1 semaine = 7 jours (le week-end compte aussi).", `${n} × 7 = ${7 * n}.`, `${n} semaines = ${7 * n} jours.`),
        canvas: frise("début", "fin", nFois(n, "7 j", 1)),
      };
    }
    const n = entre(2, 6);
    return {
      text: `${un(SITUATIONS_ANS)(n)} ${un(["Combien de mois cela fait-il ?", "Cela fait combien de mois ?", "Convertis cette durée en mois."])}`,
      ...qcm(`${12 * n} mois`, [`${10 * n} mois`, `${52 * n} mois`, `${12 * (n - 1)} mois`]),
      explanation: etapes("1 an = 12 mois (et 52 semaines : ne les confonds pas).", `${n} × 12 = ${12 * n}.`, `${n} ans = ${12 * n} mois.`),
      canvas: frise("début", "fin", nFois(n, "1 an", 1)),
    };
  }),
  // ★2 — h et min en minutes.
  C(4, 2, HINT_60, () => {
    const h = entre(1, 4);
    const m = entre(1, 59);
    const juste = 60 * h + m;
    return {
      text: `${dure(`${h} h ${m} min`)} ${un(Q_EN_MIN)}`,
      ...qcm(`${juste} min`, [`${100 * h + m} min`, `${60 * h} min`, `${h + m} min`, h > 1 ? `${60 + m} min` : `${juste + 60} min`]),
      explanation: etapes("on convertit les heures (1 h = 60 min), puis on ajoute les minutes.", `${h} × 60 = ${60 * h} ; ${60 * h} + ${m} = ${juste}.`, `${h} h ${m} min = ${juste} min.`),
      canvas: frise("début", "fin", [...nFois(h, "1 h", 60), [`${m} min`, m]]),
    };
  }),
  // ★2 — minutes en h et min.
  C(5, 2, "Dans 60 min, il y a 1 h : enlève 60 min autant de fois que possible.", () => {
    let T = entre(65, 300);
    if (T % 60 === 0) T += 7;
    const faux = [dur(T + 60), dur(T - 60)];
    if (T >= 100) faux.push(T % 100 === 0 ? `${T / 100} h` : `${Math.floor(T / 100)} h ${T % 100} min`);
    faux.push(dur(T + 10));
    return {
      text: `${dure(`${T} min`)} ${un(Q_EN_HMIN)}`,
      ...qcm(dur(T), faux),
      explanation: etapes("1 h = 60 min : on cherche combien de fois 60 min tiennent dans la durée.", `${T} = ${Math.floor(T / 60)} × 60 + ${T % 60}.`, `${T} min = ${dur(T)}.`),
      canvas: frise("début", "fin", [[`${T} min`, T]]),
    };
  }),
  // ★2 — siècles et millénaires.
  C(6, 2, "1 siècle = 100 ans ; 1 millénaire = 1 000 ans = 10 siècles.", () => {
    const cas = entre(0, 2);
    if (cas === 0) {
      const n = entre(2, 9);
      return {
        text: `${un(SITUATIONS_SIECLES)(`${n} siècles`)} ${un(["Combien d’années cela fait-il ?", "Cela fait combien d’années ?", "Convertis cette durée en années."])}`,
        ...qcm(`${100 * n} ans`, [`${10 * n} ans`, `${fr(1000 * n)} ans`, `${100 * (n + 1)} ans`]),
        explanation: etapes("1 siècle = 100 ans.", `${n} × 100 = ${100 * n}.`, `${n} siècles = ${100 * n} ans.`),
        canvas: frise("début", "aujourd’hui", nFois(n, "100 ans", 1)),
      };
    }
    if (cas === 1) {
      const n = entre(2, 5);
      return {
        text: `${un(SITUATIONS_SIECLES)(`${n} millénaires`)} ${un(["Combien de siècles cela fait-il ?", "Cela fait combien de siècles ?", "Convertis cette durée en siècles."])}`,
        ...qcm(`${10 * n} siècles`, [`${100 * n} siècles`, `${fr(1000 * n)} siècles`, `${n} siècles`]),
        explanation: etapes("1 millénaire = 1 000 ans = 10 siècles.", `${n} × 10 = ${10 * n}.`, `${n} millénaires = ${10 * n} siècles.`),
        canvas: frise("début", "aujourd’hui", nFois(n, "1 000 ans", 1)),
      };
    }
    const k = entre(2, 9);
    return {
      text: `${un(SITUATIONS_SIECLES)(`${100 * k} ans`)} ${un(["Combien de siècles cela fait-il ?", "Cela fait combien de siècles ?", "Convertis cette durée en siècles."])}`,
      ...qcm(`${k} siècles`, [`${10 * k} siècles`, `${100 * k} siècles`, `${k + 1} siècles`]),
      explanation: etapes("1 siècle = 100 ans : on compte les centaines d’années.", `${100 * k} = ${k} × 100.`, `${100 * k} ans = ${k} siècles.`),
      canvas: frise("début", "aujourd’hui", [[`${100 * k} ans`, 1]]),
    };
  }),
  // ★2 — min et s en secondes.
  C(7, 2, "1 min = 60 s : convertis les minutes, puis ajoute les secondes.", () => {
    const m = entre(1, 5);
    const s = entre(5, 55);
    const juste = 60 * m + s;
    return {
      text: `${un(SITUATIONS_SECONDES)(`${m} min ${s} s`)} ${un(Q_EN_S)}`,
      ...qcm(`${juste} s`, [`${100 * m + s} s`, `${m + s} s`, `${60 * m} s`, `${juste + 60} s`]),
      explanation: etapes("on convertit les minutes (1 min = 60 s), puis on ajoute les secondes.", `${m} × 60 = ${60 * m} ; ${60 * m} + ${s} = ${juste}.`, `${m} min ${s} s = ${juste} s.`),
      canvas: ecranD(`${pad2(m)}:${pad2(s)}`, "Chronomètre (min : s)"),
    };
  }),
  // ★3 — heures avec une virgule.
  C(8, 3, "0,5 h, c’est une demi-heure = 30 min ; 0,25 h, un quart d’heure = 15 min ; 0,75 h = 45 min.", () => {
    const x = un([0.5, 1.5, 2.5, 3.5, 0.25, 1.25, 2.25, 0.75, 1.75, 2.75]);
    const ent = Math.floor(x);
    const m = Math.round(60 * (x - ent));
    const ds = String(x).split(".")[1];
    const etapesFrise: [string, number][] = [...nFois(ent, "1 h", 60), [`${fr(x - ent)} h`, m]];
    if (Math.random() < 0.5) {
      return {
        text: `${dure(`${fr(x)} h`)} ${un(Q_EN_HMIN)}`,
        ...qcm(dur(60 * x), [dur(luEnMinutes(x)), dur(60 * ent + Number(ds[0])), dur(60 * ent + (m === 30 ? 15 : 30)), dur(60 * x + 60)]),
        explanation: etapes("la partie après la virgule est une fraction d’heure, pas des minutes.", `${fr(x - ent)} h = ${fr(x - ent)} × 60 min = ${m} min.`, `${fr(x)} h = ${dur(60 * x)}.`),
        canvas: frise("début", "fin", etapesFrise),
      };
    }
    return {
      text: `${dure(dur(60 * x))} ${un(["Écris cette durée en heures, avec une virgule.", "Quelle est cette durée en heures ?", "Combien d’heures cela fait-il, avec un nombre à virgule ?"])}`,
      ...qcm(`${fr(x)} h`, [`${fr(ent + m / 100)} h`, `${fr(60 * ent + m)} h`, `${fr(ent + (m === 30 ? 0.25 : 0.5))} h`]),
      explanation: etapes("30 min = une demi-heure = 0,5 h ; 15 min = un quart d’heure = 0,25 h ; 45 min = 0,75 h.", `${m} min = ${fr(x - ent)} h.`, `${dur(60 * x)} = ${fr(x)} h (et pas ${fr(ent + m / 100)} h).`),
      canvas: frise("début", "fin", etapesFrise),
    };
  }),
  // ★3 — secondes en min et s.
  C(9, 3, "1 min = 60 s : enlève 60 s autant de fois que possible.", () => {
    let T = entre(130, 600);
    if (T % 60 === 0) T += 13;
    const q = Math.floor(T / 60);
    const r = T % 60;
    const faux = [`${q + 1} min ${r} s`, T % 100 === 0 ? `${T / 100} min` : `${Math.floor(T / 100)} min ${T % 100} s`];
    faux.push(T % 10 === 0 ? `${T / 10} min` : `${q} min ${(r + 40) % 60 || 10} s`);
    return {
      text: `${un(SITUATIONS_SEC_LONGUES)(T)} ${un(["Écris cette durée en minutes et secondes.", "Combien de minutes et de secondes cela fait-il ?", "Quelle est cette durée en min et s ?"])}`,
      ...qcm(`${q} min ${r} s`, faux),
      explanation: etapes("1 min = 60 s.", `${T} = ${q} × 60 + ${r}.`, `${T} s = ${q} min ${r} s.`),
    };
  }),
  // ★3 — heures en jours et heures, jours en semaines et jours.
  C(10, 3, "1 jour = 24 h ; 1 semaine = 7 jours : enlève-les autant de fois que possible.", () => {
    if (Math.random() < 0.5) {
      let T = entre(26, 100);
      if (T % 24 === 0) T += 5;
      const j = Math.floor(T / 24);
      const r = T % 24;
      const jh = (a: number, b: number) => `${a} jour${a > 1 ? "s" : ""}${b ? ` ${b} h` : ""}`;
      return {
        text: `${un(SITUATIONS_HEURES_LONGUES)(T)} ${un(["Combien de jours et d’heures cela fait-il ?", "Écris cette durée en jours et heures.", "Quelle est cette durée en jours et heures ?"])}`,
        ...qcm(jh(j, r), [jh(Math.floor(T / 10), T % 10), jh(Math.floor(T / 12), T % 12), jh(j + 1, r)]),
        explanation: etapes("1 jour = 24 h.", `${T} = ${j} × 24 + ${r}.`, `${T} h = ${jh(j, r)}.`),
      };
    }
    let T = entre(12, 45);
    if (T % 7 === 0) T += 2;
    const q = Math.floor(T / 7);
    const r = T % 7;
    const sj = (a: number, b: number) => `${a} semaine${a > 1 ? "s" : ""}${b ? ` ${b} jour${b > 1 ? "s" : ""}` : ""}`;
    return {
      text: `${un(SITUATIONS_JOURS_LONGS)(T)} ${un(["Combien de semaines et de jours cela fait-il ?", "Écris cette durée en semaines et jours.", "Quelle est cette durée en semaines et jours ?"])}`,
      ...qcm(sj(q, r), [sj(Math.floor(T / 5), T % 5), sj(q + 1, r), sj(Math.floor(T / 10), T % 10)]),
      explanation: etapes("1 semaine = 7 jours (et pas 5 : le week-end compte).", `${T} = ${q} × 7 + ${r}.`, `${T} jours = ${sj(q, r)}.`),
    };
  }),
  // ★3 — l'année et son siècle.
  C(11, 3, "Le 1er siècle va de l’an 1 à l’an 100 : 1789 est au 18e siècle (et pas au 17e).", () => {
    let texte: string;
    let Y: number;
    if (Math.random() < 0.5) {
      const [e, y] = un(EVENEMENTS);
      texte = `${e} ${y}.`;
      Y = y;
    } else {
      const [phrase, a, b] = un(OBJETS_DATES);
      Y = entre(a, b);
      if (Y % 100 === 0) Y += 11;
      texte = phrase(Y);
    }
    const c = Math.ceil(Y / 100);
    return {
      text: `${texte} ${un(["En quel siècle est-ce ?", "À quel siècle cette date appartient-elle ?", "Dans quel siècle se situe cette année ?"])}`,
      ...qcm(`au ${c}e siècle`, [`au ${c - 1}e siècle`, `au ${c + 1}e siècle`, `au ${Math.floor(Y / 10)}e siècle`]),
      explanation: etapes(
        "un siècle dure 100 ans : le 1er siècle va de 1 à 100, le 2e de 101 à 200…",
        `${Y} est entre ${100 * (c - 1) + 1} et ${100 * c}.`,
        `${Y} est au ${c}e siècle.`,
      ),
    };
  }),
  // ★3 — h et min en secondes.
  C(12, 3, "1 h = 60 min = 3 600 s ; 1 min = 60 s.", () => {
    const m = entre(1, 20);
    const juste = 3600 + 60 * m;
    return {
      text: `${dure(`1 h ${m} min`)} ${un(Q_EN_S)}`,
      ...qcm(`${fr(juste)} s`, [`${fr(60 + 60 * m)} s`, `${fr(3600 + m)} s`, `${fr(6000 + 100 * m)} s`]),
      explanation: etapes("1 h = 60 × 60 s = 3 600 s ; 1 min = 60 s.", `${m} × 60 = ${60 * m} ; 3 600 + ${60 * m} = ${fr(juste)}.`, `1 h ${m} min = ${fr(juste)} s.`),
      canvas: frise("début", "fin", [["3 600 s", 60], [`${m} min`, m]]),
    };
  }),
];

/* ───────────── duree_calculer ───────────── */

const K = atelier("duree_calculer");
const ACTIVITES = [
  "Le cours de judo", "La séance de cinéma", "Le match de handball", "La visite du zoo", "L’atelier de poterie",
  "La réunion des parents", "La consultation chez la pédiatre", "La sortie au parc", "La répétition de théâtre",
  "La leçon de guitare", "L’entraînement de natation", "Le spectacle de marionnettes", "La tournée du facteur",
  "Le cours de danse", "La séance chez le kiné", "La partie de pétanque", "L’émission de radio", "Le conseil municipal",
];
const debutFin = (t1: string, t2: string) => {
  const a = un(ACTIVITES);
  return un([`${a} commence à ${t1} et finit à ${t2}.`, `${a} débute à ${t1} et se termine à ${t2}.`, `${a} : début à ${t1}, fin à ${t2}.`]);
};
const debutDuree = (t: string, d: string) => {
  const a = un(ACTIVITES);
  return un([`${a} commence à ${t} et dure ${d}.`, `${a} débute à ${t}, pour une durée de ${d}.`, `${a} : début à ${t}, durée ${d}.`]);
};
const finDuree = (t: string, d: string) => {
  const a = un(ACTIVITES);
  return un([`${a} se termine à ${t} ; il a fallu ${d}.`, `${a} finit à ${t}, après ${d}.`, `${a} : fin à ${t}, durée ${d}.`]);
};
const Q_DUREE = ["Quelle est sa durée ?", "Combien de temps cela dure-t-il ?", "Calcule la durée.", "Combien de temps s’écoule entre le début et la fin ?"];
const Q_FIN = ["À quelle heure est-ce terminé ?", "Quelle heure est-il à la fin ?", "À quelle heure est la fin ?", "Trouve l’heure de fin."];
const Q_DEBUT = ["À quelle heure cela a-t-il commencé ?", "Quelle était l’heure de début ?", "À quelle heure était le début ?"];
const HINT_PONT = "Passe par l’heure pile : compte jusqu’à l’heure suivante, puis ajoute le reste.";
const COURSES_CHRONO: ((a: string, b: string) => string)[] = [
  (a, b) => `Quand ${N()} part, le chronomètre affiche ${a} ; à son arrivée, il affiche ${b}.`,
  (a, b) => `La nageuse plonge quand le chrono indique ${a}. Elle touche le mur à ${b}.`,
  (a, b) => `Le relais part à ${a} au chrono et arrive à ${b}.`,
  (a, b) => `La cycliste passe la ligne de départ à ${a} au chrono, et la ligne d’arrivée à ${b}.`,
  (a, b) => `Dans la vidéo, le saut du parachutiste commence à ${a} et finit à ${b}.`,
  (a, b) => `La chanson commence à ${a} sur le lecteur et s’arrête à ${b}.`,
  (a, b) => `Le skieur s’élance à ${a} au chrono ; il franchit l’arrivée à ${b}.`,
  (a, b) => `Le pompier commence l’exercice à ${a} au chrono et le finit à ${b}.`,
  (a, b) => `L’écureuil du dessin animé apparaît à ${a} et disparaît à ${b}.`,
  (a, b) => `Le cheval prend le départ à ${a} au chrono et arrive à ${b}.`,
];
const Q_DUREE_S = ["Combien de temps a duré la course ?", "Quelle est la durée ?", "Combien de temps s’est écoulé ?", "Calcule la durée."];
const DEUX_CHRONOS: ((a: string, b: string) => string)[] = [
  (a, b) => `À la course d’orientation, ${N()} met ${a} pour la première balise, puis ${b} pour la deuxième.`,
  (a, b) => `La chanson dure ${a}, puis la suivante dure ${b}.`,
  (a, b) => `Le nageur fait la première longueur en ${a} et la deuxième en ${b}.`,
  (a, b) => `La pâtissière fouette les blancs ${a}, puis la crème ${b}.`,
  (a, b) => `Le premier tour de piste dure ${a}, le deuxième ${b}.`,
  (a, b) => `La vidéo de l’expérience dure ${a}, puis celle du résultat ${b}.`,
  (a, b) => `${N()} brosse ses dents ${a} le matin et ${b} le soir.`,
  (a, b) => `La pompière déroule la lance en ${a}, puis l’enroule en ${b}.`,
  (a, b) => `Le tour de manège dure ${a}, puis le tour de grande roue ${b}.`,
  (a, b) => `La première manche du jeu dure ${a}, la deuxième ${b}.`,
];
const Q_TOTAL = ["Combien de temps cela fait-il en tout ?", "Quelle est la durée totale ?", "Combien de temps au total ?"];
const figureFin = (h: number, m: number, d: number): DureeCanvasData =>
  Math.random() < 0.5 ? frise(hh(h, m), "?", [[dur(d), d]]) : horloge(h, m, "Début");

const dureeCalculerGabarits: TutorBankItemV4[] = [
  // ★2 — durée à cheval sur l'heure, minutes précises.
  K(1, 2, HINT_PONT, () => {
    const h = entre(8, 18);
    const m1 = entre(35, 58);
    const m2 = entre(1, Math.min(30, m1 - 5));
    const d = 60 - m1 + m2;
    return {
      text: `${debutFin(hh(h, m1), hh(h + 1, m2))} ${un(Q_DUREE)}`,
      ...qcm(`${d} min`, [`${100 - m1 + m2} min`, m1 - m2 !== d ? `${m1 - m2} min` : `${d + 10} min`, `${60 - m1} min`, dur(d + 60)]),
      explanation: etapes("on passe par l’heure pile.", `de ${hh(h, m1)} à ${hh(h + 1, 0)} : ${60 - m1} min ; puis ${m2} min. ${60 - m1} + ${m2} = ${d}.`, `cela dure ${d} min (et pas ${100 - m1 + m2} : une heure, c’est 60 min).`),
      canvas: deuxHorloges([h, m1, "Début"], [h + 1, m2, "Fin"]),
    };
  }),
  // ★2 — heure de fin en passant l'heure.
  K(2, 2, "Quand les minutes dépassent 60, enlève 60 min et ajoute 1 h.", () => {
    const h = entre(8, 17);
    const m1 = entre(20, 55);
    const d = entre(Math.max(10, 61 - m1), 55);
    const fin = 60 * h + m1 + d;
    return {
      text: `${debutDuree(hh(h, m1), `${d} min`)} ${un(Q_FIN)}`,
      ...qcm(hT(fin), [`${h} h ${m1 + d}`, hT(fin - 60), hT(fin + 60), hT(60 * h + Math.abs(m1 - d))]),
      explanation: etapes("on ajoute les minutes, puis on passe l’heure si l’on dépasse 60.", `${m1} + ${d} = ${m1 + d} min = 1 h ${pad2(m1 + d - 60)}.`, `c’est terminé à ${hT(fin)}.`),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★2 — durée en h et min, sans retenue.
  K(3, 2, "Calcule séparément les heures et les minutes.", () => {
    const h1 = entre(7, 15);
    const m1 = entre(0, 30);
    const k = entre(1, 3);
    const m2 = m1 + entre(1, 59 - m1);
    const d = 60 * k + m2 - m1;
    return {
      text: `${debutFin(hh(h1, m1), hh(h1 + k, m2))} ${un(Q_DUREE)}`,
      ...qcm(dur(d), [`${m2 - m1} min`, dur(d + 60), dur(60 * k + m1 + m2), `${100 * k + m2 - m1} min`]),
      explanation: etapes("on calcule les heures, puis les minutes.", `${h1 + k} − ${h1} = ${k} h et ${m2} − ${m1} = ${m2 - m1} min.`, `cela dure ${dur(d)}.`),
      canvas: deuxHorloges([h1, m1, "Début"], [h1 + k, m2, "Fin"]),
    };
  }),
  // ★2 — durée en secondes, à cheval sur la minute.
  K(4, 2, "Passe par la minute pile : compte les secondes jusqu’à la minute suivante, puis ajoute le reste.", () => {
    const m = entre(0, 8);
    const s1 = entre(35, 58);
    const s2 = entre(1, Math.min(30, s1 - 5));
    const d = 60 - s1 + s2;
    return {
      text: `${un(COURSES_CHRONO)(ms(m, s1), ms(m + 1, s2))} ${un(Q_DUREE_S)}`,
      ...qcm(`${d} s`, [`${100 - s1 + s2} s`, s1 - s2 !== d ? `${s1 - s2} s` : `${d + 10} s`, `${60 - s1} s`, `1 min ${d} s`]),
      explanation: etapes("on passe par la minute pile.", `de ${ms(m, s1)} à ${m + 1} min : ${60 - s1} s ; puis ${s2} s. ${60 - s1} + ${s2} = ${d}.`, `la durée est ${d} s (une minute, c’est 60 s).`),
      canvas: ecranD(`${pad2(m + 1)}:${pad2(s2)}`, "Arrivée (min : s)"),
    };
  }),
  // ★3 — durée en h et min avec retenue.
  K(5, 3, HINT_PONT, () => {
    const h1 = entre(7, 14);
    const k = entre(1, 3);
    const m1 = entre(25, 58);
    const m2 = entre(2, Math.min(22, m1 - 3));
    const d = 60 * k + m2 - m1;
    const cent = 100 * k + m2 - m1;
    return {
      text: `${debutFin(hh(h1, m1), hh(h1 + k, m2))} ${un(Q_DUREE)}`,
      ...qcm(dur(d), [`${k} h ${m1 - m2} min`, cent >= 100 ? `${Math.floor(cent / 100)} h ${cent % 100} min` : `${cent} min`, `${k} h ${60 - m1 + m2} min`]),
      explanation: etapes(
        "on passe par l’heure pile.",
        `de ${hh(h1, m1)} à ${hh(h1 + 1, 0)} : ${60 - m1} min ; de ${hh(h1 + 1, 0)} à ${hh(h1 + k, m2)} : ${dur(60 * (k - 1) + m2)}.`,
        `cela dure ${dur(d)}.`,
      ),
      canvas: deuxHorloges([h1, m1, "Début"], [h1 + k, m2, "Fin"]),
    };
  }),
  // ★3 — heure de fin, durée en h et min.
  K(6, 3, "Ajoute les heures, puis les minutes ; passe l’heure si les minutes dépassent 60.", () => {
    const h = entre(7, 15);
    const m1 = entre(10, 55);
    const k = entre(1, 2);
    const dm = entre(Math.max(5, 61 - m1), 55);
    const d = 60 * k + dm;
    const fin = 60 * h + m1 + d;
    return {
      text: `${debutDuree(hh(h, m1), dur(d))} ${un(Q_FIN)}`,
      ...qcm(hT(fin), [`${h + k} h ${m1 + dm}`, hT(fin - 60), hT(fin + 60), hT(60 * h + m1 + dm)]),
      explanation: etapes("on ajoute les heures, puis les minutes.", `${hh(h, m1)} + ${k} h = ${hh(h + k, m1)} ; ${m1} + ${dm} = ${m1 + dm} min = 1 h ${pad2(m1 + dm - 60)}.`, `c’est terminé à ${hT(fin)}.`),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★3 — heure de début : remonter une durée en h et min.
  K(7, 3, "On remonte le temps : enlève d’abord les heures, puis les minutes en passant par l’heure pile.", () => {
    const h2 = entre(10, 19);
    const m2 = entre(0, 40);
    const k = entre(1, 2);
    const dm = entre(m2 + 5, 58);
    const fin = 60 * h2 + m2;
    const d = 60 * k + dm;
    const debut = fin - d;
    return {
      text: `${finDuree(hh(h2, m2), dur(d))} ${un(Q_DEBUT)}`,
      ...qcm(hT(debut), [hT(fin + d), hh(h2 - k, dm - m2), hT(debut + 60), hT(debut - 10)]),
      explanation: etapes(
        "on remonte le temps : d’abord les heures, puis les minutes.",
        `${hh(h2, m2)} − ${k} h = ${hh(h2 - k, m2)} ; puis − ${dm} min : ${m2} min pour revenir à ${hh(h2 - k, 0)}, puis encore ${dm - m2} min.`,
        `le début était à ${hT(debut)}.`,
      ),
      canvas: Math.random() < 0.5 ? horloge(h2, m2, "Fin") : frise("?", hh(h2, m2), [[dur(d), d]]),
    };
  }),
  // ★3 — additionner deux durées en min et s.
  K(8, 3, "Additionne les secondes, puis les minutes : 60 s font 1 min.", () => {
    const m1 = entre(1, 4);
    const s1 = entre(20, 55);
    const m2 = entre(1, 4);
    const s2 = entre(61 - s1, 55);
    const S = s1 + s2;
    const total = 60 * (m1 + m2) + S;
    const r = S - 60;
    return {
      text: `${un(DEUX_CHRONOS)(`${m1} min ${s1} s`, `${m2} min ${s2} s`)} ${un(Q_TOTAL)}`,
      ...qcm(durS(total), [ms(m1 + m2, r), ms(m1 + m2 + 2, r), S >= 100 ? ms(m1 + m2 + 1, S - 100) : ms(m1 + m2 + 1, (r + 10) % 60 || 5)]),
      explanation: etapes("on additionne les secondes, puis les minutes.", `${s1} + ${s2} = ${S} s = 1 min ${r} s ; ${m1} + ${m2} + 1 = ${m1 + m2 + 1} min.`, `en tout : ${durS(total)}.`),
      canvas: frise("début", "fin", [[`${m1} min ${s1} s`, 60 * m1 + s1], [`${m2} min ${s2} s`, 60 * m2 + s2]]),
    };
  }),
  // ★3 — durée entre deux instants en h, min, s.
  K(9, 3, "Les secondes de l’arrivée sont plus petites : emprunte 1 min = 60 s.", () => {
    const h = entre(8, 17);
    const k = entre(1, 4);
    const m1 = entre(2, 50);
    const m2 = m1 + k;
    const s1 = entre(25, 58);
    const s2 = entre(2, s1 - 10);
    const d = 60 * k + s2 - s1;
    return {
      text: `${un(COURSES_CHRONO)(hms(h, m1, s1), hms(h, m2, s2))} ${un(Q_DUREE_S)}`,
      ...qcm(durS(d), [ms(k, s1 - s2), ms(k, 60 - s1 + s2), ms(k - 1, 100 - s1 + s2)]),
      explanation: etapes(
        "on passe par la minute pile.",
        `de ${hms(h, m1, s1)} à ${h} h ${m1 + 1} min : ${60 - s1} s ; puis ${k - 1} min et ${s2} s.`,
        `la durée est ${durS(d)}.`,
      ),
      canvas: ecranD(`${pad2(h)}:${pad2(m2)}:${pad2(s2)}`, "Arrivée (h : min : s)"),
    };
  }),
];

/* ───────────── duree_probleme ───────────── */

const P = atelier("duree_probleme");
const SITUATIONS_ATTENTE: ((t1: string, t2: string) => string)[] = [
  (t1, t2) => `${N()} arrive à l’arrêt de bus à ${t1}. Le bus passe à ${t2}.`,
  (t1, t2) => `La piscine ouvre à ${t2}. ${N()} est devant l’entrée à ${t1}.`,
  (t1, t2) => `Le train part à ${t2}. ${N()} est sur le quai à ${t1}.`,
  (t1, t2) => `Le cinéma ouvre ses portes à ${t2}. La famille ${deN()} arrive à ${t1}.`,
  (t1, t2) => `La vétérinaire reçoit le chien ${deN()} à ${t2}. Ils arrivent à la clinique à ${t1}.`,
  (t1, t2) => `La boulangerie ouvre à ${t2}. Le premier client attend devant depuis ${t1}.`,
  (t1, t2) => `Le match commence à ${t2}. Les joueuses sont au stade à ${t1}.`,
  (t1, t2) => `Le spectacle de magie commence à ${t2}. ${N()} s’assoit à ${t1}.`,
  (t1, t2) => `Le ferry embarque les voitures à ${t2}. Le plombier arrive au port à ${t1}.`,
  (t1, t2) => `La cantine ouvre à ${t2}. La classe est en rang à ${t1}.`,
  (t1, t2) => `Le rendez-vous chez le dentiste est à ${t2}. ${N()} arrive à ${t1}.`,
  (t1, t2) => `La navette de l’aéroport part à ${t2}. La pilote est prête à ${t1}.`,
  (t1, t2) => `Le marché ouvre à ${t2}. Le maraîcher a fini d’installer son stand à ${t1}.`,
  (t1, t2) => `Le car de la sortie scolaire part à ${t2}. Il est ${t1} dans la cour.`,
  (t1, t2) => `Le musée ouvre à ${t2}. Le guide est devant la porte à ${t1}.`,
];
const Q_ATTENTE = ["Combien de temps faut-il attendre ?", "Quelle est la durée de l’attente ?", "Combien de minutes d’attente cela fait-il ?"];
const SITUATIONS_FIN: ((t: string, d: string) => string)[] = [
  (t, d) => `Le cours de judo ${deN()} commence à ${t} et dure ${d}.`,
  (t, d) => `Le boulanger met les pains au four à ${t}. Ils cuisent ${d}.`,
  (t, d) => `La couturière commence une robe à ${t}. Il lui faut ${d}.`,
  (t, d) => `${N()} lance une partie de jeu de société à ${t}. La partie dure ${d}.`,
  (t, d) => `Le mécanicien commence la réparation à ${t}. Elle prend ${d}.`,
  (t, d) => `La jardinière commence à tailler la haie à ${t}. Cela lui prend ${d}.`,
  (t, d) => `Le film commence à ${t} et dure ${d}.`,
  (t, d) => `La chorale répète à partir de ${t}, pendant ${d}.`,
  (t, d) => `${N()} part à vélo à ${t}. Le trajet dure ${d}.`,
  (t, d) => `La pâtissière met une brioche au four à ${t}, pour ${d}.`,
  (t, d) => `L’infirmière commence sa tournée à ${t}. Elle dure ${d}.`,
  (t, d) => `Le pompier commence l’exercice d’incendie à ${t}. Il dure ${d}.`,
  (t, d) => `La vétérinaire commence à opérer un chat à ${t}. L’opération dure ${d}.`,
  (t, d) => `Le car part pour la classe de mer à ${t}. Le trajet dure ${d}.`,
];
const Q_FIN_P = ["À quelle heure est-ce terminé ?", "Quelle heure sera-t-il à la fin ?", "À quelle heure est-ce fini ?"];
const SITUATIONS_DEBUT: ((t: string, d: string) => string)[] = [
  (t, d) => `Le cours de judo ${deN()} finit à ${t} ; il a duré ${d}.`,
  (t, d) => `Le pain du boulanger sort du four à ${t}, après ${d} de cuisson.`,
  (t, d) => `La pièce de théâtre se termine à ${t}. Elle a duré ${d}.`,
  (t, d) => `La coiffeuse termine la coupe ${deN()} à ${t}. La coupe a duré ${d}.`,
  (t, d) => `Le mécanicien rend la voiture réparée à ${t}, après ${d} de travail.`,
  (t, d) => `La partie de foot se termine à ${t} ; elle a duré ${d}.`,
  (t, d) => `Le gâteau de la pâtissière sort du four à ${t}, après ${d} de cuisson.`,
  (t, d) => `L’infirmière termine son soin à ${t}. Le soin a duré ${d}.`,
  (t, d) => `La machine à laver s’arrête à ${t} ; elle a tourné ${d}.`,
  (t, d) => `L’orage s’arrête à ${t} ; il a duré ${d}.`,
  (t, d) => `La visite de la ferme finit à ${t}. Elle a duré ${d}.`,
  (t, d) => `L’avion atterrit à ${t}, après ${d} de vol.`,
];
const SITUATIONS_DEUX_DUREES: ((a: number, b: number) => string)[] = [
  (a, b) => `${N()} fait ${a} min de vélo, puis ${b} min de natation.`,
  (a, b) => `Le peintre passe ${a} min sur la première couche et ${b} min sur la deuxième.`,
  (a, b) => `La cuisinière fait mijoter la sauce ${a} min, puis la laisse reposer ${b} min.`,
  (a, b) => `Au musée, la classe visite la salle des dinosaures pendant ${a} min, puis celle des volcans pendant ${b} min.`,
  (a, b) => `Le jardinier tond la pelouse pendant ${a} min, puis taille la haie pendant ${b} min.`,
  (a, b) => `${N()} révise ses leçons ${a} min le samedi et ${b} min le dimanche.`,
  (a, b) => `Le car roule ${a} min jusqu’à la pause, puis ${b} min jusqu’au zoo.`,
  (a, b) => `L’électricien répare la prise en ${a} min, puis la lampe en ${b} min.`,
  (a, b) => `La chanteuse répète ${a} min le matin et ${b} min l’après-midi.`,
  (a, b) => `Le pilote vole ${a} min jusqu’à l’escale, puis ${b} min jusqu’à l’arrivée.`,
  (a, b) => `${N()} lit ${a} min avant le dîner et ${b} min avant de dormir.`,
  (a, b) => `La boulangère pétrit ${a} min, puis façonne les baguettes pendant ${b} min.`,
];
const Q_TOTAL_HMIN = ["Combien de temps cela fait-il en tout, en heures et minutes ?", "Quelle est la durée totale, en h et min ?", "Combien de temps au total ? Réponds en heures et minutes."];
const SITUATIONS_DECIMALES: ((t: string, x: string) => string)[] = [
  (t, x) => `Le car part à ${t}. Le trajet dure ${x}.`,
  (t, x) => `La plombière commence un chantier à ${t}. Elle prévoit ${x} de travail.`,
  (t, x) => `Le film commence à ${t}. Sur l’affiche, on lit : « durée ${x} ».`,
  (t, x) => `Le randonneur part à ${t}. Le panneau annonce ${x} de marche jusqu’au refuge.`,
  (t, x) => `Le rôti entre au four à ${t}. La recette dit : « cuire ${x} ».`,
  (t, x) => `La réunion commence à ${t} et doit durer ${x}.`,
  (t, x) => `Le bateau quitte le port à ${t}. La traversée dure ${x}.`,
  (t, x) => `L’électricien arrive chez ${N()} à ${t}. Il facture ${x} de travail.`,
  (t, x) => `Le cours de natation commence à ${t} et dure ${x}.`,
  (t, x) => `La colle de la maquette commence à sécher à ${t}. Il faut ${x}.`,
  (t, x) => `Le tournoi d’échecs commence à ${t}. Chaque partie dure ${x}.`,
  (t, x) => `La mécanicienne commence la vidange à ${t}. Le devis annonce ${x}.`,
];
const SITUATIONS_TROIS_ETAPES: ((t: string, a: string, b: string, c: string) => string)[] = [
  (t, a, b, c) => `La classe part en car à ${t}. Le trajet dure ${a}, la visite de la ferme ${b}, puis le pique-nique ${c}.`,
  (t, a, b, c) => `Le cuisinier commence à ${t} : ${a} de préparation, ${b} de cuisson, puis ${c} de repos.`,
  (t, a, b, c) => `La randonnée commence à ${t} : ${a} de montée, ${b} de pause au sommet, puis ${c} de descente.`,
  (t, a, b, c) => `${N()} part de la maison à ${t}. Le train roule ${a}, l’attente dure ${b}, puis le bus roule ${c}.`,
  (t, a, b, c) => `L’électricienne commence le chantier à ${t} : ${a} de câblage, ${b} de pause, puis ${c} de vérifications.`,
  (t, a, b, c) => `Le spectacle de l’école commence à ${t} : ${a} de danses, ${b} d’entracte, puis ${c} de chants.`,
  (t, a, b, c) => `Le vétérinaire commence à ${t} : ${a} d’opération, ${b} de réveil, puis ${c} de surveillance.`,
  (t, a, b, c) => `Le tournoi commence à ${t} : ${a} de matchs, ${b} de goûter, puis ${c} de remise des médailles.`,
  (t, a, b, c) => `La pâtissière commence à ${t} : ${a} pour la pâte, ${b} de repos, puis ${c} de cuisson.`,
  (t, a, b, c) => `Le maçon commence à ${t} : ${a} de travail, ${b} de pause, puis ${c} de rangement.`,
];
const Q_TOUT_FINI = ["À quelle heure tout est-il terminé ?", "À quelle heure est-ce fini ?", "Quelle heure est-il à la fin ?"];
const SERIES: ((n: number, s: number) => string)[] = [
  (n, s) => `Au club de natation, il y a ${n} courses de ${s} min`,
  (n, s) => `Le maître prévoit ${n} ateliers de ${s} min`,
  (n, s) => `Au tournoi de hand, il y a ${n} matchs de ${s} min`,
  (n, s) => `Le pâtissier fait cuire ${n} fournées de ${s} min`,
  (n, s) => `La coach de gym enchaîne ${n} exercices de ${s} min`,
  (n, s) => `Le moniteur de ski donne ${n} leçons de ${s} min`,
  (n, s) => `La guide du musée fait ${n} visites de ${s} min`,
  (n, s) => `La professeure de piano donne ${n} cours de ${s} min`,
  (n, s) => `Le dentiste reçoit ${n} patients, ${s} min chacun`,
  (n, s) => `Le magicien présente ${n} tours de ${s} min`,
  (n, s) => `L’animatrice organise ${n} jeux de ${s} min`,
  (n, s) => `Le photographe fait ${n} séances photo de ${s} min`,
];
const SITUATIONS_NUIT: ((t1: string, t2: string) => string)[] = [
  (t1, t2) => `Le train de nuit part à ${t1} et arrive le lendemain à ${t2}.`,
  (t1, t2) => `${N()} s’endort à ${t1} et se réveille le lendemain à ${t2}.`,
  (t1, t2) => `L’infirmière de nuit commence sa garde à ${t1} et la finit le lendemain à ${t2}.`,
  (t1, t2) => `Le boulanger commence à ${t1} et finit le lendemain à ${t2}.`,
  (t1, t2) => `L’avion décolle à ${t1} et atterrit le lendemain à ${t2} (même fuseau horaire).`,
  (t1, t2) => `Le bateau de pêche quitte le port à ${t1} et rentre le lendemain à ${t2}.`,
  (t1, t2) => `La panne de courant commence à ${t1} et finit le lendemain à ${t2}.`,
  (t1, t2) => `L’astronome observe les étoiles de ${t1} jusqu’au lendemain ${t2}.`,
  (t1, t2) => `Le pompier de garde est appelé à ${t1} et rentre à la caserne le lendemain à ${t2}.`,
  (t1, t2) => `La fête du village commence à ${t1} et s’arrête le lendemain à ${t2}.`,
  (t1, t2) => `Le car de la colonie part à ${t1} et arrive le lendemain à ${t2}.`,
];
const Q_NUIT = ["Combien de temps cela dure-t-il ?", "Quelle est la durée, en heures et minutes ?", "Combien de temps s’est écoulé ?"];
type Mobile = [string, "il" | "elle", number[]];
const MOBILES: Mobile[] = [
  ["Le TGV", "il", [240, 270, 300, 320]],
  ["Le train régional", "il", [80, 90, 120]],
  ["La voiture sur l’autoroute", "elle", [110, 120, 130]],
  ["Le car scolaire", "il", [60, 70, 80]],
  ["La cycliste", "elle", [15, 18, 20, 24]],
  ["Le randonneur", "il", [4, 5, 6]],
  ["La coureuse", "elle", [10, 12, 15]],
  ["Le bateau de pêche", "il", [20, 24, 30]],
  ["Le tracteur du fermier", "il", [20, 25, 30]],
  ["Le camion de livraison", "il", [60, 80, 90]],
  ["Le drone de la géomètre", "il", [36, 40, 48]],
  ["L’avion de ligne", "il", [800, 840, 900]],
  ["Le cheval au trot", "il", [12, 15]],
  ["La trottinette électrique", "elle", [18, 20, 24]],
  ["Le ferry", "il", [30, 36, 40]],
];
/** Une vitesse et une durée qui tombent juste : d = v × T ÷ 60 entier, T en minutes. */
const tirerTrajet = (): { mobile: Mobile; v: number; T: number; d: number } => {
  const mobile = un(MOBILES);
  const v = un(mobile[2]);
  const ok: number[] = [];
  for (let T = 20; T <= 200; T += 5) if ((v * T) % 60 === 0 && T % 60 !== 0) ok.push(T);
  const T = ok.length ? un(ok) : 60 * entre(2, 3);
  return { mobile, v, T, d: (v * T) / 60 };
};
const friseTrajet = (v: number, T: number): DureeCanvasData => {
  const ent = Math.floor(T / 60);
  const reste = T % 60;
  return frise("départ", "arrivée", [...nFois(ent, `${v} km`, 60), ...(reste ? ([[`${fr((v * reste) / 60)} km`, reste]] as [string, number][]) : [])]);
};

const dureeProblemeGabarits: TutorBankItemV4[] = [
  // ★3 — une attente à cheval sur l'heure.
  P(1, 3, HINT_PONT, () => {
    const h = entre(7, 18);
    const m1 = entre(32, 58);
    const m2 = entre(1, Math.min(30, m1 - 5));
    const d = 60 - m1 + m2;
    return {
      text: `${un(SITUATIONS_ATTENTE)(hh(h, m1), hh(h + 1, m2))} ${un(Q_ATTENTE)}`,
      ...qcm(`${d} min`, [`${100 - m1 + m2} min`, m1 - m2 !== d ? `${m1 - m2} min` : `${d + 10} min`, `${60 - m1} min`, dur(d + 60)]),
      explanation: etapes("on passe par l’heure pile.", `de ${hh(h, m1)} à ${hh(h + 1, 0)} : ${60 - m1} min ; puis ${m2} min. ${60 - m1} + ${m2} = ${d}.`, `il faut attendre ${d} min.`),
      canvas: deuxHorloges([h, m1, "Maintenant"], [h + 1, m2, "Prévu"]),
    };
  }),
  // ★3 — l'heure de fin, durée en h et min.
  P(2, 3, "Ajoute les heures, puis les minutes ; passe l’heure si les minutes dépassent 60.", () => {
    const h = entre(7, 16);
    const m1 = entre(15, 55);
    const k = entre(1, 2);
    const dm = pas5(Math.max(5, 61 - m1), 55);
    const d = 60 * k + dm;
    const fin = 60 * h + m1 + d;
    return {
      text: `${un(SITUATIONS_FIN)(hh(h, m1), dur(d))} ${un(Q_FIN_P)}`,
      ...qcm(hT(fin), [`${h + k} h ${m1 + dm}`, hT(fin - 60), hT(fin + 60), hT(60 * h + m1 + dm)]),
      explanation: etapes("on ajoute la durée : d’abord les heures, puis les minutes.", `${hh(h, m1)} + ${k} h = ${hh(h + k, m1)} ; ${m1} + ${dm} = ${m1 + dm} min = 1 h ${pad2(m1 + dm - 60)}.`, `c’est fini à ${hT(fin)}.`),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★3 — l'heure de début.
  P(3, 3, "On remonte le temps : enlève la durée à l’heure de fin, en passant par l’heure pile.", () => {
    const h = entre(9, 18);
    const m2 = entre(0, 35);
    const d = pas5(m2 + 5, 55);
    const fin = 60 * h + m2;
    const debut = fin - d;
    return {
      text: `${un(SITUATIONS_DEBUT)(hh(h, m2), `${d} min`)} ${un(Q_DEBUT)}`,
      ...qcm(hT(debut), [hT(fin + d), hh(h, d - m2), hh(h - 1, d - m2), hT(debut + 60)]),
      explanation: etapes("pour trouver le début, on enlève la durée à l’heure de fin.", `${hh(h, m2)} − ${m2} min = ${hh(h, 0)} ; puis − ${d - m2} min.`, `cela a commencé à ${hT(debut)}.`),
      canvas: Math.random() < 0.5 ? horloge(h, m2, "Fin") : frise("?", hh(h, m2), [[`${d} min`, d]]),
    };
  }),
  // ★3 — deux durées à additionner, en h et min.
  P(4, 3, HINT_60, () => {
    const a = pas5(25, 95);
    const b = pas5(Math.max(15, 65 - a), 95);
    const S = a + b;
    const faux = [S >= 100 ? (S % 100 === 0 ? `${S / 100} h` : `${Math.floor(S / 100)} h ${S % 100} min`) : dur(S - 10), dur(S + 10), dur(S + 60), dur(S - 60)];
    return {
      text: `${un(SITUATIONS_DEUX_DUREES)(a, b)} ${un(Q_TOTAL_HMIN)}`,
      ...qcm(dur(S), faux),
      explanation: etapes("on additionne les deux durées, puis on convertit : 60 min = 1 h.", `${a} + ${b} = ${S} min = ${Math.floor(S / 60)} × 60 min + ${S % 60} min.`, `en tout : ${dur(S)}.`),
      canvas: frise("début", "fin", [[`${a} min`, a], [`${b} min`, b]]),
    };
  }),
  // ★3 — une durée écrite avec une virgule (heures décimales).
  P(5, 3, "Convertis d’abord la durée : 0,25 h = 15 min, 0,5 h = 30 min, 0,75 h = 45 min.", () => {
    const x = un([0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2.25, 2.5]);
    const d = 60 * x;
    const h = entre(7, 16);
    const m1 = pas5(0, 55);
    const s = 60 * h + m1;
    const ent = Math.floor(x);
    return {
      text: `${un(SITUATIONS_DECIMALES)(hh(h, m1), `${fr(x)} h`)} ${un(Q_FIN_P)}`,
      ...qcm(hT(s + d), [hT(s + luEnMinutes(x)), hT(s + 60 * ent), hT(s + d + 60)]),
      explanation: etapes("on convertit la durée en heures et minutes, puis on l’ajoute.", `${fr(x)} h = ${dur(d)} (${fr(x - ent)} h = ${fr(x - ent)} × 60 min = ${60 * (x - ent)} min).`, `c’est fini à ${hT(s + d)}.`),
      canvas: frise(hh(h, m1), "?", [...nFois(ent, "1 h", 60), [`${fr(x - ent)} h`, 60 * (x - ent)]]),
    };
  }),
  // ★4 — trois étapes, heure de fin.
  P(6, 4, "Additionne les trois durées, puis ajoute le total à l’heure de départ.", () => {
    const h = entre(7, 14);
    const m1 = pas5(0, 55);
    const a = 60 + pas5(5, 50);
    const b = pas5(10, 30);
    const c = pas5(10, 45);
    const s = 60 * h + m1;
    const fin = s + a + b + c;
    const mins = m1 + (a - 60) + b + c;
    return {
      text: `${un(SITUATIONS_TROIS_ETAPES)(hh(h, m1), dur(a), `${b} min`, `${c} min`)} ${un(Q_TOUT_FINI)}`,
      ...qcm(hT(fin), [hT(s + a + b), hT(fin - 60), mins >= 60 && mins < 100 ? `${h + 1} h ${mins}` : hT(fin + 60), hT(fin - b)]),
      explanation: etapes("on additionne les durées, puis on les ajoute à l’heure de départ.", `${dur(a)} + ${b} min + ${c} min = ${dur(a + b + c)} ; ${hh(h, m1)} + ${dur(a + b + c)}.`, `tout est terminé à ${hT(fin)}.`),
      canvas: frise(hh(h, m1), "?", [[dur(a), a], [`${b} min`, b, "#94a3b8"], [`${c} min`, c]]),
    };
  }),
  // ★4 — séances et pauses.
  P(7, 4, "Compte bien les pauses : entre 3 séances, il n’y a que 2 pauses.", () => {
    const n = entre(3, 4);
    const sd = pas5(15, 45);
    const p = pas5(5, 15);
    const h = entre(8, 14);
    const m1 = pas5(0, 55);
    const s0 = 60 * h + m1;
    const tot = n * sd + (n - 1) * p;
    const fin = s0 + tot;
    const etapesFrise: [string, number, string?][] = [];
    for (let k = 0; k < n; k++) {
      etapesFrise.push([`${sd} min`, sd]);
      if (k < n - 1) etapesFrise.push(["", p, "#94a3b8"]);
    }
    return {
      text: `${un(SERIES)(n, sd)}, avec une pause de ${p} min entre deux. Cela commence à ${hh(h, m1)}. ${un(Q_TOUT_FINI)}`,
      ...qcm(hT(fin), [hT(s0 + n * sd + n * p), hT(s0 + n * sd), hT(fin + 60), hT(fin - 60)]),
      explanation: etapes(`${n} séances, donc ${n - 1} pauses.`, `${n} × ${sd} + ${n - 1} × ${p} = ${tot} min = ${dur(tot)}.`, `tout est fini à ${hT(fin)}.`),
      canvas: frise(hh(h, m1), "?", etapesFrise),
    };
  }),
  // ★4 — une durée de nuit, en passant par minuit.
  P(8, 4, "Passe par minuit : compte jusqu’à 24 h, puis ajoute les heures du lendemain matin.", () => {
    const h1 = entre(18, 23);
    const m1 = pas5(0, 55);
    const h2 = entre(4, 9);
    const m2 = pas5(0, 55);
    const s = 60 * h1 + m1;
    const e = 60 * h2 + m2;
    const T = 1440 - s + e;
    return {
      text: `${un(SITUATIONS_NUIT)(hh(h1, m1), hh(h2, m2))} ${un(Q_NUIT)}`,
      ...qcm(dur(T), [dur(s - e), dur(1440 - s), dur(T + 60), dur(T - 60)]),
      explanation: etapes("on passe par minuit (24 h, qui est aussi 0 h).", `de ${hh(h1, m1)} à 24 h : ${dur(1440 - s)} ; de 0 h à ${hh(h2, m2)} : ${dur(e)}.`, `cela dure ${dur(T)}.`),
      canvas: frise(hh(h1, m1), hh(h2, m2), [["avant 0 h", 1440 - s], ["après 0 h", e]]),
    };
  }),
  // ★4 — vitesse simple : combien de temps, ou quelle distance.
  P(9, 4, "À la même vitesse, la distance est proportionnelle à la durée : en 30 min, on fait la moitié du trajet d’une heure.", () => {
    const { mobile, v, T, d } = tirerTrajet();
    const [nom, pron] = mobile;
    const ent = Math.floor(T / 60);
    const reste = T % 60;
    const intro = `${nom} roule toujours à la même vitesse : ${v} km en 1 h.`.replace("roule", nom.includes("randonneur") || nom.includes("coureuse") || nom.includes("cheval") ? "avance" : "roule");
    if (Math.random() < 0.5) {
      return {
        text: `${intro} ${un([`Combien de temps met-${pron} pour parcourir ${fr(d)} km ?`, `Quelle est la durée d’un trajet de ${fr(d)} km ?`, `En combien de temps parcourt-${pron} ${fr(d)} km ?`])}`,
        ...qcm(dur(T), [dur(luEnMinutes(T / 60)), dur(T + 60), dur(T + 15), T > 30 ? dur(T - 15) : dur(T + 30)]),
        explanation: etapes(
          `en 1 h, ${pron} parcourt ${v} km ; en 60 min, ${v} km.`,
          `${ent > 0 ? `en ${ent} h : ${ent} × ${v} = ${v * ent} km ; il reste ${fr((v * reste) / 60)} km` : `${fr(d)} km, c’est une partie des ${v} km d’une heure`}, parcourus en ${reste} min.`,
          `il faut ${dur(T)}.`,
        ),
        canvas: friseTrajet(v, T),
      };
    }
    return {
      text: `${intro} ${un([`Quelle distance parcourt-${pron} en ${dur(T)} ?`, `Combien de kilomètres fait-${pron} en ${dur(T)} ?`, `Quelle distance couvre-t-${pron} en ${dur(T)} ?`])}`,
      ...qcm(`${fr(d)} km`, [`${fr(v * (ent + reste / 100))} km`, `${fr(ent > 0 ? v * ent : v)} km`, `${fr(d + v)} km`, `${fr(v * ent + reste)} km`]),
      explanation: etapes(`en 1 h (60 min), ${pron} parcourt ${v} km.`, `${ent > 0 ? `en ${ent} h : ${ent} × ${v} = ${v * ent} km ; ` : ""}en ${reste} min : ${v} × ${reste} ÷ 60 = ${fr((v * reste) / 60)} km.`, `en ${dur(T)}, ${pron} parcourt ${fr(d)} km.`),
      canvas: friseTrajet(v, T),
    };
  }),
];

/* ───────────── duree_defi ───────────── */

const DF = atelier("duree_defi");
const ACTIONS_COMPARER = [
  "pour finir le puzzle", "pour faire le trajet jusqu’à la plage", "pour fabriquer un cerf-volant", "pour terminer la course d’orientation",
  "pour réparer un vélo", "pour préparer un gâteau", "pour nettoyer l’aquarium", "pour lire un roman", "pour ranger le grenier",
  "pour monter la tente", "pour peindre la maquette", "pour finir le marathon de lecture", "pour tricoter une écharpe", "pour construire la cabane",
];
const SITUATIONS_ECRITURE: ((e: string) => string)[] = [
  (e) => `${N()} écrit dans son cahier : « ${e} ».`,
  (e) => `Sur la feuille de match, l’arbitre a noté « ${e} ».`,
  (e) => `Le chronométreur du club écrit « ${e} ».`,
  (e) => `Dans le carnet du maçon, on lit « ${e} ».`,
  (e) => `Au tableau, ${N()} donne sa réponse : « ${e} ».`,
  (e) => `La pilote note dans son carnet de vol « ${e} ».`,
  (e) => `La recette de la cuisinière indique « ${e} ».`,
  (e) => `Sur son affiche, le cinéma annonce « ${e} ».`,
];
const SITUATIONS_DEPART: ((t: string, d: string) => string)[] = [
  (t, d) => `Le film se termine à ${t}. Il dure ${d}.`,
  (t, d) => `${N()} arrive chez sa grand-mère à ${t}, après ${d} de route.`,
  (t, d) => `La randonnée se termine à ${t} ; elle a duré ${d}.`,
  (t, d) => `L’avion atterrit à ${t}, après ${d} de vol.`,
  (t, d) => `Le tournoi de ping-pong finit à ${t} ; il a duré ${d}.`,
  (t, d) => `La chirurgienne termine l’opération à ${t}, après ${d}.`,
  (t, d) => `Le concert finit à ${t}. Il a duré ${d}.`,
  (t, d) => `Le ferry accoste à ${t}, après une traversée de ${d}.`,
  (t, d) => `La classe rentre de la sortie au château à ${t} ; la sortie a duré ${d}.`,
  (t, d) => `Le maçon finit le muret à ${t} ; il y a travaillé ${d}.`,
  (t, d) => `Le gâteau de la pâtissière a cuit ${d} et sort du four à ${t}.`,
  (t, d) => `Le marathon ${deN()} se termine à ${t} ; il a couru ${d}.`,
];
const LIEUX_ARRIVEE = ["à la piscine", "au stade", "chez leur grand-mère", "au cinéma", "à la plage", "au marché", "à la bibliothèque", "au parc", "à l’école de musique", "au club de judo", "à la ferme pédagogique", "au zoo"];
const MOYENS = ["à vélo", "à pied", "en trottinette", "en rollers", "en bus", "en voiture"];
const VOYAGES: ((j1: string, t1: string, j2: string, t2: string) => string)[] = [
  (j1, t1, j2, t2) => `Le bateau quitte le port le ${j1} à ${t1} et arrive le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `La course de voile part le ${j1} à ${t1} ; le premier voilier arrive le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `Le camping-car de la famille ${deN()} part le ${j1} à ${t1} et arrive le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `La tempête commence le ${j1} à ${t1} et se calme le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `Le camionneur part le ${j1} à ${t1} et livre sa cargaison le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `Le tournoi d’échecs commence le ${j1} à ${t1} et finit le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `La panne d’internet de l’école commence le ${j1} à ${t1} et se termine le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `Le train transsibérien part le ${j1} à ${t1} et s’arrête en gare le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `Le séjour à la ferme commence le ${j1} à ${t1} et finit le ${j2} à ${t2}.`,
  (j1, t1, j2, t2) => `La cigogne baguée quitte son nid le ${j1} à ${t1} et se pose le ${j2} à ${t2}.`,
];
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const RELAIS: ((n: number, x: string) => string)[] = [
  (n, x) => `Au relais, ${n} coureurs courent chacun ${x}.`,
  (n, x) => `La playlist contient ${n} chansons de ${x} chacune.`,
  (n, x) => `${n} nageurs nagent chacun leur longueur en ${x}.`,
  (n, x) => `Le dessin animé est fait de ${n} épisodes de ${x}.`,
  (n, x) => `La pompière fait ${n} montées à l’échelle de ${x} chacune.`,
  (n, x) => `Le jongleur fait ${n} numéros de ${x}.`,
  (n, x) => `${n} cuissons de crêpes durent ${x} chacune.`,
  (n, x) => `L’entraîneuse fait faire ${n} séries de gainage de ${x}.`,
  (n, x) => `Au concours de plongée, ${n} plongeuses restent chacune ${x} sous l’eau.`,
  (n, x) => `Le DJ passe ${n} morceaux de ${x}.`,
];
const DATES_DEUX: ((y1: number, y2: number) => string)[] = [
  (y1, y2) => `Le château a été construit en ${y1} et restauré en ${y2}.`,
  (y1, y2) => `Le pont date de ${y1} ; il a été élargi en ${y2}.`,
  (y1, y2) => `Ce chêne a été planté en ${y1} ; il a été abattu par une tempête en ${y2}.`,
  (y1, y2) => `L’abbaye a été fondée en ${y1} et transformée en musée en ${y2}.`,
  (y1, y2) => `Le moulin a tourné de ${y1} à ${y2}.`,
  (y1, y2) => `Le phare a été bâti en ${y1} et automatisé en ${y2}.`,
  (y1, y2) => `La cathédrale a été commencée en ${y1} et terminée en ${y2}.`,
  (y1, y2) => `L’horloge de la mairie a été posée en ${y1} et réparée en ${y2}.`,
  (y1, y2) => `La ville a été fondée en ${y1} ; sa gare a ouvert en ${y2}.`,
  (y1, y2) => `Cette famille de vignerons cultive la vigne de ${y1} à ${y2} sans s’arrêter.`,
];
const FRACTIONS_DECIMALES: ((x: string, m: number) => string)[] = [
  (x, m) => `La séance de sport commence par ${x} de course, puis ${m} min d’étirements.`,
  (x, m) => `Le gâteau cuit ${x}, puis refroidit ${m} min.`,
  (x, m) => `${N()} joue du violon pendant ${x}, puis fait ${m} min de solfège.`,
  (x, m) => `Le jardinier arrose pendant ${x}, puis désherbe pendant ${m} min.`,
  (x, m) => `La classe marche ${x} jusqu’au lac, puis ${m} min autour du lac.`,
  (x, m) => `Le plombier travaille ${x} dans la cuisine, puis ${m} min dans la salle de bains.`,
  (x, m) => `La pâte repose ${x}, puis la pizza cuit ${m} min.`,
  (x, m) => `Le car roule ${x} jusqu’à la ferme, puis ${m} min jusqu’au château.`,
  (x, m) => `La bibliothécaire lit une histoire pendant ${x}, puis les enfants dessinent ${m} min.`,
  (x, m) => `Le pêcheur attend ${x} sans rien attraper, puis pêche encore ${m} min.`,
];
const CRENEAUX: ((t1: string, t2: string, s: number) => [string, string])[] = [
  (t1, t2, s) => [`Le gymnase est réservé de ${t1} à ${t2}. Chaque match dure ${s} min, sans pause.`, "matchs"],
  (t1, t2, s) => [`La salle de cinéma est libre de ${t1} à ${t2}. Chaque court-métrage dure ${s} min.`, "courts-métrages"],
  (t1, t2, s) => [`Le four du boulanger est libre de ${t1} à ${t2}. Une fournée cuit ${s} min.`, "fournées"],
  (t1, t2, s) => [`La piscine est ouverte au club de ${t1} à ${t2}. Une séance dure ${s} min.`, "séances"],
  (t1, t2, s) => [`La professeure de piano est libre de ${t1} à ${t2}. Un cours dure ${s} min.`, "cours"],
  (t1, t2, s) => [`Le petit train de la fête tourne de ${t1} à ${t2}. Un tour dure ${s} min.`, "tours"],
  (t1, t2, s) => [`La vétérinaire consulte de ${t1} à ${t2}. Chaque consultation dure ${s} min.`, "consultations"],
  (t1, t2, s) => [`Le terrain de tennis est réservé de ${t1} à ${t2}. Chaque partie dure ${s} min.`, "parties"],
  (t1, t2, s) => [`La guide fait des visites de ${t1} à ${t2}. Une visite dure ${s} min.`, "visites"],
  (t1, t2, s) => [`La machine de la laverie est libre de ${t1} à ${t2}. Un lavage dure ${s} min.`, "lavages"],
];

const dureeDefiGabarits: TutorBankItemV4[] = [
  // ★4 — comparer trois durées écrites de trois façons.
  DF(1, 4, "Écris les trois durées dans la même unité : 1 h = 60 min, 0,5 h = 30 min, 0,25 h = 15 min.", () => {
    const [A, B, Cn] = troisPrenoms();
    const a = un([45, 75, 90, 105, 135, 150]);
    const deltas = melangeEnPlace([-25, -20, -15, -10, -5, 5, 10, 15, 20, 25].filter((x) => a + x >= 65));
    const b = a + deltas[0];
    const c = a + deltas[1];
    const plus = Math.random() < 0.5;
    const vals: [string, number][] = [[A, a], [B, b], [Cn, c]];
    vals.sort((x, y) => x[1] - y[1]);
    const juste = plus ? vals[2][0] : vals[0][0];
    return {
      text: `${cap(un(ACTIONS_COMPARER))}, ${A} met ${fr(a / 60)} h, ${B} met ${dur(b)} et ${Cn} met ${c} min. ${plus ? un(["Qui a mis le plus de temps ?", "Qui a été le plus long ?"]) : un(["Qui a mis le moins de temps ?", "Qui a été le plus rapide ?"])}`,
      ...qcm(juste, [A, B, Cn]),
      explanation: etapes("on écrit les trois durées en minutes.", `${fr(a / 60)} h = ${a} min ; ${dur(b)} = ${b} min ; ${c} min.`, `la réponse est ${juste}.`),
    };
  }),
  // ★4 — corriger une écriture fausse.
  DF(2, 4, "Une écriture correcte a moins de 60 min (ou moins de 60 s), et 1 h 30 min = 1,5 h (pas 1,3 h).", () => {
    if (Math.random() < 0.35) {
      const ent = entre(1, 3);
      const m = un([15, 30, 45]);
      const x = ent + m / 60;
      const e = `${dur(60 * ent + m)} = ${fr(ent + m / 100)} h`;
      return {
        text: `${un(SITUATIONS_ECRITURE)(e)} ${un(["Quelle est la bonne écriture en heures ?", "Corrige cette écriture.", "Que faut-il écrire à la place ?"])}`,
        ...qcm(`${fr(x)} h`, [`${fr(ent + m / 100)} h`, `${fr(ent + m / 1000)} h`, `${fr(ent + (m === 30 ? 0.25 : 0.5))} h`]),
        explanation: etapes("les minutes ne s’écrivent pas après la virgule : on prend la fraction d’heure.", `${m} min = ${m} ÷ 60 h = ${fr(m / 60)} h.`, `${dur(60 * ent + m)} = ${fr(x)} h.`),
      };
    }
    const enHeures = Math.random() < 0.5;
    const [u1, u2] = enHeures ? ["h", "min"] : ["min", "s"];
    const h = enHeures ? entre(1, 3) : entre(1, 6);
    let M = entre(62, 118);
    if (M === 100) M = 95;
    const e = `${h} ${u1} ${M} ${u2}`;
    return {
      text: `${un(SITUATIONS_ECRITURE)(e)} ${un(["Comment écrire correctement cette durée ?", "Quelle est la bonne écriture de cette durée ?", "Corrige cette écriture."])}`,
      ...qcm(`${h + 1} ${u1} ${M - 60} ${u2}`, [`${h} ${u1} ${M - 60} ${u2}`, M > 100 ? `${h + 1} ${u1} ${M - 100} ${u2}` : `${h + 2} ${u1} ${M - 60} ${u2}`, `${h + 1} ${u1} ${M - 40} ${u2}`]),
      explanation: etapes(`${M} ${u2}, c’est plus de 60 ${u2}.`, `${M} ${u2} = 60 ${u2} + ${M - 60} ${u2} = 1 ${u1} ${M - 60} ${u2}.`, `${e} = ${h + 1} ${u1} ${M - 60} ${u2}.`),
    };
  }),
  // ★4 — retrouver l'heure de départ en remontant une durée en h et min.
  DF(3, 4, "Enlève d’abord les heures, puis les minutes en passant par l’heure pile.", () => {
    const h2 = entre(11, 20);
    const m2 = entre(0, 30);
    const k = entre(1, 3);
    const dm = entre(m2 + 5, 58);
    const fin = 60 * h2 + m2;
    const d = 60 * k + dm;
    const debut = fin - d;
    return {
      text: `${un(SITUATIONS_DEPART)(hh(h2, m2), dur(d))} ${un(Q_DEBUT)}`,
      ...qcm(hT(debut), [hT(fin + d), `${h2 - k - 1} h ${100 + m2 - dm}`, hh(h2 - k, 60 + m2 - dm), hh(h2 - k, dm - m2)]),
      explanation: etapes(
        "on remonte le temps : d’abord les heures, puis les minutes.",
        m2 === 0 ? `${hh(h2, 0)} − ${k} h = ${hh(h2 - k, 0)} ; puis ${hh(h2 - k, 0)} − ${dm} min = ${hT(debut)}.` : `${hh(h2, m2)} − ${k} h = ${hh(h2 - k, m2)} ; puis − ${dm} min : ${m2} min pour revenir à ${hh(h2 - k, 0)}, puis encore ${dm - m2} min.`,
        `le début était à ${hT(debut)}.`,
      ),
      canvas: horloge(h2, m2, "Fin"),
    };
  }),
  // ★4 — qui arrive le premier ?
  DF(4, 4, "Calcule l’heure d’arrivée de chacun, puis compare.", () => {
    const [A, B] = deuxPrenoms();
    const h = entre(8, 16);
    const m1 = entre(0, 40);
    const t1 = 60 * h + m1;
    const t2 = t1 + entre(5, 25);
    const d1 = entre(t2 - t1 + 20, 95);
    const fin1 = t1 + d1;
    const cas = Math.random();
    const ecart = fin1 - t2;
    const d2 = cas < 0.2 ? ecart : cas < 0.6 ? ecart - entre(3, Math.max(3, ecart - 5)) : ecart + entre(3, 20);
    const fin2 = t2 + d2;
    const juste = fin1 === fin2 ? "Les deux en même temps" : fin1 < fin2 ? A : B;
    const [moyen1, moyen2] = melangeEnPlace([...MOYENS]);
    return {
      text: `${A} part ${moyen1} à ${hT(t1)} et met ${dur(d1)} pour aller ${un(LIEUX_ARRIVEE)}. ${B} part ${moyen2} à ${hT(t2)} et met ${dur(d2)}. ${un(["Qui arrive le premier ?", "Lequel des deux arrive en premier ?", "Qui est là le premier ?"])}`,
      ...qcm(juste, [A, B, "Les deux en même temps"]),
      explanation: etapes("on calcule chaque heure d’arrivée.", `${A} : ${hT(t1)} + ${dur(d1)} = ${hT(fin1)}. ${B} : ${hT(t2)} + ${dur(d2)} = ${hT(fin2)}.`, juste === "Les deux en même temps" ? "ils arrivent en même temps." : `${juste} arrive le premier.`),
      canvas: deuxHorloges([h, m1, A], [Math.floor(t2 / 60), t2 % 60, B]),
    };
  }),
  // ★4 — heure décimale plus des minutes.
  DF(5, 4, "Convertis d’abord la durée à virgule en minutes : 0,75 h = 45 min (et pas 75 min).", () => {
    const x = un([0.25, 0.5, 0.75, 1.25, 1.5, 1.75, 2.25]);
    const m = pas5(10, 55);
    const ent = Math.floor(x);
    const total = 60 * x + m;
    return {
      text: `${un(FRACTIONS_DECIMALES)(`${fr(x)} h`, m)} ${un(["Combien de temps cela dure-t-il en tout ?", "Quelle est la durée totale ?", "Combien de temps cela fait-il au total ?"])}`,
      ...qcm(dur(total), [dur(luEnMinutes(x) + m), dur(60 * ent + m), dur(total + 60), dur(total + 10)]),
      explanation: etapes("on convertit la durée à virgule en minutes, puis on additionne.", `${fr(x)} h = ${dur(60 * x)} ; ${dur(60 * x)} + ${m} min = ${dur(total)}.`, `en tout : ${dur(total)}.`),
      canvas: frise("début", "fin", [[`${fr(x)} h`, 60 * x], [`${m} min`, m]]),
    };
  }),
  // ★5 — sur plusieurs jours, en heures et minutes.
  DF(6, 5, "Compte les jours entiers (24 h chacun), puis ajuste avec les heures et les minutes.", () => {
    const k = entre(1, 2);
    const i = entre(0, 6 - k);
    const s = 60 * entre(13, 22) + pas5(5, 55);
    const e = 60 * entre(5, 12) + pas5(0, 50);
    const T = 1440 * k + e - s;
    const [h1, m1, h2, m2] = [Math.floor(s / 60), s % 60, Math.floor(e / 60), e % 60];
    const sansEmprunt = m2 < m1 ? `${24 * k + h2 - h1} h ${m1 - m2} min` : dur(T + 60);
    return {
      text: `${un(VOYAGES)(JOURS[i], hh(h1, m1), JOURS[i + k], hh(h2, m2))} ${un(["Combien de temps cela dure-t-il, en heures et minutes ?", "Quelle est la durée, en h et min ?", "Combien d’heures et de minutes se sont écoulées ?"])}`,
      ...qcm(dur(T), [k === 2 ? dur(T - 1440) : dur(s - e), dur(T + 1440), sansEmprunt, dur(T - 60)]),
      explanation: etapes(
        "on va jusqu’à minuit, on compte les jours entiers, puis on ajoute le matin.",
        `${JOURS[i]} de ${hh(h1, m1)} à 24 h : ${dur(1440 - s)}${k === 2 ? ` ; tout le ${JOURS[i + 1]} : 24 h` : ""} ; le ${JOURS[i + k]} de 0 h à ${hh(h2, m2)} : ${dur(e)}.`,
        `cela dure ${dur(T)}.`,
      ),
      canvas: frise(`${JOURS[i]} ${hh(h1, m1)}`, `${JOURS[i + k]} ${hh(h2, m2)}`, [["avant 0 h", 1440 - s], ...(k === 2 ? ([["24 h", 1440, "#94a3b8"]] as [string, number, string][]) : []), ["après 0 h", e]]),
    };
  }),
  // ★5 — vitesse et heure d'arrivée.
  DF(7, 5, "Calcule d’abord la durée du trajet avec la vitesse, puis ajoute-la à l’heure de départ.", () => {
    const { mobile, v, T, d } = tirerTrajet();
    const [nom, pron] = mobile;
    const h = entre(6, 15);
    const m1 = pas5(0, 55);
    const s = 60 * h + m1;
    return {
      text: `${nom} part à ${hh(h, m1)}. ${cap(pron)} parcourt ${v} km en 1 h, toujours à la même vitesse, et doit faire ${fr(d)} km. ${un(["À quelle heure arrive-t-" + pron + " ?", "Quelle est son heure d’arrivée ?", "À quelle heure le trajet se termine-t-il ?"])}`,
      ...qcm(hT(s + T), [hT(s + luEnMinutes(T / 60)), hT(s + T + 60), hT(s + 60 * Math.floor(T / 60)), hT(s + T - 15)]),
      explanation: etapes(`en 1 h, ${pron} parcourt ${v} km.`, `${fr(d)} km prennent ${dur(T)} ; ${hh(h, m1)} + ${dur(T)}.`, `arrivée à ${hT(s + T)}.`),
      canvas: friseTrajet(v, T),
    };
  }),
  // ★5 — une série de durées en min et s.
  DF(8, 5, "Multiplie les minutes et les secondes, puis transforme 60 s en 1 min.", () => {
    const n = entre(3, 5);
    const m = entre(1, 3);
    const s = pas5(20, 55);
    const total = n * (60 * m + s);
    const sansRetenue = ms(n * m, (n * s) % 60);
    return {
      text: `${un(RELAIS)(n, `${m} min ${s} s`)} ${un(["Combien de temps cela dure-t-il en tout ?", "Quelle est la durée totale ?", "Combien de temps au total ?"])}`,
      ...qcm(durS(total), [sansRetenue, durS(total + 60), durS(total - 60), `${n * m} min`]),
      explanation: etapes("on multiplie les minutes et les secondes, puis on convertit.", `${n} × ${m} = ${n * m} min ; ${n} × ${s} = ${n * s} s = ${durS(n * s)}.`, `en tout : ${durS(total)}.`),
      canvas: frise("début", "fin", nFois(n, `${m} min ${s} s`, 60 * m + s)),
    };
  }),
  // ★5 — années et siècles entre deux dates.
  DF(9, 5, "Pour trouver le temps écoulé entre deux années, on soustrait : la plus récente moins la plus ancienne.", () => {
    const y1 = entre(1050, 1750);
    const d = entre(210, 2025 - y1 > 260 ? Math.min(760, 2025 - y1) : 260);
    const y2 = y1 + d;
    if (Math.random() < 0.5) {
      return {
        text: `${un(DATES_DEUX)(y1, y2)} ${un(["Combien d’années se sont écoulées entre ces deux dates ?", "Combien d’années séparent ces deux dates ?", "Quelle durée sépare ces deux dates, en années ?"])}`,
        ...qcm(`${d} ans`, [`${d + 100} ans`, `${d - 100} ans`, `${d + 10} ans`, `${d + 1} ans`]),
        explanation: etapes("on soustrait la date la plus ancienne de la plus récente.", `${y2} − ${y1} = ${d}.`, `${d} ans se sont écoulés.`),
        canvas: frise(String(y1), String(y2), [["?", 1]]),
      };
    }
    const c = Math.floor(d / 100);
    return {
      text: `${un(DATES_DEUX)(y1, y2)} ${un(["Combien de siècles complets se sont écoulés entre ces deux dates ?", "Combien de siècles entiers séparent ces deux dates ?"])}`,
      ...qcm(`${c} siècles`, [`${c + 1} siècles`, `${d} siècles`, `${Math.floor(d / 10)} siècles`]),
      explanation: etapes("on calcule le nombre d’années, puis on compte les centaines : 1 siècle = 100 ans.", `${y2} − ${y1} = ${d} ans = ${c} × 100 ans + ${d % 100} ans.`, `${c} siècles complets.`),
      canvas: frise(String(y1), String(y2), [["?", 1]]),
    };
  }),
  // ★5 — combien de séances tiennent dans un créneau ?
  DF(10, 5, "Calcule d’abord la durée du créneau en minutes, puis cherche combien de fois la séance y tient.", () => {
    let k = 0;
    let W = 0;
    let L = 0;
    for (let essai = 0; essai < 40; essai++) {
      L = un([25, 30, 35, 40, 45, 50]);
      W = pas5(150, 300);
      k = Math.floor(W / L);
      if (W % L !== 0 && k >= 3) break;
    }
    const h1 = entre(8, 14);
    const m1 = pas5(0, 55);
    const s = 60 * h1 + m1;
    const e = s + W;
    const [h2, m2] = [Math.floor(e / 60), e % 60];
    const cent = 100 * (h2 - h1) + m2 - m1;
    const k100 = Math.floor(cent / L);
    const [phrase, nom] = un(CRENEAUX)(hh(h1, m1), hh(h2, m2), L);
    return {
      text: `${phrase} ${un(["Combien peut-on en faire en entier ?", "Combien en tient-il en entier dans ce créneau ?", "Combien peut-on en faire, sans en couper un seul ?"])}`,
      ...qcm(`${k} ${nom}`, [`${k + 1} ${nom}`, `${k - 1} ${nom}`, k100 !== k && k100 !== k + 1 && k100 !== k - 1 ? `${k100} ${nom}` : `${k + 2} ${nom}`]),
      explanation: etapes("on calcule la durée du créneau, puis on compte les séances complètes.", `de ${hh(h1, m1)} à ${hh(h2, m2)} : ${dur(W)} = ${W} min ; ${k} × ${L} = ${k * L} min, et ${(k + 1) * L} min dépasserait.`, `on peut en faire ${k} en entier.`),
      canvas: deuxHorloges([h1, m1, "Début"], [h2, m2, "Fin"]),
    };
  }),
];

const GABARITS_DUREE_CM2: TutorBankItemV4[] = [
  ...dureeLireGabarits,
  ...dureeConvertirGabarits,
  ...dureeCalculerGabarits,
  ...dureeProblemeGabarits,
  ...dureeDefiGabarits,
];

export const dureesBank: TutorBankItemV4[] = [
  // ============================================================
  // DUREE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_1_heure_pleine",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["3 h 00", "12 h 15", "6 h 00", "3 h 30"],
    expected: ["3 h 00"],
    comparator: "mcq_exact",
    hint: "La grande aiguille est sur 12 : il est pile une heure.",
    explanation: exp(
      "Lire une heure, c’est repérer la petite aiguille des heures et la grande aiguille des minutes.",
      "On regarde d’abord la grande aiguille, puis la petite aiguille.",
      "La grande aiguille est sur 12 : cela fait 00 minute. La petite aiguille indique 3.",
      "L’horloge indique 3 h 00."
    ),
    tags: ["cm2", "duree", "lire", "horloge", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Montre colorée",
      time: { hour: 3, minute: 0, label: "Quelle heure ?" },
      colors: watchColors(0),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_2_demie",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["4 h 30", "4 h 00", "5 h 30", "6 h 20"],
    expected: ["4 h 30"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 6 indique 30 minutes.",
    explanation: exp(
      "Une demi-heure correspond à 30 minutes.",
      "Sur une horloge, la grande aiguille sur le 6 indique 30 minutes.",
      "La petite aiguille est entre 4 et 5, donc il est 4 h 30.",
      "L’heure indiquée est 4 h 30."
    ),
    tags: ["cm2", "duree", "lire", "demi_heure", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Lecture de l’heure",
      time: { hour: 4, minute: 30, label: "Demi-heure" },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_3_quart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["7 h 15", "7 h 03", "3 h 35", "7 h 45"],
    expected: ["7 h 15"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 3 indique 15 minutes.",
    explanation: exp(
      "Un quart d’heure correspond à 15 minutes.",
      "On lit les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 3, donc 15 minutes. La petite aiguille est après 7.",
      "L’heure indiquée est 7 h 15."
    ),
    tags: ["cm2", "duree", "lire", "quart_heure", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Quart d’heure",
      time: { hour: 7, minute: 15, label: "1 quart d’heure" },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_lire_fixed_4_moins_quart",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["8 h 45", "9 h 45", "8 h 15", "9 h 15"],
    expected: ["8 h 45"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 9 indique 45 minutes.",
    explanation: exp(
      "Trois quarts d’heure correspondent à 45 minutes.",
      "On lit les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 9 : cela fait 45 minutes. La petite aiguille approche de 9, donc il est 8 h 45.",
      "L’heure indiquée est 8 h 45."
    ),
    tags: ["cm2", "duree", "lire", "45_minutes", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Montre colorée",
      time: { hour: 8, minute: 45, label: "Presque 9 h" },
      colors: watchColors(0),
    }),
  },

  // ============================================================
  // DUREE_CONVERTIR (unités ajoutées dans les choix, 14/11/2026)
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_1_heure_minutes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de minutes dans 1 heure ?",
    format: "qcm",
    choices: ["60 min", "100 min", "30 min", "24 min"],
    expected: ["60 min"],
    comparator: "mcq_exact",
    hint: "1 heure = 60 minutes.",
    explanation: exp(
      "Une heure contient 60 minutes.",
      "Pour convertir des heures en minutes, on multiplie par 60.",
      "1 h = 60 min.",
      "Il y a 60 minutes dans 1 heure."
    ),
    tags: ["cm2", "duree", "convertir", "heure_minute", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_2_deux_heures",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien font 2 heures en minutes ?",
    format: "qcm",
    choices: ["120 min", "200 min", "20 min", "60 min"],
    expected: ["120 min"],
    comparator: "mcq_exact",
    hint: "1 h = 60 min, donc 2 h = 2 × 60 min.",
    explanation: exp(
      "Une heure contient 60 minutes.",
      "On multiplie le nombre d’heures par 60.",
      "2 × 60 = 120.",
      "2 heures font 120 minutes."
    ),
    tags: ["cm2", "duree", "convertir", "heures_minutes", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_3_90min",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "90 minutes correspondent à...",
    format: "qcm",
    choices: ["1 h 30 min", "1 h 90 min", "2 h 30 min", "90 h"],
    expected: ["1 h 30 min"],
    comparator: "mcq_exact",
    hint: "60 min = 1 h. Il reste 30 min.",
    explanation: exp(
      "Pour convertir des minutes en heures et minutes, on cherche combien de fois il y a 60 minutes.",
      "On retire 60 minutes pour faire une heure complète.",
      "90 min = 60 min + 30 min = 1 h 30 min.",
      "90 minutes correspondent à 1 h 30 min."
    ),
    tags: ["cm2", "duree", "convertir", "90min", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_convertir_fixed_4_secondes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 3 minutes en secondes ?",
    format: "qcm",
    choices: ["180 s", "300 s", "30 s", "120 s"],
    expected: ["180 s"],
    comparator: "mcq_exact",
    hint: "1 minute = 60 secondes.",
    explanation: exp(
      "Une minute contient 60 secondes.",
      "Pour convertir des minutes en secondes, on multiplie par 60.",
      "3 × 60 = 180.",
      "3 minutes font 180 secondes."
    ),
    tags: ["cm2", "duree", "convertir", "minutes_secondes", "qcm"],
  },

  // ============================================================
  // DUREE_CALCULER
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_calculer_fixed_1_simple",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un cours commence à 8 h 00 et finit à 9 h 00. Quelle est sa durée en minutes ?",
    format: "qcm",
    choices: ["60 min", "100 min", "10 min", "30 min"],
    expected: ["60 min"],
    comparator: "mcq_exact",
    hint: "De 8 h à 9 h, il y a 1 heure.",
    explanation: exp(
      "Calculer une durée, c’est chercher le temps écoulé entre deux instants.",
      "On compte le temps entre l’heure de début et l’heure de fin.",
      "De 8 h 00 à 9 h 00, il y a 1 heure, donc 60 minutes.",
      "La durée est 60 minutes."
    ),
    tags: ["cm2", "duree", "calculer", "horaires", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Début et fin",
      start: { hour: 8, minute: 0, label: "Début" },
      end: { hour: 9, minute: 0, label: "Fin" },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_calculer_fixed_2_45min",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une activité commence à 14 h 15 et finit à 15 h 00. Quelle est sa durée ?",
    format: "qcm",
    choices: ["45 min", "15 min", "1 h 15 min", "30 min"],
    expected: ["45 min"],
    comparator: "mcq_exact",
    hint: "De 14 h 15 à 15 h 00, il manque 45 minutes.",
    explanation: exp(
      "Une durée est le temps écoulé entre un début et une fin.",
      "On peut avancer jusqu’à l’heure suivante.",
      "De 14 h 15 à 15 h 00, il y a 45 minutes.",
      "La durée est 45 min."
    ),
    tags: ["cm2", "duree", "calculer", "45min", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Combien de temps ?",
      start: { hour: 14, minute: 15, label: "Début" },
      end: { hour: 15, minute: 0, label: "Fin" },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_calculer_fixed_3_fin",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Un film commence à 17 h 40 et dure 1 h 50 min. À quelle heure se termine-t-il ?",
    format: "qcm",
    choices: ["19 h 30", "18 h 90", "19 h 20", "18 h 30"],
    expected: ["19 h 30"],
    comparator: "mcq_exact",
    hint: "Ajoute d’abord 1 h, puis 50 min.",
    explanation: exp(
      "Pour trouver l’heure de fin, on ajoute la durée à l’heure de début.",
      "On peut ajouter les heures puis les minutes.",
      "17 h 40 + 1 h = 18 h 40. Puis 18 h 40 + 50 min = 19 h 30.",
      "Le film se termine à 19 h 30."
    ),
    tags: ["cm2", "duree", "calculer", "heure_fin", "cinema", "qcm"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Film : calcul de l’heure de fin",
      frise: {
        startLabel: "17 h 40",
        endLabel: "?",
        steps: [
          { label: "+ 1 h", minutes: 60, color: "#38bdf8" },
          { label: "+ 50 min", minutes: 50, color: "#f97316" },
        ],
      },
      colors: watchColors(0),
    }),
  },

  // ============================================================
  // DUREE_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_probleme_fixed_1_bus",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "À Saint-Pierre, le bus part à 7 h 25. Il est 7 h 10. Dans combien de minutes le bus part-il ?",
    format: "qcm",
    choices: ["15 min", "35 min", "25 min", "10 min"],
    expected: ["15 min"],
    comparator: "mcq_exact",
    hint: "Compte de 7 h 10 à 7 h 25.",
    explanation: exp(
      "Un problème de durée demande souvent de calculer un temps d’attente.",
      "On calcule l’écart entre l’heure actuelle et l’heure de départ.",
      "De 7 h 10 à 7 h 25, il y a 15 minutes.",
      "Le bus part dans 15 minutes."
    ),
    tags: ["cm2", "duree", "probleme", "bus", "reunion"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Attente du bus",
      start: { hour: 7, minute: 10, label: "Maintenant" },
      end: { hour: 7, minute: 25, label: "Départ" },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_probleme_fixed_2_cuisson",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un gâteau doit cuire 45 minutes. On l’enfourne à 16 h 20. À quelle heure sera-t-il cuit ?",
    format: "qcm",
    choices: ["17 h 05", "16 h 65", "17 h 15", "16 h 45"],
    expected: ["17 h 05"],
    comparator: "mcq_exact",
    hint: "Ajoute 45 minutes à 16 h 20.",
    explanation: exp(
      "Pour trouver l’heure de fin, on ajoute la durée à l’heure de début.",
      "On peut aller jusqu’à 17 h puis ajouter le reste.",
      "De 16 h 20 à 17 h 00, il y a 40 minutes. Il reste 5 minutes, donc 17 h 05.",
      "Le gâteau sera cuit à 17 h 05."
    ),
    tags: ["cm2", "duree", "probleme", "cuisson", "qcm"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Cuisson du gâteau",
      frise: {
        startLabel: "16 h 20",
        endLabel: "?",
        steps: [
          { label: "+ 40 min", minutes: 40, color: "#f97316" },
          { label: "+ 5 min", minutes: 5, color: "#22c55e" },
        ],
      },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm2_duree_probleme_fixed_3_sport",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 4,
    theme: "sport",
    text: "Un entraînement commence à 9 h 35 et dure 1 h 20 min. À quelle heure se termine-t-il ?",
    format: "qcm",
    choices: ["10 h 55", "10 h 35", "11 h 20", "9 h 55"],
    expected: ["10 h 55"],
    comparator: "mcq_exact",
    hint: "Ajoute 1 h puis 20 minutes.",
    explanation: exp(
      "Un horaire de fin s’obtient en ajoutant la durée à l’horaire de début.",
      "On ajoute d’abord l’heure entière, puis les minutes.",
      "9 h 35 + 1 h = 10 h 35. Puis 10 h 35 + 20 min = 10 h 55.",
      "L’entraînement se termine à 10 h 55."
    ),
    tags: ["cm2", "duree", "probleme", "sport", "qcm"],
  },

  // ============================================================
  // DUREE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_duree_defi_fixed_1_confusion_base_100",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève écrit « 1 h 75 min » et dit : « C’est correct, car 75 minutes, ça existe. » A-t-il raison ?",
    format: "qcm",
    choices: ["Non : 1 h 75 min, c’est 2 h 15 min", "Oui, c’est bien écrit", "Non : il faut écrire 1,75 h", "Non : 1 h 75 min, c’est 1 h 15 min"],
    expected: ["Non : 1 h 75 min, c’est 2 h 15 min"],
    comparator: "mcq_exact",
    hint: "Dès qu’on atteint 60 minutes, on forme une heure.",
    explanation: exp(
      "Les durées en heures et minutes utilisent une base de 60 minutes.",
      "On ne laisse pas 75 minutes dans l’écriture en h et min.",
      "75 min = 1 h 15 min. Donc 1 h 75 min = 2 h 15 min.",
      "L’élève a tort : on écrit 2 h 15 min."
    ),
    tags: ["cm2", "duree", "defi", "erreur", "base_60", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_defi_fixed_2_comparer",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle durée est la plus longue : 1 h 20 min ou 90 min ?",
    format: "qcm",
    choices: ["1 h 20 min", "90 min", "Elles sont égales"],
    expected: ["90 min"],
    comparator: "mcq_exact",
    hint: "Convertis 1 h 20 min en minutes.",
    explanation: exp(
      "Pour comparer deux durées, il est souvent utile de les écrire dans la même unité.",
      "On convertit 1 h 20 min en minutes.",
      "1 h 20 min = 60 + 20 = 80 min. Or 90 min est plus grand que 80 min.",
      "La durée la plus longue est 90 min."
    ),
    tags: ["cm2", "duree", "defi", "comparer", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm2_duree_defi_fixed_3_deux_etapes",
    niveau: "cm2",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 5,
    theme: "reunion",
    text: "À La Réunion, Léa part marcher à 6 h 50. Elle marche 35 min, fait une pause de 20 min, puis marche encore 25 min. À quelle heure finit-elle ?",
    format: "qcm",
    choices: ["8 h 10", "7 h 50", "8 h 20", "7 h 30"],
    expected: ["8 h 10"],
    comparator: "mcq_exact",
    hint: "Additionne toutes les durées : marche + pause + marche.",
    explanation: exp(
      "Un problème de durée peut avoir plusieurs étapes.",
      "On additionne toutes les durées puis on les ajoute à l’heure de départ.",
      "35 + 20 + 25 = 80 min = 1 h 20 min. 6 h 50 + 1 h 20 min = 8 h 10.",
      "Léa finit à 8 h 10."
    ),
    tags: ["cm2", "duree", "defi", "reunion", "marche", "qcm"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Randonnée du matin",
      frise: {
        startLabel: "6 h 50",
        endLabel: "?",
        steps: [
          { label: "+ 35 min", minutes: 35, color: "#22c55e" },
          { label: "+ 20 min", minutes: 20, color: "#f59e0b" },
          { label: "+ 25 min", minutes: 25, color: "#38bdf8" },
        ],
      },
      colors: watchColors(1),
    }),
  },

  // Gabarits du 14/11/2026 (situations × tournures), voir plus haut.
  ...GABARITS_DUREE_CM2,
];
