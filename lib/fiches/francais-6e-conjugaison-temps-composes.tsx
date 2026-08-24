// ─── Fiche de cours : les temps composés (6e) ─────────────────────────────────
// DEUXIÈME FICHE DE CONJUGAISON DE LA 6e. La première apprenait à démonter une
// forme verbale en trois wagons ; celle-ci montre le cas où le verbe ne tient
// plus dans un seul mot.
//
// ⭐ LE BO DONNE LE DESSIN AVANT NOUS. « Consolider la maîtrise de la
// conjugaison des temps composés (passé composé et plus-que-parfait). CONNAÎTRE
// LEUR COMPOSITION EN DEUX PARTIES (auxiliaire + participe passé). » Deux
// parties : deux caisses accrochées. Le mode `composee` du canvas ne fait que
// rendre littérale la formule du programme.
//
// ⭐ CE QUI SÉPARE LE PLUS-QUE-PARFAIT DU PASSÉ COMPOSÉ TIENT DANS UN SEUL
// WAGON. « il a mangé » et « il avait mangé » : même participe, même verbe,
// même sujet. Seul l'auxiliaire a reculé, du présent à l'imparfait — et le
// récit recule d'un cran avec lui. C'est pourquoi la fiche démonte l'auxiliaire
// lui-même (mode `wagons`) : « avait » = av- + -ai- + -t, l'imparfait d'avoir.
//
// ⭐ ET L'OBJECTIF LE PLUS COÛTEUX DE L'ANNÉE : « Accorder le participe passé
// avec le COD pour les verbes étudiés et conjugués avec l'auxiliaire AVOIR
// (PRONOM PERSONNEL ANTÉPOSÉ) ». Le canvas `conjugaison` ne peut pas le
// montrer — le COD antéposé est un fait de PHRASE, pas de forme verbale. Le
// défi emprunte donc le canvas `phrase`, comme la fiche des accords : l'arc
// part du COD, qui est à gauche, et la direction dit la règle.
//
// Alignée sur lib/tutor-v4/knowledge/francais/6e/microSkills.ts
// (notionId `conjugaison_temps_composes`), sur les items 6e_fr_fixed_comp_tc_1
// à 5 de lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts, et sur les pools
// CONJ_PASSE_COMPOSE et CONJ_PLUS_QUE_PARFAIT de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - 6e_conj_composer            → définition, figure, propriété « Deux parties »,
//                                 formule, méthode 1, exemple 1
// - 6e_conj_passe_compose       → propriétés « Avoir » et « Être », méthodes 2
//                                 et 3, usages, exemples 2 et 3, pièges 1 et 2,
//                                 entraînements 1 à 3
// - 6e_conj_plus_que_parfait    → propriétés « L'auxiliaire recule » et « Un
//                                 passé avant le passé », exemple 4, piège 3,
//                                 entraînements 4 et 5
// - 6e_conj_passe_compose_defi  → le défi, dessiné (exemple 5)
//
// Les formes sont CELLES DE LA BANQUE : « Nous avons mangé une pomme », « Tu as
// regardé un film », « Ils sont partis », « Il est arrivé en retard », « Elles
// sont arrivées à l'heure », « Elle a mangé une mangue », « il avait mangé »,
// « Quand je suis arrivé, il était déjà parti », « Nous avions fini avant la
// pluie », « La lettre qu'il a écrite est arrivée ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px une fois à l'échelle.
// ⛔ LA FRISE NE VA QUE DANS UN BLOC D'EXEMPLE (CATALOGUE, § conjugaison) : elle
// prend sa largeur sur ses repères, et une carte de propriété n'en a pas assez.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonRepere,
  ConjugaisonSegment,
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

// Les deux caisses accrochées : « la composition en deux parties » du BO.
// La couleur vient du rôle, jamais de l'appelant — l'auxiliaire est rouge comme
// le verbe conjugué l'est dans le canvas `phrase`.
function composee(opts: {
  pronom?: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
  accord?: { label?: string; absent?: boolean };
  titre?: string;
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "composee",
        titre: opts.titre,
        pronom: opts.pronom,
        auxiliaire: opts.auxiliaire,
        participe: opts.participe,
        accord: opts.accord,
        legende: opts.legende,
      }}
    />
  );
}

function train(opts: {
  infinitif?: string;
  pronom?: string;
  segments: ConjugaisonSegment[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "wagons",
        infinitif: opts.infinitif,
        pronom: opts.pronom,
        segments: opts.segments,
        legende: opts.legende,
      }}
    />
  );
}

// ⛔ RÉSERVÉE AUX BLOCS D'EXEMPLE. La frise calcule sa largeur sur ses repères ;
// dans une carte de propriété sur trois colonnes, elle tombe sous le seuil.
function frise(opts: { reperes: ConjugaisonRepere[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{ kind: "conjugaison", mode: "frise", reperes: opts.reperes, legende: opts.legende }}
    />
  );
}

// Le COD antéposé est un fait de PHRASE : il emprunte le canvas des fiches de
// grammaire, avec la même grammaire visuelle (arc d'accord au-dessus).
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

// ─── Les formes de la banque, en deux parties ─────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : la toute première question du pool
// CONJ_PASSE_COMPOSE, « Nous ___ mangé une pomme. »
const composeeReference = composee({
  pronom: "nous",
  auxiliaire: { texte: "avons", note: "présent" },
  participe: { texte: "mangé", note: "participe" },
  legende: "Deux caisses, un seul verbe.",
});

const composeeAvoir = composee({
  pronom: "tu",
  auxiliaire: { texte: "as", note: "avoir" },
  participe: { texte: "regardé", note: "participe" },
  legende: "« regarder » prend l'auxiliaire avoir.",
});

// AVEC ÊTRE, LE PARTICIPE S'ACCORDE — l'arc part du sujet.
const composeeEtre = composee({
  pronom: "Elles",
  auxiliaire: { texte: "sont", note: "être" },
  participe: { texte: "arrivées", note: "accordé" },
  accord: { label: "fém. plur." },
  legende: "Avec être, on accorde au sujet.",
});

const composeeEtreSingulier = composee({
  pronom: "Il",
  auxiliaire: { texte: "est", note: "être" },
  participe: { texte: "arrivé", note: "participe" },
  accord: { label: "masc. sing." },
  legende: "« arriver » se conjugue avec être.",
});

// … ET AVEC AVOIR, NON. La croix EST le dessin : montrer l'absence d'accord vaut
// mieux que l'écrire sous la figure.
const composeeAvoirSansAccord = composee({
  pronom: "Elle",
  auxiliaire: { texte: "a", note: "avoir" },
  participe: { texte: "mangé", note: "participe" },
  accord: { absent: true },
  legende: "« Elle a mangé une mangue. »",
});

// LE COUPLE QUI DIT TOUT : même participe, seul l'auxiliaire a reculé.
const composeePasseCompose = composee({
  pronom: "il",
  auxiliaire: { texte: "a", note: "présent" },
  participe: { texte: "mangé", note: "participe" },
  legende: "Auxiliaire au présent.",
});

const composeePlusQueParfait = composee({
  pronom: "il",
  auxiliaire: { texte: "avait", note: "imparfait" },
  participe: { texte: "mangé", note: "participe" },
  legende: "Auxiliaire à l'imparfait.",
});

const composeePqpEtre = composee({
  pronom: "il",
  auxiliaire: { texte: "était", note: "imparfait" },
  participe: { texte: "parti", note: "participe" },
  legende: "« il était déjà parti. »",
});

const composeePqpAvions = composee({
  pronom: "nous",
  auxiliaire: { texte: "avions", note: "imparfait" },
  participe: { texte: "fini", note: "participe" },
  legende: "« avons » donnerait le passé composé.",
});

// L'AUXILIAIRE LUI-MÊME EST UN TRAIN. C'est le pont avec la fiche précédente :
// ce qui recule d'un cran, c'est la marque de temps DE L'AUXILIAIRE.
const trainAuxiliaire = train({
  infinitif: "avoir",
  pronom: "il",
  segments: [
    { texte: "av", role: "radical", note: "avoir" },
    { texte: "ai", role: "temps", note: "imparfait" },
    { texte: "t", role: "personne", note: "il" },
  ],
  legende: "C'est l'auxiliaire qui recule.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2). Item 6e_fr_fixed_comp_tc_5 :
// « La lettre qu'il a ___ est arrivée. »
const phraseDefi = phrase({
  mots: [
    { texte: "La" },
    { texte: "lettre", focus: true },
    { texte: "qu'" },
    { texte: "il" },
    { texte: "a" },
    { texte: "écrite" },
  ],
  groupes: [{ mots: [0, 1], label: "COD" }],
  liens: [{ de: 1, vers: 5, label: "féminin", type: "accord" }],
  legende: "Le COD est AVANT : on accorde.",
});

// ⛔ EN BLOC D'EXEMPLE UNIQUEMENT. Mesurée : 285 px de large, soit 11,9 px de
// texte même dans une carte de 250 — mais le CATALOGUE la range en exemple, et
// des repères plus longs la feraient sortir. On ne joue pas avec la marge.
const friseSituer = frise({
  reperes: [
    { texte: "a mangé", zone: "passe" },
    { texte: "mange", zone: "present" },
    { texte: "mangera", zone: "futur" },
  ],
  legende: "Le passé composé dit un passé fini.",
});

const pieges = [
  "Choisir l'auxiliaire au hasard : « il a tombé » n'existe pas. Les verbes de déplacement — aller, venir, partir, arriver, tomber, entrer, sortir — se conjuguent avec être, et tous les verbes pronominaux aussi.",
  "Oublier l'accord avec être : « Elles sont arrivé » est faux. Avec être, le participe se comporte comme un adjectif et suit le sujet — « Elles sont arrivées ».",
  "Confondre « il a fini » et « il avait fini » : le premier est un passé ordinaire, le second recule d'un cran, avant un autre moment du passé. C'est l'auxiliaire, et lui seul, qui fait la différence.",
  "Écrire le participe à l'infinitif : « tu as regarder » se dit comme « tu as regardé » mais s'écrit autrement. Le test : remplace par « prendre » — « tu as pris » se dit, « tu as prendre » ne se dit pas.",
];

const aRetenir = [
  "Un temps composé s'écrit en deux parties : un auxiliaire (être ou avoir) conjugué, puis le participe passé du verbe.",
  "L'auxiliaire au présent donne le passé composé ; le même auxiliaire à l'imparfait donne le plus-que-parfait, qui recule d'un cran dans le passé.",
  "Avec être, le participe s'accorde avec le sujet ; avec avoir, il ne s'accorde qu'avec un COD placé avant lui.",
];

export const ficheConjugaisonTempsComposes6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "conjugaison-temps-composes",
  titre: "Les temps composés : passé composé et plus-que-parfait",
  accroche:
    "« il a mangé », « il avait mangé ». Même verbe, même participe, même sujet : un seul mot a changé, et pourtant le récit a reculé d'un cran. Ce mot, c'est l'auxiliaire — la première des deux caisses.",
  identite: [
    { label: "Mots clés", valeur: "Temps composé, auxiliaire, participe passé, antériorité" },
    { label: "Le secret", valeur: "Le verbe tient en deux mots : l'auxiliaire porte le temps" },
    { label: "Outil", valeur: "Regarder l'auxiliaire avant de regarder le participe" },
  ],
  definition: {
    texte:
      "Un temps composé se forme en deux parties : un auxiliaire — être ou avoir — conjugué, suivi du participe passé du verbe. L'auxiliaire porte le temps et la personne ; le participe porte le sens. Quand l'auxiliaire est au présent, on obtient le passé composé : « il a mangé ». Quand il est à l'imparfait, on obtient le plus-que-parfait : « il avait mangé », qui raconte une action passée AVANT une autre action passée.",
  },
  figure: {
    schema: composeeReference,
    legende:
      "« nous avons mangé ». La première caisse, « avons », est l'auxiliaire : c'est elle qui est conjuguée, et c'est elle qui dit le temps et la personne. La seconde, « mangé », est le participe passé : il ne bouge pas quand on change de personne. Deux mots, un seul verbe — c'est exactement ce que le programme appelle « la composition en deux parties ».",
  },
  proprietes: [
    {
      titre: "Deux parties, jamais une",
      texte: "Un auxiliaire conjugué, puis un participe passé. Le participe seul n'est pas un verbe conjugué.",
      schema: composeeReference,
    },
    {
      titre: "L'auxiliaire AVOIR",
      texte: "C'est le cas le plus fréquent : manger, regarder, finir, prendre, voir se conjuguent avec avoir.",
      schema: composeeAvoir,
    },
    {
      titre: "L'auxiliaire ÊTRE",
      texte: "Les verbes de déplacement — aller, venir, partir, arriver, tomber — se conjuguent avec être.",
      schema: pile(composeeEtreSingulier, composeeEtre),
    },
    {
      titre: "Avec être, le participe s'accorde",
      texte: "Il suit le sujet comme un adjectif : « Elles sont arrivées ». Avec avoir, il ne le suit pas.",
      schema: pile(composeeEtre, composeeAvoirSansAccord),
    },
    {
      titre: "L'auxiliaire recule d'un cran",
      texte: "Au présent il donne le passé composé ; à l'imparfait, le plus-que-parfait. Le participe, lui, ne change pas.",
      schema: pile(composeePasseCompose, composeePlusQueParfait),
    },
    {
      titre: "Un passé avant le passé",
      texte: "Le plus-que-parfait dit ce qui avait déjà eu lieu quand l'histoire commence.",
      schema: composeePqpEtre,
    },
  ],
  reel: {
    texte:
      "Le passé composé est le temps du passé que l'on parle. Dans un message, au téléphone, en racontant sa journée, personne ne dit « je partis » : on dit « je suis parti ». Et dès qu'on veut expliquer pourquoi quelque chose est arrivé, le plus-que-parfait s'invite tout seul — « je suis arrivé en retard, le bus était déjà passé ». Deux temps qu'on emploie tous les jours sans y penser : la 6e les nomme et apprend à les écrire.",
  },
  historique: {
    texte:
      "« J'ai mangé » a d'abord voulu dire « je possède quelque chose de mangé ». En latin, « habeo epistulam scriptam » signifiait « je tiens une lettre écrite » : « écrite » était un adjectif, et il s'accordait avec « lettre ». Le tour est devenu un temps, mais l'accord est resté quand le complément passe devant — « la lettre qu'il a écrite ». La règle la plus détestée du français est le fossile d'une phrase latine.",
  },
  formule: {
    contexte: "Les deux temps composés du programme.",
    expression: "auxiliaire au présent → passé composé · à l'imparfait → plus-que-parfait",
    legende:
      "Un seul mot change entre les deux. « il a mangé » : l'auxiliaire « a » est au présent, l'action est un passé ordinaire. « il avait mangé » : l'auxiliaire « avait » est à l'imparfait, et l'action recule avant un autre moment du passé. Le participe, lui, ne bouge jamais d'un temps à l'autre.",
    schema: pile(composeePasseCompose, composeePlusQueParfait),
  },
  methode: [
    {
      titre: "Je choisis l'auxiliaire",
      texte: "Verbe de déplacement ou pronominal ? c'est être. Tous les autres ? c'est avoir.",
      schema: composeeEtreSingulier,
    },
    {
      titre: "Je conjugue l'auxiliaire, pas le verbe",
      texte: "Présent pour le passé composé, imparfait pour le plus-que-parfait. Le participe ne bouge pas.",
      schema: trainAuxiliaire,
    },
    {
      titre: "Je regarde s'il faut accorder",
      texte: "Être : j'accorde avec le sujet. Avoir : seulement si le COD est placé avant le participe.",
      schema: pile(composeeEtre, composeeAvoirSansAccord),
    },
  ],
  usages: [
    {
      titre: "Raconter ce qui est fini",
      detail: "« J'ai fini mes devoirs » : l'action est terminée, et elle compte encore maintenant.",
      schema: composeeReference,
    },
    {
      titre: "Reculer d'un cran",
      detail: "« Il était déjà parti quand je suis arrivé » : le départ précède l'arrivée.",
      schema: composeePqpEtre,
    },
    {
      titre: "Accorder, ou non",
      detail: "Être : « Elles sont arrivées ». Avoir sans COD devant : « Elle a mangé », rien n'est ajouté.",
      schema: composeeAvoirSansAccord,
    },
  ],
  exemples: [
    {
      titre: "Reconnaître un temps composé",
      donnees: "« J'ai fini mes devoirs. » face à « Je finissais mes devoirs. »",
      schema: friseSituer,
      question: "Laquelle des deux phrases est à un temps composé, et à quoi le voit-on ?",
      solution:
        "La première. « ai fini » s'écrit en deux mots : l'auxiliaire « ai » plus le participe passé « fini ». « finissais » est un seul mot, donc un temps simple — l'imparfait. Le test est visuel avant d'être grammatical : un temps composé, ça se compte en mots.",
    },
    {
      titre: "Choisir l'auxiliaire",
      donnees: "« Ils ___ partis en vacances. » et « Nous ___ mangé une pomme. »",
      schema: pile(composeeEtreSingulier, composeeReference),
      question: "Quel auxiliaire faut-il dans chaque phrase ?",
      solution:
        "« Ils SONT partis » et « Nous AVONS mangé ». « partir » est un verbe de déplacement : il prend être. « manger » ne l'est pas : il prend avoir. Et comme « partir » prend être, son participe s'accorde avec le sujet — d'où le « s » de « partis ».",
    },
    {
      titre: "Accorder avec être",
      donnees: "« Elles sont arrivé___ à l'heure. »",
      schema: composeeEtre,
      question: "Quelle terminaison faut-il ?",
      solution:
        "« arrivées ». L'auxiliaire est « sont », donc être : le participe s'accorde avec le sujet « Elles », féminin pluriel. Avec être, il n'y a pas d'autre question à se poser — on ne cherche même pas de complément.",
    },
    {
      titre: "Le plus-que-parfait",
      donnees: "« Quand je suis arrivé, il ___ déjà parti. »",
      schema: pile(composeePqpEtre, composeePqpAvions),
      question: "Faut-il « est » ou « était » ?",
      solution:
        "« était ». Les deux actions sont passées, mais le départ a eu lieu AVANT l'arrivée : il faut reculer d'un cran, donc mettre l'auxiliaire à l'imparfait. « il est parti » raconterait un simple passé, sans dire lequel des deux vient en premier.",
    },
    {
      titre: "Le défi",
      donnees: "« La lettre qu'il a écrit___ est arrivée. »",
      schema: phraseDefi,
      question: "Faut-il accorder le participe, et pourquoi ?",
      solution:
        "« écrite ». L'auxiliaire est « a », donc avoir : on ne regarde pas le sujet, on cherche le complément d'objet direct. Ici c'est « qu' », qui reprend « la lettre » et se trouve AVANT le participe. Le COD est devant : on accorde, au féminin singulier. S'il était derrière — « il a écrit une lettre » —, on n'écrirait rien.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Un temps composé se forme avec…",
      correction:
        "Un auxiliaire et un participe passé. Le programme le dit en toutes lettres : les temps composés « se composent en deux parties ». Ni deux infinitifs, ni un radical et une terminaison.",
    },
    {
      question: "Quel auxiliaire pour « aller » au passé composé ?",
      correction:
        "Être : « je suis allé ». Les verbes de déplacement — aller, venir, partir, arriver, tomber — se conjuguent avec être, et leur participe s'accorde donc avec le sujet.",
    },
    {
      question: "« Vous ___ chanté une chanson. »",
      correction:
        "« avez ». « chanter » se conjugue avec avoir, et l'auxiliaire s'accorde avec « vous » : vous avez. Le participe « chanté », lui, ne bouge pas — le COD « une chanson » est placé après.",
    },
    {
      question: "« Il ___ déjà quand nous sommes arrivés. » (partir, plus-que-parfait)",
      correction:
        "« était parti ». Plus-que-parfait = auxiliaire à l'imparfait + participe passé. Il dit ce qui a eu lieu AVANT un autre moment du passé — ici, avant notre arrivée.",
    },
    {
      question: "« Nous ___ fini avant la pluie. » (plus-que-parfait)",
      correction:
        "« avions ». « avons » donnerait le passé composé, « aurons » le futur : c'est bien l'imparfait de l'auxiliaire qui fait le plus-que-parfait.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesConjugaisonTempsComposes6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les temps composés - 6e",
    section: {
      type: "objectif",
      phrase: "Un verbe qui tient en deux mots",
      sousPhrase:
        "L'auxiliaire porte le temps et la personne ; le participe porte le sens. Le programme dit : « la composition en deux parties ».",
      encadre: {
        titre: "L'idée",
        texte: "Ce n'est pas le verbe qu'on conjugue, c'est son auxiliaire.",
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
          "Personne ne dit « je partis » : on dit « je suis parti ». Et pour expliquer, le plus-que-parfait s'invite tout seul — « je suis arrivé en retard, le bus était déjà passé ».",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« J'ai mangé » voulait dire « je possède quelque chose de mangé ». En latin, « habeo epistulam scriptam » = « je tiens une lettre écrite » : « écrite » était un adjectif, et il s'accordait. La règle du participe passé est le fossile de cette phrase.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonTempsComposes6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Être ou avoir ?",
    badge: "Choisir l'auxiliaire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "ÊTRE",
        contenu:
          "Les verbes de déplacement — aller, venir, partir, arriver, tomber, entrer, sortir — et tous les verbes pronominaux. Le participe s'accorde alors avec le sujet.",
      },
      droite: {
        variante: "ok",
        titre: "AVOIR",
        contenu:
          "Tous les autres : manger, regarder, finir, prendre, voir. Le participe ne s'accorde pas avec le sujet — seulement avec un COD placé avant lui.",
      },
    },
  },
  {
    titre: "Un seul mot les sépare",
    badge: "Passé composé / plus-que-parfait",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "« il a mangé »",
        contenu:
          "L'auxiliaire est au présent : c'est le passé composé. L'action est passée, un point c'est tout.",
      },
      droite: {
        variante: "ok",
        titre: "« il avait mangé »",
        contenu:
          "Le même auxiliaire à l'imparfait : c'est le plus-que-parfait. L'action recule d'un cran, avant un autre moment du passé.",
      },
    },
  },
  {
    titre: "Le plus-que-parfait en situation",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Quand je suis arrivé, il ___ déjà parti. »",
      question: "« est » ou « était » ?",
      correction:
        "« était ». Les deux actions sont passées, mais le départ précède l'arrivée : on recule d'un cran en mettant l'auxiliaire à l'imparfait.",
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
      enonce: "« La lettre qu'il a écrit___ est arrivée. »",
      question: "Faut-il accorder le participe, et pourquoi ?",
      indice: "L'auxiliaire est « a ». Cherche le complément d'objet direct, puis regarde où il est.",
      correction:
        "« écrite ». Le COD « qu' » reprend « la lettre » et se place AVANT le participe : avec avoir, on accorde alors avec lui.",
    },
  },
];
