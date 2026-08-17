// Gabarits du LYCÉE — domaines 2 (Usages) et 3 (Enjeux). Paliers avancé.
//
// Dernier bloc du coach IA. Même exigence qu'en lycee-d1.ts : on ne demande
// plus de reconnaître mais de CHOISIR ET DE JUSTIFIER, et les distracteurs
// sont les raisonnements d'un élève qui a compris à moitié.
//
// ⚠️ Sur le domaine 3, la règle du collège vaut doublement : on explique un
// MÉCANISME, on ne fait pas la morale. Une question honnête se reconnaît à
// ceci — l'élève qui répond juste a compris comment ça marche, il n'a pas
// deviné l'opinion attendue.

import { classer, corriger, situation, type PixGabarit } from "./socle";

export const lyceeD2D3Gabarits: PixGabarit[] = [
  // ── 2.1.5 L'IA pour la prédiction ────────────────────────────────────────
  situation({
    id: "g_l_2_1_5_prediction",
    microskillId: "2.1.5",
    consigne: "Que prédit-on ici, et qu'est-ce que cela suppose ?",
    pool: [
      {
        cas: "Un exploitant prédit la panne d'une machine à partir de ses vibrations.",
        bonne: "on prédit une défaillance à venir, en supposant que les signes précurseurs se répètent",
        pieges: [
          "on détecte une panne déjà survenue à partir de mesures anormales",
          "on classe la machine parmi celles qui tombent souvent en panne",
          "on calcule la durée de vie théorique annoncée par le constructeur",
        ],
        pourquoi:
          "La maintenance prédictive suppose que le passé porte les signes de l'avenir. Une panne d'un type jamais vu échappe au modèle.",
      },
      {
        cas: "Une ville prédit l'affluence des bus pour ajuster les fréquences.",
        bonne: "on prédit une valeur future, et la prédiction va modifier ce qu'elle prédisait",
        pieges: [
          "on prédit une valeur future, indépendante de la décision qui suivra",
          "on classe les lignes selon leur fréquentation habituelle",
          "on mesure l'affluence réelle, qu'on affiche aux voyageurs",
        ],
        pourquoi:
          "Ajouter des bus change l'affluence : la prédiction agit sur son objet. Un modèle figé se trompera de plus en plus.",
      },
      {
        cas: "Un service prédit le risque de décrochage scolaire d'un élève.",
        bonne: "on prédit un risque, et l'usage qu'on en fait décide s'il aide ou s'il étiquette",
        pieges: [
          "on prédit un résultat certain, ce qui permet d'agir à coup sûr",
          "on classe les élèves selon leurs résultats du trimestre écoulé",
          "on mesure le décrochage déjà constaté dans l'établissement",
        ],
        pourquoi:
          "Le même score peut déclencher un accompagnement ou une orientation subie. La prédiction ne décide pas de son usage.",
      },
      {
        cas: "Un modèle prédit la consommation électrique du lendemain à partir de la météo.",
        bonne: "on prédit une valeur, et la qualité dépend d'abord de celle de la prévision météo",
        pieges: [
          "on prédit une valeur, et la météo n'est qu'une variable parmi d'autres",
          "on classe les journées en fortes et faibles consommations",
          "on mesure la consommation, qu'on projette telle quelle sur demain",
        ],
        pourquoi:
          "Une prédiction bâtie sur une autre prédiction hérite de son incertitude. Cela se dit, et se mesure.",
      },
      {
        cas: "Un modèle prédit qu'un client va résilier son abonnement.",
        bonne: "on prédit un comportement, sur des clients partis dans des conditions peut-être révolues",
        pieges: [
          "on prédit un comportement à partir des intentions déclarées du client",
          "on classe les clients selon leur ancienneté dans le service",
          "on mesure les résiliations déjà enregistrées le mois précédent",
        ],
        pourquoi:
          "Le modèle apprend sur ceux qui sont partis hier, dans un marché et à un tarif qui ont pu changer.",
      },
      {
        cas: "Une équipe annonce que son modèle prédit les séismes à trois jours.",
        bonne: "il faut voir sur quelles données il a été testé : ce domaine est celui des fausses promesses",
        pieges: [
          "c'est une avancée majeure, la prédiction sismique étant enfin résolue",
          "c'est impossible : aucun phénomène naturel n'est prévisible",
          "il suffit de vérifier le taux de bonnes prédictions annoncé",
        ],
        pourquoi:
          "Sur un événement rare, un modèle qui répond toujours « non » a un excellent taux de réussite. Le protocole compte plus que le score.",
      },
    ],
  }),

  // ── 2.1.6 Polyvalence des assistants génératifs ──────────────────────────
  corriger({
    id: "g_l_2_1_6_polyvalence",
    microskillId: "2.1.6",
    pool: [
      {
        affirmation: "Un assistant qui sait chercher sur le Web ne peut plus inventer.",
        bonne: "il invente moins, mais il peut mal lire, mal citer ou choisir une source douteuse",
        pieges: [
          "c'est exact : une réponse sourcée est par construction vérifiée",
          "c'est faux : la recherche n'a aucun effet sur les inventions",
          "c'est exact tant que les sources consultées sont des sites officiels",
        ],
        pourquoi:
          "La recherche déplace le risque : de l'invention pure vers l'erreur de lecture et le choix de source. Elle ne le supprime pas.",
      },
      {
        affirmation: "Un assistant polyvalent est un modèle unique qui sait tout faire.",
        bonne: "c'est un modèle entouré d'outils : recherche, calcul, exécution de code",
        pieges: [
          "c'est un modèle unique, entraîné sur tous les domaines à la fois",
          "c'est plusieurs modèles spécialisés entre lesquels il bascule",
          "c'est exact, et c'est pourquoi ces modèles sont si volumineux",
        ],
        pourquoi:
          "La polyvalence vient de l'orchestration autant que du modèle. C'est aussi ce qui la rend fragile : un outil défaillant, et la chaîne casse.",
      },
      {
        affirmation: "Si l'assistant exécute du code, ses calculs sont désormais fiables.",
        bonne: "le calcul devient exact, mais c'est le modèle qui décide QUEL calcul lancer",
        pieges: [
          "c'est exact : un code exécuté ne peut pas donner de résultat faux",
          "c'est faux : le code produit par un modèle est toujours incorrect",
          "c'est exact à condition que le code soit relu par un développeur",
        ],
        pourquoi:
          "L'exactitude du calcul ne garantit pas la pertinence de la question posée au calculateur.",
      },
      {
        affirmation: "Un assistant qui a accès à mes fichiers travaille localement, mes données restent chez moi.",
        bonne: "cela dépend entièrement du service : l'accès local n'implique pas le traitement local",
        pieges: [
          "c'est exact : un accès aux fichiers suppose un fonctionnement local",
          "c'est faux : aucun assistant ne peut accéder à des fichiers locaux",
          "c'est exact si le service affiche une mention de confidentialité",
        ],
        pourquoi:
          "Beaucoup d'outils lisent en local et envoient le contenu à un serveur. La question se pose, la réponse est dans les conditions.",
      },
      {
        affirmation: "Plus un assistant a d'outils, meilleur il est.",
        bonne: "chaque outil ajoute une surface d'erreur et un accès à surveiller",
        pieges: [
          "c'est exact : chaque outil élargit ce qu'il peut accomplir",
          "c'est faux : les outils ralentissent la réponse sans rien apporter",
          "c'est exact, à condition que les outils soient bien documentés",
        ],
        pourquoi:
          "Un assistant qui peut envoyer des courriels peut en envoyer un de travers. La capacité et le risque grandissent ensemble.",
      },
      {
        affirmation: "Quand l'assistant se trompe en utilisant un outil, c'est l'outil qui a échoué.",
        bonne: "le plus souvent c'est l'appel qui était mal formé : le modèle a mal traduit la demande",
        pieges: [
          "c'est exact : le modèle ne fait que transmettre la demande à l'outil",
          "c'est faux : un outil ne peut jamais être en cause dans une erreur",
          "c'est exact, et c'est pourquoi il faut changer d'outil régulièrement",
        ],
        pourquoi:
          "Entre la demande et l'outil, il y a une traduction faite par le modèle. C'est là que ça casse le plus souvent.",
      },
    ],
  }),

  // ── 2.2.5 Interroger en différentes modalités ────────────────────────────
  situation({
    id: "g_l_2_2_5_modalites",
    microskillId: "2.2.5",
    consigne: "Quelle modalité employer, et avec quelle précaution ?",
    pool: [
      {
        cas: "Tu veux comprendre un graphique complexe tiré d'un article scientifique.",
        bonne: "lui fournir l'image ET le contexte écrit : seule, elle sera lue sans savoir ce qu'elle mesure",
        pieges: [
          "lui fournir l'image seule : un modèle multimodal lit tout ce qu'elle contient",
          "recopier les chiffres à la main, le modèle ne sachant pas lire une image",
          "lui demander de chercher l'article en ligne plutôt que de lire l'image",
        ],
        pourquoi:
          "La lecture d'image est bonne sur la forme, faible sur ce qui n'y figure pas : unités, protocole, ce que l'axe représente vraiment.",
      },
      {
        cas: "Tu veux faire transcrire un cours enregistré au fond de la classe.",
        bonne: "l'audio convient, mais la transcription sera à relire : le bruit dégrade beaucoup",
        pieges: [
          "l'audio convient et la transcription sera fidèle, quel que soit le bruit",
          "il faut d'abord retaper le cours à la main pour obtenir un texte propre",
          "l'audio ne convient pas : ces modèles ne traitent que le texte écrit",
        ],
        pourquoi:
          "La qualité d'entrée décide de la qualité de sortie. Un enregistrement lointain produit des transcriptions confiantes et fausses.",
      },
      {
        cas: "Tu photographies un exercice de maths manuscrit pour te le faire expliquer.",
        bonne: "vérifier d'abord que l'énoncé a été lu correctement avant d'exploiter l'explication",
        pieges: [
          "utiliser directement l'explication : la lecture d'écriture manuscrite est fiable",
          "recopier l'énoncé à la main, la photo n'étant jamais exploitable",
          "demander plusieurs explications et retenir celle qui te convainc",
        ],
        pourquoi:
          "Une erreur de lecture au départ produit une explication parfaitement cohérente… d'un autre exercice.",
      },
      {
        cas: "Tu veux faire décrire une photo pour une personne malvoyante.",
        bonne: "préciser à quoi sert la description : le niveau de détail utile n'est pas le même selon l'usage",
        pieges: [
          "demander simplement « décris cette image » : le modèle jugera du détail",
          "demander la description la plus longue possible pour ne rien manquer",
          "demander une description courte, plus facile à écouter par la personne",
        ],
        pourquoi:
          "Décrire pour se repérer, pour comprendre une scène ou pour légender un document appelle trois descriptions différentes.",
      },
      {
        cas: "Tu envoies une capture d'écran de tableau plutôt que le tableau lui-même.",
        bonne: "fournir les données brutes quand tu les as : une capture ajoute une lecture qui peut rater",
        pieges: [
          "la capture convient : le modèle lit les tableaux sans difficulté",
          "la capture est préférable : elle conserve la mise en forme d'origine",
          "il faut faire les deux et comparer les résultats obtenus",
        ],
        pourquoi:
          "Chaque conversion est une occasion d'erreur. Le format le plus direct est le plus sûr.",
      },
      {
        cas: "Un camarade dit qu'un modèle multimodal « voit » l'image comme nous.",
        bonne: "il la transforme en nombres et prédit du texte : le résultat ressemble, le procédé non",
        pieges: [
          "il a raison : c'est le principe même de la vision par ordinateur",
          "il a tort : ces modèles ne traitent en réalité que le texte des images",
          "il a raison pour les photos, tort pour les schémas et les graphiques",
        ],
        pourquoi:
          "Le mot « voir » prête à la machine une expérience qu'elle n'a pas — comme « comprendre » ou « neurone ».",
      },
    ],
  }),

  // ── 2.2.6 Vérifier en croisant les sources ───────────────────────────────
  classer({
    id: "g_l_2_2_6_croiser",
    microskillId: "2.2.6",
    consigne: "Cette vérification est-elle valable ?",
    familles: [
      "oui : la source est indépendante et identifiable",
      "non : ce n'est pas une source indépendante",
      "non : on interroge le même outil autrement",
      "insuffisant : il faudrait remonter à la source d'origine",
    ],
    pool: [
      {
        cas: "Reposer la question à la même IA en changeant la formulation.",
        famille: "non : on interroge le même outil autrement",
        pourquoi: "Le modèle peut répéter la même invention : la cohérence n'est pas la vérité.",
      },
      {
        cas: "Retrouver l'information sur le site de l'organisme qui produit la statistique.",
        famille: "oui : la source est indépendante et identifiable",
        pourquoi: "On atteint le producteur de la donnée : c'est le meilleur cas.",
      },
      {
        cas: "Vérifier que trois sites d'actualité reprennent la même dépêche d'agence.",
        famille: "non : ce n'est pas une source indépendante",
        pourquoi: "Trois reprises d'une même dépêche font une source, pas trois.",
      },
      {
        cas: "Trouver un article de presse qui cite l'étude, sans lire l'étude.",
        famille: "insuffisant : il faudrait remonter à la source d'origine",
        pourquoi: "L'article peut mal résumer. Utile comme piste, pas comme preuve.",
      },
      {
        cas: "Demander à une SECONDE IA, d'un autre éditeur, si l'affirmation est exacte.",
        famille: "non : on interroge le même outil autrement",
        pourquoi:
          "Deux modèles entraînés sur des corpus qui se recoupent peuvent partager la même erreur. Ce n'est pas une vérification.",
      },
      {
        cas: "Consulter le texte de loi sur le site officiel de publication.",
        famille: "oui : la source est indépendante et identifiable",
        pourquoi: "Le texte fait foi : c'est la source primaire.",
      },
      {
        cas: "Vérifier que l'information figure dans une encyclopédie collaborative.",
        famille: "insuffisant : il faudrait remonter à la source d'origine",
        pourquoi: "Ces pages citent leurs sources : c'est là qu'il faut aller.",
      },
      {
        cas: "Comparer avec un site qui reprend l'article d'origine sans le citer.",
        famille: "non : ce n'est pas une source indépendante",
        pourquoi: "Une reprise non créditée reste une reprise : elle ne confirme rien.",
      },
    ],
  }),

  // ── 2.3.5 Bots et reco amplifient les contenus truqués ───────────────────
  situation({
    id: "g_l_2_3_5_amplification",
    microskillId: "2.3.5",
    consigne: "Quel mécanisme est à l'œuvre ?",
    pool: [
      {
        cas: "Un faux contenu est publié par cent comptes créés le même jour, puis repris par de vrais comptes.",
        bonne: "l'amorçage artificiel a suffi : l'algorithme a lu ce volume comme un signal d'intérêt",
        pieges: [
          "les vrais comptes ont été trompés par la qualité du faux contenu",
          "l'algorithme a détecté les faux comptes mais n'a pas pu les bloquer",
          "le contenu était intéressant, son origine artificielle n'a rien changé",
        ],
        pourquoi:
          "Il suffit d'amorcer : une fois le signal donné, la recommandation fait le reste et la diffusion devient authentique.",
      },
      {
        cas: "Un contenu faux mais indignant circule dix fois plus vite que son démenti.",
        bonne: "l'indignation engage plus que la correction, et l'algorithme mesure l'engagement",
        pieges: [
          "le démenti est publié trop tard pour rattraper la diffusion initiale",
          "les plateformes freinent volontairement la diffusion des démentis",
          "les utilisateurs ne s'intéressent pas aux corrections d'information",
        ],
        pourquoi:
          "Ce n'est pas le délai qui explique l'écart, c'est la nature du signal : un démenti n'indigne personne.",
      },
      {
        cas: "Une personne dit avoir vu la même fausse information sur trois réseaux différents.",
        bonne: "la répétition sur plusieurs canaux augmente la crédibilité sans rien prouver",
        pieges: [
          "trois réseaux indépendants qui la relaient rendent l'information probable",
          "les trois réseaux appartiennent forcément à la même entreprise",
          "cela prouve que la fausse information a été correctement détectée",
        ],
        pourquoi:
          "L'effet de simple répétition est documenté : voir plusieurs fois rend plus crédible, même en sachant que c'est faux.",
      },
      {
        cas: "Une plateforme décide de ne plus recommander un contenu, sans le supprimer.",
        bonne: "réduire la portée sans censurer : la modération n'est pas seulement supprimer ou laisser",
        pieges: [
          "c'est une censure déguisée, qui ne dit pas son nom",
          "c'est sans effet : un contenu accessible circule quand même",
          "c'est une obligation légale imposée aux plateformes européennes",
        ],
        pourquoi:
          "La portée est le vrai levier. Un contenu qu'on ne recommande plus reste accessible et cesse de se propager.",
      },
      {
        cas: "Un compte automatique répond à chaque publication d'un sujet pour orienter les commentaires.",
        bonne: "il fabrique une apparence de consensus, que d'autres prendront pour l'opinion majoritaire",
        pieges: [
          "il n'a aucun effet : les lecteurs distinguent un compte automatique",
          "il permet d'informer plus vite qu'un modérateur humain ne le ferait",
          "il augmente simplement le nombre de commentaires sous la publication",
        ],
        pourquoi:
          "Manipuler l'apparence de la majorité est plus efficace que convaincre : c'est le but de ces comptes.",
      },
      {
        cas: "Une équipe veut mesurer l'ampleur réelle d'une campagne de faux comptes.",
        bonne: "il faut les données de la plateforme : de l'extérieur, on ne voit que ce qui est public",
        pieges: [
          "il suffit de compter les comptes suspects visibles publiquement",
          "il suffit d'analyser les textes pour repérer ceux qui sont générés",
          "il suffit de mesurer le nombre de partages du contenu concerné",
        ],
        pourquoi:
          "C'est pourquoi l'accès des chercheurs aux données est devenu un enjeu de régulation.",
      },
    ],
  }),

  // ── 2.3.6 Appliquer les principes du fact-checking ───────────────────────
  situation({
    id: "g_l_2_3_6_factchecking",
    microskillId: "2.3.6",
    consigne: "Par quoi commencer ?",
    pool: [
      {
        cas: "Un graphique montre une courbe qui s'envole. L'axe vertical commence à 95 %.",
        bonne: "regarder les axes : une échelle tronquée transforme une variation minime en envolée",
        pieges: [
          "vérifier que les données du graphique proviennent d'une source fiable",
          "vérifier la date de publication du graphique et son actualité",
          "comparer avec un autre graphique portant sur les mêmes données",
        ],
        pourquoi:
          "Le graphique peut être exact ET trompeur. C'est la lecture de l'échelle qui le révèle, avant toute question de source.",
      },
      {
        cas: "Une photo authentique circule avec une légende qui la situe ailleurs.",
        bonne: "chercher les apparitions antérieures de l'image : le trucage est dans la légende",
        pieges: [
          "analyser l'image pour détecter des traces de retouche numérique",
          "vérifier si l'auteur de la photo est un photographe professionnel",
          "attendre que la plateforme signale le contenu comme trompeur",
        ],
        pourquoi:
          "La décontextualisation est la manipulation la plus répandue, et elle ne laisse aucune trace dans le fichier.",
      },
      {
        cas: "Une affirmation cite « une étude de Harvard » sans autre précision.",
        bonne: "chercher l'étude elle-même : une institution prestigieuse n'est pas une référence",
        pieges: [
          "considérer la source comme fiable au vu de la réputation de l'institution",
          "vérifier que Harvard travaille bien sur ce domaine de recherche",
          "chercher si d'autres sites mentionnent la même étude",
        ],
        pourquoi:
          "Le nom d'une institution sert d'argument d'autorité. Sans titre, auteur ni date, l'étude est invérifiable — parfois inexistante.",
      },
      {
        cas: "Un pourcentage spectaculaire est avancé sans mention de l'effectif.",
        bonne: "chercher sur combien de cas il porte : 50 % sur quatre personnes, ce sont deux personnes",
        pieges: [
          "vérifier que le pourcentage a été calculé selon la bonne méthode",
          "comparer ce pourcentage à celui d'années antérieures",
          "vérifier la source qui publie ce pourcentage",
        ],
        pourquoi:
          "Le dénominateur manquant est un classique. Un pourcentage sans effectif ne veut rien dire.",
      },
      {
        cas: "Une vidéo montre une personnalité disant une phrase choquante, en gros plan, son un peu étouffé.",
        bonne: "chercher l'enregistrement complet : le montage et la coupe précèdent toujours le trucage",
        pieges: [
          "analyser le mouvement des lèvres pour détecter un hypertrucage",
          "vérifier si la personnalité a démenti la vidéo publiquement",
          "regarder le nombre de vues et la date de mise en ligne",
        ],
        pourquoi:
          "Avant de soupçonner l'IA, on cherche la version longue : la phrase sortie de son contexte reste la manipulation la plus courante.",
      },
      {
        cas: "Tu ne parviens ni à confirmer ni à infirmer une information.",
        bonne: "s'abstenir de la relayer : ne pas savoir est un résultat, pas un échec",
        pieges: [
          "la relayer en précisant qu'elle n'a pas pu être vérifiée",
          "la relayer sous forme de question, ce qui n'affirme rien",
          "la considérer comme fausse par défaut et la démentir",
        ],
        pourquoi:
          "Relayer sous forme de question diffuse tout autant. L'abstention est une décision, et souvent la bonne.",
      },
    ],
  }),

  // ── 2.4.5 Régler les paramètres de recommandation ────────────────────────
  situation({
    id: "g_l_2_4_5_reglages",
    microskillId: "2.4.5",
    consigne: "Ce réglage produit quel effet, réellement ?",
    pool: [
      {
        cas: "Tu supprimes tout ton historique de visionnage.",
        bonne: "les suggestions changent en partie : appareil, abonnements et profils voisins subsistent",
        pieges: [
          "les suggestions repartent entièrement de zéro, comme un compte neuf",
          "les suggestions ne changent pas : l'historique n'est qu'un affichage",
          "les suggestions deviennent aléatoires jusqu'au prochain visionnage",
        ],
        pourquoi:
          "L'historique visible n'est qu'une des sources du système. Le nettoyer aide sans remettre le compteur à zéro.",
      },
      {
        cas: "Tu désactives la personnalisation dans les réglages.",
        bonne: "tu vois un classement plus générique — souvent le plus populaire, ce qui reste un choix",
        pieges: [
          "tu vois l'intégralité du catalogue dans l'ordre de publication",
          "tu ne vois plus aucune suggestion, seulement ta liste d'abonnements",
          "tu vois les mêmes contenus, la personnalisation restant active en arrière-plan",
        ],
        pourquoi:
          "Désactiver la personnalisation ne donne pas une vue neutre : cela remplace un classement par un autre.",
      },
      {
        cas: "Tu utilises la navigation privée pour ne pas influencer tes recommandations.",
        bonne: "cela isole cette session, mais le service peut te reconnaître si tu restes connecté",
        pieges: [
          "cela empêche toute collecte : la navigation privée est anonyme",
          "cela n'a aucun effet : le service te reconnaît dans tous les cas",
          "cela supprime aussi l'historique déjà enregistré sur ton compte",
        ],
        pourquoi:
          "La navigation privée efface les traces LOCALES. Connecté, le service sait très bien qui tu es.",
      },
      {
        cas: "Tu utilises « ne plus me recommander cette chaîne » sur un contenu qui t'agace.",
        bonne: "c'est le signal le plus net que tu puisses donner, bien plus qu'un simple évitement",
        pieges: [
          "cela supprime la chaîne, qui devient inaccessible depuis ton compte",
          "cela n'a aucun effet, ces boutons étant surtout décoratifs",
          "cela signale la chaîne à la modération de la plateforme",
        ],
        pourquoi:
          "Passer une vidéo est un signal faible et ambigu. Le bouton explicite ne se prête à aucune interprétation.",
      },
      {
        cas: "Tu demandes l'export de tes données pour voir ce que le service sait de toi.",
        bonne: "c'est un droit, et l'export révèle souvent bien plus que ce que l'interface montre",
        pieges: [
          "c'est une démarche commerciale que le service peut refuser",
          "l'export ne contient que les informations de ton profil déclaré",
          "l'export supprime automatiquement les données conservées",
        ],
        pourquoi:
          "Le droit d'accès du RGPD ouvre exactement cette porte, et l'écart avec ce que l'interface affiche est souvent instructif.",
      },
      {
        cas: "Un service ne propose aucun réglage de personnalisation.",
        bonne: "il reste le comportement : ce que tu consultes est le seul levier dont tu disposes",
        pieges: [
          "il est en infraction : ces réglages sont obligatoires en Europe",
          "il n'utilise donc pas de personnalisation dans ses suggestions",
          "il suffit de créer un nouveau compte pour repartir proprement",
        ],
        pourquoi:
          "Faute de réglage, le seul signal reste l'usage. C'est aussi pourquoi l'absence de réglage n'est pas neutre.",
      },
    ],
  }),

  // ── 2.4.6 Diversifier ses contenus ───────────────────────────────────────
  corriger({
    id: "g_l_2_4_6_diversifier",
    microskillId: "2.4.6",
    pool: [
      {
        affirmation: "Suivre plus de comptes suffit à diversifier ce que je vois.",
        bonne: "si ces comptes se ressemblent, la bulle se resserre au lieu de s'ouvrir",
        pieges: [
          "c'est exact : plus de sources donnent forcément plus de points de vue",
          "c'est faux : le nombre de comptes suivis n'influence pas les suggestions",
          "c'est exact, à condition de suivre au moins une centaine de comptes",
        ],
        pourquoi:
          "Ce n'est pas le nombre qui diversifie, c'est l'écart entre les sources.",
      },
      {
        affirmation: "Lire les commentaires me donne accès aux avis contraires.",
        bonne: "les commentaires sont eux aussi classés, souvent par engagement",
        pieges: [
          "c'est exact : les commentaires ne sont pas soumis à l'algorithme",
          "c'est faux : les commentaires sont toujours affichés par ordre d'arrivée",
          "c'est exact, mais uniquement sur les publications très commentées",
        ],
        pourquoi: "Le fil de commentaires est un second classement, pas une fenêtre ouverte.",
      },
      {
        affirmation: "Un algorithme qui me propose plus de variété est forcément meilleur.",
        bonne: "plus de variété n'est pas plus de qualité : la diversité est un moyen, pas un but",
        pieges: [
          "c'est exact : la variété protège de l'enfermement algorithmique",
          "c'est faux : la variété dégrade toujours la pertinence des propositions",
          "c'est exact si la variété porte sur les sujets et non sur les formats",
        ],
        pourquoi:
          "Ajouter du bruit diversifie aussi. Ce qui compte est de rencontrer d'autres points de vue argumentés.",
      },
      {
        affirmation: "Puisque je choisis ce que je regarde, je ne suis pas enfermé.",
        bonne: "tu choisis dans ce qui t'est proposé : l'enfermement porte sur la liste, pas sur le clic",
        pieges: [
          "c'est exact tant que tu n'utilises pas la lecture automatique",
          "c'est faux : l'algorithme décide entièrement à ta place",
          "c'est exact si tu utilises la recherche plutôt que les suggestions",
        ],
        pourquoi: "C'est le point le plus difficile à voir : le choix est réel, l'ensemble des options ne l'est pas.",
      },
      {
        affirmation: "Une plateforme n'a aucun intérêt à me faire sortir de ma bulle.",
        bonne: "elle en a un : un utilisateur lassé part, la diversité entretient l'usage",
        pieges: [
          "c'est exact : son intérêt est de me retenir le plus longtemps possible",
          "c'est faux : les plateformes sont tenues par la loi de diversifier",
          "c'est exact, sauf pour les plateformes financées par abonnement",
        ],
        pourquoi:
          "L'intérêt des plateformes n'est pas uniformément contre la diversité. Le comprendre évite de tout expliquer par le complot.",
      },
      {
        affirmation: "Diversifier ses sources demande d'y consacrer beaucoup de temps.",
        bonne: "quelques sources bien choisies et régulières suffisent : c'est l'écart qui compte, pas le volume",
        pieges: [
          "c'est exact : il faut suivre l'actualité sur de nombreux supports",
          "c'est faux : la diversité s'obtient sans aucun effort particulier",
          "c'est exact, et c'est pourquoi peu de gens y parviennent réellement",
        ],
        pourquoi:
          "Deux ou trois sources franchement différentes valent mieux que trente qui se ressemblent.",
      },
    ],
  }),

  // ── 2.5.5 Génération augmentée (RAG) ─────────────────────────────────────
  situation({
    id: "g_l_2_5_5_rag",
    microskillId: "2.5.5",
    consigne: "Le RAG répond-il au besoin, et à quelle condition ?",
    pool: [
      {
        cas: "Un lycée veut un assistant qui réponde aux questions sur SON règlement intérieur.",
        bonne: "oui : le RAG va chercher dans le règlement fourni, sans réentraîner le modèle",
        pieges: [
          "non : il faut réentraîner un modèle sur le règlement de l'établissement",
          "non : le modèle connaît déjà les règlements des établissements scolaires",
          "oui, mais il faudra vérifier chaque réponse auprès de la direction",
        ],
        pourquoi:
          "C'est le cas d'usage type : une base documentaire propre, consultée au moment de répondre.",
      },
      {
        cas: "Les documents fournis au système contiennent une version périmée d'une procédure.",
        bonne: "le RAG répondra fidèlement… à partir du document périmé : il ne juge pas la fraîcheur",
        pieges: [
          "le modèle repérera la contradiction et signalera la version obsolète",
          "le RAG choisit toujours le document le plus récent de la base",
          "le modèle complétera avec ses propres connaissances, plus à jour",
        ],
        pourquoi:
          "Le RAG déplace la responsabilité vers la BASE. Une base mal tenue produit des réponses fausses et sourcées.",
      },
      {
        cas: "Un service annonce que grâce au RAG, son assistant n'hallucine plus.",
        bonne: "il hallucine moins : il peut encore mal lire un passage ou en inventer la synthèse",
        pieges: [
          "c'est exact : une réponse tirée d'un document ne peut pas être inventée",
          "c'est faux : le RAG n'a aucun effet sur les hallucinations",
          "c'est exact à condition que les documents soient courts",
        ],
        pourquoi:
          "Le RAG ancre la réponse, il ne la garantit pas. C'est pourquoi les citations doivent rester vérifiables.",
      },
      {
        cas: "La question posée ne trouve aucun passage pertinent dans la base.",
        bonne: "le système doit le dire : sans cela, il répondra depuis le modèle, sans le signaler",
        pieges: [
          "le système répondra depuis ses connaissances générales, ce qui convient",
          "le système ne répondra rien du tout, faute de document à citer",
          "le système ira chercher l'information sur Internet automatiquement",
        ],
        pourquoi:
          "Le repli silencieux vers le modèle est le défaut le plus insidieux d'un RAG : la réponse a l'air sourcée et ne l'est pas.",
      },
      {
        cas: "Une entreprise veut un assistant sur ses documents internes, dont certains sont confidentiels.",
        bonne: "le RAG évite le réentraînement, mais les documents transitent : il faut savoir où et vers qui",
        pieges: [
          "le RAG protège les documents, qui ne quittent jamais l'entreprise",
          "le RAG expose autant qu'un réentraînement sur ces mêmes documents",
          "il n'y a aucun risque : seuls les extraits pertinents sont transmis",
        ],
        pourquoi:
          "Les extraits transmis sont des extraits de documents confidentiels. La question de l'hébergement se pose entièrement.",
      },
      {
        cas: "Une équipe veut savoir si son RAG fonctionne bien.",
        bonne: "vérifier que les passages cités contiennent VRAIMENT la réponse donnée",
        pieges: [
          "vérifier que le système cite bien des sources dans ses réponses",
          "vérifier que les réponses paraissent correctes à la lecture",
          "vérifier que la base de documents est bien complète et à jour",
        ],
        pourquoi:
          "Citer une source et en tirer la bonne réponse sont deux choses. C'est ce décalage qu'il faut mesurer.",
      },
    ],
  }),

  // ── 2.5.6 Apport d'une charte interne d'usage ────────────────────────────
  corriger({
    id: "g_l_2_5_6_charte",
    microskillId: "2.5.6",
    pool: [
      {
        affirmation: "Une charte d'usage sert surtout à se protéger juridiquement.",
        bonne: "elle sert d'abord à ce que chacun sache ce qui est permis : sans elle, chacun décide seul",
        pieges: [
          "elle sert à choisir l'outil que l'organisation va déployer",
          "elle sert à démontrer la conformité à l'IA Act européen",
          "c'est exact : sa fonction principale est de dégager la responsabilité",
        ],
        pourquoi:
          "Sans règle commune, les usages se répandent quand même — chacun avec ses propres limites, et personne ne le sait.",
      },
      {
        affirmation: "Une bonne charte interdit tout ce qui présente un risque.",
        bonne: "une charte qui interdit tout est contournée : elle doit dire ce qui est PERMIS, et comment",
        pieges: [
          "c'est exact : mieux vaut interdire trop que pas assez",
          "c'est faux : une charte ne peut rien interdire, elle recommande",
          "c'est exact pour les données sensibles, faux pour le reste",
        ],
        pourquoi:
          "Une interdiction générale pousse à l'usage clandestin — le pire des deux mondes : le risque sans le cadre.",
      },
      {
        affirmation: "Une charte écrite une fois vaut pour les années à venir.",
        bonne: "les outils changent vite : une charte non revue devient fausse sans que personne ne le voie",
        pieges: [
          "c'est exact : les principes de fond ne changent pas avec les outils",
          "c'est faux : une charte doit être réécrite chaque trimestre",
          "c'est exact si elle reste formulée en termes généraux",
        ],
        pourquoi:
          "Une charte qui ne mentionne pas les usages réels d'aujourd'hui n'encadre plus rien.",
      },
      {
        affirmation: "La charte concerne les salariés, pas les outils achetés par la direction.",
        bonne: "elle doit couvrir les deux : le choix des outils engage autant que leur usage",
        pieges: [
          "c'est exact : le choix des outils relève de la politique d'achat",
          "c'est faux : la charte ne concerne que les outils, pas les personnes",
          "c'est exact, la direction étant soumise à d'autres obligations",
        ],
        pourquoi:
          "Un outil mal choisi expose l'organisation quels que soient les usages qu'on en fait.",
      },
      {
        affirmation: "Si la charte est respectée, il n'y a plus de risque.",
        bonne: "elle réduit les risques prévus : elle ne dit rien de ceux qu'on n'avait pas vus",
        pieges: [
          "c'est exact : c'est précisément l'objet d'une charte d'usage",
          "c'est faux : une charte n'a aucun effet sur les risques réels",
          "c'est exact tant que les outils utilisés restent les mêmes",
        ],
        pourquoi:
          "Une charte encadre ce qu'on a su anticiper. Elle doit prévoir comment signaler ce qu'elle n'avait pas prévu.",
      },
      {
        affirmation: "Publier la charte suffit à ce qu'elle soit appliquée.",
        bonne: "une règle non expliquée n'est pas appliquée : la formation fait partie de la charte",
        pieges: [
          "c'est exact dès lors que chacun a signé en avoir pris connaissance",
          "c'est faux : seule une sanction rend une charte effective",
          "c'est exact si la charte est rédigée en termes simples",
        ],
        pourquoi:
          "Comme pour les conditions d'utilisation : ce qui n'est pas compris n'est pas suivi.",
      },
    ],
  }),

  // ── 3.1.5 Émissions directes et indirectes ───────────────────────────────
  classer({
    id: "g_l_3_1_5_emissions",
    microskillId: "3.1.5",
    consigne: "Cette émission relève de quelle catégorie ?",
    familles: [
      "directe : liée au fonctionnement des serveurs",
      "indirecte, amont : liée à la fabrication du matériel",
      "indirecte, aval : liée aux usages induits",
      "hors périmètre : ce n'est pas une émission",
    ],
    pool: [
      {
        cas: "L'électricité consommée par les cartes de calcul pendant l'entraînement.",
        famille: "directe : liée au fonctionnement des serveurs",
        pourquoi: "C'est la consommation du calcul lui-même.",
      },
      {
        cas: "L'extraction du cobalt entrant dans les composants électroniques.",
        famille: "indirecte, amont : liée à la fabrication du matériel",
        pourquoi: "Elle a lieu avant toute mise en service : c'est l'empreinte incorporée.",
      },
      {
        cas: "L'augmentation du trafic de données engendrée par un nouveau service populaire.",
        famille: "indirecte, aval : liée aux usages induits",
        pourquoi: "Ce sont les effets de l'usage, hors du périmètre direct de l'exploitant.",
      },
      {
        cas: "Le nombre d'utilisateurs inscrits sur le service.",
        famille: "hors périmètre : ce n'est pas une émission",
        pourquoi: "Un effectif n'est pas une émission — c'est une variable d'exposition.",
      },
      {
        cas: "La climatisation des salles où sont installés les serveurs.",
        famille: "directe : liée au fonctionnement des serveurs",
        pourquoi: "Le refroidissement fait partie du fonctionnement.",
      },
      {
        cas: "Le transport maritime des serveurs depuis leur usine de fabrication.",
        famille: "indirecte, amont : liée à la fabrication du matériel",
        pourquoi: "Tout ce qui précède la mise en service relève de l'amont.",
      },
      {
        cas: "Le renouvellement plus fréquent des téléphones pour faire tourner de nouvelles applications.",
        famille: "indirecte, aval : liée aux usages induits",
        pourquoi: "L'effet rebond est un poste réel, et souvent le plus difficile à chiffrer.",
      },
      {
        cas: "Le coût financier de l'abonnement au service.",
        famille: "hors périmètre : ce n'est pas une émission",
        pourquoi: "Un prix n'est pas une empreinte, même s'il en dépend en partie.",
      },
    ],
  }),

  // ── 3.1.6 Le concept d'IA frugale ────────────────────────────────────────
  situation({
    id: "g_l_3_1_6_frugale",
    microskillId: "3.1.6",
    consigne: "Cette décision relève-t-elle de la frugalité ?",
    pool: [
      {
        cas: "Une équipe remplace un très grand modèle par un modèle spécialisé dix fois plus petit, aussi bon sur sa tâche.",
        bonne: "oui : c'est le cœur de la frugalité — la puissance juste nécessaire, pas la puissance disponible",
        pieges: [
          "non : réduire la taille dégrade forcément la qualité obtenue",
          "oui, mais uniquement si le modèle tourne sur l'appareil de l'utilisateur",
          "non : la frugalité concerne l'énergie, pas la taille des modèles",
        ],
        pourquoi:
          "Un modèle spécialisé bat souvent un généraliste sur sa tâche, pour une fraction du coût.",
      },
      {
        cas: "Une entreprise déplace ses serveurs dans un pays où l'électricité est décarbonée.",
        bonne: "cela réduit les émissions sans réduire la consommation : utile, mais ce n'est pas de la frugalité",
        pieges: [
          "oui : moins d'émissions, c'est exactement l'objectif de la frugalité",
          "non : déplacer des serveurs augmente toujours l'empreinte totale",
          "oui, et cela dispense de tout autre effort de réduction",
        ],
        pourquoi:
          "Décarboner et sobriété sont deux leviers distincts. Les confondre permet de ne rien changer à l'usage.",
      },
      {
        cas: "Un établissement demande aux élèves de formuler leur requête précisément du premier coup.",
        bonne: "oui : cinq relances valent cinq réponses générées, et une bonne requête est une économie réelle",
        pieges: [
          "non : le nombre de requêtes n'a aucun effet mesurable",
          "oui, mais l'effet est trop faible pour être pris en compte",
          "non : c'est une consigne pédagogique, sans lien avec l'énergie",
        ],
        pourquoi:
          "C'est aussi une compétence : bien demander est utile, économe, et cela s'apprend.",
      },
      {
        cas: "Une équipe entraîne cinq modèles pour choisir le meilleur, puis jette les quatre autres.",
        bonne: "non : quatre entraînements complets pour rien, c'est le contraire de la frugalité",
        pieges: [
          "oui : comparer plusieurs modèles permet de retenir le plus économe",
          "non, mais c'est indispensable : on ne peut pas choisir autrement",
          "oui : les entraînements abandonnés ne consomment pas réellement",
        ],
        pourquoi:
          "La recherche d'architecture par force brute est l'un des postes les plus coûteux et les moins discutés.",
      },
      {
        cas: "Un service garde son matériel sept ans au lieu de trois.",
        bonne: "oui : la fabrication est déjà engagée, l'étaler sur plus d'années est un levier direct",
        pieges: [
          "non : du matériel ancien consomme plus d'énergie à l'usage",
          "oui, mais uniquement si le matériel reste performant",
          "non : la durée de vie ne relève pas de l'IA frugale",
        ],
        pourquoi:
          "L'empreinte incorporée pèse lourd. L'amortir plus longtemps est souvent le meilleur geste disponible.",
      },
      {
        cas: "Une entreprise compense ses émissions en achetant des crédits carbone.",
        bonne: "non : compenser n'est pas réduire, et la frugalité porte sur ce qu'on consomme",
        pieges: [
          "oui : le résultat net sur le climat est équivalent",
          "non, mais c'est la seule solution pour un service déjà en place",
          "oui, à condition que les crédits soient certifiés",
        ],
        pourquoi:
          "La compensation est un mécanisme financier. Elle ne change rien à l'énergie consommée ni au matériel fabriqué.",
      },
    ],
  }),

  // ── 3.2.5 Cadres de gouvernance / IA Act ─────────────────────────────────
  classer({
    id: "g_l_3_2_5_risque",
    microskillId: "3.2.5",
    consigne: "À quel niveau de risque l'IA Act range-t-il cet usage ?",
    familles: [
      "risque inacceptable : interdit",
      "risque élevé : obligations renforcées",
      "risque limité : obligation de transparence",
      "risque minime : pas d'obligation particulière",
    ],
    pool: [
      {
        cas: "Un système de notation sociale généralisée des citoyens par une autorité publique.",
        famille: "risque inacceptable : interdit",
        pourquoi: "C'est l'exemple type des pratiques prohibées par le règlement.",
      },
      {
        cas: "Un logiciel de tri de candidatures à l'embauche.",
        famille: "risque élevé : obligations renforcées",
        pourquoi: "L'accès à l'emploi figure explicitement dans les usages à risque élevé.",
      },
      {
        cas: "Un agent conversationnel de service client.",
        famille: "risque limité : obligation de transparence",
        pourquoi: "L'utilisateur doit savoir qu'il s'adresse à une machine.",
      },
      {
        cas: "Un filtre anti-spam dans une messagerie.",
        famille: "risque minime : pas d'obligation particulière",
        pourquoi: "Usage courant sans effet notable sur les droits des personnes.",
      },
      {
        cas: "Une IA d'aide au diagnostic médical.",
        famille: "risque élevé : obligations renforcées",
        pourquoi: "La santé est un domaine explicitement visé.",
      },
      {
        cas: "Un système qui exploite les vulnérabilités d'enfants pour modifier leur comportement.",
        famille: "risque inacceptable : interdit",
        pourquoi: "La manipulation exploitant une vulnérabilité fait partie des interdictions.",
      },
      {
        cas: "Un générateur d'images qui doit signaler que ses contenus sont synthétiques.",
        famille: "risque limité : obligation de transparence",
        pourquoi: "On n'interdit pas le contenu : on impose de dire ce qu'il est.",
      },
      {
        cas: "Un correcteur orthographique intégré à un traitement de texte.",
        famille: "risque minime : pas d'obligation particulière",
        pourquoi: "Aucun effet sur les droits fondamentaux.",
      },
    ],
  }),

  // ── 3.3.3 Open source, open data, open weight ────────────────────────────
  classer({
    id: "g_l_3_3_3_ouvert",
    microskillId: "3.3.3",
    consigne: "Qu'est-ce qui est réellement ouvert ici ?",
    familles: [
      "les poids du modèle (open weight)",
      "le code source du logiciel",
      "les données d'entraînement",
      "rien : seule l'utilisation est gratuite",
    ],
    pool: [
      {
        cas: "Un éditeur publie les paramètres appris de son modèle, réutilisables et modifiables.",
        famille: "les poids du modèle (open weight)",
        pourquoi: "On peut faire tourner et ajuster le modèle sans repartir de zéro.",
      },
      {
        cas: "Un dépôt public contient le programme d'entraînement, sans le modèle entraîné.",
        famille: "le code source du logiciel",
        pourquoi: "On voit la méthode ; il faudrait des données et du calcul pour obtenir un modèle.",
      },
      {
        cas: "Un corpus de textes annotés est mis à disposition sous licence libre.",
        famille: "les données d'entraînement",
        pourquoi: "C'est de l'open data : le plus rare des trois, et souvent le plus contraint juridiquement.",
      },
      {
        cas: "Un service propose son assistant sans frais, mais rien n'est publié.",
        famille: "rien : seule l'utilisation est gratuite",
        pourquoi: "Gratuit et ouvert sont deux choses distinctes, régulièrement confondues.",
      },
      {
        cas: "Un modèle peut être téléchargé et exécuté hors ligne, mais ses données restent secrètes.",
        famille: "les poids du modèle (open weight)",
        pourquoi: "C'est le cas le plus fréquent des modèles dits « ouverts ».",
      },
      {
        cas: "La liste des sources ayant servi à l'entraînement est publiée en détail.",
        famille: "les données d'entraînement",
        pourquoi: "Rare, et c'est ce qui permet d'examiner les biais à leur origine.",
      },
      {
        cas: "Un laboratoire publie l'architecture et la méthode dans un article, sans rien d'autre.",
        famille: "le code source du logiciel",
        pourquoi: "La publication scientifique ouvre la méthode, pas le produit.",
      },
      {
        cas: "Une interface est accessible sans compte, avec une limite de requêtes par jour.",
        famille: "rien : seule l'utilisation est gratuite",
        pourquoi: "L'accès libre n'ouvre ni le modèle, ni le code, ni les données.",
      },
    ],
  }),

  // ── 3.3.4 Degré d'explicabilité ──────────────────────────────────────────
  situation({
    id: "g_l_3_3_4_explicabilite",
    microskillId: "3.3.4",
    consigne: "Quel degré d'explicabilité faut-il ici, et pourquoi ?",
    pool: [
      {
        cas: "Un modèle décide de l'attribution d'une aide sociale.",
        bonne: "une explication opposable, compréhensible par la personne et vérifiable par un tiers",
        pieges: [
          "une explication technique, destinée aux ingénieurs qui l'ont conçu",
          "aucune explication n'est nécessaire si le taux d'erreur est faible",
          "la publication du code source du modèle suffit à cette exigence",
        ],
        pourquoi:
          "Une décision qui affecte des droits doit pouvoir être contestée. Une explication qu'on ne peut pas comprendre n'en est pas une.",
      },
      {
        cas: "Un modèle propose des morceaux de musique.",
        bonne: "une explication sommaire suffit : l'enjeu est faible, une indication du critère suffit",
        pieges: [
          "la même exigence que pour une décision médicale doit s'appliquer",
          "aucune explication : la recommandation n'engage rien du tout",
          "il faut publier l'ensemble des paramètres du système de recommandation",
        ],
        pourquoi:
          "Proportionner l'exigence à l'enjeu est le principe de l'IA Act. Tout exiger partout reviendrait à ne rien exiger nulle part.",
      },
      {
        cas: "Un modèle d'aide au diagnostic est très performant mais opaque.",
        bonne: "garder la décision humaine et documenter les cas où le modèle échoue",
        pieges: [
          "l'utiliser tel quel : sa performance mesurée est la meilleure garantie",
          "l'interdire tant qu'une explication complète n'est pas disponible",
          "demander au modèle de rédiger l'explication de chaque diagnostic",
        ],
        pourquoi:
          "⚠️ Une explication produite par le modèle n'est pas son raisonnement : c'est un texte plausible de plus.",
      },
      {
        cas: "Une entreprise affirme que son modèle est explicable parce qu'il affiche un score de confiance.",
        bonne: "un score de confiance dit à quel point le modèle est sûr, pas pourquoi il a décidé cela",
        pieges: [
          "elle a raison : le score de confiance est la forme la plus utile d'explication",
          "elle a tort : un score de confiance n'a aucune signification",
          "elle a raison si le score est calibré sur des données de test",
        ],
        pourquoi:
          "Confiance et explication sont deux dimensions différentes. Un modèle peut être très sûr et totalement inexplicable.",
      },
      {
        cas: "Un chercheur montre les mots qui ont le plus pesé dans une décision de classement de texte.",
        bonne: "c'est une explication partielle, utile, qui ne dit pas pourquoi ces mots ont pesé",
        pieges: [
          "c'est une explication complète : on connaît les causes de la décision",
          "c'est sans valeur : seul un modèle simple peut être expliqué",
          "cela suffit à satisfaire les obligations légales de transparence",
        ],
        pourquoi:
          "Ces méthodes localisent l'influence sans restituer le raisonnement. Utile, à ne pas surestimer.",
      },
      {
        cas: "Une équipe doit choisir entre un modèle explicable à 92 % de réussite et un modèle opaque à 95 %.",
        bonne: "cela dépend de ce qu'on doit garantir : ce qui touche des personnes penche vers l'explicable",
        pieges: [
          "prendre le plus performant : trois points valent mieux qu'une explication",
          "prendre l'explicable : un modèle opaque n'est jamais acceptable",
          "faire tourner les deux et servir la réponse commune aux deux",
        ],
        pourquoi:
          "Il n'y a pas de règle générale. Poser la question du domaine et de l'enjeu EST la compétence attendue.",
      },
    ],
  }),

  // ── 3.5.4 Biais culturels et linguistiques ───────────────────────────────
  corriger({
    id: "g_l_3_5_4_culturel",
    microskillId: "3.5.4",
    pool: [
      {
        affirmation: "Un modèle multilingue traite toutes les langues de la même façon.",
        bonne: "le volume disponible par langue diffère énormément, et la qualité suit",
        pieges: [
          "c'est exact : un modèle multilingue est entraîné également sur chaque langue",
          "c'est faux : un modèle ne traite en réalité qu'une seule langue",
          "c'est exact pour les langues européennes, faux pour les autres",
        ],
        pourquoi:
          "Une langue peu présente dans les corpus est moins bien servie — traduction, nuances, références culturelles.",
      },
      {
        affirmation: "Traduire un texte avec une IA ne pose pas de question culturelle.",
        bonne: "la traduction charrie des choix : registre, implicites, références qui n'existent pas ailleurs",
        pieges: [
          "c'est exact : la traduction automatique est un traitement purement technique",
          "c'est faux : la traduction automatique est toujours culturellement biaisée",
          "c'est exact tant qu'on traduit entre deux langues européennes",
        ],
        pourquoi:
          "Un modèle entraîné majoritairement sur des textes d'une aire culturelle en reprend les évidences.",
      },
      {
        affirmation: "Les biais culturels d'un modèle viennent de ses concepteurs.",
        bonne: "ils viennent surtout des données : ce qui est écrit, dans quelle langue, par qui",
        pieges: [
          "c'est exact : les équipes de conception imposent leur point de vue",
          "c'est faux : les biais culturels sont introduits par les utilisateurs",
          "c'est exact, et c'est pourquoi il faut diversifier ces équipes",
        ],
        pourquoi:
          "Diversifier les équipes aide. Mais l'origine première reste la composition des corpus.",
      },
      {
        affirmation: "Un modèle qui répond bien en français est aussi bon en créole réunionnais.",
        bonne: "non : le volume de texte disponible est sans commune mesure entre les deux",
        pieges: [
          "c'est exact : les deux langues sont proches, le modèle transfère",
          "c'est faux : un modèle ne peut pas traiter les langues régionales",
          "c'est exact si le modèle a été entraîné sur des textes français",
        ],
        pourquoi:
          "Les langues à faible corpus sont mal servies. C'est un enjeu direct pour les élèves d'ici.",
      },
      {
        affirmation: "Il suffit d'ajouter des données d'une langue pour corriger le déséquilibre.",
        bonne: "c'est nécessaire et pas suffisant : encore faut-il que ces données soient variées et de qualité",
        pieges: [
          "c'est exact : le volume est le seul facteur qui compte réellement",
          "c'est faux : ajouter des données ne change jamais le comportement",
          "c'est exact, à condition que les données soient annotées",
        ],
        pourquoi:
          "Un corpus abondant mais uniforme reproduit un seul point de vue, dans cette langue aussi.",
      },
      {
        affirmation: "Comparer deux modèles sur un même sujet sensible ne prouve rien.",
        bonne: "cela révèle que des choix ont été faits : deux réponses différentes montrent qu'aucune n'est neutre",
        pieges: [
          "c'est exact : deux modèles différents donnent forcément des réponses différentes",
          "c'est faux : le modèle qui répond le mieux est identifiable ainsi",
          "c'est exact : seule une évaluation par des experts a une valeur",
        ],
        pourquoi:
          "L'écart est l'information. Il rend visible ce qui, sur un seul modèle, passerait pour la réalité.",
      },
    ],
  }),
];
