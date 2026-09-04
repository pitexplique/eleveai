// ─── Fiche d'activité : écrire une phrase à soi (CP) ──────────────────────────
// DIXIÈME FICHE DU CYCLE 2, et la dernière marche de l'écriture : après la
// copie (on reproduit) et la dictée (on transcrit), l'enfant écrit ce que
// PERSONNE ne lui dicte.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE EST DANS LES DISTRACTEURS DU POOL, PAS DANS SES ÉNONCÉS.
// Pour légender « un chat qui dort sur un tapis », les trois mauvaises réponses
// ratent de TROIS FAÇONS DIFFÉRENTES, et chacune est une erreur réelle d'enfant :
//   · « chat tapis dort »  → des mots posés côte à côte : pas une phrase ;
//   · « Un chat. »         → trop peu : c'est vrai, mais ça ne dit rien ;
//   · « Le tapis est vieux et il y a des taches de soleil dessus toute la
//     journée. » → beaucoup, et à côté : ça ne dit pas ce qui se passe.
// La bonne — « Le chat dort sur le tapis. » — se tient entre les trois. Écrire,
// au CP, ce n'est donc ni aligner des mots, ni en mettre le plus possible :
// c'est dire CE QUI SE PASSE, en une phrase entière. Les trois ratés sont dans
// la fiche, dessinés et barrés, parce qu'une règle qui ne dit pas où elle
// s'arrête se retourne au premier contre-exemple.
//
// ⭐ ET LA RÉPONSE À UNE QUESTION SUIT LA MÊME LOI : « Où dort le chat ? » ne se
// répond pas « tapis » ni « sur le tapis », mais « Le chat dort sur le tapis. »
// Le pool refuse les trois raccourcis. C'est ce que le BO appelle « formuler une
// réponse » — en français comme en maths et en sciences.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 5 micros forment UNE SEULE CHAINE
// (légende → phrase → réponse et texte court → relire), et sa racine
// `cp_prod_legende` a pour prérequis `cp_dict_mot_courant` — la fiche écrite
// juste avant. Aucune ligne de fracture, aucun découpage à décider.
//
// Les 5 micros sont couvertes :
// - cp_prod_legende         → figure, propriété 1, entrainements 1 et 2
// - cp_prod_phrase          → propriété 2, exemple 1, entrainements 3, 4 et 5
// - cp_prod_reponse_question→ propriété 3, méthode 2, entrainements 6 et 7
// - cp_prod_texte_court     → propriété 4, exemple 2, entrainement 8
// - cp_prod_relire          → méthode 1, entrainements 9 et 10
//
// ⛔ LES ÉCRITS SE FONT SUR RÉGLURE, pas dans une case vide : la fiche demande
// d'écrire, il lui faut donc des lignes où écrire.
//
// Les images à légender et les questions sont celles du pool (LEGENDES,
// REPONSES), reprises telles quelles — « Le margouillat monte sur le mur ».
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/ecriture.bank.ts`.

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

/** ⭐ Ici la réglure est le plus souvent VIDE : il n'y a pas de modèle à
 *  repasser, puisque la phrase n'existe pas encore. C'est la seule notion du
 *  cycle 2 où l'enfant remplit des lignes qui n'attendent rien de précis. */
function lignes(opts: {
  modele?: string;
  aRepasser?: boolean;
  consigne?: string;
  largeur?: number;
}) {
  return (
    <div className="reglure">
      <CanvasRenderer
        figure={{
          kind: "reglure",
          modele: opts.modele,
          lignes: 3,
          interligne: 3,
          aRepasser: opts.aRepasser,
          depart: true,
          consigne: opts.consigne,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
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

/** ⭐ LE DESSIN ET SES LIGNES, EN UN SEUL BLOC. Sur cette notion, l'image ne
 *  s'explique pas : elle se légende. Les séparer mettrait le dessin dans une
 *  carte et les lignes dans une autre, et l'enfant écrirait sans avoir l'image
 *  sous les yeux. Le même montage sert déjà à la fiche de la phrase. */
function dessinEtLignes(dessin: React.ReactNode, largeur = 300) {
  return (
    <div className="grid gap-2">
      {dessin}
      {lignes({ largeur })}
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE MONTRE LES TROIS RATÉS ET LA BONNE PHRASE. Barrées, les trois
 * façons de manquer disent la règle mieux que la règle : trop peu de mots, pas
 * de phrase, ou à côté du sujet.
 */
const troisRatesEtUneBonne = etiquettes({
  cases: ["chat tapis dort", "Un chat.", "Le chat dort sur le tapis."],
  focus: [2],
  legende: "Des mots alignés, ou trop peu — ou bien la phrase qui dit ce qui se passe.",
  largeur: 320,
});

const legenderUneImage = dessinEtLignes(
  objets({
    elements: [{ quoi: "bateau", label: "" }],
    consigne: "Une légende dit ce qu'on voit, en une phrase entière.",
    largeur: 200,
  }),
  300,
);

const lesDeuxBornes = etiquettes({
  cases: ["Le", "bateau", "flotte", "."],
  focus: [0, 3],
  legende: "Une majuscule au début, un point à la fin — et du sens entre les deux.",
  largeur: 300,
});

const repondreEnPhrase = perso({
  personnage: "nina",
  pose: "montre",
  expression: "sourire",
  bulle: { texte: "Le chat dort sur le tapis." },
  consigne: "On répond en phrase entière, pas en un seul mot.",
});

const raconterDansLOrdre = etiquettes({
  cases: ["1. Il se lève.", "2. Il mange.", "3. Il part."],
  legende: "Un texte court, c'est des phrases rangées dans l'ordre.",
  largeur: 320,
});

/** ⭐⭐ ON SE RELIT SUR SA PROPRE FEUILLE — même loi que la dictée, et c'est ici
 *  qu'elle compte le plus : il n'y a AUCUN modèle à consulter. */
const jeRelisMaPhrase = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Majuscule ? Point ?" },
  consigne: "Je relis ma phrase du doigt, du début au point.",
});

const jeRegardeDAbord = perso({
  personnage: "teo",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Qui ? Que fait-il ?", forme: "pensee" },
  consigne: "Avant d'écrire, je cherche qui c'est et ce qu'il fait.",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ SUR CETTE NOTION, LE SUPPORT EST PRESQUE TOUJOURS UNE IMAGE + DES LIGNES
   VIDES : l'exercice consiste à écrire une phrase qui n'existe pas encore.
   ⛔ Ni `consigne` ni `legende` sur ces dessins : l'énoncé numéroté les porte.
   ⛔ Et pas de `label` sous l'objet : donner le mot, c'est écrire la phrase à
   la place de l'enfant. */

const exLegendeBateau = dessinEtLignes(
  objets({ elements: [{ quoi: "bateau" }], largeur: 170 }),
  290,
);
const exLegendeChat = dessinEtLignes(
  objets({ elements: [{ quoi: "chat" }], largeur: 170 }),
  290,
);
const exLegendeFleur = dessinEtLignes(
  objets({ elements: [{ quoi: "fleur" }], largeur: 170 }),
  290,
);

const exTroisPropositions = etiquettes({
  cases: ["bateau lagon sur", "Le lagon.", "Le bateau flotte sur le lagon."],
  largeur: 320,
});

/* ⛔ DEUX FAUTES CORRIGÉES AU RENDU (04/09), aucune lisible dans le code.
   1. Une quatrième étiquette VIDE tenait la place du point manquant : à
      l'écran elle ne se lit pas comme un manque, elle se lit comme une boite
      cassée. Ce qui manque ne se dessine pas — on le laisse absent, et c'est
      l'énoncé qui dit qu'il en manque deux.
   2. L'énoncé disait « écris-la correctement » sans donner UNE SEULE LIGNE où
      écrire. Sur une feuille d'activité, demander d'écrire sans réglure, c'est
      demander un travail qu'on n'a pas prévu de recevoir. */
const exBornes = (
  <div className="grid gap-2">
    {etiquettes({ cases: ["le", "chat", "dort"], largeur: 280 })}
    {lignes({ largeur: 290 })}
  </div>
);

const exLignesSeules = lignes({ largeur: 300 });

const exQuestion = perso({
  personnage: "nina",
  pose: "montre",
  expression: "sourire",
  bulle: { texte: "Où dort le chat ?" },
  largeur: 240,
});

const exOrdre = etiquettes({
  cases: ["Il part.", "Il se lève.", "Il mange."],
  largeur: 300,
});

const exRelire = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  bulle: { texte: "Majuscule ? Point ?" },
  largeur: 230,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheProductionEcriteCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "production_ecrite",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Écrire une phrase à soi au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "« chat tapis dort » n'est pas une phrase, et « Un chat. » ne dit rien. Écrire, c'est dire ce qui se passe.",
  identite: [],
  definition: {
    texte: [
      "Écrire une phrase à soi, ce n'est pas copier ni écrire sous la dictée : personne ne te donne les mots.",
      "On regarde d'abord : qui c'est, et ce qu'il fait. Ensuite on écrit une phrase entière qui dit ce qui se passe.",
      "Des mots posés côte à côte ne font pas une phrase. Et « Un chat. » est vrai, mais ne dit rien : on ne sait toujours pas ce qui arrive.",
    ].join("\n\n"),
  },
  figure: {
    schema: troisRatesEtUneBonne,
  },
  proprietes: [
    {
      titre: "Une légende dit ce qu'on voit",
      texte: "En une phrase entière, sous le dessin.",
      schema: legenderUneImage,
      micros: ["cp_prod_legende"],
    },
    {
      titre: "Une phrase a deux bornes et du sens",
      texte: "Une majuscule, un point, et quelque chose de complet entre les deux.",
      schema: lesDeuxBornes,
      micros: ["cp_prod_phrase"],
    },
    {
      titre: "On répond en phrase entière",
      texte: "« Où dort le chat ? » → « Le chat dort sur le tapis. » Pas « tapis ».",
      schema: repondreEnPhrase,
      micros: ["cp_prod_reponse_question"],
    },
    {
      titre: "Un texte court, c'est l'ordre",
      texte: "Deux ou trois phrases, rangées comme les choses se passent.",
      schema: raconterDansLOrdre,
      micros: ["cp_prod_texte_court"],
    },
  ],
  reel: {
    texte:
      "C'est le moment où on n'écrit plus les mots de quelqu'un d'autre : une légende sous son dessin, une réponse en classe, un mot à sa famille.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je regarde avant d'écrire",
      texte: "Qui c'est ? Que fait-il ? Ma phrase répond aux deux.",
      schema: jeRegardeDAbord,
      micros: ["cp_prod_legende", "cp_prod_phrase"],
    },
    {
      titre: "Je relis ma phrase du doigt",
      texte: "La majuscule, les mots, le point. Sur ma feuille — il n'y a aucun modèle.",
      schema: jeRelisMaPhrase,
      micros: ["cp_prod_relire"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Trois façons de rater une légende",
      donnees: "Sur le dessin, un bateau sur le lagon.",
      question: "Pourquoi « bateau lagon sur », « Le lagon. » et une longue phrase sur le beau temps sont-elles fausses ?",
      solution:
        "La première aligne des mots sans phrase. La deuxième est vraie mais ne dit rien. La troisième parle d'autre chose. Il fallait : « Le bateau flotte sur le lagon. »",
      schema: troisRatesEtUneBonne,
      micros: ["cp_prod_legende", "cp_prod_phrase"],
    },
    {
      titre: "Remettre une histoire d'aplomb",
      donnees: "« Il part. » — « Il se lève. » — « Il mange. »",
      question: "Dans quel ordre faut-il les écrire ?",
      solution: "Il se lève, il mange, il part. Un texte se range comme les choses se passent.",
      schema: raconterDansLOrdre,
      micros: ["cp_prod_texte_court"],
    },
  ],
  pieges: [
    "Des mots côte à côte ne font pas une phrase : « chat tapis dort » ne se lit pas.",
    "Une réponse en un seul mot n'est pas une réponse écrite : on répond en phrase entière.",
  ],
  aRetenir: [
    "Avant d'écrire, je cherche qui c'est et ce qu'il fait.",
    "Une phrase dit quelque chose de complet, avec une majuscule et un point.",
    "Une légende dit ce qu'on voit sur le dessin, en une phrase.",
    "On répond à une question en phrase entière, pas en un mot.",
    "Je relis ma phrase du doigt : il n'y a aucun modèle à consulter.",
  ],
  /* ⭐ Dix exercices, neuf avec un support. Sept demandent d'ÉCRIRE une phrase
     sur des lignes vides. Les corrections s'impriment sur leur propre page. */
  entrainement: [
    {
      question: "Écris sous le dessin une phrase qui dit ce qui se passe.",
      correction: "Par exemple : « Le bateau flotte sur le lagon. » Une phrase entière, avec sa majuscule et son point.",
      schema: exLegendeBateau,
      micros: ["cp_prod_legende"],
    },
    {
      question: "Entoure la seule vraie légende de ce dessin.",
      correction: "« Le bateau flotte sur le lagon. » Les deux autres alignent des mots ou ne disent rien.",
      schema: exTroisPropositions,
      micros: ["cp_prod_legende", "cp_prod_phrase"],
    },
    {
      question: "Il manque deux choses à cette phrase. Écris-la correctement.",
      correction: "« Le chat dort. » — la majuscule au début, le point à la fin.",
      schema: exBornes,
      micros: ["cp_prod_phrase"],
    },
    {
      question: "Qu'est-ce qu'il faut absolument pour écrire une phrase ?",
      correction: "Une majuscule, un point, et quelque chose de complet entre les deux.",
      micros: ["cp_prod_phrase"],
    },
    {
      question: "Écris une phrase qui dit ce que fait ce chat.",
      correction: "Par exemple : « Le chat dort sur le tapis. » Pas « Un chat. » : ça ne dit pas ce qui se passe.",
      schema: exLegendeChat,
      micros: ["cp_prod_phrase", "cp_prod_legende"],
    },
    {
      question: "Réponds à la question de Nina, en phrase entière.",
      correction: "« Le chat dort sur le tapis. » Ni « tapis », ni « sur le tapis ».",
      schema: exQuestion,
      micros: ["cp_prod_reponse_question"],
    },
    {
      question: "« Que mange Léa ? » Écris la réponse sur les lignes.",
      correction: "« Léa mange une mangue. » On reprend les mots de la question pour faire une phrase.",
      schema: exLignesSeules,
      micros: ["cp_prod_reponse_question"],
    },
    {
      question: "Numérote les trois phrases dans l'ordre de l'histoire.",
      correction: "1. Il se lève. 2. Il mange. 3. Il part.",
      schema: exOrdre,
      micros: ["cp_prod_texte_court"],
    },
    {
      question: "Écris une phrase sur ce dessin, puis relis-la du doigt.",
      correction: "Par exemple : « La fleur pousse dans le jardin. » On vérifie la majuscule, les mots, le point.",
      schema: exLegendeFleur,
      micros: ["cp_prod_legende", "cp_prod_relire"],
    },
    {
      question: "Que vérifie Zoé en se relisant, et sur quelle feuille ?",
      correction: "La majuscule et le point, sur SA feuille — quand on invente une phrase, il n'y a aucun modèle.",
      schema: exRelire,
      micros: ["cp_prod_relire"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesProductionEcriteCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Écrire une phrase - CP",
    section: {
      type: "objectif",
      phrase: "Écrire, c'est dire ce qui se passe",
      sousPhrase: "« Un chat. » est vrai, mais ne dit rien.",
      encadre: {
        titre: "L'idée",
        texte: "Ni des mots alignés, ni trop peu : une phrase entière.",
      },
    },
    schema: troisRatesEtUneBonne,
  },
  {
    titre: "Trois façons de rater",
    badge: "Écrire une phrase - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "chat tapis dort", texte: "des mots, pas une phrase" },
        { titre: "Un chat.", texte: "vrai, mais ne dit rien" },
        { titre: "Le tapis est vieux…", texte: "à côté du sujet" },
      ],
    },
    schema: troisRatesEtUneBonne,
  },
  {
    titre: "Avant d'écrire",
    badge: "Écrire une phrase - CP",
    section: {
      type: "etapes",
      etapes: [
        "Qui c'est ?",
        "Que fait-il ?",
        "J'écris une phrase qui répond aux deux.",
      ],
    },
    schema: jeRegardeDAbord,
  },
  {
    titre: "À vous",
    badge: "Écrire une phrase - CP",
    section: {
      type: "exercice",
      enonce: "Question : « Où dort le chat ? »",
      question: "Quelle réponse est correctement écrite ?",
      indice: "Une réponse écrite se fait en phrase entière, pas en un seul mot.",
      correction: "« Le chat dort sur le tapis. » — ni « tapis », ni « sur le tapis ».",
    },
    schema: repondreEnPhrase,
  },
];
