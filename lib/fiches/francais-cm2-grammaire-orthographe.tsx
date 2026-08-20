// ─── Fiche de cours : la grammaire et l'orthographe (CM2) ─────────────────────
// LA PREMIÈRE FICHE DE FRANÇAIS DU SITE. Les 82 précédentes sont des maths ou
// de l'IA ; celle-ci ouvre la matière, et avec elle le canvas `phrase`
// (lib/canvas/PhraseCanvas.tsx) — l'équivalent, pour la grammaire, de ce que la
// droite graduée est aux nombres.
//
// Alignée sur les micro-compétences du coach
// lib/tutor-v4/knowledge/francais/cm2/microSkills.ts (notionId
// `grammaire_orthographe`, 16 micros) et sur la banque générée
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⭐ ELLE SERT AUSSI AU CRPE. C'est le même programme — l'épreuve écrite de
// français du concours de professeur des écoles porte sur la grammaire du
// primaire — et surtout la même MÉTHODE : le concours n'attend pas des
// définitions récitées, il attend les manipulations syntaxiques (poser la
// question au verbe, déplacer, supprimer, remplacer, encadrer par « c'est… qui »).
// Ce sont exactement les trois réflexes du bloc « méthode », et exactement ce
// que le canvas `phrase` sait MONTRER. Un candidat au CRPE lit cette fiche pour
// la méthode ; un élève de CM2 la lit pour son contrôle.
//
// Micro-compétences couvertes (les 16 de la notion) :
// - cm2_gram_phrase_simple     → définition + figure de référence
// - cm2_gram_sujet_verbe       → propriété « Le sujet et le verbe », méthode 1 et 2
// - cm2_gram_cod_coi           → propriété « Le complément d'objet », exemple 2
// - cm2_gram_complements       → propriété « Le complément circonstanciel » (déplacer / supprimer)
// - cm2_gram_cc_sortes         → usages (temps / lieu / cause), un dessin chacun
// - cm2_gram_attribut          → propriété « L'attribut du sujet », exemple 3
// - cm2_gram_gn                → propriété « Le groupe nominal », formule (la chaîne d'accords)
// - cm2_gram_complement_nom    → exemple 4 (le cari de ma grand-mère / une plage déserte)
// - cm2_gram_nature_fonction   → propriété « Nature ou fonction ? », exemple 1
// - cm2_gram_prepositions      → propriété « Le groupe nominal » (le petit mot qui relie), piège 3
// - cm2_gram_sujet_inverse     → exemple 5 (Sur le piton souffle un vent froid), piège 1
// - cm2_orth_accord_gn         → formule + entraînement 3
// - cm2_orth_sujet_verbe       → méthode 3 + exemple 5 + entraînement 4
// - cm2_orth_attribut          → exemple 3 + entraînement 5
// - cm2_orth_participe_passe   → exemple 6 + piège 4
// - cm2_orth_homophones        → piège 2 + entraînement 6
//
// Les phrases sont CELLES DE LA BANQUE, sans exception : « Le pêcheur répare son
// filet », « Léa mange une mangue », « Léa parle à sa grand-mère », « Le lagon
// est calme », « le cari de ma grand-mère », « une plage déserte », « Sur le
// piton souffle un vent froid », « Les enfants sont partis tôt ». L'élève qui a
// lu la fiche doit retrouver ses propres phrases dans le coach.
//
// ⚠️ SIX MOTS PAR DESSIN, PAS PLUS. Un SVG se met à l'échelle de son bloc : une
// phrase de dix mots ramenée dans une carte de propriété (250 px) écrit ses mots
// en 8 px. `node scripts/apercu-canvas.mjs` mesure cette taille finale et refuse
// tout ce qui passe sous 11 px — c'est le contrôle à passer avant de committer.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasGroupe, PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

// Le helper de tête de fichier, comme la droite graduée des fiches de relatifs :
// une seule façon de dessiner une phrase dans toute la fiche, donc un seul
// dessin à reconnaître pour l'élève. La couleur des groupes, elle, est déduite
// de la fonction par le canvas (sujet = bleu, verbe = rouge, objet = vert,
// circonstanciel = orange, attribut = violet) : on ne l'écrit jamais ici.
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

// ⛔ DANS UNE CARTE, ON EMPILE (REGLES.md § 2 ter). Deux phrases côte à côte
// dans une carte de propriété reçoivent 120 px chacune : personne ne les lit.
// Empilées, chacune prend toute la largeur — et sur un téléphone, elles se
// suivent naturellement au lieu de se serrer.
function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        // Une `key` par bloc : sans elle, React tire deux avertissements par
        // carte dans la console, et la checklist demande zéro erreur.
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Les phrases de la banque, dessinées une fois ─────────────────────────────

// La phrase de référence : trois groupes, trois couleurs, un seul coup d'œil.
const phraseReference = phrase({
  mots: ["Le", "pêcheur", "répare", "son", "filet", "."],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
    { mots: [3, 4], label: "COD" },
  ],
  legende: "Une phrase se découpe en groupes, pas en mots.",
});

// La question qui trouve le sujet — l'arc part du verbe, comme à l'oral.
const phraseSujetVerbe = phrase({
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

const phraseCod = phrase({
  mots: [{ texte: "Léa" }, { texte: "mange", focus: true }, { texte: "une" }, { texte: "mangue" }, { texte: "." }],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 3], label: "COD" },
  ],
  liens: [{ de: 1, vers: 3, label: "quoi ?", type: "question" }],
  legende: "Rien entre le verbe et lui : direct.",
});

const phraseCoi = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "parle", focus: true },
    { texte: "à", nature: "préposition" },
    { texte: "sa" },
    { texte: "grand-mère" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "verbe" },
    { mots: [2, 4], label: "COI" },
  ],
  liens: [{ de: 1, vers: 4, label: "à qui ?", type: "question" }],
  legende: "On y arrive par un petit mot : indirect.",
});

// Le circonstanciel : deux gestes, deux dessins. Il se DÉPLACE (le fantôme part
// à l'autre bout de la phrase), et il se SUPPRIME (les mots se barrent). Le
// complément d'objet, lui, ne fait ni l'un ni l'autre — c'est tout le test.
const phraseCcDeplace = phrase({
  mots: ["Hier", ",", "nous", "partons", "."],
  groupes: [
    { mots: [0, 0], label: "CC de temps", deplacable: true },
    { mots: [2, 2], label: "sujet" },
    { mots: [3, 3], label: "verbe" },
  ],
  legende: "Je le déplace : la phrase tient debout.",
});

const phraseCcSupprime = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "mange" },
    { texte: "une" },
    { texte: "mangue" },
    { texte: "ce", barre: true },
    { texte: "soir", barre: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 3], label: "COD" },
    { mots: [4, 5], label: "CC de temps" },
  ],
  legende: "Je le supprime : la phrase tient encore.",
});

const phraseAttribut = phrase({
  mots: [{ texte: "Le" }, { texte: "lagon" }, { texte: "est", focus: true }, { texte: "calme" }, { texte: "." }],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe d'état" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "=", type: "accord" }],
  legende: "L'attribut dit ce que le sujet EST.",
});

// Le groupe nominal : la seule fois où la NATURE des mots est écrite au-dessus,
// parce que c'est justement ce que le groupe nominal donne à voir — un nom
// chef, et des mots qui travaillent pour lui.
const phraseGroupeNominal = phrase({
  mots: [
    { texte: "une", nature: "dét." },
    { texte: "plage", nature: "nom", focus: true },
    { texte: "déserte", nature: "adjectif" },
  ],
  groupes: [{ mots: [0, 2], label: "groupe nominal" }],
  legende: "Le nom commande ; les autres l'accompagnent.",
});

// Nature ≠ fonction : le MÊME mot, deux phrases, deux fonctions — et une nature
// qui n'a pas bougé. C'est l'exemple de la banque, dessiné.
const phraseNatureSujet = phrase({
  mots: [
    { texte: "Le", nature: "dét." },
    { texte: "chien", nature: "nom" },
    { texte: "dort", nature: "verbe" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 1], label: "sujet" }],
});

const phraseNatureCod = phrase({
  mots: [
    { texte: "Je", nature: "pronom" },
    { texte: "vois", nature: "verbe" },
    { texte: "le", nature: "dét." },
    { texte: "chien", nature: "nom" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 3], label: "COD" }],
});

// La chaîne d'accords du groupe nominal : le nom donne son genre et son nombre
// aux deux autres. Trois flèches qui partent du même mot, ça se voit.
const phraseAccordGn = phrase({
  mots: [
    { texte: "les", nature: "dét." },
    { texte: "fleurs", nature: "nom", focus: true },
    { texte: "rouges", nature: "adjectif" },
  ],
  liens: [
    { de: 1, vers: 0, label: "pluriel", type: "accord" },
    { de: 1, vers: 2, label: "pluriel", type: "accord" },
  ],
});

const phraseAccordSujetVerbe = phrase({
  mots: ["Les", "enfants", "jouent", "dans", "la", "cour", "."],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 2, label: "-ent", type: "accord" }],
});

// Les trois circonstances, trois phrases, trois questions différentes : c'est
// la question qui distingue, pas la place dans la phrase.
const phraseCcTemps = phrase({
  mots: ["Hier", ",", "nous", "sommes", "allés", "au", "marché", "."],
  groupes: [{ mots: [0, 0], label: "CC de temps" }],
  legende: "quand ?",
});

const phraseCcLieu = phrase({
  mots: ["Nous", "sommes", "allés", "au", "marché", "."],
  groupes: [{ mots: [3, 4], label: "CC de lieu" }],
  legende: "où ?",
});

const phraseCcCause = phrase({
  mots: ["Il", "rentre", "parce", "qu'", "il", "pleut", "."],
  groupes: [{ mots: [2, 5], label: "CC de cause" }],
  legende: "pourquoi ?",
});

// Le sujet inversé : la question marche toujours, la place non. L'arc part du
// verbe et va VERS LA DROITE — c'est le dessin qui dit l'inversion.
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
    { mots: [0, 2], label: "CC de lieu" },
    { mots: [3, 3], label: "verbe" },
    { mots: [4, 6], label: "sujet" },
  ],
  liens: [{ de: 3, vers: 5, label: "qui est-ce qui ?", type: "question" }],
});

const phraseComplementNom = phrase({
  mots: [
    { texte: "le", nature: "dét." },
    { texte: "cari", nature: "nom", focus: true },
    { texte: "de", nature: "préposition" },
    { texte: "ma" },
    { texte: "grand-mère" },
  ],
  groupes: [{ mots: [2, 4], label: "complément du nom" }],
  legende: "Une préposition, puis un autre groupe.",
});

const phraseEpithete = phrase({
  mots: [
    { texte: "une", nature: "dét." },
    { texte: "plage", nature: "nom", focus: true },
    { texte: "déserte", nature: "adjectif" },
  ],
  groupes: [{ mots: [2, 2], label: "épithète" }],
  legende: "Un adjectif collé au nom, sans préposition.",
});

const phraseParticipePasse = phrase({
  mots: ["Les", "enfants", "sont", "partis", "tôt", "."],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 3], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 3, label: "masculin pluriel", type: "accord" }],
  legende: "Avec ÊTRE, le sujet commande.",
});

const phrasePronom = phrase({
  mots: ["Léa", "prend", "son", "sac", "et", "l'", "ouvre", "."],
  liens: [{ de: 5, vers: 3, label: "remplace", type: "reprise" }],
  legende: "Le pronom remplace un groupe nominal.",
});

const pieges = [
  "Croire que le sujet est toujours devant le verbe : « Sur le piton souffle un vent froid » — le sujet est « un vent froid ».",
  "Écrire « à » (préposition) là où il faut « a » (verbe avoir) : « Il a un vélo », mais « Elle va à l'école ».",
  "Prendre une préposition (à, de, dans, sur) pour une conjonction (mais, ou, et, donc) : la préposition relie deux groupes, la conjonction relie deux phrases.",
  "Accorder le participe passé avec le sujet quand l'auxiliaire est « avoir » : avec ÊTRE seulement, le sujet commande.",
];

const aRetenir = [
  "Le sujet répond à « qui est-ce qui ? » posée devant le verbe — même s'il est placé derrière.",
  "Le complément d'objet ne se déplace pas et ne se supprime pas ; le complément circonstanciel fait les deux.",
  "La nature dit ce que le mot EST, la fonction dit son rôle DANS la phrase : la nature ne change jamais.",
];

export const ficheGrammaireCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "grammaire-orthographe",
  titre: "Analyser une phrase : nature, fonction, accords",
  accroche:
    "Une phrase n'est pas une file de mots : c'est un petit montage de groupes qui ont chacun un rôle. Savoir les reconnaître, c'est comprendre ce qu'on lit — et écrire sans faute d'accord.",
  identite: [
    { label: "Mots clés", valeur: "Sujet, verbe, complément, nature, fonction, accord" },
    { label: "Le secret", valeur: "On pose la question au verbe" },
    { label: "Outil", valeur: "Déplacer, supprimer, remplacer" },
  ],
  definition: {
    texte:
      "Analyser une phrase, c'est la découper en groupes et dire le rôle de chacun. Autour du verbe conjugué, on trouve le sujet (qui fait l'action), les compléments du verbe (ce sur quoi elle porte) et les compléments circonstanciels (quand, où, pourquoi). Chaque mot a en plus une nature — nom, déterminant, adjectif, verbe, préposition — qui, elle, ne change jamais.",
  },
  figure: {
    schema: phraseReference,
    legende:
      "« Le pêcheur répare son filet. » Trois groupes : le sujet en bleu, le verbe en rouge, le complément d'objet en vert. Cette couleur des fonctions est la même dans toutes les fiches de français.",
  },
  // Un dessin sous CHAQUE propriété (REGLES.md § 2 bis), et six dessins qui ne
  // montrent pas la même chose : une question qui part du verbe, deux questions
  // d'objet, un groupe qui se déplace, un « = » entre sujet et attribut, une
  // ligne de natures, et le même mot dans deux rôles.
  proprietes: [
    {
      titre: "Le sujet et le verbe",
      texte: "Le verbe dit l'action ; le sujet répond à « qui est-ce qui ? » posée devant lui.",
      schema: phraseSujetVerbe,
    },
    {
      titre: "Le complément d'objet",
      texte: "Direct s'il suit le verbe sans préposition (quoi ?), indirect s'il passe par à ou de (à qui ?).",
      schema: pile(phraseCod, phraseCoi),
    },
    {
      titre: "Le complément circonstanciel",
      texte: "Il dit quand, où ou pourquoi : il se déplace et il se supprime, l'objet non.",
      schema: pile(phraseCcDeplace, phraseCcSupprime),
    },
    {
      titre: "L'attribut du sujet",
      texte: "Après un verbe d'état (être, sembler, devenir, rester), il dit ce que le sujet EST.",
      schema: phraseAttribut,
    },
    {
      titre: "Le groupe nominal",
      texte: "Un nom chef, son déterminant, et des expansions : adjectif collé, ou groupe amené par une préposition.",
      schema: phraseGroupeNominal,
    },
    {
      titre: "Nature ou fonction ?",
      texte: "La nature est écrite dans le dictionnaire ; la fonction n'existe que dans une phrase.",
      schema: pile(phraseNatureSujet, phraseNatureCod),
    },
  ],
  reel: {
    texte:
      "On s'en sert à chaque relecture : c'est en retrouvant le sujet qu'on sait s'il faut écrire « les élèves jouent » ou « joue ». À La Réunion comme ailleurs, un message mal ponctué ou un accord manqué change ce que l'autre comprend — « le cari de ma grand-mère » n'est pas « le cari, ma grand-mère ».",
  },
  historique: {
    texte:
      "Les mots « sujet », « verbe » et « complément » nous viennent des grammairiens grecs et latins, il y a plus de deux mille ans : ils analysaient déjà les phrases pour apprendre à bien parler en public. Les couleurs et les flèches, elles, sont beaucoup plus récentes — l'école les utilise depuis moins d'un siècle.",
  },
  formule: {
    contexte: "L'accord part toujours d'un chef de groupe.",
    expression: "déterminant ← nom → adjectif      et      sujet → verbe",
    legende:
      "Dans le groupe nominal, le nom donne son genre et son nombre au déterminant et à l'adjectif. Dans la phrase, le sujet donne sa personne et son nombre au verbe.",
    schema: pile(phraseAccordGn, phraseAccordSujetVerbe),
  },
  // Les trois réflexes SONT les manipulations attendues au CRPE : on ne récite
  // pas une définition, on agit sur la phrase et on regarde ce qu'elle devient.
  methode: [
    {
      titre: "Je trouve le verbe",
      texte: "Je change le temps : « hier, le facteur apportait… ». Le mot qui bouge est le verbe conjugué.",
      schema: phraseSujetVerbe,
    },
    {
      titre: "Je pose la question au verbe",
      texte: "« Qui est-ce qui ? » donne le sujet ; « quoi ? » ou « à qui ? » donnent le complément d'objet.",
      schema: pile(phraseCod, phraseCoi),
    },
    {
      titre: "Je manipule le groupe",
      texte: "Je le déplace, je le supprime, je le remplace par un pronom : ce qu'il accepte dit sa fonction.",
      schema: pile(phraseCcDeplace, phrasePronom),
    },
  ],
  usages: [
    {
      titre: "Dire quand",
      detail: "Complément circonstanciel de temps : il répond à « quand ? ».",
      schema: phraseCcTemps,
    },
    {
      titre: "Dire où",
      detail: "Complément circonstanciel de lieu : il répond à « où ? ».",
      schema: phraseCcLieu,
    },
    {
      titre: "Dire pourquoi",
      detail: "Complément circonstanciel de cause : il répond à « pourquoi ? ».",
      schema: phraseCcCause,
    },
  ],
  exemples: [
    {
      titre: "Nature ou fonction ?",
      donnees: "« Le chien dort. » puis « Je vois le chien. »",
      schema: pile(phraseNatureSujet, phraseNatureCod),
      question: "Quelle est la nature de « chien » dans chaque phrase ? Et sa fonction ?",
      solution:
        "Sa nature ne bouge pas : c'est un nom dans les deux phrases. Sa fonction change : « le chien » est sujet dans la première, complément d'objet direct dans la seconde.",
    },
    {
      titre: "Direct ou indirect ?",
      donnees: "« Léa mange une mangue. » et « Léa parle à sa grand-mère. »",
      schema: pile(phraseCod, phraseCoi),
      question: "Quelle est la fonction du groupe qui suit le verbe ?",
      solution:
        "« une mangue » suit le verbe sans préposition (mange quoi ?) : complément d'objet direct. « à sa grand-mère » passe par la préposition « à » (parle à qui ?) : complément d'objet indirect.",
    },
    {
      titre: "Attribut ou complément d'objet ?",
      donnees: "« Le lagon est calme. »",
      schema: phraseAttribut,
      question: "Quelle est la fonction de « calme » ?",
      solution:
        "Le verbe « est » est un verbe d'état : « calme » dit ce que le lagon EST, c'est un attribut du sujet. On peut mettre un « = » entre les deux, ce qui est impossible avec un complément d'objet.",
    },
    {
      titre: "Complément du nom ou épithète ?",
      donnees: "« le cari de ma grand-mère » et « une plage déserte »",
      schema: pile(phraseComplementNom, phraseEpithete),
      question: "Comment s'appelle chacune des deux expansions du nom ?",
      solution:
        "« de ma grand-mère » est amené par une préposition : c'est un complément du nom. « déserte » est un adjectif collé au nom, sans rien entre les deux : c'est une épithète.",
    },
    {
      titre: "Un sujet placé derrière le verbe",
      donnees: "« Sur le piton souffle un vent froid. »",
      schema: phraseSujetInverse,
      question: "Quel est le sujet du verbe « souffle » ?",
      solution:
        "On pose la question devant le verbe : qui est-ce qui souffle ? Un vent froid. C'est donc le sujet, même s'il est écrit derrière le verbe : on l'appelle un sujet inversé. Le verbe s'accorde avec lui.",
    },
    {
      titre: "L'accord du participe passé",
      donnees: "« Les enfants sont parti… tôt. »",
      schema: phraseParticipePasse,
      question: "Comment s'écrit le participe passé ?",
      solution:
        "L'auxiliaire est « être » : le participe s'accorde avec le sujet. « Les enfants » est masculin pluriel, on écrit « partis ».",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Chaque matin, le coq chante. » Quel est le sujet du verbe « chante » ?",
      correction:
        "On pose la question devant le verbe : qui est-ce qui chante ? Le coq. « Chaque matin » se déplace et se supprime : c'est un complément circonstanciel de temps, pas le sujet.",
    },
    {
      question: "« Le margouillat dort sur le mur. » Quel mot est une préposition ?",
      correction:
        "« sur ». Elle relie le verbe au groupe « le mur » ; « le » est un déterminant, « margouillat » un nom, « dort » le verbe.",
    },
    {
      question: "Quel groupe nominal est correctement accordé : « les fleur rouge », « les fleurs rouges », « la fleurs rouges » ?",
      correction:
        "« les fleurs rouges ». Le nom est au pluriel : le déterminant et l'adjectif prennent la marque du pluriel avec lui.",
    },
    {
      question: "« Le chien et le chat dor… » Comment se termine le verbe ?",
      correction:
        "« dorment ». Deux sujets reliés par « et » font un sujet pluriel : le verbe se met au pluriel.",
    },
    {
      question: "« Les letchis sont mûr… » Que faut-il écrire ?",
      correction:
        "« mûrs ». L'attribut du sujet s'accorde avec le sujet, et « les letchis » est masculin pluriel.",
    },
    {
      question: "Choisis : « Il a un nouveau vélo » ou « Il à un nouveau vélo » ?",
      correction:
        "« Il a un nouveau vélo » : c'est le verbe avoir (on peut dire « il avait »). « à » avec accent est une préposition : « Elle va à l'école ».",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesGrammaireCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Grammaire - CM2",
    section: {
      type: "objectif",
      phrase: "Découper une phrase et nommer le rôle de chaque groupe",
      sousPhrase:
        "On cherche le verbe, on pose la question, puis on manipule le groupe pour vérifier.",
      encadre: {
        titre: "L'idée",
        texte: "Une phrase est un montage de groupes : chacun a un rôle, et ce rôle se prouve.",
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
          "Relire un texte, choisir entre « joue » et « jouent », comprendre une phrase longue, écrire un message qu'on ne comprendra pas de travers.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Sujet », « verbe », « complément » viennent des grammairiens grecs et latins : on analyse les phrases depuis plus de deux mille ans.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheGrammaireCm2.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
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
          "Ce que le mot EST : nom, déterminant, adjectif, verbe, pronom, préposition. Elle est déjà dans le dictionnaire, avant toute phrase.",
      },
      droite: {
        variante: "ok",
        titre: "La fonction",
        contenu:
          "Le rôle du groupe DANS la phrase : sujet, complément d'objet, complément circonstanciel, attribut. Elle change d'une phrase à l'autre.",
      },
    },
  },
  {
    titre: "Objet ou circonstanciel ?",
    badge: "Le test",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Le complément d'objet",
        contenu:
          "« Léa mange une mangue. » Il ne se déplace pas, il ne se supprime pas : il tient au verbe.",
      },
      droite: {
        variante: "info",
        titre: "Le complément circonstanciel",
        contenu:
          "« Hier, nous partons. » Il se déplace en tête, en fin, et il peut disparaître : la phrase tient debout sans lui.",
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
    titre: "Les 3 circonstances",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: ficheGrammaireCm2.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
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
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "« Chaque matin, le coq chante. »",
      question: "Quel est le sujet, et quelle est la fonction de « Chaque matin » ?",
      indice: "Pose « qui est-ce qui chante ? », puis essaie de déplacer l'autre groupe.",
      correction:
        "Le sujet est « le coq ». « Chaque matin » se déplace et se supprime : c'est un complément circonstanciel de temps.",
    },
  },
];
