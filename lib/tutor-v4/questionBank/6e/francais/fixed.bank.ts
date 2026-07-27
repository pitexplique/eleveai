// ─── Couche « fixed » imprimable · Français 6e ───────────────────────────────
// Le builder cycle 3 (buildCycle3FrancaisBank) ne produit QUE des items
// kind:"template" (générés à la volée) → testDeSurvie (qui ne garde que les
// "fixed" sans canvas/audio) serait VIDE sur toutes les notions. Cette couche
// ajoute donc des QCM FIXES imprimables, ≥5 par notion, couvrant min(5, nb
// micros) micros distincts, difficulté 1→3.
//
// ⚠️ 6e = cycle 3 pour le générateur, mais la couche connaissance vient du
// module PARTAGÉ collège (buildCollegeFrancaisSources) : notionIds/microIds
// PROPRES à la 6e (lecture_comprehension, lecture_voix_haute, culture_litteraire,
// grammaire_phrase…). Les items ci-dessous sont ÉCRITS À LA MAIN et ON-TOPIC pour
// chaque notion 6e, VÉRIFIÉS à la main (orthographe, accords, une seule bonne
// réponse), un cran AU-DESSUS du CM2 (entrée au collège) et DISTINCTS de CM1/CM2.
// La notion « lecture_voix_haute » (mise en voix) n'a aucun pool builder dédié →
// c'est SURTOUT cette couche qui la porte, côté coach comme côté guide.
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
  // ── 1. Comprendre, interpréter et apprécier ────────────────────────────────
  qcm(
    "6e_fr_fixed_comp_1",
    "lecture_comprehension",
    "6e_comp_sens_global",
    1,
    "Lis : « Malgré la pluie et le froid, Sofia continua sa course jusqu'à la ligne d'arrivée, portée par les encouragements. » De quoi parle surtout ce passage ?",
    ["de la météo du jour", "de la persévérance de Sofia", "d'un match de football", "d'un pique-nique"],
    "de la persévérance de Sofia",
    "Le sens global : malgré les obstacles, Sofia va au bout — c'est la persévérance."
  ),
  qcm(
    "6e_fr_fixed_comp_2",
    "lecture_comprehension",
    "6e_comp_indices",
    2,
    "Lis : « Les valises attendaient près de la porte et les billets étaient posés sur la table. » Quel indice montre qu'un départ se prépare ?",
    ["la porte fermée", "les valises prêtes et les billets", "la table en bois", "l'heure du dîner"],
    "les valises prêtes et les billets",
    "On relève les indices précis du texte : valises et billets annoncent un départ."
  ),
  qcm(
    "6e_fr_fixed_comp_3",
    "lecture_comprehension",
    "6e_comp_implicite",
    3,
    "Lis : « Quand le maître rendit les copies, Malo cacha vite la sienne dans son sac, les joues rouges. » Qu'a probablement eu Malo ?",
    ["la meilleure note", "une mauvaise note", "un cadeau", "une bonne surprise"],
    "une mauvaise note",
    "Cacher sa copie et rougir sont des indices : Malo a sans doute une mauvaise note (implicite)."
  ),
  qcm(
    "6e_fr_fixed_comp_4",
    "lecture_comprehension",
    "6e_comp_apprecier",
    2,
    "Quelle phrase donne un avis de lecteur JUSTIFIÉ sur un roman ?",
    ["Ce roman existe.", "J'ai aimé ce roman car le héros est courageux et drôle.", "Il a deux cents pages.", "C'est un roman d'aventure."],
    "J'ai aimé ce roman car le héros est courageux et drôle.",
    "Une appréciation fondée donne un avis ET une raison tirée du texte."
  ),
  qcm(
    "6e_fr_fixed_comp_5",
    "lecture_comprehension",
    "6e_comp_sens_global",
    2,
    "Lis : « Le vieux phare, abandonné depuis des années, veillait encore sur la baie silencieuse. » Quelle impression se dégage ?",
    ["une impression de fête", "une scène de bataille", "une impression de solitude et de calme", "un moment très drôle"],
    "une impression de solitude et de calme",
    "« abandonné », « silencieuse » et « veillait encore » créent une atmosphère de solitude et de calme."
  ),

  // ── 2. Lire à voix haute et mettre en voix ─────────────────────────────────
  qcm(
    "6e_fr_fixed_voix_1",
    "lecture_voix_haute",
    "6e_voix_preparer",
    1,
    "Avant de lire un texte long à voix haute devant la classe, la meilleure préparation est de...",
    ["le lire une première fois en silence pour repérer les mots difficiles", "le lire une seule fois, très vite", "apprendre seulement le titre", "ne rien préparer"],
    "le lire une première fois en silence pour repérer les mots difficiles",
    "Préparer sa lecture orale, c'est d'abord la lire en silence pour anticiper les mots difficiles."
  ),
  qcm(
    "6e_fr_fixed_voix_2",
    "lecture_voix_haute",
    "6e_voix_expressive",
    2,
    "Pour lire à voix haute « — Attends-moi ! » cria Léa, comment mettre le ton ?",
    ["en chuchotant lentement", "sans changer de voix", "en montant la voix, plus fort, comme un appel", "en riant"],
    "en montant la voix, plus fort, comme un appel",
    "Le point d'exclamation et le verbe « cria » demandent une voix forte, comme un appel."
  ),
  qcm(
    "6e_fr_fixed_voix_3",
    "lecture_voix_haute",
    "6e_voix_expressive",
    2,
    "Pendant une lecture à voix haute, pour garder l'attention de ceux qui écoutent, il faut aussi...",
    ["garder les yeux baissés tout le temps", "lever les yeux vers le public de temps en temps", "tourner le dos", "lire les yeux fermés"],
    "lever les yeux vers le public de temps en temps",
    "Le regard fait partie de la mise en voix : on lève les yeux vers l'auditoire pour le garder attentif."
  ),
  qcm(
    "6e_fr_fixed_voix_4",
    "lecture_voix_haute",
    "6e_voix_reciter",
    2,
    "Pour bien réciter un poème appris par cœur, il vaut mieux...",
    ["réciter le plus vite possible", "respecter le rythme des vers et bien articuler", "sauter les vers difficiles", "parler tout bas, sans expression"],
    "respecter le rythme des vers et bien articuler",
    "Réciter un poème, c'est en respecter le rythme (les vers) et articuler pour être compris."
  ),
  qcm(
    "6e_fr_fixed_voix_5",
    "lecture_voix_haute",
    "6e_voix_reciter",
    3,
    "Si tu oublies un passage en récitant un texte de mémoire, le mieux est de...",
    ["t'arrêter et abandonner", "rester calme, faire une courte pause et reprendre", "parler très vite pour cacher l'oubli", "quitter la scène"],
    "rester calme, faire une courte pause et reprendre",
    "En récitation, un oubli se gère par une courte pause : on reste calme et on reprend le fil."
  ),

  // ── 3. Culture littéraire et artistique ────────────────────────────────────
  qcm(
    "6e_fr_fixed_culture_1",
    "culture_litteraire",
    "6e_culture_genres",
    1,
    "Un texte qui raconte les exploits des dieux et des héros de l'Antiquité, comme Ulysse, est...",
    ["un mythe", "un documentaire", "une recette", "une bande dessinée"],
    "un mythe",
    "Les récits des dieux et héros antiques (Ulysse, Hercule) sont des mythes."
  ),
  qcm(
    "6e_fr_fixed_culture_2",
    "culture_litteraire",
    "6e_culture_genres",
    2,
    "Une courte histoire avec des animaux qui parlent et une morale, écrite par La Fontaine, est...",
    ["un roman policier", "une fable", "une pièce de théâtre", "un article de journal"],
    "une fable",
    "Une histoire brève, souvent avec des animaux et une morale, est une fable."
  ),
  qcm(
    "6e_fr_fixed_culture_3",
    "culture_litteraire",
    "6e_culture_contexte",
    2,
    "L'Odyssée, qui raconte le voyage d'Ulysse, a été composée...",
    ["l'an dernier", "dans l'Antiquité, en Grèce ancienne", "au Moyen Âge en France", "à La Réunion"],
    "dans l'Antiquité, en Grèce ancienne",
    "Situer l'œuvre : l'Odyssée vient de la Grèce antique."
  ),
  qcm(
    "6e_fr_fixed_culture_4",
    "culture_litteraire",
    "6e_culture_reseau",
    3,
    "Un film où un héros affronte un monstre te fait penser au combat d'Ulysse contre le cyclope. Faire ce rapprochement, c'est...",
    ["résumer le film", "mettre deux œuvres en réseau", "corriger l'orthographe", "compter les personnages"],
    "mettre deux œuvres en réseau",
    "Rapprocher deux œuvres qui se ressemblent, c'est les mettre en réseau."
  ),
  qcm(
    "6e_fr_fixed_culture_5",
    "culture_litteraire",
    "6e_culture_trace",
    1,
    "Pour garder une trace de tes lectures de l'année, tu peux tenir...",
    ["un carnet de lecture avec titres, auteurs et avis", "un cahier de mathématiques", "une liste de courses", "rien du tout"],
    "un carnet de lecture avec titres, auteurs et avis",
    "Le carnet de lecture garde la trace de chaque œuvre lue : titre, auteur et avis."
  ),

  // ── 4. Écrire pour apprendre, inventer et réfléchir ────────────────────────
  qcm(
    "6e_fr_fixed_ecrit_1",
    "ecriture",
    "6e_ecrit_notes",
    1,
    "Écrire pour mémoriser une leçon, c'est surtout...",
    ["noter les idées importantes avec ses propres mots", "recopier tout le manuel mot à mot", "dessiner la couverture", "n'écrire que la date"],
    "noter les idées importantes avec ses propres mots",
    "Écrire pour apprendre, c'est reformuler l'essentiel avec ses mots, pas tout recopier."
  ),
  qcm(
    "6e_fr_fixed_ecrit_2",
    "ecriture",
    "6e_ecrit_invention",
    2,
    "Pour écrire un récit d'aventure cohérent, il faut au moins...",
    ["un héros, un problème à résoudre et une fin", "seulement une liste de mots", "beaucoup de fautes", "aucun personnage"],
    "un héros, un problème à résoudre et une fin",
    "Un récit cohérent a un personnage, un problème (péripéties) et un dénouement."
  ),
  qcm(
    "6e_fr_fixed_ecrit_3",
    "ecriture",
    "6e_ecrit_reflexion",
    2,
    "Pour répondre à « As-tu aimé ce livre ? » dans un paragraphe de réflexion, on écrit...",
    ["seulement « oui »", "son avis, suivi d'une raison et d'un exemple du texte", "le résumé complet du livre", "le prix du livre"],
    "son avis, suivi d'une raison et d'un exemple du texte",
    "Un paragraphe de réflexion donne un avis, une raison et un exemple précis."
  ),
  qcm(
    "6e_fr_fixed_ecrit_4",
    "ecriture",
    "6e_ecrit_reviser",
    2,
    "Réviser son texte, c'est...",
    ["le recopier au propre sans le lire", "le relire pour corriger les fautes et améliorer les phrases", "compter les lignes", "changer de cahier"],
    "le relire pour corriger les fautes et améliorer les phrases",
    "Réviser, c'est relire pour corriger et enrichir : on améliore le texte, on ne le recopie pas seulement."
  ),
  qcm(
    "6e_fr_fixed_ecrit_5",
    "ecriture",
    "6e_ecrit_invention",
    3,
    "Dans un récit, pour montrer qu'une action se passe APRÈS une autre, on écrit...",
    ["« En même temps »", "« Plus tard » ou « Ensuite »", "« Au même moment »", "« Pendant ce temps »"],
    "« Plus tard » ou « Ensuite »",
    "Les connecteurs de temps « ensuite », « plus tard » marquent la succession des actions."
  ),

  // ── 5. Prendre la parole, écouter et interagir ─────────────────────────────
  qcm(
    "6e_fr_fixed_oral_1",
    "oral",
    "6e_oral_ecouter",
    1,
    "Pour bien comprendre un exposé oral, il faut...",
    ["écouter attentivement et repérer les idées importantes", "parler avec son voisin", "penser à autre chose", "regarder par la fenêtre"],
    "écouter attentivement et repérer les idées importantes",
    "Écouter pour comprendre, c'est se concentrer et retenir les idées principales."
  ),
  qcm(
    "6e_fr_fixed_oral_2",
    "oral",
    "6e_oral_presenter",
    2,
    "Pour présenter clairement un exposé devant la classe, il vaut mieux...",
    ["lire ses notes à toute vitesse, tête baissée", "parler fort, articuler et suivre un plan", "chuchoter", "improviser sans aucune idée"],
    "parler fort, articuler et suivre un plan",
    "Une présentation claire est audible, articulée et organisée par un plan."
  ),
  qcm(
    "6e_fr_fixed_oral_3",
    "oral",
    "6e_oral_argumenter",
    2,
    "Pour justifier ton point de vue à l'oral, tu dois...",
    ["donner ton avis ET une raison qui l'explique", "répéter « parce que » sans expliquer", "parler plus fort que les autres", "changer d'avis à chaque phrase"],
    "donner ton avis ET une raison qui l'explique",
    "Justifier, c'est appuyer son avis sur une raison claire."
  ),
  qcm(
    "6e_fr_fixed_oral_4",
    "oral",
    "6e_oral_jouer",
    2,
    "Pour bien JOUER une scène de théâtre, il faut...",
    ["lire d'une voix plate, sans bouger", "mettre le ton et les gestes selon le personnage", "parler très bas", "tourner le dos au public"],
    "mettre le ton et les gestes selon le personnage",
    "Jouer un texte, c'est l'interpréter : le ton et les gestes correspondent au personnage."
  ),
  qcm(
    "6e_fr_fixed_oral_5",
    "oral",
    "6e_oral_argumenter",
    3,
    "Dans un débat en classe, quand quelqu'un n'est pas d'accord avec toi, tu dois...",
    ["hausser le ton pour avoir raison", "l'écouter puis répondre calmement avec un argument", "te moquer de lui", "refuser de parler"],
    "l'écouter puis répondre calmement avec un argument",
    "Interagir dans un débat, c'est écouter l'autre et répondre avec un argument, sans agressivité."
  ),

  // ── 6. Vocabulaire et orthographe lexicale ─────────────────────────────────
  qcm(
    "6e_fr_fixed_voc_1",
    "vocabulaire",
    "6e_voc_contexte",
    2,
    "Dans « Le sentier serpentait entre les arbres avant d'atteindre le sommet », que veut dire serpentait ?",
    ["montait tout droit", "faisait des courbes, des virages", "descendait très vite", "s'arrêtait net"],
    "faisait des courbes, des virages",
    "Le contexte (un sentier entre les arbres) montre que serpenter, c'est faire des courbes."
  ),
  qcm(
    "6e_fr_fixed_voc_2",
    "vocabulaire",
    "6e_voc_relations",
    2,
    "Quels mots appartiennent au même champ lexical que « la mer » ?",
    ["montagne, sommet, neige", "vague, marée, rivage", "cuisine, four, plat", "école, cahier, stylo"],
    "vague, marée, rivage",
    "Un champ lexical réunit les mots d'un même thème : « vague », « marée », « rivage » pour la mer."
  ),
  qcm(
    "6e_fr_fixed_voc_3",
    "vocabulaire",
    "6e_voc_formation",
    2,
    "Dans le mot « refroidir », quel est le préfixe ?",
    ["re-", "-ir", "froid", "-dir"],
    "re-",
    "Le préfixe se place devant le radical : « re- » devant « froid » dans « refroidir »."
  ),
  qcm(
    "6e_fr_fixed_voc_4",
    "vocabulaire",
    "6e_voc_formation",
    3,
    "Le suffixe « -eur » dans « nageur » sert à désigner...",
    ["le contraire du mot", "la personne qui fait l'action", "un lieu", "un petit objet"],
    "la personne qui fait l'action",
    "Le suffixe « -eur » forme un nom de personne qui fait l'action : nager → nageur."
  ),
  qcm(
    "6e_fr_fixed_voc_5",
    "vocabulaire",
    "6e_voc_orthographe",
    1,
    "Quelle est l'orthographe correcte ?",
    ["rytme", "rithme", "rythme", "rhytme"],
    "rythme",
    "On mémorise l'orthographe des mots étudiés : « rythme », avec deux « h » à leur place."
  ),
  qcm(
    "6e_fr_fixed_voc_6",
    "vocabulaire",
    "6e_voc_reemploi",
    2,
    "Quelle phrase emploie correctement le mot « fièrement » ?",
    ["Le champion brandit fièrement sa médaille.", "Le fièrement est posé sur la table.", "Il mange un fièrement.", "Fièrement bleu la maison."],
    "Le champion brandit fièrement sa médaille.",
    "« fièrement » est un adverbe : il accompagne un verbe (brandir) et a du sens dans la phrase."
  ),

  // ── 7. Phrase, constituants et accords ─────────────────────────────────────
  qcm(
    "6e_fr_fixed_gram_1",
    "grammaire_phrase",
    "6e_gram_constituants",
    1,
    "Combien de verbes conjugués dans « Le vent se leva et les feuilles tombèrent » ?",
    ["1", "2", "0", "3"],
    "2",
    "« se leva » et « tombèrent » sont deux verbes conjugués : la phrase est complexe."
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
    "6e_gram_accords",
    2,
    "Quel groupe nominal est correctement accordé ?",
    ["des histoire merveilleuses", "des histoires merveilleuses", "des histoires merveilleuse", "des histoires merveilleux"],
    "des histoires merveilleuses",
    "Au féminin pluriel, le nom et l'adjectif s'accordent : « des histoires merveilleuses »."
  ),
  qcm(
    "6e_fr_fixed_gram_5",
    "grammaire_phrase",
    "6e_gram_accords",
    3,
    "Choisis la forme correcte : « La bande de pirates ___ à l'abordage. »",
    ["se lancent", "se lance", "se lances", "se lancer"],
    "se lance",
    "Le sujet est « la bande » (singulier), malgré « de pirates » : le verbe reste au singulier."
  ),
  qcm(
    "6e_fr_fixed_gram_6",
    "grammaire_phrase",
    "6e_gram_oral_ecrit",
    2,
    "À l'écrit soigné, « Y'a pas de problème » s'écrit correctement...",
    ["Ya pas de problème.", "Il n'y a pas de problème.", "Il ya pas de problème.", "Y a pas d'problème."],
    "Il n'y a pas de problème.",
    "À l'écrit, on rétablit la négation complète : « Il n'y a pas de problème. »"
  ),

  // ── 8. Formes verbales, temps et modes ─────────────────────────────────────
  qcm(
    "6e_fr_fixed_conj_1",
    "conjugaison",
    "6e_conj_identifier",
    1,
    "Dans « Nous chanterons à la fête », à quel temps est le verbe ?",
    ["au présent", "au futur", "à l'imparfait", "au passé composé"],
    "au futur",
    "« chanterons » (infinitif + -ons) est au futur : l'action n'a pas encore eu lieu."
  ),
  qcm(
    "6e_fr_fixed_conj_2",
    "conjugaison",
    "6e_conj_identifier",
    2,
    "Dans « vous finissiez », quelle est la personne ?",
    ["la 1re personne du singulier", "la 2e personne du pluriel", "la 3e personne du singulier", "la 2e personne du singulier"],
    "la 2e personne du pluriel",
    "« vous » = 2e personne du pluriel (ici à l'imparfait : vous finissiez)."
  ),
  qcm(
    "6e_fr_fixed_conj_3",
    "conjugaison",
    "6e_conj_composer",
    2,
    "Choisis la forme correcte : « Autrefois, les chevaliers ___ dans des châteaux. » (imparfait de vivre)",
    ["vivent", "vivaient", "vivront", "vécurent"],
    "vivaient",
    "À l'imparfait, avec « ils », vivre donne « vivaient » (action passée qui dure)."
  ),
  qcm(
    "6e_fr_fixed_conj_4",
    "conjugaison",
    "6e_conj_composer",
    2,
    "Choisis la forme correcte : « Elles ___ dans la forêt. » (passé composé de partir)",
    ["sont parti", "sont parties", "ont parties", "sont partir"],
    "sont parties",
    "Passé composé avec être : le participe s'accorde avec le sujet, « elles sont parties »."
  ),
  qcm(
    "6e_fr_fixed_conj_5",
    "conjugaison",
    "6e_conj_employer",
    3,
    "Dans un récit au passé : « Il marchait tranquillement lorsqu'un cri ___. » Quelle forme convient ?",
    ["retentira", "retentit (passé simple)", "retentit demain", "retentissait toujours"],
    "retentit (passé simple)",
    "L'imparfait « marchait » pose le décor ; l'action soudaine se met au passé simple : « retentit »."
  ),
  qcm(
    "6e_fr_fixed_conj_6",
    "conjugaison",
    "6e_conj_employer",
    2,
    "Pour une vérité toujours vraie — « L'eau ___ à 100 degrés » — quel temps choisir ?",
    ["bouillait (imparfait)", "bout (présent)", "bouillira (futur)", "a bouilli (passé composé)"],
    "bout (présent)",
    "Une vérité générale se dit au présent : « L'eau bout à 100 degrés. »"
  ),
];
