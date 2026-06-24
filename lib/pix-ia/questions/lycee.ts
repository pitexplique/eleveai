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
      "l'informatique, les sciences cognitives, la science des données et la robotique",
      "uniquement la cuisine",
      "seulement la musique",
      "aucune discipline scientifique",
    ],
  },
  {
    microskillId: "1.1.4",
    text: "Les sciences cognitives apportent à l'IA :",
    choices: [
      "une compréhension des processus mentaux (perception, raisonnement) qui inspirent les modèles",
      "des recettes de cuisine",
      "des règles de grammaire latine",
      "rien d'utile",
    ],
  },
  {
    microskillId: "1.1.5",
    text: "L'IA symbolique repose surtout sur :",
    choices: [
      "l'explicitation de règles et de raisonnements",
      "l'apprentissage automatique à partir de données",
      "le pur hasard",
      "la reconnaissance vocale uniquement",
    ],
  },
  {
    microskillId: "1.1.5",
    text: "L'apprentissage automatique se distingue de l'IA symbolique car il :",
    choices: [
      "apprend des comportements à partir de données, plutôt que de règles écrites",
      "n'utilise jamais de données",
      "est forcément plus ancien",
      "ne fonctionne pas",
    ],
  },
  {
    microskillId: "1.1.6",
    text: "Les « hivers de l'IA » désignent :",
    choices: [
      "des périodes de baisse de financement et d'intérêt pour l'IA",
      "des saisons froides pour les serveurs",
      "des pannes d'électricité",
      "des virus informatiques",
    ],
  },
  {
    microskillId: "1.1.6",
    text: "L'expression « intelligence artificielle » a été adoptée :",
    choices: [
      "à la conférence de Dartmouth, dans les années 1950",
      "en 2020 par les réseaux sociaux",
      "au Moyen Âge",
      "elle n'a jamais été officialisée",
    ],
  },
  {
    microskillId: "1.1.7",
    text: "L'« hybridation » des approches en IA consiste à :",
    choices: [
      "combiner méthodes symboliques et apprentissage automatique",
      "n'utiliser qu'une seule méthode",
      "supprimer toutes les données",
      "interdire les règles",
    ],
  },
  {
    microskillId: "1.2.4",
    text: "Dans l'apprentissage par renforcement, le modèle apprend :",
    choices: [
      "par essais et erreurs, en maximisant une récompense",
      "en recopiant des réponses déjà étiquetées",
      "sans aucun retour d'information",
      "en une seule étape, sans s'entraîner",
    ],
  },
  {
    microskillId: "1.2.4",
    text: "Un système de récompense, en apprentissage par renforcement, sert à :",
    choices: [
      "donner un score à chaque action pour guider l'apprentissage",
      "éteindre le modèle",
      "colorier l'écran",
      "compter les utilisateurs",
    ],
  },
  {
    microskillId: "1.2.5",
    text: "Pour entraîner une IA à jouer à un jeu par renforcement, une bonne récompense serait :",
    choices: [
      "gagner la partie ou marquer des points",
      "la couleur du plateau",
      "le nom du joueur",
      "l'heure de la partie",
    ],
  },
  {
    microskillId: "1.2.6",
    text: "L'apprentissage non supervisé sert surtout à :",
    choices: [
      "détecter des structures ou des regroupements dans des données non étiquetées",
      "prédire à partir d'exemples étiquetés",
      "maximiser une récompense",
      "ne rien faire",
    ],
  },
  {
    microskillId: "1.2.7",
    text: "Tes données ne sont PAS étiquetées et tu cherches à former des groupes. Tu utilises :",
    choices: [
      "de l'apprentissage non supervisé",
      "de l'apprentissage supervisé",
      "une simple régression linéaire",
      "aucune méthode possible",
    ],
  },
  {
    microskillId: "1.2.8",
    text: "Introduire volontairement des contraintes (biais) dans un modèle peut servir à :",
    choices: [
      "réduire la complexité ou guider l'apprentissage vers de bonnes solutions",
      "ralentir l'ordinateur",
      "augmenter la pollution",
      "rien d'utile",
    ],
  },
  {
    microskillId: "1.3.5",
    text: "Une régression peut être utilisée dans l'entraînement d'une IA pour :",
    choices: [
      "prédire une valeur numérique à partir d'autres variables",
      "trier l'alphabet",
      "compresser une image",
      "chiffrer un mot de passe",
    ],
  },
  {
    microskillId: "1.3.6",
    text: "Les réseaux de neurones sont particulièrement utiles pour :",
    choices: [
      "traiter des données non structurées (images, sons, textes)",
      "uniquement additionner deux nombres",
      "trier l'alphabet",
      "rien de complexe",
    ],
  },
  {
    microskillId: "1.3.7",
    text: "Un modèle « boîte noire » pose problème car :",
    choices: [
      "il est difficile d'expliquer ou de justifier ses décisions",
      "il est trop simple",
      "il n'utilise pas d'électricité",
      "il est toujours faux",
    ],
  },
  {
    microskillId: "1.3.8",
    text: "Comparé à un réseau de neurones, un arbre de décision est généralement :",
    choices: [
      "plus facile à interpréter, mais parfois moins puissant sur des données complexes",
      "toujours plus puissant",
      "impossible à lire",
      "identique en tout point",
    ],
  },
  {
    microskillId: "1.4.6",
    text: "Quand une IA générative fait un calcul exact ou cherche sur le Web, elle :",
    choices: [
      "fait appel à des outils ou logiciels spécialisés",
      "devine au hasard",
      "invente toujours la réponse",
      "s'éteint automatiquement",
    ],
  },
  {
    microskillId: "1.4.7",
    text: "Le « transformateur » est :",
    choices: [
      "un type de réseau de neurones spécialisé dans le texte, utilisant un mécanisme d'attention",
      "un appareil électrique",
      "un robot humanoïde",
      "une base de données classique",
    ],
  },
  {
    microskillId: "1.4.7",
    text: "Le mécanisme d'« attention » d'un transformateur sert à :",
    choices: [
      "décider quels mots du contexte sont les plus importants",
      "augmenter le volume du son",
      "économiser l'électricité",
      "trier des images",
    ],
  },
  {
    microskillId: "1.5.5",
    text: "Le « filtrage collaboratif » recommande des contenus :",
    choices: [
      "en se basant sur les goûts d'utilisateurs aux préférences similaires",
      "selon la météo",
      "totalement au hasard",
      "uniquement par ordre alphabétique",
    ],
  },
  {
    microskillId: "1.5.5",
    text: "Le filtrage « par contenu » recommande :",
    choices: [
      "des éléments similaires à ceux que tu as déjà appréciés",
      "des contenus choisis au hasard",
      "des contenus selon ta taille",
      "les contenus les moins populaires",
    ],
  },
  {
    microskillId: "1.5.6",
    text: "Le problème du « démarrage à froid » survient quand :",
    choices: [
      "on n'a pas encore assez de données sur un nouvel utilisateur ou un nouveau contenu",
      "le serveur est éteint",
      "il fait froid dehors",
      "la batterie est pleine",
    ],
  },
  {
    microskillId: "1.5.7",
    text: "Les systèmes de recommandation sont le plus souvent entraînés par apprentissage :",
    choices: [
      "supervisé, sur des données d'interactions passées",
      "sans aucune donnée",
      "uniquement à la main",
      "par tirage au sort",
    ],
  },
  {
    microskillId: "1.5.8",
    text: "Analyser les effets d'un algorithme de recommandation, c'est étudier :",
    choices: [
      "comment il influence les comportements et les opinions des utilisateurs",
      "la couleur de l'application",
      "le poids du téléphone",
      "rien de particulier",
    ],
  },
  {
    microskillId: "1.6.5",
    text: "Un robot intelligent relie perception, décision et action grâce à :",
    choices: [
      "des capteurs, des modèles d'IA et des actionneurs (moteurs)",
      "uniquement un écran",
      "rien de particulier",
      "un seul bouton",
    ],
  },

  // ── Domaine 2 — Usages et applications ────────────────────────────────────
  {
    microskillId: "2.1.5",
    text: "Prédire les pannes d'une machine ou le trafic routier relève de :",
    choices: [
      "la prédiction par l'IA",
      "la génération d'images",
      "la traduction automatique",
      "la reconnaissance vocale",
    ],
  },
  {
    microskillId: "2.1.6",
    text: "Les assistants à base d'IA générative deviennent polyvalents car ils peuvent :",
    choices: [
      "se connecter à d'autres outils (recherche, calcul, programmation)",
      "uniquement dire bonjour",
      "seulement afficher l'heure",
      "rien faire d'autre que discuter",
    ],
  },
  {
    microskillId: "2.2.5",
    text: "Interroger une IA « multimodale » signifie :",
    choices: [
      "lui fournir aussi des images ou du son, pas seulement du texte",
      "lui parler uniquement en majuscules",
      "l'utiliser sans écran",
      "ne poser qu'une seule question",
    ],
  },
  {
    microskillId: "2.2.6",
    text: "Pour fiabiliser la réponse d'une IA générative, la meilleure méthode est de :",
    choices: [
      "la vérifier en la croisant avec d'autres sources fiables",
      "la croire sur parole",
      "la partager directement",
      "fermer l'application",
    ],
  },
  {
    microskillId: "2.3.5",
    text: "Pourquoi de faux contenus produits par des bots se diffusent-ils massivement ?",
    choices: [
      "les algorithmes de recommandation amplifient ce qui fait le plus réagir",
      "parce que les bots sont vérifiés",
      "parce que c'est interdit",
      "par pur hasard",
    ],
  },
  {
    microskillId: "2.3.6",
    text: "Appliquer le fact-checking, c'est notamment :",
    choices: [
      "identifier l'auteur, ses intentions, et vérifier dans d'autres sources",
      "compter les « j'aime »",
      "regarder la couleur du message",
      "croire le premier résultat venu",
    ],
  },
  {
    microskillId: "2.4.5",
    text: "Modifier les paramètres de recommandation de ton compte permet de :",
    choices: [
      "reprendre un peu le contrôle sur les contenus proposés",
      "augmenter la batterie",
      "changer la météo",
      "supprimer ton identité",
    ],
  },
  {
    microskillId: "2.4.6",
    text: "Mettre en œuvre une diversification des contenus, c'est :",
    choices: [
      "aller volontairement chercher d'autres sources et points de vue",
      "ne suivre qu'un seul compte",
      "tout croire sans réfléchir",
      "désactiver Internet",
    ],
  },
  {
    microskillId: "2.5.5",
    text: "La génération augmentée par récupération (RAG) consiste à :",
    choices: [
      "faire chercher l'IA dans une base de documents fiables avant de répondre",
      "inventer une réponse sans aucune source",
      "éteindre l'IA",
      "supprimer les documents",
    ],
  },
  {
    microskillId: "2.5.5",
    text: "L'intérêt principal du RAG est de :",
    choices: [
      "réduire les hallucinations en s'appuyant sur des sources",
      "ralentir l'IA",
      "augmenter les erreurs",
      "cacher les sources",
    ],
  },
  {
    microskillId: "2.5.6",
    text: "Une charte interne d'usage de l'IA dans une organisation sert à :",
    choices: [
      "encadrer les usages autorisés et protéger les données",
      "vendre des IA",
      "augmenter la vitesse du Wi-Fi",
      "interdire tous les ordinateurs",
    ],
  },

  // ── Domaine 3 — Enjeux ────────────────────────────────────────────────────
  {
    microskillId: "3.1.5",
    text: "L'empreinte carbone de l'IA comprend des émissions :",
    choices: [
      "directes (le calcul) et indirectes (la fabrication du matériel)",
      "uniquement liées au papier",
      "quasiment nulles",
      "seulement le week-end",
    ],
  },
  {
    microskillId: "3.1.6",
    text: "L'« IA frugale » cherche à :",
    choices: [
      "obtenir de bonnes performances avec moins de calculs et d'énergie",
      "consommer le plus d'énergie possible",
      "supprimer toute forme d'IA",
      "agrandir inutilement les modèles",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "L'IA Act européen impose des obligations renforcées surtout pour :",
    choices: [
      "les usages à risque élevé (santé, justice, éducation…)",
      "les jeux vidéo gratuits",
      "les calculatrices",
      "tous les usages, de façon identique",
    ],
  },
  {
    microskillId: "3.3.3",
    text: "Un modèle « à poids ouverts » (open weight) est un modèle dont :",
    choices: [
      "les paramètres appris pendant l'entraînement sont rendus publics",
      "le prix est affiché en magasin",
      "la couleur est libre",
      "personne ne connaît rien",
    ],
  },
  {
    microskillId: "3.3.4",
    text: "Différencier les modèles selon leur « explicabilité », c'est regarder :",
    choices: [
      "à quel point on peut comprendre et justifier leurs décisions",
      "leur vitesse d'affichage",
      "leur prix d'achat",
      "leur logo",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "Les IA entraînées surtout sur des contenus en anglais peuvent :",
    choices: [
      "sous-représenter d'autres langues et cultures",
      "parler parfaitement toutes les langues",
      "n'avoir aucun effet culturel",
      "faire disparaître l'anglais",
    ],
  },

  // ── Renfort lycée (rejouabilité des compétences A/E les plus minces) ──────
  {
    microskillId: "1.6.5",
    text: "Pour saisir un objet, un robot intelligent peut :",
    choices: [
      "le repérer par vision par ordinateur, puis planifier son mouvement",
      "utiliser uniquement un interrupteur",
      "se fier au hasard",
      "attendre qu'un humain le déplace à la main",
    ],
  },
  {
    microskillId: "1.6.5",
    text: "Quand un robot améliore ses gestes au fil du temps, il utilise :",
    choices: [
      "l'apprentissage automatique",
      "une télécommande humaine en continu",
      "rien du tout",
      "une simple horloge",
    ],
  },
  {
    microskillId: "1.6.5",
    text: "Dans le monde réel, la boucle perception → décision → action d'un robot doit :",
    choices: [
      "se répéter rapidement pour réagir aux imprévus",
      "ne s'exécuter qu'une seule fois",
      "s'arrêter au premier obstacle",
      "ignorer les capteurs",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "Selon l'IA Act, un usage classé « interdit » est :",
    choices: [
      "un usage jugé inacceptable (ex. notation sociale généralisée)",
      "un simple jeu vidéo",
      "une calculatrice",
      "un traitement de texte",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "L'IA Act européen adopte une approche :",
    choices: [
      "par niveau de risque",
      "par couleur d'interface",
      "par taille de fichier",
      "par ordre alphabétique",
    ],
  },
  {
    microskillId: "3.2.5",
    text: "Pourquoi la santé et la justice sont-elles « à risque élevé » pour l'IA ?",
    choices: [
      "parce qu'une erreur peut avoir de lourdes conséquences sur les personnes",
      "parce que ce sont des secteurs récents",
      "parce qu'ils sont gratuits",
      "parce qu'ils n'utilisent pas d'ordinateurs",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "Pourquoi les langues peu parlées sont-elles souvent moins bien gérées par les IA ?",
    choices: [
      "parce qu'il existe moins de données d'entraînement dans ces langues",
      "parce qu'elles sont interdites",
      "parce qu'elles sont trop simples",
      "par choix des élèves",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "Comparer deux IA génératives sur un sujet sensible permet de repérer :",
    choices: [
      "des biais culturels ou linguistiques différents selon le modèle",
      "leur vitesse de frappe",
      "leur couleur",
      "leur prix",
    ],
  },
  {
    microskillId: "3.5.4",
    text: "En s'entraînant sur d'immenses corpus, une IA générative peut imiter des œuvres :",
    choices: [
      "sans que les créateurs soient identifiés, reconnus ou rémunérés",
      "sans aucun problème de droits",
      "uniquement avec autorisation écrite",
      "en payant toujours les auteurs",
    ],
  },
  {
    microskillId: "2.1.5",
    text: "Un modèle qui estime le risque de panne d'un moteur fait de la :",
    choices: [
      "prédiction (maintenance prédictive)",
      "génération d'images",
      "traduction automatique",
      "reconnaissance vocale",
    ],
  },
  {
    microskillId: "2.1.6",
    text: "Un assistant génératif « augmenté » peut, en plus de discuter :",
    choices: [
      "faire une recherche web, un calcul ou de la programmation",
      "uniquement répéter ta question",
      "seulement traduire",
      "rien d'autre",
    ],
  },
  {
    microskillId: "2.2.5",
    text: "Donner une photo à une IA et lui demander de la décrire est un usage :",
    choices: ["multimodal", "uniquement textuel", "uniquement sonore", "impossible"],
  },
  {
    microskillId: "2.2.6",
    text: "Avant d'utiliser une réponse d'IA dans un devoir noté, tu devrais :",
    choices: [
      "vérifier ses informations avec des sources fiables",
      "la recopier telle quelle",
      "augmenter la taille de la police",
      "la traduire en anglais",
    ],
  },
  {
    microskillId: "2.3.5",
    text: "Des « bots » sur les réseaux sociaux servent parfois à :",
    choices: [
      "publier massivement des contenus pour simuler une opinion populaire",
      "vérifier chaque information avant publication",
      "protéger les utilisateurs",
      "ralentir volontairement Internet",
    ],
  },
  {
    microskillId: "2.3.6",
    text: "Face à un fait douteux, « recouper » signifie :",
    choices: [
      "vérifier s'il apparaît dans plusieurs sources indépendantes et fiables",
      "le partager pour demander l'avis des autres",
      "compter le nombre de vues",
      "regarder seulement la date",
    ],
  },
  {
    microskillId: "2.4.5",
    text: "Désactiver la personnalisation dans une application permet :",
    choices: [
      "de voir des contenus moins filtrés selon tes habitudes",
      "d'accélérer le téléphone",
      "de gagner de l'argent",
      "de changer de langue",
    ],
  },
  {
    microskillId: "2.4.6",
    text: "Suivre des sources aux points de vue variés aide surtout à :",
    choices: [
      "éviter l'enfermement et la chambre d'écho",
      "augmenter ta batterie",
      "supprimer ton historique",
      "ralentir le réseau",
    ],
  },
  {
    microskillId: "3.1.5",
    text: "Mesurer l'empreinte environnementale de l'IA est difficile car :",
    choices: [
      "les infrastructures sont mondiales et les données peu transparentes",
      "elle est toujours nulle",
      "le calcul est instantané",
      "personne n'y travaille",
    ],
  },
  {
    microskillId: "3.1.6",
    text: "Cibler en priorité les usages d'IA à réelle valeur ajoutée est une démarche :",
    choices: [
      "réfléchie, qui limite la consommation inutile",
      "de gaspillage",
      "interdite par la loi",
      "sans aucun effet",
    ],
  },
  {
    microskillId: "3.3.3",
    text: "Publier les « poids » d'un modèle (open weight) permet à d'autres de :",
    choices: [
      "le réutiliser, le modifier ou l'étudier sans repartir de zéro",
      "uniquement le regarder de loin",
      "ne rien en faire",
      "le supprimer définitivement",
    ],
  },
  {
    microskillId: "3.3.4",
    text: "Un modèle très « explicable » est surtout utile quand :",
    choices: [
      "il faut justifier une décision importante (santé, justice…)",
      "on cherche juste de la vitesse",
      "on veut cacher son fonctionnement",
      "cela n'a aucune importance",
    ],
  },
  {
    microskillId: "1.4.6",
    text: "Quand tu demandes un calcul précis à une IA générative, il vaut mieux qu'elle :",
    choices: [
      "utilise un outil de calcul plutôt que de deviner",
      "invente un résultat",
      "refuse de répondre",
      "change de sujet",
    ],
  },
  {
    microskillId: "2.5.6",
    text: "Une charte d'usage de l'IA en entreprise précise notamment :",
    choices: [
      "les tâches autorisées et les précautions sur les données",
      "le menu de la cantine",
      "les horaires de bus",
      "la météo de la semaine",
    ],
  },
];
