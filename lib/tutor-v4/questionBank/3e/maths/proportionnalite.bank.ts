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

/* =========================
   PROP_RECONNAITRE (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_prop_reconnaitre_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  text: "Une situation est proportionnelle lorsque, pour passer d’une grandeur à l’autre, on…",
  format: "qcm",
  choices: [
    "multiplie toujours par le même nombre",
    "ajoute toujours le même nombre",
    "soustrait toujours le même nombre",
    "multiplie par un nombre différent à chaque fois",
  ],
  expected: ["multiplie toujours par le même nombre"],
  comparator: "mcq_exact",
  hint: "Le coefficient de proportionnalité est constant.",
  explanation:
    "Définition : dans une situation proportionnelle, on multiplie par un coefficient constant.\n\n" +
    "Méthode : on vérifie si on multiplie toujours par le même nombre.\n\n" +
    "Calcul : si oui, c’est proportionnel.\n\n" +
    "Conclusion : on multiplie toujours par le même nombre.",
  tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
},
{
  kind: "fixed",
  id: "3e_prop_reconnaitre_fixed_3",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  text: "Graphiquement, une situation de proportionnalité est représentée par…",
  format: "qcm",
  choices: [
    "une droite passant par l’origine",
    "une droite ne passant pas par l’origine",
    "une courbe quelconque",
    "deux droites parallèles",
  ],
  expected: ["une droite passant par l’origine"],
  comparator: "mcq_exact",
  hint: "Pour $0$ d’une grandeur, l’autre vaut aussi $0$.",
  explanation:
    "Définition : une situation proportionnelle correspond à $y = kx$.\n\n" +
    "Méthode : on regarde si le graphique est une droite passant par l’origine.\n\n" +
    "Calcul : quand $x = 0$, $y = 0$, donc la droite passe par l’origine.\n\n" +
    "Conclusion : c’est une droite passant par l’origine.",
  tags: ["prop_proportionnalite", "reconnaitre", "graphique", "qcm"],
},
{
  kind: "template",
  id: "3e_prop_reconnaitre_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  hint: "Compare les rapports $y \\div x$ de chaque colonne.",
  tags: ["prop_proportionnalite", "reconnaitre", "tableau", "template"],
  generate: () => {
    const prop = randomChoice([true, false]);
    const k = randomChoice([2, 3, 4]);
    const x1 = randomChoice([2, 3]);
    const x2 = randomChoice([4, 5]);
    const y1 = x1 * k;
    const y2 = prop ? x2 * k : x2 * k + randomChoice([1, 2]);
    return {
      text: `Tableau — première grandeur : ${x1} ; ${x2}. Deuxième grandeur : ${y1} ; ${y2}. Est-ce proportionnel ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: [prop ? "oui" : "non"],
      comparator: "mcq_exact",
      explanation:
        `Définition : un tableau est proportionnel si les rapports $y \\div x$ sont égaux.\n\n` +
        `Méthode : on calcule $${y1} \\div ${x1}$ et $${y2} \\div ${x2}$.\n\n` +
        `Calcul : $${y1} \\div ${x1} = ${y1 / x1}$ et $${y2} \\div ${x2} = ${(y2 / x2)
          .toFixed(2)
          .replace(".", ",")}$.\n\n` +
        `Conclusion : ${prop ? "les rapports sont égaux, c’est proportionnel." : "les rapports diffèrent, ce n’est pas proportionnel."}`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_reconnaitre_fixed_4_perimetre",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 3,
  theme: "neutral",
  text: "Le périmètre d’un carré est-il proportionnel à la longueur de son côté ?",
  format: "qcm",
  choices: ["oui", "non"],
  expected: ["oui"],
  comparator: "mcq_exact",
  hint: "Périmètre $= 4 \\times \\text{côté}$.",
  explanation:
    "Définition : le périmètre d’un carré vaut $4 \\times \\text{côté}$.\n\n" +
    "Méthode : on regarde s’il y a un coefficient constant.\n\n" +
    "Calcul : on multiplie toujours le côté par $4$, le coefficient est constant.\n\n" +
    "Conclusion : oui, le périmètre est proportionnel au côté.",
  tags: ["prop_proportionnalite", "reconnaitre", "perimetre", "qcm"],
},
{
  kind: "fixed",
  id: "3e_prop_reconnaitre_fixed_5_aire",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 3,
  theme: "neutral",
  text: "L’aire d’un carré est-elle proportionnelle à la longueur de son côté ?",
  format: "qcm",
  choices: ["non", "oui"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "Aire $= \\text{côté}^2$ : le coefficient n’est pas constant.",
  explanation:
    "Définition : l’aire d’un carré vaut $\\text{côté}^2$.\n\n" +
    "Méthode : on vérifie si on multiplie par un même nombre.\n\n" +
    "Calcul : pour un côté $2$, aire $4$ ; pour un côté $4$, aire $16$ : on ne multiplie pas par le même nombre.\n\n" +
    "Conclusion : non, l’aire n’est pas proportionnelle au côté.",
  tags: ["prop_proportionnalite", "reconnaitre", "aire", "qcm"],
},
{
  kind: "template",
  id: "3e_prop_reconnaitre_tpl_3_prix",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 2,
  theme: "reunion",
  hint: "Le prix de plusieurs articles identiques est proportionnel à la quantité.",
  tags: ["prop_proportionnalite", "reconnaitre", "reunion", "template"],
  generate: () => {
    const prixUn = randomChoice([2, 3, 5]);
    return {
      text: `Au marché de Saint-Paul, une mangue coûte ${prixUn} €. Le prix total est-il proportionnel au nombre de mangues achetées ?`,
      format: "qcm",
      choices: ["oui", "non"],
      expected: ["oui"],
      comparator: "mcq_exact",
      explanation:
        `Définition : on multiplie le prix unitaire par la quantité.\n\n` +
        `Méthode : on vérifie si le coefficient (le prix unitaire) est constant.\n\n` +
        `Calcul : chaque mangue coûte ${prixUn} €, le coefficient est constant.\n\n` +
        `Conclusion : oui, le prix total est proportionnel au nombre de mangues.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_reconnaitre_fixed_6_age",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_reconnaitre",
  difficulty: 2,
  theme: "neutral",
  text: "La taille d’une personne est-elle proportionnelle à son âge ?",
  format: "qcm",
  choices: ["non", "oui"],
  expected: ["non"],
  comparator: "mcq_exact",
  hint: "On ne grandit pas du même nombre de cm chaque année.",
  explanation:
    "Définition : il y a proportionnalité seulement si le coefficient est constant.\n\n" +
    "Méthode : on regarde si la taille augmente du même facteur à chaque âge.\n\n" +
    "Calcul : un bébé de $1$ an ne mesure pas $1/10$ d’un enfant de $10$ ans.\n\n" +
    "Conclusion : non, la taille n’est pas proportionnelle à l’âge.",
  tags: ["prop_proportionnalite", "reconnaitre", "qcm"],
},

/* =========================
   PROP_TABLE (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_prop_table_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 2,
  theme: "neutral",
  text: "Dans un tableau de proportionnalité, $3 \\to 12$. Que vaut l’image de $5$ ?",
  format: "short",
  expected: ["20"],
  comparator: "number_equal",
  hint: "Coefficient $= 12 \\div 3 = 4$.",
  explanation:
    "Définition : on passe d’une ligne à l’autre par un coefficient constant.\n\n" +
    "Méthode : on calcule le coefficient $12 \\div 3 = 4$.\n\n" +
    "Calcul : $5 \\times 4 = 20$.\n\n" +
    "Conclusion : l’image de $5$ est $20$.",
  tags: ["prop_proportionnalite", "table", "short"],
},
{
  kind: "fixed",
  id: "3e_prop_table_fixed_3_coeff",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 2,
  theme: "neutral",
  text: "Dans un tableau de proportionnalité, $4 \\to 28$. Quel est le coefficient de proportionnalité ?",
  format: "short",
  expected: ["7"],
  comparator: "number_equal",
  hint: "Coefficient $= 28 \\div 4$.",
  explanation:
    "Définition : le coefficient permet de passer de la première ligne à la deuxième.\n\n" +
    "Méthode : on divise $28$ par $4$.\n\n" +
    "Calcul : $28 \\div 4 = 7$.\n\n" +
    "Conclusion : le coefficient est $7$.",
  tags: ["prop_proportionnalite", "table", "coefficient", "short"],
},
{
  kind: "template",
  id: "3e_prop_table_tpl_2_completer",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 2,
  theme: "neutral",
  hint: "Trouve le coefficient, puis multiplie.",
  tags: ["prop_proportionnalite", "table", "template"],
  generate: () => {
    const k = randomChoice([3, 4, 5, 6]);
    const x1 = randomChoice([2, 3, 4]);
    const x2 = randomChoice([5, 6, 7, 8]);
    const y1 = x1 * k;
    const res = x2 * k;
    return {
      text: `Tableau de proportionnalité : $${x1} \\to ${y1}$. Que vaut l’image de $${x2}$ ?`,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : on multiplie par un coefficient constant.\n\n` +
        `Méthode : coefficient $= ${y1} \\div ${x1} = ${k}$.\n\n` +
        `Calcul : $${x2} \\times ${k} = ${res}$.\n\n` +
        `Conclusion : l’image de $${x2}$ est $${res}$.`,
    };
  },
},
{
  kind: "template",
  id: "3e_prop_table_tpl_3_coeff",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 3,
  theme: "neutral",
  hint: "Coefficient $= y \\div x$.",
  tags: ["prop_proportionnalite", "table", "coefficient", "template"],
  generate: () => {
    const k = randomChoice([2, 3, 5, 6]);
    const x = randomChoice([4, 6, 8]);
    const y = x * k;
    return {
      text: `Dans un tableau de proportionnalité, $${x} \\to ${y}$. Quel est le coefficient de proportionnalité ?`,
      format: "short",
      expected: [String(k)],
      comparator: "number_equal",
      explanation:
        `Définition : le coefficient relie les deux lignes.\n\n` +
        `Méthode : on calcule $${y} \\div ${x}$.\n\n` +
        `Calcul : $${y} \\div ${x} = ${k}$.\n\n` +
        `Conclusion : le coefficient est $${k}$.`,
    };
  },
},
{
  kind: "template",
  id: "3e_prop_table_tpl_4_reunion",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 3,
  theme: "reunion",
  hint: "Prix unitaire constant : multiplie par la quantité.",
  tags: ["prop_proportionnalite", "table", "reunion", "template"],
  generate: () => {
    const prixUn = randomChoice([2, 3, 4]);
    const q1 = randomChoice([2, 3]);
    const q2 = randomChoice([5, 6, 7]);
    return {
      text: `Au marché, ${q1} ananas coûtent ${q1 * prixUn} €. Combien coûtent ${q2} ananas (en €) ?`,
      format: "short",
      expected: [String(q2 * prixUn)],
      comparator: "number_equal",
      explanation:
        `Définition : le prix est proportionnel au nombre d’ananas.\n\n` +
        `Méthode : prix unitaire $= ${q1 * prixUn} \\div ${q1} = ${prixUn}$ €.\n\n` +
        `Calcul : $${q2} \\times ${prixUn} = ${q2 * prixUn}$ €.\n\n` +
        `Conclusion : ${q2} ananas coûtent $${q2 * prixUn}$ €.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_table_fixed_4_retour",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 3,
  theme: "neutral",
  text: "Dans un tableau de proportionnalité, $6 \\to 42$. Que vaut l’antécédent de $35$ ?",
  format: "short",
  expected: ["5"],
  comparator: "number_equal",
  hint: "Coefficient $= 42 \\div 6 = 7$, puis $35 \\div 7$.",
  explanation:
    "Définition : on utilise le coefficient pour revenir en arrière.\n\n" +
    "Méthode : coefficient $= 42 \\div 6 = 7$ ; on divise $35$ par $7$.\n\n" +
    "Calcul : $35 \\div 7 = 5$.\n\n" +
    "Conclusion : l’antécédent de $35$ est $5$.",
  tags: ["prop_proportionnalite", "table", "retour", "short"],
},
{
  kind: "fixed",
  id: "3e_prop_table_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_table",
  difficulty: 2,
  theme: "neutral",
  text: "Pour passer de la première ligne à la deuxième dans un tableau de proportionnalité, on…",
  format: "qcm",
  choices: [
    "multiplie par le coefficient de proportionnalité",
    "ajoute le coefficient",
    "soustrait une constante",
    "élève au carré",
  ],
  expected: ["multiplie par le coefficient de proportionnalité"],
  comparator: "mcq_exact",
  hint: "Le coefficient est multiplicatif.",
  explanation:
    "Définition : le tableau de proportionnalité repose sur un coefficient multiplicateur.\n\n" +
    "Méthode : on multiplie chaque valeur de la première ligne par ce coefficient.\n\n" +
    "Calcul : c’est une multiplication, pas une addition.\n\n" +
    "Conclusion : on multiplie par le coefficient de proportionnalité.",
  tags: ["prop_proportionnalite", "table", "qcm"],
},

/* =========================
   PROP_QUATRIEME (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_prop_quatrieme_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 2,
  theme: "neutral",
  text: "Résoudre : $\\dfrac{4}{6} = \\dfrac{x}{9}$.",
  format: "short",
  expected: ["6"],
  comparator: "number_equal",
  hint: "Produit en croix : $x = \\dfrac{4 \\times 9}{6}$.",
  explanation:
    "Définition : une quatrième proportionnelle se trouve par produit en croix.\n\n" +
    "Méthode : $x = \\dfrac{4 \\times 9}{6}$.\n\n" +
    "Calcul : $x = \\dfrac{36}{6} = 6$.\n\n" +
    "Conclusion : $x = 6$.",
  tags: ["prop_proportionnalite", "quatrieme", "short"],
},
{
  kind: "template",
  id: "3e_prop_quatrieme_tpl_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 3,
  theme: "neutral",
  hint: "Produit en croix.",
  tags: ["prop_proportionnalite", "quatrieme", "template"],
  generate: () => {
    const b = randomChoice([2, 3, 4, 5]);
    const k = randomChoice([2, 3, 4]);
    const a = b * k; // a/b = k
    const c = randomChoice([3, 4, 5, 6]);
    const x = c * k; // a/b = x/c -> x = c*k
    return {
      text: `Résoudre : $\\dfrac{${a}}{${b}} = \\dfrac{x}{${c}}$.`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche la quatrième proportionnelle.\n\n` +
        `Méthode : produit en croix $x = \\dfrac{${a} \\times ${c}}{${b}}$.\n\n` +
        `Calcul : $x = \\dfrac{${a * c}}{${b}} = ${x}$.\n\n` +
        `Conclusion : $x = ${x}$.`,
    };
  },
},
{
  kind: "template",
  id: "3e_prop_quatrieme_tpl_3_recette",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 3,
  theme: "neutral",
  hint: "On adapte les quantités proportionnellement.",
  tags: ["prop_proportionnalite", "quatrieme", "recette", "template"],
  generate: () => {
    const pers = randomChoice([4, 6]);
    const gramme = randomChoice([200, 300, 400]);
    const newPers = pers * randomChoice([2, 3]);
    const res = (gramme * newPers) / pers;
    return {
      text: `Une recette pour ${pers} personnes nécessite ${gramme} g de farine. Combien faut-il de farine (en g) pour ${newPers} personnes ?`,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : la quantité de farine est proportionnelle au nombre de personnes.\n\n` +
        `Méthode : produit en croix $\\dfrac{${gramme}}{${pers}} = \\dfrac{x}{${newPers}}$.\n\n` +
        `Calcul : $x = \\dfrac{${gramme} \\times ${newPers}}{${pers}} = ${res}$ g.\n\n` +
        `Conclusion : il faut ${res} g de farine.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_quatrieme_fixed_3_methode",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 2,
  theme: "neutral",
  text: "Pour résoudre $\\dfrac{a}{b} = \\dfrac{x}{c}$, on utilise…",
  format: "qcm",
  choices: [
    "le produit en croix : $x = \\dfrac{a \\times c}{b}$",
    "l’addition : $x = a + c - b$",
    "la soustraction : $x = c - b$",
    "le carré : $x = a^2$",
  ],
  expected: ["le produit en croix : $x = \\dfrac{a \\times c}{b}$"],
  comparator: "mcq_exact",
  hint: "On multiplie en croix puis on divise.",
  explanation:
    "Définition : la quatrième proportionnelle se calcule par produit en croix.\n\n" +
    "Méthode : on multiplie les termes en diagonale puis on divise.\n\n" +
    "Calcul : $x = \\dfrac{a \\times c}{b}$.\n\n" +
    "Conclusion : on utilise le produit en croix.",
  tags: ["prop_proportionnalite", "quatrieme", "methode", "qcm"],
},
{
  kind: "template",
  id: "3e_prop_quatrieme_tpl_4_reunion",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 3,
  theme: "reunion",
  hint: "Produit en croix entre quantité et prix.",
  tags: ["prop_proportionnalite", "quatrieme", "reunion", "template"],
  generate: () => {
    const q1 = randomChoice([3, 4, 5]);
    const prixUn = randomChoice([2, 3]);
    const p1 = q1 * prixUn;
    const q2 = q1 * randomChoice([2, 3]);
    const res = q2 * prixUn;
    return {
      text: `${q1} litchis coûtent ${p1} €. Combien coûtent ${q2} litchis (en €) ?`,
      format: "short",
      expected: [String(res)],
      comparator: "number_equal",
      explanation:
        `Définition : le prix est proportionnel au nombre de litchis.\n\n` +
        `Méthode : $\\dfrac{${p1}}{${q1}} = \\dfrac{x}{${q2}}$.\n\n` +
        `Calcul : $x = \\dfrac{${p1} \\times ${q2}}{${q1}} = ${res}$ €.\n\n` +
        `Conclusion : ${q2} litchis coûtent ${res} €.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_quatrieme_fixed_4",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 3,
  theme: "neutral",
  text: "Résoudre : $\\dfrac{5}{8} = \\dfrac{15}{x}$.",
  format: "short",
  expected: ["24"],
  comparator: "number_equal",
  hint: "Produit en croix : $5 \\times x = 8 \\times 15$.",
  explanation:
    "Définition : on cherche le terme manquant d’une proportion.\n\n" +
    "Méthode : produit en croix $5 \\times x = 8 \\times 15$.\n\n" +
    "Calcul : $5x = 120$, donc $x = 24$.\n\n" +
    "Conclusion : $x = 24$.",
  tags: ["prop_proportionnalite", "quatrieme", "short"],
},
{
  kind: "template",
  id: "3e_prop_quatrieme_tpl_5_denominateur",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_quatrieme",
  difficulty: 4,
  theme: "neutral",
  hint: "L’inconnue est au dénominateur : $a \\times x = b \\times c$.",
  tags: ["prop_proportionnalite", "quatrieme", "template"],
  generate: () => {
    const a = randomChoice([2, 3, 4]);
    const k = randomChoice([3, 4, 5]);
    const b = a * k;
    const c = randomChoice([4, 6, 8]);
    const x = c * k; // a/b = c/x -> x = c*b/a = c*k
    return {
      text: `Résoudre : $\\dfrac{${a}}{${b}} = \\dfrac{${c}}{x}$.`,
      format: "short",
      expected: [String(x)],
      comparator: "number_equal",
      explanation:
        `Définition : on cherche un terme au dénominateur.\n\n` +
        `Méthode : produit en croix $${a} \\times x = ${b} \\times ${c}$.\n\n` +
        `Calcul : $${a}x = ${b * c}$, donc $x = ${x}$.\n\n` +
        `Conclusion : $x = ${x}$.`,
    };
  },
},

/* =========================
   PROP_POURCENTAGE (compléments)
========================= */
{
  kind: "template",
  id: "3e_prop_pourcentage_tpl_3_proportion",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 3,
  theme: "neutral",
  hint: "Pourcentage $= \\dfrac{\\text{partie}}{\\text{total}} \\times 100$.",
  tags: ["prop_proportionnalite", "pourcentage", "template"],
  generate: () => {
    const total = randomChoice([20, 25, 50]);
    const pct = randomChoice([20, 40, 60]);
    const part = (total * pct) / 100;
    return {
      text: `Sur ${total} élèves, ${part} ont une bonne note. Quel pourcentage cela représente-t-il ?`,
      format: "short",
      expected: [String(pct)],
      comparator: "number_equal",
      explanation:
        `Définition : un pourcentage est une proportion sur $100$.\n\n` +
        `Méthode : on calcule $\\dfrac{${part}}{${total}} \\times 100$.\n\n` +
        `Calcul : $\\dfrac{${part}}{${total}} \\times 100 = ${pct}$.\n\n` +
        `Conclusion : cela représente ${pct} %.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_pourcentage_fixed_3_reduction",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 3,
  theme: "neutral",
  text: "Un article coûte $80$ €. On applique une réduction de $15$ %. Quel est le montant de la réduction (en €) ?",
  format: "short",
  expected: ["12"],
  comparator: "number_equal",
  hint: "$15$ % de $80$ $= 0{,}15 \\times 80$.",
  explanation:
    "Définition : la réduction est un pourcentage du prix.\n\n" +
    "Méthode : on calcule $0{,}15 \\times 80$.\n\n" +
    "Calcul : $0{,}15 \\times 80 = 12$.\n\n" +
    "Conclusion : la réduction est de $12$ €.",
  tags: ["prop_proportionnalite", "pourcentage", "short"],
},
{
  kind: "template",
  id: "3e_prop_pourcentage_tpl_4_de",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 2,
  theme: "neutral",
  hint: "$p$ % de $N = \\dfrac{p}{100} \\times N$.",
  tags: ["prop_proportionnalite", "pourcentage", "template"],
  generate: () => {
    const p = randomChoice([15, 35, 60, 75]);
    const n = randomChoice([20, 40, 80, 200]);
    const res = (p / 100) * n;
    return {
      text: `Calculer $${p}$ % de $${n}$.`,
      format: "short",
      expected: [String(res), String(res).replace(".", ",")],
      comparator: "number_equal",
      explanation:
        `Définition : $${p}$ % de $${n}$ $= \\dfrac{${p}}{100} \\times ${n}$.\n\n` +
        `Méthode : on multiplie $${n}$ par $\\dfrac{${p}}{100}$.\n\n` +
        `Calcul : $\\dfrac{${p}}{100} \\times ${n} = ${String(res).replace(".", ",")}$.\n\n` +
        `Conclusion : le résultat est $${String(res).replace(".", ",")}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_pourcentage_qcm_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 3,
  theme: "neutral",
  text: "$50$ % d’un nombre, c’est…",
  format: "qcm",
  choices: ["la moitié du nombre", "le double du nombre", "le quart du nombre", "le nombre entier"],
  expected: ["la moitié du nombre"],
  comparator: "mcq_exact",
  hint: "$50$ % $= \\dfrac{1}{2}$.",
  explanation:
    "Définition : $50$ % correspond à $\\dfrac{50}{100} = \\dfrac{1}{2}$.\n\n" +
    "Méthode : on relie le pourcentage à une fraction.\n\n" +
    "Calcul : $\\dfrac{1}{2}$ d’un nombre est sa moitié.\n\n" +
    "Conclusion : c’est la moitié du nombre.",
  tags: ["prop_proportionnalite", "pourcentage", "qcm"],
},
{
  kind: "fixed",
  id: "3e_prop_pourcentage_fixed_4_nouveau_prix",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_pourcentage",
  difficulty: 4,
  theme: "neutral",
  text: "Un article à $60$ € subit une remise de $25$ %. Quel est le prix payé (en €) ?",
  format: "short",
  expected: ["45"],
  comparator: "number_equal",
  hint: "Remise $= 0{,}25 \\times 60$, puis on soustrait.",
  explanation:
    "Définition : le prix payé est le prix initial moins la remise.\n\n" +
    "Méthode : remise $= 0{,}25 \\times 60 = 15$, puis $60 - 15$.\n\n" +
    "Calcul : $60 - 15 = 45$.\n\n" +
    "Conclusion : le prix payé est $45$ €.",
  tags: ["prop_proportionnalite", "pourcentage", "short"],
},

/* =========================
   PROP_EVOLUTION (compléments)
========================= */
{
  kind: "template",
  id: "3e_prop_evolution_tpl_3_coefficient",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  hint: "Augmenter de $p$ %, c’est multiplier par $1 + \\dfrac{p}{100}$.",
  tags: ["prop_proportionnalite", "evolution", "coefficient", "template"],
  generate: () => {
    const p = randomChoice([5, 10, 20, 50]);
    const coeff = 1 + p / 100;
    return {
      text: `Par quel nombre faut-il multiplier pour augmenter une quantité de $${p}$ % ?`,
      format: "short",
      expected: [String(coeff).replace(".", ","), String(coeff)],
      comparator: "number_equal",
      explanation:
        `Définition : augmenter de $${p}$ %, c’est multiplier par $1 + \\dfrac{${p}}{100}$.\n\n` +
        `Méthode : on calcule $1 + \\dfrac{${p}}{100}$.\n\n` +
        `Calcul : $1 + ${String(p / 100).replace(".", ",")} = ${String(coeff).replace(".", ",")}$.\n\n` +
        `Conclusion : on multiplie par $${String(coeff).replace(".", ",")}$.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_evolution_qcm_1_coeff_baisse",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  text: "Par quel nombre multiplie-t-on pour diminuer une quantité de $20$ % ?",
  format: "qcm",
  choices: ["$0{,}8$", "$1{,}2$", "$0{,}2$", "$20$"],
  expected: ["$0{,}8$"],
  comparator: "mcq_exact",
  hint: "Diminuer de $20$ %, c’est multiplier par $1 - 0{,}2$.",
  explanation:
    "Définition : diminuer de $20$ %, c’est multiplier par $1 - \\dfrac{20}{100}$.\n\n" +
    "Méthode : on calcule $1 - 0{,}2$.\n\n" +
    "Calcul : $1 - 0{,}2 = 0{,}8$.\n\n" +
    "Conclusion : on multiplie par $0{,}8$.",
  tags: ["prop_proportionnalite", "evolution", "qcm"],
},
{
  kind: "template",
  id: "3e_prop_evolution_tpl_4_population",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 4,
  theme: "reunion",
  hint: "Multiplie par le coefficient d’évolution.",
  tags: ["prop_proportionnalite", "evolution", "reunion", "template"],
  generate: () => {
    const pop = randomChoice([200, 400, 500, 1000]);
    const taux = randomChoice([10, 20, 50]);
    const nouveau = pop * (1 + taux / 100);
    return {
      text: `La population d’un village de La Réunion est de ${pop} habitants. Elle augmente de ${taux} %. Quelle est la nouvelle population ?`,
      format: "short",
      expected: [String(nouveau)],
      comparator: "number_equal",
      explanation:
        `Définition : augmenter de ${taux} %, c’est multiplier par $1 + \\dfrac{${taux}}{100}$.\n\n` +
        `Méthode : on multiplie ${pop} par $${1 + taux / 100}$.\n\n` +
        `Calcul : $${pop} \\times ${1 + taux / 100} = ${nouveau}$.\n\n` +
        `Conclusion : la nouvelle population est de ${nouveau} habitants.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_evolution_fixed_3_solde",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 4,
  theme: "neutral",
  text: "Un jean coûtait $50$ €. En solde, son prix baisse de $30$ %. Quel est le nouveau prix (en €) ?",
  format: "short",
  expected: ["35"],
  comparator: "number_equal",
  hint: "Multiplier par $1 - 0{,}3 = 0{,}7$.",
  explanation:
    "Définition : baisser de $30$ %, c’est multiplier par $0{,}7$.\n\n" +
    "Méthode : on multiplie $50$ par $0{,}7$.\n\n" +
    "Calcul : $50 \\times 0{,}7 = 35$.\n\n" +
    "Conclusion : le nouveau prix est $35$ €.",
  tags: ["prop_proportionnalite", "evolution", "short"],
},
{
  kind: "fixed",
  id: "3e_prop_evolution_qcm_2_hausse",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_evolution",
  difficulty: 3,
  theme: "neutral",
  text: "Multiplier un prix par $1{,}5$ correspond à…",
  format: "qcm",
  choices: [
    "une augmentation de $50$ %",
    "une augmentation de $150$ %",
    "une diminution de $50$ %",
    "une augmentation de $15$ %",
  ],
  expected: ["une augmentation de $50$ %"],
  comparator: "mcq_exact",
  hint: "$1{,}5 = 1 + 0{,}5$.",
  explanation:
    "Définition : multiplier par $1 + \\dfrac{p}{100}$ correspond à une hausse de $p$ %.\n\n" +
    "Méthode : on écrit $1{,}5 = 1 + 0{,}5$.\n\n" +
    "Calcul : $0{,}5 = 50$ %.\n\n" +
    "Conclusion : c’est une augmentation de $50$ %.",
  tags: ["prop_proportionnalite", "evolution", "qcm"],
},

/* =========================
   PROP_VITESSE_DEBIT (compléments)
========================= */
{
  kind: "template",
  id: "3e_prop_vitesse_tpl_2_distance",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 3,
  theme: "neutral",
  hint: "Distance $= $ vitesse $\\times$ temps.",
  tags: ["prop_proportionnalite", "vitesse", "template"],
  generate: () => {
    const v = randomChoice([40, 50, 60, 80]);
    const t = randomChoice([2, 3, 4]);
    const d = v * t;
    return {
      text: `Une voiture roule à ${v} km/h pendant ${t} h. Quelle distance parcourt-elle (en km) ?`,
      format: "short",
      expected: [String(d)],
      comparator: "number_equal",
      explanation:
        `Définition : à vitesse constante, distance $=$ vitesse $\\times$ temps.\n\n` +
        `Méthode : on multiplie ${v} par ${t}.\n\n` +
        `Calcul : $${v} \\times ${t} = ${d}$ km.\n\n` +
        `Conclusion : la distance est de ${d} km.`,
    };
  },
},
{
  kind: "template",
  id: "3e_prop_vitesse_tpl_3_temps",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 4,
  theme: "neutral",
  hint: "Temps $= $ distance $\\div$ vitesse.",
  tags: ["prop_proportionnalite", "vitesse", "template"],
  generate: () => {
    const v = randomChoice([40, 50, 60]);
    const t = randomChoice([2, 3, 4]);
    const d = v * t;
    return {
      text: `Une voiture parcourt ${d} km à la vitesse de ${v} km/h. Combien de temps met-elle (en h) ?`,
      format: "short",
      expected: [String(t)],
      comparator: "number_equal",
      explanation:
        `Définition : temps $=$ distance $\\div$ vitesse.\n\n` +
        `Méthode : on divise ${d} par ${v}.\n\n` +
        `Calcul : $${d} \\div ${v} = ${t}$ h.\n\n` +
        `Conclusion : elle met ${t} h.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_vitesse_qcm_1",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 2,
  theme: "neutral",
  text: "Quelle formule donne la vitesse moyenne ?",
  format: "qcm",
  choices: [
    "vitesse $= \\dfrac{\\text{distance}}{\\text{temps}}$",
    "vitesse $= \\text{distance} \\times \\text{temps}$",
    "vitesse $= \\dfrac{\\text{temps}}{\\text{distance}}$",
    "vitesse $= \\text{distance} + \\text{temps}$",
  ],
  expected: ["vitesse $= \\dfrac{\\text{distance}}{\\text{temps}}$"],
  comparator: "mcq_exact",
  hint: "On divise la distance par le temps.",
  explanation:
    "Définition : la vitesse moyenne est le quotient de la distance par le temps.\n\n" +
    "Méthode : on divise la distance par le temps.\n\n" +
    "Calcul : vitesse $= \\dfrac{\\text{distance}}{\\text{temps}}$.\n\n" +
    "Conclusion : c’est la première formule.",
  tags: ["prop_proportionnalite", "vitesse", "formule", "qcm"],
},
{
  kind: "fixed",
  id: "3e_prop_debit_fixed_2",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 3,
  theme: "neutral",
  text: "Un robinet a un débit de $8$ L/min. Quel volume (en L) remplit-il en $5$ min ?",
  format: "short",
  expected: ["40"],
  comparator: "number_equal",
  hint: "Volume $=$ débit $\\times$ temps.",
  explanation:
    "Définition : volume $=$ débit $\\times$ temps.\n\n" +
    "Méthode : on multiplie $8$ par $5$.\n\n" +
    "Calcul : $8 \\times 5 = 40$.\n\n" +
    "Conclusion : il remplit $40$ L.",
  tags: ["prop_proportionnalite", "debit", "short"],
},
{
  kind: "template",
  id: "3e_prop_debit_tpl_2_temps",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_vitesse_debit",
  difficulty: 4,
  theme: "neutral",
  hint: "Temps $=$ volume $\\div$ débit.",
  tags: ["prop_proportionnalite", "debit", "template"],
  generate: () => {
    const debit = randomChoice([5, 6, 8, 10]);
    const t = randomChoice([3, 4, 5]);
    const vol = debit * t;
    return {
      text: `Un bassin de ${vol} L se remplit avec un débit de ${debit} L/min. En combien de minutes est-il plein ?`,
      format: "short",
      expected: [String(t)],
      comparator: "number_equal",
      explanation:
        `Définition : temps $=$ volume $\\div$ débit.\n\n` +
        `Méthode : on divise ${vol} par ${debit}.\n\n` +
        `Calcul : $${vol} \\div ${debit} = ${t}$ min.\n\n` +
        `Conclusion : le bassin est plein en ${t} min.`,
    };
  },
},

/* =========================
   PROP_DEFIS (compléments)
========================= */
{
  kind: "fixed",
  id: "3e_prop_defi_fixed_2_meilleur_prix",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Offre A : $3$ cahiers pour $6$ €. Offre B : $5$ cahiers pour $9$ €. Quelle offre a le prix unitaire le plus bas ?",
  format: "qcm",
  choices: ["l’offre B", "l’offre A", "les deux pareil", "on ne peut pas savoir"],
  expected: ["l’offre B"],
  comparator: "mcq_exact",
  hint: "Compare le prix d’un seul cahier.",
  explanation:
    "Définition : le prix unitaire est le prix d’un seul article.\n\n" +
    "Méthode : on calcule prix $\\div$ quantité pour chaque offre.\n\n" +
    "Calcul : A : $6 \\div 3 = 2$ € ; B : $9 \\div 5 = 1{,}8$ €.\n\n" +
    "Conclusion : l’offre B est moins chère à l’unité.",
  tags: ["prop_proportionnalite", "defi", "prix_unitaire", "qcm"],
},
{
  kind: "template",
  id: "3e_prop_defi_tpl_3_unitaire",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 4,
  theme: "neutral",
  hint: "Prix unitaire $=$ prix $\\div$ quantité.",
  tags: ["prop_proportionnalite", "defi", "prix_unitaire", "template"],
  generate: () => {
    const prixUn = randomChoice([2, 3, 4]);
    const q = randomChoice([4, 5, 6]);
    const total = prixUn * q;
    return {
      text: `${q} articles identiques coûtent ${total} € en tout. Quel est le prix d’un seul article (en €) ?`,
      format: "short",
      expected: [String(prixUn)],
      comparator: "number_equal",
      explanation:
        `Définition : le prix unitaire est le prix d’un article.\n\n` +
        `Méthode : on divise le prix total par la quantité.\n\n` +
        `Calcul : $${total} \\div ${q} = ${prixUn}$ €.\n\n` +
        `Conclusion : un article coûte ${prixUn} €.`,
    };
  },
},
{
  kind: "template",
  id: "3e_prop_defi_tpl_4_echelle",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 5,
  theme: "neutral",
  hint: "Sur une carte à l’échelle, les distances sont proportionnelles.",
  tags: ["prop_proportionnalite", "defi", "echelle", "template"],
  generate: () => {
    const cmReel = randomChoice([2, 5, 10]); // 1 cm -> cmReel km
    const cmCarte = randomChoice([3, 4, 6]);
    const reel = cmReel * cmCarte;
    return {
      text: `Sur une carte, $1$ cm représente ${cmReel} km. Quelle distance réelle (en km) correspond à ${cmCarte} cm sur la carte ?`,
      format: "short",
      expected: [String(reel)],
      comparator: "number_equal",
      explanation:
        `Définition : sur une carte, la distance réelle est proportionnelle à la distance sur la carte.\n\n` +
        `Méthode : on multiplie la distance sur la carte par ${cmReel}.\n\n` +
        `Calcul : $${cmCarte} \\times ${cmReel} = ${reel}$ km.\n\n` +
        `Conclusion : la distance réelle est ${reel} km.`,
    };
  },
},
{
  kind: "fixed",
  id: "3e_prop_defi_fixed_3_pourcentage_inverse",
  niveau: "3e",
  matiere: "maths",
  notionId: "prop_proportionnalite",
  microId: "prop_defi",
  difficulty: 5,
  theme: "neutral",
  text: "Après une hausse de $25$ %, un article coûte $100$ €. Quel était son prix avant la hausse (en €) ?",
  format: "short",
  expected: ["80"],
  comparator: "number_equal",
  hint: "On divise par le coefficient $1{,}25$.",
  explanation:
    "Définition : pour annuler une hausse, on divise par le coefficient multiplicateur.\n\n" +
    "Méthode : prix initial $= 100 \\div 1{,}25$.\n\n" +
    "Calcul : $100 \\div 1{,}25 = 80$.\n\n" +
    "Conclusion : le prix initial était $80$ €.",
  tags: ["prop_proportionnalite", "defi", "evolution", "short"],
},
];