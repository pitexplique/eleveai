// ─── Fiche de cours : les temps, les modes, et ce qu'ils expriment (4e) ───────
// LA DIXIÈME FICHE DE FRANÇAIS DE LA 4e. Elle referme la conjugaison, ouverte
// par `francais-4e-conjugaison-formes.tsx`.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. Deux objectifs y sont réunis :
// « Maitriser l'emploi des temps et des modes » et « mettre en évidence le lien
// entre le temps employé et le sens ».
//
// ⛔⛔ DANS CE PROGRAMME, LE CONDITIONNEL EST UN MODE — « mode conditionnel
// présent, passé ». C'est l'INVERSE du texte de 2026 suivi par la 5e. Ne pas
// harmoniser : la 4e n'y bascule qu'en septembre 2027.
//
// ⭐ LE PARTAGE AVEC LA FICHE DES FORMES, à ne pas brouiller :
//     `conjugaison-formes` → COMMENT une forme est FABRIQUÉE (radical,
//                            terminaison, modes personnels, irréguliers).
//     celle-ci             → LAQUELLE CHOISIR, et CE QU'ELLE DIT.
// Les deux se citent l'une l'autre, et aucune ne refait le travail de l'autre.
//
// ⭐⭐ LE QUATRIÈME MODE DU CANVAS `conjugaison` SERT ENFIN : `frise`. Le
// catalogue le réserve à « passé / présent / futur, pour la valeur des temps » —
// c'est exactement l'objet de cette fiche, et aucune autre ne l'avait employé.
// Une action qui dure et une action qui rompt ne se racontent pas : elles se
// placent, et la frise les place.
//
// ⭐ ET LA MICRO ÉCRITE HIER Y TROUVE SA PLACE : `4e_conj_valeurs_conditionnel`
// (« Reconnaitre ce que le conditionnel exprime »), ajoutée le 25/08 parce que
// le coach ne savait que le FORMER. Sa valeur d'information non confirmée est
// le cœur du questionnement de 4e « Informer, s'informer, déformer ? ».
//
// Alignée sur les tables SUBJONCTIF, CONDITIONNEL, COMPOSES, VALEURS et
// CONDITIONNEL_VALEURS de lib/tutor-v4/questionBank/4e/francais/conjugaison.bank.ts,
// et sur la table EMPLOYER de socle-grammaire-conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 3 de `conjugaison_temps` et les 3 de
// `conjugaison_valeurs`) :
// - 4e_conj_subjonctif             → propriétés 1 et 2, méthode 1, exemple 1
// - 4e_conj_conditionnel           → propriété 3, méthode 2, exemple 2
// - 4e_conj_temps_composes         → propriété 4, méthode 3, exemple 3
// - 4e_conj_employer               → formule, méthode 4, exemples 4 et 5
// - 4e_conj_valeurs_aspect         → figure, propriétés 5 et 6, exemple 6
// - 4e_conj_valeurs_conditionnel   → propriété 7, méthode 5, exemple 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION, tous payés le 26/08 : pas de `titre` sur
// un dessin ; pas de markdown dans un texte de bloc ; pas de champ `infinitif`
// sur un canvas détourné ; et LE RENDU SE REGARDE.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonSegment,
  PhraseCanvasGroupe,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

/** La forme démontée : radical + terminaison. */
function wagons(opts: {
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

/** Les deux caisses d'un temps composé. */
function composee(opts: {
  pronom?: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "composee",
        pronom: opts.pronom,
        auxiliaire: opts.auxiliaire,
        participe: opts.participe,
        legende: opts.legende,
      }}
    />
  );
}

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
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

// ─── Ce que les temps font, placé sur une frise ───────────────────────────────

/* ⛔⛔ LA FRISE A ÉTÉ ESSAYÉE ET ÉCARTÉE, ET C'EST UNE LIMITE DU CANVAS, PAS UN
   CHOIX. Le catalogue réserve le mode `frise` à « la valeur des temps » — donc
   exactement à cette fiche. Mesuré le 26/08 : sa largeur se calcule
   `w = max(size.width, 3 × (largeurRepère + 6) + marges)`, si bien que
   `size.width` n'est qu'un PLANCHER, jamais un plafond. Même avec des repères
   de deux mots, les trois zones imposent environ 254 px — or le bloc d'une
   fiche en fait 226 sur un téléphone de 375. Les lettres y tombent à 10,6 px,
   sous le plancher de 11 de REGLES.md § 2 quater, et RIEN dans la fiche ne peut
   le corriger.
   ⚠️ Le correctif appartient à `lib/canvas/ConjugaisonCanvas.tsx`, fichier
   PARTAGÉ entre les trois sessions : à signaler à Frédéric, pas à modifier ici.
   En attendant, `phrase` fait le travail — les deux temps portent leur étiquette
   et se voient dans la même phrase, ce qui est même plus proche du texte réel
   qu'une ligne du temps abstraite. */
const tempsRecit = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pleuvait", focus: true },
    { texte: "quand" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "claqua", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "imparfait" },
    { mots: [5, 5], label: "passé simple" },
  ],
  legende: "L'imparfait étend le décor ; le passé simple le perce et fait avancer.",
});

const tempsAccompli = phrase({
  mots: [
    { texte: "Quand" },
    { texte: "il" },
    { texte: "eut fini", focus: true },
    { texte: "," },
    { texte: "il" },
    { texte: "se leva", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 2], label: "déjà accompli" },
    { mots: [5, 5], label: "vient ensuite" },
  ],
  legende: "Le temps composé dit ce qui était DÉJÀ fait au moment de l'autre.",
});

const tempsFuturAnterieur = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "aurons terminé", focus: true },
    { texte: "avant" },
    { texte: "qu'il" },
    { texte: "arrive", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "accompli d'abord" },
    { mots: [4, 4], label: "ensuite" },
  ],
  legende: "La même relation, projetée dans le futur.",
});

// ── LE SUBJONCTIF : sa base, et ce qui le commande.
const subjonctifBase = wagons({
  infinitif: "venir",
  pronom: "qu'il",
  segments: [
    { texte: "vienn", role: "radical", note: "base du « ils » du présent", alerte: true },
    { texte: "e", role: "temps", note: "subjonctif présent" },
  ],
  legende: "La base vient de « ils viennent ». On l'y retrouve toujours.",
});

const subjonctifCommande = phrase({
  mots: [
    { texte: "Il" },
    { texte: "faut" },
    { texte: "que", focus: true },
    { texte: "tu" },
    { texte: "rentres", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "subordonnée" }],
  legende: "« Il faut que » ferme la question : subjonctif, jamais indicatif.",
});

const subjonctifPiege = phrase({
  mots: [
    { texte: "que" },
    { texte: "nous" },
    { texte: "fassions", focus: true },
    { texte: "·" },
    { texte: "nous" },
    { texte: "faisions", focus: true },
  ],
  legende: "« Fassions » est le subjonctif ; « faisions » est l'imparfait.",
});

// ── LE CONDITIONNEL : un MODE dans ce programme, avec un présent et un passé.
const conditionnelPresent = wagons({
  infinitif: "pouvoir",
  pronom: "ils",
  segments: [
    { texte: "pourr", role: "radical", note: "radical du futur", alerte: true },
    { texte: "aient", role: "temps", note: "terminaison d'imparfait" },
  ],
  legende: "Radical du futur, terminaison d'imparfait : c'est la recette.",
});

const conditionnelPasse = composee({
  pronom: "j'",
  auxiliaire: { texte: "aurais", note: "conditionnel présent" },
  participe: { texte: "dû", note: "participe passé" },
  legende: "Le conditionnel passé est un temps composé du mode conditionnel.",
});

// ── LES TEMPS COMPOSÉS : l'auxiliaire porte le temps.
const composePasse = composee({
  pronom: "elle",
  auxiliaire: { texte: "a", note: "avoir au présent" },
  participe: { texte: "écrit", note: "participe" },
  legende: "Auxiliaire au présent : passé composé.",
});

const composePqp = composee({
  pronom: "elle",
  auxiliaire: { texte: "avait", note: "avoir à l'imparfait" },
  participe: { texte: "écrit", note: "participe" },
  legende: "Le MÊME participe, un autre auxiliaire : plus-que-parfait.",
});

const composeFuturAnterieur = composee({
  pronom: "nous",
  auxiliaire: { texte: "aurons", note: "avoir au futur" },
  participe: { texte: "terminé", note: "participe" },
  legende: "Auxiliaire au futur : futur antérieur. Le participe ne bouge jamais.",
});

// ── CE QUE LE CONDITIONNEL EXPRIME — la micro écrite le 25/08.
const valeurHypothese = phrase({
  mots: [
    { texte: "Si" },
    { texte: "j'avais", focus: true },
    { texte: "le" },
    { texte: "temps" },
    { texte: "," },
    { texte: "je" },
    { texte: "viendrais", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 3], label: "condition" }],
  legende: "Hypothèse : le fait dépend d'une condition non réalisée.",
});

const valeurPolitesse = phrase({
  mots: [
    { texte: "Pourriez-vous", focus: true },
    { texte: "répéter" },
    { texte: "la" },
    { texte: "question" },
    { texte: "?" },
  ],
  legende: "Politesse : le conditionnel adoucit ce qu'on demande.",
});

const valeurNonConfirmee = phrase({
  mots: [
    { texte: "Le" },
    { texte: "suspect" },
    { texte: "aurait", focus: true },
    { texte: "pris" },
    { texte: "la" },
    { texte: "fuite" },
    { texte: "." },
  ],
  legende: "Information non confirmée : le journal rapporte sans garantir.",
});

const valeurRegret = phrase({
  mots: [
    { texte: "Tu" },
    { texte: "aurais", focus: true },
    { texte: "dû", focus: true },
    { texte: "me" },
    { texte: "prévenir" },
    { texte: "." },
  ],
  legende: "Regret ou reproche : ce qui n'a pas été fait à temps.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonTemps4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "conjugaison-temps",
  titre: "Les temps, les modes et ce qu'ils expriment en 4e (2026-2027)",
  accroche:
    "« Le suspect a pris la fuite » affirme. « Le suspect aurait pris la fuite » rapporte sans garantir. Une seule terminaison sépare une information d'une rumeur, et toute la prudence d'un journal tient dans cette lettre. Choisir un temps, ce n'est pas obéir à une règle de conjugaison : c'est décider de ce qu'on affirme.",
  identite: [
    { label: "Mots clés", valeur: "Subjonctif, conditionnel, temps composé, aspect, valeur" },
    { label: "Le secret", valeur: "Le mot qui précède commande souvent le mode" },
    { label: "Outil", valeur: "Placer l'action sur une frise" },
  ],
  definition: {
    texte:
      "Un temps ne fait pas que situer dans le temps : il dit aussi COMMENT l'action se déroule, et le MODE dit comment le fait est présenté. L'indicatif présente le fait comme réel, le subjonctif comme envisagé — souhaité, craint, ou seulement possible —, l'impératif comme commandé, et le conditionnel comme soumis à autre chose. Dans un récit, l'imparfait étend l'action et l'installe à l'arrière-plan, quand le passé simple la borne et fait avancer l'histoire. Les temps composés, eux, disent l'ACCOMPLI : ce qui était déjà fait au moment dont on parle. Et le conditionnel a plusieurs valeurs qu'il faut savoir distinguer — dont celle, très employée par la presse, de l'information qu'on rapporte sans la garantir.",
  },
  figure: {
    schema: pile(tempsRecit, tempsAccompli),
    legende:
      "Les temps placés sur une frise, plutôt qu'expliqués. En haut, l'imparfait « il pleuvait » s'étend à l'arrière-plan pendant que le passé simple « la porte s'ouvrit » vient piquer le premier plan : c'est ainsi qu'un récit se construit. En bas, un temps composé dit ce qui était DÉJÀ accompli quand l'autre action s'est produite.",
  },
  proprietes: [
    {
      titre: "Le subjonctif présente le fait comme envisagé",
      texte:
        "Il n'affirme pas que la chose est : il dit qu'elle est souhaitée, crainte, ou seulement possible. Sa base se prend sur le « ils » du présent.",
      schema: pile(subjonctifBase, subjonctifCommande),
      micros: ["4e_conj_subjonctif"],
    },
    {
      titre: "Certains mots commandent le subjonctif, et il n'y a pas à réfléchir",
      texte:
        "Il faut que, bien que, avant que, pour que, à condition que — et tous les verbes de volonté, de doute ou de sentiment. Le mot qui précède décide.",
      schema: pile(subjonctifCommande, subjonctifPiege),
      micros: ["4e_conj_subjonctif"],
    },
    {
      titre: "Le conditionnel est un MODE, avec un présent et un passé",
      texte:
        "Le présent se fabrique avec le radical du futur et les terminaisons de l'imparfait ; le passé est un temps composé de ce même mode.",
      schema: pile(conditionnelPresent, conditionnelPasse),
      micros: ["4e_conj_conditionnel"],
    },
    {
      titre: "Dans un temps composé, l'auxiliaire porte le temps",
      texte:
        "Le participe ne change jamais. C'est l'auxiliaire qui fait le passé composé, le plus-que-parfait, le futur antérieur ou le conditionnel passé.",
      schema: pile(composePasse, composePqp, composeFuturAnterieur),
      micros: ["4e_conj_temps_composes"],
    },
    {
      titre: "L'imparfait étend, le passé simple pique",
      texte:
        "Le programme donne son propre exemple : « elle lisait une page » ne borne pas l'action, « elle lut une page » la borne. C'est ce qui sépare le décor de l'évènement.",
      schema: tempsRecit,
      micros: ["4e_conj_valeurs_aspect"],
    },
    {
      titre: "Le temps composé dit l'ACCOMPLI",
      texte:
        "« Quand il eut fini, il se leva » : le premier était déjà terminé quand le second arrive. La même relation existe au futur.",
      schema: pile(tempsAccompli, tempsFuturAnterieur),
      micros: ["4e_conj_valeurs_aspect"],
    },
    {
      titre: "Le conditionnel dit quatre choses différentes",
      texte:
        "Une hypothèse, une demande polie, un regret — et l'information non confirmée, celle du journaliste qui rapporte sans garantir.",
      schema: pile(valeurHypothese, valeurPolitesse, valeurNonConfirmee),
      micros: ["4e_conj_valeurs_conditionnel"],
    },
  ],
  reel: {
    texte:
      "Le conditionnel journalistique est la forme verbale la plus utile à repérer de tout le programme. « Le bilan s'élèverait à douze blessés », « le ministre aurait démissionné », « l'entreprise fermerait en juin » : à chaque fois, le média rapporte une information qu'il n'a pas vérifiée, et il le signale — mais discrètement, dans une terminaison. Un lecteur qui ne la voit pas retient l'information comme un fait. Un lecteur qui la voit sait qu'il doit attendre confirmation. C'est exactement ce que demande le questionnement de 4e « Informer, s'informer, déformer ? », et cela se joue sur trois lettres.",
  },
  historique: {
    texte:
      "Le passé simple ne se parle plus. Il a disparu de la conversation française au cours du XIXe siècle — on ne dit plus « je mangeai », on dit « j'ai mangé » — et il ne survit que dans l'écrit, surtout dans le récit littéraire. Cette disparition n'est pas un appauvrissement : le passé composé a récupéré ses emplois, et le français a gagné en même temps une distinction que peu de langues possèdent aussi nettement, celle entre le temps du récit et le temps de la parole. Quand un romancier choisit aujourd'hui le passé simple, il choisit donc explicitement de raconter — et quand Camus ouvre L'Étranger au passé composé, en 1942, c'est une décision qui s'entend dès la première ligne.",
  },
  formule: {
    contexte: "Le réflexe qui donne le mode, sans hésiter, dans la plupart des cas.",
    expression: "je regarde le mot qui ouvre la proposition",
    legende:
      "« Il faut que », « bien que », « avant que », « pour que » : subjonctif, la question est close. « Si » suivi de l'imparfait : conditionnel présent dans l'autre proposition. « Si » suivi du plus-que-parfait : conditionnel passé. Ce n'est pas l'oreille qui décide, c'est le mot d'avant.",
    schema: subjonctifCommande,
  },
  methode: [
    {
      titre: "Pour former un subjonctif : partir du « ils » du présent",
      texte:
        "« Ils viennent » donne « qu'il vienne ». Quelques verbes ont une base à eux — faire, pouvoir, savoir, être, avoir — et ceux-là s'apprennent.",
      schema: subjonctifBase,
      micros: ["4e_conj_subjonctif"],
    },
    {
      titre: "Pour former un conditionnel : radical du futur, terminaison d'imparfait",
      texte:
        "« Je partirai » plus « je partais » donne « je partirais ». La recette marche pour tous les verbes, y compris les irréguliers.",
      schema: conditionnelPresent,
      micros: ["4e_conj_conditionnel"],
    },
    {
      titre: "Pour un temps composé : choisir l'auxiliaire, puis SON temps",
      texte:
        "Être ou avoir d'abord. Ensuite, mets l'auxiliaire au temps voulu : c'est lui qui décide si c'est un passé composé, un plus-que-parfait ou un futur antérieur.",
      schema: pile(composePasse, composePqp),
      micros: ["4e_conj_temps_composes"],
    },
    {
      titre: "Pour choisir dans un récit : l'action dure-t-elle, ou survient-elle ?",
      texte:
        "Elle dure, elle se répète, elle décrit : imparfait. Elle survient, elle rompt, elle fait avancer : passé simple. Place-la sur la frise avant de conjuguer.",
      schema: tempsRecit,
      micros: ["4e_conj_employer", "4e_conj_valeurs_aspect"],
    },
    {
      titre: "Pour lire un conditionnel : chercher ce dont il dépend",
      texte:
        "Une condition en « si » ? Hypothèse. Une demande ? Politesse. Un « aurais dû » ? Regret. Rien de tout cela, dans un article ? Information non confirmée.",
      schema: pile(valeurHypothese, valeurNonConfirmee),
      micros: ["4e_conj_valeurs_conditionnel"],
    },
  ],
  usages: [
    {
      titre: "Pour lire la presse : la terminaison qui prévient",
      detail:
        "« Le bilan s'élèverait à douze blessés » : le média n'a pas vérifié, et il le dit dans trois lettres. Les voir, c'est ne pas retenir une rumeur comme un fait.",
      schema: valeurNonConfirmee,
      micros: ["4e_conj_valeurs_conditionnel"],
    },
    {
      titre: "Pour écrire un récit : alterner les deux passés",
      detail:
        "Tout à l'imparfait, rien n'avance. Tout au passé simple, il n'y a plus de décor. Le récit tient dans l'alternance.",
      schema: tempsRecit,
      micros: ["4e_conj_valeurs_aspect"],
    },
    {
      titre: "Pour demander sans imposer",
      detail:
        "« Je veux un renseignement » et « je voudrais un renseignement » demandent la même chose. Le second laisse à l'autre la possibilité de refuser.",
      schema: valeurPolitesse,
      micros: ["4e_conj_valeurs_conditionnel"],
    },
  ],
  exemples: [
    {
      titre: "Former un subjonctif",
      donnees: "« Il faut que tu ___ avant la nuit. » (rentrer)",
      schema: subjonctifCommande,
      question: "Quelle forme, et pourquoi ?",
      solution:
        "« Rentres », au subjonctif présent. « Il faut que » commande le subjonctif : ce n'est pas une question de sens à peser, c'est le mot qui précède qui décide. La base se prend sur « ils rentrent ».",
      micros: ["4e_conj_subjonctif"],
    },
    {
      titre: "Le conditionnel passé",
      donnees: "« Si j'avais su, j'___ autrement. » (agir)",
      schema: conditionnelPasse,
      question: "Quelle forme complète la phrase ?",
      solution:
        "« J'aurais agi », au conditionnel passé. La règle est mécanique : « si » suivi du plus-que-parfait appelle le conditionnel PASSÉ dans l'autre proposition. Avec « si » plus imparfait, ce serait le conditionnel présent.",
      micros: ["4e_conj_conditionnel"],
    },
    {
      titre: "Ce qui change le temps composé",
      donnees: "« elle a écrit » / « elle avait écrit » / « nous aurons terminé »",
      schema: pile(composePasse, composePqp, composeFuturAnterieur),
      question: "Qu'est-ce qui distingue ces trois formes ?",
      solution:
        "L'AUXILIAIRE, et lui seul. Le participe reste identique. « A » au présent donne un passé composé, « avait » à l'imparfait un plus-que-parfait, « aurons » au futur un futur antérieur. Chercher le temps dans le participe est une perte de temps.",
      micros: ["4e_conj_temps_composes"],
    },
    {
      titre: "Choisir dans un récit",
      donnees: "« Elle lisait quand soudain la porte ___. » (claquer)",
      schema: tempsRecit,
      question: "Imparfait ou passé simple ?",
      solution:
        "« Claqua », au passé simple. « Elle lisait » installe une durée ; l'action qui vient l'interrompre est brève et bornée, donc passé simple. Place les deux sur la frise : l'une s'étend, l'autre pique.",
      micros: ["4e_conj_employer", "4e_conj_valeurs_aspect"],
    },
    {
      titre: "Le mot qui commande",
      donnees: "« Il partit avant que nous ___ le prévenir. » (pouvoir)",
      schema: subjonctifCommande,
      question: "Quelle forme ?",
      solution:
        "« Puissions », au subjonctif. « Avant que » commande le subjonctif — comme « bien que », « pour que », « à condition que ». ⛔ « avant que nous pouvions » est une faute fréquente, et elle vient de l'oreille, pas du sens.",
      micros: ["4e_conj_employer"],
    },
    {
      titre: "L'accompli",
      donnees: "« Quand il eut fini, il se leva. »",
      schema: tempsAccompli,
      question: "Que dit le temps composé ici ?",
      solution:
        "Qu'à l'instant où il s'est levé, le fait de finir était DÉJÀ accompli. C'est la valeur d'aspect : le temps composé ne situe pas seulement, il dit qu'une action est terminée par rapport à une autre. La même relation existe au futur : « nous aurons terminé avant qu'il arrive ».",
      micros: ["4e_conj_valeurs_aspect"],
    },
    {
      titre: "Ce que le conditionnel exprime",
      donnees: "« Selon le journal, le suspect aurait pris la fuite. »",
      schema: valeurNonConfirmee,
      question: "Que signale ce conditionnel ?",
      solution:
        "Une INFORMATION NON CONFIRMÉE. Le journal rapporte sans garantir : il n'affirme pas que le suspect a fui, il dit qu'on le dit. Ce n'est ni une hypothèse, ni une politesse, ni un regret — c'est la prudence d'un média, et elle tient dans une terminaison.",
      micros: ["4e_conj_valeurs_conditionnel"],
    },
  ],
  pieges: [
    "Écrire « que nous faisions » pour un subjonctif : c'est l'imparfait de l'indicatif. Le subjonctif est « que nous fassions ».",
    "Mettre l'indicatif après « bien que » ou « avant que » : ces conjonctions commandent le subjonctif, sans discussion.",
    "Écrire « si j'aurais » : après « si », jamais de conditionnel. C'est l'imparfait ou le plus-que-parfait.",
    "Chercher le temps d'une forme composée dans le participe : c'est l'auxiliaire qui le porte.",
    "Mettre tout un récit à l'imparfait : plus rien n'avance, il n'y a que du décor.",
    "Lire un conditionnel de presse comme une affirmation : « aurait démissionné » ne dit pas qu'il a démissionné.",
  ],
  aRetenir: [
    "Le mode dit comment le fait est présenté : réel, envisagé, commandé, ou soumis à autre chose.",
    "« Il faut que », « bien que », « avant que », « pour que » commandent le subjonctif.",
    "Conditionnel présent = radical du futur + terminaison d'imparfait. Le passé est composé.",
    "Dans un temps composé, l'auxiliaire porte le temps ; le participe ne bouge pas.",
    "L'imparfait étend et décrit, le passé simple borne et fait avancer.",
    "Le conditionnel dit une hypothèse, une politesse, un regret — ou une information non confirmée.",
  ],
  entrainement: [
    {
      question: "« Bien qu'il ___ tort, il n'a pas cédé. » (avoir)",
      correction: "ait — « bien que » commande le subjonctif.",
      micros: ["4e_conj_subjonctif"],
    },
    {
      question: "« Si tu voulais, tu ___ y arriver. » (pouvoir)",
      correction: "pourrais — « si » plus imparfait appelle le conditionnel présent.",
      micros: ["4e_conj_conditionnel"],
    },
    {
      question: "« Nous ___ avant qu'il n'arrive. » (terminer, futur antérieur)",
      correction: "aurons terminé — auxiliaire au futur, donc futur antérieur.",
      micros: ["4e_conj_temps_composes"],
    },
    {
      question: "« Chaque matin, il ___ le même chemin. » (prendre, récit au passé)",
      correction: "prenait — une action répétée dans le passé se met à l'imparfait.",
      micros: ["4e_conj_valeurs_aspect"],
    },
    {
      question: "« Le vent tomba brusquement. » Que dit ce temps ?",
      correction: "Une action bornée, qui fait avancer le récit — par opposition à ce qui durait autour.",
      micros: ["4e_conj_valeurs_aspect"],
    },
    {
      question: "« L'incendie aurait détruit une partie du hangar. » Que signale ce conditionnel ?",
      correction: "Une information non confirmée : on la rapporte sans la garantir.",
      micros: ["4e_conj_valeurs_conditionnel"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesConjugaisonTemps4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Temps et modes - 4e",
    section: {
      type: "objectif",
      phrase: "Choisir un temps, c'est décider de ce qu'on affirme",
      sousPhrase:
        "Le mode dit comment le fait est présenté. L'aspect dit s'il dure ou s'il rompt. Et le conditionnel dit parfois qu'on ne garantit rien.",
      encadre: {
        titre: "L'idée",
        texte: "« Le suspect a pris la fuite » affirme. « Le suspect aurait pris la fuite » rapporte.",
      },
    },
  },
  {
    titre: "Les deux passés du récit",
    badge: "Temps et modes - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Imparfait",
        contenu: "« Il pleuvait. » L'action s'étend, elle décrit, elle reste à l'arrière-plan.",
      },
      droite: {
        titre: "Passé simple",
        contenu: "« La porte s'ouvrit. » L'action est bornée, elle rompt, elle fait avancer.",
      },
    },
    schema: tempsRecit,
  },
  {
    titre: "Le mot qui précède commande",
    badge: "Temps et modes - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Subjonctif", texte: "il faut que, bien que, avant que, pour que, à condition que." },
        { titre: "Si + imparfait", texte: "→ conditionnel PRÉSENT : « si tu voulais, tu pourrais »." },
        { titre: "Si + plus-que-parfait", texte: "→ conditionnel PASSÉ : « si j'avais su, j'aurais agi »." },
        { titre: "⛔ Jamais", texte: "« si j'aurais » n'existe pas. Après « si », jamais de conditionnel." },
      ],
    },
    schema: subjonctifCommande,
  },
  {
    titre: "L'auxiliaire porte le temps",
    badge: "Temps et modes - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je choisis l'auxiliaire : être ou avoir.",
        "Je le mets au temps voulu — c'est LUI qui décide.",
        "Présent → passé composé. Imparfait → plus-que-parfait. Futur → futur antérieur.",
        "Le participe, lui, ne change jamais de temps.",
      ],
    },
    schema: pile(composePasse, composePqp, composeFuturAnterieur),
  },
  {
    titre: "Ce que le conditionnel exprime",
    badge: "Temps et modes - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Hypothèse", texte: "« Si j'avais le temps, je viendrais. »" },
        { titre: "Politesse", texte: "« Pourriez-vous répéter la question ? »" },
        { titre: "Regret", texte: "« Tu aurais dû me prévenir. »" },
        { titre: "Non confirmé", texte: "« Le suspect aurait pris la fuite. » Le journal ne garantit pas." },
      ],
    },
    schema: pile(valeurHypothese, valeurNonConfirmee),
  },
  {
    titre: "À vous",
    badge: "Temps et modes - 4e",
    section: {
      type: "exercice",
      enonce: "« Le bilan s'élèverait à douze blessés. »",
      question: "Que signale ce conditionnel, et que dois-tu en faire ?",
      indice: "Ce n'est ni une hypothèse, ni une politesse, ni un regret.",
      correction:
        "Une information non confirmée : le média rapporte sans avoir vérifié, et il le signale dans la terminaison. À retenir comme « à confirmer », pas comme un fait.",
    },
    schema: valeurNonConfirmee,
  },
];
