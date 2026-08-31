// ─── Fiche de cours : lire un document (CM1) ──────────────────────────────────
// QUATRIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ SÉPARATION À TROIS COLONNES — les deux voisines ont pris les fils forts :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ un document, on n'y LIT pas : on y CHERCHE | croiser deux documents : la réponse nait de leur rencontre | quelqu'un a DÉCIDÉ de ce que tu vois |
//   | les micros | nature et source · prélever · COMPOSITE | croiser · combiner | le cadre · la source · l'image |
//
// ⛔ NE PAS REDIRE : « la réponse n'est dans aucun des deux » appartient au CM2,
// « un document n'est jamais le monde » à la 6e.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT DU POOL AUTANT QUE DES MICROS. Le pool
// DOCUMENT n'interroge pas des textes d'école : une affiche de piscine, une boite
// de jeu, un sommaire, un plan de ville, une recette, un pot de yaourt. Or
// PERSONNE NE LIT UN POT DE YAOURT EN ENTIER — on regarde la date. Personne ne
// lit un plan : on cherche une rue. UN DOCUMENT, ON N'Y LIT PAS TOUT : ON Y
// CHERCHE. C'est l'inverse exact d'une histoire, qui se lit dans l'ordre et en
// entier.
//
// ⭐ Et le micro propre au CM1 le confirme : `cm1_doc_composite`, « découvrir un
// document composite et S'Y REPÉRER ». Se repérer, pas lire. Un document
// composite a un titre, une image, une légende, un tableau — on saute de l'un à
// l'autre selon ce qu'on cherche.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · tout texte projeté sous 250 signes.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool DOCUMENT de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, dont les
// exemples sont repris tels quels (la piscine, le plan, le yaourt).
//
// Micro-compétences couvertes (les 4 de la notion `comprehension_documents`) :
// - cm1_doc_source            → propriétés 2 et 3, méthode 1, exemple 1
// - cm1_doc_infos             → figure, propriété 1, méthode 2, exemples 2 et 3
// - cm1_doc_composite         → propriétés 4 et 5, méthode 3, exemple 4
// - cm1_comp_documents_defi   → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
 *  plancher de 11 px. */
function grille(opts: {
  headers: string[];
  rows: { values: string[] }[];
  highlight?: { row?: number };
  caption?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "tableau_donnees",
        headers: opts.headers,
        rows: opts.rows,
        highlight: opts.highlight,
        caption: opts.caption,
        display: { compact: true, striped: true },
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

// ─── Les dessins ──────────────────────────────────────────────────────────────

const chercherPasLire = phrase({
  mots: [
    { texte: "tout lire", barre: true },
    { texte: "aller chercher", focus: true },
  ],
  legende: "Personne ne lit un pot de yaourt en entier. On regarde la date.",
});

const grilleQuotidien = grille({
  headers: ["L'objet", "On y cherche"],
  rows: [
    { values: ["un yaourt", "la date"] },
    { values: ["un plan", "une rue"] },
    { values: ["une recette", "un temps"] },
  ],
  caption: "À chaque fois, une seule chose. Le reste, on le saute.",
});

const natureEtSource = phrase({
  mots: [
    { texte: "c'est quoi ?" },
    { texte: "ça vient d'où ?" },
  ],
  legende: "Les deux questions à poser avant de chercher quoi que ce soit.",
});

const documentCompose = phrase({
  mots: [
    { texte: "un titre" },
    { texte: "une image" },
    { texte: "un tableau" },
  ],
  legende: "Plusieurs morceaux sur la même page. On passe de l'un à l'autre.",
});

const legendeExplique = phrase({
  mots: [
    { texte: "la légende" },
    { texte: "les symboles", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "explique", type: "question" }],
  legende: "Sans elle, les dessins d'un plan ne veulent rien dire.",
});

const pasDansLordre = phrase({
  mots: [
    { texte: "de gauche à droite", barre: true },
    { texte: "là où c'est", focus: true },
  ],
  legende: "Une histoire se lit dans l'ordre. Un document, non.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionDocumentsCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "comprehension-documents",
  titre: `Lire un document en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Personne ne lit un pot de yaourt en entier. On cherche la date, et c'est tout. Un document, ce n'est pas une histoire : on n'y lit pas tout, on y cherche une chose.",
  identite: [
    { label: "Mots clés", valeur: "Chercher, source, légende" },
    { label: "Le secret", valeur: "On n'y lit pas : on y cherche" },
    { label: "Outil", valeur: "Qu'est-ce que je cherche ?" },
  ],
  definition: {
    texte: [
      "Un document, ce n'est pas une histoire.",
      "Une histoire se lit dans l'ordre, du début à la fin. Un document, non : on va directement où se trouve ce qu'on cherche.",
      "Avant de chercher, tu dis deux choses : ce que c'est, et d'où ça vient.",
      "Certains documents ont plusieurs morceaux : un titre, une image, une légende, un tableau.",
      "La légende explique ce que veulent dire les dessins. Ce n'est pas une décoration.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(chercherPasLire, grilleQuotidien),
  },
  proprietes: [
    {
      titre: "On y cherche, on n'y lit pas tout",
      texte: "Sur un plan, tu cherches une rue. Tu ne lis pas les autres.",
      schema: chercherPasLire,
      micros: ["cm1_doc_infos"],
    },
    {
      titre: "D'abord : c'est quoi ?",
      texte: "Une affiche, une recette, un plan, un article. Le dire change ce qu'on y cherche.",
      schema: natureEtSource,
      micros: ["cm1_doc_source"],
    },
    {
      titre: "Ensuite : ça vient d'où ?",
      texte: "Un journal, un livre, une boite de jeu. La source dit à qui on a affaire.",
      schema: natureEtSource,
      micros: ["cm1_doc_source"],
    },
    {
      titre: "Certains ont plusieurs morceaux",
      texte: "Un titre, une image, un tableau, une légende. Tout est sur la même page.",
      schema: documentCompose,
      micros: ["cm1_doc_composite"],
    },
    {
      titre: "La légende n'est pas une décoration",
      texte: "Elle explique ce que veulent dire les symboles. Sans elle, un plan est muet.",
      schema: legendeExplique,
      micros: ["cm1_doc_composite"],
    },
    {
      titre: "Le défi : ne pas lire dans l'ordre",
      texte: "C'est le plus dur, parce qu'on a appris à lire de gauche à droite.",
      schema: pasDansLordre,
      micros: ["cm1_comp_documents_defi"],
    },
  ],
  reel: {
    texte:
      "Tu le fais déjà. Devant un menu, tu ne lis pas les entrées si tu veux un dessert. Devant les horaires du bus, tu cherches ta ligne et rien d'autre. Personne ne te l'a appris : tu l'as trouvé tout seul.",
  },
  historique: {
    texte:
      "Le mot « légende » vient du latin legenda, qui voulait dire « ce qui doit être lu ». C'était le texte qu'on lisait à voix haute un jour précis, et qu'on ne pouvait pas sauter. Drôle de destin : c'est aujourd'hui la partie que tout le monde saute.",
  },
  methode: [
    {
      titre: "Dis à voix basse ce que c'est",
      texte: "« C'est une affiche. » « C'est une recette. » Ça prend une seconde et ça oriente tout.",
      schema: natureEtSource,
      micros: ["cm1_doc_source"],
    },
    {
      titre: "Pose ta question avant de regarder",
      texte: "« Je cherche l'heure. » Tu sauras alors quoi ignorer, et tu iras droit dessus.",
      schema: chercherPasLire,
      micros: ["cm1_doc_infos"],
    },
    {
      titre: "Cherche la légende en premier",
      texte: "Sur un plan ou un schéma, elle est la clé. Les autres dessins ne parlent pas sans elle.",
      schema: legendeExplique,
      micros: ["cm1_doc_composite"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Une affiche",
      donnees: "« Piscine ouverte de 9 h à 18 h, sauf le lundi. »",
      schema: natureEtSource,
      question: "Peut-on y aller le lundi ?",
      solution:
        "Non, elle est fermée le lundi. Tu n'as pas eu besoin de tout lire : le mot « sauf » suffisait.",
      micros: ["cm1_doc_source"],
    },
    {
      titre: "Un pot de yaourt",
      donnees: "« À consommer avant le 12/05. »",
      schema: chercherPasLire,
      question: "Que dit cette date ?",
      solution:
        "Jusqu'à quand on peut le manger. Sur un pot, c'est presque la seule chose qu'on regarde — et c'est normal.",
      micros: ["cm1_doc_infos"],
    },
    {
      titre: "Un sommaire",
      donnees: "« Chapitre 3 ..... page 20 »",
      schema: pasDansLordre,
      question: "À quoi sert le numéro ?",
      solution:
        "À trouver où commence le chapitre. Un sommaire ne se lit pas : il sert à sauter directement au bon endroit.",
      micros: ["cm1_doc_infos"],
    },
    {
      titre: "Un plan de ville",
      donnees: "Un plan avec des petits symboles un peu partout.",
      schema: legendeExplique,
      question: "À quoi sert la légende ?",
      solution:
        "À expliquer ce que représentent les symboles. Sans elle, tu vois des dessins sans savoir lesquels sont une école ou une gare.",
      micros: ["cm1_doc_composite"],
    },
  ],
  pieges: [
    "Lire un document du début à la fin comme une histoire.",
    "Chercher sans savoir ce qu'on cherche.",
    "Sauter la légende : c'est elle qui explique les symboles.",
    "Oublier de dire ce que c'est avant de commencer.",
    "Croire qu'il faut tout lire pour bien faire.",
  ],
  aRetenir: [
    "Un document, on n'y lit pas tout : on y cherche.",
    "D'abord, dire ce que c'est et d'où ça vient.",
    "Une histoire se lit dans l'ordre. Un document, non.",
    "Un document composite a plusieurs morceaux sur la même page.",
    "La légende explique les symboles. Elle ne se saute pas.",
  ],
  entrainement: [
    {
      question: "« Piscine ouverte de 9 h à 18 h, sauf le lundi. » Le lundi ?",
      correction: "Non, elle est fermée.",
      micros: ["cm1_doc_source"],
    },
    {
      question: "« À consommer avant le 12/05. » Que dit cette date ?",
      correction: "Jusqu'à quand on peut le manger.",
      micros: ["cm1_doc_infos"],
    },
    {
      question: "Sur un plan de ville, à quoi sert la légende ?",
      correction: "À expliquer ce que représentent les symboles.",
      micros: ["cm1_doc_composite"],
    },
    {
      question: "« Chapitre 3 ..... page 20 » : à quoi sert la page ?",
      correction: "À trouver où commence le chapitre.",
      micros: ["cm1_doc_infos"],
    },
    {
      question: "Faut-il lire un document en entier ?",
      correction: "Non. On y cherche une chose, et on saute le reste.",
      micros: ["cm1_comp_documents_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesComprehensionDocumentsCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire un document - CM1",
    section: {
      type: "objectif",
      phrase: "On n'y lit pas : on y cherche",
      sousPhrase: "Personne ne lit un pot de yaourt en entier.",
      encadre: { titre: "L'idée", texte: "Un document n'est pas une histoire." },
    },
  },
  {
    titre: "Une seule chose à la fois",
    badge: "Lire un document - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Un yaourt", texte: "On cherche la date." },
        { titre: "Un plan", texte: "On cherche une rue." },
        { titre: "Une recette", texte: "On cherche un temps." },
      ],
    },
    schema: grilleQuotidien,
  },
  {
    titre: "Deux questions avant de chercher",
    badge: "Lire un document - CM1",
    section: {
      type: "etapes",
      etapes: [
        "C'est quoi ? Une affiche, une recette, un plan.",
        "Ça vient d'où ? Un journal, un livre, une boite.",
        "Ensuite seulement : qu'est-ce que je cherche ?",
      ],
    },
    schema: natureEtSource,
  },
  {
    titre: "À vous",
    badge: "Lire un document - CM1",
    section: {
      type: "exercice",
      enonce: "Un plan de ville, avec des petits symboles partout.",
      question: "À quoi sert la légende ?",
      indice: "Sans elle, les dessins ne disent rien.",
      correction: "À expliquer ce que représentent les symboles.",
    },
    schema: legendeExplique,
  },
];
