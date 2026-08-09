// Micro-compétences de français pour la classe de CE1.
// Référence : programme officiel du cycle 2,
// BO n° 41 du 31 octobre 2024, applicable à la rentrée 2025.
//
// Relu le 09/08/2026 contre le TEXTE INTÉGRAL (Annexe 3), colonnes
// « Objectifs d'apprentissage » ET « Exemples de réussite ». 57 → 118.
//
// ⛔ Le manque le plus grave : L'IMPARFAIT ET LE FUTUR. Le BO du CE1 écrit
// « Apprendre à conjuguer au présent, à l'imparfait, au futur puis au passé
// composé de l'indicatif être et avoir et les verbes du premier groupe ». Le
// coach ne connaissait que le présent et le passé composé, et rangeait les
// deux autres temps au CE2. Ce n'était pas un choix, c'était un écart.
//
// Manquaient aussi : le pronom personnel sujet, le radical et la terminaison,
// retrouver l'infinitif d'une forme conjuguée, les transformations de phrase
// (substitution, déplacement, suppression), les formes négative et
// exclamative, la reconnaissance des lettres dans les quatre écritures, toute
// l'orthographe lexicale, les niveaux de langue, les termes génériques et
// spécifiques, les préfixes et suffixes, le sens propre et figuré, la chaîne
// anaphorique.
//
// ⚠️ Aucun identifiant existant n'a été renommé ni supprimé : ils portent
// l'historique des élèves et le graphe de prérequis. On ajoute et on accentue.
//
// 📅 Jalons du BO : copier quatre à cinq phrases courtes à l'issue de la
// période 1, cinq ou six lignes à partir de la période 3, une dizaine en fin
// d'année ; majuscules cursives à partir de la période 2 ; 70 mots par minute
// en fin d'année ; texte de six ou sept phrases en fin d'année.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [

  // ── Langage oral ──────────────────────────────────────────────────────────
  { id: "ce1_oral_ecouter",           label: "Écouter et comprendre un texte lu ou un exposé",       notionId: "langage_oral", prerequis: [] },
  { id: "ce1_oral_classer_infos",     label: "Classer et ordonner les informations entendues",       notionId: "langage_oral", prerequis: ["ce1_oral_ecouter"] },
  { id: "ce1_oral_reformuler",        label: "Reformuler un texte entendu avec ses propres mots",    notionId: "langage_oral", prerequis: ["ce1_oral_ecouter"] },
  { id: "ce1_oral_raconter",          label: "Raconter une histoire ou un évènement",                notionId: "langage_oral", prerequis: ["ce1_oral_reformuler"] },
  { id: "ce1_oral_connecteurs",       label: "Organiser son propos (d'abord, ensuite, donc, enfin)", notionId: "langage_oral", prerequis: ["ce1_oral_raconter"] },
  { id: "ce1_oral_expliquer",         label: "Expliquer son point de vue",                           notionId: "langage_oral", prerequis: ["ce1_oral_raconter"] },
  { id: "ce1_oral_accord_desaccord",  label: "Exprimer et justifier un accord ou un désaccord",      notionId: "langage_oral", prerequis: ["ce1_oral_expliquer"] },
  { id: "ce1_oral_registre",          label: "Adapter son niveau de langue à la situation",          notionId: "langage_oral", prerequis: ["ce1_oral_expliquer"] },
  { id: "ce1_oral_defi",              label: "Défi langage oral",                                    notionId: "langage_oral", prerequis: ["ce1_oral_registre", "ce1_oral_accord_desaccord"] },

  // ── Fluence et lecture courante ───────────────────────────────────────────
  { id: "ce1_flue_mots_connus",     label: "Lire des mots connus sans déchiffrer",             notionId: "fluence_lecture", prerequis: [] },
  { id: "ce1_flue_cgp_complexes",   label: "Déchiffrer toutes les correspondances, même complexes", notionId: "fluence_lecture", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_flue_mots_nouveaux",   label: "Déchiffrer avec exactitude un mot nouveau",        notionId: "fluence_lecture", prerequis: ["ce1_flue_cgp_complexes"] },
  { id: "ce1_flue_phrase",          label: "Lire une phrase en respectant la ponctuation",     notionId: "fluence_lecture", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_flue_groupes_souffle", label: "Lire par groupes de souffle",                      notionId: "fluence_lecture", prerequis: ["ce1_flue_phrase"] },
  { id: "ce1_flue_texte_court",     label: "Lire un texte court à voix haute avec aisance",    notionId: "fluence_lecture", prerequis: ["ce1_flue_groupes_souffle"] },
  { id: "ce1_flue_expressive",      label: "Lire de manière expressive",                       notionId: "fluence_lecture", prerequis: ["ce1_flue_texte_court"] },
  { id: "ce1_flue_70_mots",         label: "Lire 70 mots par minute",                          notionId: "fluence_lecture", prerequis: ["ce1_flue_texte_court"] },
  { id: "ce1_flue_defi",            label: "Défi fluence",                                     notionId: "fluence_lecture", prerequis: ["ce1_flue_70_mots", "ce1_flue_expressive"] },

  // ── Sons complexes ────────────────────────────────────────────────────────
  { id: "ce1_sons_gn_ill",          label: "Lire les sons gn, ill, ail, eil, ouil…",           notionId: "sons_complexes", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_sons_e_accent",        label: "Distinguer e, é, è et ê",                          notionId: "sons_complexes", prerequis: ["ce1_flue_mots_connus"] },
  { id: "ce1_sons_double_cons",     label: "Lire les consonnes doubles (ll, tt, ss…)",         notionId: "sons_complexes", prerequis: ["ce1_sons_e_accent"] },
  { id: "ce1_sons_proches",         label: "Distinguer les sons proches (f/v, b/p, ch/j, s/z)", notionId: "sons_complexes", prerequis: ["ce1_sons_double_cons"] },
  { id: "ce1_sons_lettres_muettes", label: "Lire sans prononcer les lettres muettes",          notionId: "sons_complexes", prerequis: ["ce1_sons_double_cons"] },
  { id: "ce1_sons_defi",            label: "Défi sons complexes",                              notionId: "sons_complexes", prerequis: ["ce1_sons_gn_ill", "ce1_sons_proches", "ce1_sons_lettres_muettes"] },

  // ── Écriture cursive ──────────────────────────────────────────────────────
  // Le tracé se juge sur le cahier, pas sur un écran. Ce qui est vérifiable
  // ici, c'est ce que le BO nomme : « Il reconnait les lettres dans les quatre
  // écritures » et « Il transcrit l'écriture scripte en écriture cursive ».
  { id: "ce1_cursive_quatre_ecritures", label: "Reconnaître une lettre dans les quatre écritures", notionId: "ecriture_cursive", prerequis: [] },
  { id: "ce1_cursive_scripte_cursive",  label: "Passer de la scripte à la cursive",               notionId: "ecriture_cursive", prerequis: ["ce1_cursive_quatre_ecritures"] },
  { id: "ce1_cursive_majuscules",       label: "Reconnaître les majuscules cursives",             notionId: "ecriture_cursive", prerequis: ["ce1_cursive_quatre_ecritures"] },

  // ── Compréhension de textes ───────────────────────────────────────────────
  { id: "ce1_comp_personnages",  label: "Identifier les personnages et leurs relations",   notionId: "comprehension_lecture", prerequis: ["ce1_flue_phrase"] },
  { id: "ce1_comp_anaphore",     label: "Retrouver à qui renvoie « il », « elle », « le »", notionId: "comprehension_lecture", prerequis: ["ce1_comp_personnages"] },
  { id: "ce1_comp_chronologie",  label: "Remettre des évènements dans l'ordre",            notionId: "comprehension_lecture", prerequis: ["ce1_comp_personnages"] },
  { id: "ce1_comp_implicite",    label: "Comprendre ce qui est implicite",                 notionId: "comprehension_lecture", prerequis: ["ce1_comp_chronologie"] },
  { id: "ce1_comp_question",     label: "Répondre à des questions sur un texte",           notionId: "comprehension_lecture", prerequis: ["ce1_comp_personnages"] },
  { id: "ce1_comp_justifier",    label: "Justifier sa réponse par un retour au texte",     notionId: "comprehension_lecture", prerequis: ["ce1_comp_question"] },
  { id: "ce1_comp_mot_inconnu",  label: "Élucider le sens d'un mot inconnu dans un texte", notionId: "comprehension_lecture", prerequis: ["ce1_comp_question"] },
  { id: "ce1_comp_titre",        label: "Donner un titre à un texte",                      notionId: "comprehension_lecture", prerequis: ["ce1_comp_question"] },
  { id: "ce1_comp_resumer",      label: "Résumer un texte court",                          notionId: "comprehension_lecture", prerequis: ["ce1_comp_implicite"] },
  { id: "ce1_comp_defi",         label: "Défi compréhension",                              notionId: "comprehension_lecture", prerequis: ["ce1_comp_resumer", "ce1_comp_anaphore"] },

  // ── Types de textes ───────────────────────────────────────────────────────
  { id: "ce1_type_narratif",     label: "Reconnaître un texte narratif",                   notionId: "types_textes", prerequis: ["ce1_comp_question"] },
  { id: "ce1_type_documentaire", label: "Reconnaître un texte documentaire",               notionId: "types_textes", prerequis: ["ce1_comp_question"] },
  { id: "ce1_type_prescriptif",  label: "Reconnaître un texte qui donne des consignes",    notionId: "types_textes", prerequis: ["ce1_comp_question"] },
  { id: "ce1_type_poetique",     label: "Reconnaître un texte poétique (rime, vers)",      notionId: "types_textes", prerequis: ["ce1_type_narratif"] },
  { id: "ce1_type_defi",         label: "Défi types de textes",                            notionId: "types_textes", prerequis: ["ce1_type_poetique", "ce1_type_prescriptif", "ce1_type_documentaire"] },

  // ── Copie fluente ─────────────────────────────────────────────────────────
  { id: "ce1_copie_mot",          label: "Copier un mot sans erreur",                          notionId: "copie_fluente", prerequis: [] },
  { id: "ce1_copie_phrase",       label: "Copier une phrase avec majuscule et ponctuation",    notionId: "copie_fluente", prerequis: ["ce1_copie_mot"] },
  { id: "ce1_copie_strategies",   label: "Choisir sa stratégie de copie (lettre, syllabe, mot, groupe)", notionId: "copie_fluente", prerequis: ["ce1_copie_phrase"] },
  { id: "ce1_copie_paragraphe",   label: "Copier un paragraphe court",                         notionId: "copie_fluente", prerequis: ["ce1_copie_phrase"] },
  { id: "ce1_copie_relire",       label: "Se relire et corriger l'orthographe après la copie", notionId: "copie_fluente", prerequis: ["ce1_copie_paragraphe"] },
  { id: "ce1_copie_mise_en_page", label: "Recopier une dizaine de lignes avec sa mise en page", notionId: "copie_fluente", prerequis: ["ce1_copie_relire"] },

  // ── Écriture de mots et dictée ────────────────────────────────────────────
  { id: "ce1_dict_mot_courant",      label: "Écrire les mots courants de la liste de référence", notionId: "ecriture_mots", prerequis: ["ce1_copie_mot"] },
  { id: "ce1_dict_mots_irreguliers", label: "Écrire les mots fréquents irréguliers",             notionId: "ecriture_mots", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_dict_phrase",           label: "Écrire une phrase correctement sous la dictée",     notionId: "ecriture_mots", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_dict_accord_gn",        label: "Accorder le groupe nominal sous la dictée",         notionId: "ecriture_mots", prerequis: ["ce1_dict_phrase"] },
  { id: "ce1_dict_pluriel_verbe",    label: "Écrire le « -nt » du pluriel des verbes",           notionId: "ecriture_mots", prerequis: ["ce1_dict_phrase"] },
  { id: "ce1_dict_texte_court",      label: "Écrire un texte très court sous la dictée",         notionId: "ecriture_mots", prerequis: ["ce1_dict_accord_gn", "ce1_dict_pluriel_verbe"] },
  { id: "ce1_dict_defi",             label: "Défi dictée",                                       notionId: "ecriture_mots", prerequis: ["ce1_dict_texte_court"] },

  // ── Production d'écrits ───────────────────────────────────────────────────
  { id: "ce1_prod_transformer",         label: "Transformer une phrase modèle en changeant plusieurs mots", notionId: "production_ecrite", prerequis: ["ce1_dict_phrase"] },
  { id: "ce1_prod_phrase",              label: "Produire une ou deux phrases sur un sujet donné", notionId: "production_ecrite", prerequis: ["ce1_dict_phrase"] },
  { id: "ce1_prod_brouillon",           label: "Utiliser un brouillon : liste, piste, carte mentale", notionId: "production_ecrite", prerequis: ["ce1_prod_phrase"] },
  { id: "ce1_prod_suite",               label: "Écrire la suite d'une histoire",                  notionId: "production_ecrite", prerequis: ["ce1_prod_phrase"] },
  { id: "ce1_prod_description",         label: "Décrire un personnage ou un lieu",                notionId: "production_ecrite", prerequis: ["ce1_prod_phrase"] },
  { id: "ce1_prod_connecteurs",         label: "Relier ses phrases avec des connecteurs",         notionId: "production_ecrite", prerequis: ["ce1_prod_suite"] },
  { id: "ce1_prod_texte_sept_phrases",  label: "Écrire un texte de six ou sept phrases cohérent", notionId: "production_ecrite", prerequis: ["ce1_prod_connecteurs"] },
  { id: "ce1_prod_reviser",             label: "Relire son texte et corriger ce qui ne va pas",   notionId: "production_ecrite", prerequis: ["ce1_prod_texte_sept_phrases"] },
  { id: "ce1_prod_defi",                label: "Défi production d'écrits",                        notionId: "production_ecrite", prerequis: ["ce1_prod_reviser", "ce1_prod_description"] },

  // ── Grammaire – la phrase ─────────────────────────────────────────────────
  { id: "ce1_gram_phrase_types",     label: "Reconnaître la phrase déclarative, interrogative, impérative", notionId: "grammaire_phrase", prerequis: ["ce1_flue_phrase"] },
  { id: "ce1_gram_forme_negative",   label: "Reconnaître la forme négative et transformer une phrase",      notionId: "grammaire_phrase", prerequis: ["ce1_gram_phrase_types"] },
  { id: "ce1_gram_forme_exclamative",label: "Reconnaître la forme exclamative",                             notionId: "grammaire_phrase", prerequis: ["ce1_gram_phrase_types"] },
  { id: "ce1_gram_groupe_sujet",     label: "Nommer le groupe sujet",                                       notionId: "grammaire_phrase", prerequis: ["ce1_gram_phrase_types"] },
  { id: "ce1_gram_sujet_verbe",      label: "Identifier le sujet et le verbe",                              notionId: "grammaire_phrase", prerequis: ["ce1_gram_groupe_sujet"] },
  { id: "ce1_gram_complement",       label: "Identifier un complément dans la phrase",                      notionId: "grammaire_phrase", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_gram_substitution",     label: "Remplacer un groupe par un autre (substitution)",              notionId: "grammaire_phrase", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_gram_deplacement",      label: "Déplacer un groupe dans la phrase",                            notionId: "grammaire_phrase", prerequis: ["ce1_gram_complement"] },
  { id: "ce1_gram_suppression",      label: "Supprimer un groupe qu'on peut enlever",                       notionId: "grammaire_phrase", prerequis: ["ce1_gram_complement"] },
  { id: "ce1_gram_defi",             label: "Défi grammaire de la phrase",                                  notionId: "grammaire_phrase", prerequis: ["ce1_gram_substitution", "ce1_gram_deplacement", "ce1_gram_suppression", "ce1_gram_forme_negative"] },

  // ── Classes de mots ───────────────────────────────────────────────────────
  { id: "ce1_cm_nom_propre_commun", label: "Distinguer nom propre et nom commun",                 notionId: "classes_mots", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_cm_adjectif",          label: "Identifier et utiliser un adjectif qualificatif",     notionId: "classes_mots", prerequis: ["ce1_cm_nom_propre_commun"] },
  { id: "ce1_cm_determinant",       label: "Reconnaître les déterminants (articles, possessifs)", notionId: "classes_mots", prerequis: ["ce1_cm_nom_propre_commun"] },
  { id: "ce1_cm_verbe",             label: "Reconnaître le verbe dans une phrase",                notionId: "classes_mots", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_cm_pronom_sujet",      label: "Reconnaître un pronom personnel sujet",               notionId: "classes_mots", prerequis: ["ce1_cm_verbe"] },
  { id: "ce1_cm_trier_corpus",      label: "Classer des mots par classe grammaticale",            notionId: "classes_mots", prerequis: ["ce1_cm_adjectif", "ce1_cm_determinant"] },
  { id: "ce1_cm_defi",              label: "Défi classes de mots",                                notionId: "classes_mots", prerequis: ["ce1_cm_trier_corpus", "ce1_cm_pronom_sujet"] },

  // ── Orthographe grammaticale ──────────────────────────────────────────────
  { id: "ce1_orth_accord_gn",        label: "Accorder le groupe nominal (déterminant + nom + adjectif)", notionId: "orthographe", prerequis: ["ce1_cm_adjectif"] },
  { id: "ce1_orth_marque_feminin",   label: "Écrire le « e » du féminin",                                notionId: "orthographe", prerequis: ["ce1_orth_accord_gn"] },
  { id: "ce1_orth_pluriel",          label: "Former le pluriel des noms et des adjectifs",               notionId: "orthographe", prerequis: ["ce1_orth_accord_gn"] },
  { id: "ce1_orth_adjectif_eloigne", label: "Accorder un adjectif éloigné de son nom",                   notionId: "orthographe", prerequis: ["ce1_orth_pluriel"] },
  { id: "ce1_orth_accord_suj_v",     label: "Accorder le sujet et le verbe",                             notionId: "orthographe", prerequis: ["ce1_gram_sujet_verbe"] },
  { id: "ce1_orth_pluriel_verbe",    label: "Écrire le « -nt » du pluriel des verbes — il ne s'entend pas", notionId: "orthographe", prerequis: ["ce1_orth_accord_suj_v"] },
  { id: "ce1_orth_homophone",        label: "Distinguer a/à, ou/où, et/est, son/sont",                   notionId: "orthographe", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_orth_defi",             label: "Défi orthographe",                                          notionId: "orthographe", prerequis: ["ce1_orth_adjectif_eloigne", "ce1_orth_pluriel_verbe", "ce1_orth_homophone"] },

  // ── Orthographe lexicale ──────────────────────────────────────────────────
  { id: "ce1_orthlex_accents",           label: "Tenir compte des accents",                                  notionId: "orthographe_lexicale", prerequis: ["ce1_sons_e_accent"] },
  { id: "ce1_orthlex_s_entre_voyelles",  label: "Écrire s ou ss selon le son (poison / poisson)",            notionId: "orthographe_lexicale", prerequis: ["ce1_sons_double_cons"] },
  { id: "ce1_orthlex_c_g_variable",      label: "Écrire le c et le g selon la lettre qui suit",              notionId: "orthographe_lexicale", prerequis: ["ce1_orthlex_s_entre_voyelles"] },
  { id: "ce1_orthlex_lettre_muette",     label: "Anticiper la lettre finale muette (blanc / blanche)",       notionId: "orthographe_lexicale", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_orthlex_mots_invariables",  label: "Mémoriser les mots invariables (tôt, aussitôt, plutôt)",    notionId: "orthographe_lexicale", prerequis: ["ce1_dict_mot_courant"] },
  { id: "ce1_orthlex_defi",              label: "Défi orthographe lexicale",                                 notionId: "orthographe_lexicale", prerequis: ["ce1_orthlex_c_g_variable", "ce1_orthlex_lettre_muette", "ce1_orthlex_mots_invariables"] },

  // ── Conjugaison ───────────────────────────────────────────────────────────
  // « Apprendre à conjuguer au présent, à l'imparfait, au futur puis au passé
  //   composé de l'indicatif être et avoir et les verbes du premier groupe. »
  { id: "ce1_conj_infinitif",             label: "Reconnaître l'infinitif d'un verbe",                    notionId: "conjugaison", prerequis: ["ce1_cm_verbe"] },
  { id: "ce1_conj_radical_terminaison",   label: "Séparer le radical et la terminaison",                  notionId: "conjugaison", prerequis: ["ce1_conj_infinitif"] },
  { id: "ce1_conj_present_etre_avoir",    label: "Conjuguer être et avoir au présent",                    notionId: "conjugaison", prerequis: ["ce1_conj_infinitif"] },
  { id: "ce1_conj_present_er",            label: "Conjuguer les verbes en -er au présent",                notionId: "conjugaison", prerequis: ["ce1_conj_present_etre_avoir"] },
  { id: "ce1_conj_imparfait",             label: "Conjuguer à l'imparfait être, avoir et les verbes en -er", notionId: "conjugaison", prerequis: ["ce1_conj_present_er"] },
  { id: "ce1_conj_futur",                 label: "Conjuguer au futur être, avoir et les verbes en -er",   notionId: "conjugaison", prerequis: ["ce1_conj_present_er"] },
  { id: "ce1_conj_passe_compose",         label: "Former le passé composé avec avoir",                    notionId: "conjugaison", prerequis: ["ce1_conj_imparfait", "ce1_conj_futur"] },
  { id: "ce1_conj_personne",              label: "Changer la personne et voir ce que devient le verbe",   notionId: "conjugaison", prerequis: ["ce1_conj_present_er"] },
  { id: "ce1_conj_retrouver_infinitif",   label: "Retrouver l'infinitif d'un verbe conjugué (ils plieront → plier)", notionId: "conjugaison", prerequis: ["ce1_conj_radical_terminaison", "ce1_conj_futur"] },
  { id: "ce1_conj_defi",                  label: "Défi conjugaison",                                      notionId: "conjugaison", prerequis: ["ce1_conj_passe_compose", "ce1_conj_retrouver_infinitif"] },

  // ── Vocabulaire ───────────────────────────────────────────────────────────
  { id: "ce1_voc_contexte",              label: "Deviner le sens d'un mot inconnu par le contexte",     notionId: "vocabulaire", prerequis: ["ce1_comp_question"] },
  { id: "ce1_voc_famille",               label: "Reconnaître et former des mots de la même famille",    notionId: "vocabulaire", prerequis: ["ce1_voc_contexte"] },
  { id: "ce1_voc_prefixe",               label: "Reconnaître un préfixe (para-, multi-, anti-, in-, dé-)", notionId: "vocabulaire", prerequis: ["ce1_voc_famille"] },
  { id: "ce1_voc_suffixe",               label: "Reconnaître un suffixe (-eur, -euse, -er)",            notionId: "vocabulaire", prerequis: ["ce1_voc_famille"] },
  { id: "ce1_voc_synonyme",              label: "Trouver un synonyme",                                  notionId: "vocabulaire", prerequis: ["ce1_voc_famille"] },
  { id: "ce1_voc_antonyme",              label: "Trouver un antonyme (contraire)",                      notionId: "vocabulaire", prerequis: ["ce1_voc_synonyme"] },
  { id: "ce1_voc_generique_specifique",  label: "Aller du général au particulier (aliment > laitage > fromage)", notionId: "vocabulaire", prerequis: ["ce1_voc_synonyme"] },
  { id: "ce1_voc_niveaux_langue",        label: "Distinguer le familier, le courant et le soutenu",     notionId: "vocabulaire", prerequis: ["ce1_voc_synonyme"] },
  { id: "ce1_voc_polysemie",             label: "Identifier le sens d'un mot selon le contexte",        notionId: "vocabulaire", prerequis: ["ce1_voc_synonyme"] },
  { id: "ce1_voc_sens_propre_figure",    label: "Distinguer le sens propre du sens figuré",             notionId: "vocabulaire", prerequis: ["ce1_voc_polysemie"] },
  { id: "ce1_voc_expressions",           label: "Comprendre une expression (avoir une peur bleue)",     notionId: "vocabulaire", prerequis: ["ce1_voc_sens_propre_figure"] },
  { id: "ce1_voc_dictionnaire",          label: "Consulter un article de dictionnaire",                 notionId: "vocabulaire", prerequis: ["ce1_voc_contexte"] },
  { id: "ce1_voc_defi",                  label: "Défi vocabulaire",                                     notionId: "vocabulaire", prerequis: ["ce1_voc_antonyme", "ce1_voc_niveaux_langue", "ce1_voc_expressions"] },
];
