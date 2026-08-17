// Gabarits du LYCÉE — domaine 1, Fondements. Paliers avancé / expert.
//
// ⚠️ CE QUI CHANGE AU LYCÉE. Au collège, on demande de reconnaître : est-ce de
// l'IA, à quelle famille cela appartient, qu'est-ce qui cloche dans cette
// phrase. Ici on demande de CHOISIR ET DE JUSTIFIER : quelle méthode pour ces
// données, quel modèle pour cette contrainte, quelle conséquence si le critère
// est mal posé. Les distracteurs ne sont donc plus des idées reçues de grand
// public, mais les erreurs de raisonnement d'un élève qui a compris à moitié —
// celles qu'on entend en classe quand la notion est presque là.
//
// Voir socle.ts pour la règle et les trois helpers, et gabarits/d1.ts pour le
// collège correspondant.

import { classer, corriger, situation, type PixGabarit } from "./socle";

const FAMILLES_APPRENTISSAGE = [
  "l'apprentissage supervisé",
  "l'apprentissage non supervisé",
  "l'apprentissage par renforcement",
  "aucun apprentissage : des règles écrites à la main",
];

export const lyceeD1Gabarits: PixGabarit[] = [
  // ── 1.1.4 Contributions interdisciplinaires ──────────────────────────────
  classer({
    id: "g_l_1_1_4_disciplines",
    microskillId: "1.1.4",
    consigne: "De quelle discipline cet apport à l'IA provient-il d'abord ?",
    familles: [
      "des mathématiques et des statistiques",
      "de l'informatique et du génie logiciel",
      "des sciences cognitives et de la linguistique",
      "des sciences humaines et du droit",
    ],
    pool: [
      {
        cas: "La descente de gradient, qui ajuste les paramètres en suivant la pente de l'erreur.",
        famille: "des mathématiques et des statistiques",
        pourquoi: "C'est une méthode d'optimisation, antérieure de plus d'un siècle à l'IA.",
      },
      {
        cas: "Le calcul parallèle sur cartes graphiques, qui a rendu l'entraînement possible.",
        famille: "de l'informatique et du génie logiciel",
        pourquoi: "Sans cette architecture matérielle, les modèles actuels resteraient théoriques.",
      },
      {
        cas: "L'idée de découper une phrase en unités porteuses de sens.",
        famille: "des sciences cognitives et de la linguistique",
        pourquoi: "Le traitement du langage naturel hérite directement de la linguistique.",
      },
      {
        cas: "La notion de consentement au traitement des données personnelles.",
        famille: "des sciences humaines et du droit",
        pourquoi: "Elle vient du droit, et elle contraint aujourd'hui la conception même des systèmes.",
      },
      {
        cas: "L'inspiration du neurone formel, unité qui somme des signaux et se déclenche.",
        famille: "des sciences cognitives et de la linguistique",
        pourquoi: "McCulloch et Pitts partaient d'un modèle du neurone biologique.",
      },
      {
        cas: "Le théorème de Bayes, qui met à jour une probabilité à mesure des observations.",
        famille: "des mathématiques et des statistiques",
        pourquoi: "Il date du XVIIIᵉ siècle et fonde des pans entiers de l'apprentissage.",
      },
      {
        cas: "La question de savoir qui répond d'une décision prise par une machine.",
        famille: "des sciences humaines et du droit",
        pourquoi: "La responsabilité est une notion juridique, pas une propriété technique.",
      },
      {
        cas: "Les structures de données permettant de stocker des milliards de paramètres.",
        famille: "de l'informatique et du génie logiciel",
        pourquoi: "C'est de l'ingénierie logicielle, indispensable au passage à l'échelle.",
      },
    ],
  }),

  // ── 1.1.5 IA symbolique / apprentissage automatique ──────────────────────
  classer({
    id: "g_l_1_1_5_symbolique",
    microskillId: "1.1.5",
    consigne: "Cette approche relève de quoi ?",
    familles: [
      "l'IA symbolique : des règles explicites",
      "l'apprentissage automatique : des régularités tirées de données",
      "une approche hybride : les deux ensemble",
      "ni l'une ni l'autre : c'est du calcul ordinaire",
    ],
    pool: [
      {
        cas: "Un système expert médical qui enchaîne des règles « si… alors » écrites par des praticiens.",
        famille: "l'IA symbolique : des règles explicites",
        pourquoi: "Les systèmes experts des années 1980 sont l'archétype de l'approche symbolique.",
      },
      {
        cas: "Un modèle entraîné sur 100 000 radios annotées pour repérer une fracture.",
        famille: "l'apprentissage automatique : des régularités tirées de données",
        pourquoi: "Aucune règle n'est écrite : elles sont ajustées sur les exemples.",
      },
      {
        cas: "Un assistant qui rédige, puis appelle un solveur exact pour vérifier son calcul.",
        famille: "une approche hybride : les deux ensemble",
        pourquoi: "Un modèle statistique délègue à une méthode exacte : c'est l'hybridation.",
      },
      {
        cas: "Un tableur qui calcule l'écart-type d'une colonne.",
        famille: "ni l'une ni l'autre : c'est du calcul ordinaire",
        pourquoi: "Une formule statistique appliquée n'est ni un apprentissage ni un raisonnement symbolique.",
      },
      {
        cas: "Un moteur de jeu d'échecs qui explore un arbre de coups selon des règles du jeu.",
        famille: "l'IA symbolique : des règles explicites",
        pourquoi: "L'exploration est guidée par des règles et une évaluation écrites à la main.",
      },
      {
        cas: "Un correcteur qui apprend vos formulations habituelles à partir de vos textes.",
        famille: "l'apprentissage automatique : des régularités tirées de données",
        pourquoi: "Le comportement dépend des données de l'utilisateur, pas d'une règle fixe.",
      },
      {
        cas: "Un modèle appris dont on contraint les sorties par des règles métier obligatoires.",
        famille: "une approche hybride : les deux ensemble",
        pourquoi: "On garantit par des règles ce que l'apprentissage seul ne garantit pas.",
      },
      {
        cas: "Un convertisseur d'unités qui applique un coefficient fixe.",
        famille: "ni l'une ni l'autre : c'est du calcul ordinaire",
        pourquoi: "Aucune décision, aucune inférence : une multiplication.",
      },
    ],
  }),

  // ── 1.1.6 Jalons historiques et hivers de l'IA ───────────────────────────
  corriger({
    id: "g_l_1_1_6_histoire",
    microskillId: "1.1.6",
    pool: [
      {
        affirmation: "Les « hivers de l'IA » sont des périodes où la recherche s'était arrêtée.",
        bonne: "la recherche a continué : ce sont les financements et les promesses qui se sont taris",
        pieges: [
          "ce sont des périodes où le matériel disponible ne suffisait plus aux ambitions",
          "ce sont les décennies pendant lesquelles l'IA symbolique a dominé seule",
          "ce sont les phases où les résultats obtenus n'étaient pas publiés",
        ],
        pourquoi:
          "Un hiver de l'IA est d'abord un effondrement de la confiance et des crédits, après des promesses non tenues. Les travaux, eux, se sont poursuivis.",
      },
      {
        affirmation: "Les réseaux de neurones sont une invention des années 2010.",
        bonne: "l'idée date des années 1940-1950 : ce sont les données et le calcul qui ont changé",
        pieges: [
          "l'idée date des années 1990, avec les premières applications industrielles",
          "l'idée est effectivement récente, mais elle vient des années 2000",
          "l'idée est ancienne, mais les modèles actuels n'ont plus rien de commun avec elle",
        ],
        pourquoi:
          "Le neurone formel est de 1943, la rétropropagation popularisée dans les années 1980. 2012 est une bascule d'échelle, pas une invention.",
      },
      {
        affirmation: "La conférence de Dartmouth a lancé l'IA en présentant un premier système fonctionnel.",
        bonne: "elle a nommé et fondé un programme de recherche : le mot y est né, pas la machine",
        pieges: [
          "elle a réuni les industriels qui allaient financer les premières machines",
          "elle a présenté le premier système expert, appliqué au diagnostic médical",
          "elle a défini le test permettant de dire qu'une machine pense",
        ],
        pourquoi:
          "L'été 1956 fixe un nom et une ambition. Les réalisations viendront après, et plus lentement qu'annoncé.",
      },
      {
        affirmation: "Chaque avancée de l'IA a suivi une découverte théorique nouvelle.",
        bonne: "plusieurs bascules majeures viennent d'un changement d'échelle, à théorie inchangée",
        pieges: [
          "chaque avancée suit surtout la disponibilité de nouvelles données publiques",
          "chaque avancée vient d'un progrès du matériel, jamais de la théorie",
          "c'est exact : sans nouvelle théorie, aucun progrès n'est possible",
        ],
        pourquoi:
          "2012 comme 2020 doivent beaucoup à « plus de données, plus de calcul » appliqués à des méthodes connues.",
      },
      {
        affirmation: "Le test de Turing établit qu'une machine est intelligente.",
        bonne: "il propose un critère d'imitation en conversation, ce qui n'est pas la même chose",
        pieges: [
          "il mesure la capacité d'une machine à résoudre un problème inédit",
          "il a été validé expérimentalement dans les années 1990",
          "il est aujourd'hui la norme officielle d'évaluation des modèles",
        ],
        pourquoi:
          "Turing propose de remplacer la question « une machine peut-elle penser ? » par une épreuve d'imitation. Réussir l'épreuve ne répond pas à la question.",
      },
      {
        affirmation: "L'IA a progressé de façon régulière depuis sa création.",
        bonne: "elle a alterné emballements et hivers : la progression est par à-coups",
        pieges: [
          "elle a progressé lentement jusqu'en 2012, puis de façon continue",
          "elle a stagné pendant quarante ans avant de démarrer réellement",
          "c'est exact : chaque décennie a apporté son lot d'avancées comparables",
        ],
        pourquoi:
          "Connaître ce rythme aide à lire les annonces d'aujourd'hui : l'emballement fait partie de l'histoire de cette discipline.",
      },
    ],
  }),

  // ── 1.2.4 Apprentissage par renforcement ─────────────────────────────────
  classer({
    id: "g_l_1_2_4_renforcement",
    microskillId: "1.2.4",
    consigne: "Quelle méthode d'apprentissage convient à cette situation ?",
    familles: FAMILLES_APPRENTISSAGE,
    pool: [
      {
        cas: "Un programme apprend à piloter un drone en essayant, en tombant, et en recommençant.",
        famille: "l'apprentissage par renforcement",
        pourquoi: "Le retour vient après l'action, sous forme de succès ou d'échec : c'est le renforcement.",
      },
      {
        cas: "On dispose de 200 000 courriels déjà marqués « indésirable » ou non.",
        famille: "l'apprentissage supervisé",
        pourquoi: "La réponse attendue accompagne chaque exemple.",
      },
      {
        cas: "On veut découvrir des groupes de clients sans savoir combien ni lesquels.",
        famille: "l'apprentissage non supervisé",
        pourquoi: "Aucune étiquette, aucune récompense : on cherche une structure.",
      },
      {
        cas: "Un comptable écrit la règle « au-delà de 5 000 €, faire valider par un supérieur ».",
        famille: "aucun apprentissage : des règles écrites à la main",
        pourquoi: "Un seuil décidé par une personne n'est pas un modèle appris.",
      },
      {
        cas: "Un système de refroidissement de centre de données ajuste ses réglages et mesure l'énergie économisée.",
        famille: "l'apprentissage par renforcement",
        pourquoi: "L'économie réalisée sert de récompense à chaque réglage essayé.",
      },
      {
        cas: "On cherche à prédire la note d'un devoir à partir de devoirs déjà notés.",
        famille: "l'apprentissage supervisé",
        pourquoi: "La note connue est l'étiquette.",
      },
      {
        cas: "On veut repérer, dans des relevés, les opérations qui s'écartent de l'ordinaire sans exemple de fraude.",
        famille: "l'apprentissage non supervisé",
        pourquoi: "On ne dispose pas d'exemples étiquetés : on cherche l'anomalie.",
      },
      {
        cas: "Un agent apprend à jouer en recevant un point par pièce ramassée et en perdant une vie s'il tombe.",
        famille: "l'apprentissage par renforcement",
        pourquoi: "Gains et pertes constituent le signal de récompense.",
      },
    ],
  }),

  // ── 1.2.5 Critères de récompense ─────────────────────────────────────────
  situation({
    id: "g_l_1_2_5_recompense",
    microskillId: "1.2.5",
    consigne: "Que va faire le modèle, et pourquoi ?",
    pool: [
      {
        cas: "Un robot aspirateur est récompensé au nombre de saletés ramassées par heure.",
        bonne: "il peut apprendre à en recracher pour les ramasser à nouveau : on mesure le geste, pas le résultat",
        pieges: [
          "il va nettoyer plus vite, ce qui est exactement l'objectif recherché",
          "il va refuser de fonctionner faute de trouver assez de saletés",
          "il va nettoyer les mêmes zones, les plus sales de la maison",
        ],
        pourquoi:
          "Le modèle optimise ce qu'on mesure, pas ce qu'on voulait. Récompenser la propreté finale, pas le nombre de ramassages.",
      },
      {
        cas: "Un agent de recommandation est récompensé au temps passé sur l'application.",
        bonne: "il favorisera ce qui retient, y compris ce qui agace ou inquiète",
        pieges: [
          "il proposera les contenus les mieux notés par les utilisateurs",
          "il proposera surtout les contenus les plus longs du catalogue",
          "il proposera des contenus variés pour occuper le temps disponible",
        ],
        pourquoi:
          "L'indignation retient autant que le plaisir. Choisir le temps comme récompense, c'est choisir ses effets.",
      },
      {
        cas: "Un agent de conduite est récompensé uniquement à l'arrivée au point voulu.",
        bonne: "il apprendra très lentement : sans signal intermédiaire, presque tous les essais valent zéro",
        pieges: [
          "il apprendra vite, l'objectif étant clair et sans ambiguïté",
          "il choisira le trajet le plus court, faute d'autre critère",
          "il refusera de démarrer tant qu'il n'a pas de trajet garanti",
        ],
        pourquoi:
          "C'est le problème de la récompense rare. On ajoute des signaux intermédiaires — sans en faire de nouveaux objectifs détournables.",
      },
      {
        cas: "Un agent de jeu est récompensé au score, et découvre un bogue qui donne des points à l'infini.",
        bonne: "il exploitera le bogue : il n'a jamais eu pour but de jouer, mais de marquer",
        pieges: [
          "il évitera le bogue, qui ne correspond pas à une vraie partie",
          "il signalera l'anomalie aux concepteurs du jeu vidéo",
          "il alternera entre le bogue et le jeu normal pour varier",
        ],
        pourquoi:
          "Cas classique et documenté. La récompense EST l'objectif du modèle : tout écart entre les deux sera trouvé et exploité.",
      },
      {
        cas: "Un modèle de dialogue est récompensé quand les utilisateurs approuvent sa réponse.",
        bonne: "il peut apprendre à flatter plutôt qu'à dire juste : l'approbation n'est pas l'exactitude",
        pieges: [
          "il deviendra plus exact, l'approbation suivant la qualité des réponses",
          "il deviendra plus bref, les réponses courtes étant mieux notées",
          "il refusera les sujets sensibles, sources de désapprobation",
        ],
        pourquoi:
          "C'est la complaisance apprise : un risque réel des méthodes fondées sur les préférences humaines.",
      },
      {
        cas: "Une équipe veut récompenser un agent de tri sur « la satisfaction des usagers ».",
        bonne: "il faut d'abord traduire cela en une mesure : sans mesure, il n'y a pas de récompense",
        pieges: [
          "le modèle comprendra l'intention à partir de ses données d'entraînement",
          "il suffit de le préciser dans la consigne écrite donnée au modèle",
          "la satisfaction se déduit automatiquement du taux d'utilisation",
        ],
        pourquoi:
          "Toute la difficulté est là : ce qui compte vraiment est souvent ce qui se mesure le plus mal.",
      },
    ],
  }),

  // ── 1.2.6 Comparer les méthodes d'apprentissage ──────────────────────────
  corriger({
    id: "g_l_1_2_6_comparer",
    microskillId: "1.2.6",
    pool: [
      {
        affirmation: "L'apprentissage supervisé est toujours meilleur, puisqu'on lui donne les réponses.",
        bonne: "il exige des données étiquetées, coûteuses à produire et parfois impossibles à obtenir",
        pieges: [
          "il est meilleur, mais uniquement sur des données numériques structurées",
          "il est en réalité le moins performant des trois sur les grandes données",
          "c'est exact, et c'est pourquoi les deux autres méthodes disparaissent",
        ],
        pourquoi:
          "Le coût d'annotation est le premier obstacle réel. Une méthode n'est jamais meilleure dans l'absolu : elle l'est pour des données disponibles.",
      },
      {
        affirmation: "L'apprentissage non supervisé se passe de données.",
        bonne: "il se passe d'ÉTIQUETTES, pas de données : il lui en faut souvent beaucoup",
        pieges: [
          "il se passe de données, mais exige davantage de puissance de calcul",
          "il utilise des données produites automatiquement par le modèle",
          "c'est exact : il découvre des structures par le seul raisonnement",
        ],
        pourquoi: "La confusion entre « sans étiquette » et « sans donnée » est l'erreur la plus fréquente.",
      },
      {
        affirmation: "Le renforcement convient partout, puisqu'il apprend en essayant.",
        bonne: "il suppose de pouvoir essayer sans conséquence : impossible dans bien des domaines",
        pieges: [
          "il convient partout mais demande beaucoup plus de temps que le supervisé",
          "il ne convient qu'aux jeux, où les règles sont entièrement connues",
          "c'est exact, à condition de disposer d'une récompense bien choisie",
        ],
        pourquoi:
          "On ne laisse pas un modèle essayer sur de vrais patients. D'où le recours à la simulation, avec l'écart au réel qu'elle traîne.",
      },
      {
        affirmation: "Choisir une méthode, c'est choisir la plus récente.",
        bonne: "c'est choisir celle qui correspond aux données dont on dispose et à la contrainte du domaine",
        pieges: [
          "c'est choisir celle qui obtient les meilleurs résultats publiés",
          "c'est choisir celle que l'équipe maîtrise le mieux techniquement",
          "c'est choisir la plus économe en puissance de calcul",
        ],
        pourquoi:
          "La question n'est jamais « quelle est la meilleure méthode ? » mais « qu'ai-je comme données, et que dois-je garantir ? ».",
      },
      {
        affirmation: "Ces trois méthodes s'excluent : un système en emploie une seule.",
        bonne: "les systèmes réels les combinent souvent, étape par étape",
        pieges: [
          "elles s'excluent, sauf entre supervisé et non supervisé",
          "elles se combinent, mais seulement dans la recherche académique",
          "c'est exact : les mélanger rendrait l'entraînement instable",
        ],
        pourquoi:
          "Un modèle de langage enchaîne pré-entraînement auto-supervisé, ajustement supervisé, puis alignement par renforcement.",
      },
      {
        affirmation: "Plus il y a de données, moins le choix de la méthode compte.",
        bonne: "des données abondantes mais sans étiquette n'ouvrent toujours pas le supervisé",
        pieges: [
          "c'est exact au-delà d'un certain volume de données disponibles",
          "c'est exact pour les images, faux pour les données textuelles",
          "c'est faux : plus de données rend le choix encore plus délicat",
        ],
        pourquoi:
          "Ce n'est pas la quantité qui décide, c'est la NATURE de ce dont on dispose.",
      },
    ],
  }),

  // ── 1.2.7 Choisir la technique selon les données ─────────────────────────
  situation({
    id: "g_l_1_2_7_choisir",
    microskillId: "1.2.7",
    consigne: "Quelle technique choisir, et pourquoi ?",
    pool: [
      {
        cas: "Une commune dispose de dix ans de relevés de consommation d'eau, sans aucune annotation, et veut repérer les fuites.",
        bonne: "du non supervisé : on cherche l'écart à l'ordinaire, faute d'exemples de fuites étiquetés",
        pieges: [
          "du supervisé : les relevés suffisent à prédire la consommation normale",
          "du renforcement : le système apprendra en coupant l'eau et en observant",
          "des règles écrites : un seuil fixe de consommation suffit à tout détecter",
        ],
        pourquoi:
          "Sans exemples de fuites, le supervisé est hors jeu. Un seuil fixe, lui, ignore que la normale dépend du foyer et de la saison.",
      },
      {
        cas: "Un hôpital a 40 000 comptes rendus déjà classés par spécialité par des médecins.",
        bonne: "du supervisé : les classements existants sont exactement les étiquettes attendues",
        pieges: [
          "du non supervisé : le modèle retrouvera seul les spécialités",
          "du renforcement : on récompensera les bons classements au fil de l'usage",
          "des règles écrites : une liste de mots-clés par spécialité suffirait",
        ],
        pourquoi:
          "Quand l'annotation existe déjà, c'est un atout rare : s'en priver serait absurde.",
      },
      {
        cas: "Un simulateur permet de faire tourner des millions d'essais de pilotage sans risque.",
        bonne: "du renforcement : la simulation rend l'essai-erreur possible sans conséquence",
        pieges: [
          "du supervisé : on enregistrera les gestes d'un bon pilote humain",
          "du non supervisé : on regroupera les trajectoires qui se ressemblent",
          "des règles écrites : un pilote automatique classique suffit",
        ],
        pourquoi:
          "Le renforcement demande de pouvoir se tromper à volonté. Une simulation le permet — au prix de l'écart au réel.",
      },
      {
        cas: "Une administration doit refuser ou accepter des dossiers selon des critères fixés par la loi.",
        bonne: "des règles écrites : le critère est donné, il doit être appliqué et justifiable",
        pieges: [
          "du supervisé, entraîné sur les décisions passées de l'administration",
          "du non supervisé, pour découvrir les profils de dossiers acceptés",
          "du renforcement, récompensé quand la décision n'est pas contestée",
        ],
        pourquoi:
          "Quand la règle EST connue et opposable, l'apprendre sur le passé n'ajoute rien et importe les erreurs d'hier.",
      },
      {
        cas: "Une plateforme veut proposer des contenus, avec des milliards de clics enregistrés.",
        bonne: "du supervisé : le clic suivant sert d'étiquette, à condition d'en connaître les limites",
        pieges: [
          "du non supervisé : on regroupera les utilisateurs qui se ressemblent",
          "des règles écrites : une liste de préférences par utilisateur suffirait",
          "du renforcement seul : chaque clic est une récompense immédiate",
        ],
        pourquoi:
          "Le clic est une étiquette commode et trompeuse : il mesure l'attention attirée, pas la satisfaction.",
      },
      {
        cas: "Un laboratoire dispose de 300 images de tumeurs rares, et ne peut pas en obtenir davantage.",
        bonne: "partir d'un modèle déjà entraîné et l'ajuster : 300 exemples ne suffisent pas à partir de zéro",
        pieges: [
          "du supervisé classique : 300 images annotées suffisent largement",
          "du non supervisé : on laissera le modèle découvrir les catégories",
          "du renforcement : on récompensera les bons diagnostics au fil du temps",
        ],
        pourquoi:
          "L'apprentissage par transfert existe pour ce cas précis : peu de données, un domaine proche déjà appris.",
      },
    ],
  }),

  // ── 1.2.8 Biais volontaires ──────────────────────────────────────────────
  corriger({
    id: "g_l_1_2_8_biais_volontaire",
    microskillId: "1.2.8",
    pool: [
      {
        affirmation: "Tout biais dans un modèle est un défaut à supprimer.",
        bonne: "en apprentissage, un « biais » désigne aussi une contrainte utile qu'on introduit exprès",
        pieges: [
          "c'est exact : un modèle sans aucun biais est l'objectif à atteindre",
          "c'est exact, sauf pour les modèles qui traitent des données d'images",
          "c'est faux : les biais sont impossibles à supprimer, il faut les subir",
        ],
        pourquoi:
          "Le mot recouvre deux choses : la discrimination injuste, à combattre, et l'a priori qui guide l'apprentissage, indispensable.",
      },
      {
        affirmation: "Un modèle sans aucun a priori apprendrait mieux, puisqu'il serait libre.",
        bonne: "sans a priori, il faudrait infiniment plus de données : la contrainte est ce qui rend l'apprentissage possible",
        pieges: [
          "il apprendrait mieux, mais serait beaucoup plus lent à entraîner",
          "il apprendrait mieux uniquement sur des données parfaitement propres",
          "c'est exact, et c'est la direction que prennent les modèles récents",
        ],
        pourquoi:
          "Un réseau de convolution suppose que ce qui est proche dans une image va ensemble. Cet a priori lui économise des millions d'exemples.",
      },
      {
        affirmation: "Imposer à un modèle météo de respecter la conservation de l'énergie, c'est le brider.",
        bonne: "c'est écarter des solutions physiquement impossibles : on restreint pour mieux généraliser",
        pieges: [
          "c'est le brider, mais le gain en fiabilité vaut cette perte",
          "c'est inutile : le modèle retrouvera ces lois dans les données",
          "c'est le brider, et cela l'empêche de découvrir des phénomènes nouveaux",
        ],
        pourquoi:
          "Contraindre l'espace des solutions à ce qui est possible est un gain net, pas un compromis.",
      },
      {
        affirmation: "La régularisation empêche le modèle d'apprendre tout ce qu'il pourrait.",
        bonne: "elle l'empêche d'apprendre le bruit des exemples, ce qui améliore ses résultats sur du nouveau",
        pieges: [
          "elle réduit ses performances mais accélère beaucoup l'entraînement",
          "elle sert surtout à faire tenir le modèle dans une mémoire limitée",
          "c'est exact : c'est un compromis assumé entre justesse et rapidité",
        ],
        pourquoi:
          "Apprendre par cœur les exemples n'est pas apprendre. La régularisation est une contrainte volontaire, et elle sert.",
      },
      {
        affirmation: "Un biais volontaire et une discrimination sont la même chose vue autrement.",
        bonne: "l'un est un choix de conception assumé, l'autre un effet subi qu'il faut mesurer et corriger",
        pieges: [
          "ce sont deux choses distinctes, mais la première produit toujours la seconde",
          "ce sont deux choses distinctes, et seule la seconde concerne l'ingénieur",
          "c'est exact : dans les deux cas le modèle privilégie certaines réponses",
        ],
        pourquoi:
          "Confondre les deux mène soit à refuser toute contrainte utile, soit à excuser une discrimination en la disant technique.",
      },
      {
        affirmation: "Le choix de l'architecture d'un modèle est neutre, seul l'entraînement compte.",
        bonne: "l'architecture EST un a priori sur la forme des régularités qu'on s'attend à trouver",
        pieges: [
          "l'architecture compte surtout pour la vitesse de calcul obtenue",
          "l'architecture est neutre, mais le choix des données ne l'est pas",
          "c'est exact : deux architectures bien entraînées convergent au même point",
        ],
        pourquoi:
          "Choisir un réseau de convolution plutôt qu'un transformateur, c'est déjà supposer quelque chose de la structure du problème.",
      },
    ],
  }),

  // ── 1.3.5 Usage de la régression à l'entraînement ────────────────────────
  situation({
    id: "g_l_1_3_5_regression",
    microskillId: "1.3.5",
    consigne: "Qu'est-ce qui est en jeu ici ?",
    pool: [
      {
        cas: "Pendant l'entraînement, l'erreur sur les données d'entraînement baisse, mais celle sur les données de test remonte.",
        bonne: "le modèle sur-apprend : il retient les exemples au lieu de généraliser",
        pieges: [
          "le modèle sous-apprend : il faudrait l'entraîner plus longtemps",
          "les données de test sont mal choisies, il faut les remplacer",
          "c'est normal : l'erreur de test remonte toujours en fin d'entraînement",
        ],
        pourquoi:
          "C'est le signal le plus lisible du sur-apprentissage, et le moment d'arrêter.",
      },
      {
        cas: "L'erreur reste élevée sur l'entraînement comme sur le test, dès le début.",
        bonne: "le modèle est trop simple pour le problème, ou les variables ne portent pas l'information",
        pieges: [
          "le modèle sur-apprend et retient trop de détails des exemples",
          "il manque des données : il en faudrait dix fois plus",
          "l'entraînement s'est mal déroulé, il faut simplement recommencer",
        ],
        pourquoi:
          "Sous-apprentissage : ni le modèle ni les variables ne permettent d'expliquer ce qu'on veut prédire.",
      },
      {
        cas: "Une droite de régression passe exactement par les huit points mesurés.",
        bonne: "c'est suspect plutôt que rassurant : avec si peu de points, l'ajustement parfait n'annonce rien",
        pieges: [
          "c'est le meilleur résultat possible, le modèle est excellent",
          "c'est impossible : une droite ne peut pas passer par huit points",
          "cela prouve que la relation entre les variables est bien linéaire",
        ],
        pourquoi:
          "Un ajustement parfait sur peu de données mesure la souplesse du modèle, pas la réalité du lien.",
      },
      {
        cas: "Un modèle prédit très bien les ventes de l'an dernier, mais se trompe cette année.",
        bonne: "les conditions ont changé : un modèle appris sur le passé suppose que le passé continue",
        pieges: [
          "le modèle a été mal entraîné, il faut refaire l'apprentissage",
          "il manquait des variables, qu'il suffit d'ajouter au modèle",
          "c'est un sur-apprentissage classique sur les données de l'an dernier",
        ],
        pourquoi:
          "La dérive des données est une cause de panne à part entière, et elle ne se voit pas à l'entraînement.",
      },
      {
        cas: "On constate que la consommation de glaces et les noyades augmentent ensemble.",
        bonne: "une corrélation n'est pas une cause : la chaleur explique les deux",
        pieges: [
          "les glaces provoquent des noyades, il faut en limiter la vente",
          "la corrélation est fausse : ces variables n'ont aucun lien statistique",
          "c'est un cas de sur-apprentissage du modèle sur des données d'été",
        ],
        pourquoi:
          "Un modèle de régression capte des associations. En tirer une cause est une décision humaine, souvent fausse.",
      },
      {
        cas: "Une équipe veut savoir si son modèle marchera en vrai.",
        bonne: "le mesurer sur des données jamais vues, réservées avant l'entraînement",
        pieges: [
          "le mesurer sur les données d'entraînement, où l'erreur est la plus fiable",
          "le mesurer sur toutes les données disponibles pour plus de robustesse",
          "le comparer aux résultats publiés par d'autres équipes du domaine",
        ],
        pourquoi:
          "C'est la raison d'être du jeu de test, mis de côté AVANT de commencer.",
      },
    ],
  }),

  // ── 1.3.6 Applications des réseaux de neurones ───────────────────────────
  classer({
    id: "g_l_1_3_6_applications",
    microskillId: "1.3.6",
    consigne: "Quel type de modèle est le mieux adapté ?",
    familles: [
      "un réseau de neurones profond",
      "un modèle simple et interprétable (arbre, régression)",
      "un regroupement automatique",
      "aucun modèle : une règle écrite suffit",
    ],
    pool: [
      {
        cas: "Transcrire des heures d'enregistrements audio en texte.",
        famille: "un réseau de neurones profond",
        pourquoi: "Le son est une donnée non structurée : c'est le terrain des réseaux profonds.",
      },
      {
        cas: "Décider de l'attribution d'une bourse, décision devant être expliquée au demandeur.",
        famille: "un modèle simple et interprétable (arbre, régression)",
        pourquoi: "L'obligation de justifier prime sur le gain de performance.",
      },
      {
        cas: "Vérifier qu'un numéro de dossier respecte le format attendu.",
        famille: "aucun modèle : une règle écrite suffit",
        pourquoi: "Un contrôle de format est une règle, pas une prédiction.",
      },
      {
        cas: "Explorer des données de vente pour voir si des profils de clients se dégagent.",
        famille: "un regroupement automatique",
        pourquoi: "Aucune réponse attendue : on cherche une structure.",
      },
      {
        cas: "Repérer des cellules anormales sur des lames de microscope numérisées.",
        famille: "un réseau de neurones profond",
        pourquoi: "Image complexe et variable : les réseaux profonds y excellent.",
      },
      {
        cas: "Prédire un délai de livraison à partir de six variables chiffrées.",
        famille: "un modèle simple et interprétable (arbre, régression)",
        pourquoi: "Sur un petit tableau structuré, un modèle simple fait aussi bien et s'explique.",
      },
      {
        cas: "Traduire automatiquement un texte du français vers l'espagnol.",
        famille: "un réseau de neurones profond",
        pourquoi: "La traduction automatique repose aujourd'hui entièrement sur des réseaux profonds.",
      },
      {
        cas: "Calculer la TVA à appliquer selon le taux en vigueur.",
        famille: "aucun modèle : une règle écrite suffit",
        pourquoi: "Le taux est fixé par la loi : rien à apprendre.",
      },
    ],
  }),

  // ── 1.3.7 Limites d'interprétabilité ─────────────────────────────────────
  situation({
    id: "g_l_1_3_7_boite_noire",
    microskillId: "1.3.7",
    consigne: "Quelle est la bonne conduite ?",
    pool: [
      {
        cas: "Un modèle refuse un prêt, et la banque ne peut pas expliquer pourquoi à la personne.",
        bonne: "l'explicabilité est ici une obligation, pas un confort : il faut un modèle qui se justifie",
        pieges: [
          "publier le code du modèle suffit à satisfaire l'obligation d'explication",
          "il suffit d'indiquer que la décision vient d'un système automatique",
          "on peut garder ce modèle si son taux d'erreur est plus bas qu'un humain",
        ],
        pourquoi:
          "Une décision qui affecte une personne doit pouvoir lui être expliquée. La performance ne remplace pas ce droit.",
      },
      {
        cas: "Une équipe hésite entre un modèle plus performant mais opaque et un modèle lisible un peu moins bon.",
        bonne: "l'arbitrage dépend de l'enjeu : ce qui touche des personnes penche vers la lisibilité",
        pieges: [
          "prendre le plus performant : la performance est le seul critère objectif",
          "prendre le plus lisible : un modèle opaque n'est jamais acceptable",
          "prendre les deux et servir la réponse sur laquelle ils s'accordent",
        ],
        pourquoi:
          "Il n'y a pas de réponse générale. Recommander une vidéo et refuser un soin n'appellent pas le même compromis.",
      },
      {
        cas: "On propose d'ajouter un outil qui met en évidence les zones d'image ayant pesé sur la décision.",
        bonne: "c'est une explication partielle et utile, mais elle ne dit pas pourquoi ces zones ont pesé",
        pieges: [
          "cela rend le modèle entièrement explicable, le problème est résolu",
          "cela n'apporte rien : seul un modèle simple peut être expliqué",
          "cela remplace avantageusement l'obligation de justifier la décision",
        ],
        pourquoi:
          "Ces méthodes montrent où le modèle regarde, pas le raisonnement qu'il suit. Utile, et à ne pas surestimer.",
      },
      {
        cas: "Un responsable affirme que le modèle est transparent parce que son code est public.",
        bonne: "le code n'explique pas la décision : elle tient dans des milliards de paramètres appris",
        pieges: [
          "il a raison : un code public permet de refaire tous les calculs",
          "il a raison si les données d'entraînement sont publiées également",
          "il a tort : la transparence exige surtout de publier les performances",
        ],
        pourquoi:
          "Ouverture du code et explicabilité sont deux choses différentes. On peut tout lire et ne rien comprendre à une décision précise.",
      },
      {
        cas: "Une IA d'aide au diagnostic est très performante, mais on ne sait pas sur quoi elle s'appuie.",
        bonne: "garder la décision humaine, et tester le modèle sur des cas où l'on connaît la réponse",
        pieges: [
          "l'utiliser telle quelle : sa performance mesurée est la seule garantie utile",
          "l'écarter complètement tant qu'elle n'est pas entièrement explicable",
          "demander au modèle de rédiger lui-même l'explication de son diagnostic",
        ],
        pourquoi:
          "⚠️ Une explication produite par le modèle lui-même n'est pas une preuve de son raisonnement : c'est un texte plausible de plus.",
      },
      {
        cas: "Un modèle très performant s'avère avoir appris à reconnaître le nom de l'hôpital inscrit sur les radios.",
        bonne: "il a trouvé un raccourci : sans interprétabilité, on ne l'aurait jamais su",
        pieges: [
          "c'est une astuce efficace : peu importe comment il obtient le bon résultat",
          "c'est une erreur d'annotation des données, à corriger dans le jeu de test",
          "c'est impossible : un modèle ne peut pas lire du texte sur une image",
        ],
        pourquoi:
          "Cas réel et célèbre. Le modèle avait appris quel hôpital traitait les cas graves. Excellent en test, inutile ailleurs.",
      },
    ],
  }),

  // ── 1.3.8 Comparer les types de modèles ─────────────────────────────────
  corriger({
    id: "g_l_1_3_8_comparer_modeles",
    microskillId: "1.3.8",
    pool: [
      {
        affirmation: "Un réseau de neurones bat toujours un arbre de décision.",
        bonne: "sur des tableaux de données structurées, les modèles d'arbres font souvent mieux",
        pieges: [
          "c'est exact, sauf quand les données sont en très petite quantité",
          "c'est exact depuis 2012, date où les réseaux profonds ont pris l'avantage",
          "c'est faux : les arbres sont supérieurs dans tous les cas de figure",
        ],
        pourquoi:
          "Sur les données tabulaires, les forêts et le boosting restent des références. Les réseaux dominent l'image, le son et le texte.",
      },
      {
        affirmation: "Le meilleur modèle est celui qui obtient le meilleur score au test.",
        bonne: "il faut aussi peser l'explicabilité, le coût, la robustesse et ce que le domaine exige",
        pieges: [
          "c'est exact, à condition que le jeu de test soit assez grand",
          "c'est exact : tous les autres critères découlent de la performance",
          "c'est faux : seul le coût de calcul devrait décider du choix",
        ],
        pourquoi:
          "Un modèle un point moins bon mais explicable et dix fois moins coûteux est souvent le bon choix.",
      },
      {
        affirmation: "Plus un modèle a de paramètres, mieux il généralise.",
        bonne: "au-delà de ce que les données peuvent nourrir, il retient le bruit au lieu de la règle",
        pieges: [
          "c'est exact, à condition de disposer d'assez de puissance de calcul",
          "c'est exact pour le texte, faux pour les données numériques",
          "c'est faux : les petits modèles généralisent toujours mieux",
        ],
        pourquoi: "La taille utile dépend de la quantité et de la variété des données disponibles.",
      },
      {
        affirmation: "Comparer deux modèles, c'est comparer leurs scores publiés.",
        bonne: "encore faut-il qu'ils aient été évalués sur les mêmes données, de la même façon",
        pieges: [
          "c'est exact si les deux scores viennent de publications sérieuses",
          "c'est exact à condition que les modèles aient la même taille",
          "c'est faux : deux modèles ne sont jamais comparables entre eux",
        ],
        pourquoi:
          "Un score n'a de sens qu'avec son protocole. C'est la première question à poser devant une annonce de performance.",
      },
      {
        affirmation: "Un modèle qui marche bien chez nous marchera bien ailleurs.",
        bonne: "ses performances valent pour des données semblables à celles de son entraînement",
        pieges: [
          "c'est exact si le modèle a été entraîné sur assez de données",
          "c'est exact tant qu'on l'utilise dans le même secteur d'activité",
          "c'est faux : un modèle ne fonctionne jamais hors de son laboratoire",
        ],
        pourquoi:
          "Un modèle de radiologie entraîné sur un type d'appareil chute sur un autre. C'est le problème du transfert.",
      },
      {
        affirmation: "Le choix du modèle est une question purement technique.",
        bonne: "il engage ce qu'on pourra expliquer, garantir et corriger : c'est aussi une décision",
        pieges: [
          "c'est exact : le choix relève des ingénieurs, l'usage des utilisateurs",
          "c'est faux : le choix est purement économique, lié au coût de calcul",
          "c'est exact, sauf dans les domaines réglementés comme la santé",
        ],
        pourquoi:
          "Choisir un modèle opaque, c'est décider qu'on ne pourra pas expliquer. Ce n'est pas une décision d'ingénieur seul.",
      },
    ],
  }),

  // ── 1.4.6 Appel à des logiciels spécialisés ──────────────────────────────
  classer({
    id: "g_l_1_4_6_outils",
    microskillId: "1.4.6",
    consigne: "Pour répondre correctement ici, que doit faire le modèle ?",
    familles: [
      "appeler un outil de calcul exact",
      "appeler une recherche documentaire",
      "répondre de lui-même : c'est du langage",
      "refuser : il n'a pas les moyens de répondre",
    ],
    pool: [
      {
        cas: "« Combien font 48 917 × 3 264 ? »",
        famille: "appeler un outil de calcul exact",
        pourquoi: "Un modèle de langage estime le plausible ; un calcul exact demande un calculateur.",
      },
      {
        cas: "« Quelle est la loi votée hier au Parlement sur le numérique ? »",
        famille: "appeler une recherche documentaire",
        pourquoi: "L'actualité est postérieure à son entraînement : sans recherche, il inventera.",
      },
      {
        cas: "« Reformule ce paragraphe en trois phrases plus simples. »",
        famille: "répondre de lui-même : c'est du langage",
        pourquoi: "Transformer un texte fourni est exactement son domaine.",
      },
      {
        cas: "« Quelle note vais-je avoir à mon prochain devoir ? »",
        famille: "refuser : il n'a pas les moyens de répondre",
        pourquoi: "Aucune donnée, aucun accès : toute réponse serait une invention.",
      },
      {
        cas: "« Trie ces 300 lignes par ordre décroissant et donne-moi le total. »",
        famille: "appeler un outil de calcul exact",
        pourquoi: "Un tri et une somme exacts se délèguent à du code, pas à une prédiction de texte.",
      },
      {
        cas: "« Donne-moi le lien de l'article dont vient cette citation. »",
        famille: "appeler une recherche documentaire",
        pourquoi: "Une adresse réelle ne se devine pas : elle se cherche.",
      },
      {
        cas: "« Propose trois titres possibles pour cet exposé. »",
        famille: "répondre de lui-même : c'est du langage",
        pourquoi: "Générer des variantes courtes ne demande ni fait ni calcul.",
      },
      {
        cas: "« Quel est le solde de mon compte bancaire ce matin ? »",
        famille: "refuser : il n'a pas les moyens de répondre",
        pourquoi: "Donnée personnelle inaccessible : le modèle doit le dire, pas produire un chiffre.",
      },
    ],
  }),

  // ── 1.4.7 Fonctionnement d'un transformateur ─────────────────────────────
  corriger({
    id: "g_l_1_4_7_transformateur",
    microskillId: "1.4.7",
    pool: [
      {
        affirmation: "Le mécanisme d'attention permet au modèle de comprendre le sens des mots.",
        bonne: "il pondère l'influence de chaque mot du contexte sur les suivants : c'est un calcul, pas une compréhension",
        pieges: [
          "il permet au modèle de se concentrer sur la question posée par l'utilisateur",
          "il permet de repérer les passages du texte dont le modèle n'est pas sûr",
          "il permet de mémoriser les conversations passées avec l'utilisateur",
        ],
        pourquoi:
          "L'attention calcule quels mots comptent pour prédire la suite. Le mot « attention » est une image, comme « neurone ».",
      },
      {
        affirmation: "Un transformateur lit le texte mot à mot, de gauche à droite.",
        bonne: "il traite les positions ensemble, chacune regardant toutes les autres du contexte",
        pieges: [
          "il lit le texte dans les deux sens avant de produire sa réponse",
          "il lit le texte par blocs de taille fixe, indépendants les uns des autres",
          "c'est exact : c'est ce qui explique l'affichage progressif de la réponse",
        ],
        pourquoi:
          "C'est précisément ce qui l'a distingué des architectures antérieures, qui traitaient en séquence.",
      },
      {
        affirmation: "Le modèle manipule directement les mots du texte.",
        bonne: "il manipule des jetons, morceaux de mots convertis en vecteurs de nombres",
        pieges: [
          "il manipule des phrases entières, converties en une représentation unique",
          "il manipule des lettres, ce qui explique ses erreurs d'orthographe",
          "c'est exact : chaque mot du dictionnaire a sa place dans le modèle",
        ],
        pourquoi:
          "Le découpage en jetons explique bien des comportements, dont la difficulté à compter les lettres d'un mot.",
      },
      {
        affirmation: "La « fenêtre de contexte » est la mémoire des conversations passées.",
        bonne: "c'est ce que le modèle peut prendre en compte EN UNE FOIS : au-delà, le début sort du champ",
        pieges: [
          "c'est la quantité de texte qu'il peut produire dans une seule réponse",
          "c'est le nombre de conversations qu'il conserve pour un utilisateur",
          "c'est la période de l'actualité couverte par son entraînement",
        ],
        pourquoi:
          "Rien n'est mémorisé d'une session à l'autre. Ce qui « sort de la fenêtre » cesse simplement d'exister pour le modèle.",
      },
      {
        affirmation: "Deux modèles ayant la même architecture donnent les mêmes réponses.",
        bonne: "l'architecture n'est qu'un plan : ce sont les données et l'entraînement qui font le modèle",
        pieges: [
          "c'est exact à taille égale, l'architecture déterminant le comportement",
          "c'est exact s'ils ont été entraînés sur la même quantité de données",
          "c'est faux : deux modèles ne partagent jamais la même architecture",
        ],
        pourquoi:
          "Les grands modèles actuels partagent largement une même famille d'architecture, et diffèrent beaucoup.",
      },
      {
        affirmation: "Le transformateur a été inventé pour les agents conversationnels.",
        bonne: "il a été proposé en 2017 pour la traduction automatique : l'usage conversationnel est venu après",
        pieges: [
          "il a été proposé pour la reconnaissance d'images, puis adapté au texte",
          "il a été proposé en 2022, en même temps que les premiers agents publics",
          "c'est exact : c'est l'architecture conçue spécifiquement pour dialoguer",
        ],
        pourquoi:
          "« Attention Is All You Need » traite de traduction. La généralisation à tout le langage a suivi.",
      },
    ],
  }),
];
