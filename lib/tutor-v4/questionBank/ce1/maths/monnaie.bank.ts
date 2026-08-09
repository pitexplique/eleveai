// lib/tutor-v4/questionBank/ce1/maths/monnaie.bank.ts
//
// La monnaie du CE1, écrite à la main. C'est la notion que le constructeur
// commun servait le plus mal : mesuré le 09/08/2026, « Constituer une somme en
// euros » recevait « Un ruban mesure 61 cm. On ajoute 21 cm. Quelle est sa
// nouvelle longueur ? ».
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, tableau CE1) — six attendus, et ils
// vont plus loin qu'on ne croit pour un CE1 :
//   — connaître le lien entre les euros et les centimes ;
//   — déterminer la valeur d'un ensemble de pièces et de billets ;
//   — comparer les valeurs de deux ensembles ;
//   — constituer une somme donnée avec des euros ET des centimes ;
//   — simuler un achat, rendre la monnaie ;
//   — connaître le SENS DE L'ÉCRITURE À VIRGULE d'une somme d'argent.
// 📅 Jalon du programme : « Les centimes d'euro sont introduits au plus tard en
// période 2. » Avant, on reste aux euros entiers.
//
// LE PIÈGE DE LA NOTION, celui qui coûte le plus cher plus tard : écrire
// « 4 euros et 5 centimes » 4,5 € au lieu de 4,05 €. Le chiffre des centimes
// occupe DEUX places, comme les dizaines et les unités d'un nombre. Il revient
// dans l'écriture à virgule, dans constituer, et dans les défis.
//
// ⚠️ La virgule est réservée à la monnaie. Les longueurs et les masses
// s'écrivent « 2 m 50 cm », jamais « 2,50 m ».
//
// ⚠️ PAS DE QUESTION À RÉDIGER : `applyMathsKeyboardFree` retire les items
// `format: "open"`. Un CE1 clique, il ne tape pas. Les réponses en euros sont
// donc écrites en `qcm` quand elles portent une virgule — un nombre à virgule
// ne se convertit pas proprement en propositions cliquables.

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

/** Écriture à virgule d'une somme : les centimes occupent TOUJOURS deux places. */
function euros(e: number, c: number) {
  return `${e},${String(c).padStart(2, "0")} €`;
}

/** Les pièces et les billets qu'un CE1 manipule en classe. */
const PIECES_EUROS = [1, 2] as const;
const BILLETS = [5, 10, 20, 50] as const;
const PIECES_CENTIMES = [1, 2, 5, 10, 20, 50] as const;

export const monnaieBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_MONNAIE_EUROS_CENTIMES — 1 € = 100 centimes
     Tout le reste de la notion s'appuie là-dessus, y compris
     l'écriture à virgule.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_euros_centimes_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimes dans 1 euro ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "C'est le même nombre que de centimètres dans un mètre.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On se rappelle du mot : « centime » commence comme « cent ».",
      "Il faut 100 pièces de 1 centime pour faire 1 euro. C'est le même « centi » que dans centimètre : 100 centimètres font 1 mètre.",
      "1 € = 100 centimes.",
    ),
    tags: ["ce1", "monnaie", "centimes", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_euros_centimes_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 2,
    theme: "neutral",
    text: "Combien faut-il de pièces de 50 centimes pour faire 1 euro ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "50 centimes, c'est la moitié d'un euro.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On cherche combien de fois 50 tient dans 100.",
      "50 + 50 = 100. Deux pièces de 50 centimes font donc 1 euro : chacune est une moitié d'euro.",
      "Il faut 2 pièces.",
    ),
    tags: ["ce1", "monnaie", "centimes", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_euros_centimes_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 3,
    theme: "neutral",
    text: "Un élève dit : « 10 pièces de 10 centimes, ça fait 10 euros ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, cela fait 1 euro",
      "oui",
      "non, cela fait 100 euros",
      "non, cela fait 10 centimes",
    ],
    expected: ["non, cela fait 1 euro"],
    comparator: "mcq_exact",
    hint: "Compte les centimes d'abord : 10 fois 10 centimes.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On compte d'abord tout en centimes, puis on regarde si on atteint 100.",
      "10 pièces de 10 centimes font 100 centimes. Et 100 centimes, c'est 1 euro, pas 10 euros : il a gardé le nombre de pièces au lieu de compter la valeur.",
      "Non : cela fait 1 euro.",
    ),
    tags: ["ce1", "monnaie", "centimes", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_euros_centimes_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 3,
    theme: "neutral",
    hint: "Combien de fois la pièce tient-elle dans 100 centimes ?",
    tags: ["ce1", "monnaie", "centimes", "template"],
    generate: () => {
      const piece = randomChoice([1, 2, 5, 10, 20, 50] as const);
      const nb = 100 / piece;
      return {
        text: `Combien faut-il de pièces de ${piece} centime${piece > 1 ? "s" : ""} pour faire 1 euro ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "1 euro vaut 100 centimes.",
          "On cherche combien de fois la pièce tient dans 100 centimes.",
          `${piece} tient ${nb} fois dans 100. Il faut donc ${nb} pièces de ${piece} centime${piece > 1 ? "s" : ""}.`,
          `Il en faut ${nb}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_euros_centimes_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_euros_centimes",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque euro vaut 100 centimes : compte les centaines.",
    tags: ["ce1", "monnaie", "centimes", "template"],
    generate: () => {
      const e = randomInt(2, 9);
      const c = e * 100;
      return {
        text: `Combien de centimes valent ${e} euros ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: exp(
          "1 euro vaut 100 centimes.",
          "Pour passer des euros aux centimes, on compte 100 centimes par euro.",
          `${e} × 100 = ${c}. Donc ${e} € valent ${c} centimes.`,
          `${e} euros valent ${c} centimes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_VIRGULE — le sens de l'écriture à virgule
     LE piège de la notion : « 4 euros et 5 centimes » écrit
     4,5 € au lieu de 4,05 €. Les centimes tiennent DEUX places.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_virgule_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 3,
    theme: "neutral",
    text: "Comment écrit-on « 4 euros et 5 centimes » avec une virgule ?",
    format: "qcm",
    choices: ["4,05 €", "4,5 €", "4,50 €", "45 €"],
    expected: ["4,05 €"],
    comparator: "mcq_exact",
    hint: "Après la virgule, il y a toujours DEUX chiffres : les dizaines de centimes, puis les centimes.",
    explanation: exp(
      "Dans une somme d'argent, les deux chiffres après la virgule sont les centimes.",
      "On écrit les euros devant la virgule, puis les centimes derrière, sur deux places.",
      "5 centimes, c'est zéro dizaine de centimes et 5 centimes : on écrit 05. Cela donne 4,05 €. Écrire 4,5 € voudrait dire 50 centimes, dix fois plus.",
      "On écrit 4,05 €.",
    ),
    tags: ["ce1", "monnaie", "virgule", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_virgule_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 2,
    theme: "neutral",
    text: "Sur l'étiquette d'un pain, il est écrit 1,20 €. Combien cela fait-il de centimes en plus de l'euro ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "Ce qui est écrit après la virgule, ce sont les centimes.",
    explanation: exp(
      "Dans une somme d'argent, ce qui est écrit après la virgule compte les centimes.",
      "On sépare : devant la virgule les euros, derrière les centimes.",
      "1,20 € se lit « 1 euro et 20 centimes ». Le 1 est devant la virgule, le 20 derrière.",
      "Il y a 20 centimes en plus de l'euro.",
    ),
    tags: ["ce1", "monnaie", "virgule"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_virgule_fixed_3",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 4,
    theme: "neutral",
    text: "Qu'est-ce qui coûte le plus cher : 3,07 € ou 3,7 € ?",
    format: "qcm",
    choices: ["3,7 €", "3,07 €", "c'est le même prix", "on ne peut pas savoir"],
    expected: ["3,7 €"],
    comparator: "mcq_exact",
    hint: "Compte les centimes de chaque prix : 07, c'est sept centimes.",
    explanation: exp(
      "Après la virgule, le premier chiffre compte les dizaines de centimes, le second les centimes.",
      "On lit chaque prix en euros et en centimes avant de comparer.",
      "3,07 € fait 3 euros et 7 centimes. 3,7 € fait 3 euros et 70 centimes. 70 centimes, c'est dix fois plus que 7 centimes.",
      "3,7 € coûte plus cher.",
    ),
    tags: ["ce1", "monnaie", "virgule", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_virgule_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 4,
    theme: "neutral",
    hint: "Moins de 10 centimes : il faut un zéro juste après la virgule.",
    tags: ["ce1", "monnaie", "virgule", "piege", "template"],
    generate: () => {
      // Centimes à un seul chiffre : c'est là que l'élève oublie le zéro.
      const c = randomInt(1, 9);
      let e = randomInt(1, 9);
      // Le piège « chiffres inversés » ne doit pas tomber sur la bonne réponse.
      if (e === c) e = (e % 9) + 1;
      const bonne = euros(e, c);
      return {
        text: `Comment écrit-on « ${e} euros et ${c} centimes » avec une virgule ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${e},${c} €`,
          `${e},${c}0 €`,
          euros(c, e),
          euros(e + 1, c),
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une somme d'argent, les deux chiffres après la virgule comptent les centimes.",
          "On écrit les euros devant la virgule, puis les centimes derrière, sur deux places.",
          `${c} centimes, c'est zéro dizaine de centimes et ${c} centimes : on écrit 0${c}. Écrire ${e},${c} € voudrait dire ${c}0 centimes, dix fois plus.`,
          `On écrit ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_virgule_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_virgule",
    difficulty: 3,
    theme: "neutral",
    hint: "Devant la virgule les euros, derrière les centimes.",
    tags: ["ce1", "monnaie", "virgule", "template"],
    generate: () => {
      const e = randomInt(1, 9);
      const c = randomInt(10, 95);
      return {
        text: `Le prix affiché est ${euros(e, c)}. Combien y a-t-il de centimes en plus des ${e} euros ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une somme d'argent, ce qui est écrit après la virgule compte les centimes.",
          "On sépare l'écriture en deux : devant la virgule les euros, derrière les centimes.",
          `${euros(e, c)} se lit « ${e} euros et ${c} centimes ». Le nombre après la virgule est ${c}.`,
          `Il y a ${c} centimes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_VALEUR_ENSEMBLE — combien vaut ce tas ?
     Le piège : compter les PIÈCES au lieu de compter leur
     valeur. Trois pièces peuvent valoir plus que cinq.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_valeur_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_valeur_ensemble",
    difficulty: 4,
    theme: "neutral",
    text: "Léa a 4 pièces de 50 centimes. Kevin a 5 pièces de 20 centimes. Qui a le plus d'argent ?",
    format: "qcm",
    choices: [
      "Léa, qui a 2 €",
      "Kevin, qui a plus de pièces",
      "ils ont pareil",
      "Kevin, qui a 5 €",
    ],
    expected: ["Léa, qui a 2 €"],
    comparator: "mcq_exact",
    hint: "Compte la valeur, pas le nombre de pièces.",
    explanation: exp(
      "Ce qui compte, c'est la valeur écrite sur les pièces, pas leur nombre.",
      "On calcule chaque tas séparément, puis on compare.",
      "Léa : 50 + 50 + 50 + 50 = 200 centimes, donc 2 €. Kevin : 5 fois 20 centimes = 100 centimes, donc 1 €. Kevin a plus de pièces, mais moins d'argent.",
      "C'est Léa, avec 2 €.",
    ),
    tags: ["ce1", "monnaie", "valeur", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_valeur_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_valeur_ensemble",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les valeurs écrites sur chaque billet et chaque pièce.",
    tags: ["ce1", "monnaie", "valeur", "template"],
    generate: () => {
      const billet = randomChoice(BILLETS);
      const p1 = randomChoice(PIECES_EUROS);
      const p2 = randomChoice(PIECES_EUROS);
      const total = billet + p1 + p2;
      return {
        text: `Dans un porte-monnaie : un billet de ${billet} €, une pièce de ${p1} € et une pièce de ${p2} €. Combien d'euros en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur d'un ensemble, c'est la somme des valeurs de chaque billet et de chaque pièce.",
          "On commence par le billet, le plus grand, puis on ajoute les pièces.",
          `${billet} + ${p1} + ${p2} = ${total}.`,
          `Il y a ${total} € en tout.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_valeur_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_valeur_ensemble",
    difficulty: 4,
    theme: "neutral",
    hint: "Compte d'abord en centimes, puis regarde combien d'euros cela fait.",
    tags: ["ce1", "monnaie", "valeur", "template"],
    generate: () => {
      const piece = randomChoice([10, 20, 50] as const);
      const nb = randomChoice([2, 3, 4, 5]);
      const totalCentimes = piece * nb;
      return {
        text: `Malia a ${nb} pièces de ${piece} centimes. Combien de centimes a-t-elle en tout ?`,
        format: "short",
        expected: [String(totalCentimes)],
        comparator: "number_equal",
        explanation: exp(
          "La valeur d'un tas de pièces, c'est la valeur d'une pièce répétée autant de fois qu'il y a de pièces.",
          "On additionne, ou on multiplie la valeur d'une pièce par leur nombre.",
          `${piece} × ${nb} = ${totalCentimes}. Elle a donc ${totalCentimes} centimes${totalCentimes % 100 === 0 ? `, c'est-à-dire ${totalCentimes / 100} €` : ""}.`,
          `Elle a ${totalCentimes} centimes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_COMPARER_ENSEMBLES — qui a le plus ?
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_comparer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 3,
    theme: "neutral",
    text: "Kevin a deux pièces de 2 €. Naïla a un billet de 5 €. Qui a le plus d'argent ?",
    format: "qcm",
    choices: [
      "Naïla",
      "Kevin",
      "ils ont pareil",
      "celui qui a le plus d'objets, donc Kevin",
    ],
    expected: ["Naïla"],
    comparator: "mcq_exact",
    hint: "Calcule ce que vaut chaque tas avant de comparer.",
    explanation: exp(
      "Pour comparer deux tas d'argent, on calcule d'abord la valeur de chacun.",
      "On additionne à part, puis on compare les deux totaux.",
      "Kevin : 2 + 2 = 4 €. Naïla : 5 €. Kevin a deux pièces et Naïla un seul billet, mais 5 € est plus que 4 €.",
      "C'est Naïla qui a le plus.",
    ),
    tags: ["ce1", "monnaie", "comparer", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_comparer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 4,
    theme: "neutral",
    text: "Un billet de 5 € et une pièce de 50 centimes, ou cinq pièces de 1 € et deux pièces de 20 centimes. Quel tas vaut le plus ?",
    format: "qcm",
    choices: [
      "le premier tas",
      "le second tas",
      "les deux valent pareil",
      "le second, parce qu'il a plus de pièces",
    ],
    expected: ["le premier tas"],
    comparator: "mcq_exact",
    hint: "Compte les euros d'un côté, les centimes de l'autre.",
    explanation: exp(
      "Pour comparer deux tas, on calcule les euros et les centimes de chacun.",
      "On additionne d'abord les euros, puis les centimes, tas par tas.",
      "Premier tas : 5 € et 50 centimes, donc 5,50 €. Second tas : 5 € et 40 centimes, donc 5,40 €. Les euros sont les mêmes, ce sont les centimes qui décident : 50 > 40.",
      "Le premier tas vaut le plus.",
    ),
    tags: ["ce1", "monnaie", "comparer", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_comparer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_comparer_ensembles",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule chaque tas, puis compare les deux totaux.",
    tags: ["ce1", "monnaie", "comparer", "template"],
    generate: () => {
      const nbA = randomChoice([2, 3, 4]);
      const pieceA = randomChoice([1, 2] as const);
      const totalA = nbA * pieceA;
      // Le second tas est toujours différent du premier : sinon la question
      // n'aurait pas de réponse unique.
      let totalB = randomChoice(BILLETS);
      if (totalB === totalA) totalB = totalA + 5;
      const gagnant = totalA > totalB ? "Kevin" : "Naïla";
      const perdant = totalA > totalB ? "Naïla" : "Kevin";
      return {
        text: `Kevin a ${nbA} pièces de ${pieceA} €. Naïla a un billet de ${totalB} €. Qui a le plus d'argent ?`,
        format: "qcm",
        choices: makeChoices(gagnant, [
          perdant,
          "ils ont pareil",
          "celui qui a le plus d'objets",
          "on ne peut pas savoir",
        ]),
        expected: [gagnant],
        comparator: "mcq_exact",
        explanation: exp(
          "Pour comparer deux tas d'argent, on calcule d'abord la valeur de chacun.",
          "On additionne à part, puis on compare les deux totaux.",
          `Kevin : ${pieceA} × ${nbA} = ${totalA} €. Naïla : ${totalB} €. Le plus grand des deux totaux est ${Math.max(totalA, totalB)}.`,
          `C'est ${gagnant} qui a le plus.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_CONSTITUER — fabriquer une somme donnée
     Avec des euros ET des centimes, comme le demande le
     programme.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_constituer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 2,
    theme: "neutral",
    text: "Tu dois faire 7 € avec le moins de pièces et de billets possible. Que prends-tu ?",
    format: "qcm",
    choices: [
      "un billet de 5 € et une pièce de 2 €",
      "sept pièces de 1 €",
      "un billet de 5 € et deux pièces de 1 €",
      "trois pièces de 2 € et une de 1 €",
    ],
    expected: ["un billet de 5 € et une pièce de 2 €"],
    comparator: "mcq_exact",
    hint: "Commence toujours par la plus grande valeur possible.",
    explanation: exp(
      "Constituer une somme, c'est choisir des pièces et des billets dont le total fait exactement la somme.",
      "Pour en prendre le moins possible, on commence par la plus grande valeur qui rentre.",
      "5 € rentre dans 7 €, il reste 2 € : une seule pièce suffit. Cela fait deux objets. Les autres solutions donnent bien 7 €, mais avec plus de pièces.",
      "Un billet de 5 € et une pièce de 2 €.",
    ),
    tags: ["ce1", "monnaie", "constituer", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_constituer_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 4,
    theme: "neutral",
    text: "Tu dois payer 3,20 € exactement. Que prends-tu ?",
    format: "qcm",
    choices: [
      "une pièce de 2 €, une de 1 € et une de 20 centimes",
      "trois pièces de 1 € et deux de 10 centimes",
      "une pièce de 2 € et une de 1 €",
      "trois pièces de 1 € et une de 2 centimes",
    ],
    expected: ["une pièce de 2 €, une de 1 € et une de 20 centimes"],
    comparator: "mcq_exact",
    hint: "3,20 €, c'est 3 euros et 20 centimes. Fais les deux parties séparément.",
    explanation: exp(
      "Une somme à virgule se fabrique en deux morceaux : les euros, puis les centimes.",
      "On lit devant la virgule pour les euros, derrière pour les centimes.",
      "3,20 € fait 3 euros et 20 centimes. Pour 3 € : 2 € + 1 €. Pour 20 centimes : une pièce de 20 centimes. Trois pièces de 1 € et deux de 10 centimes donnent aussi le compte, mais avec cinq pièces au lieu de trois.",
      "Une pièce de 2 €, une de 1 € et une de 20 centimes.",
    ),
    tags: ["ce1", "monnaie", "constituer", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_constituer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde d'abord les euros, puis les centimes.",
    tags: ["ce1", "monnaie", "constituer", "template"],
    generate: () => {
      const e = randomInt(1, 9);
      const c = randomChoice(PIECES_CENTIMES);
      return {
        text: `Tu dois payer ${euros(e, c)}. Combien de centimes faut-il ajouter aux ${e} euros ?`,
        format: "short",
        expected: [String(c)],
        comparator: "number_equal",
        explanation: exp(
          "Une somme à virgule se fabrique en deux morceaux : les euros, puis les centimes.",
          "On lit devant la virgule pour les euros, derrière pour les centimes.",
          `${euros(e, c)} se lit « ${e} euros et ${c} centimes ». Il faut donc ajouter ${c} centimes, et une pièce de ${c} centimes existe.`,
          `Il faut ${c} centimes.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_constituer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Prends d'abord le billet, puis complète avec des pièces.",
    tags: ["ce1", "monnaie", "constituer", "template"],
    generate: () => {
      const billet = randomChoice([5, 10, 20] as const);
      const reste = randomChoice([1, 2, 3, 4]);
      const total = billet + reste;
      return {
        text: `Tu dois faire ${total} € avec un billet de ${billet} € et des pièces de 1 €. Combien de pièces de 1 € faut-il ?`,
        format: "short",
        expected: [String(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Constituer une somme, c'est compléter jusqu'à la somme demandée.",
          "On pose d'abord le billet, puis on cherche ce qui manque.",
          `${total} - ${billet} = ${reste}. Il manque ${reste} €, donc ${reste} pièce${reste > 1 ? "s" : ""} de 1 €.`,
          `Il faut ${reste} pièce${reste > 1 ? "s" : ""}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_RENDRE — simuler un achat, rendre la monnaie
     Rendre la monnaie, c'est compléter : on part du prix et on
     remonte jusqu'à ce qui a été donné.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_rendre_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 2,
    theme: "reunion",
    text: "Au camion-bar, un bonbon piment coûte 3 €. Tu donnes un billet de 5 €. Combien te rend-on, en euros ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "De 3 à 5, combien manque-t-il ?",
    explanation: exp(
      "Rendre la monnaie, c'est donner la différence entre ce qu'on a payé et le prix.",
      "On part du prix et on compte ce qui manque pour arriver à la somme donnée.",
      "De 3 à 5, il manque 2 : 3 + 2 = 5.",
      "On te rend 2 €.",
    ),
    tags: ["ce1", "monnaie", "rendre", "reunion"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_rendre_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 4,
    theme: "neutral",
    text: "Un cahier coûte 2,50 €. Tu donnes 3 €. Combien te rend-on, en centimes ?",
    format: "short",
    expected: ["50"],
    comparator: "number_equal",
    hint: "2,50 €, c'est 2 euros et 50 centimes. Combien manque-t-il pour 3 € ?",
    explanation: exp(
      "Rendre la monnaie, c'est compléter jusqu'à la somme donnée.",
      "On repart du prix et on ajoute ce qui manque pour arriver au compte.",
      "2 euros et 50 centimes, plus 50 centimes, font 3 euros. Il manquait donc 50 centimes.",
      "On te rend 50 centimes.",
    ),
    tags: ["ce1", "monnaie", "rendre", "piege"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_rendre_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 3,
    theme: "reunion",
    hint: "Compte ce qui manque pour aller du prix jusqu'au billet.",
    tags: ["ce1", "monnaie", "rendre", "reunion", "template"],
    generate: () => {
      const achat = randomChoice([
        { quoi: "un samoussa", ou: "au camion-bar" },
        { quoi: "un pain bouchon", ou: "à la boutique du coin" },
        { quoi: "une bouteille d'eau", ou: "au marché forain" },
        { quoi: "un paquet de chips", ou: "à la boutique" },
      ]);
      const billet = randomChoice(BILLETS);
      const prix = randomInt(1, billet - 1);
      const rendu = billet - prix;
      return {
        text: `${achat.quoi.charAt(0).toUpperCase()}${achat.quoi.slice(1)} coûte ${prix} € ${achat.ou}. Tu donnes un billet de ${billet} €. Combien te rend-on, en euros ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Rendre la monnaie, c'est donner la différence entre la somme donnée et le prix.",
          "On part du prix et on compte ce qui manque pour arriver au billet.",
          `De ${prix} à ${billet}, il manque ${rendu} : ${prix} + ${rendu} = ${billet}.`,
          `On te rend ${rendu} €.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_rendre_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_rendre",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de centimes manque-t-il pour arriver à l'euro suivant ?",
    tags: ["ce1", "monnaie", "rendre", "template"],
    generate: () => {
      const e = randomInt(1, 8);
      const c = randomChoice([10, 20, 25, 40, 50, 60, 75, 80, 90] as const);
      const rendu = 100 - c;
      return {
        text: `Un objet coûte ${euros(e, c)}. Tu donnes ${e + 1} €. Combien te rend-on, en centimes ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Rendre la monnaie, c'est compléter jusqu'à la somme donnée.",
          "On regarde ce qui manque pour atteindre l'euro suivant : les centimes se complètent à 100.",
          `${c} + ${rendu} = 100. Il manquait donc ${rendu} centimes pour faire ${e + 1} € tout rond.`,
          `On te rend ${rendu} centimes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_PROBLEME — un problème de monnaie
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_probleme_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Malia achète un cahier à 3 € et un stylo à 2 €. Elle donne un billet de 10 €. Combien lui rend-on, en euros ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche d'abord ce qu'elle dépense en tout.",
    explanation: exp(
      "Un problème en deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On additionne les achats, puis on enlève ce total à la somme donnée.",
      "Les achats font 3 + 2 = 5 €. On rend 10 - 5 = 5 €.",
      "On lui rend 5 €.",
    ),
    tags: ["ce1", "monnaie", "probleme", "reunion", "deux_etapes"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_probleme_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Kevin a 8 €. Il veut acheter un jeu à 12 €. Combien lui manque-t-il ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Ce qui manque, c'est l'écart entre ce qu'il a et le prix.",
    explanation: exp(
      "Chercher ce qui manque, c'est chercher l'écart entre deux sommes.",
      "On part de ce qu'on a et on compte jusqu'au prix.",
      "De 8 à 12, il manque 4 : 8 + 4 = 12.",
      "Il lui manque 4 €.",
    ),
    tags: ["ce1", "monnaie", "probleme"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_probleme_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 4,
    theme: "reunion",
    hint: "Additionne d'abord les deux achats.",
    tags: ["ce1", "monnaie", "probleme", "reunion", "template"],
    generate: () => {
      const qui = randomChoice(["Malia", "Kevin", "Naïla", "Ryan"]);
      const prix1 = randomInt(2, 8);
      const prix2 = randomInt(2, 8);
      const billet = prix1 + prix2 <= 10 ? 10 : 20;
      const rendu = billet - prix1 - prix2;
      return {
        text: `${qui} achète un livre à ${prix1} € et un cahier à ${prix2} €. ${qui} donne un billet de ${billet} €. Combien lui rend-on, en euros ?`,
        format: "short",
        expected: [String(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème en deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
          "On additionne les achats, puis on enlève ce total à la somme donnée.",
          `Les achats font ${prix1} + ${prix2} = ${prix1 + prix2} €. On rend ${billet} - ${prix1 + prix2} = ${rendu} €.`,
          `On lui rend ${rendu} €.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_probleme_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_probleme",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui manque, c'est l'écart entre ce qu'on a et le prix.",
    tags: ["ce1", "monnaie", "probleme", "template"],
    generate: () => {
      const qui = randomChoice(["Malia", "Kevin", "Naïla", "Ryan"]);
      const possede = randomInt(3, 15);
      const manque = randomInt(2, 9);
      const prix = possede + manque;
      const objet = randomChoice(["un jeu", "un ballon", "un livre", "une trousse neuve"]);
      return {
        text: `${qui} a ${possede} €. ${objet.charAt(0).toUpperCase()}${objet.slice(1)} coûte ${prix} €. Combien d'euros lui manque-t-il ?`,
        format: "short",
        expected: [String(manque)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher ce qui manque, c'est chercher l'écart entre deux sommes.",
          "On part de ce qu'on a et on compte jusqu'au prix.",
          `De ${possede} à ${prix}, il manque ${manque} : ${possede} + ${manque} = ${prix}.`,
          `Il lui manque ${manque} €.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MONNAIE_DEFI — les défis
     Ce qui ne s'obtient pas en appliquant une règle : les
     sommes qui s'écrivent de plusieurs façons, et le prix qui
     dépasse sans qu'on s'en aperçoive.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_monnaie_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Deux enfants écrivent la même somme. Léa écrit 2,50 €, Kevin écrit « 250 centimes ». Qui a raison ?",
    format: "qcm",
    choices: [
      "les deux : c'est la même somme",
      "Léa seulement",
      "Kevin seulement",
      "aucun des deux",
    ],
    expected: ["les deux : c'est la même somme"],
    comparator: "mcq_exact",
    hint: "Transforme les 2 euros en centimes, puis ajoute.",
    explanation: exp(
      "Une même somme peut s'écrire en euros avec une virgule, ou tout en centimes.",
      "On ramène les deux écritures à la même unité, ici le centime.",
      "2 € = 200 centimes. On ajoute les 50 centimes : 200 + 50 = 250. Léa et Kevin ont écrit la même somme.",
      "Les deux ont raison.",
    ),
    tags: ["ce1", "monnaie", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_monnaie_defi_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Tu as 5 €. Un samoussa coûte 1 €. Peux-tu en acheter 6 ?",
    format: "qcm",
    choices: [
      "non, il en manque un : 6 samoussas coûtent 6 €",
      "oui, tout juste",
      "oui, et il te reste 1 €",
      "non, tu ne peux en acheter que 4",
    ],
    expected: ["non, il en manque un : 6 samoussas coûtent 6 €"],
    comparator: "mcq_exact",
    hint: "Combien coûtent 6 samoussas ? Compare à ce que tu as.",
    explanation: exp(
      "Pour savoir si on peut payer, on compare le prix total à ce qu'on a.",
      "On calcule d'abord le prix de tous les samoussas, puis on compare.",
      "6 samoussas à 1 € font 6 €. Or tu n'as que 5 € : il manque 1 €. Avec 5 €, tu peux en acheter 5.",
      "Non : il manque 1 €.",
    ),
    tags: ["ce1", "monnaie", "defi", "reunion", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_monnaie_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Combien de fois le prix tient-il dans ce que tu as ?",
    tags: ["ce1", "monnaie", "defi", "reunion", "template"],
    generate: () => {
      const prix = randomChoice([2, 3, 5]);
      const nb = randomInt(2, 5);
      const somme = prix * nb;
      const objet = randomChoice(["samoussas", "bonbons piment", "beignets", "sachets de chips"]);
      return {
        text: `Tu as ${somme} €. Un paquet de ${objet} coûte ${prix} €. Combien de paquets peux-tu acheter ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien de fois on peut payer, c'est faire des groupements.",
          "On cherche combien de fois le prix tient dans la somme qu'on a.",
          `${prix} tient ${nb} fois dans ${somme}, car ${prix} × ${nb} = ${somme}.`,
          `Tu peux acheter ${nb} paquets.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_monnaie_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce1_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Écris la somme tout en centimes avant de choisir.",
    tags: ["ce1", "monnaie", "defi", "piege", "template"],
    generate: () => {
      const e = randomInt(1, 6);
      const c = randomChoice([5, 10, 20, 25, 50] as const);
      const totalCentimes = e * 100 + c;
      const bonne = `${totalCentimes} centimes`;
      return {
        text: `Combien de centimes vaut ${euros(e, c)} ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          `${e * 10 + c} centimes`,
          `${e + c} centimes`,
          `${e * 100} centimes`,
          `${totalCentimes + 100} centimes`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "1 euro vaut 100 centimes.",
          "On transforme d'abord les euros en centimes, puis on ajoute les centimes déjà écrits.",
          `${e} € = ${e * 100} centimes. On ajoute les ${c} centimes : ${e * 100} + ${c} = ${totalCentimes}.`,
          `${euros(e, c)} vaut ${totalCentimes} centimes.`,
        ),
      };
    },
  },
];
