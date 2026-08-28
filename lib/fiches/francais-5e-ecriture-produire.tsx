// ─── Fiche de cours : écrire des textes d'invention et de réflexion (5e) ──────
// LA VINGT-SEPTIÈME FICHE DE LA 5e — la deuxième des trois notions d'écriture.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Écrire des textes d'invention et de réflexion » (BO5EFRE).
//
// ⭐⭐ LE FIL, ET IL FAIT TENIR QUATRE MICROS QUI N'AVAIENT RIEN À VOIR : TROIS
// TEXTES, TROIS CHARPENTES DE QUATRE PIÈCES, ET UNE SEULE VÉRIFICATION — ON
// COMPTE LES PIÈCES.
//   le récit         : le lieu · l'obstacle · l'ordre · la fin
//   l'argumentation  : la thèse · l'argument · l'exemple · le connecteur
//   la réponse       : la question reprise · la réponse · la citation
// Un récit sans obstacle et une argumentation sans exemple ont exactement le
// même défaut : une pièce manquante. C'est une seule méthode pour trois devoirs,
// et c'est ce qui empêche cette fiche d'être une liste de conseils.
//
// ⭐ ET LE CINQUIÈME CAS QUE LA BANQUE IMPOSE : « IL NE MANQUE RIEN ». L'en-tête
// de `socle-ecriture-oral.bank.ts` l'écrit — « un cas sur cinq n'a RIEN à
// reprendre : sans lui, l'élève apprend qu'il manque toujours quelque chose et
// répond sans lire ». La fiche montre donc une charpente COMPLÈTE, pas seulement
// des charpentes trouées.
//
// ⭐ LE DESSIN DE LA PIÈCE MANQUANTE EST LA CHARPENTE AMPUTÉE. Trois boites au
// lieu de quatre : le vide se compte, et l'élève voit ce qui manque avant qu'on
// le nomme. C'est le même geste que le crochet absent des fiches de culture.
//
// ⭐ LA BANDE `nature` DIT ICI UNE DURÉE CONTRE UNE LONGUEUR : « trois ans » avec
// « une phrase » au-dessus, « une seconde » avec « dix lignes ». Le temps du
// récit et la place sur la page ne sont pas le même temps, et c'est ce que
// « ralentir » et « accélérer » veulent dire — invisible tant qu'on ne l'écrit
// pas l'un sur l'autre.
//
// ⛔ SÉPARATION DES DEUX BANQUES, À NE PAS REDIRE : `5e_ecrit_invention` (socle)
// tient la CHARPENTE d'un récit — lieu, obstacle, ordre, fin ;
// `5e_ecrit_narratif_descriptif` (nouveau BO) tient l'ENRICHISSEMENT — montrer
// plutôt que dire, l'ordre de parcours, le son et l'odeur. De même
// `5e_ecrit_argumentatif` tient le paragraphe qui argumente, et
// `5e_ecrit_reflexion` la RÉPONSE À UNE QUESTION SUR UN TEXTE, de très loin la
// plus fréquente en 5e.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette de cette fiche n'est une FONCTION
// grammaticale — toutes restent grises. « la thèse », « l'argument », « le
// connecteur » ne tombent dans aucun test de `couleurFonction` ; « l'objet » et
// « la proposition » y tombent, et sont écartés.
//
// Alignée sur les tables INVENTION et REFLEXION de
// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts, et sur les
// tables NARRATIF, PIECES et ARGUMENTATIF de
// lib/tutor-v4/questionBank/5e/francais/ecriture-oral.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `ecriture_produire`) :
// - 5e_ecrit_invention           → figure, propriétés 1 à 3, méthode 1, usage 1,
//                                  exemples 1 et 2
// - 5e_ecrit_narratif_descriptif → propriétés 4 à 6, formule, méthode 2, usage 2,
//                                  exemple 3
// - 5e_ecrit_argumentatif        → propriétés 7 et 8, méthode 3, usage 3, exemple 4
// - 5e_ecrit_reflexion           → propriétés 9 et 10, méthode 4, usage 4,
//                                  exemples 5 et 6

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

/** Les trois charpentes côte à côte. ⚠️ Cellules courtes : à la largeur d'un
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

// ─── Ce qui se dessine quand on compte les pièces ─────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : quatre pièces, et l'on vérifie en comptant.
const charpenteRecit = phrase({
  mots: [
    { texte: "le lieu", focus: true },
    { texte: "l'obstacle", focus: true },
    { texte: "l'ordre", focus: true },
    { texte: "la fin", focus: true },
  ],
  legende: "Un récit de 5e tient sur quatre pièces. On vérifie en les comptant.",
});

// ⭐ LA PIÈCE MANQUANTE SE VOIT PAR SON ABSENCE : trois boites au lieu de quatre.
const charpenteSansObstacle = phrase({
  mots: [
    { texte: "le lieu", focus: true },
    { texte: "l'ordre", focus: true },
    { texte: "la fin", focus: true },
  ],
  legende: "Trois pièces sur quatre : le héros obtient tout sans rien faire.",
});

const charpenteArgu = phrase({
  mots: [
    { texte: "la thèse", focus: true },
    { texte: "l'argument", focus: true },
    { texte: "l'exemple", focus: true },
    { texte: "le lien", focus: true },
  ],
  legende: "L'argumentation a les siennes, et elles se comptent pareil.",
});

// ⭐ DEUX ARCS EN CHAINE : ce qui soutient quoi.
const chaineArgumentative = phrase({
  mots: [
    { texte: "la thèse", focus: true },
    { texte: "l'argument" },
    { texte: "l'exemple" },
  ],
  liens: [
    { de: 1, vers: 0, label: "soutient", type: "question" },
    { de: 2, vers: 1, label: "rend vrai", type: "question" },
  ],
  legende: "L'exemple ne soutient pas la thèse : il rend concret un argument.",
});

const grilleCharpentes = grille({
  headers: ["Le récit", "L'argumentation"],
  rows: [
    { values: ["le lieu", "la thèse"] },
    { values: ["l'obstacle", "l'argument"] },
    { values: ["l'ordre", "l'exemple"] },
    { values: ["la fin", "le lien"] },
  ],
  caption: "Deux devoirs très différents, une seule vérification.",
});

const grilleCharpentesObstacle = grille({
  headers: ["Le récit", "L'argumentation"],
  rows: [
    { values: ["le lieu", "la thèse"] },
    { values: ["l'obstacle", "l'argument"] },
    { values: ["l'ordre", "l'exemple"] },
    { values: ["la fin", "le lien"] },
  ],
  highlight: { row: 1 },
  caption: "La pièce qui manque le plus souvent, des deux côtés.",
});

// ── L'ENRICHISSEMENT : montrer, ordonner, ralentir, faire entendre.
const montrerPasDire = phrase({
  mots: [
    { texte: "il avait peur", barre: true },
    { texte: "ses mains tremblent", focus: true },
  ],
  legende: "Nommer un sentiment l'affaiblit. Un geste le fait exister.",
});

const ordreDeParcours = phrase({
  mots: [
    { texte: "la porte", focus: true },
    { texte: "le milieu", focus: true },
    { texte: "le fond", focus: true },
  ],
  legende: "Un ordre de parcours, et le lecteur sait toujours où il se tient.",
});

// ⭐ LA BANDE `nature` OPPOSE UNE DURÉE À UNE LONGUEUR.
const ralentirAccelerer = phrase({
  mots: [
    { texte: "trois ans", nature: "une phrase" },
    { texte: "une seconde", nature: "dix lignes" },
  ],
  legende: "Le temps du récit et la place sur la page ne vont pas ensemble.",
});

const sonEtOdeur = phrase({
  mots: [
    { texte: "ce qu'on voit" },
    { texte: "un son", focus: true },
    { texte: "une odeur", focus: true },
  ],
  legende: "La vue seule ne suffit jamais à faire exister un lieu.",
});

// ── LA RÉPONSE RÉDIGÉE : reprendre, répondre vraiment, prouver.
const reprendreLaQuestion = phrase({
  mots: [
    { texte: "Pourquoi part-il ?", focus: true },
    { texte: "Il part parce que", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "reprend", type: "question" }],
  legende: "Ta première phrase reprend les mots de la question. Toujours.",
});

const repondreVraiment = phrase({
  mots: [
    { texte: "pourquoi ?" },
    { texte: "il part au matin", barre: true },
  ],
  legende: "La question demandait pourquoi. Cette réponse dit quand.",
});

const citerPourProuver = phrase({
  mots: [
    { texte: "il a peur" },
    { texte: "« ses mains »", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "prouvé par", type: "question" }],
  legende: "Une affirmation sans guillemets ne vaut rien : cite le passage.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureProduire5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "ecriture-produire",
  titre: "Écrire des textes d'invention et de réflexion en 5e (2026-2027)",
  accroche:
    "Un récit, une argumentation et une réponse rédigée n'ont rien à voir — et se vérifient de la même façon : on COMPTE LES PIÈCES. Quatre pour le récit : le lieu, l'obstacle, l'ordre, la fin. Quatre pour l'argumentation : la thèse, l'argument, l'exemple, le connecteur. Un récit sans obstacle et une argumentation sans exemple ont le même défaut, et il se voit d'un coup d'œil.",
  identite: [
    { label: "Mots clés", valeur: "Charpente, obstacle, thèse, citation" },
    { label: "Le secret", valeur: "On vérifie un texte en comptant ses pièces" },
    { label: "Outil", valeur: "Laquelle des quatre me manque ?" },
  ],
  definition: {
    texte:
      "Le programme demande d'écrire des textes d'INVENTION et de RÉFLEXION, et ces textes ont chacun une charpente. UN RÉCIT tient sur quatre pièces : un lieu — sinon on ne sait pas où l'on est ; un obstacle — sinon le héros obtient tout sans rien faire ; un ordre — sinon on ne sait plus ce qui vient avant ; une fin — sinon le récit s'arrête sans que rien soit réglé. Ce récit s'ENRICHIT ensuite : on montre un sentiment par un geste au lieu de le nommer, on suit un ordre de parcours pour décrire, on ralentit un moment important et l'on fait passer trois ans en une phrase, on ajoute un son et une odeur parce que la vue seule ne suffit pas. UN TEXTE ARGUMENTATIF a ses quatre pièces à lui : la thèse qu'on soutient, l'argument qui la soutient, l'exemple qui rend l'argument concret, le connecteur qui relie les étapes. Et UNE RÉPONSE RÉDIGÉE — le devoir le plus fréquent de l'année — reprend les mots de la question, répond vraiment à ce qui est demandé, cite le passage qui le prouve, et fait une phrase complète.",
  },
  figure: {
    schema: pile(charpenteRecit, charpenteSansObstacle),
    legende:
      "Quatre boites en haut, trois en bas. En bas, l'obstacle manque — et il ne manque rien d'autre : le lieu est là, l'ordre est là, la fin est là. C'est le défaut le plus fréquent des récits de 5e, et il ne se voit pas en relisant, parce qu'un récit sans obstacle se lit très bien. Il se voit en COMPTANT. C'est pour cela que la charpente se dessine avant d'écrire, et se recompte après.",
  },
  proprietes: [
    {
      titre: "Un récit tient sur quatre pièces",
      texte:
        "Un lieu, un obstacle, un ordre, une fin. Aucune n'est un ornement : chacune manque à un vrai récit d'élève, et se repère seule.",
      schema: charpenteRecit,
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "L'obstacle est celle qui manque le plus",
      texte:
        "« Il voulut la clé ; on la lui donna. » Le héros obtient tout sans rien faire, et le récit n'a plus rien à raconter.",
      schema: charpenteSansObstacle,
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "Et il arrive qu'il ne manque rien",
      texte:
        "« Au bord de la ravine, il voulut passer ; le tronc céda ; il revint par le haut, trempé mais vivant. » Quatre pièces en une phrase.",
      schema: charpenteRecit,
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "Montrer, plutôt que nommer",
      texte:
        "« Il avait peur » informe. « Ses mains tremblent » fait exister. Décris ce que le personnage fait de ses mains, pas ce qu'il ressent.",
      schema: montrerPasDire,
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      titre: "Une description suit un parcours",
      texte:
        "De la porte vers le fond, du sol vers le plafond, du plus loin au plus près. Sans ordre, le lecteur ne sait jamais où il se tient.",
      schema: ordreDeParcours,
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      titre: "Le récit a le droit d'accélérer",
      texte:
        "Trois ans peuvent tenir en une phrase, et une seconde occuper dix lignes. La durée racontée et la place sur la page sont deux choses.",
      schema: pile(ralentirAccelerer, sonEtOdeur),
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      titre: "Une argumentation a aussi quatre pièces",
      texte:
        "La thèse est ce qu'on soutient ; l'argument est une raison ; l'exemple est un cas précis ; le connecteur relie les étapes.",
      schema: charpenteArgu,
      micros: ["5e_ecrit_argumentatif"],
    },
    {
      titre: "L'exemple ne soutient pas la thèse",
      texte:
        "Il rend concret un ARGUMENT. C'est la confusion la plus fréquente, et elle se voit sur la chaine : chaque flèche ne saute qu'un cran.",
      schema: chaineArgumentative,
      micros: ["5e_ecrit_argumentatif"],
    },
    {
      titre: "Une réponse reprend les mots de la question",
      texte:
        "« Pourquoi part-il ? » appelle « Il part parce que… ». C'est le point le plus simple à tenir, et le plus souvent perdu.",
      schema: reprendreLaQuestion,
      micros: ["5e_ecrit_reflexion"],
    },
    {
      titre: "Et elle prouve ce qu'elle avance",
      texte:
        "Tu dis que le personnage a peur ? Cite le passage, entre guillemets. Une affirmation sans preuve ne vaut aucun point.",
      schema: citerPourProuver,
      micros: ["5e_ecrit_reflexion"],
    },
  ],
  reel: {
    texte:
      "Tu comptes déjà des pièces sans le savoir. Quand une vidéo t'ennuie et que tu ne sais pas dire pourquoi, c'est très souvent qu'il n'y a pas d'obstacle : celui qui parle obtient tout, et il ne reste rien à attendre. Quand tu racontes ta journée à quelqu'un et qu'il te demande « attends, c'était où ? », il vient de te signaler le lieu manquant. Quand tu défends un avis dans un groupe et qu'on te répond « oui mais concrètement ? », on te réclame l'exemple. Et quand un professeur écrit « tu n'as pas répondu à la question », il ne dit pas que tu as mal travaillé : il dit qu'une pièce précise manque, celle qui reprend la question. Toutes ces remarques désignent une pièce absente — et une pièce absente, cela s'ajoute.",
  },
  historique: {
    texte:
      "Dans les écoles de rhétorique de la Grèce puis de Rome, on n'apprenait pas à écrire un texte entier. On apprenait une pièce à la fois, pendant des années, dans un ordre fixé : d'abord raconter une fable, puis rapporter un récit bref, puis développer une maxime, puis réfuter, puis confirmer, puis décrire, puis faire parler un personnage. Ces exercices gradués — on les appelait les progymnasmata — occupaient toute la scolarité avant qu'un élève ne compose son premier discours complet. L'idée était simple : un texte est un assemblage de gestes séparables, et l'on ne rate pas un texte entier, on rate une pièce. Quinze siècles plus tard, la remarque du professeur en marge d'une copie dit encore la même chose.",
  },
  formule: {
    contexte: "La question à se poser en relisant n'importe quel devoir d'écriture.",
    expression: "laquelle des quatre me manque ?",
    legende:
      "Pour un récit : le lieu, l'obstacle, l'ordre, la fin. Pour une argumentation : la thèse, l'argument, l'exemple, le connecteur. On ne relit pas en se demandant si c'est bien — cela ne se répond pas. On relit en comptant, et il manque presque toujours la même.",
    schema: charpenteRecit,
  },
  methode: [
    {
      titre: "Compter les pièces avant de rendre",
      texte:
        "Quatre boites dans la marge, une croix dans chacune quand elle est là. La case vide est ton travail restant.",
      schema: charpenteRecit,
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "Chercher les sentiments nommés",
      texte:
        "Souligne « il avait peur », « elle était triste », « il était content ». Chacun se remplace par un geste, et le texte change.",
      schema: montrerPasDire,
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      titre: "Vérifier ce que soutient chaque phrase",
      texte:
        "L'argument soutient la thèse. L'exemple soutient l'argument. Si ton exemple répond directement à la thèse, il manque un cran.",
      schema: chaineArgumentative,
      micros: ["5e_ecrit_argumentatif"],
    },
    {
      titre: "Relire la question après avoir répondu",
      texte:
        "Mot à mot. « Pourquoi » appelle une cause, « comment » un moyen, « où » un lieu. Répondre à une autre question ne rapporte rien.",
      schema: repondreVraiment,
      micros: ["5e_ecrit_reflexion"],
    },
  ],
  usages: [
    {
      titre: "Pour réparer un récit qui ne tient pas",
      detail:
        "Ne le récris pas. Compte les pièces, trouve celle qui manque, ajoute-la. Un obstacle se glisse en deux phrases.",
      schema: grilleCharpentesObstacle,
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "Pour qu'un lieu existe vraiment",
      detail:
        "Fais-le voir par un personnage, avec ce qu'il y cherche, et ajoute un son et une odeur. Une description sans regard reste un décor vide.",
      schema: sonEtOdeur,
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      titre: "Pour bâtir un paragraphe qui convainc",
      detail:
        "Thèse, argument, exemple, connecteur — dans cet ordre, et une seule fois chacun. Un paragraphe qui empile trois arguments sans exemple ne convainc personne.",
      schema: grilleCharpentes,
      micros: ["5e_ecrit_argumentatif"],
    },
    {
      titre: "Pour ne plus perdre de points en réponse",
      detail:
        "Reprendre la question, faire une phrase complète, citer entre guillemets, et ne pas recopier tout le texte. Quatre gestes, tous les devoirs.",
      schema: citerPourProuver,
      micros: ["5e_ecrit_reflexion"],
    },
  ],
  exemples: [
    {
      titre: "Un récit troué",
      donnees: "« Il chercha le trésor, le trouva aussitôt, et rentra chez lui. »",
      schema: charpenteSansObstacle,
      question: "Quelle pièce manque ?",
      solution:
        "L'OBSTACLE : le héros obtient tout sans rien faire. Le lieu manque aussi, mais l'obstacle d'abord — car sans lui, il n'y a rien à raconter, où que cela se passe. Ajoute une seule difficulté, et les trois lignes deviennent une histoire.",
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "Un récit complet",
      donnees: "« Sur le pont du navire, la corde se rompit ; il la rattrapa de justesse, et la voile tint jusqu'au port. »",
      schema: charpenteRecit,
      question: "Que manque-t-il ?",
      solution:
        "RIEN. Le lieu — sur le pont du navire. L'obstacle — la corde se rompt. L'ordre — les trois faits se suivent dans l'ordre où ils arrivent. La fin — la voile tient jusqu'au port, quelque chose est réglé. Quatre pièces en une phrase : c'est possible, et c'est le but.",
      micros: ["5e_ecrit_invention"],
    },
    {
      titre: "Faire sentir la peur",
      donnees: "« Tu veux qu'on sente qu'un personnage a peur. »",
      schema: montrerPasDire,
      question: "Que fais-tu ?",
      solution:
        "TU MONTRES CE QU'IL FAIT DE SES MAINS, PAS CE QU'IL RESSENT. Écrire « il avait peur » demande au lecteur de te croire ; écrire qu'il essuie ses paumes sur son pantalon le lui fait éprouver. C'est la règle la plus rentable de toute l'écriture narrative.",
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      titre: "Reconnaitre une pièce",
      donnees: "« L'an dernier, quatorze élèves de 5e faisaient leurs devoirs dans le couloir. »",
      schema: chaineArgumentative,
      question: "Quelle pièce est-ce ?",
      solution:
        "UN EXEMPLE : un cas précis qui rend l'argument concret. Il ne soutient pas directement la thèse « la bibliothèque devrait ouvrir le midi » : il rend vrai l'argument « beaucoup n'ont pas d'endroit calme ». Chaque flèche ne saute qu'un cran.",
      micros: ["5e_ecrit_argumentatif"],
    },
    {
      titre: "Une réponse trop courte",
      donnees: "Question : « Où se passe la scène ? » Tu écris : « Dans une forêt. »",
      schema: reprendreLaQuestion,
      question: "Que faut-il corriger ?",
      solution:
        "REPRENDRE LES MOTS DE LA QUESTION : « La scène se passe dans une forêt. » Ce n'est pas une politesse d'écriture. Une réponse qui reprend la question est lisible seule, sans le sujet à côté — et c'est ce qu'on te demande de savoir faire.",
      micros: ["5e_ecrit_reflexion"],
    },
    {
      titre: "Une réponse à côté",
      donnees: "Question : « Pourquoi part-il ? » Tu écris : « Il part au matin. »",
      schema: repondreVraiment,
      question: "Que faut-il corriger ?",
      solution:
        "RÉPONDRE VRAIMENT : la question demande POURQUOI, pas QUAND. La phrase est juste, bien écrite, tirée du texte — et elle ne rapporte rien. Relis la question mot à mot après avoir répondu : « pourquoi » appelle une cause, et rien d'autre.",
      micros: ["5e_ecrit_reflexion"],
    },
  ],
  pieges: [
    "Écrire un récit sans obstacle : il se lit très bien, et il ne raconte rien.",
    "Oublier le lieu : « il marcha longtemps, puis il rencontra un homme » ne se passe nulle part.",
    "Nommer les sentiments au lieu de les montrer : « il avait peur » demande au lecteur de te croire.",
    "Décrire sans ordre de parcours : le lecteur ne sait jamais où il se tient.",
    "Croire que l'exemple soutient la thèse : il rend concret un argument, un cran plus bas.",
    "Répondre à une autre question que celle posée : « pourquoi » n'appelle ni un moment ni un lieu.",
    "Affirmer sans citer : une réponse sans guillemets ne prouve rien.",
  ],
  aRetenir: [
    "Le récit : le lieu, l'obstacle, l'ordre, la fin. On vérifie en comptant.",
    "L'obstacle est la pièce qui manque le plus souvent.",
    "Montrer par un geste, jamais nommer le sentiment.",
    "L'argumentation : la thèse, l'argument, l'exemple, le connecteur.",
    "Une réponse reprend les mots de la question, et cite ce qui la prouve.",
  ],
  entrainement: [
    {
      question: "« Il arriva au port. Il avait quitté la ville. Il prit la mer. » Que manque-t-il ?",
      correction: "L'ordre : on ne sait plus ce qui vient avant et après.",
      micros: ["5e_ecrit_invention"],
    },
    {
      question: "« Il leva son épée, et le monstre s'avança vers lui. FIN. » Que manque-t-il ?",
      correction: "La fin : le récit s'arrête sans que rien soit réglé.",
      micros: ["5e_ecrit_invention"],
    },
    {
      question: "« Ton récit enchaine et puis, et puis, et puis. » Que fais-tu ?",
      correction: "Tu remplaces par des liens qui disent le temps ou la cause.",
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      question: "« Tu veux montrer qu'il fait froid. » Que fais-tu ?",
      correction: "Tu décris un geste que le froid impose, pas la température.",
      micros: ["5e_ecrit_narratif_descriptif"],
    },
    {
      question: "« Les écrans ne devraient pas entrer en salle de classe. » Quelle pièce ?",
      correction: "La thèse : ce que le texte soutient.",
      micros: ["5e_ecrit_argumentatif"],
    },
    {
      question: "« Tu recopies les huit lignes du texte en guise de réponse. » Que faut-il corriger ?",
      correction: "Ne pas tout recopier : on ne te demande pas le texte.",
      micros: ["5e_ecrit_reflexion"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesEcritureProduire5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire d'invention et de réflexion - 5e",
    section: {
      type: "objectif",
      phrase: "On vérifie un texte en comptant ses pièces",
      sousPhrase:
        "Un récit, une argumentation, une réponse : trois devoirs très différents, une seule vérification.",
      encadre: {
        titre: "L'idée",
        texte: "Un récit sans obstacle et une argumentation sans exemple ont le même défaut.",
      },
    },
  },
  {
    titre: "Les quatre pièces d'un récit",
    badge: "Écrire d'invention et de réflexion - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le lieu", texte: "Sinon on ne sait pas du tout où cela se passe." },
        { titre: "L'obstacle", texte: "Sinon le héros obtient tout sans rien faire." },
        { titre: "L'ordre", texte: "Sinon on ne sait plus ce qui vient avant." },
        { titre: "La fin", texte: "Sinon le récit s'arrête sans que rien soit réglé." },
      ],
    },
    schema: charpenteSansObstacle,
  },
  {
    titre: "Montrer, plutôt que nommer",
    badge: "Écrire d'invention et de réflexion - 5e",
    section: {
      type: "etapes",
      etapes: [
        "« Il avait peur » informe ; « ses mains tremblent » fait exister.",
        "Une description suit un parcours : de la porte vers le fond.",
        "Trois ans tiennent en une phrase ; une seconde peut occuper dix lignes.",
        "Et la vue seule ne suffit jamais : ajoute un son et une odeur.",
      ],
    },
    schema: montrerPasDire,
  },
  {
    titre: "L'exemple ne soutient pas la thèse",
    badge: "Écrire d'invention et de réflexion - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "L'argument",
        contenu: "Il soutient la thèse : « beaucoup n'ont pas d'endroit calme chez eux ».",
      },
      droite: {
        titre: "L'exemple",
        contenu: "Il rend vrai l'argument : « quatorze élèves travaillaient dans le couloir ».",
      },
    },
    schema: chaineArgumentative,
  },
  {
    titre: "La réponse rédigée",
    badge: "Écrire d'invention et de réflexion - 5e",
    section: {
      type: "etapes",
      etapes: [
        "REPRENDS les mots de la question dans ta première phrase.",
        "RÉPONDS à ce qui est demandé : « pourquoi » appelle une cause.",
        "CITE le passage qui le prouve, entre guillemets.",
        "Et ne recopie pas tout : on ne te demande pas le texte.",
      ],
    },
    schema: reprendreLaQuestion,
  },
  {
    titre: "À vous",
    badge: "Écrire d'invention et de réflexion - 5e",
    section: {
      type: "exercice",
      enonce: "« Le pont était coupé, mais un bateau passait justement là. »",
      question: "Quelle pièce manque, et comment la réparer ?",
      indice: "Compte : le lieu, l'obstacle, l'ordre, la fin.",
      correction:
        "L'OBSTACLE. Il est posé — le pont coupé — puis retiré aussitôt par un hasard. Un obstacle qui se résout tout seul n'en est pas un : fais-lui couter quelque chose.",
    },
    schema: charpenteSansObstacle,
  },
];
