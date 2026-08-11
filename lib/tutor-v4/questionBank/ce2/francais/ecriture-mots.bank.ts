// lib/tutor-v4/questionBank/ce2/francais/ecriture-mots.bank.ts
//
// L'écriture de mots et la DICTÉE au CE2.
//
// NOTION NEUVE, et c'est la plus étonnante des absences : le coach n'avait
// AUCUNE notion de dictée, alors que le BO écrit « Encoder puis écrire sous
// dictée » aux TROIS niveaux du cycle 2. `ecriture_mots` a été créée le
// 09/08/2026 ; le repli l'envoyait sur un générateur hors sujet.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2) :
//   « Orthographier correctement les mots fréquents, réguliers et irréguliers,
//     et des phrases selon les accords étudiés dans le cadre de dictées. »
//   — les phonèmes à plusieurs graphèmes : [o], [e], [ɛ], [ɑ̃], [s] ;
//   — les chaines d'accord dans la phrase ;
//   — la phrase entière écrite sous la dictée.
//
// ⚠️ ON N'A PAS DE SON, et c'est très bien ainsi. Une dictée sur écran, ce
// serait « quel son entends-tu ? » — la pire question qu'on puisse poser ici.
// « lait » se dit [lɛ] dans le nord et souvent [le] à La Réunion : l'enfant
// d'ici aurait faux à cause de son accent, pas de son orthographe.
//
// Le BO demande pourtant explicitement les graphies de [e] et de [ɛ]. On les
// travaille donc PAR LA GRAPHIE — « comment s'écrit ce mot ? », le mot étant
// désigné par une phrase à trou — et JAMAIS par l'oreille. Seuls [o], [ɑ̃] et
// [s] sont nommés à voix haute dans les énoncés : ceux-là se disent pareil
// partout, et l'enfant lit le mot déjà écrit avant de répondre.
//
// ⚠️ AUCUNE FAUTE FABRIQUÉE. Chaque forme erronée est écrite à la main et
// phonétiquement plausible — bocou, écolle, maizon, femeu. Un « s » ajouté au
// hasard tombe souvent sur un vrai mot, et l'élève se retrouve avec deux bonnes
// réponses sous les yeux.

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
   LES MOTS FRÉQUENTS RÉGULIERS

   Réguliers = chaque son y est écrit avec sa graphie la plus courante. Ce sont
   ceux qu'on peut écrire en s'écoutant — à condition de ne pas doubler les
   consonnes au hasard, qui est l'erreur du CE2.
   ═══════════════════════════════════════════════════════════════════════════ */

type MotDicte = {
  readonly mot: string;
  readonly phrase: string;
  readonly fautes: readonly string[];
};

const MOTS_REGULIERS: readonly MotDicte[] = [
  { mot: "table", phrase: "Pose ton cahier sur la ___ .", fautes: ["tabl", "tabble", "tabel"] },
  { mot: "salade", phrase: "Mamie lave la ___ .", fautes: ["salad", "sallade", "salladde"] },
  { mot: "cheval", phrase: "Le ___ traverse le champ.", fautes: ["chevale", "chvale", "chevalle"] },
  { mot: "sortir", phrase: "Nous allons ___ après la pluie.", fautes: ["sortire", "sorttir", "sortirr"] },
  { mot: "midi", phrase: "La cloche sonne à ___ .", fautes: ["midie", "middi", "mydi"] },
  { mot: "robe", phrase: "Ma sœur met sa ___ bleue.", fautes: ["rob", "robbe", "rop"] },
  { mot: "avenue", phrase: "Le marché se tient sur l'___ .", fautes: ["avenu", "avennue", "avnue"] },
  { mot: "domino", phrase: "Il pose son dernier ___ .", fautes: ["dominot", "domminot", "dominos"] },
  { mot: "village", phrase: "Notre ___ est au bord de la mer.", fautes: ["villaje", "vilage", "villagge"] },
  { mot: "musique", phrase: "On entend la ___ depuis la cour.", fautes: ["musik", "muzique", "musiqe"] },
  { mot: "camarade", phrase: "Mon ___ m'attend devant l'école.", fautes: ["camarad", "cammarade", "camarrade"] },
  { mot: "récréation", phrase: "La ___ dure quinze minutes.", fautes: ["recréation", "récreation", "récréassion"] },
  { mot: "famille", phrase: "Toute la ___ est venue à la fête.", fautes: ["famile", "famiye", "familles"] },
  { mot: "journée", phrase: "La ___ a été longue.", fautes: ["journé", "journez", "jourrnée"] },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES MOTS IRRÉGULIERS

   Ceux qu'on ne peut PAS écrire en s'écoutant : femme se dit [fam], monsieur
   se dit [məsjø]. Il n'y a rien à comprendre, seulement à retenir — et c'est
   exactement ce qu'il faut dire à l'enfant.
   ═══════════════════════════════════════════════════════════════════════════ */

type MotIrregulier = {
  readonly mot: string;
  readonly phrase: string;
  readonly pourquoi: string;
  readonly fautes: readonly string[];
};

const MOTS_IRREGULIERS: readonly MotIrregulier[] = [
  {
    mot: "femme",
    phrase: "Cette ___ vend des mangues au marché.",
    pourquoi: "on écrit « emme » et on dit [am] : c'est le seul mot du français dans ce cas",
    fautes: ["fame", "famme", "femeu"],
  },
  {
    mot: "monsieur",
    phrase: "Bonjour ___ , je cherche la mairie.",
    pourquoi: "on écrit « on » et on dit [ə], on écrit « ieur » et on dit [jø]",
    fautes: ["messieur", "monsieu", "mossieur"],
  },
  {
    mot: "temps",
    phrase: "Le ___ va changer cet après-midi.",
    pourquoi: "un « p » et un « s » à la fin, dont on n'entend aucun",
    fautes: ["tems", "tans", "temp"],
  },
  {
    mot: "sept",
    phrase: "Nous partons à ___ heures.",
    pourquoi: "un « p » écrit qu'on ne prononce pas",
    fautes: ["set", "sète", "septe"],
  },
  {
    mot: "doigt",
    phrase: "Je me suis coupé le ___ .",
    pourquoi: "un « g » et un « t » muets, hérités du latin",
    fautes: ["doit", "doi", "doigd"],
  },
  {
    mot: "vingt",
    phrase: "Il y a ___ élèves dans la classe.",
    pourquoi: "un « g » et un « t » qu'on n'entend pas",
    fautes: ["vin", "vint", "vaingt"],
  },
  {
    mot: "fils",
    phrase: "Le ___ du pêcheur nous accompagne.",
    pourquoi: "on écrit « ls » et on dit [s]",
    fautes: ["fisse", "fice", "fisss"],
  },
  {
    mot: "automne",
    phrase: "En ___ , les feuilles tombent.",
    pourquoi: "un « m » qu'on n'entend pas devant le « n »",
    fautes: ["autonne", "automme", "otomne"],
  },
  {
    mot: "second",
    phrase: "Il est arrivé ___ à la course.",
    pourquoi: "on écrit « c » et on dit [g]",
    fautes: ["segond", "secont", "sgond"],
  },
  {
    mot: "compter",
    phrase: "Il faut ___ jusqu'à cent.",
    pourquoi: "un « p » écrit qu'on ne prononce jamais",
    fautes: ["conter", "comter", "compté"],
  },
  {
    mot: "longtemps",
    phrase: "Nous avons attendu ___ sous l'abri.",
    pourquoi: "un « g » et un « ps » muets, deux pièges dans un seul mot",
    fautes: ["lontemps", "longtems", "longtans"],
  },
  {
    mot: "corps",
    phrase: "Le ___ humain contient beaucoup d'eau.",
    pourquoi: "un « p » et un « s » qu'on n'entend pas",
    fautes: ["cor", "cors", "corp"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LES PHONÈMES À PLUSIEURS GRAPHÈMES

   ⚠️ `nommable` dit si l'on peut prononcer le son dans l'énoncé. [o], [ɑ̃] et
   [s] se disent pareil partout : on peut demander « quelle lettre fait le son
   [s] dans garçon ? », le mot étant sous les yeux de l'enfant.
   [e] et [ɛ] NE SONT JAMAIS NOMMÉS : « lait » se dit [lɛ] dans le nord et
   souvent [le] ici. On ne les travaille que par la graphie — « comment s'écrit
   ce mot ? » — et le BO est servi quand même.
   ═══════════════════════════════════════════════════════════════════════════ */

type Graphie = {
  readonly son: string;
  readonly nommable: boolean;
  readonly mot: string;
  readonly graphie: string;
  readonly phrase: string;
  readonly fautes: readonly string[];
};

const GRAPHIES: readonly Graphie[] = [
  { son: "[o]", nommable: true, mot: "bateau", graphie: "eau", phrase: "Le ___ quitte le port.", fautes: ["bato", "batau", "bateaux"] },
  { son: "[o]", nommable: true, mot: "chaud", graphie: "au", phrase: "Le cari est encore ___ .", fautes: ["cho", "chod", "chaut"] },
  { son: "[o]", nommable: true, mot: "moto", graphie: "o", phrase: "Papa répare sa ___ .", fautes: ["motau", "motto", "moteau"] },
  { son: "[o]", nommable: true, mot: "gâteau", graphie: "eau", phrase: "Le ___ sort du four.", fautes: ["gâto", "gateau", "gâtau"] },
  { son: "[o]", nommable: true, mot: "saut", graphie: "au", phrase: "Quel beau ___ !", fautes: ["so", "sot", "sault"] },
  { son: "[ɑ̃]", nommable: true, mot: "grand", graphie: "an", phrase: "Le tamarin est très ___ .", fautes: ["gren", "grand'", "grant"] },
  { son: "[ɑ̃]", nommable: true, mot: "chambre", graphie: "am", phrase: "Range ta ___ .", fautes: ["chanbre", "champbre", "chambr"] },
  { son: "[ɑ̃]", nommable: true, mot: "vent", graphie: "en", phrase: "Le ___ souffle sur le piton.", fautes: ["van", "vant", "vend"] },
  { son: "[ɑ̃]", nommable: true, mot: "trembler", graphie: "em", phrase: "Le froid le fait ___ .", fautes: ["trenbler", "tranbler", "trembley"] },
  { son: "[ɑ̃]", nommable: true, mot: "banc", graphie: "an", phrase: "Assieds-toi sur le ___ .", fautes: ["ban", "bent", "bank"] },
  { son: "[s]", nommable: true, mot: "souris", graphie: "s", phrase: "Une ___ court sous l'armoire.", fautes: ["sourit", "souriz", "sourisse"] },
  { son: "[s]", nommable: true, mot: "poisson", graphie: "ss", phrase: "Le pêcheur rapporte un ___ .", fautes: ["poison", "poisonn", "poissonne"] },
  { son: "[s]", nommable: true, mot: "cerise", graphie: "c", phrase: "Il reste une ___ dans le bol.", fautes: ["serise", "cerize", "cérise"] },
  { son: "[s]", nommable: true, mot: "garçon", graphie: "ç", phrase: "Un ___ appelle son chien.", fautes: ["garson", "garcon", "garçonne"] },
  { son: "[s]", nommable: true, mot: "attention", graphie: "t", phrase: "Fais ___ à la marche !", fautes: ["attension", "atention", "attentionn"] },
  // ⛔ Sons NON nommables : on ne demande jamais « quel son entends-tu ? ».
  { son: "[e]", nommable: false, mot: "été", graphie: "é", phrase: "En ___ , il fait chaud.", fautes: ["ete", "étè", "etté"] },
  { son: "[e]", nommable: false, mot: "chanter", graphie: "er", phrase: "Nous allons ___ ensemble.", fautes: ["chanté", "chantez", "chantay"] },
  { son: "[e]", nommable: false, mot: "nez", graphie: "ez", phrase: "Il a le ___ rouge.", fautes: ["né", "ner", "nés"] },
  { son: "[ɛ]", nommable: false, mot: "règle", graphie: "è", phrase: "Trace un trait avec ta ___ .", fautes: ["régle", "regle", "rêgle"] },
  { son: "[ɛ]", nommable: false, mot: "tête", graphie: "ê", phrase: "Il se gratte la ___ .", fautes: ["tete", "tète", "téte"] },
  { son: "[ɛ]", nommable: false, mot: "neige", graphie: "ei", phrase: "Il n'y a jamais de ___ ici.", fautes: ["nège", "naige", "nèige"] },
  { son: "[ɛ]", nommable: false, mot: "poulet", graphie: "et", phrase: "Le ___ cuit doucement.", fautes: ["poulé", "poulais", "poulait"] },
];

const GRAPHIES_NOMMABLES = GRAPHIES.filter((g) => g.nommable);

/* ═══════════════════════════════════════════════════════════════════════════
   LES PHRASES DE DICTÉE

   Chaque phrase vient avec TROIS versions fautives, écrites à la main : une
   faute d'accord, une faute de mot, une faute d'homophone. Ce sont les trois
   familles d'erreurs d'une dictée de CE2, et elles ne se fabriquent pas.
   ═══════════════════════════════════════════════════════════════════════════ */

type PhraseDictee = {
  readonly phrase: string;
  readonly fauteAccord: string;
  readonly fauteMot: string;
  readonly fauteHomophone: string;
  /** Le mot à trou de la version « chaine d'accord ». */
  readonly motAccorde: string;
  readonly phraseTrou: string;
  readonly fautesAccord: readonly string[];
};

const DICTEES: readonly PhraseDictee[] = [
  {
    phrase: "Les enfants ramassent les letchis mûrs.",
    fauteAccord: "Les enfants ramasse les letchis mûrs.",
    fauteMot: "Les enfants ramassent les letchies mûrs.",
    fauteHomophone: "Les enfants ramassent les letchis mures.",
    motAccorde: "mûrs",
    phraseTrou: "Les enfants ramassent les letchis ___ .",
    fautesAccord: ["mûr", "mûre", "mûres"],
  },
  {
    phrase: "Le pêcheur range ses filets lourds.",
    fauteAccord: "Le pêcheur range ses filets lourd.",
    fauteMot: "Le pécheur range ses filets lourds.",
    fauteHomophone: "Le pêcheur range ces filets lourds.",
    motAccorde: "lourds",
    phraseTrou: "Le pêcheur range ses filets ___ .",
    fautesAccord: ["lourd", "lourde", "lourdes"],
  },
  {
    phrase: "Ma sœur a trouvé un beau coquillage.",
    fauteAccord: "Ma sœur a trouvé un beaux coquillage.",
    fauteMot: "Ma sœur a trouvé un beau coquiyage.",
    fauteHomophone: "Ma sœur à trouvé un beau coquillage.",
    motAccorde: "trouvé",
    phraseTrou: "Ma sœur a ___ un beau coquillage.",
    fautesAccord: ["trouver", "trouvée", "trouvez"],
  },
  {
    phrase: "Les vagues couvrent le sable chaud.",
    fauteAccord: "Les vagues couvre le sable chaud.",
    fauteMot: "Les vagues couvrent le sable chos.",
    fauteHomophone: "Les vagues couvrent le sable chaux.",
    motAccorde: "couvrent",
    phraseTrou: "Les vagues ___ le sable chaud.",
    fautesAccord: ["couvre", "couvres", "couvrant"],
  },
  {
    phrase: "Mamie prépare un cari très épicé.",
    fauteAccord: "Mamie prépare un cari très épicés.",
    fauteMot: "Mamie prépare un carie très épicé.",
    fauteHomophone: "Mamie prépare un cari trés épicé.",
    motAccorde: "épicé",
    phraseTrou: "Mamie prépare un cari très ___ .",
    fautesAccord: ["épicés", "épicée", "épicées"],
  },
  {
    phrase: "Les élèves recopient la phrase du tableau.",
    fauteAccord: "Les élèves recopie la phrase du tableau.",
    fauteMot: "Les élèves recopient la phrase du tablo.",
    fauteHomophone: "Les élèves recopient la phrase du tableaux.",
    motAccorde: "recopient",
    phraseTrou: "Les élèves ___ la phrase du tableau.",
    fautesAccord: ["recopie", "recopies", "recopiant"],
  },
  {
    phrase: "Le vent secoue les longues branches.",
    fauteAccord: "Le vent secoue les longue branches.",
    fauteMot: "Le vant secoue les longues branches.",
    fauteHomophone: "Le vent secoue les longues branche.",
    motAccorde: "longues",
    phraseTrou: "Le vent secoue les ___ branches.",
    fautesAccord: ["longue", "long", "longs"],
  },
  {
    phrase: "Mon cousin arrose les plantes vertes.",
    fauteAccord: "Mon cousin arrose les plantes verte.",
    fauteMot: "Mon couzin arrose les plantes vertes.",
    fauteHomophone: "Mon cousin arrose les plantes verts.",
    motAccorde: "vertes",
    phraseTrou: "Mon cousin arrose les plantes ___ .",
    fautesAccord: ["verte", "vert", "verts"],
  },
  {
    phrase: "Les chevaux traversent le champ tranquillement.",
    fauteAccord: "Les chevaux traverse le champ tranquillement.",
    fauteMot: "Les chevals traversent le champ tranquillement.",
    fauteHomophone: "Les chevaux traversent le chant tranquillement.",
    motAccorde: "chevaux",
    phraseTrou: "Les ___ traversent le champ tranquillement.",
    fautesAccord: ["chevals", "cheval", "chevaus"],
  },
  {
    phrase: "Nous avons marché longtemps sous le soleil.",
    fauteAccord: "Nous avons marchés longtemps sous le soleil.",
    fauteMot: "Nous avons marché lontemps sous le soleil.",
    fauteHomophone: "Nous avons marché longtemps sou le soleil.",
    motAccorde: "marché",
    phraseTrou: "Nous avons ___ longtemps sous le soleil.",
    fautesAccord: ["marcher", "marchés", "marchez"],
  },
  {
    phrase: "La maitresse raconte une belle histoire.",
    fauteAccord: "La maitresse raconte une belles histoire.",
    fauteMot: "La maitresse raconte une belle istoire.",
    fauteHomophone: "La maitresse raconte une belle histoires.",
    motAccorde: "belle",
    phraseTrou: "La maitresse raconte une ___ histoire.",
    fautesAccord: ["beau", "bel", "belles"],
  },
  {
    phrase: "Les oiseaux blancs planent au-dessus du lagon.",
    fauteAccord: "Les oiseaux blanc planent au-dessus du lagon.",
    fauteMot: "Les oizeaux blancs planent au-dessus du lagon.",
    fauteHomophone: "Les oiseaux blancs plane au-dessus du lagon.",
    motAccorde: "blancs",
    phraseTrou: "Les oiseaux ___ planent au-dessus du lagon.",
    fautesAccord: ["blanc", "blanche", "blanches"],
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const ecritureMotsBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_DICT_MOTS_REGULIERS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_dict_mots_reguliers_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_reguliers",
    difficulty: 2,
    theme: "neutral",
    hint: "Découpe le mot en syllabes et écris-les une par une.",
    tags: ["ce2", "dictee", "mots-reguliers", "template"],
    generate: () => {
      const m = randomChoice(MOTS_REGULIERS);
      return {
        text: `Complète : « ${m.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([m.mot, ...m.fautes]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot régulier s'écrit avec les graphies les plus courantes : on peut l'écrire en le découpant, syllabe par syllabe.",
          "Dis le mot lentement, écris chaque syllabe, puis relis-toi sur TA feuille — jamais sur le modèle.",
          `« ${m.mot} ». Le piège du CE2 n'est pas d'entendre le mot, c'est de doubler une consonne qui ne se double pas : « ${m.fautes[0]} » n'existe pas.`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_mots_reguliers_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_reguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul est bien écrit. Regarde surtout les consonnes doubles.",
    tags: ["ce2", "dictee", "mots-reguliers", "template"],
    generate: () => {
      const m = randomChoice(MOTS_REGULIERS);
      const autresFautes = shuffle(
        MOTS_REGULIERS.filter((x) => x.mot !== m.mot).flatMap((x) => [...x.fautes]),
      );
      return {
        text: "Un seul de ces quatre mots est bien écrit. Lequel ?",
        format: "qcm" as const,
        choices: choix(m.mot, autresFautes),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se relire, c'est regarder le mot écrit — pas se le répéter dans la tête.",
          "Passe le doigt sous chaque syllabe, l'une après l'autre, et vérifie les lettres doubles.",
          `« ${m.mot} » est le seul correct. Les autres ont une lettre en trop, une lettre en moins, ou une consonne doublée sans raison.`,
          `Le mot bien écrit est « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_mots_reguliers_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_reguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a ce qu'on fait AVANT d'écrire, et ce qu'on fait APRÈS.",
    tags: ["ce2", "dictee", "mots-reguliers", "methode"],
    generate: () => {
      const m = randomChoice(MOTS_REGULIERS);
      const bonne = "Je dis le mot lentement, je le découpe en syllabes, je les écris une par une, puis je relis ma feuille du doigt.";
      return {
        text: `Tu dois écrire « ${m.mot} » sous la dictée.\n\nComment t'y prends-tu ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : écrire d'un jet, et ne jamais se relire.
          "J'écris vite ce que j'entends, et je passe au mot suivant.",
          "J'écris la première lettre, puis je devine le reste.",
          "J'attends que la maitresse répète pour être sûr.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Écrire sous la dictée, ce n'est pas écrire vite : c'est écrire, puis se relire.",
          "Dis le mot lentement, découpe-le en syllabes, écris-les une par une, puis relis ta feuille du doigt.",
          `${m.mot} : on l'écrit morceau par morceau, puis on vérifie chaque syllabe sur SA feuille — jamais sur le modèle.`,
          "On découpe le mot en syllabes, on les écrit une par une, puis on se relit.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_DICT_MOTS_IRREGULIERS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_dict_mots_irreguliers_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Celui-là ne s'écrit pas comme il se dit. Il faut l'avoir vu.",
    tags: ["ce2", "dictee", "mots-irreguliers", "template"],
    generate: () => {
      const m = randomChoice(MOTS_IRREGULIERS);
      return {
        text: `Complète : « ${m.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([m.mot, ...m.fautes]),
        expected: [m.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot irrégulier ne s'écrit pas comme il se dit. Aucune règle ne le donne : il s'apprend de l'œil.",
          "Regarde le mot, ferme les yeux, revois-le, puis recopie-le. C'est la mémoire de l'image qui travaille.",
          `« ${m.mot} » : ${m.pourquoi}. En l'écrivant au son, on obtiendrait « ${m.fautes[0]} ».`,
          `On écrit « ${m.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_mots_irreguliers_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche la lettre qui est écrite mais qu'on n'entend jamais.",
    tags: ["ce2", "dictee", "mots-irreguliers", "template"],
    generate: () => {
      const m = randomChoice(MOTS_IRREGULIERS);
      const autres = shuffle(MOTS_IRREGULIERS.filter((x) => x.mot !== m.mot)).map((x) => x.pourquoi);
      return {
        text: `Pourquoi le mot « ${m.mot} » est-il difficile à écrire ?`,
        format: "qcm" as const,
        choices: choix(m.pourquoi, autres),
        expected: [m.pourquoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot irrégulier a toujours une raison précise d'être difficile : une lettre muette, une graphie inattendue.",
          "Compare ce que tu entends et ce qui est écrit, lettre à lettre. La différence, c'est le piège.",
          `« ${m.mot} » : ${m.pourquoi}.`,
          `C'est parce que ${m.pourquoi}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_dict_mots_irreguliers_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Le mot « femme » se dit [fam] et s'écrit avec « emme ». Comment retenir un mot pareil ?",
    format: "qcm",
    choices: [
      "En le regardant, en fermant les yeux pour le revoir, puis en l'écrivant",
      "En le répétant à voix haute jusqu'à le savoir",
      "En cherchant la règle qui l'explique",
      "En le découpant en syllabes qu'on écrit au son",
    ],
    expected: ["En le regardant, en fermant les yeux pour le revoir, puis en l'écrivant"],
    comparator: "mcq_exact",
    hint: "Si le mot ne s'écrit pas comme il se dit, à quoi sert de l'écouter ?",
    explanation: exp(
      "Un mot irrégulier ne suit aucune règle : ni le son, ni la famille ne le donnent.",
      "On l'apprend par l'image : regarder, fermer les yeux, revoir le mot, puis l'écrire et vérifier.",
      "« femme » est le seul mot du français où « emme » se dit [am]. Le répéter à voix haute donne « fame ». C'est l'œil qui doit retenir, pas l'oreille.",
      "En le regardant, en fermant les yeux pour le revoir, puis en l'écrivant.",
    ),
    tags: ["ce2", "dictee", "mots-irreguliers", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_dict_mots_irreguliers_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_mots_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Il n'a pas fait n'importe quoi. Il a fait ce qu'on lui a appris.",
    tags: ["ce2", "dictee", "mots-irreguliers", "methode"],
    generate: () => {
      const m = randomChoice(MOTS_IRREGULIERS);
      const bonne = `Il a écrit ce qu'il entendait — c'est ce qu'on lui a appris à faire — mais « ${m.mot} » ne s'écrit pas au son.`;
      return {
        text: `Un camarade écrit « ${m.fautes[0]} » au lieu de « ${m.mot} ».\n\nQu'a-t-il fait ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle du regard adulte : prendre pour de l'inattention
          // une règle correctement appliquée au mauvais endroit.
          "Il n'a pas écouté la maitresse.",
          "Il a confondu ce mot avec un autre mot de sa famille.",
          "Il a écrit trop vite.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot irrégulier ne s'écrit pas comme il se dit : l'écrire au son donne une faute, même en s'appliquant.",
          "Retiens ces mots-là par l'image : regarde, revois, écris, vérifie.",
          `Ton camarade a écrit ce qu'il entendait — c'est ce qu'on lui a appris à faire. Mais « ${m.mot} » : ${m.pourquoi}.`,
          `Il a écrit au son, et « ${m.mot} » ne s'écrit pas au son.`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_DICT_GRAPHIES_SON
  ========================================================= */
  {
    kind: "template",
    id: "ce2_dict_graphies_son_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_graphies_son",
    difficulty: 3,
    theme: "neutral",
    hint: "Un même son s'écrit de plusieurs façons. Ici, une seule est la bonne.",
    tags: ["ce2", "dictee", "graphies", "template"],
    generate: () => {
      const g = randomChoice(GRAPHIES);
      return {
        text: `Complète : « ${g.phrase} »`,
        format: "qcm" as const,
        choices: shuffle([g.mot, ...g.fautes]),
        expected: [g.mot],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un même son peut s'écrire de plusieurs façons, et c'est le mot qui décide, pas le son.",
          "Quand tu hésites, revois le mot écrit dans ton cahier : c'est l'image qui tranche.",
          `« ${g.mot} » s'écrit avec « ${g.graphie} ». Les autres graphies existent dans d'autres mots, mais pas dans celui-ci.`,
          `On écrit « ${g.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_graphies_son_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_graphies_son",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot est écrit sous tes yeux : cherche les lettres qui font ce son-là.",
    tags: ["ce2", "dictee", "graphies", "template"],
    generate: () => {
      // ⛔ Seuls les sons `nommable` arrivent ici. On ne demande jamais à
      // l'enfant de distinguer [e] de [ɛ] : « lait » se dit [lɛ] dans le nord
      // et souvent [le] à La Réunion, et il aurait faux à cause de son accent.
      const g = randomChoice(GRAPHIES_NOMMABLES);
      const memeSon = GRAPHIES_NOMMABLES.filter((x) => x.son === g.son).map((x) => x.graphie);
      return {
        text: `Regarde le mot « ${g.mot} ».\n\nPar quelles lettres le son ${g.son} y est-il écrit ?`,
        format: "qcm" as const,
        choices: choix(g.graphie, memeSon, GRAPHIES_NOMMABLES.map((x) => x.graphie)),
        expected: [g.graphie],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le son ${g.son} peut s'écrire de plusieurs façons : ${[...new Set(memeSon)].map((x) => `« ${x} »`).join(", ")}.`,
          "Lis le mot lettre à lettre et arrête-toi à l'endroit où le son apparait.",
          `Dans « ${g.mot} », c'est « ${g.graphie} ».`,
          `Le son ${g.son} s'écrit « ${g.graphie} » dans « ${g.mot} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_dict_graphies_son_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_graphies_son",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi écrit-on « garçon » avec une cédille, alors que « cerise » n'en a pas ?",
    format: "qcm",
    choices: [
      "Parce que le « c » se dit [k] devant a, o, u : la cédille le force à faire [s]",
      "Parce que « garçon » est un mot irrégulier",
      "Parce que la cédille sert à marquer le masculin",
      "Parce qu'il y a deux syllabes dans le mot",
    ],
    expected: [
      "Parce que le « c » se dit [k] devant a, o, u : la cédille le force à faire [s]",
    ],
    comparator: "mcq_exact",
    hint: "Regarde la lettre qui suit le « c » dans chaque mot.",
    explanation: exp(
      "Le « c » se lit [s] devant e, i, y, et [k] devant a, o, u. La cédille sert à obtenir [s] là où le « c » ferait [k].",
      "Regarde la voyelle qui suit le « c ». Si c'est a, o ou u et que tu veux [s], il faut la cédille.",
      "cerise : le « c » est devant un « e », il fait déjà [s], pas besoin de cédille. garçon : le « c » est devant un « o », il ferait [k] — on écrirait « garkon ». La cédille le corrige. Même chose pour leçon, français, maçon.",
      "Parce que le « c » se dit [k] devant a, o, u : la cédille le force à faire [s].",
    ),
    tags: ["ce2", "dictee", "graphies", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_dict_graphies_son_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_graphies_son",
    difficulty: 3,
    theme: "neutral",
    hint: "Si le son ne suffit pas à choisir, qu'est-ce qui décide ?",
    tags: ["ce2", "dictee", "graphies", "methode"],
    generate: () => {
      const g = randomChoice(GRAPHIES_NOMMABLES);
      const memeSon = [...new Set(GRAPHIES_NOMMABLES.filter((x) => x.son === g.son).map((x) => x.graphie))];
      const bonne = `C'est le MOT qui décide : je revois son image telle que je l'ai lue. « ${g.mot} » s'écrit avec « ${g.graphie} », et rien dans le son ne l'annonçait.`;
      return {
        text: `Le son ${g.son} s'écrit ${memeSon.map((x) => `« ${x} »`).join(", ")} selon les mots.\n\nComment sais-tu laquelle choisir quand tu écris ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : mieux écouter ne peut rien donner — le son est le même.
          "J'écoute mieux : le son finit par dire laquelle.",
          "Je prends toujours la même : c'est la plus fréquente.",
          "Je prends la graphie la plus courte.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le son ne dit pas quelle graphie utiliser : plusieurs conviendraient. C'est le MOT qui décide.",
          "Revois le mot tel que tu l'as lu : c'est la mémoire de son image qui tranche, pas l'oreille.",
          `${g.mot} s'écrit avec « ${g.graphie} », et rien dans le son ne l'annonçait.`,
          "C'est le mot lui-même qu'il faut avoir vu et retenu.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_DICT_CHAINES_ACCORD
  ========================================================= */
  {
    kind: "template",
    id: "ce2_dict_chaines_accord_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_chaines_accord",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde tout le groupe avant d'écrire la fin du mot.",
    tags: ["ce2", "dictee", "accords", "template"],
    generate: () => {
      const d = randomChoice(DICTEES);
      return {
        text: `Sous la dictée, tu as écrit :\n\n« ${d.phraseTrou} »\n\nComment se termine le mot qui manque ?`,
        format: "qcm" as const,
        choices: shuffle([d.motAccorde, ...d.fautesAccord]),
        expected: [d.motAccorde],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans une dictée, la moitié des fautes ne sont pas des fautes de mot : ce sont des fautes d'accord.",
          "Avant d'écrire la fin d'un mot, remonte à celui qui commande : le nom pour un adjectif, le sujet pour un verbe.",
          `Ici, il faut « ${d.motAccorde} ». La phrase complète est : « ${d.phrase} »`,
          `On écrit « ${d.motAccorde} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_chaines_accord_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_chaines_accord",
    difficulty: 3,
    theme: "neutral",
    hint: "Il n'y a qu'une seule faute, et elle est dans une terminaison.",
    tags: ["ce2", "dictee", "accords", "template"],
    generate: () => {
      const d = randomChoice(DICTEES);
      return {
        text: `Une seule de ces deux phrases est correcte :\n\nA. « ${d.phrase} »\nB. « ${d.fauteAccord} »\n\nLaquelle, et quelle est la faute de l'autre ?`,
        format: "qcm" as const,
        choices: shuffle([
          "A est correcte : dans B, un accord n'a pas été fait",
          "B est correcte : dans A, un accord n'a pas été fait",
          "Les deux sont correctes",
          "Aucune des deux n'est correcte",
        ]),
        expected: ["A est correcte : dans B, un accord n'a pas été fait"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une chaine d'accord se relit maillon par maillon : déterminant, nom, adjectif, puis verbe.",
          "Compare les deux phrases mot à mot et arrête-toi sur la terminaison qui diffère.",
          `« ${d.phrase} » est juste. Dans l'autre, un mot est resté en arrière et n'a pas suivi la chaine.`,
          "A est correcte : dans B, un accord n'a pas été fait.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_chaines_accord_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_chaines_accord",
    difficulty: 3,
    theme: "neutral",
    hint: "Dans quel ordre, et surtout : sur quelle feuille regardes-tu ?",
    tags: ["ce2", "dictee", "accords", "methode"],
    generate: () => {
      const d = randomChoice(DICTEES);
      const bonne = "Les accords un par un, en remontant à celui qui commande — le nom pour l'adjectif, le sujet pour le verbe — et je relis sur MA feuille.";
      return {
        text: `Tu viens d'écrire « ${d.phrase} » sous la dictée.\n\nQue vérifies-tu avant de rendre ta feuille ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // LE piège : l'œil qui relit le modèle relit une phrase juste.
          "Je relis sur le modèle : c'est lui qui a la bonne orthographe.",
          "Je vérifie tout en même temps, en relisant une fois.",
          // La voisine : soigner sa graphie, ce n'est pas vérifier son orthographe.
          "Je vérifie que mon écriture est bien lisible.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se relire, c'est vérifier une chose à la fois : d'abord les accords du groupe nominal, ensuite celui du verbe avec son sujet.",
          "Relis sur TA feuille, jamais sur le modèle : c'est ton écrit qu'il faut corriger, et l'œil glisse sur ce qu'il a déjà lu ailleurs.",
          `Dans « ${d.phrase} », on remonte du mot à celui qui le commande : le nom pour l'adjectif, le sujet pour le verbe.`,
          "On vérifie les accords un par un, en remontant à celui qui commande.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_DICT_PHRASE — la phrase entière
  ========================================================= */
  {
    kind: "template",
    id: "ce2_dict_phrase_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois de ces phrases contiennent chacune UNE faute. Trouve celle qui n'en a aucune.",
    tags: ["ce2", "dictee", "phrase", "template"],
    generate: () => {
      const d = randomChoice(DICTEES);
      return {
        text: "Une seule de ces phrases est écrite sans aucune faute. Laquelle ?",
        format: "qcm" as const,
        choices: shuffle([d.phrase, d.fauteAccord, d.fauteMot, d.fauteHomophone]),
        expected: [d.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une dictée réunit les trois familles d'erreurs : l'accord oublié, le mot mal orthographié, et l'homophone mal choisi.",
          "Relis trois fois, une famille à la fois : les terminaisons, puis les mots, puis les petits mots qui se ressemblent.",
          `« ${d.phrase} » est juste. Les trois autres ont chacune une seule faute, et d'une famille différente.`,
          `La phrase correcte est « ${d.phrase} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_phrase_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare les deux phrases mot à mot. Une seule chose a changé.",
    tags: ["ce2", "dictee", "phrase", "template"],
    generate: () => {
      const d = randomChoice(DICTEES);
      const cas = randomChoice([
        { fausse: d.fauteAccord, quoi: "un accord oublié" },
        { fausse: d.fauteMot, quoi: "un mot mal orthographié" },
        { fausse: d.fauteHomophone, quoi: "un petit mot qui se dit pareil mais s'écrit autrement" },
      ]);
      return {
        text: `Modèle : « ${d.phrase} »\nTa copie : « ${cas.fausse} »\n\nQuelle sorte de faute as-tu faite ?`,
        format: "qcm" as const,
        choices: shuffle([
          "un accord oublié",
          "un mot mal orthographié",
          "un petit mot qui se dit pareil mais s'écrit autrement",
          "aucune faute",
        ]),
        expected: [cas.quoi],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Savoir de quelle SORTE est sa faute vaut mieux que de la corriger sans comprendre : la même sorte reviendra.",
          "Compare le modèle et ta copie mot à mot, puis demande-toi si c'est une terminaison, un mot, ou un petit mot.",
          `Ici, c'est ${cas.quoi}.`,
          `C'est ${cas.quoi}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_phrase_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_phrase",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas le mot qui était inconnu : c'est sa fin qui n'a pas suivi.",
    tags: ["ce2", "dictee", "phrase", "methode"],
    generate: () => {
      const d = randomChoice(DICTEES);
      const bonne = "La vérification des accords : en remontant du mot à celui qui le commande, la faute se voit tout de suite.";
      return {
        text: `Tu as écrit « ${d.fauteAccord} » alors qu'il fallait écrire « ${d.phrase} ».\n\nQu'est-ce qui a manqué ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège fin : le mot était connu, c'est sa terminaison qui a lâché.
          "Je ne connaissais pas l'orthographe de ce mot.",
          "Rien : cette faute-là ne se voit pas en se relisant.",
          "J'ai manqué d'écouter la dictée jusqu'au bout.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Presque toutes les fautes d'une dictée de CE2 se corrigent en se relisant — à condition de savoir quoi chercher.",
          "Relis sur TA feuille, jamais sur le modèle, et cherche une seule chose à la fois : d'abord les accords, puis les mots.",
          `Ici, un mot n'a pas suivi la chaine. En remontant du mot à celui qui le commande, la faute se voit tout de suite.`,
          "Il a manqué la vérification des accords, en remontant à celui qui commande.",
        ),
      };
    },
  },

  /* =========================================================
     CE2_DICT_DEFI — tout ensemble
  ========================================================= */
  {
    kind: "template",
    id: "ce2_dict_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Un mot irrégulier ne se devine pas ; un mot régulier, si.",
    tags: ["ce2", "dictee", "defi", "template"],
    generate: () => {
      const irregulier = Math.random() < 0.5;
      const mot = irregulier
        ? randomChoice(MOTS_IRREGULIERS).mot
        : randomChoice(MOTS_REGULIERS).mot;
      return {
        text: `Le mot « ${mot} » : peux-tu l'écrire en le découpant en syllabes, ou faut-il l'avoir appris par cœur ?`,
        format: "qcm" as const,
        choices: [
          "on peut l'écrire en le découpant",
          "il faut l'avoir appris par cœur",
        ],
        expected: [irregulier ? "il faut l'avoir appris par cœur" : "on peut l'écrire en le découpant"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot régulier s'écrit avec les graphies les plus courantes : on peut le construire syllabe par syllabe. Un mot irrégulier, non.",
          "Écris le mot au son dans ta tête, puis compare avec ce que tu as déjà vu. Si les deux collent, il est régulier.",
          irregulier
            ? `« ${mot} » ne s'écrit pas comme il se dit : l'écrire au son donnerait une faute.`
            : `« ${mot} » s'écrit comme il se dit, syllabe par syllabe. Reste à ne pas doubler de consonne au hasard.`,
          irregulier ? "Il faut l'avoir appris par cœur." : "On peut l'écrire en le découpant.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_dict_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux fautes à repérer, pas une seule.",
    tags: ["ce2", "dictee", "defi", "template"],
    generate: () => {
      const d = randomChoice(DICTEES);
      const autres = shuffle(DICTEES.filter((x) => x.phrase !== d.phrase)).map((x) => x.phrase);
      return {
        text: `Voici quatre phrases. Une seule ne contient AUCUNE faute — ni d'accord, ni de mot, ni d'homophone. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([d.phrase, d.fauteAccord, d.fauteHomophone, autres[0]]),
        expected: [d.phrase],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Se relire, c'est passer trois fois sur le même texte, une famille de fautes à la fois.",
          "Premier passage : les terminaisons. Deuxième : les mots. Troisième : les petits mots qui se ressemblent.",
          `« ${d.phrase} » passe les trois contrôles. Les autres tombent au premier ou au troisième.`,
          `La phrase sans faute est « ${d.phrase} »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_dict_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "ecriture_mots",
    microId: "ce2_dict_defi",
    difficulty: 3,
    theme: "neutral",
    // Le cran de plus : ce n'est plus un geste mais trois passages ordonnés,
    // et les deux pièges principaux de la notion sont réunis dans les faux.
    text: "Après une dictée, on te laisse deux minutes pour te relire.\n\nQue regardes-tu, et dans quel ordre ?",
    format: "qcm",
    choices: [
      "Trois passages, sur MA feuille : les accords du groupe, l'accord du verbe avec son sujet, puis les mots difficiles.",
      // Les deux pièges de la relecture, réunis : tout à la fois, et sur le
      // modèle plutôt que sur son propre écrit.
      "Je relis une fois, en cherchant toutes les fautes à la fois.",
      "Je relis sur le modèle, pour comparer.",
      "Je recopie la dictée au propre.",
    ],
    expected: [
      "Trois passages, sur MA feuille : les accords du groupe, l'accord du verbe avec son sujet, puis les mots difficiles.",
    ],
    comparator: "mcq_exact",
    hint: "On ne cherche pas tout en même temps. Une chose à la fois.",
    explanation: exp(
      "Se relire n'est pas relire : c'est chercher une chose précise, puis une autre.",
      "Trois passages. D'abord les accords du groupe nominal, ensuite l'accord du verbe avec son sujet, enfin les mots difficiles.",
      "Et surtout : on se relit sur SA feuille, jamais sur le modèle. L'œil qui a lu la bonne phrase ailleurs ne voit plus la faute qu'il a écrite.",
      "On passe trois fois : les accords du groupe, l'accord du verbe, puis les mots — sur sa propre feuille.",
    ),
    tags: ["ce2", "dictee", "defi", "methode", "qcm"],
  },
];
