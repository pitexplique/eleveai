// ─── Fiche d'activité : choisir et relier ses lectures (CP) ───────────────────
// SEIZIÈME ET DERNIÈRE FICHE DU CP. Elle ne fait ni lire ni écrire : elle
// apprend à se conduire dans les livres.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE EST UNE PHRASE DU POOL, ET ELLE TIENT TOUTE LA NOTION :
// « Le choix commence dans ta tête, pas sur l'étagère. »
// Un enfant devant une étagère prend le livre le plus joli, ou le plus fin, et
// se retrouve avec un livre qu'il ne voulait pas. La parade n'est pas de mieux
// regarder les couvertures : c'est de savoir CE QU'ON CHERCHE avant de tendre
// la main. Les cinq objectifs du BO — reconnaitre des types de personnages,
// distinguer les sortes de livres, choisir, relier ses lectures, fréquenter des
// lieux — sont tous des façons de se construire cette carte-là.
//
// ⭐ ET LE SECOND FIL DIT OÙ EST LA CARTE : « on relie par ce qui est DANS
// l'histoire, pas par l'objet. » Deux livres ne vont pas ensemble parce qu'ils
// ont la même taille ou la même couleur, mais parce qu'il s'y passe quelque
// chose de semblable. C'est ce qui transforme une pile de livres lus en une
// mémoire de lecteur.
//
// ⭐ LES TYPES DE PERSONNAGES SONT LE PREMIER OUTIL DE CETTE CARTE, et le pool
// le formule bien : « ces personnages reviennent d'une histoire à l'autre, tu
// les connais déjà ». Le loup, l'ogre, la fée, le héros : un enfant qui les
// reconnait entre dans une histoire neuve en terrain connu.
//
// ⛔ CE QUE LA FEUILLE NE PEUT PAS FAIRE : elle ne fait pas fréquenter une
// bibliothèque, et le BO demande de le faire « régulièrement ». Elle prépare
// la visite — savoir ce qu'on y cherche — elle ne la remplace pas.
//
// ⭐ POURQUOI ELLE VIENT EN DERNIER : ses 6 micros dépendent de
// `cp_comp_personnage` et `cp_comp_question_simple` — la fiche de compréhension,
// écrite juste avant. On ne choisit pas ses lectures avant de savoir lire.
//
// Les 6 micros sont couvertes :
// - cp_lect_types_personnages  → figure, propriété 1, exemple 1, entrainements 1 et 2
// - cp_lect_narratif_informatif→ propriété 2, entrainements 3 et 4
// - cp_lect_sortes_de_livres   → propriété 3, entrainements 5 et 6
// - cp_lect_choisir_livre      → propriété 4, méthode 1, exemple 2, entrainement 7
// - cp_lect_relier_lectures    → propriété 5, méthode 2, entrainements 8 et 9
// - cp_lect_lieux_lecture      → propriété 6, entrainement 10
//
// Les personnages, les sortes de livres et les textes sont ceux du pool
// (PERSONNAGES, SORTES_LIVRES, TEXTES_TYPE), repris tels quels.
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/oral-et-lecteur.bank.ts`.

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

function etiquettes(opts: {
  cases: string[];
  focus?: number[];
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.cases.map((c, i) => ({
    texte: c,
    focus: opts.focus?.includes(i),
  }));
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "phrase",
          mots,
          legende: opts.legende,
          largeurMax: opts.largeur ?? 280,
        }}
      />
    </div>
  );
}

/**
 * ⭐ LE TEXTE EN CLAIR, comme sur la fiche de compréhension. Deux extraits à
 * comparer ne sont pas des dessins : ce sont des textes, et un texte rendu en
 * SVG ne se sélectionne pas, ne se lit pas à voix haute par un lecteur d'écran,
 * et rétrécit au lieu de se replier.
 */
function extrait(lignes: string[]) {
  return (
    <div className="fiche-texte rounded-2xl border-2 border-sky-200 bg-sky-50/60 px-4 py-3 text-sm leading-7 text-slate-800 print:text-xs print:leading-6">
      {lignes.map((l) => (
        <p key={l} className="m-0">
          {l}
        </p>
      ))}
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE : LES PERSONNAGES QUI REVIENNENT. Le loup, l'ogre, la fée, le
 * héros ne sont pas les héros d'UNE histoire — ce sont des rôles qu'on
 * retrouve d'un livre à l'autre. Les voir alignés, c'est comprendre qu'on entre
 * dans une histoire neuve en terrain déjà connu.
 */
const lesPersonnagesQuiReviennent = etiquettes({
  cases: ["le loup", "l'ogre", "la fée", "le héros"],
  legende: "Ils reviennent d'une histoire à l'autre. Tu les connais déjà.",
  largeur: 320,
});

const leLoupSeReconnait = etiquettes({
  cases: ["de grandes dents", "il fait peur", "il rôde la nuit"],
  legende: "Trois indices, et on sait qui c'est avant qu'on le nomme.",
  largeur: 320,
});

/** ⭐ Deux extraits qui ne se ressemblent que par leur sujet : l'un raconte,
 *  l'autre apprend. La question du pool est la meilleure : « est-ce qu'il se
 *  passe quelque chose, ou est-ce qu'on t'apprend quelque chose ? » */
const raconterOuInformer = extrait([
  "Il était une fois un margouillat qui voulait voir la mer.",
  "Le margouillat est un petit lézard. Il vit sur les murs.",
]);

const lesSortesDeLivres = etiquettes({
  cases: ["un album", "un conte", "une fable", "un poème"],
  legende: "Chaque sorte se reconnait à sa forme, avant même de la lire.",
  largeur: 320,
});

const choisirDansSaTete = perso({
  personnage: "nina",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Je veux une histoire qui fait peur.", forme: "pensee" },
  consigne: "Le choix commence dans ta tête, pas sur l'étagère.",
});

const relierParLHistoire = etiquettes({
  cases: ["un loup", "un loup"],
  focus: [0, 1],
  legende: "Deux histoires vont ensemble par ce qui s'y passe, pas par la couleur du livre.",
  largeur: 300,
});

const lesLieuxDeLecture = objets({
  elements: [
    { quoi: "livre", label: "la classe" },
    { quoi: "cartable", label: "la maison" },
    { quoi: "maison", label: "la bibliothèque" },
  ],
  colonnes: 2,
  consigne: "On lit à trois endroits au moins, et on y retourne souvent.",
  largeur: 280,
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON : on entoure le personnage
   qu'annoncent les indices, on barre le texte qui n'est pas une histoire, on
   relie deux lectures par ce qu'elles racontent.
   ⛔ Ni `consigne` ni `legende` ici : l'énoncé numéroté les porte déjà. */

const exIndicesOgre = etiquettes({
  cases: ["il est énorme", "il a très faim", "il vit dans un château"],
  largeur: 320,
});

const exQuatrePersonnages = etiquettes({
  cases: ["la fée", "l'ogre", "le loup", "le pêcheur"],
  largeur: 320,
});

const exDeuxTextes = extrait([
  "Un matin, Nina trouva une plume bleue devant sa porte.",
  "Le letchi pousse sur un arbre. Sa peau est rouge.",
]);

const exTexteInformatif = extrait([
  "La Réunion est une île. Son point le plus haut est le piton des Neiges.",
]);

const exIndicesPoeme = etiquettes({
  cases: ["les lignes sont courtes", "les mots riment"],
  largeur: 300,
});

const exSortes = etiquettes({
  cases: ["un album", "une pièce de théâtre", "un documentaire"],
  largeur: 320,
});

const exChoisir = perso({
  personnage: "nina",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Je veux une histoire qui fait peur.", forme: "pensee" },
  largeur: 250,
});

const exDeuxLoups = etiquettes({
  cases: ["un loup qui parle", "un loup dans la forêt"],
  largeur: 320,
});

const exFauxLien = etiquettes({
  cases: ["les deux sont bleus", "les deux ont un loup"],
  largeur: 320,
});

const exLieux = objets({
  elements: [
    { quoi: "livre", label: "la classe" },
    { quoi: "maison", label: "la bibliothèque" },
  ],
  colonnes: 2,
  largeur: 260,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheDevenirLecteurCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "devenir_lecteur",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Choisir et relier ses lectures au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Le choix commence dans ta tête, pas sur l'étagère.",
  identite: [],
  definition: {
    texte: [
      "Un lecteur ne prend pas un livre au hasard : il sait déjà ce qu'il y cherche.",
      "Pour cela, il reconnait ce qu'il a devant lui. Certains personnages reviennent d'une histoire à l'autre — le loup, l'ogre, la fée, le héros. Certains textes racontent, d'autres apprennent quelque chose. Et chaque sorte de livre a sa forme.",
      "Et il relie ses lectures entre elles par ce qui s'y passe, pas par la taille ou la couleur du livre.",
    ].join("\n\n"),
  },
  figure: {
    schema: lesPersonnagesQuiReviennent,
  },
  proprietes: [
    {
      titre: "Les personnages se reconnaissent",
      texte: "De grandes dents, il fait peur, il rôde la nuit : c'est le loup.",
      schema: leLoupSeReconnait,
      micros: ["cp_lect_types_personnages"],
    },
    {
      titre: "Raconter, ou apprendre quelque chose",
      texte: "Se passe-t-il quelque chose, ou t'apprend-on quelque chose ?",
      schema: raconterOuInformer,
      micros: ["cp_lect_narratif_informatif"],
    },
    {
      titre: "Chaque sorte de livre a sa forme",
      texte: "Un album a de grandes images. Un poème a des lignes courtes qui riment.",
      schema: lesSortesDeLivres,
      micros: ["cp_lect_sortes_de_livres"],
    },
    {
      titre: "On choisit avec ce qu'on veut",
      texte: "D'abord je sais ce que je cherche, ensuite je regarde l'étagère.",
      schema: choisirDansSaTete,
      micros: ["cp_lect_choisir_livre"],
    },
    {
      titre: "On relie par ce qui est dans l'histoire",
      texte: "Deux livres vont ensemble s'il s'y passe quelque chose de semblable.",
      schema: relierParLHistoire,
      micros: ["cp_lect_relier_lectures"],
    },
    {
      titre: "On lit à plusieurs endroits",
      texte: "En classe, à la maison, et à la bibliothèque — où on retourne souvent.",
      schema: lesLieuxDeLecture,
      micros: ["cp_lect_lieux_lecture"],
    },
  ],
  reel: {
    texte:
      "Plus tu lis, plus tu reconnais. Et plus tu reconnais, plus il devient facile de trouver le livre suivant : c'est ce qui fait qu'on aime lire.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je pars de ce que je veux",
      texte: "Une histoire qui fait peur ? Des vrais renseignements ? Je choisis après.",
      schema: choisirDansSaTete,
      micros: ["cp_lect_choisir_livre"],
    },
    {
      titre: "Je cherche ce que deux livres ont en commun",
      texte: "Un point commun doit être vrai des DEUX histoires, pas d'une seule.",
      schema: relierParLHistoire,
      micros: ["cp_lect_relier_lectures"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Trois indices, un personnage",
      donnees: "Il est énorme, il a très faim, et il vit dans un château.",
      question: "De qui parle-t-on ?",
      solution:
        "De l'ogre. On le reconnait sans qu'il soit nommé, parce qu'on l'a déjà rencontré ailleurs.",
      schema: exIndicesOgre,
      micros: ["cp_lect_types_personnages"],
    },
    {
      titre: "Devant l'étagère",
      donnees: "Tu es devant l'étagère et tu ne sais pas quoi prendre.",
      question: "Que fais-tu ?",
      solution:
        "Je me demande d'abord ce que j'ai envie de lire — une histoire, ou des renseignements. Le choix commence dans ma tête.",
      schema: choisirDansSaTete,
      micros: ["cp_lect_choisir_livre"],
    },
  ],
  pieges: [
    "On ne choisit pas un livre parce qu'il est joli, mais parce qu'on sait ce qu'on veut.",
    "Deux livres ne vont pas ensemble parce qu'ils ont la même couleur : on relie par l'histoire.",
  ],
  aRetenir: [
    "Le choix commence dans ma tête, pas sur l'étagère.",
    "Certains personnages reviennent : le loup, l'ogre, la fée, le héros.",
    "Un texte raconte quelque chose, ou m'apprend quelque chose.",
    "Chaque sorte de livre a sa forme : album, conte, fable, poème, théâtre, documentaire.",
    "Je relie deux lectures par ce qui s'y passe, jamais par la taille du livre.",
  ],
  /* ⭐ Dix exercices, neuf avec un support à entourer, barrer ou relier.
     Les corrections s'impriment sur leur propre page. */
  entrainement: [
    {
      question: "Ces trois indices annoncent un personnage. Écris son nom.",
      correction: "L'ogre. Énorme, affamé, et il vit dans un château.",
      schema: exIndicesOgre,
      micros: ["cp_lect_types_personnages"],
    },
    {
      question: "Barre celui qu'on ne rencontre PAS dans les contes.",
      correction: "On barre « le pêcheur » : la fée, l'ogre et le loup reviennent d'une histoire à l'autre.",
      schema: exQuatrePersonnages,
      micros: ["cp_lect_types_personnages"],
    },
    {
      question: "Entoure le texte qui raconte une histoire.",
      correction: "Le premier : « Un matin, Nina trouva une plume bleue. » Il s'y passe quelque chose.",
      schema: exDeuxTextes,
      micros: ["cp_lect_narratif_informatif"],
    },
    {
      question: "Ce texte raconte-t-il, ou apprend-il quelque chose ?",
      correction: "Il apprend quelque chose : c'est un texte qui informe, pas une histoire.",
      schema: exTexteInformatif,
      micros: ["cp_lect_narratif_informatif"],
    },
    {
      question: "Ces deux indices désignent une sorte de livre. Laquelle ?",
      correction: "Un poème : des lignes courtes, et des mots qui riment.",
      schema: exIndicesPoeme,
      micros: ["cp_lect_sortes_de_livres"],
    },
    {
      question: "Entoure celui où le nom de celui qui parle est écrit avant chaque phrase.",
      correction: "Une pièce de théâtre : elle est écrite pour être jouée.",
      schema: exSortes,
      micros: ["cp_lect_sortes_de_livres"],
    },
    {
      question: "Nina veut une histoire qui fait peur. Quel livre lui faut-il ?",
      correction: "Un conte avec un loup ou un ogre — pas un documentaire, même très joli.",
      schema: exChoisir,
      micros: ["cp_lect_choisir_livre"],
    },
    {
      question: "Qu'est-ce que ces deux histoires ont en commun ?",
      correction: "Un loup. Le point commun doit être vrai des DEUX histoires.",
      schema: exDeuxLoups,
      micros: ["cp_lect_relier_lectures"],
    },
    {
      question: "Barre le point commun qui ne dit rien sur les histoires.",
      correction: "On barre « les deux sont bleus » : c'est l'objet, pas l'histoire.",
      schema: exFauxLien,
      micros: ["cp_lect_relier_lectures"],
    },
    {
      question: "Colorie les endroits où tu peux lire, et entoure celui où l'on emprunte.",
      correction: "On lit en classe et à la bibliothèque — et c'est à la bibliothèque qu'on emprunte.",
      schema: exLieux,
      micros: ["cp_lect_lieux_lecture"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesDevenirLecteurCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Devenir lecteur - CP",
    section: {
      type: "objectif",
      phrase: "Le choix commence dans ta tête",
      sousPhrase: "…pas sur l'étagère.",
      encadre: {
        titre: "L'idée",
        texte: "Un lecteur sait ce qu'il cherche avant de tendre la main.",
      },
    },
    schema: lesPersonnagesQuiReviennent,
  },
  {
    titre: "Ceux qu'on connait déjà",
    badge: "Devenir lecteur - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "le loup", texte: "de grandes dents" },
        { titre: "l'ogre", texte: "énorme et affamé" },
        { titre: "la fée", texte: "une baguette" },
      ],
    },
    schema: leLoupSeReconnait,
  },
  {
    titre: "Devant l'étagère",
    badge: "Devenir lecteur - CP",
    section: {
      type: "etapes",
      etapes: [
        "Qu'est-ce que j'ai envie de lire ?",
        "Une histoire, ou des renseignements ?",
        "Ensuite seulement, je regarde les livres.",
      ],
    },
    schema: choisirDansSaTete,
  },
  {
    titre: "À vous",
    badge: "Devenir lecteur - CP",
    section: {
      type: "exercice",
      enonce: "Deux histoires : dans l'une un loup parle, dans l'autre un loup rôde dans la forêt.",
      question: "Qu'ont-elles en commun ?",
      indice: "Le point commun doit être vrai des DEUX histoires.",
      correction: "Un loup — et pas la couleur ou la taille du livre.",
    },
    schema: relierParLHistoire,
  },
];
