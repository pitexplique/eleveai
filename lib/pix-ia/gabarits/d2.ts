// Gabarits du domaine 2 — Usages et applications de l'IA. Paliers novice /
// indépendant.
//
// Un gabarit par savoir-faire, chacun avec son réservoir de cas. Voir socle.ts
// pour la règle et les trois helpers.
//
// Le domaine 2 est celui des gestes : écrire une requête, juger une réponse,
// repérer une source, régler ses recommandations. Les réservoirs y tirent donc
// surtout des SITUATIONS — c'est en situation qu'un geste se juge, pas en
// définition.

import { classer, corriger, situation, type PixGabarit } from "./socle";

/* Les familles de tâches du référentiel, propositions fixes du classement. */
const FAMILLES_TACHES = [
  "de la reconnaissance (image, son, texte)",
  "de la prédiction (estimer une valeur à venir)",
  "de la recommandation (proposer un contenu)",
  "de la génération (produire un contenu nouveau)",
];

export const d2Gabarits: PixGabarit[] = [
  // ── 2.1.1 Repérer l'IA dans les outils du quotidien ──────────────────────
  classer({
    id: "g_2_1_1_quotidien",
    microskillId: "2.1.1",
    consigne: "Dans cet usage de tous les jours, où est l'IA ?",
    familles: [
      "il y a de l'IA : le résultat a été appris sur des exemples",
      "pas d'IA : l'appareil applique une règle écrite d'avance",
      "pas d'IA : c'est une mesure affichée telle quelle",
      "pas d'IA : c'est une personne qui décide derrière",
    ],
    pool: [
      {
        cas: "Ton téléphone se déverrouille en reconnaissant ton visage.",
        famille: "il y a de l'IA : le résultat a été appris sur des exemples",
        pourquoi: "Reconnaître un visage dans une image demande un modèle entraîné.",
      },
      {
        cas: "Ton téléphone se déverrouille quand tu tapes le bon code à six chiffres.",
        famille: "pas d'IA : l'appareil applique une règle écrite d'avance",
        pourquoi: "« Code identique, alors j'ouvre » est une comparaison, pas un apprentissage.",
      },
      {
        cas: "Ton clavier propose le mot suivant pendant que tu écris.",
        famille: "il y a de l'IA : le résultat a été appris sur des exemples",
        pourquoi: "La suggestion vient d'un modèle de langage entraîné sur de grandes quantités de texte.",
      },
      {
        cas: "Ta montre affiche le nombre de pas comptés dans la journée.",
        famille: "pas d'IA : c'est une mesure affichée telle quelle",
        pourquoi: "Le capteur compte, l'écran affiche. Rien n'est appris ni décidé.",
      },
      {
        cas: "Une application traduit une pancarte que tu photographies dans la rue.",
        famille: "il y a de l'IA : le résultat a été appris sur des exemples",
        pourquoi: "Lire le texte sur l'image et le traduire mobilise deux modèles entraînés.",
      },
      {
        cas: "Le service client d'un site te répond au bout de dix minutes, avec ton prénom.",
        famille: "pas d'IA : c'est une personne qui décide derrière",
        pourquoi: "Un délai et une réponse personnalisée ne disent rien : ici, quelqu'un a lu et répondu.",
      },
      {
        cas: "Ton application photo range automatiquement les portraits dans un album.",
        famille: "il y a de l'IA : le résultat a été appris sur des exemples",
        pourquoi: "Détecter un visage sur une photo est une reconnaissance apprise.",
      },
      {
        cas: "Ton réveil sonne à l'heure que tu as réglée hier soir.",
        famille: "pas d'IA : l'appareil applique une règle écrite d'avance",
        pourquoi: "Une heure atteinte déclenche une sonnerie : c'est un automatisme.",
      },
    ],
  }),

  // ── 2.1.2 Finalité d'une reconnaissance image/son ────────────────────────
  situation({
    id: "g_2_1_2_finalite",
    microskillId: "2.1.2",
    consigne: "À quoi sert la reconnaissance, ici ?",
    pool: [
      {
        cas: "Un logiciel médical analyse une radiographie du thorax.",
        bonne: "à signaler au médecin les zones qui méritent son attention",
        pieges: [
          "à poser le diagnostic à la place du médecin, plus rapidement que lui",
          "à améliorer la netteté de l'image pour qu'elle soit plus lisible",
          "à classer la radiographie dans le dossier du bon patient",
        ],
        pourquoi:
          "Ces outils aident à repérer, ils ne décident pas : le diagnostic et la responsabilité restent au médecin.",
      },
      {
        cas: "Une application écoute un extrait et te dit quel morceau tu entends.",
        bonne: "à identifier un enregistrement parmi une base de morceaux connus",
        pieges: [
          "à transcrire les paroles du morceau que tu es en train d'entendre",
          "à améliorer la qualité sonore de l'extrait que tu as enregistré",
          "à créer un morceau nouveau dans le style de celui que tu entends",
        ],
        pourquoi: "Identifier, transcrire et générer sont trois tâches différentes.",
      },
      {
        cas: "Une caméra de télépéage lit les plaques d'immatriculation des véhicules.",
        bonne: "à convertir l'image de la plaque en une suite de caractères",
        pieges: [
          "à reconnaître le conducteur assis derrière le pare-brise du véhicule",
          "à mesurer la vitesse à laquelle le véhicule franchit le portique",
          "à décider si le véhicule a le droit de passer par cette voie",
        ],
        pourquoi:
          "La reconnaissance produit du texte à partir d'une image. Ce qu'on en fait ensuite est un autre traitement.",
      },
      {
        cas: "Un logiciel sous-titre automatiquement une réunion filmée.",
        bonne: "à transformer la parole entendue en texte affiché",
        pieges: [
          "à traduire la réunion dans la langue choisie par chaque participant",
          "à résumer les décisions prises pendant la réunion enregistrée",
          "à identifier qui parle parmi les participants de la réunion",
        ],
        pourquoi:
          "Transcrire, traduire, résumer et identifier le locuteur sont quatre tâches distinctes, même si un même service peut les enchaîner.",
      },
      {
        cas: "Un capteur agricole photographie les feuilles d'un champ de canne.",
        bonne: "à repérer les signes de maladie sur les feuilles photographiées",
        pieges: [
          "à mesurer la hauteur des plants pour estimer la date de récolte",
          "à décider seul du traitement chimique à appliquer sur la parcelle",
          "à cartographier la parcelle pour en calculer la surface exacte",
        ],
        pourquoi:
          "Le modèle reconnaît un état sur une image. La décision de traiter revient à l'agriculteur.",
      },
      {
        cas: "Une application identifie un oiseau à partir de son chant enregistré au jardin.",
        bonne: "à rattacher un enregistrement à l'espèce dont il porte le chant",
        pieges: [
          "à enregistrer le chant avec une meilleure qualité sonore",
          "à localiser précisément l'endroit où se trouve l'oiseau",
          "à reproduire le chant pour faire venir l'oiseau plus près",
        ],
        pourquoi: "C'est une classification : un son entrant, une espèce en sortie.",
      },
    ],
  }),

  // ── 2.1.3 Identifier les familles d'applications ─────────────────────────
  classer({
    id: "g_2_1_3_familles",
    microskillId: "2.1.3",
    consigne: "De quelle famille de tâches relève ce service ?",
    familles: FAMILLES_TACHES,
    pool: [
      {
        cas: "Un service estime le temps de trajet restant jusqu'à ta destination.",
        famille: "de la prédiction (estimer une valeur à venir)",
        pourquoi: "On estime une durée qui n'a pas encore eu lieu.",
      },
      {
        cas: "Une application écrit un poème à partir de trois mots que tu donnes.",
        famille: "de la génération (produire un contenu nouveau)",
        pourquoi: "Le texte n'existait pas : il est produit.",
      },
      {
        cas: "Une plateforme te propose la prochaine série à regarder.",
        famille: "de la recommandation (proposer un contenu)",
        pourquoi: "On choisit dans un catalogue existant ce qui te conviendra.",
      },
      {
        cas: "Un logiciel détecte les visages présents sur une photo de classe.",
        famille: "de la reconnaissance (image, son, texte)",
        pourquoi: "On analyse une image pour y repérer quelque chose de connu.",
      },
      {
        cas: "Un outil estime le nombre de visiteurs attendus au parc le week-end prochain.",
        famille: "de la prédiction (estimer une valeur à venir)",
        pourquoi: "Une fréquentation future est une valeur à estimer.",
      },
      {
        cas: "Un assistant rédige un brouillon de courriel à partir de ta consigne.",
        famille: "de la génération (produire un contenu nouveau)",
        pourquoi: "Le texte est fabriqué, pas retrouvé.",
      },
      {
        cas: "Une messagerie classe un message dans le dossier des indésirables.",
        famille: "de la reconnaissance (image, son, texte)",
        pourquoi:
          "On analyse un texte pour le ranger dans une catégorie connue : c'est de la reconnaissance, au sens large.",
      },
      {
        cas: "Une boutique affiche « souvent achetés ensemble » sous un article.",
        famille: "de la recommandation (proposer un contenu)",
        pourquoi: "On propose des articles existants d'après le comportement d'autres acheteurs.",
      },
    ],
  }),

  // ── 2.1.4 Repérer les applications dans les outils courants ──────────────
  situation({
    id: "g_2_1_4_outils",
    microskillId: "2.1.4",
    consigne: "Dans cet outil, qu'est-ce qui relève de l'IA ?",
    pool: [
      {
        cas: "Un traitement de texte souligne les fautes en rouge et propose un brouillon de lettre.",
        bonne: "le brouillon de lettre : le soulignement des fautes vient d'un dictionnaire",
        pieges: [
          "le soulignement des fautes : c'est une reconnaissance de texte apprise",
          "les deux fonctions : elles reposent toutes deux sur un modèle entraîné",
          "aucune des deux : un traitement de texte n'utilise pas d'IA",
        ],
        pourquoi:
          "Le correcteur compare à une liste de mots et à des règles. Produire un texte nouveau, c'est autre chose.",
      },
      {
        cas: "Un tableur calcule le total d'une colonne et propose un graphique adapté aux données.",
        bonne: "la proposition de graphique : le total est une formule appliquée",
        pieges: [
          "le total : le tableur choisit lui-même l'opération à effectuer",
          "les deux : le tableur analyse les données dans les deux cas",
          "aucune des deux : un tableur ne fait qu'appliquer des formules",
        ],
        pourquoi:
          "Une somme est une règle écrite. Deviner le graphique qui conviendrait suppose un modèle appris sur des usages.",
      },
      {
        cas: "Une messagerie trie les indésirables et affiche les messages du plus récent.",
        bonne: "le tri des indésirables : l'ordre chronologique est mécanique",
        pieges: [
          "l'ordre d'affichage : la messagerie apprend l'ordre qui te convient",
          "les deux : la messagerie analyse chaque message pour le placer",
          "aucune des deux : une messagerie ne contient pas de modèle",
        ],
        pourquoi: "Trier par date ne demande aucun apprentissage. Reconnaître un indésirable, si.",
      },
      {
        cas: "Une application photo recadre selon des repères et repère les visages pour un album.",
        bonne: "la détection des visages : le recadrage suit des proportions fixées",
        pieges: [
          "le recadrage : l'application choisit la meilleure composition possible",
          "les deux : l'application analyse l'image dans les deux opérations",
          "aucune des deux : ce sont des traitements d'image classiques",
        ],
        pourquoi: "Un recadrage au format 4:3 est un calcul géométrique. Trouver un visage est une reconnaissance.",
      },
      {
        cas: "Un navigateur complète l'adresse que tu commences à taper et résume une page à ta demande.",
        bonne: "le résumé de la page : la complétion reprend ton historique",
        pieges: [
          "la complétion d'adresse : le navigateur devine ce que tu cherches",
          "les deux : le navigateur emploie un modèle dans les deux cas",
          "aucune des deux : ce sont des fonctions intégrées au navigateur",
        ],
        pourquoi:
          "Compléter une adresse revient à chercher dans ton historique. Résumer une page demande un modèle de langage.",
      },
      {
        cas: "Une plateforme vidéo affiche la durée des vidéos et te suggère la suivante.",
        bonne: "la suggestion : la durée est lue dans le fichier lui-même",
        pieges: [
          "la durée : la plateforme l'estime à partir du contenu de la vidéo",
          "les deux : la plateforme analyse chaque vidéo qu'elle héberge",
          "aucune des deux : ce sont des informations fournies par l'auteur",
        ],
        pourquoi: "La durée est une donnée du fichier. La suggestion est calculée sur ton comportement.",
      },
    ],
  }),

  // ── 2.2.1 Écrire une requête claire et précise ───────────────────────────
  situation({
    id: "g_2_2_1_prompt",
    microskillId: "2.2.1",
    consigne: "Quelle est la meilleure requête ?",
    pool: [
      {
        cas: "Tu prépares un exposé de 6e sur les volcans, à présenter en cinq minutes.",
        bonne: "« Propose un plan en 3 parties sur les volcans, pour un exposé de 5 min en 6e »",
        pieges: [
          "« Donne-moi tout ce qu'il faut savoir sur les volcans, sois le plus complet possible »",
          "« Volcans : magma, cratère, éruption, plaques, risques, prévention, exemples »",
          "« Fais mon exposé sur les volcans, je dois le présenter demain matin »",
        ],
        pourquoi:
          "La bonne requête dit le format attendu, la durée et le niveau. Une liste de mots-clés est une requête de moteur de recherche.",
      },
      {
        cas: "Tu veux comprendre une notion de maths que ton cours explique mal.",
        bonne: "« Explique le théorème de Pythagore à un élève de 4e, avec un exemple chiffré »",
        pieges: [
          "« Explique-moi le théorème de Pythagore le plus simplement possible »",
          "« Théorème de Pythagore : définition, démonstration, applications, exercices »",
          "« Je ne comprends rien au théorème de Pythagore, aide-moi s'il te plaît »",
        ],
        pourquoi:
          "Dire à qui l'explication s'adresse et ce qu'on attend (un exemple chiffré) vaut mieux que demander « simplement ».",
      },
      {
        cas: "Tu veux une lettre de motivation pour un stage de troisième dans une boulangerie.",
        bonne: "« Rédige une lettre de motivation de 15 lignes pour un stage de 3e en boulangerie »",
        pieges: [
          "« Écris-moi une lettre de motivation, c'est pour un stage »",
          "« Lettre de motivation stage boulangerie troisième collège »",
          "« Fais la meilleure lettre de motivation possible pour ce stage »",
        ],
        pourquoi:
          "La longueur, le niveau et le secteur sont trois précisions qui changent complètement le résultat.",
      },
      {
        cas: "Tu veux vérifier que tu as compris un chapitre d'histoire.",
        bonne: "« Pose-moi 5 questions sur la Révolution française, niveau 4e, sans les réponses »",
        pieges: [
          "« Interroge-moi sur la Révolution française pour voir si j'ai compris »",
          "« Révolution française : dates, causes, personnages, conséquences »",
          "« Fais-moi un résumé de la Révolution française pour que je révise »",
        ],
        pourquoi:
          "Préciser le nombre, le niveau et « sans les réponses » transforme une demande vague en outil de révision.",
      },
      {
        cas: "Tu veux corriger un texte que tu as écrit, sans qu'il soit réécrit à ta place.",
        bonne: "« Corrige l'orthographe de ce texte sans changer les phrases, et liste tes corrections »",
        pieges: [
          "« Corrige mon texte s'il te plaît, il doit y avoir des fautes »",
          "« Améliore ce texte pour qu'il soit meilleur et plus agréable à lire »",
          "« Relis ce texte et dis-moi ce que tu en penses honnêtement »",
        ],
        pourquoi:
          "Sans contrainte, le modèle réécrit. Dire ce qu'il ne doit PAS toucher est aussi utile que dire ce qu'il doit faire.",
      },
      {
        cas: "Tu cherches des idées pour un projet de fin d'année en technologie.",
        bonne: "« Propose 5 idées de projet en technologie 3e, réalisables en 6 h avec du carton »",
        pieges: [
          "« Donne-moi des idées de projet pour la technologie, sois original »",
          "« Idées projet technologie collège fin d'année facile rapide »",
          "« Quel projet de technologie me conseilles-tu de faire cette année ? »",
        ],
        pourquoi:
          "Le nombre, le temps disponible et le matériel sont des contraintes : sans elles, on obtient des idées inapplicables.",
      },
    ],
  }),

  // ── 2.2.2 Affiner la requête selon les résultats ─────────────────────────
  situation({
    id: "g_2_2_2_iterer",
    microskillId: "2.2.2",
    consigne: "Quelle relance vaut le mieux ?",
    pool: [
      {
        cas: "Le texte obtenu est bon, mais son introduction fait la moitié de la longueur.",
        bonne: "« Garde le texte tel quel, mais réduis l'introduction à deux phrases »",
        pieges: [
          "« Ce n'est pas ça du tout, recommence complètement depuis le début »",
          "« Fais plus court », en espérant que le modèle comprendra où couper",
          "Reposer exactement la même demande, pour voir s'il fait mieux",
        ],
        pourquoi:
          "Une relance efficace dit ce qu'on garde ET ce qu'on change. « Fais plus court » raccourcit au hasard.",
      },
      {
        cas: "La réponse emploie un vocabulaire trop technique pour ton exposé de 5e.",
        bonne: "« Reprends la même explication, mais pour un élève de 5e, sans jargon »",
        pieges: [
          "« C'est trop compliqué », sans dire pour qui ni ce qui doit changer",
          "« Simplifie », en laissant le modèle décider de ce qu'il enlève",
          "Chercher soi-même la définition de chaque mot technique employé",
        ],
        pourquoi: "Donner le destinataire est la précision la plus efficace : elle règle le niveau d'un coup.",
      },
      {
        cas: "Le modèle a rendu un texte au lieu du tableau que tu attendais.",
        bonne: "« Présente exactement les mêmes informations sous forme de tableau à 3 colonnes »",
        pieges: [
          "« Mets ça en tableau », sans préciser les colonnes que tu veux voir",
          "« Ce n'est pas ce que je voulais », en attendant qu'il devine",
          "Recopier le texte à la main dans un tableau que tu fais toi-même",
        ],
        pourquoi:
          "Le format se demande précisément : « en tableau » laisse encore le choix des colonnes au modèle.",
      },
      {
        cas: "La réponse est juste, mais tu voudrais d'autres angles pour choisir.",
        bonne: "« Propose deux autres versions, l'une plus concrète, l'autre plus courte »",
        pieges: [
          "« Donne-moi autre chose », qui laisse la direction entièrement ouverte",
          "« Recommence », qui risque de rendre une variante très proche",
          "Poser la question à un autre service d'IA pour comparer",
        ],
        pourquoi:
          "Demander des versions selon des CRITÈRES nommés permet de comparer. « Autre chose » ne compare rien.",
      },
      {
        cas: "Le modèle a inventé un exemple qui ne correspond pas à ton cours.",
        bonne: "« Reprends l'explication en utilisant cet exemple précis, tiré de mon cours : … »",
        pieges: [
          "« Ton exemple est faux », sans fournir celui que tu veux à la place",
          "« Utilise un exemple de mon cours », alors qu'il ne connaît pas ton cours",
          "Garder l'explication et remplacer l'exemple toi-même sans le dire",
        ],
        pourquoi:
          "Le modèle ne connaît pas ton cours. Lui fournir l'exemple est plus rapide que lui demander de le deviner.",
      },
      {
        cas: "Après trois relances, la réponse s'éloigne de plus en plus de ce que tu veux.",
        bonne: "repartir d'une requête neuve, qui reprend tout ce que tu as appris à préciser",
        pieges: [
          "continuer à relancer : la bonne version finira par sortir",
          "accepter la dernière version, qui est forcément la plus travaillée",
          "changer de service d'IA en gardant la même formulation",
        ],
        pourquoi:
          "Une conversation qui dérive entraîne le modèle dans sa dérive. Repartir à neuf, mieux formulé, va plus vite.",
      },
    ],
  }),

  // ── 2.2.3 Types de tâches demandables à une IA générative ────────────────
  classer({
    id: "g_2_2_3_demandable",
    microskillId: "2.2.3",
    consigne: "Cette demande convient-elle à une IA générative de texte ?",
    familles: [
      "oui : produire ou transformer un texte est son métier",
      "non : elle ne peut pas garantir un fait vérifié",
      "non : elle n'a pas accès à cette information",
      "non : c'est une action dans le monde, pas un texte",
    ],
    pool: [
      {
        cas: "« Reformule ce paragraphe en trois phrases courtes. »",
        famille: "oui : produire ou transformer un texte est son métier",
        pourquoi: "Transformer un texte fourni est exactement ce qu'un modèle de langage fait le mieux.",
      },
      {
        cas: "« Donne-moi le lien exact de l'article paru hier dans le journal local. »",
        famille: "non : elle n'a pas accès à cette information",
        pourquoi: "Sans outil de recherche branché, le modèle ne connaît ni l'actualité ni les adresses réelles.",
      },
      {
        cas: "« Confirme-moi que cette date historique est exacte, je ne vérifierai pas. »",
        famille: "non : elle ne peut pas garantir un fait vérifié",
        pourquoi: "Le modèle produit du plausible. Lui demander une garantie, c'est lui demander ce qu'il n'a pas.",
      },
      {
        cas: "« Envoie ce courriel à mon professeur. »",
        famille: "non : c'est une action dans le monde, pas un texte",
        pourquoi: "Le modèle rédige ; l'envoi suppose un outil branché et une décision qui reste la tienne.",
      },
      {
        cas: "« Propose cinq titres pour mon exposé sur les volcans. »",
        famille: "oui : produire ou transformer un texte est son métier",
        pourquoi: "Produire des variantes courtes est un usage classique et sans risque.",
      },
      {
        cas: "« Combien d'élèves de ma classe ont rendu leur devoir ? »",
        famille: "non : elle n'a pas accès à cette information",
        pourquoi: "Aucune donnée de ton établissement n'est accessible au modèle.",
      },
      {
        cas: "« Traduis ce paragraphe en anglais, en gardant le ton. »",
        famille: "oui : produire ou transformer un texte est son métier",
        pourquoi: "La traduction est une transformation de texte.",
      },
      {
        cas: "« Dis-moi si ce médicament est dangereux pour moi. »",
        famille: "non : elle ne peut pas garantir un fait vérifié",
        pourquoi:
          "Une réponse qui engage la santé demande un professionnel : le modèle ne connaît ni ton dossier ni les contre-indications à jour.",
      },
    ],
  }),

  // ── 2.2.4 Détecter erreurs et hallucinations ─────────────────────────────
  situation({
    id: "g_2_2_4_verifier",
    microskillId: "2.2.4",
    consigne: "Faut-il vérifier, et comment ?",
    pool: [
      {
        cas: "L'IA te donne la définition d'un mot que tu connais déjà à moitié.",
        bonne: "vérifier dans un dictionnaire : c'est rapide, et l'enjeu est ton cours",
        pieges: [
          "ne pas vérifier : une définition est un fait simple, sans risque d'erreur",
          "ne pas vérifier si la définition ressemble à ce que tu croyais savoir",
          "demander à l'IA de confirmer sa définition avec un autre mot",
        ],
        pourquoi:
          "Le coût de la vérification décide. Un dictionnaire prend dix secondes : il n'y a pas de raison de s'en passer.",
      },
      {
        cas: "L'IA rédige un plan d'exposé à partir d'idées que tu lui as fournies.",
        bonne: "relire pour vérifier que le plan correspond à tes idées, sans chercher de source",
        pieges: [
          "vérifier chaque partie du plan dans une encyclopédie en ligne",
          "ne rien relire : le plan vient de tes propres idées de départ",
          "demander à une seconde IA si le plan proposé est le bon",
        ],
        pourquoi:
          "Ici le modèle organise, il n'affirme rien. La vérification porte sur la fidélité à ta demande, pas sur des faits.",
      },
      {
        cas: "L'IA cite un chiffre pour ton exposé noté : « 60 % des espèces du lagon ».",
        bonne: "chercher ce chiffre auprès d'un organisme, ou le retirer de l'exposé",
        pieges: [
          "le garder en écrivant « selon une IA », ce qui met le lecteur en garde",
          "l'arrondir à « la majorité », ce qui évite d'avoir à le vérifier",
          "demander à l'IA la source du chiffre et citer cette source",
        ],
        pourquoi:
          "Un chiffre engage. Attribuer la source à l'IA ne le rend pas vrai, et la source qu'elle cite peut être inventée.",
      },
      {
        cas: "Tu demandes à l'IA de corriger l'orthographe d'un texte que tu as écrit.",
        bonne: "relire les corrections proposées, une par une, avant de les accepter",
        pieges: [
          "accepter toutes les corrections : l'orthographe est un domaine sûr",
          "n'en accepter aucune et corriger toi-même à partir de ses remarques",
          "faire relire le résultat par une seconde IA pour être certain",
        ],
        pourquoi:
          "Les correcteurs modifient parfois le sens en corrigeant la forme. Relire coûte moins cher que se faire trahir.",
      },
      {
        cas: "L'IA t'explique une règle de grammaire, avec deux exemples.",
        bonne: "confronter la règle à ton manuel : c'est ce qui fera foi en classe",
        pieges: [
          "faire confiance : la grammaire française est très bien documentée",
          "vérifier seulement si les exemples te paraissent bizarres à la lecture",
          "demander à l'IA d'où vient la règle qu'elle vient d'énoncer",
        ],
        pourquoi:
          "Ce qui compte en classe, c'est la règle du manuel. Et un domaine bien documenté ne met pas à l'abri du plausible.",
      },
      {
        cas: "L'IA te propose une idée de projet pour le club de sciences.",
        bonne: "ne pas vérifier de fait, mais juger si l'idée est réalisable chez toi",
        pieges: [
          "vérifier que personne n'a déjà réalisé ce projet auparavant",
          "vérifier chaque affirmation contenue dans la description du projet",
          "adopter l'idée telle quelle : le modèle en a proposé plusieurs",
        ],
        pourquoi:
          "Une idée n'est ni vraie ni fausse. La bonne question devient : est-ce faisable avec ce dont je dispose ?",
      },
    ],
  }),

  // ── 2.3.1 Intention de l'auteur d'un contenu truqué ──────────────────────
  situation({
    id: "g_2_3_1_intention",
    microskillId: "2.3.1",
    consigne: "Quelle question se poser en premier ?",
    pool: [
      {
        cas: "Une vidéo montre une personnalité tenant des propos choquants. Elle circule beaucoup.",
        bonne: "qui l'a publiée en premier, et quel intérêt cette personne a-t-elle à la diffuser ?",
        pieges: [
          "combien de fois la vidéo a-t-elle été partagée depuis sa publication ?",
          "la personnalité a-t-elle démenti ces propos publiquement depuis ?",
          "la vidéo est-elle de bonne qualité, avec une image nette et stable ?",
        ],
        pourquoi:
          "L'origine et l'intention se cherchent avant tout le reste. Le nombre de partages mesure la diffusion, pas la véracité.",
      },
      {
        cas: "Une photo montre un événement dramatique dans une ville que tu connais.",
        bonne: "cette photo a-t-elle déjà circulé ailleurs, à une autre date ou dans un autre lieu ?",
        pieges: [
          "la photo est-elle assez nette pour qu'on distingue bien la scène ?",
          "combien de comptes ont-ils repris cette photo dans la journée ?",
          "les commentaires sous la photo confirment-ils ce qu'elle montre ?",
        ],
        pourquoi:
          "La photo sortie de son contexte est plus fréquente que la photo truquée : chercher ses apparitions passées est le bon réflexe.",
      },
      {
        cas: "Un compte inconnu publie un chiffre alarmant sur un sujet de santé.",
        bonne: "qui est derrière ce compte, et d'où vient le chiffre qu'il avance ?",
        pieges: [
          "le chiffre est-il présenté avec un graphique clair et bien fait ?",
          "d'autres comptes reprennent-ils le même chiffre en ce moment ?",
          "le chiffre correspond-il à ce que tu pensais déjà sur le sujet ?",
        ],
        pourquoi:
          "Un chiffre repris par cent comptes reste un seul chiffre. C'est sa source qu'il faut atteindre.",
      },
      {
        cas: "Une vidéo te donne exactement raison sur un sujet qui te tient à cœur.",
        bonne: "est-ce que je la vérifie autant que celles qui me donnent tort ?",
        pieges: [
          "est-ce que je la partage tout de suite pour convaincre les autres ?",
          "est-ce que d'autres personnes de mon avis l'ont déjà partagée ?",
          "est-ce que ceux qui la contestent ont des arguments solides ?",
        ],
        pourquoi:
          "On vérifie deux fois moins ce qui nous arrange. Se le rappeler est le geste critique le plus difficile.",
      },
      {
        cas: "Une publication annonce une nouvelle stupéfiante et demande de partager vite.",
        bonne: "pourquoi cette urgence à partager, alors qu'aucun média n'en parle ?",
        pieges: [
          "la nouvelle est-elle plausible au regard de ce que je sais du sujet ?",
          "le texte contient-il des fautes qui trahiraient un faux message ?",
          "combien de personnes ont-elles déjà réagi à cette publication ?",
        ],
        pourquoi:
          "L'appel à partager vite sert justement à court-circuiter la vérification. C'est un signal en soi.",
      },
      {
        cas: "Une image « générée par IA » illustre un article d'information sérieux.",
        bonne: "l'illustration est-elle donnée pour une image réelle, ou clairement signalée ?",
        pieges: [
          "l'image est-elle suffisamment réaliste pour tromper un lecteur ?",
          "l'article aurait-il dû employer une vraie photographie à la place ?",
          "l'auteur de l'image est-il crédité en légende de l'article ?",
        ],
        pourquoi:
          "Une illustration signalée n'est pas un problème. Une image générée présentée comme un document en est un.",
      },
    ],
  }),

  // ── 2.3.2 Interpréter une mention « fait avec l'IA » ─────────────────────
  corriger({
    id: "g_2_3_2_mention",
    microskillId: "2.3.2",
    pool: [
      {
        affirmation: "Une image marquée « générée par IA » est forcément un mensonge.",
        bonne: "la mention dit comment l'image a été faite, pas si son propos est faux",
        pieges: [
          "la mention prouve au contraire que le contenu a été vérifié",
          "la mention signifie que l'image ne peut pas être réutilisée",
          "la mention est un simple avertissement légal, sans autre portée",
        ],
        pourquoi:
          "Une illustration générée pour un article exact n'a rien d'un mensonge. Ce qui compte, c'est l'usage qu'on en fait.",
      },
      {
        affirmation: "Une image sans mention « IA » est donc une vraie photographie.",
        bonne: "l'absence de mention ne prouve rien : rien n'oblige à la porter partout",
        pieges: [
          "c'est exact : la mention est obligatoire pour tout contenu généré",
          "c'est exact, sauf sur les réseaux sociaux qui n'exigent rien",
          "c'est faux : les images générées sont toujours reconnaissables à l'œil",
        ],
        pourquoi:
          "L'étiquetage progresse mais reste inégal. L'absence de mention n'est pas une garantie d'authenticité.",
      },
      {
        affirmation: "Puisque le contenu est signalé comme généré, je peux le partager sans réfléchir.",
        bonne: "la mention n'engage rien sur le propos : il reste à juger comme les autres",
        pieges: [
          "c'est exact : la transparence sur l'origine suffit à rendre le partage honnête",
          "c'est exact, à condition de conserver la mention en partageant",
          "c'est faux : un contenu généré ne devrait jamais être partagé",
        ],
        pourquoi:
          "Dire d'où vient un contenu est une bonne chose. Cela ne dispense pas de se demander s'il est juste et utile.",
      },
      {
        affirmation: "Un texte écrit par une IA n'a pas d'auteur, donc personne n'en est responsable.",
        bonne: "celui qui a demandé, retenu et publié le texte en répond",
        pieges: [
          "l'auteur est l'entreprise qui a conçu et entraîné le modèle employé",
          "les auteurs sont les personnes dont les textes ont servi à l'entraîner",
          "c'est exact, et c'est pourquoi ces textes sont libres de droits",
        ],
        pourquoi: "La responsabilité suit la publication, pas la production.",
      },
      {
        affirmation: "Je reconnais toujours une image générée : elles ont un air artificiel.",
        bonne: "les défauts visibles disparaissent vite : l'œil seul ne suffit plus",
        pieges: [
          "c'est exact, à condition de regarder attentivement les mains et le texte",
          "c'est exact pour les photos, mais pas pour les vidéos générées",
          "c'est faux : les images générées sont toujours parfaitement réalistes",
        ],
        pourquoi:
          "Les repères d'hier — mains, texte déformé — sont déjà dépassés. Compter dessus donne une fausse assurance.",
      },
      {
        affirmation: "Une vidéo authentique ne peut pas induire en erreur.",
        bonne: "une vraie vidéo sortie de son contexte trompe autant qu'un trucage",
        pieges: [
          "c'est exact : si elle est authentique, elle montre ce qui s'est passé",
          "c'est exact, sauf si elle a été coupée ou raccourcie au montage",
          "c'est faux : toute vidéo qui circule beaucoup a été modifiée",
        ],
        pourquoi:
          "Le décontextualisation est la manipulation la plus répandue, et elle ne demande aucun outil d'IA.",
      },
    ],
  }),

  // ── 2.3.3 Retrouver l'auteur d'un contenu en ligne ───────────────────────
  situation({
    id: "g_2_3_3_source",
    microskillId: "2.3.3",
    consigne: "Quelle démarche mène vraiment à la source ?",
    pool: [
      {
        cas: "Un ami te transfère une capture d'écran d'un article, sans lien.",
        bonne: "chercher le titre exact dans un moteur pour retrouver l'article d'origine",
        pieges: [
          "demander à ton ami s'il pense que l'article est fiable",
          "juger d'après la mise en page, qui ressemble à celle d'un vrai journal",
          "demander à une IA générative si cet article existe vraiment",
        ],
        pourquoi:
          "Une capture se fabrique en deux minutes. Seule la page d'origine, retrouvée par soi-même, tranche.",
      },
      {
        cas: "Une information circule sous forme de citation attribuée à un scientifique.",
        bonne: "chercher où et quand il l'aurait dite : conférence, article, entretien",
        pieges: [
          "vérifier que le scientifique existe et travaille bien dans ce domaine",
          "regarder si la citation est reprise par beaucoup de comptes différents",
          "juger si la citation correspond à ce qu'un scientifique pourrait dire",
        ],
        pourquoi:
          "Une citation sans lieu ni date est invérifiable — et c'est souvent ce qui la trahit.",
      },
      {
        cas: "Un site inconnu publie une étude aux résultats spectaculaires.",
        bonne: "remonter à l'étude elle-même et voir qui l'a menée et publiée",
        pieges: [
          "regarder si le site a une page « à propos » d'apparence sérieuse",
          "vérifier que le site est présent depuis plusieurs années en ligne",
          "comparer avec d'autres sites qui relaient la même étude",
        ],
        pourquoi:
          "Dix sites qui relaient la même étude ne font pas dix sources. Il faut atteindre le document d'origine.",
      },
      {
        cas: "Une photo illustre un article sur un événement récent.",
        bonne: "faire une recherche par image pour voir où elle est déjà apparue",
        pieges: [
          "vérifier que la légende décrit bien ce que montre la photographie",
          "regarder si la photo est de bonne qualité, signe d'un professionnel",
          "chercher si d'autres articles emploient la même photographie",
        ],
        pourquoi:
          "La recherche par image révèle les réemplois : c'est l'outil qui démasque le plus vite une photo recyclée.",
      },
      {
        cas: "Une IA générative te donne trois sources à l'appui de sa réponse.",
        bonne: "vérifier une par une que ces sources existent et disent bien cela",
        pieges: [
          "les citer telles quelles, puisque l'IA les a indiquées d'elle-même",
          "en vérifier une seule : si elle existe, les autres existent aussi",
          "demander à l'IA de confirmer que ses sources sont fiables",
        ],
        pourquoi:
          "Les références inventées ont exactement la forme des vraies. Chacune se vérifie séparément.",
      },
      {
        cas: "Un compte relaie une information en citant « une source proche du dossier ».",
        bonne: "chercher si un média identifiable reprend l'information en la sourçant",
        pieges: [
          "attendre de voir si l'information est démentie dans les jours qui viennent",
          "considérer que l'anonymat de la source protège légitimement un informateur",
          "juger d'après le nombre d'abonnés du compte qui a publié",
        ],
        pourquoi:
          "Une source anonyme peut être légitime dans un média qui l'assume. Isolée, sur un compte quelconque, elle n'est pas vérifiable.",
      },
    ],
  }),

  // ── 2.3.4 IA générative vs moteur de recherche ───────────────────────────
  classer({
    id: "g_2_3_4_quel_outil",
    microskillId: "2.3.4",
    consigne: "Quel outil convient le mieux à ce besoin ?",
    familles: [
      "un moteur de recherche : il renvoie vers des pages identifiables",
      "une IA générative : elle produit ou transforme un texte",
      "un site officiel ou une base de référence",
      "aucun outil en ligne : il faut demander à une personne",
    ],
    pool: [
      {
        cas: "Trouver le texte officiel d'une loi entrée en vigueur cette année.",
        famille: "un site officiel ou une base de référence",
        pourquoi: "Un texte de loi se lit à la source, pas dans une reformulation.",
      },
      {
        cas: "Reformuler ton paragraphe pour qu'il soit compréhensible par un élève de 6e.",
        famille: "une IA générative : elle produit ou transforme un texte",
        pourquoi: "Transformer un texte que tu fournis est le bon usage d'un modèle de langage.",
      },
      {
        cas: "Retrouver l'adresse de l'article d'où vient une citation.",
        famille: "un moteur de recherche : il renvoie vers des pages identifiables",
        pourquoi: "Un moteur donne des pages qu'on peut ouvrir et vérifier. Un modèle peut inventer l'adresse.",
      },
      {
        cas: "Savoir si tu peux t'inscrire à une option l'an prochain dans ton établissement.",
        famille: "aucun outil en ligne : il faut demander à une personne",
        pourquoi: "Ce qui dépend de ton établissement se demande à ton établissement.",
      },
      {
        cas: "Obtenir la population officielle d'une commune au dernier recensement.",
        famille: "un site officiel ou une base de référence",
        pourquoi: "L'organisme statistique publie le chiffre : c'est lui qui fait foi.",
      },
      {
        cas: "Produire cinq titres possibles pour un article que tu as écrit.",
        famille: "une IA générative : elle produit ou transforme un texte",
        pourquoi: "Générer des variantes courtes est sans risque et rapide.",
      },
      {
        cas: "Vérifier si une information très partagée a été démentie.",
        famille: "un moteur de recherche : il renvoie vers des pages identifiables",
        pourquoi: "On cherche des pages datées et attribuables, pas une synthèse produite.",
      },
      {
        cas: "Comprendre pourquoi ta note à un devoir est celle-là.",
        famille: "aucun outil en ligne : il faut demander à une personne",
        pourquoi: "Seul ton professeur connaît ta copie et ses critères.",
      },
    ],
  }),

  // ── 2.4.1 Repérer les services à recommandation ──────────────────────────
  classer({
    id: "g_2_4_1_reco_ou_non",
    microskillId: "2.4.1",
    consigne: "Ce que tu vois ici est-il recommandé ?",
    familles: [
      "recommandé : calculé à partir de ton comportement",
      "classé : un palmarès identique pour tous",
      "trié : un ordre mécanique, date ou alphabet",
      "acheté : la place a été payée par un annonceur",
    ],
    pool: [
      {
        cas: "« Parce que tu as regardé… » en tête d'une plateforme vidéo.",
        famille: "recommandé : calculé à partir de ton comportement",
        pourquoi: "L'intitulé désigne explicitement ton historique.",
      },
      {
        cas: "« Top 10 des titres les plus écoutés cette semaine en France ».",
        famille: "classé : un palmarès identique pour tous",
        pourquoi: "Un palmarès national est le même pour chaque utilisateur.",
      },
      {
        cas: "Tes courriels affichés du plus récent au plus ancien.",
        famille: "trié : un ordre mécanique, date ou alphabet",
        pourquoi: "L'ordre chronologique ne dépend d'aucune préférence.",
      },
      {
        cas: "Le premier résultat d'une boutique, marqué « Sponsorisé ».",
        famille: "acheté : la place a été payée par un annonceur",
        pourquoi: "La mention le dit : la position résulte d'un paiement.",
      },
      {
        cas: "« Les clients ayant acheté cet article ont aussi aimé… »",
        famille: "recommandé : calculé à partir de ton comportement",
        pourquoi: "C'est du filtrage collaboratif, appuyé sur l'article que tu regardes.",
      },
      {
        cas: "La liste alphabétique des chaînes disponibles sur ton abonnement.",
        famille: "trié : un ordre mécanique, date ou alphabet",
        pourquoi: "L'alphabet ne recommande rien.",
      },
      {
        cas: "« Les articles les plus lus du site aujourd'hui ».",
        famille: "classé : un palmarès identique pour tous",
        pourquoi: "Le palmarès du site est identique pour tous les lecteurs.",
      },
      {
        cas: "Une publicité pour des chaussures que tu as consultées la veille sur un autre site.",
        famille: "acheté : la place a été payée par un annonceur",
        pourquoi:
          "Le ciblage s'appuie sur ton comportement, mais c'est bien une place publicitaire achetée — le reciblage.",
      },
    ],
  }),

  // ── 2.4.2 Avantages et limites de la personnalisation ────────────────────
  situation({
    id: "g_2_4_2_avantage_limite",
    microskillId: "2.4.2",
    consigne: "Quel est l'effet principal de la personnalisation, ici ?",
    pool: [
      {
        cas: "Tu retrouves en trois secondes le type de vidéos que tu regardes d'habitude.",
        bonne: "un gain de temps réel : c'est le service que rend la personnalisation",
        pieges: [
          "une perte de temps, puisque l'algorithme décide à ta place",
          "un effet nul : tu aurais trouvé aussi vite par la recherche",
          "un risque pour tes données, qui ont été collectées pour cela",
        ],
        pourquoi: "La personnalisation rend un vrai service. Le reconnaître évite d'en faire un épouvantail.",
      },
      {
        cas: "Depuis six mois, tu n'as pas découvert un seul créateur en dehors de tes habitudes.",
        bonne: "un appauvrissement : la personnalisation resserre ce que tu rencontres",
        pieges: [
          "un signe que tes goûts sont stables et bien identifiés",
          "un problème de catalogue : la plateforme manque de nouveautés",
          "un effet passager qui se corrigera de lui-même avec le temps",
        ],
        pourquoi:
          "Le même mécanisme qui fait gagner du temps réduit la variété. C'est la limite, pas un dysfonctionnement.",
      },
      {
        cas: "Une application d'apprentissage te propose des exercices adaptés à tes erreurs.",
        bonne: "un usage utile de la personnalisation : elle vise ce que tu ne maîtrises pas",
        pieges: [
          "un enfermement : tu ne travailles plus que tes points faibles",
          "un risque : l'application décide seule de ce que tu dois apprendre",
          "un effet nul : les exercices seraient les mêmes pour tout le monde",
        ],
        pourquoi:
          "Personnaliser un entraînement n'est pas personnaliser un fil d'actualité : ici, viser les erreurs est exactement le but.",
      },
      {
        cas: "Un site d'information ne te montre plus que des articles qui confirment ton opinion.",
        bonne: "une chambre d'écho : tu n'es plus exposé au désaccord",
        pieges: [
          "un service : le site t'évite des articles qui t'agaceraient",
          "un signe que l'opinion contraire est devenue minoritaire",
          "une erreur de l'algorithme, qui devrait varier davantage",
        ],
        pourquoi:
          "Sur l'information, la personnalisation coûte plus qu'elle ne rapporte : elle retire le contradictoire.",
      },
      {
        cas: "Une boutique te propose exactement l'accessoire qui manquait à ton achat.",
        bonne: "un service pour toi, et une vente pour la boutique : les deux à la fois",
        pieges: [
          "un service désintéressé rendu par la boutique à ses clients",
          "une manipulation destinée à te faire dépenser sans besoin",
          "un effet du hasard : la boutique propose la même chose à tous",
        ],
        pourquoi:
          "L'intérêt du service et le tien coïncident souvent — et pas toujours. Savoir que les deux coexistent suffit à rester lucide.",
      },
      {
        cas: "Deux camarades et toi cherchez la même chose et obtenez trois résultats différents.",
        bonne: "la personnalisation vous sert trois versions du même Internet",
        pieges: [
          "le moteur a mal fonctionné pour deux d'entre vous",
          "vous n'avez pas tapé exactement les mêmes mots dans la recherche",
          "les résultats changent d'une minute à l'autre pour tout le monde",
        ],
        pourquoi:
          "C'est ce qui rend la bulle difficile à voir : chacun croit consulter la même source commune.",
      },
    ],
  }),

  // ── 2.4.3 Gérer historique et personnalisation ───────────────────────────
  situation({
    id: "g_2_4_3_reglages",
    microskillId: "2.4.3",
    consigne: "Quel geste a vraiment un effet ?",
    pool: [
      {
        cas: "Tu veux que les suggestions cessent de tourner autour d'un sujet que tu as abandonné.",
        bonne: "supprimer de ton historique les contenus liés à ce sujet",
        pieges: [
          "cesser de cliquer dessus et attendre que l'algorithme oublie",
          "signaler chaque suggestion comme inappropriée au service",
          "te déconnecter et te reconnecter pour repartir de zéro",
        ],
        pourquoi:
          "L'historique est la matière première des suggestions. L'éditer agit à la source ; attendre agit peu.",
      },
      {
        cas: "Tu veux voir des contenus moins filtrés par tes habitudes.",
        bonne: "désactiver la personnalisation dans les réglages, quand l'option existe",
        pieges: [
          "utiliser une fenêtre de navigation privée pour toutes tes visites",
          "créer un second compte et alterner entre les deux comptes",
          "vider le cache du navigateur avant chaque nouvelle session",
        ],
        pourquoi:
          "Le réglage prévu pour cela agit sur le service lui-même. Le reste contourne sans régler.",
      },
      {
        cas: "Une vidéo recommandée te dérange et tu ne veux plus rien voir de semblable.",
        bonne: "utiliser « ne plus me recommander cette chaîne », qui est un signal explicite",
        pieges: [
          "passer la vidéo rapidement, ce qui suffit à le faire comprendre",
          "la regarder en entier pour voir de quoi il retourne exactement",
          "signaler la vidéo comme contraire aux règles de la plateforme",
        ],
        pourquoi:
          "Regarder, même par curiosité ou agacement, est un signal positif. Le bouton explicite est le seul geste sans ambiguïté.",
      },
      {
        cas: "Tu veux savoir ce que la plateforme sait de toi.",
        bonne: "demander l'accès à tes données : c'est un droit, et il existe un bouton",
        pieges: [
          "regarder les suggestions pour deviner ce que la plateforme a retenu",
          "écrire au service client pour lui poser directement la question",
          "consulter les conditions d'utilisation, qui listent tes données",
        ],
        pourquoi:
          "Le RGPD donne un droit d'accès, et les grandes plateformes proposent un export. Ce n'est pas à deviner.",
      },
      {
        cas: "Tu partages ton compte avec quelqu'un dont les goûts n'ont rien à voir avec les tiens.",
        bonne: "créer des profils séparés : les historiques ne se mélangeront plus",
        pieges: [
          "nettoyer l'historique après chaque utilisation par l'autre personne",
          "signaler les suggestions qui viennent des goûts de l'autre personne",
          "accepter le mélange : l'algorithme finira par distinguer les deux",
        ],
        pourquoi:
          "Un compte partagé mêle deux comportements. Les profils séparés existent pour cela.",
      },
      {
        cas: "Tu as tout supprimé de ton historique, et les suggestions restent semblables.",
        bonne: "d'autres signaux subsistent : appareil, abonnements, profils voisins",
        pieges: [
          "la suppression n'a pas fonctionné, il faut recommencer",
          "les anciennes suggestions restent affichées mais ne se renouvellent plus",
          "la plateforme conserve illégalement l'historique que tu as supprimé",
        ],
        pourquoi:
          "L'historique n'est qu'une source parmi d'autres. Le nettoyer aide, sans remettre le compteur à zéro.",
      },
    ],
  }),

  // ── 2.4.4 La personnalisation limite la diversité ────────────────────────
  situation({
    id: "g_2_4_4_diversite",
    microskillId: "2.4.4",
    consigne: "Quelle habitude élargit vraiment ce que tu rencontres ?",
    pool: [
      {
        cas: "Tu veux sortir de ta bulle sur les sujets d'actualité.",
        bonne: "lire régulièrement deux ou trois sources qui ne se ressemblent pas",
        pieges: [
          "t'abonner à plus de comptes dans les sujets que tu suis déjà",
          "lire les commentaires, où les avis contraires s'expriment",
          "utiliser plusieurs applications pour voir la même actualité",
        ],
        pourquoi:
          "Multiplier les comptes d'un même bord resserre la bulle. Ce sont des sources différentes qu'il faut, pas plus de sources.",
      },
      {
        cas: "Tu écoutes toujours la même musique et voudrais découvrir autre chose.",
        bonne: "écouter volontairement une sélection éditoriale, faite par des humains",
        pieges: [
          "écouter davantage, pour que l'algorithme ait plus de matière",
          "mettre la lecture aléatoire dans ta propre bibliothèque",
          "regarder le palmarès des morceaux les plus écoutés du moment",
        ],
        pourquoi:
          "L'aléatoire dans TA bibliothèque ne sort pas de ta bulle. Une sélection humaine y introduit autre chose.",
      },
      {
        cas: "Tu ne vois plus jamais passer d'avis contraire au tien sur un sujet.",
        bonne: "aller chercher exprès un argumentaire opposé, et le lire en entier",
        pieges: [
          "attendre que l'algorithme finisse par t'en proposer un",
          "en parler avec des amis, qui te donneront d'autres points de vue",
          "chercher les critiques de ta position dans les commentaires",
        ],
        pourquoi:
          "L'algorithme ne va pas t'apporter ce que tu ne demandes pas. Et tes amis partagent souvent ta bulle.",
      },
      {
        cas: "Tu prépares un exposé et veux éviter de ne citer qu'un seul point de vue.",
        bonne: "chercher qui n'est pas d'accord, et pourquoi, avant de conclure",
        pieges: [
          "multiplier les sources qui vont dans le sens de ta conclusion",
          "citer une seule source, mais très complète sur la question",
          "demander à une IA générative de te donner tous les points de vue",
        ],
        pourquoi:
          "Chercher le désaccord est la meilleure garantie contre la bulle — c'est aussi ce qu'on fait le moins spontanément.",
      },
      {
        cas: "Ton fil te propose sans cesse des contenus qui t'énervent, et tu les regardes.",
        bonne: "arrêter de les ouvrir : les regarder en demande davantage",
        pieges: [
          "commenter pour dire ton désaccord sous chaque contenu",
          "les regarder jusqu'au bout pour pouvoir les critiquer",
          "signaler chacun d'eux comme contenu inapproprié",
        ],
        pourquoi:
          "L'algorithme mesure l'attention, pas l'accord. Commenter et regarder sont deux signaux positifs.",
      },
      {
        cas: "Tu veux que ta classe travaille sur une même actualité sans partir de la même bulle.",
        bonne: "comparer comment trois médias différents ont traité le même fait",
        pieges: [
          "demander à chacun de chercher l'information sur son téléphone",
          "partir de l'article le plus partagé sur les réseaux sociaux",
          "utiliser une IA générative pour obtenir une synthèse neutre",
        ],
        pourquoi:
          "Chacun sur son téléphone, c'est trente bulles. La comparaison de traitements rend le filtrage visible.",
      },
    ],
  }),

  // ── 2.5.1 Identifier des outils intégrant de l'IA ────────────────────────
  classer({
    id: "g_2_5_1_outils_pro",
    microskillId: "2.5.1",
    consigne: "Dans cet outil de travail, la fonction décrite emploie-t-elle de l'IA ?",
    familles: [
      "oui : le résultat est produit ou reconnu par un modèle",
      "non : c'est une formule ou une règle appliquée",
      "non : c'est une recherche dans des données existantes",
      "non : c'est une mise en forme automatique",
    ],
    pool: [
      {
        cas: "Un logiciel rédige le compte rendu d'une réunion à partir de son enregistrement.",
        famille: "oui : le résultat est produit ou reconnu par un modèle",
        pourquoi: "Transcrire puis résumer mobilise deux modèles entraînés.",
      },
      {
        cas: "Un tableur calcule la moyenne d'une colonne de notes.",
        famille: "non : c'est une formule ou une règle appliquée",
        pourquoi: "Une moyenne est une opération, écrite une fois pour toutes.",
      },
      {
        cas: "Un gestionnaire de fichiers retrouve tous les documents contenant un mot précis.",
        famille: "non : c'est une recherche dans des données existantes",
        pourquoi: "Chercher une chaîne de caractères ne demande aucun apprentissage.",
      },
      {
        cas: "Un logiciel applique la charte graphique de l'établissement à un document.",
        famille: "non : c'est une mise en forme automatique",
        pourquoi: "Appliquer un modèle de style est une opération de formatage.",
      },
      {
        cas: "Un outil propose de reformuler un paragraphe pour le rendre plus clair.",
        famille: "oui : le résultat est produit ou reconnu par un modèle",
        pourquoi: "Reformuler suppose un modèle de langage.",
      },
      {
        cas: "Un logiciel de messagerie retrouve les courriels reçus d'un expéditeur.",
        famille: "non : c'est une recherche dans des données existantes",
        pourquoi: "Un filtre sur un champ n'est pas une reconnaissance.",
      },
      {
        cas: "Un logiciel classe automatiquement les factures reçues par fournisseur, en lisant le document.",
        famille: "oui : le résultat est produit ou reconnu par un modèle",
        pourquoi: "Lire un document et en extraire le fournisseur est une reconnaissance apprise.",
      },
      {
        cas: "Un traitement de texte numérote les pages et met à jour le sommaire.",
        famille: "non : c'est une mise en forme automatique",
        pourquoi: "La numérotation suit une règle : elle ne reconnaît rien.",
      },
    ],
  }),

  // ── 2.5.2 Respecter une charte d'usage de l'IA ───────────────────────────
  situation({
    id: "g_2_5_2_charte",
    microskillId: "2.5.2",
    consigne: "Que dit la charte, et que fais-tu ?",
    pool: [
      {
        cas: "La charte de ton collège autorise l'IA pour réviser, mais pas pour produire un devoir noté.",
        bonne: "l'utiliser pour te faire interroger, et rédiger le devoir toi-même",
        pieges: [
          "l'utiliser pour rédiger, puis reformuler avec tes mots avant de rendre",
          "l'utiliser et le signaler en note de bas de page pour rester honnête",
          "ne plus l'utiliser du tout, y compris pour réviser tes leçons",
        ],
        pourquoi:
          "Reformuler un texte produit ne change pas qui l'a produit. La charte porte sur l'usage, pas sur la trace.",
      },
      {
        cas: "La charte interdit de saisir des données personnelles dans un outil d'IA en ligne.",
        bonne: "retirer noms et coordonnées du texte avant de le coller",
        pieges: [
          "coller le texte tel quel, puis demander à l'IA de ne rien retenir",
          "utiliser l'outil depuis une session privée du navigateur",
          "coller le texte, l'outil étant celui recommandé par l'établissement",
        ],
        pourquoi:
          "Un modèle ne « retient » pas sur commande. La seule protection sûre est de ne pas transmettre la donnée.",
      },
      {
        cas: "La charte demande d'indiquer quand une IA a aidé à produire un document.",
        bonne: "mentionner l'aide reçue, et sur quelle partie précisément",
        pieges: [
          "mentionner l'IA seulement si le texte a été repris tel quel",
          "ne rien mentionner, la charte ne prévoyant pas de sanction",
          "mentionner l'IA sur tous les documents, par précaution",
        ],
        pourquoi:
          "Une mention utile dit ce qui a été fait avec, pas seulement qu'un outil a servi.",
      },
      {
        cas: "Aucune charte n'existe encore dans ton établissement, et tu veux utiliser une IA pour un travail.",
        bonne: "demander à ton professeur ce qu'il autorise pour ce travail précis",
        pieges: [
          "en déduire que tout est permis, faute de règle écrite",
          "t'en abstenir complètement jusqu'à ce qu'une charte existe",
          "appliquer la charte d'un autre établissement trouvée en ligne",
        ],
        pourquoi:
          "L'absence de règle générale ne dispense pas de la consigne du professeur, qui reste la règle du devoir.",
      },
      {
        cas: "La charte autorise l'IA pour chercher des idées, et tu l'utilises pour un exposé.",
        bonne: "garder les idées qui te parlent, et vérifier chaque fait avant de le citer",
        pieges: [
          "reprendre le plan proposé tel quel, puisque l'usage est autorisé",
          "citer l'IA comme source des informations qu'elle a fournies",
          "utiliser aussi l'IA pour rédiger, l'esprit de la charte étant respecté",
        ],
        pourquoi:
          "« Chercher des idées » n'est pas « produire le contenu ». Et une idée retenue reste à vérifier.",
      },
      {
        cas: "Un camarade te dit que la charte ne s'applique pas aux devoirs faits à la maison.",
        bonne: "vérifier ce que dit vraiment la charte, plutôt que ce qu'on en raconte",
        pieges: [
          "le croire : la charte concerne surtout l'usage des outils du collège",
          "faire comme lui : si personne ne vérifie, la règle est théorique",
          "en discuter avec d'autres camarades pour trancher entre vous",
        ],
        pourquoi:
          "Une charte se lit. Ce qu'on en dit dans la cour n'est pas ce qu'elle dit.",
      },
    ],
  }),

  // ── 2.5.3 Confidentialité et conditions d'utilisation ────────────────────
  classer({
    id: "g_2_5_3_confidentialite",
    microskillId: "2.5.3",
    consigne: "Peut-on coller cela dans un outil d'IA grand public ?",
    familles: [
      "oui : rien ne permet d'identifier quelqu'un",
      "non : ce sont des données personnelles",
      "non : c'est une information confidentielle qui ne t'appartient pas",
      "à anonymiser d'abord, puis oui",
    ],
    pool: [
      {
        cas: "Un exercice de maths tiré de ton manuel.",
        famille: "oui : rien ne permet d'identifier quelqu'un",
        pourquoi: "Aucune donnée personnelle, aucun secret : l'usage est sans risque.",
      },
      {
        cas: "La liste des élèves de ta classe avec leurs notes du trimestre.",
        famille: "non : ce sont des données personnelles",
        pourquoi: "Des noms associés à des résultats sont des données personnelles, et pas les tiennes.",
      },
      {
        cas: "Le compte rendu d'une réunion interne de l'entreprise où tu es en stage.",
        famille: "non : c'est une information confidentielle qui ne t'appartient pas",
        pourquoi: "Un document interne engage l'entreprise, pas seulement toi.",
      },
      {
        cas: "Une lettre de motivation que tu as écrite, avec ton nom et ton adresse.",
        famille: "à anonymiser d'abord, puis oui",
        pourquoi: "Le texte se relit très bien sans les coordonnées : les retirer suffit.",
      },
      {
        cas: "Un poème que tu as écrit et que tu veux faire relire.",
        famille: "oui : rien ne permet d'identifier quelqu'un",
        pourquoi: "C'est ta création, sans donnée personnelle : rien n'empêche de le soumettre.",
      },
      {
        cas: "Le certificat médical de ton frère, pour en comprendre les termes.",
        famille: "non : ce sont des données personnelles",
        pourquoi: "Les données de santé sont les plus sensibles, et ce ne sont pas les tiennes.",
      },
      {
        cas: "Un courriel reçu d'un camarade, dont tu veux faire corriger la réponse.",
        famille: "à anonymiser d'abord, puis oui",
        pourquoi: "Retirer le nom et ce qui identifie le camarade rend l'usage acceptable.",
      },
      {
        cas: "Le code d'accès du réseau de ton établissement.",
        famille: "non : c'est une information confidentielle qui ne t'appartient pas",
        pourquoi: "Un identifiant partagé ne se transmet à aucun service, quel qu'il soit.",
      },
    ],
  }),

  // ── 2.5.4 Vérifier les mentions légales avant adoption ───────────────────
  situation({
    id: "g_2_5_4_avant_adopter",
    microskillId: "2.5.4",
    consigne: "Que regarder avant d'adopter cet outil ?",
    pool: [
      {
        cas: "Un outil d'IA gratuit propose de résumer les documents de ton établissement.",
        bonne: "ce que les conditions disent de la réutilisation des documents transmis",
        pieges: [
          "le nombre d'utilisateurs et les avis laissés sur la boutique",
          "la qualité des résumés, testée sur quelques documents d'exemple",
          "la présence d'une version payante, signe d'un service sérieux",
        ],
        pourquoi:
          "La qualité se teste ensuite. Ce qui ne se rattrape pas, c'est un document transmis à un service qui le réutilise.",
      },
      {
        cas: "Un service demande l'accès à ton compte de messagerie pour trier tes courriels.",
        bonne: "quelles autorisations exactes il demande, et s'il peut lire tout le contenu",
        pieges: [
          "si le service est bien noté par ses utilisateurs actuels",
          "si le tri fonctionne correctement pendant la période d'essai",
          "si le service propose de désactiver l'accès à tout moment",
        ],
        pourquoi:
          "Une autorisation d'accès est plus lourde qu'un envoi ponctuel : elle porte sur tout, en continu.",
      },
      {
        cas: "Une application scolaire d'IA est proposée gratuitement à toute la classe.",
        bonne: "où sont hébergées les données des élèves, et qui peut y accéder",
        pieges: [
          "si l'application couvre bien toutes les matières du programme",
          "si les autres classes de l'établissement l'utilisent déjà",
          "si l'application fonctionne aussi sur les téléphones personnels",
        ],
        pourquoi:
          "Des données d'élèves mineurs engagent l'établissement. L'hébergement et les accès priment sur les fonctions.",
      },
      {
        cas: "Un outil affirme « vos données ne sont jamais utilisées pour l'entraînement ».",
        bonne: "où cette promesse figure : dans les conditions, ou seulement sur la page d'accueil",
        pieges: [
          "si la promesse est répétée à plusieurs endroits du site",
          "si l'entreprise est connue et implantée depuis longtemps",
          "si d'autres utilisateurs confirment cette promesse en ligne",
        ],
        pourquoi:
          "Une phrase d'accroche n'engage pas. Ce qui engage est dans les conditions d'utilisation.",
      },
      {
        cas: "Les conditions d'utilisation d'un outil font quarante pages.",
        bonne: "chercher directement les sections sur les données et leur conservation",
        pieges: [
          "renoncer à les lire : elles sont conçues pour ne pas l'être",
          "les faire résumer par l'outil lui-même avant de décider",
          "les lire entièrement avant toute utilisation du service",
        ],
        pourquoi:
          "On ne lit pas tout, on cherche ce qui compte : quelles données, pour quoi, combien de temps, et qui y accède.",
      },
      {
        cas: "Un outil d'IA change ses conditions d'utilisation six mois après ton inscription.",
        bonne: "relire ce qui a changé sur les données, et décider si tu continues",
        pieges: [
          "accepter : refuser reviendrait à perdre l'accès au service",
          "ignorer : les conditions changent tout le temps et se ressemblent",
          "demander au service de te maintenir sous les anciennes conditions",
        ],
        pourquoi:
          "Un changement de conditions est le moment où l'usage des données peut s'élargir. C'est le moment de relire.",
      },
    ],
  }),
];
