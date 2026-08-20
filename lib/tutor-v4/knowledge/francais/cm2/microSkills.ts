// Micro-compétences de français pour la classe de CM2.
// Référence : programme officiel du cycle 3,
// BO n° 16 du 17 avril 2025. ⚠️ Le CM1 et la 6e y sont passés à la rentrée
// 2025 ; le CM2 y bascule à la rentrée 2026 — ce n'est plus « progressif ».
//
// ⚠️ RELU SUR LE TEXTE DU BO le 11/08/2026, rubrique « Grammaire et
// orthographe grammaticale — Cours moyen deuxième année ». Dix objectifs
// d'apprentissage nommés par le programme n'avaient AUCUNE micro-compétence :
//   — « Différencier attribut du sujet et complément d'objet » ;
//   — « Différencier complément d'objet direct et complément d'objet
//     indirect » ;
//   — « Différencier les compléments circonstanciels de temps, de lieu, de
//     cause » ;
//   — « Identifier le sujet inversé dans des cas simples » ;
//   — « Connaître et distinguer les notions de nature et fonction » ;
//   — « Identifier et nommer les prépositions » et « les conjonctions de
//     subordination » ;
//   — « Aborder la notion de complément du nom » et « différencier épithète et
//     attribut du sujet » ;
//   — « identifier et appliquer la chaîne d'accords sujet/attribut du sujet » ;
//   — « Accorder le participe passé avec le sujet dans le cas de l'emploi avec
//     l'auxiliaire être » et « avec le COD pour les verbes conjugués avec
//     l'auxiliaire avoir » ;
//   — « Conjugaisons à mémoriser et à maîtriser : passé simple,
//     plus-que-parfait ».
// Elles sont déclarées ci-dessous. La couverture affichait 50/50 — 100 % de ce
// que la banque déclarait, pas du programme.

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

  // Culture littéraire et artistique — LES SIX ENTRÉES DU COURS MOYEN.
  // ⚠️ Ajoutées le 11/08/2026, identiques à celles du CM1 : le BO ne change
  // pas les thèmes d'une année sur l'autre, il demande une progression dans
  // « la difficulté et la quantité des lectures ».
  { id: "cm2_cult_heros", label: "Découvrir des héroïnes, des héros", notionId: "culture_litteraire", prerequis: ["cm2_oeuvre_theme"] },
  { id: "cm2_cult_merveilleux", label: "Se confronter au merveilleux, à l'étrange", notionId: "culture_litteraire", prerequis: ["cm2_oeuvre_theme"] },
  { id: "cm2_cult_autres_vies", label: "Imaginer et vivre d'autres vies", notionId: "culture_litteraire", prerequis: ["cm2_cult_heros"] },
  { id: "cm2_cult_morale", label: "Comprendre et interroger la morale", notionId: "culture_litteraire", prerequis: ["cm2_cult_heros"] },
  { id: "cm2_cult_poesie", label: "Savourer le goût des mots, imaginer et créer en poésie", notionId: "culture_litteraire", prerequis: ["cm2_oeuvre_experience"] },
  { id: "cm2_cult_rapport_autres", label: "Se découvrir, s'affirmer dans le rapport aux autres", notionId: "culture_litteraire", prerequis: ["cm2_cult_autres_vies"] },

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

  /* CINQ MICRO-COMPÉTENCES AJOUTÉES LE 15/08/2026, sur deux sources qui se
     recoupent — les « Attendus de fin d'année de CM2 » (annexe 9, Français) et
     les résultats 2025 d'un collège de l'île, item par item.

     ⭐ Les attendus demandent explicitement, sous « Enrichir le lexique » :
     les racines latines et grecques, la notion d'homonymie, la formation des
     mots par composition. Aucune des trois n'était déclarée.

     ⭐ Et l'évaluation nationale de 6ᵉ mesure deux choses qui manquaient
     aussi, avec les écarts au national les plus lourds de toute l'épreuve :
     « identifier le niveau de langue d'une expression » (26 % de réussite
     contre 57 % au national) et « déduire le sens d'une expression figurée »
     (64 % contre 82 %). `cm2_voc_nuance` n'en dit rien : choisir une nuance de
     sens, ce n'est pas reconnaître un registre.

     ⚠️ Chacune reçoit son POOL dédié dans buildCycle3FrancaisBank —
     `questionParMicro`. Sans cela le builder les servirait depuis le pool
     générique du vocabulaire : des questions valides, mais hors sujet, et
     aucun vérificateur ne peut le voir. C'est exactement ce qui était arrivé
     à `phrase_complexe`. */
  { id: "cm2_voc_sens_figure", label: "Distinguer le sens propre et le sens figuré", notionId: "vocabulaire", prerequis: ["cm2_voc_polysemie"] },
  { id: "cm2_voc_niveau_langue", label: "Identifier le niveau de langue d'un mot ou d'une expression", notionId: "vocabulaire", prerequis: ["cm2_voc_nuance"] },
  { id: "cm2_voc_racines", label: "Reconnaître une racine latine ou grecque", notionId: "vocabulaire", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_composition", label: "Comprendre un mot formé par composition", notionId: "vocabulaire", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_homonymie", label: "Distinguer des homonymes", notionId: "vocabulaire", prerequis: ["cm2_voc_polysemie"] },

  /* ─── LES SEIZE MICROS DE GRAMMAIRE, EN TROIS NOTIONS (20/08/2026) ─────────
     Frédéric : « 16 micros c'est 3 fiches, il faut découper en trois », et
     « 5 micros max plus défis, 7 max » — c'est le format du coach de maths
     CM2, où chaque notion tient en 4 à 6 micros et se termine par son défi.
     Une notion à seize micros ne donne pas une fiche honnête : la première
     fiche de français en citait certains sans les traiter (« prépositions »
     n'y avait qu'un piège, « sujet inversé » qu'un exemple).

     Le découpage suit LES PRÉREQUIS DÉJÀ ÉCRITS, il ne les invente pas :
       • `grammaire_phrase`      — le squelette. On cherche le verbe, son sujet,
         et on se donne le vocabulaire pour en parler. La préposition y est
         parce que son prérequis déclaré est `nature_fonction` : l'identifier,
         c'est un travail de NATURE, pas de fonction.
       • `grammaire_complements` — tout ce qui complète : le verbe (objet,
         circonstanciel, attribut) et le nom (groupe nominal, complément du
         nom). Les six ont leurs prérequis à l'intérieur du groupe.
       • `grammaire_accords`     — exactement les cinq micros `orth_` : on
         n'identifie plus, on écrit sans faute. C'est aussi, telle quelle, une
         rubrique de l'écrit du CRPE.
     Un prérequis peut traverser les trois notions (l'accord du verbe suppose
     qu'on sache trouver le sujet) : c'est déjà le cas ailleurs, et c'est ce
     qui donne l'ordre des fiches. */

  // Grammaire — la phrase (5 micros + 1 défi)
  { id: "cm2_gram_phrase_simple", label: "Analyser les constituants d'une phrase simple", notionId: "grammaire_phrase", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_gram_sujet_verbe", label: "Identifier sujet, verbe et compléments", notionId: "grammaire_phrase", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_gram_nature_fonction", label: "Distinguer la nature d'un mot et sa fonction", notionId: "grammaire_phrase", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_gram_sujet_inverse", label: "Identifier un sujet inversé", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_prepositions", label: "Identifier prépositions et conjonctions de subordination", notionId: "grammaire_phrase", prerequis: ["cm2_gram_nature_fonction"] },
  { id: "cm2_gram_phrase_defi", label: "Résoudre un défi d'analyse de la phrase", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_inverse", "cm2_gram_nature_fonction"] },

  // Grammaire — les compléments et le groupe nominal (6 micros + 1 défi)
  { id: "cm2_gram_complements", label: "Distinguer compléments de verbe et compléments circonstanciels", notionId: "grammaire_complements", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_cod_coi", label: "Différencier complément d'objet direct et indirect", notionId: "grammaire_complements", prerequis: ["cm2_gram_complements"] },
  { id: "cm2_gram_cc_sortes", label: "Différencier les compléments circonstanciels de temps, de lieu et de cause", notionId: "grammaire_complements", prerequis: ["cm2_gram_complements"] },
  { id: "cm2_gram_attribut", label: "Différencier l'attribut du sujet et le complément d'objet", notionId: "grammaire_complements", prerequis: ["cm2_gram_cod_coi"] },
  { id: "cm2_gram_gn", label: "Analyser le groupe nominal et ses expansions", notionId: "grammaire_complements", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_complement_nom", label: "Repérer le complément du nom et le distinguer de l'épithète", notionId: "grammaire_complements", prerequis: ["cm2_gram_gn"] },
  { id: "cm2_gram_complements_defi", label: "Résoudre un défi sur les compléments", notionId: "grammaire_complements", prerequis: ["cm2_gram_attribut", "cm2_gram_complement_nom"] },

  // Grammaire — les accords et les homophones (5 micros + 1 défi)
  { id: "cm2_orth_accord_gn", label: "Accorder le groupe nominal avec expansions", notionId: "grammaire_accords", prerequis: ["cm2_gram_gn"] },
  { id: "cm2_orth_sujet_verbe", label: "Accorder le verbe avec un sujet éloigné ou inversé simple", notionId: "grammaire_accords", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_orth_attribut", label: "Accorder l'attribut avec le sujet", notionId: "grammaire_accords", prerequis: ["cm2_gram_attribut", "cm2_orth_sujet_verbe"] },
  { id: "cm2_orth_participe_passe", label: "Accorder le participe passé avec être, et avec le COD pour avoir", notionId: "grammaire_accords", prerequis: ["cm2_orth_sujet_verbe"] },
  { id: "cm2_orth_homophones", label: "Choisir des homophones grammaticaux courants", notionId: "grammaire_accords", prerequis: ["cm2_orth_sujet_verbe"] },
  { id: "cm2_orth_accords_defi", label: "Résoudre un défi d'accords", notionId: "grammaire_accords", prerequis: ["cm2_orth_participe_passe", "cm2_orth_homophones"] },

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
  // ⚠️ L'id garde son « _intro » — il sert de clé au suivi des élèves et le
  // renommer effacerait leur historique. Le LIBELLÉ, lui, est remis au niveau
  // du BO : le passé simple est « à mémoriser et à maîtriser » au CM2, pas
  // seulement à reconnaître.
  { id: "cm2_conj_passe_simple_intro", label: "Conjuguer au passé simple les verbes fréquents", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait"] },
  { id: "cm2_conj_plus_que_parfait", label: "Conjuguer au plus-que-parfait", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait", "cm2_conj_passe_compose"] },
  { id: "cm2_conj_valeur_temps", label: "Comprendre la valeur des temps dans un récit", notionId: "conjugaison", prerequis: ["cm2_conj_imparfait", "cm2_conj_passe_compose"] },
];
