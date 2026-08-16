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
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Combien de temps attendent-ils avant que le fil se tende ?",
      choices: ["deux heures", "quelques minutes", "toute la matinée", "deux jours"],
      expected: "deux heures",
      explanation:
        "« Pendant deux heures, rien. » L'information est donnée une seule fois, en trois mots, et le texte passe à autre chose. Un lecteur pressé la saute ; c'est pourtant elle qui dit combien l'attente a été longue.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Où se trouve la grand-mère quand Ludovic se lève ?",
      choices: [
        "dans la cour, la canne à pêche déjà posée contre le mur",
        "encore endormie dans sa chambre",
        "sur le sentier qui descend au lagon",
        "à la cuisine, en train de préparer le petit-déjeuner",
      ],
      expected: "dans la cour, la canne à pêche déjà posée contre le mur",
      explanation:
        "Tout est dans le mot « déjà » : elle attendait avant lui. Retrouver une information explicite, ce n'est pas seulement repérer un mot, c'est prendre la phrase entière — le lieu, l'objet, et ce petit adverbe qui dit qui s'est levé le premier.",
    },
    {
      notionId: "vocabulaire",
      microId: "cm2_voc_contexte",
      text: "« La mer était plate, à peine ridée. » Que veut dire « ridée » ici ?",
      choices: [
        "parcourue de toutes petites vagues",
        "couverte d'écume blanche",
        "vieille et abîmée",
        "d'une couleur sombre",
      ],
      expected: "parcourue de toutes petites vagues",
      explanation:
        "Le mot fait d'habitude penser à un visage. Ici, c'est « plate » juste avant et « à peine » qui commandent : si la mer est plate, ce qui la ride ne peut être que minuscule. Deviner un mot, c'est d'abord regarder ses voisins.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "« Ludovic a serré les dents. Ses bras tremblaient, mais il n'a pas lâché. » Que comprend-on ?",
      choices: [
        "Le poisson était difficile à remonter et Ludovic a lutté.",
        "Ludovic avait froid ce matin-là au bord du lagon.",
        "Ludovic avait peur de ce qu'il allait remonter.",
        "La canne à pêche était trop lourde pour ses bras.",
      ],
      expected: "Le poisson était difficile à remonter et Ludovic a lutté.",
      explanation:
        "Le texte ne dit jamais « c'était dur ». Il montre un corps : des dents serrées, des bras qui tremblent, une main qui tient. C'est au lecteur de traduire ces gestes en effort — et le « mais » dit que l'effort a été gagné.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "« Sa grand-mère n'a rien dit. Elle a seulement posé sa main sur son épaule. » Pourquoi ne dit-elle rien ?",
      choices: [
        "Parce que le geste dit mieux que les mots qu'elle est fière de lui.",
        "Parce qu'elle est déçue par la taille du poisson.",
        "Parce qu'elle est trop essoufflée pour parler.",
        "Parce qu'elle lui reproche d'avoir menti le matin.",
      ],
      expected:
        "Parce que le geste dit mieux que les mots qu'elle est fière de lui.",
      explanation:
        "Le mot « seulement » est un piège : il fait croire à peu de chose. Or ce geste arrive juste après la déception du petit poisson, et il précède un retour « ensemble ». Dans ce texte, ce sont les silences qui parlent.",
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
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Combien d'enfants cueillaient les mangues ?",
      choices: ["trois", "deux", "six", "toute la classe"],
      expected: "trois",
      explanation:
        "« À trois, en rentrant de l'école. » Le chiffre est donné sans insister, et il ne revient jamais. Attention au six du panier : il compte les mangues, pas les enfants. Une information explicite se trouve, mais encore faut-il ne pas la confondre avec sa voisine.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Que dit madame Lucie en ouvrant sa fenêtre, ce jeudi-là ?",
      choices: [
        "que les mangues seront meilleures le lendemain",
        "qu'elle va prévenir leurs parents",
        "qu'ils peuvent en prendre autant qu'ils veulent",
        "qu'elle ne veut plus les voir près du mur",
      ],
      expected: "que les mangues seront meilleures le lendemain",
      explanation:
        "Elle ne parle ni du vol, ni de punition : elle parle du fruit. C'est ce déplacement qui surprend, et tout le texte tient dedans. Le texte prend d'ailleurs soin de préciser « Elle n'a pas crié », pour qu'on mesure ce qu'elle ne fait pas.",
    },
    {
      notionId: "vocabulaire",
      microId: "cm2_voc_contexte",
      text: "« Ses branches ployaient si bas qu'on pouvait cueillir sans se hisser. » Que veut dire « ployaient » ?",
      choices: [
        "se courbaient sous le poids",
        "se cassaient net",
        "poussaient très vite",
        "perdaient leurs feuilles",
      ],
      expected: "se courbaient sous le poids",
      explanation:
        "La suite de la phrase donne la réponse : si l'on peut cueillir « sans se hisser », c'est que les branches sont descendues. Et elles descendent parce qu'elles portent des fruits. Le sens d'un mot inconnu est presque toujours dans ce qui l'entoure.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Le lendemain, le panier est là mais il n'y a « personne à la fenêtre ». Pourquoi madame Lucie ne se montre-t-elle pas ?",
      choices: [
        "Pour que les enfants prennent le panier sans avoir honte.",
        "Parce qu'elle est sortie faire ses courses ce matin-là.",
        "Parce qu'elle a oublié qu'elle avait posé le panier.",
        "Pour vérifier en cachette s'ils vont encore voler.",
      ],
      expected: "Pour que les enfants prennent le panier sans avoir honte.",
      explanation:
        "Le texte souligne l'absence au lieu de la passer sous silence : c'est le signe qu'elle est voulue. Se montrer, ce serait obliger les enfants à remercier — et transformer le cadeau en leçon. Elle donne, et elle s'efface.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "« Nous n'en avons plus jamais cueilli nous-mêmes. Chaque samedi, pourtant, le panier était là. » Qu'est-ce que ces deux phrases apprennent ?",
      choices: [
        "Le geste de madame Lucie est devenu une habitude entre eux.",
        "Les enfants ont eu peur et ont changé de chemin.",
        "Le manguier ne donnait plus de fruits après novembre.",
        "Madame Lucie a fini par vendre ses mangues au marché.",
      ],
      expected: "Le geste de madame Lucie est devenu une habitude entre eux.",
      explanation:
        "« Plus jamais » d'un côté, « chaque samedi » de l'autre : le vol s'arrête, le don continue. Le mot « pourtant » relie les deux et dit l'essentiel — ce n'était pas un cadeau d'un jour, c'est devenu un rendez-vous.",
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
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_croiser_infos",
      text: "D'après le tableau, combien d'heures un adolescent de 15 ans dort-il de plus, au minimum, qu'un adulte ?",
      choices: ["1 heure", "2 heures", "3 heures", "aucune"],
      expected: "1 heure",
      explanation:
        "Deux lignes à lire, puis une soustraction : 8 heures au minimum pour un 13-18 ans, 7 pour un adulte. Le piège est de comparer les maximums (10 et 9) ou de mélanger les deux bouts. Croiser deux informations, c'est d'abord choisir laquelle de chaque ligne on compare.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_composite",
      text: "À quoi sert le document 2 par rapport au document 1 ?",
      choices: [
        "Il chiffre ce que l'article explique avec des mots.",
        "Il contredit ce que dit l'article.",
        "Il raconte l'histoire d'un enfant qui dort mal.",
        "Il donne des conseils pour s'endormir plus vite.",
      ],
      expected: "Il chiffre ce que l'article explique avec des mots.",
      explanation:
        "L'article dit « les besoins changent avec l'âge » ; le tableau dit lesquels. Dans un document composite, les parties ne se répètent pas et ne se contredisent pas : elles se complètent, et c'est en passant de l'une à l'autre qu'on comprend.",
    },
    {
      notionId: "vocabulaire",
      microId: "cm2_voc_contexte",
      text: "« Un adulte se contente de sept à huit heures. » Que veut dire « se contente de » ici ?",
      choices: [
        "il lui suffit de",
        "il est heureux de",
        "il refuse de",
        "il a besoin de bien plus que",
      ],
      expected: "il lui suffit de",
      explanation:
        "L'expression est trompeuse : elle contient le mot « content », mais il n'est pas question de plaisir. La phrase compare un bébé qui dort presque tout le temps et un adulte qui dort peu — « se contenter de », ici, c'est n'avoir besoin de rien de plus.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "« L'enfant qui grandit a besoin de beaucoup plus de sommeil qu'on ne le croit. » Pourquoi l'article ajoute-t-il « qu'on ne le croit » ?",
      choices: [
        "Pour prévenir le lecteur qu'il se trompe sûrement.",
        "Pour dire que les scientifiques ne sont pas d'accord.",
        "Pour montrer que personne ne connaît la réponse.",
        "Pour indiquer que le tableau est approximatif.",
      ],
      expected: "Pour prévenir le lecteur qu'il se trompe sûrement.",
      explanation:
        "Ces quatre mots ne donnent aucune information nouvelle sur le sommeil : ils s'adressent à celui qui lit. L'article sait qu'on sous-estime ce besoin, et il le dit avant de donner les chiffres. Repérer ce genre de phrase, c'est comprendre à qui un texte parle.",
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
   SIX TEXTES DE PLUS, TROIS PAR NIVEAU (15/08/2026)
   ---------------------------------------------------------------------------
   ⛔ LE DÉFAUT ÉTAIT INVISIBLE. `simuler-epreuves-blanches.ts` annonçait
   10/10 passages complets : l'épreuve servait bien ses cinq questions
   d'écrit, sur un vrai texte, à chaque fois. Mais en comptant les ÉNONCÉS
   DISTINCTS, on trouvait **15 pour 50 posés** — trois textes seulement, et
   une question déjà vue dès le 2ᵉ ou le 3ᵉ passage. Un compteur de
   complétude ne dit rien de la répétition.
   📏 Mesuré avant : 15 énoncés distincts, 3 textes, répétition au passage 2
   en 4ᵉ et au passage 3 en 6ᵉ.

   ⭐ CE QU'ILS TESTENT, ET POURQUOI. Les résultats 2025 sont sans ambiguïté :
   ce qui manque n'est pas le prélèvement d'information — les élèves y sont
   proches du national — mais **l'implicite, l'inférence et la visée**. En 6ᵉ,
   « établir des inférences (réussite complète) » tombe à 13 %, « rendre
   compte du sens global » à 23 %. En 4ᵉ, « comprendre des informations
   implicites » à 13 %, « rendre compte de la visée de chaque document » à
   17 %, avec 30 % d'élèves « à besoins » contre 20 % au national.
   Ces six textes sont donc écrits POUR qu'on ne puisse pas y répondre en
   recopiant une phrase : ce qui est demandé n'est jamais écrit tel quel.
   ═══════════════════════════════════════════════════════════════════════ */

const LE_VELO_DE_MALO: SupportTexte = {
  id: "cm2_velo_de_malo",
  kicker: "Texte littéraire",
  titre: "Le vélo de Malo",
  source: "Texte original — EleveAI",
  texte: `Le vélo était appuyé contre le mur du garage depuis l'hiver. La chaîne avait rouillé, le pneu arrière était à plat, et Malo ne le regardait plus en passant.

Ce samedi-là, il partit tôt avec sa mère au marché de Saint-Louis. Ils rentrèrent vers midi, les bras chargés.

Le vélo n'était plus contre le mur. Il était au milieu de la cour, droit sur sa béquille. La chaîne brillait. Les deux pneus étaient gonflés.

Malo se tourna vers le garage. La porte était ouverte, et il aperçut, sur l'établi, un chiffon noir et une burette d'huile posée de travers.

Son père était assis sous la varangue, un journal ouvert devant lui. Il ne leva pas les yeux.

« Il fait beau », dit-il simplement.

Malo resta un moment sans bouger. Puis il attrapa le guidon, poussa le vélo jusqu'au portail, et se retourna une dernière fois.

Son père tournait une page. Mais le journal, remarqua Malo, était à l'envers.`,
  questions: [
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Qui a réparé le vélo ?",
      choices: [
        "le père de Malo",
        "Malo lui-même",
        "la mère de Malo",
        "un voisin",
      ],
      expected: "le père de Malo",
      explanation:
        "Le texte ne le dit jamais. Il donne des indices : le chiffon et l'huile dans le garage, le père seul à la maison, et son silence. Comprendre un texte, c'est aussi lire ce qu'il montre sans le dire.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Que nous apprend la dernière phrase, « le journal était à l'envers » ?",
      choices: [
        "le père ne lisait pas : il guettait la réaction de Malo",
        "le père a mal rangé son journal",
        "le père ne sait pas lire",
        "le journal était mal imprimé",
      ],
      expected: "le père ne lisait pas : il guettait la réaction de Malo",
      explanation:
        "Un détail placé en dernière phrase n'est jamais un hasard. Celui-ci dit toute l'émotion que le père n'a pas voulu montrer.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Pourquoi le père dit-il seulement « Il fait beau » ?",
      choices: [
        "parce qu'il ne veut pas parler de ce qu'il a fait",
        "parce qu'il n'a pas vu le vélo",
        "parce qu'il veut que Malo sorte",
        "parce qu'il parle de la météo du lendemain",
      ],
      expected: "parce qu'il ne veut pas parler de ce qu'il a fait",
      explanation:
        "Ce que dit un personnage compte moins que ce qu'il évite de dire. Le père détourne la conversation au lieu de réclamer un merci.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Combien de temps le vélo est-il resté sans servir ?",
      choices: [
        "depuis l'hiver",
        "depuis une semaine",
        "depuis samedi",
        "le texte ne le dit pas",
      ],
      expected: "depuis l'hiver",
      explanation:
        "L'information est donnée dès la première phrase. Toutes les questions ne demandent pas d'inférence : certaines vérifient qu'on a lu.",
    },
    {
      notionId: "lecture_oeuvres",
      microId: "cm2_oeuvre_theme",
      text: "Quel est le thème principal de ce texte ?",
      choices: [
        "une attention qu'on donne sans le dire",
        "la réparation d'un vélo",
        "une matinée au marché",
        "une dispute entre un père et son fils",
      ],
      expected: "une attention qu'on donne sans le dire",
      explanation:
        "Le vélo n'est que le prétexte. Ce que le texte raconte, c'est une manière d'aimer qui passe par les gestes plutôt que par les mots.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Où Malo et sa mère sont-ils allés ce samedi matin ?",
      choices: [
        "au marché de Saint-Louis",
        "chez un réparateur de vélos",
        "à la plage pour la matinée",
        "rendre visite à un voisin",
      ],
      expected: "au marché de Saint-Louis",
      explanation:
        "Une seule phrase le dit, et elle sert surtout à éloigner Malo de la maison. C'est souvent le rôle d'une information explicite dans un récit : elle n'est pas là pour elle-même, elle laisse au père le temps d'agir.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Dans quel état était le vélo au début du texte ?",
      choices: [
        "la chaîne rouillée et le pneu arrière à plat",
        "les deux pneus crevés et le guidon tordu",
        "la chaîne cassée et la béquille manquante",
        "en bon état, mais couvert de poussière",
      ],
      expected: "la chaîne rouillée et le pneu arrière à plat",
      explanation:
        "Deux défauts, précisément nommés — et c'est exactement ce qui aura changé au retour du marché : la chaîne brille, les deux pneus sont gonflés. Le texte décrit l'avant pour qu'on mesure l'après sans qu'il ait à l'expliquer.",
    },
    {
      notionId: "vocabulaire",
      microId: "cm2_voc_contexte",
      text: "« Il était au milieu de la cour, droit sur sa béquille. » Qu'est-ce qu'une béquille de vélo ?",
      choices: [
        "la petite tige qui le fait tenir debout à l'arrêt",
        "la barre qui relie les deux roues",
        "le support qui porte les bagages",
        "la canne sur laquelle s'appuie un blessé",
      ],
      expected: "la petite tige qui le fait tenir debout à l'arrêt",
      explanation:
        "Le mot a bien un autre sens — celui de la canne d'un blessé — et c'est le piège. Ici « droit sur sa » commande : ce qui tient un vélo debout tout seul. Un mot change de sens selon l'objet dont on parle.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "« Il ne leva pas les yeux. » Pourquoi le père évite-t-il de regarder Malo ?",
      choices: [
        "Pour qu'on ne devine pas que c'est lui qui a réparé le vélo.",
        "Parce que son article de journal le passionne.",
        "Parce qu'il en veut à Malo d'avoir laissé le vélo à l'abandon.",
        "Parce qu'il n'a pas entendu Malo rentrer.",
      ],
      expected:
        "Pour qu'on ne devine pas que c'est lui qui a réparé le vélo.",
      explanation:
        "La dernière phrase du texte tranche : le journal était à l'envers, donc il ne lisait pas. Ses yeux baissés ne sont pas de l'indifférence, ce sont des yeux qui se cachent. Deux détails éloignés, une seule explication.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Malo « resta un moment sans bouger », puis il « se retourna une dernière fois ». Que traduisent ces deux gestes ?",
      choices: [
        "Il a compris ce que son père a fait, et il cherche à le lui montrer.",
        "Il hésite à sortir parce qu'il ne fait pas si beau.",
        "Il a peur que son père lui interdise de partir.",
        "Il ne reconnaît pas son vélo et se demande à qui il est.",
      ],
      expected:
        "Il a compris ce que son père a fait, et il cherche à le lui montrer.",
      explanation:
        "Aucun des deux ne parle de la réparation, et pourtant tous deux savent. L'immobilité dit la surprise, le regard en arrière dit le merci. C'est un texte où le sens passe entièrement par les corps.",
    },
  ],
};

const LA_LETTRE_DE_TANTINE: SupportTexte = {
  id: "cm2_lettre_de_tantine",
  kicker: "Texte littéraire",
  titre: "La lettre de Tantine Rosa",
  source: "Texte original — EleveAI",
  texte: `Chaque année, pour son anniversaire, Élise recevait une lettre de Tantine Rosa. Toujours la même enveloppe bleue, toujours la même écriture penchée.

Cette année, l'enveloppe est arrivée avec trois jours d'avance.

Élise l'a ouverte dans sa chambre. La lettre était plus courte que d'habitude. Tantine racontait le jardin, les letchis qui avaient bien donné, la pluie de la semaine passée. Rien d'autre.

À la fin, au lieu de « à très bientôt », il y avait écrit : « Prends soin de toi, ma grande. »

Élise a relu cette ligne plusieurs fois. Puis elle est descendue à la cuisine. Sa mère parlait au téléphone, dos tourné, la voix basse. Elle a raccroché en voyant Élise.

« C'était Tantine ? » a demandé Élise.

Sa mère a mis un peu trop de temps à répondre.

« Tu as fini tes devoirs ? »`,
  questions: [
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Qu'est-ce qui laisse penser que quelque chose ne va pas ?",
      choices: [
        "la lettre est arrivée en avance, elle est plus courte, et la formule de fin a changé",
        "Tantine parle du jardin et des letchis",
        "Élise a lu la lettre dans sa chambre",
        "la mère demande si les devoirs sont finis",
      ],
      expected:
        "la lettre est arrivée en avance, elle est plus courte, et la formule de fin a changé",
      explanation:
        "Aucun de ces détails ne dit quoi que ce soit tout seul. C'est leur accumulation, et le fait qu'ils rompent tous une habitude, qui alerte le lecteur.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Pourquoi la mère met-elle « un peu trop de temps à répondre » ?",
      choices: [
        "parce qu'elle cherche quoi dire à Élise",
        "parce qu'elle n'a pas entendu la question",
        "parce qu'elle est fâchée",
        "parce qu'elle pense aux devoirs",
      ],
      expected: "parce qu'elle cherche quoi dire à Élise",
      explanation:
        "L'hésitation est le seul indice donné, et le narrateur la souligne — « un peu trop ». Ce silence en dit plus que la réponse qui suit.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Que fait la mère au lieu de répondre à la question d'Élise ?",
      choices: [
        "elle pose une autre question",
        "elle raccroche le téléphone",
        "elle sort de la cuisine",
        "elle lit la lettre",
      ],
      expected: "elle pose une autre question",
      explanation:
        "Répondre à une question par une autre est une manière d'éviter. Le texte s'arrête là, et c'est au lecteur de comprendre pourquoi.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Qu'est-ce qui, dans la lettre, était toujours pareil les autres années ?",
      choices: [
        "l'enveloppe bleue et l'écriture penchée",
        "la longueur de la lettre",
        "la date d'arrivée",
        "la formule de fin",
      ],
      expected: "l'enveloppe bleue et l'écriture penchée",
      explanation:
        "Le texte pose les habitudes au début précisément pour qu'on remarque, ensuite, tout ce qui change.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_genres",
      text: "Comment se termine ce texte ?",
      choices: [
        "sur une question qui laisse le lecteur dans le doute",
        "sur une explication complète",
        "sur une dispute",
        "sur le départ d'Élise",
      ],
      expected: "sur une question qui laisse le lecteur dans le doute",
      explanation:
        "Certains récits ne concluent pas : ils s'arrêtent au moment où le lecteur a compris, et le laissent avec ce qu'il a compris.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Avec combien de jours d'avance l'enveloppe est-elle arrivée cette année ?",
      choices: ["trois jours", "une semaine", "un jour", "elle est arrivée en retard"],
      expected: "trois jours",
      explanation:
        "Une phrase de dix mots, seule sur sa ligne. Le texte l'isole exprès : c'est la première habitude qui se brise, et le lecteur doit la retenir pour comprendre la suite.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "De quoi Tantine Rosa parle-t-elle dans sa lettre ?",
      choices: [
        "du jardin, des letchis et de la pluie",
        "de sa santé et de ses examens",
        "de l'anniversaire d'Élise et de son cadeau",
        "de son prochain voyage chez Élise",
      ],
      expected: "du jardin, des letchis et de la pluie",
      explanation:
        "Trois sujets, tous sans importance — et le texte ajoute « Rien d'autre ». C'est justement ce vide qui compte : elle écrit pour écrire, pas pour dire. Une information explicite peut servir à montrer ce qui manque.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Pourquoi Élise relit-elle « Prends soin de toi, ma grande » plusieurs fois ?",
      choices: [
        "Parce que cette formule ne ressemble pas aux autres années et l'inquiète.",
        "Parce qu'elle ne comprend pas l'écriture penchée de Tantine.",
        "Parce qu'elle est heureuse d'être appelée « ma grande ».",
        "Parce qu'elle cherche l'adresse de Tantine Rosa.",
      ],
      expected:
        "Parce que cette formule ne ressemble pas aux autres années et l'inquiète.",
      explanation:
        "Le texte a pris soin de dire ce qu'il y avait d'habitude : « à très bientôt ». Une promesse de revoir remplacée par un conseil de prudence — Élise le sent avant de pouvoir le formuler, et c'est pour ça qu'elle relit.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Que fait la mère au moment précis où Élise entre dans la cuisine ?",
      choices: [
        "Elle raccroche le téléphone alors qu'elle parlait à voix basse.",
        "Elle range la lettre de Tantine dans un tiroir.",
        "Elle prépare le repas sans se retourner.",
        "Elle compose le numéro de Tantine Rosa.",
      ],
      expected:
        "Elle raccroche le téléphone alors qu'elle parlait à voix basse.",
      explanation:
        "Trois détails collés : le dos tourné, la voix basse, et le fait de raccrocher « en voyant Élise ». Chacun peut s'expliquer seul ; ensemble, ils disent une conversation qu'on ne voulait pas faire entendre.",
    },
    {
      notionId: "lecture_oeuvres",
      microId: "cm2_oeuvre_theme",
      text: "De quoi ce texte parle-t-il vraiment ?",
      choices: [
        "d'une mauvaise nouvelle que les adultes n'arrivent pas à annoncer",
        "d'une lettre d'anniversaire égarée par la poste",
        "d'une dispute entre Élise et sa mère",
        "de la vie quotidienne dans le jardin de Tantine",
      ],
      expected:
        "d'une mauvaise nouvelle que les adultes n'arrivent pas à annoncer",
      explanation:
        "Le mot « malade » n'apparaît jamais, et aucun personnage n'explique rien. Le texte est construit entièrement sur des choses tues : une lettre trop courte, un téléphone raccroché, une question esquivée. C'est ce silence-là, son sujet.",
    },
  ],
};

const DOCUMENT_MANGROVE_CM2: SupportTexte = {
  id: "cm2_document_mangrove",
  kicker: "Document composite",
  titre: "À quoi sert une mangrove ?",
  source: "Document original — EleveAI",
  texte: `TITRE DU DOCUMENT : La mangrove, une forêt qui a les pieds dans l'eau

CHAPEAU : On la prend souvent pour un marécage sans intérêt. C'est en réalité l'un des milieux les plus utiles du littoral tropical.

PARAGRAPHE 1 — Des arbres sur pilotis
Les palétuviers poussent dans l'eau salée. Leurs racines sortent de la vase comme des échasses. Cet enchevêtrement retient la terre et empêche la côte de s'effriter.

PARAGRAPHE 2 — Un rempart contre la mer
Quand une forte houle arrive, elle traverse d'abord la mangrove. Les racines cassent la force des vagues. Derrière, les habitations reçoivent une eau beaucoup moins puissante.

PARAGRAPHE 3 — Une nurserie
Les jeunes poissons s'y cachent des prédateurs, qui ne peuvent pas circuler entre les racines. Beaucoup d'espèces pêchées au large ont commencé leur vie dans une mangrove.

ENCADRÉ — Un chiffre : environ un tiers des mangroves du monde ont disparu en quarante ans, remplacées par des cultures, des ports et des hôtels.

LÉGENDE DU SCHÉMA : coupe d'une mangrove — de gauche à droite : la mer, les racines en échasses, la vase, puis le village.`,
  questions: [
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_composite",
      text: "Quels éléments composent ce document ?",
      choices: [
        "un titre, un chapeau, trois paragraphes, un encadré et un schéma légendé",
        "un titre et un seul long paragraphe",
        "une interview et une photographie",
        "un poème et sa traduction",
      ],
      expected:
        "un titre, un chapeau, trois paragraphes, un encadré et un schéma légendé",
      explanation:
        "Savoir nommer les parties d'un document, c'est déjà savoir où chercher une information : le chapeau résume, l'encadré isole un chiffre, la légende explique l'image.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_croiser_infos",
      text: "D'après le schéma et le paragraphe 2, pourquoi le village est-il protégé ?",
      choices: [
        "parce que les racines se trouvent entre la mer et lui, et cassent la force des vagues",
        "parce que le village est construit en hauteur",
        "parce que la vase absorbe l'eau",
        "parce que les poissons éloignent la houle",
      ],
      expected:
        "parce que les racines se trouvent entre la mer et lui, et cassent la force des vagues",
      explanation:
        "Ni le texte ni le schéma ne suffisent seuls : c'est l'ordre donné par la légende, mer puis racines puis village, qui rend le paragraphe 2 concret.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "L'encadré donne un chiffre. Que cherche-t-il à faire comprendre ?",
      choices: [
        "que cette protection est en train de disparaître",
        "que les mangroves sont trop nombreuses",
        "que les hôtels sont bien construits",
        "que les mangroves poussent vite",
      ],
      expected: "que cette protection est en train de disparaître",
      explanation:
        "L'encadré ne le dit pas. Mais placé après trois paragraphes qui expliquent l'utilité de la mangrove, le chiffre prend le sens d'un avertissement.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_essentiel",
      text: "Pourquoi les jeunes poissons sont-ils en sécurité dans la mangrove ?",
      choices: [
        "parce que les prédateurs ne peuvent pas circuler entre les racines",
        "parce que l'eau y est plus froide",
        "parce qu'il y a beaucoup de nourriture",
        "parce que les pêcheurs n'y vont pas",
      ],
      expected:
        "parce que les prédateurs ne peuvent pas circuler entre les racines",
      explanation:
        "La raison est donnée dans le paragraphe 3, juste après l'affirmation. Un document explicatif justifie presque toujours ce qu'il avance.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_autonomie",
      text: "Quelle est l'intention de ce document ?",
      choices: [
        "montrer qu'un milieu qu'on croit inutile rend en réalité de grands services",
        "apprendre à reconnaître les espèces de poissons",
        "raconter l'histoire d'un village du littoral",
        "expliquer comment planter un palétuvier",
      ],
      expected:
        "montrer qu'un milieu qu'on croit inutile rend en réalité de grands services",
      explanation:
        "Le chapeau annonce déjà cette intention — « on la prend souvent pour un marécage sans intérêt » — et tout le reste du document la démontre.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_croiser_infos",
      text: "D'après la légende du schéma, qu'y a-t-il entre les racines en échasses et le village ?",
      choices: ["la vase", "la mer", "un mur de pierres", "une route"],
      expected: "la vase",
      explanation:
        "La légende donne un ordre, et il faut le suivre dans le bon sens : mer, racines, vase, village. La mer est bien citée, mais de l'autre côté des racines. Lire un schéma, c'est lire une position autant qu'un mot.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_doc_composite",
      text: "Dans quelle partie du document trouve-t-on ce que les mangroves sont devenues ?",
      choices: [
        "dans l'encadré",
        "dans le chapeau",
        "dans le paragraphe 1",
        "dans la légende du schéma",
      ],
      expected: "dans l'encadré",
      explanation:
        "Chaque partie a son emploi : le chapeau introduit, les paragraphes expliquent, la légende situe. L'encadré, lui, sort un chiffre du texte pour le rendre impossible à manquer. Savoir cela, c'est trouver une information sans tout relire.",
    },
    {
      notionId: "vocabulaire",
      microId: "cm2_voc_contexte",
      text: "« Cet enchevêtrement retient la terre. » Que désigne « enchevêtrement » ?",
      choices: [
        "les racines emmêlées les unes dans les autres",
        "la couche de vase déposée par la mer",
        "le va-et-vient des vagues",
        "le feuillage épais des palétuviers",
      ],
      expected: "les racines emmêlées les unes dans les autres",
      explanation:
        "Le mot est long et peu familier, mais la phrase d'avant vient de décrire des racines « comme des échasses », et « cet » renvoie forcément à elles. Un déterminant démonstratif est une flèche : il pointe ce dont on vient de parler.",
    },
    {
      notionId: "comprehension_textes_documents",
      microId: "cm2_comp_implicite",
      text: "Le paragraphe 3 s'intitule « Une nurserie ». Pourquoi ce titre ?",
      choices: [
        "Parce que la mangrove est l'endroit où les poissons grandissent avant de partir au large.",
        "Parce que les palétuviers y sont plantés tout jeunes.",
        "Parce que des enfants y sont gardés pendant que les parents pêchent.",
        "Parce que c'est le paragraphe le plus court du document.",
      ],
      expected:
        "Parce que la mangrove est l'endroit où les poissons grandissent avant de partir au large.",
      explanation:
        "Le mot est emprunté au monde des bébés, et c'est une image : le paragraphe explique que « beaucoup d'espèces pêchées au large ont commencé leur vie » là. Un intertitre résume son paragraphe — le comprendre, c'est déjà comprendre le paragraphe.",
    },
  ],
};

const LE_CONCOURS_5E: SupportTexte = {
  id: "5e_le_concours",
  kicker: "Texte littéraire",
  titre: "Le concours",
  source: "Texte original — EleveAI",
  texte: `Ils étaient onze à attendre les résultats, adossés au mur du gymnase. Nolan relisait ses mains.

Quand madame Ferrand est sortie avec la feuille, personne n'a bougé. Elle a lu les trois premiers noms. Nolan n'y était pas.

Autour de lui, deux garçons se sont serrés dans les bras. Un autre a shooté dans un gravier. Nolan, lui, a hoché la tête lentement, comme s'il approuvait quelque chose, et il a souri.

« Tu le prends bien », a dit Sarah.

« C'est un concours », a répondu Nolan.

Il a ramassé son sac, l'a mis sur une épaule, et il est parti vers le portail sans attendre les autres. Il marchait vite. Trop vite pour quelqu'un qui n'a nulle part où aller.

Le lendemain matin, il était au gymnase à sept heures. Seul. La liste des résultats était encore affichée sur la porte. Il ne l'a pas regardée.

Il est entré, et il a recommencé à s'entraîner.`,
  questions: [
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "Que ressent réellement Nolan à l'annonce des résultats ?",
      choices: [
        "de la déception, qu'il s'efforce de cacher",
        "de l'indifférence : le concours lui importait peu",
        "de la joie pour ses camarades",
        "de la colère contre madame Ferrand",
      ],
      expected: "de la déception, qu'il s'efforce de cacher",
      explanation:
        "Le sourire et le hochement de tête disent le contraire de ce que fait le corps : il part sans attendre personne et marche trop vite. Ce sont les gestes qui trahissent, pas les mots.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "Quelle phrase du texte contredit le plus nettement le calme apparent de Nolan ?",
      choices: [
        "« Trop vite pour quelqu'un qui n'a nulle part où aller. »",
        "« C'est un concours », a répondu Nolan.",
        "« Il a ramassé son sac. »",
        "« Ils étaient onze à attendre. »",
      ],
      expected: "« Trop vite pour quelqu'un qui n'a nulle part où aller. »",
      explanation:
        "C'est la seule phrase où le narrateur commente au lieu de décrire. Ce commentaire est un signal : il invite le lecteur à ne pas croire l'apparence.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "Pourquoi Nolan ne regarde-t-il pas la liste, le lendemain ?",
      choices: [
        "parce qu'il a décidé de regarder devant plutôt que derrière",
        "parce qu'il ne sait pas encore les résultats",
        "parce qu'il fait trop sombre",
        "parce que la liste a été retirée",
      ],
      expected: "parce qu'il a décidé de regarder devant plutôt que derrière",
      explanation:
        "Le texte insiste : la liste est « encore affichée », et il « ne l'a pas regardée ». Ce refus est un choix, et il annonce la dernière phrase.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_sens_global",
      text: "Que raconte ce texte, au fond ?",
      choices: [
        "la façon dont on encaisse un échec sans le montrer, et ce qu'on en fait",
        "l'organisation d'un concours sportif",
        "une amitié entre Nolan et Sarah",
        "l'injustice d'un classement",
      ],
      expected:
        "la façon dont on encaisse un échec sans le montrer, et ce qu'on en fait",
      explanation:
        "Le concours n'est qu'un cadre. Le texte s'intéresse à ce que Nolan fait de sa déception — et la dernière phrase donne la réponse.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_apprecier",
      text: "Quel effet produit la dernière phrase, « il a recommencé à s'entraîner » ?",
      choices: [
        "elle donne au personnage une force que rien n'avait annoncée ouvertement",
        "elle montre que Nolan n'a pas compris les résultats",
        "elle suggère qu'il abandonnera bientôt",
        "elle referme l'histoire sur un échec",
      ],
      expected:
        "elle donne au personnage une force que rien n'avait annoncée ouvertement",
      explanation:
        "Une chute brève après un récit retenu frappe d'autant plus fort. Le texte n'explique rien : il montre, et laisse le lecteur juger.",
    },
  ],
};

const LE_GARDIEN_DU_PHARE_5E: SupportTexte = {
  id: "5e_gardien_du_phare",
  kicker: "Texte littéraire",
  titre: "Le gardien",
  source: "Texte original — EleveAI",
  texte: `On disait dans le village que le vieux Firmin n'avait jamais quitté la pointe. Quarante ans à monter les cent trente marches, deux fois par nuit.

Le phare a été automatisé un mardi de novembre. Un technicien est venu, a posé une armoire grise au pied de l'escalier, et il est reparti avant midi.

Firmin a continué de monter. Personne ne le lui avait demandé. Il vérifiait la lentille, essuyait le verre, redescendait. La lumière tournait très bien sans lui.

L'hiver, on le voyait moins. Au printemps, plus du tout.

Un matin de juin, des marcheurs ont trouvé la porte du phare ouverte et l'escalier balayé de frais. En haut, le verre de la lentille était propre. Il n'y avait personne.

Depuis, les gens du village disent que le phare est bien entretenu. Ils ne disent pas par qui.`,
  questions: [
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "Pourquoi Firmin continue-t-il de monter après l'automatisation ?",
      choices: [
        "parce que ce travail est ce qui donne sens à ses journées",
        "parce que la machine ne fonctionne pas bien",
        "parce qu'on le lui a demandé",
        "parce qu'il est payé pour cela",
      ],
      expected: "parce que ce travail est ce qui donne sens à ses journées",
      explanation:
        "Le texte écarte lui-même les autres explications : « Personne ne le lui avait demandé », « La lumière tournait très bien sans lui ». Ce qui reste est l'attachement.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_sens_global",
      text: "Quelle atmosphère se dégage de ce texte ?",
      choices: [
        "une mélancolie retenue, sans plainte",
        "une tension inquiétante",
        "une gaieté légère",
        "une colère contre le progrès",
      ],
      expected: "une mélancolie retenue, sans plainte",
      explanation:
        "Rien n'est dit de la tristesse de Firmin. Elle passe par des faits brefs et par ce que le texte tait : c'est cette retenue qui crée l'atmosphère.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "Quels indices suggèrent que quelqu'un entretient encore le phare ?",
      choices: [
        "la porte ouverte, l'escalier balayé de frais, le verre propre",
        "l'armoire grise au pied de l'escalier",
        "les cent trente marches",
        "la venue du technicien",
      ],
      expected: "la porte ouverte, l'escalier balayé de frais, le verre propre",
      explanation:
        "Trois traces, aucune explication. Le texte donne des preuves d'une présence sans jamais nommer celui qui les laisse.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "Que veut dire la dernière phrase : « Ils ne disent pas par qui » ?",
      choices: [
        "les villageois préfèrent ne pas trancher sur ce qu'ils croient",
        "les villageois ignorent tout du phare",
        "personne n'entretient le phare",
        "le technicien revient chaque semaine",
      ],
      expected: "les villageois préfèrent ne pas trancher sur ce qu'ils croient",
      explanation:
        "La phrase joue sur ce qui n'est pas dit. Elle laisse ouvertes deux lectures — le souvenir de Firmin, ou quelqu'un qui a pris sa suite — et refuse de choisir.",
    },
    {
      notionId: "culture_litteraire",
      microId: "5e_culture_genres",
      text: "À quel genre ce texte se rattache-t-il le plus nettement ?",
      choices: [
        "un récit bref, proche de la nouvelle, à chute suggérée",
        "un article de presse",
        "une notice technique",
        "un poème en prose",
      ],
      expected: "un récit bref, proche de la nouvelle, à chute suggérée",
      explanation:
        "Peu de personnages, un temps resserré, et une fin qui suggère au lieu d'expliquer : ce sont les marques de la nouvelle.",
    },
  ],
};

const DOCUMENTS_LUMIERE_5E: SupportTexte = {
  id: "5e_documents_lumiere",
  kicker: "Groupement de documents",
  titre: "Faut-il éteindre la lumière la nuit ?",
  source: "Documents originaux — EleveAI",
  texte: `DOCUMENT 1 — Article d'information

Depuis quinze ans, plusieurs communes éteignent leur éclairage public entre minuit et cinq heures. Les économies d'électricité constatées vont de 30 à 50 %. Les études menées sur ces communes n'ont pas relevé de hausse des cambriolages ni des accidents. Les insectes nocturnes, eux, retrouvent leurs déplacements habituels : une lampe allumée en attire des milliers, qui meurent d'épuisement autour d'elle.

DOCUMENT 2 — Tribune signée par un commerçant

« On nous parle d'économies. Mais qui pense à ceux qui rentrent tard ? Ma boulangerie ouvre à quatre heures. Mes employées traversent un bourg noir. On me répond que les chiffres sont rassurants — les chiffres ne marchent pas seuls dans la rue. Je ne demande pas qu'on rallume partout. Je demande qu'on éclaire les trajets qui servent encore à cette heure-là. »

DOCUMENT 3 — Encadré chiffré

Éclairage public : environ 40 % de la facture d'électricité d'une commune.
Communes françaises pratiquant l'extinction totale ou partielle : plus de 12 000.`,
  questions: [
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_sens_global",
      text: "Quelle est la visée du document 1 ?",
      choices: [
        "informer en présentant des faits mesurés",
        "convaincre d'éteindre partout",
        "raconter l'histoire de l'éclairage public",
        "défendre les commerçants",
      ],
      expected: "informer en présentant des faits mesurés",
      explanation:
        "Le document 1 aligne des constats sans prendre parti. C'est la marque du texte informatif : il rapporte, il ne réclame rien.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_implicite",
      text: "Quelle est la visée du document 2, et en quoi diffère-t-elle de la première ?",
      choices: [
        "convaincre : il défend un point de vue à partir d'une expérience personnelle",
        "informer : il donne les mêmes chiffres autrement",
        "raconter une histoire vécue, sans intention",
        "expliquer le fonctionnement de l'éclairage",
      ],
      expected:
        "convaincre : il défend un point de vue à partir d'une expérience personnelle",
      explanation:
        "Une tribune est signée et engagée. Reconnaître la visée d'un document, c'est d'abord regarder qui parle et ce qu'il demande.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "Que reproche le commerçant aux chiffres du document 1 ?",
      choices: [
        "qu'ils ne rendent pas compte du sentiment de ceux qui marchent la nuit",
        "qu'ils sont faux",
        "qu'ils sont trop anciens",
        "qu'ils ont été calculés par les communes",
      ],
      expected:
        "qu'ils ne rendent pas compte du sentiment de ceux qui marchent la nuit",
      explanation:
        "Il ne conteste pas les chiffres : « les chiffres ne marchent pas seuls dans la rue ». Son objection porte sur ce qu'ils ne mesurent pas.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_apprecier",
      text: "En croisant les trois documents, que peut-on dire de la demande du commerçant ?",
      choices: [
        "elle est modérée : il réclame un éclairage ciblé, pas un retour en arrière",
        "elle contredit tous les chiffres donnés",
        "elle demande de rallumer toute la nuit",
        "elle rejoint exactement la position du document 1",
      ],
      expected:
        "elle est modérée : il réclame un éclairage ciblé, pas un retour en arrière",
      explanation:
        "Il le précise lui-même : « Je ne demande pas qu'on rallume partout. » Lire un débat, c'est mesurer l'écart réel entre les positions, pas le supposer maximal.",
    },
    {
      notionId: "lecture_comprehension",
      microId: "5e_comp_indices",
      text: "Quelle information n'est donnée QUE par le document 3 ?",
      choices: [
        "la part de l'éclairage dans la facture d'une commune",
        "les économies constatées",
        "l'effet sur les insectes",
        "les horaires de la boulangerie",
      ],
      expected: "la part de l'éclairage dans la facture d'une commune",
      explanation:
        "Dans un groupement, chaque document apporte quelque chose que les autres n'ont pas. Repérer ce qui est unique évite de tout confondre.",
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

/* ═══════════════════════════════════════════════════════════════════════════
   DIX ENREGISTREMENTS DE PLUS, CINQ PAR NIVEAU (15/08/2026, seconde salve)
   ---------------------------------------------------------------------------
   La première salve avait porté chaque niveau de 2 à 5 enregistrements, donc
   de 2 à 5 passages complets sur 10. Celle-ci finit le travail : cinq de plus
   par niveau, et l'épreuve de français sert enfin **dix passages entiers**,
   comme les mathématiques.
   ⚠️ C'est le dernier point où le vivier commandait la complétude. Au-delà,
   ajouter un enregistrement n'ajoute plus de passage : il ajoute de la
   variété, ce qui est une autre question.
   ═════════════════════════════════════════════════════════════════════════ */

const ORAL_REQUINS_CM2: SupportTexte = {
  id: "cm2_oral_requins",
  kicker: "Compréhension de l'oral",
  titre: "Les requins méritent-ils leur réputation ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `La question vient d'Éliot, dix ans : est-ce que les requins attaquent vraiment les humains ?

Commençons par un chiffre. Dans le monde, on compte en moyenne une dizaine de morts par an à cause des requins. C'est dix de trop, et pour les familles concernées, aucun chiffre ne console. Mais gardons-le en tête pour la suite.

Car les moustiques, eux, tuent plusieurs centaines de milliers de personnes chaque année, en transmettant des maladies. Personne n'a peur d'un moustique.

Pourquoi cette différence ? Parce que notre peur ne se règle pas sur les chiffres. Elle se règle sur les images. Un requin est grand, silencieux, il vient d'un monde où nous ne voyons rien. Un moustique, on le connaît depuis toujours.

Cela ne veut pas dire qu'il faut se baigner n'importe où. Cela veut dire que la prudence et la peur sont deux choses différentes. La prudence regarde les faits. La peur, elle, regarde les images.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Combien de morts par an les requins causent-ils dans le monde, d'après l'émission ?",
      choices: [
        "une dizaine",
        "une centaine",
        "un millier",
        "plusieurs milliers",
      ],
      expected: "une dizaine",
      explanation:
        "Le chiffre est donné au tout début, et l'émission demande explicitement de le garder en tête : c'est le signe qu'il servira plus loin.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quel animal l'émission compare-t-elle au requin ?",
      choices: ["le moustique", "le serpent", "l'abeille", "le chien"],
      expected: "le moustique",
      explanation:
        "La comparaison n'est pas un détail : c'est elle qui porte tout le raisonnement de l'émission.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Pourquoi avons-nous plus peur du requin que du moustique ?",
      choices: [
        "parce que notre peur se règle sur les images, pas sur les chiffres",
        "parce que le requin est plus dangereux",
        "parce qu'on voit plus souvent des requins",
        "parce que les moustiques sont plus petits",
      ],
      expected:
        "parce que notre peur se règle sur les images, pas sur les chiffres",
      explanation:
        "L'émission pose la question « Pourquoi cette différence ? » et répond aussitôt. C'est la structure la plus fréquente à l'oral.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Comment résumerais-tu ce que dit l'émission ?",
      choices: [
        "Le requin fait peur plus qu'il n'est dangereux, mais la prudence reste nécessaire.",
        "Les requins ne sont pas dangereux du tout.",
        "Les moustiques sont plus méchants que les requins.",
        "Il ne faut plus se baigner dans la mer.",
      ],
      expected:
        "Le requin fait peur plus qu'il n'est dangereux, mais la prudence reste nécessaire.",
      explanation:
        "L'émission prend soin de ne pas nier le danger : « Cela ne veut pas dire qu'il faut se baigner n'importe où. » Un résumé qui l'oublie trahit le texte.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Quelle différence l'émission fait-elle entre la prudence et la peur ?",
      choices: [
        "la prudence regarde les faits, la peur regarde les images",
        "la prudence est pour les adultes, la peur pour les enfants",
        "la prudence est inutile, la peur protège",
        "il n'y a aucune différence",
      ],
      expected: "la prudence regarde les faits, la peur regarde les images",
      explanation:
        "C'est la dernière phrase, et c'est la conclusion de tout le raisonnement. À l'oral, la fin porte souvent l'idée à retenir.",
    },
  ],
};

const ORAL_FOURMIS_CM2: SupportTexte = {
  id: "cm2_oral_fourmis",
  kicker: "Compréhension de l'oral",
  titre: "Comment les fourmis retrouvent-elles leur chemin ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Aujourd'hui, une question de Lina, neuf ans : comment fait une fourmi pour rentrer chez elle ?

On imagine souvent qu'elle suit son odorat, et c'est en partie vrai. Une fourmi qui trouve de la nourriture dépose une trace odorante tout au long du retour. Les autres suivent cette trace. Plus elles sont nombreuses à passer, plus l'odeur se renforce.

Mais il y a plus étonnant. Dans le désert, certaines fourmis vivent sur un sol trop chaud pour garder la moindre odeur. Elles ne peuvent donc suivre aucune piste. Et pourtant elles rentrent, en ligne droite.

Des chercheurs ont voulu comprendre. Ils ont collé de minuscules échasses sous les pattes de quelques fourmis. Résultat : ces fourmis-là ont dépassé leur nid, et se sont arrêtées trop loin.

L'explication tient en peu de mots. La fourmi compte ses pas. Avec des pattes plus longues, chaque pas devient plus grand, et le compte tombe faux.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Que dépose une fourmi qui a trouvé de la nourriture ?",
      choices: [
        "une trace odorante",
        "un morceau de nourriture",
        "un grain de sable",
        "un fil très fin",
      ],
      expected: "une trace odorante",
      explanation:
        "L'information vient au début, dans la partie que l'émission présente comme déjà connue.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quel problème posent les fourmis du désert ?",
      choices: [
        "le sol est trop chaud pour garder une odeur",
        "elles n'ont pas d'odorat",
        "elles ne sortent que la nuit",
        "elles ne rentrent jamais au nid",
      ],
      expected: "le sol est trop chaud pour garder une odeur",
      explanation:
        "L'émission annonce « il y a plus étonnant » : cette formule prévient qu'on va sortir de ce qu'on croyait savoir.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Qu'ont fait les chercheurs pour comprendre ?",
      choices: [
        "ils ont collé des échasses sous les pattes de fourmis",
        "ils ont déplacé le nid",
        "ils ont mesuré la température du sol",
        "ils ont supprimé les odeurs",
      ],
      expected: "ils ont collé des échasses sous les pattes de fourmis",
      explanation:
        "L'expérience est racontée en une phrase. Repérer QUI fait QUOI aide à retenir un protocole entendu une seule fois.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Les fourmis à échasses se sont arrêtées trop loin. Qu'est-ce que cela prouve ?",
      choices: [
        "que la fourmi compte ses pas",
        "que les échasses les ont blessées",
        "qu'elles avaient perdu l'odeur",
        "qu'elles cherchaient un autre nid",
      ],
      expected: "que la fourmi compte ses pas",
      explanation:
        "Le résultat n'a de sens qu'avec l'explication qui suit : des pas plus grands, donc un compte faux. Un résultat d'expérience se relie toujours à ce qu'il démontre.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      // ⚠️ Énoncé rendu SPÉCIFIQUE : « Quelle est l'idée principale de cette
      // émission ? » existe déjà mot pour mot dans l'enregistrement sur
      // l'ennui, et le tirage déduplique sur le TEXTE — deux questions
      // identiques n'en font qu'une, et l'épreuve perd une ligne.
      text: "Que faut-il retenir de la façon dont les fourmis s'orientent ?",
      choices: [
        "Les fourmis s'orientent par l'odeur, mais aussi en comptant leurs pas.",
        "Les fourmis se perdent facilement.",
        "Les fourmis du désert n'ont pas d'odorat.",
        "Les chercheurs ont abîmé les fourmis.",
      ],
      expected:
        "Les fourmis s'orientent par l'odeur, mais aussi en comptant leurs pas.",
      explanation:
        "L'émission ne remplace pas une explication par l'autre : elle en ajoute une seconde. Le résumé doit garder les deux.",
    },
  ],
};

const ORAL_OUBLI_CM2: SupportTexte = {
  id: "cm2_oral_oubli",
  kicker: "Compréhension de l'oral",
  titre: "Pourquoi oublie-t-on ce qu'on a appris ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Voici une question que beaucoup se posent, et elle vient d'Anaïs, en CM2 : pourquoi ai-je tout oublié le lendemain d'un contrôle ?

Rassure-toi tout de suite : c'est normal, et ce n'est pas un défaut de mémoire. Un chercheur a mesuré cela il y a plus de cent ans. Sans rien faire de particulier, on oublie environ la moitié de ce qu'on vient d'apprendre en un jour.

Pourquoi le cerveau fait-il ça ? Parce qu'il trie. S'il gardait tout, il garderait aussi la couleur de la voiture croisée ce matin. Il conserve donc ce qui revient, et efface ce qui ne revient pas.

D'où le seul remède qui fonctionne vraiment, et il n'est pas celui qu'on croit. Relire dix fois de suite le soir sert peu. Revoir la même chose trois fois, à trois jours d'écart, sert beaucoup. Le cerveau ne compte pas le temps passé : il compte les retours.

Autrement dit, ce n'est pas ta mémoire qu'il faut changer. C'est le moment où tu ouvres ton cahier.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quelle proportion de ce qu'on apprend oublie-t-on en un jour ?",
      choices: ["environ la moitié", "environ un quart", "presque tout", "presque rien"],
      expected: "environ la moitié",
      explanation:
        "Le chiffre est donné juste après « un chercheur a mesuré cela » : une mesure annoncée est presque toujours suivie de son résultat.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Pourquoi le cerveau efface-t-il des choses, d'après l'émission ?",
      choices: [
        "parce qu'il trie et garde ce qui revient",
        "parce qu'il est fatigué",
        "parce qu'il manque de place",
        "parce qu'on dort trop peu",
      ],
      expected: "parce qu'il trie et garde ce qui revient",
      explanation:
        "L'émission illustre le tri par un exemple — la couleur d'une voiture croisée. L'exemple sert à rendre l'idée concrète, pas à ajouter une information.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quelle méthode l'émission présente-t-elle comme efficace ?",
      choices: [
        "revoir la même chose trois fois, à trois jours d'écart",
        "relire dix fois le soir",
        "apprendre le matin",
        "écrire ses leçons deux fois",
      ],
      expected: "revoir la même chose trois fois, à trois jours d'écart",
      explanation:
        "Les deux méthodes sont opposées dans la même phrase : « sert peu » d'un côté, « sert beaucoup » de l'autre.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Quelle phrase résume le mieux l'émission ?",
      choices: [
        "Oublier est normal ; ce qui compte, c'est de revenir plusieurs fois sur ce qu'on apprend.",
        "Il faut travailler plus longtemps chaque soir.",
        "Certains ont une bonne mémoire, d'autres non.",
        "Les contrôles ne servent à rien.",
      ],
      expected:
        "Oublier est normal ; ce qui compte, c'est de revenir plusieurs fois sur ce qu'on apprend.",
      explanation:
        "Les deux temps du texte sont là : l'oubli est normal, et le remède est le retour. Une moitié seule ne résume pas.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "L'émission finit par : « ce n'est pas ta mémoire qu'il faut changer, c'est le moment où tu ouvres ton cahier ». Que veut-elle dire ?",
      choices: [
        "il vaut mieux répartir son travail sur plusieurs jours",
        "il faut travailler dans un autre endroit",
        "il faut changer de cahier",
        "il faut apprendre plus longtemps d'un coup",
      ],
      expected: "il vaut mieux répartir son travail sur plusieurs jours",
      explanation:
        "La formule reprend le paragraphe précédent : le cerveau « compte les retours », pas le temps passé. Une conclusion imagée renvoie à ce qui vient d'être expliqué.",
    },
  ],
};

const ORAL_NOMS_DE_RUES_CM2: SupportTexte = {
  id: "cm2_oral_noms_de_rues",
  kicker: "Compréhension de l'oral",
  titre: "Qui choisit le nom des rues ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Question du jour, posée par Yanis, dix ans : qui décide du nom des rues ?

La réponse est plus simple qu'on ne croit : c'est la commune. Le conseil municipal vote, et la rue change de nom. Cela peut arriver plusieurs fois dans l'histoire d'une même rue.

D'où viennent ces noms ? De trois endroits, le plus souvent. Du paysage d'abord : rue du Ravin, chemin des Manguiers. Du métier qu'on y exerçait ensuite : rue des Pêcheurs, rue de la Forge. Et enfin d'une personne qu'on a voulu honorer.

C'est cette troisième source qui fait parfois discuter. Honorer quelqu'un, c'est dire à tous les habitants que cette personne compte. Alors quand le regard change sur un personnage historique, la question du nom revient. Certaines communes ont ainsi débaptisé des rues, après des débats parfois longs.

Une plaque de rue, ce n'est donc pas seulement une adresse. C'est aussi ce qu'une ville a choisi de garder en mémoire.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Qui décide du nom d'une rue ?",
      choices: [
        "le conseil municipal de la commune",
        "l'État",
        "les habitants de la rue",
        "le facteur",
      ],
      expected: "le conseil municipal de la commune",
      explanation:
        "La réponse arrive dès le deuxième paragraphe, annoncée par « la réponse est plus simple qu'on ne croit ».",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quelles sont les trois sources des noms de rues citées ?",
      choices: [
        "le paysage, les métiers, les personnes honorées",
        "les arbres, les animaux, les couleurs",
        "les dates, les chiffres, les lettres",
        "les rivières, les montagnes, la mer",
      ],
      expected: "le paysage, les métiers, les personnes honorées",
      explanation:
        "L'émission annonce « de trois endroits » avant de les énumérer. Une annonce chiffrée aide à retenir une liste entendue.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quelle source de noms fait parfois discuter ?",
      choices: [
        "les personnes honorées",
        "les noms de paysage",
        "les noms de métiers",
        "les numéros de rue",
      ],
      expected: "les personnes honorées",
      explanation:
        "L'émission le dit en désignant « cette troisième source ». Il faut avoir retenu l'ordre de la liste pour savoir laquelle c'est.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Pourquoi le nom d'une rue peut-il être changé, d'après l'émission ?",
      choices: [
        "parce que le regard porté sur une personne peut changer",
        "parce que les plaques s'abîment",
        "parce que les habitants déménagent",
        "parce que la rue est trop longue",
      ],
      expected: "parce que le regard porté sur une personne peut changer",
      explanation:
        "L'émission relie honorer et regarder : si honorer, c'est dire que quelqu'un compte, un changement de regard rouvre la question.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Que veut dire la dernière phrase : « une plaque de rue, c'est aussi ce qu'une ville a choisi de garder en mémoire » ?",
      choices: [
        "les noms de rues disent ce qu'une ville juge important",
        "les plaques sont difficiles à lire",
        "les rues portent toutes le nom d'une personne",
        "il faudrait numéroter les rues",
      ],
      expected: "les noms de rues disent ce qu'une ville juge important",
      explanation:
        "La phrase élargit le propos : d'une question pratique — l'adresse — on passe à une question de mémoire. C'est la conclusion du raisonnement.",
    },
  ],
};

const ORAL_ANIMAL_MENTEUR_CM2: SupportTexte = {
  id: "cm2_oral_animal_menteur",
  kicker: "Compréhension de l'oral",
  titre: "Un animal peut-il mentir ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Voici une question surprenante, posée par Maya, onze ans : est-ce qu'un animal peut mentir ?

Tout dépend de ce qu'on appelle mentir. Beaucoup d'animaux trompent, et depuis toujours. Un papillon porte sur ses ailes deux dessins qui ressemblent à des yeux de hibou. Un oiseau fait semblant d'avoir une aile cassée pour éloigner un prédateur de son nid. Mais ces animaux ne choisissent pas : ils font ce que leur espèce fait.

Mentir, c'est autre chose. C'est savoir ce que l'autre croit, et vouloir lui faire croire le faux.

Or on a observé cela chez certains singes. Un jeune capucin pousse un cri d'alerte alors qu'aucun danger n'approche. Les autres fuient. Et pendant qu'ils fuient, il mange leur part tranquillement. Il a recommencé plusieurs fois — et il a fini par ne plus être cru.

Cette histoire dit deux choses. Que mentir demande de se représenter ce que pense l'autre. Et qu'un mensonge répété finit toujours par se retourner contre celui qui le fait.`,
  questions: [
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Quel exemple d'animal qui trompe sans choisir est donné ?",
      choices: [
        "un papillon dont les ailes imitent des yeux de hibou",
        "un capucin qui crie au danger",
        "un chien qui cache un os",
        "un poisson qui change de couleur",
      ],
      expected: "un papillon dont les ailes imitent des yeux de hibou",
      explanation:
        "Le papillon et l'oiseau illustrent la tromperie sans intention. Le capucin, lui, sert à illustrer le contraire.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "D'après l'émission, qu'est-ce que mentir suppose ?",
      choices: [
        "savoir ce que l'autre croit et vouloir lui faire croire le faux",
        "parler une langue",
        "être un animal intelligent",
        "avoir peur d'un prédateur",
      ],
      expected:
        "savoir ce que l'autre croit et vouloir lui faire croire le faux",
      explanation:
        "L'émission pose cette définition avant de raconter l'histoire du capucin : c'est elle qui permet de juger si le singe ment vraiment.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_ecouter",
      text: "Qu'a fait le jeune capucin ?",
      choices: [
        "il a crié au danger sans danger, pour manger la part des autres",
        "il a partagé sa nourriture",
        "il a prévenu le groupe d'un vrai danger",
        "il s'est caché dans un arbre",
      ],
      expected:
        "il a crié au danger sans danger, pour manger la part des autres",
      explanation:
        "L'histoire est racontée en trois temps : le cri, la fuite des autres, le repas. Suivre l'ordre aide à comprendre l'intention.",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_argumenter",
      text: "Pourquoi le capucin a-t-il fini par ne plus être cru ?",
      choices: [
        "parce qu'il avait recommencé plusieurs fois",
        "parce qu'il criait trop fort",
        "parce que les autres l'avaient vu manger",
        "parce qu'il avait changé de groupe",
      ],
      expected: "parce qu'il avait recommencé plusieurs fois",
      explanation:
        "Le texte lie explicitement la répétition et la perte de crédit : « Il a recommencé plusieurs fois — et il a fini par ne plus être cru. »",
    },
    {
      notionId: "oral",
      microId: "cm2_oral_reformuler",
      text: "Quelles sont les deux idées que l'émission tire de cette histoire ?",
      choices: [
        "mentir demande de se représenter ce que pense l'autre, et un mensonge répété se retourne contre son auteur",
        "les singes sont plus intelligents que les papillons, et ils mangent beaucoup",
        "les animaux ne mentent jamais, et les humains si",
        "il ne faut pas crier au danger, et il faut partager sa nourriture",
      ],
      expected:
        "mentir demande de se représenter ce que pense l'autre, et un mensonge répété se retourne contre son auteur",
      explanation:
        "L'émission annonce elle-même « cette histoire dit deux choses ». Quand un texte annonce un nombre, il faut retrouver les deux.",
    },
  ],
};

const ORAL_MARRONNIER_5E: SupportTexte = {
  id: "5e_oral_marronnier",
  kicker: "Compréhension de l'oral",
  titre: "Ces informations qui reviennent chaque année",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Avez-vous remarqué que certains sujets reviennent aux mêmes dates ? Le prix de la rentrée scolaire en août. Les bonnes résolutions en janvier. Les départs en vacances à chaque veille de week-end prolongé.

Dans les rédactions, ces sujets ont un nom : on les appelle des marronniers. Le mot vient de l'arbre, qui fleurit chaque année au même moment.

Un marronnier n'est pas une fausse information. Le prix des fournitures augmente réellement, et le dire est utile. Mais le sujet n'est pas traité parce qu'il vient de se produire. Il est traité parce que c'est la saison.

Cela change quelque chose pour celui qui écoute. Une information choisie parce qu'elle est nouvelle et une information choisie parce que c'est le moment, ce ne sont pas les mêmes. La seconde occupe une place qu'une autre aurait pu prendre.

Le repérer n'oblige à rien. Cela permet seulement de savoir pourquoi on vous parle de ça, aujourd'hui, plutôt que d'autre chose.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Comment appelle-t-on, dans les rédactions, un sujet qui revient chaque année à la même date ?",
      choices: ["un marronnier", "un serpent de mer", "une brève", "un éditorial"],
      expected: "un marronnier",
      explanation:
        "Le mot est donné puis expliqué par son origine — l'arbre qui fleurit toujours au même moment.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "L'émission dit-elle qu'un marronnier est une fausse information ?",
      choices: [
        "non, elle précise le contraire",
        "oui, c'est une invention",
        "oui, mais seulement en janvier",
        "elle ne le dit pas",
      ],
      expected: "non, elle précise le contraire",
      explanation:
        "La phrase est explicite : « Un marronnier n'est pas une fausse information. » Écarter une confusion est souvent la première chose que fait un propos construit.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Qu'est-ce qui distingue un marronnier d'une autre information ?",
      choices: [
        "il est traité parce que c'est la saison, non parce qu'il vient de se produire",
        "il est plus court",
        "il est toujours faux",
        "il ne concerne que l'école",
      ],
      expected:
        "il est traité parce que c'est la saison, non parce qu'il vient de se produire",
      explanation:
        "L'opposition est posée par « Mais » : ce n'est pas le contenu qui change, c'est la raison de le publier.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      // ⚠️ Énoncé rendu spécifique — voir la note de l'enregistrement sur les
      // fourmis : le tirage déduplique sur le texte.
      text: "Dans quel but cette émission explique-t-elle ce qu'est un marronnier ?",
      choices: [
        "expliquer pourquoi certains sujets sont choisis, pour mieux les situer",
        "dénoncer des journalistes malhonnêtes",
        "conseiller de ne plus suivre l'actualité",
        "raconter l'histoire d'un arbre",
      ],
      expected:
        "expliquer pourquoi certains sujets sont choisis, pour mieux les situer",
      explanation:
        "La dernière phrase dit exactement ce que l'émission cherche : « Le repérer n'oblige à rien. Cela permet seulement de savoir pourquoi on vous parle de ça. »",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Que veut dire l'émission par « la seconde occupe une place qu'une autre aurait pu prendre » ?",
      choices: [
        "traiter un marronnier, c'est renoncer à traiter un autre sujet",
        "les marronniers sont trop longs",
        "il y a trop d'informations chaque jour",
        "les journaux manquent de place",
      ],
      expected:
        "traiter un marronnier, c'est renoncer à traiter un autre sujet",
      explanation:
        "L'idée est implicite : le temps d'antenne est limité, donc tout choix en écarte un autre. C'est le vrai coût que l'émission signale.",
    },
  ],
};

const ORAL_PRIX_BILLET_5E: SupportTexte = {
  id: "5e_oral_prix_billet",
  kicker: "Compréhension de l'oral",
  titre: "Pourquoi le prix d'un billet change tous les jours",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Vous avez peut-être déjà vécu cela : vous regardez un billet d'avion un lundi, il coûte deux cents euros. Le mercredi, le même vol en coûte trois cents. Rien n'a changé dans l'avion. Que s'est-il passé ?

Le prix ne dépend pas du coût du voyage. Il dépend du nombre de places restantes et de la date à laquelle vous achetez. Un logiciel ajuste le tarif en permanence, plusieurs fois par jour parfois.

La logique est la suivante : plus il reste de places longtemps à l'avance, plus le prix baisse pour remplir l'avion. Et plus la date approche avec peu de places libres, plus le prix monte, parce que ceux qui achètent au dernier moment ne peuvent plus vraiment renoncer.

On appelle cela le prix dynamique. Il ne concerne pas que les avions : les hôtels, les concerts, certains trains fonctionnent pareil.

Ce qu'il faut en retenir n'est pas une astuce pour payer moins cher. C'est que le prix affiché n'est pas la valeur de la chose. C'est ce qu'on estime que vous êtes prêt à payer, à cet instant précis.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "De quoi dépend le prix d'un billet, d'après l'émission ?",
      choices: [
        "du nombre de places restantes et de la date d'achat",
        "du coût du carburant",
        "de la longueur du vol",
        "du nombre de bagages",
      ],
      expected: "du nombre de places restantes et de la date d'achat",
      explanation:
        "L'émission écarte d'abord une explication attendue — le coût du voyage — avant de donner la vraie.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Pourquoi le prix monte-t-il quand la date approche ?",
      choices: [
        "parce que ceux qui achètent au dernier moment ne peuvent plus renoncer",
        "parce que l'avion coûte plus cher à remplir",
        "parce que les taxes augmentent",
        "parce que les places deviennent plus confortables",
      ],
      expected:
        "parce que ceux qui achètent au dernier moment ne peuvent plus renoncer",
      explanation:
        "La raison est donnée dans la même phrase, après « parce que ». Elle porte sur l'acheteur, pas sur le vol.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Quels autres domaines fonctionnent avec un prix dynamique ?",
      choices: [
        "les hôtels, les concerts, certains trains",
        "les librairies et les boulangeries",
        "les hôpitaux et les écoles",
        "les musées uniquement",
      ],
      expected: "les hôtels, les concerts, certains trains",
      explanation:
        "L'énumération vient juste après le nom du procédé. Retenir un exemple suffit rarement quand la question porte sur la liste.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      // ⚠️ Énoncé rendu spécifique — le tirage déduplique sur le texte.
      text: "Dans quel but cette émission explique-t-elle le prix dynamique ?",
      choices: [
        "faire comprendre ce que le prix affiché mesure réellement",
        "donner des astuces pour payer moins cher",
        "critiquer les compagnies aériennes",
        "encourager à voyager davantage",
      ],
      expected: "faire comprendre ce que le prix affiché mesure réellement",
      explanation:
        "L'émission écarte elle-même l'autre visée possible : « Ce qu'il faut en retenir n'est pas une astuce pour payer moins cher. »",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Que signifie « le prix affiché n'est pas la valeur de la chose » ?",
      choices: [
        "le prix mesure ce qu'on pense que l'acheteur acceptera de payer",
        "les billets sont toujours trop chers",
        "la valeur d'un vol est impossible à calculer",
        "les logiciels se trompent souvent",
      ],
      expected:
        "le prix mesure ce qu'on pense que l'acheteur acceptera de payer",
      explanation:
        "La phrase suivante l'explique : « C'est ce qu'on estime que vous êtes prêt à payer, à cet instant précis. »",
    },
  ],
};

const ORAL_NOTES_5E: SupportTexte = {
  id: "5e_oral_notes",
  kicker: "Compréhension de l'oral",
  titre: "Faut-il noter les élèves ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Deux enseignants débattent aujourd'hui. D'abord madame Rivière.

« Je note, et j'assume. Une note situe. Elle dit à l'élève où il en est, à la famille aussi, et en peu de place. Je n'ignore pas ses défauts : deux copies proches peuvent recevoir des notes différentes selon le moment de la correction. Mais supprimer la note ne supprime pas le classement — il devient seulement invisible, et donc plus difficile à discuter. »

Ensuite monsieur Ambroise.

« Ce que je reproche à la note, ce n'est pas d'être imprécise. C'est qu'elle arrête le travail. Quand l'élève lit son quinze ou son huit, il ne lit plus rien d'autre : ni les remarques, ni ce qu'il faudrait reprendre. J'écris donc ce qui est acquis et ce qui ne l'est pas, sans chiffre. Cela me prend plus de temps, je le reconnais. »

Aucun des deux ne dit que l'évaluation est inutile. Ils ne s'opposent pas sur la nécessité d'évaluer, mais sur ce qu'un chiffre fait à celui qui le reçoit.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Quel défaut madame Rivière reconnaît-elle à la note ?",
      choices: [
        "deux copies proches peuvent recevoir des notes différentes",
        "elle prend trop de temps à calculer",
        "les familles ne la comprennent pas",
        "elle décourage les meilleurs élèves",
      ],
      expected: "deux copies proches peuvent recevoir des notes différentes",
      explanation:
        "Elle le concède elle-même — « Je n'ignore pas ses défauts ». Reconnaître une faiblesse de son propre camp rend un argument plus solide, pas moins.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Quel est l'argument principal de monsieur Ambroise contre la note ?",
      choices: [
        "elle arrête le travail : l'élève ne lit plus les remarques",
        "elle est imprécise",
        "elle prend trop de temps",
        "elle est injuste envers les familles",
      ],
      expected: "elle arrête le travail : l'élève ne lit plus les remarques",
      explanation:
        "Il écarte explicitement l'imprécision : « Ce que je reproche à la note, ce n'est pas d'être imprécise. » Son objection est ailleurs.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que répond madame Rivière à ceux qui veulent supprimer la note ?",
      choices: [
        "le classement deviendrait invisible, donc plus difficile à discuter",
        "les élèves travailleraient moins",
        "les familles protesteraient",
        "les professeurs perdraient du temps",
      ],
      expected:
        "le classement deviendrait invisible, donc plus difficile à discuter",
      explanation:
        "Son argument ne défend pas la note pour elle-même : il porte sur ce qui se passerait sans elle.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Monsieur Ambroise dit : « Cela me prend plus de temps, je le reconnais. » Que fait-il ainsi ?",
      choices: [
        "il admet une faiblesse de sa propre position",
        "il critique ses collègues",
        "il change d'avis",
        "il refuse de répondre",
      ],
      expected: "il admet une faiblesse de sa propre position",
      explanation:
        "Concéder un point contre soi est une manière de débattre : cela montre qu'on a examiné l'objection au lieu de l'ignorer.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      // ⚠️ Énoncé rendu spécifique — le tirage déduplique sur le texte.
      text: "Dans quel but a-t-on fait entendre ces deux enseignants ?",
      choices: [
        "montrer sur quoi porte exactement le désaccord",
        "convaincre de supprimer les notes",
        "convaincre de garder les notes",
        "expliquer comment calculer une moyenne",
      ],
      expected: "montrer sur quoi porte exactement le désaccord",
      explanation:
        "La dernière phrase le formule : ils ne s'opposent pas sur la nécessité d'évaluer, mais sur ce qu'un chiffre fait à celui qui le reçoit.",
    },
  ],
};

const ORAL_NATUREL_5E: SupportTexte = {
  id: "5e_oral_naturel",
  kicker: "Compréhension de l'oral",
  titre: "Que veut dire « naturel » sur un emballage ?",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Prenez un paquet dans un rayon et lisez ce qui est écrit devant. Vous y trouverez peut-être « naturel », « authentique », « à l'ancienne ». Ces mots ont un point commun : aucun ne correspond à une règle précise.

Il faut les distinguer d'autres mentions. « Bio » répond, lui, à un cahier des charges vérifié, avec des contrôles. « Naturel », non. Un fabricant peut l'écrire sans avoir à le prouver.

Cela ne signifie pas que le produit est mauvais. Il peut être excellent. Le problème est ailleurs : le mot ne vous apprend rien, alors qu'il donne l'impression de vous apprendre quelque chose. Et c'est justement à cela qu'il sert.

Où regarder, alors ? Au dos. La liste des ingrédients, elle, est obligatoire et réglementée. Elle est écrite plus petit, dans un ordre imposé : du plus présent au moins présent.

C'est une règle assez simple à retenir : ce qui est écrit gros a été choisi pour vous plaire, ce qui est écrit petit a été imposé pour vous informer.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Quelle mention répond à un cahier des charges vérifié ?",
      choices: ["« bio »", "« naturel »", "« authentique »", "« à l'ancienne »"],
      expected: "« bio »",
      explanation:
        "L'émission oppose « bio » aux trois autres : la distinction porte sur l'existence d'un contrôle, pas sur le sens des mots.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Dans quel ordre la liste des ingrédients est-elle écrite ?",
      choices: [
        "du plus présent au moins présent",
        "par ordre alphabétique",
        "du moins cher au plus cher",
        "dans un ordre libre",
      ],
      expected: "du plus présent au moins présent",
      explanation:
        "Cette information est donnée en passant, mais elle est utilisable : le premier ingrédient est celui qu'il y a le plus.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "L'émission dit-elle qu'un produit portant « naturel » est mauvais ?",
      choices: [
        "non, elle dit qu'il peut être excellent",
        "oui, toujours",
        "oui, sauf s'il est aussi bio",
        "elle ne se prononce pas",
      ],
      expected: "non, elle dit qu'il peut être excellent",
      explanation:
        "L'émission écarte cette lecture pour déplacer la question : le problème n'est pas la qualité du produit, c'est ce que le mot fait croire.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_visees",
      text: "D'après l'émission, à quoi sert le mot « naturel » sur un emballage ?",
      choices: [
        "à donner l'impression d'informer sans rien apprendre",
        "à garantir l'absence de produits chimiques",
        "à respecter une obligation légale",
        "à indiquer l'origine du produit",
      ],
      expected: "à donner l'impression d'informer sans rien apprendre",
      explanation:
        "La phrase est nette : « le mot ne vous apprend rien, alors qu'il donne l'impression de vous apprendre quelque chose. Et c'est justement à cela qu'il sert. »",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Que veut dire la dernière phrase de l'émission ?",
      choices: [
        "les grosses mentions servent à séduire, les petites à informer",
        "il faut acheter les produits sans emballage",
        "les petites lettres sont illisibles exprès",
        "les fabricants mentent sur leurs listes",
      ],
      expected: "les grosses mentions servent à séduire, les petites à informer",
      explanation:
        "La formule résume tout le propos par une opposition : choisi pour vous plaire d'un côté, imposé pour vous informer de l'autre.",
    },
  ],
};

const ORAL_AGE_ARBRE_5E: SupportTexte = {
  id: "5e_oral_age_arbre",
  kicker: "Compréhension de l'oral",
  titre: "Ce qu'un arbre coupé raconte du passé",
  source: "Texte original — EleveAI",
  oral: { ecoutes: 2 },
  texte: `Tout le monde sait qu'on peut compter les cercles d'un tronc coupé pour connaître l'âge d'un arbre. Un cercle, une année. C'est vrai, et c'est peu de chose à côté de ce qu'ils racontent vraiment.

Regardez leur épaisseur. Une année pluvieuse et douce fait un anneau large. Une année de sécheresse ou de froid en fait un étroit. Un tronc n'est donc pas seulement un compteur d'années : c'est une suite de bonnes et de mauvaises saisons, dans l'ordre.

Les chercheurs s'en servent bien au-delà de l'arbre. Comme tous les arbres d'une même région vivent les mêmes années, leurs anneaux dessinent le même motif. On peut alors relier un arbre vivant à une poutre ancienne qui porte la fin du même motif, puis cette poutre à une plus vieille encore.

De proche en proche, on remonte ainsi sur plusieurs milliers d'années. Et cela permet de dater une charpente, une épave, un tableau peint sur bois.

Il n'y avait ni thermomètre ni carnet à ces époques. L'arbre, lui, prenait des notes sans le savoir.`,
  questions: [
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que révèle l'épaisseur d'un anneau ?",
      choices: [
        "si l'année a été bonne ou mauvaise pour l'arbre",
        "l'âge exact de l'arbre",
        "l'espèce de l'arbre",
        "la hauteur de l'arbre",
      ],
      expected: "si l'année a été bonne ou mauvaise pour l'arbre",
      explanation:
        "L'émission distingue deux informations : le nombre d'anneaux donne l'âge, leur épaisseur donne les conditions de chaque année.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Pourquoi les arbres d'une même région ont-ils le même motif d'anneaux ?",
      choices: [
        "parce qu'ils ont vécu les mêmes années",
        "parce qu'ils ont le même âge",
        "parce qu'ils sont de la même espèce",
        "parce qu'ils poussent à la même vitesse",
      ],
      expected: "parce qu'ils ont vécu les mêmes années",
      explanation:
        "C'est cette identité de motif qui rend possible tout le raccordement expliqué ensuite. Sans elle, la méthode ne tiendrait pas.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Comment remonte-t-on plusieurs milliers d'années ?",
      choices: [
        "en reliant un arbre vivant à une poutre plus ancienne, puis à une plus ancienne encore",
        "en coupant les arbres les plus vieux du monde",
        "en mesurant la hauteur des forêts",
        "en comparant les espèces entre elles",
      ],
      expected:
        "en reliant un arbre vivant à une poutre plus ancienne, puis à une plus ancienne encore",
      explanation:
        "L'expression « de proche en proche » désigne cet enchaînement : chaque pièce recouvre partiellement la précédente.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_ecouter",
      text: "Que permet de dater cette méthode ?",
      choices: [
        "une charpente, une épave, un tableau peint sur bois",
        "des ossements",
        "des pierres taillées",
        "des poteries",
      ],
      expected: "une charpente, une épave, un tableau peint sur bois",
      explanation:
        "Les trois exemples ont un point commun qu'il faut voir : ils sont tous en bois. La méthode ne vaut que pour lui.",
    },
    {
      notionId: "oral",
      microId: "5e_oral_argumenter",
      text: "Que veut dire la dernière phrase : « l'arbre prenait des notes sans le savoir » ?",
      choices: [
        "l'arbre a enregistré le climat des années qu'il a vécues",
        "l'arbre écrit vraiment quelque chose",
        "les chercheurs ont écrit sur les arbres",
        "l'arbre se souvient de son passé",
      ],
      expected: "l'arbre a enregistré le climat des années qu'il a vécues",
      explanation:
        "L'image répond à la phrase précédente — « il n'y avait ni thermomètre ni carnet ». L'arbre remplace l'instrument qui n'existait pas.",
    },
  ],
};

// Le récit d'abord, le document ensuite, l'oral en dernier : c'est l'ordre de
// l'épreuve officielle, et le tirage choisit celui dont l'élève a vu le moins
// de questions.
// SIX TEXTES DE PLUS depuis le 15/08 (trois par niveau). ⚠️ Le compteur de
// complétude ne voyait rien : l'épreuve servait bien ses 5 questions d'écrit
// à chaque passage, mais sur 15 énoncés distincts seulement, et une question
// revenait dès le 2ᵉ ou 3ᵉ passage. C'est la RÉPÉTITION qu'il fallait mesurer,
// pas la complétude.
export const SUPPORTS_CM2: SupportTexte[] = [
  POISSON_DE_LUDOVIC,
  MANGUIER_DE_MADAME_LUCIE,
  DOCUMENT_SOMMEIL_CM2,
  LE_VELO_DE_MALO,
  LA_LETTRE_DE_TANTINE,
  DOCUMENT_MANGROVE_CM2,
];
export const SUPPORTS_5E: SupportTexte[] = [
  AVIS_DE_CYCLONE,
  LA_BOURSE_DU_MARCHAND,
  DOCUMENT_ECRANS_5E,
  LE_CONCOURS_5E,
  LE_GARDIEN_DU_PHARE_5E,
  DOCUMENTS_LUMIERE_5E,
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
  ORAL_REQUINS_CM2,
  ORAL_FOURMIS_CM2,
  ORAL_OUBLI_CM2,
  ORAL_NOMS_DE_RUES_CM2,
  ORAL_ANIMAL_MENTEUR_CM2,
];
export const SUPPORTS_ORAL_5E: SupportTexte[] = [
  ORAL_VRAI_FAUX_5E,
  ORAL_LANGAGE_ANIMAL_5E,
  ORAL_PUBLICITE_5E,
  ORAL_CARTES_5E,
  ORAL_TELEPHONES_5E,
  ORAL_MARRONNIER_5E,
  ORAL_PRIX_BILLET_5E,
  ORAL_NOTES_5E,
  ORAL_NATUREL_5E,
  ORAL_AGE_ARBRE_5E,
];
