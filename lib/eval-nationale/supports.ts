// LES TEXTES SUPPORTS DES ÉPREUVES DE FRANÇAIS.
//
// POURQUOI (constat du 01/08, en relisant ce que produit le builder cycle 4) :
// nos questions de compréhension portaient chacune leur micro-citation d'une
// ligne. On ne testait donc pas la compréhension d'un TEXTE, mais celle d'une
// phrase — et ce n'est pas la même chose. L'évaluation officielle donne un
// texte littéraire entier et pose DIX questions dessus, puis un groupement
// documentaire et neuf autres. C'est ce qu'elle cherche à mesurer : « contrôler
// sa compréhension, devenir un lecteur autonome ». Enrichir les pools n'y
// changeait rien : ça aurait fait vingt questions d'une ligne au lieu de sept.
//
// TEXTES ORIGINAUX, ÉCRITS POUR EleveAI. Deux raisons : aucun ayant droit à
// gérer, et l'île est dans l'histoire. « Né dans une classe, à La Réunion » —
// un élève de Saint-Pierre reconnaît la cour, la case, l'avis de cyclone.
//
// CE QUE LES QUESTIONS TESTENT. Jamais une définition de cours : uniquement ce
// que le texte dit, ce qu'il laisse entendre, et ce qu'on en juge. Les
// micro-compétences sont celles du knowledge — le bilan les nomme comme les
// autres.

export type QuestionSupport = {
  notionId: string;
  microId: string;
  text: string;
  choices: string[];
  expected: string;
  explanation: string;
};

export type SupportTexte = {
  id: string;
  /** Surtitre, façon épreuve officielle : « Texte littéraire ». */
  kicker: string;
  titre: string;
  source: string;
  texte: string;
  questions: QuestionSupport[];
};

// ══════════════════════════════════════════════════════════════════════════
// CM2 — pour l'épreuve de 6ᵉ
// ══════════════════════════════════════════════════════════════════════════

const POISSON_DE_LUDOVIC: SupportTexte = {
  id: "cm2_poisson_ludovic",
  kicker: "Texte littéraire",
  titre: "Le poisson de Ludovic",
  source: "Texte original — EleveAI",
  texte: `Ce matin-là, Ludovic s'est levé avant le jour. Sa grand-mère l'attendait déjà dans la cour, la canne à pêche posée contre le mur.

« Tu as mangé ? » demanda-t-elle.
« Oui », mentit-il.

Ils ont descendu le sentier jusqu'au lagon. La mer était plate, à peine ridée. Ludovic connaissait l'endroit par cœur : c'est là que son grand-père venait, avant.

Pendant deux heures, rien. Puis le fil s'est tendu d'un coup. Ludovic a serré les dents. Ses bras tremblaient, mais il n'a pas lâché.

Quand le poisson est enfin sorti de l'eau, il était plus petit qu'il ne l'avait cru. Sa grand-mère n'a rien dit. Elle a seulement posé sa main sur son épaule, et ils sont remontés ensemble.

Le soir, il y avait du poisson dans les assiettes. Ludovic a mangé lentement, sans rien raconter. Mais il a regardé plusieurs fois la canne, appuyée contre le mur de la cour.`,
  questions: [
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Si tu devais raconter ce texte en une phrase, laquelle choisirais-tu ?",
      choices: [
        "Un garçon va pêcher avec sa grand-mère et rapporte un poisson.",
        "Une grand-mère apprend à son petit-fils à faire la cuisine.",
        "Un garçon se perd sur un sentier au bord du lagon.",
        "Un grand-père raconte ses souvenirs de pêche à sa famille.",
      ],
      expected:
        "Un garçon va pêcher avec sa grand-mère et rapporte un poisson.",
      explanation:
        "Résumer, c'est garder ce qui porte toute l'histoire et laisser les détails. Le grand-père est mentionné, mais il n'est pas là ; la cuisine n'occupe qu'une phrase. Ce qui tient le texte du début à la fin, c'est la pêche de Ludovic avec sa grand-mère.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "« Tu as mangé ? » demanda-t-elle. « Oui », mentit-il. Qu'apprend-on sur Ludovic ?",
      choices: [
        "Il est parti sans rien manger.",
        "Il a mangé deux fois ce matin-là.",
        "Il n'aime pas le petit-déjeuner de sa grand-mère.",
        "Il n'a pas entendu la question.",
      ],
      expected: "Il est parti sans rien manger.",
      explanation:
        "Le texte ne dit pas « il n'avait pas mangé » : il dit « mentit-il ». C'est au lecteur de faire le reste du chemin. Un seul mot suffit à retourner la réponse « oui » — c'est ça, une information implicite.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Pourquoi ce coin du lagon compte-t-il particulièrement pour Ludovic ?",
      choices: [
        "Parce que son grand-père y venait pêcher.",
        "Parce que c'est le seul endroit où il y a des poissons.",
        "Parce que c'est le plus près de sa maison.",
        "Parce que sa grand-mère lui a interdit d'y aller seul.",
      ],
      expected: "Parce que son grand-père y venait pêcher.",
      explanation:
        "La réponse tient dans une incise : « c'est là que son grand-père venait, avant ». Lire un texte long, c'est aussi retenir une information glissée en passant, parce qu'on sent qu'elle comptera.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_genres",
      text: "Quel est le genre de ce texte ?",
      choices: [
        "un récit",
        "un poème",
        "un article de journal",
        "une notice de montage",
      ],
      expected: "un récit",
      explanation:
        "On y raconte une histoire qui se déroule dans le temps, avec des personnages et des actions qui s'enchaînent : c'est un récit. Un poème jouerait sur les vers et les sonorités ; un article rapporterait des faits réels datés.",
    },
    {
      notionId: "lecture_oeuvres",
      microId: "cm2_oeuvre_theme",
      text: "Le poisson était plus petit que prévu, et pourtant Ludovic regarde encore la canne le soir. Qu'est-ce que le texte veut nous faire sentir ?",
      choices: [
        "Ce qui compte n'est pas la taille du poisson, mais ce qu'il a tenu jusqu'au bout.",
        "Ludovic est déçu et ne veut plus jamais pêcher.",
        "La grand-mère est fâchée qu'il ait ramené si peu.",
        "La pêche au lagon est un métier difficile.",
      ],
      expected:
        "Ce qui compte n'est pas la taille du poisson, mais ce qu'il a tenu jusqu'au bout.",
      explanation:
        "Personne ne le dit dans le texte — c'est la main sur l'épaule, le silence de la grand-mère et le regard vers la canne qui le disent. Le thème d'un récit se lit souvent dans ce que les personnages font, pas dans ce qu'ils déclarent.",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════
// 5ᵉ — pour l'épreuve de 4ᵉ
// ══════════════════════════════════════════════════════════════════════════

const AVIS_DE_CYCLONE: SupportTexte = {
  id: "5e_avis_de_cyclone",
  kicker: "Texte littéraire",
  titre: "L'avis de cyclone",
  source: "Texte original — EleveAI",
  texte: `À la radio, la voix a répété trois fois le même mot : alerte orange. Mon père a éteint le poste et s'est levé sans rien dire.

Toute la journée, il a monté et descendu l'échelle. Il a cloué des planches sur les fenêtres, rentré les tôles qui traînaient derrière la case, attaché le portail avec une corde neuve. Je lui passais les clous. Il ne m'a pas dit merci, mais il ne m'a pas dit non plus d'aller jouer.

Vers cinq heures, le vent a tourné. L'air est devenu tiède, immobile, et les oiseaux se sont tus d'un coup.

Ma mère a rempli les bidons d'eau en chantonnant, ce qu'elle ne fait jamais.

Le soir, nous avons dîné à la bougie, tous les trois, très tôt. Mon père a dit : « Demain, on verra. » Il a dit ça calmement, comme on annonce la pluie.

Je n'ai pas dormi. Pas à cause du bruit — le bruit n'était pas encore venu.`,
  questions: [
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "Quel détail du texte montre le mieux que le cyclone approche vraiment ?",
      choices: [
        "Les oiseaux se taisent d'un coup et l'air devient immobile.",
        "Le père monte et descend l'échelle toute la journée.",
        "La famille dîne à la bougie.",
        "La radio est éteinte.",
      ],
      expected: "Les oiseaux se taisent d'un coup et l'air devient immobile.",
      explanation:
        "Les autres détails montrent qu'on se PRÉPARE — on peut se préparer pour rien. Le silence des oiseaux et l'air qui s'immobilise ne dépendent de personne : c'est la nature elle-même qui annonce. Un indice, c'est ce qui trahit sans vouloir le dire.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "« Ma mère a rempli les bidons d'eau en chantonnant, ce qu'elle ne fait jamais. » Que comprend-on ?",
      choices: [
        "Elle est inquiète et cherche à ne pas le montrer.",
        "Elle est joyeuse à l'idée du cyclone.",
        "Elle a appris une nouvelle chanson ce jour-là.",
        "Elle veut couvrir le bruit du vent.",
      ],
      expected: "Elle est inquiète et cherche à ne pas le montrer.",
      explanation:
        "Tout tient dans la fin de la phrase : « ce qu'elle ne fait jamais ». Le narrateur signale un écart. Chantonner n'a rien de rassurant ici — c'est justement parce que ce n'est pas son habitude qu'on comprend l'effort qu'elle fait.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_sens_global",
      text: "« Il ne m'a pas dit merci, mais il ne m'a pas dit non plus d'aller jouer. » Que révèle cette phrase sur la relation entre le narrateur et son père ?",
      choices: [
        "Le père accepte son aide sans le dire : il le traite comme quelqu'un d'utile.",
        "Le père est en colère contre lui depuis le matin.",
        "Le père ne s'est pas aperçu de sa présence.",
        "Le père préférerait qu'il aille jouer dehors.",
      ],
      expected:
        "Le père accepte son aide sans le dire : il le traite comme quelqu'un d'utile.",
      explanation:
        "La phrase est bâtie sur deux négations. La première pourrait blesser, la seconde la retourne : ne pas être renvoyé, ici, vaut reconnaissance. C'est un père qui parle peu, et le narrateur a appris à lire ses silences.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_apprecier",
      text: "Le texte se termine par : « Je n'ai pas dormi. Pas à cause du bruit — le bruit n'était pas encore venu. » Pourquoi cette fin est-elle efficace ?",
      choices: [
        "Elle laisse le pire à venir, hors du texte, et l'attente devient plus lourde que le cyclone.",
        "Elle explique enfin ce qui s'est passé pendant la nuit.",
        "Elle prouve que le cyclone n'a finalement pas eu lieu.",
        "Elle montre que le narrateur avait peur du noir.",
      ],
      expected:
        "Elle laisse le pire à venir, hors du texte, et l'attente devient plus lourde que le cyclone.",
      explanation:
        "Le texte s'arrête juste avant. Rien n'est raconté du cyclone lui-même, et c'est ce manque qui travaille : le lecteur reste, comme le narrateur, les yeux ouverts dans le noir. Juger un texte, c'est pouvoir dire ce qu'un choix d'écriture produit sur soi.",
    },
    {
      notionId: "culture_litteraire",
      microId: "5e_culture_genres",
      text: "Comment ce texte est-il écrit ?",
      choices: [
        "C'est un récit à la première personne : un narrateur raconte ce qu'il a vécu.",
        "C'est un dialogue de théâtre entre trois personnages.",
        "C'est un article de presse qui informe sur un cyclone.",
        "C'est un poème en vers libres.",
      ],
      expected:
        "C'est un récit à la première personne : un narrateur raconte ce qu'il a vécu.",
      explanation:
        "Les « je » et les « mon père » situent le narrateur à l'intérieur de l'histoire. Un article prendrait de la distance et donnerait des faits vérifiables ; une pièce n'aurait que des répliques et des didascalies.",
    },
  ],
};

// ══════════════════════════════════════════════════════════════════════════
// LES DOCUMENTS COMPOSITES
//
// L'ÉPREUVE OFFICIELLE A DEUX SUPPORTS, PAS UN (rappel de Frédéric, 01/08 :
// « c'est une évaluation NATIONALE »). En 6ᵉ : un texte littéraire — 10 items
// — PUIS un document composite — 9 items, « Le Sommeil ». En 4ᵉ : un texte de
// Daudet, puis un groupement thématique sur le gaspillage. Un récit seul ne
// reproduit que la moitié de l'épreuve.
//
// Et un document composite ne se lit pas comme un récit : il faut nommer ses
// parties et CROISER deux sources pour répondre. Ce sont deux
// micro-compétences que le knowledge déclare — `cm2_doc_composite` et
// `cm2_doc_croiser_infos` — et qu'aucun texte littéraire ne peut tester.
//
// Le sujet est national, voire universel : un élève de Lille passe la même
// épreuve qu'un élève de Saint-Pierre. Les récits ci-dessus gardent l'île,
// parce qu'ils s'adressent d'abord à nos élèves et qu'un décor familier n'a
// jamais empêché personne de comprendre un texte ; les documents, eux, ne la
// mentionnent pas.

const DOCUMENT_SOMMEIL_CM2: SupportTexte = {
  id: "cm2_doc_sommeil",
  kicker: "Document composite",
  titre: "Combien d'heures faut-il dormir ?",
  source: "Document original — EleveAI",
  texte: `DOCUMENT 1 — Article

Le sommeil ne sert pas seulement à se reposer. C'est pendant la nuit que le cerveau range ce qu'il a appris dans la journée : une leçon révisée le soir est mieux retenue après une bonne nuit qu'après une nuit courte.

Les besoins changent avec l'âge. Un bébé dort presque toute la journée ; un adulte se contente de sept à huit heures. Entre les deux, l'enfant qui grandit a besoin de beaucoup plus de sommeil qu'on ne le croit.

Un enfant qui manque de sommeil ne s'endort pas forcément en classe. Il devient souvent agité, il se dispute plus facilement, et il a du mal à rester attentif jusqu'au bout d'un exercice.


DOCUMENT 2 — Tableau : heures de sommeil conseillées

• 3 à 5 ans — 10 à 13 heures
• 6 à 12 ans — 9 à 12 heures
• 13 à 18 ans — 8 à 10 heures
• Adulte — 7 à 9 heures`,
  questions: [
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_composite",
      text: "De quoi ce support est-il composé ?",
      choices: [
        "d'un article et d'un tableau",
        "de deux articles de journal",
        "d'un poème et d'une photographie",
        "d'une bande dessinée et d'une légende",
      ],
      expected: "d'un article et d'un tableau",
      explanation:
        "Un document composite réunit des éléments de natures différentes. Ici, un texte suivi qui explique, et un tableau qui donne des chiffres rangés par âge. Savoir nommer les parties, c'est déjà savoir où aller chercher.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_croiser_infos",
      text: "Tu as 11 ans. D'après le tableau, combien d'heures de sommeil te sont conseillées ?",
      choices: [
        "entre 9 et 12 heures",
        "entre 10 et 13 heures",
        "entre 8 et 10 heures",
        "entre 7 et 9 heures",
      ],
      expected: "entre 9 et 12 heures",
      explanation:
        "Il faut d'abord trouver la bonne ligne : 11 ans tombe dans « 6 à 12 ans ». Les autres réponses existent toutes dans le tableau — elles sont justes, mais pour quelqu'un d'autre. Lire un tableau, c'est choisir sa ligne avant de lire sa colonne.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "D'après l'article, à quoi peut-on reconnaître un enfant qui manque de sommeil ?",
      choices: [
        "Il s'agite et n'arrive pas à rester attentif.",
        "Il s'endort sur sa table pendant les cours.",
        "Il tombe malade plus souvent que les autres.",
        "Il parle moins que d'habitude en classe.",
      ],
      expected: "Il s'agite et n'arrive pas à rester attentif.",
      explanation:
        "L'article prend soin de dire le contraire de ce qu'on attend : « ne s'endort pas forcément en classe ». C'est justement pour corriger l'idée reçue. Un texte documentaire prévient souvent les erreurs de son lecteur.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Quelle idée l'article défend-il avant tout ?",
      choices: [
        "Le sommeil sert au cerveau à retenir ce qu'on a appris.",
        "Les bébés dorment plus que les adultes.",
        "Il faut se coucher tôt pour être à l'heure à l'école.",
        "Les adultes n'ont pas besoin de dormir.",
      ],
      expected: "Le sommeil sert au cerveau à retenir ce qu'on a appris.",
      explanation:
        "C'est l'idée annoncée dès la première phrase, et tout le reste en découle. Que les bébés dorment plus est vrai, mais c'est un exemple au service de l'idée — pas l'idée elle-même.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_genres",
      text: "À quoi sert ce document ?",
      choices: [
        "à informer",
        "à raconter une histoire",
        "à faire rire",
        "à donner une recette",
      ],
      expected: "à informer",
      explanation:
        "Aucun personnage, aucune histoire : des explications et des chiffres. Un document documentaire cherche à faire savoir, là où un récit cherche à faire vivre quelque chose au lecteur.",
    },
  ],
};

const DOCUMENT_ECRANS_5E: SupportTexte = {
  id: "5e_doc_ecrans",
  kicker: "Groupement de documents",
  titre: "Les écrans, le soir",
  source: "Documents originaux — EleveAI",
  texte: `DOCUMENT 1 — Article

La lumière des écrans n'est pas une lumière comme une autre. Riche en bleu, elle imite celle du matin et retarde le signal qui, le soir, prépare l'endormissement. Un adolescent qui regarde son téléphone jusqu'au dernier moment met en moyenne une demi-heure de plus à trouver le sommeil.

Le contenu compte autant que la lumière. Une vidéo qui s'enchaîne toute seule ne prévoit aucun moment pour s'arrêter : ce n'est pas la fatigue qui décide de la fin, c'est la plateforme.


DOCUMENT 2 — Enquête auprès de 500 élèves de 5ᵉ
Dernière activité avant de dormir :

• Téléphone ou tablette — 61 %
• Lecture — 14 %
• Télévision — 13 %
• Discussion en famille — 12 %


DOCUMENT 3 — Témoignage

« Je me disais : encore une vidéo, et j'arrête. Le problème, c'est que je n'ai jamais décidé quelle serait la dernière. Depuis que je laisse le téléphone dans le salon, je m'endors sans m'en rendre compte. » — Inès, 13 ans`,
  questions: [
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "D'après le document 2, quelle part des élèves interrogés utilise un écran juste avant de dormir ?",
      choices: [
        "74 %, en additionnant le téléphone et la télévision",
        "61 %, le téléphone seul",
        "13 %, la télévision seule",
        "26 %, la lecture et la discussion en famille",
      ],
      expected: "74 %, en additionnant le téléphone et la télévision",
      explanation:
        "La question porte sur « un écran », pas sur « le téléphone ». La télévision en est un aussi : 61 + 13 = 74. Relever un indice, c'est d'abord relire ce qui est demandé — le tableau ne fait pas l'addition à votre place.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "« Je n'ai jamais décidé quelle serait la dernière. » Que reproche Inès à ces vidéos ?",
      choices: [
        "Elles s'enchaînent sans lui laisser le moment de s'arrêter.",
        "Elles sont trop longues à charger.",
        "Elles ne l'intéressent pas vraiment.",
        "Elles l'empêchent de voir ses amis.",
      ],
      expected: "Elles s'enchaînent sans lui laisser le moment de s'arrêter.",
      explanation:
        "Inès ne dit pas qu'elle manque de volonté : elle dit qu'on ne lui a jamais laissé l'occasion d'en avoir. Son témoignage rejoint la fin du document 1 — « ce n'est pas la fatigue qui décide de la fin, c'est la plateforme ».",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_sens_global",
      text: "Que gagne-t-on à lire les trois documents ensemble plutôt que le premier seul ?",
      choices: [
        "L'article explique le mécanisme, l'enquête montre l'ampleur, le témoignage donne à voir de l'intérieur.",
        "Les trois documents disent exactement la même chose, ce qui la rend plus sûre.",
        "Le témoignage contredit l'article et l'enquête.",
        "L'enquête sert uniquement à illustrer le témoignage d'Inès.",
      ],
      expected:
        "L'article explique le mécanisme, l'enquête montre l'ampleur, le témoignage donne à voir de l'intérieur.",
      explanation:
        "Un groupement de documents n'empile pas : il éclaire un sujet sous trois angles. Le pourquoi, le combien, et le vécu. Aucun des trois ne suffirait, et ils ne se répètent pas.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_apprecier",
      text: "Le document 1 dit : « ce n'est pas la fatigue qui décide de la fin, c'est la plateforme ». Pourquoi cette phrase frappe-t-elle ?",
      choices: [
        "Elle retire la décision à celui qui regarde et la donne à une machine.",
        "Elle donne un chiffre précis et vérifiable.",
        "Elle s'adresse directement au lecteur en le tutoyant.",
        "Elle décrit ce que ressent physiquement un adolescent fatigué.",
      ],
      expected:
        "Elle retire la décision à celui qui regarde et la donne à une machine.",
      explanation:
        "La phrase est construite sur un renversement : on croyait choisir, on ne choisissait pas. C'est ce déplacement, et non un chiffre, qui la rend mémorable — et qui prépare le témoignage d'Inès.",
    },
    {
      notionId: "culture_litteraire",
      microId: "5e_culture_genres",
      text: "Quelle est la nature du document 3 ?",
      choices: [
        "un témoignage, à la première personne",
        "un article scientifique",
        "un extrait de roman",
        "un résultat d'enquête chiffré",
      ],
      expected: "un témoignage, à la première personne",
      explanation:
        "Guillemets, « je », prénom et âge à la fin : quelqu'un de réel rapporte son expérience. Un témoignage ne prouve rien à lui seul — il rend sensible ce que les chiffres montrent de loin.",
    },
  ],
};

// Le récit d'abord, le document ensuite : c'est l'ordre de l'épreuve
// officielle, et le tirage choisit celui dont l'élève a vu le moins de
// questions.
export const SUPPORTS_CM2: SupportTexte[] = [
  POISSON_DE_LUDOVIC,
  DOCUMENT_SOMMEIL_CM2,
];
export const SUPPORTS_5E: SupportTexte[] = [
  AVIS_DE_CYCLONE,
  DOCUMENT_ECRANS_5E,
];
