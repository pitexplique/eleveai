// lib/tutor-v4/questionBank/ce2/francais/conjugaison.bank.ts
//
// La conjugaison du CE2, écrite à la main — et surtout : ÉCRITE EN MOTEUR.
//
// CE QU'ELLE REMPLACE : le constructeur commun `buildCycle2FrancaisBank` servait
// au CE2 les mêmes questions qu'au CP, avec un paramètre de niveau nommé
// `_level` dont aucun générateur ne se servait. Le passé composé n'existait
// nulle part, et pas un seul des huit verbes irréguliers du 3ᵉ groupe.
//
// PÉRIMÈTRE BO (n° 41 du 31 octobre 2024, CE2), au mot près :
//   « Apprendre à conjuguer au présent, à l'imparfait, au futur et au passé
//     composé de l'indicatif être et avoir, les verbes du premier groupe et les
//     verbes irréguliers du 3e groupe (faire, aller, dire, venir, pouvoir,
//     voir, vouloir, prendre). »
//   — « Identifier le radical et la terminaison » ;
//   — « Retrouver l'infinitif d'un verbe conjugué » ;
//   — « Ne pas confondre le participe passé et l'infinitif des verbes du
//     premier groupe. »
//
// ⛔ PAS de passé simple, PAS de conditionnel : cycle 3.
//
// POURQUOI UN MOTEUR. Quatre temps × dix verbes irréguliers × six personnes,
// plus trente-quatre verbes du premier groupe : écrit à la main, c'est mille
// lignes de listes que personne ne relit. Écrit une fois en tables, ce sont des
// milliers d'énoncés pour une page de code — et une seule table à corriger le
// jour où une forme est fausse. Le modèle est
// `cycle3/francais/conjugationEngine.ts`, qui s'arrêtait au futur.
//
// ⚠️ Le moteur vit DANS ce fichier, et pas à côté. `verifier-generateurs.mjs`
// charge chaque banque avec Node, qui ne résout pas l'alias `@/` : une banque
// qui importe un module voisin sort du contrôle sans que personne le voie.
// Un fichier auto-suffisant se vérifie ; un fichier élégant ne se vérifie pas.
//
// LES DEUX PIÈGES DE LA NOTION :
//   — « vous faisez » et « vous disez » n'existent pas. Ce sont les deux seules
//     formes en -tes du français courant : vous faites, vous dites. L'enfant
//     applique la règle, et la règle a tort ;
//   — « je vais manger » / « j'ai mangé ». Ta bouche dit la même chose. Le seul
//     moyen de trancher, c'est de remplacer par « prendre » : « je vais
//     prendre » se dit, « je vais pris » ne se dit pas.
//
// ⚠️ Réponse libre (`short`) UNIQUEMENT sur les verbes du premier groupe dont
// toutes les formes s'écrivent sans accent. `exact_text` ne retire pas les
// accents : demander « j'écoutais » au clavier, c'est piéger l'enfant sur son
// clavier, pas sur sa conjugaison. Les verbes accentués passent en QCM.

import type { TutorBankItemV4 } from "@/lib/tutor-v4/types";

/* ═══════════════════════════════════════════════════════════════════════════
   OUTILS
   ═══════════════════════════════════════════════════════════════════════════ */

function randomChoice<T>(items: readonly T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffle<T>(items: readonly T[]): T[] {
  return [...items].sort(() => Math.random() - 0.5);
}

/** Une bonne réponse et TROIS distracteurs distincts, puisés dans l'ordre des
 *  réserves. On dédoublonne : une même forme vit souvent dans deux tables
 *  (« je fais » et « tu fais »), et l'élève verrait deux fois la même ligne. */
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

function majuscule(mot: string): string {
  return mot.charAt(0).toUpperCase() + mot.slice(1);
}

/* ═══════════════════════════════════════════════════════════════════════════
   LE MOTEUR
   ═══════════════════════════════════════════════════════════════════════════ */

type Temps = "present" | "imparfait" | "futur" | "passe_compose";

const TEMPS_TOUS: readonly Temps[] = ["present", "imparfait", "futur", "passe_compose"];
const TEMPS_SIMPLES: readonly Temps[] = ["present", "imparfait", "futur"];

const TEMPS_PHRASE: Record<Temps, string> = {
  present: "au présent",
  imparfait: "à l'imparfait",
  futur: "au futur",
  passe_compose: "au passé composé",
};

const TEMPS_NOM: Record<Temps, string> = {
  present: "le présent",
  imparfait: "l'imparfait",
  futur: "le futur",
  passe_compose: "le passé composé",
};

/** Les six personnes, dans l'ordre des tables. */
const PRONOMS: readonly string[] = ["je", "tu", "il", "nous", "vous", "ils"];

/** Marqueurs de temps compatibles, un par temps. « Hier » est réservé au passé
 *  composé : avec l'imparfait il conviendrait aussi, et l'énoncé « à quel temps
 *  est cette phrase ? » aurait deux réponses défendables. */
const MARQUEURS: Record<Temps, readonly string[]> = {
  present: ["en ce moment", "aujourd'hui", "maintenant"],
  imparfait: ["autrefois", "avant", "l'année dernière", "quand il était petit"],
  futur: ["demain", "bientôt", "l'année prochaine", "dans deux jours"],
  passe_compose: ["hier", "ce matin", "la semaine dernière"],
};

/* ⚠️ Tables typées à la main, jamais en `as const`. Une table `as const` donne
   des types littéraux, et comparer une forme d'une table à une forme d'une
   autre devient « ces deux types n'ont aucun recouvrement » : le build casse
   alors que `verifier-generateurs.mjs`, qui exécute APRÈS dépouillement des
   types, n'a rien vu. Vu en vrai le 09/08/2026 sur le CP. */

type TableIrreguliere = {
  readonly inf: string;
  /** Plusieurs fins de phrase par verbe : c'est ce qui fait passer une notion
   *  de quarante énoncés à plusieurs centaines, sans une ligne de code de plus.
   *  ⚠️ Toutes invariables ou compléments d'objet : « nous sommes content »
   *  serait faux au pluriel, et aucun script ne l'attraperait. */
  readonly complements: readonly string[];
  readonly present: readonly string[];
  readonly imparfait: readonly string[];
  readonly futur: readonly string[];
  readonly participe: string;
  readonly auxiliaire: "avoir" | "être";
  /** Formes que l'enfant PRODUIT vraiment en régularisant le verbe, écrites à
   *  la main. ⚠️ On ne les fabrique pas : « aller » régularisé donnerait
   *  « allons », qui existe. Un piège fabriqué se retourne contre l'élève, qui
   *  a alors deux bonnes réponses sous les yeux. */
  readonly fautes: readonly string[];
};

const ETRE: TableIrreguliere = {
  inf: "être",
  complements: [
    "en retard",
    "dans la cour",
    "à la plage",
    "de bonne humeur",
    "en avance",
    "près du lagon",
    "chez mamie",
  ],
  present: ["suis", "es", "est", "sommes", "êtes", "sont"],
  imparfait: ["étais", "étais", "était", "étions", "étiez", "étaient"],
  futur: ["serai", "seras", "sera", "serons", "serez", "seront"],
  participe: "été",
  auxiliaire: "avoir",
  fautes: ["étes", "sonts", "somme"],
};

const AVOIR: TableIrreguliere = {
  inf: "avoir",
  complements: [
    "faim",
    "soif",
    "de la chance",
    "raison",
    "sommeil",
    "un cahier neuf",
    "peur du noir",
  ],
  present: ["ai", "as", "a", "avons", "avez", "ont"],
  imparfait: ["avais", "avais", "avait", "avions", "aviez", "avaient"],
  futur: ["aurai", "auras", "aura", "aurons", "aurez", "auront"],
  participe: "eu",
  auxiliaire: "avoir",
  fautes: ["avont", "aves", "ais"],
};

/** Les huit du BO, dans l'ordre où il les cite. */
const LES_HUIT_TABLES: readonly TableIrreguliere[] = [
  {
    inf: "faire",
    complements: ["un gâteau", "ses devoirs", "du bruit", "un dessin", "la vaisselle"],
    present: ["fais", "fais", "fait", "faisons", "faites", "font"],
    imparfait: ["faisais", "faisais", "faisait", "faisions", "faisiez", "faisaient"],
    futur: ["ferai", "feras", "fera", "ferons", "ferez", "feront"],
    participe: "fait",
    auxiliaire: "avoir",
    fautes: ["faisez", "faisent", "faitons"],
  },
  {
    inf: "aller",
    complements: ["au marché", "à la plage", "chez mamie", "à l'école", "au bord du lagon"],
    present: ["vais", "vas", "va", "allons", "allez", "vont"],
    imparfait: ["allais", "allais", "allait", "allions", "alliez", "allaient"],
    futur: ["irai", "iras", "ira", "irons", "irez", "iront"],
    participe: "allé",
    auxiliaire: "être",
    fautes: ["alle", "alles", "allent"],
  },
  {
    inf: "dire",
    complements: ["la vérité", "bonjour", "un secret", "une bêtise", "merci"],
    present: ["dis", "dis", "dit", "disons", "dites", "disent"],
    imparfait: ["disais", "disais", "disait", "disions", "disiez", "disaient"],
    futur: ["dirai", "diras", "dira", "dirons", "direz", "diront"],
    participe: "dit",
    auxiliaire: "avoir",
    fautes: ["disez", "ditons", "disont"],
  },
  {
    inf: "venir",
    complements: ["à la fête", "de loin", "chaque samedi", "avec un panier", "en vélo"],
    present: ["viens", "viens", "vient", "venons", "venez", "viennent"],
    imparfait: ["venais", "venais", "venait", "venions", "veniez", "venaient"],
    futur: ["viendrai", "viendras", "viendra", "viendrons", "viendrez", "viendront"],
    participe: "venu",
    auxiliaire: "être",
    fautes: ["venent", "vienons", "venont"],
  },
  {
    inf: "pouvoir",
    complements: [
      "porter le panier",
      "aider la maitresse",
      "attendre un peu",
      "monter au piton",
      "recommencer",
    ],
    present: ["peux", "peux", "peut", "pouvons", "pouvez", "peuvent"],
    imparfait: ["pouvais", "pouvais", "pouvait", "pouvions", "pouviez", "pouvaient"],
    futur: ["pourrai", "pourras", "pourra", "pourrons", "pourrez", "pourront"],
    participe: "pu",
    auxiliaire: "avoir",
    fautes: ["peuvons", "pouves", "peuves"],
  },
  {
    inf: "voir",
    complements: [
      "le lagon",
      "le sommet du piton",
      "un margouillat",
      "le bateau du pêcheur",
      "la mer depuis la case",
    ],
    present: ["vois", "vois", "voit", "voyons", "voyez", "voient"],
    imparfait: ["voyais", "voyais", "voyait", "voyions", "voyiez", "voyaient"],
    futur: ["verrai", "verras", "verra", "verrons", "verrez", "verront"],
    participe: "vu",
    auxiliaire: "avoir",
    fautes: ["voyent", "voions", "voirons"],
  },
  {
    inf: "vouloir",
    complements: ["un letchi", "de l'eau", "un cari", "une mangue", "aider mamie"],
    present: ["veux", "veux", "veut", "voulons", "voulez", "veulent"],
    imparfait: ["voulais", "voulais", "voulait", "voulions", "vouliez", "voulaient"],
    futur: ["voudrai", "voudras", "voudra", "voudrons", "voudrez", "voudront"],
    participe: "voulu",
    auxiliaire: "avoir",
    fautes: ["veulons", "voulent", "veulez"],
  },
  {
    inf: "prendre",
    complements: ["le bus", "un cahier", "le sentier", "de la vitesse", "un peu de cari"],
    present: ["prends", "prends", "prend", "prenons", "prenez", "prennent"],
    imparfait: ["prenais", "prenais", "prenait", "prenions", "preniez", "prenaient"],
    futur: ["prendrai", "prendras", "prendra", "prendrons", "prendrez", "prendront"],
    participe: "pris",
    auxiliaire: "avoir",
    fautes: ["prendons", "prenent", "prendent"],
  },
];

type VerbeEr = {
  readonly inf: string;
  readonly complements: readonly string[];
  /** Vrai si le radical porte un accent : la réponse libre lui est interdite. */
  readonly accentue: boolean;
};

/* ⚠️ Aucun verbe en -ger, -cer, -yer, -eler, -eter ni -ier : leur « nous »
   change de forme (nous mangeons, nous plaçons) ou double une voyelle (nous
   criions), et la génération par règle serait fausse. */
const VERBES_ER: readonly VerbeEr[] = [
  { inf: "chanter", complements: ["une chanson créole", "très fort", "en chœur"], accentue: false },
  { inf: "danser", complements: ["sur la place", "le maloya", "toute la soirée"], accentue: false },
  { inf: "jouer", complements: ["dans la cour", "aux billes", "sous le tamarin"], accentue: false },
  { inf: "sauter", complements: ["par-dessus la flaque", "à la corde", "très haut"], accentue: false },
  { inf: "marcher", complements: ["sur le sentier", "jusqu'au piton", "sans se plaindre"], accentue: false },
  { inf: "parler", complements: ["à voix basse", "créole", "de la sortie"], accentue: false },
  { inf: "regarder", complements: ["le lagon", "les bateaux rentrer", "la carte"], accentue: false },
  { inf: "dessiner", complements: ["un margouillat", "le piton", "une case"], accentue: false },
  { inf: "aimer", complements: ["le cari de mamie", "les letchis", "la mer"], accentue: false },
  { inf: "donner", complements: ["un coup de main", "une mangue à Tom", "sa place"], accentue: false },
  { inf: "trouver", complements: ["un galet plat", "la réponse", "un coquillage"], accentue: false },
  { inf: "tourner", complements: ["la page", "à droite", "la clé"], accentue: false },
  { inf: "ramasser", complements: ["les letchis tombés", "les papiers", "un galet"], accentue: false },
  { inf: "attraper", complements: ["le ballon", "un coup de soleil", "la balle"], accentue: false },
  { inf: "fermer", complements: ["la porte de la case", "les volets", "le portail"], accentue: false },
  { inf: "porter", complements: ["le panier de mamie", "un chapeau", "les sacs"], accentue: false },
  { inf: "pousser", complements: ["la brouette", "le portail", "un cri"], accentue: false },
  { inf: "laver", complements: ["les mangues", "la vaisselle", "le linge"], accentue: false },
  { inf: "garder", complements: ["la petite sœur de Tom", "le silence", "les clés"], accentue: false },
  { inf: "raconter", complements: ["une histoire", "sa journée", "une blague"], accentue: false },
  { inf: "gagner", complements: ["la partie", "du temps", "la course"], accentue: false },
  { inf: "coller", complements: ["une image", "l'étiquette", "les morceaux"], accentue: false },
  { inf: "grimper", complements: ["sur le tamarin", "jusqu'au sommet", "à l'échelle"], accentue: false },
  { inf: "montrer", complements: ["le chemin", "son dessin", "la direction"], accentue: false },
  { inf: "arroser", complements: ["les plantes", "le jardin", "les tomates"], accentue: false },
  { inf: "souffler", complements: ["sur les bougies", "dans la flute", "très fort"], accentue: false },
  { inf: "verser", complements: ["l'eau dans le verre", "le riz", "du lait"], accentue: false },
  { inf: "frapper", complements: ["à la porte", "dans ses mains", "le ballon"], accentue: false },
  { inf: "discuter", complements: ["avec les voisins", "de la sortie", "pendant la récréation"], accentue: false },
  { inf: "klaxonner", complements: ["devant la barrière", "deux fois", "au virage"], accentue: false },
  { inf: "écouter", complements: ["la maitresse", "le bruit des vagues", "la consigne"], accentue: true },
  { inf: "préparer", complements: ["le pique-nique", "son cartable", "le cari"], accentue: true },
  { inf: "décorer", complements: ["la classe", "le gâteau", "la case"], accentue: true },
  { inf: "réciter", complements: ["une poésie", "la table de 7", "son texte"], accentue: true },
];

const TERM_ER_PRESENT: readonly string[] = ["e", "es", "e", "ons", "ez", "ent"];
const TERM_IMPARFAIT: readonly string[] = ["ais", "ais", "ait", "ions", "iez", "aient"];
const TERM_FUTUR: readonly string[] = ["ai", "as", "a", "ons", "ez", "ont"];

/** La forme dont on se sert partout : un verbe, ses quatre temps déjà calculés,
 *  et de quoi fabriquer une phrase autour. */
type Conjugable = {
  readonly inf: string;
  readonly complements: readonly string[];
  readonly irregulier: boolean;
  readonly auxiliaire: "avoir" | "être";
  readonly participe: string;
  /** Vrai si TOUTES les formes simples s'écrivent sans accent. */
  readonly clavier: boolean;
  readonly formes: Record<Temps, readonly string[]>;
};

/** Au passé composé, le participe d'un verbe qui se conjugue avec être suit son
 *  sujet : il est venu, ils sont venus. Les personnes 3, 4 et 5 sont plurielles.
 *  ⚠️ Les gabarits n'emploient jamais « je », « tu » ni « vous » avec un verbe
 *  en être : « je suis allé » ou « allée » dépend de qui parle, et le coach ne
 *  le sait pas. On s'en tient à « il » et « ils ». */
function accorderParticipe(participe: string, personne: number): string {
  return personne >= 3 ? `${participe}s` : participe;
}

function construireIrregulier(t: TableIrreguliere): Conjugable {
  const auxTable = t.auxiliaire === "être" ? ETRE : AVOIR;
  return {
    inf: t.inf,
    complements: t.complements,
    irregulier: true,
    auxiliaire: t.auxiliaire,
    participe: t.participe,
    clavier: false,
    formes: {
      present: t.present,
      imparfait: t.imparfait,
      futur: t.futur,
      passe_compose: auxTable.present.map(
        (aux, p) =>
          `${aux} ${t.auxiliaire === "être" ? accorderParticipe(t.participe, p) : t.participe}`,
      ),
    },
  };
}

function construireEr(v: VerbeEr): Conjugable {
  const radical = v.inf.slice(0, -2);
  const participe = `${radical}é`;
  return {
    inf: v.inf,
    complements: v.complements,
    irregulier: false,
    auxiliaire: "avoir",
    participe,
    clavier: !v.accentue,
    formes: {
      present: TERM_ER_PRESENT.map((t) => radical + t),
      imparfait: TERM_IMPARFAIT.map((t) => radical + t),
      futur: TERM_FUTUR.map((t) => v.inf + t),
      passe_compose: AVOIR.present.map((aux) => `${aux} ${participe}`),
    },
  };
}

const CONJ_ETRE = construireIrregulier(ETRE);
const CONJ_AVOIR = construireIrregulier(AVOIR);
const ETRE_AVOIR: readonly Conjugable[] = [CONJ_ETRE, CONJ_AVOIR];
const LES_HUIT: readonly Conjugable[] = LES_HUIT_TABLES.map(construireIrregulier);
const LES_ER: readonly Conjugable[] = VERBES_ER.map(construireEr);
const LES_ER_CLAVIER: readonly Conjugable[] = LES_ER.filter((v) => v.clavier);
const TOUS: readonly Conjugable[] = [...ETRE_AVOIR, ...LES_HUIT, ...LES_ER];

/** Le radical du présent et de l'imparfait, pour les verbes du premier groupe. */
function radicalEr(inf: string): string {
  return inf.slice(0, -2);
}

/** « je » devient « j' » devant une voyelle. Sans ça, le moteur écrit
 *  « je ai faim » et personne ne s'en aperçoit avant l'élève. */
function attacher(sujet: string, forme: string): string {
  if (sujet === "je" && /^[aâàeéèêiîoôuûh]/.test(forme)) return `j'${forme}`;
  return `${sujet} ${forme}`;
}

/** Le trou d'une phrase à compléter. Il faut connaitre la RÉPONSE pour savoir
 *  s'il s'écrit « je ___ » ou « j'___ » : l'élision dépend de la forme qu'on
 *  lui demande d'écrire, pas du pronom. */
function trou(personne: number, forme: string): string {
  return personne === 0 && /^[aâàeéèêiîoôuûh]/.test(forme) ? "j'___" : `${PRONOMS[personne]} ___`;
}

/** Une personne tirée au sort, en évitant celles dont l'accord du participe
 *  dépendrait de qui parle. */
function personnePour(v: Conjugable, temps: Temps): number {
  if (temps === "passe_compose" && v.auxiliaire === "être") return randomChoice([2, 5]);
  return Math.floor(Math.random() * 6);
}

/* Sujets écrits en toutes lettres, jamais recomposés. Le singulier va avec la
   personne 2, le pluriel avec la personne 5. */
const SUJETS_SG: readonly string[] = [
  "le margouillat",
  "ma sœur",
  "le maitre",
  "Léa",
  "papa",
  "le pêcheur",
  "mon cousin",
  "la maitresse",
  "Tom",
  "mamie",
];

const SUJETS_PL: readonly string[] = [
  "les enfants",
  "mes cousins",
  "les élèves",
  "les pêcheurs",
  "Léa et Tom",
  "les touristes",
  "mes parents",
];

/* Pour les verbes qui se conjuguent avec être, le participe s'accorde et se
   voit. On garde donc des sujets masculins, où l'accord ne se discute pas. */
const SUJETS_M_SG: readonly string[] = ["le maitre", "papa", "mon cousin", "le pêcheur", "Tom", "Léo"];
const SUJETS_M_PL: readonly string[] = ["les enfants", "mes cousins", "les élèves", "les pêcheurs", "Tom et Léo"];

function sujetPour(v: Conjugable, temps: Temps, personne: number): string {
  const etreAuPC = temps === "passe_compose" && v.auxiliaire === "être";
  if (personne === 5) return randomChoice(etreAuPC ? SUJETS_M_PL : SUJETS_PL);
  return randomChoice(etreAuPC ? SUJETS_M_SG : SUJETS_SG);
}

/** Toutes les formes d'un verbe, tous temps confondus : la réserve à
 *  distracteurs la plus naturelle qui soit — ce sont les erreurs que l'enfant
 *  fait vraiment. */
function toutesLesFormes(v: Conjugable): string[] {
  return TEMPS_TOUS.flatMap((t) => [...v.formes[t]]);
}

/* ═══════════════════════════════════════════════════════════════════════════
   LA BANQUE
   ═══════════════════════════════════════════════════════════════════════════ */

export const conjugaisonBank: TutorBankItemV4[] = [
  /* =========================================================
     CE2_CONJ_INFINITIF
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_infinitif_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_infinitif",
    difficulty: 2,
    theme: "neutral",
    hint: "L'infinitif, c'est le nom du verbe : celui qu'on lit dans le dictionnaire.",
    tags: ["ce2", "conjugaison", "infinitif", "template"],
    generate: () => {
      const v = randomChoice(TOUS);
      const temps = randomChoice(TEMPS_TOUS);
      const p = personnePour(v, temps);
      const forme = attacher(PRONOMS[p], v.formes[temps][p]);
      return {
        text: `Quel est l'infinitif du verbe dans « ${forme} » ?`,
        format: "qcm" as const,
        choices: choix(
          v.inf,
          TOUS.map((x) => x.inf),
        ),
        expected: [v.inf],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'infinitif est la forme de base du verbe, celle qui ne change jamais. C'est sous ce nom-là qu'on le cherche dans le dictionnaire.",
          "Essaie de mettre « il faut… » devant : il faut chanter, il faut prendre. La forme qui va derrière, c'est l'infinitif.",
          `${forme} → il faut ${v.inf}.`,
          `L'infinitif est « ${v.inf} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_infinitif_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_infinitif",
    difficulty: 2,
    theme: "neutral",
    hint: "Enlève la terminaison, remets « -er » à la place.",
    tags: ["ce2", "conjugaison", "infinitif", "template"],
    generate: () => {
      const v = randomChoice(LES_ER_CLAVIER);
      const temps = randomChoice(TEMPS_SIMPLES);
      const p = Math.floor(Math.random() * 6);
      const forme = attacher(PRONOMS[p], v.formes[temps][p]);
      return {
        text: `Écris l'infinitif du verbe qui se cache dans « ${forme} ».`,
        format: "short" as const,
        expected: [v.inf],
        comparator: "exact_text" as const,
        explanation: exp(
          "L'infinitif d'un verbe du premier groupe se termine toujours par « -er ».",
          "Enlève la terminaison qui a changé, garde le début du verbe, et remets « -er ».",
          `${forme} → ${radicalEr(v.inf)}… → ${v.inf}.`,
          `L'infinitif est « ${v.inf} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_infinitif_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_infinitif",
    difficulty: 3,
    theme: "neutral",
    hint: "D'abord trouve le verbe dans la phrase. Ensuite seulement, cherche son infinitif.",
    tags: ["ce2", "conjugaison", "infinitif", "template"],
    generate: () => {
      const v = randomChoice(TOUS);
      const complement = randomChoice(v.complements);
      const temps = randomChoice(TEMPS_TOUS);
      const p = randomChoice([2, 5]);
      const sujet = sujetPour(v, temps, p);
      const phrase = `${majuscule(sujet)} ${v.formes[temps][p]} ${complement}.`;
      return {
        text: `Lis : « ${phrase} »\n\nQuel est l'infinitif du verbe conjugué ?`,
        format: "qcm" as const,
        choices: choix(
          v.inf,
          TOUS.map((x) => x.inf),
        ),
        expected: [v.inf],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Dans une phrase, le verbe est le mot qui change quand on change le moment de l'action.",
          "Dis la phrase avec « hier », puis avec « demain » : le mot qui bouge, c'est le verbe. Cherche ensuite son infinitif.",
          `Ici c'est « ${v.formes[temps][p]} », et son infinitif est « ${v.inf} ».`,
          `L'infinitif est « ${v.inf} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_infinitif_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_infinitif",
    difficulty: 3,
    theme: "neutral",
    text: "« Nous sommes en retard. » Quel est l'infinitif du verbe ?",
    format: "qcm",
    choices: ["être", "sommer", "avoir", "sommeiller"],
    expected: ["être"],
    comparator: "mcq_exact",
    hint: "Ne regarde pas la fin du mot : demande-toi ce que la phrase veut dire.",
    explanation: exp(
      "Chez les verbes irréguliers, la forme conjuguée ne ressemble plus du tout à l'infinitif.",
      "Ne découpe pas le mot : récite le verbe en entier. Je suis, tu es, il est, nous sommes… c'est le verbe être.",
      "« sommes » n'a rien à voir avec « sommer ». C'est être, et rien ne le laissait deviner dans le mot lui-même.",
      "L'infinitif est « être ».",
    ),
    tags: ["ce2", "conjugaison", "infinitif", "piege", "qcm"],
  },

  /* =========================================================
     CE2_CONJ_RADICAL_TERMINAISON
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_radical_terminaison_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_radical_terminaison",
    difficulty: 2,
    theme: "neutral",
    hint: "La terminaison, c'est la fin qui change d'une personne à l'autre.",
    tags: ["ce2", "conjugaison", "radical", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const temps = randomChoice<Temps>(["present", "imparfait"]);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes[temps][p];
      const rad = radicalEr(v.inf);
      const term = `-${forme.slice(rad.length)}`;
      const reserve = [
        ...TERM_ER_PRESENT.map((t) => `-${t}`),
        ...TERM_IMPARFAIT.map((t) => `-${t}`),
      ];
      return {
        text: `Dans « ${attacher(PRONOMS[p], forme)} », quelle est la terminaison ?`,
        format: "qcm" as const,
        choices: choix(term, reserve),
        expected: [term],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un verbe conjugué se coupe en deux : le radical, qui porte le sens, et la terminaison, qui dit qui fait l'action et quand.",
          "Compare deux personnes du même verbe : la partie qui bouge, c'est la terminaison.",
          `${rad} | ${forme.slice(rad.length)} — le radical « ${rad} » ne bouge pas, la terminaison « ${term} » va avec « ${PRONOMS[p]} ».`,
          `La terminaison est « ${term} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_radical_terminaison_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_radical_terminaison",
    difficulty: 2,
    theme: "neutral",
    hint: "Le radical, c'est le morceau qui ne change jamais.",
    tags: ["ce2", "conjugaison", "radical", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const temps = randomChoice<Temps>(["present", "imparfait"]);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes[temps][p];
      const rad = radicalEr(v.inf);
      return {
        text: `Dans « ${attacher(PRONOMS[p], forme)} », quel est le radical ?`,
        format: "qcm" as const,
        choices: choix(rad, [v.inf, forme, `${rad}e`, `${rad}ai`, `${rad}ons`]),
        expected: [rad],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le radical est la partie du verbe qui porte son sens. Chez les verbes du premier groupe, il ne bouge pas.",
          "Enlève « -er » à l'infinitif : ce qui reste est le radical.",
          `${v.inf} − er = ${rad}. On retrouve « ${rad} » dans toutes les formes : ${v.formes.present[0]}, ${v.formes.imparfait[2]}, ${v.formes.present[3]}.`,
          `Le radical est « ${rad} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_radical_terminaison_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_radical_terminaison",
    difficulty: 3,
    theme: "neutral",
    hint: "Les six terminaisons de l'imparfait sont les mêmes pour TOUS les verbes.",
    tags: ["ce2", "conjugaison", "radical", "template"],
    generate: () => {
      const p = Math.floor(Math.random() * 6);
      const term = `-${TERM_IMPARFAIT[p]}`;
      return {
        text: `À l'imparfait, quelle terminaison va avec « ${PRONOMS[p]} » ?`,
        format: "qcm" as const,
        choices: choix(term, [
          ...TERM_IMPARFAIT.map((t) => `-${t}`),
          ...TERM_ER_PRESENT.map((t) => `-${t}`),
          ...TERM_FUTUR.map((t) => `-${t}`),
        ]),
        expected: [term],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "À l'imparfait, les terminaisons sont toujours les mêmes : -ais, -ais, -ait, -ions, -iez, -aient. Pour tous les verbes, sans exception.",
          "Apprends-les comme une chanson, dans l'ordre des six personnes.",
          `je chantais, tu chantais, il chantait, nous chantions, vous chantiez, ils chantaient — avec « ${PRONOMS[p]} », c'est « ${term} ».`,
          `La terminaison est « ${term} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_radical_terminaison_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_radical_terminaison",
    difficulty: 3,
    theme: "neutral",
    text: "« nous allons » et « nous irons » : est-ce le même verbe ?",
    format: "qcm",
    choices: [
      "Oui, c'est aller : son radical change selon le temps",
      "Non, ce sont deux verbes différents",
      "Oui, et son radical est toujours « all »",
      "Non, « irons » vient du verbe « irer »",
    ],
    expected: ["Oui, c'est aller : son radical change selon le temps"],
    comparator: "mcq_exact",
    hint: "Récite le verbe aller au futur : j'irai, tu iras…",
    explanation: exp(
      "Chez les verbes du premier groupe, le radical ne bouge jamais. Chez les verbes irréguliers, il change — c'est même ce qui les rend irréguliers.",
      "Ne cherche pas à découper un verbe irrégulier : apprends ses formes en entier.",
      "aller : nous allons au présent, nous irons au futur. Deux radicaux, un seul verbe. On ne peut pas le deviner, il faut le savoir.",
      "Oui, c'est bien le verbe aller : son radical change selon le temps.",
    ),
    tags: ["ce2", "conjugaison", "radical", "piege", "qcm"],
  },

  /* =========================================================
     CE2_CONJ_PRESENT_ETRE_AVOIR
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_present_etre_avoir_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_etre_avoir",
    difficulty: 2,
    theme: "neutral",
    hint: "Regarde qui fait l'action, puis récite le verbe jusqu'à cette personne.",
    tags: ["ce2", "conjugaison", "etre-avoir", "template"],
    generate: () => {
      const v = randomChoice(ETRE_AVOIR);
      const complement = randomChoice(v.complements);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.present[p];
      return {
        text: `Complète avec le verbe ${v.inf} au présent :\n\n« ${majuscule(trou(p, forme))} ${complement}. »`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.present], [...v.formes.imparfait]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `Le verbe ${v.inf} au présent : ${v.formes.present.map((f, i) => attacher(PRONOMS[i], f)).join(", ")}.`,
          "Repère la personne, puis récite le verbe jusqu'à elle.",
          `Avec « ${PRONOMS[p]} », ${v.inf} fait « ${forme} ».`,
          `On écrit « ${majuscule(attacher(PRONOMS[p], forme))} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_present_etre_avoir_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_etre_avoir",
    difficulty: 2,
    theme: "neutral",
    hint: "Un sujet, ce n'est pas toujours un pronom. Remplace-le par « il » ou « ils ».",
    tags: ["ce2", "conjugaison", "etre-avoir", "template"],
    generate: () => {
      const v = randomChoice(ETRE_AVOIR);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const forme = v.formes.present[p];
      return {
        text: `Complète avec le verbe ${v.inf} au présent :\n\n« ${majuscule(sujet)} ___ ${complement}. »`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.present], [...v.formes.futur]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe s'accorde avec son sujet, même quand le sujet n'est pas un pronom.",
          `Remplace le sujet par un pronom : « ${sujet} », c'est « ${PRONOMS[p]} ».`,
          `${PRONOMS[p]} ${forme} → ${majuscule(sujet)} ${forme} ${complement}.`,
          `On écrit « ${majuscule(sujet)} ${forme} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_present_etre_avoir_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_etre_avoir",
    difficulty: 3,
    theme: "neutral",
    text: "« Ils ont faim » et « Ils sont contents ». Lequel des deux verbes est « avoir » ?",
    format: "qcm",
    choices: [
      "« ont », dans « ils ont faim »",
      "« sont », dans « ils sont contents »",
      "Les deux",
      "Aucun des deux",
    ],
    expected: ["« ont », dans « ils ont faim »"],
    comparator: "mcq_exact",
    hint: "Avoir, c'est posséder. Être, c'est comment on est.",
    explanation: exp(
      "Être et avoir sont les deux verbes les plus utilisés du français, et leurs formes se ressemblent : ont / sont, es / est, as / a.",
      "Demande-toi ce que la phrase raconte : quelque chose qu'on POSSÈDE, c'est avoir ; quelque chose qu'on EST, c'est être.",
      "Ils ont faim : la faim, on l'a. Ils sont contents : contents, on l'est. Les deux mots riment, mais ce ne sont pas les mêmes verbes.",
      "C'est « ont », dans « ils ont faim ».",
    ),
    tags: ["ce2", "conjugaison", "etre-avoir", "piege", "qcm"],
  },

  /* =========================================================
     CE2_CONJ_PRESENT_ER
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_present_er_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_er",
    difficulty: 2,
    theme: "neutral",
    hint: "Garde le radical, ajoute la terminaison de la personne : -e, -es, -e, -ons, -ez, -ent.",
    tags: ["ce2", "conjugaison", "present", "template"],
    generate: () => {
      const v = randomChoice(LES_ER_CLAVIER);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.present[p];
      return {
        text: `Écris le verbe « ${v.inf} » au présent avec « ${PRONOMS[p]} ». (Écris seulement le verbe.)`,
        format: "short" as const,
        expected: [forme, attacher(PRONOMS[p], forme)],
        comparator: "exact_text" as const,
        explanation: exp(
          "Au présent, un verbe du premier groupe prend les terminaisons -e, -es, -e, -ons, -ez, -ent.",
          "Enlève « -er » de l'infinitif, garde le radical, ajoute la terminaison de la personne.",
          `${v.inf} → ${radicalEr(v.inf)} + ${forme.slice(radicalEr(v.inf).length)} = ${forme}.`,
          `On écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_present_er_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_er",
    difficulty: 2,
    theme: "neutral",
    hint: "Compte d'abord : un seul, ou plusieurs ?",
    tags: ["ce2", "conjugaison", "present", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const forme = v.formes.present[p];
      const rad = radicalEr(v.inf);
      return {
        text: `Complète au présent :\n\n« ${majuscule(sujet)} ___ ${complement}. » — verbe « ${v.inf} »`,
        format: "qcm" as const,
        choices: choix(forme, [`${rad}e`, `${rad}es`, `${rad}ent`, `${rad}ons`, `${rad}ez`]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La marque du pluriel des verbes est « -nt ». Elle s'écrit et ne s'entend pas.",
          "Remplace le sujet par un pronom, puis choisis la terminaison qui va avec.",
          p === 5
            ? `« ${sujet} », c'est « ils » : on écrit ${forme}, avec « -ent » à la fin, même si ça se dit comme au singulier.`
            : `« ${sujet} », c'est « il » : on écrit ${forme}, sans « -nt ».`,
          `On écrit « ${majuscule(sujet)} ${forme} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_present_er_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_er",
    difficulty: 3,
    theme: "neutral",
    text: "« Tu ramasses les letchis. » Pourquoi un « s » à la fin du verbe, alors qu'on ne l'entend pas ?",
    format: "qcm",
    choices: [
      "Parce qu'avec « tu », le verbe finit toujours par un s",
      "Parce que les letchis sont plusieurs",
      "Parce que c'est un nom au pluriel",
      "C'est une faute : il n'en faut pas",
    ],
    expected: ["Parce qu'avec « tu », le verbe finit toujours par un s"],
    comparator: "mcq_exact",
    hint: "Le s du verbe ne vient jamais de ce qui est écrit après lui.",
    explanation: exp(
      "La terminaison d'un verbe est donnée par son SUJET, pas par les mots qui le suivent.",
      "Remonte du verbe vers le sujet et pose la question : qui ramasse ? Puis prends sa terminaison.",
      "Tu ramasses UN letchi, tu ramasses DES letchis : le verbe s'écrit pareil. Le s vient de « tu », et de rien d'autre. Avec « tu », le verbe se termine par un s à tous les temps — sauf tu peux, tu veux, où c'est un x.",
      "C'est parce qu'avec « tu », le verbe finit toujours par un s.",
    ),
    tags: ["ce2", "conjugaison", "present", "piege", "qcm"],
  },

  /* =========================================================
     CE2_CONJ_PRESENT_IRREGULIERS — les huit du BO
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_present_irreguliers_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Ces huit verbes-là ne suivent aucune règle : ils s'apprennent en entier.",
    tags: ["ce2", "conjugaison", "irreguliers", "template"],
    generate: () => {
      const v = randomChoice(LES_HUIT);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.present[p];
      return {
        text: `Choisis la bonne forme : « ${v.inf} » au présent avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.present], [...v.formes.futur], [...v.formes.imparfait]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `« ${v.inf} » est un verbe irrégulier : son radical change d'une personne à l'autre.`,
          "Récite-le en entier, sans essayer de le découper.",
          `${v.formes.present.map((f, i) => attacher(PRONOMS[i], f)).join(", ")}.`,
          `Avec « ${PRONOMS[p]} », on écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_present_irreguliers_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace le sujet par « il » ou « ils » avant de choisir.",
    tags: ["ce2", "conjugaison", "irreguliers", "template"],
    generate: () => {
      const v = randomChoice(LES_HUIT);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const forme = v.formes.present[p];
      return {
        text: `Complète au présent :\n\n« ${majuscule(sujet)} ___ ${complement}. » — verbe « ${v.inf} »`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.present], [...v.formes.imparfait], [v.inf]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe s'accorde avec son sujet, qu'il soit régulier ou non.",
          `Remplace « ${sujet} » par un pronom : c'est « ${PRONOMS[p]} ». Puis récite le verbe jusqu'à lui.`,
          `${attacher(PRONOMS[p], forme)} → ${majuscule(sujet)} ${forme} ${complement}.`,
          `On écrit « ${majuscule(sujet)} ${forme} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_present_irreguliers_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : « Vous ___ un gâteau. » — verbe « faire »",
    format: "qcm",
    choices: ["faites", "faisez", "faisiez", "faitez"],
    expected: ["faites"],
    comparator: "mcq_exact",
    hint: "Ce verbe-là ne suit pas la règle du « -ez ».",
    explanation: exp(
      "Avec « vous », les verbes se terminent presque toujours par « -ez » : vous chantez, vous prenez, vous voulez.",
      "Retiens les exceptions par cœur : il n'y en a que trois dans tout le français courant.",
      "vous faites, vous dites, vous êtes. Trois verbes, et pas un de plus. « vous faisez » n'existe pas — c'est la faute la plus fréquente du CE2, parce que l'enfant applique bien la règle. C'est la règle qui a un trou.",
      "On écrit « Vous faites un gâteau. »",
    ),
    tags: ["ce2", "conjugaison", "irreguliers", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_present_irreguliers_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Cherche celle qui a été fabriquée en suivant la règle — c'est justement celle qui est fausse.",
    tags: ["ce2", "conjugaison", "irreguliers", "template"],
    generate: () => {
      // ⚠️ On lit la table brute pour ses `fautes`, écrites à la main. Fabriquer
      // le piège à la règle — radical + « -ons » — donnerait « allons » pour
      // aller : une forme parfaitement correcte, présentée comme fausse.
      const t = randomChoice(LES_HUIT_TABLES);
      const faux = randomChoice(t.fautes);
      const vraies = shuffle([...new Set(t.present)]).slice(0, 3);
      return {
        text: `Ces quatre formes viennent du verbe « ${t.inf} » au présent. Une seule n'existe pas. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([faux, ...vraies]),
        expected: [faux],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `« ${t.inf} » est irrégulier : on ne peut pas fabriquer ses formes en collant une terminaison sur son début.`,
          "Récite le verbe en entier et compare. Ce qui ne sonne pas dans ta tête n'existe pas.",
          `${t.present.map((f, i) => attacher(PRONOMS[i], f)).join(", ")}. « ${faux} » a été fabriqué à la règle, et la règle ne s'applique pas ici.`,
          `La forme qui n'existe pas est « ${faux} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONJ_IMPARFAIT
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_imparfait_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait",
    difficulty: 2,
    theme: "neutral",
    hint: "-ais, -ais, -ait, -ions, -iez, -aient. Les mêmes pour tous les verbes.",
    tags: ["ce2", "conjugaison", "imparfait", "template"],
    generate: () => {
      const v = randomChoice(LES_ER_CLAVIER);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.imparfait[p];
      return {
        text: `Écris le verbe « ${v.inf} » à l'imparfait avec « ${PRONOMS[p]} ». (Écris seulement le verbe.)`,
        format: "short" as const,
        expected: [forme, attacher(PRONOMS[p], forme)],
        comparator: "exact_text" as const,
        explanation: exp(
          "L'imparfait raconte ce qui durait, ce qui se répétait : autrefois, quand j'étais petit.",
          "Prends le radical, ajoute -ais, -ais, -ait, -ions, -iez ou -aient. Ces six terminaisons ne changent jamais, quel que soit le verbe.",
          `${radicalEr(v.inf)} + ${forme.slice(radicalEr(v.inf).length)} = ${forme}.`,
          `On écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_imparfait_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait",
    difficulty: 3,
    theme: "neutral",
    hint: "Regarde la fin du verbe, pas le mot du début de la phrase.",
    tags: ["ce2", "conjugaison", "imparfait", "template"],
    generate: () => {
      const v = randomChoice(TOUS);
      const complement = randomChoice(v.complements);
      const temps = randomChoice(TEMPS_TOUS);
      const p = randomChoice([2, 5]);
      const sujet = sujetPour(v, temps, p);
      const marqueur = randomChoice(MARQUEURS[temps]);
      const phrase = `${majuscule(marqueur)}, ${sujet} ${v.formes[temps][p]} ${complement}.`;
      return {
        text: `À quel temps est cette phrase ?\n\n« ${phrase} »`,
        format: "qcm" as const,
        choices: ["le présent", "l'imparfait", "le futur", "le passé composé"],
        expected: [TEMPS_NOM[temps]],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le temps d'une phrase se lit sur le verbe : le présent pour maintenant, l'imparfait pour ce qui durait, le futur pour ce qui n'est pas encore arrivé, le passé composé pour ce qui est fini.",
          "Regarde la terminaison. -ait et -aient : imparfait. -ra et -ront : futur. Deux mots, dont être ou avoir : passé composé.",
          `« ${v.formes[temps][p]} » est ${TEMPS_PHRASE[temps]}.`,
          `Cette phrase est ${TEMPS_PHRASE[temps]}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_imparfait_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait",
    difficulty: 3,
    theme: "neutral",
    hint: "Ne change que le temps : le sujet, lui, ne bouge pas.",
    tags: ["ce2", "conjugaison", "imparfait", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const p = Math.floor(Math.random() * 6);
      const depart = attacher(PRONOMS[p], v.formes.present[p]);
      const arrivee = v.formes.imparfait[p];
      return {
        text: `« ${majuscule(depart)} ${complement}. »\n\nRécris le verbe à l'imparfait.`,
        format: "qcm" as const,
        choices: choix(arrivee, [...v.formes.imparfait], [...v.formes.present], [...v.formes.futur]),
        expected: [arrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Changer de temps, c'est changer la terminaison sans toucher au reste de la phrase.",
          "Garde la même personne, change seulement la fin du verbe.",
          `${depart} → ${attacher(PRONOMS[p], arrivee)}. La personne n'a pas bougé ; c'est le moment de l'action qui a reculé.`,
          `À l'imparfait, on écrit « ${attacher(PRONOMS[p], arrivee)} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONJ_IMPARFAIT_IRREGULIERS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_imparfait_irreguliers_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Bonne nouvelle : à l'imparfait, même les irréguliers prennent les terminaisons normales.",
    tags: ["ce2", "conjugaison", "imparfait", "irreguliers", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, CONJ_ETRE, CONJ_AVOIR]);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.imparfait[p];
      return {
        text: `Choisis la bonne forme : « ${v.inf} » à l'imparfait avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.imparfait], [...v.formes.present], [...v.formes.futur]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "À l'imparfait, TOUS les verbes prennent -ais, -ais, -ait, -ions, -iez, -aient. Même les irréguliers.",
          "Ce qui change chez eux, c'est seulement le radical. Prends celui du « nous » du présent, et colle la terminaison dessus.",
          `nous ${v.formes.present[3]} → ${attacher(PRONOMS[p], forme)}.`,
          `Avec « ${PRONOMS[p]} », on écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_imparfait_irreguliers_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Le radical de l'imparfait se trouve dans le « nous » du présent.",
    tags: ["ce2", "conjugaison", "imparfait", "irreguliers", "template"],
    generate: () => {
      const v = randomChoice(LES_HUIT);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const marqueur = randomChoice(MARQUEURS.imparfait);
      const forme = v.formes.imparfait[p];
      return {
        text: `Complète à l'imparfait :\n\n« ${majuscule(marqueur)}, ${sujet} ___ ${complement}. » — verbe « ${v.inf} »`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.imparfait], [...v.formes.present], [...v.formes.futur]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'imparfait raconte ce qui durait ou se répétait dans le passé.",
          `Prends le « nous » du présent — nous ${v.formes.present[3]} — enlève « -ons », et ajoute la terminaison de l'imparfait.`,
          `nous ${v.formes.present[3]} → ${attacher(PRONOMS[p], forme)}. C'est la même recette pour les huit verbes.`,
          `On écrit « ${majuscule(marqueur)}, ${sujet} ${forme} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_imparfait_irreguliers_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : « Autrefois, nous ___ le lagon depuis la case. » — verbe « voir » à l'imparfait",
    format: "qcm",
    choices: ["voyions", "voyons", "voions", "verrions"],
    expected: ["voyions"],
    comparator: "mcq_exact",
    hint: "Le radical est « voy- », et la terminaison de « nous » est « -ions ».",
    explanation: exp(
      "Le radical de l'imparfait vient du « nous » du présent : nous voyons → voy-.",
      "Colle la terminaison sur le radical sans rien enlever : voy + ions.",
      "voy + ions = voyions. Deux i qui se suivent, et c'est normal : le premier appartient au radical, le second à la terminaison. On ne l'entend pas, mais il s'écrit. Même chose pour « vous voyiez ».",
      "On écrit « Autrefois, nous voyions le lagon depuis la case. »",
    ),
    tags: ["ce2", "conjugaison", "imparfait", "irreguliers", "piege", "qcm"],
  },

  /* =========================================================
     CE2_CONJ_FUTUR
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_futur_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur",
    difficulty: 2,
    theme: "neutral",
    hint: "Au futur, on garde l'infinitif ENTIER et on ajoute la terminaison.",
    tags: ["ce2", "conjugaison", "futur", "template"],
    generate: () => {
      const v = randomChoice(LES_ER_CLAVIER);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.futur[p];
      return {
        text: `Écris le verbe « ${v.inf} » au futur avec « ${PRONOMS[p]} ». (Écris seulement le verbe.)`,
        format: "short" as const,
        expected: [forme, attacher(PRONOMS[p], forme)],
        comparator: "exact_text" as const,
        explanation: exp(
          "Le futur dit ce qui n'est pas encore arrivé : demain, bientôt, l'année prochaine.",
          "Chez les verbes du premier groupe, on ne coupe rien : on garde l'infinitif en entier et on ajoute -ai, -as, -a, -ons, -ez, -ont.",
          `${v.inf} + ${TERM_FUTUR[p]} = ${forme}. Le « r » de l'infinitif reste : c'est lui qu'on entend, et c'est lui qui annonce le futur.`,
          `On écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_futur_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur",
    difficulty: 3,
    theme: "neutral",
    text: "Au futur, « jouer » avec « il » donne « il jouera ». Pourquoi garde-t-on le « e » du milieu ?",
    format: "qcm",
    choices: [
      "Parce qu'au futur on garde l'infinitif entier : jouer + a",
      "Parce que c'est une exception à apprendre par cœur",
      "Parce que le « e » remplace le « r »",
      "C'est une faute : on écrit « il joura »",
    ],
    expected: ["Parce qu'au futur on garde l'infinitif entier : jouer + a"],
    comparator: "mcq_exact",
    hint: "Écris l'infinitif, puis colle la terminaison derrière sans rien enlever.",
    explanation: exp(
      "Au futur, la terminaison ne se colle pas sur le radical mais sur l'INFINITIF tout entier.",
      "Écris l'infinitif en entier, puis ajoute -ai, -as, -a, -ons, -ez, -ont derrière.",
      "jouer + a = jouera. On n'entend pas le « e », mais il est là parce que « jouer » est là. Pareil pour « il criera », « elle étudiera ».",
      "Parce qu'au futur on garde l'infinitif entier : jouer + a.",
    ),
    tags: ["ce2", "conjugaison", "futur", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_futur_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur",
    difficulty: 3,
    theme: "neutral",
    hint: "Change seulement le temps du verbe. Le sujet ne bouge pas.",
    tags: ["ce2", "conjugaison", "futur", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const marqueur = randomChoice(MARQUEURS.futur);
      const forme = v.formes.futur[p];
      return {
        text: `« ${majuscule(sujet)} ${v.formes.present[p]} ${complement}. »\n\nRécris cette phrase avec « ${marqueur} » : que devient le verbe ?`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.futur], [...v.formes.present], [...v.formes.imparfait]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          `« ${marqueur} » annonce ce qui n'est pas encore arrivé : la phrase passe au futur.`,
          "Garde la même personne et remplace la terminaison du présent par celle du futur.",
          `${v.formes.present[p]} → ${forme}. On entend le « r » : c'est la marque du futur.`,
          `On écrit « ${majuscule(marqueur)}, ${sujet} ${forme} ${complement}. »`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONJ_FUTUR_IRREGULIERS
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_futur_irreguliers_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Au futur, ces verbes-là changent complètement de début.",
    tags: ["ce2", "conjugaison", "futur", "irreguliers", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, CONJ_ETRE, CONJ_AVOIR]);
      const p = Math.floor(Math.random() * 6);
      const forme = v.formes.futur[p];
      return {
        text: `Choisis la bonne forme : « ${v.inf} » au futur avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.futur], [...v.formes.present], [`${v.inf}${TERM_FUTUR[p]}`]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Les terminaisons du futur sont toujours -ai, -as, -a, -ons, -ez, -ont. Ce sont les débuts qui changent.",
          "Retiens le début du futur pour chacun des huit verbes : il ne ressemble pas à l'infinitif.",
          `${v.formes.futur.map((f, i) => attacher(PRONOMS[i], f)).join(", ")}.`,
          `Avec « ${PRONOMS[p]} », on écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_futur_irreguliers_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Complète : « Demain, je ___ le pêcheur rentrer. » — verbe « voir » au futur",
    format: "qcm",
    choices: ["verrai", "voirai", "voierai", "voyerai"],
    expected: ["verrai"],
    comparator: "mcq_exact",
    hint: "Ce verbe ne garde rien de son infinitif au futur.",
    explanation: exp(
      "Au futur, les verbes du premier groupe gardent leur infinitif entier. Les irréguliers, eux, se refabriquent un début à eux.",
      "Apprends les huit débuts par cœur : je ferai, j'irai, je dirai, je viendrai, je pourrai, je verrai, je voudrai, je prendrai.",
      "voir → je verrai, avec deux r. « voirai » suit la règle des verbes en -er, et c'est justement pour ça que c'est faux : voir n'en est pas un.",
      "On écrit « Demain, je verrai le pêcheur rentrer. »",
    ),
    tags: ["ce2", "conjugaison", "futur", "irreguliers", "piege", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_futur_irreguliers_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace le sujet par « il » ou « ils », puis récite le futur du verbe.",
    tags: ["ce2", "conjugaison", "futur", "irreguliers", "template"],
    generate: () => {
      const v = randomChoice(LES_HUIT);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const marqueur = randomChoice(MARQUEURS.futur);
      const forme = v.formes.futur[p];
      return {
        text: `Complète au futur :\n\n« ${majuscule(marqueur)}, ${sujet} ___ ${complement}. » — verbe « ${v.inf} »`,
        format: "qcm" as const,
        choices: choix(forme, [...v.formes.futur], [...v.formes.present], [...v.formes.imparfait]),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le futur dit ce qui va arriver. Chez les huit verbes irréguliers, son début ne ressemble pas à l'infinitif.",
          `Récite le futur de « ${v.inf} » à toutes les personnes, puis arrête-toi à la bonne.`,
          `${v.formes.futur.map((f, i) => attacher(PRONOMS[i], f)).join(", ")}.`,
          `On écrit « ${majuscule(marqueur)}, ${sujet} ${forme} ${complement}. »`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONJ_PASSE_COMPOSE — la nouveauté du CE2
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_conj_passe_compose_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_passe_compose",
    difficulty: 2,
    theme: "neutral",
    text: "Le passé composé s'écrit en combien de mots ?",
    format: "qcm",
    choices: [
      "Deux : un petit verbe, puis le vrai verbe",
      "Un seul, comme le présent",
      "Trois",
      "Cela dépend du verbe",
    ],
    expected: ["Deux : un petit verbe, puis le vrai verbe"],
    comparator: "mcq_exact",
    hint: "Il porte bien son nom : il est composé.",
    explanation: exp(
      "Le passé composé raconte une action finie. Il s'écrit en deux morceaux : un auxiliaire (être ou avoir) conjugué au présent, puis le participe passé du verbe.",
      "Cherche d'abord le petit verbe être ou avoir : c'est lui qui porte la personne. Le second mot, lui, ne bouge presque pas.",
      "Hier, j'ai ramassé des letchis. « ai » est l'auxiliaire avoir au présent ; « ramassé » est le participe passé. Deux mots pour un seul verbe — c'est de là que vient son nom.",
      "Deux mots : un petit verbe, puis le vrai verbe.",
    ),
    tags: ["ce2", "conjugaison", "passe-compose", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_passe_compose_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_passe_compose",
    difficulty: 2,
    theme: "neutral",
    hint: "C'est l'auxiliaire qui s'accorde avec le sujet, pas le second mot.",
    tags: ["ce2", "conjugaison", "passe-compose", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const p = Math.floor(Math.random() * 6);
      const auxForme = AVOIR.present[p];
      const marqueur = randomChoice(MARQUEURS.passe_compose);
      return {
        text: `Complète au passé composé :\n\n« ${majuscule(marqueur)}, ${trou(p, auxForme)} ${v.participe} ${complement}. »`,
        format: "qcm" as const,
        choices: choix(auxForme, [...AVOIR.present], [...ETRE.present], [...AVOIR.imparfait]),
        expected: [auxForme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Au passé composé, c'est l'auxiliaire qui porte la personne. Le participe passé, lui, reste tel quel.",
          `Conjugue l'auxiliaire au présent avec la personne demandée : ici, « ${PRONOMS[p]} ».`,
          `${attacher(PRONOMS[p], auxForme)} ${v.participe}. Le verbe « ${v.inf} » se conjugue avec avoir.`,
          `On écrit « ${majuscule(marqueur)}, ${attacher(PRONOMS[p], auxForme)} ${v.participe} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_passe_compose_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    hint: "Presque tous se conjuguent avec avoir. Aller et venir font exception.",
    tags: ["ce2", "conjugaison", "passe-compose", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, ...LES_ER]);
      const bon = v.auxiliaire === "être" ? "être" : "avoir";
      return {
        text: `Au passé composé, avec quel auxiliaire se conjugue le verbe « ${v.inf} » ?`,
        format: "qcm" as const,
        choices: ["avoir", "être"],
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'auxiliaire, c'est le petit verbe qui aide : être ou avoir, conjugué au présent.",
          "Essaie les deux à voix haute. Un seul se dit.",
          v.auxiliaire === "être"
            ? `« il est ${v.participe} » se dit ; « il a ${v.participe} » ne se dit pas. Les verbes qui racontent un déplacement, comme aller et venir, prennent être — et leur participe s'accorde alors avec le sujet : il est ${v.participe}, ils sont ${v.participe}s.`
            : `« il a ${v.participe} » se dit ; « il est ${v.participe} » ne se dit pas. La grande majorité des verbes prennent avoir.`,
          `« ${v.inf} » se conjugue avec ${bon}.`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_passe_compose_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux mots : d'abord l'auxiliaire au présent, ensuite le participe passé.",
    tags: ["ce2", "conjugaison", "passe-compose", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, CONJ_ETRE, CONJ_AVOIR]);
      const p = personnePour(v, "passe_compose");
      const forme = v.formes.passe_compose[p];
      const rate = [
        `${AVOIR.present[p]} ${v.inf}`,
        `${ETRE.present[p]} ${v.participe}`,
        `${AVOIR.present[p]} ${v.participe}`,
        `${AVOIR.imparfait[p]} ${v.participe}`,
        `${ETRE.imparfait[p]} ${v.participe}`,
      ];
      return {
        text: `Choisis la bonne forme : « ${v.inf} » au passé composé avec « ${PRONOMS[p]} ».`,
        format: "qcm" as const,
        choices: choix(forme, rate),
        expected: [forme],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le passé composé se fabrique en deux temps : l'auxiliaire au présent, puis le participe passé.",
          `Choisis d'abord l'auxiliaire — « ${v.inf} » prend ${v.auxiliaire} — puis conjugue-le avec la personne demandée.`,
          `${attacher(PRONOMS[p], forme)}. Le participe passé de « ${v.inf} » est « ${v.participe} », et il ne change pas de forme d'une personne à l'autre${v.auxiliaire === "être" ? " — sauf avec être, où il suit le sujet" : ""}.`,
          `On écrit « ${attacher(PRONOMS[p], forme)} ».`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONJ_PARTICIPE_INFINITIF — mangé / manger
  ========================================================= */
  {
    kind: "fixed",
    id: "ce2_conj_participe_infinitif_fixed_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_participe_infinitif",
    difficulty: 3,
    theme: "neutral",
    text: "« Je vais manger » ou « je vais mangé » ? Quel truc permet de trancher ?",
    format: "qcm",
    choices: [
      "Remplacer par « prendre » : je vais prendre se dit, je vais pris ne se dit pas",
      "Écouter la fin du mot : on entend la différence",
      "Regarder si la phrase parle du passé",
      "Compter les syllabes du verbe",
    ],
    expected: [
      "Remplacer par « prendre » : je vais prendre se dit, je vais pris ne se dit pas",
    ],
    comparator: "mcq_exact",
    hint: "Il faut un verbe où l'infinitif et le participe ne se disent PAS pareil.",
    explanation: exp(
      "Chez les verbes du premier groupe, l'infinitif (manger) et le participe passé (mangé) se disent exactement pareil. Seule l'orthographe les sépare.",
      "Remplace le verbe par « prendre », qui a deux formes bien différentes : prendre et pris. Celle qui se dit t'indique celle qu'il faut écrire.",
      "Je vais PRENDRE → alors c'est je vais mangER. J'ai PRIS → alors c'est j'ai mangÉ. Ton oreille ne sert à rien sur « manger », elle sert sur « prendre ».",
      "Le truc, c'est de remplacer par « prendre ».",
    ),
    tags: ["ce2", "conjugaison", "participe", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_participe_infinitif_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_participe_infinitif",
    difficulty: 3,
    theme: "neutral",
    hint: "Remplace par « prendre » : si « prendre » se dit, écris « -er ».",
    tags: ["ce2", "conjugaison", "participe", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const p = randomChoice([2, 5]);
      const sujet = randomChoice(p === 5 ? SUJETS_PL : SUJETS_SG);
      const versInfinitif = Math.random() < 0.5;
      const debut = versInfinitif
        ? `${majuscule(sujet)} ${p === 5 ? "vont" : "va"}`
        : `${majuscule(sujet)} ${AVOIR.present[p]}`;
      const bon = versInfinitif ? v.inf : v.participe;
      const test = versInfinitif ? "prendre" : "pris";
      return {
        text: `Complète : « ${debut} ___ ${complement}. » — verbe « ${v.inf} »`,
        format: "qcm" as const,
        choices: [v.inf, v.participe].sort(() => Math.random() - 0.5),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'infinitif se termine par « -er », le participe passé par « -é ». Les deux se disent pareil.",
          "Remplace le verbe par « prendre » et écoute : prendre, ou pris ?",
          `${debut} ${test} ${complement} — c'est « ${test} » qui se dit, donc on écrit « ${bon} ».`,
          `On écrit « ${debut} ${bon} ${complement}. »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_participe_infinitif_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_participe_infinitif",
    difficulty: 3,
    theme: "neutral",
    hint: "Après « pour », « sans », « de », « il faut », le verbe reste à l'infinitif.",
    tags: ["ce2", "conjugaison", "participe", "template"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const mot = randomChoice(["pour", "sans", "il faut", "avant de"]);
      return {
        text: `Complète : « ${majuscule(mot)} ___ ${complement}… » — verbe « ${v.inf} »`,
        format: "qcm" as const,
        choices: [v.inf, v.participe].sort(() => Math.random() - 0.5),
        expected: [v.inf],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Après un petit mot comme « pour », « sans », « avant de » ou « il faut », le verbe ne se conjugue pas : il reste à l'infinitif.",
          "Remplace par « prendre » : si « prendre » se dit, c'est l'infinitif.",
          `${majuscule(mot)} PRENDRE… donc ${majuscule(mot)} ${v.inf}. « ${v.participe} » ne pourrait pas venir là.`,
          `On écrit « ${majuscule(mot)} ${v.inf} ${complement}… »`,
        ),
      };
    },
  },

  /* =========================================================
     CE2_CONJ_DEFI — deux choses à la fois
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_defi_tpl_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Deux choses changent en même temps : la personne ET le temps.",
    tags: ["ce2", "conjugaison", "defi", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, ...LES_ER]);
      const complement = randomChoice(v.complements);
      const tempsDepart = randomChoice(TEMPS_SIMPLES);
      const tempsArrivee = randomChoice(TEMPS_SIMPLES.filter((t) => t !== tempsDepart));
      const pDepart = Math.floor(Math.random() * 6);
      const pArrivee = Math.floor(Math.random() * 6);
      const depart = attacher(PRONOMS[pDepart], v.formes[tempsDepart][pDepart]);
      const arrivee = v.formes[tempsArrivee][pArrivee];
      return {
        text: `« ${majuscule(depart)} ${complement}. »\n\nRécris le verbe ${TEMPS_PHRASE[tempsArrivee]} avec « ${PRONOMS[pArrivee]} ».`,
        format: "qcm" as const,
        choices: choix(arrivee, toutesLesFormes(v)),
        expected: [arrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Une forme conjuguée dit deux choses à la fois : QUI fait l'action, et QUAND.",
          "Fais-le en deux temps. D'abord le temps : quelle terminaison ? Ensuite la personne : laquelle des six ?",
          `${depart} → ${attacher(PRONOMS[pArrivee], arrivee)}. On a changé de moment ET de personne.`,
          `On écrit « ${attacher(PRONOMS[pArrivee], arrivee)} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_defi_tpl_2",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Le mot du début annonce un moment. Le verbe doit être d'accord avec lui.",
    tags: ["ce2", "conjugaison", "defi", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, ...LES_ER]);
      const complement = randomChoice(v.complements);
      const temps = randomChoice(TEMPS_TOUS);
      // Les quatre temps sont proposés : la personne doit convenir au passé
      // composé aussi, sinon un distracteur écrirait « je suis allé » sans
      // qu'on sache si l'élève est un garçon ou une fille.
      const p = personnePour(v, "passe_compose");
      const marqueur = randomChoice(MARQUEURS[temps]);
      const bon = `${majuscule(marqueur)}, ${attacher(PRONOMS[p], v.formes[temps][p])} ${complement}.`;
      const autres = TEMPS_TOUS.filter((t) => t !== temps).map(
        (t) => `${majuscule(marqueur)}, ${attacher(PRONOMS[p], v.formes[t][p])} ${complement}.`,
      );
      return {
        text: `Une seule de ces phrases est correcte. Laquelle ?`,
        format: "qcm" as const,
        choices: shuffle([bon, ...autres]),
        expected: [bon],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le mot qui ouvre la phrase annonce un moment. Le verbe doit raconter ce moment-là, sinon la phrase se contredit.",
          `Repère le marqueur — ici « ${marqueur} » — puis vérifie que le verbe est bien au bon temps.`,
          `« ${marqueur} » demande ${TEMPS_NOM[temps]}, et « ${v.formes[temps][p]} » est bien ${TEMPS_PHRASE[temps]}.`,
          `La phrase correcte est « ${bon} »`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_defi_tpl_3",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_defi",
    difficulty: 3,
    theme: "neutral",
    hint: "Change le sujet, et le verbe doit suivre — même si tu n'entends rien.",
    tags: ["ce2", "conjugaison", "defi", "template"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, ...LES_ER]);
      const complement = randomChoice(v.complements);
      const temps = randomChoice(TEMPS_SIMPLES);
      const versPluriel = Math.random() < 0.5;
      const sujetDepart = randomChoice(versPluriel ? SUJETS_SG : SUJETS_PL);
      const sujetArrivee = randomChoice(versPluriel ? SUJETS_PL : SUJETS_SG);
      const pDepart = versPluriel ? 2 : 5;
      const pArrivee = versPluriel ? 5 : 2;
      const depart = `${majuscule(sujetDepart)} ${v.formes[temps][pDepart]} ${complement}.`;
      const arrivee = `${majuscule(sujetArrivee)} ${v.formes[temps][pArrivee]} ${complement}.`;
      // ⚠️ Réserve large : au présent, « il chante » et « je chante » s'écrivent
      // pareil. Trois distracteurs pris aux personnes voisines s'effondreraient
      // à deux, et l'élève aurait une chance sur deux au hasard.
      const faux = TEMPS_SIMPLES.flatMap((t) =>
        v.formes[t].map((f) => `${majuscule(sujetArrivee)} ${f} ${complement}.`),
      );
      return {
        text: `« ${depart} »\n\nRécris cette phrase avec « ${sujetArrivee} ».`,
        format: "qcm" as const,
        choices: choix(arrivee, faux),
        expected: [arrivee],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le verbe suit son sujet. Quand le sujet passe du singulier au pluriel, le verbe change avec lui.",
          `Remplace le sujet par un pronom : « ${sujetArrivee} », c'est « ${PRONOMS[pArrivee]} ». Puis prends la forme du verbe qui va avec.`,
          `${v.formes[temps][pDepart]} → ${v.formes[temps][pArrivee]}.${temps === "present" && !v.irregulier ? " Ta bouche dit la même chose : c'est le sujet qui prévient." : ""}`,
          `On écrit « ${arrivee} »`,
        ),
      };
    },
  },

  /* =========================================================
     LES QCM DE MÉTHODE — un par micro-compétence

     CE QU'ILS REMPLACENT (11/08/2026). Ces douze items étaient des questions
     OUVERTES corrigées par le comparateur « contains-keyword », qui valide dès
     qu'UN mot de `expected` apparait EN SOUS-CHAÎNE. Le mot-clé « s » validait
     « je sais pas ». Trois choses ne vont pas ensemble à neuf ans : un clavier
     qu'on cherche lettre par lettre, un comparateur qui lit des lettres au lieu
     du sens, et deux échecs opposés — féliciter l'enfant qui n'a rien écrit, ou
     refuser une explication juste dite autrement.

     L'INTENTION EST GARDÉE : rendre la méthode explicite, qui est le meilleur
     moment de la notion. On la fait CHOISIR au lieu de la faire taper. La bonne
     réponse était déjà écrite — c'est la ligne « Méthode : » de l'explication.
     Ce qui s'écrit ici, ce sont les TROIS FAUSSES méthodes, dans cet ordre de
     valeur : l'erreur que l'enfant fait vraiment (elle nomme le piège), puis la
     méthode d'une micro-compétence voisine, puis au plus une seule pioche au
     hasard — elle n'apprend rien.

     ⚠️ UNE SEULE méthode juste par question. Deux méthodes correctes pour le
     même énoncé arrivent vite, et l'élève a raison de se plaindre.
     ⚠️ La position ne se gère pas ici : `questionPairBuilder.ts` mélange les
     choix à l'envoi. On écrit la bonne réponse en premier, c'est plus lisible.
     ⚠️ Le CP n'a aucune question ouverte, le CE1 en avait quatorze : le CE2
     était seul de son espèce. `verifier-banque.mjs` réclamera désormais « SANS
     QUESTION OUVERTE » sur ces micros — c'est le résultat voulu.
  ========================================================= */
  {
    kind: "template",
    id: "ce2_conj_infinitif_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_infinitif",
    difficulty: 3,
    theme: "neutral",
    hint: "Pose « il faut… » devant le verbe, et écoute ce qui se dit derrière.",
    tags: ["ce2", "conjugaison", "infinitif", "methode"],
    generate: () => {
      const v = randomChoice(TOUS);
      const temps = randomChoice(TEMPS_SIMPLES);
      const p = Math.floor(Math.random() * 6);
      const bonne = `Je pose « il faut… » devant le verbe : il faut ${v.inf}.`;
      return {
        text: `« ${majuscule(attacher(PRONOMS[p], v.formes[temps][p]))} »\n\nComment fais-tu pour retrouver l'infinitif de ce verbe ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : l'enfant recopie la forme qu'il a sous les yeux.
          "Je recopie le verbe tel qu'il est écrit dans la phrase.",
          // La méthode voisine : « prendre » sert à choisir entre -er et -é,
          // pas à remonter à l'infinitif d'un verbe déjà conjugué.
          "Je remplace le verbe par « prendre » et j'écoute ce qui se dit.",
          "Je remonte au sujet et je regarde s'il est au pluriel.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "L'infinitif est la forme de base du verbe, celle du dictionnaire.",
          "Pose « il faut… » devant le verbe : ce qui se dit derrière, c'est l'infinitif.",
          `il faut ${v.inf} → l'infinitif est « ${v.inf} ».`,
          `L'infinitif est « ${v.inf} ».`,
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_radical_terminaison_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_radical_terminaison",
    difficulty: 3,
    theme: "neutral",
    hint: "Écris les six personnes l'une sous l'autre, et regarde où la colonne se met à bouger.",
    tags: ["ce2", "conjugaison", "radical", "methode"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const rad = radicalEr(v.inf);
      const bonne = `J'écris les six personnes l'une sous l'autre et je garde le morceau qui ne bouge jamais : « ${rad} ».`;
      return {
        text: `${v.formes.present.map((f, i) => attacher(PRONOMS[i], f)).join(", ")}.\n\nComment fais-tu pour trouver le radical de ce verbe ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // Le piège de la notion, retourné : c'est la terminaison qui bouge.
          "Je regarde la fin du verbe : c'est elle qui reste toujours pareille.",
          `Je prends la forme avec « je » : « ${attacher(PRONOMS[0], v.formes.present[0])} », donc le radical est « ${v.formes.present[0]} ».`,
          "Je remplace le sujet par « nous » et je garde le verbe en entier.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Un verbe conjugué a deux morceaux : le radical, qui porte le sens, et la terminaison, qui dit qui fait l'action et quand.",
          "Écris les six personnes les unes sous les autres et regarde où la colonne se met à changer.",
          `${rad} ne bouge pas d'une ligne à l'autre. C'est le radical de « ${v.inf} ».`,
          `La partie qui ne change jamais est le radical : « ${rad} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_present_etre_avoir_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_etre_avoir",
    difficulty: 3,
    theme: "neutral",
    text: "« Ils ont faim. » et « Ils sont contents. »\n\nComment fais-tu pour savoir lequel des deux est le verbe avoir ?",
    format: "qcm",
    choices: [
      "Je regarde le sens : la faim, on la POSSÈDE, donc « ont » est le verbe avoir.",
      // L'erreur réelle : justement, « ont » et « sont » riment.
      "J'écoute la fin des deux verbes : « ont » et « sont » ne se ressemblent pas.",
      "Je regarde le sujet : quand il est au pluriel, c'est toujours le verbe être.",
      "Je compte les lettres : le verbe avoir est toujours le plus court des deux.",
    ],
    expected: [
      "Je regarde le sens : la faim, on la POSSÈDE, donc « ont » est le verbe avoir.",
    ],
    comparator: "mcq_exact",
    hint: "Demande-toi si la phrase dit ce qu'on POSSÈDE, ou ce qu'on EST.",
    explanation: exp(
      "Être et avoir ont des formes qui riment : ont / sont, es / est, as / a.",
      "Regarde le sens : ce qu'on possède, c'est avoir ; ce qu'on est, c'est être.",
      "La faim, on l'a. Contents, on l'est. C'est le sens qui tranche, pas le son.",
      "« ont » est le verbe avoir, parce que la faim, on la possède.",
    ),
    tags: ["ce2", "conjugaison", "etre-avoir", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_present_er_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_er",
    difficulty: 3,
    theme: "neutral",
    hint: "Ce n'est pas ton oreille qui décide. C'est quoi, alors ?",
    tags: ["ce2", "conjugaison", "present", "methode"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const complement = randomChoice(v.complements);
      const sujet = randomChoice(SUJETS_PL);
      const bonne = `Parce que le sujet est au pluriel : « ${sujet} », c'est plusieurs.`;
      return {
        text: `« ${majuscule(sujet)} ${v.formes.present[5]} ${complement}. »\n\nOn n'entend pas le « -ent » à la fin du verbe. Pourquoi faut-il quand même l'écrire ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          "Parce que tous les verbes en -er se terminent par « -ent ».",
          // L'erreur réelle : l'enfant croit qu'il entend, alors qu'il devine.
          "Parce qu'on entend un petit « e » si on lit très lentement.",
          "Parce que la phrase se passe au présent.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "La marque du pluriel des verbes est « -nt ». Elle s'écrit et ne s'entend pas.",
          "Ne compte pas sur ton oreille : remonte au sujet et compte combien ils sont.",
          `« ${sujet} », c'est plusieurs. Ta bouche dit la même chose qu'au singulier ; c'est le sujet qui prévient.`,
          "Il faut l'écrire parce que le sujet est au pluriel, même si on ne l'entend pas.",
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_present_irreguliers_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_present_irreguliers",
    difficulty: 3,
    theme: "neutral",
    text: "Beaucoup d'élèves écrivent « vous faisez ». Pourquoi cette erreur est-elle si facile à faire ?",
    format: "qcm",
    choices: [
      "Parce qu'ils ont bien appliqué la règle du « -ez » — mais faire, dire et être sont les trois exceptions.",
      "Parce qu'ils ont oublié d'apprendre le verbe faire.",
      "Parce qu'ils ont confondu « vous » et « nous ».",
      "Parce qu'ils ont écrit ce qu'ils entendaient.",
    ],
    expected: [
      "Parce qu'ils ont bien appliqué la règle du « -ez » — mais faire, dire et être sont les trois exceptions.",
    ],
    comparator: "mcq_exact",
    hint: "L'élève qui écrit « faisez » a appliqué une règle. Laquelle ?",
    explanation: exp(
      "Avec « vous », les verbes se terminent presque toujours par « -ez ». Trois verbes font exception.",
      "Retiens les trois : vous faites, vous dites, vous êtes.",
      "L'enfant qui écrit « faisez » n'a rien oublié : il a bien appliqué la règle du -ez. C'est la règle qui a un trou, et il n'y a que trois trous.",
      "C'est « vous faites » : faire est une des trois exceptions au « -ez ».",
    ),
    tags: ["ce2", "conjugaison", "irreguliers", "piege", "qcm"],
  },
  {
    kind: "fixed",
    id: "ce2_conj_imparfait_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait",
    difficulty: 3,
    theme: "neutral",
    text: "À quoi sert l'imparfait ?",
    format: "qcm",
    choices: [
      "À raconter ce qui durait ou se répétait dans le passé : quand j'étais petit, je jouais dans la cour tous les matins.",
      // La voisine : une action du passé arrivée UNE fois, c'est le passé composé.
      "À raconter une action du passé arrivée une seule fois : hier, j'ai ramassé un letchi.",
      "À raconter ce qui se passera demain.",
      "À dire ce qu'on fait en ce moment, pendant qu'on parle.",
    ],
    expected: [
      "À raconter ce qui durait ou se répétait dans le passé : quand j'étais petit, je jouais dans la cour tous les matins.",
    ],
    comparator: "mcq_exact",
    hint: "Pense à ce qui se répétait, ou qui durait longtemps.",
    explanation: exp(
      "L'imparfait raconte le passé qui durait ou qui se répétait : ce qu'on faisait souvent, ce qui était là autour.",
      "Ses terminaisons sont toujours les mêmes : -ais, -ais, -ait, -ions, -iez, -aient.",
      "Quand j'étais petit, je jouais dans la cour tous les matins. L'action ne s'est pas passée une fois : elle revenait.",
      "L'imparfait sert à raconter ce qui durait ou se répétait dans le passé.",
    ),
    tags: ["ce2", "conjugaison", "imparfait", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_imparfait_irreguliers_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_imparfait_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Il y a une personne du présent qui te donne le radical de tout l'imparfait.",
    tags: ["ce2", "conjugaison", "imparfait", "irreguliers", "methode"],
    generate: () => {
      const v = randomChoice(LES_HUIT);
      const bonne = `Je dis « nous » au présent — nous ${v.formes.present[3]} — et j'enlève le « -ons ».`;
      return {
        text: `Tu dois écrire « ${v.inf} » à l'imparfait, mais tu ne t'en souviens plus.\n\nComment fais-tu pour retrouver son radical ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // La voisine : garder l'infinitif entier, c'est le geste du FUTUR.
          "Je prends l'infinitif en entier et je colle la terminaison derrière.",
          `Je prends le « je » du présent — ${attacher(PRONOMS[0], v.formes.present[0])} — et j'enlève la dernière lettre.`,
          "Je choisis la forme qui sonne le mieux à mon oreille.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le radical de l'imparfait se trouve toujours dans le « nous » du présent, pour tous les verbes.",
          "Dis « nous… » au présent, enlève le « -ons », et ajoute la terminaison de l'imparfait.",
          `nous ${v.formes.present[3]} → ${attacher(PRONOMS[2], v.formes.imparfait[2])}.`,
          `Le radical se prend sur « nous ${v.formes.present[3]} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_futur_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur",
    difficulty: 3,
    theme: "neutral",
    text: "« Demain, il jouera dans la cour. »\n\nOn n'entend pas le « e » de « jouera ». Pourquoi faut-il l'écrire ?",
    format: "qcm",
    choices: [
      "Parce qu'au futur la terminaison se colle sur l'infinitif ENTIER : jouer + a = jouera.",
      // L'erreur réelle : l'enfant justifie une lettre par le mot du début.
      "Parce que la phrase commence par « Demain ».",
      "Parce que le sujet « il » est au singulier.",
      "Parce que tous les verbes prennent un « e » avant leur terminaison.",
    ],
    expected: [
      "Parce qu'au futur la terminaison se colle sur l'infinitif ENTIER : jouer + a = jouera.",
    ],
    comparator: "mcq_exact",
    hint: "Écris l'infinitif du verbe, puis colle la terminaison derrière sans rien enlever.",
    explanation: exp(
      "Au futur, la terminaison se colle sur l'INFINITIF tout entier, pas sur le radical.",
      "Écris l'infinitif en entier, puis ajoute -ai, -as, -a, -ons, -ez ou -ont.",
      "jouer + a = jouera. Le « e » est là parce que « jouer » est là, en entier.",
      "Parce qu'au futur on garde l'infinitif entier : jouer + a.",
    ),
    tags: ["ce2", "conjugaison", "futur", "methode", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_futur_irreguliers_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_futur_irreguliers",
    difficulty: 3,
    theme: "neutral",
    hint: "Compare le début du futur et l'infinitif : se ressemblent-ils ?",
    tags: ["ce2", "conjugaison", "futur", "irreguliers", "methode"],
    generate: () => {
      const v = randomChoice(LES_HUIT);
      const bonne = `Le début du verbe s'est refabriqué : « ${v.formes.futur[0]} ». Il n'y a rien à calculer, il s'apprend par cœur.`;
      return {
        text: `Infinitif : « ${v.inf} ». Au futur : « ${attacher(PRONOMS[0], v.formes.futur[0])} ».\n\nQu'est-ce qui a changé ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // La voisine : vraie pour les verbes en -er, fausse pour ces huit-là.
          "Rien de spécial : au futur, on garde toujours l'infinitif en entier.",
          "C'est la terminaison qui a changé : au futur, elle est différente pour chaque verbe.",
          "Le verbe a changé de groupe en passant au futur.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chez les verbes du premier groupe, le futur garde l'infinitif entier. Chez les huit irréguliers, le début se refabrique.",
          "Il n'y a rien à calculer : ces huit débuts s'apprennent par cœur.",
          `${v.inf} → ${v.formes.futur[0]}… Les terminaisons, elles, ne changent pas : -ai, -as, -a, -ons, -ez, -ont.`,
          `C'est le début du verbe qui change, et il faut le retenir : « ${v.formes.futur[0]} ».`,
        ),
      };
    },
  },
  {
    kind: "fixed",
    id: "ce2_conj_passe_compose_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_passe_compose",
    difficulty: 3,
    theme: "neutral",
    text: "Pourquoi le passé composé s'appelle-t-il « composé » ?",
    format: "qcm",
    choices: [
      "Parce qu'il s'écrit en deux mots : d'abord être ou avoir, puis le participe passé.",
      "Parce qu'il mélange deux temps : le présent et l'imparfait.",
      // L'erreur réelle : l'enfant compte les lettres au lieu des mots.
      "Parce que sa terminaison est plus longue que celle des autres temps.",
      "Parce qu'il sert à composer des poésies et des chansons.",
    ],
    expected: [
      "Parce qu'il s'écrit en deux mots : d'abord être ou avoir, puis le participe passé.",
    ],
    comparator: "mcq_exact",
    hint: "Compte les mots qu'il faut pour l'écrire.",
    explanation: exp(
      "Composé veut dire « fait de plusieurs morceaux ».",
      "Cherche les deux mots : d'abord être ou avoir au présent, puis le participe passé.",
      "Hier, j'ai ramassé des letchis. « ai » porte la personne, « ramassé » porte le sens. Deux mots pour un seul verbe.",
      "Parce qu'il s'écrit en deux mots : un auxiliaire, puis le participe passé.",
    ),
    tags: ["ce2", "conjugaison", "passe-compose", "definition", "qcm"],
  },
  {
    kind: "template",
    id: "ce2_conj_participe_infinitif_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_participe_infinitif",
    difficulty: 3,
    theme: "neutral",
    hint: "Il te faut un verbe dont les deux formes ne se disent PAS pareil.",
    tags: ["ce2", "conjugaison", "participe", "methode"],
    generate: () => {
      const v = randomChoice(LES_ER);
      const bonne = `Je remplace par « prendre » : si « prendre » se dit, j'écris « ${v.inf} » ; si c'est « pris », j'écris « ${v.participe} ».`;
      return {
        text: `« ${v.inf} » et « ${v.participe} » se disent exactement pareil.\n\nQu'est-ce qui te permet de trancher ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          // L'erreur réelle : l'oreille, qui ne sert justement à rien ici.
          "Je dis le mot à voix haute : si j'entends « é », j'écris « é ».",
          "Je regarde s'il y a « je » ou « il » devant le verbe.",
          `J'écris toujours « ${v.inf} » : c'est l'écriture la plus fréquente.`,
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Chez les verbes du premier groupe, l'infinitif et le participe passé se prononcent de la même façon. Seule l'orthographe les sépare.",
          "Remplace le verbe par « prendre », qui a deux formes bien différentes, et écoute laquelle se dit.",
          `Je vais PRENDRE → je vais ${v.inf}. J'ai PRIS → j'ai ${v.participe}. Ton oreille ne sert à rien sur « ${v.inf} », elle sert sur « prendre ».`,
          "Le truc, c'est de remplacer par « prendre » : prendre, ou pris ?",
        ),
      };
    },
  },
  {
    kind: "template",
    id: "ce2_conj_defi_meth_1",
    niveau: "ce2",
    matiere: "francais",
    notionId: "conjugaison",
    microId: "ce2_conj_defi",
    difficulty: 3,
    theme: "neutral",
    // Le défi est un cran plus dur : on retire le marqueur de temps, celui sur
    // lequel les trois autres gabarits de ce micro s'appuient. Il ne reste plus
    // qu'un endroit où regarder, et les trois pièges sont les trois endroits
    // où l'enfant regarde d'habitude.
    hint: "Il n'y a plus de « hier » ni de « demain » : il ne te reste qu'un endroit où regarder.",
    tags: ["ce2", "conjugaison", "defi", "methode"],
    generate: () => {
      const v = randomChoice([...LES_HUIT, ...LES_ER]);
      const complement = randomChoice(v.complements);
      const temps = randomChoice(TEMPS_SIMPLES);
      const p = randomChoice([2, 5]);
      const sujet = sujetPour(v, temps, p);
      const bonne = `Je regarde la terminaison du verbe : « ${v.formes[temps][p]} » est ${TEMPS_PHRASE[temps]}.`;
      return {
        text: `« ${majuscule(sujet)} ${v.formes[temps][p]} ${complement}. »\n\nAucun mot comme « hier » ou « demain » ne t'aide.\nComment fais-tu pour trouver le temps de cette phrase ?`,
        format: "qcm" as const,
        choices: [
          bonne,
          "Je regarde le premier mot de la phrase : c'est lui qui annonce le moment.",
          "Je regarde le début du verbe : il ne change pas, donc la phrase est au présent.",
          "Je regarde le sujet : quand il est au pluriel, l'action est déjà passée.",
        ],
        expected: [bonne],
        comparator: "mcq_exact" as const,
        explanation: exp(
          "Le temps d'une phrase se lit sur la fin du verbe, pas sur les autres mots.",
          "Regarde la terminaison : -ait et -aient pour l'imparfait, -ra et -ront pour le futur, deux mots pour le passé composé.",
          `« ${v.formes[temps][p]} » est ${TEMPS_PHRASE[temps]}.`,
          `Cette phrase est ${TEMPS_PHRASE[temps]}.`,
        ),
      };
    },
  },
];
