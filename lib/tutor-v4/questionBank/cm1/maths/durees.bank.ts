// lib/tutor-v4/question-banks/maths/cm1/durees.bank.ts

import type {
  TutorBankItemV4,
  DureeCanvasData,
} from "@/lib/tutor-v4/types";
import { melangeEnPlace } from "@/lib/tutor-v4/questionBank/melange";
import { atelier, cap, entre, etapes, fr, qcm, un } from "./trous-outils";

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
   GABARITS DES DURÉES CM1 (14/11/2026)

   Les anciens gabarits posaient tous la même phrase (« Quelle heure indique
   l'horloge ? ») : 3 à 11 squelettes par micro, 13 à 19 répétitions sur 20.
   Chaque gabarit tire ici une SITUATION (métiers, sport, cuisine, voyages…) ×
   une TOURNURE × des nombres. Zéro question ouverte (CM1 = zéro clavier).

   LES PIÈGES SONT DES ERREURS D'ÉLÈVE :
   - « 1 h = 100 min » : 9 h 15 − 8 h 40 = 75 min, 1 h 15 min = 115 min ;
   - « 1,5 h = 1 h 50 min » et « 1 h 30 = 1,3 h » ;
   - les aiguilles inversées (la grande lue comme les heures) ;
   - la petite aiguille presque sur le nombre suivant (3 h 45 lu 4 h 45) ;
   - oublier de passer l'heure (10 h 45 + 40 min = « 10 h 85 ») ;
   - soustraire à l'envers (9 h 05 − 8 h 48 → 48 − 5 = 43).
   Les choix portent TOUJOURS leur unité, et dans la même écriture (jamais
   « 75 min » à côté de « 1 h 15 min » : ce seraient deux réponses justes).
   ════════════════════════════════════════════════════════════════════ */

const GD = (micro: string) => atelier("cm1", "duree", micro, "cm1_");

const PRENOMS_D = ["Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha", "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Maya", "Noé"];
const METIERS_D = ["La boulangère", "Le pompier", "L’infirmier", "La pilote", "Le chauffeur de bus", "La vétérinaire", "Le cuisinier", "La gardienne du musée", "Le facteur", "La pharmacienne"];
const quiD = () => (Math.random() < 0.6 ? un(PRENOMS_D) : un(METIERS_D));
const deuxPrenoms = (): [string, string] => {
  const a = un(PRENOMS_D);
  let b = un(PRENOMS_D);
  while (b === a) b = un(PRENOMS_D);
  return [a, b];
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
const suivante = (h: number) => (h === 12 ? 1 : h + 1);
const precedente = (h: number) => (h === 1 ? 12 : h - 1);
/** Un multiple de 5 entre a et b. */
const pas5 = (a: number, b: number) => 5 * entre(Math.ceil(a / 5), Math.floor(b / 5));
/** Les aiguilles inversées : la grande lue comme les heures, la petite comme les minutes. */
const inverse = (h: number, m: number) => hh(m === 0 ? 12 : m / 5, (h % 12) * 5);
/** « Au goûter, la boulangère regarde… » : la minuscule seulement sur un article, jamais sur un prénom. */
const avecPrefixe = (prefixes: string[], phrase: string) =>
  Math.random() < 0.5 ? `${un(prefixes)}, ${/^(Le |La |L’)/.test(phrase) ? phrase.charAt(0).toLowerCase() + phrase.slice(1) : phrase}` : phrase;

const horlogeD = (hour: number, minute: number, label?: string): DureeCanvasData =>
  dureeCanvas({
    variant: "horloge",
    time: { hour, minute, label },
    display: { showDigital: false, showLabels: !!label },
    colors: watchColors(hour + minute),
  });
const deuxHorlogesD = (a: [number, number, string], b: [number, number, string]): DureeCanvasData =>
  dureeCanvas({
    variant: "double_horloge",
    start: { hour: a[0], minute: a[1], label: a[2] },
    end: { hour: b[0], minute: b[1], label: b[2] },
    display: { showDigital: false, showLabels: true },
  });
const friseD = (startLabel: string, endLabel: string, steps: [string, number, string?][]): DureeCanvasData =>
  dureeCanvas({
    variant: "frise",
    frise: { startLabel, endLabel, steps: steps.map(([label, minutes, color]) => ({ label, minutes, ...(color ? { color } : {}) })) },
  });

/* ───────────── duree_lire ───────────── */

const L = GD("duree_lire");
const LIEUX_HORLOGE = [
  "l’horloge de la classe", "la pendule de la cuisine", "l’horloge de la gare", "le réveil de la chambre",
  "l’horloge de la mairie", "la montre de son grand-père", "l’horloge du gymnase", "la pendule de la boulangerie",
  "l’horloge de la bibliothèque", "l’horloge de la salle d’attente", "la montre de la maîtresse", "l’horloge du stade",
  "l’horloge de la piscine", "la pendule du garage", "l’horloge du clocher", "la montre de plongée de sa tante",
];
const VERBES_REGARDER = ["regarde", "observe", "lève les yeux vers", "vérifie l’heure sur"];
const MOMENTS_LIRE = ["Pendant la récréation", "Au goûter", "Avant l’entraînement", "Après la sieste", "Pendant la visite du musée", "À la pause", "Pendant le cours de dessin", "Avant le dîner"];
const Q_HEURE = ["Quelle heure est-il ?", "Quelle heure indiquent les aiguilles ?", "Quelle heure lit-on ?", "Quelle heure est affichée ?"];
const regarde = () => avecPrefixe(MOMENTS_LIRE, `${quiD()} ${un(VERBES_REGARDER)} ${un(LIEUX_HORLOGE)}.`);
const HINT_LIRE = "La petite aiguille donne l’heure, la grande aiguille donne les minutes (chaque nombre vaut 5 min).";
const explLire = (h: number, m: number) =>
  etapes(
    "la petite aiguille donne l’heure, la grande aiguille donne les minutes.",
    m === 0
      ? `la grande aiguille est sur le 12 : 0 minute. La petite aiguille est sur le ${h}.`
      : `la grande aiguille est sur le ${m / 5} : ${m / 5} × 5 = ${m} minutes. La petite aiguille a dépassé le ${h}${m > 30 ? ` et approche du ${suivante(h)}` : ""}.`,
    `il est ${hh(h, m)}.`,
  );

const APPAREILS = [
  "L’écran du four", "Le cadran du micro-ondes", "Le tableau des départs de la gare", "L’écran du téléphone",
  "Le radio-réveil", "L’écran de la caisse du supermarché", "Le tableau de bord de la voiture", "Le panneau de l’arrêt de bus",
  "La montre de sport du coach", "L’écran de la box", "Le distributeur de tickets du parking", "L’horloge numérique de la pharmacie",
];
const QUARTS_ECHANGE: Record<number, number> = { 0: 30, 15: 45, 30: 0, 45: 15 };

const dureeLireGabarits: TutorBankItemV4[] = [
  // ★1 — heure pleine ou demie sur l'horloge à aiguilles.
  L(1, 1, HINT_LIRE, () => {
    const h = entre(1, 12);
    const m = un([0, 30]);
    const juste = hh(h, m);
    return {
      text: `${regarde()} ${un(Q_HEURE)}`,
      ...qcm(juste, [
        inverse(h, m),
        m === 0 ? `${h} h 12` : `${h} h 06`,
        m === 0 ? `12 h ${pad2(h)}` : hh(suivante(h), 30),
        hh(suivante(h), m),
      ]),
      explanation: explLire(h, m),
      canvas: horlogeD(h, m),
    };
  }),
  // ★1 — affichage numérique.
  L(2, 1, "Dans 08:20, le nombre avant les deux points donne les heures, le nombre après donne les minutes.", () => {
    const h = entre(6, 22);
    const m = un([0, 5, 15, 30, 45]);
    const ecran = `${pad2(h)}:${pad2(m)}`;
    const juste = hh(h, m);
    return {
      text: `${un(APPAREILS)} ${un(["affiche", "indique", "montre"])} ${ecran}. ${un(["Comment lit-on cette heure ?", "Quelle heure est-il ?", "Comment écrit-on cette heure en heures et minutes ?"])}`,
      ...qcm(juste, [`${m} h ${pad2(h)}`, hh(h === 23 ? 0 : h + 1, m), m === 5 ? hh(h, 50) : hh(h, QUARTS_ECHANGE[m])]),
      explanation: etapes("avant les deux points : les heures ; après : les minutes.", `${ecran} : ${h} heures et ${m} minute${m > 1 ? "s" : ""}.`, `on écrit ${juste}.`),
      canvas: dureeCanvas({ variant: "digital", digital: { text: ecran, label: "Affichage" }, colors: watchColors(h + m) }),
    };
  }),
  // ★2 — minutes de 5 en 5, quarts.
  L(3, 2, HINT_LIRE, () => {
    const h = entre(1, 12);
    const m = un([5, 10, 15, 20, 25, 35, 40, 45, 50, 55]);
    const juste = hh(h, m);
    return {
      text: `${regarde()} ${un(Q_HEURE)}`,
      ...qcm(juste, [
        inverse(h, m),
        `${h} h ${pad2(m / 5)}`,
        m > 30 ? hh(suivante(h), m) : hh(precedente(h), m),
        m === 15 ? hh(h, 45) : m === 45 ? hh(h, 15) : hh(h, 60 - m),
      ]),
      explanation: explLire(h, m),
      canvas: horlogeD(h, m),
    };
  }),
  // ★2 — matin ou après-midi : écrire l'heure de 0 h à 24 h.
  L(4, 2, "L’après-midi et le soir, on ajoute 12 h : 3 h de l’après-midi, c’est 15 h.", () => {
    const pm = Math.random() < 0.6;
    const soir = pm && Math.random() < 0.5;
    const h = pm ? (soir ? entre(6, 10) : entre(1, 5)) : entre(7, 11);
    const m = un([0, 15, 30, 45]);
    const juste = pm ? hh(h + 12, m) : hh(h, m);
    const moment = pm ? (soir ? un(["C’est le soir.", "La nuit commence à tomber."]) : un(["C’est l’après-midi.", "On est en plein après-midi."])) : un(["C’est le matin.", "On est en matinée."]);
    return {
      text: `${moment} ${quiD()} ${un(VERBES_REGARDER)} ${un(LIEUX_HORLOGE)}. ${un(["Quelle heure est-il, en comptant de 0 h à 24 h ?", "Comment écrit-on cette heure de 0 h à 24 h ?", "Quelle heure afficherait un écran qui compte jusqu’à 24 h ?"])}`,
      ...qcm(juste, pm ? [hh(h, m), hh(h + 10, m), hh(h + 11, m)] : [hh(h + 12, m), inverse(h, m), hh(suivante(h), m)]),
      explanation: etapes(
        "on lit l’horloge, puis on regarde le moment de la journée.",
        pm ? `l’horloge montre ${hh(h, m)} et c’est ${soir ? "le soir" : "l’après-midi"} : ${h} + 12 = ${h + 12}.` : `l’horloge montre ${hh(h, m)} et c’est le matin : on ne change rien.`,
        `il est ${juste}.`,
      ),
      canvas: horlogeD(h, m),
    };
  }),
  // ★2 — laquelle des deux horloges ?
  L(5, 2, HINT_LIRE, () => {
    // Le texte lit l'heure telle quelle : de 7 h à 12 h, pour éviter « rendez-vous à 1 h 00 ».
    const h = entre(7, 12);
    const m = un([0, 10, 15, 20, 30, 40, 45, 50]);
    const pieges: [number, number][] = [
      [m === 0 ? 12 : m / 5, (h % 12) * 5],
      [m > 30 ? precedente(h) : suivante(h), m],
      [h, (m + 30) % 60],
    ].filter(([a, b]) => !(a === h && b === m)) as [number, number][];
    const p = melangeEnPlace([...pieges]);
    const cas = Math.random();
    const A: [number, number] = cas < 0.375 ? [h, m] : p[0];
    const B: [number, number] = cas < 0.375 ? p[0] : cas < 0.75 ? [h, m] : p[1] ?? p[0];
    const juste = cas < 0.375 ? "L’horloge A" : cas < 0.75 ? "L’horloge B" : "Aucune des deux";
    const t = hh(h, m);
    return {
      text: `${quiD()} ${un(["doit partir à", "a rendez-vous à", "prend le train à", "commence son travail à", "va au cinéma à", "déjeune à"])} ${t}. ${un(["Quelle horloge indique cette heure ?", "Sur quelle horloge lit-on cette heure ?", "Laquelle des deux horloges montre cette heure ?"])}`,
      ...qcm(juste, ["L’horloge A", "L’horloge B", "Aucune des deux"]),
      explanation: etapes(
        "on lit chaque horloge : la petite aiguille pour l’heure, la grande pour les minutes.",
        `l’horloge A montre ${hh(A[0], A[1])}, l’horloge B montre ${hh(B[0], B[1])}.`,
        juste === "Aucune des deux" ? `aucune des deux ne montre ${t}.` : `${juste.replace("L’", "l’")} montre ${t}.`,
      ),
      canvas: deuxHorlogesD([A[0], A[1], "A"], [B[0], B[1], "B"]),
    };
  }),
];

/* ───────────── duree_convertir ───────────── */

const C = GD("duree_convertir");
const SUJETS_DUREE = [
  "Le film", "La randonnée", "Le trajet en car", "La cuisson du rôti", "Le tournoi de foot", "La répétition de la chorale",
  "Le vol en avion", "La sortie au musée", "Le spectacle de cirque", "La traversée en ferry", "La leçon de piano",
  "Le match de rugby", "L’atelier de poterie", "La partie de pêche", "La visite du zoo", "Le chantier du maçon",
];
const dure = (x: string) => `${un(SUJETS_DUREE)} ${un(["dure", "a duré", "va durer"])} ${x}.`;
const Q_EN_MIN = ["Combien de minutes cela fait-il ?", "Cela fait combien de minutes ?", "Convertis cette durée en minutes.", "Quelle est cette durée en minutes ?"];
const Q_EN_HMIN = ["Écris cette durée en heures et minutes.", "Combien d’heures et de minutes cela fait-il ?", "Quelle est cette durée en h et min ?", "Convertis en heures et minutes."];
const HINT_60 = "1 h = 60 min (et pas 100 min).";
const heuresDe = (n: number): [string, number][] => Array.from({ length: n }, () => ["1 h", 60] as [string, number]);

const SITUATIONS_SECONDES: ((n: number) => string)[] = [
  (n) => `Le sablier se vide en ${n} min.`,
  (n) => `Il faut se brosser les dents pendant ${n} min.`,
  (n) => `Le lait chauffe au micro-ondes pendant ${n} min.`,
  (n) => `L’œuf à la coque cuit ${n} min.`,
  (n) => `La chanson préférée de ${un(PRENOMS_D)} dure ${n} min.`,
  (n) => `L’exercice de gainage dure ${n} min.`,
  (n) => `Le tour de manège dure ${n} min.`,
  (n) => `Le minuteur du cuisinier sonne au bout de ${n} min.`,
  (n) => `La vidéo de la maîtresse dure ${n} min.`,
  (n) => `L’arbitre accorde ${n} min de temps additionnel.`,
  (n) => `La pâtissière fouette la crème pendant ${n} min.`,
  (n) => `Le pompier enfile sa tenue en ${n} min.`,
];
const FRACTIONS_HEURE: [string, number, string[]][] = [
  ["une demi-heure", 30, ["50 min", "15 min", "60 min"]],
  ["un quart d’heure", 15, ["25 min", "45 min", "4 min"]],
  ["trois quarts d’heure", 45, ["75 min", "34 min", "15 min"]],
  ["une heure et quart", 75, ["115 min", "15 min", "90 min"]],
  ["une heure et demie", 90, ["130 min", "150 min", "30 min"]],
];
const SITUATIONS_JOURS: ((n: number) => string)[] = [
  (n) => `La classe de découverte dure ${n} jours.`,
  (n) => `Le séjour au ski dure ${n} jours.`,
  (n) => `La course de voile dure ${n} jours.`,
  (n) => `Le festival de musique dure ${n} jours.`,
  (n) => `Le stage de foot dure ${n} jours.`,
  (n) => `La fête du village dure ${n} jours.`,
  (n) => `Le voyage scolaire dure ${n} jours.`,
  (n) => `La foire agricole dure ${n} jours.`,
];
const SITUATIONS_SEMAINES: ((n: number) => string)[] = [
  (n) => `Les vacances de la famille de ${un(PRENOMS_D)} durent ${n} semaines.`,
  (n) => `Le chantier du maçon dure ${n} semaines.`,
  (n) => `${un(PRENOMS_D)} garde son plâtre ${n} semaines.`,
  (n) => `Les radis du jardin poussent en ${n} semaines.`,
  (n) => `Le stage de natation dure ${n} semaines.`,
  (n) => `La location du camping-car dure ${n} semaines.`,
  (n) => `Le tournoi de tennis du club dure ${n} semaines.`,
  (n) => `L’exposition de la bibliothèque reste ${n} semaines.`,
];
const SITUATIONS_SEC_LONGUES: ((T: number) => string)[] = [
  (T) => `Le record de ${un(PRENOMS_D)} au 800 m est de ${T} s.`,
  (T) => `La musique du spectacle dure ${T} s.`,
  (T) => `La vidéo de la maîtresse dure ${T} s.`,
  (T) => `La plongeuse reste sous l’eau ${T} s.`,
  (T) => `Le minuteur de la pâtissière est réglé sur ${T} s.`,
  (T) => `Le tour de grand huit dure ${T} s.`,
  (T) => `Le chrono du nageur affiche ${T} s.`,
  (T) => `La chanson préférée de ${un(PRENOMS_D)} dure ${T} s.`,
  (T) => `La course de relais de la classe dure ${T} s.`,
  (T) => `Le micro-ondes chauffe la soupe pendant ${T} s.`,
  (T) => `La publicité avant le film dure ${T} s.`,
  (T) => `Le pompier grimpe à la corde en ${T} s.`,
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
const jh = (j: number, r: number) => `${j} ${j > 1 ? "jours" : "jour"}${r ? ` ${r} h` : ""}`;

const dureeConvertirGabarits: TutorBankItemV4[] = [
  // ★1 — heures entières en minutes.
  C(1, 1, HINT_60, () => {
    const n = entre(1, 4);
    return {
      text: `${dure(`${n} h`)} ${un(Q_EN_MIN)}`,
      ...qcm(`${60 * n} min`, [`${100 * n} min`, `${10 * n} min`, n > 1 ? `${60 * (n - 1)} min` : "30 min"]),
      explanation: etapes("1 h = 60 min.", `${n} × 60 = ${60 * n}.`, `${n} h = ${60 * n} min.`),
      canvas: friseD("début", "fin", heuresDe(n)),
    };
  }),
  // ★1 — minutes en secondes.
  C(2, 1, "1 min = 60 s (et pas 100 s).", () => {
    const n = entre(1, 5);
    return {
      text: `${un(SITUATIONS_SECONDES)(n)} ${un(["Combien de secondes cela fait-il ?", "Cela fait combien de secondes ?", "Convertis cette durée en secondes.", "Quelle est cette durée en secondes ?"])}`,
      ...qcm(`${60 * n} s`, [`${100 * n} s`, `${10 * n} s`, n > 1 ? `${60 * (n - 1)} s` : "30 s"]),
      explanation: etapes("1 min = 60 s.", `${n} × 60 = ${60 * n}.`, `${n} min = ${60 * n} s.`),
      canvas: dureeCanvas({ variant: "digital", digital: { text: `${pad2(n)}:00`, label: "Chronomètre (min : s)" }, colors: watchColors(n) }),
    };
  }),
  // ★1 — quart, demi, trois quarts d'heure.
  C(3, 1, "Un quart d’heure = 15 min, une demi-heure = 30 min, trois quarts d’heure = 45 min.", () => {
    const [nom, v, faux] = un(FRACTIONS_HEURE);
    return {
      text: `${dure(nom)} ${un(Q_EN_MIN)}`,
      ...qcm(`${v} min`, faux),
      explanation: etapes("1 h = 60 min, et un quart d’heure = 60 ÷ 4 = 15 min.", `${nom} = ${v / 15} × 15 min = ${v} min.`, `${nom} = ${v} min.`),
      canvas: friseD("début", "fin", Array.from({ length: v / 15 }, () => ["¼ h", 15] as [string, number])),
    };
  }),
  // ★2 — h et min en minutes.
  C(4, 2, HINT_60, () => {
    const h = entre(1, 3);
    const m = pas5(5, 55);
    const juste = 60 * h + m;
    return {
      text: `${dure(`${h} h ${m} min`)} ${un(Q_EN_MIN)}`,
      ...qcm(`${juste} min`, [`${100 * h + m} min`, `${60 * h} min`, `${h + m} min`, h > 1 ? `${60 + m} min` : `${juste + 60} min`]),
      explanation: etapes("on convertit les heures (1 h = 60 min), puis on ajoute les minutes.", `${h} × 60 = ${60 * h} ; ${60 * h} + ${m} = ${juste}.`, `${h} h ${m} min = ${juste} min.`),
      canvas: friseD("début", "fin", [...heuresDe(h), [`${m} min`, m]]),
    };
  }),
  // ★2 — minutes en h et min.
  C(5, 2, "Dans 60 min, il y a 1 h : enlève 60 min autant de fois que possible.", () => {
    let T = 5 * entre(13, 35);
    if (T % 60 === 0) T += 15;
    const faux = [dur(T + 60), dur(T - 60)];
    if (T >= 100) faux.push(T % 100 === 0 ? `${T / 100} h` : `${Math.floor(T / 100)} h ${T % 100} min`);
    if (T > 120) faux.push(`1 h ${T - 60} min`);
    return {
      text: `${dure(`${T} min`)} ${un(Q_EN_HMIN)}`,
      ...qcm(dur(T), faux),
      explanation: etapes("1 h = 60 min : on cherche combien de fois 60 min tiennent dans la durée.", `${T} = ${Math.floor(T / 60)} × 60 + ${T % 60}.`, `${T} min = ${dur(T)}.`),
      canvas: friseD("début", "fin", [[`${T} min`, T]]),
    };
  }),
  // ★2 — jours en heures, semaines en jours.
  C(6, 2, "1 jour = 24 h ; 1 semaine = 7 jours.", () => {
    if (Math.random() < 0.5) {
      const n = entre(2, 4);
      return {
        text: `${un(SITUATIONS_JOURS)(n)} ${un(["Combien d’heures cela fait-il ?", "Cela fait combien d’heures ?", "Convertis cette durée en heures."])}`,
        ...qcm(`${24 * n} h`, [`${12 * n} h`, `${10 * n} h`, `${24 * (n - 1)} h`]),
        explanation: etapes("1 jour = 24 h.", `${n} × 24 = ${24 * n}.`, `${n} jours = ${24 * n} h.`),
      };
    }
    const n = entre(2, 6);
    return {
      text: `${un(SITUATIONS_SEMAINES)(n)} ${un(["Combien de jours cela fait-il ?", "Cela fait combien de jours ?", "Convertis cette durée en jours."])}`,
      ...qcm(`${7 * n} jours`, [`${5 * n} jours`, `${10 * n} jours`, `${7 * n - 7} jours`]),
      explanation: etapes("1 semaine = 7 jours (le week-end compte aussi).", `${n} × 7 = ${7 * n}.`, `${n} semaines = ${7 * n} jours.`),
    };
  }),
  // ★3 — heures avec une virgule.
  C(7, 3, "0,5 h, c’est une demi-heure = 30 min ; 0,25 h, un quart d’heure = 15 min.", () => {
    const x = un([0.5, 1.5, 2.5, 0.25, 1.25, 0.75, 1.75, 2.25]);
    const ent = Math.floor(x);
    const m = Math.round(60 * (x - ent));
    const ds = String(x).split(".")[1];
    const etapesFrise: [string, number][] = [...heuresDe(ent), [`${fr(x - ent)} h`, m]];
    if (Math.random() < 0.5) {
      return {
        text: `${dure(`${fr(x)} h`)} ${un(Q_EN_HMIN)}`,
        ...qcm(dur(60 * x), [
          dur(60 * ent + Number(ds.padEnd(2, "0"))),
          dur(60 * ent + Number(ds[0])),
          dur(60 * ent + (m === 30 ? 15 : 30)),
          dur(60 * x + 60),
        ]),
        explanation: etapes("la partie après la virgule est une fraction d’heure, pas des minutes.", `${fr(x - ent)} h = ${fr(x - ent)} × 60 min = ${m} min.`, `${fr(x)} h = ${dur(60 * x)}.`),
        canvas: friseD("début", "fin", etapesFrise),
      };
    }
    return {
      text: `${dure(dur(60 * x))} ${un(["Écris cette durée en heures, avec une virgule.", "Quelle est cette durée en heures ?", "Combien d’heures cela fait-il, avec un nombre à virgule ?"])}`,
      ...qcm(`${fr(x)} h`, [`${fr(ent + m / 100)} h`, `${fr(60 * ent + m)} h`, `${fr(ent + (m === 30 ? 0.25 : 0.5))} h`]),
      explanation: etapes("30 min = une demi-heure = 0,5 h ; 15 min = un quart d’heure = 0,25 h.", `${m} min = ${fr(x - ent)} h.`, `${dur(60 * x)} = ${fr(x)} h (et pas ${fr(ent + m / 100)} h).`),
      canvas: friseD("début", "fin", etapesFrise),
    };
  }),
  // ★3 — secondes en min et s.
  C(8, 3, "1 min = 60 s : enlève 60 s autant de fois que possible.", () => {
    let T = 5 * entre(14, 58);
    if (T % 60 === 0) T += 25;
    const q = Math.floor(T / 60);
    const r = T % 60;
    const faux = [`${q + 1} min ${r} s`];
    if (T >= 100) faux.push(T % 100 === 0 ? `${T / 100} min` : `${Math.floor(T / 100)} min ${T % 100} s`);
    if (T > 120) faux.push(`1 min ${T - 60} s`);
    if (T % 10 === 0) faux.push(`${T / 10} min`);
    if (faux.length < 3) faux.push(`${q} min ${r + 40} s`);
    return {
      text: `${un(SITUATIONS_SEC_LONGUES)(T)} ${un(["Écris cette durée en minutes et secondes.", "Combien de minutes et de secondes cela fait-il ?", "Quelle est cette durée en min et s ?"])}`,
      ...qcm(`${q} min ${r} s`, faux),
      explanation: etapes("1 min = 60 s.", `${T} = ${q} × 60 + ${r}.`, `${T} s = ${q} min ${r} s.`),
    };
  }),
  // ★3 — heures en jours et heures.
  C(9, 3, "1 jour = 24 h : enlève 24 h autant de fois que possible.", () => {
    let T = entre(26, 70);
    if (T % 24 === 0) T += 5;
    const j = Math.floor(T / 24);
    const r = T % 24;
    return {
      text: `${un(SITUATIONS_HEURES_LONGUES)(T)} ${un(["Combien de jours et d’heures cela fait-il ?", "Écris cette durée en jours et heures.", "Quelle est cette durée en jours et heures ?"])}`,
      ...qcm(jh(j, r), [jh(Math.floor(T / 10), T % 10), jh(Math.floor(T / 12), T % 12), jh(j + 1, r)]),
      explanation: etapes("1 jour = 24 h.", `${T} = ${j} × 24 + ${r}.`, `${T} h = ${jh(j, r)}.`),
    };
  }),
];

/* ───────────── duree_calculer ───────────── */

const K = GD("duree_calculer");
const ACTIVITES = [
  "Le cours de judo", "La séance de cinéma", "Le match de handball", "La visite du zoo", "L’atelier de poterie",
  "La réunion des parents", "La consultation chez la pédiatre", "La sortie au parc", "La répétition de théâtre",
  "La leçon de guitare", "L’entraînement de natation", "Le spectacle de marionnettes", "La tournée du facteur",
  "Le cours de danse", "La séance chez le kiné", "La partie de pétanque",
];
const debutFin = (t1: string, t2: string) => {
  const a = un(ACTIVITES);
  return un([`${a} commence à ${t1} et finit à ${t2}.`, `${a} débute à ${t1} et se termine à ${t2}.`, `${a} : début à ${t1}, fin à ${t2}.`]);
};
const debutDuree = (t: string, d: string) => {
  const a = un(ACTIVITES);
  return un([`${a} commence à ${t} et dure ${d}.`, `${a} débute à ${t}, pour une durée de ${d}.`, `${a} : début à ${t}, durée ${d}.`]);
};
const Q_DUREE = ["Quelle est sa durée ?", "Combien de temps cela dure-t-il ?", "Calcule la durée.", "Combien de temps s’écoule entre le début et la fin ?"];
const Q_FIN = ["À quelle heure est-ce terminé ?", "Quelle heure est-il à la fin ?", "À quelle heure est la fin ?", "Trouve l’heure de fin."];
const HINT_PONT = "Passe par l’heure pile : compte jusqu’à l’heure suivante, puis ajoute le reste.";
const figureFin = (h: number, m: number, d: number): DureeCanvasData =>
  Math.random() < 0.5 ? friseD(hh(h, m), "?", [[dur(d), d]]) : horlogeD(h, m, "Début");

const dureeCalculerGabarits: TutorBankItemV4[] = [
  // ★1 — durée dans la même heure.
  K(1, 1, "Les deux horaires ont la même heure : fais la différence des minutes.", () => {
    const h = entre(8, 17);
    const m1 = pas5(5, 40);
    const d = pas5(10, 55 - m1);
    const m2 = m1 + d;
    return {
      text: `${debutFin(hh(h, m1), hh(h, m2))} ${un(Q_DUREE)}`,
      ...qcm(`${d} min`, [`${m2} min`, `${d + 10} min`, `${d - 5} min`, `${m1 + m2} min`]),
      explanation: etapes("on compte les minutes entre le début et la fin.", `${m2} − ${m1} = ${d}.`, `cela dure ${d} min.`),
      canvas: deuxHorlogesD([h, m1, "Début"], [h, m2, "Fin"]),
    };
  }),
  // ★1 — heures pleines.
  K(2, 1, "Compte les heures entre le début et la fin, sans compter celle du début.", () => {
    const h1 = entre(7, 15);
    const k = entre(1, 4);
    const m = un([0, 30]);
    return {
      text: `${debutFin(hh(h1, m), hh(h1 + k, m))} ${un(Q_DUREE)}`,
      ...qcm(`${k} h`, [`${k + 1} h`, k > 1 ? `${k - 1} h` : "30 min", `${h1 + k} h`, `${k} min`]),
      explanation: etapes("on compte les heures écoulées.", `de ${hh(h1, m)} à ${hh(h1 + k, m)} : ${h1 + k} − ${h1} = ${k}.`, `cela dure ${dur(60 * k)}.`),
      canvas: deuxHorlogesD([h1, m, "Début"], [h1 + k, m, "Fin"]),
    };
  }),
  // ★2 — ajouter des minutes sans changer d'heure.
  K(3, 2, "Ajoute les minutes de la durée aux minutes de l’heure de début.", () => {
    const h = entre(8, 17);
    const m1 = pas5(5, 40);
    const d = pas5(10, 55 - m1);
    const juste = hh(h, m1 + d);
    return {
      text: `${debutDuree(hh(h, m1), `${d} min`)} ${un(Q_FIN)}`,
      ...qcm(juste, [hh(h, d), hh(h + 1, m1 + d), m1 !== d ? hh(h, Math.abs(m1 - d)) : hh(h, m1 + d + 10)]),
      explanation: etapes("on ajoute la durée à l’heure de début.", `${m1} + ${d} = ${m1 + d}.`, `c’est terminé à ${juste}.`),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★2 — durée à cheval sur l'heure.
  K(4, 2, HINT_PONT, () => {
    const h = entre(8, 17);
    const m1 = pas5(30, 55);
    const m2 = pas5(0, Math.min(25, m1 - 5));
    const d = 60 - m1 + m2;
    return {
      text: `${debutFin(hh(h, m1), hh(h + 1, m2))} ${un(Q_DUREE)}`,
      ...qcm(`${d} min`, [`${100 - m1 + m2} min`, `${m1 - m2} min`, m2 > 0 ? `${60 - m1} min` : `${d + 10} min`, dur(d + 60)]),
      explanation: etapes("on passe par l’heure pile.", `de ${hh(h, m1)} à ${hh(h + 1, 0)} : ${60 - m1} min${m2 ? ` ; puis ${m2} min. ${60 - m1} + ${m2} = ${d}` : ""}.`, `cela dure ${d} min (et pas ${100 - m1 + m2} : une heure, c’est 60 min).`),
      canvas: deuxHorlogesD([h, m1, "Début"], [h + 1, m2, "Fin"]),
    };
  }),
  // ★2 — durée en h et min, sans retenue.
  K(5, 2, "Calcule séparément les heures et les minutes.", () => {
    const h1 = entre(8, 15);
    const m1 = pas5(0, 30);
    const k = entre(1, 2);
    const m2 = m1 + pas5(5, 55 - m1);
    const d = 60 * k + m2 - m1;
    return {
      text: `${debutFin(hh(h1, m1), hh(h1 + k, m2))} ${un(Q_DUREE)}`,
      ...qcm(dur(d), [`${m2 - m1} min`, dur(d + 60), dur(60 * k + m1 + m2), `${100 * k + m2 - m1} min`]),
      explanation: etapes("on calcule les heures, puis les minutes.", `${h1 + k} − ${h1} = ${k} h et ${m2} − ${m1} = ${m2 - m1} min.`, `cela dure ${dur(d)}.`),
      canvas: deuxHorlogesD([h1, m1, "Début"], [h1 + k, m2, "Fin"]),
    };
  }),
  // ★3 — ajouter une durée en passant l'heure.
  K(6, 3, "Quand les minutes dépassent 60, enlève 60 min et ajoute 1 h.", () => {
    const h = entre(8, 16);
    const m1 = pas5(30, 55);
    const x = pas5(65 - m1, 55);
    const avecHeure = Math.random() < 0.5;
    const d = avecHeure ? 60 + x : x;
    const fin = 60 * h + m1 + d;
    return {
      text: `${debutDuree(hh(h, m1), dur(d))} ${un(Q_FIN)}`,
      ...qcm(hT(fin), [`${avecHeure ? h + 1 : h} h ${m1 + x}`, hT(fin - 60), hT(fin + 60)]),
      explanation: etapes(
        "on ajoute les minutes, puis on passe l’heure si l’on dépasse 60.",
        `${m1} + ${x} = ${m1 + x} min = 1 h ${pad2(m1 + x - 60)}.`,
        `c’est terminé à ${hT(fin)}.`,
      ),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★3 — durée en h et min avec retenue.
  K(7, 3, HINT_PONT, () => {
    const h1 = entre(8, 14);
    const k = entre(1, 3);
    const m1 = pas5(25, 55);
    const m2 = pas5(5, Math.min(20, m1 - 5));
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
      canvas: deuxHorlogesD([h1, m1, "Début"], [h1 + k, m2, "Fin"]),
    };
  }),
];

/* ───────────── duree_probleme ───────────── */

const P = GD("duree_probleme");
const N = () => un(PRENOMS_D);
const SITUATIONS_ATTENTE: ((t1: string, t2: string) => string)[] = [
  (t1, t2) => `${N()} arrive à l’arrêt de bus à ${t1}. Le bus passe à ${t2}.`,
  (t1, t2) => `La piscine ouvre à ${t2}. ${N()} est devant l’entrée à ${t1}.`,
  (t1, t2) => `Le train part à ${t2}. ${N()} est sur le quai à ${t1}.`,
  (t1, t2) => `Le cinéma ouvre ses portes à ${t2}. La famille de ${N()} arrive à ${t1}.`,
  (t1, t2) => `La vétérinaire reçoit le chien de ${N()} à ${t2}. Ils arrivent à la clinique à ${t1}.`,
  (t1, t2) => `La boulangerie ouvre à ${t2}. Le premier client attend devant depuis ${t1}.`,
  (t1, t2) => `Le match commence à ${t2}. Les joueuses sont au stade à ${t1}.`,
  (t1, t2) => `Le pain sort du four à ${t2}. Il est ${t1}.`,
  (t1, t2) => `Le spectacle de magie commence à ${t2}. ${N()} s’assoit à ${t1}.`,
  (t1, t2) => `Le ferry embarque les voitures à ${t2}. Le plombier arrive au port à ${t1}.`,
  (t1, t2) => `La cantine ouvre à ${t2}. La classe est en rang à ${t1}.`,
  (t1, t2) => `Le rendez-vous chez le dentiste est à ${t2}. ${N()} arrive à ${t1}.`,
  (t1, t2) => `La navette de l’aéroport part à ${t2}. La pilote est prête à ${t1}.`,
  (t1, t2) => `La fête de l’école commence à ${t2}. Les parents arrivent à ${t1}.`,
  (t1, t2) => `Le marché ouvre à ${t2}. Le maraîcher a fini d’installer son stand à ${t1}.`,
  (t1, t2) => `Le car de la sortie scolaire part à ${t2}. Il est ${t1} dans la cour.`,
];
const Q_ATTENTE = ["Combien de temps faut-il attendre ?", "Quelle est la durée de l’attente ?", "Combien de minutes d’attente cela fait-il ?"];
const SITUATIONS_FIN: ((t: string, d: string) => string)[] = [
  (t, d) => `Le cours de judo de ${N()} commence à ${t} et dure ${d}.`,
  (t, d) => `Le boulanger met les baguettes au four à ${t}. Elles cuisent ${d}.`,
  (t, d) => `La couturière commence une retouche à ${t}. Il lui faut ${d}.`,
  (t, d) => `Le dentiste soigne ${N()} à partir de ${t}, pendant ${d}.`,
  (t, d) => `${N()} lance une partie de jeu de société à ${t}. La partie dure ${d}.`,
  (t, d) => `Le mécanicien commence la vidange à ${t}. Elle prend ${d}.`,
  (t, d) => `La maîtresse lance une dictée à ${t}. Elle dure ${d}.`,
  (t, d) => `La jardinière commence à arroser le potager à ${t}. Cela lui prend ${d}.`,
  (t, d) => `Le dessin animé commence à ${t} et dure ${d}.`,
  (t, d) => `La chorale répète à partir de ${t}, pendant ${d}.`,
  (t, d) => `${N()} part à vélo à ${t}. Le trajet dure ${d}.`,
  (t, d) => `La pâtissière met un gâteau au four à ${t}, pour ${d}.`,
  (t, d) => `L’infirmière commence sa tournée à ${t}. Elle dure ${d}.`,
  (t, d) => `Le pompier commence l’exercice d’incendie à ${t}. Il dure ${d}.`,
  (t, d) => `La sieste du petit frère de ${N()} commence à ${t} et dure ${d}.`,
  (t, d) => `La vétérinaire commence à opérer un chat à ${t}. L’opération dure ${d}.`,
];
const Q_FIN_P = ["À quelle heure est-ce terminé ?", "Quelle heure sera-t-il à la fin ?", "À quelle heure est-ce fini ?"];
const SITUATIONS_DEBUT: ((t: string, d: string) => string)[] = [
  (t, d) => `Le cours de judo de ${N()} finit à ${t} ; il a duré ${d}.`,
  (t, d) => `Le pain du boulanger sort du four à ${t}, après ${d} de cuisson.`,
  (t, d) => `La pièce de théâtre se termine à ${t}. Elle a duré ${d}.`,
  (t, d) => `La coiffeuse termine la coupe de ${N()} à ${t}. La coupe a duré ${d}.`,
  (t, d) => `Le mécanicien rend la voiture réparée à ${t}, après ${d} de travail.`,
  (t, d) => `La récréation finit à ${t}. Elle a duré ${d}.`,
  (t, d) => `La partie de foot se termine à ${t} ; elle a duré ${d}.`,
  (t, d) => `Le gâteau de la pâtissière sort du four à ${t}, après ${d} de cuisson.`,
  (t, d) => `Le court-métrage finit à ${t}. Il a duré ${d}.`,
  (t, d) => `L’infirmière termine son soin à ${t}. Le soin a duré ${d}.`,
  (t, d) => `La machine à laver s’arrête à ${t} ; elle a tourné ${d}.`,
  (t, d) => `La réunion des délégués se termine à ${t} ; elle a duré ${d}.`,
  (t, d) => `L’orage s’arrête à ${t} ; il a duré ${d}.`,
  (t, d) => `La visite de la ferme finit à ${t}. Elle a duré ${d}.`,
];
const Q_DEBUT = ["À quelle heure cela a-t-il commencé ?", "Quelle était l’heure de début ?", "À quelle heure était le début ?"];
const SITUATIONS_DEUX_DUREES: ((a: number, b: number) => string)[] = [
  (a, b) => `${N()} fait ${a} min de vélo, puis ${b} min de natation.`,
  (a, b) => `Le peintre passe ${a} min sur la première couche et ${b} min sur la deuxième.`,
  (a, b) => `La cuisinière fait mijoter la sauce ${a} min, puis la laisse reposer ${b} min.`,
  (a, b) => `Au musée, la classe visite la salle des dinosaures pendant ${a} min, puis celle des volcans pendant ${b} min.`,
  (a, b) => `Le jardinier tond la pelouse pendant ${a} min, puis taille la haie pendant ${b} min.`,
  (a, b) => `${N()} révise ses tables ${a} min le samedi et ${b} min le dimanche.`,
  (a, b) => `Le car roule ${a} min jusqu’à la pause, puis ${b} min jusqu’au zoo.`,
  (a, b) => `La coiffeuse coupe les cheveux en ${a} min, puis fait le brushing en ${b} min.`,
  (a, b) => `L’électricien répare la prise en ${a} min, puis la lampe en ${b} min.`,
  (a, b) => `La chanteuse répète ${a} min le matin et ${b} min l’après-midi.`,
  (a, b) => `Le pilote vole ${a} min jusqu’à l’escale, puis ${b} min jusqu’à l’arrivée.`,
  (a, b) => `${N()} lit ${a} min avant le dîner et ${b} min avant de dormir.`,
];
const Q_TOTAL_HMIN = ["Combien de temps cela fait-il en tout, en heures et minutes ?", "Quelle est la durée totale, en h et min ?", "Combien de temps au total ? Réponds en heures et minutes."];
const SITUATIONS_DEUX_ETAPES: ((t: string, a: string, b: string) => string)[] = [
  (t, a, b) => `Le pâtissier pétrit la pâte à ${t}. Elle repose ${a}, puis cuit ${b}.`,
  (t, a, b) => `La classe arrive au musée à ${t}. La visite dure ${a}, puis l’atelier ${b}.`,
  (t, a, b) => `${N()} commence ses devoirs à ${t} : ${a} de maths, puis ${b} de lecture.`,
  (t, a, b) => `La maçonne commence à ${t} : ${a} pour monter le mur, puis ${b} pour le crépir.`,
  (t, a, b) => `Le car part à ${t}. Il roule ${a}, puis les élèves pique-niquent pendant ${b}.`,
  (t, a, b) => `La jardinière commence à ${t} : elle bêche ${a}, puis elle sème pendant ${b}.`,
  (t, a, b) => `L’entraînement de basket débute à ${t} : ${a} d’échauffement, puis ${b} de match.`,
  (t, a, b) => `Le cuisinier commence la soupe à ${t} : ${a} d’épluchage, puis ${b} de cuisson.`,
  (t, a, b) => `${N()} part à vélo à ${t}. Il faut ${a} pour aller au lac, puis ${b} pour en faire le tour.`,
  (t, a, b) => `Le vétérinaire commence ses visites à ${t} : ${a} à la ferme, puis ${b} au centre équestre.`,
  (t, a, b) => `La chorale répète à partir de ${t} : ${a} d’échauffement de la voix, puis ${b} de chants.`,
  (t, a, b) => `La peintre commence à ${t} : ${a} pour protéger le sol, puis ${b} pour peindre le mur.`,
];
const Q_TOUT_FINI = ["À quelle heure tout est-il terminé ?", "À quelle heure est-ce fini ?", "Quelle heure est-il à la fin ?"];
const SITUATIONS_RETARD: ((t1: string, t2: string) => string)[] = [
  (t1, t2) => `Le spectacle devait commencer à ${t1}. Il commence à ${t2}.`,
  (t1, t2) => `L’avion devait décoller à ${t1}. Il décolle à ${t2}.`,
  (t1, t2) => `Le livreur devait passer à ${t1}. Il sonne à ${t2}.`,
  (t1, t2) => `Le concert était prévu à ${t1}. Le chanteur arrive sur scène à ${t2}.`,
  (t1, t2) => `Le bus scolaire devait arriver à ${t1}. Il arrive à ${t2}.`,
  (t1, t2) => `Le plombier avait rendez-vous à ${t1}. Il arrive à ${t2}.`,
  (t1, t2) => `Le match devait commencer à ${t1}. L’arbitre siffle le début à ${t2}.`,
  (t1, t2) => `Le train de ${N()} devait partir à ${t1}. Il part à ${t2}.`,
  (t1, t2) => `La pizza devait être livrée à ${t1}. Elle arrive à ${t2}.`,
  (t1, t2) => `Le feu d’artifice était annoncé à ${t1}. Il commence à ${t2}.`,
  (t1, t2) => `La réunion devait débuter à ${t1}. Elle débute à ${t2}.`,
  (t1, t2) => `Le ferry devait accoster à ${t1}. Il accoste à ${t2}.`,
];
const Q_RETARD = ["Combien de temps de retard cela fait-il ?", "Quelle est la durée du retard ?", "De combien de minutes est le retard ?"];

const dureeProblemeGabarits: TutorBankItemV4[] = [
  // ★2 — une attente (dans l'heure, ou jusqu'à l'heure pile).
  P(1, 2, "Calcule l’écart entre l’heure qu’il est et l’heure prévue.", () => {
    const h = entre(7, 17);
    const pile = Math.random() < 0.3;
    const m1 = pile ? pas5(15, 55) : pas5(0, 45);
    const h2 = pile ? h + 1 : h;
    const m2 = pile ? 0 : m1 + pas5(5, 55 - m1);
    const d = pile ? 60 - m1 : m2 - m1;
    return {
      text: `${un(SITUATIONS_ATTENTE)(hh(h, m1), hh(h2, m2))} ${un(Q_ATTENTE)}`,
      ...qcm(`${d} min`, pile ? [`${100 - m1} min`, `${m1} min`, `${d + 10} min`] : [`${m2} min`, `${d + 10} min`, `${m1 + m2} min`, dur(d + 60)]),
      explanation: etapes("on calcule l’écart entre les deux horaires.", pile ? `de ${hh(h, m1)} à ${hh(h2, 0)} : 60 − ${m1} = ${d}.` : `${m2} − ${m1} = ${d}.`, `il faut attendre ${d} min.`),
      canvas: deuxHorlogesD([h, m1, "Maintenant"], [h2, m2, "Prévu"]),
    };
  }),
  // ★2 — l'heure de fin.
  P(2, 2, "Ajoute la durée à l’heure de début.", () => {
    const h = entre(8, 17);
    const m1 = pas5(5, 50);
    const d = pas5(10, Math.min(45, 60 - m1));
    const pile = m1 + d === 60;
    const juste = pile ? hh(h + 1, 0) : hh(h, m1 + d);
    return {
      text: `${un(SITUATIONS_FIN)(hh(h, m1), `${d} min`)} ${un(Q_FIN_P)}`,
      ...qcm(juste, pile ? [`${h} h 60`, hh(h, d), hh(h + 1, d)] : [hh(h, d), hh(h + 1, m1 + d), m1 !== d ? hh(h, Math.abs(m1 - d)) : hh(h, m1 + d + 10)]),
      explanation: etapes("on ajoute la durée à l’heure de début.", `${m1} + ${d} = ${m1 + d}${pile ? " min = 1 h" : ""}.`, `c’est fini à ${juste}.`),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★2 — l'heure de début.
  P(3, 2, "On remonte le temps : enlève la durée à l’heure de fin.", () => {
    const h = entre(8, 17);
    const m2 = pas5(15, 55);
    const d = pas5(10, m2);
    const juste = hh(h, m2 - d);
    return {
      text: `${un(SITUATIONS_DEBUT)(hh(h, m2), `${d} min`)} ${un(Q_DEBUT)}`,
      ...qcm(juste, [m2 + d < 60 ? hh(h, m2 + d) : hT(60 * h + m2 + d), hh(h - 1, m2 - d), d !== m2 - d ? hh(h, d) : hh(h, m2)]),
      explanation: etapes("pour trouver le début, on enlève la durée à l’heure de fin.", `${m2} − ${d} = ${m2 - d}.`, `cela a commencé à ${juste}.`),
      canvas: Math.random() < 0.5 ? horlogeD(h, m2, "Fin") : friseD("?", hh(h, m2), [[`${d} min`, d]]),
    };
  }),
  // ★3 — l'heure de fin en passant l'heure.
  P(4, 3, "Quand les minutes dépassent 60, enlève 60 min et ajoute 1 h.", () => {
    const h = entre(8, 16);
    const m1 = pas5(20, 55);
    const x = pas5(65 - m1, 55);
    const avecHeure = Math.random() < 0.5;
    const d = avecHeure ? 60 + x : x;
    const fin = 60 * h + m1 + d;
    return {
      text: `${un(SITUATIONS_FIN)(hh(h, m1), dur(d))} ${un(Q_FIN_P)}`,
      ...qcm(hT(fin), [`${avecHeure ? h + 1 : h} h ${m1 + x}`, hT(fin - 60), hT(fin + 60)]),
      explanation: etapes("on ajoute la durée, puis on passe l’heure.", `${m1} + ${x} = ${m1 + x} min = 1 h ${pad2(m1 + x - 60)}.`, `c’est fini à ${hT(fin)}.`),
      canvas: figureFin(h, m1, d),
    };
  }),
  // ★3 — deux durées à additionner.
  P(5, 3, HINT_60, () => {
    const a = pas5(25, 55);
    const b = pas5(Math.max(15, 65 - a), Math.min(55, 115 - a));
    const S = a + b;
    const faux = [`1 h ${S} min`, S >= 100 ? (S === 100 ? "1 h" : `1 h ${S - 100} min`) : dur(S - 10), dur(S + 10)];
    return {
      text: `${un(SITUATIONS_DEUX_DUREES)(a, b)} ${un(Q_TOTAL_HMIN)}`,
      ...qcm(dur(S), faux),
      explanation: etapes("on additionne les deux durées, puis on convertit : 60 min = 1 h.", `${a} + ${b} = ${S} min = 60 min + ${S - 60} min.`, `en tout : ${dur(S)}.`),
      canvas: friseD("début", "fin", [[`${a} min`, a], [`${b} min`, b]]),
    };
  }),
  // ★3 — deux étapes, heure de fin.
  P(6, 3, "Ajoute la première durée, puis la deuxième.", () => {
    const h = entre(8, 16);
    const m1 = pas5(0, 50);
    const a = pas5(10, 40);
    const b = pas5(10, 40);
    const s = 60 * h + m1;
    const fin = s + a + b;
    const passe = m1 + a + b >= 60;
    return {
      text: `${un(SITUATIONS_DEUX_ETAPES)(hh(h, m1), `${a} min`, `${b} min`)} ${un(Q_TOUT_FINI)}`,
      ...qcm(hT(fin), [hT(s + a), hT(s + b), passe && m1 + a + b < 100 ? `${h} h ${m1 + a + b}` : hT(fin + 60), passe ? hT(fin - 60) : hT(s + Math.abs(a - b) + 5)]),
      explanation: etapes("on ajoute les deux durées à l’heure de départ.", `${a} + ${b} = ${a + b} min ; ${hh(h, m1)} + ${dur(a + b)}.`, `tout est terminé à ${hT(fin)}.`),
      canvas: friseD(hh(h, m1), "?", [[`${a} min`, a], [`${b} min`, b]]),
    };
  }),
  // ★3 — un retard à cheval sur l'heure.
  P(7, 3, HINT_PONT, () => {
    const h = entre(8, 19);
    const m1 = entre(35, 58);
    const m2 = entre(2, 30);
    const d = 60 - m1 + m2;
    return {
      text: `${un(SITUATIONS_RETARD)(hh(h, m1), hh(h + 1, m2))} ${un(Q_RETARD)}`,
      ...qcm(`${d} min`, [`${100 - m1 + m2} min`, m1 - m2 !== d ? `${m1 - m2} min` : `${d + 10} min`, `${60 - m1} min`, dur(d + 60)]),
      explanation: etapes("on passe par l’heure pile.", `de ${hh(h, m1)} à ${hh(h + 1, 0)} : ${60 - m1} min ; puis ${m2} min. ${60 - m1} + ${m2} = ${d}.`, `le retard est de ${d} min.`),
      canvas: deuxHorlogesD([h, m1, "Prévu"], [h + 1, m2, "En vrai"]),
    };
  }),
];

/* ───────────── duree_defi ───────────── */

const DF = GD("duree_defi");
const ACTIONS_COMPARER = [
  "pour finir le puzzle", "pour faire le trajet jusqu’à la plage", "pour fabriquer un cerf-volant", "pour terminer la course d’orientation",
  "pour réparer un vélo", "pour préparer un gâteau", "pour nettoyer l’aquarium", "pour lire un roman", "pour ranger la chambre",
  "pour monter la tente", "pour faire les devoirs", "pour peindre la maquette",
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
const FRACTIONS_DEFI: [string, string, number, number, number][] = [
  // nom, étiquette de frise, valeur, lecture fautive (sur 100), autre fraction
  ["un quart d’heure", "¼ h", 15, 25, 30],
  ["une demi-heure", "½ h", 30, 50, 15],
  ["trois quarts d’heure", "¾ h", 45, 75, 30],
];
const SITUATIONS_FRACTION: ((f: string, m: number) => string)[] = [
  (f, m) => `La séance de sport commence par ${f} d’échauffement, puis ${m} min de match.`,
  (f, m) => `Le gâteau cuit ${f}, puis refroidit ${m} min.`,
  (f, m) => `${N()} joue du violon pendant ${f}, puis fait ${m} min de solfège.`,
  (f, m) => `Le jardinier arrose pendant ${f}, puis désherbe pendant ${m} min.`,
  (f, m) => `La classe marche ${f} jusqu’au lac, puis ${m} min autour du lac.`,
  (f, m) => `La coiffeuse passe ${f} sur la coupe et ${m} min sur la couleur.`,
  (f, m) => `Au parc, ${N()} fait ${f} de trottinette et ${m} min de balançoire.`,
  (f, m) => `La pâte repose ${f}, puis la pizza cuit ${m} min.`,
  (f, m) => `Le kiné masse le dos de Papi pendant ${f}, puis lui fait faire ${m} min d’exercices.`,
  (f, m) => `Le car roule ${f} jusqu’à la ferme, puis ${m} min jusqu’au château.`,
  (f, m) => `La bibliothécaire lit une histoire pendant ${f}, puis les enfants dessinent ${m} min.`,
  (f, m) => `Le pêcheur attend ${f} sans rien attraper, puis pêche encore ${m} min.`,
];
const SITUATIONS_DEPART: ((t: string, d: string) => string)[] = [
  (t, d) => `Le film se termine à ${t}. Il dure ${d}.`,
  (t, d) => `${N()} arrive chez sa grand-mère à ${t}, après ${d} de route.`,
  (t, d) => `Le pain sort du four du boulanger à ${t}, après ${d} de cuisson.`,
  (t, d) => `La randonnée se termine à ${t} ; elle a duré ${d}.`,
  (t, d) => `L’avion atterrit à ${t}, après ${d} de vol.`,
  (t, d) => `Le tournoi de ping-pong finit à ${t} ; il a duré ${d}.`,
  (t, d) => `La chirurgienne termine l’opération à ${t}, après ${d}.`,
  (t, d) => `Le concert finit à ${t}. Il a duré ${d}.`,
  (t, d) => `Le ferry accoste à ${t}, après une traversée de ${d}.`,
  (t, d) => `La classe rentre de la sortie au château à ${t} ; la sortie a duré ${d}.`,
  (t, d) => `Le maçon finit le muret à ${t} ; il y a travaillé ${d}.`,
  (t, d) => `Le gâteau de la pâtissière a cuit ${d} et sort du four à ${t}.`,
];
const SITUATIONS_LONGUES_ETAPES: ((t: string, a: string, b: string) => string)[] = [
  (t, a, b) => `La classe part en car à ${t}. Le trajet dure ${a}, puis la visite de la ferme ${b}.`,
  (t, a, b) => `Le cuisinier commence à ${t} : ${a} de préparation, puis ${b} de cuisson.`,
  (t, a, b) => `La randonnée commence à ${t} : ${a} de montée, puis ${b} de descente.`,
  (t, a, b) => `${N()} part de la maison à ${t}. Le train roule ${a}, puis le bus ${b}.`,
  (t, a, b) => `L’électricienne commence le chantier à ${t} : ${a} de câblage, puis ${b} de vérifications.`,
  (t, a, b) => `Le film commence à ${t}. Il dure ${a}, puis il y a ${b} de débat.`,
  (t, a, b) => `Le tournoi commence à ${t} : ${a} de matchs, puis ${b} de remise des médailles.`,
  (t, a, b) => `La pâtissière commence à ${t} : ${a} pour la pâte, puis ${b} de cuisson.`,
  (t, a, b) => `Le spectacle de l’école commence à ${t} : ${a} de danses, puis ${b} de chants.`,
  (t, a, b) => `Le vétérinaire commence à ${t} : ${a} d’opération, puis ${b} de surveillance.`,
  (t, a, b) => `La sortie au château commence à ${t} : ${a} de visite, puis ${b} de pique-nique.`,
  (t, a, b) => `Le maçon reprend à ${t} : ${a} de travail, puis ${b} de rangement.`,
];
const SERIES: ((n: number, s: number) => string)[] = [
  (n, s) => `Au club de natation, il y a ${n} courses de ${s} min`,
  (n, s) => `La maîtresse prévoit ${n} ateliers de ${s} min`,
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
const LIEUX_ARRIVEE = ["à la piscine", "au stade", "chez leur grand-mère", "au cinéma", "à la plage", "au marché", "à la bibliothèque", "au parc", "à l’école de musique", "au club de judo", "à la ferme pédagogique", "au zoo"];
const MOYENS = ["à vélo", "à pied", "en trottinette", "en rollers", "en bus", "en voiture"];
const SEJOURS = [
  "La classe de mer", "Le séjour au ski", "La course de voile", "La panne d’électricité du quartier", "Le festival de musique",
  "Le voyage en bateau", "La tempête", "La fête foraine du village", "La garde de la vétérinaire", "Le tournoi d’échecs", "Le camp scout",
];
const JOURS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];

const dureeDefiGabarits: TutorBankItemV4[] = [
  // ★3 — comparer une durée en h et min à une durée en minutes.
  DF(1, 3, "Écris les deux durées dans la même unité : 1 h = 60 min.", () => {
    const [A, B] = deuxPrenoms();
    const x = 60 + pas5(5, 50);
    const cas = Math.random();
    // Le piège : y est entre x et la fausse valeur « 1 h = 100 min ».
    const y = cas < 0.2 ? x : cas < 0.6 ? x + pas5(5, 35) : x - pas5(5, Math.min(30, x - 30));
    const plus = Math.random() < 0.5;
    const aMoins = x < y;
    const juste = x === y ? "Le même temps pour les deux" : plus === aMoins ? B : A;
    return {
      text: `${cap(un(ACTIONS_COMPARER))}, ${A} met ${dur(x)} et ${B} met ${y} min. ${plus ? un(["Qui a mis le plus de temps ?", "Qui a été le plus long ?"]) : un(["Qui a mis le moins de temps ?", "Qui a été le plus rapide ?"])}`,
      ...qcm(juste, [A, B, "Le même temps pour les deux"]),
      explanation: etapes("on écrit les deux durées en minutes.", `${dur(x)} = 60 + ${x - 60} = ${x} min ; on compare ${x} min et ${y} min.`, x === y ? "les deux durées sont égales." : `la réponse est ${juste}.`),
    };
  }),
  // ★3 — corriger une écriture où les minutes (ou secondes) dépassent 60.
  DF(2, 3, "Une écriture correcte a moins de 60 min (ou moins de 60 s) : 60 min font 1 h.", () => {
    const enHeures = Math.random() < 0.5;
    const [u1, u2] = enHeures ? ["h", "min"] : ["min", "s"];
    const h = enHeures ? entre(1, 2) : entre(1, 4);
    let M = pas5(65, 115);
    if (M === 100) M = 95;
    const e = `${h} ${u1} ${M} ${u2}`;
    return {
      text: `${un(SITUATIONS_ECRITURE)(e)} ${un(["Comment écrire correctement cette durée ?", "Quelle est la bonne écriture de cette durée ?", "Corrige cette écriture."])}`,
      ...qcm(`${h + 1} ${u1} ${M - 60} ${u2}`, [`${h} ${u1} ${M - 60} ${u2}`, `${h + 1} ${u1} ${M} ${u2}`, M > 100 ? `${h + 1} ${u1} ${M - 100} ${u2}` : `${h + 2} ${u1} ${M - 60} ${u2}`, "C’est déjà bien écrit"]),
      explanation: etapes(`${M} ${u2}, c’est plus de 60 ${u2}.`, `${M} ${u2} = 60 ${u2} + ${M - 60} ${u2} = 1 ${u1} ${M - 60} ${u2}.`, `${e} = ${h + 1} ${u1} ${M - 60} ${u2}.`),
    };
  }),
  // ★3 — fraction d'heure + minutes.
  DF(3, 3, "Un quart d’heure = 15 min, une demi-heure = 30 min, trois quarts d’heure = 45 min.", () => {
    const [nom, lab, v, lu, autre] = un(FRACTIONS_DEFI);
    const m = pas5(20, 55);
    const total = v + m;
    return {
      text: `${un(SITUATIONS_FRACTION)(nom, m)} ${un(["Combien de temps cela dure-t-il en tout ?", "Quelle est la durée totale ?", "Combien de temps cela fait-il au total ?"])}`,
      ...qcm(dur(total), [dur(lu + m), dur(m), dur(autre + m), dur(total + 60)]),
      explanation: etapes("on convertit la fraction d’heure en minutes, puis on additionne.", `${nom} = ${v} min ; ${v} + ${m} = ${total} min.`, `en tout : ${dur(total)}.`),
      canvas: friseD("début", "fin", [[lab, v], [`${m} min`, m]]),
    };
  }),
  // ★4 — retrouver l'heure de départ en remontant une durée en h et min.
  DF(4, 4, "Enlève d’abord les heures, puis les minutes en passant par l’heure pile.", () => {
    const h2 = entre(11, 19);
    const m2 = pas5(0, 25);
    const k = entre(1, 2);
    const dm = pas5(m2 + 5, 55);
    const fin = 60 * h2 + m2;
    const d = 60 * k + dm;
    const debut = fin - d;
    return {
      text: `${un(SITUATIONS_DEPART)(hh(h2, m2), dur(d))} ${un(Q_DEBUT)}`,
      ...qcm(hT(debut), [hT(fin + d), `${h2 - k - 1} h ${100 + m2 - dm}`, `${h2 - k} h ${pad2(60 + m2 - dm)}`]),
      explanation: etapes(
        "on remonte le temps : d’abord les heures, puis les minutes.",
        m2 === 0 ? `${hh(h2, 0)} − ${k} h = ${hh(h2 - k, 0)} ; puis ${hh(h2 - k, 0)} − ${dm} min = ${hT(debut)}.` : `${hh(h2, m2)} − ${k} h = ${hh(h2 - k, m2)} ; puis − ${dm} min : ${m2} min pour revenir à ${hh(h2 - k, 0)}, puis encore ${dm - m2} min.`,
        `le début était à ${hT(debut)}.`,
      ),
      canvas: horlogeD(h2, m2, "Fin"),
    };
  }),
  // ★4 — deux étapes longues, heure de fin.
  DF(5, 4, "Ajoute les heures, puis les minutes ; passe l’heure si les minutes dépassent 60.", () => {
    const h = entre(8, 14);
    const m1 = pas5(0, 55);
    const d1 = 60 + pas5(5, 50);
    const d2 = pas5(15, 50);
    const s = 60 * h + m1;
    const fin = s + d1 + d2;
    const mins = m1 + (d1 - 60) + d2;
    return {
      text: `${un(SITUATIONS_LONGUES_ETAPES)(hh(h, m1), dur(d1), dur(d2))} ${un(Q_TOUT_FINI)}`,
      ...qcm(hT(fin), [hT(s + d1), hT(fin - 60), mins >= 60 && mins < 100 ? `${h + 1} h ${mins}` : hT(fin + 60)]),
      explanation: etapes("on ajoute les deux durées à l’heure de départ.", `${dur(d1)} + ${d2} min = ${dur(d1 + d2)} ; ${hh(h, m1)} + ${dur(d1 + d2)}.`, `tout est terminé à ${hT(fin)}.`),
      canvas: friseD(hh(h, m1), "?", [[dur(d1), d1], [dur(d2), d2]]),
    };
  }),
  // ★4 — séances et pauses.
  DF(6, 4, "Compte bien les pauses : entre 3 séances, il n’y a que 2 pauses.", () => {
    const n = entre(2, 3);
    const s = pas5(15, 30);
    const p = pas5(5, 15);
    const h = entre(8, 15);
    const m1 = pas5(0, 55);
    const s0 = 60 * h + m1;
    const tot = n * s + (n - 1) * p;
    const fin = s0 + tot;
    const etapesFrise: [string, number, string?][] = [];
    for (let k = 0; k < n; k++) {
      etapesFrise.push([`${s} min`, s]);
      if (k < n - 1) etapesFrise.push(["", p, "#94a3b8"]);
    }
    return {
      text: `${un(SERIES)(n, s)}, avec une pause de ${p} min entre deux. Cela commence à ${hh(h, m1)}. ${un(Q_TOUT_FINI)}`,
      ...qcm(hT(fin), [hT(s0 + n * s + n * p), hT(s0 + n * s), m1 + tot >= 60 && m1 + tot < 100 ? `${h} h ${m1 + tot}` : hT(fin + 60)]),
      explanation: etapes(`${n} séances, donc ${n - 1} pause${n > 2 ? "s" : ""}.`, `${n} × ${s} + ${n - 1} × ${p} = ${tot} min = ${dur(tot)}.`, `tout est fini à ${hT(fin)}.`),
      canvas: friseD(hh(h, m1), "?", etapesFrise),
    };
  }),
  // ★4 — qui arrive le premier ?
  DF(7, 4, "Calcule l’heure d’arrivée de chacun, puis compare.", () => {
    const [A, B] = deuxPrenoms();
    const h = entre(8, 16);
    const m1 = pas5(0, 40);
    const t1 = 60 * h + m1;
    const t2 = t1 + pas5(5, 20);
    const d1 = pas5(t2 - t1 + 15, 55);
    const fin1 = t1 + d1;
    const cas = Math.random();
    const d2 = cas < 0.2 ? fin1 - t2 : cas < 0.6 ? fin1 - t2 - pas5(5, Math.max(5, fin1 - t2 - 5)) : fin1 - t2 + pas5(5, 20);
    const fin2 = t2 + d2;
    const juste = fin1 === fin2 ? "Les deux en même temps" : fin1 < fin2 ? A : B;
    const [moyen1, moyen2] = melangeEnPlace([...MOYENS]);
    return {
      text: `${A} part ${moyen1} à ${hT(t1)} et met ${d1} min pour aller ${un(LIEUX_ARRIVEE)}. ${B} part ${moyen2} à ${hT(t2)} et met ${d2} min. ${un(["Qui arrive le premier ?", "Lequel des deux arrive en premier ?", "Qui est là le premier ?"])}`,
      ...qcm(juste, [A, B, "Les deux en même temps"]),
      explanation: etapes("on calcule chaque heure d’arrivée.", `${A} : ${hT(t1)} + ${d1} min = ${hT(fin1)}. ${B} : ${hT(t2)} + ${d2} min = ${hT(fin2)}.`, juste === "Les deux en même temps" ? "ils arrivent en même temps." : `${juste} arrive le premier.`),
      canvas: deuxHorlogesD([h, m1, A], [Math.floor(t2 / 60), t2 % 60, B]),
    };
  }),
  // ★4 — sur plusieurs jours.
  DF(8, 4, "1 jour = 24 h : compte d’abord les jours entiers, puis les heures en plus ou en moins.", () => {
    const i = entre(0, 4);
    const k = entre(1, 2);
    const h1 = entre(8, 18);
    let h2 = entre(7, 20);
    if (h2 === h1) h2 += 1;
    const T = 24 * k + h2 - h1;
    return {
      text: `${un(SEJOURS)} commence le ${JOURS[i]} à ${h1} h et se termine le ${JOURS[i + k]} à ${h2} h. ${un(["Combien d’heures cela dure-t-il ?", "Quelle est sa durée en heures ?", "Combien d’heures cela fait-il en tout ?"])}`,
      ...qcm(`${T} h`, [`${24 * k} h`, `${24 * (k + 1) + h2 - h1} h`, `${24 * k + h1 - h2} h`]),
      explanation: etapes(
        "on compte les jours entiers, puis on ajuste avec les heures.",
        `du ${JOURS[i]} ${h1} h au ${JOURS[i + k]} ${h1} h : ${24 * k} h ; puis ${h2 > h1 ? `+ ${h2 - h1}` : `− ${h1 - h2}`} h.`,
        `cela dure ${T} h.`,
      ),
    };
  }),
];

const GABARITS_DUREE_CM1: TutorBankItemV4[] = [
  ...dureeLireGabarits,
  ...dureeConvertirGabarits,
  ...dureeCalculerGabarits,
  ...dureeProblemeGabarits,
  ...dureeDefiGabarits,
];

export const dureesBank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une horloge, la petite aiguille est sur le 3 et la grande sur le 12. Quelle heure est-il ?",
    format: "qcm",
    choices: ["3 h 00","12 h 03","3 h 12","12 h 15"],
    expected: ["3 h 00"],
    comparator: "mcq_exact",
    hint: "Petite aiguille = heures, grande aiguille = minutes.",
    explanation: "La petite aiguille sur 3 donne 3 heures, la grande sur 12 donne 0 minute : il est 3 h 00.",
    tags: ["cm1","duree","duree_lire","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Un bus part à 8 h 00 et arrive à 8 h 45. Combien de temps dure le trajet ?",
    format: "qcm",
    choices: ["45 min","1 h","55 min","35 min"],
    expected: ["45 min"],
    comparator: "mcq_exact",
    hint: "Compte les minutes entre le départ et l'arrivée.",
    explanation: "De 8 h 00 à 8 h 45, il s'écoule 45 minutes.",
    tags: ["cm1","duree","duree_calculer","guide","qcm"],
  },
  {
    kind: "fixed",
    id: "cm1_duree_probleme_fixed_g1",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "À l'arrêt de Saint-Pierre, il est 7 h 10 et le bus part à 7 h 25. Combien de temps faut-il attendre ?",
    format: "qcm",
    choices: ["15 min","25 min","35 min","5 min"],
    expected: ["15 min"],
    comparator: "mcq_exact",
    hint: "Calcule l'écart entre les deux horaires.",
    explanation: "De 7 h 10 à 7 h 25, on attend 15 minutes.",
    tags: ["cm1","duree","duree_probleme","guide","qcm"],
  },

  // ============================================================
  // DUREE_LIRE
  // Lire une heure ou une durée
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_001_heure_pleine",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure indique l’horloge de la classe ?",
    format: "qcm",
    choices: ["3 h 00", "12 h 15", "6 h 00", "3 h 30"],
    expected: ["3 h 00"],
    comparator: "mcq_exact",
    hint: "La grande aiguille est sur le 12 : il est pile une heure.",
    explanation: exp(
      "Lire l’heure, c’est observer les deux aiguilles.",
      "La petite aiguille indique l’heure. La grande aiguille indique les minutes.",
      "La grande aiguille est sur 12, donc il y a 00 minute. La petite aiguille indique 3.",
      "L’horloge indique 3 h 00."
    ),
    tags: ["cm1", "duree", "lire", "horloge", "heure_pleine", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Quelle heure ?",
      time: {
        hour: 3,
        minute: 0,
        label: "Heure pleine",
      },
      colors: watchColors(0),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_002_demie_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure indique la pendule de la cuisine ?",
    format: "qcm",
    choices: ["4 h 30", "4 h 00", "5 h 30", "6 h 20"],
    expected: ["4 h 30"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 6 indique 30 minutes.",
    explanation: exp(
      "Une demi-heure correspond à 30 minutes.",
      "On lit d’abord les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 6, donc cela fait 30 minutes. La petite aiguille est entre 4 et 5.",
      "L’horloge indique 4 h 30."
    ),
    tags: ["cm1", "duree", "lire", "demi_heure", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "La demi-heure",
      time: {
        hour: 4,
        minute: 30,
        label: "Demi-heure",
      },
      colors: watchColors(1),
    }),
  },

    // ============================================================
  // DUREE_CONVERTIR
  // Convertir des durées simples
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_convertir_fixed_001_1h_60min",
    niveau: "cm1",
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
    hint: "Une heure contient 60 minutes.",
    explanation:
      "Une heure contient 60 minutes. C’est une règle importante pour travailler sur les durées.",
    tags: ["cm1", "duree", "convertir", "heure_minute", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_duree_convertir_fixed_002_demie_heure",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Une demi-heure correspond à...",
    format: "qcm",
    choices: ["30 min", "50 min", "15 min", "60 min"],
    expected: ["30 min"],
    comparator: "mcq_exact",
    hint: "Une demi-heure, c’est la moitié de 60 minutes.",
    explanation:
      "Une heure contient 60 minutes. La moitié de 60 est 30. Donc une demi-heure correspond à 30 minutes.",
    tags: ["cm1", "duree", "convertir", "demi_heure", "qcm"],
  },

    // ============================================================
  // DUREE_CALCULER
  // Calculer une durée simple
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_001_ecart_1h",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 1,
    theme: "neutral",
    text: "Une activité commence à 8 h 00 et finit à 9 h 00. Quelle est sa durée en minutes ?",
    format: "qcm",
    choices: ["60 min", "100 min", "1 min", "90 min"],
    expected: ["60 min"],
    comparator: "mcq_exact",
    hint: "De 8 h à 9 h, il y a 1 heure.",
    explanation:
      "De 8 h 00 à 9 h 00, il y a 1 heure. Or 1 heure = 60 minutes. La durée est donc 60 minutes.",
    tags: ["cm1", "duree", "calculer", "ecart", "heure", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Début et fin",
      start: {
        hour: 8,
        minute: 0,
        label: "Début",
      },
      end: {
        hour: 9,
        minute: 0,
        label: "Fin",
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_002_ajouter_30min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une séance commence à 10 h 15 et dure 30 minutes. À quelle heure se termine-t-elle ?",
    format: "qcm",
    choices: ["10 h 45", "10 h 30", "11 h 15", "9 h 45"],
    expected: ["10 h 45"],
    comparator: "mcq_exact",
    hint: "Ajoute 30 minutes à 10 h 15.",
    explanation:
      "On ajoute la durée à l’heure de départ. 10 h 15 + 30 min = 10 h 45. La séance se termine à 10 h 45.",
    tags: ["cm1", "duree", "calculer", "heure_fin", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "On ajoute 30 minutes",
      frise: {
        startLabel: "10 h 15",
        endLabel: "10 h 45",
        steps: [
          {
            label: "+ 30 min",
            minutes: 30,
            color: "#22c55e",
          },
        ],
      },
      colors: watchColors(2),
    }),
  },

    // ============================================================
  // DUREE_PROBLEME
  // Résoudre un problème simple de durées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_probleme_fixed_001_bus_reunion",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "À Saint-Pierre, il est 7 h 10. Le bus part à 7 h 25. Dans combien de minutes part-il ?",
    format: "qcm",
    choices: ["15 min", "25 min", "35 min", "10 min"],
    expected: ["15 min"],
    comparator: "mcq_exact",
    hint: "Compte de 7 h 10 à 7 h 25.",
    explanation:
      "On cherche un temps d’attente : c’est une durée entre deux horaires. " +
      "De 7 h 10 à 7 h 25, il y a 15 minutes. " +
      "Le bus part donc dans 15 minutes.",
    tags: ["cm1", "duree", "probleme", "bus", "reunion", "attente", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Attente du bus",
      start: {
        hour: 7,
        minute: 10,
        label: "Maintenant",
      },
      end: {
        hour: 7,
        minute: 25,
        label: "Départ",
      },
      colors: watchColors(1),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_probleme_fixed_002_cuisson_simple",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "Un gâteau est mis au four à 16 h 20. Il doit cuire 30 minutes. À quelle heure sera-t-il cuit ?",
    format: "qcm",
    choices: ["16 h 50", "16 h 30", "17 h 20", "15 h 50"],
    expected: ["16 h 50"],
    comparator: "mcq_exact",
    hint: "Ajoute 30 minutes à 16 h 20.",
    explanation:
      "On cherche une heure de fin. Pour cela, on ajoute la durée de cuisson à l’heure de départ. " +
      "16 h 20 + 30 minutes = 16 h 50. " +
      "Le gâteau sera donc cuit à 16 h 50.",
    tags: ["cm1", "duree", "probleme", "cuisson", "heure_fin", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Cuisson du gâteau",
      frise: {
        startLabel: "16 h 20",
        endLabel: "16 h 50",
        steps: [
          {
            label: "+ 30 min",
            minutes: 30,
            color: "#22c55e",
          },
        ],
      },
      colors: watchColors(2),
    }),
  },

    // ============================================================
  // DUREE_DEFI
  // Résoudre un défi de durées
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_defi_fixed_001_erreur_1h75",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : “1 h 75, c’est correct.” A-t-il raison ?",
    format: "qcm",
    choices: ["Oui, c’est bien écrit", "Non, on écrit 2 h 15", "Non, on écrit 1 h 15"],
    expected: ["Non, on écrit 2 h 15"],
    comparator: "mcq_exact",
    hint: "Dès qu’on a 60 minutes, cela fait 1 heure.",
    explanation:
      "L’élève confond avec une écriture en base 100. " +
      "Dans les durées, 60 minutes forment 1 heure. " +
      "Donc on ne laisse pas 75 minutes après le h. " +
      "75 min = 1 h 15, donc 1 h 75 correspondrait à 2 h 15. L’écriture 1 h 75 n’est pas correcte.",
    tags: ["cm1", "duree", "defi", "erreur", "base_60", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_duree_defi_fixed_002_comparer_1h20_90min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle durée est la plus longue : 1 h 20 ou 90 min ?",
    format: "qcm",
    choices: ["1 h 20", "90 min", "elles sont égales"],
    expected: ["90 min"],
    comparator: "mcq_exact",
    hint: "Convertis 1 h 20 en minutes.",
    explanation:
      "Pour comparer deux durées, on les écrit dans la même unité. " +
      "1 h 20 = 60 min + 20 min = 80 min. " +
      "On compare donc 80 min et 90 min. " +
      "90 min est plus long que 1 h 20.",
    tags: ["cm1", "duree", "defi", "comparer", "conversion", "qcm"],
  },

  // ============================================================
  // TOP-UP — DUREE_LIRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_003_heure_pleine",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "Quelle heure est-il sur le réveil de Sacha ?",
    format: "qcm",
    choices: ["7 h 00", "7 h 30", "8 h 00", "6 h 00"],
    expected: ["7 h 00"],
    comparator: "mcq_exact",
    hint: "La grande aiguille est sur le 12 : il est pile une heure.",
    explanation: exp(
      "Lire l’heure, c’est observer les deux aiguilles.",
      "La petite aiguille indique l’heure, la grande indique les minutes.",
      "La grande aiguille est sur 12, donc 00 minute. La petite aiguille indique 7.",
      "L’horloge indique 7 h 00."
    ),
    tags: ["cm1", "duree", "lire", "horloge", "heure_pleine", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Quelle heure ?",
      time: { hour: 7, minute: 0, label: "Heure pleine" },
      colors: watchColors(0),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_004_quart",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle heure indique l’horloge ?",
    format: "qcm",
    choices: ["9 h 15", "9 h 45", "9 h 00", "3 h 45"],
    expected: ["9 h 15"],
    comparator: "mcq_exact",
    hint: "La grande aiguille sur le 3 indique 15 minutes.",
    explanation: exp(
      "Un quart d’heure correspond à 15 minutes.",
      "On lit d’abord les minutes avec la grande aiguille.",
      "La grande aiguille est sur le 3, donc 15 minutes. La petite aiguille est juste après 9.",
      "L’horloge indique 9 h 15."
    ),
    tags: ["cm1", "duree", "lire", "quart", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      title: "Le quart d’heure",
      time: { hour: 9, minute: 15, label: "Quart" },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_lire_fixed_005_digital",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_lire",
    difficulty: 1,
    theme: "neutral",
    text: "L’affichage indique 06:45. Comment écrit-on cette heure ?",
    format: "qcm",
    choices: ["6 h 45", "45 h 06", "6 h 30", "7 h 45"],
    expected: ["6 h 45"],
    comparator: "mcq_exact",
    hint: "Le nombre avant les deux points donne les heures, celui après donne les minutes.",
    explanation: exp(
      "Une heure peut s’écrire avec deux points, comme sur un réveil.",
      "Le nombre avant les deux points donne les heures, celui après donne les minutes.",
      "06:45 donne 6 heures et 45 minutes.",
      "On écrit 6 h 45."
    ),
    tags: ["cm1", "duree", "lire", "digital", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "digital",
      title: "Affichage numérique",
      digital: { text: "06:45", label: "Lis l’heure" },
      colors: watchColors(1),
    }),
  },

  // ============================================================
  // TOP-UP — DUREE_CONVERTIR
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_convertir_fixed_003_minute_secondes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de secondes dans 1 minute ?",
    format: "qcm",
    choices: ["60 s", "100 s", "30 s", "10 s"],
    expected: ["60 s"],
    comparator: "mcq_exact",
    hint: "Une minute contient 60 secondes.",
    explanation:
      "Une minute contient 60 secondes. C’est une règle importante pour travailler sur les durées.",
    tags: ["cm1", "duree", "convertir", "minute_seconde", "qcm"],
  },

  // ============================================================
  // TOP-UP — DUREE_CALCULER
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_003_ecart_45min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une activité commence à 14 h 00 et finit à 14 h 45. Quelle est sa durée en minutes ?",
    format: "qcm",
    choices: ["45 min", "1 h 45 min", "55 min", "15 min"],
    expected: ["45 min"],
    comparator: "mcq_exact",
    hint: "Les deux horaires sont dans la même heure.",
    explanation:
      "Les deux horaires sont dans la même heure. On calcule l’écart entre les minutes : 45 - 0 = 45. La durée est 45 minutes.",
    tags: ["cm1", "duree", "calculer", "ecart", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      title: "Début et fin",
      start: { hour: 14, minute: 0, label: "Début" },
      end: { hour: 14, minute: 45, label: "Fin" },
      colors: watchColors(2),
    }),
  },

  {
    kind: "fixed",
    id: "cm1_duree_calculer_fixed_004_ajouter_20min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "Une séance commence à 9 h 30 et dure 20 minutes. À quelle heure se termine-t-elle ?",
    format: "qcm",
    choices: ["9 h 50", "9 h 40", "10 h 30", "9 h 20"],
    expected: ["9 h 50"],
    comparator: "mcq_exact",
    hint: "Ajoute 20 minutes à 9 h 30.",
    explanation:
      "On ajoute la durée à l’heure de départ. 9 h 30 + 20 min = 9 h 50. La séance se termine à 9 h 50.",
    tags: ["cm1", "duree", "calculer", "heure_fin", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "On ajoute 20 minutes",
      frise: {
        startLabel: "9 h 30",
        endLabel: "9 h 50",
        steps: [{ label: "+ 20 min", minutes: 20, color: "#22c55e" }],
      },
      colors: watchColors(1),
    }),
  },

  // ============================================================
  // TOP-UP — DUREE_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_probleme_fixed_003_recreation",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_probleme",
    difficulty: 2,
    theme: "neutral",
    text: "La récréation commence à 10 h 15 et dure 15 minutes. À quelle heure se termine-t-elle ?",
    format: "qcm",
    choices: ["10 h 30", "10 h 15", "10 h 45", "11 h 15"],
    expected: ["10 h 30"],
    comparator: "mcq_exact",
    hint: "Ajoute 15 minutes à 10 h 15.",
    explanation:
      "On cherche une heure de fin. On ajoute la durée à l’heure de départ. " +
      "10 h 15 + 15 min = 10 h 30. La récréation se termine à 10 h 30.",
    tags: ["cm1", "duree", "probleme", "ecole", "heure_fin", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "frise",
      title: "Récréation",
      frise: {
        startLabel: "10 h 15",
        endLabel: "10 h 30",
        steps: [{ label: "+ 15 min", minutes: 15, color: "#22c55e" }],
      },
      colors: watchColors(2),
    }),
  },

  // ============================================================
  // TOP-UP — DUREE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm1_duree_defi_fixed_003_comparer_2h_100min",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle durée est la plus longue : 2 h ou 100 min ?",
    format: "qcm",
    choices: ["2 h", "100 min", "elles sont égales"],
    expected: ["2 h"],
    comparator: "mcq_exact",
    hint: "Convertis 2 h en minutes.",
    explanation:
      "Pour comparer deux durées, on les écrit dans la même unité. " +
      "2 h = 2 × 60 = 120 minutes. On compare 120 min et 100 min. " +
      "2 h est plus long que 100 min.",
    tags: ["cm1", "duree", "defi", "comparer", "conversion", "qcm"],
  },

  {
    kind: "fixed",
    id: "cm1_duree_defi_fixed_004_1h30_minutes",
    niveau: "cm1",
    matiere: "maths",
    notionId: "duree",
    microId: "duree_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de minutes y a-t-il dans 1 h 30 ?",
    format: "qcm",
    choices: ["90 min", "130 min", "80 min", "31 min"],
    expected: ["90 min"],
    comparator: "mcq_exact",
    hint: "1 heure = 60 minutes, puis ajoute 30.",
    explanation:
      "On convertit l’heure en minutes, puis on ajoute les minutes restantes. " +
      "1 h = 60 min, et 60 + 30 = 90. Donc 1 h 30 = 90 minutes.",
    tags: ["cm1", "duree", "defi", "conversion"],
  },

  // Gabarits du 14/11/2026 (situations × tournures), voir plus haut.
  ...GABARITS_DUREE_CM1,
];