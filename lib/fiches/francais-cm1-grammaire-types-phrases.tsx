// ─── Fiche de cours : les types et les formes de phrases (CM1) ────────────────
// DIX-SEPTIÈME FICHE DU CHANTIER CM1, et PREMIÈRE DES SIX DE GRAMMAIRE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Identifier les
// trois types de phrases (déclaratif, interrogatif, impératif ou injonctif) » ·
// « Identifier les principales formes de phrases (négative, exclamative) » ·
// « Transformer à l'oral puis à l'écrit des phrases d'un type à un autre, d'une
// forme à une autre » · « DISTINGUER ET PRODUIRE DIFFÉRENTES RÉALISATIONS DU
// TYPE INTERROGATIF (inversion du sujet, est-ce que, intonation) ».
//
// ⭐⭐ CAS RARE DANS CE CHANTIER : LA NOTION EST ENTIÈREMENT AU CM1. Vérifié —
// le CM2 n'a pas `grammaire_types_phrases` ; son `grammaire_phrase` traite le
// sujet, le verbe, la nature et la fonction, ce qui est autre chose. Et la
// recherche de « une forme, pas un type » et « trois types de phrases » dans
// toutes les fiches de CM2, 6e, 5e et 4e ne renvoie RIEN. Aucun angle à écarter
// pour une fois : la difficulté est ailleurs, elle est dans la notion elle-même.
//
// ⭐⭐ LA DÉCOUVERTE, ET LE POOL LA POSE DEUX FOIS PLUTÔT QU'UNE :
// LE TYPE D'UNE PHRASE NE SE LIT PAS AU SIGNE QUI LA TERMINE. « Le type d'une
// phrase se lit sur CE QU'ELLE FAIT : raconter, demander, ordonner » — et le
// leurre écarté est précisément « le signe qui la termine ». C'est l'erreur
// mécanique de l'enfant : il voit un point d'exclamation, il répond
// « exclamative ».
//
// ⭐⭐ D'OÙ LE PIÈGE CENTRAL, QUE LE POOL NOMME LUI-MÊME « le piège de la
// notion » : L'EXCLAMATIF N'EST PAS UN TYPE, C'EST UNE FORME. Il y a TROIS
// types, pas quatre. Et un item entier du pool est construit là-dessus, avec
// « quatre : déclaratif, interrogatif, impératif, exclamatif » comme leurre
// principal.
//
// ⭐ La conséquence se dit en une phrase, et elle range tout : UN TYPE ET UNE
// FORME SE CUMULENT TOUJOURS. « Ne cours pas dans le couloir ! » est impérative
// (le type) à la forme négative. Une phrase a donc toujours un type, et en plus
// une forme.
//
// ⭐ Le troisième axe est la seule chose que le BO du CM1 exige en propre : TROIS
// FAÇONS DE POSER UNE QUESTION — l'intonation (« Tu viens ? »), « est-ce que »
// (« Est-ce que tu viens ? »), l'inversion (« Viens-tu ? »). Trois portes pour la
// même question, et l'élève n'en connait souvent qu'une.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale — on
// n'écrit ni « sujet » ni « complément » sur les dessins, sinon le canvas les
// colore et promet une leçon que cette fiche ne fait pas.
//
// Alignée sur les pools TYPES_PHRASES et TRANSFORMER_PHRASE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `grammaire_types_phrases`) :
// - cm1_gram_types_phrases        → figure, propriétés 1, 2 et 3, méthode 1, exemples 1 et 2
// - cm1_gram_transformer_phrase   → propriété 4, méthode 2, exemple 4
// - cm1_gram_types_phrases_interro → propriété 5, méthode 3, exemple 3
// - cm1_gram_types_phrases_defi   → propriété 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
 *  plancher de 11 px. */
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

// ─── Les dessins ──────────────────────────────────────────────────────────────

const pasLeSigneFinal = phrase({
  mots: [
    { texte: "le point final", barre: true },
    { texte: "ce qu'elle attend", focus: true },
  ],
  legende: "Le type ne se lit pas au signe, mais à ce que la phrase veut.",
});

const grilleTroisTypes = grille({
  headers: ["La phrase", "Elle attend"],
  rows: [
    { values: ["raconte", "rien"] },
    { values: ["demande", "une réponse"] },
    { values: ["ordonne", "une action"] },
  ],
  caption: "Trois types, et c'est tout.",
});

const formePasType = phrase({
  mots: [
    { texte: "exclamatif", barre: true },
    { texte: "une forme", focus: true },
  ],
  legende: "Le point d'exclamation ne donne pas le type.",
});

const neEncadreLeVerbe = phrase({
  mots: [{ texte: "ne" }, { texte: "pleut", focus: true }, { texte: "pas" }],
  liens: [{ de: 0, vers: 2, label: "encadrent", type: "question" }],
  legende: "Les deux mots entourent le verbe. « ne » ne s'oublie pas.",
});

const grilleTroisQuestions = grille({
  headers: ["La façon", "La question"],
  rows: [
    { values: ["l'intonation", "Tu viens ?"] },
    { values: ["est-ce que", "Est-ce que tu viens"] },
    { values: ["l'inversion", "Viens-tu ?"] },
  ],
  caption: "Trois portes pour la même question.",
});

const memeIdeeAutreFacon = phrase({
  mots: [{ texte: "Tu viens." }, { texte: "Viens-tu ?", focus: true }],
  legende: "Même idée, autre façon de la dire.",
});

const cumulTypeEtForme = phrase({
  mots: [{ texte: "impérative" }, { texte: "négative", focus: true }],
  liens: [{ de: 0, vers: 1, label: "les deux", type: "question" }],
  legende: "« Ne cours pas ! » a un type et une forme à la fois.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireTypesPhrasesCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "grammaire-types-phrases",
  titre: `Les types et les formes de phrases en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Comme la mer est belle ! » Tu vois le point d'exclamation, tu réponds « exclamative ». Et c'est faux : cette phrase raconte quelque chose, donc elle est déclarative.",
  identite: [
    { label: "Mots clés", valeur: "Déclarative, interrogative, impérative" },
    { label: "Le secret", valeur: "Regarde ce qu'elle attend de toi" },
    { label: "Outil", valeur: "Ni le point ni le premier mot" },
  ],
  definition: {
    texte: [
      "Une phrase fait toujours l'une de ces trois choses : elle raconte, elle demande, ou elle ordonne.",
      "Alors ne regarde pas le signe de la fin : demande-toi ce que la phrase attend de toi. Rien, une réponse, ou une action.",
      "Il y a donc trois types : déclaratif, interrogatif, impératif. Pas quatre.",
      "L'exclamation n'est pas un type, c'est une forme — comme la négation. « Comme la mer est belle ! » raconte : elle est déclarative, à la forme exclamative.",
      "Chaque phrase a un type, et en plus une forme. Les deux se cumulent toujours.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(pasLeSigneFinal, grilleTroisTypes),
  },
  proprietes: [
    {
      titre: "Trois types, pas quatre",
      texte: "Déclaratif, interrogatif, impératif. Aucun autre.",
      schema: grilleTroisTypes,
      micros: ["cm1_gram_types_phrases"],
    },
    {
      titre: "L'exclamation est une forme",
      texte: "Un point d'exclamation ne change pas le type. Il ajoute une forme.",
      schema: formePasType,
      micros: ["cm1_gram_types_phrases"],
    },
    {
      titre: "Un type et une forme se cumulent",
      texte: "« Ne cours pas ! » est impérative, à la forme négative. Les deux à la fois.",
      schema: cumulTypeEtForme,
      micros: ["cm1_gram_types_phrases"],
    },
    {
      titre: "La négation encadre le verbe",
      texte: "« ne » devant, « pas » derrière. À l'écrit, le « ne » ne s'oublie jamais.",
      schema: neEncadreLeVerbe,
      micros: ["cm1_gram_transformer_phrase"],
    },
    {
      titre: "Trois façons de poser une question",
      texte: "« Tu viens ? », « Est-ce que tu viens ? », « Viens-tu ? » La même question.",
      schema: grilleTroisQuestions,
      micros: ["cm1_gram_types_phrases_interro"],
    },
    {
      titre: "Le défi : changer la façon, pas l'idée",
      texte: "On déplace les mots et on change la ponctuation. Le sens de base reste.",
      schema: memeIdeeAutreFacon,
      micros: ["cm1_gram_types_phrases_defi"],
    },
  ],
  reel: {
    texte:
      "Quand quelqu'un te dit « Tu peux fermer la porte ? », il ne demande pas si tu en es capable : il te demande de le faire. Les phrases ne disent pas toujours leur type sur leur figure — c'est pour ça qu'on regarde ce qu'elles attendent.",
  },
  historique: {
    texte:
      "Le point d'interrogation viendrait du latin quaestio, la question, qu'on abrégeait en « qo » à la fin des phrases. Le q se serait posé au-dessus du o, et la boucle du q serait devenue le crochet qu'on écrit aujourd'hui.",
  },
  methode: [
    {
      titre: "Demande-toi ce que la phrase attend",
      texte: "Rien à faire, c'est déclaratif. Une réponse, interrogatif. Une action, impératif.",
      schema: pasLeSigneFinal,
      micros: ["cm1_gram_types_phrases"],
    },
    {
      titre: "Pour transformer, déplace et reponctue",
      texte: "« Tu viens. » devient « Viens-tu ? » : les mots bougent, le point change.",
      schema: memeIdeeAutreFacon,
      micros: ["cm1_gram_transformer_phrase"],
    },
    {
      titre: "Pour une question, choisis ta porte",
      texte: "La plus simple à l'oral est l'intonation, la plus sure à l'écrit est « est-ce que ».",
      schema: grilleTroisQuestions,
      micros: ["cm1_gram_types_phrases_interro"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Range ton cartable",
      donnees: "« Range ton cartable. »",
      schema: grilleTroisTypes,
      question: "De quel type est cette phrase ?",
      solution:
        "Impérative : elle donne un ordre, et elle attend une action, pas une réponse.",
      micros: ["cm1_gram_types_phrases"],
    },
    {
      titre: "Comme la mer est belle",
      donnees: "« Comme la mer est belle ! »",
      schema: formePasType,
      question: "Est-elle exclamative ?",
      solution:
        "Elle est à la forme exclamative, mais son type est déclaratif : elle raconte. L'exclamatif n'est pas un type.",
      micros: ["cm1_gram_types_phrases"],
    },
    {
      titre: "Trois fois la même question",
      donnees: "« Ton frère vient. »",
      schema: grilleTroisQuestions,
      question: "Pose la question de trois façons.",
      solution:
        "« Ton frère vient ? », « Est-ce que ton frère vient ? », « Ton frère vient-il ? » La dernière relie le pronom au verbe par un trait d'union.",
      micros: ["cm1_gram_types_phrases_interro"],
    },
    {
      titre: "Il pleut",
      donnees: "« Il pleut. »",
      schema: neEncadreLeVerbe,
      question: "Mets à la forme négative.",
      solution:
        "« Il ne pleut pas. » Les deux mots encadrent le verbe, et le « ne » s'écrit même si on ne l'entend pas toujours.",
      micros: ["cm1_gram_transformer_phrase"],
    },
  ],
  pieges: [
    "Lire le type sur le signe de la fin.",
    "Compter quatre types en ajoutant l'exclamatif.",
    "Croire qu'une phrase a un type ou une forme, pas les deux.",
    "Oublier le « ne » à l'écrit parce qu'on ne le dit pas.",
    "Ne connaitre qu'une seule façon de poser une question.",
  ],
  aRetenir: [
    "Trois types : déclaratif, interrogatif, impératif.",
    "L'exclamation et la négation sont des formes.",
    "Chaque phrase a un type et une forme.",
    "« ne » et « pas » encadrent le verbe.",
    "Trois façons de questionner : ton, est-ce que, inversion.",
  ],
  entrainement: [
    {
      question: "« Range ton cartable. » De quel type est cette phrase ?",
      correction: "Impérative.",
      micros: ["cm1_gram_types_phrases"],
    },
    {
      question: "L'exclamation est-elle un type ?",
      correction: "Non, c'est une forme.",
      micros: ["cm1_gram_types_phrases"],
    },
    {
      question: "Quelles sont les trois façons de poser une question ?",
      correction: "L'intonation, « est-ce que », l'inversion.",
      micros: ["cm1_gram_types_phrases_interro"],
    },
    {
      question: "« Il pleut. » Mets à la forme négative.",
      correction: "« Il ne pleut pas. »",
      micros: ["cm1_gram_transformer_phrase"],
    },
    {
      question: "« Ne cours pas dans le couloir ! » Quel type, quelle forme ?",
      correction: "Impérative, à la forme négative.",
      micros: ["cm1_gram_types_phrases_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesGrammaireTypesPhrasesCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Types et formes de phrases - CM1",
    section: {
      type: "objectif",
      phrase: "Regarde ce qu'elle attend",
      sousPhrase: "« Comme la mer est belle ! » n'est pas exclamative : elle raconte.",
      encadre: { titre: "L'idée", texte: "Le type ne se lit pas au signe final." },
    },
  },
  {
    titre: "Trois types",
    badge: "Types et formes de phrases - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Elle raconte", texte: "Déclarative. Elle n'attend rien." },
        { titre: "Elle demande", texte: "Interrogative. Elle attend une réponse." },
        { titre: "Elle ordonne", texte: "Impérative. Elle attend une action." },
      ],
    },
    schema: grilleTroisTypes,
  },
  {
    titre: "Ce que la phrase veut",
    badge: "Types et formes de phrases - CM1",
    section: {
      type: "etapes",
      etapes: [
        "« Tu peux fermer la porte ? »",
        "On ne te demande pas si tu en es capable.",
        "On te demande de le faire.",
      ],
    },
    schema: pasLeSigneFinal,
  },
  {
    titre: "À vous",
    badge: "Types et formes de phrases - CM1",
    section: {
      type: "exercice",
      enonce: "« Ne cours pas dans le couloir ! »",
      question: "Quel type, et quelle forme ?",
      indice: "Que te demande-t-on de faire ? Et quels deux mots encadrent le verbe ?",
      correction: "Impérative, à la forme négative.",
    },
    schema: cumulTypeEtForme,
  },
];
