// lib/tutor-v4/questionBank/ce2/maths/monnaie.bank.ts
//
// La monnaie du CE2, écrite à la main. Six micro-compétences qui passaient par
// le constructeur commun, alors que c'est la seule notion du cycle 2 où le
// programme demande EXPRESSÉMENT l'écriture à virgule.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cycle 2) : euros et centimes,
// 1 € = 100 centimes, l'écriture à virgule et le rendu de monnaie. C'est le
// seul endroit du cycle où la virgule est au programme — pour les longueurs,
// les masses et les contenances elle reste interdite.
//
// LE PIÈGE DE LA NOTION, celui qui traverse toutes les micro-compétences :
// « 4 euros et 5 centimes » écrit 4,5 € au lieu de 4,05 €. L'élève pose le 5
// juste après la virgule sans se demander ce qu'il compte. Or après la virgule
// il y a DEUX rangs : les dizaines de centimes puis les centimes. 4,5 € c'est
// 4 € 50, dix fois plus.
// Son cousin apparaît dans l'addition : 3,50 € + 2,50 € font 6,00 € et non
// 5,100 €. Cent centimes se transforment en un euro.
//
// ⚠️ PAS DE QUESTION À RÉDIGER. `applyMathsKeyboardFree` retire les items
// `format: "open"` (cf. ce2/maths/index.ts). Les réponses en `short` avec
// virgule fonctionnent : le convertisseur conserve la virgule ET le suffixe
// « € » en fabriquant ses propositions.

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

/**
 * Un montant en centimes devient l'écriture à virgule attendue au CE2.
 * 405 → « 4,05 € ». Les centimes tiennent TOUJOURS sur deux chiffres :
 * c'est exactement ce que les élèves oublient.
 */
function euro(centimes: number): string {
  const e = Math.floor(centimes / 100);
  const c = centimes % 100;
  return `${e},${String(c).padStart(2, "0")} €`;
}

/** L'écriture fautive à un seul chiffre après la virgule : 405 → « 4,5 € ». */
function euroFautif(centimes: number): string {
  const e = Math.floor(centimes / 100);
  const c = centimes % 100;
  return `${e},${c} €`;
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const monnaieBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_MONNAIE_ECRITURE_VIRGULE — écrire un montant
     Le cœur du programme de CE2, et son piège n° 1 : les
     centimes s'écrivent sur DEUX chiffres.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_monnaie_ecriture_virgule_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_ecriture_virgule",
    difficulty: 1,
    theme: "neutral",
    text: "Combien y a-t-il de centimes dans 1 euro ?",
    format: "short",
    expected: ["100"],
    comparator: "number_equal",
    hint: "Comme dans « centimètre » : « centi » annonce cent.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On se rappelle du mot : « centime » vient de cent, comme centimètre.",
      "Il faut 100 pièces de 1 centime pour faire 1 euro. C'est pour cela qu'on écrit deux chiffres après la virgule : ils comptent les centimes jusqu'à 99.",
      "1 € = 100 centimes.",
    ),
    tags: ["ce2", "monnaie", "ecriture_virgule", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_ecriture_virgule_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_ecriture_virgule",
    difficulty: 3,
    theme: "neutral",
    text: "Léa a 4 euros et 5 centimes. Elle écrit « 4,5 € ». A-t-elle raison ?",
    format: "qcm",
    choices: [
      "non, il faut écrire 4,05 €",
      "oui",
      "non, il faut écrire 4,50 €",
      "non, il faut écrire 45 €",
    ],
    expected: ["non, il faut écrire 4,05 €"],
    comparator: "mcq_exact",
    hint: "Après la virgule, il y a toujours deux chiffres : les dizaines de centimes, puis les centimes.",
    explanation: exp(
      "Après la virgule d'un montant, il y a deux rangs : les dizaines de centimes, puis les centimes.",
      "On place d'abord les centimes tout à droite, puis on complète avec un zéro si besoin.",
      "5 centimes, c'est zéro dizaine de centimes et 5 centimes : on écrit 4,05 €. En écrivant 4,5 €, Léa annonce 4 € 50, dix fois plus que ce qu'elle a.",
      "Non : il fallait écrire 4,05 €.",
    ),
    tags: ["ce2", "monnaie", "ecriture_virgule", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_ecriture_virgule_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_ecriture_virgule",
    difficulty: 2,
    theme: "neutral",
    text: "Sur une étiquette, on lit « 7,50 € ». Que veut dire le 50 ?",
    format: "qcm",
    choices: ["50 centimes", "50 euros", "50 pièces", "il reste 50 à payer"],
    expected: ["50 centimes"],
    comparator: "mcq_exact",
    hint: "Ce qui est à gauche de la virgule, ce sont les euros. À droite ?",
    explanation: exp(
      "Dans un prix, la virgule sépare les euros des centimes.",
      "On lit d'abord la partie de gauche, puis celle de droite.",
      "7,50 € se lit « 7 euros et 50 centimes ». Les 50 centimes, c'est un demi-euro : une pièce de 50 centimes suffit.",
      "Le 50 compte des centimes.",
    ),
    tags: ["ce2", "monnaie", "ecriture_virgule", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_monnaie_ecriture_virgule_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_ecriture_virgule",
    difficulty: 3,
    theme: "neutral",
    hint: "Les centimes s'écrivent sur deux chiffres. S'il n'y en a qu'un, on met un zéro devant.",
    tags: ["ce2", "monnaie", "ecriture_virgule", "piege", "template"],
    generate: () => {
      const e = randomInt(1, 9);
      // Moins de 10 centimes une fois sur deux : c'est là que le zéro manque.
      const c = randomChoice([randomInt(1, 9), randomInt(10, 99)]);
      const total = e * 100 + c;
      return {
        text: `Comment écrit-on ${e} euros et ${c} centimes ?`,
        format: "qcm",
        // ⚠️ Au-dessus de 9 centimes, `euroFautif` retombe sur la bonne réponse
        // et `${e}${c}` sur le montant en centimes : deux pièges s'évaporent.
        // On en écrit assez pour qu'il en reste toujours trois après le tri.
        choices: makeChoices(euro(total), [
          euroFautif(total),
          `${e},${c}0 €`,
          `${total} €`,
          `${c},${String(e).padStart(2, "0")} €`,
          `${e + 1},${String(c).padStart(2, "0")} €`,
        ]),
        expected: [euro(total)],
        comparator: "mcq_exact",
        explanation: exp(
          "Après la virgule d'un montant, il y a deux rangs : les dizaines de centimes, puis les centimes.",
          "On écrit les euros, la virgule, puis les centimes sur deux chiffres.",
          c < 10
            ? `${c} centimes, c'est zéro dizaine de centimes et ${c} centimes : on écrit ${euro(total)}. Sans le zéro, ${euroFautif(total)} voudrait dire ${e} € ${c}0.`
            : `${c} centimes tiennent déjà sur deux chiffres : on écrit ${euro(total)}.`,
          `On écrit ${euro(total)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_monnaie_ecriture_virgule_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_ecriture_virgule",
    difficulty: 2,
    theme: "neutral",
    hint: "Tout est en centimes : 1 € en vaut 100.",
    tags: ["ce2", "monnaie", "ecriture_virgule", "template"],
    generate: () => {
      const e = randomInt(1, 9);
      const c = randomChoice([0, 5, 20, 25, 50, 75, 90]);
      const total = e * 100 + c;
      return {
        text: `Un prix est affiché ${euro(total)}. Combien cela fait-il de centimes en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "1 euro vaut 100 centimes.",
          "On transforme d'abord les euros en centimes, puis on ajoute les centimes déjà là.",
          `${e} € = ${e * 100} centimes. On ajoute les ${c} centimes : ${e * 100} + ${c} = ${total}.`,
          `${euro(total)} font ${total} centimes.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MONNAIE_CONSTITUER — faire une somme avec des pièces
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_monnaie_constituer_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_constituer",
    difficulty: 2,
    theme: "neutral",
    text: "Combien de pièces de 50 centimes faut-il pour faire 1 euro ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "50 centimes, c'est la moitié d'un euro.",
    explanation: exp(
      "1 euro vaut 100 centimes.",
      "On cherche combien de fois la pièce tient dans 100 centimes.",
      "50 + 50 = 100. Deux pièces de 50 centimes font donc exactement 1 euro.",
      "Il en faut 2.",
    ),
    tags: ["ce2", "monnaie", "constituer", "remarquable"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_constituer_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_constituer",
    difficulty: 4,
    theme: "reunion",
    text: "Au snack, un samoussa coûte 7,30 €. Kevin pose un billet de 5 €, une pièce de 2 € et une pièce de 20 centimes. Peut-il payer ?",
    format: "qcm",
    choices: [
      "non, il lui manque 10 centimes",
      "oui, c'est exactement le prix",
      "non, il lui manque 1 euro",
      "oui, et on lui rend 10 centimes",
    ],
    expected: ["non, il lui manque 10 centimes"],
    comparator: "mcq_exact",
    hint: "Additionne ce qu'il a posé, puis compare au prix.",
    explanation: exp(
      "Pour savoir si on peut payer, on additionne ce qu'on pose et on compare au prix.",
      "On additionne d'abord les euros, puis les centimes.",
      "5 € + 2 € = 7 €, et il ajoute 20 centimes : cela fait 7,20 €. Le prix est 7,30 € : il manque 10 centimes.",
      "Non, il lui manque 10 centimes.",
    ),
    tags: ["ce2", "monnaie", "constituer", "reunion", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_constituer_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle est la plus petite quantité de pièces et de billets pour payer exactement 27 € ?",
    format: "qcm",
    choices: [
      "un billet de 20 €, un de 5 € et une pièce de 2 €",
      "deux billets de 10 € et sept pièces de 1 €",
      "un billet de 20 € et sept pièces de 1 €",
      "vingt-sept pièces de 1 €",
    ],
    expected: ["un billet de 20 €, un de 5 € et une pièce de 2 €"],
    comparator: "mcq_exact",
    hint: "Commence toujours par le plus gros billet possible.",
    explanation: exp(
      "Pour utiliser le moins de pièces possible, on prend d'abord les plus grosses valeurs.",
      "On enlève le plus gros billet qui tient dans la somme, puis on recommence avec ce qui reste.",
      "27 € : on prend 20 €, il reste 7 €. On prend 5 €, il reste 2 €. On prend la pièce de 2 € : trois éléments en tout, et c'est le minimum.",
      "Un billet de 20 €, un de 5 € et une pièce de 2 €.",
    ),
    tags: ["ce2", "monnaie", "constituer", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_monnaie_constituer_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_constituer",
    difficulty: 2,
    theme: "neutral",
    hint: "Combien de fois la pièce tient-elle dans la somme ?",
    tags: ["ce2", "monnaie", "constituer", "template"],
    generate: () => {
      const piece = randomChoice([5, 10, 20, 25, 50]);
      const euros = randomChoice([1, 2, 5]);
      const nb = (euros * 100) / piece;
      return {
        text: `Combien de pièces de ${piece} centimes faut-il pour faire ${euros} € ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "1 euro vaut 100 centimes.",
          "On écrit la somme en centimes, puis on cherche combien de fois la pièce y tient.",
          `${euros} € = ${euros * 100} centimes. Puis ${euros * 100} ÷ ${piece} = ${nb}.`,
          `Il faut ${nb} pièces.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_monnaie_constituer_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_constituer",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les euros d'un côté, les centimes de l'autre.",
    tags: ["ce2", "monnaie", "constituer", "template"],
    generate: () => {
      const billet = randomChoice([5, 10, 20]);
      const piece = randomChoice([1, 2]);
      const nbPieces = randomInt(1, 3);
      const centimes = randomChoice([10, 20, 50, 5]);
      const total = billet * 100 + piece * 100 * nbPieces + centimes;
      return {
        text: `Malia pose un billet de ${billet} €, ${nbPieces} pièce${nbPieces > 1 ? "s" : ""} de ${piece} € et une pièce de ${centimes} centimes. Combien a-t-elle posé en tout ?`,
        format: "short",
        expected: [euro(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour trouver un total, on regroupe les euros ensemble et les centimes ensemble.",
          "On additionne d'abord les euros, puis on écrit les centimes après la virgule, sur deux chiffres.",
          `Les euros : ${billet} + ${piece} × ${nbPieces} = ${billet + piece * nbPieces} €. Avec les ${centimes} centimes, cela fait ${euro(total)}.`,
          `Elle a posé ${euro(total)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MONNAIE_ADDITIONNER — additionner des montants
     Le piège : cent centimes font un euro. 3,50 + 2,50 ne
     donne pas 5,100 mais 6,00.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_monnaie_additionner_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_additionner",
    difficulty: 2,
    theme: "neutral",
    text: "Combien font 2,50 € + 3,20 € ?",
    format: "short",
    expected: ["5,70 €"],
    comparator: "number_equal",
    hint: "Les euros avec les euros, les centimes avec les centimes.",
    explanation: exp(
      "Pour additionner deux montants, on additionne séparément les euros et les centimes.",
      "On aligne les virgules, puis on additionne chaque colonne.",
      "Les euros : 2 + 3 = 5. Les centimes : 50 + 20 = 70. Cela fait 5,70 €.",
      "2,50 € + 3,20 € = 5,70 €.",
    ),
    tags: ["ce2", "monnaie", "additionner"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_additionner_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_additionner",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève calcule 3,50 € + 2,50 € et écrit « 5,100 € ». A-t-il raison ?",
    format: "qcm",
    choices: [
      "non, cela fait 6,00 €",
      "oui",
      "non, cela fait 5,10 €",
      "non, cela fait 5,50 €",
    ],
    expected: ["non, cela fait 6,00 €"],
    comparator: "mcq_exact",
    hint: "100 centimes, cela a un autre nom.",
    explanation: exp(
      "Quand les centimes atteignent 100, ils se transforment en 1 euro.",
      "On additionne les centimes ; s'ils dépassent 99, on échange 100 centimes contre 1 euro.",
      "50 + 50 = 100 centimes, c'est-à-dire 1 euro de plus. Les euros deviennent 3 + 2 + 1 = 6, et il reste 0 centime : 6,00 €. On n'écrit jamais trois chiffres après la virgule d'un prix.",
      "Non : cela fait 6,00 €.",
    ),
    tags: ["ce2", "monnaie", "additionner", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_additionner_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_additionner",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, Naïla achète un bouquet de brèdes à 2,40 € et un paquet de piments à 1,80 €. Combien paie-t-elle ?",
    format: "short",
    expected: ["4,20 €"],
    comparator: "number_equal",
    hint: "Les centimes dépassent 100 : échange-les contre un euro.",
    explanation: exp(
      "Quand les centimes atteignent 100, ils se transforment en 1 euro.",
      "On additionne les euros, puis les centimes, puis on échange si besoin.",
      "Les euros : 2 + 1 = 3. Les centimes : 40 + 80 = 120, soit 1 euro et 20 centimes. On ajoute cet euro : 3 + 1 = 4, et il reste 20 centimes.",
      "Elle paie 4,20 €.",
    ),
    tags: ["ce2", "monnaie", "additionner", "reunion", "retenue"],
  },
  {
    kind: "template",
    id: "ce2_monnaie_additionner_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_additionner",
    difficulty: 3,
    theme: "neutral",
    hint: "Les euros avec les euros, les centimes avec les centimes.",
    tags: ["ce2", "monnaie", "additionner", "template"],
    generate: () => {
      const a = randomInt(1, 9) * 100 + randomInt(1, 9) * 10;
      const b = randomInt(1, 9) * 100 + randomInt(1, 9) * 10;
      const total = a + b;
      const retenue = (a % 100) + (b % 100) >= 100;
      return {
        text: `Combien font ${euro(a)} + ${euro(b)} ?`,
        format: "short",
        expected: [euro(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour additionner deux montants, on additionne séparément les euros et les centimes.",
          "On additionne les centimes ; s'ils atteignent 100, on les échange contre 1 euro.",
          retenue
            ? `Les centimes : ${a % 100} + ${b % 100} = ${(a % 100) + (b % 100)}, soit 1 euro et ${((a % 100) + (b % 100)) - 100} centimes. Les euros : ${Math.floor(a / 100)} + ${Math.floor(b / 100)} + 1 = ${Math.floor(total / 100)}.`
            : `Les euros : ${Math.floor(a / 100)} + ${Math.floor(b / 100)} = ${Math.floor(total / 100)}. Les centimes : ${a % 100} + ${b % 100} = ${total % 100}.`,
          `Cela fait ${euro(total)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_monnaie_additionner_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_additionner",
    difficulty: 4,
    theme: "reunion",
    hint: "Trois prix à additionner : garde les euros ensemble et les centimes ensemble.",
    tags: ["ce2", "monnaie", "additionner", "reunion", "template"],
    generate: () => {
      const achats = shuffle([
        { quoi: "un bonbon piment", prix: randomChoice([80, 90, 120]) },
        { quoi: "un samoussa", prix: randomChoice([70, 80, 100]) },
        { quoi: "une bouteille d'eau", prix: randomChoice([50, 60, 90]) },
        { quoi: "un pain", prix: randomChoice([110, 130, 150]) },
      ]).slice(0, 3);
      const total = achats.reduce((s, a) => s + a.prix, 0);
      return {
        text: `Au snack, Kevin achète ${achats.map((a) => `${a.quoi} à ${euro(a.prix)}`).join(", ")}. Combien paie-t-il en tout ?`,
        format: "short",
        expected: [euro(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour un total, on additionne tous les montants, euros avec euros et centimes avec centimes.",
          "On additionne d'abord tous les centimes, puis on échange chaque centaine de centimes contre 1 euro.",
          `En centimes : ${achats.map((a) => a.prix).join(" + ")} = ${total} centimes, soit ${euro(total)}.`,
          `Il paie ${euro(total)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MONNAIE_RENDRE — rendre la monnaie
     Une soustraction où l'on doit souvent casser un euro en
     cent centimes.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_monnaie_rendre_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_rendre",
    difficulty: 2,
    theme: "neutral",
    text: "On paie 6,50 € avec un billet de 10 €. Combien rend-on ?",
    format: "short",
    expected: ["3,50 €"],
    comparator: "number_equal",
    hint: "Combien manque-t-il à 6,50 € pour atteindre 10 € ?",
    explanation: exp(
      "Rendre la monnaie, c'est chercher ce qui manque pour atteindre ce qu'on a donné.",
      "On complète d'abord jusqu'à l'euro suivant, puis jusqu'au billet.",
      "De 6,50 € à 7 €, il faut 50 centimes. De 7 € à 10 €, il faut 3 €. En tout : 3,50 €.",
      "On rend 3,50 €.",
    ),
    tags: ["ce2", "monnaie", "rendre"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_rendre_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_rendre",
    difficulty: 4,
    theme: "neutral",
    text: "On paie 12,80 € avec un billet de 20 €. Un élève répond « 8,80 € ». Quelle est la bonne réponse ?",
    format: "qcm",
    choices: ["7,20 €", "8,80 €", "8,20 €", "7,80 €"],
    expected: ["7,20 €"],
    comparator: "mcq_exact",
    hint: "Il a oublié les centimes : 80 centimes rendus, ce serait rendre trop.",
    explanation: exp(
      "Rendre la monnaie, c'est chercher ce qui manque pour atteindre ce qu'on a donné.",
      "On complète jusqu'à l'euro suivant, puis jusqu'au billet.",
      "De 12,80 € à 13 €, il faut 20 centimes. De 13 € à 20 €, il faut 7 €. En tout : 7,20 €. L'élève a recopié les 80 centimes au lieu de chercher ce qui manque.",
      "On rend 7,20 €.",
    ),
    tags: ["ce2", "monnaie", "rendre", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_rendre_fixed_3",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_rendre",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, Malia paie 8,05 € avec un billet de 10 €. Combien lui rend-on ?",
    format: "short",
    expected: ["1,95 €"],
    comparator: "number_equal",
    hint: "8,05 € c'est 8 euros et 5 centimes, pas 8 euros et 50 centimes.",
    explanation: exp(
      "Rendre la monnaie, c'est chercher ce qui manque pour atteindre ce qu'on a donné.",
      "On lit bien les centimes, puis on complète jusqu'à l'euro suivant, puis jusqu'au billet.",
      "8,05 € = 8 euros et 5 centimes. De 8,05 € à 9 €, il faut 95 centimes. De 9 € à 10 €, il faut 1 €. En tout : 1,95 €.",
      "On lui rend 1,95 €.",
    ),
    tags: ["ce2", "monnaie", "rendre", "reunion", "piege"],
  },
  {
    kind: "template",
    id: "ce2_monnaie_rendre_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_rendre",
    difficulty: 3,
    theme: "neutral",
    hint: "Complète d'abord jusqu'à l'euro suivant, puis jusqu'au billet.",
    tags: ["ce2", "monnaie", "rendre", "template"],
    generate: () => {
      const billet = randomChoice([10, 20, 50]);
      const prix = randomInt(1, billet - 2) * 100 + randomChoice([5, 10, 25, 40, 60, 75, 90]);
      const rendu = billet * 100 - prix;
      const versEuro = 100 - (prix % 100);
      const eurosApres = billet - Math.floor(prix / 100) - 1;
      return {
        text: `On paie ${euro(prix)} avec un billet de ${billet} €. Combien rend-on ?`,
        format: "short",
        expected: [euro(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Rendre la monnaie, c'est chercher ce qui manque pour atteindre ce qu'on a donné.",
          "On complète d'abord jusqu'à l'euro suivant, puis jusqu'au billet.",
          `De ${euro(prix)} à ${Math.floor(prix / 100) + 1} €, il faut ${versEuro} centimes. De ${Math.floor(prix / 100) + 1} € à ${billet} €, il faut ${eurosApres} €. En tout : ${euro(rendu)}.`,
          `On rend ${euro(rendu)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_monnaie_rendre_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_rendre",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche d'abord le total des deux achats, puis ce qui manque au billet.",
    tags: ["ce2", "monnaie", "rendre", "deux_etapes", "template"],
    generate: () => {
      const billet = randomChoice([10, 20]);
      const a = randomInt(1, 3) * 100 + randomChoice([10, 20, 50, 75]);
      const b = randomInt(1, 3) * 100 + randomChoice([5, 25, 40, 90]);
      const total = a + b;
      const rendu = billet * 100 - total;
      return {
        text: `On achète deux articles à ${euro(a)} et ${euro(b)}, et on paie avec un billet de ${billet} €. Combien rend-on ?`,
        format: "short",
        expected: [euro(rendu)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : d'abord le total, ensuite le rendu.",
          "On additionne les deux prix, puis on cherche ce qui manque pour atteindre le billet.",
          `Le total : ${euro(a)} + ${euro(b)} = ${euro(total)}. Puis de ${euro(total)} à ${billet} €, il manque ${euro(rendu)}.`,
          `On rend ${euro(rendu)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MONNAIE_PROBLEME — un problème de monnaie
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_monnaie_probleme_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Kevin a 5 € dans sa poche. Il achète un pain au chocolat à 1,20 € et une bouteille d'eau à 0,80 €. Combien lui reste-t-il ?",
    format: "short",
    expected: ["3,00 €"],
    comparator: "number_equal",
    hint: "Additionne d'abord les deux achats.",
    explanation: exp(
      "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
      "On additionne les deux achats, puis on retire ce total de ce qu'il avait.",
      "1,20 € + 0,80 € : les centimes font 20 + 80 = 100, soit 1 euro de plus. Cela donne 1 + 0 + 1 = 2,00 €. Puis 5 € - 2 € = 3,00 €.",
      "Il lui reste 3,00 €.",
    ),
    tags: ["ce2", "monnaie", "probleme", "reunion", "deux_etapes"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_probleme_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un cahier coûte 2,50 €. Combien coûtent 4 cahiers ?",
    format: "short",
    expected: ["10,00 €"],
    comparator: "number_equal",
    hint: "Quatre fois 50 centimes, cela fait combien d'euros ?",
    explanation: exp(
      "Pour plusieurs articles au même prix, on multiplie.",
      "On multiplie les euros d'un côté, les centimes de l'autre, puis on échange les centimes.",
      "Les euros : 4 × 2 = 8 €. Les centimes : 4 × 50 = 200 centimes, soit 2 € de plus. En tout : 8 + 2 = 10,00 €.",
      "Quatre cahiers coûtent 10,00 €.",
    ),
    tags: ["ce2", "monnaie", "probleme", "multiplication"],
  },
  {
    kind: "template",
    id: "ce2_monnaie_probleme_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche d'abord le total des achats.",
    tags: ["ce2", "monnaie", "probleme", "reunion", "template"],
    generate: () => {
      const contexte = randomChoice([
        { qui: "Malia", a: "un jus de goyavier", b: "un gâteau patate" },
        { qui: "Kevin", a: "un bonbon piment", b: "une bouteille d'eau" },
        { qui: "Naïla", a: "un samoussa", b: "un beignet" },
      ]);
      const poche = randomChoice([5, 10]);
      const prixA = randomInt(1, 2) * 100 + randomChoice([20, 50, 80]);
      const prixB = randomChoice([50, 70, 90, 120]);
      const reste = poche * 100 - prixA - prixB;
      return {
        text: `${contexte.qui} a ${poche} € dans sa poche. Elle achète ${contexte.a} à ${euro(prixA)} et ${contexte.b} à ${euro(prixB)}. Combien lui reste-t-il ?`,
        format: "short",
        expected: [euro(reste)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : d'abord le total dépensé, ensuite ce qui reste.",
          "On additionne les deux achats, puis on retire ce total de ce qu'elle avait.",
          `Le total : ${euro(prixA)} + ${euro(prixB)} = ${euro(prixA + prixB)}. Puis ${poche} € - ${euro(prixA + prixB)} = ${euro(reste)}.`,
          `Il lui reste ${euro(reste)}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_monnaie_probleme_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Même prix pour chacun : on multiplie.",
    tags: ["ce2", "monnaie", "probleme", "template"],
    generate: () => {
      const prix = randomChoice([150, 250, 120, 175, 220]);
      const nb = randomInt(2, 6);
      const total = prix * nb;
      const objet = randomChoice(["un cahier", "un stylo", "une règle", "un carnet"]);
      return {
        text: `${objet.charAt(0).toUpperCase() + objet.slice(1)} coûte ${euro(prix)}. Combien coûtent ${nb} de ces articles ?`,
        format: "short",
        expected: [euro(total)],
        comparator: "number_equal",
        explanation: exp(
          "Pour plusieurs articles au même prix, on multiplie.",
          "On travaille en centimes, c'est plus sûr : on multiplie, puis on repasse en euros.",
          `${prix} centimes × ${nb} = ${total} centimes. Or 100 centimes font 1 euro, donc ${total} centimes = ${euro(total)}.`,
          `Cela coûte ${euro(total)}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_MONNAIE_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_monnaie_defi_fixed_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Trois élèves écrivent le même montant : 3 euros et 5 centimes. Léa écrit 3,05 €, Kevin écrit 305 centimes, Malia écrit 3,5 €. Qui a raison ?",
    format: "qcm",
    choices: [
      "Léa et Kevin",
      "les trois",
      "Léa seulement",
      "Malia et Léa",
    ],
    expected: ["Léa et Kevin"],
    comparator: "mcq_exact",
    hint: "Compte les centimes de chacun.",
    explanation: exp(
      "Un même montant peut s'écrire en euros avec virgule ou tout en centimes.",
      "On ramène les trois écritures en centimes.",
      "3,05 € = 305 centimes : Léa et Kevin disent la même chose. Mais 3,5 € se lit 3 euros et 50 centimes, soit 350 centimes : Malia annonce 45 centimes de trop.",
      "Léa et Kevin ont raison, Malia s'est trompée.",
    ),
    tags: ["ce2", "monnaie", "defi", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_monnaie_defi_fixed_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Au snack, Kevin a exactement 5 €. Un samoussa coûte 0,80 €. Combien peut-il en acheter au maximum ?",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Compte en centimes, et arrête-toi avant de dépasser.",
    explanation: exp(
      "Chercher combien d'articles on peut payer, c'est un groupement : on regarde combien de fois le prix tient dans la somme.",
      "On passe tout en centimes, puis on compte sans dépasser.",
      "5 € = 500 centimes, et le samoussa coûte 80 centimes. Six samoussas font 6 × 80 = 480 centimes, il reste 20 centimes. Sept en feraient 560 : c'est trop.",
      "Il peut en acheter 6.",
    ),
    tags: ["ce2", "monnaie", "defi", "reunion", "reste"],
  },
  {
    kind: "template",
    id: "ce2_monnaie_defi_tpl_1",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Passe tout en centimes, puis compte sans dépasser.",
    tags: ["ce2", "monnaie", "defi", "reunion", "template"],
    generate: () => {
      const somme = randomChoice([5, 10]);
      const prix = randomChoice([70, 80, 90, 120, 150]);
      const nb = Math.floor((somme * 100) / prix);
      const objet = randomChoice(["samoussas", "bonbons piment", "beignets", "bouchons"]);
      return {
        text: `Malia a ${somme} €. Un des ${objet} coûte ${euro(prix)}. Combien peut-elle en acheter au maximum ?`,
        format: "short",
        expected: [String(nb)],
        comparator: "number_equal",
        explanation: exp(
          "Chercher combien d'articles on peut payer, c'est un groupement.",
          "On passe tout en centimes, puis on compte sans dépasser la somme.",
          `${somme} € = ${somme * 100} centimes. ${nb} articles font ${nb} × ${prix} = ${nb * prix} centimes, il reste ${somme * 100 - nb * prix} centimes. Un de plus coûterait ${(nb + 1) * prix} centimes : c'est trop.`,
          `Elle peut en acheter ${nb}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_monnaie_defi_tpl_2",
    niveau: "ce2",
    matiere: "maths",
    notionId: "monnaie",
    microId: "ce2_monnaie_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Il manque une étape : cherche d'abord le prix du second article.",
    tags: ["ce2", "monnaie", "defi", "template"],
    generate: () => {
      const prixA = randomInt(1, 4) * 100 + randomChoice([20, 50, 80]);
      const ecart = randomChoice([50, 70, 90, 120]);
      const prixB = prixA + ecart;
      const total = prixA + prixB;
      return {
        text: `Un carnet coûte ${euro(prixA)}. Un livre coûte ${euro(ecart)} de plus que le carnet. Combien coûtent les deux ensemble ?`,
        format: "short",
        expected: [euro(total)],
        comparator: "number_equal",
        explanation: exp(
          "« De plus » veut dire qu'on ajoute au premier prix pour obtenir le second.",
          "On cherche d'abord le prix qui manque, puis on additionne les deux.",
          `Le livre coûte ${euro(prixA)} + ${euro(ecart)} = ${euro(prixB)}. Les deux ensemble : ${euro(prixA)} + ${euro(prixB)} = ${euro(total)}.`,
          `Les deux coûtent ${euro(total)}.`,
        ),
      };
    },
  },
];
