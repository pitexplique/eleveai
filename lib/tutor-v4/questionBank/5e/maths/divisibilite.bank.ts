// Multiples, diviseurs et divisibilité (5e).
// Écrit le 04/08/2026 : les critères de divisibilité étaient au programme et
// n'existaient nulle part. Ils servent juste après, pour simplifier une
// fraction sans tâtonner.
//
// LaTeX : réservé aux fractions, où l'empilement se lit mieux qu'un « 24/36 ».
// Les entiers et les critères restent en texte brut. ⚠️ Les `expected` sont
// TOUJOURS en brut : c'est ce que l'élève tape.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function frac(n: number, d: number) {
  return `$\\dfrac{${n}}{${d}}$`;
}

function sommeChiffres(n: number) {
  return String(n)
    .split("")
    .reduce((s, c) => s + Number(c), 0);
}

function diviseurs(n: number) {
  const out: number[] = [];
  for (let i = 1; i <= n; i += 1) if (n % i === 0) out.push(i);
  return out;
}

function expl(calcul: string) {
  return (
    "Définition : un nombre est divisible par un autre quand la division tombe juste, sans reste.\n\n" +
    "Méthode : on utilise un critère de divisibilité, ou on pose la division pour vérifier le reste.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : le nombre trouvé répond à la question."
  );
}

export const divisibiliteBank: TutorBankItemV4[] = [
  /* ===== DIV_MULTIPLE_DIVISEUR ===== */
  {
    kind: "fixed",
    id: "div_multiple_diviseur_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 1,
    theme: "neutral",
    text: "On sait que 7 × 6 = 42. Complète : 42 est un ... de 7.",
    format: "qcm",
    choices: ["multiple", "diviseur", "quotient", "reste"],
    expected: ["multiple"],
    comparator: "mcq_exact",
    hint: "Le grand nombre est le multiple, les petits sont les diviseurs.",
    explanation: expl(
      "42 s’obtient en multipliant 7 par 6 : c’est donc un multiple de 7. Dans l’autre sens, 7 est un diviseur de 42. Un même calcul se lit dans les deux sens.",
    ),
    tags: ["divisibilite", "vocabulaire", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_multiple_diviseur_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel nombre est à la fois un diviseur de TOUS les nombres entiers ? Réponds par un nombre.",
    format: "short",
    expected: ["1"],
    comparator: "number_equal",
    hint: "Par quoi peut-on toujours diviser sans reste ?",
    explanation: expl(
      "Tout nombre entier se divise par 1 sans reste, puisque n ÷ 1 = n. Le nombre 1 est donc un diviseur de tous les entiers — et le seul dans ce cas.",
    ),
    tags: ["divisibilite", "remarquable"],
  },
  {
    kind: "fixed",
    id: "div_multiple_diviseur_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 4,
    theme: "neutral",
    text: "Zéro est-il un multiple de 7 ?",
    format: "qcm",
    choices: ["oui", "non", "seulement si on compte 0 comme entier", "on ne peut pas dire"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Existe-t-il un nombre qui, multiplié par 7, donne 0 ?",
    explanation: expl(
      "7 × 0 = 0. Zéro s’obtient donc en multipliant 7 par un entier : c’est un multiple de 7. C’est même un multiple de tous les nombres, ce qui surprend souvent.",
    ),
    tags: ["divisibilite", "piege", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_multiple_diviseur_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la différence entre « multiple de 5 » et « diviseur de 5 ».",
    format: "open",
    expected: ["table", "multipliant", "multiplie", "plus grand", "plus petit", "divise"],
    comparator: "contains_keyword",
    hint: "L’un est plus grand que 5, l’autre plus petit.",
    explanation: expl(
      "Les multiples de 5 sont les nombres de sa table : 0, 5, 10, 15, 20… Ils sont plus grands que 5 (sauf 0 et 5 lui-même). Les diviseurs de 5 sont les nombres qui divisent 5 sans reste : 1 et 5, donc pas plus grands que 5.",
    ),
    tags: ["divisibilite", "open", "vocabulaire"],
  },
  {
    kind: "template",
    id: "div_multiple_diviseur_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 2,
    theme: "neutral",
    hint: "Pose la division : si le reste est zéro, c’est un multiple.",
    tags: ["divisibilite", "template"],
    generate: () => {
      const d = randomChoice([3, 4, 6, 7, 8, 9]);
      const multiple = randomChoice([true, true, false]);
      const n = multiple ? d * randomChoice([4, 6, 7, 9, 12]) : d * randomChoice([4, 6, 7, 9]) + randomChoice([1, 2]);
      return {
        text: `Le nombre ${n} est-il un multiple de ${d} ?`,
        format: "qcm",
        choices: makeChoices(multiple ? "oui" : "non", ["oui", "non", "seulement s’il est pair", "on ne peut pas savoir"]),
        expected: [multiple ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          multiple
            ? `${n} ÷ ${d} = ${n / d}, le reste est nul : ${n} est bien un multiple de ${d}.`
            : `${n} ÷ ${d} donne ${Math.floor(n / d)} et il reste ${n % d}. Le reste n’est pas nul : ${n} n’est pas un multiple de ${d}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_multiple_diviseur_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_multiple_diviseur",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis dans quel sens tu lis la multiplication.",
    tags: ["divisibilite", "open", "template"],
    generate: () => {
      const a = randomChoice([4, 6, 7, 8, 9]);
      const b = randomChoice([5, 7, 8, 9, 12]);
      return {
        text: `On sait que ${a} × ${b} = ${a * b}. Explique ce que cette égalité apprend sur les multiples et les diviseurs de ${a * b}.`,
        format: "open",
        expected: ["multiple", "diviseur", String(a), String(b)],
        comparator: "contains_keyword",
        explanation: expl(
          `${a * b} s’obtient en multipliant ${a} par ${b} : c’est donc un multiple de ${a} et un multiple de ${b}. ` +
            `Lue dans l’autre sens, la même égalité dit que ${a} et ${b} sont deux diviseurs de ${a * b}.`,
        ),
      };
    },
  },

  /* ===== DIV_CRITERE_2_5_10 ===== */
  {
    kind: "fixed",
    id: "div_critere_2_5_10_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 1,
    theme: "neutral",
    text: "Un nombre est divisible par 2 quand son chiffre des unités est...",
    format: "qcm",
    choices: [
      "0, 2, 4, 6 ou 8",
      "0 ou 5",
      "0 seulement",
      "n’importe lequel",
    ],
    expected: ["0, 2, 4, 6 ou 8"],
    comparator: "mcq_exact",
    hint: "Ce sont les nombres pairs.",
    explanation: expl(
      "Un nombre est divisible par 2 s’il est pair, c’est-à-dire si son chiffre des unités est 0, 2, 4, 6 ou 8. Il suffit de regarder le dernier chiffre, quelle que soit la taille du nombre.",
    ),
    tags: ["divisibilite", "critere", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_2_5_10_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    text: "Un nombre se termine par 0. Par lesquels de ces nombres est-il forcément divisible ?",
    format: "qcm",
    choices: ["par 2, par 5 et par 10", "par 5 seulement", "par 10 seulement", "par 3 et par 9"],
    expected: ["par 2, par 5 et par 10"],
    comparator: "mcq_exact",
    hint: "Le zéro final est le seul chiffre qui coche les trois critères à la fois.",
    explanation: expl(
      "Un nombre terminé par 0 est pair, donc divisible par 2. Il se termine par 0 ou 5, donc divisible par 5. Et il se termine par 0, donc divisible par 10. C’est le seul chiffre des unités qui satisfait les trois critères en même temps.",
    ),
    tags: ["divisibilite", "critere", "remarquable", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_2_5_10_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 375 est-il divisible par 2 ?",
    format: "qcm",
    choices: ["non", "oui", "oui, car il est divisible par 5", "on ne peut pas savoir sans poser la division"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Ne regarde que le dernier chiffre.",
    explanation: expl(
      "Le chiffre des unités de 375 est 5 : le nombre est impair, donc pas divisible par 2. Attention au piège — 375 est bien divisible par 5, mais cela ne dit rien sur 2.",
    ),
    tags: ["divisibilite", "critere", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_2_5_10_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi il suffit de regarder le dernier chiffre pour savoir si un nombre est divisible par 5.",
    format: "open",
    expected: ["dizaine", "0", "5", "reste", "unités", "unites"],
    comparator: "contains_keyword",
    hint: "Une dizaine entière, est-elle divisible par 5 ?",
    explanation: expl(
      "Toutes les dizaines sont déjà divisibles par 5 : 10, 20, 30… se partagent en parts de 5 sans reste. Ce qui décide, c’est donc uniquement ce qui reste après les dizaines, c’est-à-dire le chiffre des unités. Il doit être 0 ou 5.",
    ),
    tags: ["divisibilite", "critere", "open", "raisonnement"],
  },
  {
    kind: "template",
    id: "div_critere_2_5_10_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde le chiffre des unités, rien d’autre.",
    tags: ["divisibilite", "critere", "template"],
    generate: () => {
      const n = randomChoice([124, 235, 350, 468, 507, 690, 723, 845, 916, 1250]);
      const par = randomChoice([2, 5, 10]);
      const oui = n % par === 0;
      const unite = n % 10;
      return {
        text: `Le nombre ${n} est-il divisible par ${par} ? Regarde son chiffre des unités.`,
        format: "qcm",
        choices: makeChoices(oui ? "oui" : "non", ["oui", "non", "seulement si on ajoute 1", "on ne peut pas savoir"]),
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `Le chiffre des unités de ${n} est ${unite}. ` +
            (par === 2
              ? `Pour être divisible par 2, il faut 0, 2, 4, 6 ou 8 : ${oui ? "c’est le cas" : "ce n’est pas le cas"}.`
              : par === 5
                ? `Pour être divisible par 5, il faut 0 ou 5 : ${oui ? "c’est le cas" : "ce n’est pas le cas"}.`
                : `Pour être divisible par 10, il faut 0 : ${oui ? "c’est le cas" : "ce n’est pas le cas"}.`),
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_2_5_10_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_2_5_10",
    difficulty: 3,
    theme: "neutral",
    hint: "Nomme le critère que tu utilises avant de conclure.",
    tags: ["divisibilite", "critere", "open", "template"],
    generate: () => {
      const n = randomChoice([130, 245, 372, 480, 615, 728, 890]);
      return {
        text: `Sans poser aucune division, dis par lesquels de 2, 5 et 10 le nombre ${n} est divisible. Explique.`,
        format: "open",
        expected: ["unités", "unites", "dernier chiffre", String(n % 10), "pair"],
        comparator: "contains_keyword",
        explanation: expl(
          `Le chiffre des unités de ${n} est ${n % 10}. ` +
            `Divisible par 2 : ${n % 2 === 0 ? "oui" : "non"}. Par 5 : ${n % 5 === 0 ? "oui" : "non"}. Par 10 : ${n % 10 === 0 ? "oui" : "non"}. ` +
            "Le dernier chiffre suffit pour les trois critères.",
        ),
      };
    },
  },

  /* ===== DIV_CRITERE_3_9 ===== */
  {
    kind: "fixed",
    id: "div_critere_3_9_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 2,
    theme: "neutral",
    text: "Un nombre est divisible par 3 quand...",
    format: "qcm",
    choices: [
      "la somme de ses chiffres est divisible par 3",
      "son dernier chiffre est 3, 6 ou 9",
      "il est impair",
      "son premier chiffre est divisible par 3",
    ],
    expected: ["la somme de ses chiffres est divisible par 3"],
    comparator: "mcq_exact",
    hint: "Ce critère-là ne regarde pas un seul chiffre, mais tous.",
    explanation: expl(
      "Pour 3, on additionne TOUS les chiffres du nombre. Si cette somme est divisible par 3, le nombre l’est aussi. Le dernier chiffre ne dit rien : 13 se termine par 3 mais n’est pas divisible par 3.",
    ),
    tags: ["divisibilite", "critere", "propriete", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_3_9_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 13 se termine par 3. Est-il divisible par 3 ?",
    format: "qcm",
    choices: ["non", "oui", "oui, car il se termine par 3", "on ne peut pas savoir"],
    expected: ["non"],
    comparator: "mcq_exact",
    hint: "Additionne les chiffres au lieu de regarder le dernier.",
    explanation: expl(
      "1 + 3 = 4, et 4 n’est pas divisible par 3 : le nombre 13 ne l’est pas non plus. Se terminer par 3 ne prouve rien — c’est le piège que ce critère tend chaque année.",
    ),
    tags: ["divisibilite", "critere", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_3_9_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    text: "Un nombre est divisible par 9. Est-il forcément divisible par 3 ?",
    format: "qcm",
    choices: ["oui", "non", "seulement s’il est pair", "on ne peut pas savoir"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "9 se partage lui-même en parts de 3.",
    explanation: expl(
      "Si la somme des chiffres est divisible par 9, elle l’est aussi par 3, puisque 9 = 3 × 3. Tout multiple de 9 est donc un multiple de 3. L’inverse est faux : 6 est divisible par 3 mais pas par 9.",
    ),
    tags: ["divisibilite", "critere", "raisonnement", "qcm"],
  },
  {
    kind: "fixed",
    id: "div_critere_3_9_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment savoir si 4 152 est divisible par 3, sans poser la division.",
    format: "open",
    expected: ["somme", "additionne", "12", "chiffres"],
    comparator: "contains_keyword",
    hint: "Additionne les quatre chiffres.",
    explanation: expl(
      "On additionne tous les chiffres : 4 + 1 + 5 + 2 = 12. Comme 12 est dans la table de 3, le nombre 4 152 est divisible par 3. Si la somme reste grande, on peut recommencer sur elle : 1 + 2 = 3.",
    ),
    tags: ["divisibilite", "critere", "open", "methode"],
  },
  {
    kind: "template",
    id: "div_critere_3_9_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 3,
    theme: "neutral",
    hint: "Additionne les chiffres, puis regarde la somme.",
    tags: ["divisibilite", "critere", "template"],
    generate: () => {
      const n = randomChoice([123, 234, 341, 405, 517, 621, 738, 842, 936, 1251]);
      const par = randomChoice([3, 9]);
      const s = sommeChiffres(n);
      const oui = n % par === 0;
      return {
        text: `Le nombre ${n} est-il divisible par ${par} ?`,
        format: "qcm",
        choices: makeChoices(oui ? "oui" : "non", ["oui", "non", "seulement s’il est pair", "on ne peut pas savoir"]),
        expected: [oui ? "oui" : "non"],
        comparator: "mcq_exact",
        explanation: expl(
          `Somme des chiffres de ${n} : ${String(n).split("").join(" + ")} = ${s}. ` +
            `${s} ${oui ? "est" : "n’est pas"} divisible par ${par}, donc ${n} ${oui ? "l’est" : "ne l’est pas"} non plus.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_critere_3_9_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_critere_3_9",
    difficulty: 4,
    theme: "neutral",
    hint: "Dis ce que tu additionnes, puis ce que tu regardes.",
    tags: ["divisibilite", "critere", "open", "template"],
    generate: () => {
      const n = randomChoice([126, 315, 432, 549, 657, 828, 945]);
      const s = sommeChiffres(n);
      return {
        text: `Explique comment savoir, sans poser de division, si ${n} est divisible par 9.`,
        format: "open",
        expected: ["somme", "additionne", String(s), "chiffres"],
        comparator: "contains_keyword",
        explanation: expl(
          `On additionne les chiffres : ${String(n).split("").join(" + ")} = ${s}. ` +
            `${s} est dans la table de 9, donc ${n} est divisible par 9.`,
        ),
      };
    },
  },

  /* ===== DIV_LISTER_DIVISEURS ===== */
  {
    kind: "fixed",
    id: "div_lister_diviseurs_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 3,
    theme: "neutral",
    text: "Combien 12 a-t-il de diviseurs en tout ? Réponds par un nombre.",
    format: "short",
    expected: ["6"],
    comparator: "number_equal",
    hint: "Cherche-les par paires : 1 et 12, 2 et 6…",
    explanation: expl(
      "On cherche par paires : 1 × 12, 2 × 6, 3 × 4. Cela donne 1, 2, 3, 4, 6 et 12, soit 6 diviseurs. Chercher par paires évite d’en oublier.",
    ),
    tags: ["divisibilite", "diviseurs"],
  },
  {
    kind: "fixed",
    id: "div_lister_diviseurs_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    text: "Combien le nombre 7 a-t-il de diviseurs ? Réponds par un nombre.",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "Essaie 1, 2, 3… jusqu’à 7.",
    explanation: expl(
      "Seuls 1 et 7 divisent 7 sans reste. Il a donc exactement 2 diviseurs. Les nombres qui n’en ont que deux portent un nom : on les appelle des nombres premiers.",
    ),
    tags: ["divisibilite", "diviseurs", "remarquable", "premier"],
  },
  {
    kind: "fixed",
    id: "div_lister_diviseurs_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 5,
    theme: "neutral",
    text: "Quel est le plus grand diviseur commun à 24 et 36 ? Réponds par un nombre.",
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Liste les diviseurs de chacun, puis compare.",
    explanation: expl(
      "Diviseurs de 24 : 1, 2, 3, 4, 6, 8, 12, 24. Diviseurs de 36 : 1, 2, 3, 4, 6, 9, 12, 18, 36. Les diviseurs communs sont 1, 2, 3, 4, 6 et 12 : le plus grand est 12.",
    ),
    tags: ["divisibilite", "diviseurs", "commun"],
  },
  {
    kind: "fixed",
    id: "div_lister_diviseurs_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    text: "Explique une méthode sûre pour trouver TOUS les diviseurs d’un nombre sans en oublier.",
    format: "open",
    expected: ["paire", "couple", "1", "ordre", "essaie", "essaye"],
    comparator: "contains_keyword",
    hint: "Chaque diviseur en amène un autre.",
    explanation: expl(
      "On essaie dans l’ordre : 1, puis 2, puis 3… Chaque fois que la division tombe juste, on note DEUX diviseurs d’un coup : celui qu’on essaie et le quotient obtenu. Pour 18 : 1 et 18, 2 et 9, 3 et 6. On s’arrête quand les deux nombres de la paire se rejoignent.",
    ),
    tags: ["divisibilite", "diviseurs", "open", "methode"],
  },
  {
    kind: "template",
    id: "div_lister_diviseurs_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche par paires : 1 et le nombre, 2 et sa moitié…",
    tags: ["divisibilite", "diviseurs", "template"],
    generate: () => {
      const n = randomChoice([16, 18, 20, 24, 28, 30, 36, 40, 45]);
      const liste = diviseurs(n);
      return {
        text: `Combien le nombre ${n} a-t-il de diviseurs en tout ? Réponds par un nombre.`,
        format: "short",
        expected: [String(liste.length)],
        comparator: "number_equal",
        explanation: expl(
          `Les diviseurs de ${n} sont : ${liste.join(", ")}. Il y en a ${liste.length}. ` +
            "En les cherchant par paires, on n’en oublie aucun.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_lister_diviseurs_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_lister_diviseurs",
    difficulty: 5,
    theme: "neutral",
    hint: "Dis quelles paires tu trouves, dans l’ordre.",
    tags: ["divisibilite", "diviseurs", "open", "template"],
    generate: () => {
      const n = randomChoice([24, 30, 32, 42, 48]);
      const liste = diviseurs(n);
      return {
        text: `Explique comment tu trouves tous les diviseurs de ${n}.`,
        format: "open",
        expected: ["paire", "couple", "1", String(n), "ordre"],
        comparator: "contains_keyword",
        explanation: expl(
          `On essaie dans l’ordre et on note les paires : ${liste
            .slice(0, Math.ceil(liste.length / 2))
            .map((d) => `${d} et ${n / d}`)
            .join(", ")}. ` + `Au total : ${liste.join(", ")}.`,
        ),
      };
    },
  },

  /* ===== DIV_DEFI =====
     C'est ici que la divisibilité sert à quelque chose : simplifier une
     fraction sans tâtonner. Les fractions passent en LaTeX, l'empilement se
     lit mieux qu'un « 24/36 » ; les réponses restent en texte brut. */
  {
    kind: "fixed",
    id: "div_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    text: `Par quel nombre peut-on simplifier ${frac(24, 36)} d’un seul coup, pour arriver directement au résultat le plus simple ? Réponds par un nombre.`,
    format: "short",
    expected: ["12"],
    comparator: "number_equal",
    hint: "Cherche le plus grand diviseur commun aux deux nombres.",
    explanation: expl(
      "24 et 36 sont tous deux divisibles par 2, 3, 4, 6 et 12. Le plus grand est 12 : 24 ÷ 12 = 2 et 36 ÷ 12 = 3. On arrive d’un coup à 2/3, sans passer par des étapes intermédiaires.",
    ),
    tags: ["divisibilite", "defi", "fraction", "latex"],
  },
  {
    kind: "fixed",
    id: "div_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un professeur du collège de Saint-Benoît veut répartir 36 élèves en groupes de même taille, sans laisser personne de côté et sans faire un seul groupe géant. Combien de tailles de groupes différentes sont possibles ? Réponds par un nombre.",
    format: "short",
    expected: ["7"],
    comparator: "number_equal",
    hint: "Ce sont les diviseurs de 36, sauf 36 lui-même.",
    explanation: expl(
      "Les diviseurs de 36 sont 1, 2, 3, 4, 6, 9, 12, 18 et 36. On écarte 36, qui ferait un seul groupe de toute la classe. Il reste 8 possibilités… mais des groupes de 1 élève ne sont pas des groupes : on écarte aussi 1. Restent 2, 3, 4, 6, 9, 12 et 18, soit 7 tailles possibles.",
    ),
    tags: ["divisibilite", "defi", "reunion", "diviseurs"],
  },
  {
    kind: "fixed",
    id: "div_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    text: `Un élève simplifie ${frac(35, 40)} en ${frac(7, 8)}. Explique par quoi il a divisé, et comment il pouvait le trouver sans essayer au hasard.`,
    format: "open",
    expected: ["5", "unités", "unites", "0 ou 5", "critère", "critere", "termine"],
    comparator: "contains_keyword",
    hint: "Regarde le chiffre des unités des deux nombres.",
    explanation: expl(
      "Il a divisé les deux nombres par 5 : 35 ÷ 5 = 7 et 40 ÷ 5 = 8. Le critère le donnait tout de suite — 35 se termine par 5 et 40 par 0, donc les deux sont divisibles par 5. Le critère évite de tâtonner.",
    ),
    tags: ["divisibilite", "defi", "open", "fraction", "latex"],
  },
  {
    kind: "template",
    id: "div_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Cherche le plus grand nombre qui divise les deux à la fois.",
    tags: ["divisibilite", "defi", "fraction", "template", "latex"],
    generate: () => {
      const g = randomChoice([4, 5, 6, 8, 9, 12]);
      const a = g * randomChoice([2, 3, 5, 7]);
      const b = g * randomChoice([3, 4, 7, 11]);
      // Le facteur commun tiré doit être LE plus grand, sinon la réponse
      // attendue serait fausse : on le recalcule pour de bon.
      let pgcd = 1;
      for (let i = 1; i <= Math.min(a, b); i += 1) if (a % i === 0 && b % i === 0) pgcd = i;
      return {
        text: `Par quel nombre faut-il diviser en haut et en bas pour simplifier ${frac(a, b)} en une seule étape ? Réponds par un nombre.`,
        format: "short",
        expected: [String(pgcd)],
        comparator: "number_equal",
        explanation: expl(
          `Le plus grand nombre qui divise à la fois ${a} et ${b} est ${pgcd}. ` +
            `On obtient ${a} ÷ ${pgcd} = ${a / pgcd} en haut et ${b} ÷ ${pgcd} = ${b / pgcd} en bas, soit ${a / pgcd}/${b / pgcd}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "div_defi_tpl_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "divisibilite",
    microId: "div_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Nomme le critère qui te met sur la piste.",
    tags: ["divisibilite", "defi", "open", "template", "latex"],
    generate: () => {
      const cas = randomChoice([
        { a: 18, b: 27, par: 9, critere: "la somme des chiffres de chacun est dans la table de 9 (1 + 8 = 9 et 2 + 7 = 9)" },
        { a: 25, b: 45, par: 5, critere: "les deux se terminent par 5" },
        { a: 14, b: 21, par: 7, critere: "les deux sont dans la table de 7" },
        { a: 30, b: 42, par: 6, critere: "les deux sont pairs et la somme de leurs chiffres est divisible par 3" },
      ]);
      return {
        text: `Explique par quoi tu peux simplifier ${frac(cas.a, cas.b)}, et comment tu le vois sans essayer au hasard.`,
        format: "open",
        expected: [String(cas.par), "critère", "critere", "somme", "termine", "table"],
        comparator: "contains_keyword",
        explanation: expl(
          `On divise par ${cas.par}, parce que ${cas.critere}. ` +
            `On obtient ${cas.a / cas.par}/${cas.b / cas.par}.`,
        ),
      };
    },
  },
];
