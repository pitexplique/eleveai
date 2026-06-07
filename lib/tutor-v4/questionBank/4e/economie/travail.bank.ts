import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

const CONCEPTS = [
  { slug: "salaire-brut",         term: "Le salaire brut",         definition: "Le salaire total avant déduction des cotisations sociales",                                                        distractors: ["Le salaire versé après toutes les déductions", "La prime annuelle versée en fin d'année", "Le montant des charges patronales"] },
  { slug: "salaire-net",          term: "Le salaire net",          definition: "Le salaire effectivement perçu par le salarié après déduction des cotisations",                                    distractors: ["Le salaire avant déduction des cotisations sociales", "La totalité du coût payé par l'employeur", "Le revenu minimum garanti par l'État"] },
  { slug: "smic",                 term: "Le SMIC",                 definition: "Le Salaire Minimum Interprofessionnel de Croissance — salaire horaire légal minimum en France",                   distractors: ["Le salaire moyen observé dans les grandes entreprises", "Une aide versée aux chômeurs par l'État", "La cotisation minimale obligatoire pour la retraite"] },
  { slug: "chomage",              term: "Le chômage",              definition: "Situation d'une personne sans emploi, disponible et qui en recherche activement un",                               distractors: ["Situation d'une personne qui travaille à temps partiel", "Congé accordé par l'employeur pour raison personnelle", "Période de formation financée par l'entreprise"] },
  { slug: "taux-chomage",         term: "Le taux de chômage",      definition: "Le pourcentage de chômeurs dans la population active (ceux qui travaillent ou cherchent du travail)",             distractors: ["Le nombre total de personnes sans emploi en France", "Le pourcentage de personnes inactives dans la population", "La part des emplois à temps partiel dans l'économie"] },
  { slug: "contrat-cdi",          term: "Le CDI",                  definition: "Contrat à Durée Indéterminée — contrat de travail sans date de fin fixée à l'avance",                             distractors: ["Contrat de travail signé pour une mission courte et précise", "Contrat à durée déterminée avec une date de fin prévue", "Accord collectif négocié entre syndicats et patronat"] },
  { slug: "contrat-cdd",          term: "Le CDD",                  definition: "Contrat à Durée Déterminée — contrat de travail avec une date de fin fixée",                                      distractors: ["Contrat de travail permanent sans date de fin", "Accord entre l'employeur et les syndicats", "Contrat réservé aux apprentis en alternance"] },
  { slug: "syndicat",             term: "Un syndicat",             definition: "Une organisation qui défend les intérêts des travailleurs face aux employeurs",                                    distractors: ["Une association d'entreprises pour fixer les prix", "Un organisme gouvernemental qui contrôle les salaires", "Une banque spécialisée dans le financement des PME"] },
  { slug: "cotisations-sociales", term: "Les cotisations sociales", definition: "Des prélèvements sur les salaires qui financent la protection sociale (santé, retraite, chômage)",              distractors: ["Des taxes sur les bénéfices des entreprises", "Des frais prélevés pour l'entretien des locaux", "Des amendes versées par les employeurs qui ne respectent pas la loi"] },
  { slug: "productivite",         term: "La productivité",         definition: "La quantité de production réalisée par unité de travail (par heure ou par salarié)",                              distractors: ["Le salaire versé pour une heure de travail", "Le nombre total d'heures travaillées dans une entreprise", "Le taux d'absentéisme observé dans une entreprise"] },
] as const;

export const travail4eBank: TutorBankItemV4[] = CONCEPTS.flatMap((c) => [
  {
    kind: "fixed" as const,
    id: `eco_4e_travail_def_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_travail",
    microId: "eco_4e_travail_def",
    difficulty: 1 as const,
    text: `Quel concept économique correspond à cette définition ?\n« ${c.definition} »`,
    format: "qcm" as const,
    choices: [c.term, ...c.distractors],
    expected: [c.term],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "travail", "4e"],
  },
  {
    kind: "fixed" as const,
    id: `eco_4e_travail_term_${c.slug}`,
    niveau: "4e" as const,
    matiere: "economie" as const,
    notionId: "eco_4e_travail",
    microId: "eco_4e_travail_def",
    difficulty: 2 as const,
    text: `Quelle est la définition de « ${c.term} » ?`,
    format: "qcm" as const,
    choices: [c.definition, ...c.distractors],
    expected: [c.definition],
    comparator: "mcq_exact" as const,
    explanation: `${c.term} : ${c.definition}.`,
    tags: ["economie", "travail", "4e"],
  },
]);
