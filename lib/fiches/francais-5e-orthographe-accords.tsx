// ─── Fiche de cours : les chaînes d'accord (5e) ───────────────────────────────
// CINQUIÈME FICHE DE FRANÇAIS DE LA 5e, et la première des deux qui couvrent
// « Savoir accorder les mots dans la phrase et expliquer ses choix » — un
// OBJECTIF À PART ENTIÈRE du BO, avec cinq attendus pour la seule 5e.
//
// ⚠️ RÉFÉRENCE : BO n° 10 du 5 mars 2026 (arrêté du 18 février 2026), « Annexe 1
// – Programme de français pour le cycle 4 », applicable en 5e à la RENTRÉE 2026.
//
// ⭐ LE VERBE DU BO EST « EXPLIQUER », PAS « APPLIQUER ». Le programme écrit
// « en développant son raisonnement » et « justifier à l'oral ou à l'écrit ».
// Ce n'est pas une règle à réciter, c'est une chaîne à REMONTER : de quel mot
// celui-ci tient-il son genre et son nombre ? La fiche montre donc à chaque fois
// LE TRAIT entre le mot chef et le mot accordé — c'est précisément ce que le
// canvas `phrase` sait dessiner avec `type: "accord"`.
//
// ⛔ LE PARTICIPE PASSÉ N'EST PAS ICI. Il a sa notion (`orthographe_participe`)
// et sa fiche : c'est là que se joue l'essentiel des erreurs, et une règle noyée
// dans quatre autres ne se travaille pas. Le découpage du 24/08 les a séparés.
//
// Alignée sur lib/tutor-v4/knowledge/francais/5e/microSkills.ts (notionId
// `orthographe_accords`) et sur les tables CHAINE_GN, ACCORD_ATTRIBUT et
// SUJET_VERBE de lib/tutor-v4/questionBank/5e/francais/orthographe-grammaticale.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 5e_gram_accords                → définition, figure, à retenir, méthode 1
// - 5e_orth_chaine_gn              → propriétés « Le noyau commande » et « Deux
//                                    noms, un seul adjectif », méthode 1,
//                                    usages, exemples 1 et 2, piège 1,
//                                    entraînements 1 et 2
// - 5e_orth_accord_attribut        → propriété « L'attribut s'accorde avec le
//                                    sujet », méthode 2, exemple 3, piège 2,
//                                    entraînement 3
// - 5e_orth_sujet_verbe_complexe   → propriétés « Le sujet peut être loin » et
//                                    « Deux noms coordonnés font un pluriel »,
//                                    méthode 3, exemples 4 et 5, le défi
//                                    (exemple 6), pièges 3 et 4, entraînements
//                                    4 et 5
//
// Les groupes et les phrases sont CEUX DE LA BANQUE, sans exception : « les
// grandes marées d'août », « des sentiers escarpés », « ces barques neuves »,
// « les premières pluies de la saison », « un chapeau et une écharpe neufs »,
// « la porte et la fenêtre ouvertes », « Ces barques sont neuves », « La nuit
// devient froide », « Les élèves semblent inquiets », « Le bruit des vagues
// berçait toute la nuit », « Les élèves de la classe de 5e attendaient en rang »,
// « Mon frère et ma sœur vont au collège », « La caisse de livres était trop
// lourde à porter », « Le chien des voisins aboie chaque nuit ».
//
// ⭐ « Les élèves de la classe de 5e » est L'EXEMPLE DE RÉUSSITE du document
// d'accompagnement du BO, mot pour mot : « Il verbalise son raisonnement pour
// justifier l'accord du sujet et du verbe dans la phrase ». On le garde tel quel.
//
// ⚠️ `largeurMax` à 190 (REGLES.md § 2 quater). Contrôle passé —
// `npm run verifier:fiches`.

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

// ─── Les accords de la banque, dessinés ───────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : une chaîne à trois maillons. Le nom noyau donne son
// genre et son nombre, et DEUX mots en vivent — le déterminant devant, l'adjectif
// entre les deux. Les traits partent tous du même mot : c'est ce que « chaîne »
// veut dire.
const chaineMarees = phrase({
  mots: [
    { texte: "les", nature: "déterminant" },
    { texte: "grandes", nature: "adjectif" },
    { texte: "marées", nature: "nom", focus: true },
    { texte: "d'août" },
  ],
  liens: [
    { de: 2, vers: 0, label: "fém. plur.", type: "accord" },
    { de: 2, vers: 1, label: "fém. plur.", type: "accord" },
  ],
  legende: "« marées » commande : le déterminant et l'adjectif suivent.",
});

// L'ADJECTIF PLACÉ AVANT LE NOM ACCORDE QUAND MÊME — la place ne change rien.
const chainePluies = phrase({
  mots: [
    { texte: "les", nature: "déterminant" },
    { texte: "premières", nature: "adjectif" },
    { texte: "pluies", nature: "nom", focus: true },
  ],
  liens: [{ de: 2, vers: 1, label: "fém. plur.", type: "accord" }],
  legende: "L'adjectif est devant le nom, et il s'accorde tout de même.",
});

// ⭐ DEUX NOMS, UN SEUL ADJECTIF : le cas que le BO nomme. Quand les genres se
// mélangent, le masculin l'emporte — et c'est la seule fois où l'on choisit.
const chaineChapeau = phrase({
  mots: [
    { texte: "un" },
    { texte: "chapeau", nature: "masculin", focus: true },
    { texte: "et" },
    { texte: "une" },
    { texte: "écharpe", nature: "féminin", focus: true },
    { texte: "neufs" },
  ],
  liens: [
    { de: 1, vers: 5, label: "masc.", type: "accord" },
    { de: 4, vers: 5, label: "+ fém.", type: "accord" },
  ],
  legende: "Un masculin et un féminin : l'adjectif passe au masculin pluriel.",
});

const chainePorte = phrase({
  mots: [
    { texte: "la" },
    { texte: "porte", nature: "féminin", focus: true },
    { texte: "et" },
    { texte: "la" },
    { texte: "fenêtre", nature: "féminin", focus: true },
    { texte: "ouvertes" },
  ],
  liens: [{ de: 4, vers: 5, label: "fém. plur.", type: "accord" }],
  legende: "Deux noms féminins : l'adjectif reste au féminin, au pluriel.",
});

// L'ATTRIBUT S'ACCORDE AVEC LE SUJET, et il en est séparé par le verbe : c'est
// ce qui le rend plus difficile qu'une épithète collée au nom.
const attributBarques = phrase({
  mots: [
    { texte: "Ces" },
    { texte: "barques", focus: true },
    { texte: "sont" },
    { texte: "neuves" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "fém. plur.", type: "accord" }],
  legende: "Le verbe s'intercale, et l'accord passe par-dessus.",
});

const attributEleves = phrase({
  mots: [
    { texte: "Les" },
    { texte: "élèves", focus: true },
    { texte: "semblent" },
    { texte: "inquiets" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 3], label: "attribut du sujet" },
  ],
  liens: [{ de: 1, vers: 3, label: "masc. plur.", type: "accord" }],
  legende: "« sembler » est attributif : « inquiets » s'accorde avec le sujet.",
});

// ⭐ LE SUJET ÉLOIGNÉ — l'erreur la plus fréquente de la classe. On BARRE le
// complément du nom : ce qui reste est le vrai sujet, et il est singulier.
const sujetBruit = phrase({
  mots: [
    { texte: "Le" },
    { texte: "bruit", focus: true },
    { texte: "des", barre: true },
    { texte: "vagues", barre: true },
    { texte: "berçait" },
    { texte: "la nuit" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [4, 4], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 4, label: "singulier", type: "accord" }],
  legende: "On barre « des vagues » : le sujet est « le bruit », singulier.",
});

const sujetCaisse = phrase({
  mots: [
    { texte: "La" },
    { texte: "caisse", focus: true },
    { texte: "de", barre: true },
    { texte: "livres", barre: true },
    { texte: "était" },
    { texte: "lourde" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [4, 4], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 4, label: "singulier", type: "accord" }],
  legende: "« de livres » ne commande rien : c'est la caisse qui était lourde.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). C'est l'exemple de réussite que le
// document d'accompagnement du BO cite mot pour mot — et il cumule les deux
// pièges : un sujet pluriel, et deux compléments glissés avant le verbe.
const sujetDefi = phrase({
  mots: [
    { texte: "Les" },
    { texte: "élèves", focus: true },
    { texte: "de", barre: true },
    { texte: "la classe", barre: true },
    { texte: "de 5e", barre: true },
    { texte: "attendaient" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
  ],
  liens: [{ de: 1, vers: 5, label: "pluriel", type: "accord" }],
  legende: "Deux compléments s'intercalent : le sujet reste « les élèves ».",
});

// DEUX NOMS COORDONNÉS FONT UN SUJET PLURIEL — rien n'est barré ici, tout compte.
const sujetFrereSoeur = phrase({
  mots: [
    { texte: "Mon" },
    { texte: "frère", focus: true },
    { texte: "et" },
    { texte: "ma" },
    { texte: "sœur", focus: true },
    { texte: "vont" },
    { texte: "au collège" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 4], label: "sujet" },
    { mots: [5, 5], label: "verbe" },
  ],
  liens: [
    { de: 1, vers: 5, label: "et", type: "accord" },
    { de: 4, vers: 5, label: "= pluriel", type: "accord" },
  ],
  legende: "Deux singuliers reliés par « et » : le verbe passe au pluriel.",
});

const sujetChien = phrase({
  mots: [
    { texte: "Le" },
    { texte: "chien", focus: true },
    { texte: "des", barre: true },
    { texte: "voisins", barre: true },
    { texte: "aboie" },
    { texte: "." },
  ],
  liens: [{ de: 1, vers: 4, label: "singulier", type: "accord" }],
  legende: "Un seul chien aboie, même si les voisins sont plusieurs.",
});

const pieges = [
  "Accorder l'adjectif avec le mot le plus proche au lieu du noyau. Dans « les grandes marées d'août », c'est « marées » qui commande, pas « août ».",
  "Oublier que l'attribut est séparé du sujet par le verbe. « Les élèves semblent inquiets » : « inquiets » s'accorde avec « les élèves », par-dessus « semblent ».",
  "Accorder le verbe avec le nom qui le précède. Dans « Le bruit des vagues berçait », on entend « vagues » juste avant le verbe — mais le sujet est « le bruit », et il est singulier.",
  "Laisser le verbe au singulier quand deux noms sont reliés par « et ». « Mon frère et ma sœur vont au collège » : deux singuliers font un pluriel.",
];

const aRetenir = [
  "Dans un groupe nominal, le NOM NOYAU commande : le déterminant et l'adjectif prennent son genre et son nombre, même placés avant lui.",
  "L'attribut s'accorde avec le sujet, par-dessus le verbe qui les sépare.",
  "Pour accorder un verbe, on barre ce qui s'intercale et on relit : ce qui reste devant est le sujet. Deux noms reliés par « et » font un pluriel.",
];

export const ficheAccords5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "orthographe-accords",
  titre: "Les chaînes d'accord dans la phrase (2026-2027)",
  accroche:
    "« Le bruit des vagues berçait toute la nuit. » On entend « vagues » juste avant le verbe, et la main écrit « berçaient ». Le sujet, pourtant, c'est le bruit — et il est seul. Accorder, ce n'est pas écouter : c'est remonter au mot chef.",
  identite: [
    { label: "Mots clés", valeur: "Chaîne d'accord, noyau, attribut, sujet éloigné" },
    { label: "Le secret", valeur: "Remonter au mot qui commande" },
    { label: "Outil", valeur: "Barrer ce qui s'intercale, puis relire" },
  ],
  definition: {
    texte:
      "Accorder, c'est faire prendre à un mot le genre et le nombre d'un autre. Dans un groupe nominal, c'est le NOM NOYAU qui commande : le déterminant et l'adjectif prennent sa marque, même quand l'adjectif est placé devant lui. L'attribut, lui, s'accorde avec le SUJET — et le verbe s'intercale entre les deux sans rien y changer. Le verbe enfin s'accorde avec son sujet, où qu'il soit : un complément glissé entre les deux ne commande rien, et deux noms reliés par « et » font un pluriel. Le programme ne demande pas de réciter ces règles, mais de les EXPLIQUER : de dire, à chaque fois, de quel mot celui-ci tient sa marque.",
  },
  figure: {
    schema: chaineMarees,
    legende:
      "Une chaîne à trois maillons. Le nom « marées » est au centre — il est féminin pluriel, et il ne le doit à personne. Les deux traits partent de lui vers le déterminant et vers l'adjectif : ce sont eux qui reçoivent la marque. C'est cela, une chaîne d'accord — et c'est pour cela qu'on la remonte au lieu de l'appliquer.",
  },
  proprietes: [
    {
      titre: "Le noyau commande, même de loin",
      texte:
        "L'adjectif prend le genre et le nombre du nom noyau, qu'il soit placé après lui ou devant lui.",
      schema: pile(chaineMarees, chainePluies),
    },
    {
      titre: "Deux noms, un seul adjectif",
      texte:
        "L'adjectif passe au pluriel. Si les genres se mélangent, le masculin l'emporte — c'est la seule fois où l'on choisit.",
      schema: pile(chaineChapeau, chainePorte),
    },
    {
      titre: "L'attribut s'accorde avec le sujet",
      texte:
        "Le verbe s'intercale entre les deux, et l'accord passe par-dessus. Une épithète est collée au nom ; un attribut, non.",
      schema: pile(attributBarques, attributEleves),
    },
    {
      titre: "Le sujet peut être loin du verbe",
      texte:
        "Un complément du nom se glisse entre eux et se fait entendre. Il ne commande rien : on le barre et on relit.",
      schema: pile(sujetBruit, sujetCaisse),
    },
    {
      titre: "Deux noms coordonnés font un pluriel",
      texte:
        "« Mon frère et ma sœur » sont deux singuliers, et ensemble ils forment un sujet pluriel.",
      schema: sujetFrereSoeur,
    },
  ],
  reel: {
    texte:
      "C'est ce qui se voit d'abord dans une copie, un message ou une lettre — et c'est ce qui se corrige le plus vite, parce qu'il ne s'agit pas de mémoire mais d'un geste. « Le chien des voisins aboie » ou « aboient » : un lecteur pressé écrit le second, parce qu'il vient d'entendre « voisins ». Barrer « des voisins » du bout du stylo, et la faute disparaît. Ce même geste sauve une phrase de mathématiques (« la caisse de livres était lourde ») aussi bien qu'une lettre de motivation.",
  },
  historique: {
    texte:
      "L'accord de l'adjectif vient du latin, où l'adjectif changeait de forme selon le cas, le genre et le nombre du nom — bonus dominus, bona domina. Le français a tout perdu sauf le genre et le nombre, et il les a gardés à l'écrit bien après les avoir perdus à l'oreille : « les grandes marées » et « la grande marée » ne se distinguent pas quand on les dit. C'est pour cela que l'accord s'apprend en écrivant, et jamais en écoutant — la marque survit sur la page, pas dans la voix.",
  },
  formule: {
    contexte: "Le geste qui règle l'accord du verbe, à tous les coups.",
    expression: "je barre ce qui s'intercale, et je relis",
    legende:
      "« Le bruit ~~des vagues~~ berçait » : ce qui reste devant le verbe est le sujet, et il est singulier. Le document d'accompagnement du BO donne le même exercice sur « Les élèves de la classe de 5e » : on barre les deux compléments, il reste « les élèves », pluriel.",
    schema: sujetBruit,
  },
  methode: [
    {
      titre: "Je trouve le nom noyau",
      texte:
        "J'enlève tout sauf le déterminant et le nom. Le mot qui reste donne le genre et le nombre à tout le groupe.",
      schema: chaineMarees,
    },
    {
      titre: "Je cherche avec quoi le mot s'accorde",
      texte:
        "Épithète : avec le nom qu'elle touche. Attribut : avec le sujet, par-dessus le verbe.",
      schema: attributBarques,
    },
    {
      titre: "Je barre ce qui s'intercale",
      texte:
        "Entre le sujet et le verbe, je raye les compléments. Ce qui reste devant commande l'accord.",
      schema: pile(sujetBruit, sujetDefi),
    },
  ],
  usages: [
    {
      titre: "Décrire au pluriel",
      detail:
        "« des sentiers escarpés », « ces barques neuves » : l'adjectif prend la marque du nom qu'il décrit.",
      schema: chainePluies,
    },
    {
      titre: "Dire ce qu'une chose est",
      detail:
        "« La nuit devient froide » : l'attribut dit l'état du sujet, et il s'accorde avec lui.",
      schema: attributBarques,
    },
    {
      titre: "Parler de deux êtres à la fois",
      detail:
        "« Mon frère et ma sœur vont au collège » : deux sujets singuliers, un verbe au pluriel.",
      schema: sujetFrereSoeur,
    },
  ],
  exemples: [
    {
      titre: "Remonter la chaîne",
      donnees: "« les grand… marées d'août »",
      schema: chaineMarees,
      question: "Comment s'écrit l'adjectif, et pourquoi ?",
      solution:
        "« grandes ». Le nom noyau est « marées » : c'est lui qui est féminin pluriel, et il ne le doit à personne. Le déterminant « les » et l'adjectif « grandes » prennent sa marque. Attention au mot le plus proche : « d'août » est masculin, et il ne commande rien du tout — il n'est qu'un complément du nom.",
    },
    {
      titre: "Deux noms, un seul adjectif",
      donnees: "« un chapeau et une écharpe neuf… » puis « la porte et la fenêtre ouvert… »",
      schema: pile(chaineChapeau, chainePorte),
      question: "Quelle marque prend l'adjectif dans chaque groupe ?",
      solution:
        "« neufs » et « ouvertes ». Dans les deux cas l'adjectif se rapporte aux DEUX noms, donc il passe au pluriel. Ce qui change, c'est le genre : « chapeau » est masculin et « écharpe » féminin, et quand les genres se mélangent le masculin l'emporte — « neufs ». « Porte » et « fenêtre » sont toutes deux féminines : rien à arbitrer, « ouvertes ».",
    },
    {
      titre: "L'attribut par-dessus le verbe",
      donnees: "« Les élèves semblent inquiet… »",
      schema: attributEleves,
      question: "Avec quoi « inquiets » s'accorde-t-il ?",
      solution:
        "Avec « les élèves », le sujet — masculin pluriel. Le verbe « semblent » s'est glissé entre les deux, et il ne change rien : l'accord passe par-dessus. C'est ce qui rend l'attribut plus difficile qu'une épithète, laquelle touche le nom. Le test est simple : si l'on peut remplacer le verbe par « être », ce qui suit est un attribut et s'accorde avec le sujet.",
    },
    {
      titre: "Le sujet qu'on n'entend pas",
      donnees: "« Le bruit des vagues berçai… toute la nuit. »",
      schema: sujetBruit,
      question: "Le verbe prend-il un « t » ou « ent » ?",
      solution:
        "« berçait », au singulier. On barre « des vagues » : c'est un complément du nom, il précise de quoi vient le bruit, il ne commande rien. Ce qui reste devant le verbe est « le bruit », singulier. L'oreille fait exactement l'inverse — elle vient d'entendre « vagues » — et c'est pourquoi il faut le geste, pas l'écoute.",
    },
    {
      titre: "Deux singuliers font un pluriel",
      donnees: "« Mon frère et ma sœur v… au collège. »",
      schema: sujetFrereSoeur,
      question: "Comment s'écrit le verbe ?",
      solution:
        "« vont », au pluriel. « Mon frère » est singulier, « ma sœur » aussi, mais « et » les réunit en un seul sujet, qui désigne deux personnes. Rien n'est barré ici : tout compte. C'est le cas inverse du précédent — là on retirait, ici on additionne, et c'est de savoir lequel des deux on a sous les yeux que tout dépend.",
    },
    {
      titre: "Le défi",
      donnees: "« Les élèves de la classe de 5e attendai… en rang. »",
      schema: sujetDefi,
      question: "Le verbe s'accorde-t-il avec « les élèves » ou avec « la classe » ?",
      solution:
        "Avec « les élèves » : « attendaient », au pluriel. Deux compléments se sont glissés entre le sujet et le verbe — « de la classe », « de 5e » — et le dernier mot entendu avant le verbe est « 5e », un singulier. On les barre tous les deux, il reste « Les élèves … attendaient ». Le document d'accompagnement du programme donne cette phrase comme exemple de réussite : l'élève doit « verbaliser son raisonnement », c'est-à-dire dire à voix haute pourquoi il écrit ce qu'il écrit.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« des sentiers escarpé… » : quelle marque prend l'adjectif ?",
      correction:
        "« escarpés ». Le nom noyau est « sentiers », masculin pluriel : le déterminant « des » et l'adjectif prennent sa marque.",
    },
    {
      question: "« les premier… pluies de la saison » : et ici ?",
      correction:
        "« premières ». L'adjectif est placé AVANT le nom, ce qui ne change rien : il s'accorde avec « pluies », féminin pluriel.",
    },
    {
      question: "« La nuit devient froid… » : avec quoi l'attribut s'accorde-t-il ?",
      correction:
        "Avec « la nuit », féminin singulier : « froide ». « Devenir » est un verbe attributif — on peut le remplacer par « être ».",
    },
    {
      question: "« La caisse de livres étai… trop lourde à porter. »",
      correction:
        "« était », singulier. On barre « de livres » : le sujet est « la caisse ». C'est elle qui était lourde, pas les livres pris un par un.",
    },
    {
      question: "Défi : « Le chien des voisins aboi… chaque nuit. »",
      correction:
        "« aboie », singulier. Il n'y a qu'un chien, même si les voisins sont plusieurs. On barre « des voisins » et l'on relit : « Le chien … aboie ».",
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesAccords5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les accords - 5e",
    section: {
      type: "objectif",
      phrase: "Dire avec quoi chaque mot s'accorde",
      sousPhrase:
        "La chaîne du groupe nominal, l'attribut par-dessus le verbe, et le sujet qu'un complément vient cacher.",
      encadre: {
        titre: "L'idée",
        texte: "Le programme demande d'EXPLIQUER l'accord, pas de l'appliquer.",
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
          "« Le chien des voisins aboie » ou « aboient » ? Barrer « des voisins » du bout du stylo, et la faute disparaît. Le même geste sauve une phrase de maths et une lettre de motivation.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Les grandes marées » et « la grande marée » ne se distinguent pas à l'oreille. Le français a gardé ces marques à l'écrit longtemps après les avoir perdues dans la voix : l'accord s'apprend en écrivant.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheAccords5e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Épithète ou attribut ?",
    badge: "La distinction clé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'épithète touche le nom",
        contenu:
          "« ces barques neuves » : l'adjectif est collé au nom noyau, et il prend sa marque directement.",
      },
      droite: {
        variante: "ok",
        titre: "L'attribut passe par-dessus",
        contenu:
          "« Ces barques sont neuves » : le verbe s'intercale, et l'accord se fait quand même avec le sujet.",
      },
    },
  },
  {
    titre: "Barrer, puis relire",
    badge: "Le sujet éloigné",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que l'oreille fait",
        contenu:
          "« Le bruit des vagues berçaient » : on vient d'entendre « vagues », la main suit.",
      },
      droite: {
        variante: "ok",
        titre: "Ce que le geste donne",
        contenu:
          "« Le bruit ~~des vagues~~ berçait » : ce qui reste devant le verbe est le sujet, et il est seul.",
      },
    },
  },
  {
    titre: "Deux singuliers font un pluriel",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Mon frère et ma sœur v… au collège. »",
      question: "Comment s'écrit le verbe ?",
      correction:
        "« vont ». Deux sujets singuliers reliés par « et » désignent deux personnes : le verbe passe au pluriel. Ici, rien à barrer — tout compte.",
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
      enonce: "« Les élèves de la classe de 5e attendai… en rang. »",
      question: "Avec quoi le verbe s'accorde-t-il ?",
      indice: "Barre tout ce qui s'est glissé entre le sujet et le verbe, puis relis.",
      correction:
        "« attendaient », pluriel. On barre « de la classe » et « de 5e » : il reste « Les élèves … attendaient ». C'est l'exemple de réussite du programme.",
    },
  },
];
