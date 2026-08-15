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
  /**
   * SUPPORT ORAL. Quand il est présent, le texte n'est PAS affiché : il est lu
   * à voix haute par la synthèse vocale, et l'élève répond de mémoire. C'est
   * le domaine « compréhension de l'oral » de l'épreuve officielle — 8 items
   * en 6ᵉ sur une émission de France Inter, 9 en 4ᵉ sur France Info — avec
   * une réécoute LIMITÉE, que `ecoutes` reproduit.
   */
  oral?: { ecoutes: number };
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

const MANGUIER_DE_MADAME_LUCIE: SupportTexte = {
  id: "cm2_manguier_lucie",
  kicker: "Texte littéraire",
  titre: "Le manguier de madame Lucie",
  source: "Texte original — EleveAI",
  texte: `Le manguier de madame Lucie débordait par-dessus le mur. En novembre, ses branches ployaient si bas qu'on pouvait cueillir sans même se hisser.

Nous le faisions, bien sûr. À trois, en rentrant de l'école, en surveillant la fenêtre.

Un jeudi, la fenêtre s'est ouverte. Madame Lucie nous a regardés, chacun une mangue à la main. Elle n'a pas crié. Elle a seulement dit : « Elles sont meilleures demain. Aujourd'hui, elles sont encore dures. »

Le lendemain, en passant, nous avons trouvé un panier posé sur le muret, à l'ombre. Six mangues, bien mûres, et personne à la fenêtre.

Nous n'en avons plus jamais cueilli nous-mêmes. Chaque samedi, pourtant, le panier était là.

Ma mère dit que madame Lucie vivait seule depuis longtemps, et qu'elle ne recevait plus grand monde. Sur le moment, je n'ai pas compris le rapport.`,
  questions: [
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Quelle phrase résume le mieux cette histoire ?",
      choices: [
        "Des enfants volent des mangues, et leur voisine finit par leur en préparer un panier.",
        "Une voisine fait punir des enfants qui volaient ses mangues.",
        "Des enfants apprennent à cueillir les fruits au bon moment.",
        "Une vieille dame vend ses mangues aux enfants du quartier.",
      ],
      expected:
        "Des enfants volent des mangues, et leur voisine finit par leur en préparer un panier.",
      explanation:
        "Résumer, c'est garder le mouvement du texte : on part d'un vol, on arrive à un cadeau. La punition attendue n'a jamais lieu — la laisser dans le résumé, c'est raconter une autre histoire.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Que trouvent les enfants le lendemain de la scène à la fenêtre ?",
      choices: [
        "un panier de six mangues mûres, posé à l'ombre sur le muret",
        "la fenêtre fermée et le mur surélevé",
        "un mot de madame Lucie accroché à une branche",
        "le manguier taillé jusqu'en haut du mur",
      ],
      expected: "un panier de six mangues mûres, posé à l'ombre sur le muret",
      explanation:
        "L'information arrive au milieu du texte, sans être annoncée. Comprendre seul un texte plus long, c'est retenir ce genre de détail : c'est lui qui explique tout ce qui suit.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "« Ma mère dit que madame Lucie vivait seule depuis longtemps. Sur le moment, je n'ai pas compris le rapport. » Quel est ce rapport ?",
      choices: [
        "Le panier était sa façon à elle d'avoir encore de la visite.",
        "Elle n'avait plus la force de cueillir ses mangues toute seule.",
        "Elle voulait que les enfants gardent le secret.",
        "Elle n'aimait pas les mangues et les donnait pour ne pas les jeter.",
      ],
      expected: "Le panier était sa façon à elle d'avoir encore de la visite.",
      explanation:
        "Le texte ne le dit jamais — il pose les deux informations côte à côte et laisse le lecteur les relier. « Sur le moment » signale d'ailleurs que le narrateur, lui, a fini par comprendre.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_genres",
      text: "À quel genre ce texte appartient-il ?",
      choices: [
        "un récit de souvenir",
        "une fable en vers",
        "une fiche documentaire sur le manguier",
        "une lettre adressée à madame Lucie",
      ],
      expected: "un récit de souvenir",
      explanation:
        "Quelqu'un raconte, longtemps après, quelque chose qu'il a vécu enfant : les verbes au passé et le « je » du narrateur le montrent. Une fiche documentaire expliquerait comment pousse un manguier.",
    },
    {
      notionId: "lecture_oeuvres",
      microId: "cm2_oeuvre_theme",
      text: "Pourquoi la punition qu'on attend n'arrive-t-elle jamais ?",
      choices: [
        "Parce que madame Lucie choisit de donner ce qu'on lui prenait.",
        "Parce qu'elle n'a pas reconnu les enfants derrière le mur.",
        "Parce que les enfants se sont excusés le jeudi soir.",
        "Parce que les mangues ne lui appartenaient pas vraiment.",
      ],
      expected: "Parce que madame Lucie choisit de donner ce qu'on lui prenait.",
      explanation:
        "C'est tout l'enjeu du récit : elle renverse la situation d'un seul geste. En transformant le vol en cadeau, elle enlève aux enfants l'envie de recommencer — et se donne une raison de les revoir.",
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

// LE TROISIÈME SUPPORT DE 5ᵉ N'EST PAS UN RÉCIT DE PLUS. « L'avis de cyclone »
// est un texte intime, à la première personne ; celui-ci est un conte de
// sagesse, avec des dialogues et une chute. La compréhension de l'écrit ne se
// joue pas pareil dans les deux — et `5e_culture_genres` ne peut poser une
// vraie question de genre que si les genres diffèrent réellement.
const LA_BOURSE_DU_MARCHAND: SupportTexte = {
  id: "5e_bourse_marchand",
  kicker: "Texte littéraire",
  titre: "La bourse du marchand",
  source: "Texte original — EleveAI",
  texte: `Un marchand perdit sa bourse un jour de marché. Un jeune porteur la ramassa, la garda fermée, et la rapporta le soir même.

Le marchand avait promis dix pièces à qui la retrouverait. Devant tout le monde, il ouvrit la bourse, compta longuement, puis leva la tête.

« Il manque une pièce d'or. »

Le porteur devint tout rouge. Il jura qu'il n'avait jamais ouvert la bourse. Le marchand haussa les épaules : sa promesse ne valait plus rien, puisqu'on venait de le voler.

On alla chercher le juge. Il écouta le marchand sans l'interrompre une seule fois.

« Ta bourse contenait donc deux cents pièces ?
— Deux cents. J'en suis certain.
— Et celle-ci en contient cent quatre-vingt-dix-neuf.
— C'est bien ce que je dis !
— Alors ce n'est pas la tienne. »

Le juge posa la bourse devant le porteur.

« Nous attendrons celui qui a perdu cent quatre-vingt-dix-neuf pièces. S'il ne vient pas, elle sera à toi. Quant à toi, marchand, reviens le jour où l'on retrouvera une bourse de deux cents. »

Le marchand ouvrit la bouche, la referma, et s'en alla les mains vides.`,
  questions: [
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_sens_global",
      text: "Sur quoi repose exactement le raisonnement du juge ?",
      choices: [
        "Il prend le marchand au mot : une bourse de 199 pièces ne peut pas être celle qu'il décrit.",
        "Il croit le porteur parce qu'il est jeune et pauvre.",
        "Il pense que la pièce manquante est tombée pendant le trajet.",
        "Il partage la bourse entre les deux hommes pour les mettre d'accord.",
      ],
      expected:
        "Il prend le marchand au mot : une bourse de 199 pièces ne peut pas être celle qu'il décrit.",
      explanation:
        "Le juge ne cherche pas de preuve et n'accuse personne : il applique à la lettre ce que le marchand vient d'affirmer. Le mensonge se retourne tout seul contre celui qui l'a dit.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "Quel détail montre le mieux que le marchand cherche surtout à ne pas payer ?",
      choices: [
        "Sa promesse « ne vaut plus rien » à la seconde où il crie au vol.",
        "Il compte longuement les pièces devant tout le monde.",
        "Il accepte d'aller chercher le juge.",
        "Il hausse les épaules en écoutant le porteur.",
      ],
      expected: "Sa promesse « ne vaut plus rien » à la seconde où il crie au vol.",
      explanation:
        "Les autres détails peuvent s'expliquer autrement ; celui-là, non. L'accusation tombe pile au moment où il faudrait sortir les dix pièces, et elle l'en dispense.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "« Le marchand ouvrit la bouche, la referma, et s'en alla les mains vides. » Que comprend-on ?",
      choices: [
        "Il ne peut plus se défendre sans avouer qu'il a menti.",
        "Il n'a pas compris la décision du juge.",
        "Il part chercher des témoins pour prouver sa bonne foi.",
        "Il est trop en colère pour parler.",
      ],
      expected: "Il ne peut plus se défendre sans avouer qu'il a menti.",
      explanation:
        "La bouche qui s'ouvre puis se referme dit tout : il a une réponse, et cette réponse le condamnerait. Réclamer la bourse reviendrait à reconnaître qu'elle contenait bien 199 pièces.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_apprecier",
      text: "Pourquoi la dernière phrase est-elle une bonne fin ?",
      choices: [
        "Elle montre la défaite du marchand par trois gestes, sans jamais la nommer.",
        "Elle explique enfin où était passée la pièce d'or.",
        "Elle annonce que le marchand reviendra se venger.",
        "Elle donne la morale de l'histoire en une formule.",
      ],
      expected:
        "Elle montre la défaite du marchand par trois gestes, sans jamais la nommer.",
      explanation:
        "Aucun mot ne dit qu'il a perdu : une bouche qui s'ouvre, qui se referme, et des mains vides. Le texte fait confiance à son lecteur — c'est souvent ce qui rend une chute efficace.",
    },
    {
      notionId: "culture_litteraire",
      microId: "5e_culture_genres",
      text: "À quel type de récit cette histoire ressemble-t-elle ?",
      choices: [
        "un conte de sagesse, où un juge rend justice par la ruse",
        "un fait divers rapporté par un journal",
        "une scène de théâtre avec ses didascalies",
        "un récit d'aventures en pays lointain",
      ],
      expected: "un conte de sagesse, où un juge rend justice par la ruse",
      explanation:
        "Ni lieu, ni date, ni nom : des personnages réduits à leur rôle — un marchand, un porteur, un juge — et une leçon qui se dégage de l'action. C'est la manière du conte, pas celle du fait divers.",
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

// ══════════════════════════════════════════════════════════════════════════
// LES SUPPORTS ORAUX
//
// Le quatrième domaine de l'épreuve officielle, et le dernier qui nous
// manquait : la COMPRÉHENSION DE L'ORAL. En 6ᵉ, huit items sur un extrait des
// « Petits Bateaux » (France Inter) ; en 4ᵉ, neuf sur « Le vrai du faux »
// (France Info). Dans les deux cas un enregistrement, une réécoute limitée,
// et des questions auxquelles on répond DE MÉMOIRE.
//
// Chez nous, la voix est celle du navigateur — la même mécanique que la
// dictée du jour, donc aucun mp3 à produire et aucune voix à payer. Les
// textes sont écrits pour être ENTENDUS : phrases courtes, information
// répétée autrement, aucun chiffre à retenir sans qu'il soit annoncé. Un
// texte fait pour l'œil, lu à voix haute, perd son lecteur en dix secondes.
//
// Ce sont les seules questions de l'épreuve où l'élève n'a rien sous les
// yeux. C'est exactement ce qu'on veut mesurer.

const ORAL_LA_PEUR_CM2: SupportTexte = {
  id: "cm2_oral_peur",
  kicker: "Compréhension de l'oral",
  titre: "Pourquoi on a peur ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Aujourd'hui, une question posée par Naïla, neuf ans : pourquoi est-ce qu'on a peur ?

La peur, c'est d'abord une alarme. Quand ton cerveau repère un danger, il déclenche tout un signal : ton cœur bat plus vite, tes muscles se tendent, tu respires plus court. Tout ça sert à une chose — te préparer à fuir, ou à te défendre. C'est utile. Sans la peur, nos ancêtres n'auraient pas survécu longtemps.

Le problème, c'est que cette alarme se déclenche parfois pour rien. Devant un exposé à faire en classe, il n'y a aucun danger réel. Et pourtant le corps réagit exactement pareil : le cœur s'emballe, les mains deviennent moites.

Alors que faire ? Les spécialistes disent tous la même chose : ce qui calme la peur, ce n'est pas de l'éviter, c'est d'y aller petit à petit. Plus on affronte ce qui fait peur, moins l'alarme se déclenche fort la fois suivante.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Qui a posé la question au début de l'émission ?",
      choices: [
        "Naïla, une enfant de neuf ans",
        "un médecin",
        "le présentateur lui-même",
        "un professeur de collège",
      ],
      expected: "Naïla, une enfant de neuf ans",
      explanation:
        "L'information est donnée dans la toute première phrase. À l'oral, le début porte souvent l'essentiel : c'est là qu'il faut être le plus attentif.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'après ce que tu as entendu, à quoi sert la peur ?",
      choices: [
        "à préparer le corps à fuir ou à se défendre",
        "à rendre le cœur plus solide",
        "à empêcher de dormir",
        "à faire travailler la mémoire",
      ],
      expected: "à préparer le corps à fuir ou à se défendre",
      explanation:
        "Le texte le dit clairement : « Tout ça sert à une chose — te préparer à fuir, ou à te défendre. » Le tiret annonce l'explication.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Comment reformulerais-tu l'idée principale de ce passage ?",
      choices: [
        "La peur est une alarme utile, qui se déclenche parfois sans vrai danger.",
        "La peur est une maladie qu'il faut soigner.",
        "Il faut éviter tout ce qui fait peur.",
        "Les enfants ont plus peur que les adultes.",
      ],
      expected:
        "La peur est une alarme utile, qui se déclenche parfois sans vrai danger.",
      explanation:
        "Reformuler, c'est dire la même chose autrement et plus court. Les deux temps du texte — l'alarme utile, puis l'alarme qui se trompe — tiennent tous les deux dans cette phrase.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quel exemple de peur sans danger réel a été donné ?",
      choices: [
        "faire un exposé devant la classe",
        "traverser une rue",
        "rencontrer un chien",
        "dormir dans le noir",
      ],
      expected: "faire un exposé devant la classe",
      explanation:
        "C'était le seul exemple donné, et il vient juste après « cette alarme se déclenche parfois pour rien ». Repérer où tombe un exemple aide à le retenir.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Quel conseil donnent les spécialistes, d'après l'émission ?",
      choices: [
        "affronter petit à petit ce qui fait peur",
        "éviter complètement ce qui fait peur",
        "en parler à personne",
        "attendre que la peur passe toute seule",
      ],
      expected: "affronter petit à petit ce qui fait peur",
      explanation:
        "Le texte oppose les deux : « ce n'est pas de l'éviter, c'est d'y aller petit à petit ». Quand on entend « ce n'est pas… c'est… », la bonne réponse est toujours dans la seconde partie.",
    },
  ],
};

// ⚠️ DEUX ENREGISTREMENTS PAR NIVEAU, ET C'EST LE MINIMUM. Le thème oral ne
// se replie jamais sur la banque : quand ses supports sont épuisés, il
// disparaît de l'épreuve. Avec un seul enregistrement, le deuxième passage
// perdait déjà cinq questions sur vingt-cinq — mesuré en simulant dix
// passages. Chaque enregistrement ajouté rend un passage complet de plus.
const ORAL_MER_SALEE_CM2: SupportTexte = {
  id: "cm2_oral_mer_salee",
  kicker: "Compréhension de l'oral",
  titre: "Pourquoi la mer est-elle salée ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Aujourd'hui, la question vient de Marius, dix ans : pourquoi la mer est-elle salée ?

Commençons par le sel lui-même. Il ne tombe pas du ciel, et il ne pousse pas dans l'eau. Il était déjà là, dans les roches, sous nos pieds.

Quand il pleut, l'eau ruisselle sur les rochers et leur arrache un peu de sel au passage. Une toute petite quantité. Mais elle le fait depuis des millions d'années. Cette eau descend dans les rivières, les rivières rejoignent les fleuves, et les fleuves finissent tous dans la mer. Le sel voyage avec eux.

Alors une question se pose : si les rivières transportent du sel, pourquoi l'eau des rivières n'est-elle pas salée ? Parce qu'elle ne reste pas. Elle passe, elle continue, elle emporte son sel plus loin.

La mer, elle, ne va nulle part. Le soleil chauffe sa surface, l'eau s'évapore et remonte en nuages. Mais le sel, lui, ne s'évapore pas. Il reste. Et chaque année, il y en a un peu plus.

Voilà pourquoi la mer est salée. Ce n'est pas parce qu'on y a versé du sel. C'est parce que l'eau s'en va, et que le sel, lui, ne part jamais.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'où vient la question à laquelle l'émission répond ?",
      choices: [
        "d'un enfant de dix ans, Marius",
        "d'un scientifique invité au studio",
        "du présentateur lui-même",
        "d'un livre cité au début",
      ],
      expected: "d'un enfant de dix ans, Marius",
      explanation:
        "C'est dit dans la toute première phrase, avec le prénom et l'âge. À l'oral, l'ouverture porte presque toujours l'information la plus facile à retenir — encore faut-il être déjà attentif.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'après l'émission, où se trouvait le sel avant d'arriver dans la mer ?",
      choices: [
        "dans les roches",
        "dans les nuages",
        "au fond de la mer",
        "dans le corps des poissons",
      ],
      expected: "dans les roches",
      explanation:
        "L'émission le dit tôt : « Il était déjà là, dans les roches, sous nos pieds. » Toute l'explication qui suit part de là.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Pourquoi l'eau des rivières n'est-elle pas salée, d'après l'émission ?",
      choices: [
        "parce qu'elle ne reste pas en place : elle emporte son sel plus loin",
        "parce que les rivières ne touchent jamais les roches",
        "parce que le sel des rivières s'évapore avec le soleil",
        "parce que les poissons d'eau douce mangent le sel",
      ],
      expected:
        "parce qu'elle ne reste pas en place : elle emporte son sel plus loin",
      explanation:
        "La question est posée à voix haute dans l'émission, puis la réponse tombe juste après : « Parce qu'elle ne reste pas. » Une question posée par celui qui parle annonce toujours ce qu'il faut retenir.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Comment dirais-tu autrement, et plus court, l'explication de l'émission ?",
      choices: [
        "L'eau s'en va en s'évaporant, le sel reste — et il s'accumule depuis des millions d'années.",
        "La mer est salée parce que les hommes y ont versé du sel.",
        "Les rivières sont plus salées que la mer.",
        "Le sel se forme tout seul au fond de l'océan.",
      ],
      expected:
        "L'eau s'en va en s'évaporant, le sel reste — et il s'accumule depuis des millions d'années.",
      explanation:
        "Reformuler, c'est tenir les deux moitiés de l'explication dans une seule phrase : ce qui part, et ce qui reste. Les autres réponses gardent le sujet mais perdent le mécanisme.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "L'émission dit que la mer contient chaque année un peu plus de sel. Qu'est-ce qui le justifie ?",
      choices: [
        "Le sel arrive sans arrêt par les fleuves, et rien ne le fait repartir.",
        "La mer se réchauffe et fabrique du sel.",
        "Les rochers tombent dans la mer et s'y dissolvent.",
        "La pluie tombée sur la mer est elle-même salée.",
      ],
      expected:
        "Le sel arrive sans arrêt par les fleuves, et rien ne le fait repartir.",
      explanation:
        "Justifier, c'est retrouver les deux raisons qui tiennent ensemble : une entrée permanente, aucune sortie. L'une sans l'autre n'expliquerait rien.",
    },
  ],
};

const ORAL_VRAI_FAUX_5E: SupportTexte = {
  id: "5e_oral_vrai_faux",
  kicker: "Compréhension de l'oral",
  titre: "Comment vérifier une information ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Une image circule depuis hier sur les réseaux : un requin qui nagerait dans une rue inondée, après le passage d'une tempête. Elle a été partagée des milliers de fois. Est-elle vraie ?

Première chose à faire : regarder d'où elle vient. Ici, aucun compte sérieux ne la publie — que des partages de partages. C'est déjà un mauvais signe. Une information vérifiée remonte toujours à une source qu'on peut nommer.

Deuxième réflexe : chercher l'image elle-même. En quelques secondes, on retrouve la même photo, publiée il y a douze ans, après une tout autre tempête, et déjà démentie à l'époque. Ce n'est donc pas un faux tout neuf : c'est un vieux faux qui ressort.

Et c'est là le point important. Une image peut être authentique et raconter quand même quelque chose de faux, simplement parce qu'on l'a sortie de son époque et de son lieu. Ce n'est pas la photo qui ment. C'est la légende qu'on lui colle.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que montre l'image dont il est question ?",
      choices: [
        "un requin dans une rue inondée",
        "une tempête vue du ciel",
        "une rue détruite par un cyclone",
        "un bateau échoué sur une plage",
      ],
      expected: "un requin dans une rue inondée",
      explanation:
        "L'information est donnée dès la première phrase. À l'oral, l'annonce du sujet arrive presque toujours en ouverture.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Quel est le premier réflexe conseillé ?",
      choices: [
        "regarder d'où vient l'image",
        "compter les partages",
        "demander l'avis de ses amis",
        "agrandir l'image pour voir les détails",
      ],
      expected: "regarder d'où vient l'image",
      explanation:
        "Le texte annonce ses étapes : « Première chose à faire… », puis « Deuxième réflexe… ». Ces mots servent de repères quand on écoute.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Qu'a-t-on découvert en cherchant l'image ?",
      choices: [
        "elle avait déjà été publiée douze ans plus tôt, après une autre tempête",
        "elle avait été fabriquée par ordinateur",
        "elle venait d'un film",
        "elle avait été prise le matin même"
      ],
      expected:
        "elle avait déjà été publiée douze ans plus tôt, après une autre tempête",
      explanation:
        "C'est le cœur de la démonstration : l'image est ancienne et concerne un autre événement. Le chiffre « douze ans » était annoncé clairement — à l'oral, on retient mieux ce qui est mis en avant.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "D'après l'émission, qu'est-ce qui ment dans ce cas précis ?",
      choices: [
        "la légende qu'on ajoute à la photo",
        "la photo elle-même, qui est truquée",
        "le nombre de partages",
        "la date affichée par le réseau social",
      ],
      expected: "la légende qu'on ajoute à la photo",
      explanation:
        "La conclusion est explicite : « Ce n'est pas la photo qui ment, c'est la légende qu'on lui colle. » Une image authentique peut servir un propos faux.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Pourquoi l'absence de source sérieuse est-elle « un mauvais signe » ?",
      choices: [
        "parce qu'une information vérifiée remonte toujours à une source qu'on peut nommer",
        "parce que les réseaux sociaux sont toujours faux",
        "parce que l'image est de mauvaise qualité",
        "parce qu'elle a été partagée trop de fois",
      ],
      expected:
        "parce qu'une information vérifiée remonte toujours à une source qu'on peut nommer",
      explanation:
        "L'argument est donné juste après le constat. Ce n'est pas le partage qui pose problème en soi : c'est qu'on ne puisse remonter à personne.",
    },
  ],
};

const ORAL_LANGAGE_ANIMAL_5E: SupportTexte = {
  id: "5e_oral_langage_animal",
  kicker: "Compréhension de l'oral",
  titre: "Est-ce que les animaux se parlent ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Est-ce que les animaux se parlent ? La question revient souvent, et la réponse tient en deux temps.

Premier temps : oui, ils communiquent, et parfois avec une précision qui surprend. Prenez la mésange. Quand elle repère un rapace dans le ciel, elle lance un cri fin et aigu. Quand le danger vient du sol, un chat par exemple, elle en lance un autre, plus large. Et les autres mésanges ne réagissent pas de la même façon : au premier signal elles se plaquent contre le tronc, au second elles s'envolent. Le cri ne dit donc pas seulement « attention ». Il dit d'où vient le danger.

L'abeille va plus loin encore. De retour à la ruche, elle danse. La direction de sa danse indique où sont les fleurs, et sa durée indique à quelle distance. Ses compagnes repartent ensuite droit au bon endroit.

Deuxième temps, et c'est là qu'il faut être prudent : communiquer, ce n'est pas parler. La mésange dispose de quelques signaux, toujours les mêmes. Elle ne peut pas en inventer un nouveau pour raconter sa journée d'hier. Nous, si : avec un petit nombre de mots, nous fabriquons des phrases que personne n'a jamais dites.

Alors, se parlent-ils ? Ils se transmettent des informations, sans aucun doute. Mais une langue, c'est autre chose : c'est pouvoir dire ce qui n'a pas encore été dit.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Quels sont les deux animaux pris en exemple ?",
      choices: [
        "la mésange et l'abeille",
        "le chat et le rapace",
        "la fourmi et le dauphin",
        "le chien et le perroquet",
      ],
      expected: "la mésange et l'abeille",
      explanation:
        "Le chat et le rapace sont cités, mais comme dangers, pas comme exemples de communication. Écouter, c'est aussi distinguer ce dont on parle de ce qui sert à en parler.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que permet de savoir le cri de la mésange, en plus du danger ?",
      choices: [
        "d'où vient le danger",
        "à quelle distance il se trouve",
        "combien de temps il durera",
        "quel oiseau a donné l'alerte",
      ],
      expected: "d'où vient le danger",
      explanation:
        "C'est la phrase qui clôt le passage : « Il dit d'où vient le danger. » La distance, elle, appartient à l'exemple suivant — celui de l'abeille. Les deux exemples se ressemblent assez pour qu'on les confonde.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Qu'indique la durée de la danse de l'abeille ?",
      choices: [
        "la distance à parcourir jusqu'aux fleurs",
        "la quantité de fleurs trouvées",
        "le temps qu'il fera dans la journée",
        "le nombre d'abeilles qui doivent partir",
      ],
      expected: "la distance à parcourir jusqu'aux fleurs",
      explanation:
        "L'émission sépare nettement les deux informations : la direction de la danse dit où, sa durée dit à quelle distance. Retenir un exemple, c'est retenir ce découpage-là.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Comment la chronique organise-t-elle sa réponse ?",
      choices: [
        "en deux temps : oui, ils communiquent — non, ce n'est pas une langue",
        "en énumérant les animaux du plus simple au plus intelligent",
        "en opposant deux scientifiques qui ne sont pas d'accord",
        "en racontant une expérience menée dans un laboratoire",
      ],
      expected:
        "en deux temps : oui, ils communiquent — non, ce n'est pas une langue",
      explanation:
        "Les repères sont donnés à voix haute : « Premier temps… », « Deuxième temps… ». Suivre un propos oral, c'est d'abord entendre son plan — après quoi les exemples se rangent tout seuls.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Pour la chronique, qu'est-ce qui manque aux animaux pour qu'on parle d'une langue ?",
      choices: [
        "pouvoir inventer un message que personne n'a encore dit",
        "avoir une voix assez souple pour articuler",
        "être capables de se comprendre entre espèces différentes",
        "disposer d'un grand nombre de cris différents",
      ],
      expected: "pouvoir inventer un message que personne n'a encore dit",
      explanation:
        "L'argument est repris deux fois, à la fin de chaque partie : la mésange ne peut pas raconter sa journée d'hier, et une langue c'est « pouvoir dire ce qui n'a pas encore été dit ». Ce n'est pas le nombre de signaux qui compte, c'est la possibilité d'en créer.",
    },
  ],
};

/* ═══════════════════════════════════════════════════════════════════════════
   SIX ENREGISTREMENTS DE PLUS, TROIS PAR NIVEAU (15/08/2026)
   ---------------------------------------------------------------------------
   ⭐ POURQUOI : c'était le goulot, et il était chiffré. `simuler-epreuves-
   blanches.ts` donnait **2 passages complets sur 10** en français, aux DEUX
   niveaux. Dès le troisième, le thème oral tombait à 0/5 et l'épreuve passait
   de 25 à 20 questions — parce que l'oral ne se replie JAMAIS sur la banque
   (ce serait un mensonge d'étiquette). Deux enregistrements = deux passages.
   Chaque enregistrement ajouté rend un passage complet de plus.

   ⭐ CE QU'ILS TESTENT EN PRIORITÉ, et ce n'est pas un choix de goût : les
   résultats 2025 montrent que ce qui manque n'est pas le prélèvement
   d'information mais **le sens global, l'implicite et la visée** — 13 % sur
   « établir des inférences », 13 % sur « comprendre l'implicite », 17 % sur
   « rendre compte de la visée de chaque document ». Les questions faciles de
   repérage restent, mais chaque enregistrement porte au moins une question de
   sens global ou de visée.

   ⚠️ En 5ᵉ, `5e_oral_visees` (« Reconnaitre la visée d'une production orale »)
   existait dans le knowledge et n'était utilisée NULLE PART. Elle l'est ici.
   ⚠️ Textes originaux, écrits pour être ENTENDUS : phrases courtes, une idée
   par phrase, aucune information qui ne tienne qu'à la ponctuation. Le texte
   ne s'affiche pas, l'élève répond de mémoire, deux écoutes.
   ═════════════════════════════════════════════════════════════════════════ */

const ORAL_VOLCAN_CM2: SupportTexte = {
  id: "cm2_oral_volcan",
  kicker: "Compréhension de l'oral",
  titre: "Pourquoi le Piton de la Fournaise fume-t-il ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Aujourd'hui, la question vient de Tom, dix ans, qui habite Sainte-Rose : pourquoi le volcan fume-t-il, même quand il n'y a pas d'éruption ?

Commençons par une surprise. Ce qu'on voit monter, ce n'est pas de la fumée. La fumée, c'est ce qui reste quand quelque chose brûle. Or le volcan ne brûle pas. Ce panache blanc, c'est de la vapeur d'eau.

D'où vient cette eau ? De la pluie, tout simplement. L'eau s'infiltre dans les fissures de la roche, descend, et rencontre en profondeur des pierres encore brûlantes. Elle se transforme alors en vapeur et remonte. Ce n'est pas le volcan qui se réveille : c'est de l'eau qui repart d'où elle venait.

Cela dit, les scientifiques surveillent quand même ce panache de très près. Pas pour sa quantité, mais pour ce qu'il contient. Quand le magma se rapproche de la surface, la vapeur emporte avec elle des gaz particuliers. Les capteurs les détectent avant qu'aucun œil ne voie quoi que ce soit.

C'est pour cela qu'à La Réunion, l'éruption est presque toujours annoncée avant d'être visible.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'après l'émission, qu'est-ce qui monte du volcan ?",
      choices: [
        "de la vapeur d'eau",
        "de la fumée",
        "de la poussière de roche",
        "de la lave liquide",
      ],
      expected: "de la vapeur d'eau",
      explanation:
        "La réponse est donnée juste après l'annonce d'une surprise. Quand un texte dit « voici une surprise », l'information importante arrive dans la phrase suivante.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'où vient l'eau qui devient de la vapeur ?",
      choices: [
        "de la pluie qui s'infiltre dans la roche",
        "de la mer toute proche",
        "d'une rivière souterraine",
        "de la neige du sommet",
      ],
      expected: "de la pluie qui s'infiltre dans la roche",
      explanation:
        "Le texte l'annonce par une question — « D'où vient cette eau ? » — puis répond aussitôt. Une question posée à l'oral sert presque toujours à introduire ce qu'il faut retenir.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Comment résumerais-tu l'idée principale de l'émission ?",
      choices: [
        "Le panache du volcan est de la vapeur, mais on le surveille pour les gaz qu'il transporte.",
        "Le volcan brûle en permanence sous la surface.",
        "Il pleut beaucoup autour du Piton de la Fournaise.",
        "Les éruptions sont impossibles à prévoir.",
      ],
      expected:
        "Le panache du volcan est de la vapeur, mais on le surveille pour les gaz qu'il transporte.",
      explanation:
        "Résumer, c'est garder les deux temps du texte : ce que le panache est, et pourquoi on l'observe quand même. Une seule des deux idées ne suffit pas.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Que surveillent les scientifiques dans ce panache ?",
      choices: [
        "les gaz qu'il contient",
        "sa hauteur",
        "sa couleur",
        "sa température",
      ],
      expected: "les gaz qu'il contient",
      explanation:
        "Le texte oppose explicitement deux choses : « pas pour sa quantité, mais pour ce qu'il contient ». Quand on entend « pas… mais… », la réponse est dans la seconde partie.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "L'émission se termine par : « l'éruption est presque toujours annoncée avant d'être visible ». Qu'est-ce qui explique cela, d'après ce que tu as entendu ?",
      choices: [
        "les capteurs détectent les gaz avant que l'œil ne voie quelque chose",
        "le panache devient plus gros plusieurs jours avant",
        "les habitants entendent le volcan gronder",
        "la pluie s'arrête juste avant l'éruption",
      ],
      expected:
        "les capteurs détectent les gaz avant que l'œil ne voie quelque chose",
      explanation:
        "La dernière phrase ne s'explique pas toute seule : elle découle du paragraphe d'avant. À l'oral, une conclusion renvoie presque toujours à ce qui vient d'être dit.",
    },
  ],
};

const ORAL_MOTS_NOUVEAUX_CM2: SupportTexte = {
  id: "cm2_oral_mots_nouveaux",
  kicker: "Compréhension de l'oral",
  titre: "D'où viennent les mots qu'on invente ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `La question du jour vient de Chloé, en CM2 : est-ce qu'on a le droit d'inventer des mots ?

La réponse va peut-être te surprendre : oui. Tout le monde en invente, et la langue française s'est construite comme ça, mot après mot.

Mais inventer ne suffit pas. Pour qu'un mot existe vraiment, il faut que d'autres gens le reprennent. C'est là que presque tout se joue. Un mot inventé qu'on est seul à employer reste une plaisanterie entre amis. Un mot que des milliers de personnes utilisent finit par entrer dans le dictionnaire.

Comment fabrique-t-on un mot nouveau ? Le plus souvent, on ne part pas de rien. On colle deux mots ensemble, comme dans « porte-monnaie ». On ajoute un petit morceau devant ou derrière, comme « re » dans « recommencer ». Ou bien on emprunte à une autre langue.

Et il y a une chose que les dictionnaires ne font pas : ils ne décident pas. Ils constatent. Quand un mot est employé partout depuis assez longtemps, ils l'inscrivent — parfois des années après que tout le monde l'utilise déjà.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'après l'émission, a-t-on le droit d'inventer des mots ?",
      choices: [
        "oui, tout le monde en invente",
        "non, c'est interdit",
        "seulement les écrivains",
        "seulement les dictionnaires",
      ],
      expected: "oui, tout le monde en invente",
      explanation:
        "La réponse arrive dès le deuxième paragraphe, annoncée par « la réponse va peut-être te surprendre ».",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Que faut-il pour qu'un mot inventé existe vraiment ?",
      choices: [
        "que d'autres gens le reprennent",
        "qu'un professeur l'accepte",
        "qu'il soit écrit dans un livre",
        "qu'il vienne d'une autre langue",
      ],
      expected: "que d'autres gens le reprennent",
      explanation:
        "Le texte le souligne : « C'est là que presque tout se joue. » Cette phrase signale l'idée la plus importante du passage.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Quelle phrase résume le mieux ce qui a été dit ?",
      choices: [
        "Un mot naît quand on l'invente, mais il n'existe que si beaucoup de gens l'emploient.",
        "Seuls les dictionnaires ont le droit de créer des mots.",
        "Il ne faut pas inventer de mots, cela abîme la langue.",
        "Les mots nouveaux viennent tous de l'anglais.",
      ],
      expected:
        "Un mot naît quand on l'invente, mais il n'existe que si beaucoup de gens l'emploient.",
      explanation:
        "Le « mais » du résumé reprend exactement l'opposition du texte : inventer d'un côté, être repris de l'autre.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quel exemple de mot fabriqué en collant deux mots a été donné ?",
      choices: [
        "porte-monnaie",
        "recommencer",
        "dictionnaire",
        "plaisanterie",
      ],
      expected: "porte-monnaie",
      explanation:
        "« Recommencer » servait à illustrer autre chose : le petit morceau ajouté devant. Il faut relier chaque exemple à ce qu'il illustre.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Le texte dit que les dictionnaires « ne décident pas, ils constatent ». Qu'est-ce que cela veut dire ?",
      choices: [
        "ils inscrivent les mots que les gens emploient déjà",
        "ils choisissent les mots les plus beaux",
        "ils interdisent les mots inventés",
        "ils créent chaque année de nouveaux mots",
      ],
      expected: "ils inscrivent les mots que les gens emploient déjà",
      explanation:
        "La phrase est expliquée juste après : ils inscrivent un mot « parfois des années après que tout le monde l'utilise ». L'explication suit l'affirmation.",
    },
  ],
};

const ORAL_ENNUI_CM2: SupportTexte = {
  id: "cm2_oral_ennui",
  kicker: "Compréhension de l'oral",
  titre: "À quoi ça sert de s'ennuyer ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Aujourd'hui, une question posée par Ryan, onze ans : pourquoi les adultes disent-ils que s'ennuyer, c'est bon pour nous ?

Commençons par ce que c'est. S'ennuyer, ce n'est pas être triste. C'est se retrouver sans rien à faire, et sans savoir quoi faire. C'est désagréable, personne ne dit le contraire.

Seulement voilà. Des chercheurs ont observé des enfants dans deux situations. Les uns avaient des jeux et des écrans à volonté. Les autres attendaient dans une pièce, sans rien. Puis on a demandé aux deux groupes d'inventer une histoire. Ceux qui s'étaient ennuyés ont inventé les histoires les plus originales.

L'explication est simple. Quand plus rien ne l'occupe, le cerveau ne s'arrête pas. Il part chercher tout seul, il relie des idées qui n'avaient rien à voir. C'est de là que viennent souvent les meilleures trouvailles.

Alors la prochaine fois que tu t'ennuies, tu peux te dire une chose : ce moment vide n'est pas du temps perdu. C'est peut-être le moment où tu es en train d'inventer quelque chose.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'après l'émission, s'ennuyer, c'est...",
      choices: [
        "se retrouver sans rien à faire et sans savoir quoi faire",
        "être triste",
        "être fatigué",
        "être en colère",
      ],
      expected: "se retrouver sans rien à faire et sans savoir quoi faire",
      explanation:
        "Le texte commence par écarter une confusion — « ce n'est pas être triste » — avant de donner la vraie définition.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Dans l'expérience racontée, quel groupe a inventé les histoires les plus originales ?",
      choices: [
        "ceux qui avaient attendu sans rien",
        "ceux qui avaient des jeux et des écrans",
        "les deux groupes également",
        "aucun des deux",
      ],
      expected: "ceux qui avaient attendu sans rien",
      explanation:
        "Le résultat arrive à la fin du paragraphe, après la description des deux groupes. Il faut tenir les deux situations en tête jusque-là.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Quelle est l'idée principale de cette émission ?",
      choices: [
        "L'ennui est désagréable, mais il laisse le cerveau libre d'inventer.",
        "Il faut supprimer tous les écrans.",
        "L'ennui rend les enfants tristes.",
        "Les chercheurs n'ont rien trouvé de sûr.",
      ],
      expected:
        "L'ennui est désagréable, mais il laisse le cerveau libre d'inventer.",
      explanation:
        "L'idée principale tient les deux faces : le texte ne nie jamais que ce soit désagréable, et il explique pourquoi c'est utile.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Que fait le cerveau quand plus rien ne l'occupe ?",
      choices: [
        "il relie des idées qui n'avaient rien à voir",
        "il se met en pause",
        "il se fatigue plus vite",
        "il oublie ce qu'il a appris",
      ],
      expected: "il relie des idées qui n'avaient rien à voir",
      explanation:
        "L'explication est annoncée par « l'explication est simple » : à l'oral, cette formule prévient qu'il faut écouter la suite.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Pourquoi l'émission dit-elle que ce moment vide « n'est pas du temps perdu » ?",
      choices: [
        "parce que c'est peut-être là qu'on invente quelque chose",
        "parce qu'on se repose",
        "parce qu'on rattrape son sommeil",
        "parce qu'on révise sans s'en rendre compte",
      ],
      expected: "parce que c'est peut-être là qu'on invente quelque chose",
      explanation:
        "La conclusion reprend tout ce qui précède : l'expérience, puis l'explication. Une fin d'émission ne dit presque jamais quelque chose de neuf.",
    },
  ],
};

const ORAL_PUBLICITE_5E: SupportTexte = {
  id: "5e_oral_publicite",
  kicker: "Compréhension de l'oral",
  titre: "Un conseil, ou une publicité ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Vous connaissez sans doute ces vidéos qui commencent par « je vais vous donner trois astuces ». Le ton est amical, la personne parle de sa vie, et à la fin elle cite une marque. Alors, conseil ou publicité ?

Regardons comment c'est construit. Les deux premières astuces sont vraies, utiles, et ne coûtent rien. Elles servent à une chose : vous convaincre que la personne connaît son sujet. La troisième, elle, mène à un produit précis, avec un code de réduction.

Ce n'est pas un hasard, c'est une méthode. On l'appelle le placement de produit. La loi française oblige d'ailleurs à le signaler — mais la mention est souvent minuscule, ou passe en une seconde.

Attention, il ne s'agit pas de dire que ces vidéos mentent. Les astuces peuvent être excellentes. La question n'est pas là. Elle est de savoir dans quel but on vous parle. Un conseil cherche à vous rendre service. Une publicité cherche à vous faire acheter. Les deux peuvent se ressembler mot pour mot.

Le réflexe à prendre est simple : avant de vous demander si c'est vrai, demandez-vous à qui cela profite.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      text: "Quelle est la visée principale de cette émission ?",
      choices: [
        "apprendre à reconnaître dans quel but on nous parle",
        "dénoncer des vidéos qui mentent",
        "vendre un produit",
        "expliquer comment tourner une vidéo",
      ],
      expected: "apprendre à reconnaître dans quel but on nous parle",
      explanation:
        "La visée d'un propos, c'est ce qu'il cherche à obtenir de vous. Ici l'émission le dit elle-même : « La question est de savoir dans quel but on vous parle. »",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "À quoi servent les deux premières astuces, d'après l'émission ?",
      choices: [
        "à vous convaincre que la personne connaît son sujet",
        "à faire durer la vidéo",
        "à respecter la loi",
        "à vendre deux produits différents",
      ],
      expected: "à vous convaincre que la personne connaît son sujet",
      explanation:
        "Le texte l'annonce sans détour : « Elles servent à une chose ». Cette formule signale une information à retenir.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que dit l'émission sur la loi française ?",
      choices: [
        "elle oblige à signaler le placement de produit",
        "elle interdit le placement de produit",
        "elle ne s'occupe pas de ces vidéos",
        "elle impose un code de réduction",
      ],
      expected: "elle oblige à signaler le placement de produit",
      explanation:
        "L'obligation porte sur la mention, pas sur l'interdiction. Le texte ajoute d'ailleurs que la mention est souvent minuscule.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      text: "D'après l'émission, quelle est la différence entre un conseil et une publicité ?",
      choices: [
        "le but : rendre service, ou faire acheter",
        "le vocabulaire employé",
        "la longueur de la vidéo",
        "la vérité de ce qui est dit",
      ],
      expected: "le but : rendre service, ou faire acheter",
      explanation:
        "L'émission écarte explicitement la vérité comme critère : « Les astuces peuvent être excellentes. La question n'est pas là. » Ce qui distingue les deux, c'est l'intention.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Quel réflexe l'émission conseille-t-elle de prendre ?",
      choices: [
        "se demander à qui cela profite",
        "vérifier chaque astuce sur internet",
        "ne plus regarder ce genre de vidéos",
        "chercher la mention légale",
      ],
      expected: "se demander à qui cela profite",
      explanation:
        "Le conseil est donné dans la toute dernière phrase, et il est présenté comme venant AVANT la vérification : « avant de vous demander si c'est vrai ».",
    },
  ],
};

const ORAL_CARTES_5E: SupportTexte = {
  id: "5e_oral_cartes",
  kicker: "Compréhension de l'oral",
  titre: "Pourquoi toutes les cartes du monde sont fausses",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Voici une affirmation qui va vous sembler exagérée : toutes les cartes du monde sont fausses. Toutes, sans exception. Et pourtant elles sont utiles. Voyons pourquoi.

Le problème vient d'une impossibilité. La Terre est une sphère, la carte est plate. Or on ne peut pas aplatir une sphère sans la déformer quelque part. Essayez avec une peau d'orange : elle se déchire ou elle s'étire, jamais elle ne s'aplatit proprement.

Chaque carte choisit donc ce qu'elle accepte de fausser. La carte accrochée dans beaucoup de classes conserve les formes des pays et les angles, ce qui est très pratique pour naviguer. Mais elle triche sur les surfaces. Résultat, le Groenland y paraît aussi grand que l'Afrique, alors que l'Afrique est quatorze fois plus vaste.

D'autres cartes font le choix inverse. Elles respectent les surfaces, et déforment les formes : les pays y paraissent étirés, presque écrasés vers le bas.

Il n'existe donc pas de carte parfaite, et il n'en existera jamais. Ce qu'il faut savoir, c'est ce que celle qu'on regarde a choisi de sacrifier.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Pourquoi aucune carte ne peut-elle être exacte ?",
      choices: [
        "on ne peut pas aplatir une sphère sans la déformer",
        "les continents bougent trop vite",
        "les instruments de mesure sont imprécis",
        "les pays changent de frontières",
      ],
      expected: "on ne peut pas aplatir une sphère sans la déformer",
      explanation:
        "Le texte parle d'une « impossibilité », puis l'illustre avec la peau d'orange. L'exemple sert à rendre la cause concrète.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que conserve la carte accrochée dans beaucoup de classes ?",
      choices: [
        "les formes des pays et les angles",
        "les surfaces exactes",
        "les distances exactes",
        "les couleurs réelles",
      ],
      expected: "les formes des pays et les angles",
      explanation:
        "Le texte oppose ensuite ce qu'elle conserve à ce sur quoi elle triche. Retenir l'un des deux ne suffit pas.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Combien de fois l'Afrique est-elle plus vaste que le Groenland, d'après l'émission ?",
      choices: ["quatorze fois", "quatre fois", "quarante fois", "deux fois"],
      expected: "quatorze fois",
      explanation:
        "Un chiffre donné une seule fois à l'oral demande une attention particulière : c'est souvent lui qui rend l'exemple frappant.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      text: "Quelle est la visée de cette émission ?",
      choices: [
        "faire comprendre que chaque carte fait un choix, et lequel",
        "critiquer les professeurs de géographie",
        "expliquer comment fabriquer une carte",
        "convaincre de ne plus utiliser de cartes",
      ],
      expected: "faire comprendre que chaque carte fait un choix, et lequel",
      explanation:
        "L'émission ne condamne rien : elle insiste au contraire sur l'utilité des cartes. Sa dernière phrase dit ce qu'elle veut faire savoir.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "L'émission commence par « toutes les cartes du monde sont fausses » et ajoute aussitôt « et pourtant elles sont utiles ». Pourquoi cette précision est-elle importante ?",
      choices: [
        "elle annonce que le propos n'est pas de rejeter les cartes, mais de les comprendre",
        "elle sert à faire durer l'introduction",
        "elle contredit ce qui suit",
        "elle indique que l'émission parlera de navigation",
      ],
      expected:
        "elle annonce que le propos n'est pas de rejeter les cartes, mais de les comprendre",
      explanation:
        "Un « et pourtant » placé dès l'ouverture annonce la direction de tout le propos. Le repérer évite de se tromper sur l'intention.",
    },
  ],
};

const ORAL_TELEPHONES_5E: SupportTexte = {
  id: "5e_oral_telephones",
  kicker: "Compréhension de l'oral",
  titre: "Faut-il interdire les téléphones au collège ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Deux élèves de troisième débattent aujourd'hui. Écoutez d'abord Inès.

« Je suis pour l'interdiction. Dans mon collège, on l'applique depuis deux ans. Au début, tout le monde râlait. Maintenant, la cour est bruyante — et c'est justement le signe que ça marche. Avant, à la récréation, chacun regardait son écran dans son coin. Il ne s'agit pas de punir : il s'agit de rendre la récréation à ce qu'elle est. »

Maintenant, Kevin.

« Je comprends l'argument, et je ne dis pas qu'il est faux. Mais interdire n'apprend rien. Dans deux ans, au lycée, on aura tous un téléphone et personne ne nous aura montré comment nous en servir. Je préférerais qu'on nous apprenne à le poser nous-mêmes, plutôt qu'on nous le confisque. »

Les deux ont raison sur un point au moins : aucun ne conteste que les écrans posent un problème. Ce qu'ils discutent, c'est la réponse à y apporter. Interdire aujourd'hui, ou apprendre pour demain.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Quel argument Inès donne-t-elle pour dire que l'interdiction fonctionne ?",
      choices: [
        "la cour est devenue bruyante",
        "les élèves ont de meilleures notes",
        "les parents sont satisfaits",
        "il y a moins de bagarres",
      ],
      expected: "la cour est devenue bruyante",
      explanation:
        "L'argument est contre-intuitif : le bruit est présenté comme un bon signe. Il faut entendre pourquoi — avant, chacun était seul devant son écran.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Que reproche Kevin à l'interdiction ?",
      choices: [
        "elle n'apprend pas à se servir d'un téléphone",
        "elle est impossible à appliquer",
        "elle est injuste envers les élèves sérieux",
        "elle coûte trop cher au collège",
      ],
      expected: "elle n'apprend pas à se servir d'un téléphone",
      explanation:
        "Kevin ne conteste pas les faits d'Inès : il conteste ce qu'on en fait. Sa phrase clé est « interdire n'apprend rien ».",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Kevin commence par « Je comprends l'argument, et je ne dis pas qu'il est faux ». Que fait-il ainsi ?",
      choices: [
        "il reconnaît ce qui est vrai chez Inès avant de s'y opposer",
        "il change complètement de sujet",
        "il donne raison à Inès",
        "il refuse de répondre",
      ],
      expected: "il reconnaît ce qui est vrai chez Inès avant de s'y opposer",
      explanation:
        "C'est une manière de débattre : on accorde d'abord un point à l'autre, ce qui rend l'objection plus solide. Le « mais » qui suit annonce le désaccord.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      text: "Quelle est la visée de cet enregistrement ?",
      choices: [
        "présenter deux points de vue opposés sans trancher",
        "convaincre d'interdire les téléphones",
        "convaincre d'autoriser les téléphones",
        "raconter la vie d'un collège",
      ],
      expected: "présenter deux points de vue opposés sans trancher",
      explanation:
        "La fin ne donne raison à personne : elle dit ce que les deux partagent et ce qui les sépare. Un propos qui n'a pas de camp a pour visée d'éclairer, pas de convaincre.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Sur quel point les deux élèves sont-ils d'accord ?",
      choices: [
        "les écrans posent un problème",
        "il faut interdire les téléphones",
        "le lycée est trop permissif",
        "la récréation est trop courte",
      ],
      expected: "les écrans posent un problème",
      explanation:
        "C'est dit dans la dernière phrase : « aucun ne conteste que les écrans posent un problème ». Dans un débat, repérer l'accord aide à comprendre le désaccord.",
    },
  ],
};

// Le récit d'abord, le document ensuite, l'oral en dernier : c'est l'ordre de
// l'épreuve officielle, et le tirage choisit celui dont l'élève a vu le moins
// de questions.
export const SUPPORTS_CM2: SupportTexte[] = [
  POISSON_DE_LUDOVIC,
  MANGUIER_DE_MADAME_LUCIE,
  DOCUMENT_SOMMEIL_CM2,
];
export const SUPPORTS_5E: SupportTexte[] = [
  AVIS_DE_CYCLONE,
  LA_BOURSE_DU_MARCHAND,
  DOCUMENT_ECRANS_5E,
];

// CINQ ENREGISTREMENTS PAR NIVEAU depuis le 15/08 (deux auparavant). Le thème
// oral ne se replie jamais sur la banque : le nombre d'enregistrements EST le
// nombre de passages complets que l'épreuve peut servir.
export const SUPPORTS_ORAL_CM2: SupportTexte[] = [
  ORAL_LA_PEUR_CM2,
  ORAL_MER_SALEE_CM2,
  ORAL_VOLCAN_CM2,
  ORAL_MOTS_NOUVEAUX_CM2,
  ORAL_ENNUI_CM2,
];
export const SUPPORTS_ORAL_5E: SupportTexte[] = [
  ORAL_VRAI_FAUX_5E,
  ORAL_LANGAGE_ANIMAL_5E,
  ORAL_PUBLICITE_5E,
  ORAL_CARTES_5E,
  ORAL_TELEPHONES_5E,
];
