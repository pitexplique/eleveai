// LES TABLES DE LA FAMILLE « ORAL » DU FRANÇAIS DE 6e (06/10/2026).
// Voir oral.ts pour la façon dont elles sont tirées et relues.
//
// ⭐ Une SITUATION est un fait sûr : « dans ce cas précis, voici LA bonne
// attitude ». Ses leurres (`faux`) sont écrits POUR ELLE : chacun est
// clairement mauvais dans ce cas-là. Les situations proches (où la bonne
// attitude de l'une est « un peu juste » dans l'autre) sont déclarées
// `voisins` : on ne les oppose jamais l'une à l'autre.
//
// Gabarits : {P} prénom, {il}/{Il} pronom de {P}, {e} « e » si {P} est une
// fille, {Q} un second prénom (toujours de l'AUTRE genre que {P}, pour qu'un
// pronom n'ait jamais deux antécédents), {X} un élément du contexte.

export type Prenom = { p: string; f: boolean };

export const PRENOMS: readonly Prenom[] = [
  { p: "Léa", f: true },
  { p: "Inès", f: true },
  { p: "Chloé", f: true },
  { p: "Aïcha", f: true },
  { p: "Zoé", f: true },
  { p: "Sofia", f: true },
  { p: "Nora", f: true },
  { p: "Jade", f: true },
  { p: "Lina", f: true },
  { p: "Manon", f: true },
  { p: "Emma", f: true },
  { p: "Louise", f: true },
  { p: "Yasmine", f: true },
  { p: "Clara", f: true },
  { p: "Maya", f: true },
  { p: "Anaïs", f: true },
  { p: "Noah", f: false },
  { p: "Maël", f: false },
  { p: "Yanis", f: false },
  { p: "Kenji", f: false },
  { p: "Lucas", f: false },
  { p: "Hugo", f: false },
  { p: "Malo", f: false },
  { p: "Ethan", f: false },
  { p: "Amir", f: false },
  { p: "Théo", f: false },
  { p: "Ilyes", f: false },
  { p: "Adam", f: false },
  { p: "Mathis", f: false },
  { p: "Rayan", f: false },
  { p: "Enzo", f: false },
  { p: "Tom", f: false },
];

export type Situation = {
  id: string;
  /** La situation, au présent, phrases courtes. */
  s: string;
  /** LA bonne attitude, à l'infinitif (pour servir aussi dans « faut-il … ? »). */
  bon: string;
  /** Au moins trois attitudes clairement mauvaises DANS CETTE situation. */
  faux: string[];
  /** Le cas, sans prénom, pour la question inverse (« dans quel cas … ? »). */
  cas: string;
  /** Situations où la bonne attitude de l'une serait « un peu juste » dans l'autre. */
  voisins?: string[];
  /** Tournures propres à cette situation (sinon celles du bloc). */
  tours?: readonly string[];
  /** Ni question inverse, ni leurre d'une question inverse (son cas n'est pas du même ordre). */
  pasDInverse?: boolean;
};

export type Bloc = {
  /** Valeurs de {X}. */
  ctx: readonly string[];
  /** Tournures de la question directe (situation → attitude). */
  tours: readonly string[];
  /** Tournures inverses (attitude → situation) : {bon}, {deBon}, {Bon}. */
  toursInv: readonly string[];
  methode: string;
  methodeInv: string;
  sits: readonly Situation[];
};

// ── Les sujets d'exposé (15, un seul réunionnais) ─────────────────────────
export const SUJETS: readonly string[] = [
  "les volcans",
  "les abeilles",
  "le système solaire",
  "les dinosaures",
  "le judo",
  "les pirates",
  "les baleines",
  "le chocolat",
  "les manchots",
  "le cycle de l'eau",
  "les pyramides d'Égypte",
  "les Jeux olympiques",
  "les robots",
  "les tortues marines de La Réunion",
  "la vie des fourmis",
  "les instruments de musique",
  "les châteaux forts",
];

// ── 6e_oral_presenter : présenter un travail de façon claire et organisée ──
export const PRESENTER: Bloc = {
  ctx: SUJETS,
  tours: [
    "Que doit faire {P} ?",
    "Quelle est la bonne attitude pour {P} ?",
    "Que conseilles-tu à {P} ?",
    "Quel est le meilleur choix pour {P} ?",
  ],
  toursInv: [
    "Pendant un exposé, dans quel cas faut-il surtout {bon} ?",
    "« {Bon} » : à quel moment d'un exposé ce conseil sert-il ?",
    "Un élève présente un exposé. Quand doit-il penser à {bon} ?",
  ],
  methode: "Demande-toi ce dont la classe a besoin à ce moment précis pour bien suivre l'exposé.",
  methodeInv: "Cherche le moment de l'exposé où ce conseil règle un vrai problème.",
  sits: [
    {
      id: "debut",
      s: "{P} commence son exposé sur {X}.",
      bon: "annoncer son plan en quelques mots",
      faux: [
        "commencer par le détail le plus compliqué",
        "parler de tout en même temps",
        "raconter ce qu'on a mangé à midi",
        "lire ses notes tête baissée",
      ],
      cas: "au tout début de l'exposé",
    },
    {
      id: "fond",
      s: "{P} présente un exposé sur {X}. Les élèves du fond n'entendent rien.",
      bon: "parler plus fort, sans crier",
      faux: [
        "continuer sans rien changer",
        "accélérer pour finir plus vite",
        "baisser la voix pour rester discret",
        "s'adresser seulement au premier rang",
      ],
      cas: "quand le fond de la classe n'entend pas",
      voisins: ["notes", "vite"],
    },
    {
      id: "notes",
      s: "{P} présente un exposé sur {X}. {Il} garde le nez sur sa feuille.",
      bon: "lever les yeux et regarder la classe",
      faux: [
        "lire encore plus vite",
        "cacher son visage derrière la feuille",
        "tourner le dos à la classe",
        "fermer les yeux pour se concentrer",
      ],
      cas: "quand on garde le nez sur ses notes",
      voisins: ["fond", "photo"],
    },
    {
      id: "mot",
      s: "{P} fait un exposé sur {X}. {Il} emploie un mot que la classe ne connaît pas.",
      bon: "expliquer le mot inconnu avec des mots simples",
      faux: [
        "dire ce mot très vite pour passer à la suite",
        "répéter ce mot trois fois sans l'expliquer",
        "affirmer que tout le monde devrait le connaître",
        "remplacer ce mot par « truc »",
      ],
      cas: "quand un mot est inconnu de la classe",
    },
    {
      id: "fin",
      s: "{P} arrive à la fin de son exposé sur {X}.",
      bon: "résumer en une phrase l'idée principale",
      faux: [
        "s'arrêter au milieu d'une phrase",
        "ajouter une toute nouvelle partie",
        "s'asseoir sans rien dire",
        "recommencer depuis le début",
      ],
      cas: "à la fin de l'exposé",
    },
    {
      id: "question",
      s: "{P} vient de finir un exposé sur {X}. On lui pose une question, mais {il} ne connaît pas la réponse.",
      bon: "reconnaître qu'on ne sait pas et proposer de chercher",
      faux: [
        "inventer une réponse au hasard",
        "faire semblant de ne pas entendre",
        "répondre à une autre question",
        "se moquer de la question",
      ],
      cas: "quand on ne connaît pas la réponse à une question",
    },
    {
      id: "photo",
      s: "{P} fait un exposé sur {X}. {Il} veut montrer une photo à la classe.",
      bon: "dire ce que montre l'image, en restant face à la classe",
      faux: [
        "la montrer une seconde, sans rien dire",
        "tourner le dos à la classe pour la regarder",
        "la faire passer dans les rangs en continuant à parler",
        "la cacher sous ses notes",
      ],
      cas: "quand on montre une image à la classe",
      voisins: ["notes"],
    },
    {
      id: "trac",
      s: "{P} va présenter un exposé sur {X}. Juste avant, {il} a le trac.",
      bon: "respirer calmement avant de commencer",
      faux: [
        "parler très vite pour en finir",
        "refuser de passer",
        "apprendre de nouvelles choses à la dernière minute",
        "rire nerveusement pendant tout l'exposé",
      ],
      cas: "juste avant de passer, quand on a le trac",
    },
    {
      id: "partie",
      s: "{P} fait un exposé sur {X}. {Il} passe à la deuxième partie.",
      bon: "annoncer la nouvelle partie par un mot de liaison",
      faux: [
        "changer de sujet sans prévenir",
        "recommencer la première partie",
        "se taire une longue minute",
        "sauter directement à la conclusion",
      ],
      cas: "quand on passe d'une partie à l'autre",
    },
    {
      id: "temps",
      s: "{P} a cinq minutes pour son exposé sur {X}. {Il} a beaucoup trop de choses à dire.",
      bon: "garder seulement les informations les plus importantes",
      faux: [
        "parler deux fois plus vite",
        "dépasser le temps sans s'en soucier",
        "supprimer l'introduction et la conclusion",
        "tout dire en vrac",
      ],
      cas: "quand on a trop de choses à dire pour le temps donné",
      voisins: ["vite"],
    },
    {
      id: "vite",
      s: "{P} fait un exposé sur {X}. {Il} parle si vite que la classe ne suit pas.",
      bon: "ralentir et marquer des pauses",
      faux: [
        "parler encore plus vite",
        "sauter des phrases au hasard",
        "parler plus bas",
        "regarder sa montre sans arrêt",
      ],
      cas: "quand la classe ne suit pas parce qu'on va trop vite",
      voisins: ["fond", "temps"],
    },
    {
      id: "prepa",
      s: "{P} prépare à la maison son exposé sur {X}.",
      bon: "noter des mots clés sur une fiche, pas des phrases entières",
      faux: [
        "écrire tout le texte pour le lire mot à mot",
        "ne rien préparer et improviser",
        "recopier une page d'internet sans la comprendre",
        "apprendre par cœur un texte trop long",
      ],
      cas: "pendant la préparation à la maison",
    },
  ],
};

// ── 6e_oral_codes : prendre la parole en respectant les codes de l'échange ──
// {X} = un adulte, toujours avec « un », « une », « la » ou « l' » (jamais « le » :
// « à le » serait fautif).
export const ADULTES: readonly string[] = [
  "la directrice du collège",
  "un pompier venu en classe",
  "la bibliothécaire",
  "un écrivain invité",
  "une guide de musée",
  "l'infirmière scolaire",
  "un chercheur venu parler des étoiles",
  "la principale adjointe",
  "un journaliste en visite",
  "une vétérinaire invitée",
  "un gardien de parc national",
  "la cheffe de la cantine",
];

export const CODES: Bloc = {
  ctx: ADULTES,
  tours: [
    "Que doit faire {P} ?",
    "Quelle est la bonne attitude pour {P} ?",
    "Que conseilles-tu à {P} ?",
    "Comment {P} doit-{il} s'y prendre ?",
  ],
  toursInv: [
    "Dans un échange, dans quel cas faut-il {bon} ?",
    "« {Bon} » : dans quelle situation est-ce la bonne attitude ?",
    "Quand un élève doit-il penser à {bon} ?",
  ],
  methode: "Pense aux règles d'un échange : chacun parle à son tour, poliment, et on adapte sa façon de parler à la personne.",
  methodeInv: "Cherche la situation où cette attitude respecte le mieux les règles de l'échange.",
  sits: [
    {
      id: "main",
      s: "{P} participe à un débat en classe. {Il} veut donner son avis.",
      bon: "lever la main et attendre son tour",
      faux: ["parler par-dessus les autres", "crier son avis depuis sa place", "se lever et aller au tableau", "attendre la fin du cours pour le dire"],
      cas: "quand on veut prendre la parole pendant un débat",
      voisins: ["coupe"],
    },
    {
      id: "coupe",
      s: "{P} donne son avis pendant un débat. {Q} lui coupe la parole.",
      bon: "demander calmement de pouvoir finir sa phrase",
      faux: ["crier plus fort {queQ}", "se taire et bouder", "se moquer {deQ}", "quitter le débat"],
      cas: "quand on se fait couper la parole",
      voisins: ["main", "excuse", "long"],
    },
    {
      id: "excuse",
      s: "{P} vient de couper la parole à {Q}, sans le faire exprès.",
      bon: "s'excuser et laisser {Q} finir",
      faux: ["continuer à parler", "dire {queQ} parlait trop longtemps", "hausser la voix pour garder la parole", "faire comme si de rien n'était"],
      cas: "quand on vient de couper la parole à quelqu'un",
      voisins: ["coupe", "long"],
    },
    {
      id: "adulte",
      s: "{P} veut poser une question à {X}.",
      bon: "dire bonjour et vouvoyer l'adulte",
      faux: ["tutoyer l'adulte comme un copain", "commencer par « Hé ! »", "poser sa question sans dire bonjour", "parler la bouche pleine"],
      cas: "quand on s'adresse à un adulte qu'on connaît peu",
      voisins: ["repeteAdulte"],
    },
    {
      id: "anime",
      s: "{P} anime le débat de la classe aujourd'hui.",
      bon: "donner la parole à chacun à tour de rôle",
      faux: ["donner la parole seulement à ses amis", "parler à la place des autres", "laisser tout le monde parler en même temps", "garder la parole pour soi"],
      cas: "quand on anime un débat",
    },
    {
      id: "bas",
      s: "Pendant un débat, {Q} parle trop bas. {P} n'entend rien.",
      bon: "demander poliment à {Q} de parler plus fort",
      faux: ["se boucher les oreilles", "dire tout haut que c'est nul", "bavarder avec son voisin", "faire du bruit pour montrer qu'on s'ennuie"],
      cas: "quand un camarade parle trop bas",
      voisins: ["repeteAmi"],
    },
    {
      id: "long",
      s: "{P} parle depuis longtemps pendant le débat. Les autres attendent leur tour.",
      bon: "finir son idée et laisser parler les autres",
      faux: ["continuer encore un long moment", "répéter ses idées une deuxième fois", "parler plus vite pour tout dire", "refuser de s'arrêter"],
      cas: "quand on garde la parole trop longtemps",
      voisins: ["coupe", "excuse"],
    },
    {
      id: "repeteAdulte",
      s: "{P} n'a pas compris une phrase {deX}.",
      bon: "demander : « Pourriez-vous répéter, s'il vous plaît ? »",
      faux: ["dire « Hein ? »", "dire « Répète ! »", "faire semblant d'avoir compris", "dire « Tu peux répéter ? »"],
      cas: "quand on n'a pas compris un adulte",
      voisins: ["adulte", "repeteAmi"],
    },
    {
      id: "repeteAmi",
      s: "{P} n'a pas compris ce {queQ} vient de dire.",
      bon: "demander : « Tu peux répéter, s'il te plaît ? »",
      faux: ["dire « Hein ? »", "dire « Répète ! »", "faire semblant d'avoir compris", "hausser les épaules"],
      cas: "quand on n'a pas compris un camarade",
      voisins: ["repeteAdulte", "bas"],
    },
    {
      id: "desaccord",
      s: "{Q} donne son avis. {P} n'est pas d'accord.",
      bon: "dire « Je ne suis pas d'accord, parce que… »",
      faux: ["dire « N'importe quoi ! »", "lever les yeux au ciel", "se moquer {deQ}", "parler en même temps {queQ}"],
      cas: "quand on n'est pas d'accord avec un camarade",
    },
    {
      id: "retard",
      s: "{P} arrive en retard. Le cours a déjà commencé.",
      bon: "s'excuser brièvement et s'asseoir sans bruit",
      faux: ["raconter longuement pourquoi", "entrer en claquant la porte", "saluer ses amis à voix haute", "interrompre le cours pour discuter"],
      cas: "quand on arrive en retard en classe",
    },
    {
      id: "biblio",
      s: "{P} discute avec {Q} à la bibliothèque.",
      bon: "parler à voix basse",
      faux: ["s'appeler d'une table à l'autre", "rire aux éclats", "parler aussi fort qu'en récréation", "chanter pour se détendre"],
      cas: "quand on discute dans une bibliothèque",
    },
  ],
};

// ── 6e_oral_ecouter : écouter activement, en sachant ce qu'on cherche ──
export const ECOUTER: Bloc = {
  ctx: SUJETS,
  tours: [
    "Que doit faire {P} ?",
    "Quelle est la bonne attitude pour {P} ?",
    "Que conseilles-tu à {P} ?",
    "Quel est le meilleur choix pour {P} ?",
  ],
  toursInv: [
    "Pour bien écouter, dans quel cas faut-il {bon} ?",
    "« {Bon} » : dans quelle situation d'écoute est-ce le bon réflexe ?",
  ],
  methode: "Bien écouter, c'est savoir AVANT ce qu'on cherche, puis rester attentif jusqu'au bout.",
  methodeInv: "Cherche la situation d'écoute où ce réflexe aide vraiment à comprendre.",
  sits: [
    {
      id: "questions",
      s: "{P} va écouter un documentaire sur {X}. Ensuite, {il} devra répondre à trois questions.",
      bon: "lire les questions avant d'écouter",
      faux: ["écouter sans savoir ce qu'on cherche", "répondre au hasard avant d'écouter", "regarder par la fenêtre pendant le documentaire", "lire les questions seulement à la fin"],
      cas: "avant d'écouter un document pour répondre à des questions",
    },
    {
      id: "notes",
      s: "{P} écoute un documentaire sur {X}. {Il} veut retenir les informations importantes.",
      bon: "noter quelques mots clés",
      faux: ["écrire chaque mot entendu", "bavarder pendant le documentaire", "dessiner autre chose", "fermer les yeux et rêver"],
      cas: "quand on veut retenir les informations d'un documentaire",
    },
    {
      id: "consigne",
      s: "La professeure donne une longue consigne. {P} a hâte de commencer.",
      bon: "écouter la consigne jusqu'au bout avant de commencer",
      faux: ["commencer avant la fin de la consigne", "bavarder pendant la consigne", "ranger sa trousse pendant la consigne", "copier sur son voisin ensuite"],
      cas: "quand on a hâte de commencer avant la fin d'une consigne",
      voisins: ["fin", "attendre"],
    },
    {
      id: "vacances",
      s: "{Q} raconte ses vacances à {P}.",
      bon: "regarder {Q} et lui poser une question à la fin",
      faux: ["regarder son téléphone", "couper la parole pour raconter les siennes", "penser à autre chose", "bâiller sans se cacher"],
      cas: "quand un camarade raconte ses vacances",
    },
    {
      id: "date",
      s: "{P} écoute une émission sur {X}. {Il} cherche une date précise.",
      bon: "guetter les nombres et les mots qui annoncent une date",
      faux: ["retenir surtout les noms de lieux", "écouter seulement la musique du générique", "noter toutes les phrases sans trier", "arrêter d'écouter au bout d'une minute"],
      cas: "quand on cherche une date précise dans une émission",
    },
    {
      id: "fin",
      s: "{P} n'a pas entendu la fin de la consigne.",
      bon: "demander poliment qu'on répète la fin",
      faux: ["deviner la fin au hasard", "copier sur son voisin", "ne rien faire", "faire un autre exercice"],
      cas: "quand on n'a pas entendu la fin d'une consigne",
      voisins: ["consigne"],
    },
    {
      id: "attendre",
      s: "{Q} explique un exercice à {P}. {P} pense déjà à sa propre réponse.",
      bon: "laisser finir l'explication avant de répondre",
      faux: ["couper la parole pour donner sa réponse", "regarder ailleurs", "faire semblant d'écouter", "parler en même temps"],
      cas: "quand un camarade explique et qu'on pense déjà à sa réponse",
      voisins: ["consigne"],
    },
    {
      id: "histoire",
      s: "La professeure lit une histoire. Ensuite, {P} devra la raconter à {Q}.",
      bon: "retenir les personnages et l'ordre des événements",
      faux: ["retenir seulement la dernière phrase", "compter les mots du texte", "dessiner pendant la lecture", "retenir seulement le titre"],
      cas: "quand on écoute une histoire qu'il faudra raconter",
    },
    {
      id: "questionExpose",
      s: "{P} écoute l'exposé {deQ} sur {X}. Une question lui vient.",
      bon: "la noter et la poser à la fin",
      faux: ["interrompre l'exposé tout de suite", "crier sa question", "l'oublier aussitôt", "la chuchoter à son voisin"],
      cas: "quand une question vient pendant l'exposé d'un camarade",
    },
    {
      id: "bruit",
      s: "{P} écoute une émission sur {X}. Son voisin fait du bruit avec sa règle.",
      bon: "lui demander poliment d'arrêter, puis se reconcentrer",
      faux: ["faire encore plus de bruit", "arrêter d'écouter", "lui arracher sa règle", "se plaindre à voix haute pendant l'émission"],
      cas: "quand un bruit gêne l'écoute",
    },
  ],
};

// ── Le message entendu (6e_oral_ecouter, 6e_oral_ecouter_defi) ──
// Chaque événement a SES objets (on n'apporte pas un maillot de bain au
// planétarium). ⚠️ Aucun objet ne doit en contenir un autre (« un crayon » dans
// « un carnet et un crayon ») : le correcteur repère les valeurs par leur texte.
export type Evenement = { nom: string; objets: readonly string[] };
export const EVENEMENTS: readonly Evenement[] = [
  { nom: "La sortie au musée", objets: ["un carnet et un crayon", "une gourde", "un pique-nique"] },
  { nom: "Le cross du collège", objets: ["des chaussures de sport", "une gourde", "une casquette"] },
  { nom: "La visite de la ferme", objets: ["des bottes", "un vêtement de pluie", "un pique-nique"] },
  { nom: "L'atelier de théâtre", objets: ["une tenue souple", "une bouteille d'eau", "un carnet et un crayon"] },
  { nom: "La répétition de la chorale", objets: ["la partition", "une bouteille d'eau", "une écharpe"] },
  { nom: "Le tournoi de basket", objets: ["des chaussures de sport", "une gourde", "un tee-shirt de rechange"] },
  { nom: "La séance à la piscine", objets: ["un maillot de bain", "une serviette", "un bonnet de bain"] },
  { nom: "La sortie en forêt", objets: ["des bottes", "un vêtement de pluie", "un pique-nique"] },
  { nom: "La visite de l'aquarium", objets: ["un carnet et un crayon", "un pique-nique", "une gourde"] },
  { nom: "La journée à la plage", objets: ["une casquette", "un maillot de bain", "de la crème solaire"] },
  { nom: "La sortie au planétarium", objets: ["un carnet et un crayon", "un pique-nique", "une gourde"] },
  { nom: "Le concours de cuisine", objets: ["un tablier", "une boîte hermétique", "un torchon"] },
];
export const JOURS: readonly string[] = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
export const HEURES: readonly string[] = ["8 h 30", "9 h", "10 h 15", "13 h 45", "14 h", "16 h 30", "7 h 45"];
export const LIEUX: readonly string[] = [
  "devant le gymnase",
  "dans la cour",
  "devant le portail",
  "à l'entrée du collège",
  "sur le parking des cars",
  "devant la cantine",
  "sous le préau",
  "près de la loge",
];
export const OBJETS: readonly string[] = [...new Set(EVENEMENTS.flatMap((e) => e.objets))];
export const ANNONCEURS: readonly string[] = [
  "La professeure principale",
  "Le professeur principal",
  "La CPE",
  "Le principal",
  "L'animatrice du club",
  "La principale adjointe",
];

// ── 6e_oral_reflexif : se servir de la parole pour réfléchir à voix haute ──
export const RECHERCHES: readonly string[] = [
  "la solution d'une énigme",
  "comment faire flotter une boule de pâte à modeler",
  "le chemin le plus court sur une carte",
  "pourquoi une plante de la classe a jauni",
  "comment partager trente billes entre quatre amis",
  "un titre pour une histoire",
  "la règle d'un jeu inventé",
  "comment construire un pont en papier solide",
  "pourquoi un glaçon fond plus vite au soleil",
  "l'ordre des images d'une bande dessinée",
  "comment ranger les livres de la bibliothèque",
  "le menu d'un pique-nique équilibré",
  "la fin d'un conte à inventer",
  "comment mesurer la hauteur de la cour",
  "pourquoi la Lune change de forme",
];

export const REFLEXIF: Bloc = {
  ctx: RECHERCHES,
  tours: [
    "Comment {P} peut-{il} réfléchir à voix haute ?",
    "Quelle est la bonne façon de réfléchir à voix haute pour {P} ?",
    "Que conseilles-tu à {P} ?",
    "Quel est le meilleur choix pour {P} ?",
  ],
  toursInv: [
    "Quand on cherche à plusieurs, dans quel cas est-il utile de {bon} ?",
    "« {Bon} » : dans quelle situation est-ce utile ?",
  ],
  methode: "Réfléchir à voix haute, c'est dire ce qu'on pense pendant qu'on cherche, pour que le groupe puisse suivre et aider.",
  methodeInv: "Demande-toi à quel moment de la recherche cette parole fait avancer le groupe.",
  sits: [
    {
      id: "hypothese",
      s: "{P} cherche avec son groupe {X}. {Il} a une idée, mais n'en est pas sûr{e}.",
      bon: "proposer son idée en disant « Peut-être que… »",
      faux: ["garder son idée pour soi", "affirmer son idée comme une certitude", "attendre que le professeur donne la réponse", "copier sur le groupe voisin"],
      cas: "quand on a une idée sans en être sûr",
      voisins: ["question"],
    },
    {
      id: "erreur",
      s: "{P} cherche avec son groupe {X}. {Il} s'aperçoit que sa dernière phrase était fausse.",
      bon: "se corriger à voix haute en disant « En fait… »",
      faux: ["faire comme si de rien n'était", "continuer pour ne pas perdre la face", "dire que c'est la faute d'un camarade", "se taire jusqu'à la fin"],
      cas: "quand on s'aperçoit qu'on s'est trompé",
    },
    {
      id: "comprend",
      s: "{P} cherche avec son groupe {X}. {Il} ne comprend pas une étape.",
      bon: "dire ce qui bloque : « Je ne comprends pas pourquoi… »",
      faux: ["hocher la tête pour faire semblant", "décrocher et dessiner", "dire que l'exercice est nul", "recopier la réponse sans comprendre"],
      cas: "quand on ne comprend pas une étape",
    },
    {
      id: "etapes",
      s: "{P} a trouvé {X}. {Il} explique à son groupe comment.",
      bon: "dire les étapes dans l'ordre : « D'abord…, puis… »",
      faux: ["donner seulement le résultat", "tout dire en désordre", "montrer sa feuille sans rien dire", "parler très vite pour finir"],
      cas: "quand on explique comment on a trouvé",
    },
    {
      id: "deux",
      s: "{P} cherche avec son groupe {X}. Deux idées s'opposent.",
      bon: "comparer les deux idées à voix haute : « Si…, alors… »",
      faux: ["choisir l'idée de celui qui parle le plus fort", "tirer au sort sans réfléchir", "abandonner la recherche", "garder les deux idées sans rien dire"],
      cas: "quand deux idées s'opposent dans le groupe",
    },
    {
      id: "exemple",
      s: "{P} cherche avec son groupe {X}. {Il} veut rendre une idée plus claire.",
      bon: "donner un exemple : « Par exemple… »",
      faux: ["répéter la même phrase plus fort", "dire que c'est évident", "changer de sujet", "écrire l'idée sans la dire"],
      cas: "quand on veut rendre une idée plus claire",
    },
    {
      id: "conclure",
      s: "{P} et son groupe ont fini de chercher {X}.",
      bon: "conclure en disant « Donc… »",
      faux: ["recommencer depuis le début", "parler d'autre chose", "ranger ses affaires sans rien dire", "dire « On verra bien »"],
      cas: "quand le groupe a fini de chercher",
    },
    {
      id: "question",
      s: "{P} cherche avec son groupe {X}. Une question lui vient à l'esprit.",
      bon: "la poser à voix haute : « Je me demande si… »",
      faux: ["la garder pour soi", "répondre au hasard", "la crier à un autre groupe", "l'oublier pour gagner du temps"],
      cas: "quand une question surgit pendant la recherche",
      voisins: ["hypothese"],
    },
    {
      id: "redire",
      s: "{P} cherche avec son groupe {X}. Le groupe ne sait plus où en est la recherche.",
      bon: "redire ce qu'on a déjà trouvé : « Pour l'instant, on sait que… »",
      faux: ["tout effacer et recommencer", "accuser le groupe de traîner", "proposer une idée au hasard", "attendre la sonnerie"],
      cas: "quand le groupe ne sait plus où il en est",
    },
    {
      id: "objection",
      s: "{P} cherche avec son groupe {X}. {Il} voit un problème dans l'idée d'un camarade.",
      bon: "expliquer le problème : « Oui, mais si on fait ça… »",
      faux: ["dire « C'est nul » sans expliquer", "se moquer du camarade", "laisser faire sans rien dire", "changer d'idée sans raison"],
      cas: "quand on voit un problème dans l'idée d'un camarade",
    },
  ],
};

// ── 6e_oral_jouer : lire ou jouer un texte devant un public ──
export const TEXTES_LUS: readonly string[] = [
  "un conte",
  "une fable",
  "un poème",
  "un extrait de roman",
  "une scène de théâtre",
  "un album",
  "une légende",
  "un récit d'aventure",
];

export const JOUER: Bloc = {
  ctx: TEXTES_LUS,
  tours: [
    "Que doit faire {P} ?",
    "Quelle est la bonne attitude pour {P} ?",
    "Que conseilles-tu à {P} ?",
    "Quel est le meilleur choix pour {P} ?",
  ],
  toursInv: [
    "Quand on lit devant un public, dans quel cas faut-il {bon} ?",
    "« {Bon} » : dans quelle situation est-ce le bon conseil ?",
  ],
  methode: "Pense au public : il doit entendre, comprendre et ressentir le texte.",
  methodeInv: "Cherche la situation où ce conseil aide vraiment le public.",
  sits: [
    {
      id: "entrainer",
      s: "{P} lira {X} devant la classe demain.",
      bon: "le lire plusieurs fois à voix haute pour s'entraîner",
      faux: ["le découvrir au moment de passer", "le lire une seule fois dans sa tête", "changer de texte sans prévenir", "attendre le dernier moment pour l'ouvrir"],
      cas: "la veille d'une lecture devant la classe",
    },
    {
      id: "petits",
      s: "{P} lit {X} à des élèves de CP.",
      bon: "lire lentement et montrer les images",
      faux: ["lire très vite pour finir", "lire sans jamais lever les yeux", "sauter les passages difficiles", "lire tout bas pour ne pas déranger"],
      cas: "quand on lit une histoire à de jeunes enfants",
      voisins: ["virgule"],
    },
    {
      id: "oubli",
      s: "{P} joue une scène avec {Q}. {Q} oublie sa réplique.",
      bon: "rester dans son personnage et attendre calmement",
      faux: ["éclater de rire", "sortir de scène", "annoncer au public l'oubli {deQ}", "passer à la scène suivante"],
      cas: "quand un partenaire oublie sa réplique",
    },
    {
      id: "rires",
      s: "{P} joue une scène drôle. Le public éclate de rire.",
      bon: "attendre la fin des rires pour continuer",
      faux: ["rire aussi et arrêter de jouer", "parler par-dessus les rires", "quitter la scène", "demander au public de se taire"],
      cas: "quand le public éclate de rire",
    },
    {
      id: "voix",
      s: "{P} lit à voix haute un dialogue entre deux personnages.",
      bon: "changer de voix pour chaque personnage",
      faux: ["garder la même voix du début à la fin", "lire les répliques d'un seul personnage", "tout lire sans aucune pause", "lire en tournant le dos au public"],
      cas: "quand deux personnages dialoguent dans le texte",
    },
    {
      id: "motDur",
      s: "{P} lit {X} devant la classe. {Il} bute sur un mot difficile.",
      bon: "s'arrêter, déchiffrer le mot calmement, puis reprendre",
      faux: ["inventer un autre mot", "sauter la ligne entière", "arrêter la lecture", "rire et abandonner"],
      cas: "quand on bute sur un mot difficile",
    },
    {
      id: "virgule",
      s: "{P} lit {X} devant la classe. Une phrase contient plusieurs virgules.",
      bon: "marquer une petite pause à chaque virgule",
      faux: ["accélérer à chaque virgule", "ignorer les virgules", "s'arrêter de lire à la première virgule", "lire la phrase deux fois"],
      cas: "quand une phrase contient des virgules",
      voisins: ["petits"],
    },
    {
      id: "question",
      s: "{P} lit {X} devant la classe. Une phrase se termine par un point d'interrogation.",
      bon: "faire monter la voix à la fin de la phrase",
      faux: ["baisser la voix à la fin de la phrase", "lire la phrase sans changer de ton", "sauter cette phrase", "chuchoter toute la phrase"],
      cas: "quand une phrase est une question",
    },
    {
      id: "public",
      s: "{P} lit {X} dans une grande salle. Le public est loin.",
      bon: "porter sa voix jusqu'au fond de la salle",
      faux: ["lire comme pour un seul voisin", "lire en regardant ses pieds", "lire de plus en plus vite", "lire en tournant le dos au public"],
      cas: "quand on lit dans une grande salle",
    },
    {
      id: "trac",
      s: "{P} va lire {X} devant la classe. {Il} a les mains qui tremblent.",
      bon: "respirer calmement et poser le texte devant soi",
      faux: ["lire très vite pour en finir", "refuser de lire", "cacher son visage derrière la feuille", "rire nerveusement à chaque phrase"],
      cas: "quand on a le trac avant de lire",
    },
  ],
};

// ── 6e_oral_regard_critique : porter un regard critique sur l'oral produit ──
export const CRITIQUE: Bloc = {
  ctx: SUJETS,
  tours: [
    "Quel conseil répond à ce défaut ?",
    "Quel conseil donner à {P} pour la prochaine fois ?",
    "Que doit changer {P} en priorité ?",
    "Quel conseil corrige ce problème ?",
  ],
  toursInv: [
    "« {Bon} » : à quel défaut répond ce conseil ?",
    "On conseille à un élève {deBon}. Quel défaut avait-on remarqué ?",
  ],
  methode: "Repère d'abord le défaut décrit, puis cherche le conseil qui le corrige, lui et pas un autre.",
  methodeInv: "Demande-toi quel problème ce conseil fait disparaître.",
  sits: [
    {
      id: "vite",
      s: "{P} a présenté un exposé sur {X}. {Il} a parlé si vite qu'on n'a pas tout compris.",
      bon: "ralentir et marquer des pauses",
      faux: ["parler plus fort", "ajouter des informations", "changer de sujet d'exposé", "apporter plus d'images"],
      cas: "on n'a pas tout compris, tant c'était rapide",
      voisins: ["euh", "long"],
    },
    {
      id: "bas",
      s: "{P} a présenté un exposé sur {X}. Le fond de la classe n'a rien entendu.",
      bon: "parler plus fort",
      faux: ["parler plus vite", "ajouter une conclusion", "expliquer les mots difficiles", "raccourcir l'introduction"],
      cas: "le fond de la classe n'a rien entendu",
      voisins: ["yeux"],
    },
    {
      id: "yeux",
      s: "{P} a présenté un exposé sur {X}. {Il} a gardé les yeux sur sa feuille du début à la fin.",
      bon: "regarder la classe en parlant",
      faux: ["parler plus vite", "ajouter des mots difficiles", "écrire des phrases plus longues", "changer de sujet d'exposé"],
      cas: "l'élève n'a jamais levé les yeux de sa feuille",
      voisins: ["bas", "affiche"],
    },
    {
      id: "euh",
      s: "{P} a présenté un exposé sur {X}. {Il} a dit « euh » à chaque phrase.",
      bon: "remplacer les « euh » par de courts silences",
      faux: ["parler plus fort", "ajouter des images", "apprendre des dates", "lire un texte plus long"],
      cas: "l'élève disait « euh » à chaque phrase",
      voisins: ["vite"],
    },
    {
      id: "desordre",
      s: "{P} a présenté un exposé sur {X}. {Il} sautait d'une idée à l'autre, sans ordre.",
      bon: "suivre un plan annoncé au début",
      faux: ["parler plus fort", "regarder davantage par la fenêtre", "dire plus souvent « euh »", "parler plus vite"],
      cas: "les idées venaient dans le désordre",
      voisins: ["conclusion"],
    },
    {
      id: "mots",
      s: "{P} a présenté un exposé sur {X}. Personne n'a compris les mots savants qu'{il} employait.",
      bon: "expliquer les mots difficiles",
      faux: ["parler plus fort", "employer encore plus de mots savants", "parler plus vite", "supprimer les images"],
      cas: "la classe ne comprenait pas les mots savants",
    },
    {
      id: "monotone",
      s: "{P} a lu un poème devant la classe. {Il} a tout lu sur le même ton, sans aucune émotion.",
      bon: "varier le ton selon le sens du texte",
      faux: ["lire plus vite", "choisir un poème plus long", "lire sans lever les yeux", "lire tout bas"],
      cas: "la lecture était monotone, sans émotion",
    },
    {
      id: "affiche",
      s: "{P} a présenté un exposé sur {X}. {Il} tournait le dos à la classe pour montrer son affiche.",
      bon: "se placer à côté de l'affiche, face à la classe",
      faux: ["parler plus vite", "enlever les titres de l'affiche", "lire ses notes mot à mot", "parler plus bas"],
      cas: "l'élève tournait le dos à la classe pour montrer l'affiche",
      voisins: ["yeux"],
    },
    {
      id: "long",
      s: "{P} avait cinq minutes pour un exposé sur {X}. {Il} a parlé pendant un quart d'heure.",
      bon: "aller à l'essentiel pour respecter le temps",
      faux: ["ajouter une partie", "parler plus fort", "raconter plus d'anecdotes", "lire ses notes mot à mot"],
      cas: "l'exposé a duré trois fois trop longtemps",
      voisins: ["vite", "conclusion"],
    },
    {
      id: "gigote",
      s: "{P} a présenté un exposé sur {X}. {Il} se balançait et jouait avec son stylo.",
      bon: "se tenir droit, sans gigoter",
      faux: ["parler plus vite", "ajouter des informations", "garder le stylo dans la bouche", "s'asseoir sur la table"],
      cas: "l'élève se balançait et jouait avec son stylo",
    },
    {
      id: "conclusion",
      s: "{P} a présenté un exposé sur {X}. {Il} s'est arrêté{e} d'un coup, sans conclure.",
      bon: "terminer par une phrase qui résume l'exposé",
      faux: ["parler plus fort", "ajouter une introduction plus longue", "dire « euh » avant de finir", "partir sans rien dire"],
      cas: "l'exposé s'est arrêté d'un coup, sans conclusion",
      voisins: ["desordre", "long"],
    },
    {
      id: "avis",
      s: "{P} va donner son avis sur l'exposé {deQ}.",
      pasDInverse: true,
      tours: ["Que doit faire {P} ?", "Quelle est la bonne attitude pour {P} ?", "Que conseilles-tu à {P} ?"],
      bon: "dire un point réussi, puis un conseil précis",
      faux: ["dire seulement « C'était nul »", "dire seulement « C'était bien »", "critiquer les vêtements {deQ}", "se moquer de la voix {deQ}"],
      cas: "on donne son avis sur l'exposé d'un camarade",
    },
    {
      id: "recoit",
      s: "{P} reçoit une remarque sur son exposé : {il} parlait trop vite.",
      pasDInverse: true,
      tours: ["Que doit faire {P} ?", "Quelle est la bonne attitude pour {P} ?", "Que conseilles-tu à {P} ?"],
      bon: "écouter la remarque et en tenir compte la prochaine fois",
      faux: ["se vexer et bouder", "répondre que la remarque est bête", "faire semblant de ne pas entendre", "parler encore plus vite"],
      cas: "on reçoit une remarque sur son propre exposé",
    },
  ],
};

// ── 6e_oral_reformuler : la consigne entendue, redite avec ses mots ──
// imp = à l'impératif (« vous »), inf = à l'infinitif ; c = le complément
// tel que le dit le professeur, r = tel qu'on le redit ; alt = un détail
// voisin, FAUX, qu'un élève distrait pourrait retenir.
export type Action = { imp: string; inf: string; c: string; r: string; alt: string };
export const ACTIONS: readonly Action[] = [
  { imp: "Ouvrez", inf: "ouvrir", c: "votre cahier de sciences", r: "le cahier de sciences", alt: "le cahier de français" },
  { imp: "Lisez", inf: "lire", c: "le texte de la page 12", r: "le texte de la page 12", alt: "le texte de la page 21" },
  { imp: "Soulignez", inf: "souligner", c: "les verbes en rouge", r: "les verbes en rouge", alt: "les verbes en bleu" },
  { imp: "Recopiez", inf: "recopier", c: "la phrase écrite au tableau", r: "la phrase écrite au tableau", alt: "la phrase du livre" },
  { imp: "Entourez", inf: "entourer", c: "les noms propres en vert", r: "les noms propres en vert", alt: "les noms communs en vert" },
  { imp: "Dessinez", inf: "dessiner", c: "une carte du trajet", r: "une carte du trajet", alt: "un portrait du héros" },
  { imp: "Écrivez", inf: "écrire", c: "votre prénom en haut de la feuille", r: "son prénom en haut de la feuille", alt: "son prénom en bas de la feuille" },
  { imp: "Collez", inf: "coller", c: "la photocopie dans votre cahier", r: "la photocopie dans le cahier", alt: "la photocopie dans le classeur" },
  { imp: "Prenez", inf: "prendre", c: "une feuille double", r: "une feuille double", alt: "une feuille simple" },
  { imp: "Relisez", inf: "relire", c: "votre rédaction", r: "sa rédaction", alt: "la rédaction du voisin" },
  { imp: "Comptez", inf: "compter", c: "les syllabes du premier vers", r: "les syllabes du premier vers", alt: "les syllabes du dernier vers" },
  { imp: "Complétez", inf: "compléter", c: "le tableau de la page 30", r: "le tableau de la page 30", alt: "le tableau de la page 13" },
  { imp: "Cherchez", inf: "chercher", c: "le mot lucarne dans le dictionnaire", r: "le mot lucarne dans le dictionnaire", alt: "le mot lucarne dans le manuel" },
  { imp: "Rangez", inf: "ranger", c: "vos feutres dans la boîte", r: "ses feutres dans la boîte", alt: "ses feutres dans le cartable" },
];
export const DONNEURS: readonly string[] = [
  "La professeure dit",
  "Le professeur dit",
  "La maîtresse de stage dit",
  "Le documentaliste dit",
  "L'assistante d'anglais dit",
];

// ── 6e_oral_genres_discours : reconnaître le genre de ce qu'on écoute ──
// Chaque genre : son nom (la réponse), ses gabarits d'extrait, et l'INDICE qui
// le signe (le correcteur vérifie qu'un extrait porte l'indice d'UN seul genre).
export type Genre = { nom: string; gabarits: readonly string[]; indice: RegExp };
export const PERSOS_CONTE: readonly string[] = [
  "un pauvre meunier", "une reine très bavarde", "un ogre gourmand", "une petite fille courageuse",
  "un dragon timide", "un roi avare", "une sorcière distraite", "un tailleur malin",
];
export const LIEUX_CONTE: readonly string[] = [
  "au fond d'une forêt", "dans un château de glace", "au bord de la mer", "sur une haute montagne", "dans un village sans nom",
];
export const INGREDIENTS: readonly string[] = ["la farine", "le beurre", "les œufs", "le sucre", "le lait", "le chocolat fondu", "les pommes"];
export const DUREES: readonly string[] = ["dix minutes", "un quart d'heure", "vingt minutes", "une demi-heure"];
export const CIELS: readonly string[] = ["du soleil", "des averses", "des nuages", "des orages", "du vent"];
export const REGIONS: readonly string[] = ["le nord", "les côtes bretonnes", "les Alpes", "le sud-ouest", "l'île de La Réunion", "la Corse"];
export const DEGRES: readonly string[] = ["14", "17", "20", "23", "26"];
export const PRODUITS: readonly string[] = ["le yaourt Fruitissimo", "la trottinette Éclair", "le jus Vitamax", "les baskets Rebond", "le cartable Supersac"];
export const SLOGANS: readonly string[] = ["le goût de l'été", "plus rapide que le vent", "l'énergie du matin", "pour sauter toujours plus haut", "léger comme une plume"];
export const VILLES: readonly string[] = ["Lyon", "Bordeaux", "Marseille", "Lille", "Nantes", "Strasbourg", "Toulouse"];
export const ITW: readonly [string, string][] = [
  ["Depuis quand faites-vous du judo", "Depuis l'âge de six ans"],
  ["Pourquoi aimez-vous la musique", "Parce que la musique me fait voyager"],
  ["Comment avez-vous gagné ce concours", "En m'entraînant tous les jours"],
  ["Quel est votre livre préféré", "Un roman d'aventure sur les pirates"],
  ["Où avez-vous appris à nager", "Dans la piscine de mon quartier"],
];
export const AVIS_DEBAT: readonly string[] = [
  "les devoirs sont utiles",
  "la récréation est trop courte",
  "le collège devrait commencer plus tard",
  "les zoos protègent les animaux",
  "un animal en classe est une bonne idée",
];
export const GENRES: readonly Genre[] = [
  { nom: "un conte", gabarits: ["Il était une fois {perso} qui vivait {lieuConte}."], indice: /^Il était une fois /i },
  { nom: "une recette", gabarits: ["Mélangez {ingr} et {ingr2}, puis faites cuire {duree}."], indice: /^Mélangez .*faites cuire/ },
  { nom: "un bulletin météo", gabarits: ["Demain, {ciel} sur {region}, avec {degres} degrés."], indice: /^Demain, .* degrés\.$/ },
  { nom: "un débat", gabarits: ["Je ne suis pas d'accord avec {Q} : je pense {queAvis}, et voici pourquoi."], indice: /^Je ne suis pas d'accord avec / },
  { nom: "une interview", gabarits: ["Journaliste : {itwQ} ? {Q} : {itwR}."], indice: /^Journaliste : / },
  { nom: "une publicité", gabarits: ["Nouveau ! {Produit}, {slogan}. Courez vite l'essayer !"], indice: /^Nouveau ! .*Courez vite/ },
  { nom: "un commentaire sportif", gabarits: ["{Q} récupère le ballon, dribble un défenseur, tire… et c'est le but !"], indice: /et c'est le but !$/ },
  { nom: "une annonce en gare", gabarits: ["Le train à destination {deVille} partira voie {voie}. Attention à la fermeture des portes."], indice: /^Le train à destination .* partira voie / },
  { nom: "un exposé", gabarits: ["Aujourd'hui, je vais vous présenter {sujet}. D'abord, je vous dirai pourquoi j'ai choisi ce sujet."], indice: /^Aujourd'hui, je vais vous présenter / },
];

// ── 6e_oral_ressenti : exprimer son ressenti à l'écoute d'un texte ──
export type Emotion = "triste" | "drole" | "peur" | "joie";
export const PASSAGES: readonly { txt: string; e: Emotion }[] = [
  { txt: "le petit chien attend son maître, qui ne revient pas", e: "triste" },
  { txt: "la vieille dame perd la dernière lettre de son fils", e: "triste" },
  { txt: "l'oiseau blessé ne peut plus voler", e: "triste" },
  { txt: "le vieux cheval quitte la ferme pour toujours", e: "triste" },
  { txt: "le chat tombe dans la bassine de crème", e: "drole" },
  { txt: "le géant se cogne contre une porte trop petite", e: "drole" },
  { txt: "le cuisinier glisse sur une peau de banane", e: "drole" },
  { txt: "le perroquet répète les bêtises du roi devant la cour", e: "drole" },
  { txt: "le loup s'approche de la cabane dans la nuit", e: "peur" },
  { txt: "des pas résonnent dans le grenier vide", e: "peur" },
  { txt: "une ombre passe derrière le rideau", e: "peur" },
  { txt: "la barque dérive vers la cascade", e: "peur" },
  { txt: "l'enfant perdu retrouve enfin sa famille", e: "joie" },
  { txt: "les deux amis se retrouvent après dix ans", e: "joie" },
  { txt: "l'équipe du village gagne enfin la finale", e: "joie" },
  { txt: "la petite tortue atteint enfin la mer", e: "joie" },
];
export const SENTIMENTS: Record<Emotion, readonly string[]> = {
  triste: ["J'ai eu de la peine", "Ce passage m'a serré le cœur"],
  drole: ["J'ai éclaté de rire", "Ce passage m'a fait rire"],
  peur: ["J'ai eu peur", "Ce passage m'a fait frissonner"],
  joie: ["Ce passage m'a fait chaud au cœur", "J'ai eu envie de sauter de joie"],
};
/** Justifications SANS RAPPORT avec le texte écouté. */
export const HORS_TEXTE: readonly string[] = [
  "Je préfère le mercredi, parce qu'on n'a pas cours l'après-midi.",
  "Ma couleur préférée est le vert, parce que c'est une couleur gaie.",
  "J'aime le football, parce qu'on joue en équipe.",
  "Le lecteur portait un pull vert.",
];
export const TEXTES_ECOUTES: readonly string[] = [
  "un conte lu par la professeure",
  "une histoire enregistrée",
  "un extrait de roman lu en classe",
  "une fable racontée par un camarade",
  "un livre audio",
];

// ── 6e_oral_jouer : le ton qu'indique la didascalie ──
export const TONS: readonly { did: string; ton: string }[] = [
  { did: "en chuchotant", ton: "tout bas, presque dans un souffle" },
  { did: "avec colère", ton: "fort, d'un ton sec" },
  { did: "tristement", ton: "d'une voix triste, presque brisée" },
  { did: "joyeusement", ton: "d'une voix gaie, pleine d'entrain" },
  { did: "avec peur", ton: "d'une voix tremblante" },
  { did: "en hésitant", ton: "en marquant des hésitations" },
  { did: "fièrement", ton: "d'un ton fier, la tête haute" },
  { did: "avec étonnement", ton: "d'un ton surpris" },
  { did: "d'un air moqueur", ton: "d'un ton moqueur" },
  { did: "en bâillant", ton: "d'une voix endormie, en traînant" },
];
export const REPLIQUES: readonly string[] = [
  "Le train part dans cinq minutes.",
  "La porte du jardin est ouverte.",
  "Nous partons demain matin.",
  "Le gâteau est sorti du four.",
  "La clé était sous le paillasson.",
  "Le roi arrive au château.",
  "Le spectacle commence bientôt.",
  "La lettre est enfin arrivée.",
  "Le chat a encore disparu.",
  "La tempête approche du port.",
  "Le trésor est dans cette malle.",
  "La cloche vient de sonner.",
];

// ── 6e_oral_dire_defi : expliquer une démarche, dans l'ordre, sans notes ──
export const DEMARCHES: readonly { nom: string; etapes: readonly [string, string, string] }[] = [
  { nom: "faire germer une graine de haricot", etapes: ["on pose du coton humide au fond d'un pot", "on place la graine sur le coton", "on arrose un peu chaque jour"] },
  { nom: "préparer une pâte à crêpes", etapes: ["on verse la farine dans un saladier", "on ajoute les œufs et on mélange", "on verse le lait petit à petit"] },
  { nom: "fabriquer un moulin à vent en papier", etapes: ["on découpe un carré de papier", "on plie les quatre coins vers le centre", "on fixe le centre sur un bâton avec une attache"] },
  { nom: "chercher un mot dans le dictionnaire", etapes: ["on repère la première lettre du mot", "on cherche la page qui commence par les bonnes lettres", "on lit la définition"] },
  { nom: "planter un arbre", etapes: ["on creuse un trou assez profond", "on place l'arbre dans le trou", "on rebouche le trou et on arrose"] },
  { nom: "préparer son sac pour le lendemain", etapes: ["on regarde l'emploi du temps", "on choisit les cahiers et les livres du jour", "on range le tout dans le sac"] },
  { nom: "réparer une chambre à air de vélo", etapes: ["on trouve le trou en plongeant la chambre à air dans l'eau", "on sèche et on ponce autour du trou", "on colle une rustine sur le trou"] },
  { nom: "faire une expérience sur l'évaporation", etapes: ["on verse la même quantité d'eau dans deux verres", "on pose un verre au soleil et l'autre à l'ombre", "on compare les niveaux le lendemain"] },
  { nom: "fabriquer un instrument avec des élastiques", etapes: ["on prend une boîte vide sans couvercle", "on tend des élastiques autour de la boîte", "on pince les élastiques pour produire des sons"] },
  { nom: "faire un nœud de chaise", etapes: ["on fait une petite boucle dans la corde", "on passe le bout dans la boucle, puis autour de la corde", "on repasse le bout dans la boucle et on serre"] },
  { nom: "préparer une salade de fruits", etapes: ["on lave les fruits", "on les épluche et on les coupe en morceaux", "on les mélange dans un saladier"] },
  { nom: "construire une cabane en carton", etapes: ["on choisit un grand carton solide", "on découpe une porte et une fenêtre", "on décore les murs avec de la peinture"] },
];
export const CONNECTEURS = ["D'abord", "Ensuite", "Enfin"] as const;

// ── Les débats (6e_oral_argumenter, 6e_oral_interagir, 6e_oral_echanger_defi) ──
// pour / contre : l'avis, puis DEUX arguments qui le soutiennent. Les
// arguments ont un SUJET explicite (jamais « il » ni « ils » : un pronom aurait
// deux antécédents possibles dans la bouche d'un camarade).
export type Debat = {
  q: string;
  pour: { avis: string; args: readonly [string, string] };
  contre: { avis: string; args: readonly [string, string] };
};
export const DEBATS: readonly Debat[] = [
  {
    q: "Faut-il des devoirs à la maison ?",
    pour: { avis: "les devoirs à la maison sont utiles", args: ["les devoirs aident à retenir la leçon", "les devoirs apprennent à travailler en autonomie"] },
    contre: { avis: "les devoirs à la maison sont inutiles", args: ["les enfants ont besoin de temps pour se reposer", "tout le monde n'a pas quelqu'un pour aider à la maison"] },
  },
  {
    q: "Faut-il un uniforme au collège ?",
    pour: { avis: "l'uniforme est une bonne idée", args: ["tout le monde serait habillé pareil", "on perdrait moins de temps le matin"] },
    contre: { avis: "l'uniforme est une mauvaise idée", args: ["chacun doit pouvoir choisir ses vêtements", "un uniforme coûte cher aux familles"] },
  },
  {
    q: "Faut-il autoriser le téléphone au collège ?",
    pour: { avis: "le téléphone devrait être autorisé au collège", args: ["le téléphone permet de prévenir ses parents", "le téléphone peut servir à faire des recherches"] },
    contre: { avis: "le téléphone ne devrait pas être autorisé au collège", args: ["le téléphone empêche de se concentrer", "les élèves se parlent moins pendant la récréation"] },
  },
  {
    q: "Faut-il un animal dans la classe ?",
    pour: { avis: "un animal dans la classe est une bonne idée", args: ["les élèves apprennent à s'occuper d'un être vivant", "un animal calme souvent la classe"] },
    contre: { avis: "un animal dans la classe est une mauvaise idée", args: ["certains élèves sont allergiques", "personne ne s'occupe de l'animal pendant les vacances"] },
  },
  {
    q: "Faut-il une récréation plus longue ?",
    pour: { avis: "la récréation devrait durer plus longtemps", args: ["on se concentre mieux après avoir bougé", "on a plus de temps pour jouer ensemble"] },
    contre: { avis: "la récréation ne devrait pas durer plus longtemps", args: ["les cours finiraient plus tard le soir", "on aurait moins de temps pour apprendre"] },
  },
  {
    q: "Les jeux vidéo sont-ils une perte de temps ?",
    pour: { avis: "les jeux vidéo sont une perte de temps", args: ["on reste trop longtemps devant un écran", "on bouge beaucoup moins"] },
    contre: { avis: "les jeux vidéo ne sont pas une perte de temps", args: ["certains jeux font travailler la logique", "on peut jouer avec ses amis"] },
  },
  {
    q: "Vaut-il mieux lire le livre ou voir le film ?",
    pour: { avis: "lire le livre est plus intéressant", args: ["un livre laisse imaginer les personnages", "chacun lit à son rythme"] },
    contre: { avis: "voir le film est plus intéressant", args: ["un film montre de belles images", "on peut regarder un film en famille"] },
  },
  {
    q: "Les zoos sont-ils une bonne chose ?",
    pour: { avis: "les zoos sont une bonne chose", args: ["les zoos protègent des espèces menacées", "les zoos font découvrir des animaux lointains"] },
    contre: { avis: "les zoos ne sont pas une bonne chose", args: ["les animaux vivent enfermés dans les zoos", "les animaux sont loin de leur milieu naturel"] },
  },
  {
    q: "Faut-il commencer les cours plus tard le matin ?",
    pour: { avis: "les cours devraient commencer plus tard", args: ["les élèves seraient moins fatigués", "on aurait le temps de bien déjeuner"] },
    contre: { avis: "les cours ne devraient pas commencer plus tard", args: ["les journées finiraient trop tard", "beaucoup de parents partent tôt au travail"] },
  },
  {
    q: "Faut-il un repas végétarien par semaine à la cantine ?",
    pour: { avis: "un repas végétarien par semaine est une bonne idée", args: ["manger moins de viande est bon pour la planète", "on découvre de nouveaux plats"] },
    contre: { avis: "un repas végétarien par semaine est une mauvaise idée", args: ["beaucoup d'élèves risquent de ne rien manger", "certains élèves tiennent à leurs plats habituels"] },
  },
];
/** Réponses qui ne tiennent compte de rien : attaques, refus, hors sujet. */
export const ATTAQUES: readonly string[] = [
  "Tu dis n'importe quoi, comme d'habitude.",
  "De toute façon, personne ne t'écoute.",
  "C'est nul, je ne réponds même pas.",
  "Tu as tort, c'est tout.",
];
