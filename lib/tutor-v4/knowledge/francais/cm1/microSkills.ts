// Micro-competences de francais pour la classe de CM1.
// Reference : programme officiel du cycle 3,
// BO n. 16 du 17 avril 2025, applicable au CM1 a la rentree 2025.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // Lecture - fluence et expressivite
  { id: "cm1_flue_page", label: "Lire sans effort un texte d'une page", notionId: "fluence_lecture", prerequis: [] },
  { id: "cm1_flue_ponctuation", label: "Lire en respectant ponctuation et groupes de sens", notionId: "fluence_lecture", prerequis: ["cm1_flue_page"] },
  { id: "cm1_flue_mots_irreguliers", label: "Reconnaitre des mots frequents et irreguliers", notionId: "fluence_lecture", prerequis: ["cm1_flue_page"] },
  { id: "cm1_flue_110_mots", label: "Viser une lecture fluide autour de 110 mots par minute", notionId: "fluence_lecture", prerequis: ["cm1_flue_ponctuation"] },
  { id: "cm1_flue_expressive", label: "Lire a voix haute avec aisance et expressivite", notionId: "fluence_lecture", prerequis: ["cm1_flue_ponctuation"] },

  // Comprehension de textes et documents
  { id: "cm1_comp_strategies", label: "Utiliser des strategies de comprehension", notionId: "comprehension_textes_documents", prerequis: ["cm1_flue_page"] },
  { id: "cm1_comp_explicite", label: "Reperer les informations explicites", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_strategies"] },
  { id: "cm1_comp_implicite", label: "Pointer une information implicite simple", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_comp_genres", label: "Distinguer theatre, poeme, recit et documentaire", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_doc_source", label: "Donner la nature et la source d'un document", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_doc_infos", label: "Prelever des informations dans un document simple", notionId: "comprehension_textes_documents", prerequis: ["cm1_doc_source"] },

  // Lecture d'oeuvres
  { id: "cm1_oeuvre_lien", label: "Relier un texte a une oeuvre lue en classe", notionId: "lecture_oeuvres", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_oeuvre_reaction", label: "Exprimer une reaction personnelle de lecteur", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_lien"] },
  { id: "cm1_oeuvre_personnages", label: "Identifier heros, personnages et relations", notionId: "lecture_oeuvres", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_oeuvre_carnet", label: "Garder trace de ses lectures", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_reaction"] },
  { id: "cm1_oeuvre_perseverer", label: "S'engager et perseverer dans une lecture longue", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_carnet"] },

  // Ecriture
  { id: "cm1_ecrit_copie", label: "Copier un texte court avec soin et efficacite", notionId: "ecriture", prerequis: [] },
  { id: "cm1_ecrit_notes", label: "Ecrire pour retenir une idee ou une information", notionId: "ecriture", prerequis: ["cm1_ecrit_copie"] },
  { id: "cm1_ecrit_phrase", label: "Construire des phrases claires et correctement ponctuees", notionId: "ecriture", prerequis: ["cm1_ecrit_notes"] },
  { id: "cm1_ecrit_paragraphe", label: "Organiser un paragraphe coherent", notionId: "ecriture", prerequis: ["cm1_ecrit_phrase"] },
  { id: "cm1_ecrit_recit", label: "Produire un court recit ou une description", notionId: "ecriture", prerequis: ["cm1_ecrit_paragraphe"] },
  { id: "cm1_ecrit_reviser", label: "Relire et ameliorer son ecrit", notionId: "ecriture", prerequis: ["cm1_ecrit_recit"] },

  // Oral
  { id: "cm1_oral_ecouter", label: "Ecouter pour comprendre un texte ou une consigne", notionId: "oral", prerequis: [] },
  { id: "cm1_oral_reformuler", label: "Reformuler une information entendue", notionId: "oral", prerequis: ["cm1_oral_ecouter"] },
  { id: "cm1_oral_presenter", label: "Presenter clairement une lecture ou un travail", notionId: "oral", prerequis: ["cm1_oral_reformuler"] },
  { id: "cm1_oral_argumenter", label: "Donner un avis justifie", notionId: "oral", prerequis: ["cm1_oral_presenter"] },
  { id: "cm1_oral_echanger", label: "Participer a un echange en respectant la parole d'autrui", notionId: "oral", prerequis: ["cm1_oral_argumenter"] },

  // Vocabulaire
  { id: "cm1_voc_contexte", label: "Comprendre un mot inconnu grace au contexte", notionId: "vocabulaire", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_voc_famille", label: "Identifier racine, familles de mots et derivation", notionId: "vocabulaire", prerequis: ["cm1_voc_contexte"] },
  { id: "cm1_voc_syn_ant", label: "Utiliser synonymes et antonymes", notionId: "vocabulaire", prerequis: ["cm1_voc_famille"] },
  { id: "cm1_voc_polysemie", label: "Distinguer les sens d'un mot polysemique", notionId: "vocabulaire", prerequis: ["cm1_voc_contexte"] },
  { id: "cm1_voc_reemploi", label: "Reemployer le vocabulaire etudie dans une phrase", notionId: "vocabulaire", prerequis: ["cm1_voc_syn_ant", "cm1_voc_polysemie"] },
  { id: "cm1_voc_orthographe", label: "Memoriser l'orthographe des mots etudies", notionId: "vocabulaire", prerequis: ["cm1_voc_reemploi"] },

  // Grammaire et orthographe grammaticale
  { id: "cm1_gram_phrase_simple", label: "Identifier les constituants d'une phrase simple", notionId: "grammaire_orthographe", prerequis: ["cm1_flue_ponctuation"] },
  { id: "cm1_gram_sujet_verbe", label: "Identifier sujet et verbe conjugue", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_phrase_simple"] },
  { id: "cm1_gram_gn", label: "Identifier le groupe nominal et ses expansions simples", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_sujet_verbe"] },
  { id: "cm1_gram_complements", label: "Reperer complements essentiels et circonstanciels simples", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_sujet_verbe"] },
  { id: "cm1_orth_accord_gn", label: "Accorder determinant, nom et adjectif", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_gn"] },
  { id: "cm1_orth_sujet_verbe", label: "Accorder le verbe avec son sujet", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_sujet_verbe"] },
  { id: "cm1_orth_homophones", label: "Distinguer des homophones grammaticaux courants", notionId: "grammaire_orthographe", prerequis: ["cm1_orth_sujet_verbe"] },

  // Conjugaison
  { id: "cm1_conj_infinitif_groupe", label: "Trouver l'infinitif et le groupe d'un verbe", notionId: "conjugaison", prerequis: ["cm1_gram_sujet_verbe"] },
  { id: "cm1_conj_present", label: "Conjuguer au present les verbes frequents", notionId: "conjugaison", prerequis: ["cm1_conj_infinitif_groupe"] },
  { id: "cm1_conj_imparfait", label: "Conjuguer a l'imparfait", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  { id: "cm1_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  { id: "cm1_conj_passe_compose", label: "Former le passe compose avec etre ou avoir", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  { id: "cm1_conj_valeur_temps", label: "Choisir le temps adapte au sens de la phrase", notionId: "conjugaison", prerequis: ["cm1_conj_imparfait", "cm1_conj_futur", "cm1_conj_passe_compose"] },
];
