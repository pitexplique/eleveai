// ─── Fiche de cours : lire des images, la presse et des documents (4e) ────────
// LA ONZIÈME FICHE DE FRANÇAIS DE LA 4e, ET LA SEULE QUI SOIT PROPRE À CETTE
// CLASSE : la 5e n'a pas cette notion, la 3e l'aborde par l'argumentation.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. « Lire des textes non littéraires,
// des images et des documents composites (y compris numériques) » y est une
// COMPÉTENCE TRAVAILLÉE ENTIÈRE, au même rang qu'« élaborer une interprétation
// de textes littéraires ». Elle n'existait nulle part en 4e avant le 13/08.
//
// ⭐ ELLE SERT LE QUESTIONNEMENT « INFORMER, S'INFORMER, DÉFORMER ? », et c'est
// la seule fiche du site qui enseigne l'éducation aux médias comme un objet de
// français — parce que le programme la range là, et nulle part ailleurs.
//
// ⭐⭐ COMMENT ON DESSINE UNE IMAGE QU'ON N'A PAS. C'était la difficulté de
// cette fiche : on ne peut ni reproduire une photographie de presse (droits,
// poids, et surtout inutilité — ce qui s'apprend est une MÉTHODE, pas un
// document), ni se contenter de la décrire en mots. Trois canvas de maths
// répondent, et chacun pour une raison précise :
//
//   • `figure_libre` — une grille de cases, donc UN CADRE et ce qui l'occupe.
//     Le même sujet occupe neuf cases sur neuf en gros plan, une sur neuf en
//     plan large : le cadrage devient une proportion, et il se voit. C'est le
//     canvas des aires détourné en canvas du cadre.
//   • `stat_graph` — pour montrer ce qu'un graphique EST, et surtout ce qu'il
//     peut faire dire. Deux séries identiques, deux impressions différentes.
//   • `phrase` — pour tout ce qui reste du texte : la source, le fait et l'avis.
//
// ⛔ AUCUN DOCUMENT RÉEL N'EST REPRODUIT, ni aucun média nommé. Un élève doit
// pouvoir répondre sans avoir le document sous les yeux, parce que ce qui
// s'interroge est la méthode de lecture — même règle que dans la banque.
//
// Alignée sur les tables NATURES, SOURCES, IMAGE et DESSIN de
// lib/tutor-v4/questionBank/4e/francais/documents-composites.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_documents`) :
// - 4e_lect_documents_types → figure, propriétés 1 et 2, méthode 1, exemple 1
// - 4e_lect_sources_croiser → propriétés 3 et 4, formule, méthodes 2 et 3,
//                             exemples 2 et 3
// - 4e_lect_image_fixe      → propriétés 5 et 6, méthode 4, exemples 4 et 5
// - 4e_lect_dessin_presse   → propriété 7, méthode 5, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION, tous payés le 26/08 : pas de `titre` sur
// un dessin ; pas de markdown dans un texte ; pas de champ `infinitif` sur un
// canvas détourné ; la frise ne tient pas dans un bloc de fiche ; un canvas de
// maths se règle en largeur ; et LE RENDU SE REGARDE.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  FigureLibreCanvasGridCell,
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

/** ⭐ LE CADRE. `figure_libre` dessine une grille et remplit des cases : c'est
 *  le canvas des aires composées, et c'est ici celui du CADRAGE. La grille est
 *  l'image, les cases pleines sont le sujet. Le rapport des deux EST le plan. */
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
          display: { showGrid: true, showFilled: true, showPerimeter: true },
          size: { width: 190, height: 150 },
        }}
      />
      {opts.legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">
          {opts.legende}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Un graphique, pour montrer ce qu'il fait dire. */
function graphique(opts: {
  data: { label: string; value: number }[];
  legende?: string;
}) {
  return (
    <figure className="grid gap-2">
      <CanvasRenderer
        figure={{
          kind: "stat_graph",
          graphType: "batons",
          data: opts.data,
          display: { showValues: true, showLabels: true },
          size: { width: 200, height: 130 },
        }}
      />
      {opts.legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">
          {opts.legende}
        </figcaption>
      ) : null}
    </figure>
  );
}

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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Le cadre, et ce qu'on décide d'y mettre ──────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : le même sujet, deux plans. Neuf cases sur neuf,
//    puis une sur neuf. Le cadrage n'est pas un mot de vocabulaire : c'est une
//    proportion, et elle se compte.
const plansGrosPlan = cadre({
  rows: 3,
  cols: 3,
  sujet: [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 0], [2, 1], [2, 2],
  ],
  legende:
    "GROS PLAN : le sujet remplit tout le cadre. Plus de décor — l'émotion s'impose, et le contexte a disparu.",
});

const plansPlanLarge = cadre({
  rows: 3,
  cols: 3,
  sujet: [[2, 1]],
  legende:
    "PLAN LARGE : le même sujet, une case sur neuf. Il est écrasé par ce qui l'entoure, et le décor raconte à sa place.",
});

const plansDecentre = cadre({
  rows: 3,
  cols: 3,
  sujet: [[1, 2], [2, 2]],
  legende:
    "CADRAGE DÉCENTRÉ : le sujet est poussé au bord, et le vide devant lui fait attendre quelque chose.",
});

// ── LE GRAPHIQUE : deux façons de montrer les mêmes chiffres.
const graphiqueHonnete = graphique({
  data: [
    { label: "2023", value: 100 },
    { label: "2024", value: 103 },
    { label: "2025", value: 106 },
  ],
  legende:
    "Trois années, de 100 à 106. L'axe part de zéro : la hausse se voit pour ce qu'elle est, faible.",
});

const graphiqueTronque = graphique({
  data: [
    { label: "2023", value: 1 },
    { label: "2024", value: 4 },
    { label: "2025", value: 7 },
  ],
  legende:
    "Les MÊMES chiffres, l'axe démarrant à 99. La courbe explose, et rien n'est faux. C'est le graphique tronqué.",
});

// ── LA SOURCE, LE FAIT ET L'AVIS.
const sourceAbsente = phrase({
  mots: [
    { texte: "Selon", focus: true },
    { texte: "une" },
    { texte: "étude", focus: true },
    { texte: "," },
    { texte: "un" },
    { texte: "jeune" },
    { texte: "sur" },
    { texte: "deux" },
    { texte: "y" },
    { texte: "renonce" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "source floue" }],
  legende: "« Selon une étude » : laquelle ? sans nom, la formule ne vaut rien.",
});

const faitEtAvis = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pont" },
    { texte: "a" },
    { texte: "rouvert" },
    { texte: "lundi", focus: true },
    { texte: "," },
    { texte: "beaucoup" },
    { texte: "trop" },
    { texte: "tard", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "fait" },
    { mots: [6, 8], label: "avis" },
  ],
  legende: "Le fait se vérifie, l'avis se discute. Une phrase peut porter les deux.",
});

const sourceRepetee = phrase({
  mots: [
    { texte: "Trois" },
    { texte: "journaux" },
    { texte: "le" },
    { texte: "disent" },
    { texte: "," },
    { texte: "d'après" },
    { texte: "le" },
    { texte: "même", focus: true },
    { texte: "communiqué", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [5, 8], label: "une seule source" }],
  legende: "Répéter n'est pas confirmer : c'est une source, entendue trois fois.",
});

// ── LE DESSIN DE PRESSE : ce qui n'est pas réaliste porte l'opinion.
const dessinExageration = cadre({
  rows: 3,
  cols: 3,
  sujet: [
    [0, 0], [0, 1], [0, 2],
    [1, 0], [1, 1], [1, 2],
    [2, 1],
  ],
  legende:
    "Un personnage dessiné en géant au-dessus de minuscules silhouettes : la taille n'est pas réaliste, et c'est là qu'est l'avis.",
});

const dessinContraste = cadre({
  rows: 2,
  cols: 4,
  sujet: [[0, 0], [0, 1], [1, 0], [1, 1]],
  legende:
    "Deux moitiés, l'une pleine, l'autre vide : le contraste fait apparaitre l'injustice sans qu'un mot soit écrit.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureDocuments4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "lecture-documents",
  titre: "Lire des images, la presse et des documents en 4e (2026-2027)",
  accroche:
    "Une photographie ne montre jamais ce qui s'est passé : elle montre ce que quelqu'un a décidé de garder dans le cadre. Le même homme, cadré de près, occupe toute l'image et impose son visage ; cadré de loin, il devient un point dans une foule. Rien n'a été truqué, et pourtant les deux images ne disent pas la même chose.",
  identite: [
    { label: "Mots clés", valeur: "Nature, source, cadrage, plan, angle, dessin de presse" },
    { label: "Le secret", valeur: "Chercher ce qui a été laissé dehors" },
    { label: "Outil", valeur: "Qui produit ? quand ? avec quel intérêt ?" },
  ],
  definition: {
    texte:
      "Un document n'est pas un morceau de réel : c'est un objet fabriqué par quelqu'un, dans un but. Sa NATURE dit déjà comment le lire — un graphique montre une évolution, un tableau croise deux séries, un schéma explique un fonctionnement, un article informe sur un fait daté, un dessin de presse donne un avis. Sa SOURCE dit qui parle, quand, et avec quel intérêt : sans elle, une information n'est qu'une affirmation. Une IMAGE, enfin, choisit — le plan décide de la distance, l'angle décide du rapport de force, la lumière décide de ce qu'on regarde, et le cadre décide surtout de ce qu'on ne verra jamais. Lire un document, ce n'est donc pas seulement comprendre ce qu'il dit : c'est voir ce qu'il a fallu écarter pour qu'il le dise.",
  },
  figure: {
    schema: pile(plansGrosPlan, plansPlanLarge),
    legende:
      "Le même sujet, deux cadrages. En haut il occupe neuf cases sur neuf : c'est un gros plan, le décor a disparu et il ne reste que lui. En bas, une case sur neuf : c'est un plan large, et c'est maintenant ce qui l'entoure qui raconte. Le cadrage n'est pas un mot de vocabulaire — c'est une proportion, et elle se compte.",
  },
  proprietes: [
    {
      titre: "La nature du document dit comment le lire",
      texte:
        "Graphique, tableau, schéma, article, texte documentaire, dessin de presse, photographie : sept natures, sept façons de lire. Un même sujet peut être traité par les sept.",
      schema: graphiqueHonnete,
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "Un graphique peut être exact et trompeur",
      texte:
        "Les mêmes chiffres, un axe qui ne part pas de zéro, et une hausse de six pour cent devient une flambée. Rien n'est faux — et l'impression est fausse.",
      schema: pile(graphiqueHonnete, graphiqueTronque),
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "Sans source, ce n'est pas une information",
      texte:
        "« Selon une étude » ne vaut rien tant qu'on ne sait pas laquelle. Trois questions à tout document : qui l'a produit, quand, et avec quel intérêt.",
      schema: sourceAbsente,
      micros: ["4e_lect_sources_croiser"],
    },
    {
      titre: "Répéter n'est pas confirmer",
      texte:
        "Trois journaux qui reprennent le même communiqué font UNE source, entendue trois fois. Croiser, c'est chercher des sources indépendantes.",
      schema: pile(sourceRepetee, faitEtAvis),
      micros: ["4e_lect_sources_croiser"],
    },
    {
      titre: "Le plan décide de la distance",
      texte:
        "Gros plan : le sujet remplit le cadre, l'émotion s'impose, le contexte disparait. Plan large : il devient minuscule, et le décor parle à sa place.",
      schema: pile(plansGrosPlan, plansPlanLarge),
      micros: ["4e_lect_image_fixe"],
    },
    {
      titre: "L'angle décide du rapport de force",
      texte:
        "Vu d'en bas — en contre-plongée — le sujet grandit et domine. Vu d'en haut — en plongée — il est écrasé. Et le vide laissé devant lui fait attendre.",
      schema: plansDecentre,
      micros: ["4e_lect_image_fixe"],
    },
    {
      titre: "Dans un dessin de presse, cherche ce qui n'est pas réaliste",
      texte:
        "Une taille impossible, un objet symbolique, deux moitiés opposées, une légende qui retourne la scène : c'est toujours là qu'est l'opinion.",
      schema: pile(dessinExageration, dessinContraste),
      micros: ["4e_lect_dessin_presse"],
    },
  ],
  reel: {
    texte:
      "Le recadrage est devenu l'outil le plus courant de la désinformation, et il ne demande aucun logiciel : il suffit de couper. Une photo de manifestation cadrée serré sur trois personnes qui crient donne une émeute ; la même photo cadrée large montre une rue calme avec trois personnes qui crient. Aucune retouche, aucun mensonge dans l'image — et deux informations contraires. C'est pour cela que la question à se poser devant une photographie n'est pas « est-elle vraie ? » mais « qu'y avait-il juste à côté ? ». La même question vaut pour une citation coupée, un extrait vidéo, un chiffre sorti de son tableau.",
  },
  historique: {
    texte:
      "Les images de presse ont été retouchées bien avant l'informatique. En 1937, une photographie officielle soviétique montre Staline marchant au bord d'un canal avec Nikolaï Iejov, chef de sa police ; après la disgrâce de celui-ci, la même photographie est republiée sans lui — il a été effacé, et l'eau du canal a été redessinée à sa place. On connait des dizaines de cas semblables, dans tous les régimes. Ce qui a changé depuis n'est donc pas la possibilité de truquer : c'est le nombre de gens qui peuvent le faire, et la vitesse à laquelle une image circule. La méthode de vérification, elle, n'a pas changé d'un pouce : d'où vient l'image, qui l'a diffusée, et existe-t-elle ailleurs ?",
  },
  formule: {
    contexte: "Les trois questions à poser à n'importe quel document, dans cet ordre.",
    expression: "qui l'a produit ? quand ? avec quel intérêt ?",
    legende:
      "Aucune des trois ne porte sur le contenu, et c'est voulu : un document peut être entièrement exact et complètement orienté. Une entreprise qui publie une étude sur son propre produit ne ment pas forcément — mais elle n'est pas neutre, et cela se sait avant même de lire.",
    schema: sourceAbsente,
  },
  methode: [
    {
      titre: "Nommer la nature avant de lire",
      texte:
        "Ne regarde pas le sujet, regarde la forme et le but. À quelle question ce document répond-il ? Une évolution, un croisement, un fonctionnement, un fait, un avis ?",
      schema: graphiqueHonnete,
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "Vérifier l'axe d'un graphique",
      texte:
        "Part-il de zéro ? Y a-t-il une unité ? Sans l'une ou l'autre, la courbe peut dire à peu près n'importe quoi, sans qu'un seul chiffre soit faux.",
      schema: pile(graphiqueHonnete, graphiqueTronque),
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "Séparer le fait de l'avis",
      texte:
        "Souligne ce qui se vérifie — une date, un chiffre, un lieu — et ce qui se discute. Une même phrase peut contenir les deux, collés l'un à l'autre.",
      schema: faitEtAvis,
      micros: ["4e_lect_sources_croiser"],
    },
    {
      titre: "Devant une image : chercher le hors-champ",
      texte:
        "Demande-toi où était celui qui a pris l'image, et ce qu'il a laissé dehors. Ce sont ses deux décisions les plus fortes, et aucune ne se voit.",
      schema: pile(plansGrosPlan, plansPlanLarge),
      micros: ["4e_lect_image_fixe"],
    },
    {
      titre: "Devant un dessin : trouver l'invraisemblance, puis lire la légende",
      texte:
        "Ce qui n'est pas réaliste porte l'opinion. Lis ensuite la phrase écrite dessous : elle confirme, ou elle retourne tout ce que tu croyais voir.",
      schema: dessinExageration,
      micros: ["4e_lect_dessin_presse"],
    },
  ],
  usages: [
    {
      titre: "Avant de partager : trois questions",
      detail:
        "Qui a produit ce document, quand, et avec quel intérêt ? Trente secondes suffisent, et elles arrêtent l'essentiel de ce qui circule à tort.",
      schema: sourceAbsente,
      micros: ["4e_lect_sources_croiser"],
    },
    {
      titre: "Devant un chiffre : chercher le tableau d'où il sort",
      detail:
        "Un chiffre isolé ne se discute pas. Remis dans sa série, il redevient discutable — et c'est ce qu'on veut souvent éviter en l'isolant.",
      schema: graphiqueTronque,
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "Devant une photo : imaginer le plan large",
      detail:
        "Que verrait-on si l'on reculait de trois mètres ? La question suffit à désamorcer la plupart des images de choc.",
      schema: plansPlanLarge,
      micros: ["4e_lect_image_fixe"],
    },
  ],
  exemples: [
    {
      titre: "Quelle nature ?",
      donnees: "« Une courbe montre la population de l'île année après année depuis 1960. »",
      schema: graphiqueHonnete,
      question: "De quelle nature ce document est-il, et que sait-on déjà de sa lecture ?",
      solution:
        "Un GRAPHIQUE : il donne à voir une évolution. On sait donc déjà quoi y chercher — un sens de variation, des ruptures, une pente. Et on sait ce qu'il ne dira pas : pourquoi. Un graphique montre que quelque chose a changé, jamais la cause.",
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "Le graphique qui n'est pas faux",
      donnees: "Deux graphiques des mêmes chiffres : 100, 103, 106.",
      schema: pile(graphiqueHonnete, graphiqueTronque),
      question: "Pourquoi le second impressionne-t-il davantage ?",
      solution:
        "Parce que son axe ne part pas de zéro : il démarre à 99, et les six pour cent de hausse occupent toute la hauteur. Aucun chiffre n'est faux, aucune donnée n'est inventée — c'est l'ÉCHELLE qui ment. Premier réflexe devant un graphique : regarder d'où part l'axe vertical.",
      micros: ["4e_lect_documents_types"],
    },
    {
      titre: "La source qui n'en est pas une",
      donnees: "« Selon une étude, un jeune sur deux y renonce. »",
      schema: sourceAbsente,
      question: "Que manque-t-il pour que ce soit une information ?",
      solution:
        "Le NOM de l'étude, celui de qui l'a menée, et sa date. « Selon une étude » ne désigne rien : c'est une formule qui donne l'apparence de la preuve sans en fournir. Tant que la source n'est pas retrouvée, l'affirmation se traite comme une rumeur.",
      micros: ["4e_lect_sources_croiser"],
    },
    {
      titre: "Trois journaux, combien de sources ?",
      donnees: "« Trois journaux le disent, d'après le même communiqué. »",
      schema: sourceRepetee,
      question: "L'information est-elle confirmée ?",
      solution:
        "Non. C'est UNE source, entendue trois fois. La répétition ne fait pas la confirmation : croiser signifie chercher des sources INDÉPENDANTES, qui ne s'appuient pas les unes sur les autres. C'est le piège le plus courant des réseaux sociaux, où le même contenu revient de partout.",
      micros: ["4e_lect_sources_croiser"],
    },
    {
      titre: "Le même homme, deux images",
      donnees: "Une photographie cadrée serré sur un visage ; la même scène cadrée large.",
      schema: pile(plansGrosPlan, plansPlanLarge),
      question: "Qu'est-ce qui change, et qu'est-ce qui ne change pas ?",
      solution:
        "Rien de la réalité ne change : c'est la même scène, au même instant. Ce qui change est la PROPORTION que le sujet occupe. En gros plan il n'y a que lui, et son émotion s'impose. En plan large il devient un point, et c'est le décor qui raconte. Aucune retouche n'est nécessaire pour dire deux choses opposées.",
      micros: ["4e_lect_image_fixe"],
    },
    {
      titre: "L'invraisemblance qui parle",
      donnees: "« Un ministre est dessiné en géant, les citoyens en fourmis. »",
      schema: dessinExageration,
      question: "Quel procédé, et que produit-il ?",
      solution:
        "L'EXAGÉRATION d'un trait. Aucune personne n'a cette taille : c'est précisément l'invraisemblance qui porte l'opinion — la disproportion des pouvoirs. Dans un dessin de presse, cherche toujours ce qui serait impossible en photographie : c'est là qu'est l'avis.",
      micros: ["4e_lect_dessin_presse"],
    },
    {
      titre: "Deux moitiés",
      donnees: "« À gauche une table pleine, à droite une assiette vide. »",
      schema: dessinContraste,
      question: "Quel procédé, et pourquoi est-il efficace ?",
      solution:
        "Le CONTRASTE. Le dessinateur n'écrit pas « c'est injuste » : il pose deux images côte à côte et laisse le lecteur conclure. C'est plus fort qu'une affirmation, parce que le lecteur a l'impression d'avoir jugé tout seul — et l'on défend mieux une idée qu'on croit avoir trouvée.",
      micros: ["4e_lect_dessin_presse"],
    },
  ],
  pieges: [
    "Croire qu'une photographie prouve quelque chose : elle prouve seulement ce qui était dans le cadre.",
    "Lire un graphique sans regarder d'où part l'axe vertical : une hausse de six pour cent peut occuper toute la hauteur.",
    "Prendre la répétition pour une confirmation : trois reprises du même communiqué font une seule source.",
    "Accepter « selon une étude » comme une source : sans nom ni date, la formule ne vaut rien.",
    "Confondre le fait et l'avis dans une même phrase : le premier se vérifie, le second se discute.",
    "Chercher le sens d'un dessin de presse dans ce qu'il représente : il est dans ce qui n'est pas réaliste.",
  ],
  aRetenir: [
    "Un document est fabriqué par quelqu'un, dans un but. Sa nature dit déjà comment le lire.",
    "Trois questions, toujours : qui l'a produit, quand, et avec quel intérêt ?",
    "Un graphique peut être exact et trompeur : regarde d'où part l'axe.",
    "Répéter n'est pas confirmer. Croiser, c'est chercher des sources indépendantes.",
    "Le cadre décide surtout de ce qu'on ne verra pas : cherche le hors-champ.",
    "Dans un dessin de presse, l'opinion est dans ce qui n'est pas réaliste.",
  ],
  entrainement: [
    {
      question: "« Des flèches et des légendes expliquent comment se forme un cyclone. » Quelle nature ?",
      correction: "Un schéma : il explique un fonctionnement. Il ne raconte pas et ne date rien.",
      micros: ["4e_lect_documents_types"],
    },
    {
      question: "« Un graphique n'indique pas l'unité de son axe vertical. » Que peut-on en conclure ?",
      correction: "Rien : sans unité, la courbe peut dire n'importe quoi. Il ne prouve pas.",
      micros: ["4e_lect_documents_types"],
    },
    {
      question: "« Un texte est publié par l'entreprise dont il parle. » Comment le lire ?",
      correction: "Il peut être exact, mais il n'est pas neutre : celui qui parle a un intérêt.",
      micros: ["4e_lect_sources_croiser"],
    },
    {
      question: "« On voit la barque comme un point sur toute la surface de la mer. » Quel plan ?",
      correction: "Un plan large : le sujet est écrasé par ce qui l'entoure, et c'est la mer qui raconte.",
      micros: ["4e_lect_image_fixe"],
    },
    {
      question: "« L'appareil regarde le personnage d'en bas. » Quel effet ?",
      correction: "Une contre-plongée : elle grandit le sujet et le rend imposant.",
      micros: ["4e_lect_image_fixe"],
    },
    {
      question: "« Une phrase sous le dessin change complètement ce qu'on croyait voir. » Quel procédé ?",
      correction: "La légende : elle donne au dessin son sens, et parfois le retourne entièrement.",
      micros: ["4e_lect_dessin_presse"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesLectureDocuments4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire des documents - 4e",
    section: {
      type: "objectif",
      phrase: "Voir ce qu'un document a écarté pour dire ce qu'il dit",
      sousPhrase:
        "Sa nature, sa source, son cadre. Aucune des trois ne se lit dans le contenu — et toutes les trois décident de ce qu'on comprend.",
      encadre: {
        titre: "L'idée",
        texte: "Une photo ne montre pas ce qui s'est passé : elle montre ce que quelqu'un a gardé dans le cadre.",
      },
    },
  },
  {
    titre: "Le même sujet, deux cadrages",
    badge: "Lire des documents - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Gros plan",
        contenu: "Le sujet remplit le cadre. L'émotion s'impose, le contexte a disparu.",
      },
      droite: {
        titre: "Plan large",
        contenu: "Le même sujet, minuscule. C'est le décor qui raconte à sa place.",
      },
    },
    schema: pile(plansGrosPlan, plansPlanLarge),
  },
  {
    titre: "Le graphique qui n'est pas faux",
    badge: "Lire des documents - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "Axe à partir de zéro",
        contenu: "100, 103, 106 : la hausse se voit pour ce qu'elle est. Faible.",
      },
      droite: {
        titre: "Axe à partir de 99",
        contenu: "Les MÊMES chiffres. La courbe explose. Aucun chiffre n'est faux.",
      },
    },
    schema: pile(graphiqueHonnete, graphiqueTronque),
  },
  {
    titre: "Trois questions, jamais sur le contenu",
    badge: "Lire des documents - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Qui l'a produit ?",
        "Quand ?",
        "Avec quel intérêt ?",
        "Puis seulement : qu'est-ce qu'il dit ?",
      ],
    },
    schema: sourceAbsente,
  },
  {
    titre: "Répéter n'est pas confirmer",
    badge: "Lire des documents - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Trois journaux", texte: "…qui reprennent le même communiqué. Cela fait UNE source." },
        { titre: "Croiser", texte: "Chercher des sources qui ne s'appuient pas les unes sur les autres." },
        { titre: "Le fait et l'avis", texte: "Le premier se vérifie, le second se discute. Une phrase porte souvent les deux." },
      ],
    },
    schema: pile(sourceRepetee, faitEtAvis),
  },
  {
    titre: "À vous",
    badge: "Lire des documents - 4e",
    section: {
      type: "exercice",
      enonce: "Une photo de manifestation cadrée serré sur trois personnes qui crient.",
      question: "Que faut-il se demander avant d'en tirer une conclusion ?",
      indice: "La question n'est pas « est-elle vraie ? ».",
      correction:
        "« Qu'y avait-il juste à côté ? » Cadrée large, la même photo peut montrer une rue calme avec trois personnes qui crient. Aucune retouche, deux informations contraires.",
    },
    schema: pile(plansGrosPlan, plansPlanLarge),
  },
];
