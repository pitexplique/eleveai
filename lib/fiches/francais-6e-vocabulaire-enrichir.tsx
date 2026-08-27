// ─── Fiche de cours : comprendre un mot inconnu (6e) ──────────────────────────
// LA DIXIÈME FICHE DE FRANÇAIS DE LA 6e, et la première hors de l'étude de la
// langue : les neuf existantes sont toutes de grammaire ou de conjugaison.
//
// ⚠️⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Sixième ». ⛔⛔ LA 6e FERME LE CYCLE 3, avec le CM1
// et le CM2 — elle NE SUIT PAS le programme de cycle 4. Ne jamais lui appliquer
// une logique de 5e : c'est l'erreur la plus couteuse du chantier, et deux
// sessions l'ont failli faire.
//
// ⛔⛔ ET LA PREUVE QUE CE N'EST PAS LA MÊME LEÇON QU'EN 5e. `vocabulaire_enrichir`
// existe dans les deux classes, sous le même nom, et ne porte PAS le même
// contenu :
//     5e → inférer par le contexte · lire un article de dictionnaire · réemployer
//     6e → déduire du contexte · CHOISIR SA STRATÉGIE · le SENS FIGURÉ · un défi
// Le sens figuré est ici en 6e ; en 5e il est dans `vocabulaire_jouer`. Le
// dictionnaire est en 5e ; ici il n'est que la TROISIÈME stratégie, celle qu'on
// essaie en dernier. Copier la fiche de 5e aurait donc produit un hors-programme
// parfaitement crédible.
//
// ⭐ CE QUE LE CYCLE 3 AJOUTE ET QUE LE CYCLE 4 N'A PAS : LA MICRO « DÉFI ».
// Chaque notion de 6e en porte une, et REGLES.md est explicite — « le défi a son
// propre dessin ». Elle n'est pas un exercice de plus : c'est le moment où
// l'élève choisit seul, sans qu'on lui dise quoi appliquer.
//
// ⭐ TROIS DESSINS, TROIS MÉCANISMES :
//   • l'ARC DE QUESTION (violet) va du mot inconnu vers l'indice qui l'éclaire —
//     repris de `francais-4e-lecture-comprehension.tsx` ;
//   • les WAGONS démontent le mot quand l'indice est DANS le mot (in-altér-able),
//     avec la correspondance fixe préfixe/radical/suffixe ;
//   • `number_line` range les trois stratégies DANS L'ORDRE où on les essaie —
//     déduire, vérifier, chercher. C'est un ordre, donc une échelle.
//
// ⛔ RÈGLE DE COULEUR : un crochet qui n'est pas une fonction reste GRIS, et cela
// se vérifie AU RENDU. Une étiquette « le sujet » est sortie en bleu dans
// `francais-5e-oral-ecouter.tsx` parce que `couleurFonction` teste
// `includes("sujet")`. Mots piégés : sujet, verbe, objet, nom, attribut,
// circonstanciel, proposition, coordination.
//
// Alignée sur les items `6e_fr_fixed_enri_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts (couche fixe réécrite le
// 22/08/2026 contre le BO du cycle 3) et sur les gabarits de
// buildCycle3FrancaisBank.
//
// Micro-compétences couvertes (les 4 de la notion `vocabulaire_enrichir`) :
// - 6e_voc_contexte    → figure, propriétés 1 et 2, formule, méthode 1, usage 1,
//                        exemples 1 et 2
// - 6e_voc_strategies  → propriétés 3 et 4, méthodes 2 et 3, usage 2, exemple 3
// - 6e_voc_sens_figure → propriétés 5 et 6, méthode 4, usage 3, exemples 4 et 5
// - 6e_voc_sens_defi   → propriété 7, exemple 6
//
// ⛔ RAPPEL DES PIÈGES DE FABRICATION : aucun `titre` sur un dessin `phrase` ; le
// canvas `conjugaison` imprime « infinitif : » EN DUR si on lui envoie le champ
// — ne pas l'envoyer sur un mot dérivé ; un mot par entrée ; les blocs
// n'interprètent pas le markdown.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonSegment,
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

/** Le mot démonté. ⛔ Correspondance FIXE, celle de la 4e et de la 5e :
 *  `temps` = préfixe (orange) · `radical` = radical (bleu) · `personne` =
 *  suffixe (vert). ⚠️ `note` en huit signes : c'est elle qui fixe la largeur. */
function morceaux(opts: { segments: ConjugaisonSegment[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{ kind: "conjugaison", mode: "wagons", segments: opts.segments, legende: opts.legende }}
    />
  );
}

/** Les trois stratégies, dans l'ORDRE où on les essaie. ⚠️ `showValues: false` :
 *  il n'y a pas de nombres, seulement un ordre. */
function echelle(points: NumberLineCanvasPoint[]) {
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

function pile(...blocs: ReactNode[]) {
  return (
    <div className="grid gap-4">
      {blocs.map((bloc, i) => (
        <div key={i}>{bloc}</div>
      ))}
    </div>
  );
}

// ─── Ce qui se dessine quand on bute sur un mot ───────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : l'indice est dans la phrase, et l'arc y mène.
const contexteSerpentait = phrase({
  mots: [
    { texte: "Le" },
    { texte: "sentier" },
    { texte: "serpentait", focus: true },
    { texte: "entre" },
    { texte: "les" },
    { texte: "arbres", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 2, vers: 5, label: "éclairé par", type: "question" }],
  legende: "Un sentier entre les arbres ne va pas droit : serpenter, c'est faire des courbes.",
});

const contexteSextant = phrase({
  mots: [
    { texte: "Il" },
    { texte: "consulta" },
    { texte: "le" },
    { texte: "sextant", focus: true },
    { texte: "pour" },
    { texte: "se" },
    { texte: "repérer", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 3, vers: 6, label: "sert à", type: "question" }],
  legende: "On le CONSULTE, et c'est pour se repérer : un instrument de navigation.",
});

const contexteBlanc = phrase({
  mots: [
    { texte: "Le" },
    { texte: "sentier" },
    { texte: "___", focus: true },
    { texte: "entre" },
    { texte: "les" },
    { texte: "arbres" },
    { texte: "." },
  ],
  legende: "Le mot caché, la phrase tient encore : elle porte déjà la moitié du sens.",
});

// ── L'INDICE EST PARFOIS DANS LE MOT LUI-MÊME.
const motInalterable = morceaux({
  segments: [
    { texte: "in", role: "temps", note: "négation" },
    { texte: "altér", role: "radical", note: "abimer" },
    { texte: "able", role: "personne", note: "qui peut" },
  ],
  legende: "« Inaltérable » : qu'on ne peut pas abimer. Le mot se démonte tout seul.",
});

const motImprevisible = morceaux({
  segments: [
    { texte: "im", role: "temps", note: "négation" },
    { texte: "prévis", role: "radical", note: "prévoir" },
    { texte: "ible", role: "personne", note: "qui peut" },
  ],
  legende: "Trois morceaux connus, et un mot qu'on n'avait jamais vu s'ouvre.",
});

// ── LES TROIS STRATÉGIES, DANS L'ORDRE.
const troisStrategies = echelle([
  { value: 1, label: "déduire" },
  { value: 2, label: "vérifier" },
  { value: 3, label: "chercher" },
]);

// ── LE SENS FIGURÉ : le mot dit vrai, mais pas au pied de la lettre.
const figureGlace = phrase({
  mots: [
    { texte: "Cette" },
    { texte: "nouvelle" },
    { texte: "m'a" },
    { texte: "glacé", focus: true },
    { texte: "le" },
    { texte: "sang" },
    { texte: "." },
  ],
  legende: "Le sang ne gèle pas vraiment : l'image dit la peur. Sens FIGURÉ.",
});

const propreDevorer = phrase({
  mots: [
    { texte: "Le" },
    { texte: "chien" },
    { texte: "a" },
    { texte: "dévoré", focus: true },
    { texte: "sa" },
    { texte: "gamelle" },
    { texte: "." },
  ],
  legende: "Sens PROPRE : il a vraiment mangé. On pourrait le filmer.",
});

const figureDevorer = phrase({
  mots: [
    { texte: "Elle" },
    { texte: "a" },
    { texte: "dévoré", focus: true },
    { texte: "ce" },
    { texte: "roman" },
    { texte: "en" },
    { texte: "deux" },
    { texte: "soirs" },
    { texte: "." },
  ],
  legende: "Sens FIGURÉ : on ne mange pas un livre. Le mot ne tient pas au pied de la lettre.",
});

// ── LE DÉFI : le même verbe dans quatre phrases, une seule au figuré.
const defiQuatrePhrases = phrase({
  mots: [
    { texte: "la" },
    { texte: "gamelle" },
    { texte: "·" },
    { texte: "le" },
    { texte: "poulet" },
    { texte: "·" },
    { texte: "la" },
    { texte: "pâtée" },
    { texte: "·" },
    { texte: "le" },
    { texte: "roman", focus: true },
  ],
  groupes: [{ mots: [9, 10], label: "le seul figuré" }],
  legende: "Trois choses se mangent, une non. C'est elle qui trahit le sens figuré.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireEnrichir6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "vocabulaire-enrichir",
  titre: "Comprendre un mot inconnu en 6e (2026-2027)",
  accroche:
    "« Le sentier serpentait entre les arbres. » Tu n'as peut-être jamais vu ce verbe, et tu sais déjà qu'il ne va pas droit — un sentier entre les arbres, ça tourne. Tu viens de deviner sans dictionnaire, et sans magie : tu as lu ce qu'il y avait autour. C'est un geste, il a des règles, et il s'apprend.",
  identite: [
    { label: "Mots clés", valeur: "Contexte, indice, morceaux, sens figuré" },
    { label: "Le secret", valeur: "Déduire d'abord, chercher en dernier" },
    { label: "Outil", valeur: "Cacher le mot et relire la phrase" },
  ],
  definition: {
    texte:
      "Devant un mot inconnu, on ne s'arrête pas et l'on ne saute pas la phrase : on a trois moyens, et ils s'essaient DANS CET ORDRE. DÉDUIRE d'abord — la phrase autour du mot porte presque toujours un indice, et le mot lui-même en porte parfois un autre quand il est fait de morceaux qu'on connait déjà. VÉRIFIER ensuite : on remet le sens qu'on a trouvé dans la phrase et l'on regarde si elle tient debout. CHERCHER enfin, dans un dictionnaire, quand le doute reste — et pas avant, parce qu'en contrôle il n'y en a pas. Un dernier piège guette : beaucoup de mots ne sont pas à prendre AU PIED DE LA LETTRE. « Cette nouvelle m'a glacé le sang » ne parle pas de température : c'est le SENS FIGURÉ, et il se reconnait à ce qu'on ne pourrait pas le filmer.",
  },
  figure: {
    schema: pile(contexteSerpentait, contexteSextant),
    legende:
      "Deux mots qu'un élève de 6e n'a jamais rencontrés, et deux phrases qui les expliquent toutes seules. L'arc violet part du mot inconnu et pointe vers l'indice : ce qui l'entoure, ce à quoi il sert. Déduire, ce n'est pas deviner au hasard — c'est lire ce que la phrase dit AUTOUR du mot, et ce qu'elle en fait.",
  },
  proprietes: [
    {
      titre: "La phrase porte presque toujours l'indice",
      texte:
        "Ce qu'on fait du mot, ce qui l'entoure, ce à quoi il sert : « on le consulte pour se repérer » suffit à savoir qu'un sextant est un instrument.",
      schema: pile(contexteSerpentait, contexteSextant),
      micros: ["6e_voc_contexte"],
    },
    {
      titre: "On cache le mot et l'on relit",
      texte:
        "Sans lui, la phrase tient encore debout, et ce qui reste dit déjà la moitié du sens. Il n'y a jamais beaucoup de candidats pour le trou.",
      schema: contexteBlanc,
      micros: ["6e_voc_contexte"],
    },
    {
      titre: "L'indice est parfois DANS le mot",
      texte:
        "« Inaltérable » se démonte : in- (négation), altér- (abimer), -able (qui peut). Trois morceaux connus, et un mot neuf s'ouvre.",
      schema: pile(motInalterable, motImprevisible),
      micros: ["6e_voc_strategies"],
    },
    {
      titre: "Trois moyens, et un ordre",
      texte:
        "DÉDUIRE de la phrase ou du mot. VÉRIFIER en remettant le sens dans la phrase. CHERCHER au dictionnaire — en dernier, jamais en premier.",
      schema: troisStrategies,
      micros: ["6e_voc_strategies"],
    },
    {
      titre: "Un mot peut ne pas être à prendre au pied de la lettre",
      texte:
        "« Glacé le sang » ne parle pas de froid. Le mot est juste, mais il vaut par l'IMAGE qu'il donne, pas par ce qu'il désigne d'habitude.",
      schema: figureGlace,
      micros: ["6e_voc_sens_figure"],
    },
    {
      titre: "Le même mot, deux emplois",
      texte:
        "Le chien dévore sa gamelle : sens propre, on pourrait le filmer. Elle dévore un roman : sens figuré, personne ne mange de livre.",
      schema: pile(propreDevorer, figureDevorer),
      micros: ["6e_voc_sens_figure"],
    },
    {
      titre: "Le défi : trouver celui qui ne tient pas au pied de la lettre",
      texte:
        "Quatre phrases, le même verbe, et une seule au figuré. Regarde ce qu'on dévore : trois choses se mangent, une non — c'est elle.",
      schema: defiQuatrePhrases,
      micros: ["6e_voc_sens_defi"],
    },
  ],
  reel: {
    texte:
      "En contrôle, en évaluation, pendant une lecture en classe, tu n'as pas de dictionnaire — et tu ne peux demander à personne. C'est précisément là que ce cours sert : la phrase est toujours avec toi. Et ce n'est pas qu'une affaire de français. En histoire, en sciences, sur une notice, sur un panneau, tu rencontres chaque semaine des mots que personne ne t'expliquera. Un élève qui s'arrête au premier mot inconnu lit trois fois moins vite que les autres et finit par ne plus lire du tout ; un élève qui saute la phrase entière ne comprend plus rien deux pages après. Entre s'arrêter et sauter, il y a le troisième geste, celui qu'on apprend ici : continuer en déduisant, et vérifier ensuite.",
  },
  historique: {
    texte:
      "Nous parlons en images sans nous en apercevoir, et beaucoup de sens figurés sont devenus si ordinaires qu'on ne les voit plus. Une table a des PIEDS, un lit a une TÊTE, une scie a des DENTS, une aiguille a un ŒIL, une bouteille a un COU, une montagne a un PIED elle aussi, et le métro a des BOUCHES. Aucun de ces mots ne parle du corps, et pourtant tous viennent de là : on a nommé le monde avec les mots qu'on avait, c'est-à-dire d'abord ceux de son propre corps. « Serpenter » vient du serpent, « dévorer un livre » de l'appétit. Ces images-là sont si usées qu'on les appelle des métaphores mortes — mais elles étaient vivantes, et quelqu'un les a inventées un jour.",
  },
  formule: {
    contexte: "Le geste qui donne le sens d'un mot inconnu, sans dictionnaire.",
    expression: "je cache le mot, je relis, et je remets ma réponse dans la phrase",
    legende:
      "« Le sentier ___ entre les arbres. » On sait déjà que le sentier fait quelque chose entre les arbres, avant même de savoir ce que « serpentait » veut dire. On propose « faisait des courbes », on le remet à la place du blanc, et la phrase tient : c'était le bon.",
    schema: contexteBlanc,
  },
  methode: [
    {
      titre: "Cacher le mot, relire la phrase entière",
      texte:
        "Puis chercher l'indice : le verbe qui le porte, ce qui vient juste après, ce à quoi il sert. La réponse est presque toujours là.",
      schema: contexteBlanc,
      micros: ["6e_voc_contexte"],
    },
    {
      titre: "Regarder si le mot se démonte",
      texte:
        "Un préfixe, un radical, un suffixe qu'on connait ? « Im-prévis-ible » : ce qu'on ne peut pas prévoir. L'indice était dans le mot.",
      schema: motImprevisible,
      micros: ["6e_voc_strategies"],
    },
    {
      titre: "Vérifier avant de continuer",
      texte:
        "Remets ta réponse à la place du mot et relis. Si la phrase tient, tu peux avancer ; si elle boite, cherche encore — c'est le moment du dictionnaire.",
      schema: troisStrategies,
      micros: ["6e_voc_strategies"],
    },
    {
      titre: "Se demander si on pourrait le filmer",
      texte:
        "Un chien qui dévore sa gamelle, oui. Quelqu'un qui dévore un roman, non. Ce qu'on ne peut pas filmer est au sens figuré.",
      schema: pile(propreDevorer, figureDevorer),
      micros: ["6e_voc_sens_figure"],
    },
  ],
  usages: [
    {
      titre: "Pour lire sans s'arrêter",
      detail:
        "Un roman de 6e contient chaque page des mots que tu ne connais pas. S'arrêter à chacun, c'est perdre l'histoire ; déduire, c'est avancer.",
      schema: contexteSerpentait,
      micros: ["6e_voc_contexte"],
    },
    {
      titre: "Pour un contrôle, où il n'y a pas de dictionnaire",
      detail:
        "La phrase est toujours avec toi, et le mot se démonte parfois tout seul. Ce sont les deux seuls outils dont tu disposes ce jour-là.",
      schema: motInalterable,
      micros: ["6e_voc_strategies"],
    },
    {
      titre: "Pour ne pas faire de contresens",
      detail:
        "Prendre « il a le cœur lourd » au pied de la lettre fait rater toute la page. Le sens figuré n'est pas un ornement : il porte l'information.",
      schema: figureGlace,
      micros: ["6e_voc_sens_figure"],
    },
  ],
  exemples: [
    {
      titre: "Un mot jamais rencontré",
      donnees: "« Le sentier serpentait entre les arbres avant d'atteindre le sommet. »",
      schema: contexteSerpentait,
      question: "Que veut dire « serpentait » ?",
      solution:
        "FAISAIT DES COURBES. Cache le mot : « le sentier ___ entre les arbres ». Un chemin qui passe entre des arbres ne va pas droit, il contourne. « Montait tout droit » contredit « entre les arbres » ; « s'arrêtait net » contredit « avant d'atteindre le sommet ». La phrase élimine les autres réponses toute seule.",
      micros: ["6e_voc_contexte"],
    },
    {
      titre: "L'indice est dans ce qu'on en fait",
      donnees: "« Le navigateur consulta le sextant pour faire le point. »",
      schema: contexteSextant,
      question: "Qu'est-ce qu'un « sextant » ?",
      solution:
        "UN INSTRUMENT DE NAVIGATION. Deux indices, et ils disent la même chose : on le CONSULTE — donc il donne une information — et c'est POUR FAIRE LE POINT, c'est-à-dire pour savoir où l'on est. Un plat de marin ne se consulte pas, un cordage non plus.",
      micros: ["6e_voc_contexte"],
    },
    {
      titre: "Quand l'indice est dans le mot",
      donnees: "Tu rencontres « inaltérable ».",
      schema: motInalterable,
      question: "Quelle stratégie essaies-tu EN PREMIER ?",
      solution:
        "DÉCOMPOSER LE MOT : in- / altér- / -able. Le programme demande de prendre l'initiative de déduire, et le dictionnaire vient en dernier. « In- » nie, « altérer » veut dire abimer, « -able » dit ce qui peut être fait : inaltérable, c'est ce qu'on ne peut pas abimer. Aucune de ces trois pièces n'était nouvelle.",
      micros: ["6e_voc_strategies"],
    },
    {
      titre: "Un mot qui ne dit pas ce qu'il dit",
      donnees: "« Cette nouvelle m'a glacé le sang. »",
      schema: figureGlace,
      question: "« Glacé » est employé au sens propre ou figuré ?",
      solution:
        "AU SENS FIGURÉ. Le sang ne gèle pas vraiment — on ne pourrait pas le filmer. L'image dit la peur : quelque chose s'est arrêté d'un coup en toi, comme l'eau qui gèle. Le mot est parfaitement juste ; simplement, il ne faut pas le prendre au pied de la lettre.",
      micros: ["6e_voc_sens_figure"],
    },
    {
      titre: "Le même mot, deux emplois",
      donnees: "« Le chien a dévoré sa gamelle. » et « Elle a dévoré ce roman. »",
      schema: pile(propreDevorer, figureDevorer),
      question: "Qu'est-ce qui change ?",
      solution:
        "Rien dans le mot, tout dans ce qu'on dévore. Une gamelle se mange : sens PROPRE. Un roman ne se mange pas : sens FIGURÉ — elle l'a lu avec appétit, très vite. Le test tient en une question : est-ce que je pourrais le filmer ?",
      micros: ["6e_voc_sens_figure"],
    },
    {
      titre: "Le défi",
      donnees: "Le chien dévore sa gamelle · nous dévorons le poulet · le chat dévore sa pâtée · elle dévore ce roman.",
      schema: defiQuatrePhrases,
      question: "Dans laquelle « dévorer » est-il au sens figuré ?",
      solution:
        "« ELLE A DÉVORÉ CE ROMAN. » Ne compare pas les verbes — ils sont identiques — mais ce qu'on dévore : une gamelle, un poulet, une pâtée se mangent ; un roman non. Quand le verbe ne peut pas être pris au pied de la lettre, il est au sens figuré. Une seule phrase sur quatre résiste au test.",
      micros: ["6e_voc_sens_defi"],
    },
  ],
  pieges: [
    "Ouvrir le dictionnaire en premier : c'est la troisième stratégie, pas la première — et le jour du contrôle tu ne l'auras pas.",
    "Deviner au hasard : déduire s'appuie sur un indice de la phrase ou du mot. Sans indice, ce n'est pas une déduction.",
    "Oublier de vérifier : remets toujours ta réponse à la place du mot et relis. Une phrase qui boite dit que tu t'es trompé.",
    "Prendre un sens figuré au pied de la lettre : « il a le cœur lourd » ne parle pas de poids, et le contresens gâche toute la page.",
    "Croire qu'un sens figuré est une faute : « glacé le sang » est du français parfaitement correct, et tout le monde le comprend.",
    "Sauter la phrase entière : deux pages plus loin, on ne comprend plus rien — et l'on ne sait même plus pourquoi.",
  ],
  aRetenir: [
    "Trois moyens, dans l'ordre : DÉDUIRE, VÉRIFIER, CHERCHER. Le dictionnaire vient en dernier.",
    "L'indice est dans la phrase — et parfois dans le mot lui-même, qui se démonte.",
    "Cache le mot, relis, puis remets ta réponse à sa place pour vérifier.",
    "Sens figuré : le mot ne se prend pas au pied de la lettre. Test : pourrais-je le filmer ?",
    "Un sens figuré n'est pas une faute ni un ornement : il porte l'information.",
  ],
  entrainement: [
    {
      question: "« La foule s'égailla dans toutes les rues dès la fin du concert. » Que veut dire « s'égailla » ?",
      correction: "Se dispersa : « dans toutes les rues » dit l'éparpillement.",
      micros: ["6e_voc_contexte"],
    },
    {
      question: "« Il resta coi, incapable de répondre un mot. » Que veut dire « coi » ?",
      correction: "Silencieux : « incapable de répondre un mot » donne la réponse.",
      micros: ["6e_voc_contexte"],
    },
    {
      question: "Tu rencontres « indéchiffrable ». Que fais-tu en premier ?",
      correction: "Tu le démontes : in- / déchiffr- / -able. Ce qu'on ne peut pas déchiffrer.",
      micros: ["6e_voc_strategies"],
    },
    {
      question: "Tu as déduit un sens. Que fais-tu avant de continuer à lire ?",
      correction: "Tu le remets à la place du mot et tu relis : la phrase doit tenir.",
      micros: ["6e_voc_strategies"],
    },
    {
      question: "« Il a une montagne de travail. » Sens propre ou figuré ?",
      correction: "Figuré : on ne pourrait pas la filmer. L'image dit la quantité.",
      micros: ["6e_voc_sens_figure"],
    },
    {
      question: "« Les dents de la scie sont usées. » Sens propre ou figuré ?",
      correction: "Figuré aussi — mais l'image est si vieille qu'on ne la voit plus.",
      micros: ["6e_voc_sens_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesVocabulaireEnrichir6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un mot inconnu - 6e",
    section: {
      type: "objectif",
      phrase: "La phrase est toujours avec toi",
      sousPhrase:
        "Devant un mot inconnu, on ne s'arrête pas et on ne saute pas : on déduit, on vérifie, et on cherche seulement après.",
      encadre: {
        titre: "L'idée",
        texte: "« Le sentier serpentait entre les arbres. » Tu sais déjà qu'il ne va pas droit.",
      },
    },
  },
  {
    titre: "Trois moyens, et un ordre",
    badge: "Comprendre un mot inconnu - 6e",
    section: {
      type: "etapes",
      etapes: [
        "DÉDUIRE : l'indice est dans la phrase — ou dans le mot, s'il se démonte.",
        "VÉRIFIER : je remets ma réponse à la place du mot et je relis.",
        "CHERCHER : le dictionnaire, en dernier — et pas le jour du contrôle.",
        "Entre s'arrêter et sauter la phrase, il y a ce troisième geste.",
      ],
    },
    schema: troisStrategies,
  },
  {
    titre: "Quand l'indice est dans le mot",
    badge: "Comprendre un mot inconnu - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "« inaltérable »",
        contenu: "in- (négation) / altér- (abimer) / -able (qui peut). Ce qu'on ne peut pas abimer.",
      },
      droite: {
        titre: "« imprévisible »",
        contenu: "im- / prévis- / -ible. Trois morceaux connus, un mot neuf qui s'ouvre.",
      },
    },
    schema: pile(motInalterable, motImprevisible),
  },
  {
    titre: "Au pied de la lettre, ou pas",
    badge: "Comprendre un mot inconnu - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Sens PROPRE",
        contenu: "« Le chien a dévoré sa gamelle. » On pourrait le filmer.",
      },
      droite: {
        titre: "Sens FIGURÉ",
        contenu: "« Elle a dévoré ce roman. » Personne ne mange de livre.",
      },
    },
    schema: pile(propreDevorer, figureDevorer),
  },
  {
    titre: "Nous parlons en images sans le voir",
    badge: "Comprendre un mot inconnu - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La table", texte: "Elle a des PIEDS — et pourtant elle ne marche pas." },
        { titre: "La scie", texte: "Elle a des DENTS, l'aiguille a un ŒIL." },
        { titre: "Le métro", texte: "Il a des BOUCHES. La bouteille a un COU." },
        { titre: "Pourquoi", texte: "On a nommé le monde avec les mots qu'on avait : ceux du corps." },
      ],
    },
    schema: figureGlace,
  },
  {
    titre: "À vous",
    badge: "Comprendre un mot inconnu - 6e",
    section: {
      type: "exercice",
      enonce: "Le chien dévore sa gamelle · nous dévorons le poulet · elle dévore ce roman.",
      question: "Dans laquelle « dévorer » est-il au sens figuré ?",
      indice: "Ne compare pas les verbes : ils sont identiques. Compare ce qu'on dévore.",
      correction:
        "« Elle dévore ce roman. » Une gamelle et un poulet se mangent ; un roman non. Quand le verbe ne peut pas être pris au pied de la lettre, il est au sens figuré.",
    },
    schema: defiQuatrePhrases,
  },
];
