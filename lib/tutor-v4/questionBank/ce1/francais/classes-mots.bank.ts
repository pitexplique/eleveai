// lib/tutor-v4/questionBank/ce1/francais/classes-mots.bank.ts
//
// Les classes de mots au CE1, écrites à la main. Sept micro-compétences.
//
// CE QU'ELLE REMPLACE : quatre énoncés pour sept micro-compétences. Le
// générateur commun servait « Dans X, quel mot est un adjectif ? » avec DEUX
// phrases, et « Quel mot est un nom propre ? » avec « Paris ». « Reconnaître
// un pronom personnel sujet », qui est la nouveauté du CE1, ne recevait rien.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, cours élémentaire première année) :
//   — « Identifier et NOMMER : le déterminant, le nom commun, le nom propre,
//     l'adjectif, le verbe, le pronom personnel sujet » ;
//   — « Constituer et classer des corpus par classe de mots ».
//
// ⛔ Pas d'adverbe : il arrive au CE2.
//
// LES DEUX PIÈGES DE LA NOTION :
//
//   1. LA MAJUSCULE NE FAIT PAS LE NOM PROPRE. En début de phrase, TOUS les
//      mots en portent une. « Le margouillat grimpe. » — « Le » a une
//      majuscule et n'est pas un nom propre pour autant. Un enfant qui a
//      retenu « nom propre = majuscule » se trompe sur chaque première ligne.
//
//   2. UN MOT NE PORTE PAS SA CLASSE SUR LE DOS. LA PORTE se referme, IL PORTE
//      un cartable. C'est la phrase qui donne la classe, jamais le mot seul.
//      On ne classe donc jamais un mot tout nu : on le classe DANS sa phrase.

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

/* ── Les phrases étiquetées ──────────────────────────────────────────────────
   Chaque mot sait ce qu'il est, et la phrase est écrite en toutes lettres :
   l'adjectif est parfois devant le nom, parfois derrière, et coller les
   morceaux dans un ordre unique donnerait « une mûre mangue ». */

type PhraseEtiquetee = {
  readonly phrase: string;
  readonly det: string;
  readonly nom: string;
  readonly adj: string;
  readonly verbe: string;
  readonly complement: string;
};

const PHRASES: readonly PhraseEtiquetee[] = [
  { phrase: "Le petit chien aboie dans la cour.", det: "Le", nom: "chien", adj: "petit", verbe: "aboie", complement: "dans la cour" },
  { phrase: "La jolie fleur pousse près du mur.", det: "La", nom: "fleur", adj: "jolie", verbe: "pousse", complement: "près du mur" },
  { phrase: "Un gros nuage cache le soleil.", det: "Un", nom: "nuage", adj: "gros", verbe: "cache", complement: "le soleil" },
  { phrase: "Une mangue mûre tombe dans l'herbe.", det: "Une", nom: "mangue", adj: "mûre", verbe: "tombe", complement: "dans l'herbe" },
  { phrase: "Le lagon bleu brille au soleil.", det: "Le", nom: "lagon", adj: "bleu", verbe: "brille", complement: "au soleil" },
  { phrase: "Ma petite sœur chante une comptine.", det: "Ma", nom: "sœur", adj: "petite", verbe: "chante", complement: "une comptine" },
  { phrase: "Le vieux manguier perd ses feuilles.", det: "Le", nom: "manguier", adj: "vieux", verbe: "perd", complement: "ses feuilles" },
  { phrase: "Un margouillat rapide file sous la porte.", det: "Un", nom: "margouillat", adj: "rapide", verbe: "file", complement: "sous la porte" },
  { phrase: "La route étroite monte vers le piton.", det: "La", nom: "route", adj: "étroite", verbe: "monte", complement: "vers le piton" },
  { phrase: "Mon grand frère répare sa pirogue.", det: "Mon", nom: "frère", adj: "grand", verbe: "répare", complement: "sa pirogue" },
  { phrase: "Une vieille case résiste au vent.", det: "Une", nom: "case", adj: "vieille", verbe: "résiste", complement: "au vent" },
  { phrase: "Le cari chaud sent très bon.", det: "Le", nom: "cari", adj: "chaud", verbe: "sent", complement: "très bon" },
  { phrase: "Ces letchis sucrés viennent du jardin.", det: "Ces", nom: "letchis", adj: "sucrés", verbe: "viennent", complement: "du jardin" },
  { phrase: "La maitresse contente distribue les cahiers.", det: "La", nom: "maitresse", adj: "contente", verbe: "distribue", complement: "les cahiers" },
  { phrase: "Un long sentier traverse la forêt.", det: "Un", nom: "sentier", adj: "long", verbe: "traverse", complement: "la forêt" },
  { phrase: "Le pêcheur fatigué range ses filets.", det: "Le", nom: "pêcheur", adj: "fatigué", verbe: "range", complement: "ses filets" },
  { phrase: "Mes nouvelles chaussures serrent un peu.", det: "Mes", nom: "chaussures", adj: "nouvelles", verbe: "serrent", complement: "un peu" },
  { phrase: "La tortue lente avance sur le sable.", det: "La", nom: "tortue", adj: "lente", verbe: "avance", complement: "sur le sable" },
  { phrase: "Un oiseau blanc traverse le ciel.", det: "Un", nom: "oiseau", adj: "blanc", verbe: "traverse", complement: "le ciel" },
  { phrase: "Le bateau rouge quitte le port.", det: "Le", nom: "bateau", adj: "rouge", verbe: "quitte", complement: "le port" },
];

/* ── Noms propres et noms communs ────────────────────────────────────────────
   Chaque nom, propre ou commun, arrive dans une phrase à lui : on ne classe
   jamais un mot tout nu. Le piège de la majuscule, lui, se joue sur le premier
   mot des phrases étiquetées — voir `ce1_cm_nom_propre_commun_tpl_3`. */

type Nom = {
  readonly propre: string;
  readonly phrasePropre: string;
  readonly commun: string;
  readonly phraseCommun: string;
};

const NOMS: readonly Nom[] = [
  { propre: "Léa", phrasePropre: "Léa ramasse des letchis.", commun: "fille", phraseCommun: "Une fille traverse la cour." },
  { propre: "Tom", phrasePropre: "Tom ferme la porte.", commun: "chien", phraseCommun: "Le chien dort sous la varangue." },
  { propre: "Saint-Denis", phrasePropre: "Nous allons à Saint-Denis.", commun: "ville", phraseCommun: "La ville se réveille tôt." },
  { propre: "La Réunion", phrasePropre: "La Réunion est une île.", commun: "île", phraseCommun: "Notre île a deux pitons." },
  { propre: "Mafate", phrasePropre: "Le sentier descend dans Mafate.", commun: "cirque", phraseCommun: "Ce cirque est difficile à atteindre." },
  { propre: "Salazie", phrasePropre: "Il pleut souvent à Salazie.", commun: "village", phraseCommun: "Le village compte trois boutiques." },
  { propre: "Mamie", phrasePropre: "Mamie prépare un cari.", commun: "voisine", phraseCommun: "Ma voisine arrose ses fleurs." },
  { propre: "Le Port", phrasePropre: "Les bateaux arrivent au Port.", commun: "port", phraseCommun: "Le port est plein de pirogues." },
  { propre: "Sarah", phrasePropre: "Sarah récite sa poésie.", commun: "élève", phraseCommun: "Un élève lève la main." },
  { propre: "Piton des Neiges", phrasePropre: "Le Piton des Neiges est très haut.", commun: "sommet", phraseCommun: "Le sommet disparait dans la brume." },
];

/* ── Le même mot, deux classes ─────────────────────────────────────────────── */

type MotDouble = {
  readonly mot: string;
  readonly phraseNom: string;
  readonly phraseVerbe: string;
};

// ⚠️ Les deux phrases doivent contenir le mot ÉCRIT EXACTEMENT PAREIL. « le
// cri » et « il crie », « le vol » et « il vole » n'ont pas la même
// orthographe : le piège disparait, et l'élève n'apprend rien.
const MOTS_DOUBLES: readonly MotDouble[] = [
  { mot: "porte", phraseNom: "La porte est ouverte.", phraseVerbe: "Il porte un cartable." },
  { mot: "danse", phraseNom: "La danse commence à midi.", phraseVerbe: "Elle danse très bien." },
  { mot: "marche", phraseNom: "La marche est trop haute.", phraseVerbe: "Il marche sur le sentier." },
  { mot: "ferme", phraseNom: "La ferme est près du village.", phraseVerbe: "Elle ferme la fenêtre." },
  { mot: "livre", phraseNom: "Le livre est sur la table.", phraseVerbe: "Le facteur livre le colis." },
  { mot: "voile", phraseNom: "La voile claque au vent.", phraseVerbe: "Un nuage voile le soleil." },
  { mot: "colle", phraseNom: "La colle est toute sèche.", phraseVerbe: "Tom colle son image." },
  { mot: "glace", phraseNom: "La glace fond très vite.", phraseVerbe: "Le vent glace mes mains." },
  { mot: "poste", phraseNom: "La poste ouvre à huit heures.", phraseVerbe: "Léa poste sa lettre." },
  { mot: "cours", phraseNom: "Le cours de musique commence.", phraseVerbe: "Tu cours plus vite que moi." },
];

/* ── Les pronoms personnels sujets — la nouveauté du CE1 ─────────────────── */

const PRONOMS_SUJETS: readonly string[] = ["je", "tu", "il", "elle", "nous", "vous", "ils", "elles"];

/** Un groupe sujet et le pronom qui le remplace. Le pronom personnel sujet se
 *  reconnait à ce qu'il tient la place du groupe sujet devant le verbe. */
type GroupeEtPronom = {
  readonly phrase: string;
  readonly groupe: string;
  readonly pronom: string;
  readonly verbe: string;
};

const GROUPES_SUJETS: readonly GroupeEtPronom[] = [
  { phrase: "Le margouillat file sous la porte.", groupe: "Le margouillat", pronom: "il", verbe: "file" },
  { phrase: "Ma petite sœur chante une comptine.", groupe: "Ma petite sœur", pronom: "elle", verbe: "chante" },
  { phrase: "Les élèves récitent une poésie.", groupe: "Les élèves", pronom: "ils", verbe: "récitent" },
  { phrase: "Les tortues avancent sur le sable.", groupe: "Les tortues", pronom: "elles", verbe: "avancent" },
  { phrase: "Le pêcheur range ses filets.", groupe: "Le pêcheur", pronom: "il", verbe: "range" },
  { phrase: "La maitresse distribue les cahiers.", groupe: "La maitresse", pronom: "elle", verbe: "distribue" },
  { phrase: "Les cousins mangent des letchis.", groupe: "Les cousins", pronom: "ils", verbe: "mangent" },
  { phrase: "Les vagues glissent sur le sable.", groupe: "Les vagues", pronom: "elles", verbe: "glissent" },
  { phrase: "Mon grand frère répare sa pirogue.", groupe: "Mon grand frère", pronom: "il", verbe: "répare" },
  { phrase: "La vieille case résiste au vent.", groupe: "La vieille case", pronom: "elle", verbe: "résiste" },
];

/** Les quatre étiquettes du CE1. ⛔ Pas d'adverbe : il arrive au CE2. */
const CLASSES: readonly string[] = ["un déterminant", "un nom", "un adjectif", "un verbe"];

export const classesMotsBank: TutorBankItemV4[] = [
  /* =========================================================
     CE1_CM_NOM_PROPRE_COMMUN — la majuscule ne prouve rien
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_cm_nom_propre_commun_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_nom_propre_commun",
    difficulty: 3,
    theme: "neutral",
    text: "« Le margouillat grimpe sur le mur. »\n\nLe mot « Le » porte une majuscule. Est-ce un nom propre ?",
    format: "qcm",
    choices: [
      "Non : en début de phrase, TOUS les mots prennent une majuscule",
      "Oui : la majuscule fait le nom propre",
      "Oui, parce qu'il est le premier",
      "On ne peut pas savoir",
    ],
    expected: ["Non : en début de phrase, TOUS les mots prennent une majuscule"],
    comparator: "mcq_exact",
    hint: "Déplace le mot au milieu de la phrase. Garde-t-il sa majuscule ?",
    explanation: exp(
      "Un nom propre désigne UNE personne, UN lieu précis, et garde sa majuscule partout dans la phrase.",
      "Fais le test : place le mot au milieu d'une phrase. Un nom propre garde sa majuscule, les autres la perdent.",
      "« Le margouillat grimpe. » → « Je vois le margouillat grimper. » Le « L » est redevenu minuscule : ce n'était pas un nom propre. Alors que « Léa » reste « Léa » partout.",
      "Non : en début de phrase, tous les mots prennent une majuscule.",
    ),
    tags: ["ce1", "classes-mots", "nom-propre", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_cm_nom_propre_commun_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_nom_propre_commun",
    difficulty: 2,
    theme: "reunion",
    hint: "Un nom propre désigne quelqu'un ou un endroit précis, et lui seul.",
    tags: ["ce1", "classes-mots", "nom-propre", "template"],
    generate: () => {
      const n = randomChoice(NOMS);
      const propre = Math.random() < 0.5;
      const phrase = propre ? n.phrasePropre : n.phraseCommun;
      const mot = propre ? n.propre : n.commun;
      const bon = propre ? "un nom propre" : "un nom commun";
      return {
        text: `« ${phrase} »\n\nDans cette phrase, « ${mot} » est-il un nom propre ou un nom commun ?`,
        format: "qcm" as const,
        choices: ["un nom propre", "un nom commun"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom propre désigne une personne ou un lieu unique. Un nom commun désigne une catégorie entière : tous les chiens, toutes les villes.",
          "Demande-toi : y en a-t-il un seul au monde qui porte ce nom-là ?",
          propre
            ? `« ${n.propre} » désigne quelqu'un ou un endroit précis : c'est un nom propre, et il garde sa majuscule où qu'il soit dans la phrase.`
            : `« ${n.commun} » ne désigne personne en particulier : il y a beaucoup de ${n.commun}s. C'est un nom commun, et il n'a pas de majuscule.`,
          `C'est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_nom_propre_commun_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_nom_propre_commun",
    difficulty: 2,
    theme: "reunion",
    hint: "Trois mots désignent une catégorie. Un seul désigne quelqu'un ou un endroit précis.",
    tags: ["ce1", "classes-mots", "nom-propre", "template"],
    generate: () => {
      const n = randomChoice(NOMS);
      const autres = shuffle(NOMS.filter((x) => x.commun !== n.commun))
        .slice(0, 3)
        .map((x) => x.commun);
      return {
        text: `Parmi ces mots, lequel est un nom PROPRE ?`,
        format: "qcm" as const,
        choices: makeChoices(n.propre, autres),
        expected: [n.propre],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom propre nomme une personne ou un lieu unique. Il s'écrit toujours avec une majuscule, où qu'il soit dans la phrase.",
          "Demande-toi s'il y en a un seul au monde qui s'appelle comme ça.",
          `« ${n.propre} » désigne quelqu'un ou un endroit précis. « ${autres.join(" », « ")} » désignent des catégories entières.`,
          `Le nom propre est « ${n.propre} ».`,
        ),
      };
    },
  },

  {
    kind: "template",
    id: "ce1_cm_nom_propre_commun_tpl_3",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_nom_propre_commun",
    difficulty: 3,
    theme: "neutral",
    hint: "Imagine le mot au milieu de la phrase. Garderait-il sa majuscule ?",
    tags: ["ce1", "classes-mots", "nom-propre", "piege", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${p.phrase} »\n\nLe premier mot, « ${p.det} », porte une majuscule. Est-ce pour autant un nom propre ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: ["non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un nom propre garde sa majuscule PARTOUT. Le premier mot d'une phrase, lui, en prend une quel qu'il soit.",
          "Déplace le mot au milieu d'une phrase et regarde : s'il perd sa majuscule, ce n'était pas un nom propre.",
          `« ${p.phrase} » → « Je regarde ${p.det.toLowerCase()} ${p.adj} ${p.nom}. » Le « ${p.det.charAt(0)} » est redevenu minuscule. « ${p.det} » est un déterminant, pas un nom propre. Alors que « Léa » s'écrit « Léa » où qu'elle se trouve.`,
          "Non : en début de phrase, tous les mots prennent une majuscule.",
        ),
      };
    },
  },

  /* =========================================================
     CE1_CM_ADJECTIF
  ========================================================= */
  {
    kind: "template",
    id: "ce1_cm_adjectif_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_adjectif",
    difficulty: 2,
    theme: "neutral",
    hint: "L'adjectif répond à la question « comment est-il ? ».",
    tags: ["ce1", "classes-mots", "adjectif", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${p.phrase} »\n\nQuel mot dit COMMENT est le ${p.nom} ?`,
        format: "qcm" as const,
        choices: makeChoices(p.adj, [p.det, p.nom, p.verbe]),
        expected: [p.adj],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif décrit le nom : il dit comment est la chose ou la personne.",
          "Pose la question « comment est-il ? » et cherche le mot qui répond.",
          `Comment est le ${p.nom} ? Il est ${p.adj}. C'est l'adjectif.`,
          `L'adjectif est « ${p.adj} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_adjectif_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_adjectif",
    difficulty: 3,
    theme: "neutral",
    hint: "Enlève le mot et relis : si la phrase se dit encore, c'était un adjectif.",
    tags: ["ce1", "classes-mots", "adjectif", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const sansAdj = p.phrase.replace(`${p.adj} `, "").replace(` ${p.adj}`, "");
      return {
        text: `« ${p.phrase} »\n\nSi on enlève l'adjectif, que devient la phrase ?`,
        format: "qcm" as const,
        // ⛔ Aucun piège n'enlève le déterminant : la phrase commencerait par
        // une minuscule, et un coach de français ne montre pas ça.
        choices: makeChoices(sansAdj, [
          p.phrase.replace(` ${p.complement}`, ""),
          p.phrase.replace(`${p.verbe} `, ""),
          p.phrase,
        ]),
        expected: [sansAdj],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'adjectif ajoute une précision au nom. La phrase tient debout sans lui, mais elle en dit moins.",
          "Barre le mot qui décrit, recopie le reste, et relis à voix haute.",
          `« ${p.phrase} » → « ${sansAdj} » On ne sait plus comment est le ${p.nom}, mais la phrase se dit toujours.`,
          `La phrase devient « ${sansAdj} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CM_DETERMINANT
  ========================================================= */
  {
    kind: "template",
    id: "ce1_cm_determinant_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_determinant",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant est le petit mot planté devant le groupe du nom.",
    tags: ["ce1", "classes-mots", "determinant", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      return {
        text: `« ${p.phrase} »\n\nQuel mot est le déterminant du groupe « ${p.nom} » ?`,
        format: "qcm" as const,
        choices: makeChoices(p.det, [p.nom, p.adj, p.verbe]),
        expected: [p.det],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant annonce le nom : le, la, les, un, une, des, mon, ma, mes, ce, ces…",
          "Trouve le nom, puis remonte jusqu'au petit mot qui ouvre le groupe.",
          `Le nom est « ${p.nom} », et le groupe commence par « ${p.det} ».`,
          `Le déterminant est « ${p.det} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_determinant_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_determinant",
    difficulty: 2,
    theme: "neutral",
    hint: "Le déterminant est le tout premier mot du groupe : celui qui annonce le nom.",
    tags: ["ce1", "classes-mots", "determinant", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const det = p.det.toLowerCase();
      // ⚠️ Pas d'adjectif dans les pièges de CE gabarit-là : « gros chien » se
      // dit aussi bien que « le chien », et la question « lequel peut se placer
      // devant un nom ? » aurait eu deux bonnes réponses. On demande donc la
      // classe, et le test du « ___ chien » reste dans l'explication.
      const estDeterminant = Math.random() < 0.45;
      const mot = estDeterminant
        ? det
        : randomChoice([
            ...new Set([...PHRASES.map((x) => x.verbe), ...PHRASES.map((x) => x.nom)]),
          ]);
      return {
        text: `« ${mot} » est-il un déterminant ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [estDeterminant ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le déterminant annonce le nom : le, la, les, un, une, des, mon, ma, mes, ce, ces…",
          "Un nom ne se promène presque jamais tout seul : il lui faut un déterminant devant. Fais le test « ___ chien ».",
          estDeterminant
            ? `« ${mot} chien » se dit : le mot annonce bien le nom.`
            : `« ${mot} chien » ne se dit pas. Ce mot-là nomme ou dit une action ; il ne peut pas annoncer un nom.`,
          estDeterminant ? "Oui." : "Non.",
        ),
      };
    },
  },

  /* =========================================================
     CE1_CM_VERBE — et le mot qui change de classe
  ========================================================= */
  {
    kind: "template",
    id: "ce1_cm_verbe_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_verbe",
    difficulty: 2,
    theme: "neutral",
    hint: "Le verbe dit ce qui se passe. Change le moment de la phrase : lui seul bouge.",
    tags: ["ce1", "classes-mots", "verbe", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const motsComplement = p.complement.split(" ");
      return {
        text: `« ${p.phrase} »\n\nQuel mot est le verbe ?`,
        format: "qcm" as const,
        choices: makeChoices(p.verbe, [
          p.nom,
          p.adj,
          motsComplement[motsComplement.length - 1],
        ]),
        expected: [p.verbe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe dit l'action ou l'état. C'est le seul mot qui change quand on change le moment de la phrase.",
          "Mets « Hier, » ou « Demain, » devant la phrase : le mot qui se transforme est le verbe.",
          `Dans « ${p.phrase} », l'action est « ${p.verbe} ». Les autres mots nomment, décrivent ou complètent.`,
          `Le verbe est « ${p.verbe} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_verbe_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_verbe",
    difficulty: 3,
    theme: "neutral",
    hint: "Le même mot peut être un nom dans une phrase et un verbe dans l'autre. Regarde ce qu'il fait.",
    tags: ["ce1", "classes-mots", "verbe", "piege", "template"],
    generate: () => {
      const m = randomChoice(MOTS_DOUBLES);
      const chercheVerbe = Math.random() < 0.5;
      const bon = chercheVerbe ? m.phraseVerbe : m.phraseNom;
      // ⚠️ L'AUTRE phrase du même mot doit être dans les propositions : sans
      // elle, il suffirait de repérer la phrase qui contient « porte », et le
      // piège de la notion disparaitrait.
      const autres = [
        chercheVerbe ? m.phraseNom : m.phraseVerbe,
        ...shuffle(
          MOTS_DOUBLES.filter((x) => x.mot !== m.mot).flatMap((x) => [x.phraseNom, x.phraseVerbe]),
        ).slice(0, 2),
      ];
      return {
        text: `Dans quelle phrase le mot « ${m.mot} » est-il ${chercheVerbe ? "un VERBE" : "un NOM"} ?`,
        format: "qcm" as const,
        choices: makeChoices(bon, autres),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot ne porte pas sa classe sur le dos : c'est la phrase qui la lui donne.",
          "Demande-toi ce que le mot fait dans la phrase : est-ce une chose dont on parle, ou une action ?",
          `« ${m.phraseNom} » — ici c'est une chose. « ${m.phraseVerbe} » — ici c'est une action. Le même son, deux métiers.`,
          `C'est dans « ${bon} »`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CM_PRONOM_SUJET — la nouveauté du CE1
  ========================================================= */
  {
    kind: "fixed",
    id: "ce1_cm_pronom_sujet_fixed_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_pronom_sujet",
    difficulty: 1,
    theme: "neutral",
    text: "À quoi sert un pronom personnel sujet ?",
    format: "qcm",
    choices: [
      "À remplacer le groupe sujet pour ne pas le répéter",
      "À décrire le nom",
      "À dire quand se passe l'action",
      "À annoncer le nom",
    ],
    expected: ["À remplacer le groupe sujet pour ne pas le répéter"],
    comparator: "mcq_exact",
    hint: "Je, tu, il, elle, nous, vous, ils, elles : à quoi servent-ils ?",
    explanation: exp(
      "Les pronoms personnels sujets sont : je, tu, il, elle, nous, vous, ils, elles. Ils tiennent la place du groupe sujet devant le verbe.",
      "Repère le groupe sujet, puis remplace-le par un seul petit mot.",
      "« Le margouillat file sous la porte. Le margouillat se cache. » On préfère : « Le margouillat file sous la porte. IL se cache. »",
      "Il sert à remplacer le groupe sujet pour ne pas le répéter.",
    ),
    tags: ["ce1", "classes-mots", "pronom", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce1_cm_pronom_sujet_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_pronom_sujet",
    difficulty: 2,
    theme: "neutral",
    hint: "Récite les huit : je, tu, il, elle, nous, vous, ils, elles.",
    tags: ["ce1", "classes-mots", "pronom", "template"],
    generate: () => {
      // Un mot à la fois : l'énoncé change à chaque tirage, et l'élève doit
      // vraiment récier la liste au lieu de repérer le plus court des quatre.
      const estPronom = Math.random() < 0.45;
      const mot = estPronom
        ? randomChoice(PRONOMS_SUJETS)
        : randomChoice([
            ...new Set([
              ...PHRASES.map((x) => x.nom),
              ...PHRASES.map((x) => x.adj),
              ...PHRASES.map((x) => x.det.toLowerCase()),
            ]),
          ]);
      return {
        text: `« ${mot} » est-il un pronom personnel sujet ?`,
        format: "qcm" as const,
        choices: ["oui", "non"],
        expected: [estPronom ? "oui" : "non"],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Il y en a huit, et pas un de plus : je, tu, il, elle, nous, vous, ils, elles.",
          "Récite la liste dans ta tête. Si le mot n'y est pas, ce n'est pas un pronom personnel sujet.",
          estPronom
            ? `« ${mot} » est bien dans la liste des huit, et il peut se mettre tout seul devant un verbe.`
            : `« ${mot} » n'est pas dans la liste. Essaie de le mettre seul devant un verbe : « ${mot} chante » ne se dit pas.`,
          estPronom ? "Oui." : "Non.",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_pronom_sujet_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_pronom_sujet",
    difficulty: 3,
    theme: "neutral",
    hint: "Un seul, ou plusieurs ? Masculin, ou féminin ?",
    tags: ["ce1", "classes-mots", "pronom", "template"],
    generate: () => {
      const g = randomChoice(GROUPES_SUJETS);
      return {
        text: `« ${g.phrase} »\n\nPar quel pronom personnel peut-on remplacer « ${g.groupe} » ?`,
        format: "qcm" as const,
        choices: shuffle(["il", "elle", "ils", "elles"]),
        expected: [g.pronom],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le pronom personnel sujet prend la place du groupe sujet, avec son genre et son nombre.",
          "Compte d'abord : un seul, ou plusieurs ? Puis demande-toi si c'est masculin ou féminin.",
          `« ${g.groupe} » → « ${g.pronom} ${g.verbe}… ». Le verbe ne change pas : le pronom garde la même personne.`,
          `On le remplace par « ${g.pronom} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CM_TRIER_CORPUS
  ========================================================= */
  {
    kind: "template",
    id: "ce1_cm_trier_corpus_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_trier_corpus",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde ce que le mot fait DANS cette phrase-là.",
    tags: ["ce1", "classes-mots", "tri", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const cas = randomChoice([
        { mot: p.det, classe: "un déterminant" },
        { mot: p.nom, classe: "un nom" },
        { mot: p.adj, classe: "un adjectif" },
        { mot: p.verbe, classe: "un verbe" },
      ]);
      return {
        text: `« ${p.phrase} »\n\nDans cette phrase, « ${cas.mot} » est…`,
        format: "qcm" as const,
        choices: shuffle([...CLASSES]),
        expected: [cas.classe],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Classer un mot, c'est dire quel travail il fait dans la phrase : annoncer (déterminant), nommer (nom), décrire (adjectif), ou dire l'action (verbe).",
          "Ne regarde pas le mot tout seul : regarde sa place et son rôle dans la phrase.",
          `Dans « ${p.phrase} » : « ${p.det} » annonce, « ${p.nom} » nomme, « ${p.adj} » décrit, « ${p.verbe} » dit l'action.`,
          `« ${cas.mot} » est ${cas.classe}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_trier_corpus_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_trier_corpus",
    difficulty: 3,
    theme: "neutral",
    hint: "Trois mots font le même travail. Un seul en fait un autre.",
    tags: ["ce1", "classes-mots", "tri", "template"],
    generate: () => {
      // ⚠️ Le champ s'appelle `adj`, pas `adjectif` : la première écriture
      // sortait `undefined` et le contrôle a signalé « proposition vide ».
      const cible = randomChoice([
        { champ: "nom", pluriel: "noms" },
        { champ: "adj", pluriel: "adjectifs" },
        { champ: "verbe", pluriel: "verbes" },
      ] as const);
      // ⚠️ Dédoublonné : deux phrases du corpus partagent le verbe « traverse »,
      // et la liste affichait deux fois le même mot.
      const trois = shuffle([...new Set(PHRASES.map((p) => p[cible.champ]))]).slice(0, 3);
      const intrus =
        cible.champ === "nom"
          ? randomChoice(PHRASES).verbe
          : cible.champ === "adj"
            ? randomChoice(PHRASES).nom
            : randomChoice(PHRASES).adj;
      return {
        text: `Trois de ces mots sont des ${cible.pluriel}. Lequel est l'intrus ?\n\n${shuffle([intrus, ...trois]).join(" · ")}`,
        format: "qcm" as const,
        choices: makeChoices(intrus, trois),
        expected: [intrus],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Constituer un corpus, c'est ranger ensemble les mots qui font le même travail.",
          "Pour chaque mot, essaie le test de sa classe : « un ___ » pour un nom, « il est ___ » pour un adjectif, « hier, il ___ » pour un verbe.",
          `${trois.join(", ")} font tous le même travail. « ${intrus} », non.`,
          `L'intrus est « ${intrus} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE1_CM_DEFI
  ========================================================= */
  {
    kind: "template",
    id: "ce1_cm_defi_tpl_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux mots à classer d'un coup, et ils ne font pas le même travail.",
    tags: ["ce1", "classes-mots", "defi", "template"],
    generate: () => {
      const p = randomChoice(PHRASES);
      const bon = `« ${p.adj} » est un adjectif et « ${p.verbe} » est un verbe`;
      return {
        text: `« ${p.phrase} »\n\nQuelle réponse est entièrement juste ?`,
        format: "qcm" as const,
        choices: shuffle([
          bon,
          `« ${p.adj} » est un verbe et « ${p.verbe} » est un adjectif`,
          `« ${p.adj} » est un adjectif et « ${p.verbe} » est un nom`,
          `« ${p.adj} » est un nom et « ${p.verbe} » est un verbe`,
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une réponse n'est juste que si les DEUX moitiés le sont.",
          "Classe un mot à la fois, puis relis la proposition en entier.",
          `Comment est le ${p.nom} ? Il est ${p.adj} : adjectif. Que se passe-t-il ? Il ${p.verbe} : verbe.`,
          `La réponse juste est : ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce1_cm_defi_tpl_2",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde le petit mot juste devant : après « la », c'est une chose ; après « il », c'est une action.",
    tags: ["ce1", "classes-mots", "defi", "piege", "template"],
    generate: () => {
      const m = randomChoice(MOTS_DOUBLES);
      const commeNom = Math.random() < 0.5;
      const phrase = commeNom ? m.phraseNom : m.phraseVerbe;
      const bon = commeNom
        ? `un nom, parce qu'un déterminant l'annonce`
        : `un verbe, parce qu'il dit ce que fait le sujet`;
      return {
        text: `« ${phrase} »\n\nDans cette phrase, « ${m.mot} » est…`,
        format: "qcm" as const,
        choices: shuffle([
          "un nom, parce qu'un déterminant l'annonce",
          "un verbe, parce qu'il dit ce que fait le sujet",
          "un adjectif, parce qu'il décrit",
          "un déterminant, parce qu'il est petit",
        ]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un mot ne porte pas sa classe sur le dos : c'est la phrase qui la lui donne, et le mot d'avant qui prévient.",
          "Regarde ce qui vient juste avant : un déterminant annonce un nom, un sujet annonce un verbe.",
          `« ${m.phraseNom} » : après « La », c'est une chose. « ${m.phraseVerbe} » : après le sujet, c'est une action. Le mot s'écrit pareil dans les deux.`,
          `Ici, « ${m.mot} » est ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce1_cm_defi_meth_1",
    niveau: "ce1",
    matiere: "francais",
    notionId: "classes_mots",
    microId: "ce1_cm_defi",
    difficulty: 3,
    theme: "neutral",
    text: "« La porte est ouverte. » et « Il porte un cartable. »\n\nC'est le même mot dans les deux phrases, et il ne fait pas le même travail. Comment fais-tu pour le savoir ?",
    format: "qcm",
    choices: [
      "Je regarde le petit mot d'avant : après « la », c'est une chose ; après « il », c'est une action.",
      // LE piège : le mot s'écrit pareil, et cela ne prouve rien.
      "Je regarde comment il s'écrit : il s'écrit pareil, donc c'est la même classe.",
      "Je compte les lettres du mot.",
      "Je regarde s'il y a un point à la fin de la phrase.",
    ],
    expected: [
      "Je regarde le petit mot d'avant : après « la », c'est une chose ; après « il », c'est une action.",
    ],
    comparator: "mcq_exact",
    hint: "Regarde le petit mot qui vient juste avant.",
    explanation: exp(
      "Un mot ne porte pas sa classe sur le dos : c'est la phrase qui la lui donne.",
      "Regarde ce qu'il y a juste devant. Après « la », c'est une chose. Après « il », c'est une action.",
      "« LA porte » : on peut la pousser, c'est une chose — un nom. « IL porte » : c'est ce qu'il fait — un verbe. Le mot s'écrit pareil, et il ne se classe pas pareil.",
      "C'est le petit mot d'avant, et le travail du mot dans la phrase, qui décident.",
    ),
    tags: ["ce1", "classes-mots", "defi", "piege", "qcm"],
  },
];
