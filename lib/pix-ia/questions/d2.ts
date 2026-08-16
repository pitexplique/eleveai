import type { PixQuestion } from "../questionTypes";

// Domaine 2 — Usages et applications de l'IA. Paliers novice/indépendant.
// Plusieurs variantes par microskill (rejouabilité / anti-répétition).
//
// ⚠️ Distracteurs : des erreurs que les élèves font vraiment, de longueur
// comparable à la bonne réponse. Voir l'en-tête de d1.ts et le contrôle
// scripts/verifier-devinabilite.mjs. Un distracteur qui fait rire — « te faire
// un câlin », « repasse mon tee-shirt », « la recette du jour » — désigne la
// bonne réponse au lieu de la cacher.
export const d2Questions: PixQuestion[] = [
  // ── 2.1 Familles de tâches ───────────────────────────────────────────────
  {
    microskillId: "2.1.1",
    text: "Lequel de ces usages repose sur de l'intelligence artificielle ?",
    choices: [
      "la reconnaissance de ton visage pour déverrouiller un téléphone",
      "le code à quatre chiffres qui déverrouille le même téléphone",
      "la lampe d'un couloir qui s'allume dès qu'on ouvre la porte",
      "le classement de tes photos par date de prise de vue",
    ],
  },
  {
    microskillId: "2.1.1",
    text: "Quand ton clavier propose le mot suivant pendant que tu écris un SMS, il utilise :",
    choices: [
      "de l'IA : il prédit le mot le plus probable après ce que tu écris",
      "un dictionnaire fixe, où il cherche les mots commençant pareil",
      "la liste des mots que tu emploies le plus, classée par fréquence",
      "les messages déjà envoyés, qu'il compare mot à mot au tien",
    ],
  },
  {
    microskillId: "2.1.1",
    text: "Un assistant vocal qui comprend ta question utilise de l'IA pour :",
    choices: [
      "transcrire ta voix en texte, puis interpréter ta demande",
      "comparer le son de ta voix aux phrases qu'il a en mémoire",
      "repérer un mot-clé dans ta phrase et lancer l'action associée",
      "envoyer l'enregistrement à un opérateur qui répond à ta place",
    ],
  },
  {
    microskillId: "2.1.2",
    text: "La reconnaissance d'images sert à :",
    choices: [
      "analyser une image pour y repérer des objets, visages ou scènes",
      "améliorer la netteté et les couleurs d'une photo un peu ratée",
      "réduire le poids d'une image pour qu'elle s'envoie plus vite",
      "fabriquer une image nouvelle à partir d'une phrase de consigne",
    ],
  },
  {
    microskillId: "2.1.2",
    text: "Transformer la parole en texte écrit est une tâche de :",
    choices: [
      "reconnaissance vocale",
      "synthèse vocale",
      "traduction automatique",
      "génération de texte",
    ],
  },
  {
    microskillId: "2.1.2",
    text: "Un logiciel médical qui repère une anomalie sur une radio fait de la :",
    choices: [
      "reconnaissance d'images",
      "prédiction de valeurs",
      "génération de contenu",
      "recommandation de soins",
    ],
  },
  {
    microskillId: "2.1.3",
    text: "Reconnaissance, prédiction, recommandation, génération de contenu sont :",
    choices: [
      "des familles de tâches que l'IA sait réaliser",
      "les quatre étapes de l'entraînement d'un modèle",
      "des méthodes d'apprentissage automatique",
      "les niveaux de difficulté d'un système d'IA",
    ],
  },
  {
    microskillId: "2.1.3",
    text: "Créer une image à partir d'une phrase est une tâche de :",
    choices: [
      "génération de contenu",
      "reconnaissance d'images",
      "prédiction de valeurs",
      "classification d'images",
    ],
  },
  {
    microskillId: "2.1.4",
    text: "Dans un réseau social, l'ordre des publications que tu vois est surtout décidé par :",
    choices: [
      "un algorithme de recommandation, ajusté à ce que tu regardes",
      "l'ordre d'arrivée des publications, de la plus récente à la plus ancienne",
      "le nombre de « j'aime » reçus par chaque publication du réseau",
      "les comptes que tu suis, présentés à tour de rôle sans classement",
    ],
  },
  {
    microskillId: "2.1.4",
    text: "Quand une boutique en ligne te propose « des produits qui pourraient te plaire », c'est :",
    choices: [
      "une recommandation, calculée sur tes achats et tes visites",
      "la liste des produits les plus vendus sur l'ensemble du site",
      "la sélection des articles que la boutique cherche à écouler",
      "les nouveautés du catalogue, présentées de la plus récente",
    ],
  },

  // ── 2.2 Utiliser une IA générative ───────────────────────────────────────
  {
    microskillId: "2.2.1",
    text: "Une bonne requête (prompt) pour une IA générative :",
    choices: [
      "précise le contexte, l'objectif et la forme attendue",
      "reste très courte, pour ne pas embrouiller le modèle",
      "emploie des mots-clés séparés, comme dans un moteur de recherche",
      "pose plusieurs questions à la fois, pour gagner du temps",
    ],
  },
  {
    microskillId: "2.2.1",
    text: "Quel prompt est le meilleur pour préparer un exposé ?",
    choices: [
      "« Rédige un plan en 3 parties sur les volcans, pour un exposé de 6e »",
      "« Donne-moi tout ce qu'il faut savoir sur les volcans, sois complet »",
      "« Fais mon exposé sur les volcans, je dois le rendre demain matin »",
      "« Volcans : éruption, magma, cratère, plaques, risques, prévention »",
    ],
  },
  {
    microskillId: "2.2.1",
    text: "Pour avoir une réponse adaptée, il est utile d'indiquer dans le prompt :",
    choices: [
      "le contexte, l'objectif et la forme attendue",
      "le nombre de sources que l'IA devra consulter",
      "le temps que tu lui laisses pour te répondre",
      "le nom du modèle que tu veux qu'elle utilise",
    ],
  },
  {
    microskillId: "2.2.2",
    text: "Si la réponse de l'IA ne te convient pas, le mieux est de :",
    choices: [
      "reformuler en disant précisément ce qui ne va pas",
      "reposer la même question, pour voir si elle change d'avis",
      "recommencer depuis une conversation entièrement nouvelle",
      "essayer la même question sur un autre service d'IA",
    ],
  },
  {
    microskillId: "2.2.2",
    text: "Travailler « par itérations » avec une IA, c'est :",
    choices: [
      "améliorer la réponse pas à pas, en demandant des modifications",
      "poser la même question plusieurs fois et garder la meilleure",
      "découper ton travail en questions posées les unes après les autres",
      "faire relire la réponse par une seconde IA avant de la garder",
    ],
  },
  {
    microskillId: "2.2.3",
    text: "Parmi ces tâches, laquelle peux-tu demander à une IA générative de texte ?",
    choices: [
      "résumer, traduire ou reformuler un texte que tu lui fournis",
      "te dire avec certitude quelle note tu auras à ton prochain devoir",
      "retrouver l'adresse exacte du site d'où vient une information",
      "te garantir que ce qu'elle écrit est vérifié et sans erreur",
    ],
  },
  {
    microskillId: "2.2.3",
    text: "Laquelle de ces demandes est adaptée à une IA générative de texte ?",
    choices: [
      "« Propose-moi trois titres pour mon exposé sur les volcans »",
      "« Donne-moi le lien de l'article du Monde paru hier sur ce sujet »",
      "« Dis-moi combien d'élèves de ma classe ont rendu leur devoir »",
      "« Confirme-moi que cette date est exacte, je ne vérifierai pas »",
    ],
  },
  {
    microskillId: "2.2.4",
    text: "Après avoir reçu une réponse d'une IA, le bon réflexe est de :",
    choices: [
      "vérifier l'information ailleurs, surtout si elle est importante",
      "vérifier seulement si la réponse te semble bizarre ou hésitante",
      "demander à l'IA si elle est sûre, et la croire si elle confirme",
      "regarder si la réponse est détaillée : c'est signe de fiabilité",
    ],
  },
  {
    microskillId: "2.2.4",
    text: "Une IA te donne une réponse sûre d'elle mais qui te semble étrange. Tu devrais :",
    choices: [
      "la recouper avec une source que tu peux identifier",
      "lui redemander : si elle maintient, c'est qu'elle est sûre",
      "lui faire confiance, l'assurance venant de ses données",
      "poser la question autrement jusqu'à obtenir ce qui t'arrange",
    ],
  },

  // ── 2.3 Évaluer l'information ─────────────────────────────────────────────
  {
    microskillId: "2.3.1",
    text: "Devant une fausse vidéo très partagée, se demander « qui l'a publiée et pourquoi ? » sert à :",
    choices: [
      "comprendre l'intention de l'auteur et juger de sa fiabilité",
      "savoir depuis combien de temps la vidéo circule sur le réseau",
      "mesurer si elle a été assez partagée pour être prise au sérieux",
      "vérifier que la vidéo n'a pas été coupée ou raccourcie",
    ],
  },
  {
    microskillId: "2.3.1",
    text: "Un hypertrucage (deepfake), c'est :",
    choices: [
      "un contenu truqué avec l'IA, qui imite une personne réelle",
      "une vidéo authentique sortie de son contexte d'origine",
      "un montage fait de plusieurs extraits vidéo mis bout à bout",
      "une image entièrement inventée, ne représentant personne",
    ],
  },
  {
    microskillId: "2.3.2",
    text: "Une image porte la mention « générée par IA ». Cela veut dire :",
    choices: [
      "qu'elle a été fabriquée par un modèle, et ne montre rien de réel",
      "qu'elle a été retouchée par une IA à partir d'une vraie photo",
      "qu'une IA a vérifié l'image et confirmé qu'elle n'est pas truquée",
      "qu'elle ne peut pas être réutilisée sans payer de droits d'auteur",
    ],
  },
  {
    microskillId: "2.3.2",
    text: "Voir une mention « contenu créé avec l'IA » doit t'inciter à :",
    choices: [
      "regarder ce contenu avec esprit critique",
      "considérer que le contenu est faux et l'ignorer",
      "le partager, puisque son origine est annoncée",
      "chercher qui a été payé pour le faire produire",
    ],
  },
  {
    microskillId: "2.3.3",
    text: "Pour vérifier une information trouvée en ligne, une étape utile est de :",
    choices: [
      "retrouver qui en est l'auteur, et si on peut lui faire confiance",
      "regarder le nombre de partages : très partagé, souvent fiable",
      "vérifier que le texte ne contient aucune faute d'orthographe",
      "voir si l'information revient dans plusieurs de tes fils d'actualité",
    ],
  },
  {
    microskillId: "2.3.3",
    text: "Une bonne pratique de vérification (fact-checking) est de :",
    choices: [
      "chercher l'information dans plusieurs sources indépendantes",
      "chercher l'information dans plusieurs articles qui se citent",
      "demander à une IA générative si l'information est exacte",
      "se fier au site qui apparaît en premier dans les résultats",
    ],
  },
  {
    microskillId: "2.3.4",
    text: "Quelle différence entre une IA générative et un moteur de recherche ?",
    choices: [
      "l'IA fabrique une réponse ; le moteur renvoie vers des pages existantes",
      "l'IA cherche sur tout le Web ; le moteur ne voit que les sites connus",
      "l'IA donne une réponse à jour ; le moteur affiche des pages anciennes",
      "l'IA vérifie ce qu'elle avance ; le moteur laisse ce soin au lecteur",
    ],
  },
  {
    microskillId: "2.3.4",
    text: "Pour trouver la source exacte d'une information, il vaut souvent mieux :",
    choices: [
      "passer par un moteur de recherche, qui renvoie vers des pages identifiables",
      "demander à une IA générative de te donner l'adresse de l'article d'origine",
      "demander à une IA générative de citer ses sources dans sa réponse",
      "chercher l'information sur un réseau social, où elle est souvent relayée",
    ],
  },

  // ── 2.4 Services de recommandation ───────────────────────────────────────
  {
    microskillId: "2.4.1",
    text: "Lequel de ces services repose sur la recommandation ?",
    choices: [
      "une appli qui te suggère des musiques d'après tes écoutes",
      "une appli qui range tes musiques par ordre alphabétique",
      "une appli qui affiche les titres du moment dans ton pays",
      "une appli qui retrouve un morceau à partir de son extrait",
    ],
  },
  {
    microskillId: "2.4.1",
    text: "La personnalisation des contenus repose sur :",
    choices: [
      "les traces que tu laisses : clics, vidéos vues, recherches",
      "les seules réponses que tu as données à ton inscription",
      "la comparaison de ton profil à celui de ta classe d'âge",
      "les catégories que tu as cochées dans tes paramètres",
    ],
  },
  {
    microskillId: "2.4.2",
    text: "Un avantage de la personnalisation des contenus est :",
    choices: [
      "de trouver plus vite ce qui t'intéresse vraiment",
      "de te faire découvrir des sujets très éloignés des tiens",
      "de garantir que les contenus proposés sont fiables",
      "de réduire le nombre de publicités que tu reçois",
    ],
  },
  {
    microskillId: "2.4.2",
    text: "Un inconvénient de la personnalisation des contenus est :",
    choices: [
      "de ne plus rencontrer d'idées différentes des tiennes",
      "de proposer trop souvent des contenus qui t'ennuient",
      "de ralentir l'application à mesure qu'elle te connaît",
      "de rendre impossible la recherche d'un contenu précis",
    ],
  },
  {
    microskillId: "2.4.3",
    text: "Comment garder un peu de contrôle sur tes recommandations ?",
    choices: [
      "consulter et modifier ton historique et tes préférences dans les réglages",
      "attendre : l'algorithme finit toujours par se corriger de lui-même",
      "créer un second compte et n'utiliser que celui-là pour regarder",
      "supprimer l'application, puis la réinstaller de temps en temps",
    ],
  },
  {
    microskillId: "2.4.3",
    text: "Pour que les suggestions te correspondent mieux, tu peux :",
    choices: [
      "régler tes préférences et nettoyer ton historique",
      "regarder plus longtemps pour qu'il te connaisse mieux",
      "cliquer sur tout, pour lui donner un maximum de choix",
      "ne rien regarder jusqu'à ce qu'il change ses propositions",
    ],
  },
  {
    microskillId: "2.4.4",
    text: "Une « chambre d'écho », c'est quand :",
    choices: [
      "tu es exposé surtout à des opinions semblables aux tiennes",
      "la même information te revient depuis plusieurs applications",
      "un contenu est repris et déformé au fil de ses partages",
      "des comptes automatiques répètent le même message",
    ],
  },
  {
    microskillId: "2.4.4",
    text: "Pour éviter l'enfermement algorithmique, une bonne habitude est de :",
    choices: [
      "diversifier ses sources et aller chercher d'autres points de vue",
      "s'abonner à davantage de comptes dans les sujets qu'on aime déjà",
      "n'utiliser qu'une seule application, pour mieux la maîtriser",
      "regarder ce que l'algorithme propose sans jamais cliquer",
    ],
  },

  // ── 2.5 IA dans une organisation ─────────────────────────────────────────
  {
    microskillId: "2.5.1",
    text: "Lequel de ces outils peut intégrer de l'IA ?",
    choices: [
      "un logiciel qui résume automatiquement un long document",
      "un logiciel qui compte les mots contenus dans un document",
      "un logiciel qui met en forme un document selon un modèle",
      "un logiciel qui enregistre un document dans plusieurs formats",
    ],
  },
  {
    microskillId: "2.5.1",
    text: "Dans une suite bureautique, une fonction d'IA peut :",
    choices: [
      "proposer un brouillon de texte ou le résumé d'un document",
      "vérifier l'orthographe à partir d'un dictionnaire intégré",
      "calculer le total d'une colonne de chiffres dans un tableau",
      "convertir un document dans un format lisible partout",
    ],
  },
  {
    microskillId: "2.5.2",
    text: "Une « charte d'usage de l'IA » dans un établissement sert à :",
    choices: [
      "définir ce qui est autorisé, encadré ou interdit avec l'IA",
      "choisir le logiciel d'IA que tout le monde devra utiliser",
      "garantir que les outils d'IA ne feront aucune erreur",
      "interdire l'usage de l'IA à l'ensemble des élèves",
    ],
  },
  {
    microskillId: "2.5.2",
    text: "Respecter une charte d'usage de l'IA, c'est :",
    choices: [
      "n'utiliser l'IA que pour les usages qu'elle autorise, et le dire",
      "n'utiliser que le logiciel d'IA installé par l'établissement",
      "demander l'accord d'un adulte avant chaque usage de l'IA",
      "signaler à l'établissement chaque réponse que l'IA a ratée",
    ],
  },
  {
    microskillId: "2.5.3",
    text: "Avant de coller un texte dans une IA en ligne, il faut éviter d'y mettre :",
    choices: [
      "des données personnelles, sensibles ou confidentielles",
      "des extraits de ton cours ou de ton manuel scolaire",
      "un texte trop long, que le modèle ne pourra pas traiter",
      "un texte que tu n'as pas écrit toi-même entièrement",
    ],
  },
  {
    microskillId: "2.5.3",
    text: "Pourquoi être prudent avec une IA générative gratuite ?",
    choices: [
      "ce que tu écris peut servir à entraîner le modèle",
      "ses réponses sont moins fiables que celles des offres payantes",
      "elle limite le nombre de questions que tu peux poser par jour",
      "elle ne conserve pas l'historique de tes conversations",
    ],
  },
  {
    microskillId: "2.5.4",
    text: "Avant d'adopter un nouvel outil d'IA, il est prudent de :",
    choices: [
      "lire les conditions d'utilisation et ce qu'elles disent de tes données",
      "vérifier le nombre d'utilisateurs et les avis laissés sur la boutique",
      "essayer l'outil sur un vrai document pour juger de sa qualité",
      "comparer son prix à celui des autres outils du même genre",
    ],
  },
  {
    microskillId: "2.5.4",
    text: "Les mentions légales et conditions d'utilisation d'un outil d'IA renseignent surtout sur :",
    choices: [
      "ce qui est fait de tes données, et qui peut y accéder",
      "la qualité des réponses que l'outil s'engage à fournir",
      "les techniques d'IA employées à l'intérieur du logiciel",
      "les tâches pour lesquelles l'outil a été mis au point",
    ],
  },
];
