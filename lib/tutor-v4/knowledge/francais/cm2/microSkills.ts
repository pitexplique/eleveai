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

/* ─── DES NOTIONS DE 3 À 5 MICROS, PLUS UN DÉFI (Frédéric, 20/08/2026) ───────
   « Les micros ne sont pas trop fins, il faut multiplier les notions » — et
   « entre 3 et 5, 4 est la médiane ». Aucun micro n'est supprimé ni fusionné :
   ce sont les notions qui se divisent, jusqu'à tenir dans une fiche de cours.
   Le coach de maths CM2 tient ce format depuis toujours (28 notions, chacune
   finie par son défi) ; le français y vient.

   La règle qui a servi à couper : une notion est ce qu'on peut ENSEIGNER EN
   UNE FOIS. Le découpage suit les prérequis déjà écrits, il ne les invente
   pas — quand un prérequis traverse deux notions, il en donne l'ordre.

   Chaque notion se termine par `<...>_defi` : un micro qui n'a pas de pool à
   lui, mais qui balaie toute sa notion. L'élève ne sait pas laquelle de ses
   quatre compétences va tomber, c'est ce qui en fait un défi. */

export const microSkills: MicroSkillSource[] = [
  // Lecture — fluence et expressivité (5 + défi)
  { id: "cm2_flue_texte_long", label: "Lire à voix haute un texte long après préparation", notionId: "fluence_lecture", prerequis: [] },
  { id: "cm2_flue_unites_syntaxiques", label: "Respecter ponctuation, liaisons et unités syntaxiques", notionId: "fluence_lecture", prerequis: ["cm2_flue_texte_long"] },
  { id: "cm2_flue_120_mots", label: "Viser une lecture fluide autour de 120 mots par minute", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_flue_mise_en_voix", label: "Mettre en voix un texte avec intonation et effets", notionId: "fluence_lecture", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_flue_plaisir_lire", label: "Lire avec aisance et plaisir pour un auditoire", notionId: "fluence_lecture", prerequis: ["cm2_flue_mise_en_voix"] },
  { id: "cm2_flue_defi", label: "Relever un défi de lecture à voix haute", notionId: "fluence_lecture", prerequis: ["cm2_flue_plaisir_lire"] },

  // Compréhension — les textes (4 + défi)
  // ⚠️ Séparée des DOCUMENTS le 20/08 : lire un récit et lire une page
  // documentaire (schéma, légende, encadré) ne se travaillent pas ensemble —
  // le BO les nomme d'ailleurs séparément.
  { id: "cm2_comp_autonomie", label: "Comprendre seul un texte plus long et plus complexe", notionId: "comprehension_textes", prerequis: ["cm2_flue_texte_long"] },
  { id: "cm2_comp_essentiel", label: "Restituer l'essentiel d'un texte", notionId: "comprehension_textes", prerequis: ["cm2_comp_autonomie"] },
  { id: "cm2_comp_implicite", label: "Identifier informations explicites et implicites", notionId: "comprehension_textes", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_comp_genres", label: "Reconnaître les principaux genres littéraires", notionId: "comprehension_textes", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_comp_textes_defi", label: "Relever un défi de compréhension de texte", notionId: "comprehension_textes", prerequis: ["cm2_comp_implicite"] },

  // Compréhension — les documents (2 + défi)
  /* ⛔ LES `id` DE MICRO NE SE RENOMMENT PAS, même quand leur notion change :
     ils sont écrits en dur dans `fixed.bank.ts`, dans les supports de
     l'évaluation nationale et dans la matrice — et surtout, la progression
     déjà enregistrée d'un élève les porte. On déplace la notion, on garde
     l'identité. */
  { id: "cm2_doc_composite", label: "Nommer les éléments d'un document composite", notionId: "comprehension_documents", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_doc_croiser_infos", label: "Croiser deux documents pour compléter une information", notionId: "comprehension_documents", prerequis: ["cm2_doc_composite"] },
  { id: "cm2_comp_documents_defi", label: "Relever un défi de lecture de documents", notionId: "comprehension_documents", prerequis: ["cm2_doc_croiser_infos"] },

  // Lecture d'œuvres (5 + défi)
  { id: "cm2_oeuvre_reference", label: "Relier une œuvre à une autre référence culturelle", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_genres"] },
  { id: "cm2_oeuvre_experience", label: "Relier une lecture à son expérience personnelle", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_reference"] },
  { id: "cm2_oeuvre_theme", label: "Identifier thème, personnages et enjeux d'une œuvre", notionId: "lecture_oeuvres", prerequis: ["cm2_comp_essentiel"] },
  { id: "cm2_oeuvre_carnet", label: "Tenir une trace personnelle et organisée de ses lectures", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_experience"] },
  { id: "cm2_oeuvre_choix", label: "Choisir une œuvre et justifier son choix", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_carnet"] },
  { id: "cm2_oeuvre_defi", label: "Relever un défi sur une œuvre lue", notionId: "lecture_oeuvres", prerequis: ["cm2_oeuvre_choix"] },

  // Culture littéraire — LES SIX ENTRÉES DU COURS MOYEN, en deux notions.
  // ⚠️ Ajoutées le 11/08/2026, identiques à celles du CM1 : le BO ne change
  // pas les thèmes d'une année sur l'autre, il demande une progression dans
  // « la difficulté et la quantité des lectures ». Coupées en deux le 20/08 —
  // trois entrées tournent autour des personnages qu'on suit, trois autour de
  // ce qu'une lecture fait à celui qui lit.

  // Culture — héros, merveilleux, autres vies (3 + défi)
  { id: "cm2_cult_heros", label: "Découvrir des héroïnes, des héros", notionId: "culture_personnages", prerequis: ["cm2_oeuvre_theme"] },
  { id: "cm2_cult_merveilleux", label: "Se confronter au merveilleux, à l'étrange", notionId: "culture_personnages", prerequis: ["cm2_oeuvre_theme"] },
  { id: "cm2_cult_autres_vies", label: "Imaginer et vivre d'autres vies", notionId: "culture_personnages", prerequis: ["cm2_cult_heros"] },
  { id: "cm2_cult_personnages_defi", label: "Relever un défi sur les héros et le merveilleux", notionId: "culture_personnages", prerequis: ["cm2_cult_autres_vies"] },

  // Culture — morale, poésie, rapport aux autres (3 + défi)
  { id: "cm2_cult_morale", label: "Comprendre et interroger la morale", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_cult_heros"] },
  { id: "cm2_cult_poesie", label: "Savourer le goût des mots, imaginer et créer en poésie", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_oeuvre_experience"] },
  { id: "cm2_cult_rapport_autres", label: "Se découvrir, s'affirmer dans le rapport aux autres", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_cult_autres_vies"] },
  { id: "cm2_cult_soi_defi", label: "Relever un défi sur la morale et la poésie", notionId: "culture_soi_et_les_autres", prerequis: ["cm2_cult_rapport_autres"] },

  // Écriture — préparer son texte (3 + défi)
  { id: "cm2_ecrit_copie", label: "Copier efficacement un texte plus long", notionId: "ecriture_preparer", prerequis: [] },
  { id: "cm2_ecrit_notes", label: "Prendre des notes simples pour apprendre", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_copie"] },
  { id: "cm2_ecrit_plan", label: "Organiser ses idées avant d'écrire", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_notes"] },
  { id: "cm2_ecrit_preparer_defi", label: "Relever un défi de préparation d'écrit", notionId: "ecriture_preparer", prerequis: ["cm2_ecrit_plan"] },

  // Écriture — produire et réviser (3 + défi)
  { id: "cm2_ecrit_paragraphe", label: "Construire plusieurs paragraphes cohérents", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_plan"] },
  { id: "cm2_ecrit_varie", label: "Produire récit, description, dialogue ou texte explicatif", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_paragraphe"] },
  { id: "cm2_ecrit_reviser", label: "Relire, corriger et enrichir son texte", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_varie"] },
  { id: "cm2_ecrit_produire_defi", label: "Relever un défi d'écriture", notionId: "ecriture_produire", prerequis: ["cm2_ecrit_reviser"] },

  // Oral (5 + défi)
  { id: "cm2_oral_ecouter", label: "Écouter pour comprendre une idée principale et des détails", notionId: "oral", prerequis: [] },
  { id: "cm2_oral_reformuler", label: "Reformuler et synthétiser un propos entendu", notionId: "oral", prerequis: ["cm2_oral_ecouter"] },
  { id: "cm2_oral_presenter", label: "Présenter un travail avec un vocabulaire précis", notionId: "oral", prerequis: ["cm2_oral_reformuler"] },
  { id: "cm2_oral_argumenter", label: "Argumenter en donnant preuve ou exemple", notionId: "oral", prerequis: ["cm2_oral_presenter"] },
  { id: "cm2_oral_debat", label: "Participer à un débat réglé", notionId: "oral", prerequis: ["cm2_oral_argumenter"] },
  { id: "cm2_oral_defi", label: "Relever un défi d'oral", notionId: "oral", prerequis: ["cm2_oral_debat"] },

  /* ─── LE VOCABULAIRE, EN TROIS NOTIONS (20/08/2026) ────────────────────────
     Onze micros dans une seule notion : la plus grosse du CM2 après la
     grammaire. Trois questions différentes s'y cachaient, et elles ne
     s'enseignent pas ensemble —
       • ce qu'un mot VEUT DIRE (contexte, plusieurs sens, propre/figuré, nuance) ;
       • comment un mot est FABRIQUÉ (famille, racine, composition, homonymes) ;
       • comment on l'EMPLOIE et on l'ÉCRIT (registre, réemploi, orthographe).
     Aucun micro n'a bougé d'identité, seule leur notion change. */

  // Vocabulaire — le sens des mots (4 + défi)
  { id: "cm2_voc_contexte", label: "Inférer le sens d'un mot par le contexte", notionId: "vocabulaire_sens", prerequis: ["cm2_comp_autonomie"] },
  { id: "cm2_voc_polysemie", label: "Distinguer plusieurs sens d'un mot", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_contexte"] },
  { id: "cm2_voc_sens_figure", label: "Distinguer le sens propre et le sens figuré", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_polysemie"] },
  { id: "cm2_voc_nuance", label: "Choisir un mot selon une nuance de sens", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_sens_defi", label: "Relever un défi sur le sens des mots", notionId: "vocabulaire_sens", prerequis: ["cm2_voc_sens_figure", "cm2_voc_nuance"] },

  // Vocabulaire — la formation des mots (4 + défi)
  { id: "cm2_voc_famille_prefixe_suffixe", label: "Utiliser familles de mots, préfixes et suffixes", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_contexte"] },
  { id: "cm2_voc_racines", label: "Reconnaître une racine latine ou grecque", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_composition", label: "Comprendre un mot formé par composition", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_famille_prefixe_suffixe"] },
  { id: "cm2_voc_homonymie", label: "Distinguer des homonymes", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_polysemie"] },
  { id: "cm2_voc_formation_defi", label: "Relever un défi sur la formation des mots", notionId: "vocabulaire_formation", prerequis: ["cm2_voc_racines", "cm2_voc_composition"] },

  // Vocabulaire — employer et écrire les mots (3 + défi)
  { id: "cm2_voc_niveau_langue", label: "Identifier le niveau de langue d'un mot ou d'une expression", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_nuance"] },
  { id: "cm2_voc_reemploi", label: "Réemployer le vocabulaire étudié dans un écrit", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_nuance", "cm2_voc_polysemie"] },
  { id: "cm2_voc_orthographe", label: "Mémoriser et vérifier l'orthographe lexicale", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_reemploi"] },
  { id: "cm2_voc_emploi_defi", label: "Relever un défi d'emploi et d'orthographe des mots", notionId: "vocabulaire_emploi", prerequis: ["cm2_voc_orthographe", "cm2_voc_niveau_langue"] },

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
  // (Les cinq micros ajoutés le 15/08 sont déclarés plus haut, chacun dans
  // celle des trois notions de vocabulaire qui lui revient.)

  /* ─── LES SEIZE MICROS DE GRAMMAIRE, EN TROIS NOTIONS (20/08/2026) ─────────
     Une notion à seize micros ne donne pas une fiche honnête : la première
     fiche de français en citait certains sans les traiter (« prépositions »
     n'y avait qu'un piège, « sujet inversé » qu'un exemple).

     Quatre notions, quatre fiches, et le découpage suit LES PRÉREQUIS DÉJÀ
     ÉCRITS — il ne les invente pas :
       • `grammaire_phrase`         — le squelette : trouver le verbe, son
         sujet, et le vocabulaire pour en parler ;
       • `grammaire_complements`    — ce qui complète LE VERBE : objet direct,
         indirect, circonstanciel, attribut ;
       • `grammaire_groupe_nominal` — ce qui complète LE NOM : expansions,
         complément du nom, et la préposition qui l'accroche ;
       • `grammaire_accords`        — exactement les cinq micros `orth_` : on
         n'identifie plus, on écrit sans faute. C'est aussi, telle quelle, une
         rubrique de l'écrit du CRPE.
     Un prérequis peut traverser les quatre notions (l'accord du verbe suppose
     qu'on sache trouver le sujet) : c'est déjà le cas ailleurs, et c'est ce
     qui donne l'ordre des fiches. */

  // Grammaire — la phrase (4 micros + 1 défi)
  { id: "cm2_gram_phrase_simple", label: "Analyser les constituants d'une phrase simple", notionId: "grammaire_phrase", prerequis: ["cm2_flue_unites_syntaxiques"] },
  { id: "cm2_gram_sujet_verbe", label: "Identifier sujet, verbe et compléments", notionId: "grammaire_phrase", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_gram_nature_fonction", label: "Distinguer la nature d'un mot et sa fonction", notionId: "grammaire_phrase", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_gram_sujet_inverse", label: "Identifier un sujet inversé", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_phrase_defi", label: "Résoudre un défi d'analyse de la phrase", notionId: "grammaire_phrase", prerequis: ["cm2_gram_sujet_inverse", "cm2_gram_nature_fonction"] },

  // Grammaire — les compléments du verbe (4 micros + 1 défi)
  { id: "cm2_gram_complements", label: "Distinguer compléments de verbe et compléments circonstanciels", notionId: "grammaire_complements", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_cod_coi", label: "Différencier complément d'objet direct et indirect", notionId: "grammaire_complements", prerequis: ["cm2_gram_complements"] },
  { id: "cm2_gram_cc_sortes", label: "Différencier les compléments circonstanciels de temps, de lieu et de cause", notionId: "grammaire_complements", prerequis: ["cm2_gram_complements"] },
  { id: "cm2_gram_attribut", label: "Différencier l'attribut du sujet et le complément d'objet", notionId: "grammaire_complements", prerequis: ["cm2_gram_cod_coi"] },
  { id: "cm2_gram_complements_defi", label: "Résoudre un défi sur les compléments du verbe", notionId: "grammaire_complements", prerequis: ["cm2_gram_attribut", "cm2_gram_cc_sortes"] },

  /* Grammaire — le groupe nominal (3 micros + 1 défi).
     La préposition quitte la notion « phrase » pour venir ici : au CM2 elle
     sert d'abord à accrocher un complément AU NOM (« le cari DE ma
     grand-mère »), et c'est ce qui la distingue de l'épithète, collée sans
     rien. Les trois micros se tiennent donc par la main. */
  { id: "cm2_gram_gn", label: "Analyser le groupe nominal et ses expansions", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_gram_complement_nom", label: "Repérer le complément du nom et le distinguer de l'épithète", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_gn"] },
  { id: "cm2_gram_prepositions", label: "Identifier prépositions et conjonctions de subordination", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_nature_fonction"] },
  { id: "cm2_gram_gn_defi", label: "Résoudre un défi sur le groupe nominal", notionId: "grammaire_groupe_nominal", prerequis: ["cm2_gram_complement_nom", "cm2_gram_prepositions"] },

  // Grammaire — les accords et les homophones (5 micros + 1 défi)
  { id: "cm2_orth_accord_gn", label: "Accorder le groupe nominal avec expansions", notionId: "grammaire_accords", prerequis: ["cm2_gram_gn"] },
  { id: "cm2_orth_sujet_verbe", label: "Accorder le verbe avec un sujet éloigné ou inversé simple", notionId: "grammaire_accords", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_orth_attribut", label: "Accorder l'attribut avec le sujet", notionId: "grammaire_accords", prerequis: ["cm2_gram_attribut", "cm2_orth_sujet_verbe"] },
  { id: "cm2_orth_participe_passe", label: "Accorder le participe passé avec être, et avec le COD pour avoir", notionId: "grammaire_accords", prerequis: ["cm2_orth_sujet_verbe"] },
  { id: "cm2_orth_homophones", label: "Choisir des homophones grammaticaux courants", notionId: "grammaire_accords", prerequis: ["cm2_orth_sujet_verbe"] },
  { id: "cm2_orth_accords_defi", label: "Résoudre un défi d'accords", notionId: "grammaire_accords", prerequis: ["cm2_orth_participe_passe", "cm2_orth_homophones"] },

  // Phrase complexe (3 + défi)
  { id: "cm2_complexe_propositions", label: "Repérer deux propositions dans une phrase complexe", notionId: "phrase_complexe", prerequis: ["cm2_gram_phrase_simple"] },
  { id: "cm2_complexe_coordination", label: "Identifier juxtaposition et coordination simples", notionId: "phrase_complexe", prerequis: ["cm2_complexe_propositions"] },
  { id: "cm2_complexe_pronom_relatif", label: "Comprendre le rôle de qui, que, où dans une phrase", notionId: "phrase_complexe", prerequis: ["cm2_complexe_coordination"] },
  { id: "cm2_complexe_defi", label: "Résoudre un défi sur la phrase complexe", notionId: "phrase_complexe", prerequis: ["cm2_complexe_pronom_relatif"] },

  /* ─── LA CONJUGAISON, EN DEUX NOTIONS (20/08/2026) ─────────────────────────
     Huit temps dans une seule notion. La coupure est celle que fait la classe
     elle-même : d'un côté les temps qu'on apprend en tableau (présent,
     imparfait, futur), de l'autre LES TEMPS DU RÉCIT — passé simple, passé
     composé, plus-que-parfait — qui ne s'apprennent pas seuls mais les uns
     PAR RAPPORT aux autres. La valeur des temps y est donc, à sa place. */

  // Conjugaison — les temps simples (4 + défi)
  { id: "cm2_conj_infinitif_groupe", label: "Trouver infinitif, groupe et radical d'un verbe", notionId: "conjugaison_temps_simples", prerequis: ["cm2_gram_sujet_verbe"] },
  { id: "cm2_conj_present", label: "Conjuguer au présent les verbes fréquents et irréguliers", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_infinitif_groupe"] },
  { id: "cm2_conj_imparfait", label: "Conjuguer à l'imparfait", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_futur", label: "Conjuguer au futur", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_present"] },
  { id: "cm2_conj_simples_defi", label: "Résoudre un défi de conjugaison aux temps simples", notionId: "conjugaison_temps_simples", prerequis: ["cm2_conj_imparfait", "cm2_conj_futur"] },

  // Conjugaison — les temps du récit (4 + défi)
  { id: "cm2_conj_passe_compose", label: "Employer le passé composé avec être ou avoir", notionId: "conjugaison_recit", prerequis: ["cm2_conj_present"] },
  // ⚠️ L'id garde son « _intro » — il sert de clé au suivi des élèves et le
  // renommer effacerait leur historique. Le LIBELLÉ, lui, est remis au niveau
  // du BO : le passé simple est « à mémoriser et à maîtriser » au CM2, pas
  // seulement à reconnaître.
  { id: "cm2_conj_passe_simple_intro", label: "Conjuguer au passé simple les verbes fréquents", notionId: "conjugaison_recit", prerequis: ["cm2_conj_imparfait"] },
  { id: "cm2_conj_plus_que_parfait", label: "Conjuguer au plus-que-parfait", notionId: "conjugaison_recit", prerequis: ["cm2_conj_imparfait", "cm2_conj_passe_compose"] },
  { id: "cm2_conj_valeur_temps", label: "Comprendre la valeur des temps dans un récit", notionId: "conjugaison_recit", prerequis: ["cm2_conj_imparfait", "cm2_conj_passe_compose"] },
  { id: "cm2_conj_recit_defi", label: "Résoudre un défi sur les temps du récit", notionId: "conjugaison_recit", prerequis: ["cm2_conj_valeur_temps", "cm2_conj_plus_que_parfait"] },
];
