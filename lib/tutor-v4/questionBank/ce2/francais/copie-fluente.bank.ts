// lib/tutor-v4/questionBank/ce2/francais/copie-fluente.bank.ts
//
// La copie fluente au CE2.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   — « Copier ou transcrire, en écriture cursive, un texte d'une dizaine de
//     lignes en respectant la mise en page » ;
//   — « Relire pour vérifier la conformité » ;
//   — repérer une omission, un mot doublé, une erreur de ponctuation.
//
// ⚠️ ON NE PEUT PAS FAIRE COPIER À L'ÉCRAN. La copie est un geste : la main, le
// cahier, l'écriture cursive. Ce que le coach peut faire — et c'est ce qu'il
// fait ici — c'est travailler les DEUX moitiés de la copie qui ne sont pas
// gestuelles : la stratégie (que regarde-t-on, et combien de mots à la fois) et
// la RELECTURE (comparer un modèle et une copie, trouver l'écart).
//
// L'IDÉE DE LA NOTION : copier vite, ce n'est pas écrire vite. C'est lever les
// yeux moins souvent. Un enfant qui copie lettre à lettre lève les yeux
// quarante fois par ligne ; celui qui prend un groupe de mots entier les lève
// trois fois. C'est là que tout se joue, et cela s'apprend.
//
// ⚠️ LES COPIES FAUTIVES SONT ÉCRITES À LA MAIN, une par défaut : un mot omis,
// un mot doublé, un point manquant, un accent tombé. Générer ces écarts en
// supprimant un mot au hasard produirait des phrases parfois encore correctes —
// et l'élève aurait deux bonnes réponses sous les yeux.

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
   MODÈLES ET COPIES

   Chaque copie fautive porte UN défaut, et un seul. Les quatre familles sont
   celles qu'on voit vraiment sur les cahiers : le mot sauté, le mot écrit deux
   fois, le point oublié, l'accent tombé en route.
   ═══════════════════════════════════════════════════════════════════════════ */

type Copie = {
  readonly modele: string;
  readonly omission: string;
  readonly motOmis: string;
  readonly doublon: string;
  readonly motDouble: string;
  readonly ponctuation: string;
  readonly accent: string;
};

const COPIES: readonly Copie[] = [
  {
    modele: "Le pêcheur range ses filets avant la nuit.",
    omission: "Le pêcheur range filets avant la nuit.",
    motOmis: "ses",
    doublon: "Le pêcheur range ses ses filets avant la nuit.",
    motDouble: "ses",
    ponctuation: "Le pêcheur range ses filets avant la nuit",
    accent: "Le pecheur range ses filets avant la nuit.",
  },
  {
    modele: "Les enfants ramassent les letchis tombés dans l'herbe.",
    omission: "Les enfants ramassent les letchis dans l'herbe.",
    motOmis: "tombés",
    doublon: "Les enfants ramassent les les letchis tombés dans l'herbe.",
    motDouble: "les",
    ponctuation: "Les enfants ramassent les letchis tombés dans l'herbe",
    accent: "Les enfants ramassent les letchis tombes dans l'herbe.",
  },
  {
    modele: "Mamie prépare un cari très épicé pour midi.",
    omission: "Mamie prépare un cari épicé pour midi.",
    motOmis: "très",
    doublon: "Mamie prépare un un cari très épicé pour midi.",
    motDouble: "un",
    ponctuation: "Mamie prépare un cari très épicé pour midi",
    accent: "Mamie prepare un cari très épicé pour midi.",
  },
  {
    modele: "Le vent souffle fort sur le piton nuageux.",
    omission: "Le vent souffle sur le piton nuageux.",
    motOmis: "fort",
    doublon: "Le vent souffle fort sur sur le piton nuageux.",
    motDouble: "sur",
    ponctuation: "Le vent souffle fort sur le piton nuageux",
    accent: "Le vent souffle fort sur le piton nuageux!",
  },
  {
    modele: "Nina observe le nid depuis trois jours déjà.",
    omission: "Nina observe le nid depuis trois jours.",
    motOmis: "déjà",
    doublon: "Nina observe le le nid depuis trois jours déjà.",
    motDouble: "le",
    ponctuation: "Nina observe le nid depuis trois jours déjà",
    accent: "Nina observe le nid depuis trois jours deja.",
  },
  {
    modele: "Les élèves recopient la phrase écrite au tableau.",
    omission: "Les élèves recopient la phrase au tableau.",
    motOmis: "écrite",
    doublon: "Les élèves recopient la phrase écrite au au tableau.",
    motDouble: "au",
    ponctuation: "Les élèves recopient la phrase écrite au tableau",
    accent: "Les eleves recopient la phrase écrite au tableau.",
  },
  {
    modele: "Le margouillat file rapidement entre les pierres chaudes.",
    omission: "Le margouillat file entre les pierres chaudes.",
    motOmis: "rapidement",
    doublon: "Le margouillat file rapidement entre les les pierres chaudes.",
    motDouble: "les",
    ponctuation: "Le margouillat file rapidement entre les pierres chaudes",
    accent: "Le margouillat file rapidement entre les pierres chaudes;",
  },
  {
    modele: "Yann plie son filet et rentre avant la nuit.",
    omission: "Yann plie son filet et rentre la nuit.",
    motOmis: "avant",
    doublon: "Yann plie son son filet et rentre avant la nuit.",
    motDouble: "son",
    ponctuation: "Yann plie son filet et rentre avant la nuit,",
    accent: "Yann plie son filet et rentre avant la nuit .",
  },
  {
    modele: "Mon cousin arrose les plantes vertes tous les matins.",
    omission: "Mon cousin arrose les plantes tous les matins.",
    motOmis: "vertes",
    doublon: "Mon cousin arrose les plantes vertes tous tous les matins.",
    motDouble: "tous",
    ponctuation: "Mon cousin arrose les plantes vertes tous les matins",
    accent: "Mon cousin arrose les plantes verte tous les matins.",
  },
  {
    modele: "La maitresse raconte une histoire avant la récréation.",
    omission: "La maitresse raconte une histoire la récréation.",
    motOmis: "avant",
    doublon: "La maitresse raconte une une histoire avant la récréation.",
    motDouble: "une",
    ponctuation: "La maitresse raconte une histoire avant la récréation",
    accent: "La maitresse raconte une histoire avant la recreation.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA STRATÉGIE DE COPIE
   ═══════════════════════════════════════════════════════════════════════════ */

type Strategie = {
  readonly situation: string;
  readonly bonne: string;
  readonly mauvaises: readonly string[];
};

const STRATEGIES: readonly Strategie[] = [
  {
    situation: "Tu dois copier la phrase « Le bateau quitte le port au petit matin. »",
    bonne: "lire un groupe de mots entier, le garder en tête, puis l'écrire sans regarder",
    mauvaises: [
      "copier lettre par lettre en regardant le modèle à chaque lettre",
      "copier le dernier mot d'abord, pour ne pas l'oublier",
      "écrire la phrase de mémoire sans l'avoir lue en entier",
    ],
  },
  {
    situation: "Tu copies un texte de dix lignes et tu es beaucoup plus lent que les autres.",
    bonne: "prendre des groupes de mots plus longs, pour lever les yeux moins souvent",
    mauvaises: [
      "écrire plus vite, en formant moins bien les lettres",
      "sauter les mots que tu connais déjà",
      "copier debout, pour mieux voir le tableau",
    ],
  },
  {
    situation: "Tu viens de finir de copier un paragraphe.",
    bonne: "relire ta copie en la comparant au modèle, ligne par ligne",
    mauvaises: [
      "relire seulement le modèle, pour vérifier que tu as tout lu",
      "rendre tout de suite : la relecture fait perdre du temps",
      "demander à un camarade de relire à ta place",
    ],
  },
  {
    situation: "Le modèle est écrit au tableau, loin de ta place.",
    bonne: "prendre des groupes de mots plus courts, mais bien les mémoriser avant d'écrire",
    mauvaises: [
      "recopier une lettre sur deux et compléter après",
      "attendre que le maitre efface pour écrire de mémoire",
      "copier les mots dans le désordre",
    ],
  },
  {
    situation: "Le texte à copier contient un dialogue avec des tirets.",
    bonne: "reproduire aussi les retours à la ligne et les tirets, pas seulement les mots",
    mauvaises: [
      "écrire tout à la suite pour gagner de la place",
      "remplacer les tirets par des guillemets",
      "copier d'abord toutes les répliques d'un même personnage",
    ],
  },
  {
    situation: "Tu dois copier une recette avec une liste d'ingrédients.",
    bonne: "garder la liste en colonne, une ligne par ingrédient, comme dans le modèle",
    mauvaises: [
      "écrire les ingrédients à la suite, séparés par des virgules",
      "ranger les ingrédients dans l'ordre alphabétique",
      "ne copier que les ingrédients que tu connais",
    ],
  },
  {
    situation: "Tu t'aperçois au milieu de la copie que tu as sauté une ligne entière.",
    bonne: "reprendre à la ligne manquante et la réécrire à sa place, proprement",
    mauvaises: [
      "l'ajouter à la fin, en expliquant qu'elle allait avant",
      "recommencer toute la page depuis le début",
      "laisser comme ça : une ligne sur dix, ce n'est pas grave",
    ],
  },
  {
    situation: "Le texte contient un mot que tu n'as jamais vu et qui est très long.",
    bonne: "le copier en deux ou trois morceaux, en vérifiant chaque morceau",
    mauvaises: [
      "l'écrire de mémoire après l'avoir lu une fois",
      "le remplacer par un mot que tu connais",
      "le copier lettre par lettre, sans jamais lever les yeux",
    ],
  },
  {
    situation: "Tu copies vite et ton écriture devient difficile à relire.",
    bonne: "ralentir un peu la main, mais continuer à prendre de grands groupes de mots",
    mauvaises: [
      "continuer : ce qui compte, c'est de finir avant les autres",
      "revenir à la copie lettre par lettre, plus soignée",
      "écrire en majuscules, c'est plus lisible",
    ],
  },
  {
    situation: "On te donne cinq minutes pour copier un texte que tu ne finiras pas.",
    bonne: "copier proprement et sans faute ce que tu peux, plutôt que tout copier mal",
    mauvaises: [
      "copier tout très vite, quitte à sauter des mots",
      "copier seulement le début et la fin",
      "copier un mot sur deux et compléter chez toi",
    ],
  },
  {
    situation: "Tu recopies au propre un texte que tu as toi-même écrit.",
    bonne: "copier ton brouillon groupe par groupe, comme n'importe quel modèle",
    mauvaises: [
      "réécrire de mémoire, puisque c'est toi qui l'as écrit",
      "changer les phrases au passage, pour faire mieux",
      "ne recopier que les phrases dont tu es content",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA MISE EN PAGE À REPRODUIRE
   ═══════════════════════════════════════════════════════════════════════════ */

type MiseEnPage = {
  readonly document: string;
  readonly aReproduire: string;
  readonly autres: readonly string[];
};

const MISES_EN_PAGE: readonly MiseEnPage[] = [
  {
    document: "un poème",
    aReproduire: "les retours à la ligne à la fin de chaque vers",
    autres: [
      "les majuscules uniquement en début de phrase",
      "une seule marge, à droite",
      "les mots séparés par des tirets",
    ],
  },
  {
    document: "une recette",
    aReproduire: "la liste des ingrédients en colonne, puis les étapes numérotées",
    autres: [
      "tout le texte en un seul bloc",
      "les quantités écrites en toutes lettres",
      "le titre à la fin",
    ],
  },
  {
    document: "une scène de théâtre",
    aReproduire: "le nom du personnage en capitales, puis le tiret, puis sa réplique",
    autres: [
      "toutes les répliques à la suite, sans les noms",
      "les noms des personnages en bas de page",
      "les didascalies en majuscules",
    ],
  },
  {
    document: "un texte documentaire avec des sous-titres",
    aReproduire: "les sous-titres sur une ligne à part, avant chaque paragraphe",
    autres: [
      "les sous-titres au milieu du paragraphe",
      "un seul paragraphe pour tout le texte",
      "les sous-titres regroupés à la fin",
    ],
  },
  {
    document: "une lettre",
    aReproduire: "la date en haut à droite, la formule de politesse et la signature à la fin",
    autres: [
      "la date au milieu du texte",
      "la signature en haut",
      "aucun retour à la ligne du début à la fin",
    ],
  },
  {
    document: "une règle du jeu",
    aReproduire: "les étapes numérotées, une par ligne, dans l'ordre",
    autres: [
      "toutes les étapes dans un seul paragraphe",
      "les étapes rangées de la plus courte à la plus longue",
      "seulement la première et la dernière étape",
    ],
  },
  {
    document: "un récit découpé en paragraphes",
    aReproduire: "l'alinéa au début de chaque paragraphe, et le saut de ligne entre eux",
    autres: [
      "un seul bloc, pour gagner de la place",
      "un retour à la ligne à chaque phrase",
      "les paragraphes rangés du plus court au plus long",
    ],
  },
  {
    document: "une affiche pour la classe",
    aReproduire: "le titre en gros, centré, et les informations en dessous",
    autres: [
      "le titre écrit comme le reste du texte",
      "toutes les informations sur une seule ligne",
      "le titre en bas de l'affiche",
    ],
  },
  {
    document: "un tableau à deux colonnes",
    aReproduire: "les deux colonnes, avec chaque mot en face de celui qui lui correspond",
    autres: [
      "une seule colonne, en recopiant l'une puis l'autre",
      "les mots dans le désordre, du moment qu'ils y sont tous",
      "seulement la première colonne",
    ],
  },
  {
    document: "un texte avec un mot souligné",
    aReproduire: "le soulignement, à sa place, sur le même mot",
    autres: [
      "souligner tout le texte pour être sûr",
      "remplacer le soulignement par des majuscules",
      "ignorer le soulignement : ce n'est pas du texte",
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const copieFluenteBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_COPIE_PHRASE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_copie_phrase_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Compare les deux phrases mot à mot, de gauche à droite.",
    tags: ["ce2", "copie", "phrase", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\nTa copie : « ${c.omission} »\n\nQuel mot as-tu oublié ?`,
        format: "qcm" as const,
        choices: choix(c.motOmis, [c.motDouble], c.modele.replace(/[.!?,;]/g, "").split(" ")),
        expected: [c.motOmis],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Copier une phrase, c'est la reproduire mot pour mot, sans en perdre en route.",
          "Pose ton doigt sur le modèle et un autre sur ta copie, puis avance mot à mot en même temps.",
          `Il manque « ${c.motOmis} ». Le mot sauté est presque toujours un petit mot ou un mot au milieu du groupe.`,
          `Le mot oublié est « ${c.motOmis} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_phrase_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_phrase",
    difficulty: 2,
    theme: "neutral",
    hint: "Une seule des quatre est identique au modèle.",
    tags: ["ce2", "copie", "phrase", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\n\nLaquelle de ces copies est EXACTEMENT identique au modèle ?`,
        format: "qcm" as const,
        choices: shuffle([c.modele, c.omission, c.doublon, c.accent]),
        expected: [c.modele],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une copie conforme reproduit tout : les mots, leur ordre, les accents et la ponctuation.",
          "Compare quatre choses dans cet ordre : le nombre de mots, les mots eux-mêmes, les accents, puis le point final.",
          `« ${c.modele} » est la seule identique. Les autres ont perdu un mot, doublé un mot, ou laissé tomber un accent.`,
          `La copie exacte est « ${c.modele} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_phrase_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis combien de mots tu prends à la fois, et ce que tu fais ensuite.",
    tags: ["ce2", "copie", "phrase", "ouverte"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Tu dois copier cette phrase : « ${c.modele} »\n\nRaconte comment tu t'y prends, du premier regard au point final.`,
        format: "open" as const,
        expected: ["groupe", "plusieurs mots", "mémoire", "memoire", "tête", "tete", "relis", "sans regarder"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Copier vite, ce n'est pas écrire vite : c'est lever les yeux moins souvent.",
          "Lis un groupe de mots entier, garde-le en tête, écris-le sans regarder le modèle, puis vérifie.",
          "Lettre à lettre, on lève les yeux quarante fois par ligne. Par groupes, trois fois. C'est là que tout se joue.",
          "On lit un groupe de mots, on le garde en tête, on l'écrit sans regarder, puis on vérifie.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_COPIE_PARAGRAPHE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_copie_paragraphe_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_paragraphe",
    difficulty: 3,
    theme: "neutral",
    hint: "Un mot a été écrit deux fois. Lequel ?",
    tags: ["ce2", "copie", "paragraphe", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\nTa copie : « ${c.doublon} »\n\nQuel mot as-tu écrit deux fois ?`,
        format: "qcm" as const,
        choices: choix(c.motDouble, [c.motOmis], c.modele.replace(/[.!?,;]/g, "").split(" ")),
        expected: [c.motDouble],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le mot doublé arrive quand on relève les yeux au mauvais endroit : on reprend juste avant là où on s'était arrêté.",
          "Après chaque groupe copié, repère précisément le mot suivant du modèle avant de repartir.",
          `« ${c.motDouble} » apparait deux fois. C'est un petit mot : ce sont eux qu'on double, parce que l'œil les confond.`,
          `Le mot écrit deux fois est « ${c.motDouble} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_paragraphe_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_paragraphe",
    difficulty: 3,
    theme: "neutral",
    hint: "Quatre familles de défauts : mot manquant, mot doublé, ponctuation, accent.",
    tags: ["ce2", "copie", "paragraphe", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      const cas = randomChoice([
        { copie: c.omission, quoi: "un mot a été oublié" },
        { copie: c.doublon, quoi: "un mot a été écrit deux fois" },
        { copie: c.ponctuation, quoi: "la ponctuation de fin est fausse" },
        { copie: c.accent, quoi: "un accent est tombé" },
      ]);
      return {
        text: `Modèle : « ${c.modele} »\nTa copie : « ${cas.copie} »\n\nQuelle sorte de défaut y a-t-il ?`,
        format: "qcm" as const,
        choices: shuffle([
          "un mot a été oublié",
          "un mot a été écrit deux fois",
          "la ponctuation de fin est fausse",
          "un accent est tombé",
        ]),
        expected: [cas.quoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les erreurs de copie se rangent en quelques familles. Savoir laquelle on fait souvent permet de la chercher en priorité.",
          "Compare le nombre de mots d'abord, puis les mots, puis les accents, puis la ponctuation.",
          `Ici, ${cas.quoi}.`,
          `C'est : ${cas.quoi}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_paragraphe_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_paragraphe",
    difficulty: 3,
    theme: "neutral",
    hint: "Explique pourquoi c'est toujours au moment où on relève les yeux que ça arrive.",
    tags: ["ce2", "copie", "paragraphe", "ouverte"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Tu as copié « ${c.doublon} » au lieu de « ${c.modele} ».\n\nExplique comment cette erreur a pu arriver, et comment l'éviter.`,
        format: "open" as const,
        expected: ["deux fois", "doublé", "double", "yeux", "regard", "repère", "repere", "endroit", "relis"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un mot doublé n'est pas une faute d'inattention : c'est une erreur de repérage entre le modèle et la copie.",
          "Avant de relever les yeux, retiens le DERNIER mot que tu viens d'écrire. En revenant au modèle, cherche-le, et repars juste après.",
          `« ${c.motDouble} » a été écrit deux fois parce que l'œil est revenu un mot trop tôt.`,
          "On a repris un mot trop tôt en revenant au modèle.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_COPIE_DIX_LIGNES — la stratégie
  ========================================================= */
  {
    kind: "template",
    id: "ce2_copie_dix_lignes_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_dix_lignes",
    difficulty: 3,
    theme: "neutral",
    hint: "Copier vite, ce n'est pas écrire vite.",
    tags: ["ce2", "copie", "strategie", "template"],
    generate: () => {
      const s = randomChoice(STRATEGIES);
      return {
        text: `${s.situation}\n\nQue vaut-il mieux faire ?`,
        format: "qcm" as const,
        choices: shuffle([s.bonne, ...s.mauvaises]),
        expected: [s.bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Copier dix lignes sans erreur ne demande pas d'écrire plus vite : cela demande de lever les yeux moins souvent.",
          "Prends le plus gros groupe de mots que tu peux garder en tête, écris-le en entier, puis reviens au modèle.",
          `Ici, il faut ${s.bonne}.`,
          `Il vaut mieux ${s.bonne}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_copie_dix_lignes_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_dix_lignes",
    difficulty: 3,
    theme: "neutral",
    text: "Deux élèves copient le même texte. L'un lève les yeux vers le modèle quarante fois par ligne, l'autre trois fois.\n\nQu'est-ce qui les distingue ?",
    format: "qcm",
    choices: [
      "La taille du morceau qu'ils gardent en tête avant d'écrire",
      "La vitesse à laquelle ils forment leurs lettres",
      "La qualité de leur stylo",
      "Leur place dans la classe",
    ],
    expected: ["La taille du morceau qu'ils gardent en tête avant d'écrire"],
    comparator: "mcq_exact",
    hint: "Que fait celui qui lève les yeux trois fois, entre deux regards ?",
    explanation: exp(
      "La vitesse de copie ne dépend presque pas de la vitesse d'écriture : elle dépend du nombre d'allers-retours entre le modèle et le cahier.",
      "Entraine-toi à retenir des morceaux de plus en plus longs : d'abord deux mots, puis un groupe, puis une phrase courte.",
      "Celui qui lève les yeux quarante fois copie lettre à lettre. Celui qui les lève trois fois a gardé un groupe entier en tête. À vitesse d'écriture égale, le second a fini quand le premier en est au tiers — et il fait moins d'erreurs, parce qu'il se repère mieux.",
      "La taille du morceau qu'ils gardent en tête avant d'écrire.",
    ),
    tags: ["ce2", "copie", "strategie", "methode", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_copie_dix_lignes_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_dix_lignes",
    difficulty: 3,
    theme: "neutral",
    text: "Tu dois copier un texte de dix lignes sans faute.\n\nRaconte ta méthode, du premier regard à la relecture finale.",
    format: "open",
    expected: ["groupe", "tête", "tete", "mémoire", "memoire", "relis", "relecture", "compare", "modèle", "modele"],
    comparator: "contains_keyword",
    hint: "Il y a deux temps : pendant la copie, et après.",
    explanation: exp(
      "Copier dix lignes se fait en deux temps : la copie par groupes de mots, puis la relecture comparée.",
      "Pendant : lire un groupe entier, le garder en tête, l'écrire sans regarder. Après : comparer ligne à ligne avec le modèle.",
      "Et une chose à ne pas oublier : le repère. Avant de relever les yeux, retiens le dernier mot écrit — c'est lui qui t'évitera d'en sauter un ou d'en doubler un.",
      "On copie par groupes de mots gardés en tête, puis on relit en comparant au modèle.",
    ),
    tags: ["ce2", "copie", "strategie", "methode", "ouverte"],
  },

  /* =========================================================
     CE2_COPIE_MISE_EN_PAGE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_copie_mise_en_page_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_mise_en_page",
    difficulty: 3,
    theme: "neutral",
    hint: "La mise en page fait partie du texte : elle se copie aussi.",
    tags: ["ce2", "copie", "mise-en-page", "template"],
    generate: () => {
      const m = randomChoice(MISES_EN_PAGE);
      return {
        text: `Tu dois copier ${m.document}.\n\nQu'est-ce qu'il faut reproduire en plus des mots ?`,
        format: "qcm" as const,
        choices: shuffle([m.aReproduire, ...m.autres]),
        expected: [m.aReproduire],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Copier, ce n'est pas seulement recopier des mots : c'est reproduire la façon dont ils sont posés sur la page.",
          "Avant d'écrire le premier mot, regarde la forme du document : où sont les retours à la ligne, les colonnes, les majuscules ?",
          `Pour ${m.document}, il faut reproduire ${m.aReproduire}. Sans cela, on ne reconnait plus de quel type de texte il s'agit.`,
          `Il faut reproduire ${m.aReproduire}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_mise_en_page_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_mise_en_page",
    difficulty: 3,
    theme: "neutral",
    hint: "Que perdrait-on si on écrivait tout à la suite ?",
    tags: ["ce2", "copie", "mise-en-page", "ouverte"],
    generate: () => {
      const m = randomChoice(MISES_EN_PAGE);
      return {
        text: `Tu copies ${m.document} en écrivant tout à la suite, sans reproduire sa présentation.\n\nQu'est-ce qui se perd ? Explique.`,
        format: "open" as const,
        expected: [
          ...m.aReproduire.split(" ").filter((w) => w.length > 5),
          "forme",
          "reconnait",
          "type",
          "lire",
          "présentation",
          "presentation",
        ],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "La mise en page n'est pas une décoration : c'est elle qui dit de quel type de texte il s'agit, et elle aide à le lire.",
          "Regarde la forme avant les mots, et reproduis-la : retours à la ligne, colonnes, capitales, tirets.",
          `Pour ${m.document}, il faut ${m.aReproduire}. Tout à la suite, on ne reconnait plus rien.`,
          `On perd ce qui permettait de reconnaitre le texte : ${m.aReproduire}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_COPIE_RELIRE
  ========================================================= */
  {
    kind: "template",
    id: "ce2_copie_relire_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_relire",
    difficulty: 3,
    theme: "neutral",
    hint: "Une seule des quatre copies est conforme au modèle.",
    tags: ["ce2", "copie", "relire", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\n\nTu relis quatre copies. Laquelle n'a AUCUN défaut ?`,
        format: "qcm" as const,
        choices: shuffle([c.modele, c.doublon, c.ponctuation, c.accent]),
        expected: [c.modele],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Relire une copie, c'est la comparer au modèle — pas la relire toute seule pour voir si elle « sonne bien ».",
          "Compare dans cet ordre : les mots, les accents, la ponctuation. Une chose à la fois.",
          `Seule « ${c.modele} » est conforme. Une autre a doublé un mot, une autre a perdu son point, une autre un accent.`,
          `La copie conforme est « ${c.modele} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_copie_relire_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_relire",
    difficulty: 3,
    theme: "neutral",
    text: "Pour relire une copie, vaut-il mieux regarder le modèle, ou sa propre feuille ?",
    format: "qcm",
    choices: [
      "Sa propre feuille, en la comparant mot à mot au modèle",
      "Le modèle seul : c'est lui qui est juste",
      "Ni l'un ni l'autre : il faut relire de mémoire",
      "La feuille du voisin, pour comparer",
    ],
    expected: ["Sa propre feuille, en la comparant mot à mot au modèle"],
    comparator: "mcq_exact",
    hint: "C'est ta copie qu'il faut corriger. Où sont les erreurs ?",
    explanation: exp(
      "Relire, c'est chercher l'écart entre ce qu'on a écrit et ce qu'il fallait écrire.",
      "Pose ton doigt sur TA feuille et avance mot à mot, en vérifiant chacun sur le modèle.",
      "Celui qui relit le modèle vérifie que le modèle est juste — il l'était déjà. Les erreurs sont sur ta feuille, et c'est là qu'il faut regarder.",
      "Sa propre feuille, en la comparant mot à mot au modèle.",
    ),
    tags: ["ce2", "copie", "relire", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_copie_relire_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_relire",
    difficulty: 3,
    theme: "neutral",
    hint: "Dis dans quel ordre tu vérifies les choses.",
    tags: ["ce2", "copie", "relire", "ouverte"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Tu viens de copier « ${c.modele} ».\n\nComment relis-tu ta copie ? Explique dans l'ordre.`,
        format: "open" as const,
        expected: ["mot à mot", "compare", "ma feuille", "doigt", "accent", "ponctuation", "point", "modèle", "modele"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Relire, c'est comparer sa copie au modèle, une chose à la fois.",
          "Trois passages : les mots (aucun oublié, aucun doublé), les accents, puis la ponctuation.",
          "Et on relit sur SA feuille, en avançant du doigt. L'œil qui relit le modèle ne voit jamais les erreurs de la copie.",
          "On compare sa copie au modèle mot à mot, puis on vérifie les accents et la ponctuation.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_COPIE_OMISSIONS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_copie_omissions_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_omissions",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la toute fin de la phrase.",
    tags: ["ce2", "copie", "omissions", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\nTa copie : « ${c.ponctuation} »\n\nQu'est-ce qui ne va pas ?`,
        format: "qcm" as const,
        choices: shuffle([
          "la ponctuation de fin n'est pas la bonne",
          "un mot a été oublié",
          "un mot a été écrit deux fois",
          "un accent manque",
        ]),
        expected: ["la ponctuation de fin n'est pas la bonne"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La ponctuation fait partie du texte au même titre que les mots. L'oublier, c'est une erreur de copie.",
          "Termine toujours ta relecture par le dernier signe de chaque phrase : c'est celui qu'on oublie le plus.",
          `Les mots sont tous là, et bien orthographiés. C'est le signe de fin qui manque ou qui a changé.`,
          "La ponctuation de fin n'est pas la bonne.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_omissions_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_omissions",
    difficulty: 3,
    theme: "neutral",
    hint: "Un accent est tombé en route.",
    tags: ["ce2", "copie", "omissions", "template"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\nTa copie : « ${c.accent} »\n\nCompare les deux : la copie est-elle conforme ?`,
        format: "qcm" as const,
        choices: [
          "non, il y a un écart avec le modèle",
          "oui, elle est identique",
        ],
        expected: ["non, il y a un écart avec le modèle"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une copie conforme reproduit TOUT : les accents et la ponctuation autant que les lettres.",
          "Passe une deuxième fois sur les mots accentués et sur le dernier signe de la phrase : ce sont les deux endroits où l'œil glisse.",
          `Ici, l'écart se voit sur un accent ou un signe. C'est petit, et cela compte autant qu'un mot manquant.`,
          "Non, il y a un écart avec le modèle.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_copie_omissions_open_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "copie_fluente",
    microId: "ce2_copie_omissions",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve l'écart, puis dis à quelle famille il appartient.",
    tags: ["ce2", "copie", "omissions", "ouverte"],
    generate: () => {
      const c = randomChoice(COPIES);
      return {
        text: `Modèle : « ${c.modele} »\nTa copie : « ${c.omission} »\n\nQu'est-ce qui manque, et comment aurais-tu pu t'en apercevoir ? Explique.`,
        format: "open" as const,
        expected: [c.motOmis, "manque", "oublié", "oublie", "compare", "mot à mot", "relis"],
        comparator: "contains_keyword" as const,
        explanation: exp(
          "Un mot sauté est l'erreur de copie la plus fréquente, et la plus facile à trouver en relisant.",
          "Compare le nombre de mots d'abord : s'il en manque un, tu le sais avant même de savoir lequel.",
          `Il manque « ${c.motOmis} ». En avançant du doigt sur les deux textes en même temps, l'écart saute aux yeux.`,
          `Il manque « ${c.motOmis} ».`,
        ),
      };
    },
  },
];
