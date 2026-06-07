import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CONCEPTS = [
  { slug: "revenu",          term: "Le revenu",            definition: "L'ensemble des ressources perçues par un ménage (salaires, allocations, loyers reçus…)",                      distractors: ["L'ensemble des dépenses réalisées par un ménage", "Le montant total des impôts payés par un foyer", "La valeur du patrimoine possédé par une famille"] },
  { slug: "depenses",        term: "Les dépenses",         definition: "Les sommes d'argent utilisées pour acheter des biens ou des services",                                        distractors: ["L'argent mis de côté pour l'avenir", "Les ressources perçues chaque mois par un ménage", "Les taxes prélevées sur les revenus"] },
  { slug: "epargne",         term: "L'épargne",            definition: "La partie du revenu qui n'est pas consommée et mise de côté pour l'avenir",                                   distractors: ["L'argent emprunté à une banque pour un achat", "Les dépenses réalisées pour les loisirs", "Le revenu total avant impôts d'un ménage"] },
  { slug: "budget-equilibre", term: "Un budget équilibré", definition: "Situation où les recettes sont égales aux dépenses (recettes = dépenses)",                                   distractors: ["Situation où les dépenses dépassent les recettes", "Situation où les recettes sont supérieures aux dépenses", "Un budget voté par le Parlement chaque année"] },
  { slug: "deficit",         term: "Le déficit",           definition: "Situation où les dépenses sont supérieures aux recettes",                                                     distractors: ["Situation où les recettes dépassent les dépenses", "La différence entre l'épargne et l'investissement", "Le montant total des dettes accumulées"] },
  { slug: "excedent",        term: "L'excédent",           definition: "Situation où les recettes sont supérieures aux dépenses",                                                     distractors: ["Situation où les dépenses dépassent les recettes", "Le montant des emprunts réalisés cette année", "La somme des dettes passées non remboursées"] },
  { slug: "endettement",     term: "L'endettement",        definition: "Le fait d'emprunter de l'argent que l'on devra rembourser avec des intérêts",                                 distractors: ["Le fait de placer son argent pour obtenir des intérêts", "La diminution progressive d'une dette existante", "L'ensemble des revenus issus des placements financiers"] },
  { slug: "taux-epargne",    term: "Le taux d'épargne",    definition: "La part du revenu consacrée à l'épargne, exprimée en pourcentage",                                            distractors: ["Le taux d'intérêt proposé par les banques sur les dépôts", "Le pourcentage des dépenses par rapport au revenu", "La variation annuelle du niveau de vie des ménages"] },
] as const;

export const budget4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_budget_def_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_budget",
    microId: "eco_4e_budget_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "budget", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_budget_term_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_budget",
    microId: "eco_4e_budget_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "budget", "4e"],
  },
]);
