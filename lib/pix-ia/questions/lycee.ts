import type { PixQuestion } from "../questionTypes";

// Questions paliers AVANCÉ / EXPERT (niveau lycée — pertinent dès la seconde
// avec l'introduction de cours d'IA). Couvrent les microskills A/E déjà encodés
// dans lib/pix-ia/microskills.ts. ⚠️ La compétence 3.4 n'a pas de microskill
// A/E : en mode lycée, l'éval y bascule sur une question N/I (fallback moteur).
export const lyceeQuestions: PixQuestion[] = [
  // ── Domaine 1 — Fondements ────────────────────────────────────────────────
  {
    microskillId: "1.1.4",
    text: "Quelles disciplines ont contribué au développement de l'IA ?",
    choices: [
      "l'informatique, les sciences cognitives, la science des données, la robotique",
      "l'informatique seule, les autres domaines n'étant que des champs d'application",
      "l'informatique et les mathématiques, les sciences humaines venant plus tard",
      "l'informatique et la neurologie, dont l'IA reproduit les découvertes",
    ],
  },
  {
    microskillId: "1.1.4",
    text: "Les sciences cognitives apportent à l'IA :",
    choices: [
      "une compréhension des processus mentaux dont les modèles s'inspirent",
      "une mesure de l'intelligence permettant de comparer humains et machines",
      "les données de perception et de raisonnement servant à l'entraînement",
      "la preuve qu'un ordinateur peut reproduire à l'identique un cerveau",
    ],
  },
  {
    microskillId: "1.1.5",
    text: "L'IA symbolique repose surtout sur :",
    choices: [
      "des règles et des raisonnements écrits explicitement",
      "des exemples dont le système déduit seul les régularités",
      "des symboles mathématiques manipulés par des réseaux de neurones",
      "une base de connaissances construite automatiquement à partir du Web",
    ],
  },
  {
    microskillId: "1.1.5",
    text: "L'apprentissage automatique se distingue de l'IA symbolique car il :",
    choices: [
      "apprend des comportements à partir de données, au lieu de règles écrites",
      "s'appuie sur des règles, mais les applique beaucoup plus rapidement",
      "traite le langage naturel, là où l'IA symbolique traite les nombres",
      "est apparu le premier, avant que les règles explicites ne le remplacent",
    ],
  },
  {
    microskillId: "1.1.6",
    text: "Les « hivers de l'IA » désignent :",
    choices: [
      "des périodes de baisse des financements et de l'intérêt pour l'IA",
      "les phases où la recherche s'est concentrée sur la seule théorie",
      "les années où l'IA symbolique a cédé la place à l'apprentissage",
      "les moments où les machines manquaient de puissance de calcul",
    ],
  },
  {
    microskillId: "1.1.6",
    text: "L'expression « intelligence artificielle » a été adoptée :",
    choices: [
      "à la conférence de Dartmouth, au milieu des années 1950",
      "avec les premiers succès de l'apprentissage profond, vers 2012",
      "dans les travaux d'Alan Turing sur la machine pensante, en 1950",
      "à la mise au point du premier ordinateur programmable, en 1945",
    ],
  },
  {
    microskillId: "1.1.7",
    text: "L'« hybridation » des approches en IA consiste à :",
    choices: [
      "combiner méthodes symboliques et apprentissage automatique",
      "entraîner un même modèle sur des données de plusieurs natures",
      "faire coopérer plusieurs modèles statistiques sur une même tâche",
      "traduire des règles écrites en données d'entraînement étiquetées",
    ],
  },
  {
    microskillId: "1.1.7",
    text: "Quel intérêt y a-t-il à joindre des règles explicites à un modèle appris ?",
    choices: [
      "garantir certaines contraintes que l'apprentissage seul ne assure pas",
      "réduire la quantité de calcul nécessaire pour entraîner le modèle",
      "permettre au modèle de fonctionner sans données d'entraînement",
      "rendre le modèle capable d'apprendre pendant qu'on l'utilise",
    ],
  },
  {
    microskillId: "1.1.7",
    text: "Un assistant qui appelle un solveur exact pour un calcul illustre :",
    choices: [
      "une hybridation : le modèle appris délègue à une méthode exacte",
      "un apprentissage par renforcement guidé par un système de règles",
      "un modèle symbolique enrichi d'exemples fournis par l'utilisateur",
      "un réseau de neurones entraîné spécialement sur des calculs",
    ],
  },
  {
    microskillId: "1.2.4",
    text: "Dans l'apprentissage par renforcement, le modèle apprend :",
    choices: [
      "par essais et erreurs, en cherchant à maximiser une récompense",
      "à partir d'exemples déjà accompagnés de la réponse attendue",
      "en repérant seul des regroupements dans des données brutes",
      "en imitant la trajectoire d'un expert enregistrée à l'avance",
    ],
  },
  {
    microskillId: "1.2.4",
    text: "Un système de récompense, en apprentissage par renforcement, sert à :",
    choices: [
      "attribuer un score aux actions pour orienter l'apprentissage",
      "indiquer au modèle la bonne action à chaque étape du problème",
      "mesurer la performance finale, une fois l'entraînement terminé",
      "arrêter l'entraînement dès que le modèle atteint un bon niveau",
    ],
  },
  {
    microskillId: "1.2.5",
    text: "Pour entraîner une IA à jouer à un jeu par renforcement, une bonne récompense serait :",
    choices: [
      "gagner la partie, ou marquer des points au fil du jeu",
      "le nombre de coups joués depuis le début de la partie",
      "la ressemblance entre ses coups et ceux d'un bon joueur",
      "le temps qu'elle met à choisir chacun de ses coups",
    ],
  },
  {
    microskillId: "1.2.5",
    text: "Pourquoi une récompense mal choisie peut-elle poser problème ?",
    choices: [
      "le modèle optimise ce qu'on mesure, pas ce qu'on voulait obtenir",
      "le modèle refuse d'apprendre et s'arrête avant la fin de l'entraînement",
      "la récompense doit être identique à chaque étape, sinon rien ne converge",
      "une récompense trop simple allonge beaucoup la durée de l'entraînement",
    ],
  },
  {
    microskillId: "1.2.5",
    text: "Un robot livreur récompensé uniquement sur la vitesse risque de :",
    choices: [
      "aller vite au détriment de la sécurité, qu'on n'a pas mesurée",
      "ralentir, la vitesse étant plus difficile à mesurer que la distance",
      "ne jamais terminer sa livraison, faute de récompense à l'arrivée",
      "reproduire exactement le trajet appris pendant son entraînement",
    ],
  },
  {
    microskillId: "1.2.6",
    text: "L'apprentissage non supervisé sert surtout à :",
    choices: [
      "repérer des structures ou des groupes dans des données non étiquetées",
      "prédire une étiquette à partir d'exemples dont on connaît la réponse",
      "améliorer un modèle grâce aux récompenses reçues à chaque action",
      "réduire le nombre d'exemples nécessaires à un apprentissage supervisé",
    ],
  },
  {
    microskillId: "1.2.6",
    text: "Supervisé, non supervisé, par renforcement : ce qui les distingue, c'est :",
    choices: [
      "la nature du retour dont le modèle dispose pour apprendre",
      "la quantité de données que chacun d'eux exige pour fonctionner",
      "le type de modèle employé : arbre, réseau de neurones ou régression",
      "le moment de l'apprentissage : avant, pendant, ou après la mise en service",
    ],
  },
  {
    microskillId: "1.2.6",
    text: "Regrouper des clients aux comportements d'achat proches, sans catégories fixées, relève de :",
    choices: [
      "l'apprentissage non supervisé",
      "l'apprentissage supervisé",
      "l'apprentissage par renforcement",
      "l'apprentissage par transfert",
    ],
  },
  {
    microskillId: "1.2.7",
    text: "Tes données ne sont PAS étiquetées et tu cherches à former des groupes. Tu utilises :",
    choices: [
      "de l'apprentissage non supervisé",
      "de l'apprentissage supervisé",
      "de l'apprentissage par renforcement",
      "une régression linéaire simple",
    ],
  },
  {
    microskillId: "1.2.7",
    text: "Tu disposes de 10 000 radios déjà annotées par des médecins. La méthode adaptée est :",
    choices: [
      "l'apprentissage supervisé, puisque la réponse attendue est connue",
      "l'apprentissage non supervisé, pour laisser le modèle trouver seul",
      "l'apprentissage par renforcement, en récompensant les bons diagnostics",
      "aucune : 10 000 exemples ne suffisent jamais à entraîner un modèle",
    ],
  },
  {
    microskillId: "1.2.7",
    text: "Un robot doit apprendre à saisir des objets par lui-même, sans exemple de geste correct. On choisit :",
    choices: [
      "l'apprentissage par renforcement, guidé par le succès de la prise",
      "l'apprentissage supervisé, à partir de vidéos de gestes humains",
      "l'apprentissage non supervisé, pour regrouper les objets similaires",
      "une régression, pour prédire la position exacte de chaque objet",
    ],
  },
  {
    microskillId: "1.2.8",
    text: "Introduire volontairement des contraintes (biais) dans un modèle peut servir à :",
    choices: [
      "limiter sa complexité et l'orienter vers de bonnes solutions",
      "compenser les erreurs présentes dans les données d'entraînement",
      "accélérer les calculs sans modifier ce que le modèle apprend",
      "garantir que le modèle ne reproduira aucune discrimination",
    ],
  },
  {
    microskillId: "1.2.8",
    text: "Un « biais volontaire » au sens technique et un « biais discriminatoire » :",
    choices: [
      "sont deux choses différentes : l'un est un choix, l'autre un défaut",
      "désignent la même chose, vue par l'ingénieur ou par l'utilisateur",
      "viennent tous deux des données sur lesquelles on a entraîné le modèle",
      "s'annulent l'un l'autre quand on les combine dans un même modèle",
    ],
  },
  {
    microskillId: "1.2.8",
    text: "Imposer à un modèle de prédiction météo de respecter la physique de l'atmosphère, c'est :",
    choices: [
      "introduire une contrainte utile, qui restreint les solutions possibles",
      "supprimer un biais, puisqu'on remplace les données par des lois",
      "renoncer à l'apprentissage automatique au profit de règles écrites",
      "risquer une discrimination, le modèle n'étant plus libre de ses choix",
    ],
  },
  {
    microskillId: "1.3.5",
    text: "Une régression peut être utilisée dans l'entraînement d'une IA pour :",
    choices: [
      "prédire une valeur chiffrée à partir d'autres variables observées",
      "répartir les exemples dans des catégories définies à l'avance",
      "mesurer l'écart entre la prédiction du modèle et la valeur réelle",
      "sélectionner les variables qui serviront à entraîner le modèle",
    ],
  },
  {
    microskillId: "1.3.5",
    text: "Pendant l'entraînement, la « fonction de coût » sert à :",
    choices: [
      "mesurer l'écart entre les prédictions du modèle et les valeurs attendues",
      "évaluer le prix en calcul, donc en énergie, de chaque étape d'entraînement",
      "décider combien de couches et de neurones le modèle doit comporter",
      "vérifier que le modèle fonctionne encore sur des données inconnues",
    ],
  },
  {
    microskillId: "1.3.5",
    text: "Prédire le temps de trajet d'un bus à partir de l'heure et de la météo relève de :",
    choices: [
      "la régression : la valeur à prédire est un nombre",
      "la classification : on range le trajet dans une catégorie",
      "le regroupement : on rassemble les trajets qui se ressemblent",
      "la recommandation : on propose le meilleur trajet possible",
    ],
  },
  {
    microskillId: "1.3.6",
    text: "Les réseaux de neurones sont particulièrement utiles pour :",
    choices: [
      "traiter des données non structurées : images, sons, textes",
      "traiter des tableaux de chiffres comportant peu de colonnes",
      "produire des décisions qu'un humain peut relire et justifier",
      "apprendre correctement à partir d'un très petit nombre d'exemples",
    ],
  },
  {
    microskillId: "1.3.6",
    text: "Pourquoi les réseaux de neurones ont-ils pris tant d'importance depuis 2012 ?",
    choices: [
      "la puissance de calcul et les grands jeux de données les ont rendus efficaces",
      "ils ont été inventés à cette date, après des décennies de recherche théorique",
      "ils sont devenus plus faciles à interpréter que les autres modèles",
      "les autres méthodes d'apprentissage ont été abandonnées à ce moment",
    ],
  },
  {
    microskillId: "1.3.6",
    text: "Reconnaître une plante sur une photo prise au jardin fait plutôt appel à :",
    choices: [
      "un réseau de neurones, adapté aux images",
      "un arbre de décision, plus simple à interpréter",
      "une régression linéaire, appliquée aux pixels",
      "un regroupement automatique des photos proches",
    ],
  },
  {
    microskillId: "1.3.7",
    text: "Un modèle « boîte noire » pose problème car :",
    choices: [
      "il est difficile d'expliquer ou de justifier ses décisions",
      "il donne des résultats moins bons que les modèles simples",
      "il ne peut pas être testé sur des données qu'il n'a jamais vues",
      "il change de réponse chaque fois qu'on lui pose la même question",
    ],
  },
  {
    microskillId: "1.3.7",
    text: "Dans quel domaine l'absence d'explication d'un modèle pose-t-elle le plus problème ?",
    choices: [
      "l'attribution d'un crédit ou l'aide au diagnostic médical",
      "la recommandation de musiques sur une plateforme d'écoute",
      "la retouche automatique des photos prises avec un téléphone",
      "la traduction d'un texte d'une langue vers une autre langue",
    ],
  },
  {
    microskillId: "1.3.7",
    text: "Face à un modèle peu explicable, une réponse raisonnable consiste à :",
    choices: [
      "garder une décision humaine sur les cas aux conséquences lourdes",
      "renoncer complètement à l'apprentissage automatique dans ce domaine",
      "publier le code source du modèle, ce qui rend sa décision claire",
      "augmenter la taille du modèle, un modèle plus grand étant plus sûr",
    ],
  },
  {
    microskillId: "1.3.8",
    text: "Comparé à un réseau de neurones, un arbre de décision est généralement :",
    choices: [
      "plus facile à interpréter, mais moins puissant sur des données complexes",
      "plus puissant sur les images, mais plus difficile à mettre en œuvre",
      "équivalent en performance, la différence portant sur le temps de calcul",
      "plus lent à entraîner, mais capable de traiter davantage de données",
    ],
  },
  {
    microskillId: "1.3.8",
    text: "Pour prédire un risque à partir d'un tableau de vingt colonnes chiffrées, on essaiera d'abord :",
    choices: [
      "un arbre de décision ou une régression, simples et lisibles",
      "un grand réseau de neurones, plus performant en toutes circonstances",
      "un modèle de langage, capable de traiter n'importe quelle donnée",
      "un regroupement automatique, pour repérer les cas les plus risqués",
    ],
  },
  {
    microskillId: "1.3.8",
    text: "Choisir un modèle, c'est arbitrer entre :",
    choices: [
      "la performance, l'interprétabilité et les moyens dont on dispose",
      "la vitesse d'entraînement et la vitesse de réponse à l'utilisateur",
      "la taille des données disponibles et le nombre d'utilisateurs prévus",
      "l'ancienneté de la méthode et sa popularité dans la recherche",
    ],
  },
  {
    microskillId: "1.4.6",
    text: "Quand une IA générative fait un calcul exact ou cherche sur le Web, elle :",
    choices: [
      "fait appel à un outil extérieur, spécialisé dans cette tâche",
      "mobilise une partie de son modèle entraînée pour ces tâches",
      "retrouve le résultat parmi les données de son entraînement",
      "estime le résultat le plus probable, comme pour un texte",
    ],
  },
  {
    microskillId: "1.4.7",
    text: "Le « transformateur » est :",
    choices: [
      "un réseau de neurones du texte, fondé sur un mécanisme d'attention",
      "une méthode qui convertit un texte en nombres avant traitement",
      "l'étape d'entraînement où le modèle apprend à suivre des consignes",
      "le programme qui découpe un texte en unités appelées jetons",
    ],
  },
  {
    microskillId: "1.4.7",
    text: "Le mécanisme d'« attention » d'un transformateur sert à :",
    choices: [
      "pondérer quels mots du contexte comptent le plus à chaque instant",
      "vérifier que le texte produit reste conforme à la consigne donnée",
      "limiter la longueur du texte que le modèle peut traiter d'un coup",
      "repérer les passages du texte dont le modèle n'est pas certain",
    ],
  },
  {
    microskillId: "1.5.5",
    text: "Le « filtrage collaboratif » recommande des contenus :",
    choices: [
      "d'après les goûts d'utilisateurs aux préférences voisines des tiennes",
      "d'après les caractéristiques des contenus que tu as déjà appréciés",
      "d'après les notes et les commentaires laissés par la communauté",
      "d'après ce que les créateurs eux-mêmes signalent comme semblable",
    ],
  },
  {
    microskillId: "1.5.5",
    text: "Le filtrage « par contenu » recommande :",
    choices: [
      "des éléments dont les caractéristiques ressemblent à ceux que tu aimes",
      "des éléments appréciés par des utilisateurs qui te ressemblent",
      "des éléments les plus consultés dans la catégorie que tu regardes",
      "des éléments choisis pour élargir volontairement tes habitudes",
    ],
  },
  {
    microskillId: "1.5.6",
    text: "Le problème du « démarrage à froid » survient quand :",
    choices: [
      "on manque encore de données sur un nouvel utilisateur ou un contenu",
      "le système doit traiter un très grand nombre d'utilisateurs d'un coup",
      "l'utilisateur ne consulte plus le service pendant une longue période",
      "les goûts d'un utilisateur changent trop vite pour être suivis",
    ],
  },
  {
    microskillId: "1.5.6",
    text: "Comment un service atténue-t-il le démarrage à froid d'un nouvel inscrit ?",
    choices: [
      "en lui proposant des contenus populaires, puis en affinant peu à peu",
      "en attendant qu'il ait consulté assez de contenus pour lui proposer",
      "en recopiant les recommandations d'un autre utilisateur au hasard",
      "en lui demandant de saisir l'ensemble de ses goûts à l'inscription",
    ],
  },
  {
    microskillId: "1.5.6",
    text: "Une conséquence du démarrage à froid pour un contenu nouvellement publié est :",
    choices: [
      "qu'il est peu recommandé, faute d'interactions permettant de le situer",
      "qu'il est très recommandé, les plateformes favorisant la nouveauté",
      "qu'il n'est visible que par les abonnés de son auteur pendant un temps",
      "qu'il est écarté tant qu'un modérateur ne l'a pas explicitement validé",
    ],
  },
  {
    microskillId: "1.5.7",
    text: "Les systèmes de recommandation sont le plus souvent entraînés par apprentissage :",
    choices: [
      "supervisé, à partir des interactions passées des utilisateurs",
      "non supervisé, en regroupant les contenus qui se ressemblent",
      "par renforcement, chaque clic servant de récompense immédiate",
      "sans apprentissage : ce sont des règles écrites par les équipes",
    ],
  },
  {
    microskillId: "1.5.7",
    text: "Dans un système de recommandation, que joue le rôle d'« étiquette » ?",
    choices: [
      "ce que l'utilisateur a fait ensuite : cliquer, regarder, abandonner",
      "la catégorie dans laquelle le créateur a rangé son contenu",
      "la note sur cinq attribuée par la moyenne des utilisateurs",
      "le classement du contenu dans les tendances du moment",
    ],
  },
  {
    microskillId: "1.5.7",
    text: "Pourquoi entraîner un système de recommandation sur les seuls clics peut-il tromper ?",
    choices: [
      "un clic mesure l'attention attirée, pas la satisfaction obtenue",
      "les clics sont trop peu nombreux pour entraîner un modèle fiable",
      "les clics ne sont pas conservés assez longtemps par les plateformes",
      "un clic ne peut pas servir d'étiquette dans un apprentissage supervisé",
    ],
  },
  {
    microskillId: "1.5.8",
    text: "Analyser les effets d'un algorithme de recommandation, c'est étudier :",
    choices: [
      "comment il influence les comportements et les opinions des utilisateurs",
      "avec quelle exactitude il devine le prochain contenu qui sera consulté",
      "combien de temps il met à calculer les suggestions qu'il affiche",
      "quelle proportion du catalogue il parvient à mettre en avant",
    ],
  },
  {
    microskillId: "1.5.8",
    text: "Un algorithme réglé pour maximiser le temps passé sur l'application peut :",
    choices: [
      "favoriser les contenus qui retiennent, sans regarder leur qualité",
      "favoriser les contenus les plus longs, quel que soit leur intérêt",
      "réduire la diversité des créateurs mis en avant sur la plateforme",
      "afficher davantage de publicités pour compenser le temps gagné",
    ],
  },
  {
    microskillId: "1.5.8",
    text: "Pourquoi est-il difficile de prouver qu'une recommandation a changé une opinion ?",
    choices: [
      "beaucoup d'autres causes agissent en même temps sur une personne",
      "les plateformes n'enregistrent pas ce que chaque utilisateur a vu",
      "les opinions ne peuvent pas être mesurées de façon chiffrée",
      "l'algorithme change trop souvent pour qu'une étude soit possible",
    ],
  },
  {
    microskillId: "1.6.5",
    text: "Un robot intelligent relie perception, décision et action grâce à :",
    choices: [
      "des capteurs, des modèles d'IA et des actionneurs",
      "un programme unique qui traite toutes ces étapes",
      "une liaison permanente avec un serveur de calcul",
      "un opérateur humain qui valide chaque déplacement",
    ],
  },

  // ── Domaine 2 — Usages et applications ────────────────────────────────────
  {
    microskillId: "2.1.5",
    text: "Prédire les pannes d'une machine ou le trafic routier relève de :",
    choices: [
      "la prédiction par l'IA",
      "la génération de contenu",
      "la reconnaissance de formes",
      "la recommandation ciblée",
    ],
  },
  {
    microskillId: "2.1.6",
    text: "Les assistants à base d'IA générative deviennent polyvalents car ils peuvent :",
    choices: [
      "appeler d'autres outils : recherche, calcul, programmation",
      "avoir été entraînés sur des données de tous les domaines",
      "apprendre de chaque conversation qu'ils ont avec les utilisateurs",
      "combiner plusieurs modèles de langage dans une même réponse",
    ],
  },
  {
    microskillId: "2.2.5",
    text: "Interroger une IA « multimodale » signifie :",
    choices: [
      "lui fournir aussi des images ou du son, pas seulement du texte",
      "lui poser la même question de plusieurs façons pour comparer",
      "employer plusieurs modèles et confronter ce qu'ils répondent",
      "obtenir une réponse sous plusieurs formes : texte, tableau, schéma",
    ],
  },
  {
    microskillId: "2.2.6",
    text: "Pour fiabiliser la réponse d'une IA générative, la meilleure méthode est de :",
    choices: [
      "la croiser avec des sources que l'on peut identifier",
      "demander au modèle d'indiquer son degré de certitude",
      "reposer la question et comparer les deux réponses obtenues",
      "préciser dans la consigne qu'il ne doit rien inventer",
    ],
  },
  {
    microskillId: "2.3.5",
    text: "Pourquoi de faux contenus produits par des bots se diffusent-ils massivement ?",
    choices: [
      "les algorithmes amplifient ce qui fait réagir, sans juger du vrai",
      "les bots publient plus vite que les plateformes ne peuvent modérer",
      "les faux contenus sont plus courts, donc plus faciles à partager",
      "les plateformes n'ont aucun moyen de distinguer un bot d'un humain",
    ],
  },
  {
    microskillId: "2.3.6",
    text: "Appliquer le fact-checking, c'est notamment :",
    choices: [
      "identifier l'auteur, ses intentions, et vérifier dans d'autres sources",
      "attendre qu'un organisme spécialisé publie sa vérification du contenu",
      "comparer le contenu à ce qu'en disent les commentaires les plus votés",
      "vérifier que l'information est reprise par un grand nombre de comptes",
    ],
  },
  {
    microskillId: "2.4.5",
    text: "Modifier les paramètres de recommandation de ton compte permet de :",
    choices: [
      "reprendre une part de contrôle sur les contenus proposés",
      "supprimer définitivement les données déjà collectées sur toi",
      "obtenir les mêmes suggestions que les autres utilisateurs",
      "empêcher la plateforme d'enregistrer ce que tu regardes",
    ],
  },
  {
    microskillId: "2.4.6",
    text: "Mettre en œuvre une diversification des contenus, c'est :",
    choices: [
      "aller volontairement chercher d'autres sources et points de vue",
      "s'abonner à davantage de comptes dans les domaines qu'on suit",
      "laisser l'algorithme proposer, en cliquant sur tout ce qui passe",
      "changer régulièrement d'application pour varier les propositions",
    ],
  },
  {
    microskillId: "2.5.5",
    text: "La génération augmentée par récupération (RAG) consiste à :",
    choices: [
      "faire chercher le modèle dans une base de documents avant de répondre",
      "réentraîner le modèle sur les documents propres à l'organisation",
      "faire relire la réponse du modèle par un second modèle vérificateur",
      "demander au modèle de citer les sources dont il se souvient",
    ],
  },
  {
    microskillId: "2.5.5",
    text: "L'intérêt principal du RAG est de :",
    choices: [
      "réduire les hallucinations en appuyant la réponse sur des documents",
      "diminuer le coût de calcul en raccourcissant les réponses produites",
      "permettre au modèle d'apprendre en continu des documents fournis",
      "garantir que la réponse ne contiendra aucune donnée personnelle",
    ],
  },
  {
    microskillId: "2.5.6",
    text: "Une charte interne d'usage de l'IA dans une organisation sert à :",
    choices: [
      "encadrer les usages autorisés et protéger les données traitées",
      "choisir l'outil d'IA que l'ensemble du personnel devra employer",
      "attester auprès des clients que l'organisation respecte l'IA Act",
      "répartir le budget consacré aux outils d'intelligence artificielle",
    ],
  },

  // ── Domaine 3 — Enjeux ────────────────────────────────────────────────────
  {
    microskillId: "3.1.5",
    text: "L'empreinte carbone de l'IA comprend des émissions :",
    choices: [
      "directes, liées au calcul, et indirectes, liées au matériel",
      "directes uniquement : ce sont les serveurs qui consomment",
      "concentrées sur l'entraînement, l'usage n'émettant presque rien",
      "difficiles à distinguer de celles du reste d'Internet",
    ],
  },
  {
    microskillId: "3.1.6",
    text: "L'« IA frugale » cherche à :",
    choices: [
      "obtenir de bonnes performances avec moins de calcul et d'énergie",
      "réserver l'IA aux usages que la loi européenne juge acceptables",
      "réduire le nombre de données personnelles utilisées à l'entraînement",
      "faire tourner les modèles sur l'appareil plutôt que sur un serveur",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "L'IA Act européen impose des obligations renforcées surtout pour :",
    choices: [
      "les usages à risque élevé : santé, justice, éducation",
      "les modèles les plus puissants, quel que soit leur usage",
      "les services accessibles gratuitement au grand public",
      "les systèmes conçus hors de l'Union européenne",
    ],
  },
  {
    microskillId: "3.3.3",
    text: "Un modèle « à poids ouverts » (open weight) est un modèle dont :",
    choices: [
      "les paramètres appris pendant l'entraînement sont rendus publics",
      "le code et les données d'entraînement sont librement consultables",
      "l'usage est autorisé gratuitement, y compris à titre commercial",
      "le fonctionnement interne peut être expliqué décision par décision",
    ],
  },
  {
    microskillId: "3.3.4",
    text: "Différencier les modèles selon leur « explicabilité », c'est regarder :",
    choices: [
      "à quel point on peut comprendre et justifier leurs décisions",
      "à quel point leurs réponses sont rédigées de façon claire",
      "si leurs paramètres et leur code ont été publiés par l'éditeur",
      "s'ils indiquent les sources sur lesquelles ils se sont appuyés",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "Les IA entraînées surtout sur des contenus en anglais peuvent :",
    choices: [
      "sous-représenter d'autres langues et les cultures qu'elles portent",
      "traduire moins vite, mais avec la même justesse, les autres langues",
      "refuser de répondre lorsqu'on les interroge dans une autre langue",
      "imposer la syntaxe anglaise aux textes qu'elles produisent en français",
    ],
  },

  // ── Renfort lycée (rejouabilité des compétences A/E les plus minces) ──────
  {
    microskillId: "1.6.5",
    text: "Pour saisir un objet, un robot intelligent peut :",
    choices: [
      "le repérer par vision par ordinateur, puis planifier son mouvement",
      "appliquer une séquence de gestes enregistrée une fois pour toutes",
      "mesurer sa distance par capteur, la forme important peu à la prise",
      "reproduire le geste d'un opérateur qui le guide à chaque tentative",
    ],
  },
  {
    microskillId: "1.6.5",
    text: "Quand un robot améliore ses gestes au fil du temps, il utilise :",
    choices: [
      "l'apprentissage automatique, à partir de ses essais",
      "une mise à jour de son programme, faite par un technicien",
      "un enregistrement de ses gestes, qu'il rejoue à l'identique",
      "une correction envoyée par le fabricant après chaque échec",
    ],
  },
  {
    microskillId: "1.6.5",
    text: "Dans le monde réel, la boucle perception → décision → action d'un robot doit :",
    choices: [
      "se répéter très vite, pour tenir compte de ce qui change",
      "s'exécuter une fois, le plan étant ensuite suivi jusqu'au bout",
      "se dérouler à l'arrêt, le robot n'agissant qu'une fois décidé",
      "être validée par un opérateur avant chaque nouvelle action",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "Selon l'IA Act, un usage classé « interdit » est :",
    choices: [
      "un usage jugé inacceptable, comme la notation sociale généralisée",
      "un usage autorisé seulement après une autorisation administrative",
      "un usage réservé aux autorités publiques dans un cadre encadré",
      "un usage qui n'a pas encore été évalué par les autorités européennes",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "L'IA Act européen adopte une approche :",
    choices: [
      "par niveau de risque",
      "par secteur d'activité",
      "par taille d'entreprise",
      "par technologie employée",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "Pourquoi la santé et la justice sont-elles « à risque élevé » pour l'IA ?",
    choices: [
      "parce qu'une erreur peut avoir de lourdes conséquences sur les personnes",
      "parce que ces domaines manipulent d'importants volumes de données",
      "parce que les professionnels y sont peu formés aux outils numériques",
      "parce que les modèles y sont moins fiables que dans les autres secteurs",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "Pourquoi les langues peu parlées sont-elles souvent moins bien gérées par les IA ?",
    choices: [
      "parce qu'il existe beaucoup moins de textes disponibles dans ces langues",
      "parce que leur grammaire est plus irrégulière que celle des grandes langues",
      "parce que les modèles traduisent d'abord vers l'anglais avant de répondre",
      "parce que peu d'utilisateurs les emploient pour interroger ces modèles",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "Comparer deux IA génératives sur un sujet sensible permet de repérer :",
    choices: [
      "des biais culturels ou linguistiques qui diffèrent d'un modèle à l'autre",
      "laquelle des deux se trompe, puisqu'elles ne peuvent pas se tromper toutes deux",
      "le modèle le plus récent, reconnaissable à la qualité de sa rédaction",
      "les sources d'entraînement, qu'une comparaison suffit à faire apparaître",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "En s'entraînant sur d'immenses corpus, une IA générative peut imiter des œuvres :",
    choices: [
      "sans que les créateurs soient identifiés, reconnus ni rémunérés",
      "en citant systématiquement l'auteur dont elle reprend le style",
      "uniquement lorsque l'utilisateur le lui demande expressément",
      "sans jamais reproduire d'éléments reconnaissables d'une œuvre",
    ],
  },
  {
    microskillId: "2.1.5",
    text: "Un modèle qui estime le risque de panne d'un moteur fait de la :",
    choices: [
      "prédiction, appelée maintenance prédictive",
      "classification des pièces selon leur usure",
      "détection d'anomalie dans le fonctionnement",
      "recommandation d'un calendrier d'entretien",
    ],
  },
  {
    microskillId: "2.1.6",
    text: "Un assistant génératif « augmenté » peut, en plus de discuter :",
    choices: [
      "lancer une recherche, un calcul, ou exécuter du code",
      "modifier son propre entraînement au fil des échanges",
      "garantir l'exactitude des informations qu'il avance",
      "accéder aux documents privés de tous ses utilisateurs",
    ],
  },
  {
    microskillId: "2.2.5",
    text: "Donner une photo à une IA et lui demander de la décrire est un usage :",
    choices: ["multimodal", "génératif seul", "conversationnel", "documentaire"],
  },
  {
    microskillId: "2.2.6",
    text: "Avant d'utiliser une réponse d'IA dans un devoir noté, tu devrais :",
    choices: [
      "en vérifier les informations auprès de sources identifiables",
      "la reformuler avec tes mots, ce qui suffit à la rendre fiable",
      "demander au modèle de confirmer que sa réponse est exacte",
      "indiquer que tu as utilisé une IA, ce qui dispense de vérifier",
    ],
  },
  {
    microskillId: "2.3.5",
    text: "Des « bots » sur les réseaux sociaux servent parfois à :",
    choices: [
      "publier en masse pour donner l'illusion d'une opinion partagée",
      "repérer automatiquement les contenus faux avant leur diffusion",
      "répondre aux utilisateurs à la place du service après-vente",
      "signaler aux plateformes les comptes qui enfreignent les règles",
    ],
  },
  {
    microskillId: "2.3.6",
    text: "Face à un fait douteux, « recouper » signifie :",
    choices: [
      "vérifier qu'il figure dans plusieurs sources indépendantes",
      "vérifier qu'il figure dans plusieurs articles qui se citent l'un l'autre",
      "vérifier qu'il n'a pas été démenti dans les commentaires du contenu",
      "vérifier que la source d'origine est plus ancienne que sa reprise",
    ],
  },
  {
    microskillId: "2.4.5",
    text: "Désactiver la personnalisation dans une application permet :",
    choices: [
      "de voir des contenus moins filtrés par tes habitudes",
      "d'effacer l'historique déjà enregistré sur ton compte",
      "d'empêcher toute collecte de données pendant l'usage",
      "de recevoir davantage de contenus récents et populaires",
    ],
  },
  {
    microskillId: "2.4.6",
    text: "Suivre des sources aux points de vue variés aide surtout à :",
    choices: [
      "sortir de l'enfermement et de la chambre d'écho",
      "obtenir des recommandations mieux ajustées à tes goûts",
      "réduire le temps que tu passes sur l'application",
      "vérifier plus vite les informations que tu rencontres",
    ],
  },
  {
    microskillId: "3.1.5",
    text: "Mesurer l'empreinte environnementale de l'IA est difficile car :",
    choices: [
      "les infrastructures sont mondiales et les chiffres peu publiés",
      "la consommation varie trop d'un jour à l'autre pour être suivie",
      "aucune méthode de calcul n'a encore été proposée pour le faire",
      "l'énergie utilisée est mêlée à celle des autres services en ligne",
    ],
  },
  {
    microskillId: "3.1.6",
    text: "Cibler en priorité les usages d'IA à réelle valeur ajoutée est une démarche :",
    choices: [
      "réfléchie, qui limite la consommation d'énergie inutile",
      "technique, qui vise à améliorer la qualité des réponses",
      "réglementaire, imposée par l'IA Act aux organisations",
      "économique, qui ne dit rien de l'impact environnemental",
    ],
  },
  {
    microskillId: "3.3.3",
    text: "Publier les « poids » d'un modèle (open weight) permet à d'autres de :",
    choices: [
      "le réutiliser, l'ajuster ou l'étudier sans repartir de zéro",
      "reconstituer les données sur lesquelles il a été entraîné",
      "comprendre en détail comment il parvient à chaque réponse",
      "l'utiliser sans aucune restriction commerciale ni condition",
    ],
  },
  {
    microskillId: "3.3.4",
    text: "Un modèle très « explicable » est surtout utile quand :",
    choices: [
      "une décision importante doit pouvoir être justifiée",
      "le modèle traite de très grandes quantités de données",
      "les utilisateurs ne sont pas spécialistes du domaine",
      "le modèle doit répondre le plus rapidement possible",
    ],
  },
  {
    microskillId: "1.4.6",
    text: "Quand tu demandes un calcul précis à une IA générative, il vaut mieux qu'elle :",
    choices: [
      "passe par un outil de calcul, plutôt que d'estimer le résultat",
      "détaille toutes les étapes, ce qui garantit un résultat exact",
      "refasse le calcul plusieurs fois et garde le résultat le plus fréquent",
      "s'appuie sur les calculs semblables vus pendant son entraînement",
    ],
  },
  {
    microskillId: "2.5.6",
    text: "Une charte d'usage de l'IA en entreprise précise notamment :",
    choices: [
      "les tâches autorisées et les précautions à prendre sur les données",
      "les modèles d'IA que la direction a retenus après comparaison",
      "le niveau de risque de chaque usage au sens de l'IA Act européen",
      "la formation que chaque salarié doit suivre avant d'utiliser l'IA",
    ],
  },
];
