// ─── Fiche de cours : écrire pour réfléchir, apprendre et mémoriser (5e) ──────
// LA VINGT-SIXIÈME FICHE DE LA 5e — et elle OUVRE LE DOMAINE DE L'ÉCRITURE, le
// dernier domaine de la classe qui n'avait rien.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Écrire pour réfléchir, apprendre et mémoriser » (BO5EFRE).
//
// ⭐⭐ LE FIL, ET IL EST DANS LE TITRE MÊME DE LA COMPÉTENCE : TROIS VERBES, TROIS
// MOMENTS. Réfléchir se fait AVANT — c'est planifier. Apprendre se fait PENDANT
// — c'est repérer, dans ce qu'on lit ou entend, ce qui porte. Mémoriser se fait
// APRÈS — c'est récrire la leçon avec ses mots. Les trois micros de la notion
// sont ces trois moments, dans cet ordre, et rien ne le dit nulle part.
//
// ⭐ ET CE QUI LES RÉUNIT VRAIMENT : AUCUN DE CES ÉCRITS NE SE REND. L'en-tête de
// `socle-ecriture-oral.bank.ts` le pose en toutes lettres — « aucun de ces écrits
// ne se rend, et c'est pour cela qu'ils s'oublient ». C'est le seul domaine du
// programme où l'écrit ne va nulle part : personne ne le note, personne ne le
// ramasse, et c'est exactement pour cela qu'un élève ne le fait jamais. La fiche
// le dit à l'élève au lieu de le lui cacher.
//
// ⭐ L'ARC QUI REMONTE LE TEMPS SERT UNE QUATRIÈME FOIS. Il a servi de ce qu'on
// comprend vers ce qui le montre, de l'effet vers sa cause, et de la fin d'un
// livre vers son premier chapitre. Ici il va de LA FIN QU'ON VEUT ATTEINDRE vers
// LE DÉBUT QU'ON DOIT ÉCRIRE : c'est le geste de planification que la banque
// nomme en premier, et il ne se dessine pas autrement.
//
// ⛔ LE PIÈGE DE LA MICRO `5e_ecrit_idee_principale`, ET IL EST RARE : LES TROIS
// MAUVAISES RÉPONSES SONT VRAIES. Ce sont des détails exacts du message. L'erreur
// de l'élève n'est pas de mal lire, c'est de retenir ce qui FRAPPE au lieu de ce
// qui PORTE. Une fausse réponse inventée ne servirait à rien, et la fiche doit
// donc montrer un vrai détail à côté de l'idée — d'où la bande `nature`, qui
// écrit « vrai, un détail » au-dessus d'une phrase exacte.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette de cette fiche n'est une FONCTION
// grammaticale — toutes restent grises. Mots écartés parce que `couleurFonction`
// les attrape : « le sujet » (dit ici « le thème »), « l'objet », « la
// proposition ».
//
// Alignée sur la table NOTES de
// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts, et sur les
// tables IDEES et PLANIFIER de
// lib/tutor-v4/questionBank/5e/francais/ecriture-oral.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `ecriture_reflechir`) :
// - 5e_ecrit_planifier       → figure, propriétés 1 à 3, formule, méthode 1 et 2,
//                              usage 1, exemples 1 et 2
// - 5e_ecrit_idee_principale → propriétés 4 et 5, méthode 3, usage 2, exemples 3 et 4
// - 5e_ecrit_notes           → propriétés 6 à 8, méthode 4, usage 3, exemples 5 et 6

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

/** Les trois moments de l'écrit qui ne se rend pas. ⚠️ `showValues: false` — ce
 *  sont des moments, pas des nombres. */
function axe(points: NumberLineCanvasPoint[]) {
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

/** Les cinq écrits pour apprendre. ⚠️ Cellules courtes : à la largeur d'un bloc,
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

// ─── Ce qui se dessine quand on écrit pour soi ────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : l'arc part de la fin et pointe vers le début.
const finDabord = phrase({
  mots: [
    { texte: "le début", focus: true },
    { texte: "la fin", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "on part de", type: "question" }],
  legende: "On écrit d'abord la fin qu'on veut atteindre, puis le chemin pour y aller.",
});

const troisMoments = axe([
  { value: 1, label: "avant" },
  { value: 2, label: "pendant" },
  { value: 3, label: "après" },
]);

const troisDemandes = phrase({
  mots: [
    { texte: "raconter", focus: true },
    { texte: "décrire", focus: true },
    { texte: "expliquer", focus: true },
  ],
  legende: "Trois demandes dans la consigne : les trois choses à vérifier à la fin.",
});

const sujetReduit = phrase({
  mots: [
    { texte: "un sujet immense" },
    { texte: "une seule scène", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "se réduit à", type: "question" }],
  legende: "Un sujet trop grand ne s'écrit pas : réduis-le à un moment précis.",
});

// ── ⭐ L'IDÉE QUI PORTE, ET LE DÉTAIL QUI EST VRAI. La bande grise dit le statut
// de chaque morceau — et c'est bien le mot « vrai » qu'il faut y écrire, sinon
// l'élève croit qu'il s'est trompé de lecture.
// ⛔ BOITES COURTES, ET LA MESURE EST NETTE : une seule boite de vingt-huit
// signes (« des élèves ont perdu le leur ») a poussé le viewBox à 294 px pour un
// bloc de 218, et TOUT le dessin — étiquettes ET légende, qui vit dans le SVG —
// est tombé à 8,9 px. `largeurMax` dit où la phrase passe à la ligne ; il ne
// coupe pas un mot trop long. Plafond mesuré : environ vingt signes par boite,
// et la bande `nature` compte dans la largeur puisqu'elle se pose au-dessus.
const ideeEtDetail = phrase({
  mots: [
    { texte: "le car part tôt", nature: "ce qui porte" },
    { texte: "9 degrés là-haut", nature: "vrai — détail" },
  ],
  legende: "Les deux sont exacts. Un seul change ce que le lecteur doit faire demain.",
});

const detailQuiFrappe = phrase({
  mots: [
    { texte: "rendre vendredi", nature: "ce qui porte" },
    { texte: "perdu le sien", nature: "vrai — détail" },
  ],
  legende: "On retient ce qui frappe. L'idée principale est ce qui commande la suite.",
});

// ── LES CINQ ÉCRITS QUI FONT RETENIR.
const grilleNotes = grille({
  headers: ["Ce que tu fais", "Ce que ça donne"],
  rows: [
    { values: ["tu récris", "tu retiens"] },
    { values: ["tu questionnes", "tu vérifies"] },
    { values: ["tu dessines", "tu vois"] },
    { values: ["ton exemple", "tu reconnais"] },
    { values: ["ta faute", "tu la vois venir"] },
  ],
  caption: "Cinq écrits, et aucun ne se rend.",
});

const grilleNotesFaute = grille({
  headers: ["Ce que tu fais", "Ce que ça donne"],
  rows: [
    { values: ["tu récris", "tu retiens"] },
    { values: ["tu questionnes", "tu vérifies"] },
    { values: ["tu dessines", "tu vois"] },
    { values: ["ton exemple", "tu reconnais"] },
    { values: ["ta faute", "tu la vois venir"] },
  ],
  highlight: { row: 4 },
  caption: "La même remarque sur toutes tes copies : note-la une fois.",
});

// ⭐ RECOPIER N'EST PAS APPRENDRE : le mot barré est la manipulation.
const recopierNeSertARien = phrase({
  mots: [
    { texte: "recopier", barre: true },
    { texte: "récrire", focus: true },
  ],
  legende: "Recopier occupe la main. Récrire oblige à comprendre : ce n'est pas pareil.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureReflechir5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "ecriture-reflechir",
  titre: "Écrire pour réfléchir, apprendre et mémoriser en 5e (2026-2027)",
  accroche:
    "Voici le seul écrit du programme que personne ne ramassera jamais : ni note, ni correction, ni remarque dans la marge. C'est pour cela qu'on ne le fait pas — et c'est exactement pour cela qu'il faut le faire. Un plan de quatre mots dans la marge, une leçon récrite avec tes mots, une idée principale notée en une ligne : trois minutes chacun, et le devoir change de tête.",
  identite: [
    { label: "Mots clés", valeur: "Planifier, repérer, récrire, mémoriser" },
    { label: "Le secret", valeur: "Aucun de ces écrits ne se rend" },
    { label: "Outil", valeur: "Quelle fin je veux atteindre ?" },
  ],
  definition: {
    texte:
      "La compétence porte trois verbes, et ce sont trois MOMENTS. RÉFLÉCHIR se fait AVANT d'écrire : c'est planifier — écrire d'abord la fin qu'on veut atteindre, souligner les demandes de la consigne, jeter ses idées en vrac sans en écarter aucune, trancher le temps du récit avant de commencer, réduire un sujet immense à une scène et à un lieu. APPRENDRE se fait PENDANT qu'on lit ou qu'on écoute : c'est repérer l'IDÉE PRINCIPALE, celle qui commande ce que le lecteur devra faire — et non le détail qui frappe, même quand il est exact. MÉMORISER se fait APRÈS : c'est récrire la leçon avec ses mots, fabriquer des questions pour se faire interroger, dessiner une règle qu'on confond, écrire un exemple à soi, noter la faute qu'on refait à chaque devoir. Ces trois écrits ne se rendent jamais : ils ne servent qu'à celui qui les écrit.",
  },
  figure: {
    schema: pile(finDabord, troisMoments),
    legende:
      "L'arc violet remonte le temps : il part de la fin et pointe vers le début. Écrire, c'est d'abord décider où l'on veut arriver — ensuite seulement on cherche le chemin, et l'on sait où il mène. Et l'axe gris dit les trois moments de la compétence : on planifie AVANT, on repère l'idée principale PENDANT qu'on lit ou qu'on écoute, on récrit la leçon APRÈS. Trois écrits, trois moments, et pas un seul qui se ramasse.",
  },
  proprietes: [
    {
      titre: "Commence par la fin",
      texte:
        "Écris la dernière ligne que tu veux atteindre, puis le chemin pour y aller. C'est ce qui débloque un récit dont on ne sait pas quoi faire.",
      schema: finDabord,
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Souligne les demandes de la consigne",
      texte:
        "Une consigne en contient souvent trois. Souligne-les une par une : ce sont exactement les trois choses à vérifier à la fin.",
      schema: troisDemandes,
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Réduis un sujet trop grand",
      texte:
        "« La liberté » ne s'écrit pas. Une scène, un lieu, un moment précis s'écrivent. Un sujet immense se rétrécit avant de commencer.",
      schema: sujetReduit,
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "L'idée principale est ce qui commande",
      texte:
        "Pas ce qui frappe. Demande-toi ce que le lecteur devra FAIRE après avoir lu : c'est là qu'est l'idée principale.",
      schema: ideeEtDetail,
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      titre: "Un détail peut être parfaitement vrai",
      texte:
        "Et rester un détail. L'erreur n'est pas de mal lire : c'est de retenir la phrase la plus marquante au lieu de celle qui porte le message.",
      schema: detailQuiFrappe,
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      titre: "Recopier ne fait rien retenir",
      texte:
        "Recopier occupe la main et laisse la tête libre. Récrire une leçon avec tes mots oblige à la comprendre — sinon la phrase ne sort pas.",
      schema: recopierNeSertARien,
      micros: ["5e_ecrit_notes"],
    },
    {
      titre: "Cinq écrits pour apprendre",
      texte:
        "Récrire la leçon, fabriquer des questions, dessiner une règle, écrire un exemple à toi, noter la faute que tu refais.",
      schema: grilleNotes,
      micros: ["5e_ecrit_notes"],
    },
    {
      titre: "Note la faute que tu refais",
      texte:
        "Si le professeur écrit la même remarque sur toutes tes copies, elle vaut une ligne dans ton cahier. C'est le point le plus rentable de tous.",
      schema: grilleNotesFaute,
      micros: ["5e_ecrit_notes"],
    },
  ],
  reel: {
    texte:
      "Tu écris déjà pour toi tous les jours, et tu ne l'appelles pas ainsi. Une liste de courses est un plan. Un message que tu récris trois fois avant de l'envoyer est un brouillon. Une capture d'écran gardée « pour plus tard » est une prise de notes — mauvaise, d'ailleurs, parce qu'on ne la relit jamais : c'est exactement le carnet qui recopie tout. Et quand tu expliques un jeu à quelqu'un et que tu t'aperçois au milieu que tu ne sais pas bien la règle, tu viens de faire le geste central de cette compétence : dire avec ses mots révèle ce qu'on ne comprend pas. Écrire pour apprendre, c'est se faire cela à soi-même, avant que le contrôle ne s'en charge.",
  },
  historique: {
    texte:
      "Pendant plus de mille cinq cents ans, l'écrit qui ne se rend pas a eu un support à lui : la tablette de cire. Une planchette creusée, remplie de cire, sur laquelle on écrivait avec une pointe — et dont on effaçait tout avec le plat de l'autre extrémité. Les écoliers romains y faisaient leurs exercices, les marchands leurs comptes provisoires, les auteurs leurs premiers jets ; le Moyen Âge l'a gardée jusqu'à l'arrivée du papier bon marché. Ce qui comptait était précisément qu'on l'efface : la cire disait qu'un écrit peut n'exister que le temps de servir. Nos brouillons et nos fiches de révision en descendent directement — et le réflexe de vouloir garder au propre tout ce qu'on écrit est, lui, très récent.",
  },
  formule: {
    contexte: "La question à se poser avant d'écrire la première ligne d'un devoir.",
    expression: "quelle fin je veux atteindre ?",
    legende:
      "Écris cette fin en une phrase, en haut de ton brouillon. Tout le reste devient un chemin vers elle — et les idées qui n'y mènent pas se repèrent seules, sans qu'on ait à les juger. C'est la seule minute de planification qui fait gagner un quart d'heure de rédaction.",
    schema: finDabord,
  },
  methode: [
    {
      titre: "Écrire la fin, puis le chemin",
      texte:
        "Une phrase pour la dernière ligne. Ensuite, trois étapes pour y arriver. Le récit est bâti avant d'être écrit.",
      schema: finDabord,
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Quatre mots dans la marge",
      texte:
        "Ton plan tient en quatre mots. Tu les barres au fur et à mesure : tu ne peux plus oublier une partie, et cela coute vingt secondes.",
      schema: troisDemandes,
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Chercher ce que le lecteur devra faire",
      texte:
        "L'idée principale d'un message est celle qui change quelque chose pour celui qui le reçoit. Les autres phrases l'entourent.",
      schema: ideeEtDetail,
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      titre: "Récrire la leçon sans la regarder",
      texte:
        "Ferme le cahier, écris la règle avec tes mots, puis compare. Ce que tu n'as pas su écrire est exactement ce que tu ne sais pas.",
      schema: recopierNeSertARien,
      micros: ["5e_ecrit_notes"],
    },
  ],
  usages: [
    {
      titre: "Pour débloquer un devoir d'écriture",
      detail:
        "Tu ne trouves rien en dix minutes ? Écris n'importe quelle première phrase. L'idée vient en écrivant, très rarement avant.",
      schema: sujetReduit,
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Pour rendre compte d'un message en une phrase",
      detail:
        "Une consigne orale, un mot du carnet, une annonce : une seule phrase suffit si elle porte ce qui commande la suite.",
      schema: detailQuiFrappe,
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      titre: "Pour apprendre une leçon qui ne rentre pas",
      detail:
        "Tu l'as relue trois fois sans rien retenir ? Le problème n'est pas le nombre de lectures : c'est qu'on ne retient pas en lisant.",
      schema: grilleNotes,
      micros: ["5e_ecrit_notes"],
    },
  ],
  exemples: [
    {
      titre: "Un récit qui ne démarre pas",
      donnees: "« On te demande un récit, et tu ne sais pas par où commencer. »",
      schema: finDabord,
      question: "Que fais-tu avant d'écrire ?",
      solution:
        "TU ÉCRIS D'ABORD LA FIN QUE TU VEUX ATTEINDRE, puis le chemin pour y aller. « À la fin, elle repart seule » : il ne reste plus qu'à trouver ce qui a rendu cela possible. Chercher un début quand on ignore la fin, c'est chercher une route sans savoir la ville.",
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Trop d'idées",
      donnees: "« Tu as beaucoup d'idées et tu as peur d'en perdre en route. »",
      schema: troisDemandes,
      question: "Que fais-tu ?",
      solution:
        "TU LES JETTES TOUTES EN VRAC SUR UNE FEUILLE, SANS EN ÉCARTER AUCUNE. Trier et produire sont deux gestes différents, et les faire en même temps bloque les deux. On vide d'abord, on choisit ensuite — et la mauvaise idée notée en fait souvent surgir une bonne.",
      micros: ["5e_ecrit_planifier"],
    },
    {
      titre: "Une annonce",
      donnees: "« La sortie au volcan est maintenue. Le car partira à 6 h 30 du parking, et non 7 h comme prévu. Prévoyez un coupe-vent : il fera 9 degrés là-haut. »",
      schema: ideeEtDetail,
      question: "Quelle est l'idée principale ?",
      solution:
        "LA SORTIE A LIEU, MAIS LE DÉPART EST AVANCÉ. Les neuf degrés sont vrais, le coupe-vent est vrai, le parking est vrai — et aucun des trois ne fera rater le car. L'idée principale est celle qui change ce que tu dois faire demain matin.",
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      titre: "Un autre message",
      donnees: "« Merci de rendre les manuels avant vendredi. Un manuel non rendu sera facturé. Ceux qui ont perdu le leur doivent le signaler dès maintenant. »",
      schema: detailQuiFrappe,
      question: "Quelle est l'idée principale ?",
      solution:
        "LES MANUELS DOIVENT REVENIR AVANT VENDREDI, OU ÊTRE PAYÉS. « Certains ont perdu le leur » frappe davantage, et c'est vrai — mais cela ne concerne que quelques élèves. L'idée principale est celle qui s'adresse à tout le monde.",
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      titre: "Une leçon qui ne rentre pas",
      donnees: "« Tu relis ta leçon trois fois et tu ne retiens rien du tout. »",
      schema: recopierNeSertARien,
      question: "Que fais-tu ?",
      solution:
        "TU RÉCRIS LA LEÇON AVEC TES MOTS. Relire donne l'impression de savoir : les phrases sont familières, donc on les croit acquises. Écrire sans regarder enlève cette illusion en trente secondes — et ce que tu n'arrives pas à écrire est précisément ce qu'il faut réapprendre.",
      micros: ["5e_ecrit_notes"],
    },
    {
      titre: "La même remarque, toujours",
      donnees: "« Le professeur écrit la même remarque sur toutes tes copies. »",
      schema: grilleNotesFaute,
      question: "Que fais-tu ?",
      solution:
        "TU NOTES CE QUI TE TROMPE : la faute que tu refais chaque fois. Une ligne, en tête de ton cahier, relue avant chaque devoir. C'est l'écrit le plus court et le plus rentable de tous — et personne ne le demande, donc presque personne ne le fait.",
      micros: ["5e_ecrit_notes"],
    },
  ],
  pieges: [
    "Chercher un début sans savoir la fin : c'est ce qui bloque le plus de récits.",
    "Trier ses idées en même temps qu'on les cherche : on vide d'abord, on choisit ensuite.",
    "Garder un sujet immense : « la liberté » ne s'écrit pas, une scène s'écrit.",
    "Prendre pour idée principale le détail qui frappe : il est souvent vrai, et c'est ce qui trompe.",
    "Relire une leçon en croyant l'apprendre : on ne retient pas en lisant.",
    "Recopier au lieu de récrire : la main travaille, la tête reste au repos.",
  ],
  aRetenir: [
    "Trois verbes, trois moments : réfléchir AVANT, apprendre PENDANT, mémoriser APRÈS.",
    "Écris d'abord la fin que tu veux atteindre, puis le chemin.",
    "L'idée principale est celle qui commande ce que le lecteur devra faire.",
    "Un détail vrai reste un détail : c'est le piège le plus fréquent.",
    "Aucun de ces écrits ne se rend — et c'est pour cela qu'ils s'oublient.",
  ],
  entrainement: [
    {
      question: "« La consigne comporte trois demandes. » Que fais-tu ?",
      correction: "Tu les soulignes une par une : ce sont les trois choses à vérifier à la fin.",
      micros: ["5e_ecrit_planifier"],
    },
    {
      question: "« Tu ne sais pas si tu dois raconter au présent ou au passé. » Que fais-tu ?",
      correction: "Tu tranches avant de commencer, et tu t'y tiens jusqu'au bout.",
      micros: ["5e_ecrit_planifier"],
    },
    {
      question: "« Le gymnase reste fermé. Les cours auront lieu dehors, sauf en cas de pluie, où ils seront annulés. » L'idée principale ?",
      correction: "Le sport se fera dehors cette semaine, ou pas du tout.",
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      question: "« Le devoir peut être rendu sur papier ou par la messagerie. Dans les deux cas, votre nom doit apparaitre sur la première ligne. » L'idée principale ?",
      correction: "Quel que soit le support, le nom doit figurer en tête.",
      micros: ["5e_ecrit_idee_principale"],
    },
    {
      question: "« La leçon distingue trois cas qui se ressemblent beaucoup. » Que fais-tu ?",
      correction: "Tu fais un dessin de la règle : ce qui se voit se retient mieux.",
      micros: ["5e_ecrit_notes"],
    },
    {
      question: "« La règle est claire et tu n'y comprends rien en exercice. » Que fais-tu ?",
      correction: "Tu écris un exemple à toi : la règle seule ne revient jamais.",
      micros: ["5e_ecrit_notes"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesEcritureReflechir5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire pour réfléchir - 5e",
    section: {
      type: "objectif",
      phrase: "Aucun de ces écrits ne se rend",
      sousPhrase:
        "Ni note, ni correction, ni remarque dans la marge. C'est pour cela qu'on ne les fait pas.",
      encadre: {
        titre: "L'idée",
        texte: "Trois minutes chacun — et le devoir change de tête.",
      },
    },
  },
  {
    titre: "Trois verbes, trois moments",
    badge: "Écrire pour réfléchir - 5e",
    section: {
      type: "etapes",
      etapes: [
        "RÉFLÉCHIR se fait AVANT : c'est planifier.",
        "APPRENDRE se fait PENDANT : c'est repérer ce qui porte.",
        "MÉMORISER se fait APRÈS : c'est récrire la leçon avec tes mots.",
        "Et pas un des trois ne sera ramassé.",
      ],
    },
    schema: troisMoments,
  },
  {
    titre: "Planifier, c'est partir de la fin",
    badge: "Écrire pour réfléchir - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La fin d'abord", texte: "Écris la dernière ligne, puis le chemin pour y aller." },
        { titre: "La consigne", texte: "Souligne ses demandes : ce sont les vérifications de la fin." },
        { titre: "Le vrac", texte: "Jette toutes tes idées sans en écarter aucune." },
        { titre: "Le rétrécissement", texte: "Un sujet immense devient une scène, un lieu, un moment." },
      ],
    },
    schema: finDabord,
  },
  {
    titre: "Le détail est vrai — et ce n'est pas l'idée",
    badge: "Écrire pour réfléchir - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce qui porte",
        contenu: "« Le car part plus tôt » : cela change ce que tu feras demain.",
      },
      droite: {
        titre: "Ce qui frappe",
        contenu: "« Il fera neuf degrés » : exact, mémorable, et sans conséquence.",
      },
    },
    schema: ideeEtDetail,
  },
  {
    titre: "Cinq écrits pour apprendre",
    badge: "Écrire pour réfléchir - 5e",
    section: {
      type: "etapes",
      etapes: [
        "RÉCRIRE la leçon avec tes mots : recopier ne fait rien retenir.",
        "FABRIQUER des questions : quelqu'un te fera réciter demain.",
        "DESSINER la règle quand deux cas se ressemblent trop.",
        "ÉCRIRE un exemple à toi, et noter la faute que tu refais.",
      ],
    },
    schema: grilleNotes,
  },
  {
    titre: "À vous",
    badge: "Écrire pour réfléchir - 5e",
    section: {
      type: "exercice",
      enonce: "« Le voyage coute 180 euros. Une aide peut couvrir la moitié pour les familles qui en font la demande avant le 15. »",
      question: "Quelle est l'idée principale ?",
      indice: "Demande-toi ce que le lecteur devra FAIRE après avoir lu.",
      correction:
        "UNE AIDE EXISTE, MAIS IL FAUT LA DEMANDER AVANT LE 15. Le prix et la moitié sont vrais ; seule la date fait perdre l'aide si on l'ignore.",
    },
    schema: detailQuiFrappe,
  },
];
