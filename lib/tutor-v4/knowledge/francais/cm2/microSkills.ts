// Micro-competences de francais pour la classe de CM2.
// Reference : programme officiel du cycle 3,
// BO n. 16 du 17 avril 2025, application progressive au CM2.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // Lecture - fluence et expressivite
  { id: "cm2_flue_texte_long", label: "Lire a voix haute un texte long apres preparation", notionId: "fluence_lecture", prerequis: [] },
  { id: "cm2_flue_unites_syntaxiques", label: "Respecter ponctuation, liaisons et unites syntaxiques", notionId: "fluence_lecture", prerequis: ["cm2_flue_texte_long"] },
  { id: "cm2_flue_120_mots", label: "Viser une lecture fluide autour de 120 mots par minute", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_flue_mise_en_voix", label: "Mettre en voix un texte avec intonation et effets", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_flue_plaisir_lire", label: "Lire avec aisance et plaisir pour un auditoire", notionId: "fluence_lecture", prerequis: ["cm2_flue_mise_en_voix"] },

  // Comprehension de textes et documents
  { id: "cm2_comp_autonomie", label: "Comprendre seul un texte plus long et plus complexe", notionId: "comprehension_textes_documents", prerequis: ["cm2_flue_texte_long"] },
  { id: "cm2_comp_essentiel", label: "Restituer l'essentiel d'un texte", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_autonomie"] },
  { id: "cm2_comp_implicite", label: "Identifier informations explicites et implicites", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_comp_genres", label: "Reconnaitre les principaux genres litteraires", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_doc_composite", label: "Nommer les elements d'un document composite", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_doc_croiser_infos", label: "Croiser deux documents pour completer une information", notionId: "comprehension_textes_documents", prerequis: ["cm2_doc_composite"] },

  // Lecture d'oeuvres
  { id: "cm2_oeuvre_reference", label: "Relier une oeuvre a une autre reference culturelle", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_genres"] },
  { id: "cm2_oeuvre_experience", label: "Relier une lecture a son experience personnelle", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_reference"] },
  { id: "cm2_oeuvre_theme", label: "Identifier theme, personnages et enjeux d'une oeuvre", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_oeuvre_carnet", label: "Tenir une trace personnelle et organisee de ses lectures", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_experience"] },
  { id: "cm2_oeuvre_choix", label: "Choisir une oeuvre et justifier son choix", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_carnet"] },

  // Ecriture
  { id: "cm2_ecrit_copie", label: "Copier efficacement un texte plus long", notionId: "ecriture", prerequis: [] },
  { id: "cm2_ecrit_notes", label: "Prendre des notes simples pour apprendre", notionId: "ecriture", prerequis: ["cm2_ecrit_copie"] },
  { id: "cm2_ecrit_plan", label: "Organiser ses idees avant d'ecrire", notionId: "ecriture", prerequis: ["cm2_ecrit_notes"] },
  { id: "cm2_ecrit_paragraphe", label: "Construire plusieurs paragraphes coherents", notionId: "ecriture", prerequis: ["cm2_ecrit_plan"] },
  { id: "cm2_ecrit_varie", label: "Produire recit, description, dialogue ou texte explicatif", notionId: "ecriture", prerequis: ["cm2_ecrit_paragraphe"] },
  { id: "cm2_ecrit_reviser", label: "Relire, corriger et enrichir son texte", notionId: "ecriture", prerequis: ["cm2_ecrit_varie"] },

  // Oral
  { id: "cm2_oral_ecouter", label: "Ecouter pour comprendre une idee principale et des details", notionId: "oral", prerequis: [] },
  { id: "cm2_oral_reformuler", label: "Reformuler et synthetiser un propos entendu", notionId: "oral", prerequis: ["cm2_oral_ecouter"] },
  { id: "cm2_oral_presenter", label: "Presenter un travail avec un vocabulaire precis", notionId: "oral", prerequis: ["cm2_oral_reformuler"] },
  { id: "cm2_oral_argumenter", label: "Argumenter en donnant preuve ou exemple", notionId: "oral", prerequis: ["cm2_oral_presenter"] },
  { id: "cm2_oral_debat", label: "Participer a un debat regle", notionId: "oral", prerequis: ["cm2_oral_argumenter"] },

  // Vocabulaire
  { id: "cm2_voc_contexte", label: "Inferer le sens d'un mot par le contexte", notionId: "vocabulaire", prerequis: ["cm2_comp_autonomie"] },
  { id: "cm2_voc_famille_prefixe_suffixe", label: "Utiliser familles de mots, prefixes et suffixes", notionId: "vocabulaire", prerequis: ["cm2_voc_contexte"] },
  { id: "cm2_voc_nuance", label: "Choisir un mot selon une nuance de sens", notionId: "vocabulaire", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_polysemie", label: "Distinguer plusieurs sens d'un mot", notionId: "vocabulaire", prerequis: ["cm2_voc_contexte"] },
  { id: "cm2_voc_reemploi", label: "Reemployer le vocabulaire etudie dans un ecrit", notionId: "vocabulaire", prerequis: ["cm2_voc_nuance", "cm2_voc_polysemie"] },
  { id: "cm2_voc_orthographe", label: "Memoriser et verifier l'orthographe lexicale", notionId: "vocabulaire", prerequis: ["cm2_voc_reemploi"] },

  // Grammaire et orthographe grammaticale
  { id: "cm2_gram_phrase_simple", label: "Analyser les constituants d'une phrase simple", notionId: "grammaire_orthographe", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_gram_sujet_verbe", label: "Identifier sujet, verbe et complements", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_gram_gn", label: "Analyser le groupe nominal et ses expansions", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_complements", label: "Distinguer complements de verbe et complements circonstanciels", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_orth_accord_gn", label: "Accorder le groupe nominal avec expansions", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_gn"] },
  { id: "cm2_orth_sujet_verbe", label: "Accorder le verbe avec un sujet eloigne ou inverse simple", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_orth_homophones", label: "Choisir des homophones grammaticaux courants", notionId: "grammaire_orthographe", prerequis: ["cm2_orth_sujet_verbe"] },

  // Phrase complexe
  { id: "cm2_complexe_propositions", label: "Reperer deux propositions dans une phrase complexe", notionId: "phrase_complexe", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_complexe_coordination", label: "Identifier juxtaposition et coordination simples", notionId: "phrase_complexe", prerequis: ["cm2_complexe_propositions"] },
  { id: "cm2_complexe_pronom_relatif", label: "Comprendre le role de qui, que, ou dans une phrase", notionId: "phrase_complexe", prerequis: ["cm2_complexe_coordination"] },

  // Conjugaison
  { id: "cm2_conj_infinitif_groupe", label: "Trouver infinitif, groupe et radical d'un verbe", notionId: "conjugaison", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_conj_present", label: "Conjuguer au present les verbes frequents et irreguliers", notionId: "conjugaison", prerequis: ["cm2_conj_infinitif_groupe"] },
  { id: "cm2_conj_imparfait", label: "Conjuguer a l'imparfait", notionId: "conjugaison", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_passe_compose", label: "Employer le passe compose avec etre ou avoir", notionId: "conjugaison", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_passe_simple_intro", label: "Reconnaitre des formes simples du passe simple", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait"] },
  { id: "cm2_conj_valeur_temps", label: "Comprendre la valeur des temps dans un recit", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait", "cm2_conj_passe_compose"] },
];
