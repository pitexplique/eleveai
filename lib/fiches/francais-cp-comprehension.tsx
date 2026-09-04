// ─── Fiche d'activité : comprendre ce qu'on lit (CP) ──────────────────────────
// TREIZIÈME FICHE DU CYCLE 2, et la première qui porte UN TEXTE. Toutes les
// autres travaillent sur des mots, des syllabes ou des phrases isolées ; ici,
// l'objet de la notion est le texte lui-même, et une fiche de compréhension
// sans texte à comprendre n'existe pas.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE RÉUNIT DEUX OBJECTIFS DU BO QUE TOUT OPPOSE EN APPARENCE :
//   · « Comprendre ce qui est implicite (inférences simples) » — donc deviner ;
//   · « Justifier ses réponses par un retour au texte » — donc ne pas inventer.
// Mis côte à côte, ils disent une seule chose, et c'est la règle du jeu de la
// lecture : **on a le droit de deviner, à condition de montrer où c'est écrit.**
// Sans la première moitié, l'enfant ne comprend que ce qui est écrit noir sur
// blanc ; sans la seconde, il raconte sa propre histoire. Les deux ensemble
// font un lecteur.
//
// ⭐ LE SECOND FIL EST LA CHAINE ANAPHORIQUE, et le BO en donne l'exemple :
// le lion / il / le fauve / le roi de la savane. Le pool le résume mieux qu'une
// définition : « "il" ne renvoie pas au dernier nom cité, mais à celui dont on
// parle. » Un même personnage change de nom en cours de route — c'est ce qui
// perd un lecteur de six ans, et ça ne se voit que sur un texte entier.
//
// ⭐ LE TEXTE EST ÉCRIT POUR LA FICHE, et chaque phrase y sert :
//     Léa prend son parapluie.        → l'inférence (il pleut)
//     Elle sort de la case.           → l'anaphore par pronom
//     Un margouillat est sur le mur.  → le second personnage, le lieu
//     Le petit lézard ne bouge pas.   → l'anaphore par AUTRE NOM
// C'est la forme exacte de l'exemple du BO, en version CP. Quatre phrases,
// entièrement déchiffrables, et le mot de l'île y est parce qu'il y est partout
// ailleurs sur le site.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 8 micros partent de
// `cp_lec_phrase_simple` — la fiche de lecture syllabique, déjà écrite — et
// convergent toutes sur `cp_comp_defi`.
//
// Les 8 micros sont couvertes :
// - cp_comp_personnage      → propriété 1, entrainements 1 et 2
// - cp_comp_lieu_moment     → propriété 1, entrainement 3
// - cp_comp_question_simple → propriété 2, méthode 1, entrainement 4
// - cp_comp_anaphore        → figure, propriété 3, exemple 1, entrainements 5 et 6
// - cp_comp_inference       → propriété 4, exemple 2, entrainements 7 et 8
// - cp_comp_justifier       → propriété 4, méthode 2, entrainement 9
// - cp_comp_reformuler      → propriété 5, entrainement 10
// - cp_comp_defi            → entrainement 10
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/comprehension-lecture.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

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
 * ⭐⭐ LE TEXTE, ET POURQUOI CE N'EST PAS UN CANVAS.
 *
 * Les treize fiches précédentes dessinent tout ce qu'elles montrent. Ici, non :
 * l'objet à comprendre EST du texte, et un texte rendu en SVG perdrait ce qui
 * en fait un texte — il ne se sélectionne pas, ne se lit pas à voix haute par
 * un lecteur d'écran, et surtout il se met à l'échelle de son bloc au lieu de
 * se replier. Sur une fiche dont la consigne est « relis lentement », rétrécir
 * la police serait le contresens exact.
 *
 * ⚠️ Une ligne par phrase, à dessein : un CP suit une ligne du doigt et se perd
 * dans un paragraphe. Et `break-inside: avoid` via `.fiche-texte` — un texte
 * coupé entre deux pages ne se relit plus.
 */
function texteLu(lignes: string[]) {
  return (
    <div className="fiche-texte rounded-2xl border-2 border-sky-200 bg-sky-50/60 px-4 py-3 text-base leading-8 text-slate-800 print:text-sm print:leading-7">
      {lignes.map((l) => (
        <p key={l} className="m-0">
          {l}
        </p>
      ))}
    </div>
  );
}

// ─── Le texte de la fiche ─────────────────────────────────────────────────────

/** ⭐ Quatre phrases, et chacune porte une micro. Voir l'en-tête. */
const LE_TEXTE = [
  "Léa prend son parapluie.",
  "Elle sort de la case.",
  "Un margouillat est sur le mur.",
  "Le petit lézard ne bouge pas.",
];

const leTexte = texteLu(LE_TEXTE);

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE MONTRE LA CHAINE : trois façons de nommer la même bête, dans
 * l'ordre où le texte les emploie. C'est la forme de l'exemple du BO (le lion /
 * il / le fauve), et aucune définition ne la remplace — il faut voir les trois
 * étiquettes pointer au même endroit.
 */
const laChaineDesNoms = etiquettes({
  cases: ["un margouillat", "le petit lézard", "il"],
  legende: "Trois noms, une seule bête. Le texte évite de se répéter.",
  largeur: 320,
});

const quiEtOu = etiquettes({
  cases: ["Léa", "un margouillat", "la case", "le mur"],
  focus: [0, 1],
  legende: "Deux personnages, et deux endroits.",
  largeur: 320,
});

const laReponseEstEcrite = perso({
  personnage: "zoe",
  pose: "montre",
  expression: "pense",
  /* ⛔ PAS DE NUMÉRO DE LIGNE DANS LA BULLE (vu au rendu, 04/09). « C'est écrit
     ligne 2 » désignait une ligne que rien dans la carte ne fait lire : le
     dessin illustre le GESTE — poser son doigt sur la ligne — pas une réponse
     précise. Un repère faux vaut moins qu'aucun repère. */
  bulle: { texte: "C'est écrit là !" },
  consigne: "La réponse est dans le texte. On la montre du doigt.",
});

const cequiNestPasEcrit = perso({
  personnage: "teo",
  pose: "debout",
  expression: "surpris",
  bulle: { texte: "Il pleut !", forme: "pensee" },
  consigne: "Ce n'est écrit nulle part. Le parapluie le dit quand même.",
});

const direToutEnUnePhrase = perso({
  personnage: "nina",
  pose: "montre",
  expression: "sourire",
  bulle: { texte: "Léa sort sous la pluie." },
  consigne: "Redire le texte en une phrase, sans rien inventer.",
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ ICI LE SUPPORT EST LE TEXTE LUI-MÊME, et il revient sous plusieurs
   exercices : sur une fiche de compréhension, relire est le travail, pas une
   perte de place. C'est la seule fiche du cycle 2 où répéter un support est
   voulu — ailleurs, un dessin répété n'apprend rien la seconde fois.
   ⛔ Ni `consigne` ni `legende` sur les canvas : l'énoncé numéroté les porte. */

const exTexte = texteLu(LE_TEXTE);

const exQuiEstCe = etiquettes({
  cases: ["Léa", "le margouillat", "le mur"],
  largeur: 280,
});

const exOu = etiquettes({
  cases: ["dans la case", "sur le mur", "dans le jardin"],
  largeur: 300,
});

const exChaine = etiquettes({
  cases: ["un margouillat", "le petit lézard"],
  largeur: 280,
});

const exPronom = etiquettes({
  cases: ["Léa", "Elle"],
  largeur: 220,
});

const exInference = perso({
  personnage: "teo",
  pose: "debout",
  expression: "surpris",
  bulle: { texte: "Il pleut ?", forme: "pensee" },
  largeur: 230,
});

const exResume = etiquettes({
  cases: ["Léa sort sous la pluie.", "Léa mange un letchi."],
  largeur: 320,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "comprehension_lecture",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Comprendre ce qu'on lit au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "On a le droit de deviner, à condition de montrer où c'est écrit.",
  identite: [],
  definition: {
    texte: [
      "Comprendre un texte, ce n'est pas seulement lire les mots : c'est savoir de qui on parle, où ça se passe, et ce qui arrive.",
      "Un texte évite de répéter : la même personne s'appelle « Léa », puis « elle ». La même bête s'appelle « un margouillat », puis « le petit lézard ». C'est toujours la même.",
      "Et certaines choses sont vraies sans être écrites. « Léa prend son parapluie » : personne n'a écrit qu'il pleut, mais on le sait. On a le droit de deviner — à condition de montrer le morceau du texte qui le dit.",
    ].join("\n\n"),
  },
  figure: {
    schema: leTexte,
  },
  proprietes: [
    {
      titre: "Qui, et où",
      texte: "On cherche d'abord les personnages, puis l'endroit et le moment.",
      schema: quiEtOu,
      micros: ["cp_comp_personnage", "cp_comp_lieu_moment"],
    },
    {
      titre: "La réponse est dans le texte",
      texte: "On la retrouve et on la montre du doigt, ligne par ligne.",
      schema: laReponseEstEcrite,
      micros: ["cp_comp_question_simple"],
    },
    {
      titre: "Un même personnage change de nom",
      texte: "un margouillat → le petit lézard → il. C'est toujours la même bête.",
      schema: laChaineDesNoms,
      micros: ["cp_comp_anaphore"],
    },
    {
      titre: "Ce qui est vrai sans être écrit",
      texte: "Le parapluie dit qu'il pleut. Mais on doit pouvoir montrer le mot qui le prouve.",
      schema: cequiNestPasEcrit,
      micros: ["cp_comp_inference", "cp_comp_justifier"],
    },
    {
      titre: "Redire le texte en une phrase",
      texte: "Tout le texte, et rien de plus que le texte.",
      schema: direToutEnUnePhrase,
      micros: ["cp_comp_reformuler"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui sert partout : dans une consigne, dans une recette, dans une histoire. Lire les mots sans comprendre le texte ne sert à rien.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je relis lentement",
      texte: "Je cherche la ligne où la réponse est écrite, et je pose mon doigt dessus.",
      schema: laReponseEstEcrite,
      micros: ["cp_comp_question_simple", "cp_comp_justifier"],
    },
    {
      titre: "Je remonte dans le texte",
      texte: "Quand je vois « il » ou « elle », je cherche de qui on parlait juste avant.",
      schema: laChaineDesNoms,
      micros: ["cp_comp_anaphore"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Trois noms pour une bête",
      donnees: "« Un margouillat est sur le mur. Le petit lézard ne bouge pas. »",
      question: "Combien y a-t-il d'animaux ?",
      solution:
        "Un seul. « Le petit lézard », c'est le margouillat : le texte change de mot pour ne pas se répéter.",
      schema: laChaineDesNoms,
      micros: ["cp_comp_anaphore"],
    },
    {
      titre: "Deviner, et le prouver",
      donnees: "« Léa prend son parapluie. »",
      question: "Quel temps fait-il ? Et comment le sait-on ?",
      solution:
        "Il pleut. Ce n'est écrit nulle part, mais on prend un parapluie quand il pleut — et le mot « parapluie » est bien dans le texte.",
      schema: cequiNestPasEcrit,
      micros: ["cp_comp_inference", "cp_comp_justifier"],
    },
  ],
  pieges: [
    "« il » ne renvoie pas au dernier nom cité, mais à celui dont on parle.",
    "On ne devine pas n'importe quoi : il faut pouvoir montrer le morceau du texte qui le dit.",
  ],
  aRetenir: [
    "Je cherche d'abord qui c'est, où ça se passe et ce qui arrive.",
    "Un même personnage change de nom : Léa → elle, un margouillat → le petit lézard.",
    "Quand je vois « il » ou « elle », je remonte dans le texte.",
    "Certaines choses sont vraies sans être écrites : le parapluie dit qu'il pleut.",
    "Je montre toujours la ligne où c'est écrit.",
  ],
  /* ⭐ Dix exercices sur le MÊME texte, qui revient sous les premiers d'entre
     eux : relire est le travail. Les corrections s'impriment sur leur propre
     page. */
  entrainement: [
    {
      question: "Lis le texte, puis entoure le nom de la personne dont on parle.",
      correction: "« Léa ». C'est le nom qui revient, et « elle » la reprend ensuite.",
      schema: exTexte,
      micros: ["cp_comp_personnage"],
    },
    {
      question: "Barre celui qui n'est PAS un personnage de l'histoire.",
      correction: "On barre « le mur » : c'est un endroit, pas quelqu'un.",
      schema: exQuiEstCe,
      micros: ["cp_comp_personnage"],
    },
    {
      question: "Où se trouve le margouillat ? Entoure la bonne réponse.",
      correction: "« sur le mur ». C'est écrit à la troisième ligne.",
      schema: exOu,
      micros: ["cp_comp_lieu_moment"],
    },
    {
      question: "Que prend Léa ? Écris la ligne où la réponse est écrite.",
      correction: "Son parapluie — ligne 1. On montre toujours où c'est écrit.",
      schema: exTexte,
      micros: ["cp_comp_question_simple"],
    },
    {
      question: "Relie les deux étiquettes qui parlent de la même bête.",
      correction: "« un margouillat » et « le petit lézard » : un seul animal, deux noms.",
      schema: exChaine,
      micros: ["cp_comp_anaphore"],
    },
    {
      question: "Dans « Elle sort de la case », qui est « Elle » ?",
      correction: "Léa. On remonte dans le texte : c'est d'elle qu'on parlait juste avant.",
      schema: exPronom,
      micros: ["cp_comp_anaphore"],
    },
    {
      question: "Quel temps fait-il ? Ce n'est pas écrit : cherche l'indice.",
      correction: "Il pleut. L'indice est le parapluie de la première ligne.",
      schema: exInference,
      micros: ["cp_comp_inference"],
    },
    {
      question: "Le margouillat a-t-il peur ? Qu'est-ce qui te le fait penser ?",
      correction: "On ne sait pas s'il a peur — mais il ne bouge pas, et c'est écrit ligne 4.",
      schema: exTexte,
      micros: ["cp_comp_inference", "cp_comp_justifier"],
    },
    {
      question: "Souligne dans le texte la ligne qui prouve qu'il y a un animal.",
      correction: "La ligne 3 : « Un margouillat est sur le mur. »",
      schema: exTexte,
      micros: ["cp_comp_justifier"],
    },
    {
      question: "Entoure la phrase qui redit tout le texte, sans rien inventer.",
      correction: "« Léa sort sous la pluie. » L'autre parle d'un letchi : il n'y en a pas dans le texte.",
      schema: exResume,
      micros: ["cp_comp_reformuler", "cp_comp_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesComprehensionCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Comprendre un texte - CP",
    section: {
      type: "objectif",
      phrase: "On a le droit de deviner",
      sousPhrase: "…à condition de montrer où c'est écrit.",
      encadre: {
        titre: "L'idée",
        texte: "Le texte dit plus qu'il n'écrit — mais jamais n'importe quoi.",
      },
    },
    schema: leTexte,
  },
  {
    titre: "Trois noms, une bête",
    badge: "Comprendre un texte - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "un margouillat", texte: "on le présente" },
        { titre: "le petit lézard", texte: "on le renomme" },
        { titre: "il", texte: "on le reprend" },
      ],
    },
    schema: laChaineDesNoms,
  },
  {
    titre: "Quand je vois « il »",
    badge: "Comprendre un texte - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je m'arrête.",
        "Je remonte dans le texte.",
        "Je cherche de qui on parlait juste avant.",
      ],
    },
    schema: laChaineDesNoms,
  },
  {
    titre: "À vous",
    badge: "Comprendre un texte - CP",
    section: {
      type: "exercice",
      enonce: "« Léa prend son parapluie. »",
      question: "Quel temps fait-il, et comment le sait-on ?",
      indice: "Ce n'est pas écrit. Mais à quoi sert un parapluie ?",
      correction: "Il pleut — et le mot « parapluie » est bien dans le texte.",
    },
    schema: cequiNestPasEcrit,
  },
];
