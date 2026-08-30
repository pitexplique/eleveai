// ─── Fiche de cours : la formation des mots (CM2) ─────────────────────────────
// QUINZIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « SE SERVIR DU
// CONTEXTE ET DE LA MORPHOLOGIE pour comprendre les mots inconnus ».
//
// ⭐⭐ ET C'EST LA MÊME PHRASE DU BO QUI DONNE LE FIL, PARCE QU'ELLE EN NOMME
// DEUX : le contexte, ET la morphologie. `vocabulaire_sens` regarde AUTOUR du
// mot — la phrase lui donne son sens. Cette notion-ci regarde DEDANS : UN MOT
// EST FAIT DE MORCEAUX, ET LES MORCEAUX ONT UN SENS. Deux façons d'ouvrir un
// mot inconnu, et le programme les cite dans la même ligne.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES CINQ MICROS, ET QUI EST DANS LES QUESTIONS-
// PIÈGES DU POOL : C'EST LE SENS DU MORCEAU QUI COMPTE, PAS SA FORME. Les trois
// pièges du pool disent tous cela, chacun à un étage différent :
//   · « thermite » RESSEMBLE à thermo (chaleur) et ne la contient pas ;
//   · « grandeur » RESSEMBLE à un mot composé et n'en est pas un ;
//   · « ver / verre / vert » se ressemblent totalement et n'ont RIEN de commun.
// D'où le test, dans la signature du CM2 — une vérification, pas un avis :
// COUPE LE MOT ; CHAQUE MORCEAU VEUT-IL DIRE QUELQUE CHOSE ?
//
// ⭐⭐ ET L'HOMONYMIE FERME LA BOUCLE AVEC LA FICHE PRÉCÉDENTE. C'est le SEUL cas
// où regarder dedans ne sert à rien : il faut revenir à la phrase. Les deux
// notions de vocabulaire se tiennent donc par les deux bouts, et l'élève a les
// deux outils — dedans, autour.
//
// ⛔ COMPARAISON AVEC LA 6e, DÉCOUPAGE DIFFÉRENT (vérifié micro par micro) : la
// 6e range formation, composition et racines dans `vocabulaire_relations`, avec
// les synonymes. Le CM2 en fait une notion à part ET Y AJOUTE L'HOMONYMIE, que
// la 6e n'a pas ici.
//
//   | 6e `vocabulaire_relations` | CM2 (ici) |
//   |---|---|
//   | synonymes et antonymes | *(partis dans `vocabulaire_sens`, comme NUANCE)* |
//   | mot simple / dérivé / composé | familles, préfixes, suffixes |
//   | composer et DÉCOMPOSER un mot | composition |
//   | racines latines et grecques | racines latines et grecques |
//   | — | ⭐ L'HOMONYMIE |
//
// ⚠️⚠️ ROUTAGE VÉRIFIÉ LE 30/08 (et non supposé) : `questionParMicro` est
// consulté AVANT `vocabulaireQuestion`, donc `voc_racines`, `voc_composition` et
// `voc_homonymie` atteignent bien leurs pools ; et `cm2_voc_formation_defi` est
// intercepté EN TÊTE de `vocabulaireQuestion` — sans quoi il serait capté par la
// branche générique `includes("formation")` et servi depuis le seul pool des
// familles. Le garde-fou porte un commentaire daté du 20/08 : ne pas le retirer.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools VOC_FAMILLE, RACINES, COMPOSITION et HOMONYMIE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `vocabulaire_formation`) :
// - cm2_voc_famille_prefixe_suffixe → figure, propriétés 1 à 3, méthode 1,
//                                     usage 1, exemples 1 et 2
// - cm2_voc_racines                 → propriétés 4 et 5, formule, méthode 2,
//                                     usage 2, exemples 3 et 4
// - cm2_voc_composition             → propriétés 6 et 7, méthode 3, usage 3, exemple 5
// - cm2_voc_homonymie               → propriétés 8 et 9, méthode 4, usage 4
// - cm2_voc_formation_defi          → propriété 10, exemple 6

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

/** Les morceaux et ce qu'ils disent. ⚠️ Cellules courtes : à la largeur d'un
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

// ─── Ce qui se dessine quand on ouvre un mot ──────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : les morceaux ont un sens, et il s'apprend.
const grilleMorceaux = grille({
  headers: ["Le morceau", "Ce qu'il dit"],
  rows: [
    { values: ["re-", "à nouveau"] },
    { values: ["-able", "qui peut être"] },
    { values: ["biblio", "livre"] },
    { values: ["chrono", "le temps"] },
  ],
  caption: "Un morceau s'apprend une fois et sert dans cent mots.",
});

const couperLeMot = phrase({
  mots: [
    { texte: "re" },
    { texte: "faire", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "à nouveau", type: "question" }],
  legende: "« Refaire » : le préfixe re- dit la répétition. Le morceau a un sens.",
});

// ⭐⭐ LA RÈGLE QUI TIENT TOUTE LA FICHE.
const sensPasForme = phrase({
  mots: [
    { texte: "ressembler", barre: true },
    { texte: "vouloir dire", focus: true },
  ],
  legende: "Le morceau doit avoir un SENS, pas seulement une forme.",
});

// ── FAMILLES, PRÉFIXES, SUFFIXES.
const familleMemeRacine = phrase({
  mots: [
    { texte: "terre" },
    { texte: "terrien", focus: true },
  ],
  legende: "Une famille partage une racine ET un sens proche — les deux à la fois.",
});

const suffixeAble = phrase({
  mots: [
    { texte: "lav" },
    { texte: "able", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "qui peut être", type: "question" }],
  legende: "« Lavable » : qui peut être lavé. Le suffixe fabrique le sens.",
});

// ── RACINES.
const bibliotheque = phrase({
  mots: [
    { texte: "biblio" },
    { texte: "thèque" },
  ],
  legende: "Livre + rangement. Le mot se lit une fois qu'on le coupe.",
});

const thermitePiege = phrase({
  mots: [
    { texte: "thermomètre" },
    { texte: "thermite", barre: true },
  ],
  legende: "« Thermite » ressemble à thermo (chaleur) — et ne la contient pas.",
});

// ── COMPOSITION.
const porteMonnaie = phrase({
  mots: [
    { texte: "porte" },
    { texte: "monnaie" },
  ],
  legende: "« Porte-monnaie » : deux mots réunis, et le sens se lit dans les deux.",
});

const grandeurPiege = phrase({
  mots: [
    { texte: "chou-fleur" },
    { texte: "grandeur", barre: true },
  ],
  legende: "« Grandeur » n'est pas composé : c'est grand + un suffixe, pas deux mots.",
});

// ── HOMONYMIE : ⭐⭐ la limite de la méthode.
const homonymes = phrase({
  mots: [
    { texte: "ver" },
    { texte: "verre" },
    { texte: "vert" },
  ],
  legende: "Ils sonnent pareil et n'ont rien de commun : couper ne sert plus à rien.",
});

const retourALaPhrase = phrase({
  mots: [
    { texte: "dedans", barre: true },
    { texte: "la phrase", focus: true },
  ],
  legende: "Devant des homonymes, seul le sens de la phrase peut trancher.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireFormationCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "vocabulaire-formation",
  titre: "La formation des mots en CM2 (2026-2027)",
  accroche:
    "Le programme dit de se servir du contexte ET DE LA MORPHOLOGIE. Deux outils, et ils ne regardent pas au même endroit : le contexte regarde AUTOUR du mot, la morphologie regarde DEDANS. Car un mot est fait de morceaux, et les morceaux ont un sens. Mais attention à la règle qui commande tout : C'EST LE SENS DU MORCEAU QUI COMPTE, PAS SA FORME.",
  identite: [
    { label: "Mots clés", valeur: "Famille, préfixe, racine, composé" },
    { label: "Le secret", valeur: "Le sens du morceau, pas sa forme" },
    { label: "Outil", valeur: "Coupe : ça veut dire quelque chose ?" },
  ],
  definition: {
    texte:
      "LES FAMILLES : les mots d'une même famille partagent UNE RACINE ET UN SENS PROCHE — terre et terrien, dent et dentiste. Les deux conditions comptent. LES PRÉFIXES ET LES SUFFIXES fabriquent le sens : « re- » dit la répétition (REfaire, c'est faire à nouveau), « -able » dit la possibilité (lavABLE, c'est qui peut être lavé). LES RACINES latines et grecques sont des morceaux qu'on apprend UNE FOIS et qui servent dans cent mots : BIBLIO, c'est le livre ; CHRONO, c'est le temps ; AQUA, c'est l'eau. LA COMPOSITION, enfin : deux mots réunis en font un troisième — porte-monnaie, chou-fleur, ouvre-boite. ⛔ MAIS PARTOUT LA MÊME RÈGLE : le morceau doit VOULOIR DIRE quelque chose, pas seulement ressembler. « Thermite » ressemble à thermo et ne la contient pas ; « grandeur » ressemble à un mot composé et n'en est pas un. LES HOMONYMES sont le cas extrême : ver, verre, vers, vert se prononcent pareil et n'ont RIEN de commun. Là, couper le mot ne sert plus à rien — il faut revenir à la phrase.",
  },
  figure: {
    schema: pile(grilleMorceaux, sensPasForme),
    legende:
      "Quatre morceaux, et chacun s'apprend une fois pour servir dans des dizaines de mots : quand tu sais que « chrono » veut dire le temps, tu comprends chronomètre, chronologie et chronique sans les avoir jamais rencontrés. Voilà pourquoi cette notion vaut mieux qu'une liste de vocabulaire — elle donne des clés, pas des mots. En bas, la règle qui empêche la méthode de dérailler, et il faut l'avoir en tête tout du long : un morceau qui RESSEMBLE n'est pas un morceau qui VEUT DIRE. C'est la seule chose à vérifier, et elle se vérifie.",
  },
  proprietes: [
    {
      titre: "Une famille : une racine ET un sens proche",
      texte:
        "Terre et terrien, dent et dentiste. Les deux conditions ensemble — une ressemblance de lettres ne suffit jamais.",
      schema: familleMemeRacine,
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Le préfixe se met devant et change le sens",
      texte:
        "« Re- » dit la répétition : refaire, c'est faire à nouveau. Relire, redire, revenir — le même morceau, le même sens partout.",
      schema: couperLeMot,
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Le suffixe se met derrière et fabrique",
      texte:
        "« -able » veut dire qui peut être : lavable, mangeable, réparable. Il transforme un verbe en adjectif au passage.",
      schema: suffixeAble,
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Les racines s'apprennent une fois",
      texte:
        "Biblio (livre), chrono (temps), aqua (eau). Une racine connue ouvre des dizaines de mots jamais rencontrés.",
      schema: grilleMorceaux,
      micros: ["cm2_voc_racines"],
    },
    {
      titre: "Mais ressembler n'est pas contenir",
      texte:
        "« Thermite » commence par les mêmes lettres que thermomètre et n'a rien à voir avec la chaleur. La forme ment, le sens non.",
      schema: thermitePiege,
      micros: ["cm2_voc_racines"],
    },
    {
      titre: "Un mot composé, c'est deux mots réunis",
      texte:
        "Porte-monnaie, chou-fleur, ouvre-boite. Et le sens du tout se lit dans les deux : un ouvre-boite ouvre des boites.",
      schema: porteMonnaie,
      micros: ["cm2_voc_composition"],
    },
    {
      titre: "« Grandeur » n'est pas un mot composé",
      texte:
        "C'est grand + un suffixe : un seul mot, plus un morceau. Un composé demande DEUX MOTS qui existent chacun tout seul.",
      schema: grandeurPiege,
      micros: ["cm2_voc_composition"],
    },
    {
      titre: "Les homonymes n'ont rien de commun",
      texte:
        "Ver, verre, vers, vert. Ils se prononcent pareil et ne partagent aucun sens — ce ne sont pas des mots de la même famille.",
      schema: homonymes,
      micros: ["cm2_voc_homonymie"],
    },
    {
      titre: "Là, il faut revenir à la phrase",
      texte:
        "C'est le seul cas où regarder DEDANS le mot ne sert à rien. L'autre outil reprend la main : le contexte.",
      schema: retourALaPhrase,
      micros: ["cm2_voc_homonymie"],
    },
    {
      titre: "Le défi : couper, et vérifier",
      texte:
        "Coupe le mot. Chaque morceau veut-il dire quelque chose ? Si oui, tu tiens le sens. Si non, tu tenais une ressemblance.",
      schema: sensPasForme,
      micros: ["cm2_voc_formation_defi"],
    },
  ],
  reel: {
    texte:
      "Tu utilises déjà ces morceaux, et tu en fabriques même de nouveaux. Quand quelqu'un dit « c'est infaisable », il n'a peut-être jamais lu ce mot : il a collé « in- » (pas) devant « faisable » (qui peut être fait), et tout le monde comprend du premier coup. C'est exactement ce que fait la langue depuis des siècles, et c'est pour cela que le vocabulaire ne s'apprend pas mot par mot. Un élève qui connait vingt racines et dix préfixes comprend des centaines de mots qu'il n'a jamais vus — pendant qu'un autre apprend une liste de vingt mots et n'en comprend que vingt.",
  },
  historique: {
    texte:
      "Le grec « thêkê » voulait dire un coffre, un endroit où l'on range. Il a donné la seconde moitié de BIBLIOTHÈQUE — le rangement des livres — et il aurait pu en rester là, comme un morceau de mot mort. Mais au XXe siècle, quand il a fallu nommer des lieux nouveaux, on est allé le rechercher : la DISCOTHÈQUE range des disques, la LUDOTHÈQUE des jeux, la MÉDIATHÈQUE des médias. Le morceau avait plus de deux-mille ans, et il fabriquait encore des mots dont le grec ancien n'avait aucune idée. C'est la meilleure preuve que ces morceaux ne sont pas des curiosités d'étymologie : on ne réemploie que ce qui veut encore dire quelque chose.",
  },
  formule: {
    contexte: "Le test qui sépare un vrai morceau d'une simple ressemblance.",
    expression: "coupe : ça veut dire quelque chose ?",
    legende:
      "« Thermomètre » : thermo veut dire chaleur, mètre veut dire mesure — les deux morceaux parlent, le mot est lisible. « Thermite » : on croit couper thermo, mais le reste ne dit rien et le mot n'a aucun rapport avec la chaleur. Si un morceau ne veut rien dire, tu n'avais pas coupé le mot : tu avais coupé des lettres.",
    schema: sensPasForme,
  },
  methode: [
    {
      titre: "Chercher un mot connu à l'intérieur",
      texte:
        "Devant un mot inconnu, cherche d'abord un morceau que tu reconnais. Il donne souvent la moitié du sens à lui seul.",
      schema: couperLeMot,
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Se faire une liste de racines",
      texte:
        "Vingt racines suffisent pour des centaines de mots. C'est le meilleur rapport entre ce qu'on apprend et ce que cela ouvre.",
      schema: grilleMorceaux,
      micros: ["cm2_voc_racines"],
    },
    {
      titre: "Vérifier que les deux morceaux existent seuls",
      texte:
        "Pour un composé : « porte » existe, « monnaie » existe. Dans « grandeur », « deur » n'existe pas — ce n'est donc pas un composé.",
      schema: grandeurPiege,
      micros: ["cm2_voc_composition"],
    },
    {
      titre: "Devant des homonymes, relire la phrase",
      texte:
        "Le mot ne dira rien : il est identique à ses jumeaux. Seul ce qui l'entoure peut dire lequel c'est.",
      schema: retourALaPhrase,
      micros: ["cm2_voc_homonymie"],
    },
  ],
  usages: [
    {
      titre: "Pour comprendre un mot jamais vu",
      detail:
        "C'est l'usage principal, et il marche dans toutes les matières : la plupart des mots savants sont faits de morceaux connus.",
      schema: couperLeMot,
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Pour apprendre cent mots en apprenant vingt morceaux",
      detail:
        "Une racine ouvre une famille entière. C'est ce qui distingue apprendre du vocabulaire d'apprendre une liste.",
      schema: grilleMorceaux,
      micros: ["cm2_voc_racines"],
    },
    {
      titre: "Pour deviner ce que fait un objet",
      detail:
        "Ouvre-boite, tire-bouchon, porte-clés : le mot composé dit ce que la chose fait. C'est le mode d'emploi dans le nom.",
      schema: porteMonnaie,
      micros: ["cm2_voc_composition"],
    },
    {
      titre: "Pour ne pas écrire « un verre de terre »",
      detail:
        "Les homonymes sont la première cause de fautes de ce genre. Le son ne tranche pas ; le sens de la phrase, oui.",
      schema: homonymes,
      micros: ["cm2_voc_homonymie"],
    },
  ],
  exemples: [
    {
      titre: "Une famille de mots",
      donnees: "« Quel mot appartient à la même famille que terre ? »",
      schema: familleMemeRacine,
      question: "Lequel ?",
      solution:
        "TERRIEN. Les mots d'une famille partagent UNE MÊME RACINE ET UN SENS PROCHE — les deux ensemble. « Terrible » commence pareil et ne parle pas de la terre : c'est une ressemblance de lettres, pas une famille.",
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Un préfixe",
      donnees: "« Avec le préfixe re-, que veut dire refaire ? »",
      schema: couperLeMot,
      question: "Que veut dire le mot ?",
      solution:
        "FAIRE À NOUVEAU. Le préfixe « re- » indique la répétition, et il le fait partout de la même façon : relire, redire, revenir, recommencer. Un morceau appris une fois se retrouve dans des dizaines de mots.",
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      titre: "Une racine grecque",
      donnees: "« Dans bibliothèque, que veut dire la racine grecque biblio ? »",
      schema: bibliotheque,
      question: "Elle veut dire quoi ?",
      solution:
        "LIVRE. Et « thèque » veut dire rangement : une bibliothèque range des livres. Coupe le mot, et il se lit tout seul — c'est vrai aussi de discothèque, ludothèque et médiathèque, fabriqués bien plus tard avec le même morceau.",
      micros: ["cm2_voc_racines"],
    },
    {
      titre: "Le piège de la ressemblance",
      donnees: "« Quel mot NE contient PAS la racine thermo (chaleur) ? »",
      schema: thermitePiege,
      question: "Lequel ?",
      solution:
        "THERMITE. Il commence par les mêmes lettres que thermomètre, et il n'a rien à voir avec la chaleur. C'est LA règle de toute cette notion : un morceau doit VOULOIR DIRE quelque chose, pas seulement ressembler à un morceau connu.",
      micros: ["cm2_voc_racines"],
    },
    {
      titre: "Un mot composé",
      donnees: "« Lequel de ces mots N'EST PAS un mot composé ? »",
      schema: grandeurPiege,
      question: "Lequel ?",
      solution:
        "GRANDEUR. C'est « grand » plus un suffixe : un seul mot et un morceau. Un mot composé demande DEUX MOTS qui existent chacun tout seul — comme porte et monnaie, ou chou et fleur.",
      micros: ["cm2_voc_composition"],
    },
    {
      titre: "Le défi",
      donnees: "Tu tombes sur « aquatique » sans l'avoir jamais lu.",
      schema: sensPasForme,
      question: "Comment fais-tu ?",
      solution:
        "TU COUPES, ET TU VÉRIFIES QUE LES MORCEAUX PARLENT. « Aqua » veut dire l'eau — tu le sais par aquarium. Le mot est lisible sans dictionnaire. Puis tu vérifies : c'est la moitié du défi, car deviner juste et deviner par hasard se ressemblent beaucoup.",
      micros: ["cm2_voc_formation_defi"],
    },
  ],
  pieges: [
    "Prendre une ressemblance de lettres pour une famille : « terrible » n'est pas de la famille de terre.",
    "Croire que « thermite » contient thermo : la forme ment, le sens non.",
    "Appeler composé un mot fait d'un mot et d'un suffixe, comme « grandeur ».",
    "Oublier qu'un composé demande deux mots qui existent chacun seul.",
    "Chercher un lien de sens entre des homonymes : ils n'en ont aucun.",
    "Couper un mot en morceaux qui ne veulent rien dire : ce sont des lettres, pas des morceaux.",
    "Apprendre des listes de mots au lieu d'apprendre des racines.",
  ],
  aRetenir: [
    "Le contexte regarde autour du mot ; la morphologie regarde dedans.",
    "C'est le SENS du morceau qui compte, pas sa forme.",
    "Une famille partage une racine ET un sens proche — les deux.",
    "Un composé, c'est deux mots qui existent chacun tout seul.",
    "Devant des homonymes, couper ne sert à rien : on revient à la phrase.",
  ],
  entrainement: [
    {
      question: "« Quel mot appartient à la même famille que terre ? »",
      correction: "Terrien — même racine et sens proche.",
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      question: "« Avec le suffixe -able, lavable signifie… »",
      correction: "Qui peut être lavé.",
      micros: ["cm2_voc_famille_prefixe_suffixe"],
    },
    {
      question: "« Que signifie la racine grecque chrono, dans chronomètre ? »",
      correction: "Le temps.",
      micros: ["cm2_voc_racines"],
    },
    {
      question: "« Quel mot NE contient PAS la racine thermo (chaleur) ? »",
      correction: "Thermite — il ressemble, il ne contient pas.",
      micros: ["cm2_voc_racines"],
    },
    {
      question: "« Quel mot est formé par composition (deux mots réunis) ? »",
      correction: "Porte-monnaie.",
      micros: ["cm2_voc_composition"],
    },
    {
      question: "« Le ver, le verre, le vert » : ces mots sont…",
      correction: "Des homonymes — même son, aucun sens commun.",
      micros: ["cm2_voc_homonymie"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesVocabulaireFormationCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La formation des mots - CM2",
    section: {
      type: "objectif",
      phrase: "Un mot est fait de morceaux",
      sousPhrase:
        "Le contexte regarde autour du mot. La morphologie regarde dedans.",
      encadre: {
        titre: "L'idée",
        texte: "C'est le SENS du morceau qui compte, pas sa forme.",
      },
    },
  },
  {
    titre: "Les morceaux parlent",
    badge: "La formation des mots - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "re-", texte: "À nouveau : refaire, relire, revenir." },
        { titre: "-able", texte: "Qui peut être : lavable, réparable." },
        { titre: "biblio", texte: "Livre : bibliothèque, bibliographie." },
        { titre: "chrono", texte: "Le temps : chronomètre, chronologie." },
      ],
    },
    schema: grilleMorceaux,
  },
  {
    titre: "Le piège de la ressemblance",
    badge: "La formation des mots - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Thermite » ressemble à thermo — et n'a rien à voir avec la chaleur.",
        "« Grandeur » ressemble à un composé — c'est grand + un suffixe.",
        "« Terrible » ressemble à terre — aucun rapport de sens.",
        "⛔ Un morceau doit VOULOIR DIRE, pas seulement ressembler.",
      ],
    },
    schema: sensPasForme,
  },
  {
    titre: "Un mot composé",
    badge: "La formation des mots - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "C'en est un",
        contenu: "Porte-monnaie : « porte » existe seul, « monnaie » aussi.",
      },
      droite: {
        titre: "Ce n'en est pas",
        contenu: "Grandeur : « deur » n'existe pas. Un mot plus un suffixe.",
      },
    },
    schema: porteMonnaie,
  },
  {
    titre: "Là où la méthode s'arrête",
    badge: "La formation des mots - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Ver, verre, vers, vert : même son, AUCUN sens commun.",
        "Ce ne sont pas des mots de la même famille.",
        "Couper le mot ne sert plus à rien — il n'y a rien dedans.",
        "L'autre outil reprend la main : la phrase.",
      ],
    },
    schema: homonymes,
  },
  {
    titre: "À vous",
    badge: "La formation des mots - CM2",
    section: {
      type: "exercice",
      enonce: "Tu tombes sur « aquatique » sans l'avoir jamais lu.",
      question: "Comment fais-tu ?",
      indice: "Tu connais « aquarium ».",
      correction:
        "TU COUPES : « aqua » veut dire l'eau. Le mot est lisible sans dictionnaire. Puis tu VÉRIFIES — deviner juste et deviner par hasard se ressemblent beaucoup.",
    },
    schema: sensPasForme,
  },
];
