// lib/tutor-v4/questionBank/ce1/francais/ecriture-cursive.bank.ts
//
// L'écriture cursive au CE1, écrite à la main. Trois micro-compétences.
//
// NOTION NEUVE : elle n'existait pas dans l'ancienne liste, et le repli
// l'envoyait sur le générateur de langage oral — « Pour bien raconter ce qu'on
// a vu, quelle est la meilleure façon de faire ? » arrivait sur « Reconnaître
// une lettre dans les quatre écritures ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Il reconnait les lettres dans les QUATRE écritures » ;
//   — « Il transcrit l'écriture scripte en écriture cursive » ;
//   — les majuscules cursives « à partir de la période 2 ».
//
// ⚠️ LE TRACÉ SE JUGE SUR LE CAHIER, PAS SUR UN ÉCRAN. On ne peut ni voir la
// tenue du crayon, ni corriger une boucle. Ce qui est vérifiable ici, c'est ce
// que le BO nomme lui-même : RECONNAITRE une lettre d'une écriture à l'autre,
// et savoir ce que chaque écriture sert à faire. Le reste demande un cahier,
// un crayon et un adulte à côté.
//
// LES QUATRE ÉCRITURES, et c'est le cœur de la notion :
//   1. la scripte minuscule — celle des livres : a, b, c
//   2. la SCRIPTE MAJUSCULE — celle des titres et des affiches : A, B, C
//   3. la cursive minuscule — celle qu'on écrit attachée sur le cahier
//   4. la Cursive majuscule — celle qui ouvre les phrases et les prénoms
//
// LE PIÈGE DE LA NOTION : un enfant croit que ce sont QUATRE lettres
// différentes. « A » et « a » ne se ressemblent pas du tout, et pourtant c'est
// la même lettre, qui fait le même son.

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

const ALPHABET: readonly string[] = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
];

/** Les lettres dont la majuscule ne ressemble PAS à la minuscule : celles qui
 *  font croire à un enfant qu'il s'agit de deux lettres différentes. */
const TRES_DIFFERENTES: readonly string[] = [
  "a", "b", "d", "e", "g", "h", "i", "l", "m", "n", "q", "r", "t", "y",
];

const ECRITURES: readonly { readonly nom: string; readonly usage: string }[] = [
  { nom: "la scripte minuscule", usage: "on la lit dans les livres et sur les écrans" },
  { nom: "la scripte majuscule", usage: "on la voit sur les titres, les affiches et les panneaux" },
  { nom: "la cursive minuscule", usage: "on l'écrit attachée, à la main, sur le cahier" },
  { nom: "la cursive majuscule", usage: "on l'écrit à la main au début des phrases et des prénoms" },
];

/** Ce qui déclenche une majuscule dans une phrase. */
const RAISONS_MAJUSCULE: readonly { readonly mot: string; readonly phrase: string; readonly raison: string }[] = [
  { mot: "Le", phrase: "Le margouillat grimpe sur le mur.", raison: "c'est le premier mot de la phrase" },
  { mot: "Léa", phrase: "Chaque matin, Léa ramasse des mangues.", raison: "c'est un prénom" },
  { mot: "Papa", phrase: "Le dimanche, Papa prépare un cari.", raison: "c'est un prénom" },
  { mot: "Les", phrase: "Les enfants jouent dans la cour.", raison: "c'est le premier mot de la phrase" },
  { mot: "Saint-Denis", phrase: "Nous partons à Saint-Denis demain.", raison: "c'est un nom de ville" },
  { mot: "Mafate", phrase: "Le sentier descend dans Mafate.", raison: "c'est un nom de lieu" },
  { mot: "Une", phrase: "Une mangue mûre tombe dans l'herbe.", raison: "c'est le premier mot de la phrase" },
  { mot: "Tom", phrase: "Après l'école, Tom range son cartable.", raison: "c'est un prénom" },
  { mot: "La", phrase: "La tortue remonte le sable.", raison: "c'est le premier mot de la phrase" },
  { mot: "Mamie", phrase: "Le soir, Mamie raconte une histoire.", raison: "c'est un prénom" },
];

export const ecritureCursiveBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_CURSIVE_QUATRE_ECRITURES
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_cursive_quatre_ecritures_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_quatre_ecritures",
    difficulty: 2,
    theme: "neutral",
    text: "Combien d'écritures différentes faut-il savoir reconnaitre pour une même lettre ?",
    format: "qcm",
    choices: [
      "Quatre : scripte et cursive, en minuscule et en majuscule",
      "Deux : la majuscule et la minuscule",
      "Une seule",
      "Six",
    ],
    expected: ["Quatre : scripte et cursive, en minuscule et en majuscule"],
    comparator: "mcq_exact",
    hint: "Celle des livres, celle des affiches, celle du cahier, et celle qui ouvre les phrases.",
    explanation: exp(
      "Une même lettre s'écrit de quatre façons : scripte minuscule (a), scripte majuscule (A), cursive minuscule et cursive majuscule.",
      "Quand tu vois une lettre nouvelle, demande-toi laquelle des quatre tu regardes.",
      "a, A : ces deux-là ne se ressemblent pas du tout, et c'est pourtant la même lettre. Les deux écritures cursives, celles qu'on trace à la main, en ajoutent deux autres encore.",
      "Il y en a quatre.",
    ),
    tags: ["ce1", "cursive", "quatre-ecritures", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_cursive_quatre_ecritures_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_quatre_ecritures",
    difficulty: 2,
    theme: "neutral",
    hint: "Elles ne se ressemblent pas, et pourtant elles font le même son.",
    tags: ["ce1", "cursive", "quatre-ecritures", "template"],
    generate: () => {
      const l = randomChoice(TRES_DIFFERENTES);
      const autres = shuffle(ALPHABET.filter((x) => x !== l))
        .slice(0, 3)
        .map((x) => x.toUpperCase());
      return {
        text: `Quelle majuscule correspond à la lettre « ${l} » ?`,
        format: "qcm" as const,
        choices: makeChoices(l.toUpperCase(), autres),
        expected: [l.toUpperCase()],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une lettre garde son nom et son son, quelle que soit l'écriture dans laquelle on l'écrit.",
          "Récite l'alphabet en minuscules et en majuscules côte à côte : a-A, b-B, c-C…",
          `« ${l} » et « ${l.toUpperCase()} » ne se ressemblent pas du tout, et c'est bien la même lettre.`,
          `La majuscule de « ${l} » est « ${l.toUpperCase()} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cursive_quatre_ecritures_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_quatre_ecritures",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque écriture a son métier : lire, afficher, écrire à la main.",
    tags: ["ce1", "cursive", "quatre-ecritures", "template"],
    generate: () => {
      const e = randomChoice(ECRITURES);
      const autres = ECRITURES.filter((x) => x.nom !== e.nom).map((x) => x.usage);
      return {
        text: `À quoi sert ${e.nom} ?`,
        format: "qcm" as const,
        choices: makeChoices(e.usage, autres),
        expected: [e.usage],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les quatre écritures ne servent pas à la même chose : deux se lisent surtout, deux se tracent à la main.",
          "Demande-toi où tu vois cette écriture-là dans une journée.",
          `${e.nom} : ${e.usage}.`,
          `${e.nom} sert à ceci : ${e.usage}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CURSIVE_SCRIPTE_CURSIVE
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_cursive_scripte_cursive_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_scripte_cursive",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui change quand on recopie en cursive un mot lu dans un livre ?",
    format: "qcm",
    choices: [
      "Les lettres s'attachent les unes aux autres, mais ce sont les mêmes",
      "Les lettres changent de nom",
      "Le mot change de sens",
      "On enlève des lettres",
    ],
    expected: ["Les lettres s'attachent les unes aux autres, mais ce sont les mêmes"],
    comparator: "mcq_exact",
    hint: "En cursive, on lève le crayon le moins possible.",
    explanation: exp(
      "Transcrire, c'est réécrire le même mot dans une autre écriture. Les lettres, leur ordre et leur son ne changent pas.",
      "Lis le mot dans le livre, garde-le en tête, puis écris-le attaché sans regarder lettre par lettre.",
      "« margouillat » lu dans un livre s'écrit avec les mêmes onze lettres sur ton cahier — simplement attachées les unes aux autres.",
      "Les lettres s'attachent, mais ce sont les mêmes.",
    ),
    tags: ["ce1", "cursive", "transcription", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_cursive_scripte_cursive_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_scripte_cursive",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot ne change pas : seules les lettres changent d'habit.",
    tags: ["ce1", "cursive", "transcription", "template"],
    generate: () => {
      const r = randomChoice(RAISONS_MAJUSCULE);
      const mot = r.phrase.split(" ").find((m) => m.length > 5)?.replace(/[.,]/g, "") ?? "margouillat";
      return {
        text: `Tu recopies en cursive le mot « ${mot} », lu dans un livre.\n\nCombien de lettres écris-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(String(mot.length), [
          String(mot.length - 1),
          String(mot.length + 1),
          String(Math.max(2, mot.length - 3)),
        ]),
        expected: [String(mot.length)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Passer de la scripte à la cursive ne change ni les lettres, ni leur nombre, ni leur ordre.",
          "Compte les lettres du modèle, puis compte celles que tu as écrites : les deux doivent tomber juste.",
          `« ${mot} » a ${mot.length} lettres dans le livre, et ${mot.length} lettres sur ton cahier. Seule leur forme a changé.`,
          `Tu écris ${mot.length} lettres.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CURSIVE_MAJUSCULES — à partir de la période 2
  ========================================================= */
  {
    kind: "template",
    id: "ce1_cursive_majuscules_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_majuscules",
    difficulty: 2,
    theme: "neutral",
    hint: "Une majuscule ne se met pas au hasard : il y a toujours une raison.",
    tags: ["ce1", "cursive", "majuscules", "template"],
    generate: () => {
      const r = randomChoice(RAISONS_MAJUSCULE);
      const autres = [
        "c'est un mot long",
        "c'est un verbe",
        r.raison === "c'est un prénom" ? "c'est le premier mot de la phrase" : "c'est un prénom",
      ];
      return {
        text: `« ${r.phrase} »\n\nPourquoi « ${r.mot} » commence-t-il par une majuscule ?`,
        format: "qcm" as const,
        choices: makeChoices(r.raison, autres),
        expected: [r.raison],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On écrit une majuscule au début d'une phrase, et au début d'un nom propre : prénom, nom de ville, nom de lieu.",
          "Demande-toi : ce mot ouvre-t-il la phrase ? désigne-t-il quelqu'un ou un endroit précis ?",
          `Dans « ${r.phrase} », « ${r.mot} » prend une majuscule parce que ${r.raison}.`,
          `C'est parce que ${r.raison}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cursive_majuscules_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_majuscules",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les mots qui ouvrent la phrase, et ceux qui nomment quelqu'un ou un endroit.",
    tags: ["ce1", "cursive", "majuscules", "template"],
    generate: () => {
      const r = randomChoice(RAISONS_MAJUSCULE);
      const majuscules = r.phrase
        .split(" ")
        .filter((m) => /^[A-ZÀ-Ý]/.test(m));
      return {
        text: `« ${r.phrase} »\n\nCombien de mots portent une majuscule dans cette phrase ?`,
        format: "qcm" as const,
        choices: shuffle(["1", "2", "3", "aucun"]),
        expected: [String(majuscules.length)],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une majuscule s'écrit au début de la phrase, et devant chaque nom propre.",
          "Passe les mots un par un et regarde leur première lettre.",
          `Ici : ${majuscules.map((m) => `« ${m.replace(/[.,]/g, "")} »`).join(" et ")}. Aucun autre mot n'en a besoin.`,
          `Il y en a ${majuscules.length}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_cursive_majuscules_ouverte_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_cursive",
    microId: "ce1_cursive_majuscules",
    difficulty: 3,
    theme: "neutral",
    text: "La lettre « a » et la lettre « A » ne se ressemblent pas du tout.\n\nExplique avec tes mots pourquoi c'est quand même la même lettre.",
    format: "open",
    expected: ["même son", "meme son", "même lettre", "alphabet", "nom", "majuscule", "minuscule", "écriture", "ecriture"],
    comparator: "contains_keyword",
    hint: "Dis les deux à voix haute. Qu'est-ce qui est pareil ?",
    explanation: exp(
      "Une lettre garde son nom et son son quelle que soit l'écriture : scripte ou cursive, minuscule ou majuscule.",
      "Prononce la lettre : si le son est le même, c'est la même lettre, même si le dessin change du tout au tout.",
      "a et A se disent pareil et occupent la même place dans l'alphabet. Ce sont deux habits pour une seule lettre — et il y en a quatre en tout.",
      "Parce qu'elles se disent pareil et occupent la même place dans l'alphabet : seul le dessin change.",
    ),
    tags: ["ce1", "cursive", "majuscules", "piege", "open"],
  },
];
