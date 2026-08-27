// ─── Fiche de cours : prendre la parole, communiquer et interagir (5e) ────────
// LA DIXIÈME FICHE DE LA 5e ÉCRITE LE 26/08/2026 — et elle FERME le domaine de
// l'oral : les trois notions du BO ont désormais leur fiche.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Prendre la parole, communiquer et interagir », quatre objectifs :
// présenter une lecture ou un travail, justifier son point de vue, entrer dans
// un dialogue, intervenir dans un débat en respectant les règles.
// ⛔ CE N'EST PAS LE PROGRAMME DE LA 4e.
//
// ⭐⭐ LA FIGURE : LES TROIS PIÈCES D'UNE JUSTIFICATION, ET CELLE QUI MANQUE.
// C'est l'angle exact de la table ARGUMENTER — une justification tient en trois
// morceaux (l'avis, la raison, le passage) et l'exercice consiste à dire lequel
// manque. Trois `groupes` sur une phrase complète le montrent d'un trait ; sur
// les phrases incomplètes, le crochet absent EST le diagnostic. C'est le même
// procédé que « lu d'un trait » dans `francais-5e-lecture-voix-haute.tsx` : on
// dessine le défaut, pas le modèle.
//
// ⛔ RÈGLE DE COULEUR — un crochet qui n'est pas une fonction reste GRIS, et
// c'est vérifié au rendu depuis qu'une étiquette « le sujet » est sortie en
// BLEU dans `francais-5e-oral-ecouter.tsx` (`couleurFonction` teste
// `includes("sujet")`). Ici : « l'avis », « la raison », « le passage »,
// « l'idée », « la personne », « avec mes mots » — aucune ne tombe dans un test.
//
// ⛔⛔ LE PARTAGE ENTRE LES QUATRE MICROS, écrit dans les en-têtes des banques et
// à respecter sous peine de tout redire quatre fois :
//   `presenter`  → le CONTENU d'une présentation de lecture, et son ordre ;
//   `argumenter` → ce qu'il faut mettre DANS SA PROPRE prise de parole ;
//   `dialogue`   → les gestes de l'échange à deux ou en petit groupe ;
//   `debat`      → les RÈGLES collectives, et ce qui est hors jeu.
// Et `5e_oral_corps` (fiche `oral_dire_jouer`) tient la posture, la voix et le
// regard : rien de tout cela ici.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre, aucun auteur dans ce qui est
// demandé à l'élève — les livres sont choisis par le professeur.
//
// Alignée sur les tables PRESENTER et ARGUMENTER de
// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts et sur les
// tables DIALOGUE et DEBAT de ecriture-oral.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `oral_prendre_parole`) :
// - 5e_oral_presenter  → propriétés 1 et 2, méthode 1, usage 1, exemples 1 et 2
// - 5e_oral_argumenter → figure, propriétés 3 à 5, formule, méthode 2, usage 2,
//                        exemples 3 et 4
// - 5e_oral_dialogue   → propriétés 6 et 7, méthode 3, exemple 5
// - 5e_oral_debat      → propriétés 8 et 9, méthode 4, usage 3, exemple 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// une étiquette de groupe ne se plie pas ; un mot par entrée, ponctuation
// comprise ; les blocs n'interprètent pas le markdown.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les trois pièces, et le crochet qui manque ───────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : une justification complète, et ses trois pièces.
const troisPieces = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "courageux" },
    { texte: ":" },
    { texte: "il" },
    { texte: "repart" },
    { texte: "alors" },
    { texte: "qu'il" },
    { texte: "tremble" },
    { texte: "," },
    { texte: "page" },
    { texte: "30" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "l'avis" },
    { mots: [4, 9], label: "la raison" },
    { mots: [10, 12], label: "le passage" },
  ],
  legende: "Trois pièces, et rien de plus. Une justification qui tient est courte.",
});

const manqueRaison = phrase({
  mots: [
    { texte: "Ce" },
    { texte: "personnage" },
    { texte: "est" },
    { texte: "courageux" },
    { texte: "," },
    { texte: "voilà" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 6], label: "l'avis seul" }],
  legende: "Un seul crochet : tu dis QUOI, jamais POURQUOI. Il manque la raison.",
});

const manquePassage = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "courageux" },
    { texte: "," },
    { texte: "il" },
    { texte: "continue" },
    { texte: "malgré" },
    { texte: "sa" },
    { texte: "peur" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "l'avis" },
    { mots: [4, 9], label: "la raison" },
  ],
  legende: "Deux crochets sur trois : la raison ne s'appuie sur aucune ligne du texte.",
});

const resumeEnTrop = phrase({
  mots: [
    { texte: "Il", barre: true },
    { texte: "part", barre: true },
    { texte: ",", barre: true },
    { texte: "il", barre: true },
    { texte: "marche", barre: true },
    { texte: ",", barre: true },
    { texte: "puis", barre: true },
    { texte: "il", barre: true },
    { texte: "rentre", barre: true },
    { texte: "." },
  ],
  legende: "Un résumé en trop : tu racontes au lieu de juger. Rien n'est défendu.",
});

// ── PRÉSENTER UNE LECTURE : l'ordre compte, et la fin ne se dit pas.
const ouvertureDeuxPhrases = phrase({
  mots: [
    { texte: "un" },
    { texte: "roman" },
    { texte: "d'aventures" },
    { texte: "·" },
    { texte: "un" },
    { texte: "départ" },
    { texte: "en" },
    { texte: "mer" },
  ],
  groupes: [
    { mots: [0, 2], label: "le genre" },
    { mots: [4, 7], label: "de quoi ça parle" },
  ],
  legende: "Les deux premières phrases : le genre, puis de quoi cela parle.",
});

const finTue = phrase({
  mots: [
    { texte: "le" },
    { texte: "début" },
    { texte: "·" },
    { texte: "un" },
    { texte: "passage" },
    { texte: "·" },
    { texte: "la" },
    { texte: "fin", barre: true },
  ],
  legende: "On raconte le début, on lit un passage — on ne dit JAMAIS la fin.",
});

// ── LE DIALOGUE : s'accrocher à ce que l'autre vient de dire.
const enchainerDernierMot = phrase({
  mots: [
    { texte: "…" },
    { texte: "la" },
    { texte: "peur", focus: true },
    { texte: "·" },
    { texte: "Justement" },
    { texte: "," },
    { texte: "cette" },
    { texte: "peur", focus: true },
    { texte: "…" },
  ],
  liens: [{ de: 7, vers: 2, label: "j'enchaine", type: "reprise" }],
  legende: "On attend la fin de sa phrase, puis on reprend son dernier mot.",
});

const reformuler = phrase({
  mots: [
    { texte: "Tu" },
    { texte: "dis" },
    { texte: "donc" },
    { texte: "que" },
    { texte: "…" },
    { texte: "c'est" },
    { texte: "bien" },
    { texte: "ça" },
    { texte: "?" },
  ],
  groupes: [{ mots: [0, 4], label: "avec mes mots" }],
  legende: "On redit ce qu'on a compris, et l'on demande si c'est bien cela.",
});

// ── LE DÉBAT : ce qui est hors jeu, et pourquoi.
const attaquePersonne = phrase({
  mots: [
    { texte: "Ton" },
    { texte: "idée" },
    { texte: "est" },
    { texte: "fausse" },
    { texte: "," },
    { texte: "comme", barre: true },
    { texte: "toi", barre: true },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 4], label: "l'idée" }],
  legende: "On attaque l'idée. La seconde moitié vise la personne : hors jeu.",
});

const chiffreSansSource = phrase({
  mots: [
    { texte: "Sept" },
    { texte: "élèves" },
    { texte: "sur" },
    { texte: "dix", focus: true },
    { texte: "le" },
    { texte: "pensent" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 6], label: "d'où vient-il" }],
  legende: "Un chiffre sans origine ne prouve rien : on demande la source.",
});

const nombreNestPasPreuve = phrase({
  mots: [
    { texte: "Tout" },
    { texte: "le" },
    { texte: "monde" },
    { texte: "le" },
    { texte: "sait" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 5], label: "combien, non" }],
  legende: "Le nombre de gens qui pensent une chose ne prouve pas qu'elle soit vraie.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralPrendreParole5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "oral-prendre-parole",
  titre: "Prendre la parole et interagir en 5e (2026-2027)",
  accroche:
    "« Moi je trouve que ce personnage est courageux, voilà. » Tout le monde a déjà dit une phrase comme celle-là, et tout le monde a senti qu'elle ne suffisait pas — sans savoir ce qui manquait. Il manque deux pièces sur trois : la raison, et l'endroit du texte. Une justification qui tient n'est pas plus longue ; elle est complète.",
  identite: [
    { label: "Mots clés", valeur: "Présenter, justifier, dialoguer, débattre" },
    { label: "Le secret", valeur: "Trois pièces : l'avis, la raison, le passage" },
    { label: "Outil", valeur: "Compter ce qui manque, pas ce qui est dit" },
  ],
  definition: {
    texte:
      "Prendre la parole devant les autres se règle par des gestes, et non par de l'assurance. PRÉSENTER une lecture suit un ordre : le genre et le sujet en deux phrases, le début de l'histoire — jamais la fin —, un court passage lu et préparé, ce qui t'a plu avec un exemple, et à qui tu le conseilles. JUSTIFIER un point de vue tient en trois pièces qu'on peut compter : l'AVIS, la RAISON, le PASSAGE du texte. DIALOGUER, c'est s'accrocher à ce que l'autre vient de dire plutôt que d'attendre son tour pour placer sa phrase. DÉBATTRE, enfin, obéit à des règles collectives : on attaque l'idée et non la personne, on demande d'où vient un chiffre, on rétablit ce que l'autre a vraiment dit — et changer d'avis en cours de débat n'est pas une faiblesse, c'est le résultat du débat.",
  },
  figure: {
    schema: pile(troisPieces, manqueRaison),
    legende:
      "En haut, une justification complète : trois crochets, l'avis, la raison, le passage. En bas, la même idée avec un seul crochet — et ce qui manque se voit au lieu de se deviner. C'est le procédé qu'on emploie pour les défauts depuis la fiche de lecture à voix haute : on ne dessine pas le modèle, on dessine le manque. Remarque aussi que la version complète est plus COURTE que beaucoup de réponses bavardes : justifier n'est pas parler longtemps.",
  },
  proprietes: [
    {
      titre: "Une présentation commence par deux phrases",
      texte:
        "Le genre, puis de quoi cela parle. Pas « alors, mon livre, il est bien » — après une minute, personne ne sait encore de quoi il s'agit.",
      schema: ouvertureDeuxPhrases,
      micros: ["5e_oral_presenter"],
    },
    {
      titre: "On ne dit jamais la fin",
      texte:
        "Le début, un passage choisi, ce qui t'a plu, à qui tu le conseilles. Raconter la fin est la faute la plus fréquente, et celle qui fâche.",
      schema: finTue,
      micros: ["5e_oral_presenter"],
    },
    {
      titre: "Une justification a trois pièces",
      texte:
        "L'AVIS — ce que tu défends. La RAISON — pourquoi. Le PASSAGE — où le texte le montre. Il suffit de les compter.",
      schema: troisPieces,
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "La pièce qui manque le plus souvent",
      texte:
        "La raison, quand on dit son avis sans dire pourquoi. Le passage, quand la raison ne s'appuie sur aucune ligne du texte.",
      schema: pile(manqueRaison, manquePassage),
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "Le résumé est une pièce EN TROP",
      texte:
        "« Il part, il marche, puis il rentre » raconte sans juger. Ce n'est pas une justification incomplète : ce n'en est pas une du tout.",
      schema: resumeEnTrop,
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "Dialoguer, c'est s'accrocher à l'autre",
      texte:
        "On attend la fin de sa phrase, puis on reprend son dernier mot pour enchainer. Attendre son tour pour placer sa phrase n'est pas un dialogue.",
      schema: enchainerDernierMot,
      micros: ["5e_oral_dialogue"],
    },
    {
      titre: "Quand on n'a pas compris, on reformule",
      texte:
        "« Tu dis donc que… c'est bien ça ? » On redit avec ses mots, et l'on vérifie. Cela évite une discussion entière sur un malentendu.",
      schema: reformuler,
      micros: ["5e_oral_dialogue"],
    },
    {
      titre: "On attaque l'idée, jamais la personne",
      texte:
        "« Ton idée est fausse » est recevable. « Comme toi » ne l'est pas — et c'est la règle qui protège tout le monde, y compris celui qui parle.",
      schema: attaquePersonne,
      micros: ["5e_oral_debat"],
    },
    {
      titre: "Deux choses qui ne prouvent rien",
      texte:
        "Un chiffre sans origine : on demande d'où il vient. « Tout le monde le sait » : le nombre de gens qui pensent une chose ne la rend pas vraie.",
      schema: pile(chiffreSansSource, nombreNestPasPreuve),
      micros: ["5e_oral_debat"],
    },
  ],
  reel: {
    texte:
      "Les trois pièces servent partout, et bien après le collège. Une réclamation qui aboutit dit ce qu'elle demande, pourquoi, et sur quoi elle s'appuie — la facture, la date, la ligne du contrat. Une réclamation qui échoue dit seulement qu'on n'est pas content. Un entretien, une demande à un professeur, une objection en réunion suivent la même charpente : l'avis, la raison, la preuve. Et les règles du débat protègent quelque chose de précieux : dans un échange où l'on attaque les personnes, celui qui a raison mais qui parle mal perd, et celui qui parle fort gagne. Demander d'où vient un chiffre n'est pas de la méfiance — c'est ce qui permet à une discussion d'aboutir plutôt que de s'épuiser.",
  },
  historique: {
    texte:
      "Les règles du débat ont été écrites il y a très longtemps, et d'abord pour se défendre contre ceux qui les enfreignaient. Dans l'Athènes du Ve siècle avant notre ère, on payait des maitres — les sophistes — pour apprendre à emporter n'importe quelle discussion, y compris en ayant tort : déformer l'idée de l'adversaire pour la démolir plus facilement, invoquer le grand nombre, attaquer l'homme plutôt que le propos. Aristote a répertorié ces procédés un siècle plus tard, non pour les enseigner mais pour permettre de les reconnaitre — c'est le premier catalogue de ce qu'on appelle aujourd'hui les arguments fallacieux. Ils n'ont pas changé depuis vingt-quatre siècles. Celui que tu croiseras le plus souvent, l'attaque contre la personne, portait déjà un nom chez les Romains : argumentum ad hominem.",
  },
  formule: {
    contexte: "Le contrôle qui dit, en une seconde, si une justification tient.",
    expression: "je compte les pièces : l'avis, la raison, le passage",
    legende:
      "Trois sur trois : elle tient. Deux sur trois : il manque quelque chose, et l'on sait quoi. Une seule : c'est un avis, pas une justification. Et si l'on trouve un résumé à la place de l'avis, il n'y a rien à compter — on racontait au lieu de juger.",
    schema: pile(troisPieces, manquePassage),
  },
  methode: [
    {
      titre: "Présenter dans l'ordre, et s'arrêter avant la fin",
      texte:
        "Le genre et le sujet, le début, un passage préparé, ce qui t'a plu avec un exemple, à qui tu le conseilles. Cinq temps, et la fin reste tue.",
      schema: pile(ouvertureDeuxPhrases, finTue),
      micros: ["5e_oral_presenter"],
    },
    {
      titre: "Compter les trois pièces avant de parler",
      texte:
        "Ai-je dit ce que je défends ? Pourquoi ? Où le texte le montre ? Si une manque, la phrase ne tiendra pas — et tu le sais avant de l'avoir dite.",
      schema: troisPieces,
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "Reprendre le dernier mot de l'autre",
      texte:
        "C'est le geste qui transforme deux monologues en un dialogue. Et si tu n'as pas compris : redis-le avec tes mots, puis demande si c'est bien cela.",
      schema: pile(enchainerDernierMot, reformuler),
      micros: ["5e_oral_dialogue"],
    },
    {
      titre: "Demander d'où ça vient, sans agressivité",
      texte:
        "« Sur quoi tu t'appuies ? », « d'où vient ce chiffre ? » Ce sont des questions de débat, pas des attaques — et elles font avancer la discussion.",
      schema: chiffreSansSource,
      micros: ["5e_oral_debat"],
    },
  ],
  usages: [
    {
      titre: "Pour présenter un livre à la classe",
      detail:
        "Cinq temps, quatre minutes, et un passage préparé plutôt qu'ouvert au hasard. La question à laquelle tu dois répondre : dois-je le lire ?",
      schema: pile(ouvertureDeuxPhrases, finTue),
      micros: ["5e_oral_presenter"],
    },
    {
      titre: "Pour répondre à une question de cours",
      detail:
        "La même charpente à l'oral qu'à l'écrit : l'avis, la raison, le passage. C'est ce qu'on te demande, et c'est tout ce qu'on te demande.",
      schema: troisPieces,
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "Pour qu'un débat aboutisse",
      detail:
        "Une question claire au départ, le temps réparti, l'idée visée plutôt que la personne, et un récapitulatif à la fin : accords d'un côté, désaccords de l'autre.",
      schema: pile(attaquePersonne, nombreNestPasPreuve),
      micros: ["5e_oral_debat"],
    },
  ],
  exemples: [
    {
      titre: "Le début d'une présentation",
      donnees: "« Tu as parlé une minute et personne ne sait de quoi il s'agit. »",
      schema: ouvertureDeuxPhrases,
      question: "Que fallait-il faire ?",
      solution:
        "Dire LE GENRE ET DE QUOI CELA PARLE, en deux phrases — dès le début. « Un roman d'aventures ; un garçon part en mer pour retrouver son frère. » Tout le reste — ce qui t'a plu, le passage, le conseil — n'est écoutable qu'une fois ces deux phrases dites.",
      micros: ["5e_oral_presenter"],
    },
    {
      titre: "La faute qui fâche",
      donnees: "« Tu as commencé par : à la fin, le personnage meurt, mais… »",
      schema: finTue,
      question: "Que s'est-il passé ?",
      solution:
        "Tu as raconté LA FIN. C'est la faute la plus fréquente de l'exercice, et celle qui coute le plus : les camarades qui voulaient lire le livre ne le liront plus. On raconte le début, on lit un passage, on dit à qui on le conseille — et l'on s'arrête là.",
      micros: ["5e_oral_presenter"],
    },
    {
      titre: "Compter les pièces",
      donnees: "« Cette fin est ratée. C'est mon avis et je le garde. »",
      schema: manqueRaison,
      question: "Que manque-t-il ?",
      solution:
        "LA RAISON : tu dis quoi, jamais pourquoi. « C'est mon avis et je le garde » n'ajoute rien — c'est une façon de refuser la discussion, pas de la nourrir. Il manque aussi le passage : deux pièces sur trois, et la phrase ne tient pas.",
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "Presque complète",
      donnees: "« Elle ment, parce qu'elle ne veut pas inquiéter sa mère. »",
      schema: manquePassage,
      question: "Que manque-t-il ?",
      solution:
        "LE PASSAGE : ta raison ne s'appuie sur aucune ligne. L'avis y est (« elle ment »), la raison aussi (« pour ne pas inquiéter sa mère ») — mais rien ne dit où le texte le montre. Une ligne, un numéro de page, une phrase citée : c'est ce qui sépare une lecture d'une supposition.",
      micros: ["5e_oral_argumenter"],
    },
    {
      titre: "Un échange qui tourne en rond",
      donnees: "« Tu répètes ton idée pour la troisième fois. »",
      schema: reformuler,
      question: "Que fais-tu ?",
      solution:
        "Tu essaies de LA DIRE AUTREMENT. Si elle ne passe pas après trois fois, ce n'est pas l'idée qui bloque, c'est la formulation — et la répéter une quatrième fois plus fort ne changera rien. Reformuler, c'est aussi ce qu'on fait quand on n'a pas compris l'autre.",
      micros: ["5e_oral_dialogue"],
    },
    {
      titre: "Une phrase hors des règles",
      donnees: "« Ton idée est nulle, comme toi. »",
      schema: attaquePersonne,
      question: "Qu'est-ce qui ne va pas ?",
      solution:
        "La phrase ATTAQUE LA PERSONNE au lieu de l'idée. La première moitié est recevable — on a le droit de trouver une idée mauvaise, à condition de dire pourquoi. La seconde est hors des règles du débat, et elle a un nom depuis les Romains : l'argument ad hominem.",
      micros: ["5e_oral_debat"],
    },
  ],
  pieges: [
    "Raconter la fin d'un livre qu'on présente : la faute la plus fréquente, et celle qui prive les autres de leur lecture.",
    "Ouvrir le livre au hasard pour lire un passage : un extrait se choisit et se prépare, comme une lecture à voix haute.",
    "Dire son avis sans la raison : « c'est mon avis et je le garde » ferme la discussion au lieu de la nourrir.",
    "Donner une raison sans passage : c'est une supposition, pas une lecture. Une ligne du texte suffit à la transformer.",
    "Résumer au lieu de juger : raconter ce qui se passe n'est pas défendre un point de vue.",
    "Attaquer la personne dans un débat : hors des règles, et cela fait perdre celui qui a raison mais parle mal.",
  ],
  aRetenir: [
    "Une justification a TROIS pièces : l'avis, la raison, le passage. On les compte.",
    "Un résumé n'est pas une justification incomplète : ce n'en est pas une du tout.",
    "Présenter : le genre et le sujet, le début, un passage préparé — jamais la fin.",
    "Dialoguer, c'est reprendre le dernier mot de l'autre, pas attendre son tour.",
    "En débat : l'idée, jamais la personne. Et un chiffre sans source ne prouve rien.",
  ],
  entrainement: [
    {
      question: "« Tu dis “j'ai bien aimé” et tu passes à autre chose. » Que fallait-il faire ?",
      correction: "Dire ce qui t'a plu, et pourquoi, avec un exemple.",
      micros: ["5e_oral_presenter"],
    },
    {
      question: "« Tu as fini, et personne ne sait s'il doit le lire. » Que manquait-il ?",
      correction: "Dire à qui tu le conseilles, et pour quelle raison.",
      micros: ["5e_oral_presenter"],
    },
    {
      question: "« Le texte répète trois fois le mot “seul” en une page. » Que manque-t-il ?",
      correction: "Ton avis : on ne sait pas ce que tu veux défendre avec cette remarque.",
      micros: ["5e_oral_argumenter"],
    },
    {
      question: "« Quelqu'un n'a pas parlé depuis le début. » Que fais-tu ?",
      correction: "Tu lui poses une question directement.",
      micros: ["5e_oral_dialogue"],
    },
    {
      question: "« Un participant change d'avis en cours de débat. » Comment le prendre ?",
      correction: "C'est un résultat du débat, pas une faiblesse.",
      micros: ["5e_oral_debat"],
    },
    {
      question: "« Un participant cite un chiffre sans dire d'où il vient. » Que fais-tu ?",
      correction: "Tu demandes la source : un chiffre sans origine ne prouve rien.",
      micros: ["5e_oral_debat"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesOralPrendreParole5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Prendre la parole - 5e",
    section: {
      type: "objectif",
      phrase: "Une justification a trois pièces",
      sousPhrase:
        "L'avis, la raison, le passage. On peut les compter — et savoir avant de parler si la phrase tiendra.",
      encadre: {
        titre: "L'idée",
        texte: "« Il est courageux : il repart alors qu'il tremble, page 30. » Trois sur trois.",
      },
    },
  },
  {
    titre: "Ce qui manque se voit",
    badge: "Prendre la parole - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Il manque la raison",
        contenu: "« Ce personnage est courageux, voilà. » Tu dis quoi, jamais pourquoi.",
      },
      droite: {
        titre: "Il manque le passage",
        contenu: "« … parce qu'il continue malgré sa peur. » Aucune ligne du texte.",
      },
    },
    schema: pile(manqueRaison, manquePassage),
  },
  {
    titre: "Présenter un livre en cinq temps",
    badge: "Prendre la parole - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Le genre et de quoi cela parle, en deux phrases.",
        "Le début de l'histoire — et JAMAIS la fin.",
        "Un court passage, choisi et préparé à l'avance.",
        "Ce qui t'a plu avec un exemple, et à qui tu le conseilles.",
      ],
    },
    schema: pile(ouvertureDeuxPhrases, finTue),
  },
  {
    titre: "Dialoguer, ce n'est pas attendre son tour",
    badge: "Prendre la parole - 5e",
    section: {
      type: "etapes",
      etapes: [
        "J'attends la fin de sa phrase — je ne coupe pas.",
        "Je reprends son dernier mot pour enchainer.",
        "Si je n'ai pas compris : je le redis avec mes mots et je demande.",
        "S'il a raison sur un point, je le reconnais à voix haute.",
      ],
    },
    schema: pile(enchainerDernierMot, reformuler),
  },
  {
    titre: "Les règles du débat",
    badge: "Prendre la parole - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "L'idée, pas la personne", texte: "« Ton idée est fausse » : oui. « Comme toi » : non." },
        { titre: "La source", texte: "Un chiffre sans origine ne prouve rien. On demande d'où il vient." },
        { titre: "Le nombre", texte: "« Tout le monde le sait » n'est pas un argument." },
        { titre: "Changer d'avis", texte: "C'est un résultat du débat, pas une faiblesse." },
      ],
    },
    schema: pile(attaquePersonne, nombreNestPasPreuve),
  },
  {
    titre: "À vous",
    badge: "Prendre la parole - 5e",
    section: {
      type: "exercice",
      enonce: "« Il part, il marche, il rencontre un vieil homme, puis il rentre. »",
      question: "Combien de pièces cette justification a-t-elle ?",
      indice: "Cherche l'avis. Que défend cette phrase ?",
      correction:
        "Aucune. Ce n'est pas une justification incomplète : c'est un RÉSUMÉ. On raconte au lieu de juger, et il n'y a donc rien à compter.",
    },
    schema: resumeEnTrop,
  },
];
