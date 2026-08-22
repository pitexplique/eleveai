// ─── Couche « fixed » imprimable · Français 6e ───────────────────────────────
// Le builder cycle 3 (buildCycle3FrancaisBank) ne produit QUE des items
// kind:"template" (générés à la volée) → testDeSurvie (qui ne garde que les
// "fixed" sans canvas/audio) serait VIDE sur toutes les notions. Cette couche
// ajoute donc des QCM FIXES imprimables, ≥5 par notion, difficulté 1→3.
//
// ─── REFONTE DU 22/08/2026 ────────────────────────────────────────────────────
// La 6e est sortie de la fabrique du cycle 4 et a été relue objectif par
// objectif sur le « Programme de français pour le cycle 3 » (BO n° 16 du
// 17 avril 2025) : 9 notions sont devenues 29, de 3 à 5 micros chacune.
// Cette couche a été réécrite avec elles, pour deux raisons :
//   • ⛔⛔ UN ITEM MAL RANGÉ N'ATTEINT JAMAIS L'ÉLÈVE. Le `notionId` d'un item
//     doit suivre la notion de sa micro. Les 37 items précédents pointaient
//     vers six notions qui n'existent plus (`lecture_comprehension`,
//     `culture_litteraire`, `ecriture`, `oral`, `vocabulaire`, `conjugaison`)
//     et quatre micros disparues (`6e_comp_apprecier`, `6e_voix_reciter`,
//     `6e_gram_accords`, `6e_gram_oral_ecrit`).
//   • Avec 29 notions, il faut 145 items pour tenir le « ≥5 par notion » — et
//     donc pour qu'un guide de survie de 6e ne sorte pas à moitié vide.
//
// ⚠️ RÈGLES DE FABRICATION, tenues item par item :
//   — LES QUATRE CHOIX S'EXCLUENT. Deux propositions qui pourraient être vraies
//     ensemble rendent la question fausse, et aucun vérificateur ne le voit.
//   — Une seule bonne réponse, à une position qui change d'un item à l'autre.
//   — La bonne réponse n'est pas systématiquement la plus longue.
//   — Vocabulaire d'un élève de 6e, un cran au-dessus du CM2 (entrée au collège).
//
// Fusionnés dans francais6eQuestionBank (index.ts) → enrichissent AUSSI le coach ;
// importés BRUTS dans le data.ts du guide de survie.

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
    niveau: "6e",
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
    tags: ["6e", notionId, microId, "francais", "fixed", "guide"],
  };
}

export const francais6eFixedBank: TutorBankItemFixedV4[] = [
  // ══ 1. Lire avec fluidité ═════════════════════════════════════════════════
  qcm(
    "6e_fr_fixed_flue_1",
    "fluence_lecture",
    "6e_flue_silencieuse",
    1,
    "Lire silencieusement, c'est lire...",
    ["en remuant les lèvres", "à voix basse", "sans prononcer les mots", "en chantant"],
    "sans prononcer les mots",
    "La lecture silencieuse se fait dans la tête : on ne prononce rien, ni tout haut ni tout bas."
  ),
  qcm(
    "6e_fr_fixed_flue_2",
    "fluence_lecture",
    "6e_flue_groupes_syntaxiques",
    2,
    "Où faut-il marquer une pause dans « Le vieux pêcheur du port répara son filet » ?",
    [
      "Le vieux / pêcheur du port répara son filet",
      "Le vieux pêcheur du port / répara son filet",
      "Le vieux pêcheur / du / port répara son filet",
      "Le vieux pêcheur du port répara / son / filet",
    ],
    "Le vieux pêcheur du port / répara son filet",
    "On respire entre les groupes de sens : le groupe sujet d'un côté, le verbe et son complément de l'autre."
  ),
  qcm(
    "6e_fr_fixed_flue_3",
    "fluence_lecture",
    "6e_flue_groupes_syntaxiques",
    2,
    "Dans « Il arriva, épuisé, au sommet », que t'indiquent les deux virgules ?",
    [
      "qu'il faut lire plus vite",
      "qu'il faut détacher « épuisé » par deux courtes pauses",
      "qu'il faut supprimer le mot « épuisé »",
      "qu'il faut monter la voix jusqu'à la fin",
    ],
    "qu'il faut détacher « épuisé » par deux courtes pauses",
    "Les virgules encadrent un groupe détaché : à la lecture, on l'isole par deux pauses brèves."
  ),
  qcm(
    "6e_fr_fixed_flue_4",
    "fluence_lecture",
    "6e_flue_130_mots",
    2,
    "En 6e, l'objectif du programme est de lire environ...",
    ["70 mots par minute", "100 mots par minute", "130 mots par minute", "200 mots par minute"],
    "130 mots par minute",
    "Le cycle 3 monte par paliers : 110 mots au CM1, 120 au CM2, 130 en 6e."
  ),
  qcm(
    "6e_fr_fixed_flue_5",
    "fluence_lecture",
    "6e_flue_defi",
    3,
    "Tu butes sur un mot long et inconnu en lisant à voix haute. Que fais-tu ?",
    [
      "tu sautes la phrase entière",
      "tu le découpes en syllabes et tu continues",
      "tu recommences le texte depuis le début",
      "tu remplaces le mot par un autre",
    ],
    "tu le découpes en syllabes et tu continues",
    "Un mot difficile se décompose en syllabes : on le franchit sans casser le rythme de la phrase."
  ),

  // ══ 2. Lire à voix haute et mettre en voix ════════════════════════════════
  qcm(
    "6e_fr_fixed_voix_1",
    "lecture_voix_haute",
    "6e_voix_preparer",
    1,
    "Avant de lire un texte long à voix haute devant la classe, la meilleure préparation est de...",
    [
      "le lire une première fois en silence pour repérer les mots difficiles",
      "le lire une seule fois, très vite",
      "apprendre seulement le titre",
      "ne rien préparer",
    ],
    "le lire une première fois en silence pour repérer les mots difficiles",
    "Préparer sa lecture orale, c'est d'abord la lire en silence pour anticiper les mots difficiles."
  ),
  qcm(
    "6e_fr_fixed_voix_2",
    "lecture_voix_haute",
    "6e_voix_preparer",
    2,
    "Pendant une lecture à voix haute, pour garder l'attention de ceux qui écoutent, il faut aussi...",
    [
      "garder les yeux baissés tout le temps",
      "lever les yeux vers le public de temps en temps",
      "tourner le dos",
      "lire les yeux fermés",
    ],
    "lever les yeux vers le public de temps en temps",
    "Le programme demande de lire « en regardant l'auditoire » : le regard fait partie de la mise en voix."
  ),
  qcm(
    "6e_fr_fixed_voix_3",
    "lecture_voix_haute",
    "6e_voix_expressive",
    2,
    "Pour lire à voix haute « — Attends-moi ! » cria Léa, comment mettre le ton ?",
    [
      "en chuchotant lentement",
      "sans changer de voix",
      "en montant la voix, plus fort, comme un appel",
      "en riant",
    ],
    "en montant la voix, plus fort, comme un appel",
    "Le point d'exclamation et le verbe « cria » demandent une voix forte, comme un appel."
  ),
  qcm(
    "6e_fr_fixed_voix_4",
    "lecture_voix_haute",
    "6e_voix_emotions",
    3,
    "« Il rangea ses affaires sans un mot et referma doucement la porte. » Quel ton convient ?",
    ["joyeux et rapide", "triste et retenu", "moqueur", "furieux et fort"],
    "triste et retenu",
    "« sans un mot » et « doucement » disent la tristesse contenue : la voix doit la faire entendre."
  ),
  qcm(
    "6e_fr_fixed_voix_5",
    "lecture_voix_haute",
    "6e_voix_dialogue",
    2,
    "Dans un dialogue de récit, comment fait-on entendre qu'un autre personnage parle ?",
    [
      "on change de voix à chaque tiret",
      "on lit tout de la même façon",
      "on saute les tirets",
      "on lit de plus en plus fort",
    ],
    "on change de voix à chaque tiret",
    "Le tiret annonce un changement de locuteur : on change de voix pour qu'on sache qui parle."
  ),
  qcm(
    "6e_fr_fixed_voix_6",
    "lecture_voix_haute",
    "6e_voix_defi",
    3,
    "Si tu oublies un passage en récitant un texte de mémoire, le mieux est de...",
    [
      "t'arrêter et abandonner",
      "rester calme, faire une courte pause et reprendre",
      "parler très vite pour cacher l'oubli",
      "quitter la scène",
    ],
    "rester calme, faire une courte pause et reprendre",
    "En récitation, un oubli se gère par une courte pause : on reste calme et on reprend le fil."
  ),

  // ══ 3. Comprendre et interpréter un texte ═════════════════════════════════
  qcm(
    "6e_fr_fixed_comp_1",
    "comprehension_textes",
    "6e_comp_sens_global",
    1,
    "Lis : « Malgré la pluie et le froid, Sofia continua sa course jusqu'à la ligne d'arrivée, portée par les encouragements. » De quoi parle surtout ce passage ?",
    [
      "de la météo du jour",
      "de la persévérance de Sofia",
      "d'un match de football",
      "d'un pique-nique",
    ],
    "de la persévérance de Sofia",
    "Le sens global : malgré les obstacles, Sofia va au bout — c'est la persévérance."
  ),
  qcm(
    "6e_fr_fixed_comp_2",
    "comprehension_textes",
    "6e_comp_sens_global",
    2,
    "Lis : « Le vieux phare, abandonné depuis des années, veillait encore sur la baie silencieuse. » Quelle impression se dégage ?",
    [
      "une impression de fête",
      "une scène de bataille",
      "une impression de solitude et de calme",
      "un moment très drôle",
    ],
    "une impression de solitude et de calme",
    "« abandonné », « silencieuse » et « veillait encore » créent une atmosphère de solitude et de calme."
  ),
  qcm(
    "6e_fr_fixed_comp_3",
    "comprehension_textes",
    "6e_comp_genre",
    2,
    "Un texte écrit en vers, découpé en strophes, avec des rimes, appartient au genre...",
    ["du roman", "de la poésie", "du théâtre", "de l'article de presse"],
    "de la poésie",
    "Vers, strophes et rimes sont les marques du texte poétique."
  ),
  qcm(
    "6e_fr_fixed_comp_4",
    "comprehension_textes",
    "6e_comp_implicite",
    3,
    "Lis : « Quand le professeur rendit les copies, Malo cacha vite la sienne dans son sac, les joues rouges. » Qu'a probablement eu Malo ?",
    ["la meilleure note", "une mauvaise note", "un cadeau", "une bonne surprise"],
    "une mauvaise note",
    "Cacher sa copie et rougir sont des indices : Malo a sans doute une mauvaise note. C'est l'implicite."
  ),
  qcm(
    "6e_fr_fixed_comp_5",
    "comprehension_textes",
    "6e_comp_justifier",
    2,
    "« Le chien recula, la queue basse, en grognant faiblement. » Le chien a peur : sur quoi t'appuies-tu ?",
    [
      "sur le mot « chien »",
      "sur « recula » et « la queue basse »",
      "sur le point final",
      "sur ce que tu penses des chiens",
    ],
    "sur « recula » et « la queue basse »",
    "Justifier, c'est citer le passage exact qui porte la réponse — pas ce qu'on croit savoir par ailleurs."
  ),
  qcm(
    "6e_fr_fixed_comp_6",
    "comprehension_textes",
    "6e_comp_defi",
    3,
    "« Elle relut la lettre trois fois, puis la déchira lentement. » Que ressent le personnage ?",
    [
      "de l'indifférence",
      "de la joie",
      "une émotion forte qu'elle finit par rejeter",
      "de l'ennui",
    ],
    "une émotion forte qu'elle finit par rejeter",
    "Relire trois fois dit l'importance ; déchirer dit le rejet. Rien n'est écrit : c'est une inférence."
  ),

  // ══ 4. Suivre les reprises et les liens logiques d'un texte ═══════════════
  qcm(
    "6e_fr_fixed_repr_1",
    "comprehension_reprises",
    "6e_comp_indices",
    2,
    "Lis : « Les valises attendaient près de la porte et les billets étaient posés sur la table. » Quel indice montre qu'un départ se prépare ?",
    ["la porte fermée", "les valises prêtes et les billets", "la table en bois", "l'heure du dîner"],
    "les valises prêtes et les billets",
    "On relève les indices précis du texte : valises et billets annoncent un départ."
  ),
  qcm(
    "6e_fr_fixed_repr_2",
    "comprehension_reprises",
    "6e_comp_reprises",
    2,
    "« Léa observait le margouillat. Il ne bougeait plus. » Que reprend le pronom « Il » ?",
    ["Léa", "le margouillat", "personne", "le lecteur"],
    "le margouillat",
    "Le pronom reprend le groupe nominal le plus proche qui a le même genre et le même nombre."
  ),
  qcm(
    "6e_fr_fixed_repr_3",
    "comprehension_reprises",
    "6e_comp_reprises",
    3,
    "« Ulysse affronta le cyclope. Le monstre hurla de douleur. » Le groupe « Le monstre » désigne...",
    ["Ulysse", "le cyclope", "un troisième personnage", "le narrateur"],
    "le cyclope",
    "« Le monstre » est une reprise nominale : un autre mot pour désigner ce dont on vient de parler."
  ),
  qcm(
    "6e_fr_fixed_repr_4",
    "comprehension_reprises",
    "6e_comp_liens_logiques",
    2,
    "« Il pleuvait, DONC le match fut annulé. » Que marque le mot « donc » ?",
    ["une opposition", "une conséquence", "un ajout", "une comparaison"],
    "une conséquence",
    "« donc » introduit ce qui résulte de ce qui précède : c'est un lien de conséquence."
  ),
  qcm(
    "6e_fr_fixed_repr_5",
    "comprehension_reprises",
    "6e_comp_liens_logiques",
    2,
    "« Il avait beaucoup travaillé, POURTANT il rata l'épreuve. » Que marque « pourtant » ?",
    ["une cause", "une opposition", "un but", "une succession"],
    "une opposition",
    "« pourtant » signale que la suite contredit ce à quoi on s'attendait : c'est une opposition."
  ),
  qcm(
    "6e_fr_fixed_repr_6",
    "comprehension_reprises",
    "6e_comp_reprises_defi",
    3,
    "« Le capitaine réunit l'équipage. L'homme parlait peu. Tous l'écoutaient. » Qui « Tous » désigne-t-il ?",
    ["le capitaine", "l'équipage", "les lecteurs", "les passagers du port"],
    "l'équipage",
    "On suit la chaîne : « le capitaine » = « L'homme » = « l' » ; « Tous » ne peut donc reprendre que l'équipage."
  ),

  // ══ 5. Lire des documents et des images ═══════════════════════════════════
  qcm(
    "6e_fr_fixed_doc_1",
    "comprehension_documents",
    "6e_comp_documents",
    1,
    "Un texte daté, signé d'un journaliste et publié dans un quotidien est...",
    ["un poème", "un article de presse", "une notice de montage", "une pièce de théâtre"],
    "un article de presse",
    "La date, la signature du journaliste et le journal donnent la nature et la source du document."
  ),
  qcm(
    "6e_fr_fixed_doc_2",
    "comprehension_documents",
    "6e_comp_documents",
    2,
    "Pourquoi faut-il regarder la SOURCE d'un document avant d'y croire ?",
    [
      "pour savoir qui l'a écrit et si l'on peut s'y fier",
      "pour connaître le nombre de pages",
      "pour choisir la couleur du titre",
      "pour compter les images",
    ],
    "pour savoir qui l'a écrit et si l'on peut s'y fier",
    "La source dit d'où vient l'information : c'est elle qui permet de juger si on peut la croire."
  ),
  qcm(
    "6e_fr_fixed_doc_3",
    "comprehension_documents",
    "6e_comp_documents_comparer",
    3,
    "Deux documents donnent des chiffres différents sur la même chose. Que fais-tu d'abord ?",
    [
      "tu gardes le plus grand chiffre",
      "tu compares leurs dates et leurs sources",
      "tu tires au sort",
      "tu recopies les deux sans rien dire",
    ],
    "tu compares leurs dates et leurs sources",
    "Croiser deux documents, c'est d'abord regarder QUAND et PAR QUI ils ont été produits."
  ),
  qcm(
    "6e_fr_fixed_doc_4",
    "comprehension_documents",
    "6e_comp_image",
    2,
    "Sur une photo de presse, la LÉGENDE sert à...",
    [
      "décorer la page",
      "dire ce que montre l'image et où elle a été prise",
      "remplacer l'article",
      "indiquer le prix du journal",
    ],
    "dire ce que montre l'image et où elle a été prise",
    "Sans légende, une image peut être comprise de travers : la légende l'ancre dans un lieu et un moment."
  ),
  qcm(
    "6e_fr_fixed_doc_5",
    "comprehension_documents",
    "6e_comp_image",
    3,
    "Sur un tableau, un personnage est placé au centre, en pleine lumière. Cela signifie que...",
    [
      "le peintre a manqué de place",
      "c'est le personnage important de la scène",
      "il est le plus jeune",
      "il va bientôt sortir du tableau",
    ],
    "c'est le personnage important de la scène",
    "La place et la lumière sont des éléments essentiels d'une image fixe : elles désignent le sujet."
  ),
  qcm(
    "6e_fr_fixed_doc_6",
    "comprehension_documents",
    "6e_comp_documents_defi",
    3,
    "Un document composite réunit un texte, un tableau de chiffres et une carte. Pour répondre à une question, il faut...",
    [
      "ne lire que le texte",
      "mettre en relation les trois éléments",
      "ne regarder que la carte",
      "additionner tous les chiffres",
    ],
    "mettre en relation les trois éléments",
    "Dans un document composite, la réponse se construit en croisant les éléments, pas dans un seul."
  ),

  // ══ 6. Lire une œuvre et se l'approprier ══════════════════════════════════
  qcm(
    "6e_fr_fixed_oeuv_1",
    "lecture_oeuvres",
    "6e_oeuvre_integrale",
    1,
    "Lire une œuvre « en lecture intégrale », c'est...",
    [
      "lire seulement le premier chapitre",
      "lire l'œuvre entière",
      "lire le résumé",
      "regarder l'adaptation en film",
    ],
    "lire l'œuvre entière",
    "Intégrale = en entier. Le programme de 6e en demande trois, plus trois œuvres en lecture cursive."
  ),
  qcm(
    "6e_fr_fixed_oeuv_2",
    "lecture_oeuvres",
    "6e_oeuvre_relier",
    2,
    "Tu lis un récit d'exil et tu penses au départ d'un proche. Ce rapprochement...",
    [
      "n'a aucun intérêt",
      "t'aide à comprendre ce que vit le personnage",
      "remplace la lecture du livre",
      "prouve que le livre est vrai",
    ],
    "t'aide à comprendre ce que vit le personnage",
    "Le programme invite à relier le texte lu à son expérience vécue : c'est ce qui donne accès aux émotions."
  ),
  qcm(
    "6e_fr_fixed_oeuv_3",
    "lecture_oeuvres",
    "6e_oeuvre_fonder",
    3,
    "Laquelle de ces phrases FONDE une interprétation sur l'œuvre ?",
    [
      "« Ce livre est nul. »",
      "« Le héros a peur : au chapitre 3, il refuse d'entrer dans la grotte. »",
      "« Ma sœur l'a lu aussi. »",
      "« Il y a 210 pages. »",
    ],
    "« Le héros a peur : au chapitre 3, il refuse d'entrer dans la grotte. »",
    "Fonder son interprétation, c'est l'appuyer sur un passage précis qu'on peut montrer."
  ),
  qcm(
    "6e_fr_fixed_oeuv_4",
    "lecture_oeuvres",
    "6e_oeuvre_debattre",
    2,
    "Deux élèves n'ont pas compris la fin du roman de la même façon. C'est...",
    [
      "impossible, il n'y a qu'une réponse",
      "normal : on en débat en s'appuyant sur le texte",
      "une raison d'arrêter la lecture",
      "la preuve que le livre est mal écrit",
    ],
    "normal : on en débat en s'appuyant sur le texte",
    "Le programme demande de « confronter ses jugements » : plusieurs lectures sont possibles, à condition de les justifier."
  ),
  qcm(
    "6e_fr_fixed_oeuv_5",
    "lecture_oeuvres",
    "6e_oeuvre_defi",
    3,
    "On te demande une « évocation spontanée » d'un livre lu. Tu dois...",
    [
      "réciter la quatrième de couverture",
      "raconter de mémoire ce qui t'a marqué",
      "lire le premier chapitre à voix haute",
      "donner le nom de l'éditeur",
    ],
    "raconter de mémoire ce qui t'a marqué",
    "Une évocation spontanée, c'est parler du livre sans notes : ce qui reste, et pourquoi."
  ),

  // ══ 7. Récits des origines, aventure et monstres ══════════════════════════
  qcm(
    "6e_fr_fixed_rec_1",
    "culture_recits",
    "6e_cult_origines",
    1,
    "Un récit qui explique comment le monde ou les hommes sont apparus est...",
    ["un récit des origines", "un roman policier", "une notice", "un fait divers"],
    "un récit des origines",
    "Les récits des origines racontent le commencement : création du monde, naissance des hommes."
  ),
  qcm(
    "6e_fr_fixed_rec_2",
    "culture_recits",
    "6e_cult_origines",
    2,
    "Un récit qui explique pourquoi la tortue a une carapace fendue s'appelle...",
    ["une fable", "un conte étiologique", "une biographie", "un article"],
    "un conte étiologique",
    "Un conte étiologique explique l'origine d'un trait du monde : « pourquoi la tortue a une carapace »."
  ),
  qcm(
    "6e_fr_fixed_rec_3",
    "culture_recits",
    "6e_cult_aventure",
    2,
    "Qu'est-ce qui déclenche presque toujours un récit d'aventure ?",
    [
      "un départ ou une rupture avec le quotidien",
      "la description d'une salle de classe",
      "une liste de personnages",
      "la fin de l'histoire",
    ],
    "un départ ou une rupture avec le quotidien",
    "L'aventure commence quand le héros quitte ce qu'il connaît : le départ ouvre le récit."
  ),
  qcm(
    "6e_fr_fixed_rec_4",
    "culture_recits",
    "6e_cult_monstres",
    2,
    "Dans les récits, à quoi sert le plus souvent le monstre ?",
    [
      "à faire rire",
      "à mettre le héros à l'épreuve",
      "à raconter la fin",
      "à décrire le paysage",
    ],
    "à mettre le héros à l'épreuve",
    "Le monstre est l'obstacle qui révèle le héros : en l'affrontant, il montre qui il est."
  ),
  qcm(
    "6e_fr_fixed_rec_5",
    "culture_recits",
    "6e_cult_recits_defi",
    3,
    "« Après trois jours de tempête, l'équipage aperçut une île inconnue où grondait une créature à trois têtes. » Ce passage relève...",
    [
      "du seul récit des origines",
      "de l'aventure ET de la rencontre avec un monstre",
      "du théâtre comique",
      "du texte documentaire",
    ],
    "de l'aventure ET de la rencontre avec un monstre",
    "Le voyage et l'île inconnue disent l'aventure ; la créature à trois têtes, le monstre. Les deux entrées se croisent."
  ),

  // ══ 8. Poésie et théâtre ══════════════════════════════════════════════════
  qcm(
    "6e_fr_fixed_art_1",
    "culture_poesie_theatre",
    "6e_cult_poesie",
    1,
    "Dans un poème, une STROPHE est...",
    ["un groupe de vers", "un mot rare", "la dernière ligne", "le nom du poète"],
    "un groupe de vers",
    "Le vers est une ligne ; la strophe est un groupe de vers, séparé des autres par un blanc."
  ),
  qcm(
    "6e_fr_fixed_art_2",
    "culture_poesie_theatre",
    "6e_cult_poesie",
    2,
    "« La mer est un miroir. » Cette image s'appelle...",
    ["une comparaison", "une métaphore", "une rime", "un dialogue"],
    "une métaphore",
    "La métaphore rapproche deux choses SANS mot de comparaison. Avec « comme », ce serait une comparaison."
  ),
  qcm(
    "6e_fr_fixed_art_3",
    "culture_poesie_theatre",
    "6e_cult_theatre",
    1,
    "Au théâtre, une DIDASCALIE est...",
    [
      "une réplique très longue",
      "une indication de jeu ou de mise en scène",
      "le nom d'un personnage",
      "la fin de la pièce",
    ],
    "une indication de jeu ou de mise en scène",
    "Les didascalies ne se disent pas : elles indiquent aux acteurs ce qu'ils font, où et comment."
  ),
  qcm(
    "6e_fr_fixed_art_4",
    "culture_poesie_theatre",
    "6e_cult_theatre",
    2,
    "Une ruse de théâtre repose souvent sur le fait que...",
    [
      "le public en sait plus que le personnage trompé",
      "tous les personnages savent tout",
      "personne ne parle",
      "la pièce se déroule dans le noir",
    ],
    "le public en sait plus que le personnage trompé",
    "C'est le ressort comique de la ruse : le spectateur voit le piège que le personnage ne voit pas."
  ),
  qcm(
    "6e_fr_fixed_art_5",
    "culture_poesie_theatre",
    "6e_cult_arts_defi",
    2,
    "Un texte est découpé en répliques précédées d'un nom de personnage. C'est...",
    ["un poème", "un texte de théâtre", "un roman", "un article"],
    "un texte de théâtre",
    "Nom du personnage + réplique : c'est la mise en page du théâtre. Le poème, lui, se découpe en vers."
  ),

  // ══ 9. Genres, contexte et carnet de lecture ══════════════════════════════
  qcm(
    "6e_fr_fixed_culture_1",
    "culture_reperes",
    "6e_culture_genres",
    1,
    "Un texte qui raconte les exploits des dieux et des héros de l'Antiquité, comme Ulysse, est...",
    ["un mythe", "un documentaire", "une recette", "une bande dessinée"],
    "un mythe",
    "Les récits des dieux et héros antiques (Ulysse, Hercule) sont des mythes."
  ),
  qcm(
    "6e_fr_fixed_culture_2",
    "culture_reperes",
    "6e_culture_genres",
    2,
    "Une courte histoire avec des animaux qui parlent et une morale, écrite par La Fontaine, est...",
    ["un roman policier", "une fable", "une pièce de théâtre", "un article de journal"],
    "une fable",
    "Une histoire brève, souvent avec des animaux et une morale, est une fable."
  ),
  qcm(
    "6e_fr_fixed_culture_3",
    "culture_reperes",
    "6e_culture_contexte",
    2,
    "L'Odyssée, qui raconte le voyage d'Ulysse, a été composée...",
    ["l'an dernier", "dans l'Antiquité, en Grèce ancienne", "au Moyen Âge en France", "au XXe siècle"],
    "dans l'Antiquité, en Grèce ancienne",
    "Situer l'œuvre : l'Odyssée vient de la Grèce antique."
  ),
  qcm(
    "6e_fr_fixed_culture_4",
    "culture_reperes",
    "6e_culture_reseau",
    3,
    "Un film où un héros affronte un monstre te fait penser au combat d'Ulysse contre le cyclope. Faire ce rapprochement, c'est...",
    ["résumer le film", "mettre deux œuvres en réseau", "corriger l'orthographe", "compter les personnages"],
    "mettre deux œuvres en réseau",
    "Rapprocher deux œuvres qui se ressemblent, c'est les mettre en réseau."
  ),
  qcm(
    "6e_fr_fixed_culture_5",
    "culture_reperes",
    "6e_culture_trace",
    1,
    "Pour garder une trace de tes lectures de l'année, tu peux tenir...",
    [
      "un carnet de lecture avec titres, auteurs et avis",
      "un cahier de mathématiques",
      "une liste de courses",
      "un carnet de correspondance",
    ],
    "un carnet de lecture avec titres, auteurs et avis",
    "Le carnet de lecture garde la trace de chaque œuvre lue : titre, auteur et avis."
  ),
  qcm(
    "6e_fr_fixed_culture_6",
    "culture_reperes",
    "6e_culture_reperes_defi",
    3,
    "Trois extraits : l'un en vers, l'un avec des répliques, l'un qui raconte au passé simple. Dans l'ordre, ce sont...",
    [
      "théâtre, poésie, récit",
      "poésie, théâtre, récit",
      "récit, poésie, théâtre",
      "poésie, récit, théâtre",
    ],
    "poésie, théâtre, récit",
    "Les vers signent la poésie, les répliques le théâtre, le passé simple de narration le récit."
  ),

  // ══ 10. Écrire à la main de manière fluide et efficace ════════════════════
  qcm(
    "6e_fr_fixed_main_1",
    "ecriture_main",
    "6e_ecrit_copie",
    1,
    "Copier un texte sans erreur suppose de...",
    [
      "regarder le modèle mot à mot, lettre à lettre",
      "copier de mémoire, sans regarder",
      "copier le plus vite possible",
      "changer les mots difficiles",
    ],
    "regarder le modèle mot à mot, lettre à lettre",
    "Le programme demande une copie « lisible, régulière, soignée et sans erreur » : on revient au modèle."
  ),
  qcm(
    "6e_fr_fixed_main_2",
    "ecriture_main",
    "6e_ecrit_copie",
    2,
    "En copiant, quelle stratégie fait gagner du temps ET évite les fautes ?",
    [
      "copier lettre par lettre",
      "mémoriser un groupe de mots, puis l'écrire",
      "copier la dernière ligne en premier",
      "copier sans la ponctuation",
    ],
    "mémoriser un groupe de mots, puis l'écrire",
    "Copier par groupes de sens, c'est moins d'allers-retours et moins d'oublis qu'une copie lettre à lettre."
  ),
  qcm(
    "6e_fr_fixed_main_3",
    "ecriture_main",
    "6e_ecrit_mise_en_forme",
    1,
    "Dans un devoir rendu, la mise en forme comprend...",
    [
      "les marges, les alinéas et les paragraphes",
      "la couleur de la trousse",
      "le nombre de pages exact",
      "le poids du cahier",
    ],
    "les marges, les alinéas et les paragraphes",
    "Un texte se lit mieux quand il est mis en forme : marges, alinéas, paragraphes séparés."
  ),
  qcm(
    "6e_fr_fixed_main_4",
    "ecriture_main",
    "6e_ecrit_mise_en_forme",
    2,
    "Pourquoi commence-t-on un nouveau paragraphe ?",
    [
      "quand la page est pleine",
      "quand on passe à une nouvelle idée",
      "tous les cinq mots",
      "à chaque virgule",
    ],
    "quand on passe à une nouvelle idée",
    "Le paragraphe est une unité de sens : on en change quand on change d'idée, pas quand la page se remplit."
  ),
  qcm(
    "6e_fr_fixed_main_5",
    "ecriture_main",
    "6e_ecrit_copie_defi",
    3,
    "Après avoir recopié un texte, quel est le dernier geste ?",
    [
      "ranger sa copie sans la relire",
      "relire en comparant au modèle",
      "compter les lignes",
      "souligner le titre",
    ],
    "relire en comparant au modèle",
    "La relecture comparée au modèle est ce qui attrape la lettre oubliée ou le mot sauté."
  ),

  // ══ 11. Écrire pour réfléchir, apprendre et mémoriser ═════════════════════
  qcm(
    "6e_fr_fixed_appr_1",
    "ecriture_apprendre",
    "6e_ecrit_notes",
    1,
    "Écrire pour mémoriser une leçon, c'est surtout...",
    [
      "noter les idées importantes avec ses propres mots",
      "recopier tout le manuel mot à mot",
      "dessiner la couverture",
      "n'écrire que la date",
    ],
    "noter les idées importantes avec ses propres mots",
    "Écrire pour apprendre, c'est reformuler l'essentiel avec ses mots, pas tout recopier."
  ),
  qcm(
    "6e_fr_fixed_appr_2",
    "ecriture_apprendre",
    "6e_ecrit_resumer",
    2,
    "Un bon résumé de récit contient...",
    [
      "tous les dialogues",
      "qui, quoi, où, et comment cela finit",
      "l'avis du lecteur",
      "la biographie de l'auteur",
    ],
    "qui, quoi, où, et comment cela finit",
    "Résumer, c'est garder la trame : les personnages, l'action, le lieu et le dénouement."
  ),
  qcm(
    "6e_fr_fixed_appr_3",
    "ecriture_apprendre",
    "6e_ecrit_resumer",
    3,
    "Dans un résumé, on écrit « Le héros part, affronte le dragon, revient » plutôt que...",
    [
      "« Il part. Il marche. Il voit un arbre. Il boit. Il affronte le dragon. »",
      "« Le héros part, affronte le dragon et revient. »",
      "« Un héros et un dragon. »",
      "« Le dragon est vaincu. »",
    ],
    "« Il part. Il marche. Il voit un arbre. Il boit. Il affronte le dragon. »",
    "Résumer, c'est trier : les détails (marcher, boire) tombent, les étapes qui font avancer l'histoire restent."
  ),
  qcm(
    "6e_fr_fixed_appr_4",
    "ecriture_apprendre",
    "6e_ecrit_hierarchiser",
    2,
    "Hiérarchiser ses idées avant d'écrire, c'est...",
    [
      "les écrire dans l'ordre où elles viennent",
      "les classer de la plus importante à la moins importante",
      "les compter",
      "les écrire en majuscules",
    ],
    "les classer de la plus importante à la moins importante",
    "Hiérarchiser, c'est décider ce qui vient d'abord parce que c'est le plus important."
  ),
  qcm(
    "6e_fr_fixed_appr_5",
    "ecriture_apprendre",
    "6e_ecrit_justifier",
    2,
    "Pour répondre à « As-tu aimé ce livre ? » dans un paragraphe de réflexion, on écrit...",
    [
      "seulement « oui »",
      "son avis, suivi d'une raison et d'un exemple du texte",
      "le résumé complet du livre",
      "le prix du livre",
    ],
    "son avis, suivi d'une raison et d'un exemple du texte",
    "Un paragraphe de réflexion donne un avis, une raison et un exemple précis."
  ),
  qcm(
    "6e_fr_fixed_appr_6",
    "ecriture_apprendre",
    "6e_ecrit_apprendre_defi",
    3,
    "Tu dois résumer une page en trois phrases. Par quoi commences-tu ?",
    [
      "par la première phrase de la page",
      "par repérer l'idée principale de chaque paragraphe",
      "par la phrase la plus longue",
      "par la conclusion de l'auteur",
    ],
    "par repérer l'idée principale de chaque paragraphe",
    "Un résumé se construit sur les idées principales, pas sur l'ordre d'apparition des phrases."
  ),

  // ══ 12. Produire des écrits variés ════════════════════════════════════════
  qcm(
    "6e_fr_fixed_prod_1",
    "ecriture_produire",
    "6e_ecrit_invention",
    2,
    "Pour écrire un récit d'aventure cohérent, il faut au moins...",
    [
      "un héros, un problème à résoudre et une fin",
      "seulement une liste de mots",
      "trois descriptions de paysage",
      "aucun personnage",
    ],
    "un héros, un problème à résoudre et une fin",
    "Un récit cohérent a un personnage, un problème (les péripéties) et un dénouement."
  ),
  qcm(
    "6e_fr_fixed_prod_2",
    "ecriture_produire",
    "6e_ecrit_reflexion",
    2,
    "Donner son avis par écrit et le justifier, c'est écrire...",
    [
      "« C'est bien. »",
      "« Je trouve la fin réussie, parce qu'elle laisse le lecteur libre d'imaginer la suite. »",
      "« Tout le monde aime ce livre. »",
      "« Je n'ai pas d'avis. »",
    ],
    "« Je trouve la fin réussie, parce qu'elle laisse le lecteur libre d'imaginer la suite. »",
    "Un avis justifié dit CE QU'ON PENSE et POURQUOI. Sans le « parce que », ce n'est qu'une opinion."
  ),
  qcm(
    "6e_fr_fixed_prod_3",
    "ecriture_produire",
    "6e_ecrit_coherence",
    3,
    "Dans un récit, pour montrer qu'une action se passe APRÈS une autre, on écrit...",
    ["« En même temps »", "« Plus tard »", "« Au même moment »", "« Pendant ce temps »"],
    "« Plus tard »",
    "« plus tard », « ensuite » marquent la succession ; les trois autres disent la simultanéité."
  ),
  qcm(
    "6e_fr_fixed_prod_4",
    "ecriture_produire",
    "6e_ecrit_coherence",
    3,
    "Ton récit est au passé simple. Que se passe-t-il si une phrase passe au présent sans raison ?",
    [
      "rien, c'est équivalent",
      "la cohérence du récit est rompue",
      "le texte devient un poème",
      "il faut supprimer le paragraphe",
    ],
    "la cohérence du récit est rompue",
    "La cohérence textuelle tient aussi au système des temps : on ne change pas de temps sans raison."
  ),
  qcm(
    "6e_fr_fixed_prod_5",
    "ecriture_produire",
    "6e_ecrit_codes",
    2,
    "Dans un dialogue écrit, la prise de parole d'un nouveau personnage se marque par...",
    ["un tiret et un retour à la ligne", "une parenthèse", "un astérisque", "des points de suspension"],
    "un tiret et un retour à la ligne",
    "C'est un code de l'écrit : chaque nouvelle réplique commence à la ligne, précédée d'un tiret."
  ),
  qcm(
    "6e_fr_fixed_prod_6",
    "ecriture_produire",
    "6e_ecrit_produire_defi",
    3,
    "Tu écris la suite d'un récit. Que dois-tu absolument conserver ?",
    [
      "le nombre de lignes",
      "les personnages, le temps du récit et le lieu",
      "le titre du chapitre",
      "la première phrase",
    ],
    "les personnages, le temps du récit et le lieu",
    "Écrire une suite cohérente, c'est ne pas changer en route ce que le texte a déjà installé."
  ),

  // ══ 13. Revenir sur son texte et le réviser ═══════════════════════════════
  qcm(
    "6e_fr_fixed_rev_1",
    "ecriture_reviser",
    "6e_ecrit_brouillon",
    1,
    "À quoi sert un brouillon ?",
    [
      "à écrire le texte définitif",
      "à essayer, raturer et réorganiser avant la version finale",
      "à faire joli",
      "à compter les mots",
    ],
    "à essayer, raturer et réorganiser avant la version finale",
    "Le brouillon est un écrit À RETRAVAILLER : les ratures y sont un signe de travail, pas de désordre."
  ),
  qcm(
    "6e_fr_fixed_rev_2",
    "ecriture_reviser",
    "6e_ecrit_reviser",
    2,
    "Réviser son texte, c'est...",
    [
      "le recopier au propre sans le lire",
      "le relire pour corriger les fautes et améliorer les phrases",
      "compter les lignes",
      "changer de cahier",
    ],
    "le relire pour corriger les fautes et améliorer les phrases",
    "Réviser, c'est relire pour corriger ET enrichir : on améliore le texte, on ne le recopie pas seulement."
  ),
  qcm(
    "6e_fr_fixed_rev_3",
    "ecriture_reviser",
    "6e_ecrit_reviser",
    2,
    "Un camarade te dit : « On ne comprend pas qui parle. » Que fais-tu ?",
    [
      "tu ajoutes des tirets et tu nommes les personnages",
      "tu effaces le dialogue",
      "tu écris plus gros",
      "tu ajoutes un titre",
    ],
    "tu ajoutes des tirets et tu nommes les personnages",
    "Améliorer son texte à partir des remarques des pairs, c'est agir précisément sur ce qui a gêné."
  ),
  qcm(
    "6e_fr_fixed_rev_4",
    "ecriture_reviser",
    "6e_ecrit_normes",
    2,
    "Quand tu relis pour l'orthographe, quel accord vérifies-tu EN PREMIER ?",
    [
      "l'accord du verbe avec son sujet",
      "la longueur des phrases",
      "le nombre de paragraphes",
      "la place des guillemets",
    ],
    "l'accord du verbe avec son sujet",
    "Le programme cite l'accord sujet-verbe et celui du groupe nominal comme les deux points de vigilance."
  ),
  qcm(
    "6e_fr_fixed_rev_5",
    "ecriture_reviser",
    "6e_ecrit_reviser_defi",
    3,
    "« Les élève de la classe a rendu leur devoirs. » Combien de fautes d'accord ?",
    ["une", "deux", "trois", "aucune"],
    "trois",
    "« les élèves » (pluriel), « ont rendu » (verbe au pluriel), « leurs devoirs » (déterminant au pluriel)."
  ),

  // ══ 14. Écouter pour comprendre ═══════════════════════════════════════════
  qcm(
    "6e_fr_fixed_ecou_1",
    "oral_ecouter",
    "6e_oral_ecouter",
    1,
    "Pour bien comprendre un exposé oral, il faut...",
    [
      "écouter attentivement et repérer les idées importantes",
      "parler avec son voisin",
      "penser à autre chose",
      "recopier chaque mot entendu",
    ],
    "écouter attentivement et repérer les idées importantes",
    "Écouter pour comprendre, c'est se concentrer et retenir les idées principales, pas tout noter."
  ),
  qcm(
    "6e_fr_fixed_ecou_2",
    "oral_ecouter",
    "6e_oral_ecouter",
    2,
    "On te dit avant l'écoute : « Cherchez les causes de l'éruption. » Cette consigne sert à...",
    [
      "orienter ton écoute vers un but précis",
      "raccourcir l'enregistrement",
      "te dispenser d'écouter la fin",
      "remplacer la prise de notes",
    ],
    "orienter ton écoute vers un but précis",
    "Une écoute active est « orientée en fonction du but » : savoir ce qu'on cherche change ce qu'on entend."
  ),
  qcm(
    "6e_fr_fixed_ecou_3",
    "oral_ecouter",
    "6e_oral_reformuler",
    2,
    "Reformuler ce qu'on vient d'entendre, c'est...",
    [
      "le répéter mot pour mot",
      "le redire avec ses propres mots",
      "en donner son avis",
      "poser une question",
    ],
    "le redire avec ses propres mots",
    "Reformuler prouve qu'on a compris : répéter mot pour mot ne le prouve pas."
  ),
  qcm(
    "6e_fr_fixed_ecou_4",
    "oral_ecouter",
    "6e_oral_genres_discours",
    3,
    "Tu entends : « Et maintenant, la météo de votre samedi. » Ce discours est...",
    ["un conte", "une chronique d'information", "un poème", "un débat"],
    "une chronique d'information",
    "Identifier le genre du discours, c'est reconnaître à quoi il sert : ici, informer sur un fait à venir."
  ),
  qcm(
    "6e_fr_fixed_ecou_5",
    "oral_ecouter",
    "6e_oral_ressenti",
    2,
    "Exprimer son ressenti après l'écoute d'un texte, c'est dire...",
    [
      "le nom de l'auteur",
      "ce que le texte t'a fait éprouver",
      "le nombre de personnages",
      "la durée de l'enregistrement",
    ],
    "ce que le texte t'a fait éprouver",
    "Le ressenti est personnel : ce que le texte a provoqué chez toi, et non ce qu'il contient."
  ),
  qcm(
    "6e_fr_fixed_ecou_6",
    "oral_ecouter",
    "6e_oral_ecouter_defi",
    3,
    "Tu n'entends un propos qu'une seule fois. Que fais-tu pendant l'écoute ?",
    [
      "tu écris chaque phrase entière",
      "tu notes des mots clés",
      "tu attends la fin pour tout écrire",
      "tu fermes les yeux",
    ],
    "tu notes des mots clés",
    "Écrire des phrases entières fait perdre la suite : les mots clés suffisent à reconstruire le propos."
  ),

  // ══ 15. Dire pour être compris ════════════════════════════════════════════
  qcm(
    "6e_fr_fixed_dire_1",
    "oral_dire",
    "6e_oral_presenter",
    2,
    "Pour présenter clairement un exposé devant la classe, il vaut mieux...",
    [
      "lire ses notes à toute vitesse, tête baissée",
      "parler fort, articuler et suivre un plan",
      "chuchoter",
      "improviser sans aucune idée",
    ],
    "parler fort, articuler et suivre un plan",
    "Une présentation claire est audible, articulée et organisée par un plan."
  ),
  qcm(
    "6e_fr_fixed_dire_2",
    "oral_dire",
    "6e_oral_presenter",
    2,
    "Dans un exposé, à quoi sert l'introduction ?",
    [
      "à annoncer le sujet et le plan",
      "à donner la conclusion",
      "à remercier la classe",
      "à lire la bibliographie",
    ],
    "à annoncer le sujet et le plan",
    "L'introduction dit de quoi on va parler et dans quel ordre : l'auditoire sait où il va."
  ),
  qcm(
    "6e_fr_fixed_dire_3",
    "oral_dire",
    "6e_oral_jouer",
    2,
    "Pour bien JOUER une scène de théâtre, il faut...",
    [
      "lire d'une voix plate, sans bouger",
      "mettre le ton et les gestes selon le personnage",
      "parler très bas",
      "tourner le dos au public",
    ],
    "mettre le ton et les gestes selon le personnage",
    "Jouer un texte, c'est l'interpréter : le ton et les gestes correspondent au personnage."
  ),
  qcm(
    "6e_fr_fixed_dire_4",
    "oral_dire",
    "6e_oral_reflexif",
    3,
    "« Je crois que… non, attends, en fait c'est plutôt… » Cette hésitation à voix haute montre que...",
    [
      "l'élève ne sait rien",
      "l'élève se sert de la parole pour réfléchir",
      "l'élève doit se taire",
      "l'élève récite",
    ],
    "l'élève se sert de la parole pour réfléchir",
    "Le programme parle de « l'oral comme outil réflexif » : on pense en parlant, on ajuste au fur et à mesure."
  ),
  qcm(
    "6e_fr_fixed_dire_5",
    "oral_dire",
    "6e_oral_dire_defi",
    3,
    "Tu dois expliquer une démarche sans tes notes. Qu'est-ce qui t'aide le plus ?",
    [
      "avoir appris ton texte par cœur",
      "avoir en tête les étapes, dans l'ordre",
      "parler très vite",
      "commencer par la conclusion",
    ],
    "avoir en tête les étapes, dans l'ordre",
    "Expliquer une démarche, c'est en dérouler les étapes : c'est l'ordre qu'on retient, pas les mots."
  ),

  // ══ 16. Participer à des échanges verbaux ════════════════════════════════
  qcm(
    "6e_fr_fixed_ech_1",
    "oral_echanger",
    "6e_oral_codes",
    1,
    "Respecter les codes de l'échange en classe, c'est d'abord...",
    [
      "attendre son tour de parole",
      "parler plus fort que les autres",
      "couper celui qui se trompe",
      "lever la main sans écouter",
    ],
    "attendre son tour de parole",
    "Un échange n'existe que si chacun peut parler : le tour de parole en est la première règle."
  ),
  qcm(
    "6e_fr_fixed_ech_2",
    "oral_echanger",
    "6e_oral_argumenter",
    2,
    "Pour justifier ton point de vue à l'oral, tu dois...",
    [
      "donner ton avis ET une raison qui l'explique",
      "répéter « parce que » sans expliquer",
      "parler plus fort que les autres",
      "changer d'avis à chaque phrase",
    ],
    "donner ton avis ET une raison qui l'explique",
    "Justifier, c'est appuyer son avis sur une raison claire."
  ),
  qcm(
    "6e_fr_fixed_ech_3",
    "oral_echanger",
    "6e_oral_interagir",
    3,
    "Dans un débat, quelqu'un vient de dire le contraire de toi. Que fais-tu ?",
    [
      "tu répètes ton argument à l'identique",
      "tu reprends son idée et tu montres où tu n'es pas d'accord",
      "tu changes de sujet",
      "tu attends la fin sans rien dire",
    ],
    "tu reprends son idée et tu montres où tu n'es pas d'accord",
    "« Intervenir en tenant compte de ce qui a précédemment été dit » : on répond à l'autre, on ne se répète pas."
  ),
  qcm(
    "6e_fr_fixed_ech_4",
    "oral_echanger",
    "6e_oral_interagir",
    2,
    "Quelle formule montre que tu tiens compte de ce qui vient d'être dit ?",
    [
      "« Moi je pense que… »",
      "« Comme le disait Nina, mais j'ajouterais que… »",
      "« Bref, passons. »",
      "« J'ai fini. »",
    ],
    "« Comme le disait Nina, mais j'ajouterais que… »",
    "Reprendre le propos d'un camarade avant d'ajouter le sien, c'est ce qui fait d'un échange une discussion."
  ),
  qcm(
    "6e_fr_fixed_ech_5",
    "oral_echanger",
    "6e_oral_regard_critique",
    3,
    "Après un exposé enregistré, tu te réécoutes. Porter un regard critique, c'est...",
    [
      "dire que c'était nul",
      "repérer un point précis à améliorer",
      "réécouter sans rien noter",
      "comparer avec un camarade",
    ],
    "repérer un point précis à améliorer",
    "Un regard critique est utile quand il est précis : « je parlais trop vite au début », pas « c'était nul »."
  ),
  qcm(
    "6e_fr_fixed_ech_6",
    "oral_echanger",
    "6e_oral_echanger_defi",
    3,
    "Dans un débat en classe, quand quelqu'un n'est pas d'accord avec toi, tu dois...",
    [
      "hausser le ton pour avoir raison",
      "l'écouter puis répondre calmement avec un argument",
      "te moquer de lui",
      "refuser de parler",
    ],
    "l'écouter puis répondre calmement avec un argument",
    "Interagir dans un débat, c'est écouter l'autre et répondre avec un argument, sans agressivité."
  ),

  // ══ 17. Comprendre un mot nouveau et enrichir son lexique ════════════════
  qcm(
    "6e_fr_fixed_enri_1",
    "vocabulaire_enrichir",
    "6e_voc_contexte",
    2,
    "Dans « Le sentier serpentait entre les arbres avant d'atteindre le sommet », que veut dire serpentait ?",
    ["montait tout droit", "faisait des courbes", "descendait très vite", "s'arrêtait net"],
    "faisait des courbes",
    "Le contexte (un sentier entre les arbres) montre que serpenter, c'est faire des courbes."
  ),
  qcm(
    "6e_fr_fixed_enri_2",
    "vocabulaire_enrichir",
    "6e_voc_contexte",
    2,
    "« Le navigateur consulta le sextant pour faire le point. » Un sextant est sans doute...",
    ["un plat de marin", "un instrument de navigation", "un vêtement", "un cordage"],
    "un instrument de navigation",
    "« consulta » et « faire le point » indiquent un instrument qui sert à se repérer."
  ),
  qcm(
    "6e_fr_fixed_enri_3",
    "vocabulaire_enrichir",
    "6e_voc_strategies",
    3,
    "Tu rencontres « inaltérable ». Quelle stratégie essaies-tu EN PREMIER ?",
    [
      "chercher le mot dans le dictionnaire",
      "décomposer le mot : in- / altér- / -able",
      "demander au professeur",
      "sauter la phrase",
    ],
    "décomposer le mot : in- / altér- / -able",
    "Le programme demande de « prendre l'initiative de déduire » : on cherche d'abord dans le mot lui-même."
  ),
  qcm(
    "6e_fr_fixed_enri_4",
    "vocabulaire_enrichir",
    "6e_voc_sens_figure",
    2,
    "Dans « Cette nouvelle m'a glacé le sang », le mot « glacé » est employé...",
    ["au sens propre", "au sens figuré", "comme un nom", "comme un complément de lieu"],
    "au sens figuré",
    "Le sang ne gèle pas vraiment : l'image dit la peur. C'est le sens figuré."
  ),
  qcm(
    "6e_fr_fixed_enri_5",
    "vocabulaire_enrichir",
    "6e_voc_sens_defi",
    3,
    "Dans laquelle de ces phrases « dévorer » est-il au sens figuré ?",
    [
      "Le chien a dévoré sa gamelle.",
      "Elle a dévoré ce roman en deux soirs.",
      "Nous avons dévoré le poulet.",
      "Le chat dévore sa pâtée.",
    ],
    "Elle a dévoré ce roman en deux soirs.",
    "On ne mange pas un livre : quand le verbe ne peut pas être pris au pied de la lettre, il est au sens figuré."
  ),

  // ══ 18. Composer, décomposer et relier les mots ══════════════════════════
  qcm(
    "6e_fr_fixed_rel_1",
    "vocabulaire_relations",
    "6e_voc_relations",
    2,
    "Quels mots appartiennent au même champ lexical que « la mer » ?",
    ["montagne, sommet, neige", "vague, marée, rivage", "cuisine, four, plat", "école, cahier, stylo"],
    "vague, marée, rivage",
    "Un champ lexical réunit les mots d'un même thème : « vague », « marée », « rivage » pour la mer."
  ),
  qcm(
    "6e_fr_fixed_rel_2",
    "vocabulaire_relations",
    "6e_voc_relations",
    3,
    "Quel est l'antonyme de l'ADJECTIF « courageux » ?",
    ["la peur", "lâche", "craindre", "courageusement"],
    "lâche",
    "Le programme demande un antonyme « qui respecte la classe grammaticale » : à un adjectif répond un adjectif."
  ),
  qcm(
    "6e_fr_fixed_rel_3",
    "vocabulaire_relations",
    "6e_voc_formation",
    2,
    "Le mot « portemanteau » est un mot...",
    ["simple", "dérivé", "composé", "invariable"],
    "composé",
    "Un mot composé réunit deux mots qui existent seuls (porte + manteau). Un dérivé, lui, ajoute un affixe."
  ),
  qcm(
    "6e_fr_fixed_rel_4",
    "vocabulaire_relations",
    "6e_voc_composition",
    2,
    "Dans le mot « refroidir », quel est le préfixe ?",
    ["re-", "-ir", "froid", "-dir"],
    "re-",
    "Le préfixe se place devant le radical : « re- » devant « froid » dans « refroidir »."
  ),
  qcm(
    "6e_fr_fixed_rel_5",
    "vocabulaire_relations",
    "6e_voc_racines",
    3,
    "Dans « bibliothèque », que veut dire la racine grecque « biblio » ?",
    ["livre", "maison", "école", "papier"],
    "livre",
    "« biblio » = livre, « thèque » = rangement. Une bibliothèque range des livres."
  ),
  qcm(
    "6e_fr_fixed_rel_6",
    "vocabulaire_relations",
    "6e_voc_formation_defi",
    3,
    "Le suffixe « -eur » dans « nageur » sert à désigner...",
    ["le contraire du mot", "la personne qui fait l'action", "un lieu", "un petit objet"],
    "la personne qui fait l'action",
    "Le suffixe « -eur » forme un nom de personne qui fait l'action : nager → nageur."
  ),

  // ══ 19. Réemployer le mot juste et l'écrire correctement ═════════════════
  qcm(
    "6e_fr_fixed_empl_1",
    "vocabulaire_emploi",
    "6e_voc_reemploi",
    2,
    "Quelle phrase emploie correctement le mot « fièrement » ?",
    [
      "Le champion brandit fièrement sa médaille.",
      "Le fièrement est posé sur la table.",
      "Il mange un fièrement.",
      "Fièrement bleu la maison.",
    ],
    "Le champion brandit fièrement sa médaille.",
    "« fièrement » est un adverbe : il accompagne un verbe (brandir) et a du sens dans la phrase."
  ),
  qcm(
    "6e_fr_fixed_empl_2",
    "vocabulaire_emploi",
    "6e_voc_niveau_langue",
    2,
    "Tu écris une lettre au maire de ta commune. Quelle formulation choisis-tu ?",
    [
      "Répondez-moi vite s'il vous plaît.",
      "Faut que vous regardiez mon truc.",
      "Je vous prie de bien vouloir examiner ma demande.",
      "Jetez un œil à ma demande.",
    ],
    "Je vous prie de bien vouloir examiner ma demande.",
    "On adapte le registre à qui l'on s'adresse : à une autorité, on écrit en langage soutenu."
  ),
  qcm(
    "6e_fr_fixed_empl_3",
    "vocabulaire_emploi",
    "6e_voc_polysemie",
    3,
    "Dans quelle phrase « note » désigne-t-il un son de musique ?",
    [
      "J'ai eu une bonne note en français.",
      "Il a laissé une note sur la table.",
      "Elle a chanté une note très aiguë.",
      "La note du restaurant était salée.",
    ],
    "Elle a chanté une note très aiguë.",
    "Un mot polysémique a plusieurs sens : c'est la phrase qui choisit lequel."
  ),
  qcm(
    "6e_fr_fixed_empl_4",
    "vocabulaire_emploi",
    "6e_voc_orthographe",
    1,
    "Quelle est l'orthographe correcte ?",
    ["rytme", "rithme", "rythme", "rhytme"],
    "rythme",
    "On mémorise l'orthographe des mots étudiés : « rythme », avec le « h » après le « t »."
  ),
  qcm(
    "6e_fr_fixed_empl_5",
    "vocabulaire_emploi",
    "6e_voc_emploi_defi",
    3,
    "Range du plus familier au plus soutenu : voiture, bagnole, automobile.",
    [
      "voiture, bagnole, automobile",
      "bagnole, voiture, automobile",
      "automobile, voiture, bagnole",
      "bagnole, automobile, voiture",
    ],
    "bagnole, voiture, automobile",
    "Familier, courant, soutenu : c'est l'ordre du registre, pas celui de la longueur du mot."
  ),

  // ══ 20. Analyser une phrase simple ═══════════════════════════════════════
  qcm(
    "6e_fr_fixed_gram_1",
    "grammaire_phrase",
    "6e_gram_constituants",
    1,
    "Combien de verbes conjugués dans « Le vent se leva et les feuilles tombèrent » ?",
    ["0", "1", "2", "3"],
    "2",
    "« se leva » et « tombèrent » sont deux verbes conjugués : la phrase est donc complexe."
  ),
  qcm(
    "6e_fr_fixed_gram_2",
    "grammaire_phrase",
    "6e_gram_fonctions",
    2,
    "Dans « Le jardinier plante des fleurs au printemps », quel groupe dit CE QU'il plante ?",
    ["au printemps", "des fleurs", "Le jardinier", "plante"],
    "des fleurs",
    "Le complément d'objet dit ce que l'on plante : « des fleurs »."
  ),
  qcm(
    "6e_fr_fixed_gram_3",
    "grammaire_phrase",
    "6e_gram_fonctions",
    2,
    "Dans « Sous le pont coule la rivière », quel est le sujet du verbe « coule » ?",
    ["le pont", "la rivière", "coule", "sous"],
    "la rivière",
    "On pose « qu'est-ce qui coule ? » : la rivière — un sujet placé après le verbe."
  ),
  qcm(
    "6e_fr_fixed_gram_4",
    "grammaire_phrase",
    "6e_gram_manipulations",
    2,
    "« Ce matin, le bus est arrivé en retard. » Que prouve-t-on en écrivant « Le bus est arrivé en retard ce matin » ?",
    [
      "que « ce matin » est le sujet",
      "que « ce matin » est déplaçable, donc circonstanciel",
      "que la phrase est fausse",
      "que « le bus » est un complément",
    ],
    "que « ce matin » est déplaçable, donc circonstanciel",
    "Le déplacement est une manipulation syntaxique : ce qui se déplace sans casser la phrase est circonstanciel."
  ),
  qcm(
    "6e_fr_fixed_gram_5",
    "grammaire_phrase",
    "6e_gram_manipulations",
    3,
    "Dans « Léa lit un roman dans le jardin », quel groupe peut-on SUPPRIMER sans casser la phrase ?",
    ["Léa", "lit", "un roman", "dans le jardin"],
    "dans le jardin",
    "Le complément circonstanciel se supprime ; le complément d'objet « un roman », lui, ne se supprime pas."
  ),
  qcm(
    "6e_fr_fixed_gram_6",
    "grammaire_phrase",
    "6e_gram_phrase_defi",
    3,
    "« Chaque soir, le vieux gardien du phare allumait la lanterne. » Quel est le sujet ?",
    ["Chaque soir", "le vieux gardien du phare", "la lanterne", "allumait"],
    "le vieux gardien du phare",
    "« Qui est-ce qui allumait ? » : le gardien. Le premier groupe de la phrase n'est pas toujours le sujet."
  ),

  // ══ 21. Attribut du sujet et compléments du verbe ════════════════════════
  qcm(
    "6e_fr_fixed_compl_1",
    "grammaire_complements",
    "6e_gram_attribut_cod",
    2,
    "Dans « Ce garçon est un champion », le groupe « un champion » est...",
    [
      "un complément d'objet direct",
      "un attribut du sujet",
      "un complément circonstanciel",
      "un complément du nom",
    ],
    "un attribut du sujet",
    "Après « est », le groupe dit CE QU'EST le sujet : c'est un attribut, pas un COD."
  ),
  qcm(
    "6e_fr_fixed_compl_2",
    "grammaire_complements",
    "6e_gram_attribut_cod",
    3,
    "Comment distinguer sûrement l'attribut du sujet du COD ?",
    [
      "l'attribut suit un verbe d'état (être, sembler, devenir)",
      "l'attribut est toujours plus court",
      "le COD est toujours en fin de phrase",
      "l'attribut se supprime toujours",
    ],
    "l'attribut suit un verbe d'état (être, sembler, devenir)",
    "C'est le VERBE qui décide : un verbe d'état appelle un attribut, un verbe d'action un complément d'objet."
  ),
  qcm(
    "6e_fr_fixed_compl_3",
    "grammaire_complements",
    "6e_gram_cod_coi",
    2,
    "Dans « Elle parle à son frère », le groupe « à son frère » est...",
    [
      "un complément d'objet direct",
      "un complément d'objet indirect",
      "un attribut du sujet",
      "un complément circonstanciel de lieu",
    ],
    "un complément d'objet indirect",
    "Le complément est relié au verbe par une préposition (« à ») : il est indirect."
  ),
  qcm(
    "6e_fr_fixed_compl_4",
    "grammaire_complements",
    "6e_gram_cc_sortes",
    2,
    "Dans « Il est rentré à cause de l'orage », le groupe souligné exprime...",
    ["le temps", "le lieu", "la cause", "la manière"],
    "la cause",
    "« à cause de » répond à « pourquoi ? » : c'est un complément circonstanciel de cause."
  ),
  qcm(
    "6e_fr_fixed_compl_5",
    "grammaire_complements",
    "6e_gram_complements_defi",
    3,
    "Dans « Le facteur remet le courrier aux habitants chaque matin », combien de compléments du verbe (objet) ?",
    ["aucun", "un", "deux", "trois"],
    "deux",
    "« le courrier » est COD, « aux habitants » est COI. « chaque matin » est circonstanciel, pas un objet."
  ),

  // ══ 22. Analyser le groupe nominal ═══════════════════════════════════════
  qcm(
    "6e_fr_fixed_gn_1",
    "grammaire_groupe_nominal",
    "6e_gram_gn",
    1,
    "Dans « les vieux bateaux du port », quel est le nom NOYAU ?",
    ["les", "vieux", "bateaux", "port"],
    "bateaux",
    "Le noyau est le nom autour duquel tout s'organise : le déterminant et les expansions dépendent de lui."
  ),
  qcm(
    "6e_fr_fixed_gn_2",
    "grammaire_groupe_nominal",
    "6e_gram_gn_toute_fonction",
    2,
    "Dans « Le pêcheur répare son filet », combien y a-t-il de groupes nominaux ?",
    ["un", "deux", "trois", "aucun"],
    "deux",
    "« Le pêcheur » (sujet) et « son filet » (COD) : un groupe nominal reste un groupe nominal quelle que soit sa fonction."
  ),
  qcm(
    "6e_fr_fixed_gn_3",
    "grammaire_groupe_nominal",
    "6e_gram_epithete_cn",
    2,
    "Dans « une plage déserte », le mot « déserte » est...",
    ["un complément du nom", "une épithète", "un attribut du sujet", "un déterminant"],
    "une épithète",
    "Un adjectif collé au nom, sans préposition, est épithète."
  ),
  qcm(
    "6e_fr_fixed_gn_4",
    "grammaire_groupe_nominal",
    "6e_gram_epithete_cn",
    3,
    "Dans « le cari de ma grand-mère », le groupe « de ma grand-mère » est...",
    ["une épithète", "un complément du nom", "un complément circonstanciel", "un attribut"],
    "un complément du nom",
    "La préposition « de » le signale : un groupe nominal introduit par une préposition complète le nom."
  ),
  qcm(
    "6e_fr_fixed_gn_5",
    "grammaire_groupe_nominal",
    "6e_gram_gn_defi",
    3,
    "Dans « ce long chemin de terre », quelles sont les DEUX expansions du nom ?",
    [
      "« ce » et « long »",
      "« long » et « de terre »",
      "« ce » et « de terre »",
      "« chemin » et « terre »",
    ],
    "« long » et « de terre »",
    "« long » est épithète, « de terre » complément du nom. « ce » est un déterminant, pas une expansion."
  ),

  // ══ 23. Les pronoms personnels et leur antécédent ════════════════════════
  qcm(
    "6e_fr_fixed_pron_1",
    "grammaire_pronoms",
    "6e_gram_pronoms",
    1,
    "Dans « Je le vois », le mot « le » est un pronom personnel...",
    ["sujet", "complément", "possessif", "démonstratif"],
    "complément",
    "« Je » est sujet, « le » remplace le groupe complément : c'est un pronom personnel complément."
  ),
  qcm(
    "6e_fr_fixed_pron_2",
    "grammaire_pronoms",
    "6e_gram_pronoms",
    2,
    "Par quel pronom peut-on remplacer « les enfants » dans « Les enfants jouent » ?",
    ["ils", "les", "leur", "eux"],
    "ils",
    "Le groupe est sujet : on le remplace par un pronom personnel sujet, « ils »."
  ),
  qcm(
    "6e_fr_fixed_pron_3",
    "grammaire_pronoms",
    "6e_gram_pronoms_fonction",
    2,
    "Dans « Elle lui a répondu », quelle est la fonction de « lui » ?",
    [
      "sujet",
      "complément d'objet direct",
      "complément d'objet indirect",
      "attribut du sujet",
    ],
    "complément d'objet indirect",
    "« répondre à quelqu'un » : « lui » remplace « à son frère », un complément d'objet indirect."
  ),
  qcm(
    "6e_fr_fixed_pron_4",
    "grammaire_pronoms",
    "6e_gram_pronom_antecedent",
    2,
    "« Le capitaine ouvrit la lettre. Il pâlit. » Quel est l'antécédent de « Il » ?",
    ["la lettre", "Le capitaine", "personne", "le lecteur"],
    "Le capitaine",
    "L'antécédent est le groupe que le pronom reprend, et qui vient AVANT lui dans le texte."
  ),
  qcm(
    "6e_fr_fixed_pron_5",
    "grammaire_pronoms",
    "6e_gram_pronoms_defi",
    3,
    "« Marie tendit le livre à Paul. Il la remercia. » Que remplace « la » ?",
    ["le livre", "Marie", "Paul", "la main"],
    "Marie",
    "« Il » reprend Paul ; « la » est donc l'autre personne, Marie. Le genre et le sens tranchent."
  ),

  // ══ 24. Les accords ══════════════════════════════════════════════════════
  qcm(
    "6e_fr_fixed_acc_1",
    "grammaire_accords",
    "6e_orth_accord_gn",
    2,
    "Quel groupe nominal est correctement accordé ?",
    [
      "des histoire merveilleuses",
      "des histoires merveilleuses",
      "des histoires merveilleuse",
      "des histoires merveilleux",
    ],
    "des histoires merveilleuses",
    "Au féminin pluriel, le déterminant, le nom et l'adjectif s'accordent tous les trois."
  ),
  qcm(
    "6e_fr_fixed_acc_2",
    "grammaire_accords",
    "6e_orth_sujet_verbe",
    3,
    "Choisis la forme correcte : « La bande de pirates ___ à l'abordage. »",
    ["se lancent", "se lance", "se lances", "se lancer"],
    "se lance",
    "Le sujet est « la bande » (singulier), malgré « de pirates » : le verbe reste au singulier."
  ),
  qcm(
    "6e_fr_fixed_acc_3",
    "grammaire_accords",
    "6e_orth_participe_passe",
    2,
    "Choisis la forme correcte : « Elles ___ dans la forêt. » (passé composé de partir)",
    ["sont parti", "sont parties", "ont parties", "sont partir"],
    "sont parties",
    "Passé composé avec être : le participe s'accorde avec le sujet — « elles sont parties »."
  ),
  qcm(
    "6e_fr_fixed_acc_4",
    "grammaire_accords",
    "6e_orth_participe_passe",
    3,
    "Choisis la forme correcte : « Ces lettres, je les ai ___ hier. »",
    ["écrit", "écrite", "écrits", "écrites"],
    "écrites",
    "Avec avoir, le participe s'accorde avec le COD s'il est placé AVANT : « les » reprend « ces lettres »."
  ),
  qcm(
    "6e_fr_fixed_acc_5",
    "grammaire_accords",
    "6e_orth_homophones",
    2,
    "Choisis : « Il ___ parti sans ___ carnet. »",
    ["est / son", "est / sont", "et / son", "et / sont"],
    "est / son",
    "« est » se remplace par « était » ; « son » se remplace par « le sien ». « et » et « sont » ne passent pas."
  ),
  qcm(
    "6e_fr_fixed_acc_6",
    "grammaire_accords",
    "6e_orth_accords_defi",
    3,
    "Combien de fautes d'accord dans « Les grand arbres du jardin est tombé » ?",
    ["une", "deux", "trois", "aucune"],
    "trois",
    "« grands » (adjectif au pluriel), « sont » (verbe au pluriel), « tombés » (participe au pluriel)."
  ),

  // ══ 25. Se repérer dans la phrase complexe ═══════════════════════════════
  qcm(
    "6e_fr_fixed_cplx_1",
    "phrase_complexe",
    "6e_complexe_proposition",
    1,
    "Combien de propositions dans « Le vent souffle et la pluie tombe » ?",
    ["une", "deux", "trois", "aucune"],
    "deux",
    "On compte les verbes conjugués : autant de verbes conjugués, autant de propositions."
  ),
  qcm(
    "6e_fr_fixed_cplx_2",
    "phrase_complexe",
    "6e_complexe_proposition",
    2,
    "« Le pêcheur répare son filet au bord du lagon. » Cette phrase est...",
    ["simple", "complexe", "non verbale", "interrogative"],
    "simple",
    "Un seul verbe conjugué : une seule proposition, donc une phrase simple, si longue soit-elle."
  ),
  qcm(
    "6e_fr_fixed_cplx_3",
    "phrase_complexe",
    "6e_complexe_articulation",
    2,
    "Dans « Le vent souffle, la pluie tombe », les deux propositions sont...",
    ["juxtaposées", "coordonnées", "subordonnées", "identiques"],
    "juxtaposées",
    "Une virgule sans mot de liaison : les propositions sont simplement posées côte à côte, juxtaposées."
  ),
  qcm(
    "6e_fr_fixed_cplx_4",
    "phrase_complexe",
    "6e_complexe_conjonctions",
    3,
    "Dans « Je sors QUAND la pluie s'arrête », le mot « quand » est...",
    [
      "une conjonction de coordination",
      "une conjonction de subordination",
      "un pronom relatif",
      "une préposition",
    ],
    "une conjonction de subordination",
    "« quand » rend la seconde proposition dépendante de la première : elle ne peut pas vivre seule."
  ),
  qcm(
    "6e_fr_fixed_cplx_5",
    "phrase_complexe",
    "6e_complexe_defi",
    3,
    "« Quand la nuit tomba, les pêcheurs rentrèrent et le port s'endormit. » Combien de propositions ?",
    ["une", "deux", "trois", "quatre"],
    "trois",
    "Trois verbes conjugués : « tomba », « rentrèrent », « s'endormit » — donc trois propositions."
  ),

  // ══ 26. Lire une forme verbale ═══════════════════════════════════════════
  qcm(
    "6e_fr_fixed_conj_1",
    "conjugaison_formes",
    "6e_conj_identifier",
    1,
    "Dans « Nous chanterons à la fête », à quel temps est le verbe ?",
    ["au présent", "au futur", "à l'imparfait", "au passé composé"],
    "au futur",
    "« chanterons » (infinitif + -ons) est au futur : l'action n'a pas encore eu lieu."
  ),
  qcm(
    "6e_fr_fixed_conj_2",
    "conjugaison_formes",
    "6e_conj_identifier",
    2,
    "Dans « vous finissiez », quelle est la personne ?",
    [
      "la 1re personne du singulier",
      "la 2e personne du pluriel",
      "la 3e personne du singulier",
      "la 2e personne du singulier",
    ],
    "la 2e personne du pluriel",
    "« vous » = 2e personne du pluriel (ici à l'imparfait : vous finissiez)."
  ),
  qcm(
    "6e_fr_fixed_conj_3",
    "conjugaison_formes",
    "6e_conj_marques",
    3,
    "Dans « nous chantions », quelle est la marque de TEMPS ?",
    ["chant-", "-i-", "-ons", "nous"],
    "-i-",
    "La terminaison se lit en deux morceaux : « -i- » est la marque de l'imparfait, « -ons » celle de la personne."
  ),
  qcm(
    "6e_fr_fixed_conj_4",
    "conjugaison_formes",
    "6e_conj_marques",
    2,
    "Quelle lettre signale toujours le futur simple ?",
    ["le -r-", "le -i-", "le -s-", "le -e-"],
    "le -r-",
    "Je chanteRAI, tu finiRAS, il viendRA : le futur porte toujours un « r » avant la marque de personne."
  ),
  qcm(
    "6e_fr_fixed_conj_5",
    "conjugaison_formes",
    "6e_conj_radical_variations",
    3,
    "Choisis la forme correcte : « Nous ___ le sable. » (verbe ranger, présent)",
    ["rangons", "rangeons", "rangions", "rangeions"],
    "rangeons",
    "Les verbes en -ger gardent le « e » devant « o » et « a » pour conserver le son [ʒ]."
  ),
  qcm(
    "6e_fr_fixed_conj_6",
    "conjugaison_formes",
    "6e_conj_simples_defi",
    3,
    "Choisis la forme correcte : « Tu ___ tes affaires. » (verbe appeler, présent)",
    ["appeles", "appelles", "appèles", "appelle"],
    "appelles",
    "Les verbes en -eler doublent le « l » devant une syllabe muette : j'appelle, tu appelles."
  ),

  // ══ 27. Les temps composés ═══════════════════════════════════════════════
  qcm(
    "6e_fr_fixed_comp_tc_1",
    "conjugaison_temps_composes",
    "6e_conj_composer",
    1,
    "Un temps composé se forme avec...",
    [
      "un auxiliaire et un participe passé",
      "un radical et une terminaison",
      "deux verbes à l'infinitif",
      "un adverbe et un verbe",
    ],
    "un auxiliaire et un participe passé",
    "Le programme le dit en toutes lettres : les temps composés « se composent en deux parties »."
  ),
  qcm(
    "6e_fr_fixed_comp_tc_2",
    "conjugaison_temps_composes",
    "6e_conj_passe_compose",
    2,
    "Choisis la forme correcte : « Autrefois, les chevaliers ___ dans des châteaux. » (imparfait de vivre)",
    ["vivent", "vivaient", "vivront", "vécurent"],
    "vivaient",
    "À l'imparfait, avec « ils », vivre donne « vivaient » (action passée qui dure)."
  ),
  qcm(
    "6e_fr_fixed_comp_tc_3",
    "conjugaison_temps_composes",
    "6e_conj_passe_compose",
    2,
    "Quel auxiliaire pour « aller » au passé composé ?",
    ["avoir", "être", "les deux au choix", "aucun"],
    "être",
    "« Je suis allé » : les verbes de déplacement comme aller, venir, partir se conjuguent avec être."
  ),
  qcm(
    "6e_fr_fixed_comp_tc_4",
    "conjugaison_temps_composes",
    "6e_conj_plus_que_parfait",
    3,
    "Choisis la forme au plus-que-parfait : « Il ___ déjà quand nous sommes arrivés. »",
    ["partait", "était parti", "est parti", "partira"],
    "était parti",
    "Le plus-que-parfait = auxiliaire à l'imparfait + participe passé. Il dit ce qui a eu lieu AVANT un autre passé."
  ),
  qcm(
    "6e_fr_fixed_comp_tc_5",
    "conjugaison_temps_composes",
    "6e_conj_passe_compose_defi",
    3,
    "Choisis la forme correcte : « La lettre qu'il a ___ est arrivée. »",
    ["écrit", "écrite", "écrits", "écrites"],
    "écrite",
    "Le COD « qu' » reprend « la lettre » et se place avant : avec avoir, le participe s'accorde alors."
  ),

  // ══ 28. L'impératif présent et le conditionnel présent ═══════════════════
  qcm(
    "6e_fr_fixed_mode_1",
    "conjugaison_modes",
    "6e_conj_imperatif_conditionnel",
    1,
    "« Ferme la porte. » Ce verbe est...",
    ["à l'indicatif présent", "à l'impératif présent", "au conditionnel", "à l'infinitif"],
    "à l'impératif présent",
    "L'impératif donne un ordre et se conjugue sans sujet exprimé."
  ),
  qcm(
    "6e_fr_fixed_mode_2",
    "conjugaison_modes",
    "6e_conj_imperatif_conditionnel",
    2,
    "Choisis la forme correcte à l'impératif : « ___ tes devoirs. » (verbe faire, 2e personne du singulier)",
    ["Fais", "Faits", "Fait", "Faisez"],
    "Fais",
    "À l'impératif 2e personne du singulier, « faire » donne « fais », sans « s » ajouté ni participe."
  ),
  qcm(
    "6e_fr_fixed_mode_3",
    "conjugaison_modes",
    "6e_conj_imperatif_conditionnel",
    2,
    "« J'aimerais venir avec toi. » Ce verbe est au...",
    ["futur simple", "conditionnel présent", "imparfait", "présent"],
    "conditionnel présent",
    "Le conditionnel exprime un souhait ou une hypothèse : « j'aimerais » n'est pas « j'aimerai »."
  ),
  qcm(
    "6e_fr_fixed_mode_4",
    "conjugaison_modes",
    "6e_conj_marques_conditionnel",
    3,
    "Comment reconnaître le conditionnel présent à sa terminaison ?",
    [
      "il finit par -rai, -ras, -ra",
      "il joint le -r- du futur aux terminaisons de l'imparfait",
      "il n'a pas de terminaison",
      "il finit toujours par -ez",
    ],
    "il joint le -r- du futur aux terminaisons de l'imparfait",
    "Je chante-R-ais : le « r » du futur, puis « -ais », terminaison d'imparfait. C'est la marque du conditionnel."
  ),
  qcm(
    "6e_fr_fixed_mode_5",
    "conjugaison_modes",
    "6e_conj_imperatif_defi",
    3,
    "« Si j'avais le temps, je ___ ce livre. » Quelle forme convient ?",
    ["lirai", "lirais", "lis", "lisais"],
    "lirais",
    "Après « si + imparfait », la conséquence se met au conditionnel présent : « je lirais »."
  ),

  // ══ 29. Temps du discours, temps du récit ════════════════════════════════
  qcm(
    "6e_fr_fixed_val_1",
    "conjugaison_valeurs",
    "6e_conj_discours_recit",
    2,
    "Quels temps sont ceux du RÉCIT au passé ?",
    [
      "présent et futur",
      "imparfait et passé simple",
      "présent et passé composé",
      "conditionnel et impératif",
    ],
    "imparfait et passé simple",
    "Le récit littéraire au passé s'écrit à l'imparfait (le décor) et au passé simple (les actions)."
  ),
  qcm(
    "6e_fr_fixed_val_2",
    "conjugaison_valeurs",
    "6e_conj_discours_recit",
    3,
    "« — J'ai fini mon travail, dit-il. » Le passé composé est ici un temps...",
    ["du récit", "du discours", "de l'impératif", "du futur"],
    "du discours",
    "Quelqu'un parle : on est dans le discours, où le passé composé remplace le passé simple."
  ),
  qcm(
    "6e_fr_fixed_val_3",
    "conjugaison_valeurs",
    "6e_conj_employer",
    3,
    "Dans un récit au passé : « Il marchait tranquillement lorsqu'un cri ___. » Quelle forme convient ?",
    ["retentira", "retentit", "retentissait", "retentirait"],
    "retentit",
    "L'imparfait « marchait » pose le décor ; l'action soudaine se met au passé simple : « retentit »."
  ),
  qcm(
    "6e_fr_fixed_val_4",
    "conjugaison_valeurs",
    "6e_conj_employer",
    2,
    "Pour une vérité toujours vraie — « L'eau ___ à 100 degrés » — quel temps choisir ?",
    ["bouillait", "bout", "bouillira", "a bouilli"],
    "bout",
    "Une vérité générale se dit au présent : « L'eau bout à 100 degrés. »"
  ),
  qcm(
    "6e_fr_fixed_val_5",
    "conjugaison_valeurs",
    "6e_conj_recit_defi",
    3,
    "« Le soleil se couchait. Soudain, une voile apparut à l'horizon. » Pourquoi deux temps différents ?",
    [
      "c'est une faute",
      "l'imparfait plante le décor, le passé simple amène l'action",
      "les deux temps sont équivalents",
      "l'auteur a changé de personnage",
    ],
    "l'imparfait plante le décor, le passé simple amène l'action",
    "C'est la valeur des temps : ce qui dure va à l'imparfait, ce qui survient au passé simple."
  ),
];
