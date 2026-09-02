// ─── Fiche d'activité : le sens des mots (CP) ─────────────────────────────────
// QUATRIÈME FICHE DU CYCLE 2, et la première qui fait travailler la
// bibliothèque d'objets (`kind: "objets"`, 22 dessins) — elle était construite
// depuis le 02/09 sans qu'aucune fiche l'emploie.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET C'EST UN CONTRE-EXEMPLE : « Se ressembler
// ne suffit pas : il faut aussi que le sens aille ensemble. » Un enfant range
// les mots par leur allure — « chapeau » ressemble à « chat », donc c'est la
// même famille. La règle qui ne dit pas où elle s'arrête se retourne au premier
// contre-exemple ; celui-ci est donc DANS la fiche, dessiné et barré.
//
// ⭐ Et chaque relation a son TEST, jamais une définition :
//   · la famille        → un morceau commun ET un sens qui se tient ;
//   · le champ lexical  → « trois de ces mots vivent au même endroit, un seul
//                          est de passage » (l'intrus) ;
//   · le synonyme       → il remplace le mot sans changer la phrase ;
//   · le contraire      → il dit exactement l'inverse ;
//   · le mot inconnu    → le reste de la phrase met sur la piste.
// Les cinq formulations sont celles des `hint` du pool.
//
// ⛔ LA NOTION N'EST PAS DÉCOUPÉE, ET C'EST MESURÉ. `vocabulaire` a la même
// forme que l'ancienne `grammaire_phrase` — 10 micros, deux racines
// (`mot_inconnu` et `ordre_alphabetique`, sans prérequis). Mais l'argument qui
// avait tranché ne s'applique pas : le CE1 et le CE2 n'ont **qu'une** notion de
// vocabulaire, comme le CP. Le découpage arrive au CM1 (`vocabulaire_sens`,
// `_relations`, `_emploi`), et il y est déjà fait.
//
// Cette fiche couvre la branche DU SENS (6 micros sur 10) :
// - cp_voc_champ_lexical → figure, propriété 1, entrainement 1
// - cp_voc_famille       → propriété 2, exemple 1, entrainement 2
// - cp_voc_antonyme      → propriété 3, entrainement 3
// - cp_voc_polysemie     → propriété 4, exemple 2, entrainement 4
// - cp_voc_mot_inconnu   → méthode 1, entrainement 5
// - cp_voc_synonyme      → méthode 2
// ⚠️ `cp_voc_ordre_alphabetique`, `cp_voc_dictionnaire` et `cp_voc_defi` sont
// l'AUTRE racine : une leçon d'outil, pas de sens. Elle demande sa feuille.
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/vocabulaire.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ObjetsElement,
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function objets(opts: {
  elements: ObjetsElement[];
  colonnes?: number;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "objets",
        elements: opts.elements,
        colonnes: opts.colonnes,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

function perso(opts: {
  personnage: PersonnageId;
  pose?: PersonnagePose;
  expression?: PersonnageExpression;
  bulle?: PersonnageBulle;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "personnage",
        personnage: opts.personnage,
        pose: opts.pose,
        expression: opts.expression,
        bulle: opts.bulle,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  legende?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        legende: opts.legende,
        largeurMax: opts.largeur ?? 230,
      }}
    />
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/** ⭐ La figure porte la découverte en image : trois mots du jardin, et un qui
 *  n'y vit pas. C'est la forme même des questions du pool. */
/* ⛔ DEUX FAUTES CORRIGÉES AU RENDU (02/09/2026), et aucune ne se lisait dans
   le code. La voiture portait `marque: true` : elle était DÉJÀ entourée sous
   une consigne qui disait « entoure » — l'exercice donnait sa réponse. Et le
   groupe « bateau, poisson, papillon » avait DEUX intrus, pas un : seuls les
   deux premiers vivent sur l'eau. Le jardin, lui, tient à trois. */
const lIntrus = objets({
  elements: [
    { quoi: "arbre", label: "un arbre" },
    { quoi: "fleur", label: "une fleur" },
    { quoi: "papillon", label: "un papillon" },
    { quoi: "bateau", label: "un bateau" },
  ],
  colonnes: 2,
  consigne: "Trois vivent au même endroit. Entoure celui qui est de passage.",
  largeur: 300,
});

const memeEndroit = objets({
  elements: [
    { quoi: "maison", label: "une maison" },
    { quoi: "cle", label: "une clé" },
    { quoi: "tasse", label: "une tasse" },
  ],
  consigne: "Ces trois mots parlent de la maison. Colorie-les.",
});

/**
 * ⭐⭐ LE CONTRE-EXEMPLE EST DESSINÉ, PAS RACONTÉ. « chapeau » commence comme
 * « chat » et n'est pas de sa famille : barré, il dit à lui seul la règle et sa
 * limite. C'est ce que le pool appelle « se ressembler ne suffit pas ».
 */
const laFamilleDuChat = phrase({
  mots: [
    { texte: "chat" },
    { texte: "chaton" },
    { texte: "chatte" },
    { texte: "chapeau", barre: true },
  ],
  legende: "Un morceau commun, et le sens qui va avec.",
  largeur: 280,
});

/**
 * ⭐ Le contraire se lit sur un visage avant de se lire dans un mot.
 *
 * ⛔ ET UN SEUL VISAGE, PAS DEUX — mesuré au rendu. Empiler « content » et
 * « triste » donnait une carte deux fois plus haute que ses voisines : la
 * rangée entière suivait, et la feuille passait de 2 à 3 pages. Le mot
 * « content » est déjà dans le texte de la propriété ET dans la consigne ;
 * le dessin n'a besoin de porter que celui qu'on cherche.
 */
const leContraireTriste = perso({
  personnage: "zoe",
  pose: "debout",
  expression: "triste",
  bulle: { texte: "Je suis triste." },
  consigne: "triste, le contraire de content.",
});

/** ⭐ Un seul mot, deux choses : la feuille de l'arbre et la feuille du cahier.
 *  Deux dessins que rien ne rapproche, sauf le mot. */
const unMotDeuxChoses = objets({
  elements: [
    { quoi: "feuille", label: "une feuille" },
    { quoi: "livre", label: "une feuille" },
  ],
  consigne: "Le même mot, et pourtant deux choses.",
});

const devinerParLaPhrase = perso({
  personnage: "nina",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Range ton cartable !" },
  consigne: "Même sans connaitre le mot, la phrase met sur la piste.",
});

const remplacerSansChanger = phrase({
  mots: [
    { texte: "Le chien est" },
    { texte: "content", barre: true },
    { texte: "joyeux", focus: true },
  ],
  legende: "Si on peut remplacer sans changer la phrase, c'est un synonyme.",
  largeur: 280,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "vocabulaire",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Le sens des mots au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Se ressembler ne suffit pas. Deux mots ne sont d'une même famille que si le sens va ensemble.",
  // ⛔ VIDE EXPRÈS, comme les trois autres fiches du cycle 2.
  identite: [],
  definition: {
    texte: [
      "Les mots ne vivent pas tout seuls : ils se rangent par familles et par endroits.",
      "« chat », « chaton » et « chatte » ont un morceau commun, et ils parlent tous du même animal : c'est une famille.",
      "Mais « chapeau » commence pareil et ne parle pas du tout d'un chat. Se ressembler ne suffit pas — il faut que le sens aille ensemble.",
    ].join("\n\n"),
  },
  figure: {
    schema: lIntrus,
  },
  proprietes: [
    {
      titre: "Les mots qui vivent au même endroit",
      texte: "La maison, le jardin, l'école : chacun a ses mots.",
      schema: memeEndroit,
      micros: ["cp_voc_champ_lexical"],
    },
    {
      titre: "Une famille de mots",
      texte: "Un morceau commun, et le sens qui suit.",
      schema: laFamilleDuChat,
      micros: ["cp_voc_famille"],
    },
    {
      titre: "Le contraire",
      texte: "Content, triste : deux mots qui disent l'inverse.",
      schema: leContraireTriste,
      micros: ["cp_voc_antonyme"],
    },
    {
      titre: "Un mot, deux choses",
      texte: "La feuille de l'arbre et la feuille du cahier.",
      schema: unMotDeuxChoses,
      micros: ["cp_voc_polysemie"],
    },
  ],
  reel: {
    texte:
      "Quand tu tombes sur un mot que tu ne connais pas, tu n'es pas bloqué : la phrase autour te dit souvent de quoi il s'agit.",
  },
  // ⛔ VIDE EXPRÈS : l'histoire d'une notion ne parle pas à un enfant de six ans.
  historique: { texte: "" },
  methode: [
    {
      titre: "Je devine avec la phrase",
      texte: "Je lis toute la phrase : elle met sur la piste.",
      schema: devinerParLaPhrase,
      micros: ["cp_voc_mot_inconnu"],
    },
    {
      titre: "Je remplace pour vérifier",
      texte: "Si le mot peut en remplacer un autre sans changer la phrase, c'est un synonyme.",
      schema: remplacerSansChanger,
      micros: ["cp_voc_synonyme"],
    },
  ],
  // ⛔ VIDE, comme sur l'étalon du cycle 3.
  usages: [],
  exemples: [
    {
      titre: "Le mot qui se ressemble mais n'est pas de la famille",
      donnees: "chat — chaton — chatte — chapeau",
      question: "Lequel n'est pas de la famille de « chat » ?",
      solution: "« chapeau ». Il commence pareil, mais il ne parle pas d'un chat. Le sens doit suivre.",
      schema: laFamilleDuChat,
      micros: ["cp_voc_famille"],
    },
    {
      titre: "Le même mot pour deux choses",
      donnees: "« la feuille de l'arbre » et « la feuille du cahier »",
      question: "Est-ce le même mot ?",
      solution: "Oui, mais il ne désigne pas la même chose. C'est la phrase qui dit laquelle.",
      schema: unMotDeuxChoses,
      micros: ["cp_voc_polysemie"],
    },
  ],
  pieges: [
    "Se ressembler ne suffit pas : il faut que le sens aille ensemble.",
    "Un mot inconnu n'arrête pas la lecture : la phrase autour aide.",
  ],
  aRetenir: [
    "Une famille de mots : un morceau commun et un sens qui va ensemble.",
    "Des mots du même endroit forment un groupe.",
    "Le contraire dit exactement l'inverse.",
    "Un même mot peut désigner deux choses.",
  ],
  entrainement: [
    {
      question: "arbre, fleur, papillon, bateau : quel mot ne va pas avec les autres ?",
      correction: "« bateau ». Les trois autres vivent au jardin.",
      micros: ["cp_voc_champ_lexical"],
    },
    {
      question: "chat, chaton, chapeau : lequel n'est pas de la famille ?",
      correction: "« chapeau ». Il se ressemble, mais le sens ne suit pas.",
      micros: ["cp_voc_famille"],
    },
    {
      question: "Quel est le contraire de « content » ?",
      correction: "« triste ».",
      micros: ["cp_voc_antonyme"],
    },
    {
      question: "« la feuille de l'arbre », « la feuille du cahier » : même mot ?",
      correction: "Oui, mais pas la même chose. C'est la phrase qui le dit.",
      micros: ["cp_voc_polysemie"],
    },
    {
      question: "« Range ton cartable ! » Que veut dire « cartable » ?",
      correction: "Le sac de l'école. La phrase met sur la piste : on le range.",
      micros: ["cp_voc_mot_inconnu"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesVocabulaireCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Le sens des mots - CP",
    section: {
      type: "objectif",
      phrase: "Se ressembler ne suffit pas",
      sousPhrase: "Il faut aussi que le sens aille ensemble.",
      encadre: { titre: "L'idée", texte: "« chapeau » n'est pas de la famille de « chat »." },
    },
  },
  {
    titre: "Trois façons de ranger les mots",
    badge: "Le sens des mots - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La famille", texte: "Un morceau commun." },
        { titre: "L'endroit", texte: "Le jardin, la mer." },
        { titre: "Le contraire", texte: "Content, triste." },
      ],
    },
    schema: laFamilleDuChat,
  },
  {
    titre: "Le mot de passage",
    badge: "Le sens des mots - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je lis tous les mots.",
        "Je cherche ce qu'ils ont en commun.",
        "Celui qui n'a rien à voir est l'intrus.",
      ],
    },
    schema: lIntrus,
  },
  {
    titre: "À vous",
    badge: "Le sens des mots - CP",
    section: {
      type: "exercice",
      enonce: "chat — chaton — chatte — chapeau",
      question: "Lequel n'est pas de la famille de « chat » ?",
      indice: "Regarde le sens, pas seulement le début du mot.",
      correction: "« chapeau ». Il commence pareil, mais il ne parle pas d'un chat.",
    },
    schema: laFamilleDuChat,
  },
];
