import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CONCEPTS = [
  { slug: "impot",                    term: "L'impôt",                       definition: "Un prélèvement obligatoire effectué par l'État sur les revenus ou les biens des citoyens",                             distractors: ["Un remboursement versé par l'État aux ménages modestes", "Un emprunt que l'État contracte auprès des banques", "Une cotisation versée aux mutuelles de santé"] },
  { slug: "tva",                      term: "La TVA",                        definition: "La Taxe sur la Valeur Ajoutée — un impôt inclus dans le prix de vente des biens et services",                          distractors: ["Un impôt prélevé uniquement sur les salaires des cadres", "Une taxe que seules les entreprises paient directement", "Un impôt sur la fortune des ménages les plus riches"] },
  { slug: "impot-revenu",             term: "L'impôt sur le revenu",         definition: "Un impôt progressif prélevé sur les revenus des ménages — les plus riches paient plus",                               distractors: ["Un impôt fixe identique pour tous les citoyens", "Une taxe prélevée uniquement sur les entreprises", "Une cotisation versée pour financer les retraites"] },
  { slug: "impot-progressif",         term: "L'impôt progressif",           definition: "Un impôt dont le taux augmente avec le niveau de revenu (les hauts revenus paient un taux plus élevé)",               distractors: ["Un impôt dont le taux est identique pour tous", "Un impôt dont le taux diminue quand les revenus augmentent", "Un impôt calculé uniquement sur le patrimoine immobilier"] },
  { slug: "redistribution",           term: "La redistribution",             definition: "Le mécanisme par lequel l'État collecte des impôts et les reverse sous forme de services et d'aides sociales",        distractors: ["Le partage des bénéfices entre les actionnaires d'une entreprise", "Le remboursement des dettes de l'État aux créanciers", "La fixation des prix par l'État pour protéger les consommateurs"] },
  { slug: "prelevements-obligatoires", term: "Les prélèvements obligatoires", definition: "L'ensemble des impôts et cotisations sociales prélevés obligatoirement par l'État",                                  distractors: ["Les dépenses volontaires de l'État pour les services publics", "Les remboursements versés aux entreprises exportatrices", "Les aides financières accordées aux ménages en difficulté"] },
  { slug: "service-public",           term: "Le service public",             definition: "Un service géré par l'État ou les collectivités pour satisfaire des besoins essentiels (éducation, santé, transport…)", distractors: ["Un service proposé par une entreprise privée à but lucratif", "Un organisme financé uniquement par les cotisations des usagers", "Une association à but non lucratif indépendante de l'État"] },
  { slug: "dette-publique",           term: "La dette publique",             definition: "L'ensemble des emprunts contractés par l'État pour financer ses déficits passés",                                      distractors: ["Les impôts collectés mais non encore dépensés par l'État", "Le budget annuel voté par le Parlement", "Les dettes des ménages envers les banques commerciales"] },
] as const;

export const fiscalite4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_fiscalite_def_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_fiscalite",
    microId: "eco_4e_fiscalite_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "fiscalite", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_fiscalite_term_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_fiscalite",
    microId: "eco_4e_fiscalite_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "fiscalite", "4e"],
  },
]);
