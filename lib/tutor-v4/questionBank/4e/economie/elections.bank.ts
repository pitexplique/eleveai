import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CONCEPTS = [
  { slug: "programme-economique",   term: "Un programme économique",       definition: "L'ensemble des mesures économiques qu'un parti politique propose de mettre en œuvre s'il est élu",           distractors: ["Le budget annuel voté par le Parlement après les élections", "Un plan de redressement imposé par l'Union Européenne", "Les prévisions de croissance établies par la Banque de France"] },
  { slug: "deficit-budgetaire",     term: "Le déficit budgétaire",         definition: "Situation où les dépenses de l'État dépassent ses recettes fiscales sur une année",                           distractors: ["Situation où l'État collecte plus d'impôts qu'il ne dépense", "Le montant total de la dette accumulée depuis des décennies", "La différence entre les exportations et les importations"] },
  { slug: "dette-etat",             term: "La dette de l'État",            definition: "L'ensemble des sommes empruntées par l'État et non encore remboursées",                                       distractors: ["Le déficit observé uniquement sur la dernière année", "Les dépenses prévues dans le budget de l'année suivante", "Le montant total des impôts collectés depuis 10 ans"] },
  { slug: "croissance-economique",  term: "La croissance économique",      definition: "L'augmentation de la production de richesses d'un pays sur une période, mesurée par le PIB",                 distractors: ["La hausse du niveau des prix dans l'économie", "L'augmentation du nombre de chômeurs dans le pays", "La progression des importations par rapport aux exportations"] },
  { slug: "pib",                    term: "Le PIB",                        definition: "Le Produit Intérieur Brut — la valeur totale de tous les biens et services produits dans un pays en un an",   distractors: ["Le total des revenus perçus par les ménages français", "La somme de toutes les exportations réalisées en un an", "Le budget total de l'État pour une année donnée"] },
  { slug: "politique-austerite",    term: "La politique d'austérité",      definition: "Une politique qui réduit les dépenses publiques et augmente les impôts pour réduire le déficit",              distractors: ["Une politique qui augmente les dépenses pour relancer l'économie", "Une politique qui réduit les impôts pour stimuler la consommation", "Une politique qui nationalise les entreprises privées"] },
  { slug: "politique-relance",      term: "La politique de relance",       definition: "Une politique qui augmente les dépenses publiques pour stimuler l'activité économique et l'emploi",           distractors: ["Une politique qui réduit les dépenses pour équilibrer le budget", "Une politique qui augmente les taux d'intérêt pour freiner l'inflation", "Une politique qui privatise les services publics"] },
  { slug: "pouvoir-achat-elections", term: "Le pouvoir d'achat",          definition: "La capacité des ménages à acheter des biens avec leurs revenus — un thème central des élections",             distractors: ["Le droit de vote accordé à tous les citoyens majeurs", "La capacité de l'État à emprunter sur les marchés financiers", "La part du budget consacrée à l'éducation nationale"] },
  { slug: "nationalisation",        term: "La nationalisation",            definition: "Le rachat d'une entreprise privée par l'État qui en prend le contrôle",                                       distractors: ["La vente d'une entreprise publique à des actionnaires privés", "La fusion de deux entreprises privées en une seule", "La fermeture d'une entreprise décidée par le gouvernement"] },
  { slug: "privatisation",          term: "La privatisation",              definition: "Le transfert d'une entreprise publique au secteur privé",                                                     distractors: ["Le rachat d'une entreprise privée par l'État", "La création d'une nouvelle entreprise publique", "L'interdiction faite à une entreprise d'exercer ses activités"] },
] as const;

export const elections4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_elections_def_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_elections",
    microId: "eco_4e_elections_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "elections", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_elections_term_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_elections",
    microId: "eco_4e_elections_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "elections", "4e"],
  },
]);
