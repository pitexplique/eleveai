// ─── Fiche de cours : lire une forme verbale (6e) ─────────────────────────────
// PREMIÈRE FICHE DE CONJUGAISON DE LA 6e, et la première à se servir du canvas
// `conjugaison` (créé le 23/08/2026). Les cinq fiches précédentes de la classe
// portaient toute la grammaire que le canvas `phrase` sait dessiner ; celui-ci
// ouvre les quatre notions que `phrase` s'interdisait.
//
// ⭐ CE QUE LE BO DEMANDE, ET QUI COMMANDE LA FORME DU DESSIN. Le programme
// écrit : « Identifier la COMPOSITION DE LA TERMINAISON : la marque de temps et
// la marque de personne ». Ce n'est pas « savoir sa conjugaison » — c'est savoir
// DÉMONTER une forme verbale. D'où les wagons : chaque morceau est une caisse,
// et la forme verbale est le train. L'élève ne récite pas, il décompose.
//
// ⭐ ET UN OBJECTIF QUE LE CM2 N'A PAS : « Maîtriser les variations du radical
// pour certains verbes du 1er groupe ». Le CM2 conjugue ; la 6e explique
// pourquoi « nous rangeons » garde son « e ». C'est le mode `tableau` du canvas
// qui le montre : la ligne qui varie passe en relief, et l'on voit du premier
// coup d'œil que le radical bouge sur une ligne et pas sur les cinq autres.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `conjugaison_formes`) et sur les items de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts (6e_fr_fixed_conj_1 à 6)
// plus les pools MARQUES_TEMPS_PERSONNE et RADICAL_VARIATIONS de
// buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 6e_conj_identifier          → définition, figure, propriété « Le radical et
//                                 la terminaison », méthode 1, exemple 1
// - 6e_conj_marques             → propriétés « La marque de temps », « Le r du
//                                 futur », « La marque de personne », formule,
//                                 méthodes 2 et 3, usages, exemples 2 et 3,
//                                 entraînements 1 à 3
// - 6e_conj_radical_variations  → propriétés « Le radical peut changer » et
//                                 « La consonne qui double », exemple 4,
//                                 pièges 3 et 4, entraînements 4 et 5
// - 6e_conj_simples_defi        → le défi, dessiné (exemple 5)
//
// Les formes sont CELLES DE LA BANQUE : « nous chantions », « tu chantais »,
// « je chanterai », « vous finissiez », « Nous chanterons à la fête », « nous
// rangeons », « nous commençons », « tu appelles », « je finissais ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.
// ⚠️ Les `note` sous les wagons font huit signes ou presque : c'est la NOTE, et
// non le mot, qui fixe la largeur d'un wagon (CATALOGUE, § conjugaison).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonLigne,
  ConjugaisonSegment,
} from "@/lib/tutor-v4/types";

// Le helper commun aux quatre fiches de conjugaison. Il n'écrit JAMAIS de
// couleur : `role: "temps"` suffit, et la palette du canvas fait le reste —
// même principe que `label: "sujet"` dans les fiches de grammaire.
function train(opts: {
  infinitif?: string;
  pronom?: string;
  segments: ConjugaisonSegment[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        titre: opts.titre,
        infinitif: opts.infinitif,
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

function tableau(opts: {
  temps: string;
  lignes: ConjugaisonLigne[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "tableau",
        titre: opts.titre,
        temps: opts.temps,
        lignes: opts.lignes,
        legende: opts.legende,
      }}
    />
  );
}

// Dans une carte, on EMPILE — jamais deux dessins côte à côte (REGLES § 2 ter).
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les formes de la banque, démontées ───────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE. « nous chantions » est la forme sur laquelle le pool
// MARQUES_TEMPS_PERSONNE pose ses deux questions — la marque de temps et celle
// de personne. C'est donc elle qui ouvre la fiche : l'élève la retrouvera telle
// quelle dans le coach.
const trainReference = train({
  infinitif: "chanter",
  pronom: "nous",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "Un mot, trois morceaux.",
});

// LE PRÉSENT N'A PAS DE MARQUE DE TEMPS — et c'est un dessin, pas une phrase :
// il manque un wagon, on le voit.
const trainPresent = train({
  infinitif: "chanter",
  pronom: "nous",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "Au présent, deux wagons suffisent.",
});

// « -ais » DIT DEUX CHOSES À LA FOIS. C'est la question du pool : « Dans "tu
// chantais", que dit la terminaison "-ais" ? » — la réponse est « le temps ET la
// personne », et deux wagons séparés la rendent évidente.
const trainImparfait = train({
  infinitif: "chanter",
  pronom: "tu",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "tu" },
  ],
  legende: "« -ais » = « -ai- » + « -s ».",
});

// LE « r » DU FUTUR, en relief : c'est le seul wagon qui porte `alerte`.
const trainFutur = train({
  infinitif: "chanter",
  pronom: "je",
  segments: [
    { texte: "chante", role: "radical", note: "radical" },
    { texte: "r", role: "temps", note: "futur", alerte: true },
    { texte: "ai", role: "personne", note: "je" },
  ],
  legende: "Le « r » signale toujours le futur.",
});

// LA MARQUE DE PERSONNE, en relief à son tour. Même forme que dans le coach :
// « Dans "vous finissiez", quelle est la personne ? »
const trainPersonne = train({
  infinitif: "finir",
  pronom: "vous",
  segments: [
    { texte: "finiss", role: "radical", note: "radical" },
    { texte: "i", role: "temps", note: "imparfait" },
    { texte: "ez", role: "personne", note: "vous", alerte: true },
  ],
  legende: "« -ez » va avec « vous ».",
});

// LE RADICAL QUI NE BOUGE PAS, pour opposer aux deux tableaux qui suivent.
const trainRadical = train({
  infinitif: "finir",
  pronom: "je",
  segments: [
    { texte: "finiss", role: "radical", note: "radical" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "s", role: "personne", note: "je" },
  ],
  legende: "« finiss- » ne change pas de personne.",
});

// LES VARIATIONS DU RADICAL. Le tableau est le seul mode qui empile : une
// variation ne se voit qu'en comparant les six lignes entre elles.
const tableauRanger = tableau({
  temps: "ranger, au présent",
  lignes: [
    { pronom: "je", radical: "rang", terminaison: "e" },
    { pronom: "tu", radical: "rang", terminaison: "es" },
    { pronom: "il", radical: "rang", terminaison: "e" },
    { pronom: "nous", radical: "range", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "rang", terminaison: "ez" },
    { pronom: "ils", radical: "rang", terminaison: "ent" },
  ],
  legende: "Le « e » revient devant « -ons ».",
});

const tableauCommencer = tableau({
  temps: "commencer, au présent",
  lignes: [
    { pronom: "je", radical: "commenc", terminaison: "e" },
    { pronom: "tu", radical: "commenc", terminaison: "es" },
    { pronom: "il", radical: "commenc", terminaison: "e" },
    { pronom: "nous", radical: "commenç", terminaison: "ons", alerte: true },
    { pronom: "vous", radical: "commenc", terminaison: "ez" },
    { pronom: "ils", radical: "commenc", terminaison: "ent" },
  ],
  legende: "La cédille garde le son « s ».",
});

const tableauAppeler = tableau({
  temps: "appeler, au présent",
  lignes: [
    { pronom: "j'", radical: "appell", terminaison: "e", alerte: true },
    { pronom: "tu", radical: "appell", terminaison: "es", alerte: true },
    { pronom: "il", radical: "appell", terminaison: "e", alerte: true },
    { pronom: "nous", radical: "appel", terminaison: "ons" },
    { pronom: "vous", radical: "appel", terminaison: "ez" },
    { pronom: "ils", radical: "appell", terminaison: "ent", alerte: true },
  ],
  legende: "Le « l » double, sauf nous et vous.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). C'est la forme de l'item
// 6e_fr_fixed_conj_6 : « Tu ___ tes affaires. » (appeler, présent).
const trainDefi = train({
  infinitif: "appeler",
  pronom: "tu",
  segments: [
    { texte: "appell", role: "radical", note: "doublé", alerte: true },
    { texte: "es", role: "personne", note: "tu" },
  ],
  legende: "Radical doublé, puis « -es ».",
});

// La forme du futur telle que le coach la donne : « Nous chanterons à la fête ».
const trainFuturNous = train({
  infinitif: "chanter",
  pronom: "nous",
  segments: [
    { texte: "chante", role: "radical", note: "radical" },
    { texte: "r", role: "temps", note: "futur", alerte: true },
    { texte: "ons", role: "personne", note: "nous" },
  ],
  legende: "« Nous chanterons à la fête. »",
});

const pieges = [
  "Croire que la terminaison ne dit qu'une chose : dans « tu chantais », « -ai- » donne le temps et « -s » donne la personne. Deux marques dans une seule terminaison.",
  "Confondre le « r » du futur avec le « r » du radical : dans « je pars », le « r » appartient à « part- ». Le « r » du futur arrive APRÈS le radical, juste avant la marque de personne.",
  "Écrire « nous mangons » ou « nous commencons » : sans le « e » et sans la cédille, on lirait « manguons » et « commenkons ». Le radical change d'orthographe pour garder son SON.",
  "Mettre une cédille partout : « vous déplacez » n'en prend pas, parce que devant un « e » le « c » se dit déjà « s ». La cédille ne sert que devant « o » et « a ».",
];

const aRetenir = [
  "Un verbe conjugué se coupe en deux : le radical porte le sens, la terminaison dit quand et qui.",
  "La terminaison contient une marque de temps (le « r » du futur, le « -ai- » ou « -i- » de l'imparfait) et une marque de personne (-s, -ons, -ez, -ent).",
  "Au premier groupe, le radical peut changer d'orthographe pour garder son son : nous rangeons, nous commençons, tu appelles.",
];

export const ficheConjugaisonFormes6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "conjugaison-formes",
  titre: "Lire une forme verbale : radical, temps, personne",
  accroche:
    "« nous chantions » n'est pas un mot : c'est un train de trois wagons. « chant- » dit de quoi on parle, « -i- » dit quand, « -ons » dit qui. Une fois qu'on sait les décrocher, on ne devine plus une conjugaison — on la lit.",
  identite: [
    { label: "Mots clés", valeur: "Radical, terminaison, marque de temps, marque de personne" },
    { label: "Le secret", valeur: "Couper le verbe en morceaux au lieu de le réciter" },
    { label: "Outil", valeur: "Comparer les six personnes pour voir ce qui bouge" },
  ],
  definition: {
    texte:
      "Un verbe conjugué est un mot assemblé. Il commence par un radical, qui porte le sens et qu'on retrouve dans l'infinitif, et il finit par une terminaison. Cette terminaison se lit elle-même en deux morceaux : la marque de temps, qui dit quand l'action se passe, et la marque de personne, qui dit qui la fait. Identifier un verbe conjugué, c'est retrouver ces morceaux et les nommer : le temps, le mode, la personne.",
  },
  figure: {
    schema: trainReference,
    legende:
      "« nous chantions ». Le premier wagon, « chant- », est le radical : on le retrouve dans « chanter », « chanteur », « chanson ». Le deuxième, « -i- », est la marque de l'imparfait. Le troisième, « -ons », est la marque de la 1re personne du pluriel. Trois wagons, trois questions : quoi, quand, qui.",
  },
  proprietes: [
    {
      titre: "Radical + terminaison",
      texte: "Le radical porte le sens du verbe ; la terminaison dit le temps et la personne.",
      schema: trainPresent,
    },
    {
      titre: "La marque de temps",
      texte: "L'imparfait se signe « -ai- » ou « -i- ». Au présent, il n'y a pas de marque de temps.",
      schema: trainImparfait,
    },
    {
      titre: "Le « r » du futur",
      texte: "Le futur porte toujours un « r », dans tous les verbes, juste avant la marque de personne.",
      schema: trainFutur,
    },
    {
      titre: "La marque de personne",
      texte: "Elle dit qui fait l'action : -s avec tu, -ons avec nous, -ez avec vous, -ent avec ils.",
      schema: trainPersonne,
    },
    {
      titre: "Le radical peut changer d'orthographe",
      texte: "Au premier groupe, il s'écrit autrement devant « o » ou « a » pour garder le même son.",
      schema: pile(tableauRanger, tableauCommencer),
    },
    {
      titre: "La consonne qui double",
      texte: "Les verbes en -eler et -eter doublent leur consonne, sauf avec « nous » et « vous ».",
      schema: tableauAppeler,
    },
  ],
  reel: {
    texte:
      "Savoir démonter un verbe sert d'abord à écrire juste, mais aussi à LIRE. Devant une forme jamais rencontrée — « ils accueillirent », « nous parviendrons » —, personne ne l'a apprise par cœur : on la comprend en repérant le radical et les marques. C'est ce que le programme appelle « raisonner sur la langue » plutôt que la mémoriser. Et c'est ce qui permet, en 6e, de lire un roman écrit au passé simple sans en connaître toutes les formes.",
  },
  historique: {
    texte:
      "D'où vient le « r » du futur ? Du verbe « avoir ». En latin populaire, pour dire « je chanterai », on disait « cantare habeo » — littéralement « j'ai à chanter ». Les deux mots se sont soudés, et l'on obtient « chanter » + « ai ». Regarde les terminaisons du futur : -ai, -as, -a, -ons, -ez, -ont. C'est exactement le verbe avoir au présent. Le futur français est un vieux « j'ai à faire » collé en un seul mot.",
  },
  formule: {
    contexte: "La composition d'une forme verbale.",
    expression: "radical + marque de temps + marque de personne",
    legende:
      "Le radical se retrouve dans l'infinitif. La marque de temps est le « r » au futur, le « -ai- » ou « -i- » à l'imparfait, et rien du tout au présent. La marque de personne ferme le mot : -s, -ons, -ez, -ent. Deux formes du même verbe ne diffèrent que par ce qu'on a changé de wagon.",
    schema: pile(trainFutur, trainImparfait),
  },
  methode: [
    {
      titre: "Je coupe le verbe en deux",
      texte: "Je cherche le morceau qui ne bouge pas d'une personne à l'autre : c'est le radical.",
      schema: trainRadical,
    },
    {
      titre: "Je cherche la marque de temps",
      texte: "Un « r » ? c'est le futur. Un « -ai- » ou « -i- » ? c'est l'imparfait. Rien ? c'est le présent.",
      schema: trainFutur,
    },
    {
      titre: "Je lis la marque de personne",
      texte: "Elle ferme le mot : -s pour tu, -ons pour nous, -ez pour vous, -ent pour ils.",
      schema: trainPersonne,
    },
  ],
  usages: [
    {
      titre: "Trouver le temps",
      detail: "Je regarde le milieu du mot : le « r » donne le futur, le « -ai- » donne l'imparfait.",
      schema: trainFuturNous,
    },
    {
      titre: "Trouver la personne",
      detail: "Je regarde la fin du mot : « -ez » ne va qu'avec « vous », « -ons » qu'avec « nous ».",
      schema: trainPersonne,
    },
    {
      titre: "Trouver l'infinitif",
      detail: "J'enlève la terminaison et je remets « -er » ou « -ir » : « finiss- » redonne « finir ».",
      schema: trainRadical,
    },
  ],
  exemples: [
    {
      titre: "Donner le temps d'un verbe",
      donnees: "« Nous chanterons à la fête. »",
      schema: trainFuturNous,
      question: "À quel temps est le verbe, et à quoi le voit-on ?",
      solution:
        "Au futur. On coupe : « chante- » est le radical, puis vient un « r » — la marque du futur —, puis « -ons » pour « nous ». L'action n'a pas encore eu lieu. Sans le « r », on aurait « nous chantons », au présent.",
    },
    {
      titre: "Donner la personne",
      donnees: "« vous finissiez »",
      schema: trainPersonne,
      question: "Quelle est la personne, et quelle est la marque de temps ?",
      solution:
        "La 2e personne du pluriel : la terminaison « -ez » ne va qu'avec « vous ». Et entre le radical « finiss- » et cette marque, il reste un « -i- » : c'est l'imparfait. « vous finissiez » se lit donc en trois morceaux, comme « nous chantions ».",
    },
    {
      titre: "Deux marques dans une terminaison",
      donnees: "« tu chantais »",
      schema: trainImparfait,
      question: "Que dit exactement la terminaison « -ais » ?",
      solution:
        "Le temps ET la personne. « -ai- » est la marque de l'imparfait ; le « -s » final est la marque de « tu ». Une terminaison courte peut porter deux informations : c'est pour cela qu'on la coupe au lieu de l'apprendre en bloc.",
    },
    {
      titre: "Le radical qui change",
      donnees: "« Nous ___ le sable. » (ranger, au présent)",
      schema: tableauRanger,
      question: "Écrit-on « rangons » ou « rangeons » ?",
      solution:
        "« rangeons ». Le radical est « rang- » partout, sauf devant « -ons » où il s'écrit « range- ». Sans ce « e », le « g » se dirait « gu » : on lirait « ranguons ». Le radical ne change pas de sens, seulement d'orthographe, et seulement pour garder son son.",
    },
    {
      titre: "Le défi",
      donnees: "« Tu ___ tes affaires. » (appeler, au présent)",
      schema: trainDefi,
      question: "Quelle forme faut-il écrire ?",
      solution:
        "« tu appelles ». Les verbes en -eler doublent leur « l » quand la terminaison ne s'entend pas : j'appelle, tu appelles, il appelle, ils appellent. Avec « nous » et « vous », la terminaison s'entend et le « l » reste seul : nous appelons, vous appelez.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans « nous chantions », quelle est la marque de TEMPS ?",
      correction:
        "« -i- ». La terminaison se lit en deux morceaux : « -i- » est la marque de l'imparfait, « -ons » celle de la personne. Le radical, lui, est « chant- ».",
    },
    {
      question: "Quelle lettre signale toujours le futur simple ?",
      correction:
        "Le « r ». Je chanteRAI, tu finiRAS, il viendRA : le futur porte toujours un « r » avant la marque de personne, quel que soit le verbe.",
    },
    {
      question: "Dans « je finissais », quel est le radical ?",
      correction:
        "« finiss- ». C'est le morceau qui ne bouge pas d'une personne à l'autre : je finissais, tu finissais, nous finissions. Ce n'est ni « fin- » ni « je ».",
    },
    {
      question: "« Nous ___ un dessin. » (commencer, au présent)",
      correction:
        "« commençons ». La cédille garde le son « s » devant le « o » ; sans elle, on lirait « commenkons ». Attention : « vous commencez » n'en prend pas, le « c » se disant déjà « s » devant « e ».",
    },
    {
      question: "« Tu ___ les feuilles. » (jeter, au présent)",
      correction:
        "« tu jettes ». Comme les verbes en -eler, les verbes en -eter doublent leur consonne devant une terminaison muette : je jette, tu jettes, il jette, ils jettent — mais nous jetons, vous jetez.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesConjugaisonFormes6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La forme verbale - 6e",
    section: {
      type: "objectif",
      phrase: "Démonter un verbe au lieu de le réciter",
      sousPhrase:
        "Radical, marque de temps, marque de personne : trois morceaux, et toute conjugaison se lit.",
      encadre: {
        titre: "L'idée",
        texte: "Un verbe conjugué n'est pas un mot : c'est un mot assemblé.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Devant « ils accueillirent » ou « nous parviendrons », personne n'a appris la forme par cœur : on la comprend en repérant le radical et les marques. C'est ce qui permet de lire un roman au passé simple.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le « r » du futur vient du verbe avoir. En latin populaire, « je chanterai » se disait « cantare habeo » : « j'ai à chanter ». Les terminaisons -ai, -as, -a, -ons, -ez, -ont sont exactement le verbe avoir au présent.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonFormes6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Une terminaison dit DEUX choses",
    badge: "Marques",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on croit",
        contenu:
          "« tu chantais » : la terminaison est « -ais », et c'est celle de l'imparfait. Un seul bloc à retenir.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'on lit",
        contenu:
          "« -ai- » est la marque du temps, « -s » celle de la personne. Deux marques dans une terminaison de trois lettres.",
      },
    },
  },
  {
    titre: "Le radical peut changer d'orthographe",
    badge: "Premier groupe",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Pourquoi",
        contenu:
          "« nous rangeons » garde son « e » et « nous commençons » prend une cédille pour garder le SON du radical. Sans eux, on lirait « ranguons » et « commenkons ».",
      },
      droite: {
        variante: "ok",
        titre: "Où ça s'arrête",
        contenu:
          "Seulement devant « o » et « a ». « vous déplacez » ne prend pas de cédille : devant un « e », le « c » se dit déjà « s ».",
      },
    },
  },
  {
    titre: "Lire un futur",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Nous chanterons à la fête. »",
      question: "À quel temps est le verbe, et à quoi le voit-on ?",
      correction:
        "Au futur : « chante- » (radical) + « r » (marque du futur) + « -ons » (marque de personne). Sans le « r », on aurait « nous chantons », au présent.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "Le défi",
    badge: "À toi de jouer",
    section: {
      type: "exercice",
      enonce: "« Tu ___ tes affaires. » (appeler, au présent)",
      question: "Quelle forme faut-il écrire ?",
      indice: "Écoute la terminaison : s'entend-elle ? Puis regarde ce que fait le « l ».",
      correction:
        "« tu appelles ». Les verbes en -eler doublent leur « l » devant une terminaison muette — mais nous appelons, vous appelez.",
    },
  },
];
