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

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

// La bonne réponse est mise de côté, trois pièges distincts sont tirés ensuite,
// puis on mélange. L'écrire autrement a rendu des questions impossibles à
// réussir dans 79 banques : voir scripts/verifier-generateurs.mjs.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

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
  {
    kind: "template",
    id: "ce2_duree_lire_heure_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_lire_heure",
    difficulty: 3,
    theme: "neutral",
    hint: "Petite aiguille : le chiffre DÉPASSÉ. Grande aiguille : le chiffre × 5.",
    tags: ["ce2", "duree", "lire_heure", "template", "canvas"],
    generate: () => {
      const h = randomInt(1, 12);
      const cinq = randomInt(0, 11);
      const m = cinq * 5;
      const suivante = h === 12 ? 1 : h + 1;
      return {
        text: "Quelle heure indique cette horloge ?",
        format: "qcm",
        choices: makeChoices(heure(h, m), [
          // Le piège n° 1 : lire l'heure vers laquelle la petite aiguille va.
          heure(suivante, m),
          // Le piège n° 2 : lire le chiffre de la grande aiguille comme minutes.
          heure(h, cinq),
          // Le piège n° 3 : échanger les deux aiguilles.
          heure(cinq === 0 ? 12 : cinq, h * 5),
          heure(h, (m + 5) % 60),
        ]),
        expected: [heure(h, m)],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille donne les heures, la grande les minutes — et chaque chiffre vaut 5 minutes pour la grande.",
          "On lit d'abord le chiffre que la petite aiguille a dépassé, puis on multiplie par 5 le chiffre de la grande.",
          `La petite a dépassé le ${h} sans atteindre le ${suivante} : il est ${h} heures passées. La grande est sur le ${cinq} : ${cinq} × 5 = ${m} minutes.`,
          `Il est ${heure(h, m)}.`,
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
    id: "ce2_duree_lire_heure_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_lire_heure",
    difficulty: 2,
    theme: "neutral",
    hint: "« Et quart » c'est 15 minutes, « et demie » 30, « moins le quart » 45.",
    tags: ["ce2", "duree", "lire_heure", "template"],
    generate: () => {
      const h = randomInt(1, 11);
      const cas = randomChoice([
        { dit: `${h} heures et quart`, m: 15, pourquoi: "un quart de tour de la grande aiguille, soit 15 minutes" },
        { dit: `${h} heures et demie`, m: 30, pourquoi: "un demi-tour de la grande aiguille, soit 30 minutes" },
        { dit: `${h + 1} heures moins le quart`, m: 45, pourquoi: `il manque un quart d'heure pour atteindre ${h + 1} heures, on est donc à ${h} h 45` },
      ]);
      return {
        text: `On dit « ${cas.dit} ». Comment l'écrit-on en chiffres ?`,
        format: "qcm",
        choices: makeChoices(heure(h, cas.m), [
          heure(h, 15),
          heure(h, 30),
          heure(h, 45),
          heure(h + 1, cas.m),
        ]),
        expected: [heure(h, cas.m)],
        comparator: "mcq_exact",
        explanation: exp(
          "Un tour complet de la grande aiguille dure 60 minutes : le quart en vaut 15, la moitié 30.",
          "On traduit l'expression en minutes, puis on écrit l'heure en chiffres.",
          `« ${cas.dit} » : ${cas.pourquoi}.`,
          `On écrit ${heure(h, cas.m)}.`,
        ),
      };
    },
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
  {
    kind: "template",
    id: "ce2_duree_positionner_aiguilles_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_positionner_aiguilles",
    difficulty: 3,
    theme: "neutral",
    hint: "Partage les minutes par 5 pour trouver le nombre visé.",
    tags: ["ce2", "duree", "positionner_aiguilles", "template"],
    generate: () => {
      const h = randomInt(1, 12);
      const cinq = randomInt(1, 11);
      const m = cinq * 5;
      return {
        text: `Pour afficher ${heure(h, m)}, sur quel nombre doit pointer la GRANDE aiguille ?`,
        format: "short",
        expected: [String(cinq)],
        comparator: "number_equal",
        explanation: exp(
          "Pour la grande aiguille, chaque nombre de l'horloge vaut 5 minutes.",
          "On partage le nombre de minutes par 5.",
          `${m} ÷ 5 = ${cinq}. La grande aiguille pointe sur le ${cinq}.`,
          `Elle pointe sur le ${cinq}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_duree_positionner_aiguilles_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_positionner_aiguilles",
    difficulty: 4,
    theme: "neutral",
    hint: "La petite aiguille avance pendant l'heure : elle n'attend pas sur le chiffre.",
    tags: ["ce2", "duree", "positionner_aiguilles", "piege", "template"],
    generate: () => {
      const h = randomInt(1, 11);
      const cas = randomChoice([
        { m: 5, ou: `entre le ${h} et le ${h + 1}, tout près du ${h}`, pourquoi: "l'heure vient à peine de commencer" },
        { m: 30, ou: `entre le ${h} et le ${h + 1}, au milieu`, pourquoi: "on est à la moitié de l'heure" },
        { m: 55, ou: `entre le ${h} et le ${h + 1}, tout près du ${h + 1}`, pourquoi: "l'heure est presque finie" },
      ]);
      return {
        text: `Pour afficher ${heure(h, cas.m)}, où se trouve la PETITE aiguille ?`,
        format: "qcm",
        choices: makeChoices(cas.ou, [
          `exactement sur le ${h}`,
          `exactement sur le ${h + 1}`,
          `entre le ${h} et le ${h + 1}, tout près du ${h}`,
          `entre le ${h} et le ${h + 1}, au milieu`,
          `entre le ${h} et le ${h + 1}, tout près du ${h + 1}`,
        ]),
        expected: [cas.ou],
        comparator: "mcq_exact",
        explanation: exp(
          "La petite aiguille avance sans arrêt : elle glisse d'un nombre au suivant pendant toute l'heure.",
          "On regarde où on en est dans l'heure pour savoir où elle en est de son trajet.",
          `À ${heure(h, cas.m)}, ${cas.pourquoi}. La petite aiguille est donc ${cas.ou}.`,
          `Elle est ${cas.ou}.`,
        ),
      };
    },
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
  {
    kind: "template",
    id: "ce2_duree_convertir_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque heure apporte 60 minutes.",
    tags: ["ce2", "duree", "convertir", "template"],
    generate: () => {
      const h = randomInt(2, 6);
      const m = randomChoice([0, 10, 15, 20, 30, 45]);
      const total = h * 60 + m;
      return {
        text: `Combien de minutes font ${heure(h, m)} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "1 heure vaut 60 minutes.",
          "On transforme d'abord les heures en minutes, puis on ajoute les minutes déjà là.",
          m === 0
            ? `${h} × 60 = ${total}.`
            : `${h} × 60 = ${h * 60} minutes. On ajoute les ${m} minutes : ${h * 60} + ${m} = ${total}.`,
          `${heure(h, m)} font ${total} minutes.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_duree_convertir_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_convertir",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de fois 60 minutes tiennent-elles dedans ?",
    tags: ["ce2", "duree", "convertir", "template"],
    generate: () => {
      const h = randomInt(1, 5);
      const m = randomChoice([0, 15, 30, 45]);
      const total = h * 60 + m;
      return {
        text: `${total} minutes, cela fait combien d'heures et de minutes ?`,
        format: "qcm",
        choices: makeChoices(heure(h, m), [
          heure(h + 1, m),
          heure(h, (m + 15) % 60),
          // Le piège du « 100 » : on partage par 100 au lieu de 60.
          heure(h, (m + 30) % 60),
          heure(h + 2, m),
        ]),
        expected: [heure(h, m)],
        comparator: "mcq_exact",
        explanation: exp(
          "1 heure vaut 60 minutes.",
          "On cherche combien de fois 60 tient dans le total ; ce qui reste, ce sont les minutes.",
          `60 tient ${h} fois dans ${total} : ${h} × 60 = ${h * 60}. Il reste ${total} - ${h * 60} = ${m} minutes.`,
          `${total} minutes font ${heure(h, m)}.`,
        ),
      };
    },
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
    text: "Le car scolaire part de Saint-Joseph à 6 h 30 et arrive au collège à 7 h 15. Combien de temps dure le trajet, en minutes ?",
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
  {
    kind: "template",
    id: "ce2_duree_calculer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Avance jusqu'à l'heure ronde, puis compte ce qui reste.",
    tags: ["ce2", "duree", "calculer", "template", "canvas"],
    generate: () => {
      const hDebut = randomInt(8, 15);
      const mDebut = randomChoice([5, 10, 20, 25, 35, 40, 50, 55]);
      const duree = randomChoice([20, 25, 35, 40, 50]);
      const totalFin = hDebut * 60 + mDebut + duree;
      const hFin = Math.floor(totalFin / 60);
      const mFin = totalFin % 60;
      const versRonde = 60 - mDebut;
      return {
        text: `Une activité commence à ${heure(hDebut, mDebut)} et se termine à ${heure(hFin, mFin)}. Combien de minutes dure-t-elle ?`,
        format: "short",
        expected: [String(duree)],
        comparator: "number_equal",
        explanation: exp(
          "Une durée, c'est l'écart entre le début et la fin.",
          "On avance jusqu'à l'heure ronde suivante, puis on compte ce qui reste.",
          hFin > hDebut
            ? `De ${heure(hDebut, mDebut)} à ${hFin} h : ${versRonde} minutes. De ${hFin} h à ${heure(hFin, mFin)} : ${mFin} minutes. En tout : ${versRonde} + ${mFin} = ${duree} minutes.`
            : `Les deux heures sont les mêmes : ${mFin} - ${mDebut} = ${duree} minutes.`,
          `L'activité dure ${duree} minutes.`,
        ),
        canvas: dureeCanvas({
          variant: "double_horloge",
          start: { hour: hDebut, minute: mDebut, label: "Début" },
          end: { hour: hFin, minute: mFin, label: "Fin" },
          display: { showNumbers: true, showMinuteTicks: true, showLabels: true, showDigital: false },
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_duree_calculer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Ajoute d'abord les heures, puis les minutes — et surveille le passage à 60.",
    tags: ["ce2", "duree", "calculer", "template"],
    generate: () => {
      const hDebut = randomInt(7, 14);
      const mDebut = randomChoice([10, 20, 25, 40, 45, 50]);
      const ajoutH = randomInt(1, 3);
      const ajoutM = randomChoice([15, 20, 30, 35, 45]);
      const total = hDebut * 60 + mDebut + ajoutH * 60 + ajoutM;
      const hFin = Math.floor(total / 60);
      const mFin = total % 60;
      const retenue = mDebut + ajoutM >= 60;
      return {
        text: `Il est ${heure(hDebut, mDebut)}. Une activité dure ${ajoutH} h ${ajoutM} min. À quelle heure se termine-t-elle ?`,
        format: "qcm",
        choices: makeChoices(heure(hFin, mFin), [
          heure(hDebut + ajoutH, mDebut + ajoutM),
          heure(hFin, (mFin + 10) % 60),
          heure(hFin - 1, mFin),
          heure(hFin + 1, mFin),
        ]),
        expected: [heure(hFin, mFin)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ajouter une durée, c'est avancer les heures puis les minutes — sans jamais dépasser 59 minutes.",
          "On ajoute les heures, puis les minutes ; si les minutes atteignent 60, on les échange contre 1 heure.",
          retenue
            ? `Les heures : ${hDebut} + ${ajoutH} = ${hDebut + ajoutH}. Les minutes : ${mDebut} + ${ajoutM} = ${mDebut + ajoutM}, ce qui dépasse 60 : cela fait 1 heure et ${mDebut + ajoutM - 60} minutes. On avance donc encore d'une heure : ${hFin} h ${String(mFin).padStart(2, "0")}.`
            : `Les heures : ${hDebut} + ${ajoutH} = ${hFin}. Les minutes : ${mDebut} + ${ajoutM} = ${mFin}.`,
          `L'activité se termine à ${heure(hFin, mFin)}.`,
        ),
      };
    },
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
  {
    kind: "template",
    id: "ce2_duree_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Avance jusqu'à l'heure ronde, puis ajoute ce qui reste.",
    tags: ["ce2", "duree", "probleme", "reunion", "template"],
    generate: () => {
      // Le genre voyage avec le nom : « l'atelier se termine-t-IL », « la
      // séance se termine-t-ELLE ». Le déduire du début du mot se casse sur
      // « le spectacle », qui ne commence pas par une apostrophe.
      const contexte = randomChoice([
        { quoi: "la sortie au Jardin de l'État", pronom: "elle" },
        { quoi: "l'atelier lecture", pronom: "il" },
        { quoi: "la séance de piscine", pronom: "elle" },
        { quoi: "le spectacle de l'école", pronom: "il" },
      ]);
      const h = randomInt(8, 15);
      const m = randomChoice([10, 20, 35, 40, 50]);
      const duree = randomChoice([25, 30, 40, 45, 55]);
      const total = h * 60 + m + duree;
      const hFin = Math.floor(total / 60);
      const mFin = total % 60;
      const versRonde = 60 - m;
      return {
        text: `${contexte.quoi.charAt(0).toUpperCase() + contexte.quoi.slice(1)} commence à ${heure(h, m)} et dure ${duree} minutes. À quelle heure se termine-t-${contexte.pronom} ?`,
        format: "qcm",
        choices: makeChoices(heure(hFin, mFin), [
          heure(h, m + duree),
          heure(hFin + 1, mFin),
          heure(hFin, (mFin + 10) % 60),
          heure(h + 1, m),
        ]),
        expected: [heure(hFin, mFin)],
        comparator: "mcq_exact",
        explanation: exp(
          "Ajouter une durée, c'est avancer sur l'horloge — et une heure s'arrête à 59 minutes.",
          "On avance jusqu'à l'heure ronde suivante, puis on ajoute ce qui reste de la durée.",
          hFin > h
            ? `De ${heure(h, m)} à ${h + 1} h : ${versRonde} minutes. Il reste ${duree} - ${versRonde} = ${duree - versRonde} minutes à ajouter, donc ${heure(hFin, mFin)}.`
            : `Les minutes suffisent : ${m} + ${duree} = ${mFin}, donc ${heure(hFin, mFin)}.`,
          `Cela se termine à ${heure(hFin, mFin)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_duree_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "On recule cette fois : cherche ce qu'il faut enlever à l'heure d'arrivée.",
    tags: ["ce2", "duree", "probleme", "template"],
    generate: () => {
      const hFin = randomInt(9, 17);
      const mFin = randomChoice([5, 10, 15, 25, 30]);
      const duree = randomChoice([20, 30, 40, 45]);
      const total = hFin * 60 + mFin - duree;
      const h = Math.floor(total / 60);
      const m = total % 60;
      return {
        text: `Un spectacle se termine à ${heure(hFin, mFin)} et a duré ${duree} minutes. À quelle heure a-t-il commencé ?`,
        format: "qcm",
        choices: makeChoices(heure(h, m), [
          heure(hFin, mFin - duree < 0 ? mFin + duree : mFin - duree),
          heure(h - 1, m),
          heure(h, (m + 10) % 60),
          heure(h + 1, m),
        ]),
        expected: [heure(h, m)],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour trouver un début, on recule de la durée à partir de la fin.",
          "On recule d'abord jusqu'à l'heure ronde, puis on enlève ce qui reste.",
          h < hFin
            ? `De ${heure(hFin, mFin)} à ${hFin} h, on recule de ${mFin} minutes. Il reste ${duree} - ${mFin} = ${duree - mFin} minutes à enlever avant ${hFin} h, donc ${heure(h, m)}.`
            : `Les minutes suffisent : ${mFin} - ${duree} = ${m}, donc ${heure(h, m)}.`,
          `Il a commencé à ${heure(h, m)}.`,
        ),
      };
    },
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
  {
    kind: "template",
    id: "ce2_duree_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Ajoute les deux durées d'abord, puis avance sur l'horloge.",
    tags: ["ce2", "duree", "defi", "template"],
    generate: () => {
      const h = randomInt(8, 14);
      const m = randomChoice([0, 10, 15, 30, 45]);
      const d1 = randomChoice([20, 25, 35, 40]);
      const d2 = randomChoice([30, 45, 50, 55]);
      const total = h * 60 + m + d1 + d2;
      const hFin = Math.floor(total / 60);
      const mFin = total % 60;
      return {
        text: `Un atelier commence à ${heure(h, m)}. Il y a d'abord ${d1} minutes de préparation, puis ${d2} minutes de travail. À quelle heure l'atelier se termine-t-il ?`,
        format: "qcm",
        choices: makeChoices(heure(hFin, mFin), [
          heure(h, m + d1 + d2),
          heure(hFin + 1, mFin),
          heure(hFin, (mFin + 15) % 60),
          heure(h + 1, m),
        ]),
        expected: [heure(hFin, mFin)],
        comparator: "mcq_exact",
        explanation: exp(
          "Deux durées qui se suivent s'additionnent avant d'être reportées sur l'horloge.",
          "On additionne les deux durées, puis on échange chaque paquet de 60 minutes contre 1 heure.",
          `Les deux durées font ${d1} + ${d2} = ${d1 + d2} minutes. Or ${d1 + d2} minutes, c'est ${Math.floor((d1 + d2) / 60)} h ${(d1 + d2) % 60} min. En partant de ${heure(h, m)}, on arrive à ${heure(hFin, mFin)}.`,
          `L'atelier se termine à ${heure(hFin, mFin)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_duree_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "duree",
    microId: "ce2_duree_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compare les deux durées dans la même unité : passe tout en minutes.",
    tags: ["ce2", "duree", "defi", "template"],
    generate: () => {
      const hA = randomInt(1, 2);
      const mA = randomChoice([10, 20, 30, 40, 50]);
      const totalA = hA * 60 + mA;
      const totalB = totalA + randomChoice([-15, -10, 10, 15]);
      const gagnant = totalA > totalB ? `${hA} h ${mA} min` : `${totalB} minutes`;
      return {
        text: `Laquelle de ces deux durées est la plus LONGUE : ${hA} h ${mA} min ou ${totalB} minutes ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          totalA > totalB ? `${totalB} minutes` : `${hA} h ${mA} min`,
          "elles sont égales",
          "on ne peut pas comparer",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux durées qu'après les avoir écrites dans la même unité.",
          "On transforme les heures en minutes : chaque heure en apporte 60.",
          `${hA} h ${mA} min = ${hA} × 60 + ${mA} = ${totalA} minutes. On compare alors ${totalA} et ${totalB}.`,
          `La plus longue est ${gagnant}.`,
        ),
      };
    },
  },
];
