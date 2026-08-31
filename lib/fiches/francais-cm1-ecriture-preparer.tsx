// ─── Fiche de cours : écrire pour apprendre (CM1) ─────────────────────────────
// NEUVIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
// Elle ouvre le domaine de l'ÉCRITURE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ SÉPARATION D'AVEC LE CM2, qui porte la même notion :
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ une leçon RECOPIÉE reste au maitre ; REFORMULÉE, elle devient la tienne | quatre écrits PLUS COURTS que ce qu'ils préparent |
//   | les micros | copier · retenir · trier · ⭐ S'APPROPRIER | copier · noter · plan · comparer deux documents |
//
// ⛔ NE PAS REDIRE : « un écrit de préparation qui fait la longueur du devoir n'a
// rien préparé » est le test du CM2. Ici la question n'est pas la longueur, c'est
// à qui appartiennent les mots.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE EST DANS LE MOT QUE SEUL LE CM1 EMPLOIE :
// `Reformuler l'essentiel d'une leçon POUR SE L'APPROPRIER`. S'approprier —
// rendre sien. Recopier une leçon ne fait rien entrer dans la tête : la main
// travaille, et les mots restent ceux du maitre. Les réécrire AVEC SES PROPRES
// MOTS oblige à comprendre, parce qu'on ne peut pas trouver ses mots à soi sans
// avoir saisi l'idée.
//
// ⭐ Et les quatre micros partagent la même préposition, ce qui donne la
// définition : on écrit POUR. Pour retenir, pour trier, pour s'approprier. Aucun
// de ces écrits n'a de lecteur — ils servent à celui qui les écrit.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools ECRITURE et ECRIRE_MAIN de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `ecriture_preparer`) :
// - cm1_ecrit_copie      → propriété 1, méthode 1, exemple 1
// - cm1_ecrit_notes    → propriétés 2 et 3, méthode 2, exemple 2
// - cm1_ecrit_trier      → propriété 4, exemple 3
// - cm1_ecrit_reformuler → figure, propriété 5, méthode 3, exemple 4
// - cm1_ecrit_preparer_defi → propriété 6

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

const recopierOuReformuler = phrase({
  mots: [
    { texte: "ses mots à lui", barre: true },
    { texte: "tes mots", focus: true },
  ],
  legende: "Une leçon recopiée reste au maitre. Reformulée, elle devient la tienne.",
});

const grilleEcrirePour = grille({
  headers: ["On écrit", "Pour"],
  rows: [
    { values: ["une trace", "retenir"] },
    { values: ["une liste", "trier"] },
    { values: ["tes mots", "comprendre"] },
  ],
  caption: "Aucun de ces écrits n'a de lecteur. Ils servent à toi.",
});

const copierParGroupes = phrase({
  mots: [
    { texte: "lettre à lettre", barre: true },
    { texte: "par groupes", focus: true },
  ],
  legende: "On mémorise un bout, puis on l'écrit. Plus vite et plus juste.",
});

const troisMotsParIdee = phrase({
  mots: [
    { texte: "toute la phrase", barre: true },
    { texte: "trois mots", focus: true },
  ],
  legende: "Une trace courte se relit. Une trace longue, jamais.",
});

const trierAvantDecrire = phrase({
  mots: [
    { texte: "tout garder", barre: true },
    { texte: "ce qui sert", focus: true },
  ],
  legende: "Écrire oblige à choisir, et choisir fait comprendre.",
});

const sansRegarder = phrase({
  mots: [
    { texte: "le livre ouvert", barre: true },
    { texte: "fermé", focus: true },
  ],
  legende: "Le vrai test : redire la leçon sans la regarder.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcriturePreparerCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "ecriture-preparer",
  titre: `Écrire pour apprendre en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Recopier une leçon dix fois ne la fait pas entrer dans ta tête. Ta main travaille, mais les mots restent ceux du maitre. Pour qu'ils deviennent les tiens, il faut les changer.",
  identite: [
    { label: "Mots clés", valeur: "Copier, retenir, trier" },
    { label: "Le secret", valeur: "Avec tes mots, pas les siens" },
    { label: "Outil", valeur: "Redis-le sans regarder" },
  ],
  definition: {
    texte: [
      "Il y a des écrits que personne ne lira. Tu les fais pour toi.",
      "Écrire pour retenir : trois mots par idée, pas la phrase entière. Une trace courte se relit ; une longue, jamais.",
      "Écrire pour trier : garder ce qui sert et laisser le reste. Choisir, c'est déjà comprendre.",
      "Et le plus important : reformuler la leçon avec tes propres mots.",
      "Recopiée, une leçon reste celle du maitre. Réécrite avec tes mots, elle devient la tienne — parce qu'on ne trouve pas ses mots sans avoir compris.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(recopierOuReformuler, grilleEcrirePour),
  },
  proprietes: [
    {
      titre: "On copie par groupes de mots",
      texte: "On mémorise un bout, puis on l'écrit. Lettre à lettre est plus lent et plus fautif.",
      schema: copierParGroupes,
      micros: ["cm1_ecrit_copie"],
    },
    {
      titre: "Une trace courte se relit",
      texte: "Trois mots par idée. Une page recopiée, tu ne la reliras jamais.",
      schema: troisMotsParIdee,
      micros: ["cm1_ecrit_notes"],
    },
    {
      titre: "Ces écrits n'ont pas de lecteur",
      texte: "Personne ne les corrigera. Ils n'ont pas à être beaux, juste utiles.",
      schema: grilleEcrirePour,
      micros: ["cm1_ecrit_notes"],
    },
    {
      titre: "Écrire oblige à choisir",
      texte: "Tu ne peux pas tout garder. Et c'est en choisissant que tu comprends.",
      schema: trierAvantDecrire,
      micros: ["cm1_ecrit_trier"],
    },
    {
      titre: "Reformuler, c'est se l'approprier",
      texte: "On ne trouve pas ses propres mots sans avoir compris l'idée.",
      schema: recopierOuReformuler,
      micros: ["cm1_ecrit_reformuler"],
    },
    {
      titre: "Le défi : sans regarder",
      texte: "Ferme le cahier et redis la leçon. Ce que tu retrouves est à toi.",
      schema: sansRegarder,
      micros: ["cm1_ecrit_preparer_defi"],
    },
  ],
  reel: {
    texte:
      "Quand un copain t'explique une règle du jeu, tu la répètes avec tes mots pour vérifier. Tu ne récites pas sa phrase : tu dis la tienne, et s'il fait oui de la tête, tu as compris. C'est exactement ce geste, mais écrit.",
  },
  historique: {
    texte:
      "Les élèves de l'Antiquité écrivaient sur des tablettes de cire, qu'on effaçait avec le plat du stylet pour recommencer. Rien n'était gardé. C'est peut-être le meilleur rappel : ce qui compte n'est pas la trace, c'est ce qu'elle a mis dans la tête.",
  },
  methode: [
    {
      titre: "Copie quatre ou cinq mots à la fois",
      texte: "Lis le groupe, ferme les yeux une seconde, écris-le. Puis relis.",
      schema: copierParGroupes,
      micros: ["cm1_ecrit_copie"],
    },
    {
      titre: "Trois mots par idée, jamais plus",
      texte: "Des flèches, des tirets, des abréviations. Si tu fais une phrase, tu recopies.",
      schema: troisMotsParIdee,
      micros: ["cm1_ecrit_notes"],
    },
    {
      titre: "Réécris la leçon sans la regarder",
      texte: "Puis compare. Ce qui manque, c'est ce que tu n'avais pas compris.",
      schema: sansRegarder,
      micros: ["cm1_ecrit_reformuler"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Copier un texte",
      donnees: "Tu dois recopier la leçon dans ton cahier.",
      schema: copierParGroupes,
      question: "Comment vas-tu le plus vite ?",
      solution:
        "En mémorisant un groupe de mots puis en l'écrivant. Copier lettre à lettre en relevant les yeux à chaque fois est la méthode la plus lente.",
      micros: ["cm1_ecrit_copie"],
    },
    {
      titre: "Prendre une trace",
      donnees: "Tu veux garder une idée entendue en classe.",
      schema: troisMotsParIdee,
      question: "Qu'écris-tu ?",
      solution:
        "Trois mots, pas la phrase entière. Une trace courte se relit ; une page recopiée ne se relit jamais.",
      micros: ["cm1_ecrit_notes"],
    },
    {
      titre: "Trop d'informations",
      donnees: "Le documentaire donne dix informations et tu n'en as besoin que de deux.",
      schema: trierAvantDecrire,
      question: "Que fais-tu ?",
      solution:
        "Tu écris les deux qui servent, et tu laisses les autres. Choisir n'est pas tricher : c'est comprendre ce qu'on cherche.",
      micros: ["cm1_ecrit_trier"],
    },
    {
      titre: "Apprendre une leçon",
      donnees: "Tu as recopié la leçon trois fois et tu ne la sais toujours pas.",
      schema: recopierOuReformuler,
      question: "Pourquoi ça ne marche pas ?",
      solution:
        "Parce que recopier fait travailler la main, pas la tête. Réécris-la avec tes propres mots : tu ne les trouveras qu'en comprenant.",
      micros: ["cm1_ecrit_reformuler"],
    },
  ],
  pieges: [
    "Recopier une leçon en croyant l'apprendre.",
    "Écrire des phrases entières au lieu de trois mots.",
    "Vouloir une trace belle : personne ne la lira.",
    "Tout noter pour ne rien manquer : rien n'est trié, donc rien n'est compris.",
    "Vérifier sa leçon le livre ouvert : ça ne prouve rien.",
  ],
  aRetenir: [
    "Certains écrits n'ont pas de lecteur : ils servent à toi.",
    "Trois mots par idée. Une trace longue ne se relit pas.",
    "Écrire oblige à choisir, et choisir fait comprendre.",
    "Recopiée, une leçon reste au maitre. Reformulée, elle devient tienne.",
    "Le test : redire la leçon sans la regarder.",
  ],
  entrainement: [
    {
      question: "Pour copier vite et sans erreur, que fais-tu ?",
      correction: "Tu mémorises un groupe de mots puis tu l'écris.",
      micros: ["cm1_ecrit_copie"],
    },
    {
      question: "Pour garder une idée, tu écris…",
      correction: "Trois mots, pas la phrase entière.",
      micros: ["cm1_ecrit_notes"],
    },
    {
      question: "Tu as recopié la leçon trois fois sans la savoir. Pourquoi ?",
      correction: "Recopier fait travailler la main, pas la tête.",
      micros: ["cm1_ecrit_reformuler"],
    },
    {
      question: "Comment une leçon devient-elle vraiment la tienne ?",
      correction: "En la réécrivant avec tes propres mots.",
      micros: ["cm1_ecrit_reformuler"],
    },
    {
      question: "Comment savoir si tu sais ta leçon ?",
      correction: "En la redisant sans la regarder.",
      micros: ["cm1_ecrit_preparer_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesEcriturePreparerCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire pour apprendre - CM1",
    section: {
      type: "objectif",
      phrase: "Avec tes mots, pas les siens",
      sousPhrase: "Recopier dix fois ne fait pas entrer la leçon dans ta tête.",
      encadre: { titre: "L'idée", texte: "On ne trouve pas ses mots sans avoir compris." },
    },
  },
  {
    titre: "Écrire pour quoi ?",
    badge: "Écrire pour apprendre - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Pour retenir", texte: "Trois mots par idée. Une trace courte se relit." },
        { titre: "Pour trier", texte: "Garder ce qui sert. Choisir, c'est comprendre." },
        { titre: "Pour comprendre", texte: "Réécrire la leçon avec ses propres mots." },
      ],
    },
    schema: grilleEcrirePour,
  },
  {
    titre: "Comme avec un copain",
    badge: "Écrire pour apprendre - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Il t'explique une règle du jeu.",
        "Tu la répètes avec tes mots pour vérifier.",
        "S'il fait oui de la tête, tu as compris.",
      ],
    },
    schema: recopierOuReformuler,
  },
  {
    titre: "À vous",
    badge: "Écrire pour apprendre - CM1",
    section: {
      type: "exercice",
      enonce: "Tu as recopié la leçon trois fois et tu ne la sais toujours pas.",
      question: "Pourquoi ça ne marche pas ?",
      indice: "Qu'est-ce qui a travaillé ?",
      correction: "Ta main, pas ta tête. Réécris-la avec tes propres mots.",
    },
    schema: sansRegarder,
  },
];
