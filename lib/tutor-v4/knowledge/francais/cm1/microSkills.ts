// Micro-compétences de français pour la classe de CM1.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Cours moyen première année ».
//
// UNE MICRO = UN OBJECTIF D'APPRENTISSAGE DU BO. Quand l'intitulé n'est pas
// celui du programme mot pour mot, c'est qu'il a été raccourci pour un élève de
// CM1 ; le texte d'origine est alors en commentaire.
//
// ⚠️ RELU UNE PREMIÈRE FOIS LE 11/08/2026 (onze objectifs de grammaire
// manquaient), PUIS ENTIÈREMENT LE 22/08 avec la 6e et le CM2 : le cycle 3 est
// un seul texte, on le relit d'un bloc. Le détail est en tête de `notions.ts`.
//
// ⛔ LES `id` DE MICRO NE SE RENOMMENT PAS, même quand leur notion change. Ils
// sont écrits en dur dans `fixed.bank.ts`, dans les supports du guide de survie
// et dans la matrice — et surtout, LA PROGRESSION DÉJÀ ENREGISTRÉE D'UN ÉLÈVE
// LES PORTE. On déplace la notion, on garde l'identité. C'est pourquoi
// `cm1_flue_expressive` s'appelle toujours ainsi alors qu'il a quitté la
// fluence : l'aiguillage se règle dans `questionParMicro`, pas dans le nom.
//
// ⚠️⚠️ L'AIGUILLAGE SE FAIT PAR SOUS-CHAÎNE DU `id`. Un id mal choisi ne fait
// pas tomber la banque en panne : il sert des questions justes, sur un autre
// sujet, et aucun vérificateur ne le voit. Chaque id porte donc, en fin de
// ligne, le pool sur lequel il tombe.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ══ LECTURE ═══════════════════════════════════════════════════════════════

  // ── « Lire avec fluidité » ────────────────────────────────────────────────
  // BO : « Lire sans effort un texte d'une page silencieusement ou à voix
  // haute » · « Lire à voix haute un texte court, après préparation, sans
  // confondre les graphèmes, même complexes, et en tenant compte des marques de
  // ponctuation » · « Mémoriser de plus en plus de mots fréquents et
  // irréguliers » · « Lire correctement en ciblant 110 mots par minute ».
  { id: "cm1_flue_page", label: "Lire sans effort un texte d'une page", notionId: "fluence_lecture", prerequis: [] }, // → LECTURE
  { id: "cm1_flue_ponctuation", label: "Lire en respectant ponctuation et groupes de sens", notionId: "fluence_lecture", prerequis: ["cm1_flue_page"] }, // → LECTURE
  { id: "cm1_flue_mots_irreguliers", label: "Reconnaitre des mots fréquents et irréguliers", notionId: "fluence_lecture", prerequis: ["cm1_flue_page"] }, // → LECTURE
  { id: "cm1_flue_110_mots", label: "Viser une lecture fluide autour de 110 mots par minute", notionId: "fluence_lecture", prerequis: ["cm1_flue_ponctuation"] }, // → LECTURE
  { id: "cm1_flue_defi", label: "Relever un défi de lecture fluide", notionId: "fluence_lecture", prerequis: ["cm1_flue_110_mots"] }, // → LECTURE

  // ── « Lire à voix haute avec expressivité » ───────────────────────────────
  // BO : « Lire à voix haute, avec aisance et expressivité, un texte court
  // travaillé en amont » · « Proposer une lecture avec un rythme fluide et
  // régulier qui respecte la ponctuation et les groupes de sens pour faciliter
  // la compréhension de l'auditoire » · « Gérer l'intensité de sa voix (volume,
  // débit) ».
  // ⛔ `cm1_flue_expressive` garde son nom : voir l'en-tête. Il est aiguillé par
  //    son nom propre dans `questionParMicro`.
  { id: "cm1_flue_expressive", label: "Lire à voix haute avec aisance et expressivité", notionId: "lecture_voix_haute", prerequis: ["cm1_flue_ponctuation"] }, // → MISE_EN_VOIX (nommée)
  { id: "cm1_voix_rythme", label: "Tenir un rythme régulier pour que l'auditoire suive", notionId: "lecture_voix_haute", prerequis: ["cm1_flue_expressive"] }, // → MISE_EN_VOIX
  { id: "cm1_voix_intensite", label: "Régler le volume et le débit de sa voix", notionId: "lecture_voix_haute", prerequis: ["cm1_voix_rythme"] }, // → MISE_EN_VOIX
  { id: "cm1_voix_defi", label: "Relever un défi de lecture à voix haute", notionId: "lecture_voix_haute", prerequis: ["cm1_voix_intensite"] }, // → MISE_EN_VOIX

  // ── « Lire et comprendre seul des textes, des documents et des images » ────
  // BO : « Développer des stratégies de compréhension » · « Repérer, dans un
  // texte, les informations explicites et pointer des informations
  // implicites » · « Distinguer, par la mise en page et les caractéristiques
  // d'écriture spécifiques, un extrait de théâtre, un poème, un texte narratif ».
  { id: "cm1_comp_strategies", label: "Utiliser des stratégies de compréhension", notionId: "comprehension_textes", prerequis: ["cm1_flue_page"] }, // → LECTURE
  { id: "cm1_comp_explicite", label: "Repérer les informations explicites", notionId: "comprehension_textes", prerequis: ["cm1_comp_strategies"] }, // → LECTURE
  { id: "cm1_comp_implicite", label: "Pointer une information implicite simple", notionId: "comprehension_textes", prerequis: ["cm1_comp_explicite"] }, // → LECTURE
  { id: "cm1_comp_genres", label: "Distinguer théâtre, poème et texte narratif à leur mise en page", notionId: "comprehension_textes", prerequis: ["cm1_comp_explicite"] }, // → LECTURE
  { id: "cm1_comp_textes_defi", label: "Relever un défi de compréhension de texte", notionId: "comprehension_textes", prerequis: ["cm1_comp_implicite", "cm1_comp_genres"] }, // → LECTURE

  // ── « Lire et comprendre […] pour apprendre dans toutes les disciplines » ──
  // BO : « Donner la nature et la source d'un document » · « Identifier les
  // différents genres représentés et repérer leurs caractéristiques majeures » ·
  // « Trouver dans des documents simples les réponses à des questions » ·
  // « DÉCOUVRIR DES DOCUMENTS COMPOSITES et y repérer des informations grâce à
  // un questionnement ».
  { id: "cm1_doc_source", label: "Donner la nature et la source d'un document", notionId: "comprehension_documents", prerequis: ["cm1_comp_explicite"] }, // → DOCUMENT
  { id: "cm1_doc_infos", label: "Prélever des informations dans un document simple", notionId: "comprehension_documents", prerequis: ["cm1_doc_source"] }, // → DOCUMENT
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026. */
  { id: "cm1_doc_composite", label: "Découvrir un document composite et s'y repérer", notionId: "comprehension_documents", prerequis: ["cm1_doc_infos"] }, // → DOCUMENT
  { id: "cm1_comp_documents_defi", label: "Relever un défi de lecture de documents", notionId: "comprehension_documents", prerequis: ["cm1_doc_composite"] }, // → DOCUMENTS

  // ── « Lire une œuvre et se l'approprier » ─────────────────────────────────
  // BO : « Mettre en relation le texte lu avec une œuvre lue en classe afin de
  // garder la mémoire des livres lus » · « Créer des liens entre le texte lu et
  // ses expériences personnelles, ses connaissances ».
  { id: "cm1_oeuvre_lien", label: "Relier un texte à une œuvre lue en classe", notionId: "lecture_oeuvres", prerequis: ["cm1_comp_explicite"] }, // → OEUVRE
  { id: "cm1_oeuvre_reaction", label: "Exprimer une réaction personnelle de lecteur", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_lien"] }, // → OEUVRE
  { id: "cm1_oeuvre_personnages", label: "Identifier héros, personnages et relations", notionId: "lecture_oeuvres", prerequis: ["cm1_comp_explicite"] }, // → OEUVRE
  { id: "cm1_oeuvre_defi", label: "Relever un défi sur une œuvre lue", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_reaction", "cm1_oeuvre_personnages"] }, // → OEUVRE

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ══════════════════════════════════════
  // Les SIX ENTRÉES du cours moyen, nommées une par une par le BO.
  { id: "cm1_cult_heros", label: "Découvrir des héroïnes, des héros", notionId: "culture_personnages", prerequis: ["cm1_oeuvre_personnages"] }, // → HEROS
  { id: "cm1_cult_merveilleux", label: "Se confronter au merveilleux, à l'étrange", notionId: "culture_personnages", prerequis: ["cm1_oeuvre_personnages"] }, // → MERVEILLEUX
  { id: "cm1_cult_autres_vies", label: "Imaginer et vivre d'autres vies", notionId: "culture_personnages", prerequis: ["cm1_cult_heros"] }, // → AUTRES_VIES
  { id: "cm1_cult_personnages_defi", label: "Relever un défi sur les héros et le merveilleux", notionId: "culture_personnages", prerequis: ["cm1_cult_autres_vies", "cm1_cult_merveilleux"] }, // → OEUVRE

  { id: "cm1_cult_morale", label: "Comprendre et interroger la morale", notionId: "culture_soi_et_les_autres", prerequis: ["cm1_cult_heros"] }, // → MORALE
  { id: "cm1_cult_poesie", label: "Savourer le goût des mots, imaginer et créer en poésie", notionId: "culture_soi_et_les_autres", prerequis: ["cm1_oeuvre_reaction"] }, // → POESIE
  { id: "cm1_cult_rapport_autres", label: "Se découvrir, s'affirmer dans le rapport aux autres", notionId: "culture_soi_et_les_autres", prerequis: ["cm1_cult_autres_vies"] }, // → RAPPORT_AUTRES
  { id: "cm1_cult_soi_defi", label: "Relever un défi sur la morale et la poésie", notionId: "culture_soi_et_les_autres", prerequis: ["cm1_cult_morale", "cm1_cult_poesie"] }, // → OEUVRE

  // ── Les gestes du lecteur ─────────────────────────────────────────────────
  // BO : « VARIER LES EXPÉRIENCES DE LECTURE (genres, formats, thèmes) afin de
  // développer le plaisir de lire » · « S'engager et persévérer dans sa
  // lecture » · « garder la mémoire des livres lus ».
  { id: "cm1_oeuvre_carnet", label: "Garder trace de ses lectures", notionId: "culture_lecteur", prerequis: ["cm1_oeuvre_reaction"] }, // → OEUVRE
  { id: "cm1_oeuvre_varier", label: "Varier les genres, les formats et les thèmes de ses lectures", notionId: "culture_lecteur", prerequis: ["cm1_oeuvre_carnet"] }, // → OEUVRE
  { id: "cm1_oeuvre_perseverer", label: "S'engager et persévérer dans une lecture longue", notionId: "culture_lecteur", prerequis: ["cm1_oeuvre_varier"] }, // → OEUVRE
  { id: "cm1_cult_lecteur_defi", label: "Relever un défi de lecteur : varier, tenir, partager", notionId: "culture_lecteur", prerequis: ["cm1_oeuvre_perseverer"] }, // → OEUVRE

  // ══ ÉCRITURE ══════════════════════════════════════════════════════════════

  // ── « Écrire à la main » + « Écrire pour réfléchir, apprendre, mémoriser » ─
  // BO : « Copier et produire des textes » · « ÉCRIRE POUR REPÉRER ET TRIER LES
  // INFORMATIONS PERTINENTES » · « REFORMULER, avec l'aide du professeur et de
  // ses pairs, L'ESSENTIEL D'UNE LEÇON ou d'une activité pour se l'approprier ».
  { id: "cm1_ecrit_copie", label: "Copier un texte court avec soin et efficacité", notionId: "ecriture_preparer", prerequis: [] }, // → ECRIRE_MAIN
  { id: "cm1_ecrit_notes", label: "Écrire pour retenir une idée ou une information", notionId: "ecriture_preparer", prerequis: ["cm1_ecrit_copie"] }, // → ECRITURE
  { id: "cm1_ecrit_trier", label: "Écrire pour repérer et trier les informations utiles", notionId: "ecriture_preparer", prerequis: ["cm1_ecrit_notes"] }, // → ECRIT_RESUMER
  { id: "cm1_ecrit_reformuler", label: "Reformuler l'essentiel d'une leçon pour se l'approprier", notionId: "ecriture_preparer", prerequis: ["cm1_ecrit_notes"] }, // → ECRIT_RESUMER
  { id: "cm1_ecrit_preparer_defi", label: "Relever un défi de préparation d'écrit", notionId: "ecriture_preparer", prerequis: ["cm1_ecrit_trier", "cm1_ecrit_reformuler"] }, // → ECRITURE

  // ── « Produire des écrits variés » ────────────────────────────────────────
  // BO : « Découvrir et explorer des situations variées d'écriture : raconter,
  // expliquer » · « Écrire au quotidien des textes personnels » · « PRENDRE
  // CONSCIENCE DES COMPOSANTES DE LA COHÉRENCE TEXTUELLE ».
  { id: "cm1_ecrit_phrase", label: "Construire des phrases claires et correctement ponctuées", notionId: "ecriture_produire", prerequis: ["cm1_ecrit_notes"] }, // → ECRITURE
  { id: "cm1_ecrit_paragraphe", label: "Organiser un paragraphe cohérent", notionId: "ecriture_produire", prerequis: ["cm1_ecrit_phrase"] }, // → ECRITURE
  { id: "cm1_ecrit_recit", label: "Produire un court récit ou une description", notionId: "ecriture_produire", prerequis: ["cm1_ecrit_paragraphe"] }, // → ECRITURE
  { id: "cm1_ecrit_coherence", label: "Prendre conscience de ce qui rend un texte cohérent", notionId: "ecriture_produire", prerequis: ["cm1_ecrit_paragraphe"] }, // → ECRIT_COHERENCE
  { id: "cm1_ecrit_produire_defi", label: "Relever un défi d'écriture", notionId: "ecriture_produire", prerequis: ["cm1_ecrit_recit", "cm1_ecrit_coherence"] }, // → ECRIT_COHERENCE

  // ── Revenir sur son texte ─────────────────────────────────────────────────
  // BO : « UTILISER LE BROUILLON POUR PRÉPARER SON TEXTE » · « EXERCER SA
  // VIGILANCE QUANT AU RESPECT DES CODES DE L'ÉCRIT » · « Améliorer tout ou
  // partie de son texte à partir des pistes données par l'enseignant et/ou ses
  // pairs ».
  { id: "cm1_ecrit_brouillon", label: "Utiliser le brouillon pour préparer son texte", notionId: "ecriture_reviser", prerequis: ["cm1_ecrit_phrase"] }, // → ECRIT_REVISER
  { id: "cm1_ecrit_reviser", label: "Relire et améliorer son écrit", notionId: "ecriture_reviser", prerequis: ["cm1_ecrit_brouillon"] }, // → ECRIT_REVISER
  { id: "cm1_ecrit_codes", label: "Vérifier le respect des codes de l'écrit", notionId: "ecriture_reviser", prerequis: ["cm1_ecrit_reviser"] }, // → ECRIT_REVISER
  { id: "cm1_ecrit_reviser_defi", label: "Relever un défi de relecture et de correction", notionId: "ecriture_reviser", prerequis: ["cm1_ecrit_codes"] }, // → ECRIT_REVISER

  // ══ ORAL ══════════════════════════════════════════════════════════════════
  { id: "cm1_oral_ecouter", label: "Écouter pour comprendre un texte ou une consigne", notionId: "oral_ecouter", prerequis: [] }, // → ORAL
  { id: "cm1_oral_reformuler", label: "Reformuler une information entendue", notionId: "oral_ecouter", prerequis: ["cm1_oral_ecouter"] }, // → ORAL
  { id: "cm1_oral_ecouter_defi", label: "Relever un défi d'écoute", notionId: "oral_ecouter", prerequis: ["cm1_oral_reformuler"] }, // → ORAL

  { id: "cm1_oral_presenter", label: "Présenter clairement une lecture ou un travail", notionId: "oral_echanger", prerequis: ["cm1_oral_reformuler"] }, // → ORAL
  { id: "cm1_oral_argumenter", label: "Donner un avis justifié", notionId: "oral_echanger", prerequis: ["cm1_oral_presenter"] }, // → ORAL
  { id: "cm1_oral_echanger", label: "Participer à un échange en respectant la parole d'autrui", notionId: "oral_echanger", prerequis: ["cm1_oral_argumenter"] }, // → ORAL
  { id: "cm1_oral_defi", label: "Relever un défi d'oral", notionId: "oral_echanger", prerequis: ["cm1_oral_echanger"] }, // → ORAL

  // ══ VOCABULAIRE ═══════════════════════════════════════════════════════════
  // BO : « Identifier les mots inconnus, lors de ses différentes lectures, et
  // rechercher leur signification EN S'APPUYANT SUR LA MORPHOLOGIE ET SUR LE
  // CONTEXTE ».
  { id: "cm1_voc_contexte", label: "Comprendre un mot inconnu grâce au contexte", notionId: "vocabulaire_sens", prerequis: ["cm1_comp_explicite"] }, // → VOC_CONTEXTE
  { id: "cm1_voc_morphologie", label: "Deviner un mot inconnu en regardant comment il est fabriqué", notionId: "vocabulaire_sens", prerequis: ["cm1_voc_contexte"] }, // → VOC_FAMILLE
  { id: "cm1_voc_polysemie", label: "Distinguer les sens d'un mot polysémique", notionId: "vocabulaire_sens", prerequis: ["cm1_voc_contexte"] }, // → VOC_POLYSEMIE
  { id: "cm1_voc_sens_defi", label: "Relever un défi sur le sens des mots", notionId: "vocabulaire_sens", prerequis: ["cm1_voc_morphologie", "cm1_voc_polysemie"] }, // → défi lexique

  { id: "cm1_voc_famille", label: "Identifier racine, familles de mots et dérivation", notionId: "vocabulaire_relations", prerequis: ["cm1_voc_contexte"] }, // → VOC_FAMILLE
  { id: "cm1_voc_syn_ant", label: "Utiliser synonymes et antonymes", notionId: "vocabulaire_relations", prerequis: ["cm1_voc_famille"] }, // → VOC_SYN_ANT
  { id: "cm1_voc_formation_defi", label: "Relever un défi sur la formation des mots", notionId: "vocabulaire_relations", prerequis: ["cm1_voc_syn_ant"] }, // → défi lexique

  { id: "cm1_voc_reemploi", label: "Réemployer le vocabulaire étudié dans une phrase", notionId: "vocabulaire_emploi", prerequis: ["cm1_voc_syn_ant", "cm1_voc_polysemie"] }, // → VOC_REEMPLOI
  { id: "cm1_voc_orthographe", label: "Mémoriser l'orthographe des mots étudiés", notionId: "vocabulaire_emploi", prerequis: ["cm1_voc_reemploi"] }, // → VOC_ORTH
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026 : « S'appuyer sur la
     dimension morphologique des mots rencontrés lors de ses différentes
     lectures pour les orthographier » — trouver la lettre muette de « grand »
     par « grande », de « chant » par « chanter ». */
  { id: "cm1_voc_morpho_orthographe", label: "Trouver la lettre muette grâce à un mot de la même famille", notionId: "vocabulaire_emploi", prerequis: ["cm1_voc_famille"] }, // → VOC_FAMILLE
  { id: "cm1_voc_emploi_defi", label: "Relever un défi d'emploi et d'orthographe des mots", notionId: "vocabulaire_emploi", prerequis: ["cm1_voc_orthographe", "cm1_voc_morpho_orthographe"] }, // → défi lexique

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ═════════════════════════════════

  // ── « Connaitre les trois types de phrases et leurs formes » ──────────────
  // BO : « Identifier les trois types de phrases (déclaratif, interrogatif,
  // impératif ou injonctif) » · « Identifier les principales formes de phrases
  // (négative, exclamative) » · « Transformer à l'oral puis à l'écrit des
  // phrases d'un type à un autre, d'une forme à une autre » · « DISTINGUER ET
  // PRODUIRE DIFFÉRENTES RÉALISATIONS DU TYPE INTERROGATIF à l'oral comme à
  // l'écrit (inversion du sujet, est-ce que, intonation) ».
  { id: "cm1_gram_types_phrases", label: "Identifier les trois types de phrases et leurs formes", notionId: "grammaire_types_phrases", prerequis: ["cm1_flue_ponctuation"] }, // → TYPES_PHRASES
  { id: "cm1_gram_transformer_phrase", label: "Transformer une phrase d'un type ou d'une forme à l'autre", notionId: "grammaire_types_phrases", prerequis: ["cm1_gram_types_phrases"] }, // → TRANSFORMER_PHRASE
  { id: "cm1_gram_types_phrases_interro", label: "Poser une question de trois façons différentes", notionId: "grammaire_types_phrases", prerequis: ["cm1_gram_types_phrases"] }, // → TYPES_PHRASES
  { id: "cm1_gram_types_phrases_defi", label: "Relever un défi sur les types et les formes de phrases", notionId: "grammaire_types_phrases", prerequis: ["cm1_gram_transformer_phrase", "cm1_gram_types_phrases_interro"] }, // → TYPES_PHRASES

  // ── « Analyser une phrase simple » ────────────────────────────────────────
  // BO : « Consolider l'identification du verbe conjugué » · « Consolider
  // l'identification du groupe sujet » · « IDENTIFIER LES DIFFÉRENTS TYPES DE
  // SUJETS (pronoms personnels, groupes nominaux, plusieurs noms) » ·
  // « Comprendre et utiliser les manipulations syntaxiques : déplacement,
  // suppression, substitution, addition, encadrement ».
  { id: "cm1_gram_phrase_simple", label: "Identifier les constituants d'une phrase simple", notionId: "grammaire_phrase", prerequis: ["cm1_flue_ponctuation"] }, // → PHRASE_SIMPLE
  { id: "cm1_gram_sujet_verbe", label: "Identifier sujet et verbe conjugué", notionId: "grammaire_phrase", prerequis: ["cm1_gram_phrase_simple"] }, // → SUJET_VERBE
  { id: "cm1_gram_sujets_types", label: "Reconnaitre un sujet pronom, groupe nominal ou plusieurs noms", notionId: "grammaire_phrase", prerequis: ["cm1_gram_sujet_verbe"] }, // → SUJET_VERBE
  { id: "cm1_gram_manipulations", label: "Utiliser les manipulations syntaxiques", notionId: "grammaire_phrase", prerequis: ["cm1_gram_sujet_verbe"] }, // → MANIPULATIONS
  { id: "cm1_gram_phrase_defi", label: "Relever un défi d'analyse de la phrase", notionId: "grammaire_phrase", prerequis: ["cm1_gram_sujets_types", "cm1_gram_manipulations"] }, // → défi phrase

  // ── Les compléments ───────────────────────────────────────────────────────
  // BO : « Distinguer le complément d'objet du complément circonstanciel » ·
  // « Après s'être assuré de la capacité à identifier le complément d'objet,
  // différencier complément d'objet direct et complément d'objet indirect dans
  // des phrases prototypiques sans ambigüité » · « IDENTIFIER LES GROUPES
  // CIRCONSTANCIELS (SANS LES DISTINGUER) ».
  // ⛔ Le CM1 ne distingue PAS temps / lieu / cause : c'est le CM2 qui le fait.
  { id: "cm1_gram_complements", label: "Distinguer complément d'objet et complément circonstanciel", notionId: "grammaire_complements", prerequis: ["cm1_gram_sujet_verbe"] }, // → COMPLEMENTS
  { id: "cm1_gram_cod_coi", label: "Différencier complément d'objet direct et indirect", notionId: "grammaire_complements", prerequis: ["cm1_gram_complements"] }, // → COD_COI
  { id: "cm1_gram_complements_circonstanciels", label: "Repérer un groupe circonstanciel, sans le nommer", notionId: "grammaire_complements", prerequis: ["cm1_gram_complements"] }, // → COMPLEMENTS
  { id: "cm1_gram_complements_defi", label: "Relever un défi sur les compléments", notionId: "grammaire_complements", prerequis: ["cm1_gram_cod_coi", "cm1_gram_complements_circonstanciels"] }, // → défi compléments

  // ── Nature et classes de mots ─────────────────────────────────────────────
  // BO : « Se familiariser avec les notions de nature et fonction » ·
  // « Identifier et nommer les déterminants : articles définis, indéfinis,
  // possessifs, démonstratifs » · « Identifier et nommer les conjonctions de
  // coordination » · « Identifier et nommer les adverbes les plus fréquents » ·
  // « Distinguer les pronoms personnels sujets des pronoms personnels
  // compléments » · « Remplacer un groupe nominal sujet / objet par un pronom ».
  { id: "cm1_gram_nature_fonction", label: "Se familiariser avec les notions de nature et de fonction", notionId: "grammaire_classes_mots", prerequis: ["cm1_gram_phrase_simple"] }, // → NATURE_FONCTION
  { id: "cm1_gram_classes_mots", label: "Identifier déterminants, conjonctions de coordination et adverbes", notionId: "grammaire_classes_mots", prerequis: ["cm1_gram_nature_fonction"] }, // → CLASSES_MOTS
  { id: "cm1_gram_pronoms", label: "Distinguer les pronoms personnels sujets et compléments", notionId: "grammaire_classes_mots", prerequis: ["cm1_gram_classes_mots"] }, // → PRONOMS_SUJET_OBJET
  { id: "cm1_gram_classes_mots_defi", label: "Relever un défi sur la nature des mots", notionId: "grammaire_classes_mots", prerequis: ["cm1_gram_pronoms"] }, // → CLASSES_MOTS

  // ── « Analyser le groupe nominal » ────────────────────────────────────────
  // BO : « Repérer des groupes nominaux dans une phrase simple et nommer les
  // différents éléments qui les constituent : Dét. + Nom ; Dét. + Nom + Adj. ;
  // Dét. + Adj. + Nom » · « Repérer et nommer le nom noyau » · « Aborder la
  // notion d'épithète ».
  { id: "cm1_gram_gn", label: "Identifier le groupe nominal et ses expansions simples", notionId: "grammaire_groupe_nominal", prerequis: ["cm1_gram_classes_mots"] }, // → GN
  { id: "cm1_gram_gn_epithete", label: "Repérer le nom noyau et aborder la notion d'épithète", notionId: "grammaire_groupe_nominal", prerequis: ["cm1_gram_gn"] }, // → GN_EPITHETE
  { id: "cm1_gram_gn_defi", label: "Relever un défi sur le groupe nominal", notionId: "grammaire_groupe_nominal", prerequis: ["cm1_gram_gn_epithete"] }, // → défi GN

  // ── « Acquérir l'orthographe grammaticale » ───────────────────────────────
  // BO : « IDENTIFIER, CLASSER ET REPÉRER LES CRITÈRES DE VARIATIONS (genre,
  // nombre, personne, temps) au sein des différentes classes grammaticales » ·
  // « Systématiser la chaine d'accords dans le groupe nominal » · « Repérer le
  // sujet du verbe : notamment le nom noyau dans le cas d'un groupe nominal ».
  { id: "cm1_orth_classes_mots_variables", label: "Repérer ce qui varie : genre, nombre, personne, temps", notionId: "grammaire_accords", prerequis: ["cm1_gram_classes_mots"] }, // → CLASSES_MOTS
  { id: "cm1_orth_accord_gn", label: "Accorder déterminant, nom et adjectif", notionId: "grammaire_accords", prerequis: ["cm1_gram_gn"] }, // → moteur d'accord du GN
  { id: "cm1_orth_sujet_verbe", label: "Accorder le verbe avec son sujet", notionId: "grammaire_accords", prerequis: ["cm1_gram_sujet_verbe"] }, // → moteur sujet-verbe
  { id: "cm1_orth_homophones", label: "Distinguer des homophones grammaticaux courants", notionId: "grammaire_accords", prerequis: ["cm1_orth_sujet_verbe"] }, // → HOMOPHONES
  { id: "cm1_orth_accords_defi", label: "Relever un défi d'accords", notionId: "grammaire_accords", prerequis: ["cm1_orth_accord_gn", "cm1_orth_homophones"] }, // → défi accords

  // ══ CONJUGAISON ═══════════════════════════════════════════════════════════
  // BO : « Conjugaisons à mémoriser et à maitriser : présent de l'indicatif,
  // imparfait, futur, passé composé des verbes être et avoir, des verbes du
  // premier et du deuxième groupe et des verbes irréguliers du troisième
  // groupe (faire, aller, dire, venir, pouvoir, voir, vouloir, prendre) ».
  { id: "cm1_conj_infinitif_groupe", label: "Trouver l'infinitif et le groupe d'un verbe", notionId: "conjugaison_temps_simples", prerequis: ["cm1_gram_sujet_verbe"] }, // → moteur infinitif
  { id: "cm1_conj_present", label: "Conjuguer au présent les verbes fréquents", notionId: "conjugaison_temps_simples", prerequis: ["cm1_conj_infinitif_groupe"] }, // → moteur présent
  { id: "cm1_conj_imparfait", label: "Conjuguer à l'imparfait", notionId: "conjugaison_temps_simples", prerequis: ["cm1_conj_present"] }, // → moteur imparfait
  { id: "cm1_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison_temps_simples", prerequis: ["cm1_conj_present"] }, // → moteur futur
  { id: "cm1_conj_simples_defi", label: "Relever un défi de conjugaison aux temps simples", notionId: "conjugaison_temps_simples", prerequis: ["cm1_conj_imparfait", "cm1_conj_futur"] }, // → défi temps simples

  // ── Lire une forme verbale ────────────────────────────────────────────────
  // BO : « Identifier par une première approche la composition de la terminaison
  // des verbes conjugués : la marque de temps et la marque de personne » ·
  // « CONNAITRE LES MARQUES DE PERSONNE pour le présent de l'indicatif,
  // l'imparfait et le futur » · « Savoir isoler et connaitre les marques de
  // temps de l'imparfait (-ai-, -i-) ; du futur (-r-) » · « Mettre en évidence
  // les variations du radical pour certains verbes du premier groupe (verbes en
  // -yer, en -eler et -eter, en -cer, -ger) ».
  { id: "cm1_conj_marques", label: "Isoler les marques de temps et de personne dans un verbe conjugué", notionId: "conjugaison_formes", prerequis: ["cm1_conj_present"] }, // → MARQUES_TEMPS_PERSONNE
  { id: "cm1_conj_marques_personne", label: "Connaitre les marques de personne au présent, à l'imparfait et au futur", notionId: "conjugaison_formes", prerequis: ["cm1_conj_marques"] }, // → MARQUES_TEMPS_PERSONNE
  { id: "cm1_conj_radical_variations", label: "Repérer les variations du radical des verbes du premier groupe", notionId: "conjugaison_formes", prerequis: ["cm1_conj_present"] }, // → RADICAL_VARIATIONS
  { id: "cm1_conj_marques_defi", label: "Relever un défi sur la forme d'un verbe conjugué", notionId: "conjugaison_formes", prerequis: ["cm1_conj_marques_personne", "cm1_conj_radical_variations"] }, // → MARQUES_TEMPS_PERSONNE

  // ── Le passé composé ──────────────────────────────────────────────────────
  // BO : « Connaitre la composition du passé composé en deux parties
  // (auxiliaire + participe passé) ; retrouver la forme infinitive du verbe » ·
  // « EFFECTUER LA TRANSFORMATION À LA FORME NÉGATIVE d'un verbe au passé
  // composé en insérant les adverbes de négation à leur juste place » ·
  // « Accorder le participe passé avec le sujet dans le cas de l'emploi avec
  // l'auxiliaire être ».
  // ⛔ L'AUXILIAIRE AVOIR N'EST PAS AU PROGRAMME DU CM1 : il entre au CM2. Le
  //    pool servi est donc PARTICIPE_PASSE_ETRE, pas PARTICIPE_PASSE.
  { id: "cm1_conj_passe_compose", label: "Former le passé composé avec être ou avoir", notionId: "conjugaison_passe_compose", prerequis: ["cm1_conj_present"] }, // → CONJ_PASSE_COMPOSE
  { id: "cm1_orth_participe_passe_etre", label: "Accorder le participe passé avec être", notionId: "conjugaison_passe_compose", prerequis: ["cm1_conj_passe_compose"] }, // → PARTICIPE_PASSE_ETRE
  { id: "cm1_conj_negation_passe_compose", label: "Mettre un passé composé à la forme négative", notionId: "conjugaison_passe_compose", prerequis: ["cm1_conj_passe_compose"] }, // → CONJ_PASSE_COMPOSE
  /* ⚠️ Le BO n'introduit formellement la VALEUR des temps qu'en 6e. Au CM1,
     cette micro reste légitime — choisir le temps qui convient au sens est une
     activité d'écriture — mais elle est en avance sur le programme, et c'est
     volontaire. Ne pas la prendre pour un attendu du CM1. */
  { id: "cm1_conj_valeur_temps", label: "Choisir le temps adapté au sens de la phrase", notionId: "conjugaison_passe_compose", prerequis: ["cm1_conj_imparfait", "cm1_conj_futur", "cm1_conj_passe_compose"] }, // → CONJ_VALEUR_TEMPS
  { id: "cm1_conj_passe_compose_defi", label: "Relever un défi sur le passé composé", notionId: "conjugaison_passe_compose", prerequis: ["cm1_orth_participe_passe_etre", "cm1_conj_negation_passe_compose"] }, // → CONJ_PASSE_COMPOSE
];
