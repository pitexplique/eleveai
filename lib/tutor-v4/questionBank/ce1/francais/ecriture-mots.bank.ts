// lib/tutor-v4/questionBank/ce1/francais/ecriture-mots.bank.ts
//
// L'écriture de mots et la dictée du CE1, écrites à la main. Sept
// micro-compétences.
//
// CE QU'ELLE REMPLACE, et c'est la question la plus cassée de tout le
// constructeur commun :
//
//     « Comment s'ecrit le petit mot qui designe un endroit ? »
//     correct : "ou"    pièges : ["ou", "ou", "au"]
//
// Trois choses fausses dans quatre lignes. Le mot qui désigne un endroit
// s'écrit « OÙ », avec un accent — la réponse attendue était donc la faute.
// Les deux premiers pièges sont identiques à la bonne réponse : après
// déduplication il reste UNE proposition fausse, et l'élève a une chance sur
// deux au hasard. Et l'énoncé lui-même écrit « s'ecrit » et « designe » sans
// accent, dans un exercice d'orthographe.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Écrire sous la dictée les mots de la liste de référence » ;
//   — « Mémoriser l'orthographe des mots fréquents irréguliers » ;
//   — « Écrire sous la dictée une phrase, puis un texte très court, en
//     réalisant les accords dans le groupe nominal et entre le sujet et le
//     verbe » ;
//   — exemple de réussite : « marque de pluriel des verbes = nt ».
//
// ⚠️ LA DICTÉE SANS SON. Le coach sait lire un texte à voix haute, mais toute
// question doit rester répondable SANS le son. On ne fait donc pas entendre le
// mot : on le désigne par son sens, ou on montre la phrase et on demande où
// est la faute. C'est la même compétence, prise par l'écrit.
//
// ⚠️ Les pièges sont écrits À LA MAIN et phonétiquement plausibles. Fabriquer
// une faute en ajoutant une lettre donne parfois un vrai mot : « dans » + e
// = danse, « bien » + s = biens. L'élève aurait deux bonnes réponses.

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

/* ── Les mots courants ───────────────────────────────────────────────────────
   Chaque mot est désigné par son SENS, jamais par son son : la question doit
   se répondre sans écouter. */

type MotCourant = {
  readonly mot: string;
  readonly sens: string;
  readonly faux: readonly string[];
};

const MOTS_COURANTS: readonly MotCourant[] = [
  { mot: "maison", sens: "l'endroit où l'on habite", faux: ["maizon", "mèson", "maisson"] },
  { mot: "école", sens: "l'endroit où l'on apprend", faux: ["écolle", "ecole", "écôle"] },
  { mot: "beaucoup", sens: "une très grande quantité", faux: ["bocou", "beaucou", "beaucoud"] },
  { mot: "toujours", sens: "tout le temps, sans jamais s'arrêter", faux: ["toujour", "toujourt", "toujoure"] },
  { mot: "chaise", sens: "ce sur quoi on s'assoit", faux: ["chèse", "chaize", "chaisse"] },
  { mot: "cahier", sens: "ce dans quoi on écrit à l'école", faux: ["cayer", "cahié", "caiher"] },
  { mot: "oiseau", sens: "un animal qui vole et qui a des plumes", faux: ["oizeau", "oiso", "oizo"] },
  { mot: "fenêtre", sens: "l'ouverture par laquelle entre la lumière", faux: ["fenètre", "fenetre", "fenaitre"] },
  { mot: "voiture", sens: "ce qui roule à quatre roues", faux: ["voitture", "voiturre", "voatur"] },
  { mot: "bateau", sens: "ce qui flotte et transporte des gens", faux: ["batau", "bato", "batteau"] },
  { mot: "jardin", sens: "l'endroit où poussent les fleurs", faux: ["jardain", "jardun", "jardinn"] },
  { mot: "chemin", sens: "la voie qu'on suit pour marcher", faux: ["chemain", "chmin", "chemun"] },
  { mot: "famille", sens: "les parents, les frères et les sœurs", faux: ["famile", "familhe", "fammille"] },
  { mot: "soleil", sens: "ce qui éclaire et réchauffe le jour", faux: ["solèil", "soleille", "soleye"] },
  { mot: "fleur", sens: "ce qui pousse et sent bon dans un jardin", faux: ["fleure", "flœr", "fleurre"] },
  { mot: "matin", sens: "le début de la journée", faux: ["matain", "matun", "mattin"] },
  { mot: "enfant", sens: "une personne encore jeune", faux: ["anfant", "enfan", "enfent"] },
  { mot: "chanson", sens: "ce qu'on chante", faux: ["chansson", "chanzon", "chançon"] },
];

/* ── Les mots fréquents irréguliers ──────────────────────────────────────────
   Ceux dont l'orthographe ne suit aucune règle : on ne peut pas les déduire,
   il faut les avoir vus. */

const IRREGULIERS: readonly MotCourant[] = [
  { mot: "femme", sens: "une personne adulte de sexe féminin", faux: ["fame", "famme", "feme"] },
  { mot: "monsieur", sens: "la façon polie d'appeler un homme", faux: ["messieur", "monsieu", "meussieur"] },
  { mot: "temps", sens: "ce que mesure une horloge", faux: ["tems", "tant", "temp"] },
  { mot: "sept", sens: "le nombre juste après six", faux: ["set", "sète", "cept"] },
  { mot: "oignon", sens: "le légume qui fait pleurer", faux: ["ognon", "oigon", "onion"] },
  { mot: "fils", sens: "l'enfant garçon de quelqu'un", faux: ["fise", "fice", "fils'"] },
  { mot: "second", sens: "celui qui vient juste après le premier", faux: ["segond", "seconde", "sekond"] },
  { mot: "vingt", sens: "le nombre juste après dix-neuf", faux: ["vin", "vint", "vingts"] },
  { mot: "automne", sens: "la saison où les feuilles tombent", faux: ["autone", "automnne", "otomne"] },
  { mot: "compte", sens: "ce qu'on fait quand on additionne", faux: ["conte", "comte", "compt"] },
];

/* ── Les phrases à écrire ────────────────────────────────────────────────────
   Chaque phrase porte UNE faute et une seule, écrite à la main. Ce que l'élève
   doit voir est nommé dans `regle`. */

type PhraseDictee = {
  readonly juste: string;
  readonly fautive: string;
  readonly regle: string;
};

const PHRASES: readonly PhraseDictee[] = [
  { juste: "Les enfants jouent dans la cour.", fautive: "Les enfants joue dans la cour.", regle: "le verbe prend « -nt » au pluriel" },
  { juste: "Le margouillat grimpe sur le mur.", fautive: "Le margouillat grimpent sur le mur.", regle: "un seul margouillat : pas de « -nt »" },
  { juste: "Mes cousins arrivent demain.", fautive: "Mes cousin arrivent demain.", regle: "le nom prend un « s » après « mes »" },
  { juste: "Les mangues sont mûres.", fautive: "Les mangues sont mûre.", regle: "l'adjectif s'accorde avec le nom, même de loin" },
  { juste: "Papa prépare un cari.", fautive: "Papa prépare un carie.", regle: "« cari » s'écrit sans « e »" },
  { juste: "La maitresse ferme la fenêtre.", fautive: "La maitresse ferme la fenètre.", regle: "« fenêtre » prend un accent circonflexe" },
  { juste: "Où est mon cahier ?", fautive: "Ou est mon cahier ?", regle: "« où » qui désigne un endroit prend un accent" },
  { juste: "Tu veux un letchi ou une mangue ?", fautive: "Tu veux un letchi où une mangue ?", regle: "« ou » qui sert à choisir n'a pas d'accent" },
  { juste: "Léa a une gomme neuve.", fautive: "Léa à une gomme neuve.", regle: "« a » du verbe avoir n'a pas d'accent" },
  { juste: "Nous partons à la plage.", fautive: "Nous partons a la plage.", regle: "« à » qui n'est pas le verbe prend un accent" },
  { juste: "Le lagon est calme.", fautive: "Le lagon et calme.", regle: "« est » vient du verbe être" },
  { juste: "Tom et Léa ramassent des letchis.", fautive: "Tom est Léa ramassent des letchis.", regle: "« et » relie deux choses" },
  { juste: "Les letchis sont mûrs.", fautive: "Les letchis son mûrs.", regle: "« sont » vient du verbe être" },
  { juste: "Léa range son cahier.", fautive: "Léa range sont cahier.", regle: "« son » dit à qui c'est" },
  { juste: "Les oiseaux chantent le matin.", fautive: "Les oiseau chantent le matin.", regle: "« oiseau » prend un « x » au pluriel" },
  { juste: "Une vieille case résiste au vent.", fautive: "Une vieil case résiste au vent.", regle: "l'adjectif prend le féminin du nom" },
  { juste: "Le pêcheur rentre avant la nuit.", fautive: "Le pêcheur rentre avan la nuit.", regle: "« avant » a un « t » muet" },
  { juste: "Beaucoup d'élèves lèvent la main.", fautive: "Bocou d'élèves lèvent la main.", regle: "« beaucoup » est un mot invariable à retenir" },
];

/* ── Les groupes nominaux à accorder sous la dictée ──────────────────────── */

type GroupeDictee = {
  readonly singulier: string;
  readonly pluriel: string;
  /** Les deux pluriels ratés : le nom oublié, l'adjectif oublié. */
  readonly rates: readonly [string, string];
};

const GROUPES: readonly GroupeDictee[] = [
  { singulier: "une mangue mûre", pluriel: "des mangues mûres", rates: ["des mangue mûres", "des mangues mûre"] },
  { singulier: "un letchi sucré", pluriel: "des letchis sucrés", rates: ["des letchi sucrés", "des letchis sucré"] },
  { singulier: "le chien noir", pluriel: "les chiens noirs", rates: ["les chien noirs", "les chiens noir"] },
  { singulier: "la fleur blanche", pluriel: "les fleurs blanches", rates: ["les fleur blanches", "les fleurs blanche"] },
  { singulier: "un cahier neuf", pluriel: "des cahiers neufs", rates: ["des cahier neufs", "des cahiers neuf"] },
  { singulier: "le bateau rouge", pluriel: "les bateaux rouges", rates: ["les bateau rouges", "les bateaux rouge"] },
  { singulier: "une case bleue", pluriel: "des cases bleues", rates: ["des case bleues", "des cases bleue"] },
  { singulier: "le piton fumant", pluriel: "les pitons fumants", rates: ["les piton fumants", "les pitons fumant"] },
  { singulier: "un oiseau blanc", pluriel: "des oiseaux blancs", rates: ["des oiseau blancs", "des oiseaux blanc"] },
  { singulier: "la tortue lente", pluriel: "les tortues lentes", rates: ["les tortue lentes", "les tortues lente"] },
];

/* ── Les verbes au pluriel ───────────────────────────────────────────────── */

type VerbePluriel = {
  readonly sujet: string;
  readonly singulier: string;
  readonly pluriel: string;
  readonly suite: string;
};

const VERBES: readonly VerbePluriel[] = [
  { sujet: "Les chats", singulier: "miaule", pluriel: "miaulent", suite: "la nuit" },
  { sujet: "Les enfants", singulier: "joue", pluriel: "jouent", suite: "dans la cour" },
  { sujet: "Les oiseaux", singulier: "chante", pluriel: "chantent", suite: "le matin" },
  { sujet: "Les letchis", singulier: "tombe", pluriel: "tombent", suite: "dans l'herbe" },
  { sujet: "Les vagues", singulier: "glisse", pluriel: "glissent", suite: "sur le sable" },
  { sujet: "Les pêcheurs", singulier: "rentre", pluriel: "rentrent", suite: "avant la nuit" },
  { sujet: "Les élèves", singulier: "récite", pluriel: "récitent", suite: "une poésie" },
  { sujet: "Les margouillats", singulier: "grimpe", pluriel: "grimpent", suite: "sur le mur" },
  { sujet: "Les tortues", singulier: "avance", pluriel: "avancent", suite: "doucement" },
  { sujet: "Les cousins", singulier: "arrive", pluriel: "arrivent", suite: "demain" },
];

/* ── Le défi : deux accords dans la même phrase ──────────────────────────────
   ⚠️ Écrites en entier, pas assemblées. Coller un groupe nominal et une
   proposition donne « des mangues mûres et les chats miaulent la nuit », qui
   ne se dit pas — et qui serait proposé comme la BONNE réponse. */

type PhraseDefi = {
  readonly juste: string;
  /** Le nom oublié, l'adjectif oublié, le verbe oublié. */
  readonly rates: readonly [string, string, string];
};

const DEFIS: readonly PhraseDefi[] = [
  {
    juste: "Les mangues mûres tombent dans l'herbe.",
    rates: [
      "Les mangue mûres tombent dans l'herbe.",
      "Les mangues mûre tombent dans l'herbe.",
      "Les mangues mûres tombe dans l'herbe.",
    ],
  },
  {
    juste: "Les petits chiens aboient dans la cour.",
    rates: [
      "Les petits chien aboient dans la cour.",
      "Les petit chiens aboient dans la cour.",
      "Les petits chiens aboie dans la cour.",
    ],
  },
  {
    juste: "Les grandes vagues glissent sur le sable.",
    rates: [
      "Les grandes vague glissent sur le sable.",
      "Les grande vagues glissent sur le sable.",
      "Les grandes vagues glisse sur le sable.",
    ],
  },
  {
    juste: "Les oiseaux blancs traversent le lagon.",
    rates: [
      "Les oiseau blancs traversent le lagon.",
      "Les oiseaux blanc traversent le lagon.",
      "Les oiseaux blancs traverse le lagon.",
    ],
  },
  {
    juste: "Les vieilles cases résistent au vent.",
    rates: [
      "Les vieilles case résistent au vent.",
      "Les vieille cases résistent au vent.",
      "Les vieilles cases résiste au vent.",
    ],
  },
  {
    juste: "Les élèves fatigués rangent leurs cahiers.",
    rates: [
      "Les élève fatigués rangent leurs cahiers.",
      "Les élèves fatigué rangent leurs cahiers.",
      "Les élèves fatigués range leurs cahiers.",
    ],
  },
  {
    juste: "Les tortues lentes remontent la plage.",
    rates: [
      "Les tortue lentes remontent la plage.",
      "Les tortues lente remontent la plage.",
      "Les tortues lentes remonte la plage.",
    ],
  },
  {
    juste: "Les bateaux rouges quittent le port.",
    rates: [
      "Les bateau rouges quittent le port.",
      "Les bateaux rouge quittent le port.",
      "Les bateaux rouges quitte le port.",
    ],
  },
  {
    juste: "Les margouillats rapides grimpent sur le mur.",
    rates: [
      "Les margouillat rapides grimpent sur le mur.",
      "Les margouillats rapide grimpent sur le mur.",
      "Les margouillats rapides grimpe sur le mur.",
    ],
  },
  {
    juste: "Les petites fleurs poussent près du mur.",
    rates: [
      "Les petites fleur poussent près du mur.",
      "Les petite fleurs poussent près du mur.",
      "Les petites fleurs pousse près du mur.",
    ],
  },
];

export const ecritureMotsBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_DICT_MOT_COURANT
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_mot_courant_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_mot_courant",
    difficulty: 2,
    theme: "neutral",
    hint: "Toutes ces façons de l'écrire se disent pareil. Une seule est la bonne.",
    tags: ["ce1", "dictee", "mots-courants", "template"],
    generate: () => {
      const m = randomChoice(MOTS_COURANTS);
      return {
        text: `Comment s'écrit le mot qui veut dire « ${m.sens} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, m.faux),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les mots courants s'écrivent d'une seule façon, qu'il faut avoir vue et retenue.",
          "Écris le mot de mémoire, puis compare lettre à lettre avec le modèle.",
          `On écrit « ${m.mot} ». Les autres propositions se disent exactement pareil : c'est bien ce qui les rend dangereuses.`,
          `Le mot s'écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_dict_mot_courant_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_mot_courant",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare avec le mot que tu as appris, lettre par lettre.",
    tags: ["ce1", "dictee", "mots-courants", "template"],
    generate: () => {
      const m = randomChoice(MOTS_COURANTS);
      const juste = Math.random() < 0.4;
      const ecrit = juste ? m.mot : randomChoice(m.faux);
      return {
        text: `Ce mot est-il correctement écrit : « ${ecrit} » ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [juste ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se relire, c'est comparer ce qu'on a écrit avec ce qu'on a appris — pas avec ce qu'on entend.",
          "Prends le mot lettre par lettre, du début à la fin.",
          juste
            ? `« ${m.mot} » est bien écrit.`
            : `« ${ecrit} » se dit comme « ${m.mot} », mais ce n'est pas l'orthographe du mot.`,
          juste ? "Oui." : `Non : on écrit « ${m.mot} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DICT_MOTS_IRREGULIERS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_mots_irreguliers_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces mots-là ne suivent aucune règle : il faut les avoir vus.",
    tags: ["ce1", "dictee", "irreguliers", "template"],
    generate: () => {
      const m = randomChoice(IRREGULIERS);
      return {
        text: `Comment s'écrit le mot qui veut dire « ${m.sens} » ?`,
        format: "qcm" as const,
        choices: makeChoices(m.mot, m.faux),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Certains mots très fréquents ne s'écrivent pas comme ils se disent, et aucune règle ne les explique.",
          "Ceux-là s'apprennent par cœur, comme un dessin qu'on reconnait d'un coup d'œil.",
          `On écrit « ${m.mot} ». Si on écrivait ce qu'on entend, on écrirait « ${m.faux[0]} » — et ce serait faux.`,
          `Le mot s'écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_dict_mots_irreguliers_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Le mot « femme » se dit [fam]. Pourquoi ne peut-on pas l'écrire « fame » ?",
    format: "qcm",
    choices: [
      "Parce que ce mot s'écrit autrement qu'il ne se dit : il faut l'apprendre par cœur",
      "Parce qu'il manque un accent",
      "Parce qu'il faut deux « f »",
      "Parce que c'est un verbe",
    ],
    expected: ["Parce que ce mot s'écrit autrement qu'il ne se dit : il faut l'apprendre par cœur"],
    comparator: "mcq_exact",
    hint: "Y a-t-il une règle qui explique le « e » de femme ? Cherche bien.",
    explanation: exp(
      "Quelques mots très fréquents ne suivent aucune règle : femme, monsieur, temps, sept, oignon.",
      "Pour ceux-là, on ne réfléchit pas : on les reconnait, comme on reconnait un visage.",
      "femme s'écrit avec « em » et se dit [am]. Aucune règle ne le prévoit. C'est pour ça qu'on les appelle irréguliers.",
      "Parce que ce mot s'écrit autrement qu'il ne se dit.",
    ),
    tags: ["ce1", "dictee", "irreguliers", "definition", "qcm"],
  },

  /* =========================================================
     CE1_DICT_PHRASE
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_phrase_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Relis mot à mot. Une seule chose ne va pas.",
    tags: ["ce1", "dictee", "phrase", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `Laquelle de ces deux phrases est correctement écrite ?`,
        format: "qcm" as const,
        choices: shuffle([p.juste, p.fautive]),
        expected: [p.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire une phrase sous la dictée, c'est écrire chaque mot correctement ET accorder les mots entre eux.",
          "Relis ta phrase mot à mot, en te demandant pour chacun : est-il au bon nombre, au bon genre, avec la bonne orthographe ?",
          `La bonne phrase est « ${p.juste} » : ${p.regle}.`,
          `On écrit « ${p.juste} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_dict_phrase_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Trouve d'abord la faute, puis demande-toi quelle règle a été oubliée.",
    tags: ["ce1", "dictee", "phrase", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const autres = shuffle(PHRASES.filter((x) => x.regle !== p.regle))
        .slice(0, 3)
        .map((x) => x.regle);
      return {
        text: `Cette phrase contient une faute :\n\n« ${p.fautive} »\n\nQuelle règle a été oubliée ?`,
        format: "qcm" as const,
        choices: makeChoices(p.regle, autres),
        expected: [p.regle],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se corriger, ce n'est pas seulement voir la faute : c'est savoir quelle règle on a oubliée.",
          "Repère le mot qui cloche, puis demande-toi de quoi il dépend : d'un autre mot, ou de sa propre orthographe ?",
          `Il fallait écrire « ${p.juste} », parce que ${p.regle}.`,
          `La règle oubliée : ${p.regle}.`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DICT_ACCORD_GN
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_accord_gn_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_accord_gn",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois mots, trois marques. Fais le tour du groupe.",
    tags: ["ce1", "dictee", "accord-gn", "template"],
    generate: () => {
      const g = randomChoice(GROUPES);
      return {
        text: `Écris ce groupe au pluriel : « ${g.singulier} »`,
        format: "qcm" as const,
        choices: makeChoices(g.pluriel, [...g.rates, g.singulier]),
        expected: [g.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Sous la dictée, le déterminant, le nom et l'adjectif doivent tous porter la marque du pluriel.",
          "Fais le tour du groupe mot par mot, et pose la marque sur chacun avant de passer au suivant.",
          `${g.singulier} → ${g.pluriel}. Trois mots ont changé, et aucun des trois ne s'entend.`,
          `On écrit « ${g.pluriel} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DICT_PLURIEL_VERBE — « -nt »
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_pluriel_verbe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_pluriel_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Le sujet annonce plusieurs. Le verbe doit finir par « -nt ».",
    tags: ["ce1", "dictee", "pluriel-verbe", "template"],
    generate: () => {
      const v = randomChoice(VERBES);
      const radical = v.singulier.slice(0, -1);
      return {
        text: `Complète : « ${v.sujet} ___ ${v.suite}. »`,
        format: "qcm" as const,
        choices: makeChoices(v.pluriel, [
          v.singulier,
          `${radical}es`,
          `${radical}ez`,
        ]),
        expected: [v.pluriel],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La marque du pluriel des verbes est « -nt ». Elle s'écrit et ne s'entend pas.",
          "Regarde le sujet, compte, puis écris la terminaison — même si ton oreille ne l'entend pas.",
          `« ${v.sujet} » annonce plusieurs : on écrit « ${v.pluriel} ». Au singulier ce serait « ${v.singulier} », et ça se dirait exactement pareil.`,
          `On écrit « ${v.sujet} ${v.pluriel} ${v.suite}. »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_dict_pluriel_verbe_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_pluriel_verbe",
    difficulty: 3,
    theme: "neutral",
    text: "Sous la dictée, tu entends « les enfants jou ». Comment sais-tu qu'il faut écrire « -ent » à la fin ?",
    format: "qcm",
    choices: [
      "Parce que « les enfants » annonce plusieurs : le verbe prend « -nt »",
      "Parce qu'on entend le « nt »",
      "Parce que le mot est long",
      "On ne peut pas le savoir",
    ],
    expected: ["Parce que « les enfants » annonce plusieurs : le verbe prend « -nt »"],
    comparator: "mcq_exact",
    hint: "Ton oreille ne peut pas t'aider ici. Qu'est-ce qui peut ?",
    explanation: exp(
      "La marque du pluriel des verbes est « -nt ». Elle ne s'entend jamais.",
      "Sous la dictée, remonte toujours au sujet avant d'écrire la fin du verbe.",
      "« il joue » et « ils jouent » se disent exactement pareil. Seul le sujet peut trancher — c'est lui qui prévient.",
      "Parce que le sujet annonce plusieurs.",
    ),
    tags: ["ce1", "dictee", "pluriel-verbe", "piege", "qcm"],
  },

  /* =========================================================
     CE1_DICT_TEXTE_COURT
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_texte_court_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_texte_court",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux phrases à vérifier, une faute en tout.",
    tags: ["ce1", "dictee", "texte-court", "template"],
    generate: () => {
      const a = randomChoice(PHRASES);
      const b = randomChoice(PHRASES.filter((x) => x.juste !== a.juste));
      const premiereFautive = Math.random() < 0.5;
      const texte = premiereFautive
        ? `${a.fautive} ${b.juste}`
        : `${a.juste} ${b.fautive}`;
      const faute = premiereFautive ? a : b;
      return {
        text: `Ce petit texte contient UNE faute :\n\n« ${texte} »\n\nDans quelle phrase se trouve-t-elle ?`,
        format: "qcm" as const,
        choices: shuffle([
          premiereFautive ? a.fautive : b.fautive,
          premiereFautive ? b.juste : a.juste,
        ]),
        expected: [faute.fautive],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Sous la dictée d'un texte, on ne se relit pas d'un coup : on vérifie une phrase à la fois.",
          "Prends la première phrase, vérifie chaque mot, puis passe à la suivante.",
          `La faute est dans « ${faute.fautive} » : ${faute.regle}. Il fallait écrire « ${faute.juste} »`,
          `La phrase fautive est « ${faute.fautive} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_DICT_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_dict_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux accords dans la même phrase : le groupe, puis le verbe.",
    tags: ["ce1", "dictee", "defi", "template"],
    generate: () => {
      const d = randomChoice(DEFIS);
      const mots = d.juste.replace(/\.$/, "").split(" ");
      return {
        text: `Sous la dictée, tu dois écrire une phrase qui parle de plusieurs « ${mots[1].replace(/s$|x$/, "")} ».\n\nUne seule de ces quatre phrases n'a aucune faute. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([d.juste, ...d.rates]),
        expected: [d.juste],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une phrase dictée n'est juste que si TOUS les accords le sont : le nom, l'adjectif, et le verbe.",
          "Vérifie dans l'ordre, une chose à la fois : le nom, puis l'adjectif, puis le verbe.",
          `« ${d.juste} » : « ${mots[1]} » porte le « s » du nom, « ${mots[2]} » l'accord de l'adjectif, « ${mots[3]} » le « -nt » du verbe. Trois marques, et pas une seule ne s'entend.`,
          `La phrase sans faute est « ${d.juste} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_dict_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce1_dict_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« Où est mon cahier ? » et « Tu veux un letchi ou une mangue ? »\n\nLes deux petits mots se disent exactement pareil, et un seul porte un accent. Comment choisis-tu ?",
    format: "qcm",
    choices: [
      "Je remplace par « ou bien » : si la phrase tient, c'est « ou » sans accent.",
      // LE piège des homophones : justement, l'oreille ne peut rien.
      "J'écoute : on entend bien l'accent.",
      // L'erreur réelle : « Où est mon cahier ? » est une question, et la
      // coïncidence donne une fausse règle.
      "Je mets l'accent quand la phrase est une question.",
      "Je mets l'accent sur le plus court des deux mots.",
    ],
    expected: ["Je remplace par « ou bien » : si la phrase tient, c'est « ou » sans accent."],
    comparator: "mcq_exact",
    hint: "Essaie de remplacer par « ou bien ». Est-ce que ça se dit ?",
    explanation: exp(
      "« ou » sert à choisir entre deux choses. « où » sert à dire un endroit, et lui seul porte un accent.",
      "Remplace par « ou bien » : si ça se dit, c'est « ou » sans accent. Sinon, c'est « où ».",
      "« un letchi OU BIEN une mangue » se dit : pas d'accent. « OU BIEN est mon cahier » ne se dit pas : on demande un endroit, il faut l'accent.",
      "On remplace par « ou bien » : si la phrase tient, c'est « ou » sans accent.",
    ),
    tags: ["ce1", "dictee", "defi", "piege", "qcm"],
  },
];
