// ─── Couche « fixed » imprimable · Français 5e ───────────────────────────────
// Le builder cycle 4 (buildCycle4FrancaisBank) ne produit QUE des items
// kind:"template" (générés à la volée) → testDeSurvie (qui ne garde que les
// "fixed" sans canvas/audio) serait VIDE sur toutes les notions. Cette couche
// ajoute donc des QCM FIXES imprimables, ≥5 par notion, couvrant min(5, nb
// micros) micros distincts, difficulté 1→3.
//
// ⚠️ 5e = cycle 4 : la couche connaissance vient du module PARTAGÉ collège
// (buildCollegeFrancaisSources) — 9 NOTIONS dont analyse_discours (registres,
// paroles rapportées, discours argumentatif), absente en 6e. Les items ci-dessous
// sont ÉCRITS À LA MAIN et ON-TOPIC pour chaque notion 5e, VÉRIFIÉS à la main
// (orthographe, accords, une seule bonne réponse), un cran AU-DESSUS de la 6e
// (phrase complexe, passé simple du récit, registres, discours rapporté) et
// DISTINCTS de CM1/CM2/6e. La perspective annuelle est « Découverte de soi,
// d'autrui et du monde » (chevalerie, voyage, comédie).
//
// Fusionnés dans francais5eQuestionBank (index.ts) → enrichissent AUSSI le coach ;
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
    niveau: "5e",
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
    tags: ["5e", notionId, microId, "francais", "fixed", "guide"],
  };
}

export const francais5eFixedBank: TutorBankItemFixedV4[] = [
  // ── 1. Comprendre, interpréter et apprécier ────────────────────────────────
  qcm(
    "5e_fr_fixed_comp_1",
    "lecture_comprehension",
    "5e_comp_sens_global",
    1,
    "Lis : « Parti de son village, Aliocha marcha des jours entiers pour voir enfin la mer. » De quoi parle surtout ce passage ?",
    ["d'un repas de fête", "d'un long voyage vers un but", "d'un cours de sport", "d'une dispute"],
    "d'un long voyage vers un but",
    "Le sens global : Aliocha traverse le pays pour atteindre la mer — c'est le récit d'un voyage."
  ),
  qcm(
    "5e_fr_fixed_comp_2",
    "lecture_comprehension",
    "5e_comp_indices",
    2,
    "Lis : « Les braises rougeoyaient encore et une couverture traînait par terre. » Quel indice montre que quelqu'un a dormi là récemment ?",
    ["la couleur du sol", "les braises encore rouges et la couverture", "le nombre de bûches", "la taille de la pièce"],
    "les braises encore rouges et la couverture",
    "On relève les indices précis : des braises encore chaudes et une couverture signalent une présence récente."
  ),
  qcm(
    "5e_fr_fixed_comp_3",
    "lecture_comprehension",
    "5e_comp_implicite",
    3,
    "Lis : « Quand on prononça le nom de son frère, elle quitta la pièce sans un mot. » Qu'est-ce que cela laisse deviner ?",
    ["qu'elle a très faim", "que ce sujet la fait souffrir", "qu'elle adore ce prénom", "qu'elle est pressée de jouer"],
    "que ce sujet la fait souffrir",
    "L'implicite : partir en silence à ce nom laisse deviner une douleur cachée."
  ),
  qcm(
    "5e_fr_fixed_comp_4",
    "lecture_comprehension",
    "5e_comp_apprecier",
    2,
    "Quelle phrase donne un avis de lecteur JUSTIFIÉ sur un récit d'aventure ?",
    ["Ce récit existe.", "J'ai aimé ce récit car le héros ne renonce jamais malgré les dangers.", "Il a douze chapitres.", "C'est un récit."],
    "J'ai aimé ce récit car le héros ne renonce jamais malgré les dangers.",
    "Une appréciation fondée donne un avis ET une raison tirée du texte."
  ),
  qcm(
    "5e_fr_fixed_comp_5",
    "lecture_comprehension",
    "5e_comp_sens_global",
    2,
    "Lis : « Sous ses airs de mendiant, l'inconnu semblait tout observer avec attention. » Quelle impression se dégage ?",
    ["une scène très drôle", "un personnage mystérieux, pas si simple", "un personnage sans importance", "une leçon de calcul"],
    "un personnage mystérieux, pas si simple",
    "Le contraste entre l'apparence (mendiant) et l'attention aiguë crée un personnage mystérieux."
  ),

  // ── 2. Lire à voix haute et mettre en voix ─────────────────────────────────
  qcm(
    "5e_fr_fixed_voix_1",
    "lecture_voix_haute",
    "5e_voix_preparer",
    1,
    "Avant de lire à voix haute un dialogue de récit, il est utile de repérer d'abord...",
    ["le prix du livre", "les répliques de chaque personnage", "le nom de l'imprimeur", "le nombre de pages"],
    "les répliques de chaque personnage",
    "On prépare la mise en voix d'un dialogue en repérant qui parle, pour varier les voix."
  ),
  qcm(
    "5e_fr_fixed_voix_2",
    "lecture_voix_haute",
    "5e_voix_expressive",
    2,
    "Pour lire « — Fuyez ! » hurla le guetteur, comment mettre le ton ?",
    ["en chuchotant doucement", "en haussant fortement la voix, comme un cri d'alerte", "d'une voix plate", "en riant"],
    "en haussant fortement la voix, comme un cri d'alerte",
    "Le point d'exclamation et « hurla » demandent une voix forte, comme une alerte."
  ),
  qcm(
    "5e_fr_fixed_voix_3",
    "lecture_voix_haute",
    "5e_voix_expressive",
    2,
    "À la virgule, dans une lecture à voix haute, on marque...",
    ["un arrêt long et complet", "une courte pause, sans s'arrêter comme à un point", "une accélération soudaine", "un cri"],
    "une courte pause, sans s'arrêter comme à un point",
    "La virgule appelle une brève respiration, plus courte que l'arrêt du point."
  ),
  qcm(
    "5e_fr_fixed_voix_4",
    "lecture_voix_haute",
    "5e_voix_reciter",
    2,
    "Pour bien réciter une fable, on marque une petite pause...",
    ["au milieu de chaque mot", "à la fin de chaque vers", "seulement à la toute fin", "jamais"],
    "à la fin de chaque vers",
    "En poésie, la fin de vers demande une brève pause, sans casser le sens de la phrase."
  ),
  qcm(
    "5e_fr_fixed_voix_5",
    "lecture_voix_haute",
    "5e_voix_reciter",
    3,
    "Si tu perds le fil en récitant devant la classe, le mieux est de...",
    ["t'enfuir de la salle", "faire une courte pause, respirer et reprendre calmement", "parler très vite pour cacher l'oubli", "abandonner"],
    "faire une courte pause, respirer et reprendre calmement",
    "En récitation, un oubli se gère par une courte pause maîtrisée : on respire et on reprend."
  ),

  // ── 3. Culture littéraire (Découverte de soi, d'autrui et du monde) ─────────
  qcm(
    "5e_fr_fixed_culture_1",
    "culture_litteraire",
    "5e_culture_genres",
    1,
    // Définition réécrite en reconnaissance sur extrait (01/08) : donner la
    // définition et demander le nom, c'était permettre de répondre sans avoir
    // jamais ouvert un livre.
    "« Le heaume lacé, il attendit le signal. Au premier choc, les deux lances volèrent en éclats. » De quel genre relève ce texte ?",
    ["un roman policier", "un roman de chevalerie", "un documentaire", "une recette"],
    "un roman de chevalerie",
    "Le heaume, la lance, le signal du combat : c'est le décor du récit de chevalerie, celui qu'on découvre en 5e."
  ),
  qcm(
    "5e_fr_fixed_culture_2",
    "culture_litteraire",
    "5e_culture_genres",
    2,
    // Vraie réplique de Molière (L'Avare, acte IV) — mort en 1673, domaine
    // public. Quand on nomme un auteur, on le cite ; sinon on invente les
    // personnages.
    "« HARPAGON. — Au voleur ! au voleur ! à l'assassin ! au meurtrier ! Justice, juste ciel ! Je suis perdu, je suis assassiné, on m'a coupé la gorge, on m'a dérobé mon argent ! » (Molière, L'Avare) De quel genre relève ce texte ?",
    ["une tragédie", "une comédie", "un poème lyrique", "un conte de fées"],
    "une comédie",
    "Harpagon parle de meurtre et d'assassinat… pour de l'argent volé. C'est la disproportion qui fait rire, et elle dénonce son avarice : la comédie corrige un défaut en s'en moquant."
  ),
  qcm(
    "5e_fr_fixed_culture_3",
    "culture_litteraire",
    "5e_culture_contexte",
    2,
    "Les récits de chevalerie que l'on étudie en 5e se déroulent surtout...",
    ["dans l'Antiquité grecque", "au Moyen Âge", "au XXIe siècle", "sur une autre planète"],
    "au Moyen Âge",
    "On situe le genre dans son époque : la chevalerie appartient au Moyen Âge."
  ),
  qcm(
    "5e_fr_fixed_culture_4",
    "culture_litteraire",
    "5e_culture_reseau",
    3,
    "Retrouver le thème du voyage à la fois dans l'Odyssée et dans les aventures de Sindbad, c'est...",
    ["résumer un seul livre", "mettre deux œuvres en réseau", "corriger l'orthographe", "compter les personnages"],
    "mettre deux œuvres en réseau",
    "Rapprocher deux récits qui partagent un même thème, c'est les mettre en réseau."
  ),
  qcm(
    "5e_fr_fixed_culture_5",
    "culture_litteraire",
    "5e_culture_trace",
    1,
    "Pour garder une trace de tes lectures de l'année, tu peux tenir...",
    ["un cahier de mathématiques", "un carnet de lecture avec titres, extraits et avis", "une liste de courses", "rien du tout"],
    "un carnet de lecture avec titres, extraits et avis",
    "Le carnet de lecture garde la mémoire de chaque œuvre : titre, extrait et avis."
  ),

  // ── 4. Écrire pour apprendre, inventer et réfléchir ────────────────────────
  qcm(
    "5e_fr_fixed_ecrit_1",
    "ecriture",
    "5e_ecrit_notes",
    1,
    "Écrire pour retenir une leçon, c'est surtout...",
    ["recopier tout le manuel mot à mot", "reformuler l'essentiel avec ses propres mots", "n'écrire que la date", "dessiner la couverture"],
    "reformuler l'essentiel avec ses propres mots",
    "Écrire pour apprendre, c'est reformuler l'essentiel, pas tout recopier."
  ),
  qcm(
    "5e_fr_fixed_ecrit_2",
    "ecriture",
    "5e_ecrit_invention",
    2,
    "Pour écrire un récit d'aventure cohérent, il faut au moins...",
    ["une simple liste de mots", "un héros, un obstacle à surmonter et une fin", "beaucoup de fautes", "aucun personnage"],
    "un héros, un obstacle à surmonter et une fin",
    "Un récit cohérent a un personnage, un problème (des péripéties) et un dénouement."
  ),
  qcm(
    "5e_fr_fixed_ecrit_3",
    "ecriture",
    "5e_ecrit_invention",
    2,
    "Pour rendre une description vivante dans un récit, on emploie surtout...",
    ["des chiffres au hasard", "des détails précis qui font voir la scène", "aucun adjectif", "une liste de prix"],
    "des détails précis qui font voir la scène",
    "Une description forte s'appuie sur des détails précis (couleurs, sensations)."
  ),
  qcm(
    "5e_fr_fixed_ecrit_4",
    "ecriture",
    "5e_ecrit_reflexion",
    2,
    "Pour répondre à « Ce personnage est-il courageux ? », un bon paragraphe donne...",
    ["seulement « oui »", "un avis, une raison et un exemple tiré du texte", "le résumé complet du livre", "le prix du livre"],
    "un avis, une raison et un exemple tiré du texte",
    "Un paragraphe de réflexion donne un avis, une raison et un exemple précis."
  ),
  qcm(
    "5e_fr_fixed_ecrit_5",
    "ecriture",
    "5e_ecrit_reviser",
    3,
    "Réviser son texte, c'est surtout...",
    ["le recopier sans le lire", "le relire pour corriger les fautes et améliorer les phrases", "compter les lignes", "changer de cahier"],
    "le relire pour corriger les fautes et améliorer les phrases",
    "Réviser, c'est relire pour corriger et enrichir : on améliore le texte."
  ),

  // ── 5. Prendre la parole, écouter et interagir ─────────────────────────────
  qcm(
    "5e_fr_fixed_oral_1",
    "oral",
    "5e_oral_ecouter",
    1,
    "Pour bien comprendre un exposé, il faut...",
    ["écouter attentivement et repérer les idées importantes", "parler avec son voisin", "penser à autre chose", "regarder par la fenêtre"],
    "écouter attentivement et repérer les idées importantes",
    "Écouter pour comprendre, c'est se concentrer et retenir les idées principales."
  ),
  qcm(
    "5e_fr_fixed_oral_2",
    "oral",
    "5e_oral_presenter",
    2,
    "Pour présenter clairement un exposé devant la classe, il vaut mieux...",
    ["lire tête baissée à toute vitesse", "parler fort, articuler et suivre un plan", "chuchoter", "improviser sans aucune idée"],
    "parler fort, articuler et suivre un plan",
    "Une présentation claire est audible, articulée et organisée par un plan."
  ),
  qcm(
    "5e_fr_fixed_oral_3",
    "oral",
    "5e_oral_argumenter",
    2,
    "Pour défendre ton avis dans un débat, tu dois...",
    ["parler plus fort que les autres", "donner ton avis ET une raison qui l'explique", "répéter « parce que » sans expliquer", "changer d'avis sans cesse"],
    "donner ton avis ET une raison qui l'explique",
    "Justifier, c'est appuyer son avis sur une raison claire."
  ),
  qcm(
    "5e_fr_fixed_oral_4",
    "oral",
    "5e_oral_jouer",
    2,
    "Pour bien jouer une scène de comédie, il faut...",
    ["lire d'une voix plate, sans bouger", "mettre le ton et exagérer les gestes pour faire rire", "parler très bas", "tourner le dos au public"],
    "mettre le ton et exagérer les gestes pour faire rire",
    "La comédie se joue par le ton et l'exagération des gestes."
  ),
  qcm(
    "5e_fr_fixed_oral_5",
    "oral",
    "5e_oral_argumenter",
    3,
    "Dans un débat, quand quelqu'un défend l'avis contraire, tu dois...",
    ["hausser le ton pour avoir raison", "l'écouter, puis répondre calmement avec un argument", "te moquer de lui", "refuser de parler"],
    "l'écouter, puis répondre calmement avec un argument",
    "Interagir dans un débat, c'est écouter l'autre et répondre par un argument, sans agressivité."
  ),

  // ── 6. Vocabulaire et orthographe lexicale ─────────────────────────────────
  qcm(
    "5e_fr_fixed_voc_1",
    "vocabulaire",
    "5e_voc_contexte",
    2,
    "Dans « Le chevalier, intrépide, fonça sur l'ennemi », que veut dire « intrépide » ?",
    ["très prudent", "qui n'a pas peur", "endormi", "malade"],
    "qui n'a pas peur",
    "Le contexte (foncer sur l'ennemi) montre qu'« intrépide » veut dire sans peur."
  ),
  qcm(
    "5e_fr_fixed_voc_2",
    "vocabulaire",
    "5e_voc_relations",
    2,
    "Quels mots appartiennent au même champ lexical que « le combat » ?",
    ["four, casserole, plat", "épée, bataille, armure", "cahier, stylo, gomme", "vague, marée, sable"],
    "épée, bataille, armure",
    "Un champ lexical réunit les mots d'un même thème : ici, celui du combat."
  ),
  qcm(
    "5e_fr_fixed_voc_3",
    "vocabulaire",
    "5e_voc_formation",
    2,
    "Dans le mot « déloyal », que marque le préfixe « dé- » ?",
    ["la répétition", "le contraire (pas loyal)", "un lieu", "un petit objet"],
    "le contraire (pas loyal)",
    "Le préfixe « dé- » inverse le sens : « déloyal » = qui n'est pas loyal."
  ),
  qcm(
    "5e_fr_fixed_voc_4",
    "vocabulaire",
    "5e_voc_formation",
    3,
    "Le suffixe « -eur » dans « menteur » sert à désigner...",
    ["le contraire du mot", "la personne qui fait l'action", "un lieu", "un petit objet"],
    "la personne qui fait l'action",
    "Le suffixe « -eur » forme un nom de personne : mentir → menteur."
  ),
  qcm(
    "5e_fr_fixed_voc_5",
    "vocabulaire",
    "5e_voc_reemploi",
    2,
    "Quelle phrase emploie correctement le mot « vaillamment » ?",
    ["Le vaillamment est sur la table.", "Le chevalier combattit vaillamment jusqu'au bout.", "Il mange un vaillamment.", "Vaillamment bleu la maison."],
    "Le chevalier combattit vaillamment jusqu'au bout.",
    "« vaillamment » est un adverbe : il accompagne un verbe (combattit) et a du sens."
  ),
  qcm(
    "5e_fr_fixed_voc_6",
    "vocabulaire",
    "5e_voc_orthographe",
    1,
    "Quelle est l'orthographe correcte ?",
    ["aussitot", "aussitôt", "aussitôts", "aussi tot"],
    "aussitôt",
    "On mémorise l'orthographe des mots étudiés : « aussitôt », en un mot avec accent circonflexe."
  ),

  // ── 7. Phrase, constituants et accords ─────────────────────────────────────
  qcm(
    "5e_fr_fixed_gram_1",
    "grammaire_phrase",
    "5e_gram_constituants",
    1,
    "Combien de verbes conjugués dans « Le vent soufflait et les volets claquaient » ?",
    ["1", "2", "0", "3"],
    "2",
    "« soufflait » et « claquaient » sont deux verbes conjugués : la phrase est complexe."
  ),
  qcm(
    "5e_fr_fixed_gram_2",
    "grammaire_phrase",
    "5e_gram_constituants",
    2,
    "Dans « Il pleuvait, donc nous sommes restés à l'abri », les deux propositions sont reliées par...",
    ["une subordination", "la coordination (« donc »)", "une juxtaposition sans mot", "rien du tout"],
    "la coordination (« donc »)",
    "« donc » est une conjonction de coordination qui relie les deux propositions."
  ),
  qcm(
    "5e_fr_fixed_gram_3",
    "grammaire_phrase",
    "5e_gram_fonctions",
    2,
    "Dans « Elle offre un livre à son ami », quelle est la fonction de « à son ami » ?",
    ["complément d'objet direct", "complément d'objet indirect (COI)", "sujet", "complément circonstanciel de lieu"],
    "complément d'objet indirect (COI)",
    "Le COI répond à « à qui ? » et se construit avec une préposition : « à son ami »."
  ),
  qcm(
    "5e_fr_fixed_gram_4",
    "grammaire_phrase",
    "5e_gram_accords",
    2,
    "Choisis la forme correcte : « Les élèves de la classe ___ en silence. »",
    ["travaille", "travaillent", "travailles", "travailler"],
    "travaillent",
    "Le sujet est « les élèves » (pluriel), malgré « classe » : le verbe prend « -nt »."
  ),
  qcm(
    "5e_fr_fixed_gram_5",
    "grammaire_phrase",
    "5e_gram_accords",
    3,
    "Quel groupe nominal est correctement accordé ?",
    ["de vieux château abandonnés", "de vieux châteaux abandonnés", "de vieux châteaux abandonné", "de vieil châteaux abandonnés"],
    "de vieux châteaux abandonnés",
    "Au masculin pluriel, le nom et les adjectifs s'accordent : « de vieux châteaux abandonnés »."
  ),
  qcm(
    "5e_fr_fixed_gram_6",
    "grammaire_phrase",
    "5e_gram_oral_ecrit",
    2,
    "À l'écrit soigné, « Y'a plus de pain » s'écrit correctement...",
    ["Ya plus de pain.", "Il n'y a plus de pain.", "Il ya plus de pain.", "Y a plus d'pain."],
    "Il n'y a plus de pain.",
    "À l'écrit, on rétablit la négation complète : « Il n'y a plus de pain. »"
  ),

  // ── 8. Discours, registres et paroles rapportées (nouveau en cycle 4) ──────
  qcm(
    "5e_fr_fixed_disc_1",
    "analyse_discours",
    "5e_discours_registres",
    1,
    "« Salut, ça va ? » relève du registre...",
    ["soutenu", "familier", "littéraire", "scientifique"],
    "familier",
    "Cette salutation relâchée relève du registre familier."
  ),
  qcm(
    "5e_fr_fixed_disc_2",
    "analyse_discours",
    "5e_discours_registres",
    2,
    "Quelle phrase relève du registre soutenu ?",
    ["Désolé, hein.", "Je vous prie de bien vouloir m'excuser.", "Bouge pas.", "C'est bon, oublie."],
    "Je vous prie de bien vouloir m'excuser.",
    "Le registre soutenu emploie un vocabulaire choisi et des tournures polies."
  ),
  qcm(
    "5e_fr_fixed_disc_3",
    "analyse_discours",
    "5e_discours_rapportees",
    2,
    "Quelle phrase rapporte des paroles au discours DIRECT ?",
    ["Il déclara qu'il partait le lendemain.", "Il déclara : « Je pars demain. »", "Il partira demain.", "Demain, il s'en va."],
    "Il déclara : « Je pars demain. »",
    "Le discours direct cite les paroles entre guillemets, telles qu'elles ont été dites."
  ),
  qcm(
    "5e_fr_fixed_disc_4",
    "analyse_discours",
    "5e_discours_rapportees",
    3,
    "« Elle annonça qu'elle reviendrait bientôt. » Ces paroles sont rapportées...",
    ["au discours direct", "au discours indirect", "sans aucun rapport de paroles", "à l'impératif"],
    "au discours indirect",
    "Le discours indirect intègre les paroles dans une subordonnée (« qu'elle... »), sans guillemets."
  ),
  qcm(
    "5e_fr_fixed_disc_5",
    "analyse_discours",
    "5e_discours_argumentatif",
    2,
    "Dans « Il faut protéger la forêt, car elle abrite mille espèces », quel est l'argument ?",
    ["il faut protéger la forêt", "elle abrite mille espèces", "la forêt est jolie", "on aime s'y promener"],
    "elle abrite mille espèces",
    "L'argument est la raison donnée (« car... ») pour soutenir la thèse."
  ),

  // ── 9. Formes verbales, temps et modes ─────────────────────────────────────
  qcm(
    "5e_fr_fixed_conj_1",
    "conjugaison",
    "5e_conj_identifier",
    1,
    "Dans « il courut vers la porte », à quel temps est le verbe ?",
    ["à l'imparfait", "au passé simple", "au présent", "au futur"],
    "au passé simple",
    "« courut » est au passé simple : le temps de l'action soudaine dans le récit."
  ),
  qcm(
    "5e_fr_fixed_conj_2",
    "conjugaison",
    "5e_conj_identifier",
    2,
    "Dans « nous finissions », quel est le temps ?",
    ["le présent", "l'imparfait", "le futur", "le passé simple"],
    "l'imparfait",
    "« nous finissions » (terminaison « -ions ») est à l'imparfait."
  ),
  qcm(
    "5e_fr_fixed_conj_3",
    "conjugaison",
    "5e_conj_composer",
    2,
    "Choisis la forme correcte : « Soudain, il ___ la porte et sortit. » (passé simple d'ouvrir)",
    ["ouvrait", "ouvrit", "ouvre", "ouvrira"],
    "ouvrit",
    "Le passé simple raconte l'action soudaine : « il ouvrit »."
  ),
  qcm(
    "5e_fr_fixed_conj_4",
    "conjugaison",
    "5e_conj_composer",
    2,
    "Choisis la forme correcte : « Autrefois, les chevaliers ___ dans des châteaux. » (imparfait de vivre)",
    ["vivent", "vivaient", "vivront", "vécurent"],
    "vivaient",
    "À l'imparfait, avec « ils », vivre donne « vivaient » (une action passée qui dure)."
  ),
  qcm(
    "5e_fr_fixed_conj_5",
    "conjugaison",
    "5e_conj_employer",
    3,
    "Dans un récit au passé : « Il marchait tranquillement lorsqu'un cri ___. » Quelle forme convient ?",
    ["retentira", "retentit (passé simple)", "retentissait toujours", "retentit demain"],
    "retentit (passé simple)",
    "L'imparfait « marchait » pose le décor ; l'action soudaine se met au passé simple : « retentit »."
  ),
];
