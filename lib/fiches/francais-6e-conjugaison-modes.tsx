// ─── Fiche de cours : l'impératif et le conditionnel présent (6e) ─────────────
// TROISIÈME FICHE DE CONJUGAISON DE LA 6e, et la seule qui ouvre des MODES.
// Les deux précédentes restaient dans l'indicatif — le mode qui dit ce qui est.
// Celle-ci en sort : l'impératif dit ce qu'on demande, le conditionnel dit ce
// qui serait. Ce ne sont plus d'autres moments, ce sont d'autres façons de dire.
//
// ⭐ CE QUE LE BO NOMME, ET QU'IL FAUT PRENDRE AU MOT. « Conjugaisons à mémoriser
// et à maîtriser : impératif présent, conditionnel présent des verbes ÊTRE et
// AVOIR, des verbes des PREMIER ET DEUXIÈME GROUPES, des verbes irréguliers du
// troisième groupe : FAIRE, ALLER, DIRE, VENIR, POUVOIR, VOIR, VOULOIR,
// PRENDRE. » La liste est fermée, et la fiche s'y tient : être, faire, venir,
// aimer, ranger, lire — les verbes de la banque, pris dans cette liste.
//
// ⭐ ET UN SECOND OBJECTIF, QUI EST CELUI DU DESSIN : « Identifier les MARQUES DE
// TEMPS pour le conditionnel présent et l'impératif présent ». Pas « conjuguer » :
// identifier les marques. Le canvas `conjugaison` est fait pour cela — « je
// chanterais » se démonte en quatre wagons, et l'on voit de ses yeux que le
// conditionnel emprunte le « r » au futur et la fin à l'imparfait.
//
// ⚠️ LE WAGON QUI PORTE TOUTE LA FICHE EST UN « s ». « je viendrai » et « je
// viendrais » ne diffèrent que par lui, et la différence est celle entre ce qui
// aura lieu et ce qui aurait lieu. C'est pour cela qu'il porte `alerte` : il
// n'est pas une lettre de plus, c'est le mode entier.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `conjugaison_modes`), sur les items 6e_fr_fixed_mode_1 à 5 de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts, et sur le pool
// IMPERATIF_CONDITIONNEL de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 3 de la notion, défi compris) :
// - 6e_conj_imperatif_conditionnel → définition, figure, propriétés « L'ordre »,
//                                    « Trois personnes » et « Ce qui serait »,
//                                    méthodes 1 et 2, usages, exemples 1 à 3,
//                                    pièges 1 et 2, entraînements 1 à 3
// - 6e_conj_marques_conditionnel   → propriétés « Le r du futur, la fin de
//                                    l'imparfait » et « Un s les sépare »,
//                                    formule, méthode 3, exemple 4, piège 3,
//                                    entraînements 4 et 5
// - 6e_conj_imperatif_defi         → le défi, dessiné (exemple 5)
//
// Les formes sont CELLES DE LA BANQUE : « Ferme la porte », « Range ton
// cartable », « Fais tes devoirs », « Soyez prudents », « Aide-moi », « Si
// j'avais le temps, je viendrais avec toi », « J'aimerais venir avec toi »,
// « Nous aimerions partir plus tôt », « Si j'avais le temps, je lirais ce
// livre ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.
// ⚠️ « je chanterais » fait quatre wagons, donc 290 px : c'est le dessin le plus
// large de la fiche, et il sort à 11,7 px dans une carte de propriété. Un
// cinquième wagon ne passerait pas.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { ConjugaisonLigne, ConjugaisonSegment } from "@/lib/tutor-v4/types";

// Le helper commun aux quatre fiches de conjugaison. Il n'écrit JAMAIS de
// couleur : `role: "temps"` suffit, et la palette du canvas fait le reste.
function train(opts: {
  infinitif?: string;
  pronom?: string;
  segments: ConjugaisonSegment[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        infinitif: opts.infinitif,
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

function tableau(opts: { temps: string; lignes: ConjugaisonLigne[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "tableau",
        temps: opts.temps,
        lignes: opts.lignes,
        legende: opts.legende,
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

// ─── Les formes de la banque, démontées ───────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE. « je viendrais » est la forme du pool
// IMPERATIF_CONDITIONNEL : « Si j'avais le temps, je ___ avec toi. »
const trainReference = train({
  infinitif: "venir",
  pronom: "je",
  segments: [
    { texte: "viendr", role: "radical", note: "futur" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "je" },
  ],
  legende: "Le futur devant, l'imparfait derrière.",
});

// LE COUPLE QUI DIT TOUT. Même verbe, même personne : un « s » les sépare, et
// c'est le mode entier qui bascule.
const trainFutur = train({
  infinitif: "venir",
  pronom: "je",
  segments: [
    { texte: "viendr", role: "radical", note: "futur" },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "« je viendrai » : c'est certain.",
});

const trainConditionnel = train({
  infinitif: "venir",
  pronom: "je",
  segments: [
    { texte: "viendr", role: "radical", note: "futur" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "je", alerte: true },
  ],
  legende: "Un « s » de plus, et rien n'est sûr.",
});

// LES DEUX MARQUES, SÉPARÉES. C'est l'item 6e_fr_fixed_mode_4 rendu visible :
// « il joint le -r- du futur aux terminaisons de l'imparfait ».
const trainDeuxMarques = train({
  infinitif: "chanter",
  pronom: "je",
  segments: [
    { texte: "chante", role: "radical", note: "radical" },
    { texte: "r", role: "temps", note: "futur", alerte: true },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "je" },
  ],
  legende: "Le « r » du futur, puis « -ais ».",
});

const trainAimerions = train({
  infinitif: "aimer",
  pronom: "nous",
  segments: [
    { texte: "aimer", role: "radical", note: "futur" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "« aimerons » serait le futur.",
});

// L'IMPÉRATIF N'A PAS DE PRONOM — et c'est un dessin, pas une phrase : le
// wagon du sujet manque, on le voit.
const trainImperatif = train({
  infinitif: "ranger",
  segments: [
    { texte: "Rang", role: "radical", note: "radical" },
    { texte: "e", role: "personne", note: "2e sg", alerte: true },
  ],
  legende: "Pas de sujet, et pas de « s ».",
});

const trainImperatifEtre = train({
  infinitif: "être",
  segments: [
    { texte: "Soy", role: "radical", note: "être" },
    { texte: "ez", role: "personne", note: "2e pl" },
  ],
  legende: "sois, soyons, soyez.",
});

const trainImperatifFaire = train({
  infinitif: "faire",
  segments: [
    { texte: "Fai", role: "radical", note: "faire" },
    { texte: "s", role: "personne", note: "2e sg" },
  ],
  legende: "fais, faisons, faites.",
});

// L'IMPÉRATIF EN ENTIER : trois personnes, et pas une de plus. Le tableau est le
// seul mode qui empile, et c'est ici qu'il faut empiler — ce qui frappe, c'est
// que les six lignes habituelles ne sont que trois.
const tableauImperatif = tableau({
  temps: "chanter, à l'impératif",
  lignes: [
    { pronom: "2e sg", radical: "chant", terminaison: "e", alerte: true },
    { pronom: "1re pl", radical: "chant", terminaison: "ons" },
    { pronom: "2e pl", radical: "chant", terminaison: "ez" },
  ],
  legende: "Trois personnes, aucun sujet écrit.",
});

const tableauConditionnel = tableau({
  temps: "aimer, au conditionnel",
  lignes: [
    { pronom: "j'", radical: "aimer", terminaison: "ais" },
    { pronom: "tu", radical: "aimer", terminaison: "ais" },
    { pronom: "il", radical: "aimer", terminaison: "ait" },
    { pronom: "nous", radical: "aimer", terminaison: "ions" },
    { pronom: "vous", radical: "aimer", terminaison: "iez" },
    { pronom: "ils", radical: "aimer", terminaison: "aient" },
  ],
  legende: "Le « r » reste, la fin change.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Item 6e_fr_fixed_mode_5 :
// « Si j'avais le temps, je ___ ce livre. »
const trainDefi = train({
  infinitif: "lire",
  pronom: "je",
  segments: [
    { texte: "lir", role: "radical", note: "futur" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "je" },
  ],
  legende: "« lirai » serait le futur.",
});

const pieges = [
  "Écrire « Ranges ta chambre ! » : à l'impératif, les verbes en -er ne prennent pas de « s » à la 2e personne du singulier. On écrit « Range », « Mange », « Va ». Le « s » ne revient que devant « en » ou « y » : « Manges-en ! ».",
  "Mettre un pronom sujet devant un impératif : « Tu viens ! » est un présent de l'indicatif, pas un ordre. « Viens ! » est l'impératif — c'est justement l'absence de sujet qui le signale.",
  "Confondre « je viendrai » et « je viendrais » : un « s » sépare ce qui aura lieu de ce qui aurait lieu. Le test : remplace par « nous » — « nous viendrons » (futur) ou « nous viendrions » (conditionnel).",
  "Chercher six personnes à l'impératif : il n'en a que trois — la 2e du singulier, la 1re et la 2e du pluriel. On ne donne un ordre ni à soi seul, ni à quelqu'un d'absent.",
];

const aRetenir = [
  "L'impératif présent donne un ordre ou un conseil : il n'a que trois personnes et ne s'écrit jamais avec un pronom sujet.",
  "Le conditionnel présent dit ce qui se passerait sous condition : radical du futur + terminaisons de l'imparfait.",
  "« je viendrai » est au futur, « je viendrais » au conditionnel : un seul « s » les sépare.",
];

export const ficheConjugaisonModes6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "conjugaison-modes",
  titre: "L'impératif et le conditionnel présent",
  accroche:
    "« je viendrai » et « je viendrais ». Une lettre d'écart, et deux choses très différentes : dans un cas je viens, dans l'autre je viendrais si je pouvais. Un « s » peut porter tout un mode.",
  identite: [
    { label: "Mots clés", valeur: "Mode, impératif présent, conditionnel présent, condition" },
    { label: "Le secret", valeur: "Un mode ne dit pas QUAND, il dit COMMENT on dit la chose" },
    { label: "Outil", valeur: "Démonter la terminaison pour retrouver les deux marques" },
  ],
  definition: {
    texte:
      "Un mode dit la façon dont on présente l'action. L'indicatif la donne pour vraie ; l'impératif présent la demande — c'est un ordre ou un conseil, il n'a que trois personnes et jamais de pronom sujet ; le conditionnel présent la donne comme possible, sous condition. Le conditionnel se fabrique en collant deux morceaux déjà connus : le radical du futur, avec son « r », et les terminaisons de l'imparfait.",
  },
  figure: {
    schema: trainReference,
    legende:
      "« je viendrais ». Le premier wagon, « viendr- », est le radical du FUTUR : c'est celui de « je viendrai ». Le deuxième, « -ai- », est la marque de l'IMPARFAIT. Le troisième, « -s », dit la personne. Le conditionnel n'invente rien : il emprunte le devant du futur et l'arrière de l'imparfait.",
  },
  proprietes: [
    {
      titre: "L'impératif donne un ordre",
      texte: "« Ferme la porte. » On ne raconte pas, on demande — et le sujet ne s'écrit pas.",
      schema: trainImperatif,
    },
    {
      titre: "Il n'a que trois personnes",
      texte: "La 2e du singulier, la 1re et la 2e du pluriel. Pas de « je », pas de « il », pas de « ils ».",
      schema: tableauImperatif,
    },
    {
      titre: "Les verbes en -er ne prennent pas de « s »",
      texte: "« Range ! », « Mange ! », « Va ! » — sauf devant « en » ou « y » : « Manges-en ! ».",
      schema: pile(trainImperatif, trainImperatifFaire),
    },
    {
      titre: "Le conditionnel dit ce qui SERAIT",
      texte: "« Si j'avais le temps… » : la condition d'abord, le conditionnel ensuite.",
      schema: tableauConditionnel,
    },
    {
      titre: "Le « r » du futur, la fin de l'imparfait",
      texte: "C'est la marque du conditionnel : deux morceaux empruntés, collés l'un derrière l'autre.",
      schema: trainDeuxMarques,
    },
    {
      titre: "Un « s » sépare les deux",
      texte: "« je viendrai » aura lieu ; « je viendrais » aurait lieu. Rien d'autre ne change.",
      schema: pile(trainFutur, trainConditionnel),
    },
  ],
  reel: {
    texte:
      "Ces deux modes décident du ton d'une phrase. Une recette, une notice, une consigne d'exercice, un panneau : tout est à l'impératif — « mélangez », « appuyez », « souligne le verbe ». Et dès qu'il s'agit de demander quelque chose à quelqu'un, le conditionnel remplace l'impératif pour adoucir : « Donne-moi ce livre » devient « Je voudrais ce livre », « Pourriez-vous m'aider ? ». Savoir passer de l'un à l'autre, c'est savoir choisir entre exiger et demander.",
  },
  historique: {
    texte:
      "Le conditionnel est le petit frère du futur, et ils sont nés de la même façon. En latin populaire, « je chanterai » se disait « cantare habeo » — « j'ai à chanter ». Et « je chanterais » se disait « cantare habebam » — « j'AVAIS à chanter ». Le même verbe avoir, une fois au présent, une fois à l'imparfait. Voilà pourquoi le conditionnel porte le « r » du futur et se termine comme un imparfait : ce n'est pas une bizarrerie, c'est sa naissance.",
  },
  formule: {
    contexte: "La fabrication du conditionnel présent.",
    expression: "radical du futur + terminaisons de l'imparfait",
    legende:
      "Je pars du futur : « je chanterai », donc le radical est « chanter- », avec son « r ». Je remplace la fin par celle de l'imparfait : -ais, -ais, -ait, -ions, -iez, -aient. J'obtiens « je chanterais ». Et le test qui tranche à coup sûr : mets « nous ». « nous chanterons » ? c'était le futur. « nous chanterions » ? c'était le conditionnel.",
    schema: pile(trainDeuxMarques, trainAimerions),
  },
  methode: [
    {
      titre: "Je regarde s'il y a un sujet",
      texte: "Pas de pronom devant le verbe, et une demande : c'est l'impératif.",
      schema: trainImperatifEtre,
    },
    {
      titre: "Je cherche le « r » du futur",
      texte: "Un « r » avant la terminaison : je suis au futur ou au conditionnel, pas ailleurs.",
      schema: trainDeuxMarques,
    },
    {
      titre: "Je remplace par « nous »",
      texte: "« nous viendrons » ? c'était le futur. « nous viendrions » ? c'était le conditionnel.",
      schema: pile(trainFutur, trainConditionnel),
    },
  ],
  usages: [
    {
      titre: "Donner un ordre",
      detail: "« Range ton cartable ! », « Fais tes devoirs. » — impératif, sans pronom sujet.",
      schema: trainImperatifFaire,
    },
    {
      titre: "Donner un conseil",
      detail: "« Soyez prudents ! » : le même mode, mais on protège au lieu d'exiger.",
      schema: trainImperatifEtre,
    },
    {
      titre: "Poser une condition",
      detail: "« Si j'avais le temps, je viendrais. » — l'imparfait pose, le conditionnel conclut.",
      schema: trainConditionnel,
    },
  ],
  exemples: [
    {
      titre: "Reconnaître un impératif",
      donnees: "« Ferme la porte. »",
      schema: trainImperatif,
      question: "À quel mode est ce verbe, et à quoi le voit-on ?",
      solution:
        "À l'impératif présent. Deux indices, et ils vont ensemble : le verbe demande quelque chose, et il n'a pas de sujet écrit. « Tu fermes la porte » serait un présent de l'indicatif, qui raconte ; « Ferme la porte » est un ordre.",
    },
    {
      titre: "L'impératif des verbes en -er",
      donnees: "« ___ ton cartable ! » (ranger, 2e personne du singulier)",
      schema: pile(trainImperatif, trainImperatifFaire),
      question: "Écrit-on « Range » ou « Ranges » ?",
      solution:
        "« Range », sans « s ». À l'impératif, les verbes du premier groupe perdent le « s » de la 2e personne du singulier — alors qu'au présent on écrit « tu ranges ». Le « s » ne revient que devant « en » ou « y » : « Manges-en ! ». Les autres verbes, eux, le gardent : « Fais tes devoirs. »",
    },
    {
      titre: "Le conditionnel après une condition",
      donnees: "« Si j'avais le temps, je ___ avec toi. » (venir)",
      schema: trainConditionnel,
      question: "Quelle forme faut-il ?",
      solution:
        "« viendrais ». La première partie de la phrase pose une condition à l'imparfait — « si j'avais » —, donc la seconde se met au conditionnel présent. « je viendrai », au futur, dirait que je viens pour de bon : or rien n'est certain ici, tout dépend du temps que j'aurai.",
    },
    {
      titre: "La marque du conditionnel",
      donnees: "« Nous ___ partir plus tôt. » (aimer)",
      schema: pile(trainAimerions, tableauConditionnel),
      question: "Entre « aimerons », « aimions » et « aimerions », laquelle est au conditionnel ?",
      solution:
        "« aimerions ». « aimerons » n'a que le « r » du futur ; « aimions » n'a que la fin de l'imparfait ; « aimerions » a les deux, et c'est exactement cela, le conditionnel. Le mot est plus long parce qu'il porte deux marques au lieu d'une.",
    },
    {
      titre: "Le défi",
      donnees: "« Si j'avais le temps, je ___ ce livre. » (lire)",
      schema: trainDefi,
      question: "À quel mode faut-il conjuguer, et pourquoi ?",
      solution:
        "« je lirais », au conditionnel présent. Le « si » suivi d'un imparfait annonce une condition, et la conséquence se met au conditionnel. On le fabrique avec le radical du futur, « lir- », et la terminaison d'imparfait « -ais ». « lirai » serait le futur, « lisais » l'imparfait : aucun des deux ne dit une condition.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Ferme la porte. » Ce verbe est à quel mode ?",
      correction:
        "À l'impératif présent. Il donne un ordre et se conjugue sans sujet exprimé — c'est ce qui le distingue du présent de l'indicatif.",
    },
    {
      question: "« ___ prudents ! » (être, impératif, 2e personne du pluriel)",
      correction:
        "« Soyez ». Le verbe être a un impératif à lui : sois, soyons, soyez. Ni « Soyer », qui n'existe pas, ni « Êtes », qui est l'indicatif.",
    },
    {
      question: "Combien de personnes l'impératif présent a-t-il ?",
      correction:
        "Trois : la 2e du singulier, la 1re et la 2e du pluriel. Rien d'autre — on ne donne un ordre ni à soi seul, ni à quelqu'un qui n'est pas là.",
    },
    {
      question: "Comment reconnaître le conditionnel présent à sa terminaison ?",
      correction:
        "Il joint le « r » du futur aux terminaisons de l'imparfait : je chante-R-ais. Le « r », puis « -ais ». Deux marques, et non une seule.",
    },
    {
      question: "Quelle différence entre « je viendrai » et « je viendrais » ?",
      correction:
        "« viendrai » est au futur — je viens, c'est prévu. « viendrais » est au conditionnel — je viendrais si quelque chose le permettait. Un « s » sépare ce qui aura lieu de ce qui aurait lieu.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesConjugaisonModes6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Impératif & conditionnel - 6e",
    section: {
      type: "objectif",
      phrase: "Un mode ne dit pas quand, il dit comment",
      sousPhrase:
        "L'indicatif raconte, l'impératif demande, le conditionnel suppose. Trois façons de présenter la même action.",
      encadre: {
        titre: "L'idée",
        texte: "Entre « je viendrai » et « je viendrais », il y a un « s » — et tout un mode.",
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
          "Une recette, une notice, une consigne, un panneau : tout est à l'impératif. Et pour demander sans exiger, le conditionnel prend le relais — « Pourriez-vous m'aider ? » au lieu de « Aidez-moi ».",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le conditionnel est le petit frère du futur. « cantare habeo » (j'ai à chanter) a donné « je chanterai » ; « cantare habebam » (j'avais à chanter) a donné « je chanterais ». Le même verbe avoir, une fois au présent, une fois à l'imparfait.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonModes6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "L'impératif : ce qui manque le signale",
    badge: "Impératif présent",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on écrit trop",
        contenu:
          "« Tu ranges ta chambre ! » avec un sujet, ou « Ranges ! » avec un « s ». Les deux sortent de l'impératif.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'il faut",
        contenu:
          "« Range ! » — pas de pronom sujet, et pas de « s » pour les verbes en -er. Trois personnes seulement : range, rangeons, rangez.",
      },
    },
  },
  {
    titre: "Le conditionnel emprunte tout",
    badge: "Ses deux marques",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au futur",
        contenu:
          "« je chanterai » : le radical « chanter- » porte le « r », et la terminaison est celle d'avoir au présent.",
      },
      droite: {
        variante: "ok",
        titre: "Au conditionnel",
        contenu:
          "« je chanterais » : le même « r », mais la terminaison de l'imparfait. Deux marques dans un seul mot — c'est cela, sa marque.",
      },
    },
  },
  {
    titre: "Poser une condition",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Si j'avais le temps, je ___ avec toi. » (venir)",
      question: "« viendrai » ou « viendrais » ?",
      correction:
        "« viendrais ». « si » + imparfait pose une condition : la conséquence se met au conditionnel. « viendrai » dirait que je viens pour de bon.",
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
      enonce: "« Si j'avais le temps, je ___ ce livre. » (lire)",
      question: "À quel mode faut-il conjuguer, et pourquoi ?",
      indice: "Regarde le début de la phrase : « si » suivi d'un imparfait. Que peut-il annoncer ?",
      correction:
        "« je lirais », au conditionnel présent : radical du futur « lir- » + terminaison d'imparfait « -ais ». « lirai » serait le futur.",
    },
  },
];
