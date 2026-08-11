// lib/tutor-v4/questionBank/ce2/francais/production-ecrite.bank.ts
//
// La production d'écrits au CE2.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — « Produire un texte d'une dizaine de lignes » de différents types :
//     dialogues, récits, poèmes ;
//   — écrire pour un destinataire précis ;
//   — enrichir ses phrases ; employer des connecteurs ;
//   — organiser ses idées dans l'ordre ;
//   — réemployer un lexique précis ;
//   — RELIRE et améliorer son texte — « relu méthodiquement », dit le BO.
//
// ⚠️ ON NE PEUT PAS CORRIGER UN TEXTE LIBRE. Un coach qui demanderait « écris
// un récit de dix lignes » ne saurait pas dire si le récit est bon : il n'a ni
// le jugement d'un professeur, ni le contexte de la classe. Ce qu'il peut faire,
// et ce qu'il fait ici, c'est travailler les DÉCISIONS d'écriture, une par une —
// choisir un connecteur, remplacer un mot vague, mettre les idées dans l'ordre,
// ponctuer un dialogue, repérer une répétition. Ce sont ces décisions qui font
// la dizaine de lignes, et elles se travaillent séparément.
//
// Les questions ouvertes, elles, demandent bien d'écrire — une phrase, deux au
// plus. À neuf ans, c'est la bonne unité.

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
   ENRICHIR UNE PHRASE
   ═══════════════════════════════════════════════════════════════════════════ */

type PhraseEnrichie = {
  readonly simple: string;
  readonly enrichie: string;
  readonly ajout: string;
};

const ENRICHIES: readonly PhraseEnrichie[] = [
  {
    simple: "Le chien aboie.",
    enrichie: "Le grand chien noir aboie derrière la barrière.",
    ajout: "deux adjectifs, et un groupe qui dit OÙ",
  },
  {
    simple: "Léa ramasse des letchis.",
    enrichie: "Chaque samedi, Léa ramasse des letchis bien mûrs dans le jardin de mamie.",
    ajout: "un groupe qui dit QUAND, un adjectif, et un groupe qui dit OÙ",
  },
  {
    simple: "Le bateau part.",
    enrichie: "Avant l'aube, le petit bateau bleu part vers le large.",
    ajout: "un groupe qui dit QUAND, deux adjectifs, et un groupe qui dit VERS OÙ",
  },
  {
    simple: "Mamie prépare un cari.",
    enrichie: "Depuis ce matin, mamie prépare patiemment un cari très épicé.",
    ajout: "un groupe qui dit DEPUIS QUAND, un adverbe, et un adjectif",
  },
  {
    simple: "Les élèves sortent.",
    enrichie: "À la sonnerie, les élèves de CE2 sortent en courant dans la cour.",
    ajout: "un groupe qui dit QUAND, une précision sur le sujet, et un groupe qui dit COMMENT",
  },
  {
    simple: "Le vent souffle.",
    enrichie: "Depuis hier soir, un vent glacé souffle sans arrêt sur le piton.",
    ajout: "un groupe qui dit DEPUIS QUAND, un adjectif, et un groupe qui dit OÙ",
  },
  {
    simple: "Tom lit.",
    enrichie: "Le soir, Tom lit une bande dessinée sous la lampe de sa chambre.",
    ajout: "un groupe qui dit QUAND, ce qu'il lit, et un groupe qui dit OÙ",
  },
  {
    simple: "Le margouillat court.",
    enrichie: "Dès que la lumière s'allume, le margouillat court sur le mur blanc.",
    ajout: "un groupe qui dit QUAND, et un groupe qui dit OÙ",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ÉCRIRE POUR QUELQU'UN DE PRÉCIS
   ═══════════════════════════════════════════════════════════════════════════ */

type Destinataire = {
  readonly situation: string;
  readonly bonne: string;
  readonly mauvaises: readonly string[];
};

const DESTINATAIRES: readonly Destinataire[] = [
  {
    situation: "Tu écris à la directrice pour demander un ballon neuf pour la cour.",
    bonne: "Madame la Directrice, notre ballon est crevé. Pourrions-nous en avoir un autre ?",
    mauvaises: [
      "Salut ! Le ballon est mort, faudrait en racheter un.",
      "Il paraitrait qu'un ballon serait souhaitable.",
      "Ballon crevé. Nouveau ballon. Merci.",
    ],
  },
  {
    situation: "Tu écris un mot à ton meilleur ami pour l'inviter à la plage samedi.",
    bonne: "Salut Tom ! Tu viens à la plage samedi ? On part à neuf heures.",
    mauvaises: [
      "Monsieur, j'ai l'honneur de vous convier à une sortie balnéaire.",
      "Plage. Samedi. Neuf heures.",
      "Il se pourrait que la plage soit envisageable ce week-end.",
    ],
  },
  {
    situation: "Tu écris à ta grand-mère pour la remercier de son cadeau.",
    bonne: "Merci beaucoup mamie, le livre m'a fait très plaisir. Je l'ai déjà commencé.",
    mauvaises: [
      "Bien reçu le colis. Contenu conforme.",
      "Yo mamie, cool le cadeau !",
      "Je vous remercie de votre envoi et vous prie d'agréer mes salutations.",
    ],
  },
  {
    situation: "Tu écris une affiche pour toute l'école, pour annoncer la fête.",
    bonne: "FÊTE DE L'ÉCOLE — samedi 14, à partir de 14 h, dans la cour du bas.",
    mauvaises: [
      "Coucou tout le monde, y a une fête bientôt je crois.",
      "Chers amis, je vous écris pour vous parler de la fête.",
      "La fête aura peut-être lieu, on vous dira quand.",
    ],
  },
  {
    situation: "Tu écris au maire pour demander un banc devant l'école.",
    bonne: "Monsieur le Maire, les parents attendent debout devant l'école. Un banc serait très utile.",
    mauvaises: [
      "Salut, faudrait un banc devant l'école, ce serait sympa.",
      "Banc. École. Urgent.",
      "On a remarqué qu'il manquait un truc devant l'école.",
    ],
  },
  {
    situation: "Tu écris un mot à un camarade absent pour lui dire le travail à faire.",
    bonne: "Karim, on a fait la page 42 en maths et il faut apprendre la poésie pour jeudi.",
    mauvaises: [
      "Monsieur, veuillez trouver ci-joint le relevé des travaux de la journée.",
      "T'as raté plein de trucs, tu verras bien.",
      "On a travaillé aujourd'hui. C'était bien.",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES CONNECTEURS
   ═══════════════════════════════════════════════════════════════════════════ */

type Connecteur = {
  readonly phrase: string;
  readonly connecteur: string;
  readonly sens: string;
  readonly autres: readonly string[];
};

const CONNECTEURS: readonly Connecteur[] = [
  {
    phrase: "Il pleuvait très fort. ___ nous sommes rentrés.",
    connecteur: "Alors",
    sens: "il dit la CONSÉQUENCE : ce qui arrive à cause de la pluie",
    autres: ["Pourtant", "D'abord", "Ensuite"],
  },
  {
    phrase: "___ , on épluche les oignons. Ensuite, on les fait revenir.",
    connecteur: "D'abord",
    sens: "il dit l'ORDRE : c'est la première étape",
    autres: ["Enfin", "Pourtant", "Alors"],
  },
  {
    phrase: "Le sentier était long. ___ , personne ne s'est plaint.",
    connecteur: "Pourtant",
    sens: "il dit la SURPRISE : on attendait le contraire",
    autres: ["Alors", "D'abord", "Ensuite"],
  },
  {
    phrase: "Il a rangé sa chambre. ___ , il est sorti jouer.",
    connecteur: "Ensuite",
    sens: "il dit l'ORDRE : ce qui vient après",
    autres: ["Pourtant", "D'abord", "Parce que"],
  },
  {
    phrase: "Nina n'a pas approché de l'arbre ___ elle ne voulait pas déranger les oiseaux.",
    connecteur: "parce que",
    sens: "il dit la CAUSE : pourquoi elle a fait cela",
    autres: ["ensuite", "pourtant", "enfin"],
  },
  {
    phrase: "On a marché deux heures. ___ , on est arrivés au sommet.",
    connecteur: "Enfin",
    sens: "il dit la FIN : c'est la dernière étape",
    autres: ["D'abord", "Pourtant", "Parce que"],
  },
  {
    phrase: "Le bus est tombé en panne. ___ , la classe est arrivée en retard.",
    connecteur: "Alors",
    sens: "il dit la CONSÉQUENCE : ce que la panne a provoqué",
    autres: ["Pourtant", "D'abord", "Enfin"],
  },
  {
    phrase: "Il faisait très chaud. ___ , Sofia a rempli sa gourde.",
    connecteur: "Alors",
    sens: "il dit la CONSÉQUENCE : ce que la chaleur a entrainé",
    autres: ["Pourtant", "Ensuite", "Enfin"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   ORGANISER SES IDÉES, ET LE PARAGRAPHE COHÉRENT
   ═══════════════════════════════════════════════════════════════════════════ */

type Suite = {
  readonly titre: string;
  readonly etapes: readonly string[];
  /** Une phrase qui parle d'autre chose : elle n'a rien à faire là. */
  readonly intrus: string;
};

const SUITES: readonly Suite[] = [
  {
    titre: "préparer un cari",
    etapes: [
      "On fait chauffer l'huile dans la marmite.",
      "On y jette les oignons émincés.",
      "On ajoute le curcuma et le poulet.",
      "On laisse mijoter jusqu'à midi.",
    ],
    intrus: "Le facteur est passé ce matin.",
  },
  {
    titre: "une sortie au piton",
    etapes: [
      "Nous sommes partis à six heures du matin.",
      "Le sentier montait de plus en plus.",
      "Un nuage a caché le sommet.",
      "Nous sommes redescendus sous la pluie.",
    ],
    intrus: "Ma sœur adore les bandes dessinées.",
  },
  {
    titre: "la panne du bus",
    etapes: [
      "Le bus s'est arrêté au milieu de la montée.",
      "Le chauffeur a ouvert le capot.",
      "La maitresse a téléphoné au collège.",
      "Un deuxième bus est arrivé vingt minutes plus tard.",
    ],
    intrus: "Le cari de mamie était très épicé.",
  },
  {
    titre: "le nid dans le filao",
    etapes: [
      "Nina a vu deux oiseaux avec des brindilles dans le bec.",
      "Une coupe d'herbes sèches est apparue entre deux branches.",
      "Le maitre lui a prêté des jumelles.",
      "Elle a compté trois œufs bleu pâle.",
    ],
    intrus: "Le bus scolaire arrive à huit heures.",
  },
  {
    titre: "la récréation sans ballon",
    etapes: [
      "Le ballon a fini sur le toit du préau.",
      "La cour est restée calme pendant deux jours.",
      "Sofia a tracé une marelle à la craie.",
      "Le concierge a fini par descendre le ballon.",
    ],
    intrus: "Il faut arroser les plantes tous les matins.",
  },
  {
    titre: "planter un manguier",
    etapes: [
      "On creuse un trou de cinquante centimètres.",
      "On mélange la terre avec du compost.",
      "On place le jeune arbre bien droit.",
      "On arrose abondamment.",
    ],
    intrus: "Le margouillat dort derrière l'affiche.",
  },
  {
    titre: "préparer son cartable la veille",
    etapes: [
      "On regarde l'emploi du temps du lendemain.",
      "On sort les cahiers dont on aura besoin.",
      "On vérifie la trousse et la gourde.",
      "On pose le cartable près de la porte.",
    ],
    intrus: "Les vagues montent sur le sable.",
  },
  {
    titre: "la lettre venue de métropole",
    etapes: [
      "Le facteur dépose une enveloppe dans la boite.",
      "Léo reconnait l'écriture de sa cousine.",
      "Il lit le passage sur la neige trois fois.",
      "Il cherche un crayon pour répondre.",
    ],
    intrus: "Le cari mijote depuis ce matin.",
  },
  {
    titre: "une matinée au marché",
    etapes: [
      "Nous arrivons avant que le soleil ne tape.",
      "Mamie choisit ses épices chez le même marchand.",
      "Je porte le panier qui devient lourd.",
      "Nous rentrons les bras chargés.",
    ],
    intrus: "Le bus scolaire est tombé en panne.",
  },
  {
    titre: "apprendre une poésie",
    etapes: [
      "On lit le poème à voix haute une première fois.",
      "On apprend les deux premiers vers par cœur.",
      "On ajoute deux vers de plus, chaque soir.",
      "On récite tout, sans regarder le cahier.",
    ],
    intrus: "Le margouillat attrape une mouche.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LE DIALOGUE ET SA PONCTUATION
   ═══════════════════════════════════════════════════════════════════════════ */

type Dialogue = {
  readonly correct: string;
  readonly fautes: readonly string[];
  readonly regle: string;
};

const DIALOGUES: readonly Dialogue[] = [
  {
    correct: "Léa demanda : « Tu viens avec nous ? »",
    fautes: [
      "Léa demanda Tu viens avec nous ?",
      "Léa demanda « Tu viens avec nous ? »",
      "Léa demanda : Tu viens avec nous ?",
    ],
    regle: "deux points pour annoncer, puis des guillemets qui encadrent les paroles",
  },
  {
    correct: "Le pêcheur cria : « La mer monte ! »",
    fautes: [
      "Le pêcheur cria La mer monte !",
      "Le pêcheur cria, « La mer monte ! »",
      "Le pêcheur cria : La mer monte !",
    ],
    regle: "deux points pour annoncer, puis des guillemets qui encadrent les paroles",
  },
  {
    correct: "— On y va ? demanda Nina.",
    fautes: [
      "On y va ? demanda Nina.",
      "— On y va ? — demanda Nina.",
      "« — On y va ? » demanda Nina.",
    ],
    regle: "dans un dialogue, un tiret ouvre chaque nouvelle réplique",
  },
  {
    correct: "Mamie répondit : « Je le vois. »",
    fautes: [
      "Mamie répondit Je le vois.",
      "Mamie répondit : « Je le vois »",
      "Mamie répondit « : Je le vois. »",
    ],
    regle: "le point de la phrase prononcée reste À L'INTÉRIEUR des guillemets",
  },
  {
    correct: "— Pas encore, répondit Sofia.",
    fautes: [
      "Pas encore, répondit Sofia.",
      "— Pas encore. répondit Sofia.",
      "— « Pas encore », répondit Sofia.",
    ],
    regle: "après la réplique, une virgule avant le verbe de parole",
  },
  {
    correct: "Karim proposa : « On grimpe au tamarin ? »",
    fautes: [
      "Karim proposa On grimpe au tamarin ?",
      "Karim proposa : « On grimpe au tamarin ? ».",
      "Karim proposa. « On grimpe au tamarin ? »",
    ],
    regle: "deux points, guillemets, et rien après le guillemet fermant",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LE LEXIQUE PRÉCIS, ET LA RÉVISION
   ═══════════════════════════════════════════════════════════════════════════ */

type MotVague = {
  readonly phraseVague: string;
  readonly phrasePrecise: string;
  readonly motVague: string;
  readonly motPrecis: string;
};

const MOTS_VAGUES: readonly MotVague[] = [
  {
    phraseVague: "Mamie fait un cari.",
    phrasePrecise: "Mamie mijote un cari.",
    motVague: "fait",
    motPrecis: "mijote",
  },
  {
    phraseVague: "Le pêcheur met ses filets dans la barque.",
    phrasePrecise: "Le pêcheur empile ses filets dans la barque.",
    motVague: "met",
    motPrecis: "empile",
  },
  {
    phraseVague: "Il y avait des choses partout dans la cour.",
    phrasePrecise: "Il y avait des papiers partout dans la cour.",
    motVague: "choses",
    motPrecis: "papiers",
  },
  {
    phraseVague: "Le margouillat va vite sur le mur.",
    phrasePrecise: "Le margouillat file sur le mur.",
    motVague: "va vite",
    motPrecis: "file",
  },
  {
    phraseVague: "Nina fait un dessin du nid.",
    phrasePrecise: "Nina croque un dessin du nid.",
    motVague: "fait",
    motPrecis: "croque",
  },
  {
    phraseVague: "Les touristes montent le truc jusqu'au sommet.",
    phrasePrecise: "Les touristes montent le sentier jusqu'au sommet.",
    motVague: "truc",
    motPrecis: "sentier",
  },
  {
    phraseVague: "Le vent fait du bruit dans les branches.",
    phrasePrecise: "Le vent siffle dans les branches.",
    motVague: "fait du bruit",
    motPrecis: "siffle",
  },
  {
    phraseVague: "Tom a mangé son cari très vite.",
    phrasePrecise: "Tom a englouti son cari.",
    motVague: "a mangé très vite",
    motPrecis: "a englouti",
  },
];

type ARevoir = {
  readonly avant: string;
  readonly apres: string;
  readonly defaut: string;
};

const A_REVOIR: readonly ARevoir[] = [
  {
    avant: "Le chien court. Le chien aboie. Le chien saute.",
    apres: "Le chien court, aboie et saute.",
    defaut: "le sujet est répété trois fois",
  },
  {
    avant: "Léa est allée à la plage. Léa a nagé. Léa est rentrée.",
    apres: "Léa est allée à la plage, elle a nagé, puis elle est rentrée.",
    defaut: "le prénom est répété au lieu d'être remplacé par un pronom",
  },
  {
    avant: "C'était bien. C'était vraiment bien. J'ai bien aimé.",
    apres: "La sortie était passionnante, et j'ai adoré la fin.",
    defaut: "les mots sont vagues et se répètent",
  },
  {
    avant: "Il a pris son sac et après il est parti et après il a couru.",
    apres: "Il a pris son sac, puis il est parti en courant.",
    defaut: "« et après » revient deux fois",
  },
  {
    avant: "On a fait des choses. On a vu des trucs. C'était sympa.",
    apres: "Nous avons visité l'usine, puis observé les machines. C'était impressionnant.",
    defaut: "« choses » et « trucs » ne disent rien de précis",
  },
  {
    avant: "Le cari était bon. Le rougail était bon. Le gâteau était bon.",
    apres: "Le cari était savoureux, le rougail relevé, et le gâteau fondant.",
    defaut: "le même adjectif sert trois fois",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES RIMES, POUR LE POÈME
   ═══════════════════════════════════════════════════════════════════════════ */

type Rime = {
  readonly vers: string;
  readonly motFinal: string;
  readonly rime: string;
  readonly nonRimes: readonly string[];
};

const RIMES: readonly Rime[] = [
  { vers: "Le vent souffle sur le lagon", motFinal: "lagon", rime: "poisson", nonRimes: ["vague", "bateau", "sable"] },
  { vers: "Un margouillat sur le mur blanc", motFinal: "blanc", rime: "lentement", nonRimes: ["pierre", "soleil", "feuille"] },
  { vers: "La mangue tombe dans l'herbe", motFinal: "herbe", rime: "superbe", nonRimes: ["jardin", "matin", "branche"] },
  { vers: "Le pêcheur rentre au petit jour", motFinal: "jour", rime: "retour", nonRimes: ["barque", "filet", "vague"] },
  { vers: "La pluie tambourine sur le toit", motFinal: "toit", rime: "froid", nonRimes: ["tôle", "orage", "nuage"] },
  { vers: "Un letchi rouge dans la main", motFinal: "main", rime: "chemin", nonRimes: ["panier", "arbre", "fruit"] },
  { vers: "Le piton se cache dans la brume", motFinal: "brume", rime: "plume", nonRimes: ["sommet", "sentier", "nuage"] },
  { vers: "Le bateau glisse sur la mer", motFinal: "mer", rime: "hiver", nonRimes: ["port", "vague", "voile"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const productionEcriteBank: TutorBankItemV4[] = [
  /* ── CE2_PROD_PHRASE_COMPLEXE ─────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_phrase_complexe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_phrase_complexe",
    difficulty: 2,
    theme: "neutral",
    hint: "Une phrase enrichie répond à plus de questions : qui, quoi, où, quand, comment ?",
    tags: ["ce2", "production", "phrase", "template"],
    generate: () => {
      const p = randomChoice(ENRICHIES);
      const autres = shuffle(ENRICHIES.filter((x) => x.simple !== p.simple)).map((x) => x.enrichie);
      return {
        text: `« ${p.simple} »\n\nQuelle phrase dit la même chose, en donnant plus de renseignements ?`,
        format: "qcm" as const,
        choices: choix(p.enrichie, [p.simple], autres),
        expected: [p.enrichie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Enrichir une phrase, c'est ajouter des renseignements autour du sujet et du verbe, sans changer ce qu'elle raconte.",
          "Pose-toi les questions qui manquent : quand ? où ? comment ? lequel ?",
          `${p.simple} → ${p.enrichie}. On a ajouté ${p.ajout}.`,
          `La phrase enrichie est « ${p.enrichie} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_phrase_complexe_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_phrase_complexe",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux phrases et regarde ce qui a été ajouté.",
    tags: ["ce2", "production", "phrase", "template"],
    generate: () => {
      const p = randomChoice(ENRICHIES);
      const autres = shuffle(ENRICHIES.filter((x) => x.ajout !== p.ajout)).map((x) => x.ajout);
      return {
        text: `« ${p.simple} » est devenue « ${p.enrichie} »\n\nQu'a-t-on ajouté ?`,
        format: "qcm" as const,
        choices: choix(p.ajout, autres),
        expected: [p.ajout],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On enrichit une phrase avec des adjectifs, des adverbes, et des groupes qui disent quand, où ou comment.",
          "Compare les deux phrases mot à mot et entoure ce qui est nouveau.",
          `Ici : ${p.ajout}.`,
          `On a ajouté ${p.ajout}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_phrase_complexe_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_phrase_complexe",
    difficulty: 3,
    theme: "neutral",
    hint: "Enrichir, c'est ajouter autour — pas remplacer, ni couper.",
    tags: ["ce2", "production", "phrase", "methode"],
    generate: () => {
      const p = randomChoice(ENRICHIES);
      const bonne = "Je garde le sujet et le verbe, et j'ajoute autour de quoi répondre à quand, où ou comment.";
      return {
        text: `« ${p.simple} »\n\nComment fais-tu pour l'enrichir sans la casser ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : allonger sans rien apprendre au lecteur.
          "J'ajoute des mots jusqu'à ce que la phrase soit longue.",
          "Je remplace le verbe par un verbe plus long.",
          // La voisine : couper en deux, c'est le geste inverse.
          "Je coupe la phrase en deux et j'en fais deux phrases.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Enrichir, c'est ajouter sans casser : le sujet et le verbe restent, on ajoute autour.",
          "Choisis deux questions parmi quand, où, comment, puis réponds-y dans la phrase.",
          `Par exemple : « ${p.enrichie} » — on a ajouté ${p.ajout}.`,
          `Par exemple : ${p.enrichie}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_DESTINATAIRE ────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_destinataire_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_destinataire",
    difficulty: 3,
    theme: "neutral",
    hint: "On n'écrit pas de la même façon à un copain et à une directrice.",
    tags: ["ce2", "production", "destinataire", "template"],
    generate: () => {
      const d = randomChoice(DESTINATAIRES);
      return {
        text: `${d.situation}\n\nQue vaut-il mieux écrire ?`,
        format: "qcm" as const,
        choices: shuffle([d.bonne, ...d.mauvaises]),
        expected: [d.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire, c'est écrire À QUELQU'UN. Le ton, les mots et la longueur changent selon la personne.",
          "Avant d'écrire, demande-toi trois choses : à qui ? pour quoi faire ? est-ce que je le connais bien ?",
          `Ici : ${d.bonne}`,
          `Il vaut mieux écrire : « ${d.bonne} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_destinataire_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_destinataire",
    difficulty: 3,
    theme: "neutral",
    hint: "Avant d'écrire une seule phrase, demande-toi qui va te lire.",
    tags: ["ce2", "production", "destinataire", "methode"],
    generate: () => {
      const d = randomChoice(DESTINATAIRES);
      const bonne = "Je pense à qui va me lire : je nomme la personne, je dis ce que je veux, et je termine poliment si c'est un adulte.";
      return {
        text: `${d.situation}\n\nÀ quoi penses-tu avant d'écrire ton message ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : écrire à un adulte comme on parle à un copain.
          "J'écris comme je parle avec mes copains : c'est plus naturel.",
          "J'écris le plus court possible : ça ira plus vite.",
          // La voisine : soigner ses lettres, c'est de l'écriture, pas du message.
          "Je m'applique à bien former mes lettres.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un message réussi tient compte de son destinataire : on ne parle pas à une directrice comme à un copain.",
          "Commence par nommer la personne, dis ce que tu veux, et termine poliment si c'est un adulte.",
          `Par exemple : « ${d.bonne} »`,
          `Par exemple : ${d.bonne}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_PARAGRAPHE ──────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_paragraphe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_paragraphe",
    difficulty: 2,
    theme: "neutral",
    hint: "Un paragraphe parle d'UNE seule chose. Une phrase parle d'autre chose.",
    tags: ["ce2", "production", "paragraphe", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      const trois = shuffle([...s.etapes]).slice(0, 3);
      return {
        text: `Voici un paragraphe sur ${s.titre}. Une phrase n'a rien à faire là. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([s.intrus, ...trois]),
        expected: [s.intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un paragraphe est un bloc qui traite d'une seule idée. Tout ce qui n'en parle pas doit sortir.",
          "Relis chaque phrase en te demandant : est-ce que celle-là parle bien du même sujet ?",
          `${trois.join(" ")} — toutes parlent de ${s.titre}. « ${s.intrus} » vient d'ailleurs.`,
          `La phrase à enlever est « ${s.intrus} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_prod_paragraphe_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_paragraphe",
    difficulty: 3,
    theme: "neutral",
    // ⚠️ Le « pourquoi » du paragraphe est déjà posé côté lecture
    // (ce2_comp_mise_en_page_fixed_1). Ici c'est celui qui ÉCRIT qui décide :
    // la question porte sur le moment où l'on va à la ligne, pas sur la raison.
    text: "Tu écris un texte. Quand vas-tu à la ligne pour commencer un nouveau paragraphe ?",
    format: "qcm",
    choices: [
      "Quand je change d'idée : chaque paragraphe ne parle que d'une chose.",
      // L'erreur réelle : la ligne dictée par la feuille, pas par le sens.
      "Quand ma ligne est arrivée au bord de la feuille.",
      "Toutes les cinq phrases, pour que ce soit régulier.",
      "Quand j'ai écrit une phrase trop longue.",
    ],
    expected: ["Quand je change d'idée : chaque paragraphe ne parle que d'une chose."],
    comparator: "mcq_exact",
    hint: "Regarde ce qui change entre deux paragraphes d'un texte que tu connais.",
    explanation: exp(
      "Un paragraphe regroupe les phrases qui parlent d'une même idée. On change de paragraphe quand on change d'idée.",
      "Quand tu écris, arrête-toi à la fin de chaque paragraphe et vérifie qu'il ne parle bien que d'une chose.",
      "Dans un récit : un paragraphe pour le départ, un pour ce qui arrive, un pour la fin. Le lecteur suit sans se perdre — et toi non plus.",
      "Parce qu'on change d'idée : chaque paragraphe traite d'une seule chose.",
    ),
    tags: ["ce2", "production", "paragraphe", "methode", "qcm"],
  },

  /* ── CE2_PROD_CONNECTEURS ─────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_connecteurs_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_connecteurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Demande-toi ce que le petit mot doit relier : un ordre, une cause, une conséquence ?",
    tags: ["ce2", "production", "connecteurs", "template"],
    generate: () => {
      const c = randomChoice(CONNECTEURS);
      return {
        text: `Complète : « ${c.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([c.connecteur, ...c.autres]),
        expected: [c.connecteur],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un connecteur relie deux idées et dit COMMENT elles se relient : dans le temps, par une cause, par une conséquence.",
          "Lis les deux phrases, puis demande-toi ce que la seconde fait par rapport à la première.",
          `« ${c.connecteur} » convient : ${c.sens}.`,
          `On écrit « ${c.connecteur} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_connecteurs_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_connecteurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Chaque connecteur a son rôle : ordre, cause, conséquence, surprise.",
    tags: ["ce2", "production", "connecteurs", "template"],
    generate: () => {
      const c = randomChoice(CONNECTEURS);
      const autres = shuffle(CONNECTEURS.filter((x) => x.sens !== c.sens)).map((x) => x.sens);
      return {
        text: `Dans « ${c.phrase.replace("___", c.connecteur)} », à quoi sert « ${c.connecteur} » ?`,
        format: "qcm" as const,
        choices: choix(c.sens, autres),
        expected: [c.sens],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les connecteurs ne sont pas interchangeables : chacun dit un lien précis entre deux idées.",
          "Remplace le connecteur par un autre et relis : si le sens change, c'est qu'il servait à quelque chose.",
          `« ${c.connecteur} » : ${c.sens}.`,
          `Il sert à cela : ${c.sens}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_connecteurs_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_connecteurs",
    difficulty: 3,
    theme: "neutral",
    hint: "Le lien existe déjà entre les deux idées. Le mot ne fait que le dire.",
    tags: ["ce2", "production", "connecteurs", "methode"],
    generate: () => {
      const c = randomChoice(CONNECTEURS);
      const bonne = `Je cherche le lien entre les deux idées, puis je prends le mot qui le dit : ici « ${c.connecteur} », ${c.sens}.`;
      return {
        text: `« ${c.phrase} »\n\nComment choisis-tu le mot qui relie les deux idées ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : « et » branché partout, et plus aucun lien dit.
          "Je mets « et » : il va avec tout.",
          "Je prends un mot au hasard dans la liste : ils veulent tous dire la même chose.",
          "Je prends le plus court : la phrase reste légère.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un connecteur dit comment deux idées se relient : dans le temps, ou par une cause.",
          "Lis les deux idées, trouve le lien, puis choisis le mot qui le dit.",
          `Ici, « ${c.connecteur} » convient : ${c.sens}.`,
          `Par exemple « ${c.connecteur} » : ${c.sens}.`,
        ),
      };
    },
  },

  /* ── CE2_PROD_ORGANISER ───────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_organiser_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_organiser",
    difficulty: 2,
    theme: "neutral",
    hint: "Cherche ce qui doit forcément arriver en premier.",
    tags: ["ce2", "production", "organiser", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      return {
        text: `Tu écris un texte sur ${s.titre}.\n\nPar quelle phrase dois-tu commencer ?`,
        format: "qcm" as const,
        choices: shuffle([...s.etapes]),
        expected: [s.etapes[0]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Organiser ses idées, c'est les mettre dans un ordre que le lecteur peut suivre.",
          "Cherche l'action qui doit avoir lieu avant toutes les autres : sans elle, la suite n'a pas de sens.",
          `L'ordre est : ${s.etapes.join(" → ")}`,
          `On commence par : « ${s.etapes[0]} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_organiser_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_organiser",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce qui vient JUSTE après, pas ce qui vient à la fin.",
    tags: ["ce2", "production", "organiser", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      return {
        text: `Tu écris un texte sur ${s.titre}. Tu viens d'écrire :\n\n« ${s.etapes[1]} »\n\nQue vient-il juste après ?`,
        format: "qcm" as const,
        choices: shuffle([s.etapes[2], s.etapes[0], s.etapes[3], s.intrus]),
        expected: [s.etapes[2]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un texte bien organisé suit un fil : chaque phrase découle de la précédente.",
          "Relis la dernière phrase écrite et demande-toi ce qui se passe ensuite, logiquement.",
          `L'ordre est : ${s.etapes.join(" → ")}`,
          `Juste après vient : « ${s.etapes[2]} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_organiser_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_organiser",
    difficulty: 3,
    theme: "neutral",
    hint: "Il se passe quelque chose avant la première phrase.",
    tags: ["ce2", "production", "organiser", "methode"],
    generate: () => {
      const s = randomChoice(SUITES);
      const bonne = "Je note mes idées en vrac, trois ou quatre, puis je les numérote dans l'ordre.";
      return {
        text: `Tu dois écrire un texte sur ${s.titre}.\n\nQue fais-tu AVANT d'écrire la première phrase ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : partir au fil de la plume, et tourner en rond.
          "Je commence tout de suite : les idées viendront en écrivant.",
          // La voisine : le titre se choisit après, quand on sait ce qu'on a dit.
          "Je cherche d'abord un beau titre.",
          "Je compte combien de lignes je dois remplir.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "On n'écrit pas au fil de la plume : on note d'abord ses idées, puis on les range.",
          "Trois ou quatre étapes suffisent. On les écrit en vrac, puis on les numérote.",
          `Par exemple : ${s.etapes.join(" puis ")}`,
          `Par exemple : ${s.etapes.join(" ")}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_DIALOGUE ────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_dialogue_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_dialogue",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde les deux points, les guillemets, et où se place le point final.",
    tags: ["ce2", "production", "dialogue", "template"],
    generate: () => {
      const d = randomChoice(DIALOGUES);
      return {
        // ⚠️ La règle est nommée dans l'énoncé : sans elle, le gabarit ne
        // produisait qu'UN seul énoncé, quel que soit le dialogue tiré.
        text: `Tu écris un dialogue. On te rappelle la règle : ${d.regle}.\n\nUne seule de ces phrases la respecte. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([d.correct, ...d.fautes]),
        expected: [d.correct],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire un dialogue demande une ponctuation à part : deux points, guillemets, tirets.",
          "Vérifie trois choses : les deux points avant les paroles, les guillemets autour, et le point à l'intérieur.",
          `« ${d.correct} » — ${d.regle}.`,
          `La phrase correcte est « ${d.correct} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_dialogue_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_dialogue",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux signes, dans cet ordre : un qui annonce, un qui encadre.",
    tags: ["ce2", "production", "dialogue", "methode"],
    generate: () => {
      const d = randomChoice(DIALOGUES);
      const bonne = `J'annonce avec deux points, puis j'encadre les paroles avec des guillemets : ${d.correct}`;
      return {
        text: `Tu veux écrire qu'un personnage parle.\n\nComment ponctues-tu ses paroles ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : marquer la parole par le ton, faute de savoir la ponctuer.
          "Je mets un point d'exclamation : on entend bien qu'il parle.",
          "J'écris les paroles en majuscules, pour qu'on les voie.",
          "Je vais à la ligne, et ça suffit.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Pour rapporter des paroles, on annonce avec deux points, puis on encadre avec des guillemets.",
          "Dans un dialogue à plusieurs répliques, on peut aussi ouvrir chaque réplique par un tiret.",
          `${d.correct} — ${d.regle}.`,
          `Par exemple : ${d.correct}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_RECIT ───────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_recit_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_recit",
    difficulty: 3,
    theme: "neutral",
    hint: "Un récit a un début, quelque chose qui arrive, et une fin.",
    tags: ["ce2", "production", "recit", "template"],
    generate: () => {
      const s = randomChoice(SUITES);
      return {
        text: `Tu écris un récit sur ${s.titre}.\n\nQu'est-ce qu'il faut absolument y trouver ?`,
        format: "qcm" as const,
        choices: shuffle([
          "un début qui plante le décor, quelque chose qui arrive, et une fin",
          "une liste d'idées séparées par des virgules",
          "beaucoup d'adjectifs, même sans histoire",
          "seulement des dialogues",
        ]),
        expected: ["un début qui plante le décor, quelque chose qui arrive, et une fin"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un récit raconte : il faut un début, un évènement qui change quelque chose, et une fin.",
          "Avant d'écrire, réponds à trois questions : où et quand ça commence, ce qui arrive, comment ça se termine.",
          `Pour ${s.titre} : « ${s.etapes[0]} » pour le début, « ${s.etapes[2]} » pour ce qui arrive, « ${s.etapes[3]} » pour la fin.`,
          "Il faut un début, quelque chose qui arrive, et une fin.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_recit_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_recit",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois moments, et un mot qui les relie.",
    tags: ["ce2", "production", "recit", "methode"],
    generate: () => {
      const s = randomChoice(SUITES);
      const bonne = "Je dis ce qui est là au début, ce qui arrive, comment ça finit — et je relie mes phrases avec un connecteur.";
      return {
        text: `Tu racontes ${s.titre} en trois phrases.\n\nComment t'y prends-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : un décor très soigné, et rien qui arrive.
          "Je décris le décor pendant mes trois phrases.",
          "Je raconte tout ce que je sais, sans m'arrêter.",
          "Je commence par la fin, pour donner envie.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un récit court tient en trois phrases : ce qui est là au début, ce qui arrive, comment ça finit.",
          "Relie tes phrases avec un connecteur : le lecteur suit le fil sans effort.",
          `Par exemple : ${s.etapes[0]} Ensuite, ${s.etapes[1].charAt(0).toLowerCase()}${s.etapes[1].slice(1)} Enfin, ${s.etapes[3].charAt(0).toLowerCase()}${s.etapes[3].slice(1)}`,
          `Par exemple : ${s.etapes.join(" ")}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_POEME ───────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_poeme_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_poeme",
    difficulty: 2,
    theme: "neutral",
    hint: "Deux mots riment quand leur fin se dit pareil.",
    tags: ["ce2", "production", "poeme", "template"],
    generate: () => {
      const r = randomChoice(RIMES);
      return {
        text: `Tu écris un poème. Ton premier vers est :\n\n« ${r.vers} »\n\nQuel mot peux-tu mettre à la fin du vers suivant, pour qu'il rime ?`,
        format: "qcm" as const,
        choices: shuffle([r.rime, ...r.nonRimes]),
        expected: [r.rime],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Deux mots riment quand leur fin se prononce de la même façon.",
          "Dis les deux mots l'un après l'autre et écoute seulement leur fin.",
          `« ${r.motFinal} » et « ${r.rime} » finissent pareil. Les autres mots parlent bien du même monde, mais ne riment pas.`,
          `Le mot qui rime est « ${r.rime} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_poeme_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_poeme",
    difficulty: 3,
    theme: "neutral",
    hint: "Un vers s'écrit à l'envers : la fin d'abord.",
    tags: ["ce2", "production", "poeme", "methode"],
    generate: () => {
      const r = randomChoice(RIMES);
      const bonne = `Je choisis d'abord le mot de la fin, celui qui rime avec « ${r.motFinal} » — par exemple « ${r.rime} » — et je construis le vers autour.`;
      return {
        text: `Voici le premier vers d'un poème :\n\n« ${r.vers} »\n\nComment fais-tu pour écrire le vers suivant ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : partir du début, et se retrouver coincé à la fin.
          "Je commence par le début du vers, et je verrai bien comment il finit.",
          "Je compte les lettres du premier vers et j'en écris autant.",
          "Je répète le premier vers en changeant un mot.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un poème joue avec les sons : les rimes reviennent à la fin des vers.",
          "Choisis d'abord le mot de la fin, celui qui rime. Le reste du vers se construit autour.",
          `« ${r.motFinal} » rime avec « ${r.rime} ». Par exemple : ${r.vers}, / et le jour se lève sur le ${r.rime}.`,
          `Un mot qui rime : « ${r.rime} ».`,
        ),
      };
    },
  },

  /* ── CE2_PROD_LEXIQUE_PRECIS ──────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_lexique_precis_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_lexique_precis",
    difficulty: 3,
    theme: "neutral",
    hint: "« faire », « mettre », « chose », « truc » : ces mots-là ne disent presque rien.",
    tags: ["ce2", "production", "lexique", "template"],
    generate: () => {
      const m = randomChoice(MOTS_VAGUES);
      const autres = shuffle(MOTS_VAGUES.filter((x) => x.motPrecis !== m.motPrecis)).map(
        (x) => x.motPrecis,
      );
      return {
        text: `« ${m.phraseVague} »\n\nPar quel mot plus précis peux-tu remplacer « ${m.motVague} » ?`,
        format: "qcm" as const,
        choices: choix(m.motPrecis, autres),
        expected: [m.motPrecis],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot précis en dit plus qu'un mot passe-partout. « faire », « mettre », « chose » et « truc » ne montrent rien au lecteur.",
          "Ferme les yeux et imagine la scène : quel mot dit exactement ce que tu vois ?",
          `${m.phraseVague} → ${m.phrasePrecise}. Le lecteur voit la scène, maintenant.`,
          `On écrit « ${m.motPrecis} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_lexique_precis_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_lexique_precis",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul mot est à changer. Encore faut-il savoir lequel.",
    tags: ["ce2", "production", "lexique", "methode"],
    generate: () => {
      const m = randomChoice(MOTS_VAGUES);
      const bonne = `Je repère le mot passe-partout — « ${m.motVague} » — et je le remplace par un mot qui montre la scène : « ${m.motPrecis} ».`;
      return {
        text: `« ${m.phraseVague} »\n\nComment rends-tu cette phrase plus précise ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : décorer au lieu de préciser.
          "J'ajoute des adjectifs partout : la phrase sera plus riche.",
          "Je rallonge la phrase : plus c'est long, plus c'est précis.",
          // La voisine : un synonyme, oui, mais pas n'importe lequel.
          "Je remplace un mot par un synonyme, n'importe lequel.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le lexique précis fait voir la scène : c'est ce qui sépare un texte plat d'un texte vivant.",
          "Repère les mots passe-partout — faire, mettre, dire, chose, truc — et remplace-les.",
          `${m.phraseVague} → ${m.phrasePrecise}`,
          `Par exemple : ${m.phrasePrecise}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_REVISER ─────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_reviser_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_reviser",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas une faute d'orthographe. C'est quelque chose qui se répète, ou qui ne dit rien.",
    tags: ["ce2", "production", "reviser", "template"],
    generate: () => {
      const r = randomChoice(A_REVOIR);
      const autres = shuffle(A_REVOIR.filter((x) => x.defaut !== r.defaut)).map((x) => x.defaut);
      return {
        text: `« ${r.avant} »\n\nQu'est-ce qui ne va pas dans ce petit texte ?`,
        format: "qcm" as const,
        choices: choix(r.defaut, autres),
        expected: [r.defaut],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Réviser un texte, ce n'est pas seulement corriger les fautes : c'est le rendre plus agréable à lire.",
          "Cherche d'abord les répétitions, puis les mots qui ne disent rien de précis.",
          `${r.avant} → ${r.apres}`,
          `Le défaut : ${r.defaut}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_reviser_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_reviser",
    difficulty: 3,
    theme: "neutral",
    hint: "La bonne version dit la même chose, mais mieux.",
    tags: ["ce2", "production", "reviser", "template"],
    generate: () => {
      const r = randomChoice(A_REVOIR);
      const autres = shuffle(A_REVOIR.filter((x) => x.apres !== r.apres)).map((x) => x.apres);
      return {
        text: `« ${r.avant} »\n\nQuelle version améliorée garde le même sens ?`,
        format: "qcm" as const,
        choices: choix(r.apres, [r.avant], autres),
        expected: [r.apres],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Améliorer un texte, c'est garder ce qu'il dit et changer la façon de le dire.",
          "Supprime les répétitions, remplace les mots vagues, relie les phrases entre elles.",
          `${r.avant} → ${r.apres}. On a réglé ce défaut : ${r.defaut}.`,
          `La bonne version : « ${r.apres} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_reviser_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_reviser",
    difficulty: 3,
    theme: "neutral",
    hint: "On ne relit pas tout en même temps : une chose à la fois.",
    tags: ["ce2", "production", "reviser", "methode"],
    generate: () => {
      const r = randomChoice(A_REVOIR);
      const bonne = "Je cherche une chose à la fois : d'abord les répétitions, puis les mots vagues, puis les liens entre les phrases.";
      return {
        text: `« ${r.avant} »\n\nTu dois relire ce passage pour l'améliorer. Comment t'y prends-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : relire vite et tout à la fois, donc ne rien voir.
          "Je relis vite, en entier : si ça sonne bien, c'est bon.",
          "Je ne corrige que l'orthographe : le reste ne se corrige pas.",
          "Je recommence le passage depuis le début, avec d'autres phrases.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Relire méthodiquement, c'est chercher une chose à la fois : les répétitions, puis les mots vagues, puis les liens entre les phrases.",
          "Entoure les mots qui reviennent, puis remplace-les par un pronom ou un synonyme.",
          `${r.avant} → ${r.apres}. Défaut réglé : ${r.defaut}.`,
          `Par exemple : ${r.apres}`,
        ),
      };
    },
  },

  /* ── CE2_PROD_DEFI ────────────────────────────────────────────────────── */
  {
    kind: "template",
    id: "ce2_prod_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux défauts à repérer : un mot vague, et une répétition.",
    tags: ["ce2", "production", "defi", "template"],
    generate: () => {
      const m = randomChoice(MOTS_VAGUES);
      const r = randomChoice(A_REVOIR);
      return {
        text: `Deux camarades te montrent leur brouillon.\n\nA : « ${m.phraseVague} »\nB : « ${r.avant} »\n\nQuel conseil donnes-tu à A ?`,
        format: "qcm" as const,
        choices: shuffle([
          `remplacer « ${m.motVague} » par un mot plus précis`,
          `supprimer une répétition`,
          `ajouter un point d'exclamation`,
          `couper la phrase en deux`,
        ]),
        expected: [`remplacer « ${m.motVague} » par un mot plus précis`],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chaque défaut a son remède : un mot vague se remplace, une répétition se supprime.",
          "Nomme le défaut avant de proposer le remède : c'est ce qui rend un conseil utile.",
          `A : ${m.phraseVague} → ${m.phrasePrecise}. B, lui, a un autre problème : ${r.defaut}.`,
          `Le conseil : remplacer « ${m.motVague} » par un mot plus précis.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_prod_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "production_ecrite",
    microId: "ce2_prod_defi",
    difficulty: 3,
    theme: "neutral",
    // Le cran de plus : ce n'est plus un geste, c'est l'enchainement des trois
    // — organiser, écrire, relire. Le piège fin inverse le dernier et le premier.
    hint: "Trois gestes, et leur ordre compte.",
    tags: ["ce2", "production", "defi", "methode"],
    generate: () => {
      const s = randomChoice(SUITES);
      const m = randomChoice(MOTS_VAGUES);
      const bonne = "Je note mes idées et je les range, j'écris mes phrases en les reliant, puis je relis en chassant les mots passe-partout.";
      return {
        text: `Tu écris trois phrases sur ${s.titre}, avec un connecteur, et sans « chose », ni « truc », ni « faire ».\n\nDans quel ordre t'y prends-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège fin : on ne peut pas relire ce qui n'est pas encore écrit.
          "Je chasse d'abord les mots passe-partout, avant même d'avoir écrit.",
          "J'écris mes trois phrases d'un trait, et je ne relis pas : c'est plus frais.",
          "J'écris d'abord la troisième phrase, puis je remonte.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire un texte court, c'est tenir plusieurs choses à la fois : l'ordre, les liens, et la précision des mots.",
          "Note tes idées, range-les, écris-les en les reliant, puis relis en chassant les mots passe-partout.",
          `Par exemple : ${s.etapes[0]} Ensuite, ${s.etapes[1].charAt(0).toLowerCase()}${s.etapes[1].slice(1)} Et « ${m.motVague} » aurait pu devenir « ${m.motPrecis} ».`,
          `Par exemple : ${s.etapes.slice(0, 3).join(" ")}`,
        ),
      };
    },
  },
];
