// ─── Fiche de cours : lire avec fluidité (CM1) ────────────────────────────────
// PREMIÈRE FICHE DU CHANTIER CM1.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ LE CM1 EST LE CHANTIER LE PLUS EXPOSÉ AU DOUBLON DE TOUT LE FRANÇAIS :
// 21 DE SES 25 NOTIONS PORTENT UN NOM DÉJÀ PRIS PAR LE CM2, qui vient d'être
// entièrement fiché. Chaque fiche demande donc un tableau de séparation à TROIS
// COLONNES, et non deux. Celui-ci :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le repère | **110 mots/min** | 120 | 130 |
//   | ce qu'on lit | un texte **d'une page** | un texte **long, après préparation** | silencieusement ET à voix haute |
//   | le fil de la fiche | la vitesse est un **thermomètre** | la fluence **se prépare** | les **groupes de sens** |
//   | sa micro propre | ⭐ les **mots irréguliers** | les **liaisons** | — |
//
// ⛔ NE PAS REPRENDRE : les groupes de sens sont la découverte de la fiche de 6e,
// les liaisons (et l'histoire du « z » de « les enfants ») celle du CM2. Les deux
// sont mentionnées ici en une ligne, jamais développées.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE SAUVE L'ÉLÈVE D'UN CONTRESENS QUI COUTE CHER : LA
// VITESSE EST UN THERMOMÈTRE, PAS UNE CONSIGNE. Dire « lis plus vite » à un
// enfant produit une lecture rapide et vide — le pool le dit sans détour, « un
// élève qui lit vite et ne retient rien n'a pas lu ». Les 110 mots par minute
// MESURENT la fluence ; ils ne la fabriquent pas.
//
// ⭐⭐ ET CE QUI LA FABRIQUE, LE CM1 LE NOMME DANS UNE MICRO QUE PERSONNE D'AUTRE
// N'A — `cm1_flue_mots_irreguliers`, « reconnaitre des mots fréquents et
// irréguliers ». UN MOT IRRÉGULIER NE SE DÉCHIFFRE PAS, IL SE RECONNAIT D'UN
// BLOC : « femme » déchiffré donne « fem-me », « monsieur » donne « mon-si-eur ».
// ⛔ Et le piège est cruel : CE SONT LES MOTS LES PLUS FRÉQUENTS. L'élève qui
// déchiffre tout bute donc exactement là où il bute le plus souvent.
//
// ⭐ D'où la seule façon honnête de progresser, écrite dans le pool : ON RELIT
// PLUSIEURS FOIS LE MÊME TEXTE. « C'est la relecture qui automatise, pas la
// nouveauté. » C'est contre-intuitif, et c'est à dire.
//
// ⚠️⚠️ TROU COMBLÉ LE 30/08 AVANT D'ÉCRIRE CETTE FICHE : le pool FLUENCE_130 —
// qui porte « pourquoi viser un nombre de mots par minute », « comment on
// progresse », « lire vite sans comprendre » — n'était atteint que par la 6e.
// `cm1_flue_110_mots` tombait sur le pool LECTURE, des questions de
// compréhension. Deux items ajoutés (repère du CM1, repère du CM2) et
// l'aiguillage élargi aux trois classes. Sans cela, cette fiche aurait enseigné
// un repère que le coach n'aurait jamais demandé au CM1.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools LECTURE et FLUENCE_130 de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `fluence_lecture`) :
// - cm1_flue_page              → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - cm1_flue_ponctuation       → propriétés 3 et 4, méthode 2, usage 2, exemple 2
// - cm1_flue_mots_irreguliers  → figure, propriétés 5 à 7, formule, méthode 3,
//                                usage 3, exemples 3 et 4
// - cm1_flue_110_mots          → propriétés 8 et 9, méthode 4, usage 4, exemple 5
// - cm1_flue_defi              → propriété 10, exemple 6

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

/** Les trois repères du cycle 3. ⚠️ Cellules courtes : à la largeur d'un bloc,
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

// ─── Ce qui se dessine quand on apprend à lire couramment ─────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : le contresens à éviter.
const thermometrePasConsigne = phrase({
  mots: [
    { texte: "lis plus vite", barre: true },
    { texte: "lis mieux", focus: true },
  ],
  legende: "110 mots par minute MESURE la fluence — cela ne la fabrique pas.",
});

const grilleTroisReperes = grille({
  headers: ["La classe", "Son repère"],
  rows: [
    { values: ["le CM1", "110 mots/min"] },
    { values: ["le CM2", "120 mots/min"] },
    { values: ["la 6e", "130 mots/min"] },
  ],
  highlight: { row: 0 },
  caption: "Dix mots de plus par an. Ce n'est pas une course.",
});

// ── LIRE UNE PAGE.
const unePageEntiere = phrase({
  mots: [
    { texte: "quelques lignes" },
    { texte: "une page", focus: true },
  ],
  legende: "Le CM1 vise un texte d'une page, lu sans effort.",
});

const sansSEssouffler = phrase({
  mots: [
    { texte: "une page" },
    { texte: "sans buter", focus: true },
  ],
  legende: "Sans buter ni s'essouffler : c'est cela, lire sans effort.",
});

// ── LA PONCTUATION.
const ponctuationRespire = phrase({
  mots: [
    { texte: "le point" },
    { texte: "on respire", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "à", type: "question" }],
  legende: "La ponctuation dit où s'arrêter : c'est elle qui donne le rythme.",
});

const parGroupes = phrase({
  mots: [
    { texte: "mot à mot", barre: true },
    { texte: "par groupes", focus: true },
  ],
  legende: "Un groupe de mots se lit d'un seul souffle, comme on le dirait.",
});

// ── ⭐⭐ LES MOTS IRRÉGULIERS : la micro que personne d'autre n'a.
const dechiffrerOuReconnaitre = phrase({
  mots: [
    { texte: "fem-me", barre: true },
    { texte: "femme", focus: true },
  ],
  legende: "Un mot irrégulier ne se déchiffre pas : il se reconnait d'un bloc.",
});

const motsFrequentsEtIrreguliers = phrase({
  mots: [
    { texte: "monsieur" },
    { texte: "femme" },
    { texte: "oignon" },
  ],
  legende: "Et ce sont les plus fréquents : buter dessus coute à chaque ligne.",
});

const reconnaitreDunCoup = phrase({
  mots: [
    { texte: "lettre à lettre", barre: true },
    { texte: "d'un coup d'œil", focus: true },
  ],
  legende: "Un mot rencontré cent fois finit par se lire comme une image.",
});

// ── LE REPÈRE, ET CE QU'IL SERT.
const libererLaTete = phrase({
  mots: [
    { texte: "déchiffrer" },
    { texte: "comprendre", focus: true },
  ],
  legende: "Une lecture fluide libère la tête pour comprendre : c'est tout le but.",
});

const viteSansComprendre = phrase({
  mots: [
    { texte: "lire vite" },
    { texte: "ne rien retenir" },
  ],
  legende: "Un élève qui lit vite et ne retient rien n'a pas lu.",
});

const relireLeMemeTexte = phrase({
  mots: [
    { texte: "un texte neuf", barre: true },
    { texte: "le même", focus: true },
  ],
  legende: "On progresse en relisant le MÊME texte : c'est la relecture qui automatise.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheFluenceLectureCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "fluence-lecture",
  titre: "Lire avec fluidité en CM1 (2026-2027)",
  accroche:
    "On te dira peut-être « lis plus vite ». C'est le plus mauvais conseil qui soit, et il fabrique des lectures rapides dont on ne retient rien. LES 110 MOTS PAR MINUTE SONT UN THERMOMÈTRE, PAS UNE CONSIGNE : ils MESURENT ta fluence, ils ne la fabriquent pas. Ce qui la fabrique, c'est autre chose — reconnaitre les mots d'un coup d'œil au lieu de les déchiffrer, et lire par groupes plutôt que mot à mot.",
  identite: [
    { label: "Mots clés", valeur: "Fluidité, ponctuation, mots irréguliers" },
    { label: "Le secret", valeur: "La vitesse est un thermomètre" },
    { label: "Outil", valeur: "Relire le même texte" },
  ],
  definition: {
    texte:
      "LIRE AVEC FLUIDITÉ, au CM1, c'est lire SANS EFFORT un texte D'UNE PAGE : sans buter sur les mots, et sans s'essouffler. Cela demande trois choses. RESPECTER LA PONCTUATION : le point dit où s'arrêter et où respirer, et c'est lui qui donne le rythme. LIRE PAR GROUPES DE MOTS, d'un seul souffle, comme on le dirait — pas mot à mot. Et surtout RECONNAITRE LES MOTS FRÉQUENTS ET IRRÉGULIERS : ⛔ un mot irrégulier NE SE DÉCHIFFRE PAS. « Femme » déchiffré donne « fem-me », « monsieur » donne « mon-si-eur » — il faut les reconnaitre D'UN BLOC, comme une image. Et c'est là que le piège se referme : CE SONT LES MOTS LES PLUS FRÉQUENTS DU FRANÇAIS, donc ceux sur lesquels on bute le plus souvent. Le repère, enfin : environ 110 MOTS PAR MINUTE. ⭐ Mais retiens à quoi il sert — une lecture fluide LIBÈRE LA TÊTE POUR COMPRENDRE. La vitesse est un moyen, la compréhension est le but, et lire vite sans comprendre, c'est manquer le but.",
  },
  figure: {
    schema: pile(thermometrePasConsigne, grilleTroisReperes),
    legende:
      "Un thermomètre dit qu'on a de la fièvre ; il ne guérit personne, et le casser ne fait pas baisser la température. Les 110 mots par minute sont exactement cela — ils mesurent où tu en es, et se forcer à aller plus vite ne fait que produire une lecture rapide et vide. En bas, la progression du cycle : dix mots de plus par an, du CM1 à la 6e. Ce n'est ni une course ni un classement, c'est une échelle pour savoir si la lecture est devenue assez automatique pour que ta tête puisse s'occuper d'autre chose — comprendre.",
  },
  proprietes: [
    {
      titre: "Le CM1 vise une page entière",
      texte:
        "Pas quelques lignes : une page. C'est la longueur qui change tout, parce qu'elle demande de tenir sans se fatiguer.",
      schema: unePageEntiere,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "Sans buter ni s'essouffler",
      texte:
        "Voilà ce que veut dire « sans effort ». Si tu es essoufflé à la fin d'une page, ce n'est pas ta respiration : c'est que le déchiffrage te coute encore.",
      schema: sansSEssouffler,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "La ponctuation donne le rythme",
      texte:
        "Le point dit où s'arrêter, la virgule où ralentir. Ce ne sont pas des décorations : ce sont des indications de respiration.",
      schema: ponctuationRespire,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "On lit par groupes, pas mot à mot",
      texte:
        "Un groupe de mots se dit d'un seul souffle. Lire mot à mot hache la phrase, et une phrase hachée ne se comprend plus.",
      schema: parGroupes,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Un mot irrégulier ne se déchiffre pas",
      texte:
        "« Femme » déchiffré donne « fem-me ». « Monsieur » donne « mon-si-eur ». Ces mots ne s'écrivent pas comme ils se disent.",
      schema: dechiffrerOuReconnaitre,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Il se reconnait d'un bloc",
      texte:
        "Comme une image, d'un coup d'œil, sans le découper. Un mot rencontré cent fois finit par se lire ainsi — et c'est ce qui doit arriver.",
      schema: reconnaitreDunCoup,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Et ce sont les plus fréquents",
      texte:
        "C'est là que le piège se referme : monsieur, femme, oignon, temps, second. Buter dessus coute à chaque ligne, pas de temps en temps.",
      schema: motsFrequentsEtIrreguliers,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "La fluidité libère la tête",
      texte:
        "Tant que tu déchiffres, ta tête est occupée par les lettres. Quand la lecture devient automatique, elle peut enfin s'occuper du sens.",
      schema: libererLaTete,
      micros: ["cm1_flue_110_mots"],
    },
    {
      titre: "Lire vite sans comprendre, c'est manquer le but",
      texte:
        "La vitesse est un moyen, la compréhension est le but. Un élève qui lit vite et ne retient rien n'a pas lu.",
      schema: viteSansComprendre,
      micros: ["cm1_flue_110_mots"],
    },
    {
      titre: "Le défi : relire le même texte",
      texte:
        "C'est la relecture qui automatise, pas la nouveauté. Trois lectures du même texte font plus qu'une lecture de trois textes.",
      schema: relireLeMemeTexte,
      micros: ["cm1_flue_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà vécu ce basculement, mais avec autre chose. La première fois que tu as fait du vélo, tu pensais à tout à la fois — les pédales, le guidon, l'équilibre — et tu ne voyais pas la route. Aujourd'hui tu pédales sans y penser, et c'est justement pour cela que tu peux regarder où tu vas, parler, freiner à temps. La lecture fait exactement le même chemin. Tant que déchiffrer te demande de l'attention, il ne t'en reste plus pour l'histoire. Quand les mots se reconnaissent tout seuls, ta tête est libre — et c'est là que lire devient intéressant. Personne n'a jamais appris à faire du vélo en se forçant à pédaler plus vite.",
  },
  historique: {
    texte:
      "Certains mots irréguliers le sont devenus EXPRÈS, et cela peut se dater. Au XVIe siècle, des savants ont voulu que l'orthographe montre l'origine latine des mots : ils ont ajouté un « g » à « doit » pour rappeler le latin DIGITUM, et l'on écrit DOIGT depuis, avec deux lettres qu'on ne prononce pas. Pire : ils ont ajouté un « d » à « pois » en croyant qu'il venait de PONDUS — il venait en réalité d'un autre mot —, et l'on écrit POIDS à cause d'une erreur vieille de cinq siècles. Autrement dit, quand tu butes sur un de ces mots, tu ne rates pas une règle : tu rencontres une décision que quelqu'un a prise il y a très longtemps, et parfois une faute qu'on n'a jamais corrigée.",
  },
  formule: {
    contexte: "La seule façon de progresser qui marche vraiment, et elle surprend.",
    expression: "relis le même texte",
    legende:
      "Trois lectures du même texte valent mieux qu'une lecture de trois textes. C'est la relecture qui rend les mots automatiques — à la deuxième, tu ne butes plus ; à la troisième, tu peux y mettre le ton. Changer de texte à chaque fois, c'est recommencer à déchiffrer à chaque fois.",
    schema: relireLeMemeTexte,
  },
  methode: [
    {
      titre: "Lire une page en entier, chaque jour",
      texte:
        "Pas trois lignes : une page. C'est la longueur qui entraine l'endurance, et l'endurance fait la moitié de la fluidité.",
      schema: unePageEntiere,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "Regarder les points avant de lire",
      texte:
        "Un coup d'œil sur la ponctuation avant de commencer : tu sais alors où tu vas respirer, et tu ne t'essouffles plus.",
      schema: ponctuationRespire,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Faire une liste des mots qui te font buter",
      texte:
        "Cinq ou six suffisent. Tu les regardes chaque jour jusqu'à les reconnaitre d'un coup d'œil — ce sont eux qui te ralentissent.",
      schema: motsFrequentsEtIrreguliers,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Relire trois fois, puis se chronométrer",
      texte:
        "Dans cet ordre, jamais l'inverse. Le chronomètre vient CONSTATER le progrès ; il ne le fabrique pas.",
      schema: thermometrePasConsigne,
      micros: ["cm1_flue_110_mots"],
    },
  ],
  usages: [
    {
      titre: "Pour lire un livre sans abandonner",
      detail:
        "Une page à la fois, sans s'épuiser. Beaucoup d'abandons de lecture ne viennent pas de l'histoire : ils viennent de la fatigue.",
      schema: sansSEssouffler,
      micros: ["cm1_flue_page"],
    },
    {
      titre: "Pour lire à voix haute devant la classe",
      detail:
        "La ponctuation est ce qui fait qu'on t'écoute : elle donne les respirations, et sans elles la phrase file sans qu'on la suive.",
      schema: ponctuationRespire,
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Pour ne plus trébucher sur les mêmes mots",
      detail:
        "Les irréguliers reviennent toutes les deux lignes. Les reconnaitre d'un bloc fait gagner du temps à chaque phrase.",
      schema: dechiffrerOuReconnaitre,
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Pour comprendre ce qu'on lit",
      detail:
        "C'est le but de tout le reste. Une lecture automatique libère la tête, et une tête libre peut enfin suivre l'histoire.",
      schema: libererLaTete,
      micros: ["cm1_flue_110_mots"],
    },
  ],
  exemples: [
    {
      titre: "Lire une page",
      donnees: "Tu arrives essoufflé à la fin d'une page.",
      schema: sansSEssouffler,
      question: "Qu'est-ce que cela montre ?",
      solution:
        "QUE LE DÉCHIFFRAGE TE COUTE ENCORE. Ce n'est pas une question de souffle : lire sans effort veut dire sans buter ET sans s'essouffler. L'essoufflement est le signe que ta tête travaille trop sur les lettres — pas que tu manques d'air.",
      micros: ["cm1_flue_page"],
    },
    {
      titre: "La ponctuation",
      donnees: "« Le soleil se couchait. Mara alluma la lampe et ouvrit son livre. »",
      schema: ponctuationRespire,
      question: "Où t'arrêtes-tu ?",
      solution:
        "AU POINT, APRÈS « SE COUCHAIT ». Le point n'est pas une décoration : c'est une indication de respiration. Et remarque que les deux phrases se lisent chacune d'un souffle — ce sont deux groupes, pas dix mots séparés.",
      micros: ["cm1_flue_ponctuation"],
    },
    {
      titre: "Un mot irrégulier",
      donnees: "Tu essaies de déchiffrer « monsieur ».",
      schema: dechiffrerOuReconnaitre,
      question: "Que se passe-t-il ?",
      solution:
        "ÇA NE MARCHE PAS. Déchiffré, cela donne « mon-si-eur », qui ne ressemble pas à ce qu'on dit. Ce mot ne se découpe pas : il SE RECONNAIT d'un bloc, comme une image. Et c'est vrai de « femme », « oignon », « temps », « second ».",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "Le piège des mots irréguliers",
      donnees: "Tu butes sur les mêmes cinq mots à chaque lecture.",
      schema: motsFrequentsEtIrreguliers,
      question: "Pourquoi ceux-là reviennent-ils sans cesse ?",
      solution:
        "PARCE QUE LES MOTS IRRÉGULIERS SONT LES PLUS FRÉQUENTS. C'est le piège : ce ne sont pas des mots rares qu'on rencontrerait de loin en loin, ce sont ceux qui reviennent toutes les deux lignes. Les apprendre d'un bloc fait donc gagner du temps partout.",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      titre: "À quoi sert le repère",
      donnees: "« Pourquoi viser un nombre de mots par minute ? »",
      schema: libererLaTete,
      question: "Pourquoi ?",
      solution:
        "PARCE QU'UNE LECTURE FLUIDE LIBÈRE LA TÊTE POUR COMPRENDRE. Ce n'est ni pour gagner une course, ni pour être classé. La vitesse est un MOYEN, la compréhension est le BUT — et lire vite sans comprendre, c'est manquer le but.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      titre: "Le défi",
      donnees: "Tu veux lire plus couramment.",
      schema: relireLeMemeTexte,
      question: "Que fais-tu ?",
      solution:
        "TU RELIS PLUSIEURS FOIS LE MÊME TEXTE. C'est surprenant, et c'est pourtant ce qui marche : la relecture AUTOMATISE, la nouveauté non. À la deuxième lecture tu ne butes plus, à la troisième tu peux y mettre le ton. Changer de texte à chaque fois, c'est recommencer à déchiffrer à chaque fois.",
      micros: ["cm1_flue_defi"],
    },
  ],
  pieges: [
    "Se forcer à lire plus vite : cela fabrique une lecture rapide et vide.",
    "Croire que 110 mots par minute est une consigne : c'est une mesure.",
    "Déchiffrer un mot irrégulier : « femme » ne donnera jamais « fem-me ».",
    "Lire mot à mot : la phrase est hachée, et une phrase hachée ne se comprend plus.",
    "Ignorer la ponctuation : c'est elle qui dit où respirer.",
    "Changer de texte à chaque entrainement : la relecture automatise, pas la nouveauté.",
    "Se chronométrer avant d'avoir relu : le chronomètre constate, il ne fabrique rien.",
  ],
  aRetenir: [
    "110 mots par minute est un thermomètre, pas une consigne.",
    "Un mot irrégulier ne se déchiffre pas : il se reconnait d'un bloc.",
    "Et ce sont les plus fréquents — donc ceux qui coutent le plus cher.",
    "On lit par groupes, en respectant la ponctuation.",
    "On progresse en relisant le MÊME texte : c'est la relecture qui automatise.",
  ],
  entrainement: [
    {
      question: "Quel repère de fluence la classe de CM1 vise-t-elle ?",
      correction: "Environ 110 mots par minute.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      question: "Pourquoi viser un nombre de mots par minute ?",
      correction: "Parce qu'une lecture fluide libère la tête pour comprendre.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      question: "Lire vite sans comprendre, c'est…",
      correction: "Manquer le but : la vitesse n'est qu'un moyen.",
      micros: ["cm1_flue_110_mots"],
    },
    {
      question: "Comment progresse-t-on en fluence ?",
      correction: "En relisant plusieurs fois le même texte.",
      micros: ["cm1_flue_defi"],
    },
    {
      question: "Peux-tu déchiffrer « monsieur » ?",
      correction: "Non : ce mot se reconnait d'un bloc, il ne se découpe pas.",
      micros: ["cm1_flue_mots_irreguliers"],
    },
    {
      question: "À quoi sert le point quand tu lis à voix haute ?",
      correction: "À dire où s'arrêter et où respirer.",
      micros: ["cm1_flue_ponctuation"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesFluenceLectureCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "objectif",
      phrase: "La vitesse est un thermomètre",
      sousPhrase:
        "110 mots par minute MESURE ta fluence. Cela ne la fabrique pas.",
      encadre: {
        titre: "⛔ Le mauvais conseil",
        texte: "« Lis plus vite » fabrique une lecture rapide dont on ne retient rien.",
      },
    },
  },
  {
    titre: "Les trois repères du cycle",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "etapes",
      etapes: [
        "CM1 : environ 110 mots par minute.",
        "CM2 : 120. Sixième : 130.",
        "Dix mots de plus par an — ce n'est pas une course.",
        "C'est une échelle pour savoir si la lecture est devenue automatique.",
      ],
    },
    schema: grilleTroisReperes,
  },
  {
    titre: "Les mots qui ne se déchiffrent pas",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce qui ne marche pas",
        contenu: "« fem-me », « mon-si-eur ». Ces mots ne s'écrivent pas comme ils se disent.",
      },
      droite: {
        titre: "Ce qui marche",
        contenu: "Les reconnaitre d'un bloc, comme une image, d'un coup d'œil.",
      },
    },
    schema: dechiffrerOuReconnaitre,
  },
  {
    titre: "Et le piège se referme",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Monsieur, femme, oignon, temps, second.",
        "⛔ Ce sont LES PLUS FRÉQUENTS du français.",
        "Donc ceux sur lesquels on bute le plus souvent.",
        "Les apprendre d'un bloc fait gagner du temps à chaque ligne.",
      ],
    },
    schema: motsFrequentsEtIrreguliers,
  },
  {
    titre: "Comme le vélo",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Au début", texte: "Pédales, guidon, équilibre : tu ne vois pas la route." },
        { titre: "Après", texte: "Tu pédales sans y penser — et tu regardes où tu vas." },
        { titre: "En lecture", texte: "Tant que tu déchiffres, il ne reste rien pour l'histoire." },
        { titre: "⛔ Jamais", texte: "Personne n'a appris le vélo en pédalant plus vite." },
      ],
    },
    schema: libererLaTete,
  },
  {
    titre: "À vous",
    badge: "Lire avec fluidité - CM1",
    section: {
      type: "exercice",
      enonce: "Tu veux lire plus couramment.",
      question: "Trois textes une fois, ou un texte trois fois ?",
      indice: "Ce qui automatise, ce n'est pas la nouveauté.",
      correction:
        "UN TEXTE TROIS FOIS. À la deuxième lecture tu ne butes plus ; à la troisième tu peux y mettre le ton. Changer de texte, c'est recommencer à déchiffrer.",
    },
    schema: relireLeMemeTexte,
  },
];
