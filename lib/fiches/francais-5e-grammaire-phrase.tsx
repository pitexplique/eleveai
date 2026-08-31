// ─── Fiche de cours : la phrase, ses types et sa ponctuation (5e) ─────────────
// LA PREMIÈRE FICHE DE FRANÇAIS DE LA 5e. La classe avait vingt fiches de maths
// et aucune de français — alors que c'est la seule classe du collège déjà passée
// au programme neuf.
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
// La 4e et la 3e restent sur le texte de 2015 consolidé en 2020 : ⛔ ne pas leur
// recopier cette fiche avant 2027 et 2028.
//
// ⭐ POURQUOI CELLE-CI D'ABORD. Elle couvre en entier le premier objectif du BO,
// « Comprendre ce qu'est une phrase pour mieux lire et mieux écrire » — celui
// dont tout le reste dépend : on ne cherche pas une fonction avant de savoir où
// la phrase commence et où elle finit.
//
// ⭐ LE TITRE PORTE L'ANNÉE (24/08/2026, demande de Frédéric). Les sites qui nous
// devancent sur « français 5e » écrivent l'année scolaire dans leur titre — la
// requête tapée est « programme 5e 2026 2027 », pas « fiche de grammaire ». Le
// `titre` remonte dans le H1 ET dans tous les H2 de la page (« Définition : … »,
// « Propriétés : … », « Méthode : … », « Exercices corrigés : … ») : l'écrire une
// fois le pose partout.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `grammaire_phrase`) et sur les tables PONCTUATIONS, TYPES_FORMES, STRUCTURES,
// LIENS et COORDONNANTS de
// lib/tutor-v4/questionBank/5e/francais/grammaire-phrase.bank.ts.
//
// ⚠️ LA NOTION A ÉTÉ REDÉCOUPÉE LE MÊME JOUR. Le matin du 24/08,
// `grammaire_phrase` portait DIX-NEUF micros — toute la grammaire de l'année
// dans une seule ligne du coach. Elle en porte cinq, et ce sont exactement les
// cinq de cette fiche : le `notion` ci-dessous tombe pile dessus, sans alias.
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - 5e_gram_ponctuation      → définition, propriétés « La virgule détache » et
//                              « Les deux-points annoncent », méthode 1,
//                              usages, exemple 1, piège 1, entraînement 1
// - 5e_gram_types_formes     → figure, propriété « Le type et la forme sont
//                              deux étages », formule, méthode 2, exemples 2
//                              et 3, piège 2, entraînements 2 et 3
// - 5e_gram_simple_complexe  → propriété « On compte les verbes conjugués »,
//                              méthode 3, exemple 4, piège 3, entraînement 4
// - 5e_gram_juxta_coord      → propriété « Le rapport n'est pas toujours
//                              écrit », usages, exemple 5, piège 4
// - 5e_gram_coordonnants     → propriété « Le petit mot dit quelque chose »,
//                              le défi (exemple 6), entraînement 5
//
// Les phrases sont CELLES DE LA BANQUE, sans exception : « Le lendemain, le vent
// tomba », « Il n'y avait plus rien à faire : le bateau était parti », « Elle
// avait tout préparé : la corde, la lampe, les vivres », « Le bateau ne partira
// pas ce soir », « Comme la mer est calme ! », « Rentrez tout de suite ! », « Le
// vent se leva d'un coup », « Le vent se leva et la pluie suivit », « Quel
// vent ! », « Le vent se leva ; les volets claquèrent », « Il pleuvait, pourtant
// elle sortit sans manteau », « La route est coupée, donc nous ferons le tour ».
// L'élève qui a lu la fiche doit retrouver ses propres phrases dans le coach.
//
// ⚠️ `largeurMax` EST ÉCRIT, IL NE SE SUBIT PAS — ET IL VAUT 215, PAS 250.
// Le défaut du composant est 250, ce qui donne un viewBox de 260 ; or le bloc qui
// reçoit un dessin ne fait que 225 px sur un téléphone de 375. Le SVG y est donc
// réduit à 0,86, et une légende écrite en 12 px s'affiche en 10,4 — sous le
// plancher de REGLES.md § 2 quater. À 215, le dessin n'est plus réduit du tout :
// la phrase se plie en deux lignes plutôt que de rapetisser. Mesuré sur la page
// rendue en 375 px, pas estimé.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le helper commun à toutes les fiches de français : une seule façon de dessiner
// une phrase, donc un seul dessin à reconnaître pour l'élève. La couleur des
// fonctions est déduite du label par le canvas (sujet bleu, verbe rouge, objet
// vert, circonstanciel orange, attribut violet, proposition indigo puis
// sarcelle, mot outil gris) : on ne l'écrit jamais ici.
function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        titre: opts.titre,
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les phrases de la banque, dessinées ──────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : les trois types, l'un sous l'autre, sur le même verbe
// ou presque. Ce que le dessin doit faire voir en une seconde, c'est que le type
// ne se lit PAS sur le point final — « Rentrez tout de suite ! » finit par un
// point d'exclamation et reste impérative.
const phraseDeclarative = phrase({
  mots: [
    { texte: "Le" },
    { texte: "bateau" },
    { texte: "partira", focus: true },
    { texte: "avant" },
    { texte: "la" },
    { texte: "nuit" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
  ],
  legende: "Type déclaratif : elle raconte, et elle finit par un point.",
});

const phraseInterrogative = phrase({
  mots: [
    { texte: "Partiras", focus: true },
    { texte: "-tu" },
    { texte: "avec" },
    { texte: "eux" },
    { texte: "?" },
  ],
  groupes: [
    { mots: [0, 0], label: "verbe" },
    { mots: [1, 1], label: "sujet" },
  ],
  legende: "Type interrogatif : elle demande, et le sujet est passé derrière.",
});

const phraseImperative = phrase({
  mots: [
    { texte: "Rentrez", focus: true },
    { texte: "tout" },
    { texte: "de" },
    { texte: "suite" },
    { texte: "!" },
  ],
  groupes: [{ mots: [0, 0], label: "verbe" }],
  legende: "Type impératif : elle ordonne, et son sujet n'est pas écrit.",
});

// LA FORME NÉGATIVE : les deux morceaux de la négation encadrent le verbe. Le
// dire ne se voit pas ; l'entourer, oui.
const phraseNegative = phrase({
  mots: [
    { texte: "Le" },
    { texte: "bateau" },
    { texte: "ne", focus: true },
    { texte: "partira" },
    { texte: "pas", focus: true },
    { texte: "ce" },
    { texte: "soir" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 3], label: "verbe" }],
  liens: [{ de: 2, vers: 4, label: "encadrent", type: "accord" }],
  legende: "Forme négative : « ne … pas » se referme sur le verbe conjugué.",
});

// LA FORME EXCLAMATIVE, sur une phrase qui reste DÉCLARATIVE. C'est l'erreur la
// plus fréquente de la classe, et elle se répare par un dessin, pas par une
// remarque : le type est en dessous, la forme au-dessus.
const phraseExclamative = phrase({
  mots: [
    { texte: "Comme" },
    { texte: "la" },
    { texte: "mer" },
    { texte: "est", focus: true },
    { texte: "calme" },
    { texte: "!" },
  ],
  groupes: [
    { mots: [1, 2], label: "sujet" },
    { mots: [3, 3], label: "verbe" },
  ],
  legende: "Elle s'exclame, mais elle raconte : type déclaratif, forme exclamative.",
});

// LA VIRGULE QUI DÉTACHE. `deplacable` remet le groupe à l'autre bout : on voit
// que la virgule était là parce que le complément avait quitté sa place.
const phraseVirguleDetache = phrase({
  mots: [
    { texte: "Le" },
    { texte: "lendemain" },
    { texte: ",", focus: true },
    { texte: "le" },
    { texte: "vent" },
    { texte: "tomba" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "CC de temps", deplacable: true },
    { mots: [3, 4], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
  ],
  legende: "« Le vent tomba le lendemain » : sans déplacement, plus de virgule.",
});

// LA VIRGULE QUI ISOLE — le même signe, un autre travail. Deux virgules qui
// encadrent, ce n'est pas deux virgules qui séparent : on barre l'encadré, et la
// phrase tient encore.
const phraseVirguleIsole = phrase({
  mots: [
    { texte: "Les" },
    { texte: "élèves" },
    { texte: ",", focus: true },
    { texte: "qui", barre: true },
    { texte: "avaient", barre: true },
    { texte: "marché", barre: true },
    { texte: ",", focus: true },
    { texte: "s'assirent" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [7, 7], label: "verbe" },
  ],
  legende: "On retire ce que les deux virgules encadrent : la phrase tient debout.",
});

// LES DEUX-POINTS : le même signe pour deux travaux différents. On les met l'un
// sous l'autre, sinon l'élève retient « les deux-points annoncent une liste ».
const phraseDeuxPointsExplication = phrase({
  mots: [
    { texte: "Il" },
    { texte: "n'y" },
    { texte: "avait" },
    { texte: "plus" },
    { texte: "rien" },
    { texte: ":", focus: true },
    { texte: "le" },
    { texte: "bateau" },
    { texte: "était" },
    { texte: "parti" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "proposition 1" },
    { mots: [6, 9], label: "proposition 2" },
  ],
  legende: "Ici, les deux-points annoncent l'explication de ce qui précède.",
});

const phraseDeuxPointsEnumeration = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "avait" },
    { texte: "tout" },
    { texte: "préparé" },
    { texte: ":", focus: true },
    { texte: "la" },
    { texte: "corde" },
    { texte: "," },
    { texte: "la" },
    { texte: "lampe" },
    { texte: "," },
    { texte: "les" },
    { texte: "vivres" },
    { texte: "." },
  ],
  groupes: [{ mots: [5, 12], label: "énumération" }],
  legende: "Ici, les mêmes deux-points annoncent une énumération.",
});

// PHRASE SIMPLE : un seul verbe conjugué, donc un seul bloc.
const phraseSimple = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva", focus: true },
    { texte: "d'un" },
    { texte: "coup" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 5], label: "proposition 1" }],
  legende: "Un seul verbe conjugué : « se leva ». C'est une phrase simple.",
});

// PHRASE COMPLEXE : deux blocs de même force, reliés par un mot outil gris. Les
// deux propositions sont à ÉGALITÉ — c'est ce que dit la coordination, et c'est
// pour cela que le canvas leur donne deux teintes de même intensité.
const phraseComplexe = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva", focus: true },
    { texte: "et" },
    { texte: "la" },
    { texte: "pluie" },
    { texte: "suivit", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "proposition 1" },
    { mots: [4, 4], label: "coordination" },
    { mots: [5, 7], label: "proposition 2" },
  ],
  legende: "Deux verbes conjugués : « se leva » et « suivit ». Phrase complexe.",
});

// PHRASE NON VERBALE : aucun verbe conjugué à entourer. Le vide est le dessin.
const phraseNonVerbale = phrase({
  mots: [{ texte: "Quel" }, { texte: "vent" }, { texte: "!" }],
  legende: "Aucun verbe conjugué : rien à souligner. Phrase non verbale.",
});

// LA JUXTAPOSITION : le rapport n'est écrit NULLE PART, et pourtant il est là.
// On l'écrit sur l'arc, entre les deux propositions.
const phraseJuxtaposition = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva" },
    { texte: ";", focus: true },
    { texte: "les" },
    { texte: "volets" },
    { texte: "claquèrent" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "proposition 1" },
    { mots: [5, 7], label: "proposition 2" },
  ],
  liens: [{ de: 3, vers: 7, label: "donc", type: "question" }],
  legende: "Aucun mot ne dit « donc » — le point-virgule le laisse entendre.",
});

// LA COORDINATION, avec le mot outil montré du doigt : ici le rapport est ÉCRIT.
const phraseCoordinationOpposition = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pleuvait" },
    { texte: "," },
    { texte: "pourtant", focus: true },
    { texte: "elle" },
    { texte: "sortit" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [3, 3], label: "liaison" },
    { mots: [4, 5], label: "proposition 2" },
  ],
  legende: "« pourtant » écrit l'opposition : le rapport ne se devine plus.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Le même schéma de phrase, deux mots
// coordonnants différents : c'est le mot, et lui seul, qui change le sens.
const phraseDefiDonc = phrase({
  mots: [
    { texte: "La" },
    { texte: "route" },
    { texte: "est" },
    { texte: "coupée" },
    { texte: "," },
    { texte: "donc", focus: true },
    { texte: "nous" },
    { texte: "ferons" },
    { texte: "le" },
    { texte: "tour" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "proposition 1" },
    { mots: [5, 5], label: "coordination" },
    { mots: [6, 9], label: "proposition 2" },
  ],
  legende: "« donc » : la route coupée est la CAUSE, le tour la conséquence.",
});

const phraseDefiCar = phrase({
  mots: [
    { texte: "Rentre" },
    { texte: "," },
    { texte: "car", focus: true },
    { texte: "la" },
    { texte: "nuit" },
    { texte: "tombe" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "proposition 1" },
    { mots: [2, 2], label: "coordination" },
    { mots: [3, 5], label: "proposition 2" },
  ],
  legende: "« car » : la seconde proposition donne la cause de la première.",
});

const pieges = [
  "Croire qu'une virgule « marque une pause pour respirer ». Elle fait un travail précis : elle détache un complément placé en tête, elle isole une précision, ou elle sépare des termes d'une énumération — et ce n'est pas la même chose.",
  "Dire qu'une phrase est « de type exclamatif ». L'exclamative est une FORME : le type reste déclaratif, interrogatif ou impératif. « Rentrez tout de suite ! » est impérative à la forme exclamative.",
  "Compter les verbes non conjugués. Dans « Il essaya de partir », « partir » est un infinitif : la phrase reste simple, avec un seul verbe conjugué.",
  "Chercher un mot pour trouver le rapport entre deux propositions juxtaposées. Dans « Le vent se leva ; les volets claquèrent », la conséquence n'est écrite nulle part — c'est le sens qui la porte.",
];

const aRetenir = [
  "Trois types (déclaratif, interrogatif, impératif), et des formes qui se combinent avec eux : affirmative ou négative, exclamative ou non.",
  "Un verbe conjugué = une proposition. Un seul : phrase simple. Deux ou plus : phrase complexe. Aucun : phrase non verbale.",
  "Un signe de ponctuation ne se lit pas, il travaille : il détache, il isole, il annonce, il relie.",
];

export const fichePhrase5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "grammaire-phrase",
  titre: `La phrase, ses types et sa ponctuation (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Rentrez tout de suite ! » finit par un point d'exclamation, et pourtant elle n'est pas exclamative : elle est impérative. Le point final ne donne pas le type d'une phrase — c'est ce qu'elle FAIT qui le donne.",
  identite: [
    { label: "Mots clés", valeur: "Type, forme, proposition, ponctuation, coordination" },
    { label: "Le secret", valeur: "Compter les verbes conjugués" },
    { label: "Outil", valeur: "Déplacer, supprimer, remplacer le signe par un mot" },
  ],
  definition: {
    texte:
      "Une phrase commence par une majuscule et se ferme par un point. Elle a UN type parmi trois — déclaratif si elle raconte, interrogatif si elle demande, impératif si elle ordonne — et des formes qui se combinent avec ce type : affirmative ou négative, exclamative ou non. À l'intérieur, chaque verbe conjugué ouvre une proposition : un seul verbe conjugué et la phrase est simple, deux ou plus et elle est complexe, aucun et elle est non verbale. La ponctuation, elle, n'est pas une affaire de souffle : chaque signe détache, isole, annonce ou relie un constituant précis.",
  },
  figure: {
    schema: pile(phraseDeclarative, phraseInterrogative, phraseImperative),
    legende:
      "Les trois types, l'un sous l'autre. Le sujet est bleu, le verbe rouge — les mêmes couleurs que dans toutes les fiches de français. Regarde où est le sujet : devant le verbe dans la déclarative, derrière lui dans l'interrogative, absent dans l'impérative. C'est cela qu'on repère, pas le point final.",
  },
  proprietes: [
    {
      titre: "Le type et la forme sont deux étages",
      texte:
        "Une phrase a un type ET des formes : « Comme la mer est calme ! » est déclarative à la forme exclamative.",
      schema: pile(phraseExclamative, phraseNegative),
    },
    {
      titre: "La virgule détache, ou elle isole",
      texte:
        "Une seule virgule détache un complément passé en tête ; deux virgules encadrent une précision qu'on peut retirer.",
      schema: pile(phraseVirguleDetache, phraseVirguleIsole),
    },
    {
      titre: "Les deux-points annoncent",
      texte:
        "Tantôt une explication, tantôt une énumération : c'est ce qui suit, jamais le signe, qui le dit.",
      schema: pile(phraseDeuxPointsExplication, phraseDeuxPointsEnumeration),
    },
    {
      titre: "On compte les verbes conjugués",
      texte:
        "Un seul : phrase simple. Deux ou plus : phrase complexe. Aucun : phrase non verbale.",
      schema: pile(phraseSimple, phraseComplexe, phraseNonVerbale),
    },
    {
      titre: "Le rapport n'est pas toujours écrit",
      texte:
        "Deux propositions juxtaposées disent quelque chose l'une de l'autre, même quand aucun mot ne le nomme.",
      schema: phraseJuxtaposition,
    },
    {
      titre: "Le petit mot dit quelque chose",
      texte:
        "Un coordonnant relie — et il précise : « et » ajoute, « mais » oppose, « car » explique, « donc » conclut.",
      schema: phraseCoordinationOpposition,
    },
  ],
  reel: {
    texte:
      "C'est ce qui se voit quand on écrit un message. « On mange les enfants » et « On mange, les enfants » ne disent pas du tout la même chose, et la seule différence est une virgule : elle détache celui à qui l'on parle. Dans un texto, la phrase non verbale fait le travail — « Départ à six heures », « Silence dans la salle » : personne n'y met un verbe, et personne ne s'y trompe. Écrire une consigne, un mot d'excuse ou une légende de publication, c'est choisir un type, une forme et une ponctuation, même sans y penser.",
  },
  historique: {
    texte:
      "Pendant l'Antiquité, on écrivait sans espaces ni ponctuation : SCRIPTIOCONTINUA, tout attaché. Lire à voix haute était la seule façon de comprendre où une phrase s'arrêtait — et c'est pour cela qu'on lisait toujours à voix haute. Les points et les virgules sont arrivés peu à peu chez les copistes du Moyen Âge, et c'est un imprimeur vénitien, Alde Manuce, qui a fixé vers 1500 la virgule telle que nous la traçons. La ponctuation n'est donc pas un décor ajouté au texte : c'est l'invention qui a rendu la lecture silencieuse possible.",
  },
  formule: {
    contexte: "Le test qui donne le type d'une phrase, quel que soit son point final.",
    expression: "elle raconte ? elle demande ? elle ordonne ?",
    legende:
      "Une seule des trois réponses est vraie, et c'est le type. On regarde ENSUITE le point : un point d'exclamation ne change que la forme. « Rentrez tout de suite ! » ordonne — donc impérative, à la forme exclamative.",
    schema: phraseImperative,
  },
  methode: [
    {
      titre: "Je regarde ce que la phrase fait",
      texte:
        "Raconter, demander, ordonner : c'est le type. La négation et l'exclamation viennent après, ce sont des formes.",
      schema: phraseExclamative,
    },
    {
      titre: "Je souligne les verbes conjugués",
      texte:
        "Un seul, la phrase est simple ; deux, elle est complexe ; aucun, elle est non verbale. Un infinitif ne compte pas.",
      schema: pile(phraseSimple, phraseComplexe),
    },
    {
      titre: "Je remplace le signe par un mot",
      texte:
        "« donc », « car », « mais », « puis » : celui qui passe sans forcer donne le rapport entre les deux propositions.",
      schema: phraseJuxtaposition,
    },
  ],
  usages: [
    {
      titre: "Détacher ce qui n'est pas à sa place",
      detail:
        "Un complément passé en tête de phrase se sépare par une virgule : « Le lendemain, le vent tomba. »",
      schema: phraseVirguleDetache,
    },
    {
      titre: "Annoncer ce qui va suivre",
      detail:
        "Les deux-points ouvrent sur une explication ou sur une liste — ils ne referment jamais une phrase.",
      schema: phraseDeuxPointsEnumeration,
    },
    {
      titre: "Relier deux idées de même rang",
      detail:
        "La coordination met les deux propositions à égalité, et le petit mot dit ce qui les unit.",
      schema: phraseCoordinationOpposition,
    },
  ],
  exemples: [
    {
      titre: "Que fait cette virgule ?",
      donnees: "« Le lendemain, le vent tomba. »",
      schema: phraseVirguleDetache,
      question: "Quel est le rôle de la virgule dans cette phrase ?",
      solution:
        "Elle détache un complément placé en tête de phrase. La preuve se fait en le remettant à sa place : « Le vent tomba le lendemain » — la virgule disparaît d'elle-même. Elle n'était donc pas là pour respirer, mais pour signaler que « Le lendemain » avait quitté sa position habituelle.",
    },
    {
      titre: "Le type et la forme",
      donnees: "« Le bateau ne partira pas ce soir. »",
      schema: phraseNegative,
      question: "Quel est le type de cette phrase, et sa forme ?",
      solution:
        "Elle raconte quelque chose : elle est de type déclaratif. Et « ne … pas » encadre le verbe conjugué : elle est à la forme négative. Deux étages, deux réponses — on ne peut pas dire « elle est négative » et s'arrêter là, car « négative » ne dit rien de ce que la phrase fait.",
    },
    {
      titre: "Le piège de l'exclamation",
      donnees: "« Rentrez tout de suite ! »",
      schema: phraseImperative,
      question: "Cette phrase est-elle de type exclamatif ?",
      solution:
        "Non : le type exclamatif n'existe pas. La phrase ordonne, donc elle est de type impératif — et son verbe n'a pas de sujet écrit, ce qui le confirme. Le point d'exclamation lui ajoute seulement la forme exclamative. Les types sont trois, et l'exclamative n'en est pas un.",
    },
    {
      titre: "Simple, complexe ou non verbale ?",
      donnees: "« Le vent se leva d'un coup. » puis « Le vent se leva et la pluie suivit. » puis « Quel vent ! »",
      schema: pile(phraseSimple, phraseComplexe, phraseNonVerbale),
      question: "Quelle est la structure de chacune de ces trois phrases ?",
      solution:
        "On souligne les verbes conjugués, et seulement eux. La première n'en a qu'un, « se leva » : phrase simple. La deuxième en a deux, « se leva » et « suivit » : phrase complexe, avec deux propositions coordonnées par « et ». La troisième n'en a aucun : phrase non verbale. Le compte des verbes conjugués et la catégorie sont la même information, dite deux fois.",
    },
    {
      titre: "Un rapport que personne n'a écrit",
      donnees: "« Le vent se leva ; les volets claquèrent. »",
      schema: phraseJuxtaposition,
      question: "Qu'exprime le lien entre les deux propositions ?",
      solution:
        "La conséquence. Aucun mot ne le dit : les deux propositions sont juxtaposées, séparées par un simple point-virgule. Le test consiste à glisser un coordonnant entre elles — « Le vent se leva, donc les volets claquèrent » passe sans forcer, « car » ou « mais » non. Le rapport était bien là, porté par le sens seul.",
    },
    {
      titre: "Le défi",
      donnees: "« La route est coupée, donc nous ferons le tour. » et « Rentre, car la nuit tombe. »",
      schema: pile(phraseDefiDonc, phraseDefiCar),
      question: "Ces deux coordonnants font-ils le même travail ?",
      solution:
        "Non, et c'est même l'inverse. Avec « donc », la première proposition est la cause et la seconde la conséquence. Avec « car », c'est la seconde qui donne la cause de la première. Les deux mots relient de la même façon — c'est leur rôle syntaxique, identique — mais ils rangent les idées dans deux ordres opposés : c'est leur rôle de sens. Échanger l'un pour l'autre retourne la phrase.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Il n'y avait plus rien à faire : le bateau était parti. » Que font les deux-points ?",
      correction:
        "Ils annoncent l'explication de ce qui précède. Ce qui suit dit POURQUOI il n'y avait plus rien à faire. S'ils annonçaient une énumération, on trouverait une liste de termes séparés par des virgules — comme dans « Elle avait tout préparé : la corde, la lampe, les vivres. »",
    },
    {
      question: "« N'est-il pas déjà trop tard ? » Type et forme ?",
      correction:
        "Interrogative à la forme négative. Elle demande — donc type interrogatif, et le sujet « il » est passé derrière le verbe. Et « n' … pas » encadre le verbe : forme négative.",
    },
    {
      question: "« Comme la mer est calme ! » Cette phrase est-elle impérative ?",
      correction:
        "Non : elle raconte, elle n'ordonne pas. Elle est de type déclaratif, à la forme exclamative. Le verbe « est » a bien un sujet écrit, « la mer » — un impératif n'en aurait pas.",
    },
    {
      question: "« Quand la cloche sonna, personne ne bougea. » Simple ou complexe ?",
      correction:
        "Complexe : deux verbes conjugués, « sonna » et « bougea », donc deux propositions. Ici elles ne sont ni juxtaposées ni coordonnées — « quand » subordonne la première à la seconde.",
    },
    {
      question: "Défi : « Il pleuvait mais nous sommes sortis quand même. » Quel rapport « mais » établit-il ?",
      correction:
        "L'opposition. La seconde proposition va contre ce que la première laissait attendre. Remplace « mais » par « donc » : la phrase devient absurde — c'est bien le mot qui portait le rapport.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesPhrase5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La phrase - 5e",
    section: {
      type: "objectif",
      phrase: "Savoir de quoi une phrase est faite",
      sousPhrase:
        "Son type, ses formes, ses propositions et ses signes de ponctuation — quatre choses qu'on lit sur la phrase, pas sur son point final.",
      encadre: {
        titre: "L'idée",
        texte: "Un verbe conjugué = une proposition. C'est la manipulation qui tranche.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "« On mange les enfants » et « On mange, les enfants » ne disent pas la même chose. Toute la différence tient dans une virgule qui détache celui à qui l'on parle.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Dans l'Antiquité, on écrivait sans espaces ni ponctuation. C'est pour cela qu'on lisait toujours à voix haute : la ponctuation est l'invention qui a rendu la lecture silencieuse possible.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePhrase5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Type ou forme ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le type",
        contenu:
          "Trois, et trois seulement : déclaratif (elle raconte), interrogatif (elle demande), impératif (elle ordonne). Une phrase en a UN.",
      },
      droite: {
        variante: "ok",
        titre: "La forme",
        contenu:
          "Affirmative ou négative, exclamative ou non. Elles se combinent avec le type : « Rentrez tout de suite ! » est impérative à la forme exclamative.",
      },
    },
  },
  {
    titre: "Compter les verbes conjugués",
    badge: "Simple, complexe, non verbale",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Un seul verbe",
        contenu:
          "« Le vent se leva d'un coup. » Une seule proposition : la phrase est simple.",
      },
      droite: {
        variante: "info",
        titre: "Deux verbes",
        contenu:
          "« Le vent se leva et la pluie suivit. » Deux propositions coordonnées : la phrase est complexe. Et « Quel vent ! », sans aucun verbe conjugué, est non verbale.",
      },
    },
  },
  {
    titre: "Un rapport que personne n'a écrit",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Le vent se leva ; les volets claquèrent. »",
      question: "Qu'exprime le lien entre les deux propositions ?",
      correction:
        "La conséquence — et aucun mot ne la dit. Glisse « donc » entre les deux : la phrase passe sans forcer. C'est le sens qui portait le rapport.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "À toi de jouer",
    section: {
      type: "exercice",
      enonce: "« La route est coupée, donc nous ferons le tour. » et « Rentre, car la nuit tombe. »",
      question: "Ces deux coordonnants font-ils le même travail ?",
      indice: "Demande-toi laquelle des deux propositions donne la cause, dans chaque phrase.",
      correction:
        "Non : avec « donc », la cause est devant et la conséquence derrière ; avec « car », c'est l'inverse. Même rôle syntaxique, deux sens opposés.",
    },
  },
];
