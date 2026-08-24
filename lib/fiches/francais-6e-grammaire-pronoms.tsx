// ─── Fiche de cours : les pronoms personnels et leur antécédent (6e) ──────────
// TROISIÈME FICHE DE FRANÇAIS DE LA 6e, après les compléments du verbe et le
// groupe nominal. Les trois se suivent : ce que le verbe appelle, ce qui
// s'accroche au nom, et — ici — ce qui REMPLACE le nom.
//
// ⭐ POURQUOI ELLE COMPTE PLUS QUE LES AUTRES. Le BO de 6e donne trois objectifs
// aux pronoms personnels : « Identifier AISÉMENT les pronoms personnels et
// PRÉCISER LEUR FONCTION », « METTRE EN RELATION UN PRONOM PERSONNEL AVEC SON
// ANTÉCÉDENT ». Et l'évaluation nationale mesure ce dernier point sous le nom de
// « chaîne anaphorique » : c'est là que se trouvent les résultats les plus bas
// de toute l'épreuve — plus bas que la conjugaison, plus bas que le lexique. Un
// élève qui perd le fil de « il » deux phrases plus loin ne comprend plus le
// texte, et rien dans sa copie ne le dit.
//
// ⭐ LE CANVAS A UN ARC FAIT POUR ÇA. `type: "reprise"` trace un arc POINTILLÉ
// SOUS la phrase, du pronom vers ce qu'il remplace — il ne ressemble à aucun
// autre lien de la matière (l'accord et la question passent au-dessus, en trait
// plein). L'élève voit donc littéralement le fil qu'il doit suivre.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `grammaire_pronoms`) et sur les pools PRONOMS_SUJET_OBJET et
// PRONOM_ANTECEDENT de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 6e_gram_pronoms            → définition, figure, propriété « Sujet ou
//                                complément », exemple 1, entraînement 1
// - 6e_gram_pronoms_fonction   → propriété « La place donne la fonction »,
//                                méthode 2, exemple 2, entraînement 2
// - 6e_gram_pronom_antecedent  → propriétés « L'antécédent » et « Le pronom
//                                prend le genre et le nombre », formule,
//                                méthodes 1 et 3, exemples 3 et 4, pièges 1
//                                et 2, entraînements 3 et 4
// - 6e_gram_pronoms_defi       → le défi, dessiné (exemple 5) + entraînement 5
//
// Les phrases sont CELLES DE LA BANQUE : « Le pêcheur répare son filet ; il le
// pose ensuite », « Les letchis sont mûrs : nous les ramasserons demain »,
// « Tom parle à sa sœur ; il lui explique le jeu », « Léa a pris son cartable,
// puis elle est sortie », « Les enfants les ramassent », « Je le vois »,
// « Nous voyons les baleines ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Le helper commun à toutes les fiches de français. `largeurMax: 250` est le
// défaut du composant, écrit ici pour qu'on n'ait pas à aller le chercher.
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

// LA FIGURE DE RÉFÉRENCE : deux pronoms dans la même phrase, deux fils à
// remonter. L'arc pointillé passe SOUS la phrase — c'est le seul lien de la
// matière qui descende, et c'est ce qui le rend reconnaissable.
const phraseReference = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "répare" },
    { texte: "son" },
    { texte: "filet" },
    { texte: ";" },
    { texte: "il", focus: true },
    { texte: "le", focus: true },
    { texte: "pose" },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [3, 4], label: "COD" },
  ],
  liens: [
    { de: 6, vers: 1, type: "reprise" },
    { de: 7, vers: 4, type: "reprise" },
  ],
  legende: "« il » reprend le pêcheur, « le » reprend le filet.",
});

// Sujet ou complément : la place, montrée sur deux phrases minuscules.
const phraseSujet = phrase({
  mots: [
    { texte: "Il", nature: "pronom", focus: true },
    { texte: "dort", nature: "verbe" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 0], label: "sujet" }],
  legende: "Devant le verbe : pronom personnel sujet.",
});

const phraseComplement = phrase({
  mots: [
    { texte: "Je", nature: "pronom" },
    { texte: "le", nature: "pronom", focus: true },
    { texte: "vois", nature: "verbe" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "COD" },
  ],
  legende: "Entre le sujet et le verbe : pronom personnel complément.",
});

// LE PIÈGE DU MOT « les » : même mot, deux natures. C'est le dessin qui le
// tranche, en écrivant la nature au-dessus de chacun.
const phraseLesDeuxNatures = phrase({
  mots: [
    { texte: "Les", nature: "dét.", focus: true },
    { texte: "enfants", nature: "nom" },
    { texte: "les", nature: "pronom", focus: true },
    { texte: "ramassent", nature: "verbe" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 1], label: "sujet" },
    { mots: [2, 2], label: "COD" },
  ],
  legende: "Le premier « Les » accompagne un nom ; le second le remplace.",
});

// L'ANTÉCÉDENT, sur la phrase la plus courte possible — pour que le fil se voie.
const phraseCartable = phrase({
  mots: [
    { texte: "Léa" },
    { texte: "a" },
    { texte: "pris" },
    { texte: "son" },
    { texte: "cartable" },
    { texte: "," },
    { texte: "puis" },
    { texte: "elle", focus: true },
    { texte: "est" },
    { texte: "sortie" },
  ],
  liens: [{ de: 7, vers: 0, label: "reprend", type: "reprise" }],
  legende: "« elle » ne peut reprendre que Léa : « cartable » est masculin.",
});

// L'accord du participe le prouve : c'est le genre de l'antécédent qui décide.
const phraseLetchis = phrase({
  mots: [
    { texte: "Les" },
    { texte: "letchis" },
    { texte: "sont" },
    { texte: "mûrs" },
    { texte: ":" },
    { texte: "nous" },
    { texte: "les", focus: true },
    { texte: "ramasserons" },
  ],
  liens: [{ de: 6, vers: 1, label: "pluriel", type: "reprise" }],
  legende: "« les » est au pluriel parce que « letchis » l'est.",
});

// COD ou COI : le pronom change de forme, comme le complément changeait de
// construction. C'est le pont avec la fiche des compléments du verbe.
const phraseSoeur = phrase({
  mots: [
    { texte: "Tom" },
    { texte: "parle" },
    { texte: "à" },
    { texte: "sa" },
    { texte: "sœur" },
    { texte: ";" },
    { texte: "il" },
    { texte: "lui", focus: true },
    { texte: "explique" },
  ],
  groupes: [{ mots: [7, 7], label: "COI" }],
  liens: [{ de: 7, vers: 4, type: "reprise" }],
  legende: "« lui » remplace « à sa sœur » : il est indirect, comme elle.",
});

const phraseBaleines = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "voyons" },
    { texte: "les" },
    { texte: "baleines" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [2, 3], label: "COD" },
  ],
  legende: "Avant de remplacer, on repère la fonction du groupe.",
});

const phraseBaleinesPronom = phrase({
  mots: [
    { texte: "Nous" },
    { texte: "les", focus: true },
    { texte: "voyons" },
    { texte: "." },
  ],
  groupes: [
    { mots: [0, 0], label: "sujet" },
    { mots: [1, 1], label: "COD" },
  ],
  legende: "Le pronom garde la fonction, et passe devant le verbe.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Trois pronoms d'affilée, dont deux
// qui se ressemblent : c'est là que le fil se perd.
const phraseDefi = phrase({
  mots: [
    { texte: "Le" },
    { texte: "pêcheur" },
    { texte: "répare" },
    { texte: "son" },
    { texte: "filet" },
    { texte: ";" },
    { texte: "il", focus: true },
    { texte: "le", focus: true },
    { texte: "pose" },
    { texte: "ensuite" },
  ],
  groupes: [
    { mots: [6, 6], label: "sujet" },
    { mots: [7, 7], label: "COD" },
  ],
  liens: [
    { de: 6, vers: 1, type: "reprise" },
    { de: 7, vers: 4, type: "reprise" },
  ],
  legende: "Deux pronoms côte à côte, deux antécédents différents.",
});

const pieges = [
  "Confondre le déterminant et le pronom : dans « Les enfants les ramassent », le premier « Les » accompagne un nom, le second le remplace. Même mot, deux natures.",
  "Prendre le mot le plus proche pour l'antécédent : dans « Léa a pris son cartable, puis elle est sortie », « elle » ne peut pas reprendre « cartable », qui est masculin. Le genre et le nombre tranchent.",
  "Oublier que le pronom garde la fonction du groupe qu'il remplace : « à sa sœur » est indirect, donc son pronom est « lui », pas « la ».",
  "Croire qu'un pronom personnel complément se place après le verbe : en français, il passe devant — « je le vois », et non « je vois le ».",
];

const aRetenir = [
  "Un pronom personnel remplace un groupe nominal : devant le verbe il est sujet, entre le sujet et le verbe il est complément.",
  "L'antécédent est le groupe que le pronom reprend, et il est écrit AVANT lui.",
  "Le pronom prend le genre et le nombre de son antécédent : c'est ce qui permet de le retrouver à coup sûr.",
];

export const fichePronoms6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "grammaire-pronoms",
  titre: "Les pronoms personnels et leur antécédent",
  accroche:
    "« Le pêcheur répare son filet ; il le pose ensuite. » Deux petits mots, deux fils à remonter. Savoir de qui parle « il » deux phrases plus loin, c'est la différence entre lire les mots et lire le texte.",
  identite: [
    { label: "Mots clés", valeur: "Pronom personnel, sujet, complément, antécédent" },
    { label: "Le secret", valeur: "On remonte le texte, on ne devine pas" },
    { label: "Outil", valeur: "Remplacer le pronom et relire" },
  ],
  definition: {
    texte:
      "Un pronom personnel remplace un groupe nominal, pour ne pas répéter toujours le même mot. Placé devant le verbe, il est sujet : je, tu, il, elle, nous, vous, ils, elles. Glissé entre le sujet et le verbe, il est complément : le, la, les, lui, leur, me, te, se. Le groupe qu'il remplace s'appelle son antécédent — « anté- » veut dire avant : il est toujours écrit plus tôt dans le texte. Et le pronom en prend le genre et le nombre : c'est ce qui permet de le retrouver.",
  },
  figure: {
    schema: phraseReference,
    legende:
      "« Le pêcheur répare son filet ; il le pose. » Les deux arcs pointillés descendent SOUS la phrase — c'est le seul lien de la matière qui passe par en dessous, celui de la reprise. « il » remonte vers « pêcheur », « le » remonte vers « filet ». Deux pronoms côte à côte, deux fils différents.",
  },
  proprietes: [
    {
      titre: "Devant le verbe : sujet",
      texte: "Je, tu, il, elle, nous, vous, ils, elles — le pronom sujet commande l'accord du verbe.",
      schema: phraseSujet,
    },
    {
      titre: "Entre le sujet et le verbe : complément",
      texte: "Le, la, les, lui, leur : en français, le pronom complément passe DEVANT le verbe.",
      schema: phraseComplement,
    },
    {
      titre: "Le même mot peut changer de nature",
      texte: "« les » devant un nom est un déterminant ; « les » devant un verbe est un pronom.",
      schema: phraseLesDeuxNatures,
    },
    {
      titre: "L'antécédent est écrit avant",
      texte: "C'est le groupe que le pronom reprend : on remonte le texte jusqu'à lui, on ne devine pas.",
      schema: phraseCartable,
    },
    {
      titre: "Le pronom prend le genre et le nombre",
      texte: "C'est la preuve : un pronom au pluriel ne peut pas reprendre un groupe au singulier.",
      schema: phraseLetchis,
    },
  ],
  reel: {
    texte:
      "C'est ce qui se joue dans chaque texte un peu long. Dès la deuxième phrase, l'auteur cesse de répéter les noms et met des pronoms à la place : si l'on perd le fil, on lit encore les mots mais on ne suit plus l'histoire — et rien, dans la copie, ne le montre. C'est le point le plus bas des évaluations nationales de français, plus bas que la conjugaison. Le repérer, c'est aussi ce qui permet d'écrire clairement : quand deux personnages sont du même genre, il faut renommer plutôt que pronominaliser.",
  },
  historique: {
    texte:
      "« Pronom » vient du latin pronomen : pro, « à la place de », et nomen, « le nom ». Le mot dit exactement le métier : un pronom se tient à la place d'un nom. « Antécédent » vient de antecedere, « marcher devant » — il est celui qui est passé avant. Les deux termes ont été fabriqués par les grammairiens latins il y a plus de deux mille ans, et ils n'ont jamais eu besoin d'être changés.",
  },
  formule: {
    contexte: "Le test qui prouve qu'on a trouvé le bon antécédent.",
    expression: "je remplace, puis je relis",
    legende:
      "On remet le groupe à la place du pronom et on relit la phrase. « Léa a pris son cartable, puis LE CARTABLE est sortie » ne veut rien dire ; « puis LÉA est sortie » se tient. Le test est infaillible et il ne demande aucune règle à réciter.",
    schema: phraseCartable,
  },
  methode: [
    {
      titre: "Je repère le pronom et je remonte",
      texte: "Je cherche le groupe nominal le plus proche AVANT lui — l'antécédent est toujours écrit avant.",
      schema: phraseCartable,
    },
    {
      titre: "Je vérifie le genre et le nombre",
      texte: "Un pronom féminin ne reprend qu'un groupe féminin, un pronom pluriel qu'un groupe pluriel.",
      schema: phraseLetchis,
    },
    {
      titre: "Je remplace et je relis",
      texte: "Je remets le groupe à la place du pronom : si la phrase tient, c'est le bon antécédent.",
      schema: pile(phraseBaleines, phraseBaleinesPronom),
    },
  ],
  usages: [
    {
      titre: "Remplacer un sujet",
      detail: "« Le pêcheur » devient « il » : le verbe s'accorde toujours avec lui.",
      schema: phraseSujet,
    },
    {
      titre: "Remplacer un complément direct",
      detail: "« les baleines » devient « les », et le pronom passe devant le verbe.",
      schema: phraseBaleinesPronom,
    },
    {
      titre: "Remplacer un complément indirect",
      detail: "« à sa sœur » devient « lui » : le pronom garde la construction indirecte.",
      schema: phraseSoeur,
    },
  ],
  exemples: [
    {
      titre: "Sujet ou complément ?",
      donnees: "« Il dort. » puis « Je le vois. »",
      schema: pile(phraseSujet, phraseComplement),
      question: "Quelle est la fonction du pronom en gras dans chaque phrase ?",
      solution:
        "Dans la première, « Il » est devant le verbe et commande son accord : c'est un pronom personnel sujet. Dans la seconde, « le » est glissé entre le sujet « Je » et le verbe « vois » : c'est un pronom personnel complément d'objet direct. La place suffit à trancher.",
    },
    {
      titre: "Le même mot, deux natures",
      donnees: "« Les enfants les ramassent. »",
      schema: phraseLesDeuxNatures,
      question: "Quelle est la nature du premier « Les », et celle du second ?",
      solution:
        "Le premier accompagne le nom « enfants » : c'est un déterminant. Le second est devant le verbe et ne se rapporte à aucun nom écrit à côté : c'est un pronom personnel, complément d'objet direct. On ne juge pas un mot sur son orthographe, mais sur ce qu'il fait dans la phrase.",
    },
    {
      titre: "Trouver l'antécédent",
      donnees: "« Léa a pris son cartable, puis elle est sortie. »",
      schema: phraseCartable,
      question: "À qui renvoie « elle » ?",
      solution:
        "À Léa. « cartable » est le groupe le plus proche, mais il est masculin : « elle » ne peut pas le reprendre. On vérifie en remplaçant : « puis Léa est sortie » se tient, « puis le cartable est sortie » ne veut rien dire. Le mot le plus proche n'est pas toujours le bon.",
    },
    {
      titre: "Le pronom garde la fonction",
      donnees: "« Tom parle à sa sœur ; il lui explique le jeu. »",
      schema: phraseSoeur,
      question: "Que remplace « lui », et quelle est sa fonction ?",
      solution:
        "« lui » remplace « à sa sœur ». Le groupe était complément d'objet indirect — il était relié au verbe par la préposition « à » —, et le pronom l'est aussi. C'est pour cela qu'on dit « il lui explique » et non « il la explique » : la forme du pronom suit la fonction du groupe.",
    },
    {
      titre: "Le défi",
      donnees: "« Le pêcheur répare son filet ; il le pose ensuite. »",
      schema: phraseDefi,
      question: "Que reprend « il », et que reprend « le » ?",
      solution:
        "« il » est devant le verbe : c'est le sujet, et il reprend « le pêcheur ». « le » est glissé entre le sujet et le verbe : c'est le complément d'objet direct, et il reprend « son filet ». Deux pronoms côte à côte, deux fils différents — et c'est la place de chacun qui dit lequel remonte où.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Le pêcheur répare son filet. » Remplace le SUJET par un pronom.",
      correction:
        "« Il répare son filet. » Le groupe « Le pêcheur » est sujet, masculin singulier : son pronom sujet est « il ».",
    },
    {
      question: "« Nous voyons les baleines. » Remplace le complément par un pronom.",
      correction:
        "« Nous les voyons. » « les baleines » est complément d'objet direct : le pronom est « les », et il passe devant le verbe.",
    },
    {
      question: "« Les letchis sont mûrs : nous les ramasserons demain. » À quoi renvoie « les » ?",
      correction:
        "Aux letchis. Le pronom est au pluriel, comme son antécédent. On vérifie en remplaçant : « nous ramasserons les letchis demain ».",
    },
    {
      question: "L'antécédent d'un pronom, c'est quoi exactement ?",
      correction:
        "Le groupe que le pronom reprend, et qui est écrit AVANT lui dans le texte. « Anté- » veut dire avant : il est déjà passé quand le pronom arrive.",
    },
    {
      question: "Défi : « Le pêcheur répare son filet ; il le pose ensuite. » Quelle est la fonction de « il », et que remplace « le » ?",
      correction:
        "« il » est sujet et reprend « le pêcheur ». « le » est complément d'objet direct et reprend « son filet ». La place de chaque pronom dit sa fonction.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesPronoms6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pronoms et antécédent - 6e",
    section: {
      type: "objectif",
      phrase: "Savoir de qui parle « il », deux phrases plus loin",
      sousPhrase:
        "On repère le pronom, on remonte jusqu'au groupe qu'il reprend, et on vérifie en remplaçant.",
      encadre: {
        titre: "L'idée",
        texte: "L'antécédent est toujours écrit AVANT le pronom. On remonte, on ne devine pas.",
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
          "Dès la deuxième phrase d'un texte, l'auteur met des pronoms à la place des noms. Perdre le fil, c'est lire encore les mots sans suivre l'histoire — et rien, dans la copie, ne le montre.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Pronom » vient du latin pronomen : pro, « à la place de », et nomen, « le nom ». Le mot dit son métier. « Antécédent » vient de antecedere, « marcher devant ».",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePronoms6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Sujet ou complément ?",
    badge: "La place décide",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Devant le verbe",
        contenu:
          "« Il dort. » Je, tu, il, elle, nous, vous, ils, elles : le pronom sujet commande l'accord du verbe.",
      },
      droite: {
        variante: "ok",
        titre: "Entre le sujet et le verbe",
        contenu:
          "« Je le vois. » Le, la, les, lui, leur : en français, le pronom complément passe DEVANT le verbe.",
      },
    },
  },
  {
    titre: "Le piège du mot « les »",
    badge: "Deux natures",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Déterminant",
        contenu: "« LES enfants » : il accompagne un nom, il fait partie du groupe nominal.",
      },
      droite: {
        variante: "piege",
        titre: "Pronom",
        contenu:
          "« ils LES ramassent » : il est devant le verbe et ne se rapporte à aucun nom écrit à côté. Il en remplace un.",
      },
    },
  },
  {
    titre: "Trouver l'antécédent",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Léa a pris son cartable, puis elle est sortie. »",
      question: "À qui renvoie « elle » ?",
      correction:
        "À Léa. « cartable » est plus proche, mais il est masculin. On remplace pour vérifier : « puis Léa est sortie » se tient.",
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
      enonce: "« Le pêcheur répare son filet ; il le pose ensuite. »",
      question: "Que reprend « il », et que reprend « le » ?",
      indice: "Regarde la place de chacun : devant le verbe, ou entre le sujet et le verbe ?",
      correction:
        "« il » est sujet et reprend « le pêcheur ». « le » est complément d'objet direct et reprend « son filet ». Deux pronoms côte à côte, deux fils différents.",
    },
  },
];
