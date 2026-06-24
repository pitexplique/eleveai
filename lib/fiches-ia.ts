import type { FicheIaData } from "@/components/fiches/FicheCoursIa";

// Source UNIQUE du contenu des fiches de cours IA (16 compétences du référentiel
// Pix). Les pages `app/fiches-cours/ia/.../page.tsx` et le livre
// `app/fiches-cours/ia/livre` importent depuis ici. ⚠️ NE PAS remettre les
// données dans les page.tsx : Next interdit d'y exporter autre chose que les
// exports réservés (metadata, default…).

// ── Domaine 1 — Fondements ──────────────────────────────────────────────────
export const ficheDefinirIa: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.1",
  titre: "Qu'est-ce que l'intelligence artificielle ?",
  intro:
    "L'intelligence artificielle (IA) est un domaine scientifique qui cherche à faire réaliser à des machines des tâches « intelligentes » : reconnaître, prédire, décider, créer. Ce n'est pas un seul logiciel, ni forcément un robot.",
  identite: [
    { label: "Prérequis", valeur: "De la curiosité" },
    { label: "Idée clé", valeur: "L'IA est une discipline, pas un produit" },
    { label: "Repère", valeur: "Née dans les années 1950" },
  ],
  aQuoiCaSert:
    "Comprendre ce qu'est vraiment l'IA aide à ne pas la sur- ni sous-estimer : savoir ce qu'elle peut faire, ses limites, et garder un regard critique sur les outils qu'on utilise tous les jours.",
  leSavaisTu:
    "Le terme « intelligence artificielle » est né en 1956, à la conférence de Dartmouth. La discipline a connu des hauts et des bas — on parle même des « hivers de l'IA », des périodes où l'argent et l'intérêt ont chuté.",
  notions: [
    { titre: "Une discipline scientifique", texte: "L'IA cherche à modéliser des mécanismes de l'intelligence pour faire réaliser des tâches complexes à des machines." },
    { titre: "Deux grandes approches", texte: "L'IA symbolique (des règles écrites par des humains) et l'apprentissage automatique (apprendre à partir de données)." },
    { titre: "Pourquoi ça a explosé", texte: "Depuis les années 2000 : plus de puissance de calcul et des données massives (big data) ont fait bondir l'IA." },
  ],
  pointsCles: {
    titre: "Les repères clés",
    lignes: [
      { cle: "Définition", detail: "Faire réaliser des tâches « intelligentes » à des machines." },
      { cle: "Symbolique", detail: "Raisonner avec des règles écrites par des humains." },
      { cle: "Apprentissage auto.", detail: "Apprendre des comportements à partir de données." },
      { cle: "Moteurs de progrès", detail: "Puissance de calcul + données massives (big data)." },
    ],
    callout:
      "Attention au langage : dire « une IA » pour un chatbot est un raccourci. À l'origine, « IA » désigne une discipline, pas un logiciel précis.",
  },
  exemples: [
    { titre: "IA ou pas IA ?", donnees: "Un clavier qui propose le mot suivant quand tu écris un SMS.", question: "Est-ce de l'IA ?", solution: "Oui : il prédit le mot le plus probable (apprentissage automatique). À l'inverse, un interrupteur n'est pas de l'IA." },
  ],
  pieges: [
    "Croire que « IA » veut dire « robot ».",
    "Penser qu'une IA « comprend » comme un être humain.",
    "Confondre la discipline (l'IA) et un logiciel précis (un chatbot).",
  ],
  aRetenir: [
    "L'IA est un domaine scientifique, pas un produit unique.",
    "Deux approches : symbolique (règles) et apprentissage automatique (données).",
    "Le bond récent vient de la puissance de calcul et des données massives.",
    "« Une IA » est souvent un raccourci de langage.",
  ],
  entrainement: [
    { question: "Vrai ou faux : une IA est toujours un robot.", correction: "Faux : l'IA est surtout une discipline et des logiciels ; un robot n'est qu'un cas particulier (l'IA incarnée)." },
    { question: "Cite les deux grandes approches de l'IA.", correction: "L'IA symbolique (des règles écrites) et l'apprentissage automatique (apprendre à partir de données)." },
    { question: "Pourquoi l'IA a-t-elle beaucoup progressé depuis les années 2000 ?", correction: "Grâce à l'augmentation de la puissance de calcul et à la collecte de données massives (big data)." },
  ],
};

export const ficheApprentissage: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.2",
  titre: "L'apprentissage automatique",
  intro:
    "L'apprentissage automatique (machine learning) donne aux machines la capacité d'apprendre un comportement à partir de données, au lieu de suivre des règles écrites à la main.",
  identite: [
    { label: "Prérequis", valeur: "Notion de données" },
    { label: "Idée clé", valeur: "Apprendre à partir d'exemples" },
    { label: "Mot clé", valeur: "Entraînement" },
  ],
  aQuoiCaSert:
    "C'est le cœur des IA modernes : reconnaissance d'images, traduction, recommandations, chatbots… Tous apprennent à partir de données plutôt que d'être programmés règle par règle.",
  leSavaisTu:
    "Le logiciel AlphaGo a d'abord appris en observant des millions de parties humaines (supervisé), puis s'est amélioré en jouant contre lui-même (renforcement) — jusqu'à battre les meilleurs joueurs de Go du monde.",
  notions: [
    { titre: "La phase d'entraînement", texte: "Le modèle ajuste ses paramètres sur des données pour réussir sa tâche, puis on le teste sur de nouvelles données." },
    { titre: "Apprentissage supervisé", texte: "On fournit des exemples accompagnés de la bonne réponse : ce sont des données « étiquetées »." },
    { titre: "Non supervisé & renforcement", texte: "Non supervisé : trouver des groupes dans des données non étiquetées. Renforcement : essais/erreurs pour gagner une récompense." },
  ],
  pointsCles: {
    titre: "Les 3 types d'apprentissage",
    lignes: [
      { cle: "Supervisé", detail: "Exemples + bonnes réponses (données étiquetées)." },
      { cle: "Non supervisé", detail: "Trouver des structures dans des données non étiquetées." },
      { cle: "Renforcement", detail: "Essais et erreurs pour maximiser une récompense." },
      { cle: "Entraînement", detail: "Ajuster les paramètres, puis tester sur de nouvelles données." },
    ],
    callout: "Étiqueter une donnée, c'est lui donner la bonne réponse attendue. Exemple : marquer des photos « chat » ou « pas chat ».",
  },
  exemples: [
    { titre: "Trier des e-mails", donnees: "Tu veux séparer les e-mails en « spam » et « pas spam ».", question: "Quel apprentissage et quelles étiquettes ?", solution: "Apprentissage supervisé, avec les étiquettes « spam » / « pas spam » placées sur des exemples d'e-mails." },
  ],
  pieges: [
    "Croire que le modèle « comprend » : il repère surtout des régularités statistiques.",
    "Oublier la phase de test (vérifier sur de nouvelles données).",
    "Confondre supervisé (avec réponses) et non supervisé (sans réponses).",
  ],
  aRetenir: [
    "Le modèle apprend à partir de données, pas de règles écrites.",
    "Supervisé = exemples étiquetés (avec la bonne réponse).",
    "Non supervisé = regroupements ; renforcement = récompense.",
    "Après l'entraînement, on teste sur de nouvelles données.",
  ],
  entrainement: [
    { question: "Qu'est-ce qu'une donnée « étiquetée » ?", correction: "Un exemple accompagné de la bonne réponse attendue." },
    { question: "À quoi sert la phase de test ?", correction: "À vérifier que le modèle fonctionne sur des données différentes de l'entraînement (qu'il sait généraliser)." },
    { question: "Une IA apprend à jouer en gagnant des points par essais et erreurs : quel apprentissage ?", correction: "L'apprentissage par renforcement." },
  ],
};

export const ficheModeles: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.3",
  titre: "Les modèles d'apprentissage",
  intro:
    "Un modèle d'IA est une structure mathématique qui apprend à partir de données. Il en existe plusieurs familles, plus ou moins simples à comprendre.",
  identite: [
    { label: "Prérequis", valeur: "Apprentissage automatique" },
    { label: "Idée clé", valeur: "Plusieurs familles de modèles" },
    { label: "Mot clé", valeur: "Réseau de neurones" },
  ],
  aQuoiCaSert:
    "Selon le problème, on choisit un modèle différent. Comprendre leurs forces et leurs limites aide à juger ce qu'une IA peut faire — et à quel point on peut lui faire confiance.",
  leSavaisTu:
    "Les réseaux de neurones sont inspirés (de loin !) du cerveau. Mais leur fonctionnement interne est si complexe qu'on les appelle parfois des « boîtes noires ».",
  notions: [
    { titre: "Arbre de décision", texte: "Une suite de questions oui/non qui mène à une conclusion. Très intuitif et facile à lire." },
    { titre: "Régression", texte: "Prédire une valeur à partir d'autres valeurs observées : par exemple estimer un prix à partir d'une caractéristique." },
    { titre: "Réseau de neurones", texte: "De nombreuses unités organisées en couches. Très puissant pour images, sons et textes, mais peu lisible." },
  ],
  pointsCles: {
    titre: "Trois familles de modèles",
    lignes: [
      { cle: "Arbre de décision", detail: "Questions oui/non successives ; intuitif." },
      { cle: "Régression", detail: "Prédire une valeur à partir de variables observées." },
      { cle: "Réseau de neurones", detail: "Unités en couches ; puissant mais « boîte noire »." },
      { cle: "Explicabilité", detail: "Plus un modèle est complexe, plus il est dur à expliquer." },
    ],
    callout:
      "Un modèle « explicable » permet de comprendre POURQUOI il a décidé — c'est essentiel dans des domaines sensibles comme la santé ou la justice.",
  },
  exemples: [
    { titre: "Prédire un prix", donnees: "Estimer le prix d'un vélo d'occasion selon son âge.", question: "Quel type de modèle ?", solution: "Une régression : on prédit une valeur (le prix) à partir d'une variable observée (l'âge)." },
  ],
  pieges: [
    "Croire qu'un réseau de neurones contient de vrais neurones.",
    "Penser qu'un modèle puissant est forcément le meilleur (il est souvent moins lisible).",
    "Oublier que la « boîte noire » rend une erreur difficile à expliquer.",
  ],
  aRetenir: [
    "Arbre de décision = questions oui/non, facile à lire.",
    "Régression = prédire une valeur.",
    "Réseau de neurones = puissant mais peu explicable.",
    "Le bon modèle dépend du problème et des données.",
  ],
  entrainement: [
    { question: "Pourquoi parle-t-on de « boîte noire » pour un réseau de neurones ?", correction: "Parce qu'il est difficile d'expliquer comment il arrive à son résultat." },
    { question: "Quel modèle utiliser pour prédire une valeur numérique ?", correction: "Une régression." },
    { question: "Comment un arbre de décision prend-il une décision ?", correction: "En répondant à une suite de questions (oui/non) jusqu'à une conclusion." },
  ],
};

export const ficheLlm: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.4",
  titre: "Les grands modèles de langage",
  intro:
    "Les chatbots et autres assistants génératifs reposent sur de grands modèles de langage (LLM). Ils produisent du texte en prédisant, mot après mot, la suite la plus probable.",
  identite: [
    { label: "Prérequis", valeur: "IA générative" },
    { label: "Idée clé", valeur: "Prédire le mot suivant" },
    { label: "Risque", valeur: "Les hallucinations" },
  ],
  aQuoiCaSert:
    "Comprendre comment fonctionne un grand modèle de langage aide à bien l'utiliser : savoir pourquoi il peut inventer, et donc pourquoi il faut toujours vérifier ses réponses.",
  leSavaisTu:
    "Un grand modèle de langage est d'abord « pré-entraîné » sur d'énormes quantités de textes du Web. Puis des humains notent ses réponses pour l'améliorer (apprentissage par renforcement).",
  notions: [
    { titre: "Le principe", texte: "Le modèle prédit le mot suivant le plus probable, à partir du contexte, pour construire sa réponse petit à petit." },
    { titre: "L'entraînement", texte: "Pré-entraînement sur beaucoup de textes, puis alignement : des humains donnent des exemples et notent les réponses." },
    { titre: "Les limites", texte: "Il ne vérifie pas la vérité. Il peut « halluciner » : inventer une information fausse présentée comme vraie." },
  ],
  pointsCles: {
    titre: "Comment ça marche",
    lignes: [
      { cle: "Entrée", detail: "Ta requête, appelée « prompt »." },
      { cle: "Traitement", detail: "Le modèle calcule le contexte, mot après mot." },
      { cle: "Sortie", detail: "Les mots suivants les plus probables." },
      { cle: "Limite", detail: "Aucune garantie de vérité → il faut vérifier." },
    ],
    callout:
      "Une « hallucination » est une information inventée présentée comme vraie. Ce n'est pas un bug : c'est lié à la façon même dont le modèle génère du texte.",
  },
  exemples: [
    { titre: "Repérer une hallucination", donnees: "Une IA cite, avec assurance, un livre qui n'existe pas.", question: "Que fais-tu ?", solution: "Tu vérifies que le livre existe vraiment avant de le citer : c'est probablement une hallucination." },
  ],
  pieges: [
    "Croire que le modèle « sait » si c'est vrai.",
    "Prendre une réponse fluide et sûre d'elle pour une réponse exacte.",
    "Recopier sans vérifier les informations importantes.",
  ],
  aRetenir: [
    "Un grand modèle de langage prédit le mot suivant le plus probable.",
    "Il est pré-entraîné sur d'énormes textes, puis affiné par des humains.",
    "Il ne garantit pas la vérité : il peut halluciner.",
    "On vérifie toujours les informations importantes.",
  ],
  entrainement: [
    { question: "Comment un chatbot construit-il sa réponse ?", correction: "En prédisant, mot après mot, la suite la plus probable à partir du contexte." },
    { question: "Qu'est-ce qu'une hallucination ?", correction: "Une information inventée par l'IA et présentée comme vraie." },
    { question: "Quel est le rôle des humains dans l'entraînement d'un modèle de langage ?", correction: "Donner des exemples et noter les réponses pour améliorer le modèle." },
  ],
};

export const ficheReco: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.5",
  titre: "Les algorithmes de recommandation",
  intro:
    "Sur YouTube, TikTok, Netflix ou les boutiques en ligne, des algorithmes de recommandation choisissent les contenus qu'on te propose, à partir de tes données.",
  identite: [
    { label: "Prérequis", valeur: "Notion de données" },
    { label: "Idée clé", valeur: "Personnaliser pour capter l'attention" },
    { label: "Risque", valeur: "La bulle de filtre" },
  ],
  aQuoiCaSert:
    "Comprendre la recommandation aide à reprendre la main : savoir pourquoi on te propose tel contenu, repérer ce qui influence tes choix, et éviter de t'enfermer dans une « bulle ».",
  leSavaisTu:
    "Les algorithmes cherchent souvent à maximiser le temps que tu passes sur l'application : ils privilégient ce qui te fait réagir — pas forcément ce qui est vrai ou utile.",
  notions: [
    { titre: "Le but", texte: "Filtrer et proposer en priorité des contenus qui pourraient t'intéresser, d'après ton comportement." },
    { titre: "Les données utilisées", texte: "Ton historique, tes clics, tes préférences, et parfois les choix d'utilisateurs aux goûts similaires." },
    { titre: "La bulle de filtre", texte: "À force de personnalisation, tu vois surtout des contenus semblables à ce que tu aimes déjà." },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Objectif", detail: "Te proposer des contenus susceptibles de t'intéresser." },
      { cle: "Données", detail: "Historique, clics, préférences." },
      { cle: "Bulle de filtre", detail: "Tu ne vois presque plus que des contenus semblables." },
      { cle: "Reprendre la main", detail: "Diversifier ses sources, régler ses paramètres." },
    ],
    callout:
      "Une « chambre d'écho » : on est exposé surtout à des opinions proches des siennes, ce qui renforce ses idées sans confrontation à d'autres points de vue.",
  },
  exemples: [
    { titre: "Pourquoi toujours ce type de vidéo ?", donnees: "L'application te propose en boucle le même genre de contenus.", question: "Pourquoi, et que faire ?", solution: "Parce qu'elle se base sur ton historique. Pour varier : explore d'autres thèmes, suis des sources différentes, et gère ton historique dans les paramètres." },
  ],
  pieges: [
    "Croire que tout le monde voit la même chose (c'est personnalisé).",
    "Penser que ce qui est mis en avant est forcément vrai ou important.",
    "Rester enfermé dans une seule source d'information.",
  ],
  aRetenir: [
    "La recommandation personnalise selon tes données.",
    "Elle peut t'enfermer dans une bulle de filtre.",
    "Diversifier ses sources aide à en sortir.",
    "Le but est souvent de capter ton attention.",
  ],
  entrainement: [
    { question: "Sur quoi se base un algorithme de recommandation ?", correction: "Sur ton historique, tes clics et tes préférences." },
    { question: "Qu'est-ce qu'une bulle de filtre ?", correction: "C'est quand tu ne vois presque plus que des contenus proches de ce que tu aimes déjà." },
    { question: "Comment éviter l'enfermement algorithmique ?", correction: "En variant ses sources et en explorant d'autres types de contenus." },
  ],
};

export const ficheRobot: FicheIaData = {
  domaineId: "1",
  domaineLabel: "Fondements",
  competence: "1.6",
  titre: "L'IA incarnée et la robotique",
  intro:
    "L'IA n'est pas toujours un logiciel : elle peut être « incarnée » dans un objet physique — un robot — capable de percevoir, décider et agir dans le monde réel.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'IA" },
    { label: "Idée clé", valeur: "Percevoir, décider, agir" },
    { label: "Mot clé", valeur: "IA incarnée" },
  ],
  aQuoiCaSert:
    "Les robots intelligents sont de plus en plus présents : aspirateurs autonomes, voitures, robots d'usine, assistance. Comprendre leurs 3 fonctions aide à saisir ce qu'ils peuvent — et ne peuvent pas — faire.",
  leSavaisTu:
    "Le monde réel est imprévisible : un robot doit réagir vite aux imprévus. C'est bien plus difficile que de calculer dans un logiciel, où tout est « propre » et contrôlé.",
  notions: [
    { titre: "Qu'est-ce qu'un robot", texte: "Un système qui combine trois fonctions : percevoir son environnement, décider, puis agir." },
    { titre: "Un robot intelligent", texte: "Il utilise des modèles d'IA pour comprendre son environnement, s'adapter et améliorer ses gestes." },
    { titre: "Le défi du monde réel", texte: "Le monde réel est incertain et changeant : le robot doit réagir vite et s'adapter aux imprévus." },
  ],
  pointsCles: {
    titre: "Les 3 fonctions d'un robot",
    lignes: [
      { cle: "Percevoir", detail: "Capteurs, caméras, micros…" },
      { cle: "Décider", detail: "Souvent grâce à l'IA." },
      { cle: "Agir", detail: "Moteurs, bras articulés, déplacements." },
      { cle: "Le défi", detail: "S'adapter à un monde réel imprévisible." },
    ],
    callout:
      "On parle d'« IA incarnée » quand l'IA est dans un objet physique qui perçoit et agit dans le monde réel — pas seulement à l'écran.",
  },
  exemples: [
    { titre: "Un aspirateur autonome", donnees: "Il cartographie la pièce et évite les obstacles.", question: "Quelles fonctions utilise-t-il ?", solution: "Percevoir (ses capteurs), décider (l'IA pour éviter les obstacles) et agir (se déplacer dans la pièce)." },
  ],
  pieges: [
    "Croire que tout robot est « intelligent » (certains suivent juste un programme fixe).",
    "Oublier que le monde réel est imprévisible.",
    "Penser qu'un robot ne se trompe jamais.",
  ],
  aRetenir: [
    "Un robot perçoit, décide et agit.",
    "Un robot intelligent utilise l'IA.",
    "L'IA incarnée agit dans le monde réel.",
    "Le monde réel est un défi : il faut s'adapter.",
  ],
  entrainement: [
    { question: "Quelles sont les trois grandes fonctions d'un robot ?", correction: "Percevoir, décider et agir." },
    { question: "Qu'est-ce que l'IA incarnée ?", correction: "C'est quand l'IA est dans un objet physique qui perçoit et agit dans le monde réel." },
    { question: "Pourquoi est-ce difficile pour un robot d'agir dans le monde réel ?", correction: "Parce que le monde réel est changeant, incertain et imprévisible." },
  ],
};

// ── Domaine 2 — Usages ──────────────────────────────────────────────────────
export const ficheFamilles: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.1",
  titre: "Ce que l'IA sait faire",
  intro:
    "L'IA peut réaliser des tâches variées : reconnaître, prédire, recommander, générer du contenu. Beaucoup sont cachées dans les outils du quotidien.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'IA" },
    { label: "Idée clé", valeur: "Des familles de tâches" },
    { label: "Repère", valeur: "L'IA est partout" },
  ],
  aQuoiCaSert:
    "Repérer l'IA dans les outils qu'on utilise (téléphone, réseaux, photos) aide à comprendre ce qu'elle fait pour nous — et à garder un œil critique sur ses résultats.",
  leSavaisTu:
    "Certaines tâches sont faciles pour un humain mais dures pour une machine (reconnaître un objet sur une photo), et inversement (calculer très vite sur d'énormes quantités de données).",
  notions: [
    { titre: "Reconnaissance", texte: "Analyser des images ou des sons : reconnaître un visage, un objet, ou transformer la parole en texte." },
    { titre: "Prédiction & recommandation", texte: "Estimer une valeur ou un événement futur, et proposer des contenus susceptibles de t'intéresser." },
    { titre: "Génération de contenu", texte: "Créer du texte, des images ou des sons à partir d'une consigne (les IA génératives)." },
  ],
  pointsCles: {
    titre: "Les familles de tâches",
    lignes: [
      { cle: "Reconnaissance", detail: "Analyser image/son (visage, parole → texte)." },
      { cle: "Prédiction", detail: "Estimer une valeur ou un événement futur." },
      { cle: "Recommandation", detail: "Proposer des contenus pertinents." },
      { cle: "Génération", detail: "Créer textes, images, sons à partir d'une consigne." },
    ],
    callout:
      "Une même application combine souvent plusieurs tâches : un assistant vocal reconnaît ta voix, comprend ta demande, puis génère une réponse.",
  },
  exemples: [
    { titre: "Déverrouiller par le visage", donnees: "Ton téléphone reconnaît ton visage pour s'ouvrir.", question: "Quelle tâche d'IA ?", solution: "La reconnaissance d'images." },
  ],
  pieges: [
    "Croire que seuls les chatbots sont de l'IA.",
    "Confondre reconnaissance (analyser) et génération (créer).",
    "Penser que l'IA fait tout aussi bien que toi (elle se trompe aussi).",
  ],
  aRetenir: [
    "Reconnaissance, prédiction, recommandation, génération.",
    "Beaucoup d'usages sont cachés dans le quotidien.",
    "Une application combine souvent plusieurs tâches.",
    "On garde un regard critique sur les résultats.",
  ],
  entrainement: [
    { question: "Transformer la parole en texte écrit, quelle tâche d'IA ?", correction: "La reconnaissance de sons (reconnaissance vocale)." },
    { question: "Créer une image à partir d'une phrase, quelle tâche ?", correction: "La génération de contenu." },
    { question: "Cite trois familles de tâches réalisées par l'IA.", correction: "Par exemple : reconnaissance, prédiction (ou recommandation), et génération de contenu." },
  ],
};

export const ficheGenerative: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.2",
  titre: "Utiliser une IA générative",
  intro:
    "Une IA générative (comme un agent conversationnel) produit du texte, des images ou du code à partir d'une consigne appelée « prompt ». Bien l'utiliser, c'est savoir lui demander, vérifier ses réponses et rester responsable.",
  identite: [
    { label: "Prérequis", valeur: "Savoir formuler une consigne" },
    { label: "Idée clé", valeur: "Un bon prompt = précis + contexte" },
    { label: "Réflexe", valeur: "Toujours vérifier la réponse" },
  ],
  aQuoiCaSert:
    "Résumer un texte, traduire, trouver des idées, faire expliquer autrement une notion, s'entraîner avant un contrôle, rédiger un plan d'exposé. L'IA générative est un assistant — utile si on garde la main.",
  leSavaisTu:
    "Une IA générative ne « sait » pas si c'est vrai : elle prédit, mot après mot, la suite la plus probable. Elle peut donc inventer une information fausse présentée comme vraie — on appelle ça une hallucination.",
  notions: [
    { titre: "Écrire un bon prompt", texte: "Plus ta demande est précise et donne du contexte, plus la réponse colle à ton besoin. Un mot seul ne suffit pas." },
    { titre: "Itérer", texte: "Si la réponse ne convient pas, reformule ou précise. On avance par allers-retours : « plus court », « avec un exemple »…" },
    { titre: "Vérifier", texte: "L'IA peut se tromper : on vérifie les infos importantes, et on ne lui confie jamais de données personnelles." },
  ],
  pointsCles: {
    titre: "La recette d'un bon prompt",
    lignes: [
      { cle: "Contexte", detail: "Dis qui tu es et pour quoi : « Je suis en 4e, pour un exposé… »" },
      { cle: "Tâche", detail: "Donne un verbe d'action clair : résume, explique, compare, traduis…" },
      { cle: "Contraintes", detail: "Précise les limites : longueur, niveau, langue, ce qu'il faut éviter." },
      { cle: "Format", detail: "Indique la forme voulue : liste, tableau, plan en 3 parties, paragraphe court." },
    ],
    callout:
      "Exemple complet : « Je suis en 6e (contexte). Résume ce texte (tâche) en 5 phrases simples, sans mots compliqués (contraintes), sous forme de liste à puces (format). »",
  },
  exemples: [
    { titre: "Prompt trop vague → prompt précis", donnees: "Vague : « volcan ».", question: "Comment mieux demander ?", solution: "« Je suis en 6e. Explique en 5 phrases simples comment se forme un volcan, avec un exemple. » → contexte + tâche + format." },
    { titre: "Itérer pour améliorer", donnees: "L'IA donne un texte trop long.", question: "Que faire ensuite ?", solution: "On relance : « Résume ta réponse en 3 phrases, pour un élève de 6e. » On affine sans tout réécrire." },
  ],
  pieges: [
    "Tout croire sans vérifier : l'IA peut inventer des faits (hallucinations).",
    "Donner des données personnelles, sensibles ou confidentielles.",
    "Copier-coller la réponse sans la comprendre (et sans citer l'aide de l'IA).",
    "Écrire un prompt trop court ou trop vague.",
  ],
  aRetenir: [
    "Un bon prompt est précis, avec le contexte, la tâche et le format attendus.",
    "On progresse par itérations : on reformule jusqu'au bon résultat.",
    "On vérifie toujours les informations importantes en croisant les sources.",
    "On ne confie jamais de données personnelles à une IA en ligne.",
    "L'IA aide à apprendre, elle ne remplace pas ta réflexion.",
  ],
  entrainement: [
    { question: "Réécris ce prompt pour qu'il soit efficace : « parle-moi des dinosaures ».", correction: "Par exemple : « Je suis en 6e. Explique en 5 phrases simples pourquoi les dinosaures ont disparu, avec un exemple. » (contexte + tâche + format)" },
    { question: "Une IA t'affirme une date précise pour un exposé noté. Quel est le bon réflexe ?", correction: "Vérifier cette date dans une source fiable (manuel, encyclopédie, site sérieux) avant de l'utiliser : l'IA peut se tromper." },
    { question: "La réponse de l'IA est correcte mais trop compliquée. Que fais-tu ?", correction: "Tu itères : « Explique plus simplement, pour un élève de 6e, avec un exemple du quotidien. »" },
    { question: "Tu veux que l'IA t'aide pour un devoir. Quelles informations ne dois-tu PAS lui donner ?", correction: "Aucune donnée personnelle ou sensible : nom complet, adresse, numéro, mot de passe, informations privées sur toi ou les autres." },
  ],
};

export const ficheEvaluer: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.3",
  titre: "Évaluer l'information à l'ère de l'IA",
  intro:
    "Les IA génératives produisent facilement de fausses images et vidéos (les hypertrucages). Savoir vérifier l'information est devenu essentiel.",
  identite: [
    { label: "Prérequis", valeur: "Esprit critique" },
    { label: "Idée clé", valeur: "Vérifier avant de croire" },
    { label: "Mot clé", valeur: "Hypertrucage (deepfake)" },
  ],
  aQuoiCaSert:
    "Pour ne pas se faire piéger ni propager de fausses infos : reconnaître un contenu truqué, retrouver sa source et recouper avec d'autres sources fiables.",
  leSavaisTu:
    "Aujourd'hui, une photo et quelques phrases suffisent pour fabriquer une fausse vidéo d'une personne disant ce qu'elle n'a jamais dit. C'est souvent indétectable à l'œil nu.",
  notions: [
    { titre: "Les hypertrucages", texte: "Des contenus (photos, vidéos) truqués avec l'IA, très réalistes, qui imitent des personnes réelles." },
    { titre: "Bots & amplification", texte: "De faux contenus diffusés en masse par des robots, puis mis en avant par les algorithmes de recommandation." },
    { titre: "Vérifier", texte: "Chercher qui est l'auteur, quelles sont ses intentions, et recouper l'information avec plusieurs sources." },
  ],
  pointsCles: {
    titre: "Vérifier l'information",
    lignes: [
      { cle: "Auteur", detail: "Qui publie, et pourquoi ?" },
      { cle: "Source", detail: "Retrouver l'origine de l'information." },
      { cle: "Recouper", detail: "Est-elle présente dans plusieurs sources fiables ?" },
      { cle: "Signaler", detail: "Signaler un contenu truqué sur la plateforme." },
    ],
    callout:
      "Une mention « créé avec l'IA » t'invite à regarder le contenu avec esprit critique — pas à le croire ni à paniquer.",
  },
  exemples: [
    { titre: "Une vidéo choc", donnees: "Une vidéo très partagée d'une personnalité connue.", question: "Quel est le bon réflexe ?", solution: "Vérifier l'information auprès de plusieurs sources fiables avant d'y croire ou de la partager." },
  ],
  pieges: [
    "Croire un contenu juste parce qu'il a l'air réaliste.",
    "Partager avant d'avoir vérifié.",
    "Penser que beaucoup de partages = information vraie.",
  ],
  aRetenir: [
    "Les hypertrucages sont faciles à produire et très réalistes.",
    "On vérifie l'auteur et on recoupe les sources.",
    "Le nombre de partages ne prouve rien.",
    "On peut signaler un contenu truqué.",
  ],
  entrainement: [
    { question: "Qu'est-ce qu'un hypertrucage (deepfake) ?", correction: "Un contenu (photo ou vidéo) truqué avec l'IA, qui imite une personne réelle." },
    { question: "Comment vérifier une information trouvée en ligne ?", correction: "Retrouver l'auteur et ses intentions, puis recouper avec plusieurs sources fiables." },
    { question: "Pourquoi de faux contenus se diffusent-ils parfois très vite ?", correction: "Parce que les algorithmes de recommandation favorisent les contenus qui font le plus réagir." },
  ],
};

export const ficheServices: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.4",
  titre: "Utiliser les services de recommandation",
  intro:
    "Vidéos, réseaux sociaux, achats en ligne : ces services s'adaptent à toi. C'est pratique, mais il faut savoir garder le contrôle.",
  identite: [
    { label: "Prérequis", valeur: "Algorithmes de recommandation" },
    { label: "Idée clé", valeur: "Pratique mais à surveiller" },
    { label: "Réflexe", valeur: "Diversifier ses sources" },
  ],
  aQuoiCaSert:
    "Profiter des avantages (gagner du temps, découvrir des contenus) tout en évitant les pièges (enfermement, perte de diversité des points de vue).",
  leSavaisTu:
    "Beaucoup de plateformes permettent de consulter et de modifier ton historique et tes préférences — mais ces options sont souvent bien cachées dans les paramètres.",
  notions: [
    { titre: "Les avantages", texte: "Un filtrage personnalisé dans une offre énorme : tu gagnes du temps et tu découvres de nouveaux contenus." },
    { titre: "Les limites", texte: "L'enfermement algorithmique et la « chambre d'écho » : tu vois surtout ce qui te ressemble déjà." },
    { titre: "Garder le contrôle", texte: "Régler ses paramètres, gérer son historique, et explorer volontairement d'autres sources." },
  ],
  pointsCles: {
    titre: "Avantages & vigilance",
    lignes: [
      { cle: "Avantage", detail: "Trouver plus vite ce qui t'intéresse." },
      { cle: "Limite", detail: "Ne plus voir d'idées différentes des tiennes." },
      { cle: "Paramètres", detail: "Gérer historique et préférences." },
      { cle: "Curiosité", detail: "Explorer d'autres sources volontairement." },
    ],
    callout:
      "Adopter une posture de curiosité : aller chercher par soi-même, au lieu de seulement suivre ce qui est proposé automatiquement.",
  },
  exemples: [
    { titre: "Sortir de la bulle", donnees: "Tu vois toujours les mêmes opinions sur ton fil.", question: "Que faire ?", solution: "Diversifier tes sources, suivre des comptes variés, et nettoyer ton historique dans les paramètres." },
  ],
  pieges: [
    "Ne suivre qu'une seule source d'information.",
    "Croire que tout ce qui est proposé est neutre.",
    "Oublier qu'on peut régler les paramètres.",
  ],
  aRetenir: [
    "La personnalisation a des avantages et des limites.",
    "Risque : enfermement et chambre d'écho.",
    "On peut régler historique et préférences.",
    "Diversifier ses sources est essentiel.",
  ],
  entrainement: [
    { question: "Cite un avantage de la personnalisation des contenus.", correction: "Gagner du temps en trouvant plus vite ce qui t'intéresse." },
    { question: "Cite un inconvénient de la personnalisation.", correction: "Ne plus être exposé à des idées ou contenus différents des siens." },
    { question: "Comment garder un peu de contrôle sur tes recommandations ?", correction: "Consulter et modifier son historique et ses préférences dans les paramètres." },
  ],
};

export const ficheOrga: FicheIaData = {
  domaineId: "2",
  domaineLabel: "Usages",
  competence: "2.5",
  titre: "Utiliser l'IA dans une organisation",
  intro:
    "Dans une entreprise, une association ou un établissement, l'IA peut aider — à condition de bien choisir les outils et de protéger les données.",
  identite: [
    { label: "Prérequis", valeur: "Usages de l'IA" },
    { label: "Idée clé", valeur: "Identifier le besoin, protéger les données" },
    { label: "Mot clé", valeur: "Charte d'usage" },
  ],
  aQuoiCaSert:
    "Bien utiliser l'IA au travail : gagner du temps sur des tâches répétitives, tout en respectant la confidentialité et les règles de l'organisation.",
  leSavaisTu:
    "Pour des réponses fiables sur ses propres documents, une organisation peut utiliser un système RAG : l'IA va d'abord chercher dans une base de documents avant de répondre, ce qui réduit les hallucinations.",
  notions: [
    { titre: "Identifier le besoin", texte: "Quelle tâche veut-on améliorer ? Gagner du temps, générer des contenus, analyser des données…" },
    { titre: "Choisir l'outil", texte: "Repérer un outil qui intègre de l'IA et correspond au besoin, en vérifiant données et conditions d'utilisation." },
    { titre: "Encadrer l'usage", texte: "Une charte interne définit les tâches autorisées et les précautions à prendre sur les données." },
  ],
  pointsCles: {
    titre: "Bien utiliser l'IA au travail",
    lignes: [
      { cle: "Besoin", detail: "Quelle tâche veut-on améliorer ?" },
      { cle: "Outil", detail: "Lequel intègre de l'IA et correspond ?" },
      { cle: "Données", detail: "Confidentialité et conditions d'utilisation." },
      { cle: "Charte", detail: "Règles d'usage de l'IA dans l'organisation." },
    ],
    callout:
      "La génération augmentée par récupération (RAG) fait chercher l'IA dans une base de documents fiables avant de répondre.",
  },
  exemples: [
    { titre: "Résumer des comptes-rendus", donnees: "On veut gagner du temps sur des résumés de réunions.", question: "Quel point vérifier en priorité ?", solution: "La confidentialité des données et les conditions d'utilisation de l'outil." },
  ],
  pieges: [
    "Coller des données personnelles ou confidentielles dans une IA en ligne.",
    "Adopter un outil sans lire les conditions d'utilisation.",
    "Croire les réponses sans les vérifier (hallucinations).",
  ],
  aRetenir: [
    "On part d'un besoin clair.",
    "On vérifie la confidentialité et les conditions.",
    "Une charte encadre l'usage de l'IA.",
    "Le RAG améliore la fiabilité sur ses propres documents.",
  ],
  entrainement: [
    { question: "Avant d'adopter un nouvel outil d'IA, que faut-il vérifier ?", correction: "Les conditions d'utilisation et les mentions légales sur les données." },
    { question: "À quoi sert une charte d'usage de l'IA ?", correction: "À définir les règles d'utilisation autorisée de l'IA dans l'organisation." },
    { question: "Qu'est-ce que le RAG (génération augmentée par récupération) ?", correction: "Faire chercher l'IA dans une base de documents fiables avant de répondre, pour réduire les hallucinations." },
  ],
};

// ── Domaine 3 — Enjeux ──────────────────────────────────────────────────────
export const ficheEmpreinte: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.1",
  titre: "L'empreinte environnementale de l'IA",
  intro:
    "Concevoir et utiliser l'IA consomme de l'énergie et des ressources naturelles. C'est un enjeu environnemental important.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'empreinte carbone" },
    { label: "Idée clé", valeur: "Des calculs = de l'énergie" },
    { label: "Piste", valeur: "L'IA frugale" },
  ],
  aQuoiCaSert:
    "Comprendre l'impact aide à utiliser l'IA de façon plus responsable : se demander si un usage en vaut vraiment le coût environnemental.",
  leSavaisTu:
    "Fabriquer le matériel (cartes graphiques, serveurs) nécessite des ressources rares comme le lithium, le cobalt ou les terres rares, dont l'extraction pollue et a des conséquences sociales.",
  notions: [
    { titre: "La consommation", texte: "Les supercalculateurs qui font tourner l'IA consomment beaucoup d'électricité, pour le calcul et le refroidissement." },
    { titre: "L'entraînement", texte: "Entraîner un grand modèle demande énormément de calculs, donc une grande quantité d'énergie." },
    { titre: "Réduire l'impact", texte: "IA frugale, énergies renouvelables, mutualisation des modèles, et cibler les usages réellement utiles." },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Électricité", detail: "Centres de calcul très gourmands (calcul + refroidissement)." },
      { cle: "Matériel", detail: "Ressources naturelles rares pour les composants." },
      { cle: "Entraînement", detail: "Très coûteux en énergie." },
      { cle: "Réduire", detail: "IA frugale, renouvelables, usages utiles." },
    ],
    callout: "L'« IA frugale » cherche de bonnes performances avec moins de calculs et d'énergie.",
  },
  exemples: [
    { titre: "Pourquoi ça consomme ?", donnees: "Une IA générative grand public utilisée par des millions de personnes.", question: "D'où vient la consommation ?", solution: "Des centres de calcul qui consomment beaucoup d'électricité pour le calcul et le refroidissement des machines." },
  ],
  pieges: [
    "Croire que l'IA n'a aucun impact (« c'est virtuel »).",
    "Oublier la fabrication du matériel.",
    "Multiplier les usages inutiles.",
  ],
  aRetenir: [
    "Les calculs d'IA consomment beaucoup d'énergie.",
    "Le matériel nécessite des ressources rares.",
    "L'entraînement est très coûteux en énergie.",
    "L'IA frugale et les usages utiles réduisent l'impact.",
  ],
  entrainement: [
    { question: "Pourquoi l'IA consomme-t-elle beaucoup d'énergie ?", correction: "Parce que les calculs tournent sur d'immenses centres de calcul gourmands en électricité." },
    { question: "Qu'est-ce que l'IA frugale ?", correction: "Une IA conçue pour de bonnes performances avec moins de calculs et d'énergie." },
    { question: "Que nécessite la fabrication du matériel d'IA ?", correction: "Des ressources naturelles rares (lithium, cobalt, terres rares)." },
  ],
};

export const ficheGouvernance: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.2",
  titre: "La gouvernance de l'IA",
  intro:
    "Le développement de l'IA pose des questions politiques : qui décide des règles ? Qui contrôle ces technologies très puissantes ?",
  identite: [
    { label: "Prérequis", valeur: "Notion de règle / loi" },
    { label: "Idée clé", valeur: "L'IA se régule" },
    { label: "Repère", valeur: "L'IA Act européen" },
  ],
  aQuoiCaSert:
    "Comprendre que l'IA n'est pas sans règles, et que des choix collectifs décident de son usage, aide à devenir un citoyen éclairé.",
  leSavaisTu:
    "La plupart des grandes plateformes d'IA sont contrôlées par un petit nombre d'entreprises situées dans quelques pays : c'est tout l'enjeu de la « souveraineté numérique ».",
  notions: [
    { titre: "Réguler", texte: "Des États, des entreprises et des organisations internationales fixent des règles pour l'IA." },
    { titre: "L'IA Act", texte: "Une loi européenne qui classe les systèmes d'IA selon leur niveau de risque (de minime à interdit)." },
    { titre: "Des valeurs encodées", texte: "Quand une IA filtre ou note, elle s'appuie sur des choix humains : ce qui est acceptable, pertinent, juste." },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Qui régule", detail: "États, entreprises, organisations internationales." },
      { cle: "IA Act", detail: "Classe les IA par niveau de risque." },
      { cle: "Souveraineté", detail: "Garder le contrôle sur ces technologies." },
      { cle: "Valeurs", detail: "Des choix humains sont encodés dans l'IA." },
    ],
    callout:
      "« Gouverner » l'IA, c'est décider collectivement des règles, des limites et des obligations de transparence.",
  },
  exemples: [
    { titre: "Qui fait les règles ?", donnees: "On entend parfois que « l'IA n'a aucune règle ».", question: "Vrai ou faux ?", solution: "Faux : des États, des entreprises et des organisations internationales fixent des règles (ex. l'IA Act européen)." },
  ],
  pieges: [
    "Croire que l'IA n'est encadrée par personne.",
    "Penser qu'une IA est totalement neutre.",
    "Oublier que peu d'acteurs concentrent le pouvoir.",
  ],
  aRetenir: [
    "L'IA est régulée à plusieurs échelles.",
    "L'IA Act classe les IA par niveau de risque.",
    "Peu d'entreprises concentrent le pouvoir (souveraineté).",
    "Des valeurs humaines sont encodées dans l'IA.",
  ],
  entrainement: [
    { question: "Qui peut fixer des règles sur l'IA ?", correction: "Les entreprises, les États et des organisations internationales (ex. l'IA Act européen)." },
    { question: "Que signifie « gouverner » l'IA ?", correction: "Décider collectivement des règles, des limites et des obligations de transparence." },
    { question: "Qu'est-ce que la souveraineté numérique ?", correction: "L'enjeu de garder le contrôle sur des technologies aussi influentes que l'IA." },
  ],
};

export const ficheEthique: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.3",
  titre: "Éthique et transparence de l'IA",
  intro:
    "Concevoir et utiliser une IA pose des questions éthiques : transparence, non-discrimination, et responsabilité en cas d'erreur.",
  identite: [
    { label: "Prérequis", valeur: "Notion d'éthique" },
    { label: "Idée clé", valeur: "Transparence & justice" },
    { label: "Mot clé", valeur: "Explicabilité" },
  ],
  aQuoiCaSert:
    "Juger si une IA est utilisée de façon juste : éviter les discriminations, exiger de la transparence, et savoir qui est responsable en cas de problème.",
  leSavaisTu:
    "Certaines applications (notation sociale, reconnaissance faciale de masse) posent de fortes questions sur les libertés et les droits — au point d'être strictement encadrées, voire interdites.",
  notions: [
    { titre: "Les principes", texte: "Transparence (comprendre le système), explicabilité (expliquer ses décisions), non-discrimination et justice." },
    { titre: "La responsabilité", texte: "Quand une IA cause un dommage, se pose la question : qui est responsable de l'erreur ?" },
    { titre: "Les cadres", texte: "Le RGPD protège les données personnelles ; l'IA Act encadre les usages selon leur niveau de risque." },
  ],
  pointsCles: {
    titre: "Les principes éthiques",
    lignes: [
      { cle: "Transparence", detail: "Comprendre comment l'IA fonctionne." },
      { cle: "Explicabilité", detail: "Pouvoir expliquer ses décisions." },
      { cle: "Non-discrimination", detail: "Éviter de reproduire des inégalités." },
      { cle: "Responsabilité", detail: "Qui répond en cas d'erreur ?" },
    ],
    callout:
      "Le RGPD protège les données personnelles ; l'IA Act classe les usages selon leur niveau de risque (de minime à interdit).",
  },
  exemples: [
    { titre: "Une IA se trompe", donnees: "Une décision automatique cause un dommage à quelqu'un.", question: "Quelle question éthique se pose ?", solution: "Celle de la responsabilité : qui est responsable de l'erreur ?" },
  ],
  pieges: [
    "Croire qu'une IA est toujours neutre et juste.",
    "Penser que la rapidité prime sur la transparence.",
    "Oublier les questions de responsabilité.",
  ],
  aRetenir: [
    "Principes : transparence, explicabilité, non-discrimination, justice.",
    "Une erreur d'IA pose la question de la responsabilité.",
    "Le RGPD protège les données personnelles.",
    "L'IA Act classe les usages par niveau de risque.",
  ],
  entrainement: [
    { question: "Cite deux principes éthiques pour une IA.", correction: "Par exemple la transparence et la non-discrimination." },
    { question: "Qu'est-ce que l'explicabilité d'une IA ?", correction: "Pouvoir expliquer comment elle arrive à sa décision." },
    { question: "Que protège surtout le RGPD ?", correction: "Les données personnelles des individus." },
  ],
};

export const ficheEmploi: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.4",
  titre: "IA, emploi et formation",
  intro:
    "L'IA transforme le travail : certaines tâches disparaissent, d'autres apparaissent. Cela change les compétences attendues dans presque tous les métiers.",
  identite: [
    { label: "Prérequis", valeur: "Notion de métier" },
    { label: "Idée clé", valeur: "Le travail se transforme" },
    { label: "À noter", valeur: "Les travailleurs du clic" },
  ],
  aQuoiCaSert:
    "Comprendre l'impact de l'IA sur les métiers aide à se projeter : se former, s'adapter, et repérer les nouveaux emplois qui apparaissent.",
  leSavaisTu:
    "Derrière les IA, il y a beaucoup de travail humain peu visible : des personnes étiquettent les données et modèrent les contenus — les « travailleurs du clic », souvent mal payés.",
  notions: [
    { titre: "Des tâches automatisées", texte: "L'IA prend en charge des tâches répétitives : certains métiers se transforment ou disparaissent." },
    { titre: "De nouveaux métiers", texte: "Des fonctions apparaissent autour de la conception, la supervision et l'analyse de l'IA." },
    { titre: "Le travail caché", texte: "L'entraînement et la modération reposent sur des humains : les travailleurs du clic." },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Automatisation", detail: "Des tâches répétitives prises en charge." },
      { cle: "Transformation", detail: "Des métiers changent ou disparaissent." },
      { cle: "Nouveaux métiers", detail: "Conception, supervision, analyse de l'IA." },
      { cle: "Formation", detail: "Se former tout au long de la vie." },
    ],
    callout:
      "La question n'est pas seulement « combien d'emplois supprimés ? », mais « comment le travail et les compétences se déplacent ».",
  },
  exemples: [
    { titre: "Un métier qui change", donnees: "Une tâche répétitive d'un métier est automatisée par l'IA.", question: "Tout le métier disparaît-il ?", solution: "Pas forcément : souvent le métier se transforme, et de nouvelles tâches apparaissent." },
  ],
  pieges: [
    "Croire que l'IA supprime tous les métiers.",
    "Croire qu'elle n'a aucun effet sur le travail.",
    "Oublier le travail humain caché derrière l'IA.",
  ],
  aRetenir: [
    "Des tâches disparaissent, d'autres apparaissent.",
    "Les compétences attendues évoluent.",
    "Besoin de se former tout au long de la vie.",
    "Du travail humain caché (les travailleurs du clic).",
  ],
  entrainement: [
    { question: "L'IA supprime-t-elle tous les métiers ?", correction: "Non : certaines tâches disparaissent ou se transforment, mais de nouveaux métiers apparaissent." },
    { question: "Qui sont les « travailleurs du clic » ?", correction: "Des humains qui étiquettent et vérifient des données, souvent dans des conditions précaires." },
    { question: "Pourquoi faut-il se former tout au long de la vie ?", correction: "Parce que l'IA fait évoluer les compétences attendues dans presque tous les métiers." },
  ],
};

export const ficheCulturels: FicheIaData = {
  domaineId: "3",
  domaineLabel: "Enjeux",
  competence: "3.5",
  titre: "Enjeux culturels et sociétaux de l'IA",
  intro:
    "Les IA ne sont pas neutres : elles peuvent reproduire des biais, amplifier de fausses informations, et favoriser certaines langues et cultures.",
  identite: [
    { label: "Prérequis", valeur: "Notion de biais" },
    { label: "Idée clé", valeur: "L'IA reflète ses données" },
    { label: "Enjeu", valeur: "Diversité & vérité" },
  ],
  aQuoiCaSert:
    "Comprendre que l'IA reflète la société aide à garder un regard critique sur ses résultats et à exiger plus de diversité et de justice.",
  leSavaisTu:
    "Comme les modèles sont surtout entraînés sur des contenus en anglais, ils gèrent moins bien d'autres langues et cultures, qui se retrouvent sous-représentées.",
  notions: [
    { titre: "Les biais", texte: "L'IA apprend sur des données qui contiennent déjà des stéréotypes : elle peut les reproduire." },
    { titre: "La désinformation", texte: "Génération automatique de faux contenus, amplifiés par les algorithmes de recommandation." },
    { titre: "La diversité culturelle", texte: "Langues et cultures sous-représentées ; des œuvres imitées sans reconnaître leurs créateurs." },
  ],
  pointsCles: {
    titre: "L'essentiel",
    lignes: [
      { cle: "Biais", detail: "L'IA reproduit les stéréotypes de ses données." },
      { cle: "Désinformation", detail: "Faux contenus générés et amplifiés." },
      { cle: "Culture", detail: "Langues et cultures sous-représentées." },
      { cle: "Création", detail: "Œuvres imitées sans reconnaître les auteurs." },
    ],
    callout:
      "Les biais sont souvent involontaires, mais ils ont des conséquences réelles : recommandations, décisions ou évaluations automatiques.",
  },
  exemples: [
    { titre: "Un métier « genré »", donnees: "Une IA associe « infirmière » à une femme et « ingénieur » à un homme.", question: "Pourquoi ?", solution: "Parce qu'elle apprend sur des données qui contiennent déjà ces stéréotypes." },
  ],
  pieges: [
    "Croire qu'une IA est toujours neutre.",
    "Penser que les biais sont voulus exprès.",
    "Oublier que les contenus viraux ne sont pas forcément vrais.",
  ],
  aRetenir: [
    "L'IA reproduit les biais de ses données.",
    "Elle peut amplifier la désinformation.",
    "Certaines langues et cultures sont sous-représentées.",
    "On garde un regard critique sur ses résultats.",
  ],
  entrainement: [
    { question: "Pourquoi une IA peut-elle reproduire des stéréotypes ?", correction: "Parce qu'elle apprend sur des données qui contiennent déjà ces biais." },
    { question: "Pourquoi de fausses informations se répandent-elles vite ?", correction: "Parce que les algorithmes de recommandation favorisent les contenus qui font le plus réagir." },
    { question: "Pourquoi certaines langues sont-elles moins bien gérées par les IA ?", correction: "Parce qu'il existe moins de données d'entraînement dans ces langues." },
  ],
};

// Ordre du livre (3 parties / 16 chapitres).
export const LIVRE_IA: { competence: string; data: FicheIaData }[] = [
  { competence: "1.1", data: ficheDefinirIa },
  { competence: "1.2", data: ficheApprentissage },
  { competence: "1.3", data: ficheModeles },
  { competence: "1.4", data: ficheLlm },
  { competence: "1.5", data: ficheReco },
  { competence: "1.6", data: ficheRobot },
  { competence: "2.1", data: ficheFamilles },
  { competence: "2.2", data: ficheGenerative },
  { competence: "2.3", data: ficheEvaluer },
  { competence: "2.4", data: ficheServices },
  { competence: "2.5", data: ficheOrga },
  { competence: "3.1", data: ficheEmpreinte },
  { competence: "3.2", data: ficheGouvernance },
  { competence: "3.3", data: ficheEthique },
  { competence: "3.4", data: ficheEmploi },
  { competence: "3.5", data: ficheCulturels },
];
