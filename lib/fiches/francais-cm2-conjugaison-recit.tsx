// ─── Fiche de cours : les temps du récit (CM2) ────────────────────────────────
// TROISIÈME FICHE DE CONJUGAISON DU CM2. Les deux premières apprenaient à écrire
// un verbe et à le démonter. Celle-ci pose une autre question : lequel choisir ?
// C'est le premier cours de l'année où une forme JUSTE peut être un mauvais
// choix.
//
// ⭐ CE QUE LE BO AJOUTE AU CM2, ET QUI FAIT TOUTE LA NOTION. « Conjugaisons à
// mémoriser et à maîtriser : PASSÉ SIMPLE, PLUS-QUE-PARFAIT des verbes être et
// avoir, des verbes des premier et deuxième groupes, des verbes irréguliers du
// troisième groupe. » Le passé simple et le plus-que-parfait entrent ici : le
// CM1 ne les avait pas. Ce sont exactement les deux temps qu'un enfant LIT tous
// les jours dans un roman et ne DIT jamais.
//
// ⭐ ET LE MODE `frise` A ENFIN UN SENS. Dans les autres fiches, le canvas
// démonte des formes ; ici il ne démonte rien, il POSE les temps sur une ligne
// du temps — parce que la valeur d'un temps n'est pas dans sa forme mais dans
// le moment qu'il désigne.
// ⛔ EN BLOC D'EXEMPLE UNIQUEMENT (CATALOGUE, § conjugaison) : la frise calcule
// sa largeur sur ses repères, et une carte de propriété n'en a pas assez.
//
// Alignée sur lib/tutor-v4/knowledge/francais/cm2/microSkills.ts
// (notionId `conjugaison_recit`), sur les items cm2_fr_fixed_conj_5 à 7 de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts, et sur les pools
// CONJ_PASSE_COMPOSE, CONJ_PASSE_SIMPLE, CONJ_PLUS_QUE_PARFAIT et
// CONJ_VALEUR_TEMPS de buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion, défi compris) :
// - cm2_conj_passe_compose      → définition, figure, propriété « Le passé
//                                 composé », méthode 1, exemple 1,
//                                 entraînement 1
// - cm2_conj_passe_simple_intro → propriétés « Le passé simple » et « Il se lit,
//                                 il ne se dit pas », usages, exemple 2,
//                                 piège 1, entraînements 2 et 3
// - cm2_conj_plus_que_parfait   → propriétés « Le plus-que-parfait » et « Un
//                                 passé avant le passé », formule, méthode 2,
//                                 exemple 3, piège 2, entraînement 4
// - cm2_conj_valeur_temps       → propriété « Le décor et l'action »,
//                                 méthode 3, exemple 4, piège 3, entraînement 5
// - cm2_conj_recit_defi         → le défi, dessiné (exemple 5)
//
// Les phrases sont CELLES DE LA BANQUE : « Elles sont rentrées à la maison »,
// « Le loup entra dans la bergerie », « Il lisait tranquillement quand la porte
// claqua », « Elle avait terminé son dessin quand la cloche a sonné », « Quand
// je suis arrivé, il était déjà parti », « Les enfants traversèrent la cour ».
//
// ⚠️ Contrôle passé avant commit : REGLES.md § 2 quater — dessins rendus hors du
// site en 250 / 340 / 400 px, aucun texte sous 11 px, aucun texte hors cadre.

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonLigne,
  ConjugaisonRepere,
  ConjugaisonSegment,
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

function tableau(opts: { temps: string; lignes: ConjugaisonLigne[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "tableau",
        temps: opts.temps,
        lignes: opts.lignes,
        legende: opts.legende,
      }}
    />
  );
}

// ⛔ RÉSERVÉE AUX BLOCS D'EXEMPLE (CATALOGUE, § conjugaison).
function frise(opts: { reperes: ConjugaisonRepere[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{ kind: "conjugaison", mode: "frise", reperes: opts.reperes, legende: opts.legende }}
    />
  );
}

// La valeur d'un temps se lit dans une PHRASE : le canvas du français prend le
// relais, avec le nom du temps écrit en gris au-dessus du verbe.
function phrase(opts: { mots: (string | PhraseCanvasMot)[]; legende?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
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

// LA FIGURE DE RÉFÉRENCE : l'item fixe du CM2 sur le passé composé.
const composeeReference = composee({
  pronom: "Elles",
  auxiliaire: { texte: "sont", note: "être" },
  participe: { texte: "rentrées", note: "accordé" },
  accord: { label: "fém. plur." },
  legende: "Avec être, on accorde au sujet.",
});

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

// LE PASSÉ SIMPLE EN UN SEUL MOT : c'est ce qui l'oppose aux deux précédents, et
// une seule lettre suffit à le faire — « entr- » + « -a ».
const trainPasseSimple = train({
  infinitif: "entrer",
  pronom: "il",
  segments: [
    { texte: "entr", role: "radical", note: "radical" },
    { texte: "a", role: "temps", note: "p. simple", alerte: true },
  ],
  legende: "Une seule lettre, et l'action arrive.",
});

const tableauPasseSimple = tableau({
  temps: "entrer, au passé simple",
  lignes: [
    { pronom: "j'", radical: "entr", terminaison: "ai" },
    { pronom: "tu", radical: "entr", terminaison: "as" },
    { pronom: "il", radical: "entr", terminaison: "a" },
    { pronom: "nous", radical: "entr", terminaison: "âmes" },
    { pronom: "vous", radical: "entr", terminaison: "âtes" },
    { pronom: "ils", radical: "entr", terminaison: "èrent" },
  ],
  legende: "On le lit souvent, on le dit jamais.",
});

// LE DÉCOR ET L'ACTION : l'item fixe cm2_fr_fixed_conj_7, dessiné.
const phraseDecorAction = phrase({
  mots: [
    { texte: "Il" },
    { texte: "lisait", nature: "imparfait", focus: true },
    { texte: "quand" },
    { texte: "la" },
    { texte: "porte" },
    { texte: "claqua", nature: "passé simple", focus: true },
    { texte: "." },
  ],
  legende: "Ce qui dure, puis ce qui survient.",
});

// ⛔ EN BLOC D'EXEMPLE UNIQUEMENT.
const friseSituer = frise({
  reperes: [
    { texte: "entra", zone: "passe" },
    { texte: "entre", zone: "present" },
    { texte: "entrera", zone: "futur" },
  ],
  legende: "Le passé simple raconte, il ne parle pas.",
});

// LE DÉFI A SON PROPRE DESSIN (REGLES § 2).
const composeeDefi = composee({
  pronom: "Elle",
  auxiliaire: { texte: "avait", note: "imparfait" },
  participe: { texte: "terminé", note: "participe" },
  legende: "Fini AVANT que la cloche sonne.",
});

const pieges = [
  "Employer le passé simple quand on parle : « je partis à sept heures » ne se dit pas. À l'oral et dans un message, c'est le passé composé — « je suis parti ». Le passé simple appartient aux livres.",
  "Confondre « il a fini » et « il avait fini » : le premier est un passé ordinaire, le second recule d'un cran, AVANT un autre moment du passé. C'est l'auxiliaire, et lui seul, qui fait la différence.",
  "Mettre tout un récit au passé simple : l'imparfait y est indispensable. Il plante le décor et dit ce qui durait pendant que l'histoire avançait ; sans lui, il ne reste qu'une liste d'actions.",
  "Écrire « ils entrèrent » avec un « t » : au passé simple, la 3e personne du pluriel des verbes en -er fait « -èrent », avec un accent grave. « ils entrent » serait le présent.",
];

const aRetenir = [
  "Le passé composé s'écrit en deux mots — auxiliaire au présent + participe passé — et c'est le passé de celui qui PARLE.",
  "Le passé simple s'écrit en un seul mot et c'est le passé de celui qui RACONTE : on le lit dans les livres, on ne le dit pas.",
  "Le plus-que-parfait recule d'un cran : auxiliaire à l'imparfait, pour ce qui avait déjà eu lieu.",
];

export const ficheConjugaisonRecitCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "conjugaison-recit",
  titre: "Les temps du récit : passé composé, passé simple, plus-que-parfait",
  accroche:
    "« Le loup entra dans la bergerie. » Tu as lu cette forme cent fois, et tu ne l'as jamais dite. Le passé simple est le temps des histoires : il ne sert qu'à raconter, et c'est exactement pour cela qu'il existe encore.",
  identite: [
    { label: "Mots clés", valeur: "Passé composé, passé simple, plus-que-parfait, décor, action" },
    { label: "Le secret", valeur: "Trois passés, et chacun fait un métier différent" },
    { label: "Outil", valeur: "Compter les mots du verbe : un seul, ou deux ?" },
  ],
  definition: {
    texte:
      "Le français possède plusieurs passés, et ils ne servent pas à la même chose. Le passé composé s'écrit en deux mots — un auxiliaire au présent, puis le participe passé — et c'est le passé de celui qui parle : « elles sont rentrées ». Le passé simple s'écrit en un seul mot et c'est le passé de celui qui raconte : « le loup entra ». Le plus-que-parfait s'écrit en deux mots avec l'auxiliaire à l'imparfait, et il recule d'un cran : il dit ce qui avait déjà eu lieu avant un autre moment du passé.",
  },
  figure: {
    schema: composeeReference,
    legende:
      "« Elles sont rentrées à la maison. » Deux caisses accrochées : « sont », l'auxiliaire, porte le temps et la personne ; « rentrées », le participe, porte le sens. Et comme l'auxiliaire est être, le participe s'accorde avec le sujet — d'où le « es » de « rentrées ». Un verbe en deux mots, c'est un temps composé.",
  },
  proprietes: [
    {
      titre: "Le passé composé : deux mots",
      texte: "Un auxiliaire au présent, puis le participe passé. C'est le passé de celui qui parle.",
      schema: composeePasseCompose,
    },
    {
      titre: "Le passé simple : un seul mot",
      texte: "« il entra », « ils partirent ». C'est le passé de celui qui raconte une histoire.",
      schema: trainPasseSimple,
    },
    {
      titre: "On le lit, on ne le dit pas",
      texte: "Six formes qu'on rencontre dans tous les romans et qu'on n'emploie jamais en parlant.",
      schema: tableauPasseSimple,
    },
    {
      titre: "Le plus-que-parfait recule d'un cran",
      texte: "Même verbe, auxiliaire à l'imparfait : « il avait mangé » se passe avant « il a mangé ».",
      schema: pile(composeePasseCompose, composeePlusQueParfait),
    },
    {
      titre: "Un passé avant le passé",
      texte: "« Elle avait terminé quand la cloche a sonné » : le dessin est fini avant la sonnerie.",
      schema: composeeDefi,
    },
    {
      titre: "Le décor et l'action",
      texte: "Dans un récit, l'imparfait dit ce qui durait, le passé simple ce qui survient.",
      schema: phraseDecorAction,
    },
  ],
  reel: {
    texte:
      "C'est la différence entre raconter sa journée et écrire une histoire. Quand tu parles, tu emploies le passé composé sans y penser : « je suis parti », « on a gagné ». Mais dès que tu ouvres un roman ou un conte, le passé simple est partout — et si tu veux écrire une histoire qui sonne comme un vrai livre, c'est lui qu'il te faut. Le CM2 est l'année où l'on cesse de le subir en lecture pour commencer à s'en servir en écriture.",
  },
  historique: {
    texte:
      "Le passé simple est le temps des contes, et il l'est depuis très longtemps. Quand Charles Perrault publie ses histoires en 1697 — Le Petit Chaperon rouge, Cendrillon, Le Chat botté —, il écrit déjà « elle partit », « il entra », « ils s'enfuirent ». À cette époque, on le disait encore en parlant. Puis il a quitté la conversation, sans quitter les livres. Résultat : plus de trois siècles après, un enfant de CM2 lit chaque semaine des formes qu'il n'a jamais entendu prononcer.",
  },
  formule: {
    contexte: "Trois passés, une question pour les séparer.",
    expression: "un mot → passé simple · deux mots → auxiliaire au présent ou à l'imparfait ?",
    legende:
      "On compte d'abord les mots du verbe. Un seul, avec une terminaison qu'on ne dit jamais : c'est le passé simple. Deux mots : on regarde l'auxiliaire. Au présent — « il a mangé » —, c'est le passé composé. À l'imparfait — « il avait mangé » —, c'est le plus-que-parfait, et l'action recule d'un cran.",
    schema: pile(composeePasseCompose, composeePlusQueParfait),
  },
  methode: [
    {
      titre: "Je compte les mots du verbe",
      texte: "Un seul mot : temps simple. Deux mots : temps composé, et je regarde l'auxiliaire.",
      schema: composeePasseCompose,
    },
    {
      titre: "Je regarde l'auxiliaire",
      texte: "Au présent → passé composé. À l'imparfait → plus-que-parfait, donc un cran plus tôt.",
      schema: composeePlusQueParfait,
    },
    {
      titre: "Je demande : est-ce que ça dure, ou est-ce que ça arrive ?",
      texte: "Ce qui dure va à l'imparfait ; ce qui arrive d'un coup va au passé simple.",
      schema: phraseDecorAction,
    },
  ],
  usages: [
    {
      titre: "Parler de son passé",
      detail: "« Elles sont rentrées à la maison. » Passé composé : on parle depuis maintenant.",
      schema: composeeReference,
    },
    {
      titre: "Raconter une histoire",
      detail: "« Le loup entra dans la bergerie. » Passé simple : le narrateur ne parle pas, il raconte.",
      schema: trainPasseSimple,
    },
    {
      titre: "Dire ce qui s'est passé avant",
      detail: "« Il était déjà parti quand je suis arrivé. » Plus-que-parfait : un cran plus tôt.",
      schema: composeePlusQueParfait,
    },
  ],
  exemples: [
    {
      titre: "Le passé composé et l'accord",
      donnees: "« Elles ___ à la maison. » (rentrer, au passé composé)",
      schema: composeeReference,
      question: "Quelle forme faut-il écrire ?",
      solution:
        "« elles sont rentrées ». « rentrer » est un verbe de déplacement : il prend l'auxiliaire être. Et avec être, le participe s'accorde avec le sujet — « Elles » est féminin pluriel, donc « rentrées ». Avec avoir, on n'aurait rien ajouté.",
    },
    {
      titre: "Reconnaître un passé simple",
      donnees: "« Le loup entra dans la bergerie. »",
      schema: pile(trainPasseSimple, friseSituer),
      question: "À quel temps est « entra », et comment le sait-on ?",
      solution:
        "Au passé simple. Deux indices : le verbe tient en UN SEUL mot — ce n'est donc pas un temps composé —, et sa terminaison « -a » ne s'emploie jamais quand on parle. On dirait « il est entré ». C'est le temps du récit, celui des contes et des romans.",
    },
    {
      titre: "Le plus-que-parfait",
      donnees: "« Quand je suis arrivé, il ___ déjà parti. »",
      schema: composeePlusQueParfait,
      question: "Faut-il « est » ou « était » ?",
      solution:
        "« était ». Les deux actions sont passées, mais le départ a eu lieu AVANT l'arrivée. Pour reculer d'un cran, on met l'auxiliaire à l'imparfait : « il était parti ». « il est parti » raconterait un simple passé, sans dire lequel des deux vient en premier.",
    },
    {
      titre: "Le décor et l'action",
      donnees: "« Il lisait tranquillement quand la porte claqua. »",
      schema: phraseDecorAction,
      question: "Quel verbe raconte l'action soudaine ?",
      solution:
        "« claqua ». « lisait » est à l'imparfait : il pose le décor, ce qui durait déjà. Le bruit de la porte, lui, arrive d'un coup et coupe ce décor : c'est le passé simple. Les deux temps ne se remplacent pas — ils font deux métiers différents dans la même phrase.",
    },
    {
      titre: "Le défi",
      donnees: "« Elle ___ terminé son dessin quand la cloche a sonné. »",
      schema: composeeDefi,
      question: "« a » ou « avait » ?",
      solution:
        "« avait ». Le dessin est fini AVANT que la cloche sonne : il faut donc reculer d'un cran, et c'est l'auxiliaire à l'imparfait qui le fait. « Elle a terminé son dessin quand la cloche a sonné » mettrait les deux choses au même moment, et l'on ne saurait plus laquelle vient en premier.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "« Elles ___ à la maison. » (rentrer, au passé composé)",
      correction:
        "« sont rentrées ». Avec l'auxiliaire être, le participe passé s'accorde avec le sujet : « elles sont rentrées ».",
    },
    {
      question: "Dans « Le loup entra dans la bergerie », à quel temps est « entra » ?",
      correction:
        "Au passé simple, le temps du récit pour une action passée et brève. Un seul mot, et une terminaison qu'on ne rencontre que dans les livres.",
    },
    {
      question: "« Les enfants ___ la cour en courant. » (traverser, au passé simple)",
      correction:
        "« traversèrent ». À la 3e personne du pluriel, les verbes en -er font « -èrent », avec un accent grave. « traversent » serait le présent.",
    },
    {
      question: "« Nous ___ fini avant la pluie. » (plus-que-parfait)",
      correction:
        "« avions ». « avons » donnerait le passé composé, « aurons » le futur : c'est bien l'auxiliaire à l'imparfait qui fait le plus-que-parfait.",
    },
    {
      question: "Dans « Il lisait tranquillement quand la porte claqua », quel verbe raconte l'action soudaine ?",
      correction:
        "« claqua ». L'imparfait « lisait » pose le décor ; le passé simple « claqua » marque l'action qui survient.",
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesConjugaisonRecitCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les temps du récit - CM2",
    section: {
      type: "objectif",
      phrase: "Trois passés, trois métiers",
      sousPhrase:
        "Le passé composé se parle, le passé simple se raconte, le plus-que-parfait recule d'un cran.",
      encadre: {
        titre: "L'idée",
        texte: "« Le loup entra » : une forme que tu as lue cent fois et jamais dite.",
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
          "Quand tu parles : « je suis parti », « on a gagné ». Quand tu ouvres un roman : « il partit », « ils gagnèrent ». Pour écrire une histoire qui sonne comme un vrai livre, c'est le second qu'il te faut.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Quand Charles Perrault publie ses contes en 1697, il écrit déjà « elle partit », « il entra ». À l'époque, on le disait encore. Puis le passé simple a quitté la conversation sans quitter les livres — et trois siècles après, tu lis des formes que personne ne prononce.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheConjugaisonRecitCm2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Compter les mots du verbe",
    badge: "Simple ou composé",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Un seul mot",
        contenu:
          "« il entra », « ils partirent ». C'est un temps simple — ici le passé simple, reconnaissable à une terminaison qu'on ne dit jamais.",
      },
      droite: {
        variante: "ok",
        titre: "Deux mots",
        contenu:
          "« il a mangé », « il avait mangé ». C'est un temps composé : auxiliaire + participe passé. L'auxiliaire dit lequel des deux.",
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
    titre: "Le décor et l'action",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "« Il lisait tranquillement quand la porte claqua. »",
      question: "Quel verbe raconte l'action soudaine ?",
      correction:
        "« claqua ». L'imparfait « lisait » pose le décor, ce qui durait déjà ; le passé simple amène ce qui survient et coupe ce décor.",
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
      enonce: "« Elle ___ terminé son dessin quand la cloche a sonné. »",
      question: "« a » ou « avait » ?",
      indice: "Lequel des deux se passe en premier : le dessin fini, ou la cloche ?",
      correction:
        "« avait ». Le dessin est fini AVANT la sonnerie : on recule d'un cran en mettant l'auxiliaire à l'imparfait.",
    },
  },
];
