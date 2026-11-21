// ─── LES SÉANCES DU HUB « En classe avec EleveAI » (/seances) ──────────────────
// ⭐ 17/11/2026, Frédéric : « donner des exemples de séances qui fonctionnent »,
// « comment ils font concrètement », puis « titre plan descrit audio » et
// « avec des compétences cochées : autonomie a fonctionné etc, à réfléchir ».
// → UNE SÉANCE = TITRE · PLAN (frise minutée) · DESCRIPTIF (prof, élèves, clic par
// clic, dessert, ce que voit le prof) · AUDIO (sa voix, note vocale WhatsApp) ·
// COMPÉTENCES COCHÉES.
// Ajouter une séance = ajouter un objet à SEANCES ; la page ne bouge pas.
//
// ⛔ Chaque lien pointe une VRAIE page (vérifiées le 17/11 : /prof/classes,
// /prof/classes/direct|bilan|podium|bulletin, /prof/cartes (cartes de CONNEXION, pas les cartes mentales), /cartes-mentales/maths/
// <classe>/<notion>, /fiches-exercices/maths/<classe>/<notion>, /coach/serie, /video/<id>).
// ⛔ AUDIO : le fichier brut (WhatsApp .opus/.ogg/.m4a) est déposé dans
// temoignages-audio/ (JAMAIS commité), nettoyé par ffmpeg (blancs, loudnorm, mp3),
// envoyé sur R2 sous temoignages/… ; on renseigne alors `audio` ici. Sans audio,
// la page affiche « bientôt en audio ».

/** Les trois blocs de la séance type 20 / 25 / 10. */
export type Bloc = "cours" | "entrainement" | "synthese";

export type EtapePlan = {
  minutes: number;
  titre: string;
  detail: string;
  bloc: Bloc;
};

export type Lien = { label: string; href: string };

export type EtapeClic = {
  moment: string;
  texte: string;
  liens?: Lien[];
};

/** Les 8 compétences de la grille (⏳ à faire valider par Frédéric). */
export type CompetenceId =
  | "autonomie"
  | "choix"
  | "ecoute"
  | "parole"
  | "memoire"
  | "entraide"
  | "passions"
  | "inclusion"
  | "cadre";

/** ✅ a fonctionné · ➖ en partie · ⬜ pas visé. */
export type EtatCompetence = "oui" | "partiel" | "non";

export const COMPETENCES: { id: CompetenceId; nom: string; aide: string }[] = [
  { id: "autonomie", nom: "Autonomie", aide: "L'élève travaille en autonomie assistée, sur le coach ou les exercices." },
  { id: "choix", nom: "Choisir sa façon d'apprendre", aide: "Chacun prend son « plat » à la carte." },
  // 17/11 : « des plats imposés et d'autres à la carte » → le cadre a sa case.
  { id: "cadre", nom: "Respecter un cadre", aide: "Le plat imposé est fait par tous." },
  { id: "ecoute", nom: "Écoute et attention", aide: "La vidéo coupée, les questions-pauses." },
  { id: "parole", nom: "Prise de parole et reformulation", aide: "Ce sont les élèves qui font le résumé." },
  { id: "memoire", nom: "Mémorisation et trace écrite", aide: "Carte mentale, cours au cahier." },
  { id: "entraide", nom: "Entraide et coopération", aide: "On s'explique entre voisins." },
  { id: "passions", nom: "Lien avec la vie et les passions", aide: "Le dessert : « va trouver… dans ce que tu aimes »." },
  { id: "inclusion", nom: "Inclusion", aide: "ULIS, AESH : chacun a sa place." },
];

export type Seance = {
  id: string;
  /** Court et parlant. */
  titre: string;
  /** « Classe entière, rythme commun » ou « Chacun sa façon ». */
  type: string;
  niveau: string;
  notion: string;
  objectif: string;
  /** Témoignage réel : qui, quand. */
  temoin?: { nom: string; role: string; date: string };
  plan: EtapePlan[];
  descriptif: {
    prof: string[];
    eleves: string[];
    /** Une phrase de Frédéric, mot pour mot (orthographe rétablie). */
    citation?: string;
  };
  /** Le « restaurant » : un menu IMPOSÉ et une CARTE libre (17/11, Frédéric :
   *  « parfois dans un restaurant il y a des plats imposés et d'autres à la carte »). */
  menu?: {
    /** L'ENTRÉE, au choix, 5 min, projetée à toute la classe (21/11, Frédéric). */
    entree?: { texte: string; href?: string }[];
    impose: string[];
    carte: string[];
    dessert: string;
    conseil: string;
  };
  /** « Concrètement, clic par clic ». */
  clicParClic: EtapeClic[];
  /** La mission « va trouver… dans ce que tu aimes ». */
  dessert: string;
  sansSalleInfo: string;
  /** Le devoir maison (le rappel des points est ajouté par la page). */
  aLaMaison: string;
  /** Chemin R2 du mp3 nettoyé (ex. « temoignages/4e-video-coupee.mp3 »). */
  audio?: { fichier: string; duree: string };
  /** Le récit, à lire (ou à lire en écoutant). */
  transcription: string[];
  /** Vrai quand la transcription est celle de l'enregistrement (sinon : résumé de sa dictée). */
  transcriptionExacte?: boolean;
  competences: Partial<Record<CompetenceId, EtatCompetence>>;
};

/** Ce qui se fait UNE SEULE FOIS, avant la première séance (commun à toutes). */
export const AVANT_UNE_FOIS: EtapeClic[] = [
  {
    moment: "Une seule fois",
    texte: "Créez votre classe, puis imprimez pour chaque élève sa carte de connexion : son code et un mot de passe simple. Pas d'adresse mail.",
    liens: [
      { label: "Mes classes", href: "/prof/classes" },
      { label: "Les cartes de connexion", href: "/prof/cartes" },
    ],
  },
  {
    moment: "La veille, 5 min",
    texte: "Cochez les micro-compétences du jour dans le coach, ouvrez la vidéo pour voir où tombent les questions-pauses, imprimez la carte mentale si besoin.",
    liens: [{ label: "Les cartes mentales", href: "/cartes-mentales" }],
  },
];

export const SEANCES: Seance[] = [
  // ── 1. LA VIDÉO COUPÉE — 4e, puissances (17/11, sa classe) ─────────────────
  {
    id: "video-coupee-4e-puissances",
    titre: "La vidéo coupée",
    type: "Classe entière, rythme commun",
    niveau: "4e",
    notion: "Les puissances",
    objectif: "Comprendre ce que veut dire 3⁴, puis s'entraîner chacun à son rythme.",
    temoin: { nom: "Frédéric", role: "prof de maths", date: "novembre 2026" },
    // ⏳ Les minutes des deux dernières étapes sont estimées (récit : « vidéo 5 min »,
    // « coach environ 20 min ») : à confirmer par Frédéric.
    plan: [
      { minutes: 10, bloc: "cours", titre: "La vidéo coupée", detail: "5 min de vidéo, arrêtée à chaque question-pause, puis un petit résumé." },
      { minutes: 20, bloc: "entrainement", titre: "Le coach", detail: "Chaque élève s'entraîne sur les puissances, à son niveau." },
      { minutes: 15, bloc: "synthese", titre: "Retour sur la vidéo", detail: "Ce sont les élèves qui font le résumé." },
      { minutes: 10, bloc: "synthese", titre: "Discussion", detail: "Ce qui était facile, ce qui coince, ce qu'on retient." },
    ],
    descriptif: {
      prof: [
        "Projette la vidéo paysage sur les puissances.",
        "La coupe à chaque question-pause : il pose la question, la classe répond, puis il relance.",
        "Fait un petit résumé, puis envoie tout le monde sur le coach.",
        "Circule pendant le coach et suit chaque élève en direct.",
        "Revient à la vidéo : cette fois, il laisse les élèves résumer.",
      ],
      eleves: [
        "Répondent aux questions-pauses à voix haute.",
        "S'entraînent en autonomie assistée sur le coach, environ 20 minutes.",
        "Font eux-mêmes le résumé de la vidéo.",
        "Discutent de ce qu'ils ont compris.",
      ],
      citation: "On pose les questions, ça marche bien.",
    },
    clicParClic: [
      {
        moment: "20 min de cours",
        texte: "Ouvrez la vidéo au vidéoprojecteur. À chaque question-pause, mettez sur pause : la classe répond, puis vous relancez.",
        liens: [{ label: "La vidéo « 3⁴ : 12 ou 81 ? »", href: "/video/4e-puissance-comprendre" }],
      },
      {
        moment: "25 min d'entraînement",
        texte: "Les élèves se connectent avec leur code et ouvrent le coach sur les puissances. Vous voyez chacun en direct : sur quelle question il est, s'il réussit.",
        liens: [
          { label: "Le coach : puissances 4e", href: "/coach/serie?classe=4e&matiere=maths&notion=puissance_ecriture&display=simple" },
          { label: "Suivre en direct", href: "/prof/classes/direct" },
        ],
      },
      {
        moment: "10 min de synthèse",
        texte: "Revenez sur la vidéo : à chaque partie, un élève résume. Le bilan de la classe vous dit qui revoir la prochaine fois.",
        liens: [
          { label: "Le bilan de la classe", href: "/prof/classes/bilan" },
          { label: "La carte mentale des puissances", href: "/cartes-mentales/maths/4e/puissance_ecriture" },
        ],
      },
    ],
    dessert: "Va trouver une puissance dans ce que tu aimes : les octets de ta console, les followers qui doublent, une feuille pliée en deux, puis encore en deux…",
    sansSalleInfo: "Vidéoprojecteur seul : la vidéo coupée, puis la feuille d'exercices A4 à la place du coach. Avec des téléphones ou des tablettes, le coach marche aussi.",
    aLaMaison: "Revoir la vidéo et refaire le coach sur les puissances, 10 minutes. Vous retrouvez son travail dans le bilan.",
    transcription: [
      "Avec mes 4e, j'ai projeté une vidéo sur les puissances, cinq minutes.",
      "Je l'ai coupée aux questions-pauses. On pose les questions, ça marche bien. Puis on fait un petit résumé.",
      "Ensuite, les élèves vont sur le coach, une vingtaine de minutes. Moi, je vois en direct ce que fait chacun, et sur quelle question il est.",
      "Vingt minutes plus tard, on revient sur la vidéo. Et là, ce sont les élèves qui font le résumé.",
      "On finit par une discussion, tous ensemble.",
    ],
    competences: { ecoute: "oui", parole: "oui", autonomie: "oui" },
  },

  // ── 2. LE RESTAURANT — 6e, longueurs (17/11, sa classe) ────────────────────
  {
    id: "restaurant-6e-longueurs",
    titre: "Le restaurant",
    type: "Chacun sa façon",
    niveau: "6e",
    notion: "Les longueurs",
    objectif: "Retenir les unités de longueur, puis s'entraîner chacun avec le « plat » qui lui va.",
    temoin: { nom: "Frédéric", role: "prof de maths", date: "novembre 2026" },
    plan: [
      { minutes: 20, bloc: "cours", titre: "Le plat imposé", detail: "Tout le monde colorie la carte mentale, puis on l'explique ensemble." },
      { minutes: 25, bloc: "entrainement", titre: "À la carte", detail: "Chacun choisit : le coach, les exercices interactifs, le découpage (ULIS) ou le cours au cahier." },
      { minutes: 10, bloc: "synthese", titre: "Le dessert", detail: "On se retrouve, et chacun part avec sa mission « longueurs »." },
    ],
    descriptif: {
      prof: [
        "Imprime la carte mentale des longueurs, une par élève.",
        "Fait colorier, puis explique la carte avec la classe.",
        "Présente le menu : le plat imposé pour tous, puis chacun choisit à la carte.",
        "Circule d'une table à l'autre, l'AESH accompagne le découpage.",
        "Donne le dessert : une mission pour la maison.",
      ],
      eleves: [
        "Colorient la carte mentale et posent leurs questions.",
        "Choisissent : le coach, les exercices interactifs, le découpage, ou le cours au cahier.",
        "Une élève a demandé « un cours » : elle était contente d'écrire la leçon dans son cahier.",
        "Partent chercher des longueurs dans ce qu'ils aiment.",
      ],
      citation: "Chacun a appris à sa façon.",
    },
    menu: {
      entree: [
        { texte: "Projeter une énigme sur les longueurs", href: "/enigmes-maths/6e/aire_longueur" },
        { texte: "Projeter la vidéo, puis en discuter" },
        { texte: "Projeter les exercices interactifs, avec correction active" },
      ],
      impose: ["Colorier la carte mentale des longueurs et l'expliquer ensemble."],
      carte: [
        "Le coach, sur les longueurs",
        "Les exercices interactifs",
        "Le cours écrit dans le cahier",
        "Le découpage (ULIS, avec l'AESH)",
        "La vidéo, à revoir",
      ],
      dessert: "Va trouver des longueurs dans ce que tu aimes.",
      conseil:
        "C'est vous qui réglez la part d'imposé. Une classe qui a besoin de cadre : ajoutez un plat pour tous, par exemple « 5 questions du coach ». Une classe autonome : la carte mentale suffit.",
    },
    clicParClic: [
      {
        moment: "20 min de cours",
        texte: "Imprimez la carte mentale, une par élève. Pendant le coloriage, vous pouvez la projeter au tableau.",
        liens: [
          { label: "La carte mentale des longueurs", href: "/cartes-mentales/maths/6e/aire_longueur" },
          { label: "Toutes les cartes mentales", href: "/cartes-mentales" },
        ],
      },
      {
        moment: "25 min, le menu",
        texte: "Écrivez le menu au tableau. Le coach et les exercices interactifs s'ouvrent sur les postes ; le découpage et le cahier restent sur papier.",
        liens: [
          { label: "Le coach : longueurs 6e", href: "/coach/serie?classe=6e&matiere=maths&notion=aire_longueur&display=simple" },
          { label: "Les exercices interactifs", href: "/fiches-exercices/maths/6e/aire-longueur" },
          { label: "Suivre en direct", href: "/prof/classes/direct" },
        ],
      },
      {
        moment: "10 min, le dessert",
        texte: "On se retrouve. Projetez le podium pour féliciter, puis donnez la mission « longueurs ».",
        liens: [
          { label: "Le podium à projeter", href: "/prof/classes/podium" },
          { label: "Les passions des élèves", href: "/passions" },
        ],
      },
    ],
    dessert: "Va trouver des longueurs dans ce que tu aimes : la longueur d'un terrain de foot, d'un écran, d'une piste de skate, d'une baguette de pain…",
    sansSalleInfo: "Sans postes, le menu reste un menu : la feuille d'exercices A4, le découpage et le cours au cahier. Quelques tablettes suffisent pour le coach.",
    aLaMaison: "10 minutes de coach ou d'exercices sur les longueurs, et rapporter en classe la longueur trouvée pour le dessert.",
    transcription: [
      "Avec mes 6e, j'ai mis le restaurant en place.",
      "J'ai imprimé les cartes mentales. Les élèves les ont coloriées, puis on a expliqué la carte mentale ensemble.",
      "Ensuite, chacun choisit : le coach pour certains, les exercices interactifs pour d'autres, le découpage pour les ULIS.",
      "Une élève m'a dit : « moi, j'aimerais bien avoir un cours ». Elle était contente d'écrire le cours dans son cahier. Le cours, c'est aussi un plat du menu.",
      "À la fin, je leur ai dit d'aller trouver des longueurs dans ce qu'ils aiment : les terrains de foot, etc.",
      "Chacun a appris à sa façon. Ça fait plusieurs façons d'aborder EleveAI.",
    ],
    competences: { choix: "oui", cadre: "oui", autonomie: "oui", memoire: "oui", inclusion: "oui", passions: "oui" },
  },
];

/** Les types de séances du hub (les 2 premiers sont validés et vécus). */
export const TYPES_SEANCES: { titre: string; resume: string; emoji: string; seanceId?: string }[] = [
  { emoji: "🎬", titre: "La vidéo coupée", resume: "Classe entière : la vidéo s'arrête aux questions-pauses, puis le coach, puis les élèves résument.", seanceId: "video-coupee-4e-puissances" },
  { emoji: "🍽️", titre: "Le restaurant", resume: "Chacun sa façon : un plat imposé pour tous (la carte mentale), puis à la carte (coach, exercices, découpage, cahier).", seanceId: "restaurant-6e-longueurs" },
  { emoji: "💻", titre: "Le coach en salle info", resume: "Une séance d'entraînement : micros cochées par le prof, suivi en direct, bilan le soir." },
  { emoji: "⚡", titre: "Le rituel de calcul mental", resume: "10 minutes en début d'heure, au vidéoprojecteur ou sur les postes, tous les jours." },
  { emoji: "🤝", titre: "La remédiation AESH / ULIS", resume: "Le mode classe de Ti Margo, le coach qui se lit à voix haute, le découpage." },
  { emoji: "🏆", titre: "Le bilan et le podium", resume: "Fin de chapitre : la carte mentale remplie ensemble, puis le podium projeté." },
];
