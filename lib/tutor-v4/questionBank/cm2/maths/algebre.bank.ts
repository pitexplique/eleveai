// lib/tutor-v4/question-banks/maths/cm2/algebre.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: string[]) {
  return shuffle([correct, ...wrongs]).slice(0, 4);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const algebreBank: TutorBankItemV4[] = [
  // ============================================================
  // ALGEBRE_EGALITE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_egalite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "L’égalité 8 + 4 = 6 + 6 est-elle vraie ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Calcule chaque côté du signe égal.",
    explanation: exp(
      "Une égalité est vraie si les deux côtés du signe égal ont la même valeur.",
      "On calcule le membre de gauche puis le membre de droite.",
      "8 + 4 = 12 et 6 + 6 = 12.",
      "Les deux côtés valent 12, donc l’égalité est vraie."
    ),
    tags: ["cm2", "algebre", "egalite"],
  },

  {
    kind: "template",
    id: "cm2_algebre_egalite_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 1,
    theme: "neutral",
    hint: "Une égalité est vraie si les deux côtés donnent le même résultat.",
    tags: ["cm2", "algebre", "egalite", "template"],
    generate: () => {
      const a = randomInt(4, 12);
      const b = randomInt(2, 8);
      const total = a + b;
      const c = randomInt(2, total - 2);
      const d = total - c;

      return {
        text: `L’égalité ${a} + ${b} = ${c} + ${d} est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une égalité est vraie si les deux côtés ont la même valeur.",
          "On calcule chaque côté du signe égal.",
          `${a} + ${b} = ${total} et ${c} + ${d} = ${total}.`,
          "Les deux côtés sont égaux, donc l’égalité est vraie."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_egalite_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si les deux calculs donnent vraiment le même résultat.",
    tags: ["cm2", "algebre", "egalite", "piege", "template"],
    generate: () => {
      const a = randomInt(5, 12);
      const b = randomInt(3, 9);
      const left = a + b;
      const c = randomInt(2, 9);
      const d = left - c + randomChoice([-2, -1, 1, 2]);

      return {
        text: `L’égalité ${a} + ${b} = ${c} + ${d} est-elle vraie ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une égalité est vraie seulement si les deux côtés ont exactement la même valeur.",
          "On calcule les deux côtés et on compare.",
          `${a} + ${b} = ${left}, mais ${c} + ${d} = ${c + d}.`,
          "Les deux résultats sont différents, donc l’égalité est fausse."
        ),
      };
    },
  },

  // ============================================================
  // ALGEBRE_COMPLETER_EGALITE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_completer_egalite_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 1,
    theme: "neutral",
    text: "Complète : 7 + ? = 12",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Cherche combien il manque pour aller de 7 à 12.",
    explanation: exp(
      "Compléter une égalité, c’est trouver le nombre qui rend l’égalité vraie.",
      "On cherche le nombre manquant.",
      "7 + 5 = 12.",
      "Le nombre manquant est 5."
    ),
    tags: ["cm2", "algebre", "egalite", "nombre_inconnu"],
  },

  {
    kind: "template",
    id: "cm2_algebre_completer_egalite_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 2,
    theme: "neutral",
    hint: "Tu peux faire une soustraction pour trouver le nombre manquant.",
    tags: ["cm2", "algebre", "egalite", "template"],
    generate: () => {
      const a = randomInt(6, 18);
      const missing = randomInt(3, 12);
      const total = a + missing;

      return {
        text: `Complète : ${a} + ? = ${total}`,
        format: "short",
        expected: [`${missing}`],
        comparator: "number_equal",
        explanation: exp(
          "Le nombre manquant est celui qui rend l’égalité vraie.",
          "On enlève la partie connue au total.",
          `${total} - ${a} = ${missing}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_completer_egalite_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_completer_egalite",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le côté où il n’y a pas de point d’interrogation.",
    tags: ["cm2", "algebre", "egalite", "template"],
    generate: () => {
      const a = randomInt(4, 12);
      const b = randomInt(3, 10);
      const c = randomInt(2, 8);
      const total = a + b;
      const missing = total - c;

      return {
        text: `Complète : ${a} + ${b} = ${c} + ?`,
        format: "short",
        expected: [`${missing}`],
        comparator: "number_equal",
        explanation: exp(
          "Une égalité doit garder la même valeur des deux côtés.",
          "On calcule d’abord le côté complet, puis on cherche ce qui manque.",
          `${a} + ${b} = ${total}. Il faut donc ${c} + ? = ${total}. ${total} - ${c} = ${missing}.`,
          `Le nombre manquant est ${missing}.`
        ),
      };
    },
  },

  // ============================================================
  // ALGEBRE_NOMBRE_INCONNU
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_nombre_inconnu_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    text: "Je pense à un nombre. Je lui ajoute 9 et j’obtiens 20. Quel est ce nombre ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Fais l’opération inverse : 20 - 9.",
    explanation: exp(
      "Un nombre inconnu est un nombre que l’on cherche.",
      "On utilise souvent l’opération inverse pour le retrouver.",
      "20 - 9 = 11.",
      "Le nombre cherché est 11."
    ),
    tags: ["cm2", "algebre", "nombre_inconnu"],
  },

  {
    kind: "template",
    id: "cm2_algebre_nombre_inconnu_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 2,
    theme: "neutral",
    hint: "Quand on ajoute, l’opération inverse est soustraire.",
    tags: ["cm2", "algebre", "nombre_inconnu", "template"],
    generate: () => {
      const n = randomInt(8, 30);
      const add = randomInt(4, 15);
      const total = n + add;

      return {
        text: `Je pense à un nombre. Je lui ajoute ${add} et j’obtiens ${total}. Quel est ce nombre ?`,
        format: "short",
        expected: [`${n}`],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre inconnu peut se retrouver avec l’opération inverse.",
          "Comme on a ajouté, on soustrait.",
          `${total} - ${add} = ${n}.`,
          `Le nombre cherché est ${n}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_nombre_inconnu_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_nombre_inconnu",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand on multiplie, l’opération inverse est diviser.",
    tags: ["cm2", "algebre", "nombre_inconnu", "template"],
    generate: () => {
      const n = randomInt(3, 12);
      const mult = randomChoice([2, 3, 4, 5]);
      const total = n * mult;

      return {
        text: `Je pense à un nombre. Je le multiplie par ${mult} et j’obtiens ${total}. Quel est ce nombre ?`,
        format: "short",
        expected: [`${n}`],
        comparator: "number_equal",
        explanation: exp(
          "Un nombre inconnu peut être retrouvé avec une opération inverse.",
          "Comme on a multiplié, on divise.",
          `${total} ÷ ${mult} = ${n}.`,
          `Le nombre cherché est ${n}.`
        ),
      };
    },
  },

  // ============================================================
  // ALGEBRE_SCHEMA_BARRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_schema_barre_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 2,
    theme: "neutral",
    text: "Lina a 18 billes. Noa en a 7 de moins. Combien Noa a-t-il de billes ?",
    format: "short",
    expected: ["11"],
    comparator: "number_equal",
    hint: "Dans un schéma en barres, la barre de Noa est plus courte de 7.",
    explanation: exp(
      "Un schéma en barres aide à représenter les quantités et leurs relations.",
      "Ici, Noa a moins que Lina : on soustrait la différence.",
      "18 - 7 = 11.",
      "Noa a 11 billes."
    ),
    tags: ["cm2", "algebre", "schema_barre", "probleme"],
  },

  {
    kind: "template",
    id: "cm2_algebre_schema_barre_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 3,
    theme: "reunion",
    hint: "Représente le total avec une grande barre, puis enlève la partie connue.",
    tags: ["cm2", "algebre", "schema_barre", "reunion", "template"],
    generate: () => {
      const part1 = randomInt(12, 28);
      const part2 = randomInt(8, 20);
      const total = part1 + part2;

      return {
        text: `Au marché de Saint-Pierre, deux paniers contiennent ensemble ${total} fruits. Le premier panier contient ${part1} fruits. Combien y a-t-il de fruits dans le deuxième panier ?`,
        format: "short",
        expected: [`${part2}`],
        comparator: "number_equal",
        explanation: exp(
          "Un schéma en barres permet de voir le total et les parties.",
          "On connaît le total et une partie, donc on soustrait pour trouver l’autre partie.",
          `${total} - ${part1} = ${part2}.`,
          `Le deuxième panier contient ${part2} fruits.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_schema_barre_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_schema_barre",
    difficulty: 4,
    theme: "neutral",
    hint: "Le total est partagé en parts égales. Cherche la valeur d’une part.",
    tags: ["cm2", "algebre", "schema_barre", "partage", "template"],
    generate: () => {
      const parts = randomChoice([3, 4, 5]);
      const value = randomInt(6, 15);
      const total = parts * value;

      return {
        text: `Un ruban de ${total} cm est partagé en ${parts} morceaux de même longueur. Quelle est la longueur d’un morceau ?`,
        format: "short",
        expected: [`${value}`],
        comparator: "number_equal",
        explanation: exp(
          "Un schéma en barres peut représenter un partage en parts égales.",
          "On divise la longueur totale par le nombre de parts.",
          `${total} ÷ ${parts} = ${value}.`,
          `Chaque morceau mesure ${value} cm.`
        ),
      };
    },
  },

  // ============================================================
  // ALGEBRE_MOTIF
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_motif_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    text: "Observe la suite : 3, 6, 9, 12, ? Quel nombre vient ensuite ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "On ajoute toujours le même nombre.",
    explanation: exp(
      "Un motif évolutif suit une règle qui se répète.",
      "On cherche ce qui change d’un terme au suivant.",
      "On ajoute 3 à chaque fois : 12 + 3 = 15.",
      "Le nombre suivant est 15."
    ),
    tags: ["cm2", "algebre", "motif", "suite"],
  },

  {
    kind: "template",
    id: "cm2_algebre_motif_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche l’écart entre deux nombres voisins.",
    tags: ["cm2", "algebre", "motif", "suite", "template"],
    generate: () => {
      const start = randomInt(2, 12);
      const step = randomChoice([2, 3, 4, 5]);
      const terms = [start, start + step, start + 2 * step, start + 3 * step];
      const next = start + 4 * step;

      return {
        text: `Observe la suite : ${terms.join(", ")}, ? Quel nombre vient ensuite ?`,
        format: "short",
        expected: [`${next}`],
        comparator: "number_equal",
        explanation: exp(
          "Un motif évolutif suit une règle régulière.",
          "On repère l’écart entre deux termes.",
          `On ajoute ${step} à chaque fois. ${terms[3]} + ${step} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_motif_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_motif",
    difficulty: 3,
    theme: "neutral",
    hint: "Le motif peut aussi être une multiplication.",
    tags: ["cm2", "algebre", "motif", "multiplicatif", "template"],
    generate: () => {
      const start = randomChoice([2, 3, 4]);
      const factor = randomChoice([2, 3]);
      const terms = [start, start * factor, start * factor ** 2, start * factor ** 3];
      const next = start * factor ** 4;

      return {
        text: `Observe la suite : ${terms.join(", ")}, ? Quel nombre vient ensuite ?`,
        format: "short",
        expected: [`${next}`],
        comparator: "number_equal",
        explanation: exp(
          "Un motif évolutif peut suivre une règle multiplicative.",
          "On cherche par quel nombre on multiplie à chaque étape.",
          `On multiplie par ${factor} à chaque fois. ${terms[3]} × ${factor} = ${next}.`,
          `Le nombre suivant est ${next}.`
        ),
      };
    },
  },

  // ============================================================
  // ALGEBRE_RELATION
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_relation_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "neutral",
    text: "Dans une machine, on multiplie le nombre d’entrée par 3. Si on entre 7, quel nombre sort ?",
    format: "short",
    expected: ["21"],
    comparator: "number_equal",
    hint: "La règle est : sortie = entrée × 3.",
    explanation: exp(
      "Une relation décrit comment une quantité dépend d’une autre.",
      "On applique la règle donnée au nombre d’entrée.",
      "7 × 3 = 21.",
      "Le nombre qui sort est 21."
    ),
    tags: ["cm2", "algebre", "relation", "machine"],
  },

  {
    kind: "template",
    id: "cm2_algebre_relation_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 3,
    theme: "neutral",
    hint: "Applique la règle à la valeur d’entrée.",
    tags: ["cm2", "algebre", "relation", "machine", "template"],
    generate: () => {
      const mult = randomChoice([2, 3, 4, 5]);
      const input = randomInt(3, 12);
      const output = input * mult;

      return {
        text: `Une machine multiplie le nombre d’entrée par ${mult}. Si on entre ${input}, quel nombre sort ?`,
        format: "short",
        expected: [`${output}`],
        comparator: "number_equal",
        explanation: exp(
          "Une relation donne une règle entre une entrée et une sortie.",
          "On applique la règle au nombre d’entrée.",
          `${input} × ${mult} = ${output}.`,
          `Le nombre qui sort est ${output}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_relation_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_relation",
    difficulty: 4,
    theme: "neutral",
    hint: "La règle contient deux étapes : multiplier puis ajouter.",
    tags: ["cm2", "algebre", "relation", "machine", "template"],
    generate: () => {
      const mult = randomChoice([2, 3, 4]);
      const add = randomInt(2, 9);
      const input = randomInt(3, 10);
      const output = input * mult + add;

      return {
        text: `Une machine multiplie le nombre d’entrée par ${mult}, puis ajoute ${add}. Si on entre ${input}, quel nombre sort ?`,
        format: "short",
        expected: [`${output}`],
        comparator: "number_equal",
        explanation: exp(
          "Une relation peut contenir plusieurs étapes.",
          "On respecte l’ordre des opérations données par la machine.",
          `${input} × ${mult} = ${input * mult}, puis ${input * mult} + ${add} = ${output}.`,
          `Le nombre qui sort est ${output}.`
        ),
      };
    },
  },

  // ============================================================
  // ALGEBRE_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_algebre_defi_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Défi : un nombre multiplié par 4 donne 36. Quel est ce nombre ?",
    format: "short",
    expected: ["9"],
    comparator: "number_equal",
    hint: "Utilise l’opération inverse de × 4.",
    explanation: exp(
      "Un défi d’algèbre demande souvent de retrouver une valeur inconnue.",
      "On utilise l’opération inverse.",
      "36 ÷ 4 = 9.",
      "Le nombre cherché est 9."
    ),
    tags: ["cm2", "algebre", "defi", "nombre_inconnu"],
  },

  {
    kind: "template",
    id: "cm2_algebre_defi_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Traduis la phrase en calcul, puis utilise une opération inverse.",
    tags: ["cm2", "algebre", "defi", "template"],
    generate: () => {
      const n = randomInt(5, 15);
      const mult = randomChoice([2, 3, 4, 5]);
      const add = randomInt(2, 8);
      const result = n * mult + add;

      return {
        text: `Défi : je pense à un nombre. Je le multiplie par ${mult}, puis j’ajoute ${add}. J’obtiens ${result}. Quel est ce nombre ?`,
        format: "short",
        expected: [`${n}`],
        comparator: "number_equal",
        explanation: exp(
          "Pour retrouver un nombre inconnu, on peut remonter les opérations à l’envers.",
          "On enlève d’abord ce qui a été ajouté, puis on divise.",
          `${result} - ${add} = ${n * mult}, puis ${n * mult} ÷ ${mult} = ${n}.`,
          `Le nombre cherché est ${n}.`
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_algebre_defi_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "algebre",
    microId: "algebre_defi",
    difficulty: 5,
    theme: "reunion",
    hint: "Cherche d’abord la règle, puis applique-la.",
    tags: ["cm2", "algebre", "defi", "reunion", "template"],
    generate: () => {
      const price = randomChoice([3, 4, 5]);
      const fee = randomChoice([2, 3, 4]);
      const qty = randomInt(4, 9);
      const total = qty * price + fee;

      return {
        text: `Défi marché : chaque jus coûte ${price} €. Le vendeur ajoute ${fee} € pour le sac isotherme. Une famille paie ${total} €. Combien de jus a-t-elle achetés ?`,
        format: "short",
        expected: [`${qty}`],
        comparator: "number_equal",
        explanation: exp(
          "Un défi d’algèbre peut décrire une relation entre une quantité et un total.",
          "On retire d’abord le coût fixe, puis on divise par le prix d’un objet.",
          `${total} - ${fee} = ${qty * price}, puis ${qty * price} ÷ ${price} = ${qty}.`,
          `La famille a acheté ${qty} jus.`
        ),
      };
    },
  },
];