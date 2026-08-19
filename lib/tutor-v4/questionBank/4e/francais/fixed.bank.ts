// ─── Couche « fixed » imprimable · Français 4e ───────────────────────────────
// Le builder cycle 4 (buildCycle4FrancaisBank) ne produit QUE des items
// kind:"template" → testDeSurvie (fixed sans canvas/audio) serait VIDE. Cette
// couche ajoute des QCM FIXES imprimables, ≥5 par notion (9 notions du cycle 4,
// dont analyse_discours), couvrant les micros distincts, difficulté 1→3.
//
// Perspective annuelle 4e : « Jugement, valeurs et vérité » (roman du XIXe siècle,
// réalisme, fantastique, poésie lyrique, Lumières). Items ÉCRITS À LA MAIN,
// on-topic, VÉRIFIÉS (orthographe, accords, une seule bonne réponse), un cran
// AU-DESSUS de la 5e (subordonnées relative/conjonctive, complément du nom,
// attribut, accord du participe avec avoir, plus-que-parfait, conditionnel,
// discours rapporté transformé) et DISTINCTS de CM1/CM2/6e/5e.
//
// Fusionnés dans francais4eQuestionBank (index.ts) → enrichissent AUSSI le coach ;
// importés BRUTS dans le data.ts du guide de survie.

import type { TutorBankItemFixedV4 } from "@/lib/tutor-v4/types";

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
    niveau: "4e",
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
    tags: ["4e", notionId, microId, "francais", "fixed", "guide"],
  };
}

export const francais4eFixedBank: TutorBankItemFixedV4[] = [
  // ── 1. Comprendre, interpréter et apprécier ────────────────────────────────
  qcm(
    "4e_fr_fixed_comp_1",
    "lecture_comprehension",
    "4e_comp_sens_global",
    1,
    "Lis : « Derrière ses habits élégants, l'homme cachait un cœur dur et calculateur. » Que cherche à montrer l'auteur ?",
    ["l'importance du costume dans la bonne société", "le contraste entre l'apparence et la vraie nature", "la lente transformation morale du personnage", "la réussite sociale obtenue par le seul travail"],
    "le contraste entre l'apparence et la vraie nature",
    "En 4e, on interroge le jugement : l'apparence trompeuse cache la vraie nature du personnage."
  ),
  qcm(
    "4e_fr_fixed_comp_2",
    "lecture_comprehension",
    "4e_comp_indices",
    2,
    "Lis : « Il parlait de générosité, mais comptait chaque pièce avant de la donner. » Quel indice révèle son hypocrisie ?",
    ["il prononce lui-même le mot de générosité", "il compte chaque pièce avant de donner", "il possède assez d'argent pour donner", "il finit malgré tout par donner sa pièce"],
    "il compte chaque pièce avant de donner",
    "L'indice contredit les paroles : le geste (compter) dément le discours (la générosité)."
  ),
  qcm(
    "4e_fr_fixed_comp_3",
    "lecture_comprehension",
    "4e_comp_implicite",
    3,
    "Lis : « — Quel beau travail, dit-il en repoussant la copie du bout des doigts. » Que comprend-on de son avis réel ?",
    ["il admire sincèrement le travail rendu", "il pense en fait le contraire (ironie)", "il n'a pas eu le temps de lire la copie", "il hésite encore à donner son avis"],
    "il pense en fait le contraire (ironie)",
    "Le ton et le geste (repousser du bout des doigts) contredisent les mots : c'est de l'ironie."
  ),
  qcm(
    "4e_fr_fixed_comp_4",
    "lecture_comprehension",
    "4e_comp_apprecier",
    2,
    "Dans un débat sur un roman réaliste, quelle appréciation est la plus argumentée ?",
    ["Le personnage m'a semblé cruel, je l'ai détesté dès le début du livre.", "Le personnage m'a semblé cruel, car il trahit son ami pour de l'argent.", "Le personnage m'a semblé cruel, comme souvent dans les romans du XIXe.", "Le personnage m'a semblé cruel car ce roman est un roman réaliste."],
    "Le personnage m'a semblé cruel, car il trahit son ami pour de l'argent.",
    "Un jugement nuancé s'appuie sur un acte précis du personnage."
  ),
  qcm(
    "4e_fr_fixed_comp_5",
    "lecture_comprehension",
    "4e_comp_sens_global",
    2,
    "Lis : « La ville grondait de fumée et de bruit ; les ouvriers y entraient avant l'aube. » Ce passage d'un roman du XIXe siècle évoque surtout...",
    ["la beauté nouvelle des machines et des usines", "la dureté du travail à l'époque industrielle", "le réveil joyeux d'une ville qui s'anime", "les progrès apportés par l'industrie naissante"],
    "la dureté du travail à l'époque industrielle",
    "Le roman réaliste peint la société : ici, la dureté du travail industriel."
  ),

  // ── 2. Lire à voix haute et mettre en voix ─────────────────────────────────
  qcm(
    "4e_fr_fixed_voix_1",
    "lecture_voix_haute",
    "4e_voix_preparer",
    1,
    "Avant de lire à voix haute une tirade de théâtre, il faut surtout...",
    ["compter les vers et vérifier la longueur de chaque réplique", "comprendre l'émotion du personnage et les phrases fortes", "apprendre la tirade entière par cœur avant de la comprendre", "chercher qui jouait ce rôle lors de la création de la pièce"],
    "comprendre l'émotion du personnage et les phrases fortes",
    "Au théâtre, la mise en voix sert l'émotion du personnage : on la prépare."
  ),
  qcm(
    "4e_fr_fixed_voix_2",
    "lecture_voix_haute",
    "4e_voix_expressive",
    2,
    "Pour lire une réplique où un personnage feint la politesse tout en méprisant l'autre, il faut...",
    ["lire d'une voix neutre et très rapide", "faire entendre l'ironie par le ton", "prendre un ton franchement chaleureux", "souligner chaque mot avec insistance"],
    "faire entendre l'ironie par le ton",
    "Le ton peut faire entendre le double sens : ici, l'ironie de la fausse politesse."
  ),
  qcm(
    "4e_fr_fixed_voix_3",
    "lecture_voix_haute",
    "4e_voix_expressive",
    2,
    "Au point d'interrogation, dans une lecture à voix haute, la voix...",
    ["descend comme à un point", "monte à la fin de la phrase", "s'arrête net", "reste toujours plate"],
    "monte à la fin de la phrase",
    "La question s'entend : l'intonation monte à la fin de la phrase."
  ),
  qcm(
    "4e_fr_fixed_voix_4",
    "lecture_voix_haute",
    "4e_voix_reciter",
    2,
    "Pour réciter une tirade avec conviction, il faut...",
    ["garder un rythme régulier du début à la fin", "varier le rythme selon les émotions du personnage", "réciter en regardant toujours le même point", "accélérer régulièrement jusqu'à la dernière phrase"],
    "varier le rythme selon les émotions du personnage",
    "La récitation d'un texte de théâtre suit les émotions du rôle : le rythme varie."
  ),
  qcm(
    "4e_fr_fixed_voix_5",
    "lecture_voix_haute",
    "4e_voix_reciter",
    3,
    "Si tu oublies un vers en récitant un poème devant la classe, le mieux est de...",
    ["revenir au tout début du texte pour te relancer", "faire une courte pause, te reprendre et continuer", "inventer une phrase proche pour combler le trou", "parler très vite pour cacher l'oubli à la classe"],
    "faire une courte pause, te reprendre et continuer",
    "Un oubli se gère par une courte pause maîtrisée : on se reprend et on continue."
  ),

  // ── 3. Culture littéraire (Jugement, valeurs et vérité) ────────────────────
  qcm(
    "4e_fr_fixed_culture_1",
    "culture_litteraire",
    "4e_culture_genres",
    1,
    "Un récit où d'étranges phénomènes font hésiter entre le réel et le surnaturel est...",
    ["un récit de voyage", "un récit fantastique", "une farce", "un article de journal"],
    "un récit fantastique",
    "En 4e, on étudie le fantastique : il repose sur le doute entre réel et surnaturel."
  ),
  qcm(
    "4e_fr_fixed_culture_2",
    "culture_litteraire",
    "4e_culture_genres",
    2,
    "Un long récit en prose qui peint la société du XIXe siècle avec réalisme est...",
    ["une épopée antique", "un roman réaliste", "une fable", "un conte merveilleux"],
    "un roman réaliste",
    "Le roman réaliste dépeint fidèlement la société de son temps."
  ),
  qcm(
    "4e_fr_fixed_culture_3",
    "culture_litteraire",
    "4e_culture_contexte",
    2,
    "Les romans réalistes de Balzac ou Maupassant peignent surtout la société...",
    ["de l'Antiquité", "du XIXe siècle", "du Moyen Âge", "de l'an 2000"],
    "du XIXe siècle",
    "En 4e, le roman réaliste éclaire la société du XIXe siècle."
  ),
  qcm(
    "4e_fr_fixed_culture_4",
    "culture_litteraire",
    "4e_culture_reseau",
    3,
    "Rapprocher un roman sur la misère ouvrière d'un tableau du XIXe montrant des ouvriers, c'est...",
    ["résumer chacune des deux œuvres", "mettre deux œuvres en réseau", "corriger l'orthographe des noms", "compter les personnages cités"],
    "mettre deux œuvres en réseau",
    "On met en réseau un texte et une œuvre d'art de la même époque et du même thème."
  ),
  qcm(
    "4e_fr_fixed_culture_5",
    "culture_litteraire",
    "4e_culture_trace",
    2,
    "Dans ton carnet de lecture de 4e, pour comparer deux personnages de romans, tu notes surtout...",
    ["leur âge, leur métier et leur lieu de naissance", "leurs actes, leurs valeurs et ce qu'ils révèlent", "le nombre de fois où chacun apparaît dans l'œuvre", "la longueur des répliques que l'auteur leur donne"],
    "leurs actes, leurs valeurs et ce qu'ils révèlent",
    "On compare les personnages sur ce qui compte : leurs choix et leurs valeurs."
  ),

  // ── 4. Écrire pour apprendre, inventer et réfléchir ────────────────────────
  qcm(
    "4e_fr_fixed_ecrit_1",
    "ecriture",
    "4e_ecrit_notes",
    1,
    "Écrire pour retenir une leçon, c'est surtout...",
    ["recopier la leçon entière, mot pour mot", "reformuler l'essentiel avec ses propres mots", "surligner les passages importants du cours", "apprendre la leçon par cœur sans comprendre"],
    "reformuler l'essentiel avec ses propres mots",
    "Écrire pour apprendre, c'est reformuler l'essentiel, pas tout recopier."
  ),
  qcm(
    "4e_fr_fixed_ecrit_2",
    "ecriture",
    "4e_ecrit_invention",
    2,
    "Pour écrire un récit fantastique, le procédé le plus adapté est...",
    ["expliquer tout le mystère dès la première ligne du récit", "installer le doute entre explication réelle et surnaturelle", "montrer un monstre parfaitement visible dès le début", "annoncer d'emblée la fin surnaturelle dans le titre"],
    "installer le doute entre explication réelle et surnaturelle",
    "Le fantastique repose sur l'hésitation entre le réel et le surnaturel."
  ),
  qcm(
    "4e_fr_fixed_ecrit_3",
    "ecriture",
    "4e_ecrit_reflexion",
    2,
    "Pour défendre une opinion dans un paragraphe argumenté, l'ordre le plus clair est...",
    ["exemple, puis thèse, puis un second exemple", "thèse, puis argument, puis exemple qui l'illustre", "argument, puis thèse contraire, puis conclusion", "thèse, puis thèse répétée, puis thèse résumée"],
    "thèse, puis argument, puis exemple qui l'illustre",
    "On argumente en enchaînant thèse, argument et exemple."
  ),
  qcm(
    "4e_fr_fixed_ecrit_4",
    "ecriture",
    "4e_ecrit_reviser",
    2,
    "Pour vérifier l'accord d'un participe passé employé avec « avoir », tu regardes...",
    ["si le sujet du verbe est bien au singulier ou au pluriel", "si un complément d'objet direct est placé avant le verbe", "si le complément d'objet direct est placé après le verbe", "si l'auxiliaire employé est « être » ou bien « avoir »"],
    "si un complément d'objet direct est placé avant le verbe",
    "Avec « avoir », le participe s'accorde avec le COD placé avant le verbe."
  ),
  qcm(
    "4e_fr_fixed_ecrit_5",
    "ecriture",
    "4e_ecrit_reflexion",
    3,
    "Pour répondre à une objection dans un texte argumenté, on emploie...",
    ["un connecteur d'addition comme « et » ou « de plus »", "un connecteur d'opposition comme « cependant »", "un connecteur de cause comme « car » ou « parce que »", "un connecteur de conséquence comme « donc »"],
    "un connecteur d'opposition comme « cependant »",
    "On nuance en tenant compte de l'avis contraire : les connecteurs d'opposition (cependant, pourtant)."
  ),

  // ── 5. Prendre la parole, écouter et interagir ─────────────────────────────
  qcm(
    "4e_fr_fixed_oral_1",
    "oral",
    "4e_oral_ecouter",
    1,
    "En écoutant un débat, prendre des notes utiles, c'est noter...",
    ["chaque phrase dite, dans l'ordre du débat", "les arguments principaux de chaque intervenant", "le nom et le rôle de tous les intervenants", "les moments où le ton est monté d'un cran"],
    "les arguments principaux de chaque intervenant",
    "On garde la trace des arguments, pas de tout le discours."
  ),
  qcm(
    "4e_fr_fixed_oral_2",
    "oral",
    "4e_oral_presenter",
    2,
    "Pour présenter clairement un exposé devant la classe, il vaut mieux...",
    ["lire ses notes mot à mot, tête baissée", "parler fort, articuler et suivre un plan", "apprendre son texte par cœur en entier", "parler vite pour tenir dans le temps"],
    "parler fort, articuler et suivre un plan",
    "Une présentation claire est audible, articulée et organisée par un plan."
  ),
  qcm(
    "4e_fr_fixed_oral_3",
    "oral",
    "4e_oral_argumenter",
    2,
    "Quand un camarade défend l'avis contraire, la meilleure réponse est de...",
    ["répéter ton avis avec beaucoup plus de fermeté", "reconnaître son point, puis répondre avec un argument", "lui donner entièrement raison pour éviter le désaccord", "relever une faute de langue dans ce qu'il vient de dire"],
    "reconnaître son point, puis répondre avec un argument",
    "On argumente en tenant compte de l'avis adverse, sans agressivité."
  ),
  qcm(
    "4e_fr_fixed_oral_4",
    "oral",
    "4e_oral_jouer",
    2,
    "Pour interpréter une réplique ironique au théâtre, le comédien doit...",
    ["dire la réplique exactement comme elle est écrite", "faire entendre le contraire de ce que disent les mots", "appuyer très fort sur chacun des mots prononcés", "accompagner la phrase d'un très large sourire"],
    "faire entendre le contraire de ce que disent les mots",
    "L'ironie se joue par un décalage entre les mots et le ton."
  ),
  qcm(
    "4e_fr_fixed_oral_5",
    "oral",
    "4e_oral_argumenter",
    3,
    "Pour rendre ton argument plus solide à l'oral, tu peux...",
    ["répéter la même phrase plusieurs fois de suite", "l'appuyer sur un exemple précis", "t'appuyer sur ce que pense la grande majorité", "le dire d'une voix plus forte que les autres"],
    "l'appuyer sur un exemple précis",
    "Un exemple concret renforce l'argument."
  ),

  // ── 6. Vocabulaire et orthographe lexicale ─────────────────────────────────
  qcm(
    "4e_fr_fixed_voc_1",
    "vocabulaire",
    "4e_voc_contexte",
    2,
    "Dans « Il affichait une mine hautaine et méprisante », « hautaine » veut dire...",
    ["franchement joyeuse et souriante", "qui se croit supérieure aux autres", "timide et vraiment très effacée", "amicale et pleine de chaleur"],
    "qui se croit supérieure aux autres",
    "Le contexte « méprisante » oriente le sens : « hautaine » = qui se croit supérieure."
  ),
  qcm(
    "4e_fr_fixed_voc_2",
    "vocabulaire",
    "4e_voc_relations",
    2,
    "Quels mots appartiennent au champ lexical du jugement ?",
    ["fenêtre, mur, toit", "valeur, mérite, faute", "vitesse, moteur, route", "sable, dune, oasis"],
    "valeur, mérite, faute",
    "En 4e, on travaille le lexique du jugement et des valeurs."
  ),
  qcm(
    "4e_fr_fixed_voc_3",
    "vocabulaire",
    "4e_voc_formation",
    2,
    "Le suffixe « -tion » dans « libération » sert à former...",
    ["un verbe à l'infinitif formé sur un nom", "un nom qui désigne une action ou son résultat", "un adjectif qui exprime une qualité durable", "un adverbe qui indique la manière d'agir"],
    "un nom qui désigne une action ou son résultat",
    "Le suffixe « -tion » transforme un verbe en nom d'action : libérer → libération."
  ),
  qcm(
    "4e_fr_fixed_voc_4",
    "vocabulaire",
    "4e_voc_reemploi",
    2,
    "Quelle phrase emploie correctement l'adjectif « méprisant » ?",
    ["Il lança un grand méprisant à son adversaire.", "Il lança un regard méprisant à son adversaire.", "Il s'adressa très méprisant à son adversaire.", "Le méprisant de cet homme choqua l'assemblée."],
    "Il lança un regard méprisant à son adversaire.",
    "L'adjectif qualifie un nom (un regard) et convient au sens de la phrase."
  ),
  qcm(
    "4e_fr_fixed_voc_5",
    "vocabulaire",
    "4e_voc_contexte",
    3,
    "Dans « Ses propos étaient fallacieux, destinés à tromper », « fallacieux » veut dire...",
    ["sincères", "trompeurs", "amusants", "polis"],
    "trompeurs",
    "Le contexte « destinés à tromper » donne le sens : « fallacieux » = trompeur."
  ),
  qcm(
    "4e_fr_fixed_voc_6",
    "vocabulaire",
    "4e_voc_orthographe",
    1,
    "Quelle est l'orthographe correcte ?",
    ["vraissemblable", "vraisemblable", "vraisemblabe", "vraisamblable"],
    "vraisemblable",
    "On mémorise l'orthographe des mots savants : « vraisemblable »."
  ),

  // ── 7. Phrase, constituants et accords ─────────────────────────────────────
  qcm(
    "4e_fr_fixed_gram_1",
    "grammaire_phrase",
    "4e_gram_constituants",
    1,
    "Dans « Le livre que je lis est passionnant », « que je lis » est...",
    ["une proposition principale unique", "une proposition subordonnée relative", "un complément circonstanciel de temps", "un groupe adjectival détaché"],
    "une proposition subordonnée relative",
    "La relative, introduite par le pronom relatif « que », complète le nom « livre »."
  ),
  qcm(
    "4e_fr_fixed_gram_2",
    "grammaire_phrase",
    "4e_gram_constituants",
    2,
    "Dans « Je sais que tu viendras », la proposition « que tu viendras » est...",
    ["une proposition indépendante", "une subordonnée conjonctive", "un groupe nominal sujet", "une proposition coordonnée"],
    "une subordonnée conjonctive",
    "En 4e, on identifie les subordonnées conjonctives introduites par « que »."
  ),
  qcm(
    "4e_fr_fixed_gram_3",
    "grammaire_phrase",
    "4e_gram_fonctions",
    2,
    "Dans « la maison de mes grands-parents », quelle est la fonction de « de mes grands-parents » ?",
    ["complément circonstanciel de lieu", "complément du nom « maison »", "complément d'objet direct", "attribut du sujet « maison »"],
    "complément du nom « maison »",
    "En 4e, on étudie les expansions du nom, dont le complément du nom."
  ),
  qcm(
    "4e_fr_fixed_gram_4",
    "grammaire_phrase",
    "4e_gram_fonctions",
    2,
    "Dans « Ce voyageur semblait épuisé », quelle est la fonction de « épuisé » ?",
    ["complément d'objet direct", "attribut du sujet", "complément circonstanciel", "sujet"],
    "attribut du sujet",
    "Après « semblait » (verbe d'état), l'adjectif « épuisé » est attribut du sujet."
  ),
  qcm(
    "4e_fr_fixed_gram_5",
    "grammaire_phrase",
    "4e_gram_accords",
    3,
    "Choisis la forme correcte : « Les lettres qu'elle a ___ sont émouvantes. » (écrire)",
    ["écrit", "écrites", "écris", "écrient"],
    "écrites",
    "Avec « avoir », le participe s'accorde avec le COD « qu' » (les lettres, féminin pluriel) placé avant."
  ),
  qcm(
    "4e_fr_fixed_gram_6",
    "grammaire_phrase",
    "4e_gram_oral_ecrit",
    2,
    "Dans un écrit soutenu, « Qu'est-ce que tu veux ? » devient...",
    ["Tu veux quoi ?", "Que veux-tu ?", "C'est quoi que tu veux ?", "Tu veux ça comment ?"],
    "Que veux-tu ?",
    "L'interrogation soutenue inverse le sujet et le verbe : « Que veux-tu ? »"
  ),

  // ── 8. Discours, registres et paroles rapportées ───────────────────────────
  qcm(
    "4e_fr_fixed_disc_1",
    "analyse_discours",
    "4e_discours_registres",
    1,
    "Pour transformer « File-moi ça ! » en registre soutenu, on écrit...",
    ["Donne-moi ça tout de suite.", "Pourriez-vous me donner cela ?", "Passe-moi le truc, s'il te plaît.", "Tu peux me filer ça, steuplé ?"],
    "Pourriez-vous me donner cela ?",
    "On passe du familier au soutenu en changeant le vocabulaire et la tournure."
  ),
  qcm(
    "4e_fr_fixed_disc_2",
    "analyse_discours",
    "4e_discours_registres",
    2,
    "« Je vous saurais gré de bien vouloir répondre » relève du registre...",
    ["familier", "soutenu", "courant", "argotique"],
    "soutenu",
    "Cette formule très polie et recherchée relève du registre soutenu."
  ),
  qcm(
    "4e_fr_fixed_disc_3",
    "analyse_discours",
    "4e_discours_rapportees",
    2,
    "Transforme au discours indirect : Il dit : « Je suis fatigué. »",
    ["Il dit : je suis fatigué.", "Il dit qu'il était fatigué.", "Il dit que je suis fatigué.", "Il dit être « fatigué »."],
    "Il dit qu'il était fatigué.",
    "Au discours indirect, on change le pronom (je → il) et le temps, sans guillemets."
  ),
  qcm(
    "4e_fr_fixed_disc_4",
    "analyse_discours",
    "4e_discours_rapportees",
    2,
    "Quel verbe introducteur convient pour rapporter une question ?",
    ["affirmer", "demander", "conclure", "nier"],
    "demander",
    "On choisit le verbe introducteur selon l'intention : « demander » pour une question."
  ),
  qcm(
    "4e_fr_fixed_disc_5",
    "analyse_discours",
    "4e_discours_argumentatif",
    3,
    "Quel connecteur logique introduit une opposition ?",
    ["par exemple", "cependant", "donc", "d'abord"],
    "cependant",
    "« cependant » oppose deux idées dans une argumentation."
  ),

  // ── 9. Formes verbales, temps et modes ─────────────────────────────────────
  qcm(
    "4e_fr_fixed_conj_1",
    "conjugaison",
    "4e_conj_identifier",
    1,
    "Dans « Il avait déjà compris avant qu'on parle », « avait compris » est au...",
    ["passé composé", "plus-que-parfait", "présent", "futur"],
    "plus-que-parfait",
    "Le plus-que-parfait exprime une action antérieure à une autre action passée."
  ),
  qcm(
    "4e_fr_fixed_conj_2",
    "conjugaison",
    "4e_conj_identifier",
    2,
    "Dans « Je voudrais te parler », « voudrais » est au...",
    ["futur de l'indicatif", "conditionnel présent", "impératif présent", "subjonctif présent"],
    "conditionnel présent",
    "Le conditionnel présent exprime ici une demande polie."
  ),
  qcm(
    "4e_fr_fixed_conj_3",
    "conjugaison",
    "4e_conj_composer",
    2,
    "Choisis la forme correcte : « Quand il arriva, elle ___ déjà. » (plus-que-parfait de partir)",
    ["est déjà partie", "était déjà partie", "partait déjà", "partira déjà"],
    "était déjà partie",
    "Le plus-que-parfait (« était partie ») marque l'action antérieure à « il arriva »."
  ),
  qcm(
    "4e_fr_fixed_conj_4",
    "conjugaison",
    "4e_conj_composer",
    2,
    "Choisis la forme correcte : « Si j'avais le temps, je ___ ce livre. » (conditionnel présent de lire)",
    ["lirai", "lirais", "lisais", "lus"],
    "lirais",
    "Après « si + imparfait », la principale se met au conditionnel présent : « je lirais »."
  ),
  qcm(
    "4e_fr_fixed_conj_5",
    "conjugaison",
    "4e_conj_employer",
    3,
    "Après « Si + imparfait » (« Si j'étais riche... »), la principale se met au...",
    ["impératif", "conditionnel présent", "passé simple", "subjonctif imparfait"],
    "conditionnel présent",
    "« Si + imparfait » appelle le conditionnel présent dans la proposition principale."
  ),
];
