// Gabarits du domaine 3 — Enjeux du développement de l'IA. Paliers novice /
// indépendant.
//
// Un gabarit par savoir-faire. Voir socle.ts pour la règle et les helpers.
//
// ⚠️ LE DOMAINE LE PLUS EXPOSÉ, ET IL FAUT LE DIRE. Sur l'environnement, la
// gouvernance, l'emploi ou les biais, la bonne réponse est nuancée — donc
// longue — et les faux choix glissent vers la caricature. Une caricature ne se
// coche pas : elle montre du doigt. Les réservoirs ci-dessous prennent le parti
// inverse : les distracteurs sont des positions QUE DES GENS DÉFENDENT, ou des
// confusions courantes entre deux textes, deux causes, deux échelles.
//
// ⚠️ ET ON NE FAIT PAS LA MORALE. Sur ces sujets, la tentation est d'écrire des
// questions dont la bonne réponse est celle qui rassure. Une question honnête
// se reconnaît à ceci : l'élève qui répond juste a compris un MÉCANISME, pas
// deviné l'opinion attendue.

import { classer, corriger, situation, type PixGabarit } from "./socle";

export const d3Gabarits: PixGabarit[] = [
  // ── 3.1.1 Les supercalculateurs consomment beaucoup d'énergie ────────────
  classer({
    id: "g_3_1_1_ou_passe_energie",
    microskillId: "3.1.1",
    consigne: "Dans cet usage, où part l'essentiel de l'énergie ?",
    familles: [
      "dans le calcul lui-même, sur les serveurs",
      "dans le refroidissement des machines",
      "dans la fabrication du matériel, avant tout usage",
      "dans le transport des données sur le réseau",
    ],
    pool: [
      {
        cas: "Un modèle de langage est entraîné pendant plusieurs semaines sur des milliers de processeurs.",
        famille: "dans le calcul lui-même, sur les serveurs",
        pourquoi: "L'entraînement est la phase de calcul la plus intense de toute la vie d'un modèle.",
      },
      {
        cas: "Un centre de données doit maintenir ses salles à température constante toute l'année.",
        famille: "dans le refroidissement des machines",
        pourquoi:
          "Le refroidissement peut représenter une part très importante de la consommation d'un centre de données.",
      },
      {
        cas: "On extrait du lithium et des terres rares pour fabriquer les cartes de calcul.",
        famille: "dans la fabrication du matériel, avant tout usage",
        pourquoi: "L'impact du matériel est engagé avant même que la machine ne soit allumée.",
      },
      {
        cas: "Une réponse de quelques lignes est envoyée depuis le serveur jusqu'à ton téléphone.",
        famille: "dans le transport des données sur le réseau",
        pourquoi:
          "Le transport d'un texte court est faible, mais c'est bien là que passe cette part-là de l'énergie.",
      },
      {
        cas: "Des milliers de cartes graphiques tournent à pleine charge pour affiner un modèle.",
        famille: "dans le calcul lui-même, sur les serveurs",
        pourquoi: "Une carte à pleine charge consomme, et elles sont des milliers.",
      },
      {
        cas: "Un centre de données installé en zone chaude fait tourner ses climatisations en continu.",
        famille: "dans le refroidissement des machines",
        pourquoi: "C'est pour cela que certains centres s'installent dans des régions froides.",
      },
      {
        cas: "Une entreprise remplace tous ses serveurs par un modèle plus récent.",
        famille: "dans la fabrication du matériel, avant tout usage",
        pourquoi:
          "Renouveler du matériel a un coût environnemental propre, indépendant de l'usage qu'on en fera.",
      },
      {
        cas: "Une vidéo en haute définition est diffusée à des millions de personnes.",
        famille: "dans le transport des données sur le réseau",
        pourquoi: "Le volume transporté est ici l'essentiel — ce n'est pas de l'IA, mais la comparaison éclaire.",
      },
    ],
  }),

  // ── 3.1.2 L'entraînement consomme beaucoup d'énergie ─────────────────────
  corriger({
    id: "g_3_1_2_entrainement",
    microskillId: "3.1.2",
    pool: [
      {
        affirmation: "Une fois le modèle entraîné, il ne consomme plus rien.",
        bonne: "chaque réponse consomme encore, et le nombre de réponses est immense",
        pieges: [
          "il consomme encore, mais uniquement lorsqu'on lui pose une question difficile",
          "il consomme encore autant qu'à l'entraînement, à chaque utilisation",
          "c'est exact : l'énergie est entièrement dépensée pendant l'entraînement",
        ],
        pourquoi:
          "Une réponse coûte peu comparée à l'entraînement. Mais des milliards de réponses finissent par peser.",
      },
      {
        affirmation: "Entraîner un modèle une fois suffit : on ne recommence jamais.",
        bonne: "les modèles sont réentraînés régulièrement, et chaque version repart en grande partie de zéro",
        pieges: [
          "c'est exact : on met ensuite le modèle à jour par petites corrections",
          "c'est exact : réentraîner coûterait trop cher pour être envisagé",
          "c'est faux : les modèles se réentraînent en continu pendant leur usage",
        ],
        pourquoi:
          "Chaque nouvelle version relance un entraînement lourd. C'est ce qui rend le coût récurrent, pas ponctuel.",
      },
      {
        affirmation: "Un modèle plus gros est toujours plus coûteux à entraîner qu'à utiliser.",
        bonne: "cela dépend du nombre d'utilisateurs : à très grande échelle, l'usage finit par dépasser",
        pieges: [
          "c'est exact dans tous les cas : l'entraînement reste la phase la plus lourde",
          "c'est faux : l'usage est toujours plus coûteux que l'entraînement",
          "les deux coûts sont par construction du même ordre de grandeur",
        ],
        pourquoi:
          "Un entraînement est un coût fixe, l'usage un coût par requête. Au-delà d'un certain volume, le second l'emporte.",
      },
      {
        affirmation: "Puisque l'énergie vient d'un centre de données, mon usage n'y change rien.",
        bonne: "le total est fait de tous les usages : le mien en est une part, minuscule mais réelle",
        pieges: [
          "c'est exact : le centre consomme la même chose, que je l'utilise ou non",
          "c'est exact : mon usage individuel est trop faible pour être mesuré",
          "c'est faux : chaque requête déclenche l'allumage de serveurs dédiés",
        ],
        pourquoi:
          "Un centre ajuste sa charge à la demande. Raisonner « ma part est nulle » appliqué par tous donne un total nul, ce qui est faux.",
      },
      {
        affirmation: "Demander une réponse à une IA générative coûte autant qu'une recherche sur le Web.",
        bonne: "une réponse générée coûte en général nettement plus qu'une recherche classique",
        pieges: [
          "c'est exact : les deux passent par les mêmes centres de données",
          "c'est faux : la recherche classique coûte beaucoup plus cher",
          "les deux coûts sont trop faibles pour qu'on puisse les comparer",
        ],
        pourquoi:
          "C'est ce qui fonde l'idée de sobriété : choisir l'outil à la mesure du besoin plutôt que le plus puissant.",
      },
      {
        affirmation: "L'impact de l'IA se résume à l'électricité consommée par les serveurs.",
        bonne: "il faut compter aussi la fabrication du matériel, l'eau de refroidissement et les déchets",
        pieges: [
          "il faut compter aussi le transport des données, qui domine largement le reste",
          "c'est exact : les autres postes sont négligeables devant l'électricité",
          "c'est faux : seule la fabrication du matériel compte réellement",
        ],
        pourquoi:
          "Une empreinte se compte sur tout le cycle de vie, pas sur la seule facture d'électricité.",
      },
    ],
  }),

  // ── 3.1.3 Pistes pour réduire l'impact environnemental ───────────────────
  situation({
    id: "g_3_1_3_reduire",
    microskillId: "3.1.3",
    consigne: "Quelle piste réduit vraiment l'impact ?",
    pool: [
      {
        cas: "Un collège veut faire calculer une moyenne de notes à des élèves.",
        bonne: "utiliser un tableur : mobiliser une IA générative pour cela gaspille",
        pieges: [
          "utiliser une IA générative, qui explique en plus la démarche",
          "utiliser une IA générative en lui demandant une réponse courte",
          "utiliser une IA générative hébergée dans un pays à électricité décarbonée",
        ],
        pourquoi:
          "La première sobriété est de choisir l'outil à la mesure du besoin. Une moyenne n'a pas besoin d'un grand modèle.",
      },
      {
        cas: "Une équipe a besoin d'un modèle capable de classer des courriels internes.",
        bonne: "réutiliser un modèle déjà entraîné et l'ajuster, plutôt que d'en entraîner un",
        pieges: [
          "entraîner un modèle sur mesure, plus précis pour ce cas particulier",
          "utiliser le plus grand modèle disponible, qui saura tout faire",
          "entraîner plusieurs modèles et garder celui qui marche le mieux",
        ],
        pourquoi:
          "Repartir d'un modèle existant évite un entraînement complet : c'est l'économie la plus directe.",
      },
      {
        cas: "Une application mobile doit reconnaître un objet photographié.",
        bonne: "faire tourner un petit modèle sur l'appareil, plutôt qu'appeler un serveur",
        pieges: [
          "appeler un très grand modèle distant, plus fiable dans tous les cas",
          "envoyer la photo en haute définition pour améliorer la reconnaissance",
          "appeler deux modèles distants et comparer leurs deux réponses",
        ],
        pourquoi:
          "Un petit modèle local évite à la fois le transport et le calcul distant. C'est l'idée de l'IA frugale.",
      },
      {
        cas: "Un service veut réduire son empreinte sans dégrader ce qu'il rend à ses utilisateurs.",
        bonne: "mesurer d'abord où part l'énergie, avant de décider quoi optimiser",
        pieges: [
          "réduire immédiatement la taille du modèle employé, quel qu'en soit l'effet",
          "déplacer ses serveurs dans un pays où l'électricité coûte moins cher",
          "limiter le nombre de requêtes que chaque utilisateur peut envoyer",
        ],
        pourquoi:
          "Sans mesure, on optimise au hasard. Le poste dominant n'est pas toujours celui qu'on croit.",
      },
      {
        cas: "Une entreprise renouvelle son parc de serveurs tous les deux ans pour rester performante.",
        bonne: "allonger la durée de vie du matériel : sa fabrication pèse lourd",
        pieges: [
          "renouveler plus souvent : les machines récentes consomment moins",
          "revendre l'ancien matériel, ce qui annule son impact initial",
          "compenser en achetant des serveurs alimentés en énergie renouvelable",
        ],
        pourquoi:
          "Le coût de fabrication est déjà engagé : l'étaler sur plus d'années est souvent le meilleur levier.",
      },
      {
        cas: "Un établissement veut que ses élèves utilisent l'IA de façon plus sobre.",
        bonne: "leur apprendre à formuler une requête précise du premier coup",
        pieges: [
          "leur interdire l'usage de l'IA en dehors des heures de cours",
          "limiter le nombre de questions autorisées par élève et par jour",
          "leur demander de préférer systématiquement les modèles gratuits",
        ],
        pourquoi:
          "Cinq relances valent cinq réponses générées. Une requête bien posée est une économie réelle, et une compétence.",
      },
    ],
  }),

  // ── 3.1.4 Ressources naturelles rares pour le matériel ───────────────────
  corriger({
    id: "g_3_1_4_ressources",
    microskillId: "3.1.4",
    pool: [
      {
        affirmation: "Le numérique est immatériel, il ne consomme pas de matières premières.",
        bonne: "chaque serveur demande des métaux extraits, transportés et transformés",
        pieges: [
          "il en consomme, mais uniquement du silicium, qui est très abondant",
          "il en consomme, mais tout est recyclé en fin de vie des appareils",
          "c'est exact : seule l'électricité consommée doit être prise en compte",
        ],
        pourquoi:
          "« Le nuage » est fait de bâtiments, de câbles et de cartes. Rien de tout cela n'est immatériel.",
      },
      {
        affirmation: "Les terres rares s'appellent ainsi parce qu'elles sont introuvables.",
        bonne: "elles sont assez répandues, mais très dispersées : c'est leur extraction qui est coûteuse",
        pieges: [
          "c'est exact : leurs gisements sont presque épuisés dans le monde",
          "elles sont rares parce qu'un seul pays en détient la totalité",
          "elles sont rares parce qu'elles n'existent qu'en très faible quantité",
        ],
        pourquoi:
          "Le problème n'est pas la quantité disponible mais le coût, environnemental et social, de leur séparation.",
      },
      {
        affirmation: "Recycler les appareils suffit à régler la question des métaux.",
        bonne: "le recyclage récupère une part limitée de ces métaux, et la demande croît plus vite",
        pieges: [
          "c'est exact, à condition que tous les appareils soient collectés",
          "c'est faux : ces métaux ne peuvent pas du tout être recyclés",
          "c'est exact : le recyclage couvre déjà la majeure partie des besoins",
        ],
        pourquoi:
          "Séparer des métaux mélangés en très petites quantités reste techniquement difficile et peu rentable.",
      },
      {
        affirmation: "L'extraction de ces métaux ne pose qu'un problème environnemental.",
        bonne: "elle pose aussi des questions sociales : conditions de travail et partage des revenus",
        pieges: [
          "elle pose surtout un problème économique, celui du prix des composants",
          "c'est exact : les conditions de travail y sont réglementées partout",
          "elle pose surtout un problème politique entre pays producteurs",
        ],
        pourquoi:
          "Les conditions d'extraction, notamment du cobalt, sont un enjeu de droits humains autant qu'un enjeu écologique.",
      },
      {
        affirmation: "Ces enjeux concernent l'IA plus que le reste du numérique.",
        bonne: "ils concernent tout le numérique : l'IA accélère une demande qui existait déjà",
        pieges: [
          "c'est exact : les cartes de calcul pour l'IA sont d'un type unique",
          "c'est faux : l'IA n'utilise pas de matériel différent des autres usages",
          "ils concernent surtout les téléphones, bien plus nombreux que les serveurs",
        ],
        pourquoi:
          "Attribuer tout le problème à l'IA fait manquer sa cause. L'IA amplifie une tendance de fond.",
      },
      {
        affirmation: "Un service d'IA hébergé en Europe n'a pas d'impact sur ces extractions.",
        bonne: "le matériel a été fabriqué ailleurs : l'impact précède l'installation",
        pieges: [
          "c'est exact : les normes européennes encadrent toute la chaîne",
          "c'est exact tant que l'électricité utilisée est produite en Europe",
          "c'est faux : l'Europe extrait elle-même la plupart de ces métaux",
        ],
        pourquoi:
          "Le lieu d'hébergement change l'électricité consommée, pas l'origine des composants.",
      },
    ],
  }),

  // ── 3.2.1 L'IA est régulée à plusieurs échelles ──────────────────────────
  classer({
    id: "g_3_2_1_echelle",
    microskillId: "3.2.1",
    consigne: "À quelle échelle cette règle est-elle décidée ?",
    familles: [
      "à l'échelle européenne",
      "à l'échelle d'un pays",
      "à l'échelle d'une entreprise ou d'un établissement",
      "à l'échelle internationale, sans force obligatoire",
    ],
    pool: [
      {
        cas: "L'IA Act, qui classe les systèmes d'IA par niveau de risque.",
        famille: "à l'échelle européenne",
        pourquoi: "C'est un règlement de l'Union européenne, applicable dans tous les États membres.",
      },
      {
        cas: "Le RGPD, qui protège les données personnelles.",
        famille: "à l'échelle européenne",
        pourquoi: "Également un règlement européen, antérieur à l'IA Act.",
      },
      {
        cas: "La charte d'usage de l'IA affichée dans ton collège.",
        famille: "à l'échelle d'une entreprise ou d'un établissement",
        pourquoi: "Elle n'engage que l'établissement qui l'a adoptée.",
      },
      {
        cas: "Une recommandation de l'UNESCO sur l'éthique de l'IA.",
        famille: "à l'échelle internationale, sans force obligatoire",
        pourquoi: "Une recommandation oriente ; elle ne s'impose pas comme une loi.",
      },
      {
        cas: "Une loi nationale qui encadre la vidéosurveillance algorithmique.",
        famille: "à l'échelle d'un pays",
        pourquoi: "Chaque État peut légiférer au-delà du cadre européen commun.",
      },
      {
        cas: "Les conditions d'utilisation d'un service d'IA que tu acceptes en t'inscrivant.",
        famille: "à l'échelle d'une entreprise ou d'un établissement",
        pourquoi: "Ce sont les règles que l'entreprise pose pour son propre service.",
      },
      {
        cas: "Un accord entre États sur la sûreté des modèles les plus puissants.",
        famille: "à l'échelle internationale, sans force obligatoire",
        pourquoi: "Ces déclarations engagent politiquement sans créer d'obligation directe.",
      },
      {
        cas: "L'autorité nationale chargée de contrôler la protection des données.",
        famille: "à l'échelle d'un pays",
        pourquoi:
          "Le règlement est européen, mais son contrôle est exercé par une autorité de chaque pays.",
      },
    ],
  }),

  // ── 3.2.2 Acteurs internationaux influents ───────────────────────────────
  corriger({
    id: "g_3_2_2_acteurs",
    microskillId: "3.2.2",
    pool: [
      {
        affirmation: "Les grands modèles d'IA sont développés partout dans le monde de façon équilibrée.",
        bonne: "quelques entreprises, dans un petit nombre de pays, en concentrent l'essentiel",
        pieges: [
          "ils sont développés surtout par des universités et des laboratoires publics",
          "ils sont développés par des organisations internationales sans but lucratif",
          "c'est exact : chaque grand pays développe désormais ses propres modèles",
        ],
        pourquoi:
          "Entraîner un très grand modèle demande des moyens que peu d'acteurs réunissent. C'est ce qui crée la concentration.",
      },
      {
        affirmation: "La souveraineté numérique, c'est protéger les données personnelles des citoyens.",
        bonne: "c'est garder la maîtrise des technologies dont on dépend : les données n'en sont qu'une part",
        pieges: [
          "c'est interdire aux entreprises étrangères d'opérer sur le territoire",
          "c'est obliger les services à héberger leurs données dans le pays",
          "c'est exact : les deux expressions désignent la même chose",
        ],
        pourquoi:
          "La protection des données est un enjeu distinct : on peut protéger des données tout en dépendant entièrement d'outils étrangers.",
      },
      {
        affirmation: "Un modèle à poids ouverts échappe à toute concentration.",
        bonne: "il se réutilise librement, mais son entraînement reste le fait de gros acteurs",
        pieges: [
          "c'est exact : n'importe qui peut désormais entraîner son propre modèle",
          "c'est faux : les modèles à poids ouverts n'existent pas réellement",
          "c'est exact : leur publication est imposée par la réglementation",
        ],
        pourquoi:
          "Ouvrir les poids rebat une partie des cartes en aval. La capacité à entraîner, elle, reste concentrée.",
      },
      {
        affirmation: "Si un service est gratuit, c'est qu'aucune entreprise n'a d'intérêt derrière.",
        bonne: "la gratuité s'accompagne d'un autre modèle : données, attention, ou usage payant plus tard",
        pieges: [
          "c'est exact : ces services sont financés par la recherche publique",
          "c'est faux : les services d'IA gratuits n'existent pas vraiment",
          "c'est exact tant que le service n'affiche aucune publicité",
        ],
        pourquoi:
          "Demander « qui paie, et avec quoi ? » est la question la plus utile devant un service gratuit.",
      },
      {
        affirmation: "L'Europe n'a aucun rôle dans le paysage mondial de l'IA.",
        bonne: "elle pèse surtout par la règle : l'IA Act s'applique à qui veut opérer chez elle",
        pieges: [
          "c'est exact : aucun modèle important n'y a jamais été développé",
          "c'est faux : les principaux modèles mondiaux sont européens",
          "elle pèse surtout par la recherche, pas par la réglementation",
        ],
        pourquoi:
          "Un marché de cette taille impose ses conditions d'accès : c'est un levier réel, différent du levier technologique.",
      },
      {
        affirmation: "La concentration ne pose problème que pour les entreprises concurrentes.",
        bonne: "elle pose aussi une question de dépendance : que se passe-t-il si le service ferme ou change ?",
        pieges: [
          "elle pose surtout un problème de prix pour les utilisateurs finaux",
          "c'est exact : pour l'utilisateur, un service en vaut un autre",
          "elle pose surtout un problème de qualité, faute de concurrence",
        ],
        pourquoi:
          "Un établissement qui a bâti ses usages sur un service unique découvre sa dépendance le jour où les conditions changent.",
      },
    ],
  }),

  // ── 3.2.3 Valeurs encodées dans une IA ───────────────────────────────────
  situation({
    id: "g_3_2_3_valeurs",
    microskillId: "3.2.3",
    consigne: "Quel choix humain se cache derrière ce comportement ?",
    pool: [
      {
        cas: "Un modèle refuse de répondre à une question sur la fabrication d'une arme.",
        bonne: "quelqu'un a décidé que ce refus valait mieux que la réponse",
        pieges: [
          "le modèle a compris que la question était dangereuse pour l'utilisateur",
          "la loi impose ce refus à tous les modèles mis en service",
          "le modèle n'a pas trouvé l'information dans ses données d'entraînement",
        ],
        pourquoi:
          "Un refus s'apprend, à partir de jugements humains sur ce qui est acceptable. Ce n'est ni spontané ni juridique.",
      },
      {
        cas: "Un fil d'actualité met en avant les publications qui suscitent le plus de réactions.",
        bonne: "quelqu'un a choisi de mesurer la réaction plutôt que la qualité ou la satisfaction",
        pieges: [
          "l'algorithme a découvert seul que ces publications intéressent les gens",
          "les utilisateurs ont demandé à voir d'abord les contenus populaires",
          "il n'y a pas de choix : c'est la seule mesure techniquement disponible",
        ],
        pourquoi:
          "Choisir ce qu'on optimise est le choix le plus lourd de conséquences, et le moins visible.",
      },
      {
        cas: "Un outil de tri de candidatures écarte les dossiers avec de longues interruptions de carrière.",
        bonne: "quelqu'un a laissé le modèle apprendre ce critère sur des décisions passées",
        pieges: [
          "le modèle a déterminé objectivement que ce critère prédit la réussite",
          "les recruteurs ont explicitement programmé ce critère de sélection",
          "c'est une erreur technique qui sera corrigée à la prochaine version",
        ],
        pourquoi:
          "Ne rien décider est encore une décision : le modèle reprend alors les biais des décisions passées.",
      },
      {
        cas: "Un assistant répond avec prudence sur un sujet médical et renvoie vers un professionnel.",
        bonne: "quelqu'un a fixé cette limite, en jugeant le risque supérieur au service rendu",
        pieges: [
          "le modèle sait qu'il n'a pas les compétences requises en médecine",
          "la réglementation interdit à tout modèle de parler de santé",
          "le modèle manque de données médicales dans son entraînement",
        ],
        pourquoi:
          "La prudence n'est pas une conscience de ses limites : c'est une règle apprise, arbitrée par des personnes.",
      },
      {
        cas: "Un générateur d'images produit surtout des personnes de même apparence pour « un médecin ».",
        bonne: "personne ne l'a voulu, mais personne n'a corrigé le déséquilibre des données",
        pieges: [
          "les concepteurs ont délibérément programmé cette représentation",
          "le modèle reflète fidèlement la réalité de la profession médicale",
          "c'est un hasard de tirage qui varie d'une image à l'autre",
        ],
        pourquoi:
          "Entre l'intention et l'accident, il y a l'omission — et c'est le cas le plus fréquent.",
      },
      {
        cas: "Un modèle répond différemment à la même question posée en français et en anglais.",
        bonne: "les données ne sont pas les mêmes dans les deux langues, et personne n'a égalisé",
        pieges: [
          "le modèle adapte volontairement sa réponse à la culture de l'utilisateur",
          "la traduction interne déforme la question avant qu'il n'y réponde",
          "c'est impossible : un modèle donne la même réponse dans toutes les langues",
        ],
        pourquoi:
          "L'écart de volume entre les langues d'entraînement se retrouve dans les réponses. C'est un choix par défaut, pas une adaptation.",
      },
    ],
  }),

  // ── 3.2.4 Ce que signifie « gouverner » l'IA ─────────────────────────────
  classer({
    id: "g_3_2_4_gouverner",
    microskillId: "3.2.4",
    consigne: "Ce levier relève de quel type d'action sur l'IA ?",
    familles: [
      "une règle contraignante : elle oblige, avec des sanctions",
      "une exigence de transparence : elle oblige à dire",
      "un engagement volontaire : il n'oblige personne",
      "un choix technique : il ne relève pas de la gouvernance",
    ],
    pool: [
      {
        cas: "Interdire la notation sociale généralisée des citoyens.",
        famille: "une règle contraignante : elle oblige, avec des sanctions",
        pourquoi: "L'IA Act classe cet usage comme inacceptable : c'est une interdiction.",
      },
      {
        cas: "Obliger à signaler qu'un contenu a été généré par une IA.",
        famille: "une exigence de transparence : elle oblige à dire",
        pourquoi: "On n'interdit pas le contenu : on impose de dire ce qu'il est.",
      },
      {
        cas: "Une entreprise publie une charte éthique qu'elle s'applique à elle-même.",
        famille: "un engagement volontaire : il n'oblige personne",
        pourquoi: "Un engagement propre peut être sincère, mais il n'est opposable à personne.",
      },
      {
        cas: "Choisir un réseau de neurones plutôt qu'un arbre de décision pour une tâche.",
        famille: "un choix technique : il ne relève pas de la gouvernance",
        pourquoi:
          "Il a des conséquences — un arbre s'explique mieux — mais ce n'est pas une décision de gouvernance.",
      },
      {
        cas: "Imposer un contrôle humain sur les décisions à risque élevé.",
        famille: "une règle contraignante : elle oblige, avec des sanctions",
        pourquoi: "C'est une obligation assortie de contrôle, pas une recommandation.",
      },
      {
        cas: "Exiger la publication de la documentation technique d'un modèle à risque élevé.",
        famille: "une exigence de transparence : elle oblige à dire",
        pourquoi: "On ne dicte pas la conception : on impose de la rendre vérifiable.",
      },
      {
        cas: "Des entreprises signent une déclaration commune sur la sûreté des modèles.",
        famille: "un engagement volontaire : il n'oblige personne",
        pourquoi: "Une déclaration commune n'a pas de force obligatoire.",
      },
      {
        cas: "Décider d'entraîner un modèle plus petit pour qu'il tourne sur un téléphone.",
        famille: "un choix technique : il ne relève pas de la gouvernance",
        pourquoi: "C'est une décision d'ingénierie, aux effets écologiques réels mais hors du champ des règles.",
      },
    ],
  }),

  // ── 3.3.1 Responsabilité juridique en cas d'erreur ───────────────────────
  situation({
    id: "g_3_3_1_responsabilite",
    microskillId: "3.3.1",
    consigne: "Qui peut être tenu pour responsable, et pourquoi ?",
    pool: [
      {
        cas: "Une voiture autonome renverse un cycliste alors que le conducteur regardait son téléphone.",
        bonne: "plusieurs responsabilités se cumulent, et la loi doit les répartir : c'est tout l'enjeu",
        pieges: [
          "le constructeur seul, puisque c'est son système qui conduisait",
          "le conducteur seul, puisqu'il devait rester attentif à la route",
          "personne : aucun humain n'a directement causé l'accident",
        ],
        pourquoi:
          "La difficulté n'est pas de trouver un coupable, c'est que plusieurs acteurs ont une part. « Personne » n'est jamais la réponse.",
      },
      {
        cas: "Un élève rend un devoir écrit par une IA, avec des faits inventés.",
        bonne: "l'élève : il a choisi de rendre ce texte, et il en répond",
        pieges: [
          "l'éditeur du modèle, qui a laissé son outil inventer des faits",
          "personne : l'élève n'a pas écrit lui-même les faits erronés",
          "le professeur, s'il n'a pas interdit l'usage de l'IA explicitement",
        ],
        pourquoi: "La responsabilité suit la décision de rendre le travail, pas la production du texte.",
      },
      {
        cas: "Un outil de tri de candidatures écarte systématiquement un profil, sans qu'on sache pourquoi.",
        bonne: "l'employeur qui l'utilise : il répond de ses décisions de recrutement",
        pieges: [
          "l'éditeur du logiciel, qui a mal entraîné son modèle de tri",
          "personne : le modèle est une boîte noire, l'erreur est inexplicable",
          "le candidat, qui aurait dû adapter son dossier à l'outil employé",
        ],
        pourquoi:
          "Utiliser un outil ne dilue pas la responsabilité. « Le logiciel a décidé » n'est pas une défense.",
      },
      {
        cas: "Un logiciel d'aide au diagnostic signale une anomalie que le médecin ne retient pas.",
        bonne: "le médecin : l'outil signale, la décision médicale lui revient",
        pieges: [
          "l'éditeur, dont le signalement n'a pas été assez clair pour être suivi",
          "personne : le médecin et le logiciel se partagent l'appréciation",
          "l'établissement, qui a fait le choix d'installer ce logiciel",
        ],
        pourquoi:
          "Ces outils sont des aides. Leur statut juridique est précisément d'assister sans décider.",
      },
      {
        cas: "Une entreprise publie un communiqué rédigé par une IA, contenant une erreur grave.",
        bonne: "l'entreprise : publier engage celui qui publie",
        pieges: [
          "le fournisseur du modèle, dont l'outil a produit l'erreur",
          "le salarié qui a formulé la demande à l'outil d'IA",
          "personne : l'erreur est un défaut connu de ces modèles",
        ],
        pourquoi: "La publication est l'acte qui engage. Ce qui s'est passé en amont est une affaire interne.",
      },
      {
        cas: "Un mineur diffuse une image truquée d'un camarade, produite avec une IA.",
        bonne: "celui qui l'a produite et diffusée, et sa responsabilité est aussi pénale",
        pieges: [
          "l'éditeur de l'outil, qui aurait dû empêcher ce type de production",
          "la plateforme, qui a laissé l'image circuler sans la retirer",
          "personne : l'image est fausse, donc elle ne représente personne",
        ],
        pourquoi:
          "Une image truquée d'une personne réelle porte atteinte à cette personne. La facilité de l'outil n'atténue rien.",
      },
    ],
  }),

  // ── 3.3.2 Juger une situation au regard du RGPD / IA Act ─────────────────
  classer({
    id: "g_3_3_2_quel_texte",
    microskillId: "3.3.2",
    consigne: "Quel cadre s'applique en premier à cette situation ?",
    familles: [
      "le RGPD : il s'agit de données personnelles",
      "l'IA Act : il s'agit du niveau de risque d'un système d'IA",
      "les deux à la fois",
      "aucun des deux : c'est une règle interne ou un usage",
    ],
    pool: [
      {
        cas: "Un site conserve l'historique de navigation de ses visiteurs pendant cinq ans.",
        famille: "le RGPD : il s'agit de données personnelles",
        pourquoi: "La durée de conservation des données personnelles relève du RGPD.",
      },
      {
        cas: "Un système d'IA est utilisé pour trier des candidatures à l'embauche.",
        famille: "les deux à la fois",
        pourquoi:
          "C'est un usage classé à risque élevé par l'IA Act, ET il traite des données personnelles de candidats.",
      },
      {
        cas: "Un jeu vidéo utilise une IA pour adapter la difficulté au joueur.",
        famille: "l'IA Act : il s'agit du niveau de risque d'un système d'IA",
        pourquoi: "L'IA Act le rangerait dans les risques minimes : peu d'obligations, mais c'est bien son champ.",
      },
      {
        cas: "Un établissement décide que l'IA est autorisée pour réviser mais pas pour les devoirs notés.",
        famille: "aucun des deux : c'est une règle interne ou un usage",
        pourquoi: "Une charte d'établissement n'est ni un règlement européen ni une loi.",
      },
      {
        cas: "Une personne demande à connaître les données qu'un service détient sur elle.",
        famille: "le RGPD : il s'agit de données personnelles",
        pourquoi: "Le droit d'accès est un droit ouvert par le RGPD.",
      },
      {
        cas: "Un système de reconnaissance faciale est déployé dans un espace public.",
        famille: "les deux à la fois",
        pourquoi: "Usage très encadré par l'IA Act, et traitement de données biométriques au sens du RGPD.",
      },
      {
        cas: "Un fournisseur doit fournir la documentation technique d'un système à risque élevé.",
        famille: "l'IA Act : il s'agit du niveau de risque d'un système d'IA",
        pourquoi: "Cette obligation de documentation vient de la classification par le risque.",
      },
      {
        cas: "Un professeur demande à ses élèves de citer les outils utilisés pour un exposé.",
        famille: "aucun des deux : c'est une règle interne ou un usage",
        pourquoi: "C'est une consigne pédagogique, qui ne relève d'aucun de ces deux textes.",
      },
    ],
  }),

  // ── 3.4.1 Métiers qui disparaissent du fait de l'IA ──────────────────────
  situation({
    id: "g_3_4_1_transformation",
    microskillId: "3.4.1",
    consigne: "Qu'arrive-t-il vraiment à ce métier ?",
    pool: [
      {
        cas: "Un traducteur professionnel voit arriver des outils de traduction automatique performants.",
        bonne: "son métier se déplace vers la relecture, l'adaptation et les textes à enjeu",
        pieges: [
          "son métier disparaît : la machine fait désormais le même travail",
          "son métier ne change pas : ces outils restent trop peu fiables",
          "son métier devient plus rare mais bien mieux rémunéré qu'avant",
        ],
        pourquoi:
          "C'est le cas le plus fréquent : une partie des tâches est automatisée, le métier se recentre sur le reste.",
      },
      {
        cas: "Un standardiste dont l'entreprise installe un serveur vocal automatisé.",
        bonne: "une partie du poste disparaît, et l'autre se reporte sur les cas complexes",
        pieges: [
          "le poste disparaît intégralement dès l'installation du système",
          "le poste est préservé : le serveur ne traite que les appels simples",
          "le poste se transforme en poste de technicien du serveur vocal",
        ],
        pourquoi:
          "L'automatisation prend les cas standards. Ce qui reste est plus difficile, en plus petit volume.",
      },
      {
        cas: "Un radiologue travaille avec un logiciel qui pré-analyse les images.",
        bonne: "son travail change de nature : il vérifie, arbitre, et reste responsable",
        pieges: [
          "son métier disparaît : le logiciel finira par diagnostiquer seul",
          "son métier ne change pas : il fait exactement les mêmes gestes",
          "son métier devient une simple validation des propositions du logiciel",
        ],
        pourquoi:
          "Le glissement vers la vérification est réel — mais vérifier n'est pas valider machinalement : la responsabilité reste entière.",
      },
      {
        cas: "Un développeur utilise un assistant qui écrit une partie de son code.",
        bonne: "il écrit moins, et relit, teste et conçoit davantage",
        pieges: [
          "son métier disparaît, puisque l'outil produit le code à sa place",
          "son métier ne change pas : l'outil ne fait que du code simple",
          "son métier devient celui de rédacteur de consignes pour l'assistant",
        ],
        pourquoi: "Ce qui est automatisé, c'est la frappe, pas le jugement sur ce qu'il faut écrire.",
      },
      {
        cas: "Un métier manuel très varié, exercé dans des lieux différents chaque jour.",
        bonne: "il est peu exposé : la variété et le geste physique résistent à l'automatisation",
        pieges: [
          "il est très exposé : les métiers manuels sont les premiers automatisés",
          "il est exposé autant que les autres : l'IA touche tous les métiers",
          "il disparaîtra dès que la robotique aura suffisamment progressé",
        ],
        pourquoi:
          "L'idée reçue veut que le manuel disparaisse d'abord. C'est la RÉPÉTITIVITÉ qui expose, pas le caractère manuel.",
      },
      {
        cas: "Un métier de bureau consistant à recopier des informations d'un document à un autre.",
        bonne: "il est très exposé : la tâche est répétitive et entièrement décrite",
        pieges: [
          "il est peu exposé : c'est un travail de bureau, donc intellectuel",
          "il est peu exposé : il demande de la rigueur et de la concentration",
          "il est exposé, mais l'automatisation créera autant de postes",
        ],
        pourquoi:
          "Répétitif, bien décrit, sans jugement à porter : c'est le profil le plus automatisable, quel que soit le secteur.",
      },
    ],
  }),

  // ── 3.4.2 Métiers qui apparaissent du fait de l'IA ───────────────────────
  classer({
    id: "g_3_4_2_nouveaux_metiers",
    microskillId: "3.4.2",
    consigne: "Ce métier est-il né du développement de l'IA ?",
    familles: [
      "oui : il n'existait pas avant l'IA",
      "non : il existait déjà, mais l'IA le transforme",
      "non : il n'a pas de rapport avec l'IA",
      "oui, mais c'est un métier invisible et souvent mal payé",
    ],
    pool: [
      {
        cas: "Spécialiste chargé de surveiller et corriger le comportement d'un modèle en service.",
        famille: "oui : il n'existait pas avant l'IA",
        pourquoi: "Ce suivi de modèle est un métier né avec le déploiement de l'IA à grande échelle.",
      },
      {
        cas: "Annotateur de données, qui étiquette des milliers d'images à la chaîne.",
        famille: "oui, mais c'est un métier invisible et souvent mal payé",
        pourquoi: "Sans lui, aucun apprentissage supervisé. Il apparaît rarement dans le récit de l'IA.",
      },
      {
        cas: "Journaliste, qui utilise désormais des outils de transcription et de recherche.",
        famille: "non : il existait déjà, mais l'IA le transforme",
        pourquoi: "Le métier est ancien ; ses outils et une partie de ses gestes changent.",
      },
      {
        cas: "Plombier intervenant chez des particuliers.",
        famille: "non : il n'a pas de rapport avec l'IA",
        pourquoi: "Métier varié, physique, sur site : peu concerné à ce jour.",
      },
      {
        cas: "Modérateur qui visionne des contenus violents signalés sur une plateforme.",
        famille: "oui, mais c'est un métier invisible et souvent mal payé",
        pourquoi:
          "Il a grandi avec les plateformes et sert aussi à entraîner les filtres automatiques. Le coût humain en est lourd.",
      },
      {
        cas: "Juriste spécialisé dans la conformité des systèmes d'IA.",
        famille: "oui : il n'existait pas avant l'IA",
        pourquoi: "La réglementation de l'IA crée un besoin d'expertise juridique nouveau.",
      },
      {
        cas: "Enseignant, qui doit maintenant former ses élèves à l'usage de ces outils.",
        famille: "non : il existait déjà, mais l'IA le transforme",
        pourquoi: "Le métier demeure ; son contenu s'élargit.",
      },
      {
        cas: "Ingénieur chargé de réduire la taille d'un modèle pour qu'il tourne sur un téléphone.",
        famille: "oui : il n'existait pas avant l'IA",
        pourquoi: "L'optimisation de modèles est une spécialité née avec eux.",
      },
    ],
  }),

  // ── 3.4.3 Les « travailleurs du clic » ───────────────────────────────────
  corriger({
    id: "g_3_4_3_travailleurs",
    microskillId: "3.4.3",
    pool: [
      {
        affirmation: "Les IA modernes s'entraînent toutes seules, sans intervention humaine.",
        bonne: "des personnes étiquettent, trient et jugent des données à chaque étape",
        pieges: [
          "des personnes interviennent, mais seulement pour lancer l'entraînement",
          "des personnes interviennent uniquement pour vérifier le résultat final",
          "c'est exact pour les modèles récents, faux pour les plus anciens",
        ],
        pourquoi:
          "L'expression « apprentissage automatique » masque un travail humain massif et continu.",
      },
      {
        affirmation: "Le travail d'annotation est un métier technique bien rémunéré.",
        bonne: "il est souvent morcelé, payé à la tâche, et délocalisé vers des pays à bas salaires",
        pieges: [
          "c'est exact : il demande une formation spécialisée en informatique",
          "c'est faux : ce travail est entièrement bénévole et collaboratif",
          "c'est exact dans les pays où la réglementation du travail est stricte",
        ],
        pourquoi:
          "C'est l'un des angles morts du récit sur l'IA : la valeur produite et la rémunération sont très éloignées.",
      },
      {
        affirmation: "La modération des plateformes est entièrement automatisée aujourd'hui.",
        bonne: "des humains traitent encore les cas que les filtres ne tranchent pas",
        pieges: [
          "c'est exact depuis que les modèles reconnaissent les contenus interdits",
          "c'est faux : aucune modération automatique n'existe sur ces plateformes",
          "c'est exact pour les images, mais faux pour les textes publiés",
        ],
        pourquoi:
          "Les filtres traitent le volume ; les cas ambigus reviennent à des personnes, exposées à ce qu'elles visionnent.",
      },
      {
        affirmation: "Quand j'utilise gratuitement une IA, je ne participe à aucun travail.",
        bonne: "mes usages et mes retours peuvent servir à améliorer le modèle",
        pieges: [
          "c'est exact : mes questions sont supprimées après la réponse",
          "c'est faux : chaque question que je pose entraîne directement le modèle",
          "c'est exact tant que je ne signale pas explicitement une erreur",
        ],
        pourquoi:
          "Les pouces levés et les conversations conservées alimentent les versions suivantes. Ce n'est pas rien, ce n'est pas anodin non plus.",
      },
      {
        affirmation: "Ce travail humain disparaîtra quand les modèles seront meilleurs.",
        bonne: "chaque nouvelle capacité demande de nouvelles annotations : le besoin se déplace",
        pieges: [
          "c'est exact : les modèles finiront par s'annoter eux-mêmes",
          "c'est faux : la quantité de travail humain restera exactement la même",
          "c'est exact dès que les modèles atteindront un niveau suffisant",
        ],
        pourquoi:
          "Les modèles produisent maintenant des données d'entraînement — mais valider ce qu'ils produisent demande encore des humains.",
      },
      {
        affirmation: "Ces travailleurs sont mentionnés dans la communication des entreprises d'IA.",
        bonne: "ils sont très rarement évoqués : le récit met en avant la prouesse technique",
        pieges: [
          "c'est exact : la réglementation impose de mentionner ces sous-traitants",
          "c'est exact : les entreprises les mettent en avant dans leurs rapports",
          "c'est faux : aucune entreprise n'a jamais recours à ce type de travail",
        ],
        pourquoi:
          "Savoir qui rend l'outil possible fait partie de la culture numérique, autant que savoir comment il fonctionne.",
      },
    ],
  }),

  // ── 3.5.1 Cas connus de discriminations par une IA ───────────────────────
  situation({
    id: "g_3_5_1_discrimination",
    microskillId: "3.5.1",
    consigne: "Que s'est-il passé, et d'où vient le problème ?",
    pool: [
      {
        cas: "Un outil de tri de CV entraîné sur dix ans d'embauches écarte davantage un profil de candidats.",
        bonne: "il a appris les décisions passées, biais compris, et les reproduit",
        pieges: [
          "il a été programmé pour privilégier certains profils de candidats",
          "il a identifié objectivement les profils les plus performants",
          "il a manqué de données pour juger correctement ces candidatures",
        ],
        pourquoi:
          "Apprendre sur le passé, c'est apprendre ses inégalités. Sans correction, le modèle les perpétue en les habillant d'objectivité.",
      },
      {
        cas: "Un système de reconnaissance faciale se trompe bien plus souvent sur certains visages.",
        bonne: "les visages sous-représentés dans les données sont moins bien reconnus",
        pieges: [
          "certains visages sont objectivement plus difficiles à distinguer",
          "le système a été délibérément conçu pour ne pas les reconnaître",
          "la qualité des caméras varie selon les lieux où elles sont installées",
        ],
        pourquoi:
          "La composition du jeu de données détermine la performance par groupe. Un déséquilibre s'y transforme en écart de fiabilité.",
      },
      {
        cas: "Un traducteur automatique rend « the nurse » par « l'infirmière » et « the engineer » par « l'ingénieur ».",
        bonne: "il reprend l'association la plus fréquente dans ses textes d'entraînement",
        pieges: [
          "il applique une règle grammaticale du français sur le genre des métiers",
          "il a été programmé ainsi pour produire des phrases plus naturelles",
          "il choisit au hasard entre le masculin et le féminin à chaque phrase",
        ],
        pourquoi:
          "L'anglais ne marque pas le genre : le modèle doit choisir, et il choisit ce qui était le plus fréquent.",
      },
      {
        cas: "Un algorithme d'attribution d'aides défavorise les habitants de certains quartiers.",
        bonne: "un critère corrélé au lieu de vie sert de substitut à un critère interdit",
        pieges: [
          "le modèle a été explicitement paramétré selon le quartier de résidence",
          "les habitants de ces quartiers déposent des dossiers moins complets",
          "c'est un hasard statistique qui se corrigera avec plus de données",
        ],
        pourquoi:
          "Retirer le critère interdit ne suffit pas : d'autres variables le remplacent silencieusement. C'est le piège le plus courant.",
      },
      {
        cas: "Un générateur d'images produit systématiquement le même type de personne pour « un PDG ».",
        bonne: "il restitue la représentation dominante de ses images d'entraînement",
        pieges: [
          "il représente fidèlement la réalité statistique de cette fonction",
          "il a reçu la consigne de produire des images consensuelles",
          "il manque d'images de PDG dans ses données d'entraînement",
        ],
        pourquoi:
          "Refléter une réalité inégale et la renforcer en la diffusant sont deux choses différentes — la seconde est le vrai problème.",
      },
      {
        cas: "Une équipe découvre le biais de son modèle après sa mise en service.",
        bonne: "il aurait fallu tester les résultats par groupe AVANT de le déployer",
        pieges: [
          "le biais était impossible à détecter avant l'usage réel du modèle",
          "il suffit désormais de réentraîner le modèle sur plus de données",
          "il fallait confier le test à une entreprise extérieure spécialisée",
        ],
        pourquoi:
          "Mesurer la performance globale masque les écarts. Il faut la mesurer groupe par groupe, et avant.",
      },
    ],
  }),

  // ── 3.5.2 Reproduction de biais par une IA ───────────────────────────────
  classer({
    id: "g_3_5_2_origine_biais",
    microskillId: "3.5.2",
    consigne: "D'où vient le biais, dans ce cas ?",
    familles: [
      "des données : elles reflètent une réalité inégale",
      "de la collecte : certains groupes y sont sous-représentés",
      "du critère choisi : on mesure autre chose que ce qu'on croit",
      "de l'usage : le modèle est employé hors de ce pour quoi il a été conçu",
    ],
    pool: [
      {
        cas: "Un modèle de reconnaissance vocale comprend mal les accents régionaux.",
        famille: "de la collecte : certains groupes y sont sous-représentés",
        pourquoi: "Les enregistrements d'entraînement couvraient mal ces façons de parler.",
      },
      {
        cas: "Un modèle prédit la réussite scolaire à partir des notes passées, et fige les écarts.",
        famille: "des données : elles reflètent une réalité inégale",
        pourquoi: "Les notes passées portent l'empreinte des inégalités : le modèle les prolonge.",
      },
      {
        cas: "Un algorithme mesure « l'engagement » et met en avant les contenus qui font réagir.",
        famille: "du critère choisi : on mesure autre chose que ce qu'on croit",
        pourquoi: "L'engagement mesure la réaction, pas l'intérêt ni la qualité. Le critère fabrique l'effet.",
      },
      {
        cas: "Un outil de diagnostic entraîné sur des adultes est utilisé sur des enfants.",
        famille: "de l'usage : le modèle est employé hors de ce pour quoi il a été conçu",
        pourquoi: "Un modèle n'est valide que sur une population comparable à celle de son entraînement.",
      },
      {
        cas: "Un modèle de langage entraîné surtout sur des textes anglophones répond moins bien en créole.",
        famille: "de la collecte : certains groupes y sont sous-représentés",
        pourquoi: "Le volume disponible par langue détermine directement la qualité obtenue.",
      },
      {
        cas: "Un système de police prédictive s'entraîne sur les interpellations passées.",
        famille: "des données : elles reflètent une réalité inégale",
        pourquoi:
          "Les interpellations passées mesurent l'activité policière autant que la délinquance : le modèle renforce le cercle.",
      },
      {
        cas: "Un modèle de recrutement optimise « la durée passée dans l'entreprise ».",
        famille: "du critère choisi : on mesure autre chose que ce qu'on croit",
        pourquoi: "La durée mesure la fidélité, ou l'absence d'autre choix — pas la compétence.",
      },
      {
        cas: "Un modèle entraîné sur des radios d'un hôpital est déployé dans un pays au matériel différent.",
        famille: "de l'usage : le modèle est employé hors de ce pour quoi il a été conçu",
        pourquoi: "Changer d'appareil change les images : la performance mesurée ne se transporte pas.",
      },
    ],
  }),

  // ── 3.5.3 La reco peut propulser de fausses infos ────────────────────────
  corriger({
    id: "g_3_5_3_fausses_infos",
    microskillId: "3.5.3",
    pool: [
      {
        affirmation: "Si une information est très partagée, c'est qu'elle a été vérifiée par beaucoup de gens.",
        bonne: "le partage mesure la réaction qu'elle provoque, pas sa vérification",
        pieges: [
          "c'est exact, à condition qu'elle vienne d'un compte identifiable",
          "c'est exact : une information fausse serait vite signalée et retirée",
          "c'est faux : les informations très partagées sont presque toujours fausses",
        ],
        pourquoi:
          "Les contenus qui font réagir circulent le mieux, vrais ou faux. La popularité n'est pas une vérification.",
      },
      {
        affirmation: "Les algorithmes de recommandation favorisent volontairement les fausses informations.",
        bonne: "ils favorisent ce qui fait réagir, et le faux fait souvent réagir davantage",
        pieges: [
          "c'est exact : les fausses informations rapportent plus de publicité",
          "c'est faux : ils sont conçus pour repérer et écarter le faux",
          "c'est exact : ils sont réglés pour créer de la polémique",
        ],
        pourquoi:
          "L'intention n'est pas là, l'effet si. C'est ce qui rend le problème difficile : personne ne l'a voulu ainsi.",
      },
      {
        affirmation: "Une fausse information se reconnaît à ses fautes d'orthographe.",
        bonne: "les outils actuels produisent des textes impeccables : la forme ne dit plus rien",
        pieges: [
          "c'est exact : les faux messages sont souvent traduits automatiquement",
          "c'est exact pour les messages d'arnaque, faux pour les fausses nouvelles",
          "c'est faux : les fausses informations sont mieux écrites que les vraies",
        ],
        pourquoi:
          "Le repère de la faute d'orthographe est périmé. Il ne reste que la source et le recoupement.",
      },
      {
        affirmation: "Les plateformes peuvent supprimer toutes les fausses informations si elles le veulent.",
        bonne: "le volume et le caractère ambigu de beaucoup de contenus rendent cela irréaliste",
        pieges: [
          "c'est exact : leurs modèles détectent le faux avec une grande fiabilité",
          "c'est exact, mais elles préfèrent ne pas le faire pour l'audience",
          "c'est faux : la loi leur interdit de supprimer des contenus",
        ],
        pourquoi:
          "Entre le vrai, le faux et le douteux, la frontière n'est pas toujours nette — et le volume est immense.",
      },
      {
        affirmation: "Signaler une fausse information est le meilleur moyen de la freiner.",
        bonne: "ne pas la relayer freine davantage : chaque partage l'amplifie, même pour la critiquer",
        pieges: [
          "c'est exact : le signalement entraîne une suppression rapide",
          "c'est exact : plus il y a de signalements, plus la portée baisse",
          "c'est faux : signaler n'a strictement aucun effet sur la diffusion",
        ],
        pourquoi:
          "Partager pour dénoncer reste un partage. Le signalement est utile, mais l'abstention pèse plus vite.",
      },
      {
        affirmation: "Ce problème vient des réseaux sociaux : sans eux, il n'existerait pas.",
        bonne: "la rumeur est ancienne : ce qui change, c'est la vitesse et l'échelle de la diffusion",
        pieges: [
          "c'est exact : avant les réseaux, l'information était vérifiée avant diffusion",
          "c'est faux : les réseaux sociaux n'ont aucun effet sur la circulation",
          "c'est exact : le problème disparaîtrait en quittant ces plateformes",
        ],
        pourquoi:
          "Comprendre ce qui est nouveau — la vitesse, l'échelle, la personnalisation — évite de croire qu'il suffirait de revenir en arrière.",
      },
    ],
  }),
];
