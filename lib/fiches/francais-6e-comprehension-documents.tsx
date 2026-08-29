// ─── Fiche de cours : lire des documents et des images (6e) ───────────────────
// QUATRIÈME FICHE DU DOMAINE DE LA LECTURE EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3 — elle ne suit PAS le cycle 4.
// Objectifs : « identifier la nature et la source des documents », « repérer ce
// qui les rapproche et ce qui les différencie », « prendre appui sur les
// éléments essentiels d'une image fixe » (BO6EFRL).
//
// ⛔ PIÈGE DE FICHE VOISINE : `francais-4e-lecture-documents.tsx` existe, et ce
// n'est PAS la même chose. La 4e sert le questionnement « Informer, s'informer,
// déformer ? » du cycle 4 — le fait et l'avis, le graphique qui fait mentir des
// chiffres exacts, l'éducation aux médias. La 6e, cycle 3, fait les trois gestes
// FONDATEURS : d'où ça vient, décrire avant d'interpréter, croiser deux
// documents. Ne pas transposer.
//
// ⭐⭐ LA DÉCOUVERTE QUI RÉUNIT LES QUATRE MICROS : LE CADRE D'UNE IMAGE ET LA
// SOURCE D'UN TEXTE SONT LA MÊME QUESTION. Dans les deux cas, QUELQU'UN A DÉCIDÉ
// DE CE QUE TU VOIS. Ce qui est hors du cadre d'une photo a été écarté par le
// photographe ; ce qu'un article ne dit pas a été écarté par celui qui l'a
// écrit. Un document n'est jamais le monde : c'est ce que quelqu'un a RETENU du
// monde. Un élève de 6e qui a compris cela une fois ne lit plus rien pareil, et
// cela ne demande aucune méfiance — seulement une question.
//
// ⭐ LA RÈGLE D'ORDRE, ET LA BANQUE L'ÉCRIT DEUX FOIS : DÉCRIRE D'ABORD,
// INTERPRÉTER ENSUITE — JAMAIS L'INVERSE. « On ne peut pas interpréter ce qu'on
// n'a pas regardé. » C'est le même geste que la justification en compréhension
// de texte : on montre du doigt avant de conclure. ⭐ Et son corollaire, qui
// surprend les élèves : DEUX PERSONNES PEUVENT INTERPRÉTER LA MÊME IMAGE
// AUTREMENT, si chacune s'appuie sur ce qu'elle voit. Interpréter n'est pas
// inventer, et ce n'est pas non plus deviner LA réponse.
//
// ⭐ ET LA CONTRADICTION EST UNE INFORMATION, PAS UN OBSTACLE. Quand deux
// documents se contredisent, on ne choisit pas celui qui arrange : on regarde
// leurs sources et leurs dates. C'est la ligne la plus utile de tout le pool.
//
// ⭐ `figure_libre` SERT DE CADRE PHOTOGRAPHIQUE — emploi inventé pour la 4e et
// repris ici pour une raison différente. En 4e, la grille montrait le CADRAGE
// comme une proportion (9 cases sur 9 en gros plan, 1 sur 9 en plan large). Ici
// elle montre le HORS-CHAMP : les cases vides ne sont pas du vide, ce sont les
// choses que quelqu'un a laissées dehors.
//
// ⛔ AUCUN DOCUMENT RÉEL N'EST REPRODUIT, aucun média nommé : ce qui s'apprend
// est une méthode, et l'élève doit pouvoir répondre sans avoir le document.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Et la bande `nature` est CENTRÉE SUR SON MOT : elle ne se
// plie pas à la largeur de la boite, donc chaque mot doit être au moins aussi
// large que son étiquette (mesuré le 29/08 sur la fiche des reprises).
//
// Alignée sur les pools DOCUMENTS et IMAGE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_doc_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `comprehension_documents`) :
// - 6e_comp_documents          → figure, propriétés 1 à 3, formule, méthode 1,
//                                usage 1, exemples 1 et 2
// - 6e_comp_image              → propriétés 4 à 7, méthodes 2 et 3, usage 2,
//                                exemples 3 et 4
// - 6e_comp_documents_comparer → propriétés 8 et 9, méthode 4, usage 3, exemple 5
// - 6e_comp_documents_defi     → propriété 10, usage 4, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  FigureLibreCanvasGridCell,
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

/** ⭐ LE CADRE. `figure_libre` dessine une grille et remplit des cases : c'est
 *  donc un cadre, et ce qui l'occupe. Les cases vides ne sont pas du vide —
 *  ce sont les choses restées hors du cadre. */
function cadre(opts: {
  rows: number;
  cols: number;
  sujet: FigureLibreCanvasGridCell[];
  legende?: string;
}) {
  return (
    <figure className="grid gap-2">
      <CanvasRenderer
        figure={{
          kind: "figure_libre",
          grid: { rows: opts.rows, cols: opts.cols, filledCells: opts.sujet },
          display: { showGrid: true, showFilled: true, showPerimeter: false },
          size: { width: 190, height: 150 },
        }}
      />
      {opts.legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">{opts.legende}</figcaption>
      ) : null}
    </figure>
  );
}

/** Ce qu'on fait de deux documents. ⚠️ Cellules courtes : à la largeur d'un
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

// ─── Ce qui se dessine quand quelqu'un a choisi pour toi ──────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le cadre, et ce qui est resté dehors.
const cadreGrosPlan = cadre({
  rows: 3,
  cols: 3,
  sujet: [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ],
  legende: "GROS PLAN : le sujet occupe tout. On ne saura jamais ce qu'il y avait autour.",
});

const cadrePlanLarge = cadre({
  rows: 3,
  cols: 3,
  sujet: [[1, 1]],
  legende: "PLAN LARGE : le même sujet, huit cases de contexte — et un autre sens.",
});

// ── LA SOURCE : d'où ça vient, et pourquoi la question passe en premier.
const natureEtSource = phrase({
  mots: [
    { texte: "un article daté", focus: true },
    { texte: "signé, publié", focus: true },
  ],
  legende: "La nature dit CE QUE c'est ; la source dit D'OÙ ça vient.",
});

const sansSource = phrase({
  mots: [
    { texte: "sans source", barre: true },
    { texte: "pas une information", focus: true },
  ],
  legende: "Ce n'est pas de la méfiance : c'est la première question, toujours la même.",
});

const documentComposite = phrase({
  mots: [
    { texte: "du texte" },
    { texte: "une image" },
    { texte: "un tableau" },
  ],
  legende: "Un document composite mêle des natures différentes sur une même page.",
});

// ── L'IMAGE : décrire d'abord, interpréter ensuite.
const decrireAvantInterpreter = phrase({
  mots: [
    { texte: "décrire", focus: true },
    { texte: "interpréter", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "On ne peut pas interpréter ce qu'on n'a pas regardé. Jamais l'inverse.",
});

const plongee = phrase({
  mots: [
    { texte: "vu d'en haut", focus: true },
    { texte: "petit, dominé" },
  ],
  liens: [{ de: 0, vers: 1, label: "fait paraitre", type: "question" }],
  legende: "L'angle raconte, autant que ce qui est photographié.",
});

const deuxLectures = phrase({
  mots: [
    { texte: "une image" },
    { texte: "deux lectures", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "permet", type: "question" }],
  legende: "Les deux sont justes si chacune montre du doigt ce sur quoi elle s'appuie.",
});

// ── CROISER : ce qu'on fait de deux documents.
const grilleCroiser = grille({
  headers: ["Deux documents", "Ce qu'on fait"],
  rows: [
    { values: ["convergents", "on confirme"] },
    { values: ["divergents", "on compare"] },
    { values: ["opposés", "on va aux sources"] },
    { values: ["incomplets", "on croise"] },
  ],
  caption: "Quatre cas, et aucun ne consiste à choisir celui qui arrange.",
});

const grilleCroiserOpposes = grille({
  headers: ["Deux documents", "Ce qu'on fait"],
  rows: [
    { values: ["convergents", "on confirme"] },
    { values: ["divergents", "on compare"] },
    { values: ["opposés", "on va aux sources"] },
    { values: ["incomplets", "on croise"] },
  ],
  highlight: { row: 2 },
  caption: "La contradiction est une information, pas un obstacle.",
});

// ⭐ CROISER, DESSINÉ : deux documents tombent sur une réponse qu'aucun ne donne.
const croiserDeuxDocuments = phrase({
  mots: [
    { texte: "le texte" },
    { texte: "le tableau" },
    { texte: "la réponse", focus: true },
  ],
  liens: [
    { de: 0, vers: 2, label: "apporte", type: "question" },
    { de: 1, vers: 2, label: "apporte", type: "question" },
  ],
  legende: "Croiser, c'est répondre à une question qu'aucun des deux ne résout seul.",
});

const prelever = phrase({
  mots: [
    { texte: "la question", focus: true },
    { texte: "le document" },
  ],
  liens: [{ de: 0, vers: 1, label: "on part de", type: "question" }],
  legende: "Prélever, c'est partir de la question — jamais lire le document en entier.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionDocuments6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "comprehension-documents",
  titre: "Lire des documents et des images en 6e (2026-2027)",
  accroche:
    "Le cadre d'une photo et la source d'un article posent la même question : QUELQU'UN A DÉCIDÉ DE CE QUE TU VOIS. Ce qui est hors du cadre a été écarté par le photographe ; ce qu'un article ne dit pas a été écarté par celui qui l'a écrit. Un document n'est jamais le monde — c'est ce que quelqu'un en a retenu. Ce n'est pas une raison de se méfier : c'est une question à poser en premier.",
  identite: [
    { label: "Mots clés", valeur: "Nature, source, cadrage, croiser" },
    { label: "Le secret", valeur: "Quelqu'un a décidé de ce que tu vois" },
    { label: "Outil", valeur: "D'où ça vient ? et qu'est-ce qui est resté dehors ?" },
  ],
  definition: {
    texte:
      "Lire un document, c'est d'abord répondre à deux questions avant même de le lire. SA NATURE : qu'est-ce que c'est — un article de presse, une page d'encyclopédie, une affiche, une notice, un tableau de chiffres ? SA SOURCE : d'où vient-il — quel auteur, quelle publication, quelle date ? Une information sans source n'est pas une information. Un document COMPOSITE mêle plusieurs natures sur la même page : du texte, une image, un schéma, un tableau. Pour une IMAGE FIXE — photo, tableau, dessin, affiche —, la règle d'ordre est absolue : ON DÉCRIT D'ABORD, ON INTERPRÈTE ENSUITE. Décrire, c'est dire qui, quoi, où, et comment c'est cadré ; le CADRAGE est le choix de ce qu'on montre et de ce qu'on laisse dehors, et l'ANGLE raconte lui aussi — vue d'en haut, un sujet parait petit ou dominé. Enfin, on CROISE deux documents : voir ce qu'ils partagent et ce sur quoi ils divergent, et combiner leurs informations pour répondre à une question qu'aucun ne résout seul. Quand ils se contredisent, on regarde leurs sources et leurs dates.",
  },
  figure: {
    schema: pile(cadreGrosPlan, cadrePlanLarge),
    legende:
      "Deux fois le même sujet, deux images entièrement différentes. En haut, il occupe les neuf cases : on ne saura jamais ce qu'il y avait autour de lui. En bas, il n'en occupe qu'une, et les huit autres racontent où il se trouve. Les cases vides ne sont pas du vide — ce sont les choses que quelqu'un a décidé de garder, ou de laisser dehors. Le cadre est un choix, et c'est exactement ce qu'est aussi la source d'un texte : quelqu'un a retenu une partie du monde et t'a donné celle-là.",
  },
  proprietes: [
    {
      titre: "La nature et la source, avant tout le reste",
      texte:
        "La nature dit CE QUE c'est. La source dit D'OÙ ça vient : auteur, publication, date. Deux questions, et elles passent en premier.",
      schema: natureEtSource,
      micros: ["6e_comp_documents"],
    },
    {
      titre: "Une information sans source n'est pas une information",
      texte:
        "Ce n'est pas de la méfiance. C'est simplement qu'on ne peut rien faire d'une phrase dont on ignore qui la dit et quand.",
      schema: sansSource,
      micros: ["6e_comp_documents"],
    },
    {
      titre: "Un document composite mêle plusieurs natures",
      texte:
        "Du texte, une image, un tableau, un schéma sur la même page. Chacun s'y lit à sa façon, et le sens vient de leur assemblage.",
      schema: documentComposite,
      micros: ["6e_comp_documents"],
    },
    {
      titre: "Le cadrage est un choix",
      texte:
        "Ce qui est hors du cadre a été écarté par quelqu'un. Une image n'est jamais neutre, et c'est le premier réflexe à prendre.",
      schema: cadreGrosPlan,
      micros: ["6e_comp_image"],
    },
    {
      titre: "Le même sujet, deux cadrages, deux sens",
      texte:
        "En gros plan on voit un visage ; en plan large on voit où il se tient, et ce n'est plus la même histoire.",
      schema: cadrePlanLarge,
      micros: ["6e_comp_image"],
    },
    {
      titre: "Décrire d'abord, interpréter ensuite",
      texte:
        "Qui, quoi, où, comment c'est cadré — puis seulement ce que cela suggère. On ne peut pas interpréter ce qu'on n'a pas regardé.",
      schema: decrireAvantInterpreter,
      micros: ["6e_comp_image"],
    },
    {
      titre: "Deux personnes peuvent lire la même image autrement",
      texte:
        "Et les deux ont raison, si chacune s'appuie sur ce qu'elle voit. Interpréter n'est pas inventer : il faut pouvoir montrer du doigt.",
      schema: pile(deuxLectures, plongee),
      micros: ["6e_comp_image"],
    },
    {
      titre: "Comparer, ce n'est pas départager",
      texte:
        "On repère ce qui les rapproche et ce sur quoi ils divergent. Il ne s'agit pas de désigner celui des deux qui dit la vérité.",
      schema: grilleCroiser,
      micros: ["6e_comp_documents_comparer"],
    },
    {
      titre: "La contradiction est une information",
      texte:
        "Quand deux documents s'opposent, on regarde leurs sources et leurs dates. On ne choisit pas celui qui confirme ce qu'on pensait déjà.",
      schema: grilleCroiserOpposes,
      micros: ["6e_comp_documents_comparer"],
    },
    {
      titre: "Croiser, c'est répondre à ce qu'aucun ne dit",
      texte:
        "Le texte donne une partie, le tableau une autre, et la réponse nait de leur rencontre. C'est le geste le plus difficile de la notion.",
      schema: croiserDeuxDocuments,
      micros: ["6e_comp_documents_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais déjà le procès du cadre tous les jours. Quand tu vois une photo où quelqu'un a l'air seul sur une plage et que tu te dis « il y avait sûrement du monde à côté », tu penses au hors-champ. Quand une vidéo commence juste au moment où quelqu'un s'énerve, tu demandes « et avant, il s'est passé quoi ? » — tu réclames le plan large. C'est exactement le geste que demande le programme, et tu l'as déjà. Ce qui change à l'école, c'est qu'on te demande de le faire aussi sur du texte : « d'où ça vient ? », « c'est de quand ? », « qui l'a écrit ? ». Ces trois questions sur un texte valent le « et avant, il s'est passé quoi ? » d'une vidéo. Et non, cela ne veut pas dire que tout est faux : cela veut dire que tout a été choisi par quelqu'un.",
  },
  historique: {
    texte:
      "Le plan du métro de Londres, dessiné par Harry Beck en 1933, est géographiquement FAUX : les distances n'y sont pas respectées, les courbes sont redressées en lignes droites, et le centre est agrandi par rapport à la banlieue. Beck avait compris qu'un voyageur ne cherche pas où sont les stations dans la ville, mais dans quel ordre elles se suivent et où l'on change de ligne. En jetant la géographie, il a rendu le plan lisible — et tous les réseaux du monde ont copié son idée. C'est le meilleur exemple de ce que la fiche répète : un document n'est pas le monde, c'est ce que quelqu'un en a retenu pour un usage. Et un document peut être faux dans un sens et parfaitement juste dans l'autre.",
  },
  formule: {
    contexte: "Les deux questions à poser à n'importe quel document, dans cet ordre.",
    expression: "d'où ça vient, et qu'est-ce qui est resté dehors ?",
    legende:
      "La première a une réponse écrite quelque part — auteur, date, publication. La seconde n'en a pas, et c'est justement pourquoi il faut se la poser : ce qu'un document ne montre pas ne se voit pas, et il faut donc y penser exprès.",
    schema: sansSource,
  },
  methode: [
    {
      titre: "Lire l'entour du document avant le document",
      texte:
        "Le titre, l'auteur, la date, le nom de la publication. Trente secondes, et tu sais déjà comment lire ce qui suit.",
      schema: natureEtSource,
      micros: ["6e_comp_documents"],
    },
    {
      titre: "Décrire une image en quatre points",
      texte:
        "Qui ou quoi. Où. Ce qui est au premier plan et ce qui est au fond. Comment c'est cadré. Ensuite seulement, ce que cela suggère.",
      schema: decrireAvantInterpreter,
      micros: ["6e_comp_image"],
    },
    {
      titre: "Se demander ce qui a été laissé dehors",
      texte:
        "Aucune image ne montre le hors-champ, par définition. C'est donc une question à se poser exprès, sinon elle ne vient jamais.",
      schema: cadrePlanLarge,
      micros: ["6e_comp_image"],
    },
    {
      titre: "Partir de la question, pas du document",
      texte:
        "Prélever une information, c'est aller la chercher en sachant ce qu'on cherche. Lire tout le document d'abord fait perdre le fil.",
      schema: prelever,
      micros: ["6e_comp_documents_comparer"],
    },
  ],
  usages: [
    {
      titre: "Pour savoir si l'on peut se fier à ce qu'on lit",
      detail:
        "Cherche la source. Si tu ne la trouves pas, ce n'est pas que le document est faux : c'est qu'on ne peut rien en dire, ce qui est pire.",
      schema: sansSource,
      micros: ["6e_comp_documents"],
    },
    {
      titre: "Pour parler d'une image sans dire n'importe quoi",
      detail:
        "Décris d'abord. Une phrase de description avant chaque phrase d'interprétation, et ton commentaire tient debout tout seul.",
      schema: decrireAvantInterpreter,
      micros: ["6e_comp_image"],
    },
    {
      titre: "Pour un exposé avec plusieurs sources",
      detail:
        "Deux documents qui vont dans le même sens valent mieux qu'un seul. Deux qui s'opposent valent encore mieux : dis-le, c'est un résultat.",
      schema: grilleCroiserOpposes,
      micros: ["6e_comp_documents_comparer"],
    },
    {
      titre: "Pour répondre à une question qui traverse plusieurs documents",
      detail:
        "Note ce que chacun apporte, séparément, puis regarde ce que leur rencontre permet de dire. C'est là qu'est la réponse.",
      schema: croiserDeuxDocuments,
      micros: ["6e_comp_documents_defi"],
    },
  ],
  exemples: [
    {
      titre: "Reconnaitre un document",
      donnees: "« Un texte daté, signé d'un journaliste et publié dans un quotidien. »",
      schema: natureEtSource,
      question: "Quelle est sa nature ?",
      solution:
        "UN ARTICLE DE PRESSE. Trois indices, et aucun n'est dans le contenu : la date, la signature, le journal. C'est ce qu'on appelle l'entour du document — on le lit avant le texte, et il dit déjà comment lire ce qui suit.",
      micros: ["6e_comp_documents"],
    },
    {
      titre: "À quoi sert une source",
      donnees: "« Pourquoi vérifier la source d'un document ? »",
      schema: sansSource,
      question: "Pour quelle raison ?",
      solution:
        "POUR SAVOIR QUI PARLE, ET SI L'ON PEUT S'Y FIER. Pas pour bien citer, pas pour le ranger : pour savoir de qui vient ce qu'on lit. Une information sans source n'est pas une information — on ne peut ni la croire ni la refuser, on ne peut rien en faire.",
      micros: ["6e_comp_documents"],
    },
    {
      titre: "Un cadrage",
      donnees: "« Le cadrage d'une photographie, c'est… »",
      schema: cadreGrosPlan,
      question: "Comment le définir ?",
      solution:
        "LE CHOIX DE CE QU'ON MONTRE ET DE CE QU'ON LAISSE DEHORS. Ce n'est pas le format du tirage, ni la distance au sujet : c'est une décision. Quelqu'un a tenu l'appareil et a tracé une limite — tout ce qui est hors du cadre a été écarté par lui.",
      micros: ["6e_comp_image"],
    },
    {
      titre: "Avant d'interpréter",
      donnees: "« Avant d'interpréter une image, il faut d'abord… »",
      schema: decrireAvantInterpreter,
      question: "Faire quoi ?",
      solution:
        "LA DÉCRIRE : qui, quoi, où, et comment c'est cadré. Chercher son auteur ou se demander ce qu'elle veut faire penser vient APRÈS. On ne peut pas interpréter ce qu'on n'a pas regardé — et la plupart des contresens viennent de là, pas d'un manque d'idées.",
      micros: ["6e_comp_image"],
    },
    {
      titre: "Deux documents opposés",
      donnees: "« Que faire quand deux documents se contredisent ? »",
      schema: grilleCroiserOpposes,
      question: "Que fais-tu ?",
      solution:
        "REGARDER LEURS SOURCES ET LEURS DATES AVANT DE TRANCHER. Pas choisir celui qui donne le plus de chiffres, ni celui qui confirme ce qu'on pensait déjà. La contradiction est une information : elle t'apprend que le sujet n'est pas réglé, et cela se dit.",
      micros: ["6e_comp_documents_comparer"],
    },
    {
      titre: "Croiser",
      donnees: "« Croiser deux documents, c'est… »",
      schema: croiserDeuxDocuments,
      question: "Comment le définir ?",
      solution:
        "COMBINER LEURS INFORMATIONS POUR RÉPONDRE À UNE QUESTION QU'AUCUN NE RÉSOUT SEUL. Ce n'est ni les lire l'un après l'autre, ni garder le plus clair : c'est faire naitre une réponse de leur rencontre. Le tableau donne un chiffre, le texte dit ce qu'il signifie.",
      micros: ["6e_comp_documents_defi"],
    },
  ],
  pieges: [
    "Lire un document sans regarder d'où il vient : la source se lit avant le contenu.",
    "Croire qu'une image montre le monde : elle montre ce que quelqu'un a mis dans le cadre.",
    "Interpréter avant d'avoir décrit : la plupart des contresens viennent de là.",
    "Croire qu'une image n'a qu'une seule lecture : deux sont possibles si chacune s'appuie sur ce qu'on voit.",
    "Vouloir départager deux documents qui divergent : on les compare, on ne les juge pas.",
    "Choisir le document qui confirme ce qu'on pensait déjà : c'est le contraire du travail demandé.",
    "Lire un document en entier avant de savoir ce qu'on y cherche : on part de la question.",
  ],
  aRetenir: [
    "La nature dit ce que c'est ; la source dit d'où ça vient. Les deux d'abord.",
    "Le cadrage est un choix : ce qui est dehors a été écarté par quelqu'un.",
    "Décrire d'abord, interpréter ensuite — jamais l'inverse.",
    "La contradiction entre deux documents est une information, pas un obstacle.",
    "Croiser, c'est répondre à une question qu'aucun des deux ne résout seul.",
  ],
  entrainement: [
    {
      question: "« Qu'est-ce qu'un document composite ? »",
      correction: "Un document qui mêle texte, image, tableau ou schéma.",
      micros: ["6e_comp_documents"],
    },
    {
      question: "« À quoi sert la légende d'une image ? »",
      correction: "À dire ce que l'image montre et d'où elle vient.",
      micros: ["6e_comp_documents"],
    },
    {
      question: "« Le premier plan d'une image, c'est… »",
      correction: "Ce qui est le plus près de celui qui regarde.",
      micros: ["6e_comp_image"],
    },
    {
      question: "« Une prise de vue en plongée, vue d'en haut, donne souvent… »",
      correction: "L'impression que le sujet est petit ou dominé.",
      micros: ["6e_comp_image"],
    },
    {
      question: "« Deux documents convergents, ce sont… »",
      correction: "Deux documents qui vont dans le même sens.",
      micros: ["6e_comp_documents_comparer"],
    },
    {
      question: "« Un tableau de chiffres se lit… » comment ?",
      correction: "En repérant d'abord ce que disent ses lignes et ses colonnes.",
      micros: ["6e_comp_documents_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesComprehensionDocuments6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Documents et images - 6e",
    section: {
      type: "objectif",
      phrase: "Quelqu'un a décidé de ce que tu vois",
      sousPhrase:
        "Le cadre d'une photo et la source d'un article posent la même question.",
      encadre: {
        titre: "L'idée",
        texte: "Un document n'est pas le monde : c'est ce que quelqu'un en a retenu.",
      },
    },
  },
  {
    titre: "Deux questions avant de lire",
    badge: "Documents et images - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "La nature",
        contenu: "Qu'est-ce que c'est ? Un article, une affiche, une notice, un tableau.",
      },
      droite: {
        titre: "La source",
        contenu: "D'où ça vient ? Auteur, publication, date. Sans elle, rien n'est utilisable.",
      },
    },
    schema: natureEtSource,
  },
  {
    titre: "Le cadre, et le hors-champ",
    badge: "Documents et images - 6e",
    section: {
      type: "etapes",
      etapes: [
        "GROS PLAN : le sujet occupe tout, et le reste a disparu.",
        "PLAN LARGE : le même sujet, mais on voit où il se tient.",
        "Les cases vides ne sont pas du vide : c'est ce qu'on a laissé dehors.",
        "Aucune image ne montre son hors-champ — il faut y penser exprès.",
      ],
    },
    schema: cadrePlanLarge,
  },
  {
    titre: "Décrire d'abord, interpréter ensuite",
    badge: "Documents et images - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Qui, quoi", texte: "Ce qu'on voit, nommé simplement." },
        { titre: "Où", texte: "Le premier plan, le fond." },
        { titre: "Le cadrage", texte: "Gros plan ou plan large ? vu d'en haut ou d'en bas ?" },
        { titre: "Alors seulement", texte: "Ce que cela suggère — en montrant du doigt." },
      ],
    },
    schema: decrireAvantInterpreter,
  },
  {
    titre: "Deux documents",
    badge: "Documents et images - 6e",
    section: {
      type: "etapes",
      etapes: [
        "CONVERGENTS : ils vont dans le même sens, et se confirment.",
        "DIVERGENTS : on repère ce qui les sépare — on ne les départage pas.",
        "OPPOSÉS : on regarde leurs sources et leurs dates.",
        "INCOMPLETS : on les CROISE, et la réponse nait de leur rencontre.",
      ],
    },
    schema: grilleCroiser,
  },
  {
    titre: "À vous",
    badge: "Documents et images - 6e",
    section: {
      type: "exercice",
      enonce: "Une photo montre une personne seule au milieu d'une place vide.",
      question: "Que peux-tu dire, et que ne peux-tu pas dire ?",
      indice: "Sépare ce que tu vois de ce que tu conclus.",
      correction:
        "TU PEUX DIRE : une personne, une place, aucun autre passant dans le cadre. TU NE PEUX PAS DIRE qu'elle est seule — tu ignores ce qu'il y a hors du cadre, et le photographe, lui, l'a choisi.",
    },
    schema: cadreGrosPlan,
  },
];
