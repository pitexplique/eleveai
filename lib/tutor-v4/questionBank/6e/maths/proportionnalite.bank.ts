import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// Les propositions d'un gabarit sont écrites à la main, et deux d'entre elles
// finissent par coïncider dès qu'un paramètre tombe sur une valeur particulière
// (a = b, un coefficient nul, une fraction qui se simplifie…). L'élève voyait
// alors deux fois la même ligne. On met la bonne réponse de côté, on tire trois
// pièges réellement distincts, puis on mélange l'ensemble.
function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}


function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function expl(calcul: string) {
  return (
    "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
    "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
    "Calcul : " +
    calcul +
    "\n\nConclusion : on garde la réponse obtenue."
  );
}

export const proportionnaliteBank: TutorBankItemV4[] = [
  // =========================
  // PROP_RECONNAITRE
  // =========================
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Si 1 cahier coûte toujours le même prix, la situation est-elle proportionnelle ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Quand le prix unitaire reste constant, c’est proportionnel.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Une situation est proportionnelle quand le prix par objet reste le même. Si 1 cahier coûte toujours le même prix, alors la situation est proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 1,
    theme: "neutral",
    text: "Si 2 pommes coûtent 4 € et 4 pommes coûtent 8 €, la situation est-elle proportionnelle ?",
    format: "short",
    expected: ["oui"],
    comparator: "contains_keyword",
    hint: "Quand on double la quantité, le prix double aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 pommes à 4 pommes en multipliant par 2. Le prix passe aussi de 4 € à 8 € en multipliant par 2. La situation est donc proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Si 2 billets coûtent 6 € mais 4 billets coûtent 11 €, la situation est-elle proportionnelle ?",
    format: "short",
    expected: ["non"],
    comparator: "contains_keyword",
    hint: "Si on double la quantité, le prix devrait aussi doubler.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si la situation était proportionnelle, en passant de 2 billets à 4 billets, le prix devrait passer de 6 € à 12 €. Or ici on obtient 11 €. La situation n’est donc pas proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    text: "Quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "3 stylos coûtent 6 € et 6 stylos coûtent 12 €",
      "2 jus coûtent 5 € et 4 jus coûtent 11 €",
      "1 place coûte 4 € et 3 places coûtent 13 €",
      "5 cahiers coûtent 10 € et 10 cahiers coûtent 19 €",
    ],
    expected: ["3 stylos coûtent 6 € et 6 stylos coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Dans une situation proportionnelle, si on multiplie la quantité, on multiplie aussi l’autre valeur par le même nombre.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Seule la première situation est proportionnelle : quand on passe de 3 à 6 stylos, on multiplie par 2, et le prix passe de 6 € à 12 €, donc il est aussi multiplié par 2.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_reconnaitre_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, quelle situation est proportionnelle ?",
    format: "qcm",
    choices: [
      "2 mangues coûtent 4 € et 6 mangues coûtent 12 €",
      "2 mangues coûtent 4 € et 6 mangues coûtent 11 €",
      "3 ananas coûtent 9 € et 6 ananas coûtent 19 €",
      "4 letchis coûtent 8 € et 8 letchis coûtent 15 €",
    ],
    expected: ["2 mangues coûtent 4 € et 6 mangues coûtent 12 €"],
    comparator: "mcq_exact",
    hint: "Cherche le cas où le prix suit exactement le même coefficient que la quantité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Dans la première situation, on passe de 2 à 6 mangues en multipliant par 3, et le prix passe de 4 € à 12 € en multipliant aussi par 3. C’est donc une situation proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "reconnaitre", "reunion", "qcm"],
  },

  // =========================
  // PROP_TABLE
  // =========================
  {
    kind: "fixed",
    id: "prop_table_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 2 cahiers coûtent 4 €, combien coûtent 4 cahiers ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "Si on double, le prix double.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 cahiers à 4 cahiers en multipliant par 2. On multiplie donc aussi le prix par 2 : 4 € × 2 = 8 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 stylos coûtent 6 €, combien coûtent 9 stylos ?",
    format: "short",
    expected: ["18", "18€", "18 €"],
    comparator: "number_equal",
    hint: "De 3 à 9, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 3 stylos à 9 stylos en multipliant par 3. Le prix est donc aussi multiplié par 3 : 6 € × 3 = 18 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 3 samoussas coûtent 6 €. Combien coûtent 6 samoussas ?",
    format: "short",
    expected: ["12", "12€", "12 €"],
    comparator: "number_equal",
    hint: "Si on multiplie la quantité par 2, le prix aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 3 samoussas à 6 samoussas en multipliant par 2. Le prix passe donc de 6 € à 12 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_fixed_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché forain, 2 ananas coûtent 8 €. Combien coûtent 6 ananas ?",
    format: "short",
    expected: ["24", "24€", "24 €"],
    comparator: "number_equal",
    hint: "De 2 à 6, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 ananas à 6 ananas en multipliant par 3. Le prix passe donc de 8 € à 24 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu vidéo, 2 potions coûtent 10 pièces. Combien coûtent 6 potions ?",
    format: "qcm",
    choices: ["20", "25", "30", "60"],
    expected: ["30"],
    comparator: "mcq_exact",
    hint: "De 2 à 6, on multiplie par 3.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 2 potions à 6 potions en multipliant par 3. Le prix passe donc de 10 à 30 pièces.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "jeux_video", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_table_qcm_jeuxvideo_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "jeux_video",
    text: "Dans un jeu vidéo, 4 coffres coûtent 12 pièces. Combien coûtent 8 coffres ?",
    format: "qcm",
    choices: ["16", "20", "24", "48"],
    expected: ["24"],
    comparator: "mcq_exact",
    hint: "De 4 à 8, on double.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 4 coffres à 8 coffres en multipliant par 2. Le prix passe donc de 12 à 24 pièces.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "tableau", "jeux_video", "qcm"],
  },

  // =========================
  // PROP_COEFF
  // =========================
  {
    kind: "fixed",
    id: "prop_coeff_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 1 cahier coûte 3 €, quel coefficient multiplie le nombre de cahiers pour obtenir le prix ?",
    format: "short",
    expected: ["3"],
    comparator: "number_equal",
    hint: "Prix = nombre de cahiers × coefficient.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si un cahier coûte 3 €, alors le prix total s’obtient en multipliant le nombre de cahiers par 3. Le coefficient est donc 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Dans une situation où 2 stylos coûtent 8 €, quel est le coefficient de proportionnalité ?",
    format: "short",
    expected: ["4"],
    comparator: "number_equal",
    hint: "Cherche le prix pour 1 stylo.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si 2 stylos coûtent 8 €, alors 1 stylo coûte 8 ÷ 2 = 4 €. Le coefficient de proportionnalité est donc 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    text: "Si 3 objets coûtent 12 €, quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["2", "3", "4", "12"],
    expected: ["4"],
    comparator: "mcq_exact",
    hint: "Passe d’abord à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 objets coûtent 12 €, donc 1 objet coûte 12 ÷ 3 = 4 €. Le coefficient est 4.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_coeff_qcm_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "reunion",
    text: "À La Réunion, 5 mangues coûtent 15 €. Quel est le coefficient de proportionnalité ?",
    format: "qcm",
    choices: ["2", "3", "5", "15"],
    expected: ["3"],
    comparator: "mcq_exact",
    hint: "Cherche le prix d’une mangue.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("5 mangues coûtent 15 €, donc 1 mangue coûte 15 ÷ 5 = 3 €. Le coefficient est 3.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "coefficient", "reunion", "qcm"],
  },

  // =========================
  // PROP_UNIT
  // =========================
  {
    kind: "fixed",
    id: "prop_unite_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    text: "3 bonbons coûtent 6 €. Combien coûte 1 bonbon ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Pour trouver le prix d’un bonbon, on divise 6 € par 3. On obtient 2 €. Un bonbon coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    text: "5 cahiers coûtent 15 €. Combien coûte 1 cahier ?",
    format: "short",
    expected: ["3", "3€", "3 €"],
    comparator: "number_equal",
    hint: "Divise le prix total par 5.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 € ÷ 5 = 3 €. Un cahier coûte donc 3 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 4 yaourts coûtent 8 €. Combien coûte 1 yaourt ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Divise le prix total par le nombre de yaourts.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 € ÷ 4 = 2 €. Un yaourt coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_unite_fixed_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour cuisiner, 6 œufs coûtent 12 €. Combien coûte 1 œuf ?",
    format: "short",
    expected: ["2", "2€", "2 €"],
    comparator: "number_equal",
    hint: "Passe par l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("12 € ÷ 6 = 2 €. Un œuf coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "cuisine"],
  },
  {
    kind: "fixed",
    id: "prop_unite_qcm_reunion_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Au marché de Saint-Pierre, 5 mangues coûtent 15 €. Combien coûte 1 mangue ?",
    format: "qcm",
    choices: ["2 €", "3 €", "4 €", "5 €"],
    expected: ["3 €"],
    comparator: "mcq_exact",
    hint: "Passe par l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("15 € ÷ 5 = 3 €. Une mangue coûte donc 3 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "reunion", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_unite_qcm_reunion_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "reunion",
    text: "Au snack, 4 bouchons coûtent 8 €. Combien coûte 1 bouchon ?",
    format: "qcm",
    choices: ["1 €", "2 €", "3 €", "4 €"],
    expected: ["2 €"],
    comparator: "mcq_exact",
    hint: "Divise 8 par 4.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("8 € ÷ 4 = 2 €. Un bouchon coûte donc 2 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "unite", "reunion", "qcm"],
  },

  // =========================
  // PROP_DIRECT
  // =========================
  {
    kind: "fixed",
    id: "prop_direct_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    text: "4 cahiers coûtent 8 €. Combien coûtent 2 cahiers ?",
    format: "short",
    expected: ["4", "4€", "4 €"],
    comparator: "number_equal",
    hint: "Si on divise par 2, le prix aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("On passe de 4 cahiers à 2 cahiers en divisant par 2. On divise donc aussi le prix par 2 : 8 € ÷ 2 = 4 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    text: "8 feutres coûtent 16 €. Combien coûtent 4 feutres ?",
    format: "short",
    expected: ["8", "8€", "8 €"],
    comparator: "number_equal",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4 feutres, c’est la moitié de 8 feutres. Le prix est donc la moitié de 16 €, soit 8 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    text: "Pendant un tournoi de foot, 6 bouteilles d’eau coûtent 12 €. Combien coûtent 3 bouteilles ?",
    format: "short",
    expected: ["6", "6€", "6 €"],
    comparator: "number_equal",
    hint: "Si on prend deux fois moins, on paie deux fois moins.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 bouteilles, c’est la moitié de 6 bouteilles. Le prix est donc la moitié de 12 €, soit 6 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_direct_fixed_sport_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    text: "Pour un match, 10 maillots coûtent 50 €. Combien coûtent 5 maillots ?",
    format: "short",
    expected: ["25", "25€", "25 €"],
    comparator: "number_equal",
    hint: "Passe à la moitié.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("5 maillots, c’est la moitié de 10 maillots. Le prix est donc la moitié de 50 €, soit 25 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "sport"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour cuisiner, 8 œufs coûtent 16 €. Combien coûtent 4 œufs ?",
    format: "qcm",
    choices: ["4 €", "6 €", "8 €", "12 €"],
    expected: ["8 €"],
    comparator: "mcq_exact",
    hint: "4 est la moitié de 8.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4 œufs, c’est la moitié de 8 œufs. Le prix est donc la moitié de 16 €, soit 8 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "cuisine", "qcm"],
  },
  {
    kind: "fixed",
    id: "prop_direct_qcm_cuisine_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "cuisine",
    text: "Pour une recette, 6 citrons coûtent 12 €. Combien coûtent 3 citrons ?",
    format: "qcm",
    choices: ["3 €", "4 €", "6 €", "9 €"],
    expected: ["6 €"],
    comparator: "mcq_exact",
    hint: "3 est la moitié de 6.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 citrons, c’est la moitié de 6 citrons. Le prix est donc la moitié de 12 €, soit 6 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "direct", "cuisine", "qcm"],
  },

  // =========================
  // PROP_DEFIS
  // =========================
  {
    kind: "fixed",
    id: "prop_defi_fixed_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 3,
    theme: "neutral",
    text: "Si 2 objets coûtent 6 €, combien coûtent 5 objets ?",
    format: "short",
    expected: ["15", "15€", "15 €"],
    comparator: "number_equal",
    hint: "Passe d’abord à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("2 objets coûtent 6 €, donc 1 objet coûte 3 €. Alors 5 objets coûtent 5 × 3 = 15 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Explique pourquoi la situation suivante n’est pas proportionnelle : 2 tickets coûtent 4 € et 4 tickets coûtent 10 €.",
    format: "short",
    expected: ["double", "8", "10", "pas proportionnelle"],
    comparator: "contains_keyword",
    hint: "Si on double la quantité, le prix devrait doubler aussi.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("Si la situation était proportionnelle, en passant de 2 à 4 tickets, on doublerait la quantité, donc le prix devrait passer de 4 € à 8 €. Or ici on obtient 10 €. La situation n’est pas proportionnelle.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi", "raisonnement"],
  },
  {
    kind: "fixed",
    id: "prop_defi_fixed_3",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "reunion",
    text: "À La Réunion, 4 samoussas coûtent 8 €. Combien coûtent 7 samoussas ?",
    format: "short",
    expected: ["14", "14€", "14 €"],
    comparator: "number_equal",
    hint: "Commence par trouver le prix d’un samoussa.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("4 samoussas coûtent 8 €, donc 1 samoussa coûte 2 €. Alors 7 samoussas coûtent 7 × 2 = 14 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi", "reunion"],
  },
  {
    kind: "fixed",
    id: "prop_defi_qcm_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    text: "Si 3 cahiers coûtent 9 €, combien coûtent 7 cahiers ?",
    format: "qcm",
    choices: ["18 €", "21 €", "24 €", "27 €"],
    expected: ["21 €"],
    comparator: "mcq_exact",
    hint: "Passe à l’unité.",
    explanation:
      "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
      "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
      "Calcul : " +
      ("3 cahiers coûtent 9 €, donc 1 cahier coûte 3 €. Alors 7 cahiers coûtent 7 × 3 = 21 €.") +
      "\n\nConclusion : on garde la réponse obtenue.",
    tags: ["prop_proportionnalite", "defi", "qcm"],
  },

  // =========================
  // TEMPLATES - PROP_RECONNAITRE
  // =========================
  {
    kind: "template",
    id: "prop_reconnaitre_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde si le même coefficient s’applique aux deux lignes.",
    tags: ["prop_proportionnalite", "reconnaitre", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4]);
      const coef = randomChoice([2, 3]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;
      const targetQty = qty * coef;
      const isProp = Math.random() > 0.5;
      const targetTotal = isProp ? total * coef : total * coef + 1;

      return {
        text: `La situation suivante est-elle proportionnelle : ${qty} objets coûtent ${total} € et ${targetQty} objets coûtent ${targetTotal} € ?`,
        format: "short",
        expected: [isProp ? "oui" : "non"],
        comparator: "contains_keyword",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (isProp
          ? `On passe de ${qty} à ${targetQty} en multipliant par ${coef}, et le prix passe aussi de ${total} à ${targetTotal} en multipliant par ${coef}. La situation est donc proportionnelle.`
          : `On passe de ${qty} à ${targetQty} en multipliant par ${coef}, mais le prix ne suit pas exactement le même coefficient. La situation n’est donc pas proportionnelle.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_reconnaitre_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_reconnaitre",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la situation où le prix suit exactement le même coefficient que la quantité.",
    tags: ["prop_proportionnalite", "reconnaitre", "qcm", "template"],
    generate: () => {
      const good = "2 objets coûtent 6 € et 6 objets coûtent 18 €";
      const choices = shuffle([
        good,
        "2 objets coûtent 6 € et 6 objets coûtent 17 €",
        "3 objets coûtent 9 € et 6 objets coûtent 17 €",
        "4 objets coûtent 8 € et 8 objets coûtent 15 €",
      ]);

      return {
        text: "Quelle situation est proportionnelle ?",
        format: "qcm",
        choices,
        expected: [good],
        comparator: "mcq_exact",
        explanation:
          "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          ("Dans la bonne réponse, on passe de 2 à 6 objets en multipliant par 3, et le prix passe aussi de 6 € à 18 € en multipliant par 3.") +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_TABLE
  // =========================
  {
    kind: "template",
    id: "prop_table_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Utilise le coefficient multiplicateur.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    generate: () => {
      const a = randomChoice([2, 3, 4]);
      const coef = randomChoice([2, 3, 4]);
      const unitPrice = randomChoice([2, 3, 4]);
      const total = a * unitPrice;
      const targetQty = a * coef;
      const targetTotal = total * coef;

      return {
        text: `Si ${a} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`On passe de ${a} à ${targetQty} objets en multipliant par ${coef}. Le prix est donc aussi multiplié par ${coef} : ${total} × ${coef} = ${targetTotal} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Repère par combien on multiplie la quantité.",
    tags: ["prop_proportionnalite", "tableau", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 5]);
      const coef = randomChoice([2, 3]);
      const unit = randomChoice([2, 4, 5]);
      const total = qty * unit;
      const newQty = qty * coef;
      const newTotal = total * coef;

      return {
        text: `${qty} billets coûtent ${total} €. Combien coûtent ${newQty} billets ?`,
        format: "short",
        expected: [String(newTotal), `${newTotal}€`, `${newTotal} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`On passe de ${qty} à ${newQty} billets en multipliant par ${coef}. Le prix passe donc de ${total} € à ${newTotal} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_table_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_table",
    difficulty: 2,
    theme: "neutral",
    hint: "Multiplie aussi le prix par le même coefficient.",
    tags: ["prop_proportionnalite", "tableau", "qcm", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4]);
      const coef = randomChoice([2, 3]);
      // Les deux pièges sont « on ajoute le prix d'un objet » et « on ajoute le
      // coefficient ». Quand le prix unitaire vaut le coefficient, c'est la
      // même proposition écrite deux fois.
      const unit = randomChoice([2, 3, 4].filter((u) => u !== coef));
      const total = qty * unit;
      const targetQty = qty * coef;
      const good = total * coef;

      const choices = shuffle([
        String(good),
        String(good + unit),
        String(good + coef),
        String(total),
      ]);

      return {
        text: `Si ${qty} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "qcm",
        choices,
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`On passe de ${qty} à ${targetQty} objets en multipliant par ${coef}. Le prix est donc ${total} × ${coef} = ${good} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_COEFF
  // =========================
  {
    kind: "template",
    id: "prop_coeff_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche la valeur pour 1 objet.",
    tags: ["prop_proportionnalite", "coefficient", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4, 5]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;

      return {
        text: `Dans une situation où ${qty} objets coûtent ${total} €, quel est le coefficient de proportionnalité ?`,
        format: "short",
        expected: [String(unit)],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${qty} objets coûtent ${total} €, donc 1 objet coûte ${total} ÷ ${qty} = ${unit} €. Le coefficient est ${unit}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_coeff_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_coeff",
    difficulty: 2,
    theme: "neutral",
    hint: "Le coefficient est le prix d’un seul objet.",
    tags: ["prop_proportionnalite", "coefficient", "qcm", "template"],
    generate: () => {
      const unit = randomChoice([2, 3, 4]);
      // Les pièges sont la quantité, le total et « un de plus ». Si la quantité
      // vaut le prix unitaire ou ce prix plus un, deux propositions se
      // confondent.
      const qty = randomChoice(
        [2, 3, 4, 5].filter((q) => q !== unit && q !== unit + 1),
      );
      const total = qty * unit;

      return {
        text: `Si ${qty} objets coûtent ${total} €, quel est le coefficient de proportionnalité ?`,
        format: "qcm",
        choices: shuffle([
          String(unit),
          String(qty),
          String(total),
          String(unit + 1),
        ]),
        expected: [String(unit)],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${total} ÷ ${qty} = ${unit}. Le coefficient de proportionnalité est donc ${unit}.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_UNIT
  // =========================
  {
    kind: "template",
    id: "prop_unite_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Divise par le nombre d’objets.",
    tags: ["prop_proportionnalite", "unite", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4, 5]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;

      return {
        text: `${qty} objets coûtent ${total} €. Combien coûte 1 objet ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`Pour passer à l’unité, on divise ${total} € par ${qty}. On obtient ${unit} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unite_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe à l’unité.",
    tags: ["prop_proportionnalite", "unite", "template"],
    generate: () => {
      const qty = randomChoice([2, 4, 5, 6]);
      const unit = randomChoice([1, 2, 3, 4]);
      const total = qty * unit;

      return {
        text: `${qty} stylos coûtent ${total} €. Combien coûte 1 stylo ?`,
        format: "short",
        expected: [String(unit), `${unit}€`, `${unit} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${total} € ÷ ${qty} = ${unit} €. Un stylo coûte donc ${unit} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_unite_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_unite",
    difficulty: 2,
    theme: "neutral",
    hint: "Il faut partager le prix total par la quantité.",
    tags: ["prop_proportionnalite", "unite", "qcm", "template"],
    generate: () => {
      const unit = randomChoice([2, 3, 4]);
      // Mêmes collisions que pour le coefficient : la quantité ne doit valoir
      // ni le prix d'un objet, ni ce prix plus un.
      const qty = randomChoice(
        [2, 3, 4, 5].filter((q) => q !== unit && q !== unit + 1),
      );
      const total = qty * unit;

      const choices = shuffle([
        String(unit),
        String(unit + 1),
        String(total),
        String(qty),
      ]);

      return {
        text: `${qty} objets coûtent ${total} €. Combien coûte 1 objet ?`,
        format: "qcm",
        choices,
        expected: [String(unit)],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${total} ÷ ${qty} = ${unit}. Un objet coûte donc ${unit} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_DIRECT
  // =========================
  {
    kind: "template",
    id: "prop_direct_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    hint: "Si la quantité diminue, le prix diminue dans la même proportion.",
    tags: ["prop_proportionnalite", "direct", "template"],
    generate: () => {
      const qty = randomChoice([4, 6, 8]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;
      const divisor = randomChoice([2, 4]);
      const targetQty = qty / divisor;
      const targetTotal = total / divisor;

      return {
        text: `Si ${qty} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`On passe de ${qty} à ${targetQty} objets en divisant par ${divisor}. On divise donc aussi le prix par ${divisor} : ${total} ÷ ${divisor} = ${targetTotal} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_tpl_2",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "neutral",
    hint: "Passe à la moitié.",
    tags: ["prop_proportionnalite", "direct", "template"],
    generate: () => {
      const qty = randomChoice([6, 8, 10]);
      const unit = randomChoice([2, 3, 5]);
      const total = qty * unit;
      const targetQty = qty / 2;
      const targetTotal = total / 2;

      return {
        text: `${qty} billets coûtent ${total} €. Combien coûtent ${targetQty} billets ?`,
        format: "short",
        expected: [String(targetTotal), `${targetTotal}€`, `${targetTotal} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${targetQty} est la moitié de ${qty}, donc le prix est la moitié de ${total} €. On obtient ${targetTotal} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_direct_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_direct",
    difficulty: 2,
    theme: "sport",
    hint: "Si on divise la quantité par 2, on divise aussi le prix par 2.",
    tags: ["prop_proportionnalite", "direct", "sport", "qcm", "template"],
    generate: () => {
      const qty = randomChoice([4, 6, 8]);
      const unit = randomChoice([2, 3]);
      const total = qty * unit;
      const targetQty = qty / 2;
      const good = total / 2;

      const choices = shuffle([
        String(good),
        String(good + 1),
        String(good + 2),
        String(total),
      ]);

      return {
        text: `Pour une équipe de sport, ${qty} maillots coûtent ${total} €. Combien coûtent ${targetQty} maillots ?`,
        format: "qcm",
        choices,
        expected: [String(good)],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${targetQty} est la moitié de ${qty}. Le prix est donc la moitié de ${total} €, soit ${good} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // =========================
  // TEMPLATES - PROP_DEFIS
  // =========================
  {
    kind: "template",
    id: "prop_defi_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Passe d’abord à l’unité.",
    tags: ["prop_proportionnalite", "defi", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4]);
      const unit = randomChoice([2, 3, 5]);
      const total = qty * unit;
      const targetQty = randomChoice([5, 6, 7]);

      return {
        text: `Si ${qty} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "short",
        expected: [String(targetQty * unit), `${targetQty * unit}€`, `${targetQty * unit} €`],
        comparator: "number_equal",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${qty} objets coûtent ${total} €, donc 1 objet coûte ${unit} €. Alors ${targetQty} objets coûtent ${targetQty} × ${unit} = ${targetQty * unit} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },
  {
    kind: "template",
    id: "prop_defi_qcm_tpl_1",
    niveau: "6e",
    matiere: "maths",
    notionId: "prop_proportionnalite",
    microId: "prop_defi",
    difficulty: 4,
    theme: "neutral",
    hint: "Cherche le prix d’un objet puis multiplie.",
    tags: ["prop_proportionnalite", "defi", "qcm", "template"],
    generate: () => {
      const qty = randomChoice([2, 3, 4]);
      const unit = randomChoice([2, 3, 4]);
      const total = qty * unit;
      const targetQty = randomChoice([5, 6, 7]);
      const good = targetQty * unit;

      return {
        text: `Si ${qty} objets coûtent ${total} €, combien coûtent ${targetQty} objets ?`,
        format: "qcm",
        // Quand on demande le prix d'un objet de plus que l'énoncé, « un objet
        // de moins » retombe sur le prix de départ : deux pièges, une seule
        // ligne. D'où le produit croisé farfelu, gardé en réserve.
        choices: makeChoices(`${good} €`, [
          `${good + unit} €`,
          `${good - unit} €`,
          `${total} €`,
          `${qty * targetQty} €`,
        ]),
        expected: [`${good} €`],
        comparator: "mcq_exact",
        explanation: "Définition : deux grandeurs sont proportionnelles quand on multiplie toujours par le même nombre.\n\n" +
          "Méthode : on cherche le coefficient de proportionnalité ou le passage entre les grandeurs.\n\n" +
          "Calcul : " +
          (`${qty} objets coûtent ${total} €, donc 1 objet coûte ${unit} €. Alors ${targetQty} objets coûtent ${good} €.`) +
          "\n\nConclusion : on garde la réponse obtenue.",
      };
    },
  },

  // ========== TOP-UP — PROP_RECONNAITRE ==========
  {
    kind: "fixed", id: "prop_reconnaitre_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Si 3 kg de fruits coûtent 9 € et 6 kg coûtent 18 €, la situation est-elle proportionnelle ?",
    format: "short", expected: ["oui"], comparator: "contains_keyword",
    hint: "Quand on double la quantité, le prix double aussi.",
    explanation: expl("On passe de 3 kg à 6 kg en multipliant par 2 ; le prix passe de 9 € à 18 € en multipliant aussi par 2. La situation est proportionnelle."),
    tags: ["prop_proportionnalite", "reconnaitre"],
  },
  {
    kind: "fixed", id: "prop_reconnaitre_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    text: "L’âge d’une personne et sa taille sont-ils des grandeurs proportionnelles ?",
    format: "qcm", choices: ["non", "oui"], expected: ["non"], comparator: "mcq_exact",
    hint: "Quelqu’un de 2 fois plus âgé n’est pas 2 fois plus grand.",
    explanation: expl("Une personne de 40 ans n’est pas deux fois plus grande qu’une personne de 20 ans. On ne multiplie pas toujours par le même nombre : ce n’est pas proportionnel."),
    tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
  },
  {
    kind: "fixed", id: "prop_reconnaitre_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_reconnaitre", difficulty: 2, theme: "neutral",
    text: "Un tableau indique : 1 → 5, 2 → 10, 3 → 15. Cette situation est-elle proportionnelle ?",
    format: "short", expected: ["oui"], comparator: "contains_keyword",
    hint: "Cherche si on multiplie toujours par le même nombre.",
    explanation: expl("On passe de chaque nombre du haut à celui du bas en multipliant par 5 (1×5=5, 2×5=10, 3×5=15). C’est donc une situation proportionnelle, de coefficient 5."),
    tags: ["prop_proportionnalite", "reconnaitre", "tableau"],
  },

  // ========== TOP-UP — PROP_COEFF ==========
  {
    kind: "fixed", id: "prop_coeff_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    text: "Si 1 kg de pommes coûte 2 €, quel coefficient multiplie la masse pour obtenir le prix ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Prix = masse × coefficient.",
    explanation: expl("Si 1 kg coûte 2 €, le prix s’obtient en multipliant la masse par 2. Le coefficient de proportionnalité est 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    text: "3 stylos coûtent 6 €. Quel est le coefficient de proportionnalité (prix d’un stylo) ?",
    format: "short", expected: ["2"], comparator: "number_equal",
    hint: "Cherche le prix pour 1 stylo.",
    explanation: expl("Le prix d’un stylo est 6 ÷ 3 = 2 €. Le coefficient de proportionnalité est donc 2."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 2, theme: "neutral",
    text: "Le coefficient de proportionnalité est 5. Quel est le prix de 4 objets ?",
    format: "short", expected: ["20"], comparator: "number_equal",
    hint: "Prix = nombre d’objets × coefficient.",
    explanation: expl("On multiplie le nombre d’objets par le coefficient : 4 × 5 = 20. Le prix est 20 €."),
    tags: ["prop_proportionnalite", "coefficient"],
  },
  {
    kind: "fixed", id: "prop_coeff_topup_4", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_coeff", difficulty: 3, theme: "neutral",
    text: "Dans un tableau de proportionnalité, on passe de 2 à 10. Quel est le coefficient ?",
    format: "short", expected: ["5"], comparator: "number_equal",
    hint: "Cherche par quel nombre on multiplie 2 pour obtenir 10.",
    explanation: expl("On cherche le nombre qui, multiplié par 2, donne 10 : 10 ÷ 2 = 5. Le coefficient est 5."),
    tags: ["prop_proportionnalite", "coefficient", "tableau"],
  },

  // ========== TOP-UP — PROP_DEFI ==========
  {
    kind: "fixed", id: "prop_defi_topup_1", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 3, theme: "neutral",
    text: "Défi : 5 croissants coûtent 10 €. Combien coûtent 8 croissants ?",
    format: "short", expected: ["16"], comparator: "number_equal",
    hint: "Cherche d’abord le prix d’un croissant.",
    explanation: expl("Un croissant coûte 10 ÷ 5 = 2 €. Donc 8 croissants coûtent 8 × 2 = 16 €."),
    tags: ["prop_proportionnalite", "defi"],
  },
  {
    kind: "fixed", id: "prop_defi_topup_2", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 3, theme: "neutral",
    text: "Défi : 4 m de tissu coûtent 12 €. Combien coûtent 7 m de ce tissu ?",
    format: "short", expected: ["21"], comparator: "number_equal",
    hint: "Cherche le prix d’un mètre.",
    explanation: expl("Un mètre de tissu coûte 12 ÷ 4 = 3 €. Donc 7 m coûtent 7 × 3 = 21 €."),
    tags: ["prop_proportionnalite", "defi"],
  },
  {
    kind: "fixed", id: "prop_defi_topup_3", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 4, theme: "neutral",
    text: "Défi : une recette pour 4 personnes utilise 200 g de farine. Quelle masse de farine faut-il pour 6 personnes ?",
    format: "short", expected: ["300"], comparator: "number_equal",
    hint: "Cherche la masse pour 1 personne.",
    explanation: expl("Pour 1 personne : 200 ÷ 4 = 50 g. Pour 6 personnes : 6 × 50 = 300 g."),
    tags: ["prop_proportionnalite", "defi", "recette"],
  },
  {
    kind: "fixed", id: "prop_defi_topup_4", niveau: "6e", matiere: "maths",
    notionId: "prop_proportionnalite", microId: "prop_defi", difficulty: 4, theme: "neutral",
    text: "Défi : 6 cahiers coûtent 9 €. Combien coûtent 10 cahiers ?",
    format: "short", expected: ["15"], comparator: "number_equal",
    hint: "Cherche le prix d’un cahier (9 ÷ 6).",
    explanation: expl("Un cahier coûte 9 ÷ 6 = 1,5 €. Donc 10 cahiers coûtent 10 × 1,5 = 15 €."),
    tags: ["prop_proportionnalite", "defi"],
  },
];