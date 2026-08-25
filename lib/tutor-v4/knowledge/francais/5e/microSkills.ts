// Micro-compétences de français pour la classe de 5e.
// Référence : « Annexe 1 – Programme de français pour le cycle 4 »,
// BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
//
// UNE MICRO = UN OBJECTIF D'APPRENTISSAGE DU BO. Le programme les liste, ligne à
// ligne, sous chaque compétence. Quand l'intitulé ci-dessous n'est pas celui du
// BO mot pour mot, c'est qu'il a été raccourci pour un élève de 5e ; le texte
// d'origine est alors en commentaire.
//
// ⚠️ CE FICHIER EST ÉCRIT EN LITTÉRAL DEPUIS LE 24/08/2026. Il était produit par
// `shared/buildCollegeFrancaisSources.ts` — la fabrique du cycle 4 — avec un gros
// bloc `if (level === "5e")`. Voir l'en-tête de `notions.ts` pour le pourquoi.
//
// ⛔ LES 92 MICROS SONT TOUTES ICI, AUX MÊMES `id`. Le découpage du 24/08 ne
// touche QUE le `notionId` : aucune micro supprimée, aucune fusionnée, aucun id
// renommé. Un id qui change, c'est une progression d'élève qui se perd, et une
// banque de questions qui sert du vide sans jamais tomber en panne.
//
// ⭐ DEUX LIBELLÉS CORRIGÉS AU PASSAGE, tous deux produits par l'interpolation de
// la fabrique et visibles à l'écran :
//   • `5e_comp_sens_global` s'affichait « Dégager un jugement de lecteur » — le
//     libellé de `5e_comp_jugement`, sur la micro du SENS GLOBAL. La fabrique
//     insérait `interpretationDepth` là où il fallait le geste lui-même.
//   • `5e_voix_preparer` s'affichait « … d'un texte de une vingtaine de lignes ».
//     « de une » se lisait tel quel dans le coach, en français, sur une fiche de
//     français. (La 4e et la 3e portent encore la faute : elles restent sur la
//     fabrique.)
//
// ⚠️⚠️ L'AIGUILLAGE SE FAIT PAR SOUS-CHAÎNE DU `id`. `buildCycle4FrancaisBank`
// choisit le pool de questions en testant `microId` privé de son préfixe de
// niveau, puis, à défaut, le `notionId`. Un id mal choisi ne fait PAS tomber la
// banque en panne : il sert des questions justes, sur un autre sujet, et aucun
// vérificateur ne le voit.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ══ LECTURE ET COMPRÉHENSION ═══════════════════════════════════════════════

  // ── « Comprendre, interpréter, apprécier » · comprendre ────────────────────
  { id: "5e_comp_sens_global", label: "Dégager le sens global d'un texte", notionId: "lecture_comprehension", prerequis: [] },
  { id: "5e_comp_indices", label: "Relever des indices précis dans le texte", notionId: "lecture_comprehension", prerequis: ["5e_comp_sens_global"] },
  { id: "5e_comp_implicite", label: "Comprendre l'implicite et justifier son interprétation", notionId: "lecture_comprehension", prerequis: ["5e_comp_indices"] },
  // BO : « Travailler la lecture silencieuse et développer les différentes
  // stratégies de compréhension » ; « contrôler sa compréhension ».
  { id: "5e_comp_strategies", label: "Contrôler sa compréhension et se débloquer en lisant seul", notionId: "lecture_comprehension", prerequis: ["5e_comp_indices"] },

  // ── « Comprendre, interpréter, apprécier » · apprécier ─────────────────────
  { id: "5e_comp_apprecier", label: "Formuler une appréciation fondée sur le texte", notionId: "lecture_apprecier", prerequis: ["5e_comp_implicite"] },
  // BO : « Formuler un jugement fondé sur des émotions, sur des critères
  // esthétiques, sur des idées et des valeurs. »
  { id: "5e_comp_jugement", label: "Dire sur quoi se fonde son jugement de lecteur", notionId: "lecture_apprecier", prerequis: ["5e_comp_apprecier"] },
  // BO : « Apprendre à recourir à quelques outils d'analyse pertinents. »
  { id: "5e_comp_outils_analyse", label: "Choisir l'outil d'analyse qui répond à la question posée", notionId: "lecture_apprecier", prerequis: ["5e_comp_implicite"] },

  // ── « Lire à voix haute, seul ou à plusieurs » ─────────────────────────────
  // BO : « Lire un texte d'une vingtaine de lignes avec aisance devant un
  // auditoire. »
  { id: "5e_voix_preparer", label: "Préparer la lecture orale d'un texte d'une vingtaine de lignes", notionId: "lecture_voix_haute", prerequis: ["5e_comp_indices"] },
  { id: "5e_voix_expressive", label: "Utiliser voix, rythme, regard et ponctuation", notionId: "lecture_voix_haute", prerequis: ["5e_voix_preparer"] },
  { id: "5e_voix_reciter", label: "Réciter un texte en prose ou en vers avec fluidité", notionId: "lecture_voix_haute", prerequis: ["5e_voix_expressive"] },
  // BO : « Repérer des éléments à améliorer dans sa lecture oralisée ou celle
  // des autres. »
  { id: "5e_voix_ameliorer", label: "Repérer ce qui est à améliorer dans une lecture à voix haute", notionId: "lecture_voix_haute", prerequis: ["5e_voix_expressive"] },

  // ── « Appréhender une œuvre dans des contextes artistiques variés » ────────
  // BO : « Comprendre et interpréter le parcours d'un ou plusieurs personnages
  // afin d'appréhender les enjeux de l'œuvre. »
  { id: "5e_lect_parcours_personnage", label: "Suivre le parcours d'un personnage pour saisir les enjeux de l'œuvre", notionId: "lecture_oeuvre_contextes", prerequis: ["5e_comp_implicite"] },
  // BO : « Comparer les langages différents d'une œuvre littéraire et d'une
  // œuvre artistique. »
  { id: "5e_lect_langages", label: "Comparer ce que peuvent les mots, l'image, la musique et la scène", notionId: "lecture_oeuvre_contextes", prerequis: ["5e_lect_parcours_personnage"] },
  // BO : « Tirer parti des informations sur le contexte de production d'une
  // œuvre pour la comprendre et l'interpréter. »
  { id: "5e_lect_contexte_production", label: "Se servir du contexte de production pour interpréter une œuvre", notionId: "lecture_oeuvre_contextes", prerequis: ["5e_lect_parcours_personnage"] },

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ═══════════════════════════════════════

  // ── « Acquérir, structurer et mobiliser des connaissances littéraires » ────
  { id: "5e_culture_genres", label: "Reconnaître genres littéraires et formes artistiques", notionId: "culture_connaissances", prerequis: ["5e_comp_sens_global"] },
  { id: "5e_culture_contexte", label: "Situer une œuvre dans un contexte simple", notionId: "culture_connaissances", prerequis: ["5e_culture_genres"] },
  { id: "5e_culture_reseau", label: "Mettre en relation une œuvre avec d'autres textes ou arts", notionId: "culture_connaissances", prerequis: ["5e_culture_contexte"] },
  { id: "5e_culture_trace", label: "Garder une trace personnelle de lecture", notionId: "culture_connaissances", prerequis: ["5e_culture_reseau"] },
  // BO : « Se constituer des repères dans l'histoire littéraire. »
  { id: "5e_lect_reperes_histoire", label: "Se constituer des repères dans l'histoire littéraire", notionId: "culture_connaissances", prerequis: ["5e_culture_contexte"] },

  // ── Les quatre entrées de 5e, nommées une par une par le programme ─────────
  // Perspective annuelle : « Éprouver, expérimenter : la découverte de soi,
  // d'autrui et du monde ».
  { id: "5e_cult_heros", label: "Devenir héroïne, héros : destins romanesques", notionId: "culture_entrees_5e", prerequis: ["5e_culture_genres"] },
  { id: "5e_cult_voyage_poesie", label: "Voyager en poésie : « Du monde entier au cœur du monde »", notionId: "culture_entrees_5e", prerequis: ["5e_culture_genres"] },
  { id: "5e_cult_theatre", label: "Expérimenter et jouer au théâtre : la société sens dessus dessous", notionId: "culture_entrees_5e", prerequis: ["5e_culture_genres"] },
  { id: "5e_cult_plaire_instruire", label: "Imaginer, sentir, raisonner : des histoires pour plaire et instruire", notionId: "culture_entrees_5e", prerequis: ["5e_cult_heros"] },

  // ══ ÉCRITURE ET PRODUCTION DE TEXTES ═══════════════════════════════════════

  // ── « Écrire pour réfléchir, apprendre et mémoriser » ──────────────────────
  { id: "5e_ecrit_notes", label: "Écrire pour réfléchir, apprendre et mémoriser", notionId: "ecriture_reflechir", prerequis: [] },
  // BO : « Repérer l'idée principale d'un message écrit ou oral. »
  { id: "5e_ecrit_idee_principale", label: "Repérer l'idée principale d'un message pour en rendre compte", notionId: "ecriture_reflechir", prerequis: ["5e_ecrit_notes"] },
  // BO : « Planifier son écrit en étant accompagné. »
  { id: "5e_ecrit_planifier", label: "Planifier son écrit avant de rédiger", notionId: "ecriture_reflechir", prerequis: ["5e_ecrit_notes"] },

  // ── « Écrire des textes d'invention et de réflexion » ──────────────────────
  { id: "5e_ecrit_invention", label: "Écrire un texte d'invention cohérent", notionId: "ecriture_produire", prerequis: ["5e_ecrit_planifier"] },
  // BO : « Écrire des textes narratifs et descriptifs. »
  { id: "5e_ecrit_narratif_descriptif", label: "Écrire un texte narratif et descriptif", notionId: "ecriture_produire", prerequis: ["5e_ecrit_planifier"] },
  // BO : « Écrire un texte à visée argumentative à partir de consignes simples. »
  { id: "5e_ecrit_argumentatif", label: "Bâtir un texte à visée argumentative", notionId: "ecriture_produire", prerequis: ["5e_ecrit_planifier"] },
  { id: "5e_ecrit_reflexion", label: "Rédiger une réponse ou un paragraphe de réflexion", notionId: "ecriture_produire", prerequis: ["5e_ecrit_notes"] },

  // ── « Évaluer son écrit et savoir le faire évoluer » ───────────────────────
  { id: "5e_ecrit_reviser", label: "Évaluer, corriger et enrichir son écrit", notionId: "ecriture_reviser", prerequis: ["5e_ecrit_invention", "5e_ecrit_reflexion"] },
  // BO : « Utiliser le brouillon comme un écrit à retravailler. »
  { id: "5e_ecrit_brouillon", label: "Se servir du brouillon comme d'un écrit à retravailler", notionId: "ecriture_reviser", prerequis: ["5e_ecrit_reviser"] },

  // ══ ORAL, MISE EN VOIX ET ÉCHANGES ═════════════════════════════════════════

  // ── « Écouter, comprendre et interpréter » ─────────────────────────────────
  { id: "5e_oral_ecouter", label: "Écouter, comprendre et interpréter un propos oral", notionId: "oral_ecouter", prerequis: [] },
  // BO : « Comprendre les visées d'une production orale spécifique. »
  { id: "5e_oral_visees", label: "Reconnaitre la visée d'une production orale", notionId: "oral_ecouter", prerequis: ["5e_oral_ecouter"] },

  // ── « Prendre la parole, communiquer et interagir » ────────────────────────
  { id: "5e_oral_presenter", label: "Présenter une lecture ou un travail de façon claire", notionId: "oral_prendre_parole", prerequis: ["5e_oral_ecouter"] },
  { id: "5e_oral_argumenter", label: "Justifier son point de vue à l'oral", notionId: "oral_prendre_parole", prerequis: ["5e_oral_presenter"] },
  // BO : « Entrer dans un dialogue. »
  { id: "5e_oral_dialogue", label: "Entrer dans un dialogue et y tenir sa place", notionId: "oral_prendre_parole", prerequis: ["5e_oral_presenter"] },
  // BO : « Intervenir dans un débat en respectant les règles d'un échange
  // argumentatif. »
  { id: "5e_oral_debat", label: "Intervenir dans un débat en respectant les règles de l'échange", notionId: "oral_prendre_parole", prerequis: ["5e_oral_argumenter"] },

  // ── « Dire, lire, jouer un texte » ─────────────────────────────────────────
  { id: "5e_oral_jouer", label: "Dire, lire ou jouer un texte", notionId: "oral_dire_jouer", prerequis: ["5e_oral_argumenter"] },
  // BO : « Utiliser les ressources de la voix et du corps. »
  { id: "5e_oral_corps", label: "Se servir des ressources de la voix et du corps", notionId: "oral_dire_jouer", prerequis: ["5e_oral_jouer"] },

  // ══ VOCABULAIRE ET ORTHOGRAPHE LEXICALE ════════════════════════════════════

  // ── « Enrichir son vocabulaire » ───────────────────────────────────────────
  { id: "5e_voc_contexte", label: "Inférer le sens d'un mot par le contexte", notionId: "vocabulaire_enrichir", prerequis: ["5e_comp_indices"] },
  // BO : « Maitriser l'usage du dictionnaire de langue en version papier et
  // numérique. »
  { id: "5e_voc_dictionnaire", label: "Lire un article de dictionnaire, sur papier comme à l'écran", notionId: "vocabulaire_enrichir", prerequis: ["5e_voc_contexte"] },
  // BO : « Mobiliser le vocabulaire nouveau pour améliorer ses productions
  // écrites et orales. »
  { id: "5e_voc_reemploi", label: "Réemployer un lexique précis à l'écrit ou à l'oral", notionId: "vocabulaire_enrichir", prerequis: ["5e_voc_contexte"] },

  // ── « Identifier les types de relations entre les mots » ───────────────────
  { id: "5e_voc_relations", label: "Identifier synonymie, antonymie, champ lexical et famille", notionId: "vocabulaire_relations", prerequis: ["5e_voc_contexte"] },
  // BO : « S'appuyer sur la composition d'un mot (préfixe, radical, suffixe)
  // pour en déduire le sens. »
  { id: "5e_voc_prefixe_suffixe", label: "Connaitre le sens des préfixes et des suffixes fréquents", notionId: "vocabulaire_relations", prerequis: ["5e_voc_relations"] },

  // ── « Réemployer son lexique et jouer avec les mots » ──────────────────────
  // BO : « Utiliser les mots en exploitant les variations de sens. »
  { id: "5e_voc_variations_sens", label: "Choisir le sens d'un mot selon la phrase où il apparait", notionId: "vocabulaire_jouer", prerequis: ["5e_voc_contexte"] },
  // BO : « Comprendre le fonctionnement du néologisme (de forme et de sens). »
  { id: "5e_voc_neologisme", label: "Comprendre comment un mot nouveau entre dans la langue", notionId: "vocabulaire_jouer", prerequis: ["5e_voc_prefixe_suffixe"] },

  // ── « Comprendre la formation des mots » ───────────────────────────────────
  { id: "5e_voc_formation", label: "Comprendre la formation des mots", notionId: "vocabulaire_formation", prerequis: ["5e_voc_relations"] },
  // BO : « Appréhender la dimension historique des mots (étymologie) en
  // maitrisant quelques éléments latins, grecs ou empruntés. »
  { id: "5e_voc_etymologie", label: "Reconnaitre un élément latin ou grec dans un mot", notionId: "vocabulaire_formation", prerequis: ["5e_voc_prefixe_suffixe"] },

  // ── « Écrire avec justesse (orthographe) » ─────────────────────────────────
  { id: "5e_voc_orthographe", label: "Écrire avec justesse les mots étudiés", notionId: "vocabulaire_orthographe", prerequis: ["5e_voc_reemploi"] },
  // BO : « Comprendre le principe de la dérivation des mots et son incidence sur
  // l'orthographe. »
  { id: "5e_voc_derivation_orthographe", label: "Trouver la lettre muette par un mot de la même famille", notionId: "vocabulaire_orthographe", prerequis: ["5e_voc_prefixe_suffixe"] },

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ══════════════════════════════════

  // ── « Comprendre ce qu'est une phrase pour mieux lire et mieux écrire » ────
  // BO : « Identifier et réinvestir le rôle des différents signes de ponctuation
  // en lien avec les constituants de la phrase. »
  { id: "5e_gram_ponctuation", label: "Expliquer le rôle d'un signe de ponctuation dans la phrase", notionId: "grammaire_phrase", prerequis: ["5e_comp_sens_global"] },
  // BO : « Identifier trois types de phrases » / « Reconnaitre trois formes de
  // phrases et leurs caractéristiques (exclamative et négative). »
  { id: "5e_gram_types_formes", label: "Identifier le type d'une phrase et ses formes exclamative ou négative", notionId: "grammaire_phrase", prerequis: ["5e_gram_ponctuation"] },
  // BO : « Comprendre et expliciter la différence entre phrase simple, phrase
  // complexe, phrase non verbale. »
  { id: "5e_gram_simple_complexe", label: "Distinguer phrase simple, phrase complexe et phrase non verbale", notionId: "grammaire_phrase", prerequis: ["5e_gram_types_formes"] },
  // BO : « Comprendre les effets de sens produits par les relations de
  // juxtaposition et coordination. »
  { id: "5e_gram_juxta_coord", label: "Comprendre ce qu'exprime une juxtaposition ou une coordination", notionId: "grammaire_phrase", prerequis: ["5e_gram_simple_complexe"] },
  // BO : « Identifier les mots coordonnants et comprendre leurs rôles syntaxique
  // et sémantique dans la phrase. » (Listé sous « constituants », rattaché ici :
  // même objet que la micro précédente — voir notions.ts.)
  { id: "5e_gram_coordonnants", label: "Identifier un mot coordonnant et le rapport qu'il établit", notionId: "grammaire_phrase", prerequis: ["5e_gram_juxta_coord"] },

  // ── « Connaitre les constituants d'une phrase » · les fonctions ────────────
  { id: "5e_gram_constituants", label: "Identifier les constituants de la phrase", notionId: "grammaire_fonctions", prerequis: ["5e_gram_ponctuation"] },
  // BO : « Analyser les constituants du groupe sujet, du groupe verbal et du
  // groupe circonstanciel. »
  { id: "5e_gram_fonctions", label: "Repérer sujet, verbe, compléments et groupes", notionId: "grammaire_fonctions", prerequis: ["5e_gram_constituants"] },
  // BO : « Identifier le sujet, les compléments d'objet direct et indirect […]
  // en utilisant des manipulations syntaxiques. »
  // ⚠️ Le libellé dit « et des autres fonctions » parce que la banque sert aussi
  // des circonstanciels et des attributs comme bonnes réponses : un COD ne se
  // reconnait qu'en s'opposant à eux.
  { id: "5e_gram_cod_coi", label: "Distinguer les compléments d'objet direct et indirect des autres fonctions", notionId: "grammaire_fonctions", prerequis: ["5e_gram_fonctions"] },
  // BO : « …l'attribut du sujet » ; « Identifier les verbes attributifs en
  // repérant l'emploi occasionnellement attributif de certains verbes. »
  { id: "5e_gram_attribut", label: "Identifier l'attribut du sujet et les verbes attributifs", notionId: "grammaire_fonctions", prerequis: ["5e_gram_cod_coi"] },
  // BO : « …les compléments circonstanciels de lieu, de cause, de temps et de
  // manière. »
  { id: "5e_gram_circonstanciels", label: "Identifier un complément circonstanciel de lieu, de cause, de temps ou de manière", notionId: "grammaire_fonctions", prerequis: ["5e_gram_fonctions"] },

  // ── « Connaitre les constituants » · le groupe nominal et ses petits mots ──
  // BO : « Comprendre la structure du groupe nominal minimal et du groupe
  // nominal étendu ; les identifier dans une phrase ou un court passage. »
  { id: "5e_gram_gn_etendu", label: "Analyser le groupe nominal minimal et le groupe nominal étendu", notionId: "grammaire_groupe_nominal", prerequis: ["5e_gram_fonctions"] },
  // BO : « Identifier les prépositions, les adverbes et les mots subordonnants. »
  { id: "5e_gram_prepositions", label: "Identifier prépositions, adverbes et mots subordonnants", notionId: "grammaire_groupe_nominal", prerequis: ["5e_gram_constituants"] },
  // BO : « Distinguer les déterminants et les pronoms. »
  { id: "5e_gram_determinant_pronom", label: "Distinguer un déterminant d'un pronom", notionId: "grammaire_groupe_nominal", prerequis: ["5e_gram_gn_etendu"] },
  // BO : « Identifier les pronoms personnels, démonstratifs et indéfinis, sans
  // chercher l'exhaustivité. »
  { id: "5e_gram_pronoms", label: "Identifier les pronoms personnels, démonstratifs et indéfinis", notionId: "grammaire_groupe_nominal", prerequis: ["5e_gram_determinant_pronom"] },

  // ── Les reprises et la chaîne anaphorique ─────────────────────────────────
  // ⭐ Justifiées par l'évaluation nationale de 5e (19 %, 24 % et 43 % de
  // réussite en 2025 sur six items), et par les attendus de fin de CM2 qui
  // nomment déjà « les substituts (ex : reprises pronominales) ».
  // ⚠️ `5e_gram_pronoms` NE LES COUVRE PAS : dire qu'un mot est un pronom
  // démonstratif est une question de classe de mot ; retrouver ce qu'il reprend
  // deux phrases plus haut est une question de texte.
  { id: "5e_gram_anaphore_pronom", label: "Retrouver ce qu'un pronom reprend dans un texte", notionId: "grammaire_reprises", prerequis: ["5e_gram_pronoms"] },
  { id: "5e_gram_reprise_nominale", label: "Identifier une reprise nominale et ce qu'elle désigne", notionId: "grammaire_reprises", prerequis: ["5e_gram_gn_etendu"] },
  { id: "5e_gram_chaine_reference", label: "Suivre une chaîne de reprises d'un bout à l'autre d'un texte", notionId: "grammaire_reprises", prerequis: ["5e_gram_anaphore_pronom", "5e_gram_reprise_nominale"] },

  // ── « Savoir accorder les mots dans la phrase » · les chaînes d'accord ─────
  // Le verbe du BO est « expliquer » et « justifier » : ce ne sont pas des
  // accords à appliquer, ce sont des accords à RAISONNER.
  { id: "5e_gram_accords", label: "Accorder les mots dans la phrase et expliquer ses choix", notionId: "orthographe_accords", prerequis: ["5e_gram_fonctions"] },
  // BO : « Maitriser les chaines d'accord du groupe nominal en développant son
  // raisonnement. »
  { id: "5e_orth_chaine_gn", label: "Tenir la chaine d'accord dans le groupe nominal", notionId: "orthographe_accords", prerequis: ["5e_gram_gn_etendu"] },
  // BO : « Maitriser les chaines d'accord de l'attribut du sujet. »
  { id: "5e_orth_accord_attribut", label: "Accorder l'attribut avec le sujet", notionId: "orthographe_accords", prerequis: ["5e_gram_attribut"] },
  // BO : « Maitriser les cas complexes de l'accord sujet-verbe (sujet séparé du
  // verbe par un complément, sujet comportant plusieurs noms). »
  { id: "5e_orth_sujet_verbe_complexe", label: "Accorder le verbe quand le sujet est éloigné, inversé ou multiple", notionId: "orthographe_accords", prerequis: ["5e_gram_cod_coi"] },

  // ── « Savoir accorder les mots dans la phrase » · le participe passé ───────
  // BO : « Justifier […] l'accord du participe passé employé avec l'auxiliaire
  // être et avec l'auxiliaire avoir (COD antéposé dont pronom personnel COD, à
  // distinguer du COI). »
  { id: "5e_orth_participe_etre", label: "Accorder le participe passé employé avec être", notionId: "orthographe_participe", prerequis: ["5e_orth_accord_attribut"] },
  { id: "5e_orth_participe_avoir", label: "Accorder le participe passé avec avoir quand le COD est placé avant", notionId: "orthographe_participe", prerequis: ["5e_orth_participe_etre"] },
  // C'est là que se joue l'erreur : « je leur ai parlé » ne s'accorde pas.
  { id: "5e_orth_cod_coi_antepose", label: "Ne pas accorder quand le pronom placé avant est un COI", notionId: "orthographe_participe", prerequis: ["5e_orth_participe_avoir"] },

  // ── « Grammaire de l'écrit et grammaire de l'oral », registres ─────────────
  // BO : « Découvrir et comprendre les différences entre grammaire de l'écrit et
  // grammaire de l'oral (registre de langue, syntaxe, langue écrite ou parlée
  // plus ou moins normée, contexte d'énonciation). »
  { id: "5e_gram_oral_ecrit", label: "Distinguer usages de l'oral et de l'écrit", notionId: "discours_registres", prerequis: ["5e_gram_types_formes"] },
  { id: "5e_discours_registres", label: "Identifier et ajuster les registres de langue", notionId: "discours_registres", prerequis: ["5e_gram_oral_ecrit"] },
  { id: "5e_discours_argumentatif", label: "Repérer procédés du discours argumentatif", notionId: "discours_registres", prerequis: ["5e_discours_registres"] },

  // ── « Analyser et employer des paroles rapportées » ────────────────────────
  { id: "5e_discours_rapportees", label: "Analyser et employer des paroles rapportées", notionId: "discours_paroles_rapportees", prerequis: ["5e_discours_registres"] },
  // BO : « Identifier des paroles rapportées aux discours direct et indirect. »
  { id: "5e_discours_direct_indirect", label: "Distinguer le discours direct du discours indirect", notionId: "discours_paroles_rapportees", prerequis: ["5e_discours_rapportees"] },
  // BO : « Insérer des paroles au discours direct dans un texte. »
  { id: "5e_discours_inserer", label: "Insérer des paroles au discours direct et les ponctuer", notionId: "discours_paroles_rapportees", prerequis: ["5e_discours_direct_indirect"] },

  // ══ CONJUGAISON ════════════════════════════════════════════════════════════

  // ── « Maitriser la composition des formes verbales » · la composition ──────
  { id: "5e_conj_identifier", label: "Identifier temps, mode, personne et radical", notionId: "conjugaison_formes", prerequis: ["5e_gram_fonctions"] },
  // BO : « Découvrir, comprendre et mémoriser les éléments qui constituent une
  // forme verbale : radical verbal et terminaison (marques de temps et de
  // personne). »
  { id: "5e_conj_radical_terminaison", label: "Lire dans la terminaison le temps et la personne", notionId: "conjugaison_formes", prerequis: ["5e_conj_identifier"] },
  { id: "5e_conj_composer", label: "Composer et conjuguer les formes verbales attendues", notionId: "conjugaison_formes", prerequis: ["5e_conj_identifier"] },
  // BO : « Consolider la conjugaison des verbes réguliers et des principaux
  // verbes irréguliers en fonction de la variation de leur radical. »
  { id: "5e_conj_radical_variable", label: "Conjuguer les verbes dont le radical change", notionId: "conjugaison_formes", prerequis: ["5e_conj_radical_terminaison"] },

  // ── « Maitriser la composition des formes verbales » · les temps à bâtir ──
  // ⚠️ FUSIONNÉES LE 25/08/2026. Le découpage de la veille avait fait DEUX
  // notions de deux micros — « temps simples » et « temps composés ». La règle
  // dit cinq au maximum, elle ne dit pas deux au minimum : une notion de deux
  // micros ne porte pas une fiche, et la 4e comme la 3e nomment déjà la leur
  // `conjugaison_temps`. Quatre micros, et le même nom dans les trois classes.
  // BO : « …la morphologie des temps simples (présent, futur simple, imparfait,
  // passé simple de l'indicatif, conditionnel et présent de l'impératif). »
  { id: "5e_conj_passe_simple", label: "Conjuguer au passé simple de l'indicatif", notionId: "conjugaison_temps", prerequis: ["5e_conj_radical_terminaison"] },
  { id: "5e_conj_conditionnel_imperatif", label: "Conjuguer au conditionnel présent et à l'impératif présent", notionId: "conjugaison_temps", prerequis: ["5e_conj_radical_terminaison"] },

  // BO : « …et des temps composés (passé composé et plus-que-parfait). »
  { id: "5e_conj_temps_composes", label: "Former le passé composé et le plus-que-parfait", notionId: "conjugaison_temps", prerequis: ["5e_conj_radical_terminaison"] },
  // BO : « Conjuguer un verbe par imitation, au passé antérieur et au futur
  // antérieur de l'indicatif. »
  { id: "5e_conj_anterieurs", label: "Conjuguer au passé antérieur et au futur antérieur", notionId: "conjugaison_temps", prerequis: ["5e_conj_temps_composes"] },

  // ── « Maitriser l'emploi des temps et des modes » ──────────────────────────
  // BO : « Approfondir sa maitrise des valeurs temporelles et aspectuelles des
  // temps simples et composés. »
  { id: "5e_conj_valeurs", label: "Distinguer ce qu'exprime chaque temps du récit", notionId: "conjugaison_valeurs", prerequis: ["5e_conj_passe_simple", "5e_conj_temps_composes"] },
  // BO : « Approfondir sa maitrise des modes indicatif et impératif. »
  { id: "5e_conj_modes", label: "Distinguer l'indicatif de l'impératif et ce que chacun fait", notionId: "conjugaison_valeurs", prerequis: ["5e_conj_conditionnel_imperatif"] },
  { id: "5e_conj_employer", label: "Employer les temps et modes selon le sens", notionId: "conjugaison_valeurs", prerequis: ["5e_conj_composer"] },
];
