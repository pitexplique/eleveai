// Micro-compétences de français pour la classe de CE2.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.
//
// Relu le 09/08/2026 contre le TEXTE INTÉGRAL (Annexe 3), colonnes
// « Objectifs d'apprentissage » ET « Exemples de réussite ». 50 → 116.
//
// ⛔ Ce qui manquait de plus grave : LE PASSÉ COMPOSÉ et LES HUIT VERBES
// IRRÉGULIERS DU 3ᵉ GROUPE. Le BO écrit « Apprendre à conjuguer au présent, à
// l'imparfait, au futur et au passé composé de l'indicatif être et avoir, les
// verbes du premier groupe et les verbes irréguliers du 3e groupe (faire,
// aller, dire, venir, pouvoir, voir, vouloir, prendre) ». Le coach s'arrêtait
// au futur, sans un seul verbe irrégulier.
//
// Manquaient aussi : l'ADVERBE et le DISCOURS RAPPORTÉ (« … »), que le BO
// ajoute au CE2 ; la dictée, qui n'avait même pas de notion alors que le BO a
// « Encoder puis écrire sous dictée » aux trois niveaux ; les pluriels
// irréguliers (-x, -al/-aux) ; le féminin qui s'entend (lecteur/lectrice,
// joyeux/joyeuse) ; les niveaux de langue ; le sens propre et figuré ; la
// distinction narratif / informatif / prescriptif.
//
// ⚠️ Aucun identifiant existant n'a été renommé ni supprimé : ils portent
// l'historique des élèves et le graphe de prérequis. On ajoute et on accentue.
// Le fichier ne contenait auparavant AUCUN caractère accentué, alors que ces
// intitulés sont affichés à l'élève.
//
// 📅 Repères du BO : 90 mots par minute ; texte lu en autonomie d'une
// vingtaine de lignes ; écrit produit d'une dizaine de lignes ; copie d'une
// dizaine de lignes avec mise en page complexe ; six corpus de vocabulaire
// par période.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [

  // ── Langage oral ──────────────────────────────────────────────────────────
  { id: "ce2_oral_ecouter",        label: "Écouter et comprendre un texte ou un exposé",            notionId: "langage_oral", prerequis: [] },
  { id: "ce2_oral_relier_infos",   label: "Relier plusieurs informations entendues",                notionId: "langage_oral", prerequis: ["ce2_oral_ecouter"] },
  { id: "ce2_oral_reformuler",     label: "Reformuler une information importante",                  notionId: "langage_oral", prerequis: ["ce2_oral_ecouter"] },
  { id: "ce2_oral_argumenter",     label: "Justifier son avis à l'oral",                            notionId: "langage_oral", prerequis: ["ce2_oral_reformuler"] },
  { id: "ce2_oral_expliquer_demarche", label: "Expliquer un raisonnement ou une démarche",          notionId: "langage_oral", prerequis: ["ce2_oral_argumenter"] },
  { id: "ce2_oral_expose",         label: "Présenter un exposé de quelques minutes",                notionId: "langage_oral", prerequis: ["ce2_oral_argumenter"] },
  { id: "ce2_oral_rebondir",       label: "Reprendre les propos d'un camarade pour avancer",        notionId: "langage_oral", prerequis: ["ce2_oral_argumenter"] },
  { id: "ce2_oral_registre",       label: "Changer de registre selon la situation",                 notionId: "langage_oral", prerequis: ["ce2_oral_rebondir"] },
  { id: "ce2_oral_tics_verbaux",   label: "Éviter les tics verbaux et varier les connecteurs",      notionId: "langage_oral", prerequis: ["ce2_oral_expose"] },
  { id: "ce2_oral_defi",           label: "Défi langage oral",                                      notionId: "langage_oral", prerequis: ["ce2_oral_registre", "ce2_oral_tics_verbaux"] },

  // ── Fluence et lecture expressive ─────────────────────────────────────────
  { id: "ce2_flue_mots_irreguliers",  label: "Lire rapidement des mots fréquents et irréguliers",   notionId: "fluence_lecture", prerequis: [] },
  { id: "ce2_flue_mots_inconnus",     label: "Décoder un mot inconnu sans perdre de vitesse",       notionId: "fluence_lecture", prerequis: ["ce2_flue_mots_irreguliers"] },
  { id: "ce2_flue_lettres_muettes",   label: "Repérer les lettres muettes sans les prononcer",      notionId: "fluence_lecture", prerequis: ["ce2_flue_mots_irreguliers"] },
  { id: "ce2_flue_phrase_expression", label: "Lire une phrase avec le ton et la ponctuation",       notionId: "fluence_lecture", prerequis: ["ce2_flue_mots_irreguliers"] },
  { id: "ce2_flue_liaisons",          label: "Faire les liaisons appropriées",                      notionId: "fluence_lecture", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_flue_texte_90",          label: "Lire un texte à 90 mots par minute",                  notionId: "fluence_lecture", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_flue_expressive",        label: "Lire de façon expressive en respectant la structure", notionId: "fluence_lecture", prerequis: ["ce2_flue_texte_90", "ce2_flue_liaisons"] },
  { id: "ce2_flue_defi",              label: "Défi fluence",                                        notionId: "fluence_lecture", prerequis: ["ce2_flue_expressive"] },

  // ── Compréhension de textes ───────────────────────────────────────────────
  { id: "ce2_comp_infos_explicites", label: "Relever des informations explicites",                  notionId: "comprehension_lecture", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_comp_anaphore",         label: "Retrouver à qui renvoie un pronom ou un autre nom",    notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_inferences",       label: "Faire une inférence simple",                           notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_connaissances",    label: "S'appuyer sur ce qu'on sait déjà pour comprendre",     notionId: "comprehension_lecture", prerequis: ["ce2_comp_inferences"] },
  { id: "ce2_comp_chronologie",      label: "Retrouver l'ordre des évènements",                     notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_retour_texte",     label: "Revenir au texte pour lever une ambigüité",            notionId: "comprehension_lecture", prerequis: ["ce2_comp_inferences"] },
  { id: "ce2_comp_titre",            label: "Donner un titre à un texte",                           notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_mise_en_page",     label: "Se servir des titres, sous-titres et paragraphes",     notionId: "comprehension_lecture", prerequis: ["ce2_comp_titre"] },
  { id: "ce2_comp_mot_inconnu",      label: "Élucider un mot inconnu par le contexte ou sa forme",  notionId: "comprehension_lecture", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_comp_resume",           label: "Résumer un texte court",                               notionId: "comprehension_lecture", prerequis: ["ce2_comp_inferences", "ce2_comp_chronologie"] },
  { id: "ce2_comp_defi",             label: "Défi compréhension",                                   notionId: "comprehension_lecture", prerequis: ["ce2_comp_resume", "ce2_comp_anaphore", "ce2_comp_connaissances"] },

  // ── Types de textes ───────────────────────────────────────────────────────
  { id: "ce2_type_narratif",    label: "Reconnaître un texte narratif",                     notionId: "types_textes", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_type_informatif",  label: "Reconnaître un texte informatif",                   notionId: "types_textes", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_type_prescriptif", label: "Reconnaître un texte prescriptif (recette, règle)", notionId: "types_textes", prerequis: ["ce2_type_informatif"] },
  { id: "ce2_type_poetique",    label: "Reconnaître un texte poétique",                     notionId: "types_textes", prerequis: ["ce2_type_narratif"] },
  { id: "ce2_type_theatral",    label: "Reconnaître un texte de théâtre",                   notionId: "types_textes", prerequis: ["ce2_type_narratif"] },
  { id: "ce2_type_defi",        label: "Défi types de textes",                              notionId: "types_textes", prerequis: ["ce2_type_prescriptif", "ce2_type_poetique", "ce2_type_theatral"] },

  // ── Devenir lecteur ───────────────────────────────────────────────────────
  // Quatrième objectif de Lecture du BO, absent jusqu'au 12/08/2026 :
  // « Lire de manière autonome 5 à 10 œuvres complètes et variées issues du
  //   patrimoine et de la littérature de jeunesse » ; « Relier ses lectures à
  //   son expérience personnelle, être en mesure d'établir des liens entre ses
  //   différentes lectures (mise en réseau) » ; « Fréquenter des lieux de
  //   lecture régulièrement et rencontrer des acteurs du livre ».
  // Les exemples de réussite ajoutent : des personnages-types « de plus en plus
  // diversifiés » ; « il différencie les caractéristiques des genres et types
  // les plus courants : poésie, théâtre, récit (policier, d'aventure, etc.) » ;
  // « il consigne ses expériences de lecture dans un carnet de lecteur ».
  //
  // ⚠️ La poésie et le théâtre sont déjà tenus par `types_textes` : on n'ajoute
  // ici que les GENRES DU RÉCIT, qui n'étaient nulle part.
  { id: "ce2_lect_autonomie",          label: "Lire seul une œuvre entière, du début à la fin",          notionId: "devenir_lecteur", prerequis: ["ce2_comp_chronologie"] },
  { id: "ce2_lect_genres_recit",       label: "Différencier les genres du récit : policier, aventure, fantastique, historique", notionId: "devenir_lecteur", prerequis: ["ce2_type_narratif"] },
  { id: "ce2_lect_personnages_types",  label: "Reconnaître des personnages-types de plus en plus variés", notionId: "devenir_lecteur", prerequis: ["ce2_lect_genres_recit"] },
  { id: "ce2_lect_reseau",             label: "Mettre deux lectures en réseau",                          notionId: "devenir_lecteur", prerequis: ["ce2_lect_personnages_types"] },
  { id: "ce2_lect_experience",         label: "Relier une lecture à sa propre expérience",               notionId: "devenir_lecteur", prerequis: ["ce2_lect_autonomie"] },
  { id: "ce2_lect_carnet",             label: "Tenir un carnet de lecteur",                              notionId: "devenir_lecteur", prerequis: ["ce2_lect_autonomie"] },
  { id: "ce2_lect_lieux_acteurs",      label: "Fréquenter les lieux de lecture et connaître les métiers du livre", notionId: "devenir_lecteur", prerequis: ["ce2_lect_autonomie"] },
  { id: "ce2_lect_defi",               label: "Défi devenir lecteur",                                    notionId: "devenir_lecteur", prerequis: ["ce2_lect_reseau", "ce2_lect_experience", "ce2_lect_carnet", "ce2_lect_lieux_acteurs"] },

  // ── Copie fluente ─────────────────────────────────────────────────────────
  { id: "ce2_copie_phrase",        label: "Copier une phrase sans erreur",                        notionId: "copie_fluente", prerequis: [] },
  { id: "ce2_copie_paragraphe",    label: "Copier un paragraphe court avec soin",                 notionId: "copie_fluente", prerequis: ["ce2_copie_phrase"] },
  { id: "ce2_copie_dix_lignes",    label: "Copier une dizaine de lignes sans erreur",             notionId: "copie_fluente", prerequis: ["ce2_copie_paragraphe"] },
  { id: "ce2_copie_mise_en_page",  label: "Respecter une mise en page complexe",                  notionId: "copie_fluente", prerequis: ["ce2_copie_dix_lignes"] },
  { id: "ce2_copie_relire",        label: "Relire et corriger sa copie",                          notionId: "copie_fluente", prerequis: ["ce2_copie_paragraphe"] },
  { id: "ce2_copie_omissions",     label: "Repérer une omission ou une erreur de ponctuation",    notionId: "copie_fluente", prerequis: ["ce2_copie_relire"] },

  // ── Écriture de mots et dictée ────────────────────────────────────────────
  // « Orthographier correctement les mots fréquents, réguliers et irréguliers
  //   et des phrases selon les accords étudiés dans le cadre de dictées. »
  { id: "ce2_dict_mots_reguliers",   label: "Écrire sous la dictée les mots fréquents réguliers",     notionId: "ecriture_mots", prerequis: ["ce2_copie_phrase"] },
  { id: "ce2_dict_mots_irreguliers", label: "Écrire sous la dictée les mots irréguliers",             notionId: "ecriture_mots", prerequis: ["ce2_dict_mots_reguliers"] },
  { id: "ce2_dict_graphies_son",     label: "Choisir la bonne graphie d'un son ([o], [e], [ɛ], [ɑ̃], [s])", notionId: "ecriture_mots", prerequis: ["ce2_dict_mots_reguliers"] },
  { id: "ce2_dict_chaines_accord",   label: "Orthographier les chaines d'accord dans la phrase",      notionId: "ecriture_mots", prerequis: ["ce2_dict_mots_reguliers"] },
  { id: "ce2_dict_phrase",           label: "Écrire une phrase entière sous la dictée",               notionId: "ecriture_mots", prerequis: ["ce2_dict_chaines_accord", "ce2_dict_graphies_son"] },
  { id: "ce2_dict_defi",             label: "Défi dictée",                                            notionId: "ecriture_mots", prerequis: ["ce2_dict_phrase", "ce2_dict_mots_irreguliers"] },

  // ── Production d'écrits ───────────────────────────────────────────────────
  { id: "ce2_prod_phrase_complexe", label: "Produire des phrases enrichies",                       notionId: "production_ecrite", prerequis: ["ce2_copie_phrase"] },
  { id: "ce2_prod_destinataire",    label: "Écrire un message pour quelqu'un de précis",           notionId: "production_ecrite", prerequis: ["ce2_prod_phrase_complexe"] },
  { id: "ce2_prod_paragraphe",      label: "Écrire un court paragraphe cohérent",                  notionId: "production_ecrite", prerequis: ["ce2_prod_phrase_complexe"] },
  { id: "ce2_prod_connecteurs",     label: "Utiliser des connecteurs temporels et logiques",       notionId: "production_ecrite", prerequis: ["ce2_prod_paragraphe"] },
  { id: "ce2_prod_organiser",       label: "Organiser ses idées dans l'ordre",                     notionId: "production_ecrite", prerequis: ["ce2_prod_paragraphe"] },
  { id: "ce2_prod_dialogue",        label: "Écrire un dialogue avec ses guillemets et ses tirets", notionId: "production_ecrite", prerequis: ["ce2_prod_organiser"] },
  { id: "ce2_prod_recit",           label: "Écrire un récit d'une dizaine de lignes",              notionId: "production_ecrite", prerequis: ["ce2_prod_connecteurs", "ce2_prod_organiser"] },
  { id: "ce2_prod_poeme",           label: "Écrire un poème court",                                notionId: "production_ecrite", prerequis: ["ce2_prod_organiser"] },
  { id: "ce2_prod_lexique_precis",  label: "Réemployer un lexique précis dans son texte",          notionId: "production_ecrite", prerequis: ["ce2_prod_paragraphe"] },
  { id: "ce2_prod_reviser",         label: "Relire et améliorer son texte",                        notionId: "production_ecrite", prerequis: ["ce2_prod_recit"] },
  { id: "ce2_prod_defi",            label: "Défi production d'écrits",                             notionId: "production_ecrite", prerequis: ["ce2_prod_reviser", "ce2_prod_dialogue"] },

  // ── Grammaire – la phrase ─────────────────────────────────────────────────
  { id: "ce2_gram_phrase_types",     label: "Identifier les types de phrases",                            notionId: "grammaire_phrase", prerequis: ["ce2_flue_phrase_expression"] },
  { id: "ce2_gram_produire_types",   label: "Produire une phrase déclarative, interrogative, impérative", notionId: "grammaire_phrase", prerequis: ["ce2_gram_phrase_types"] },
  { id: "ce2_gram_sujet_verbe",      label: "Identifier le sujet et le verbe",                            notionId: "grammaire_phrase", prerequis: ["ce2_gram_phrase_types"] },
  { id: "ce2_gram_complements",      label: "Identifier des compléments dans la phrase",                  notionId: "grammaire_phrase", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_gram_phrase_negative",  label: "Transformer une phrase affirmative en phrase négative",      notionId: "grammaire_phrase", prerequis: ["ce2_gram_phrase_types"] },
  { id: "ce2_gram_forme_exclamative",label: "Reconnaître et produire la forme exclamative",               notionId: "grammaire_phrase", prerequis: ["ce2_gram_phrase_types"] },
  { id: "ce2_gram_substituer_pronom",label: "Remplacer un groupe sujet par un pronom, et l'inverse",      notionId: "grammaire_phrase", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_gram_ponctuation_fin",  label: "Choisir le point, le point d'interrogation ou d'exclamation", notionId: "grammaire_phrase", prerequis: ["ce2_gram_produire_types"] },
  { id: "ce2_gram_discours_rapporte",label: "Repérer les marques du discours rapporté (« … »)",           notionId: "grammaire_phrase", prerequis: ["ce2_gram_ponctuation_fin"] },
  { id: "ce2_gram_defi",             label: "Défi grammaire de la phrase",                                notionId: "grammaire_phrase", prerequis: ["ce2_gram_complements", "ce2_gram_phrase_negative", "ce2_gram_discours_rapporte"] },

  // ── Classes de mots ───────────────────────────────────────────────────────
  { id: "ce2_cm_nom",           label: "Distinguer nom propre et nom commun",                notionId: "classes_mots", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_cm_determinant",   label: "Identifier les déterminants",                        notionId: "classes_mots", prerequis: ["ce2_cm_nom"] },
  { id: "ce2_cm_adjectif",      label: "Identifier et utiliser un adjectif",                 notionId: "classes_mots", prerequis: ["ce2_cm_nom"] },
  { id: "ce2_cm_verbe",         label: "Identifier le verbe et son infinitif",               notionId: "classes_mots", prerequis: ["ce2_gram_sujet_verbe"] },
  { id: "ce2_cm_pronom",        label: "Identifier les pronoms personnels sujets",           notionId: "classes_mots", prerequis: ["ce2_cm_verbe"] },
  { id: "ce2_cm_adverbe",       label: "Identifier un adverbe",                              notionId: "classes_mots", prerequis: ["ce2_cm_adjectif", "ce2_cm_verbe"] },
  { id: "ce2_cm_adverbes_ment", label: "Écrire les adverbes en -ment",                       notionId: "classes_mots", prerequis: ["ce2_cm_adverbe"] },
  { id: "ce2_cm_adverbes_frequents", label: "Écrire très, si, bien, assez, aujourd'hui, demain", notionId: "classes_mots", prerequis: ["ce2_cm_adverbe"] },
  { id: "ce2_cm_variables",     label: "Distinguer les mots variables des mots invariables", notionId: "classes_mots", prerequis: ["ce2_cm_adverbe"] },
  { id: "ce2_cm_defi",          label: "Défi classes de mots",                               notionId: "classes_mots", prerequis: ["ce2_cm_determinant", "ce2_cm_pronom", "ce2_cm_adverbes_ment", "ce2_cm_variables"] },

  // ── Orthographe grammaticale ──────────────────────────────────────────────
  { id: "ce2_orth_accord_gn",         label: "Accorder le groupe nominal",                                 notionId: "orthographe", prerequis: ["ce2_cm_adjectif", "ce2_cm_determinant"] },
  { id: "ce2_orth_pluriel",           label: "Former le pluriel des noms et adjectifs",                    notionId: "orthographe", prerequis: ["ce2_orth_accord_gn"] },
  { id: "ce2_orth_pluriel_irregulier",label: "Former les pluriels irréguliers (-x, -al → -aux)",           notionId: "orthographe", prerequis: ["ce2_orth_pluriel"] },
  { id: "ce2_orth_feminin_entendu",   label: "Écrire le féminin qui s'entend (lecteur/lectrice, joyeux/joyeuse)", notionId: "orthographe", prerequis: ["ce2_orth_accord_gn"] },
  { id: "ce2_orth_chaine_phrase",     label: "Tenir la chaine d'accord dans toute la phrase",              notionId: "orthographe", prerequis: ["ce2_orth_pluriel", "ce2_orth_feminin_entendu"] },
  { id: "ce2_orth_sujet_verbe",       label: "Accorder le verbe avec son sujet",                           notionId: "orthographe", prerequis: ["ce2_gram_sujet_verbe", "ce2_cm_verbe"] },
  { id: "ce2_orth_homophones",        label: "Distinguer les homophones courants",                         notionId: "orthographe", prerequis: ["ce2_orth_sujet_verbe"] },
  { id: "ce2_orth_mots_invariables",  label: "Écrire des mots invariables fréquents",                      notionId: "orthographe", prerequis: ["ce2_copie_relire"] },
  { id: "ce2_orth_defi",              label: "Défi orthographe",                                           notionId: "orthographe", prerequis: ["ce2_orth_pluriel_irregulier", "ce2_orth_chaine_phrase", "ce2_orth_homophones", "ce2_orth_mots_invariables"] },

  // ── Orthographe lexicale ──────────────────────────────────────────────────
  { id: "ce2_orthlex_accents",       label: "Tenir compte des accents",                                notionId: "orthographe_lexicale", prerequis: ["ce2_dict_mots_reguliers"] },
  { id: "ce2_orthlex_radical",       label: "S'appuyer sur le radical pour écrire un mot (beau → beauté)", notionId: "orthographe_lexicale", prerequis: ["ce2_dict_mots_reguliers"] },
  { id: "ce2_orthlex_affixes",       label: "S'appuyer sur le préfixe et le suffixe",                   notionId: "orthographe_lexicale", prerequis: ["ce2_orthlex_radical"] },
  { id: "ce2_orthlex_analogie",      label: "Écrire un mot par analogie avec un mot connu",            notionId: "orthographe_lexicale", prerequis: ["ce2_orthlex_radical"] },
  { id: "ce2_orthlex_lettre_muette", label: "Trouver la lettre finale muette par la famille",          notionId: "orthographe_lexicale", prerequis: ["ce2_orthlex_radical"] },
  { id: "ce2_orthlex_defi",          label: "Défi orthographe lexicale",                               notionId: "orthographe_lexicale", prerequis: ["ce2_orthlex_affixes", "ce2_orthlex_analogie", "ce2_orthlex_lettre_muette"] },

  // ── Conjugaison ───────────────────────────────────────────────────────────
  // « … être et avoir, les verbes du premier groupe et les verbes irréguliers
  //   du 3e groupe (faire, aller, dire, venir, pouvoir, voir, vouloir,
  //   prendre) », au présent, à l'imparfait, au futur ET au passé composé.
  { id: "ce2_conj_infinitif",           label: "Trouver l'infinitif d'un verbe",                        notionId: "conjugaison", prerequis: ["ce2_cm_verbe"] },
  { id: "ce2_conj_radical_terminaison", label: "Séparer le radical et la terminaison",                  notionId: "conjugaison", prerequis: ["ce2_conj_infinitif"] },
  { id: "ce2_conj_present_etre_avoir",  label: "Conjuguer être et avoir au présent",                    notionId: "conjugaison", prerequis: ["ce2_conj_infinitif"] },
  { id: "ce2_conj_present_er",          label: "Conjuguer les verbes en -er au présent",                notionId: "conjugaison", prerequis: ["ce2_conj_present_etre_avoir"] },
  { id: "ce2_conj_present_irreguliers", label: "Conjuguer au présent faire, aller, dire, venir, pouvoir, voir, vouloir, prendre", notionId: "conjugaison", prerequis: ["ce2_conj_present_er"] },
  { id: "ce2_conj_imparfait",           label: "Identifier et former l'imparfait",                      notionId: "conjugaison", prerequis: ["ce2_conj_present_er"] },
  { id: "ce2_conj_imparfait_irreguliers", label: "Conjuguer les huit verbes irréguliers à l'imparfait", notionId: "conjugaison", prerequis: ["ce2_conj_imparfait", "ce2_conj_present_irreguliers"] },
  { id: "ce2_conj_futur",               label: "Identifier et former le futur",                         notionId: "conjugaison", prerequis: ["ce2_conj_present_er"] },
  { id: "ce2_conj_futur_irreguliers",   label: "Conjuguer les huit verbes irréguliers au futur",        notionId: "conjugaison", prerequis: ["ce2_conj_futur", "ce2_conj_present_irreguliers"] },
  { id: "ce2_conj_passe_compose",       label: "Former le passé composé avec être et avoir",            notionId: "conjugaison", prerequis: ["ce2_conj_imparfait", "ce2_conj_futur"] },
  { id: "ce2_conj_participe_infinitif", label: "Ne pas confondre le participe passé et l'infinitif (mangé / manger)", notionId: "conjugaison", prerequis: ["ce2_conj_passe_compose"] },
  { id: "ce2_conj_defi",                label: "Défi conjugaison",                                      notionId: "conjugaison", prerequis: ["ce2_conj_passe_compose", "ce2_conj_futur_irreguliers", "ce2_conj_imparfait_irreguliers", "ce2_conj_participe_infinitif"] },

  // ── Vocabulaire ───────────────────────────────────────────────────────────
  { id: "ce2_voc_contexte",           label: "Comprendre un mot grâce au contexte",                   notionId: "vocabulaire", prerequis: ["ce2_comp_infos_explicites"] },
  { id: "ce2_voc_famille",            label: "Former et reconnaître des familles de mots",            notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_prefixe_suffixe",    label: "Comprendre le rôle des préfixes et des suffixes",       notionId: "vocabulaire", prerequis: ["ce2_voc_famille"] },
  { id: "ce2_voc_prefixes_negatifs",  label: "Reconnaître un sens négatif (dé-, mal-, in-, im-)",     notionId: "vocabulaire", prerequis: ["ce2_voc_prefixe_suffixe"] },
  { id: "ce2_voc_derivation",         label: "Dériver un mot (port / portuaire / aéroport)",          notionId: "vocabulaire", prerequis: ["ce2_voc_prefixe_suffixe"] },
  { id: "ce2_voc_synonyme_antonyme",  label: "Utiliser synonymes et antonymes",                       notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_gradation",          label: "Classer par intensité (la crainte, la peur, l'épouvante)", notionId: "vocabulaire", prerequis: ["ce2_voc_synonyme_antonyme"] },
  { id: "ce2_voc_generique",          label: "Hiérarchiser du général au particulier",                notionId: "vocabulaire", prerequis: ["ce2_voc_synonyme_antonyme"] },
  { id: "ce2_voc_polysemie",          label: "Identifier le sens d'un mot selon le contexte",         notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_sens_propre_figure", label: "Distinguer le sens propre du sens figuré",              notionId: "vocabulaire", prerequis: ["ce2_voc_polysemie"] },
  { id: "ce2_voc_expressions",        label: "Comprendre une expression ou une locution",             notionId: "vocabulaire", prerequis: ["ce2_voc_sens_propre_figure"] },
  { id: "ce2_voc_niveaux_langue",     label: "Changer de niveau de langue selon la situation",        notionId: "vocabulaire", prerequis: ["ce2_voc_synonyme_antonyme"] },
  { id: "ce2_voc_dictionnaire",       label: "Vérifier le sens d'un mot dans le dictionnaire",        notionId: "vocabulaire", prerequis: ["ce2_voc_contexte"] },
  { id: "ce2_voc_repertoire",         label: "Se constituer un répertoire lexical personnel",         notionId: "vocabulaire", prerequis: ["ce2_voc_generique"] },
  { id: "ce2_voc_defi",               label: "Défi vocabulaire",                                      notionId: "vocabulaire", prerequis: ["ce2_voc_derivation", "ce2_voc_gradation", "ce2_voc_sens_propre_figure", "ce2_voc_niveaux_langue"] },
];
