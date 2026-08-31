// ─── Fiche de cours : prendre la parole avec les autres (CM1) ─────────────────
// TREIZIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
// Elle FERME LE DOMAINE DE L'ORAL au CM1.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Dire pour être
// compris » · « Participer à des échanges verbaux ».
//
// ⛔⛔ NOTION SATURÉE, ET DEUX ANGLES ÉCARTÉS EN COURS D'ÉCRITURE :
//
//   ⛔ « parler plus fort ne convainc personne » → CM2 l. 300, « le volume n'a
//      jamais convaincu personne — il fait seulement taire ». C'était mon
//      premier angle.
//   ⛔ « un avis sans parce que est un gout » → c'est LE FIL du CM2, avec
//      argumenter comme charnière entre présenter et débattre.
//   ⛔ « parler assez fort, regarder la classe, raconter dans l'ordre » → déjà
//      dans la définition du CM2 (l. 240) et dans la 6e `oral_dire` (l. 258).
//   ⛔ « un échange n'est pas une suite de monologues », « reprendre avant
//      d'ajouter », « le désaccord se localise » → 6e `oral_echanger`.
//   ⛔ « l'oral sert aussi à penser », « le par cœur est le pire outil » →
//      6e `oral_dire`.
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ on n'a pas besoin de SAVOIR pour prendre la parole | argumenter est la charnière | un échange n'est pas une suite de monologues |
//   | l'erreur visée | ⭐ l'enfant qui se tait | l'avis sans raison | chacun redit sa phrase plus fort |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT D'UN ITEM DU POOL RESTÉ SANS EMPLOI :
// « Poser une question pour mieux comprendre, c'est UTILE ET PERMIS dans un
// échange » — et les trois leurres disent l'exacte croyance de l'enfant :
// « interdit », « une perte de temps », « toujours impoli ». Voilà ce qui fait
// taire un CM1. Il croit que participer, c'est DONNER LA BONNE RÉPONSE : il lève
// la main quand il est sûr, et se tait tout le reste du temps — c'est-à-dire
// précisément quand il aurait le plus à gagner.
//
// ⭐ Or il y a TROIS FAÇONS DE PRENDRE LA PAROLE, et une seule demande de savoir :
// dire ce qu'on pense (avec un pourquoi), DEMANDER ce qu'on n'a pas compris, et
// écouter en attendant son tour. Dire cela à un enfant de neuf ans ouvre la
// porte que la timidité ferme.
//
// ⚠️ RECOUVREMENT ASSUMÉ, À ARBITRER QUAND LE CM2 SERA REPRIS : « poser une
// question est utile et permis » figure aussi dans la définition et dans les à
// retenir de `francais-cm2-oral-ecouter` (l. 239 et l. 463) — mais dans la
// notion ÉCOUTER, et comme une phrase parmi dix. Ici c'est le fil, dans la
// notion ÉCHANGER. Si le CM2 est refait, cette ligne devrait lui être retirée.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm1_fr_fixed_oral_3`, `_4` et `_5` de
// lib/tutor-v4/questionBank/cm1/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `oral_echanger`) :
// - cm1_oral_presenter  → propriétés 4 et 5, méthode 3, exemple 4
// - cm1_oral_argumenter → propriété 1, méthode 1, exemple 1
// - cm1_oral_echanger   → figure, propriétés 2 et 3, méthode 2, exemples 2 et 3
// - cm1_oral_defi       → propriété 6

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

const pasBesoinDeSavoir = phrase({
  mots: [
    { texte: "être sûr", barre: true },
    { texte: "avoir une question", focus: true },
  ],
  legende: "On peut prendre la parole sans avoir la bonne réponse.",
});

const grilleTroisFacons = grille({
  headers: ["Tu peux", "Il faut savoir"],
  rows: [
    { values: ["dire pourquoi", "oui"] },
    { values: ["demander", "non"] },
    { values: ["écouter", "non"] },
  ],
  caption: "Trois façons de participer. Une seule demande de savoir.",
});

const avecUnPourquoi = phrase({
  mots: [{ texte: "C'est bien." }, { texte: "parce que…", focus: true }],
  legende: "Un avis tout seul ne se discute pas.",
});

const demanderEstPermis = phrase({
  mots: [
    { texte: "se taire", barre: true },
    { texte: "demander", focus: true },
  ],
  legende: "Une question sert souvent à plusieurs d'un coup.",
});

const chacunSonTour = phrase({
  mots: [
    { texte: "en même temps", barre: true },
    { texte: "chacun son tour", focus: true },
  ],
  legende: "Deux voix ensemble, et plus personne n'entend.",
});

const parlerADesGens = phrase({
  mots: [
    { texte: "réciter", barre: true },
    { texte: "parler à quelqu'un", focus: true },
  ],
  legende: "Tu ne dis pas ton texte : tu le dis à des gens.",
});

const dansLOrdre = phrase({
  mots: [{ texte: "d'abord" }, { texte: "et à la fin", focus: true }],
  legende: "Raconter dans l'ordre aide celui qui écoute.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEchangerCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "oral-echanger",
  titre: `Prendre la parole avec les autres en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu lèves la main seulement quand tu es sûr, et tu te tais le reste du temps. Pourtant il y a trois façons de prendre la parole dans une classe — et une seule demande d'avoir la bonne réponse.",
  identite: [
    { label: "Mots clés", valeur: "Dire, demander, écouter" },
    { label: "Le secret", valeur: "Demander est permis" },
    { label: "Outil", valeur: "Prépare ton pourquoi" },
  ],
  definition: {
    texte: [
      "Participer, ce n'est pas donner la bonne réponse.",
      "Tu peux dire ce que tu penses, à condition de dire pourquoi. « C'est bien » tout seul ne se discute pas.",
      "Tu peux demander ce que tu n'as pas compris. Une question est permise, et elle sert souvent à plusieurs d'un coup.",
      "Tu peux écouter et attendre ton tour. Deux voix en même temps, et plus personne n'entend.",
      "Sur ces trois façons, une seule demande de savoir. C'est pour ça qu'on peut toujours entrer dans un échange.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(pasBesoinDeSavoir, grilleTroisFacons),
  },
  proprietes: [
    {
      titre: "Un avis se dit avec un pourquoi",
      texte: "« Ce livre est bien parce qu'il fait rire. » Sans le pourquoi, c'est un gout.",
      schema: avecUnPourquoi,
      micros: ["cm1_oral_argumenter"],
    },
    {
      titre: "Demander est permis",
      texte: "Ce n'est ni impoli ni une perte de temps. C'est même souvent utile aux autres.",
      schema: demanderEstPermis,
      micros: ["cm1_oral_echanger"],
    },
    {
      titre: "Chacun son tour",
      texte: "Quand un camarade parle, tu attends et tu l'écoutes. Sinon, les deux sont perdus.",
      schema: chacunSonTour,
      micros: ["cm1_oral_echanger"],
    },
    {
      titre: "Présenter, c'est parler à des gens",
      texte: "Tu ne récites pas dans le vide : tu parles à ceux qui sont devant toi.",
      schema: parlerADesGens,
      micros: ["cm1_oral_presenter"],
    },
    {
      titre: "Raconter dans l'ordre",
      texte: "Ce qui s'est passé d'abord, puis la suite. Celui qui écoute ne peut pas revenir en arrière.",
      schema: dansLOrdre,
      micros: ["cm1_oral_presenter"],
    },
    {
      titre: "Le défi : pas d'accord, et poli quand même",
      texte: "Tu expliques pourquoi tu penses autrement. Tu ne te moques pas et tu ne cries pas.",
      schema: avecUnPourquoi,
      micros: ["cm1_oral_defi"],
    },
  ],
  reel: {
    texte:
      "Tu l'as déjà vu en classe : quelqu'un ose demander, et d'un coup plusieurs têtes se relèvent. Ceux-là non plus n'avaient pas compris, et ils n'osaient pas. Une question rend service à toute une rangée.",
  },
  historique: {
    texte:
      "Le mot débattre vient de battre. Il garde la trace du temps où l'on réglait les désaccords par les coups. Un débat, c'est exactement ce qui a remplacé les coups par des raisons — et c'est pour ça qu'on y attend son tour.",
  },
  methode: [
    {
      titre: "Prépare ton pourquoi avant de lever la main",
      texte: "Ton idée, puis « parce que » et un fait. Si le parce que ne vient pas, attends un peu.",
      schema: avecUnPourquoi,
      micros: ["cm1_oral_argumenter"],
    },
    {
      titre: "Formule ta question dans ta tête",
      texte: "Une phrase courte : ce que tu n'as pas compris, et où. Puis lève la main.",
      schema: demanderEstPermis,
      micros: ["cm1_oral_echanger"],
    },
    {
      titre: "Regarde une personne, puis une autre",
      texte: "Pas tes notes, pas le sol. Trois secondes chacun suffisent.",
      schema: parlerADesGens,
      micros: ["cm1_oral_presenter"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Un avis tout nu",
      donnees: "Tu dis : « Ce livre est bien. »",
      schema: avecUnPourquoi,
      question: "Que peut-on te répondre ?",
      solution:
        "Rien, justement. Un gout ne se discute pas. Ajoute « parce qu'il fait rire », et là on peut te parler.",
      micros: ["cm1_oral_argumenter"],
    },
    {
      titre: "Tu n'as pas compris",
      donnees: "Le maitre explique, tu perds le fil, et tu ne dis rien.",
      schema: demanderEstPermis,
      question: "Que se passe-t-il si tu demandes ?",
      solution:
        "Tu comprends, et plusieurs camarades aussi. Poser une question pour mieux comprendre est utile et permis.",
      micros: ["cm1_oral_echanger"],
    },
    {
      titre: "Deux voix ensemble",
      donnees: "Tu as une bonne idée pendant qu'un camarade parle encore.",
      schema: chacunSonTour,
      question: "Que fais-tu ?",
      solution:
        "Tu attends la fin de sa phrase. Si tu parles par-dessus, personne n'entend ni lui ni toi.",
      micros: ["cm1_oral_echanger"],
    },
    {
      titre: "Présenter un livre",
      donnees: "Tu dois parler de ta lecture devant la classe.",
      schema: parlerADesGens,
      question: "Comment t'y prends-tu ?",
      solution:
        "Tu parles clairement et tu regardes ton public. Lire tête baissée et très vite est la façon la plus sûre de ne pas être suivi.",
      micros: ["cm1_oral_presenter"],
    },
  ],
  pieges: [
    "Croire qu'il faut être sûr pour lever la main.",
    "Penser qu'une question est impolie ou fait perdre du temps.",
    "Donner son avis sans dire pourquoi.",
    "Parler par-dessus celui qui a la parole.",
    "Se moquer de celui qui n'est pas d'accord au lieu de lui répondre.",
  ],
  aRetenir: [
    "Participer, ce n'est pas donner la bonne réponse.",
    "Un avis se dit avec un parce que.",
    "Demander est permis, et ça sert à plusieurs.",
    "Chacun son tour : deux voix ensemble, personne n'entend.",
    "Pas d'accord se dit poliment, avec une raison.",
  ],
  entrainement: [
    {
      question: "Donner un avis justifié, c'est dire…",
      correction: "Ce qu'on pense et pourquoi.",
      micros: ["cm1_oral_argumenter"],
    },
    {
      question: "Poser une question pour mieux comprendre, c'est…",
      correction: "Utile et permis dans un échange.",
      micros: ["cm1_oral_echanger"],
    },
    {
      question: "Quand un camarade parle dans un échange, on doit…",
      correction: "Attendre son tour pour parler.",
      micros: ["cm1_oral_echanger"],
    },
    {
      question: "Pour bien présenter un livre à la classe, il vaut mieux…",
      correction: "Parler clairement et regarder son public.",
      micros: ["cm1_oral_presenter"],
    },
    {
      question: "Tu n'es pas d'accord avec un camarade. Que fais-tu ?",
      correction: "Tu expliques poliment pourquoi.",
      micros: ["cm1_oral_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesOralEchangerCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Prendre la parole - CM1",
    section: {
      type: "objectif",
      phrase: "Demander est permis",
      sousPhrase: "Tu lèves la main quand tu es sûr, et tu te tais le reste du temps.",
      encadre: { titre: "L'idée", texte: "Participer, ce n'est pas donner la bonne réponse." },
    },
  },
  {
    titre: "Trois façons de participer",
    badge: "Prendre la parole - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Dire", texte: "Ce que tu penses, avec un parce que." },
        { titre: "Demander", texte: "Ce que tu n'as pas compris." },
        { titre: "Écouter", texte: "En attendant ton tour." },
      ],
    },
    schema: grilleTroisFacons,
  },
  {
    titre: "Toute une rangée",
    badge: "Prendre la parole - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Quelqu'un ose demander.",
        "Plusieurs têtes se relèvent d'un coup.",
        "Eux non plus n'avaient pas compris.",
      ],
    },
    schema: demanderEstPermis,
  },
  {
    titre: "À vous",
    badge: "Prendre la parole - CM1",
    section: {
      type: "exercice",
      enonce: "Tu dis : « Ce livre est bien. »",
      question: "Que peut-on te répondre ?",
      indice: "Est-ce qu'on peut discuter un gout ?",
      correction: "Rien. Ajoute « parce qu'il fait rire », et là on peut te parler.",
    },
    schema: avecUnPourquoi,
  },
];
