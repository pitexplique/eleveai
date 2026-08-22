// Micro-compétences de français pour la classe de CM2.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Cours moyen deuxième année ».
//
// UNE MICRO = UN OBJECTIF D'APPRENTISSAGE DU BO. Le programme les liste ligne à
// ligne sous chaque compétence. Quand l'intitulé ci-dessous n'est pas celui du
// BO mot pour mot, c'est qu'il a été raccourci pour un élève de CM2 ; le texte
// d'origine est alors en commentaire.
//
// ⚠️ RELU SUR LE TEXTE DU BO LE 22/08/2026, comme la 6e le matin même — c'est le
// même programme. Quatorze objectifs nommés n'avaient aucune micro, et quatre
// notions dépassaient les cinq micros. Le détail est en tête de `notions.ts`.
//
// ⚠️⚠️ L'AIGUILLAGE SE FAIT PAR SOUS-CHAÎNE DU `id`. `buildCycle3FrancaisBank`
// choisit le pool de questions en testant `microId.includes(...)`, dans un ordre
// qui compte. Un id mal choisi ne fait PAS tomber la banque en panne : il sert
// des questions justes, sur un autre sujet, et aucun vérificateur ne le voit.
// Chaque id ci-dessous porte donc, en fin de ligne, le pool sur lequel il tombe.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ══ LECTURE ═══════════════════════════════════════════════════════════════

  // ── « Lire avec fluidité » ────────────────────────────────────────────────
  // BO : « Poursuivre l'entrainement à la lecture à voix haute et à la lecture
  // silencieuse » · « Lire à voix haute, après préparation, un texte long en
  // tenant compte des marques de ponctuation, des liaisons et des unités
  // syntaxiques » · « Lire correctement en ciblant 120 mots par minute ».
  { id: "cm2_flue_texte_long", label: "Lire à voix haute un texte long après préparation", notionId: "fluence_lecture", prerequis: [] }, // → LECTURE
  { id: "cm2_flue_unites_syntaxiques", label: "Respecter ponctuation, liaisons et unités syntaxiques", notionId: "fluence_lecture", prerequis: ["cm2_flue_texte_long"] }, // → LECTURE
  { id: "cm2_flue_120_mots", label: "Viser une lecture fluide autour de 120 mots par minute", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] }, // → LECTURE
  { id: "cm2_flue_defi", label: "Relever un défi de lecture fluide", notionId: "fluence_lecture", prerequis: ["cm2_flue_120_mots"] }, // → LECTURE

  // ── « Lire à voix haute avec expressivité » ───────────────────────────────
  // BO : « Lire à voix haute, avec aisance et expressivité, un texte travaillé
  // en amont, en respectant l'articulation du texte » · « Travailler la mise en
  // voix d'un texte (intonation, effets) » · « S'entrainer à faire vivre le
  // texte et prendre plaisir à le lire ».
  // ⚠️ Les micros s'appellent `cm2_voix_*` et non `cm2_flue_*` : c'est ce
  // morceau d'identifiant qui les fait tomber sur le pool MISE_EN_VOIX, écrit
  // le 22/08. Sous leur ancien nom, elles recevaient des questions de
  // compréhension de texte — justes, et sur un autre sujet.
  { id: "cm2_voix_articulation", label: "Lire avec aisance en respectant l'articulation du texte", notionId: "lecture_voix_haute", prerequis: ["cm2_flue_unites_syntaxiques"] }, // → MISE_EN_VOIX
  { id: "cm2_voix_mise_en_voix", label: "Mettre en voix un texte : intonation et effets", notionId: "lecture_voix_haute", prerequis: ["cm2_voix_articulation"] }, // → MISE_EN_VOIX
  { id: "cm2_voix_plaisir", label: "Faire vivre un texte et prendre plaisir à le lire", notionId: "lecture_voix_haute", prerequis: ["cm2_voix_mise_en_voix"] }, // → MISE_EN_VOIX
  { id: "cm2_voix_defi", label: "Relever un défi de lecture à voix haute", notionId: "lecture_voix_haute", prerequis: ["cm2_voix_plaisir"] }, // → MISE_EN_VOIX

  // ── « Lire et comprendre seul des textes, des documents et des images » ────
  // BO : « Poursuivre son apprentissage de lecteur autonome face à des textes de
  // plus en plus longs et de plus en plus complexes » · « Restituer l'essentiel
  // d'un texte qui contient des informations explicites et des informations
  // implicites » · « Reconnaitre et nommer les principaux genres littéraires à
  // l'aide de critères travaillés en classe ».
  { id: "cm2_comp_autonomie", label: "Comprendre seul un texte plus long et plus complexe", notionId: "comprehension_textes", prerequis: ["cm2_flue_texte_long"] }, // → LECTURE
  { id: "cm2_comp_essentiel", label: "Restituer l'essentiel d'un texte", notionId: "comprehension_textes", prerequis: ["cm2_comp_autonomie"] }, // → LECTURE
  { id: "cm2_comp_implicite", label: "Identifier informations explicites et implicites", notionId: "comprehension_textes", prerequis: ["cm2_comp_essentiel"] }, // → LECTURE
  { id: "cm2_comp_genres", label: "Reconnaitre les principaux genres littéraires", notionId: "comprehension_textes", prerequis: ["cm2_comp_autonomie"] }, // → LECTURE
  { id: "cm2_comp_textes_defi", label: "Relever un défi de compréhension de texte", notionId: "comprehension_textes", prerequis: ["cm2_comp_implicite", "cm2_comp_genres"] }, // → LECTURE

  // ── « Lire et comprendre […] pour apprendre dans toutes les disciplines » ──
  // BO : « Reconnaitre et nommer les caractéristiques des différents éléments
  // d'un document composite » · « Rapprocher deux documents convergents, de
  // genres différents, pour repérer et compléter les informations » · « À
  // partir de questions posées, prélever des informations (en faisant des
  // inférences si nécessaire) qui seront combinées pour donner un sens global
  // au(x) document(s) ».
  { id: "cm2_doc_composite", label: "Nommer les éléments d'un document composite", notionId: "comprehension_documents", prerequis: ["cm2_comp_autonomie"] }, // → DOCUMENT
  { id: "cm2_doc_croiser_infos", label: "Croiser deux documents pour compléter une information", notionId: "comprehension_documents", prerequis: ["cm2_doc_composite"] }, // → DOCUMENT
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026 : ce n'est pas la même
     chose que croiser deux documents. Ici on part d'une QUESTION, on prélève
     dans plusieurs endroits, et on combine pour un sens global. */
  { id: "cm2_doc_prelever_combiner", label: "Prélever puis combiner des informations pour répondre à une question", notionId: "comprehension_documents", prerequis: ["cm2_doc_croiser_infos"] }, // → DOCUMENT
  { id: "cm2_comp_documents_defi", label: "Relever un défi de lecture de documents", notionId: "comprehension_documents", prerequis: ["cm2_doc_prelever_combiner"] }, // → DOCUMENTS

  // ── « Lire une œuvre et se l'approprier » ─────────────────────────────────
  // BO : « Mettre en relation le texte lu avec une autre œuvre ou une autre
  // référence culturelle » · « Mettre en relation le texte qu'il est en train de
  // lire avec ses expériences personnelles ».
  { id: "cm2_oeuvre_reference", label: "Relier une œuvre à une autre référence culturelle", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_essentiel"] }, // → OEUVRE
  { id: "cm2_oeuvre_experience", label: "Relier une lecture à son expérience personnelle", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_essentiel"] }, // → OEUVRE
  { id: "cm2_oeuvre_theme", label: "Identifier thème, personnages et enjeux d'une œuvre", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_reference"] }, // → OEUVRE
  { id: "cm2_oeuvre_defi", label: "Relever un défi sur une œuvre lue", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_experience", "cm2_oeuvre_theme"] }, // → OEUVRE

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ══════════════════════════════════════
  // Les SIX ENTRÉES du cours moyen, nommées une par une par le BO.
  { id: "cm2_cult_heros", label: "Découvrir des héroïnes, des héros", notionId: "culture_personnages", prerequis: ["cm2_oeuvre_theme"] }, // → HEROS
  { id: "cm2_cult_merveilleux", label: "Se confronter au merveilleux, à l'étrange", notionId: "culture_personnages", prerequis: ["cm2_oeuvre_theme"] }, // → MERVEILLEUX
  { id: "cm2_cult_autres_vies", label: "Imaginer et vivre d'autres vies", notionId: "culture_personnages", prerequis: ["cm2_cult_heros"] }, // → AUTRES_VIES
  { id: "cm2_cult_personnages_defi", label: "Relever un défi sur les héros et le merveilleux", notionId: "culture_personnages", prerequis: ["cm2_cult_autres_vies", "cm2_cult_merveilleux"] }, // → OEUVRE

  { id: "cm2_cult_morale", label: "Comprendre et interroger la morale", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_cult_heros"] }, // → MORALE
  { id: "cm2_cult_poesie", label: "Savourer le goût des mots, imaginer et créer en poésie", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_oeuvre_experience"] }, // → POESIE
  { id: "cm2_cult_rapport_autres", label: "Se découvrir, s'affirmer dans le rapport aux autres", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_cult_autres_vies"] }, // → RAPPORT_AUTRES
  { id: "cm2_cult_soi_defi", label: "Relever un défi sur la morale et la poésie", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_cult_morale", "cm2_cult_poesie"] }, // → OEUVRE

  // ── Les gestes du lecteur ─────────────────────────────────────────────────
  // BO : « Développer le plaisir de lire, notamment avec des œuvres choisies » ·
  // « S'engager et persévérer dans sa lecture » · « Il garde trace de ses
  // lectures et les partage » (tableau « Dans l'année »).
  { id: "cm2_oeuvre_carnet", label: "Tenir une trace personnelle et organisée de ses lectures", notionId: "culture_lecteur", prerequis: ["cm2_oeuvre_experience"] }, // → OEUVRE
  { id: "cm2_oeuvre_choix", label: "Choisir une œuvre et justifier son choix", notionId: "culture_lecteur", prerequis: ["cm2_oeuvre_carnet"] }, // → OEUVRE
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026. Persévérer dans une
     lecture longue n'est pas la même chose que la choisir : c'est ce qui se
     joue au milieu du livre, pas à la librairie. */
  { id: "cm2_oeuvre_perseverer", label: "S'engager et persévérer dans une lecture longue", notionId: "culture_lecteur", prerequis: ["cm2_oeuvre_choix"] }, // → OEUVRE
  { id: "cm2_cult_lecteur_defi", label: "Relever un défi de lecteur : choisir, tenir, partager", notionId: "culture_lecteur", prerequis: ["cm2_oeuvre_perseverer"] }, // → OEUVRE

  // ══ ÉCRITURE ══════════════════════════════════════════════════════════════

  // ── « Écrire à la main » + « Écrire pour réfléchir, apprendre, mémoriser » ─
  // BO : « Copier et produire des textes » · « Acquérir des stratégies de
  // copie » · « ÉCRIRE POUR COMPARER DEUX DOCUMENTS » · « Reformuler l'essentiel
  // d'une leçon, y compris de manière schématique ».
  { id: "cm2_ecrit_copie", label: "Copier efficacement un texte plus long", notionId: "ecriture_preparer", prerequis: [] }, // → ECRIRE_MAIN
  { id: "cm2_ecrit_notes", label: "Prendre des notes simples pour apprendre", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_copie"] }, // → ECRITURE
  { id: "cm2_ecrit_plan", label: "Organiser ses idées avant d'écrire", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_notes"] }, // → ECRITURE
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026. */
  { id: "cm2_ecrit_comparer_documents", label: "Écrire pour comparer deux documents", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_notes"] }, // → ECRITURE
  { id: "cm2_ecrit_preparer_defi", label: "Relever un défi de préparation d'écrit", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_plan", "cm2_ecrit_comparer_documents"] }, // → ECRITURE

  // ── « Produire des écrits variés » ────────────────────────────────────────
  // BO : « Découvrir et manipuler des situations variées d'écriture : décrire,
  // dialoguer » · « Écrire au quotidien des textes personnels » · « APPLIQUER
  // LES PRINCIPES DE LA COHÉRENCE TEXTUELLE ».
  { id: "cm2_ecrit_paragraphe", label: "Construire plusieurs paragraphes cohérents", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_plan"] }, // → ECRITURE
  { id: "cm2_ecrit_varie", label: "Produire récit, description, dialogue ou texte explicatif", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_paragraphe"] }, // → ECRITURE
  { id: "cm2_ecrit_coherence", label: "Appliquer les principes de la cohérence textuelle", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_paragraphe"] }, // → ECRIT_COHERENCE
  { id: "cm2_ecrit_produire_defi", label: "Relever un défi d'écriture", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_varie", "cm2_ecrit_coherence"] }, // → ECRITURE

  // ── Revenir sur son texte ─────────────────────────────────────────────────
  // BO : « UTILISER LE BROUILLON POUR PRÉPARER SON TEXTE » · « FAIRE PREUVE
  // D'AUTONOMIE DANS LE RESPECT DES CODES DE L'ÉCRIT » · « Améliorer tout ou
  // partie de son texte à partir des pistes données par l'enseignant, ses pairs
  // et/ou son autoévaluation ».
  { id: "cm2_ecrit_brouillon", label: "Utiliser le brouillon pour préparer son texte", notionId: "ecriture_reviser", prerequis: ["cm2_ecrit_plan"] }, // → ECRIT_REVISER
  { id: "cm2_ecrit_reviser", label: "Relire, corriger et enrichir son texte", notionId: "ecriture_reviser", prerequis: ["cm2_ecrit_brouillon"] }, // → ECRIT_REVISER
  { id: "cm2_ecrit_codes", label: "Respecter seul les codes de l'écrit", notionId: "ecriture_reviser", prerequis: ["cm2_ecrit_reviser"] }, // → ECRIT_REVISER
  { id: "cm2_ecrit_reviser_defi", label: "Relever un défi de relecture et de correction", notionId: "ecriture_reviser", prerequis: ["cm2_ecrit_codes"] }, // → ECRIT_REVISER

  // ══ ORAL ══════════════════════════════════════════════════════════════════
  // BO : « Écouter pour comprendre » · « Dire pour être compris dans toutes les
  // disciplines » · « Participer à des échanges verbaux ».
  { id: "cm2_oral_ecouter", label: "Écouter pour comprendre une idée principale et des détails", notionId: "oral_ecouter", prerequis: [] }, // → ORAL
  { id: "cm2_oral_reformuler", label: "Reformuler et synthétiser un propos entendu", notionId: "oral_ecouter", prerequis: ["cm2_oral_ecouter"] }, // → ORAL
  { id: "cm2_oral_ecouter_defi", label: "Relever un défi d'écoute", notionId: "oral_ecouter", prerequis: ["cm2_oral_reformuler"] }, // → ORAL

  { id: "cm2_oral_presenter", label: "Présenter un travail avec un vocabulaire précis", notionId: "oral_echanger", prerequis: ["cm2_oral_reformuler"] }, // → ORAL
  { id: "cm2_oral_argumenter", label: "Argumenter en donnant preuve ou exemple", notionId: "oral_echanger", prerequis: ["cm2_oral_presenter"] }, // → ORAL
  { id: "cm2_oral_debat", label: "Participer à un débat réglé", notionId: "oral_echanger", prerequis: ["cm2_oral_argumenter"] }, // → ORAL
  { id: "cm2_oral_defi", label: "Relever un défi d'oral", notionId: "oral_echanger", prerequis: ["cm2_oral_debat"] }, // → ORAL

  // ══ VOCABULAIRE ═══════════════════════════════════════════════════════════
  // BO : « Se servir du contexte et de la morphologie pour comprendre les mots
  // inconnus » · « Approfondir sa compréhension de la notion de polysémie dans
  // un contexte non référentiel » · « UTILISER DES DICTIONNAIRES ».
  { id: "cm2_voc_contexte", label: "Inférer le sens d'un mot par le contexte", notionId: "vocabulaire_sens", prerequis: ["cm2_comp_autonomie"] }, // → VOC_CONTEXTE
  { id: "cm2_voc_polysemie", label: "Distinguer plusieurs sens d'un mot", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_contexte"] }, // → VOC_POLYSEMIE
  { id: "cm2_voc_sens_figure", label: "Distinguer le sens propre et le sens figuré", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_polysemie"] }, // → SENS_FIGURE
  { id: "cm2_voc_nuance", label: "Choisir un mot selon une nuance de sens", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_polysemie"] }, // → VOC_SYN_ANT
  { id: "cm2_voc_sens_defi", label: "Relever un défi sur le sens des mots", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_sens_figure", "cm2_voc_nuance"] }, // → défi lexique

  { id: "cm2_voc_famille_prefixe_suffixe", label: "Utiliser familles de mots, préfixes et suffixes", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_contexte"] }, // → VOC_FAMILLE
  { id: "cm2_voc_racines", label: "Reconnaitre une racine latine ou grecque", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_famille_prefixe_suffixe"] }, // → RACINES
  { id: "cm2_voc_composition", label: "Comprendre un mot formé par composition", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_famille_prefixe_suffixe"] }, // → COMPOSITION
  { id: "cm2_voc_homonymie", label: "Distinguer des homonymes", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_composition"] }, // → HOMONYMIE
  { id: "cm2_voc_formation_defi", label: "Relever un défi sur la formation des mots", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_racines", "cm2_voc_homonymie"] }, // → défi lexique

  { id: "cm2_voc_niveau_langue", label: "Identifier le niveau de langue d'un mot ou d'une expression", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_contexte"] }, // → NIVEAU_LANGUE
  { id: "cm2_voc_reemploi", label: "Réemployer le vocabulaire étudié dans un écrit", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_niveau_langue"] }, // → VOC_REEMPLOI
  { id: "cm2_voc_orthographe", label: "Mémoriser et vérifier l'orthographe lexicale", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_reemploi"] }, // → VOC_ORTH
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026 : « Utiliser des
     dictionnaires ». Chercher un mot n'est pas le deviner. */
  { id: "cm2_voc_dictionnaire", label: "Chercher un mot dans un dictionnaire et lire son article", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_contexte"] }, // → DICTIONNAIRE
  { id: "cm2_voc_emploi_defi", label: "Relever un défi d'emploi et d'orthographe des mots", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_orthographe", "cm2_voc_dictionnaire"] }, // → défi lexique

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ═════════════════════════════════

  // ── « Analyser une phrase simple » ────────────────────────────────────────
  // BO : « Consolider l'identification des différents types de sujets rencontrés
  // au CM1 » · « IDENTIFIER LE SUJET INVERSÉ dans des cas simples » ·
  // « Consolider l'identification du groupe sujet, groupe verbal, groupe
  // circonstanciel » · « MOBILISER LES MANIPULATIONS SYNTAXIQUES dans les
  // activités langagières ».
  { id: "cm2_gram_phrase_simple", label: "Analyser les constituants d'une phrase simple", notionId: "grammaire_phrase", prerequis: ["cm2_flue_unites_syntaxiques"] }, // → PHRASE_SIMPLE
  { id: "cm2_gram_sujet_verbe", label: "Identifier sujet, verbe et compléments", notionId: "grammaire_phrase", prerequis: ["cm2_gram_phrase_simple"] }, // → SUJET_VERBE
  { id: "cm2_gram_sujet_inverse", label: "Identifier un sujet inversé", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_verbe"] }, // → SUJET_INVERSE
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026 — alors que le CM1 le
     porte. Déplacer, supprimer, remplacer, encadrer : c'est ce qui remplace la
     définition récitée, et ce qu'attend aussi le CRPE. */
  { id: "cm2_gram_manipulations", label: "Déplacer, supprimer, remplacer pour reconnaitre un groupe", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_verbe"] }, // → MANIPULATIONS
  { id: "cm2_gram_phrase_defi", label: "Résoudre un défi d'analyse de la phrase", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_inverse", "cm2_gram_manipulations"] }, // → défi phrase

  // ── « Distinguer nature/classe grammaticale et fonction » ─────────────────
  // BO : « Connaitre et distinguer les notions de nature et fonction » ·
  // « DISTINGUER LES NATURES/CLASSES GRAMMATICALES DE MOTS ET LES NATURES DES
  // GROUPES FONCTIONNELS ».
  { id: "cm2_gram_nature_fonction", label: "Distinguer la nature d'un mot et sa fonction", notionId: "grammaire_nature_fonction", prerequis: ["cm2_gram_sujet_verbe"] }, // → NATURE_FONCTION
  { id: "cm2_gram_classes_mots", label: "Nommer la classe grammaticale d'un mot", notionId: "grammaire_nature_fonction", prerequis: ["cm2_gram_nature_fonction"] }, // → CLASSES_MOTS
  { id: "cm2_gram_nature_fonction_defi", label: "Résoudre un défi sur la nature et la fonction", notionId: "grammaire_nature_fonction", prerequis: ["cm2_gram_classes_mots"] }, // → NATURE_FONCTION

  // ── Les compléments du verbe ──────────────────────────────────────────────
  // BO : « DIFFÉRENCIER ATTRIBUT DU SUJET ET COMPLÉMENT D'OBJET » ·
  // « Différencier complément d'objet direct et complément d'objet indirect » ·
  // « Différencier les compléments circonstanciels de temps, de lieu, de cause ».
  { id: "cm2_gram_complements", label: "Distinguer compléments de verbe et compléments circonstanciels", notionId: "grammaire_complements", prerequis: ["cm2_gram_sujet_verbe"] }, // → COMPLEMENTS
  { id: "cm2_gram_cod_coi", label: "Différencier complément d'objet direct et indirect", notionId: "grammaire_complements", prerequis: ["cm2_gram_complements"] }, // → COD_COI
  { id: "cm2_gram_cc_sortes", label: "Différencier les compléments circonstanciels de temps, de lieu et de cause", notionId: "grammaire_complements", prerequis: ["cm2_gram_complements"] }, // → CC_SORTES
  { id: "cm2_gram_attribut", label: "Différencier l'attribut du sujet et le complément d'objet", notionId: "grammaire_complements", prerequis: ["cm2_gram_cod_coi"] }, // → ATTRIBUT
  { id: "cm2_gram_complements_defi", label: "Résoudre un défi sur les compléments du verbe", notionId: "grammaire_complements", prerequis: ["cm2_gram_cc_sortes", "cm2_gram_attribut"] }, // → défi compléments

  // ── « Analyser le groupe nominal » ────────────────────────────────────────
  // BO : « Aborder la notion d'expansion du nom : adjectif et/ou groupe nominal
  // prépositionnel » · « Aborder la notion de complément du nom » ·
  // « DIFFÉRENCIER ÉPITHÈTE ET ATTRIBUT DU SUJET » · « Identifier et nommer les
  // prépositions » · « Identifier et nommer les conjonctions de subordination ».
  { id: "cm2_gram_gn", label: "Analyser le groupe nominal et ses expansions", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_phrase_simple"] }, // → GN
  { id: "cm2_gram_complement_nom", label: "Repérer le complément du nom et le distinguer de l'épithète", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_gn"] }, // → COMPLEMENT_NOM
  { id: "cm2_gram_prepositions", label: "Identifier prépositions et conjonctions de subordination", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_gn"] }, // → PREPOSITIONS
  /* ⚠️ Objectif nommé, sans micro jusqu'au 22/08/2026, et à ne pas confondre
     avec le précédent : LE CM2 OPPOSE L'ÉPITHÈTE À L'ATTRIBUT (« une plage
     déserte » / « la plage est déserte »), la 6e l'oppose au complément du nom.
     Deux oppositions, deux années, deux micros. */
  { id: "cm2_gram_epithete_attribut", label: "Différencier l'épithète et l'attribut du sujet", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_complement_nom", "cm2_gram_attribut"] }, // → EPITHETE_ATTRIBUT
  { id: "cm2_gram_gn_defi", label: "Résoudre un défi sur le groupe nominal", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_prepositions", "cm2_gram_epithete_attribut"] }, // → défi GN

  // ── « Identifier les mots selon leur nature » : les pronoms personnels ─────
  // BO : « RECONNAITRE LES DEUX TYPES DE PRONOMS PERSONNELS (SUJET,
  // COMPLÉMENTS) » · « IDENTIFIER LES PRONOMS PERSONNELS COMPLÉMENTS D'OBJET » ·
  // « CONNAITRE LES VARIATIONS DU PRONOM PERSONNEL (PERSONNE, NOMBRE,
  // FONCTION) ». Trois objectifs, aucune micro jusqu'au 22/08/2026.
  { id: "cm2_gram_pronoms", label: "Reconnaitre un pronom personnel sujet et un pronom complément", notionId: "grammaire_pronoms", prerequis: ["cm2_gram_sujet_verbe"] }, // → PRONOMS_SUJET_OBJET
  { id: "cm2_gram_pronoms_objet", label: "Identifier les pronoms personnels compléments d'objet", notionId: "grammaire_pronoms", prerequis: ["cm2_gram_pronoms"] }, // → PRONOMS_SUJET_OBJET
  { id: "cm2_gram_pronoms_variations", label: "Connaitre les variations du pronom personnel : personne, nombre, fonction", notionId: "grammaire_pronoms", prerequis: ["cm2_gram_pronoms_objet"] }, // → PRONOMS_SUJET_OBJET
  { id: "cm2_gram_pronoms_defi", label: "Résoudre un défi sur les pronoms personnels", notionId: "grammaire_pronoms", prerequis: ["cm2_gram_pronoms_variations"] }, // → PRONOMS_SUJET_OBJET

  // ── « Acquérir l'orthographe grammaticale » : les chaines d'accord ────────
  // BO : « Consolider la maitrise de la chaine d'accords dans le groupe nominal
  // pour les cas les plus réguliers » · « Repérer les groupes sujets inversés
  // dans un contexte de phrases simples, puis dans des cas plus complexes » ·
  // « Conjointement à la notion de fonction d'attribut du sujet, identifier et
  // appliquer la chaine d'accords sujet/verbe, sujet/attribut du sujet ».
  { id: "cm2_orth_accord_gn", label: "Accorder le groupe nominal avec expansions", notionId: "grammaire_accords", prerequis: ["cm2_gram_gn"] }, // → moteur d'accord du GN
  { id: "cm2_orth_sujet_verbe", label: "Accorder le verbe avec un sujet éloigné ou inversé simple", notionId: "grammaire_accords", prerequis: ["cm2_gram_sujet_inverse"] }, // → moteur sujet-verbe
  { id: "cm2_orth_attribut", label: "Accorder l'attribut avec le sujet", notionId: "grammaire_accords", prerequis: ["cm2_gram_attribut"] }, // → ACCORD_ATTRIBUT
  { id: "cm2_orth_homophones", label: "Choisir des homophones grammaticaux courants", notionId: "grammaire_accords", prerequis: ["cm2_orth_sujet_verbe"] }, // → HOMOPHONES
  { id: "cm2_orth_accords_defi", label: "Résoudre un défi d'accords", notionId: "grammaire_accords", prerequis: ["cm2_orth_accord_gn", "cm2_orth_attribut", "cm2_orth_homophones"] }, // → défi accords

  // ── « Se repérer dans la phrase complexe » ────────────────────────────────
  // BO CM2 : « Distinguer phrase simple et phrase complexe à partir du repérage
  // des verbes conjugués ». La 6e y ajoutera la notion de proposition.
  { id: "cm2_complexe_propositions", label: "Repérer deux propositions dans une phrase complexe", notionId: "phrase_complexe", prerequis: ["cm2_gram_phrase_simple"] }, // → PROPOSITION
  { id: "cm2_complexe_coordination", label: "Identifier juxtaposition et coordination simples", notionId: "phrase_complexe", prerequis: ["cm2_complexe_propositions"] }, // → ARTICULATION
  { id: "cm2_complexe_pronom_relatif", label: "Comprendre le rôle de qui, que, où dans une phrase", notionId: "phrase_complexe", prerequis: ["cm2_complexe_propositions"] }, // → PRONOM_RELATIF
  { id: "cm2_complexe_defi", label: "Résoudre un défi sur la phrase complexe", notionId: "phrase_complexe", prerequis: ["cm2_complexe_coordination", "cm2_complexe_pronom_relatif"] }, // → défi phrase complexe

  // ══ CONJUGAISON ═══════════════════════════════════════════════════════════
  // BO : « Conjugaisons à mémoriser et à maitriser : passé simple,
  // plus-que-parfait des verbes être et avoir, des verbes des premier et
  // deuxième groupes, des verbes irréguliers du troisième groupe : faire,
  // aller, dire, venir, pouvoir, voir, vouloir, prendre ».
  { id: "cm2_conj_infinitif_groupe", label: "Trouver infinitif, groupe et radical d'un verbe", notionId: "conjugaison_temps_simples", prerequis: ["cm2_gram_sujet_verbe"] }, // → moteur infinitif
  { id: "cm2_conj_present", label: "Conjuguer au présent les verbes fréquents et irréguliers", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_infinitif_groupe"] }, // → moteur présent
  { id: "cm2_conj_imparfait", label: "Conjuguer à l'imparfait", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_present"] }, // → moteur imparfait
  { id: "cm2_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_present"] }, // → moteur futur
  { id: "cm2_conj_simples_defi", label: "Résoudre un défi de conjugaison aux temps simples", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_imparfait", "cm2_conj_futur"] }, // → défi temps simples

  // ── Lire une forme verbale ────────────────────────────────────────────────
  // BO : « IDENTIFIER DANS LA TERMINAISON DES VERBES CONJUGUÉS : LA MARQUE DE
  // TEMPS ET LA MARQUE DE PERSONNE » · « CONSOLIDER LA CONNAISSANCE DES
  // VARIATIONS DU RADICAL pour certains verbes du premier groupe et du
  // troisième groupe ». Deux objectifs que le CM1 porte et que le CM2 avait
  // perdus en montant d'un an.
  { id: "cm2_conj_marques", label: "Isoler la marque de temps et la marque de personne", notionId: "conjugaison_formes", prerequis: ["cm2_conj_present"] }, // → MARQUES_TEMPS_PERSONNE
  { id: "cm2_conj_radical_variations", label: "Reconnaitre les variations du radical d'un verbe", notionId: "conjugaison_formes", prerequis: ["cm2_conj_marques"] }, // → RADICAL_VARIATIONS
  { id: "cm2_conj_marques_defi", label: "Résoudre un défi sur la forme d'un verbe conjugué", notionId: "conjugaison_formes", prerequis: ["cm2_conj_radical_variations"] }, // → MARQUES_TEMPS_PERSONNE

  // ── Les temps du récit ────────────────────────────────────────────────────
  { id: "cm2_conj_passe_compose", label: "Employer le passé composé avec être ou avoir", notionId: "conjugaison_recit", prerequis: ["cm2_conj_present"] }, // → CONJ_PASSE_COMPOSE
  { id: "cm2_conj_passe_simple_intro", label: "Conjuguer au passé simple les verbes fréquents", notionId: "conjugaison_recit", prerequis: ["cm2_conj_imparfait"] }, // → CONJ_PASSE_SIMPLE
  { id: "cm2_conj_plus_que_parfait", label: "Conjuguer au plus-que-parfait", notionId: "conjugaison_recit", prerequis: ["cm2_conj_passe_compose"] }, // → CONJ_PLUS_QUE_PARFAIT
  { id: "cm2_conj_valeur_temps", label: "Comprendre la valeur des temps dans un récit", notionId: "conjugaison_recit", prerequis: ["cm2_conj_passe_simple_intro"] }, // → CONJ_VALEUR_TEMPS
  { id: "cm2_conj_recit_defi", label: "Résoudre un défi sur les temps du récit", notionId: "conjugaison_recit", prerequis: ["cm2_conj_plus_que_parfait", "cm2_conj_valeur_temps"] }, // → défi récit

  // ── Les temps composés et le participe passé ──────────────────────────────
  // BO : « CONNAITRE LA COMPOSITION EN DEUX PARTIES (auxiliaire + participe
  // passé) DES TEMPS COMPOSÉS » · « Accorder le participe passé avec le sujet
  // dans le cas de l'auxiliaire être » · « Accorder le participe passé avec le
  // COD pour les verbes étudiés et conjugués avec l'auxiliaire avoir » ·
  // « EFFECTUER LA TRANSFORMATION À LA FORME NÉGATIVE d'un verbe aux temps
  // composés en plaçant les adverbes de négation au bon emplacement ».
  { id: "cm2_conj_passe_compose_forme", label: "Composer un temps composé : auxiliaire + participe passé", notionId: "conjugaison_participe", prerequis: ["cm2_conj_passe_compose"] }, // → CONJ_PASSE_COMPOSE
  { id: "cm2_orth_participe_passe", label: "Accorder le participe passé avec être, et avec le COD pour avoir", notionId: "conjugaison_participe", prerequis: ["cm2_conj_passe_compose_forme"] }, // → PARTICIPE_PASSE
  { id: "cm2_conj_negation_passe_compose", label: "Mettre un temps composé à la forme négative", notionId: "conjugaison_participe", prerequis: ["cm2_conj_passe_compose_forme"] }, // → CONJ_PASSE_COMPOSE
  { id: "cm2_conj_passe_compose_defi", label: "Résoudre un défi sur les temps composés", notionId: "conjugaison_participe", prerequis: ["cm2_orth_participe_passe", "cm2_conj_negation_passe_compose"] }, // → CONJ_PASSE_COMPOSE
];
