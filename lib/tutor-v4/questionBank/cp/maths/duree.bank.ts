// lib/tutor-v4/questionBank/cp/maths/duree.bank.ts
//
// Le repérage dans le temps au CP, écrit à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Au CP, le travail mené sur le repérage dans le temps se limite aux
//     HEURES ENTIÈRES. » Trois heures, neuf heures, et aussi midi ;
//   — positionner les aiguilles pour une heure entière inférieure ou égale à
//     douze, du matin ou de l'après-midi ;
//   — associer une heure à un moment de la journée : se lever, aller à
//     l'école, déjeuner.
//   ⛔ PAS de demi-heure, PAS de quart d'heure, PAS de minute, et AUCUNE durée
//     à calculer : tout cela arrive au CE1. La notion s'appelle d'ailleurs
//     « Le repérage dans le temps » au CP, et « … et les durées » au CE1.
//
// LE PIÈGE DE LA NOTION : lire la GRANDE aiguille au lieu de la petite. À
// trois heures, la grande aiguille est sur le 12 et la petite sur le 3 —
// l'enfant qui regarde la plus longue, la plus visible, annonce « douze
// heures ». Le piège n'existe qu'aux heures entières, c'est-à-dire exactement
// au CP.
//
// ⛔ `display.showDigital` ÉCRIT L'HEURE EN CHIFFRES sous le cadran. On ne le
// rallume jamais sur une question de lecture : le dessin donnerait la réponse.
//
// ⭐ 10/11/2026 — ROBUSTESSE ET DESSINS. Les gabarits tirent un prénom de la
// troupe, une horloge (classe, gare, réveil, château…), un événement d'enfant
// (le cirque, la fusée, le goûter) et une tournure : la même phrase ne revient
// plus. L'horloge à aiguilles accompagne presque chaque gabarit : elle PORTE la
// question (on la lit), elle ne donne jamais la réponse en chiffres.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

import type { DureeCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";
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

const AFFICHAGE_SANS_CHIFFRES = {
  showNumbers: true,
  showMinuteTicks: false,
  // ⛔ Jamais true sur une question de lecture : l'heure s'écrirait en
  // chiffres sous le cadran.
  showDigital: false,
  showLabels: false,
} as const;

function horloge(heure: number, minute = 0): DureeCanvasData {
  return {
    kind: "duree",
    variant: "horloge",
    time: { hour: heure, minute },
    display: { ...AFFICHAGE_SANS_CHIFFRES },
    size: { width: 220, height: 220 },
  };
}

/** Deux horloges côte à côte, chacune sous le prénom de son enfant. */
function deuxHorloges(h1: number, nom1: string, h2: number, nom2: string): DureeCanvasData {
  return {
    kind: "duree",
    variant: "double_horloge",
    start: { hour: h1, minute: 0, label: nom1 },
    end: { hour: h2, minute: 0, label: nom2 },
    display: { ...AFFICHAGE_SANS_CHIFFRES, showLabels: true },
  };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** « 1 heure », « 7 heures ». */
const heures = (h: number) => (h === 1 ? "1 heure" : `${h} heures`);
const suivante = (h: number) => (h === 12 ? 1 : h + 1);
const precedente = (h: number) => (h === 1 ? 12 : h - 1);

const PRENOMS = [
  "Nina", "Téo", "Zoé", "Ravi", "Lou", "Malo", "Inès", "Sacha",
  "Amir", "Jade", "Naïa", "Tom", "Lina", "Yanis", "Léa", "Enzo",
] as const;
const commenceParVoyelle = (mot: string) => /^[aeiouéèêâîôû]/i.test(mot);
/** « de Nina », « d'Inès ». */
const de = (mot: string) => (commenceParVoyelle(mot) ? `d'${mot}` : `de ${mot}`);
const majuscule = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const PENDULES = [
  "l'horloge de la classe",
  "l'horloge de la cuisine",
  "la pendule du salon",
  "l'horloge de la gare",
  "le réveil de la chambre",
  "l'horloge de la bibliothèque",
  "l'horloge de la mairie",
  "l'horloge du château",
  "la pendule de mamie",
  "l'horloge de la piscine",
  "l'horloge de la ferme",
  "l'horloge du zoo",
  "l'horloge de la boulangerie",
  "l'horloge du cirque",
] as const;

const EVENEMENTS = [
  "Le spectacle du cirque commence.",
  "Le gâteau sort du four.",
  "Le train part de la gare.",
  "La piscine ouvre ses portes.",
  "Le match de football commence.",
  "Le goûter est prêt.",
  "La fusée décolle.",
  "Le marché ouvre.",
  "La bibliothèque ouvre.",
  "Les poules sortent du poulailler.",
  "Le dragon du conte se réveille.",
  "Le bateau des pirates quitte le port.",
  "La fête de l'école commence.",
  "Le zoo donne à manger aux lions.",
  "La boulangère sort le pain du four.",
  "La vétérinaire ouvre son cabinet.",
] as const;

/* Les moments d'une journée d'enfant. `moment` sert aux questions « à quel
   moment ? » ; deux activités du même moment ne sont jamais proposées ensemble
   (elles seraient justes toutes les deux). */
type Moment = "le matin" | "à midi" | "l'après-midi" | "le soir";
const MOMENTS: readonly { action: string; heure: number; moment: Moment }[] = [
  { action: "se réveiller", heure: 7, moment: "le matin" },
  { action: "prendre le petit-déjeuner", heure: 7, moment: "le matin" },
  { action: "arriver à l'école", heure: 8, moment: "le matin" },
  { action: "aller en récréation", heure: 10, moment: "le matin" },
  { action: "déjeuner à la cantine", heure: 12, moment: "à midi" },
  { action: "reprendre la classe", heure: 2, moment: "l'après-midi" },
  { action: "faire du sport au gymnase", heure: 3, moment: "l'après-midi" },
  { action: "prendre le goûter", heure: 4, moment: "l'après-midi" },
  { action: "jouer au parc", heure: 5, moment: "l'après-midi" },
  { action: "dîner en famille", heure: 7, moment: "le soir" },
  { action: "écouter une histoire au lit", heure: 8, moment: "le soir" },
  { action: "se coucher", heure: 8, moment: "le soir" },
];
const DU_MOMENT: Record<Moment, string> = {
  "le matin": "du matin",
  "à midi": "",
  "l'après-midi": "de l'après-midi",
  "le soir": "du soir",
};
/** « Il est 7 heures du matin », « Il est midi ». */
const ilEst = (h: number, m: Moment) => (m === "à midi" ? "Il est midi" : `Il est ${heures(h)} ${DU_MOMENT[m]}`);

export const dureeBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_DUREE_LIRE_HEURE — LE piège de la notion
     La grande aiguille attire l'œil ; c'est la petite qui parle.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_lire_heure_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 3,
    theme: "neutral",
    text: "Sur une horloge, la petite aiguille est sur le 3 et la grande aiguille est sur le 12. Quelle heure est-il ?",
    format: "qcm",
    choices: ["3 heures", "12 heures", "15 heures", "3 heures et 12 minutes"],
    expected: ["3 heures"],
    comparator: "mcq_exact",
    hint: "C'est la PETITE aiguille qui dit l'heure. La grande sur le 12 veut dire que l'heure est pile.",
    explanation: exp(
      "Sur une horloge à aiguilles, la petite aiguille indique les heures et la grande les minutes.",
      "On lit d'abord la petite aiguille, puis on vérifie que la grande est bien sur le 12.",
      "La petite aiguille est sur le 3 : il est donc 3 heures. La grande est sur le 12, ce qui veut dire qu'il est l'heure pile, sans minute en plus. Elle ne dit pas « 12 heures » : elle est plus longue, mais ce n'est pas elle qui compte les heures.",
      "Il est 3 heures.",
    ),
    tags: ["cp", "duree", "lire_heure", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_duree_lire_heure_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une horloge à aiguilles, laquelle des deux aiguilles indique les heures ?",
    format: "qcm",
    choices: [
      "la petite aiguille",
      "la grande aiguille",
      "les deux ensemble",
      "celle qui bouge le plus vite",
    ],
    expected: ["la petite aiguille"],
    comparator: "mcq_exact",
    hint: "La plus grande fait le tour du cadran en une heure. Elle va bien trop vite pour compter les heures.",
    explanation: exp(
      "La petite aiguille compte les heures, la grande compte les minutes.",
      "On regarde laquelle avance lentement : c'est elle qui marque les heures.",
      "La grande aiguille fait un tour complet en une heure seulement. La petite met douze heures à faire le tour du cadran : c'est elle qui indique l'heure.",
      "C'est la petite aiguille.",
    ),
    tags: ["cp", "duree", "lire_heure", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_lire_heure_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 3,
    theme: "neutral",
    hint: "Suis la PETITE aiguille : c'est elle qui donne l'heure.",
    tags: ["cp", "duree", "lire_heure", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 12);
      const bonne = heures(heure);
      const evenement = randomChoice(EVENEMENTS);
      const nom = randomChoice(PRENOMS);
      const question = randomChoice([
        "Quelle heure est-il ?",
        "À quelle heure ?",
        `Quelle heure lit ${nom} ?`,
        "Quelle heure montre l'horloge ?",
      ]);
      return {
        text: `${evenement} Regarde l'horloge. ${question}`,
        format: "qcm",
        choices: makeChoices(bonne, [
          heure === 12 ? "6 heures" : "12 heures",
          heures(suivante(heure)),
          heures(precedente(heure)),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille indique les heures, la grande les minutes.",
          "On repère où pointe la petite aiguille, puis on vérifie que la grande est sur le 12.",
          `La petite aiguille pointe le ${heure} : il est ${bonne}. La grande est sur le 12, donc il est l'heure pile.`,
          `Il est ${bonne}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_lire_heure_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    hint: "La petite aiguille se pose sur le nombre des heures.",
    tags: ["cp", "duree", "lire_heure", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 12);
      const nom = randomChoice(PRENOMS);
      const pendule = randomChoice(PENDULES);
      const text = randomChoice([
        `${nom} regarde ${pendule}. Quelle heure est-il ?`,
        `${nom} lève les yeux vers ${pendule}. Quelle heure est-il ?`,
        `Pic le paille-en-queue se pose sur ${pendule}. Quelle heure est-il ?`,
        `Voici ${pendule}. Quelle heure lit ${nom} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(heure)],
        comparator: "number_equal",
        explanation: exp(
          "La petite aiguille indique les heures.",
          "On lit le nombre que touche la petite aiguille.",
          `La petite aiguille est sur le ${heure} : il est ${heures(heure)}. La grande sur le 12 signale que l'heure est pile.`,
          `Il est ${heures(heure)}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_lire_heure_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    hint: "La petite aiguille est la plus courte. La grande est la plus longue.",
    tags: ["cp", "duree", "lire_heure", "aiguilles", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 11);
      const nom = randomChoice(PRENOMS);
      const pendule = randomChoice(PENDULES);
      const petite = randomChoice([true, false]);
      const laquelle = petite ? "la PETITE aiguille" : "la GRANDE aiguille";
      const bonne = petite ? heure : 12;
      const text = randomChoice([
        `${nom} regarde ${pendule}. Sur quel nombre est ${laquelle} ?`,
        `Sur ${pendule}, ${laquelle} montre quel nombre ?`,
        `${nom} pose le doigt sur ${laquelle}. Elle montre quel nombre ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Une horloge a deux aiguilles : la petite pour les heures, la grande pour les minutes.",
          "On repère d'abord quelle aiguille est la plus courte, puis on lit son nombre.",
          `La petite aiguille est sur le ${heure}, la grande sur le 12. ${petite ? `La petite montre donc le ${heure}.` : "La grande montre donc le 12."}`,
          `${majuscule(laquelle.toLowerCase())} montre le ${bonne}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_lire_heure_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_lire_heure",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis toi-même la PETITE aiguille, puis compare.",
    tags: ["cp", "duree", "lire_heure", "piege", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 11);
      const nom = randomChoice(PRENOMS);
      const pendule = randomChoice(PENDULES);
      const cas = randomChoice(["juste", "grande", "voisine"] as const);
      const dit = cas === "juste" ? heure : cas === "grande" ? 12 : suivante(heure);
      const juste = "oui, c'est juste";
      const vraie = `non, il est ${heures(heure)}`;
      const bonne = cas === "juste" ? juste : vraie;
      const text = randomChoice([
        `${nom} regarde ${pendule} et dit : « Il est ${heures(dit)}. » Est-ce juste ?`,
        `« Il est ${heures(dit)} ! » dit ${nom} devant ${pendule}. Est-ce juste ?`,
        `${nom} lit l'heure sur ${pendule} : « ${heures(dit)} ». Est-ce la bonne heure ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(
          bonne,
          cas === "juste"
            ? [`non, il est ${heures(suivante(heure))}`, `non, il est ${heures(precedente(heure))}`]
            : [juste, `non, il est ${heures(cas === "voisine" ? precedente(heure) : suivante(heure))}`],
        ),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "C'est la petite aiguille qui indique l'heure.",
          "On lit la petite aiguille, puis on compare avec ce qui est dit.",
          cas === "juste"
            ? `La petite aiguille est sur le ${heure} : il est bien ${heures(heure)}.`
            : cas === "grande"
              ? `${nom} a lu la GRANDE aiguille, qui est sur le 12. La petite est sur le ${heure} : il est ${heures(heure)}.`
              : `La petite aiguille est sur le ${heure}, pas sur le ${dit} : il est ${heures(heure)}.`,
          cas === "juste" ? "Oui, c'est juste." : `Non : il est ${heures(heure)}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },

  /* =========================================================
     CP_DUREE_PLACER_AIGUILLES — le chemin inverse
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_placer_aiguilles_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux montrer 8 heures pile sur une horloge. Où faut-il mettre la GRANDE aiguille ?",
    format: "qcm",
    choices: ["sur le 12", "sur le 8", "sur le 6", "n'importe où"],
    expected: ["sur le 12"],
    comparator: "mcq_exact",
    hint: "Une heure pile, c'est zéro minute.",
    explanation: exp(
      "Une heure pile, c'est une heure sans minute en plus.",
      "On place la grande aiguille sur le 12, puis la petite sur le nombre d'heures.",
      "La grande aiguille compte les minutes : sur le 12, elle marque zéro minute. C'est la petite qui ira sur le 8.",
      "La grande aiguille se met sur le 12.",
    ),
    tags: ["cp", "duree", "placer_aiguilles", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_placer_aiguilles_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 2,
    theme: "neutral",
    hint: "La petite aiguille se pose sur le nombre d'heures. La grande va sur le 12.",
    tags: ["cp", "duree", "placer_aiguilles", "template"],
    generate: () => {
      const heure = randomInt(1, 11);
      const nom = randomChoice(PRENOMS);
      const evenement = randomChoice(EVENEMENTS).replace(/\.$/, "");
      const petite = Math.random() < 0.7;
      const laquelle = petite ? "la PETITE aiguille" : "la GRANDE aiguille";
      const bonne = petite ? heure : 12;
      const text = randomChoice([
        `${nom} règle l'horloge en carton sur ${heures(heure)} pile. Où met-on ${laquelle} ?`,
        `${evenement} à ${heures(heure)}. ${nom} le montre sur l'horloge. Où va ${laquelle} ?`,
        `Il est ${heures(heure)} pile. Sur quel nombre faut-il mettre ${laquelle} ?`,
        `${nom} veut montrer ${heures(heure)} à Pic. Sur quel nombre met-on ${laquelle} ?`,
      ]);
      return {
        text,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "La petite aiguille indique les heures, la grande les minutes.",
          "Pour une heure pile, la petite va sur le nombre d'heures et la grande sur le 12.",
          `Pour ${heures(heure)} pile, la petite aiguille se pose sur le ${heure} et la grande sur le 12.`,
          `${majuscule(laquelle.toLowerCase())} se met sur le ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_placer_aiguilles_tpl_4",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 2,
    theme: "neutral",
    hint: "Lis la petite aiguille de l'horloge : est-ce l'heure voulue ?",
    tags: ["cp", "duree", "placer_aiguilles", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 12);
      const nom = randomChoice(PRENOMS);
      const pendule = randomChoice(PENDULES);
      const bon = Math.random() < 0.5;
      const voulue = bon ? heure : randomChoice([suivante(heure), precedente(heure)]);
      const oui = "oui, c'est bon";
      const non = `non, l'horloge montre ${heures(heure)}`;
      const bonne = bon ? oui : non;
      const text = randomChoice([
        `${nom} voulait régler ${pendule} sur ${heures(voulue)}. Voici l'horloge. Est-ce bon ?`,
        `${nom} a placé les aiguilles pour ${heures(voulue)}. Regarde. Est-ce bon ?`,
        `Pic demande ${heures(voulue)}. ${nom} règle ${pendule} comme ça. Est-ce bon ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(
          bonne,
          bon
            ? [`non, l'horloge montre ${heures(suivante(heure))}`, `non, l'horloge montre ${heures(precedente(heure))}`]
            : [oui, `non, l'horloge montre ${heures(voulue === suivante(heure) ? precedente(heure) : suivante(heure))}`],
        ),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille indique l'heure.",
          "On lit la petite aiguille de l'horloge, puis on compare avec l'heure voulue.",
          `La petite aiguille est sur le ${heure} et la grande sur le 12 : l'horloge montre ${heures(heure)}. On voulait ${heures(voulue)}.`,
          bon ? "Oui, c'est bon." : `Non : l'horloge montre ${heures(heure)}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_placer_aiguilles_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 4,
    theme: "neutral",
    hint: "Les deux aiguilles ne se placent pas au même endroit.",
    tags: ["cp", "duree", "placer_aiguilles", "piege", "template"],
    generate: () => {
      const heure = randomInt(1, 11);
      const nom = randomChoice(PRENOMS);
      const evenement = randomChoice(EVENEMENTS).replace(/\.$/, "");
      const bonne = `la petite sur le ${heure}, la grande sur le 12`;
      const text = randomChoice([
        `${evenement} à ${heures(heure)}. Comment placer les aiguilles ?`,
        `${nom} veut montrer ${heures(heure)} pile. Comment placer les aiguilles ?`,
        `${nom} dessine une horloge qui montre ${heures(heure)}. Où vont les aiguilles ?`,
        `Pic veut voir ${heures(heure)} sur ${randomChoice(PENDULES)}. Où vont les aiguilles ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [
          `la petite sur le 12, la grande sur le ${heure}`,
          `les deux sur le ${heure}`,
          "les deux sur le 12",
          `la petite sur le ${heure}, la grande sur le 6`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille marque les heures, la grande marque les minutes.",
          "On place chaque aiguille selon ce qu'elle compte.",
          `Il est ${heures(heure)}, donc la petite aiguille va sur le ${heure}. Il est l'heure pile, donc zéro minute : la grande va sur le 12.`,
          `On met ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_placer_aiguilles_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_placer_aiguilles",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde où est la PETITE aiguille, puis où est la GRANDE.",
    tags: ["cp", "duree", "placer_aiguilles", "piege", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 11);
      const nom = randomChoice(PRENOMS);
      const cas = randomChoice(["juste", "inversees", "decalee"] as const);
      const juste = "c'est juste";
      const inversees = "les deux aiguilles sont inversées";
      const decalee = "la petite aiguille est sur le mauvais nombre";
      const sur6 = "la grande aiguille doit aller sur le 6";
      const bonne = cas === "juste" ? juste : cas === "inversees" ? inversees : decalee;
      // Aiguilles inversées : la petite près du 12, la grande sur le nombre.
      const canvas =
        cas === "juste" ? horloge(heure) : cas === "inversees" ? horloge(12, heure * 5) : horloge(suivante(heure));
      const text = randomChoice([
        `${nom} veut montrer ${heures(heure)}. Voici son horloge. Qu'en penses-tu ?`,
        `${nom} règle le réveil sur ${heures(heure)}. Regarde les aiguilles. Que dis-tu ?`,
        `Pour ${heures(heure)}, ${nom} a placé les aiguilles ainsi. Qu'en penses-tu ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [juste, inversees, decalee, sur6]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour une heure pile, la petite aiguille va sur le nombre d'heures et la grande sur le 12.",
          "On vérifie la petite aiguille, puis la grande.",
          cas === "juste"
            ? `La petite est sur le ${heure}, la grande sur le 12 : c'est bien ${heures(heure)}.`
            : cas === "inversees"
              ? `La grande est sur le ${heure} et la petite près du 12 : les aiguilles ont été échangées. Il fallait la petite sur le ${heure}.`
              : `La grande est bien sur le 12, mais la petite est sur le ${suivante(heure)} au lieu du ${heure}.`,
          majuscule(bonne) + ".",
        ),
        canvas,
      };
    },
  },

  /* =========================================================
     CP_DUREE_JOUR_SEMAINE — l'heure et le moment de la journée
  ========================================================= */
  {
    kind: "template",
    id: "cp_duree_jour_semaine_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_jour_semaine",
    difficulty: 2,
    theme: "neutral",
    hint: "Repense à ce que tu fais à cette heure-là.",
    tags: ["cp", "duree", "moment_journee", "template", "canvas"],
    generate: () => {
      const m = randomChoice(MOMENTS);
      const autres = MOMENTS.filter((x) => x.moment !== m.moment).map((x) => x.action);
      const nom = randomChoice(PRENOMS);
      const question = randomChoice([
        "Que fait-on d'habitude à ce moment-là ?",
        `C'est le moment de quoi, pour ${nom} ?`,
        `Que fait ${nom} d'habitude ?`,
      ]);
      return {
        text: `Regarde l'horloge. ${ilEst(m.heure, m.moment)}. ${question}`,
        format: "qcm",
        choices: makeChoices(m.action, autres),
        expected: [m.action],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque heure de la journée correspond à des activités habituelles.",
          "On se rappelle le déroulement d'une journée d'école, du lever au coucher.",
          `${ilEst(m.heure, m.moment)} : c'est le moment de « ${m.action} ».`,
          `On fait cela : ${m.action}.`,
        ),
        canvas: horloge(m.heure),
      };
    },
  },
  {
    kind: "fixed",
    id: "cp_duree_jour_semaine_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_jour_semaine",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « Je me lève à 7 heures du soir. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, on se lève à 7 heures du MATIN",
      "oui, c'est possible",
      "non, on se lève toujours à midi",
      "on ne peut pas savoir",
    ],
    expected: ["non, on se lève à 7 heures du MATIN"],
    comparator: "mcq_exact",
    hint: "Le soir, il fait nuit et on va se coucher.",
    explanation: exp(
      "La même heure existe deux fois par jour : une fois le matin, une fois l'après-midi ou le soir.",
      "On regarde ce que l'on fait d'habitude à ce moment-là.",
      "À 7 heures du matin, on se lève pour aller à l'école. À 7 heures du soir, il fait sombre et on dine. C'est le même 7 sur le cadran, mais pas le même moment de la journée.",
      "Non : on se lève à 7 heures du matin.",
    ),
    tags: ["cp", "duree", "moment_journee", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_jour_semaine_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_jour_semaine",
    difficulty: 2,
    theme: "neutral",
    hint: "Le même nombre revient deux fois par jour : pense à ce que l'on fait.",
    tags: ["cp", "duree", "moment_journee", "template", "canvas"],
    generate: () => {
      const m = randomChoice(MOMENTS);
      const nom = randomChoice(PRENOMS);
      const tous: Moment[] = ["le matin", "à midi", "l'après-midi", "le soir"];
      const text = randomChoice([
        `L'horloge sonne. Pour ${nom}, c'est l'heure ${de(m.action)}. À quel moment de la journée ?`,
        `${nom} va ${m.action} à l'heure de l'horloge. C'est à quel moment de la journée ?`,
        `Pic regarde ${nom} ${m.action}. C'est à quel moment de la journée ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(m.moment, [...tous.filter((x) => x !== m.moment), "la nuit"]),
        expected: [m.moment],
        comparator: "mcq_exact",
        explanation: exp(
          "Une même heure revient deux fois par jour : il faut penser à l'activité.",
          "On repense à l'ordre des activités, du lever au coucher.",
          `« ${majuscule(m.action)} », c'est ${m.moment}, vers ${m.heure === 12 ? "midi" : heures(m.heure)}.`,
          `C'est ${m.moment}.`,
        ),
        canvas: horloge(m.heure),
      };
    },
  },

  /* =========================================================
     CP_DUREE_ORDONNER — ranger les moments de la journée
  ========================================================= */
  {
    kind: "template",
    id: "cp_duree_ordonner_tpl_3",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Pars du réveil et avance jusqu'au soir.",
    tags: ["cp", "duree", "ordonner", "template"],
    generate: () => {
      const journee = [
        { action: "se lever", h: 7 },
        { action: "arriver à l'école", h: 8 },
        { action: "aller en récréation", h: 10 },
        { action: "déjeuner", h: 12 },
        { action: "faire du sport", h: 15 },
        { action: "sortir de l'école", h: 16 },
        { action: "jouer au parc", h: 17 },
        { action: "dîner", h: 19 },
        { action: "se coucher", h: 20 },
      ];
      const nom = randomChoice(PRENOMS);
      const tirage = shuffle(journee).slice(0, 3);
      const range = [...tirage].sort((x, y) => x.h - y.h);
      const noms = (l: typeof range) => l.map((o) => o.action).join(", ");
      const inverse = [...range].reverse();
      const echangeDebut = [range[1], range[0], range[2]];
      const echangeFin = [range[0], range[2], range[1]];
      const text = randomChoice([
        `Range ces trois moments dans l'ordre de la journée : ${noms(tirage)}.`,
        `Aide ${nom} à ranger sa journée : ${noms(tirage)}. Quel est le bon ordre ?`,
        `Pic a mélangé la journée ${de(nom)} : ${noms(tirage)}. Remets-la dans l'ordre.`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(noms(range), [noms(inverse), noms(echangeDebut), noms(echangeFin)]),
        expected: [noms(range)],
        comparator: "mcq_exact",
        explanation: exp(
          "Les moments d'une journée se suivent toujours dans le même ordre.",
          "On se demande ce qui arrive en premier, puis ensuite, puis à la fin.",
          `D'abord « ${range[0].action} », puis « ${range[1].action} », et enfin « ${range[2].action} ».`,
          `L'ordre est : ${noms(range)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_ordonner_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_ordonner",
    difficulty: 3,
    theme: "neutral",
    hint: "Lis la petite aiguille de chaque horloge, puis compare les deux nombres.",
    tags: ["cp", "duree", "ordonner", "template", "canvas"],
    generate: () => {
      const [a, b] = shuffle(PRENOMS).slice(0, 2);
      const matin = Math.random() < 0.5;
      // Le matin de 7 h à 11 h, l'après-midi de 1 h à 6 h : les deux heures sont
      // du même moment, la comparaison des nombres suffit.
      const [ha, hb] = shuffle(matin ? [7, 8, 9, 10, 11] : [1, 2, 3, 4, 5, 6]).slice(0, 2);
      const lieu = randomChoice([
        "à la piscine", "au parc", "à la bibliothèque", "au marché", "chez mamie",
        "au zoo", "à la ferme", "au cirque", "à la plage", "au stade", "au jardin", "à la fête",
      ]);
      const premier = ha < hb ? a : b;
      const dernier = ha < hb ? b : a;
      const cherchePremier = Math.random() < 0.5;
      const bonne = cherchePremier ? premier : dernier;
      const moment = matin ? "Ce matin" : "Cet après-midi";
      const question = cherchePremier
        ? randomChoice(["Qui arrive le premier ?", "Qui arrive le plus tôt ?"])
        : randomChoice(["Qui arrive le dernier ?", "Qui arrive le plus tard ?"]);
      return {
        text: `${moment}, ${a} et ${b} vont ${lieu}. Les horloges montrent leur heure d'arrivée. ${question}`,
        format: "qcm",
        choices: shuffle([a, b, "les deux en même temps"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une même matinée ou un même après-midi, la plus petite heure arrive en premier.",
          "On lit la petite aiguille de chaque horloge, puis on compare les deux nombres.",
          `${a} arrive à ${heures(ha)}, ${b} à ${heures(hb)}. ${Math.min(ha, hb)} vient avant ${Math.max(ha, hb)}.`,
          `C'est ${bonne}.`,
        ),
        canvas: deuxHorloges(ha, a, hb, b),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_ordonner_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_ordonner",
    difficulty: 2,
    theme: "neutral",
    hint: "Après une heure vient la suivante, comme dans la suite des nombres.",
    tags: ["cp", "duree", "ordonner", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 12);
      const apres = randomChoice([true, false]);
      const bonne = apres ? suivante(heure) : precedente(heure);
      const nom = randomChoice(PRENOMS);
      const pendule = randomChoice(PENDULES);
      const text = apres
        ? randomChoice([
            `${nom} regarde ${pendule}. Quelle heure viendra juste après ?`,
            `Voici ${pendule}. Pic attend l'heure suivante. Laquelle ?`,
            `${nom} attend l'heure d'après sur ${pendule}. Quelle heure sera-t-il ?`,
          ])
        : randomChoice([
            `${nom} regarde ${pendule}. Quelle heure était-il juste avant ?`,
            `Voici ${pendule}. Quelle heure vient juste avant ?`,
            `${nom} montre ${pendule} à Pic. Quelle heure était-il juste avant ?`,
          ]);
      return {
        text,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Les heures se suivent sur le cadran comme les nombres dans la comptine.",
          `On lit la petite aiguille, puis on ${apres ? "avance" : "recule"} d'un nombre sur le cadran.`,
          `L'horloge montre ${heures(heure)}. Juste ${apres ? "après" : "avant"}, il est ${heures(bonne)}.`,
          `C'est ${heures(bonne)}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },

  /* =========================================================
     CP_DUREE_DEFI — le cadran et ce qu'il ne dit pas tout seul
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_duree_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "À midi, où sont les deux aiguilles de l'horloge ?",
    format: "qcm",
    choices: [
      "les deux sur le 12",
      "la petite sur le 12, la grande sur le 6",
      "la petite sur le 6, la grande sur le 12",
      "les deux sur le 6",
    ],
    expected: ["les deux sur le 12"],
    comparator: "mcq_exact",
    hint: "Midi, c'est 12 heures pile.",
    explanation: exp(
      "Midi, c'est 12 heures pile : douze heures et zéro minute.",
      "On place la petite aiguille sur l'heure, la grande sur les minutes.",
      "La petite aiguille marque 12 heures : elle est sur le 12. Il est l'heure pile, donc zéro minute : la grande est aussi sur le 12. C'est le seul moment de la journée où elles se superposent sur le 12.",
      "Les deux aiguilles sont sur le 12.",
    ),
    tags: ["cp", "duree", "defi", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_duree_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une horloge n'a que douze nombres écrits sur son cadran. Pourtant une journée dure vingt-quatre heures. Comment est-ce possible ?",
    format: "qcm",
    choices: [
      "la petite aiguille fait deux fois le tour dans une journée",
      "l'horloge est cassée",
      "une journée dure douze heures",
      "on change le cadran à midi",
    ],
    expected: ["la petite aiguille fait deux fois le tour dans une journée"],
    comparator: "mcq_exact",
    hint: "Une fois le matin, une fois l'après-midi.",
    explanation: exp(
      "Le cadran d'une horloge à aiguilles ne montre que douze heures.",
      "On suit la petite aiguille pendant toute une journée.",
      "La petite aiguille fait un premier tour du matin jusqu'à midi, puis un second tour de midi jusqu'à minuit. Voilà pourquoi on précise « du matin » ou « du soir » : 7 heures existe deux fois dans la journée.",
      "La petite aiguille fait deux fois le tour du cadran.",
    ),
    tags: ["cp", "duree", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_duree_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Regarde bien laquelle des deux aiguilles a bougé.",
    tags: ["cp", "duree", "defi", "piege", "template"],
    generate: () => {
      const heure = randomInt(1, 11);
      const nom = randomChoice(PRENOMS);
      const pendule = randomChoice(PENDULES);
      const bonne = `il est ${heures(heure)}`;
      const text = randomChoice([
        `Sur ${pendule}, la GRANDE aiguille est sur le 12, la PETITE sur le ${heure}. Que peut-on dire ?`,
        `${nom} ne voit pas ${pendule}. Pic lui dit : « La grande est sur le 12, la petite sur le ${heure}. » Quelle heure est-il ?`,
        `Devinette ${de(nom)} : la petite aiguille est sur le ${heure}, la grande sur le 12. Quelle heure est-il ?`,
      ]);
      return {
        text,
        format: "qcm",
        choices: makeChoices(bonne, [
          "il est 12 heures",
          `il est ${heure} minute${heure > 1 ? "s" : ""}`,
          `il est 12 heures et ${heure} minute${heure > 1 ? "s" : ""}`,
          `il est ${heures(suivante(heure))}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille donne l'heure, la grande donne les minutes.",
          "On lit la petite d'abord, la grande ensuite.",
          `La petite est sur le ${heure} : il est ${heures(heure)}. La grande sur le 12 veut dire zéro minute, pas « douze heures » — la grande ne compte jamais les heures.`,
          `Il est ${heures(heure)} pile.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_duree_defi_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "duree",
    microId: "cp_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Lis l'heure du dessin, puis recule ou avance d'une heure.",
    tags: ["cp", "duree", "defi", "template", "canvas"],
    generate: () => {
      const heure = randomInt(1, 12);
      const nom = randomChoice(PRENOMS);
      const avance = Math.random() < 0.5;
      const bonne = avance ? precedente(heure) : suivante(heure);
      const objet = randomChoice([
        { nom: `Le réveil ${de(nom)}`, il: "il" },
        { nom: `La pendule ${de(nom)}`, il: "elle" },
        { nom: "L'horloge de la cabane", il: "elle" },
        { nom: "La vieille horloge du château", il: "elle" },
        { nom: "L'horloge du bateau pirate", il: "elle" },
        { nom: "Le réveil de la fusée", il: "il" },
        { nom: "La montre du dragon", il: "elle" },
        { nom: "Le réveil de la vétérinaire", il: "il" },
        { nom: "L'horloge de la ferme", il: "elle" },
      ]);
      const text = avance
        ? `${objet.nom} avance d'une heure. Voici ce qu'${objet.il} montre. Quelle est la vraie heure ?`
        : `${objet.nom} retarde d'une heure. Voici ce qu'${objet.il} montre. Quelle est la vraie heure ?`;
      return {
        text,
        format: "short",
        expected: [String(bonne)],
        comparator: "number_equal",
        explanation: exp(
          "Une horloge qui avance montre une heure plus tard que la vraie ; une horloge qui retarde, une heure plus tôt.",
          `On lit l'heure du dessin, puis on ${avance ? "recule" : "avance"} d'une heure.`,
          `Le dessin montre ${heures(heure)}. ${avance ? "Une heure avant" : "Une heure après"}, c'est ${heures(bonne)}.`,
          `La vraie heure est ${heures(bonne)}.`,
        ),
        canvas: horloge(heure),
      };
    },
  },
];
