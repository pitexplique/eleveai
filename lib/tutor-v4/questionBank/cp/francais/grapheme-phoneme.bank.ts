// lib/tutor-v4/questionBank/cp/francais/grapheme-phoneme.bank.ts
//
// Les correspondances graphème-phonème du CP, écrites à la main. C'est le cœur
// de la classe : le BO en fait « la priorité fondamentale sur laquelle reposent
// tous les apprentissages ultérieurs ».
//
// CE QU'ELLE REMPLACE : les cinq micro-compétences recevaient deux questions,
// dont « Quel est le son de la lettre ou du groupe de lettres "ch" ? » avec,
// pour propositions, quatre descriptions de sons rédigées — « ch comme dans
// chat », « ou comme dans loup ». On demandait à un enfant de six ans de lire
// quatre phrases pour répondre à une question de lecture.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — 12 à 15 CGP régulières, fréquentes et aisément prononçables en fin de
//     période 1 ; 25 à 30 en milieu d'année ; toutes les CGP régulières en fin
//     d'année, à raison d'environ deux par semaine ;
//   — « Il fait écrire systématiquement aux élèves les CGP enseignées » :
//     décoder et encoder marchent ensemble ;
//   — « Avoir pris conscience de la présence de lettres finales muettes. »
//
// LE PIÈGE DE LA NOTION, et il a deux faces :
//   — un SON s'écrit de plusieurs façons : [o] dans moto, jaune, bateau ;
//   — une LETTRE se lit de plusieurs façons : le c de cari et celui de cerise,
//     le g de lagon et celui de girafe.
// Un enfant qui croit « une lettre, un son » se cogne aux deux.
//
// ⚠️ Chaque son est toujours donné avec un mot qui l'ancre — « le son [o],
// celui de moto ». Un CP ne lit pas l'alphabet phonétique.
//
// ⚠️ « b » et « d » sont les jumeaux qui se retournent : c'est la confusion la
// plus répandue du CP, et elle a son item.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

const VOYELLES = ["a", "e", "i", "o", "u", "y"] as const;

const CONSONNES = [
  { lettre: "b", ancre: "bateau" },
  { lettre: "d", ancre: "domino" },
  { lettre: "f", ancre: "fleur" },
  { lettre: "j", ancre: "jardin" },
  { lettre: "l", ancre: "lagon" },
  { lettre: "m", ancre: "maman" },
  { lettre: "n", ancre: "nid" },
  { lettre: "p", ancre: "piton" },
  { lettre: "r", ancre: "riz" },
  { lettre: "t", ancre: "tapis" },
  { lettre: "v", ancre: "vélo" },
  { lettre: "s", ancre: "sac" },
] as const;

// Syllabes lisibles au CP, sans son composé : la voyelle s'y voit d'un coup.
const SYLLABES = [
  "ma", "li", "ro", "tu", "bé", "pa", "ni", "do", "vu", "fa",
  "mi", "lo", "ta", "ru", "pé", "na", "di", "vo", "fu", "ba",
] as const;

const SONS_COMPOSES = [
  { graphie: "ou", ancre: "loup", mots: ["chou", "boucan", "mouton", "souris"] },
  { graphie: "on", ancre: "lagon", mots: ["piton", "papillon", "mouton", "bonbon"] },
  { graphie: "an", ancre: "banc", mots: ["enfant", "manger", "chanter", "grand"] },
  { graphie: "in", ancre: "lapin", mots: ["requin", "jardin", "tamarin", "matin"] },
  { graphie: "ch", ancre: "chat", mots: ["chocolat", "chapeau", "cheval", "chien"] },
  { graphie: "oi", ancre: "roi", mots: ["boire", "poire", "toile", "noir"] },
  { graphie: "au", ancre: "jaune", mots: ["chaud", "sauter", "épaule", "gauche"] },
  { graphie: "eau", ancre: "bateau", mots: ["chapeau", "gâteau", "cadeau", "oiseau"] },
  { graphie: "ai", ancre: "maison", mots: ["lait", "balai", "semaine", "fraise"] },
  { graphie: "gn", ancre: "montagne", mots: ["agneau", "peigne", "ligne", "araignée"] },
] as const;

// LE piège, première face : un son, plusieurs façons de l'écrire.
const GRAPHIES_DU_SON = [
  {
    son: "[o]", ancre: "moto",
    cas: [
      { mot: "moto", graphie: "o" },
      { mot: "jaune", graphie: "au" },
      { mot: "bateau", graphie: "eau" },
      { mot: "chapeau", graphie: "eau" },
      { mot: "chaud", graphie: "au" },
      { mot: "vélo", graphie: "o" },
    ],
  },
  {
    son: "[ɛ̃]", ancre: "lapin",
    cas: [
      { mot: "lapin", graphie: "in" },
      { mot: "pain", graphie: "ain" },
      { mot: "requin", graphie: "in" },
      { mot: "main", graphie: "ain" },
    ],
  },
  {
    son: "[s]", ancre: "sac",
    cas: [
      { mot: "sac", graphie: "s" },
      { mot: "poisson", graphie: "ss" },
      { mot: "cerise", graphie: "c" },
      { mot: "garçon", graphie: "ç" },
      { mot: "citron", graphie: "c" },
    ],
  },
  {
    son: "[k]", ancre: "cari",
    cas: [
      { mot: "cari", graphie: "c" },
      { mot: "requin", graphie: "qu" },
      { mot: "colle", graphie: "c" },
      { mot: "kilo", graphie: "k" },
    ],
  },
  {
    son: "[f]", ancre: "fleur",
    cas: [
      { mot: "fleur", graphie: "f" },
      { mot: "photo", graphie: "ph" },
      { mot: "farine", graphie: "f" },
      { mot: "téléphone", graphie: "ph" },
    ],
  },
  {
    son: "[z]", ancre: "zébu",
    cas: [
      { mot: "zébu", graphie: "z" },
      { mot: "poison", graphie: "s" },
      { mot: "zoo", graphie: "z" },
      { mot: "maison", graphie: "s" },
    ],
  },
] as const;

export const graphemePhonemeBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_GPH_VOYELLES
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_gph_voyelles_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_voyelles",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de voyelles dans l'alphabet français ?",
    format: "qcm",
    choices: ["6", "5", "10", "26"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "a, e, i, o, u… et une dernière qu'on oublie souvent.",
    explanation: exp(
      "Les voyelles sont les lettres qui se disent toutes seules, sans qu'on serre les lèvres ni la langue.",
      "Récite-les dans l'ordre : a, e, i, o, u, y.",
      "Le « y » est une voyelle, même s'il ressemble à un piquet. On l'entend dans « stylo ».",
      "Il y a 6 voyelles : a, e, i, o, u, y.",
    ),
    tags: ["cp", "graphemes", "voyelle", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "cp_gph_voyelles_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_voyelles",
    difficulty: 1,
    theme: "neutral",
    hint: "Dans une syllabe, la voyelle est celle qui chante.",
    tags: ["cp", "graphemes", "voyelle", "template"],
    generate: () => {
      const syl = randomChoice(SYLLABES);
      const voyelle = syl[1];
      const consonne = syl[0];
      const autresV = shuffle(VOYELLES.filter((v) => v !== voyelle && v !== "y")).slice(0, 2);
      return {
        text: `Dans la syllabe « ${syl} », quelle lettre est la voyelle ?`,
        format: "qcm" as const,
        choices: makeChoices(voyelle, [consonne, ...autresV]),
        expected: [voyelle],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans une syllabe, la voyelle est la lettre qui chante ; la consonne, celle qui bute.",
          "Dis la syllabe en l'étirant : le son qui dure, c'est la voyelle.",
          `${consonne}… ${voyelle}… « ${syl} ». C'est le « ${voyelle} » qu'on peut tenir longtemps.`,
          `La voyelle de « ${syl} » est « ${voyelle} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gph_voyelles_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_voyelles",
    difficulty: 2,
    theme: "neutral",
    hint: "Trois consonnes et une voyelle : trouve l'intruse.",
    tags: ["cp", "graphemes", "voyelle", "template"],
    generate: () => {
      const voyelle = randomChoice(VOYELLES);
      const consonnes = shuffle(CONSONNES).slice(0, 3).map((c) => c.lettre);
      return {
        text: "Parmi ces lettres, laquelle est une voyelle ?",
        format: "qcm" as const,
        choices: makeChoices(voyelle, consonnes),
        expected: [voyelle],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les voyelles sont a, e, i, o, u et y. Toutes les autres lettres sont des consonnes.",
          "Récite les six voyelles dans ta tête et cherche celle qui y est.",
          `« ${voyelle} » fait partie des six. ${consonnes.map((c) => `« ${c} »`).join(", ")} sont des consonnes.`,
          `La voyelle est « ${voyelle} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GPH_CONSONNES_SIMPLES
     Le b et le d : les jumeaux qui se retournent.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_gph_consonnes_simples_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_consonnes_simples",
    difficulty: 3,
    theme: "neutral",
    text: "Léa veut écrire « bateau ». Elle écrit « dateau ». Quelle lettre a-t-elle mise à la place du « b » ?",
    format: "qcm",
    choices: ["le d", "le p", "le q", "le t"],
    expected: ["le d"],
    comparator: "mcq_exact",
    hint: "Deux lettres se ressemblent comme deux gouttes d'eau, avec le ventre du mauvais côté.",
    explanation: exp(
      "Le « b » et le « d » ont la même forme : un bâton et un ventre. Seul le côté du ventre change.",
      "Regarde de quel côté est le ventre : à droite du bâton pour le b, à gauche pour le d.",
      "Léa a retourné la lettre. Elle voulait « bateau » et elle a écrit « dateau », qui ne veut rien dire.",
      "Elle a mis un « d » à la place du « b ».",
    ),
    tags: ["cp", "graphemes", "consonne", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_gph_consonnes_simples_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_consonnes_simples",
    difficulty: 1,
    theme: "neutral",
    hint: "Dis le mot et écoute sa toute première lettre.",
    tags: ["cp", "graphemes", "consonne", "template"],
    generate: () => {
      const c = randomChoice(CONSONNES);
      const autres = shuffle(CONSONNES.filter((x) => x.lettre !== c.lettre))
        .slice(0, 3)
        .map((x) => x.lettre);
      return {
        text: `Par quelle lettre commence le mot « ${c.ancre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.lettre, autres),
        expected: [c.lettre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La première lettre d'un mot donne son premier son.",
          "Dis le mot doucement et arrête-toi juste après le premier son.",
          `${c.ancre.charAt(0)}… ${c.ancre}. C'est la lettre « ${c.lettre} ».`,
          `« ${c.ancre} » commence par « ${c.lettre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gph_consonnes_simples_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_consonnes_simples",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche le mot qui démarre avec cette lettre-là.",
    tags: ["cp", "graphemes", "consonne", "template"],
    generate: () => {
      const c = randomChoice(CONSONNES);
      const autres = shuffle(CONSONNES.filter((x) => x.lettre !== c.lettre))
        .slice(0, 3)
        .map((x) => x.ancre);
      return {
        text: `Quel mot commence par la lettre « ${c.lettre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(c.ancre, autres),
        expected: [c.ancre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour trouver un mot qui commence par une lettre, on regarde son tout début.",
          "Lis la première lettre de chaque proposition, sans lire le mot entier.",
          `« ${c.ancre} » commence bien par « ${c.lettre} ».`,
          `Le mot est « ${c.ancre} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GPH_SONS_COMPOSES — plusieurs lettres, un seul son
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_gph_sons_composes_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_sons_composes",
    difficulty: 2,
    theme: "neutral",
    text: "Dans le mot « loup », combien de lettres font le son [u] ?",
    format: "qcm",
    choices: ["2 lettres : o et u", "1 lettre : u", "1 lettre : o", "3 lettres : lou"],
    expected: ["2 lettres : o et u"],
    comparator: "mcq_exact",
    hint: "Le « o » et le « u » se tiennent par la main pour faire un seul son.",
    explanation: exp(
      "Certaines lettres se mettent à deux ou à trois pour fabriquer un seul son.",
      "Quand tu vois « ou », ne lis pas o puis u : lis le son [u] d'un coup.",
      "l… ou… p. Le « ou » de « loup » est un seul son écrit avec deux lettres.",
      "Ce sont 2 lettres, o et u, pour un seul son.",
    ),
    tags: ["cp", "graphemes", "sons-composes", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_gph_sons_composes_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_sons_composes",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ces lettres-là à l'intérieur des mots.",
    tags: ["cp", "graphemes", "sons-composes", "template"],
    generate: () => {
      const s = randomChoice(SONS_COMPOSES);
      const bon = randomChoice(s.mots);
      // ⚠️ Un même mot vit dans deux listes : « chapeau » a un « ch » ET un
      // « eau », « mouton » un « ou » ET un « on ». Sans dédoublonnage, deux
      // pièges tombaient sur le même mot et le QCM perdait une ligne.
      const autres = shuffle([
        ...new Set(
          SONS_COMPOSES.filter((x) => x.graphie !== s.graphie)
            .flatMap((x) => x.mots)
            .filter((m) => !m.includes(s.graphie) && m !== bon),
        ),
      ]).slice(0, 3);
      return {
        text: `Quel mot contient le son « ${s.graphie} », celui de « ${s.ancre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un son composé s'écrit avec plusieurs lettres collées, mais il ne s'entend qu'une fois.",
          "Cherche ces lettres-là à l'intérieur de chaque mot, puis vérifie à l'oreille.",
          `« ${bon} » contient bien « ${s.graphie} », comme « ${s.ancre} ».`,
          `Le mot est « ${bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gph_sons_composes_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_sons_composes",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul groupe de lettres fait ce son-là.",
    tags: ["cp", "graphemes", "sons-composes", "template"],
    generate: () => {
      const s = randomChoice(SONS_COMPOSES);
      const autres = shuffle(SONS_COMPOSES.filter((x) => x.graphie !== s.graphie))
        .slice(0, 3)
        .map((x) => x.graphie);
      return {
        text: `Quelles lettres, ensemble, font le son qu'on entend dans « ${s.ancre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(s.graphie, autres),
        expected: [s.graphie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque son composé a son groupe de lettres à lui.",
          "Dis le mot repère et repère les lettres qui font le son.",
          `Dans « ${s.ancre} », c'est « ${s.graphie} » qui fait le son.`,
          `Les lettres sont « ${s.graphie} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GPH_ECRIRE_SON — LE piège : un son, plusieurs écritures
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_gph_ecrire_son_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_ecrire_son",
    difficulty: 3,
    theme: "neutral",
    text: "Le son [o] s'entend dans « moto », dans « jaune » et dans « bateau ». S'écrit-il pareil dans les trois ?",
    format: "qcm",
    choices: [
      "Non : o, au et eau",
      "Oui : toujours o",
      "Oui : toujours au",
      "Non : o, oa et ao",
    ],
    expected: ["Non : o, au et eau"],
    comparator: "mcq_exact",
    hint: "Regarde les lettres à l'endroit où tu entends [o] dans chaque mot.",
    explanation: exp(
      "Un même son peut s'écrire de plusieurs façons. C'est ce qui rend le français difficile — et il faut le savoir tôt.",
      "Prononce le mot, repère l'endroit où le son sort, puis regarde les lettres qui sont là.",
      "m-O-to, j-AU-ne, bat-EAU. Trois écritures pour un seul son.",
      "Non : le son [o] s'écrit o, au ou eau.",
    ),
    tags: ["cp", "graphemes", "encodage", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_gph_ecrire_son_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_ecrire_son",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde les lettres à l'endroit précis où tu entends le son.",
    tags: ["cp", "graphemes", "encodage", "template"],
    generate: () => {
      const s = randomChoice(GRAPHIES_DU_SON);
      const cas = randomChoice(s.cas);
      const autres = Array.from(
        new Set(s.cas.filter((c) => c.graphie !== cas.graphie).map((c) => c.graphie)),
      );
      return {
        text: `Dans le mot « ${cas.mot} », comment s'écrit le son ${s.son}, celui de « ${s.ancre} » ?`,
        format: "qcm" as const,
        choices: makeChoices(cas.graphie, autres),
        expected: [cas.graphie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le son ${s.son} ne s'écrit pas toujours de la même façon.`,
          "Prononce le mot, repère l'endroit où le son sort, puis regarde les lettres qui sont là.",
          `Dans « ${cas.mot} », ce sont les lettres « ${cas.graphie} » qui font ${s.son}.`,
          `Le son ${s.son} s'écrit « ${cas.graphie} » dans « ${cas.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gph_ecrire_son_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_ecrire_son",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul de ces mots écrit le son avec ces lettres-là.",
    tags: ["cp", "graphemes", "encodage", "template"],
    generate: () => {
      const s = randomChoice(GRAPHIES_DU_SON);
      const cas = randomChoice(s.cas);
      const autres = s.cas
        .filter((c) => c.graphie !== cas.graphie)
        .map((c) => c.mot);
      return {
        text: `Dans quel mot le son ${s.son} s'écrit-il « ${cas.graphie} » ?`,
        format: "qcm" as const,
        choices: makeChoices(cas.mot, autres),
        expected: [cas.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le son ${s.son} change d'habits selon les mots.`,
          "Regarde chaque mot et cherche celui où le son s'écrit avec les lettres demandées.",
          `Dans « ${cas.mot} », le son ${s.son} s'écrit bien « ${cas.graphie} ». ${autres.map((m) => `« ${m} »`).join(", ")} l'écrivent autrement.`,
          `Le mot est « ${cas.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_GPH_DEFI — les deux faces du piège en même temps
  ========================================================= */
  {
    kind: "template",
    id: "cp_gph_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux mots l'écrivent pareil. Trouve celui qui fait autrement.",
    tags: ["cp", "graphemes", "defi", "template"],
    generate: () => {
      const s = randomChoice(GRAPHIES_DU_SON);
      const parGraphie = new Map<string, string[]>();
      for (const c of s.cas) parGraphie.set(c.graphie, [...(parGraphie.get(c.graphie) ?? []), c.mot]);
      const groupes = [...parGraphie.entries()].filter(([, mots]) => mots.length >= 2);
      const [graphieCommune, motsCommuns] = groupes.length
        ? randomChoice(groupes)
        : [...parGraphie.entries()][0];
      const intrus = s.cas.find((c) => c.graphie !== graphieCommune);
      const bande = shuffle(motsCommuns).slice(0, 2);
      if (!intrus) {
        return {
          text: `Dans quel mot le son ${s.son} s'écrit-il « ${graphieCommune} » ?`,
          format: "qcm" as const,
          choices: makeChoices(bande[0], s.cas.map((c) => c.mot).filter((m) => m !== bande[0])),
          expected: [bande[0]],
          comparator: "mcq_exact" as const,
          explanation: exp(
            `Le son ${s.son} change d'habits selon les mots.`,
            "Regarde les lettres à l'endroit où le son sort.",
            `Dans « ${bande[0]} », il s'écrit « ${graphieCommune} ».`,
            `Le mot est « ${bande[0]} ».`,
          ),
        };
      }
      return {
        text: `Dans « ${bande.join(" » et « ")} », le son ${s.son} s'écrit « ${graphieCommune} ». Quel mot l'écrit AUTREMENT ?`,
        format: "qcm" as const,
        choices: makeChoices(
          intrus.mot,
          shuffle(motsCommuns.filter((m) => !bande.includes(m)).concat(bande)).slice(0, 3),
        ),
        expected: [intrus.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Un même son s'écrit de plusieurs façons : c'est le piège du français.`,
          "Repère d'abord l'écriture commune, puis cherche celui qui s'en écarte.",
          `« ${intrus.mot} » écrit ${s.son} avec « ${intrus.graphie} », pas avec « ${graphieCommune} ».`,
          `Le mot qui fait autrement est « ${intrus.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_gph_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "grapheme_phoneme",
    microId: "cp_gph_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Vérifie les deux choses : le son composé, ET la première lettre.",
    tags: ["cp", "graphemes", "defi", "template"],
    generate: () => {
      const s = randomChoice(SONS_COMPOSES);
      const bon = randomChoice(s.mots);
      const premiere = bon.charAt(0);
      const autres = shuffle([
        ...new Set(
          SONS_COMPOSES.flatMap((x) => x.mots).filter(
            (m) => m !== bon && (m.charAt(0) !== premiere || !m.includes(s.graphie)),
          ),
        ),
      ]).slice(0, 3);
      return {
        text: `Quel mot contient le son « ${s.graphie} » (celui de « ${s.ancre} ») ET commence par la lettre « ${premiere} » ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux conditions à vérifier, pas une seule.",
          "Regarde d'abord la première lettre, puis cherche le son composé à l'intérieur.",
          `« ${bon} » commence par « ${premiere} » et contient « ${s.graphie} ».`,
          `Le mot est « ${bon} ».`,
        ),
      };
    },
  },
];
