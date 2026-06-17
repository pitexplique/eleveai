import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function formatEuro(n: number) {
  return [`${n}`, `${n}€`, `${n} €`];
}


function expl(calcul: string) {
  return (
    "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
    "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
    calcul +
    "\n\nConclusion : la valeur obtenue respecte la proportionnalité."
  );
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // =========================
  // PROP_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Si 3 cahiers coûtent 9 € et 6 cahiers coûtent 18 €, la situation est-elle proportionnelle ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Quand on multiplie la quantité par un nombre, le prix doit être multiplié par le même nombre.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 3 à 6 cahiers en multipliant par 2. Le prix passe aussi de 9 € à 18 € en multipliant par 2. La situation est donc proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Si 4 billets coûtent 10 € et 8 billets coûtent 21 €, la situation est-elle proportionnelle ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "Si on double la quantité, l’autre grandeur doit aussi doubler.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 4 à 8 billets en multipliant par 2. Si la situation était proportionnelle, le prix devrait passer de 10 € à 20 €. Or on obtient 21 €. La situation n’est donc pas proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 2 ananas coûtent 6 € et 5 ananas coûtent 15 €. La situation est-elle proportionnelle ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Vérifie si le prix d’un ananas reste le même.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("2 ananas coûtent 6 €, donc 1 ananas coûte 3 €. 5 ananas coûtent 15 €, donc 1 ananas coûte aussi 3 €. Le prix unitaire reste constant : la situation est proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "2 stylos coûtent 4 € et 6 stylos coûtent 12 €",
      "3 tickets coûtent 9 € et 5 tickets coûtent 16 €",
      "4 jus coûtent 8 € et 8 jus coûtent 17 €",
      "5 cahiers coûtent 10 € et 10 cahiers coûtent 19 €",
    ],
    expected: ["2 stylos coûtent 4 € et 6 stylos coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Cherche le cas où les deux grandeurs sont multipliées par le même coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Dans la bonne réponse, on passe de 2 à 6 stylos en multipliant par 3, et le prix passe de 4 € à 12 € en multipliant aussi par 3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation traduit une proportionnalité ?",
    format: "qcm",
    choices: [
      "1 bouteille recyclée donne 2 points, 4 bouteilles donnent 8 points",
      "2 arbres plantés donnent 5 badges, 4 arbres donnent 9 badges",
      "3 affiches collées coûtent 6 €, 6 affiches coûtent 13 €",
      "5 gourdes coûtent 20 €, 10 gourdes coûtent 39 €",
    ],
    expected: ["1 bouteille recyclée donne 2 points, 4 bouteilles donnent 8 points"],
    comparator: "mcq_exact",
    hint: "Dans une situation proportionnelle, le rapport reste le même.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Dans la bonne réponse, on passe de 1 à 4 en multipliant par 4, et les points passent de 2 à 8 en multipliant aussi par 4.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm", "neutral"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 cahiers coûtent 12 €, combien coûtent 9 cahiers ?",
    format: "short",
    expected: formatEuro(36),
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 3 à 9 cahiers en multipliant par 3. Le prix est donc multiplié par 3 : 12 × 3 = 36 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 8 stylos coûtent 20 €, combien coûtent 4 stylos ?",
    format: "short",
    expected: formatEuro(10),
    comparator: "number_equal",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 stylos, c’est la moitié de 8 stylos. Le prix est donc la moitié de 20 €, soit 10 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 4 samoussas coûtent 8 €. Combien coûtent 10 samoussas ?",
    format: "short",
    expected: formatEuro(20),
    comparator: "number_equal",
    hint: "Commence par trouver le prix d’un samoussa.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 samoussas coûtent 8 €, donc 1 samoussa coûte 2 €. Alors 10 samoussas coûtent 10 × 2 = 20 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "sport",
    text: "Pour un tournoi, 5 bouteilles d’eau coûtent 15 €. Combien coûtent 15 bouteilles ?",
    format: "qcm",
    choices: ["30 €", "35 €", "45 €", "60 €"],
    expected: ["45 €"],
    comparator: "mcq_exact",
    hint: "De 5 à 15, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 5 à 15 bouteilles en multipliant par 3. Le prix passe donc de 15 € à 45 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "sport", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 6 œufs coûtent 12 €. Combien coûtent 3 œufs ?",
    format: "qcm",
    choices: ["3 €", "4 €", "6 €", "9 €"],
    expected: ["6 €"],
    comparator: "mcq_exact",
    hint: "3 est la moitié de 6.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("3 œufs, c’est la moitié de 6 œufs. Le prix est donc la moitié de 12 €, soit 6 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "tableau", "cuisine", "qcm"],
  },

  // =========================
  // PROP_QUATRIEME
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 4 objets coûtent 12 €. 7 objets coûtent ... €",
    format: "short",
    expected: formatEuro(21),
    comparator: "number_equal",
    hint: "Passe par l’unité ou par le coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 objets coûtent 12 €, donc 1 objet coûte 3 €. Alors 7 objets coûtent 7 × 3 = 21 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 3 kg de pommes coûtent 9 €. 11 kg coûtent ... €",
    format: "short",
    expected: formatEuro(33),
    comparator: "number_equal",
    hint: "Cherche d’abord le prix de 1 kg.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("3 kg coûtent 9 €, donc 1 kg coûte 3 €. Alors 11 kg coûtent 11 × 3 = 33 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché forain, 5 mangues coûtent 15 €. Combien coûtent 9 mangues ?",
    format: "qcm",
    choices: ["24 €", "25 €", "27 €", "30 €"],
    expected: ["27 €"],
    comparator: "mcq_exact",
    hint: "Calcule le prix d’une mangue.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("5 mangues coûtent 15 €, donc 1 mangue coûte 3 €. Alors 9 mangues coûtent 27 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "qcm", "reunion"],
  },

  // =========================
  // PROP_COEFF
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 4 stylos coûtent 20 €, quel est le coefficient de proportionnalité ?",
    format: "short",
    expected: ["5"],
    comparator: "number_equal",
    hint: "Le coefficient est le prix de 1 stylo.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 stylos coûtent 20 €, donc 1 stylo coûte 20 ÷ 4 = 5 €. Le coefficient de proportionnalité est 5.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une situation de proportionnalité, si 1 ticket coûte 3 €, quel nombre multiplie le nombre de tickets pour obtenir le prix ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Prix = quantité × coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Chaque ticket coûte 3 €. Pour obtenir le prix total, on multiplie le nombre de tickets par 3. Le coefficient est donc 3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "8 gourdes coûtent 24 €. Quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["2", "3", "8", "24"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Calcule le prix pour 1 gourde.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("24 ÷ 8 = 3. Le coefficient de proportionnalité est 3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient", "qcm", "neutral"],
  },

  // =========================
  // PROP_RATIO
  // =========================
  {
    kind: "fixed",
    id: "prop_rapport_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "cuisine",
    text: "Dans un mélange, il y a 2 doses de sirop pour 3 doses d’eau. Quel est le ratio sirop:eau ?",
    format: "short",
    expected: ["2:3", "2 pour 3", "2/3"],
    comparator: "contains_keyword",
    hint: "Écris les deux quantités dans l’ordre demandé.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le mélange contient 2 doses de sirop et 3 doses d’eau. Le ratio sirop:eau est donc 2:3.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "ratio", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "sport",
    text: "Dans une équipe, il y a 4 filles et 6 garçons. Quel est le ratio filles:garçons ?",
    format: "short",
    expected: ["4:6", "4 pour 6", "4/6"],
    comparator: "contains_keyword",
    hint: "On ne te demande pas forcément de simplifier ici.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Il y a 4 filles pour 6 garçons. Le ratio filles:garçons est donc 4:6.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "ratio", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "reunion",
    text: "Pour faire un jus, on mélange 1 dose de sirop avec 4 doses d’eau. Si on utilise 3 doses de sirop, combien faut-il de doses d’eau ?",
    format: "qcm",
    choices: ["7", "9", "12", "15"],
    expected: ["12"],
    comparator: "mcq_exact",
    hint: "Le ratio 1:4 doit être conservé.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le ratio est 1 dose de sirop pour 4 doses d’eau. Avec 3 doses de sirop, il faut 3 × 4 = 12 doses d’eau.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "ratio", "qcm", "reunion"],
  },

  // =========================
  // PROP_POURCENTAGE
  // =========================
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "20 % de 50 vaut combien ?",
    format: "short",
    expected: ["10"],
    comparator: "number_equal",
    hint: "20 %, c’est 20 sur 100, soit 0,2.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("20 % de 50 = 0,2 × 50 = 10.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "25 % de 80 vaut combien ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "25 %, c’est le quart.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("25 % correspond à un quart. Un quart de 80 vaut 20.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un collège, 30 % des 200 élèves viennent à vélo. Combien cela représente-t-il d’élèves ?",
    format: "short",
    expected: ["60"],
    comparator: "number_equal",
    hint: "Calcule 30 % de 200.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("30 % de 200 = 0,3 × 200 = 60. Cela représente 60 élèves.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage", "neutral"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Un tee-shirt coûte 40 €. Il y a 10 % de réduction. Quel est le montant de la réduction ?",
    format: "qcm",
    choices: ["2 €", "4 €", "8 €", "10 €"],
    expected: ["4 €"],
    comparator: "mcq_exact",
    hint: "10 % de 40, c’est 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("10 % de 40 € = 4 €. La réduction est donc de 4 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "soldes"],
  },

  // =========================
  // PROP_COEFF_MULT
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une hausse de 20 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["1,2", "1.2"],
    comparator: "number_equal",
    hint: "Pour une hausse de p %, on multiplie par 1 + p/100.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Une hausse de 20 % signifie qu’on garde 100 % puis on ajoute 20 %, soit 120 % = 1,2. Le coefficient multiplicateur est donc 1,2.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une réduction de 15 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["0,85", "0.85"],
    comparator: "number_equal",
    hint: "Pour une baisse de p %, on multiplie par 1 - p/100.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Après une réduction de 15 %, il reste 85 % du prix initial, soit 0,85. Le coefficient multiplicateur est donc 0,85.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel coefficient multiplicateur correspond à une hausse de 5 % ?",
    format: "qcm",
    choices: ["0,95", "1,05", "1,5", "5"],
    expected: ["1,05"],
    comparator: "mcq_exact",
    hint: "On garde 100 % et on ajoute 5 %.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("100 % + 5 % = 105 %, soit 1,05. Le coefficient multiplicateur est 1,05.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "qcm", "soldes"],
  },

  // =========================
  // PROP_PROBLEME
  // =========================
  {
    kind: "fixed",
    id: "prop_probleme_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "cuisine",
    text: "Pour 4 personnes, il faut 300 g de riz. Quelle quantité faut-il pour 10 personnes ?",
    format: "short",
    expected: ["750", "750 g", "750g"],
    comparator: "number_equal",
    hint: "Passe à 1 personne puis multiplie par 10.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Pour 4 personnes, il faut 300 g. Donc pour 1 personne, il faut 300 ÷ 4 = 75 g. Pour 10 personnes, il faut 75 × 10 = 750 g.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "reunion",
    text: "Au marché, 3 kg de tomates coûtent 7,50 €. Combien coûtent 8 kg ?",
    format: "short",
    expected: ["20", "20€", "20 €"],
    comparator: "number_equal",
    hint: "Trouve d’abord le prix de 1 kg.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("3 kg coûtent 7,50 €, donc 1 kg coûte 2,50 €. Alors 8 kg coûtent 8 × 2,50 = 20 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "sport",
    text: "Une équipe marque 18 points en 6 matchs. En gardant le même rythme, combien marquerait-elle en 15 matchs ?",
    format: "qcm",
    choices: ["36", "42", "45", "54"],
    expected: ["45"],
    comparator: "mcq_exact",
    hint: "Calcule le nombre de points par match.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("18 points en 6 matchs, cela fait 3 points par match. En 15 matchs, l’équipe marquerait 15 × 3 = 45 points.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "sport", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Un sac coûte 60 €. Il y a 20 % de réduction. Quel est le nouveau prix ?",
    format: "qcm",
    choices: ["12 €", "40 €", "48 €", "72 €"],
    expected: ["48 €"],
    comparator: "mcq_exact",
    hint: "Calcule la réduction, puis retire-la au prix initial.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("20 % de 60 € = 12 €. Le nouveau prix est donc 60 € - 12 € = 48 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "probleme", "pourcentage", "qcm", "soldes"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "cuisine",
    text: "Une boisson est préparée avec un ratio sirop:eau de 2:5. Si on utilise 8 verres de sirop, combien faut-il de verres d’eau ?",
    format: "short",
    expected: ["20"],
    comparator: "number_equal",
    hint: "De 2 à 8, on multiplie par 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le ratio est 2:5. Si on passe de 2 verres de sirop à 8 verres, on multiplie par 4. Il faut donc 5 × 4 = 20 verres d’eau.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "ratio", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un prix augmente de 20 %. Il valait 50 €. Quel est le nouveau prix ?",
    format: "short",
    expected: formatEuro(60),
    comparator: "number_equal",
    hint: "Tu peux utiliser le coefficient multiplicateur 1,2.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Une hausse de 20 % correspond au coefficient multiplicateur 1,2. On calcule donc 50 × 1,2 = 60 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "coefficient_multiplicateur", "neutral"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la situation suivante n’est pas proportionnelle : 5 tickets coûtent 12 € et 10 tickets coûtent 25 €.",
    format: "short",
    expected: ["double", "24", "25", "pas proportionnelle"],
    comparator: "contains_keyword",
    hint: "Si on double la quantité, la deuxième grandeur doit aussi doubler.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Quand on passe de 5 à 10 tickets, on double la quantité. Si la situation était proportionnelle, le prix devrait passer de 12 € à 24 €. Or ici il passe à 25 €. Ce n’est donc pas une situation proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "prop_defi_qcm_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, 6 bouchons coûtent 9 €. Combien coûtent 14 bouchons ?",
    format: "qcm",
    choices: ["18 €", "19 €", "21 €", "24 €"],
    expected: ["21 €"],
    comparator: "mcq_exact",
    hint: "Trouve d’abord le prix d’un bouchon.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("6 bouchons coûtent 9 €, donc 1 bouchon coûte 1,5 €. Alors 14 bouchons coûtent 14 × 1,5 = 21 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "defi", "qcm", "reunion"],
  },

  // =========================
  // TEMPLATES - PROP_RECONNAITRE
  // =========================
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Vérifie si le même coefficient transforme les deux grandeurs.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4, 5]);
      const coef = randomChoice([2, 3]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;
      const targetQty = qty * coef;
      const isProp = Math.random() > 0.5;
      const targetTotal = isProp ? total * coef : total * coef + randomChoice([1, 2]);

      return {
        text: `La situation suivante est-elle proportionnelle : ${qty} objets coûtent ${total} € et ${targetQty} objets coûtent ${targetTotal} € ?`,
        format: "short",
        expected: [isProp ? "oui" : "non"],
        comparator: "contains_keyword",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (isProp
          ? `On passe de ${qty} à ${targetQty} en multipliant par ${coef}, et le prix passe aussi de ${total} à ${targetTotal} en multipliant par ${coef}. La situation est proportionnelle.`
          : `On passe de ${qty} à ${targetQty} en multipliant par ${coef}, mais le prix ne suit pas exactement le même coefficient. La situation n’est donc pas proportionnelle.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_TABLE
  // =========================
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe par le coefficient ou par l’unité.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4, 5]);
      const unit = randomChoice([2, 3, 4, 5]);
      const total = qty * unit;
      const targetQty = randomChoice([6, 8, 10, 12]);

      return {
        text: `${qty} objets coûtent ${total} €. Combien coûtent ${targetQty} objets ?`,
        format: "short",
        expected: formatEuro(targetQty * unit),
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`${qty} objets coûtent ${total} €, donc 1 objet coûte ${unit} €. Alors ${targetQty} objets coûtent ${targetQty} × ${unit} = ${targetQty * unit} €.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_qcm_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche par combien la quantité est multipliée ou divisée.",
    tags: ["prop_proportionnalite", "tableau", "qcm", "template"],
    generate: () => {
      const qty = randomChoice([4, 6, 8]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;
      const divisor = randomChoice([2, 4]);
      const targetQty = qty / divisor;
      const good = total / divisor;

      return {
        text: `${qty} objets coûtent ${total} €. Combien coûtent ${targetQty} objets ?`,
        format: "qcm",
        choices: shuffle([
          `${good} €`,
          `${good + unit} €`,
          `${good + 2} €`,
          `${total} €`,
        ]),
        expected: [`${good} €`],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`On passe de ${qty} à ${targetQty} en divisant par ${divisor}. Le prix est donc aussi divisé par ${divisor} : ${total} ÷ ${divisor} = ${good} €.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_QUATRIEME
  // =========================
  {
    kind: "template",
    id: "prop_quatrieme_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord la valeur pour 1 unité.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4, 5]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;
      const targetQty = randomChoice([7, 8, 9, 10]);

      return {
        text: `Complète : ${qty} objets coûtent ${total} €. ${targetQty} objets coûtent ... €`,
        format: "short",
        expected: formatEuro(targetQty * unit),
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`${qty} objets coûtent ${total} €, donc 1 objet coûte ${unit} €. Alors ${targetQty} objets coûtent ${targetQty * unit} €.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_COEFF
  // =========================
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est la valeur pour 1 unité.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4, 5, 6]);
      const unit = randomChoice([2, 3, 4, 5]);
      const total = qty * unit;

      return {
        text: `Si ${qty} objets coûtent ${total} €, quel est le coefficient de proportionnalité ?`,
        format: "short",
        expected: [String(unit)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`${total} ÷ ${qty} = ${unit}. Le coefficient de proportionnalité est donc ${unit}.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_RATIO
  // =========================
  {
    kind: "template",
    id: "prop_rapport_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    hint: "Le ratio doit rester le même.",
    tags: ["prop_proportionnalite", "ratio", "template"],
    generate: () => {
      const a = randomChoice([1, 2, 3]);
      const b = randomChoice([2, 3, 4, 5]);
      const mult = randomChoice([2, 3, 4]);
      const qtyA = a * mult;
      const good = b * mult;

      return {
        text: `Dans un mélange, le ratio sirop:eau est ${a}:${b}. Si on utilise ${qtyA} doses de sirop, combien faut-il de doses d’eau ?`,
        format: "short",
        expected: [String(good)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`Le ratio ${a}:${b} doit être conservé. Comme on passe de ${a} à ${qtyA} en multipliant par ${mult}, on passe aussi de ${b} à ${good} en multipliant par ${mult}.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_POURCENTAGE
  // =========================
  {
    kind: "template",
    id: "prop_pourcentage_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Un pourcentage, c’est une fraction sur 100.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => {
      const base = randomChoice([40, 50, 80, 100, 120, 200]);
      const percent = randomChoice([10, 20, 25, 30, 50]);
      const good = (base * percent) / 100;

      return {
        text: `${percent} % de ${base} vaut combien ?`,
        format: "short",
        expected: [String(good)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`${percent} % de ${base} = ${percent}/100 × ${base} = ${good}.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_pourcentage_qcm_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Calcule d’abord le pourcentage demandé.",
    tags: ["prop_proportionnalite", "pourcentage", "qcm", "template"],
    generate: () => {
      const base = randomChoice([20, 40, 60, 80, 100]);
      const percent = randomChoice([10, 20, 25]);
      const good = (base * percent) / 100;

      return {
        text: `Quel est le montant de ${percent} % de ${base} € ?`,
        format: "qcm",
        choices: shuffle([
          `${good} €`,
          `${good + 2} €`,
          `${good + 5} €`,
          `${base} €`,
        ]),
        expected: [`${good} €`],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`${percent} % de ${base} € = ${good} €.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_COEFF_MULT
  // =========================
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    hint: "Pour une hausse, on ajoute au 1 ; pour une baisse, on enlève au 1.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "template"],
    generate: () => {
      const percent = randomChoice([5, 10, 20, 25]);
      const isIncrease = Math.random() > 0.5;
      const coeff = isIncrease
        ? 1 + percent / 100
        : 1 - percent / 100;

      return {
        text: isIncrease
          ? `Une hausse de ${percent} % correspond à quel coefficient multiplicateur ?`
          : `Une réduction de ${percent} % correspond à quel coefficient multiplicateur ?`,
        format: "short",
        expected: [String(coeff).replace(".", ","), String(coeff)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (isIncrease
          ? `Une hausse de ${percent} % correspond à ${100 + percent} %, soit ${coeff}.`
          : `Après une réduction de ${percent} %, il reste ${100 - percent} %, soit ${coeff}.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_PROBLEME
  // =========================
  {
    kind: "template",
    id: "prop_probleme_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "cuisine",
    hint: "Passe par l’unité.",
    tags: ["prop_proportionnalite", "probleme", "template"],
    generate: () => {
      const persons = randomChoice([2, 4, 5]);
      const gramsPerPerson = randomChoice([50, 75, 100]);
      const total = persons * gramsPerPerson;
      const targetPersons = randomChoice([6, 8, 10]);

      return {
        text: `Pour ${persons} personnes, il faut ${total} g de farine. Quelle quantité faut-il pour ${targetPersons} personnes ?`,
        format: "short",
        expected: [`${targetPersons * gramsPerPerson}`, `${targetPersons * gramsPerPerson} g`, `${targetPersons * gramsPerPerson}g`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`Pour 1 personne, il faut ${gramsPerPerson} g. Pour ${targetPersons} personnes, il faut ${targetPersons * gramsPerPerson} g.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_DEFIS
  // =========================
  {
    kind: "template",
    id: "prop_defi_tpl_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "defi", "template"],
    generate: () => {
      const base = randomChoice([20, 30, 40, 50, 60]);
      const percent = randomChoice([10, 20, 25]);
      const good = base * (1 + percent / 100);

      return {
        text: `Un prix de ${base} € augmente de ${percent} %. Quel est le nouveau prix ?`,
        format: "short",
        expected: formatEuro(good),
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          (`Une hausse de ${percent} % correspond au coefficient multiplicateur ${1 + percent / 100}. Le nouveau prix est donc ${base} × ${1 + percent / 100} = ${good} €.`) +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
      };
    },
  },
    /* =========================
     QUESTIONS OUVERTES — PROPORTIONNALITÉ
  ========================= */
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique pourquoi 3 cahiers coûtent 9 € et 6 cahiers coûtent 18 € est une situation proportionnelle.",
    format: "open",
    expected: ["double", "3", "6", "9", "18"],
    comparator: "contains_keyword",
    hint: "Regarde si les deux grandeurs sont multipliées par le même nombre.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 3 à 6 cahiers en multipliant par 2, et de 9 € à 18 € en multipliant aussi par 2. La situation est proportionnelle.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_table_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le prix de 9 cahiers si 3 cahiers coûtent 12 €.",
    format: "open",
    expected: ["3", "9", "12", "36"],
    comparator: "contains_keyword",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On passe de 3 à 9 cahiers en multipliant par 3. Le prix est donc aussi multiplié par 3 : 12 × 3 = 36 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer le prix de 7 objets si 4 objets coûtent 12 €.",
    format: "open",
    expected: ["12", "4", "3", "7", "21"],
    comparator: "contains_keyword",
    hint: "Passe par le prix d’un objet.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("4 objets coûtent 12 €, donc 1 objet coûte 3 €. Alors 7 objets coûtent 7 × 3 = 21 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient de proportionnalité si 4 stylos coûtent 20 €.",
    format: "open",
    expected: ["20", "4", "5", "divise"],
    comparator: "contains_keyword",
    hint: "Le coefficient correspond ici au prix d’un stylo.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("On divise 20 par 4 : 20 ÷ 4 = 5. Le coefficient de proportionnalité est 5.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    text: "Explique pourquoi avec un ratio sirop:eau de 2:5, 8 verres de sirop nécessitent 20 verres d’eau.",
    format: "open",
    expected: ["2", "5", "8", "20", "multiplie"],
    comparator: "contains_keyword",
    hint: "De 2 à 8, on multiplie par 4.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Le ratio est 2:5. On passe de 2 à 8 en multipliant par 4, donc on multiplie aussi 5 par 4 : il faut 20 verres d’eau.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "ratio"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment calculer 25 % de 80.",
    format: "open",
    expected: ["25", "quart", "80", "20"],
    comparator: "contains_keyword",
    hint: "25 %, c’est un quart.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("25 % correspond à un quart. Un quart de 80 vaut 20, donc 25 % de 80 = 20.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi une réduction de 15 % correspond à multiplier par 0,85.",
    format: "open",
    expected: ["100", "15", "85", "0,85"],
    comparator: "contains_keyword",
    hint: "Après une réduction de 15 %, il reste 85 %.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("Une réduction de 15 % signifie qu’il reste 85 % de la valeur initiale. Or 85 % = 85/100 = 0,85.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Un élève dit : « Si 5 tickets coûtent 12 €, alors 10 tickets coûtent 25 € parce qu’on ajoute 13 ». Explique son erreur.",
    format: "open",
    expected: ["double", "24", "25", "proportionnelle", "erreur"],
    comparator: "contains_keyword",
    hint: "Si la quantité double, le prix doit doubler aussi.",
    explanation: "Définition : deux grandeurs sont proportionnelles quand on passe de l’une à l’autre avec un même coefficient.\n\n" +
          "Méthode : on utilise le coefficient de proportionnalité, un tableau ou un produit en croix.\n\nCalcul : " +
          ("L’élève raisonne par addition. En proportionnalité, on utilise une multiplication. Si 5 tickets coûtent 12 €, alors 10 tickets devraient coûter 24 €, pas 25 €.") +
          "\n\nConclusion : la valeur obtenue respecte la proportionnalité.",
    tags: ["prop_proportionnalite", "open", "defi", "erreur"],
  },

  // =========================
  // TOP-UP — PROP_RECONNAITRE (+3)
  // =========================
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Si 5 places coûtent 25 € et 8 places coûtent 40 €, la situation est-elle proportionnelle ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Calcule le prix d’une place dans chaque cas.",
    explanation: expl("25 ÷ 5 = 5 € et 40 ÷ 8 = 5 €. Le prix unitaire est constant : la situation est proportionnelle."),
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment vérifier qu’une situation est proportionnelle à partir d’un tableau de valeurs.",
    format: "open",
    expected: ["coefficient", "même", "quotient"],
    comparator: "contains_keyword",
    hint: "Compare les quotients d’une grandeur par l’autre.",
    explanation: expl("On calcule le quotient de chaque valeur par sa correspondante : si on obtient toujours le même coefficient, la situation est proportionnelle."),
    tags: ["prop_proportionnalite", "reconnaitre", "open"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 3,
    theme: "neutral",
    text: "Quelle situation N’est PAS proportionnelle ?",
    format: "qcm",
    choices: [
      "l’âge d’une personne et sa taille",
      "le nombre de litres d’essence et le prix payé",
      "la masse de pommes et leur prix au kilo",
      "le nombre de billets et leur prix unitaire fixe",
    ],
    expected: ["l’âge d’une personne et sa taille"],
    comparator: "mcq_exact",
    hint: "La taille ne double pas quand l’âge double.",
    explanation: expl("La taille n’est pas proportionnelle à l’âge : un enfant de 10 ans ne mesure pas le double d’un enfant de 5 ans."),
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },

  // =========================
  // TOP-UP — PROP_TABLE (+2)
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 m de tissu coûtent 12 €, combien coûtent 7 m ?",
    format: "short",
    expected: formatEuro(28),
    comparator: "number_equal",
    hint: "Prix de 1 m d’abord.",
    explanation: expl("3 m coûtent 12 €, donc 1 m coûte 4 €. Alors 7 m coûtent 7 × 4 = 28 €."),
    tags: ["prop_proportionnalite", "table"],
  },
  {
    kind: "template",
    id: "prop_table_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d’abord le prix unitaire.",
    tags: ["prop_proportionnalite", "table", "template"],
    generate: () => {
      const unit = randomChoice([2, 3, 4, 5]);
      const q1 = randomChoice([2, 3, 4]);
      const q2 = randomChoice([6, 7, 8, 9]);
      const prix1 = q1 * unit;
      const prix2 = q2 * unit;
      return {
        text: `Tableau de proportionnalité : ${q1} articles coûtent ${prix1} €. Combien coûtent ${q2} articles ?`,
        format: "short",
        expected: formatEuro(prix2),
        comparator: "number_equal",
        explanation: expl(`${q1} articles coûtent ${prix1} €, donc 1 article coûte ${unit} €. Alors ${q2} articles coûtent ${q2} × ${unit} = ${prix2} €.`),
      };
    },
  },

  // =========================
  // TOP-UP — PROP_QUATRIEME (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 2,
    theme: "neutral",
    text: "Complète : 6 cahiers coûtent 18 €. 10 cahiers coûtent ... €",
    format: "short",
    expected: formatEuro(30),
    comparator: "number_equal",
    hint: "Prix de 1 cahier.",
    explanation: expl("6 cahiers coûtent 18 €, donc 1 cahier coûte 3 €. Alors 10 cahiers coûtent 30 €."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "Une voiture parcourt 120 km en 2 h à vitesse constante. Quelle distance parcourt-elle en 5 h ?",
    format: "short",
    expected: ["300", "300 km"],
    comparator: "number_equal",
    hint: "Distance en 1 h d’abord.",
    explanation: expl("120 km en 2 h, donc 60 km en 1 h. En 5 h : 5 × 60 = 300 km."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle"],
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    text: "Explique la méthode du passage à l’unité pour trouver une quatrième proportionnelle.",
    format: "open",
    expected: ["unité", "diviser", "multiplier"],
    comparator: "contains_keyword",
    hint: "On cherche d’abord la valeur pour 1.",
    explanation: expl("On divise pour trouver la valeur d’une seule unité, puis on multiplie par la quantité demandée."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "open"],
  },
  {
    kind: "template",
    id: "prop_quatrieme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "neutral",
    hint: "Passe par le prix unitaire.",
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "template"],
    generate: () => {
      const unit = randomChoice([2, 3, 4, 6]);
      const q1 = randomChoice([3, 4, 5]);
      const q2 = randomChoice([7, 8, 9, 11]);
      return {
        text: `Complète : ${q1} objets coûtent ${q1 * unit} €. ${q2} objets coûtent ... €`,
        format: "short",
        expected: formatEuro(q2 * unit),
        comparator: "number_equal",
        explanation: expl(`1 objet coûte ${unit} €. Donc ${q2} objets coûtent ${q2} × ${unit} = ${q2 * unit} €.`),
      };
    },
  },
  {
    kind: "fixed",
    id: "prop_quatrieme_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_quatrieme",
    difficulty: 3,
    theme: "reunion",
    text: "8 letchis coûtent 4 €. Combien coûtent 20 letchis ?",
    format: "qcm",
    choices: ["8 €", "10 €", "12 €", "16 €"],
    expected: ["10 €"],
    comparator: "mcq_exact",
    hint: "Prix d’un letchi : 0,50 €.",
    explanation: expl("8 letchis coûtent 4 €, donc 1 letchi coûte 0,50 €. Alors 20 letchis coûtent 20 × 0,50 = 10 €."),
    tags: ["prop_proportionnalite", "quatrieme_proportionnelle", "qcm", "reunion"],
  },

  // =========================
  // TOP-UP — PROP_COEFF (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 6 kg de riz coûtent 12 €, quel est le coefficient (prix au kg) ?",
    format: "short",
    expected: ["2"],
    comparator: "number_equal",
    hint: "12 ÷ 6.",
    explanation: expl("12 ÷ 6 = 2. Le coefficient de proportionnalité (prix au kg) est 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Une recette utilise 250 g de farine pour 5 crêpes. Quelle masse de farine par crêpe ?",
    format: "short",
    expected: ["50", "50 g"],
    comparator: "number_equal",
    hint: "250 ÷ 5.",
    explanation: expl("250 ÷ 5 = 50. Le coefficient est 50 g de farine par crêpe."),
    tags: ["prop_proportionnalite", "coefficient", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que représente le coefficient de proportionnalité dans une situation prix/quantité.",
    format: "open",
    expected: ["prix", "unité", "un"],
    comparator: "contains_keyword",
    hint: "C’est le prix d’une seule unité.",
    explanation: expl("Le coefficient de proportionnalité est le prix d’une seule unité (le prix unitaire). On multiplie la quantité par ce coefficient pour obtenir le prix total."),
    tags: ["prop_proportionnalite", "coefficient", "open"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "10 entrées coûtent 50 €. Quel est le coefficient (prix d’une entrée) ?",
    format: "qcm",
    choices: ["5", "10", "50", "0,2"],
    expected: ["5"],
    comparator: "mcq_exact",
    hint: "50 ÷ 10.",
    explanation: expl("50 ÷ 10 = 5. Le coefficient est 5 € par entrée."),
    tags: ["prop_proportionnalite", "coefficient", "qcm"],
  },
  {
    kind: "template",
    id: "prop_coeff_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 3,
    theme: "neutral",
    hint: "Divise le prix total par la quantité.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      const coeff = randomChoice([2, 3, 4, 5, 6]);
      const q = randomChoice([4, 5, 6, 7, 8]);
      return {
        text: `${q} objets coûtent ${q * coeff} €. Quel est le coefficient de proportionnalité (prix d’un objet) ?`,
        format: "short",
        expected: [String(coeff)],
        comparator: "number_equal",
        explanation: expl(`${q * coeff} ÷ ${q} = ${coeff}. Le coefficient est ${coeff}.`),
      };
    },
  },

  // =========================
  // TOP-UP — PROP_RAPPORT (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_rapport_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une classe, il y a 3 garçons pour 5 filles. Quel est le ratio garçons:filles ?",
    format: "short",
    expected: ["3:5", "3 pour 5", "3/5"],
    comparator: "contains_keyword",
    hint: "Écris les deux quantités dans l’ordre demandé.",
    explanation: expl("Il y a 3 garçons pour 5 filles : le ratio garçons:filles est 3:5."),
    tags: ["prop_proportionnalite", "ratio"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    text: "Une vinaigrette se fait avec 1 dose de vinaigre pour 3 doses d’huile. Avec 5 doses de vinaigre, combien faut-il de doses d’huile ?",
    format: "short",
    expected: ["15"],
    comparator: "number_equal",
    hint: "De 1 à 5, on multiplie par 5.",
    explanation: expl("Le ratio est 1:3. Pour 5 doses de vinaigre, il faut 5 × 3 = 15 doses d’huile."),
    tags: ["prop_proportionnalite", "ratio", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Explique ce que signifie un ratio de 2:3 entre deux quantités.",
    format: "open",
    expected: ["2", "3", "pour"],
    comparator: "contains_keyword",
    hint: "Pour chaque groupe de 2 de la première, il y a 3 de la seconde.",
    explanation: expl("Un ratio 2:3 signifie que pour 2 parts de la première grandeur, il y a 3 parts de la seconde."),
    tags: ["prop_proportionnalite", "ratio", "open"],
  },
  {
    kind: "fixed",
    id: "prop_rapport_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "neutral",
    text: "Le ratio 4:6 est égal au ratio simplifié :",
    format: "qcm",
    choices: ["2:3", "1:2", "4:3", "3:2"],
    expected: ["2:3"],
    comparator: "mcq_exact",
    hint: "Divise les deux nombres par 2.",
    explanation: expl("On divise 4 et 6 par 2 : le ratio 4:6 se simplifie en 2:3."),
    tags: ["prop_proportionnalite", "ratio", "qcm"],
  },
  {
    kind: "template",
    id: "prop_rapport_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_rapport",
    difficulty: 3,
    theme: "cuisine",
    hint: "Multiplie la deuxième part par le même coefficient.",
    tags: ["prop_proportionnalite", "ratio", "template", "cuisine"],
    generate: () => {
      const a = randomChoice([1, 2, 3]);
      const b = randomChoice([2, 3, 4, 5]);
      const k = randomChoice([2, 3, 4]);
      return {
        text: `Un mélange suit le ratio ${a}:${b} (sirop:eau). Avec ${a * k} doses de sirop, combien faut-il de doses d’eau ?`,
        format: "short",
        expected: [String(b * k)],
        comparator: "number_equal",
        explanation: expl(`On passe de ${a} à ${a * k} en multipliant par ${k}. Il faut donc ${b} × ${k} = ${b * k} doses d’eau.`),
      };
    },
  },

  // =========================
  // TOP-UP — PROP_POURCENTAGE (+3)
  // =========================
  {
    kind: "fixed",
    id: "prop_pourcentage_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 2,
    theme: "neutral",
    text: "50 % de 60 vaut combien ?",
    format: "short",
    expected: ["30"],
    comparator: "number_equal",
    hint: "50 %, c’est la moitié.",
    explanation: expl("50 % de 60 = la moitié de 60 = 30."),
    tags: ["prop_proportionnalite", "pourcentage"],
  },
  {
    kind: "fixed",
    id: "prop_pourcentage_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    text: "Dans un groupe de 40 personnes, 15 % portent des lunettes. Combien de personnes est-ce ?",
    format: "qcm",
    choices: ["6", "4", "8", "15"],
    expected: ["6"],
    comparator: "mcq_exact",
    hint: "15 % de 40 = 0,15 × 40.",
    explanation: expl("15 % de 40 = 0,15 × 40 = 6 personnes."),
    tags: ["prop_proportionnalite", "pourcentage", "qcm"],
  },
  {
    kind: "template",
    id: "prop_pourcentage_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_pourcentage",
    difficulty: 3,
    theme: "neutral",
    hint: "Pourcentage ÷ 100, puis × la quantité.",
    tags: ["prop_proportionnalite", "pourcentage", "template"],
    generate: () => {
      const pct = randomChoice([10, 20, 25, 50]);
      const base = randomChoice([40, 60, 80, 100, 200]);
      const res = (pct / 100) * base;
      return {
        text: `Calcule ${pct} % de ${base}.`,
        format: "short",
        expected: [String(res)],
        comparator: "number_equal",
        explanation: expl(`${pct} % de ${base} = ${pct / 100} × ${base} = ${res}.`),
      };
    },
  },

  // =========================
  // TOP-UP — PROP_COEFF_MULTIPLICATEUR (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une hausse de 50 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["1,5", "1.5"],
    comparator: "number_equal",
    hint: "100 % + 50 % = 150 %.",
    explanation: expl("Une hausse de 50 % donne 150 % du prix initial, soit 1,5."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Une réduction de 50 % correspond à quel coefficient multiplicateur ?",
    format: "short",
    expected: ["0,5", "0.5"],
    comparator: "number_equal",
    hint: "Il reste 50 % du prix.",
    explanation: expl("Après une réduction de 50 %, il reste 50 % du prix, soit 0,5."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Explique comment trouver le coefficient multiplicateur d’une baisse de p %.",
    format: "open",
    expected: ["100", "soustrait", "1"],
    comparator: "contains_keyword",
    hint: "On part de 100 % et on retire p %.",
    explanation: expl("Pour une baisse de p %, il reste (100 − p) % du prix. On divise par 100 : le coefficient est 1 − p/100."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "open"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_multiplicateur_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 3,
    theme: "neutral",
    text: "Quel coefficient multiplicateur correspond à une réduction de 30 % ?",
    format: "qcm",
    choices: ["0,7", "1,3", "0,3", "0,97"],
    expected: ["0,7"],
    comparator: "mcq_exact",
    hint: "Il reste 70 % du prix.",
    explanation: expl("Après une réduction de 30 %, il reste 70 %, soit 0,7."),
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "qcm"],
  },
  {
    kind: "template",
    id: "prop_coeff_multiplicateur_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff_multiplicateur",
    difficulty: 4,
    theme: "neutral",
    hint: "Hausse : 1 + p/100. Baisse : 1 − p/100.",
    tags: ["prop_proportionnalite", "coefficient_multiplicateur", "template"],
    generate: () => {
      const p = randomChoice([10, 20, 25, 40]);
      const hausse = randomChoice([true, false]);
      const coeff = hausse ? 1 + p / 100 : 1 - p / 100;
      const coeffStr = String(coeff).replace(".", ",");
      return {
        text: `Quel est le coefficient multiplicateur d’une ${hausse ? "hausse" : "baisse"} de ${p} % ?`,
        format: "short",
        expected: [coeffStr, String(coeff)],
        comparator: "number_equal",
        explanation: expl(
          hausse
            ? `Une hausse de ${p} % donne ${100 + p} %, soit ${coeffStr}.`
            : `Une baisse de ${p} % laisse ${100 - p} %, soit ${coeffStr}.`
        ),
      };
    },
  },

  // =========================
  // TOP-UP — PROP_PROBLEME (+5)
  // =========================
  {
    kind: "fixed",
    id: "prop_probleme_fixed_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Pour 4 personnes, une recette demande 200 g de pâtes. Quelle masse faut-il pour 6 personnes ?",
    format: "short",
    expected: ["300", "300 g"],
    comparator: "number_equal",
    hint: "Masse pour 1 personne d’abord.",
    explanation: expl("200 g pour 4 personnes, donc 50 g par personne. Pour 6 personnes : 6 × 50 = 300 g."),
    tags: ["prop_proportionnalite", "probleme", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 3,
    theme: "neutral",
    text: "Un robinet remplit 15 L en 3 minutes. Combien de litres en 8 minutes ?",
    format: "short",
    expected: ["40", "40 L"],
    comparator: "number_equal",
    hint: "Débit par minute d’abord.",
    explanation: expl("15 L en 3 min, donc 5 L par minute. En 8 min : 8 × 5 = 40 L."),
    tags: ["prop_proportionnalite", "probleme"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_open_1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi le produit en croix permet de résoudre un problème de proportionnalité.",
    format: "open",
    expected: ["produit", "croix", "égaux"],
    comparator: "contains_keyword",
    hint: "Dans un tableau proportionnel, les produits en croix sont égaux.",
    explanation: expl("Dans un tableau de proportionnalité, les produits en croix sont égaux. On peut donc retrouver une valeur inconnue en posant cette égalité."),
    tags: ["prop_proportionnalite", "probleme", "open"],
  },
  {
    kind: "fixed",
    id: "prop_probleme_qcm_3",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "reunion",
    text: "Un bus parcourt 90 km en 2 h. À la même vitesse, combien de temps pour 135 km ?",
    format: "qcm",
    choices: ["3 h", "2 h 30", "4 h", "2 h"],
    expected: ["3 h"],
    comparator: "mcq_exact",
    hint: "Vitesse : 45 km/h.",
    explanation: expl("90 km en 2 h donne 45 km/h. Pour 135 km : 135 ÷ 45 = 3 h."),
    tags: ["prop_proportionnalite", "probleme", "qcm", "reunion"],
  },
  {
    kind: "template",
    id: "prop_probleme_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_probleme",
    difficulty: 4,
    theme: "neutral",
    hint: "Passe par la valeur d’une unité.",
    tags: ["prop_proportionnalite", "probleme", "template"],
    generate: () => {
      const unit = randomChoice([4, 5, 6, 8]);
      const q1 = randomChoice([3, 4, 5]);
      const q2 = randomChoice([7, 9, 10, 12]);
      return {
        text: `${q1} sachets pèsent ${q1 * unit} kg. Combien pèsent ${q2} sachets ?`,
        format: "short",
        expected: [String(q2 * unit), `${q2 * unit} kg`],
        comparator: "number_equal",
        explanation: expl(`1 sachet pèse ${unit} kg. Donc ${q2} sachets pèsent ${q2} × ${unit} = ${q2 * unit} kg.`),
      };
    },
  },

  // =========================
  // TOP-UP — PROP_DEFI (+4)
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_4",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Un article coûte 80 €. Après une réduction de 25 %, quel est le nouveau prix ?",
    format: "short",
    expected: formatEuro(60),
    comparator: "number_equal",
    hint: "Coefficient multiplicateur 0,75.",
    explanation: expl("Après une réduction de 25 %, il reste 75 %, soit le coefficient 0,75. On calcule 80 × 0,75 = 60 €."),
    tags: ["prop_proportionnalite", "defi", "coefficient_multiplicateur"],
  },
  {
    kind: "fixed",
    id: "prop_defi_qcm_2",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "reunion",
    text: "Un sentier de randonnée est parcouru à 4 km/h. Combien de km en 2 h 30 ?",
    format: "qcm",
    choices: ["10 km", "8 km", "9 km", "12 km"],
    expected: ["10 km"],
    comparator: "mcq_exact",
    hint: "2 h 30 = 2,5 h.",
    explanation: expl("2 h 30 = 2,5 h. Distance = 4 × 2,5 = 10 km."),
    tags: ["prop_proportionnalite", "defi", "qcm", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_5",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    text: "Une recette pour 6 personnes demande 300 g de chocolat. Combien pour 10 personnes ?",
    format: "short",
    expected: ["500", "500 g"],
    comparator: "number_equal",
    hint: "Masse par personne d’abord.",
    explanation: expl("300 g pour 6 personnes, donc 50 g par personne. Pour 10 personnes : 10 × 50 = 500 g."),
    tags: ["prop_proportionnalite", "defi", "cuisine"],
  },
  {
    kind: "template",
    id: "prop_defi_tpl_x1",
    niveau: "5e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 5,
    theme: "neutral",
    hint: "Applique le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "defi", "template", "coefficient_multiplicateur"],
    generate: () => {
      const prix = randomChoice([40, 50, 80, 100]);
      const p = randomChoice([10, 20, 25]);
      const hausse = randomChoice([true, false]);
      const coeff = hausse ? 1 + p / 100 : 1 - p / 100;
      const nouveau = Math.round(prix * coeff);
      return {
        text: `Un article coûte ${prix} €. Après une ${hausse ? "hausse" : "baisse"} de ${p} %, quel est le nouveau prix ?`,
        format: "short",
        expected: formatEuro(nouveau),
        comparator: "number_equal",
        explanation: expl(`Coefficient multiplicateur = ${String(coeff).replace(".", ",")}. Nouveau prix = ${prix} × ${String(coeff).replace(".", ",")} = ${nouveau} €.`),
      };
    },
  },
];