// lib/tutor-v4/questionBank/ce2/maths/contenance.bank.ts
//
// Les contenances du CE2, écrites à la main. Troisième et dernière notion de
// mesure à quitter le constructeur commun ce soir, après les longueurs et les
// masses. Elles partagent la même ossature — connaître les unités, les
// relations, comparer, résoudre — et le même piège.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : les unités L, dL et cL, et
// les relations 1 L = 10 dL = 100 cL. Trois interdits :
//   — pas de millilitre au cycle 2 : le programme s'arrête au centilitre ;
//   — pas de tableau de conversion : on passe par les relations connues ;
//   — pas d'écriture à virgule. On écrit « 1 L 50 cL », jamais « 1,5 L ».
//
// LE PIÈGE DE LA NOTION, en deux couches. Celui des nombres d'abord, le même
// qu'en longueurs et en masses : « 75 cL est plus grand que 1 L, parce que 75
// est plus grand que 1. » Et celui du regard ensuite, propre aux liquides :
// une bouteille haute et fine paraît contenir plus qu'un saladier large et
// bas. La forme du récipient ne dit rien de sa contenance.
//
// ⛔ PAS DE CANVAS `contenance` SUR LES COMPARAISONS. La variante
// « comparaison » remplit les bouteilles selon les valeurs et écrit « gauche
// contient plus » : elle donne la réponse avant que l'élève ait converti. Et la
// variante « conversion » affiche « 1 L = 1000 mL », hors programme au CE2. On
// n'utilise donc que la variante « objets », qui se contente de montrer les
// récipients.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts) : un CE2 clique, il ne tape pas.

import type { ContenanceCanvasData, TutorBankItemV4 } from "@/lib/tutor-v4/types";

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

function contenanceCanvas(
  data: Omit<ContenanceCanvasData, "kind">,
): ContenanceCanvasData {
  return { kind: "contenance", ...data };
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const contenanceBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_CONTENANCE_UNITES — connaître L, dL et cL
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_unites_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 1,
    theme: "neutral",
    text: "Que mesure-t-on avec un litre ?",
    format: "qcm",
    choices: [
      "ce qu'un récipient peut contenir",
      "la longueur d'un objet",
      "la masse d'un objet",
      "le temps qui passe",
    ],
    expected: ["ce qu'un récipient peut contenir"],
    comparator: "mcq_exact",
    hint: "Regarde ce qui est écrit sur une bouteille d'eau.",
    explanation: exp(
      "La contenance, c'est la quantité de liquide qu'un récipient peut contenir.",
      "On cherche ce qu'on verse : de l'eau, du jus, du lait.",
      "Une bouteille marquée 1 L peut contenir un litre d'eau. On ne mesure pas une longueur avec un litre : pour cela on prend le mètre.",
      "Le litre mesure ce qu'un récipient peut contenir.",
    ),
    tags: ["ce2", "contenance", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_unites_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 2,
    theme: "neutral",
    text: "Parmi le litre, le décilitre et le centilitre, quelle est la plus PETITE unité ?",
    format: "qcm",
    choices: ["le centilitre", "le décilitre", "le litre", "elles sont pareilles"],
    expected: ["le centilitre"],
    comparator: "mcq_exact",
    hint: "« Centi » annonce cent parts : plus on partage, plus c'est petit.",
    explanation: exp(
      "Les trois unités de contenance du CE2 se rangent ainsi : centilitre, décilitre, litre.",
      "On écoute le début du mot : « déci » veut dire dix, « centi » veut dire cent.",
      "1 L partagé en 10 donne des décilitres, partagé en 100 donne des centilitres. Plus on partage, plus la part est petite : le centilitre est le plus petit.",
      "La plus petite est le centilitre.",
    ),
    tags: ["ce2", "contenance", "unites", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_unites_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 3,
    theme: "reunion",
    text: "Sur une bouteille de sirop, on lit « 75 cL ». Que veut dire cL ?",
    format: "qcm",
    choices: ["centilitre", "centimètre", "centigramme", "kilolitre"],
    expected: ["centilitre"],
    comparator: "mcq_exact",
    hint: "Le L majuscule à la fin annonce toujours des litres.",
    explanation: exp(
      "Le L majuscule à la fin d'une abréviation annonce une contenance.",
      "On lit l'abréviation en deux morceaux : ce qu'il y a devant, puis le L.",
      "« cL » se lit centilitre. Le m de cm annoncerait des mètres, le g de cg des grammes : c'est la dernière lettre qui dit ce qu'on mesure.",
      "cL veut dire centilitre.",
    ),
    tags: ["ce2", "contenance", "unites", "reunion", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_contenance_unites_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 2,
    theme: "neutral",
    hint: "Le L final dit « litre », ce qu'il y a devant dit combien de parts.",
    tags: ["ce2", "contenance", "unites", "template"],
    generate: () => {
      const unites = [
        { abrev: "L", nom: "litre" },
        { abrev: "dL", nom: "décilitre" },
        { abrev: "cL", nom: "centilitre" },
      ] as const;
      const u = randomChoice(unites);
      return {
        text: `Que veut dire l'abréviation « ${u.abrev} » ?`,
        format: "qcm",
        choices: makeChoices(u.nom, [
          ...unites.map((x) => x.nom),
          "centimètre",
          "kilogramme",
        ]),
        expected: [u.nom],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque unité de contenance a une abréviation qui se termine par un L majuscule.",
          "On lit l'abréviation en deux morceaux : le début, puis le L.",
          `« ${u.abrev} » se lit « ${u.nom} ». Le L majuscule annonce toujours qu'on mesure ce qu'un récipient contient.`,
          `« ${u.abrev} » veut dire ${u.nom}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_contenance_unites_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 3,
    theme: "neutral",
    hint: "Range-les dans ta tête : centilitre, décilitre, litre.",
    tags: ["ce2", "contenance", "unites", "template"],
    generate: () => {
      const ordre = ["centilitre", "décilitre", "litre"] as const;
      const [i, j] = shuffle([0, 1, 2]).slice(0, 2).sort((a, b) => a - b);
      const plusGrande = randomChoice([true, false]);
      const bonne = plusGrande ? ordre[j] : ordre[i];
      return {
        text: plusGrande
          ? `Laquelle de ces deux unités est la PLUS GRANDE : le ${ordre[i]} ou le ${ordre[j]} ?`
          : `Laquelle de ces deux unités est la PLUS PETITE : le ${ordre[i]} ou le ${ordre[j]} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          plusGrande ? ordre[i] : ordre[j],
          "elles sont égales",
          "on ne peut pas comparer",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Les unités de contenance se rangent toujours ainsi : centilitre, décilitre, litre.",
          "On place les deux unités dans cette liste et on regarde laquelle vient après.",
          `Le ${ordre[i]} vient avant le ${ordre[j]} : il est donc plus petit. Le litre est la plus grande des trois, car les deux autres viennent de son partage.`,
          `C'est le ${bonne}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_contenance_unites_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_unites",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine le récipient dans ta main, puis choisis l'unité qui va avec.",
    tags: ["ce2", "contenance", "unites", "template", "canvas"],
    generate: () => {
      const objets = [
        { nom: "une bouteille d'eau", icon: "🧴", bonne: "1 L 50 cL", pourquoi: "on la porte à deux mains quand elle est pleine" },
        { nom: "une petite cuillère", icon: "🥄", bonne: "1 cL", pourquoi: "elle tient dans un dé à coudre ou presque" },
        { nom: "un verre", icon: "🥤", bonne: "20 cL", pourquoi: "il faut cinq verres pour faire un litre" },
        { nom: "un seau", icon: "🪣", bonne: "10 L", pourquoi: "on le porte à deux mains, et il pèse lourd" },
        { nom: "une gourde d'école", icon: "🚰", bonne: "50 cL", pourquoi: "c'est un demi-litre, la moitié d'une bouteille" },
      ] as const;
      const o = randomChoice(objets);
      const choices = makeChoices(o.bonne, objets.map((x) => x.bonne));
      return {
        text: `Quelle est la contenance la plus raisonnable pour ${o.nom} ?`,
        format: "qcm",
        choices,
        expected: [o.bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Chaque récipient a son ordre de grandeur : la cuillère se compte en centilitres, le seau en litres.",
          "On imagine le récipient rempli, puis on cherche l'unité qui donne un nombre simple.",
          `Pour ${o.nom}, le repère est simple : ${o.pourquoi}. Cela donne ${o.bonne}.`,
          `${o.nom} contient environ ${o.bonne}.`,
        ),
        // Variante « estimation » : elle montre le récipient SANS sa contenance
        // (showContenances est forcé à false côté canvas) et pose les
        // propositions à côté. Rien n'est vendu à l'avance.
        canvas: contenanceCanvas({
          variant: "estimation",
          objet: { label: o.nom, icon: o.icon },
          choix: choices,
          display: { showLabels: true },
        }),
      };
    },
  },

  /* =========================================================
     CE2_CONTENANCE_RELATIONS — 1 L = 10 dL = 100 cL
     Le micro-intitulé du BO dit exactement cela. Le piège :
     confondre le décilitre et le centilitre.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_relations_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centilitres dans 1 litre ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "« Centi » veut dire cent.",
    explanation: exp(
      "1 litre vaut 100 centilitres.",
      "On écoute le début du mot : « centi » annonce cent.",
      "Un litre partagé en 100 parts égales donne des centilitres. Une bouteille de 100 cL contient donc exactement 1 L.",
      "1 L = 100 cL.",
    ),
    tags: ["ce2", "contenance", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_relations_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 2,
    theme: "neutral",
    text: "Combien y a-t-il de décilitres dans 1 litre ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "« Déci » veut dire dix.",
    explanation: exp(
      "1 litre vaut 10 décilitres.",
      "On écoute le début du mot : « déci » annonce dix.",
      "Un litre partagé en 10 parts égales donne des décilitres. Un décilitre, c'est à peu près un petit verre.",
      "1 L = 10 dL.",
    ),
    tags: ["ce2", "contenance", "relations", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_relations_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève écrit : « 1 L = 10 cL ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, 1 L = 100 cL",
      "oui",
      "non, 1 L = 1000 cL",
      "non, 1 L = 10 L",
    ],
    expected: ["non, 1 L = 100 cL"],
    comparator: "mcq_exact",
    hint: "10 cL, c'est un demi-verre. Un litre en remplit bien plus.",
    explanation: exp(
      "1 litre vaut 100 centilitres, et 10 décilitres.",
      "On vérifie en écoutant le début du mot : « déci » c'est dix, « centi » c'est cent.",
      "Il a confondu les deux : 1 L = 10 dL, mais 1 L = 100 cL. Une bouteille de 75 cL ne fait pas encore un litre, il lui manque 25 cL.",
      "Non : 1 L = 100 cL.",
    ),
    tags: ["ce2", "contenance", "relations", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_contenance_relations_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 2,
    theme: "neutral",
    hint: "Un seul litre en vaut déjà plusieurs petites : multiplie.",
    tags: ["ce2", "contenance", "relations", "template"],
    generate: () => {
      const r = randomChoice([
        { petite: "cL", nomPetite: "centilitres", facteur: 100 },
        { petite: "dL", nomPetite: "décilitres", facteur: 10 },
      ]);
      const n = randomInt(2, 9);
      const total = n * r.facteur;
      return {
        text: `Combien de ${r.nomPetite} font ${n} L ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          `1 litre vaut ${r.facteur} ${r.nomPetite}.`,
          "Pour passer du litre à une plus petite unité, on multiplie : il en faut plus pour la même quantité.",
          `${n} × ${r.facteur} = ${total}. Donc ${n} L = ${total} ${r.petite}.`,
          `${n} L font ${total} ${r.petite}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_contenance_relations_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 3,
    theme: "neutral",
    hint: "Plusieurs petites unités font un seul litre : partage.",
    tags: ["ce2", "contenance", "relations", "template"],
    generate: () => {
      const r = randomChoice([
        { petite: "cL", nomPetite: "centilitres", facteur: 100 },
        { petite: "dL", nomPetite: "décilitres", facteur: 10 },
      ]);
      const n = randomInt(2, 9);
      const total = n * r.facteur;
      return {
        text: `Combien de litres font ${total} ${r.petite} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          `1 litre vaut ${r.facteur} ${r.nomPetite}.`,
          "Pour revenir au litre, on partage : il faut moins de litres pour la même quantité.",
          `${total} ÷ ${r.facteur} = ${n}. Donc ${total} ${r.petite} = ${n} L.`,
          `${total} ${r.petite} font ${n} L.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_contenance_relations_tpl_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_relations",
    difficulty: 4,
    theme: "neutral",
    hint: "Convertis d'abord les litres, puis ajoute les centilitres qui restent.",
    tags: ["ce2", "contenance", "relations", "template"],
    generate: () => {
      const l = randomInt(1, 8);
      const cl = randomInt(1, 19) * 5; // 5, 10, 15… 95 cL : des valeurs d'étiquette
      const total = l * 100 + cl;
      return {
        text: `Un bidon contient ${l} L ${cl} cL. Combien cela fait-il de centilitres ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une contenance écrite en deux unités se convertit en une seule en additionnant.",
          "On transforme d'abord les litres en centilitres, puis on ajoute les centilitres déjà là.",
          `${l} L = ${l * 100} cL. On ajoute les ${cl} cL : ${l * 100} + ${cl} = ${total}.`,
          `Le bidon contient ${total} cL.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONTENANCE_COMPARER — comparer des contenances
     Deux pièges se croisent ici : le nombre (75 cL contre
     1 L) et la forme du récipient (haut et fin contre large
     et bas).
     ⛔ Aucun canvas de comparaison : il pencherait la réponse.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_comparer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 2,
    theme: "neutral",
    text: "Qu'est-ce qui contient le plus : 1 L ou 75 cL ?",
    format: "qcm",
    choices: ["1 L", "75 cL", "c'est pareil", "on ne peut pas savoir"],
    expected: ["1 L"],
    comparator: "mcq_exact",
    hint: "Écris les deux contenances dans la même unité avant de comparer.",
    explanation: exp(
      "On ne compare deux contenances qu'après les avoir écrites dans la même unité.",
      "On choisit la plus petite unité des deux et on convertit.",
      "1 L = 100 cL. Or 100 cL est plus que 75 cL. Le nombre 75 est plus grand que 1, mais il compte des centilitres, pas des litres : il manque 25 cL à la bouteille pour faire un litre.",
      "1 L contient plus que 75 cL.",
    ),
    tags: ["ce2", "contenance", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_comparer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 4,
    theme: "neutral",
    text: "On verse toute l'eau d'une bouteille haute et fine dans un saladier large et bas. Le saladier est presque vide. Y a-t-il moins d'eau qu'avant ?",
    format: "qcm",
    choices: [
      "non, c'est la même quantité d'eau",
      "oui, il y en a moins",
      "oui, il y en a plus",
      "on ne peut pas savoir",
    ],
    expected: ["non, c'est la même quantité d'eau"],
    comparator: "mcq_exact",
    hint: "As-tu enlevé de l'eau en versant ?",
    explanation: exp(
      "Verser un liquide d'un récipient à un autre ne change pas sa quantité.",
      "On se demande si on a ajouté ou enlevé quelque chose pendant le transvasement.",
      "Rien n'a été enlevé : c'est la même eau. Elle paraît moins haute parce que le saladier est large, mais si on la reverse dans la bouteille, elle remonte au même niveau.",
      "Non, c'est exactement la même quantité d'eau.",
    ),
    tags: ["ce2", "contenance", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_comparer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 3,
    theme: "reunion",
    text: "Kevin a une gourde de 5 dL, Malia une bouteille de 75 cL. Qui peut emporter le plus d'eau ?",
    format: "qcm",
    choices: ["Malia", "Kevin", "ils ont la même quantité", "on ne peut pas savoir"],
    expected: ["Malia"],
    comparator: "mcq_exact",
    hint: "Passe les décilitres en centilitres : 1 dL = 10 cL.",
    explanation: exp(
      "On ne compare deux contenances qu'après les avoir écrites dans la même unité.",
      "On convertit tout en centilitres, la plus petite unité des deux.",
      "5 dL = 50 cL, car 1 dL vaut 10 cL. On compare alors 50 cL et 75 cL : Malia emporte 25 cL de plus.",
      "C'est Malia qui peut emporter le plus d'eau.",
    ),
    tags: ["ce2", "contenance", "comparer", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_contenance_comparer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 3,
    theme: "neutral",
    hint: "Même unité d'abord, comparaison ensuite.",
    tags: ["ce2", "contenance", "comparer", "piege", "template"],
    generate: () => {
      // Le nombre en centilitres est TOUJOURS plus grand que celui en litres :
      // c'est ce décalage qui fait tomber les élèves dans le piège.
      const l = randomInt(1, 5);
      const enCl = l * 100;
      const cl = randomChoice([enCl - randomInt(1, 9) * 5, enCl + randomInt(1, 9) * 5]);
      const gagnant = cl > enCl ? `${cl} cL` : `${l} L`;
      return {
        text: `Qu'est-ce qui contient le plus : ${l} L ou ${cl} cL ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          cl > enCl ? `${l} L` : `${cl} cL`,
          "c'est pareil",
          "on ne peut pas savoir",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "On ne compare deux contenances qu'après les avoir écrites dans la même unité.",
          "On convertit les litres en centilitres, car 1 L = 100 cL.",
          `${l} L = ${enCl} cL. On compare alors ${enCl} cL et ${cl} cL : ${cl > enCl ? `${cl} est plus grand que ${enCl}` : `${enCl} est plus grand que ${cl}`}.`,
          `Le plus grand est ${gagnant}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_contenance_comparer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_comparer",
    difficulty: 4,
    theme: "neutral",
    hint: "Écris les trois contenances en centilitres avant de choisir.",
    tags: ["ce2", "contenance", "comparer", "template", "canvas"],
    generate: () => {
      const petitCl = randomInt(4, 15) * 5; // 20 à 75 cL
      const moyenDl = randomInt(9, 15); // 90 à 150 cL
      const grosL = randomInt(2, 5); // 200 à 500 cL
      const items = shuffle([
        { texte: `${petitCl} cL`, cl: petitCl },
        { texte: `${moyenDl} dL`, cl: moyenDl * 10 },
        { texte: `${grosL} L`, cl: grosL * 100 },
      ]);
      const maxCl = Math.max(...items.map((i) => i.cl));
      const gagnant = items.find((i) => i.cl === maxCl)!;
      return {
        text: `Laquelle de ces trois contenances est la PLUS GRANDE : ${items.map((i) => i.texte).join(", ")} ?`,
        format: "qcm",
        choices: makeChoices(gagnant.texte, [
          ...items.filter((i) => i.cl !== maxCl).map((i) => i.texte),
          "elles sont égales",
        ]),
        expected: [gagnant.texte],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer plusieurs contenances, on les écrit toutes dans la même unité.",
          "On choisit le centilitre et on convertit : 1 L = 100 cL, 1 dL = 10 cL.",
          `En centilitres : ${items.map((i) => `${i.texte} = ${i.cl} cL`).join(" ; ")}. Le plus grand nombre est ${maxCl}.`,
          `La plus grande est ${gagnant.texte}.`,
        ),
        // Variante « objets » : elle se contente de montrer les récipients côte
        // à côte, sans les remplir ni désigner le gagnant.
        canvas: contenanceCanvas({
          variant: "objets",
          objets: items.map((i) => ({ label: "Récipient", icon: "🧴", contenance: i.texte })),
          display: { showContenances: true, showLabels: false },
        }),
      };
    },
  },

  /* =========================================================
     CE2_CONTENANCE_PROBLEME — un problème de contenances
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_probleme",
    difficulty: 2,
    theme: "reunion",
    text: "Pour la kermesse de l'école, on prépare du jus de goyavier. On verse 2 L de jus et 50 cL d'eau. Combien de centilitres de boisson en tout ?",
    format: "short",
    expected: ["250"],
    comparator: "number_equal",
    hint: "Passe les litres en centilitres avant d'additionner.",
    explanation: exp(
      "On n'additionne des contenances que si elles sont écrites dans la même unité.",
      "On convertit d'abord, on additionne ensuite.",
      "2 L = 200 cL. Puis 200 + 50 = 250.",
      "Il y a 250 cL de boisson, soit 2 L 50 cL.",
    ),
    tags: ["ce2", "contenance", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un arrosoir contient 5 L. On arrose deux plants avec 80 cL chacun. Combien de centilitres reste-t-il dans l'arrosoir ?",
    format: "short",
    expected: ["340"],
    comparator: "number_equal",
    hint: "Cherche d'abord ce qui a été versé sur les deux plants.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On convertit l'arrosoir en centilitres, on calcule ce qui a été versé, puis on soustrait.",
      "5 L = 500 cL. Les deux plants ont reçu 80 + 80 = 160 cL. Il reste 500 - 160 = 340 cL.",
      "Il reste 340 cL dans l'arrosoir.",
    ),
    tags: ["ce2", "contenance", "probleme", "deux_etapes"],
  },
  {
    kind: "template",
    id: "ce2_contenance_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Même unité d'abord, opération ensuite.",
    tags: ["ce2", "contenance", "probleme", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { qui: "Malia", quoi: "du jus de goyavier", ou: "pour la kermesse" },
        { qui: "Kevin", quoi: "du sirop de canne", ou: "pour la fête de l'école" },
        { qui: "Naïla", quoi: "de l'eau de coco", ou: "pour le pique-nique de la classe" },
      ]);
      const l = randomInt(1, 5);
      const cl = randomInt(1, 19) * 5;
      const total = l * 100 + cl;
      return {
        text: `${contexte.qui} prépare ${contexte.quoi} ${contexte.ou}. Elle verse ${l} L dans un premier bidon et ${cl} cL dans un second. Combien de centilitres en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "On n'additionne des contenances que si elles sont écrites dans la même unité.",
          "On convertit les litres en centilitres, puis on additionne.",
          `${l} L = ${l * 100} cL. Puis ${l * 100} + ${cl} = ${total}.`,
          `Cela fait ${total} cL en tout.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_contenance_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Ce qui reste, c'est le départ moins ce qui a été versé.",
    tags: ["ce2", "contenance", "probleme", "template"],
    generate: () => {
      const l = randomInt(3, 8);
      const departCl = l * 100;
      const verse1 = randomInt(4, 15) * 5;
      const verse2 = randomInt(4, 15) * 5;
      const reste = departCl - verse1 - verse2;
      const recipient = randomChoice(["un arrosoir", "un bidon", "une citerne d'eau de pluie", "une bouteille"]);
      return {
        text: `On a ${recipient} de ${l} L. On verse d'abord ${verse1} cL, puis ${verse2} cL. Combien de centilitres reste-t-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher un reste, c'est enlever au total ce qui a été pris.",
          "On convertit la contenance de départ en centilitres, on additionne ce qui a été versé, puis on soustrait.",
          `${l} L = ${departCl} cL. Les deux versements font ${verse1} + ${verse2} = ${verse1 + verse2} cL. Il reste ${departCl} - ${verse1 + verse2} = ${reste} cL.`,
          `Il reste ${reste} cL.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONTENANCE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_contenance_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves mesurent la même bouteille. Léa écrit 50 cL, Kevin écrit 5 dL, Malia écrit un demi-litre. Qui a raison ?",
    format: "qcm",
    choices: [
      "les trois : c'est la même contenance",
      "Léa seulement",
      "Kevin seulement",
      "Léa et Kevin seulement",
    ],
    expected: ["les trois : c'est la même contenance"],
    comparator: "mcq_exact",
    hint: "Écris les trois contenances en centilitres.",
    explanation: exp(
      "Une même contenance peut s'écrire de plusieurs façons.",
      "On ramène tout à la même unité, ici le centilitre.",
      "5 dL = 50 cL, car 1 dL vaut 10 cL. Et un demi-litre, c'est la moitié de 100 cL, donc 50 cL. Les trois écritures disent la même chose.",
      "Les trois ont raison.",
    ),
    tags: ["ce2", "contenance", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_contenance_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Tu as une bouteille de 1 L. Tu remplis trois verres de 25 cL. Peux-tu encore remplir un quatrième verre de 25 cL ?",
    format: "qcm",
    choices: [
      "oui, tout juste",
      "non, il manque 25 cL",
      "oui, et il en restera encore",
      "non, la bouteille est déjà vide",
    ],
    expected: ["oui, tout juste"],
    comparator: "mcq_exact",
    hint: "Combien font trois verres de 25 cL ? Compare au litre.",
    explanation: exp(
      "Pour savoir si ça rentre, on compare ce qu'on a versé à ce qu'on avait au départ.",
      "On convertit la bouteille en centilitres, puis on compte ce qui a déjà été versé.",
      "1 L = 100 cL. Trois verres font 3 × 25 = 75 cL. Il reste 100 - 75 = 25 cL : exactement de quoi remplir le quatrième.",
      "Oui, tout juste : quatre verres de 25 cL font pile 1 L.",
    ),
    tags: ["ce2", "contenance", "defi", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_contenance_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Compte combien de verres tiennent dans la bouteille.",
    tags: ["ce2", "contenance", "defi", "template"],
    generate: () => {
      const verre = randomChoice([10, 20, 25, 50]);
      const litres = randomInt(2, 6);
      const nb = (litres * 100) / verre;
      const boisson = randomChoice(["d'eau", "de jus", "de sirop dilué", "de thé glacé"]);
      return {
        text: `Un bidon de ${litres} L ${boisson}. Combien de verres de ${verre} cL peut-on remplir ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien de verres tiennent dans un bidon, c'est un groupement.",
          "On écrit d'abord la contenance du bidon dans l'unité des verres, puis on partage.",
          `${litres} L = ${litres * 100} cL. Puis ${litres * 100} ÷ ${verre} = ${nb}.`,
          `On peut remplir ${nb} verres.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_contenance_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "contenance",
    microId: "ce2_contenance_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Cherche d'abord ce que boit la classe entière, puis compare au bidon.",
    tags: ["ce2", "contenance", "defi", "reunion", "template"],
    generate: () => {
      const eleves = randomInt(20, 28);
      const parEleve = randomChoice([10, 20, 25]);
      const totalCl = eleves * parEleve;
      // Toujours au moins un litre de marge : un bidon vidé pile à zéro donne
      // un « il reste 0 cL » qui n'apprend rien et embrouille les propositions.
      const bidonL = Math.ceil(totalCl / 100) + randomInt(1, 2);
      const resteCl = bidonL * 100 - totalCl;
      return {
        text: `Pour la sortie au Piton de la Fournaise, la maîtresse remplit un bidon de ${bidonL} L. Les ${eleves} élèves boivent chacun ${parEleve} cL. Combien de centilitres reste-t-il dans le bidon ?`,
        format: "short",
        expected: [String(resteCl)],
        comparator: "number_equal",
        explanation: exp(
          "Quand chacun prend la même quantité, on multiplie pour obtenir le total bu.",
          "On calcule d'abord ce que boit toute la classe, puis on convertit le bidon en centilitres et on soustrait.",
          `La classe boit ${eleves} × ${parEleve} = ${totalCl} cL. Le bidon contient ${bidonL} L = ${bidonL * 100} cL. Il reste ${bidonL * 100} - ${totalCl} = ${resteCl} cL.`,
          `Il reste ${resteCl} cL.`,
        ),
      };
    },
  },
];
