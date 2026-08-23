// ─── Fiche de cours : attribut du sujet et compléments du verbe (6e) ──────────
// LA PREMIÈRE FICHE DE FRANÇAIS DE LA 6e. La classe n'en avait aucune : ses
// notions faisaient jusqu'à NEUF micro-compétences, et une notion de neuf micros
// ne tient dans aucune fiche — c'est l'erreur qu'avait faite
// `francais-cm2-grammaire-orthographe.tsx` (seize micros, dont certaines citées
// sans être traitées), et qui a coûté quatre fiches et trois alias à défaire.
// La 6e a été relue sur le BO le 22/08/2026 : 29 notions de 3 à 5 micros.
//
// ⭐ POURQUOI CELLE-CI D'ABORD. « Opposer et distinguer attribut du sujet et
// complément d'objet direct » est le SEUL objectif que le programme de 6e
// formule comme une opposition — c'est le geste neuf de l'année. Le CM2
// « différencie l'attribut du sujet et le complément d'objet » ; la 6e doit les
// OPPOSER, c'est-à-dire savoir dire pourquoi ce n'est pas le même.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `grammaire_complements`) et sur les pools ATTRIBUT, COD_COI,
// CC_SORTES de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 6e_gram_attribut_cod      → définition, figure, propriété « Le verbe
//                               décide », formule, exemples 1 et 2, piège 1,
//                               entraînements 1 et 2
// - 6e_gram_cod_coi           → propriété « Direct ou indirect », méthode 2,
//                               exemple 3, piège 2, entraînement 3
// - 6e_gram_cc_sortes         → propriété « Le circonstanciel se déplace »,
//                               méthode 3, usages, exemple 4, entraînement 4
// - 6e_gram_complements_defi  → le défi, dessiné (exemple 5) + entraînement 5
//
// Les phrases sont CELLES DE LA BANQUE, sans exception : « Le lagon est calme »,
// « Les letchis sont mûrs », « Mon frère paraît fatigué », « Tom regarde la
// mer », « Léa mange une mangue », « Léa parle à sa grand-mère », « Elle offre
// un cadeau à son frère », « Ils se sont abrités sous le tamarin », « Hier, nous
// sommes allés au marché », « Le samedi, les enfants jouent sur la plage ».
// L'élève qui a lu la fiche doit retrouver ses propres phrases dans le coach.
//
// ⚠️ `largeurMax` EST ÉCRIT, IL NE SE SUBIT PAS. Le défaut réel du composant est
// 250 (`LARGEUR_MAX_DEFAUT` dans PhraseCanvas.tsx) — et non 270 comme le disait
// le CATALOGUE, ni 300 comme le disait `types_canvas.ts` : trois chiffres pour
// un seul réglage, les deux documents ont été corrigés le 22/08. On l'écrit ici
// pour que la phrase se plie en deux lignes plutôt que de rapetisser sur un
// téléphone.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le helper commun à toutes les fiches de français : une seule façon de dessiner
// une phrase, donc un seul dessin à reconnaître pour l'élève. La couleur des
// fonctions est déduite du label par le canvas (sujet bleu, verbe rouge, objet
// vert, circonstanciel orange, attribut violet) : on ne l'écrit jamais ici.
function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  groupes?: PhraseCanvasGroupe[];
  liens?: PhraseCanvasLien[];
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        titre: opts.titre,
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        groupes: opts.groupes,
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 250,
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

// ─── Les phrases de la banque, dessinées ──────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : les deux phrases qui s'opposent, l'une sous l'autre.
// Même place dans la phrase, même longueur de groupe, et pourtant deux fonctions
// différentes. C'est ce que le dessin doit faire voir en une seconde : ce qui
// change, c'est le VERBE.
const phraseAttributRef = phrase({
  mots: [
    { texte: "Le" },
    { texte: "lagon" },
    { texte: "est", focus: true },
    { texte: "calme" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe d'état" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 3, vers: 1, label: "=", type: "accord" }],
  legende: "« calme » dit ce QU'EST le lagon : c'est le même être.",
});

const phraseCodRef = phrase({
  mots: [
    { texte: "Tom" },
    { texte: "regarde", focus: true },
    { texte: "la" },
    { texte: "mer" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe d'action" },
    { mots: [2, 3], label: "COD" },
  ],
  liens: [{ de: 1, vers: 3, label: "quoi ?", type: "question" }],
  legende: "« la mer » n'est pas Tom : c'est ce qu'il regarde.",
});

// Le verbe d'état, montré sur un autre verbe que « être » — sinon l'élève
// retient « être », pas « verbe d'état ».
const phraseParait = phrase({
  mots: [
    { texte: "Mon" },
    { texte: "frère" },
    { texte: "paraît", focus: true },
    { texte: "fatigué" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe d'état" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  legende: "être, paraître, sembler, devenir, rester : tous des verbes d'état.",
});

// L'accord, qui est la PREUVE de l'attribut : il suit le sujet.
const phraseLetchis = phrase({
  mots: [
    { texte: "Les" },
    { texte: "letchis" },
    { texte: "sont", focus: true },
    { texte: "mûrs" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "pluriel", type: "accord" }],
  legende: "L'attribut s'accorde avec le sujet. Un COD, jamais.",
});

// COD : la question « quoi ? » posée au verbe, sans préposition.
const phraseMangue = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "mange", focus: true },
    { texte: "une" },
    { texte: "mangue" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 3], label: "COD" },
  ],
  liens: [{ de: 1, vers: 3, label: "quoi ?", type: "question" }],
  legende: "Rien entre le verbe et le groupe : le complément est direct.",
});

// COI : le petit mot qui change tout. Il est mis en avant, seul.
const phraseGrandMere = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "parle", focus: true },
    { texte: "à", focus: true },
    { texte: "sa" },
    { texte: "grand-mère" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 4], label: "COI" },
  ],
  liens: [{ de: 1, vers: 4, label: "à qui ?", type: "question" }],
  legende: "La préposition « à » s'intercale : le complément est indirect.",
});

// Les deux dans la même phrase — c'est là que l'élève doit savoir trancher.
const phraseCadeau = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "offre", focus: true },
    { texte: "un" },
    { texte: "cadeau" },
    { texte: "à" },
    { texte: "son" },
    { texte: "frère" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 3], label: "COD" },
    { mots: [4, 6], label: "COI" },
  ],
  liens: [
    { de: 1, vers: 3, label: "quoi ?", type: "question" },
    { de: 1, vers: 6, label: "à qui ?", type: "question" },
  ],
  legende: "Un verbe peut porter les deux : « offrir quelque chose à quelqu'un ».",
});

// LE CIRCONSTANCIEL SE DÉPLACE : `deplacable` redessine le groupe en fantôme à
// l'autre bout, avec sa flèche. Le dire ne se voit pas ; le montrer, oui.
const phraseTamarin = phrase({
  mots: [
    { texte: "Ils" },
    { texte: "se" },
    { texte: "sont" },
    { texte: "abrités", focus: true },
    { texte: "sous" },
    { texte: "le" },
    { texte: "tamarin" },
    { texte: "." },
  ],
  groupes: [
    { mots: [3, 3], label: "verbe" },
    { mots: [4, 6], label: "CC de lieu", deplacable: true },
  ],
  legende: "« Sous le tamarin, ils se sont abrités » : la phrase tient toujours.",
});

// LA SUPPRESSION, l'autre manipulation — et le contre-exemple qui la rend utile.
const phraseSupprimerCc = phrase({
  mots: [
    { texte: "Hier", barre: true },
    { texte: ",", barre: true },
    { texte: "nous" },
    { texte: "sommes" },
    { texte: "allés", focus: true },
    { texte: "au" },
    { texte: "marché" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "CC de temps" }],
  legende: "On barre « Hier » : la phrase tient encore debout.",
});

const phraseSupprimerCod = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "mange", focus: true },
    { texte: "une", barre: true },
    { texte: "mangue", barre: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "COD" }],
  legende: "On barre le COD : « Léa mange » ne dit plus ce qu'elle mange.",
});

// La cause, le troisième circonstanciel que le BO nomme en 6e.
const phrasePluie = phrase({
  mots: [
    { texte: "À" },
    { texte: "cause" },
    { texte: "de" },
    { texte: "la" },
    { texte: "pluie" },
    { texte: "," },
    { texte: "le" },
    { texte: "match" },
    { texte: "est" },
    { texte: "annulé", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "CC de cause", deplacable: true }],
  legende: "« pourquoi ? » — et le groupe se déplace en fin de phrase.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Trois fonctions dans une phrase,
// dont deux circonstanciels : c'est le cas où l'élève compte mal.
const phraseDefi = phrase({
  mots: [
    { texte: "Le" },
    { texte: "samedi" },
    { texte: "," },
    { texte: "les" },
    { texte: "enfants" },
    { texte: "jouent", focus: true },
    { texte: "sur" },
    { texte: "la" },
    { texte: "plage" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "CC de temps", deplacable: true },
    { mots: [3, 4], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
    { mots: [6, 8], label: "CC de lieu" },
  ],
  legende: "Deux circonstanciels, aucun complément d'objet : « jouer » n'en veut pas.",
});

const pieges = [
  "Croire que tout ce qui suit le verbe est un complément d'objet : après un verbe d'état (être, paraître, sembler, devenir, rester), c'est un attribut du sujet.",
  "Oublier la préposition : dans « Léa parle à sa grand-mère », le complément est indirect. Sans le « à », on n'aurait pas la même fonction.",
  "Déplacer un complément d'objet : « Une mangue, Léa mange » ne se dit pas. Seul le circonstanciel se déplace.",
  "Confondre l'attribut et le COD sur l'accord : l'attribut s'accorde avec le sujet (« les letchis sont mûrs »), un COD ne s'accorde avec rien.",
];

const aRetenir = [
  "C'est le VERBE qui décide : un verbe d'état appelle un attribut, un verbe d'action un complément d'objet.",
  "Le complément d'objet est direct sans préposition, indirect avec (« à », « de »).",
  "Le complément circonstanciel se déplace et se supprime ; le complément d'objet, non.",
];

export const ficheComplements6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "grammaire-complements",
  titre: "Attribut du sujet et compléments du verbe",
  accroche:
    "Deux phrases se ressemblent : « Le lagon est calme » et « Tom regarde la mer ». Même place, même longueur — et pourtant deux fonctions différentes. Ce qui décide, c'est le verbe.",
  identite: [
    { label: "Mots clés", valeur: "Attribut, COD, COI, complément circonstanciel" },
    { label: "Le secret", valeur: "Le verbe décide de ce qui le suit" },
    { label: "Outil", valeur: "Poser la question, déplacer, supprimer" },
  ],
  definition: {
    texte:
      "Après le verbe, un groupe peut avoir trois rôles très différents. Si le verbe est un verbe d'état (être, paraître, sembler, devenir, rester), le groupe dit ce QU'EST le sujet : c'est un attribut du sujet. Si le verbe est un verbe d'action, le groupe dit sur QUOI porte l'action : c'est un complément d'objet — direct sans préposition, indirect avec. Et un groupe qui se déplace et se supprime sans casser la phrase n'appartient pas au verbe : c'est un complément circonstanciel.",
  },
  figure: {
    schema: pile(phraseAttributRef, phraseCodRef),
    legende:
      "Deux phrases construites pareil, deux fonctions différentes. En haut le verbe est « est » — un verbe d'état —, et « calme » désigne le lagon lui-même (violet). En bas le verbe est « regarde », et « la mer » n'est pas Tom (vert). Ces couleurs sont les mêmes dans toutes les fiches de français.",
  },
  proprietes: [
    {
      titre: "Le verbe décide",
      texte:
        "Après un verbe d'état, le groupe dit ce qu'est le sujet : c'est un attribut, jamais un complément d'objet.",
      schema: phraseParait,
    },
    {
      titre: "L'attribut s'accorde avec le sujet",
      texte: "C'est la preuve qu'on peut montrer : un complément d'objet, lui, ne s'accorde avec rien.",
      schema: phraseLetchis,
    },
    {
      titre: "Direct ou indirect ?",
      texte: "Rien entre le verbe et le groupe : direct. Une préposition (« à », « de ») s'intercale : indirect.",
      schema: pile(phraseMangue, phraseGrandMere),
    },
    {
      titre: "Le circonstanciel se déplace",
      texte: "Il se déplace et se supprime sans casser la phrase, parce qu'il n'appartient pas au verbe.",
      schema: pile(phraseTamarin, phrasePluie),
    },
  ],
  reel: {
    texte:
      "C'est ce qui décide de l'orthographe quand on écrit. « Les letchis sont mûrs » prend un « s » à « mûrs » parce que c'est un attribut, accordé avec le sujet ; « Léa mange des mangues » n'accorde rien du tout. Et dans une consigne d'exercice — « à partir du document, expliquez pourquoi… » —, savoir ce qui complète le verbe, c'est savoir ce qu'on vous demande de faire.",
  },
  historique: {
    texte:
      "Le mot « attribut » vient du latin attribuere : « donner en partage, assigner ». Un attribut, c'est donc une qualité qu'on donne au sujet — le nom dit exactement ce que fait la fonction. « Complément », lui, vient de complere : « remplir ». L'un attribue, l'autre remplit : deux gestes différents, deux mots différents, depuis deux mille ans.",
  },
  formule: {
    contexte: "Le test qui tranche entre l'attribut et le complément d'objet.",
    expression: "sujet = groupe qui suit ?",
    legende:
      "On demande si les deux désignent le même être. « Le lagon est calme » : le calme, c'est le lagon — attribut. « Tom regarde la mer » : la mer, ce n'est pas Tom — complément d'objet. Le test marche même quand on ne reconnaît pas le verbe.",
    schema: phraseAttributRef,
  },
  methode: [
    {
      titre: "Je regarde le verbe",
      texte: "Verbe d'état (être, paraître, sembler, devenir, rester) : ce qui suit est un attribut. Sinon, je continue.",
      schema: phraseParait,
    },
    {
      titre: "Je pose la question au verbe",
      texte: "« quoi ? » sans petit mot : COD. « à qui ? », « de quoi ? » avec une préposition : COI.",
      schema: phraseCadeau,
    },
    {
      titre: "J'essaie de déplacer et de supprimer",
      texte: "Si le groupe se déplace et se supprime sans casser la phrase, c'est un complément circonstanciel.",
      schema: pile(phraseSupprimerCc, phraseSupprimerCod),
    },
  ],
  usages: [
    {
      titre: "Dire QUAND",
      detail: "Le complément circonstanciel de temps répond à « quand ? » et se déplace.",
      schema: phraseSupprimerCc,
    },
    {
      titre: "Dire OÙ",
      detail: "Celui de lieu répond à « où ? » — ici, sous le tamarin de la cour.",
      schema: phraseTamarin,
    },
    {
      titre: "Dire POURQUOI",
      detail: "Celui de cause répond à « pourquoi ? » et s'introduit souvent par « à cause de », « parce que ».",
      schema: phrasePluie,
    },
  ],
  exemples: [
    {
      titre: "Attribut ou complément d'objet ?",
      donnees: "« Le lagon est calme. » puis « Tom regarde la mer. »",
      schema: pile(phraseAttributRef, phraseCodRef),
      question: "Quelle est la fonction du groupe qui suit le verbe, dans chaque phrase ?",
      solution:
        "Dans la première, « est » est un verbe d'état et « calme » désigne le lagon lui-même : c'est un attribut du sujet. Dans la seconde, « regarde » est un verbe d'action et « la mer » n'est pas Tom : c'est un complément d'objet direct. Même place dans la phrase, deux fonctions — c'est le verbe qui a tranché.",
    },
    {
      titre: "La preuve par l'accord",
      donnees: "« Les letchis sont mûrs. »",
      schema: phraseLetchis,
      question: "Pourquoi « mûrs » prend-il un « s » ?",
      solution:
        "Parce que c'est un attribut du sujet : il s'accorde avec « les letchis », masculin pluriel. Si l'on écrivait « Léa mange des letchis », « letchis » serait un COD et rien ne s'accorderait. L'accord est le test le plus sûr entre les deux.",
    },
    {
      titre: "Direct et indirect dans la même phrase",
      donnees: "« Elle offre un cadeau à son frère. »",
      schema: phraseCadeau,
      question: "Quels sont les deux compléments d'objet, et lequel est indirect ?",
      solution:
        "On pose les deux questions au verbe. « Elle offre quoi ? » un cadeau : complément d'objet direct, rien ne s'intercale. « Elle offre à qui ? » à son frère : complément d'objet indirect, la préposition « à » est là. Le verbe « offrir » se construit avec les deux.",
    },
    {
      titre: "Un groupe qui ne tient pas au verbe",
      donnees: "« Ils se sont abrités sous le tamarin. »",
      schema: phraseTamarin,
      question: "« sous le tamarin » est-il un complément d'objet ?",
      solution:
        "Non. On le déplace : « Sous le tamarin, ils se sont abrités » — la phrase tient. On le supprime : « Ils se sont abrités » — elle tient encore. Un complément d'objet ne supporte ni l'un ni l'autre. C'est donc un complément circonstanciel, ici de lieu.",
    },
    {
      titre: "Le défi",
      donnees: "« Le samedi, les enfants jouent sur la plage. »",
      schema: phraseDefi,
      question: "Combien y a-t-il de compléments circonstanciels, et y a-t-il un complément d'objet ?",
      solution:
        "Deux compléments circonstanciels : « Le samedi » (quand ?) et « sur la plage » (où ?) — les deux se déplacent et se suppriment. Et aucun complément d'objet : le verbe « jouer » n'en demande pas ici. Compter les groupes après le verbe ne suffit donc pas ; il faut les tester un par un.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Il est pêcheur. » Quelle est la fonction de « pêcheur » ?",
      correction:
        "Attribut du sujet. « être » est un verbe d'état, et « pêcheur » dit ce qu'EST « il » : les deux désignent la même personne.",
    },
    {
      question: "« Elle est devenue maîtresse. » Pourquoi n'est-ce pas un complément d'objet ?",
      correction:
        "Parce que « devenir » est un verbe d'état. « maîtresse » ne subit aucune action : c'est ce qu'elle est devenue. C'est un attribut du sujet, accordé au féminin avec « elle ».",
    },
    {
      question: "« Léa parle à sa grand-mère. » Le complément est-il direct ou indirect ?",
      correction:
        "Indirect. La préposition « à » s'intercale entre le verbe et le groupe. On pose « parle à qui ? » et non « parle quoi ? ».",
    },
    {
      question: "« Depuis trois jours, il souffle un vent fort. » Quelle est la fonction de « Depuis trois jours » ?",
      correction:
        "Complément circonstanciel de temps. Il répond à « quand ? », il se déplace en fin de phrase et il se supprime sans que la phrase s'écroule.",
    },
    {
      question: "Défi : « Le samedi, les enfants jouent sur la plage. » Combien de compléments circonstanciels ?",
      correction:
        "Deux : « Le samedi » (temps) et « sur la plage » (lieu). Aucun complément d'objet — le verbe « jouer » n'en porte pas dans cette phrase.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesComplements6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Attribut et compléments - 6e",
    section: {
      type: "objectif",
      phrase: "Savoir ce que le verbe appelle après lui",
      sousPhrase:
        "Un verbe d'état appelle un attribut, un verbe d'action un complément d'objet — et ce qui se déplace n'appartient pas au verbe.",
      encadre: {
        titre: "L'idée",
        texte: "C'est le VERBE qui décide de la fonction du groupe qui le suit.",
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
          "« Les letchis sont mûrs » prend un « s » à « mûrs » parce que c'est un attribut, accordé avec le sujet. « Léa mange des mangues » n'accorde rien.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Attribut » vient du latin attribuere, « donner en partage » : une qualité qu'on donne au sujet. « Complément » vient de complere, « remplir ». L'un attribue, l'autre remplit.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheComplements6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Attribut ou complément d'objet ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'attribut du sujet",
        contenu:
          "« Le lagon est calme. » Le verbe est un verbe d'état, et « calme » désigne le lagon lui-même. L'attribut s'accorde avec le sujet.",
      },
      droite: {
        variante: "ok",
        titre: "Le complément d'objet",
        contenu:
          "« Tom regarde la mer. » Le verbe est un verbe d'action, et « la mer » n'est pas Tom. Un complément d'objet ne s'accorde avec rien.",
      },
    },
  },
  {
    titre: "Direct ou indirect ?",
    badge: "COD / COI",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Direct",
        contenu:
          "« Léa mange une mangue. » Rien ne s'intercale entre le verbe et le groupe : on pose « mange quoi ? ».",
      },
      droite: {
        variante: "info",
        titre: "Indirect",
        contenu:
          "« Léa parle à sa grand-mère. » La préposition « à » s'intercale : on pose « parle à qui ? ».",
      },
    },
  },
  {
    titre: "Ce qui ne tient pas au verbe",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Ils se sont abrités sous le tamarin. »",
      question: "« sous le tamarin » est-il un complément d'objet ?",
      correction:
        "Non : on le déplace (« Sous le tamarin, ils se sont abrités ») et on le supprime (« Ils se sont abrités »). C'est un complément circonstanciel de lieu.",
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
      enonce: "« Le samedi, les enfants jouent sur la plage. »",
      question: "Combien de compléments circonstanciels, et y a-t-il un complément d'objet ?",
      indice: "Teste chaque groupe : est-ce qu'il se déplace ? est-ce qu'il se supprime ?",
      correction:
        "Deux circonstanciels — « Le samedi » (temps) et « sur la plage » (lieu) —, et aucun complément d'objet : « jouer » n'en demande pas ici.",
    },
  },
];
