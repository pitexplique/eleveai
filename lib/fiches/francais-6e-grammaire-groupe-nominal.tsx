// ─── Fiche de cours : le groupe nominal et ses expansions (6e) ────────────────
// DEUXIÈME FICHE DE FRANÇAIS DE LA 6e, après `francais-6e-grammaire-complements`.
// Les deux se suivent : la première dit ce que le verbe appelle après lui, celle
// -ci dit ce qui vient s'accrocher au NOM.
//
// ⭐ POURQUOI ELLE COMPTE. Le BO de 6e demande de « identifier et différencier
// SANS AMBIGÜITÉ adjectif/groupe adjectival de fonction épithète et groupe
// nominal prépositionnel de fonction complément du nom ». « Sans ambigüité » est
// écrit dans le programme : c'est le niveau d'exigence de l'année. Et c'est une
// autre opposition que celle du CM2, qui oppose l'épithète à l'ATTRIBUT — la
// fiche le dit, parce qu'un élève qui vient du CM2 arrive avec l'autre.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `grammaire_groupe_nominal`) et sur les pools GN, GN_FONCTION et
// COMPLEMENT_NOM de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 6e_gram_gn                 → définition, figure, propriété « Le noyau
//                                commande », exemple 1, entraînement 1
// - 6e_gram_gn_toute_fonction  → propriété « Un groupe nominal reste un groupe
//                                nominal », exemple 2, piège 3, entraînement 2
// - 6e_gram_epithete_cn        → propriétés « L'épithète » et « Le complément du
//                                nom », formule, méthode, exemples 3 et 4,
//                                pièges 1 et 2, entraînements 3 et 4
// - 6e_gram_gn_defi            → le défi, dessiné (exemple 5) + entraînement 5
//
// Les groupes sont CEUX DE LA BANQUE : « une plage déserte », « le cari de ma
// grand-mère », « la case en tôle », « le chemin du piton », « un jus de
// letchi », « un grand bateau blanc », « ce vieux livre poussiéreux », « Le
// pêcheur répare son filet », « Sur le piton souffle un vent froid ».
//
// ⛔ L'ÉPITHÈTE ET LE COMPLÉMENT DU NOM SONT DE LA MÊME COULEUR, ET C'EST VOULU.
// Le canvas peint en rose toutes les expansions du nom, dans toute la matière —
// une fiche écrit un `label`, jamais une couleur, sinon deux fiches finissent
// par diverger. Ce qui les distingue n'est donc pas peint, il est DESSINÉ : le
// petit mot qui introduit le complément du nom est mis en relief (`focus`), et
// il n'y en a aucun devant l'épithète. C'est exactement le critère du BO —
// « groupe nominal PRÉPOSITIONNEL » — et c'est ce que l'élève doit apprendre à
// voir, pas une teinte à retenir.
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — les dessins rendus
// hors du site en 250 / 340 / 400 px, aucun texte sous 11 px à l'échelle.

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

// ─── Les groupes de la banque, dessinés ───────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : les deux expansions dans le MÊME groupe. « déserte »
// est collée au nom ; « du piton » passe par un petit mot. La flèche d'accord
// part du noyau, pour montrer du même coup qui commande.
const gnReference = phrase({
  mots: [
    { texte: "le", nature: "dét." },
    { texte: "long", nature: "adj." },
    { texte: "chemin", nature: "nom", focus: true },
    { texte: "du", nature: "prép." },
    { texte: "piton", nature: "nom" },
  ],
  groupes: [
    { mots: [1, 1], label: "épithète" },
    { mots: [3, 4], label: "complément du nom" },
  ],
  liens: [{ de: 2, vers: 1, label: "accord", type: "accord" }],
  legende: "Un seul noyau, « chemin », et deux façons de le compléter.",
});

// Le noyau : on l'isole en montrant qu'il survit à la suppression de tout le
// reste. C'est le test, pas une définition.
const gnNoyau = phrase({
  mots: [
    { texte: "ce", nature: "dét.", barre: true },
    { texte: "vieux", nature: "adj.", barre: true },
    { texte: "livre", nature: "nom", focus: true },
    { texte: "poussiéreux", nature: "adj.", barre: true },
  ],
  legende: "On barre tout ce qu'on peut : il reste « livre ». C'est le noyau.",
});

// L'accord, qui prouve que le noyau commande.
const gnAccord = phrase({
  mots: [
    { texte: "des", nature: "dét." },
    { texte: "fleurs", nature: "nom", focus: true },
    { texte: "rouges", nature: "adj." },
  ],
  groupes: [{ mots: [2, 2], label: "épithète" }],
  liens: [
    { de: 1, vers: 0, label: "pluriel", type: "accord" },
    { de: 1, vers: 2, label: "pluriel", type: "accord" },
  ],
  legende: "Le nom donne son genre et son nombre au déterminant et à l'adjectif.",
});

// L'ÉPITHÈTE : rien entre elle et le nom. Deux exemples, l'un après le nom,
// l'autre avant — parce que la place n'est pas le critère.
const gnEpitheteApres = phrase({
  mots: [
    { texte: "une", nature: "dét." },
    { texte: "plage", nature: "nom", focus: true },
    { texte: "déserte", nature: "adj." },
  ],
  groupes: [{ mots: [2, 2], label: "épithète" }],
  legende: "Rien entre le nom et l'adjectif : c'est une épithète.",
});

const gnEpitheteAvant = phrase({
  mots: [
    { texte: "un", nature: "dét." },
    { texte: "grand", nature: "adj." },
    { texte: "bateau", nature: "nom", focus: true },
    { texte: "blanc", nature: "adj." },
  ],
  groupes: [
    { mots: [1, 1], label: "épithète" },
    { mots: [3, 3], label: "épithète" },
  ],
  legende: "Avant ou après le nom : c'est toujours une épithète.",
});

// LE COMPLÉMENT DU NOM : le petit mot est mis en relief. C'est LUI qu'on
// apprend à voir — « groupe nominal PRÉPOSITIONNEL », dit le BO.
const gnComplementCari = phrase({
  mots: [
    { texte: "le", nature: "dét." },
    { texte: "cari", nature: "nom", focus: true },
    { texte: "de", nature: "prép.", focus: true },
    { texte: "ma" },
    { texte: "grand-mère", nature: "nom" },
  ],
  groupes: [{ mots: [2, 4], label: "complément du nom" }],
  legende: "« de » relie : le second nom complète le premier.",
});

const gnComplementCase = phrase({
  mots: [
    { texte: "la", nature: "dét." },
    { texte: "case", nature: "nom", focus: true },
    { texte: "en", nature: "prép.", focus: true },
    { texte: "tôle", nature: "nom" },
  ],
  groupes: [{ mots: [2, 3], label: "complément du nom" }],
  legende: "« en », « de », « à », « pour » : le petit mot change, le rôle non.",
});

// LE PIÈGE DU CM2, RAPPELÉ : la même plage, mais après un verbe d'état.
const gnAttributRappel = phrase({
  mots: [
    { texte: "La" },
    { texte: "plage" },
    { texte: "est", focus: true },
    { texte: "déserte" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  legende: "Un verbe d'état sépare : « déserte » n'est plus épithète, mais attribut.",
});

// UN GROUPE NOMINAL RESTE UN GROUPE NOMINAL, où qu'il soit. Deux fonctions
// différentes dans la même phrase.
const gnDeuxFonctions = phrase({
  mots: [
    { texte: "Le", nature: "dét." },
    { texte: "pêcheur", nature: "nom" },
    { texte: "répare", nature: "verbe", focus: true },
    { texte: "son", nature: "dét." },
    { texte: "filet", nature: "nom" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 4], label: "COD" },
  ],
  legende: "Deux groupes nominaux, deux fonctions — même nature.",
});

const gnSujetInverse = phrase({
  mots: [
    { texte: "Sur" },
    { texte: "le" },
    { texte: "piton" },
    { texte: "souffle", focus: true },
    { texte: "un" },
    { texte: "vent" },
    { texte: "froid" },
  ],
  groupes: [{ mots: [4, 6], label: "sujet" }],
  liens: [{ de: 3, vers: 5, label: "qui est-ce qui ?", type: "question" }],
  legende: "Un groupe nominal sujet, placé après le verbe. Il reste sujet.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Les deux expansions dans un seul
// groupe, et un piège de plus : « letchi » est un nom, pas un adjectif.
const gnDefi = phrase({
  mots: [
    { texte: "un", nature: "dét." },
    { texte: "grand", nature: "adj." },
    { texte: "jus", nature: "nom", focus: true },
    { texte: "de", nature: "prép.", focus: true },
    { texte: "letchi", nature: "nom" },
  ],
  groupes: [
    { mots: [1, 1], label: "épithète" },
    { mots: [3, 4], label: "complément du nom" },
  ],
  legende: "« letchi » est un nom : ce n'est donc pas une épithète.",
});

const pieges = [
  "Croire que la place décide : « un grand bateau » et « un bateau blanc » ont tous les deux une épithète. Ce qui décide, c'est l'absence de petit mot devant.",
  "Confondre avec l'attribut. « une plage déserte » : épithète. « La plage est déserte » : attribut du sujet — c'est le verbe d'état qui a tout changé. Le CM2 travaillait cette opposition-là ; la 6e y ajoute celle de l'épithète et du complément du nom.",
  "Croire qu'un groupe nominal cesse d'en être un quand il devient complément : sa nature ne change pas, seule sa fonction change.",
  "Prendre le nom du complément du nom pour le noyau : dans « le cari de ma grand-mère », le noyau est « cari », et c'est lui qui commande l'accord du verbe.",
];

const aRetenir = [
  "Le groupe nominal s'organise autour d'un nom noyau, qui donne son genre et son nombre à tout le groupe.",
  "L'épithète est collée au nom, sans petit mot ; le complément du nom est introduit par une préposition (de, à, en, pour).",
  "Un groupe nominal reste un groupe nominal quelle que soit sa fonction dans la phrase.",
];

export const ficheGroupeNominal6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "grammaire-groupe-nominal",
  titre: "Le groupe nominal : épithète et complément du nom",
  accroche:
    "« Un grand jus de letchi. » Deux mots complètent « jus », et ce ne sont pas les mêmes : l'un est collé, l'autre passe par un petit mot. C'est ce petit mot qui décide de tout.",
  identite: [
    { label: "Mots clés", valeur: "Nom noyau, expansion, épithète, complément du nom" },
    { label: "Le secret", valeur: "Y a-t-il un petit mot devant ?" },
    { label: "Outil", valeur: "Barrer pour trouver le noyau" },
  ],
  definition: {
    texte:
      "Un groupe nominal s'organise autour d'un nom : c'est le nom noyau. Autour de lui, un déterminant et, souvent, des expansions qui le précisent. Il y en a deux sortes en 6e. L'adjectif collé au nom, sans rien entre eux, est une épithète : « une plage déserte ». Le groupe nominal introduit par une préposition — de, à, en, pour — est un complément du nom : « le chemin du piton ». Le noyau, lui, commande : c'est son genre et son nombre que prennent le déterminant et l'épithète.",
  },
  figure: {
    schema: gnReference,
    legende:
      "« le long chemin du piton » : un seul noyau, « chemin », et deux façons de le compléter. « long » est collé au nom — épithète. « du piton » passe par la préposition « du », mise en relief — complément du nom. Les deux sont roses parce que ce sont deux expansions du nom ; ce qui les distingue se voit, il ne se colorie pas.",
  },
  proprietes: [
    {
      titre: "Le noyau, c'est ce qui reste",
      texte: "On barre le déterminant et les expansions : le nom qui survit est le nom noyau.",
      schema: gnNoyau,
    },
    {
      titre: "Le noyau commande l'accord",
      texte: "Le déterminant et l'épithète prennent le genre et le nombre du nom noyau, pas l'inverse.",
      schema: gnAccord,
    },
    {
      titre: "L'épithète est collée au nom",
      texte: "Un adjectif, avant ou après le nom, sans aucun petit mot entre eux : la place ne décide pas.",
      schema: pile(gnEpitheteApres, gnEpitheteAvant),
    },
    {
      titre: "Le complément du nom passe par une préposition",
      texte: "Un groupe nominal relié au noyau par de, à, en ou pour : le petit mot est le signe.",
      schema: pile(gnComplementCari, gnComplementCase),
    },
    {
      titre: "Un groupe nominal reste un groupe nominal",
      texte: "Sujet, complément d'objet, après une préposition : sa fonction change, sa nature jamais.",
      schema: pile(gnDeuxFonctions, gnSujetInverse),
    },
  ],
  reel: {
    texte:
      "C'est ce qui permet d'écrire juste quand la phrase s'allonge. « Le cari de ma grand-mère est délicieux » : c'est « cari » qui commande, pas « grand-mère » — on écrit « est », au singulier. Et c'est aussi ce qui rend un texte précis : « une case » ne dit presque rien ; « la case en tôle du bord de mer » donne à voir. Enrichir un nom, c'est le premier geste de celui qui décrit.",
  },
  historique: {
    texte:
      "« Épithète » vient du grec epitheton : « ce qui est ajouté ». Chez Homère, les épithètes sont des étiquettes qui reviennent : Ulysse « aux mille ruses », l'aurore « aux doigts de rose ». Elles servaient d'abord à la mémoire — un chanteur qui récitait sans livre s'appuyait dessus. L'adjectif épithète de nos cahiers descend en droite ligne de là.",
  },
  formule: {
    contexte: "Le test qui tranche entre les deux expansions.",
    expression: "un petit mot devant ?",
    legende:
      "S'il n'y a rien entre le nom et ce qui le complète, c'est une épithète. S'il y a une préposition — de, à, en, pour —, c'est un complément du nom. Le test tient en une seconde et ne se trompe pas : « une plage déserte » (rien) ; « la case en tôle » (« en »).",
    schema: pile(gnEpitheteApres, gnComplementCase),
  },
  methode: [
    {
      titre: "Je trouve le noyau",
      texte: "Je barre le déterminant et tout ce qui complète : le nom qui reste est le noyau.",
      schema: gnNoyau,
    },
    {
      titre: "Je regarde ce qu'il y a devant l'expansion",
      texte: "Rien : épithète. Une préposition : complément du nom. C'est le seul critère sûr.",
      schema: pile(gnEpitheteApres, gnComplementCari),
    },
    {
      titre: "Je vérifie qu'aucun verbe ne s'est glissé",
      texte: "S'il y a un verbe d'état entre le nom et l'adjectif, ce n'est plus une épithète mais un attribut.",
      schema: gnAttributRappel,
    },
  ],
  usages: [
    {
      titre: "Dire de quoi c'est fait",
      detail: "« la case en tôle » : la matière, par un complément du nom.",
      schema: gnComplementCase,
    },
    {
      titre: "Dire à qui c'est",
      detail: "« le cari de ma grand-mère » : l'appartenance, par « de ».",
      schema: gnComplementCari,
    },
    {
      titre: "Dire comment c'est",
      detail: "« une plage déserte » : la qualité, par une épithète collée au nom.",
      schema: gnEpitheteApres,
    },
  ],
  exemples: [
    {
      titre: "Trouver le noyau",
      donnees: "« ce vieux livre poussiéreux »",
      schema: gnNoyau,
      question: "Quel est le nom noyau de ce groupe ?",
      solution:
        "« livre ». On barre « ce » (déterminant), « vieux » et « poussiéreux » (deux épithètes) : il ne reste que « livre », et le groupe a encore un sens. Un noyau, c'est le mot qu'on ne peut pas enlever.",
    },
    {
      titre: "Deux fonctions, une seule nature",
      donnees: "« Le pêcheur répare son filet. »",
      schema: gnDeuxFonctions,
      question: "Combien y a-t-il de groupes nominaux, et quelles sont leurs fonctions ?",
      solution:
        "Deux. « Le pêcheur » est sujet, « son filet » est complément d'objet direct. Leur fonction est différente, leur nature est la même : ce sont deux groupes nominaux. La nature, c'est ce que le groupe EST ; la fonction, le rôle qu'il joue.",
    },
    {
      titre: "Épithète ou complément du nom ?",
      donnees: "« une plage déserte » puis « la case en tôle »",
      schema: pile(gnEpitheteApres, gnComplementCase),
      question: "Quelle est l'expansion du nom dans chaque groupe ?",
      solution:
        "Dans le premier, « déserte » est un adjectif collé à « plage » : c'est une épithète. Dans le second, « en tôle » est relié à « case » par la préposition « en » : c'est un complément du nom. Le test ne demande qu'une chose : y a-t-il un petit mot devant ?",
    },
    {
      titre: "Le piège du verbe d'état",
      donnees: "« une plage déserte » puis « La plage est déserte. »",
      schema: pile(gnEpitheteApres, gnAttributRappel),
      question: "« déserte » a-t-il la même fonction dans les deux ?",
      solution:
        "Non. Dans le premier, rien ne sépare l'adjectif du nom : c'est une épithète, à l'intérieur du groupe nominal. Dans le second, le verbe d'état « est » s'est glissé entre les deux : « déserte » devient attribut du sujet. Même adjectif, même nom, deux fonctions — le verbe a tout changé.",
    },
    {
      titre: "Le défi",
      donnees: "« un grand jus de letchi »",
      schema: gnDefi,
      question: "Quelles sont les deux expansions, et quel est le noyau ?",
      solution:
        "Le noyau est « jus » : c'est lui qui reste quand on barre le reste. « grand » est un adjectif collé au nom : épithète. « de letchi » est introduit par la préposition « de » : complément du nom. Attention, « letchi » est un nom, pas un adjectif — ce n'est donc pas une deuxième épithète.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« un petit chat noir » — quel est le nom noyau ?",
      correction:
        "« chat ». On barre « un », « petit » et « noir » : le groupe garde un sens autour de « chat ». Les deux adjectifs sont des épithètes.",
    },
    {
      question: "« Sur le piton souffle un vent froid. » Quelle est la fonction du groupe nominal « un vent froid » ?",
      correction:
        "Sujet. On pose « qu'est-ce qui souffle ? » : un vent froid. Il est écrit après le verbe, et il reste sujet — un groupe nominal ne change pas de nature en changeant de place.",
    },
    {
      question: "« le chemin du piton » — « du piton » est-il une épithète ?",
      correction:
        "Non : c'est un complément du nom. « du » est une préposition (de + le), et une épithète n'a jamais de petit mot devant elle. C'est le seul critère à vérifier.",
    },
    {
      question: "« la maison du voisin est grande » — quel mot commande l'accord de « grande » ?",
      correction:
        "« maison », le nom noyau — féminin singulier. « voisin » n'est que dans le complément du nom : il ne commande rien. Sinon on écrirait « grand ».",
    },
    {
      question: "Défi : « un grand jus de letchi » — combien d'épithètes ?",
      correction:
        "Une seule : « grand ». « de letchi » est un complément du nom, introduit par « de », et « letchi » est un nom, pas un adjectif.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesGroupeNominal6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le groupe nominal - 6e",
    section: {
      type: "objectif",
      phrase: "Distinguer sans hésiter l'épithète et le complément du nom",
      sousPhrase:
        "On trouve le noyau, puis on regarde ce qu'il y a devant l'expansion : rien, ou une préposition.",
      encadre: {
        titre: "L'idée",
        texte: "Ce qui distingue les deux expansions, c'est le petit mot — ou son absence.",
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
          "« Le cari de ma grand-mère est délicieux » : c'est « cari » qui commande, pas « grand-mère ». Trouver le noyau, c'est écrire le verbe au bon nombre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Épithète » vient du grec epitheton, « ce qui est ajouté ». Chez Homère : Ulysse « aux mille ruses », l'aurore « aux doigts de rose ». Elles aidaient les chanteurs à réciter sans livre.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheGroupeNominal6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Épithète ou complément du nom ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'épithète",
        contenu:
          "« une plage déserte ». Un adjectif collé au nom, sans rien entre eux. Avant ou après le nom : c'est toujours une épithète.",
      },
      droite: {
        variante: "ok",
        titre: "Le complément du nom",
        contenu:
          "« la case en tôle ». Un groupe nominal relié au noyau par une préposition : de, à, en, pour. Le petit mot est le signe.",
      },
    },
  },
  {
    titre: "Le piège du verbe d'état",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Sans verbe",
        contenu: "« une plage déserte » : rien ne sépare l'adjectif du nom. C'est une épithète.",
      },
      droite: {
        variante: "piege",
        titre: "Avec un verbe d'état",
        contenu:
          "« La plage est déserte. » Le verbe « est » s'est glissé entre les deux : « déserte » devient attribut du sujet.",
      },
    },
  },
  {
    titre: "Trouver le noyau",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« ce vieux livre poussiéreux »",
      question: "Quel est le nom noyau ?",
      correction:
        "« livre ». On barre « ce », « vieux » et « poussiéreux » : le groupe garde un sens. Le noyau est le mot qu'on ne peut pas enlever.",
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
      enonce: "« un grand jus de letchi »",
      question: "Quel est le noyau, et quelles sont les deux expansions ?",
      indice: "Barre ce que tu peux enlever. Puis regarde ce qu'il y a devant chaque expansion.",
      correction:
        "Noyau : « jus ». « grand » est une épithète (rien devant). « de letchi » est un complément du nom (préposition « de ») — et « letchi » est un nom, pas un adjectif.",
    },
  },
];
