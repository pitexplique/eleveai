// lib/tutor-v4/questionBank/ce1/maths/longueur.bank.ts
//
// Les longueurs du CE1, écrites à la main. Jusqu'ici les cinq
// micro-compétences passaient par le constructeur commun, qui aiguille sur la
// NOTION : « tracer un segment » et « comparer des longueurs » recevaient le
// même « Un ruban mesure 25 cm. On ajoute 22 cm… ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) — et il est plus étroit
// que celui du CE2, qu'il ne faut donc PAS recopier :
//   — trois unités seulement : le mètre, le centimètre et le kilomètre. Le
//     décimètre et le millimètre arrivent au CE2. Aucune question ne doit les
//     faire apparaître, même dans un piège ;
//   — pas de tableau de conversion : on passe par les relations, 1 m = 100 cm
//     et 1 km = 1 000 m ;
//   — pas d'écriture à virgule. On écrit « 2 m 50 cm », jamais « 2,50 m ». La
//     virgule est réservée à la monnaie ;
//   — les nombres restent dans le millier.
//
// LE PIÈGE DE LA NOTION, celui qu'ils font tous : comparer les NOMBRES au lieu
// des longueurs. « 90 cm est plus long que 1 m, parce que 90 est plus grand
// que 1. » Il revient dans comparer, dans convertir et dans les défis.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce1/maths/index.ts) : un CE1 clique, il ne tape pas.
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

/** Les trois unités du CE1, de la plus petite à la plus grande. */
const UNITES = [
  { abrev: "cm", nom: "centimètre", pluriel: "centimètres" },
  { abrev: "m", nom: "mètre", pluriel: "mètres" },
  { abrev: "km", nom: "kilomètre", pluriel: "kilomètres" },
] as const;

export const longueurBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_LONGUEUR_MESURER_CM_M — mesurer avec la règle
     Le piège d'ici : poser la règle n'importe où. Le zéro doit
     tomber sur le début du segment ; sinon il faut soustraire.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_mesurer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 1,
    theme: "neutral",
    text: "Pour mesurer un segment avec une règle graduée, où faut-il placer le début du segment ?",
    format: "qcm",
    choices: [
      "sur la graduation 0",
      "sur le bord de la règle",
      "sur la graduation 1",
      "n'importe où",
    ],
    expected: ["sur la graduation 0"],
    comparator: "mcq_exact",
    hint: "Le bord de la règle et le zéro ne sont pas toujours au même endroit.",
    explanation: exp(
      "Mesurer, c'est compter les graduations en partant de zéro.",
      "On pose le début du segment sur le 0, puis on lit le nombre à l'autre bout.",
      "Sur beaucoup de règles, le 0 est un peu après le bord en plastique. Si on part du bord, on compte des centimètres qui n'existent pas.",
      "On place le début du segment sur la graduation 0.",
    ),
    tags: ["ce1", "longueur", "mesurer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_mesurer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 3,
    theme: "neutral",
    text: "Léa a mal posé sa règle : le segment commence à la graduation 2 et finit à la graduation 9. Combien mesure-t-il, en cm ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ne lis pas 9 : compte les centimètres entre 2 et 9.",
    explanation: exp(
      "La mesure d'un segment, c'est l'écart entre les deux graduations, pas le nombre lu à l'arrivée.",
      "Quand la règle est décalée, on enlève la graduation de départ.",
      "9 - 2 = 7. Le segment mesure 7 cm. Les deux premiers centimètres de la règle sont en dehors du segment.",
      "Le segment mesure 7 cm.",
    ),
    tags: ["ce1", "longueur", "mesurer", "piege"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_mesurer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 2,
    theme: "neutral",
    text: "On mesure la longueur d'une trousse. Quelle unité choisit-on ?",
    format: "qcm",
    choices: ["le centimètre", "le mètre", "le kilomètre", "le centimètre carré"],
    expected: ["le centimètre"],
    comparator: "mcq_exact",
    hint: "Une trousse tient dans la main : elle fait à peu près la largeur d'un cahier.",
    explanation: exp(
      "On choisit l'unité qui donne un nombre simple à dire.",
      "On imagine l'objet, puis on essaie les unités qu'on connaît : le centimètre, le mètre, le kilomètre.",
      "Une trousse mesure environ 20 cm. En mètres, il faudrait écrire une longueur plus petite que 1, et on ne sait pas encore le faire au CE1.",
      "On mesure une trousse en centimètres.",
    ),
    tags: ["ce1", "longueur", "mesurer", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_longueur_mesurer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève la graduation de départ à celle d'arrivée.",
    tags: ["ce1", "longueur", "mesurer", "template", "canvas"],
    generate: () => {
      const debut = randomInt(1, 5);
      const longueur = randomInt(3, 8);
      const fin = debut + longueur;
      return {
        text: `Sur cette règle, le segment commence à la graduation ${debut} et se termine à la graduation ${fin}. Combien mesure-t-il, en cm ?`,
        format: "short",
        expected: [String(longueur)],
        comparator: "number_equal",
        explanation: exp(
          "La mesure d'un segment, c'est l'écart entre les deux graduations.",
          "Quand la règle ne commence pas à 0, on enlève la graduation de départ.",
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
    id: "ce1_longueur_mesurer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_mesurer_cm_m",
    difficulty: 2,
    theme: "neutral",
    hint: "Imagine l'objet dans tes mains avant de choisir.",
    tags: ["ce1", "longueur", "mesurer", "template"],
    generate: () => {
      const objets = [
        { nom: "un crayon", unite: "le centimètre", ordre: "environ 17 cm" },
        { nom: "un cahier", unite: "le centimètre", ordre: "environ 30 cm" },
        { nom: "une gomme", unite: "le centimètre", ordre: "environ 4 cm" },
        { nom: "la porte de la classe", unite: "le mètre", ordre: "environ 2 m" },
        { nom: "le tableau de la classe", unite: "le mètre", ordre: "environ 3 m" },
        { nom: "un bus", unite: "le mètre", ordre: "environ 12 m" },
        { nom: "la route entre deux villes", unite: "le kilomètre", ordre: "des dizaines de kilomètres" },
        { nom: "un trajet à vélo d'une heure", unite: "le kilomètre", ordre: "environ 12 km" },
      ] as const;
      const o = randomChoice(objets);
      return {
        text: `Avec quelle unité mesure-t-on ${o.nom} ?`,
        format: "qcm",
        choices: makeChoices(o.unite, [
          "le centimètre",
          "le mètre",
          "le kilomètre",
          "le kilogramme",
        ]),
        expected: [o.unite],
        comparator: "mcq_exact",
        explanation: exp(
          "On choisit l'unité qui donne un nombre facile à dire.",
          "On imagine l'objet, puis on essaie les unités une par une.",
          `Pour ${o.nom}, la bonne taille est ${o.ordre}. Une autre unité donnerait un nombre trop grand ou trop petit.`,
          `On utilise ${o.unite}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LONGUEUR_COMPARER — comparer des longueurs
     LE piège de la notion : comparer les nombres au lieu des
     longueurs. 90 cm contre 1 m, et l'élève choisit 90.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_comparer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
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
      "On transforme le mètre en centimètres, puis on compare les nombres.",
      "1 m = 100 cm. Et 100 cm, c'est plus long que 90 cm. Le nombre 90 est plus grand que 1, mais il compte des centimètres, pas des mètres.",
      "1 m est plus long que 90 cm.",
    ),
    tags: ["ce1", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « 300 cm, c'est plus long que 4 m, parce que 300 est plus grand que 4. » A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 4 m font 400 cm",
      "oui",
      "non, 4 m font 40 cm",
      "on ne peut pas comparer des mètres et des centimètres",
    ],
    expected: ["non, 4 m font 400 cm"],
    comparator: "mcq_exact",
    hint: "Mets tout en centimètres, puis compare.",
    explanation: exp(
      "Un nombre tout seul ne dit rien : il faut regarder l'unité écrite à côté.",
      "On écrit les deux longueurs en centimètres, puis on compare.",
      "4 m = 400 cm. Et 300 cm, c'est moins que 400 cm. Il manque même 100 cm, c'est-à-dire 1 m entier.",
      "Non : 300 cm est plus court que 4 m.",
    ),
    tags: ["ce1", "longueur", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_comparer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 2,
    theme: "reunion",
    text: "Dans la cour, le filao mesure 8 m et le manguier 6 m. Lequel est le plus haut ?",
    format: "qcm",
    choices: ["le filao", "le manguier", "ils sont pareils", "on ne peut pas savoir"],
    expected: ["le filao"],
    comparator: "mcq_exact",
    hint: "Les deux hauteurs sont en mètres : compare directement les nombres.",
    explanation: exp(
      "Quand deux longueurs sont écrites dans la même unité, on compare directement les nombres.",
      "On regarde l'unité : ici, les deux sont en mètres. On peut donc comparer 8 et 6.",
      "8 est plus grand que 6, et les deux arbres sont mesurés en mètres. Le filao dépasse le manguier de 2 m.",
      "Le filao est le plus haut.",
    ),
    tags: ["ce1", "longueur", "comparer", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_longueur_comparer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Même unité d'abord, comparaison ensuite.",
    tags: ["ce1", "longueur", "comparer", "piege", "template"],
    generate: () => {
      // Le nombre écrit en centimètres est TOUJOURS plus grand que celui écrit
      // en mètres : c'est ce décalage qui fait tomber les élèves.
      const m = randomInt(1, 5);
      const enCm = m * 100;
      const cm = randomChoice([enCm - randomInt(5, 40), enCm + randomInt(5, 40)]);
      const gagnant = cm > enCm ? `${cm} cm` : `${m} m`;
      const perdant = cm > enCm ? `${m} m` : `${cm} cm`;
      return {
        text: `Qu'est-ce qui est le plus long : ${m} m ou ${cm} cm ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          perdant,
          "c'est pareil",
          "on ne peut pas savoir",
          "les deux sont trop petits",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux longueurs qu'après les avoir écrites dans la même unité.",
          "On transforme les mètres en centimètres, car 1 m = 100 cm.",
          `${m} m = ${enCm} cm. On compare alors ${enCm} cm et ${cm} cm : ${cm > enCm ? `${cm} est plus grand que ${enCm}` : `${enCm} est plus grand que ${cm}`}.`,
          `Le plus long est ${gagnant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_longueur_comparer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris les trois longueurs en centimètres avant de choisir.",
    tags: ["ce1", "longueur", "comparer", "template"],
    generate: () => {
      // Trois longueurs, dont une écrite en mètres : c'est elle la plus longue,
      // et c'est elle qui porte le plus petit nombre.
      const petit = randomInt(15, 60);
      const moyen = randomInt(110, 190);
      const grosM = randomInt(2, 5);
      const items = shuffle([
        { texte: `${petit} cm`, cm: petit },
        { texte: `${moyen} cm`, cm: moyen },
        { texte: `${grosM} m`, cm: grosM * 100 },
      ]);
      const maxCm = Math.max(...items.map((i) => i.cm));
      const gagnant = items.find((i) => i.cm === maxCm)!;
      return {
        text: `Laquelle de ces trois longueurs est la plus LONGUE : ${items.map((i) => i.texte).join(", ")} ?`,
        format: "qcm",
        choices: makeChoices(gagnant.texte, [
          ...items.filter((i) => i.cm !== maxCm).map((i) => i.texte),
          "elles sont égales",
        ]),
        expected: [gagnant.texte],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer plusieurs longueurs, on les écrit toutes dans la même unité.",
          "On choisit le centimètre, la plus petite unité de la liste, et on transforme : 1 m = 100 cm.",
          `En centimètres : ${items.map((i) => `${i.texte} = ${i.cm} cm`).join(" ; ")}. Le plus grand nombre est ${maxCm}.`,
          `La plus longue est ${gagnant.texte}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LONGUEUR_CONVERTIR_SIMPLE — passer de m à cm
     Le programme dit : par les relations connues, pas par un
     tableau de conversion. Deux relations seulement au CE1 :
     1 m = 100 cm et 1 km = 1 000 m.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_convertir_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimètres dans 1 mètre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Regarde le mètre de la classe : compte ses graduations.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On se rappelle du mètre en bois de la classe : il porte 100 petits traits.",
      "Le « centi » de centimètre veut dire cent. Il faut 100 centimètres bout à bout pour faire 1 mètre.",
      "1 m = 100 cm.",
    ),
    tags: ["ce1", "longueur", "convertir", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_convertir_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 m = 10 cm ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 m = 100 cm",
      "oui",
      "non, 1 m = 1 000 cm",
      "non, 1 m = 20 cm",
    ],
    expected: ["non, 1 m = 100 cm"],
    comparator: "mcq_exact",
    hint: "10 cm, c'est à peu près la largeur de ta main. Un mètre est bien plus long.",
    explanation: exp(
      "1 mètre vaut 100 centimètres.",
      "On vérifie avec un objet connu : 10 cm, c'est la largeur d'une main.",
      "Dix mains ne font pas un mètre. Il faut dix fois plus : 100 centimètres.",
      "Non : 1 m = 100 cm.",
    ),
    tags: ["ce1", "longueur", "convertir", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_convertir_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de mètres dans 1 kilomètre ?",
    format: "short",
    expected: ["1000"],
    comparator: "number_equal",
    hint: "« Kilo » veut dire mille.",
    explanation: exp(
      "1 kilomètre vaut 1 000 mètres.",
      "On lit le début du mot : « kilo » annonce mille.",
      "Un kilomètre, c'est mille mètres bout à bout. C'est le même « kilo » que dans kilogramme, qui vaut mille grammes.",
      "1 km = 1 000 m.",
    ),
    tags: ["ce1", "longueur", "convertir", "remarquable"],
  },
  {
    kind: "template",
    id: "ce1_longueur_convertir_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 2,
    theme: "neutral",
    hint: "Un mètre vaut déjà 100 centimètres : il en faut plus, donc on multiplie.",
    tags: ["ce1", "longueur", "convertir", "template"],
    generate: () => {
      const m = randomInt(2, 9);
      const cm = m * 100;
      return {
        text: `Combien de centimètres font ${m} m ?`,
        format: "short",
        expected: [String(cm)],
        comparator: "number_equal",
        explanation: exp(
          "1 mètre vaut 100 centimètres.",
          "Pour passer des mètres aux centimètres, on multiplie par 100 : il faut plus de petites unités pour la même longueur.",
          `${m} × 100 = ${cm}. Donc ${m} m = ${cm} cm.`,
          `${m} m font ${cm} cm.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_longueur_convertir_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 3,
    theme: "neutral",
    hint: "Plusieurs centimètres font un seul mètre : on partage.",
    tags: ["ce1", "longueur", "convertir", "template"],
    generate: () => {
      const m = randomInt(2, 9);
      const cm = m * 100;
      return {
        text: `Combien de mètres font ${cm} cm ?`,
        format: "short",
        expected: [String(m)],
        comparator: "number_equal",
        explanation: exp(
          "1 mètre vaut 100 centimètres.",
          "Pour passer des centimètres aux mètres, on cherche combien de fois 100 tient dans le nombre.",
          `100 tient ${m} fois dans ${cm}. Donc ${cm} cm = ${m} m.`,
          `${cm} cm font ${m} m.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_longueur_convertir_tpl_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_convertir_simple",
    difficulty: 4,
    theme: "neutral",
    hint: "Transforme d'abord les mètres, puis ajoute les centimètres qui restent.",
    tags: ["ce1", "longueur", "convertir", "template"],
    generate: () => {
      const m = randomInt(1, 6);
      const cm = randomInt(5, 90);
      const total = m * 100 + cm;
      const objet = randomChoice(["une planche", "un banc", "une corde", "une bande de papier"]);
      return {
        text: `${objet.charAt(0).toUpperCase()}${objet.slice(1)} mesure ${m} m ${cm} cm. Combien mesure-t-elle en centimètres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une longueur écrite avec deux unités se transforme en une seule en additionnant.",
          "On transforme d'abord les mètres en centimètres, puis on ajoute les centimètres déjà écrits.",
          `${m} m = ${m * 100} cm. On ajoute les ${cm} cm : ${m * 100} + ${cm} = ${total}.`,
          `Cela fait ${total} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LONGUEUR_TRACER — tracer un segment de longueur donnée
     Tracer, c'est mesurer à l'envers : on place les deux points
     d'abord, on relie ensuite.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_tracer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
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
      "Le premier point est sur le 0, le second sur le 8 : entre les deux, il y a bien 8 centimètres. On relie ensuite en suivant le bord de la règle.",
      "On marque un point sur la graduation 8, puis on relie.",
    ),
    tags: ["ce1", "longueur", "tracer", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_tracer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 1,
    theme: "neutral",
    text: "Avec quel instrument trace-t-on un segment bien droit ?",
    format: "qcm",
    choices: ["la règle", "le compas", "la gomme", "la main"],
    expected: ["la règle"],
    comparator: "mcq_exact",
    hint: "C'est celui qui a des graduations et un bord bien droit.",
    explanation: exp(
      "Un segment est un trait droit qui va d'un point à un autre.",
      "On choisit l'instrument qui a un bord droit ET des graduations pour la longueur.",
      "La règle sert deux fois : son bord guide le crayon, ses graduations donnent la longueur. Le compas, lui, sert à tracer des cercles.",
      "On trace un segment avec la règle.",
    ),
    tags: ["ce1", "longueur", "tracer", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_tracer_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 3,
    theme: "neutral",
    text: "Kevin veut tracer un segment de 6 cm. Il pose le bord de sa règle sur son point de départ, pas la graduation 0. Que va-t-il se passer ?",
    format: "qcm",
    choices: [
      "son segment ne fera pas exactement 6 cm",
      "son segment sera parfait",
      "son segment sera deux fois trop long",
      "il ne pourra pas tracer du tout",
    ],
    expected: ["son segment ne fera pas exactement 6 cm"],
    comparator: "mcq_exact",
    hint: "Sur beaucoup de règles, le 0 n'est pas tout au bord.",
    explanation: exp(
      "La longueur se compte à partir de la graduation 0, pas à partir du bord de la règle.",
      "On vérifie toujours où se trouve le 0 avant de commencer.",
      "Sur beaucoup de règles, il y a un petit morceau de plastique avant le 0. En partant du bord, Kevin ajoute ce morceau à son segment : il sera un peu trop long.",
      "Son segment ne fera pas exactement 6 cm.",
    ),
    tags: ["ce1", "longueur", "tracer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_longueur_tracer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 4,
    theme: "neutral",
    hint: "Ajoute la longueur voulue à la graduation de départ.",
    tags: ["ce1", "longueur", "tracer", "template"],
    generate: () => {
      const depart = randomInt(2, 5);
      const longueur = randomInt(3, 9);
      const arrivee = depart + longueur;
      return {
        text: `Ta règle est cassée : elle commence à la graduation ${depart}. Tu poses ton point de départ sur cette graduation. Sur quelle graduation dois-tu t'arrêter pour tracer ${longueur} cm ?`,
        format: "short",
        expected: [String(arrivee)],
        comparator: "number_equal",
        explanation: exp(
          "Ce qui compte, c'est l'écart entre les deux graduations, pas le nombre de départ.",
          "On ajoute la longueur voulue à la graduation de départ.",
          `${depart} + ${longueur} = ${arrivee}. De la graduation ${depart} à la graduation ${arrivee}, il y a bien ${longueur} cm.`,
          `Il faut s'arrêter sur la graduation ${arrivee}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_longueur_tracer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_tracer",
    difficulty: 3,
    theme: "neutral",
    hint: "« Deux fois plus long » veut dire qu'on prend la longueur deux fois.",
    tags: ["ce1", "longueur", "tracer", "template"],
    generate: () => {
      const base = randomInt(3, 8);
      const doubleLong = base * 2;
      return {
        text: `Tu as tracé un segment de ${base} cm. Tu veux en tracer un deuxième, deux fois plus long. Combien de centimètres doit-il mesurer ?`,
        format: "short",
        expected: [String(doubleLong)],
        comparator: "number_equal",
        explanation: exp(
          "« Deux fois plus long », c'est prendre la même longueur deux fois de suite.",
          "On ajoute la longueur à elle-même, ou on la multiplie par 2.",
          `${base} + ${base} = ${doubleLong}, ou ${base} × 2 = ${doubleLong}.`,
          `Le deuxième segment mesure ${doubleLong} cm.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_LONGUEUR_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : décider si
     ça rentre, et voir qu'une même longueur s'écrit de deux
     façons.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_longueur_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Tu as un ruban de 1 m. Tu coupes trois morceaux de 25 cm. Peux-tu encore couper un quatrième morceau de 25 cm ?",
    format: "qcm",
    choices: [
      "oui, tout juste",
      "non, il manque 25 cm",
      "oui, et il en restera encore",
      "non, il ne reste rien",
    ],
    expected: ["oui, tout juste"],
    comparator: "mcq_exact",
    hint: "Combien font trois morceaux de 25 cm ? Compare au mètre.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare ce qu'on a déjà pris à ce qu'on avait au départ.",
      "On écrit le ruban en centimètres, puis on compte ce qui a été coupé.",
      "1 m = 100 cm. Trois morceaux font 25 + 25 + 25 = 75 cm. Il reste 100 - 75 = 25 cm : exactement de quoi faire le quatrième.",
      "Oui, tout juste : quatre morceaux de 25 cm font pile 1 m.",
    ),
    tags: ["ce1", "longueur", "defi", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_longueur_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux élèves mesurent le même banc. Léa écrit 2 m, Kevin écrit 200 cm. Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même longueur",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même longueur"],
    comparator: "mcq_exact",
    hint: "Transforme les 2 m en centimètres.",
    explanation: exp(
      "Une même longueur peut s'écrire de deux façons, avec deux unités différentes.",
      "On ramène les deux écritures à la même unité, ici le centimètre.",
      "2 m = 200 cm, puisque 1 m = 100 cm. Léa et Kevin ont écrit la même longueur, avec des mots différents.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "longueur", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_longueur_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte combien de morceaux tiennent dans la longueur de départ.",
    tags: ["ce1", "longueur", "defi", "template"],
    generate: () => {
      // On ne garde que des partages qui tombent juste : un défi qui se termine
      // par « 7 morceaux et demi » n'apprend rien à un CE1.
      const morceau = randomChoice([20, 25, 50]);
      const metres = randomInt(1, 4);
      const nb = (metres * 100) / morceau;
      const objet = randomChoice(["ruban", "cordon", "fil de fer", "bande de papier"]);
      return {
        text: `Dans un ${objet} de ${metres} m, combien peut-on couper de morceaux de ${morceau} cm ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien de morceaux tiennent dans une longueur, c'est faire des groupements.",
          "On écrit d'abord la longueur de départ dans l'unité des morceaux, puis on cherche combien de fois le morceau y tient.",
          `${metres} m = ${metres * 100} cm. Et ${morceau} tient ${nb} fois dans ${metres * 100}.`,
          `On peut couper ${nb} morceaux.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_longueur_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "longueur",
    microId: "ce1_longueur_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Il manque une étape : cherche d'abord la longueur du deuxième.",
    tags: ["ce1", "longueur", "defi", "reunion", "template"],
    generate: () => {
      const petit = randomInt(20, 60);
      const ecart = randomInt(10, 40);
      const grand = petit + ecart;
      const total = petit + grand;
      const contexte = randomChoice([
        { qui: "Kevin", quoi: "deux bambous pour un cerf-volant" },
        { qui: "Malia", quoi: "deux tiges de vacoa pour un panier" },
        { qui: "Naïla", quoi: "deux morceaux de canne pour une cabane" },
      ]);
      return {
        text: `${contexte.qui} coupe ${contexte.quoi}. Le premier mesure ${petit} cm. Le second mesure ${ecart} cm de plus. Mis bout à bout, combien mesurent-ils, en cm ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "« De plus » veut dire qu'on ajoute à la première longueur pour trouver la seconde.",
          "On cherche d'abord la longueur qui manque, puis on additionne les deux.",
          `Le second mesure ${petit} + ${ecart} = ${grand} cm. Bout à bout : ${petit} + ${grand} = ${total} cm.`,
          `Les deux mis bout à bout font ${total} cm.`,
        ),
      };
    },
  },
];
