// ─── Fiche de cours : héros et merveilleux (CM1) ──────────────────────────────
// SIXIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ CAS LE PLUS SERRÉ DU CYCLE : le CM1 et le CM2 ont EXACTEMENT les trois
// mêmes entrées — héros, merveilleux, autres vies. La séparation ne pouvait donc
// pas venir des micros. Elle vient du POOL, en cherchant la ligne que le CM2
// n'avait pas prise.
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ ce qui fait le merveilleux, c'est que PERSONNE NE S'EN ÉTONNE | vivre autre chose sans quitter sa chaise | *(autre notion)* |
//
// ⛔ NE PAS REDIRE : « vivre autre chose sans quitter sa chaise » appartient au
// CM2, et couvre les trois entrées d'un coup. Ici on entre par une porte plus
// étroite et plus précise.
//
// ⭐⭐ LA DÉCOUVERTE, ET C'EST UNE LIGNE DU POOL MERVEILLEUX : « dans un conte
// merveilleux, les faits magiques SONT ADMIS : personne ne s'en étonne. » Ce
// n'est donc pas la fée qui fait le conte — c'est que personne, dans l'histoire,
// ne trouve la fée surprenante. Et le pool donne aussitôt le contraire, qui rend
// l'idée mesurable : dans L'ÉTRANGE, la magie inquiète et reste inexpliquée.
// ⭐ D'où un outil que l'enfant peut appliquer seul : REGARDE LES PERSONNAGES,
// PAS LA MAGIE. S'ils s'en étonnent, ce n'est pas du merveilleux.
//
// ⭐ Le héros suit la même logique de règle : il affronte une épreuve PLUS GRANDE
// QUE LUI, et il peut avoir des faiblesses — « c'est souvent ce qui le rend
// intéressant », dit le pool.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools HEROS, MERVEILLEUX et AUTRES_VIES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_personnages`) :
// - cm1_cult_heros        → propriétés 1 et 2, méthode 1, exemples 1 et 2
// - cm1_cult_merveilleux  → figure, propriétés 3 et 4, méthode 2, exemple 3
// - cm1_cult_autres_vies  → propriété 5, méthode 3, exemple 4
// - défi                  → propriété 6

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

const personneNeStonne = phrase({
  mots: [
    { texte: "une fée" },
    { texte: "pas surpris", focus: true },
  ],
  legende: "Ce n'est pas la magie qui fait le conte.",
});

const grilleDeuxMondes = grille({
  headers: ["La magie", "Le genre"],
  rows: [
    { values: ["va de soi", "le merveilleux"] },
    { values: ["inquiète", "l'étrange"] },
  ],
  caption: "Regarde les personnages, pas la magie.",
});

const epreuvePlusGrande = phrase({
  mots: [
    { texte: "le héros" },
    { texte: "plus grand que lui", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "affronte", type: "question" }],
  legende: "Une épreuve à sa taille ne ferait pas une histoire.",
});

const faiblesseUtile = phrase({
  mots: [
    { texte: "sans défaut", barre: true },
    { texte: "avec des peurs", focus: true },
  ],
  legende: "Ses faiblesses sont souvent ce qui le rend intéressant.",
});

const peurEnSecurite = phrase({
  mots: [
    { texte: "avoir peur" },
    { texte: "sans danger", focus: true },
  ],
  legende: "C'est ce que permet un livre : éprouver à distance.",
});

const seMettreALaPlace = phrase({
  mots: [
    { texte: "sa vie" },
    { texte: "la tienne", focus: true },
  ],
  legende: "Comprendre une autre vie t'aide à comprendre la tienne.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCulturePersonnagesCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "culture-personnages",
  titre: `Héros et merveilleux en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Dans un conte, une fée apparait et personne ne trouve ça bizarre. C'est ça, le merveilleux — pas la magie elle-même, mais le fait que personne ne s'en étonne.",
  identite: [
    { label: "Mots clés", valeur: "Héros, merveilleux, étrange" },
    { label: "Le secret", valeur: "Regarde les personnages, pas la magie" },
    { label: "Outil", valeur: "Est-ce que ça les étonne ?" },
  ],
  definition: {
    texte: [
      "Un héros, c'est quelqu'un qui affronte une épreuve plus grande que lui. Il peut avoir peur et des défauts : c'est souvent ce qui le rend intéressant.",
      "Le merveilleux, ce n'est pas la magie. C'est que personne, dans l'histoire, ne s'en étonne : la fée arrive, et tout le monde trouve ça normal.",
      "Quand la magie inquiète les personnages et reste inexpliquée, ce n'est plus du merveilleux : c'est de l'étrange.",
      "Alors pour reconnaitre les deux, regarde les personnages, pas la magie.",
      "Et lire, c'est vivre d'autres vies : avoir peur sans danger, et comprendre ce que ressent quelqu'un d'autre.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(personneNeStonne, grilleDeuxMondes),
  },
  proprietes: [
    {
      titre: "Le héros affronte plus grand que lui",
      texte: "Une épreuve à sa taille ne ferait pas une histoire.",
      schema: epreuvePlusGrande,
      micros: ["cm1_cult_heros"],
    },
    {
      titre: "Il a le droit d'avoir des faiblesses",
      texte: "Un héros sans peur et sans défaut n'intéresse personne.",
      schema: faiblesseUtile,
      micros: ["cm1_cult_heros"],
    },
    {
      titre: "Dans le merveilleux, la magie va de soi",
      texte: "Une fée, un ogre, une baguette : personne ne discute leur existence.",
      schema: personneNeStonne,
      micros: ["cm1_cult_merveilleux"],
    },
    {
      titre: "Dans l'étrange, elle inquiète",
      texte: "Elle reste inexpliquée, et les personnages ne sont pas rassurés.",
      schema: grilleDeuxMondes,
      micros: ["cm1_cult_merveilleux"],
    },
    {
      titre: "On peut avoir peur sans danger",
      texte: "C'est ce que permet un livre : éprouver la peur à distance.",
      schema: peurEnSecurite,
      micros: ["cm1_cult_autres_vies"],
    },
    {
      titre: "Le défi : se mettre à sa place",
      texte: "Ressentir ce que ressent quelqu'un d'autre, ça s'appelle l'empathie.",
      schema: seMettreALaPlace,
      micros: ["cm1_cult_autres_vies"],
    },
  ],
  reel: {
    texte:
      "Dans un film d'horreur, tu sursautes alors que tu es sur ton canapé. Ton corps a peur, ta tête sait que tu ne risques rien. C'est exactement ce que fait un livre — et c'est pour ça qu'on aime avoir peur en lisant.",
  },
  historique: {
    texte:
      "Le mot « fée » vient du latin fata : les Destinées, celles qui décidaient de la vie d'un enfant à sa naissance. Voilà pourquoi les fées des contes offrent des dons au berceau. Elles ne font pas de la magie : elles décident.",
  },
  methode: [
    {
      titre: "Demande-toi ce que le héros risque",
      texte: "S'il ne risque rien, ce n'est pas encore une histoire.",
      schema: epreuvePlusGrande,
      micros: ["cm1_cult_heros"],
    },
    {
      titre: "Regarde la tête des personnages",
      texte: "Étonnés par la magie ? c'est de l'étrange. Pas étonnés ? c'est du merveilleux.",
      schema: grilleDeuxMondes,
      micros: ["cm1_cult_merveilleux"],
    },
    {
      titre: "Demande-toi ce que tu aurais fait",
      texte: "À sa place, dans sa vie. C'est là que lire commence à servir.",
      schema: seMettreALaPlace,
      micros: ["cm1_cult_autres_vies"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Qu'est-ce qu'un héros ?",
      donnees: "« Qu'est-ce qui fait d'un personnage une héroïne ou un héros ? »",
      schema: epreuvePlusGrande,
      question: "Qu'est-ce qui le fait ?",
      solution:
        "Il affronte une épreuve plus grande que lui, et son choix nous apprend quelque chose. Ce n'est ni la force ni la magie.",
      micros: ["cm1_cult_heros"],
    },
    {
      titre: "Un héros peut-il avoir peur ?",
      donnees: "Le héros de ton livre tremble avant d'entrer dans la grotte.",
      schema: faiblesseUtile,
      question: "Est-ce encore un héros ?",
      solution:
        "Oui, et c'est même souvent ce qui le rend intéressant. Quelqu'un qui n'a jamais peur ne choisit rien.",
      micros: ["cm1_cult_heros"],
    },
    {
      titre: "L'ogre du Petit Poucet",
      donnees: "Dans « Le Petit Poucet », un ogre habite dans la forêt.",
      schema: personneNeStonne,
      question: "Est-ce du merveilleux ou de l'étrange ?",
      solution:
        "Du merveilleux. Personne dans l'histoire ne se demande si les ogres existent : son existence n'est pas discutée.",
      micros: ["cm1_cult_merveilleux"],
    },
    {
      titre: "Une vie loin de la tienne",
      donnees: "Tu lis l'histoire d'un enfant qui vit à l'autre bout du monde.",
      schema: seMettreALaPlace,
      question: "Qu'est-ce que ça t'apporte ?",
      solution:
        "Tu découvres d'autres façons de vivre — et tu comprends mieux la tienne. C'est ce qu'on appelle vivre d'autres vies.",
      micros: ["cm1_cult_autres_vies"],
    },
  ],
  pieges: [
    "Croire que c'est la magie qui fait le merveilleux.",
    "Confondre le merveilleux et l'étrange : regarde si les personnages s'étonnent.",
    "Penser qu'un héros doit être sans peur et sans défaut.",
    "Croire qu'un héros est forcément fort : il est surtout dépassé.",
    "Lire une vie très différente de la sienne sans se demander ce qu'on aurait fait.",
  ],
  aRetenir: [
    "Un héros affronte une épreuve plus grande que lui.",
    "Ses faiblesses le rendent intéressant.",
    "Le merveilleux, c'est quand personne ne s'étonne de la magie.",
    "L'étrange, c'est quand elle inquiète et reste inexpliquée.",
    "Lire permet d'avoir peur sans danger, et de comprendre d'autres vies.",
  ],
  entrainement: [
    {
      question: "« Dans un conte merveilleux, les faits magiques… »",
      correction: "Sont admis : personne ne s'en étonne.",
      micros: ["cm1_cult_merveilleux"],
    },
    {
      question: "Quelle est la différence entre le merveilleux et l'étrange ?",
      correction: "Dans le merveilleux la magie va de soi ; dans l'étrange elle inquiète.",
      micros: ["cm1_cult_merveilleux"],
    },
    {
      question: "Un héros peut-il avoir des faiblesses ?",
      correction: "Oui, et c'est souvent ce qui le rend intéressant.",
      micros: ["cm1_cult_heros"],
    },
    {
      question: "Pourquoi les contes font-ils peur sans danger ?",
      correction: "Parce qu'on éprouve la peur en sécurité, à distance, en lisant.",
      micros: ["cm1_cult_autres_vies"],
    },
    {
      question: "L'empathie, c'est…",
      correction: "La capacité à ressentir ce que ressent un autre.",
      micros: ["cm1_cult_autres_vies"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesCulturePersonnagesCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Héros et merveilleux - CM1",
    section: {
      type: "objectif",
      phrase: "Ce n'est pas la magie qui fait le conte",
      sousPhrase: "C'est que personne, dans l'histoire, ne s'en étonne.",
      encadre: { titre: "L'outil", texte: "Regarde les personnages, pas la magie." },
    },
  },
  {
    titre: "Deux mondes, une différence",
    badge: "Héros et merveilleux - CM1",
    section: {
      type: "duo",
      gauche: {
        titre: "Le merveilleux",
        contenu: "La fée arrive. Tout le monde trouve ça normal.",
      },
      droite: {
        titre: "L'étrange",
        contenu: "Quelque chose arrive. Personne ne comprend, et ça inquiète.",
      },
    },
    schema: grilleDeuxMondes,
  },
  {
    titre: "Ce qu'est un héros",
    badge: "Héros et merveilleux - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Il affronte une épreuve plus grande que lui.",
        "Il a le droit d'avoir peur et des défauts.",
        "C'est même souvent ce qui le rend intéressant.",
      ],
    },
    schema: epreuvePlusGrande,
  },
  {
    titre: "À vous",
    badge: "Héros et merveilleux - CM1",
    section: {
      type: "exercice",
      enonce: "Dans « Le Petit Poucet », un ogre habite dans la forêt.",
      question: "Merveilleux ou étrange ?",
      indice: "Est-ce que quelqu'un s'en étonne ?",
      correction: "Merveilleux. Personne ne se demande si les ogres existent.",
    },
    schema: personneNeStonne,
  },
];
