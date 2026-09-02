// ─── Fiche de cours : nom, verbe, adjectif, déterminant, pronom (CP) ──────────
// TROISIÈME FICHE DU CYCLE 2, et la première de la notion `classes_mots`, née
// le 02/09/2026 du découpage de `grammaire_phrase` — voir le commentaire de
// `lib/tutor-v4/knowledge/francais/cp/notions.ts`.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET ELLE EST ÉCRITE EN TOUTES LETTRES DANS UN
// INDICE : « Un mot tout seul ne dit pas ce qu'il est. Regarde la phrase. »
// C'est le contraire de ce qu'un enfant croit — il pense qu'un mot EST un nom
// comme une pomme est rouge. Or « la porte » et « il porte » n'ont pas le même
// mot au milieu. La classe n'est pas dans le mot, elle est dans la PHRASE.
//
// ⭐ Et chaque classe a son TEST, jamais une définition à réciter — c'est le
// même principe que les sept essais du CM1 :
//   · le nom          → ça dit ce que C'EST ;
//   · le verbe        → ça dit ce qu'on FAIT ;
//   · le déterminant  → le petit mot planté DEVANT le nom (« ___ chien ») ;
//   · l'adjectif      → on peut l'ENLEVER : la phrase marche encore, mais on en
//                       sait moins ;
//   · le pronom       → il REMPLACE ce dont on vient de parler.
// Les cinq formulations sont celles des `hint` du pool, reprises telles quelles.
//
// Les 5 micros de la notion sont couvertes :
// - cp_gram_nom_verbe    → propriétés 1 et 2, exemple 1, entrainements 1 et 2
// - cp_gram_determinant  → méthode 1, entrainement 3
// - cp_gram_adjectif     → propriété 3, exemple 2, entrainement 4
// - cp_gram_pronom       → propriété 4, méthode 2, entrainement 5
// - cp_gram_defi         → à retenir (la synthèse des quatre tests)
//
// ⭐ TROIS CANVAS DIFFÉRENTS, ET C'EST VOULU : `objets` pour ce qui se nomme,
// `personnage` pour ce qui se fait, `phrase` pour ce qui se manipule. La fiche
// CM1 avait tiré 27 dessins de 2 kinds — c'est la monotonie autant que la
// densité qui la rendait « chargée ».
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/grammaire-phrase.bank.ts`
// (11 items sur les micros de `classes_mots`).

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
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

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

/** ⚠️ `largeurMax` à 230 : le bloc qui reçoit un dessin ne fait que 226 px sur
 *  un téléphone, et la phrase se plie entre les groupes plutôt que de rapetisser. */
function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  liens?: PhraseCanvasLien[];
  legende?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: opts.largeur ?? 230,
      }}
    />
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * La figure porte la définition : le nom et le verbe, nommés sur la phrase.
 *
 * ⛔ ET ELLE N'EN NOMME QUE DEUX, POUR UNE RAISON MESURÉE AU RENDU (02/09/2026).
 * Avec les quatre natures, `PhraseCanvas` écrivait « déterminadjectif » : il
 * pose chaque nature au-dessus de SON mot, et « déterminant » (11 signes) ne
 * tient pas au-dessus de « Le » (2 signes). Les étiquettes ne sortaient pas du
 * cadre — elles se touchaient l'une l'autre, ce qu'aucun vérificateur ne voit.
 * ⭐ Deux natures suffisent d'ailleurs : ce sont celles que la définition dit,
 * et quatre libellés d'un coup, à six ans, c'est une liste à apprendre. Le
 * déterminant et l'adjectif ont chacun leur bloc, avec leur test.
 */
const laPhraseNommee = phrase({
  mots: [
    { texte: "Le" },
    { texte: "petit" },
    { texte: "chien", nature: "nom" },
    { texte: "dort", nature: "verbe" },
  ],
  legende: "Chaque mot a un rôle dans la phrase.",
  largeur: 300,
});

const ceQueCEst = objets({
  elements: [
    { quoi: "pomme", label: "une pomme" },
    { quoi: "chat", label: "un chat" },
    { quoi: "bateau", label: "un bateau" },
  ],
  consigne: "Un nom dit ce que c'est. Colorie les trois.",
});

const ceQuOnFait = perso({
  personnage: "teo",
  pose: "marche",
  expression: "rire",
  bulle: { texte: "Je cours !", forme: "cri" },
  consigne: "Colorie le mot qui dit ce qu'on fait.",
});

/** ⭐ Le test de l'adjectif EST le dessin : on barre « petit », et la phrase
 *  tient encore debout. Aucune définition ne montre cela. */
const onPeutLEnlever = phrase({
  mots: [
    { texte: "Le" },
    { texte: "petit", barre: true },
    { texte: "chien" },
    { texte: "dort" },
  ],
  legende: "La phrase marche encore. On en sait juste moins.",
});

/** ⭐ La flèche de reprise, bleue et pointillée sous la phrase : elle montre
 *  que « il » ne dit rien tout seul — il renvoie à ce qui précède. */
const ilRemplace = phrase({
  mots: [
    { texte: "Le chien" },
    { texte: "dort" },
    { texte: "." },
    { texte: "Il" },
    { texte: "rêve" },
  ],
  liens: [{ de: 3, vers: 0, type: "reprise" }],
  legende: "« Il », c'est le chien.",
  largeur: 300,
});

const leMotPlanteDevant = phrase({
  mots: [
    { texte: "le", nature: "déterminant", focus: true },
    { texte: "chien", nature: "nom" },
  ],
  legende: "Essaie : « ___ chien ». Le petit mot qui rentre est le déterminant.",
});

const nommerCeQuOnVoit = perso({
  personnage: "nina",
  pose: "montre",
  expression: "sourire",
  mode: "couleur",
  bulle: { texte: "Le petit chien dort." },
  consigne: "Quatre mots, quatre rôles.",
  largeur: 300,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheClassesMotsCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "classes-mots",
  titre: `Nom, verbe, adjectif : reconnaitre les mots au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Un mot tout seul ne dit pas ce qu'il est. C'est sa place dans la phrase qui le dit.",
  // ⛔ VIDE EXPRÈS, comme sur les deux autres fiches du cycle 2.
  identite: [],
  definition: {
    texte: [
      "Dans une phrase, chaque mot a un rôle.",
      "Le nom dit ce que c'est. Le verbe dit ce qu'on fait.",
      "Et un mot tout seul ne dit pas ce qu'il est : dans « la porte », « porte » est un nom ; dans « il porte », c'est un verbe. C'est la phrase qui décide.",
    ].join("\n\n"),
  },
  figure: {
    schema: laPhraseNommee,
  },
  proprietes: [
    {
      titre: "Le nom dit ce que c'est",
      texte: "Une chose, un animal, une personne.",
      schema: ceQueCEst,
      micros: ["cp_gram_nom_verbe"],
    },
    {
      titre: "Le verbe dit ce qu'on fait",
      texte: "Cours, dort, mange : c'est l'action.",
      schema: ceQuOnFait,
      micros: ["cp_gram_nom_verbe"],
    },
    {
      titre: "L'adjectif, on peut l'enlever",
      texte: "Il dit comment est la chose.",
      schema: onPeutLEnlever,
      micros: ["cp_gram_adjectif"],
    },
    {
      titre: "Le pronom remplace",
      texte: "Il, elle, ils, elles : ils reprennent ce dont on vient de parler.",
      schema: ilRemplace,
      micros: ["cp_gram_pronom"],
    },
  ],
  reel: {
    texte:
      "Quand tu racontes ta journée, tu emploies déjà tous ces mots. Les nommer sert à comprendre pourquoi on écrit « le chien » et pas « le chiens ».",
  },
  // ⛔ VIDE EXPRÈS : l'histoire d'une notion ne parle pas à un enfant de six ans.
  historique: { texte: "" },
  methode: [
    {
      titre: "Le déterminant : je le plante devant un nom",
      texte: "« ___ chien » : le petit mot qui rentre est le déterminant.",
      schema: leMotPlanteDevant,
      micros: ["cp_gram_determinant"],
    },
    {
      titre: "Le pronom : je cherche de qui on parle",
      texte: "« Il », c'est qui ? La réponse est juste avant.",
      schema: ilRemplace,
      micros: ["cp_gram_pronom"],
    },
  ],
  // ⛔ VIDE, comme sur l'étalon du cycle 3.
  usages: [],
  exemples: [
    {
      titre: "Le même mot, deux rôles",
      donnees: "« la porte » et « il porte »",
      question: "« porte » est-il un nom ou un verbe ?",
      solution: "Les deux ! Dans « la porte », c'est un nom. Dans « il porte », c'est un verbe. C'est la phrase qui décide.",
      schema: nommerCeQuOnVoit,
      micros: ["cp_gram_nom_verbe"],
    },
    {
      titre: "Enlever pour voir",
      donnees: "Le petit chien dort.",
      question: "Quel mot peut-on enlever sans casser la phrase ?",
      solution: "« petit ». On obtient « Le chien dort. » : ça marche encore, mais on en sait moins.",
      schema: onPeutLEnlever,
      micros: ["cp_gram_adjectif"],
    },
  ],
  pieges: [
    "Un mot tout seul ne dit pas ce qu'il est : il faut la phrase.",
    "Enlever le nom casse la phrase. Enlever l'adjectif, non.",
  ],
  aRetenir: [
    "Le nom dit ce que c'est.",
    "Le verbe dit ce qu'on fait.",
    "Le déterminant se plante devant le nom.",
    "L'adjectif s'enlève sans casser la phrase.",
    "Le pronom remplace ce dont on vient de parler.",
  ],
  entrainement: [
    {
      question: "Dans « Le chien dort. », quel mot est le verbe ?",
      correction: "« dort » — c'est ce qu'on fait.",
      micros: ["cp_gram_nom_verbe"],
    },
    {
      question: "Dans « Le chien dort. », quel mot est le nom ?",
      correction: "« chien » — c'est ce que c'est.",
      micros: ["cp_gram_nom_verbe"],
    },
    {
      question: "Quel petit mot peut-on planter devant « chien » ?",
      correction: "« le », « un », « ce »… Ce sont des déterminants.",
      micros: ["cp_gram_determinant"],
    },
    {
      question: "Dans « Le grand chat saute. », quel mot peut-on enlever ?",
      correction: "« grand ». La phrase marche encore, mais on en sait moins.",
      micros: ["cp_gram_adjectif"],
    },
    {
      question: "« Léa joue. Elle rit. » Qui est « Elle » ?",
      correction: "Léa. Le pronom remplace ce dont on vient de parler.",
      micros: ["cp_gram_pronom", "cp_gram_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesClassesMotsCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Les mots - CP",
    section: {
      type: "objectif",
      phrase: "C'est la phrase qui décide",
      sousPhrase: "Un mot tout seul ne dit pas ce qu'il est.",
      encadre: { titre: "L'idée", texte: "« la porte » ou « il porte » ?" },
    },
  },
  {
    titre: "Quatre rôles dans une phrase",
    badge: "Les mots - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le nom", texte: "Ce que c'est." },
        { titre: "Le verbe", texte: "Ce qu'on fait." },
        { titre: "L'adjectif", texte: "Comment c'est." },
      ],
    },
    schema: laPhraseNommee,
  },
  {
    titre: "Le test de l'adjectif",
    badge: "Les mots - CP",
    section: {
      type: "etapes",
      etapes: [
        "J'enlève le mot.",
        "Je relis la phrase.",
        "Si elle marche encore, c'était un adjectif.",
      ],
    },
    schema: onPeutLEnlever,
  },
  {
    titre: "À vous",
    badge: "Les mots - CP",
    section: {
      type: "exercice",
      enonce: "« Le grand chat saute. »",
      question: "Quel mot peut-on enlever sans casser la phrase ?",
      indice: "Essaie sans lui, et relis.",
      correction: "« grand » — la phrase marche encore, mais on en sait moins.",
    },
    schema: onPeutLEnlever,
  },
];
