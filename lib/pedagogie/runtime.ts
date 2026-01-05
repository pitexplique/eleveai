// lib/pedagogie/runtime.ts
import { getTypeById, TypeItem } from "./types";
import { TACHES_PROF, type TacheProfValue } from "@/lib/constants/scolaire";

/* =========================================================
   OUTPUT STYLE (profs) — même union que dans EspaceprofsClient
========================================================= */
export type OutputStyleProf = "simple" | "word" | "word_expert";

/* =========================================================
   MAIN CATEGORY (mêmes ids que dans EspaceprofsClient)
========================================================= */
export type MainCategory = "seance" | "exercices" | "evaluation" | "correction" | "methodes";

export function normalizeMainCategory(raw: unknown): MainCategory {
  const c = String(raw ?? "").toLowerCase();

  if (c.includes("seance") || c.includes("séance") || c.includes("sequence") || c.includes("séquence")) return "seance";
  if (c.includes("exercice")) return "exercices";
  if (c.includes("eval") || c.includes("éval") || c.includes("evaluation") || c.includes("évaluation")) return "evaluation";
  if (c.includes("correction") || c.includes("corrige") || c.includes("corrigé")) return "correction";
  if (c.includes("document") || c.includes("methode") || c.includes("méthode")) return "methodes";

  return "seance";
}

/* =========================================================
   HELPERS : récupérer le label depuis TACHES_PROF
========================================================= */
export function labelFromTacheProfValue(value: TacheProfValue): string {
  const found = TACHES_PROF.find((t) => t.value === value);
  return found?.label ?? "";
}

/* =========================================================
   MAPPING : TacheProfValue → TypeItem["id"]
   IMPORTANT :
   - on mappe seulement les "vraies" tâches (pas les séparateurs "")
========================================================= */
const TACHEPROF_TO_TYPE: Partial<Record<TacheProfValue, TypeItem["id"]>> = {
  // PLANIFICATION
  plan_cours: "seance_cle_en_main",
  progression_annuelle: "sequence_pedagogique",
  sequence_pedagogique: "sequence_pedagogique",

  // ACTIVITÉS EN CLASSE
  debat: "debat_guide",
  fiche_activite: "exos_progressifs_corrige",
  jeu_role: "jeu_de_role",
  jeu_educatif: "jeu_educatif",
  td: "td_guide",
  tp: "tp_guide",

  // ÉVALUATION
  devoir_dm: "eval_ds_bareme",
  evaluation: "eval_ds_bareme",
  evaluation_formative: "eval_formative",
  grille_evaluation: "grille_evaluation",
  quiz_qcm: "eval_qcm_corrige",
  rubrique_competences: "rubrique_competences",

  // PROJETS
  projet: "projet_pedagogique",
  projet_interdisciplinaire: "projet_interdisciplinaire",

  // DIFF / REMÉDIATION
  differenciation: "differenciation_parcours",
  remediation: "remediation_erreurs",

  // COMMUNICATION
  correspondances: "correspondances",
  lettre_motivation: "lettre_motivation",
  presentation_orale: "presentation_orale",

  // CONTENUS
  explication: "explication_notions",
  fiche_methode: "fiche_methode",
  presentation_support: "support_cours",

  // RÉVISION
  affichage_classe: "affichage_classe",
  carte_mentale: "carte_mentale",
  fiche_revision: "fiche_revision",
  memo_eleve: "memo_eleve",
  synthese_cours: "synthese_cours",

  // MULTIMÉDIA
  infographie: "infographie",
  podcast_educatif: "podcast_educatif",
  video_pedagogique: "video_pedagogique",

  // CORRECTION / SUIVI
  consignes_travail: "consignes_travail",
  corrige_detaille: "correction_detaillee",

  // ORIENTATION
  cv_competences: "cv_competences",
  dossier_orientation: "dossier_orientation",
  portfolio_eleve: "portfolio_eleve",
  rapport_stage: "rapport_stage",

  // SUIVI
  carnet_bord: "carnet_bord",
  journal_apprentissage: "journal_apprentissage",

  // AUTRES
  autre: "seance_cle_en_main",
};

/* =========================================================
   RUNTIME : tâche → typeId + auto + category
========================================================= */
export function resolveTypeFromTacheProf(tache: TacheProfValue) {
  const typeId = TACHEPROF_TO_TYPE[tache];

  // sécurité : si séparateur "" ou tâche non mappée
  const safeTypeId: TypeItem["id"] = (typeId ?? "seance_cle_en_main") as TypeItem["id"];
  const type = getTypeById(safeTypeId);

  const forceOutputStyle = type?.auto?.forceOutputStyle as OutputStyleProf | undefined;

  return {
    tache,
    label: labelFromTacheProfValue(tache),
    typeId: safeTypeId,
    type,
    mainCategory: normalizeMainCategory(type?.category),
    auto: {
      openEvalPanel: type?.auto?.openEvalPanel ?? false,
      hideMethodePanel: type?.auto?.hideMethodePanel ?? false,
      forceOutputStyle,
      defaultDureeMin: type?.defaultDureeMin ?? null,
    },
  };
}
