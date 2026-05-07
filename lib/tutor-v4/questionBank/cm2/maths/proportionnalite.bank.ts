import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function exp(definition: string, methode: string, calcul: string, conclusion: string) {
  return `Définition : ${definition}\n\nMéthode : ${methode}\n\nCalcul : ${calcul}\n\nConclusion : ${conclusion}`;
}

export const proportionnaliteCm2Bank: TutorBankItemV4[] = [
  {
    kind: "fixed",
    id: "cm2_prop_reconnaitre_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite_reconnaitre",
    microId: "reconnaitre_proportionnalite",
    difficulty: 1,
    theme: "neutral",
    text: "À l’école, 1 carnet coûte 2 €. 3 carnets coûtent 6 €. Est-ce proportionnel ?",
    format: "qcm",
    choices: ["oui", "non"],
    expected: ["oui"],
    comparator: "mcq_exact",
    hint: "Regarde si le prix d’un carnet reste le même.",
    explanation: exp(
      "deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.",
      "on compare le prix pour une unité ou on vérifie que quantité et prix sont multipliés pareil.",
      "1 carnet coûte 2 €. Pour 3 carnets, 3 × 2 € = 6 €.",
      "la situation est proportionnelle."
    ),
    tags: ["cm2", "proportionnalite", "reconnaitre", "ecole"],
  },
  {
    kind: "template",
    id: "cm2_prop_reconnaitre_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite_reconnaitre",
    microId: "reconnaitre_proportionnalite",
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
          "une situation est proportionnelle si la même règle multiplicative relie les deux grandeurs.",
          "on cherche le prix d’une mangue, puis on multiplie par le nombre de mangues.",
          `${qty} × ${unit} € = ${total} €.`,
          "le prix suit la quantité : c’est proportionnel."
        ),
      };
    },
  },
  {
    kind: "template",
    id: "cm2_prop_reconnaitre_tpl_2",
    niveau: "cm2",
    matiere: "maths",
    notionId: "proportionnalite_reconnaitre",
    microId: "reconnaitre_proportionnalite",
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
          "dans une situation proportionnelle, doubler une quantité double aussi l’autre grandeur.",
          "on compare le double du prix de 2 gourdes avec le prix annoncé pour 4 gourdes.",
          `le double de ${price} € est ${price * 2} €, pas ${wrong} €.`,
          "la situation n’est pas proportionnelle."
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cm2_prop_table_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableaux_proportionnalite",
    microId: "completer_tableau",
    difficulty: 1,
    theme: "cuisine",
    text: "Recette : 2 verres de jus pour 4 personnes. Combien de verres pour 8 personnes ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "8 personnes, c’est 2 fois plus que 4 personnes.",
    explanation: exp(
      "un tableau de proportionnalité garde le même rapport entre les lignes.",
      "on utilise la linéarité : si une quantité double, l’autre double aussi.",
      "8 personnes = 2 × 4 personnes, donc 2 × 2 verres = 4 verres.",
      "il faut 4 verres de jus."
    ),
    tags: ["cm2", "tableau", "cuisine"],
  },
  {
    kind: "template",
    id: "cm2_prop_table_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "tableaux_proportionnalite",
    microId: "completer_tableau",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le passage à l’unité : combien pour 1 objet ?",
    tags: ["cm2", "tableau", "template"],
    generate: () => {
      const unit = randomChoice([3, 4, 5]);
      const qty1 = randomChoice([2, 3]);
      const qty2 = randomChoice([4, 5, 6]);
      return {
        text: `${qty1} cahiers coûtent ${qty1 * unit} €. Combien coûtent ${qty2} cahiers au même prix ?`,
        format: "short",
        expected: [`${qty2 * unit}`],
        comparator: "number_equal",
        canvas: {
          kind: "tableau_proportionnalite",
          rows: 2,
          cols: 2,
          rowLabels: ["Cahiers", "Prix (€)"],
          values: [[`${qty1}`, `${qty2}`], [`${qty1 * unit}`, "?"]],
          missing: [{ row: 1, col: 1 }],
          highlightedCells: [{ row: 1, col: 1 }],
        },
        explanation: exp(
          "dans un tableau de proportionnalité, le prix unitaire reste constant.",
          "on trouve le prix d’un cahier, puis on multiplie par le nombre demandé.",
          `${qty1 * unit} ÷ ${qty1} = ${unit} €, puis ${qty2} × ${unit} € = ${qty2 * unit} €.`,
          `${qty2} cahiers coûtent ${qty2 * unit} €.`
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cm2_prop_quatrieme_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "quatrieme_proportionnelle",
    microId: "calculer_quatrieme",
    difficulty: 3,
    theme: "sport",
    text: "3 ballons coûtent 18 €. Combien coûtent 5 ballons au même prix ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "Cherche d’abord le prix d’un ballon.",
    explanation: exp(
      "la valeur manquante se calcule avec un raisonnement proportionnel.",
      "on passe par l’unité : prix de 1 ballon, puis prix de 5 ballons.",
      "18 ÷ 3 = 6 €, puis 5 × 6 € = 30 €.",
      "5 ballons coûtent 30 €."
    ),
    tags: ["cm2", "quatrieme", "sport"],
  },
  {
    kind: "template",
    id: "cm2_prop_quatrieme_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "quatrieme_proportionnelle",
    microId: "calculer_quatrieme",
    difficulty: 3,
    theme: "reunion",
    hint: "Passe par 1 kg, puis remonte vers la quantité demandée.",
    tags: ["cm2", "quatrieme", "reunion", "template"],
    generate: () => {
      const unit = randomChoice([3, 4, 6]);
      const kg1 = randomChoice([2, 3]);
      const kg2 = randomChoice([4, 5]);
      return {
        text: `À La Réunion, ${kg1} kg de letchis coûtent ${kg1 * unit} €. Combien coûtent ${kg2} kg ?`,
        format: "short",
        expected: [`${kg2 * unit}`],
        comparator: "number_equal",
        explanation: exp(
          "une quatrième proportionnelle est la valeur manquante dans une situation proportionnelle.",
          "au CM2, on privilégie le passage à l’unité ou la linéarité, sans produit en croix.",
          `${kg1 * unit} ÷ ${kg1} = ${unit} € pour 1 kg, puis ${kg2} × ${unit} € = ${kg2 * unit} €.`,
          `${kg2} kg coûtent ${kg2 * unit} €.`
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cm2_prop_pourcentage_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentages_simples",
    microId: "utiliser_pourcentage_simple",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe de 100 élèves imaginaires, 25 % aiment les échecs. Combien d’élèves cela représente-t-il ?",
    format: "short",
    expected: ["25"],
    comparator: "number_equal",
    hint: "25 % signifie 25 sur 100.",
    explanation: exp(
      "un pourcentage exprime une quantité pour 100.",
      "quand le total est 100, le nombre du pourcentage donne directement la quantité.",
      "25 % de 100 = 25.",
      "cela représente 25 élèves."
    ),
    tags: ["cm2", "pourcentage", "ecole"],
  },
  {
    kind: "template",
    id: "cm2_prop_pourcentage_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "pourcentages_simples",
    microId: "utiliser_pourcentage_simple",
    difficulty: 3,
    theme: "cuisine",
    hint: "10 %, c’est un dixième ; 50 %, c’est la moitié.",
    tags: ["cm2", "pourcentage", "cuisine", "template"],
    generate: () => {
      const total = randomChoice([40, 60, 80]);
      const pct = randomChoice([10, 25, 50]);
      const value = (total * pct) / 100;
      return {
        text: `Pour une recette, on utilise ${pct} % d’un paquet de ${total} g de noix de coco. Quelle masse est utilisée ?`,
        format: "short",
        expected: [`${value}`],
        comparator: "number_equal",
        explanation: exp(
          "un pourcentage simple peut se calculer comme une fraction de 100.",
          "on remplace le pourcentage par une part connue puis on calcule la quantité.",
          `${pct} % de ${total} g = ${value} g.`,
          `la masse utilisée est ${value} g.`
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cm2_prop_echelle_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelles_simples",
    microId: "utiliser_echelle",
    difficulty: 3,
    theme: "neutral",
    text: "Sur un plan, 1 cm représente 2 m. Un jardin mesure 4 cm sur le plan. Quelle est sa longueur réelle en mètres ?",
    format: "short",
    expected: ["8"],
    comparator: "number_equal",
    hint: "Chaque centimètre du plan vaut 2 mètres en vrai.",
    explanation: exp(
      "une échelle simple relie une longueur sur le plan à une longueur réelle.",
      "on multiplie la longueur du plan par la valeur réelle de 1 cm.",
      "4 × 2 m = 8 m.",
      "la longueur réelle est 8 m."
    ),
    tags: ["cm2", "echelle"],
  },
  {
    kind: "template",
    id: "cm2_prop_echelle_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelles_simples",
    microId: "utiliser_echelle",
    difficulty: 4,
    theme: "reunion",
    hint: "Multiplie la distance sur la carte par la distance représentée par 1 cm.",
    tags: ["cm2", "echelle", "reunion", "template"],
    generate: () => {
      const scale = randomChoice([3, 5]);
      const cm = randomInt(2, 6);
      return {
        text: `Sur une carte simplifiée de La Réunion, 1 cm représente ${scale} km. Un trajet mesure ${cm} cm. Quelle distance réelle cela représente-t-il ?`,
        format: "short",
        expected: [`${cm * scale}`],
        comparator: "number_equal",
        explanation: exp(
          "une échelle indique la distance réelle représentée par une distance sur la carte.",
          "on applique la même multiplication à chaque centimètre lu sur la carte.",
          `${cm} × ${scale} km = ${cm * scale} km.`,
          `le trajet représente ${cm * scale} km.`
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "cm2_prop_defi_fixed_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelles_simples",
    microId: "proportionnalite_defis",
    difficulty: 4,
    theme: "cuisine",
    text: "Défi cuisine : 4 samoussas demandent 60 g de farce. Combien de farce pour 10 samoussas ?",
    format: "short",
    expected: ["150"],
    comparator: "number_equal",
    hint: "Passe par 1 samoussa : 60 ÷ 4.",
    explanation: exp(
      "un défi de proportionnalité reste une situation où la même règle relie deux grandeurs.",
      "on passe par l’unité, puis on multiplie par la quantité demandée.",
      "60 ÷ 4 = 15 g pour 1 samoussa, puis 10 × 15 g = 150 g.",
      "il faut 150 g de farce."
    ),
    tags: ["cm2", "defi", "cuisine", "reunion"],
  },
  {
    kind: "template",
    id: "cm2_prop_defi_tpl_1",
    niveau: "cm2",
    matiere: "maths",
    notionId: "echelles_simples",
    microId: "proportionnalite_defis",
    difficulty: 5,
    theme: "sport",
    hint: "Cherche le nombre de kilomètres parcourus en 1 minute.",
    tags: ["cm2", "defi", "sport", "template"],
    generate: () => {
      const perMin = randomChoice([2, 3]);
      const minutes = randomChoice([12, 15, 20]);
      return {
        text: `Défi sport : un relais parcourt ${perMin} km en 1 minute à vitesse régulière. Quelle distance parcourt-il en ${minutes} minutes ?`,
        format: "short",
        expected: [`${perMin * minutes}`],
        comparator: "number_equal",
        explanation: exp(
          "à vitesse régulière, la distance est proportionnelle au temps.",
          "on multiplie la distance parcourue en 1 minute par le nombre de minutes.",
          `${perMin} × ${minutes} = ${perMin * minutes} km.`,
          `le relais parcourt ${perMin * minutes} km.`
        ),
      };
    },
  },
];
