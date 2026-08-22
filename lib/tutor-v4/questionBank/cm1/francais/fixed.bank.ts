// ─── Couche « fixed » imprimable · Français CM1 ──────────────────────────────
// Le builder cycle 3 (buildCycle3FrancaisBank) ne produit QUE des items
// kind:"template" (générés à la volée, QCM/short, sans figure) → testDeSurvie
// (qui ne garde que les "fixed" sans canvas/audio) serait VIDE sur toutes les
// notions. Cette couche ajoute donc des QCM FIXES imprimables, ≥5 par notion,
// couvrant min(5, nb micros) micros distincts, difficulté 1→3.
//
// Items LEVÉS/ADAPTÉS des pools statiques du builder (LECTURE, DOCUMENT, OEUVRE,
// ECRITURE, ORAL, VOC_*, PHRASE_SIMPLE, SUJET_VERBE, GN, ACCORD_GN, HOMOPHONES,
// CONJ_*) puis VÉRIFIÉS À LA MAIN (orthographe, accords, une seule bonne
// réponse). Les items de conjugaison présent/imparfait/futur/infinitif sont
// écrits à la main (le builder les produit en paramétrique, sans pool statique).
//
// Fusionnés dans francaisCm1QuestionBank (index.ts) → enrichissent AUSSI le
// coach ; importés BRUTS dans le data.ts du guide de survie.

import type { TutorBankItemFixedV4 } from "@/lib/tutor-v4/types";

// Fabrique un QCM fixe (comparateur mcq_exact). `choices` est un ordre FIGÉ
// (pas de shuffle à l'exécution) : la bonne réponse est placée à des positions
// variées d'un item à l'autre pour éviter tout « toujours A ».
function qcm(
  id: string,
  notionId: string,
  microId: string,
  difficulty: 1 | 2 | 3,
  text: string,
  choices: string[],
  correct: string,
  explanation: string
): TutorBankItemFixedV4 {
  return {
    kind: "fixed",
    id,
    niveau: "cm1",
    matiere: "francais",
    notionId,
    microId,
    difficulty,
    theme: "neutral",
    text,
    format: "qcm",
    choices,
    expected: [correct],
    comparator: "mcq_exact",
    explanation,
    tags: ["cm1", notionId, microId, "francais", "fixed", "guide"],
  };
}

export const francaisCm1FixedBank: TutorBankItemFixedV4[] = [
  // ── 1. Fluence et compréhension de lecture ─────────────────────────────────
  qcm(
    "cm1_fr_fixed_fluence_1",
    "fluence_lecture",
    "cm1_flue_page",
    1,
    "Lis : « Le soleil se couchait. Mara alluma la lampe et ouvrit son livre. » À quel moment de la journée est-on ?",
    ["le matin très tôt", "le soir", "en plein midi", "au petit-déjeuner"],
    "le soir",
    "Le coucher du soleil et la lampe qu'on allume indiquent le soir."
  ),
  qcm(
    "cm1_fr_fixed_fluence_2",
    "fluence_lecture",
    "cm1_flue_ponctuation",
    2,
    "Lis : « — Range ta chambre ! » dit maman d'une voix ferme. Que fait la maman ?",
    ["elle pose une question", "elle donne un ordre", "elle raconte une histoire", "elle chante"],
    "elle donne un ordre",
    "Le sens et le point d'exclamation montrent que maman donne un ordre."
  ),
  qcm(
    "cm1_fr_fixed_fluence_3",
    "fluence_lecture",
    "cm1_flue_mots_irreguliers",
    1,
    "Lis : « Sur la plage, les enfants ramassaient des coquillages en riant. » Où se déroule la scène ?",
    ["à la plage", "à la montagne", "dans une classe", "dans une cave"],
    "à la plage",
    "Le texte le dit directement : la scène se passe sur la plage."
  ),
  qcm(
    "cm1_fr_fixed_fluence_4",
    "fluence_lecture",
    "cm1_flue_110_mots",
    2,
    "Lis : « Tom rangea son cartable, éteignit la lumière et alla se coucher. » Quelle est la dernière action de Tom ?",
    ["ranger son cartable", "éteindre la lumière", "aller se coucher", "ouvrir la porte"],
    "aller se coucher",
    "On suit l'ordre des actions : la dernière est « alla se coucher »."
  ),
  qcm(
    "cm1_fr_fixed_fluence_5",
    "lecture_voix_haute",
    "cm1_flue_expressive",
    3,
    "Lis : « Le rideau se lève. Deux personnages entrent et parlent chacun leur tour. » De quel genre de texte s'agit-il surtout ?",
    ["un article documentaire", "un extrait de théâtre", "une recette", "une lettre"],
    "un extrait de théâtre",
    "Le rideau qui se lève et les personnages qui se répondent signalent le théâtre."
  ),

  // ── 2. Comprendre textes, documents et images ──────────────────────────────
  qcm(
    "cm1_fr_fixed_comp_1",
    "comprehension_textes",
    "cm1_comp_explicite",
    1,
    "Lis : « Le petit chat gris dormait, roulé en boule au creux du fauteuil. » Où dort le chat ?",
    ["sur le lit", "au creux du fauteuil", "dans le jardin", "sous la table"],
    "au creux du fauteuil",
    "On prend l'information écrite directement dans le texte."
  ),
  qcm(
    "cm1_fr_fixed_comp_2",
    "comprehension_textes",
    "cm1_comp_implicite",
    3,
    "Lis : « Léo n'avait rien mangé depuis le matin. Son ventre gargouillait. » Que ressent Léo ?",
    ["il a sommeil", "il a faim", "il a froid", "il a peur"],
    "il a faim",
    "« rien mangé » et « ventre qui gargouille » sont des indices : Léo a faim (information implicite)."
  ),
  qcm(
    "cm1_fr_fixed_comp_3",
    "comprehension_textes",
    "cm1_comp_genres",
    2,
    "Lis : « Le loup s'approcha lentement de la maison des trois petits cochons. » Ce passage vient sûrement...",
    ["d'un documentaire", "d'un conte", "d'une lettre", "d'une recette"],
    "d'un conte",
    "Le loup et les trois petits cochons sont des personnages de conte."
  ),
  qcm(
    "cm1_fr_fixed_comp_4",
    "comprehension_documents",
    "cm1_doc_source",
    2,
    "Un document indique : Titre : Les volcans. Source : magazine scientifique junior. Date : mars 2025. Quelle information donne la source ?",
    ["le sujet principal", "d'où vient le document", "le nom du lecteur", "la conclusion du texte"],
    "d'où vient le document",
    "La source indique l'origine du document, d'où il a été tiré."
  ),
  qcm(
    "cm1_fr_fixed_comp_5",
    "comprehension_documents",
    "cm1_doc_infos",
    1,
    "Sur une affiche : « Piscine ouverte de 9h à 18h, sauf le lundi. » Peut-on y aller le lundi ?",
    ["oui, toute la journée", "non, elle est fermée le lundi", "oui, seulement le matin", "oui, mais à 18h"],
    "non, elle est fermée le lundi",
    "Le mot « sauf le lundi » dit que la piscine est fermée ce jour-là."
  ),

  // ── 3. Lire une œuvre et se l'approprier ───────────────────────────────────
  qcm(
    "cm1_fr_fixed_oeuvre_1",
    "lecture_oeuvres",
    "cm1_oeuvre_personnages",
    1,
    "Dans un récit, le personnage principal qui vit l'aventure s'appelle le plus souvent...",
    ["le héros", "le lecteur", "l'auteur", "le libraire"],
    "le héros",
    "Le héros est le personnage principal, au centre de l'histoire."
  ),
  qcm(
    "cm1_fr_fixed_oeuvre_2",
    "lecture_oeuvres",
    "cm1_oeuvre_reaction",
    2,
    "Quelle phrase exprime une réaction personnelle de lecteur ?",
    ["Le livre a 64 pages.", "J'ai eu peur quand le loup est apparu.", "C'est un conte.", "Il y a trois chapitres."],
    "J'ai eu peur quand le loup est apparu.",
    "Une réaction de lecteur dit ce qu'on a ressenti en lisant."
  ),
  qcm(
    "cm1_fr_fixed_oeuvre_3",
    "culture_lecteur",
    "cm1_oeuvre_carnet",
    2,
    "Après la lecture d'un conte, quelle trace est la plus utile dans un carnet de lecteur ?",
    ["seulement le nombre de pages", "un avis personnel avec un passage qui le justifie", "une liste de calculs", "la couleur de la couverture"],
    "un avis personnel avec un passage qui le justifie",
    "Le carnet garde la mémoire de ce qu'on a compris et ressenti, avec un passage pour le justifier."
  ),
  qcm(
    "cm1_fr_fixed_oeuvre_4",
    "lecture_oeuvres",
    "cm1_oeuvre_lien",
    2,
    "La leçon qu'une fable veut faire comprendre s'appelle...",
    ["la morale", "le titre", "le décor", "le résumé"],
    "la morale",
    "Une fable se termine souvent par une morale, la leçon à retenir."
  ),
  qcm(
    "cm1_fr_fixed_oeuvre_5",
    "culture_lecteur",
    "cm1_oeuvre_perseverer",
    3,
    "Pour s'engager dans une lecture longue, le mieux est de...",
    ["tout lire en une fois sans pause", "lire un peu chaque jour et garder le fil", "lire la fin d'abord", "sauter des chapitres"],
    "lire un peu chaque jour et garder le fil",
    "Persévérer, un peu chaque jour, aide à profiter d'une œuvre entière."
  ),

  // ── 4. Écrire pour apprendre et produire ───────────────────────────────────
  qcm(
    "cm1_fr_fixed_ecrit_1",
    "ecriture_produire",
    "cm1_ecrit_phrase",
    1,
    "Quelle phrase est correctement ponctuée ?",
    ["As-tu fini tes devoirs ?", "As-tu fini tes devoirs.", "as-tu fini tes devoirs", "As tu fini tes devoirs"],
    "As-tu fini tes devoirs ?",
    "Une question commence par une majuscule et se termine par un point d'interrogation."
  ),
  qcm(
    "cm1_fr_fixed_ecrit_2",
    "ecriture_produire",
    "cm1_ecrit_paragraphe",
    2,
    "Quel groupe de mots organise le mieux les étapes d'un récit ?",
    ["pomme, table, chat", "d'abord, ensuite, enfin", "et, et, et", "ou bien, ou bien"],
    "d'abord, ensuite, enfin",
    "Ces connecteurs marquent clairement l'ordre des étapes du récit."
  ),
  qcm(
    "cm1_fr_fixed_ecrit_3",
    "ecriture_produire",
    "cm1_ecrit_recit",
    2,
    "Pour écrire une courte description, on choisit surtout...",
    ["seulement des chiffres", "des adjectifs et des détails précis", "des mots au hasard", "uniquement des verbes"],
    "des adjectifs et des détails précis",
    "Une description s'appuie sur des adjectifs et des détails qui font voir la scène."
  ),
  qcm(
    "cm1_fr_fixed_ecrit_4",
    "ecriture_reviser",
    "cm1_ecrit_reviser",
    1,
    "Avant de rendre un texte, la dernière étape utile est de...",
    ["le plier en quatre", "se relire pour corriger les erreurs", "compter les mots", "changer de stylo"],
    "se relire pour corriger les erreurs",
    "La relecture est la dernière étape : elle sert à corriger les erreurs."
  ),
  qcm(
    "cm1_fr_fixed_ecrit_5",
    "ecriture_preparer",
    "cm1_ecrit_notes",
    2,
    "Pour ne pas répéter « le chien » dans deux phrases qui se suivent, on peut le remplacer par...",
    ["le chat", "il", "elle", "nous"],
    "il",
    "Le pronom « il » remplace « le chien » et évite la répétition."
  ),

  // ── 5. Écouter, dire et participer aux échanges ────────────────────────────
  qcm(
    "cm1_fr_fixed_oral_1",
    "oral_ecouter",
    "cm1_oral_ecouter",
    1,
    "Pour bien écouter une consigne, il faut...",
    ["regarder par la fenêtre", "être attentif et ne pas parler en même temps", "parler à son voisin", "se boucher les oreilles"],
    "être attentif et ne pas parler en même temps",
    "Écouter, c'est se rendre attentif et disponible pour comprendre."
  ),
  qcm(
    "cm1_fr_fixed_oral_2",
    "oral_ecouter",
    "cm1_oral_reformuler",
    2,
    "Reformuler une consigne entendue, c'est...",
    ["la répéter mot pour mot sans comprendre", "la redire avec ses propres mots", "l'ignorer", "la lire à l'écrit seulement"],
    "la redire avec ses propres mots",
    "Reformuler avec ses propres mots montre qu'on a compris la consigne."
  ),
  qcm(
    "cm1_fr_fixed_oral_3",
    "oral_echanger",
    "cm1_oral_presenter",
    2,
    "Pour bien présenter un livre à la classe, il vaut mieux...",
    ["lire tout, tête baissée, très vite", "parler clairement et regarder son public", "parler très bas", "tourner le dos"],
    "parler clairement et regarder son public",
    "Une bonne présentation est audible et regarde la classe."
  ),
  qcm(
    "cm1_fr_fixed_oral_4",
    "oral_echanger",
    "cm1_oral_argumenter",
    2,
    "Donner un avis justifié, c'est dire...",
    ["seulement oui ou non", "ce qu'on pense et pourquoi", "ce que pense le voisin", "une phrase sans rapport"],
    "ce qu'on pense et pourquoi",
    "Un avis devient solide quand on ajoute une raison, le « pourquoi »."
  ),
  qcm(
    "cm1_fr_fixed_oral_5",
    "oral_echanger",
    "cm1_oral_echanger",
    1,
    "Quand un camarade parle dans un échange, on doit...",
    ["parler en même temps que lui", "attendre son tour pour parler", "se boucher les oreilles", "sortir de la classe"],
    "attendre son tour pour parler",
    "On respecte la parole d'autrui : on attend son tour."
  ),

  // ── 6. Vocabulaire et relations entre les mots ─────────────────────────────
  qcm(
    "cm1_fr_fixed_voc_1",
    "vocabulaire_sens",
    "cm1_voc_contexte",
    1,
    "Dans « Le chemin était boueux après la pluie », que veut dire boueux ?",
    ["plein de boue", "très sec", "tout propre", "gelé"],
    "plein de boue",
    "Le contexte « après la pluie » aide à deviner : boueux = plein de boue."
  ),
  qcm(
    "cm1_fr_fixed_voc_2",
    "vocabulaire_relations",
    "cm1_voc_famille",
    2,
    "Quel mot appartient à la même famille que dent ?",
    ["dentiste", "dedans", "dindon", "donner"],
    "dentiste",
    "« dentiste » garde la racine « dent » : ils sont de la même famille."
  ),
  qcm(
    "cm1_fr_fixed_voc_3",
    "vocabulaire_relations",
    "cm1_voc_syn_ant",
    1,
    "Quel est le contraire de content ?",
    ["joyeux", "triste", "heureux", "ravi"],
    "triste",
    "Un antonyme a le sens opposé : le contraire de content est triste."
  ),
  qcm(
    "cm1_fr_fixed_voc_4",
    "vocabulaire_sens",
    "cm1_voc_polysemie",
    2,
    "Quelle phrase utilise le mot glace au sens du dessert ?",
    ["La glace du lac est solide.", "Elle mange une glace à la vanille.", "Il se regarde dans la glace.", "La route est couverte de glace."],
    "Elle mange une glace à la vanille.",
    "Le mot « glace » a plusieurs sens ; ici, « à la vanille » montre le dessert."
  ),
  qcm(
    "cm1_fr_fixed_voc_5",
    "vocabulaire_emploi",
    "cm1_voc_orthographe",
    2,
    "Quelle est l'orthographe correcte ?",
    ["aujourdhui", "aujourd'hui", "aujour'dui", "aujourd'huit"],
    "aujourd'hui",
    "On mémorise l'orthographe du mot : aujourd'hui, avec une apostrophe et sans « t » final."
  ),

  // ── 7. Phrase simple, accords et orthographe grammaticale ──────────────────
  qcm(
    "cm1_fr_fixed_gram_1",
    "grammaire_phrase",
    "cm1_gram_phrase_simple",
    1,
    "Quel est le type de la phrase « Est-ce que tu viens ? »",
    ["déclarative", "interrogative", "exclamative", "impérative"],
    "interrogative",
    "Le point d'interrogation marque une phrase interrogative (une question)."
  ),
  qcm(
    "cm1_fr_fixed_gram_2",
    "grammaire_phrase",
    "cm1_gram_sujet_verbe",
    1,
    "Dans « Le facteur apporte le courrier », quel est le sujet ?",
    ["Le facteur", "apporte", "le courrier", "apporte le courrier"],
    "Le facteur",
    "On pose la question « qui apporte ? » : c'est le facteur, le sujet."
  ),
  qcm(
    "cm1_fr_fixed_gram_3",
    "grammaire_groupe_nominal",
    "cm1_gram_gn",
    2,
    "Dans le groupe « un grand bateau blanc », quel est le nom principal ?",
    ["grand", "bateau", "blanc", "un"],
    "bateau",
    "Le nom principal (nom noyau) est le mot central du groupe : bateau."
  ),
  qcm(
    "cm1_fr_fixed_gram_4",
    "grammaire_accords",
    "cm1_orth_accord_gn",
    2,
    "Quel groupe nominal est correctement accordé ?",
    ["les fleur rouge", "les fleurs rouges", "la fleurs rouges", "un fleurs rouge"],
    "les fleurs rouges",
    "Au pluriel, le déterminant, le nom et l'adjectif prennent la marque du pluriel : les fleurs rouges."
  ),
  qcm(
    "cm1_fr_fixed_gram_5",
    "grammaire_accords",
    "cm1_orth_homophones",
    3,
    "Homophones « est » / « et » : choisis la phrase correcte.",
    ["Mon frère et grand et fort.", "Mon frère est grand et fort.", "Mon frère es grand et fort.", "Mon frère est grand est fort."],
    "Mon frère est grand et fort.",
    "« est » est le verbe être (on peut dire « était ») ; « et » relie deux mots."
  ),

  // ── 8. Conjugaison et valeur des temps ─────────────────────────────────────
  qcm(
    "cm1_fr_fixed_conj_1",
    "conjugaison_temps_simples",
    "cm1_conj_infinitif_groupe",
    1,
    "Quel est l'infinitif du verbe dans « Nous mangeons une pomme » ?",
    ["mangeons", "manger", "mangé", "mangera"],
    "manger",
    "L'infinitif est la forme non conjuguée : « manger » (verbe du 1er groupe, en -er)."
  ),
  qcm(
    "cm1_fr_fixed_conj_2",
    "conjugaison_temps_simples",
    "cm1_conj_present",
    1,
    "Choisis la forme correcte au présent : « Tu ___ une chanson. »",
    ["chante", "chantes", "chantent", "chanter"],
    "chantes",
    "Au présent, avec « tu », le verbe chanter se termine par -es : tu chantes."
  ),
  qcm(
    "cm1_fr_fixed_conj_3",
    "conjugaison_temps_simples",
    "cm1_conj_imparfait",
    2,
    "Choisis la forme correcte à l'imparfait : « Il ___ dans la cour. »",
    ["joue", "jouait", "jouera", "jouer"],
    "jouait",
    "À l'imparfait, avec « il », le verbe jouer se termine par -ait : il jouait."
  ),
  qcm(
    "cm1_fr_fixed_conj_4",
    "conjugaison_temps_simples",
    "cm1_conj_futur",
    2,
    "Choisis la forme correcte au futur : « Demain, nous ___ en voyage. »",
    ["partons", "partions", "partirons", "sommes partis"],
    "partirons",
    "Au futur, avec « nous », le verbe partir devient « partirons » : Demain, nous partirons."
  ),
  qcm(
    "cm1_fr_fixed_conj_5",
    "conjugaison_passe_compose",
    "cm1_conj_passe_compose",
    2,
    "Quel auxiliaire complète : « Nous ___ mangé une pomme. »",
    ["sommes", "avons", "avez", "ont"],
    "avons",
    "Le passé composé de manger utilise l'auxiliaire avoir : nous avons mangé."
  ),
  qcm(
    "cm1_fr_fixed_conj_6",
    "conjugaison_passe_compose",
    "cm1_conj_valeur_temps",
    3,
    "Dans « Hier, il pleuvait sans arrêt », quel temps est utilisé ?",
    ["le futur", "l'imparfait", "le présent", "le passé composé"],
    "l'imparfait",
    "« pleuvait » décrit une action passée qui dure : c'est l'imparfait (le mot « hier » situe le passé)."
  ),
];
