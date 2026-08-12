// Micro-compétences de français pour la classe de CP.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.
//
// Relu le 09/08/2026 contre le TEXTE INTÉGRAL (Annexe 3), colonnes
// « Objectifs d'apprentissage » ET « Exemples de réussite ». 46 → 91.
// Ce qui manquait : toute la conjugaison — être et avoir au présent sont un
// objectif du CP —, les trois types de phrases, les formes négative et
// exclamative, l'adjectif, le pronom personnel, toute l'orthographe lexicale
// (nommer les accents, valeur sonore de s/c/g, an-am/en-em/on-om/in-im, la
// lettre muette finale retrouvée par la famille), les antonymes, l'ordre
// alphabétique, la chaîne anaphorique et l'inférence.
//
// ⚠️ Aucun identifiant existant n'a été renommé ni supprimé : ils portent
// l'historique des élèves et le graphe de prérequis. On ajoute et on accentue.
//
// 📅 Jalons du BO, que le coach ne sait pas encore utiliser : 12 à 15 CGP en
// fin de période 1, 25 à 30 en milieu d'année ; dictée de phrases à partir de
// la période 2 ; écrits de 1 à 5 lignes à partir de la période 2.
//
// Relu de nouveau le 12/08/2026, rubrique « Devenir lecteur ». Le BO lui donne
// CINQ objectifs ; le coach n'en couvrait que deux — reconnaitre des types de
// personnages, et différencier le narratif de l'informatif. Manquaient les
// trois autres, qui sont ceux du PARCOURS DE LECTEUR : « Lire 5 à 10 œuvres
// complètes et variées issues du patrimoine et de la littérature de jeunesse
// (albums, romans, contes, fables, poèmes, pièces de théâtre et
// documentaires) », « Aller vers les livres et être capable d'en choisir à
// titre personnel », « Relier ses lectures à son expérience personnelle, être
// en mesure d'établir des liens entre ses différentes lectures (mise en
// réseau) », « Fréquenter régulièrement des lieux de lecture et se familiariser
// avec eux, rencontrer des acteurs du livre ».
//
// 📅 Le repère chiffré de fin d'année entre lui aussi : « Lire après
// préparation un texte adapté à son niveau de lecture avec une vitesse de
// 30 mots par minute au minimum sans préparation, 50 après préparation. »
// Le CE1 avait son 70, le CE2 son 90, le CM1 110, le CM2 120, la 6e 130 : le CP
// était le seul niveau sans repère.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [

  // ── Langage oral ──────────────────────────────────────────────────────────
  { id: "cp_oral_ecouter",        label: "Écouter et comprendre une consigne ou un texte lu", notionId: "langage_oral", prerequis: [] },
  { id: "cp_oral_consigne",       label: "Faire ce qui est demandé dans une consigne entendue", notionId: "langage_oral", prerequis: ["cp_oral_ecouter"] },
  { id: "cp_oral_reformuler",     label: "Reformuler ce qu'on a entendu",                     notionId: "langage_oral", prerequis: ["cp_oral_ecouter"] },
  { id: "cp_oral_raconter",       label: "Raconter avec « parce que », « alors », « ensuite »", notionId: "langage_oral", prerequis: ["cp_oral_reformuler"] },
  { id: "cp_oral_prendre_parole", label: "Prendre la parole pour exprimer une idée",           notionId: "langage_oral", prerequis: ["cp_oral_reformuler"] },
  { id: "cp_oral_echanges",       label: "Participer à un échange en écoutant les autres",     notionId: "langage_oral", prerequis: ["cp_oral_prendre_parole"] },
  { id: "cp_oral_niveau_langue",  label: "Sentir qu'on ne parle pas pareil en classe et dans la cour", notionId: "langage_oral", prerequis: ["cp_oral_echanges"] },

  // ── Conscience phonologique ───────────────────────────────────────────────
  { id: "cp_phono_syllabe_compter",  label: "Compter les syllabes d'un mot",                     notionId: "conscience_phonologique", prerequis: [] },
  { id: "cp_phono_syllabe_decouper", label: "Découper un mot en syllabes",                       notionId: "conscience_phonologique", prerequis: ["cp_phono_syllabe_compter"] },
  { id: "cp_phono_rime_reconnaitre", label: "Reconnaître des rimes",                             notionId: "conscience_phonologique", prerequis: ["cp_phono_syllabe_compter"] },
  { id: "cp_phono_son_identifier",   label: "Identifier un son dans un mot",                     notionId: "conscience_phonologique", prerequis: ["cp_phono_syllabe_decouper"] },
  { id: "cp_phono_son_position",     label: "Dire si un son est au début, au milieu ou à la fin", notionId: "conscience_phonologique", prerequis: ["cp_phono_son_identifier"] },
  { id: "cp_phono_defi",             label: "Défi phonologie",                                   notionId: "conscience_phonologique", prerequis: ["cp_phono_son_position", "cp_phono_rime_reconnaitre"] },

  // ── Correspondances graphème-phonème ──────────────────────────────────────
  { id: "cp_gph_voyelles",          label: "Lire les voyelles (a, e, i, o, u, y)",                 notionId: "grapheme_phoneme", prerequis: ["cp_phono_son_identifier"] },
  { id: "cp_gph_consonnes_simples", label: "Lire les consonnes simples (l, m, r, s, t, p, b…)",    notionId: "grapheme_phoneme", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_gph_sons_composes",     label: "Lire les sons composés (ou, on, an, in, ch…)",         notionId: "grapheme_phoneme", prerequis: ["cp_gph_consonnes_simples"] },
  { id: "cp_gph_ecrire_son",        label: "Écrire le graphème qui correspond à un son",           notionId: "grapheme_phoneme", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_gph_defi",              label: "Défi graphèmes-phonèmes",                              notionId: "grapheme_phoneme", prerequis: ["cp_gph_sons_composes", "cp_gph_ecrire_son"] },

  // ── Lecture syllabique ────────────────────────────────────────────────────
  { id: "cp_lec_syllabes_cv",    label: "Lire des syllabes consonne-voyelle (ba, ma, li…)",   notionId: "lecture_syllabique", prerequis: ["cp_gph_consonnes_simples"] },
  { id: "cp_lec_mots_simples",   label: "Lire des mots simples de deux ou trois syllabes",     notionId: "lecture_syllabique", prerequis: ["cp_lec_syllabes_cv"] },
  { id: "cp_lec_mots_frequents", label: "Lire les mots fréquents (le, la, est, un, une…)",     notionId: "lecture_syllabique", prerequis: ["cp_lec_mots_simples"] },
  { id: "cp_lec_phrase_simple",  label: "Lire une phrase simple à voix haute",                 notionId: "lecture_syllabique", prerequis: ["cp_lec_mots_frequents"] },
  { id: "cp_lec_defi",           label: "Défi lecture (texte court)",                          notionId: "lecture_syllabique", prerequis: ["cp_lec_phrase_simple"] },

  // ── Lire à voix haute ─────────────────────────────────────────────────────
  { id: "cp_voix_ponctuation",  label: "Repérer le point et la virgule pour lire une phrase",  notionId: "lecture_voix_haute", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_voix_groupes_mots", label: "Lire les mots par groupes de sens",                    notionId: "lecture_voix_haute", prerequis: ["cp_voix_ponctuation"] },
  { id: "cp_voix_expressive",   label: "Faire parler un personnage en changeant sa voix",      notionId: "lecture_voix_haute", prerequis: ["cp_voix_groupes_mots"] },
  { id: "cp_voix_30_mots",      label: "Lire 30 mots par minute, 50 après préparation",        notionId: "lecture_voix_haute", prerequis: ["cp_voix_groupes_mots"] },

  // ── Compréhension de textes ───────────────────────────────────────────────
  { id: "cp_comp_personnage",      label: "Identifier le personnage principal",              notionId: "comprehension_lecture", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_comp_lieu_moment",     label: "Identifier le lieu et le moment",                 notionId: "comprehension_lecture", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_comp_question_simple", label: "Répondre à une question simple sur un texte",     notionId: "comprehension_lecture", prerequis: ["cp_comp_personnage", "cp_comp_lieu_moment"] },
  { id: "cp_comp_anaphore",        label: "Retrouver qui est « il » ou « elle » dans un texte", notionId: "comprehension_lecture", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_comp_inference",       label: "Deviner ce qui n'est pas écrit",                  notionId: "comprehension_lecture", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_comp_justifier",       label: "Justifier sa réponse en retournant au texte",     notionId: "comprehension_lecture", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_comp_reformuler",      label: "Reformuler ce qu'on a lu",                        notionId: "comprehension_lecture", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_comp_defi",            label: "Défi compréhension",                              notionId: "comprehension_lecture", prerequis: ["cp_comp_reformuler", "cp_comp_inference"] },

  // ── Devenir lecteur ───────────────────────────────────────────────────────
  { id: "cp_lect_types_personnages",   label: "Reconnaître des types de personnages",            notionId: "devenir_lecteur", prerequis: ["cp_comp_personnage"] },
  { id: "cp_lect_narratif_informatif", label: "Distinguer un texte qui raconte d'un texte qui informe", notionId: "devenir_lecteur", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_lect_sortes_de_livres",    label: "Reconnaître les sortes de livres : album, conte, poème, documentaire…", notionId: "devenir_lecteur", prerequis: ["cp_lect_narratif_informatif"] },
  { id: "cp_lect_choisir_livre",       label: "Choisir un livre selon ce qu'on aime",            notionId: "devenir_lecteur", prerequis: ["cp_lect_sortes_de_livres"] },
  { id: "cp_lect_relier_lectures",     label: "Relier une lecture à une autre, ou à ce qu'on a vécu", notionId: "devenir_lecteur", prerequis: ["cp_lect_types_personnages"] },
  { id: "cp_lect_lieux_lecture",       label: "Emprunter un livre et se repérer dans une bibliothèque", notionId: "devenir_lecteur", prerequis: ["cp_lect_choisir_livre"] },

  // ── Copie ─────────────────────────────────────────────────────────────────
  { id: "cp_copie_lettre",    label: "Copier des lettres en respectant leur forme",       notionId: "copie", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_copie_mot",       label: "Copier un mot correctement",                        notionId: "copie", prerequis: ["cp_copie_lettre"] },
  { id: "cp_copie_phrase",    label: "Copier une phrase avec sa majuscule et son point",  notionId: "copie", prerequis: ["cp_copie_mot"] },
  { id: "cp_copie_strategie", label: "Copier par groupes de mots au lieu de lettre à lettre", notionId: "copie", prerequis: ["cp_copie_phrase"] },
  { id: "cp_copie_relire",    label: "Se relire après avoir copié",                       notionId: "copie", prerequis: ["cp_copie_phrase"] },

  // ── Écriture de mots (dictée) ─────────────────────────────────────────────
  { id: "cp_dict_son_simple",     label: "Écrire un mot qui contient un son simple",     notionId: "ecriture_mots", prerequis: ["cp_gph_ecrire_son", "cp_copie_mot"] },
  { id: "cp_dict_mot_courant",    label: "Écrire un mot courant de mémoire",             notionId: "ecriture_mots", prerequis: ["cp_dict_son_simple"] },
  { id: "cp_dict_lettres_muettes",label: "Écrire les lettres muettes apprises",          notionId: "ecriture_mots", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_dict_phrase_simple",  label: "Écrire une phrase simple sous la dictée",      notionId: "ecriture_mots", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_dict_defi",           label: "Défi dictée",                                  notionId: "ecriture_mots", prerequis: ["cp_dict_phrase_simple", "cp_dict_lettres_muettes"] },

  // ── Production d'écrits ───────────────────────────────────────────────────
  { id: "cp_prod_legende",         label: "Écrire une légende sous une image",           notionId: "production_ecrite", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_prod_phrase",          label: "Produire une phrase simple sur un sujet donné", notionId: "production_ecrite", prerequis: ["cp_prod_legende"] },
  { id: "cp_prod_reponse_question",label: "Rédiger la réponse à une question",           notionId: "production_ecrite", prerequis: ["cp_prod_phrase"] },
  { id: "cp_prod_texte_court",     label: "Écrire un texte court de trois à cinq lignes", notionId: "production_ecrite", prerequis: ["cp_prod_phrase"] },
  { id: "cp_prod_relire",          label: "Se relire et corriger son texte",             notionId: "production_ecrite", prerequis: ["cp_prod_texte_court"] },

  // ── Grammaire – la phrase ─────────────────────────────────────────────────
  { id: "cp_gram_phrase_reconnaitre", label: "Reconnaître une phrase (sens et ponctuation)",         notionId: "grammaire_phrase", prerequis: ["cp_lec_phrase_simple"] },
  { id: "cp_gram_majuscule_point",    label: "Utiliser la majuscule et le point",                    notionId: "grammaire_phrase", prerequis: ["cp_gram_phrase_reconnaitre"] },
  { id: "cp_gram_ordonner_phrase",    label: "Remettre les mots d'une phrase dans l'ordre",          notionId: "grammaire_phrase", prerequis: ["cp_gram_phrase_reconnaitre"] },
  { id: "cp_gram_types_phrases",      label: "Reconnaître la phrase déclarative, interrogative, impérative", notionId: "grammaire_phrase", prerequis: ["cp_gram_majuscule_point"] },
  { id: "cp_gram_forme_negative",     label: "Reconnaître la forme négative (ne… pas)",              notionId: "grammaire_phrase", prerequis: ["cp_gram_types_phrases"] },
  { id: "cp_gram_forme_exclamative",  label: "Reconnaître la forme exclamative",                     notionId: "grammaire_phrase", prerequis: ["cp_gram_types_phrases"] },
  { id: "cp_gram_nom_verbe",          label: "Identifier un nom et un verbe",                        notionId: "grammaire_phrase", prerequis: ["cp_gram_phrase_reconnaitre"] },
  { id: "cp_gram_determinant",        label: "Reconnaître un déterminant (le, la, les, un, une)",    notionId: "grammaire_phrase", prerequis: ["cp_gram_nom_verbe"] },
  { id: "cp_gram_adjectif",           label: "Reconnaître un adjectif",                              notionId: "grammaire_phrase", prerequis: ["cp_gram_nom_verbe"] },
  { id: "cp_gram_pronom",             label: "Reconnaître un pronom personnel",                      notionId: "grammaire_phrase", prerequis: ["cp_gram_nom_verbe"] },
  { id: "cp_gram_defi",               label: "Défi grammaire de la phrase",                          notionId: "grammaire_phrase", prerequis: ["cp_gram_determinant", "cp_gram_adjectif", "cp_gram_pronom", "cp_gram_forme_negative"] },

  // ── Orthographe grammaticale ──────────────────────────────────────────────
  { id: "cp_orth_masculin_feminin", label: "Distinguer le masculin et le féminin",                       notionId: "orthographe", prerequis: ["cp_gram_determinant"] },
  { id: "cp_orth_marque_feminin",   label: "Ajouter le « e » du féminin (petit / petite)",              notionId: "orthographe", prerequis: ["cp_orth_masculin_feminin"] },
  { id: "cp_orth_accord_det_nom",   label: "Accorder le déterminant et le nom (le, la, les)",           notionId: "orthographe", prerequis: ["cp_gram_determinant"] },
  { id: "cp_orth_marque_pluriel",   label: "Reconnaître la marque du pluriel (s, x) — elle ne s'entend pas", notionId: "orthographe", prerequis: ["cp_orth_accord_det_nom"] },
  { id: "cp_orth_chaine_accords",   label: "Accorder tout le groupe (un petit garçon / une petite fille)", notionId: "orthographe", prerequis: ["cp_orth_marque_feminin", "cp_orth_marque_pluriel"] },
  { id: "cp_orth_sujet_verbe",      label: "Relier le sujet et le verbe (le chat miaule / les chats miaulent)", notionId: "orthographe", prerequis: ["cp_orth_marque_pluriel"] },
  { id: "cp_orth_mot_invariable",   label: "Écrire des mots invariables (et, dans, avec, pour)",        notionId: "orthographe", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_orth_defi",             label: "Défi orthographe",                                          notionId: "orthographe", prerequis: ["cp_orth_chaine_accords", "cp_orth_sujet_verbe", "cp_orth_mot_invariable"] },

  // ── Conjugaison ───────────────────────────────────────────────────────────
  // « Apprendre à conjuguer être et avoir au présent de l'indicatif et
  //   commencer à les mobiliser à l'écrit » — objectif du CP.
  { id: "cp_conj_etre_present",     label: "Conjuguer « être » au présent",                            notionId: "conjugaison", prerequis: ["cp_gram_nom_verbe"] },
  { id: "cp_conj_avoir_present",    label: "Conjuguer « avoir » au présent",                           notionId: "conjugaison", prerequis: ["cp_gram_nom_verbe"] },
  { id: "cp_conj_formes_verbales",  label: "Repérer les terminaisons fréquentes (nous -ons, vous -ez, ils -ent)", notionId: "conjugaison", prerequis: ["cp_conj_etre_present", "cp_conj_avoir_present"] },
  { id: "cp_conj_defi",             label: "Défi conjugaison",                                         notionId: "conjugaison", prerequis: ["cp_conj_formes_verbales"] },

  // ── Orthographe lexicale ──────────────────────────────────────────────────
  { id: "cp_orthlex_nommer_accents",  label: "Nommer les accents (aigu, grave, circonflexe)",           notionId: "orthographe_lexicale", prerequis: ["cp_gph_voyelles"] },
  { id: "cp_orthlex_valeur_s",        label: "Lire et écrire le « s » entre deux voyelles (poison / poisson)", notionId: "orthographe_lexicale", prerequis: ["cp_gph_consonnes_simples"] },
  { id: "cp_orthlex_valeur_c_g",      label: "Lire le « c » et le « g » selon la lettre qui suit",      notionId: "orthographe_lexicale", prerequis: ["cp_gph_consonnes_simples"] },
  { id: "cp_orthlex_m_devant_mbp",    label: "Écrire an/am, en/em, on/om, in/im : le « m » devant m, b, p", notionId: "orthographe_lexicale", prerequis: ["cp_gph_sons_composes"] },
  { id: "cp_orthlex_lettre_muette",   label: "Trouver la lettre finale muette grâce à la famille (chat / chaton)", notionId: "orthographe_lexicale", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_orthlex_mots_frequents",  label: "Mémoriser l'orthographe des mots fréquents",              notionId: "orthographe_lexicale", prerequis: ["cp_dict_mot_courant"] },
  { id: "cp_orthlex_defi",            label: "Défi orthographe lexicale",                               notionId: "orthographe_lexicale", prerequis: ["cp_orthlex_lettre_muette", "cp_orthlex_m_devant_mbp", "cp_orthlex_valeur_c_g"] },

  // ── Vocabulaire ───────────────────────────────────────────────────────────
  { id: "cp_voc_mot_inconnu",        label: "Deviner le sens d'un mot grâce au contexte",       notionId: "vocabulaire", prerequis: ["cp_comp_question_simple"] },
  { id: "cp_voc_famille",            label: "Reconnaître des mots de la même famille",          notionId: "vocabulaire", prerequis: ["cp_voc_mot_inconnu"] },
  { id: "cp_voc_affixes",            label: "Repérer ce qu'on ajoute devant ou derrière (coller / décoller)", notionId: "vocabulaire", prerequis: ["cp_voc_famille"] },
  { id: "cp_voc_synonyme",           label: "Trouver un mot de sens proche",                    notionId: "vocabulaire", prerequis: ["cp_voc_famille"] },
  { id: "cp_voc_antonyme",           label: "Trouver un mot de sens contraire",                 notionId: "vocabulaire", prerequis: ["cp_voc_synonyme"] },
  { id: "cp_voc_champ_lexical",      label: "Regrouper les mots qui vont ensemble",             notionId: "vocabulaire", prerequis: ["cp_voc_mot_inconnu"] },
  { id: "cp_voc_polysemie",          label: "Reconnaître qu'un mot peut avoir plusieurs sens",  notionId: "vocabulaire", prerequis: ["cp_voc_mot_inconnu"] },
  { id: "cp_voc_ordre_alphabetique", label: "Ranger des mots dans l'ordre alphabétique",        notionId: "vocabulaire", prerequis: [] },
  { id: "cp_voc_dictionnaire",       label: "Chercher un mot dans un dictionnaire adapté",      notionId: "vocabulaire", prerequis: ["cp_voc_ordre_alphabetique"] },
  { id: "cp_voc_defi",               label: "Défi vocabulaire",                                 notionId: "vocabulaire", prerequis: ["cp_voc_antonyme", "cp_voc_polysemie", "cp_voc_dictionnaire"] },
];
