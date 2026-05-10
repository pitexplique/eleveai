// lib/tutor-v4/question-banks/maths/3e/proportionnalite.bank.ts

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export const proportionnaliteBank: TutorBankItemV4[] = [

/* =========================
   PROP_RECONNAITRE
========================= */

{
  kind: "fixed",
  id: "3e_prop_reconnaitre_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 1,
  theme: "neutral",
  text: "Quelle situation est proportionnelle ?",
  format: "qcm",
  choices: [
    "Le prix est proportionnel à la quantité",
    "L’âge est proportionnel à la taille",
    "Le poids est proportionnel à l’âge",
    "La température est proportionnelle au temps"
  ],
  expected: ["Le prix est proportionnel à la quantité"],
  comparator: "mcq_exact",
  hint: "Cherche une situation avec un coefficient constant.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Dans une situation proportionnelle, on multiplie toujours par le même nombre.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "reconnaitre"]
},

{
  kind: "template",
  id: "3e_prop_reconnaitre_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  hint: "Regarde si le rapport est constant.",
  tags: ["prop_proportionnalite", "tableau", "template"],
  generate: () => {
    const a = randomInt(2, 6);
    const b = randomInt(3, 8);

    const correct = a * 2;
    const wrong = b * 3;

    return {
      text: `Tableau :
x : ${a} → ${correct}
y : ${b} → ${wrong}

Est-ce proportionnel ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["non"],
      comparator: "mcq_exact",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        ("Les rapports ne sont pas constants, donc ce n’est pas proportionnel.") +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

/* =========================
   PROP_TABLE
========================= */

{
  kind: "fixed",
  id: "3e_prop_table_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 2,
  theme: "neutral",
  text: "Compléter : 2 → 6 donc 4 → ?",
  format: "short",
  expected: ["12"],
  comparator: "number_equal",
  hint: "On multiplie par le même coefficient.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Coefficient = 3 donc 4 × 3 = 12.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "tableau"]
},

{
  kind: "template",
  id: "3e_prop_table_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 2,
  theme: "neutral",
  hint: "Trouve le coefficient multiplicateur.",
  tags: ["prop_proportionnalite", "tableau", "template"],
  generate: () => {
    const k = randomInt(2, 10);
    const x = randomInt(2, 10);
    const y = x * k;

    const x2 = randomInt(2, 12);
    const result = x2 * k;

    return {
      text: `${x} → ${y}  
${x2} → ?`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Coefficient = ${k}, donc ${x2} × ${k} = ${result}.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

/* =========================
   PROP_QUATRIEME
========================= */

{
  kind: "fixed",
  id: "3e_prop_quatrieme_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 2,
  theme: "neutral",
  text: "Résoudre : 3 / 5 = x / 20",
  format: "short",
  expected: ["12"],
  comparator: "number_equal",
  hint: "Produit en croix.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("x = (3 × 20) / 5 = 12.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "quatrieme"]
},

{
  kind: "template",
  id: "3e_prop_quatrieme_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 3,
  theme: "neutral",
  hint: "Utilise le produit en croix.",
  tags: ["prop_proportionnalite", "quatrieme", "template"],
  generate: () => {
    const a = randomInt(2, 8);
    const b = randomInt(3, 10);
    const c = randomInt(4, 12);

    const x = (a * c) / b;

    return {
      text: `${a} / ${b} = x / ${c}`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`x = (${a} × ${c}) / ${b} = ${x}.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
      };
    },
  },
  /* =========================
   PROP_POURCENTAGE
========================= */

{
  kind: "fixed",
  id: "3e_prop_pourcentage_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 2,
  theme: "neutral",
  text: "Calculer 20% de 150.",
  format: "short",
  expected: ["30"],
  comparator: "number_equal",
  hint: "20% = 20/100 = 0,2.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("20% de 150 = 0,2 × 150 = 30.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "pourcentage"],
},

{
  kind: "fixed",
  id: "3e_prop_pourcentage_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 2,
  theme: "neutral",
  text: "Dans une classe de 25 élèves, 12 élèves sont demi-pensionnaires. Quel est le pourcentage de demi-pensionnaires ?",
  format: "qcm",
  choices: ["12%", "25%", "48%", "52%"],
  expected: ["48%"],
  comparator: "mcq_exact",
  hint: "Calcule 12 / 25 × 100.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("12 / 25 = 0,48, donc cela représente 48%.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "pourcentage", "qcm"],
},

{
  kind: "template",
  id: "3e_prop_pourcentage_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 2,
  theme: "neutral",
  hint: "p% de N = p/100 × N.",
  tags: ["prop_proportionnalite", "pourcentage", "template"],
  generate: () => {
    const p = randomChoice([10, 20, 25, 30, 40, 50]);
    const n = randomChoice([80, 100, 120, 150, 200, 240]);
    const result = (p / 100) * n;

    return {
      text: `Calculer ${p}% de ${n}.`,
      format: "short",
      expected: [String(result)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`${p}% de ${n} = ${p}/100 × ${n} = ${result}.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "template",
  id: "3e_prop_pourcentage_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 3,
  theme: "reunion",
  hint: "Calcule partie / total × 100.",
  tags: ["prop_proportionnalite", "pourcentage", "reunion", "template"],
  generate: () => {
    const total = randomChoice([20, 25, 40, 50, 80]);
    const part = randomChoice([5, 10, 15, 20]);
    const percent = (part / total) * 100;

    return {
      text: `À La Réunion, dans un groupe de ${total} élèves, ${part} pratiquent une activité sportive après les cours. Quel pourcentage cela représente-t-il ?`,
      format: "short",
      expected: [String(percent)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`On calcule ${part} / ${total} × 100 = ${percent}%.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_prop_pourcentage_erreur_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 3,
  theme: "neutral",
  text: "Un élève dit : 30% de 200 = 30. A-t-il raison ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "30% de 200, ce n’est pas 30.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Non. 30% de 200 = 0,3 × 200 = 60.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "pourcentage", "erreur"],
},

/* =========================
   PROP_EVOLUTION
========================= */

{
  kind: "fixed",
  id: "3e_prop_evolution_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  text: "Un prix de 80 € augmente de 25%. Quel est le nouveau prix ?",
  format: "short",
  expected: ["100"],
  comparator: "number_equal",
  hint: "Augmenter de 25%, c’est multiplier par 1,25.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("80 × 1,25 = 100. Le nouveau prix est 100 €.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "evolution", "augmentation"],
},

{
  kind: "fixed",
  id: "3e_prop_evolution_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  text: "Un prix de 120 € diminue de 10%. Quel est le nouveau prix ?",
  format: "qcm",
  choices: ["108 €", "110 €", "118 €", "132 €"],
  expected: ["108 €"],
  comparator: "mcq_exact",
  hint: "Diminuer de 10%, c’est multiplier par 0,9.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("120 × 0,9 = 108. Le nouveau prix est 108 €.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "evolution", "diminution", "qcm"],
},

{
  kind: "template",
  id: "3e_prop_evolution_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  hint: "Augmenter de p%, c’est multiplier par 1 + p/100.",
  tags: ["prop_proportionnalite", "evolution", "augmentation", "template"],
  generate: () => {
    const prix = randomChoice([40, 50, 80, 100, 120, 200]);
    const taux = randomChoice([10, 20, 25, 50]);
    const nouveau = prix * (1 + taux / 100);

    return {
      text: `Un prix de ${prix} € augmente de ${taux}%. Quel est le nouveau prix ?`,
      format: "short",
      expected: [String(nouveau)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Augmenter de ${taux}%, c’est multiplier par ${1 + taux / 100}. Donc ${prix} × ${1 + taux / 100} = ${nouveau} €.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "template",
  id: "3e_prop_evolution_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  hint: "Diminuer de p%, c’est multiplier par 1 - p/100.",
  tags: ["prop_proportionnalite", "evolution", "diminution", "template"],
  generate: () => {
    const prix = randomChoice([50, 80, 100, 120, 150, 200]);
    const taux = randomChoice([10, 20, 25, 40, 50]);
    const nouveau = prix * (1 - taux / 100);

    return {
      text: `Un prix de ${prix} € diminue de ${taux}%. Quel est le nouveau prix ?`,
      format: "short",
      expected: [String(nouveau)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Diminuer de ${taux}%, c’est multiplier par ${1 - taux / 100}. Donc ${prix} × ${1 - taux / 100} = ${nouveau} €.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_prop_evolution_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 4,
  theme: "neutral",
  text: "Explique pourquoi une augmentation de 20% ne revient pas à ajouter 20.",
  format: "open",
  expected: ["20%", "dépend", "valeur", "0,2", "pourcentage"],
  comparator: "contains_keyword",
  hint: "20% dépend de la valeur de départ.",
  explanation:
    `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Ajouter 20 est une quantité fixe. Augmenter de 20% dépend de la valeur de départ : on ajoute 20/100 de cette valeur.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "evolution", "open", "raisonnement"],
},

/* =========================
   PROP_VITESSE_DEBIT
========================= */

{
  kind: "fixed",
  id: "3e_prop_vitesse_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 2,
  theme: "neutral",
  text: "Une voiture parcourt 180 km en 3 h. Quelle est sa vitesse moyenne ?",
  format: "short",
  expected: ["60"],
  comparator: "number_equal",
  hint: "Vitesse = distance / temps.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Vitesse moyenne = 180 ÷ 3 = 60 km/h.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "vitesse"],
},

{
  kind: "fixed",
  id: "3e_prop_debit_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 3,
  theme: "neutral",
  text: "Un robinet remplit 24 L en 4 min. Quel est son débit en L/min ?",
  format: "qcm",
  choices: ["4 L/min", "6 L/min", "20 L/min", "96 L/min"],
  expected: ["6 L/min"],
  comparator: "mcq_exact",
  hint: "Débit = volume / temps.",
  explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Débit = 24 ÷ 4 = 6 L/min.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "debit", "qcm"],
},

{
  kind: "template",
  id: "3e_prop_vitesse_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 3,
  theme: "neutral",
  hint: "Vitesse = distance / temps.",
  tags: ["prop_proportionnalite", "vitesse", "template"],
  generate: () => {
    const vitesse = randomChoice([40, 50, 60, 70, 80, 90]);
    const temps = randomChoice([2, 3, 4, 5]);
    const distance = vitesse * temps;

    return {
      text: `Un véhicule parcourt ${distance} km en ${temps} h. Quelle est sa vitesse moyenne en km/h ?`,
      format: "short",
      expected: [String(vitesse)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Vitesse moyenne = distance ÷ temps = ${distance} ÷ ${temps} = ${vitesse} km/h.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "template",
  id: "3e_prop_debit_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 3,
  theme: "reunion",
  hint: "Débit = volume / temps.",
  tags: ["prop_proportionnalite", "debit", "reunion", "template"],
  generate: () => {
    const debit = randomChoice([5, 6, 8, 10, 12]);
    const temps = randomChoice([3, 4, 5, 6]);
    const volume = debit * temps;

    return {
      text: `À La Réunion, une réserve d’eau reçoit ${volume} L en ${temps} min. Quel est le débit en L/min ?`,
      format: "short",
      expected: [String(debit)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Débit = volume ÷ temps = ${volume} ÷ ${temps} = ${debit} L/min.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "template",
  id: "3e_prop_densite_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 4,
  theme: "neutral",
  hint: "Densité = nombre / surface.",
  tags: ["prop_proportionnalite", "densite", "template"],
  generate: () => {
    const densite = randomChoice([20, 25, 30, 40]);
    const surface = randomChoice([2, 3, 4, 5]);
    const total = densite * surface;

    return {
      text: `Une zone compte ${total} arbres sur ${surface} hectares. Quelle est la densité en arbres par hectare ?`,
      format: "short",
      expected: [String(densite)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Densité = ${total} ÷ ${surface} = ${densite} arbres par hectare.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

/* =========================
   PROP_DEFIS
========================= */

{
  kind: "fixed",
  id: "3e_prop_defi_fixed_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 4,
  theme: "neutral",
  text: "Un prix augmente de 20%, puis diminue de 20%. Revient-il au prix de départ ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Teste avec un prix de 100 €.",
  explanation:
    `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Non. Si le prix vaut 100 €, après +20% il vaut 120 €. Puis -20% de 120 €, cela donne 96 €. On ne revient pas au prix de départ.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "defi", "evolution", "erreur"],
},

{
  kind: "fixed",
  id: "3e_prop_defi_open_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Explique pourquoi la vitesse moyenne est une situation de proportionnalité lorsque la vitesse est constante.",
  format: "open",
  expected: ["distance", "temps", "vitesse", "proportionnel", "constant"],
  comparator: "contains_keyword",
  hint: "Si la vitesse est constante, distance = vitesse × temps.",
  explanation:
    `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Lorsque la vitesse est constante, la distance parcourue est proportionnelle au temps : distance = vitesse × temps. Le coefficient de proportionnalité est la vitesse.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "defi", "vitesse", "open"],
},

{
  kind: "template",
  id: "3e_prop_defi_tpl_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Applique les deux coefficients multiplicateurs dans l’ordre.",
  tags: ["prop_proportionnalite", "defi", "evolution", "template"],
  generate: () => {
    const prix = randomChoice([100, 150, 200]);
    const hausse = randomChoice([10, 20, 25]);
    const baisse = randomChoice([10, 20]);
    const apresHausse = prix * (1 + hausse / 100);
    const final = apresHausse * (1 - baisse / 100);

    return {
      text: `Un prix de ${prix} € augmente de ${hausse}%, puis diminue de ${baisse}%. Quel est le prix final ?`,
      format: "short",
      expected: [String(final)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Après augmentation : ${prix} × ${1 + hausse / 100} = ${apresHausse}. Après diminution : ${apresHausse} × ${1 - baisse / 100} = ${final} €.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "template",
  id: "3e_prop_defi_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 5,
  theme: "reunion",
  hint: "Combine vitesse et proportionnalité.",
  tags: ["prop_proportionnalite", "defi", "vitesse", "reunion", "template"],
  generate: () => {
    const vitesse = randomChoice([40, 50, 60]);
    const temps = randomChoice([2, 3]);
    const distance = vitesse * temps;

    return {
      text: `À La Réunion, une voiture roule à vitesse constante de ${vitesse} km/h pendant ${temps} h. Quelle distance parcourt-elle ?`,
      format: "short",
      expected: [String(distance)],
      comparator: "number_equal",
      explanation: `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
        `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
        `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
        (`Distance = vitesse × temps = ${vitesse} × ${temps} = ${distance} km.`) +
        `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
    };
  },
},

{
  kind: "fixed",
  id: "3e_prop_defi_open_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Explique pourquoi une augmentation de 10% suivie d’une augmentation de 20% ne correspond pas à une augmentation de 30%.",
  format: "open",
  expected: ["coefficient", "1,1", "1,2", "1,32", "32"],
  comparator: "contains_keyword",
  hint: "Multiplie les coefficients multiplicateurs.",
  explanation:
    `Définition : dans une situation de proportionnalité, deux grandeurs varient avec un même coefficient multiplicateur.\n\n` +
    `Méthode : on choisit la formule adaptée : coefficient, produit en croix, pourcentage, vitesse, débit ou densité.\n\n` +
    `Calcul : on remplace les valeurs de l’énoncé dans la formule puis on calcule. ` +
    ("Une hausse de 10% correspond à ×1,1 et une hausse de 20% à ×1,2. Au total, on multiplie par 1,1 × 1,2 = 1,32, soit une hausse de 32%, pas 30%.") +
    `\n\nConclusion : on obtient la valeur demandée avec l’unité ou le pourcentage adapté.`,
  tags: ["prop_proportionnalite", "defi", "evolution", "open"],
},
];