// Micro-competences de français pour la classe de CE1.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [

  // ── Langage oral ──────────────────────────────────────────────────────────
  { id: "ce1_oral_ecouter",       label: "Ecouter et comprendre un texte lu ou un expose", notionId: "langage_oral", prerequis: [] },
  { id: "ce1_oral_reformuler",    label: "Reformuler un texte entendu avec ses propres mots", notionId: "langage_oral", prerequis: ["ce1_oral_ecouter"] },
  { id: "ce1_oral_raconter",      label: "Raconter une histoire ou un evenement",          notionId: "langage_oral", prerequis: ["ce1_oral_reformuler"] },
  { id: "ce1_oral_expliquer",     label: "Expliquer son point de vue",                     notionId: "langage_oral", prerequis: ["ce1_oral_raconter"] },

  // ── Fluence et lecture courante ───────────────────────────────────────────
  { id: "ce1_flue_mots_connus",   label: "Lire des mots connus sans dechiffrer",          notionId: "fluence_lecture", prerequis: [] },
  { id: "ce1_flue_phrase",        label: "Lire une phrase en respectant la ponctuation",  notionId: "fluence_lecture", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_flue_texte_court",   label: "Lire un texte court a voix haute avec aisance", notionId: "fluence_lecture", prerequis: ["ce1_flue_phrase"] },
  { id: "ce1_flue_defi",          label: "Defi fluence",                                  notionId: "fluence_lecture", prerequis: ["ce1_flue_texte_court"] },

  // ── Sons complexes ────────────────────────────────────────────────────────
  { id: "ce1_sons_gn_ill",        label: "Lire les sons gn, ill, ail, eil, ouil...",     notionId: "sons_complexes", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_sons_e_accent",      label: "Distinguer e, e accent aigu, grave, circonflexe", notionId: "sons_complexes", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_sons_double_cons",   label: "Lire les consonnes doubles (ll, tt, ss...)",   notionId: "sons_complexes", prerequis: ["ce1_sons_e_accent"] },
  { id: "ce1_sons_defi",          label: "Defi sons complexes",                           notionId: "sons_complexes", prerequis: ["ce1_sons_gn_ill", "ce1_sons_double_cons"] },

  // ── Comprehension de textes ───────────────────────────────────────────────
  { id: "ce1_comp_personnages",   label: "Identifier les personnages et leurs relations",  notionId: "comprehension_lecture", prerequis: ["ce1_flue_phrase"] },
  { id: "ce1_comp_chronologie",   label: "Remettre des evenements dans l'ordre",           notionId: "comprehension_lecture", prerequis: ["ce1_comp_personnages"] },
  { id: "ce1_comp_implicite",     label: "Comprendre ce qui est implicite",                notionId: "comprehension_lecture", prerequis: ["ce1_comp_chronologie"] },
  { id: "ce1_comp_question",      label: "Repondre a des questions sur un texte",          notionId: "comprehension_lecture", prerequis: ["ce1_comp_personnages"] },
  { id: "ce1_comp_resumer",       label: "Resumer un texte court",                         notionId: "comprehension_lecture", prerequis: ["ce1_comp_implicite"] },
  { id: "ce1_comp_defi",          label: "Defi comprehension",                             notionId: "comprehension_lecture", prerequis: ["ce1_comp_resumer"] },

  // ── Types de textes ───────────────────────────────────────────────────────
  { id: "ce1_type_narratif",      label: "Reconnaitre un texte narratif",                  notionId: "types_textes", prerequis: ["ce1_comp_question"] },
  { id: "ce1_type_documentaire",  label: "Reconnaitre un texte documentaire",              notionId: "types_textes", prerequis: ["ce1_comp_question"] },
  { id: "ce1_type_poetique",      label: "Reconnaitre un texte poetique (rime, vers)",     notionId: "types_textes", prerequis: ["ce1_type_narratif"] },

  // ── Copie fluente ─────────────────────────────────────────────────────────
  { id: "ce1_copie_mot",          label: "Copier un mot sans erreur",                     notionId: "copie_fluente", prerequis: [] },
  { id: "ce1_copie_phrase",       label: "Copier une phrase avec majuscule et ponctuation", notionId: "copie_fluente", prerequis: ["ce1_copie_mot"] },
  { id: "ce1_copie_paragraphe",   label: "Copier un paragraphe court",                    notionId: "copie_fluente", prerequis: ["ce1_copie_phrase"] },

  // ── Ecriture de mots et dictee ────────────────────────────────────────────
  { id: "ce1_dict_mot_courant",   label: "Ecrire les mots courants de la liste de reference", notionId: "ecriture_mots", prerequis: ["ce1_copie_mot"] },
  { id: "ce1_dict_phrase",        label: "Ecrire une phrase correctement sous la dictee",    notionId: "ecriture_mots", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_dict_texte_court",   label: "Ecrire un texte tres court sous la dictee",       notionId: "ecriture_mots", prerequis: ["ce1_dict_phrase"] },
  { id: "ce1_dict_defi",          label: "Defi dictee",                                      notionId: "ecriture_mots", prerequis: ["ce1_dict_texte_court"] },

  // ── Production d'ecrits ───────────────────────────────────────────────────
  { id: "ce1_prod_phrase",        label: "Produire une ou deux phrases sur un sujet donne",  notionId: "production_ecrite", prerequis: ["ce1_dict_phrase"] },
  { id: "ce1_prod_suite",         label: "Ecrire la suite d'une histoire",                   notionId: "production_ecrite", prerequis: ["ce1_prod_phrase"] },
  { id: "ce1_prod_description",   label: "Decrire un personnage ou un lieu",                 notionId: "production_ecrite", prerequis: ["ce1_prod_phrase"] },
  { id: "ce1_prod_defi",          label: "Defi production d'ecrits",                         notionId: "production_ecrite", prerequis: ["ce1_prod_suite", "ce1_prod_description"] },

  // ── Grammaire – la phrase ─────────────────────────────────────────────────
  { id: "ce1_gram_phrase_types",  label: "Reconnaitre phrase declarative, interrogative, exclamative", notionId: "grammaire_phrase", prerequis: ["ce1_flue_phrase"] },
  { id: "ce1_gram_sujet_verbe",   label: "Identifier le sujet et le verbe",                           notionId: "grammaire_phrase", prerequis: ["ce1_gram_phrase_types"] },
  { id: "ce1_gram_complement",    label: "Identifier le complement de lieu ou de temps",              notionId: "grammaire_phrase", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_gram_defi",          label: "Defi grammaire de la phrase",                               notionId: "grammaire_phrase", prerequis: ["ce1_gram_complement"] },

  // ── Classes de mots ───────────────────────────────────────────────────────
  { id: "ce1_cm_nom_propre_commun", label: "Distinguer nom propre et nom commun",                notionId: "classes_mots", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_cm_adjectif",          label: "Identifier et utiliser un adjectif qualificatif",   notionId: "classes_mots", prerequis: ["ce1_cm_nom_propre_commun"] },
  { id: "ce1_cm_determinant",       label: "Reconnaitre les determinants (articles, possessifs)",notionId: "classes_mots", prerequis: ["ce1_cm_nom_propre_commun"] },
  { id: "ce1_cm_verbe",             label: "Reconnaitre le verbe dans une phrase",               notionId: "classes_mots", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_cm_defi",              label: "Defi classes de mots",                               notionId: "classes_mots", prerequis: ["ce1_cm_adjectif", "ce1_cm_determinant", "ce1_cm_verbe"] },

  // ── Orthographe ───────────────────────────────────────────────────────────
  { id: "ce1_orth_accord_gn",     label: "Accorder le groupe nominal (det + nom + adj)",   notionId: "orthographe", prerequis: ["ce1_cm_adjectif"] },
  { id: "ce1_orth_pluriel",       label: "Former le pluriel des noms et des adjectifs",    notionId: "orthographe", prerequis: ["ce1_orth_accord_gn"] },
  { id: "ce1_orth_accord_suj_v",  label: "Accorder le sujet et le verbe",                 notionId: "orthographe", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_orth_homophone",     label: "Distinguer les homophones grammaticaux (a/a, ou/ou, et/est)", notionId: "orthographe", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_orth_defi",          label: "Defi orthographe",                               notionId: "orthographe", prerequis: ["ce1_orth_pluriel", "ce1_orth_accord_suj_v", "ce1_orth_homophone"] },

  // ── Conjugaison ───────────────────────────────────────────────────────────
  { id: "ce1_conj_infinitif",     label: "Reconnaitre l'infinitif d'un verbe",            notionId: "conjugaison", prerequis: ["ce1_cm_verbe"] },
  { id: "ce1_conj_present_etre_avoir", label: "Conjuguer etre et avoir au present",       notionId: "conjugaison", prerequis: ["ce1_conj_infinitif"] },
  { id: "ce1_conj_present_er",    label: "Conjuguer les verbes en -er au present",        notionId: "conjugaison", prerequis: ["ce1_conj_present_etre_avoir"] },
  { id: "ce1_conj_passe_compose", label: "Former le passe compose avec avoir",            notionId: "conjugaison", prerequis: ["ce1_conj_present_er"] },
  { id: "ce1_conj_defi",          label: "Defi conjugaison",                              notionId: "conjugaison", prerequis: ["ce1_conj_passe_compose"] },

  // ── Vocabulaire ───────────────────────────────────────────────────────────
  { id: "ce1_voc_contexte",       label: "Deviner le sens d'un mot inconnu par le contexte", notionId: "vocabulaire", prerequis: ["ce1_comp_question"] },
  { id: "ce1_voc_famille",        label: "Reconnaitre et former des mots de la meme famille", notionId: "vocabulaire", prerequis: ["ce1_voc_contexte"] },
  { id: "ce1_voc_synonyme",       label: "Trouver un synonyme",                               notionId: "vocabulaire", prerequis: ["ce1_voc_famille"] },
  { id: "ce1_voc_antonyme",       label: "Trouver un antonyme (contraire)",                   notionId: "vocabulaire", prerequis: ["ce1_voc_synonyme"] },
  { id: "ce1_voc_polysemie",      label: "Identifier le sens d'un mot selon le contexte",     notionId: "vocabulaire", prerequis: ["ce1_voc_synonyme"] },
  { id: "ce1_voc_defi",           label: "Defi vocabulaire",                                  notionId: "vocabulaire", prerequis: ["ce1_voc_antonyme", "ce1_voc_polysemie"] },
];
