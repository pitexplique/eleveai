// ─── Fiche de cours : écrire pour réfléchir, apprendre et mémoriser (6e) ──────
// DEUXIÈME FICHE DU DOMAINE DE L'ÉCRITURE EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Écrire pour réfléchir, apprendre et mémoriser »
// (BO6EFRE).
//
// ⛔⛔ PIÈGE DE CLASSE, ET LE LIBELLÉ EST MOT POUR MOT LE MÊME QU'EN 5e :
// `ecriture_reflechir` (cycle 4) porte exactement ce titre. Les deux fiches ne
// doivent pourtant rien avoir en commun, parce que les MICROS diffèrent
// entièrement :
//
//   | 5e (cycle 4) | 6e (cycle 3) |
//   |—|—|—|
//   | planifier en partant de la fin | RÉSUMER : garder, jeter, avec ses mots |
//   | repérer l'idée principale d'un message | HIÉRARCHISER ses idées |
//   | récrire une leçon pour la retenir | JUSTIFIER un choix en un paragraphe |
//   | trois MOMENTS : avant, pendant, après | le RÉSUMÉ comme objet à part entière |
//
// ⚠️ La 5e ne travaille PAS le résumé, et la 6e ne travaille PAS la
// planification. Le seul point de contact est « écrire pour retenir une leçon »,
// traité ici par la reformulation SCHÉMATIQUE (flèches, tableau), que la 5e n'a
// pas.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES CINQ MICROS : ÉCRIRE POUR APPRENDRE, C'EST
// TRIER — ET TRIER, C'EST JETER. Résumer, c'est garder les personnages, l'action
// et la fin, et supprimer tout le reste. Hiérarchiser, c'est classer du plus
// important au moins important. Ce sont DEUX NOMS POUR LE MÊME GESTE : décider
// ce qui compte. Un élève qui n'ose rien jeter ne peut ni résumer ni
// hiérarchiser, et c'est le même blocage.
//
// ⭐ ET LE TEST EST CONCRET, PAS UNE IMPRESSION : « si l'histoire tient sans ce
// détail, il sort du résumé ». Une seconde par détail, et le tri se fait tout
// seul. C'est le genre de règle qui vaut dix conseils.
//
// ⭐ TROIS RÈGLES TECHNIQUES QUE PERSONNE NE DIT, ET QUI SONT DANS LE POOL :
// un résumé s'écrit AU PRÉSENT (« plus court et plus lisible ») ; il s'écrit
// AVEC SES PROPRES MOTS (« recopier ne prouve pas qu'on a compris ») ; et il
// tient en TROIS OU QUATRE PHRASES pour une page — un résumé de la longueur du
// texte n'est plus un résumé.
//
// ⭐ ET LA QUATRIÈME FAÇON D'ÉCRIRE POUR APPRENDRE : LE SCHÉMA. « Reformuler de
// manière schématique, c'est la mettre en schéma, en flèches ou en tableau » —
// et ce n'est pas une version paresseuse de la leçon : le schéma MONTRE LES
// LIENS, ce que des phrases plus courtes ne font pas.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot ; `number_line` centre
// aussi son étiquette sur la valeur — pas de point sur une borne.
//
// Alignée sur les pools ECRIT_RESUMER et ECRITURE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `ecriture_apprendre`) :
// - 6e_ecrit_notes         → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_ecrit_resumer       → figure, propriétés 3 à 6, formule, méthode 2,
//                            usage 2, exemples 2 et 3
// - 6e_ecrit_hierarchiser  → propriétés 7 et 8, méthode 3, usage 3, exemple 4
// - 6e_ecrit_justifier     → propriété 9, méthode 4, usage 4, exemple 5
// - 6e_ecrit_apprendre_defi → propriété 10, exemple 6

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

/** Les quatre façons d'écrire pour apprendre. ⚠️ Cellules courtes : à la largeur
 *  d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on trie ──────────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : ce qu'un résumé garde, et ce qu'il jette.
const garderOuJeter = phrase({
  mots: [
    { texte: "les personnages", focus: true },
    { texte: "l'action", focus: true },
    { texte: "la fin", focus: true },
    { texte: "les détails", barre: true },
  ],
  legende: "Un résumé garde trois choses. Tout le reste sort — et c'est le travail.",
});

// ⭐ LE TEST, EN UNE SECONDE PAR DÉTAIL.
const testDuDetail = phrase({
  mots: [
    { texte: "sans ce détail" },
    { texte: "l'histoire tient", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "si", type: "question" }],
  legende: "Alors il sort du résumé. Le tri se fait tout seul avec cette question.",
});

const avecSesMots = phrase({
  mots: [
    { texte: "recopier", barre: true },
    { texte: "avec tes mots", focus: true },
  ],
  legende: "Recopier ne prouve pas qu'on a compris. Reformuler, oui.",
});

const troisPhrases = phrase({
  mots: [
    { texte: "une page" },
    { texte: "trois phrases", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "tient en", type: "question" }],
  legende: "Un résumé qui fait la longueur du texte n'est plus un résumé.",
});

const auPresent = phrase({
  mots: [
    { texte: "il partit", barre: true },
    { texte: "il part", focus: true },
  ],
  legende: "Un résumé s'écrit au présent : plus court, et plus lisible.",
});

const ideePrincipaleParParagraphe = phrase({
  mots: [
    { texte: "chaque paragraphe" },
    { texte: "son idée", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donne", type: "question" }],
  legende: "On commence par là — pas par recopier la première et la dernière phrase.",
});

// ── HIÉRARCHISER : classer, pas énumérer.
const hierarchiser = phrase({
  mots: [
    { texte: "le plus important", focus: true },
    { texte: "puis" },
    { texte: "le moins" },
  ],
  legende: "Hiérarchiser, c'est classer — pas écrire dans l'ordre où les idées viennent.",
});

const ordreDeLespritBarre = phrase({
  mots: [
    { texte: "l'ordre de ta tête", barre: true },
    { texte: "l'ordre du lecteur", focus: true },
  ],
  legende: "Les idées viennent en désordre. Elles ne s'écrivent pas dans cet ordre-là.",
});

// ── JUSTIFIER : une idée, un appui.
const ideeEtRaison = phrase({
  mots: [
    { texte: "une idée" },
    { texte: "une raison", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "soutenue par", type: "question" }],
  legende: "Court ne veut pas dire vague : une idée, et l'appui qui la tient.",
});

// ── LES QUATRE FAÇONS D'ÉCRIRE POUR APPRENDRE.
const grilleQuatreFacons = grille({
  headers: ["Ce que tu écris", "Ce que ça donne"],
  rows: [
    { values: ["un résumé", "tu tries"] },
    { values: ["un classement", "tu décides"] },
    { values: ["un schéma", "tu vois les liens"] },
    { values: ["une raison", "tu tiens l'idée"] },
  ],
  caption: "Quatre écrits, et aucun ne recopie la leçon.",
});

const grilleQuatreFaconsSchema = grille({
  headers: ["Ce que tu écris", "Ce que ça donne"],
  rows: [
    { values: ["un résumé", "tu tries"] },
    { values: ["un classement", "tu décides"] },
    { values: ["un schéma", "tu vois les liens"] },
    { values: ["une raison", "tu tiens l'idée"] },
  ],
  highlight: { row: 2 },
  caption: "Le schéma montre les LIENS — pas des phrases plus courtes.",
});

const comparerDeuxDocuments = phrase({
  mots: [
    { texte: "ce qu'ils partagent" },
    { texte: "ce qui les sépare" },
  ],
  legende: "Écrire pour comparer, c'est mettre en regard — pas résumer chacun de son côté.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureApprendre6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "ecriture-apprendre",
  titre: `Résumer, hiérarchiser et justifier en 6e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Écrire pour apprendre, c'est TRIER — et trier, c'est jeter. Un résumé garde les personnages, l'action et la fin : tout le reste sort. Hiérarchiser, c'est classer du plus important au moins important. Ce sont deux noms pour le même geste, et un élève qui n'ose rien jeter est bloqué sur les deux. Le test tient en une question : si l'histoire tient sans ce détail, il sort.",
  identite: [
    { label: "Mots clés", valeur: "Résumer, trier, hiérarchiser, justifier" },
    { label: "Le secret", valeur: "Trier, c'est jeter" },
    { label: "Outil", valeur: "L'histoire tient-elle sans ce détail ?" },
  ],
  definition: {
    texte:
      "RÉSUMER un récit, c'est garder LES PERSONNAGES, L'ACTION ET LA FIN, et supprimer les détails qui ne changent pas l'histoire. Cela s'écrit AVEC SES PROPRES MOTS — recopier les phrases du texte ne prouve pas qu'on a compris —, le plus souvent AU PRÉSENT, qui rend le résumé plus court et plus lisible, et en TROIS OU QUATRE PHRASES pour une page : un résumé de la longueur du texte n'en est plus un. On commence par repérer l'IDÉE PRINCIPALE DE CHAQUE PARAGRAPHE, jamais par recopier la première et la dernière phrase. HIÉRARCHISER ses idées avant d'écrire, c'est les classer de la plus importante à la moins importante — et non les écrire dans l'ordre où elles viennent à l'esprit. JUSTIFIER un choix en un court paragraphe demande une IDÉE ET LA RAISON QUI LA SOUTIENT : court ne veut pas dire vague. Enfin, reformuler une leçon « de manière schématique » — en flèches, en tableau — est une quatrième façon d'écrire pour apprendre, et le schéma a ceci de propre qu'il MONTRE LES LIENS entre les idées.",
  },
  figure: {
    schema: pile(garderOuJeter, testDuDetail),
    legende:
      "Trois boites pleines et une barrée : c'est tout le résumé. Les personnages, l'action, la fin — et le reste sort, y compris ce qui t'a plu, y compris ce qui était bien écrit. C'est ce « y compris » qui bloque les élèves : ils croient qu'ils vont perdre quelque chose. En bas, le test qui débloque, et il se répond en une seconde par détail : si l'histoire tient sans lui, il sort. Pas de jugement à porter, pas de goût à consulter — une question fermée.",
  },
  proprietes: [
    {
      titre: "Écrire pour apprendre, ce n'est pas recopier",
      texte:
        "Reformuler avec ses mots aide à retenir ; recopier occupe la main. Ce n'est pas parce que le cahier est propre que la leçon est sue.",
      schema: avecSesMots,
      micros: ["6e_ecrit_notes"],
    },
    {
      titre: "Quatre façons d'écrire pour apprendre",
      texte:
        "Un résumé pour trier, un classement pour décider, un schéma pour voir les liens, une raison pour tenir une idée. Aucune ne recopie.",
      schema: grilleQuatreFacons,
      micros: ["6e_ecrit_notes"],
    },
    {
      titre: "Un résumé garde trois choses",
      texte:
        "Les personnages, l'action, la fin. Pas les dialogues, pas ton avis, pas la vie de l'auteur : ceux-là appartiennent à d'autres écrits.",
      schema: garderOuJeter,
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Le test du détail",
      texte:
        "Si l'histoire tient sans lui, il sort. Une seconde par détail, aucun jugement à porter — et le tri se fait presque tout seul.",
      schema: testDuDetail,
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Avec ses mots, et au présent",
      texte:
        "Recopier ne prouve rien. Et le présent de narration raccourcit : « il part » tient en trois lettres de moins que « il partit ».",
      schema: pile(avecSesMots, auPresent),
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Trois ou quatre phrases pour une page",
      texte:
        "C'est un chiffre, pas une impression. On commence par l'idée principale de chaque paragraphe — jamais par la première et la dernière phrase.",
      schema: pile(troisPhrases, ideePrincipaleParParagraphe),
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Hiérarchiser, c'est classer",
      texte:
        "De la plus importante à la moins importante. Ce n'est ni les compter, ni les souligner, ni les écrire dans l'ordre où elles arrivent.",
      schema: hierarchiser,
      micros: ["6e_ecrit_hierarchiser"],
    },
    {
      titre: "L'ordre de ta tête n'est pas celui du lecteur",
      texte:
        "Les idées viennent en désordre, et c'est normal. Les écrire dans cet ordre-là oblige le lecteur à faire le tri que tu n'as pas fait.",
      schema: ordreDeLespritBarre,
      micros: ["6e_ecrit_hierarchiser"],
    },
    {
      titre: "Justifier : une idée, un appui",
      texte:
        "Un écrit réflexif court n'attend ni introduction, ni titre, ni conclusion : une idée, et la raison qui la soutient. Court, pas vague.",
      schema: ideeEtRaison,
      micros: ["6e_ecrit_justifier"],
    },
    {
      titre: "Le schéma montre ce que les phrases ne montrent pas",
      texte:
        "Des flèches, un tableau : les LIENS entre les idées apparaissent. Ce n'est pas une leçon écrite plus court — c'est une leçon écrite autrement.",
      schema: grilleQuatreFaconsSchema,
      micros: ["6e_ecrit_apprendre_defi"],
    },
  ],
  reel: {
    texte:
      "Tu résumes déjà tous les jours, et bien. Quand quelqu'un te demande de quoi parle une série et que tu réponds en deux phrases, tu viens de garder les personnages, l'action et la fin — et de jeter vingt heures d'épisodes sans hésiter. Personne n'a jamais eu besoin de t'expliquer le test du détail : tu le fais. Ce qui change à l'école, c'est qu'on te demande de le faire par écrit sur un texte que tu viens de lire une fois, et que la peur de perdre un point te fait tout garder. Le résultat est un « résumé » aussi long que le texte, qui ne rapporte rien. Retiens l'inverse de ce que dicte la prudence : ce qui rapporte des points dans un résumé, ce sont les choses que tu as osé enlever.",
  },
  historique: {
    texte:
      "Il existe des livres de l'Antiquité que nous ne connaissons QUE par leur résumé. Des historiens romains ont écrit des dizaines de volumes dont l'original a disparu — usure, incendies, copies interrompues —, mais dont un abrégé, rédigé quelques siècles plus tard par un lecteur, a survécu. Ce sont ces abrégés que l'on lit aujourd'hui, et ils sont parfois notre seule source sur des périodes entières. Cela dit deux choses. Qu'un résumé n'est pas un sous-produit : c'est un texte, avec un auteur et des choix. Et que les choix de ce résumeur inconnu décident encore, deux-mille ans plus tard, de ce que nous savons — ce qu'il a jugé secondaire est perdu pour toujours.",
  },
  formule: {
    contexte: "La question qui fait le tri d'un résumé, détail par détail.",
    expression: "l'histoire tient-elle sans ce détail ?",
    legende:
      "Si oui, il sort — même s'il t'a plu, même s'il était joliment écrit. C'est une question fermée : on y répond en une seconde, sans avoir à juger de la valeur de quoi que ce soit. Et c'est ce qui la rend utilisable quand on n'ose rien jeter.",
    schema: testDuDetail,
  },
  methode: [
    {
      titre: "Fermer le cahier et écrire",
      texte:
        "Reformule la leçon sans la regarder. Ce que tu n'arrives pas à écrire est exactement ce que tu ne sais pas — et cela se voit en trente secondes.",
      schema: avecSesMots,
      micros: ["6e_ecrit_notes"],
    },
    {
      titre: "Une idée par paragraphe, puis on trie",
      texte:
        "Note l'idée principale de chaque paragraphe en marge. Puis applique le test du détail à chacune, et il en restera trois.",
      schema: ideePrincipaleParParagraphe,
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Numéroter avant de rédiger",
      texte:
        "Écris tes idées en vrac, puis mets un chiffre devant chacune, par ordre d'importance. Tu rédiges ensuite dans l'ordre des chiffres.",
      schema: hierarchiser,
      micros: ["6e_ecrit_hierarchiser"],
    },
    {
      titre: "Ajouter le « parce que »",
      texte:
        "Relis chaque phrase d'avis. Si aucune n'est suivie d'une raison, ton paragraphe affirme sans rien soutenir — et cela se répare en une ligne.",
      schema: ideeEtRaison,
      micros: ["6e_ecrit_justifier"],
    },
  ],
  usages: [
    {
      titre: "Pour apprendre une leçon sans la relire dix fois",
      detail:
        "Un schéma en flèches vaut trois relectures : il oblige à décider ce qui dépend de quoi, et c'est précisément cela qu'on te demandera.",
      schema: grilleQuatreFaconsSchema,
      micros: ["6e_ecrit_notes"],
    },
    {
      titre: "Pour résumer un chapitre en devoir",
      detail:
        "Trois phrases, au présent, avec tes mots. Un résumé plus long n'est pas plus complet : il est simplement non trié.",
      schema: troisPhrases,
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Pour organiser une réponse longue",
      detail:
        "Mets en dernier ce qui compte le plus — ou en premier, mais décide. Le pire est l'ordre où les idées te sont venues.",
      schema: ordreDeLespritBarre,
      micros: ["6e_ecrit_hierarchiser"],
    },
    {
      titre: "Pour comparer deux documents par écrit",
      detail:
        "Écris ce qu'ils partagent ET ce qui les sépare. Deux résumés côte à côte ne comparent rien : le lecteur reste seul devant.",
      schema: comparerDeuxDocuments,
      micros: ["6e_ecrit_justifier"],
    },
  ],
  exemples: [
    {
      titre: "Pourquoi écrire pour apprendre",
      donnees: "« Pourquoi écrire pour apprendre une leçon ? »",
      schema: avecSesMots,
      question: "Pour quelle raison ?",
      solution:
        "PARCE QUE REFORMULER AVEC SES MOTS AIDE À RETENIR. Pas parce qu'une leçon recopiée s'apprend mieux — elle ne s'apprend pas du tout —, ni parce que le professeur vérifie le cahier. Écrire avec ses mots oblige à comprendre : sinon la phrase ne sort pas.",
      micros: ["6e_ecrit_notes"],
    },
    {
      titre: "Ce qu'un résumé garde",
      donnees: "« Un bon résumé de récit garde… »",
      schema: garderOuJeter,
      question: "Que garde-t-il ?",
      solution:
        "LES PERSONNAGES, L'ACTION ET LA FIN. Pas tous les dialogues — ils sont le premier volume à sortir. Pas l'avis du lecteur — il a sa place ailleurs, dans un carnet. Pas la vie de l'auteur — elle n'est pas dans l'histoire. Trois choses, et le reste tombe.",
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Ce qu'on supprime",
      donnees: "« Qu'est-ce qu'on SUPPRIME en priorité dans un résumé ? »",
      schema: testDuDetail,
      question: "Quoi ?",
      solution:
        "LES DÉTAILS QUI NE CHANGENT PAS L'HISTOIRE. Pas les passages sans dialogue, pas tout ce qui précède le problème, pas les mots difficiles — ces trois-là suppriment au hasard. Le test est : sans ce détail, l'histoire tient-elle encore ? Si oui, il sort.",
      micros: ["6e_ecrit_resumer"],
    },
    {
      titre: "Hiérarchiser",
      donnees: "« Hiérarchiser ses idées avant d'écrire, c'est… »",
      schema: hierarchiser,
      question: "C'est quoi ?",
      solution:
        "LES CLASSER DE LA PLUS IMPORTANTE À LA MOINS IMPORTANTE. Ni les écrire dans l'ordre où elles viennent — c'est justement ce qu'on veut éviter —, ni les compter, ni les souligner. Hiérarchiser, c'est DÉCIDER, et cela se fait avant de rédiger.",
      micros: ["6e_ecrit_hierarchiser"],
    },
    {
      titre: "Un écrit court",
      donnees: "« Dans un écrit réflexif court, on attend… »",
      schema: ideeEtRaison,
      question: "Quoi ?",
      solution:
        "UNE IDÉE ET LA RAISON QUI LA SOUTIENT. Ni une longue introduction, ni un titre avec une conclusion, ni un résumé du cours. Court ne veut pas dire vague : deux phrases suffisent, à condition que la seconde tienne la première.",
      micros: ["6e_ecrit_justifier"],
    },
    {
      titre: "Le défi",
      donnees: "« Reformuler l'essentiel d'une leçon de manière schématique, c'est… »",
      schema: grilleQuatreFaconsSchema,
      question: "C'est quoi ?",
      solution:
        "LA METTRE EN SCHÉMA, EN FLÈCHES OU EN TABLEAU. Ce n'est pas la réécrire en phrases plus courtes, ni changer l'ordre des paragraphes, ni ne garder que les mots en gras. Le schéma fait ce qu'aucune de ces trois-là ne fait : il montre les LIENS entre les idées.",
      micros: ["6e_ecrit_apprendre_defi"],
    },
  ],
  pieges: [
    "Ne rien oser jeter : un résumé qui garde tout n'est pas prudent, il est raté.",
    "Recopier des phrases du texte : cela ne prouve pas qu'on a compris.",
    "Écrire un résumé au passé simple : le présent le rend plus court et plus lisible.",
    "Recopier la première et la dernière phrase : on part des idées, pas de la place des phrases.",
    "Écrire ses idées dans l'ordre où elles viennent : c'est le désordre de ta tête, pas celui du lecteur.",
    "Croire qu'un écrit court peut être vague : une idée, un appui, et cela suffit.",
    "Prendre un schéma pour une leçon plus courte : il montre les liens, c'est autre chose.",
  ],
  aRetenir: [
    "Écrire pour apprendre, c'est trier — et trier, c'est jeter.",
    "Un résumé garde les personnages, l'action et la fin.",
    "Le test : si l'histoire tient sans ce détail, il sort.",
    "Avec tes mots, au présent, trois ou quatre phrases pour une page.",
    "Hiérarchiser, c'est classer par importance — pas énumérer.",
  ],
  entrainement: [
    {
      question: "« Dans un résumé, on écrit… » comment ?",
      correction: "Avec ses propres mots.",
      micros: ["6e_ecrit_resumer"],
    },
    {
      question: "« Pour résumer une page, par quoi commence-t-on ? »",
      correction: "Par repérer l'idée principale de chaque paragraphe.",
      micros: ["6e_ecrit_resumer"],
    },
    {
      question: "« À quel temps écrit-on le plus souvent un résumé ? »",
      correction: "Au présent.",
      micros: ["6e_ecrit_resumer"],
    },
    {
      question: "« Combien de phrases pour résumer une page ? »",
      correction: "Trois ou quatre suffisent.",
      micros: ["6e_ecrit_hierarchiser"],
    },
    {
      question: "« Écrire pour comparer deux documents, c'est écrire… » quoi ?",
      correction: "Ce qu'ils ont en commun et ce qui les sépare.",
      micros: ["6e_ecrit_justifier"],
    },
    {
      question: "« Ton résumé fait la longueur du texte. » Que s'est-il passé ?",
      correction: "Tu n'as rien trié : ce n'est plus un résumé.",
      micros: ["6e_ecrit_apprendre_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesEcritureApprendre6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Résumer et hiérarchiser - 6e",
    section: {
      type: "objectif",
      phrase: "Trier, c'est jeter",
      sousPhrase:
        "Résumer et hiérarchiser sont deux noms pour le même geste : décider ce qui compte.",
      encadre: {
        titre: "L'idée",
        texte: "Ce qui rapporte des points dans un résumé, c'est ce que tu as osé enlever.",
      },
    },
  },
  {
    titre: "Ce qu'un résumé garde",
    badge: "Résumer et hiérarchiser - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les personnages", texte: "Qui agit, et qui s'y oppose." },
        { titre: "L'action", texte: "Ce qui arrive, dans l'ordre." },
        { titre: "La fin", texte: "Comment cela se règle." },
        { titre: "Et rien d'autre", texte: "Ni les dialogues, ni ton avis, ni l'auteur." },
      ],
    },
    schema: garderOuJeter,
  },
  {
    titre: "Le test du détail",
    badge: "Résumer et hiérarchiser - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Prends un détail. Demande : l'histoire tient-elle sans lui ?",
        "SI OUI, il sort — même s'il t'a plu.",
        "Une seconde par détail, aucun jugement à porter.",
        "C'est une question fermée, et c'est ce qui la rend utilisable.",
      ],
    },
    schema: testDuDetail,
  },
  {
    titre: "Trois règles techniques",
    badge: "Résumer et hiérarchiser - 6e",
    section: {
      type: "etapes",
      etapes: [
        "AVEC TES MOTS : recopier ne prouve pas qu'on a compris.",
        "AU PRÉSENT : « il part », pas « il partit ». Plus court, plus lisible.",
        "TROIS OU QUATRE PHRASES pour une page.",
        "Et l'on part de l'idée de chaque paragraphe, pas de la première phrase.",
      ],
    },
    schema: auPresent,
  },
  {
    titre: "Hiérarchiser, c'est décider",
    badge: "Résumer et hiérarchiser - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Écrire ses idées dans l'ordre où elles viennent à l'esprit.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Les classer de la plus importante à la moins importante, avant de rédiger.",
      },
    },
    schema: hierarchiser,
  },
  {
    titre: "À vous",
    badge: "Résumer et hiérarchiser - 6e",
    section: {
      type: "exercice",
      enonce: "Ton résumé d'une page fait douze lignes, et tu n'as rien enlevé.",
      question: "Que fais-tu, et par quoi commences-tu ?",
      indice: "Prends chaque détail séparément, et pose-lui une seule question.",
      correction:
        "LE TEST DU DÉTAIL, un par un : l'histoire tient-elle sans lui ? Commence par les dialogues et les descriptions — ce sont eux qui occupent la place, et l'histoire tient presque toujours sans.",
    },
    schema: garderOuJeter,
  },
];
