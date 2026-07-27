// Micro-compétences de français pour la classe de CM2.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025, application progressive au CM2.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // Lecture — fluence et expressivité
  { id: "cm2_flue_texte_long", label: "Lire à voix haute un texte long après préparation", notionId: "fluence_lecture", prerequis: [] },
  { id: "cm2_flue_unites_syntaxiques", label: "Respecter ponctuation, liaisons et unités syntaxiques", notionId: "fluence_lecture", prerequis: ["cm2_flue_texte_long"] },
  { id: "cm2_flue_120_mots", label: "Viser une lecture fluide autour de 120 mots par minute", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_flue_mise_en_voix", label: "Mettre en voix un texte avec intonation et effets", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_flue_plaisir_lire", label: "Lire avec aisance et plaisir pour un auditoire", notionId: "fluence_lecture", prerequis: ["cm2_flue_mise_en_voix"] },

  // Compréhension de textes et documents
  { id: "cm2_comp_autonomie", label: "Comprendre seul un texte plus long et plus complexe", notionId: "comprehension_textes_documents", prerequis: ["cm2_flue_texte_long"] },
  { id: "cm2_comp_essentiel", label: "Restituer l'essentiel d'un texte", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_autonomie"] },
  { id: "cm2_comp_implicite", label: "Identifier informations explicites et implicites", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_comp_genres", label: "Reconnaître les principaux genres littéraires", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_doc_composite", label: "Nommer les éléments d'un document composite", notionId: "comprehension_textes_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_doc_croiser_infos", label: "Croiser deux documents pour compléter une information", notionId: "comprehension_textes_documents", prerequis: ["cm2_doc_composite"] },

  // Lecture d'œuvres
  { id: "cm2_oeuvre_reference", label: "Relier une œuvre à une autre référence culturelle", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_genres"] },
  { id: "cm2_oeuvre_experience", label: "Relier une lecture à son expérience personnelle", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_reference"] },
  { id: "cm2_oeuvre_theme", label: "Identifier thème, personnages et enjeux d'une œuvre", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_oeuvre_carnet", label: "Tenir une trace personnelle et organisée de ses lectures", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_experience"] },
  { id: "cm2_oeuvre_choix", label: "Choisir une œuvre et justifier son choix", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_carnet"] },

  // Écriture
  { id: "cm2_ecrit_copie", label: "Copier efficacement un texte plus long", notionId: "ecriture", prerequis: [] },
  { id: "cm2_ecrit_notes", label: "Prendre des notes simples pour apprendre", notionId: "ecriture", prerequis: ["cm2_ecrit_copie"] },
  { id: "cm2_ecrit_plan", label: "Organiser ses idées avant d'écrire", notionId: "ecriture", prerequis: ["cm2_ecrit_notes"] },
  { id: "cm2_ecrit_paragraphe", label: "Construire plusieurs paragraphes cohérents", notionId: "ecriture", prerequis: ["cm2_ecrit_plan"] },
  { id: "cm2_ecrit_varie", label: "Produire récit, description, dialogue ou texte explicatif", notionId: "ecriture", prerequis: ["cm2_ecrit_paragraphe"] },
  { id: "cm2_ecrit_reviser", label: "Relire, corriger et enrichir son texte", notionId: "ecriture", prerequis: ["cm2_ecrit_varie"] },

  // Oral
  { id: "cm2_oral_ecouter", label: "Écouter pour comprendre une idée principale et des détails", notionId: "oral", prerequis: [] },
  { id: "cm2_oral_reformuler", label: "Reformuler et synthétiser un propos entendu", notionId: "oral", prerequis: ["cm2_oral_ecouter"] },
  { id: "cm2_oral_presenter", label: "Présenter un travail avec un vocabulaire précis", notionId: "oral", prerequis: ["cm2_oral_reformuler"] },
  { id: "cm2_oral_argumenter", label: "Argumenter en donnant preuve ou exemple", notionId: "oral", prerequis: ["cm2_oral_presenter"] },
  { id: "cm2_oral_debat", label: "Participer à un débat réglé", notionId: "oral", prerequis: ["cm2_oral_argumenter"] },

  // Vocabulaire
  { id: "cm2_voc_contexte", label: "Inférer le sens d'un mot par le contexte", notionId: "vocabulaire", prerequis: ["cm2_comp_autonomie"] },
  { id: "cm2_voc_famille_prefixe_suffixe", label: "Utiliser familles de mots, préfixes et suffixes", notionId: "vocabulaire", prerequis: ["cm2_voc_contexte"] },
  { id: "cm2_voc_nuance", label: "Choisir un mot selon une nuance de sens", notionId: "vocabulaire", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_polysemie", label: "Distinguer plusieurs sens d'un mot", notionId: "vocabulaire", prerequis: ["cm2_voc_contexte"] },
  { id: "cm2_voc_reemploi", label: "Réemployer le vocabulaire étudié dans un écrit", notionId: "vocabulaire", prerequis: ["cm2_voc_nuance", "cm2_voc_polysemie"] },
  { id: "cm2_voc_orthographe", label: "Mémoriser et vérifier l'orthographe lexicale", notionId: "vocabulaire", prerequis: ["cm2_voc_reemploi"] },

  // Grammaire et orthographe grammaticale
  { id: "cm2_gram_phrase_simple", label: "Analyser les constituants d'une phrase simple", notionId: "grammaire_orthographe", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_gram_sujet_verbe", label: "Identifier sujet, verbe et compléments", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_gram_gn", label: "Analyser le groupe nominal et ses expansions", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_complements", label: "Distinguer compléments de verbe et compléments circonstanciels", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_orth_accord_gn", label: "Accorder le groupe nominal avec expansions", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_gn"] },
  { id: "cm2_orth_sujet_verbe", label: "Accorder le verbe avec un sujet éloigné ou inversé simple", notionId: "grammaire_orthographe", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_orth_homophones", label: "Choisir des homophones grammaticaux courants", notionId: "grammaire_orthographe", prerequis: ["cm2_orth_sujet_verbe"] },

  // Phrase complexe
  { id: "cm2_complexe_propositions", label: "Repérer deux propositions dans une phrase complexe", notionId: "phrase_complexe", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_complexe_coordination", label: "Identifier juxtaposition et coordination simples", notionId: "phrase_complexe", prerequis: ["cm2_complexe_propositions"] },
  { id: "cm2_complexe_pronom_relatif", label: "Comprendre le rôle de qui, que, où dans une phrase", notionId: "phrase_complexe", prerequis: ["cm2_complexe_coordination"] },

  // Conjugaison
  { id: "cm2_conj_infinitif_groupe", label: "Trouver infinitif, groupe et radical d'un verbe", notionId: "conjugaison", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_conj_present", label: "Conjuguer au présent les verbes fréquents et irréguliers", notionId: "conjugaison", prerequis: ["cm2_conj_infinitif_groupe"] },
  { id: "cm2_conj_imparfait", label: "Conjuguer à l'imparfait", notionId: "conjugaison", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_passe_compose", label: "Employer le passé composé avec être ou avoir", notionId: "conjugaison", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_passe_simple_intro", label: "Reconnaître des formes simples du passé simple", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait"] },
  { id: "cm2_conj_valeur_temps", label: "Comprendre la valeur des temps dans un récit", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait", "cm2_conj_passe_compose"] },
];
