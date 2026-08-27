// ─── Fiche de cours : employer le mot juste (6e) ──────────────────────────────
// LA DOUZIÈME FICHE DE FRANÇAIS DE LA 6e — et elle FERME le domaine du lexique :
// les trois notions de vocabulaire du cycle 3 ont désormais leur fiche.
//
// ⚠️⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Sixième ». ⛔⛔ LA 6e FERME LE CYCLE 3 — ne jamais
// transposer depuis la 5e.
//
// ⭐ CE QUE LA 6e FAIT ET QUE LA 5e NE FAIT PAS SUR LE REGISTRE. En 5e, l'élève
// TRADUIT une phrase d'un registre à l'autre (`discours_registres`). En 6e, il
// CHOISIT le registre d'après la SITUATION — « tu écris au maire de ta
// commune » —, et il RANGE les mots du plus familier au plus soutenu. C'est un
// geste de tri, pas de traduction, et le canvas suit : `number_line` range,
// il ne récrit pas.
//
// ⭐ LA BANDE `nature` RESSERT, ET POUR UNE AUTRE RAISON QU'À LA FICHE
// PRÉCÉDENTE. Là, elle montrait qu'un antonyme garde la classe du mot ; ici,
// elle montre POURQUOI un mot mal employé sonne faux : « un fièrement » place un
// adverbe après un déterminant, là où il faudrait un nom. L'élève voit l'erreur
// au lieu de l'entendre vaguement.
//
// ⛔ RÈGLE DE COULEUR : un crochet qui n'est pas une fonction reste GRIS, vérifié
// AU RENDU (une étiquette « le sujet » est sortie en bleu en 5e). ⚠️ Les
// `nature`, elles, sont toujours grises — ce sont bien des classes de mots.
//
// Alignée sur les items `6e_fr_fixed_empl_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `vocabulaire_emploi`) :
// - 6e_voc_reemploi      → figure, propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_voc_niveau_langue → propriétés 3 et 4, formule, méthode 2, usage 2, exemple 2
// - 6e_voc_polysemie     → propriétés 5 et 6, méthode 3, exemples 3 et 4
// - 6e_voc_orthographe   → propriété 7, méthode 4, exemple 5
// - 6e_voc_emploi_defi   → propriété 8, usage 3, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
  NumberLineCanvasPoint,
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

/** L'échelle des registres : un ORDRE, du plus familier au plus soutenu.
 *  ⚠️ `showValues: false` — il n'y a pas de nombres sur une échelle de mots. */
function echelle(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 4,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
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

// ─── Ce qui se dessine quand on emploie un mot ────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : la bande grise montre POURQUOI ça sonne faux.
const fierementJuste = phrase({
  mots: [
    { texte: "Il", nature: "pronom" },
    { texte: "brandit", nature: "verbe" },
    { texte: "fièrement", nature: "adverbe", focus: true },
    { texte: "sa" },
    { texte: "médaille" },
    { texte: "." },
  ],
  legende: "Un adverbe accompagne un VERBE : « fièrement » est à sa place.",
});

const fierementFaux = phrase({
  mots: [
    { texte: "Il", nature: "pronom" },
    { texte: "mange", nature: "verbe" },
    { texte: "un", nature: "déterm." },
    { texte: "fièrement", nature: "adverbe", barre: true },
    { texte: "." },
  ],
  legende: "Après un déterminant, il faudrait un NOM. « Un fièrement » n'existe pas.",
});

// ── LE REGISTRE SE CHOISIT D'APRÈS LA SITUATION.
const lettreFamiliere = phrase({
  mots: [
    { texte: "Faut", barre: true },
    { texte: "que", barre: true },
    { texte: "vous", barre: true },
    { texte: "regardiez", barre: true },
    { texte: "mon", barre: true },
    { texte: "truc", barre: true },
    { texte: "." },
  ],
  legende: "À une autorité, ce registre ferme la porte avant qu'on ait lu la suite.",
});

const lettreSoutenue = phrase({
  mots: [
    { texte: "Je" },
    { texte: "vous" },
    { texte: "prie" },
    { texte: "d'examiner", focus: true },
    { texte: "ma" },
    { texte: "demande" },
    { texte: "." },
  ],
  legende: "À qui l'on s'adresse décide du registre — ici, le langage soutenu.",
});

// ── L'ÉCHELLE : du plus familier au plus soutenu.
const echelleVoiture = echelle([
  { value: 1, label: "bagnole" },
  { value: 2, label: "voiture" },
  { value: 3, label: "automobile" },
]);

// ── LE MOT POLYSÉMIQUE : c'est la phrase qui choisit le sens.
const noteMusique = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "a" },
    { texte: "chanté" },
    { texte: "une" },
    { texte: "note", focus: true },
    { texte: "aiguë" },
    { texte: "." },
  ],
  legende: "Ici « note » est un son de musique : « chanté » et « aiguë » le disent.",
});

const noteEcole = phrase({
  mots: [
    { texte: "J'ai" },
    { texte: "eu" },
    { texte: "une" },
    { texte: "bonne" },
    { texte: "note", focus: true },
    { texte: "." },
  ],
  legende: "Le même mot, un autre sens. Rien n'a changé dans le mot.",
});

const noteAddition = phrase({
  mots: [
    { texte: "La" },
    { texte: "note", focus: true },
    { texte: "du" },
    { texte: "restaurant" },
    { texte: "était" },
    { texte: "salée" },
    { texte: "." },
  ],
  legende: "Troisième sens : ce qu'on paie. Un mot, plusieurs sens : la polysémie.",
});

// ── L'ORTHOGRAPHE D'UN MOT FRÉQUENT : où sont les pièges.
const orthographeRythme = phrase({
  mots: [
    { texte: "r" },
    { texte: "y", focus: true },
    { texte: "th", focus: true },
    { texte: "me" },
  ],
  legende: "« Rythme » : deux pièges en six lettres — le y, et le h APRÈS le t.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireEmploi6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "vocabulaire-emploi",
  titre: "Employer le mot juste en 6e",
  accroche:
    "« Il mange un fièrement. » Tout le monde sent que quelque chose cloche, et peu de gens savent dire quoi. « Fièrement » est un adverbe : il accompagne un verbe, il ne se met pas après « un ». Connaitre un mot ne suffit pas — encore faut-il savoir OÙ il se place, À QUI on parle, et lequel de ses sens on emploie.",
  identite: [
    { label: "Mots clés", valeur: "Emploi, registre, polysémie, orthographe" },
    { label: "Le secret", valeur: "Un mot connu n'est pas un mot maitrisé" },
    { label: "Outil", valeur: "À qui est-ce que je parle ?" },
  ],
  definition: {
    texte:
      "Employer un mot demande quatre choses que le connaitre ne donne pas. Sa PLACE d'abord : chaque classe de mot a la sienne, et un adverbe ne se met pas là où l'on attend un nom. Son REGISTRE ensuite : on ne s'adresse pas de la même façon à un camarade et au maire de sa commune, et ce n'est pas une question de politesse mais de situation — les mots se rangent du plus familier au plus soutenu, comme sur une échelle. Son SENS enfin, quand le mot en a plusieurs : « note » désigne un son de musique, un mot laissé sur une table, un résultat scolaire ou une addition — c'est un mot POLYSÉMIQUE, et c'est la phrase qui choisit lequel. Et bien sûr son ORTHOGRAPHE : les mots fréquents s'écrivent de mémoire, sans les chercher.",
  },
  figure: {
    schema: pile(fierementJuste, fierementFaux),
    legende:
      "Le même mot, deux places. En haut, « fièrement » suit le verbe « brandit » : un adverbe accompagne un verbe, il est chez lui. En bas, il suit le déterminant « un » — et là il faudrait un nom. La bande grise au-dessus des mots dit pourquoi la seconde phrase sonne faux, alors qu'on ne saurait pas l'expliquer sans elle.",
  },
  proprietes: [
    {
      titre: "Chaque classe de mot a sa place",
      texte:
        "Un adverbe accompagne un verbe, un adjectif accompagne un nom, un déterminant annonce un nom. Un mot bien employé est un mot bien placé.",
      schema: fierementJuste,
      micros: ["6e_voc_reemploi"],
    },
    {
      titre: "Un mot mal placé n'a plus de sens",
      texte:
        "« Un fièrement », « il mange un fièrement » : la phrase ne veut plus rien dire du tout. Ce n'est pas une maladresse, c'est une impasse.",
      schema: fierementFaux,
      micros: ["6e_voc_reemploi"],
    },
    {
      titre: "Le registre se choisit d'après la situation",
      texte:
        "À un camarade, à un professeur, au maire : trois façons de dire la même chose. Ce n'est pas une question de politesse, mais de destinataire.",
      schema: pile(lettreFamiliere, lettreSoutenue),
      micros: ["6e_voc_niveau_langue"],
    },
    {
      titre: "Les mots se rangent sur une échelle",
      texte:
        "Bagnole, voiture, automobile : le même objet, trois étages. Familier en bas, courant au milieu, soutenu en haut.",
      schema: echelleVoiture,
      micros: ["6e_voc_niveau_langue"],
    },
    {
      titre: "Un mot peut avoir plusieurs sens",
      texte:
        "« Note » : un son de musique, un papier laissé sur la table, un résultat, une addition. Un seul mot, quatre sens — c'est la polysémie.",
      schema: pile(noteMusique, noteEcole),
      micros: ["6e_voc_polysemie"],
    },
    {
      titre: "C'est la phrase qui choisit le sens",
      texte:
        "« Chanté » et « aiguë » désignent la musique ; « du restaurant » désigne l'addition. Le mot attend qu'on l'emploie pour signifier.",
      schema: noteAddition,
      micros: ["6e_voc_polysemie"],
    },
    {
      titre: "Les mots fréquents s'écrivent de mémoire",
      texte:
        "« Rythme » porte deux pièges en six lettres : un y, et un h placé APRÈS le t. Ces mots-là se retiennent une fois pour toutes.",
      schema: orthographeRythme,
      micros: ["6e_voc_orthographe"],
    },
    {
      titre: "Le défi : ranger trois mots dans l'ordre",
      texte:
        "Bagnole, voiture, automobile. Le même objet à trois étages : c'est le tri qui prouve qu'on a compris ce qu'est un registre.",
      schema: echelleVoiture,
      micros: ["6e_voc_emploi_defi"],
    },
  ],
  reel: {
    texte:
      "Tu écriras un jour une lettre à quelqu'un que tu ne connais pas — une demande, une réclamation, une candidature — et cette personne n'aura que tes phrases pour se faire une idée de toi. « Faut que vous regardiez mon truc » et « je vous prie d'examiner ma demande » disent exactement la même chose ; la première ferme la porte avant qu'on ait lu la suite. Ce n'est pas une question de mérite ni de politesse : c'est que chaque situation attend un registre, et qu'on est jugé sur celui qu'on choisit. Et l'inverse est vrai : écrire à un ami comme au maire sonne froid et un peu ridicule. Savoir monter et descendre l'échelle, c'est pouvoir parler à tout le monde.",
  },
  historique: {
    texte:
      "« Bagnole », « voiture », « automobile » : trois mots pour un objet, et trois histoires. « Voiture » est le plus ancien — il vient du latin vectura, le transport, et il désignait les charrettes bien avant les moteurs. « Automobile » a été fabriqué de toutes pièces à la fin du XIXe siècle, avec du grec (auto, soi-même) et du latin (mobilis, qui se déplace) : ce qui se déplace tout seul, sans cheval. Quant à « bagnole », il vient d'un ancien mot pour une mauvaise carriole, et il est resté familier depuis. Le plus savant des trois est donc le plus récent, et le plus courant le plus vieux. Un registre ne dit pas l'âge d'un mot : il dit dans quelles bouches il a vécu.",
  },
  formule: {
    contexte: "La question qui règle le registre avant d'écrire le premier mot.",
    expression: "à qui est-ce que j'écris, et est-ce que je le connais ?",
    legende:
      "Un camarade : registre familier, et c'est très bien. Un adulte que tu connais : courant. Quelqu'un que tu ne connais pas, ou une autorité : soutenu. Le réglage ne dépend pas de ce que tu as à dire — il dépend entièrement de la personne qui va te lire.",
    schema: pile(lettreFamiliere, lettreSoutenue),
  },
  methode: [
    {
      titre: "Vérifier la classe avant de placer le mot",
      texte:
        "Un adverbe après un verbe, un adjectif à côté d'un nom, un nom après un déterminant. Si la place ne convient pas, la phrase ne tiendra pas.",
      schema: fierementJuste,
      micros: ["6e_voc_reemploi"],
    },
    {
      titre: "Regarder d'abord à qui l'on s'adresse",
      texte:
        "Avant le premier mot, pas après. Le registre se décide au destinataire, et il tient toute la lettre — un seul mot familier la fait retomber.",
      schema: lettreSoutenue,
      micros: ["6e_voc_niveau_langue"],
    },
    {
      titre: "Pour un mot à plusieurs sens : lire autour",
      texte:
        "« Chanté », « aiguë » : la musique. « Du restaurant » : l'addition. Les mots voisins désignent le sens, à chaque fois.",
      schema: pile(noteMusique, noteAddition),
      micros: ["6e_voc_polysemie"],
    },
    {
      titre: "Repérer où sont les pièges d'un mot",
      texte:
        "Dans « rythme », le y et la place du h. Retenir l'endroit exact du piège vaut mieux que relire le mot entier dix fois.",
      schema: orthographeRythme,
      micros: ["6e_voc_orthographe"],
    },
  ],
  usages: [
    {
      titre: "Pour employer un mot qu'on vient d'apprendre",
      detail:
        "Un mot lu n'est pas un mot su. Emploie-le une fois dans une phrase à toi, et vérifie sa place : c'est là qu'il devient le tien.",
      schema: fierementJuste,
      micros: ["6e_voc_reemploi"],
    },
    {
      titre: "Pour écrire une lettre qui sera lue",
      detail:
        "Une demande au collège, à une mairie, à une association. Le registre est la première chose qu'on remarque, avant même le contenu.",
      schema: lettreSoutenue,
      micros: ["6e_voc_niveau_langue"],
    },
    {
      titre: "Pour ranger les mots qu'on entend",
      detail:
        "Bagnole, voiture, automobile. Savoir à quel étage se trouve un mot, c'est savoir quand on peut l'employer et quand il vaut mieux l'éviter.",
      schema: echelleVoiture,
      micros: ["6e_voc_emploi_defi"],
    },
  ],
  exemples: [
    {
      titre: "La place du mot",
      donnees: "Quelle phrase emploie correctement le mot « fièrement » ?",
      schema: pile(fierementJuste, fierementFaux),
      question: "« Le champion brandit fièrement sa médaille » ou « il mange un fièrement » ?",
      solution:
        "LA PREMIÈRE. « Fièrement » est un ADVERBE : il accompagne un verbe, ici « brandit ». Dans « il mange un fièrement », le déterminant « un » annonce un nom — et un adverbe ne peut pas prendre cette place. La phrase ne veut plus rien dire.",
      micros: ["6e_voc_reemploi"],
    },
    {
      titre: "Une lettre au maire",
      donnees: "Tu écris une lettre au maire de ta commune.",
      schema: lettreSoutenue,
      question: "Quelle formulation choisis-tu ?",
      solution:
        "« JE VOUS PRIE DE BIEN VOULOIR EXAMINER MA DEMANDE. » On adapte le registre à qui l'on s'adresse : à une autorité qu'on ne connait pas, le langage soutenu. « Répondez-moi vite s'il vous plait » est courant mais un peu brusque ; « faut que vous regardiez mon truc » est familier, et il ferme la porte.",
      micros: ["6e_voc_niveau_langue"],
    },
    {
      titre: "Le mot aux quatre sens",
      donnees: "Dans quelle phrase « note » désigne-t-il un son de musique ?",
      schema: noteMusique,
      question: "Comment choisis-tu ?",
      solution:
        "« ELLE A CHANTÉ UNE NOTE TRÈS AIGUË. » Regarde les mots voisins : « chanté » et « aiguë » appartiennent à la musique. Dans les trois autres phrases, « note » désigne un résultat scolaire, un papier laissé sur une table, une addition. Un mot polysémique attend sa phrase pour signifier.",
      micros: ["6e_voc_polysemie"],
    },
    {
      titre: "Et le sens le plus surprenant",
      donnees: "« La note du restaurant était salée. »",
      schema: noteAddition,
      question: "De quelle note s'agit-il ?",
      solution:
        "DE L'ADDITION — ce qu'on paie. Et « salée » ne parle pas de sel : elle était trop chère. Deux mots au sens figuré dans la même phrase courte, et pourtant personne ne s'y trompe : le contexte, encore, fait tout le travail.",
      micros: ["6e_voc_polysemie"],
    },
    {
      titre: "Un mot à retenir une fois pour toutes",
      donnees: "« rytme », « rithme », « rythme » ou « rhytme » ?",
      schema: orthographeRythme,
      question: "Quelle est l'orthographe correcte ?",
      solution:
        "RYTHME. Deux pièges en six lettres : un Y et non un I, et le H placé APRÈS le T — pas avant. C'est un mot fréquent : il se retient une fois, et l'on n'y revient plus. Repérer l'endroit exact du piège vaut mieux que relire le mot dix fois.",
      micros: ["6e_voc_orthographe"],
    },
    {
      titre: "Le défi",
      donnees: "« voiture », « bagnole », « automobile »",
      schema: echelleVoiture,
      question: "Range-les du plus familier au plus soutenu.",
      solution:
        "BAGNOLE, VOITURE, AUTOMOBILE. Le même objet à trois étages. « Bagnole » ne s'écrit pas dans une lettre officielle ; « automobile » sonnerait étrange entre amis. Aucun des trois n'est fautif — chacun a sa situation, et c'est cela qu'on te demande de savoir.",
      micros: ["6e_voc_emploi_defi"],
    },
  ],
  pieges: [
    "Employer un mot nouveau sans vérifier sa classe : « un fièrement » ne se corrige pas, la phrase est à refaire.",
    "Croire qu'un registre soutenu est plus poli : ce sont deux choses différentes. On peut être désagréable en langage soutenu.",
    "Choisir le registre après avoir écrit : il se décide au destinataire, avant le premier mot.",
    "Laisser un mot familier dans une lettre soutenue : un seul suffit à faire retomber la lettre entière.",
    "Croire qu'un mot polysémique est un mot difficile : « note » est un mot très simple, et il a quatre sens.",
    "Relire un mot difficile en entier : retiens plutôt l'endroit exact du piège — le h après le t de « rythme ».",
  ],
  aRetenir: [
    "Un mot connu n'est pas un mot maitrisé : il faut savoir sa place, son registre, son sens.",
    "Chaque classe de mot a sa place : l'adverbe suit le verbe, le nom suit le déterminant.",
    "Le registre se choisit d'après le destinataire, avant d'écrire le premier mot.",
    "Trois étages : familier, courant, soutenu. Aucun n'est fautif ; chacun a sa situation.",
    "Un mot polysémique a plusieurs sens, et c'est la phrase qui choisit lequel.",
  ],
  entrainement: [
    {
      question: "« lentement » : après quel mot se place-t-il ?",
      correction: "Après un verbe — c'est un adverbe. « Il marche lentement. »",
      micros: ["6e_voc_reemploi"],
    },
    {
      question: "Tu écris à un camarade de classe. Quel registre ?",
      correction: "Familier ou courant — et c'est très bien. Le soutenu sonnerait faux.",
      micros: ["6e_voc_niveau_langue"],
    },
    {
      question: "« Il a laissé une note sur la table. » De quelle note s'agit-il ?",
      correction: "D'un mot écrit. « Sur la table » et « laissé » désignent le sens.",
      micros: ["6e_voc_polysemie"],
    },
    {
      question: "« La pièce était plongée dans le noir. » Quel sens de « pièce » ?",
      correction: "Une salle. « Plongée dans le noir » ne va pas avec une monnaie.",
      micros: ["6e_voc_polysemie"],
    },
    {
      question: "Où est le piège dans « rythme » ?",
      correction: "Deux : un y et non un i, et le h après le t.",
      micros: ["6e_voc_orthographe"],
    },
    {
      question: "Range du plus familier au plus soutenu : « maison, baraque, demeure ».",
      correction: "Baraque, maison, demeure. Le même bâtiment à trois étages.",
      micros: ["6e_voc_emploi_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesVocabulaireEmploi6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Employer le mot juste - 6e",
    section: {
      type: "objectif",
      phrase: "Un mot connu n'est pas un mot maitrisé",
      sousPhrase:
        "Il faut encore savoir où il se place, à qui l'on parle, et lequel de ses sens on emploie.",
      encadre: {
        titre: "L'idée",
        texte: "« Il mange un fièrement. » Tout le monde sent que ça cloche. Voici pourquoi.",
      },
    },
  },
  {
    titre: "La place se lit dans la bande grise",
    badge: "Employer le mot juste - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "À sa place",
        contenu: "« Il brandit fièrement sa médaille. » Un adverbe suit un verbe.",
      },
      droite: {
        titre: "Hors de sa place",
        contenu: "« Il mange un fièrement. » Après « un », il faudrait un nom.",
      },
    },
    schema: pile(fierementJuste, fierementFaux),
  },
  {
    titre: "Trois étages, un seul objet",
    badge: "Employer le mot juste - 6e",
    section: {
      type: "etapes",
      etapes: [
        "FAMILIER : « bagnole ». Entre amis, et c'est très bien.",
        "COURANT : « voiture ». Partout, avec presque tout le monde.",
        "SOUTENU : « automobile ». À l'écrit, dans une lettre officielle.",
        "Aucun n'est fautif : chacun a sa situation.",
      ],
    },
    schema: echelleVoiture,
  },
  {
    titre: "À qui est-ce que j'écris ?",
    badge: "Employer le mot juste - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "« Faut que vous regardiez mon truc. »",
        contenu: "À une autorité : la porte se ferme avant qu'on ait lu la suite.",
      },
      droite: {
        titre: "« Je vous prie d'examiner ma demande. »",
        contenu: "La même chose, dite au registre que la situation attend.",
      },
    },
    schema: pile(lettreFamiliere, lettreSoutenue),
  },
  {
    titre: "Un mot, plusieurs sens",
    badge: "Employer le mot juste - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "« une note aiguë »", texte: "Un son de musique — « chanté » le dit." },
        { titre: "« une bonne note »", texte: "Un résultat scolaire." },
        { titre: "« une note sur la table »", texte: "Un mot écrit qu'on a laissé." },
        { titre: "« la note du restaurant »", texte: "L'addition — et « salée » veut dire chère." },
      ],
    },
    schema: pile(noteMusique, noteAddition),
  },
  {
    titre: "À vous",
    badge: "Employer le mot juste - 6e",
    section: {
      type: "exercice",
      enonce: "« voiture », « bagnole », « automobile »",
      question: "Range-les du plus familier au plus soutenu.",
      indice: "C'est le même objet dans les trois cas. Demande-toi où tu emploierais chacun.",
      correction:
        "Bagnole, voiture, automobile. « Bagnole » ne s'écrit pas dans une lettre officielle ; « automobile » sonnerait étrange entre amis.",
    },
    schema: echelleVoiture,
  },
];
