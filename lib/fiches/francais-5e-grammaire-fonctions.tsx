// ─── Fiche de cours : les fonctions dans la phrase (5e) ───────────────────────
// LA DEUXIÈME FICHE DE FRANÇAIS DE LA 5e, et le cœur du second objectif du BO :
// « Connaitre les différents constituants d'une phrase ».
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
//
// ⭐ CE QUE LA 5e AJOUTE À LA 6e, ET QUI COMMANDE TOUTE LA FICHE. La 6e oppose
// l'attribut au complément d'objet direct ; la 5e va plus loin sur deux points
// que le programme nomme explicitement :
//   1. « en utilisant des MANIPULATIONS SYNTAXIQUES et en VERBALISANT son
//      raisonnement » — la fonction ne se devine pas, elle se prouve par un
//      geste : je supprime, je déplace, je pronominalise, je remplace le verbe.
//   2. « Identifier les verbes attributifs en repérant l'emploi
//      OCCASIONNELLEMENT ATTRIBUTIF de certains verbes » — la liste « être,
//      paraître, sembler, devenir, rester » ne suffit plus. Le document
//      d'accompagnement donne la paire qui le prouve : « il reste inquiet »
//      contre « il reste à la maison ». C'est le défi de la fiche.
//   3. Le COD et le COI « dans des emplois plus complexes (pronom ayant la
//      fonction COD "Il m'entend." ou COI "Je te parle.") » — le pronom placé
//      AVANT le verbe, qui prépare l'accord du participe passé.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `grammaire_fonctions`) et sur les tables FONCTIONS, ATTRIBUTS et
// CIRCONSTANCIELS de lib/tutor-v4/questionBank/5e/francais/grammaire-phrase.bank.ts.
//
// ⚠️ LA NOTION N'EXISTAIT PAS QUAND CETTE FICHE A ÉTÉ ÉCRITE. Le matin du
// 24/08, ces cinq micros étaient noyées dans un `grammaire_phrase` de DIX-NEUF
// — une notion pareille ne tient dans aucune fiche, et la fiche n'aurait porté
// aucun badge « 📖 Fiche » dans le coach. Le découpage du même jour lui a donné
// sa notion : le `notion` ci-dessous tombe pile dessus, sans alias.
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - 5e_gram_constituants     → définition, figure (les quatre groupes du BO
//                              posés côte à côte), à retenir
// - 5e_gram_fonctions        → figure (sujet, verbe, groupes), méthodes 1 et 2,
//                              exemples 1 et 5
// - 5e_gram_cod_coi          → propriétés « Direct ou indirect » et « Le pronom
//                              peut être devant », méthode 1, exemples 1, 2
//                              et 3, pièges 1 et 2, entraînements 1 et 2
// - 5e_gram_attribut         → propriétés « L'attribut s'accorde » et « Certains
//                              verbes sont attributifs par occasion », formule,
//                              méthode 3, exemple 4, le défi (exemple 6),
//                              pièges 3 et 4, entraînements 3 et 5
// - 5e_gram_circonstanciels  → propriété « Le circonstanciel se déplace »,
//                              usages (lieu, temps, cause, manière), exemple 5,
//                              entraînement 4
//
// Les phrases sont CELLES DE LA BANQUE, sans exception : « Le pêcheur répare son
// filet », « Elle pense à son frère resté au port », « Nous partirons à l'aube »,
// « Le ciel devient orageux », « Tom raconte son voyage à la classe », « La mer
// paraissait calme ce matin-là », « Ils partirent confiants », « Il tomba malade
// au mois de janvier », « Ils avancèrent le long du récif », « Nous partirons dès
// l'aube », « Il renonça par prudence », « Elle répondit avec calme ». S'y
// ajoutent les trois énoncés que le document d'accompagnement du BO cite mot pour
// mot : « Il m'entend. », « Je te parle. », « il reste inquiet / il reste à la
// maison ».
//
// ⚠️ `largeurMax` à 215, et non 250 : le bloc qui reçoit un dessin ne fait que
// 225 px sur un téléphone de 375, et un viewBox de 260 y serait réduit à 0,86 —
// une légende de 12 px tomberait à 10,4. La phrase se plie en deux lignes plutôt
// que de rapetisser (REGLES.md § 2 quater).

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
        largeurMax: 190,
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

// LA FIGURE DE RÉFÉRENCE : quatre groupes qui suivent tous un verbe, et quatre
// fonctions différentes. C'est exactement le cas que le BO réunit dans un seul
// attendu — et il a raison : aucune de ces fonctions ne se reconnaît seule, elles
// se reconnaissent en s'opposant. Les couleurs sont celles de toute la matière.
const phraseCodRef = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "répare", focus: true },
    { texte: "son" },
    { texte: "filet" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
    { mots: [3, 4], label: "COD" },
  ],
  liens: [{ de: 2, vers: 4, label: "quoi ?", type: "question" }],
  legende: "Rien entre le verbe et le groupe : complément d'objet DIRECT.",
});

const phraseCoiRef = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "pense", focus: true },
    { texte: "à", focus: true },
    { texte: "son" },
    { texte: "frère" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 4], label: "COI" },
  ],
  liens: [{ de: 1, vers: 4, label: "à qui ?", type: "question" }],
  legende: "La préposition « à » s'intercale : complément d'objet INDIRECT.",
});

const phraseAttributRef = phrase({
  mots: [
    { texte: "Le" },
    { texte: "ciel" },
    { texte: "devient", focus: true },
    { texte: "orageux" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe attributif" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "=", type: "accord" }],
  legende: "« orageux », c'est le ciel lui-même : attribut du sujet.",
});

const phraseCcRef = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "partirons", focus: true },
    { texte: "à" },
    { texte: "l'aube" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 3], label: "CC de temps", deplacable: true },
  ],
  legende: "« À l'aube, nous partirons » : il se déplace. Circonstanciel.",
});

// LES DEUX DANS LA MÊME PHRASE — c'est là que l'élève doit trancher, et c'est
// l'énoncé de la banque.
const phraseVoyage = phrase({
  mots: [
    { texte: "Tom" },
    { texte: "raconte", focus: true },
    { texte: "son" },
    { texte: "voyage" },
    { texte: "à" },
    { texte: "la" },
    { texte: "classe" },
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
  legende: "« raconter quelque chose à quelqu'un » : le verbe porte les deux.",
});

// ⭐ LE PRONOM PLACÉ AVANT LE VERBE — l'attendu neuf de la 5e, et celui qui
// prépare l'accord du participe passé. Le lien « quoi ? » part du verbe et
// REMONTE vers la gauche : l'arc dit à lui seul que l'objet est passé devant.
const phraseMEntend = phrase({
  mots: [
    { texte: "Il" },
    { texte: "m'", focus: true },
    { texte: "entend", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "COD" },
    { mots: [2, 2], label: "verbe" },
  ],
  liens: [{ de: 2, vers: 1, label: "entend qui ?", type: "question" }],
  legende: "« m' » est devant le verbe, et c'est un COD : il entend MOI.",
});

const phraseTeParle = phrase({
  mots: [
    { texte: "Je" },
    { texte: "te", focus: true },
    { texte: "parle", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "COI" },
    { mots: [2, 2], label: "verbe" },
  ],
  liens: [{ de: 2, vers: 1, label: "parle à qui ?", type: "question" }],
  legende: "« te » est devant lui aussi, mais c'est un COI : je parle À TOI.",
});

// L'ACCORD, LA PREUVE DE L'ATTRIBUT. On change le nombre du sujet et le groupe
// suit : aucun complément d'objet ne fait cela.
const phraseMerCalme = phrase({
  mots: [
    { texte: "La" },
    { texte: "mer" },
    { texte: "paraissait", focus: true },
    { texte: "calme" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "féminin", type: "accord" }],
  legende: "Mets « les mers » : « calmes » suit. Un COD ne suivrait pas.",
});

// ⭐ L'EMPLOI OCCASIONNELLEMENT ATTRIBUTIF. « partir » n'est pas un verbe d'état,
// et « confiants » est pourtant un attribut — il s'accorde avec « Ils ».
const phraseConfiants = phrase({
  mots: [
    { texte: "Ils" },
    { texte: "partirent", focus: true },
    { texte: "confiants" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe attributif" },
    { mots: [2, 2], label: "attribut du sujet" },
  ],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "« partir » n'est pas un verbe d'état — ici il en fait le travail.",
});

const phraseTombaMalade = phrase({
  mots: [
    { texte: "Il" },
    { texte: "tomba", focus: true },
    { texte: "malade" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe attributif" },
    { mots: [2, 2], label: "attribut du sujet" },
  ],
  liens: [{ de: 0, vers: 2, label: "=", type: "accord" }],
  legende: "Remplace par « être » : « il EST malade » se dit. C'est un attribut.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Le même verbe, deux fois — et deux
// fonctions. C'est la paire que le document d'accompagnement du BO donne en
// exemple de réussite, et rien ne la remplace : la liste apprise par cœur y échoue.
const phraseResteInquiet = phrase({
  mots: [
    { texte: "Il" },
    { texte: "reste", focus: true },
    { texte: "inquiet" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 2], label: "attribut du sujet" },
  ],
  // ⚠️ LE LABEL D'UN LIEN RESTE COURT. « il EST inquiet » (14 signes) sortait de
  // 18 px à gauche du cadre sur une phrase de quatre mots : l'arc pose son
  // étiquette à son sommet, et rien ne la ramène dedans — contrairement à celle
  // d'un groupe. La phrase entière est dans la légende, juste dessous.
  liens: [{ de: 0, vers: 2, label: "= être", type: "accord" }],
  legende: "« être » passe : « il est inquiet ». Emploi attributif.",
});

const phraseResteMaison = phrase({
  mots: [
    { texte: "Il" },
    { texte: "reste", focus: true },
    { texte: "à" },
    { texte: "la" },
    { texte: "maison" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 4], label: "CC de lieu", deplacable: true },
  ],
  legende: "« il est à la maison » ne dit plus la même chose : circonstanciel.",
});

// LES QUATRE CIRCONSTANCIELS QUE LE BO NOMME, un par question.
const phraseRecif = phrase({
  mots: [
    { texte: "Ils" },
    { texte: "avancèrent", focus: true },
    { texte: "le" },
    { texte: "long" },
    { texte: "du" },
    { texte: "récif" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 5], label: "CC de lieu", deplacable: true }],
  legende: "où ? — le long du récif.",
});

const phraseAube = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "partirons", focus: true },
    { texte: "dès" },
    { texte: "l'aube" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "CC de temps", deplacable: true }],
  legende: "quand ? — dès l'aube.",
});

const phrasePrudence = phrase({
  mots: [
    { texte: "Il" },
    { texte: "renonça", focus: true },
    { texte: "par" },
    { texte: "prudence" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "CC de cause", deplacable: true }],
  legende: "pourquoi ? — par prudence.",
});

const phraseCalme = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "répondit", focus: true },
    { texte: "avec" },
    { texte: "calme" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "CC de manière", deplacable: true }],
  legende: "comment ? — avec calme.",
});

// LA SUPPRESSION, la manipulation qui sépare l'objet du circonstanciel.
const phraseSupprimerCc = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "partirons", focus: true },
    { texte: "à", barre: true },
    { texte: "l'aube", barre: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "CC de temps" }],
  legende: "On le barre : « Nous partirons » tient encore debout.",
});

const phraseSupprimerCod = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "répare", focus: true },
    { texte: "son", barre: true },
    { texte: "filet", barre: true },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 4], label: "COD" }],
  legende: "On le barre : « Le pêcheur répare » ne dit plus quoi.",
});

const pieges = [
  "Croire que tout ce qui suit le verbe est un complément d'objet. Après un verbe attributif, c'est un attribut du sujet — et il s'accorde avec le sujet, ce qu'un complément d'objet ne fait jamais.",
  "Oublier que le complément d'objet peut être DEVANT le verbe. Dans « Il m'entend », « m' » est un COD ; dans « Je te parle », « te » est un COI. La place ne donne pas la fonction : c'est la question posée au verbe qui la donne.",
  "Réciter la liste « être, paraître, sembler, devenir, rester » et s'arrêter là. « Ils partirent confiants » a bien un attribut, et « partir » n'est dans aucune liste.",
  "Prendre « il reste à la maison » pour un attribut parce que le verbe est « rester ». Ici « à la maison » se déplace et se supprime : c'est un complément circonstanciel de lieu.",
];

const aRetenir = [
  "Une fonction se PROUVE par une manipulation : je pose la question au verbe, je déplace, je supprime, je remplace par un pronom.",
  "Complément d'objet direct sans préposition, indirect avec — et l'un comme l'autre peut se placer avant le verbe sous la forme d'un pronom.",
  "L'attribut s'accorde avec le sujet, et le verbe qui l'introduit se remplace par « être ». Le circonstanciel, lui, se déplace et se supprime.",
];

export const ficheFonctions5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "grammaire-fonctions",
  titre: "Les fonctions dans la phrase (2026-2027)",
  accroche:
    "« Il reste inquiet » et « il reste à la maison » : le même verbe, la même place, et deux fonctions qui n'ont rien à voir. En 5e, on ne devine plus une fonction — on la prouve, par un geste sur la phrase.",
  identite: [
    { label: "Mots clés", valeur: "Sujet, COD, COI, attribut du sujet, complément circonstanciel" },
    { label: "Le secret", valeur: "Une fonction se prouve, elle ne se devine pas" },
    { label: "Outil", valeur: "Questionner, déplacer, supprimer, pronominaliser" },
  ],
  definition: {
    texte:
      "La fonction d'un groupe, c'est le rôle qu'il joue dans SA phrase — et le même mot change de fonction d'une phrase à l'autre. Le complément d'objet complète le verbe : direct s'il s'y rattache sans préposition, indirect s'il en passe par une (« à », « de »). L'attribut du sujet, lui, ne complète pas le verbe : il dit ce que le sujet EST, et il s'accorde avec lui. Le complément circonstanciel, enfin, n'appartient pas au verbe : il donne la circonstance — où, quand, pourquoi, comment — et c'est pour cela qu'il se déplace et se supprime sans casser la phrase.",
  },
  figure: {
    schema: pile(phraseCodRef, phraseCoiRef, phraseAttributRef, phraseCcRef),
    legende:
      "Quatre groupes qui suivent tous un verbe, quatre fonctions. Le vert est celui des compléments d'objet, le violet celui de l'attribut, l'orange celui du circonstanciel — les mêmes couleurs dans toutes les fiches de français. Aucune de ces fonctions ne se reconnaît toute seule : elles se reconnaissent en s'opposant les unes aux autres.",
  },
  proprietes: [
    {
      titre: "Direct ou indirect ?",
      texte:
        "Rien entre le verbe et le groupe : direct. Une préposition s'intercale : indirect. Un verbe peut porter les deux.",
      schema: phraseVoyage,
    },
    {
      titre: "Le pronom peut être devant",
      texte:
        "« Il m'entend » : un COD placé avant le verbe. « Je te parle » : un COI. La place ne dit rien, la question tout.",
      schema: pile(phraseMEntend, phraseTeParle),
    },
    {
      titre: "L'attribut s'accorde avec le sujet",
      texte:
        "C'est la preuve qu'on peut montrer : change le genre ou le nombre du sujet, l'attribut suit — un COD, jamais.",
      schema: phraseMerCalme,
    },
    {
      titre: "Certains verbes sont attributifs par occasion",
      texte:
        "« partir », « tomber », « rester » ne sont pas des verbes d'état, et ils introduisent pourtant un attribut.",
      schema: pile(phraseConfiants, phraseTombaMalade),
    },
    {
      titre: "Le circonstanciel se déplace et se supprime",
      texte:
        "Il n'appartient pas au verbe : on le retire, la phrase tient. On retire un complément d'objet, elle boite.",
      schema: pile(phraseSupprimerCc, phraseSupprimerCod),
    },
  ],
  reel: {
    texte:
      "C'est ce qui décide de l'orthographe au moment où l'on écrit. « La mer paraissait calme » ne prend pas de « s », « les mers paraissaient calmes » en prend deux — parce que « calme » est un attribut, accordé avec le sujet. Et savoir si un pronom placé devant le verbe est COD ou COI, c'est exactement ce qui sépare « tu m'as parlé » de « tu m'as appelée » : un accord de participe passé qui se voit dans un message, un devoir, une lettre de motivation.",
  },
  historique: {
    texte:
      "Le mot « complément » vient du latin complere, « remplir » : le complément remplit ce que le verbe laisse en attente. « Attribut » vient d'attribuere, « donner en partage » : on attribue une qualité au sujet. Et « circonstance » vient de circumstare, « se tenir autour » — le complément circonstanciel se tient AUTOUR de l'action, il n'est pas dedans. Les trois noms disent déjà les trois gestes : remplir, attribuer, entourer. C'est pour cela que le circonstanciel se déplace : ce qui se tient autour peut faire le tour.",
  },
  formule: {
    contexte: "Le test qui sépare l'attribut de tout le reste, même sur un verbe inconnu.",
    expression: "le verbe peut-il devenir « être » ?",
    legende:
      "« Il reste inquiet » → « il est inquiet » : la phrase dit la même chose, donc « inquiet » est un attribut. « Il reste à la maison » → « il est à la maison » : ce n'est plus la même information, donc « à la maison » n'est pas un attribut. Le document d'accompagnement du programme en fait un exemple de réussite : c'est la manipulation attendue en 5e.",
    schema: pile(phraseResteInquiet, phraseResteMaison),
  },
  methode: [
    {
      titre: "Je pose la question au verbe",
      texte:
        "« quoi ? qui ? » sans petit mot : COD. « à qui ? de quoi ? » avec une préposition : COI.",
      schema: phraseVoyage,
    },
    {
      titre: "J'essaie de déplacer et de supprimer",
      texte:
        "Si le groupe part en tête de phrase et se retire sans casser la phrase, c'est un complément circonstanciel.",
      schema: phraseSupprimerCc,
    },
    {
      titre: "Je remplace le verbe par « être »",
      texte:
        "Si la phrase garde le même sens, le verbe est attributif et ce qui suit est un attribut du sujet.",
      schema: phraseResteInquiet,
    },
  ],
  usages: [
    {
      titre: "Dire OÙ",
      detail: "Le circonstanciel de lieu répond à « où ? » : « Ils avancèrent le long du récif. »",
      schema: phraseRecif,
    },
    {
      titre: "Dire QUAND",
      detail: "Celui de temps répond à « quand ? » : « Nous partirons dès l'aube. »",
      schema: phraseAube,
    },
    {
      titre: "Dire POURQUOI, dire COMMENT",
      detail:
        "La cause répond à « pourquoi ? », la manière à « comment ? » — les deux derniers que le programme nomme.",
      schema: pile(phrasePrudence, phraseCalme),
    },
  ],
  exemples: [
    {
      titre: "Direct ou indirect ?",
      donnees: "« Le pêcheur répare son filet. » puis « Elle pense à son frère resté au port. »",
      schema: pile(phraseCodRef, phraseCoiRef),
      question: "Quelle est la fonction du groupe qui suit le verbe, dans chaque phrase ?",
      solution:
        "On pose la question au verbe. « Répare quoi ? » son filet : rien ne s'intercale, c'est un complément d'objet direct. « Pense à qui ? » à son frère : la préposition « à » est là, c'est un complément d'objet indirect. On vérifie ensuite qu'aucun des deux ne se déplace — « Son filet, le pêcheur répare » ne se dit pas : ce ne sont donc pas des circonstanciels.",
    },
    {
      titre: "Les deux dans la même phrase",
      donnees: "« Tom raconte son voyage à la classe. »",
      schema: phraseVoyage,
      question: "Quels sont les deux compléments d'objet, et lequel est indirect ?",
      solution:
        "« Raconte quoi ? » son voyage : complément d'objet direct. « Raconte à qui ? » à la classe : complément d'objet indirect. Le verbe « raconter » se construit avec les deux — « raconter quelque chose à quelqu'un » —, et c'est cette construction qu'on retient avec le verbe, pas les fonctions à part.",
    },
    {
      titre: "Le complément placé avant le verbe",
      donnees: "« Il m'entend. » et « Je te parle. »",
      schema: pile(phraseMEntend, phraseTeParle),
      question: "« m' » et « te » ont-ils la même fonction ?",
      solution:
        "Non. On remet le groupe à sa place : « Il entend moi » → « Il entend QUI ? » sans préposition, donc « m' » est un complément d'objet direct. « Je parle à toi » → « Je parle À QUI ? », donc « te » est un complément d'objet indirect. Les deux pronoms sont au même endroit et se ressemblent : seule la construction du verbe les sépare. C'est cette distinction qui commandera l'accord du participe passé.",
    },
    {
      titre: "La preuve par l'accord",
      donnees: "« La mer paraissait calme ce matin-là. »",
      schema: phraseMerCalme,
      question: "Pourquoi « calme » est-il un attribut du sujet ?",
      solution:
        "Parce qu'il s'accorde avec « la mer ». On met le sujet au pluriel : « Les mers paraissaient calmes » — le groupe suit. Un complément d'objet ne bougerait pas : dans « Le pêcheur répare son filet », mettre « les pêcheurs » ne change rien à « son filet ». L'accord est le test le plus sûr entre les deux.",
    },
    {
      titre: "Un groupe qui ne tient pas au verbe",
      donnees: "« Nous partirons dès l'aube. »",
      schema: pile(phraseAube, phraseSupprimerCc),
      question: "« dès l'aube » complète-t-il le verbe ?",
      solution:
        "Non. On le déplace : « Dès l'aube, nous partirons » — la phrase tient. On le supprime : « Nous partirons » — elle tient encore. Un complément d'objet ne supporte ni l'un ni l'autre. C'est donc un complément circonstanciel, ici de temps, et il répond à « quand ? ».",
    },
    {
      titre: "Le défi",
      donnees: "« Il reste inquiet. » et « Il reste à la maison. »",
      schema: pile(phraseResteInquiet, phraseResteMaison),
      question: "Le verbe « rester » introduit-il un attribut dans les deux phrases ?",
      solution:
        "Non, et la liste des verbes d'état ne peut pas le dire — c'est le même verbe. On remplace par « être ». « Il est inquiet » : même sens, donc « inquiet » est un attribut du sujet, et il s'accorde (« elle reste inquiète »). « Il est à la maison » : ce n'est plus la même information, et le groupe se déplace (« À la maison, il reste ») — c'est un complément circonstanciel de lieu. Un verbe n'est pas attributif une fois pour toutes : il l'est dans une phrase donnée.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Les élèves écoutent la consigne. » Fonction de « la consigne » ?",
      correction:
        "Complément d'objet direct. « Écoutent quoi ? » la consigne, sans préposition. Et le groupe ne se déplace pas : « La consigne, les élèves écoutent » ne se dit pas.",
    },
    {
      question: "« Elle obéit à ses parents sans discuter. » Fonction de « à ses parents » ?",
      correction:
        "Complément d'objet indirect. « Obéit à qui ? » — la préposition « à » s'intercale. Le verbe « obéir » se construit toujours ainsi : on obéit À quelqu'un.",
    },
    {
      question: "« Ce garçon est mon voisin. » Pourquoi « mon voisin » n'est-il pas un COD ?",
      correction:
        "Parce que « mon voisin » et « ce garçon » désignent la MÊME personne, et que le verbe est « être ». C'est un attribut du sujet. Un complément d'objet désignerait autre chose que le sujet.",
    },
    {
      question: "« Il posa la caisse sans un bruit. » Fonction de « sans un bruit » ?",
      correction:
        "Complément circonstanciel de manière : il répond à « comment ? ». Il se déplace (« Sans un bruit, il posa la caisse ») et se supprime. Attention, « la caisse » est bien le COD, lui.",
    },
    {
      question: "Défi : « Il tomba malade au mois de janvier. » Combien de fonctions après le verbe, et lesquelles ?",
      correction:
        "Deux. « malade » est un attribut du sujet : on remplace par « être » — « il était malade » — et le mot s'accorde (« elle tomba malade »). « au mois de janvier » est un complément circonstanciel de temps : il se déplace et se supprime. Le verbe « tomber » est ici employé de façon attributive, alors qu'il ne figure dans aucune liste de verbes d'état.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesFonctions5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les fonctions - 5e",
    section: {
      type: "objectif",
      phrase: "Prouver une fonction, au lieu de la deviner",
      sousPhrase:
        "Sujet, complément d'objet direct et indirect, attribut du sujet, compléments circonstanciels de lieu, de temps, de cause et de manière.",
      encadre: {
        titre: "L'idée",
        texte:
          "Une fonction se démontre par un geste : questionner, déplacer, supprimer, remplacer le verbe par « être ».",
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
          "« Tu m'as parlé » et « tu m'as appelée » ne s'écrivent pas pareil. La seule différence : dans l'une le pronom est un COI, dans l'autre un COD.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Circonstance » vient du latin circumstare, « se tenir autour ». Le complément circonstanciel se tient autour de l'action, il n'est pas dedans — voilà pourquoi il peut faire le tour de la phrase.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheFonctions5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Complément d'objet ou attribut ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le complément d'objet",
        contenu:
          "« Le pêcheur répare son filet. » Le filet n'est pas le pêcheur : l'action porte dessus. Il ne s'accorde avec rien.",
      },
      droite: {
        variante: "ok",
        titre: "L'attribut du sujet",
        contenu:
          "« Le ciel devient orageux. » « orageux », c'est le ciel lui-même, et le mot s'accorde avec le sujet.",
      },
    },
  },
  {
    titre: "Le pronom placé avant le verbe",
    badge: "Nouveau en 5e",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "« Il m'entend. »",
        contenu:
          "« Il entend QUI ? » — moi. Aucune préposition : « m' » est un complément d'objet direct, placé devant le verbe.",
      },
      droite: {
        variante: "info",
        titre: "« Je te parle. »",
        contenu:
          "« Je parle À QUI ? » — à toi. La construction du verbe impose « à » : « te » est un complément d'objet indirect.",
      },
    },
  },
  {
    titre: "Le même verbe, deux fonctions",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Il reste inquiet. » et « Il reste à la maison. »",
      question: "« rester » introduit-il un attribut dans les deux cas ?",
      correction:
        "Non. « Il EST inquiet » garde le sens : attribut. « Il EST à la maison » change de sens, et le groupe se déplace : complément circonstanciel de lieu.",
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
      enonce: "« Il tomba malade au mois de janvier. »",
      question: "Combien de fonctions après le verbe, et lesquelles ?",
      indice: "Essaie de remplacer « tomba » par « était ». Puis essaie de déplacer chaque groupe.",
      correction:
        "Deux : « malade » est un attribut du sujet (il s'accorde : « elle tomba malade »), et « au mois de janvier » un complément circonstanciel de temps.",
    },
  },
];
