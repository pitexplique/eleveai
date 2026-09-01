// ─── Fiche de cours : la lettre qu'on n'entend pas (CM1) ──────────────────────
// SEIZIÈME FICHE DU CHANTIER CM1, et DERNIÈRE DU VOCABULAIRE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « S'APPUYER SUR LA
// DIMENSION MORPHOLOGIQUE des mots rencontrés lors de ses différentes lectures
// POUR LES ORTHOGRAPHIER » · le réemploi du vocabulaire étudié · la mémorisation
// de l'orthographe lexicale.
//
// ⭐⭐ POUR UNE FOIS, LA PORTE EST GRANDE OUVERTE : la notion du CM1 porte une
// micro QUE NI LE CM2 NI LA 6e N'ONT — `cm1_voc_morpho_orthographe`, « trouver
// la lettre muette grâce à un mot de la même famille », ajoutée le 22/08/2026
// pour couvrir un objectif du BO qui était resté sans micro. C'est donc elle qui
// porte la fiche.
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ fais PARLER le mot avant de l'apprendre par cœur | un mot n'est à toi que quand tu l'écris dans une phrase à toi |
//   | la micro propre | ⭐ `cm1_voc_morpho_orthographe` | le niveau de langue, le dictionnaire |
//
// ⛔ NE PAS REDIRE : « un mot n'est à toi que quand tu peux l'écrire dans une
// phrase à toi » et « comprendre est passif, employer est actif » sont la
// découverte du CM2. Le dictionnaire en troisième ressort est à lui aussi. Ici,
// le réemploi n'est qu'une propriété.
//
// ⭐⭐ ET LA FICHE SE BRANCHE SUR LA PRÉCÉDENTE : la famille de mots, apprise en
// `vocabulaire_relations`, cesse d'être une curiosité et devient un OUTIL
// D'ORTHOGRAPHE. « grand » → « grande », et le d se met à parler. « chant » →
// « chanter », et le t se met à parler.
//
// ⭐⭐ LA SECONDE IDÉE VIENT DU POOL VOC_ORTH, ET ELLE EST HONNÊTE : ses mots
// sont femme, monsieur, automne, pharmacie, longtemps — AUCUN ne se laisse
// trouver par la famille. Il y a donc DEUX TAS, et savoir dans lequel on est
// est le vrai geste : ceux dont on peut trouver la lettre, et ceux qu'il faut
// retenir. Dire cela raccourcit la liste à apprendre par cœur, au lieu de la
// présenter comme infinie.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools VOC_REEMPLOI, VOC_ORTH et VOC_FAMILLE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `vocabulaire_emploi`) :
// - cm1_voc_morpho_orthographe → figure, propriétés 1, 2 et 3, méthodes 1 et 2, exemples 1 et 2
// - cm1_voc_orthographe        → propriété 4, exemple 3
// - cm1_voc_reemploi           → propriété 5, méthode 3, exemple 4
// - cm1_voc_emploi_defi        → propriété 6

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

const faisParlerLeMot = phrase({
  mots: [{ texte: "grand" }, { texte: "grande", focus: true }],
  liens: [{ de: 1, vers: 0, label: "le d parle", type: "question" }],
  legende: "Change le mot, et la lettre muette se met à parler.",
});

const grilleDeuxTas = grille({
  headers: ["Le mot", "Tu peux"],
  rows: [
    { values: ["grand", "trouver le d"] },
    { values: ["chant", "trouver le t"] },
    { values: ["monsieur", "seulement retenir"] },
  ],
  caption: "Deux sortes de mots difficiles. Cherche avant d'apprendre.",
});

const chantChanter = phrase({
  mots: [{ texte: "chant" }, { texte: "chanter", focus: true }],
  legende: "Un mot de la même famille dit la lettre cachée.",
});

const lettreQuOnEntendPas = phrase({
  mots: [
    { texte: "tapi", barre: true },
    { texte: "tapis", focus: true },
  ],
  legende: "À la fin des mots, des lettres se taisent.",
});

const parCoeurQuandMeme = phrase({
  mots: [
    { texte: "monssieur", barre: true },
    { texte: "monsieur", focus: true },
  ],
  legende: "Certains mots ne se laissent pas deviner.",
});

const laBonnePlace = phrase({
  mots: [
    { texte: "il court immense", barre: true },
    { texte: "un désert immense", focus: true },
  ],
  legende: "Un adjectif accompagne un nom, pas un verbe.",
});

const defiLettre = phrase({
  mots: [{ texte: "tapis" }, { texte: "tapisserie", focus: true }],
  legende: "Le défi : trouve la lettre par un mot de la famille.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireEmploiCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "vocabulaire-emploi",
  titre: `La lettre qu'on n'entend pas en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Comment savoir si « grand » prend un d à la fin ? Tu ne l'entends pas. Alors fais parler le mot : « une grande maison ». Le d était bien là.",
  identite: [
    { label: "Mots clés", valeur: "Lettre muette, famille, emploi" },
    { label: "Le secret", valeur: "Fais parler le mot" },
    { label: "Outil", valeur: "Cherche avant d'apprendre" },
  ],
  definition: {
    texte: [
      "À la fin de beaucoup de mots, une lettre se tait : grand, chant, tapis.",
      "Pour la trouver, ne devine pas : change le mot. Mets-le au féminin, ou cherche un mot de sa famille.",
      "« grand » donne « grande » : le d parle. « chant » donne « chanter » : le t parle.",
      "Mais attention, ça ne marche pas toujours. Monsieur, femme, automne ne se laissent pas faire : ceux-là s'apprennent par cœur.",
      "Il y a donc deux tas, et le geste est de savoir dans lequel tu es. Cherche d'abord ; apprends ensuite ce qui reste.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(faisParlerLeMot, grilleDeuxTas),
  },
  proprietes: [
    {
      titre: "Des lettres se taisent à la fin",
      texte: "Tapis, grand, chant : tu entends le mot sans entendre sa dernière lettre.",
      schema: lettreQuOnEntendPas,
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Mets le mot au féminin",
      texte: "« Grand » ne dit rien. « Grande » dit tout : le d s'entend enfin.",
      schema: faisParlerLeMot,
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Ou cherche un mot de sa famille",
      texte: "« Chant » se termine par un t : « chanter » vient de le dire.",
      schema: chantChanter,
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Certains mots ne se laissent pas faire",
      texte: "Monsieur, femme, automne : rien à trouver, il faut les retenir.",
      schema: parCoeurQuandMeme,
      micros: ["cm1_voc_orthographe"],
    },
    {
      titre: "Un mot se met à la bonne place",
      texte: "« Un désert immense » se dit. « Il court immense » ne se dit pas.",
      schema: laBonnePlace,
      micros: ["cm1_voc_reemploi"],
    },
    {
      titre: "Le défi : trouve la lettre",
      texte: "Devant un mot qui se termine mal, cherche sa famille avant d'apprendre.",
      schema: defiLettre,
      micros: ["cm1_voc_emploi_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais déjà ce tour sans le savoir. Personne n'oublie le t de « petit », parce que tout le monde a entendu « petite » mille fois. Ce que tu sais faire par hasard, tu peux le faire exprès.",
  },
  historique: {
    texte:
      "Beaucoup de lettres muettes viennent du latin. « Temps » s'écrit avec un p parce que les Romains écrivaient tempus. La lettre s'est tue avec les siècles, mais elle est restée sur le papier comme une trace.",
  },
  methode: [
    {
      titre: "Essaie le féminin",
      texte: "Ajoute « une » devant et mets un e : petit devient petite, la lettre revient.",
      schema: faisParlerLeMot,
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Cherche le mot de la famille",
      texte: "Un verbe, un métier, un mot plus long : tapis donne tapisserie.",
      schema: chantChanter,
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Emploie le mot nouveau le jour même",
      texte: "Une phrase à toi, dite ou écrite. Sinon il repart aussi vite qu'il est venu.",
      schema: laBonnePlace,
      micros: ["cm1_voc_reemploi"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Grand ou gran ?",
      donnees: "Tu écris : « un gran arbre ».",
      schema: faisParlerLeMot,
      question: "Comment vérifier ?",
      solution:
        "Mets au féminin : « une grande maison ». Tu entends le d, donc il s'écrit : « un grand arbre ».",
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Le chant du coq",
      donnees: "Tu hésites entre chan et chant.",
      schema: chantChanter,
      question: "Quel mot de la famille peut t'aider ?",
      solution:
        "« Chanter », ou « chanteur ». Le t s'entend dans les deux : il est donc au bout de « chant ».",
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      titre: "Un mot qui résiste",
      donnees: "Tu écris : « monssieur ».",
      schema: parCoeurQuandMeme,
      question: "Un mot de la famille peut-il t'aider ?",
      solution:
        "Non, il n'y en a pas. Celui-là fait partie du second tas : il s'apprend par cœur, et il n'y en a pas tant que ça.",
      micros: ["cm1_voc_orthographe"],
    },
    {
      titre: "Le mot mal placé",
      donnees: "« Il court immense. »",
      schema: laBonnePlace,
      question: "Qu'est-ce qui ne va pas ?",
      solution:
        "« Immense » dit comment est une chose, pas comment on court. On dit « un désert immense ». Le sens était connu, la place était fausse.",
      micros: ["cm1_voc_reemploi"],
    },
  ],
  pieges: [
    "Deviner une lettre muette au lieu de la chercher.",
    "Apprendre par cœur un mot qu'on pouvait trouver.",
    "Croire que le tour marche pour tous les mots.",
    "Employer un mot juste à une place fausse.",
    "Apprendre un mot nouveau sans jamais l'utiliser.",
  ],
  aRetenir: [
    "À la fin des mots, des lettres se taisent.",
    "Mets au féminin : grand donne grande.",
    "Ou cherche la famille : chant donne chanter.",
    "Monsieur, femme, automne : ceux-là s'apprennent.",
    "Cherche d'abord, apprends ensuite ce qui reste.",
  ],
  entrainement: [
    {
      question: "Comment vérifier le d de « grand » ?",
      correction: "En le mettant au féminin : grande.",
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      question: "Quel mot de la famille donne la fin de « chant » ?",
      correction: "Chanter, ou chanteur.",
      micros: ["cm1_voc_morpho_orthographe"],
    },
    {
      question: "Quelle est l'orthographe correcte : monsieur ou monssieur ?",
      correction: "Monsieur.",
      micros: ["cm1_voc_orthographe"],
    },
    {
      question: "Quelle phrase emploie bien le mot immense ?",
      correction: "« Le désert est immense. »",
      micros: ["cm1_voc_reemploi"],
    },
    {
      question: "Tu hésites sur la fin d'un mot. Que fais-tu avant d'apprendre ?",
      correction: "Tu cherches un mot de sa famille.",
      micros: ["cm1_voc_emploi_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesVocabulaireEmploiCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La lettre qu'on n'entend pas - CM1",
    section: {
      type: "objectif",
      phrase: "Fais parler le mot",
      sousPhrase: "« Grand » prend-il un d ? Dis « une grande maison ».",
      encadre: { titre: "L'idée", texte: "Cherche d'abord, apprends ce qui reste." },
    },
  },
  {
    titre: "Deux tas de mots",
    badge: "La lettre qu'on n'entend pas - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le féminin", texte: "grand donne grande." },
        { titre: "La famille", texte: "chant donne chanter." },
        { titre: "Par cœur", texte: "monsieur, femme, automne." },
      ],
    },
    schema: grilleDeuxTas,
  },
  {
    titre: "Tu le fais déjà",
    badge: "La lettre qu'on n'entend pas - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Personne n'oublie le t de « petit ».",
        "Parce qu'on a entendu « petite » mille fois.",
        "Ce que tu fais par hasard, fais-le exprès.",
      ],
    },
    schema: faisParlerLeMot,
  },
  {
    titre: "À vous",
    badge: "La lettre qu'on n'entend pas - CM1",
    section: {
      type: "exercice",
      enonce: "Tu hésites entre « chan » et « chant ».",
      question: "Quel mot de la famille peut t'aider ?",
      indice: "Cherche un verbe, ou un métier.",
      correction: "Chanter, ou chanteur : le t s'entend.",
    },
    schema: chantChanter,
  },
];
