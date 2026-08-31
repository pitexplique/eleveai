// ─── Fiche de cours : enrichir son vocabulaire (5e) ───────────────────────────
// LA PREMIÈRE FICHE DE VOCABULAIRE DE LA 5e — et la première des vingt qui
// manquaient à cette classe.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ». ⛔ CE
// N'EST PAS LE PROGRAMME DE LA 4e (arrêté de 2015, consolidé en 2020) : la 5e est
// la seule classe du collège passée au texte de 2026. Ne rien transposer d'une
// classe à l'autre.
//
// L'objectif « Enrichir son vocabulaire » porte trois attendus, et les voici
// tous les trois : inférer par le contexte, se servir d'un dictionnaire de
// langue « en version papier ET numérique », réemployer un lexique précis.
//
// ⭐ CE QUE CETTE FICHE AJOUTE AUX DÉCOUVERTES DE LA 4e : L'ARTICLE DE
// DICTIONNAIRE SE DESSINE AVEC LE CANVAS `phrase`. Un article n'est pas une
// phrase — mais c'est une SUITE DE MORCEAUX ÉTIQUETÉS, et c'est exactement ce
// que le canvas sait montrer : un mot par étiquette, un crochet et un nom sous
// chacun. Le mot, sa classe, son sens, son exemple. Rien de neuf n'a eu à être
// écrit (CATALOGUE.md : « avant d'en écrire un autre, vérifier que celui-ci ne
// suffit pas »).
//
// ⭐ Et deux canvas de maths repris de `francais-4e-vocabulaire-sens.tsx`, pour
// une raison qui vaut la peine d'être dite à l'élève : choisir un verbe de
// parole demande DEUX questions différentes, et une seule d'entre elles est une
// question de degré.
//   • `number_line` — le VOLUME : murmurer, parler, crier. C'est un ordre, donc
//     une échelle. ⚠️ `showValues: false` : il n'y a pas de nombres sur une
//     échelle de mots.
//   • `schema_barre` — la MANIÈRE : avouer, commander, protester ne sont pas
//     « plus fort » que dire, ce sont des SORTES de dire. C'est une inclusion.
//
// Alignée sur les tables CONTEXTE et VERBES_PAROLE de
// lib/tutor-v4/questionBank/5e/francais/socle-lexique-discours.bank.ts et sur la
// table DICTIONNAIRE de vocabulaire-discours.bank.ts. Les mots sont ceux des
// récits de chevalerie et de voyage que la 5e lit toute l'année : l'élève qui a
// lu la fiche retrouve ses propres phrases dans le coach.
//
// Micro-compétences couvertes (les 3 de la notion `vocabulaire_enrichir`) :
// - 5e_voc_contexte      → figure, propriétés 1 et 2, formule, méthode 1,
//                          usage 1, exemples 1 et 2
// - 5e_voc_dictionnaire  → propriétés 3 et 4, méthodes 2 et 3, usage 2,
//                          exemples 3 et 4
// - 5e_voc_reemploi      → propriétés 5 et 6, méthode 4, usage 3, exemples 5 et 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` (il
// ne se plie pas à `largeurMax` et rapetisse tout le dessin) ; la couleur vient
// du `label` du groupe, jamais de l'appelant ; un mot par entrée, ponctuation
// comprise ; les blocs n'interprètent pas le markdown.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
} from "@/lib/tutor-v4/types";
import type { SchemaBarrePart } from "@/lib/tutor-v4/types_canvas";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** L'échelle du VOLUME. ⚠️ `showValues: false` : une échelle de mots n'a pas de
 *  nombres, seulement un ordre. Et la droite est plate — une droite n'a rien à
 *  montrer en hauteur (l'étalon de 2de). */
function echelle(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** L'inclusion : « dire » est le tout, chaque verbe précis en est une part. */
function barre(total: string, parts: SchemaBarrePart[]) {
  return (
    <CanvasRenderer
      figure={{ kind: "schema_barre", total, parts, size: { width: 205, height: 110 } }}
    />
  );
}

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on enrichit son vocabulaire ──────────────────────

// ── LA FIGURE DE RÉFÉRENCE : le mot inconnu et l'indice qui l'éclaire, reliés
//    par l'arc de question. C'est le geste de l'inférence, en un trait.
const contexteHeaume = phrase({
  mots: [
    { texte: "Le" },
    { texte: "heaume", focus: true },
    { texte: "lui" },
    { texte: "couvrait" },
    { texte: "la" },
    { texte: "tête", focus: true },
    { texte: "et" },
    { texte: "cachait" },
    { texte: "son" },
    { texte: "visage" },
    { texte: "." },
  ],
  liens: [{ de: 1, vers: 5, label: "éclairé par", type: "question" }],
  legende: "Le mot inconnu à gauche, ce qu'il couvre à droite : la phrase le dit.",
});

const contexteMonture = phrase({
  mots: [
    { texte: "Il" },
    { texte: "éperonna" },
    { texte: "sa" },
    { texte: "monture", focus: true },
    { texte: "et" },
    { texte: "partit" },
    { texte: "au" },
    { texte: "galop", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 3, vers: 7, label: "indice", type: "question" }],
  legende: "Ce qui part au galop se monte : une « monture » est une bête.",
});

// ── LE GESTE LUI-MÊME : le mot remplacé par un blanc. La phrase tient debout.
const contexteBlanc = phrase({
  mots: [
    { texte: "Le" },
    { texte: "___", focus: true },
    { texte: "lui" },
    { texte: "couvrait" },
    { texte: "la" },
    { texte: "tête" },
    { texte: "." },
  ],
  legende: "Le mot caché, la phrase tient encore : elle porte la moitié du sens.",
});

const contexteDouve = phrase({
  mots: [
    { texte: "On" },
    { texte: "traversa" },
    { texte: "la" },
    { texte: "douve", focus: true },
    { texte: "avant" },
    { texte: "le" },
    { texte: "pont-levis", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 3, vers: 6, label: "juste après", type: "question" }],
  legende: "On la traverse avant d'entrer : la douve entoure le château.",
});

// ── L'ARTICLE DE DICTIONNAIRE, dessiné avec le canvas de la phrase. Un article
//    est une suite de morceaux étiquetés : c'est ce que ce canvas sait montrer.
const articleHeaume = phrase({
  mots: [
    { texte: "heaume", focus: true },
    { texte: "n. m." },
    { texte: "un casque de fer" },
    { texte: "Il ôta son heaume." },
  ],
  groupes: [
    { mots: [0, 0], label: "le mot" },
    { mots: [1, 1], label: "sa classe" },
    { mots: [2, 2], label: "le sens 1" },
    { mots: [3, 3], label: "un exemple" },
  ],
  legende: "Quatre morceaux, toujours les mêmes, toujours dans cet ordre.",
});

const articleAbrege = phrase({
  mots: [
    { texte: "v. tr." },
    { texte: "un verbe" },
    { texte: "avec" },
    { texte: "un" },
    { texte: "COD", focus: true },
  ],
  groupes: [
    { mots: [0, 0], label: "l'abrégé" },
    { mots: [1, 4], label: "ce qu'il dit" },
  ],
  legende: "« v. tr. » : verbe transitif, donc un verbe qui se construit avec un COD.",
});

// ── LA FORME DE BASE : ce qu'on cherche n'est pas ce qu'on lit.
const formeChevaux = phrase({
  mots: [{ texte: "chevaux" }, { texte: "cheval", focus: true }],
  liens: [{ de: 0, vers: 1, label: "je cherche", type: "reprise" }],
  legende: "Un nom se cherche au singulier, un adjectif au masculin singulier.",
});

const formeInfinitif = phrase({
  mots: [{ texte: "recommencerait" }, { texte: "recommencer", focus: true }],
  liens: [{ de: 0, vers: 1, label: "je cherche", type: "reprise" }],
  legende: "Un verbe se cherche à l'infinitif : aucune forme conjuguée n'a d'article.",
});

// ── LE RÉEMPLOI : « dire » barré, le verbe précis à sa place.
const paroleCria = phrase({
  mots: [
    { texte: "Halte-là" },
    { texte: "!" },
    { texte: "dit", barre: true },
    { texte: "cria", focus: true },
    { texte: "le" },
    { texte: "gardien" },
    { texte: "." },
  ],
  legende: "« Dit » ne dit rien. « Cria » fait entendre comment il parle.",
});

const paroleAvoua = phrase({
  mots: [
    { texte: "Il" },
    { texte: "dit", barre: true },
    { texte: "avoua", focus: true },
    { texte: "enfin" },
    { texte: "ce" },
    { texte: "qu'il" },
    { texte: "cachait" },
    { texte: "." },
  ],
  legende: "« Avouer », c'est dire ce qu'on taisait : un mot remplace une explication.",
});

const paroleCommanda = phrase({
  mots: [
    { texte: "Le" },
    { texte: "roi" },
    { texte: "dit", barre: true },
    { texte: "commanda", focus: true },
    { texte: "de" },
    { texte: "partir" },
    { texte: "." },
  ],
  legende: "« Commander », c'est dire ce qu'un autre doit faire. On attend l'obéissance.",
});

// ── LES DEUX QUESTIONS : à quel VOLUME, et pour QUOI FAIRE ?
const echelleVolume = echelle([
  { value: 1, label: "murmurer" },
  { value: 2, label: "parler" },
  { value: 3, label: "crier" },
]);

const inclusionDire = barre("dire", [
  { label: "avouer" },
  { label: "commander" },
  { label: "protester" },
  { label: "…" },
]);

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireEnrichir5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "vocabulaire-enrichir",
  titre: `Enrichir son vocabulaire en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Le heaume lui couvrait la tête et cachait son visage. » Tu n'as jamais vu ce mot, et pourtant tu sais déjà ce que c'est : quelque chose qui se met sur la tête et qui cache le visage. La phrase vient de te l'apprendre. Enrichir son vocabulaire, ce n'est pas apprendre des listes — c'est prendre les mots là où on les rencontre, et savoir quoi en faire ensuite.",
  identite: [
    { label: "Mots clés", valeur: "Contexte, inférence, article, réemploi" },
    { label: "Le secret", valeur: "La phrase autour du mot en dit déjà assez" },
    { label: "Outil", valeur: "Remplacer le mot par un blanc, et relire" },
  ],
  definition: {
    texte:
      "Un mot s'attrape en trois temps. On le RENCONTRE d'abord dans un texte : la phrase qui l'entoure porte presque toujours de quoi le comprendre — ce qu'on en fait, ce qui vient juste après, ce à quoi il s'oppose. C'est ce qu'on appelle inférer, et c'est un raisonnement, pas une devinette. On le VÉRIFIE ensuite dans un dictionnaire de langue, sur papier ou à l'écran : l'article donne la classe du mot, ses sens numérotés, un exemple et parfois son registre — encore faut-il chercher le mot sous sa forme de base. On le RÉEMPLOIE enfin, à l'écrit comme à l'oral, et c'est le seul moment où il devient vraiment le tien : un mot qu'on n'a jamais employé n'est pas un mot qu'on connait, c'est un mot qu'on a lu.",
  },
  figure: {
    schema: pile(contexteHeaume, contexteMonture),
    legende:
      "Deux mots qu'un élève de 5e n'a jamais rencontrés, et deux phrases qui les expliquent toutes seules. L'arc violet part du mot inconnu et pointe vers l'indice : ce qu'il couvre, ce qui vient après. Inférer, ce n'est pas deviner — c'est lire ce que la phrase dit AUTOUR du mot.",
  },
  proprietes: [
    {
      titre: "La phrase porte l'indice",
      texte:
        "Ce qu'on fait du mot, ce qui vient juste après, ce à quoi il s'oppose : le contexte donne de quoi cerner un mot jamais vu.",
      schema: pile(contexteHeaume, contexteDouve),
      micros: ["5e_voc_contexte"],
    },
    {
      titre: "On remplace le mot par un blanc",
      texte:
        "Sans lui, la phrase tient encore debout — et ce qui reste dit déjà la moitié du sens. Il n'y a jamais plus de deux candidats pour le trou.",
      schema: contexteBlanc,
      micros: ["5e_voc_contexte"],
    },
    {
      titre: "Un article se lit en morceaux",
      texte:
        "Le mot, sa classe, ses sens numérotés, un exemple en italique. Toujours les mêmes morceaux, toujours dans le même ordre.",
      schema: articleHeaume,
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "Les abréviations disent quelque chose",
      texte:
        "« n. m. » : nom masculin. « v. tr. » : verbe transitif, donc avec un COD. « fam. » : registre familier. « fig. » : sens figuré.",
      schema: articleAbrege,
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "On cherche la forme de base",
      texte:
        "« Chevaux » n'a pas d'article : c'est « cheval ». « Recommencerait » non plus : c'est « recommencer ». Le dictionnaire range les mots nus.",
      schema: pile(formeChevaux, formeInfinitif),
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "« Dire » ne dit rien",
      texte:
        "Le verbe précis remplace toute une phrase d'explication : murmurer, crier, commander, protester, avouer.",
      schema: pile(paroleCria, paroleAvoua),
      micros: ["5e_voc_reemploi"],
    },
    {
      titre: "Deux questions, pas une",
      texte:
        "À quel VOLUME ? C'est une échelle : murmurer, parler, crier. Pour QUOI FAIRE ? C'est une sorte de dire : avouer, commander, protester.",
      schema: pile(echelleVolume, inclusionDire),
      micros: ["5e_voc_reemploi"],
    },
  ],
  reel: {
    texte:
      "Un bulletin d'alerte cyclonique n'emploie pas deux fois le même mot pour rien. « Vigilance », « pré-alerte », « alerte orange », « alerte rouge », « phase de sauvegarde » : ce sont cinq états différents, et chacun autorise ou interdit des choses précises — sortir, prendre la route, aller travailler. Personne ne t'expliquera ces mots au moment où tu les liras ; ils arrivent dans une phrase, à la radio ou sur un écran, et il faut les comprendre tout de suite. C'est exactement le geste de cette leçon : lire ce qu'il y a autour du mot, en tirer le sens, et vérifier après si le doute reste. Une notice de médicament, un règlement, une consigne d'examen fonctionnent pareil.",
  },
  historique: {
    texte:
      "Le dictionnaire de langue est une invention récente, et il n'a pas commencé comme un livre de règles. Le premier grand dictionnaire français, le Thresor de la langue françoyse (1606), était surtout une collection de mots relevés chez les auteurs : on notait ce que les gens écrivaient, pas ce qu'ils auraient dû écrire. L'Académie française a publié le sien en 1694, après cinquante-neuf ans de travail — assez pour qu'un académicien y consacre sa vie entière sans en voir la fin. Aujourd'hui encore, un dictionnaire ENREGISTRE l'usage : il ajoute chaque année les mots que tout le monde emploie déjà et signale d'un « fam. » ceux qu'on n'écrira pas dans une lettre officielle. Il ne commande pas la langue, il la constate — c'est pour cela qu'il change.",
  },
  formule: {
    contexte: "Le geste qui donne le sens d'un mot inconnu, sans dictionnaire.",
    expression: "je remplace le mot par un blanc, et je relis la phrase entière",
    legende:
      "« Le ___ lui couvrait la tête. » On sait déjà que c'est un objet qu'on porte sur la tête, avant même de savoir ce que « heaume » veut dire. Il ne reste plus qu'à choisir la proposition qui tient dans le trou — et la phrase élimine les autres.",
    schema: contexteBlanc,
  },
  methode: [
    {
      titre: "Cacher le mot, relire la phrase",
      texte:
        "Puis se demander ce qui pourrait tenir dans le trou. Cherche le verbe qui porte le mot, et ce qui vient juste après : c'est là qu'est l'indice.",
      schema: contexteBlanc,
      micros: ["5e_voc_contexte"],
    },
    {
      titre: "Chercher le mot sous sa forme de base",
      texte:
        "L'infinitif pour un verbe, le masculin singulier pour un nom ou un adjectif. Un mot conjugué ou au pluriel n'a pas d'article à lui.",
      schema: pile(formeChevaux, formeInfinitif),
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "Lire l'article jusqu'au bout",
      texte:
        "Les sens sont numérotés : le bon est celui qui va avec TA phrase. Remets chaque définition à la place du mot et garde celle qui tient.",
      schema: articleHeaume,
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "Avant d'écrire « dit », se demander comment il parle",
      texte:
        "Bas ou fort ? Pour obtenir quoi ? Le verbe juste remplace à lui seul une phrase d'explication — et il t'en fait gagner une.",
      schema: pile(paroleCria, paroleCommanda),
      micros: ["5e_voc_reemploi"],
    },
  ],
  usages: [
    {
      titre: "Pour lire un récit sans s'arrêter",
      detail:
        "Un roman de chevalerie est plein de heaumes, de douves et de suzerains. S'arrêter à chaque mot, c'est perdre l'histoire : le contexte suffit à avancer.",
      schema: contexteDouve,
      micros: ["5e_voc_contexte"],
    },
    {
      titre: "Pour vérifier quand le doute reste",
      detail:
        "Le dictionnaire papier exige de connaitre la forme exacte ; le numérique rattrape les orthographes approchantes et fait entendre la prononciation.",
      schema: articleAbrege,
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "Pour écrire un dialogue qui s'entend",
      detail:
        "Une copie de 5e emploie « dit » douze fois. Chaque « dit » est une occasion manquée de faire entendre comment le personnage parle.",
      schema: pile(echelleVolume, inclusionDire),
      micros: ["5e_voc_reemploi"],
    },
  ],
  exemples: [
    {
      titre: "Un mot jamais rencontré",
      donnees: "« Le suzerain reçut l'hommage de ses vassaux. »",
      schema: contexteHeaume,
      question: "Que veut dire « suzerain » ?",
      solution:
        "Remplace-le par un blanc : « Le ___ reçut l'hommage de ses vassaux. » Celui qui REÇOIT l'hommage est au-dessus de celui qui le rend. Un suzerain est donc le seigneur à qui d'autres obéissent. La phrase portait la réponse dans son verbe.",
      micros: ["5e_voc_contexte"],
    },
    {
      titre: "L'indice est juste après",
      donnees: "« On traversa la douve avant d'atteindre le pont-levis. »",
      schema: contexteDouve,
      question: "Qu'est-ce qu'une « douve » ?",
      solution:
        "On la TRAVERSE, et juste après vient le pont-levis : elle est donc dehors, devant l'entrée, et il faut la franchir. C'est le fossé rempli d'eau qui entoure les murs. Deux indices ici — le verbe et ce qui suit — et ils disent la même chose.",
      micros: ["5e_voc_contexte"],
    },
    {
      titre: "Une abréviation dans l'article",
      donnees: "L'article indique « v. tr. ».",
      schema: articleAbrege,
      question: "Qu'est-ce que cela t'apprend ?",
      solution:
        "Que le mot est un VERBE TRANSITIF : il se construit avec un complément d'objet direct. Tu sais donc, avant même d'avoir lu la définition, qu'il faudra écrire « il ___ quelque chose » et non « il ___ à quelque chose ». Une abréviation de six signes t'a donné la construction.",
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "Le mot qu'on ne trouve pas",
      donnees: "Tu cherches l'adjectif « belle » et l'article n'existe pas.",
      schema: formeChevaux,
      question: "Que fais-tu ?",
      solution:
        "Tu cherches son masculin singulier : « beau ». Le dictionnaire ne range pas les formes, il range les mots nus — l'infinitif pour un verbe, le singulier pour un nom, le masculin singulier pour un adjectif. « Belle » n'a pas disparu : elle est dans l'article de « beau ».",
      micros: ["5e_voc_dictionnaire"],
    },
    {
      titre: "Sortir de « dire » (1)",
      donnees: "« Il ordonne au valet de sortir immédiatement. »",
      schema: paroleCommanda,
      question: "Quel verbe emploies-tu à la place de « dire » ?",
      solution:
        "COMMANDER : dire ce qu'un autre doit faire. Ce n'est pas une question de volume — on peut commander à voix basse — c'est une question de ce qu'on attend : l'obéissance. « Il dit au valet de sortir » perdait justement cela.",
      micros: ["5e_voc_reemploi"],
    },
    {
      titre: "Sortir de « dire » (2)",
      donnees: "« Il reconnait enfin ce qu'il avait caché jusque-là. »",
      schema: paroleAvoua,
      question: "Même question.",
      solution:
        "AVOUER : dire ce qu'on avait tu. Le verbe porte à lui seul le « enfin », le « caché » et le « jusque-là » — trois informations en un mot. C'est cela, réemployer un lexique précis : écrire moins et dire plus.",
      micros: ["5e_voc_reemploi"],
    },
  ],
  pieges: [
    "Deviner au lieu d'inférer : la réponse est dans la phrase, pas dans ton imagination. Si aucun indice ne la soutient, ce n'est pas une inférence.",
    "Chercher « chevaux » ou « recommencerait » dans le dictionnaire : ces formes n'ont pas d'article. On cherche « cheval » et « recommencer ».",
    "S'arrêter au premier sens numéroté : le bon est celui qui va avec ta phrase, et c'est parfois le quatrième.",
    "Prendre un mot marqué « fam. » pour un mot ordinaire : le dictionnaire vient de te dire de ne pas l'écrire dans un devoir.",
    "Croire qu'on connait un mot parce qu'on l'a lu : un mot n'est à toi qu'une fois que tu l'as employé toi-même.",
    "Chercher le verbe de parole le plus rare : « rétorquer » à la place de « répondre » n'est pas plus précis, seulement plus voyant.",
  ],
  aRetenir: [
    "Remplace le mot inconnu par un blanc et relis : la phrase porte l'indice.",
    "Au dictionnaire, on cherche la forme de base — infinitif, masculin singulier.",
    "L'article donne la classe, les sens numérotés, un exemple et le registre.",
    "Un mot n'est à toi que le jour où tu l'emploies : lis, vérifie, réemploie.",
    "Pour un verbe de parole : à quel volume, et pour quoi faire ? Deux questions.",
  ],
  entrainement: [
    {
      question: "« Le félon avait trahi son maitre pour de l'or. » Qu'est-ce qu'un « félon » ?",
      correction: "Celui qui trahit la parole donnée — « avait trahi » est dans la phrase.",
      micros: ["5e_voc_contexte"],
    },
    {
      question: "« La nef fendait les vagues sous un vent debout. » Qu'est-ce qu'une « nef » ?",
      correction: "Un grand navire à voiles : elle fend les vagues et reçoit le vent.",
      micros: ["5e_voc_contexte"],
    },
    {
      question: "L'article indique « n. m. ». Que sais-tu du mot ?",
      correction: "C'est un nom masculin : on écrira « un », « le », et l'adjectif au masculin.",
      micros: ["5e_voc_dictionnaire"],
    },
    {
      question: "Tu veux chercher « recommencerait ». Quel mot tapes-tu ?",
      correction: "« Recommencer » : un verbe se cherche toujours à l'infinitif.",
      micros: ["5e_voc_dictionnaire"],
    },
    {
      question: "« Elle répond si doucement qu'on la fait répéter. » Quel verbe de parole ?",
      correction: "Murmurer : parler tout bas, pour un seul. C'est une question de volume.",
      micros: ["5e_voc_reemploi"],
    },
    {
      question: "« Le marchand se plaint du prix qu'on lui impose. » Quel verbe de parole ?",
      correction: "Protester : dire son refus à voix haute. Ce n'est pas le volume, c'est le refus.",
      micros: ["5e_voc_reemploi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesVocabulaireEnrichir5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Enrichir son vocabulaire - 5e",
    section: {
      type: "objectif",
      phrase: "Un mot s'attrape là où on le rencontre",
      sousPhrase:
        "La phrase autour du mot en dit déjà assez. Le dictionnaire vérifie. Le réemploi le rend vraiment tien.",
      encadre: {
        titre: "L'idée",
        texte: "« Le heaume lui couvrait la tête. » Tu ne connais pas le mot, et tu sais déjà.",
      },
    },
  },
  {
    titre: "Le geste : cacher le mot",
    badge: "Enrichir son vocabulaire - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je remplace le mot inconnu par un blanc.",
        "Je relis la phrase entière : elle tient encore debout.",
        "Je cherche l'indice — le verbe qui le porte, ce qui vient juste après.",
        "Je choisis ce qui peut tenir dans le trou. Il n'y a jamais beaucoup de candidats.",
      ],
    },
    schema: contexteBlanc,
  },
  {
    titre: "L'article de dictionnaire",
    badge: "Enrichir son vocabulaire - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le mot", texte: "Sous sa forme de base : infinitif, masculin singulier." },
        { titre: "Sa classe", texte: "« n. m. », « v. tr. » : le genre et la construction." },
        { titre: "Ses sens", texte: "Numérotés. Le bon est celui qui va avec ta phrase." },
        { titre: "Son registre", texte: "« fam. » te dit de ne pas l'écrire dans un devoir." },
      ],
    },
    schema: articleHeaume,
  },
  {
    titre: "Deux questions pour un verbe de parole",
    badge: "Enrichir son vocabulaire - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "À quel VOLUME ?",
        contenu: "murmurer → parler → crier. Une échelle : la même action, plus ou moins fort.",
      },
      droite: {
        titre: "Pour QUOI FAIRE ?",
        contenu: "avouer, commander, protester. Des sortes de dire : ce qu'on attend change.",
      },
    },
    schema: pile(echelleVolume, inclusionDire),
  },
  {
    titre: "« Dit » ne dit rien",
    badge: "Enrichir son vocabulaire - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Avant d'écrire « dit », je me demande comment le personnage parle.",
        "Bas, pour un seul ? Murmurer.",
        "Fort, pour être entendu de loin ? Crier.",
        "Pour obtenir une obéissance ? Commander. Pour livrer ce qu'il taisait ? Avouer.",
      ],
    },
    schema: pile(paroleCria, paroleAvoua),
  },
  {
    titre: "À vous",
    badge: "Enrichir son vocabulaire - 5e",
    section: {
      type: "exercice",
      enonce: "« Le pèlerin marchait depuis l'aube, bâton en main. »",
      question: "Qu'est-ce qu'un « pèlerin » ?",
      indice: "Regarde ce qu'il fait, depuis quand, et avec quoi.",
      correction:
        "Quelqu'un qui voyage à pied, longtemps, avec un bâton : c'est un voyageur qui marche par devoir sacré. Trois indices dans une seule phrase.",
    },
    schema: contexteMonture,
  },
];
