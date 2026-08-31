// ─── Fiche de cours : les groupes de la phrase et leurs fonctions (4e) ────────
// LA TROISIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. ⛔ La 5e a DEUX fiches sur ce
// terrain — « La phrase, ses types et sa ponctuation » et « Les fonctions dans
// la phrase » — écrites sur le BO du 5 mars 2026. Ne pas les recopier.
//
// ⭐ POURQUOI UNE SEULE FICHE ICI, quand la 5e en a deux : le découpage du
// 24/08 a laissé à la 4e une notion `grammaire_phrase` de QUATRE micros, là où
// la 5e en avait dix-neuf avant d'être coupée. Quatre micros font une fiche, et
// une seule.
//
// ⭐ CE QU'ELLE VISE : la confusion qui dure tout le collège — la NATURE et la
// FONCTION. « Le vieux pêcheur du village » est un groupe nominal quoi qu'il
// arrive ; il est sujet dans une phrase et complément dans une autre. La nature
// ne change jamais, la fonction change à chaque phrase.
//
// ⭐ ET UN CONTENU QUE PERSONNE N'ENSEIGNE VRAIMENT : « distinguer et employer à
// bon escient grammaire de l'écrit et grammaire de l'oral », qui est un objectif
// nommé du programme. ⛔ La fiche ne dit JAMAIS qu'une forme orale est fautive :
// le texte demande de les distinguer, pas de les condamner.
//
// Alignée sur les tables CONSTITUANTS, FONCTIONS, ACCORDS et ORAL_ECRIT de
// lib/tutor-v4/questionBank/4e/francais/socle-grammaire-conjugaison.bank.ts,
// écrite le même jour que cette fiche.
//
// Micro-compétences couvertes (les 4 de la notion) :
// - 4e_gram_constituants → définition, figure, propriétés 1 et 2, méthode 1,
//                          exemples 1 et 2
// - 4e_gram_fonctions    → figure, propriétés 3 et 4, formule, méthodes 2 et 3,
//                          exemples 3 et 4
// - 4e_gram_accords      → propriétés 5 et 6, méthode 4, exemples 5 et 6
// - 4e_gram_oral_ecrit   → propriété 7, méthode 5, usages, exemple 7
//
// ⛔ RAPPEL DES TROIS PIÈGES DE FABRICATION (payés le 25/08 sur la fiche de la
// phrase complexe) : `role` n'existe pas sur un mot, la couleur vient du `label`
// du GROUPE ; AUCUN `titre` sur un dessin, il élargit la boite et divise la
// police par deux ; `deplacable` sort du cadre sur un groupe long.

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

// ── LA FIGURE DE RÉFÉRENCE : le MÊME groupe nominal, deux fonctions. C'est tout
//    le sujet de la fiche en deux dessins.
const memeGroupeSujet = phrase({
  mots: [
    { texte: "Le", nature: "déterminant" },
    { texte: "vieux", nature: "adjectif" },
    { texte: "pêcheur", nature: "nom" },
    { texte: "répara" },
    { texte: "son" },
    { texte: "filet" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "sujet" }],
  legende: "Groupe nominal, et ici il est SUJET.",
});

const memeGroupeObjet = phrase({
  mots: [
    { texte: "J'" },
    { texte: "ai" },
    { texte: "reconnu" },
    { texte: "le", nature: "déterminant" },
    { texte: "vieux", nature: "adjectif" },
    { texte: "pêcheur", nature: "nom" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 5], label: "objet" }],
  legende: "Le même groupe nominal, et ici il est COMPLÉMENT D'OBJET.",
});

// ── Les natures : le mot noyau donne la nature du groupe.
const natureGroupeVerbal = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "rangea", nature: "verbe" },
    { texte: "lentement" },
    { texte: "ses" },
    { texte: "affaires" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 4], label: "groupe verbal" }],
  legende: "Un verbe conjugué au centre : c'est un groupe verbal.",
});

const natureGroupePrepositionnel = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "rentrerons" },
    { texte: "avant", nature: "préposition", focus: true },
    { texte: "la" },
    { texte: "nuit" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "groupe prépositionnel" }],
  legende: "Une préposition en tête : c'est un groupe prépositionnel.",
});

const natureAdverbe = phrase({
  mots: [
    { texte: "Il" },
    { texte: "répondit" },
    { texte: "franchement", nature: "adverbe", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "groupe adverbial" }],
  legende: "Un adverbe seul : il ne varie jamais, quoi qu'il arrive.",
});

// ── Les fonctions, et la manipulation qui les prouve.
const fonctionCod = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "répara" },
    { texte: "son" },
    { texte: "filet" },
    { texte: "déchiré" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 5], label: "objet" },
  ],
  legende: "Il répara QUOI ? sans préposition : complément d'objet direct.",
});

const fonctionCoi = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "téléphona" },
    { texte: "à", nature: "préposition", focus: true },
    { texte: "sa" },
    { texte: "sœur" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 4], label: "complément indirect" },
  ],
  legende: "Une préposition relie le complément au verbe : il est indirect.",
});

const fonctionCirconstanciel = phrase({
  mots: [
    { texte: "Depuis" },
    { texte: "une" },
    { texte: "semaine" },
    { texte: "," },
    { texte: "il" },
    { texte: "pleut" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "circonstanciel" }],
  legende: "On peut le déplacer et l'effacer : c'est un circonstanciel.",
});

const fonctionAttribut = phrase({
  mots: [
    { texte: "Cette" },
    { texte: "histoire" },
    { texte: "semblait", focus: true },
    { texte: "invraisemblable" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut" },
  ],
  liens: [{ de: 1, vers: 3, label: "commande", type: "accord" }],
  legende: "« Sembler » relie : l'attribut dit ce que le sujet EST.",
});

const fonctionComplementNom = phrase({
  mots: [
    { texte: "La" },
    { texte: "maison" },
    { texte: "de", nature: "préposition" },
    { texte: "mon" },
    { texte: "grand-père" },
    { texte: "domine" },
    { texte: "la" },
    { texte: "baie" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "complément du nom" }],
  liens: [{ de: 2, vers: 1, label: "complète", type: "accord" }],
  legende: "Il complète le NOM « maison », jamais le verbe.",
});

// ── La manipulation : le circonstanciel se supprime, l'objet non.
const manipulationSupprime = phrase({
  mots: [
    { texte: "Depuis", barre: true },
    { texte: "une", barre: true },
    { texte: "semaine", barre: true },
    { texte: "," },
    { texte: "il" },
    { texte: "pleut" },
    { texte: "." },
  ],
  legende: "« Il pleut » tient debout : le circonstanciel s'efface.",
});

const manipulationSupprimeImpossible = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "répara" },
    { texte: "son", barre: true },
    { texte: "filet", barre: true },
    { texte: "." },
  ],
  legende: "« Le pêcheur répara » ne veut plus rien dire : l'objet ne s'efface pas.",
});

// ── L'accord : le sujet commande, même quand il est loin ou derrière.
const accordSujetLoin = phrase({
  mots: [
    { texte: "Les" },
    { texte: "cases", focus: true },
    { texte: "construites" },
    { texte: "au" },
    { texte: "bord" },
    { texte: "de" },
    { texte: "la" },
    { texte: "ravine" },
    { texte: "résistaient", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [8, 8], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 8, label: "commande", type: "accord" }],
  legende: "Six mots entre les deux, et c'est « cases » qui commande.",
});

const accordSujetInverse = phrase({
  mots: [
    { texte: "Sur" },
    { texte: "la" },
    { texte: "table" },
    { texte: "restaient", focus: true },
    { texte: "trois" },
    { texte: "livres", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [3, 3], label: "verbe" },
    { mots: [4, 5], label: "sujet" },
  ],
  liens: [{ de: 5, vers: 3, label: "commande", type: "accord" }],
  legende: "Le sujet est DERRIÈRE le verbe, et il commande quand même.",
});

const accordCollectif = phrase({
  mots: [
    { texte: "La" },
    { texte: "foule", focus: true },
    { texte: "des" },
    { texte: "spectateurs" },
    { texte: "se" },
    { texte: "pressait", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 5, label: "commande", type: "accord" }],
  legende: "« La foule » est singulier : « des spectateurs » ne commande rien.",
});

// ── L'oral et l'écrit : deux grammaires, pas une bonne et une mauvaise.
const oralNegation = phrase({
  mots: [
    { texte: "Je" },
    { texte: "sais" },
    { texte: "pas", focus: true },
    { texte: "où" },
    { texte: "il" },
    { texte: "est" },
    { texte: "parti" },
    { texte: "." },
  ],
  legende: "À l'oral, le « ne » tombe. Ce n'est pas une faute : c'est un usage.",
});

const ecritNegation = phrase({
  mots: [
    { texte: "Je" },
    { texte: "ne", focus: true },
    { texte: "sais" },
    { texte: "pas", focus: true },
    { texte: "où" },
    { texte: "il" },
    { texte: "est" },
    { texte: "parti" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 3], label: "négation" }],
  legende: "À l'écrit, la négation est complète : « ne … pas ».",
});

const oralReprise = phrase({
  mots: [
    { texte: "Le" },
    { texte: "film" },
    { texte: "," },
    { texte: "je" },
    { texte: "l'", focus: true },
    { texte: "ai" },
    { texte: "trouvé" },
    { texte: "nul" },
    { texte: "." },
  ],
  liens: [{ de: 4, vers: 1, label: "reprend", type: "reprise" }],
  legende: "Le mot est annoncé, puis repris par un pronom : c'est de l'oral.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammairePhrase4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "grammaire-phrase",
  titre: `Les groupes de la phrase et leurs fonctions en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Le vieux pêcheur » est un groupe nominal. Il l'est dans « le vieux pêcheur répara son filet », et il l'est encore dans « j'ai reconnu le vieux pêcheur ». Ce qui a changé entre les deux, ce n'est pas ce qu'il EST — c'est le rôle qu'il joue. La nature ne bouge jamais ; la fonction change à chaque phrase.",
  identite: [
    { label: "Mots clés", valeur: "Nature, fonction, groupe, sujet, complément, accord" },
    { label: "Le secret", valeur: "La nature ne change pas, la fonction change" },
    { label: "Outil", valeur: "Déplacer, supprimer, remplacer par un pronom" },
  ],
  definition: {
    texte:
      "Une phrase se découpe en GROUPES, et chaque groupe se décrit deux fois. Sa NATURE dit ce qu'il est, et elle se lit sur son mot principal : un nom au centre fait un groupe nominal, un verbe conjugué un groupe verbal, une préposition en tête un groupe prépositionnel, un adverbe seul un groupe adverbial. Sa FONCTION dit le rôle qu'il joue dans cette phrase-là : sujet, complément d'objet direct ou indirect, complément circonstanciel, attribut du sujet, complément du nom. La nature est une carte d'identité, la fonction est un emploi — et un même groupe peut changer d'emploi sans changer d'identité. Le sujet, lui, a un pouvoir que les autres n'ont pas : il commande l'accord du verbe, même quand il en est loin, même quand il est placé derrière.",
  },
  figure: {
    schema: pile(memeGroupeSujet, memeGroupeObjet),
    legende:
      "Le même groupe nominal dans deux phrases. En haut il est sujet, en bas complément d'objet — la couleur change parce que la fonction change, mais les trois mots sont exactement les mêmes. La nature est écrite en gris au-dessus : déterminant, adjectif, nom. Elle, elle ne bouge pas.",
  },
  proprietes: [
    {
      titre: "La nature se lit sur le mot noyau",
      texte:
        "Cherche le mot qu'on ne peut pas enlever : c'est lui qui donne la nature du groupe, et il ne change jamais de classe.",
      schema: pile(natureGroupeVerbal, natureGroupePrepositionnel, natureAdverbe),
      micros: ["4e_gram_constituants"],
    },
    {
      titre: "Un adverbe ne varie jamais",
      texte:
        "C'est sa marque : il ne s'accorde avec rien, ni en genre ni en nombre. « Franchement » s'écrit pareil partout.",
      schema: natureAdverbe,
      micros: ["4e_gram_constituants"],
    },
    {
      titre: "Direct ou indirect : c'est la préposition qui tranche",
      texte:
        "« Il répara son filet » : rien entre le verbe et le complément, il est direct. « Elle téléphona à sa sœur » : une préposition, il est indirect.",
      schema: pile(fonctionCod, fonctionCoi),
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "L'attribut dit ce que le sujet EST",
      texte:
        "Il passe par un verbe qui relie — être, sembler, devenir, paraitre — et il s'accorde avec le sujet, comme un adjectif.",
      schema: pile(fonctionAttribut, fonctionComplementNom),
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "Le sujet commande, même de loin",
      texte:
        "Six mots peuvent s'intercaler entre le sujet et le verbe : c'est toujours le sujet qui décide de la terminaison.",
      schema: pile(accordSujetLoin, accordSujetInverse),
      micros: ["4e_gram_accords"],
    },
    {
      titre: "Un mot singulier qui a l'air pluriel",
      texte:
        "« La foule des spectateurs », « chacun des élèves », « tout le monde » : le vrai sujet est singulier, et le complément qui le suit ne commande rien.",
      schema: accordCollectif,
      micros: ["4e_gram_accords"],
    },
    {
      titre: "L'oral a sa grammaire, et elle n'est pas fautive",
      texte:
        "Le « ne » qui tombe, le mot annoncé puis repris par un pronom, « on » à la place de « nous » : ce sont des usages de l'oral, à leur place à l'oral.",
      schema: pile(oralNegation, ecritNegation, oralReprise),
      micros: ["4e_gram_oral_ecrit"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui décide de la note d'une dictée, mais surtout de la clarté d'un message. « Les cases construites au bord de la ravine résistaient au vent » : six mots séparent le sujet du verbe, et c'est exactement là que la faute se glisse — on accorde avec « la ravine », le mot le plus proche, au lieu de « les cases ». Le cerveau garde le dernier nom entendu. Savoir retrouver le vrai sujet, c'est se protéger d'un automatisme, pas réciter une règle. Et cela sert bien au-delà de l'école : un compte rendu, une notice, un règlement mal accordé se lit mal, et parfois se comprend de travers.",
  },
  historique: {
    texte:
      "L'idée de « fonction » est récente à l'échelle de la grammaire. Jusqu'au XVIIIe siècle, on analysait une phrase française comme on analysait le latin : par les CAS — nominatif, accusatif, datif —, c'est-à-dire par la forme que prenait le mot. Or le français a perdu ses cas au Moyen Âge : « le pêcheur » s'écrit pareil qu'il soit sujet ou complément. Il a donc fallu inventer autre chose, et c'est l'ordre des mots plus les prépositions qui ont pris le relais. La notion de fonction nait de là : puisque la forme ne dit plus le rôle, c'est la place et les petits mots qui le disent. C'est pourquoi les manipulations — déplacer, supprimer, remplacer — sont la seule preuve possible en français, quand le latin se contentait de regarder la terminaison.",
  },
  formule: {
    contexte: "Les trois manipulations qui prouvent une fonction, au lieu de la deviner.",
    expression: "je déplace ? je supprime ? je remplace par un pronom ?",
    legende:
      "Un circonstanciel se déplace ET se supprime. Un complément d'objet direct ne se supprime pas, mais il se remplace par « le », « la » ou « les ». Un sujet ne fait ni l'un ni l'autre : il commande le verbe. Une fonction ne se devine pas, elle se prouve.",
    schema: pile(manipulationSupprime, manipulationSupprimeImpossible),
  },
  methode: [
    {
      titre: "Découper en groupes avant tout",
      texte:
        "Trouve les mots qui vont ensemble, puis le mot noyau de chaque paquet. Un nom au centre : groupe nominal. Une préposition en tête : groupe prépositionnel.",
      schema: pile(natureGroupePrepositionnel, natureAdverbe),
      micros: ["4e_gram_constituants"],
    },
    {
      titre: "Essayer de supprimer",
      texte:
        "Le groupe s'efface et la phrase tient encore ? C'est un circonstanciel. Elle ne veut plus rien dire ? C'est un complément d'objet.",
      schema: pile(manipulationSupprime, manipulationSupprimeImpossible),
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "Essayer de remplacer par un pronom",
      texte:
        "« Le », « la », « les » remplacent un objet direct. « Lui », « leur », « en », « y » remplacent un objet indirect. Le pronom trahit la fonction.",
      schema: pile(fonctionCod, fonctionCoi),
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "Pour l'accord : poser « qui est-ce qui ? » devant le verbe",
      texte:
        "Prends la réponse ENTIÈRE, et cherche son noyau. Puis regarde ce qui s'est glissé entre elle et le verbe : c'est presque toujours là qu'est le piège.",
      schema: pile(accordSujetLoin, accordCollectif),
      micros: ["4e_gram_accords"],
    },
    {
      titre: "Pour l'oral et l'écrit : le test du destinataire",
      texte:
        "Demande-toi si tu écrirais cette phrase telle quelle dans une rédaction. Si non, ce n'est pas qu'elle est fausse : c'est qu'elle appartient à l'oral.",
      schema: pile(oralNegation, ecritNegation),
      micros: ["4e_gram_oral_ecrit"],
    },
  ],
  usages: [
    {
      titre: "Pour se relire : chercher ce qui sépare le sujet du verbe",
      detail:
        "Un participe, une relative, un complément du nom entre les deux, et l'accord dérape. Barre l'intrus et relis.",
      schema: accordSujetLoin,
      micros: ["4e_gram_accords"],
    },
    {
      titre: "Pour écrire : déplacer un circonstanciel change le rythme",
      detail:
        "« Depuis une semaine, il pleut » n'a pas le même effet que « Il pleut depuis une semaine ». Le premier installe, le second constate.",
      schema: fonctionCirconstanciel,
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "Pour parler : savoir passer d'une grammaire à l'autre",
      detail:
        "Un exposé se dit à l'écrit dans la bouche : négation complète, questions par inversion. Une conversation, non — et c'est très bien ainsi.",
      schema: ecritNegation,
      micros: ["4e_gram_oral_ecrit"],
    },
  ],
  exemples: [
    {
      titre: "La nature du groupe",
      donnees: "« Nous rentrerons [avant la tombée de la nuit]. »",
      schema: natureGroupePrepositionnel,
      question: "Quelle est la NATURE du groupe entre crochets ?",
      solution:
        "Il s'ouvre par la préposition « avant » : c'est un groupe prépositionnel. Attention : sa nature ne dit pas encore son rôle — il se trouve qu'il est ici complément circonstanciel de temps, mais cela, c'est sa fonction.",
      micros: ["4e_gram_constituants"],
    },
    {
      titre: "Un adverbe, et rien d'autre",
      donnees: "« Il répondit [franchement] à la question posée. »",
      schema: natureAdverbe,
      question: "Quelle est la nature de ce groupe ?",
      solution:
        "Un seul mot, invariable : c'est un groupe adverbial. Mets la phrase au pluriel, au féminin, au passé — « franchement » ne bougera pas d'une lettre. C'est la marque de l'adverbe.",
      micros: ["4e_gram_constituants"],
    },
    {
      titre: "Direct ou indirect ?",
      donnees: "« Elle téléphona [à sa sœur] pour la prévenir. »",
      schema: fonctionCoi,
      question: "Quelle est la fonction du groupe entre crochets ?",
      solution:
        "Une préposition, « à », relie le groupe au verbe : c'est un complément d'objet INDIRECT. Le test du pronom le confirme : on dit « elle LUI téléphona », et non « elle la téléphona ».",
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "Prouver un circonstanciel",
      donnees: "« [Depuis le début de la semaine], il pleut sans arrêt. »",
      schema: pile(fonctionCirconstanciel, manipulationSupprime),
      question: "Comment prouver que c'est un complément circonstanciel ?",
      solution:
        "Deux manipulations, et il faut les deux. Je le déplace : « Il pleut sans arrêt depuis le début de la semaine » — la phrase tient. Je le supprime : « Il pleut sans arrêt » — elle tient encore. Un complément d'objet ne passerait ni l'une ni l'autre.",
      micros: ["4e_gram_fonctions"],
    },
    {
      titre: "Le sujet est loin",
      donnees: "« Les cases construites au bord de la ravine ___ au vent. » (résister, imparfait)",
      schema: accordSujetLoin,
      question: "Comment s'écrit le verbe ?",
      solution:
        "« Qui est-ce qui résistait ? » → « les cases », pluriel. Les six mots qui suivent — « construites au bord de la ravine » — ne sont qu'un écran : ils ne commandent rien. On écrit « résistaient ».",
      micros: ["4e_gram_accords"],
    },
    {
      titre: "Un collectif singulier",
      donnees: "« La foule des spectateurs ___ vers la sortie. » (se presser, imparfait)",
      schema: accordCollectif,
      question: "Singulier ou pluriel ?",
      solution:
        "Le noyau du sujet est « la foule », singulier. « Des spectateurs » n'est qu'un complément du nom, et un complément du nom ne commande jamais l'accord du verbe. On écrit « se pressait ».",
      micros: ["4e_gram_accords"],
    },
    {
      titre: "Oral ou écrit ?",
      donnees: "« Le film, je l'ai trouvé nul. »",
      schema: oralReprise,
      question: "À quel usage cette phrase appartient-elle, et pourquoi ?",
      solution:
        "« Le film » est annoncé en tête, puis repris par le pronom « l' » : c'est une construction de l'ORAL, et elle y est parfaitement correcte. À l'écrit, on écrirait « J'ai trouvé ce film nul ». Ni l'une ni l'autre n'est fautive — elles ne s'emploient simplement pas dans la même situation.",
      micros: ["4e_gram_oral_ecrit"],
    },
  ],
  pieges: [
    "Confondre nature et fonction : « groupe nominal » est une nature, « sujet » est une fonction. Un même groupe garde sa nature et change de fonction.",
    "Accorder le verbe avec le mot le plus proche : dans « les cases construites au bord de la ravine », c'est « cases » qui commande, pas « ravine ».",
    "Oublier que le sujet peut être derrière : « Sur la table restaient trois livres » — le sujet est « trois livres ».",
    "Prendre un collectif pour un pluriel : « la foule des spectateurs » est singulier, « chacun des élèves » aussi.",
    "Croire qu'un complément qui se déplace est forcément circonstanciel : il faut AUSSI pouvoir le supprimer.",
    "Traiter une forme orale comme une faute : « je sais pas » n'est pas une erreur de grammaire, c'est une autre grammaire, à sa place à l'oral.",
  ],
  aRetenir: [
    "La NATURE dit ce que le groupe est, et elle se lit sur son mot noyau. Elle ne change jamais.",
    "La FONCTION dit le rôle joué dans cette phrase-là. Elle change d'une phrase à l'autre.",
    "Trois manipulations pour prouver une fonction : déplacer, supprimer, remplacer par un pronom.",
    "Le sujet commande l'accord même de loin, même derrière le verbe, même quand il a l'air pluriel.",
    "L'oral et l'écrit ont deux grammaires. Aucune n'est fautive : chacune a sa situation.",
  ],
  entrainement: [
    {
      question: "« Je sais [qu'il ne viendra pas ce soir]. » Nature du groupe entre crochets ?",
      correction: "Une proposition subordonnée : elle a son propre verbe conjugué.",
      micros: ["4e_gram_constituants"],
    },
    {
      question: "« Le bruit [des vagues] l'empêchait de dormir. » Fonction du groupe ?",
      correction: "Complément du nom : il complète « le bruit », jamais le verbe.",
      micros: ["4e_gram_fonctions"],
    },
    {
      question: "« Après l'orage, le ciel demeura [étrangement clair]. » Fonction ?",
      correction: "Attribut du sujet : « demeurer » relie, et le groupe dit ce que le ciel est.",
      micros: ["4e_gram_fonctions"],
    },
    {
      question: "« Chacun des élèves ___ son cahier. » (ranger, présent)",
      correction: "range — le sujet est « chacun », singulier ; « des élèves » est un complément.",
      micros: ["4e_gram_accords"],
    },
    {
      question: "« Le courage et la patience ___ nécessaires. » (être, présent)",
      correction: "sont — deux sujets coordonnés par « et » commandent le pluriel.",
      micros: ["4e_gram_accords"],
    },
    {
      question: "« Où êtes-vous allés hier soir ? » Oral ou écrit ?",
      correction: "Écrit : la question inverse le sujet et le verbe, ce que l'oral fait rarement.",
      micros: ["4e_gram_oral_ecrit"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesGrammairePhrase4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Groupes et fonctions - 4e",
    section: {
      type: "objectif",
      phrase: "Ne plus confondre ce qu'un groupe EST et ce qu'il FAIT",
      sousPhrase:
        "Sa nature ne change jamais. Sa fonction change à chaque phrase — et elle se prouve, elle ne se devine pas.",
      encadre: {
        titre: "L'idée",
        texte: "« Le vieux pêcheur » est un groupe nominal partout. Sujet ici, complément là.",
      },
    },
  },
  {
    titre: "Le même groupe, deux fonctions",
    badge: "Groupes et fonctions - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "« Le vieux pêcheur répara son filet. »",
        contenu: "Groupe nominal, fonction SUJET.",
      },
      droite: {
        titre: "« J'ai reconnu le vieux pêcheur. »",
        contenu: "Le même groupe nominal, fonction COMPLÉMENT D'OBJET.",
      },
    },
    schema: pile(memeGroupeSujet, memeGroupeObjet),
  },
  {
    titre: "Trois manipulations, jamais l'intuition",
    badge: "Groupes et fonctions - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je le DÉPLACE : s'il bouge sans casser la phrase, c'est un circonstanciel.",
        "Je le SUPPRIME : s'il s'efface et que la phrase tient, c'est confirmé.",
        "Je le REMPLACE par un pronom : « le, la, les » → objet direct ; « lui, leur, en, y » → objet indirect.",
        "Rien de tout cela, et le verbe s'accorde avec lui ? C'est le sujet.",
      ],
    },
    schema: pile(manipulationSupprime, manipulationSupprimeImpossible),
  },
  {
    titre: "Le sujet commande, même de loin",
    badge: "Groupes et fonctions - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Un écran entre les deux", texte: "« Les cases construites au bord de la ravine résistaient. » Six mots, et c'est « cases » qui décide." },
        { titre: "Un sujet inversé", texte: "« Sur la table restaient trois livres. » Le sujet est derrière, il commande quand même." },
        { titre: "Un collectif", texte: "« La foule des spectateurs se pressait. » Singulier, malgré le sens." },
      ],
    },
    schema: pile(accordSujetLoin, accordSujetInverse, accordCollectif),
  },
  {
    titre: "Deux grammaires, pas une bonne et une mauvaise",
    badge: "Groupes et fonctions - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "À l'oral",
        contenu: "« Je sais pas où il est parti. » Le « ne » tombe. C'est un usage, pas une faute.",
      },
      droite: {
        titre: "À l'écrit",
        contenu: "« Je ne sais pas où il est parti. » La négation est complète.",
      },
    },
    schema: pile(oralNegation, ecritNegation),
  },
  {
    titre: "À vous",
    badge: "Groupes et fonctions - 4e",
    section: {
      type: "exercice",
      enonce: "« Les cases construites au bord de la ravine ___ au vent. » (résister, imparfait)",
      question: "Comment s'écrit le verbe, et pourquoi ?",
      indice: "Pose « qui est-ce qui ? » devant le verbe, et prends la réponse entière.",
      correction:
        "« Qui est-ce qui résistait ? » → « les cases », pluriel. Les six mots qui suivent ne sont qu'un écran. On écrit « résistaient ».",
    },
    schema: accordSujetLoin,
  },
];
