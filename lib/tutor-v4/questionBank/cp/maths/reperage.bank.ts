// lib/tutor-v4/questionBank/cp/maths/reperage.bank.ts
//
// Le repérage dans l'espace au CP, écrit à la main.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours préparatoire) :
//   — « Les élèves consolident les compétences développées au cycle 1 pour
//     décrire des positions et des déplacements en utilisant différents types
//     de repères, EN SE LIMITANT À L'ESPACE DE LA CLASSE » ;
//   — le vocabulaire est donné mot pour mot : gauche, droite ; sur, sous,
//     entre, devant, derrière, au-dessus, en dessous ;
//   — repérer la position de ses camarades sur un PLAN de la classe, et
//     retrouver un objet caché dont la position est indiquée sur un plan ;
//   — face à trois photographies des mêmes personnages, reconnaitre celle qui
//     correspond à la maquette placée devant soi ;
//   — construire et reproduire des assemblages de cubes et de pavés à partir
//     d'un modèle en trois dimensions ou d'une photo ;
//   — les instructions de déplacement : avancer, reculer, tourner à droite,
//     tourner à gauche, monter, descendre. Et pour un robot sur tapis
//     quadrillé : « avancer d'une case », « pivoter d'un quart de tour à
//     droite », « pivoter d'un quart de tour à gauche » ;
//   — « Les déplacements à programmer comprennent au maximum dix instructions,
//     dont deux virages. »
//   ⛔ AUCUNE COORDONNÉE. Pas de (4 ; 2) au CP : le couple de nombres arrive
//     plus tard. Ici on parle de cases voisines, de plans et de maquettes.
//
// LE PIÈGE DE LA NOTION : la gauche de qui ? Celle de l'élève, ou celle du
// camarade assis en face ? Quand deux personnes se font face, leurs gauches
// sont opposées — et c'est exactement ce que le BO fait travailler avec ses
// trois photographies prises de points de vue différents.
//
// ⛔ Pas de canvas `reperage` ici : il affiche un quadrillage numéroté, et les
// coordonnées ne sont pas au programme du CP. On décrit les déplacements avec
// des mots, comme le BO le demande.
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CP clique, il ne tape pas.

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

export const reperageBank: TutorBankItemV4[] = [
  /* =========================================================
     CP_REPERAGE_VOCABULAIRE — sur, sous, entre, devant, derrière
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_vocabulaire_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_vocabulaire",
    difficulty: 1,
    theme: "neutral",
    text: "La trousse est posée SUR la table. Où est la table par rapport à la trousse ?",
    format: "qcm",
    choices: ["sous la trousse", "sur la trousse", "à côté de la trousse", "devant la trousse"],
    expected: ["sous la trousse"],
    comparator: "mcq_exact",
    hint: "Si l'un est dessus, l'autre est forcément dessous.",
    explanation: exp(
      "« Sur » et « sous » sont deux mots qui vont ensemble : ils décrivent la même situation vue des deux côtés.",
      "On regarde qui est en haut et qui est en bas.",
      "La trousse est en haut, la table en bas. Donc la trousse est sur la table, et la table est sous la trousse.",
      "La table est sous la trousse.",
    ),
    tags: ["cp", "reperage", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_vocabulaire_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_vocabulaire",
    difficulty: 3,
    theme: "neutral",
    text: "Dans la file, Malia est devant Kevin, et Kevin est devant Ryan. Qui est ENTRE les deux autres ?",
    format: "qcm",
    choices: ["Kevin", "Malia", "Ryan", "personne"],
    expected: ["Kevin"],
    comparator: "mcq_exact",
    hint: "Celui du milieu a quelqu'un devant lui et quelqu'un derrière lui.",
    explanation: exp(
      "Être « entre » deux personnes, c'est avoir l'une devant soi et l'autre derrière soi.",
      "On range les trois enfants dans l'ordre de la file, puis on regarde celui du milieu.",
      "L'ordre est : Malia, Kevin, Ryan. Kevin a Malia devant lui et Ryan derrière lui : c'est lui qui est entre les deux.",
      "C'est Kevin.",
    ),
    tags: ["cp", "reperage", "vocabulaire", "qcm"],
  },
  {
    kind: "template",
    id: "cp_reperage_vocabulaire_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_vocabulaire",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque mot de position a son contraire.",
    tags: ["cp", "reperage", "vocabulaire", "template"],
    generate: () => {
      const paires = [
        { mot: "sur", contraire: "sous" },
        { mot: "sous", contraire: "sur" },
        { mot: "devant", contraire: "derrière" },
        { mot: "derrière", contraire: "devant" },
        { mot: "au-dessus", contraire: "en dessous" },
        { mot: "en dessous", contraire: "au-dessus" },
      ] as const;
      const p = randomChoice(paires);
      return {
        text: `Le cahier est ${p.mot} le livre. Où est le livre par rapport au cahier ?`,
        format: "qcm",
        choices: makeChoices(`${p.contraire} le cahier`, [
          `${p.mot} le cahier`,
          "à côté du cahier",
          "entre deux cahiers",
        ]),
        expected: [`${p.contraire} le cahier`],
        comparator: "mcq_exact",
        explanation: exp(
          "Les mots de position vont par paires : quand on échange les deux objets, le mot devient son contraire.",
          "On garde la même situation et on change seulement le point de vue.",
          `Si le cahier est ${p.mot} le livre, alors le livre est ${p.contraire} le cahier. Rien n'a bougé : c'est la façon de le dire qui change.`,
          `Le livre est ${p.contraire} le cahier.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_REPERAGE_GAUCHE_DROITE — LE piège : la gauche de qui ?
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_gauche_droite_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_gauche_droite",
    difficulty: 4,
    theme: "neutral",
    text: "Tu es assis en face de Naïla. Elle lève sa main droite. De quel côté la vois-tu, toi ?",
    format: "qcm",
    choices: ["à ta gauche", "à ta droite", "devant toi", "derrière toi"],
    expected: ["à ta gauche"],
    comparator: "mcq_exact",
    hint: "Vous êtes face à face : vos côtés sont inversés.",
    explanation: exp(
      "La gauche et la droite dépendent de la personne qui regarde.",
      "On se met à la place de l'autre, ou on imagine qu'on se retourne.",
      "Quand deux personnes se font face, elles ne regardent pas dans le même sens : la main droite de Naïla se trouve du côté de ta main gauche. Sa droite à elle, c'est ta gauche à toi.",
      "Tu la vois à ta gauche.",
    ),
    tags: ["cp", "reperage", "gauche_droite", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_gauche_droite_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_gauche_droite",
    difficulty: 2,
    theme: "neutral",
    text: "Tu marches dans le couloir, et un camarade marche juste devant toi, dans le même sens. Il tourne à droite. De quel côté dois-tu tourner pour le suivre ?",
    format: "qcm",
    choices: ["à droite aussi", "à gauche", "tout droit", "en arrière"],
    expected: ["à droite aussi"],
    comparator: "mcq_exact",
    hint: "Vous regardez tous les deux dans la même direction.",
    explanation: exp(
      "Deux personnes tournées dans le même sens ont la même gauche et la même droite.",
      "On vérifie d'abord si l'on regarde dans le même sens que l'autre.",
      "Ici, vous avancez tous les deux dans le même sens : sa droite est aussi ta droite. C'est seulement en se faisant FACE que les côtés s'inversent.",
      "Tu tournes à droite aussi.",
    ),
    tags: ["cp", "reperage", "gauche_droite", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_reperage_gauche_droite_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_gauche_droite",
    difficulty: 4,
    theme: "neutral",
    hint: "Demande-toi d'abord si vous regardez dans le même sens.",
    tags: ["cp", "reperage", "gauche_droite", "piege", "template"],
    generate: () => {
      const faceAFace = randomChoice([true, false]);
      const cote = randomChoice(["droite", "gauche"] as const);
      const autre = cote === "droite" ? "gauche" : "droite";
      const bonne = faceAFace ? `à ta ${autre}` : `à ta ${cote}`;
      const prenom = randomChoice(["Malia", "Kevin", "Naïla", "Ryan", "Léa", "Enzo"]);
      return {
        text: `${prenom} est ${faceAFace ? "assis EN FACE de toi" : "à côté de toi et regarde DANS LE MÊME SENS que toi"}. ${prenom} lève sa main ${cote}. De quel côté la vois-tu, toi ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          faceAFace ? `à ta ${cote}` : `à ta ${autre}`,
          "devant toi",
          "derrière toi",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "La gauche et la droite dépendent du sens dans lequel on regarde.",
          "On se demande si l'autre personne regarde dans le même sens que soi.",
          faceAFace
            ? `Vous êtes face à face : vos côtés sont inversés. Sa main ${cote} se trouve donc du côté de ta main ${autre}.`
            : `Vous regardez dans le même sens : vos côtés sont les mêmes. Sa main ${cote} est donc bien de ton côté ${cote}.`,
          `Tu la vois ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_REPERAGE_QUADRILLAGE — le plan de la classe
     ⛔ Un plan, pas un repère : aucune coordonnée au CP.
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_quadrillage_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_quadrillage",
    difficulty: 2,
    theme: "neutral",
    text: "À quoi sert le plan de la classe ?",
    format: "qcm",
    choices: [
      "à montrer où sont placées les choses, vues de dessus",
      "à mesurer la longueur de la classe",
      "à dessiner joliment la classe",
      "à compter les élèves",
    ],
    expected: ["à montrer où sont placées les choses, vues de dessus"],
    comparator: "mcq_exact",
    hint: "Un plan, c'est comme si on regardait la classe depuis le plafond.",
    explanation: exp(
      "Un plan est une représentation de l'espace vue de dessus : il montre les positions.",
      "On imagine qu'on regarde la pièce depuis le plafond, sans les hauteurs.",
      "Sur un plan de la classe, chaque table, la porte et le tableau ont une place. On peut alors dire où se trouve un objet sans être dans la pièce.",
      "Le plan sert à montrer où sont placées les choses, vues de dessus.",
    ),
    tags: ["cp", "reperage", "plan", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_quadrillage_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_quadrillage",
    difficulty: 4,
    theme: "neutral",
    text: "Sur le plan de la classe, le trésor est caché sous la table qui est juste à côté de la porte, du côté du tableau. Combien de tables faut-il regarder ?",
    format: "qcm",
    choices: ["une seule", "toutes les tables", "deux tables", "aucune"],
    expected: ["une seule"],
    comparator: "mcq_exact",
    hint: "Deux indications ensemble ne laissent qu'une seule possibilité.",
    explanation: exp(
      "Plusieurs indications de position se combinent pour désigner un seul endroit.",
      "On garde d'abord les tables près de la porte, puis parmi elles celle du côté du tableau.",
      "« À côté de la porte » laisse peut-être deux tables. « Du côté du tableau » n'en garde qu'une. Deux indications suffisent souvent : c'est pour cela qu'on les donne ensemble.",
      "Il ne faut regarder qu'une seule table.",
    ),
    tags: ["cp", "reperage", "plan", "qcm"],
  },
  {
    kind: "template",
    id: "cp_reperage_quadrillage_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_quadrillage",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cases une à une, dans la direction indiquée.",
    tags: ["cp", "reperage", "plan", "template"],
    generate: () => {
      const rangees = randomInt(3, 5);
      const place = randomInt(2, rangees);
      const depuis = randomChoice(["du tableau", "de la porte"]);
      return {
        text: `Les tables de la classe sont rangées en ${rangees} rangées. Ta table est dans la rangée juste derrière la ${place - 1}ᵉ en partant ${depuis}. Dans quelle rangée es-tu ?`,
        format: "short",
        expected: [String(place)],
        comparator: "number_equal",
        explanation: exp(
          "Sur un plan, on repère une place en comptant à partir d'un repère connu.",
          "On part du repère donné, puis on avance rangée par rangée.",
          `La rangée juste derrière la ${place - 1}ᵉ est la ${place}ᵉ : on avance d'une rangée, pas plus.`,
          `Tu es dans la rangée ${place}.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_REPERAGE_DEPLACEMENT — décrire un déplacement
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_deplacement_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_deplacement",
    difficulty: 3,
    theme: "neutral",
    text: "Un robot avance de 2 cases, puis avance encore de 3 cases, toujours tout droit. De combien de cases a-t-il avancé en tout ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Il n'a pas tourné : les deux avancées s'ajoutent.",
    explanation: exp(
      "Quand un déplacement se fait dans la même direction, les distances s'additionnent.",
      "On vérifie qu'il n'y a pas de virage, puis on additionne.",
      "2 cases puis 3 cases, sans tourner : 2 + 3 = 5 cases. S'il avait tourné entre les deux, il ne serait pas allé tout droit et on ne pourrait pas additionner comme cela.",
      "Il a avancé de 5 cases.",
    ),
    tags: ["cp", "reperage", "deplacement"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_deplacement_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    text: "Un robot avance de 4 cases, puis recule de 4 cases. Où se trouve-t-il ?",
    format: "qcm",
    choices: [
      "à son point de départ",
      "8 cases plus loin",
      "4 cases plus loin",
      "on ne peut pas savoir",
    ],
    expected: ["à son point de départ"],
    comparator: "mcq_exact",
    hint: "Reculer d'autant qu'on a avancé, cela annule le déplacement.",
    explanation: exp(
      "Avancer et reculer sont deux déplacements contraires.",
      "On suit le robot case par case, dans l'ordre des instructions.",
      "Il avance de 4 cases, puis il refait le même chemin à l'envers : 4 - 4 = 0. Il revient exactement là où il était.",
      "Il est revenu à son point de départ.",
    ),
    tags: ["cp", "reperage", "deplacement", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_reperage_deplacement_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_deplacement",
    difficulty: 4,
    theme: "neutral",
    hint: "Fais le chemin dans ta tête, une instruction après l'autre.",
    tags: ["cp", "reperage", "deplacement", "template"],
    generate: () => {
      const avance = randomInt(3, 8);
      const recule = randomInt(1, avance - 1);
      const reste = avance - recule;
      return {
        text: `Un robot avance de ${avance} cases, puis recule de ${recule} cases. De combien de cases s'est-il éloigné de son départ ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Reculer défait une partie de ce qu'on a avancé.",
          "On avance d'abord, puis on retire ce qu'on a reculé.",
          `${avance} - ${recule} = ${reste}. Le robot se retrouve à ${reste} cases de son départ.`,
          `Il s'est éloigné de ${reste} cases.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_REPERAGE_ASSEMBLAGE — reproduire un tas de cubes
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_assemblage_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_assemblage",
    difficulty: 4,
    theme: "neutral",
    text: "Sur une photo, on voit une tour de cubes. Certains cubes sont cachés derrière les autres. Que faut-il faire pour reproduire la tour exactement ?",
    format: "qcm",
    choices: [
      "regarder la tour sous plusieurs côtés",
      "compter seulement les cubes qu'on voit",
      "prendre le plus de cubes possible",
      "deviner au hasard",
    ],
    expected: ["regarder la tour sous plusieurs côtés"],
    comparator: "mcq_exact",
    hint: "Une seule photo ne montre jamais tout.",
    explanation: exp(
      "Une photo montre un assemblage depuis un seul côté : elle en cache une partie.",
      "On tourne autour du modèle, ou on regarde plusieurs photos prises de côtés différents.",
      "Un cube caché derrière un autre n'apparait sur aucune photo prise de face. En regardant de côté et de derrière, on découvre les cubes manquants.",
      "Il faut regarder la tour sous plusieurs côtés.",
    ),
    tags: ["cp", "reperage", "assemblage", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_reperage_assemblage_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_assemblage",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte les cubes d'un étage, puis multiplie… ou additionne étage par étage.",
    tags: ["cp", "reperage", "assemblage", "template"],
    generate: () => {
      const etages = randomInt(2, 4);
      const parEtage = randomInt(2, 5);
      const total = etages * parEtage;
      return {
        text: `On empile ${etages} étages de ${parEtage} cubes chacun. Combien de cubes faut-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un assemblage régulier se compte étage par étage.",
          "On additionne le nombre de cubes de chaque étage.",
          `${Array.from({ length: etages }, () => parEtage).join(" + ")} = ${total}.`,
          `Il faut ${total} cubes.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cp_reperage_assemblage_tpl_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_assemblage",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte ceux qu'on voit, puis pense à ceux qui sont derrière.",
    tags: ["cp", "reperage", "assemblage", "piege", "template"],
    generate: () => {
      const visibles = randomInt(4, 8);
      const caches = randomInt(1, 3);
      const total = visibles + caches;
      return {
        text: `Sur une photo, on voit ${visibles} cubes. En tournant autour, on découvre ${caches} cubes cachés derrière. Combien de cubes y a-t-il en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un assemblage contient parfois des cubes qu'aucune photo de face ne montre.",
          "On ajoute les cubes cachés à ceux qu'on avait comptés.",
          `${visibles} + ${caches} = ${total}. Compter seulement ce qu'on voit aurait donné ${visibles}, et la copie aurait été fausse.`,
          `Il y a ${total} cubes en tout.`,
        ),
      };
    },
  },

  /* =========================================================
     CP_REPERAGE_DEFI — le point de vue, et le chemin retour
  ========================================================= */
  {
    kind: "fixed",
    id: "cp_reperage_defi_fixed_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Tu es allé à la cantine en tournant à droite au bout du couloir. Pour revenir en classe, de quel côté dois-tu tourner ?",
    format: "qcm",
    choices: ["à gauche", "à droite", "tout droit", "on ne peut pas savoir"],
    expected: ["à gauche"],
    comparator: "mcq_exact",
    hint: "Au retour, tu marches dans l'autre sens.",
    explanation: exp(
      "Pour refaire un chemin à l'envers, chaque virage devient son contraire.",
      "On refait le trajet dans l'autre sens, en inversant la gauche et la droite.",
      "À l'aller, tu as tourné à droite. Au retour, tu marches dans l'autre sens : le même coin se prend à gauche.",
      "Il faut tourner à gauche.",
    ),
    tags: ["cp", "reperage", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "cp_reperage_defi_fixed_2",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un robot pivote d'un quart de tour à droite, puis encore d'un quart de tour à droite. Où regarde-t-il maintenant ?",
    format: "qcm",
    choices: [
      "exactement derrière lui",
      "à sa droite",
      "à sa gauche",
      "devant lui, comme au départ",
    ],
    expected: ["exactement derrière lui"],
    comparator: "mcq_exact",
    hint: "Deux quarts de tour, cela fait un demi-tour.",
    explanation: exp(
      "Un quart de tour fait pivoter d'un coin ; deux quarts de tour du même côté font un demi-tour.",
      "On tourne une première fois, on regarde, puis on tourne une seconde fois.",
      "Après le premier quart de tour, le robot regarde vers sa droite d'avant. Après le second, il a fait la moitié d'un tour complet : il regarde exactement dans la direction opposée à celle du départ.",
      "Il regarde exactement derrière lui.",
    ),
    tags: ["cp", "reperage", "defi", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "cp_reperage_defi_tpl_1",
    niveau: "cp",
    matiere: "maths",
    notionId: "reperage",
    microId: "cp_reperage_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Le BO le dit : un déplacement codé compte au plus dix instructions, dont deux virages.",
    tags: ["cp", "reperage", "defi", "template"],
    generate: () => {
      // ⚠️ Les bornes doivent laisser passer les DEUX réponses : avec quatre à
      // huit avancées et au plus deux virages, le total ne dépassait jamais
      // dix et la bonne réponse était toujours « oui ».
      const avancees = randomInt(5, 10);
      const virages = randomInt(0, 3);
      const total = avancees + virages;
      const trop = total > 10 || virages > 2;
      const bonne = trop ? "non" : "oui";
      return {
        text: `Un programme de robot contient ${avancees} instructions « avancer » et ${virages} virage${virages > 1 ? "s" : ""}. Un programme ne doit pas dépasser 10 instructions au total, dont 2 virages au maximum. Ce programme est-il permis ?`,
        format: "qcm",
        choices: shuffle(["oui", "non"]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un programme de déplacement a une longueur limitée : au plus dix instructions, dont deux virages.",
          "On compte toutes les instructions, virages compris, puis on vérifie les deux règles.",
          `${avancees} + ${virages} = ${total} instructions, dont ${virages} virage${virages > 1 ? "s" : ""}. ${
            total > 10 && virages > 2
              ? `${total} dépasse 10, et ${virages} virages dépassent 2 : les deux règles sont brisées.`
              : total > 10
                ? `${total} dépasse 10 : le programme est trop long.`
                : virages > 2
                  ? `Le total tient dans 10, mais ${virages} virages dépassent les 2 permis.`
                  : `${total} ne dépasse pas 10, et ${virages} ne dépasse pas 2 : les deux règles sont respectées.`
          }`,
          trop ? "Non, ce programme est trop long." : "Oui, ce programme est permis.",
        ),
      };
    },
  },
];
