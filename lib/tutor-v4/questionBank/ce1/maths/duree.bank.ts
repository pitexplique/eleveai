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

import type { DureeCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
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

export const dureeBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DUREE_LIRE_HEURE_DEMI — lire l'heure sur le cadran
     LE piège : à 3 h 45, la petite aiguille est presque sur le
     4. Elle avance tout le long de l'heure, elle ne saute pas.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_lire_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_lire_heure_demi",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une horloge, la grande aiguille est sur le 6 et la petite entre le 2 et le 3. Quelle heure est-il ?",
    format: "qcm",
    choices: ["2 h 30", "3 h 30", "6 h 30", "2 h 06"],
    expected: ["2 h 30"],
    comparator: "mcq_exact",
    hint: "La petite aiguille n'a pas encore atteint le 3 : l'heure est encore celle d'avant.",
    explanation: exp(
      "La petite aiguille donne l'heure, la grande donne les minutes.",
      "On lit d'abord le nombre que la petite aiguille a DÉPASSÉ, puis on regarde la grande.",
      "La petite aiguille a dépassé le 2 sans atteindre le 3 : il est 2 heures passées. La grande sur le 6 marque la demie, c'est-à-dire 30 minutes.",
      "Il est 2 h 30.",
    ),
    canvas: dureeCanvas({
      variant: "horloge",
      time: { hour: 2, minute: 30 },
      display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
    }),
    tags: ["ce1", "duree", "lire", "qcm", "canvas"],
  },
  {
    kind: "fixed",
    id: "ce1_duree_lire_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_lire_heure_demi",
    difficulty: 4,
    theme: "neutral",
    text: "La grande aiguille est sur le 9, la petite est presque sur le 4. Quelle heure est-il ?",
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
  {
    kind: "template",
    id: "ce1_duree_lire_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_lire_heure_demi",
    difficulty: 3,
    theme: "neutral",
    hint: "La petite aiguille donne l'heure DÉJÀ dépassée.",
    tags: ["ce1", "duree", "lire", "template", "canvas"],
    generate: () => {
      const h = randomInt(1, 11);
      const m = randomChoice(MINUTES_CE1);
      const bonne = heure(h, m);
      return {
        text: "Quelle heure indique cette horloge ?",
        format: "qcm",
        choices: makeChoices(bonne, [
          heure(h + 1, m), // le piège de la petite aiguille qui « saute »
          heure(h, m === 45 ? 15 : 45),
          heure(h, m === 30 ? 0 : 30),
          heure(h === 1 ? 12 : h - 1, m),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille donne l'heure, la grande donne les minutes.",
          "On lit le nombre que la petite aiguille a dépassé, puis la position de la grande.",
          m === 0
            ? `La grande aiguille est sur le 12 : l'heure est pile. Il est ${bonne}.`
            : `La grande aiguille marque ${m} minutes. La petite a dépassé le ${h} : c'est ${h} heures passées, pas ${h + 1}.`,
          `Il est ${bonne}.`,
        ),
        canvas: dureeCanvas({
          variant: "horloge",
          time: { hour: h, minute: m },
          display: { showNumbers: true, showMinuteTicks: true, showDigital: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_duree_lire_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_lire_heure_demi",
    difficulty: 2,
    theme: "neutral",
    hint: "Un tour de cadran fait 60 minutes : le quart, c'est 15 minutes.",
    tags: ["ce1", "duree", "lire", "template"],
    generate: () => {
      const cas = randomChoice([
        { position: 12, minutes: 0, nom: "l'heure pile" },
        { position: 3, minutes: 15, nom: "le quart d'heure" },
        { position: 6, minutes: 30, nom: "la demi-heure" },
        { position: 9, minutes: 45, nom: "les trois quarts d'heure" },
      ]);
      return {
        text: `La grande aiguille est sur le ${cas.position}. Combien de minutes se sont écoulées depuis l'heure pile ?`,
        format: "short",
        expected: [String(cas.minutes)],
        comparator: "number_equal",
        explanation: exp(
          "La grande aiguille fait le tour du cadran en 60 minutes.",
          "On compte cinq minutes par nombre du cadran, en partant du 12.",
          `Du 12 au ${cas.position}, il y a ${cas.position} nombres, donc ${cas.position} × 5 = ${cas.minutes} minutes. C'est ${cas.nom}.`,
          `Il s'est écoulé ${cas.minutes} minutes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DUREE_POSITIONNER_AIGUILLES — placer les aiguilles
     La lecture à l'envers : on connaît l'heure, on cherche où
     pointent les aiguilles.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_duree_positionner_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_positionner_aiguilles",
    difficulty: 2,
    theme: "neutral",
    text: "Il est 5 h 30. Sur quel nombre pointe la grande aiguille ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "La demie, c'est la moitié du tour de cadran.",
    explanation: exp(
      "La grande aiguille fait un tour complet en 60 minutes.",
      "On cherche le nombre qui correspond aux minutes : 5 minutes par nombre.",
      "30 minutes, c'est la moitié du tour. La moitié de 12 nombres, c'est 6 : la grande aiguille pointe sur le 6.",
      "Elle pointe sur le 6.",
    ),
    tags: ["ce1", "duree", "positionner"],
  },
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
  {
    kind: "template",
    id: "ce1_duree_positionner_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_positionner_aiguilles",
    difficulty: 3,
    theme: "neutral",
    hint: "Cinq minutes par nombre du cadran.",
    tags: ["ce1", "duree", "positionner", "template"],
    generate: () => {
      const h = randomInt(1, 12);
      const cas = randomChoice([
        { minutes: 0, position: 12 },
        { minutes: 15, position: 3 },
        { minutes: 30, position: 6 },
        { minutes: 45, position: 9 },
      ]);
      return {
        text: `Il est ${heure(h, cas.minutes)}. Sur quel nombre pointe la grande aiguille ?`,
        format: "short",
        expected: [String(cas.position)],
        comparator: "number_equal",
        explanation: exp(
          "La grande aiguille fait un tour de 60 minutes, et il y a 5 minutes entre deux nombres du cadran.",
          "On cherche combien de fois 5 tient dans le nombre de minutes.",
          `${cas.minutes} minutes, cela fait ${cas.position} fois 5 minutes : la grande aiguille pointe sur le ${cas.position}.`,
          `Elle pointe sur le ${cas.position}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_duree_positionner_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_positionner_aiguilles",
    difficulty: 4,
    theme: "neutral",
    hint: "La petite aiguille n'est sur un nombre que lorsque l'heure est pile.",
    tags: ["ce1", "duree", "positionner", "piege", "template"],
    generate: () => {
      const h = randomInt(1, 11);
      const m = randomChoice([15, 30, 45] as const);
      const bonne = `entre le ${h} et le ${h + 1}`;
      return {
        text: `Il est ${heure(h, m)}. Où se trouve la PETITE aiguille ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `exactement sur le ${h}`,
          `exactement sur le ${h + 1}`,
          `sur le ${m === 15 ? 3 : m === 30 ? 6 : 9}`,
          `entre le ${h + 1} et le ${h + 2}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille glisse doucement d'un nombre au suivant pendant toute l'heure.",
          "On regarde si l'heure est pile : si elle ne l'est pas, l'aiguille est entre deux nombres.",
          `À ${heure(h, m)}, l'heure de ${h} est commencée mais pas finie : la petite aiguille a quitté le ${h} sans atteindre le ${h + 1}.`,
          `Elle est ${bonne}.`,
        ),
      };
    },
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
    text: "L'école commence à 8 h et la sieste est à 13 h. Laquelle de ces deux heures est le matin ?",
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
  {
    kind: "template",
    id: "ce1_duree_matin_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_matin_apres_midi",
    difficulty: 3,
    theme: "neutral",
    hint: "Après midi, on enlève 12 pour lire le cadran.",
    tags: ["ce1", "duree", "matin_apres_midi", "template"],
    generate: () => {
      const h24 = randomInt(13, 22);
      const h12 = h24 - 12;
      const bonne = `${h12} heures de l'après-midi`;
      return {
        text: `Il est ${h24} h. Comment dit-on cette heure autrement ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${h12} heures du matin`,
          `${h24} heures du matin`,
          `${h12 + 1} heures de l'après-midi`,
          `${h24 - 10} heures de l'après-midi`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le cadran ne porte que 12 nombres, mais la journée compte 24 heures.",
          "Après midi, on enlève 12 pour retrouver le nombre du cadran.",
          `${h24} - 12 = ${h12}. La petite aiguille est donc sur le ${h12}, et c'est l'après-midi.`,
          `${h24} h, c'est ${bonne}.`,
        ),
      };
    },
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
  {
    kind: "template",
    id: "ce1_duree_unites_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_unites_h_min",
    difficulty: 3,
    theme: "neutral",
    hint: "Une heure entière vaut 60 minutes : ajoute ce qui dépasse.",
    tags: ["ce1", "duree", "unites", "template"],
    generate: () => {
      const cas = randomChoice([
        { texte: "une demi-heure", minutes: 30, pourquoi: "la moitié de 60, c'est 30" },
        { texte: "un quart d'heure", minutes: 15, pourquoi: "60 partagé en quatre, c'est 15" },
        { texte: "trois quarts d'heure", minutes: 45, pourquoi: "trois parts de 15 minutes font 45" },
        { texte: "une heure et demie", minutes: 90, pourquoi: "60 minutes plus une demi-heure de 30 minutes" },
        { texte: "deux heures", minutes: 120, pourquoi: "60 minutes deux fois" },
      ]);
      return {
        text: `Combien de minutes dure ${cas.texte} ?`,
        format: "short",
        expected: [String(cas.minutes)],
        comparator: "number_equal",
        explanation: exp(
          "1 heure vaut 60 minutes.",
          "On part de l'heure entière, puis on partage ou on ajoute.",
          `Pour ${cas.texte} : ${cas.pourquoi}.`,
          `${cas.texte.charAt(0).toUpperCase()}${cas.texte.slice(1)} dure ${cas.minutes} min.`,
        ),
      };
    },
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
    text: "La récréation commence à 10 h et se termine à 10 h 15. Combien de minutes dure-t-elle ?",
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
  {
    kind: "template",
    id: "ce1_duree_calculer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calculer_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les heures entières qui séparent le début de la fin.",
    tags: ["ce1", "duree", "calculer", "template"],
    generate: () => {
      const debut = randomInt(8, 15);
      const duree = randomInt(1, 4);
      const fin = debut + duree;
      const activite = randomChoice([
        "la sortie à la plage",
        "l'atelier peinture",
        "le match de foot",
        "la visite du musée",
      ]);
      return {
        text: `${activite.charAt(0).toUpperCase()}${activite.slice(1)} commence à ${debut} h et se termine à ${fin} h. Combien d'heures dure-t-${activite.includes("match") ? "il" : "elle"} ?`,
        format: "short",
        expected: [String(duree)],
        comparator: "number_equal",
        explanation: exp(
          "Une durée, c'est ce qui sépare le début de la fin.",
          "On part de l'heure de début et on compte les heures jusqu'à la fin.",
          `De ${debut} h à ${fin} h, on compte ${duree} heure${duree > 1 ? "s" : ""} : ${debut} + ${duree} = ${fin}.`,
          `Cela dure ${duree} h.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_duree_calculer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calculer_simple",
    difficulty: 4,
    theme: "neutral",
    hint: "Va d'abord jusqu'à l'heure ronde.",
    tags: ["ce1", "duree", "calculer", "template"],
    generate: () => {
      const h = randomInt(8, 16);
      const m = randomChoice([15, 30, 45] as const);
      const minutes = 60 - m;
      return {
        text: `Il est ${heure(h, m)}. Combien de minutes reste-t-il avant ${h + 1} h ?`,
        format: "short",
        expected: [String(minutes)],
        comparator: "number_equal",
        explanation: exp(
          "Pour aller jusqu'à l'heure suivante, on complète les minutes jusqu'à 60.",
          "On cherche ce qui manque pour arriver à 60 minutes.",
          `${m} + ${minutes} = 60. Il reste donc ${minutes} minutes avant ${h + 1} h.`,
          `Il reste ${minutes} min.`,
        ),
      };
    },
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
  {
    kind: "template",
    id: "ce1_duree_calendrier_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_calendrier",
    difficulty: 3,
    theme: "neutral",
    hint: "Une semaine plus tard, c'est le même jour de la semaine.",
    tags: ["ce1", "duree", "calendrier", "template"],
    generate: () => {
      const jours = [
        "lundi",
        "mardi",
        "mercredi",
        "jeudi",
        "vendredi",
        "samedi",
        "dimanche",
      ] as const;
      const i = randomInt(0, 6);
      const avance = randomInt(1, 6);
      const bonne = jours[(i + avance) % 7];
      return {
        text: `Aujourd'hui, on est ${jours[i]}. Quel jour sera-t-on dans ${avance} jour${avance > 1 ? "s" : ""} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          jours[(i + avance + 1) % 7],
          jours[(i + avance + 6) % 7],
          jours[i],
          jours[(i + avance + 3) % 7],
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les jours de la semaine reviennent toujours dans le même ordre, et après dimanche on repart à lundi.",
          "On avance d'un jour à la fois en récitant la liste.",
          `En partant de ${jours[i]} et en avançant de ${avance} jour${avance > 1 ? "s" : ""}, on arrive à ${bonne}.`,
          `Ce sera ${bonne}.`,
        ),
      };
    },
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
    text: "Deux enfants disent la même heure. Léa dit « 4 heures et demie de l'après-midi », Kevin dit « 16 h 30 ». Qui a raison ?",
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
    text: "Le car scolaire part à 6 h 45 et le trajet dure 30 minutes. À quelle heure arrive-t-il ?",
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
  {
    kind: "template",
    id: "ce1_duree_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Passe par l'heure ronde avant d'ajouter le reste.",
    tags: ["ce1", "duree", "defi", "template"],
    generate: () => {
      const h = randomInt(6, 16);
      const m = randomChoice([15, 30, 45] as const);
      const ajout = randomChoice([15, 30, 45] as const);
      const totalMinutes = m + ajout;
      const finH = h + Math.floor(totalMinutes / 60);
      const finM = totalMinutes % 60;
      const bonne = heure(finH, finM);
      return {
        text: `Une activité commence à ${heure(h, m)} et dure ${ajout} minutes. À quelle heure se termine-t-elle ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${h} h ${totalMinutes}`, // l'écriture impossible, au-delà de 60
          heure(h + 1, m),
          heure(finH, finM === 0 ? 30 : 0),
          heure(finH + 1, finM),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour ajouter une durée, on avance d'abord jusqu'à l'heure ronde, puis on continue.",
          "On complète les minutes jusqu'à 60, puis on ajoute ce qui reste.",
          totalMinutes >= 60
            ? `De ${heure(h, m)} à ${h + 1} h, il y a ${60 - m} minutes. Il reste ${ajout - (60 - m)} minutes à ajouter : on arrive à ${bonne}. Une heure s'arrête à 60 minutes, « ${h} h ${totalMinutes} » n'existe pas.`
            : `${m} + ${ajout} = ${totalMinutes}, et on reste dans la même heure : ${bonne}.`,
          `Elle se termine à ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_duree_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "duree",
    microId: "ce1_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux durées en minutes.",
    tags: ["ce1", "duree", "defi", "template"],
    generate: () => {
      const cas = shuffle([
        { texte: "un quart d'heure", minutes: 15 },
        { texte: "une demi-heure", minutes: 30 },
        { texte: "trois quarts d'heure", minutes: 45 },
        { texte: "une heure", minutes: 60 },
      ]).slice(0, 2);
      const [a, b] = cas;
      const plusLong = a.minutes > b.minutes ? a : b;
      const plusCourt = a.minutes > b.minutes ? b : a;
      return {
        text: `Qu'est-ce qui dure le plus longtemps : ${a.texte} ou ${b.texte} ?`,
        format: "qcm",
        choices: makeChoices(plusLong.texte, [
          plusCourt.texte,
          "les deux durent pareil",
          "on ne peut pas comparer",
          "cela dépend du jour",
        ]),
        expected: [plusLong.texte],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux durées, on les écrit toutes les deux en minutes.",
          "On part de l'heure : 60 minutes, qu'on partage en deux ou en quatre.",
          `${a.texte} fait ${a.minutes} min et ${b.texte} fait ${b.minutes} min. Le plus grand nombre de minutes est ${plusLong.minutes}.`,
          `C'est ${plusLong.texte}.`,
        ),
      };
    },
  },
];
