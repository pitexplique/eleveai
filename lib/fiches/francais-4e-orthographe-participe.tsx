// ─── Fiche de cours : l'accord du participe passé (4e) ────────────────────────
// LA DEUXIÈME FICHE DE FRANÇAIS DE LA 4e, et celle qui vise le point où les
// élèves perdent le plus de points à l'écrit.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. ⛔ La 5e a sa propre fiche du
// participe passé, sur le BO du 5 mars 2026 : les deux textes ne demandent pas
// les mêmes cas, et la 4e n'y bascule qu'en septembre 2027.
//
// ⭐ CE QUE LA 4e AJOUTE À LA 5e : le participe passé APPOSÉ, qui n'a pas
// d'auxiliaire du tout, et les VERBES PRONOMINAUX, où « se » est tantôt COD
// tantôt COI. Le programme nomme les deux.
//
// ⚠️ `4e_conj_pronominaux` A CHANGÉ DE NOTION LE 25/08/2026, le matin même où
// cette fiche s'écrit. Elle vivait sous « Les temps et les modes à construire »
// alors que ses quatorze cas sont de l'accord pur. Elle est maintenant dans
// `orthographe_participe`, avec les deux autres : c'est ce qui permet à cette
// fiche de couvrir une notion entière sans déborder.
//
// ⭐ LE TITRE PORTE L'ANNÉE, et le mot « français » est dans la description de
// la page : la requête tapée est « participe passé 4e 2026 2027 ».
// ⚠️ Le titre nomme aussi le PDF : le changer rend l'ancien orphelin.
//
// Alignée sur les tables PARTICIPE et APPOSE de
// lib/tutor-v4/questionBank/4e/francais/orthographe-grammaticale.bank.ts et sur
// la table PRONOMINAUX de
// lib/tutor-v4/questionBank/4e/francais/conjugaison.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion) :
// - 4e_orth_participe_etre_avoir → définition, figure, propriétés 1 à 3,
//                                  formule, méthodes 1 à 3, exemples 1 à 4
// - 4e_orth_participe_appose     → propriété 4, méthode 4, exemple 5
// - 4e_conj_pronominaux          → propriétés 5 et 6, méthode 5, exemples 6 et 7
//
// ⛔ TROIS PIÈGES DE FABRICATION, payés sur la fiche de la phrase complexe et
// écrits ici pour ne pas les repayer :
//   • `role` n'existe pas sur un mot — la couleur se déduit du `label` du GROUPE ;
//   • ⛔⛔ AUCUN `titre` SUR UN DESSIN : il ne se plie pas à `largeurMax`, il
//     élargit la boite, et tout le dessin rapetisse dans son bloc de 226 px
//     (mesuré : 5,6 px de police au lieu de 12) ;
//   • `deplacable` redessine le groupe entier en fantôme : sur un groupe long,
//     l'étiquette sort du cadre.

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
// ⚠️ Un mot par entrée, ponctuation comprise. La couleur vient du `label` du
// groupe, jamais d'ici. L'arc noir « accord » va du mot qui COMMANDE vers le
// mot qui S'ACCORDE : c'est tout le contenu de la fiche en un trait.

// ── ÊTRE : l'accord se fait avec le sujet, toujours.
const participeEtre = phrase({
  mots: [
    { texte: "Elles" },
    { texte: "sont" },
    { texte: "parties", focus: true },
    { texte: "avant" },
    { texte: "l'aube" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 2], label: "verbe" },
  ],
  liens: [{ de: 0, vers: 2, label: "commande", type: "accord" }],
  legende: "Auxiliaire ÊTRE : le sujet commande. « Elles » → parties.",
});

// ── AVOIR, COD après : rien ne bouge.
const participeAvoirApres = phrase({
  mots: [
    { texte: "J'" },
    { texte: "ai" },
    { texte: "écrit", focus: true },
    { texte: "trois" },
    { texte: "lettres" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 2], label: "verbe" },
    { mots: [3, 4], label: "objet" },
  ],
  legende: "Auxiliaire AVOIR, COD APRÈS le verbe : aucun accord.",
});

// ── AVOIR, COD avant : le participe s'accorde avec lui.
const participeAvoirAvant = phrase({
  mots: [
    { texte: "Les" },
    { texte: "lettres" },
    { texte: "que", focus: true },
    { texte: "j'" },
    { texte: "ai" },
    { texte: "écrites", focus: true },
    { texte: "sont" },
    { texte: "parties" },
    { texte: "." },
  ],
  groupes: [
    { mots: [2, 2], label: "objet" },
    { mots: [4, 5], label: "verbe" },
  ],
  liens: [
    { de: 2, vers: 1, label: "reprend", type: "reprise" },
    { de: 2, vers: 5, label: "commande", type: "accord" },
  ],
  legende: "« Que » reprend « les lettres » et il est DEVANT : on accorde.",
});

// ── Les trois façons dont un COD passe devant : le pronom, le relatif, la
//    question. Ce sont les seules — et c'est ce qui rend la règle utilisable.
const participeCodPronom = phrase({
  mots: [
    { texte: "Les" },
    { texte: "clés" },
    { texte: "," },
    { texte: "je" },
    { texte: "les", focus: true },
    { texte: "ai" },
    { texte: "retrouvées", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [4, 4], label: "objet" },
    { mots: [5, 6], label: "verbe" },
  ],
  liens: [
    { de: 4, vers: 1, label: "reprend", type: "reprise" },
    { de: 4, vers: 6, label: "commande", type: "accord" },
  ],
  legende: "Le pronom « les » est un COD placé devant : on accorde.",
});

const participeCodQuestion = phrase({
  mots: [
    { texte: "Combien" },
    { texte: "de" },
    { texte: "pages", focus: true },
    { texte: "as-tu" },
    { texte: "lues", focus: true },
    { texte: "ce" },
    { texte: "soir" },
    { texte: "?" },
  ],
  groupes: [
    { mots: [0, 2], label: "objet" },
    { mots: [3, 4], label: "verbe" },
  ],
  liens: [{ de: 2, vers: 4, label: "commande", type: "accord" }],
  legende: "La question met le COD en tête : il est devant, donc on accorde.",
});

const participeQuestionApres = phrase({
  mots: [
    { texte: "Tu" },
    { texte: "as" },
    { texte: "lu", focus: true },
    { texte: "combien" },
    { texte: "de" },
    { texte: "pages" },
    { texte: "?" },
  ],
  groupes: [
    { mots: [1, 2], label: "verbe" },
    { mots: [3, 5], label: "objet" },
  ],
  legende: "Même question, COD derrière : aucun accord. C'est la PLACE qui décide.",
});

// ── APPOSÉ : aucun auxiliaire, et pourtant il s'accorde.
const participeApposeTete = phrase({
  mots: [
    { texte: "Épuisée", focus: true },
    { texte: "de" },
    { texte: "fatigue" },
    { texte: "," },
    { texte: "elle" },
    { texte: "s'assit" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 2], label: "apposition" },
    { mots: [4, 4], label: "sujet" },
  ],
  liens: [{ de: 4, vers: 0, label: "commande", type: "accord" }],
  legende: "Aucun auxiliaire : le participe se rapporte au sujet qui suit.",
});

const participeApposeVirgules = phrase({
  mots: [
    { texte: "Les" },
    { texte: "barques" },
    { texte: "," },
    { texte: "rentrées", focus: true },
    { texte: "au" },
    { texte: "port" },
    { texte: "," },
    { texte: "attendaient" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 5], label: "apposition" },
  ],
  liens: [{ de: 1, vers: 3, label: "commande", type: "accord" }],
  legende: "Entre deux virgules, il se rapporte au nom qu'il suit.",
});

// ── PRONOMINAUX : tout se joue sur la nature de « se ».
const pronominalCod = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "s'", focus: true },
    { texte: "est" },
    { texte: "levée", focus: true },
    { texte: "à" },
    { texte: "l'aube" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "objet" },
  ],
  liens: [{ de: 1, vers: 3, label: "commande", type: "accord" }],
  legende: "Elle a levé QUI ? elle-même. « Se » est COD, devant : on accorde.",
});

const pronominalCodApres = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "s'" },
    { texte: "est" },
    { texte: "lavé", focus: true },
    { texte: "les" },
    { texte: "mains" },
    { texte: "." },
  ],
  groupes: [
    { mots: [1, 1], label: "complément second" },
    { mots: [4, 5], label: "objet" },
  ],
  legende: "Le COD est « les mains », APRÈS : pas d'accord, malgré le « s' ».",
});

const pronominalCoi = phrase({
  mots: [
    { texte: "Elles" },
    { texte: "se", focus: true },
    { texte: "sont" },
    { texte: "parlé", focus: true },
    { texte: "longtemps" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 1], label: "complément indirect" }],
  legende: "On parle À quelqu'un : « se » est COI, et un COI n'accorde jamais.",
});

const pronominalEssentiel = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "s'" },
    { texte: "est" },
    { texte: "aperçue", focus: true },
    { texte: "de" },
    { texte: "son" },
    { texte: "erreur" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  liens: [{ de: 0, vers: 3, label: "commande", type: "accord" }],
  legende: "« S'apercevoir » n'existe pas sans « se » : accord avec le sujet.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheParticipe4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "orthographe-participe",
  titre: "L'accord du participe passé en 4e (2026-2027)",
  accroche:
    "« Tu m'as parlé » ne s'accorde pas. « Tu m'as appelée » s'accorde. Le même auxiliaire, le même « m' » devant le verbe — et pourtant l'un prend un e et l'autre non. Toute la règle tient dans une question : ce « m' », est-il l'objet du verbe, ou seulement celui à qui l'on parle ?",
  identite: [
    { label: "Mots clés", valeur: "Auxiliaire, COD, sujet, apposition, pronominal" },
    { label: "Le secret", valeur: "Quel auxiliaire ? puis où est le COD ?" },
    { label: "Outil", valeur: "Poser la question « qui ? quoi ? » après le verbe" },
  ],
  definition: {
    texte:
      "Le participe passé s'accorde, mais pas toujours avec le même mot, et c'est l'AUXILIAIRE qui décide. Avec être, il s'accorde avec le sujet. Avec avoir, il ne s'accorde qu'avec le complément d'objet direct, et seulement si ce COD est placé AVANT le verbe. Sans aucun auxiliaire, le participe apposé se rapporte au nom ou au pronom qu'il accompagne. Et dans un verbe pronominal, tout dépend de ce qu'est « se » : complément d'objet direct, il commande l'accord ; complément d'objet indirect, il ne commande rien.",
  },
  figure: {
    schema: pile(participeEtre, participeAvoirApres, participeAvoirAvant),
    legende:
      "Les trois cas fondamentaux, l'un sous l'autre. Le sujet est bleu, l'objet vert, le verbe rouge — les mêmes couleurs que dans toutes les fiches de français. L'arc noir part du mot qui COMMANDE l'accord : le sujet avec être, le COD placé devant avec avoir. Quand aucun arc ne part, rien ne s'accorde.",
  },
  proprietes: [
    {
      titre: "Avec ÊTRE : le sujet, et rien d'autre",
      texte:
        "« Elles sont parties », « Les portes ont été repeintes » : le passif emploie aussi l'auxiliaire être, donc la même règle s'applique.",
      schema: participeEtre,
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Avec AVOIR : on cherche le COD, et surtout SA PLACE",
      texte:
        "« J'ai écrit trois lettres » ne s'accorde pas ; « Les lettres que j'ai écrites » s'accorde. Le COD est le même — seule sa place a changé.",
      schema: pile(participeAvoirApres, participeAvoirAvant),
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Un COD ne passe devant que de trois façons",
      texte:
        "Un pronom personnel (« je LES ai retrouvées »), le relatif « que », ou une question qui commence par le COD. Il n'y en a pas d'autres.",
      schema: pile(participeCodPronom, participeCodQuestion),
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "La place, ce n'est pas le sens",
      texte:
        "« Combien de pages as-tu lues ? » et « Tu as lu combien de pages ? » disent exactement la même chose. Seule la place du COD change — et elle décide.",
      schema: pile(participeCodQuestion, participeQuestionApres),
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Sans auxiliaire : le participe apposé",
      texte:
        "Détaché en tête ou encadré de virgules, il se comporte comme un adjectif : il se rapporte au nom ou au pronom, et il s'accorde avec lui.",
      schema: pile(participeApposeTete, participeApposeVirgules),
      micros: ["4e_orth_participe_appose"],
    },
    {
      titre: "Pronominal : « se » est-il COD ou COI ?",
      texte:
        "« Elle s'est lavée » : elle a lavé elle-même, « se » est COD, on accorde. « Elle s'est lavé les mains » : le COD est « les mains », et il est derrière.",
      schema: pile(pronominalCod, pronominalCodApres, pronominalCoi),
      micros: ["4e_conj_pronominaux"],
    },
    {
      titre: "Les verbes qui n'existent pas sans « se »",
      texte:
        "« S'apercevoir de », « se souvenir de », « s'enfuir » : on ne peut pas les employer sans le pronom. Ceux-là s'accordent toujours avec le sujet.",
      schema: pronominalEssentiel,
      micros: ["4e_conj_pronominaux"],
    },
  ],
  reel: {
    texte:
      "C'est la faute qui se voit le plus vite dans un écrit d'adulte, et c'est pour cela qu'elle compte. Une lettre de motivation qui porte « les compétences que j'ai acquis » perd sa crédibilité en une ligne, alors que la phrase est parfaitement claire. Un message professionnel, un compte rendu, une candidature : partout où l'on est lu par quelqu'un qui ne vous connait pas, le participe passé sert de signal. Ce n'est pas juste — un accord n'a jamais rendu personne plus compétent — mais c'est ainsi, et le savoir fait partie du métier d'élève.",
  },
  historique: {
    texte:
      "La règle du COD placé avant vient d'un poète : Clément Marot la formule vers 1538, en imitant l'italien, dans une épigramme adressée « aux disciples d'amour ». Elle n'était alors qu'une élégance parmi d'autres — au XVIe siècle, on accordait à peu près comme on voulait. C'est l'Académie française qui l'a rendue obligatoire au XVIIe, et elle n'a plus bougé depuis, malgré des demandes régulières de simplification : en 1900 déjà, un arrêté ministériel proposait de tolérer l'invariabilité, et il fut retiré sous la pression. La Belgique francophone recommande officiellement cette tolérance depuis 2018. La règle que tu apprends est donc une décision, prise par des gens, qui aurait pu être autre.",
  },
  formule: {
    contexte: "Les deux questions à poser, toujours dans cet ordre.",
    expression: "quel auxiliaire ? — puis : le COD est-il devant ?",
    legende:
      "ÊTRE : on s'arrête là, c'est le sujet. AVOIR : on pose « qui ? » ou « quoi ? » après le verbe. Si la réponse est déjà passée devant, on accorde avec elle. Si elle vient après, ou s'il n'y a pas de réponse, rien ne bouge.",
    schema: participeAvoirAvant,
  },
  methode: [
    {
      titre: "Repérer l'auxiliaire",
      texte:
        "Être ou avoir ? Avec être — passif compris —, tu accordes avec le sujet et tu as fini.",
      schema: participeEtre,
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Avec avoir : poser la question après le verbe",
      texte:
        "« J'ai écrit QUOI ? » Si aucune réponse ne vient, il n'y a pas de COD : rien ne s'accorde, jamais.",
      schema: participeAvoirApres,
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Regarder où se trouve la réponse",
      texte:
        "Elle est déjà passée avant le verbe — pronom, « que », ou question ? On accorde avec elle. Elle vient après ? On ne touche à rien.",
      schema: pile(participeAvoirAvant, participeAvoirApres),
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Pas d'auxiliaire : chercher le nom qu'il accompagne",
      texte:
        "Le participe apposé fonctionne comme un adjectif. Demande-toi de qui ou de quoi il parle, et accorde avec ce mot-là.",
      schema: participeApposeTete,
      micros: ["4e_orth_participe_appose"],
    },
    {
      titre: "Pronominal : remplacer « se » par la question",
      texte:
        "« Elle a lavé QUI ? » elle-même → « se » est COD, on accorde. « Elle a parlé À QUI ? » → « se » est COI, on n'accorde pas. Et si le verbe n'existe pas sans « se », on accorde avec le sujet.",
      schema: pile(pronominalCod, pronominalCoi),
      micros: ["4e_conj_pronominaux"],
    },
  ],
  usages: [
    {
      titre: "Pour se relire : chercher les « que » et les pronoms",
      detail:
        "Ce sont eux qui font passer un COD devant. Un « que » ou un « les » juste avant un participe, et il faut s'arrêter pour vérifier.",
      schema: participeCodPronom,
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Pour écrire : l'apposition évite une relative de plus",
      detail:
        "« Les barques, rentrées au port, attendaient » dit en trois mots ce que « qui étaient rentrées au port » dit en cinq.",
      schema: participeApposeVirgules,
      micros: ["4e_orth_participe_appose"],
    },
    {
      titre: "Pour ne pas surcorriger",
      detail:
        "Un « s' » devant le verbe ne suffit pas : « elle s'est lavé les mains » ne prend rien. Beaucoup d'erreurs viennent d'un accord ajouté par excès de zèle.",
      schema: pronominalCodApres,
      micros: ["4e_conj_pronominaux"],
    },
  ],
  exemples: [
    {
      titre: "Avec être",
      donnees: "« Les élèves sont ___ en avance ce matin. » (rentrer)",
      schema: participeEtre,
      question: "Comment s'écrit le participe passé ?",
      solution:
        "L'auxiliaire est ÊTRE, donc on accorde avec le sujet « les élèves », masculin pluriel : « rentrés ». Avec être, on ne cherche jamais de COD.",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Avec avoir, COD derrière",
      donnees: "« J'ai ___ trois lettres hier soir. » (écrire)",
      schema: participeAvoirApres,
      question: "Le participe s'accorde-t-il ?",
      solution:
        "« J'ai écrit QUOI ? » → « trois lettres ». Le COD existe, mais il est placé APRÈS le verbe : aucun accord. On écrit « écrit ».",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Avec avoir, COD devant",
      donnees: "« Les lettres que j'ai ___ sont parties hier. » (écrire)",
      schema: participeAvoirAvant,
      question: "Le participe s'accorde-t-il, et avec quoi ?",
      solution:
        "« J'ai écrit QUOI ? » → « que », qui reprend « les lettres ». Le COD est placé AVANT le verbe : on accorde avec lui, au féminin pluriel. On écrit « écrites ».",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "La même phrase, dans les deux sens",
      donnees: "« Combien de pages as-tu lues ? » / « Tu as lu combien de pages ? »",
      schema: pile(participeCodQuestion, participeQuestionApres),
      question: "Pourquoi l'une s'accorde-t-elle et pas l'autre ?",
      solution:
        "Le COD est « combien de pages » dans les deux cas, et le sens est identique. Mais dans la première, la question l'a fait passer devant le verbe : on accorde. Dans la seconde, il est resté derrière : on n'accorde pas. Seule la PLACE compte.",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      titre: "Sans auxiliaire",
      donnees: "« ___ de fatigue, elle s'assit sur le muret. » (épuiser)",
      schema: participeApposeTete,
      question: "Avec quoi le participe s'accorde-t-il ?",
      solution:
        "Il n'y a aucun auxiliaire : c'est un participe apposé, détaché en tête. Il se rapporte au sujet qui suit, « elle », féminin singulier. On écrit « Épuisée ».",
      micros: ["4e_orth_participe_appose"],
    },
    {
      titre: "Pronominal : « se » est COD",
      donnees: "« Elle s'est ___ à l'aube. » (lever)",
      schema: pronominalCod,
      question: "Le participe s'accorde-t-il ?",
      solution:
        "« Elle a levé QUI ? » → « s' », c'est-à-dire elle-même. « Se » est complément d'objet direct, et il est placé devant : on accorde au féminin singulier. On écrit « levée ».",
      micros: ["4e_conj_pronominaux"],
    },
    {
      titre: "Pronominal : le COD est ailleurs",
      donnees: "« Elle s'est ___ les mains. » (laver)",
      schema: pronominalCodApres,
      question: "Le participe s'accorde-t-il, malgré le « s' » ?",
      solution:
        "« Elle a lavé QUOI ? » → « les mains », et non « s' ». Le COD est donc placé APRÈS le verbe : aucun accord. On écrit « lavé ». Le « s' » n'est ici qu'un complément second — c'est le piège le plus fréquent de toute la règle.",
      micros: ["4e_conj_pronominaux"],
    },
  ],
  pieges: [
    "Accorder avec le sujet quand l'auxiliaire est AVOIR : « elles ont mangé » ne prend rien, même au féminin pluriel.",
    "Oublier que le passif emploie l'auxiliaire être : « les portes ont été repeintes » s'accorde avec le sujet.",
    "Croire qu'un COD suffit : il faut qu'il soit DEVANT. « J'ai écrit trois lettres » n'accorde pas.",
    "Accorder après un « en » : « des mangues, j'en ai cueilli » reste invariable — « en » n'est pas un COD ordinaire.",
    "Voir un « s' » et accorder par réflexe : « elle s'est lavé les mains » ne prend rien, parce que le COD est derrière.",
    "Accorder avec un COI : on parle À quelqu'un, on écrit À quelqu'un, on téléphone À quelqu'un. « Elles se sont parlé » ne prend rien.",
  ],
  aRetenir: [
    "L'auxiliaire décide : ÊTRE → le sujet ; AVOIR → le COD, et seulement s'il est devant.",
    "Un COD ne passe devant que de trois façons : un pronom, le relatif « que », ou une question.",
    "Sans auxiliaire, le participe apposé se rapporte au nom qu'il accompagne, comme un adjectif.",
    "Pronominal : « se » est COD → on accorde ; « se » est COI → on n'accorde pas.",
    "Les verbes qui n'existent pas sans « se » s'accordent toujours avec le sujet.",
  ],
  entrainement: [
    {
      question: "« Les fleurs que tu as ___ ont fané. » (cueillir)",
      correction: "cueillies — le COD « que » reprend « les fleurs » et il est devant le verbe.",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      question: "« Tu as ___ des fleurs pour la table. » (cueillir)",
      correction: "cueilli — le COD « des fleurs » est placé après : aucun accord.",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      question: "« Les portes ont été ___ pendant les vacances. » (repeindre)",
      correction: "repeintes — forme passive, donc auxiliaire être : on accorde avec le sujet.",
      micros: ["4e_orth_participe_etre_avoir"],
    },
    {
      question: "« Les volets, ___ par le vent, claquaient sans arrêt. » (ouvrir)",
      correction: "ouverts — participe apposé, il se rapporte à « les volets ».",
      micros: ["4e_orth_participe_appose"],
    },
    {
      question: "« Elles se sont ___ pendant des heures. » (parler)",
      correction: "parlé — on parle À quelqu'un : « se » est COI, et un COI ne commande jamais l'accord.",
      micros: ["4e_conj_pronominaux"],
    },
    {
      question: "« Nous nous sommes ___ de toi tout l'été. » (souvenir)",
      correction: "souvenus — « se souvenir » n'existe pas sans « se » : accord avec le sujet.",
      micros: ["4e_conj_pronominaux"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesParticipe4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le participe passé - 4e",
    section: {
      type: "objectif",
      phrase: "Savoir avec quoi le participe passé s'accorde",
      sousPhrase:
        "Avec le sujet, avec le complément d'objet, ou avec rien du tout — et c'est l'auxiliaire qui décide.",
      encadre: {
        titre: "L'idée",
        texte: "« Tu m'as parlé » ne s'accorde pas. « Tu m'as appelée » s'accorde. Le « m' » n'a pas la même fonction.",
      },
    },
  },
  {
    titre: "Deux questions, dans cet ordre",
    badge: "Le participe passé - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Quel auxiliaire ? ÊTRE : j'accorde avec le sujet, et j'ai fini.",
        "AVOIR : je pose « qui ? » ou « quoi ? » juste après le verbe.",
        "Aucune réponse ? Pas de COD, donc aucun accord.",
        "Une réponse déjà passée DEVANT le verbe ? J'accorde avec elle.",
        "Une réponse APRÈS le verbe ? Je ne touche à rien.",
      ],
    },
    schema: pile(participeAvoirAvant, participeAvoirApres),
  },
  {
    titre: "La place, pas le sens",
    badge: "Le participe passé - 4e",
    section: {
      type: "duo",
      gauche: {
        titre: "« Combien de pages as-tu lues ? »",
        contenu: "Le COD est passé devant : on accorde.",
      },
      droite: {
        titre: "« Tu as lu combien de pages ? »",
        contenu: "Le COD est resté derrière : rien ne bouge.",
      },
    },
    schema: pile(participeCodQuestion, participeQuestionApres),
  },
  {
    titre: "Sans aucun auxiliaire",
    badge: "Le participe passé - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Détaché en tête", texte: "« Épuisée de fatigue, elle s'assit. » Il se rapporte au sujet qui suit." },
        { titre: "Entre deux virgules", texte: "« Les barques, rentrées au port, attendaient. » Il se rapporte au nom qu'il suit." },
        { titre: "Comme un adjectif", texte: "Cherche de qui ou de quoi il parle, et accorde avec ce mot-là." },
      ],
    },
    schema: pile(participeApposeTete, participeApposeVirgules),
  },
  {
    titre: "Les pronominaux : que fait « se » ?",
    badge: "Le participe passé - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "« se » est COD", texte: "« Elle s'est levée. » Elle a levé QUI ? elle-même. On accorde." },
        { titre: "Le COD est ailleurs", texte: "« Elle s'est lavé les mains. » Le COD est derrière : rien." },
        { titre: "« se » est COI", texte: "« Elles se sont parlé. » On parle À quelqu'un : rien." },
        { titre: "Sans « se », le verbe n'existe pas", texte: "« Elle s'est aperçue. » Accord avec le sujet." },
      ],
    },
    schema: pile(pronominalCod, pronominalCodApres, pronominalCoi),
  },
  {
    titre: "À vous",
    badge: "Le participe passé - 4e",
    section: {
      type: "exercice",
      enonce: "« Les clés, je les ai ___ sous le paillasson. » (retrouver)",
      question: "Le participe s'accorde-t-il, et avec quoi ?",
      indice: "Pose la question « j'ai retrouvé QUOI ? » et regarde où est la réponse.",
      correction:
        "« J'ai retrouvé QUOI ? » → « les », qui reprend « les clés ». C'est un pronom COD, et il est placé devant le verbe : on accorde au féminin pluriel. On écrit « retrouvées ».",
    },
    schema: participeCodPronom,
  },
];
