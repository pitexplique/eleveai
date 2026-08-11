// Micro-compétences de français pour la classe de CM1.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025, applicable au CM1 depuis la rentrée 2025.
//
// ⚠️ RELU SUR LE TEXTE DU BO le 11/08/2026, rubrique « Grammaire et
// orthographe grammaticale — Cours moyen première année ». Onze objectifs
// d'apprentissage nommés par le programme n'avaient aucune micro-compétence.
// Le CM1 sautait directement aux constituants de la phrase, sans jamais
// nommer les classes de mots ni les types de phrases — que le CE2 travaille
// pourtant, et que le BO redemande ici sur des corpus plus longs.
// La couverture affichait 46/46 : 100 % de ce que la banque déclarait.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // Lecture - fluence et expressivité
  { id: "cm1_flue_page", label: "Lire sans effort un texte d'une page", notionId: "fluence_lecture", prerequis: [] },
  { id: "cm1_flue_ponctuation", label: "Lire en respectant ponctuation et groupes de sens", notionId: "fluence_lecture", prerequis: ["cm1_flue_page"] },
  { id: "cm1_flue_mots_irreguliers", label: "Reconnaître des mots fréquents et irréguliers", notionId: "fluence_lecture", prerequis: ["cm1_flue_page"] },
  { id: "cm1_flue_110_mots", label: "Viser une lecture fluide autour de 110 mots par minute", notionId: "fluence_lecture", prerequis: ["cm1_flue_ponctuation"] },
  { id: "cm1_flue_expressive", label: "Lire à voix haute avec aisance et expressivité", notionId: "fluence_lecture", prerequis: ["cm1_flue_ponctuation"] },

  // Compréhension de textes et documents
  { id: "cm1_comp_strategies", label: "Utiliser des stratégies de compréhension", notionId: "comprehension_textes_documents", prerequis: ["cm1_flue_page"] },
  { id: "cm1_comp_explicite", label: "Repérer les informations explicites", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_strategies"] },
  { id: "cm1_comp_implicite", label: "Pointer une information implicite simple", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_comp_genres", label: "Distinguer théâtre, poème, récit et documentaire", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_doc_source", label: "Donner la nature et la source d'un document", notionId: "comprehension_textes_documents", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_doc_infos", label: "Prélever des informations dans un document simple", notionId: "comprehension_textes_documents", prerequis: ["cm1_doc_source"] },

  // Lecture d'œuvres
  { id: "cm1_oeuvre_lien", label: "Relier un texte à une œuvre lue en classe", notionId: "lecture_oeuvres", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_oeuvre_reaction", label: "Exprimer une réaction personnelle de lecteur", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_lien"] },
  { id: "cm1_oeuvre_personnages", label: "Identifier héros, personnages et relations", notionId: "lecture_oeuvres", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_oeuvre_carnet", label: "Garder trace de ses lectures", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_reaction"] },
  { id: "cm1_oeuvre_perseverer", label: "S'engager et persévérer dans une lecture longue", notionId: "lecture_oeuvres", prerequis: ["cm1_oeuvre_carnet"] },

  // Écriture
  { id: "cm1_ecrit_copie", label: "Copier un texte court avec soin et efficacité", notionId: "ecriture", prerequis: [] },
  { id: "cm1_ecrit_notes", label: "Écrire pour retenir une idée ou une information", notionId: "ecriture", prerequis: ["cm1_ecrit_copie"] },
  { id: "cm1_ecrit_phrase", label: "Construire des phrases claires et correctement ponctuées", notionId: "ecriture", prerequis: ["cm1_ecrit_notes"] },
  { id: "cm1_ecrit_paragraphe", label: "Organiser un paragraphe cohérent", notionId: "ecriture", prerequis: ["cm1_ecrit_phrase"] },
  { id: "cm1_ecrit_recit", label: "Produire un court récit ou une description", notionId: "ecriture", prerequis: ["cm1_ecrit_paragraphe"] },
  { id: "cm1_ecrit_reviser", label: "Relire et améliorer son écrit", notionId: "ecriture", prerequis: ["cm1_ecrit_recit"] },

  // Oral
  { id: "cm1_oral_ecouter", label: "Écouter pour comprendre un texte ou une consigne", notionId: "oral", prerequis: [] },
  { id: "cm1_oral_reformuler", label: "Reformuler une information entendue", notionId: "oral", prerequis: ["cm1_oral_ecouter"] },
  { id: "cm1_oral_presenter", label: "Présenter clairement une lecture ou un travail", notionId: "oral", prerequis: ["cm1_oral_reformuler"] },
  { id: "cm1_oral_argumenter", label: "Donner un avis justifié", notionId: "oral", prerequis: ["cm1_oral_presenter"] },
  { id: "cm1_oral_echanger", label: "Participer à un échange en respectant la parole d'autrui", notionId: "oral", prerequis: ["cm1_oral_argumenter"] },

  // Vocabulaire
  { id: "cm1_voc_contexte", label: "Comprendre un mot inconnu grâce au contexte", notionId: "vocabulaire", prerequis: ["cm1_comp_explicite"] },
  { id: "cm1_voc_famille", label: "Identifier racine, familles de mots et dérivation", notionId: "vocabulaire", prerequis: ["cm1_voc_contexte"] },
  { id: "cm1_voc_syn_ant", label: "Utiliser synonymes et antonymes", notionId: "vocabulaire", prerequis: ["cm1_voc_famille"] },
  { id: "cm1_voc_polysemie", label: "Distinguer les sens d'un mot polysémique", notionId: "vocabulaire", prerequis: ["cm1_voc_contexte"] },
  { id: "cm1_voc_reemploi", label: "Réemployer le vocabulaire étudié dans une phrase", notionId: "vocabulaire", prerequis: ["cm1_voc_syn_ant", "cm1_voc_polysemie"] },
  { id: "cm1_voc_orthographe", label: "Mémoriser l'orthographe des mots étudiés", notionId: "vocabulaire", prerequis: ["cm1_voc_reemploi"] },

  // Grammaire et orthographe grammaticale
  // ⚠️ Les onze micros marquées ci-dessous manquaient au 11/08/2026.
  // « Connaître les trois types de phrases et leurs formes » : rubrique entière
  // du BO au CM1, sans une seule micro-compétence.
  { id: "cm1_gram_types_phrases", label: "Identifier les trois types de phrases et leurs formes", notionId: "grammaire_orthographe", prerequis: ["cm1_flue_ponctuation"] },
  { id: "cm1_gram_transformer_phrase", label: "Transformer une phrase d'un type ou d'une forme à l'autre", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_types_phrases"] },
  { id: "cm1_gram_phrase_simple", label: "Identifier les constituants d'une phrase simple", notionId: "grammaire_orthographe", prerequis: ["cm1_flue_ponctuation"] },
  { id: "cm1_gram_sujet_verbe", label: "Identifier sujet et verbe conjugué", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_phrase_simple"] },
  // « Se familiariser avec les notions de nature et fonction »
  { id: "cm1_gram_nature_fonction", label: "Se familiariser avec les notions de nature et de fonction", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_phrase_simple"] },
  // « Identifier et nommer les déterminants […] les conjonctions de
  //   coordination […] les adverbes les plus fréquents »
  { id: "cm1_gram_classes_mots", label: "Identifier déterminants, conjonctions de coordination et adverbes", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_nature_fonction"] },
  // « Distinguer les pronoms personnels sujets des pronoms personnels
  //   compléments » et « Remplacer un groupe nominal sujet / objet par un pronom »
  { id: "cm1_gram_pronoms", label: "Distinguer les pronoms personnels sujets et compléments", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_classes_mots"] },
  { id: "cm1_gram_gn", label: "Identifier le groupe nominal et ses expansions simples", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_sujet_verbe"] },
  // « Repérer et nommer le nom noyau » et « Aborder la notion d'épithète »
  { id: "cm1_gram_gn_epithete", label: "Repérer le nom noyau et aborder la notion d'épithète", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_gn"] },
  { id: "cm1_gram_complements", label: "Repérer compléments essentiels et circonstanciels simples", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_sujet_verbe"] },
  // « différencier complément d'objet direct et complément d'objet indirect
  //   dans des phrases prototypiques sans ambigüité »
  { id: "cm1_gram_cod_coi", label: "Différencier complément d'objet direct et indirect", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_complements"] },
  // « Comprendre et utiliser les manipulations syntaxiques : déplacement,
  //   suppression, substitution, addition, encadrement »
  { id: "cm1_gram_manipulations", label: "Utiliser les manipulations syntaxiques", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_complements"] },
  { id: "cm1_orth_accord_gn", label: "Accorder déterminant, nom et adjectif", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_gn"] },
  { id: "cm1_orth_sujet_verbe", label: "Accorder le verbe avec son sujet", notionId: "grammaire_orthographe", prerequis: ["cm1_gram_sujet_verbe"] },
  // « Accorder le participe passé avec le sujet dans le cas de l'emploi avec
  //   l'auxiliaire être » — ⛔ l'auxiliaire AVOIR n'est PAS au programme du CM1 :
  //   il entre au CM2. Le pool est donc distinct de celui du CM2.
  { id: "cm1_orth_participe_passe_etre", label: "Accorder le participe passé avec être", notionId: "grammaire_orthographe", prerequis: ["cm1_orth_sujet_verbe"] },
  { id: "cm1_orth_homophones", label: "Distinguer des homophones grammaticaux courants", notionId: "grammaire_orthographe", prerequis: ["cm1_orth_sujet_verbe"] },

  // Conjugaison
  { id: "cm1_conj_infinitif_groupe", label: "Trouver l'infinitif et le groupe d'un verbe", notionId: "conjugaison", prerequis: ["cm1_gram_sujet_verbe"] },
  { id: "cm1_conj_present", label: "Conjuguer au présent les verbes fréquents", notionId: "conjugaison", prerequis: ["cm1_conj_infinitif_groupe"] },
  { id: "cm1_conj_imparfait", label: "Conjuguer à l'imparfait", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  { id: "cm1_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  { id: "cm1_conj_passe_compose", label: "Former le passé composé avec être ou avoir", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  // « Identifier […] la composition de la terminaison des verbes conjugués : la
  //   marque de temps et la marque de personne » ; « Savoir isoler et connaître
  //   les marques de temps de l'imparfait (-ai-, -i-) ; du futur (-r-) »
  { id: "cm1_conj_marques", label: "Isoler les marques de temps et de personne dans un verbe conjugué", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  // « Mettre en évidence les variations du radical pour certains verbes du
  //   premier groupe (verbes en -yer, en -eler et -eter, en -cer, -ger) »
  { id: "cm1_conj_radical_variations", label: "Repérer les variations du radical des verbes du premier groupe", notionId: "conjugaison", prerequis: ["cm1_conj_present"] },
  // ⚠️ Le BO n'introduit formellement la VALEUR des temps qu'en 6e. Au CM1,
  //    cette micro reste légitime — choisir le temps qui convient au sens est
  //    une activité d'écriture — mais elle est en avance sur le programme, et
  //    c'est volontaire. Ne pas la prendre pour un attendu du CM1.
  { id: "cm1_conj_valeur_temps", label: "Choisir le temps adapté au sens de la phrase", notionId: "conjugaison", prerequis: ["cm1_conj_imparfait", "cm1_conj_futur", "cm1_conj_passe_compose"] },
];
