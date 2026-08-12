// lib/tutor-v4/questionBank/ce1/francais/production-ecrite.bank.ts
//
// La production d'écrits du CE1, écrite à la main. Neuf micro-compétences.
//
// CE QU'ELLE REMPLACE : DEUX énoncés figés pour neuf micro-compétences — « Pour
// écrire une bonne phrase, qu'est-ce qui est indispensable ? » et « Quel début
// de phrase permet de décrire une image d'un chien dans un jardin ? ». Deux
// questions, jamais renouvelées, et aucune ne demandait de PRODUIRE quoi que ce
// soit.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Produire en fin d'année un texte de SIX OU SEPT PHRASES cohérent » ;
//   — « Utiliser un brouillon : liste, piste, carte mentale » ;
//   — « Relier ses phrases par des connecteurs » ;
//   — « Relire son texte et améliorer ce qui peut l'être ».
//
// ⚠️ LE COACH NE LIT PAS CE QUE L'ÉLÈVE ÉCRIT. Un écran ne corrige pas un texte
// libre de six phrases. Ce qui est vérifiable ici, c'est tout ce qui ENTOURE
// l'écriture : reconnaitre une phrase qui tient debout, choisir le connecteur
// qui relie deux idées, repérer ce qui manque dans une suite, voir ce qu'un
// brouillon sert à faire, et savoir ce qu'on cherche quand on se relit. Le
// texte lui-même s'écrit sur le cahier.
//
// LE PIÈGE DE LA NOTION : un texte n'est pas une pile de phrases justes. Six
// phrases correctes qui parlent chacune d'autre chose ne font pas un texte —
// il y manque le fil. C'est ce fil que travaillent les connecteurs et la
// chaine des personnages.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeChoices(correct: string, wrongs: readonly string[]) {
  const distracteurs = shuffle(
    Array.from(new Set(wrongs)).filter((w) => w !== correct),
  ).slice(0, 3);
  return shuffle([correct, ...distracteurs]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ── Transformer une phrase modèle ───────────────────────────────────────── */

type Transformation = {
  readonly modele: string;
  readonly transformee: string;
  readonly consigne: string;
  readonly rates: readonly [string, string];
};

const TRANSFORMATIONS: readonly Transformation[] = [
  {
    modele: "Le margouillat grimpe sur le mur.",
    consigne: "en parlant de plusieurs margouillats",
    transformee: "Les margouillats grimpent sur le mur.",
    rates: ["Les margouillat grimpent sur le mur.", "Les margouillats grimpe sur le mur."],
  },
  {
    modele: "Léa ramasse une mangue.",
    consigne: "en remplaçant Léa par Tom et Léa",
    transformee: "Tom et Léa ramassent une mangue.",
    rates: ["Tom et Léa ramasse une mangue.", "Tom et Léa ramassons une mangue."],
  },
  {
    modele: "Le chien attend devant la porte.",
    consigne: "en parlant de plusieurs chiens",
    transformee: "Les chiens attendent devant la porte.",
    rates: ["Les chien attendent devant la porte.", "Les chiens attend devant la porte."],
  },
  {
    modele: "La pirogue glisse sur le lagon.",
    consigne: "en parlant de plusieurs pirogues",
    transformee: "Les pirogues glissent sur le lagon.",
    rates: ["Les pirogue glissent sur le lagon.", "Les pirogues glisse sur le lagon."],
  },
  {
    modele: "Papa prépare un cari.",
    consigne: "en remplaçant Papa par Mamie et Papa",
    transformee: "Mamie et Papa préparent un cari.",
    rates: ["Mamie et Papa prépare un cari.", "Mamie et Papa préparons un cari."],
  },
  {
    modele: "L'élève récite une poésie.",
    consigne: "en parlant de plusieurs élèves",
    transformee: "Les élèves récitent une poésie.",
    rates: ["Les élève récitent une poésie.", "Les élèves récite une poésie."],
  },
  {
    modele: "La tortue remonte le sable.",
    consigne: "en parlant de plusieurs tortues",
    transformee: "Les tortues remontent le sable.",
    rates: ["Les tortue remontent le sable.", "Les tortues remonte le sable."],
  },
  {
    modele: "Le bateau quitte le port.",
    consigne: "en parlant de plusieurs bateaux",
    transformee: "Les bateaux quittent le port.",
    rates: ["Les bateau quittent le port.", "Les bateaux quitte le port."],
  },
  {
    modele: "Mon frère répare sa pirogue.",
    consigne: "en remplaçant mon frère par mes frères",
    transformee: "Mes frères réparent leur pirogue.",
    rates: ["Mes frère réparent leur pirogue.", "Mes frères répare leur pirogue."],
  },
  {
    modele: "L'oiseau traverse le lagon.",
    consigne: "en parlant de plusieurs oiseaux",
    transformee: "Les oiseaux traversent le lagon.",
    rates: ["Les oiseau traversent le lagon.", "Les oiseaux traverse le lagon."],
  },
  {
    modele: "La vague glisse sur le sable.",
    consigne: "en parlant de plusieurs vagues",
    transformee: "Les vagues glissent sur le sable.",
    rates: ["Les vague glissent sur le sable.", "Les vagues glisse sur le sable."],
  },
  {
    modele: "Le cousin de Léa arrive demain.",
    consigne: "en parlant de plusieurs cousins",
    transformee: "Les cousins de Léa arrivent demain.",
    rates: ["Les cousin de Léa arrivent demain.", "Les cousins de Léa arrive demain."],
  },
];

/* ── Ce qui fait une phrase ─────────────────────────────────────────────── */

const VRAIES_PHRASES: readonly string[] = [
  "Le margouillat grimpe sur le mur.",
  "Léa ramasse des mangues chaque matin.",
  "Les enfants jouent dans la cour.",
  "Papa prépare un cari le dimanche.",
  "La pirogue glisse sur le lagon.",
  "Mamie raconte une histoire le soir.",
  "Le vent secoue les branches du manguier.",
  "Les pêcheurs rentrent avant la nuit.",
];

const FAUSSES_PHRASES: readonly { readonly texte: string; readonly manque: string }[] = [
  { texte: "Le margouillat sur le mur.", manque: "il manque le verbe : on ne sait pas ce qu'il fait" },
  { texte: "Ramasse des mangues chaque matin.", manque: "il manque le sujet : on ne sait pas qui ramasse" },
  { texte: "dans la cour les enfants jouent", manque: "il manque la majuscule et le point" },
  { texte: "Le cari de papa le dimanche.", manque: "il manque le verbe : rien ne se passe" },
  { texte: "Glisse sur le lagon.", manque: "il manque le sujet : on ne sait pas qui glisse" },
  { texte: "une histoire le soir Mamie raconte", manque: "il manque la majuscule et le point" },
  { texte: "Les enfants dans la cour.", manque: "il manque le verbe : on ne sait pas ce qu'ils font" },
  { texte: "Range son cartable après l'école.", manque: "il manque le sujet : on ne sait pas qui range" },
  { texte: "le vent secoue les branches", manque: "il manque la majuscule et le point" },
  { texte: "La pirogue de Yann sur le lagon.", manque: "il manque le verbe : rien ne se passe" },
  { texte: "Remonte le sable à la nuit tombée.", manque: "il manque le sujet : on ne sait pas qui remonte" },
];

/* ── Les connecteurs ─────────────────────────────────────────────────────── */

type Connecteur = {
  readonly avant: string;
  readonly apres: string;
  readonly bon: string;
  readonly faux: readonly string[];
  readonly role: string;
};

const CONNECTEURS: readonly Connecteur[] = [
  { avant: "Léa remplit son panier.", apres: "elle rentre à la maison.", bon: "Ensuite,", faux: ["Pourtant,", "Parce que", "Comme"], role: "il dit ce qui vient après" },
  { avant: "Papa allume le feu.", apres: "il pose la marmite dessus.", bon: "Puis", faux: ["Mais", "Pourtant", "Sinon"], role: "il dit ce qui vient après" },
  { avant: "Le ciel devient gris.", apres: "les enfants rangent leurs billes.", bon: "Alors", faux: ["Pourtant", "Avant", "Sinon"], role: "il dit la conséquence" },
  { avant: "Tom a couru très vite.", apres: "il n'a pas gagné la course.", bon: "Pourtant,", faux: ["Ensuite,", "Alors", "D'abord,"], role: "il annonce le contraire de ce qu'on attendait" },
  { avant: "Nina répare son vélo.", apres: "elle peut aller à l'école.", bon: "Maintenant,", faux: ["Avant,", "Pourtant,", "Enfin"], role: "il situe dans le temps" },
  { avant: "Le pêcheur pose ses filets.", apres: "il attend une heure entière.", bon: "Puis", faux: ["Pourtant", "Comme", "Sinon"], role: "il dit ce qui vient après" },
  { avant: "Nous avons tout rangé.", apres: "nous sommes partis à la plage.", bon: "Enfin,", faux: ["D'abord,", "Pourtant,", "Sinon"], role: "il annonce la dernière étape" },
  { avant: "Il pleut depuis ce matin.", apres: "nous restons sous la varangue.", bon: "Donc", faux: ["Pourtant", "Avant", "Ensuite"], role: "il dit la conséquence" },
];

const ORDRE_CONNECTEURS: readonly string[] = ["D'abord", "Ensuite", "Puis", "Enfin"];

/* ── Les suites d'histoire ──────────────────────────────────────────────── */

type Suite = {
  readonly debut: string;
  readonly bonne: string;
  readonly rates: readonly [string, string, string];
};

const SUITES: readonly Suite[] = [
  {
    debut: "Léa pousse la porte du grenier. Il fait sombre et ça sent la poussière. Soudain, quelque chose bouge au fond.",
    bonne: "Elle allume sa lampe et avance d'un pas.",
    rates: [
      "Le manguier donne beaucoup de fruits cette année.",
      "Elle mange une glace à la vanille sur la plage.",
      "Le cyclone se forme au-dessus de la mer chaude.",
    ],
  },
  {
    debut: "Le vélo de Tom a un pneu à plat. Il est encore loin de l'école, et la cloche va bientôt sonner.",
    bonne: "Il pousse son vélo en courant sur le trottoir.",
    rates: [
      "La tortue remonte le sable à la nuit tombée.",
      "Mamie prépare un cari pour toute la famille.",
      "Le paille-en-queue niche dans les falaises.",
    ],
  },
  {
    debut: "Sur le sentier, Sarah entend un piaillement. Elle écarte deux branches et découvre un nid tombé par terre.",
    bonne: "Elle le remet doucement dans l'arbre le plus proche.",
    rates: [
      "Les bus sont en grève depuis lundi matin.",
      "Un cyclone dure parfois plusieurs jours.",
      "Le sucre se sépare du jus quand on le chauffe.",
    ],
  },
  {
    debut: "La pirogue de Yann prend l'eau. Il est encore loin du rivage et le vent forcit.",
    bonne: "Il écope avec son seau et rame vers la plage.",
    rates: [
      "Le margouillat mesure une dizaine de centimètres.",
      "Léa colle sa dernière image dans l'album.",
      "La canne à sucre pousse pendant environ un an.",
    ],
  },
  {
    debut: "Malik trouve une clé rouillée dans le jardin. Elle est trop grande pour la porte de la case.",
    bonne: "Il fait le tour de la maison pour chercher la serrure.",
    rates: [
      "Les abeilles butinent pour rapporter du nectar.",
      "Le cari de papa sent bon jusqu'aux chambres.",
      "Une ravine se creuse quand l'eau emporte la terre.",
    ],
  },
  {
    debut: "Amina pose son panier sur le sable et enlève ses chaussures. La mer est basse et le lagon découvert. Quelque chose brille entre deux rochers.",
    bonne: "Elle avance doucement pour voir ce que c'est.",
    rates: [
      "Le manguier peut vivre plus de cent ans.",
      "Le pain sort du four à six heures du matin.",
      "La saison des cyclones dure de novembre à avril.",
    ],
  },
  {
    debut: "Le cahier de Zoé est resté à la maison. La maitresse demande de sortir le travail d'hier, et Zoé ne bouge pas.",
    bonne: "Sa voisine pousse son propre cahier au milieu de la table.",
    rates: [
      "Les abeilles transportent le pollen d'une fleur à l'autre.",
      "Un cyclone se forme au-dessus de la mer chaude.",
      "Le tamarin des hauts pousse entre mille et deux mille mètres.",
    ],
  },
  {
    debut: "Karim court derrière le bus qui démarre. Son cartable glisse de son épaule et tombe sur le trottoir.",
    bonne: "Il s'arrête, ramasse ses affaires et regarde le bus s'éloigner.",
    rates: [
      "La mangue grossit pendant plusieurs semaines.",
      "Le paille-en-queue ne pond qu'un seul œuf.",
      "Les rivières apportent du sel à la mer depuis toujours.",
    ],
  },
  {
    debut: "Rémi entend gratter sous le plancher de la varangue. Il approche l'oreille : le bruit s'arrête, puis reprend de plus belle.",
    bonne: "Il va chercher une lampe pour éclairer dessous.",
    rates: [
      "On cueille la mangue quand elle cède sous le doigt.",
      "La canne à sucre est coupée de juillet à décembre.",
      "Le margouillat peut abandonner sa queue en cas de danger.",
    ],
  },
  {
    debut: "Le vent se lève d'un coup sur la plaine. Le cerf-volant d'Inès monte si haut qu'on le voit à peine.",
    bonne: "Elle serre la ficelle à deux mains et recule d'un pas.",
    rates: [
      "Une ravine est sèche la plupart du temps.",
      "Le sel ne s'évapore pas avec l'eau de mer.",
      "Le manguier fleurit à la fin de l'hiver.",
    ],
  },
];

/* ── Décrire ─────────────────────────────────────────────────────────────── */

type Description = {
  readonly sujet: string;
  readonly bonne: string;
  readonly rates: readonly [string, string, string];
};

const DESCRIPTIONS: readonly Description[] = [
  {
    sujet: "le margouillat de la varangue",
    bonne: "Il est tout petit, gris clair, avec de grands yeux ronds et une longue queue.",
    rates: [
      "Il est arrivé hier et il est reparti ce matin.",
      "Je l'aime bien parce que c'est un margouillat.",
      "Le margouillat est un margouillat de la varangue.",
    ],
  },
  {
    sujet: "la cour de l'école",
    bonne: "Elle est large et grise, avec un préau au fond et deux manguiers dans un coin.",
    rates: [
      "On y va à dix heures et on en revient à dix heures et quart.",
      "C'est une cour, et elle est dans l'école.",
      "J'aime beaucoup la cour de l'école.",
    ],
  },
  {
    sujet: "le marché du samedi",
    bonne: "Les étals débordent de piments rouges, de brèdes vertes et de bananes jaunes.",
    rates: [
      "Le marché du samedi est un marché qui a lieu le samedi.",
      "On y va avec papa et on rentre après.",
      "C'est mon endroit préféré de toute l'île.",
    ],
  },
  {
    sujet: "la pirogue de Yann",
    bonne: "Elle est longue, étroite, peinte en bleu, avec une rame usée posée au fond.",
    rates: [
      "Yann la sort le matin et la rentre le soir.",
      "C'est la pirogue de Yann, elle appartient à Yann.",
      "Je trouve cette pirogue vraiment très jolie.",
    ],
  },
  {
    sujet: "le vieux manguier de la cour",
    bonne: "Son tronc est large et gris, ses branches partent dans tous les sens, et ses feuilles font une ombre épaisse.",
    rates: [
      "Il a été planté il y a très longtemps par quelqu'un.",
      "Le vieux manguier de la cour est un manguier très vieux.",
      "C'est l'arbre que je préfère dans tout le jardin.",
    ],
  },
  {
    sujet: "Mamie quand elle prépare le cari",
    bonne: "Elle porte un tablier bleu délavé, les manches remontées, et une cuillère en bois dans la main droite.",
    rates: [
      "Elle prépare le cari le dimanche, et parfois le samedi.",
      "Mamie est la mère de mon père, et elle habite à côté.",
      "J'adore quand Mamie prépare le cari.",
    ],
  },
  {
    sujet: "la ravine après l'averse",
    bonne: "L'eau brune roule entre les rochers, emporte des branches, et fait un bruit qui couvre les voix.",
    rates: [
      "La ravine est en bas, après le sentier, à droite.",
      "Une ravine, c'est un endroit où l'eau descend quand il pleut.",
      "Il ne faut jamais descendre dans la ravine.",
    ],
  },
  {
    sujet: "le cartable de Malik le premier jour",
    bonne: "Il est bleu marine, tout raide, plus large que ses épaules, avec des bretelles encore trop longues.",
    rates: [
      "Malik l'a eu pour la rentrée et il le garde toute l'année.",
      "C'est le cartable de Malik, celui du premier jour.",
      "Je trouve que son cartable est très bien.",
    ],
  },
  {
    sujet: "le margouillat sous l'ampoule",
    bonne: "Il est immobile, la tête levée, la queue collée au mur, et sa peau claire brille sous la lumière.",
    rates: [
      "Il sort tous les soirs et il repart au matin.",
      "Le margouillat sous l'ampoule est un margouillat qui est sous l'ampoule.",
      "Je n'ai pas peur des margouillats, moi.",
    ],
  },
  {
    sujet: "la classe le matin, avant que tout le monde arrive",
    bonne: "Les chaises sont encore sur les tables, la lumière entre par la grande fenêtre, et le tableau est tout propre.",
    rates: [
      "On y entre à huit heures et on en sort à midi.",
      "La classe le matin, c'est la classe avant que ça commence.",
      "C'est le moment que je préfère de la journée.",
    ],
  },
  {
    sujet: "le marché aux poissons",
    bonne: "Les poissons argentés sont posés sur de la glace, alignés par taille, sous des parasols rouges.",
    rates: [
      "Le marché aux poissons a lieu tous les matins sauf le lundi.",
      "C'est un marché où l'on vend des poissons.",
      "J'aime bien y aller avec mon père.",
    ],
  },
  {
    sujet: "le sentier après la pluie",
    bonne: "La terre est brune et collante, des flaques brillent entre les pierres, et les feuilles gouttent encore.",
    rates: [
      "Il pleut souvent ici, surtout en février.",
      "Le sentier après la pluie est un sentier mouillé.",
      "Je préfère marcher quand il fait sec.",
    ],
  },
];

/* ── Le brouillon ────────────────────────────────────────────────────────── */

const BROUILLONS: readonly { readonly outil: string; readonly sert: string }[] = [
  { outil: "une liste", sert: "à noter en vrac toutes les idées, avant de choisir" },
  { outil: "une carte mentale", sert: "à relier les idées entre elles avec des branches" },
  { outil: "une piste de mots", sert: "à garder sous les yeux les mots qu'on veut employer" },
  { outil: "un ordre numéroté", sert: "à décider dans quel ordre raconter" },
  { outil: "un dessin rapide", sert: "à voir la scène avant de chercher les mots pour la dire" },
  { outil: "une phrase de départ", sert: "à se lancer sans rester devant la page blanche" },
  { outil: "un mot barré", sert: "à garder la trace de ce qu'on a écarté, au cas où" },
  { outil: "une marge laissée vide", sert: "à pouvoir ajouter une idée qui vient plus tard" },
  { outil: "une flèche", sert: "à déplacer une phrase sans la réécrire en entier" },
  { outil: "un titre provisoire", sert: "à se rappeler de quoi le texte doit parler" },
  { outil: "trois mots-clés", sert: "à retenir les idées qu'on ne veut surtout pas oublier" },
];

/* ── Se relire ───────────────────────────────────────────────────────────── */

const RELECTURES: readonly { readonly quoi: string; readonly comment: string }[] = [
  { quoi: "les majuscules et les points", comment: "je regarde le début et la fin de chaque phrase" },
  { quoi: "les accords dans le groupe nominal", comment: "je vérifie que le nom et l'adjectif portent la même marque" },
  { quoi: "l'accord du sujet et du verbe", comment: "je remonte du verbe au sujet et je compte" },
  { quoi: "les mots que je sais écrire", comment: "je compare avec la liste de la classe" },
  { quoi: "l'ordre des idées", comment: "je vérifie que chaque phrase suit la précédente" },
  { quoi: "les répétitions", comment: "je souligne les mots qui reviennent et j'en remplace un par un autre" },
  { quoi: "les connecteurs", comment: "je vérifie qu'un petit mot relie chaque phrase à la précédente" },
  { quoi: "la longueur du texte", comment: "je compte mes phrases : il m'en faut six ou sept" },
  { quoi: "les mots oubliés", comment: "je relis à voix basse : ma bouche bute là où il manque un mot" },
  { quoi: "les temps des verbes", comment: "je vérifie que toute l'histoire est racontée au même moment" },
  { quoi: "les pronoms", comment: "je vérifie qu'on sait toujours de qui parle « il » ou « elle »" },
  { quoi: "le titre", comment: "je relis mon texte et je regarde si le titre lui va toujours" },
];

export const productionEcriteBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_PROD_TRANSFORMER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_transformer_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_transformer",
    difficulty: 3,
    theme: "neutral",
    hint: "Quand le sujet change, plusieurs mots changent avec lui.",
    tags: ["ce1", "production", "transformer", "template"],
    generate: () => {
      const t = randomChoice(TRANSFORMATIONS);
      return {
        text: `Transforme cette phrase ${t.consigne} :\n\n« ${t.modele} »`,
        format: "qcm" as const,
        choices: shuffle([t.transformee, ...t.rates, t.modele]).slice(0, 4),
        expected: [t.transformee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Transformer une phrase modèle, c'est changer un morceau et faire suivre tout ce qui en dépend.",
          "Change d'abord ce qu'on te demande, puis relis la phrase entière en vérifiant chaque accord.",
          `« ${t.modele} » → « ${t.transformee} ». Le sujet a changé, et le verbe a suivi.`,
          `On écrit « ${t.transformee} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_PHRASE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_phrase_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Une phrase a besoin de quelqu'un qui fait, et de quelque chose qui se passe.",
    tags: ["ce1", "production", "phrase", "template"],
    generate: () => {
      const f = randomChoice(FAUSSES_PHRASES);
      const vraies = shuffle(VRAIES_PHRASES).slice(0, 3);
      return {
        text: `Une de ces quatre suites de mots n'est pas une vraie phrase. Laquelle ?\n\n(indice : il y manque un morceau, pas une lettre)`,
        format: "qcm" as const,
        choices: makeChoices(f.texte, vraies),
        expected: [f.texte],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase a une majuscule, un point, un sujet et un verbe. Il suffit qu'un seul manque pour qu'elle boite.",
          "Pose deux questions : qui fait ? et que se passe-t-il ? Puis regarde les deux bouts.",
          `Dans « ${f.texte} », ${f.manque}.`,
          `Ce n'est pas une phrase : ${f.manque}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_prod_phrase_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce qui manque : le sujet, le verbe, ou la ponctuation.",
    tags: ["ce1", "production", "phrase", "template"],
    generate: () => {
      const f = randomChoice(FAUSSES_PHRASES);
      const autres = shuffle(
        [...new Set(FAUSSES_PHRASES.filter((x) => x.manque !== f.manque).map((x) => x.manque))],
      ).slice(0, 3);
      return {
        text: `« ${f.texte} »\n\nCe n'est pas une phrase complète. Qu'est-ce qui manque ?`,
        format: "qcm" as const,
        choices: makeChoices(f.manque, autres),
        expected: [f.manque],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Il faut quatre choses pour faire une phrase : une majuscule, un sujet, un verbe et un point.",
          "Coche-les une par une, dans cet ordre. Le premier manquant est la réponse.",
          `Ici, ${f.manque}.`,
          `Ce qui manque : ${f.manque}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_BROUILLON
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_brouillon_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_brouillon",
    difficulty: 2,
    theme: "neutral",
    hint: "Un brouillon ne se rend pas : il sert à préparer.",
    tags: ["ce1", "production", "brouillon", "template"],
    generate: () => {
      const b = randomChoice(BROUILLONS);
      const autres = BROUILLONS.filter((x) => x.outil !== b.outil).map((x) => x.sert);
      return {
        text: `À quoi sert ${b.outil}, quand on prépare un texte ?`,
        format: "qcm" as const,
        choices: makeChoices(b.sert, autres),
        expected: [b.sert],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le brouillon sert à penser avant d'écrire. On y jette les idées, on les range, puis seulement on rédige.",
          "Commence toujours par vider ta tête sur le brouillon : tu écriras beaucoup mieux ensuite.",
          `${b.outil.charAt(0).toUpperCase() + b.outil.slice(1)} sert ${b.sert}.`,
          `Cela sert ${b.sert}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_prod_brouillon_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_brouillon",
    difficulty: 2,
    theme: "neutral",
    text: "Faut-il faire attention à l'orthographe sur son brouillon ?",
    format: "qcm",
    choices: [
      "Pas encore : le brouillon sert à trouver les idées, on corrige après",
      "Oui, autant que sur la copie",
      "Non, et sur la copie non plus",
      "Seulement pour les noms propres",
    ],
    expected: ["Pas encore : le brouillon sert à trouver les idées, on corrige après"],
    comparator: "mcq_exact",
    hint: "Que se passe-t-il si tu t'arrêtes à chaque mot pour vérifier ?",
    explanation: exp(
      "Le brouillon sert à chercher : les idées d'abord, la forme ensuite.",
      "Écris tes idées d'un trait. Tu relis et tu corriges quand elles sont toutes là.",
      "S'arrêter à chaque mot pour vérifier une lettre fait perdre l'idée qu'on avait en tête. On y revient — mais après.",
      "Pas encore : on corrige après.",
    ),
    tags: ["ce1", "production", "brouillon", "methode", "qcm"],
  },

  /* =========================================================
     CE1_PROD_SUITE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_suite_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_suite",
    difficulty: 3,
    theme: "reunion",
    hint: "La suite doit parler des mêmes personnages, au même endroit.",
    tags: ["ce1", "production", "suite", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      return {
        text: `Lis ce début d'histoire :\n\n« ${s.debut} »\n\nQuelle phrase peut continuer l'histoire ?`,
        format: "qcm" as const,
        choices: shuffle([s.bonne, ...s.rates]),
        expected: [s.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire la suite, c'est rester avec les mêmes personnages, au même endroit, et continuer ce qui a commencé.",
          "Relis la dernière phrase du début et demande-toi : et ensuite, que fait-il ou qu'arrive-t-il ?",
          `« ${s.bonne} » reprend le personnage et l'endroit du début. Les autres phrases sont justes, mais elles racontent une autre histoire.`,
          `La suite est « ${s.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_DESCRIPTION
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_description_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_description",
    difficulty: 3,
    theme: "reunion",
    hint: "Décrire, c'est donner de quoi DESSINER : la taille, la couleur, la forme.",
    tags: ["ce1", "production", "description", "template"],
    generate: () => {
      const d = randomChoice(DESCRIPTIONS);
      return {
        text: `Tu veux décrire ${d.sujet}.\n\nQuelle phrase le décrit vraiment ?`,
        format: "qcm" as const,
        choices: shuffle([d.bonne, ...d.rates]),
        expected: [d.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Décrire, c'est donner assez de détails pour que celui qui lit puisse le dessiner : la taille, la couleur, la forme, ce qu'il y a autour.",
          "Demande-toi : est-ce qu'on pourrait faire un dessin avec cette phrase ?",
          `« ${d.bonne} » donne des détails qu'on peut dessiner. Dire qu'on aime quelque chose, ou répéter son nom, ne le décrit pas.`,
          `La description est « ${d.bonne} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_CONNECTEURS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_connecteurs_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_connecteurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que la seconde phrase fait à la première : elle suit ? elle contredit ?",
    tags: ["ce1", "production", "connecteurs", "template"],
    generate: () => {
      const c = randomChoice(CONNECTEURS);
      return {
        text: `Relie ces deux phrases :\n\n« ${c.avant} ___ ${c.apres} »`,
        format: "qcm" as const,
        choices: makeChoices(c.bon, c.faux),
        expected: [c.bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un connecteur est un petit mot qui relie deux phrases et dit ce qui les lie : le temps, la conséquence, l'opposition.",
          "Lis les deux phrases, puis demande-toi : est-ce que la seconde vient APRÈS, à cause de la première, ou CONTRE elle ?",
          `Ici, « ${c.bon} » convient : ${c.role}.`,
          `Le connecteur est « ${c.bon} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_prod_connecteurs_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_connecteurs",
    difficulty: 2,
    theme: "neutral",
    hint: "Quatre mots pour quatre moments : le premier, la suite, la suite encore, et le dernier.",
    tags: ["ce1", "production", "connecteurs", "template"],
    generate: () => {
      const rang = Math.floor(Math.random() * ORDRE_CONNECTEURS.length);
      const bon = ORDRE_CONNECTEURS[rang];
      const place = ["la PREMIÈRE", "la DEUXIÈME", "la TROISIÈME", "la DERNIÈRE"][rang];
      return {
        text: `Tu racontes une recette en quatre étapes. Quel mot annonce ${place} étape ?`,
        format: "qcm" as const,
        choices: shuffle([...ORDRE_CONNECTEURS]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour ranger un texte dans le temps, on emploie des connecteurs d'ordre : d'abord, ensuite, puis, enfin.",
          "Écris-les dans la marge de ton brouillon avant de rédiger : ils tiennent le texte tout seuls.",
          `D'abord, ensuite, puis, enfin : « ${bon} » annonce ${place} étape.`,
          `Le mot est « ${bon} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_TEXTE_SEPT_PHRASES — le repère du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_prod_texte_sept_phrases_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_texte_sept_phrases",
    difficulty: 2,
    theme: "neutral",
    text: "En fin de CE1, quelle longueur de texte doit-on savoir écrire tout seul ?",
    format: "qcm",
    choices: [
      "Six ou sept phrases qui vont ensemble",
      "Une seule phrase",
      "Deux pages entières",
      "Vingt phrases",
    ],
    expected: ["Six ou sept phrases qui vont ensemble"],
    comparator: "mcq_exact",
    hint: "Ce n'est pas la longueur qui compte le plus, c'est le fil entre les phrases.",
    explanation: exp(
      "Le programme du CE1 demande un texte de six ou sept phrases, cohérent : les phrases doivent se suivre et parler de la même chose.",
      "Prépare tes six idées au brouillon, puis écris une phrase par idée, en les reliant.",
      "Six phrases justes qui parlent chacune d'autre chose ne font pas un texte. C'est le fil entre elles qui fait le texte.",
      "Six ou sept phrases qui vont ensemble.",
    ),
    tags: ["ce1", "production", "texte", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_prod_texte_sept_phrases_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_texte_sept_phrases",
    difficulty: 3,
    theme: "reunion",
    hint: "Une phrase parle d'autre chose que les autres : elle casse le fil.",
    tags: ["ce1", "production", "texte", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      const intrus = randomChoice(s.rates);
      return {
        text: `Voici un texte :\n\n« ${s.debut} ${s.bonne} ${intrus} »\n\nQuelle phrase casse le fil du texte ?`,
        format: "qcm" as const,
        choices: shuffle([
          intrus,
          s.bonne,
          s.debut.split(". ")[0] + ".",
          s.debut.split(". ")[1] + ".",
        ]),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte cohérent parle des mêmes personnages, au même endroit, et chaque phrase suit la précédente.",
          "Relis phrase après phrase en te demandant : est-ce qu'on parle toujours de la même chose ?",
          `« ${intrus} » est une phrase parfaitement correcte, et elle n'a rien à faire ici : elle parle d'autre chose.`,
          `La phrase qui casse le fil est « ${intrus} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_REVISER
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_reviser_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_reviser",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne relit pas tout en même temps : une chose à la fois.",
    tags: ["ce1", "production", "reviser", "template"],
    generate: () => {
      const r = randomChoice(RELECTURES);
      const autres = RELECTURES.filter((x) => x.quoi !== r.quoi).map((x) => x.comment);
      return {
        text: `Tu te relis pour vérifier ${r.quoi}. Comment fais-tu ?`,
        format: "qcm" as const,
        choices: makeChoices(r.comment, autres),
        expected: [r.comment],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se relire, ce n'est pas relire au hasard : c'est chercher UNE chose précise à chaque passage.",
          "Fais plusieurs passages courts plutôt qu'un seul long : les majuscules, puis les accords, puis les mots.",
          `Pour ${r.quoi} : ${r.comment}.`,
          `On fait ainsi : ${r.comment}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_PROD_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_prod_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_defi",
    difficulty: 3,
    theme: "reunion",
    hint: "Deux choses : la phrase doit continuer l'histoire, ET être une vraie phrase.",
    tags: ["ce1", "production", "defi", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      const f = randomChoice(FAUSSES_PHRASES);
      return {
        text: `« ${s.debut} »\n\nQuelle phrase continue l'histoire ET est une phrase complète ?`,
        format: "qcm" as const,
        choices: shuffle([s.bonne, f.texte, s.rates[0], s.rates[1]]),
        expected: [s.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une bonne suite doit répondre à deux exigences à la fois : continuer l'histoire, et tenir debout toute seule.",
          "Vérifie d'abord que la phrase est complète, ensuite qu'elle parle bien des mêmes personnages.",
          `« ${s.bonne} » a son sujet, son verbe et son point, et elle reprend le personnage du début. « ${f.texte} » : ${f.manque}. Les autres racontent une histoire différente.`,
          `La bonne suite est « ${s.bonne} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_prod_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce1_prod_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Le margouillat grimpe. Les mangues sont mûres. Papa répare le vélo. Il pleut sur le piton. »\n\nCes quatre phrases sont justes, et pourtant ce n'est pas un texte. Qu'est-ce qui manque ?",
    format: "qcm",
    choices: [
      "Le fil : elles ne parlent pas de la même chose, et rien ne les relie.",
      // L'erreur réelle : croire qu'un texte, c'est une question de quantité.
      "Des phrases : quatre, ce n'est pas assez pour faire un texte.",
      "Les majuscules et les points.",
      "Un titre.",
    ],
    expected: ["Le fil : elles ne parlent pas de la même chose, et rien ne les relie."],
    comparator: "mcq_exact",
    hint: "Est-ce que ces phrases parlent de la même chose ?",
    explanation: exp(
      "Un texte n'est pas une pile de phrases justes : c'est une suite de phrases qui parlent de la même chose et se répondent.",
      "Relis phrase après phrase en te demandant : celle-ci vient-elle de la précédente ?",
      "Chacune de ces quatre phrases est correcte, et elles ne se connaissent pas. Il manque le fil : les mêmes personnages, le même endroit, et des connecteurs pour relier.",
      "Il manque le fil entre les phrases : elles ne parlent pas de la même chose.",
    ),
    tags: ["ce1", "production", "defi", "piege", "qcm"],
  },
];
