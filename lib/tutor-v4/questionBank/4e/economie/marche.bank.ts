import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CONCEPTS = [
  { slug: "marche",               term: "Le marché",                    definition: "Un lieu (réel ou virtuel) où se rencontrent des acheteurs et des vendeurs pour échanger des biens ou services",         distractors: ["Un magasin appartenant à l'État", "Un système de distribution géré par le gouvernement", "Une banque qui prête aux entreprises"] },
  { slug: "offre",                term: "L'offre",                      definition: "La quantité de biens ou services que les producteurs sont prêts à vendre à un prix donné",                              distractors: ["La quantité de biens que les consommateurs souhaitent acheter", "Le prix fixé par l'État pour un produit", "Le stock disponible dans les entrepôts"] },
  { slug: "demande",              term: "La demande",                   definition: "La quantité de biens ou services que les consommateurs souhaitent acheter à un prix donné",                             distractors: ["Ce que les producteurs mettent en vente sur le marché", "La taxe appliquée sur un produit", "Le coût de fabrication d'un produit"] },
  { slug: "prix-equilibre",       term: "Le prix d'équilibre",          definition: "Le prix auquel la quantité offerte est égale à la quantité demandée",                                                   distractors: ["Le prix le plus bas proposé par les vendeurs", "Le prix fixé par l'État pour éviter les abus", "Le prix moyen calculé sur plusieurs années"] },
  { slug: "monopole",             term: "Le monopole",                  definition: "Situation où un seul vendeur domine entièrement un marché",                                                             distractors: ["Marché où de nombreux vendeurs se font concurrence", "Situation où l'État contrôle tous les prix", "Accord entre entreprises pour partager les marchés"] },
  { slug: "oligopole",            term: "L'oligopole",                  definition: "Marché dominé par quelques grandes entreprises qui se font concurrence",                                                distractors: ["Marché avec des milliers de petites entreprises", "Situation où un seul vendeur contrôle tout", "Marché sans aucune régulation de l'État"] },
  { slug: "surplus-consommateur", term: "Le surplus du consommateur",   definition: "La différence entre le prix qu'un consommateur était prêt à payer et le prix qu'il a réellement payé",                 distractors: ["Le bénéfice réalisé par le vendeur lors d'une vente", "La TVA payée en plus du prix affiché", "Le remboursement obtenu après une réclamation"] },
  { slug: "elasticite",           term: "L'élasticité de la demande",   definition: "La sensibilité de la demande aux variations de prix : si le prix monte, la demande baisse",                            distractors: ["La capacité de l'entreprise à augmenter sa production", "La flexibilité des salaires selon la conjoncture", "Le délai de réaction des vendeurs face à la concurrence"] },
] as const;

export const marche4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_marche_def_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_marche",
    microId: "eco_4e_marche_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "marche", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_marche_term_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_marche",
    microId: "eco_4e_marche_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "marche", "4e"],
  },
]);
