// ─── Fiche de cours : le sens des mots (CM2) ──────────────────────────────────
// QUATORZIÈME FICHE DU CHANTIER CM2, et PREMIÈRE DU DOMAINE DE LA LANGUE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « SE SERVIR DU
// CONTEXTE et de la morphologie pour comprendre les mots inconnus » ·
// « APPROFONDIR SA COMPRÉHENSION DE LA NOTION DE POLYSÉMIE DANS UN CONTEXTE NON
// RÉFÉRENTIEL » · « Utiliser des dictionnaires ».
//
// ⛔⛔ LE CM2 ET LA 6e NE DÉCOUPENT PAS LE VOCABULAIRE AUX MÊMES ENDROITS, et
// c'est vérifié micro par micro — la 6e a `vocabulaire_enrichir`,
// `vocabulaire_relations` et `vocabulaire_emploi` ; le CM2 a `vocabulaire_sens`,
// `vocabulaire_formation` et `vocabulaire_emploi`. Deux micros CHANGENT DE CAMP :
//
//   | Micro | 6e | CM2 (ici) |
//   |---|---|---|
//   | polysémie | dans l'EMPLOI : « EMPLOYER un mot polysémique dans le bon contexte » | dans le SENS : « DISTINGUER plusieurs sens d'un mot » |
//   | synonyme / antonyme | dans les RELATIONS : « donner un synonyme DE LA MÊME CLASSE » | dans le SENS : « CHOISIR un mot selon une NUANCE » |
//   | sens figuré | dans `vocabulaire_enrichir` | ici, et c'est le cœur |
//
// ⭐ LA PROGRESSION EST DONC RÉELLE ET DANS CE SENS-LÀ : le CM2 apprend à
// RECONNAITRE les sens d'un mot ; la 6e apprendra à S'EN SERVIR. Reconnaitre
// d'abord, employer ensuite.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES CINQ MICROS, ET QUI EST LA MÊME VUE DE QUATRE
// CÔTÉS : UN MOT N'A PAS SON SENS TOUT SEUL — C'EST LA PHRASE QUI LE LUI DONNE.
//   · un mot INCONNU → la phrase le devine pour toi (contexte) ;
//   · un mot à PLUSIEURS SENS → la phrase choisit lequel (polysémie) ;
//   · un mot ORDINAIRE → la phrase peut lui faire dire autre chose (figuré) ;
//   · DEUX MOTS PROCHES → la phrase décide lequel convient (nuance).
// Ce n'est pas une jolie formule : c'est ce qui explique pourquoi ces cinq
// micros sont dans une seule notion, et pourquoi le BO parle de polysémie « DANS
// UN CONTEXTE NON RÉFÉRENTIEL » — c'est-à-dire là où le mot ne désigne plus rien
// de réel, donc au sens figuré.
//
// ⭐⭐ ET LE TEST, QUI SUIT LA SIGNATURE DU CM2 (une mesure visible, sans juger de
// rien) : FAIS LE DESSIN DE CE QUE DISENT LES MOTS. SI LE DESSIN EST FAUX, C'EST
// DU FIGURÉ. « Il a le cœur sur la main » — cherche la main : il n'y en a pas.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools VOC_CONTEXTE, VOC_POLYSEMIE, SENS_FIGURE et VOC_SYN_ANT
// de lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `vocabulaire_sens`) :
// - cm2_voc_contexte     → figure, propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - cm2_voc_polysemie    → propriétés 3 et 4, méthode 2, usage 2, exemples 2 et 3
// - cm2_voc_sens_figure  → propriétés 5 à 7, formule, méthode 3, usage 3,
//                          exemples 4 et 5
// - cm2_voc_nuance       → propriétés 8 et 9, méthode 4, usage 4
// - cm2_voc_sens_defi    → propriété 10, exemple 6

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

/** Les quatre façons dont la phrase donne le sens. ⚠️ Cellules courtes : à la
 *  largeur d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on cherche le sens d'un mot ──────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : une seule découverte, quatre angles.
const grilleQuatreAngles = grille({
  headers: ["Le mot est…", "La phrase…"],
  rows: [
    { values: ["inconnu", "le devine"] },
    { values: ["à deux sens", "choisit"] },
    { values: ["ordinaire", "le déplace"] },
    { values: ["presque égal", "décide"] },
  ],
  caption: "Quatre micros, une seule découverte vue de quatre côtés.",
});

const laPhraseDonneLeSens = phrase({
  mots: [
    { texte: "un mot" },
    { texte: "la phrase", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "lui donne son sens", type: "question" }],
  legende: "Un mot n'a pas son sens tout seul : c'est la phrase qui le lui donne.",
});

// ── LE CONTEXTE.
const contexteDevine = phrase({
  mots: [
    { texte: "aride" },
    { texte: "sans eau", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "explique", type: "question" }],
  legende: "« Le désert est aride, sans une goutte d'eau » : le contexte donne le sens.",
});

const devinerAvantChercher = phrase({
  mots: [
    { texte: "sauter le mot", barre: true },
    { texte: "lire autour", focus: true },
  ],
  legende: "Un mot inconnu n'arrête pas la lecture : ce qui l'entoure le renseigne.",
});

// ── LA POLYSÉMIE.
const glaceDeuxSens = phrase({
  mots: [
    { texte: "une glace" },
    { texte: "deux sens" },
  ],
  legende: "Le dessert ou le miroir : c'est la phrase qui choisit, jamais le mot seul.",
});

const memeMotDeuxSens = phrase({
  mots: [
    { texte: "la souris grise" },
    { texte: "de l'ordinateur" },
  ],
  legende: "Le même mot, deux sens différents — c'est cela, un mot polysémique.",
});

// ── LE SENS FIGURÉ. ⭐⭐ Le test du dessin.
const testDuDessin = phrase({
  mots: [
    { texte: "le dessin est faux" },
    { texte: "c'est du figuré", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "alors", type: "question" }],
  legende: "Dessine ce que disent les mots. Si le dessin est faux, c'est du figuré.",
});

const coeurSurLaMain = phrase({
  mots: [
    { texte: "le cœur sur la main" },
    { texte: "très généreux", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "veut dire", type: "question" }],
  legende: "Cherche la main : il n'y en a pas. Le sens figuré ne se dessine pas.",
});

const devorerDeuxFois = phrase({
  mots: [
    { texte: "son repas" },
    { texte: "un roman", focus: true },
  ],
  legende: "« Dévorer » : le même verbe, et le second ne se mange pas.",
});

// ── LA NUANCE.
const contentEtRavi = phrase({
  mots: [
    { texte: "content" },
    { texte: "ravi", focus: true },
  ],
  legende: "Deux synonymes ne sont jamais tout à fait égaux : la phrase décide.",
});

const antonymeEstUneAction = phrase({
  mots: [
    { texte: "monter" },
    { texte: "descendre" },
  ],
  legende: "Un antonyme dit l'action opposée — pas simplement « ne pas monter ».",
});

// ── LE DÉFI.
const devinerPuisVerifier = phrase({
  mots: [
    { texte: "deviner" },
    { texte: "vérifier", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Le défi : deviner par le contexte, puis vérifier qu'on a eu raison.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireSensCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "vocabulaire-sens",
  titre: "Le sens des mots en CM2 (2026-2027)",
  accroche:
    "Cinq choses à apprendre, et c'est en réalité UNE SEULE, vue de quatre côtés : UN MOT N'A PAS SON SENS TOUT SEUL — C'EST LA PHRASE QUI LE LUI DONNE. Un mot inconnu ? la phrase le devine pour toi. Un mot à deux sens ? la phrase choisit. Un mot ordinaire ? la phrase peut lui faire dire tout autre chose. Deux mots presque pareils ? la phrase décide lequel convient.",
  identite: [
    { label: "Mots clés", valeur: "Contexte, polysémie, figuré, nuance" },
    { label: "Le secret", valeur: "C'est la phrase qui donne le sens" },
    { label: "Outil", valeur: "Fais le dessin — est-il faux ?" },
  ],
  definition: {
    texte:
      "LE CONTEXTE, d'abord : devant un mot inconnu, on ne saute pas, ON LIT AUTOUR. « Le désert est aride, sans une goutte d'eau » — « sans une goutte d'eau » dit ce que veut dire ARIDE. LA POLYSÉMIE ensuite : beaucoup de mots ont PLUSIEURS SENS. « Une glace » est un dessert ou un miroir, « une souris » est un animal ou l'objet à côté du clavier ; le mot ne choisit pas, la phrase choisit. LE SENS FIGURÉ, qui est le cœur du CM2 : un mot ordinaire peut être employé pour dire autre chose que ce qu'il désigne. « Elle a DÉVORÉ ce roman » — personne n'a mangé de papier. Le test tient en une phrase : FAIS LE DESSIN DE CE QUE DISENT LES MOTS ; SI LE DESSIN EST FAUX, C'EST DU FIGURÉ. « Il a le cœur sur la main » : cherche la main, il n'y en a pas. LA NUANCE, enfin : deux synonymes ne sont jamais tout à fait égaux — content et ravi disent la même chose, pas avec la même force —, et un antonyme dit l'ACTION OPPOSÉE : le contraire de monter est descendre.",
  },
  figure: {
    schema: pile(grilleQuatreAngles, laPhraseDonneLeSens),
    legende:
      "Regarde la colonne de droite : c'est toujours LA PHRASE qui agit, et le mot qui subit. C'est pour cela que ces cinq micro-compétences sont rangées ensemble alors qu'elles semblent parler de choses différentes — deviner un mot inconnu, reconnaitre deux sens, repérer une image, choisir entre deux synonymes. Une seule chose est apprise ici, et elle change la façon de lire : ne demande jamais « que veut dire ce mot ? » sans ajouter « ICI ». Le dictionnaire donne des sens ; la phrase en choisit un.",
  },
  proprietes: [
    {
      titre: "Un mot inconnu n'arrête pas la lecture",
      texte:
        "On lit ce qu'il y a autour. Le contexte renseigne presque toujours, et cela coute moins de temps que d'ouvrir un dictionnaire.",
      schema: devinerAvantChercher,
      micros: ["cm2_voc_contexte"],
    },
    {
      titre: "Le contexte donne le sens",
      texte:
        "« Le désert est aride, SANS UNE GOUTTE D'EAU. » La suite de la phrase explique le mot : elle est là pour cela.",
      schema: contexteDevine,
      micros: ["cm2_voc_contexte"],
    },
    {
      titre: "Beaucoup de mots ont plusieurs sens",
      texte:
        "Une glace, une feuille, un bras, une souris. Ce n'est pas une bizarrerie : c'est ainsi que la langue s'agrandit sans inventer de mots.",
      schema: glaceDeuxSens,
      micros: ["cm2_voc_polysemie"],
    },
    {
      titre: "Et c'est la phrase qui choisit",
      texte:
        "« La souris grise » et « la souris de l'ordinateur » : le mot est le même, le sens ne l'est pas. Rien dans le mot ne le dit.",
      schema: memeMotDeuxSens,
      micros: ["cm2_voc_polysemie"],
    },
    {
      titre: "Un mot ordinaire peut dire autre chose",
      texte:
        "C'est le SENS FIGURÉ. « Elle a dévoré ce roman » : personne n'a mangé de papier, et pourtant tout le monde comprend.",
      schema: devorerDeuxFois,
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Le test : fais le dessin",
      texte:
        "Dessine ce que disent les mots. Si le dessin est FAUX, c'est du figuré. C'est vérifiable, et cela ne demande aucun avis.",
      schema: testDuDessin,
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Cherche la main : il n'y en a pas",
      texte:
        "« Il a le cœur sur la main » veut dire qu'il est très généreux. Aucun cœur, aucune main — l'expression ne se dessine pas.",
      schema: coeurSurLaMain,
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Deux synonymes ne sont pas égaux",
      texte:
        "Content et ravi disent la même chose, pas avec la même force. Choisir, c'est choisir une NUANCE, pas un mot au hasard dans la liste.",
      schema: contentEtRavi,
      micros: ["cm2_voc_nuance"],
    },
    {
      titre: "Un antonyme dit l'action opposée",
      texte:
        "Le contraire de monter est DESCENDRE — pas « ne pas monter », qui n'est pas une action mais son absence.",
      schema: antonymeEstUneAction,
      micros: ["cm2_voc_nuance"],
    },
    {
      titre: "Le défi : deviner, puis vérifier",
      texte:
        "Deviner par le contexte est rapide et souvent juste. Vérifier ensuite est ce qui transforme une bonne intuition en mot appris.",
      schema: devinerPuisVerifier,
      micros: ["cm2_voc_sens_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais cela sans y penser dès qu'on te parle. Si quelqu'un dit « j'ai cartonné à mon contrôle », tu ne cherches pas de carton : la phrase t'a déjà donné le sens, et tu l'as pris sans t'arrêter. Le blocage arrive seulement à l'écrit, devant un mot rare, parce qu'on croit qu'il faut CONNAITRE le mot pour continuer. C'est faux, et c'est même l'inverse de la façon dont on apprend du vocabulaire : presque tous les mots que tu sais, tu ne les as jamais cherchés — tu les as rencontrés plusieurs fois dans des phrases qui les expliquaient, et un jour ils étaient à toi.",
  },
  historique: {
    texte:
      "La souris de l'ordinateur est un cas qu'on peut dater. Dans les années 1960, en Californie, l'équipe qui met au point un petit boitier à roulettes le surnomme « mouse » : il a un fil derrière lui, comme une queue. C'était une image, une blague d'atelier. Soixante ans plus tard, le mot est dans tous les dictionnaires, en français comme en anglais, et plus personne n'y voit d'animal — la souris de bureau est un sens à part entière, à côté de la souris grise. Autrement dit, un mot polysémique n'est presque jamais né polysémique : quelqu'un a fait une image, elle a plu, et elle est devenue un sens. C'est encore en train d'arriver, avec des mots que tu emploies.",
  },
  formule: {
    contexte: "Le test du sens figuré, et il ne demande aucun avis.",
    expression: "fais le dessin — est-il faux ?",
    legende:
      "Dessine exactement ce que disent les mots. « Il a le cœur sur la main » : un cœur posé sur une paume. Le dessin est faux, donc l'expression est au figuré. « Il a une pomme dans la main » : le dessin est juste, donc c'est du sens propre. Deux secondes, et aucune règle à réciter.",
    schema: testDuDessin,
  },
  methode: [
    {
      titre: "Devant un mot inconnu, lire la fin de la phrase",
      texte:
        "L'explication vient très souvent après, séparée par une virgule. « Aride, sans une goutte d'eau. » Ne t'arrête pas au mot : va voir la suite.",
      schema: contexteDevine,
      micros: ["cm2_voc_contexte"],
    },
    {
      titre: "Se demander « ici, c'est lequel ? »",
      texte:
        "Devant un mot à plusieurs sens, ne cherche pas le sens : cherche CELUI DE CETTE PHRASE. La question est différente, et la réponse aussi.",
      schema: glaceDeuxSens,
      micros: ["cm2_voc_polysemie"],
    },
    {
      titre: "Faire le dessin dans sa tête",
      texte:
        "Deux secondes suffisent. Le dessin est juste : sens propre. Le dessin est absurde : sens figuré. Aucune règle à réciter.",
      schema: testDuDessin,
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Remplacer, pour tester une nuance",
      texte:
        "Mets l'autre synonyme à la place et relis. Si la phrase change de force ou de ton, tu viens de trouver la nuance.",
      schema: contentEtRavi,
      micros: ["cm2_voc_nuance"],
    },
  ],
  usages: [
    {
      titre: "Pour lire un texte au-dessus de son niveau",
      detail:
        "C'est le vrai usage du contexte. Sans lui, un texte avec cinq mots inconnus est illisible ; avec lui, il se comprend.",
      schema: devinerAvantChercher,
      micros: ["cm2_voc_contexte"],
    },
    {
      titre: "Pour ne pas se tromper de sens",
      detail:
        "Un contresens vient presque toujours d'un mot polysémique lu avec son autre sens — celui qu'on connaissait déjà.",
      schema: memeMotDeuxSens,
      micros: ["cm2_voc_polysemie"],
    },
    {
      titre: "Pour comprendre une expression jamais entendue",
      detail:
        "Le test du dessin fonctionne même sur ce qu'on n'a jamais lu : il dit au moins qu'il ne faut pas prendre les mots au pied de la lettre.",
      schema: coeurSurLaMain,
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Pour écrire plus juste",
      detail:
        "Choisir entre content et ravi, entre grand et immense. C'est là que le vocabulaire sert à écrire, et non seulement à lire.",
      schema: contentEtRavi,
      micros: ["cm2_voc_nuance"],
    },
  ],
  exemples: [
    {
      titre: "Un mot inconnu",
      donnees: "« Le désert est aride, sans une goutte d'eau. »",
      schema: contexteDevine,
      question: "Que veut dire « aride » ?",
      solution:
        "TRÈS SEC. Tu n'as pas besoin de connaitre le mot : « sans une goutte d'eau » est là pour l'expliquer. C'est le contexte qui donne le sens, et il est presque toujours dans la même phrase — souvent juste après la virgule.",
      micros: ["cm2_voc_contexte"],
    },
    {
      titre: "Un mot à deux sens",
      donnees: "« La souris de l'ordinateur » et « la souris grise ».",
      schema: memeMotDeuxSens,
      question: "Que peut-on dire du mot « souris » ?",
      solution:
        "IL A DEUX SENS DIFFÉRENTS. C'est un mot POLYSÉMIQUE. Ce n'est ni une faute, ni deux mots qui se ressemblent : c'est un seul mot qui a gagné un sens de plus — et la phrase, à chaque fois, dit lequel on emploie.",
      micros: ["cm2_voc_polysemie"],
    },
    {
      titre: "Choisir le bon sens",
      donnees: "« Quelle phrase utilise le mot glace au sens du dessert ? »",
      schema: glaceDeuxSens,
      question: "Laquelle ?",
      solution:
        "« ELLE MANGE UNE GLACE À LA VANILLE. » Le verbe « mange » et « à la vanille » désignent le dessert. Dans « il se regarde dans la glace », les mêmes cinq lettres désignent un miroir. Le mot ne décide pas : la phrase décide.",
      micros: ["cm2_voc_polysemie"],
    },
    {
      titre: "Une expression",
      donnees: "« Il a le cœur sur la main. »",
      schema: coeurSurLaMain,
      question: "Que veut dire l'expression ?",
      solution:
        "IL EST TRÈS GÉNÉREUX. Fais le dessin : un cœur posé sur une paume. Le dessin est faux — donc les mots ne veulent pas dire ce qu'ils disent. C'est du SENS FIGURÉ, et le test a pris deux secondes.",
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Le même verbe, deux emplois",
      donnees: "« Il a dévoré son repas » / « Elle a dévoré ce roman en deux soirs ».",
      schema: devorerDeuxFois,
      question: "Où « dévorer » est-il au sens figuré ?",
      solution:
        "DANS LA SECONDE. On ne mange pas un livre : le dessin serait absurde. Dans la première, on mange vraiment, et vite — le dessin est juste, c'est le sens propre. Même verbe, deux emplois, et c'est la phrase qui les sépare.",
      micros: ["cm2_voc_sens_figure"],
    },
    {
      titre: "Le défi",
      donnees: "Tu as deviné le sens d'un mot grâce au contexte.",
      schema: devinerPuisVerifier,
      question: "Que te reste-t-il à faire ?",
      solution:
        "VÉRIFIER. Deviner est rapide et souvent juste, mais « souvent » n'est pas « toujours » — et un mot deviné de travers reste faux longtemps. La vérification transforme une intuition en mot appris : c'est elle qui fait grossir ton vocabulaire.",
      micros: ["cm2_voc_sens_defi"],
    },
  ],
  pieges: [
    "S'arrêter à un mot inconnu : ce qui l'entoure le renseigne presque toujours.",
    "Chercher LE sens d'un mot polysémique : il faut celui de CETTE phrase.",
    "Lire un mot avec le sens qu'on connaissait déjà : c'est l'origine des contresens.",
    "Prendre une expression au pied de la lettre — fais le dessin.",
    "Croire que deux synonymes sont interchangeables : ils diffèrent par la force.",
    "Donner « ne pas monter » comme contraire de monter : un antonyme est une action.",
    "Deviner sans jamais vérifier : le mot deviné de travers reste faux longtemps.",
  ],
  aRetenir: [
    "Un mot n'a pas son sens tout seul : c'est la phrase qui le lui donne.",
    "Devant un mot inconnu, on lit autour — l'explication suit souvent la virgule.",
    "Un mot polysémique a plusieurs sens, et la phrase en choisit un.",
    "Sens figuré : fais le dessin. S'il est faux, c'est du figuré.",
    "Deux synonymes diffèrent par la nuance ; un antonyme dit l'action opposée.",
  ],
  entrainement: [
    {
      question: "« Le désert est aride, sans une goutte d'eau. » Que veut dire aride ?",
      correction: "Très sec — le contexte le dit.",
      micros: ["cm2_voc_contexte"],
    },
    {
      question: "« Il dévora son repas en deux minutes. » Que veut dire dévora ?",
      correction: "Mangea très vite.",
      micros: ["cm2_voc_contexte"],
    },
    {
      question: "« La souris de l'ordinateur » et « la souris grise » : le mot souris…",
      correction: "A deux sens différents.",
      micros: ["cm2_voc_polysemie"],
    },
    {
      question: "« Elle a dévoré ce roman en deux soirs. » Sens propre ou figuré ?",
      correction: "Figuré : fais le dessin, on ne mange pas un livre.",
      micros: ["cm2_voc_sens_figure"],
    },
    {
      question: "« Tomber dans les pommes » signifie…",
      correction: "S'évanouir.",
      micros: ["cm2_voc_sens_figure"],
    },
    {
      question: "Quel est le contraire de « monter » ?",
      correction: "Descendre — un antonyme dit l'action opposée.",
      micros: ["cm2_voc_nuance"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesVocabulaireSensCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le sens des mots - CM2",
    section: {
      type: "objectif",
      phrase: "C'est la phrase qui donne le sens",
      sousPhrase:
        "Cinq choses à apprendre, et c'est une seule vue de quatre côtés.",
      encadre: {
        titre: "L'idée",
        texte: "Ne demande jamais « que veut dire ce mot ? » sans ajouter « ICI ».",
      },
    },
  },
  {
    titre: "Les quatre côtés",
    badge: "Le sens des mots - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Mot inconnu", texte: "La phrase le devine pour toi." },
        { titre: "Mot à deux sens", texte: "La phrase choisit lequel." },
        { titre: "Mot ordinaire", texte: "La phrase peut lui faire dire autre chose." },
        { titre: "Deux synonymes", texte: "La phrase décide lequel convient." },
      ],
    },
    schema: grilleQuatreAngles,
  },
  {
    titre: "Le test du dessin",
    badge: "Le sens des mots - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Dessine EXACTEMENT ce que disent les mots.",
        "« Il a une pomme dans la main » : le dessin est juste → sens propre.",
        "« Il a le cœur sur la main » : le dessin est faux → sens figuré.",
        "Deux secondes, et aucune règle à réciter.",
      ],
    },
    schema: testDuDessin,
  },
  {
    titre: "Un mot polysémique",
    badge: "Le sens des mots - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce n'est pas",
        contenu: "Deux mots qui se ressemblent, ni une faute de la langue.",
      },
      droite: {
        titre: "C'est",
        contenu: "Un seul mot qui a gagné un sens de plus. La phrase dit lequel.",
      },
    },
    schema: memeMotDeuxSens,
  },
  {
    titre: "La nuance",
    badge: "Le sens des mots - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Content et ravi disent la même chose — pas avec la même force.",
        "Pour tester : remplace, et relis la phrase.",
        "Si le ton change, tu viens de trouver la nuance.",
        "⛔ Un antonyme est une ACTION : le contraire de monter est descendre.",
      ],
    },
    schema: contentEtRavi,
  },
  {
    titre: "À vous",
    badge: "Le sens des mots - CM2",
    section: {
      type: "exercice",
      enonce: "« Il a dévoré son repas » / « Elle a dévoré ce roman en deux soirs ».",
      question: "Où « dévorer » est-il au sens figuré ?",
      indice: "Fais les deux dessins.",
      correction:
        "DANS LA SECONDE : on ne mange pas un livre, le dessin serait absurde. Dans la première on mange vraiment, et vite. Même verbe — c'est la phrase qui les sépare.",
    },
    schema: devorerDeuxFois,
  },
];
