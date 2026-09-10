import type { KnowledgeBoCompetence } from "@/lib/tutor-v4/types";

/**
 * A1 — L'ARGENT AU QUOTIDIEN.
 *
 * ⚠️ « BO » EST ICI UN ABUS DE LANGAGE, ET IL FAUT LE DIRE. L'économie n'est
 * au programme d'aucune classe avant le lycée : ces trois compétences ne
 * citent donc aucun bulletin officiel, elles disent ce que le palier couvre.
 * Le champ garde son nom parce que toute la chaîne du coach l'attend
 * (buildKnowledge, la matrice, l'accent de couleur du sélecteur).
 *
 * Le palier A1 est celui de l'argent qu'on manipule : payer, compter ce qui
 * rentre et ce qui sort, choisir entre deux étiquettes. Rien n'y demande de
 * connaître une entreprise ni un impôt.
 */
export const bo: KnowledgeBoCompetence[] = [
  { boId: "ECO_A1_ARGENT",    label: "L'argent — payer, échanger, garder" },
  { boId: "ECO_A1_BUDGET",    label: "Le budget — gagner, dépenser, mettre de côté" },
  { boId: "ECO_A1_CONSOMMER", label: "Acheter — besoin, envie, comparer" },
];
