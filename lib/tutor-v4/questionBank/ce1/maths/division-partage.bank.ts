// lib/tutor-v4/questionBank/ce1/maths/division-partage.bank.ts
//
// Les partages et les groupements du CE1, écrits à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2). ⚠️ La
// division n'est PAS une opération du CE1 : elle n'apparaît pas dans les
// quatre opérations. Mais le partage équitable et le groupement sont des
// STRUCTURES DE PROBLÈME nommées par le programme, dans les problèmes
// multiplicatifs en une étape :
//   — chercher le NOMBRE DE PARTS à partir du total et de la valeur d'une
//     part : « Un fermier a 75 œufs à vendre au marché. Il les vend par boites
//     de 6. Combien de boites va-t-il pouvoir vendre ? » ;
//   — chercher la VALEUR D'UNE PART : « Trois enfants se partagent
//     18 images » ;
//   — et, dans ces situations, un RESTE qu'il faut interpréter.
// On ne pose donc aucune division : on distribue, on groupe, on compte.
//
// LE PIÈGE DE LA NOTION : le reste qu'on jette. 26 élèves, des voitures de
// 5 places : 5 voitures ne suffisent pas, il en faut 6 — la sixième ne
// transporte qu'un enfant, mais on ne le laisse pas à l'école. Selon
// l'histoire, le reste s'arrondit vers le haut ou se laisse de côté.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas.

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

export const divisionPartageBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DIVISION_PARTAGE — chercher la valeur d'une part
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_partage_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_partage",
    difficulty: 3,
    theme: "neutral",
    text: "Trois enfants se partagent 18 images. Tous doivent avoir le même nombre d'images. Combien chaque enfant en aura-t-il ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Distribue les images une à une, à tour de rôle.",
    explanation: exp(
      "Partager équitablement, c'est donner autant à chacun, sans favoriser personne.",
      "On distribue les objets un par un, à tour de rôle, jusqu'à ce qu'il n'en reste plus.",
      "18 images pour 3 enfants : chacun en reçoit 6, car 3 × 6 = 18.",
      "Chaque enfant aura 6 images.",
    ),
    tags: ["ce1", "division_partage", "partage"],
  },
  {
    kind: "fixed",
    id: "ce1_division_partage_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_partage",
    difficulty: 4,
    theme: "neutral",
    text: "Enzo veut partager 9 € entre ses deux sœurs et lui, à parts égales. Combien chacun recevra-t-il ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Attention : Enzo se compte aussi.",
    explanation: exp(
      "Partager équitablement, c'est donner la même somme à chacun.",
      "On compte d'abord combien de personnes se partagent, en n'oubliant personne.",
      "Enzo et ses deux sœurs font 3 personnes. 9 € pour 3 personnes : 3 € chacun, car 3 × 3 = 9.",
      "Chacun recevra 3 €.",
    ),
    tags: ["ce1", "division_partage", "partage", "piege"],
  },
  {
    kind: "template",
    id: "ce1_division_partage_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_partage",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche le nombre qui, répété autant de fois qu'il y a d'enfants, donne le total.",
    tags: ["ce1", "division_partage", "partage", "template"],
    generate: () => {
      const enfants = randomInt(2, 6);
      const chacun = randomInt(3, 12);
      const total = enfants * chacun;
      const objet = randomChoice(["billes", "bonbons", "images", "crayons", "letchis"]);
      return {
        text: `${enfants} enfants se partagent ${total} ${objet}, à parts égales. Combien chacun en reçoit-il ?`,
        format: "short",
        expected: [String(chacun)],
        comparator: "number_equal",
        explanation: exp(
          "Partager équitablement, c'est donner autant à chacun.",
          "On cherche le nombre qui, répété autant de fois qu'il y a d'enfants, redonne le total.",
          `${enfants} × ${chacun} = ${total} : chaque enfant reçoit ${chacun} ${objet}.`,
          `Chacun en reçoit ${chacun}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DIVISION_GROUPEMENT — chercher le nombre de parts
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_groupement_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_groupement",
    difficulty: 4,
    theme: "neutral",
    text: "Je veux ranger 180 photos dans un album. Je peux ranger 10 photos par page. Combien de pages me faut-il ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Combien de fois 10 tient-il dans 180 ?",
    explanation: exp(
      "Grouper, c'est faire des paquets de taille connue et compter les paquets.",
      "On cherche combien de fois le contenu d'une page tient dans le total.",
      "10 × 18 = 180 : il faut 18 pages pour ranger toutes les photos.",
      "Il me faut 18 pages.",
    ),
    tags: ["ce1", "division_partage", "groupement"],
  },
  {
    kind: "template",
    id: "ce1_division_groupement_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_groupement",
    difficulty: 4,
    theme: "reunion",
    hint: "Compte combien de paquets on peut faire.",
    tags: ["ce1", "division_partage", "groupement", "reunion", "template"],
    generate: () => {
      const parPaquet = randomChoice([2, 5, 10] as const);
      const paquets = randomInt(4, 15);
      const total = parPaquet * paquets;
      const contexte = randomChoice([
        { objet: "letchis", contenant: "barquettes" },
        { objet: "samoussas", contenant: "sachets" },
        { objet: "mangues", contenant: "cagettes" },
      ]);
      return {
        text: `Un marchand a ${total} ${contexte.objet}. Il les range par ${contexte.contenant} de ${parPaquet}. Combien de ${contexte.contenant} remplit-il ?`,
        format: "short",
        expected: [String(paquets)],
        comparator: "number_equal",
        explanation: exp(
          "Grouper, c'est faire des paquets de taille connue et compter les paquets.",
          "On cherche combien de fois le contenu d'un paquet tient dans le total.",
          `${parPaquet} × ${paquets} = ${total} : il remplit ${paquets} ${contexte.contenant}.`,
          `Il remplit ${paquets} ${contexte.contenant}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DIVISION_RESTE — le reste, et ce qu'on en fait
     LE piège : le reste qu'on jette alors qu'il compte.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_reste_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 4,
    theme: "neutral",
    text: "Un fermier a 75 œufs. Il les vend par boites de 6. Combien de boites PLEINES peut-il vendre ?",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Fais des paquets de 6 jusqu'à ne plus pouvoir en remplir un entier.",
    explanation: exp(
      "Quand on groupe, il reste parfois des objets qui ne suffisent pas à faire un paquet de plus.",
      "On compte les paquets pleins, puis on regarde ce qui reste.",
      "6 × 12 = 72. Il reste 75 - 72 = 3 œufs, pas assez pour une treizième boite. Il vend donc 12 boites pleines.",
      "Il peut vendre 12 boites pleines.",
    ),
    tags: ["ce1", "division_partage", "reste"],
  },
  {
    kind: "fixed",
    id: "ce1_division_reste_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 5,
    theme: "reunion",
    text: "26 élèves partent en sortie. Chaque voiture transporte 5 élèves. Combien faut-il de voitures pour que TOUS partent ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cinq voitures suffisent-elles vraiment pour tout le monde ?",
    explanation: exp(
      "Quand on groupe, le reste change la réponse selon la question posée.",
      "On compte les voitures pleines, puis on se demande ce qu'on fait de ceux qui restent.",
      "5 × 5 = 25 : cinq voitures emmènent 25 élèves. Il reste 1 élève. On ne le laisse pas à l'école : il faut une sixième voiture.",
      "Il faut 6 voitures.",
    ),
    tags: ["ce1", "division_partage", "reste", "piege", "reunion"],
  },
  {
    kind: "template",
    id: "ce1_division_reste_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte ce qui reste après les paquets pleins.",
    tags: ["ce1", "division_partage", "reste", "template"],
    generate: () => {
      const parPaquet = randomChoice([3, 4, 5, 6] as const);
      const paquets = randomInt(3, 12);
      const reste = randomInt(1, parPaquet - 1);
      const total = parPaquet * paquets + reste;
      const objet = randomChoice(["billes", "gâteaux", "images", "œufs"]);
      const contenant = randomChoice(["boites", "sachets", "paquets"]);
      return {
        text: `On range ${total} ${objet} dans des ${contenant} de ${parPaquet}. Combien de ${objet} restent en dehors des ${contenant} pleins ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Quand on groupe, il reste parfois des objets qui ne suffisent pas à remplir un paquet de plus.",
          "On compte les paquets pleins, puis on enlève ce qu'ils contiennent au total.",
          `${parPaquet} × ${paquets} = ${parPaquet * paquets}. Il reste ${total} - ${parPaquet * paquets} = ${reste} ${objet}, pas assez pour un paquet de plus.`,
          `Il reste ${reste} ${objet}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_division_reste_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_reste",
    difficulty: 5,
    theme: "neutral",
    hint: "Ceux qui restent doivent partir aussi.",
    tags: ["ce1", "division_partage", "reste", "piege", "template"],
    generate: () => {
      const parVehicule = randomChoice([4, 5, 6, 8] as const);
      const pleins = randomInt(3, 9);
      const reste = randomInt(1, parVehicule - 1);
      const total = parVehicule * pleins + reste;
      const contexte = randomChoice([
        { qui: "élèves", quoi: "voitures", verbe: "transporte" },
        { qui: "enfants", quoi: "barques", verbe: "emmène" },
        { qui: "joueurs", quoi: "minibus", verbe: "transporte" },
      ]);
      return {
        text: `${total} ${contexte.qui} partent en sortie. Chaque ${contexte.quoi.slice(0, -1)} ${contexte.verbe} ${parVehicule} ${contexte.qui}. Combien faut-il de ${contexte.quoi} pour que tous partent ?`,
        format: "short",
        expected: [String(pleins + 1)],
        comparator: "number_equal",
        explanation: exp(
          "Le reste ne se jette pas : il faut décider ce qu'on en fait, selon l'histoire.",
          "On compte les véhicules pleins, puis on ajoute un véhicule pour ceux qui restent.",
          `${parVehicule} × ${pleins} = ${parVehicule * pleins}. Il reste ${reste} ${contexte.qui} : il faut un ${contexte.quoi.slice(0, -1)} de plus, donc ${pleins + 1} en tout.`,
          `Il faut ${pleins + 1} ${contexte.quoi}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DIVISION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_division_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Dans l'école, il y a 200 élèves. On veut faire 40 équipes qui ont toutes le même nombre d'élèves. Combien y aura-t-il d'élèves par équipe ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui, répété 40 fois, fait 200.",
    explanation: exp(
      "Chercher la valeur d'une part, c'est partager équitablement le total entre toutes les parts.",
      "On cherche le nombre qui, répété autant de fois qu'il y a d'équipes, redonne le total.",
      "40 × 5 = 200 : chaque équipe compte 5 élèves.",
      "Il y aura 5 élèves par équipe.",
    ),
    tags: ["ce1", "division_partage", "defi"],
  },
  {
    kind: "template",
    id: "ce1_division_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : partage d'abord, compare ensuite.",
    tags: ["ce1", "division_partage", "defi", "template"],
    generate: () => {
      const enfants = randomInt(3, 6);
      const chacun = randomInt(4, 10);
      const total = enfants * chacun;
      const enPlus = randomInt(1, 6);
      return {
        text: `${total} images sont partagées entre ${enfants} enfants, à parts égales. Puis chaque enfant en reçoit ${enPlus} de plus. Combien chaque enfant a-t-il d'images à la fin ?`,
        format: "short",
        expected: [String(chacun + enPlus)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre où les choses se passent.",
          "On partage d'abord, on ajoute ensuite.",
          `${total} images pour ${enfants} enfants : chacun en reçoit ${chacun}, car ${enfants} × ${chacun} = ${total}. Puis ${chacun} + ${enPlus} = ${chacun + enPlus}.`,
          `Chaque enfant a ${chacun + enPlus} images.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_division_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "division_partage",
    microId: "ce1_division_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le partage tombe-t-il juste ?",
    tags: ["ce1", "division_partage", "defi", "piege", "template"],
    generate: () => {
      const enfants = randomChoice([3, 4, 5] as const);
      const chacun = randomInt(3, 9);
      const juste = randomChoice([true, false]);
      const total = enfants * chacun + (juste ? 0 : randomInt(1, enfants - 1));
      const bonne = juste
        ? "oui, chacun aura le même nombre"
        : "non, il restera des bonbons";
      return {
        text: `${enfants} enfants veulent se partager ${total} bonbons de façon équitable. Le partage tombe-t-il juste ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          juste ? "non, il restera des bonbons" : "oui, chacun aura le même nombre",
          "non, il en manque",
          "on ne peut pas savoir",
          "oui, mais l'un en aura un de plus",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un partage tombe juste quand le total se répartit exactement, sans reste.",
          "On cherche des paquets égaux jusqu'à épuiser le total.",
          juste
            ? `${enfants} × ${chacun} = ${total} : chacun reçoit ${chacun} bonbons et il ne reste rien.`
            : `${enfants} × ${chacun} = ${enfants * chacun}, et il reste ${total - enfants * chacun} bonbon${total - enfants * chacun > 1 ? "s" : ""} : le partage ne tombe pas juste.`,
          bonne.charAt(0).toUpperCase() + bonne.slice(1) + ".",
        ),
      };
    },
  },
];
