// ─── Fiche de cours : écrire pour apprendre, inventer et réfléchir (4e) ───────
// LA QUINZIÈME FICHE DE FRANÇAIS DE LA 4e.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020, domaine « Écriture ». Le texte
// nomme quatre choses : écrire pour réfléchir et mémoriser, écrire un texte
// d'invention, écrire un texte à visée argumentative « présentant au moins un
// argument et un exemple », et « évaluer son écrit et savoir le faire évoluer ».
//
// ⭐⭐ CE QUE CETTE FICHE REFUSE DE FAIRE : donner des conseils. « Sois clair »,
// « fais des phrases courtes », « relis-toi » ne sont pas des méthodes — ce sont
// des vœux. Tout ce qui est ici se COMPTE ou se FAIT : trois pièces dans un
// paragraphe, six relectures d'un défaut à la fois, cinq écrits de travail pour
// cinq besoins, cinq contradictions à chercher dans un brouillon.
//
// ⭐ LE DESSIN CENTRAL EST LE PARAGRAPHE DÉMONTÉ. Un paragraphe de réflexion
// tient sur trois pièces — l'idée, l'exemple, et ce que l'exemple prouve — et
// les trois groupes du canvas `phrase` les montrent. Quand une pièce manque, le
// dessin le montre par un vide : c'est plus efficace qu'une explication, parce
// que l'élève VOIT ce qu'il oublie, au lieu de le lire.
//
// ⛔ ET LA RÉVISION SE DESSINE AUSSI, avec `barre: true` — le mot vague barré,
// le mot précis à côté. C'est la manipulation du canvas `phrase` la moins
// utilisée du dépôt, et elle est faite pour ça.
//
// Alignée sur les tables NOTES, INVENTION, REFLEXION et REVISER de
// lib/tutor-v4/questionBank/4e/francais/ecriture-oral.bank.ts, écrite le 25/08.
//
// Micro-compétences couvertes (les 4 de la notion `ecriture`) :
// - 4e_ecrit_notes     → propriétés 1 et 2, méthode 1, exemple 1
// - 4e_ecrit_invention → propriétés 3 et 4, méthode 2, exemples 2 et 3
// - 4e_ecrit_reflexion → figure, propriétés 5 et 6, formule, méthode 3,
//                        exemples 4 et 5
// - 4e_ecrit_reviser   → propriété 7, méthode 4, exemples 6 et 7
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : pas de `titre` sur un dessin ; pas de
// markdown dans un texte ; une étiquette de groupe ne se plie pas ; et LE RENDU
// SE REGARDE.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
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

// ─── Le paragraphe démonté ────────────────────────────────────────────────────
// ⚠️ Les groupes ne sont pas des fonctions grammaticales : ce sont les PIÈCES
// d'un raisonnement. Même dessin, autre usage — la légende le dit chaque fois.

// ── LA FIGURE DE RÉFÉRENCE : trois pièces présentes, puis une qui manque.
const paragrapheComplet = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "lâche", focus: true },
    { texte: ":" },
    { texte: "p. 40" },
    { texte: "il" },
    { texte: "fuit" },
    { texte: "," },
    { texte: "et" },
    { texte: "cette" },
    { texte: "fuite" },
    { texte: "le" },
    { texte: "définit", focus: true },
  ],
  groupes: [
    { mots: [0, 2], label: "l'idée" },
    { mots: [4, 6], label: "l'exemple" },
    { mots: [8, 12], label: "ce qu'il prouve" },
  ],
  legende: "Trois pièces, et le paragraphe tient. Il fait deux lignes.",
});

const paragrapheSansLien = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "lâche", focus: true },
    { texte: "." },
    { texte: "P. 40" },
    { texte: "," },
    { texte: "il" },
    { texte: "fuit" },
    { texte: "sans" },
    { texte: "prévenir" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 2], label: "l'idée" },
    { mots: [4, 9], label: "l'exemple" },
  ],
  legende: "Il manque le LIEN : rien ne dit ce que l'exemple prouve.",
});

const paragrapheSansExemple = phrase({
  mots: [
    { texte: "Il" },
    { texte: "est" },
    { texte: "lâche", focus: true },
    { texte: "," },
    { texte: "vraiment" },
    { texte: "très" },
    { texte: "lâche" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "l'idée, répétée" }],
  legende: "Il manque l'EXEMPLE : l'idée est posée, rien ne l'appuie.",
});

// ── L'ÉCRIT DE TRAVAIL : cinq besoins, cinq outils.
const ecritBrouillon = phrase({
  mots: [
    { texte: "je" },
    { texte: "ne" },
    { texte: "sais" },
    { texte: "pas" },
    { texte: "encore" },
    { texte: "→" },
    { texte: "brouillon", focus: true },
  ],
  legende: "Chercher : on écrit pour trouver, pas pour être lu.",
});

const ecritReformulation = phrase({
  mots: [
    { texte: "j'ai" },
    { texte: "cru" },
    { texte: "comprendre" },
    { texte: "→" },
    { texte: "reformuler", focus: true },
  ],
  legende: "Vérifier : redire avec ses mots prouve qu'on a compris.",
});

// ── L'INVENTION : ce qui rend un texte incohérent.
const inventionContradiction = phrase({
  mots: [
    { texte: "blessé" },
    { texte: "à" },
    { texte: "la" },
    { texte: "jambe", focus: true },
    { texte: "·" },
    { texte: "il" },
    { texte: "court", focus: true },
  ],
  liens: [{ de: 3, vers: 6, label: "contredit", type: "accord" }],
  legende: "Ce que tu as écrit avant t'engage : le lecteur s'en souvient.",
});

const inventionRupture = phrase({
  mots: [
    { texte: "il" },
    { texte: "partit", focus: true },
    { texte: "·" },
    { texte: "il" },
    { texte: "part", focus: true },
  ],
  groupes: [
    { mots: [0, 1], label: "passé simple" },
    { mots: [3, 4], label: "présent" },
  ],
  legende: "Le système des temps doit tenir jusqu'au bout du récit.",
});

const inventionPointDeVue = phrase({
  mots: [
    { texte: "je", focus: true },
    { texte: "marchais" },
    { texte: "·" },
    { texte: "il" },
    { texte: "pensait", focus: true },
    { texte: "en" },
    { texte: "secret" },
  ],
  legende: "Celui qui dit « je » ne peut pas savoir ce qu'un autre pense.",
});

// ── LA RÉVISION : un défaut nommé, une correction faite.
const revisionMotVague = phrase({
  mots: [
    { texte: "un" },
    { texte: "truc", barre: true },
    { texte: "bizarre", barre: true },
    { texte: "→" },
    { texte: "une" },
    { texte: "ombre", focus: true },
    { texte: "immobile", focus: true },
  ],
  legende: "Le mot vague barré, le mot précis à côté. Une passe, un défaut.",
});

const revisionRepetition = phrase({
  mots: [
    { texte: "le" },
    { texte: "pêcheur" },
    { texte: "rentra" },
    { texte: "·" },
    { texte: "le" },
    { texte: "pêcheur", barre: true },
    { texte: "amarra" },
    { texte: "→" },
    { texte: "il", focus: true },
  ],
  legende: "La répétition se supprime en reprenant par un pronom.",
});

const revisionAccord = phrase({
  mots: [
    { texte: "les" },
    { texte: "allées", focus: true },
    { texte: "bordées" },
    { texte: "de" },
    { texte: "filaos" },
    { texte: "menait", barre: true },
    { texte: "→" },
    { texte: "menaient", focus: true },
  ],
  liens: [{ de: 1, vers: 7, label: "commande", type: "accord" }],
  legende: "Le sujet est loin de son verbe : c'est là que l'accord dérape.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcriture4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "ecriture",
  titre: `Écrire pour apprendre, inventer et réfléchir en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Sois clair », « fais des phrases courtes », « relis-toi » : ce ne sont pas des méthodes, ce sont des vœux. Un paragraphe de réflexion, lui, se compte — il tient sur trois pièces exactement, et si l'une manque, il ne prouve rien. Écrire s'apprend comme on apprend à monter un meuble : en sachant combien il y a de pièces, et où chacune va.",
  identite: [
    { label: "Mots clés", valeur: "Brouillon, cohérence, idée, exemple, lien, révision" },
    { label: "Le secret", valeur: "Compter les pièces, pas soigner le style" },
    { label: "Outil", valeur: "Une relecture, un défaut à la fois" },
  ],
  definition: {
    texte:
      "Écrire recouvre quatre gestes très différents, et les confondre fait perdre du temps. L'ÉCRIT DE TRAVAIL ne se rend pas : brouillon pour chercher, liste pour trier, schéma pour relier, reformulation pour vérifier qu'on a compris — il est à soi seul. Le TEXTE D'INVENTION demande de la cohérence bien plus que de l'imagination : ce qu'on a écrit trois lignes plus haut engage la suite, et c'est là que tout se joue. Le PARAGRAPHE DE RÉFLEXION tient sur trois pièces — une idée, un exemple pris dans le texte, et ce que cet exemple prouve — et le programme le dit ainsi : « au moins un argument et un exemple ». La RÉVISION, enfin, n'est pas une relecture : c'est une série de passes, chacune cherchant un seul défaut.",
  },
  figure: {
    schema: pile(paragrapheComplet, paragrapheSansLien),
    legende:
      "Un paragraphe de réflexion, démonté. En haut les trois pièces sont là : l'idée, l'exemple, et ce que l'exemple prouve — et il tient en deux lignes. En bas, la troisième manque : l'idée et l'exemple se suivent sans que rien ne dise ce qui les relie, et le paragraphe ne prouve plus rien. Les crochets ne marquent pas une fonction grammaticale ici : ils marquent les pièces d'un raisonnement.",
  },
  proprietes: [
    {
      titre: "L'écrit de travail ne se rend pas",
      texte:
        "Il n'est ni corrigé ni noté : il est à toi. Le brouillon sert à chercher, la liste à trier, le schéma à relier, la reformulation à vérifier.",
      schema: pile(ecritBrouillon, ecritReformulation),
      micros: ["4e_ecrit_notes"],
    },
    {
      titre: "Cinq besoins, cinq outils — pas un de plus",
      texte:
        "Trouver, choisir, relier, vérifier, garder. Demande-toi lequel tu cherches : à chacun correspond un écrit, et un seul.",
      schema: ecritReformulation,
      micros: ["4e_ecrit_notes"],
    },
    {
      titre: "Le vrai défaut d'un texte d'invention n'est pas le manque d'idées",
      texte:
        "C'est la contradiction. Un personnage blessé qui court, un prénom qui change, la nuit qui devient le jour : le lecteur se souvient de ce que tu as écrit.",
      schema: inventionContradiction,
      micros: ["4e_ecrit_invention"],
    },
    {
      titre: "Le système des temps et le point de vue tiennent jusqu'au bout",
      texte:
        "On ne bascule pas du passé simple au présent au milieu d'un paragraphe. Et celui qui dit « je » ne peut pas savoir ce qu'un autre pense en secret.",
      schema: pile(inventionRupture, inventionPointDeVue),
      micros: ["4e_ecrit_invention"],
    },
    {
      titre: "Trois pièces, et le paragraphe prouve",
      texte:
        "L'idée dit ce que tu soutiens. L'exemple vient du texte. Le lien dit ce que l'exemple montre. Enlève une pièce, et il ne prouve plus rien.",
      schema: paragrapheComplet,
      micros: ["4e_ecrit_reflexion"],
    },
    {
      titre: "Un paragraphe complet est COURT",
      texte:
        "Deux ou trois lignes suffisent. La longueur ne prouve rien — et allonger sert le plus souvent à masquer une pièce manquante.",
      schema: pile(paragrapheSansExemple, paragrapheComplet),
      micros: ["4e_ecrit_reflexion"],
    },
    {
      titre: "Réviser, c'est passer plusieurs fois, un défaut à la fois",
      texte:
        "Une passe pour les mots vagues, une pour les répétitions, une pour les accords à distance. Six passes courtes valent mieux qu'une longue relecture.",
      schema: pile(revisionMotVague, revisionRepetition, revisionAccord),
      micros: ["4e_ecrit_reviser"],
    },
  ],
  reel: {
    texte:
      "Les trois pièces du paragraphe ne servent pas qu'en français : elles sont la forme de tout argument écrit, partout. Une réclamation à un service client — voici le problème, voici la preuve, voici pourquoi cela vous engage — tient exactement dessus. Un compte rendu, une lettre de motivation, un message pour demander une dérogation aussi. Ce qui distingue une demande qui aboutit d'une demande qui reste sans réponse n'est presque jamais le ton : c'est la présence des trois pièces. La plupart des gens en écrivent deux, et s'étonnent qu'on ne les suive pas.",
  },
  historique: {
    texte:
      "Le brouillon a longtemps été honteux : on le brulait. Les écrivains du XVIIe siècle tenaient à donner l'impression d'une écriture venue d'un seul jet, et Boileau lui-même, qui recommandait de « polir sans cesse », publiait des vers dont on ignore les états successifs. Le renversement date du XXe siècle : quand les manuscrits de Flaubert, Proust ou Zola sont devenus consultables, on a découvert des pages entièrement raturées, des plans refaits dix fois, des phrases essayées sous six formes. Il existe aujourd'hui une discipline entière consacrée à cela — la critique génétique — et son résultat est simple à retenir : les textes qui semblent couler de source sont ceux qui ont été le plus repris.",
  },
  formule: {
    contexte: "Le contrôle à faire avant de rendre un paragraphe de réflexion.",
    expression: "l'idée ? l'exemple ? ce qu'il prouve ?",
    legende:
      "Trois questions, trois secondes. S'il manque l'exemple, le paragraphe affirme sans appuyer. S'il manque le lien, il juxtapose une idée et une citation sans dire ce qui les relie — c'est le défaut le plus fréquent, et le plus invisible pour celui qui écrit, parce qu'il a le lien dans la tête.",
    schema: paragrapheSansLien,
  },
  methode: [
    {
      titre: "Choisir son écrit de travail selon le besoin",
      texte:
        "Tu cherches ? Brouillon. Tu dois trier ? Liste. Tu perds le fil entre des idées ? Schéma. Tu crois avoir compris ? Reformule pour vérifier.",
      schema: pile(ecritBrouillon, ecritReformulation),
      micros: ["4e_ecrit_notes"],
    },
    {
      titre: "Relire son invention avec une seule question",
      texte:
        "À chaque phrase : avais-je le droit d'écrire ça, vu ce que j'ai écrit avant ? C'est la seule question qui trouve les cinq défauts de cohérence.",
      schema: pile(inventionContradiction, inventionRupture),
      micros: ["4e_ecrit_invention"],
    },
    {
      titre: "Compter les trois pièces avant de rendre",
      texte:
        "Idée, exemple, lien. Si les trois y sont, c'est fini : un paragraphe complet est court, et il n'a pas besoin d'être long.",
      schema: paragrapheComplet,
      micros: ["4e_ecrit_reflexion"],
    },
    {
      titre: "Faire six relectures courtes, pas une longue",
      texte:
        "Un défaut par passage : les mots vagues, les phrases qui disent trois choses, les liens logiques absents, les accords à distance, les répétitions, les mots d'un registre déplacé.",
      schema: pile(revisionMotVague, revisionAccord),
      micros: ["4e_ecrit_reviser"],
    },
  ],
  usages: [
    {
      titre: "Pour une réclamation ou une demande",
      detail:
        "Le problème, la preuve, ce qui vous engage. Les trois pièces du paragraphe sont la forme de tout argument écrit, partout.",
      schema: paragrapheComplet,
      micros: ["4e_ecrit_reflexion"],
    },
    {
      titre: "Pour apprendre une leçon : reformuler, pas recopier",
      detail:
        "Recopier ne prouve rien. Redire avec ses mots révèle immédiatement ce qu'on n'avait pas compris.",
      schema: ecritReformulation,
      micros: ["4e_ecrit_notes"],
    },
    {
      titre: "Pour se relire : lire tout haut",
      detail:
        "Une phrase trop longue s'entend avant de se voir. Si tu manques d'air, elle dit trop de choses : coupe-la.",
      schema: revisionRepetition,
      micros: ["4e_ecrit_reviser"],
    },
  ],
  exemples: [
    {
      titre: "Quel écrit de travail ?",
      donnees: "« Tu ne sais pas encore ce que tu vas dire, et tu dois commencer. »",
      schema: ecritBrouillon,
      question: "Quel outil te sert ici ?",
      solution:
        "Un BROUILLON : on écrit pour chercher, pas pour être lu. Écrire trois débuts différents pour voir lequel tient est exactement son usage — et c'est pour cela qu'il ne se corrige pas. Attendre d'avoir trouvé avant d'écrire est la meilleure façon de ne jamais commencer.",
      micros: ["4e_ecrit_notes"],
    },
    {
      titre: "Le défaut du brouillon",
      donnees: "« Ton personnage est blessé à la jambe au chapitre 1 ; il court au chapitre 2. »",
      schema: inventionContradiction,
      question: "Quel défaut, et comment l'éviter ?",
      solution:
        "Une INCOHÉRENCE. Ce n'est pas un manque d'imagination — c'est l'oubli de ce qu'on a écrit avant. Le lecteur, lui, s'en souvient. La parade tient en une question posée à chaque phrase : avais-je le droit d'écrire ça, vu ce qui précède ?",
      micros: ["4e_ecrit_invention"],
    },
    {
      titre: "Qui peut savoir quoi ?",
      donnees: "« Le narrateur dit “je”, puis raconte ce qu'un autre pense en secret. »",
      schema: inventionPointDeVue,
      question: "Pourquoi est-ce impossible ?",
      solution:
        "Parce que celui qui dit « je » ne sait que ce qu'il voit et ce qu'il pense lui-même. Pour raconter les pensées d'un autre, il faudrait qu'il les devine — et alors il faut l'écrire ainsi : « il avait l'air de penser que ». Le point de vue est un contrat passé avec le lecteur à la première ligne.",
      micros: ["4e_ecrit_invention"],
    },
    {
      titre: "Que manque-t-il ?",
      donnees: "« Le personnage est lâche. On le voit p. 40, quand il fuit sans prévenir. »",
      schema: paragrapheSansLien,
      question: "Ce paragraphe est-il complet ?",
      solution:
        "Non : il manque le LIEN. L'idée est là, l'exemple est là, mais rien ne dit ce que l'exemple prouve. Cela semble évident à celui qui écrit — il a le lien dans la tête — et cela ne l'est pas pour le lecteur. Il suffit d'ajouter : « et cette fuite le définit ».",
      micros: ["4e_ecrit_reflexion"],
    },
    {
      titre: "Et celui-ci ?",
      donnees: "« Le personnage est lâche, vraiment très lâche, du début à la fin. »",
      schema: paragrapheSansExemple,
      question: "Que manque-t-il ?",
      solution:
        "L'EXEMPLE. L'idée est posée, puis répétée avec des adverbes — et répéter n'est pas prouver. Un paragraphe qui ne cite rien du texte affirme, il ne démontre pas. C'est aussi le signe le plus fiable d'un devoir écrit sans avoir lu.",
      micros: ["4e_ecrit_reflexion"],
    },
    {
      titre: "Une passe de révision",
      donnees: "« Il y avait un truc bizarre dans cette pièce. »",
      schema: revisionMotVague,
      question: "Quelle correction appliques-tu ?",
      solution:
        "Tu remplaces le mot vague par le mot précis : « une ombre immobile », « une odeur de brulé », « un carton éventré ». « Truc » et « bizarre » ne montrent rien — et c'est précisément parce qu'ils sont commodes qu'ils reviennent. Une passe entière ne cherche que cela.",
      micros: ["4e_ecrit_reviser"],
    },
    {
      titre: "L'accord qui dérape",
      donnees: "« Les longues allées bordées de filaos menait vers la mer. »",
      schema: revisionAccord,
      question: "Où est la faute, et pourquoi arrive-t-elle là ?",
      solution:
        "« Menaient », au pluriel : le sujet est « les allées ». La faute vient de la distance — « bordées de filaos » sépare le sujet du verbe, et l'oreille garde « filaos ». C'est pour cela que la relecture des accords doit être une passe à part : on ne la fait pas en même temps qu'on cherche les répétitions.",
      micros: ["4e_ecrit_reviser"],
    },
  ],
  pieges: [
    "Attendre d'avoir trouvé avant d'écrire : le brouillon sert justement à chercher.",
    "Croire qu'un texte d'invention se juge sur l'imagination : il se juge d'abord sur la cohérence.",
    "Changer de temps ou de point de vue en cours de route : le lecteur s'en aperçoit toujours.",
    "Écrire une idée et une citation côte à côte sans dire ce qui les relie : c'est le défaut le plus fréquent.",
    "Allonger un paragraphe pour faire sérieux : un paragraphe complet est court.",
    "Relire une seule fois en cherchant tout : on ne voit un défaut que si on ne cherche que lui.",
  ],
  aRetenir: [
    "L'écrit de travail ne se rend pas : brouillon pour chercher, liste pour trier, schéma pour relier, reformulation pour vérifier.",
    "Le vrai défaut d'une invention est la contradiction, pas le manque d'idées.",
    "Un paragraphe de réflexion tient sur TROIS pièces : l'idée, l'exemple, ce qu'il prouve.",
    "Un paragraphe complet est court. La longueur ne prouve rien.",
    "Réviser, c'est six passes courtes, un défaut à la fois — jamais une relecture générale.",
  ],
  entrainement: [
    {
      question: "« Tu as douze idées et tu dois n'en garder que trois. » Quel écrit de travail ?",
      correction: "Une liste : on rassemble tout avant de trier et de choisir.",
      micros: ["4e_ecrit_notes"],
    },
    {
      question: "« Le héros piégé s'échappe parce qu'un inconnu ouvre la porte. » Quel défaut ?",
      correction: "Une solution tombée du ciel : rien ne l'annonçait dans le texte.",
      micros: ["4e_ecrit_invention"],
    },
    {
      question: "« P. 40 il fuit, p. 62 il se cache, p. 88 il ment. » Que manque-t-il ?",
      correction: "L'idée : trois exemples qui ne servent aucune thèse ne prouvent rien.",
      micros: ["4e_ecrit_reflexion"],
    },
    {
      question: "« La ville est hostile : p. 30, les rues se ferment sur le personnage. » Complet ?",
      correction: "Oui : une idée, un exemple, et ce qu'il montre. Deux lignes suffisent.",
      micros: ["4e_ecrit_reflexion"],
    },
    {
      question: "« Le pêcheur rentra. Le pêcheur amarra la barque du pêcheur. » Quelle correction ?",
      correction: "Supprimer la répétition en reprenant par un pronom : « il amarra sa barque ».",
      micros: ["4e_ecrit_reviser"],
    },
    {
      question: "« Il pleuvait. Ils décidèrent de partir quand même. » Que peux-tu ajouter ?",
      correction: "Le lien logique : « il pleuvait, POURTANT ils décidèrent de partir ».",
      micros: ["4e_ecrit_reviser"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesEcriture4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire - 4e",
    section: {
      type: "objectif",
      phrase: "Un paragraphe se compte, il ne se soigne pas",
      sousPhrase:
        "Trois pièces exactement : l'idée, l'exemple, et ce que l'exemple prouve. Si l'une manque, il ne prouve rien.",
      encadre: {
        titre: "L'idée",
        texte: "« Sois clair », « relis-toi » ne sont pas des méthodes : ce sont des vœux.",
      },
    },
  },
  {
    titre: "Les trois pièces",
    badge: "Écrire - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "L'idée", texte: "Ce que tu soutiens. « Il est lâche. »" },
        { titre: "L'exemple", texte: "Pris dans le texte, avec sa page. « p. 40, il fuit. »" },
        { titre: "Ce qu'il prouve", texte: "Le lien. « Et cette fuite le définit. »" },
        { titre: "Résultat", texte: "Deux lignes, et le paragraphe tient debout." },
      ],
    },
    schema: pile(paragrapheComplet, paragrapheSansLien),
  },
  {
    titre: "Le défaut invisible",
    badge: "Écrire - 4e",
    section: {
      type: "objectif",
      phrase: "Il manque presque toujours le LIEN",
      sousPhrase:
        "Celui qui écrit l'a dans la tête, donc il ne le voit pas manquer. Le lecteur, lui, ne l'a pas.",
    },
    schema: paragrapheSansLien,
  },
  {
    titre: "Inventer, c'est tenir ses promesses",
    badge: "Écrire - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Incohérence", texte: "Blessé au chapitre 1, il court au chapitre 2." },
        { titre: "Rupture de temps", texte: "« Il partit », puis « il part » trois lignes plus loin." },
        { titre: "Point de vue impossible", texte: "Celui qui dit « je » ne sait pas ce qu'un autre pense." },
        { titre: "La question", texte: "Avais-je le droit d'écrire ça, vu ce que j'ai écrit avant ?" },
      ],
    },
    schema: pile(inventionContradiction, inventionRupture),
  },
  {
    titre: "Six passes, un défaut chacune",
    badge: "Écrire - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Passe 1 : les mots vagues — truc, chose, bizarre.",
        "Passe 2 : les phrases qui disent trois choses.",
        "Passe 3 : les liens logiques absents.",
        "Passe 4 : les accords quand le sujet est loin.",
        "Passe 5 : les répétitions. Passe 6 : les mots d'un registre déplacé.",
      ],
    },
    schema: pile(revisionMotVague, revisionAccord),
  },
  {
    titre: "À vous",
    badge: "Écrire - 4e",
    section: {
      type: "exercice",
      enonce: "« Le personnage est lâche. On le voit p. 40, quand il fuit sans prévenir. »",
      question: "Ce paragraphe est-il complet ?",
      indice: "Compte les trois pièces.",
      correction:
        "Non : il manque le LIEN. Rien ne dit ce que l'exemple prouve. Il suffit d'ajouter « et cette fuite le définit » — trois mots, et le paragraphe démontre au lieu d'affirmer.",
    },
    schema: paragrapheSansLien,
  },
];
