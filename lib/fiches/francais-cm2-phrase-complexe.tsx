// ─── Fiche de cours : la phrase complexe (CM2) ────────────────────────────────
// La suite directe de `francais-cm2-grammaire-orthographe.tsx` : là-bas on
// analysait UNE phrase autour d'UN verbe, ici on en met deux bout à bout. Même
// canvas `phrase`, mêmes couleurs de fonction — l'élève ne réapprend rien du
// dessin, il ne découvre que l'idée nouvelle.
//
// Alignée sur les micro-compétences du coach
// lib/tutor-v4/knowledge/francais/cm2/microSkills.ts (notionId `phrase_complexe`)
// et sur les pools PROPOSITION / CONJONCTIONS_ROLE / PRONOM_RELATIF de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⭐ POUR LE CRPE : c'est ici que se joue « combien de propositions ? », première
// question de toute analyse de phrase au concours. La règle de comptage — autant
// de verbes conjugués, autant de propositions — est le seul outil fiable, et
// c'est exactement ce que le dessin montre (un verbe encadré par proposition).
//
// Micro-compétences couvertes (les 3 de la notion) :
// - cm2_complexe_propositions    → définition, figure, propriété « On compte les
//                                  verbes conjugués », exemples 1 et 2, entraînements 1 et 2
// - cm2_complexe_coordination    → propriétés « Juxtaposées » et « Coordonnées »,
//                                  usages, exemple 3, entraînement 3
// - cm2_complexe_pronom_relatif  → propriété « qui, que, où », formule, exemple 4,
//                                  pièges 2 et 3, entraînements 4 et 5
//
// Les phrases sont CELLES DE LA BANQUE : « Le vent souffle sur le lagon »,
// « Le vent souffle et la pluie tombe », « Quand la pluie s'arrête, les enfants
// sortent », « Le pêcheur qui répare son filet est mon voisin », « Le livre que
// je lis est passionnant », « La plage où nous allons est déserte ».
//
// ⚠️ Contrôle avant commit : REGLES.md § 2 quater (aucun texte de dessin sous
// 11 px une fois à l'échelle, fenêtre en 375 px).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le même helper que dans la fiche sœur, au mot près : une seule façon de
// dessiner une phrase dans tout le français.
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
      }}
    />
  );
}

// Dans une carte, on empile — jamais deux dessins côte à côte (REGLES § 2 ter).
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

// Une proposition = un verbe conjugué. Le verbe est mis en avant DANS chaque
// proposition : c'est lui qu'on compte, et c'est le seul moyen de montrer
// pourquoi il y en a deux.
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
  groupes: [{ mots: [0, 6], label: "une seule proposition" }],
  legende: "Un verbe conjugué : phrase simple.",
});

const phraseCoordonnee = phrase({
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
    { mots: [4, 7], label: "proposition 2" },
  ],
  legende: "Deux verbes conjugués : phrase complexe.",
});

const phraseJuxtaposee = phrase({
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
    { mots: [4, 7], label: "proposition 2" },
  ],
  legende: "Juxtaposées : une simple virgule les sépare.",
});

const phraseSubordonnee = phrase({
  mots: [
    { texte: "Quand" },
    { texte: "la" },
    { texte: "pluie" },
    { texte: "s'arrête", focus: true },
    { texte: "," },
    { texte: "les" },
    { texte: "enfants" },
    { texte: "sortent", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "subordination" },
    { mots: [1, 3], label: "proposition 2" },
    { mots: [5, 8], label: "proposition 1" },
  ],
  legende: "« Quand » soumet la première à la seconde.",
});

// Le pronom relatif : un mot qui montre du doigt le nom d'avant. La flèche de
// reprise est LA même que celle du pronom personnel dans la fiche sœur.
const phraseQui = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "qui", focus: true },
    { texte: "répare" },
    { texte: "son" },
    { texte: "filet" },
    { texte: "est" },
    { texte: "mon" },
    { texte: "voisin" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "pronom relatif" }],
  liens: [{ de: 2, vers: 1, label: "reprend", type: "reprise" }],
  legende: "« qui » est sujet de « répare ».",
});

const phraseQue = phrase({
  mots: [
    { texte: "Le" },
    { texte: "livre" },
    { texte: "que", focus: true },
    { texte: "je" },
    { texte: "lis" },
    { texte: "est" },
    { texte: "passionnant" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 2], label: "pronom relatif" },
    { mots: [3, 3], label: "sujet" },
  ],
  liens: [{ de: 2, vers: 1, label: "reprend", type: "reprise" }],
  legende: "Le sujet de « lis », c'est « je » : donc « que ».",
});

const phraseOu = phrase({
  mots: [
    { texte: "La" },
    { texte: "plage" },
    { texte: "où", focus: true },
    { texte: "nous" },
    { texte: "allons" },
    { texte: "est" },
    { texte: "déserte" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "pronom relatif" }],
  liens: [{ de: 2, vers: 1, label: "un lieu", type: "reprise" }],
  legende: "« où » reprend un lieu.",
});

const pieges = [
  "Compter les virgules au lieu des verbes conjugués : c'est le verbe qui fait la proposition.",
  "Croire que « qui » sert pour les personnes et « que » pour les choses : « qui » est le sujet du verbe qui suit, voilà tout.",
  "Confondre « et » (coordination : deux propositions à égalité) et « quand » (subordination : l'une dépend de l'autre).",
];

const aRetenir = [
  "Autant de verbes conjugués, autant de propositions.",
  "Deux propositions se juxtaposent (virgule) ou se coordonnent (et, mais, ou, donc).",
  "« qui » est sujet du verbe qui suit ; « que » ne l'est pas ; « où » reprend un lieu.",
];

export const fichePhraseComplexeCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "phrase-complexe",
  titre: "La phrase complexe",
  accroche:
    "Une phrase peut en contenir deux. Pour le savoir, on ne compte ni les mots ni les virgules : on compte les verbes conjugués.",
  identite: [
    { label: "Mots clés", valeur: "Proposition, juxtaposition, coordination, pronom relatif" },
    { label: "Le secret", valeur: "On compte les verbes conjugués" },
    { label: "Outil", valeur: "Les petits mots qui relient" },
  ],
  definition: {
    texte:
      "Une proposition est un groupe de mots organisé autour d'un verbe conjugué. Une phrase qui n'en contient qu'une est une phrase simple ; une phrase qui en contient au moins deux est une phrase complexe. Les propositions peuvent être posées côte à côte (juxtaposées), reliées par un petit mot d'égalité (coordonnées), ou l'une dépendre de l'autre (subordonnées).",
  },
  figure: {
    schema: pile(phraseSimple, phraseCoordonnee),
    legende:
      "La même phrase, une fois avec un verbe conjugué, une fois avec deux : c'est le nombre de verbes, et rien d'autre, qui fait la phrase complexe.",
  },
  proprietes: [
    {
      titre: "On compte les verbes conjugués",
      texte: "Autant de verbes conjugués, autant de propositions — les virgules ne comptent pas.",
      schema: phraseCoordonnee,
    },
    {
      titre: "Juxtaposées",
      texte: "Les deux propositions sont simplement séparées par une virgule, un point-virgule ou deux points.",
      schema: phraseJuxtaposee,
    },
    {
      titre: "Coordonnées",
      texte: "Un petit mot les relie à égalité : et, mais, ou, donc, or, ni, car.",
      schema: phraseCoordonnee,
    },
    {
      titre: "Subordonnées",
      texte: "Un mot subordonnant (quand, parce que, si, que) rend une proposition dépendante de l'autre.",
      schema: phraseSubordonnee,
    },
  ],
  reel: {
    texte:
      "C'est ce qui permet d'écrire autre chose que des phrases courtes empilées : « Le vent souffle. La pluie tombe. » devient « Le vent souffle et la pluie tombe. » On relie deux idées au lieu de les juxtaposer, et le texte se met à couler — c'est exactement ce qu'on attend d'un récit en fin de cycle 3.",
  },
  historique: {
    texte:
      "Le mot « proposition » vient du latin : ce qu'on « pose devant » quelqu'un, c'est-à-dire une idée qu'on avance. Les grammairiens latins découpaient déjà les longues phrases de leurs orateurs pour comprendre comment elles tenaient debout.",
  },
  formule: {
    contexte: "Choisir entre « qui » et « que ».",
    expression: "qui = sujet du verbe qui suit      que = ce n'est pas le sujet",
    legende:
      "« Le pêcheur qui répare son filet » : qui répare ? le pêcheur → « qui ». « Le livre que je lis » : qui lit ? je → ce n'est pas le pronom, donc « que ».",
    schema: pile(phraseQui, phraseQue),
  },
  methode: [
    {
      titre: "Je souligne les verbes conjugués",
      texte: "Je change le temps de la phrase : les mots qui bougent sont les verbes conjugués.",
      schema: phraseCoordonnee,
    },
    {
      titre: "Je compte les propositions",
      texte: "Un verbe conjugué = une proposition. Deux verbes ou plus : la phrase est complexe.",
      schema: phraseSimple,
    },
    {
      titre: "Je regarde le mot qui relie",
      texte: "Une virgule : juxtaposées. Et, mais, ou, donc : coordonnées. Quand, parce que, qui : subordonnées.",
      schema: pile(phraseJuxtaposee, phraseSubordonnee),
    },
  ],
  usages: [
    {
      titre: "Poser deux idées côte à côte",
      detail: "La juxtaposition : une virgule suffit, rien n'est expliqué.",
      schema: phraseJuxtaposee,
    },
    {
      titre: "Relier deux idées à égalité",
      detail: "La coordination : « et » ajoute, « mais » oppose, « donc » conclut.",
      schema: phraseCoordonnee,
    },
    {
      titre: "Faire dépendre une idée de l'autre",
      detail: "La subordination : « quand » dit le moment, « parce que » dit la cause.",
      schema: phraseSubordonnee,
    },
  ],
  exemples: [
    {
      titre: "Simple ou complexe ?",
      donnees: "« Le vent souffle sur le lagon. »",
      schema: phraseSimple,
      question: "Cette phrase est-elle simple ou complexe ?",
      solution:
        "Elle n'a qu'un seul verbe conjugué, « souffle » : une seule proposition, donc une phrase simple. « sur le lagon » est un complément, pas une proposition — il n'a pas de verbe.",
    },
    {
      titre: "Compter les propositions",
      donnees: "« Quand la pluie s'arrête, les enfants sortent. »",
      schema: phraseSubordonnee,
      question: "Combien de propositions ? Comment sont-elles reliées ?",
      solution:
        "Deux verbes conjugués — « s'arrête » et « sortent » — donc deux propositions. « Quand » soumet la première à la seconde : elles sont subordonnées.",
    },
    {
      titre: "Juxtaposées ou coordonnées ?",
      donnees: "« Le vent souffle, la pluie tombe. » et « Le vent souffle et la pluie tombe. »",
      schema: pile(phraseJuxtaposee, phraseCoordonnee),
      question: "Qu'est-ce qui change entre les deux phrases ?",
      solution:
        "Les deux propositions sont les mêmes. Dans la première, une virgule les sépare : elles sont juxtaposées. Dans la seconde, « et » les relie : elles sont coordonnées.",
    },
    {
      titre: "« qui » ou « que » ?",
      donnees: "« Le livre … je lis est passionnant. »",
      schema: phraseQue,
      question: "Quel pronom relatif faut-il écrire ?",
      solution:
        "On cherche le sujet de « lis » : c'est « je ». Le pronom n'est donc pas sujet, on écrit « que ». Avec « Le pêcheur … répare son filet », le sujet de « répare » est le pêcheur : on écrirait « qui ».",
    },
    {
      titre: "Le pronom « où »",
      donnees: "« La plage … nous allons est déserte. »",
      schema: phraseOu,
      question: "Quel pronom relatif convient ?",
      solution:
        "« où » : il reprend un lieu, ici « la plage ». « qui » et « que » reprendraient une personne ou une chose sans dire le lieu.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Paul court et Léa saute. » Combien de verbes conjugués, et combien de propositions ?",
      correction:
        "Deux verbes conjugués, « court » et « saute » : donc deux propositions. La phrase est complexe, et les propositions sont coordonnées par « et ».",
    },
    {
      question: "« Le margouillat dort sur le mur. » Phrase simple ou complexe ?",
      correction:
        "Un seul verbe conjugué, « dort » : une seule proposition, donc une phrase simple.",
    },
    {
      question: "Comment sont reliées les propositions de « Il pleut, nous restons à la maison. » ?",
      correction:
        "Par une simple virgule : elles sont juxtaposées. Avec « donc », elles seraient coordonnées.",
    },
    {
      question: "« Le pêcheur … répare son filet est mon voisin. » : « qui » ou « que » ?",
      correction:
        "« qui ». On demande : qui répare ? Le pêcheur. Le pronom est sujet du verbe qui suit.",
    },
    {
      question: "« La plage … nous allons est déserte. » : quel pronom relatif ?",
      correction: "« où », parce qu'il reprend un lieu — la plage.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesPhraseComplexeCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Phrase complexe - CM2",
    section: {
      type: "objectif",
      phrase: "Reconnaître une phrase qui en contient deux",
      sousPhrase:
        "On compte les verbes conjugués, puis on regarde le petit mot qui relie les propositions.",
      encadre: {
        titre: "L'idée",
        texte: "Autant de verbes conjugués, autant de propositions.",
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
          "Écrire autrement qu'en phrases courtes empilées : relier deux idées au lieu de les poser l'une après l'autre, et comprendre une phrase longue quand on lit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Proposition » vient du latin : ce qu'on pose devant quelqu'un, une idée qu'on avance. Les Latins découpaient déjà les longues phrases de leurs orateurs.",
      },
    },
  },
  {
    titre: "Simple ou complexe ?",
    badge: "La règle de comptage",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Phrase simple",
        contenu: "« Le vent souffle sur le lagon. » Un verbe conjugué, une proposition.",
      },
      droite: {
        variante: "ok",
        titre: "Phrase complexe",
        contenu: "« Le vent souffle et la pluie tombe. » Deux verbes conjugués, deux propositions.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePhraseComplexeCm2.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Comment sont-elles reliées ?",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: fichePhraseComplexeCm2.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "« qui » ou « que » ?",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Le livre … je lis est passionnant. »",
      question: "Quel pronom relatif faut-il écrire ?",
      correction:
        "Le sujet de « lis » est « je ». Le pronom n'est donc pas sujet : on écrit « que ».",
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
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "« Paul court et Léa saute. »",
      question: "Combien de propositions, et comment sont-elles reliées ?",
      indice: "Souligne d'abord les verbes conjugués.",
      correction:
        "Deux verbes conjugués, « court » et « saute » : deux propositions, coordonnées par « et ».",
    },
  },
];
