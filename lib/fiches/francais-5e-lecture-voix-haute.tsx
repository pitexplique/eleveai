// ─── Fiche de cours : lire à voix haute, seul ou à plusieurs (5e) ─────────────
// LA SEPTIÈME FICHE DE LA 5e ÉCRITE LE 26/08/2026.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ». Le texte
// fixe lui-même la longueur pour la 5e : « lire un texte d'une VINGTAINE de
// lignes avec aisance devant un auditoire » — la 4e en dit quinze. ⛔ CE N'EST
// PAS LE PROGRAMME DE LA 4e.
//
// ⭐⭐ LA PARTITION EST REPRISE DE `francais-4e-lecture-voix-haute.tsx`, ET C'EST
// VOULU : c'est la découverte qui a rendu cette compétence enseignable. Les
// groupes du canvas `phrase` cessent de marquer une FONCTION GRAMMATICALE pour
// marquer une RESPIRATION ; le `focus` marque les mots à détacher. L'élève voit
// sa feuille avant de l'écrire.
// ⛔ ET LA RÈGLE QUI VA AVEC, À NE JAMAIS ENFREINDRE : un crochet qui n'est pas
// une fonction DOIT RESTER GRIS. `couleurFonction` déduit la couleur du `label`,
// et « souffle 1 » ne tombe dans aucun test — donc neutre. Si un groupe de
// souffle sortait en bleu, l'élève lirait « sujet » sur une respiration, et la
// couleur qui porte la fonction dans toute la matière serait cassée. Même
// raison pour « voix 1 », « on annonce », « lu d'un trait ».
//
// ⛔⛔ CE QUI SÉPARE CETTE FICHE DE CELLE DE 4e, ET QUE LES EN-TÊTES DES BANQUES
// FIXENT EXPLICITEMENT — les recouvrir ferait deux fois la même fiche :
//   • la 4e travaille les signes RARES (points de suspension, italique, incise
//     entre tirets) ; la 5e travaille les signes DE TOUS LES JOURS, ceux qu'un
//     élève voit à chaque ligne et n'entend jamais : la virgule, le deux-points,
//     le tiret de dialogue, le point, le point d'interrogation ;
//   • la 4e prépare les ACCIDENTS de la récitation ; la 5e apprend d'abord
//     COMMENT ON APPREND — par morceaux, à voix haute, en s'enregistrant, en
//     repartant du morceau d'avant, devant quelqu'un ;
//   • et la 5e a une QUATRIÈME micro que la 4e n'a pas.
//
// ⭐ CETTE QUATRIÈME MICRO EST UN GESTE D'ÉCOUTE, PAS DE LECTURE. « Repérer ce
// qui est à améliorer dans une lecture oralisée ou celle des autres » : on
// n'exécute plus, on DIAGNOSTIQUE. Le dessin devait donc montrer un défaut, pas
// un modèle — d'où le crochet qui enjambe deux points (« lu d'un seul trait ») :
// le défaut EST le crochet, et il se voit d'un coup d'œil. C'est la découverte
// propre à cette fiche, et elle resservira pour l'oral.
//
// Alignée sur les tables PREPARER, EXPRESSIVE et RECITER de
// lib/tutor-v4/questionBank/5e/francais/socle-lecture-culture.bank.ts et sur la
// table AMELIORER de lecture.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_voix_haute`) :
// - 5e_voix_preparer   → figure, propriétés 1 à 3, méthode 1, usage 1,
//                        exemples 1 et 2
// - 5e_voix_expressive → propriétés 4 à 6, formule, méthode 2, usage 2,
//                        exemples 3 et 4
// - 5e_voix_reciter    → propriété 7, méthode 3, exemple 5
// - 5e_voix_ameliorer  → propriétés 8 et 9, méthode 4, usage 3, exemple 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ;
// une étiquette de groupe ne se plie pas (trois mots au maximum) ; un mot par
// entrée, ponctuation comprise ; les blocs n'interprètent pas le markdown.

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

// ─── La partition : un texte annoté pour la voix ──────────────────────────────
// ⚠️ Les groupes ne sont plus des fonctions grammaticales : ce sont des GROUPES
// DE SOUFFLE, et la légende le redit chaque fois. Étiquettes en gris — voir
// l'en-tête.

// ── LA FIGURE DE RÉFÉRENCE : la même phrase, brute puis annotée.
const phraseNue = phrase({
  mots: [
    { texte: "Il" },
    { texte: "prit" },
    { texte: "son" },
    { texte: "sac" },
    { texte: "," },
    { texte: "ferma" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "," },
    { texte: "et" },
    { texte: "descendit" },
    { texte: "." },
  ],
  legende: "Le texte tel qu'il arrive. Lu ainsi, il sort d'un seul souffle.",
});

const phrasePreparee = phrase({
  mots: [
    { texte: "Il" },
    { texte: "prit", focus: true },
    { texte: "son" },
    { texte: "sac" },
    { texte: "," },
    { texte: "ferma", focus: true },
    { texte: "la" },
    { texte: "porte" },
    { texte: "," },
    { texte: "et" },
    { texte: "descendit", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "souffle 1" },
    { mots: [5, 8], label: "souffle 2" },
    { mots: [9, 11], label: "souffle 3" },
  ],
  legende: "Le même texte annoté : trois respirations, trois verbes détachés.",
});

// ── CE QU'ON FAIT AVANT, EN SILENCE.
const motInconnu = phrase({
  mots: [
    { texte: "Le" },
    { texte: "suzerain", focus: true },
    { texte: "reçut" },
    { texte: "l'hommage" },
    { texte: "." },
  ],
  legende: "On ne dit pas bien ce qu'on ne comprend pas : on cherche d'abord.",
});

const dialogueDeuxVoix = phrase({
  mots: [
    { texte: "—" },
    { texte: "Tu" },
    { texte: "viens" },
    { texte: "?" },
    { texte: "—" },
    { texte: "Je" },
    { texte: "ne" },
    { texte: "peux" },
    { texte: "pas" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "voix 1" },
    { mots: [4, 9], label: "voix 2" },
  ],
  legende: "On compte les personnages : il faut une voix différente pour chacun.",
});

const phraseQuiCourt = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva" },
    { texte: "sur" },
    { texte: "la" },
    { texte: "mer" },
    { texte: "immense" },
    { texte: ".", focus: true },
  ],
  groupes: [{ mots: [0, 8], label: "une seule phrase" }],
  legende: "En vers, le point n'est pas au bout de la ligne : la phrase continue.",
});

// ── CE QUE CHAQUE SIGNE DE TOUS LES JOURS COMMANDE À LA VOIX.
const signeVirgule = phrase({
  mots: [
    { texte: "La" },
    { texte: "salle" },
    { texte: "était" },
    { texte: "grande" },
    { texte: ",", focus: true },
    { texte: "froide" },
    { texte: ",", focus: true },
    { texte: "presque" },
    { texte: "vide" },
    { texte: "." },
  ],
  legende: "La virgule sépare sans finir : une courte pause, et la voix reste en l'air.",
});

const signePoint = phrase({
  mots: [
    { texte: "La" },
    { texte: "porte" },
    { texte: "se" },
    { texte: "referma" },
    { texte: "derrière" },
    { texte: "lui" },
    { texte: ".", focus: true },
  ],
  legende: "Le point ferme l'idée : la voix descend, et l'on s'arrête vraiment.",
});

const signeDeuxPoints = phrase({
  mots: [
    { texte: "Il" },
    { texte: "comprit" },
    { texte: ":", focus: true },
    { texte: "personne" },
    { texte: "ne" },
    { texte: "viendrait" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 6], label: "on annonce" }],
  legende: "Le deux-points ouvre sur une explication : on tient la voix, puis on donne.",
});

const signeInterrogation = phrase({
  mots: [
    { texte: "Faut-il" },
    { texte: "partir" },
    { texte: "avant" },
    { texte: "le" },
    { texte: "jour", focus: true },
    { texte: "?", focus: true },
  ],
  legende: "La question attend une réponse : la voix monte sur le dernier mot.",
});

const signeTiret = phrase({
  mots: [
    { texte: "—" },
    { texte: "Qui" },
    { texte: "va" },
    { texte: "là" },
    { texte: "?" },
    { texte: "demanda" },
    { texte: "le" },
    { texte: "gardien" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "le personnage" },
    { mots: [5, 8], label: "le narrateur" },
  ],
  legende: "Le tiret dit qu'un autre prend la parole : on change de voix, puis on revient.",
});

// ── APPRENDRE UN TEXTE : par morceaux, en repartant du morceau d'avant.
const chaineStrophes = phrase({
  mots: [
    { texte: "strophe 1" },
    { texte: "strophe 2" },
    { texte: "strophe 3", focus: true },
  ],
  liens: [{ de: 2, vers: 1, label: "je repars de", type: "reprise" }],
  legende: "On n'apprend pas la suite seule : on repart toujours du morceau d'avant.",
});

// ── ⭐ LE DÉFAUT EST LE CROCHET LUI-MÊME : on l'entend en le voyant.
const luDunTrait = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentra" },
    { texte: ".", focus: true },
    { texte: "Personne" },
    { texte: "ne" },
    { texte: "l'attendait" },
    { texte: ".", focus: true },
  ],
  groupes: [{ mots: [0, 6], label: "lu d'un trait" }],
  legende: "Le crochet enjambe deux points : c'est le défaut, et il se voit.",
});

const coupeFausse = phrase({
  mots: [
    { texte: "Il" },
    { texte: "prit" },
    { texte: "son" },
    { texte: "sac" },
    { texte: "," },
    { texte: "ferma" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 2], label: "coupe fausse" },
    { mots: [3, 8], label: "la suite" },
  ],
  legende: "Respirer entre « son » et « sac » casse le groupe : le sens tombe.",
});

const coupeJuste = phrase({
  mots: [
    { texte: "Il" },
    { texte: "prit" },
    { texte: "son" },
    { texte: "sac" },
    { texte: "," },
    { texte: "ferma" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "souffle 1" },
    { mots: [5, 8], label: "souffle 2" },
  ],
  legende: "On respire entre les groupes, à la virgule. Jamais à l'intérieur.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureVoixHaute5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "lecture-voix-haute",
  titre: "Lire à voix haute en 5e (2026-2027)",
  accroche:
    "Un élève qui lit mal n'a presque jamais un problème de voix : il a un texte qu'il n'a pas préparé. Lire à voix haute ne s'improvise pas plus qu'on ne joue un morceau à vue — cela s'annote, comme une partition. Où respirer, quel mot détacher, quand changer de voix : tout se décide avant, le crayon à la main.",
  identite: [
    { label: "Mots clés", valeur: "Souffle, ponctuation, voix, auditoire" },
    { label: "Le secret", valeur: "Annoter avant de lire, pas relire" },
    { label: "Outil", valeur: "La ponctuation commande, pas l'humeur" },
  ],
  definition: {
    texte:
      "Lire à voix haute, c'est faire entendre une compréhension. Le programme demande, en 5e, de lire « un texte d'une vingtaine de lignes avec aisance devant un auditoire » — et l'aisance ne vient pas du talent, elle vient de la PRÉPARATION. Cette préparation est matérielle : on cherche le sens des mots qu'on ne connait pas, on compte les personnages pour savoir combien de voix il faudra, on repère où les phrases finissent, on essaie à voix basse, et l'on regarde qui écoutera. Puis on ANNOTE : des groupes de souffle, des mots à détacher, des changements de voix. La PONCTUATION sert de mode d'emploi — chaque signe commande quelque chose. Enfin, écouter une lecture s'apprend aussi : repérer ce qui est à améliorer, ce n'est pas juger, c'est nommer un point précis, donc réparable.",
  },
  figure: {
    schema: pile(phraseNue, phrasePreparee),
    legende:
      "La même phrase, deux fois. En haut telle qu'elle arrive : lue ainsi, elle sort d'un seul souffle et les trois actions se confondent. En bas annotée : trois groupes de souffle marqués aux virgules, et les trois verbes en relief parce que ce sont eux qui font avancer. Les crochets ne marquent plus une fonction grammaticale — ils marquent une respiration. Même dessin, autre usage.",
  },
  proprietes: [
    {
      titre: "On ne dit pas bien ce qu'on ne comprend pas",
      texte:
        "Trois mots inconnus, un nom de lieu imprononçable : on cherche AVANT. Un mot deviné en lisant s'entend, et il arrête tout le monde.",
      schema: motInconnu,
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "On compte les voix",
      texte:
        "Un dialogue à trois personnages demande trois voix, plus celle du narrateur. Cela se décide avant, pas au moment où le tiret arrive.",
      schema: dialogueDeuxVoix,
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "On cherche où la phrase finit",
      texte:
        "En vers, le point n'est pas au bout de la ligne. Une seule phrase peut occuper six lignes : s'arrêter au retour à la ligne casse le sens.",
      schema: phraseQuiCourt,
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "La virgule sépare, le point ferme",
      texte:
        "La virgule : une courte pause, la voix reste en l'air. Le point : la voix descend, et l'on s'arrête vraiment. Ce sont deux gestes différents.",
      schema: pile(signeVirgule, signePoint),
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "Le deux-points annonce",
      texte:
        "Il ouvre sur une explication : on tient la voix un instant, on marque le silence, puis on donne ce qui suit. Il ne se lit pas comme une virgule.",
      schema: signeDeuxPoints,
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "La question monte, le tiret change de voix",
      texte:
        "Le point d'interrogation fait monter la voix sur le dernier mot. Le tiret dit qu'un autre parle : on change, puis on revient au narrateur.",
      schema: pile(signeInterrogation, signeTiret),
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "Un texte s'apprend par morceaux, en chainant",
      texte:
        "Un peu chaque jour, à voix haute et non dans sa tête, en repartant toujours du morceau d'avant — sinon on sait les strophes et l'on perd l'enchainement.",
      schema: chaineStrophes,
      micros: ["5e_voix_reciter"],
    },
    {
      titre: "Écouter, c'est nommer un point précis",
      texte:
        "Pas « c'était nul » : « il ne s'arrête à aucun point ». Un défaut nommé est un défaut réparable, et c'est tout ce qu'on demande.",
      schema: luDunTrait,
      micros: ["5e_voix_ameliorer"],
    },
    {
      titre: "On respire entre les groupes, jamais dedans",
      texte:
        "Reprendre son air au milieu d'un groupe de mots casse le sens plus surement qu'une hésitation. La virgule est faite pour cela.",
      schema: pile(coupeFausse, coupeJuste),
      micros: ["5e_voix_ameliorer"],
    },
  ],
  reel: {
    texte:
      "Tu liras à voix haute bien après le collège, et presque jamais de la littérature : un exposé, un compte rendu, un texte à une cérémonie, une consigne à une équipe, une histoire à un enfant qui ne sait pas encore lire. Chaque fois, la même chose se joue — celui qui écoute ne peut pas revenir en arrière. À l'écrit, un lecteur relit la phrase qu'il n'a pas comprise ; à l'oral, elle est passée. C'est pour cela que la préparation compte plus que la voix : ce n'est pas toi qu'on écoute, c'est le texte, et ton travail consiste à le rendre suivable du premier coup. Une lecture bien préparée par quelqu'un qui n'aime pas sa voix vaut mieux qu'une belle voix qui découvre le texte en le disant.",
  },
  historique: {
    texte:
      "Pendant très longtemps, lire a VOULU DIRE lire à voix haute — même seul. Les textes anciens s'écrivaient sans espaces entre les mots et presque sans ponctuation, et il fallait les prononcer pour les déchiffrer : la bouche faisait le travail que fait aujourd'hui l'œil. Saint Augustin raconte au IVe siècle sa stupeur devant Ambroise, qui lisait SANS remuer les lèvres — cela méritait d'être noté, tant c'était étrange. La lecture silencieuse ne s'est répandue qu'au Moyen Âge, avec les espaces entre les mots et la ponctuation, inventés justement pour s'en passer. Tout ce que tu annotes sur ta feuille — les groupes, les pauses, les montées de voix — c'est donc ce que la ponctuation faisait déjà : elle a été créée pour dire à la voix ce qu'elle devait faire.",
  },
  formule: {
    contexte: "Ce qui décide si une lecture à voix haute sera suivie ou perdue.",
    expression: "ce qui n'est pas marqué sur la feuille ne s'entendra pas",
    legende:
      "Une intention gardée dans la tête ne passe jamais dans la voix : au moment de lire, on est occupé à déchiffrer. Les groupes de souffle, les mots à détacher, les changements de voix se marquent au crayon — et c'est le crayon, pas le talent, qui fait la différence entre une lecture qu'on suit et une lecture qu'on subit.",
    schema: phrasePreparee,
  },
  methode: [
    {
      titre: "Préparer en cinq gestes, avant d'ouvrir la bouche",
      texte:
        "Chercher les mots inconnus, compter les voix, repérer où les phrases finissent, essayer à voix basse, regarder qui écoutera.",
      schema: motInconnu,
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "Lire la ponctuation comme une consigne",
      texte:
        "Virgule : petite pause. Point : la voix descend. Deux-points : on annonce. Point d'interrogation : on monte. Tiret : on change de voix.",
      schema: pile(signeVirgule, signeDeuxPoints),
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "Apprendre à voix haute, jamais dans sa tête",
      texte:
        "Reconnaitre un texte en le lisant n'est pas le savoir. Dis-le tout haut, enregistre-toi une fois : tu entends aussitôt ce que tu rates.",
      schema: chaineStrophes,
      micros: ["5e_voix_reciter"],
    },
    {
      titre: "Pour écouter : chercher ce qui empêche de suivre",
      texte:
        "Pas ce qui t'a déplu — ce qui t'a fait décrocher. Trop vite ? Aucune pause aux points ? Une seule voix pour le dialogue ? C'est cela qu'on nomme.",
      schema: luDunTrait,
      micros: ["5e_voix_ameliorer"],
    },
  ],
  usages: [
    {
      titre: "Pour lire devant la classe",
      detail:
        "Vingt lignes, trente personnes, et pas de seconde chance. La feuille annotée est ce qui reste quand le trac enlève tout le reste.",
      schema: phrasePreparee,
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "Pour faire entendre un dialogue",
      detail:
        "Deux voix, c'est le minimum : celle du personnage et celle du narrateur. Sans ce changement, l'auditoire ne sait plus qui parle.",
      schema: signeTiret,
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "Pour aider quelqu'un après sa lecture",
      detail:
        "Un point nommé se répare en une minute. « C'était bien » ou « c'était nul » ne se répare pas — cela ne dit rien à celui qui a lu.",
      schema: pile(coupeFausse, coupeJuste),
      micros: ["5e_voix_ameliorer"],
    },
  ],
  exemples: [
    {
      titre: "Ce qu'on fait avant",
      donnees: "Le passage est un dialogue entre trois personnages.",
      schema: dialogueDeuxVoix,
      question: "Que prépares-tu ?",
      solution:
        "Tu COMPTES LES PERSONNAGES : il faudra une voix différente pour chacun, plus celle du narrateur. Cela se décide au crayon, avant — on ne choisit pas une voix au moment où le tiret arrive, et un dialogue lu d'une seule voix devient incompréhensible au bout de trois répliques.",
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "Le piège du vers",
      donnees: "Le texte est en vers et aucune ligne ne finit par un point.",
      schema: phraseQuiCourt,
      question: "Que prépares-tu ?",
      solution:
        "Tu REPÈRES OÙ LA PHRASE FINIT : le point n'est pas au bout du vers. Marque les vraies fins de phrase au crayon, sinon tu t'arrêteras à chaque retour à la ligne — et le poème deviendra une liste. C'est l'erreur la plus fréquente sur un texte en vers.",
      micros: ["5e_voix_preparer"],
    },
    {
      titre: "Le signe qu'on n'entend jamais",
      donnees: "« Il comprit alors : personne ne viendrait le chercher. »",
      schema: signeDeuxPoints,
      question: "Que fait la voix au deux-points ?",
      solution:
        "Elle ANNONCE. On tient la voix, on marque un silence un peu plus long qu'à une virgule, puis on donne ce qui suit — parce que le deux-points ouvre sur une explication. Lu comme une virgule, il disparait, et la phrase perd son effet : la révélation devient une énumération.",
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "Deux signes, deux gestes",
      donnees: "« La salle était grande, froide, et presque vide. » puis « La porte se referma. »",
      schema: pile(signeVirgule, signePoint),
      question: "Qu'est-ce qui change entre la virgule et le point ?",
      solution:
        "La virgule SÉPARE SANS FINIR : courte pause, et la voix reste en l'air — on attend la suite. Le point FERME : la voix descend, et l'on s'arrête vraiment. Beaucoup de lectures ratées descendent la voix à chaque virgule ; l'auditoire croit alors que la phrase est finie, dix fois de suite.",
      micros: ["5e_voix_expressive"],
    },
    {
      titre: "Apprendre un poème",
      donnees: "Tu sais les deux premières strophes et pas la troisième.",
      schema: chaineStrophes,
      question: "Comment continues-tu ?",
      solution:
        "Tu apprends la suite EN REPARTANT DU MORCEAU D'AVANT. Apprendre la troisième strophe seule donne trois strophes qu'on sait séparément et qu'on ne sait pas enchainer — et c'est exactement là qu'on bloque le jour de la récitation. La liaison s'apprend, comme le texte.",
      micros: ["5e_voix_reciter"],
    },
    {
      titre: "Écouter quelqu'un lire",
      donnees: "Il lit sans jamais s'arrêter, même aux points.",
      schema: luDunTrait,
      question: "Que faut-il améliorer ?",
      solution:
        "PRENDRE EN COMPTE LA PONCTUATION : marquer les fins de phrase. Le dessin le montre — le crochet enjambe deux points, et c'est cela qu'on entend. Remarque la formulation : on nomme un geste à faire, pas un défaut de la personne. « Il lit mal » ne se répare pas ; « il ne s'arrête pas aux points » se répare au prochain essai.",
      micros: ["5e_voix_ameliorer"],
    },
  ],
  pieges: [
    "Croire qu'on peut lire à vue : un texte non préparé se lit d'un seul souffle, et rien ne s'entend.",
    "Descendre la voix à chaque virgule : l'auditoire croit que la phrase est finie, et se perd dix fois.",
    "S'arrêter au bout de chaque vers : en poésie, la phrase continue souvent à la ligne suivante.",
    "Respirer au milieu d'un groupe de mots : cela casse le sens plus surement qu'une hésitation.",
    "Apprendre un texte dans sa tête : reconnaitre un poème en le lisant n'est pas le savoir par cœur.",
    "Dire « c'était bien » ou « c'était nul » après une lecture : ce n'est pas un diagnostic, et cela n'aide personne.",
  ],
  aRetenir: [
    "Ce qui n'est pas marqué sur la feuille ne s'entendra pas : on annote avant de lire.",
    "Cinq gestes de préparation : les mots, les voix, les fins de phrase, l'essai, l'auditoire.",
    "La ponctuation est un mode d'emploi : virgule, point, deux-points, question, tiret.",
    "Un texte s'apprend par morceaux, à voix haute, en repartant du morceau d'avant.",
    "Écouter, c'est nommer UN point précis — donc réparable.",
  ],
  entrainement: [
    {
      question: "Trois mots du texte te sont totalement inconnus. Que fais-tu avant de lire ?",
      correction: "Tu cherches leur sens : on ne dit pas bien ce qu'on ne comprend pas.",
      micros: ["5e_voix_preparer"],
    },
    {
      question: "Tu as relu le texte trois fois des yeux et tu te sens prêt. Que fais-tu encore ?",
      correction: "Tu l'essaies à voix basse : l'oreille corrige ce que l'œil accepte.",
      micros: ["5e_voix_preparer"],
    },
    {
      question: "« Qui donc avait ouvert la fenêtre pendant la nuit ? » Que fait la voix ?",
      correction: "Elle monte sur le dernier mot : la question attend une réponse.",
      micros: ["5e_voix_expressive"],
    },
    {
      question: "« — Tu viens ? — Je ne peux pas. » Que fait la voix aux tirets ?",
      correction: "Elle change : le tiret dit qu'un autre personnage prend la parole.",
      micros: ["5e_voix_expressive"],
    },
    {
      question: "Tu ne sais pas si tu vas trop vite ni si ton ton est juste. Que fais-tu ?",
      correction: "Tu t'enregistres et tu réécoutes : tu entends ce que tu rates.",
      micros: ["5e_voix_reciter"],
    },
    {
      question: "Le dialogue est lu de la même voix que le récit. Que faut-il améliorer ?",
      correction: "Changer de voix quand un personnage parle — sinon on ne sait plus qui parle.",
      micros: ["5e_voix_ameliorer"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesLectureVoixHaute5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire à voix haute - 5e",
    section: {
      type: "objectif",
      phrase: "Un texte pour la voix, ça s'annote",
      sousPhrase:
        "Comme une partition. Ce qui n'est pas marqué sur la feuille ne s'entendra pas.",
      encadre: {
        titre: "L'idée",
        texte: "Celui qui lit mal n'a pas un problème de voix : il a un texte non préparé.",
      },
    },
  },
  {
    titre: "Les cinq gestes d'avant",
    badge: "Lire à voix haute - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je cherche les mots que je ne comprends pas.",
        "Je compte les personnages : une voix par personne, plus le narrateur.",
        "Je repère où les phrases finissent — en vers, ce n'est pas au bout de la ligne.",
        "J'essaie à voix basse, puis je regarde qui va m'écouter.",
      ],
    },
    schema: pile(motInconnu, dialogueDeuxVoix),
  },
  {
    titre: "La ponctuation est un mode d'emploi",
    badge: "Lire à voix haute - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La virgule", texte: "Courte pause. La voix reste en l'air : ce n'est pas fini." },
        { titre: "Le point", texte: "La voix descend, et l'on s'arrête vraiment." },
        { titre: "Le deux-points", texte: "On annonce : un silence, puis on donne la suite." },
        { titre: "Le tiret", texte: "Un autre parle : on change de voix, puis on revient." },
      ],
    },
    schema: pile(signeVirgule, signeDeuxPoints),
  },
  {
    titre: "Où l'on respire",
    badge: "Lire à voix haute - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Coupe fausse",
        contenu: "Reprendre son air entre « son » et « sac » : le groupe se casse, le sens tombe.",
      },
      droite: {
        titre: "Coupe juste",
        contenu: "On respire à la virgule, entre les groupes. Jamais à l'intérieur.",
      },
    },
    schema: pile(coupeFausse, coupeJuste),
  },
  {
    titre: "Écouter une lecture",
    badge: "Lire à voix haute - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Je ne cherche pas ce qui m'a déplu : je cherche ce qui m'a fait décrocher.",
        "Trop vite ? Aucune pause aux points ? Une seule voix pour tout le dialogue ?",
        "Je nomme UN point précis, et un geste à faire.",
        "« Il lit mal » ne se répare pas. « Il ne s'arrête pas aux points » se répare tout de suite.",
      ],
    },
    schema: luDunTrait,
  },
  {
    titre: "À vous",
    badge: "Lire à voix haute - 5e",
    section: {
      type: "exercice",
      enonce: "« Il prit son sac, ferma la porte, et descendit l'escalier. »",
      question: "Prépare cette phrase : où respires-tu, et quels mots détaches-tu ?",
      indice: "Les virgules donnent les respirations. Cherche ensuite ce qui fait avancer.",
      correction:
        "Trois groupes de souffle, marqués aux deux virgules. Et les trois verbes — prit, ferma, descendit — se détachent, parce que ce sont eux qui font avancer. Sans cela, la phrase sort d'un trait et les trois actions se confondent.",
    },
    schema: phrasePreparee,
  },
];
