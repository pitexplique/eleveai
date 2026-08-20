// ─── Fiche de cours : la phrase — sujet, verbe, nature et fonction (CM2) ──────
// PREMIÈRE DES QUATRE FICHES DE GRAMMAIRE DU CM2. Elles remplacent la fiche
// unique `francais-cm2-grammaire-orthographe.tsx`, qui portait les seize micros
// de l'ancienne notion et en citait certains sans les traiter. Les quatre se
// suivent : on identifie la phrase (ici), puis ce qui complète le verbe, puis
// ce qui complète le nom, puis on écrit sans faute.
//
// Alignée sur lib/tutor-v4/knowledge/francais/cm2/microSkills.ts
// (notionId `grammaire_phrase`) et sur les pools PHRASE_SIMPLE, SUJET_VERBE,
// NATURE_FONCTION, SUJET_INVERSE de buildCycle3FrancaisBank.ts.
//
// ⭐ POUR LE CRPE : c'est la première question de toute analyse au concours —
// trouver le verbe conjugué, puis son sujet. Et la méthode attendue n'est pas
// « le sujet est devant le verbe » (faux une fois sur trois dans un texte
// littéraire) mais les manipulations : changer le temps pour isoler le verbe,
// poser « qui est-ce qui ? », encadrer par « c'est… qui ». Ce sont les trois
// réflexes du bloc `methode`, et c'est ce que le canvas `phrase` montre.
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - cm2_gram_phrase_simple   → définition, figure, propriété « Une phrase, un
//                              verbe conjugué », exemple 1, entraînement 1
// - cm2_gram_sujet_verbe     → propriété « Le sujet », méthode 1 et 2,
//                              exemple 2, entraînements 2 et 3
// - cm2_gram_sujet_inverse   → propriété « Le sujet peut passer derrière »,
//                              exemple 3, piège 1, entraînement 4
// - cm2_gram_nature_fonction → propriété « Nature ou fonction ? », formule,
//                              exemple 4, piège 3, entraînement 5
// - cm2_gram_phrase_defi     → le défi, dessiné (exemple 5) + entraînement 6
//
// Les phrases sont CELLES DE LA BANQUE : « Le facteur apporte le courrier »,
// « Chaque matin, le coq chante », « Le pêcheur répare son filet », « Sur le
// piton souffle un vent froid », « Où va ton frère ? », « Le chien dort » /
// « Je vois le chien », « Paul court et Léa saute ».
//
// ⚠️ Contrôle avant commit : REGLES.md § 2 quater (aucun texte de dessin sous
// 11 px une fois à l'échelle, fenêtre en 375 px).

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le helper commun à toutes les fiches de français : une seule façon de
// dessiner une phrase, donc un seul dessin à reconnaître pour l'élève. La
// couleur des fonctions est déduite du label par le canvas (sujet bleu, verbe
// rouge, objet vert, circonstanciel orange) : on ne l'écrit jamais ici.
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
      }}
    />
  );
}

// Dans une carte, on empile — jamais deux dessins côte à côte (REGLES § 2 ter).
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

// La figure de référence : un verbe encadré, un sujet, un complément. Tout le
// reste de la fiche revient à ce dessin.
const phraseReference = phrase({
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
    { mots: [3, 4], label: "complément" },
  ],
  legende: "Un verbe conjugué, et tout s'organise autour.",
});

// Un verbe conjugué = une phrase. Deux verbes = deux propositions : on le
// montre ici pour que « une phrase simple » veuille dire quelque chose.
const phraseUnVerbe = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "souffle", focus: true },
    { texte: "sur" },
    { texte: "le" },
    { texte: "lagon" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "verbe" }],
  legende: "Un seul verbe conjugué : une phrase simple.",
});

const phraseDeuxVerbes = phrase({
  mots: [
    { texte: "Paul" },
    { texte: "court", focus: true },
    { texte: "et" },
    { texte: "Léa" },
    { texte: "saute", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [4, 4], label: "verbe" },
  ],
  legende: "Deux verbes conjugués : deux propositions.",
});

// La question qui trouve le sujet, posée DEVANT le verbe.
const phraseSujet = phrase({
  mots: [
    { texte: "Le" },
    { texte: "facteur" },
    { texte: "apporte", focus: true },
    { texte: "le" },
    { texte: "courrier" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
  ],
  liens: [{ de: 2, vers: 1, label: "qui est-ce qui ?", type: "question" }],
});

// Le sujet inversé : la même question, mais la réponse est derrière. C'est le
// dessin qui doit le dire — une flèche qui part vers la DROITE.
const phraseSujetInverse = phrase({
  mots: [
    { texte: "Sur" },
    { texte: "le" },
    { texte: "piton" },
    { texte: "souffle", focus: true },
    { texte: "un" },
    { texte: "vent" },
    { texte: "froid" },
  ],
  groupes: [
    { mots: [3, 3], label: "verbe" },
    { mots: [4, 6], label: "sujet" },
  ],
  liens: [{ de: 3, vers: 5, label: "qui est-ce qui ?", type: "question" }],
  legende: "Le sujet est derrière : il reste le sujet.",
});

const phraseQuestion = phrase({
  mots: [
    { texte: "Où" },
    { texte: "va", focus: true },
    { texte: "ton" },
    { texte: "frère" },
    { texte: "?" },
  ],
  groupes: [
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 3], label: "sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "qui est-ce qui ?", type: "question" }],
  legende: "Dans une question, le sujet passe souvent derrière.",
});

// Nature ≠ fonction : le MÊME mot, deux phrases, deux fonctions, une nature
// qui n'a pas bougé. C'est l'exemple de la banque, dessiné.
const phraseNatureSujet = phrase({
  mots: [
    { texte: "Le", nature: "dét." },
    { texte: "chien", nature: "nom", focus: true },
    { texte: "dort", nature: "verbe" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "sujet" }],
});

const phraseNatureComplement = phrase({
  mots: [
    { texte: "Je", nature: "pronom" },
    { texte: "vois", nature: "verbe" },
    { texte: "le", nature: "dét." },
    { texte: "chien", nature: "nom", focus: true },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "complément" }],
});

// Le premier réflexe : changer le temps. Le mot qui bouge est le verbe.
const phraseChangerTemps = phrase({
  mots: [
    { texte: "Hier" },
    { texte: "," },
    { texte: "le" },
    { texte: "facteur" },
    { texte: "apportait", focus: true },
    { texte: "le" },
    { texte: "courrier" },
    { texte: "." },
  ],
  groupes: [{ mots: [4, 4], label: "verbe" }],
  legende: "« apporte » devient « apportait » : c'est le verbe.",
});

// L'encadrement « c'est … qui » : la preuve du sujet, celle qu'attend le CRPE.
const phraseEncadrement = phrase({
  mots: [
    { texte: "C'est" },
    { texte: "le" },
    { texte: "coq" },
    { texte: "qui" },
    { texte: "chante", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 2], label: "sujet" },
    { mots: [4, 4], label: "verbe" },
  ],
  legende: "« C'est… qui » encadre le sujet, et lui seul.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Trois pièges d'un coup : un
// complément placé en tête, un sujet qui n'est pas devant le verbe, et un mot
// dont la nature ne dit pas la fonction.
const phraseDefi = phrase({
  mots: [
    { texte: "Chaque" },
    { texte: "matin" },
    { texte: "," },
    { texte: "le" },
    { texte: "coq" },
    { texte: "chante", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "CC de temps" },
    { mots: [3, 4], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
  ],
  liens: [{ de: 5, vers: 4, label: "qui est-ce qui ?", type: "question" }],
  legende: "Le premier groupe n'est pas toujours le sujet.",
});

const pieges = [
  "Prendre le premier groupe de la phrase pour le sujet : dans « Chaque matin, le coq chante », le sujet est « le coq ».",
  "Croire que le sujet est toujours devant le verbe : « Sur le piton souffle un vent froid » — le sujet est « un vent froid », et le verbe s'accorde avec lui.",
  "Répondre « sujet » quand on demande la NATURE d'un mot : sujet est une fonction, nom est une nature.",
  "Confondre le verbe conjugué et un verbe à l'infinitif : seul le verbe conjugué change quand on change le temps.",
];

const aRetenir = [
  "Une phrase simple s'organise autour d'UN verbe conjugué.",
  "Le sujet répond à « qui est-ce qui ? » posée devant le verbe — même s'il est écrit derrière.",
  "La nature dit ce que le mot EST ; la fonction dit son rôle dans la phrase.",
];

export const fichePhraseCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-phrase",
  titre: "La phrase : sujet, verbe, nature et fonction",
  accroche:
    "Tout commence par le verbe conjugué. Une fois qu'on l'a trouvé, on lui pose une question et le sujet apparaît — même quand il se cache derrière.",
  identite: [
    { label: "Mots clés", valeur: "Verbe conjugué, sujet, nature, fonction" },
    { label: "Le secret", valeur: "On pose la question au verbe" },
    { label: "Outil", valeur: "Changer le temps, encadrer par « c'est… qui »" },
  ],
  definition: {
    texte:
      "Une phrase simple est un groupe de mots qui a un sens complet et qui s'organise autour d'un seul verbe conjugué. Autour de ce verbe, on trouve le sujet — celui qui fait l'action — et des compléments. Chaque mot a en plus une nature (nom, déterminant, verbe, adjectif, pronom, préposition) qui, elle, ne change jamais.",
  },
  figure: {
    schema: phraseReference,
    legende:
      "« Le pêcheur répare son filet. » Le verbe est encadré en rouge, le sujet en bleu, le complément en vert. Ces couleurs sont les mêmes dans toutes les fiches de français.",
  },
  proprietes: [
    {
      titre: "Une phrase, un verbe conjugué",
      texte: "On compte les verbes conjugués : un seul, c'est une phrase simple ; deux, c'est deux propositions.",
      schema: pile(phraseUnVerbe, phraseDeuxVerbes),
    },
    {
      titre: "Le sujet",
      texte: "Il répond à « qui est-ce qui ? » posée devant le verbe, et c'est avec lui que le verbe s'accorde.",
      schema: phraseSujet,
    },
    {
      titre: "Le sujet peut passer derrière",
      texte: "Après un complément en tête ou dans une question, le sujet se place souvent après le verbe : il reste le sujet.",
      schema: pile(phraseSujetInverse, phraseQuestion),
    },
    {
      titre: "Nature ou fonction ?",
      texte: "La nature est écrite dans le dictionnaire ; la fonction n'existe que dans une phrase et peut changer.",
      schema: pile(phraseNatureSujet, phraseNatureComplement),
    },
  ],
  reel: {
    texte:
      "C'est ce qu'on fait à chaque relecture : trouver le sujet pour savoir s'il faut écrire « le coq chante » ou « les coqs chantent ». Et dans un texte de lecture, repérer le verbe d'une longue phrase, c'est comprendre qui fait quoi — la différence entre lire les mots et lire la phrase.",
  },
  historique: {
    texte:
      "Les mots « sujet » et « verbe » nous viennent des grammairiens grecs et latins, il y a plus de deux mille ans. « Sujet » vient du latin subjectum : « ce qui est placé dessous », ce sur quoi repose toute la phrase. Le nom lui-même dit donc son rôle.",
  },
  formule: {
    contexte: "La preuve du sujet, celle qu'on peut montrer.",
    expression: "C'est … qui + verbe",
    legende:
      "On encadre le groupe par « c'est… qui » : si la phrase tient debout, c'est le sujet. « C'est le coq qui chante » fonctionne ; « c'est chaque matin qui chante » ne veut rien dire.",
    schema: phraseEncadrement,
  },
  methode: [
    {
      titre: "Je trouve le verbe",
      texte: "Je change le temps de la phrase : le seul mot qui bouge est le verbe conjugué.",
      schema: phraseChangerTemps,
    },
    {
      titre: "Je pose la question",
      texte: "« Qui est-ce qui ? » devant le verbe. La réponse est le sujet, où qu'elle soit placée.",
      schema: phraseSujet,
    },
    {
      titre: "J'encadre pour vérifier",
      texte: "« C'est… qui » autour du groupe trouvé : si la phrase tient, c'est bien le sujet.",
      schema: phraseEncadrement,
    },
  ],
  usages: [
    {
      titre: "Accorder le verbe",
      detail: "Le verbe s'accorde avec le sujet, même quand celui-ci est loin ou derrière.",
      schema: phraseSujetInverse,
    },
    {
      titre: "Comprendre une phrase longue",
      detail: "Trouver le verbe conjugué, c'est trouver l'os de la phrase : le reste s'y accroche.",
      schema: phraseReference,
    },
    {
      titre: "Parler de la langue",
      detail: "Dire la nature ET la fonction d'un mot, c'est répondre à deux questions différentes.",
      schema: phraseNatureSujet,
    },
  ],
  exemples: [
    {
      titre: "Combien de verbes conjugués ?",
      donnees: "« Paul court et Léa saute. »",
      schema: phraseDeuxVerbes,
      question: "Cette phrase est-elle une phrase simple ?",
      solution:
        "Non : elle contient deux verbes conjugués, « court » et « saute ». Ce sont deux propositions, donc une phrase complexe. « Le vent souffle sur le lagon » n'en a qu'un : c'est une phrase simple.",
    },
    {
      titre: "Trouver le sujet",
      donnees: "« Le facteur apporte le courrier. »",
      schema: phraseSujet,
      question: "Quel est le sujet du verbe « apporte » ?",
      solution:
        "Qui est-ce qui apporte ? Le facteur. On vérifie en encadrant : « C'est le facteur qui apporte le courrier » — la phrase tient debout, c'est bien le sujet.",
    },
    {
      titre: "Un sujet derrière le verbe",
      donnees: "« Sur le piton souffle un vent froid. »",
      schema: phraseSujetInverse,
      question: "Quel est le sujet de « souffle » ?",
      solution:
        "On pose la question devant le verbe : qui est-ce qui souffle ? Un vent froid. C'est le sujet, même écrit derrière : on l'appelle un sujet inversé. « Sur le piton » répond à « où ? », c'est un complément.",
    },
    {
      titre: "Nature ou fonction ?",
      donnees: "« Le chien dort. » puis « Je vois le chien. »",
      schema: pile(phraseNatureSujet, phraseNatureComplement),
      question: "Quelle est la nature de « chien » dans chaque phrase ? Et sa fonction ?",
      solution:
        "Sa nature ne bouge pas : c'est un nom dans les deux. Sa fonction change : « le chien » est sujet dans la première, complément dans la seconde. Un mot garde sa nature toute sa vie ; il ne prend une fonction que dans une phrase.",
    },
    {
      titre: "Le défi",
      donnees: "« Chaque matin, le coq chante. »",
      schema: phraseDefi,
      question: "Quel est le sujet ? Quelle est la fonction de « Chaque matin » ?",
      solution:
        "Qui est-ce qui chante ? Le coq — et non « chaque matin », qui ne chante pas. « Chaque matin » répond à « quand ? » : c'est un complément circonstanciel de temps, et il se déplace en fin de phrase sans rien casser.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Est-ce que tu viens ? » Quel est le type de cette phrase, et à quoi le voit-on ?",
      correction:
        "C'est une phrase interrogative : elle pose une question et se termine par un point d'interrogation.",
    },
    {
      question: "« Les élèves écoutent la maîtresse. » Quel est le verbe conjugué ?",
      correction:
        "« écoutent ». On le vérifie en changeant le temps : « les élèves écoutaient la maîtresse » — c'est le seul mot qui bouge.",
    },
    {
      question: "« Tu ranges ta chambre. » Quel est le sujet ?",
      correction: "« Tu ». Qui est-ce qui range ? Tu. C'est un pronom, et il est sujet.",
    },
    {
      question: "« Où va ton frère ? » Quel est le sujet du verbe « va » ?",
      correction:
        "« ton frère ». Dans une question, le sujet passe souvent derrière le verbe : la question « qui est-ce qui ? » marche toujours, la place non.",
    },
    {
      question: "« Sujet », est-ce une nature ou une fonction ?",
      correction:
        "Une fonction : on est sujet DANS une phrase, c'est un rôle. « Nom », « adjectif », « verbe » sont des natures — elles sont déjà dans le dictionnaire.",
    },
    {
      question: "Défi : « Chaque matin, le coq chante. » Sujet, verbe, et fonction du premier groupe ?",
      correction:
        "Verbe : « chante ». Sujet : « le coq » (qui est-ce qui chante ?). « Chaque matin » est un complément circonstanciel de temps — il répond à « quand ? » et il se déplace.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesPhraseCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La phrase - CM2",
    section: {
      type: "objectif",
      phrase: "Trouver le verbe, puis le sujet — où qu'il se cache",
      sousPhrase:
        "On change le temps pour isoler le verbe, on pose « qui est-ce qui ? », on encadre par « c'est… qui ».",
      encadre: {
        titre: "L'idée",
        texte: "Une phrase simple s'organise autour d'UN verbe conjugué.",
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
          "Savoir s'il faut écrire « le coq chante » ou « les coqs chantent », et comprendre qui fait quoi dans une phrase longue.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Sujet » vient du latin subjectum : « ce qui est placé dessous ». Le nom dit son rôle — c'est ce sur quoi repose toute la phrase.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePhraseCm2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Le sujet n'est pas toujours devant",
    badge: "Sujet inversé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le cas ordinaire",
        contenu: "« Le facteur apporte le courrier. » Qui est-ce qui apporte ? Le facteur, placé devant.",
      },
      droite: {
        variante: "piege",
        titre: "Le sujet inversé",
        contenu:
          "« Sur le piton souffle un vent froid. » Qui est-ce qui souffle ? Un vent froid — écrit derrière le verbe, et pourtant sujet.",
      },
    },
  },
  {
    titre: "Nature ou fonction ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "La nature",
        contenu:
          "Ce que le mot EST : nom, déterminant, adjectif, verbe, pronom, préposition. Elle est dans le dictionnaire, avant toute phrase.",
      },
      droite: {
        variante: "ok",
        titre: "La fonction",
        contenu:
          "Le rôle du groupe DANS la phrase : sujet, complément. « Le chien dort » / « Je vois le chien » : même nature, deux fonctions.",
      },
    },
  },
  {
    titre: "Trouver le sujet",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Sur le piton souffle un vent froid. »",
      question: "Quel est le sujet du verbe « souffle » ?",
      correction:
        "Qui est-ce qui souffle ? Un vent froid. C'est le sujet, même placé derrière le verbe : un sujet inversé.",
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
      enonce: "« Chaque matin, le coq chante. »",
      question: "Quel est le sujet, et quelle est la fonction de « Chaque matin » ?",
      indice: "Pose « qui est-ce qui chante ? », puis essaie de déplacer l'autre groupe.",
      correction:
        "Le sujet est « le coq ». « Chaque matin » répond à « quand ? » et se déplace : c'est un complément circonstanciel de temps.",
    },
  },
];
