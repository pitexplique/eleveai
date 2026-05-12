import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function exp(
  definition: string,
  methode: string,
  calcul: string,
  conclusion: string
) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // ============================================================
  // PROP_RECONNAITRE
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_prop_reconnaitre_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "À l’école, 1 carnet coûte 2 €. 3 carnets coûtent 6 €. Est-ce proportionnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si le prix d’un carnet reste le même.",
    explanation: exp(
      "Deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.",
      "On compare le prix pour une unité ou on vérifie que quantité et prix sont multipliés pareil.",
      "1 carnet coûte 2 €. Pour 3 carnets, 3 × 2 € = 6 €.",
      "La situation est proportionnelle."
    ),
    tags: ["cm2", "proportionnalite", "reconnaitre", "ecole"],
  },

  {
    kind: "template",
    id: "cm2_prop_reconnaitre_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    hint: "Si on multiplie la quantité, le prix doit être multiplié par le même nombre.",
    tags: ["cm2", "proportionnalite", "reunion", "template"],
    generate: () => {
      const unit = randomChoice([2, 3, 4]);
      const qty = randomChoice([3, 4, 5]);
      const total = unit * qty;

      return {
        text: `Au marché de Saint-Paul, 1 mangue coûte ${unit} €. ${qty} mangues coûtent ${total} €. Est-ce une situation proportionnelle ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["oui"],
        comparator: "mcq_exact",
        explanation: exp(
          "Une situation est proportionnelle si la même règle multiplicative relie les deux grandeurs.",
          "On cherche le prix d’une mangue, puis on multiplie par le nombre de mangues.",
          `${qty} × ${unit} € = ${total} €.`,
          "Le prix suit la quantité : c’est proportionnel."
        ),
      };
    },
  },

  {
    kind: "template",
    id: "cm2_prop_reconnaitre_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "sport",
    hint: "Vérifie ce qui se passe quand on double.",
    tags: ["cm2", "proportionnalite", "sport", "template"],
    generate: () => {
      const price = randomChoice([5, 6, 8]);
      const wrong = price * 2 - 1;

      return {
        text: `Pour le tournoi, 2 gourdes coûtent ${price} €. 4 gourdes coûtent ${wrong} €. Est-ce proportionnel ?`,
        format: "qcm",
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact",
        explanation: exp(
          "Dans une situation proportionnelle, doubler une quantité double aussi l’autre grandeur.",
          "On compare le double du prix de 2 gourdes avec le prix annoncé pour 4 gourdes.",
          `Le double de ${price} € est ${price * 2} €, pas ${wrong} €.`,
          "La situation n’est pas proportionnelle."
        ),
      };
    },
  },

  // ============================================================
  // PROP_TABLEAU
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_prop_tableau_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 1,
    theme: "cuisine",
    text: "Recette : 2 verres de jus pour 4 personnes. Combien de verres pour 8 personnes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "8 personnes, c’est 2 fois plus que 4 personnes.",
    explanation: exp(
      "Un tableau de proportionnalité garde le même rapport entre les grandeurs.",
      "On utilise la linéarité : si une quantité double, l’autre double aussi.",
      "8 personnes = 2 × 4 personnes, donc 2 × 2 verres = 4 verres.",
      "Il faut 4 verres de jus."
    ),
    tags: ["cm2", "proportionnalite", "tableau", "cuisine"],
  },

  {
    kind: "template",
    id: "cm2_prop_tableau_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le passage à l’unité : combien pour 1 objet ?",
    tags: ["cm2", "proportionnalite", "tableau", "template"],
    generate: () => {
      const unit = randomChoice([3, 4, 5]);
      const qty1 = randomChoice([2, 3]);
      const qty2 = randomChoice([4, 5, 6]);
      const price1 = qty1 * unit;
      const price2 = qty2 * unit;

      return {
        text: `${qty1} cahiers coûtent ${price1} €. Combien coûtent ${qty2} cahiers au même prix ?`,
        format: "short",
        expected: [`${price2}`],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_proportionnalite",
          rows: 2,
          cols: 2,
          rowLabels: ["Cahiers", "Prix (€)"],
          values: [
            [`${qty1}`, `${qty2}`],
            [`${price1}`, "?"],
          ],
          missing: [{ row: 1, col: 1 }],
        },
        explanation: exp(
          "Dans un tableau de proportionnalité, le prix unitaire reste constant.",
          "On trouve le prix d’un cahier, puis on multiplie par le nombre demandé.",
          `${price1} ÷ ${qty1} = ${unit} €, puis ${qty2} × ${unit} € = ${price2} €.`,
          `${qty2} cahiers coûtent ${price2} €.`
        ),
      };
    },
  },

  // ============================================================
  // PROP_COEFFICIENT
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_prop_coefficient_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un tableau, on passe de 3 à 12. Par quel nombre faut-il multiplier ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Cherche le nombre qui transforme 3 en 12.",
    explanation: exp(
      "Le coefficient de proportionnalité est le nombre par lequel on multiplie pour passer d’une grandeur à l’autre.",
      "On cherche le multiplicateur qui transforme 3 en 12.",
      "3 × 4 = 12.",
      "Le coefficient est 4."
    ),
    tags: ["cm2", "proportionnalite", "coefficient"],
  },

  {
    kind: "template",
    id: "cm2_prop_coefficient_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_coefficient",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise la deuxième valeur par la première.",
    tags: ["cm2", "proportionnalite", "coefficient", "template"],
    generate: () => {
      const coefficient = randomChoice([2, 3, 4, 5]);
      const start = randomChoice([3, 4, 6, 8]);
      const end = start * coefficient;

      return {
        text: `Dans une situation proportionnelle, ${start} objets correspondent à ${end} points. Quel est le coefficient de proportionnalité ?`,
        format: "short",
        expected: [`${coefficient}`],
        comparator: "number_equal",
        explanation: exp(
          "Le coefficient de proportionnalité permet de passer d’une grandeur à l’autre.",
          "On divise la valeur d’arrivée par la valeur de départ.",
          `${end} ÷ ${start} = ${coefficient}.`,
          `Le coefficient de proportionnalité est ${coefficient}.`
        ),
      };
    },
  },

  // ============================================================
  // PROP_QUATRIEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_prop_quatrieme_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "sport",
    text: "3 ballons coûtent 18 €. Combien coûtent 5 ballons au même prix ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Cherche d’abord le prix d’un ballon.",
    explanation: exp(
      "La valeur manquante dans une situation proportionnelle peut se calculer avec le passage à l’unité.",
      "On trouve le prix de 1 ballon, puis le prix de 5 ballons.",
      "18 ÷ 3 = 6 €, puis 5 × 6 € = 30 €.",
      "5 ballons coûtent 30 €."
    ),
    tags: ["cm2", "proportionnalite", "quatrieme", "sport"],
  },

  {
    kind: "template",
    id: "cm2_prop_quatrieme_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    hint: "Passe par 1 kg, puis remonte vers la quantité demandée.",
    tags: ["cm2", "proportionnalite", "quatrieme", "reunion", "template"],
    generate: () => {
      const unit = randomChoice([3, 4, 6]);
      const kg1 = randomChoice([2, 3]);
      const kg2 = randomChoice([4, 5]);
      const price1 = kg1 * unit;
      const price2 = kg2 * unit;

      return {
        text: `À La Réunion, ${kg1} kg de letchis coûtent ${price1} €. Combien coûtent ${kg2} kg ?`,
        format: "short",
        expected: [`${price2}`],
        comparator: "number_equal",
        explanation: exp(
          "Une quatrième proportionnelle est une valeur manquante dans une situation proportionnelle.",
          "Au CM2, on privilégie le passage à l’unité ou la linéarité.",
          `${price1} ÷ ${kg1} = ${unit} € pour 1 kg, puis ${kg2} × ${unit} € = ${price2} €.`,
          `${kg2} kg coûtent ${price2} €.`
        ),
      };
    },
  },

  // ============================================================
  // PROP_PROBLEME
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_prop_probleme_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "cuisine",
    text: "Pour faire 4 gâteaux, il faut 12 œufs. Combien faut-il d’œufs pour faire 6 gâteaux ?",
    format: "short",
    expected: ["18"],
    comparator: "number_equal",
    hint: "Cherche d’abord combien d’œufs il faut pour 1 gâteau.",
    explanation: exp(
      "Dans un problème de proportionnalité, les deux grandeurs varient avec la même règle.",
      "On passe par l’unité : nombre d’œufs pour 1 gâteau, puis pour 6 gâteaux.",
      "12 ÷ 4 = 3 œufs pour 1 gâteau, puis 6 × 3 = 18.",
      "Il faut 18 œufs."
    ),
    tags: ["cm2", "proportionnalite", "probleme", "cuisine"],
  },

  {
    kind: "template",
    id: "cm2_prop_probleme_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    hint: "Cherche le prix pour une seule bouteille.",
    tags: ["cm2", "proportionnalite", "probleme", "reunion", "template"],
    generate: () => {
      const unit = randomChoice([2, 3, 4]);
      const qty1 = randomChoice([3, 4]);
      const qty2 = randomChoice([5, 6, 7]);
      const price1 = qty1 * unit;
      const price2 = qty2 * unit;

      return {
        text: `Dans une boutique à Saint-Pierre, ${qty1} bouteilles de jus coûtent ${price1} €. Combien coûtent ${qty2} bouteilles au même prix ?`,
        format: "short",
        expected: [`${price2}`],
        comparator: "number_equal",
        explanation: exp(
          "Le prix est proportionnel au nombre de bouteilles si chaque bouteille a le même prix.",
          "On passe par le prix d’une bouteille.",
          `${price1} ÷ ${qty1} = ${unit} €, puis ${qty2} × ${unit} € = ${price2} €.`,
          `${qty2} bouteilles coûtent ${price2} €.`
        ),
      };
    },
  },

  // ============================================================
  // PROP_DEFI
  // ============================================================

  {
    kind: "fixed",
    id: "cm2_prop_defi_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Défi cuisine : 4 samoussas demandent 60 g de farce. Combien de farce pour 10 samoussas ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "Passe par 1 samoussa : 60 ÷ 4.",
    explanation: exp(
      "Un défi de proportionnalité reste une situation où la même règle relie deux grandeurs.",
      "On passe par l’unité, puis on multiplie par la quantité demandée.",
      "60 ÷ 4 = 15 g pour 1 samoussa, puis 10 × 15 g = 150 g.",
      "Il faut 150 g de farce."
    ),
    tags: ["cm2", "proportionnalite", "defi", "cuisine", "reunion"],
  },

  {
    kind: "template",
    id: "cm2_prop_defi_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "sport",
    hint: "Cherche le nombre de kilomètres parcourus en 1 minute.",
    tags: ["cm2", "proportionnalite", "defi", "sport", "template"],
    generate: () => {
      const perMin = randomChoice([2, 3]);
      const minutes = randomChoice([12, 15, 20]);
      const distance = perMin * minutes;

      return {
        text: `Défi sport : un relais parcourt ${perMin} km en 1 minute à vitesse régulière. Quelle distance parcourt-il en ${minutes} minutes ?`,
        format: "short",
        expected: [`${distance}`],
        comparator: "number_equal",
        explanation: exp(
          "À vitesse régulière, la distance est proportionnelle au temps.",
          "On multiplie la distance parcourue en 1 minute par le nombre de minutes.",
          `${perMin} × ${minutes} = ${distance} km.`,
          `Le relais parcourt ${distance} km.`
        ),
      };
    },
  },
];