// lib/tutor-v4/questionBank/ce2/maths/duree.bank.ts
//
// Le temps et les durées du CE2, écrits à la main. Six micro-compétences qui
// passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : lire l'heure sur une
// horloge à aiguilles, positionner les aiguilles, les relations 1 h = 60 min et
// 1 jour = 24 h, et calculer une durée écoulée DANS LA JOURNÉE. Pas de durée à
// cheval sur minuit, pas de secondes en calcul : cela vient plus tard.
//
// LE PIÈGE DE LA NOTION : la petite aiguille. À 3 h 45 elle est presque sur le
// 4, et l'élève lit « 4 h 45 ». Elle avance pendant l'heure, elle ne saute pas
// d'un chiffre à l'autre. Tant qu'elle n'a pas ATTEINT le 4, il n'est pas
// encore 4 heures.
// Son cousin arrive dans les calculs : une heure vaut 60 minutes, pas 100.
// 2 h 40 + 30 min ne fait pas 2 h 70 mais 3 h 10.
//
// ⛔ CANVAS : `display.showDigital` écrit l'heure en chiffres sous le cadran.
// Il est à false par défaut et on ne le rallume JAMAIS sur une question de
// lecture — ce serait donner la réponse. La variante `double_horloge` est sûre
// pour les durées écoulées : elle montre le début et la fin, l'écart reste à
// trouver.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { DureeCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { choix, deuxPersonnes, gabarit, pick, quelquun, rint, tirer, type Etoile, type Q } from "./outils-mesures-ce2";

function dureeCanvas(data: Omit<DureeCanvasData, "kind">): DureeCanvasData {
  return { kind: "duree", ...data };
}

/** 15 h 5 s'écrit « 15 h 05 » : les minutes tiennent sur deux chiffres. */
function heure(h: number, m: number): string {
  return m === 0 ? `${h} h` : `${h} h ${String(m).padStart(2, "0")}`;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const dureeBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_DUREE_LIRE_HEURE — lire l'horloge à aiguilles
     Le piège de la petite aiguille est ici, et il revient
     dans les défis.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_duree_lire_heure_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_lire_heure",
    difficulty: 1,
    theme: "neutral",
    text: "Sur une horloge à aiguilles, laquelle des deux aiguilles donne les heures ?",
    format: "qcm",
    choices: [
      "la petite aiguille",
      "la grande aiguille",
      "les deux ensemble",
      "celle qui bouge le plus vite",
    ],
    expected: ["la petite aiguille"],
    comparator: "mcq_exact",
    hint: "Celle qui tourne le plus lentement met douze heures à faire le tour.",
    explanation: exp(
      "La petite aiguille donne les heures, la grande donne les minutes.",
      "On repère d'abord la petite, puis on lit ce qu'elle vient de dépasser.",
      "La petite aiguille met une heure à passer d'un chiffre au suivant, la grande en fait le tour complet pendant ce temps. C'est la lente qui compte les heures.",
      "C'est la petite aiguille.",
    ),
    tags: ["ce2", "duree", "lire_heure", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_lire_heure_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_lire_heure",
    difficulty: 4,
    theme: "neutral",
    text: "Sur cette horloge, la petite aiguille est presque sur le 4 et la grande est sur le 9. Un élève lit « 4 h 45 ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, il est 3 h 45",
      "oui",
      "non, il est 4 h 09",
      "non, il est 9 h 20",
    ],
    expected: ["non, il est 3 h 45"],
    comparator: "mcq_exact",
    hint: "La petite aiguille a-t-elle ATTEINT le 4 ?",
    explanation: exp(
      "La petite aiguille avance pendant toute l'heure : elle ne saute pas d'un chiffre à l'autre.",
      "On lit le chiffre que la petite aiguille a DÉPASSÉ, pas celui vers lequel elle se dirige.",
      "Elle a dépassé le 3 et s'approche du 4 sans l'avoir atteint : il est donc 3 heures passées. La grande sur le 9 donne 9 × 5 = 45 minutes. Il est 3 h 45.",
      "Non : il est 3 h 45.",
    ),
    tags: ["ce2", "duree", "lire_heure", "piege", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "horloge",
      time: { hour: 3, minute: 45 },
      display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_duree_lire_heure_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    text: "La grande aiguille est sur le 6. Combien de minutes cela fait-il ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Chaque chiffre de l'horloge vaut 5 minutes pour la grande aiguille.",
    explanation: exp(
      "Pour la grande aiguille, chaque chiffre de l'horloge vaut 5 minutes.",
      "On multiplie le chiffre par 5.",
      "6 × 5 = 30. La grande aiguille sur le 6, c'est la demie : elle a fait la moitié du tour.",
      "Cela fait 30 minutes.",
    ),
    tags: ["ce2", "duree", "lire_heure", "remarquable"],
  },

  /* =========================================================
     CE2_DUREE_POSITIONNER_AIGUILLES — placer les aiguilles
     La lecture à l'envers : on connaît l'heure, on cherche
     où pointent les aiguilles.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_duree_positionner_aiguilles_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_positionner_aiguilles",
    difficulty: 2,
    theme: "neutral",
    text: "Pour afficher 7 h 45, sur quel nombre doit pointer la GRANDE aiguille ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Chaque nombre vaut 5 minutes. Combien de fois 5 dans 45 ?",
    explanation: exp(
      "Pour la grande aiguille, chaque nombre de l'horloge vaut 5 minutes.",
      "On partage le nombre de minutes par 5 pour trouver le nombre visé.",
      "45 ÷ 5 = 9. La grande aiguille pointe donc sur le 9.",
      "Elle pointe sur le 9.",
    ),
    tags: ["ce2", "duree", "positionner_aiguilles"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_positionner_aiguilles_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_positionner_aiguilles",
    difficulty: 4,
    theme: "neutral",
    text: "Pour afficher 5 h 50, où se trouve la PETITE aiguille ?",
    format: "qcm",
    choices: [
      "entre le 5 et le 6, tout près du 6",
      "exactement sur le 5",
      "exactement sur le 6",
      "entre le 5 et le 6, tout près du 5",
    ],
    expected: ["entre le 5 et le 6, tout près du 6"],
    comparator: "mcq_exact",
    hint: "Il ne manque que 10 minutes pour qu'il soit 6 heures.",
    explanation: exp(
      "La petite aiguille avance sans arrêt pendant l'heure : à la fin de l'heure, elle a rejoint le nombre suivant.",
      "On regarde où on en est dans l'heure : au début, au milieu, ou tout près de la fin.",
      "À 5 h 50, il ne manque que 10 minutes pour atteindre 6 heures. La petite aiguille a donc presque fini son trajet du 5 vers le 6 : elle est juste avant le 6.",
      "Elle est entre le 5 et le 6, tout près du 6.",
    ),
    tags: ["ce2", "duree", "positionner_aiguilles", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_positionner_aiguilles_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_positionner_aiguilles",
    difficulty: 2,
    theme: "neutral",
    text: "À quelle heure les deux aiguilles se superposent-elles exactement sur le 12 ?",
    format: "qcm",
    choices: ["à midi", "à 6 heures", "à 3 heures", "jamais"],
    expected: ["à midi"],
    comparator: "mcq_exact",
    hint: "Quand la grande est sur le 12, il est « pile ». Et la petite ?",
    explanation: exp(
      "Les deux aiguilles pointent le même nombre quand l'heure est pile ET que ce nombre est celui de l'heure.",
      "On cherche l'heure où la petite aiguille est sur le 12 : c'est minuit ou midi.",
      "Quand la grande est sur le 12, il est une heure pile. Pour que la petite y soit aussi, il faut qu'il soit 12 heures : midi (ou minuit).",
      "À midi, les deux aiguilles sont sur le 12.",
    ),
    tags: ["ce2", "duree", "positionner_aiguilles", "remarquable", "qcm"],
  },

  /* =========================================================
     CE2_DUREE_CONVERTIR — heures et minutes
     Une heure vaut 60 minutes, pas 100. C'est la source de
     toutes les erreurs de calcul qui suivent.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_duree_convertir_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_convertir",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de minutes dans 1 heure ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Regarde les petits traits autour du cadran : compte-les.",
    explanation: exp(
      "1 heure vaut 60 minutes.",
      "On compte les petits traits du cadran : il y en a 60, un par minute.",
      "La grande aiguille passe sur les 60 traits en une heure. Elle croise 12 nombres, et 12 × 5 = 60.",
      "1 h = 60 min.",
    ),
    tags: ["ce2", "duree", "convertir", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_convertir_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_convertir",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 h = 100 min ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 h = 60 min",
      "oui",
      "non, 1 h = 24 min",
      "non, 1 h = 12 min",
    ],
    expected: ["non, 1 h = 60 min"],
    comparator: "mcq_exact",
    hint: "Compte les petits traits du cadran.",
    explanation: exp(
      "1 heure vaut 60 minutes, pas 100.",
      "On revient au cadran : il porte 60 petits traits, un par minute.",
      "Le temps ne se compte pas comme l'argent. Après 59 minutes vient l'heure suivante, jamais 60, 70, 80… C'est pour cela que 2 h 40 + 30 min fait 3 h 10, et non 2 h 70.",
      "Non : 1 h = 60 min.",
    ),
    tags: ["ce2", "duree", "convertir", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_convertir_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_convertir",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il d'heures dans une journée entière ?",
    format: "short",
    expected: ["24"],
    comparator: "number_equal",
    hint: "La petite aiguille fait deux fois le tour du cadran.",
    explanation: exp(
      "Une journée dure 24 heures.",
      "On compte les deux tours de la petite aiguille : celui du matin et celui de l'après-midi.",
      "Le cadran ne porte que 12 nombres. La petite aiguille en fait donc deux tours par jour : 12 + 12 = 24.",
      "Une journée dure 24 h.",
    ),
    tags: ["ce2", "duree", "convertir", "remarquable"],
  },

  /* =========================================================
     CE2_DUREE_CALCULER — la durée écoulée
     Le BO dit « dans la journée » : on ne passe pas minuit.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_duree_calculer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_calculer",
    difficulty: 2,
    theme: "neutral",
    text: "La récréation commence à 10 h 15 et se termine à 10 h 45. Combien de temps dure-t-elle, en minutes ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Les deux heures sont les mêmes : compare seulement les minutes.",
    explanation: exp(
      "Une durée, c'est l'écart entre le début et la fin.",
      "Quand l'heure ne change pas, il suffit de soustraire les minutes.",
      "45 - 15 = 30. La récréation dure 30 minutes, soit une demi-heure.",
      "Elle dure 30 minutes.",
    ),
    tags: ["ce2", "duree", "calculer"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_calculer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_calculer",
    difficulty: 4,
    theme: "neutral",
    text: "Un film commence à 14 h 40 et se termine à 16 h 10. Un élève calcule 16 - 14 = 2 et 40 - 10 = 30, et répond « 2 h 30 ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, le film dure 1 h 30",
      "oui",
      "non, le film dure 2 h 50",
      "non, le film dure 1 h 50",
    ],
    expected: ["non, le film dure 1 h 30"],
    comparator: "mcq_exact",
    hint: "Avance par étapes : d'abord jusqu'à 15 h, puis jusqu'à 16 h 10.",
    explanation: exp(
      "Une durée se cherche en avançant du début vers la fin, pas en soustrayant les colonnes séparément.",
      "On avance jusqu'à l'heure ronde suivante, puis d'heure en heure, puis on ajoute les minutes qui restent.",
      "De 14 h 40 à 15 h : 20 minutes. De 15 h à 16 h : 1 heure. De 16 h à 16 h 10 : 10 minutes. En tout : 1 h et 20 + 10 = 30 minutes, soit 1 h 30. L'élève a soustrait les minutes à l'envers.",
      "Non : le film dure 1 h 30.",
    ),
    tags: ["ce2", "duree", "calculer", "piege", "qcm", "canvas"],
    canvas: dureeCanvas({
      variant: "double_horloge",
      // `normalizeHour` fait le modulo 12 : on passe l'heure vraie, le cadran
      // place les aiguilles au bon endroit.
      start: { hour: 14, minute: 40, label: "Début — 14 h 40" },
      end: { hour: 16, minute: 10, label: "Fin — 16 h 10" },
      display: { showNumbers: true, showMinuteTicks: true, showLabels: true, showDigital: false },
    }),
  },
  {
    kind: "fixed",
    id: "ce2_duree_calculer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_calculer",
    difficulty: 3,
    theme: "reunion",
    text: "Le car scolaire part de Saint-Joseph à 6 h 30 et arrive à l'école à 7 h 15. Combien de temps dure le trajet, en minutes ?",
    format: "short",
    expected: ["45"],
    comparator: "number_equal",
    hint: "Avance d'abord jusqu'à 7 h.",
    explanation: exp(
      "Une durée, c'est l'écart entre le départ et l'arrivée.",
      "On avance par étapes : d'abord jusqu'à l'heure ronde, puis jusqu'à l'arrivée.",
      "De 6 h 30 à 7 h : 30 minutes. De 7 h à 7 h 15 : 15 minutes. En tout : 30 + 15 = 45 minutes.",
      "Le trajet dure 45 minutes.",
    ),
    tags: ["ce2", "duree", "calculer", "reunion"],
  },

  /* =========================================================
     CE2_DUREE_PROBLEME — un problème de durée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_duree_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "L'école commence à 7 h 30 et la récréation à 9 h 30. Combien de temps les élèves travaillent-ils avant la récréation, en minutes ?",
    format: "short",
    expected: ["120"],
    comparator: "number_equal",
    hint: "2 heures, cela fait combien de minutes ?",
    explanation: exp(
      "Une durée, c'est l'écart entre le début et la fin.",
      "On compte d'abord en heures, puis on convertit en minutes.",
      "De 7 h 30 à 9 h 30, il s'écoule 2 heures. Or 1 h = 60 min, donc 2 × 60 = 120 minutes.",
      "Ils travaillent 120 minutes.",
    ),
    tags: ["ce2", "duree", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un gâteau doit cuire 45 minutes. On l'enfourne à 15 h 40. À quelle heure faut-il le sortir ?",
    format: "qcm",
    choices: ["16 h 25", "15 h 85", "16 h 85", "15 h 25"],
    expected: ["16 h 25"],
    comparator: "mcq_exact",
    hint: "Avance d'abord jusqu'à 16 h.",
    explanation: exp(
      "Ajouter une durée, c'est avancer sur l'horloge — et une heure s'arrête à 59 minutes.",
      "On avance jusqu'à l'heure ronde suivante, puis on ajoute ce qui reste.",
      "De 15 h 40 à 16 h : 20 minutes. Il reste 45 - 20 = 25 minutes à ajouter, donc 16 h 25. « 15 h 85 » n'existe pas : après 15 h 59 vient 16 h.",
      "Il faut le sortir à 16 h 25.",
    ),
    tags: ["ce2", "duree", "probleme", "piege", "qcm"],
  },

  /* =========================================================
     CE2_DUREE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_duree_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves écrivent la même heure. Léa écrit 15 h 30, Kevin écrit 3 h et demie de l'après-midi, Malia écrit 15 h 50. Qui a raison ?",
    format: "qcm",
    choices: [
      "Léa et Kevin",
      "les trois",
      "Léa seulement",
      "Kevin et Malia",
    ],
    expected: ["Léa et Kevin"],
    comparator: "mcq_exact",
    hint: "« Et demie », c'est la moitié d'une heure. Combien de minutes ?",
    explanation: exp(
      "Une même heure peut se dire de plusieurs façons : en heures de l'après-midi ou de 0 à 24.",
      "On ramène tout à la même écriture, celle en chiffres de 0 à 24.",
      "3 heures et demie de l'après-midi, c'est 12 + 3 = 15 heures, et « et demie » vaut 30 minutes : 15 h 30. Malia a écrit 50 au lieu de 30 — la demi-heure, c'est la moitié de 60, pas la moitié de 100.",
      "Léa et Kevin ont raison.",
    ),
    tags: ["ce2", "duree", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_duree_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une classe part en sortie à 8 h 15. Le trajet en car dure 40 minutes, puis la visite dure 1 h 30. À quelle heure la visite se termine-t-elle ?",
    format: "qcm",
    choices: ["10 h 25", "9 h 85", "10 h 45", "9 h 25"],
    expected: ["10 h 25"],
    comparator: "mcq_exact",
    hint: "Cherche d'abord l'heure d'arrivée du car.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : chaque durée s'ajoute à l'heure trouvée avant.",
      "On calcule l'heure d'arrivée, puis on ajoute la visite.",
      "De 8 h 15 + 40 min : de 8 h 15 à 9 h il y a 45 minutes, donc 40 minutes s'arrêtent à 8 h 55. Puis 8 h 55 + 1 h 30 : d'abord 9 h 55, puis 30 minutes de plus, soit 10 h 25.",
      "La visite se termine à 10 h 25.",
    ),
    tags: ["ce2", "duree", "defi", "reunion", "deux_etapes", "qcm"],
  },
];

/* =========================================================
   LES GABARITS (10/11/2026)
   ⛔ Avant : deux gabarits par micro, une seule phrase chacun
   (« Quelle heure indique cette horloge ? »), 4 à 12 squelettes
   par micro et 14 à 18 répétitions sur 20. Chaque gabarit tire
   maintenant une FAMILLE, une SITUATION (des moments d'une
   journée d'enfant) et une TOURNURE. Les ids sont gardés.
========================================================= */

const D = "duree";

/** 75 → « 1 h 15 min », 45 → « 45 min », 120 → « 2 h ». */
function dureeTxt(min: number): string {
  const h = Math.floor(min / 60);
  const m = min % 60;
  if (h === 0) return `${m} min`;
  return m === 0 ? `${h} h` : `${h} h ${m} min`;
}

/** L'heure qu'il sera `min` minutes plus tard (dans la journée). */
function plusTard(h: number, m: number, min: number): [number, number] {
  const t = h * 60 + m + min;
  return [Math.floor(t / 60), t % 60];
}

/** L'erreur d'enfant : ajouter les minutes sans passer l'heure (« 12 h 75 »). */
function heureBrute(h: number, m: number, dh: number, dm: number): string {
  return `${h + dh} h ${m + dm}`;
}

/** Le cadran n'a que 12 heures : 15 h se dessine comme 3 h. */
const sur12 = (h: number) => (h > 12 ? h - 12 : h);

const horloge = (h: number, m: number) =>
  dureeCanvas({
    variant: "horloge",
    time: { hour: sur12(h), minute: m },
    display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
  });

const deuxHorloges = (h1: number, m1: number, h2: number, m2: number) =>
  dureeCanvas({
    variant: "double_horloge",
    start: { hour: sur12(h1), minute: m1, label: "Début" },
    end: { hour: sur12(h2), minute: m2, label: "Fin" },
    display: { showNumbers: true, showMinuteTicks: true, showDigital: false, showLabels: true },
  });

/** Une frise : le début, les étapes (leur durée écrite), la fin — l'inconnue reste « ? ». */
const frise = (debut: string, fin: string, etapes: { label: string; minutes: number }[]) =>
  dureeCanvas({ variant: "frise", frise: { startLabel: debut, endLabel: fin, steps: etapes } });

const majuscule = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

/* --- Les moments d'une journée d'enfant, pour lire une heure --- */
const MOMENTS: readonly string[] = [
  "Nina se réveille.",
  "Le goûter est prêt.",
  "Téo part à la piscine.",
  "Le cirque ouvre ses portes.",
  "La fusée de Ravi décolle.",
  "Le train de Zoé part.",
  "Pic le paille-en-queue se met à chanter.",
  "La boulangère sort les croissants du four.",
  "Le match de football commence.",
  "La maîtresse sonne la fin de la récré.",
  "Le spectacle de marionnettes commence.",
  "Le manège du dragon se met à tourner.",
  "La vétérinaire ouvre son cabinet.",
  "Le bateau des pirates quitte le port.",
  "Lou arrive à la bibliothèque.",
  "Le jardinier arrose les tomates.",
  "La fête d'anniversaire commence.",
  "Le chef cuisinier met le gâteau au four.",
];

const QUESTIONS_LECTURE: readonly string[] = [
  "Quelle heure indique l'horloge ?",
  "Quelle heure est-il ?",
  "Lis l'heure sur l'horloge.",
  "Quelle heure montre la pendule ?",
];

/* --- Des rendez-vous, pour placer les aiguilles --- */
const RENDEZ_VOUS: readonly ((t: string) => string)[] = [
  (t) => `Le goûter est à ${t}.`,
  (t) => `Nina part à la piscine à ${t}.`,
  (t) => `Le spectacle de cirque commence à ${t}.`,
  (t) => `La fusée de Ravi décolle à ${t}.`,
  (t) => `Le train de Zoé part à ${t}.`,
  (t) => `Téo a rendez-vous chez le dentiste à ${t}.`,
  (t) => `La chasse au trésor commence à ${t}.`,
  (t) => `Le match de football commence à ${t}.`,
  (t) => `La bibliothèque ouvre à ${t}.`,
  (t) => `La fête d'anniversaire de Lou commence à ${t}.`,
  (t) => `Le gâteau sort du four à ${t}.`,
  (t) => `La visite de la ferme commence à ${t}.`,
  (t) => `Le cours de musique commence à ${t}.`,
  (t) => `Pic le paille-en-queue mange ses graines à ${t}.`,
  (t) => `La séance de cinéma commence à ${t}.`,
  (t) => `Le bus de l'école part à ${t}.`,
];

/* --- Des activités qui DURENT, pour les calculs --- */
type Activite = { le: string; pr: "il" | "elle"; min: number; max: number };
const ACTIVITES: readonly Activite[] = [
  { le: "La séance de piscine", pr: "elle", min: 30, max: 60 },
  { le: "Le match de football", pr: "il", min: 40, max: 90 },
  { le: "Le spectacle de marionnettes", pr: "il", min: 20, max: 50 },
  { le: "La visite du zoo", pr: "elle", min: 60, max: 150 },
  { le: "Le film de dragons", pr: "il", min: 70, max: 110 },
  { le: "La cuisson du gâteau", pr: "elle", min: 25, max: 50 },
  { le: "La balade à vélo", pr: "elle", min: 30, max: 90 },
  { le: "L'atelier de peinture", pr: "il", min: 30, max: 60 },
  { le: "La chasse au trésor des pirates", pr: "elle", min: 30, max: 75 },
  { le: "Le voyage en train", pr: "il", min: 40, max: 120 },
  { le: "Le cours de musique", pr: "il", min: 30, max: 60 },
  { le: "La séance à la bibliothèque", pr: "elle", min: 20, max: 50 },
  { le: "Le spectacle de la kermesse", pr: "il", min: 30, max: 80 },
  { le: "La visite de la ferme", pr: "elle", min: 45, max: 120 },
  { le: "L'atelier « fusées et planètes »", pr: "il", min: 30, max: 75 },
  { le: "Le goûter d'anniversaire", pr: "il", min: 30, max: 90 },
  { le: "La visite du château", pr: "elle", min: 45, max: 120 },
  { le: "La visite de l'aquarium", pr: "elle", min: 40, max: 100 },
  { le: "Le spectacle de cirque", pr: "il", min: 45, max: 110 },
  { le: "La répétition de danse", pr: "elle", min: 30, max: 60 },
];

/** Une durée de l'activité, en multiples de 5, bornée par [lo, hi]. */
function dureeDe(a: Activite, lo: number, hi: number): number {
  const min = Math.max(a.min, lo);
  const max = Math.max(min, Math.min(a.max, hi));
  return Math.round(rint(min, max) / 5) * 5;
}

/* ---------------------------------------------------------
   LIRE L'HEURE
--------------------------------------------------------- */

function lireSurHorloge(h: number, m: number): Q {
  const suivante = h === 12 ? 1 : h + 1;
  const cinq = m / 5;
  const bonne = heure(h, m);
  return {
    text: `${pick(MOMENTS)} ${pick(QUESTIONS_LECTURE)}`,
    format: "qcm",
    choices: choix(bonne, [
      heure(suivante, m),
      heure(h, cinq),
      heure(cinq === 0 ? 12 : cinq, h * 5 === 60 ? 0 : h * 5),
      heure(h, (m + 30) % 60),
      heure(h === 1 ? 12 : h - 1, m),
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "La petite aiguille donne les heures, la grande les minutes : chaque chiffre vaut 5 minutes pour la grande.",
      "On lit le chiffre que la petite aiguille a DÉPASSÉ, puis on compte de 5 en 5 jusqu'à la grande.",
      m === 0
        ? `La petite aiguille est sur le ${h}, la grande sur le 12 : c'est l'heure pile.`
        : `La petite aiguille a dépassé le ${h}. La grande est sur le ${cinq} : ${cinq} × 5 = ${m} minutes.`,
      `Il est ${bonne}.`,
    ),
    canvas: horloge(h, m),
  };
}

function aiguillesDecrites(h: number, m: number): Q {
  const cinq = m / 5;
  const bonne = heure(h, m);
  const petite = m === 0 ? `sur le ${h}` : `entre le ${h} et le ${h === 12 ? 1 : h + 1}`;
  const grande = m === 0 ? "sur le 12" : `sur le ${cinq}`;
  const qui = quelquun();
  const debut = pick([
    `Sur la pendule de ${qui.nom}, la petite aiguille est ${petite} et la grande ${grande}.`,
    `La petite aiguille du réveil est ${petite}. La grande aiguille est ${grande}.`,
    `Sur l'horloge de la classe, la grande aiguille est ${grande} et la petite ${petite}.`,
  ]);
  return {
    text: `${debut} ${pick(["Quelle heure est-il ?", "Quelle heure cela fait-il ?", "Quelle heure est-il à ce moment-là ?"])}`,
    format: "qcm",
    choices: choix(bonne, [
      heure(h, cinq),
      heure(cinq === 0 ? 12 : cinq, h * 5 === 60 ? 0 : h * 5),
      heure(h === 12 ? 1 : h + 1, m),
      heure(h, (m + 30) % 60),
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "La petite aiguille donne les heures, la grande les minutes.",
      "Grande aiguille : son chiffre × 5 donne les minutes ; sur le 12, c'est l'heure pile.",
      m === 0
        ? `La grande est sur le 12 : ${h} heures pile.`
        : `La grande est sur le ${cinq} : ${cinq} × 5 = ${m} minutes. La petite a dépassé le ${h}.`,
      `Il est ${bonne}.`,
    ),
  };
}

const MOTS_HEURE: readonly { mots: (h: number) => string; h: (h: number) => number; m: number }[] = [
  { mots: (h) => `${h} heures et quart`, h: (h) => h, m: 15 },
  { mots: (h) => `${h} heures et demie`, h: (h) => h, m: 30 },
  { mots: (h) => `${h} heures moins le quart`, h: (h) => h - 1, m: 45 },
  { mots: (h) => `${h} heures pile`, h: (h) => h, m: 0 },
  { mots: (h) => `${h} heures moins dix`, h: (h) => h - 1, m: 50 },
  { mots: (h) => `${h} heures dix`, h: (h) => h, m: 10 },
];

function heureEnMots(): Q {
  const H = rint(3, 11);
  const f = pick(MOTS_HEURE);
  const h = f.h(H);
  const bonne = heure(h, f.m);
  const qui = quelquun();
  const debut = pick([
    `${qui.nom} dit : « Il est ${f.mots(H)}. »`,
    `À la radio, on entend : « Il est ${f.mots(H)}. »`,
    `La maîtresse annonce : « Il est ${f.mots(H)}. »`,
    `Pic le paille-en-queue chante : « Il est ${f.mots(H)} ! »`,
  ]);
  return {
    text: `${debut} ${pick(["Comment l'écrit-on en chiffres ?", "Quelle est la bonne écriture ?", "Choisis l'heure écrite en chiffres."])}`,
    format: "qcm",
    choices: choix(bonne, [
      heure(H, f.m),
      heure(h, f.m === 0 ? 30 : 60 - f.m),
      heure(h + 1, f.m),
      heure(h, f.m === 15 ? 45 : 15),
      heure(H, 15),
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Un quart d'heure, c'est 15 minutes ; une demi-heure, 30 minutes.",
      "« Moins le quart » ou « moins dix » : on enlève ces minutes à l'heure annoncée, on est donc encore dans l'heure d'avant.",
      f.m === 45 || f.m === 50
        ? `« ${f.mots(H)} » : il manque ${60 - f.m} minutes pour arriver à ${H} h, donc il est ${h} h et ${f.m} minutes.`
        : `« ${f.mots(H)} » : ${H} h et ${f.m} minutes.`,
      `On écrit ${bonne}.`,
    ),
  };
}

function apresMidi(): Q {
  const h = rint(1, 7);
  const m = pick([0, 15, 30, 45, 10, 20, 40, 50]);
  const bonne = heure(h + 12, m);
  const qui = quelquun();
  const debut = pick([
    `${qui.nom} goûte à ${heure(h, m)} de l'après-midi.`,
    `Le spectacle commence à ${heure(h, m)} de l'après-midi.`,
    `La piscine ouvre à ${heure(h, m)} de l'après-midi.`,
    `Le train de Zoé arrive à ${heure(h, m)} de l'après-midi.`,
    `Le match commence à ${heure(h, m)} de l'après-midi.`,
  ]);
  return {
    text: `${debut} ${pick([
      "Comment l'écrit-on sur un panneau de gare ?",
      "Quelle heure est-ce, en comptant de 0 à 24 heures ?",
      "Comment l'écrit-on avec les heures de l'après-midi ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, [heure(h, m), heure(h + 10, m), heure(h + 11, m), heure(h + 13, m)]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Une journée compte 24 heures. Après midi (12 h), on continue de compter : 13 h, 14 h, 15 h…",
      "On ajoute 12 aux heures de l'après-midi.",
      `${h} + 12 = ${h + 12}.`,
      `On écrit ${bonne}.`,
    ),
  };
}

function lirePiege(): Q {
  const h = rint(1, 11);
  const m = pick([40, 45, 50, 55]);
  const bonne = heure(h, m);
  if (Math.random() < 0.5) return lireSurHorloge(h, m);
  const qui = quelquun();
  const faux = heure(h + 1, m);
  return {
    text: `${pick(MOMENTS)} ${qui.nom} regarde l'horloge et dit : « Il est ${faux}. » A-t-${qui.il} raison ?`,
    format: "qcm",
    choices: choix(`non, il est ${bonne}`, ["oui", `non, il est ${heure(h + 1, m - 30)}`, `non, il est ${heure(h, m / 5)}`]),
    expected: [`non, il est ${bonne}`],
    comparator: "mcq_exact",
    explanation: exp(
      "La petite aiguille avance pendant toute l'heure : elle ne saute pas d'un chiffre à l'autre.",
      "On lit le chiffre que la petite aiguille a DÉPASSÉ, pas celui dont elle s'approche.",
      `La grande est sur le ${m / 5} : ${m} minutes. La petite s'approche du ${h + 1} mais ne l'a pas atteint : il n'est pas encore ${h + 1} heures.`,
      `Non : il est ${bonne}.`,
    ),
    canvas: horloge(h, m),
  };
}

/* ---------------------------------------------------------
   PLACER LES AIGUILLES
--------------------------------------------------------- */

const Q_GRANDE: readonly string[] = [
  "Où places-tu la grande aiguille ?",
  "Sur quel nombre doit pointer la grande aiguille ?",
  "Pour l'afficher sur l'horloge, où va la grande aiguille ?",
  "Quel nombre doit montrer la grande aiguille ?",
];

function placerGrande(h: number, m: number): Q {
  const cinq = m === 0 ? 12 : m / 5;
  const bonne = `sur le ${cinq}`;
  const avecDessin = m !== 0 && Math.random() < 0.6;
  const debut = pick(RENDEZ_VOUS)(heure(h, m));
  const pieges = [
    `sur le ${h}`,
    `sur le ${m >= 10 ? Math.floor(m / 10) : 6}`,
    `sur le ${(cinq % 12) + 1}`,
    `sur le ${cinq === 1 ? 2 : cinq - 1}`,
    "sur le 12",
    `sur le ${(cinq + 6) % 12 || 12}`,
  ];
  return {
    text: avecDessin
      ? `${debut} L'horloge montre ${h} h pile. ${pick(Q_GRANDE)}`
      : `${debut} ${pick(Q_GRANDE)}`,
    format: "qcm",
    choices: choix(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "La grande aiguille compte les minutes : chaque chiffre vaut 5 minutes.",
      "On cherche le chiffre qui, multiplié par 5, donne les minutes. Pour l'heure pile, elle est sur le 12.",
      m === 0
        ? `${heure(h, m)} : c'est l'heure pile, la grande aiguille est sur le 12.`
        : `${m} minutes = ${cinq} × 5 : la grande aiguille va sur le ${cinq}.`,
      `La grande aiguille est ${bonne}.`,
    ),
    canvas: avecDessin ? horloge(h, 0) : undefined,
  };
}

function placerPetite(h: number, m: number): Q {
  const s = h === 12 ? 1 : h + 1;
  const bonne =
    m === 0
      ? `exactement sur le ${h}`
      : m === 30
        ? `entre le ${h} et le ${s}, au milieu`
        : m < 30
          ? `entre le ${h} et le ${s}, tout près du ${h}`
          : `entre le ${h} et le ${s}, tout près du ${s}`;
  const toutes = [
    `exactement sur le ${h}`,
    `exactement sur le ${s}`,
    `entre le ${h} et le ${s}, au milieu`,
    `entre le ${h} et le ${s}, tout près du ${h}`,
    `entre le ${h} et le ${s}, tout près du ${s}`,
  ];
  const avecDessin = m !== 0 && Math.random() < 0.5;
  const debut = pick(RENDEZ_VOUS)(heure(h, m));
  return {
    text: `${debut} ${avecDessin ? `Voici l'horloge à ${h} h pile. ` : ""}${pick([
      "Où se trouve la petite aiguille à ce moment-là ?",
      "Où faut-il placer la petite aiguille ?",
      "Où est la petite aiguille à cette heure-là ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, toutes),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "La petite aiguille avance doucement pendant toute l'heure : elle met une heure pour aller d'un chiffre au suivant.",
      "Au début de l'heure elle est sur le chiffre, à la demie au milieu, et à la fin de l'heure tout près du chiffre suivant.",
      `À ${heure(h, m)}, ${m === 0 ? "l'heure commence" : `${m} minutes sont passées sur 60`}.`,
      `La petite aiguille est ${bonne}.`,
    ),
    canvas: avecDessin ? horloge(h, 0) : undefined,
  };
}

/* ---------------------------------------------------------
   CONVERTIR
--------------------------------------------------------- */

const CHOSES_QUI_DURENT: readonly string[] = [
  "La sieste de Pic le paille-en-queue dure",
  "Le trajet en bus dure",
  "La séance de piscine dure",
  "Le gâteau cuit pendant",
  "La fête d'anniversaire dure",
  "Le film de pirates dure",
  "La balade dans la forêt dure",
  "La partie de cache-cache dure",
  "Le spectacle de cirque dure",
  "La visite de l'aquarium dure",
  "L'atelier de peinture dure",
  "Le voyage en fusée de Ravi dure",
  "Le match de football dure",
  "La pêche avec papi dure",
  "La répétition de la chorale dure",
];

function convertirSimple(): Q {
  const f = pick([
    { mots: "1 heure", min: 60, aide: "1 h = 60 min.", pieges: [100, 10, 30, 24] },
    { mots: "une demi-heure", min: 30, aide: "Une demi-heure, c'est la moitié de 60 minutes.", pieges: [50, 60, 15, 20] },
    { mots: "un quart d'heure", min: 15, aide: "Un quart d'heure, c'est 60 ÷ 4 = 15 minutes.", pieges: [25, 4, 30, 45] },
    { mots: "2 heures", min: 120, aide: "60 + 60 = 120.", pieges: [200, 20, 100, 60] },
    { mots: "trois quarts d'heure", min: 45, aide: "Trois quarts d'heure : 15 + 15 + 15 = 45.", pieges: [75, 30, 34, 15] },
  ]);
  return {
    text: `${pick(CHOSES_QUI_DURENT)} ${f.mots}. ${pick([
      "Combien de minutes cela fait-il ?",
      "Cela fait combien de minutes ?",
      "Combien de minutes en tout ?",
    ])}`,
    format: "qcm",
    choices: choix(`${f.min} min`, f.pieges.map((p) => `${p} min`)),
    expected: [`${f.min} min`],
    comparator: "mcq_exact",
    explanation: exp(
      "Une heure compte 60 minutes, pas 100.",
      "On part de 1 h = 60 min.",
      f.aide,
      `${majuscule(f.mots)}, c'est ${f.min} minutes.`,
    ),
  };
}

function convertirJour(): Q {
  const f = pick([
    { mots: "une journée entière", h: 24 },
    { mots: "2 jours", h: 48 },
    { mots: "une demi-journée", h: 12 },
  ]);
  const debut = pick([
    `Zoé reste chez sa mamie pendant ${f.mots}.`,
    `La fusée de Ravi tourne autour de la Terre pendant ${f.mots}.`,
    `La kermesse du village dure ${f.mots}.`,
    `Les poussins de la ferme restent au chaud pendant ${f.mots}.`,
    `Le gâteau géant du chef repose pendant ${f.mots}.`,
  ]);
  return {
    text: `${debut} ${pick(["Combien d'heures cela fait-il ?", "Cela fait combien d'heures ?"])}`,
    format: "qcm",
    choices: choix(`${f.h} h`, [`${f.h / 2} h`, `${f.h * 2} h`, `${f.h + 6} h`, "10 h", "60 h"]),
    expected: [`${f.h} h`],
    comparator: "mcq_exact",
    explanation: exp(
      "Un jour compte 24 heures.",
      "On part de 1 jour = 24 h.",
      f.h === 48 ? "24 + 24 = 48." : f.h === 12 ? "La moitié de 24, c'est 12." : "Une journée entière : 24 h.",
      `${majuscule(f.mots)}, c'est ${f.h} heures.`,
    ),
  };
}

function heuresVersMinutes(hMin: number, hMax: number, demiesSeulement: boolean): Q {
  const h = rint(hMin, hMax);
  const m = pick(demiesSeulement ? [0, 30] : [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]);
  const total = h * 60 + m;
  const avecFrise = Math.random() < 0.5;
  const etapes = [
    ...Array.from({ length: h }, () => ({ label: "1 h", minutes: 60 })),
    ...(m ? [{ label: `${m} min`, minutes: m }] : []),
  ];
  return {
    text: `${pick(CHOSES_QUI_DURENT)} ${dureeTxt(total)}. ${avecFrise ? "La frise montre chaque heure. " : ""}${pick([
      "Combien de minutes cela fait-il ?",
      "Cela fait combien de minutes en tout ?",
      "Écris cette durée en minutes.",
    ])}`,
    format: "qcm",
    choices: choix(`${total} min`, [`${h * 100 + m} min`, `${total + 60} min`, `${total - 60} min`, `${h + m} min`, `${total + 10} min`]),
    expected: [`${total} min`],
    comparator: "mcq_exact",
    explanation: exp(
      "1 h = 60 min, pas 100.",
      "On change chaque heure en 60 minutes, puis on ajoute les minutes qui restent.",
      `${h} × 60 = ${h * 60}${m ? ` ; ${h * 60} + ${m} = ${total}` : ""}.`,
      `${dureeTxt(total)} = ${total} min.`,
    ),
    canvas: avecFrise ? frise("début", "fin", etapes) : undefined,
  };
}

function minutesVersHeures(lo: number, hi: number): Q {
  const total = Math.round(rint(lo, hi) / 5) * 5;
  const h = Math.floor(total / 60);
  const m = total % 60;
  const bonne = dureeTxt(total);
  return {
    text: `${pick(CHOSES_QUI_DURENT)} ${total} minutes. ${pick([
      "Combien d'heures et de minutes cela fait-il ?",
      "Écris cette durée en heures et minutes.",
      "Cela fait combien d'heures et de minutes ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, [
      dureeTxt(total + 60),
      dureeTxt(Math.max(5, total - 60)),
      m && total >= 100 ? `${Math.floor(total / 100)} h ${total % 100} min` : `${h + 1} h`,
      m ? `${h} h ${60 - m} min` : `${h} h 30 min`,
    ]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "1 h = 60 min.",
      "On cherche combien de fois 60 minutes tiennent dans la durée, puis ce qui reste.",
      `${h} × 60 = ${h * 60} ; ${total} − ${h * 60} = ${m}.`,
      `${total} min = ${bonne}.`,
    ),
  };
}

function completerHeure(): Q {
  const m = pick([5, 10, 15, 20, 25, 35, 40, 45, 50, 55]);
  const qui = quelquun();
  const debut = pick([
    `${qui.nom} lit depuis ${m} minutes.`,
    `Le gâteau cuit depuis ${m} minutes.`,
    `${qui.nom} joue au parc depuis ${m} minutes.`,
    `La séance de piscine a commencé il y a ${m} minutes.`,
  ]);
  return {
    text: `${debut} ${pick([
      "Combien de minutes manque-t-il pour faire une heure ?",
      "Combien de minutes reste-t-il pour arriver à 1 heure ?",
    ])}`,
    format: "qcm",
    choices: choix(`${60 - m} min`, [`${100 - m} min`, `${70 - m} min`, `${m} min`, `${55 - m} min`]),
    expected: [`${60 - m} min`],
    comparator: "mcq_exact",
    explanation: exp("1 h = 60 min.", "On cherche ce qu'il faut ajouter pour arriver à 60.", `${m} + ${60 - m} = 60.`, `Il manque ${60 - m} minutes.`),
  };
}

/* ---------------------------------------------------------
   CALCULER UNE DURÉE
--------------------------------------------------------- */

const Q_DUREE: readonly ((pr: string) => string)[] = [
  (pr) => `Combien de temps dure-t-${pr} ?`,
  () => "Quelle est sa durée ?",
  (pr) => `Combien de temps a-t-${pr} duré ?`,
];

function dureeEntre(a: Activite, h1: number, m1: number, d: number): Q {
  const [h2, m2] = plusTard(h1, m1, d);
  const bonne = dureeTxt(d);
  const regarde = Math.random() < 0.4;
  const brut = h2 * 100 + m2 - (h1 * 100 + m1);
  const pieges = [
    dureeTxt(d + 5),
    dureeTxt(Math.max(5, d - 5)),
    dureeTxt(d + 60),
    dureeTxt(d + 10),
    brut !== d && brut > 0 ? dureeTxt(brut) : dureeTxt(d + 15),
  ];
  return {
    text: regarde
      ? `${a.le} commence et finit aux heures montrées par les deux horloges. ${pick(Q_DUREE)(a.pr)}`
      : `${a.le} commence à ${heure(h1, m1)} et se termine à ${heure(h2, m2)}. ${pick(Q_DUREE)(a.pr)}`,
    format: "qcm",
    choices: choix(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Une durée, c'est le temps qui passe entre le début et la fin. 1 h = 60 min.",
      "On avance du début jusqu'à l'heure pile suivante, puis jusqu'à la fin, et on ajoute les morceaux.",
      m1 === 0 || h1 === h2
        ? `De ${heure(h1, m1)} à ${heure(h2, m2)} : ${bonne}.`
        : `De ${heure(h1, m1)} à ${h1 + 1} h : ${60 - m1} min. De ${h1 + 1} h à ${heure(h2, m2)} : ${dureeTxt((h2 - h1 - 1) * 60 + m2)}. En tout : ${bonne}.`,
      `${a.le} dure ${bonne}.`,
    ),
    canvas: deuxHorloges(h1, m1, h2, m2),
  };
}

function heureDeFin(a: Activite, h1: number, m1: number, d: number, sensInverse: boolean): Q {
  const [h2, m2] = plusTard(h1, m1, d);
  const dh = Math.floor(d / 60);
  const dm = d % 60;
  if (!sensInverse) {
    const bonne = heure(h2, m2);
    const pieges = [
      heure(h2 + 1, m2),
      heure(h2, (m2 + 10) % 60),
      m1 + dm >= 60 ? heureBrute(h1, m1, dh, dm) : heure(h2 - 1, m2),
      heure(h1 + dh, m2),
    ];
    return {
      text: `${a.le} commence à ${heure(h1, m1)}. ${majuscule(a.pr)} dure ${dureeTxt(d)}. ${pick([
        `À quelle heure se termine-t-${a.pr} ?`,
        `À quelle heure finit-${a.pr} ?`,
        "Quelle heure sera-t-il à la fin ?",
      ])}`,
      format: "qcm",
      choices: choix(bonne, pieges),
      expected: [bonne],
      comparator: "mcq_exact",
      explanation: exp(
        "Pour trouver l'heure de fin, on AJOUTE la durée à l'heure du début. 60 minutes font une heure de plus.",
        "On ajoute d'abord les heures, puis les minutes ; si on dépasse 60 minutes, on passe à l'heure suivante.",
        `${heure(h1, m1)} + ${dureeTxt(d)} = ${bonne}${m1 + dm >= 60 ? ` (${m1} + ${dm} = ${m1 + dm} minutes, c'est 1 h et ${m1 + dm - 60} min)` : ""}.`,
        `${a.le} se termine à ${bonne}.`,
      ),
      canvas: frise(heure(h1, m1), "?", [{ label: dureeTxt(d), minutes: d }]),
    };
  }
  const bonne = heure(h1, m1);
  const pieges = [heure(h1 + 1, m1), heure(h1 - 1, m1), heure(h1, (m1 + 10) % 60), heure(h2 - dh, (m2 + dm) % 60)];
  return {
    text: `${a.le} se termine à ${heure(h2, m2)}. ${majuscule(a.pr)} a duré ${dureeTxt(d)}. ${pick([
      `À quelle heure a-t-${a.pr} commencé ?`,
      "À quelle heure était le début ?",
      "Quelle heure était-il au début ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour trouver l'heure du début, on RECULE de la durée à partir de l'heure de fin.",
      "On enlève d'abord les heures, puis les minutes ; si les minutes ne suffisent pas, on recule d'une heure entière.",
      `${heure(h2, m2)} − ${dureeTxt(d)} = ${bonne}.`,
      `${a.le} a commencé à ${bonne}.`,
    ),
    canvas: frise("?", heure(h2, m2), [{ label: dureeTxt(d), minutes: d }]),
  };
}

/* ---------------------------------------------------------
   PROBLÈMES : de petites histoires
--------------------------------------------------------- */

type Histoire = { debut: (t: string, d: string) => string; fin: string; min: number; max: number };
const HISTOIRES: readonly Histoire[] = [
  { debut: (t, d) => `Le chef cuisinier met un gâteau au four à ${t}. Il doit cuire ${d}.`, fin: "À quelle heure faut-il le sortir ?", min: 25, max: 50 },
  { debut: (t, d) => `Nina monte dans le train à ${t}. Le voyage dure ${d}.`, fin: "À quelle heure arrive-t-elle ?", min: 25, max: 55 },
  { debut: (t, d) => `Le spectacle de cirque commence à ${t}. Il dure ${d}.`, fin: "À quelle heure se termine-t-il ?", min: 30, max: 55 },
  { debut: (t, d) => `Téo plante des radis à ${t}. Il travaille ${d} dans le jardin.`, fin: "À quelle heure a-t-il fini ?", min: 20, max: 50 },
  { debut: (t, d) => `La fusée de Ravi décolle à ${t}. Elle vole ${d} avant de se poser sur la Lune.`, fin: "À quelle heure se pose-t-elle ?", min: 30, max: 55 },
  { debut: (t, d) => `Les pirates commencent à creuser à ${t}. Ils trouvent le trésor ${d} plus tard.`, fin: "À quelle heure trouvent-ils le trésor ?", min: 20, max: 55 },
  { debut: (t, d) => `Zoé entre dans la piscine à ${t}. Elle nage pendant ${d}.`, fin: "À quelle heure sort-elle de l'eau ?", min: 25, max: 50 },
  { debut: (t, d) => `La vétérinaire commence à soigner un chiot à ${t}. Les soins durent ${d}.`, fin: "À quelle heure a-t-elle fini ?", min: 15, max: 45 },
  { debut: (t, d) => `Le bateau quitte le port à ${t}. La traversée dure ${d}.`, fin: "À quelle heure arrive-t-il sur l'île ?", min: 30, max: 55 },
  { debut: (t, d) => `Lou commence son puzzle de dinosaures à ${t}. Elle le finit ${d} plus tard.`, fin: "À quelle heure a-t-elle fini ?", min: 20, max: 55 },
  { debut: (t, d) => `La boulangère met le pain au four à ${t}. Il cuit ${d}.`, fin: "À quelle heure le pain est-il cuit ?", min: 25, max: 45 },
  { debut: (t, d) => `Le match de football de Malo commence à ${t}. La première mi-temps dure ${d}.`, fin: "À quelle heure se termine la première mi-temps ?", min: 20, max: 45 },
  { debut: (t, d) => `Pic le paille-en-queue s'endort sur une branche à ${t}. Il fait une sieste de ${d}.`, fin: "À quelle heure se réveille-t-il ?", min: 20, max: 55 },
  { debut: (t, d) => `Le jardinier commence à tondre la pelouse à ${t}. Il lui faut ${d}.`, fin: "À quelle heure aura-t-il fini ?", min: 25, max: 55 },
  { debut: (t, d) => `Les pompiers partent de la caserne à ${t}. Ils arrivent ${d} plus tard.`, fin: "À quelle heure arrivent-ils ?", min: 10, max: 25 },
  { debut: (t, d) => `La visite du château commence à ${t}. Elle dure ${d}.`, fin: "À quelle heure se termine-t-elle ?", min: 30, max: 55 },
];

function problemeFin(h1: number, m1: number, d: number, histoire: Histoire): Q {
  const [h2, m2] = plusTard(h1, m1, d);
  const bonne = heure(h2, m2);
  const pieges = [
    m1 + d >= 60 ? heureBrute(h1, m1, 0, d) : heure(h2 + 1, m2),
    heure(h2 + 1, m2),
    heure(h1, (m1 + d) % 60),
    heure(h2, (m2 + 10) % 60),
    heure(h2 - 1, m2),
  ];
  return {
    text: `${histoire.debut(heure(h1, m1), `${d} minutes`)} ${pick([histoire.fin, histoire.fin, "Quelle heure sera-t-il à ce moment-là ?", "Quelle heure sera-t-il quand ce sera fini ?"])}`,
    format: "qcm",
    choices: choix(bonne, pieges),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "L'heure de la fin, c'est l'heure du début plus la durée. 60 minutes font une heure.",
      "On avance d'abord jusqu'à l'heure pile, puis on ajoute ce qui reste.",
      m1 + d >= 60
        ? `De ${heure(h1, m1)} à ${h1 + 1} h, il y a ${60 - m1} min. Il reste ${d - (60 - m1)} min : ${bonne}.`
        : `${m1} + ${d} = ${m1 + d} minutes : ${bonne}.`,
      `Réponse : ${bonne}.`,
    ),
    canvas: frise(heure(h1, m1), "?", [{ label: `${d} min`, minutes: d }]),
  };
}

function dansCombienDeTemps(): Q {
  const h = rint(8, 16);
  const m1 = pick([30, 35, 40, 45, 50, 55]);
  const d = pick([10, 15, 20, 25, 30, 35]);
  const [h2, m2] = plusTard(h, m1, d);
  const qui = quelquun();
  const rdv = pick(RENDEZ_VOUS)(heure(h2, m2));
  return {
    text: `Il est ${heure(h, m1)}. ${rdv} ${pick([
      "Dans combien de minutes ?",
      `Combien de minutes ${qui.nom} doit-${qui.il} attendre ?`,
      "Combien de temps faut-il attendre ?",
    ])}`,
    format: "qcm",
    choices: choix(`${d} min`, [`${d + 40} min`, `${d + 5} min`, `${d - 5} min`, `${d + 10} min`, `${100 - m1 + m2} min`]),
    expected: [`${d} min`],
    comparator: "mcq_exact",
    explanation: exp(
      "Le temps d'attente, c'est la durée entre maintenant et le rendez-vous.",
      "On avance jusqu'à l'heure pile, puis jusqu'au rendez-vous.",
      m2 === 0 || h2 === h
        ? `De ${heure(h, m1)} à ${heure(h2, m2)} : ${d} min.`
        : `De ${heure(h, m1)} à ${h + 1} h : ${60 - m1} min ; de ${h + 1} h à ${heure(h2, m2)} : ${m2} min. ${60 - m1} + ${m2} = ${d}.`,
      `Il faut attendre ${d} minutes.`,
    ),
    canvas: deuxHorloges(h, m1, h2, m2),
  };
}

type Journee = { etapes: [string, string, string]; fin: string };
const JOURNEES: readonly Journee[] = [
  { etapes: ["le trajet en car", "la visite du zoo", "le pique-nique"], fin: "À quelle heure tout est-il fini ?" },
  { etapes: ["la préparation de la pâte", "la cuisson du gâteau", "la décoration"], fin: "À quelle heure le gâteau est-il prêt ?" },
  { etapes: ["l'échauffement", "le match", "le goûter des joueurs"], fin: "À quelle heure les joueurs ont-ils fini ?" },
  { etapes: ["la marche jusqu'à la plage", "la chasse au trésor", "le retour"], fin: "À quelle heure les pirates sont-ils rentrés ?" },
  { etapes: ["la montée dans la fusée", "le voyage jusqu'à la Lune", "la promenade sur la Lune"], fin: "À quelle heure la promenade se termine-t-elle ?" },
  { etapes: ["le trajet à vélo", "la visite de la ferme", "le goûter avec les chèvres"], fin: "À quelle heure la sortie se termine-t-elle ?" },
  { etapes: ["la répétition", "le spectacle de danse", "les applaudissements"], fin: "À quelle heure tout est-il terminé ?" },
  { etapes: ["le voyage en train", "la visite du château", "le goûter"], fin: "À quelle heure la journée se termine-t-elle ?" },
  { etapes: ["la lecture d'une histoire", "l'atelier de dessin", "le rangement"], fin: "À quelle heure l'atelier est-il fini ?" },
  { etapes: ["le trajet jusqu'à la piscine", "la leçon de natation", "la douche"], fin: "À quelle heure ressort-on de la piscine ?" },
  { etapes: ["la balade en forêt", "la cueillette des mûres", "le retour à la cabane"], fin: "À quelle heure est-on de retour ?" },
  { etapes: ["le montage du chapiteau", "le spectacle de cirque", "le rangement"], fin: "À quelle heure le cirque a-t-il tout rangé ?" },
];

function journeeEnEtapes(nbEtapes: 2 | 3, maxD: number): Q {
  const j = pick(JOURNEES);
  const h1 = rint(8, 14);
  const m1 = pick([0, 10, 15, 20, 30, 40, 45]);
  const noms = j.etapes.slice(0, nbEtapes);
  // Chaque étape a sa durée plausible : un trajet moyen, l'activité longue, la fin courte (pas de douche d'une heure).
  const PAS: number[][] = [[15, 20, 25, 30, 35, 40, 45], [30, 40, 45, 50, 60, 75, 90], [10, 15, 20, 25, 30]];
  const ds = noms.map((_, k) => pick(PAS[k].filter((d) => d <= maxD)));
  const total = ds.reduce((s, d) => s + d, 0);
  const [h2, m2] = plusTard(h1, m1, total);
  const bonne = heure(h2, m2);
  const liste = noms
    .map((n, k) => `${k === 0 ? "d'abord" : k === 2 ? "enfin" : "puis"} ${n} (${dureeTxt(ds[k])})`)
    .join(", ");
  const [hs, ms] = plusTard(h1, m1, total - ds[ds.length - 1]);
  return {
    text: `On commence à ${heure(h1, m1)} : ${liste}. ${j.fin}`,
    format: "qcm",
    choices: choix(bonne, [heure(hs, ms), heure(h2 + 1, m2), heure(h2, (m2 + 10) % 60), heure(h2 - 1, m2)]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Quand les étapes se suivent, la durée totale est la somme des durées.",
      "On ajoute toutes les durées, puis on ajoute ce total à l'heure du début.",
      `${ds.map((d) => dureeTxt(d)).join(" + ")} = ${dureeTxt(total)}. ${heure(h1, m1)} + ${dureeTxt(total)} = ${bonne}.`,
      `Tout est fini à ${bonne}.`,
    ),
    canvas: frise(heure(h1, m1), "?", ds.map((d) => ({ label: dureeTxt(d), minutes: d }))),
  };
}

function quiLePlusLongtemps(): Q {
  const [p, q] = deuxPersonnes();
  const act = pick(["lit", "dessine", "joue au ballon", "fait du vélo", "nage", "joue du piano", "construit une cabane", "fait un puzzle"]);
  const valeurs = [35, 40, 45, 50, 55, 65, 70, 75, 80];
  const d1 = pick(valeurs);
  let d2 = pick(valeurs);
  while (d2 === d1) d2 = pick(valeurs);
  const h1 = rint(9, 15);
  const m1 = pick([0, 10, 20, 30, 40, 50]);
  const h3 = rint(9, 15);
  const m3 = pick([5, 15, 25, 35, 45]);
  const [h2, m2] = plusTard(h1, m1, d1);
  const [h4, m4] = plusTard(h3, m3, d2);
  const bonne = d1 > d2 ? p.nom : q.nom;
  return {
    text: `${p.nom} ${act} de ${heure(h1, m1)} à ${heure(h2, m2)}. ${q.nom} ${act} de ${heure(h3, m3)} à ${heure(h4, m4)}. ${pick([
      "Qui y a passé le plus de temps ?",
      "Qui l'a fait le plus longtemps ?",
    ])}`,
    format: "qcm",
    choices: choix(bonne, [d1 > d2 ? q.nom : p.nom, "les deux, autant de temps", "on ne peut pas savoir"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour comparer, on calcule chaque durée, du début à la fin.",
      "On compte le temps de chacun, puis on compare les deux durées.",
      `${p.nom} : ${dureeTxt(d1)}. ${q.nom} : ${dureeTxt(d2)}.`,
      `${bonne} y a passé le plus de temps.`,
    ),
  };
}

function comparerDurees(): Q {
  const h = rint(1, 3);
  const m = pick([10, 15, 20, 30, 40, 45, 50]);
  const enMin = h * 60 + m;
  const autre = pick([enMin - 10, enMin + 10, enMin, enMin - 25, enMin + 15]);
  const [p, q] = deuxPersonnes();
  const quoi = pick([
    { mot: "le film", celui: "celui", lequel: "Lequel" },
    { mot: "la balade", celui: "celle", lequel: "Laquelle" },
    { mot: "la partie de jeu", celui: "celle", lequel: "Laquelle" },
    { mot: "le voyage", celui: "celui", lequel: "Lequel" },
    { mot: "la visite au musée des dinosaures", celui: "celle", lequel: "Laquelle" },
  ]);
  const egal = autre === enMin;
  const bonne = egal ? "les deux durent autant" : enMin > autre ? `${quoi.celui} de ${p.nom}` : `${quoi.celui} de ${q.nom}`;
  return {
    text: `${p.nom} et ${q.nom} racontent ${quoi.mot} de leur week-end. ${majuscule(quoi.celui)} de ${p.nom} a duré ${dureeTxt(enMin)}, ${quoi.celui} de ${q.nom} ${autre} minutes. ${quoi.lequel} a duré le plus longtemps ?`,
    format: "qcm",
    choices: choix(bonne, [`${quoi.celui} de ${p.nom}`, `${quoi.celui} de ${q.nom}`, "les deux durent autant", "on ne peut pas comparer des heures et des minutes"]),
    expected: [bonne],
    comparator: "mcq_exact",
    explanation: exp(
      "Pour comparer deux durées, on les écrit dans la même unité. 1 h = 60 min.",
      "On change les heures en minutes.",
      `${dureeTxt(enMin)} = ${h} × 60 + ${m} = ${enMin} min, à comparer avec ${autre} min.`,
      egal ? "Les deux durent autant." : `C'est ${bonne} qui a duré le plus longtemps.`,
    ),
  };
}

/* ---------------------------------------------------------
   LES GABARITS, micro par micro
--------------------------------------------------------- */

function gab(id: string, microId: string, difficulty: Etoile, hint: string, tags: string[], generate: () => Q) {
  return gabarit({ id, notionId: D, microId, difficulty, hint, tags }, generate);
}

const LIRE = "ce2_duree_lire_heure";
const PLACER = "ce2_duree_positionner_aiguilles";
const CONV = "ce2_duree_convertir";
const CALC = "ce2_duree_calculer";
const PROB = "ce2_duree_probleme";
const DEFI = "ce2_duree_defi";

dureeBank.push(
  gab(`${LIRE}_tpl_3`, LIRE, 1, "Petite aiguille : les heures. Grande aiguille sur le 12 : l'heure pile ; sur le 6 : la demie.", ["lire_heure", "canvas"], () =>
    Math.random() < 0.75 ? lireSurHorloge(rint(1, 12), pick([0, 30])) : aiguillesDecrites(rint(1, 12), pick([0, 30])),
  ),
  gab(`${LIRE}_tpl_2`, LIRE, 2, "Un quart d'heure = 15 minutes, une demi-heure = 30 minutes.", ["lire_heure", "canvas"], () =>
    tirer([
      () => lireSurHorloge(rint(1, 12), pick([15, 45])),
      () => lireSurHorloge(rint(1, 12), pick([15, 45])),
      heureEnMots,
      () => aiguillesDecrites(rint(1, 12), pick([15, 45, 30])),
    ]),
  ),
  gab(`${LIRE}_tpl_1`, LIRE, 3, "Petite aiguille : le chiffre DÉPASSÉ. Grande aiguille : le chiffre × 5.", ["lire_heure", "canvas"], () =>
    tirer([
      () => lireSurHorloge(rint(1, 12), 5 * rint(1, 11)),
      () => lireSurHorloge(rint(1, 12), 5 * rint(1, 11)),
      apresMidi,
      () => aiguillesDecrites(rint(1, 11), 5 * rint(1, 7)),
    ]),
  ),
  gab(`${LIRE}_tpl_4`, LIRE, 4, "La petite aiguille a-t-elle ATTEINT le chiffre suivant ?", ["lire_heure", "piege", "canvas"], lirePiege),

  gab(`${PLACER}_tpl_3`, PLACER, 2, "Heure pile : grande aiguille sur le 12. Et quart : sur le 3. Et demie : sur le 6. Moins le quart : sur le 9.", ["positionner", "canvas"], () =>
    Math.random() < 0.8 ? placerGrande(rint(1, 11), pick([0, 15, 30, 45])) : placerPetite(rint(1, 11), pick([0, 30])),
  ),
  gab(`${PLACER}_tpl_1`, PLACER, 3, "Pour la grande aiguille, on cherche le chiffre qui, multiplié par 5, donne les minutes.", ["positionner", "canvas"], () =>
    placerGrande(rint(1, 11), 5 * rint(1, 11)),
  ),
  gab(`${PLACER}_tpl_2`, PLACER, 4, "La petite aiguille avance doucement : à la demie, elle est au milieu entre deux chiffres.", ["positionner", "piege", "canvas"], () =>
    placerPetite(rint(1, 11), pick([0, 5, 10, 20, 30, 40, 50, 55])),
  ),

  gab(`${CONV}_tpl_3`, CONV, 1, "1 h = 60 min ; 1 jour = 24 h.", ["convertir"], () => tirer([convertirSimple, convertirSimple, convertirJour])),
  gab(`${CONV}_tpl_4`, CONV, 2, "Chaque heure vaut 60 minutes : on compte 60, 120, 180…", ["convertir", "canvas"], () =>
    tirer([() => heuresVersMinutes(2, 4, true), () => minutesVersHeures(60, 180), convertirJour, completerHeure]),
  ),
  gab(`${CONV}_tpl_1`, CONV, 3, "On change les heures en minutes (× 60), puis on ajoute les minutes.", ["convertir", "canvas"], () =>
    heuresVersMinutes(1, 4, false),
  ),
  gab(`${CONV}_tpl_2`, CONV, 3, "Combien de fois 60 minutes tiennent-elles dans la durée ? Ce qui reste, ce sont les minutes.", ["convertir"], () =>
    Math.random() < 0.75 ? minutesVersHeures(65, 295) : completerHeure(),
  ),

  gab(`${CALC}_tpl_3`, CALC, 2, "On compte de l'heure du début jusqu'à l'heure de la fin.", ["calculer", "canvas"], () => {
    const a = pick(ACTIVITES);
    if (Math.random() < 0.3) return dureeEntre(a, rint(8, 14), 0, 60 * rint(1, 3));
    const m1 = pick([0, 5, 10, 15, 20]);
    return dureeEntre(a, rint(8, 16), m1, pick([10, 15, 20, 25, 30, 35]));
  }),
  gab(`${CALC}_tpl_1`, CALC, 3, "Avance jusqu'à l'heure pile, puis jusqu'à la fin, et ajoute les deux morceaux.", ["calculer", "canvas"], () => {
    const a = pick(ACTIVITES);
    const m1 = pick([30, 35, 40, 45, 50, 55]);
    return dureeEntre(a, rint(8, 16), m1, dureeDe(a, 65 - m1, 115 - m1));
  }),
  gab(`${CALC}_tpl_2`, CALC, 4, "On ajoute la durée pour trouver la fin, on la retire pour trouver le début.", ["calculer", "canvas"], () => {
    const a = pick(ACTIVITES);
    const d = Math.random() < 0.5 ? dureeDe(a, 65, 150) : 60 * rint(1, 2) + pick([15, 30, 40, 45]);
    return heureDeFin(a, rint(8, 14), pick([5, 15, 20, 25, 35, 40, 45, 50]), d, Math.random() < 0.4);
  }),

  gab(`${PROB}_tpl_1`, PROB, 3, "Début + durée = fin. 60 minutes font une heure de plus.", ["probleme", "canvas"], () => {
    if (Math.random() < 0.25) return dansCombienDeTemps();
    const histoire = pick(HISTOIRES);
    const d = Math.round(rint(histoire.min, histoire.max) / 5) * 5;
    return problemeFin(rint(8, 16), pick([20, 25, 30, 35, 40, 45, 50]), d, histoire);
  }),
  gab(`${PROB}_tpl_2`, PROB, 4, "Ajoute les durées des étapes, puis ajoute le total à l'heure du début.", ["probleme", "deux_etapes", "canvas"], () =>
    Math.random() < 0.7
      ? journeeEnEtapes(2, 60)
      : heureDeFin(pick(ACTIVITES), rint(9, 15), pick([10, 20, 25, 40, 50]), pick([35, 40, 45, 50, 55]), true),
  ),

  gab(`${DEFI}_tpl_1`, DEFI, 5, "Ajoute toutes les durées, puis ajoute ce total à l'heure du début.", ["defi", "trois_etapes", "canvas"], () =>
    journeeEnEtapes(3, 90),
  ),
  gab(`${DEFI}_tpl_2`, DEFI, 5, "Pour comparer deux durées, écris-les dans la même unité : 1 h = 60 min.", ["defi", "comparer"], () =>
    Math.random() < 0.5 ? comparerDurees() : quiLePlusLongtemps(),
  ),
);
