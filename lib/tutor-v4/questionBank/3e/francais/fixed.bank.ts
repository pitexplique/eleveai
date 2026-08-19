// ─── Couche « fixed » imprimable · Français 3e ───────────────────────────────
// Le builder cycle 4 (buildCycle4FrancaisBank) ne produit QUE des items
// kind:"template" → testDeSurvie (fixed sans canvas/audio) serait VIDE. Cette
// couche ajoute des QCM FIXES imprimables, ≥5 par notion (9 notions du cycle 4,
// dont analyse_discours), couvrant les micros distincts, difficulté 1→3.
//
// Perspective annuelle 3e : « Engagement humaniste et émancipation » (témoignage,
// autobiographie, poésie engagée, humanisme). Items ÉCRITS À LA MAIN, on-topic,
// VÉRIFIÉS (orthographe, accords, une seule bonne réponse), un cran AU-DESSUS de
// la 4e (subordonnées circonstancielles, voix passive + complément d'agent,
// subjonctif, conditionnel passé, discours indirect libre, question rhétorique /
// réfutation) et DISTINCTS de CM1/CM2/6e/5e/4e. Niveau brevet.
//
// Fusionnés dans francais3eQuestionBank (index.ts) → enrichissent AUSSI le coach ;
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
    niveau: "3e",
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
    tags: ["3e", notionId, microId, "francais", "fixed", "guide"],
  };
}

export const francais3eFixedBank: TutorBankItemFixedV4[] = [
  // ── 1. Comprendre, interpréter et apprécier ────────────────────────────────
  qcm(
    "3e_fr_fixed_comp_1",
    "lecture_comprehension",
    "3e_comp_sens_global",
    1,
    "Lis : « Tant qu'un seul enfant sera privé d'école, notre combat ne sera pas terminé. » Quel est le sens de cette phrase ?",
    ["un constat que le combat est enfin gagné", "un appel à défendre le droit à l'éducation", "une critique des enseignants trop exigeants", "un rappel des règles de l'école obligatoire"],
    "un appel à défendre le droit à l'éducation",
    "En 3e, on lit des textes engagés : on dégage la thèse (ici, défendre l'éducation)."
  ),
  qcm(
    "3e_fr_fixed_comp_2",
    "lecture_comprehension",
    "3e_comp_indices",
    2,
    "Lis : « Le discours parlait de paix, mais les usines fabriquaient des armes. » Quel indice révèle la contradiction dénoncée ?",
    ["le mot « paix » employé dans le discours", "les usines qui fabriquent des armes", "la longueur inhabituelle du discours", "le lieu où le discours a été prononcé"],
    "les usines qui fabriquent des armes",
    "L'indice contredit le discours officiel : le geste (fabriquer des armes) dément la parole (la paix)."
  ),
  qcm(
    "3e_fr_fixed_comp_3",
    "lecture_comprehension",
    "3e_comp_implicite",
    3,
    "Lis : « On lui avait tout promis. On ne lui donna rien. » Que dénonce cette opposition sèche ?",
    ["un simple oubli, sans réelle importance", "une injustice ou une trahison", "le récit neutre d'un fait ordinaire", "l'annonce d'une promesse enfin tenue"],
    "une injustice ou une trahison",
    "Le contraste souligne l'injustice : c'est l'implicite d'un texte engagé."
  ),
  qcm(
    "3e_fr_fixed_comp_4",
    "lecture_comprehension",
    "3e_comp_apprecier",
    2,
    "Quelle appréciation d'un poème engagé est la plus nuancée ?",
    ["Le poème m'a touché, il est vraiment très triste et très beau.", "Le poème m'a touché : ses images dénoncent la guerre sans crier.", "Le poème m'a touché car la guerre est toujours un sujet terrible.", "Le poème m'a touché, il parle de la guerre en seulement douze vers."],
    "Le poème m'a touché : ses images dénoncent la guerre sans crier.",
    "On formule un jugement nuancé, appuyé sur les procédés du texte (les images fortes)."
  ),
  qcm(
    "3e_fr_fixed_comp_5",
    "lecture_comprehension",
    "3e_comp_sens_global",
    2,
    "Lis : « Je me souviens du silence, ce matin-là, quand nous avons compris que tout allait changer. » Dans un témoignage, cette phrase...",
    ["décrit une matinée calme et sans rien de notable", "annonce un événement grave vécu par le narrateur", "exprime le regret d'un souvenir devenu trop flou", "annonce une bonne nouvelle attendue de tous"],
    "annonce un événement grave vécu par le narrateur",
    "On perçoit l'implicite : le « silence » et « tout allait changer » pèsent lourd."
  ),

  // ── 2. Lire à voix haute et mettre en voix ─────────────────────────────────
  qcm(
    "3e_fr_fixed_voix_1",
    "lecture_voix_haute",
    "3e_voix_preparer",
    1,
    "Pour préparer la lecture d'un poème engagé, le meilleur repérage est...",
    ["le nombre de strophes et la longueur exacte des vers", "les images fortes et le rythme des vers à faire entendre", "la date de publication et le contexte historique", "les mots rares dont il faudra donner le sens exact"],
    "les images fortes et le rythme des vers à faire entendre",
    "On met en voix ce qui porte le sens : images, répétitions et rythme du texte engagé."
  ),
  qcm(
    "3e_fr_fixed_voix_2",
    "lecture_voix_haute",
    "3e_voix_expressive",
    2,
    "Pour rendre puissant un poème de révolte, la lecture doit surtout...",
    ["lire très vite pour donner l'impression d'urgence", "marteler le rythme et mettre en relief les mots forts", "réciter d'une voix égale, sans jamais rien varier", "murmurer du début à la fin pour mieux émouvoir"],
    "marteler le rythme et mettre en relief les mots forts",
    "Le rythme et les accents d'intensité portent la force du texte engagé."
  ),
  qcm(
    "3e_fr_fixed_voix_3",
    "lecture_voix_haute",
    "3e_voix_expressive",
    2,
    "Dans un monologue chargé d'émotion, les silences servent à...",
    ["remplir le temps qui est imparti à la lecture", "faire ressentir l'émotion et laisser résonner le sens", "masquer un oubli sans que personne ne l'entende", "reprendre son souffle avant de dire la suite"],
    "faire ressentir l'émotion et laisser résonner le sens",
    "Les silences et les pauses donnent leur force aux moments d'émotion."
  ),
  qcm(
    "3e_fr_fixed_voix_4",
    "lecture_voix_haute",
    "3e_voix_reciter",
    2,
    "Pour réciter un poème en vers libres, le récitant suit surtout...",
    ["une rime à la fin de chacun des vers libres", "le sens et les images plutôt qu'une rime régulière", "le nombre de syllabes compté à voix haute", "un rythme parfaitement égal d'un vers à l'autre"],
    "le sens et les images plutôt qu'une rime régulière",
    "En vers libres, c'est le sens et les images qui guident la voix."
  ),
  qcm(
    "3e_fr_fixed_voix_5",
    "lecture_voix_haute",
    "3e_voix_reciter",
    3,
    "Pour dire un texte engagé de façon convaincante, il faut...",
    ["lire tout le texte sur un ton parfaitement égal", "varier le rythme et appuyer les mots qui portent", "réciter aussi vite que la diction peut le permettre", "chuchoter d'un bout à l'autre, sans rien appuyer"],
    "varier le rythme et appuyer les mots qui portent",
    "On sert le message en variant le rythme et en soulignant les mots forts."
  ),

  // ── 3. Culture littéraire (Engagement humaniste et émancipation) ───────────
  qcm(
    "3e_fr_fixed_culture_1",
    "culture_litteraire",
    "3e_culture_genres",
    1,
    "Un texte où l'auteur raconte sa propre vie à la première personne est...",
    ["un roman de science-fiction", "un récit autobiographique", "une comédie de caractère", "un manuel scolaire"],
    "un récit autobiographique",
    "Dans l'autobiographie, l'auteur, le narrateur et le personnage ne font qu'un."
  ),
  qcm(
    "3e_fr_fixed_culture_2",
    "culture_litteraire",
    "3e_culture_genres",
    2,
    "Un poème qui dénonce la guerre ou l'injustice est un poème...",
    ["lyrique", "engagé", "descriptif", "de circonstance"],
    "engagé",
    "La poésie engagée met les mots au service d'une cause."
  ),
  qcm(
    "3e_fr_fixed_culture_3",
    "culture_litteraire",
    "3e_culture_contexte",
    2,
    "La poésie de la Résistance a surtout été écrite pendant...",
    ["les guerres de la Révolution", "la Seconde Guerre mondiale", "la guerre de Cent Ans", "la Première Guerre mondiale"],
    "la Seconde Guerre mondiale",
    "On situe la poésie engagée dans son contexte historique (la Résistance)."
  ),
  qcm(
    "3e_fr_fixed_culture_4",
    "culture_litteraire",
    "3e_culture_reseau",
    3,
    "Rapprocher un poème engagé d'une affiche militante sur le même combat, c'est...",
    ["résumer chacune des deux œuvres", "mettre deux œuvres en réseau", "corriger l'orthographe de l'affiche", "compter les vers de chaque poème"],
    "mettre deux œuvres en réseau",
    "On relie des œuvres engagées de formes différentes autour d'une même cause."
  ),
  qcm(
    "3e_fr_fixed_culture_5",
    "culture_litteraire",
    "3e_culture_trace",
    2,
    "Après une lecture engagée, une trace utile dans ton carnet est...",
    ["les procédés de style relevés un à un dans le texte", "la cause défendue et l'effet que le texte a produit sur toi", "la biographie de l'auteur et la liste de ses œuvres", "le résumé le plus neutre possible de ce que dit le texte"],
    "la cause défendue et l'effet que le texte a produit sur toi",
    "On garde le sens du combat du texte et sa résonance personnelle."
  ),

  // ── 4. Écrire pour apprendre, inventer et réfléchir ────────────────────────
  qcm(
    "3e_fr_fixed_ecrit_1",
    "ecriture",
    "3e_ecrit_notes",
    1,
    "Pour préparer un écrit de réflexion au brevet, un bon brouillon...",
    ["contient déjà tout le texte rédigé au propre", "liste les idées et les exemples avant de rédiger", "recopie le sujet et l'ensemble des documents", "se limite à un plan de deux ou trois titres"],
    "liste les idées et les exemples avant de rédiger",
    "Le brouillon organise la pensée avant la rédaction."
  ),
  qcm(
    "3e_fr_fixed_ecrit_2",
    "ecriture",
    "3e_ecrit_invention",
    2,
    "Pour écrire un texte autobiographique, on emploie surtout...",
    ["la troisième personne et le temps présent", "la première personne et le temps du passé", "la deuxième personne et le futur simple", "la première personne et le futur proche"],
    "la première personne et le temps du passé",
    "Le récit de soi se dit à la première personne, au passé."
  ),
  qcm(
    "3e_fr_fixed_ecrit_3",
    "ecriture",
    "3e_ecrit_reflexion",
    2,
    "Pour convaincre dans un texte argumenté, on renforce sa thèse avec...",
    ["des affirmations répétées avec force", "des arguments appuyés sur des exemples précis", "des questions posées sans jamais y répondre", "des exemples donnés sans l'idée qu'ils illustrent"],
    "des arguments appuyés sur des exemples précis",
    "Un argument devient solide quand un exemple concret l'illustre."
  ),
  qcm(
    "3e_fr_fixed_ecrit_4",
    "ecriture",
    "3e_ecrit_reflexion",
    3,
    "Pour réfuter la thèse adverse dans un texte argumenté, on emploie...",
    ["un argument de plus, avec « et » ou bien « de plus »", "un argument opposé, avec « pourtant » ou « au contraire »", "un exemple concret, avec « par exemple » ou « ainsi »", "une conclusion, avec « donc » ou bien « en résumé »"],
    "un argument opposé, avec « pourtant » ou « au contraire »",
    "On réfute en opposant un argument à celui de l'adversaire."
  ),
  qcm(
    "3e_fr_fixed_ecrit_5",
    "ecriture",
    "3e_ecrit_reviser",
    2,
    "Pour relire un texte argumenté, tu vérifies surtout...",
    ["le nombre exact de lignes que compte le texte", "l'enchaînement des arguments et les connecteurs", "la richesse du vocabulaire employé un peu partout", "la longueur de chacune des phrases que tu écris"],
    "l'enchaînement des arguments et les connecteurs",
    "Relire un texte argumenté, c'est vérifier la logique et les liens entre les idées."
  ),

  // ── 5. Prendre la parole, écouter et interagir ─────────────────────────────
  qcm(
    "3e_fr_fixed_oral_1",
    "oral",
    "3e_oral_ecouter",
    1,
    "Pour rendre compte d'un exposé que tu viens d'écouter, tu gardes surtout...",
    ["le plan annoncé et le nombre de parties", "la thèse défendue et les arguments clés", "les exemples cités, sans les arguments", "la conclusion seule, qui résume tout"],
    "la thèse défendue et les arguments clés",
    "On retient l'essentiel du propos : sa thèse et ses arguments."
  ),
  qcm(
    "3e_fr_fixed_oral_2",
    "oral",
    "3e_oral_presenter",
    2,
    "Pour présenter un objet d'étude à l'oral du brevet, un bon appui est...",
    ["un texte lu mot à mot, sans lever les yeux", "un support clair et des exemples précis", "un diaporama qui reprend tout le propos", "une liste de dates apprise par cœur"],
    "un support clair et des exemples précis",
    "À l'oral, on s'appuie sur un support clair et des exemples pour convaincre."
  ),
  qcm(
    "3e_fr_fixed_oral_3",
    "oral",
    "3e_oral_argumenter",
    2,
    "Pour rendre un argument plus fort à l'oral, tu peux...",
    ["le répéter plusieurs fois avec insistance", "l'appuyer sur un exemple précis et vérifiable", "l'appuyer sur ce que pense la grande majorité", "le dire d'une voix plus forte que les autres"],
    "l'appuyer sur un exemple précis et vérifiable",
    "Un exemple concret et vérifiable renforce l'argument."
  ),
  qcm(
    "3e_fr_fixed_oral_4",
    "oral",
    "3e_oral_jouer",
    2,
    "Pour jouer un monologue chargé d'émotion, l'acteur doit surtout...",
    ["dire tout le monologue sur un rythme parfaitement égal", "varier le rythme et les silences pour porter l'émotion", "parler de plus en plus fort jusqu'à la toute fin", "multiplier les gestes pour bien occuper la scène"],
    "varier le rythme et les silences pour porter l'émotion",
    "Les silences et le rythme donnent sa force à un monologue."
  ),
  qcm(
    "3e_fr_fixed_oral_5",
    "oral",
    "3e_oral_argumenter",
    3,
    "Dans un débat, pour réfuter l'avis contraire, tu peux...",
    ["répéter ton avis avec beaucoup plus de fermeté", "opposer un argument avec « au contraire » ou « pourtant »", "lui donner entièrement raison pour éviter le désaccord", "relever une faute de langue dans ce qu'il vient de dire"],
    "opposer un argument avec « au contraire » ou « pourtant »",
    "On réfute en opposant un argument, avec un connecteur d'opposition, sans agressivité."
  ),

  // ── 6. Vocabulaire et orthographe lexicale ─────────────────────────────────
  qcm(
    "3e_fr_fixed_voc_1",
    "vocabulaire",
    "3e_voc_contexte",
    2,
    "Dans « L'orateur dénonça avec véhémence l'injustice », « véhémence » veut dire...",
    ["une très grande douceur", "une force passionnée", "une totale indifférence", "un profond silence"],
    "une force passionnée",
    "Le contexte « dénonça » indique une parole forte et passionnée."
  ),
  qcm(
    "3e_fr_fixed_voc_2",
    "vocabulaire",
    "3e_voc_relations",
    2,
    "Quels mots appartiennent au champ lexical de l'engagement ?",
    ["assiette, verre, nappe", "combat, cause, liberté", "crayon, gomme, règle", "nuage, pluie, vent"],
    "combat, cause, liberté",
    "En 3e, on repère le lexique de l'engagement et de l'émancipation."
  ),
  qcm(
    "3e_fr_fixed_voc_3",
    "vocabulaire",
    "3e_voc_formation",
    2,
    "Le préfixe « anti- » dans « antiesclavagiste » signifie...",
    ["après, à la suite", "contre, opposé à", "avec, en compagnie", "petit, réduit"],
    "contre, opposé à",
    "Le préfixe « anti- » marque l'opposition : un antiesclavagiste lutte contre l'esclavage."
  ),
  qcm(
    "3e_fr_fixed_voc_4",
    "vocabulaire",
    "3e_voc_reemploi",
    2,
    "Quelle phrase emploie correctement le nom « injustice » ?",
    ["Le texte injustice les plus faibles de la société.", "Le texte dénonce l'injustice faite aux plus faibles.", "Ce comportement me paraît vraiment très injustice.", "Il a parlé injustice pendant toute la réunion."],
    "Le texte dénonce l'injustice faite aux plus faibles.",
    "On réemploie le mot dans une phrase qui a du sens."
  ),
  qcm(
    "3e_fr_fixed_voc_5",
    "vocabulaire",
    "3e_voc_contexte",
    3,
    "Dans « Sa lutte fut opiniâtre, il ne renonça jamais », « opiniâtre » veut dire...",
    ["molle et hésitante", "acharnée, tenace", "brève et sans suite", "joyeuse et légère"],
    "acharnée, tenace",
    "Le contexte « il ne renonça jamais » donne le sens : opiniâtre = tenace."
  ),
  qcm(
    "3e_fr_fixed_voc_6",
    "vocabulaire",
    "3e_voc_orthographe",
    1,
    "Quelle est l'orthographe correcte ?",
    ["consience", "conscience", "conciense", "conscence"],
    "conscience",
    "On mémorise l'orthographe des mots abstraits : « conscience », avec « sc »."
  ),

  // ── 7. Phrase, constituants et accords ─────────────────────────────────────
  qcm(
    "3e_fr_fixed_gram_1",
    "grammaire_phrase",
    "3e_gram_constituants",
    1,
    "Dans « Bien qu'il soit tard, il continue de travailler », la subordonnée exprime...",
    ["la cause ou la justification", "l'opposition (la concession)", "le but que l'on poursuit", "la comparaison entre deux faits"],
    "l'opposition (la concession)",
    "« Bien que » introduit une subordonnée de concession (une opposition)."
  ),
  qcm(
    "3e_fr_fixed_gram_2",
    "grammaire_phrase",
    "3e_gram_constituants",
    2,
    "Dans « Il partit avant que la nuit tombe », la subordonnée exprime...",
    ["la conséquence", "le temps", "la condition", "le lieu"],
    "le temps",
    "« avant que » introduit une subordonnée circonstancielle de temps."
  ),
  qcm(
    "3e_fr_fixed_gram_3",
    "grammaire_phrase",
    "3e_gram_fonctions",
    2,
    "Dans « Le coupable fut arrêté par la police », quel est le complément d'agent ?",
    ["le coupable arrêté", "par la police", "fut arrêté hier", "il n'y en a aucun"],
    "par la police",
    "À la voix passive, le complément d'agent (introduit par « par ») fait réellement l'action."
  ),
  qcm(
    "3e_fr_fixed_gram_4",
    "grammaire_phrase",
    "3e_gram_fonctions",
    2,
    "Dans « Il obtint ce poste parce qu'il travaillait dur », quelle est la fonction de « parce qu'il travaillait dur » ?",
    ["complément circonstanciel de temps", "complément circonstanciel de cause", "complément circonstanciel de but", "complément d'objet direct du verbe"],
    "complément circonstanciel de cause",
    "« parce que » introduit une subordonnée circonstancielle de cause."
  ),
  qcm(
    "3e_fr_fixed_gram_5",
    "grammaire_phrase",
    "3e_gram_accords",
    3,
    "Choisis la forme correcte : « Les décisions qui ont été ___ changeront tout. » (prendre)",
    ["pris", "prises", "prise", "prit"],
    "prises",
    "À la voix passive, le participe s'accorde avec le sujet : « les décisions… prises »."
  ),
  qcm(
    "3e_fr_fixed_gram_6",
    "grammaire_phrase",
    "3e_gram_oral_ecrit",
    2,
    "Dans un débat écrit argumenté, on préfère la formule...",
    ["« Cette idée, c'est vraiment n'importe quoi. »", "« Il me semble que cette idée est contestable. »", "« Je trouve que c'est nul, franchement, moi. »", "« Bof, on verra bien ce que ça donnera. »"],
    "« Il me semble que cette idée est contestable. »",
    "L'écrit argumenté choisit un registre courant à soutenu, poli et précis."
  ),

  // ── 8. Discours, registres et paroles rapportées ───────────────────────────
  qcm(
    "3e_fr_fixed_disc_1",
    "analyse_discours",
    "3e_discours_registres",
    1,
    "Un discours qui veut convaincre un large public choisit le plus souvent un registre...",
    ["familier et volontairement relâché", "courant à soutenu, clair et digne", "argotique, pour faire complice", "technique et très spécialisé"],
    "courant à soutenu, clair et digne",
    "Le registre s'adapte à la situation : un discours public reste soigné."
  ),
  qcm(
    "3e_fr_fixed_disc_2",
    "analyse_discours",
    "3e_discours_registres",
    2,
    "Adapter son registre, c'est choisir son langage selon...",
    ["le nombre de personnes qui vous écoutent", "la personne à qui l'on parle et la situation", "l'humeur dans laquelle on se trouve ce jour-là", "la longueur du texte que l'on doit écrire"],
    "la personne à qui l'on parle et la situation",
    "On adapte le registre à l'interlocuteur et au contexte."
  ),
  qcm(
    "3e_fr_fixed_disc_3",
    "analyse_discours",
    "3e_discours_rapportees",
    2,
    "Dans « Elle hésitait : partirait-elle vraiment ? », les pensées sont rapportées...",
    ["au discours direct, avec ses guillemets", "au discours indirect libre", "au discours indirect, avec un « que »", "sous forme de dialogue à deux voix"],
    "au discours indirect libre",
    "Le discours indirect libre mêle la voix du personnage au récit, sans « qu' » ni guillemets."
  ),
  qcm(
    "3e_fr_fixed_disc_4",
    "analyse_discours",
    "3e_discours_argumentatif",
    2,
    "Dans un discours engagé, la question rhétorique (« Qui oserait accepter cela ? ») sert à...",
    ["demander une véritable information à celui qui écoute", "faire réagir et emporter l'adhésion, sans vraie réponse", "changer de sujet pour relancer un discours qui traîne", "donner une consigne très claire à tout l'auditoire"],
    "faire réagir et emporter l'adhésion, sans vraie réponse",
    "La question rhétorique est un procédé qui renforce l'argumentation."
  ),
  qcm(
    "3e_fr_fixed_disc_5",
    "analyse_discours",
    "3e_discours_argumentatif",
    3,
    "Pour réfuter la thèse adverse, on emploie surtout...",
    ["un argument de plus, avec « et » ou bien « de plus »", "un argument opposé avec « au contraire » ou « pourtant »", "un exemple concret, avec « par exemple » ou « ainsi »", "une conclusion, avec « donc » ou bien « en résumé »"],
    "un argument opposé avec « au contraire » ou « pourtant »",
    "On réfute en opposant un argument à celui de l'adversaire, avec un connecteur d'opposition."
  ),

  // ── 9. Formes verbales, temps et modes ─────────────────────────────────────
  qcm(
    "3e_fr_fixed_conj_1",
    "conjugaison",
    "3e_conj_identifier",
    1,
    "Dans « Il faut que tu viennes », « viennes » est au...",
    ["indicatif", "subjonctif", "conditionnel", "impératif"],
    "subjonctif",
    "Après « il faut que », le verbe se met au subjonctif : « que tu viennes »."
  ),
  qcm(
    "3e_fr_fixed_conj_2",
    "conjugaison",
    "3e_conj_identifier",
    2,
    "Dans « J'aurais aimé rester », « aurais aimé » est au...",
    ["plus-que-parfait", "conditionnel passé", "futur antérieur", "passé composé"],
    "conditionnel passé",
    "Le conditionnel passé exprime un regret ou une action non réalisée."
  ),
  qcm(
    "3e_fr_fixed_conj_3",
    "conjugaison",
    "3e_conj_composer",
    2,
    "Choisis la forme correcte : « Je souhaite que tu ___ heureux. » (subjonctif présent d'être)",
    ["es", "sois", "seras", "serais"],
    "sois",
    "Après « je souhaite que », on emploie le subjonctif : « que tu sois »."
  ),
  qcm(
    "3e_fr_fixed_conj_4",
    "conjugaison",
    "3e_conj_composer",
    2,
    "Choisis la forme correcte à la voix passive : « Le coupable ___ par la police. » (arrêter, passé composé)",
    ["a arrêté", "a été arrêté", "arrêtait", "arrêtera"],
    "a été arrêté",
    "La voix passive se forme avec l'auxiliaire être conjugué + participe passé."
  ),
  qcm(
    "3e_fr_fixed_conj_5",
    "conjugaison",
    "3e_conj_employer",
    3,
    "Après « Il est essentiel que... », on emploie...",
    ["l'indicatif futur", "le subjonctif", "le conditionnel présent", "l'impératif présent"],
    "le subjonctif",
    "Une nécessité (« il est essentiel que ») commande le subjonctif."
  ),
];
