// lib/tutor-v4/questionBank/cp/francais/conjugaison.bank.ts
//
// La conjugaison du CP, écrite à la main. Notion NEUVE, et c'est la plus
// choquante des absences : le coach n'avait AUCUNE conjugaison au CP, alors
// que le BO écrit noir sur blanc, dans les objectifs du cours préparatoire :
//
//     « Apprendre à conjuguer être et avoir au présent de l'indicatif et
//      commencer à les mobiliser à l'écrit. »
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — être et avoir au présent de l'indicatif, aux six personnes ;
//   — « Observer les différentes formes verbales fréquentes et régulières » ;
//   — « S'initier à l'identification de la relation sujet-verbe à partir du
//     sens et de l'observation des effets des transformations liées aux temps
//     et aux personnes » ;
//   — l'exemple de réussite donne les terminaisons à installer :
//     « nous → ons, vous → ez, ils → ent, tu → s ».
//
// ⛔ RIEN D'AUTRE. Pas d'imparfait, pas de futur, pas de passé composé : ils
// arrivent au CE1. Pas de verbe du premier groupe conjugué en entier non plus
// — on OBSERVE les terminaisons, on ne récite pas « chanter » aux six
// personnes.
//
// LE PIÈGE DE LA NOTION : le pluriel des verbes ne s'entend pas. « il chante »
// et « ils chantent » se disent exactement pareil ; c'est l'œil qui doit
// trancher, en remontant au sujet. Le BO le dit de son côté : « marque de
// pluriel des verbes = nt ».

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

const ETRE = [
  { pronom: "je", forme: "suis", phrase: "Je ___ content." },
  { pronom: "tu", forme: "es", phrase: "Tu ___ mon ami." },
  { pronom: "il", forme: "est", phrase: "Le margouillat ___ sur le mur." },
  { pronom: "elle", forme: "est", phrase: "La mangue ___ mûre." },
  { pronom: "nous", forme: "sommes", phrase: "Nous ___ dans la cour." },
  { pronom: "vous", forme: "êtes", phrase: "Vous ___ en retard." },
  { pronom: "ils", forme: "sont", phrase: "Les letchis ___ mûrs." },
  { pronom: "elles", forme: "sont", phrase: "Elles ___ à la plage." },
] as const;

const AVOIR = [
  { pronom: "j'", forme: "ai", phrase: "J'___ un cahier bleu." },
  { pronom: "tu", forme: "as", phrase: "Tu ___ une gomme." },
  { pronom: "il", forme: "a", phrase: "Le chien ___ soif." },
  { pronom: "elle", forme: "a", phrase: "Elle ___ un vélo rouge." },
  { pronom: "nous", forme: "avons", phrase: "Nous ___ faim." },
  { pronom: "vous", forme: "avez", phrase: "Vous ___ raison." },
  { pronom: "ils", forme: "ont", phrase: "Ils ___ des billes." },
  { pronom: "elles", forme: "ont", phrase: "Elles ___ un chat." },
] as const;

const FORMES_ETRE = ["suis", "es", "est", "sommes", "êtes", "sont"] as const;
const FORMES_AVOIR = ["ai", "as", "a", "avons", "avez", "ont"] as const;

// Verbes réguliers en -er : pas de -ger ni de -cer, dont le « nous » change de
// forme (nous mangeons, nous plaçons). Au CP on observe la régularité.
const VERBES_ER = [
  "chanter", "jouer", "danser", "sauter", "parler",
  "marcher", "dessiner", "regarder", "écouter", "aimer",
  "donner", "trouver", "arriver", "monter", "tourner",
] as const;

const TERMINAISONS = [
  { pronom: "nous", terminaison: "-ons", exemple: "nous chantons" },
  { pronom: "vous", terminaison: "-ez", exemple: "vous chantez" },
  { pronom: "ils", terminaison: "-ent", exemple: "ils chantent" },
  { pronom: "tu", terminaison: "-s", exemple: "tu chantes" },
] as const;

function radical(verbe: string) {
  return verbe.slice(0, -2);
}

export const conjugaisonBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_CONJ_ETRE_PRESENT
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_conj_etre_present_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_etre_present",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : « Le margouillat ___ sur le mur. » (verbe être)",
    format: "qcm",
    choices: ["est", "es", "sont", "suis"],
    expected: ["est"],
    comparator: "mcq_exact",
    hint: "Un seul margouillat. Remplace-le par « il » dans ta tête.",
    explanation: exp(
      "Le verbe être change de forme selon celui qui fait l'action : je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
      "Remplace le sujet par un petit mot : le margouillat, c'est « il ».",
      "Il ___ sur le mur → il EST sur le mur. « es » va avec « tu », « sont » avec « ils ».",
      "On écrit « Le margouillat est sur le mur. »",
    ),
    tags: ["cp", "conjugaison", "etre", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_conj_etre_present_fixed_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_etre_present",
    difficulty: 3,
    theme: "neutral",
    text: "« Il est » et « ils sont » : qu'est-ce qui change dans la phrase ?",
    format: "qcm",
    choices: [
      "Le nombre : un seul, ou plusieurs",
      "Le moment : hier, ou aujourd'hui",
      "Rien du tout",
      "Le lieu : ici, ou là-bas",
    ],
    expected: ["Le nombre : un seul, ou plusieurs"],
    comparator: "mcq_exact",
    hint: "Compte combien de personnes ou de choses font l'action.",
    explanation: exp(
      "Le verbe suit son sujet : s'il y en a un seul, ou s'il y en a plusieurs, le verbe n'est pas le même.",
      "Demande-toi : combien sont-ils ?",
      "Le letchi EST mûr. Les letchis SONT mûrs. Un seul fruit, plusieurs fruits — et le verbe change avec eux.",
      "Ce qui change, c'est le nombre : un seul, ou plusieurs.",
    ),
    tags: ["cp", "conjugaison", "etre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_conj_etre_present_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_etre_present",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde qui fait l'action, puis choisis la forme qui va avec.",
    tags: ["cp", "conjugaison", "etre", "template"],
    generate: () => {
      const item = randomChoice(ETRE);
      return {
        text: `Complète avec le verbe être :\n\n« ${item.phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(
          item.forme,
          FORMES_ETRE.filter((f) => f !== item.forme),
        ),
        expected: [item.forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe être : je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
          "Repère qui fait l'action, puis prends la forme qui lui correspond.",
          `Avec « ${item.pronom} », le verbe être fait « ${item.forme} ».`,
          `On écrit : « ${item.phrase.replace("___", item.forme)} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_conj_etre_present_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_etre_present",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite le verbe être dans ta tête : je suis, tu es, il est…",
    tags: ["cp", "conjugaison", "etre", "template"],
    generate: () => {
      const item = randomChoice(ETRE);
      return {
        text: `Avec « ${item.pronom} », comment se conjugue le verbe être au présent ?`,
        format: "qcm" as const,
        choices: makeChoices(
          item.forme,
          FORMES_ETRE.filter((f) => f !== item.forme),
        ),
        expected: [item.forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe être : je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
          "Récite la liste jusqu'à tomber sur le bon pronom.",
          `${item.pronom} ${item.forme}.`,
          `Avec « ${item.pronom} », on écrit « ${item.forme} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CONJ_AVOIR_PRESENT
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_conj_avoir_present_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_avoir_present",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : « Nous ___ faim. » (verbe avoir)",
    format: "qcm",
    choices: ["avons", "avez", "ont", "as"],
    expected: ["avons"],
    comparator: "mcq_exact",
    hint: "Avec « nous », le verbe finit presque toujours par -ons.",
    explanation: exp(
      "Le verbe avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont.",
      "Regarde le pronom, puis prends la forme qui va avec.",
      "Nous ___ faim → nous AVONS faim. Avec « nous », les verbes finissent presque toujours par -ons.",
      "On écrit « Nous avons faim. »",
    ),
    tags: ["cp", "conjugaison", "avoir", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "cp_conj_avoir_present_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_avoir_present",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde qui possède, puis choisis la forme qui va avec.",
    tags: ["cp", "conjugaison", "avoir", "template"],
    generate: () => {
      const item = randomChoice(AVOIR);
      return {
        text: `Complète avec le verbe avoir :\n\n« ${item.phrase} »`,
        format: "qcm" as const,
        choices: makeChoices(
          item.forme,
          FORMES_AVOIR.filter((f) => f !== item.forme),
        ),
        expected: [item.forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont.",
          "Repère qui possède, puis prends la forme qui lui correspond.",
          `Avec « ${item.pronom} », le verbe avoir fait « ${item.forme} ».`,
          `On écrit : « ${item.phrase.replace("___", item.forme)} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_conj_avoir_present_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_avoir_present",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite : j'ai, tu as, il a, nous avons…",
    tags: ["cp", "conjugaison", "avoir", "template"],
    generate: () => {
      const item = randomChoice(AVOIR);
      return {
        text: `Avec « ${item.pronom} », comment se conjugue le verbe avoir au présent ?`,
        format: "qcm" as const,
        choices: makeChoices(
          item.forme,
          FORMES_AVOIR.filter((f) => f !== item.forme),
        ),
        expected: [item.forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont.",
          "Récite la liste jusqu'à tomber sur le bon pronom.",
          `${item.pronom} ${item.forme}.`,
          `Avec « ${item.pronom} », on écrit « ${item.forme} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CONJ_FORMES_VERBALES — les terminaisons du BO
     nous → ons, vous → ez, ils → ent, tu → s
     LE piège : le -ent ne s'entend pas.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_conj_formes_verbales_fixed_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_formes_verbales",
    difficulty: 3,
    theme: "neutral",
    text: "« Il chante » et « ils chantent » : entend-on une différence quand on les dit ?",
    format: "qcm",
    choices: [
      "Non, ça se dit pareil : c'est l'œil qui voit la différence",
      "Oui, on entend le « nt » à la fin",
      "Oui, le premier est plus long",
      "Non, et ça s'écrit pareil aussi",
    ],
    expected: ["Non, ça se dit pareil : c'est l'œil qui voit la différence"],
    comparator: "mcq_exact",
    hint: "Dis les deux à voix haute, l'un après l'autre.",
    explanation: exp(
      "La marque du pluriel des verbes, c'est « -nt ». Elle s'écrit, mais elle ne s'entend pas.",
      "Ne compte pas sur ton oreille : remonte au sujet et compte combien ils sont.",
      "Il chante. Ils chantent. Ta bouche dit la même chose ; c'est le « s » de « ils » qui prévient qu'il faut écrire « -ent ».",
      "Non, ça se dit pareil. C'est l'œil qui voit la différence.",
    ),
    tags: ["cp", "conjugaison", "terminaisons", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_conj_formes_verbales_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_formes_verbales",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque pronom a sa terminaison à lui.",
    tags: ["cp", "conjugaison", "terminaisons", "template"],
    generate: () => {
      const item = randomChoice(TERMINAISONS);
      return {
        text: `Avec « ${item.pronom} », par quoi se termine le verbe ?`,
        format: "qcm" as const,
        choices: makeChoices(
          item.terminaison,
          TERMINAISONS.filter((t) => t.terminaison !== item.terminaison).map((t) => t.terminaison),
        ),
        expected: [item.terminaison],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque pronom entraine sa terminaison : nous → -ons, vous → -ez, ils → -ent, tu → -s.",
          "Récite les quatre dans ta tête et retrouve celle du pronom demandé.",
          `${item.exemple}.`,
          `Avec « ${item.pronom} », le verbe se termine par « ${item.terminaison} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_conj_formes_verbales_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_formes_verbales",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le pronom, puis colle la bonne terminaison au verbe.",
    tags: ["cp", "conjugaison", "terminaisons", "template"],
    generate: () => {
      const verbe = randomChoice(VERBES_ER);
      const rad = radical(verbe);
      const item = randomChoice(TERMINAISONS);
      // tu → radical + es ; nous → +ons ; vous → +ez ; ils → +ent
      // (avec « tu », le BO retient « -s » comme marque ; sur un verbe en -er
      //  la terminaison écrite est « -es », le e du radical restant.)
      const ajout = item.pronom === "tu" ? "es" : item.terminaison.slice(1);
      const forme = `${rad}${ajout}`;
      const toutes = [`${rad}es`, `${rad}ons`, `${rad}ez`, `${rad}ent`];
      return {
        text: `Complète : « ${item.pronom.charAt(0).toUpperCase() + item.pronom.slice(1)} ${rad}… » — verbe « ${verbe} ».`,
        format: "qcm" as const,
        choices: shuffle(toutes),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On garde le début du verbe et on change seulement sa fin, selon le pronom.",
          "Enlève le « -er » de l'infinitif, garde le début, puis ajoute la terminaison du pronom.",
          `${verbe} → ${rad}… Avec « ${item.pronom} », on ajoute « ${ajout} » : ${item.pronom} ${forme}.`,
          `On écrit « ${item.pronom} ${forme} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CP_CONJ_DEFI — remonter au sujet pour choisir le verbe
  ========================================================= */
  {
    kind: "template",
    id: "cp_conj_defi_tpl_1",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord, combien sont-ils ? Ensuite seulement, choisis le verbe.",
    tags: ["cp", "conjugaison", "defi", "template"],
    generate: () => {
      const surEtre = randomChoice([true, false]);
      const table = surEtre ? ETRE : AVOIR;
      const singulier = randomChoice(table.filter((x) => x.pronom === "il" || x.pronom === "elle"));
      const pluriel = table.find((x) => x.pronom === "ils") ?? table[table.length - 1];
      const versPluriel = randomChoice([true, false]);
      const depart = versPluriel ? singulier : pluriel;
      const arrivee = versPluriel ? pluriel : singulier;
      const sujetArrivee = versPluriel ? "ils" : "il";
      return {
        text: `« ${depart.phrase.replace("___", depart.forme)} »\n\nSi on met le sujet ${versPluriel ? "au PLURIEL" : "au SINGULIER"} (« ${sujetArrivee} »), que devient le verbe ${surEtre ? "être" : "avoir"} ?`,
        format: "qcm" as const,
        choices: makeChoices(
          arrivee.forme,
          (surEtre ? FORMES_ETRE : FORMES_AVOIR).filter((f) => f !== arrivee.forme),
        ),
        expected: [arrivee.forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe suit son sujet : quand le sujet passe du singulier au pluriel, le verbe change avec lui.",
          "Compte d'abord combien ils sont, puis prends la forme du verbe qui va avec.",
          `${depart.pronom} ${depart.forme} → ${sujetArrivee} ${arrivee.forme}.`,
          `Le verbe devient « ${arrivee.forme} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_conj_defi_tpl_2",
    niveau: "cp",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "cp_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le « s » de « ils » prévient : il faut écrire « -ent » au verbe.",
    tags: ["cp", "conjugaison", "defi", "template"],
    generate: () => {
      const verbe = randomChoice(VERBES_ER);
      const rad = radical(verbe);
      const pluriel = randomChoice([true, false]);
      const sujet = pluriel ? "Les enfants" : "L'enfant";
      const forme = pluriel ? `${rad}ent` : `${rad}e`;
      return {
        text: `Complète : « ${sujet} ${rad}… » — verbe « ${verbe} ».`,
        format: "qcm" as const,
        choices: shuffle([`${rad}e`, `${rad}ent`, `${rad}es`, `${rad}ons`]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La marque du pluriel des verbes est « -nt ». Elle s'écrit et ne s'entend pas.",
          "Regarde le sujet : y en a-t-il un seul, ou plusieurs ? Puis écris la terminaison, même si tu ne l'entends pas.",
          pluriel
            ? `« Les enfants », c'est plusieurs : on écrit ${forme}, avec « -ent » à la fin, même si ça se dit comme au singulier.`
            : `« L'enfant », c'est un seul : on écrit ${forme}, sans « -nt ».`,
          `On écrit « ${sujet} ${forme} ».`,
        ),
      };
    },
  },
];
