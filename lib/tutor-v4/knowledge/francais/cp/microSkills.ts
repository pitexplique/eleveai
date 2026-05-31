// Micro-competences de français pour la classe de CP.
// Reference : programme officiel du cycle 2,
// BO n. 41 du 31 octobre 2024, applicable a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [

  // ── Langage oral ──────────────────────────────────────────────────────────
  { id: "cp_oral_ecouter",       label: "Ecouter et comprendre une consigne ou un texte lu",  notionId: "langage_oral", prerequis: [] },
  { id: "cp_oral_reformuler",    label: "Reformuler ce qu'on a entendu",                       notionId: "langage_oral", prerequis: ["cp_oral_ecouter"] },
  { id: "cp_oral_prendre_parole",label: "Prendre la parole pour exprimer une idee",            notionId: "langage_oral", prerequis: ["cp_oral_reformuler"] },

  // ── Conscience phonologique ───────────────────────────────────────────────
  { id: "cp_phono_syllabe_compter",  label: "Compter les syllabes d'un mot",                    notionId: "conscience_phonologique", prerequis: [] },
  { id: "cp_phono_syllabe_decouper", label: "Decouper un mot en syllabes",                      notionId: "conscience_phonologique", prerequis: ["cp_phono_syllabe_compter"] },
  { id: "cp_phono_rime_reconnaitre", label: "Reconnaitre des rimes",                            notionId: "conscience_phonologique", prerequis: ["cp_phono_syllabe_compter"] },
  { id: "cp_phono_son_identifier",   label: "Identifier un son dans un mot",                    notionId: "conscience_phonologique", prerequis: ["cp_phono_syllabe_decouper"] },
  { id: "cp_phono_son_position",     label: "Dire si un son est au debut, au milieu ou a la fin",notionId: "conscience_phonologique", prerequis: ["cp_phono_son_identifier"] },
  { id: "cp_phono_defi",             label: "Defi phonologie",                                  notionId: "conscience_phonologique", prerequis: ["cp_phono_son_position", "cp_phono_rime_reconnaitre"] },

  // ── Correspondances grapheme-phoneme ──────────────────────────────────────
  { id: "cp_gph_voyelles",         label: "Lire les voyelles (a, e, i, o, u, y)",               notionId: "grapheme_phoneme", prerequis: ["cp_phono_son_identifier"] },
  { id: "cp_gph_consonnes_simples",label: "Lire les consonnes simples (l, m, r, s, t, p, b...)",notionId: "grapheme_phoneme", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_gph_sons_composes",    label: "Lire les sons composes (ou, on, an, in, ch...)",     notionId: "grapheme_phoneme", prerequis: ["cp_gph_consonnes_simples"] },
  { id: "cp_gph_ecrire_son",       label: "Ecrire le grapheme correspondant a un son",           notionId: "grapheme_phoneme", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_gph_defi",             label: "Defi graphemes-phonemes",                             notionId: "grapheme_phoneme", prerequis: ["cp_gph_sons_composes", "cp_gph_ecrire_son"] },

  // ── Lecture syllabique ────────────────────────────────────────────────────
  { id: "cp_lec_syllabes_cv",    label: "Lire des syllabes consonne-voyelle (ba, ma, li...)", notionId: "lecture_syllabique", prerequis: ["cp_gph_consonnes_simples"] },
  { id: "cp_lec_mots_simples",   label: "Lire des mots simples de 2 ou 3 syllabes",           notionId: "lecture_syllabique", prerequis: ["cp_lec_syllabes_cv"] },
  { id: "cp_lec_mots_frequents", label: "Lire des mots frequents (le, la, est, un, une...)", notionId: "lecture_syllabique", prerequis: ["cp_lec_mots_simples"] },
  { id: "cp_lec_phrase_simple",  label: "Lire une phrase simple a voix haute",                notionId: "lecture_syllabique", prerequis: ["cp_lec_mots_frequents"] },
  { id: "cp_lec_defi",           label: "Defi lecture (texte court)",                         notionId: "lecture_syllabique", prerequis: ["cp_lec_phrase_simple"] },

  // ── Comprehension de textes ───────────────────────────────────────────────
  { id: "cp_comp_personnage",      label: "Identifier le personnage principal",             notionId: "comprehension_lecture", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_comp_lieu_moment",     label: "Identifier le lieu et le moment",               notionId: "comprehension_lecture", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_comp_question_simple", label: "Repondre a une question simple sur un texte",   notionId: "comprehension_lecture", prerequis: ["cp_comp_personnage", "cp_comp_lieu_moment"] },
  { id: "cp_comp_reformuler",      label: "Reformuler ce qu'on a lu",                      notionId: "comprehension_lecture", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_comp_defi",            label: "Defi comprehension",                            notionId: "comprehension_lecture", prerequis: ["cp_comp_reformuler"] },

  // ── Copie ─────────────────────────────────────────────────────────────────
  { id: "cp_copie_lettre", label: "Copier des lettres en respectant la forme",          notionId: "copie", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_copie_mot",    label: "Copier un mot correctement",                         notionId: "copie", prerequis: ["cp_copie_lettre"] },
  { id: "cp_copie_phrase", label: "Copier une phrase avec majuscule et point",          notionId: "copie", prerequis: ["cp_copie_mot"] },

  // ── Ecriture de mots ──────────────────────────────────────────────────────
  { id: "cp_dict_son_simple",   label: "Ecrire un mot contenant un son simple",          notionId: "ecriture_mots", prerequis: ["cp_gph_ecrire_son", "cp_copie_mot"] },
  { id: "cp_dict_mot_courant",  label: "Ecrire un mot courant de memoire",               notionId: "ecriture_mots", prerequis: ["cp_dict_son_simple"] },
  { id: "cp_dict_phrase_simple",label: "Ecrire une phrase simple sous la dictee",        notionId: "ecriture_mots", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_dict_defi",         label: "Defi dictee",                                    notionId: "ecriture_mots", prerequis: ["cp_dict_phrase_simple"] },

  // ── Production d'ecrits ───────────────────────────────────────────────────
  { id: "cp_prod_legende", label: "Ecrire une legende sous une image",                  notionId: "production_ecrite", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_prod_phrase",  label: "Produire une phrase simple sur un sujet donne",      notionId: "production_ecrite", prerequis: ["cp_prod_legende"] },

  // ── Grammaire – la phrase ─────────────────────────────────────────────────
  { id: "cp_gram_phrase_reconnaitre", label: "Reconnaitre une phrase (sens + ponctuation)",    notionId: "grammaire_phrase", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_gram_majuscule_point",    label: "Utiliser la majuscule et le point",             notionId: "grammaire_phrase", prerequis: ["cp_gram_phrase_reconnaitre"] },
  { id: "cp_gram_nom_verbe",          label: "Identifier un nom et un verbe",                 notionId: "grammaire_phrase", prerequis: ["cp_gram_phrase_reconnaitre"] },
  { id: "cp_gram_determinant",        label: "Reconnaitre un determinant (le, la, les, un, une)", notionId: "grammaire_phrase", prerequis: ["cp_gram_nom_verbe"] },
  { id: "cp_gram_defi",               label: "Defi grammaire de la phrase",                   notionId: "grammaire_phrase", prerequis: ["cp_gram_determinant"] },

  // ── Orthographe ───────────────────────────────────────────────────────────
  { id: "cp_orth_accord_det_nom",  label: "Accorder le determinant et le nom (le/la/les)",  notionId: "orthographe", prerequis: ["cp_gram_determinant"] },
  { id: "cp_orth_marque_pluriel",  label: "Reconnaitre la marque du pluriel (s, x)",        notionId: "orthographe", prerequis: ["cp_orth_accord_det_nom"] },
  { id: "cp_orth_mot_invariable",  label: "Ecrire des mots invariables (et, est, ou, ou)", notionId: "orthographe", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_orth_defi",            label: "Defi orthographe",                               notionId: "orthographe", prerequis: ["cp_orth_marque_pluriel", "cp_orth_mot_invariable"] },

  // ── Vocabulaire ───────────────────────────────────────────────────────────
  { id: "cp_voc_mot_inconnu", label: "Deviner le sens d'un mot par le contexte",           notionId: "vocabulaire", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_voc_famille",     label: "Reconnaitre des mots de la meme famille",            notionId: "vocabulaire", prerequis: ["cp_voc_mot_inconnu"] },
  { id: "cp_voc_synonyme",    label: "Trouver un mot de sens proche",                      notionId: "vocabulaire", prerequis: ["cp_voc_famille"] },
  { id: "cp_voc_defi",        label: "Defi vocabulaire",                                   notionId: "vocabulaire", prerequis: ["cp_voc_synonyme"] },
];
