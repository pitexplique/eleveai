// lib/tutor-v4/questionBank/ce2/francais/comprehension-lecture.bank.ts
//
// La compréhension de textes au CE2.
//
// CE QU'ELLE REMPLACE : DEUX textes, pour tout le cycle 2 et pour les trois
// classes — « Tom est dans le jardin… » et « Lea va a l'ecole… », cette dernière
// avec trois fautes dans une phrase de lecture. Onze micro-compétences se
// partageaient quatre questions, les mêmes qu'au CP.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — lire en autonomie un texte narratif, poétique, documentaire ou théâtral ;
//   — relever des informations explicites ;
//   — se repérer dans la CHAINE ANAPHORIQUE ;
//   — faire une inférence à partir d'indices du texte ET de ses propres
//     connaissances — le BO ajoute les connaissances au CE2 ;
//   — retrouver l'ordre des évènements ;
//   — revenir au texte pour lever une ambigüité ;
//   — donner un titre ; se servir des titres, sous-titres et paragraphes ;
//   — élucider un mot inconnu par le contexte ou par sa forme ;
//   — résumer un texte court.
//
// ⚠️ LA COMPRÉHENSION NE SE GÉNÈRE PAS : ELLE SE CORPUS. Douze textes étiquetés
// donnent douze questions par micro-compétence, pas une de plus. C'est le
// plafond de la notion, et il est assumé — mieux vaut douze bons textes que
// mille phrases fabriquées qui ne veulent rien dire.
//
// ⚠️ SUR LA LONGUEUR. Le BO parle d'« une vingtaine de lignes » lues en
// autonomie. Ces textes-là font sept ou huit phrases : c'est le format d'un
// écran, entre deux questions, et non celui d'une séance de lecture sur papier.
// Le CP avait fait le même choix, un cran plus bas. La vingtaine de lignes reste
// le travail du professeur, en classe, avec le texte sous les yeux.
//
// LES TROIS PIÈGES, et le BO les met en avant aux trois niveaux du cycle :
//   — la CHAINE ANAPHORIQUE : « il » ne renvoie pas au dernier nom cité, mais à
//     celui dont on parle ;
//   — l'INFÉRENCE : ce qui est vrai sans être écrit ;
//   — au CE2 s'ajoute l'AMBIGÜITÉ : quand deux lectures sont possibles, on
//     retourne au texte au lieu de choisir la plus probable.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

function choix(correct: string, ...reserves: readonly (readonly string[])[]): string[] {
  const vus = new Set<string>([correct]);
  const faux: string[] = [];
  for (const mot of shuffle(reserves.flat())) {
    if (vus.has(mot)) continue;
    vus.add(mot);
    faux.push(mot);
    if (faux.length === 3) break;
  }
  return shuffle([correct, ...faux]);
}

function exp(definition: string, methode: string, exemple: string, conclusion: string) {
  return `Définition : ${definition}

Méthode : ${methode}

Exemple : ${exemple}

Conclusion : ${conclusion}`;
}

/* ═══════════════════════════════════════════════════════════════════════════
   LE CORPUS

   Chaque texte est étiqueté à la main sur dix entrées. C'est long à écrire, et
   c'est la seule façon d'avoir des questions qui portent vraiment sur CE
   texte-là.
   ═══════════════════════════════════════════════════════════════════════════ */

type Texte = {
  readonly titre: string;
  readonly texte: string;
  readonly personnage: string;
  readonly lieu: string;
  readonly moment: string;
  /** Une information écrite noir sur blanc dans le texte. */
  readonly info: { readonly q: string; readonly r: string; readonly faux: readonly string[] };
  /** ⚠️ `contexte` cite le morceau de phrase : un « il » tout seul se retrouve
   *  souvent trois fois dans un texte, et la question serait ambigüe. */
  readonly anaphore: {
    readonly contexte: string;
    readonly referent: string;
    readonly faux: readonly string[];
  };
  readonly inference: {
    readonly conclusion: string;
    readonly indice: string;
    readonly faux: readonly string[];
  };
  /** L'inférence qui demande de mobiliser ce qu'on sait DÉJÀ, hors du texte. */
  readonly connaissance: {
    readonly q: string;
    readonly r: string;
    readonly faux: readonly string[];
  };
  /** Trois évènements, dans l'ordre du texte. */
  readonly chronologie: readonly string[];
  /** Une question dont la réponse ne se devine pas : il faut retourner au texte. */
  readonly preuve: { readonly q: string; readonly phrase: string };
  readonly motInconnu: {
    readonly mot: string;
    readonly sens: string;
    readonly faux: readonly string[];
  };
  readonly resume: string;
  readonly titresFaux: readonly string[];
};

const TEXTES: readonly Texte[] = [
  {
    titre: "Le marché du samedi",
    texte:
      "Le samedi matin, Léa accompagne sa grand-mère au marché de Saint-Pierre. Elles arrivent tôt, quand les étals sentent encore le carton mouillé. Léa aime regarder les pyramides de letchis rouges. Sa grand-mère, elle, va droit vers le marchand d'épices. « Il me faut du curcuma pour le cari », lui dit-elle. Le marchand lui tend un sachet jaune vif sans même le peser. Léa remarque qu'il ne compte pas la monnaie : il connait sa cliente depuis des années. Elles repartent les bras chargés, avant que le soleil ne devienne trop dur.",
    personnage: "Léa",
    lieu: "au marché de Saint-Pierre",
    moment: "le samedi matin",
    info: {
      q: "Que vient chercher la grand-mère de Léa ?",
      r: "du curcuma",
      faux: ["des letchis", "un panier neuf", "du poisson"],
    },
    anaphore: {
      contexte: "il ne compte pas la monnaie",
      referent: "le marchand d'épices",
      faux: ["Léa", "la grand-mère", "le curcuma"],
    },
    inference: {
      conclusion: "la grand-mère vient souvent à ce marché",
      indice: "il connait sa cliente depuis des années",
      faux: [
        "c'est la première fois qu'elles viennent",
        "le marchand s'est trompé de sachet",
        "Léa n'aime pas le marché",
      ],
    },
    connaissance: {
      q: "Pourquoi repartent-elles avant que le soleil ne devienne trop dur ?",
      r: "parce qu'il fait très chaud au milieu de la journée",
      faux: [
        "parce que le marché ferme à huit heures",
        "parce qu'elles ont oublié leur argent",
        "parce qu'il va pleuvoir",
      ],
    },
    chronologie: [
      "Léa et sa grand-mère arrivent au marché de bonne heure.",
      "Le marchand tend un sachet de curcuma.",
      "Elles repartent les bras chargés.",
    ],
    preuve: {
      q: "Comment sait-on que la grand-mère est une cliente habituelle ?",
      phrase: "il connait sa cliente depuis des années",
    },
    motInconnu: {
      mot: "étals",
      sens: "les tables où les marchands posent leurs produits",
      faux: ["les allées entre les marchands", "les sacs des clients", "les prix affichés"],
    },
    resume: "Léa accompagne sa grand-mère au marché, où elles achètent des épices pour le cari.",
    titresFaux: ["Une journée à la plage", "Le cari de mamie brulé", "Léa perd son porte-monnaie"],
  },
  {
    titre: "L'orage sur le piton",
    texte:
      "Tom et son père partent marcher vers le piton dès six heures. Le ciel est clair, mais le père glisse quand même deux coupe-vent dans le sac. À mi-chemin, un nuage épais avale le sommet. Tom veut continuer ; son père s'arrête et regarde longuement vers l'ouest. « On redescend », décide-t-il. Tom rouspète pendant dix minutes. Puis la pluie arrive, si drue qu'ils ne voient plus le sentier à trois pas. Ils rentrent trempés, et Tom ne dit plus rien.",
    personnage: "Tom",
    lieu: "sur le sentier du piton",
    moment: "dès six heures du matin",
    info: {
      q: "Qu'est-ce que le père glisse dans le sac avant de partir ?",
      r: "deux coupe-vent",
      faux: ["deux gourdes", "une carte du sentier", "des sandwichs"],
    },
    anaphore: {
      contexte: "décide-t-il",
      referent: "le père de Tom",
      faux: ["Tom", "le nuage", "le sentier"],
    },
    inference: {
      conclusion: "le père avait deviné que le temps allait tourner",
      indice: "il glisse quand même deux coupe-vent dans le sac",
      faux: [
        "le père voulait rentrer parce qu'il était fatigué",
        "Tom avait oublié ses chaussures",
        "le sentier était fermé ce jour-là",
      ],
    },
    connaissance: {
      q: "Pourquoi Tom ne dit-il plus rien en rentrant ?",
      r: "parce qu'il comprend que son père avait raison",
      faux: [
        "parce qu'il a perdu sa voix sous la pluie",
        "parce qu'il n'aime pas marcher",
        "parce qu'il est arrivé au sommet",
      ],
    },
    chronologie: [
      "Tom et son père partent vers le piton.",
      "Un nuage épais avale le sommet.",
      "Ils rentrent trempés par la pluie.",
    ],
    preuve: {
      q: "Qu'est-ce qui montre que la pluie était très forte ?",
      phrase: "si drue qu'ils ne voient plus le sentier à trois pas",
    },
    motInconnu: {
      mot: "drue",
      sens: "épaisse et serrée",
      faux: ["tiède et agréable", "rare et fine", "attendue depuis longtemps"],
    },
    resume: "Tom et son père renoncent à monter au piton parce que l'orage arrive.",
    titresFaux: ["Le sommet enfin atteint", "Une nuit sous la tente", "Tom apprend à nager"],
  },
  {
    titre: "La panne du bus",
    texte:
      "Le bus scolaire s'arrête au milieu de la montée, dans un grand soupir. Le chauffeur descend, ouvre le capot, et une fumée blanche s'en échappe. Les élèves collent leur nez aux vitres. Karim, lui, sort son carnet et note l'heure. La maitresse téléphone au collège pour prévenir. Un deuxième bus arrive vingt minutes plus tard. Quand ils arrivent enfin, la sonnerie de la récréation a déjà retenti.",
    personnage: "Karim",
    lieu: "dans le bus scolaire, au milieu de la montée",
    moment: "le matin, avant l'arrivée à l'école",
    info: {
      q: "Que fait Karim pendant la panne ?",
      r: "il note l'heure sur son carnet",
      faux: ["il aide le chauffeur", "il descend du bus", "il téléphone au collège"],
    },
    anaphore: {
      contexte: "une fumée blanche s'en échappe",
      referent: "le capot du bus",
      faux: ["le carnet de Karim", "le collège", "le deuxième bus"],
    },
    inference: {
      conclusion: "le moteur du bus a surchauffé",
      indice: "une fumée blanche s'en échappe",
      faux: [
        "le chauffeur a fait exprès de s'arrêter",
        "les élèves ont cassé une vitre",
        "il n'y avait plus d'essence",
      ],
    },
    connaissance: {
      q: "Pourquoi la maitresse téléphone-t-elle au collège ?",
      r: "pour prévenir que la classe arrivera en retard",
      faux: [
        "pour demander un nouveau chauffeur à la mairie",
        "pour annuler la journée de classe",
        "pour commander un autre bus scolaire à Paris",
      ],
    },
    chronologie: [
      "Le bus s'arrête au milieu de la montée.",
      "La maitresse téléphone au collège.",
      "La classe arrive après la sonnerie.",
    ],
    preuve: {
      q: "Comment sait-on qu'ils sont arrivés en retard ?",
      phrase: "la sonnerie de la récréation a déjà retenti",
    },
    motInconnu: {
      mot: "retenti",
      sens: "sonné fort, résonné",
      faux: ["été réparé", "été oublié", "été annulé"],
    },
    resume: "Le bus scolaire tombe en panne et la classe arrive en retard à l'école.",
    titresFaux: ["La sortie au musée", "Karim change d'école", "Une récréation sans fin"],
  },
  {
    titre: "Le nid dans le filao",
    texte:
      "Depuis trois jours, Nina observe un couple d'oiseaux dans le filao de la cour. Ils font des allers-retours avec des brindilles dans le bec. Elle a d'abord cru qu'ils jouaient. Puis elle a vu la petite coupe d'herbes sèches se former entre deux branches. Nina n'approche plus de l'arbre et demande aux autres de faire pareil. Le maitre lui a prêté des jumelles. Ce matin, elle a compté trois œufs bleu pâle.",
    personnage: "Nina",
    lieu: "dans la cour de l'école, près du filao",
    moment: "depuis trois jours",
    info: {
      q: "Qu'est-ce que Nina a compté ce matin ?",
      r: "trois œufs bleu pâle",
      faux: ["trois oiseaux", "trois brindilles", "trois branches"],
    },
    anaphore: {
      contexte: "Ils font des allers-retours",
      referent: "le couple d'oiseaux",
      faux: ["Nina et le maitre", "les autres élèves", "les brindilles"],
    },
    inference: {
      conclusion: "les oiseaux construisaient un nid",
      indice: "la petite coupe d'herbes sèches se former entre deux branches",
      faux: [
        "les oiseaux cherchaient à manger",
        "les oiseaux voulaient quitter la cour",
        "les oiseaux avaient peur des élèves",
      ],
    },
    connaissance: {
      q: "Pourquoi Nina demande-t-elle aux autres de ne plus approcher ?",
      r: "pour ne pas déranger les oiseaux et leurs œufs",
      faux: [
        "parce que l'arbre est dangereux à escalader",
        "parce que le maitre l'a interdit",
        "parce qu'elle veut garder le filao pour elle",
      ],
    },
    chronologie: [
      "Nina voit deux oiseaux faire des allers-retours.",
      "Une coupe d'herbes sèches apparait entre deux branches.",
      "Nina compte trois œufs.",
    ],
    preuve: {
      q: "Qu'est-ce qui a fait comprendre à Nina qu'il s'agissait d'un nid ?",
      phrase: "elle a vu la petite coupe d'herbes sèches se former entre deux branches",
    },
    motInconnu: {
      mot: "brindilles",
      sens: "de tout petits morceaux de branches",
      faux: ["des graines à manger", "des plumes tombées", "des gouttes de pluie"],
    },
    resume: "Nina découvre un nid dans le filao de la cour et protège les oiseaux.",
    titresFaux: ["La cour est repeinte", "Nina perd ses jumelles", "Un arbre à couper"],
  },
  {
    titre: "Le cari de mamie",
    texte:
      "Mamie ne mesure rien. Elle jette les oignons dans la marmite quand l'huile chante, et pas avant. Elle ajoute le curcuma, puis le poulet, et remue longtemps sans rien dire. Sofia, assise sur le tabouret, compte les tours de cuillère. « Tu mets combien de sel ? » demande-t-elle. Mamie hausse les épaules : « Je le vois. » Le cari mijote jusqu'à midi. Personne, dans la famille, n'a jamais réussi à le refaire pareil.",
    personnage: "Mamie",
    lieu: "dans la cuisine",
    moment: "jusqu'à midi",
    info: {
      q: "Que fait Sofia pendant que mamie cuisine ?",
      r: "elle compte les tours de cuillère",
      faux: ["elle épluche les oignons", "elle mesure le sel", "elle met la table"],
    },
    anaphore: {
      contexte: "Je le vois",
      referent: "le sel qu'il faut mettre",
      faux: ["le poulet", "le tabouret", "le curcuma"],
    },
    inference: {
      conclusion: "mamie cuisine à l'habitude, sans recette",
      indice: "Mamie ne mesure rien",
      faux: [
        "mamie suit un livre de cuisine",
        "mamie a oublié la recette",
        "mamie n'aime pas le cari",
      ],
    },
    connaissance: {
      q: "Pourquoi personne n'arrive-t-il à refaire le cari pareil ?",
      r: "parce que mamie ne donne aucune quantité précise",
      faux: [
        "parce que mamie cache la marmite",
        "parce que les épices sont introuvables",
        "parce que le cari est trop long à cuire",
      ],
    },
    chronologie: [
      "Mamie jette les oignons quand l'huile chante.",
      "Elle ajoute le curcuma puis le poulet.",
      "Le cari mijote jusqu'à midi.",
    ],
    preuve: {
      q: "Comment sait-on que mamie ne pèse pas ses ingrédients ?",
      phrase: "Mamie ne mesure rien",
    },
    motInconnu: {
      mot: "mijote",
      sens: "cuit doucement, à petit feu",
      faux: ["brule très vite", "refroidit sur la table", "attend au réfrigérateur"],
    },
    resume: "Mamie prépare son cari sans rien mesurer, et personne ne sait le refaire pareil.",
    titresFaux: ["Sofia apprend à lire", "La marmite cassée", "Le marché aux épices"],
  },
  {
    titre: "Le margouillat de la classe",
    texte:
      "Il vit derrière l'affiche des saisons, au fond de la classe. Personne ne l'a invité. Le premier jour, trois élèves ont crié ; le lendemain, plus personne. Il sort quand la lumière s'allume, reste immobile un long moment, puis attrape une mouche d'un coup de langue. Le maitre l'a appelé Ferdinand. Depuis, chaque matin, un élève différent vérifie qu'il est toujours là. Ferdinand, lui, ne s'occupe de personne.",
    personnage: "Ferdinand le margouillat",
    lieu: "au fond de la classe, derrière l'affiche des saisons",
    moment: "chaque matin",
    info: {
      q: "Où vit le margouillat ?",
      r: "derrière l'affiche des saisons",
      faux: ["sous le bureau du maitre", "dans la cour", "au-dessus de la porte"],
    },
    anaphore: {
      contexte: "Personne ne l'a invité",
      referent: "le margouillat",
      faux: ["le maitre", "l'affiche des saisons", "un élève"],
    },
    inference: {
      conclusion: "les élèves se sont habitués à lui",
      indice: "le lendemain, plus personne",
      faux: [
        "les élèves ont fini par le chasser",
        "le margouillat a peur des enfants",
        "le maitre a enlevé l'affiche",
      ],
    },
    connaissance: {
      q: "Pourquoi le margouillat sort-il quand la lumière s'allume ?",
      r: "parce que la lumière attire les insectes dont il se nourrit",
      faux: [
        "parce qu'il a froid dans le noir",
        "parce qu'il veut voir les élèves",
        "parce qu'il cherche la sortie",
      ],
    },
    chronologie: [
      "Le premier jour, trois élèves crient.",
      "Le maitre l'appelle Ferdinand.",
      "Chaque matin, un élève vérifie qu'il est là.",
    ],
    preuve: {
      q: "Qu'est-ce qui montre que le margouillat chasse ?",
      phrase: "attrape une mouche d'un coup de langue",
    },
    motInconnu: {
      mot: "immobile",
      sens: "sans bouger du tout",
      faux: ["très rapide", "impossible à voir", "couché sur le dos"],
    },
    resume: "Un margouillat s'installe dans la classe et les élèves finissent par l'adopter.",
    titresFaux: ["La classe déménage", "Une affiche déchirée", "Le maitre est absent"],
  },
  {
    titre: "Les filets de Yann",
    texte:
      "Yann répare ses filets sur le sable, assis en tailleur. Ses doigts vont vite, sans qu'il ait besoin de regarder. Un enfant s'approche et demande combien de temps ça prend. « Ça dépend du trou », répond Yann. Il explique que la mer arrache toujours au même endroit, là où le filet frotte contre les rochers. Le soleil descend. Yann plie le filet en quatre, le charge sur l'épaule et rentre. Demain, il sortira avant l'aube.",
    personnage: "Yann",
    lieu: "sur le sable, au bord de la mer",
    moment: "en fin d'après-midi, quand le soleil descend",
    info: {
      q: "Que fait Yann sur le sable ?",
      r: "il répare ses filets",
      faux: ["il compte ses poissons", "il attend un bateau", "il apprend à nager à un enfant"],
    },
    anaphore: {
      contexte: "le charge sur l'épaule",
      referent: "le filet plié",
      faux: ["l'enfant", "le sable", "le rocher"],
    },
    inference: {
      conclusion: "Yann fait ce travail depuis longtemps",
      indice: "Ses doigts vont vite, sans qu'il ait besoin de regarder",
      faux: [
        "Yann apprend à réparer les filets",
        "Yann s'est blessé aux doigts",
        "Yann va changer de métier",
      ],
    },
    connaissance: {
      q: "Pourquoi Yann sortira-t-il avant l'aube ?",
      r: "parce que les pêcheurs partent tôt, avant le lever du soleil",
      faux: [
        "parce que la mer est fermée dans la journée",
        "parce qu'il n'aime pas la chaleur du sable",
        "parce que l'enfant l'accompagnera",
      ],
    },
    chronologie: [
      "Yann répare ses filets sur le sable.",
      "Un enfant s'approche et pose une question.",
      "Yann plie le filet et rentre.",
    ],
    preuve: {
      q: "Pourquoi la mer abime-t-elle toujours le filet au même endroit ?",
      phrase: "là où le filet frotte contre les rochers",
    },
    motInconnu: {
      mot: "l'aube",
      sens: "le tout début du jour, avant le lever du soleil",
      faux: ["le milieu de la nuit", "la fin de l'après-midi", "l'heure du repas"],
    },
    resume: "Yann répare ses filets sur la plage et explique à un enfant pourquoi ils s'abiment.",
    titresFaux: ["Une pêche miraculeuse", "L'enfant apprend à nager", "Le bateau perdu"],
  },
  {
    titre: "La lettre de la cousine",
    texte:
      "Une enveloppe est arrivée de métropole, avec un timbre que Léo ne connait pas. Sa cousine y raconte la neige, les gants, le froid qui pique le nez. Léo relit trois fois le passage où elle explique qu'il fait nuit à cinq heures. Il essaie d'imaginer, mais n'y arrive pas très bien. Il court chercher un crayon et commence sa réponse. Il veut lui raconter les letchis, et surtout les cyclones. Il se dit qu'elle non plus n'arrivera pas à imaginer.",
    personnage: "Léo",
    lieu: "à la maison",
    moment: "le jour où la lettre arrive",
    info: {
      q: "De quoi la cousine parle-t-elle dans sa lettre ?",
      r: "de la neige et du froid",
      faux: ["de son école", "de son anniversaire", "d'un voyage en bateau"],
    },
    anaphore: {
      contexte: "elle explique qu'il fait nuit à cinq heures",
      referent: "la cousine de Léo",
      faux: ["la lettre", "l'enveloppe", "la neige"],
    },
    inference: {
      conclusion: "Léo n'a jamais vu la neige",
      indice: "Il essaie d'imaginer, mais n'y arrive pas très bien",
      faux: [
        "Léo a déjà passé un hiver en métropole",
        "Léo n'aime pas sa cousine",
        "Léo trouve la lettre trop courte",
      ],
    },
    connaissance: {
      q: "Pourquoi Léo pense-t-il que sa cousine n'arrivera pas à imaginer les cyclones ?",
      r: "parce qu'il n'y en a pas là où elle habite",
      faux: [
        "parce qu'elle est trop jeune pour comprendre",
        "parce qu'il n'a pas assez de place sur sa feuille",
        "parce qu'elle ne sait pas encore lire",
      ],
    },
    chronologie: [
      "Une enveloppe arrive de métropole.",
      "Léo relit trois fois le même passage.",
      "Léo commence sa réponse.",
    ],
    preuve: {
      q: "Quel passage Léo relit-il plusieurs fois ?",
      phrase: "elle explique qu'il fait nuit à cinq heures",
    },
    motInconnu: {
      mot: "métropole",
      sens: "la France continentale, en Europe",
      faux: ["une très grande ville de l'ile", "un pays voisin de Madagascar", "un quartier du port"],
    },
    resume: "Léo reçoit une lettre de sa cousine sur la neige, et lui répond en parlant des cyclones.",
    titresFaux: ["Le voyage de Léo", "Une cousine à la plage", "Le facteur se trompe"],
  },
  {
    titre: "La récréation sans ballon",
    texte:
      "Le ballon a fini sur le toit du préau lundi matin. Personne n'a osé le dire au directeur. Pendant deux jours, la cour a été bizarrement calme. Puis Sofia a tracé une marelle à la craie, et une file s'est formée derrière elle. Mercredi, deux autres marelles étaient apparues, plus compliquées. Quand le concierge a fini par descendre le ballon, jeudi, il est resté dans un coin. Personne n'y a touché avant la fin de la semaine.",
    personnage: "Sofia",
    lieu: "dans la cour de récréation",
    moment: "du lundi au jeudi",
    info: {
      q: "Qu'a fait Sofia pendant la récréation ?",
      r: "elle a tracé une marelle à la craie",
      faux: [
        "elle a récupéré le ballon sur le toit",
        "elle a prévenu le directeur",
        "elle a aidé le concierge",
      ],
    },
    anaphore: {
      contexte: "il est resté dans un coin",
      referent: "le ballon",
      faux: ["le concierge", "le directeur", "le préau"],
    },
    inference: {
      conclusion: "les élèves ont fini par préférer la marelle",
      indice: "Personne n'y a touché avant la fin de la semaine",
      faux: [
        "le ballon était crevé",
        "le directeur a interdit le ballon",
        "les élèves n'ont pas vu que le ballon était revenu",
      ],
    },
    connaissance: {
      q: "Pourquoi personne n'a-t-il osé prévenir le directeur ?",
      r: "parce qu'ils avaient peur d'être punis",
      faux: [
        "parce que le directeur était en voyage",
        "parce qu'ils ne connaissaient pas son bureau",
        "parce que la cour était fermée",
      ],
    },
    chronologie: [
      "Le ballon finit sur le toit du préau.",
      "Sofia trace une marelle à la craie.",
      "Le concierge descend le ballon.",
    ],
    preuve: {
      q: "Comment sait-on que les marelles ont eu du succès ?",
      phrase: "une file s'est formée derrière elle",
    },
    motInconnu: {
      mot: "préau",
      sens: "la partie couverte de la cour",
      faux: ["le bureau du directeur", "le portail de l'école", "la salle de classe"],
    },
    resume: "Privés de ballon, les élèves inventent des marelles et finissent par les préférer.",
    titresFaux: ["Le tournoi de football", "Le directeur en colère", "Sofia change d'école"],
  },
  {
    titre: "Le manguier de la cour",
    texte:
      "Le manguier a été planté l'année où l'école a ouvert. Il donne de l'ombre à toute la cour du bas. En novembre, les mangues tombent d'un coup, souvent la nuit. Le matin, les grands ramassent les meilleures avant l'arrivée des petits. Cette année, la maitresse a posé une caisse au pied de l'arbre, avec une règle écrite dessus. Depuis, chacun prend une mangue et pas deux. La caisse se vide quand même avant dix heures.",
    personnage: "la maitresse",
    lieu: "dans la cour du bas, sous le manguier",
    moment: "en novembre",
    info: {
      q: "Qu'a posé la maitresse au pied de l'arbre ?",
      r: "une caisse avec une règle écrite dessus",
      faux: ["un filet pour attraper les mangues", "un banc pour les petits", "un panneau d'interdiction"],
    },
    anaphore: {
      contexte: "Il donne de l'ombre à toute la cour du bas",
      referent: "le manguier",
      faux: ["le matin", "le directeur", "le portail"],
    },
    inference: {
      conclusion: "avant, les petits n'avaient jamais de mangues",
      indice: "les grands ramassent les meilleures avant l'arrivée des petits",
      faux: [
        "les petits n'aimaient pas les mangues",
        "l'arbre ne donnait pas de fruits",
        "la maitresse cueillait les mangues elle-même",
      ],
    },
    connaissance: {
      q: "Pourquoi les mangues tombent-elles surtout la nuit ?",
      r: "parce que le vent souffle et qu'elles sont mûres",
      faux: [
        "parce que les élèves les secouent le soir",
        "parce qu'il fait plus froid la nuit sur l'ile",
        "parce que l'arbre dort la journée",
      ],
    },
    chronologie: [
      "Le manguier est planté l'année de l'ouverture de l'école.",
      "La maitresse pose une caisse au pied de l'arbre.",
      "Chacun prend une mangue et pas deux.",
    ],
    preuve: {
      q: "Qu'est-ce qui montre que la caisse ne suffit pas ?",
      phrase: "La caisse se vide quand même avant dix heures",
    },
    motInconnu: {
      mot: "l'ombre",
      sens: "l'endroit où le soleil ne tape pas",
      faux: ["l'odeur des fruits", "la hauteur de l'arbre", "le bruit des feuilles"],
    },
    resume: "Une caisse et une règle permettent enfin aux petits d'avoir des mangues.",
    titresFaux: ["L'arbre est abattu", "La récolte de letchis", "Un orage dans la cour"],
  },
  {
    titre: "Le cahier oublié",
    texte:
      "Karim s'aperçoit dans le bus que son cahier de poésie est resté sur la table de la cuisine. Il doit réciter ce matin. Il essaie de se rappeler le premier vers, puis le deuxième. À l'école, il demande à trois camarades ; aucun n'a le même poème. Alors il s'assied contre le mur et récite tout bas, les yeux fermés. Quand la maitresse l'appelle, il se lève sans son cahier. Il n'oublie qu'un seul mot.",
    personnage: "Karim",
    lieu: "dans le bus, puis à l'école",
    moment: "le matin de la récitation",
    info: {
      q: "Où Karim a-t-il oublié son cahier ?",
      r: "sur la table de la cuisine",
      faux: ["dans le bus", "chez un camarade", "dans la cour de l'école"],
    },
    anaphore: {
      contexte: "aucun n'a le même poème",
      referent: "les trois camarades de Karim",
      faux: ["les élèves de la classe", "la maitresse", "les cahiers de poésie"],
    },
    inference: {
      conclusion: "Karim avait bien appris sa poésie",
      indice: "Il n'oublie qu'un seul mot",
      faux: [
        "Karim a lu le poème dans le bus",
        "un camarade lui a prêté son cahier",
        "la maitresse l'a dispensé de réciter",
      ],
    },
    connaissance: {
      q: "Pourquoi Karim s'assied-il contre le mur et ferme-t-il les yeux ?",
      r: "pour se concentrer et retrouver le poème dans sa tête",
      faux: [
        "parce qu'il est fatigué du voyage",
        "parce qu'il ne veut pas voir la maitresse",
        "parce qu'il a mal à la tête",
      ],
    },
    chronologie: [
      "Karim s'aperçoit dans le bus qu'il a oublié son cahier.",
      "Il demande à trois camarades à l'école.",
      "Il récite devant la classe sans son cahier.",
    ],
    preuve: {
      q: "Comment sait-on que Karim s'en est presque parfaitement sorti ?",
      phrase: "Il n'oublie qu'un seul mot",
    },
    motInconnu: {
      mot: "réciter",
      sens: "dire par cœur, à voix haute",
      faux: ["recopier au tableau", "chanter en groupe", "corriger les fautes"],
    },
    resume: "Karim oublie son cahier mais récite quand même sa poésie presque sans faute.",
    titresFaux: ["Le bus tombe en panne", "Karim écrit un poème", "Une journée sans école"],
  },
  {
    titre: "La cuve d'eau de pluie",
    texte:
      "Derrière la case, une grande cuve bleue recueille l'eau du toit. Papa l'a installée l'an dernier, après une saison sèche très longue. Un tuyau descend du bord de la tôle et plonge dedans. Quand il pleut fort, on entend l'eau tambouriner pendant des heures. Papa dit que cette eau ne se boit pas, mais qu'elle est parfaite pour les plantes. Depuis, le jardin tient bon même en novembre. La cuve, elle, ne se vide jamais complètement.",
    personnage: "papa",
    lieu: "derrière la case",
    moment: "depuis l'an dernier",
    info: {
      q: "À quoi sert l'eau de la cuve ?",
      r: "à arroser les plantes",
      faux: ["à faire la cuisine", "à boire pendant la saison sèche", "à laver la voiture"],
    },
    anaphore: {
      contexte: "Papa l'a installée l'an dernier",
      referent: "la cuve bleue",
      faux: ["la case", "la tôle du toit", "la saison sèche"],
    },
    inference: {
      conclusion: "il pleut beaucoup sur l'ile",
      indice: "La cuve, elle, ne se vide jamais complètement",
      faux: [
        "papa remplit la cuve avec un tuyau d'arrosage",
        "la cuve est trop petite pour le jardin",
        "il ne pleut presque jamais ici",
      ],
    },
    connaissance: {
      q: "Pourquoi papa a-t-il installé cette cuve ?",
      r: "pour avoir de l'eau pendant les périodes sans pluie",
      faux: [
        "pour élever des poissons",
        "pour empêcher le toit de rouiller",
        "pour faire de la place derrière la case",
      ],
    },
    chronologie: [
      "Une saison sèche très longue passe.",
      "Papa installe la cuve derrière la case.",
      "Le jardin tient bon même en novembre.",
    ],
    preuve: {
      q: "Pourquoi cette eau ne se boit-elle pas ?",
      phrase: "Papa dit que cette eau ne se boit pas, mais qu'elle est parfaite pour les plantes",
    },
    motInconnu: {
      mot: "recueille",
      sens: "récupère et garde",
      faux: ["rejette au dehors", "réchauffe doucement", "filtre pour la boire"],
    },
    resume: "Une cuve installée derrière la case récupère l'eau de pluie pour arroser le jardin.",
    titresFaux: ["Le toit s'envole", "Un puits dans le jardin", "La sécheresse de l'an dernier"],
  },
];

/* Des sommaires de documentaires, pour la micro-compétence « se servir des
   titres, sous-titres et paragraphes ». Sans eux, la notion n'avait que des
   items figés — et une question figée finit toujours par se répéter. */
type Documentaire = {
  readonly sujet: string;
  readonly sousTitres: readonly string[];
  readonly recherches: readonly { readonly question: string; readonly sousTitre: string }[];
};

const DOCUMENTAIRES: readonly Documentaire[] = [
  {
    sujet: "Le margouillat",
    sousTitres: ["Où il vit", "Ce qu'il mange", "Comment il grimpe aux murs", "Ses petits"],
    recherches: [
      { question: "Pourquoi ne tombe-t-il pas du plafond ?", sousTitre: "Comment il grimpe aux murs" },
      { question: "Combien d'œufs pond-il ?", sousTitre: "Ses petits" },
      { question: "Chasse-t-il des moustiques ?", sousTitre: "Ce qu'il mange" },
    ],
  },
  {
    sujet: "Le volcan de l'ile",
    sousTitres: ["Comment il s'est formé", "Les grandes éruptions", "La surveillance aujourd'hui", "La vie autour"],
    recherches: [
      { question: "Qui prévient quand il va entrer en éruption ?", sousTitre: "La surveillance aujourd'hui" },
      { question: "Quelles plantes poussent sur la lave refroidie ?", sousTitre: "La vie autour" },
      { question: "Que s'est-il passé en 2007 ?", sousTitre: "Les grandes éruptions" },
    ],
  },
  {
    sujet: "Le letchi",
    sousTitres: ["L'arbre", "La récolte", "Le voyage jusqu'à l'assiette", "Recettes"],
    recherches: [
      { question: "À quel mois cueille-t-on les fruits ?", sousTitre: "La récolte" },
      { question: "Comment sont-ils transportés vers l'Europe ?", sousTitre: "Le voyage jusqu'à l'assiette" },
      { question: "Quelle hauteur peut-il atteindre ?", sousTitre: "L'arbre" },
    ],
  },
  {
    sujet: "Les baleines à bosse",
    sousTitres: ["Leur voyage chaque année", "Comment elles respirent", "Le chant des mâles", "Les petits"],
    recherches: [
      { question: "Pourquoi remontent-elles à la surface ?", sousTitre: "Comment elles respirent" },
      { question: "D'où viennent-elles quand elles arrivent ici ?", sousTitre: "Leur voyage chaque année" },
      { question: "Pourquoi entend-on des sons sous l'eau ?", sousTitre: "Le chant des mâles" },
    ],
  },
  {
    sujet: "Le cyclone",
    sousTitres: ["Comment il se forme", "Les alertes et leurs couleurs", "Que faire à la maison", "Après le passage"],
    recherches: [
      { question: "Que signifie l'alerte orange ?", sousTitre: "Les alertes et leurs couleurs" },
      { question: "Faut-il remplir des bouteilles d'eau ?", sousTitre: "Que faire à la maison" },
      { question: "Qui répare les routes coupées ?", sousTitre: "Après le passage" },
    ],
  },
  {
    sujet: "La canne à sucre",
    sousTitres: ["La plantation", "La coupe", "L'usine", "Ce qu'on en fait"],
    recherches: [
      { question: "À quoi sert la bagasse ?", sousTitre: "Ce qu'on en fait" },
      { question: "Comment les tiges sont-elles broyées ?", sousTitre: "L'usine" },
      { question: "À quelle saison coupe-t-on les tiges ?", sousTitre: "La coupe" },
    ],
  },
];

const MOMENTS_FAUX: readonly string[] = [
  "pendant les grandes vacances",
  "au milieu de la nuit",
  "le jour de la rentrée",
  "un dimanche après-midi",
];

const LIEUX_FAUX: readonly string[] = [
  "dans un avion",
  "à la bibliothèque",
  "sur un terrain de football",
  "dans une salle de cinéma",
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const comprehensionLectureBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_COMP_INFOS_EXPLICITES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_infos_explicites_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_infos_explicites",
    difficulty: 2,
    theme: "neutral",
    hint: "La réponse est écrite quelque part. Relis lentement.",
    tags: ["ce2", "comprehension", "explicite", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${t.info.q}`,
        format: "qcm" as const,
        choices: shuffle([t.info.r, ...t.info.faux]),
        expected: [t.info.r],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une information explicite est écrite noir sur blanc dans le texte : il n'y a rien à deviner.",
          "Cherche dans le texte les mots de la question, puis pose ton doigt sur la réponse.",
          `Le texte le dit : ${t.info.r}.`,
          `La réponse est : ${t.info.r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_infos_explicites_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_infos_explicites",
    difficulty: 2,
    theme: "neutral",
    hint: "Où et quand cela se passe-t-il ? Les deux sont dans le texte.",
    tags: ["ce2", "comprehension", "explicite", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const surLeLieu = Math.random() < 0.5;
      const bon = surLeLieu ? t.lieu : t.moment;
      const reserve = surLeLieu
        ? [...LIEUX_FAUX, ...TEXTES.filter((x) => x.lieu !== t.lieu).map((x) => x.lieu)]
        : [...MOMENTS_FAUX, ...TEXTES.filter((x) => x.moment !== t.moment).map((x) => x.moment)];
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${surLeLieu ? "Où" : "Quand"} cela se passe-t-il ?`,
        format: "qcm" as const,
        choices: choix(bon, reserve),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          surLeLieu
            ? "Le lieu, c'est l'endroit où se passe l'histoire."
            : "Le moment, c'est quand se passe l'histoire.",
          surLeLieu
            ? "Cherche les mots qui annoncent un endroit : à, dans, sur, derrière, près de…"
            : "Cherche les mots du temps : le matin, en novembre, depuis trois jours…",
          `Le texte l'indique : ${bon}.`,
          `Cela se passe ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_infos_explicites_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_infos_explicites",
    difficulty: 3,
    theme: "neutral",
    hint: "Réponds en une phrase, avec les mots du texte.",
    tags: ["ce2", "comprehension", "explicite", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${t.info.q} Réponds en une phrase.`,
        format: "open" as const,
        expected: t.info.r.split(" ").filter((m) => m.length > 3),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Répondre à une question sur un texte, c'est retrouver l'information et la redire avec ses mots.",
          "Relis en cherchant les mots de la question, puis écris ta phrase.",
          `Le texte dit : ${t.info.r}.`,
          `La réponse est : ${t.info.r}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_ANAPHORE — le piège du BO
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_comp_anaphore_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    text: "Lis :\n\n« Le lion dort dans l'herbe haute. Il ouvre un œil. Le fauve a entendu quelque chose. Le roi de la savane se lève lentement. »\n\nCombien d'animaux y a-t-il dans ce texte ?",
    format: "qcm",
    choices: ["un seul", "deux", "trois", "quatre"],
    expected: ["un seul"],
    comparator: "mcq_exact",
    hint: "Cherche si ces mots ne désigneraient pas la même bête.",
    explanation: exp(
      "Pour éviter de répéter, un texte remplace un nom par un pronom, ou par un autre mot qui veut dire la même chose. C'est la chaine anaphorique.",
      "Chaque fois qu'un nouveau mot apparait, demande-toi : est-ce quelqu'un de nouveau, ou le même qu'avant ?",
      "Le lion → il → le fauve → le roi de la savane. Quatre façons de nommer un seul animal. Celui qui ne le voit pas croit que la savane se remplit.",
      "Il n'y a qu'un seul animal.",
    ),
    tags: ["ce2", "comprehension", "anaphore", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_comp_anaphore_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    hint: "Remonte dans le texte : de qui ou de quoi parlait-on juste avant ?",
    tags: ["ce2", "comprehension", "anaphore", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nDans « ${t.anaphore.contexte} », de qui ou de quoi parle-t-on ?`,
        format: "qcm" as const,
        choices: shuffle([t.anaphore.referent, ...t.anaphore.faux]),
        expected: [t.anaphore.referent],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un pronom ne renvoie pas forcément au dernier nom cité : il renvoie à celui dont on est en train de parler.",
          "Remonte d'une phrase ou deux et relis. Puis remplace le pronom par le nom pour vérifier que la phrase tient debout.",
          `Ici, il s'agit de ${t.anaphore.referent}.`,
          `On parle de ${t.anaphore.referent}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_anaphore_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_anaphore",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis comment tu vérifies que tu ne t'es pas trompé.",
    tags: ["ce2", "comprehension", "anaphore", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Dans « ${t.texte} », on lit « ${t.anaphore.contexte} ».\n\nDe qui ou de quoi s'agit-il, et comment en es-tu sûr ? Explique.`,
        format: "open" as const,
        expected: [
          ...t.anaphore.referent.split(" ").filter((m) => m.length > 3),
          "remonte",
          "avant",
          "remplace",
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un texte remplace les noms par des pronoms pour ne pas se répéter : il faut savoir les remettre en place.",
          "Remonte dans le texte, puis remplace le pronom par le nom que tu proposes. Si la phrase tient debout, c'est le bon.",
          `« ${t.anaphore.contexte} » → il s'agit de ${t.anaphore.referent}.`,
          `Il s'agit de ${t.anaphore.referent}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_INFERENCES
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_inferences_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_inferences",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas écrit, mais le texte te laisse le deviner.",
    tags: ["ce2", "comprehension", "inference", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQu'est-ce qui est vrai, même si ce n'est PAS écrit ?`,
        format: "qcm" as const,
        choices: shuffle([t.inference.conclusion, ...t.inference.faux]),
        expected: [t.inference.conclusion],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une inférence, c'est ce qu'on comprend sans que ce soit écrit. Elle s'appuie toujours sur un indice du texte.",
          "Cherche le détail qui n'était pas obligé d'être là : c'est souvent lui qui te renseigne.",
          `L'indice est « ${t.inference.indice} ». Il fait deviner que ${t.inference.conclusion}.`,
          `On peut en déduire que ${t.inference.conclusion}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_inferences_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_inferences",
    difficulty: 3,
    theme: "neutral",
    hint: "Une inférence s'appuie toujours sur un morceau précis du texte.",
    tags: ["ce2", "comprehension", "inference", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre)).map((x) => x.inference.indice);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nOn devine que ${t.inference.conclusion}. Quel morceau du texte te le fait deviner ?`,
        format: "qcm" as const,
        choices: choix(t.inference.indice, autres),
        expected: [t.inference.indice],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deviner n'est pas inventer : une inférence s'appuie sur un morceau de texte qu'on peut montrer du doigt.",
          "Relis en cherchant le détail qui n'avait pas besoin d'être écrit — s'il est là, c'est qu'il sert.",
          `« ${t.inference.indice} » : voilà l'indice. Sans lui, on ne pourrait rien conclure.`,
          `L'indice est « ${t.inference.indice} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_inferences_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_inferences",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce que tu as compris, ET où tu l'as pris.",
    tags: ["ce2", "comprehension", "inference", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQu'est-ce que tu comprends sans que ce soit écrit ? Explique comment tu l'as deviné.`,
        format: "open" as const,
        expected: [
          ...t.inference.conclusion.split(" ").filter((m) => m.length > 4),
          ...t.inference.indice.split(" ").filter((m) => m.length > 5),
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Une inférence relie un indice écrit à une conclusion qui, elle, ne l'est pas.",
          "Dis les deux : ce que tu as compris, et le morceau de texte qui te l'a fait comprendre.",
          `« ${t.inference.indice} » → ${t.inference.conclusion}.`,
          `On devine que ${t.inference.conclusion}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_CONNAISSANCES — le BO ajoute cela au CE2
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_connaissances_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_connaissances",
    difficulty: 3,
    theme: "neutral",
    hint: "Le texte ne le dit pas. C'est ce que TU sais déjà qui répond.",
    tags: ["ce2", "comprehension", "connaissances", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${t.connaissance.q}`,
        format: "qcm" as const,
        choices: shuffle([t.connaissance.r, ...t.connaissance.faux]),
        expected: [t.connaissance.r],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Comprendre un texte, ce n'est pas seulement y chercher : c'est aussi y apporter ce qu'on sait déjà.",
          "Demande-toi ce que tu connais du sujet, en dehors du texte, et vois si cela explique la scène.",
          `Le texte ne le dit pas. C'est ce que tu sais qui répond : ${t.connaissance.r}.`,
          `C'est ${t.connaissance.r}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_connaissances_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_connaissances",
    difficulty: 3,
    theme: "neutral",
    hint: "Ta réponse ne sera pas dans le texte : elle est dans ta tête.",
    tags: ["ce2", "comprehension", "connaissances", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${t.connaissance.q} Explique en une phrase.`,
        format: "open" as const,
        expected: t.connaissance.r.split(" ").filter((m) => m.length > 4),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Certaines questions n'ont pas leur réponse dans le texte : elles demandent ce qu'on sait du monde.",
          "Relis la scène, puis demande-toi ce que tu connais qui pourrait l'expliquer.",
          `${t.connaissance.r}.`,
          `C'est ${t.connaissance.r}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_CHRONOLOGIE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_chronologie_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_chronologie",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche laquelle arrive en premier dans le texte.",
    tags: ["ce2", "comprehension", "chronologie", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autre = randomChoice(TEXTES.filter((x) => x.titre !== t.titre));
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQuel évènement arrive en PREMIER ?`,
        format: "qcm" as const,
        choices: shuffle([t.chronologie[0], t.chronologie[1], t.chronologie[2], autre.chronologie[1]]),
        expected: [t.chronologie[0]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un récit raconte les évènements dans un ordre. Le retrouver, c'est comprendre l'histoire.",
          "Relis le texte du début et arrête-toi au premier évènement que tu reconnais dans la liste.",
          `L'ordre est : ${t.chronologie.join(" → ")}.`,
          `Le premier est : ${t.chronologie[0]}`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_chronologie_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_chronologie",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche ce qui vient JUSTE APRÈS, pas ce qui vient à la fin.",
    tags: ["ce2", "comprehension", "chronologie", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autre = randomChoice(TEXTES.filter((x) => x.titre !== t.titre));
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQue se passe-t-il JUSTE APRÈS : « ${t.chronologie[0]} » ?`,
        format: "qcm" as const,
        choices: shuffle([t.chronologie[1], t.chronologie[2], t.chronologie[0], autre.chronologie[2]]),
        expected: [t.chronologie[1]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Remettre les évènements dans l'ordre, c'est suivre le fil du récit sans sauter d'étape.",
          "Repère la phrase du texte qui correspond au premier évènement, puis continue à lire à partir de là.",
          `L'ordre est : ${t.chronologie.join(" → ")}.`,
          `Juste après vient : ${t.chronologie[1]}`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_chronologie_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_chronologie",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois étapes suffisent, dans l'ordre.",
    tags: ["ce2", "comprehension", "chronologie", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nRaconte l'histoire en trois étapes, dans l'ordre.`,
        format: "open" as const,
        expected: t.chronologie.flatMap((e) => e.split(" ").filter((m) => m.length > 5)),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Résumer un récit dans l'ordre, c'est garder les trois moments qui font avancer l'histoire.",
          "Repère le début, ce qui change au milieu, et comment cela finit.",
          `${t.chronologie.join(" → ")}.`,
          `Les trois étapes sont : ${t.chronologie.join(" puis ")}`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_RETOUR_TEXTE — lever une ambigüité
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_retour_texte_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_retour_texte",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne réponds pas de mémoire : retourne chercher la phrase.",
    tags: ["ce2", "comprehension", "retour-texte", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre)).map((x) => x.preuve.phrase);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${t.preuve.q}\nQuelle phrase du texte le prouve ?`,
        format: "qcm" as const,
        choices: choix(t.preuve.phrase, autres),
        expected: [t.preuve.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Quand on hésite, on ne choisit pas la réponse la plus probable : on retourne au texte et on montre l'endroit.",
          "Relis le texte en cherchant les mots de la question, puis pose ton doigt sur la phrase.",
          `C'est « ${t.preuve.phrase} » qui répond. Les autres phrases parlent d'autre chose.`,
          `La phrase qui le prouve est « ${t.preuve.phrase} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_comp_retour_texte_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_retour_texte",
    difficulty: 3,
    theme: "neutral",
    text: "Tu as lu un texte il y a cinq minutes, et on te pose une question dessus. Tu crois te souvenir de la réponse, mais tu n'en es pas sûr.\n\nQue vaut-il mieux faire ?",
    format: "qcm",
    choices: [
      "Retourner au texte et retrouver la phrase exacte",
      "Répondre ce dont tu te souviens : c'est souvent juste",
      "Choisir la réponse qui te parait la plus logique",
      "Demander à un camarade ce qu'il a compris",
    ],
    expected: ["Retourner au texte et retrouver la phrase exacte"],
    comparator: "mcq_exact",
    hint: "Ta mémoire complète toute seule ce qu'elle n'a pas lu.",
    explanation: exp(
      "Lire, c'est vérifier ce qui est écrit — pas se souvenir de ce qu'on a compris.",
      "Dès qu'un doute apparait, on retourne au texte et on cherche la phrase, mot à mot.",
      "Notre mémoire remplit les trous toute seule, sans prévenir : elle ajoute ce qui serait logique. C'est très pratique dans la vie, et c'est exactement ce qui fait rater les questions de lecture.",
      "Il vaut mieux retourner au texte et retrouver la phrase exacte.",
    ),
    tags: ["ce2", "comprehension", "retour-texte", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_comp_retour_texte_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_retour_texte",
    difficulty: 3,
    theme: "neutral",
    hint: "Recopie le morceau de phrase qui te donne la réponse.",
    tags: ["ce2", "comprehension", "retour-texte", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\n${t.preuve.q} Recopie le morceau de texte qui te le prouve.`,
        format: "open" as const,
        expected: t.preuve.phrase.split(" ").filter((m) => m.length > 4),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Justifier, c'est montrer l'endroit du texte qui donne la réponse.",
          "Relis chaque phrase et arrête-toi sur celle qui répond exactement à la question.",
          `« ${t.preuve.phrase} »`,
          `La preuve est : « ${t.preuve.phrase} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_TITRE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_titre_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_titre",
    difficulty: 3,
    theme: "neutral",
    hint: "Un bon titre dit ce dont parle TOUT le texte, pas un seul détail.",
    tags: ["ce2", "comprehension", "titre", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQuel titre lui conviendrait le mieux ?`,
        format: "qcm" as const,
        choices: shuffle([t.titre, ...t.titresFaux]),
        expected: [t.titre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un titre annonce de quoi parle le texte en entier, en quelques mots.",
          "Demande-toi de quoi tu parlerais si tu devais raconter ce texte en une phrase.",
          `« ${t.titre} » convient : il annonce l'ensemble. Les autres racontent quelque chose qui n'est pas dans le texte.`,
          `Le meilleur titre est « ${t.titre} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_titre_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_titre",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois ou quatre mots suffisent.",
    tags: ["ce2", "comprehension", "titre", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nInvente-lui un titre, et dis pourquoi tu l'as choisi.`,
        format: "open" as const,
        expected: [
          ...t.titre.split(" ").filter((m) => m.length > 3),
          ...t.resume.split(" ").filter((m) => m.length > 6),
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un titre dit en quelques mots de quoi parle tout le texte.",
          "Résume d'abord le texte dans ta tête, puis garde les deux ou trois mots les plus importants.",
          `Par exemple : « ${t.titre} ». ${t.resume}`,
          `Un bon titre serait « ${t.titre} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_MISE_EN_PAGE
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_comp_mise_en_page_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_mise_en_page",
    difficulty: 2,
    theme: "neutral",
    text: "Dans un documentaire sur les baleines, tu vois un sous-titre : « Comment elles respirent ».\n\nÀ quoi te sert ce sous-titre ?",
    format: "qcm",
    choices: [
      "À savoir où chercher, sans lire tout le livre",
      "À décorer la page",
      "À indiquer le nombre de pages du chapitre",
      "À donner le nom de l'auteur",
    ],
    expected: ["À savoir où chercher, sans lire tout le livre"],
    comparator: "mcq_exact",
    hint: "Imagine que tu cherches une information précise.",
    explanation: exp(
      "Les titres, les sous-titres et les paragraphes découpent un texte pour qu'on s'y retrouve.",
      "Avant de lire, parcours les sous-titres : ils t'annoncent ce que chaque partie contient.",
      "Si tu cherches comment les baleines respirent, tu vas droit à cette partie. Sans sous-titres, il faudrait tout lire pour trouver trois lignes.",
      "À savoir où chercher, sans lire tout le livre.",
    ),
    tags: ["ce2", "comprehension", "mise-en-page", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_comp_mise_en_page_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_mise_en_page",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne lis pas tout : regarde les sous-titres et choisis.",
    tags: ["ce2", "comprehension", "mise-en-page", "template"],
    generate: () => {
      const d = randomChoice(DOCUMENTAIRES);
      const r = randomChoice(d.recherches);
      return {
        text: `Voici le sommaire d'un documentaire sur « ${d.sujet} » :\n\n${d.sousTitres.map((s) => `— ${s}`).join("\n")}\n\nTu cherches la réponse à : « ${r.question} »\nDans quelle partie vas-tu chercher ?`,
        format: "qcm" as const,
        choices: shuffle([...d.sousTitres]),
        expected: [r.sousTitre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les titres et sous-titres découpent un documentaire pour qu'on trouve sans tout lire.",
          "Lis ta question, repère le mot le plus important, et cherche le sous-titre qui en parle.",
          `« ${r.question} » → la partie « ${r.sousTitre} ». Les autres parties parlent d'autre chose.`,
          `Il faut chercher dans « ${r.sousTitre} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_comp_mise_en_page_fixed_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_mise_en_page",
    difficulty: 2,
    theme: "neutral",
    text: "Pourquoi un texte est-il découpé en paragraphes ?",
    format: "qcm",
    choices: [
      "Parce que chaque paragraphe parle d'une idée différente",
      "Parce que la page serait trop lourde autrement",
      "Pour que le texte soit plus long",
      "Pour laisser de la place aux dessins",
    ],
    expected: ["Parce que chaque paragraphe parle d'une idée différente"],
    comparator: "mcq_exact",
    hint: "Regarde ce qui change quand un paragraphe commence.",
    explanation: exp(
      "Un paragraphe est un bloc de texte qui traite d'une seule idée. On passe à la ligne quand on change d'idée.",
      "Quand tu lis, arrête-toi à la fin de chaque paragraphe et demande-toi de quoi il parlait.",
      "Dans un documentaire, un paragraphe pour la nourriture, un autre pour le déplacement. Quand tu écris, fais pareil : une idée, un paragraphe.",
      "Parce que chaque paragraphe parle d'une idée différente.",
    ),
    tags: ["ce2", "comprehension", "mise-en-page", "definition", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_comp_mise_en_page_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_mise_en_page",
    difficulty: 3,
    theme: "neutral",
    text: "Tu dois trouver, dans un gros livre documentaire, à quoi sert la queue d'un margouillat.\n\nQue regardes-tu en premier, et pourquoi ? Explique.",
    format: "open",
    expected: ["sommaire", "titre", "sous-titre", "table", "chapitre", "index", "paragraphe"],
    comparator: "contains_keyword",
    hint: "On ne lit pas un documentaire de la première à la dernière page.",
    explanation: exp(
      "Un documentaire ne se lit pas comme un roman : on y cherche une information précise.",
      "Va d'abord au sommaire ou aux titres des chapitres, puis aux sous-titres de la partie qui t'intéresse.",
      "Le sommaire t'envoie au chapitre sur le corps de l'animal ; les sous-titres t'envoient au paragraphe sur la queue. Trois regards, au lieu de cent pages.",
      "On regarde le sommaire et les titres, pour aller directement à la bonne page.",
    ),
    tags: ["ce2", "comprehension", "mise-en-page", "methode", "ouverte"],
  },

  /* =========================================================
     CE2_COMP_MOT_INCONNU
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_mot_inconnu_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_mot_inconnu",
    difficulty: 3,
    theme: "neutral",
    hint: "Relis la phrase entière : elle t'aide plus que le mot lui-même.",
    tags: ["ce2", "comprehension", "mot-inconnu", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQue veut dire « ${t.motInconnu.mot} » ?`,
        format: "qcm" as const,
        choices: shuffle([t.motInconnu.sens, ...t.motInconnu.faux]),
        expected: [t.motInconnu.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot inconnu se devine grâce à ce qui l'entoure, et parfois grâce à sa forme — sa famille, son préfixe.",
          "Relis la phrase en sautant le mot, puis demande-toi ce qui aurait du sens à sa place.",
          `Dans ce texte, « ${t.motInconnu.mot} » veut dire ${t.motInconnu.sens}.`,
          `« ${t.motInconnu.mot} » veut dire ${t.motInconnu.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_mot_inconnu_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_mot_inconnu",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis ce qui, dans le texte, t'a mis sur la piste.",
    tags: ["ce2", "comprehension", "mot-inconnu", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Dans ce texte, tu ne connais pas le mot « ${t.motInconnu.mot} » :\n\n« ${t.texte} »\n\nQue veut-il dire, et comment l'as-tu deviné ? Explique.`,
        format: "open" as const,
        expected: [
          ...t.motInconnu.sens.split(" ").filter((m) => m.length > 4),
          "phrase",
          "autour",
          "contexte",
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Le contexte, ce sont les mots qui entourent le mot inconnu : ils suffisent souvent à en deviner le sens.",
          "Relis la phrase entière, puis vérifie que ton hypothèse tient dans tout le texte.",
          `« ${t.motInconnu.mot} » veut dire ${t.motInconnu.sens}.`,
          `Cela veut dire ${t.motInconnu.sens}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_RESUME
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_resume_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_resume",
    difficulty: 3,
    theme: "neutral",
    hint: "Un résumé dit tout l'essentiel, et rien de plus.",
    tags: ["ce2", "comprehension", "resume", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre)).map((x) => x.resume);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQuelle phrase le résume le mieux ?`,
        format: "qcm" as const,
        choices: choix(t.resume, autres),
        expected: [t.resume],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Résumer, c'est redire l'essentiel avec ses propres mots, sans rien ajouter ni rien oublier d'important.",
          "Demande-toi : qui, où, et quoi ? Puis cherche la phrase qui dit ces trois choses.",
          `« ${t.resume} » : tout y est, et rien de plus.`,
          `Le meilleur résumé est « ${t.resume} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_resume_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_resume",
    difficulty: 3,
    theme: "neutral",
    hint: "Une phrase suffit. Deux, au maximum.",
    tags: ["ce2", "comprehension", "resume", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nRésume-le en une phrase, avec tes mots.`,
        format: "open" as const,
        expected: t.resume.split(" ").filter((m) => m.length > 4),
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un résumé garde l'essentiel : qui, où, et ce qui se passe.",
          "Écarte les détails, garde ce qui ferait comprendre l'histoire à quelqu'un qui ne l'a pas lue.",
          `Par exemple : ${t.resume}`,
          `${t.resume}`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COMP_DEFI — l'anaphore ET l'inférence dans le même texte
  ========================================================= */
  {
    kind: "template",
    id: "ce2_comp_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses à vérifier, et il faut que les DEUX soient justes.",
    tags: ["ce2", "comprehension", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const bon = `« ${t.anaphore.contexte} » parle de ${t.anaphore.referent}, et on devine que ${t.inference.conclusion}`;
      const faux = [
        `« ${t.anaphore.contexte} » parle de ${t.anaphore.faux[0]}, et on devine que ${t.inference.conclusion}`,
        `« ${t.anaphore.contexte} » parle de ${t.anaphore.referent}, et on devine que ${t.inference.faux[0]}`,
        `« ${t.anaphore.contexte} » parle de ${t.anaphore.faux[1]}, et on devine que ${t.inference.faux[1]}`,
      ];
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([bon, ...faux]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si TOUT est juste dedans. Une moitié vraie ne suffit pas.",
          "Vérifie les deux moitiés l'une après l'autre : d'abord de qui on parle, ensuite ce qu'on devine.",
          `« ${t.anaphore.contexte} » désigne ${t.anaphore.referent}, et « ${t.inference.indice} » fait deviner que ${t.inference.conclusion}.`,
          `La réponse entièrement juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Attention : une seule de ces phrases est vraiment dans le texte.",
    tags: ["ce2", "comprehension", "defi", "template"],
    generate: () => {
      const t = randomChoice(TEXTES);
      const autres = shuffle(TEXTES.filter((x) => x.titre !== t.titre)).map((x) => x.preuve.phrase);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nQuel morceau est vraiment écrit dans ce texte ?`,
        format: "qcm" as const,
        choices: choix(t.preuve.phrase, autres),
        expected: [t.preuve.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Lire, c'est vérifier ce qui est écrit, pas se souvenir de ce qu'on croit avoir lu.",
          "Relis le texte et cherche le morceau mot à mot, au lieu de te fier à ton impression.",
          `« ${t.preuve.phrase} » est bien dans le texte. Les autres viennent d'ailleurs, et sonnent pourtant très bien.`,
          `Le morceau du texte est « ${t.preuve.phrase} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_comp_defi_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "comprehension_lecture",
    microId: "ce2_comp_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois choses : qui, ce qui se passe, et ce qu'on devine.",
    tags: ["ce2", "comprehension", "defi", "ouverte"],
    generate: () => {
      const t = randomChoice(TEXTES);
      return {
        text: `Lis ce texte :\n\n« ${t.texte} »\n\nRaconte-le à quelqu'un qui ne l'a pas lu : dis de qui il s'agit, ce qui se passe, et une chose que tu as devinée sans qu'elle soit écrite.`,
        format: "open" as const,
        expected: [
          ...t.personnage.split(" ").filter((m) => m.length > 3),
          ...t.resume.split(" ").filter((m) => m.length > 5),
          ...t.inference.conclusion.split(" ").filter((m) => m.length > 5),
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Comprendre un texte, c'est pouvoir le redire — et dire aussi ce qu'on a compris entre les lignes.",
          "Trois temps : de qui on parle, ce qui arrive, et ce que le texte laisse deviner.",
          `${t.resume} Et l'on devine que ${t.inference.conclusion}, grâce à « ${t.inference.indice} ».`,
          `${t.resume}`,
        ),
      };
    },
  },
];
