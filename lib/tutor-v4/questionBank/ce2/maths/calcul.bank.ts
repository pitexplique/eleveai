// lib/tutor-v4/questionBank/ce2/maths/calcul.bank.ts
//
// PÉRIMÈTRE BO : calcul mental jusqu'à 10 000 (BO n° 41 du 31 octobre 2024,
// cycle 2). Le programme ne dit pas « calcul mental » en bloc : il nomme huit
// familles, une par une, et vise une fluence de quinze résultats en trois
// minutes. Chaque famille a donc ses gabarits, et chaque gabarit enseigne la
// PROCÉDURE, pas seulement le résultat : ajouter 9 c'est ajouter 10 puis
// enlever 1, multiplier par 4 c'est doubler deux fois.

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

function formatNumber(n: number): string {
  return n.toLocaleString("fr-FR");
}

// Les pièges se fabriquent par décalage — « et si l'élève s'était trompé d'une
// dizaine ? ». Sur un petit complément, ce décalage passe sous zéro et l'on
// proposait « −10 » à un CE2, qui ne connaît pas les nombres négatifs. On ne
// garde que les pièges positifs, et makeChoices se sert dans ce qui reste.
function piegesPositifs(valeurs: readonly number[]): string[] {
  return valeurs.filter((v) => v > 0).map(formatNumber);
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string,
) {
  return `Définition : ${definition}

Méthode : ${methode}

Calcul : ${calcul}

Conclusion : ${conclusion}`;
}

export const calculBank: TutorBankItemV4[] = [
  // ============================================================
  // ce2_calcul_complements — Compléments à 100 et à 1 000
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_complement_tpl_001_a_cent",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_complements",
    difficulty: 2,
    theme: "neutral",
    hint: "Va d'abord à la dizaine supérieure, puis jusqu'à 100.",
    tags: ["ce2", "calcul_mental", "complement", "template"],
    generate: () => {
      // On évite les multiples de 10 : le complément y est trop immédiat et le
      // passage par la dizaine, qui est justement ce qu'on enseigne, disparaît.
      const dizaines = randomInt(1, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const complement = 100 - n;
      const correct = String(complement);

      const versDizaine = 10 - unites;

      return {
        text: `Combien faut-il ajouter à ${n} pour aller à 100 ?`,
        format: "qcm",
        choices: makeChoices(
          correct,
          piegesPositifs([
            100 - dizaines * 10,
            complement + 10,
            complement - 10,
            complement + 1,
            complement - 1,
            unites * 10 + dizaines,
          ]),
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le complément à 100, c'est ce qui manque pour arriver à 100.",
          "On monte d'abord à la dizaine juste au-dessus, puis on continue jusqu'à 100.",
          `De ${n} à ${dizaines * 10 + 10}, il y a ${versDizaine}. De ${dizaines * 10 + 10} à 100, il y a ${100 - (dizaines * 10 + 10)}. En tout : ${versDizaine} + ${100 - (dizaines * 10 + 10)} = ${complement}.`,
          `Il faut ajouter ${complement}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_calcul_complement_tpl_002_a_mille",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_complements",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe d'abord à la centaine supérieure, puis jusqu'à 1 000.",
    tags: ["ce2", "calcul_mental", "complement", "template"],
    generate: () => {
      const centaines = randomInt(1, 9);
      const dizaines = randomInt(1, 9);
      const n = centaines * 100 + dizaines * 10;
      const complement = 1000 - n;
      const correct = formatNumber(complement);

      return {
        text: `Combien faut-il ajouter à ${formatNumber(n)} pour aller à 1 000 ?`,
        format: "qcm",
        choices: makeChoices(
          correct,
          piegesPositifs([
            1000 - centaines * 100,
            complement + 100,
            complement - 100,
            complement + 10,
            complement - 10,
            n,
          ]),
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le complément à 1 000, c'est ce qui manque pour arriver à 1 000.",
          "On monte à la centaine juste au-dessus, puis on continue jusqu'à 1 000.",
          `De ${formatNumber(n)} à ${formatNumber((centaines + 1) * 100)}, il y a ${100 - dizaines * 10}. Puis il reste ${formatNumber(1000 - (centaines + 1) * 100)}. En tout : ${formatNumber(complement)}.`,
          `Il faut ajouter ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_doubles_moities — Doubles et moitiés
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_double_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_doubles_moities",
    difficulty: 2,
    theme: "neutral",
    hint: "Double les dizaines, double les unités, puis rassemble.",
    tags: ["ce2", "calcul_mental", "double", "template"],
    generate: () => {
      const dizaines = randomInt(1, 4);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const correct = String(n * 2);

      return {
        text: `Quel est le double de ${n} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(n * 2 + 10),
          String(n * 2 - 10),
          String(dizaines * 20 + unites),
          String(dizaines * 10 + unites * 2),
          String(n + 2),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Le double d'un nombre, c'est ce nombre ajouté à lui-même.",
          "On double séparément les dizaines et les unités, puis on rassemble.",
          `Le double de ${dizaines * 10} est ${dizaines * 20}, le double de ${unites} est ${unites * 2}. Ensemble : ${dizaines * 20} + ${unites * 2} = ${n * 2}.`,
          `Le double de ${n} est ${n * 2}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_calcul_moitie_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_doubles_moities",
    difficulty: 3,
    theme: "neutral",
    hint: "Coupe les dizaines en deux, puis les unités.",
    tags: ["ce2", "calcul_mental", "moitie", "template"],
    generate: () => {
      // On tire la moitié d'abord : le nombre est pair par construction, et
      // l'élève ne tombe jamais sur un cas impossible.
      const moitie = randomInt(11, 99);
      const n = moitie * 2;
      const correct = String(moitie);

      return {
        text: `Quelle est la moitié de ${n} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(moitie + 10),
          String(moitie - 10),
          String(moitie + 1),
          String(n - 2),
          String(Math.floor(n / 4)),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "La moitié d'un nombre, c'est ce nombre partagé en deux parts égales.",
          "On coupe les dizaines en deux, puis les unités, et on rassemble.",
          `La moitié de ${n} est ${moitie}, car ${moitie} + ${moitie} = ${n}.`,
          `La moitié de ${n} est ${moitie}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_decomposer — Calculer par décomposition
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_decomposer_tpl_001_somme",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_decomposer",
    difficulty: 3,
    theme: "neutral",
    hint: "Ajoute d'abord les dizaines, puis les unités.",
    tags: ["ce2", "calcul_mental", "decomposition", "template"],
    generate: () => {
      const a = randomInt(21, 79);
      const b = randomInt(21, 79);
      const correct = String(a + b);

      const dizA = Math.floor(a / 10) * 10;
      const uniA = a % 10;
      const dizB = Math.floor(b / 10) * 10;
      const uniB = b % 10;

      return {
        text: `Combien font ${a} + ${b} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(a + b + 10),
          String(a + b - 10),
          String(a + b + 1),
          String(dizA + dizB),
          String(a + b - 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Calculer par décomposition, c'est couper les nombres en dizaines et unités.",
          "On additionne les dizaines entre elles, les unités entre elles, puis on rassemble.",
          `${dizA} + ${dizB} = ${dizA + dizB}, et ${uniA} + ${uniB} = ${uniA + uniB}. Ensemble : ${dizA + dizB} + ${uniA + uniB} = ${a + b}.`,
          `${a} + ${b} = ${a + b}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_ajouter_9_19 — Ajouter 8, 9, 18 ou 19
  // La procédure du programme : on ajoute la dizaine ronde, puis on enlève ce
  // qu'on a ajouté en trop.
  // ============================================================

  {
    kind: "fixed",
    id: "ce2_calcul_ajouter9_fixed_001_procedure",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_ajouter_9_19",
    difficulty: 2,
    theme: "neutral",
    text: "Pour calculer 47 + 9 dans sa tête, quelle est la façon la plus rapide ?",
    format: "qcm",
    choices: [
      "Ajouter 10, puis enlever 1",
      "Ajouter 10, puis ajouter 1",
      "Enlever 10, puis ajouter 1",
      "Ajouter 9 aux unités seulement",
    ],
    expected: ["Ajouter 10, puis enlever 1"],
    comparator: "mcq_exact",
    hint: "9, c'est 10 moins 1.",
    explanation: exp(
      "Ajouter 9, c'est ajouter une dizaine entière puis retirer l'unité en trop.",
      "On ajoute 10, ce qui est facile, puis on enlève 1.",
      "47 + 10 = 57, puis 57 − 1 = 56. Donc 47 + 9 = 56.",
      "La bonne façon est d'ajouter 10 puis d'enlever 1.",
    ),
    tags: ["ce2", "calcul_mental", "ajouter_9", "procedure", "qcm"],
  },

  {
    kind: "template",
    id: "ce2_calcul_ajouter9_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_ajouter_9_19",
    difficulty: 2,
    theme: "neutral",
    hint: "Ajoute la dizaine ronde juste au-dessus, puis enlève ce que tu as mis en trop.",
    tags: ["ce2", "calcul_mental", "ajouter_9", "template"],
    generate: () => {
      const ajout = randomChoice([8, 9, 18, 19]);
      const arrondi = ajout <= 9 ? 10 : 20;
      const trop = arrondi - ajout;
      const n = randomInt(21, 480);
      const correct = String(n + ajout);

      return {
        text: `Combien font ${n} + ${ajout} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(n + arrondi),
          String(n + arrondi + trop),
          String(n + ajout - 10),
          String(n + ajout + 10),
          String(n + ajout - 1),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `Ajouter ${ajout}, c'est ajouter ${arrondi} puis enlever ${trop}.`,
          "On passe par la dizaine ronde, plus facile à ajouter de tête.",
          `${n} + ${arrondi} = ${n + arrondi}, puis ${n + arrondi} − ${trop} = ${n + ajout}.`,
          `${n} + ${ajout} = ${n + ajout}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_soustraire_9_19 — Soustraire 9, 19, 29 ou 39
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_soustraire9_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_soustraire_9_19",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève la dizaine ronde, puis rends ce que tu as enlevé en trop.",
    tags: ["ce2", "calcul_mental", "soustraire_9", "template"],
    generate: () => {
      const retrait = randomChoice([9, 19, 29, 39]);
      const arrondi = retrait + 1;
      const n = randomInt(retrait + 20, 900);
      const correct = String(n - retrait);

      return {
        text: `Combien font ${n} − ${retrait} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(n - arrondi),
          String(n - arrondi - 1),
          String(n - retrait - 10),
          String(n - retrait + 10),
          String(n - retrait - 2),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `Enlever ${retrait}, c'est enlever ${arrondi} puis rendre 1.`,
          "On passe par la dizaine ronde, plus facile à enlever de tête, puis on corrige.",
          `${n} − ${arrondi} = ${n - arrondi}, puis ${n - arrondi} + 1 = ${n - retrait}.`,
          `${n} − ${retrait} = ${n - retrait}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_multiplier_4_8 — Multiplier par 4 ou par 8 en doublant
  // ============================================================

  {
    kind: "fixed",
    id: "ce2_calcul_x8_fixed_001_procedure",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_multiplier_4_8",
    difficulty: 3,
    theme: "neutral",
    text: "Pour multiplier un nombre par 8 dans sa tête, que peut-on faire ?",
    format: "qcm",
    choices: [
      "Doubler trois fois",
      "Doubler deux fois",
      "Doubler quatre fois",
      "Doubler, puis ajouter le nombre",
    ],
    expected: ["Doubler trois fois"],
    comparator: "mcq_exact",
    hint: "2 × 2 × 2 = 8.",
    explanation: exp(
      "Multiplier par 8, c'est multiplier par 2, puis encore par 2, puis encore par 2.",
      "On double trois fois de suite, car 2 × 2 × 2 = 8.",
      "Par exemple 7 × 8 : 7 double en 14, 14 double en 28, 28 double en 56. Et 7 × 8 = 56.",
      "Pour multiplier par 8, on double trois fois.",
    ),
    tags: ["ce2", "calcul_mental", "multiplier_8", "procedure", "qcm"],
  },

  {
    kind: "template",
    id: "ce2_calcul_x4_x8_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_multiplier_4_8",
    difficulty: 3,
    theme: "neutral",
    hint: "Par 4, on double deux fois. Par 8, trois fois.",
    tags: ["ce2", "calcul_mental", "multiplier_4_8", "template"],
    generate: () => {
      const facteur = randomChoice([4, 8]);
      const n = randomInt(11, 99);
      const correct = String(n * facteur);
      const doubles =
        facteur === 4
          ? `${n} → ${n * 2} → ${n * 4}`
          : `${n} → ${n * 2} → ${n * 4} → ${n * 8}`;

      return {
        text: `Combien font ${n} × ${facteur} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(n * (facteur / 2)),
          String(n * facteur * 2),
          String(n * facteur + n),
          String(n * facteur - n),
          String(n + facteur),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          `Multiplier par ${facteur}, c'est doubler ${facteur === 4 ? "deux" : "trois"} fois.`,
          "On double, on redouble, sans jamais poser l'opération.",
          `${doubles}.`,
          `${n} × ${facteur} = ${n * facteur}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_multiples_25 — Les multiples de 25
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_multiples25_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_multiples_25",
    difficulty: 3,
    theme: "neutral",
    hint: "Quatre fois 25 font 100 : compte par paquets de quatre.",
    tags: ["ce2", "calcul_mental", "multiples_25", "template"],
    generate: () => {
      const k = randomInt(2, 16);
      const produit = k * 25;
      const correct = formatNumber(produit);

      return {
        text: `Combien font ${k} × 25 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(produit + 25),
          formatNumber(produit - 25),
          formatNumber(k * 20),
          formatNumber(k * 30),
          formatNumber(produit + 5),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "25 revient souvent : quatre paquets de 25 font 100.",
          "On compte les paquets de quatre : chaque groupe de quatre 25 vaut 100.",
          `${k} × 25 : il y a ${Math.floor(k / 4)} paquet(s) de 100${k % 4 ? `, et il reste ${k % 4} × 25 = ${(k % 4) * 25}` : ""}. Total : ${formatNumber(produit)}.`,
          `${k} × 25 = ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_dizaines_entieres — Un nombre < 10 par des dizaines entières
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_dizaines_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_dizaines_entieres",
    difficulty: 2,
    theme: "neutral",
    hint: "Calcule avec les dizaines, puis remets le zéro.",
    tags: ["ce2", "calcul_mental", "dizaines_entieres", "template"],
    generate: () => {
      const n = randomInt(2, 9);
      const d = randomInt(2, 9);
      const produit = n * d * 10;
      const correct = formatNumber(produit);

      return {
        text: `Combien font ${n} × ${d * 10} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(n * d),
          formatNumber(produit * 10),
          formatNumber(produit + 10),
          formatNumber((n + d) * 10),
          formatNumber(produit - 10),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Un nombre entier de dizaines, c'est un paquet de dix répété.",
          "On multiplie par le chiffre des dizaines, puis on ajoute le zéro.",
          `${n} × ${d} = ${n * d}, donc ${n} × ${d * 10} = ${n * d} dizaines, c'est-à-dire ${formatNumber(produit)}.`,
          `${n} × ${d * 10} = ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_distributivite — 11 à 99 par un nombre à un chiffre
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_distributivite_tpl_001",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_distributivite",
    difficulty: 4,
    theme: "neutral",
    hint: "Coupe le grand nombre en dizaines et unités, multiplie chaque morceau, puis additionne.",
    tags: ["ce2", "calcul_mental", "distributivite", "template"],
    generate: () => {
      // Les unités ne sont jamais nulles : sinon la décomposition n'a plus lieu
      // d'être, et le gabarit n'enseigne plus rien.
      const dizaines = randomInt(1, 9);
      const unites = randomInt(1, 9);
      const n = dizaines * 10 + unites;
      const k = randomInt(3, 9);
      const produit = n * k;
      const correct = formatNumber(produit);

      return {
        text: `Combien font ${n} × ${k} ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          formatNumber(dizaines * 10 * k),
          formatNumber(dizaines * k * 10 + unites),
          formatNumber(produit + 10),
          formatNumber(produit - 10),
          formatNumber(dizaines * k + unites * k),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "On peut couper un nombre en morceaux, multiplier chaque morceau, puis rassembler.",
          `On écrit ${n} comme ${dizaines * 10} + ${unites}, on multiplie les deux par ${k}, et on additionne.`,
          `${dizaines * 10} × ${k} = ${formatNumber(dizaines * 10 * k)}, et ${unites} × ${k} = ${unites * k}. Ensemble : ${formatNumber(dizaines * 10 * k)} + ${unites * k} = ${formatNumber(produit)}.`,
          `${n} × ${k} = ${correct}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_fluence — Quinze résultats en trois minutes
  // Douze secondes par question : les gabarits ci-dessous piochent dans TOUTES
  // les familles, sans procédure à rédiger. C'est l'entraînement à la vitesse,
  // pas à la méthode — celle-ci s'apprend dans les micro-compétences dédiées.
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_fluence_tpl_001_tables",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_fluence",
    difficulty: 1,
    theme: "neutral",
    hint: "Réponds sans poser l'opération.",
    tags: ["ce2", "calcul_mental", "fluence", "tables", "template"],
    generate: () => {
      const a = randomInt(2, 9);
      const b = randomInt(2, 9);
      const correct = String(a * b);

      return {
        text: `${a} × ${b} = ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(a * b + a),
          String(a * b - a),
          String(a * b + b),
          String(a * b - b),
          String(a + b),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Une table de multiplication se sait par cœur, dans les deux sens.",
          "On récite la table du plus petit des deux nombres.",
          `${a} × ${b} = ${a * b}, et ${b} × ${a} = ${a * b} aussi.`,
          `${a} × ${b} = ${a * b}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_calcul_fluence_tpl_002_melange",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_fluence",
    difficulty: 2,
    theme: "neutral",
    hint: "Chaque famille a son raccourci : sers-t'en.",
    tags: ["ce2", "calcul_mental", "fluence", "melange", "template"],
    generate: () => {
      const famille = randomChoice(["ajout9", "retrait9", "double", "x25", "dizaines"]);

      if (famille === "ajout9") {
        const n = randomInt(21, 480);
        const a = randomChoice([9, 19]);
        const r = n + a;
        return {
          text: `${n} + ${a} = ?`,
          format: "qcm",
          choices: makeChoices(String(r), [
            String(r + 1),
            String(r - 1),
            String(r + 10),
            String(r - 10),
          ]),
          expected: [String(r)],
          comparator: "mcq_exact",
          explanation: exp(
            `Ajouter ${a}, c'est ajouter ${a + 1} puis enlever 1.`,
            "On passe par la dizaine ronde.",
            `${n} + ${a + 1} = ${n + a + 1}, puis on enlève 1 : ${r}.`,
            `${n} + ${a} = ${r}.`,
          ),
        };
      }

      if (famille === "retrait9") {
        const n = randomInt(60, 900);
        const s = randomChoice([9, 19, 29]);
        const r = n - s;
        return {
          text: `${n} − ${s} = ?`,
          format: "qcm",
          choices: makeChoices(String(r), [
            String(r - 1),
            String(r + 1),
            String(r - 10),
            String(r + 10),
          ]),
          expected: [String(r)],
          comparator: "mcq_exact",
          explanation: exp(
            `Enlever ${s}, c'est enlever ${s + 1} puis rendre 1.`,
            "On passe par la dizaine ronde.",
            `${n} − ${s + 1} = ${n - s - 1}, puis on rend 1 : ${r}.`,
            `${n} − ${s} = ${r}.`,
          ),
        };
      }

      if (famille === "double") {
        const n = randomInt(15, 250);
        const r = n * 2;
        return {
          text: `Le double de ${n} = ?`,
          format: "qcm",
          choices: makeChoices(formatNumber(r), [
            formatNumber(r + 10),
            formatNumber(r - 10),
            formatNumber(r + 2),
            formatNumber(n + 2),
          ]),
          expected: [formatNumber(r)],
          comparator: "mcq_exact",
          explanation: exp(
            "Le double, c'est le nombre ajouté à lui-même.",
            "On double les dizaines, puis les unités.",
            `${n} + ${n} = ${formatNumber(r)}.`,
            `Le double de ${n} est ${formatNumber(r)}.`,
          ),
        };
      }

      if (famille === "x25") {
        const k = randomInt(2, 16);
        const r = k * 25;
        return {
          text: `${k} × 25 = ?`,
          format: "qcm",
          choices: makeChoices(formatNumber(r), [
            formatNumber(r + 25),
            formatNumber(r - 25),
            formatNumber(k * 20),
            formatNumber(k * 30),
          ]),
          expected: [formatNumber(r)],
          comparator: "mcq_exact",
          explanation: exp(
            "Quatre paquets de 25 font 100.",
            "On compte les paquets de quatre.",
            `${k} × 25 = ${formatNumber(r)}.`,
            `${k} × 25 = ${formatNumber(r)}.`,
          ),
        };
      }

      const n = randomInt(2, 9);
      const d = randomInt(2, 9);
      const r = n * d * 10;
      return {
        text: `${n} × ${d * 10} = ?`,
        format: "qcm",
        choices: makeChoices(formatNumber(r), [
          String(n * d),
          formatNumber(r * 10),
          formatNumber((n + d) * 10),
          formatNumber(r + 10),
        ]),
        expected: [formatNumber(r)],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par un nombre entier de dizaines.",
          "On multiplie par le chiffre des dizaines, puis on remet le zéro.",
          `${n} × ${d} = ${n * d}, donc ${n} × ${d * 10} = ${formatNumber(r)}.`,
          `${n} × ${d * 10} = ${formatNumber(r)}.`,
        ),
      };
    },
  },

  // ============================================================
  // ce2_calcul_defi — Le défi de la notion
  // ============================================================

  {
    kind: "template",
    id: "ce2_calcul_defi_tpl_001_chemin_le_plus_court",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le raccourci avant de calculer.",
    tags: ["ce2", "calcul_mental", "defi", "template"],
    generate: () => {
      const n = randomInt(12, 48);
      const correct = String(n * 8);

      return {
        text: `Sans poser l'opération, combien font ${n} × 8 ?`,
        format: "qcm",
        choices: makeChoices(correct, [
          String(n * 4),
          String(n * 16),
          String(n * 8 + n),
          String(n * 8 - n),
          String(n * 6),
        ]),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Multiplier par 8, c'est doubler trois fois de suite.",
          "On double une première fois, puis une deuxième, puis une troisième.",
          `${n} → ${n * 2} → ${n * 4} → ${n * 8}.`,
          `${n} × 8 = ${n * 8}.`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce2_calcul_defi_tpl_002_complement_manquant",
    niveau: "ce2",
    matiere: "maths",
    notionId: "calcul_mental",
    microId: "ce2_calcul_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Regarde ce qui manque pour arriver au total.",
    tags: ["ce2", "calcul_mental", "defi", "complement", "template"],
    generate: () => {
      const total = randomChoice([100, 200, 500, 1000]);
      // Le complément doit valoir au moins 25 : à « 498 + ? = 500 », l'élève
      // répond sans chercher, et le gabarit ne mesure plus rien.
      const manquant = randomInt(25, total - 25);
      const connu = total - manquant;
      const correct = formatNumber(manquant);

      return {
        text: `Quel nombre manque : ${formatNumber(connu)} + ? = ${formatNumber(total)}`,
        format: "qcm",
        choices: makeChoices(
          correct,
          piegesPositifs([
            manquant + 10,
            manquant - 10,
            manquant + 1,
            total + connu,
            manquant - 1,
          ]),
        ),
        expected: [correct],
        comparator: "mcq_exact",
        explanation: exp(
          "Chercher un nombre manquant dans une addition, c'est chercher un complément.",
          "On part du nombre connu et on monte jusqu'au total, dizaine ronde par dizaine ronde.",
          `De ${formatNumber(connu)} à ${formatNumber(total)}, il y a ${formatNumber(manquant)}, car ${formatNumber(connu)} + ${formatNumber(manquant)} = ${formatNumber(total)}.`,
          `Le nombre manquant est ${correct}.`,
        ),
      };
    },
  },
];
