// lib/tutor-v4/questionBank/ce2/maths/division.bank.ts
//
// Les partages et groupements du CE2, écrits à la main. Cinq micro-compétences
// qui passaient par le constructeur commun.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : la division comme PARTAGE
// ou comme GROUPEMENT, le lien avec la multiplication, et l'interprétation du
// reste. ⛔ Pas de division posée au cycle 2 : la technique opératoire arrive au
// CM1. On cherche le quotient en s'appuyant sur les tables.
//
// LE PIÈGE DE LA NOTION : le reste qu'on jette. 26 élèves, des cars de
// 8 places : 26 = 3 × 8 + 2, et l'élève répond 3 cars. Les deux derniers
// resteraient sur le trottoir. Selon la question posée, le même reste s'arrondit
// vers le haut (il faut un car de plus) ou se garde tel quel (il reste 2 billes).
// Le calcul ne décide pas : c'est l'histoire qui décide.
// Son cousin : confondre « combien chacun en a » (partage) et « combien de
// paquets on fait » (groupement).
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const divisionBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_DIVISION_SENS — partage ou groupement
     Deux histoires différentes, un même calcul.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 2,
    theme: "neutral",
    text: "On partage 24 billes entre 4 enfants, à parts égales. Combien de billes chacun ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche dans la table de 4 : 4 fois combien font 24 ?",
    explanation: exp(
      "Partager à parts égales, c'est chercher ce que reçoit chacun.",
      "On cherche dans la table du nombre de parts.",
      "4 × 6 = 24, donc chacun reçoit 6 billes. On peut le vérifier : 6 + 6 + 6 + 6 = 24.",
      "Chacun a 6 billes.",
    ),
    tags: ["ce2", "division", "sens", "partage"],
  },
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 3,
    theme: "neutral",
    text: "On range 24 billes dans des sachets de 4. Combien de sachets ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cette fois on connaît la taille des paquets, pas leur nombre.",
    explanation: exp(
      "Grouper, c'est chercher COMBIEN DE PAQUETS on peut faire quand on connaît leur taille.",
      "On cherche combien de fois 4 tient dans 24.",
      "4 × 6 = 24, donc on remplit 6 sachets. C'est le même calcul que le partage de 24 billes entre 4 enfants, mais l'histoire est différente : ici le 4 est la taille du paquet, là c'était le nombre d'enfants.",
      "On remplit 6 sachets.",
    ),
    tags: ["ce2", "division", "sens", "groupement"],
  },
  {
    kind: "fixed",
    id: "ce2_division_sens_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 4,
    theme: "reunion",
    text: "Au marché, on met 30 letchis dans des barquettes de 6. Que cherche-t-on : combien de letchis par barquette, ou combien de barquettes ?",
    format: "qcm",
    choices: [
      "combien de barquettes",
      "combien de letchis par barquette",
      "les deux à la fois",
      "on ne peut pas savoir",
    ],
    expected: ["combien de barquettes"],
    comparator: "mcq_exact",
    hint: "Le 6, est-ce le nombre de barquettes ou ce qu'elles contiennent ?",
    explanation: exp(
      "Dans un groupement, on connaît la taille des paquets et on cherche leur nombre.",
      "On regarde ce que désigne le second nombre de l'énoncé.",
      "« Des barquettes de 6 » dit ce que contient CHAQUE barquette. On cherche donc combien on en remplit : 6 × 5 = 30, soit 5 barquettes.",
      "On cherche combien de barquettes.",
    ),
    tags: ["ce2", "division", "sens", "reunion", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_division_sens_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche dans la table : combien de fois ce nombre pour arriver au total ?",
    tags: ["ce2", "division", "sens", "template"],
    generate: () => {
      const parts = randomInt(2, 9);
      const chacun = randomInt(2, 9);
      const total = parts * chacun;
      const partage = randomChoice([true, false]);
      const objet = randomChoice([
        { nom: "billes", contenant: "sachets" },
        { nom: "images", contenant: "pochettes" },
        { nom: "letchis", contenant: "barquettes" },
        { nom: "crayons", contenant: "trousses" },
      ]);
      return partage
        ? {
            text: `On partage ${total} ${objet.nom} entre ${parts} enfants, à parts égales. Combien de ${objet.nom} chacun ?`,
            format: "short",
            expected: [String(chacun)],
            comparator: "number_equal",
            explanation: exp(
              "Partager à parts égales, c'est chercher ce que reçoit chacun.",
              "On cherche dans la table du nombre d'enfants.",
              `${parts} × ${chacun} = ${total}, donc chacun reçoit ${chacun} ${objet.nom}.`,
              `Chacun a ${chacun} ${objet.nom}.`,
            ),
          }
        : {
            text: `On range ${total} ${objet.nom} dans des ${objet.contenant} de ${chacun}. Combien de ${objet.contenant} remplit-on ?`,
            format: "short",
            expected: [String(parts)],
            comparator: "number_equal",
            explanation: exp(
              "Grouper, c'est chercher combien de paquets on peut faire quand on connaît leur taille.",
              `On cherche combien de fois ${chacun} tient dans ${total}.`,
              `${chacun} × ${parts} = ${total}, donc on remplit ${parts} ${objet.contenant}.`,
              `On remplit ${parts} ${objet.contenant}.`,
            ),
          };
    },
  },
  {
    kind: "template",
    id: "ce2_division_sens_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_sens",
    difficulty: 4,
    theme: "neutral",
    hint: "Lis bien : le second nombre dit-il combien de paquets, ou ce qu'ils contiennent ?",
    tags: ["ce2", "division", "sens", "piege", "template"],
    generate: () => {
      const parts = randomInt(3, 8);
      const chacun = randomInt(3, 9);
      const total = parts * chacun;
      const groupement = randomChoice([true, false]);
      const texte = groupement
        ? `On range ${total} bonbons dans des boîtes de ${chacun}.`
        : `On partage ${total} bonbons entre ${parts} enfants.`;
      const bonne = groupement ? "combien de boîtes on remplit" : "combien de bonbons chacun reçoit";
      return {
        text: `${texte} Que cherche-t-on ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          "combien de boîtes on remplit",
          "combien de bonbons chacun reçoit",
          "combien de bonbons il y a en tout",
          "combien de bonbons il reste",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          groupement
            ? "Dans un groupement, on connaît la taille des paquets et on cherche leur nombre."
            : "Dans un partage, on connaît le nombre de parts et on cherche ce que reçoit chacun.",
          "On regarde ce que désigne le second nombre de l'énoncé.",
          groupement
            ? `« Des boîtes de ${chacun} » dit ce que contient chaque boîte. On cherche donc leur nombre : ${chacun} × ${parts} = ${total}, soit ${parts} boîtes.`
            : `« Entre ${parts} enfants » dit le nombre de parts. On cherche donc ce que reçoit chacun : ${parts} × ${chacun} = ${total}, soit ${chacun} bonbons.`,
          `On cherche ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DIVISION_LIEN_MULTIPLICATION — la table à l'envers
     Au CE2 on ne pose pas la division : on la lit dans les
     tables.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_division_lien_multiplication_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 2,
    theme: "neutral",
    text: "Si 7 × 5 = 35, combien font 35 partagés en 5 parts égales ?",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "La multiplication que tu connais donne la réponse toute faite.",
    explanation: exp(
      "La division et la multiplication sont deux opérations inverses.",
      "On relit la multiplication à l'envers : elle donne directement le partage.",
      "7 × 5 = 35 veut dire que 5 parts de 7 font 35. Donc 35 partagés en 5 parts donnent 7 par part.",
      "Chaque part vaut 7.",
    ),
    tags: ["ce2", "division", "lien_multiplication", "methode"],
  },
  {
    kind: "fixed",
    id: "ce2_division_lien_multiplication_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Comment vérifier qu'on a bien trouvé le résultat d'un partage ?",
    format: "qcm",
    choices: [
      "on multiplie le résultat par le nombre de parts et on doit retrouver le total",
      "on refait le même partage",
      "on additionne le résultat au total",
      "on ne peut pas vérifier",
    ],
    expected: ["on multiplie le résultat par le nombre de parts et on doit retrouver le total"],
    comparator: "mcq_exact",
    hint: "La multiplication défait ce que le partage a fait.",
    explanation: exp(
      "La multiplication est l'opération inverse de la division : elle sert à vérifier.",
      "On multiplie ce que reçoit chacun par le nombre de parts.",
      "Si 35 partagés en 5 donnent 7, alors 7 × 5 doit redonner 35. C'est le cas. Avec une erreur, par exemple 8, on aurait 8 × 5 = 40 : on verrait tout de suite que ça ne colle pas.",
      "On multiplie le résultat par le nombre de parts.",
    ),
    tags: ["ce2", "division", "lien_multiplication", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_lien_multiplication_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    text: "Combien de fois 6 tient-il dans 54 ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Récite la table de 6 jusqu'à 54.",
    explanation: exp(
      "Chercher combien de fois un nombre tient dans un autre, c'est parcourir sa table.",
      "On récite la table jusqu'à atteindre le total.",
      "6, 12, 18, 24, 30, 36, 42, 48, 54 : c'est le neuvième. Donc 6 × 9 = 54, et 6 tient 9 fois dans 54.",
      "6 tient 9 fois dans 54.",
    ),
    tags: ["ce2", "division", "lien_multiplication"],
  },
  {
    kind: "template",
    id: "ce2_division_lien_multiplication_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "Récite la table jusqu'à tomber sur le total.",
    tags: ["ce2", "division", "lien_multiplication", "template"],
    generate: () => {
      const diviseur = randomInt(2, 9);
      const quotient = randomInt(2, 9);
      const total = diviseur * quotient;
      return {
        text: `Combien de fois ${diviseur} tient-il dans ${total} ?`,
        format: "short",
        expected: [String(quotient)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien de fois un nombre tient dans un autre, c'est parcourir sa table.",
          "On récite la table jusqu'à atteindre le total.",
          `${diviseur} × ${quotient} = ${total}, donc ${diviseur} tient ${quotient} fois dans ${total}. Vérification : ${quotient} × ${diviseur} = ${total}.`,
          `${diviseur} tient ${quotient} fois dans ${total}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_division_lien_multiplication_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_lien_multiplication",
    difficulty: 3,
    theme: "neutral",
    hint: "La multiplication donnée contient déjà la réponse.",
    tags: ["ce2", "division", "lien_multiplication", "template"],
    generate: () => {
      const a = randomInt(3, 9);
      const b = randomInt(3, 9);
      const total = a * b;
      return {
        text: `On sait que ${a} × ${b} = ${total}. Combien font ${total} partagés en ${b} parts égales ?`,
        format: "short",
        expected: [String(a)],
        comparator: "number_equal",
        explanation: exp(
          "La division et la multiplication sont deux opérations inverses.",
          "On relit la multiplication à l'envers : elle donne le partage tout fait.",
          `${a} × ${b} = ${total} veut dire que ${b} parts de ${a} font ${total}. Donc ${total} partagés en ${b} parts donnent ${a} par part.`,
          `Chaque part vaut ${a}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DIVISION_RESTE — interpréter le reste
     Le même reste s'arrondit vers le haut ou se garde tel
     quel : c'est l'histoire qui tranche, pas le calcul.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_division_reste_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 3,
    theme: "neutral",
    text: "On partage 26 billes entre 4 enfants, à parts égales. Combien de billes restera-t-il ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Cherche le plus grand résultat de la table de 4 qui ne dépasse pas 26.",
    explanation: exp(
      "Quand le partage ne tombe pas juste, ce qui n'a pas pu être distribué s'appelle le reste.",
      "On cherche dans la table le plus grand produit qui ne dépasse pas le total, puis on soustrait.",
      "4 × 6 = 24 et 4 × 7 = 28, ce qui dépasse. Chacun reçoit donc 6 billes, et 26 - 24 = 2 : il reste 2 billes.",
      "Il reste 2 billes.",
    ),
    tags: ["ce2", "division", "reste"],
  },
  {
    kind: "fixed",
    id: "ce2_division_reste_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 5,
    theme: "reunion",
    text: "26 élèves partent en sortie. Chaque voiture emmène 8 élèves. Combien de voitures faut-il ?",
    format: "qcm",
    choices: ["4", "3", "2", "8"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "26 = 3 × 8 + 2. Que fait-on des deux élèves qui restent ?",
    explanation: exp(
      "Quand le reste ne peut pas être abandonné, il faut un groupe de plus.",
      "On calcule le partage, puis on regarde ce que le reste représente dans l'histoire.",
      "26 = 3 × 8 + 2. Trois voitures emmènent 24 élèves, et il en reste 2. On ne les laisse pas sur le trottoir : il faut une quatrième voiture, même si elle n'est pas pleine.",
      "Il faut 4 voitures.",
    ),
    tags: ["ce2", "division", "reste", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_reste_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 4,
    theme: "neutral",
    text: "Dans un partage, le reste peut-il être plus grand que le nombre de parts ?",
    format: "qcm",
    choices: [
      "non, sinon on pourrait encore donner une part à chacun",
      "oui, si le total est grand",
      "oui, toujours",
      "on ne peut pas savoir",
    ],
    expected: ["non, sinon on pourrait encore donner une part à chacun"],
    comparator: "mcq_exact",
    hint: "S'il reste 5 billes pour 4 enfants, le partage est-il fini ?",
    explanation: exp(
      "Le reste est toujours plus petit que le nombre de parts : sinon le partage n'est pas terminé.",
      "On vérifie si l'on peut encore donner une unité à chacun.",
      "S'il reste 5 billes à partager entre 4 enfants, on peut encore en donner une à chacun : le reste tombe alors à 1. Un reste de 5 pour 4 parts signale qu'on s'est arrêté trop tôt.",
      "Non, le reste est toujours plus petit que le nombre de parts.",
    ),
    tags: ["ce2", "division", "reste", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_division_reste_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le plus grand résultat de la table qui ne dépasse pas le total.",
    tags: ["ce2", "division", "reste", "template"],
    generate: () => {
      const parts = randomInt(3, 9);
      const chacun = randomInt(2, 9);
      const reste = randomInt(1, parts - 1);
      const total = parts * chacun + reste;
      const question = randomChoice(["chacun", "reste"]);
      return {
        text: `On partage ${total} billes entre ${parts} enfants, à parts égales. ${question === "chacun" ? "Combien de billes reçoit chaque enfant ?" : "Combien de billes reste-t-il ?"}`,
        format: "short",
        expected: [String(question === "chacun" ? chacun : reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand le partage ne tombe pas juste, ce qui n'a pas pu être distribué s'appelle le reste.",
          "On cherche dans la table le plus grand produit qui ne dépasse pas le total, puis on soustrait.",
          `${parts} × ${chacun} = ${parts * chacun}, et ${parts} × ${chacun + 1} = ${parts * (chacun + 1)}, ce qui dépasse ${total}. Chacun reçoit donc ${chacun} billes, et ${total} - ${parts * chacun} = ${reste}.`,
          question === "chacun"
            ? `Chaque enfant reçoit ${chacun} billes.`
            : `Il reste ${reste} billes.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_division_reste_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_reste",
    difficulty: 5,
    theme: "neutral",
    hint: "Le reste ne peut pas rester dehors : il lui faut un contenant de plus.",
    tags: ["ce2", "division", "reste", "piege", "template"],
    generate: () => {
      const parPaquet = randomInt(4, 9);
      const pleins = randomInt(2, 7);
      const reste = randomInt(1, parPaquet - 1);
      const total = parPaquet * pleins + reste;
      const contexte = randomChoice([
        { quoi: "élèves", contenant: "voitures", verbe: "emmène" },
        { quoi: "livres", contenant: "cartons", verbe: "contient" },
        { quoi: "gâteaux", contenant: "boîtes", verbe: "contient" },
      ]);
      return {
        text: `${total} ${contexte.quoi} à transporter. Chaque ${contexte.contenant.replace(/s$/, "")} ${contexte.verbe} ${parPaquet} ${contexte.quoi}. Combien de ${contexte.contenant} faut-il ?`,
        format: "short",
        expected: [String(pleins + 1)],
        comparator: "number_equal",
        explanation: exp(
          "Quand le reste ne peut pas être abandonné, il faut un contenant de plus.",
          "On calcule le partage, puis on regarde ce que le reste représente dans l'histoire.",
          `${total} = ${pleins} × ${parPaquet} + ${reste}. ${pleins} ${contexte.contenant} pleins ne suffisent pas : il reste ${reste} ${contexte.quoi}. Il en faut un de plus, même s'il n'est pas plein.`,
          `Il faut ${pleins + 1} ${contexte.contenant}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DIVISION_PROBLEME — la division dans un problème
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_division_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, 48 letchis sont rangés dans des barquettes de 6. Combien de barquettes ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Combien de fois 6 tient-il dans 48 ?",
    explanation: exp(
      "Grouper, c'est chercher combien de paquets on peut faire quand on connaît leur taille.",
      "On récite la table de 6 jusqu'à 48.",
      "6 × 8 = 48, donc on remplit 8 barquettes exactement, sans reste.",
      "Il faut 8 barquettes.",
    ),
    tags: ["ce2", "division", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_division_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Quelle opération faut-il choisir pour partager 42 bonbons entre 7 enfants ?",
    format: "qcm",
    choices: ["Division", "Multiplication", "Addition", "Soustraction"],
    expected: ["Division"],
    comparator: "mcq_exact",
    hint: "On cherche ce que reçoit chacun quand tout le monde a pareil.",
    explanation: exp(
      "Partager une quantité en parts égales, c'est une division.",
      "On repère les mots de l'énoncé : « partager entre », « à parts égales ».",
      "42 partagés entre 7 : on cherche ce que reçoit chacun. Or 7 × 6 = 42, donc chacun reçoit 6 bonbons. La multiplication sert à vérifier, pas à répondre.",
      "C'est une division.",
    ),
    tags: ["ce2", "division", "probleme", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_division_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Récite la table jusqu'au total.",
    tags: ["ce2", "division", "probleme", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { quoi: "letchis", contenant: "barquettes", ou: "au marché forain de Saint-Paul" },
        { quoi: "samoussas", contenant: "sachets", ou: "au snack du Tampon" },
        { quoi: "cahiers", contenant: "paquets", ou: "à la coopérative de l'école" },
      ]);
      const parPaquet = randomInt(3, 9);
      const paquets = randomInt(3, 9);
      const total = parPaquet * paquets;
      return {
        text: `${contexte.ou.charAt(0).toUpperCase() + contexte.ou.slice(1)}, ${total} ${contexte.quoi} sont rangés dans des ${contexte.contenant} de ${parPaquet}. Combien de ${contexte.contenant} ?`,
        format: "short",
        expected: [String(paquets)],
        comparator: "number_equal",
        explanation: exp(
          "Grouper, c'est chercher combien de paquets on peut faire quand on connaît leur taille.",
          `On récite la table de ${parPaquet} jusqu'à ${total}.`,
          `${parPaquet} × ${paquets} = ${total}, donc on remplit ${paquets} ${contexte.contenant} exactement.`,
          `Il faut ${paquets} ${contexte.contenant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_division_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Repère les mots de l'énoncé : partage, ou réunion ?",
    tags: ["ce2", "division", "probleme", "template"],
    generate: () => {
      const parts = randomInt(3, 8);
      const chacun = randomInt(3, 9);
      const total = parts * chacun;
      const estDivision = randomChoice([true, false]);
      return {
        text: estDivision
          ? `Quelle opération faut-il choisir pour partager ${total} images entre ${parts} enfants ?`
          : `Quelle opération faut-il choisir pour savoir combien d'images ont ${parts} enfants qui en possèdent ${chacun} chacun ?`,
        format: "qcm",
        choices: shuffle(["Division", "Multiplication", "Addition", "Soustraction"]),
        expected: [estDivision ? "Division" : "Multiplication"],
        comparator: "mcq_exact",
        explanation: exp(
          estDivision
            ? "Partager une quantité en parts égales, c'est une division."
            : "Réunir plusieurs parts toutes égales, c'est une multiplication.",
          "On repère les mots de l'énoncé : « partager entre » annonce une division, « chacun a » annonce une multiplication.",
          estDivision
            ? `${total} partagés entre ${parts} : on cherche ce que reçoit chacun, soit ${chacun} images.`
            : `${parts} enfants qui ont ${chacun} images chacun : on réunit ${parts} paquets de ${chacun}, soit ${total} images.`,
          estDivision ? "C'est une division." : "C'est une multiplication.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_DIVISION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_division_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "On a 30 gâteaux et des boîtes de 4. On veut ne remplir que des boîtes COMPLÈTES. Combien de boîtes, et combien de gâteaux restent dehors ?",
    format: "qcm",
    choices: [
      "7 boîtes, 2 gâteaux restent",
      "8 boîtes, 0 gâteau reste",
      "7 boîtes, 4 gâteaux restent",
      "6 boîtes, 6 gâteaux restent",
    ],
    expected: ["7 boîtes, 2 gâteaux restent"],
    comparator: "mcq_exact",
    hint: "Cette fois, le reste n'a pas droit à une boîte : elle serait incomplète.",
    explanation: exp(
      "Selon la question posée, le reste donne un groupe de plus… ou reste dehors.",
      "On calcule le partage, puis on relit la question pour savoir quoi faire du reste.",
      "30 = 7 × 4 + 2. Sept boîtes sont complètes et il reste 2 gâteaux. Comme on ne veut que des boîtes pleines, ces 2 gâteaux restent dehors — c'est l'inverse des voitures de la sortie scolaire.",
      "7 boîtes complètes, et 2 gâteaux restent.",
    ),
    tags: ["ce2", "division", "defi", "reste", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_division_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Une classe de 24 élèves se met en rangs de 4. Puis la maîtresse demande des rangs de 6. Y a-t-il plus de rangs, ou moins ?",
    format: "qcm",
    choices: [
      "moins de rangs, car ils sont plus grands",
      "plus de rangs, car 6 est plus grand que 4",
      "le même nombre de rangs",
      "on ne peut pas savoir",
    ],
    expected: ["moins de rangs, car ils sont plus grands"],
    comparator: "mcq_exact",
    hint: "Plus les paquets sont gros, moins il en faut.",
    explanation: exp(
      "Quand le total ne change pas, agrandir les paquets diminue leur nombre.",
      "On calcule les deux groupements et on compare.",
      "24 ÷ 4 = 6 rangs de 4. Et 24 ÷ 6 = 4 rangs de 6. On passe de 6 rangs à 4 rangs : il y en a moins, parce que chacun contient plus d'élèves.",
      "Il y a moins de rangs.",
    ),
    tags: ["ce2", "division", "defi", "reunion", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_division_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : le total d'abord, le partage ensuite.",
    tags: ["ce2", "division", "defi", "deux_etapes", "template"],
    generate: () => {
      // On construit le total à partir des boîtes, puis on ne choisit le nombre
      // d'enfants que parmi ses diviseurs : le partage tombe toujours juste, et
      // le gabarit n'a jamais à changer de question en cours de route.
      const boites = randomInt(2, 5);
      const parBoite = randomInt(3, 9);
      const total = boites * parBoite;
      const parts = randomChoice(
        [2, 3, 4, 5, 6, 7, 8].filter((p) => total % p === 0 && total / p > 1),
      );
      const chacun = total / parts;
      return {
        text: `${boites} boîtes contiennent chacune ${parBoite} images, soit ${total} images en tout. On les partage entre ${parts} enfants, à parts égales. Combien d'images chacun ?`,
        format: "short",
        expected: [String(chacun)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : le total d'abord, le partage ensuite.",
          "On multiplie pour trouver le total, puis on partage entre les enfants.",
          `${boites} × ${parBoite} = ${total} images. Puis ${total} partagés entre ${parts} : ${parts} × ${chacun} = ${total}, donc ${chacun} par enfant.`,
          `Chacun a ${chacun} images.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_division_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "division",
    microId: "ce2_division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Relis la question : le reste a-t-il droit à un paquet de plus ?",
    tags: ["ce2", "division", "defi", "reste", "piege", "template"],
    generate: () => {
      const parPaquet = randomInt(4, 9);
      const pleins = randomInt(2, 6);
      const reste = randomInt(1, parPaquet - 1);
      const total = parPaquet * pleins + reste;
      const completesSeules = randomChoice([true, false]);
      const bonne = String(completesSeules ? pleins : pleins + 1);
      return {
        text: completesSeules
          ? `On a ${total} gâteaux et des boîtes de ${parPaquet}. On ne veut que des boîtes COMPLÈTES. Combien de boîtes remplit-on ?`
          : `${total} élèves partent en sortie. Chaque voiture emmène ${parPaquet} élèves. Combien de voitures faut-il ?`,
        format: "short",
        expected: [bonne],
        comparator: "number_equal",
        explanation: exp(
          "Selon la question posée, le reste donne un groupe de plus… ou reste dehors.",
          "On calcule le partage, puis on relit la question pour savoir quoi faire du reste.",
          completesSeules
            ? `${total} = ${pleins} × ${parPaquet} + ${reste}. On remplit ${pleins} boîtes complètes, et les ${reste} gâteaux qui restent ne suffisent pas à en faire une de plus.`
            : `${total} = ${pleins} × ${parPaquet} + ${reste}. ${pleins} voitures emmènent ${pleins * parPaquet} élèves, et il en reste ${reste} : il faut une voiture de plus, même si elle n'est pas pleine.`,
          completesSeules ? `On remplit ${pleins} boîtes.` : `Il faut ${pleins + 1} voitures.`,
        ),
      };
    },
  },
];
