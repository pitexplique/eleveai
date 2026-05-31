// Micro-competences de francais pour la classe de CE2.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  { id: "ce2_oral_ecouter", label: "Ecouter et comprendre un texte ou un expose", notionId: "langage_oral", prerequis: [] },
  { id: "ce2_oral_reformuler", label: "Reformuler une information importante", notionId: "langage_oral", prerequis: ["ce2_oral_ecouter"] },
  { id: "ce2_oral_argumenter", label: "Justifier son avis a l'oral", notionId: "langage_oral", prerequis: ["ce2_oral_reformuler"] },
  { id: "ce2_oral_defi", label: "Defi langage oral", notionId: "langage_oral", prerequis: ["ce2_oral_argumenter"] },

  { id: "ce2_flue_mots_irreguliers", label: "Lire rapidement des mots frequents et irreguliers", notionId: "fluence_lecture", prerequis: [] },
  { id: "ce2_flue_phrase_expression", label: "Lire une phrase avec le ton et la ponctuation", notionId: "fluence_lecture", prerequis: ["ce2_flue_mots_irreguliers"] },
  { id: "ce2_flue_texte_90", label: "Lire un texte court avec fluidite", notionId: "fluence_lecture", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_flue_defi", label: "Defi fluence", notionId: "fluence_lecture", prerequis: ["ce2_flue_texte_90"] },

  { id: "ce2_comp_infos_explicites", label: "Relever des informations explicites", notionId: "comprehension_lecture", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_comp_inferences", label: "Faire une inference simple", notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_chronologie", label: "Retrouver l'ordre des evenements", notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_resume", label: "Resumer un texte court", notionId: "comprehension_lecture", prerequis: ["ce2_comp_inferences", "ce2_comp_chronologie"] },
  { id: "ce2_comp_defi", label: "Defi comprehension", notionId: "comprehension_lecture", prerequis: ["ce2_comp_resume"] },

  { id: "ce2_copie_phrase", label: "Copier une phrase sans erreur", notionId: "copie_fluente", prerequis: [] },
  { id: "ce2_copie_paragraphe", label: "Copier un paragraphe court avec soin", notionId: "copie_fluente", prerequis: ["ce2_copie_phrase"] },
  { id: "ce2_copie_relire", label: "Relire et corriger sa copie", notionId: "copie_fluente", prerequis: ["ce2_copie_paragraphe"] },

  { id: "ce2_prod_phrase_complexe", label: "Produire des phrases enrichies", notionId: "production_ecrite", prerequis: ["ce2_copie_phrase"] },
  { id: "ce2_prod_paragraphe", label: "Ecrire un court paragraphe coherent", notionId: "production_ecrite", prerequis: ["ce2_prod_phrase_complexe"] },
  { id: "ce2_prod_organiser", label: "Organiser ses idees dans l'ordre", notionId: "production_ecrite", prerequis: ["ce2_prod_paragraphe"] },
  { id: "ce2_prod_reviser", label: "Relire et ameliorer son texte", notionId: "production_ecrite", prerequis: ["ce2_prod_organiser"] },
  { id: "ce2_prod_defi", label: "Defi production d'ecrits", notionId: "production_ecrite", prerequis: ["ce2_prod_reviser"] },

  { id: "ce2_gram_phrase_types", label: "Identifier les types de phrases", notionId: "grammaire_phrase", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_gram_sujet_verbe", label: "Identifier le sujet et le verbe", notionId: "grammaire_phrase", prerequis: ["ce2_gram_phrase_types"] },
  { id: "ce2_gram_complements", label: "Identifier des complements dans la phrase", notionId: "grammaire_phrase", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_gram_phrase_negative", label: "Transformer une phrase affirmative en phrase negative", notionId: "grammaire_phrase", prerequis: ["ce2_gram_phrase_types"] },
  { id: "ce2_gram_defi", label: "Defi grammaire de la phrase", notionId: "grammaire_phrase", prerequis: ["ce2_gram_complements", "ce2_gram_phrase_negative"] },

  { id: "ce2_cm_nom", label: "Distinguer nom propre et nom commun", notionId: "classes_mots", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_cm_determinant", label: "Identifier les determinants", notionId: "classes_mots", prerequis: ["ce2_cm_nom"] },
  { id: "ce2_cm_adjectif", label: "Identifier et utiliser un adjectif", notionId: "classes_mots", prerequis: ["ce2_cm_nom"] },
  { id: "ce2_cm_verbe", label: "Identifier le verbe et son infinitif", notionId: "classes_mots", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_cm_pronom", label: "Identifier les pronoms personnels sujets", notionId: "classes_mots", prerequis: ["ce2_cm_verbe"] },
  { id: "ce2_cm_defi", label: "Defi classes de mots", notionId: "classes_mots", prerequis: ["ce2_cm_determinant", "ce2_cm_adjectif", "ce2_cm_pronom"] },

  { id: "ce2_orth_accord_gn", label: "Accorder le groupe nominal", notionId: "orthographe", prerequis: ["ce2_cm_adjectif", "ce2_cm_determinant"] },
  { id: "ce2_orth_pluriel", label: "Former le pluriel des noms et adjectifs", notionId: "orthographe", prerequis: ["ce2_orth_accord_gn"] },
  { id: "ce2_orth_sujet_verbe", label: "Accorder le verbe avec son sujet", notionId: "orthographe", prerequis: ["ce2_gram_sujet_verbe", "ce2_cm_verbe"] },
  { id: "ce2_orth_homophones", label: "Distinguer les homophones courants", notionId: "orthographe", prerequis: ["ce2_orth_sujet_verbe"] },
  { id: "ce2_orth_mots_invariables", label: "Ecrire des mots invariables frequents", notionId: "orthographe", prerequis: ["ce2_copie_relire"] },
  { id: "ce2_orth_defi", label: "Defi orthographe", notionId: "orthographe", prerequis: ["ce2_orth_pluriel", "ce2_orth_homophones", "ce2_orth_mots_invariables"] },

  { id: "ce2_conj_infinitif", label: "Trouver l'infinitif d'un verbe", notionId: "conjugaison", prerequis: ["ce2_cm_verbe"] },
  { id: "ce2_conj_present_etre_avoir", label: "Conjuguer etre et avoir au present", notionId: "conjugaison", prerequis: ["ce2_conj_infinitif"] },
  { id: "ce2_conj_present_er", label: "Conjuguer les verbes en -er au present", notionId: "conjugaison", prerequis: ["ce2_conj_present_etre_avoir"] },
  { id: "ce2_conj_imparfait", label: "Identifier et former l'imparfait", notionId: "conjugaison", prerequis: ["ce2_conj_present_er"] },
  { id: "ce2_conj_futur", label: "Identifier et former le futur", notionId: "conjugaison", prerequis: ["ce2_conj_present_er"] },
  { id: "ce2_conj_defi", label: "Defi conjugaison", notionId: "conjugaison", prerequis: ["ce2_conj_imparfait", "ce2_conj_futur"] },

  { id: "ce2_voc_contexte", label: "Comprendre un mot grace au contexte", notionId: "vocabulaire", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_voc_famille", label: "Former et reconnaitre des familles de mots", notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_prefixe_suffixe", label: "Comprendre le role des prefixes et suffixes", notionId: "vocabulaire", prerequis: ["ce2_voc_famille"] },
  { id: "ce2_voc_synonyme_antonyme", label: "Utiliser synonymes et antonymes", notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_polysemie", label: "Identifier le sens d'un mot selon le contexte", notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_defi", label: "Defi vocabulaire", notionId: "vocabulaire", prerequis: ["ce2_voc_prefixe_suffixe", "ce2_voc_synonyme_antonyme", "ce2_voc_polysemie"] },
];
