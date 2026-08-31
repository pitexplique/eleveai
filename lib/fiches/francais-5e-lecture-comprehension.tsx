// ─── Fiche de cours : comprendre et interpréter un texte (5e) ─────────────────
// LA TREIZIÈME FICHE DE LA 5e.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Comprendre, interpréter, apprécier », versant COMPRENDRE — le
// versant APPRÉCIER a sa propre notion (`lecture_apprecier`).
//
// ⛔⛔ CE QUE LA 5e FAIT, ET QUE LA 4e ET LA 3e NE FONT PAS. Les en-têtes des
// banques fixent trois niveaux sur les mêmes objets, et les confondre écrirait
// trois fois la même fiche :
//   sens global : la 4e demande ce que le texte FAIT, la 3e ce qu'il VEUT de son
//     lecteur ; la 5e demande OÙ EN EST L'HISTOIRE — c'est le schéma du récit ;
//   indices : la 4e nomme la FAMILLE de l'indice, la 3e juge ce que vaut un
//     relevé ; la 5e apprend OÙ ALLER CHERCHER, parce qu'un élève qui relit tout
//     le texte à chaque question n'a pas le temps de répondre et se décourage ;
//   implicite : la 4e traite celui de la conversation, la 3e celui de
//     l'argumentation ; la 5e prend le plus fondateur — ce qu'un récit fait
//     comprendre d'un personnage SANS LE DIRE.
//
// ⭐⭐ L'ARC DE QUESTION EST ICI CHEZ LUI. Inventé dans
// `francais-4e-lecture-comprehension.tsx`, il va de ce qu'on affirme vers ce qui
// le prouve. L'implicite est exactement cela : « il a peur » n'est écrit nulle
// part, « sa main tremblait » y est — et l'arc relie les deux. C'est le geste de
// la justification, et c'est ce qu'on demande à l'élève dans chaque réponse
// rédigée de sa scolarité.
//
// ⭐ ET UN DESSIN NEUF POUR LE MENSONGE : deux crochets sur une même ligne,
// « ce qu'il dit » et « ce qu'on voit ». Le mensonge n'est pas dans l'un ni dans
// l'autre : il est dans L'ÉCART entre les deux, et deux crochets côte à côte
// montrent un écart mieux qu'une phrase ne l'explique.
//
// ⭐ `tableau_donnees` porte la grille « on demande → je cherche », comme il
// portait la prise de notes dans `francais-5e-oral-ecouter.tsx`. ⚠️ Cellules
// très courtes : à 226 px, vingt signes tombent sous le plancher.
//
// ⛔ RÈGLE DE COULEUR : « ce qu'il dit », « ce qu'on voit », « des phrases
// courtes » ne sont pas des fonctions et doivent rester GRIS — vérifié au rendu.
//
// Alignée sur les tables OU_EN_EST, OU_CHERCHER et IMPLICITE de
// lib/tutor-v4/questionBank/5e/francais/socle-lecture-culture.bank.ts et sur la
// table STRATEGIES de lecture.bank.ts.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre, aucun auteur dans ce qui est
// demandé à l'élève — les livres sont choisis par le professeur.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_comprehension`) :
// - 5e_comp_sens_global → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 5e_comp_indices     → propriétés 3 et 4, méthode 2, usage 2, exemples 2 et 3
// - 5e_comp_implicite   → figure, propriétés 5 à 7, formule, méthode 3, usage 3,
//                         exemples 4 et 5
// - 5e_comp_strategies  → propriété 8, méthode 4, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";
import type { SchemaBarrePart } from "@/lib/tutor-v4/types_canvas";

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

/** La grille « on demande → je cherche ». ⚠️ Cellules très courtes : à la largeur
 *  d'un bloc de fiche, vingt signes tombent sous le plancher de 11 px. */
function grille(opts: { headers: string[]; rows: { values: string[] }[]; highlight?: { row?: number }; caption?: string }) {
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

/** Le récit comme un tout découpé en moments. */
function barre(total: string, parts: SchemaBarrePart[]) {
  return (
    <CanvasRenderer
      figure={{ kind: "schema_barre", total, parts, size: { width: 205, height: 110 } }}
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

// ─── Ce qui se dessine quand on comprend un texte ─────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : l'arc va de ce qu'on comprend vers ce qui le montre.
const implicitePeur = phrase({
  mots: [
    { texte: "il a peur", focus: true },
    { texte: "sa main tremblait", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "montré par", type: "question" }],
  legende: "« Il a peur » n'est écrit nulle part. Le corps le dit à la place du texte.",
});

const impliciteColere = phrase({
  mots: [
    { texte: "Assez" },
    { texte: ".", focus: true },
    { texte: "Sortez" },
    { texte: ".", focus: true },
    { texte: "Tout" },
    { texte: "de" },
    { texte: "suite" },
    { texte: ".", focus: true },
  ],
  groupes: [{ mots: [0, 7], label: "phrases courtes" }],
  legende: "Trois phrases en cinq mots : la colère s'entend au rythme.",
});

// ── ⭐ LE MENSONGE EST DANS L'ÉCART, et deux crochets le montrent.
const impliciteMensonge = phrase({
  mots: [
    { texte: "Je" },
    { texte: "n'ai" },
    { texte: "pas" },
    { texte: "quitté" },
    { texte: "la" },
    { texte: "maison" },
    { texte: "·" },
    { texte: "bottes" },
    { texte: "pleines" },
    { texte: "de" },
    { texte: "boue" },
  ],
  groupes: [
    { mots: [0, 5], label: "ce qu'il dit" },
    { mots: [7, 10], label: "ce qu'on voit" },
  ],
  legende: "Ni l'un ni l'autre ne ment. C'est l'ÉCART entre les deux qui le dit.",
});

const impliciteNonReponse = phrase({
  mots: [
    { texte: "Où" },
    { texte: "étiez-vous" },
    { texte: "hier" },
    { texte: "?" },
    { texte: "·" },
    { texte: "Il" },
    { texte: "faisait" },
    { texte: "froid" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "la question" },
    { mots: [5, 8], label: "autre chose" },
  ],
  legende: "Il n'a pas répondu — et ne pas répondre est déjà une réponse.",
});

// ── OÙ EN EST L'HISTOIRE : le récit comme un tout découpé en moments.
const momentsDuRecit = barre("un récit", [
  { label: "le décor" },
  { label: "le problème" },
  { label: "l'obstacle" },
  { label: "l'aide" },
  { label: "le calme" },
]);

const momentProbleme = phrase({
  mots: [
    { texte: "Le" },
    { texte: "village" },
    { texte: "vivait" },
    { texte: "en" },
    { texte: "paix" },
    { texte: "·" },
    { texte: "la" },
    { texte: "source" },
    { texte: "s'est tarie", focus: true },
  ],
  groupes: [
    { mots: [0, 4], label: "la paix" },
    { mots: [6, 8], label: "la rupture" },
  ],
  legende: "Le problème surgit : la situation de départ vient de se rompre.",
});

// ── OÙ RETOURNER CHERCHER : la grille de l'élève qui n'a pas le temps de tout relire.
const grilleOuChercher = grille({
  headers: ["On demande", "Je cherche"],
  rows: [
    { values: ["ce qu'il dit", "ses paroles"] },
    { values: ["ce qu'il fait", "les verbes"] },
    { values: ["à quoi ça ressemble", "les adjectifs"] },
    { values: ["quand, où", "les repères"] },
    { values: ["l'avis du narrateur", "hors dialogue"] },
  ],
  caption: "Cinq endroits, et l'on n'en relit qu'un.",
});

const grilleParoles = grille({
  headers: ["On demande", "Je cherche"],
  rows: [
    { values: ["ce qu'il dit", "ses paroles"] },
    { values: ["ce qu'il fait", "les verbes"] },
    { values: ["à quoi ça ressemble", "les adjectifs"] },
    { values: ["quand, où", "les repères"] },
    { values: ["l'avis du narrateur", "hors dialogue"] },
  ],
  highlight: { row: 0 },
  caption: "« Qu'a-t-il promis ? » — dans ses paroles, entre guillemets.",
});

// ── SE DÉBLOQUER : remonter au dernier nom propre.
const strategieRemonter = phrase({
  mots: [
    { texte: "Marc", focus: true },
    { texte: "…" },
    { texte: "il", focus: true },
  ],
  liens: [{ de: 2, vers: 0, label: "je remonte", type: "reprise" }],
  legende: "Perdu dans les « il » ? On remonte jusqu'au dernier nom propre cité.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureComprehension5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "lecture-comprehension",
  titre: `Comprendre et interpréter un texte en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Sa main tremblait si fort qu'il ne put ouvrir la porte. » Le mot « peur » n'est écrit nulle part, et pourtant tu l'as compris avant la fin de la phrase. Un récit dit rarement les choses en face : il les montre. Comprendre, ce n'est donc pas lire plus attentivement — c'est savoir OÙ le texte a mis ce qu'il ne dit pas.",
  identite: [
    { label: "Mots clés", valeur: "Sens global, indices, implicite, contrôle" },
    { label: "Le secret", valeur: "Le texte montre au lieu de dire" },
    { label: "Outil", valeur: "Où retourner chercher ?" },
  ],
  definition: {
    texte:
      "Comprendre un récit demande quatre gestes, et aucun n'est « lire plus attentivement ». Savoir OÙ EN EST L'HISTOIRE d'abord : le texte installe-t-il un décor, un problème vient-il de surgir, un obstacle se dresse-t-il, une aide arrive-t-elle, ou tout se répare-t-il ? Ces cinq moments sont le squelette de presque tous les récits. Savoir OÙ CHERCHER ensuite, quand on doit répondre à une question : dans les paroles, dans les verbes d'action, dans les mots qui décrivent, dans les indices de temps et de lieu, ou dans ce que dit le narrateur. Comprendre l'IMPLICITE enfin — ce que le texte fait comprendre sans l'écrire, et le JUSTIFIER en montrant l'endroit. Et par-dessus tout cela, CONTRÔLER sa lecture : un bon lecteur n'est pas celui qui ne bloque jamais, c'est celui qui sait quoi faire quand il bloque.",
  },
  figure: {
    schema: pile(implicitePeur, impliciteMensonge),
    legende:
      "En haut, l'arc violet va de ce qu'on comprend — « il a peur » — vers ce qui le montre : « sa main tremblait ». Le premier n'est écrit nulle part, le second est dans le texte, et c'est lui qu'on cite pour justifier. En bas, un autre mécanisme : deux crochets sur une seule ligne, ce qu'il DIT et ce qu'on VOIT. Aucun des deux ne ment ; c'est l'écart entre les deux qui dit le mensonge.",
  },
  proprietes: [
    {
      titre: "Un récit passe par cinq moments",
      texte:
        "Le décor, le problème qui surgit, l'obstacle, l'aide qui arrive, le retour au calme. Savoir où l'on en est, c'est pouvoir résumer sans tout raconter.",
      schema: momentsDuRecit,
      micros: ["5e_comp_sens_global"],
    },
    {
      titre: "Le problème est une RUPTURE",
      texte:
        "« Le village vivait en paix ; ce matin, la source s'est tarie. » Ce n'est pas un malheur de plus : c'est la situation de départ qui se casse.",
      schema: momentProbleme,
      micros: ["5e_comp_sens_global"],
    },
    {
      titre: "Chaque question a son endroit",
      texte:
        "Ce qu'il dit ? Ses paroles. Ce qu'il fait ? Les verbes. À quoi ça ressemble ? Les adjectifs. Quand et où ? Les repères de temps et de lieu.",
      schema: grilleOuChercher,
      micros: ["5e_comp_indices"],
    },
    {
      titre: "Relire tout le texte est le meilleur moyen de rater",
      texte:
        "Un élève qui recommence à la première ligne à chaque question n'a pas le temps de répondre — et il se décourage avant la moitié.",
      schema: grilleParoles,
      micros: ["5e_comp_indices"],
    },
    {
      titre: "La peur passe par le corps",
      texte:
        "Une main qui tremble, une gorge sèche, un pas en arrière. Le texte ne nomme pas le sentiment : il en montre la trace.",
      schema: implicitePeur,
      micros: ["5e_comp_implicite"],
    },
    {
      titre: "Le mensonge est dans l'écart",
      texte:
        "« Je n'ai pas quitté la maison », et des bottes pleines de boue. Ni la phrase ni les bottes ne mentent : c'est leur désaccord qui parle.",
      schema: impliciteMensonge,
      micros: ["5e_comp_implicite"],
    },
    {
      titre: "La colère s'entend, la non-réponse se voit",
      texte:
        "Des phrases très courtes qui se suivent disent la colère. Une réponse qui parle d'autre chose est un refus de répondre.",
      schema: pile(impliciteColere, impliciteNonReponse),
      micros: ["5e_comp_implicite"],
    },
    {
      titre: "Un bon lecteur sait quoi faire quand il bloque",
      texte:
        "Il ne bloque pas moins souvent que les autres. Il a des gestes : remonter, relire plus lentement, chercher le verbe principal, résumer.",
      schema: strategieRemonter,
      micros: ["5e_comp_strategies"],
    },
  ],
  reel: {
    texte:
      "L'implicite n'est pas une affaire de romans : c'est la matière ordinaire de la vie. Quelqu'un qui te répond « on verra » ne dit pas non, et pourtant tu as compris. Un message qui arrive à minuit avec deux mots dit autre chose que le même message à midi. Un vendeur qui parle longuement de tout sauf du prix vient de te dire quelque chose sur le prix. Ce que le cours de français appelle « comprendre l'implicite et justifier son interprétation » est exactement ce que tu fais dix fois par jour — sauf qu'ici on te demande de dire SUR QUOI tu t'es appuyé. Et c'est cela, la seule différence : pas de deviner mieux, mais de pouvoir montrer l'endroit.",
  },
  historique: {
    texte:
      "Montrer plutôt que dire est devenu une règle d'écriture au XIXe siècle, et elle a un nom en anglais : show, don't tell. Avant, les romans expliquaient volontiers ce qu'il fallait penser des personnages — « c'était un homme d'un naturel fourbe » — et le lecteur n'avait qu'à suivre. Les romanciers réalistes ont commencé à faire l'inverse : décrire un geste, une chambre, un silence, et laisser le lecteur conclure. Ce déplacement a changé le métier de lire : il est devenu actif. Aujourd'hui, un texte scolaire, un roman, un film ou une publicité fonctionnent tous ainsi, et l'on ne t'apprend pas seulement à comprendre — on t'apprend à voir ce qui te fait comprendre.",
  },
  formule: {
    contexte: "Ce qu'on demande vraiment quand on demande de justifier.",
    expression: "je dis ce que j'ai compris, puis je montre l'endroit",
    legende:
      "« Il a peur » est l'interprétation. « Sa main tremblait si fort qu'il ne put ouvrir la porte » est la preuve, et elle est dans le texte. Les deux ensemble font une réponse ; l'une sans l'autre n'en fait pas. Sans l'interprétation, on recopie ; sans la preuve, on devine.",
    schema: implicitePeur,
  },
  methode: [
    {
      titre: "Se demander où en est l'histoire",
      texte:
        "Décor, problème, obstacle, aide, retour au calme. Un passage occupe presque toujours un seul de ces cinq moments — et le nommer suffit à résumer.",
      schema: momentsDuRecit,
      micros: ["5e_comp_sens_global"],
    },
    {
      titre: "Choisir l'endroit AVANT de relire",
      texte:
        "La question dit où aller : « qu'a-t-il promis ? » envoie aux paroles, « comment est la salle ? » aux adjectifs. On ne relit qu'un endroit.",
      schema: grilleParoles,
      micros: ["5e_comp_indices"],
    },
    {
      titre: "Pour l'implicite : chercher la trace, pas le mot",
      texte:
        "Le sentiment n'est pas nommé — cherche ce qui le montre : un geste, un silence, un écart entre ce qu'on dit et ce qu'on voit, un rythme.",
      schema: pile(implicitePeur, impliciteMensonge),
      micros: ["5e_comp_implicite"],
    },
    {
      titre: "Avoir un geste pour chaque blocage",
      texte:
        "Perdu dans les « il » ? Remonte au dernier nom propre. Phrase trop longue ? Trouve le verbe principal, puis son sujet. Page relue trois fois ? Arrête-toi.",
      schema: strategieRemonter,
      micros: ["5e_comp_strategies"],
    },
  ],
  usages: [
    {
      titre: "Pour résumer sans tout raconter",
      detail:
        "Nommer le moment suffit souvent : « le problème surgit », « l'aide arrive ». C'est ce qu'on attend d'un résumé, pas la liste des évènements.",
      schema: momentProbleme,
      micros: ["5e_comp_sens_global"],
    },
    {
      titre: "Pour répondre vite à un questionnaire",
      detail:
        "Cinq endroits, et la question dit lequel. C'est la différence entre finir un contrôle de lecture et s'arrêter à la question six.",
      schema: grilleOuChercher,
      micros: ["5e_comp_indices"],
    },
    {
      titre: "Pour justifier une réponse rédigée",
      detail:
        "Ce qu'on te demande toute ta scolarité : l'interprétation, puis l'endroit du texte. L'arc violet est le schéma de cette réponse.",
      schema: implicitePeur,
      micros: ["5e_comp_implicite"],
    },
  ],
  exemples: [
    {
      titre: "Où en est l'histoire",
      donnees: "« Il veut traverser, et le pont s'est effondré la veille. »",
      schema: momentProbleme,
      question: "À quel moment du récit sommes-nous ?",
      solution:
        "UN OBSTACLE SE DRESSE : il veut quelque chose, et quelque chose l'en empêche. Ce n'est pas le problème de départ — celui-là serait « le pont s'est effondré » tout court. Ici, il y a une volonté ET un empêchement : c'est le moteur du récit, et il occupera peut-être vingt pages.",
      micros: ["5e_comp_sens_global"],
    },
    {
      titre: "Où retourner chercher",
      donnees: "On te demande ce que le personnage a promis à son père.",
      schema: grilleParoles,
      question: "Où vas-tu chercher ?",
      solution:
        "DANS SES PAROLES : ce qu'il dit lui-même, entre guillemets. Pas dans le récit du narrateur, pas dans ses actes. Une promesse est un acte de parole — elle est forcément dans un dialogue. Tu n'as donc qu'un endroit à relire, pas trois pages.",
      micros: ["5e_comp_indices"],
    },
    {
      titre: "Un autre endroit",
      donnees: "On te demande si le narrateur trouve ce personnage sympathique.",
      schema: grilleOuChercher,
      question: "Où vas-tu chercher ?",
      solution:
        "DANS CE QUE DIT LE NARRATEUR, hors dialogue : ses commentaires. Le personnage peut se trouver charmant et le narrateur glisser un mot qui dit le contraire. Chercher dans les paroles du personnage donnerait son avis à lui — ce n'est pas la question posée.",
      micros: ["5e_comp_indices"],
    },
    {
      titre: "Ce que le texte fait comprendre",
      donnees: "« Sa gorge était sèche et il n'entendait plus que son cœur. »",
      schema: implicitePeur,
      question: "Que comprend-on, et sur quoi t'appuies-tu ?",
      solution:
        "QU'IL A PEUR — et le texte le montre par son CORPS, sans nommer le sentiment. La justification est la citation elle-même : « sa gorge était sèche », « il n'entendait plus que son cœur ». Réponds toujours dans cet ordre : ce que tu as compris, puis l'endroit qui le montre.",
      micros: ["5e_comp_implicite"],
    },
    {
      titre: "Une réponse qui n'en est pas une",
      donnees: "« Où étiez-vous hier soir ? — Il faisait très froid, cette nuit. »",
      schema: impliciteNonReponse,
      question: "Qu'est-ce que cela fait comprendre ?",
      solution:
        "QU'IL N'A PAS RÉPONDU : sa phrase porte sur tout autre chose. Ne pas répondre est déjà une réponse, et un récit s'en sert souvent pour montrer qu'un personnage cache quelque chose — sans jamais l'écrire. Le crochet « la question » et le crochet « autre chose » le rendent visible.",
      micros: ["5e_comp_implicite"],
    },
    {
      titre: "Se débloquer seul",
      donnees: "Tu ne sais plus de qui parle le « il » depuis deux pages.",
      schema: strategieRemonter,
      question: "Que fais-tu ?",
      solution:
        "TU REMONTES JUSQU'AU DERNIER NOM PROPRE CITÉ. C'est un geste, pas une qualité : n'importe qui le fait s'il sait qu'il existe. Un bon lecteur ne bloque pas moins souvent que les autres — il a simplement une liste de gestes, et il en essaie un au lieu de continuer à tourner les pages.",
      micros: ["5e_comp_strategies"],
    },
  ],
  pieges: [
    "Relire tout le texte à chaque question : on n'a plus le temps de répondre, et l'on abandonne avant la fin.",
    "Chercher le sentiment nommé dans le texte : il n'y est pas. C'est la trace qu'on cherche — un geste, un silence, un rythme.",
    "Répondre sans citer : une interprétation sans l'endroit du texte n'est pas une réponse, c'est une impression.",
    "Citer sans interpréter : recopier une phrase ne dit pas ce qu'on en a compris. Il faut les deux.",
    "Confondre le problème et l'obstacle : le problème rompt la situation de départ, l'obstacle empêche quelqu'un qui VEUT quelque chose.",
    "Sauter les descriptions : une description prépare presque toujours ce qui va arriver ensuite.",
  ],
  aRetenir: [
    "Cinq moments : décor, problème, obstacle, aide, retour au calme.",
    "Chaque question a SON endroit : paroles, verbes, adjectifs, repères, narrateur.",
    "Le texte montre au lieu de dire : cherche la trace, pas le mot.",
    "Justifier, c'est dire ce qu'on a compris PUIS montrer l'endroit.",
    "Un bon lecteur n'est pas celui qui ne bloque jamais : c'est celui qui sait quoi faire.",
  ],
  entrainement: [
    {
      question: "« La source coule de nouveau, et le village recommence à vivre. » Quel moment ?",
      correction: "Le calme revient : ce qui avait été rompu se trouve réparé.",
      micros: ["5e_comp_sens_global"],
    },
    {
      question: "« Deux pages décrivent le château, ses tours et ses fossés. » Quel moment ?",
      correction: "Rien ne bouge encore : le texte installe le décor.",
      micros: ["5e_comp_sens_global"],
    },
    {
      question: "On te demande combien de temps le voyage a duré. Où cherches-tu ?",
      correction: "Dans les indices de temps et de lieu.",
      micros: ["5e_comp_indices"],
    },
    {
      question: "« Il avança d'un pas, puis recula de deux, et se tut. » Que comprend-on ?",
      correction: "Qu'il a peur : le corps le montre, le mot n'y est pas.",
      micros: ["5e_comp_implicite"],
    },
    {
      question: "« Encore lui ? » dit-elle, et l'autre sourit sans demander qui. Que comprend-on ?",
      correction: "Qu'ils se connaissent : ils n'ont pas besoin de tout se dire.",
      micros: ["5e_comp_implicite"],
    },
    {
      question: "Tu arrives en bas de la page sans savoir ce que tu viens de lire. Que fais-tu ?",
      correction: "Tu remontes et tu relis, plus lentement.",
      micros: ["5e_comp_strategies"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesLectureComprehension5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un texte - 5e",
    section: {
      type: "objectif",
      phrase: "Un récit montre au lieu de dire",
      sousPhrase:
        "Le mot « peur » n'est écrit nulle part, et tu l'as compris. Comprendre, c'est savoir où le texte a mis ce qu'il ne dit pas.",
      encadre: {
        titre: "L'idée",
        texte: "« Sa main tremblait si fort qu'il ne put ouvrir la porte. »",
      },
    },
  },
  {
    titre: "Les cinq moments d'un récit",
    badge: "Comprendre un texte - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le décor", texte: "Rien ne bouge : on installe le lieu et les gens." },
        { titre: "Le problème", texte: "La situation de départ vient de se rompre." },
        { titre: "L'obstacle", texte: "Il VEUT, et quelque chose l'en empêche." },
        { titre: "L'aide, puis le calme", texte: "Quelqu'un change le rapport de force ; tout se répare." },
      ],
    },
    schema: momentsDuRecit,
  },
  {
    titre: "Chaque question a son endroit",
    badge: "Comprendre un texte - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Ce qu'il a dit ? Dans ses paroles, entre guillemets.",
        "Ce qu'il a fait ? Dans les verbes d'action.",
        "À quoi ça ressemble ? Dans les adjectifs et les compléments du nom.",
        "L'avis du narrateur ? Dans ses commentaires, hors dialogue.",
      ],
    },
    schema: grilleOuChercher,
  },
  {
    titre: "Ce que le texte fait comprendre",
    badge: "Comprendre un texte - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "La peur",
        contenu: "Elle passe par le corps : une main qui tremble, une gorge sèche.",
      },
      droite: {
        titre: "Le mensonge",
        contenu: "Il est dans l'ÉCART : « je n'ai pas quitté la maison », bottes pleines de boue.",
      },
    },
    schema: pile(implicitePeur, impliciteMensonge),
  },
  {
    titre: "Justifier, en deux temps",
    badge: "Comprendre un texte - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je dis ce que j'ai compris : « il a peur ».",
        "Je montre l'endroit : « sa main tremblait si fort… ».",
        "Sans l'interprétation, je recopie.",
        "Sans la preuve, je devine. Il faut les deux.",
      ],
    },
    schema: implicitePeur,
  },
  {
    titre: "À vous",
    badge: "Comprendre un texte - 5e",
    section: {
      type: "exercice",
      enonce: "« Où étiez-vous hier soir ? — Il faisait très froid, cette nuit. »",
      question: "Qu'est-ce que cette réponse fait comprendre ?",
      indice: "Compare la question et la réponse. Portent-elles sur la même chose ?",
      correction:
        "Qu'il N'A PAS RÉPONDU : sa phrase porte sur tout autre chose. Ne pas répondre est déjà une réponse — et un récit s'en sert pour montrer qu'un personnage cache quelque chose.",
    },
    schema: impliciteNonReponse,
  },
];
