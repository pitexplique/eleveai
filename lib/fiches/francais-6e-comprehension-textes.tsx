// ─── Fiche de cours : comprendre et interpréter un texte (6e) ─────────────────
// DEUXIÈME FICHE DU DOMAINE DE LA LECTURE EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3 — elle ne suit PAS le cycle 4.
// Compétence « Comprendre et interpréter un texte » (BO6EFRL).
//
// ⛔ PIÈGE DE CLASSE : `lecture_comprehension` existe en 4e, en 5e et en 3e. Ce
// n'est PAS la même notion. La 5e relie ce qu'on comprend à ce qui le montre ;
// la 6e apprend d'abord qu'il y a DEUX SORTES DE RÉPONSES, et que la seconde ne
// se devine pas.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : TROIS ENDROITS OÙ CHERCHER UNE RÉPONSE, ET
// LE TROISIÈME EST UN PIÈGE.
//   1. LA RÉPONSE EST ÉCRITE — « Où dort le chat ? » : au creux du fauteuil. On
//      la relève, on ne réfléchit pas.
//   2. LA RÉPONSE N'EST PAS ÉCRITE, MAIS L'INDICE L'EST — « Qu'a eu Malo ? » :
//      il cache sa copie, il a les joues rouges. On conclut de deux indices.
//   3. NI L'UNE NI L'AUTRE : on répond par ce qu'on croit savoir du monde. Et
//      c'est faux, même quand c'est vrai dans la vie.
//
// ⭐ LE TROISIÈME CAS N'EST PAS UNE INVENTION DE FICHE : la banque le pose en
// LEURRE explicite — « sur ce que tu penses des chiens » figure parmi les quatre
// propositions de `6e_fr_fixed_comp_5`. C'est la faute la plus fréquente du
// cycle 3, et personne ne la nomme. La fiche la nomme : UNE RÉPONSE PEUT ÊTRE
// VRAIE DANS LA VIE ET FAUSSE DANS LE TEXTE.
//
// ⭐ DEUX ARCS QUI CONVERGENT DESSINENT UNE INFÉRENCE, et c'est exactement la
// bonne forme : deux indices, une conclusion. Le même dessin sert au sens global
// (« la pluie » et « le froid » convergent sur « elle continue » = la
// persévérance) et à l'implicite (« il cache sa copie » et « joues rouges »
// convergent sur « mauvaise note »). Une seule figure pour deux micros.
//
// ⭐ ET L'ARC DE JUSTIFICATION VA EN SENS INVERSE : de la conclusion vers le
// passage qui la prouve. C'est le geste que la 4e et la 5e appellent citer, et
// il commence ici — sauf qu'en 6e on ne demande pas d'écrire la citation, on
// demande de METTRE LE DOIGT DESSUS.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette de cette fiche n'est une FONCTION
// grammaticale — toutes restent grises. Mots écartés parce que
// `couleurFonction` les attrape : « le sujet » (on dit « ce dont on parle »),
// « le nom », « la proposition ».
//
// Alignée sur le pool LECTURE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les six items `6e_fr_fixed_comp_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `comprehension_textes`) :
// - 6e_comp_sens_global → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_comp_genre       → propriété 3, méthode 2, usage 2, exemple 2
// - 6e_comp_implicite   → figure, propriétés 4 et 5, formule, méthode 3, usage 3,
//                         exemples 3 et 4
// - 6e_comp_justifier   → propriétés 6 et 7, méthode 4, usage 4, exemple 5
// - 6e_comp_defi        → propriété 8, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
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

/** Les marques d'un genre. ⚠️ Cellules courtes : à la largeur d'un bloc, vingt
 *  signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on cherche une réponse ───────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : deux indices convergent, et la conclusion nait.
const deuxIndicesUneConclusion = phrase({
  mots: [
    { texte: "il cache sa copie", focus: true },
    { texte: "joues rouges", focus: true },
    { texte: "mauvaise note" },
  ],
  liens: [
    { de: 0, vers: 2, label: "montre", type: "question" },
    { de: 1, vers: 2, label: "aussi", type: "question" },
  ],
  legende: "La réponse n'est pas écrite. Les deux indices, eux, le sont.",
});

const reponseEcrite = phrase({
  mots: [
    { texte: "Où dort le chat ?" },
    { texte: "dans le fauteuil", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "c'est écrit", type: "question" }],
  legende: "Ici on ne réfléchit pas : on relève la réponse, elle est dans le texte.",
});

// ⭐ LE TROISIÈME CAS, ET C'EST LE PIÈGE : répondre par ce qu'on croit savoir.
const vraiDansLaVieFauxDansLeTexte = phrase({
  mots: [
    { texte: "ce que je crois", barre: true },
    { texte: "ce que le texte dit", focus: true },
  ],
  legende: "Une réponse peut être vraie dans la vie et fausse dans le texte.",
});

// ── LE SENS GLOBAL : les détails convergent, ils ne s'additionnent pas.
const sensGlobal = phrase({
  mots: [
    { texte: "la pluie" },
    { texte: "le froid" },
    { texte: "elle continue", focus: true },
  ],
  liens: [
    { de: 0, vers: 2, label: "malgré", type: "question" },
    { de: 1, vers: 2, label: "malgré", type: "question" },
  ],
  legende: "Le sens global n'est pas la liste des détails : c'est ce qu'ils font ensemble.",
});

const impressionDuLieu = phrase({
  mots: [
    { texte: "abandonné", focus: true },
    { texte: "silencieuse", focus: true },
    { texte: "veillait encore" },
  ],
  legende: "Trois mots, et une impression de solitude que rien n'a nommée.",
});

// ── LE GENRE : ce qu'on voit avant de lire.
const grilleGenres = grille({
  headers: ["Ce qu'on voit", "Le genre"],
  rows: [
    { values: ["des vers", "la poésie"] },
    { values: ["des tirets", "le théâtre"] },
    { values: ["un loup qui parle", "le conte"] },
    { values: ["une source", "le documentaire"] },
  ],
  caption: "Le genre se voit avant qu'on ait lu une phrase.",
});

const grilleGenresPoesie = grille({
  headers: ["Ce qu'on voit", "Le genre"],
  rows: [
    { values: ["des vers", "la poésie"] },
    { values: ["des tirets", "le théâtre"] },
    { values: ["un loup qui parle", "le conte"] },
    { values: ["une source", "le documentaire"] },
  ],
  highlight: { row: 0 },
  caption: "Des vers, des strophes, des rimes : c'est de la poésie.",
});

// ── JUSTIFIER : l'arc va de la conclusion vers le passage.
const justifier = phrase({
  mots: [
    { texte: "le chien a peur" },
    { texte: "« la queue basse »", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "prouvé par", type: "question" }],
  legende: "Justifier, c'est mettre le doigt sur le passage — pas raconter ce qu'on sait.",
});

const justifierFroid = phrase({
  mots: [
    { texte: "il fait froid" },
    { texte: "« serra son manteau »", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "prouvé par", type: "question" }],
  legende: "Le mot « froid » n'est pas dans le texte. Le geste qu'il impose, si.",
});

// ── LE DÉFI : deux gestes contraires, et l'émotion entre les deux.
const defiRelireEtDechirer = phrase({
  mots: [
    { texte: "relue trois fois", focus: true },
    { texte: "déchirée", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Relire trois fois dit l'importance ; déchirer dit le rejet. Rien n'est écrit.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionTextes6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "comprehension-textes",
  titre: "Comprendre et interpréter un texte en 6e (2026-2027)",
  accroche:
    "Il y a deux sortes de réponses. Celles qui sont ÉCRITES — tu les relèves. Et celles qui ne le sont pas — tu les déduis, mais jamais au hasard : les INDICES, eux, sont toujours écrits. « Malo cacha vite sa copie, les joues rouges » ne dit nulle part qu'il a eu une mauvaise note, et pourtant tu le sais. Ce que tu n'as pas le droit de faire, c'est de répondre par ce que tu crois savoir du monde.",
  identite: [
    { label: "Mots clés", valeur: "Sens global, genre, implicite, indice" },
    { label: "Le secret", valeur: "La réponse peut manquer, jamais l'indice" },
    { label: "Outil", valeur: "Sur quel mot du texte je m'appuie ?" },
  ],
  definition: {
    texte:
      "Comprendre un texte, c'est savoir OÙ chercher la réponse, et il n'y a que trois endroits possibles. Premier cas : LA RÉPONSE EST ÉCRITE — « Où dort le chat ? » « au creux du fauteuil ». On la relève, il n'y a rien à réfléchir. Deuxième cas : LA RÉPONSE N'EST PAS ÉCRITE, MAIS LES INDICES LE SONT — c'est l'IMPLICITE, et c'est le cœur du programme de 6e. « Léo n'avait rien mangé depuis le matin. Son ventre gargouillait » ne dit jamais qu'il a faim. Troisième cas, et c'est une faute : on répond par ce qu'on croit savoir du monde, sans s'appuyer sur rien. Une réponse peut être parfaitement vraie dans la vie et fausse dans le texte. Comprendre, c'est aussi dégager le SENS GLOBAL — ce que les détails font ENSEMBLE, et non leur liste —, RATTACHER LE TEXTE À UN GENRE d'après ce qu'on voit avant même de lire, et JUSTIFIER : mettre le doigt sur le passage exact qui porte la réponse.",
  },
  figure: {
    schema: pile(deuxIndicesUneConclusion, reponseEcrite),
    legende:
      "En haut, une INFÉRENCE : deux flèches partent de deux indices écrits — « il cache sa copie », « les joues rouges » — et tombent sur une conclusion que le texte n'écrit nulle part. C'est la lecture que la 6e apprend, et elle n'a rien d'un devinette : les deux départs sont dans le texte, et on peut les montrer du doigt. En bas, le cas simple : la question porte sur une information écrite, et l'on n'a qu'à la relever. Savoir dans lequel des deux on se trouve est déjà la moitié du travail.",
  },
  proprietes: [
    {
      titre: "Le sens global n'est pas la liste des détails",
      texte:
        "« Malgré la pluie et le froid, Sofia continua sa course. » Le texte parle de persévérance — pas de météo, même si la météo y est.",
      schema: sensGlobal,
      micros: ["6e_comp_sens_global"],
    },
    {
      titre: "Une impression se dégage sans être nommée",
      texte:
        "« Le vieux phare, abandonné depuis des années, veillait encore sur la baie silencieuse. » Personne n'écrit « solitude », et elle est là.",
      schema: impressionDuLieu,
      micros: ["6e_comp_sens_global"],
    },
    {
      titre: "Le genre se voit avant qu'on ait lu",
      texte:
        "Des vers et des rimes : la poésie. Des tirets et des noms en tête de ligne : le théâtre. Un loup qui parle : le conte.",
      schema: grilleGenres,
      micros: ["6e_comp_genre"],
    },
    {
      titre: "La réponse n'est pas toujours écrite",
      texte:
        "« Léo n'avait rien mangé depuis le matin. Son ventre gargouillait. » Le mot « faim » n'est nulle part, et pourtant c'est la réponse.",
      schema: deuxIndicesUneConclusion,
      micros: ["6e_comp_implicite"],
    },
    {
      titre: "Mais l'indice, lui, est toujours écrit",
      texte:
        "C'est ce qui sépare une inférence d'une invention. Tu dois pouvoir poser le doigt sur les mots d'où tu es parti.",
      schema: justifierFroid,
      micros: ["6e_comp_implicite"],
    },
    {
      titre: "Justifier, c'est montrer, pas raconter",
      texte:
        "« Le chien a peur : je le vois à “la queue basse”. » Et non : « les chiens ont peur quand ils grognent ». Le texte, rien que le texte.",
      schema: justifier,
      micros: ["6e_comp_justifier"],
    },
    {
      titre: "Vrai dans la vie, faux dans le texte",
      texte:
        "C'est la faute la plus fréquente, et elle ne ressemble pas à une faute : la phrase est juste, elle ne vient simplement pas du texte.",
      schema: vraiDansLaVieFauxDansLeTexte,
      micros: ["6e_comp_justifier"],
    },
    {
      titre: "Le défi : deux gestes contraires",
      texte:
        "« Elle relut la lettre trois fois, puis la déchira lentement. » Relire dit l'importance, déchirer dit le rejet. Entre les deux, l'émotion.",
      schema: defiRelireEtDechirer,
      micros: ["6e_comp_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais des inférences toute la journée sans les appeler ainsi. Quand quelqu'un répond « ouais, super » d'une voix plate, tu sais qu'il n'est pas content — et personne ne l'a dit. Quand tu vois des valises dans une entrée, tu sais que quelqu'un part. Ce sont exactement les deux indices et la conclusion du dessin. La seule différence à l'école, c'est qu'on te demande de MONTRER d'où tu es parti — et c'est là que ça coince, parce que dans la vie personne ne te le demande jamais. Attention aussi au troisième cas : si tu réponds « il a eu une mauvaise note parce que les profs mettent toujours des mauvaises notes », tu as peut-être raison sur ton collège, et tu as tort sur le texte. Le texte est le seul terrain.",
  },
  historique: {
    texte:
      "L'exercice le plus ancien de lecture implicite n'est pas scolaire : c'est la devinette. Toutes les cultures en ont fabriqué, et toutes reposent sur le même contrat — la réponse n'est jamais écrite, mais tous les indices sont donnés, et il est interdit d'en ajouter de son côté. L'énigme que le Sphinx pose à Œdipe fonctionne ainsi ; les recueils d'énigmes anglo-saxonnes du haut Moyen Âge, où un objet se décrit lui-même sans jamais se nommer, aussi ; les devinettes créoles et malgaches que tu entends peut-être encore chez toi, également. Un enfant qui résout une devinette fait, sans le savoir, l'opération exacte que demande le programme : conclure à partir de ce qui est dit, et de rien d'autre.",
  },
  formule: {
    contexte: "La question qui départage une bonne réponse d'une invention.",
    expression: "sur quel mot du texte je m'appuie ?",
    legende:
      "S'il y a un mot, tu peux le montrer du doigt, et ta réponse tient — même si elle n'est écrite nulle part. S'il n'y en a aucun, tu as répondu avec ce que tu sais du monde, et cela ne compte pas, quand bien même tu aurais raison.",
    schema: justifier,
  },
  methode: [
    {
      titre: "Chercher ce que les détails font ensemble",
      texte:
        "Ne t'arrête pas au premier. La pluie, le froid, et pourtant elle continue : c'est le « pourtant » qui porte le sens du passage.",
      schema: sensGlobal,
      micros: ["6e_comp_sens_global"],
    },
    {
      titre: "Regarder la page avant de lire",
      texte:
        "Des lignes courtes ? de la poésie. Des noms en majuscules suivis de tirets ? du théâtre. Une source et une date ? un documentaire.",
      schema: grilleGenres,
      micros: ["6e_comp_genre"],
    },
    {
      titre: "Se demander si la réponse est écrite",
      texte:
        "Relis la question, puis cherche la réponse mot pour mot dans le texte. Si tu ne la trouves pas, c'est un implicite : passe aux indices.",
      schema: deuxIndicesUneConclusion,
      micros: ["6e_comp_implicite"],
    },
    {
      titre: "Poser le doigt avant de répondre",
      texte:
        "Avant d'écrire, montre le passage. Si ton doigt ne se pose nulle part, ta réponse vient de toi et non du texte.",
      schema: justifier,
      micros: ["6e_comp_justifier"],
    },
  ],
  usages: [
    {
      titre: "Pour répondre à « de quoi parle ce texte ? »",
      detail:
        "Cherche ce que les détails ont en commun. Un texte où il pleut ne parle pas de la pluie s'il raconte quelqu'un qui continue malgré elle.",
      schema: sensGlobal,
      micros: ["6e_comp_sens_global"],
    },
    {
      titre: "Pour savoir comment lire, avant de lire",
      detail:
        "On ne lit pas un poème comme un documentaire : dans l'un on écoute les sons, dans l'autre on cherche une information. Le genre dit quoi faire.",
      schema: grilleGenresPoesie,
      micros: ["6e_comp_genre"],
    },
    {
      titre: "Pour les questions qui commencent par « pourquoi »",
      detail:
        "Elles portent presque toujours sur de l'implicite. La réponse n'est pas écrite ; les deux ou trois indices qui y mènent le sont.",
      schema: deuxIndicesUneConclusion,
      micros: ["6e_comp_implicite"],
    },
    {
      titre: "Pour ne plus perdre de points en justification",
      detail:
        "Cite. Deux mots entre guillemets valent mieux qu'une phrase d'explication qui ne s'appuie sur rien.",
      schema: justifierFroid,
      micros: ["6e_comp_justifier"],
    },
  ],
  exemples: [
    {
      titre: "De quoi parle le passage",
      donnees: "« Malgré la pluie et le froid, Sofia continua sa course jusqu'à la ligne d'arrivée, portée par les encouragements. »",
      schema: sensGlobal,
      question: "De quoi parle surtout ce passage ?",
      solution:
        "DE LA PERSÉVÉRANCE DE SOFIA. La pluie et le froid y sont bien, et ce n'est pas de la météo qu'il s'agit : ce sont deux obstacles, et le passage raconte qu'elle a continué malgré eux. Le sens global est ce que les détails font ENSEMBLE.",
      micros: ["6e_comp_sens_global"],
    },
    {
      titre: "Un genre",
      donnees: "« Un texte écrit en vers, découpé en strophes, avec des rimes. »",
      schema: grilleGenresPoesie,
      question: "À quel genre appartient-il ?",
      solution:
        "À LA POÉSIE. Vers, strophes et rimes sont ses trois marques, et elles se voient de loin, avant qu'on ait lu un seul mot. C'est un raccourci gratuit : il te dit comment lire — en écoutant les sons — avant même de savoir de quoi le texte parle.",
      micros: ["6e_comp_genre"],
    },
    {
      titre: "Une réponse qui n'est pas écrite",
      donnees: "« Quand le professeur rendit les copies, Malo cacha vite la sienne dans son sac, les joues rouges. »",
      schema: deuxIndicesUneConclusion,
      question: "Qu'a probablement eu Malo ?",
      solution:
        "UNE MAUVAISE NOTE. Le texte ne le dit jamais. Mais deux indices y mènent, et tu peux les montrer : il CACHE sa copie, et il a les JOUES ROUGES. C'est cela, une inférence — et remarque le mot « probablement » : l'implicite se conclut, il ne se prouve pas.",
      micros: ["6e_comp_implicite"],
    },
    {
      titre: "Un autre implicite",
      donnees: "« Le vent secouait les volets. Nina serra son manteau et traversa la cour sans courir. »",
      schema: justifierFroid,
      question: "Quel indice montre qu'il fait froid ?",
      solution:
        "NINA SERRE SON MANTEAU. Le mot « froid » n'apparait pas une seule fois. Ce qui apparait, c'est le GESTE que le froid impose — et un geste se montre du doigt. « Les volets sont secoués » dit le vent, pas la température : c'est plus faible.",
      micros: ["6e_comp_implicite"],
    },
    {
      titre: "Sur quoi tu t'appuies",
      donnees: "« Le chien recula, la queue basse, en grognant faiblement. » Le chien a peur.",
      schema: justifier,
      question: "Sur quoi t'appuies-tu ?",
      solution:
        "SUR « RECULA » ET « LA QUEUE BASSE ». Pas sur le mot « chien », qui ne prouve rien ; et surtout pas sur ce que tu penses des chiens en général — cette réponse-là peut être vraie dans la vie, elle ne vient pas du texte, et elle ne compte pas.",
      micros: ["6e_comp_justifier"],
    },
    {
      titre: "Le défi",
      donnees: "« Elle relut la lettre trois fois, puis la déchira lentement. »",
      schema: defiRelireEtDechirer,
      question: "Que ressent le personnage ?",
      solution:
        "UNE ÉMOTION FORTE QU'ELLE FINIT PAR REJETER. Deux gestes contraires, et c'est leur contradiction qui répond : relire trois fois dit que la lettre compte énormément, déchirer dit qu'elle la refuse. Rien n'est écrit — et tout est montrable.",
      micros: ["6e_comp_defi"],
    },
  ],
  pieges: [
    "Prendre un détail pour le sens global : un texte où il pleut ne parle pas forcément de la pluie.",
    "Répondre avec ce qu'on croit savoir du monde : c'est vrai dans la vie, et faux dans le texte.",
    "Croire qu'une réponse non écrite se devine : elle se déduit, et les indices sont écrits.",
    "Justifier en expliquant au lieu de citer : deux mots entre guillemets valent mieux qu'une phrase.",
    "Sauter le genre : il se voit avant la lecture et dit comment lire.",
    "S'arrêter au premier indice quand il y en a deux qui se contredisent : c'est souvent là qu'est la réponse.",
  ],
  aRetenir: [
    "Trois endroits pour une réponse : écrite, déduite, ou inventée — et la troisième est fausse.",
    "L'implicite se déduit d'indices qui, eux, sont toujours écrits.",
    "Le sens global est ce que les détails font ensemble, pas leur liste.",
    "Le genre se voit avant qu'on ait lu une phrase.",
    "Justifier, c'est poser le doigt sur le passage — pas raconter ce qu'on sait.",
  ],
  entrainement: [
    {
      question: "« Le vieux phare, abandonné depuis des années, veillait encore sur la baie silencieuse. » Quelle impression ?",
      correction: "Une impression de solitude et de calme.",
      micros: ["6e_comp_sens_global"],
    },
    {
      question: "« Le rideau se lève. Deux personnages entrent et parlent chacun leur tour. » Quel genre ?",
      correction: "Un extrait de théâtre.",
      micros: ["6e_comp_genre"],
    },
    {
      question: "« Léo n'avait rien mangé depuis le matin. Son ventre gargouillait. » Que ressent Léo ?",
      correction: "Il a faim — et deux indices le montrent, sans que le mot y soit.",
      micros: ["6e_comp_implicite"],
    },
    {
      question: "« Sur la branche, l'oiseau lissait ses plumes. Soudain, un bruit le fit s'envoler. » Pourquoi s'envole-t-il ?",
      correction: "À cause d'un bruit soudain : la cause est écrite, il suffit de la relever.",
      micros: ["6e_comp_implicite"],
    },
    {
      question: "« La petite fille sourit en découvrant le cadeau. » Sur quoi t'appuies-tu pour dire qu'elle est joyeuse ?",
      correction: "Sur « sourit » : le geste est écrit, le sentiment non.",
      micros: ["6e_comp_justifier"],
    },
    {
      question: "« Il posa son cartable, regarda la table vide, et ressortit sans un mot. » Que comprends-tu ?",
      correction: "Qu'il attendait quelqu'un ou quelque chose qui n'est pas là — la table vide et le silence le montrent.",
      micros: ["6e_comp_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesComprehensionTextes6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un texte - 6e",
    section: {
      type: "objectif",
      phrase: "La réponse peut manquer. L'indice, jamais.",
      sousPhrase:
        "Certaines réponses sont écrites : on les relève. D'autres ne le sont pas : on les déduit.",
      encadre: {
        titre: "L'idée",
        texte: "« Il cache sa copie, les joues rouges » — et tu sais tout, sans que rien soit dit.",
      },
    },
  },
  {
    titre: "Trois endroits, et un piège",
    badge: "Comprendre un texte - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LA RÉPONSE EST ÉCRITE : tu la relèves, il n'y a rien à réfléchir.",
        "ELLE N'EST PAS ÉCRITE, mais les INDICES le sont : tu la déduis.",
        "TU RÉPONDS PAR CE QUE TU CROIS SAVOIR : c'est faux.",
        "Une réponse peut être vraie dans la vie et fausse dans le texte.",
      ],
    },
    schema: vraiDansLaVieFauxDansLeTexte,
  },
  {
    titre: "Le sens global",
    badge: "Comprendre un texte - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "La liste des détails. « Il pleut, il fait froid, elle court. »",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Ce qu'ils font ensemble : elle continue MALGRÉ eux. La persévérance.",
      },
    },
    schema: sensGlobal,
  },
  {
    titre: "Le genre se voit avant la lecture",
    badge: "Comprendre un texte - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La poésie", texte: "Des vers, des strophes, des rimes." },
        { titre: "Le théâtre", texte: "Des noms en tête de ligne, des tirets." },
        { titre: "Le conte", texte: "Un loup qui parle, une formule d'ouverture." },
        { titre: "Le documentaire", texte: "Une source, une date, des sous-titres." },
      ],
    },
    schema: grilleGenres,
  },
  {
    titre: "Justifier, c'est montrer",
    badge: "Comprendre un texte - 6e",
    section: {
      type: "etapes",
      etapes: [
        "« Le chien a peur » — sur quoi t'appuies-tu ?",
        "SUR « recula » ET « la queue basse » : deux mots, montrables.",
        "PAS sur le mot « chien », qui ne prouve rien.",
        "Et surtout pas sur ce que tu penses des chiens en général.",
      ],
    },
    schema: justifier,
  },
  {
    titre: "À vous",
    badge: "Comprendre un texte - 6e",
    section: {
      type: "exercice",
      enonce: "« Elle relut la lettre trois fois, puis la déchira lentement. »",
      question: "Que ressent le personnage, et sur quoi t'appuies-tu ?",
      indice: "Deux gestes, et ils vont dans deux sens contraires.",
      correction:
        "UNE ÉMOTION FORTE QU'ELLE FINIT PAR REJETER. « Relut trois fois » dit que la lettre compte ; « déchira » dit qu'elle la refuse. Rien n'est écrit, et les deux indices se montrent du doigt.",
    },
    schema: defiRelireEtDechirer,
  },
];
