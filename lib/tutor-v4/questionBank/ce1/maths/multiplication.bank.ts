// lib/tutor-v4/questionBank/ce1/maths/multiplication.bank.ts
//
// La multiplication du CE1, écrite à la main.
//
// PÉRIMÈTRE BO (Annexe 4, programme de mathématiques du cycle 2) :
//   — comprendre la multiplication comme une addition répétée, et le mot
//     « fois » avant le symbole ;
//   — comprendre et utiliser le symbole « × », plus court que l'addition
//     répétée : le programme donne « 7 × 20 biscuits = 140 biscuits » ;
//   — savoir que la multiplication est COMMUTATIVE — huit colonnes de quatre
//     salades, ou quatre rangées de huit, c'est le même potager ;
//   — connaître la notion de PARITÉ : dire si un nombre est pair ou impair ;
//   — les tables s'apprennent toute l'année, progressivement. La mémorisation
//     peut être encore imparfaite en fin de CE1, elle sera renforcée au CE2.
//   — il n'y a PAS de multiplication posée au CE1.
//
// LE PIÈGE DE LA NOTION : confondre les deux nombres d'un produit. « 3 paquets
// de 7 biscuits » ne se lit pas « 7 paquets de 3 biscuits » — même résultat,
// mais pas la même histoire. C'est justement ce que la commutativité permet de
// comprendre, à condition de l'avoir vue.
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

export const multiplicationBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_MULTIPLICATION_SENS — une addition répétée
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_sens_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_sens",
    difficulty: 2,
    theme: "neutral",
    text: "Jan a 3 paquets de biscuits. Chaque paquet contient 20 biscuits. Quelle addition permet de trouver le total ?",
    format: "qcm",
    choices: [
      "20 + 20 + 20",
      "3 + 20",
      "3 + 3 + 3",
      "20 + 3 + 20",
    ],
    expected: ["20 + 20 + 20"],
    comparator: "mcq_exact",
    hint: "On répète le contenu d'un paquet, autant de fois qu'il y a de paquets.",
    explanation: exp(
      "Multiplier, c'est additionner plusieurs fois la même quantité.",
      "On repère ce qui se répète — ici le contenu d'un paquet — et combien de fois il se répète.",
      "Il y a 3 paquets de 20 biscuits : on ajoute 20 trois fois, soit 20 + 20 + 20 = 60. On dit « trois fois vingt ».",
      "C'est 20 + 20 + 20.",
    ),
    tags: ["ce1", "multiplication", "sens", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_sens_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_sens",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois la même quantité se répète.",
    tags: ["ce1", "multiplication", "sens", "template"],
    generate: () => {
      const combien = randomInt(3, 6);
      const dans = randomInt(3, 9);
      const total = combien * dans;
      const contexte = randomChoice([
        { contenant: "paquets", contenu: "gâteaux" },
        { contenant: "boites", contenu: "œufs" },
        { contenant: "sachets", contenu: "billes" },
        { contenant: "barquettes", contenu: "letchis" },
      ]);
      return {
        text: `Il y a ${combien} ${contexte.contenant} de ${dans} ${contexte.contenu}. Combien de ${contexte.contenu} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier, c'est additionner plusieurs fois la même quantité.",
          "On répète le contenu d'un contenant autant de fois qu'il y a de contenants.",
          `${Array.from({ length: combien }, () => dans).join(" + ")} = ${total}. On écrit plus vite ${combien} × ${dans} = ${total}.`,
          `Il y a ${total} ${contexte.contenu}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MULTIPLICATION_SYMBOLE — le signe ×
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_symbole_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_symbole",
    difficulty: 1,
    theme: "neutral",
    text: "Comment lit-on le symbole × dans 4 × 5 ?",
    format: "qcm",
    choices: ["fois", "plus", "moins", "égale"],
    expected: ["fois"],
    comparator: "mcq_exact",
    hint: "Quatre… cinq.",
    explanation: exp(
      "Le symbole × se lit « fois » : il annonce une addition répétée.",
      "On lit le premier nombre, puis « fois », puis le second.",
      "4 × 5 se lit « quatre fois cinq », c'est-à-dire 5 + 5 + 5 + 5 = 20.",
      "Le symbole × se lit « fois ».",
    ),
    tags: ["ce1", "multiplication", "symbole", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_symbole_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_symbole",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte combien de fois le nombre est répété.",
    tags: ["ce1", "multiplication", "symbole", "template"],
    generate: () => {
      const fois = randomInt(3, 6);
      const nombre = randomChoice([2, 3, 5, 10, 20] as const);
      const somme = Array.from({ length: fois }, () => nombre).join(" + ");
      const bonne = `${fois} × ${nombre}`;
      return {
        text: `Comment écrit-on ${somme} avec le symbole × ?`,
        format: "qcm",
        // ⚠️ Pièges choisis pour ne JAMAIS coïncider entre eux. La première
        // version écrivait « nombre × nombre » et « fois × fois » : quand les
        // deux valeurs tombaient égales, un piège doublonnait l'autre ET la
        // bonne réponse, et le QCM sortait à trois lignes sur 21 % des tirages.
        choices: makeChoices(bonne, [
          `${fois} + ${nombre}`,
          `${fois + 1} × ${nombre}`,
          `${fois} × ${nombre + 1}`,
          `${fois + nombre} × ${nombre}`,
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Le symbole × remplace une addition qui répète toujours le même nombre.",
          "On compte combien de fois le nombre est répété, puis on écrit ce compte, le signe ×, et le nombre.",
          `${nombre} est répété ${fois} fois : cela s'écrit ${bonne}, et cela fait ${fois * nombre}.`,
          `On écrit ${bonne}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MULTIPLICATION_COMMUTATIVITE — l'ordre ne change rien
     Le programme le montre par le potager : huit colonnes de
     quatre salades, ou quatre rangées de huit.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_commutativite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 3,
    theme: "neutral",
    text: "Un potager a 8 colonnes de 4 salades. On peut aussi le voir comme 4 rangées de 8 salades. Que peut-on en conclure ?",
    format: "qcm",
    choices: [
      "8 × 4 et 4 × 8 donnent le même résultat",
      "8 × 4 est plus grand que 4 × 8",
      "il faut recompter à chaque fois",
      "les deux ne sont pas comparables",
    ],
    expected: ["8 × 4 et 4 × 8 donnent le même résultat"],
    comparator: "mcq_exact",
    hint: "C'est le même potager, regardé dans l'autre sens.",
    explanation: exp(
      "Dans une multiplication, on peut échanger les deux nombres sans changer le résultat.",
      "On regarde la même collection dans les deux sens : en colonnes, puis en rangées.",
      "Les salades ne bougent pas, seul le regard change : 8 × 4 = 32 et 4 × 8 = 32. Cela s'appelle la commutativité.",
      "8 × 4 et 4 × 8 donnent le même résultat.",
    ),
    tags: ["ce1", "multiplication", "commutativite", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_multiplication_commutativite_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 4,
    theme: "neutral",
    text: "Est-ce que 12 - 5 et 5 - 12 donnent aussi le même résultat ?",
    format: "qcm",
    choices: [
      "non, seule la multiplication permet d'échanger les nombres",
      "oui, l'ordre ne change jamais rien",
      "oui, mais seulement avec des petits nombres",
      "on ne peut pas savoir",
    ],
    expected: ["non, seule la multiplication permet d'échanger les nombres"],
    comparator: "mcq_exact",
    hint: "Peut-on enlever 12 à 5 ?",
    explanation: exp(
      "L'addition et la multiplication permettent d'échanger les nombres ; la soustraction, non.",
      "On essaie dans les deux sens et on regarde si l'opération a encore un sens.",
      "12 - 5 = 7, mais on ne peut pas enlever 12 à 5 au CE1. En revanche 3 × 4 = 4 × 3, et 3 + 4 = 4 + 3.",
      "Non : seules l'addition et la multiplication permettent d'échanger les nombres.",
    ),
    tags: ["ce1", "multiplication", "commutativite", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_commutativite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_commutativite",
    difficulty: 3,
    theme: "neutral",
    hint: "Échange les deux nombres : le résultat ne bouge pas.",
    tags: ["ce1", "multiplication", "commutativite", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      let b = randomInt(2, 10);
      if (b === a) b = a === 10 ? 2 : a + 1;
      const produit = a * b;
      return {
        text: `On sait que ${a} × ${b} = ${produit}. Que vaut ${b} × ${a} ?`,
        format: "short",
        expected: [String(produit)],
        comparator: "number_equal",
        explanation: exp(
          "Dans une multiplication, l'ordre des deux nombres ne change pas le résultat.",
          "On relit l'égalité connue à l'envers, au lieu de recalculer.",
          `${a} rangées de ${b} ou ${b} rangées de ${a}, cela fait le même nombre d'objets : ${produit}.`,
          `${b} × ${a} = ${produit}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_NOMBRE_PARITE — pair ou impair
     Le programme demande aussi de donner tous les nombres
     pairs entre deux bornes.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_parite_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 2,
    theme: "neutral",
    text: "Comment reconnaît-on qu'un nombre est PAIR ?",
    format: "qcm",
    choices: [
      "son chiffre des unités est 0, 2, 4, 6 ou 8",
      "il est plus grand que 10",
      "son premier chiffre est pair",
      "on peut le couper en trois parts égales",
    ],
    expected: ["son chiffre des unités est 0, 2, 4, 6 ou 8"],
    comparator: "mcq_exact",
    hint: "Regarde seulement le dernier chiffre.",
    explanation: exp(
      "Un nombre pair peut se partager en deux parts égales, sans reste.",
      "On regarde uniquement le chiffre des unités, celui tout à droite.",
      "Si ce chiffre est 0, 2, 4, 6 ou 8, le nombre est pair. 348 est pair à cause du 8, même si 3 est impair.",
      "Son chiffre des unités est 0, 2, 4, 6 ou 8.",
    ),
    tags: ["ce1", "multiplication", "parite", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce1_parite_fixed_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 4,
    theme: "neutral",
    text: "Le nombre 347 est-il pair ou impair ?",
    format: "qcm",
    choices: ["impair", "pair", "les deux", "on ne peut pas savoir"],
    expected: ["impair"],
    comparator: "mcq_exact",
    hint: "Ne regarde que le dernier chiffre : 7.",
    explanation: exp(
      "C'est le chiffre des unités qui décide de la parité, pas les autres.",
      "On regarde le chiffre tout à droite.",
      "Le chiffre des unités est 7, qui n'est pas dans la liste 0, 2, 4, 6, 8. Le nombre 347 est donc impair, même si le 4 du milieu est pair.",
      "347 est impair.",
    ),
    tags: ["ce1", "multiplication", "parite", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_parite_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 3,
    theme: "neutral",
    hint: "Seul le dernier chiffre compte.",
    tags: ["ce1", "multiplication", "parite", "template"],
    generate: () => {
      const n = randomInt(100, 999);
      const bonne = n % 2 === 0 ? "pair" : "impair";
      return {
        text: `Le nombre ${n} est-il pair ou impair ?`,
        format: "qcm",
        choices: makeChoices(bonne, [
          n % 2 === 0 ? "impair" : "pair",
          "les deux à la fois",
          "on ne peut pas savoir",
          "ni l'un ni l'autre",
        ]),
        expected: [bonne],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre pair se partage en deux parts égales sans reste ; un nombre impair, non.",
          "On regarde uniquement le chiffre des unités.",
          `Le chiffre des unités de ${n} est ${n % 10}. ${n % 2 === 0 ? "Il est dans la liste 0, 2, 4, 6, 8" : "Il n'est pas dans la liste 0, 2, 4, 6, 8"} : le nombre est donc ${bonne}.`,
          `${n} est ${bonne}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_parite_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_nombre_parite",
    difficulty: 4,
    theme: "neutral",
    hint: "Les nombres pairs se suivent de deux en deux.",
    tags: ["ce1", "multiplication", "parite", "template"],
    generate: () => {
      const debut = randomInt(100, 940);
      const fin = debut + 11;
      let compte = 0;
      for (let i = debut + 1; i < fin; i += 1) if (i % 2 === 0) compte += 1;
      return {
        text: `Combien y a-t-il de nombres pairs compris entre ${debut} et ${fin} ?`,
        format: "short",
        expected: [String(compte)],
        comparator: "number_equal",
        explanation: exp(
          "Les nombres pairs se suivent de deux en deux : un nombre sur deux est pair.",
          "On part du premier nombre pair après la borne, puis on avance de 2 en 2 jusqu'à l'autre borne.",
          `Entre ${debut} et ${fin}, il y a ${fin - debut - 1} nombres, et un sur deux est pair : cela en fait ${compte}.`,
          `Il y en a ${compte}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_TABLE_2 — la table de 2, celle des doubles
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_table_2_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_2",
    difficulty: 2,
    theme: "neutral",
    text: "Multiplier un nombre par 2, c'est la même chose que…",
    format: "qcm",
    choices: [
      "prendre son double",
      "prendre sa moitié",
      "lui ajouter 2",
      "lui enlever 2",
    ],
    expected: ["prendre son double"],
    comparator: "mcq_exact",
    hint: "Deux fois la même chose.",
    explanation: exp(
      "Multiplier par 2, c'est prendre deux fois le nombre : c'est son double.",
      "On additionne le nombre avec lui-même.",
      "7 × 2 = 7 + 7 = 14. Ajouter 2 donnerait 9, ce qui est tout autre chose.",
      "C'est prendre son double.",
    ),
    tags: ["ce1", "multiplication", "table_2", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_table_2_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_2",
    difficulty: 2,
    theme: "neutral",
    hint: "Additionne le nombre avec lui-même.",
    tags: ["ce1", "multiplication", "table_2", "template"],
    generate: () => {
      const n = randomInt(2, 10);
      const p = n * 2;
      return {
        text: `Combien font ${n} × 2 ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 2, c'est prendre le double.",
          "On additionne le nombre avec lui-même.",
          `${n} + ${n} = ${p}.`,
          `${n} × 2 = ${p}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_TABLE_5 — la table de 5
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_table_5_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_5",
    difficulty: 3,
    theme: "neutral",
    text: "Par quel chiffre se terminent tous les résultats de la table de 5 ?",
    format: "qcm",
    choices: ["par 0 ou par 5", "par 5 seulement", "par 0 seulement", "par n'importe quel chiffre"],
    expected: ["par 0 ou par 5"],
    comparator: "mcq_exact",
    hint: "Récite la table : 5, 10, 15, 20, 25…",
    explanation: exp(
      "Les résultats de la table de 5 suivent une régularité qui aide à les retenir.",
      "On récite la table et on regarde le dernier chiffre de chaque résultat.",
      "5, 10, 15, 20, 25, 30… Les résultats se terminent tour à tour par 5 et par 0. Cela permet de repérer une erreur tout de suite : 5 × 7 ne peut pas faire 34.",
      "Ils se terminent par 0 ou par 5.",
    ),
    tags: ["ce1", "multiplication", "table_5", "remarquable", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_table_5_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_5",
    difficulty: 3,
    theme: "neutral",
    hint: "Compte de 5 en 5.",
    tags: ["ce1", "multiplication", "table_5", "template"],
    generate: () => {
      const n = randomInt(2, 10);
      const p = n * 5;
      return {
        text: `Combien font ${n} × 5 ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "La table de 5 avance de cinq en cinq.",
          "On compte de 5 en 5 autant de fois qu'il le faut, ou on prend la moitié du produit par 10.",
          `${n} × 10 = ${n * 10}, et la moitié de ${n * 10} est ${p}. Donc ${n} × 5 = ${p}.`,
          `${n} × 5 = ${p}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_TABLE_10 — la table de 10
     Le programme l'explique par la numération : chaque chiffre
     prend une valeur dix fois plus grande.
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_table_10_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_10",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi 7 × 10 s'écrit-il 70 ?",
    format: "qcm",
    choices: [
      "parce que les 7 unités deviennent 7 dizaines",
      "parce qu'on ajoute toujours un zéro à la fin, sans raison",
      "parce que 7 + 10 = 70",
      "parce que 7 et 10 se ressemblent",
    ],
    expected: ["parce que les 7 unités deviennent 7 dizaines"],
    comparator: "mcq_exact",
    hint: "Sept paquets de dix, c'est sept dizaines.",
    explanation: exp(
      "Multiplier par 10, c'est faire prendre à chaque chiffre une valeur dix fois plus grande.",
      "On regarde ce que deviennent les unités : elles se transforment en dizaines.",
      "7 × 10, c'est 7 paquets de dix, donc 7 dizaines : cela s'écrit 70. Le zéro n'est pas ajouté au hasard, il marque qu'il n'y a plus d'unités isolées.",
      "Parce que les 7 unités deviennent 7 dizaines.",
    ),
    tags: ["ce1", "multiplication", "table_10", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_table_10_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_table_10",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque unité devient une dizaine.",
    tags: ["ce1", "multiplication", "table_10", "template"],
    generate: () => {
      const n = randomInt(2, 10);
      const p = n * 10;
      return {
        text: `Combien font ${n} × 10 ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "Multiplier par 10, c'est transformer chaque unité en dizaine.",
          "On lit le nombre en dizaines : le chiffre des unités passe aux dizaines.",
          `${n} × 10, c'est ${n} paquets de dix, donc ${n} dizaines : ${p}.`,
          `${n} × 10 = ${p}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MULTIPLICATION_CALCULER — calculer un produit
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_calculer_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 3,
    theme: "neutral",
    text: "Combien font 6 × 5 ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Compte de 5 en 5, six fois.",
    explanation: exp(
      "Un produit se calcule en répétant l'un des deux nombres autant de fois que l'autre l'indique.",
      "On choisit la table la plus facile des deux : ici celle de 5.",
      "5, 10, 15, 20, 25, 30 : six sauts de cinq. Donc 6 × 5 = 30.",
      "6 × 5 = 30.",
    ),
    tags: ["ce1", "multiplication", "calculer"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_calculer_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 3,
    theme: "neutral",
    hint: "Choisis la table la plus facile des deux.",
    tags: ["ce1", "multiplication", "calculer", "template"],
    generate: () => {
      const facile = randomChoice([2, 5, 10] as const);
      const n = randomInt(2, 10);
      const p = facile * n;
      const ordre = randomChoice([true, false]);
      return {
        text: `Combien font ${ordre ? `${n} × ${facile}` : `${facile} × ${n}`} ?`,
        format: "short",
        expected: [String(p)],
        comparator: "number_equal",
        explanation: exp(
          "L'ordre des deux nombres ne change pas le résultat : on peut prendre la table la plus facile.",
          `On utilise la table de ${facile}.`,
          `${facile} répété ${n} fois donne ${p}. Et dans l'autre sens, c'est pareil : ${p}.`,
          `Cela fait ${p}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_multiplication_calculer_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_calculer",
    difficulty: 4,
    theme: "neutral",
    hint: "Combien de fois le nombre tient-il dans le résultat ?",
    tags: ["ce1", "multiplication", "calculer", "template"],
    generate: () => {
      const facile = randomChoice([2, 5, 10] as const);
      const n = randomInt(2, 10);
      const p = facile * n;
      return {
        text: `Quel nombre manque : ${facile} × … = ${p} ?`,
        format: "short",
        expected: [String(n)],
        comparator: "number_equal",
        explanation: exp(
          "Une égalité à trou se remplit en cherchant combien de fois le nombre connu tient dans le résultat.",
          `On récite la table de ${facile} jusqu'à tomber sur ${p}.`,
          `${facile} × ${n} = ${p} : il faut ${n} fois ${facile} pour arriver à ${p}.`,
          `Il manque ${n}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_MULTIPLICATION_DEFI — les défis
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_multiplication_defi_fixed_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un marchand vend ses letchis par sachets de 10. Il en a préparé 7 sachets et il lui reste 4 letchis isolés. Combien a-t-il de letchis ?",
    format: "short",
    expected: ["74"],
    comparator: "number_equal",
    hint: "Sept sachets de dix, c'est sept dizaines.",
    explanation: exp(
      "Multiplier par 10 fabrique des dizaines : c'est la numération elle-même.",
      "On compte d'abord les sachets, puis on ajoute ce qui reste.",
      "7 × 10 = 70, puis 70 + 4 = 74. Le nombre 74 se lit d'ailleurs directement : 7 dizaines et 4 unités.",
      "Il a 74 letchis.",
    ),
    tags: ["ce1", "multiplication", "defi", "reunion"],
  },
  {
    kind: "template",
    id: "ce1_multiplication_defi_tpl_1",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Deux étapes : le produit d'abord, l'ajout ensuite.",
    tags: ["ce1", "multiplication", "defi", "template"],
    generate: () => {
      const paquets = randomInt(3, 8);
      const parPaquet = randomChoice([2, 5, 10] as const);
      const isoles = randomInt(1, 9);
      const total = paquets * parPaquet + isoles;
      const quoi = randomChoice([
        { objet: "billes", contenant: "sachets" },
        { objet: "images", contenant: "pochettes" },
        { objet: "crayons", contenant: "boites" },
      ]);
      return {
        text: `Il y a ${paquets} ${quoi.contenant} de ${parPaquet} ${quoi.objet}, et ${isoles} ${quoi.objet} en plus. Combien de ${quoi.objet} en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Un problème à deux étapes se résout dans l'ordre : on cherche d'abord ce qu'on peut trouver.",
          "On calcule le contenu des paquets, puis on ajoute ce qui est isolé.",
          `${paquets} × ${parPaquet} = ${paquets * parPaquet}, puis ${paquets * parPaquet} + ${isoles} = ${total}.`,
          `Il y a ${total} ${quoi.objet}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_multiplication_defi_tpl_2",
    niveau: "ce1",
    matiere: "maths",
    notionId: "multiplication",
    microId: "ce1_multiplication_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Les deux façons de voir le quadrillage donnent le même total.",
    tags: ["ce1", "multiplication", "defi", "template"],
    generate: () => {
      const lignes = randomInt(3, 9);
      const colonnes = randomInt(3, 9);
      const total = lignes * colonnes;
      return {
        text: `Un jardin a ${lignes} rangées de ${colonnes} plants. Combien de plants en tout ?`,
        format: "short",
        expected: [String(total)],
        comparator: "number_equal",
        explanation: exp(
          "Une collection rangée en lignes et en colonnes se compte par une multiplication.",
          "On peut compter les rangées ou les colonnes : le résultat est le même.",
          `${lignes} × ${colonnes} = ${total}, et ${colonnes} × ${lignes} = ${total} aussi. C'est le même jardin, regardé dans l'autre sens.`,
          `Il y a ${total} plants.`,
        ),
      };
    },
  },
];
