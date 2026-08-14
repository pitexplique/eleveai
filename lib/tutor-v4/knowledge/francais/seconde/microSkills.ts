import type { MicroSkillSource } from "@/lib/tutor-v4/knowledge/buildKnowledge";

/* Micro-compétences de français de seconde.

   ⭐ LA RÈGLE QUI TIENT TOUT CE FICHIER : toute micro demande une
   TRANSFORMATION ou un EFFET, jamais une étiquette. « Quelle est la nature de
   cette subordonnée ? » est une question de collège ; « que change-t-on en la
   remplaçant par un groupe nominal ? » est une question de lycée. Le programme
   nomme lui-même les gestes attendus : commutation, déplacement, suppression,
   adjonction, pronominalisation, passage à la voix passive (III), puis
   relativisation, commutation d'une relative avec d'autres expansions,
   commutation d'une circonstancielle avec un groupe nominal, commutation des
   outils de cohésion avec des expressions synonymes (IV).

   ⚠️ Ces libellés sont écrits EN TOUTES LETTRES, jamais fabriqués : c'est
   parce qu'une fabrique nourrissait trois niveaux que les 34 micros identiques
   de 5e/4e/3e sont restées invisibles, et seize scripts de vérification sur
   vingt-huit lisent le SOURCE.

   ⚠️ Aucun repli générique n'existe au lycée (`buildCycle4FrancaisBank` ne
   couvre que 5e|4e|3e) : une micro sans banque n'affichera RIEN. C'est un
   garde-fou, pas un bug — mais chaque micro d'ici attend sa banque. */
export const microSkills: MicroSkillSource[] = [
  /* ===================== accords_2de =====================
     « reprend de manière synthétique les règles d'accord abordées depuis le
     cycle 2 » + « consolider la connaissance des classes lexicales et des
     fonctions syntaxiques dans la phrase simple ». Donc : non pas accorder,
     mais dire QUI commande l'accord et ce qu'une reprise change. */
  { id: "2de_acc_commande_gn", label: "Dire quel mot commande l'accord dans un groupe nominal étendu", notionId: "accords_2de", prerequis: [] },
  { id: "2de_acc_sujet_ecran", label: "Retrouver le sujet qui commande le verbe malgré un écran", notionId: "accords_2de", prerequis: [] },
  { id: "2de_acc_sujet_difficile", label: "Accorder le verbe après un sujet collectif, multiple ou inversé", notionId: "accords_2de", prerequis: ["2de_acc_sujet_ecran"] },
  { id: "2de_acc_participe_place", label: "Justifier l'accord du participe passé par la place du complément", notionId: "accords_2de", prerequis: ["2de_acc_commande_gn"] },
  { id: "2de_acc_homophone", label: "Trancher entre deux graphies homophones en s'appuyant sur l'accord", notionId: "accords_2de", prerequis: ["2de_acc_participe_place"] },
  { id: "2de_acc_classe_fonction", label: "Distinguer la classe d'un mot de sa fonction dans la phrase simple", notionId: "accords_2de", prerequis: [] },

  /* ===================== verbe_valeurs_2de =====================
     ⚠️ « parvenus au lycée, les élèves doivent donc être capables d'identifier
     une forme verbale » : l'identification est l'ACQUIS D'ENTRÉE. Ce qui est
     neuf, c'est le partage temps / aspect / mode, et la modalisation. */
  { id: "2de_verbe_temps_aspect", label: "Séparer ce qui relève du temps de ce qui relève de l'aspect", notionId: "verbe_valeurs_2de", prerequis: [] },
  { id: "2de_verbe_accompli", label: "Dire si une forme verbale présente l'action comme accomplie ou en cours", notionId: "verbe_valeurs_2de", prerequis: ["2de_verbe_temps_aspect"] },
  { id: "2de_verbe_temps_recit", label: "Dire ce que l'alternance imparfait / passé simple installe dans un récit", notionId: "verbe_valeurs_2de", prerequis: ["2de_verbe_accompli"] },
  { id: "2de_verbe_present_valeur", label: "Choisir la valeur d'un présent d'après ce qui l'entoure", notionId: "verbe_valeurs_2de", prerequis: [] },
  { id: "2de_verbe_valeur_modale", label: "Interpréter la valeur modale d'un conditionnel, d'un futur ou d'un subjonctif", notionId: "verbe_valeurs_2de", prerequis: ["2de_verbe_temps_aspect"] },
  { id: "2de_verbe_modalisation", label: "Repérer ce qui modalise un propos et dire à quoi l'auteur s'engage", notionId: "verbe_valeurs_2de", prerequis: ["2de_verbe_valeur_modale"] },

  /* ===================== concordance_temps_2de ===================== */
  { id: "2de_conc_principale_subordonnee", label: "Choisir le temps de la subordonnée d'après celui de la principale", notionId: "concordance_temps_2de", prerequis: ["2de_verbe_temps_aspect"] },
  { id: "2de_conc_reperes", label: "Marquer l'antériorité, la simultanéité ou la postériorité", notionId: "concordance_temps_2de", prerequis: ["2de_conc_principale_subordonnee"] },
  { id: "2de_conc_recit_au_passe", label: "Transposer un récit du présent au passé sans casser la chronologie", notionId: "concordance_temps_2de", prerequis: ["2de_conc_reperes"] },
  { id: "2de_conc_discours_rapporte", label: "Transposer une parole du discours direct au discours indirect", notionId: "concordance_temps_2de", prerequis: ["2de_conc_reperes"] },
  { id: "2de_conc_subjonctif", label: "Choisir le temps du subjonctif attendu dans une subordonnée", notionId: "concordance_temps_2de", prerequis: ["2de_conc_principale_subordonnee"] },

  /* ===================== phrase_complexe_2de =====================
     « l'étude des rapports entre les propositions s'enrichit d'une ÉTUDE
     SÉMANTIQUE de ces rapports permettant de rendre compte avec précision de
     l'interprétation des textes ». Le lien se nomme au collège ; ici il se
     commute, et on mesure l'écart de sens. */
  { id: "2de_pc_juxtaposition_sens", label: "Dire quel rapport de sens une juxtaposition laisse deviner", notionId: "phrase_complexe_2de", prerequis: [] },
  { id: "2de_pc_coordonnant_sens", label: "Dire ce que le choix d'un coordonnant change au sens", notionId: "phrase_complexe_2de", prerequis: ["2de_pc_juxtaposition_sens"] },
  { id: "2de_pc_subordination_plan", label: "Dire ce que la subordination met au premier plan et ce qu'elle relègue", notionId: "phrase_complexe_2de", prerequis: ["2de_pc_coordonnant_sens"] },
  { id: "2de_pc_commuter_liens", label: "Commuter juxtaposition, coordination et subordination et mesurer l'écart", notionId: "phrase_complexe_2de", prerequis: ["2de_pc_subordination_plan"] },
  { id: "2de_pc_expliciter_implicite", label: "Rendre explicite un rapport que la phrase laisse implicite", notionId: "phrase_complexe_2de", prerequis: ["2de_pc_juxtaposition_sens"] },
  { id: "2de_pc_interpreter_texte", label: "Choisir l'interprétation qu'un lien de phrase impose dans un texte", notionId: "phrase_complexe_2de", prerequis: ["2de_pc_commuter_liens"] },

  /* ===================== relatives_2de =====================
     « notamment celles qui sont introduites par dont, auquel, duquel », « en
     insistant sur ce qui les distingue des subordonnées conjonctives », et au
     IV : relativisation, commutation avec d'autres types d'expansions.
     ⭐ La relative ne se demande jamais seule : elle se demande CONTRE la
     conjonctive. */
  { id: "2de_rel_dont", label: "Construire une relative avec dont et repérer l'emploi fautif", notionId: "relatives_2de", prerequis: [] },
  { id: "2de_rel_auquel_duquel", label: "Choisir entre auquel, duquel et lequel d'après la construction du verbe", notionId: "relatives_2de", prerequis: ["2de_rel_dont"] },
  { id: "2de_rel_vs_conjonctive", label: "Distinguer la relative de la conjonctive par ce que chacune complète", notionId: "relatives_2de", prerequis: ["2de_rel_dont"] },
  { id: "2de_rel_relativisation", label: "Fondre deux phrases en une seule par relativisation", notionId: "relatives_2de", prerequis: ["2de_rel_auquel_duquel"] },
  { id: "2de_rel_commuter_expansion", label: "Commuter une relative avec un adjectif, un participe ou un complément du nom", notionId: "relatives_2de", prerequis: ["2de_rel_relativisation"] },
  { id: "2de_rel_virgule_sens", label: "Dire ce que la virgule change au sens d'une relative", notionId: "relatives_2de", prerequis: ["2de_rel_vs_conjonctive"] },

  /* ===================== lexique_2de =====================
     « les modes de néologie (dérivation, composition, emprunt) », « les
     relations lexicales (synonymie, antonymie, hyperonymie) », et surtout
     « structurer sa pensée par le mot le plus juste », « percevoir la nuance
     d'une formule chez un auteur, en proposer une reformulation ». */
  { id: "2de_lex_derivation", label: "Déduire le sens d'un mot construit de son préfixe et de son suffixe", notionId: "lexique_2de", prerequis: [] },
  { id: "2de_lex_composition_emprunt", label: "Distinguer un mot composé d'un emprunt et dire ce qu'il apporte", notionId: "lexique_2de", prerequis: ["2de_lex_derivation"] },
  { id: "2de_lex_hyperonymie", label: "Ordonner des mots du plus générique au plus précis", notionId: "lexique_2de", prerequis: [] },
  { id: "2de_lex_nuance_synonyme", label: "Choisir le synonyme qui garde la nuance de la formule d'origine", notionId: "lexique_2de", prerequis: ["2de_lex_hyperonymie"] },
  { id: "2de_lex_antonymie", label: "Former un antonyme par préfixation et dire ce qu'il nie exactement", notionId: "lexique_2de", prerequis: ["2de_lex_derivation"] },
  { id: "2de_lex_registre", label: "Choisir le mot qui convient au registre de langue du texte", notionId: "lexique_2de", prerequis: ["2de_lex_nuance_synonyme"] },

  /* ===================== relations_logiques_2de =====================
     ⚠️ Les quatre axes nommés par le texte : la condition ; la cause, la
     conséquence et le but ; la comparaison ; l'opposition et la concession.
     ⛔ On les EXPRIME et on les COMMUTE — étiqueter la subordonnée
     circonstancielle est un objet de PREMIÈRE. */
  { id: "2de_rl_cause_consequence", label: "Choisir l'outil qui exprime une cause plutôt qu'une conséquence", notionId: "relations_logiques_2de", prerequis: [] },
  { id: "2de_rl_but_condition", label: "Exprimer un but ou une condition et dire ce que le choix engage", notionId: "relations_logiques_2de", prerequis: ["2de_rl_cause_consequence"] },
  { id: "2de_rl_opposition_concession", label: "Séparer ce qui s'oppose de ce qui se concède", notionId: "relations_logiques_2de", prerequis: ["2de_rl_cause_consequence"] },
  { id: "2de_rl_comparaison", label: "Exprimer une comparaison et dire ce qu'elle met en avant", notionId: "relations_logiques_2de", prerequis: [] },
  { id: "2de_rl_commuter_gn", label: "Commuter une subordonnée avec un groupe nominal de même sens", notionId: "relations_logiques_2de", prerequis: ["2de_rl_but_condition", "2de_rl_opposition_concession"] },
  { id: "2de_rl_connecteur_paragraphe", label: "Choisir le connecteur qui enchaîne deux paragraphes sans les fausser", notionId: "relations_logiques_2de", prerequis: ["2de_rl_opposition_concession"] },
  { id: "2de_rl_reprises", label: "Reprendre un mot sans répétition ni ambiguïté sur ce qu'il désigne", notionId: "relations_logiques_2de", prerequis: [] },

  /* ===================== exercices_methode_2de =====================
     ⛔ MÉTHODE SEULEMENT. Le programme cite « commentaire de texte,
     dissertation, contraction de texte suivie d'un essai » comme travaux
     aboutis ; un QCM dit ce que chacun attend, il ne les corrige pas. */
  { id: "2de_meth_commentaire", label: "Reconnaître ce qu'un commentaire de texte attend et ce qu'il proscrit", notionId: "exercices_methode_2de", prerequis: [] },
  { id: "2de_meth_dissertation", label: "Reconnaître ce qu'une dissertation attend d'un plan", notionId: "exercices_methode_2de", prerequis: [] },
  { id: "2de_meth_contraction", label: "Contracter un texte : dire ce qui se garde et ce qui se perd", notionId: "exercices_methode_2de", prerequis: [] },
  { id: "2de_meth_essai", label: "Reconnaître ce qu'un essai demande de personnel et d'argumenté", notionId: "exercices_methode_2de", prerequis: ["2de_meth_contraction"] },
  { id: "2de_meth_explication", label: "Distinguer l'explication de texte du commentaire", notionId: "exercices_methode_2de", prerequis: ["2de_meth_commentaire"] },
  { id: "2de_meth_citation", label: "Insérer une citation dans une phrase sans la déformer", notionId: "exercices_methode_2de", prerequis: [] },

  /* ===================== poesie_formes_2de =====================
     « la restitution des valeurs rythmiques et sonores du vers ». Le texte
     nomme lui-même métaphore et assonance dans le vocabulaire du lycée. */
  { id: "2de_poe_metre", label: "Compter les syllabes d'un vers, e muet compris", notionId: "poesie_formes_2de", prerequis: [] },
  { id: "2de_poe_rimes", label: "Décrire la disposition et la richesse des rimes", notionId: "poesie_formes_2de", prerequis: ["2de_poe_metre"] },
  { id: "2de_poe_rythme", label: "Dire ce qu'une césure, un enjambement ou un rejet produit", notionId: "poesie_formes_2de", prerequis: ["2de_poe_metre"] },
  { id: "2de_poe_sonorites", label: "Dire ce qu'une allitération ou une assonance fait entendre", notionId: "poesie_formes_2de", prerequis: [] },
  { id: "2de_poe_formes_fixes", label: "Reconnaître un sonnet, une ballade, un rondeau ou une ode à sa forme", notionId: "poesie_formes_2de", prerequis: ["2de_poe_rimes"] },
  { id: "2de_poe_images", label: "Dire ce qu'une métaphore construit que la comparaison ne construit pas", notionId: "poesie_formes_2de", prerequis: [] },

  /* ===================== poesie_histoire_2de =====================
     ⭐ Les cinq mouvements sont NOMMÉS par le programme : fin'amor, Humanisme,
     Pléiade, préciosité, classicisme. « des repères sur son histoire, ses
     continuités, ses évolutions et ses ruptures ».
     ⛔ On interroge un MOUVEMENT, jamais une œuvre. */
  { id: "2de_poehist_finamor", label: "Reconnaître ce que la fin'amor met au centre du poème", notionId: "poesie_histoire_2de", prerequis: [] },
  { id: "2de_poehist_humanisme_pleiade", label: "Reconnaître un projet de l'Humanisme et de la Pléiade", notionId: "poesie_histoire_2de", prerequis: [] },
  { id: "2de_poehist_preciosite", label: "Reconnaître ce que l'écriture précieuse recherche", notionId: "poesie_histoire_2de", prerequis: ["2de_poehist_humanisme_pleiade"] },
  { id: "2de_poehist_classicisme", label: "Reconnaître ce que le classicisme exige du poème", notionId: "poesie_histoire_2de", prerequis: ["2de_poehist_preciosite"] },
  { id: "2de_poehist_siecle", label: "Situer un mouvement poétique dans son siècle", notionId: "poesie_histoire_2de", prerequis: ["2de_poehist_finamor", "2de_poehist_classicisme"] },
  { id: "2de_poehist_continuite_rupture", label: "Dire ce qu'un mouvement garde du précédent et ce qu'il rompt", notionId: "poesie_histoire_2de", prerequis: ["2de_poehist_siecle"] },

  /* ===================== argumentation_2de =====================
     « dégager la visée d'une argumentation, en déterminer les présupposés et
     l'inscrire dans un courant de pensée plus large ».
     ⭐ Les trois genres du discours sont nommés par le programme — épidictique,
     judiciaire, délibératif — et ils sont absents du collège.
     ⚠️ 13/08 : deux réponses d'un même pool ne doivent jamais s'emboiter. Une
     fable EST de l'argumentation indirecte, une réfutation EST un raisonnement. */
  { id: "2de_arg_these_visee", label: "Dégager la thèse d'un texte et la visée qu'elle sert", notionId: "argumentation_2de", prerequis: [] },
  { id: "2de_arg_presuppose", label: "Repérer ce qu'un énoncé tient pour acquis sans le dire", notionId: "argumentation_2de", prerequis: ["2de_arg_these_visee"] },
  { id: "2de_arg_genres_discours", label: "Distinguer le discours épidictique, judiciaire et délibératif", notionId: "argumentation_2de", prerequis: [] },
  { id: "2de_arg_formes", label: "Reconnaître la forme que prend une argumentation", notionId: "argumentation_2de", prerequis: ["2de_arg_these_visee"] },
  { id: "2de_arg_concession_refutation", label: "Dire ce qu'une concession ou une réfutation fait gagner à qui argumente", notionId: "argumentation_2de", prerequis: ["2de_arg_presuppose"] },
  { id: "2de_arg_courant_pensee", label: "Inscrire une argumentation dans le courant de pensée qui l'étaye", notionId: "argumentation_2de", prerequis: ["2de_arg_presuppose"] },

  /* ===================== presse_medias_2de =====================
     « l'influence des moyens techniques modernes de communication de masse, du
     XIXe siècle à nos jours », « l'histoire de l'écrit et de l'évolution de ses
     supports », « la critique journalistique sous toutes ses formes »,
     « photographies de presse, affiches, caricatures ». */
  { id: "2de_pres_genres", label: "Distinguer information, opinion, enquête et critique dans la presse", notionId: "presse_medias_2de", prerequis: [] },
  { id: "2de_pres_fait_jugement", label: "Séparer ce qu'un article rapporte de ce qu'il juge", notionId: "presse_medias_2de", prerequis: ["2de_pres_genres"] },
  { id: "2de_pres_titre_presuppose", label: "Dire ce qu'un titre de presse fait admettre avant d'être lu", notionId: "presse_medias_2de", prerequis: ["2de_pres_fait_jugement"] },
  { id: "2de_pres_sources", label: "Peser la fiabilité d'une source et de son support", notionId: "presse_medias_2de", prerequis: ["2de_pres_fait_jugement"] },
  { id: "2de_pres_supports_histoire", label: "Situer une étape de l'histoire de la presse et de ses supports", notionId: "presse_medias_2de", prerequis: ["2de_pres_genres"] },
  { id: "2de_pres_image", label: "Dire ce qu'une photographie de presse ou une caricature met en avant", notionId: "presse_medias_2de", prerequis: ["2de_pres_titre_presuppose"] },

  /* ===================== roman_formes_2de =====================
     « deux œuvres intégrales de forme ET de siècle différents : un roman et,
     par ailleurs, un recueil de nouvelles, ou un récit de voyage, un récit
     relevant de l'une des formes du biographique, un journal ». */
  { id: "2de_rom_formes", label: "Reconnaître la forme d'un récit à ce qu'elle impose", notionId: "roman_formes_2de", prerequis: [] },
  { id: "2de_rom_brievete", label: "Dire ce que la brièveté impose à la nouvelle et à sa chute", notionId: "roman_formes_2de", prerequis: ["2de_rom_formes"] },
  { id: "2de_rom_biographique", label: "Dire ce que chaque forme du biographique engage entre l'auteur et le lecteur", notionId: "roman_formes_2de", prerequis: ["2de_rom_formes"] },
  { id: "2de_rom_evolution", label: "Situer une évolution des formes narratives dans son siècle", notionId: "roman_formes_2de", prerequis: ["2de_rom_biographique"] },
  { id: "2de_rom_effet_de_reel", label: "Dire ce qu'un détail inutile à l'action produit sur le lecteur", notionId: "roman_formes_2de", prerequis: ["2de_rom_formes"] },
  { id: "2de_rom_personnage", label: "Dire ce qu'un portrait construit du personnage sans le déclarer", notionId: "roman_formes_2de", prerequis: ["2de_rom_effet_de_reel"] },

  /* ===================== narration_2de =====================
     ⭐ « focalisation » est l'un des cinq termes que le programme cite comme
     vocabulaire technique du lycée. */
  { id: "2de_nar_narrateur", label: "Distinguer le narrateur de l'auteur et du personnage", notionId: "narration_2de", prerequis: [] },
  { id: "2de_nar_focalisation", label: "Dire ce qu'une focalisation interdit au lecteur de savoir", notionId: "narration_2de", prerequis: ["2de_nar_narrateur"] },
  { id: "2de_nar_changer_focalisation", label: "Dire ce que change le passage d'une focalisation à une autre", notionId: "narration_2de", prerequis: ["2de_nar_focalisation"] },
  { id: "2de_nar_rythme", label: "Dire ce qu'une ellipse, un sommaire, une scène ou une pause fait au temps", notionId: "narration_2de", prerequis: ["2de_nar_narrateur"] },
  { id: "2de_nar_ordre", label: "Dire ce qu'une analepse ou une prolepse prépare", notionId: "narration_2de", prerequis: ["2de_nar_rythme"] },
  { id: "2de_nar_discours_indirect_libre", label: "Dire ce que le discours indirect libre fait entendre de deux voix", notionId: "narration_2de", prerequis: ["2de_nar_focalisation"] },

  /* ===================== theatre_texte_2de =====================
     « la construction de l'action, le système des personnages, la tonalité
     dominante, l'intention de sens » — les quatre entrées que le programme
     donne à la comparaison de deux pièces. */
  { id: "2de_th_genres", label: "Distinguer tragédie, comédie et drame par ce que chacun promet", notionId: "theatre_texte_2de", prerequis: [] },
  { id: "2de_th_action", label: "Situer une scène dans la construction de l'action", notionId: "theatre_texte_2de", prerequis: ["2de_th_genres"] },
  { id: "2de_th_systeme_personnages", label: "Dire ce que le système des personnages met en opposition", notionId: "theatre_texte_2de", prerequis: ["2de_th_action"] },
  { id: "2de_th_double_enonciation", label: "Dire à qui une réplique s'adresse vraiment", notionId: "theatre_texte_2de", prerequis: [] },
  { id: "2de_th_formes_repliques", label: "Dire ce qu'une tirade, une stichomythie, un monologue ou un aparté sert", notionId: "theatre_texte_2de", prerequis: ["2de_th_double_enonciation"] },
  { id: "2de_th_tonalite", label: "Reconnaître la tonalité dominante d'une scène à ses marques", notionId: "theatre_texte_2de", prerequis: ["2de_th_genres"] },

  /* ===================== theatre_representation_2de =====================
     « direction d'acteurs, costumes, accessoires, décors, lumière, son,
     incrustations numériques » ; « comparaison entre deux mises en scène d'une
     même scène » ; « rédaction d'une note d'intention de mise en scène ». */
  { id: "2de_thr_didascalies", label: "Dire ce qu'une didascalie impose au jeu de l'acteur", notionId: "theatre_representation_2de", prerequis: [] },
  { id: "2de_thr_elements", label: "Dire ce qu'un décor, un costume ou une lumière ajoute au sens", notionId: "theatre_representation_2de", prerequis: ["2de_thr_didascalies"] },
  { id: "2de_thr_deux_mises_en_scene", label: "Comparer deux partis pris de mise en scène pour une même scène", notionId: "theatre_representation_2de", prerequis: ["2de_thr_elements"] },
  { id: "2de_thr_note_intention", label: "Reconnaître ce qu'une note d'intention de mise en scène doit annoncer", notionId: "theatre_representation_2de", prerequis: ["2de_thr_deux_mises_en_scene"] },
  { id: "2de_thr_espace", label: "Dire ce que la place du public change au spectacle", notionId: "theatre_representation_2de", prerequis: ["2de_thr_elements"] },
  { id: "2de_thr_texte_et_scene", label: "Dire ce que la scène montre et que le texte ne dit pas", notionId: "theatre_representation_2de", prerequis: ["2de_thr_didascalies"] },
];
