// ─── Fiche de cours : les temps à bâtir (5e) ──────────────────────────────────
// SEPTIÈME FICHE DE FRANÇAIS DE LA 5e, et la première de la classe à porter la
// conjugaison — les six précédentes tenaient la grammaire de la phrase et
// l'orthographe grammaticale.
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
// ⛔ Ne pas étendre à la 4e (2027) ni à la 3e (2028).
//
// ⭐ POURQUOI CETTE NOTION EXISTE SOUS CE NOM. Le découpage du 24/08 avait
// produit « temps simples » et « temps composés », deux micros chacune. La règle
// pose un maximum de cinq micros par notion, pas un minimum de deux — et une
// notion de deux micros ne porte pas une fiche. Les deux ont été refondues le
// 25/08 en `conjugaison_temps`, quatre micros, le nom que la 4e et la 3e
// portaient déjà : c'est la condition pour qu'une fiche se compare d'un niveau
// à l'autre.
//
// ⭐ CE QUI TIENT TOUTE LA FICHE : AUCUN DE CES TEMPS NE S'APPREND EN ENTIER. Le
// passé simple est un radical plus une terminaison ; le conditionnel emprunte
// son radical au futur et ses terminaisons à l'imparfait ; les quatre temps
// composés sont le MÊME participe passé sous quatre auxiliaires. Le BO l'écrit
// pour les antérieurs — « Conjuguer un verbe PAR IMITATION, au passé antérieur
// et au futur antérieur » : on ne les récite pas, on les fabrique.
//
// ⭐ LE CANVAS EST `conjugaison`, ET LES QUATRE MODES SE PARTAGENT LE TRAVAIL :
// `wagons` pour un temps simple démonté, `tableau` pour ce qui ne se voit qu'en
// comparant six lignes (les familles du passé simple ; les TROIS lignes de
// l'impératif, dont l'absence des trois autres est le dessin), `composee` pour
// les deux caisses accrochées d'un temps composé.
// ⛔ `frise` UNE SEULE FOIS, DANS LE DÉFI (bloc d'exemple, 226 px) : le
// CATALOGUE le lui réserve, et c'est là qu'elle dit ce qu'aucun autre mode ne
// dit — « il eut fini », « il a fini », « il aura fini », même participe, trois
// auxiliaires posés sur trois moments.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `conjugaison_temps`) et sur les tables PASSE_SIMPLE, COND_IMPERATIF,
// TEMPS_COMPOSES et ANTERIEURS de
// lib/tutor-v4/questionBank/5e/francais/conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 5e_conj_passe_simple             → définition, figure, propriété « Le passé
//                                      simple se pose sur le radical », méthode
//                                      1, usage 1, exemple 1, piège 1,
//                                      entraînement 1
// - 5e_conj_conditionnel_imperatif   → propriétés « Le conditionnel emprunte à
//                                      deux temps » et « L'impératif n'a que
//                                      trois personnes », méthode 2, usage 2,
//                                      exemples 2 et 3, pièges 2 et 3,
//                                      entraînements 2 et 3
// - 5e_conj_temps_composes           → propriété « Deux caisses accrochées »,
//                                      formule, méthode 3, usage 3, exemple 4,
//                                      piège 4, entraînement 4
// - 5e_conj_anterieurs               → propriété « Seul l'auxiliaire change de
//                                      temps », le défi (exemple 5),
//                                      entraînement 5
//
// Les formes sont CELLES DE LA BANQUE, sans exception : « Ils marchèrent jusqu'au
// piton », « Il ouvrit la porte et sortit sans un mot », « Si j'avais le temps,
// je viendrais avec vous », « Prends ton sac », « Chante un peu plus fort »,
// « Sois prudent sur la route », « Tu devrais réviser avant demain », « Nous
// avons vu le lagon depuis la falaise », « Il avait fini avant nous », « Elles
// étaient arrivées la veille au soir », « Les enfants vinrent en courant »,
// « Quand il eut fini, il sortit sans bruit », « Dès qu'elle sera arrivée, nous
// partirons », « Quand tu auras compris, tu verras ».
//
// ⚠️ Contrôle passé — `npm run verifier:fiches`.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonLigne,
  ConjugaisonRepere,
  ConjugaisonSegment,
} from "@/lib/tutor-v4/types";

// Les quatre helpers de la matière. Aucun n'écrit de couleur : `role: "temps"`
// suffit, et la palette du canvas fait le reste — même principe que
// `label: "sujet"` dans les fiches de grammaire.
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

/** Les deux caisses d'un temps composé. Ici, JAMAIS de flèche d'accord : elle
 *  appartient à la fiche du participe passé, et deux dessins qui se ressemblent
 *  ne doivent pas raconter deux règles différentes. Ce qui porte la leçon est la
 *  `note` sous l'auxiliaire — c'est elle, et elle seule, qui change. */
function composee(opts: {
  pronom?: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "composee",
        pronom: opts.pronom,
        auxiliaire: opts.auxiliaire,
        participe: opts.participe,
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

/** ⛔ RÉSERVÉE AU BLOC D'EXEMPLE (CATALOGUE, § conjugaison). Trois zones à tenir
 *  lisibles : dans une carte de propriété, la frise tombe à 8 px de police. */
function frise(opts: { reperes: ConjugaisonRepere[]; titre?: string; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "frise",
        titre: opts.titre,
        reperes: opts.reperes,
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

// LA FIGURE DE RÉFÉRENCE, PREMIÈRE MOITIÉ : un temps simple, c'est-à-dire un
// radical et une terminaison. « Ils marchèrent jusqu'au piton » est la ligne des
// verbes en -er dans PASSE_SIMPLE : l'élève la retrouvera telle quelle.
const trainMarcherent = train({
  infinitif: "marcher",
  pronom: "ils",
  segments: [
    { texte: "march", role: "radical", note: "radical" },
    { texte: "èrent", role: "temps", note: "passé simple" },
  ],
  legende: "Un temps simple : deux morceaux.",
});

const trainOuvrit = train({
  infinitif: "ouvrir",
  pronom: "il",
  segments: [
    { texte: "ouvr", role: "radical", note: "radical" },
    { texte: "it", role: "temps", note: "passé simple" },
  ],
  legende: "« Il ouvrit la porte. »",
});

// ⭐ LES SIX PERSONNES, PARCE QUE LA RÉGULARITÉ NE SE VOIT QU'EN COLONNE. Le
// radical ne bouge pas d'une ligne à l'autre ; c'est la terminaison, seule, qui
// porte le temps et la personne. Une phrase le dit ; six lignes le montrent.
const tableauPasseSimple = tableau({
  temps: "passé simple",
  lignes: [
    { pronom: "je", radical: "march", terminaison: "ai" },
    { pronom: "tu", radical: "march", terminaison: "as" },
    { pronom: "il", radical: "march", terminaison: "a" },
    { pronom: "nous", radical: "march", terminaison: "âmes" },
    { pronom: "vous", radical: "march", terminaison: "âtes" },
    { pronom: "ils", radical: "march", terminaison: "èrent", alerte: true },
  ],
  legende: "Le radical ne bouge pas.",
});

// ⭐ LE DESSIN QUI DIT TOUT LE CONDITIONNEL : le premier wagon vient du futur,
// le second de l'imparfait. Deux caisses de deux couleurs, et la règle est lue.
const trainConditionnel = train({
  infinitif: "venir",
  pronom: "je",
  segments: [
    { texte: "viendr", role: "radical", note: "futur" },
    { texte: "ais", role: "temps", note: "imparfait" },
  ],
  legende: "Radical du futur, fin de l'imparfait.",
});

const trainDevrais = train({
  infinitif: "devoir",
  pronom: "tu",
  segments: [
    { texte: "devr", role: "radical", note: "futur" },
    { texte: "ais", role: "temps", note: "imparfait" },
  ],
  legende: "« Tu devrais réviser. »",
});

// ⭐ TROIS LIGNES, ET C'EST L'ABSENCE DES TROIS AUTRES QUI EST LE DESSIN.
// L'impératif n'a pas de « je », pas de « il », pas de « ils » — un tableau à
// six lignes le montre en creux, là où une phrase demande d'être crue.
const tableauImperatif = tableau({
  temps: "impératif présent",
  lignes: [
    { pronom: "(tu)", radical: "prend", terminaison: "s" },
    { pronom: "(nous)", radical: "pren", terminaison: "ons" },
    { pronom: "(vous)", radical: "pren", terminaison: "ez" },
  ],
  legende: "Trois personnes, et pas de pronom.",
});

// LE PIÈGE DES VERBES EN -er, EN RELIEF : « Chante », jamais « Chantes ».
const trainChante = train({
  infinitif: "chanter",
  pronom: "(tu)",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "e", role: "personne", note: "sans s", alerte: true },
  ],
  legende: "Un verbe en -er perd son s.",
});

// LA FIGURE DE RÉFÉRENCE, SECONDE MOITIÉ : un temps composé, deux caisses.
// ⭐ SEULE LA NOTE SOUS L'AUXILIAIRE CHANGE d'un temps composé à l'autre. Les
// quatre dessins qui suivent sont volontairement identiques à un mot près :
// c'est cette ressemblance qui est la leçon.
const composeePasseCompose = composee({
  pronom: "nous",
  auxiliaire: { texte: "avons", note: "présent" },
  participe: { texte: "vu" },
  legende: "Passé composé : l'auxiliaire au présent.",
});

const composeePlusQueParfait = composee({
  pronom: "il",
  auxiliaire: { texte: "avait", note: "imparfait" },
  participe: { texte: "fini" },
  legende: "Plus-que-parfait : auxiliaire à l'imparfait.",
});

const composeePasseAnterieur = composee({
  pronom: "il",
  auxiliaire: { texte: "eut", note: "passé simple" },
  participe: { texte: "fini" },
  legende: "L'auxiliaire passe au passé simple.",
});

const composeeFuturAnterieur = composee({
  pronom: "elle",
  auxiliaire: { texte: "sera", note: "futur" },
  participe: { texte: "arrivée" },
  legende: "L'auxiliaire passe au futur simple.",
});

// ⭐ LE DESSIN DU DÉFI (REGLES § 2). Le même participe « fini » sous trois
// auxiliaires, posés sur trois moments : c'est la seule image de la fiche qui
// montre les quatre temps composés comme UNE famille, et non comme quatre
// leçons. ⛔ Elle ne va que dans un bloc d'exemple.
const friseAuxiliaires = frise({
  reperes: [
    { texte: "il eut fini", zone: "passe" },
    { texte: "il a fini", zone: "present" },
    { texte: "il aura fini", zone: "futur" },
  ],
  legende: "Même participe, trois auxiliaires.",
});

const pieges = [
  "Confondre le passé simple et l'imparfait. « Il ouvrait la porte » installe une habitude ; « il ouvrit la porte » fait avancer le récit. Les deux formes existent, et c'est ce qui rend le choix difficile.",
  "Écrire « je viendrai » pour « je viendrais ». Un seul s sépare le futur du conditionnel. Test : remplace par « nous » — « nous viendrons » (futur) ou « nous viendrions » (conditionnel).",
  "Ajouter un s à l'impératif d'un verbe en -er. « Chante un peu plus fort », sans s — alors qu'on écrit « tu chantes ». C'est la seule personne où la forme du présent perd une lettre.",
  "Mettre l'auxiliaire au mauvais temps. « Il avait fini » est un plus-que-parfait, « il eut fini » un passé antérieur : le participe est le même, seul l'auxiliaire a bougé.",
];

const aRetenir = [
  "Un temps SIMPLE s'écrit en un mot : radical + terminaison. Un temps COMPOSÉ s'écrit en deux : auxiliaire + participe passé.",
  "Le conditionnel présent prend le radical du futur et les terminaisons de l'imparfait. L'impératif présent, c'est le présent sans le pronom — et trois personnes seulement.",
  "Dans les quatre temps composés, le participe ne bouge pas : c'est l'auxiliaire qui change de temps — présent, imparfait, passé simple, futur.",
];

export const ficheConjugaisonTemps5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "conjugaison-temps",
  titre: "Le passé simple, le conditionnel et les temps composés (2026-2027)",
  accroche:
    "« Il ouvrit la porte et sortit sans un mot. » Personne ne dit cette phrase : on l'écrit. Le passé simple, le conditionnel, les temps composés — aucun de ces temps ne s'apprend en entier. Chacun se FABRIQUE à partir de deux choses que tu as déjà.",
  identite: [
    { label: "Mots clés", valeur: "Passé simple, conditionnel, impératif, temps composés" },
    { label: "Le secret", valeur: "Aucun temps ne s'invente : chacun s'assemble" },
    { label: "Outil", valeur: "Trouver le radical, puis coller la bonne terminaison" },
  ],
  definition: {
    texte:
      "Les temps du français se rangent en deux familles. Un temps SIMPLE s'écrit en un seul mot : on prend le radical du verbe, et on colle la terminaison du temps — « ils march-èrent » au passé simple. Un temps COMPOSÉ s'écrit en deux mots : un auxiliaire, être ou avoir, suivi du participe passé — « nous avons vu ». Toute la classe de 5e tient dans cette différence. Le conditionnel présent est un temps simple un peu spécial : il emprunte son radical au futur et ses terminaisons à l'imparfait. L'impératif présent est le présent auquel on retire le pronom, et il n'a que trois personnes. Quant aux quatre temps composés — passé composé, plus-que-parfait, passé antérieur, futur antérieur —, ils ont tous le même participe passé : c'est l'auxiliaire, et lui seul, qui change de temps.",
  },
  figure: {
    schema: pile(trainMarcherent, composeePasseCompose),
    legende:
      "En haut, un temps simple : deux wagons accrochés, le radical puis la terminaison, et le mot s'écrit d'un seul tenant. En bas, un temps composé : deux caisses aussi, mais séparées par un espace — l'auxiliaire, puis le participe passé. Toute la conjugaison de 5e se joue entre ces deux dessins.",
  },
  proprietes: [
    {
      titre: "Le passé simple se pose sur le radical",
      texte:
        "Le radical ne bouge pas d'une personne à l'autre : seule la terminaison change.",
      schema: tableauPasseSimple,
      micros: ["5e_conj_passe_simple"],
    },
    {
      titre: "Le conditionnel emprunte à deux temps",
      texte:
        "Le radical vient du futur, la terminaison vient de l'imparfait. Rien d'autre à retenir.",
      schema: trainConditionnel,
      micros: ["5e_conj_conditionnel_imperatif"],
    },
    {
      titre: "L'impératif n'a que trois personnes",
      texte:
        "Pas de « je », pas de « il », pas de « ils » — et jamais de pronom devant le verbe.",
      schema: tableauImperatif,
      micros: ["5e_conj_conditionnel_imperatif"],
    },
    {
      titre: "Un temps composé s'écrit en deux morceaux",
      texte:
        "L'auxiliaire au présent donne le passé composé ; à l'imparfait, le plus-que-parfait.",
      schema: pile(composeePasseCompose, composeePlusQueParfait),
      micros: ["5e_conj_temps_composes"],
    },
    {
      titre: "Chez les antérieurs, seul l'auxiliaire bouge",
      texte:
        "Auxiliaire au passé simple : passé antérieur. Au futur simple : futur antérieur.",
      schema: pile(composeePasseAnterieur, composeeFuturAnterieur),
      micros: ["5e_conj_anterieurs"],
    },
  ],
  reel: {
    texte:
      "Le conditionnel et l'impératif ne sont pas des exercices : ce sont les deux temps qu'on entend le plus autour de soi. À la boulangerie, « je voudrais un pain » n'est pas « je veux un pain » — le conditionnel est ce qui rend la demande polie. Et quand une alerte cyclonique passe en orange, le message de la préfecture n'est fait que d'impératifs : « Fermez les volets », « Ne sortez pas », « Écoutez la radio ». Trois personnes, aucun pronom, et tout le monde comprend qu'il s'agit d'un ordre. Le passé simple, lui, ne se parle plus depuis longtemps — mais il est le temps de tout ce que tu lis : un roman, une nouvelle, une légende de l'île racontée à l'écrit.",
  },
  historique: {
    texte:
      "Le passé simple s'appelait autrefois le « passé défini », et il se parlait vraiment : au XVIIe siècle, on disait « j'allai au marché » comme on dit aujourd'hui « je suis allé au marché ». Il a reculé siècle après siècle, chassé de la conversation par le passé composé, jusqu'à ne plus survivre qu'à l'écrit — et surtout à la 3e personne. Le passé antérieur a suivi le même chemin, plus vite encore : il ne se rencontre presque plus qu'après « quand », « dès que », « lorsque ». C'est pour cela que le programme demande de le conjuguer « par imitation » et non par cœur : on n'apprend pas la liste d'un temps qu'on ne rencontre que dix fois par an, on apprend à le fabriquer.",
  },
  formule: {
    contexte: "La question qui décide, dans l'ordre.",
    expression: "un mot ou deux ? puis : quelle terminaison, quel auxiliaire ?",
    legende:
      "Un temps simple s'écrit en un mot : cherche le radical, puis colle la terminaison du temps. Un temps composé s'écrit en deux : choisis l'auxiliaire — être ou avoir —, mets-le au temps demandé, et ajoute le participe passé, qui ne change jamais d'un temps composé à l'autre.",
    schema: pile(trainMarcherent, composeePasseAnterieur),
  },
  methode: [
    {
      titre: "Je regarde si le temps s'écrit en un mot ou en deux",
      texte:
        "Un mot : c'est un temps simple, radical + terminaison. Deux mots : c'est un temps composé.",
      schema: pile(trainMarcherent, composeePasseCompose),
      micros: ["5e_conj_passe_simple", "5e_conj_temps_composes"],
    },
    {
      titre: "Pour un temps simple, je fabrique le radical",
      texte:
        "Au conditionnel, dis d'abord le futur pour trouver le radical, puis ajoute -ais, -ait, -ions.",
      schema: trainConditionnel,
      micros: ["5e_conj_passe_simple", "5e_conj_conditionnel_imperatif"],
    },
    {
      titre: "Pour un temps composé, je déplace l'auxiliaire",
      texte:
        "Dis le passé composé, puis remplace l'auxiliaire par la forme demandée. Le participe ne bouge pas.",
      schema: pile(composeePlusQueParfait, composeeFuturAnterieur),
      micros: ["5e_conj_temps_composes", "5e_conj_anterieurs"],
    },
  ],
  usages: [
    {
      titre: "Raconter une histoire à l'écrit",
      detail:
        "« Ils marchèrent jusqu'au piton », « le vent tomba d'un coup » : le passé simple fait avancer le récit.",
      schema: trainMarcherent,
      micros: ["5e_conj_passe_simple"],
    },
    {
      titre: "Demander, conseiller, supposer",
      detail:
        "« Je voudrais rester », « tu devrais réviser » : le conditionnel adoucit. L'impératif, lui, ordonne.",
      schema: pile(trainDevrais, trainChante),
      micros: ["5e_conj_conditionnel_imperatif"],
    },
    {
      titre: "Dire ce qui était déjà fait",
      detail:
        "« Il avait fini avant nous » : le plus-que-parfait place une action avant une autre action passée.",
      schema: composeePlusQueParfait,
      micros: ["5e_conj_temps_composes"],
    },
  ],
  exemples: [
    {
      titre: "Le récit bascule au passé simple",
      donnees: "« Il ___ la porte et sortit sans un mot. » (ouvrir)",
      schema: trainOuvrit,
      micros: ["5e_conj_passe_simple"],
      question: "Quelle est la forme correcte ?",
      solution:
        "« ouvrit ». Le verbe qui suit, « sortit », est au passé simple : les deux actions sont brèves et achevées, et elles se répondent. On prend le radical « ouvr- » et on ajoute la terminaison du passé simple, « -it ». Attention au piège : « ouvrait » est un imparfait, « ouvert » un participe passé, « ouvre » un présent — les trois existent, et c'est bien pour cela qu'ils trompent.",
    },
    {
      titre: "Le conditionnel, deux temps en un seul mot",
      donnees: "« Si j'avais le temps, je ___ avec vous. » (venir)",
      schema: trainConditionnel,
      micros: ["5e_conj_conditionnel_imperatif"],
      question: "Comment fabriquer la forme sans l'avoir apprise ?",
      solution:
        "« viendrais ». Dis d'abord le futur, à voix basse : « je viendrai ». Tu tiens le radical, « viendr- ». Colle maintenant la terminaison de l'imparfait pour la même personne : « -ais ». Le mot est fait. Le seul écart avec le futur est ce s final — et c'est lui qui distingue « je viendrai » (j'y vais) de « je viendrais » (à condition que…).",
    },
    {
      titre: "L'impératif perd une lettre",
      donnees: "« ___ un peu plus fort. » (chanter, 2e personne du singulier)",
      schema: pile(trainChante, tableauImperatif),
      micros: ["5e_conj_conditionnel_imperatif"],
      question: "Faut-il un s à la fin ?",
      solution:
        "Non : « Chante ». À l'impératif, on part du présent et on retire le pronom — « tu chantes » donnerait « chantes », mais les verbes en -er perdent leur s à cette personne-là. C'est la seule exception, et elle ne touche qu'eux : on écrit bien « Prends ton sac » avec un s, parce que « prendre » n'est pas un verbe en -er. Le tableau montre l'autre particularité du mode : trois personnes, et pas une de plus.",
    },
    {
      titre: "Le même verbe, deux temps composés",
      donnees: "« Nous ___ le lagon depuis la falaise. » (voir) puis « Il ___ avant nous. » (finir)",
      schema: pile(composeePasseCompose, composeePlusQueParfait),
      micros: ["5e_conj_temps_composes"],
      question: "Qu'est-ce qui change d'un temps composé à l'autre ?",
      solution:
        "« avons vu », puis « avait fini ». Dans les deux cas, la construction est la même : l'auxiliaire avoir, puis le participe passé. Ce qui change est le TEMPS de l'auxiliaire — présent pour le passé composé, imparfait pour le plus-que-parfait. Le participe, lui, s'écrit pareil dans les deux phrases. Comparer les deux dessins revient à comparer un seul mot : c'est tout ce qu'il y a à savoir.",
    },
    {
      titre: "Le défi",
      donnees: "« Quand il ___ , il sortit sans bruit. » (finir) et « Dès qu'elle ___ , nous partirons. » (arriver)",
      schema: pile(composeePasseAnterieur, friseAuxiliaires),
      micros: ["5e_conj_anterieurs"],
      question: "Deux temps que tu n'as jamais conjugués : comment les fabriquer ?",
      solution:
        "« eut fini » et « sera arrivée ». Le BO demande de conjuguer ces deux temps « par imitation » : on ne les apprend pas, on les copie sur ceux qu'on connaît. Pars du passé composé — « il a fini » — et déplace l'auxiliaire. Au passé simple : « il eut fini », c'est le passé antérieur, et il va avec le passé simple de la phrase. Au futur simple : « elle sera arrivée », c'est le futur antérieur, et il va avec « nous partirons ». La frise le montre d'un coup d'œil : un seul participe passé, « fini », et trois auxiliaires posés à trois moments de la ligne du temps.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      micros: ["5e_conj_passe_simple"],
      question: "« Les enfants ___ en courant. » (venir, passé simple)",
      correction:
        "« vinrent ». « Venir » a un passé simple en -in- : je vins, il vint, ils vinrent. Le piège est « venaient », qui est un imparfait : il installerait une scène au lieu de la faire avancer.",
    },
    {
      micros: ["5e_conj_conditionnel_imperatif"],
      question: "« Tu ___ réviser avant demain. » (devoir, conditionnel présent)",
      correction:
        "« devrais ». Le futur donne le radical — « tu devras », donc « devr- » —, et l'imparfait donne la terminaison, « -ais ». Ne pas écrire « devrai » : ce serait un futur, et la phrase n'annoncerait plus un conseil mais une certitude.",
    },
    {
      micros: ["5e_conj_conditionnel_imperatif"],
      question: "« ___ prudent sur la route. » (être, impératif présent, 2e personne du singulier)",
      correction:
        "« Sois ». « Être » a un impératif irrégulier, à apprendre : sois, soyons, soyez. Ni « soit », qui est un subjonctif, ni « es », qui est un présent avec son pronom sous-entendu.",
    },
    {
      micros: ["5e_conj_temps_composes"],
      question: "« Elles ___ la veille au soir. » (arriver, plus-que-parfait)",
      correction:
        "« étaient arrivées ». « Arriver » se conjugue avec être ; l'auxiliaire se met à l'imparfait pour former le plus-que-parfait, et le participe s'accorde avec le sujet féminin pluriel.",
    },
    {
      micros: ["5e_conj_anterieurs"],
      question: "Défi : « Quand tu ___ , tu verras. » (comprendre, futur antérieur)",
      correction:
        "« auras compris ». Pars du passé composé, « tu as compris », et mets l'auxiliaire au futur simple : « tu auras ». Le participe ne change pas. Compare avec l'exercice précédent : même fabrication, même participe immobile — seul le temps de l'auxiliaire a bougé.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesConjugaisonTemps5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les temps à bâtir - 5e",
    section: {
      type: "objectif",
      phrase: "Fabriquer un temps, au lieu de l'apprendre",
      sousPhrase:
        "Le passé simple, le conditionnel, l'impératif et les quatre temps composés : chacun s'assemble à partir de deux morceaux qu'on a déjà.",
      encadre: {
        titre: "L'idée",
        texte: "Un mot = radical + terminaison. Deux mots = auxiliaire + participe passé.",
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
          "« Je voudrais un pain » n'est pas « je veux un pain » : le conditionnel rend la demande polie. Et une alerte cyclonique n'est faite que d'impératifs — « Fermez les volets », « Ne sortez pas ».",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Au XVIIe siècle, on DISAIT « j'allai au marché ». Le passé simple a reculé siècle après siècle devant le passé composé, jusqu'à ne survivre qu'à l'écrit.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonTemps5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Un mot, ou deux ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Temps SIMPLE",
        contenu:
          "Un seul mot : radical + terminaison. « ils march-èrent », « je viendr-ais ». Le passé simple, le conditionnel et l'impératif sont de cette famille.",
      },
      droite: {
        variante: "info",
        titre: "Temps COMPOSÉ",
        contenu:
          "Deux mots : auxiliaire + participe passé. « nous avons vu », « il avait fini ». Quatre temps, et le même participe dans les quatre.",
      },
    },
  },
  {
    titre: "Le conditionnel se fabrique",
    badge: "Deux temps en un",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le radical vient du futur",
        contenu: "« je viendrai » donne « viendr- ». Dis le futur à voix basse : le radical est là.",
      },
      droite: {
        variante: "info",
        titre: "La fin vient de l'imparfait",
        contenu: "-ais, -ais, -ait, -ions, -iez, -aient. Colle, et le mot est fait : « je viendrais ».",
      },
    },
  },
  {
    titre: "L'impératif perd une lettre",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« ___ un peu plus fort. » (chanter) et « ___ ton sac. » (prendre)",
      question: "Lequel des deux prend un s ?",
      correction:
        "« Chante » sans s — les verbes en -er le perdent à cette personne. « Prends » avec s, parce que « prendre » n'est pas un verbe en -er.",
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
    badge: "Conjuguer par imitation",
    section: {
      type: "exercice",
      enonce: "« Quand il ___ , il sortit sans bruit. » (finir) et « Dès qu'elle ___ , nous partirons. » (arriver)",
      question: "Deux temps jamais conjugués : comment les fabriquer ?",
      indice: "Pars du passé composé — « il a fini » — et déplace l'auxiliaire dans le temps.",
      correction:
        "« eut fini » (passé antérieur, auxiliaire au passé simple) et « sera arrivée » (futur antérieur, auxiliaire au futur). Le participe ne bouge jamais.",
    },
  },
];
