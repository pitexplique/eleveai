// ─── Fiche de cours : la phrase complexe et ses subordonnées (4e) ─────────────
// LA PREMIÈRE FICHE DE FRANÇAIS DE LA 4e. La classe n'en avait aucune — zéro sur
// dix-neuf notions —, alors que son coach est le plus vérifié du collège.
//
// ⚠️ RÉFÉRENCE : programme de cycle 4 de l'arrêté du 9 novembre 2015, version
// consolidée au BO n° 31 du 30 juillet 2020. ⛔ NE PAS y recopier la fiche de 5e :
// la 5e est passée au BO n° 10 du 5 mars 2026, la 4e n'y basculera qu'en
// septembre 2027 (arbitrage de Frédéric, 25/08/2026 : « la bascule de 2027 on la
// fera dans 1 an »). Les deux textes ne disent pas la même chose — et sur le
// conditionnel, ils se contredisent.
//
// ⭐ POURQUOI CELLE-CI D'ABORD. « Fonctionnement de la phrase complexe » est une
// SECTION ENTIÈRE du programme de 4e, et c'est le seul endroit où le texte
// énumère lui-même ses cinq sortes de subordonnées. C'est aussi la notion qui
// commande tout le reste de l'année : on ne donne pas la fonction d'une
// subordonnée avant de savoir la repérer.
//
// ⭐ LE TITRE PORTE L'ANNÉE (demande de Frédéric, 24/08/2026). La requête tapée
// est « programme 4e 2026 2027 », pas « fiche de grammaire ». Le `titre` remonte
// dans le H1 ET dans tous les H2 de la page : l'écrire une fois le pose partout.
// ⚠️ Il nomme aussi le PDF : le changer rend l'ancien orphelin, et
// `npm run verifier:pdf` le signale.
//
// ⭐ ET LA MATIÈRE EST DANS LA DESCRIPTION DE LA PAGE, pas seulement dans l'URL.
// Mesuré le 25/08 : le mot « français » n'était dans AUCUN des 94 titres de
// fiches, et dans 10 descriptions — dont les 8 de la 5e, qui servent de modèle.
// Une requête « français 4e phrase complexe » doit trouver le mot sur la page.
//
// Alignée sur lib/tutor-v4/knowledge/francais/shared/buildCollegeFrancaisSources.ts
// (notions `phrase_complexe` et `phrase_subordonnees`) et sur les tables
// SIMPLE_COMPLEXE, LIENS, SUBORDONNEES, FONCTIONS, RELATIFS et PONCTUATION de
// lib/tutor-v4/questionBank/4e/francais/phrase-complexe.bank.ts.
//
// ⚠️ DEUX NOTIONS DU COACH, UNE SEULE FICHE. Le découpage du 24/08 a coupé
// « Fonctionnement de la phrase complexe » en deux — repérer les propositions
// d'un côté, analyser les subordonnées de l'autre — parce qu'une notion de six
// micros dépasse la règle des cinq. Mais c'est UNE section du programme, et elle
// s'enseigne d'un bloc : le `notion` ci-dessous porte la première, la fiche
// couvre les deux.
//
// Micro-compétences couvertes (les 6 des deux notions) :
// - 4e_phrc_simple_complexe      → définition, figure, propriété « On compte les
//                                  verbes conjugués », méthode 1, exemple 1
// - 4e_phrc_juxta_coord_sub      → propriété « Trois façons de relier »,
//                                  formule, méthode 2, exemples 2 et 3
// - 4e_phrc_ponctuation          → propriété « Le point-virgule relie »,
//                                  usages, exemple 4
// - 4e_phrc_subordonnees         → propriété « Cinq sortes, cinq indices »,
//                                  méthode 3, exemple 5, entraînements 3 et 4
// - 4e_phrc_fonction_subordonnee → propriété « La subordonnée a une fonction »,
//                                  méthode 4, exemple 6, entraînement 5
// - 4e_phrc_pronom_relatif       → propriété « Le relatif a DEUX rôles »,
//                                  méthode 5, exemple 7, entraînement 6
//
// Les phrases sont CELLES DE LA BANQUE, sans exception : « Il rentra, il posa
// son sac, il s'assit », « Quand la pluie cessa, nous sommes sortis », « Quel
// silence dans la cour ! », « Le vieux pêcheur répara longuement son filet
// déchiré », « Il rentra et il posa son sac », « Il rentra dès qu'il posa son
// sac », « Le vent se leva ; les volets claquèrent », « Je crois qu'il viendra
// demain », « Je me demande s'il viendra demain », « Le livre que tu m'as prêté
// est passionnant », « J'entends les oiseaux chanter au petit matin », « Le repas
// terminé, nous sommes sortis », « L'élève qui a répondu avait raison », « La
// maison où j'ai grandi a été vendue », « Il partit parce que la nuit tombait ».
// L'élève qui a lu la fiche doit retrouver SES phrases dans le coach.
//
// ⚠️ `largeurMax` VAUT 190, ET IL EST ÉCRIT. Le défaut du composant est 250, ce
// qui donne un viewBox de 260 ; le bloc qui reçoit un dessin ne fait que 225 px
// sur un téléphone de 375, et une légende en 12 px s'y afficherait en 10,4 —
// sous le plancher de REGLES.md § 2 quater. À 190, le dessin n'est pas réduit :
// la phrase se plie en deux lignes plutôt que de rapetisser.

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

// Le helper commun à toutes les fiches de français : une seule façon de dessiner
// une phrase, donc un seul dessin à reconnaître pour l'élève. La couleur des
// fonctions est déduite du label par le canvas (sujet bleu, verbe rouge, objet
// vert, circonstanciel orange, attribut violet, proposition indigo puis
// sarcelle, mot outil gris) : on ne l'écrit jamais ici.
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
        largeurMax: 190,
      }}
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

// ─── Les phrases de la banque, dessinées ──────────────────────────────────────
// ⚠️ UN MOT PAR ENTRÉE, la ponctuation comprise : c'est ainsi qu'on peut la
// montrer du doigt avec `focus`. Et la COULEUR NE S'ÉCRIT JAMAIS ICI — elle est
// déduite du `label` du groupe par le canvas (sujet bleu, verbe rouge, objet
// vert, circonstanciel orange, proposition indigo puis sarcelle, mot outil
// gris). Deux fiches ne peuvent donc pas diverger.

// LA FIGURE DE RÉFÉRENCE : trois propositions juxtaposées, et le compte des
// verbes conjugués qui les révèle. Ce que le dessin doit faire voir en une
// seconde : une virgule ne fait pas une proposition — c'est le verbe conjugué.
const phraseTroisPropositions = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentra", focus: true },
    { texte: "," },
    { texte: "il" },
    { texte: "posa", focus: true },
    { texte: "son" },
    { texte: "sac" },
    { texte: "," },
    { texte: "il" },
    { texte: "s'assit", focus: true },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [3, 6], label: "proposition 2" },
    { mots: [8, 9], label: "proposition 3" },
  ],
  legende: "On compte les verbes conjugués : trois. La phrase est complexe.",
});

const phraseSimpleLongue = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vieux" },
    { texte: "pêcheur" },
    { texte: "répara", focus: true },
    { texte: "longuement" },
    { texte: "son" },
    { texte: "filet" },
    { texte: "déchiré" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 3], label: "verbe" }],
  legende: "Un seul verbe conjugué : phrase simple, quelle que soit sa longueur.",
});

const phraseNonVerbale = phrase({
  mots: [
    { texte: "Quel" },
    { texte: "silence" },
    { texte: "dans" },
    { texte: "la" },
    { texte: "cour" },
    { texte: "!" },
  ],
  legende: "Rien à conjuguer : la phrase est non verbale.",
});

// ── Les trois liens : juxtaposition, coordination, subordination. Mêmes mots,
//    trois façons de les relier. C'est le montage qui rend la différence visible.
const phraseJuxtaposition = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentra" },
    { texte: ",", focus: true },
    { texte: "il" },
    { texte: "posa" },
    { texte: "son" },
    { texte: "sac" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [3, 6], label: "proposition 2" },
  ],
  legende: "Une virgule, et rien d'autre : les deux propositions sont à égalité.",
});

const phraseCoordination = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentra" },
    { texte: "et", focus: true },
    { texte: "il" },
    { texte: "posa" },
    { texte: "son" },
    { texte: "sac" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "proposition 1" },
    { mots: [2, 2], label: "coordination" },
    { mots: [3, 6], label: "proposition 2" },
  ],
  legende: "Un mot de liaison les relie, et elles restent à égalité.",
});

const phraseSubordination = phrase({
  mots: [
    { texte: "Il" },
    { texte: "rentra" },
    { texte: "dès qu'", focus: true },
    { texte: "il" },
    { texte: "posa" },
    { texte: "son" },
    { texte: "sac" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "principale" },
    { mots: [2, 6], label: "subordonnée" },
  ],
  legende: "« Dès que » enferme la seconde : elle DÉPEND de la première.",
});

const phrasePointVirgule = phrase({
  mots: [
    { texte: "Le" },
    { texte: "vent" },
    { texte: "se" },
    { texte: "leva" },
    { texte: ";", focus: true },
    { texte: "les" },
    { texte: "volets" },
    { texte: "claquèrent" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 3], label: "proposition 1" },
    { mots: [5, 7], label: "proposition 2" },
  ],
  legende: "Il juxtapose, comme la virgule — mais il unit deux propositions entières.",
});

// ── Les cinq sortes de subordonnées, chacune avec son indice de reconnaissance.
const phraseConjonctive = phrase({
  mots: [
    { texte: "Je" },
    { texte: "crois" },
    { texte: "qu'", focus: true },
    { texte: "il" },
    { texte: "viendra" },
    { texte: "demain" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 5], label: "subordonnée" }],
  legende: "Introduite par « que », et elle complète le verbe « crois ».",
});

const phraseInterrogativeIndirecte = phrase({
  mots: [
    { texte: "Je" },
    { texte: "me" },
    { texte: "demande" },
    { texte: "s'", focus: true },
    { texte: "il" },
    { texte: "viendra" },
    { texte: "demain" },
    { texte: "." },
  ],
  groupes: [{ mots: [3, 6], label: "subordonnée" }],
  legende: "Une question rapportée : ni inversion, ni point d'interrogation.",
});

const phraseRelative = phrase({
  mots: [
    { texte: "Le" },
    { texte: "livre" },
    { texte: "que", focus: true },
    { texte: "tu" },
    { texte: "m'as" },
    { texte: "prêté" },
    { texte: "est" },
    { texte: "passionnant" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 5], label: "subordonnée" }],
  liens: [{ de: 2, vers: 1, label: "reprend", type: "reprise" }],
  legende: "« Que » reprend « livre » : c'est son antécédent.",
});

const phraseInfinitive = phrase({
  mots: [
    { texte: "J'" },
    { texte: "entends" },
    { texte: "les" },
    { texte: "oiseaux" },
    { texte: "chanter", focus: true },
    { texte: "au" },
    { texte: "petit" },
    { texte: "matin" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "subordonnée" }],
  legende: "Son verbe est à l'infinitif, et il a son propre sujet : « les oiseaux ».",
});

const phraseParticipiale = phrase({
  mots: [
    { texte: "Le" },
    { texte: "repas" },
    { texte: "terminé", focus: true },
    { texte: "," },
    { texte: "nous" },
    { texte: "sommes" },
    { texte: "sortis" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 2], label: "subordonnée" }],
  legende: "Aucun mot ne l'introduit : c'est le participe qui la fait tenir.",
});

// ── La fonction de la subordonnée : elle occupe la place d'un groupe.
const phraseFonctionCod = phrase({
  mots: [
    { texte: "Je" },
    { texte: "crois" },
    { texte: "qu'" },
    { texte: "il" },
    { texte: "viendra" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 4], label: "objet" }],
  legende: "Remplace-la par « cela » : « je crois CELA ». C'est un COD.",
});

const phraseFonctionCirconstancielle = phrase({
  mots: [
    { texte: "Quand" },
    { texte: "la" },
    { texte: "cloche" },
    { texte: "sonna" },
    { texte: "," },
    { texte: "les" },
    { texte: "élèves" },
    { texte: "sortirent" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 3], label: "circonstanciel" }],
  legende: "Elle se déplace et s'efface : circonstancielle de temps.",
});

const phraseFonctionAntecedent = phrase({
  mots: [
    { texte: "Le" },
    { texte: "livre" },
    { texte: "que" },
    { texte: "tu" },
    { texte: "m'as" },
    { texte: "prêté" },
    { texte: "est" },
    { texte: "passionnant" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 5], label: "complément du nom" }],
  liens: [{ de: 2, vers: 1, label: "complète", type: "accord" }],
  legende: "Elle complète le NOM « livre », jamais le verbe.",
});

// ── Le pronom relatif a DEUX rôles à la fois : il reprend l'antécédent, et il
//    occupe une fonction DANS sa subordonnée. C'est le point le plus difficile.
const phraseRelatifSujet = phrase({
  mots: [
    { texte: "L'" },
    { texte: "élève" },
    { texte: "qui", focus: true },
    { texte: "a" },
    { texte: "répondu" },
    { texte: "avait" },
    { texte: "raison" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "sujet" }],
  liens: [{ de: 2, vers: 1, label: "reprend", type: "reprise" }],
  legende: "Qui a répondu ? « qui », donc l'élève : le relatif est SUJET.",
});

const phraseRelatifCod = phrase({
  mots: [
    { texte: "Le" },
    { texte: "livre" },
    { texte: "que", focus: true },
    { texte: "tu" },
    { texte: "m'as" },
    { texte: "prêté" },
    { texte: "est" },
    { texte: "passionnant" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "objet" }],
  legende: "Tu m'as prêté QUOI ? « que », donc le livre : le relatif est COD.",
});

const phraseRelatifLieu = phrase({
  mots: [
    { texte: "La" },
    { texte: "maison" },
    { texte: "où", focus: true },
    { texte: "j'" },
    { texte: "ai" },
    { texte: "grandi" },
    { texte: "a" },
    { texte: "été" },
    { texte: "vendue" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 2], label: "circonstanciel" }],
  legende: "J'ai grandi OÙ ? « où », donc dans la maison : circonstanciel de lieu.",
});

const phraseCause = phrase({
  mots: [
    { texte: "Il" },
    { texte: "partit" },
    { texte: "parce que", focus: true },
    { texte: "la" },
    { texte: "nuit" },
    { texte: "tombait" },
    { texte: "." },
  ],
  groupes: [{ mots: [2, 5], label: "circonstanciel" }],
  legende: "« Parce que » : elle dit POURQUOI, et elle peut passer en tête.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const fichePhraseComplexe4e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "4e",
  notion: "phrase-complexe",
  titre: `La phrase complexe et ses subordonnées en 4e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Le vieux pêcheur répara longuement son filet déchiré » fait sept mots et une virgule de moins que « Il rentra, il posa son sac ». Et pourtant, la longue est SIMPLE et la courte est COMPLEXE. Ce n'est jamais la longueur qui décide : c'est le nombre de verbes conjugués.",
  identite: [
    { label: "Mots clés", valeur: "Proposition, juxtaposition, coordination, subordination, relative" },
    { label: "Le secret", valeur: "Compter les verbes conjugués" },
    { label: "Outil", valeur: "Remplacer la subordonnée par « cela »" },
  ],
  definition: {
    texte:
      "Chaque verbe conjugué ouvre une PROPOSITION. Une phrase qui n'en compte qu'un est simple ; deux ou plus, elle est complexe ; aucun, elle est non verbale. Dans une phrase complexe, les propositions se relient de trois façons : la juxtaposition les sépare par un signe de ponctuation, la coordination les relie par un petit mot, et la subordination en rend une dépendante de l'autre. Une proposition subordonnée n'est pas un morceau de phrase en trop : elle occupe la place d'un groupe, et elle en a la fonction — complément d'objet, complément circonstanciel, ou complément d'un nom.",
  },
  figure: {
    schema: pile(phraseTroisPropositions, phraseSimpleLongue, phraseNonVerbale),
    legende:
      "Les trois cas, l'un sous l'autre. Le verbe est rouge — la même couleur que dans toutes les fiches de français. Compte les rouges : trois, puis un, puis aucun. C'est cela qui donne la réponse, jamais la longueur de la phrase ni le nombre de virgules.",
  },
  /* ⭐ CHAQUE BLOC CITE SES MICROS, DANS LA DONNÉE ET PAS EN COMMENTAIRE.
     Le champ `micros` existe depuis le 25/08/2026 et il est optionnel : les
     fiches écrites avant continuent de s'afficher à l'identique. Ici il est
     rempli partout — c'est la première fiche de français de la 4e, elle n'a
     aucune dette à rattraper. */
  proprietes: [
    {
      titre: "On compte les verbes CONJUGUÉS",
      texte:
        "Un infinitif ou un participe ne compte pas : « Il sortit pour acheter du pain » n'a qu'un verbe conjugué, donc une seule proposition.",
      schema: pile(phraseSimpleLongue, phraseNonVerbale),
      micros: ["4e_phrc_simple_complexe"],
    },
    {
      titre: "Trois façons de relier, et une seule crée une dépendance",
      texte:
        "Juxtaposées ou coordonnées, les propositions restent à égalité : on peut couper la phrase en deux. Subordonnée, la seconde tombe toute seule.",
      schema: pile(phraseJuxtaposition, phraseCoordination, phraseSubordination),
      micros: ["4e_phrc_juxta_coord_sub"],
    },
    {
      titre: "Le point-virgule relie deux propositions entières",
      texte:
        "C'est son rôle syntaxique : plus fort que la virgule, moins fort que le point. Il juxtapose deux propositions qui pourraient vivre seules.",
      schema: phrasePointVirgule,
      micros: ["4e_phrc_ponctuation"],
    },
    {
      titre: "Cinq sortes de subordonnées, cinq indices",
      texte:
        "La conjonctive suit « que », l'interrogative indirecte rapporte une question, la relative a un antécédent, l'infinitive a un verbe à l'infinitif, la participiale un participe et aucun mot introducteur.",
      schema: pile(phraseConjonctive, phraseInterrogativeIndirecte, phraseRelative),
      micros: ["4e_phrc_subordonnees"],
    },
    {
      titre: "Les deux qu'on oublie toujours",
      texte:
        "L'infinitive et la participiale n'ont ni « que » ni pronom relatif — et ce sont bien des propositions : elles ont leur verbe et leur propre sujet.",
      schema: pile(phraseInfinitive, phraseParticipiale),
      micros: ["4e_phrc_subordonnees"],
    },
    {
      titre: "Une subordonnée a une FONCTION",
      texte:
        "Elle occupe la place d'un groupe : objet du verbe, circonstanciel déplaçable, ou complément d'un nom. C'est cette place qu'on nomme.",
      schema: pile(phraseFonctionCod, phraseFonctionCirconstancielle, phraseFonctionAntecedent),
      micros: ["4e_phrc_fonction_subordonnee"],
    },
    {
      titre: "Le pronom relatif a DEUX rôles à la fois",
      texte:
        "Il reprend son antécédent dans la principale, ET il occupe une fonction dans sa subordonnée. Les deux se cherchent séparément.",
      schema: pile(phraseRelatifSujet, phraseRelatifCod, phraseRelatifLieu),
      micros: ["4e_phrc_pronom_relatif"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui décide du sens d'un règlement ou d'un contrat. « Les élèves qui ont un mot d'excuse entreront » ne dit pas la même chose que « Les élèves, qui ont un mot d'excuse, entreront » : sans virgules, la relative trie — seuls ceux qui ont un mot entrent ; avec les virgules, elle ajoute une précision et tout le monde entre. Deux virgules, et la moitié de la classe reste dehors. Les juristes appellent cela une relative déterminative et une relative explicative, et des procès entiers se sont joués là-dessus.",
  },
  historique: {
    texte:
      "L'analyse en propositions vient des grammairiens grecs, mais c'est le latin qui lui a donné sa forme scolaire : la langue de Cicéron construit des phrases où six ou sept subordonnées s'emboitent, et les élèves romains apprenaient à les démonter avant de les écrire. Le français du XVIIe siècle a hérité de cette période longue — une phrase de Bossuet tient parfois une page. Au XIXe, Flaubert la casse volontairement en propositions courtes et juxtaposées pour imiter le rythme de la pensée, et au XXe, Céline la réduit à des éclats séparés par des points de suspension. Choisir de subordonner ou de juxtaposer n'est donc pas une question de correction : c'est un choix de style, et il s'entend.",
  },
  formule: {
    contexte: "Le test qui sépare la coordination de la subordination, à coup sûr.",
    expression: "je coupe après le petit mot : la seconde tient-elle debout ?",
    legende:
      "« Il rentra / et il posa son sac » : les deux tiennent. C'est de la coordination. « Il rentra / dès qu'il posa son sac » : « dès qu'il posa son sac » ne tient pas seule. C'est de la subordination — et le petit mot appartient à la subordonnée, pas à la principale.",
    schema: phraseSubordination,
  },
  methode: [
    {
      titre: "Compter les verbes conjugués",
      texte:
        "Souligne chaque verbe conjugué. Un seul : phrase simple, tu t'arrêtes là. Deux ou plus : phrase complexe, tu continues.",
      schema: phraseTroisPropositions,
      micros: ["4e_phrc_simple_complexe"],
    },
    {
      titre: "Nommer le lien entre chaque paire",
      texte:
        "Regarde ce qui sépare deux propositions : un signe seul, c'est une juxtaposition ; un mot de liaison, une coordination ; un mot qui rend la seconde dépendante, une subordination.",
      schema: pile(phraseJuxtaposition, phraseCoordination),
      micros: ["4e_phrc_juxta_coord_sub"],
    },
    {
      titre: "Reconnaitre la sorte de la subordonnée",
      texte:
        "Cherche son mot introducteur. « Que » seul : conjonctive. Un relatif avec un antécédent : relative. Une question rapportée : interrogative indirecte. Pas de mot du tout : regarde le verbe, infinitif ou participe.",
      schema: pile(phraseConjonctive, phraseRelative, phraseParticipiale),
      micros: ["4e_phrc_subordonnees"],
    },
    {
      titre: "Donner sa fonction : remplacer par un mot",
      texte:
        "Remplace la subordonnée entière par « cela ». Si la phrase tient, c'est un COD. Si elle se déplace et s'efface, c'est un circonstanciel. Si elle suit un nom, elle le complète.",
      schema: pile(phraseFonctionCod, phraseFonctionCirconstancielle),
      micros: ["4e_phrc_fonction_subordonnee"],
    },
    {
      titre: "Trouver la fonction du relatif : poser la question DANS la subordonnée",
      texte:
        "Cache la principale et pose la question au verbe de la subordonnée. « Qui a répondu ? » → sujet. « Tu m'as prêté quoi ? » → COD. « J'ai grandi où ? » → circonstanciel de lieu.",
      schema: pile(phraseRelatifSujet, phraseRelatifCod),
      micros: ["4e_phrc_pronom_relatif"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire : varier les liens",
      detail:
        "Trois propositions juxtaposées de suite donnent un rythme haché. Un « parce que » ou un « alors que » lie les idées et montre que tu raisonnes.",
      schema: phraseCause,
      micros: ["4e_phrc_juxta_coord_sub"],
    },
    {
      titre: "Pour lire : la subordonnée porte l'information",
      detail:
        "Dans un article, l'essentiel est souvent dans la subordonnée : « Le maire, qui n'était pas présent, a démenti. » C'est là qu'est le fait.",
      schema: phraseFonctionAntecedent,
      micros: ["4e_phrc_fonction_subordonnee"],
    },
    {
      titre: "Pour ponctuer : le point-virgule est un outil, pas un ornement",
      detail:
        "Il lie deux propositions dont le rapport est évident sans mot pour le dire. Le point les sépare ; la virgule seule serait trop faible.",
      schema: phrasePointVirgule,
      micros: ["4e_phrc_ponctuation"],
    },
  ],
  exemples: [
    {
      titre: "Simple ou complexe ?",
      donnees: "« Quand la pluie cessa, nous sommes sortis. »",
      schema: phraseFonctionCirconstancielle,
      question: "Cette phrase est-elle simple ou complexe ?",
      solution:
        "Deux verbes conjugués : « cessa » et « sommes sortis ». La phrase est donc COMPLEXE, avec deux propositions. Et « Quand la pluie cessa » ne tient pas debout toute seule : elle est subordonnée à l'autre.",
      micros: ["4e_phrc_simple_complexe"],
    },
    {
      titre: "Quel lien entre les propositions ?",
      donnees: "« Il rentra, il posa son sac. »",
      schema: phraseJuxtaposition,
      question: "Comment les deux propositions sont-elles reliées ?",
      solution:
        "Une virgule, et aucun mot de liaison : c'est une JUXTAPOSITION. Les deux propositions restent à égalité, et l'on pourrait mettre un point à la place de la virgule sans rien casser.",
      micros: ["4e_phrc_juxta_coord_sub"],
    },
    {
      titre: "Coordination ou subordination ?",
      donnees: "« Il rentra dès qu'il posa son sac. »",
      schema: phraseSubordination,
      question: "Le lien est-il une coordination ou une subordination ?",
      solution:
        "Coupe après « dès que » : « il posa son sac » tient debout, mais « dès qu'il posa son sac » ne tient pas. Le petit mot rend la seconde dépendante : c'est une SUBORDINATION, et il appartient à la subordonnée.",
      micros: ["4e_phrc_juxta_coord_sub"],
    },
    {
      titre: "Le rôle d'un signe de ponctuation",
      donnees: "« Le vent se leva ; les volets claquèrent. »",
      schema: phrasePointVirgule,
      question: "Quel est le rôle syntaxique du point-virgule ici ?",
      solution:
        "Il JUXTAPOSE deux propositions entières, sans mot de liaison. Son rôle est syntaxique, pas respiratoire : il unit deux propositions plus étroitement qu'un point ne le ferait, et sans nommer le rapport — ici, une conséquence.",
      micros: ["4e_phrc_ponctuation"],
    },
    {
      titre: "Quelle sorte de subordonnée ?",
      donnees: "« J'entends les oiseaux chanter au petit matin. »",
      schema: phraseInfinitive,
      question: "De quelle sorte de proposition subordonnée s'agit-il ?",
      solution:
        "« Chanter » est à l'infinitif et il a son propre sujet, « les oiseaux » : c'est une proposition subordonnée INFINITIVE. Aucun mot ne l'introduit — c'est justement son indice, et c'est pourquoi on l'oublie.",
      micros: ["4e_phrc_subordonnees"],
    },
    {
      titre: "La fonction de la subordonnée",
      donnees: "« Je crois qu'il viendra demain. »",
      schema: phraseFonctionCod,
      question: "Quelle est la fonction de la proposition subordonnée ?",
      solution:
        "Remplace-la par « cela » : « je crois CELA ». La phrase tient, et « cela » est complément d'objet direct. La subordonnée est donc COD du verbe « crois ».",
      micros: ["4e_phrc_fonction_subordonnee"],
    },
    {
      titre: "La fonction du pronom relatif",
      donnees: "« La maison où j'ai grandi a été vendue. »",
      schema: phraseRelatifLieu,
      question: "Quelle est la fonction du pronom relatif « où » ?",
      solution:
        "Cache la principale et pose la question au verbe de la subordonnée : « j'ai grandi OÙ ? » → « où », c'est-à-dire dans la maison. Le relatif est complément circonstanciel de LIEU dans sa subordonnée — et il reprend « la maison » dans la principale. Deux rôles à la fois.",
      micros: ["4e_phrc_pronom_relatif"],
    },
  ],
  pieges: [
    "Compter les virgules au lieu des verbes conjugués : « Le vieux pêcheur répara longuement son filet déchiré » n'a qu'un verbe, donc une seule proposition, malgré sa longueur.",
    "Prendre un infinitif ou un participe pour un verbe conjugué : « Il sortit pour acheter du pain » ne compte qu'UNE proposition.",
    "Oublier l'infinitive et la participiale parce qu'aucun mot ne les introduit : ce sont pourtant des propositions, avec leur verbe et leur propre sujet.",
    "Confondre la SORTE d'une subordonnée et sa FONCTION : « relative » dit comment elle est faite, « complément du nom » dit la place qu'elle occupe.",
    "Donner au pronom relatif la fonction qu'il a dans la principale : on pose toujours la question au verbe de SA subordonnée, principale cachée.",
    "Croire que le petit mot appartient à la principale : dans « il rentra dès qu'il posa son sac », « dès que » fait partie de la subordonnée.",
  ],
  aRetenir: [
    "Un verbe conjugué = une proposition. Un seul : phrase simple. Deux ou plus : phrase complexe. Aucun : phrase non verbale.",
    "Juxtaposition (un signe), coordination (un petit mot), subordination (une dépendance) — et seule la troisième empêche de couper la phrase en deux.",
    "Cinq sortes de subordonnées : conjonctive, interrogative indirecte, relative, infinitive, participiale.",
    "Une subordonnée a une fonction : remplace-la par « cela » pour la trouver.",
    "Le pronom relatif a deux rôles : il reprend son antécédent, et il occupe une fonction dans sa subordonnée.",
  ],
  entrainement: [
    {
      question: "« Quel silence dans la cour ! » Simple, complexe, ou non verbale ?",
      correction: "Non verbale : aucun verbe conjugué.",
      micros: ["4e_phrc_simple_complexe"],
    },
    {
      question: "« Il pleuvait, mais personne ne rentrait. » Quel lien relie les propositions ?",
      correction: "Une coordination : « mais » relie deux propositions à égalité, et il les oppose.",
      micros: ["4e_phrc_juxta_coord_sub"],
    },
    {
      question: "« Je me demande s'il viendra demain. » Quelle sorte de subordonnée ?",
      correction: "Interrogative indirecte : une question rapportée, sans inversion ni point d'interrogation.",
      micros: ["4e_phrc_subordonnees"],
    },
    {
      question: "« Le repas terminé, nous sommes sortis. » Quelle sorte de subordonnée ?",
      correction: "Participiale : son verbe est au participe, elle a son propre sujet, et aucun mot ne l'introduit.",
      micros: ["4e_phrc_subordonnees"],
    },
    {
      question: "« Il partit parce que la nuit tombait. » Quelle est la fonction de la subordonnée ?",
      correction: "Complément circonstanciel de cause : elle dit pourquoi, et elle peut passer en tête de phrase.",
      micros: ["4e_phrc_fonction_subordonnee"],
    },
    {
      question: "« L'élève qui a répondu avait raison. » Quelle est la fonction du pronom relatif ?",
      correction: "Sujet du verbe de la subordonnée : c'est « qui » qui a répondu.",
      micros: ["4e_phrc_pronom_relatif"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=4e",
};

export const slidesPhraseComplexe4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La phrase complexe - 4e",
    section: {
      type: "objectif",
      phrase: "Savoir découper une phrase en propositions",
      sousPhrase:
        "Les compter, nommer ce qui les relie, reconnaitre les cinq sortes de subordonnées et donner leur fonction.",
      encadre: {
        titre: "L'idée",
        texte: "Un verbe conjugué = une proposition. Ce n'est jamais la longueur qui décide.",
      },
    },
  },
  {
    titre: "Ce n'est pas la longueur",
    badge: "La phrase complexe - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "SIMPLE", texte: "« Le vieux pêcheur répara longuement son filet déchiré. » Huit mots, un seul verbe conjugué." },
        { titre: "COMPLEXE", texte: "« Il rentra, il posa son sac. » Cinq mots, deux verbes conjugués." },
        { titre: "NON VERBALE", texte: "« Quel silence dans la cour ! » Aucun verbe à conjuguer." },
      ],
    },
    schema: pile(phraseSimpleLongue, phraseJuxtaposition),
  },
  {
    titre: "Trois façons de relier",
    badge: "La phrase complexe - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Juxtaposition", texte: "Un signe de ponctuation, et rien d'autre. Les deux propositions restent à égalité." },
        { titre: "Coordination", texte: "Un petit mot les relie — et il précise : « et » ajoute, « mais » oppose, « car » explique." },
        { titre: "Subordination", texte: "Un mot rend la seconde dépendante : elle ne tient plus debout toute seule." },
      ],
    },
    schema: pile(phraseJuxtaposition, phraseCoordination, phraseSubordination),
  },
  {
    titre: "Le test qui tranche",
    badge: "La phrase complexe - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je coupe la phrase juste après le petit mot de liaison.",
        "Je lis la seconde partie toute seule, à voix haute.",
        "Elle tient debout ? C'est une coordination.",
        "Elle ne tient pas ? C'est une subordination — et le petit mot appartient à la subordonnée.",
      ],
    },
    schema: phraseSubordination,
  },
  {
    titre: "Cinq sortes de subordonnées",
    badge: "La phrase complexe - 4e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Conjonctive", texte: "Introduite par « que ». « Je crois QU'il viendra demain. »" },
        { titre: "Interrogative indirecte", texte: "Une question rapportée. « Je me demande S'il viendra. »" },
        { titre: "Relative", texte: "Un pronom relatif, et un antécédent. « Le livre QUE tu m'as prêté... »" },
        { titre: "Infinitive et participiale", texte: "Aucun mot introducteur : c'est le verbe qui les révèle." },
      ],
    },
    schema: pile(phraseConjonctive, phraseRelative, phraseParticipiale),
  },
  {
    titre: "Sa fonction : la remplacer par « cela »",
    badge: "La phrase complexe - 4e",
    section: {
      type: "etapes",
      etapes: [
        "Je remplace la subordonnée entière par « cela ».",
        "La phrase tient et « cela » complète le verbe ? C'est un COD.",
        "Elle se déplace en tête et peut s'effacer ? C'est un circonstanciel.",
        "Elle suit un nom et le complète ? C'est un complément du nom.",
      ],
    },
    schema: pile(phraseFonctionCod, phraseFonctionCirconstancielle),
  },
  {
    titre: "Le relatif a DEUX rôles",
    badge: "La phrase complexe - 4e",
    section: {
      type: "exemple",
      enonce: "« La maison où j'ai grandi a été vendue. »",
      question: "Quelle est la fonction du pronom relatif « où » ?",
      correction:
        "Dans la principale, « où » reprend « la maison » : c'est son antécédent. Dans sa subordonnée, on pose la question au verbe : « j'ai grandi OÙ ? » — le relatif est complément circonstanciel de lieu. Les deux rôles se cherchent séparément.",
    },
    schema: phraseRelatifLieu,
  },
  {
    titre: "À vous",
    badge: "La phrase complexe - 4e",
    section: {
      type: "exercice",
      enonce: "« Il partit parce que la nuit tombait. »",
      question: "Combien de propositions, quel lien, et quelle fonction pour la subordonnée ?",
      indice: "Commence par souligner les verbes conjugués.",
      correction:
        "Deux verbes conjugués — « partit » et « tombait » — donc deux propositions. « Parce que » rend la seconde dépendante : subordination. Et elle dit POURQUOI, elle peut passer en tête : complément circonstanciel de cause.",
    },
    schema: phraseCause,
  },
];
