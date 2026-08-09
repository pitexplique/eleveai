// lib/tutor-v4/questionBank/ce2/maths/longueur.bank.ts
//
// Les longueurs du CE2, écrites à la main. Jusqu'ici les huit
// micro-compétences passaient par le constructeur commun, qui aiguille sur la
// NOTION : « choisir l'unité la mieux adaptée » et « mesurer un segment »
// recevaient le même « Un ruban mesure 34 cm… ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les unités km, m, dm, cm
// et mm, et les relations connues entre elles. DEUX interdits du texte, qui
// pèsent sur presque chaque question :
//   — pas de tableau de conversion : on passe par les relations (1 m = 100 cm,
//     1 km = 1000 m), pas par des colonnes à remplir ;
//   — pas d'écriture à virgule pour les longueurs. On écrit « 2 m 50 cm », et
//     jamais « 2,50 m ». La virgule est réservée à la monnaie.
//
// LE PIÈGE DE LA NOTION, celui qu'ils font tous : comparer les NOMBRES au lieu
// des longueurs. « 90 cm est plus long que 1 m, parce que 90 est plus grand
// que 1. » Il revient dans comparer, dans problème et dans les défis.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.
// Les réponses numériques en `short` deviennent cliquables toutes seules —
// l'unité écrite après le nombre est conservée par le convertisseur.

import type { NumberLineCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function numberLine(data: Omit<NumberLineCanvasData, "kind">): NumberLineCanvasData {
  return { kind: "number_line", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

/** Les cinq unités du CE2, de la plus petite à la plus grande. */
const UNITES = [
  { abrev: "mm", nom: "millimètre", pluriel: "millimètres" },
  { abrev: "cm", nom: "centimètre", pluriel: "centimètres" },
  { abrev: "dm", nom: "décimètre", pluriel: "décimètres" },
  { abrev: "m", nom: "mètre", pluriel: "mètres" },
  { abrev: "km", nom: "kilomètre", pluriel: "kilomètres" },
] as const;

/** Les relations que le programme demande de connaître, sans tableau. */
const RELATIONS = [
  { grande: "m", petite: "cm", facteur: 100, nomGrande: "mètre", nomPetite: "centimètres" },
  { grande: "m", petite: "dm", facteur: 10, nomGrande: "mètre", nomPetite: "décimètres" },
  { grande: "m", petite: "mm", facteur: 1000, nomGrande: "mètre", nomPetite: "millimètres" },
  { grande: "dm", petite: "cm", facteur: 10, nomGrande: "décimètre", nomPetite: "centimètres" },
  { grande: "cm", petite: "mm", facteur: 10, nomGrande: "centimètre", nomPetite: "millimètres" },
  { grande: "km", petite: "m", facteur: 1000, nomGrande: "kilomètre", nomPetite: "mètres" },
] as const;

export const longueurBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_LONGUEUR_UNITES — connaître km, m, dm, cm, mm
     Ce qui se joue ici : savoir laquelle est grande, laquelle
     est petite. Sans cet ordre, aucune conversion ne tient.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_unites_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Parmi le mètre, le centimètre et le millimètre, quelle est la plus PETITE unité ?",
    format: "qcm",
    choices: ["le millimètre", "le centimètre", "le mètre", "elles sont pareilles"],
    expected: ["le millimètre"],
    comparator: "mcq_exact",
    hint: "Regarde l'épaisseur d'une pièce de monnaie : on la mesure avec la plus petite.",
    explanation: exp(
      "Le millimètre est la plus petite unité de longueur qu'on utilise au CE2.",
      "On range les unités : millimètre, centimètre, décimètre, mètre, kilomètre.",
      "Il faut 10 millimètres pour faire 1 centimètre, et 100 centimètres pour faire 1 mètre. Le millimètre est donc tout en bas.",
      "La plus petite est le millimètre.",
    ),
    tags: ["ce2", "longueur", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_unites_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le mot « kilomètre », que veut dire « kilo » ?",
    format: "qcm",
    choices: ["mille", "cent", "dix", "un million"],
    expected: ["mille"],
    comparator: "mcq_exact",
    hint: "C'est le même « kilo » que dans kilogramme.",
    explanation: exp(
      "« Kilo » est un mot grec qui veut dire mille.",
      "On lit le début du mot pour retrouver combien de fois l'unité est répétée.",
      "Un kilomètre, c'est mille mètres. C'est le même « kilo » que dans kilogramme, qui vaut mille grammes.",
      "« Kilo » veut dire mille.",
    ),
    tags: ["ce2", "longueur", "unites", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_unites_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 3,
    theme: "reunion",
    text: "Sur la route entre Saint-Denis et Saint-Pierre, les panneaux annoncent les distances en km. Pourquoi pas en cm ?",
    format: "qcm",
    choices: [
      "parce que le nombre de centimètres serait beaucoup trop grand",
      "parce que le centimètre n'existe pas sur la route",
      "parce que le kilomètre est plus précis",
      "parce qu'on ne peut pas mesurer une route",
    ],
    expected: ["parce que le nombre de centimètres serait beaucoup trop grand"],
    comparator: "mcq_exact",
    hint: "80 km, ça ferait combien de centimètres ? Un nombre à huit chiffres.",
    explanation: exp(
      "On choisit une unité pour que le nombre reste facile à lire.",
      "On imagine la même distance écrite dans l'autre unité, puis on regarde la taille du nombre.",
      "Saint-Denis–Saint-Pierre fait environ 80 km. En centimètres, cela ferait 8 000 000 cm : illisible sur un panneau.",
      "On utilise le kilomètre pour garder un nombre court.",
    ),
    tags: ["ce2", "longueur", "unites", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_longueur_unites_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 2,
    theme: "neutral",
    hint: "La première lettre donne la piste : m pour milli, c pour centi, k pour kilo.",
    tags: ["ce2", "longueur", "unites", "template"],
    generate: () => {
      const u = randomChoice(UNITES);
      return {
        text: `Que veut dire l'abréviation « ${u.abrev} » ?`,
        format: "qcm",
        choices: makeChoices(u.nom, UNITES.map((x) => x.nom)),
        expected: [u.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque unité de longueur a une abréviation, toujours écrite sans point et sans s.",
          "On lit l'abréviation lettre par lettre : le m final dit « mètre », ce qu'il y a devant dit lequel.",
          `« ${u.abrev} » se lit « ${u.nom} ». On l'écrit toujours pareil, même pour plusieurs ${u.pluriel} : 5 ${u.abrev}, jamais 5 ${u.abrev}s.`,
          `« ${u.abrev} » veut dire ${u.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_unites_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_unites",
    difficulty: 3,
    theme: "neutral",
    hint: "Range-les dans ta tête : mm, cm, dm, m, km.",
    tags: ["ce2", "longueur", "unites", "template"],
    generate: () => {
      const [i, j] = shuffle([0, 1, 2, 3, 4]).slice(0, 2).sort((a, b) => a - b);
      const petite = UNITES[i];
      const grande = UNITES[j];
      const plusGrande = randomChoice([true, false]);
      const bonne = plusGrande ? grande.nom : petite.nom;
      return {
        text: plusGrande
          ? `Laquelle de ces deux unités est la PLUS GRANDE : le ${petite.nom} ou le ${grande.nom} ?`
          : `Laquelle de ces deux unités est la PLUS PETITE : le ${petite.nom} ou le ${grande.nom} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          plusGrande ? petite.nom : grande.nom,
          "elles sont égales",
          "on ne peut pas comparer",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les unités de longueur se rangent toujours dans le même ordre : mm, cm, dm, m, km.",
          "On place les deux unités dans cette liste et on regarde laquelle vient après.",
          `Le ${petite.nom} vient avant le ${grande.nom} dans la liste : il est donc plus petit.`,
          `C'est le ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_RELATIONS — passer d'une unité à l'autre
     Le programme dit : par les relations connues, pas par un
     tableau de conversion.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_relations_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Regarde une règle d'un mètre : compte ses graduations.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On se rappelle du mètre de la classe : il porte 100 petits traits numérotés.",
      "Le « centi » de centimètre veut dire cent : il faut 100 centimètres pour faire 1 mètre.",
      "1 m = 100 cm.",
    ),
    tags: ["ce2", "longueur", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_relations_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 m = 10 cm ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 m = 100 cm",
      "oui",
      "non, 1 m = 1000 cm",
      "non, 1 m = 10 mm",
    ],
    expected: ["non, 1 m = 100 cm"],
    comparator: "mcq_exact",
    hint: "10 cm, c'est à peu près la largeur de ta main. Un mètre est bien plus long.",
    explanation: exp(
      "1 mètre vaut 100 centimètres, et 10 décimètres.",
      "On vérifie avec un objet connu : 10 cm, c'est la largeur d'une main.",
      "Il a confondu avec le décimètre : 1 m = 10 dm, mais 1 m = 100 cm. Dix mains ne font pas un mètre… il en faut dix fois plus de centimètres.",
      "Non : 1 m = 100 cm.",
    ),
    tags: ["ce2", "longueur", "relations", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_relations_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilomètre vaut 1000 mètres.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un kilomètre, c'est mille mètres bout à bout. Marcher 1 km, c'est faire environ 1250 pas.",
      "1 km = 1000 m.",
    ),
    tags: ["ce2", "longueur", "relations", "remarquable"],
  },
  {
    kind: "template",
    id: "ce2_longueur_relations_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 2,
    theme: "neutral",
    hint: "Une seule grande unité vaut déjà plusieurs petites : multiplie.",
    tags: ["ce2", "longueur", "relations", "template"],
    generate: () => {
      const r = randomChoice(RELATIONS);
      const n = randomInt(2, 9);
      const total = n * r.facteur;
      return {
        text: `Combien de ${r.nomPetite} font ${n} ${r.grande} ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          `1 ${r.nomGrande} vaut ${r.facteur} ${r.nomPetite}.`,
          "Pour passer d'une grande unité à une petite, on multiplie : il faut plus de petites unités pour la même longueur.",
          `${n} × ${r.facteur} = ${total}. Donc ${n} ${r.grande} = ${total} ${r.petite}.`,
          `${n} ${r.grande} font ${total} ${r.petite}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_relations_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 3,
    theme: "neutral",
    hint: "Plusieurs petites unités font une seule grande : partage.",
    tags: ["ce2", "longueur", "relations", "template"],
    generate: () => {
      const r = randomChoice(RELATIONS);
      const n = randomInt(2, 9);
      const total = n * r.facteur;
      return {
        text: `Combien de ${r.grande === "m" ? "mètres" : r.nomGrande + "s"} font ${total} ${r.petite} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          `1 ${r.nomGrande} vaut ${r.facteur} ${r.nomPetite}.`,
          "Pour passer d'une petite unité à une grande, on partage : il faut moins de grandes unités pour la même longueur.",
          `${total} ÷ ${r.facteur} = ${n}. Donc ${total} ${r.petite} = ${n} ${r.grande}.`,
          `${total} ${r.petite} font ${n} ${r.grande}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_relations_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_relations",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis d'abord les mètres en centimètres, puis ajoute ce qui reste.",
    tags: ["ce2", "longueur", "relations", "template"],
    generate: () => {
      const m = randomInt(1, 6);
      const cm = randomInt(5, 95);
      const total = m * 100 + cm;
      return {
        text: `Une planche mesure ${m} m ${cm} cm. Combien mesure-t-elle en centimètres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur écrite en deux unités se convertit en une seule en additionnant.",
          "On transforme d'abord les mètres en centimètres, puis on ajoute les centimètres déjà là.",
          `${m} m = ${m * 100} cm. On ajoute les ${cm} cm : ${m * 100} + ${cm} = ${total}.`,
          `La planche mesure ${total} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_MESURER — mesurer et tracer des segments
     Le piège d'ici : poser la règle n'importe où. Le zéro de
     la règle doit tomber sur le début du segment ; sinon il
     faut soustraire.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_mesurer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 1,
    theme: "neutral",
    text: "Pour mesurer un segment avec une règle graduée, où faut-il placer le début du segment ?",
    format: "qcm",
    choices: [
      "sur la graduation 0",
      "sur le bord de la règle",
      "sur la graduation 1",
      "n'importe où, cela ne change rien",
    ],
    expected: ["sur la graduation 0"],
    comparator: "mcq_exact",
    hint: "Le bord de la règle et le zéro ne sont pas toujours au même endroit.",
    explanation: exp(
      "Mesurer, c'est compter les graduations à partir de zéro.",
      "On cale le début du segment sur le 0, puis on lit le nombre à l'autre bout.",
      "Sur beaucoup de règles, le 0 est un peu après le bord en plastique. Si on part du bord, on compte des millimètres qui n'existent pas.",
      "On place le début du segment sur la graduation 0.",
    ),
    tags: ["ce2", "longueur", "mesurer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_mesurer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    text: "Léa a mal posé sa règle : le début du segment tombe sur la graduation 2 et la fin sur la graduation 9. Combien mesure le segment, en cm ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ne lis pas 9 : compte les graduations entre 2 et 9.",
    explanation: exp(
      "La mesure d'un segment, c'est l'écart entre les deux graduations, pas le nombre lu à l'arrivée.",
      "Quand la règle est décalée, on soustrait la graduation de départ de celle d'arrivée.",
      "9 - 2 = 7. Le segment mesure 7 cm, pas 9 cm : les deux premiers centimètres de la règle sont en dehors du segment.",
      "Le segment mesure 7 cm.",
    ),
    tags: ["ce2", "longueur", "mesurer", "piege"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_mesurer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu veux tracer un segment de 8 cm. Tu as marqué un point sur la graduation 0 de ta règle. Que fais-tu ensuite ?",
    format: "qcm",
    choices: [
      "je marque un point sur la graduation 8 et je relie les deux points",
      "je compte 8 traits après le bord de la règle",
      "je trace un trait au hasard puis je le mesure",
      "je marque un point sur la graduation 9 pour être sûr",
    ],
    expected: ["je marque un point sur la graduation 8 et je relie les deux points"],
    comparator: "mcq_exact",
    hint: "Tracer, c'est mesurer à l'envers : on place les deux points d'abord.",
    explanation: exp(
      "Tracer un segment d'une longueur donnée, c'est placer deux points puis les relier.",
      "On pose le 0 de la règle sur le premier point, on repère la graduation voulue, on marque le second point.",
      "Le premier point est sur le 0, le second sur le 8 : entre les deux, il y a bien 8 centimètres. On relie ensuite les deux points en suivant la règle.",
      "On marque un point sur la graduation 8, puis on relie.",
    ),
    tags: ["ce2", "longueur", "mesurer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_longueur_mesurer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 3,
    theme: "neutral",
    hint: "Soustrais la graduation de départ de celle d'arrivée.",
    tags: ["ce2", "longueur", "mesurer", "template", "canvas"],
    generate: () => {
      const debut = randomInt(1, 6);
      const longueur = randomInt(3, 8);
      const fin = debut + longueur;
      return {
        text: `Sur cette règle, le segment commence à la graduation ${debut} et se termine à la graduation ${fin}. Combien mesure-t-il, en cm ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "La mesure d'un segment, c'est l'écart entre les deux graduations.",
          "Quand la règle ne commence pas à 0, on soustrait la graduation de départ.",
          `${fin} - ${debut} = ${longueur}. Le segment mesure ${longueur} cm, et non ${fin} cm.`,
          `Il mesure ${longueur} cm.`,
        ),
        canvas: numberLine({
          min: 0,
          max: 15,
          step: 1,
          points: [
            { value: debut, label: "début", color: "#2563eb" },
            { value: fin, label: "fin", color: "#ef4444" },
          ],
        }),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_mesurer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_mesurer",
    difficulty: 4,
    theme: "neutral",
    hint: "Le segment doit être long de la longueur demandée : ajoute-la au point de départ.",
    tags: ["ce2", "longueur", "mesurer", "template"],
    generate: () => {
      const cassure = randomInt(2, 5);
      const longueur = randomInt(4, 9);
      const arrivee = cassure + longueur;
      return {
        text: `Ta règle est cassée : elle commence à la graduation ${cassure}. Tu poses le début de ton segment sur cette graduation. Sur quelle graduation dois-tu t'arrêter pour tracer ${longueur} cm ?`,
        format: "short",
        expected: [String(arrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Ce qui compte, c'est l'écart entre les deux graduations, pas le nombre de départ.",
          "On ajoute la longueur voulue à la graduation de départ.",
          `${cassure} + ${longueur} = ${arrivee}. De la graduation ${cassure} à la graduation ${arrivee}, il y a bien ${longueur} cm.`,
          `Il faut s'arrêter sur la graduation ${arrivee}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_COMPARER — comparer des longueurs
     LE piège de la notion : comparer les nombres au lieu des
     longueurs. 90 cm contre 1 m, et l'élève choisit 90.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui est le plus long : 1 m ou 90 cm ?",
    format: "qcm",
    choices: ["1 m", "90 cm", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 m"],
    comparator: "mcq_exact",
    hint: "Écris les deux longueurs dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux longueurs qu'après les avoir écrites dans la même unité.",
      "On choisit l'unité la plus petite des deux et on convertit.",
      "1 m = 100 cm. Or 100 cm est plus long que 90 cm. Le nombre 90 est plus grand que 1, mais il compte des centimètres, pas des mètres.",
      "1 m est plus long que 90 cm.",
    ),
    tags: ["ce2", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 950 m, c'est plus long que 1 km, parce que 950 est plus grand que 1. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 km vaut 1000 m",
      "oui",
      "non, 1 km vaut 100 m",
      "on ne peut pas comparer des mètres et des kilomètres",
    ],
    expected: ["non, 1 km vaut 1000 m"],
    comparator: "mcq_exact",
    hint: "Mets tout en mètres, puis compare.",
    explanation: exp(
      "Un nombre sans son unité ne dit rien : 950 mètres et 1 kilomètre ne se comparent pas tels quels.",
      "On écrit les deux longueurs en mètres, puis on compare les nombres.",
      "1 km = 1000 m. Or 950 m est plus court que 1000 m. Il manque même 50 m pour atteindre le kilomètre.",
      "Non : 950 m est plus court que 1 km.",
    ),
    tags: ["ce2", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Le Piton des Neiges culmine à environ 3071 m, le Piton de la Fournaise à environ 2632 m. Lequel est le plus haut ?",
    format: "qcm",
    choices: [
      "le Piton des Neiges",
      "le Piton de la Fournaise",
      "ils sont à la même hauteur",
      "on ne peut pas savoir",
    ],
    expected: ["le Piton des Neiges"],
    comparator: "mcq_exact",
    hint: "Les deux sont en mètres : compare directement les nombres.",
    explanation: exp(
      "Quand deux longueurs sont écrites dans la même unité, on compare directement les nombres.",
      "On regarde d'abord le chiffre des milliers.",
      "3071 et 2632 ont tous les deux quatre chiffres. Le chiffre des milliers est 3 pour le Piton des Neiges et 2 pour la Fournaise : 3071 > 2632.",
      "Le Piton des Neiges est le plus haut.",
    ),
    tags: ["ce2", "longueur", "comparer", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_longueur_comparer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Même unité d'abord, comparaison ensuite.",
    tags: ["ce2", "longueur", "comparer", "piege", "template"],
    generate: () => {
      // Le nombre en centimètres est TOUJOURS plus grand que celui en mètres :
      // c'est ce décalage qui fait tomber les élèves dans le piège.
      const m = randomInt(1, 5);
      const enCm = m * 100;
      const cm = randomChoice([enCm - randomInt(1, 40), enCm + randomInt(1, 40)]);
      const gagnant = cm > enCm ? `${cm} cm` : `${m} m`;
      return {
        text: `Qu'est-ce qui est le plus long : ${m} m ou ${cm} cm ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          cm > enCm ? `${m} m` : `${cm} cm`,
          "c'est pareil",
          "on ne peut pas savoir",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux longueurs qu'après les avoir écrites dans la même unité.",
          "On convertit les mètres en centimètres, car 1 m = 100 cm.",
          `${m} m = ${enCm} cm. On compare alors ${enCm} cm et ${cm} cm : ${cm > enCm ? `${cm} est plus grand que ${enCm}` : `${enCm} est plus grand que ${cm}`}.`,
          `Le plus long est ${gagnant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_comparer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris les trois longueurs en centimètres avant de choisir.",
    tags: ["ce2", "longueur", "comparer", "template"],
    generate: () => {
      // Trois longueurs à comparer, dont une écrite en mètres et centimètres :
      // c'est elle la plus longue, et c'est elle qui porte le plus petit nombre.
      const petit = randomInt(20, 70);
      const moyen = randomInt(120, 260);
      const gros = randomInt(3, 6) * 100 + randomInt(10, 90);
      const items = shuffle([
        { texte: `${petit} cm`, cm: petit },
        { texte: `${moyen} cm`, cm: moyen },
        { texte: `${Math.floor(gros / 100)} m ${gros % 100} cm`, cm: gros },
      ]);
      const maxCm = Math.max(...items.map((i) => i.cm));
      const gagnant = items.find((i) => i.cm === maxCm)!;
      return {
        text: `Range mentalement ces trois longueurs. Laquelle est la plus LONGUE : ${items.map((i) => i.texte).join(", ")} ?`,
        format: "qcm",
        choices: makeChoices(gagnant.texte, [
          ...items.filter((i) => i.cm !== maxCm).map((i) => i.texte),
          "elles sont égales",
        ]),
        expected: [gagnant.texte],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer plusieurs longueurs, on les écrit toutes dans la même unité.",
          "On choisit le centimètre, la plus petite unité de la liste, et on convertit : 1 m = 100 cm.",
          `En centimètres : ${items.map((i) => `${i.texte} = ${i.cm} cm`).join(" ; ")}. Le plus grand nombre est ${maxCm}.`,
          `La plus longue est ${gagnant.texte}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_CHOISIR_UNITE — l'unité la mieux adaptée
     On choisit l'unité qui donne un nombre commode : ni un
     nombre à sept chiffres, ni une virgule.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_choisir_unite_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 1,
    theme: "neutral",
    text: "Avec quelle unité mesure-t-on la longueur d'un crayon ?",
    format: "qcm",
    choices: ["le centimètre", "le kilomètre", "le mètre", "le millimètre"],
    expected: ["le centimètre"],
    comparator: "mcq_exact",
    hint: "Un crayon tient dans la main : quelle unité donne un nombre facile ?",
    explanation: exp(
      "On choisit l'unité qui donne le nombre le plus simple à dire.",
      "On essaie chaque unité et on regarde le nombre qu'elle donne.",
      "Un crayon mesure environ 17 cm. En millimètres cela ferait 170 mm, plus long à dire, et en mètres il faudrait une virgule.",
      "On mesure un crayon en centimètres.",
    ),
    tags: ["ce2", "longueur", "choisir_unite", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_choisir_unite_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « la porte de la classe mesure 2 cm de haut ». Quelle unité aurait-il dû écrire ?",
    format: "qcm",
    choices: ["le mètre", "le millimètre", "le kilomètre", "le décimètre"],
    expected: ["le mètre"],
    comparator: "mcq_exact",
    hint: "2 cm, c'est à peu près la largeur de ton pouce.",
    explanation: exp(
      "Une unité mal choisie rend la phrase absurde, même si le nombre est juste.",
      "On compare avec un objet connu : 2 cm, c'est la largeur d'un pouce.",
      "Une porte de classe fait environ 2 m, soit 200 cm. Le nombre 2 était bon, c'est l'unité qui manquait : des mètres, pas des centimètres.",
      "Il fallait écrire 2 m.",
    ),
    tags: ["ce2", "longueur", "choisir_unite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_choisir_unite_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Avec quelle unité mesure-t-on la distance entre Saint-Denis et Saint-Pierre ?",
    format: "qcm",
    choices: ["le kilomètre", "le mètre", "le centimètre", "le décimètre"],
    expected: ["le kilomètre"],
    comparator: "mcq_exact",
    hint: "C'est un trajet en voiture d'environ une heure et demie.",
    explanation: exp(
      "Pour les longues distances, on utilise le kilomètre.",
      "On imagine le nombre obtenu avec chaque unité, et on garde celle qui donne le plus court.",
      "Saint-Denis–Saint-Pierre fait environ 80 km. Ce serait 80 000 m, ou 8 000 000 cm : personne ne dit une distance comme ça.",
      "On mesure cette distance en kilomètres.",
    ),
    tags: ["ce2", "longueur", "choisir_unite", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_longueur_choisir_unite_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine l'objet, puis choisis l'unité qui donne le nombre le plus simple.",
    tags: ["ce2", "longueur", "choisir_unite", "template"],
    generate: () => {
      const objets = [
        { nom: "la longueur d'une gomme", unite: "le centimètre", ordre: "environ 4 cm" },
        { nom: "l'épaisseur d'une pièce de monnaie", unite: "le millimètre", ordre: "environ 2 mm" },
        { nom: "la hauteur d'un immeuble", unite: "le mètre", ordre: "environ 20 m" },
        { nom: "la longueur d'un terrain de foot", unite: "le mètre", ordre: "environ 100 m" },
        { nom: "la distance entre deux villes", unite: "le kilomètre", ordre: "des dizaines de kilomètres" },
        { nom: "la largeur d'un cahier", unite: "le centimètre", ordre: "environ 17 cm" },
        { nom: "l'épaisseur d'un cheveu", unite: "le millimètre", ordre: "moins de 1 mm" },
        { nom: "la longueur d'un bus", unite: "le mètre", ordre: "environ 12 m" },
      ] as const;
      const o = randomChoice(objets);
      return {
        text: `Quelle unité choisis-tu pour mesurer ${o.nom} ?`,
        format: "qcm",
        choices: makeChoices(o.unite, [
          "le millimètre",
          "le centimètre",
          "le mètre",
          "le kilomètre",
        ]),
        expected: [o.unite],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'unité qui donne un nombre simple, sans virgule et sans une file de zéros.",
          "On imagine l'objet, puis on essaie les unités une par une.",
          `Pour ${o.nom}, la bonne taille est ${o.ordre}. Une autre unité donnerait un nombre trop grand ou trop petit.`,
          `On utilise ${o.unite}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_choisir_unite_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_choisir_unite",
    difficulty: 3,
    theme: "neutral",
    hint: "Le nombre peut être juste et l'unité fausse. Regarde l'unité.",
    tags: ["ce2", "longueur", "choisir_unite", "piege", "template"],
    generate: () => {
      const phrases = [
        { objet: "une table de classe", nombre: 1, bonne: "m", fausse: "km" },
        { objet: "une trousse", nombre: 20, bonne: "cm", fausse: "m" },
        { objet: "un stade", nombre: 100, bonne: "m", fausse: "cm" },
        { objet: "une fourmi", nombre: 5, bonne: "mm", fausse: "cm" },
        { objet: "un tableau de classe", nombre: 3, bonne: "m", fausse: "cm" },
        { objet: "une clé", nombre: 6, bonne: "cm", fausse: "m" },
      ] as const;
      const p = randomChoice(phrases);
      return {
        text: `Un élève écrit : « ${p.objet} mesure ${p.nombre} ${p.fausse} ». Quelle unité fallait-il écrire ?`,
        format: "qcm",
        choices: makeChoices(p.bonne, ["mm", "cm", "m", "km"]),
        expected: [p.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le nombre et l'unité vont ensemble : changer l'unité change complètement la longueur.",
          "On garde le nombre et on cherche l'unité qui rend la phrase possible.",
          `${p.nombre} ${p.fausse} est absurde pour ${p.objet}. Avec ${p.bonne}, la phrase devient juste : ${p.objet} mesure environ ${p.nombre} ${p.bonne}.`,
          `Il fallait écrire ${p.nombre} ${p.bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_ESTIMER — estimer à partir de références
     Estimer n'est pas deviner : c'est comparer à une longueur
     qu'on connaît par cœur.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_estimer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 1,
    theme: "neutral",
    text: "Environ combien mesure la hauteur d'une porte de salle de classe ?",
    format: "qcm",
    choices: ["2 m", "2 cm", "20 m", "2 km"],
    expected: ["2 m"],
    comparator: "mcq_exact",
    hint: "Un adulte passe dessous sans se baisser, mais de justesse.",
    explanation: exp(
      "Estimer, c'est comparer à une longueur qu'on connaît déjà.",
      "On prend une référence sûre : un adulte mesure à peu près 1 m 70.",
      "Une porte est un peu plus haute qu'un adulte, donc environ 2 m. 20 m, ce serait un immeuble de six étages.",
      "Une porte de classe mesure environ 2 m.",
    ),
    tags: ["ce2", "longueur", "estimer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_estimer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit que son doigt fait 1 m de large. Qu'aurait-il dû dire ?",
    format: "qcm",
    choices: ["1 cm", "1 mm", "1 dm", "1 km"],
    expected: ["1 cm"],
    comparator: "mcq_exact",
    hint: "Combien de doigts pour faire la largeur de ta main ?",
    explanation: exp(
      "Une bonne référence permet de repérer tout de suite une estimation absurde.",
      "On compare le doigt à un objet connu : une règle graduée.",
      "Un doigt d'enfant fait environ 1 cm de large : dix doigts côte à côte font 10 cm, la largeur d'une main. Un mètre, ce serait cent doigts.",
      "Il aurait dû dire 1 cm.",
    ),
    tags: ["ce2", "longueur", "estimer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_estimer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 3,
    theme: "reunion",
    text: "La route du Littoral relie Saint-Denis à La Possession. Elle mesure environ 12 ... ? Choisis l'unité.",
    format: "qcm",
    choices: ["km", "m", "cm", "mm"],
    expected: ["km"],
    comparator: "mcq_exact",
    hint: "On la parcourt en voiture en un quart d'heure.",
    explanation: exp(
      "Pour un trajet en voiture, la bonne unité est le kilomètre.",
      "On compare à une référence : marcher 1 km prend environ un quart d'heure.",
      "12 m, ce serait la longueur d'un bus. La route du Littoral longe toute la falaise : c'est bien 12 km, soit 12 000 m.",
      "Elle mesure environ 12 km.",
    ),
    tags: ["ce2", "longueur", "estimer", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_longueur_estimer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare à un objet que tu as déjà tenu dans la main.",
    tags: ["ce2", "longueur", "estimer", "template"],
    generate: () => {
      const refs = [
        { objet: "une règle d'écolier", bonne: "30 cm", pourquoi: "elle tient dans la trousse et couvre la largeur d'un cahier" },
        { objet: "un lit d'enfant", bonne: "1 m 60", pourquoi: "on s'y allonge tout entier" },
        { objet: "une salle de classe", bonne: "8 m", pourquoi: "il faut une dizaine de grands pas pour la traverser" },
        { objet: "une pièce de 1 euro", bonne: "2 cm", pourquoi: "elle se cache derrière un ongle de pouce" },
        { objet: "un stylo", bonne: "14 cm", pourquoi: "il fait à peu près la largeur d'une main d'adulte" },
        { objet: "une porte d'entrée", bonne: "2 m", pourquoi: "un adulte passe dessous sans se baisser" },
      ] as const;
      const r = randomChoice(refs);
      const autres = refs.filter((x) => x.bonne !== r.bonne).map((x) => x.bonne);
      return {
        text: `Environ combien mesure ${r.objet} ?`,
        format: "qcm",
        choices: makeChoices(r.bonne, autres),
        expected: [r.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Estimer, c'est comparer à une longueur qu'on connaît par cœur.",
          "On cherche un repère du quotidien avant de choisir un nombre.",
          `Pour ${r.objet}, le repère est simple : ${r.pourquoi}. Cela donne ${r.bonne}.`,
          `${r.objet} mesure environ ${r.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_estimer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_estimer",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de fois la référence tient-elle dans la longueur cherchée ?",
    tags: ["ce2", "longueur", "estimer", "template"],
    generate: () => {
      const pas = 50; // un pas d'élève, la référence qu'on fabrique en classe
      const metres = randomInt(3, 20);
      const nbPas = (metres * 100) / pas;
      return {
        text: `Un pas d'élève mesure environ ${pas} cm. Environ combien de pas faut-il pour parcourir ${metres} m ?`,
        format: "short",
        expected: [String(nbPas)],
        comparator: "number_equal",
        explanation: exp(
          "Estimer une longueur, c'est reporter une référence connue autant de fois qu'il faut.",
          "On écrit la distance dans la même unité que la référence, puis on cherche combien de fois elle y tient.",
          `${metres} m = ${metres * 100} cm. Or ${pas} cm entrent 2 fois dans 1 m, donc ${metres * 100} ÷ ${pas} = ${nbPas}.`,
          `Il faut environ ${nbPas} pas.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_PROBLEME — un problème de longueurs
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Pour la fête de l'école, on décore la cour avec un ruban. On a un rouleau de 3 m et un autre de 250 cm. Combien de centimètres de ruban en tout ?",
    format: "short",
    expected: ["550"],
    comparator: "number_equal",
    hint: "Mets les deux rouleaux en centimètres avant d'additionner.",
    explanation: exp(
      "On n'additionne des longueurs que si elles sont écrites dans la même unité.",
      "On convertit d'abord, on additionne ensuite.",
      "3 m = 300 cm. Puis 300 + 250 = 550.",
      "Il y a 550 cm de ruban en tout.",
    ),
    tags: ["ce2", "longueur", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Une corde mesure 2 m. On coupe un morceau de 65 cm, puis un autre de 45 cm. Combien de centimètres reste-t-il ?",
    format: "short",
    expected: ["90"],
    comparator: "number_equal",
    hint: "Additionne d'abord les deux morceaux coupés.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On convertit la corde en centimètres, on additionne les morceaux coupés, puis on soustrait.",
      "2 m = 200 cm. Les morceaux coupés font 65 + 45 = 110 cm. Il reste 200 - 110 = 90 cm.",
      "Il reste 90 cm de corde.",
    ),
    tags: ["ce2", "longueur", "probleme", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_longueur_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même unité d'abord, opération ensuite.",
    tags: ["ce2", "longueur", "probleme", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { qui: "Malia", quoi: "du tissu pour un tour de cou", ou: "au marché forain de Saint-Paul" },
        { qui: "Kevin", quoi: "de la ficelle pour un cerf-volant", ou: "sur la plage de l'Étang-Salé" },
        { qui: "Naïla", quoi: "du fil pour un collier de graines", ou: "dans la cour de l'école" },
      ]);
      const m = randomInt(2, 6);
      const cm = randomInt(20, 90);
      const total = m * 100 + cm;
      return {
        text: `${contexte.qui} prépare ${contexte.quoi} ${contexte.ou}. Elle a ${m} m d'un côté et ${cm} cm de l'autre. Combien de centimètres en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On n'additionne des longueurs que si elles sont écrites dans la même unité.",
          "On convertit les mètres en centimètres, puis on additionne.",
          `${m} m = ${m * 100} cm. Puis ${m * 100} + ${cm} = ${total}.`,
          `Cela fait ${total} cm en tout.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce qui reste, c'est le départ moins ce qu'on a enlevé.",
    tags: ["ce2", "longueur", "probleme", "template"],
    generate: () => {
      const m = randomInt(2, 5);
      const departCm = m * 100;
      const coupe1 = randomInt(20, 80);
      const coupe2 = randomInt(20, 80);
      const reste = departCm - coupe1 - coupe2;
      const objet = randomChoice(["une planche", "un ruban", "un tuyau d'arrosage", "une bande de papier"]);
      return {
        text: `On a ${objet} de ${m} m. On coupe d'abord ${coupe1} cm, puis ${coupe2} cm. Combien de centimètres reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher un reste, c'est enlever au total ce qui a été pris.",
          "On convertit la longueur de départ, on additionne les morceaux coupés, puis on soustrait.",
          `${m} m = ${departCm} cm. Les coupes font ${coupe1} + ${coupe2} = ${coupe1 + coupe2} cm. Il reste ${departCm} - ${coupe1 + coupe2} = ${reste} cm.`,
          `Il reste ${reste} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_LONGUEUR_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : les cas
     où plusieurs écritures disent la même longueur, et ceux
     où il faut décider si ça rentre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_longueur_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves mesurent le même segment. Léa écrit 12 cm, Kevin écrit 120 mm, Malia écrit 1 dm 2 cm. Qui a raison ?",
    format: "qcm",
    choices: [
      "les trois : c'est la même longueur",
      "Léa seulement",
      "Kevin seulement",
      "Léa et Malia seulement",
    ],
    expected: ["les trois : c'est la même longueur"],
    comparator: "mcq_exact",
    hint: "Écris les trois mesures en centimètres.",
    explanation: exp(
      "Une même longueur peut s'écrire de plusieurs façons, avec des unités différentes.",
      "On ramène tout à la même unité, ici le centimètre.",
      "120 mm = 12 cm, car 10 mm font 1 cm. Et 1 dm 2 cm = 10 cm + 2 cm = 12 cm. Les trois écritures donnent 12 cm.",
      "Les trois ont raison.",
    ),
    tags: ["ce2", "longueur", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_longueur_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Tu as un ruban de 1 m. Tu coupes trois morceaux de 25 cm. Peux-tu encore couper un quatrième morceau de 25 cm ?",
    format: "qcm",
    choices: [
      "oui, tout juste",
      "non, il manque 25 cm",
      "oui, et il en restera encore",
      "non, il n'en reste rien",
    ],
    expected: ["oui, tout juste"],
    comparator: "mcq_exact",
    hint: "Combien font trois morceaux de 25 cm ? Compare au mètre.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare ce qu'on a pris à ce qu'on avait au départ.",
      "On convertit le ruban en centimètres, puis on compte ce qui a déjà été coupé.",
      "1 m = 100 cm. Trois morceaux font 3 × 25 = 75 cm. Il reste 100 - 75 = 25 cm : exactement de quoi faire le quatrième.",
      "Oui, tout juste : quatre morceaux de 25 cm font pile 1 m.",
    ),
    tags: ["ce2", "longueur", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_longueur_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte combien de morceaux tiennent dans la longueur de départ.",
    tags: ["ce2", "longueur", "defi", "template"],
    generate: () => {
      // 40 cm ne tombe juste que sur un nombre pair de mètres : 300 ÷ 40 n'est
      // pas entier, et un défi qui se termine par 7,5 morceaux n'apprend rien.
      const morceau = randomChoice([20, 25, 40, 50]);
      const metres = morceau === 40 ? randomChoice([2, 4, 6]) : randomInt(2, 6);
      const nb = (metres * 100) / morceau;
      const objet = randomChoice(["ruban", "cordon", "fil de fer", "bande de papier"]);
      return {
        text: `Dans un ${objet} de ${metres} m, combien peut-on couper de morceaux de ${morceau} cm ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien de morceaux tiennent dans une longueur, c'est un groupement.",
          "On écrit d'abord la longueur de départ dans l'unité des morceaux, puis on partage.",
          `${metres} m = ${metres * 100} cm. Puis ${metres * 100} ÷ ${morceau} = ${nb}.`,
          `On peut couper ${nb} morceaux.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_longueur_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce2_longueur_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Il manque une étape : cherche d'abord la longueur du deuxième.",
    tags: ["ce2", "longueur", "defi", "reunion", "template"],
    generate: () => {
      const petit = randomInt(30, 90);
      const ecart = randomInt(20, 70);
      const grand = petit + ecart;
      const total = petit + grand;
      const contexte = randomChoice([
        { qui: "Kevin", quoi: "deux bambous pour un cerf-volant" },
        { qui: "Malia", quoi: "deux tiges de vacoa pour un panier" },
        { qui: "Naïla", quoi: "deux morceaux de canne pour une cabane" },
      ]);
      return {
        text: `${contexte.qui} coupe ${contexte.quoi}. Le premier mesure ${petit} cm. Le second mesure ${ecart} cm de plus. Quelle longueur, en cm, les deux mis bout à bout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "« De plus » veut dire qu'on ajoute à la première longueur pour obtenir la seconde.",
          "On cherche d'abord la longueur qui manque, puis on additionne les deux.",
          `Le second mesure ${petit} + ${ecart} = ${grand} cm. Bout à bout : ${petit} + ${grand} = ${total} cm.`,
          `Les deux mis bout à bout font ${total} cm.`,
        ),
      };
    },
  },
];
