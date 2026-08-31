// ─── Fiche de cours : dire, présenter et participer à des échanges (CM2) ──────
// TREIZIÈME FICHE DU CHANTIER CM2, et DERNIÈRE DU DOMAINE DE L'ORAL.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « DIRE POUR ÊTRE
// COMPRIS DANS TOUTES LES DISCIPLINES » · « PARTICIPER À DES ÉCHANGES VERBAUX ».
//
// ⛔⛔ CETTE NOTION EN FOND DEUX. La 6e sépare `oral_dire` (parler SEUL :
// présenter, jouer, réfléchir à voix haute) et `oral_echanger` (parler AVEC :
// codes, argumenter, interagir, regard critique). Le CM2 met tout dans
// `oral_echanger` — d'où deux notions d'oral au CM2 contre trois en 6e.
//
//   | 6e (deux notions) | CM2 (ici, une seule) |
//   |---|---|
//   | `oral_dire` : présenter, JOUER un texte, réfléchir à voix haute | présenter avec un VOCABULAIRE PRÉCIS |
//   | `oral_echanger` : codes, interagir, REGARD CRITIQUE sur l'oral produit | argumenter par PREUVE OU EXEMPLE, débat réglé |
//
// ⭐⭐ ET LA FUSION N'EST PAS UN RACCOURCI : LA CHAÎNE DE PRÉREQUIS DIT POURQUOI.
// `presenter` → `argumenter` → `debat`. ARGUMENTER EST LA CHARNIÈRE, et c'est le
// SEUL GESTE QUI VAUT DES DEUX CÔTÉS : celui qui présente doit justifier, celui
// qui débat aussi. Sans lui, un exposé n'est qu'un RÉCIT de ce qu'on a fait, et
// un débat n'est qu'une SUITE D'AVIS PLUS FORTS. C'est ce geste commun qui
// autorise le CM2 à ranger parler-seul et parler-avec dans une même compétence.
//
// ⭐⭐ D'OÙ LA MESURE, ET ELLE SE COMPTE SANS JUGER DE RIEN : UN AVIS SANS
// « PARCE QUE » N'EST PAS UN ARGUMENT — c'est un gout. Le pool le répète trois
// fois : « un avis AVEC UNE RAISON », « un bon argument est UNE RAISON qui
// explique son idée », « dire ce qu'on pense ET POURQUOI ». Et le micro du CM2
// va plus loin que la raison seule : PREUVE OU EXEMPLE.
//
// ⭐ TROISIÈME EXIGENCE, DANS LE LIBELLÉ DE `cm2_oral_presenter` : UN VOCABULAIRE
// PRÉCIS. C'est le pendant oral de ce que `ecriture_produire` demande à la
// description (« grand et noir » plutôt que « impressionnant ») — au CM2, le mot
// juste n'est pas une élégance, il fait gagner du temps à celui qui écoute.
//
// ⛔ CE QUE CETTE FICHE NE REDIT PAS : le bâton de parole sert déjà de bloc
// d'histoire à `francais-6e-oral-echanger`, et l'oral réflexif (Kleist) à
// `francais-6e-oral-dire`. Ni l'un ni l'autre ne sont repris ici.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
// ⚠️ Le CM2 n'a AUCUN item fixe d'oral : le pool fait seul autorité.
//
// Micro-compétences couvertes (les 4 de la notion `oral_echanger`) :
// - cm2_oral_presenter   → propriétés 1 à 3, méthode 1, usage 1, exemples 1 et 2
// - cm2_oral_argumenter  → figure, propriétés 4 à 6, formule, méthode 2,
//                          usages 2 et 3, exemples 3 et 4
// - cm2_oral_debat       → propriétés 7 à 9, méthodes 3 et 4, exemple 5
// - cm2_oral_defi        → propriété 10, usage 4, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
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

/** Ce qui appuie un argument. ⚠️ Cellules courtes : à la largeur d'un bloc,
 *  vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on prend la parole ───────────────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : la charnière qui tient les deux moitiés.
const charniereArgumenter = phrase({
  mots: [
    { texte: "présenter" },
    { texte: "argumenter", focus: true },
    { texte: "débattre" },
  ],
  legende: "Le seul geste qui vaut des deux côtés — et c'est pourquoi ils sont ensemble.",
});

const sansParceQue = phrase({
  mots: [
    { texte: "« c'est bien »", barre: true },
    { texte: "parce que…", focus: true },
  ],
  legende: "Un avis sans « parce que » n'est pas un argument — c'est un gout.",
});

// ── PRÉSENTER.
const fortEtRegarder = phrase({
  mots: [
    { texte: "parler fort" },
    { texte: "regarder", focus: true },
  ],
  legende: "Pour présenter : parler assez fort ET regarder la classe.",
});

const vocabulairePrecis = phrase({
  mots: [
    { texte: "« le truc »", barre: true },
    { texte: "« le diviseur »", focus: true },
  ],
  legende: "Le mot juste n'est pas une élégance : il fait gagner du temps à celui qui écoute.",
});

const dansLordre = phrase({
  mots: [
    { texte: "dans le désordre", barre: true },
    { texte: "dans l'ordre", focus: true },
  ],
  legende: "Raconter dans l'ordre des évènements aide à se faire comprendre.",
});

// ── ARGUMENTER.
const grilleAppuis = grille({
  headers: ["Pour appuyer", "Ce que ça donne"],
  rows: [
    { values: ["une raison", "« parce que… »"] },
    { values: ["un exemple", "« comme… »"] },
    { values: ["une preuve", "« page 12 »"] },
  ],
  caption: "Le CM2 demande une preuve OU un exemple, pas seulement une raison.",
});

const exposeSansArgument = phrase({
  mots: [
    { texte: "un exposé" },
    { texte: "un récit" },
  ],
  legende: "Sans justification, présenter n'est plus que raconter ce qu'on a fait.",
});

const debatSansArgument = phrase({
  mots: [
    { texte: "un débat" },
    { texte: "une dispute" },
  ],
  legende: "Sans justification, un débat n'est qu'une suite d'avis de plus en plus forts.",
});

// ── LE DÉBAT RÉGLÉ.
const attendreSonTour = phrase({
  mots: [
    { texte: "couper", barre: true },
    { texte: "attendre son tour", focus: true },
  ],
  legende: "Dans un échange, on attend son tour et on écoute.",
});

const expliquerPoliment = phrase({
  mots: [
    { texte: "plus fort", barre: true },
    { texte: "expliquer", focus: true },
  ],
  legende: "Quand on n'est pas d'accord, on explique poliment pourquoi.",
});

const ecouterEtJustifier = phrase({
  mots: [
    { texte: "écouter" },
    { texte: "justifier", focus: true },
  ],
  legende: "L'attitude attendue en débat tient en deux mots, et le second est le plus rare.",
});

// ── LE DÉFI : tenir les deux rôles.
const deuxRolesUneHeure = phrase({
  mots: [
    { texte: "tu présentes" },
    { texte: "on te répond" },
  ],
  legende: "Le défi du CM2 : présenter, puis débattre de ce qu'on vient de présenter.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEchangerCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "oral-echanger",
  titre: `Présenter un travail et participer à un débat en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Parler SEUL devant la classe et parler AVEC les autres semblent deux exercices sans rapport. Le CM2 les range pourtant dans une même compétence, et la chaine du programme dit pourquoi : présenter → ARGUMENTER → débattre. Argumenter est LA CHARNIÈRE, le seul geste qui vaut des deux côtés. Sans lui, un exposé n'est qu'un récit de ce qu'on a fait, et un débat qu'une suite d'avis de plus en plus forts.",
  identite: [
    { label: "Mots clés", valeur: "Présenter, argumenter, preuve, débat" },
    { label: "Le secret", valeur: "Argumenter vaut des deux côtés" },
    { label: "Outil", valeur: "Où est le « parce que » ?" },
  ],
  definition: {
    texte:
      "PRÉSENTER UN TRAVAIL, c'est parler ASSEZ FORT et REGARDER LA CLASSE — non pas lire ses notes en les récitant —, raconter DANS L'ORDRE des évènements, et employer un VOCABULAIRE PRÉCIS : « le diviseur » plutôt que « le truc ». Le mot juste n'est pas une élégance, il fait gagner du temps à celui qui écoute. ARGUMENTER, c'est dire CE QU'ON PENSE ET POURQUOI. « Ce livre est bien PARCE QU'il fait rire » est un avis avec une raison ; « ce livre est bien » tout court est un gout, et un gout ne se discute pas. Le CM2 demande d'aller plus loin que la raison seule : UNE PREUVE OU UN EXEMPLE — un passage, un chiffre, un fait. PARTICIPER À UN DÉBAT RÉGLÉ, enfin : on ATTEND SON TOUR et on écoute ; quand on n'est pas d'accord, on EXPLIQUE POLIMENT POURQUOI plutôt que de parler plus fort. L'attitude attendue tient en deux mots — écouter les autres et justifier son avis — et c'est le second qui manque le plus souvent.",
  },
  figure: {
    schema: pile(charniereArgumenter, sansParceQue),
    legende:
      "Regarde la position du mot du milieu : ce n'est pas une étape parmi trois, c'est ce qui relie les deux autres. Présenter sans justifier donne un exposé qui raconte ; débattre sans justifier donne une dispute où gagne le plus fort. Le même geste sauve les deux — et c'est pour cela que le CM2 les range ensemble, là où la 6e en fera deux compétences séparées. En bas, la façon la plus courte de vérifier qu'il est là : cherche le « parce que ». S'il n'y en a pas, il n'y a pas d'argument.",
  },
  proprietes: [
    {
      titre: "Présenter : parler fort et regarder",
      texte:
        "Les deux ensemble. Parler fort en fixant ses notes ne présente rien ; regarder la classe en murmurant non plus.",
      schema: fortEtRegarder,
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Avec un vocabulaire précis",
      texte:
        "« Le diviseur », pas « le truc ». Le mot juste fait gagner du temps à celui qui écoute — c'est à cela qu'il sert.",
      schema: vocabulairePrecis,
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Et dans l'ordre",
      texte:
        "Pour raconter un souvenir ou une démarche : dans l'ordre des évènements. L'ordre fait la moitié de la compréhension.",
      schema: dansLordre,
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Un argument est une raison",
      texte:
        "Ce qu'on pense ET pourquoi. « Ce livre est bien parce qu'il fait rire » : un avis, et sa raison.",
      schema: sansParceQue,
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "Le CM2 demande preuve ou exemple",
      texte:
        "Pas seulement une raison en l'air : un passage, un chiffre, un fait. C'est ce qui distingue une justification d'une affirmation.",
      schema: grilleAppuis,
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "Sans justification, un exposé raconte",
      texte:
        "Il dit ce qu'on a fait, dans l'ordre, correctement — et n'explique rien. C'est la moitié du travail demandé.",
      schema: exposeSansArgument,
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "On attend son tour et on écoute",
      texte:
        "Les deux, encore. Attendre son tour en préparant sa phrase pendant que l'autre parle n'est pas écouter.",
      schema: attendreSonTour,
      micros: ["cm2_oral_debat"],
    },
    {
      titre: "On explique poliment son désaccord",
      texte:
        "Plutôt que de parler plus fort. Le volume n'a jamais convaincu personne — il fait seulement taire.",
      schema: expliquerPoliment,
      micros: ["cm2_oral_debat"],
    },
    {
      titre: "Sans justification, un débat devient une dispute",
      texte:
        "Une suite d'avis de plus en plus forts, où gagne celui qui parle le dernier. C'est le même manque que dans l'exposé.",
      schema: debatSansArgument,
      micros: ["cm2_oral_debat"],
    },
    {
      titre: "Le défi : tenir les deux rôles",
      texte:
        "Présenter, puis débattre de ce qu'on vient de présenter. C'est exactement ce que la fusion du CM2 met en jeu.",
      schema: deuxRolesUneHeure,
      micros: ["cm2_oral_defi"],
    },
  ],
  reel: {
    texte:
      "Tu connais la scène : quelqu'un dit « ce film est nul », un autre répond « non il est bien », et cela tourne pendant dix minutes sans que personne n'apprenne rien. Ce n'est pas un manque de politesse — c'est un manque de « parce que ». Deux gouts qui se cognent ne peuvent aller nulle part, puisque rien n'y est discutable. Ajoute une seule raison de chaque côté — « parce que la fin ne s'explique pas », « parce que justement elle laisse choisir » — et la conversation devient possible : on peut être d'accord avec la raison sans l'être avec l'avis. C'est aussi vrai en classe qu'entre amis, et cela ne demande pas d'avoir raison : seulement de dire pourquoi.",
  },
  historique: {
    texte:
      "Le mot « argument » vient du latin ARGUERE, qui voulait dire faire briller, rendre clair, mettre en lumière — la même racine que l'ARGENT, le métal blanc et brillant. Un argument, ce n'était donc pas une arme pour gagner : c'était ce qui rendait une idée VISIBLE. Le sens de bataille est venu bien plus tard, et il a presque tout recouvert : en anglais, « argument » veut aujourd'hui dire dispute. Le mot lui-même a suivi le chemin qu'on reproche aux débats de classe. Le programme, lui, garde le sens ancien : argumenter n'est pas l'emporter, c'est faire voir aux autres ce que tu vois.",
  },
  formule: {
    contexte: "La vérification la plus courte, valable en exposé comme en débat.",
    expression: "où est le « parce que » ?",
    legende:
      "S'il n'y en a aucun, il n'y a pas d'argument — seulement un avis ou un récit. Et l'on peut le compter sans juger de rien : c'est un mot, il est là ou il n'y est pas. Au CM2 on va plus loin encore : après le « parce que », un exemple ou une preuve.",
    schema: sansParceQue,
  },
  methode: [
    {
      titre: "Chercher le mot juste avant de parler",
      texte:
        "Deux ou trois mots précis notés sur son plan. Ce sont eux qui remplacent « le truc » et « le machin » au moment où l'on hésite.",
      schema: vocabulairePrecis,
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Un « parce que » par idée",
      texte:
        "En préparant : pour chaque chose que tu affirmes, écris la raison à côté. Si tu n'en trouves pas, l'idée n'est pas prête.",
      schema: sansParceQue,
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "Écouter jusqu'au point final",
      texte:
        "Préparer sa réponse pendant que l'autre parle revient à ne pas l'écouter — et l'on répond souvent à ce qu'il n'a pas dit.",
      schema: attendreSonTour,
      micros: ["cm2_oral_debat"],
    },
    {
      titre: "Baisser la voix pour un désaccord",
      texte:
        "Volontairement. Cela oblige les autres à écouter, là où parler plus fort les fait seulement parler plus fort aussi.",
      schema: expliquerPoliment,
      micros: ["cm2_oral_debat"],
    },
  ],
  usages: [
    {
      titre: "Pour présenter un livre à la classe",
      detail:
        "Parler clairement et regarder son public. Un exposé lu sans lever les yeux se comprend deux fois moins bien.",
      schema: fortEtRegarder,
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Pour donner un avis qui compte",
      detail:
        "Dire ce qu'on pense ET pourquoi. Un avis justifié se discute ; un gout ne se discute pas, et la conversation s'arrête.",
      schema: sansParceQue,
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "Pour expliquer une démarche en maths",
      detail:
        "C'est le même geste, dans une autre discipline : le programme dit « dans TOUTES les disciplines ». Le « parce que » y est la démonstration.",
      schema: grilleAppuis,
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "Pour défendre son travail après l'avoir montré",
      detail:
        "C'est là que les deux moitiés se rejoignent, et c'est ce que le CM2 prépare en les gardant dans une même compétence.",
      schema: deuxRolesUneHeure,
      micros: ["cm2_oral_defi"],
    },
  ],
  exemples: [
    {
      titre: "Présenter un exposé",
      donnees: "« Pour présenter un exposé, il vaut mieux… »",
      schema: fortEtRegarder,
      question: "Il vaut mieux quoi ?",
      solution:
        "PARLER ASSEZ FORT ET REGARDER LA CLASSE. Les deux ensemble : parler fort les yeux sur ses notes ne présente rien, et regarder son public en murmurant non plus. Une présentation doit être AUDIBLE et CLAIRE — ce sont deux exigences, pas une.",
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Raconter un souvenir",
      donnees: "« Pour raconter un souvenir à l'oral, on parle… »",
      schema: dansLordre,
      question: "On parle comment ?",
      solution:
        "CLAIREMENT, DANS L'ORDRE DES ÉVÈNEMENTS. Ni le plus vite possible, ni en commençant par la fin pour faire un effet. L'ordre fait la moitié de la compréhension, et il ne coute rien à celui qui parle.",
      micros: ["cm2_oral_presenter"],
    },
    {
      titre: "Un avis avec une raison",
      donnees: "« Je pense que ce livre est bien parce qu'il fait rire. »",
      schema: sansParceQue,
      question: "Que donne cette phrase ?",
      solution:
        "UN AVIS AVEC UNE RAISON. Le « parce que » est ce qui la sépare d'un simple gout. Un avis justifié donne le POURQUOI — et c'est justement le pourquoi qui peut se discuter : on peut refuser la raison sans attaquer la personne.",
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "Un bon argument",
      donnees: "« Dans un débat, un bon argument est… »",
      schema: grilleAppuis,
      question: "C'est quoi ?",
      solution:
        "UNE RAISON QUI EXPLIQUE SON IDÉE. Ni la phrase la plus forte, ni la plus longue, ni celle du dernier qui a parlé. Et le CM2 demande d'y ajouter une PREUVE OU UN EXEMPLE : un passage, un chiffre, un fait.",
      micros: ["cm2_oral_argumenter"],
    },
    {
      titre: "L'attitude en débat",
      donnees: "« Pendant un débat en classe, quelle attitude est attendue ? »",
      schema: ecouterEtJustifier,
      question: "Laquelle ?",
      solution:
        "ÉCOUTER LES AUTRES ET JUSTIFIER SON AVIS. Deux choses, et la seconde manque le plus souvent : beaucoup écoutent poliment puis donnent un avis sans raison. Participer à un échange suppose les deux.",
      micros: ["cm2_oral_debat"],
    },
    {
      titre: "Le défi",
      donnees: "Tu viens de présenter ton travail. Un camarade n'est pas d'accord.",
      schema: deuxRolesUneHeure,
      question: "Que fais-tu ?",
      solution:
        "TU EXPLIQUES POLIMENT POURQUOI TU AS FAIT AINSI — avec une raison, et si possible un exemple. Tu passes du rôle de celui qui présente à celui qui débat, et c'est le MÊME GESTE qui te sert dans les deux : argumenter. C'est exactement ce que le CM2 met dans une seule compétence.",
      micros: ["cm2_oral_defi"],
    },
  ],
  pieges: [
    "Lire ses notes sans lever les yeux : l'exposé se comprend deux fois moins bien.",
    "Dire « le truc » : le mot précis fait gagner du temps à celui qui écoute.",
    "Raconter dans le désordre pour faire un effet.",
    "Donner un avis sans « parce que » : c'est un gout, et un gout ne se discute pas.",
    "S'arrêter à la raison : le CM2 demande aussi une preuve ou un exemple.",
    "Préparer sa réponse pendant que l'autre parle : ce n'est pas écouter.",
    "Parler plus fort pour un désaccord : le volume fait taire, il ne convainc pas.",
  ],
  aRetenir: [
    "Argumenter est la charnière : le seul geste qui vaut en exposé ET en débat.",
    "Un avis sans « parce que » n'est pas un argument — c'est un gout.",
    "Le CM2 demande une preuve ou un exemple, pas seulement une raison.",
    "Présenter : parler assez fort ET regarder la classe, avec le mot juste.",
    "En débat : écouter les autres ET justifier son avis.",
  ],
  entrainement: [
    {
      question: "« Pour présenter un exposé, il vaut mieux… »",
      correction: "Parler assez fort et regarder la classe.",
      micros: ["cm2_oral_presenter"],
    },
    {
      question: "« Pour raconter un souvenir à l'oral, on parle… »",
      correction: "Clairement, dans l'ordre des évènements.",
      micros: ["cm2_oral_presenter"],
    },
    {
      question: "« Je pense que ce livre est bien parce qu'il fait rire » donne…",
      correction: "Un avis avec une raison.",
      micros: ["cm2_oral_argumenter"],
    },
    {
      question: "« Dans un débat, un bon argument est… »",
      correction: "Une raison qui explique son idée.",
      micros: ["cm2_oral_argumenter"],
    },
    {
      question: "Tu n'es pas d'accord avec un camarade. Que fais-tu ?",
      correction: "Tu expliques poliment pourquoi.",
      micros: ["cm2_oral_debat"],
    },
    {
      question: "On critique le travail que tu viens de présenter. Quel geste te sert ?",
      correction: "Le même que pour présenter : argumenter — une raison, et un exemple.",
      micros: ["cm2_oral_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesOralEchangerCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Présenter et débattre - CM2",
    section: {
      type: "objectif",
      phrase: "Argumenter est la charnière",
      sousPhrase:
        "Parler seul et parler avec : un seul geste sauve les deux.",
      encadre: {
        titre: "L'idée",
        texte: "Sans « parce que », un exposé raconte et un débat se dispute.",
      },
    },
  },
  {
    titre: "Présenter un travail",
    badge: "Présenter et débattre - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Assez fort", texte: "Audible du fond de la classe." },
        { titre: "En regardant", texte: "Pas les yeux sur ses notes." },
        { titre: "Le mot juste", texte: "« Le diviseur », pas « le truc »." },
        { titre: "Dans l'ordre", texte: "L'ordre fait la moitié de la compréhension." },
      ],
    },
    schema: fortEtRegarder,
  },
  {
    titre: "Un avis n'est pas un argument",
    badge: "Présenter et débattre - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Un gout",
        contenu: "« Ce livre est bien. » Rien à discuter : la conversation s'arrête.",
      },
      droite: {
        titre: "Un argument",
        contenu: "« … parce qu'il fait rire. » On peut refuser la raison sans attaquer.",
      },
    },
    schema: sansParceQue,
  },
  {
    titre: "Le CM2 va plus loin",
    badge: "Présenter et débattre - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Une RAISON : « parce que… »",
        "Un EXEMPLE : « comme quand… »",
        "Une PREUVE : « page 12, il est écrit… »",
        "Le programme demande preuve OU exemple, pas la raison seule.",
      ],
    },
    schema: grilleAppuis,
  },
  {
    titre: "Le débat réglé",
    badge: "Présenter et débattre - CM2",
    section: {
      type: "etapes",
      etapes: [
        "On attend son tour ET on écoute.",
        "⛔ Préparer sa réponse pendant que l'autre parle n'est pas écouter.",
        "Pas d'accord ? On explique poliment pourquoi.",
        "Le volume fait taire — il n'a jamais convaincu.",
      ],
    },
    schema: expliquerPoliment,
  },
  {
    titre: "À vous",
    badge: "Présenter et débattre - CM2",
    section: {
      type: "exercice",
      enonce: "Tu viens de présenter ton travail. Un camarade n'est pas d'accord.",
      question: "Quel geste te sert maintenant ?",
      indice: "Le même que pendant l'exposé.",
      correction:
        "ARGUMENTER. Tu expliques poliment pourquoi tu as fait ainsi, avec une raison et un exemple. C'est le geste commun aux deux rôles — et c'est pour cela que le CM2 les met dans une seule compétence.",
    },
    schema: deuxRolesUneHeure,
  },
];
