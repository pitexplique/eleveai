// ─── Fiche de cours : le participe passé et la négation (CM2) ─────────────────
// QUATRIÈME ET DERNIÈRE FICHE DE CONJUGAISON DU CM2. La précédente triait les
// trois passés ; celle-ci s'arrête sur la mécanique du temps composé : comment
// il se fabrique, comment son participe s'accorde, et où se glisse la négation.
//
// ⭐ QUATRE OBJECTIFS DU BO, ET ILS SE SUIVENT.
// « Connaître la composition EN DEUX PARTIES (auxiliaire + participe passé) des
// temps composés » → le mode `composee` : deux caisses accrochées.
// « Accorder le participe passé avec le SUJET dans le cas de l'auxiliaire être »
// → l'arc d'accord, qui part du sujet.
// « Accorder le participe passé avec le COD pour les verbes […] conjugués avec
// l'auxiliaire AVOIR » → la CROIX quand le COD est derrière, l'arc du canvas
// `phrase` quand il est devant.
// « Effectuer la transformation à la forme négative d'un verbe aux temps
// composés EN PLAÇANT LES ADVERBES DE NÉGATION AU BON EMPLACEMENT ».
//
// ⛔ CE DERNIER OBJECTIF N'ÉTAIT SERVI PAR RIEN JUSQU'AU 23/08/2026. La micro
// `cm2_conj_negation_passe_compose` existait et portait l'intitulé du BO mot
// pour mot ; son `microId` contenant « passe_compose », elle tombait sur le pool
// du passé composé et recevait « Quel auxiliaire complète : "Ils ___ partis ?" ».
// Une question juste, sur un autre sujet. Le pool CONJ_NEGATION_COMPOSEE et sa
// branche nommée ont été écrits pour cette fiche — les exemples ci-dessous en
// viennent, comme le veut la règle : l'élève doit retrouver les siens.
//
// ⭐ ET LA NÉGATION SE DESSINE SUR UNE PHRASE, PAS SUR UNE FORME. Le canvas
// `conjugaison` n'a pas de mode pour elle, et c'est normal : « ne » et « pas »
// ne sont pas des morceaux du verbe, ce sont des mots qui l'entourent. Le canvas
// `phrase` s'en charge, avec un crochet posé sur ce qui est encadré — le VERBE
// à un temps simple, le SEUL AUXILIAIRE à un temps composé. Les deux dessins
// côte à côte disent la règle sans une ligne d'explication.
//
// Alignée sur lib/tutor-v4/knowledge/francais/cm2/microSkills.ts
// (notionId `conjugaison_participe`) et sur les pools CONJ_PASSE_COMPOSE,
// PARTICIPE_PASSE et CONJ_NEGATION_COMPOSEE de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion, défi compris) :
// - cm2_conj_passe_compose_forme    → définition, figure, propriété « Deux
//                                     parties », méthode 1, exemple 1,
//                                     entraînement 1
// - cm2_orth_participe_passe        → propriétés « Avec être », « Avec avoir »
//                                     et « Le COD placé avant », formule,
//                                     méthode 2, usages, exemples 2 et 3,
//                                     pièges 1 et 2, entraînements 2 et 3
// - cm2_conj_negation_passe_compose → propriétés « La négation encadre » et
//                                     « jamais, plus, rien », méthode 3,
//                                     exemple 4, pièges 3 et 4,
//                                     entraînements 4 et 5
// - cm2_conj_passe_compose_defi     → le défi, dessiné (exemple 5)
//
// Les phrases sont CELLES DE LA BANQUE : « Nous avons mangé une pomme », « Les
// enfants sont partis tôt », « Elles sont venues hier », « Il a pris son
// cartable », « Nous avons ramassé des letchis », « La mangue qu'elle a
// mangée », « Il n'a pas mangé », « Ils ne sont pas arrivés à l'heure ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px, aucun texte hors cadre.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types";

function composee(opts: {
  pronom?: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
  accord?: { label?: string; absent?: boolean };
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "composee",
        pronom: opts.pronom,
        auxiliaire: opts.auxiliaire,
        participe: opts.participe,
        accord: opts.accord,
        legende: opts.legende,
      }}
    />
  );
}

// La négation et le COD antéposé sont des faits de PHRASE, pas de forme verbale.
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
        largeurMax: 250,
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

// ─── Les formes de la banque ──────────────────────────────────────────────────

// LA FIGURE DE RÉFÉRENCE : la première question du pool CONJ_PASSE_COMPOSE.
const composeeReference = composee({
  pronom: "nous",
  auxiliaire: { texte: "avons", note: "avoir" },
  participe: { texte: "mangé", note: "participe" },
  legende: "Deux caisses, un seul verbe.",
});

// AVEC ÊTRE, L'ARC PART DU SUJET.
const composeeEtre = composee({
  pronom: "Ils",
  auxiliaire: { texte: "sont", note: "être" },
  participe: { texte: "partis", note: "accordé" },
  accord: { label: "pluriel" },
  legende: "Avec être : accord avec le sujet.",
});

// … ET AVEC AVOIR, LA CROIX. Montrer l'absence d'accord par un arc barré est
// plus fort que de l'écrire sous la figure.
const composeeAvoir = composee({
  pronom: "Il",
  auxiliaire: { texte: "a", note: "avoir" },
  participe: { texte: "pris", note: "participe" },
  accord: { absent: true },
  legende: "Le COD est après : rien ne bouge.",
});

// LE COD PLACÉ AVANT : l'arc part de la gauche, et la direction dit la règle.
const phraseCodAvant = phrase({
  mots: [
    { texte: "La" },
    { texte: "mangue", focus: true },
    { texte: "qu'" },
    { texte: "elle" },
    { texte: "a" },
    { texte: "mangée" },
  ],
  groupes: [{ mots: [0, 1], label: "COD" }],
  liens: [{ de: 1, vers: 5, label: "féminin", type: "accord" }],
  legende: "Le COD est AVANT : on accorde.",
});

// LES DEUX DESSINS DE LA NÉGATION, ET ILS NE VALENT QU'ENSEMBLE. Le crochet
// n'entoure pas la même chose : le VERBE à un temps simple, le SEUL AUXILIAIRE
// à un temps composé. C'est toute la règle, et elle se voit.
const phraseNegationSimple = phrase({
  mots: [
    { texte: "Il" },
    { texte: "ne" },
    { texte: "mange", nature: "verbe", focus: true },
    { texte: "pas" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 3], label: "négation" }],
  legende: "Le verbe est encadré.",
});

const phraseNegationComposee = phrase({
  mots: [
    { texte: "Il" },
    { texte: "n'" },
    { texte: "a", nature: "auxiliaire", focus: true },
    { texte: "pas" },
    { texte: "mangé", nature: "participe" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 3], label: "négation" }],
  legende: "Seul l'auxiliaire est encadré.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2) : la négation avec l'auxiliaire être.
const phraseDefi = phrase({
  mots: [
    { texte: "Ils" },
    { texte: "ne" },
    { texte: "sont", nature: "auxiliaire", focus: true },
    { texte: "pas" },
    { texte: "partis", nature: "participe" },
    { texte: "." },
  ],
  groupes: [{ mots: [1, 3], label: "négation" }],
  legende: "Même règle avec l'auxiliaire être.",
});

const pieges = [
  "Choisir l'auxiliaire au hasard : « il a tombé » n'existe pas. Les verbes de déplacement — aller, venir, partir, arriver, tomber, entrer, sortir — se conjuguent avec être, et leur participe s'accorde alors avec le sujet.",
  "Accorder avec avoir quand le COD est APRÈS : « Nous avons ramassé des letchis » ne prend rien. On n'accorde que si le complément d'objet direct est placé avant le participe.",
  "Écrire « Il n'a mangé pas » : à un temps composé, « ne » et « pas » entourent le SEUL AUXILIAIRE. Le participe reste après. C'est l'auxiliaire qui est le mot conjugué, donc c'est lui qu'on encadre.",
  "Oublier le « ne » : « Il a pas mangé » se dit, mais ne s'écrit pas. À l'écrit, la négation a toujours deux morceaux — « ne » (ou « n' ») et « pas », « jamais », « plus », « rien ».",
];

const aRetenir = [
  "Un temps composé s'écrit en deux parties : un auxiliaire (être ou avoir) conjugué, puis le participe passé du verbe.",
  "Avec être, le participe s'accorde avec le sujet ; avec avoir, seulement si le COD est placé avant lui.",
  "À un temps composé, la négation encadre l'AUXILIAIRE : « il n'a pas mangé », jamais « il n'a mangé pas ».",
];

export const ficheConjugaisonParticipeCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "conjugaison-participe",
  titre: "Le participe passé : accorder, et où mettre la négation",
  accroche:
    "« Il n'a pas mangé. » Pourquoi pas « Il n'a mangé pas » ? Parce que dans un temps composé, le mot vraiment conjugué n'est pas celui qu'on croit : c'est l'auxiliaire. Et tout ce qui touche au verbe — la négation, l'accord — se règle sur lui.",
  identite: [
    { label: "Mots clés", valeur: "Auxiliaire, participe passé, accord, COD, négation" },
    { label: "Le secret", valeur: "Dans un verbe en deux mots, c'est l'auxiliaire qui commande" },
    { label: "Outil", valeur: "Repérer l'auxiliaire d'abord, tout le reste en découle" },
  ],
  definition: {
    texte:
      "Un temps composé se forme en deux parties : un auxiliaire — être ou avoir — conjugué, suivi du participe passé du verbe. L'auxiliaire porte le temps et la personne ; le participe porte le sens. C'est cette coupure qui explique deux règles d'un coup. L'accord : avec être, le participe s'accorde avec le sujet ; avec avoir, il ne s'accorde qu'avec un complément d'objet direct placé avant lui. Et la négation : « ne » et « pas » encadrent l'auxiliaire, parce que l'auxiliaire est le mot conjugué.",
  },
  figure: {
    schema: composeeReference,
    legende:
      "« nous avons mangé ». La première caisse, « avons », est l'auxiliaire : c'est elle qui est conjuguée, et c'est elle qui dit le temps et la personne. La seconde, « mangé », est le participe passé : il ne bouge pas quand on change de personne. Retiens cette coupure — c'est elle qui commande l'accord ET la place de la négation.",
  },
  proprietes: [
    {
      titre: "Deux parties, jamais une",
      texte: "Un auxiliaire conjugué, puis un participe passé. Le participe seul n'est pas un verbe conjugué.",
      schema: composeeReference,
    },
    {
      titre: "Avec ÊTRE : accord avec le sujet",
      texte: "Le participe se comporte comme un adjectif : « Ils sont partis », « Elles sont venues ».",
      schema: composeeEtre,
    },
    {
      titre: "Avec AVOIR : pas d'accord avec le sujet",
      texte: "« Il a pris son cartable » : le COD est après le participe, rien ne bouge.",
      schema: composeeAvoir,
    },
    {
      titre: "Sauf si le COD est placé avant",
      texte: "« La mangue qu'elle a mangée » : le COD est devant, repris par « qu' » — on accorde.",
      schema: phraseCodAvant,
    },
    {
      titre: "La négation encadre l'AUXILIAIRE",
      texte: "À un temps simple elle entoure le verbe ; à un temps composé, l'auxiliaire seul.",
      schema: pile(phraseNegationSimple, phraseNegationComposee),
    },
    {
      titre: "jamais, plus, rien : même place",
      texte: "« Je n'ai JAMAIS vu », « Elle n'est PLUS revenue », « Nous n'avons RIEN compris ».",
      schema: phraseNegationComposee,
    },
  ],
  reel: {
    texte:
      "La négation mal placée s'entend tout de suite quand on relit à voix haute — et elle se voit encore plus à l'écrit. Or c'est justement à l'écrit qu'on l'oublie : à l'oral, presque personne ne dit le « ne » (« il a pas fini »), et cette habitude passe dans les rédactions. Le CM2 est l'année où l'on apprend que la langue qu'on parle et celle qu'on écrit ne se ressemblent pas tout à fait — et que l'écrit garde les deux morceaux.",
  },
  historique: {
    texte:
      "« Pas » voulait dire un pas, celui qu'on fait en marchant. En ancien français, on niait avec « ne » tout seul, puis on a pris l'habitude d'ajouter la plus petite quantité imaginable pour insister : « je ne marche pas » (pas même un pas), « je ne bois goutte » (pas même une goutte), « je ne mange mie » (pas même une miette). Trois candidats, un seul a gagné — et aujourd'hui « pas » nie tout, même quand on ne bouge pas d'un pouce.",
  },
  formule: {
    contexte: "Le participe passé, en deux questions.",
    expression: "être ? → le sujet. avoir ? → le COD, s'il est avant.",
    legende:
      "On regarde d'abord l'auxiliaire. Avec être, on accorde avec le sujet, toujours. Avec avoir, on cherche le complément d'objet direct : s'il est après le participe, on n'écrit rien ; s'il est avant — souvent un pronom, « l' », « les », « qu' » —, on accorde avec lui.",
    schema: pile(composeeEtre, phraseCodAvant),
  },
  methode: [
    {
      titre: "Je trouve l'auxiliaire",
      texte: "C'est le mot conjugué : c'est lui qui porte le temps, l'accord et la négation.",
      schema: composeeReference,
    },
    {
      titre: "Être ou avoir ?",
      texte: "Être : j'accorde avec le sujet. Avoir : je cherche le COD et je regarde sa place.",
      schema: pile(composeeEtre, composeeAvoir),
    },
    {
      titre: "Je pose la négation autour de l'auxiliaire",
      texte: "« ne » devant, « pas » juste après. Le participe passé reste à la fin.",
      schema: phraseNegationComposee,
    },
  ],
  usages: [
    {
      titre: "Accorder avec être",
      detail: "« Ils sont partis tôt. » Le participe suit le sujet, comme un adjectif.",
      schema: composeeEtre,
    },
    {
      titre: "Ne pas accorder avec avoir",
      detail: "« Nous avons ramassé des letchis. » Le COD est après : « ramassé » ne bouge pas.",
      schema: composeeAvoir,
    },
    {
      titre: "Nier un temps composé",
      detail: "« Il n'a pas mangé. » Les deux morceaux de la négation entourent l'auxiliaire.",
      schema: phraseNegationComposee,
    },
  ],
  exemples: [
    {
      titre: "Reconnaître les deux parties",
      donnees: "« Nous ___ mangé une pomme. »",
      schema: composeeReference,
      question: "Quel auxiliaire, et pourquoi le verbe s'écrit-il en deux mots ?",
      solution:
        "« Nous AVONS mangé ». « manger » n'est pas un verbe de déplacement : il prend avoir. Et le verbe s'écrit en deux mots parce que c'est un temps composé : l'auxiliaire « avons » porte le présent et la personne « nous », le participe « mangé » porte le sens. Ni l'un ni l'autre ne suffit tout seul.",
    },
    {
      titre: "L'accord avec être",
      donnees: "« Les enfants sont parti___ tôt. » et « Elles sont venu___ hier. »",
      schema: composeeEtre,
      question: "Quelles terminaisons faut-il ?",
      solution:
        "« partis » et « venues ». Dans les deux cas l'auxiliaire est être, donc le participe s'accorde avec le sujet : « les enfants » est masculin pluriel, « Elles » est féminin pluriel. Avec être, il n'y a pas d'autre question à se poser — on ne cherche même pas de complément.",
    },
    {
      titre: "L'accord avec avoir",
      donnees: "« Il a pris son cartable. » puis « La mangue qu'elle a mangé___. »",
      schema: pile(composeeAvoir, phraseCodAvant),
      question: "Pourquoi accorde-t-on dans un cas et pas dans l'autre ?",
      solution:
        "Dans la première, le COD « son cartable » est APRÈS le participe : on n'accorde pas, on écrit « pris ». Dans la seconde, le COD est « la mangue », repris par « qu' » et placé AVANT : on accorde, on écrit « mangée ». Le verbe est le même, le complément est le même — seule sa place a changé.",
    },
    {
      titre: "Où va la négation",
      donnees: "« Il ne mange pas. » puis « Il ___ mangé. » (à la forme négative)",
      schema: pile(phraseNegationSimple, phraseNegationComposee),
      question: "Où faut-il poser « ne » et « pas » ?",
      solution:
        "« Il n'a pas mangé. » À un temps simple, « ne » et « pas » entourent le verbe : « il ne mange pas ». À un temps composé, ils entourent le SEUL AUXILIAIRE : « il n'a pas mangé ». La raison est toujours la même — l'auxiliaire est le mot conjugué, et la négation encadre le mot conjugué. « Il n'a mangé pas » ne se dit ni ne s'écrit.",
    },
    {
      titre: "Le défi",
      donnees: "« Ils sont arrivés à l'heure. » — mets la phrase à la forme négative.",
      schema: phraseDefi,
      question: "Où se placent les deux morceaux de la négation ?",
      solution:
        "« Ils ne sont pas arrivés à l'heure. » L'auxiliaire est « sont » : « ne » se met devant lui, « pas » juste après, et le participe « arrivés » ne bouge pas — il garde même son « s », puisque l'accord avec le sujet ne dépend pas de la négation. Deux règles dans une phrase, et toutes les deux se règlent sur l'auxiliaire.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Comment se forme le passé composé ?",
      correction:
        "Un auxiliaire (être ou avoir) au présent, suivi du participe passé. Ni deux infinitifs, ni un radical et une terminaison : deux mots, et le premier est le mot conjugué.",
    },
    {
      question: "« Les enfants sont parti___ tôt. »",
      correction:
        "« partis ». L'auxiliaire est être : le participe s'accorde avec le sujet, masculin pluriel.",
    },
    {
      question: "« Nous avons ramassé___ des letchis. »",
      correction:
        "« ramassé », sans rien. L'auxiliaire est avoir et le COD « des letchis » est placé APRÈS le participe : il n'y a pas d'accord.",
    },
    {
      question: "Mets à la forme négative : « Il a mangé. »",
      correction:
        "« Il n'a pas mangé. » « ne » (ici « n' ») devant l'auxiliaire, « pas » juste après, le participe à la fin. « Il n'a mangé pas » est faux.",
    },
    {
      question: "Mets à la forme négative avec « jamais » : « J'ai vu ce film. »",
      correction:
        "« Je n'ai jamais vu ce film. » « jamais » prend exactement la place de « pas » : après l'auxiliaire, avant le participe. Même chose pour « plus » et « rien ».",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesConjugaisonParticipeCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Participe & négation - CM2",
    section: {
      type: "objectif",
      phrase: "Dans un verbe en deux mots, l'auxiliaire commande",
      sousPhrase:
        "C'est lui qui porte le temps, qui décide de l'accord, et que la négation encadre.",
      encadre: {
        titre: "L'idée",
        texte: "« Il n'a pas mangé » : on encadre le mot conjugué, et ce mot est « a ».",
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
          "À l'oral, presque personne ne dit le « ne » : « il a pas fini ». Cette habitude passe dans les rédactions. L'écrit, lui, garde les deux morceaux — c'est l'une des différences entre la langue qu'on parle et celle qu'on écrit.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Pas » voulait dire un pas, celui qu'on fait en marchant. En ancien français on disait « je ne marche pas » (pas même un pas), « je ne bois goutte », « je ne mange mie ». Trois candidats, un seul a gagné — et « pas » nie tout, même quand on ne bouge pas.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonParticipeCm2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "L'accord dépend de l'auxiliaire",
    badge: "Être ou avoir",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Avec ÊTRE",
        contenu:
          "« Ils sont partis », « Elles sont venues ». Le participe s'accorde avec le sujet, toujours. Il n'y a pas d'autre question.",
      },
      droite: {
        variante: "ok",
        titre: "Avec AVOIR",
        contenu:
          "« Il a pris son cartable » : le COD est après, rien ne bouge. « La mangue qu'elle a mangée » : le COD est avant, on accorde.",
      },
    },
  },
  {
    titre: "Où se met la négation",
    badge: "Simple ou composé",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce qu'on écrit parfois",
        contenu:
          "« Il n'a mangé pas. » On a encadré le participe — mais le participe n'est pas le mot conjugué.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qu'il faut",
        contenu:
          "« Il n'a pas mangé. » « ne » devant l'auxiliaire, « pas » juste après. Et pareil avec jamais, plus, rien.",
      },
    },
  },
  {
    titre: "La place change tout",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Il a pris son cartable. » puis « La mangue qu'elle a mangée. »",
      question: "Pourquoi accorde-t-on dans un cas et pas dans l'autre ?",
      correction:
        "Même auxiliaire, même règle : le COD est APRÈS dans la première (pas d'accord), AVANT dans la seconde (on accorde). Seule sa place a changé.",
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
      enonce: "« Ils sont arrivés à l'heure. » — à la forme négative.",
      question: "Où se placent les deux morceaux de la négation ?",
      indice: "Quel est le mot conjugué dans « sont arrivés » ?",
      correction:
        "« Ils ne sont pas arrivés à l'heure. » On encadre l'auxiliaire « sont » ; « arrivés » ne bouge pas et garde son « s ».",
    },
  },
];
