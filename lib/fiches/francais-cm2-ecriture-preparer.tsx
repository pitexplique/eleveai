// ─── Fiche de cours : préparer un écrit (CM2) ─────────────────────────────────
// NEUVIÈME FICHE DU CHANTIER CM2, et PREMIÈRE DU DOMAINE DE L'ÉCRITURE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ».
//
// ⛔ COMPARAISON AVEC LA 6e, QUI DÉCOUPE AUTREMENT : la 6e sépare LA MAIN
// (`ecriture_main` : copier, mettre en forme) de LA TÊTE (`ecriture_apprendre` :
// résumer, hiérarchiser, justifier). Le CM2 les tient ensemble sous un seul mot
// — PRÉPARER — et y ajoute une micro que personne d'autre n'a : « écrire pour
// comparer deux documents ».
//
//   | 6e | CM2 (ici) |
//   |---|---|
//   | `ecriture_main` : la copie, la mise en forme | la copie PAR GROUPES |
//   | `ecriture_apprendre` : résumer, hiérarchiser | les notes EN ABRÉGÉ, le plan |
//   | — | ÉCRIRE POUR COMPARER deux documents |
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES QUATRE MICROS : CE SONT QUATRE ÉCRITS QUI NE
// SONT PAS LE DEVOIR, ET QUI LE RENDENT POSSIBLE. Copier, prendre des notes,
// faire un plan, comparer deux documents : aucun de ces textes n'est celui qu'on
// rendra. Le nom de la notion le dit — préparer.
//
// ⭐⭐ ET ILS ONT TOUS LA MÊME PROPRIÉTÉ, QUI DONNE LE TEST : ILS SONT PLUS COURTS
// QUE CE QU'ILS PRÉPARENT. On copie par GROUPES et non lettre à lettre ; on note
// les mots importants EN ABRÉGÉ ; un plan RANGE les idées sans les développer ;
// une comparaison tient en deux colonnes. ⛔ D'où la règle : un écrit de
// préparation qui fait la longueur du devoir n'a rien préparé.
//
// ⭐ ET C'EST UNE SIGNATURE DE TOUT LE CM2, repérée en écrivant cette fiche : la
// classe entière apprend à FAIRE COURT, et fait de la brièveté un test plutôt
// qu'un style. « Restituer l'essentiel en peu de mots » (comprehension_textes),
// « trois lignes par livre » (culture_lecteur), « le thème tient en un mot »
// (lecture_oeuvres), « les notes en abrégé » (ici). Quatre notions, une même
// exigence — et à chaque fois, celui qui n'a pas compris ne peut pas faire court.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools ECRITURE et ECRIRE_MAIN de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm2_fr_fixed_ecrit_1` à `_3` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `ecriture_preparer`) :
// - cm2_ecrit_copie              → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - cm2_ecrit_notes              → figure, propriétés 3 et 4, formule, méthode 2,
//                                  usage 2, exemples 2 et 3
// - cm2_ecrit_plan               → propriétés 5 à 7, méthode 3, usage 3, exemple 4
// - cm2_ecrit_comparer_documents → propriétés 8 et 9, méthode 4, usage 4, exemple 5
// - cm2_ecrit_preparer_defi      → propriété 10, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** Les quatre écrits de préparation. ⚠️ Cellules courtes : à la largeur d'un
 *  bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine avant d'écrire ─────────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : quatre écrits plus courts que le devoir.
const grilleQuatreEcrits = grille({
  headers: ["L'écrit", "Ce qu'il fait"],
  rows: [
    { values: ["la copie", "par groupes"] },
    { values: ["les notes", "en abrégé"] },
    { values: ["le plan", "dans l'ordre"] },
    { values: ["la comparaison", "deux colonnes"] },
  ],
  caption: "Quatre écrits qui ne sont pas le devoir — et qui le rendent possible.",
});

const grilleQuatreEcritsNotes = grille({
  headers: ["L'écrit", "Ce qu'il fait"],
  rows: [
    { values: ["la copie", "par groupes"] },
    { values: ["les notes", "en abrégé"] },
    { values: ["le plan", "dans l'ordre"] },
    { values: ["la comparaison", "deux colonnes"] },
  ],
  highlight: { row: 1 },
  caption: "De bonnes notes gardent l'essentiel avec peu de mots.",
});

// ⭐⭐ LE TEST : plus court que ce qu'il prépare.
const plusCourtQueLeDevoir = phrase({
  mots: [
    { texte: "aussi long", barre: true },
    { texte: "plus court", focus: true },
  ],
  legende: "Un écrit de préparation qui fait la longueur du devoir n'a rien préparé.",
});

// ── COPIER : par groupes.
const copierParGroupes = phrase({
  mots: [
    { texte: "lettre à lettre", barre: true },
    { texte: "par groupes", focus: true },
  ],
  legende: "Mémoriser un groupe de mots, puis l'écrire : plus rapide et plus sûr.",
});

const relireApresCopie = phrase({
  mots: [
    { texte: "copier" },
    { texte: "relire", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Copier sans jamais relire laisse passer les mots sautés — les plus fréquents.",
});

// ── LES NOTES : en abrégé.
const notesEnAbrege = phrase({
  mots: [
    { texte: "chaque phrase", barre: true },
    { texte: "les mots clés", focus: true },
  ],
  legende: "Écrire les phrases entières deux fois ne fait rien retenir de plus.",
});

const notesPourApprendre = phrase({
  mots: [
    { texte: "des notes" },
    { texte: "pour toi", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "écrites", type: "question" }],
  legende: "Personne ne les lira : elles n'ont pas à être belles, seulement utiles.",
});

// ── LE PLAN : ranger, pas développer.
const planRange = phrase({
  mots: [
    { texte: "des idées" },
    { texte: "dans l'ordre", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "rangées", type: "question" }],
  legende: "Un plan range les idées. Il ne les développe pas, et ne compte pas les lignes.",
});

const planNestPasLeTexte = phrase({
  mots: [
    { texte: "le plan" },
    { texte: "le texte" },
  ],
  legende: "Quatre mots dans la marge suffisent : le plan n'est pas une première version.",
});

const ordreDecideAvant = phrase({
  mots: [
    { texte: "l'ordre" },
    { texte: "avant d'écrire", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "décidé", type: "question" }],
  legende: "Changer l'ordre après coup coute dix fois plus cher que le décider avant.",
});

// ── COMPARER DEUX DOCUMENTS : la micro que personne d'autre n'a.
const deuxColonnes = phrase({
  mots: [
    { texte: "ce qui rapproche" },
    { texte: "ce qui sépare" },
  ],
  legende: "Écrire pour comparer, c'est mettre les deux en regard — pas résumer chacun.",
});

const pasDeuxResumes = phrase({
  mots: [
    { texte: "deux résumés", barre: true },
    { texte: "un tableau", focus: true },
  ],
  legende: "Deux résumés côte à côte ne comparent rien : le lecteur reste seul devant.",
});

// ── LE DÉFI : préparer, c'est ce qui reste quand on n'a pas encore écrit.
const preparerRendPossible = phrase({
  mots: [
    { texte: "le devoir" },
    { texte: "ce qui vient avant", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "rend possible", type: "question" }],
  legende: "Aucun de ces quatre écrits ne sera rendu — et sans eux, rien ne se rend.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcriturePreparerCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "ecriture-preparer",
  titre: `Préparer un écrit en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Quatre écrits qui ne seront jamais rendus, et sans lesquels rien ne se rend : la copie, les notes, le plan, la comparaison. Ils ont tous la même propriété, et elle donne le test — ILS SONT PLUS COURTS QUE CE QU'ILS PRÉPARENT. Un plan aussi long que le devoir n'est pas un plan, et des notes qui recopient la leçon n'ont rien noté.",
  identite: [
    { label: "Mots clés", valeur: "Copier, noter, plan, comparer" },
    { label: "Le secret", valeur: "Plus court que ce qu'il prépare" },
    { label: "Outil", valeur: "Est-ce plus court que le devoir ?" },
  ],
  definition: {
    texte:
      "Avant le texte qu'on rendra, il y a quatre écrits qui le préparent. LA COPIE : on mémorise un GROUPE DE MOTS et on l'écrit, plutôt que de copier lettre à lettre en relevant les yeux à chaque fois — c'est plus rapide et cela évite les erreurs ; puis on relit, car le mot sauté est l'erreur la plus fréquente. LES NOTES : on écrit LES MOTS IMPORTANTS, EN ABRÉGÉ. Recopier chaque phrase entière deux fois ne fait rien retenir de plus, et personne d'autre ne lira ces notes — elles n'ont pas à être belles, seulement utiles. LE PLAN : il RANGE LES IDÉES DANS L'ORDRE. Ce n'est ni choisir la couleur du stylo, ni compter les lignes, ni écrire une première version : quatre mots dans la marge suffisent, et décider l'ordre avant coute dix fois moins cher que le changer après. ÉCRIRE POUR COMPARER DEUX DOCUMENTS, enfin : on met en regard CE QU'ILS ONT EN COMMUN ET CE QUI LES SÉPARE — deux résumés côte à côte ne comparent rien.",
  },
  figure: {
    schema: pile(grilleQuatreEcrits, plusCourtQueLeDevoir),
    legende:
      "Aucun de ces quatre textes ne sera ramassé, et c'est précisément pour cela qu'on ne les fait pas. Pourtant chacun rend le devoir possible, et chacun obéit à la même règle — regarde la colonne de droite : par groupes, en abrégé, dans l'ordre, en deux colonnes. Tous font PLUS COURT. C'est ce qui donne le test le plus simple : si ton écrit de préparation approche la longueur du devoir, tu n'as pas préparé — tu as commencé à le rédiger deux fois.",
  },
  proprietes: [
    {
      titre: "On copie par groupes de mots",
      texte:
        "Mémoriser un groupe, puis l'écrire. Copier lettre à lettre en relevant les yeux à chaque fois est la méthode la plus lente et la plus fautive.",
      schema: copierParGroupes,
      micros: ["cm2_ecrit_copie"],
    },
    {
      titre: "Et l'on relit après",
      texte:
        "Copier sans jamais relire laisse passer les mots sautés, qui sont l'erreur la plus fréquente d'une copie — et la plus invisible pour celui qui l'a faite.",
      schema: relireApresCopie,
      micros: ["cm2_ecrit_copie"],
    },
    {
      titre: "De bonnes notes sont abrégées",
      texte:
        "Les mots importants, et rien d'autre. Écrire chaque phrase entière deux fois ne fait rien retenir de plus : cela occupe la main.",
      schema: grilleQuatreEcritsNotes,
      micros: ["cm2_ecrit_notes"],
    },
    {
      titre: "Elles sont écrites pour toi seul",
      texte:
        "Personne d'autre ne les lira. Elles n'ont donc pas à être belles ni complètes — seulement à te suffire quand tu les reliras.",
      schema: notesPourApprendre,
      micros: ["cm2_ecrit_notes"],
    },
    {
      titre: "Un plan range les idées dans l'ordre",
      texte:
        "C'est tout ce qu'il fait, et c'est beaucoup. Ni la couleur du stylo, ni le nombre de lignes, ni la marge : l'ORDRE.",
      schema: planRange,
      micros: ["cm2_ecrit_plan"],
    },
    {
      titre: "Un plan n'est pas une première version",
      texte:
        "Quatre mots dans la marge suffisent. Si ton plan fait des phrases, tu as commencé à rédiger — et tu rédigeras deux fois.",
      schema: planNestPasLeTexte,
      micros: ["cm2_ecrit_plan"],
    },
    {
      titre: "L'ordre se décide avant",
      texte:
        "Changer l'ordre des idées une fois le texte écrit coute dix fois plus cher que de le décider en trois secondes sur un plan.",
      schema: ordreDecideAvant,
      micros: ["cm2_ecrit_plan"],
    },
    {
      titre: "Comparer, c'est mettre en regard",
      texte:
        "Ce qu'ils ont en commun ET ce qui les sépare, l'un en face de l'autre. C'est la seule forme qui fasse voir la comparaison.",
      schema: deuxColonnes,
      micros: ["cm2_ecrit_comparer_documents"],
    },
    {
      titre: "Deux résumés côte à côte ne comparent rien",
      texte:
        "Le lecteur reste seul devant, et c'est lui qui doit faire le travail. Comparer, c'est le faire à sa place.",
      schema: pasDeuxResumes,
      micros: ["cm2_ecrit_comparer_documents"],
    },
    {
      titre: "Le défi : préparer ne se rend pas",
      texte:
        "Aucun de ces quatre écrits ne sera ramassé. C'est pour cela qu'on ne les fait pas — et c'est pour cela qu'ils manquent.",
      schema: preparerRendPossible,
      micros: ["cm2_ecrit_preparer_defi"],
    },
  ],
  reel: {
    texte:
      "Tu prépares déjà, ailleurs, et tu le fais court sans y penser. Avant de partir quelque part, tu ne rédiges pas ta journée : tu retiens trois choses — l'heure, le lieu, ce qu'il faut emporter. Avant un match, personne ne récite le règlement : on dit deux consignes. C'est exactement le rapport entre un plan et un devoir. Ce qui bloque à l'école, c'est qu'un plan ressemble à du travail non fait : la page est presque vide, et l'on a l'impression de n'avoir rien produit. C'est l'inverse — quatre mots dans la marge sont ce qui empêchera de tout recommencer à la moitié du devoir, quand on s'apercevra que la troisième idée aurait dû venir en premier.",
  },
  historique: {
    texte:
      "Le mot « plan » vient de l'architecture. Un plan, c'est d'abord le dessin d'un bâtiment vu d'en haut, tracé avant qu'on ne pose la première pierre — et personne n'a jamais construit une maison en commençant par un mur pour voir ce que cela donnerait. L'écriture a emprunté le mot, et avec lui toute l'idée : un plan de texte est plus petit que le texte, il ne ressemble pas au texte, et il ne sert à rien une fois le texte fini. C'est exactement ce qu'on reproche parfois aux plans — « ça ne compte pas dans la note ». Un plan d'architecte non plus ne fait pas partie de la maison ; il décide seulement de tout ce qu'elle sera.",
  },
  formule: {
    contexte: "Le test qui dit si ton écrit de préparation en est vraiment un.",
    expression: "est-ce plus court que le devoir ?",
    legende:
      "Un plan, des notes, une comparaison : tous les trois doivent tenir dans une fraction de ce qu'ils préparent. Si ton plan fait une page pour un devoir d'une page, tu as écrit le devoir deux fois — la première en désordre. Faire court n'est pas ici une élégance : c'est la définition.",
    schema: plusCourtQueLeDevoir,
  },
  methode: [
    {
      titre: "Copier quatre ou cinq mots à la fois",
      texte:
        "Lis le groupe, ferme les yeux une seconde, écris-le. Puis allonge le groupe. Cela s'entraine, et cela se mesure en nombre de regards.",
      schema: copierParGroupes,
      micros: ["cm2_ecrit_copie"],
    },
    {
      titre: "Noter trois mots par idée, pas plus",
      texte:
        "Des abréviations, des flèches, des tirets. Si tu écris une phrase entière, tu as cessé de noter et commencé à recopier.",
      schema: notesEnAbrege,
      micros: ["cm2_ecrit_notes"],
    },
    {
      titre: "Quatre mots dans la marge, numérotés",
      texte:
        "Un mot par partie, dans l'ordre où tu les écriras. Tu les barres au fur et à mesure : tu ne peux plus en oublier une.",
      schema: planRange,
      micros: ["cm2_ecrit_plan"],
    },
    {
      titre: "Deux colonnes, jamais deux paragraphes",
      texte:
        "À gauche ce qui rapproche, à droite ce qui sépare. La forme fait la moitié du travail de comparaison.",
      schema: deuxColonnes,
      micros: ["cm2_ecrit_comparer_documents"],
    },
  ],
  usages: [
    {
      titre: "Pour copier une leçon deux fois plus vite",
      detail:
        "Sans écrire plus vite, et sans abimer son écriture. Tout le gain est dans le nombre de fois où l'on lève les yeux.",
      schema: copierParGroupes,
      micros: ["cm2_ecrit_copie"],
    },
    {
      titre: "Pour retenir une leçon sans la relire dix fois",
      detail:
        "Des notes abrégées, faites pendant qu'on écoute ou qu'on lit. Trois mots par idée valent mieux qu'une page recopiée.",
      schema: grilleQuatreEcritsNotes,
      micros: ["cm2_ecrit_notes"],
    },
    {
      titre: "Pour ne pas tout recommencer à la moitié",
      detail:
        "C'est ce que le plan évite. On s'aperçoit toujours trop tard que la troisième idée aurait dû venir en premier.",
      schema: ordreDecideAvant,
      micros: ["cm2_ecrit_plan"],
    },
    {
      titre: "Pour répondre à « compare ces deux documents »",
      detail:
        "Deux colonnes d'abord, la rédaction ensuite. Sans le tableau, on écrit deux résumés et l'on ne compare pas.",
      schema: pasDeuxResumes,
      micros: ["cm2_ecrit_comparer_documents"],
    },
  ],
  exemples: [
    {
      titre: "Copier un texte long",
      donnees: "« Pour copier vite et sans erreur un texte long, le mieux est de… »",
      schema: copierParGroupes,
      question: "Que fais-tu ?",
      solution:
        "MÉMORISER UN GROUPE DE MOTS PUIS L'ÉCRIRE. Pas copier une lettre à la fois en relevant les yeux à chaque lettre — c'est la méthode la plus lente. Pas copier sans jamais relire. Et surtout pas inventer les mots difficiles. Copier par groupes va plus vite ET fait moins d'erreurs.",
      micros: ["cm2_ecrit_copie"],
    },
    {
      titre: "Prendre des notes",
      donnees: "« Prendre des notes pour retenir une leçon, c'est écrire… »",
      schema: grilleQuatreEcritsNotes,
      question: "Écrire quoi ?",
      solution:
        "LES MOTS IMPORTANTS, EN ABRÉGÉ. Pas chaque phrase entière deux fois — cela occupe la main sans rien fixer. Pas seulement la date. Et pas rien du tout. De bonnes notes gardent l'essentiel avec PEU DE MOTS : c'est la brièveté qui prouve le tri.",
      micros: ["cm2_ecrit_notes"],
    },
    {
      titre: "Des notes trop longues",
      donnees: "Tes notes de la leçon font presque la longueur de la leçon.",
      schema: plusCourtQueLeDevoir,
      question: "Qu'est-ce que cela montre ?",
      solution:
        "QUE TU AS RECOPIÉ, PAS NOTÉ. Et c'est mesurable sans juger de rien : un écrit de préparation doit être plus court que ce qu'il prépare. Si le tien ne l'est pas, tu as fait deux fois le même travail, dont une fois pour rien.",
      micros: ["cm2_ecrit_notes"],
    },
    {
      titre: "Faire un plan",
      donnees: "« Avant d'écrire un texte, faire un plan, c'est… »",
      schema: planRange,
      question: "C'est quoi ?",
      solution:
        "RANGER SES IDÉES DANS L'ORDRE. Ni choisir la couleur du stylo, ni compter les lignes, ni dessiner la marge. Un plan ne décore pas et ne mesure pas : il DÉCIDE de l'ordre — et c'est la décision qui coute le moins cher avant, et le plus cher après.",
      micros: ["cm2_ecrit_plan"],
    },
    {
      titre: "Comparer par écrit",
      donnees: "On te demande d'écrire pour comparer deux documents.",
      schema: deuxColonnes,
      question: "Comment t'y prends-tu ?",
      solution:
        "EN METTANT EN REGARD CE QU'ILS PARTAGENT ET CE QUI LES SÉPARE. Deux colonnes, et la rédaction ensuite. Écrire deux résumés l'un après l'autre ne compare rien : cela laisse tout le travail au lecteur, alors que c'est justement ce travail qu'on te demande.",
      micros: ["cm2_ecrit_comparer_documents"],
    },
    {
      titre: "Le défi",
      donnees: "Tu n'as rien à rendre pour ton plan, tes notes et ta comparaison.",
      schema: preparerRendPossible,
      question: "Pourquoi les faire, alors ?",
      solution:
        "PARCE QUE CE SONT EUX QUI RENDENT LE DEVOIR POSSIBLE. Aucun ne sera ramassé — c'est exactement pour cela qu'on ne les fait pas, et exactement pour cela qu'ils manquent. Un devoir écrit sans préparation se voit : il change d'ordre en route et se répète.",
      micros: ["cm2_ecrit_preparer_defi"],
    },
  ],
  pieges: [
    "Copier lettre à lettre : c'est la méthode la plus lente et la plus fautive.",
    "Copier sans relire : le mot sauté est l'erreur la plus fréquente d'une copie.",
    "Recopier la leçon en croyant prendre des notes : la main travaille, la tête non.",
    "Vouloir des notes belles : personne d'autre ne les lira.",
    "Écrire un plan en phrases : c'est une première version, et tu rédigeras deux fois.",
    "Changer l'ordre des idées une fois le texte écrit : c'est dix fois plus cher.",
    "Écrire deux résumés au lieu d'un tableau : cela ne compare rien.",
  ],
  aRetenir: [
    "Quatre écrits qui ne se rendent pas, et sans lesquels rien ne se rend.",
    "Tous plus courts que ce qu'ils préparent : c'est le test.",
    "On copie par groupes de mots, et l'on relit après.",
    "Un plan range les idées dans l'ordre — quatre mots suffisent.",
    "Comparer, c'est deux colonnes ; deux résumés ne comparent rien.",
  ],
  entrainement: [
    {
      question: "Tu relèves les yeux à chaque mot en copiant. Que peux-tu changer ?",
      correction: "Emporter un groupe de quatre ou cinq mots à la fois.",
      micros: ["cm2_ecrit_copie"],
    },
    {
      question: "Tes notes recopient les phrases du livre. Qu'est-ce qui ne va pas ?",
      correction: "Ce ne sont plus des notes : il faut les mots importants, en abrégé.",
      micros: ["cm2_ecrit_notes"],
    },
    {
      question: "« Avant d'écrire un texte, faire un plan, c'est… »",
      correction: "Ranger ses idées dans l'ordre.",
      micros: ["cm2_ecrit_plan"],
    },
    {
      question: "Ton plan fait douze lignes pour un devoir de quinze. Est-ce un plan ?",
      correction: "Non : un écrit de préparation est plus court que ce qu'il prépare.",
      micros: ["cm2_ecrit_plan"],
    },
    {
      question: "« Écrire pour comparer deux documents, c'est écrire… »",
      correction: "Ce qu'ils ont en commun et ce qui les sépare.",
      micros: ["cm2_ecrit_comparer_documents"],
    },
    {
      question: "Personne ne ramasse ton plan. Faut-il quand même le faire ?",
      correction: "Oui : c'est lui qui empêche de tout recommencer à la moitié du devoir.",
      micros: ["cm2_ecrit_preparer_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesEcriturePreparerCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Préparer un écrit - CM2",
    section: {
      type: "objectif",
      phrase: "Plus court que ce qu'il prépare",
      sousPhrase:
        "Quatre écrits qui ne seront jamais rendus, et sans lesquels rien ne se rend.",
      encadre: {
        titre: "L'idée",
        texte: "Un plan aussi long que le devoir n'est pas un plan.",
      },
    },
  },
  {
    titre: "Les quatre écrits",
    badge: "Préparer un écrit - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La copie", texte: "Par groupes de mots — puis on relit." },
        { titre: "Les notes", texte: "Les mots importants, en abrégé." },
        { titre: "Le plan", texte: "Les idées rangées dans l'ordre." },
        { titre: "La comparaison", texte: "Deux colonnes, jamais deux résumés." },
      ],
    },
    schema: grilleQuatreEcrits,
  },
  {
    titre: "Un plan n'est pas un texte",
    badge: "Préparer un écrit - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Une première version en phrases. Là, tu rédigeras deux fois.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Quatre mots dans la marge, numérotés, barrés au fur et à mesure.",
      },
    },
    schema: planNestPasLeTexte,
  },
  {
    titre: "L'ordre se décide avant",
    badge: "Préparer un écrit - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Décider l'ordre sur un plan coute trois secondes.",
        "Le changer une fois le texte écrit coute dix fois plus.",
        "Et l'on s'en aperçoit toujours à la moitié du devoir.",
        "C'est exactement ce que le plan évite.",
      ],
    },
    schema: ordreDecideAvant,
  },
  {
    titre: "Comparer, c'est mettre en regard",
    badge: "Préparer un écrit - CM2",
    section: {
      type: "etapes",
      etapes: [
        "À GAUCHE : ce que les deux documents partagent.",
        "À DROITE : ce qui les sépare.",
        "⛔ Deux résumés l'un après l'autre ne comparent rien.",
        "Ils laissent au lecteur le travail qu'on te demandait de faire.",
      ],
    },
    schema: deuxColonnes,
  },
  {
    titre: "À vous",
    badge: "Préparer un écrit - CM2",
    section: {
      type: "exercice",
      enonce: "Tes notes de la leçon font presque la longueur de la leçon.",
      question: "Qu'est-ce que cela montre ?",
      indice: "Compare les deux longueurs — c'est tout ce qu'il faut.",
      correction:
        "QUE TU AS RECOPIÉ, PAS NOTÉ. Un écrit de préparation doit être plus court que ce qu'il prépare. Sinon, tu as fait deux fois le même travail — dont une fois pour rien.",
    },
    schema: plusCourtQueLeDevoir,
  },
];
