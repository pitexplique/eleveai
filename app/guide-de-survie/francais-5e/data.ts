// ─── Guide de survie · Français 5e (cycle 4) ────────────────────────────────
// Contenu ALIGNÉ sur le coach (source de vérité unique) :
// - chapitres      = DOMAINES du BO, chacun recouvrant plusieurs notions de
//   lib/tutor-v4/knowledge/francais/5e/notions.ts (écrites en littéral depuis le
//   24/08/2026 : la 5e s'est détachée de la fabrique du cycle 4, et ses dix
//   notions ont été découpées en vingt-neuf). Voir NOTIONS_DU_CHAPITRE.
// - checklists     = micro-compétences de microSkills.ts (BO cycle 4)
// - test de survie = items "fixed" imprimables de la couche francais5eFixedBank
//   (le builder cycle 4 ne produit que des "template" → testDeSurvie serait vide
//   sans cette couche). Cette même couche enrichit aussi le coach (index.ts).
// Condensés écrits et VÉRIFIÉS à la main contre le BO cycle 4 (orthographe,
// accords, conjugaisons, périmètre 5e). 9 NOTIONS (dont analyse_discours,
// nouvelle au cycle 4). Perspective annuelle : « Découverte de soi, d'autrui et
// du monde » (chevalerie, voyage, comédie).
// ⚠️ Ici le bloc « formules » du KitNotion porte LES RÈGLES QUI SAUVENT (texte,
// pas de LaTeX) : lecture, mise en voix, culture, écriture, oral, vocabulaire,
// phrase, discours/registres, conjugaison.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";
import { microSkills } from "@/lib/tutor-v4/knowledge/francais/5e/microSkills";
import { kitHelpers } from "@/components/kit/fromCoach";
import { francais5eFixedBank } from "@/lib/tutor-v4/questionBank/5e/francais/fixed.bank";
import type { KitData, KitNotion } from "@/components/kit/types";

// Checklists + tests dérivés du coach (module partagé par tous les guides).
const { microsDe, testDeSurvie } = kitHelpers(microSkills);

/**
 * ⭐ UN CHAPITRE DU GUIDE PEUT COUVRIR PLUSIEURS NOTIONS DU COACH (24/08/2026).
 *
 * Le 24/08, les dix notions de la 5e ont été découpées en vingt-neuf (règle de
 * Frédéric : cinq micros par notion au maximum). Le guide, lui, ne peut pas
 * suivre : un guide de survie de vingt-neuf fiches n'est plus un guide, c'est un
 * manuel — et il est fait pour être imprimé et glissé dans un classeur.
 *
 * Les deux granularités sont donc assumées, et reliées ici : le coach travaille
 * notion par notion, le guide révise domaine par domaine. `notions` dit quelles
 * notions du coach un chapitre recouvre ; sans elle, `microsDe(c.id)` ne
 * trouvait plus rien et les checklists « je sais… » se vidaient en silence.
 */
type Condense = Omit<KitNotion, "micros" | "exos"> & { notions?: string[] };

/** Chapitre du guide → notions du coach (voir knowledge/francais/5e/notions.ts). */
const NOTIONS_DU_CHAPITRE: Record<string, string[]> = {
  lecture_comprehension: ["lecture_comprehension", "lecture_apprecier"],
  lecture_voix_haute: ["lecture_voix_haute"],
  culture_litteraire: [
    "culture_connaissances",
    "culture_entrees_5e",
    "lecture_oeuvre_contextes",
  ],
  ecriture: ["ecriture_reflechir", "ecriture_produire", "ecriture_reviser"],
  oral: ["oral_ecouter", "oral_prendre_parole", "oral_dire_jouer"],
  vocabulaire: [
    "vocabulaire_enrichir",
    "vocabulaire_relations",
    "vocabulaire_jouer",
    "vocabulaire_formation",
    "vocabulaire_orthographe",
  ],
  grammaire_phrase: [
    "grammaire_phrase",
    "grammaire_fonctions",
    "grammaire_groupe_nominal",
    "grammaire_reprises",
    "orthographe_accords",
    "orthographe_participe",
  ],
  analyse_discours: ["discours_registres", "discours_paroles_rapportees"],
  conjugaison: [
    "conjugaison_formes",
    "conjugaison_temps_simples",
    "conjugaison_temps_composes",
    "conjugaison_valeurs",
  ],
};

const CONDENSES: Condense[] = [
  {
    id: "lecture_comprehension",
    emoji: "🔎",
    titre: "Comprendre et interpréter",
    domaine: "Lecture",
    essentiel:
      "Comprendre un texte, c'est saisir son **sens global** puis l'**interpréter** en s'appuyant sur des **indices précis**. En 5e, je vais plus loin : je repère ce que le texte **suggère** (l'implicite) et je **justifie** chaque interprétation par un passage. Je donne enfin un **avis de lecteur** argumenté.",
    formules: [
      { label: "Je dégage le sens global", latex: "Avant les détails, je me demande de quoi parle surtout le texte et ce qu'il me fait ressentir. Exemple : un récit où un jeune quitte tout pour découvrir le monde parle d'abord du voyage, pas du village de départ." },
      { label: "Je relève des indices précis", latex: "Je repère les mots et les détails qui portent le sens. Exemple : des braises encore rouges et une couverture par terre indiquent que quelqu'un a dormi là récemment." },
      { label: "Je comprends l'implicite", latex: "L'implicite, c'est ce que l'auteur laisse deviner sans l'écrire. Exemple : si un personnage quitte la pièce sans un mot dès qu'on cite son frère, je comprends que ce sujet le fait souffrir." },
      { label: "Je justifie mon interprétation", latex: "Je ne réponds jamais au hasard : je cite le passage exact qui prouve ma réponse. Exemple : je dis que le héros a peur parce que le texte écrit que sa voix tremble." },
      { label: "Je donne un avis fondé", latex: "Pour dire si j'aime ou non, je m'appuie sur le texte. Exemple : j'ai aimé ce récit parce que le héros ne renonce jamais malgré les dangers." },
    ],
    reflexes: [
      { si: "on me demande le sens global d'un texte", alors: "je résume en une phrase de quoi il parle surtout, sans m'arrêter à un détail" },
      { si: "je dois prouver une interprétation", alors: "je cite le mot ou le passage précis qui la justifie" },
      { si: "le texte ne dit pas ce que ressent un personnage", alors: "je le devine à partir de ses gestes et de ses paroles" },
      { si: "je donne mon avis sur un texte", alors: "j'ajoute une raison et un exemple tiré du texte" },
    ],
    pieges: [
      "Confondre le sens global et un simple détail : je réponds que le texte parle du temps qu'il fait alors qu'il parle surtout du courage du héros. Je cherche l'idée qui traverse tout le passage.",
      "Inventer une interprétation sans preuve : je devine sans pouvoir le montrer dans le texte. Je vérifie qu'un mot ou une phrase justifie ma réponse.",
      "Donner un avis vide comme « c'est bien » : cela ne prouve pas que j'ai compris. J'explique mon avis en m'appuyant sur un passage précis.",
    ],
    reel: "En vrai, quand tu lis une légende créole où le pêcheur rentre du lagon de Saint-Leu avant l'orage sans un mot, tu comprends qu'il a senti le danger même si le texte ne le dit jamais",
  },
  {
    id: "lecture_voix_haute",
    emoji: "📢",
    titre: "Lire à voix haute",
    domaine: "Lecture",
    essentiel:
      "Lire à voix haute, c'est **mettre le texte en voix** pour le faire vivre. Je **prépare** ma lecture, je repère les mots difficiles et les répliques, puis je joue sur la **voix**, le **rythme**, la **ponctuation** et le **regard** pour tenir mon public.",
    formules: [
      { label: "Je prépare ma lecture", latex: "Je lis d'abord en silence pour comprendre le texte, repérer les mots difficiles et, dans un dialogue, repérer qui parle. Exemple : je m'entraîne à dire « chevaucher » ou « écuyer » avant de lire devant la classe." },
      { label: "Je suis la ponctuation", latex: "La ponctuation guide ma voix : petite pause à la virgule, pause plus nette au point, voix qui monte au point d'interrogation. Exemple : « Qui va là ? » se dit avec la voix qui monte à la fin." },
      { label: "Je règle mon rythme", latex: "Je ne lis ni trop vite ni trop lentement, et je ralentis sur les passages importants. Exemple : je dis lentement « Et là, dans l'ombre, une silhouette s'avança » pour tenir le suspense." },
      { label: "Je mets le ton", latex: "J'adapte ma voix à ce que dit le texte : plus fort pour un cri, plus doux pour un secret, et je change de voix pour chaque personnage. Exemple : « — Fuyez ! » se lit fort, « — Chut, écoute » se lit tout bas." },
      { label: "Je lève les yeux", latex: "De temps en temps, je regarde le public au lieu de rester le nez sur ma feuille. Exemple : à la fin d'une phrase, je lève les yeux une seconde, puis je reviens à mon texte." },
    ],
    reflexes: [
      { si: "je vois un point d'exclamation", alors: "je mets plus de force dans ma voix, comme pour un cri ou une alerte" },
      { si: "je tombe sur un mot que je n'ai jamais dit", alors: "je le découpe en syllabes à l'avance et je m'entraîne à le prononcer" },
      { si: "je récite un poème", alors: "je marque une toute petite pause à la fin de chaque vers, sans m'arrêter aussi longtemps qu'à un point" },
      { si: "je lis un dialogue signalé par un tiret", alors: "je change de voix pour montrer que c'est un autre personnage qui parle" },
    ],
    pieges: [
      "Lire trop vite pour finir vite : personne ne comprend et on bute sur les mots. Il faut ralentir et respirer aux virgules.",
      "Rester tout le temps le nez sur sa feuille : on perd l'attention du public. Il faut lever les yeux de temps en temps.",
      "Lire d'une voix toujours plate, sans jamais changer de ton : le texte devient ennuyeux. Il faut suivre la ponctuation et mettre le ton.",
    ],
    reel: "En vrai, quand tu lis une scène de comédie devant la classe au collège de Saint-Pierre, tu forces le ton et les gestes pour faire rire, comme un vrai comédien sur scène",
  },
  {
    id: "culture_litteraire",
    emoji: "📚",
    titre: "Culture littéraire",
    domaine: "Culture littéraire",
    essentiel:
      "Avoir une **culture littéraire**, c'est reconnaître les grands **genres** (roman de chevalerie, récit de voyage, comédie, fable, poème) et **situer** une œuvre dans son époque. En 5e, je découvre les héros du **Moyen Âge** et les grands voyages, et je relie les œuvres entre elles.",
    formules: [
      { label: "Je reconnais le genre", latex: "Chaque texte appartient à une famille. Un roman de chevalerie raconte les quêtes et les exploits des chevaliers ; une comédie fait rire en se moquant des défauts des hommes, comme chez Molière." },
      { label: "Je repère la forme du texte", latex: "Je regarde comment le texte est présenté. Un poème est écrit en vers ; une pièce de théâtre donne le nom du personnage avant sa réplique ; un roman est un long récit en prose." },
      { label: "Je situe l'œuvre dans son époque", latex: "Je me demande quand et où l'histoire a été écrite. Les récits de chevalerie se déroulent au Moyen Âge ; l'Odyssée, elle, vient de l'Antiquité grecque." },
      { label: "Je relie les œuvres entre elles", latex: "Une même idée voyage d'une œuvre à l'autre. Le goût du voyage se retrouve chez Ulysse dans l'Odyssée et chez Sindbad le marin : je peux les mettre en réseau." },
      { label: "Je tiens mon carnet de lecture", latex: "Après chaque œuvre, je note le titre, l'auteur, le genre et ce que j'ai ressenti. Exemple : Yvain ou le Chevalier au lion, roman de chevalerie, j'ai aimé le combat contre le géant." },
    ],
    reflexes: [
      { si: "l'histoire parle de chevaliers, de quêtes et de tournois", alors: "je pense à un roman de chevalerie, au Moyen Âge" },
      { si: "le texte fait rire en montrant les défauts d'un personnage", alors: "je reconnais une comédie" },
      { si: "deux œuvres partagent un même thème comme le voyage", alors: "je les mets en réseau pour les comparer" },
      { si: "je viens de terminer une œuvre", alors: "je note tout de suite le titre, le genre et mon avis dans mon carnet de lecture" },
    ],
    pieges: [
      "Croire que toutes les vieilles histoires viennent de France : l'Odyssée a été composée en Grèce antique, pas au Moyen Âge français. Je cherche le pays et l'époque avant de situer une œuvre.",
      "Confondre la comédie et la tragédie : la comédie fait rire et finit bien, la tragédie est grave et finit souvent mal. Je regarde le ton et la fin.",
      "Penser qu'un film ou une bande dessinée ne comptent pas : une même histoire peut être racontée par l'image. Je relie le livre, la BD et le film d'un même héros.",
    ],
    reel: "En vrai, quand une grand-mère te raconte une légende créole au coin du feu à Cilaos, tu retrouves les mêmes quêtes et les mêmes ruses que dans les romans de chevalerie du Moyen Âge",
  },
  {
    id: "ecriture",
    emoji: "✍️",
    titre: "Écrire un texte",
    domaine: "Écriture",
    essentiel:
      "Écrire, c'est d'abord **réfléchir** avant de rédiger, puis organiser ses idées. Un bon **récit d'invention** a un héros, un obstacle et une fin ; un **paragraphe de réflexion** donne un avis, une raison et un exemple. Je me **relis** toujours pour corriger et enrichir.",
    formules: [
      { label: "J'écris pour apprendre", latex: "Pour retenir une leçon, je reformule l'essentiel avec mes propres mots au lieu de tout recopier. Exemple : au lieu de recopier le manuel, j'écris « Un roman de chevalerie raconte les quêtes d'un chevalier »." },
      { label: "Je construis mon récit", latex: "Un récit d'invention cohérent a un héros, un obstacle à surmonter et une fin. Exemple : un jeune écuyer doit traverser une forêt hantée pour sauver son village, et il y parvient grâce à son courage." },
      { label: "Je rends ma description vivante", latex: "J'emploie des détails précis qui font voir la scène. Exemple : au lieu de « un château », j'écris « un vieux château aux tours couvertes de lierre, dont les fenêtres semblaient nous observer »." },
      { label: "Je donne mon avis en trois temps", latex: "Dans un paragraphe de réflexion, j'écris mon avis, puis une raison, puis un exemple du texte. Exemple : « J'ai admiré ce héros, car il tient sa promesse : il revient sauver son ami au péril de sa vie »." },
      { label: "Je me relis et je corrige", latex: "Avant de rendre, je relis pour vérifier les accords, la ponctuation et le sens, puis j'ajoute un détail pour enrichir. Exemple : je remplace « il partit » par « il partit à l'aube, sans réveiller personne »." },
    ],
    reflexes: [
      { si: "je commence un récit d'invention", alors: "je choisis d'abord mon héros, l'obstacle qu'il doit surmonter et la fin que je veux" },
      { si: "on me demande mon avis sur un texte", alors: "je donne mon avis, une raison, puis un exemple tiré du texte" },
      { si: "ma description est trop vague", alors: "j'ajoute des détails précis : couleurs, bruits, sensations" },
      { si: "j'ai fini d'écrire", alors: "je me relis à voix basse pour repérer les fautes et enrichir une phrase" },
    ],
    pieges: [
      "Recopier le manuel mot à mot pour « apprendre » : on ne retient presque rien. Il faut reformuler avec ses propres mots pour vraiment mémoriser.",
      "Écrire un récit qui part dans tous les sens, sans obstacle ni fin : je choisis un héros, un problème clair et une vraie fin avant de commencer.",
      "Répondre seulement « oui » ou « j'ai aimé » sans expliquer : un paragraphe de réflexion doit toujours donner une raison et un exemple.",
    ],
    reel: "En vrai, quand tu racontes ta randonnée jusqu'au sommet du Piton des Neiges, tu écris d'abord la montée dans le froid, puis l'émotion du lever de soleil, pour que ton lecteur suive le fil",
  },
  {
    id: "oral",
    emoji: "🗣️",
    titre: "Prendre la parole",
    domaine: "Oral",
    essentiel:
      "Prendre la parole, c'est se faire **écouter** et **comprendre**. Je parle **fort**, j'**articule** et je suis un **plan**. J'**écoute** aussi les autres, je **justifie** mon avis et je sais **jouer** un texte de théâtre avec le ton juste.",
    formules: [
      { label: "Je parle fort et j'articule", latex: "Je lève la tête et je parle assez fort pour être entendu du fond de la classe. Exemple : au lieu de marmonner, je dis clairement « Bonjour, je vais vous présenter mon exposé »." },
      { label: "Je suis un plan", latex: "J'annonce d'abord de quoi je vais parler, puis je donne mes idées dans l'ordre. Exemple : « Je vais présenter ce roman de chevalerie en trois parties : l'auteur, l'histoire, puis mon avis »." },
      { label: "J'écoute jusqu'au bout", latex: "Quand quelqu'un parle, je l'écoute sans le couper et je repère ses idées importantes. Exemple : après un exposé, je peux redire « Tu as expliqué comment vivaient les chevaliers »." },
      { label: "Je justifie mon avis", latex: "Je donne mon opinion ET une raison qui l'explique. Exemple : « J'ai aimé ce personnage parce qu'il reste fidèle à sa parole »." },
      { label: "Je joue avec le ton et les gestes", latex: "Quand je joue une scène de théâtre, j'adapte ma voix et mes gestes au personnage. Exemple : pour un personnage rusé, je parle doucement, avec un petit sourire." },
    ],
    reflexes: [
      { si: "je présente un exposé", alors: "j'annonce mon plan, je parle fort et je regarde la classe" },
      { si: "quelqu'un parle pendant un débat", alors: "j'attends qu'il ait fini et je lève la main avant de prendre la parole" },
      { si: "je ne suis pas d'accord avec un camarade", alors: "je le dis poliment et je donne une raison, sans me moquer" },
      { si: "je joue une scène de comédie", alors: "je force un peu le ton et les gestes pour faire rire" },
    ],
    pieges: [
      "Lire ses notes tête baissée en récitant à toute vitesse : je dois lever les yeux, ralentir et regarder la classe pour être bien compris.",
      "Dire seulement « j'aime » ou « je n'aime pas » sans rien ajouter : je dois toujours donner une raison pour justifier mon avis.",
      "Couper la parole des autres parce qu'on a une idée : je dois attendre mon tour et lever la main, même quand c'est urgent.",
    ],
    reel: "En vrai, quand tu présentes ton exposé sur le volcan du Piton de la Fournaise devant la classe, tu parles fort et tu regardes tes camarades pour qu'ils te suivent jusqu'au bout",
  },
  {
    id: "vocabulaire",
    emoji: "🔤",
    titre: "Le vocabulaire",
    domaine: "Étude de la langue",
    essentiel:
      "Le **vocabulaire**, c'est l'ensemble des mots que je sais employer. Pour deviner un mot nouveau, je m'aide du **contexte**. Pour être précis, je relie les mots par **synonymes**, **antonymes** et **champ lexical**, et je comprends comment ils sont **formés** (préfixe, suffixe, radical).",
    formules: [
      { label: "Je devine grâce au contexte", latex: "Quand je ne connais pas un mot, je lis toute la phrase pour trouver son sens. Exemple : dans « le chevalier, intrépide, fonça sur l'ennemi », le contexte montre qu'intrépide veut dire sans peur." },
      { label: "Synonyme et antonyme", latex: "Un synonyme est un mot de sens proche, un antonyme un mot de sens contraire. Exemple : courageux a pour synonyme brave et pour antonyme lâche." },
      { label: "Le champ lexical", latex: "Les mots qui parlent d'un même thème forment un champ lexical. Exemple : épée, bataille et armure appartiennent au champ lexical du combat." },
      { label: "La formation des mots", latex: "On forme des mots avec un radical, un préfixe (devant) et un suffixe (derrière). Exemple : dans déloyal, le préfixe dé- marque le contraire ; dans menteur, le suffixe -eur désigne celui qui ment." },
      { label: "Le réemploi précis", latex: "J'emploie le mot nouveau dans une phrase à moi pour bien le retenir. Exemple : avec vaillamment, j'écris « le chevalier combattit vaillamment jusqu'au bout »." },
    ],
    reflexes: [
      { si: "je ne connais pas un mot dans un texte", alors: "je relis la phrase entière et je cherche des indices autour du mot" },
      { si: "je répète tout le temps le même mot", alors: "je le remplace par un synonyme plus précis" },
      { si: "je vois un préfixe comme dé- ou in-", alors: "je pense qu'il marque souvent le contraire" },
      { si: "j'apprends un mot nouveau", alors: "je note son orthographe et je le réutilise dans une phrase à moi" },
    ],
    pieges: [
      "Croire que deux synonymes veulent dire exactement la même chose : grand et immense sont proches, mais immense est bien plus fort. Je choisis le mot qui convient au sens de ma phrase.",
      "Confondre le champ lexical et la famille de mots. Le champ lexical réunit des mots d'un même thème (épée, bataille, armure) ; la famille réunit des mots bâtis sur le même radical (terre, terrain, terrestre). Je me demande : idée commune ou racine commune ?",
      "Écrire un mot « au son » sans vérifier son orthographe : on écrit aujourd'hui et non « aujourdui », aussitôt et non « aussitot ». Dès que j'ai un doute, je vérifie.",
    ],
    reel: "En vrai, quand tu racontes une sortie en mer au large de Saint-Gilles, tu puises dans le champ lexical de la mer : lagon, récif, vague, marée et écume",
  },
  {
    id: "grammaire_phrase",
    emoji: "🧩",
    titre: "Grammaire et accords",
    domaine: "Étude de la langue",
    essentiel:
      "Une **phrase simple** a un seul verbe conjugué ; une **phrase complexe** en a plusieurs, reliées par **juxtaposition**, **coordination** ou **subordination**. Je repère le **sujet**, le **verbe** et les **compléments** (COD, COI, compléments circonstanciels), puis je fais tous les **accords**.",
    formules: [
      { label: "Je compte les verbes conjugués", latex: "Une phrase simple a un seul verbe conjugué, une phrase complexe en a plusieurs. Exemple : Le vent soufflait et les volets claquaient contient deux verbes conjugués : c'est une phrase complexe." },
      { label: "Je relie les propositions", latex: "Dans une phrase complexe, les propositions sont juxtaposées (virgule ou point-virgule), coordonnées (et, mais, ou, donc, or, ni, car) ou subordonnées. Exemple : Il pleuvait, donc nous sommes rentrés : les deux propositions sont coordonnées par donc." },
      { label: "Je trouve le sujet et le verbe", latex: "Je cherche d'abord le verbe conjugué, puis je pose « qui est-ce qui ? » pour trouver le sujet, même s'il est placé après. Exemple : Sous le pont coule la rivière ; qui coule ? la rivière, c'est le sujet." },
      { label: "Je distingue COD et COI", latex: "Le complément d'objet direct répond à « quoi ? qui ? », le complément d'objet indirect à « à qui ? à quoi ? ». Exemple : Elle offre un livre à son ami ; un livre est COD, à son ami est COI." },
      { label: "Je fais les accords", latex: "Le verbe s'accorde avec son sujet ; dans le groupe nominal, le déterminant et l'adjectif s'accordent avec le nom. Exemple : les élèves de la classe travaillent ; de vieux châteaux abandonnés." },
    ],
    reflexes: [
      { si: "je veux savoir si une phrase est simple ou complexe", alors: "je compte les verbes conjugués" },
      { si: "le sujet est placé après le verbe ou séparé de lui", alors: "je le retrouve avec « qui est-ce qui ? » et j'accorde le verbe avec lui" },
      { si: "je cherche le complément d'objet direct", alors: "je pose la question « quoi ? » ou « qui ? » juste après le verbe" },
      { si: "je n'entends pas la marque du pluriel à l'oral", alors: "je l'écris quand même à l'écrit" },
    ],
    pieges: [
      "Croire qu'une phrase n'a qu'un seul verbe : dans « Le vent soufflait et les volets claquaient », il y en a deux. Je compte tous les verbes conjugués pour savoir si la phrase est simple ou complexe.",
      "Accorder le verbe avec le mot juste avant lui : dans « Les élèves de la classe travaillent », le sujet est les élèves, pas classe. Je remonte au vrai sujet avant d'accorder.",
      "Oublier les accords qu'on n'entend pas : on dit « ils travaillent » comme « il travaille », mais à l'écrit j'ajoute -nt au pluriel.",
    ],
    reel: "En vrai, sur le marché de Saint-Paul, quand tu écris « les letchis de l'étal sont bien mûrs », tu accordes mûrs avec les letchis, pas avec étal qui est juste avant le verbe",
  },
  {
    id: "analyse_discours",
    emoji: "💬",
    titre: "Discours et registres",
    domaine: "Étude de la langue",
    essentiel:
      "Selon la situation, on change de **registre de langue** : **familier**, **courant** ou **soutenu**. Dans un récit, les paroles peuvent être rapportées au **discours direct** (entre guillemets) ou **indirect**. Et pour convaincre, un texte **argumentatif** défend une **thèse** avec des **arguments** et des **exemples**.",
    formules: [
      { label: "Je reconnais les registres", latex: "Le registre familier est relâché (« ce type est sympa »), le registre courant est neutre et poli (« cette personne est aimable »), le registre soutenu est très soigné (« cet individu se montre affable »). Je choisis selon à qui je parle." },
      { label: "Le discours direct", latex: "Le discours direct rapporte les paroles telles quelles, entre guillemets, après deux points. Exemple : Il déclara : « Je pars demain. »" },
      { label: "Le discours indirect", latex: "Le discours indirect rapporte les paroles dans une subordonnée, sans guillemets, en changeant les pronoms et les temps. Exemple : Il déclara qu'il partait le lendemain." },
      { label: "J'argumente", latex: "Pour convaincre, je défends une thèse (mon opinion) à l'aide d'arguments (les raisons) et d'exemples (les preuves). Exemple : il faut protéger la forêt (thèse), car elle abrite mille espèces (argument) ; ainsi, la ravine sèche du Sud protège des oiseaux rares (exemple)." },
    ],
    reflexes: [
      { si: "je parle à un adulte que je ne connais pas", alors: "je choisis le registre courant ou soutenu, pas le familier" },
      { si: "je vois des guillemets après deux points dans un récit", alors: "je reconnais du discours direct" },
      { si: "je transforme un discours direct en discours indirect", alors: "j'enlève les guillemets, j'ajoute « que » et j'adapte les pronoms et les temps" },
      { si: "je veux convaincre dans un texte", alors: "je donne une thèse, puis un argument, puis un exemple" },
    ],
    pieges: [
      "Écrire un devoir comme on parle entre amis : « ce truc est trop bien » relève du familier. Dans un texte scolaire, je passe au registre courant ou soutenu.",
      "Oublier de changer le temps au discours indirect : on ne dit pas « Il a dit qu'il part » mais « Il a dit qu'il partait ». Le verbe des paroles change avec le récit.",
      "Confondre la thèse et l'argument : la thèse est l'opinion défendue, l'argument est la raison qui la soutient. « Il faut protéger la forêt » est la thèse ; « elle abrite mille espèces » est l'argument.",
    ],
    reel: "En vrai, quand tu écris à ton professeur au collège de Saint-André, tu passes du « salut ça va » de la cour à un « bonjour Madame » soigné, parce que le registre change avec la personne à qui tu parles",
  },
  {
    id: "conjugaison",
    emoji: "🕰️",
    titre: "La conjugaison",
    domaine: "Étude de la langue",
    essentiel:
      "Conjuguer, c'est changer la **terminaison** du verbe selon la **personne**, le **temps** et le **mode**. En 5e, je maîtrise les temps du **récit** : l'**imparfait** pose le décor, le **passé simple** raconte les actions, et je sais aussi employer le présent, le futur et l'impératif.",
    formules: [
      { label: "Je découpe radical et terminaison", latex: "Dans un verbe, le radical reste stable et la terminaison change. Exemple : avec chanter, je trouve je chante, nous chantions, ils chantèrent (radical chant-)." },
      { label: "Imparfait : le décor qui dure", latex: "L'imparfait décrit ce qui dure ou se répète dans le passé. Ses terminaisons sont -ais, -ais, -ait, -ions, -iez, -aient. Exemple : Autrefois, les chevaliers vivaient dans des châteaux." },
      { label: "Passé simple : l'action soudaine", latex: "Le passé simple raconte une action brève et soudaine dans un récit. Exemple : Il marchait tranquillement (imparfait) lorsqu'un cri retentit (passé simple)." },
      { label: "Présent, futur, impératif", latex: "Le présent dit ce qui est vrai maintenant ou toujours ; le futur, ce qui arrivera ; l'impératif donne un ordre. Exemple : L'eau bout à cent degrés (présent), nous partirons demain (futur), Écoute ! (impératif)." },
      { label: "J'accorde le participe avec être", latex: "Au passé composé avec être, le participe passé s'accorde avec le sujet : Elles sont parties. Avec avoir, pas d'accord avec le sujet : Elles ont mangé." },
    ],
    reflexes: [
      { si: "je raconte une histoire au passé", alors: "je mets à l'imparfait ce qui dure, et au passé simple les actions soudaines" },
      { si: "je vois les terminaisons -ais, -ait, -ions, -aient", alors: "je pense à l'imparfait, le temps du décor qui dure" },
      { si: "je vois les terminaisons -a, -it, -irent, -èrent", alors: "je pense au passé simple, le temps des actions soudaines" },
      { si: "je forme un passé composé avec l'auxiliaire être", alors: "j'accorde le participe passé avec le sujet, comme dans elle est arrivée" },
    ],
    pieges: [
      "Confondre l'imparfait (je chantais, terminaison -ais) et le passé simple (je chantai, terminaison -ai) : à l'oral ils se ressemblent, mais l'imparfait dure et le passé simple est soudain.",
      "Tout mettre au passé simple dans un récit : le décor qui dure va à l'imparfait. On écrit Il pleuvait (décor) quand la porte claqua (action), et non l'inverse.",
      "Oublier l'accord du participe passé avec être : on n'écrit pas « Elles sont parti » mais « Elles sont parties », car avec être le participe s'accorde avec le sujet.",
    ],
    reel: "En vrai, quand tu racontes ta sortie dans la forêt de Bélouve, tu mets à l'imparfait ce qui durait (la brume flottait entre les tamarins) et au passé simple ce qui a surgi d'un coup (un oiseau s'envola)",
  },
];

// Couche "fixed" imprimable groupée par notion (source des tests de survie).
// ⚠️ ON RANGE PAR LA NOTION DE LA MICRO, PAS PAR CELLE ÉCRITE DANS L'ITEM
// (24/08/2026). Les items de `fixed.bank.ts` portent encore les dix notionId
// d'avant le découpage ; c'est le `microId` qui est la clé stable. Le coach fait
// le même recalage dans `questionBank/5e/francais/index.ts`.
const NOTION_PAR_MICRO = new Map(microSkills.map((micro) => [micro.id, micro.notionId]));
const BANQUES: Record<string, TutorBankItemV4[]> = {};
for (const item of francais5eFixedBank) {
  const notionId = NOTION_PAR_MICRO.get(item.microId) ?? item.notionId;
  (BANQUES[notionId] ??= []).push(item);
}

export const KIT_FRANCAIS_5E: KitData = {
  slug: "francais-5e",
  titre: "Guide de survie · Français 5e",
  baseline:
    "Les 9 grands domaines du français en 5e en 9 fiches : l'essentiel, les règles qui sauvent, les réflexes, les pièges — et un test corrigé par fiche. Pour bien lire, écrire, parler et raconter au collège. À imprimer, à glisser dans le classeur.",
  matiere: "francais",
  classeLabel: "5e",
  coachClasse: "5e",
  notions: CONDENSES.map(({ notions: _ignore, ...c }) => {
    const ids = NOTIONS_DU_CHAPITRE[c.id] ?? [c.id];
    return {
      ...c,
      micros: ids.flatMap((id) => microsDe(id)),
      exos: testDeSurvie(ids.flatMap((id) => BANQUES[id] ?? [])),
    };
  }),
};
