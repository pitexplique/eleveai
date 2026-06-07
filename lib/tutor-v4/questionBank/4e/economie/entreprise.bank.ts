import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

// ── Entreprise — 4e ───────────────────────────────────────────────────────────
const CONCEPTS = [
  { slug: "production",       term: "La production",        definition: "L'ensemble des biens et services créés par une entreprise",                                              distractors: ["L'argent dépensé pour créer un produit", "Le bénéfice réalisé après la vente", "Le nombre d'employés dans l'entreprise"] },
  { slug: "chiffre-affaires", term: "Le chiffre d'affaires", definition: "Le total des ventes réalisées par une entreprise sur une période",                                      distractors: ["Le bénéfice net après déduction des charges", "Le capital investi par les actionnaires", "Le salaire total versé aux employés"] },
  { slug: "profit",           term: "Le profit",             definition: "La différence entre les recettes et les coûts (recettes − charges)",                                   distractors: ["La somme des ventes sans déduire les charges", "Le montant des impôts payés par l'entreprise", "Les dépenses engagées pour produire"] },
  { slug: "couts-fixes",      term: "Les coûts fixes",       definition: "Les charges qui ne varient pas avec la quantité produite (loyer, salaires…)",                          distractors: ["Les charges qui augmentent avec la production", "Les taxes prélevées sur le chiffre d'affaires", "Les bénéfices redistribués aux actionnaires"] },
  { slug: "couts-variables",  term: "Les coûts variables",   definition: "Les charges qui augmentent avec la quantité produite (matières premières…)",                           distractors: ["Les charges qui restent stables quelle que soit la production", "Le revenu net de l'entrepreneur", "Les cotisations sociales des salariés"] },
  { slug: "investissement",   term: "L'investissement",      definition: "L'achat de biens durables pour augmenter la capacité de production",                                   distractors: ["Le remboursement d'un emprunt bancaire", "La distribution de dividendes aux actionnaires", "La réduction des charges salariales"] },
  { slug: "actionnaire",      term: "L'actionnaire",         definition: "Une personne qui possède des parts (actions) d'une entreprise et en partage les bénéfices",            distractors: ["Un salarié qui dirige l'entreprise au quotidien", "Un client fidèle de l'entreprise", "Un organisme qui prête de l'argent à l'entreprise"] },
  { slug: "valeur-ajoutee",   term: "La valeur ajoutée",     definition: "La richesse créée par l'entreprise : chiffre d'affaires − coût des consommations intermédiaires",      distractors: ["Le montant total des ventes brutes", "La somme des salaires versés aux employés", "Le bénéfice distribué aux actionnaires"] },
  { slug: "concurrence",      term: "La concurrence",        definition: "La compétition entre entreprises qui proposent des produits similaires sur un même marché",             distractors: ["La coopération entre entreprises pour fixer les prix", "L'aide de l'État aux entreprises en difficulté", "Le monopole d'une seule entreprise sur un marché"] },
  { slug: "faillite",         term: "La faillite",           definition: "Situation où une entreprise ne peut plus payer ses dettes et cesse son activité",                      distractors: ["Une période de forte croissance des bénéfices", "La fusion de deux entreprises concurrentes", "Le rachat d'une entreprise par ses salariés"] },
] as const;

export const entreprise4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_entreprise_def_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_entreprise",
    microId: "eco_4e_entreprise_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "entreprise", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_entreprise_term_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_entreprise",
    microId: "eco_4e_entreprise_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "entreprise", "4e"],
  },
]);
