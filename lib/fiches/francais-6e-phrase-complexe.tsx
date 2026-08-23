// ─── Fiche de cours : se repérer dans la phrase complexe (6e) ─────────────────
// QUATRIÈME FICHE DE FRANÇAIS DE LA 6e. Les trois précédentes analysaient UNE
// phrase — ce que le verbe appelle, ce qui s'accroche au nom, ce qui remplace le
// nom. Celle-ci en met deux bout à bout.
//
// ⭐ CE QU'ELLE AJOUTE À LA FICHE DU CM2, ET POURQUOI ELLE N'EN EST PAS UNE COPIE.
// Le BO du CM2 dit : « Distinguer phrase simple et phrase complexe à partir du
// repérage DES VERBES CONJUGUÉS ». Celui de la 6e dit : « à partir de la notion
// DE PROPOSITION », puis « APPROFONDIR les notions de juxtaposition, de
// coordination, de subordination », et enfin « DISTINGUER LE RÔLE de la
// conjonction de coordination et celui de la conjonction de subordination ».
// Trois marches, donc :
//   · le CM2 COMPTE des verbes ; la 6e nomme ce qu'elle compte — la proposition ;
//   · le CM2 reconnaît les trois liens ; la 6e dit ce que chacun FAIT ;
//   · et la 6e ajoute une distinction que le CM2 n'a pas : deux sortes de petits
//     mots, dont l'un met les propositions à égalité et l'autre en soumet une.
//
// ⭐ LA COULEUR PORTE ÇA TOUTE SEULE. Le canvas peint les propositions en deux
// teintes de MÊME FORCE (indigo, sarcelle) — parce qu'une coordination met
// justement les deux propositions à égalité — et les mots outils en gris. Une
// subordonnée prend la seconde teinte, mais c'est le crochet qui dit sa
// dépendance : elle est ÉTIQUETÉE « proposition subordonnée » quand l'autre est
// « principale ». On ne colorie pas la hiérarchie, on la nomme.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `phrase_complexe`) et sur les pools PROPOSITION, ARTICULATION et
// CONJONCTIONS_ROLE de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 6e_complexe_proposition   → définition, figure, propriétés « Un verbe
//                               conjugué, une proposition » et « Les virgules ne
//                               comptent pas », exemple 1, piège 1,
//                               entraînements 1 et 2
// - 6e_complexe_articulation  → propriétés « Juxtaposées », « Coordonnées » et
//                               « Subordonnées », exemples 2 et 3, entraînement 3
// - 6e_complexe_conjonctions  → propriété « Deux sortes de petits mots »,
//                               formule, méthode 3, exemple 4, pièges 2 et 3,
//                               entraînement 4
// - 6e_complexe_defi          → le défi, dessiné (exemple 5) + entraînement 5
//
// Les phrases sont CELLES DE LA BANQUE : « Le vent souffle sur le lagon », « Le
// vent souffle et la pluie tombe », « Le vent souffle, la pluie tombe, la mer
// monte », « Quand la pluie s'arrête, les enfants sortent », « Il rentre parce
// qu'il pleut », « Les enfants qui jouent sur la plage rentrent tard », « Le
// pêcheur, fatigué, rentra chez lui », « Je pense que tu as raison ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le helper commun à toutes les fiches de français. `largeurMax: 250` est le
// défaut du composant, écrit ici pour qu'on n'ait pas à aller le chercher.
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
        largeurMax: 250,
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

// LA FIGURE DE RÉFÉRENCE : deux propositions, deux teintes de même force, et le
// petit mot en gris entre les deux. Tout le cours tient dans ce dessin.
const phraseReference = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "souffle", focus: true },
    { texte: "et" },
    { texte: "la" },
    { texte: "pluie" },
    { texte: "tombe", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 2], label: "proposition 1" },
    { mots: [3, 3], label: "coordination" },
    { mots: [4, 6], label: "proposition 2" },
  ],
  legende: "Deux verbes conjugués, deux propositions — reliées par « et ».",
});

// La phrase simple, pour que « complexe » veuille dire quelque chose.
const phraseSimple = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "souffle", focus: true },
    { texte: "sur" },
    { texte: "le" },
    { texte: "lagon" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 6], label: "proposition 1" }],
  legende: "Un seul verbe conjugué : une proposition, donc une phrase simple.",
});

// LE PIÈGE DES VIRGULES : trois groupes séparés par des virgules, un seul verbe.
const phrasePiegeVirgules = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "," },
    { texte: "fatigué" },
    { texte: "," },
    { texte: "rentra", focus: true },
    { texte: "chez" },
    { texte: "lui" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 8], label: "proposition 1" }],
  legende: "Deux virgules, et pourtant UN seul verbe conjugué : une proposition.",
});

// JUXTAPOSITION : rien que des virgules, et trois propositions à égalité.
const phraseJuxtaposition = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "souffle", focus: true },
    { texte: "," },
    { texte: "la" },
    { texte: "pluie" },
    { texte: "tombe", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 2], label: "proposition 1" },
    { mots: [4, 6], label: "proposition 2" },
  ],
  legende: "Une virgule, aucun mot de liaison : les propositions sont juxtaposées.",
});

// COORDINATION : le petit mot, en gris, et l'inversion possible.
const phraseCoordination = phrase({
  mots: [
    { texte: "Il" },
    { texte: "pleut", focus: true },
    { texte: "," },
    { texte: "mais" },
    { texte: "nous" },
    { texte: "sortons", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [3, 3], label: "coordination" },
    { mots: [4, 5], label: "proposition 2" },
  ],
  legende: "« mais » relie deux propositions qui pourraient vivre séparément.",
});

// SUBORDINATION : la principale et la subordonnée, nommées. Le crochet dit la
// dépendance, la couleur ne la dit pas — deux propositions restent deux blocs.
const phraseSubordination = phrase({
  mots: [
    { texte: "Quand" },
    { texte: "la" },
    { texte: "pluie" },
    { texte: "s'arrête", focus: true },
    { texte: "," },
    { texte: "les" },
    { texte: "enfants" },
    { texte: "sortent", focus: true },
  ],
  groupes: [
    { mots: [0, 0], label: "subordination" },
    { mots: [1, 3], label: "proposition subordonnée" },
    { mots: [5, 7], label: "proposition principale" },
  ],
  legende: "« Quand la pluie s'arrête » ne se dit pas seul : elle dépend de l'autre.",
});

const phraseParceQue = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentre", focus: true },
    { texte: "parce" },
    { texte: "qu'" },
    { texte: "il" },
    { texte: "pleut", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition principale" },
    { mots: [2, 3], label: "subordination" },
    { mots: [4, 5], label: "proposition subordonnée" },
  ],
  legende: "« parce qu'il pleut » donne la cause : elle ne tient pas debout seule.",
});

// LES DEUX SORTES DE PETITS MOTS, l'une sous l'autre. C'est le geste neuf de la
// 6e : nommer le RÔLE, pas seulement reconnaître le mot.
const phraseDeuxRoles = phrase({
  mots: [
    { texte: "Je" },
    { texte: "pense", focus: true },
    { texte: "que" },
    { texte: "tu" },
    { texte: "as", focus: true },
    { texte: "raison" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition principale" },
    { mots: [2, 2], label: "subordination" },
    { mots: [3, 5], label: "proposition subordonnée" },
  ],
  legende: "« que » soumet la seconde à la première : on ne peut pas les inverser.",
});

// LA RELATIVE ENCHÂSSÉE : la subordonnée est AU MILIEU de la principale. C'est
// le cas où l'on compte mal, et il se voit d'un coup d'œil.
const phraseRelative = phrase({
  mots: [
    { texte: "Les" },
    { texte: "enfants" },
    { texte: "qui" },
    { texte: "jouent", focus: true },
    { texte: "rentrent", focus: true },
    { texte: "tard" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 2], label: "subordination" },
    { mots: [3, 3], label: "proposition subordonnée" },
    { mots: [4, 5], label: "proposition principale" },
  ],
  legende: "La subordonnée est glissée DANS la principale : deux verbes, deux propositions.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Trois propositions, deux liens
// différents dans la même phrase.
const phraseDefi = phrase({
  mots: [
    { texte: "Quand" },
    { texte: "la" },
    { texte: "nuit" },
    { texte: "tomba", focus: true },
    { texte: "," },
    { texte: "les" },
    { texte: "pêcheurs" },
    { texte: "rentrèrent", focus: true },
    { texte: "et" },
    { texte: "le" },
    { texte: "port" },
    { texte: "s'endormit", focus: true },
  ],
  groupes: [
    { mots: [0, 0], label: "subordination" },
    { mots: [1, 3], label: "proposition subordonnée" },
    { mots: [5, 7], label: "proposition principale" },
    { mots: [8, 8], label: "coordination" },
    { mots: [9, 11], label: "proposition 2" },
  ],
  legende: "Trois verbes conjugués, trois propositions — et deux liens différents.",
});

const pieges = [
  "Compter les virgules au lieu des verbes conjugués : « Le pêcheur, fatigué, rentra chez lui » a deux virgules et UNE seule proposition.",
  "Croire que tout petit mot relie deux propositions à égalité : « et », « mais », « ou », « donc », « car » coordonnent ; « quand », « parce que », « si », « que » subordonnent — et ces derniers rendent une proposition dépendante.",
  "Oublier qu'une subordonnée peut être au MILIEU de la principale : dans « Les enfants qui jouent rentrent tard », la principale est coupée en deux.",
  "Prendre un verbe à l'infinitif pour une proposition : seul un verbe CONJUGUÉ en ouvre une. « Il aime lire » n'a qu'une proposition.",
];

const aRetenir = [
  "Une proposition s'organise autour d'un verbe conjugué : autant de verbes conjugués, autant de propositions.",
  "Trois façons de les relier : la virgule (juxtaposition), un mot de coordination, un mot de subordination.",
  "La coordination met les deux propositions à égalité ; la subordination en soumet une à l'autre.",
];

export const ficheComplexe6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "phrase-complexe",
  titre: "Se repérer dans la phrase complexe",
  accroche:
    "« Le vent souffle et la pluie tombe. » Deux verbes conjugués : deux propositions. Reste à savoir ce que le petit mot du milieu leur fait — car il ne les traite pas toutes de la même façon.",
  identite: [
    { label: "Mots clés", valeur: "Proposition, juxtaposition, coordination, subordination" },
    { label: "Le secret", valeur: "On compte les verbes conjugués" },
    { label: "Outil", valeur: "Essayer de séparer les deux propositions" },
  ],
  definition: {
    texte:
      "Une proposition est un morceau de phrase organisé autour d'un verbe conjugué. Une phrase qui n'en contient qu'une est une phrase simple ; une phrase qui en contient plusieurs est une phrase complexe. Ces propositions se relient de trois façons : par une simple virgule — elles sont juxtaposées ; par un mot de coordination (et, mais, ou, donc, or, ni, car) — elles sont coordonnées ; par un mot de subordination (quand, parce que, si, que) — l'une devient alors dépendante de l'autre, et on l'appelle proposition subordonnée.",
  },
  figure: {
    schema: phraseReference,
    legende:
      "« Le vent souffle et la pluie tombe. » Deux verbes conjugués encadrés, donc deux propositions — peintes en deux teintes de même force, parce que la coordination les met à égalité. Le petit mot « et » est en gris : ce n'est pas une proposition, c'est ce qui les relie.",
  },
  proprietes: [
    {
      titre: "Un verbe conjugué, une proposition",
      texte: "On compte les verbes conjugués : un seul, la phrase est simple ; plusieurs, elle est complexe.",
      schema: pile(phraseSimple, phraseReference),
    },
    {
      titre: "Les virgules ne comptent pas",
      texte: "Une phrase peut porter deux virgules et une seule proposition : c'est le verbe qui décide, pas la ponctuation.",
      schema: phrasePiegeVirgules,
    },
    {
      titre: "Juxtaposées : rien entre elles",
      texte: "Une virgule, un point-virgule, et aucun mot de liaison : les propositions sont simplement posées côte à côte.",
      schema: phraseJuxtaposition,
    },
    {
      titre: "Coordonnées : à égalité",
      texte: "Un mot de coordination les relie sans que l'une dépende de l'autre : chacune pourrait vivre seule.",
      schema: phraseCoordination,
    },
    {
      titre: "Subordonnées : l'une dépend de l'autre",
      texte: "Un mot de subordination soumet une proposition à la principale : seule, elle ne veut rien dire.",
      schema: pile(phraseSubordination, phraseParceQue),
    },
  ],
  reel: {
    texte:
      "C'est ce qui permet de lire une phrase longue sans se perdre. Dans un texte documentaire ou une consigne d'examen, la phrase fait souvent trois lignes : trouver les verbes conjugués, c'est trouver les articulations, et donc comprendre quelle information dépend de quelle autre. Et à l'écrit, c'est ce qui fait la différence entre une suite de phrases courtes et un texte qui se tient : coordonner ou subordonner, c'est choisir ce qu'on met en avant.",
  },
  historique: {
    texte:
      "« Subordonné » vient du latin sub, « sous », et ordinare, « mettre en ordre » : ce qui est placé sous un autre. « Coordonné » vient du même verbe, avec cum, « avec » : mis en ordre AVEC, donc à côté, sur le même rang. Les deux mots disent, à eux seuls, toute la différence — l'un met sous, l'autre met à côté. Les grammairiens latins avaient déjà choisi le vocabulaire qui explique la règle.",
  },
  formule: {
    contexte: "Le test qui distingue la coordination de la subordination.",
    expression: "puis-je la dire toute seule ?",
    legende:
      "On isole la seconde proposition et on la prononce seule. « la pluie tombe » se dit — les propositions étaient coordonnées. « quand la pluie s'arrête » ne se dit pas seul, il manque quelque chose — elle était subordonnée. Le test ne demande pas de reconnaître le mot : il fait entendre la dépendance.",
    schema: pile(phraseCoordination, phraseSubordination),
  },
  methode: [
    {
      titre: "Je souligne les verbes conjugués",
      texte: "Autant de verbes conjugués, autant de propositions. L'infinitif ne compte pas.",
      schema: phraseReference,
    },
    {
      titre: "Je regarde ce qu'il y a entre elles",
      texte: "Une virgule seule : juxtaposition. Un petit mot : je passe au troisième réflexe.",
      schema: phraseJuxtaposition,
    },
    {
      titre: "J'essaie de dire la seconde toute seule",
      texte: "Si elle tient debout, elles sont coordonnées. Si elle reste en suspens, elle est subordonnée.",
      schema: pile(phraseCoordination, phraseParceQue),
    },
  ],
  usages: [
    {
      titre: "Mettre deux faits à égalité",
      detail: "« Le vent souffle et la pluie tombe » : la coordination les place sur le même rang.",
      schema: phraseReference,
    },
    {
      titre: "Dire pourquoi",
      detail: "« Il rentre parce qu'il pleut » : la subordonnée porte la cause, la principale porte le fait.",
      schema: phraseParceQue,
    },
    {
      titre: "Préciser de qui l'on parle",
      detail: "« Les enfants qui jouent rentrent tard » : la subordonnée se glisse dans la principale.",
      schema: phraseRelative,
    },
  ],
  exemples: [
    {
      titre: "Simple ou complexe ?",
      donnees: "« Le vent souffle sur le lagon. » puis « Le vent souffle et la pluie tombe. »",
      schema: pile(phraseSimple, phraseReference),
      question: "Combien de propositions dans chaque phrase ?",
      solution:
        "La première n'a qu'un verbe conjugué, « souffle » : une proposition, donc une phrase simple — même si elle est longue. La seconde en a deux, « souffle » et « tombe » : deux propositions, donc une phrase complexe. Ce n'est jamais la longueur qui décide, c'est le nombre de verbes conjugués.",
    },
    {
      titre: "Le piège des virgules",
      donnees: "« Le pêcheur, fatigué, rentra chez lui. »",
      schema: phrasePiegeVirgules,
      question: "Cette phrase est-elle complexe ?",
      solution:
        "Non. Elle porte deux virgules, mais un seul verbe conjugué : « rentra ». « fatigué » est un adjectif détaché, pas un verbe conjugué — il ne peut pas ouvrir une proposition. La phrase est simple.",
    },
    {
      titre: "Juxtaposées ou coordonnées ?",
      donnees: "« Le vent souffle, la pluie tombe. » puis « Il pleut, mais nous sortons. »",
      schema: pile(phraseJuxtaposition, phraseCoordination),
      question: "Comment les propositions sont-elles reliées dans chaque phrase ?",
      solution:
        "Dans la première, rien ne les relie qu'une virgule : elles sont juxtaposées. Dans la seconde, le mot « mais » les relie : elles sont coordonnées. Dans les deux cas, chacune pourrait se dire seule — la juxtaposition et la coordination laissent les propositions à égalité.",
    },
    {
      titre: "Ce que fait un mot de subordination",
      donnees: "« Je pense que tu as raison. »",
      schema: phraseDeuxRoles,
      question: "Quel est le rôle du mot « que » ?",
      solution:
        "Il subordonne : il soumet « tu as raison » à « je pense ». La preuve tient en deux essais. On ne peut pas dire « que tu as raison » tout seul, et on ne peut pas inverser les deux morceaux comme on inverserait deux propositions coordonnées. Un mot de coordination relie ; un mot de subordination met sous.",
    },
    {
      titre: "Le défi",
      donnees: "« Quand la nuit tomba, les pêcheurs rentrèrent et le port s'endormit. »",
      schema: phraseDefi,
      question: "Combien de propositions, et quels liens les relient ?",
      solution:
        "Trois verbes conjugués — « tomba », « rentrèrent », « s'endormit » — donc trois propositions. Et deux liens différents dans la même phrase : « Quand » subordonne la première aux autres, « et » coordonne les deux dernières entre elles. Une phrase complexe peut mélanger les trois façons de relier.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Léa range sa chambre, puis elle sort. » Combien de verbes conjugués ?",
      correction:
        "Deux : « range » et « sort ». La phrase compte donc deux propositions, reliées par le mot de coordination « puis ».",
    },
    {
      question: "« Le vent souffle, la pluie tombe, la mer monte. » Comment les propositions sont-elles reliées ?",
      correction:
        "Elles sont juxtaposées : seules des virgules les séparent, sans aucun mot de liaison. Il y en a trois, une par verbe conjugué.",
    },
    {
      question: "« Nous sortirons quand la pluie s'arrêtera. » Les propositions sont reliées comment ?",
      correction:
        "Par subordination : « quand » rend la seconde dépendante de la première. Dite seule, « quand la pluie s'arrêtera » reste en suspens.",
    },
    {
      question: "Quelle est la différence entre une conjonction de coordination et une conjonction de subordination ?",
      correction:
        "La conjonction de coordination (et, mais, ou, donc, or, ni, car) relie deux propositions à égalité : chacune pourrait vivre seule. La conjonction de subordination (quand, parce que, si, que) en soumet une à l'autre : la subordonnée ne tient pas debout toute seule.",
    },
    {
      question: "Défi : « Quand la nuit tomba, les pêcheurs rentrèrent et le port s'endormit. » Combien de propositions ?",
      correction:
        "Trois, une par verbe conjugué. « Quand » subordonne la première ; « et » coordonne les deux dernières. Une même phrase peut mélanger les liens.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesComplexe6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La phrase complexe - 6e",
    section: {
      type: "objectif",
      phrase: "Compter les propositions, puis nommer ce qui les relie",
      sousPhrase:
        "On souligne les verbes conjugués, on regarde ce qu'il y a entre les propositions, et on essaie de dire la seconde toute seule.",
      encadre: {
        titre: "L'idée",
        texte: "La coordination met les propositions à égalité ; la subordination en soumet une.",
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
          "Dans une consigne d'examen, la phrase fait souvent trois lignes. Trouver les verbes conjugués, c'est trouver les articulations — et comprendre quelle information dépend de quelle autre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Subordonné » : du latin sub, « sous ». « Coordonné » : du latin cum, « avec ». L'un met sous, l'autre met à côté. Les deux mots disent toute la règle.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheComplexe6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Les trois façons de relier",
    badge: "Juxtaposition, coordination, subordination",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "À égalité",
        contenu:
          "« Le vent souffle, la pluie tombe » (juxtaposées) et « Il pleut, mais nous sortons » (coordonnées) : chaque proposition pourrait se dire seule.",
      },
      droite: {
        variante: "ok",
        titre: "L'une sous l'autre",
        contenu:
          "« Quand la pluie s'arrête, les enfants sortent » : la première ne tient pas debout seule. Elle est subordonnée.",
      },
    },
  },
  {
    titre: "Le piège des virgules",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Deux virgules, une proposition",
        contenu:
          "« Le pêcheur, fatigué, rentra chez lui. » Un seul verbe conjugué : la phrase est SIMPLE. « fatigué » est un adjectif détaché.",
      },
      droite: {
        variante: "info",
        titre: "Ce qu'on compte",
        contenu:
          "Ni les virgules, ni la longueur : les VERBES CONJUGUÉS. Un verbe à l'infinitif n'ouvre aucune proposition.",
      },
    },
  },
  {
    titre: "Le rôle du petit mot",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Je pense que tu as raison. »",
      question: "Quel est le rôle du mot « que » ?",
      correction:
        "Il subordonne : « que tu as raison » ne se dit pas seul, et on ne peut pas inverser les deux morceaux. Un mot de coordination relie ; un mot de subordination met sous.",
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
      enonce: "« Quand la nuit tomba, les pêcheurs rentrèrent et le port s'endormit. »",
      question: "Combien de propositions, et quels liens les relient ?",
      indice: "Souligne d'abord tous les verbes conjugués. Puis regarde chaque mot entre deux propositions.",
      correction:
        "Trois propositions. « Quand » subordonne la première aux autres ; « et » coordonne les deux dernières. Une même phrase peut mélanger les liens.",
    },
  },
];
