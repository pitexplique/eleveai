import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CONCEPTS = [
  { slug: "inflation",      term: "L'inflation",       definition: "La hausse générale et durable du niveau des prix, qui réduit le pouvoir d'achat",                                    distractors: ["La baisse générale des prix dans l'économie", "L'augmentation de la quantité de monnaie épargnée", "La hausse du taux de chômage dans un pays"] },
  { slug: "deflation",      term: "La déflation",      definition: "La baisse générale et durable du niveau des prix, souvent signe de crise économique",                               distractors: ["La hausse générale et durable des prix", "La réduction du nombre de billets en circulation", "La diminution du déficit budgétaire de l'État"] },
  { slug: "pouvoir-achat",  term: "Le pouvoir d'achat", definition: "La quantité de biens et services qu'un revenu permet d'acheter",                                                   distractors: ["Le montant total du salaire brut d'un ménage", "La capacité d'un État à emprunter sur les marchés", "Le budget consacré aux achats alimentaires"] },
  { slug: "taux-inflation", term: "Le taux d'inflation", definition: "Le pourcentage d'augmentation du niveau général des prix sur une période donnée",                                distractors: ["Le taux d'intérêt fixé par la Banque Centrale", "Le pourcentage de hausse des salaires sur l'année", "La variation du taux de chômage sur une période"] },
  { slug: "monnaie",        term: "La monnaie",         definition: "Un instrument d'échange accepté par tous pour acheter des biens et des services",                                  distractors: ["Un titre de propriété sur une part d'entreprise", "Un contrat entre un acheteur et un vendeur", "Un document officiel attestant d'une dette"] },
  { slug: "banque-centrale", term: "La Banque Centrale", definition: "L'institution qui émet la monnaie et régule la politique monétaire (ex : BCE pour l'euro)",                      distractors: ["Une banque commerciale qui prête aux particuliers", "L'organisme qui collecte les impôts pour l'État", "Le ministère chargé de gérer le budget national"] },
  { slug: "taux-interet",   term: "Le taux d'intérêt",  definition: "Le prix du crédit : le pourcentage que l'emprunteur paie en plus du capital emprunté",                            distractors: ["Le pourcentage d'inflation observé sur une année", "La part des bénéfices reversée aux actionnaires", "Le taux de prélèvement fiscal sur les revenus"] },
  { slug: "euro",           term: "L'euro",             definition: "La monnaie unique de la zone euro, utilisée par 20 pays de l'Union Européenne",                                   distractors: ["La monnaie utilisée uniquement en France depuis 1999", "La monnaie internationale de réserve la plus utilisée", "Le nom de la Banque Centrale Européenne"] },
] as const;

export const monnaie4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_monnaie_def_${c.slug}`,
    niveau: "eco-college" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_monnaie",
    microId: "eco_4e_monnaie_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "monnaie", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_monnaie_term_${c.slug}`,
    niveau: "eco-college" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_monnaie",
    microId: "eco_4e_monnaie_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "monnaie", "4e"],
  },
]);
