// ─── Fiche de cours : la valeur des temps (6e) ────────────────────────────────
// QUATRIÈME ET DERNIÈRE FICHE DE CONJUGAISON DE LA 6e. Les trois précédentes
// répondaient à « comment ça s'écrit » ; celle-ci répond à « pourquoi celui-là
// et pas un autre ». C'est le premier cours de l'année où une forme juste peut
// être un mauvais choix.
//
// ⭐ LE BO DIT « INITIER », ET IL DIT COMMENT. « Initier à la notion de valeurs
// des temps PAR OBSERVATION, COMPARAISON, OPPOSITION de phrases et textes
// rencontrés : des temps du DISCOURS, puis des temps du RÉCIT. Quelques valeurs
// temporelles des temps seront identifiées. » Pas de définition à réciter : des
// phrases mises côte à côte. La fiche est donc bâtie sur des COUPLES — « Il
// ouvrit la porte » face à « J'ai fini, je pars » —, et c'est le canvas
// `phrase` qui les porte, avec la nature du temps écrite au-dessus du verbe.
//
// ⭐ POURQUOI LA FRISE, ET SEULEMENT ICI. Le mode `frise` du canvas
// `conjugaison` ne démonte rien : il pose les formes sur une ligne du temps.
// C'est le seul endroit des quatre fiches où il a un sens, parce que la valeur
// d'un temps n'est pas dans sa forme mais dans le moment qu'il désigne. Et il
// permet de montrer ce qu'aucune phrase ne montre aussi vite : un PRÉSENT posé
// dans la zone du PASSÉ — « En 1946, la Réunion devient un département ».
//
// ⛔ LA FRISE NE VA QUE DANS UN BLOC D'EXEMPLE (CATALOGUE, § conjugaison). Elle
// calcule sa largeur sur ses repères ; ceux d'ici la laissent à 285 px, mais
// des repères plus longs la feraient sortir d'une carte de propriété.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `conjugaison_valeurs`), sur les items 6e_fr_fixed_val_1 à 5 de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts, et sur les pools
// DISCOURS_RECIT et CONJ_VALEUR_TEMPS de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 3 de la notion, défi compris) :
// - 6e_conj_discours_recit → définition, figure, propriétés « Les temps du
//                            récit », « Les temps du discours » et « Quand un
//                            personnage parle », méthode 1, usages, exemples 1
//                            et 2, pièges 1 et 2, entraînements 1 à 3
// - 6e_conj_employer       → propriétés « Le décor et l'action » et « Le présent
//                            qui vaut toujours », formule, méthodes 2 et 3,
//                            exemples 3 et 4, piège 3, entraînements 4 et 5
// - 6e_conj_recit_defi     → le défi, dessiné (exemple 5)
//
// Les phrases sont CELLES DE LA BANQUE : « Il ouvrit la porte et sortit »,
// « J'ai fini mon travail, je pars », « — J'ai fini mon travail, dit-il »,
// « Le vent soufflait. Soudain, un volet claqua », « Il marchait tranquillement
// lorsqu'un cri retentit », « L'eau bout à 100 degrés », « Le soleil se
// couchait. Soudain, une voile apparut à l'horizon », et « En 1946, la Réunion
// devient un département », qui est la méthode d'un item du pool.
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.
// ⛔ UNE `nature` TROP LONGUE SE FAIT COUPER PAR LE VIEWBOX, SANS UN MOT.
// `PhraseCanvas` calcule la largeur d'un mot sur le MOT, pas sur la nature
// écrite au-dessus : « passé simple » posé sur le dernier mot d'une phrase
// sortait du cadre de trois pixels. Mesuré au rendu, invisible à la lecture.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { ConjugaisonRepere, PhraseCanvasMot } from "@/lib/tutor-v4/types";

// LE CANVAS DE LA MATIÈRE porte cette fiche-ci : la valeur d'un temps se lit
// dans une phrase, pas dans une forme isolée. La `nature` écrite en gris
// au-dessus du verbe nomme le temps ; le `focus` désigne celui qu'on regarde.
function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

// ⛔ RÉSERVÉE AUX BLOCS D'EXEMPLE (CATALOGUE, § conjugaison).
function frise(opts: { reperes: ConjugaisonRepere[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{ kind: "conjugaison", mode: "frise", reperes: opts.reperes, legende: opts.legende }}
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

// ─── Les phrases de la banque, opposées deux à deux ───────────────────────────

// LES DEUX FIGURES DE RÉFÉRENCE, ET ELLES VONT ENSEMBLE. Le BO demande une
// initiation « par opposition de phrases » : une seule de ces deux images ne
// dirait rien.
const phraseRecit = phrase({
  mots: [
    { texte: "Il" },
    { texte: "ouvrit", nature: "passé simple", focus: true },
    { texte: "la" },
    { texte: "porte" },
    { texte: "et" },
    { texte: "sortit", nature: "passé simple" },
    { texte: "." },
  ],
  legende: "Le passé simple : on raconte.",
});

const phraseDiscours = phrase({
  mots: [
    { texte: "J'" },
    { texte: "ai fini", nature: "passé composé", focus: true },
    { texte: "mon" },
    { texte: "travail" },
    { texte: "," },
    { texte: "je" },
    { texte: "pars", nature: "présent" },
    { texte: "." },
  ],
  legende: "On parle depuis maintenant.",
});

// LE PERSONNAGE QUI PARLE DANS UN RÉCIT. ⚠️ « dit » ne porte pas sa nature :
// « passé simple » au-dessus du dernier mot sortait du cadre (mesuré).
const phraseDialogue = phrase({
  mots: [
    { texte: "—" },
    { texte: "J'" },
    { texte: "ai fini", nature: "passé composé", focus: true },
    { texte: "," },
    { texte: "dit" },
    { texte: "-il" },
    { texte: "." },
  ],
  legende: "Entre guillemets, on quitte le récit.",
});

// LE DÉCOR ET L'ACTION : les deux temps du récit, dans une seule phrase.
const phraseDecorAction = phrase({
  mots: [
    { texte: "Le" },
    { texte: "soleil" },
    { texte: "se couchait", nature: "imparfait", focus: true },
    { texte: "quand" },
    { texte: "une" },
    { texte: "voile" },
    { texte: "apparut", nature: "passé simple", focus: true },
    { texte: "." },
  ],
  legende: "Ce qui dure, puis ce qui survient.",
});

const phraseCri = phrase({
  mots: [
    { texte: "Il" },
    { texte: "marchait", nature: "imparfait", focus: true },
    { texte: "lorsqu'" },
    { texte: "un" },
    { texte: "cri" },
    { texte: "retentit", nature: "passé simple", focus: true },
    { texte: "." },
  ],
  legende: "Le décor dure, le cri arrive.",
});

// UN PRÉSENT QUI NE DIT PAS « MAINTENANT ».
const phraseVeriteGenerale = phrase({
  mots: [
    { texte: "L'" },
    { texte: "eau" },
    { texte: "bout", nature: "présent", focus: true },
    { texte: "à" },
    { texte: "100" },
    { texte: "degrés" },
    { texte: "." },
  ],
  legende: "Un présent qui vaut pour toujours.",
});

// ⛔ EN BLOC D'EXEMPLE UNIQUEMENT. Le cas ordinaire : chaque temps dans sa zone.
const friseOrdinaire = frise({
  reperes: [
    { texte: "partit", zone: "passe" },
    { texte: "part", zone: "present" },
    { texte: "partira", zone: "futur" },
  ],
  legende: "Le temps verbal suit le moment.",
});

// … ET LE CAS QUI DÉFAIT LE CAS ORDINAIRE : un PRÉSENT posé dans le PASSÉ.
// C'est la méthode d'un item du pool, dessinée — et elle parle de La Réunion.
const friseDecalee = frise({
  reperes: [{ texte: "devient", zone: "passe" }],
  legende: "« En 1946, la Réunion devient… »",
});

const pieges = [
  "Croire que le passé simple est « plus difficile » que le passé composé : ce n'est pas une question de difficulté, mais de point de vue. « il partit » raconte, « il est parti » se dit. Le fait est le même.",
  "Employer le passé simple quand un personnage parle : dans un dialogue, on quitte le récit et l'on repasse aux temps du discours — « J'ai fini », et non « Je finis mon travail » au passé simple.",
  "Mettre tout un récit au passé simple : l'imparfait y est indispensable. Il plante le décor et dit ce qui durait pendant que l'histoire avançait ; sans lui, il ne reste qu'une liste d'actions.",
  "Confondre le temps chronologique et le temps verbal : « En 1946, la Réunion devient un département » est au présent et parle du passé. La forme du verbe ne dit pas toujours le moment.",
];

const aRetenir = [
  "Les temps du RÉCIT — imparfait, passé simple, plus-que-parfait — racontent une histoire coupée du moment où l'on parle.",
  "Les temps du DISCOURS — présent, passé composé, futur — sont ceux de quelqu'un qui parle depuis maintenant.",
  "Dans un récit au passé, l'imparfait plante le décor et le passé simple amène les actions.",
];

export const ficheConjugaisonValeurs6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "conjugaison-valeurs",
  titre: "La valeur des temps : raconter ou parler",
  accroche:
    "« Il partit. » « Il est parti. » Le fait est exactement le même — quelqu'un s'en est allé. Ce qui change, c'est d'où l'on parle : dans un cas on raconte une histoire, dans l'autre on parle depuis maintenant. Choisir un temps, c'est choisir une place.",
  identite: [
    { label: "Mots clés", valeur: "Valeur des temps, discours, récit, décor, action" },
    { label: "Le secret", valeur: "Un temps ne dit pas seulement quand, il dit d'où l'on parle" },
    { label: "Outil", valeur: "Comparer deux phrases qui disent le même fait" },
  ],
  definition: {
    texte:
      "La valeur d'un temps, c'est ce qu'il fait dans la phrase, et pas seulement le moment qu'il désigne. Le français range ses temps en deux séries. Les temps du DISCOURS — présent, passé composé, futur — sont ceux de quelqu'un qui parle depuis maintenant : une conversation, une lettre, un message. Les temps du RÉCIT — imparfait, passé simple, plus-que-parfait — sont ceux d'une histoire racontée, coupée du moment où l'on parle. Un même fait peut se dire dans les deux séries : c'est le point de vue qui change, pas le fait.",
  },
  figure: {
    schema: pile(phraseRecit, phraseDiscours),
    legende:
      "Deux phrases, deux séries. En haut, « Il ouvrit la porte et sortit » : le passé simple ne s'emploie pas quand on parle, c'est un temps du récit. En bas, « J'ai fini mon travail, je pars » : passé composé et présent, on parle depuis maintenant. Le programme demande d'apprendre cela « par observation, comparaison, opposition de phrases » — c'est-à-dire ainsi, en les mettant côte à côte.",
  },
  proprietes: [
    {
      titre: "Les temps du RÉCIT",
      texte: "Imparfait, passé simple, plus-que-parfait : ceux d'une histoire, dans un roman ou un conte.",
      schema: phraseRecit,
    },
    {
      titre: "Les temps du DISCOURS",
      texte: "Présent, passé composé, futur : ceux de quelqu'un qui parle depuis maintenant.",
      schema: phraseDiscours,
    },
    {
      titre: "Quand un personnage parle",
      texte: "On quitte le récit : entre les guillemets, il emploie les temps du discours.",
      schema: phraseDialogue,
    },
    {
      titre: "Le décor et l'action",
      texte: "Dans un récit au passé, l'imparfait dit ce qui durait, le passé simple ce qui survient.",
      schema: pile(phraseDecorAction, phraseCri),
    },
    {
      titre: "Un présent qui vaut toujours",
      texte: "« L'eau bout à 100 degrés » : le présent sert aussi à ce qui est vrai en tout temps.",
      schema: phraseVeriteGenerale,
    },
    {
      titre: "Le même fait, deux façons",
      texte: "« il est parti » ou « il partit » : le fait ne change pas, le point de vue change.",
      schema: pile(phraseRecit, phraseDiscours),
    },
  ],
  reel: {
    texte:
      "C'est la différence entre raconter sa journée et écrire une histoire. À l'oral, personne ne dit « je partis à sept heures » : on dit « je suis parti ». Mais dans le roman qu'on lit le soir, « il partit » est partout — et cela ne choque personne, parce qu'un narrateur ne parle pas depuis maintenant. En 6e, c'est ce qui permet de comprendre pourquoi un livre ne s'écrit pas comme un message, et de commencer à écrire soi-même un récit qui sonne juste.",
  },
  historique: {
    texte:
      "Le passé simple a quitté la conversation il y a près de quatre siècles. Au XVIIe siècle, le grammairien Vaugelas croyait encore pouvoir régler son emploi à l'heure près : il énonce la « règle des vingt-quatre heures » — le passé composé pour ce qui s'est passé depuis moins d'un jour, le passé simple au-delà. La règle n'a pas tenu, l'usage a gagné, et le passé simple s'est réfugié dans les livres. C'est pour cela que tu le lis souvent et que tu ne l'entends jamais.",
  },
  formule: {
    contexte: "Les deux séries, en un coup d'œil.",
    expression: "récit : imparfait · passé simple · plus-que-parfait — discours : présent · passé composé · futur",
    legende:
      "Pour savoir dans quelle série on est, une seule question : est-ce que quelqu'un parle ? Si oui, c'est le discours. Si l'on raconte une histoire, c'est le récit. Et attention : le temps VERBAL ne dit pas toujours le moment. « En 1946, la Réunion devient un département » est au présent, et pourtant il s'agit du passé.",
    schema: pile(phraseDiscours, phraseRecit),
  },
  methode: [
    {
      titre: "Je demande : quelqu'un parle-t-il ?",
      texte: "Oui → temps du discours. Non, on raconte → temps du récit.",
      schema: phraseDiscours,
    },
    {
      titre: "Dans un récit, je sépare le décor de l'action",
      texte: "Ce qui durait va à l'imparfait ; ce qui arrive d'un coup va au passé simple.",
      schema: phraseCri,
    },
    {
      titre: "Je vérifie que la forme dit bien le moment",
      texte: "Un présent peut raconter le passé. Le temps du verbe et le moment sont deux choses.",
      schema: phraseVeriteGenerale,
    },
  ],
  usages: [
    {
      titre: "Raconter une histoire",
      detail: "« Il ouvrit la porte et sortit. » Passé simple : le narrateur ne parle pas, il raconte.",
      schema: phraseRecit,
    },
    {
      titre: "Parler depuis maintenant",
      detail: "« J'ai fini mon travail, je pars. » Passé composé et présent : c'est du discours.",
      schema: phraseDiscours,
    },
    {
      titre: "Planter un décor",
      detail: "« Le soleil se couchait… » L'imparfait installe ce qui dure avant que l'action n'arrive.",
      schema: phraseDecorAction,
    },
  ],
  exemples: [
    {
      titre: "Récit ou discours ?",
      donnees: "« Il ouvrit la porte et sortit. » puis « J'ai fini mon travail, je pars. »",
      schema: pile(phraseRecit, phraseDiscours),
      question: "À quelle série appartient chaque phrase ?",
      solution:
        "La première relève du RÉCIT : le passé simple ne s'emploie pas quand on parle. La seconde relève du DISCOURS : passé composé et présent, quelqu'un parle depuis maintenant. Ce n'est pas une question de difficulté ni d'époque, c'est une question de point de vue.",
    },
    {
      titre: "Le personnage qui parle",
      donnees: "« — J'ai fini mon travail, dit-il. »",
      schema: phraseDialogue,
      question: "Pourquoi le passé composé, alors que le récit est au passé simple ?",
      solution:
        "Parce qu'entre les guillemets, on quitte le récit. Le narrateur, lui, raconte au passé simple — « dit-il ». Mais le personnage, quand il parle, parle depuis SON présent : il emploie donc les temps du discours. Deux séries dans une seule ligne.",
    },
    {
      titre: "Le décor et l'action",
      donnees: "« Il marchait tranquillement lorsqu'un cri ___. »",
      schema: pile(phraseCri, friseOrdinaire),
      question: "Faut-il « retentissait » ou « retentit » ?",
      solution:
        "« retentit ». « marchait » est à l'imparfait : il pose le décor, ce qui durait. Le cri, lui, arrive d'un coup et coupe ce décor : c'est le passé simple. Avec « retentissait », le cri durerait lui aussi, et il ne se passerait plus rien.",
    },
    {
      titre: "Quand la forme ne dit pas le moment",
      donnees: "« L'eau bout à 100 degrés. » et « En 1946, la Réunion devient un département. »",
      schema: pile(phraseVeriteGenerale, friseDecalee),
      question: "Ces deux verbes sont au présent : parlent-ils du présent ?",
      solution:
        "Non, ni l'un ni l'autre. Le premier dit une vérité qui vaut en tout temps — hier, aujourd'hui, demain. Le second raconte un évènement de 1946 : c'est un présent posé dans le passé, ce que les historiens emploient pour rendre la scène vivante. Le temps VERBAL et le temps CHRONOLOGIQUE sont deux choses différentes.",
    },
    {
      titre: "Le défi",
      donnees: "« Le soleil se couchait. Soudain, une voile apparut à l'horizon. »",
      schema: phraseDecorAction,
      question: "Pourquoi deux temps différents dans deux phrases qui se suivent ?",
      solution:
        "Ce n'est pas une faute, c'est la valeur des temps. L'imparfait « se couchait » plante le décor : quelque chose qui durait. Le passé simple « apparut » amène l'évènement : quelque chose qui survient, une fois, et qui fait avancer l'histoire. Les deux temps ne se remplacent pas — ils font deux métiers différents dans le même récit.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quels temps sont ceux du RÉCIT au passé ?",
      correction:
        "L'imparfait et le passé simple — auxquels s'ajoute le plus-que-parfait pour ce qui précède. Le récit littéraire au passé s'écrit à l'imparfait (le décor) et au passé simple (les actions).",
    },
    {
      question: "« J'ai fini mon travail, je pars. » Ce passage relève de quoi ?",
      correction:
        "Du discours. Passé composé et présent : on parle depuis maintenant. Le passé simple, lui, ne s'emploie jamais dans une conversation.",
    },
    {
      question: "« — J'ai fini mon travail, dit-il. » Le passé composé est ici un temps de quoi ?",
      correction:
        "Du discours. Quelqu'un parle : on quitte le récit, et le passé composé y remplace le passé simple. Le verbe « dit », lui, appartient au récit.",
    },
    {
      question: "Dans un roman, quel temps plante le décor, et lequel fait avancer l'histoire ?",
      correction:
        "L'imparfait plante le décor — il dit ce qui durait pendant que l'histoire avançait. Le passé simple fait avancer : il marque les actions qui arrivent, une par une.",
    },
    {
      question: "Pour une vérité toujours vraie — « L'eau ___ à 100 degrés » —, quel temps choisir ?",
      correction:
        "Le présent : « L'eau bout à 100 degrés. » Ce présent-là ne dit pas « en ce moment », il dit « toujours ». C'est une des valeurs du présent, et non un moment.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesConjugaisonValeurs6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La valeur des temps - 6e",
    section: {
      type: "objectif",
      phrase: "Choisir un temps, c'est choisir une place",
      sousPhrase:
        "Les temps du discours parlent depuis maintenant ; les temps du récit racontent une histoire.",
      encadre: {
        titre: "L'idée",
        texte: "« il partit » et « il est parti » disent le même fait, depuis deux endroits.",
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
          "Personne ne dit « je partis à sept heures » : on dit « je suis parti ». Mais dans un roman, « il partit » est partout — parce qu'un narrateur ne parle pas depuis maintenant.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Au XVIIe siècle, le grammairien Vaugelas croyait pouvoir régler l'emploi du passé simple à l'heure près : passé composé en deçà de vingt-quatre heures, passé simple au-delà. La règle n'a pas tenu — et le passé simple s'est réfugié dans les livres.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonValeurs6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Deux séries de temps",
    badge: "Discours / récit",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Le DISCOURS",
        contenu:
          "Présent, passé composé, futur. Quelqu'un parle depuis maintenant : conversation, message, lettre, dialogue entre guillemets.",
      },
      droite: {
        variante: "ok",
        titre: "Le RÉCIT",
        contenu:
          "Imparfait, passé simple, plus-que-parfait. On raconte une histoire, coupée du moment où l'on parle : roman, conte, légende.",
      },
    },
  },
  {
    titre: "Dans un récit, deux métiers",
    badge: "Décor & action",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'imparfait",
        contenu:
          "« Le soleil se couchait. » Il plante le décor : ce qui durait pendant que l'histoire avançait.",
      },
      droite: {
        variante: "ok",
        titre: "Le passé simple",
        contenu:
          "« Soudain, une voile apparut. » Il amène l'évènement : ce qui survient, une fois, et fait avancer le récit.",
      },
    },
  },
  {
    titre: "Quand la forme ne dit pas le moment",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« En 1946, la Réunion devient un département. »",
      question: "Le verbe est au présent : parle-t-il du présent ?",
      correction:
        "Non. C'est un présent posé dans le passé, pour rendre la scène vivante. Le temps VERBAL et le temps CHRONOLOGIQUE sont deux choses différentes.",
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
      enonce: "« Le soleil se couchait. Soudain, une voile apparut à l'horizon. »",
      question: "Pourquoi deux temps différents dans deux phrases qui se suivent ?",
      indice: "Demande-toi lequel des deux évènements DURE, et lequel ARRIVE.",
      correction:
        "L'imparfait plante le décor, le passé simple amène l'action. Les deux temps ne se remplacent pas : ils font deux métiers différents dans le même récit.",
    },
  },
];
