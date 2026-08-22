// Micro-compétences de français pour la classe de 6e.
// Référence : « Programme de français pour le cycle 3 »,
// BO n° 16 du 17 avril 2025, rubriques « Sixième » de chaque domaine.
//
// UNE MICRO = UN OBJECTIF D'APPRENTISSAGE DU BO. Le programme les liste, ligne
// à ligne, sous chaque compétence. Quand l'intitulé ci-dessous n'est pas celui
// du BO mot pour mot, c'est qu'il a été raccourci pour un élève de 6e ; le texte
// d'origine est alors en commentaire.
//
// ⚠️ CE FICHIER EST ÉCRIT EN LITTÉRAL DEPUIS LE 22/08/2026. Il était produit par
// `shared/buildCollegeFrancaisSources.ts` — la fabrique du cycle 4 — avec un
// bloc de rattrapage `if (level === "6e")`. La 6e ne suit pas le programme du
// cycle 4 : elle ferme le cycle 3. Voir l'en-tête de `notions.ts`.
//
// ⚠️⚠️ L'AIGUILLAGE SE FAIT PAR SOUS-CHAÎNE DU `id`. `buildCycle3FrancaisBank`
// choisit le pool de questions en testant `microId.includes(...)`, dans un ordre
// qui compte. Un id mal choisi ne fait PAS tomber la banque en panne : il sert
// des questions justes, sur un autre sujet, et aucun vérificateur ne le voit.
// C'est arrivé à `phrase_complexe` au CM2. Chaque id ci-dessous porte donc, en
// fin de ligne, le pool sur lequel il tombe.

import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

export const microSkills: MicroSkillSource[] = [
  // ══ LECTURE ═══════════════════════════════════════════════════════════════

  // ── « Lire avec fluidité » ────────────────────────────────────────────────
  // BO : « Poursuivre l'entraînement à la lecture silencieuse et à la lecture à
  // voix haute en renforçant l'acquisition d'un phrasé et d'une prosodie
  // adaptés au texte » · « Prendre en compte les groupes syntaxiques (groupes
  // de mots avec unité de sens), les marques de ponctuation, les liaisons dans
  // sa lecture » · « Parvenir à lire correctement en ciblant 130 mots par
  // minute en moyenne ».
  { id: "6e_flue_silencieuse", label: "Lire silencieusement et à voix haute avec un phrasé adapté", notionId: "fluence_lecture", prerequis: [] }, // → LECTURE
  { id: "6e_flue_groupes_syntaxiques", label: "Lire par groupes de sens, en tenant la ponctuation et les liaisons", notionId: "fluence_lecture", prerequis: ["6e_flue_silencieuse"] }, // → LECTURE
  { id: "6e_flue_130_mots", label: "Viser une lecture fluide autour de 130 mots par minute", notionId: "fluence_lecture", prerequis: ["6e_flue_groupes_syntaxiques"] }, // → FLUENCE_130
  { id: "6e_flue_defi", label: "Défi : lire un texte inconnu sans buter ni s'essouffler", notionId: "fluence_lecture", prerequis: ["6e_flue_130_mots"] }, // → LECTURE

  // ── « Lire à voix haute avec expressivité » ───────────────────────────────
  // BO : « Lire à voix haute, avec aisance et expressivité, un texte de 10 à 20
  // lignes en regardant l'auditoire » · « Poursuivre le travail de mise en voix
  // du texte » · « Rendre compte des émotions et sentiments des personnages, et
  // des intentions de l'auteur » · « Parvenir à rendre l'intonation, le rythme
  // et la caractérisation des personnages dans le dialogue de récit ».
  { id: "6e_voix_preparer", label: "Préparer la lecture d'un texte de 10 à 20 lignes et regarder l'auditoire", notionId: "lecture_voix_haute", prerequis: ["6e_flue_groupes_syntaxiques"] }, // → MISE_EN_VOIX
  { id: "6e_voix_expressive", label: "Mettre le texte en voix : intonation, rythme, volume", notionId: "lecture_voix_haute", prerequis: ["6e_voix_preparer"] }, // → MISE_EN_VOIX
  { id: "6e_voix_emotions", label: "Faire entendre les émotions des personnages et les intentions de l'auteur", notionId: "lecture_voix_haute", prerequis: ["6e_voix_expressive"] }, // → MISE_EN_VOIX
  { id: "6e_voix_dialogue", label: "Faire entendre qui parle dans un dialogue de récit", notionId: "lecture_voix_haute", prerequis: ["6e_voix_emotions"] }, // → MISE_EN_VOIX
  { id: "6e_voix_defi", label: "Défi : dire un texte en prose ou en vers devant la classe", notionId: "lecture_voix_haute", prerequis: ["6e_voix_dialogue"] }, // → MISE_EN_VOIX

  // ── « Lire et comprendre seul des textes, des documents et des images » ────
  // BO : « Dégager le sens global d'un texte, affiner sa compréhension et
  // devenir un lecteur autonome » · « Dégager les principales caractéristiques
  // d'un texte et le rattacher à un genre » · « effectuer des inférences sur de
  // larges extraits » · « Justifier ses interprétations ou ses réponses en
  // prenant appui sur le texte ou sur ses connaissances ».
  { id: "6e_comp_sens_global", label: "Dégager le sens global d'un texte", notionId: "comprehension_textes", prerequis: [] }, // → LECTURE / DOCUMENT
  { id: "6e_comp_genre", label: "Rattacher un texte à un genre d'après ses caractéristiques", notionId: "comprehension_textes", prerequis: ["6e_comp_sens_global"] }, // → LECTURE / DOCUMENT
  { id: "6e_comp_implicite", label: "Comprendre l'implicite et faire une inférence", notionId: "comprehension_textes", prerequis: ["6e_comp_sens_global"] }, // → LECTURE / DOCUMENT
  { id: "6e_comp_justifier", label: "Justifier son interprétation en citant le texte", notionId: "comprehension_textes", prerequis: ["6e_comp_implicite"] }, // → LECTURE / DOCUMENT
  { id: "6e_comp_defi", label: "Défi : répondre à une question dont la réponse n'est pas écrite", notionId: "comprehension_textes", prerequis: ["6e_comp_justifier"] }, // → LECTURE / DOCUMENT

  // ── Les reprises et les liens logiques ────────────────────────────────────
  // BO : « Repérer les informations explicites et implicites, LES LIENS
  // LOGIQUES, LES REPRISES NOMINALES ». Objectif nommé, sans aucune micro
  // jusqu'au 22/08/2026 — et c'est le point le plus faible des évaluations
  // nationales sur la chaîne anaphorique.
  { id: "6e_comp_indices", label: "Relever dans le texte l'indice qui répond à la question", notionId: "comprehension_reprises", prerequis: ["6e_comp_sens_global"] }, // → LECTURE / DOCUMENT
  { id: "6e_comp_reprises", label: "Retrouver de qui ou de quoi parle un pronom ou une reprise", notionId: "comprehension_reprises", prerequis: ["6e_comp_indices"] }, // → REPRISES
  { id: "6e_comp_liens_logiques", label: "Reconnaître ce qu'exprime un mot de liaison", notionId: "comprehension_reprises", prerequis: ["6e_comp_indices"] }, // → LIENS_LOGIQUES
  { id: "6e_comp_reprises_defi", label: "Défi : suivre un personnage d'un bout à l'autre d'un passage", notionId: "comprehension_reprises", prerequis: ["6e_comp_reprises", "6e_comp_liens_logiques"] }, // → REPRISES

  // ── « Lire et comprendre […] pour apprendre dans toutes les disciplines » ──
  // BO : « Identifier la nature et la source des documents » · « Comparer des
  // documents de genres différents et repérer ce qui les rapproche et ce qui
  // les différencie » · « Apprendre à mettre en relation des informations dans
  // le cas de documents composites » · « Prendre appui sur les éléments
  // essentiels d'une image fixe et les interpréter ».
  { id: "6e_comp_documents", label: "Identifier la nature et la source d'un document", notionId: "comprehension_documents", prerequis: ["6e_comp_indices"] }, // → DOCUMENTS
  { id: "6e_comp_documents_comparer", label: "Comparer deux documents et croiser leurs informations", notionId: "comprehension_documents", prerequis: ["6e_comp_documents"] }, // → DOCUMENTS
  { id: "6e_comp_image", label: "Prendre appui sur les éléments essentiels d'une image fixe", notionId: "comprehension_documents", prerequis: ["6e_comp_documents"] }, // → IMAGE
  { id: "6e_comp_documents_defi", label: "Défi : répondre en croisant un texte, un tableau et une image", notionId: "comprehension_documents", prerequis: ["6e_comp_documents_comparer", "6e_comp_image"] }, // → DOCUMENTS

  // ── « Lire une œuvre et se l'approprier » ─────────────────────────────────
  // BO : « Lire et étudier en classe trois œuvres du patrimoine en lecture
  // intégrale et trois œuvres complètes en lecture cursive » · « Mettre en
  // relation le texte lu avec d'autres références : expérience vécue,
  // connaissances culturelles, enjeux contemporains » · « Pouvoir proposer une
  // évocation spontanée de sa lecture » · « Prendre appui sur des éléments
  // précis pour fonder sa compréhension fine d'une œuvre » · « Partager ses
  // impressions de lecture et en débattre, confronter ses jugements ».
  { id: "6e_oeuvre_integrale", label: "Suivre une œuvre longue, en lecture intégrale ou cursive", notionId: "lecture_oeuvres", prerequis: ["6e_comp_sens_global"] }, // → OEUVRE
  { id: "6e_oeuvre_relier", label: "Relier une œuvre à son expérience et à ce qu'on sait", notionId: "lecture_oeuvres", prerequis: ["6e_oeuvre_integrale"] }, // → OEUVRE
  { id: "6e_oeuvre_fonder", label: "Fonder son interprétation d'une œuvre sur un passage précis", notionId: "lecture_oeuvres", prerequis: ["6e_oeuvre_integrale"] }, // → OEUVRE
  { id: "6e_oeuvre_debattre", label: "Partager ses impressions de lecture et en débattre", notionId: "lecture_oeuvres", prerequis: ["6e_oeuvre_relier"] }, // → OEUVRE
  { id: "6e_oeuvre_defi", label: "Défi : dire ce qu'on a compris d'une œuvre et sur quoi on s'appuie", notionId: "lecture_oeuvres", prerequis: ["6e_oeuvre_fonder", "6e_oeuvre_debattre"] }, // → OEUVRE

  // ══ CULTURE LITTÉRAIRE ET ARTISTIQUE ══════════════════════════════════════
  // Les CINQ ENTRÉES de la 6e, nommées une par une par le BO. La mise en
  // correspondance avec un genre est « recommandée en CM et PRESCRITE en 6e ».
  { id: "6e_cult_origines", label: "Créer, recréer le monde : récits des origines", notionId: "culture_recits", prerequis: [] }, // → ORIGINES
  { id: "6e_cult_aventure", label: "Partir à l'aventure !", notionId: "culture_recits", prerequis: ["6e_cult_origines"] }, // → AVENTURE
  { id: "6e_cult_monstres", label: "Rencontrer des monstres : expérience de l'autre, expérience de soi", notionId: "culture_recits", prerequis: ["6e_cult_origines"] }, // → MONSTRES
  { id: "6e_cult_recits_defi", label: "Défi : reconnaître de quel type de récit on parle", notionId: "culture_recits", prerequis: ["6e_cult_aventure", "6e_cult_monstres"] }, // → ORIGINES / AVENTURE / MONSTRES

  { id: "6e_cult_poesie", label: "Chanter et enchanter le monde : mots et merveilles (poésie)", notionId: "culture_poesie_theatre", prerequis: [] }, // → POESIE
  { id: "6e_cult_theatre", label: "Se masquer, jouer, déjouer : ruses en action (théâtre)", notionId: "culture_poesie_theatre", prerequis: [] }, // → THEATRE
  { id: "6e_cult_arts_defi", label: "Défi : poème ou scène de théâtre, à quoi le voit-on ?", notionId: "culture_poesie_theatre", prerequis: ["6e_cult_poesie", "6e_cult_theatre"] }, // → POESIE / THEATRE

  // Les gestes du lecteur cultivé — « Développer sa culture littéraire et
  // artistique », « Garder trace de ses lectures et les partager ».
  { id: "6e_culture_genres", label: "Reconnaître un genre littéraire et une forme artistique", notionId: "culture_reperes", prerequis: ["6e_cult_origines"] }, // → OEUVRE
  { id: "6e_culture_contexte", label: "Situer une œuvre dans un contexte simple", notionId: "culture_reperes", prerequis: ["6e_culture_genres"] }, // → OEUVRE
  { id: "6e_culture_reseau", label: "Mettre une œuvre en relation avec d'autres textes ou d'autres arts", notionId: "culture_reperes", prerequis: ["6e_culture_contexte"] }, // → OEUVRE
  { id: "6e_culture_trace", label: "Garder une trace personnelle de ses lectures et la partager", notionId: "culture_reperes", prerequis: ["6e_culture_genres"] }, // → OEUVRE
  { id: "6e_culture_reperes_defi", label: "Défi : classer trois extraits par genre et justifier", notionId: "culture_reperes", prerequis: ["6e_culture_reseau", "6e_culture_trace"] }, // → OEUVRE

  // ══ ÉCRITURE ══════════════════════════════════════════════════════════════

  // ── « Écrire à la main de manière fluide et efficace » ────────────────────
  // BO : « Copier des textes de façon lisible, régulière, soignée et sans
  // erreur d'orthographe ou de ponctuation » · « Produire des textes en
  // veillant à leur lisibilité et à leur mise en forme ».
  { id: "6e_ecrit_copie", label: "Copier un texte sans faute et sans rature", notionId: "ecriture_main", prerequis: [] }, // → ECRIRE_MAIN
  { id: "6e_ecrit_mise_en_forme", label: "Écrire un texte lisible et bien mis en forme", notionId: "ecriture_main", prerequis: ["6e_ecrit_copie"] }, // → ECRITURE
  { id: "6e_ecrit_copie_defi", label: "Défi : recopier un passage sans y laisser une seule erreur", notionId: "ecriture_main", prerequis: ["6e_ecrit_mise_en_forme"] }, // → ECRIRE_MAIN

  // ── « Écrire pour réfléchir, apprendre et mémoriser » ─────────────────────
  // BO : « Écrire pour résumer et/ou synthétiser » · « Produire des écrits
  // réflexifs courts pour argumenter et justifier ses choix » · « S'approprier
  // individuellement l'essentiel d'une leçon » · « Hiérarchiser des idées » ·
  // « Produire des écrits courts pour appliquer une règle de grammaire ou
  // employer et mémoriser le lexique appris ».
  { id: "6e_ecrit_notes", label: "Écrire pour retenir l'essentiel d'une leçon", notionId: "ecriture_apprendre", prerequis: [] }, // → ECRITURE
  { id: "6e_ecrit_resumer", label: "Résumer un texte en quelques phrases", notionId: "ecriture_apprendre", prerequis: ["6e_ecrit_notes"] }, // → ECRIT_RESUMER
  { id: "6e_ecrit_hierarchiser", label: "Hiérarchiser ses idées avant d'écrire", notionId: "ecriture_apprendre", prerequis: ["6e_ecrit_notes"] }, // → ECRIT_RESUMER
  { id: "6e_ecrit_justifier", label: "Écrire un court paragraphe pour justifier un choix", notionId: "ecriture_apprendre", prerequis: ["6e_ecrit_hierarchiser"] }, // → ECRITURE
  { id: "6e_ecrit_apprendre_defi", label: "Défi : résumer une page en trois phrases, dans l'ordre", notionId: "ecriture_apprendre", prerequis: ["6e_ecrit_resumer", "6e_ecrit_justifier"] }, // → ECRIT_RESUMER

  // ── « Produire des écrits variés » ────────────────────────────────────────
  // BO : « Découvrir et expérimenter des situations variées d'écriture :
  // résumer, synthétiser » · « Écrire très fréquemment des textes personnels
  // (donner un avis personnel en le justifiant, produire un écrit narratif,
  // expliquer une démarche) » · « Respecter les codes de l'écrit » · « Veiller
  // à la cohérence textuelle ».
  { id: "6e_ecrit_invention", label: "Écrire un texte narratif qui se tient du début à la fin", notionId: "ecriture_produire", prerequis: ["6e_ecrit_notes"] }, // → ECRITURE
  { id: "6e_ecrit_reflexion", label: "Donner son avis par écrit et le justifier", notionId: "ecriture_produire", prerequis: ["6e_ecrit_notes"] }, // → ECRITURE
  { id: "6e_ecrit_coherence", label: "Veiller à la cohérence de son texte", notionId: "ecriture_produire", prerequis: ["6e_ecrit_invention"] }, // → ECRIT_COHERENCE
  { id: "6e_ecrit_codes", label: "Respecter les codes de l'écrit", notionId: "ecriture_produire", prerequis: ["6e_ecrit_invention"] }, // → ECRIT_COHERENCE
  { id: "6e_ecrit_produire_defi", label: "Défi : écrire la suite d'un récit sans en casser la logique", notionId: "ecriture_produire", prerequis: ["6e_ecrit_coherence", "6e_ecrit_codes"] }, // → ECRIT_COHERENCE

  // ── Revenir sur son texte ─────────────────────────────────────────────────
  // BO : « Utiliser le brouillon pour préparer son texte » · « Améliorer tout
  // ou partie de son texte à partir de son autoévaluation et/ou de pistes
  // données par l'enseignant et ses pairs » · « Prendre en compte les normes de
  // l'écrit pour réviser un texte ».
  { id: "6e_ecrit_brouillon", label: "Se servir du brouillon pour préparer son texte", notionId: "ecriture_reviser", prerequis: [] }, // → ECRIT_REVISER
  { id: "6e_ecrit_reviser", label: "Améliorer son texte après l'avoir relu", notionId: "ecriture_reviser", prerequis: ["6e_ecrit_brouillon"] }, // → ECRIT_REVISER
  { id: "6e_ecrit_normes", label: "Réviser son texte en s'appuyant sur les normes de l'écrit", notionId: "ecriture_reviser", prerequis: ["6e_ecrit_reviser"] }, // → ECRIT_REVISER
  { id: "6e_ecrit_reviser_defi", label: "Défi : trouver et corriger les erreurs d'un brouillon", notionId: "ecriture_reviser", prerequis: ["6e_ecrit_normes"] }, // → ECRIT_REVISER

  // ══ ORAL ══════════════════════════════════════════════════════════════════

  // ── « Écouter pour comprendre » ───────────────────────────────────────────
  // BO : « Construire sa posture d'auditeur en maintenant une écoute active
  // orientée en fonction du but » · « Comprendre un message oral provenant d'un
  // tiers ou d'un média » · « Montrer sa compréhension notamment en reformulant
  // avec ses mots des informations explicites et implicites d'un texte
  // entendu » · « Identifier les caractéristiques des différents genres de
  // discours » · « Exprimer son ressenti à l'écoute d'un texte ».
  { id: "6e_oral_ecouter", label: "Écouter activement, en sachant ce qu'on cherche", notionId: "oral_ecouter", prerequis: [] }, // → ORAL
  { id: "6e_oral_reformuler", label: "Reformuler avec ses mots ce qu'on a entendu", notionId: "oral_ecouter", prerequis: ["6e_oral_ecouter"] }, // → ORAL
  { id: "6e_oral_genres_discours", label: "Reconnaître le genre de discours qu'on écoute", notionId: "oral_ecouter", prerequis: ["6e_oral_reformuler"] }, // → ORAL
  { id: "6e_oral_ressenti", label: "Exprimer son ressenti à l'écoute d'un texte", notionId: "oral_ecouter", prerequis: ["6e_oral_reformuler"] }, // → ORAL
  { id: "6e_oral_ecouter_defi", label: "Défi : redire l'essentiel d'un propos entendu une seule fois", notionId: "oral_ecouter", prerequis: ["6e_oral_genres_discours", "6e_oral_ressenti"] }, // → ORAL

  // ── « Dire pour être compris dans toutes les disciplines » ────────────────
  // BO : « Réaliser une production orale, individuelle ou collective, claire et
  // organisée pour raconter, expliquer, argumenter, justifier ou partager des
  // connaissances » · « Lire, devant un public, de manière claire et
  // expressive, un texte littéraire ou documentaire » · « Utiliser l'oral comme
  // outil réflexif ».
  { id: "6e_oral_presenter", label: "Présenter un travail de façon claire et organisée", notionId: "oral_dire", prerequis: ["6e_oral_reformuler"] }, // → ORAL
  { id: "6e_oral_jouer", label: "Lire ou jouer un texte devant un public", notionId: "oral_dire", prerequis: ["6e_oral_presenter"] }, // → ORAL
  { id: "6e_oral_reflexif", label: "Se servir de la parole pour réfléchir à voix haute", notionId: "oral_dire", prerequis: ["6e_oral_presenter"] }, // → ORAL
  { id: "6e_oral_dire_defi", label: "Défi : expliquer une démarche à la classe, sans notes", notionId: "oral_dire", prerequis: ["6e_oral_jouer", "6e_oral_reflexif"] }, // → ORAL

  // ── « Participer à des échanges verbaux » ─────────────────────────────────
  // BO : « Prendre la parole en respectant les codes de la communication » ·
  // « Construire et ajuster son propos pour présenter de façon claire et
  // ordonnée des explications, des informations, un point de vue, une réponse à
  // une question » · « Adapter son discours en fonction de la situation de
  // communication » · « Porter un regard critique sur l'oral produit » ·
  // « Intervenir en tenant compte de ce qui a précédemment été dit par autrui ».
  { id: "6e_oral_codes", label: "Prendre la parole en respectant les codes de l'échange", notionId: "oral_echanger", prerequis: ["6e_oral_presenter"] }, // → ORAL
  { id: "6e_oral_argumenter", label: "Défendre un point de vue et l'ajuster", notionId: "oral_echanger", prerequis: ["6e_oral_codes"] }, // → ORAL
  { id: "6e_oral_interagir", label: "Intervenir en tenant compte de ce qui vient d'être dit", notionId: "oral_echanger", prerequis: ["6e_oral_argumenter"] }, // → ORAL
  { id: "6e_oral_regard_critique", label: "Porter un regard critique sur l'oral produit", notionId: "oral_echanger", prerequis: ["6e_oral_argumenter"] }, // → ORAL
  { id: "6e_oral_echanger_defi", label: "Défi : répondre à un camarade sans répéter ce qu'il a dit", notionId: "oral_echanger", prerequis: ["6e_oral_interagir", "6e_oral_regard_critique"] }, // → ORAL

  // ══ VOCABULAIRE ═══════════════════════════════════════════════════════════

  // ── « Enrichir son vocabulaire dans toutes les disciplines » ──────────────
  // BO : « Développer un vocabulaire spécifique dans différents univers de
  // référence » · « Choisir, de manière autonome, les stratégies les plus
  // efficaces pour comprendre un mot inconnu en prenant l'initiative de
  // déduire, de vérifier ou de rechercher le sens d'un mot ».
  { id: "6e_voc_contexte", label: "Déduire du contexte le sens d'un mot inconnu", notionId: "vocabulaire_enrichir", prerequis: [] }, // → VOC_CONTEXTE
  { id: "6e_voc_strategies", label: "Choisir seul comment élucider un mot : déduire, vérifier, chercher", notionId: "vocabulaire_enrichir", prerequis: ["6e_voc_contexte"] }, // → VOC_CONTEXTE
  { id: "6e_voc_sens_figure", label: "Reconnaître un emploi au sens figuré", notionId: "vocabulaire_enrichir", prerequis: ["6e_voc_contexte"] }, // → SENS_FIGURE
  { id: "6e_voc_sens_defi", label: "Défi : donner le sens d'un mot d'après la phrase où il apparaît", notionId: "vocabulaire_enrichir", prerequis: ["6e_voc_strategies", "6e_voc_sens_figure"] }, // → défi lexique

  // ── « Établir des relations entre les mots » ──────────────────────────────
  // BO : « Composer et décomposer des mots pour les analyser et en créer de
  // nouveaux en s'appuyant sur les relations morphologiques et sémantiques » ·
  // « Différencier les mots simples, dérivés et composés » · « Donner des
  // exemples de synonymes et d'antonymes qui respectent la classe grammaticale
  // du mot cible » · « Se sensibiliser à l'étymologie et à l'évolution du sens
  // des mots ».
  { id: "6e_voc_relations", label: "Donner un synonyme ou un antonyme de la même classe grammaticale", notionId: "vocabulaire_relations", prerequis: ["6e_voc_contexte"] }, // → VOC_SYN_ANT
  { id: "6e_voc_formation", label: "Différencier un mot simple, un mot dérivé et un mot composé", notionId: "vocabulaire_relations", prerequis: ["6e_voc_relations"] }, // → VOC_FAMILLE
  { id: "6e_voc_composition", label: "Composer et décomposer un mot pour l'analyser", notionId: "vocabulaire_relations", prerequis: ["6e_voc_formation"] }, // → COMPOSITION
  { id: "6e_voc_racines", label: "Reconnaître une racine latine ou grecque dans un mot", notionId: "vocabulaire_relations", prerequis: ["6e_voc_composition"] }, // → RACINES
  { id: "6e_voc_formation_defi", label: "Défi : fabriquer un mot nouveau à partir d'une racine connue", notionId: "vocabulaire_relations", prerequis: ["6e_voc_racines"] }, // → défi lexique

  // ── « Réemployer le vocabulaire étudié » + « Mémoriser l'orthographe » ────
  // BO : « À l'oral et à l'écrit, utiliser à bon escient le vocabulaire
  // spécifique issu de différents univers de référence et se l'approprier
  // durablement, EN RESPECTANT LE REGISTRE DE LANGUE » · « utiliser à bon
  // escient les mots polysémiques dans différents contextes disciplinaires » ·
  // « Écrire correctement les mots fréquents en situation autonome ».
  { id: "6e_voc_reemploi", label: "Réemployer à bon escient un mot qu'on vient d'apprendre", notionId: "vocabulaire_emploi", prerequis: ["6e_voc_relations"] }, // → VOC_REEMPLOI
  { id: "6e_voc_niveau_langue", label: "Choisir le registre de langue qui convient à la situation", notionId: "vocabulaire_emploi", prerequis: ["6e_voc_reemploi"] }, // → NIVEAU_LANGUE
  { id: "6e_voc_polysemie", label: "Employer un mot polysémique dans le bon contexte", notionId: "vocabulaire_emploi", prerequis: ["6e_voc_reemploi"] }, // → VOC_POLYSEMIE
  { id: "6e_voc_orthographe", label: "Écrire correctement les mots fréquents, seul", notionId: "vocabulaire_emploi", prerequis: ["6e_voc_reemploi"] }, // → VOC_ORTH
  { id: "6e_voc_emploi_defi", label: "Défi : réécrire une phrase familière en langage courant", notionId: "vocabulaire_emploi", prerequis: ["6e_voc_niveau_langue", "6e_voc_orthographe"] }, // → défi lexique

  // ══ GRAMMAIRE ET ORTHOGRAPHE GRAMMATICALE ═════════════════════════════════

  // ── « Analyser une phrase simple » ────────────────────────────────────────
  // BO : « Consolider les compétences antérieures dans des phrases se
  // complexifiant » · « Identifier tous les constituants syntaxiques de la
  // phrase simple étudiés précédemment » · « Utiliser les manipulations
  // syntaxiques et étudier la construction du verbe au service de la
  // reconnaissance des constituants d'une phrase ».
  { id: "6e_gram_constituants", label: "Identifier tous les constituants d'une phrase simple", notionId: "grammaire_phrase", prerequis: [] }, // → PHRASE_SIMPLE / GN
  { id: "6e_gram_fonctions", label: "Repérer le sujet, le verbe et les groupes qui les complètent", notionId: "grammaire_phrase", prerequis: ["6e_gram_constituants"] }, // → SUJET_VERBE / COMPLEMENTS
  { id: "6e_gram_manipulations", label: "Déplacer, supprimer, remplacer, encadrer pour reconnaître un groupe", notionId: "grammaire_phrase", prerequis: ["6e_gram_constituants"] }, // → MANIPULATIONS
  { id: "6e_gram_phrase_defi", label: "Défi : analyser une phrase longue de bout en bout", notionId: "grammaire_phrase", prerequis: ["6e_gram_fonctions", "6e_gram_manipulations"] }, // → défi phrase

  // ── Attribut du sujet et compléments du verbe ─────────────────────────────
  // BO 6e : « OPPOSER ET DISTINGUER attribut du sujet et complément d'objet
  // direct (COD) » — le seul objectif que le programme formule comme une
  // opposition, et le geste neuf de l'année. Les compléments d'objet et
  // circonstanciels viennent du CM2 : le BO demande de les « consolider ».
  { id: "6e_gram_attribut_cod", label: "Opposer l'attribut du sujet et le complément d'objet direct", notionId: "grammaire_complements", prerequis: ["6e_gram_fonctions"] }, // → ATTRIBUT
  { id: "6e_gram_cod_coi", label: "Distinguer le complément d'objet direct et l'indirect", notionId: "grammaire_complements", prerequis: ["6e_gram_fonctions"] }, // → COD_COI
  { id: "6e_gram_cc_sortes", label: "Reconnaître un complément circonstanciel de temps, de lieu ou de cause", notionId: "grammaire_complements", prerequis: ["6e_gram_fonctions"] }, // → CC_SORTES
  { id: "6e_gram_complements_defi", label: "Défi : dire la fonction de chaque groupe après le verbe", notionId: "grammaire_complements", prerequis: ["6e_gram_attribut_cod", "6e_gram_cod_coi", "6e_gram_cc_sortes"] }, // → défi compléments

  // ── « Analyser le groupe nominal » ────────────────────────────────────────
  // BO : « Identifier le groupe nominal, QUELLE QUE SOIT SA FONCTION dans la
  // phrase » · « Identifier et différencier SANS AMBIGÜITÉ adjectif/groupe
  // adjectival de fonction épithète et groupe nominal prépositionnel de
  // fonction complément du nom ».
  { id: "6e_gram_gn", label: "Repérer un groupe nominal et son nom noyau", notionId: "grammaire_groupe_nominal", prerequis: ["6e_gram_constituants"] }, // → GN
  { id: "6e_gram_gn_toute_fonction", label: "Reconnaître un groupe nominal quelle que soit sa fonction", notionId: "grammaire_groupe_nominal", prerequis: ["6e_gram_gn"] }, // → GN
  { id: "6e_gram_epithete_cn", label: "Différencier l'épithète et le complément du nom", notionId: "grammaire_groupe_nominal", prerequis: ["6e_gram_gn"] }, // → COMPLEMENT_NOM
  { id: "6e_gram_gn_defi", label: "Défi : nommer chaque expansion d'un groupe nominal étendu", notionId: "grammaire_groupe_nominal", prerequis: ["6e_gram_gn_toute_fonction", "6e_gram_epithete_cn"] }, // → défi GN

  // ── « Identifier les mots, un groupe de mots selon leur nature » ──────────
  // BO : « Identifier AISÉMENT les pronoms personnels et PRÉCISER LEUR
  // FONCTION » · « METTRE EN RELATION UN PRONOM PERSONNEL AVEC SON ANTÉCÉDENT ».
  { id: "6e_gram_pronoms", label: "Identifier un pronom personnel sujet ou complément", notionId: "grammaire_pronoms", prerequis: ["6e_gram_fonctions"] }, // → PRONOMS_SUJET_OBJET
  { id: "6e_gram_pronoms_fonction", label: "Préciser la fonction d'un pronom personnel dans la phrase", notionId: "grammaire_pronoms", prerequis: ["6e_gram_pronoms"] }, // → PRONOMS_SUJET_OBJET
  { id: "6e_gram_pronom_antecedent", label: "Relier un pronom personnel à son antécédent", notionId: "grammaire_pronoms", prerequis: ["6e_gram_pronoms"] }, // → PRONOM_ANTECEDENT
  { id: "6e_gram_pronoms_defi", label: "Défi : dire qui est « il » et quelle est sa fonction", notionId: "grammaire_pronoms", prerequis: ["6e_gram_pronoms_fonction", "6e_gram_pronom_antecedent"] }, // → PRONOMS_SUJET_OBJET

  // ── « Acquérir l'orthographe grammaticale » ───────────────────────────────
  // BO : « Améliorer son orthographe grammaticale dans le cadre de la
  // production d'écrits ou d'exercices d'entraînement » · « MAÎTRISER la chaîne
  // d'accords dans le groupe nominal, en lien avec l'analyse grammaticale » ·
  // « Identifier le groupe sujet et RAISONNER sur l'accord sujet/verbe » ·
  // « Maîtriser l'accord du participe passé employé avec l'auxiliaire être » ·
  // « Accorder le participe passé avec le COD pour les verbes conjugués avec
  // l'auxiliaire avoir (pronom personnel antéposé) ».
  { id: "6e_orth_accord_gn", label: "Tenir la chaîne d'accords dans le groupe nominal", notionId: "grammaire_accords", prerequis: ["6e_gram_gn"] }, // → moteur d'accord du GN
  { id: "6e_orth_sujet_verbe", label: "Raisonner sur l'accord du verbe avec son groupe sujet", notionId: "grammaire_accords", prerequis: ["6e_gram_fonctions"] }, // → moteur sujet-verbe / ACCORD_SUJET_VERBE
  { id: "6e_orth_participe_passe", label: "Accorder le participe passé avec être, et avec le COD antéposé pour avoir", notionId: "grammaire_accords", prerequis: ["6e_orth_sujet_verbe"] }, // → PARTICIPE_PASSE
  /* ⚠️ REPRISE DE `6e_gram_oral_ecrit`, SUPPRIMÉE LE 22/08/2026. Cette micro
     venait de la fabrique du cycle 4 (« Distinguer usages de l'oral et de
     l'écrit ») et n'existe nulle part dans le programme de cycle 3. Ce qu'elle
     servait vraiment, ce sont les homophones grammaticaux — un attendu, lui,
     bien réel : « Améliorer son orthographe grammaticale ». */
  { id: "6e_orth_homophones", label: "Choisir entre deux homophones grammaticaux", notionId: "grammaire_accords", prerequis: ["6e_orth_sujet_verbe"] }, // → HOMOPHONES
  { id: "6e_orth_accords_defi", label: "Défi : corriger tous les accords d'une phrase", notionId: "grammaire_accords", prerequis: ["6e_orth_accord_gn", "6e_orth_participe_passe", "6e_orth_homophones"] }, // → défi accords

  // ── « Se repérer dans la phrase complexe » ────────────────────────────────
  // BO : « Comprendre la notion de proposition » · « Distinguer phrase simple
  // et phrase complexe à partir du repérage des propositions » · « Approfondir
  // les notions de juxtaposition, de coordination, de subordination » ·
  // « Distinguer le rôle de la conjonction de coordination et celui de la
  // conjonction de subordination ».
  { id: "6e_complexe_proposition", label: "Comprendre la notion de proposition et compter les propositions", notionId: "phrase_complexe", prerequis: ["6e_gram_constituants"] }, // → PROPOSITION
  { id: "6e_complexe_articulation", label: "Distinguer juxtaposition, coordination et subordination", notionId: "phrase_complexe", prerequis: ["6e_complexe_proposition"] }, // → ARTICULATION
  { id: "6e_complexe_conjonctions", label: "Distinguer une conjonction de coordination d'une conjonction de subordination", notionId: "phrase_complexe", prerequis: ["6e_complexe_articulation"] }, // → CONJONCTIONS_ROLE
  { id: "6e_complexe_defi", label: "Défi : compter les propositions et nommer ce qui les relie", notionId: "phrase_complexe", prerequis: ["6e_complexe_conjonctions"] }, // → défi phrase complexe

  // ══ CONJUGAISON ═══════════════════════════════════════════════════════════
  // « Approfondir sa maîtrise de la conjugaison », sept attendus en 6e.

  // ── Lire une forme verbale ────────────────────────────────────────────────
  // BO : « Connaître les marques des temps étudiés au CM1 et CM2 » ·
  // « Maîtriser les variations du radical pour certains verbes du 1er groupe ».
  { id: "6e_conj_identifier", label: "Donner le temps, le mode et la personne d'un verbe conjugué", notionId: "conjugaison_formes", prerequis: ["6e_gram_fonctions"] }, // → rotation des temps
  { id: "6e_conj_marques", label: "Retrouver dans la terminaison la marque de temps et celle de personne", notionId: "conjugaison_formes", prerequis: ["6e_conj_identifier"] }, // → MARQUES_TEMPS_PERSONNE
  { id: "6e_conj_radical_variations", label: "Maîtriser les variations du radical des verbes du premier groupe", notionId: "conjugaison_formes", prerequis: ["6e_conj_identifier"] }, // → RADICAL_VARIATIONS
  { id: "6e_conj_simples_defi", label: "Défi : conjuguer aux temps simples déjà connus", notionId: "conjugaison_formes", prerequis: ["6e_conj_marques", "6e_conj_radical_variations"] }, // → défi temps simples

  // ── Les temps composés ────────────────────────────────────────────────────
  // BO : « Consolider la maîtrise de la conjugaison des temps composés (passé
  // composé et plus-que-parfait). CONNAÎTRE LEUR COMPOSITION EN DEUX PARTIES ».
  { id: "6e_conj_composer", label: "Former un temps composé : auxiliaire + participe passé", notionId: "conjugaison_temps_composes", prerequis: ["6e_conj_marques"] }, // → rotation des temps
  { id: "6e_conj_passe_compose", label: "Conjuguer au passé composé", notionId: "conjugaison_temps_composes", prerequis: ["6e_conj_composer"] }, // → CONJ_PASSE_COMPOSE
  { id: "6e_conj_plus_que_parfait", label: "Conjuguer au plus-que-parfait", notionId: "conjugaison_temps_composes", prerequis: ["6e_conj_composer"] }, // → CONJ_PLUS_QUE_PARFAIT
  { id: "6e_conj_passe_compose_defi", label: "Défi : choisir l'auxiliaire et accorder le participe", notionId: "conjugaison_temps_composes", prerequis: ["6e_conj_passe_compose", "6e_conj_plus_que_parfait"] }, // → CONJ_PASSE_COMPOSE

  // ── Impératif et conditionnel ─────────────────────────────────────────────
  // BO : « Conjugaisons à mémoriser et à maîtriser : IMPÉRATIF PRÉSENT,
  // CONDITIONNEL PRÉSENT des verbes être et avoir, des verbes des premier et
  // deuxième groupes, des verbes irréguliers du troisième groupe : faire,
  // aller, dire, venir, pouvoir, voir, vouloir, prendre » · « Identifier les
  // marques de temps pour le conditionnel présent et l'impératif présent ».
  { id: "6e_conj_imperatif_conditionnel", label: "Conjuguer à l'impératif présent et au conditionnel présent", notionId: "conjugaison_modes", prerequis: ["6e_conj_marques"] }, // → IMPERATIF_CONDITIONNEL
  { id: "6e_conj_marques_conditionnel", label: "Reconnaître la marque du conditionnel et celle de l'impératif", notionId: "conjugaison_modes", prerequis: ["6e_conj_imperatif_conditionnel"] }, // → IMPERATIF_CONDITIONNEL
  { id: "6e_conj_imperatif_defi", label: "Défi : dire à quel mode est un verbe et pourquoi", notionId: "conjugaison_modes", prerequis: ["6e_conj_marques_conditionnel"] }, // → IMPERATIF_CONDITIONNEL

  // ── La valeur des temps ───────────────────────────────────────────────────
  // BO : « INITIER À LA NOTION DE VALEURS DES TEMPS par observation,
  // comparaison, opposition de phrases et textes rencontrés : des temps du
  // discours, puis des temps du récit. Quelques valeurs temporelles des temps
  // seront identifiées. » ⚠️ Le BO précise que la démarche vise à « clarifier
  // la distinction entre le temps chronologique (passé, présent, futur) et le
  // temps verbal (imparfait, passé simple, passé composé) ».
  { id: "6e_conj_discours_recit", label: "Distinguer les temps du discours et les temps du récit", notionId: "conjugaison_valeurs", prerequis: ["6e_conj_passe_compose"] }, // → DISCOURS_RECIT
  { id: "6e_conj_employer", label: "Employer le temps qui convient au sens de la phrase", notionId: "conjugaison_valeurs", prerequis: ["6e_conj_discours_recit"] }, // → rotation des temps
  { id: "6e_conj_recit_defi", label: "Défi : reconnaître si un texte raconte ou si quelqu'un parle", notionId: "conjugaison_valeurs", prerequis: ["6e_conj_employer"] }, // → défi récit
];
