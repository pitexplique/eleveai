// ─── Fiche de cours : revenir sur son texte et le réviser (6e) ────────────────
// QUATRIÈME FICHE D'ÉCRITURE DE LA 6e — ET ELLE FERME LE DOMAINE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Revenir sur son texte et le réviser » (BO6EFRE),
// que le BO découpe en quatre objectifs : le brouillon, la cohérence,
// l'autoévaluation, les normes de l'écrit.
//
// ⛔⛔ PIÈGE DE CLASSE, ET LE NOM EST LE MÊME : `ecriture_reviser` EXISTE EN 5e.
// Les deux fiches répondent pourtant à deux questions différentes :
//
//   | 5e (cycle 4) | 6e (cycle 3) |
//   |—|—|—|
//   | DANS QUEL ORDRE relire | POURQUOI relire seul échoue |
//   | les cinq relectures fondatrices | les trois façons de sortir de sa tête |
//   | le brouillon aéré, numéroté | le brouillon comme lieu de ratures |
//   | l'orthographe en DERNIER | deux relectures, deux buts |
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET ELLE EST DANS UNE LIGNE DU POOL : « SANS
// CRITÈRES, LA RELECTURE NE TROUVE RIEN : ON RELIT CE QU'ON CROIT AVOIR ÉCRIT. »
// C'est l'explication complète d'une expérience que tous les élèves ont faite —
// relire trois fois et ne rien voir. L'œil ne lit pas la page : il lit
// l'intention, parce que c'est toi qui l'as écrite et que tu sais ce que tu
// voulais dire.
//
// ⭐ D'OÙ LE FIL : LES TROIS REMÈDES SORTENT TOUS DE TA TÊTE.
//   des CRITÈRES écrits d'avance — tu ne cherches plus « des fautes », tu
//     cherches une liste, et une liste ne se laisse pas tromper ;
//   L'OREILLE, en relisant à voix basse — « l'oreille entend ce que l'œil
//     saute », et un mot manquant s'entend avant de se voir ;
//   QUELQU'UN D'AUTRE — un camarade qui n'a pas ton texte dans la tête.
// Aucun des trois n'est un effort supplémentaire : ce sont trois façons de ne
// plus être seul juge de ce qu'on croit avoir écrit.
//
// ⭐ ET DEUX RELECTURES, PAS UNE. « Au moins deux fois, avec un but différent à
// chaque fois » — une pour le sens, une pour l'orthographe. Le pool écarte
// explicitement « deux fois de suite en cherchant les mêmes choses ».
//
// ⭐ ENFIN : RÉVISER N'EST PAS SEULEMENT CORRIGER. Le BO dit « améliorer tout ou
// partie de son texte » : corriger ET ENRICHIR une phrase pauvre. Un élève qui
// ne cherche que des fautes ne fait que la moitié du travail demandé.
//
// ⛔ ET LA BASCULE DE COULEUR SE REJOUE ICI : le dessin `accordSujetVerbe` porte
// une étiquette « le sujet », et c'en est une vraiment — la relecture d'accord
// EST un geste grammatical. La couleur DOIT donc s'appliquer, et l'arc est de
// type `accord`. Même cas qu'en 5e, vérifié au rendu.
//
// Alignée sur le pool ECRIT_REVISER de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `ecriture_reviser`) :
// - 6e_ecrit_brouillon    → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_ecrit_reviser      → figure, propriétés 3 à 6, formule, méthode 2,
//                           usages 2 et 3, exemples 2 et 3
// - 6e_ecrit_normes       → propriétés 7 à 9, méthode 3, usage 4, exemples 4 et 5
// - 6e_ecrit_reviser_defi → propriété 10, méthode 4, exemple 6

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

/** Les trois façons de sortir de sa tête. ⚠️ Cellules courtes : à la largeur
 *  d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on se relit ──────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : on relit ce qu'on croyait écrire.
const onRelitCeQuonCroyait = phrase({
  mots: [
    { texte: "ce qui est écrit" },
    { texte: "ce que tu croyais", focus: true },
  ],
  legende: "Sans critères, l'œil relit ton intention — jamais la page.",
});

const grilleSortirDeSaTete = grille({
  headers: ["Le remède", "Ce qu'il apporte"],
  rows: [
    { values: ["des critères", "tu sais quoi"] },
    { values: ["deux passages", "un but chacun"] },
    { values: ["la voix basse", "l'oreille entend"] },
    { values: ["un camarade", "un autre œil"] },
  ],
  caption: "Quatre façons de ne plus être seul juge de son texte.",
});

const grilleSortirVoixBasse = grille({
  headers: ["Le remède", "Ce qu'il apporte"],
  rows: [
    { values: ["des critères", "tu sais quoi"] },
    { values: ["deux passages", "un but chacun"] },
    { values: ["la voix basse", "l'oreille entend"] },
    { values: ["un camarade", "un autre œil"] },
  ],
  highlight: { row: 2 },
  caption: "Un mot manquant s'entend souvent avant de se voir.",
});

// ── LE BROUILLON : un lieu de ratures, pas une copie sale.
const ratureSigneDeTravail = phrase({
  mots: [
    { texte: "un brouillon propre", barre: true },
    { texte: "des ratures", focus: true },
  ],
  legende: "Le brouillon est un écrit à retravailler : les ratures y sont un signe de travail.",
});

const brouillonPourEssayer = phrase({
  mots: [
    { texte: "essayer" },
    { texte: "raturer" },
    { texte: "réorganiser", focus: true },
  ],
  legende: "Trois usages du brouillon — et aucun ne consiste à préparer une copie au propre.",
});

// ── RÉVISER : deux passages, deux buts, et l'oreille.
const deuxRelectures = phrase({
  mots: [
    { texte: "une pour le sens" },
    { texte: "une pour la langue", focus: true },
  ],
  legende: "On ne voit pas les deux à la fois : deux passages, deux buts différents.",
});

const voixBasse = phrase({
  mots: [
    { texte: "l'œil saute" },
    { texte: "l'oreille entend", focus: true },
  ],
  legende: "Relis à voix basse : un mot manquant s'entend avant de se voir.",
});

const corrigerEtEnrichir = phrase({
  mots: [
    { texte: "corriger" },
    { texte: "enrichir", focus: true },
  ],
  legende: "Améliorer, ce n'est pas seulement corriger : c'est aussi enrichir une phrase pauvre.",
});

const critereContreImpression = phrase({
  mots: [
    { texte: "chercher des fautes", barre: true },
    { texte: "suivre une liste", focus: true },
  ],
  legende: "S'autoévaluer, c'est relire avec des critères connus — pas se donner une note.",
});

// ── LES NORMES : l'accord d'abord.
// ⛔ ICI L'ÉTIQUETTE EST UNE VRAIE FONCTION : la couleur doit s'appliquer, et
// l'arc est de type `accord`. Même bascule qu'en 5e.
const accordSujetVerbe = phrase({
  mots: [
    { texte: "Les élèves" },
    { texte: "de la classe" },
    { texte: "ont rendu" },
  ],
  groupes: [{ mots: [0, 1], label: "le sujet" }],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "Le premier accord à vérifier, et celui que le programme cite en tête.",
});

const troisChainesCassees = phrase({
  mots: [
    { texte: "les élève", barre: true },
    { texte: "a rendu", barre: true },
    { texte: "leur devoirs", barre: true },
  ],
  legende: "Trois chaines d'accord cassées dans une seule phrase — et l'on n'en voit qu'une.",
});

const pointOublie = phrase({
  mots: [
    { texte: "l'idée d'abord" },
    { texte: "le point après", barre: true },
  ],
  legende: "On écrit vite pour ne pas perdre l'idée : le point est le premier oublié.",
});

const phraseTropLongue = phrase({
  mots: [
    { texte: "une phrase longue" },
    { texte: "deux phrases", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "se coupe en", type: "question" }],
  legende: "Deux phrases claires valent mieux qu'une phrase juste et illisible.",
});

// ── LE DÉFI : agir précisément sur ce qui a gêné.
const geneNommeeGestePrecis = phrase({
  mots: [
    { texte: "une gêne nommée" },
    { texte: "un geste précis", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "appelle", type: "question" }],
  legende: "« On ne sait pas qui parle » : tu ajoutes des tirets et tu nommes les personnages.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureReviser6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "ecriture-reviser",
  titre: `Réviser son texte et son brouillon en 6e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu as relu trois fois et tu n'as rien vu. Ce n'est pas de la négligence, et voici pourquoi : SANS CRITÈRES, ON RELIT CE QU'ON CROIT AVOIR ÉCRIT. Ton œil ne lit pas la page, il lit ton intention — parce que c'est toi qui l'as écrite. Les trois remèdes font tous la même chose : ils te sortent de ta tête. Une liste de critères, ton oreille, ou quelqu'un d'autre.",
  identite: [
    { label: "Mots clés", valeur: "Brouillon, critères, accords, enrichir" },
    { label: "Le secret", valeur: "On relit ce qu'on croit avoir écrit" },
    { label: "Outil", valeur: "Relire à voix basse" },
  ],
  definition: {
    texte:
      "LE BROUILLON n'est pas une première version qu'on recopiera au propre : c'est un écrit À RETRAVAILLER, fait pour essayer, raturer et réorganiser — les ratures y sont un signe de travail, pas de saleté. RÉVISER, c'est relire pour CORRIGER ET AMÉLIORER : le programme demande d'« améliorer tout ou partie de son texte », donc aussi d'enrichir une phrase pauvre, et non seulement de chasser des fautes. On relit AU MOINS DEUX FOIS, AVEC UN BUT DIFFÉRENT À CHAQUE FOIS — une fois pour le sens, une fois pour l'orthographe : on ne voit pas les deux à la fois. S'AUTOÉVALUER, c'est relire avec DES CRITÈRES CONNUS, et non se donner une note : sans critères, on relit ce qu'on croit avoir écrit. Deux autres moyens sortent du même piège : relire À VOIX BASSE, parce que l'oreille entend ce que l'œil saute, et faire relire par UN CAMARADE — à qui l'on demande alors d'agir précisément sur ce qui l'a gêné. Côté NORMES enfin : l'accord du verbe avec son sujet d'abord, la majuscule et le point ensuite — le point de fin de phrase étant le signe le plus souvent oublié dans un brouillon.",
  },
  figure: {
    schema: pile(onRelitCeQuonCroyait, grilleSortirDeSaTete),
    legende:
      "Voilà l'explication de ces relectures qui ne trouvent jamais rien, et ce n'est pas un défaut d'attention : ton œil connait déjà la phrase, parce que tu l'as pensée avant de l'écrire. Il lit ce que tu voulais dire, et il comble tout seul le mot manquant. Les quatre remèdes du tableau font tous la même chose — ils te font sortir de ta tête. Une liste de critères ne comble rien ; ton oreille n'a pas écrit le texte ; et un camarade ne l'a même pas pensé.",
  },
  proprietes: [
    {
      titre: "Un brouillon sert à essayer, raturer, réorganiser",
      texte:
        "Ce n'est pas une version à recopier au propre, ni un vrac d'idées, ni un entrainement. C'est un texte sur lequel on AGIT.",
      schema: brouillonPourEssayer,
      micros: ["6e_ecrit_brouillon"],
    },
    {
      titre: "Les ratures sont un signe de travail",
      texte:
        "Un brouillon parfaitement propre n'a pas servi. Ce n'est pas une question de soin : c'est qu'aucune décision n'y a été prise.",
      schema: ratureSigneDeTravail,
      micros: ["6e_ecrit_brouillon"],
    },
    {
      titre: "Sans critères, la relecture ne trouve rien",
      texte:
        "On relit ce qu'on croit avoir écrit. S'autoévaluer, c'est relire avec des critères connus — pas se donner une note ni demander un avis.",
      schema: critereContreImpression,
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Deux relectures, deux buts",
      texte:
        "Au moins deux fois, en cherchant autre chose à chaque fois : une pour le sens, une pour la langue. Deux fois la même ne sert à rien.",
      schema: deuxRelectures,
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "L'oreille entend ce que l'œil saute",
      texte:
        "Relis à voix basse. Un mot manquant s'entend souvent avant de se voir — ce n'est pas parce qu'on lit plus lentement, c'est un autre sens.",
      schema: pile(voixBasse, grilleSortirVoixBasse),
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Réviser, c'est aussi enrichir",
      texte:
        "Le programme demande d'améliorer, pas seulement de corriger. Une phrase juste mais pauvre se retravaille — et cela ne veut pas dire l'allonger.",
      schema: corrigerEtEnrichir,
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "L'accord du verbe avec son sujet, en premier",
      texte:
        "C'est le point de vigilance que le programme cite en tête, avec l'accord dans le groupe nominal. Et le sujet n'est pas toujours le mot d'avant.",
      schema: accordSujetVerbe,
      micros: ["6e_ecrit_normes"],
    },
    {
      titre: "Une phrase peut casser trois chaines d'un coup",
      texte:
        "« Les élève de la classe a rendu leur devoirs » : le nom, le verbe, le déterminant. On n'en voit qu'une si l'on n'en cherche qu'une.",
      schema: troisChainesCassees,
      micros: ["6e_ecrit_normes"],
    },
    {
      titre: "Le point de fin est le premier oublié",
      texte:
        "On écrit vite pour ne pas perdre l'idée, et la ponctuation passe après. Et une phrase trop longue se coupe en deux, elle ne se rature pas.",
      schema: pile(pointOublie, phraseTropLongue),
      micros: ["6e_ecrit_normes"],
    },
    {
      titre: "Une gêne nommée appelle un geste précis",
      texte:
        "« On ne comprend pas qui parle » ne demande ni guillemets, ni réécriture : des tirets, et les personnages nommés. On agit sur ce qui a gêné.",
      schema: geneNommeeGestePrecis,
      micros: ["6e_ecrit_reviser_defi"],
    },
  ],
  reel: {
    texte:
      "Tu as déjà vécu la scène : tu envoies un message, et tu vois la faute une seconde après l'envoi — pas avant, alors que tu venais de le relire. Rien n'a changé dans le message ; ce qui a changé, c'est que tu l'as regardé comme un lecteur au lieu d'un auteur. C'est exactement ce que la fiche décrit. Le même mécanisme explique pourquoi un camarade trouve en dix secondes ce que tu as cherché dix minutes : il n'a pas ton texte dans la tête, donc il ne peut rien combler. Et la voix basse, tu l'as sûrement essayée sans savoir pourquoi ça marchait : ton oreille n'a pas écrit la phrase, elle ne l'attend pas — alors elle entend le trou.",
  },
  historique: {
    texte:
      "Les imprimeurs ont compris très tôt qu'un auteur ne peut pas relire son propre texte : c'est pour cela que le métier de correcteur existe, et qu'il est confié à quelqu'un qui n'a pas écrit le livre. L'accident le plus célèbre est une bible imprimée à Londres en 1631, dans laquelle un « not » a sauté d'un commandement — le sens s'en trouvait exactement inversé. L'édition entière fut rappelée et les imprimeurs lourdement condamnés. Le mot manquant avait pourtant traversé toutes les relectures : personne ne l'avait vu, parce que tout le monde connaissait la phrase par cœur et la complétait en la lisant. C'est précisément ce que fait ton œil sur ton propre brouillon.",
  },
  formule: {
    contexte: "Le geste le plus rentable de toute la relecture, et il coute une minute.",
    expression: "relire à voix basse",
    legende:
      "Ton oreille n'a pas écrit la phrase : elle ne l'attend pas, donc elle ne comble rien. Un mot sauté, une répétition, une phrase qui n'en finit pas — les trois s'entendent avant de se voir. C'est le seul remède qui ne demande ni liste, ni camarade, ni matériel.",
    schema: voixBasse,
  },
  methode: [
    {
      titre: "Raturer sur le brouillon, pas au propre",
      texte:
        "Barre, flèche, ajoute dans la marge. Un brouillon lisible mais couvert de marques a fait son travail ; un brouillon impeccable ne l'a pas fait.",
      schema: ratureSigneDeTravail,
      micros: ["6e_ecrit_brouillon"],
    },
    {
      titre: "Écrire ses critères avant de relire",
      texte:
        "Trois lignes : ai-je répondu ? les accords ? les points ? Tu ne cherches plus « des fautes » — tu suis une liste, et une liste ne se laisse pas tromper.",
      schema: critereContreImpression,
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Remonter du verbe au vrai sujet",
      texte:
        "Le doigt sur le verbe, on remonte jusqu'à ce qui fait l'action. Le mot juste avant est souvent un complément, et il trompe l'oreille.",
      schema: accordSujetVerbe,
      micros: ["6e_ecrit_normes"],
    },
    {
      titre: "Demander où ça a gêné, pas si c'est bien",
      texte:
        "« Qu'est-ce que tu n'as pas compris, et à quel endroit ? » La réponse désigne une ligne, et une ligne se répare.",
      schema: geneNommeeGestePrecis,
      micros: ["6e_ecrit_reviser_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour que le brouillon serve à quelque chose",
      detail:
        "S'il ressemble à ta copie en moins propre, tu as écrit deux fois le même texte. Il doit porter des essais que la copie ne portera pas.",
      schema: brouillonPourEssayer,
      micros: ["6e_ecrit_brouillon"],
    },
    {
      titre: "Pour trouver enfin quelque chose en relisant",
      detail:
        "Une liste de trois critères, et deux passages avec un but chacun. C'est tout — et cela trouve plus qu'une heure de relecture attentive.",
      schema: deuxRelectures,
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Pour repérer les mots sautés",
      detail:
        "À voix basse, en suivant du doigt. C'est l'unique méthode qui les attrape de façon fiable, parce que l'œil, lui, les complète.",
      schema: voixBasse,
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Pour ne plus perdre les points d'accord",
      detail:
        "Une relecture entière rien que pour les verbes. Tu en trouveras, et tu n'en aurais trouvé aucun en cherchant « les fautes » en général.",
      schema: troisChainesCassees,
      micros: ["6e_ecrit_normes"],
    },
  ],
  exemples: [
    {
      titre: "À quoi sert un brouillon",
      donnees: "« À quoi sert un brouillon ? »",
      schema: brouillonPourEssayer,
      question: "À quoi ?",
      solution:
        "À ESSAYER, RATURER ET RÉORGANISER AVANT LA VERSION FINALE. Pas à « écrire une première version qu'on recopiera » — cela ne change rien au texte. Pas à noter ses idées en vrac, pas à s'entrainer : c'est un écrit sur lequel on AGIT, et les ratures y sont un signe de travail.",
      micros: ["6e_ecrit_brouillon"],
    },
    {
      titre: "S'autoévaluer",
      donnees: "« S'autoévaluer, c'est… »",
      schema: critereContreImpression,
      question: "C'est quoi ?",
      solution:
        "RELIRE SON TEXTE AVEC DES CRITÈRES CONNUS. Ni se donner une note — cela ne corrige rien —, ni demander l'avis du professeur, ni comparer avec le voisin. Sans critères, la relecture ne trouve rien : on relit ce qu'on croit avoir écrit.",
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Combien de relectures",
      donnees: "« Combien de fois faut-il relire un texte avant de le rendre ? »",
      schema: deuxRelectures,
      question: "Combien ?",
      solution:
        "AU MOINS DEUX FOIS, AVEC UN BUT DIFFÉRENT À CHAQUE FOIS. Deux fois de suite en cherchant la même chose ne sert à rien ; une seule fois, même lentement, ne peut pas voir le sens ET la langue. Une relecture pour chacun : on ne voit pas les deux ensemble.",
      micros: ["6e_ecrit_reviser"],
    },
    {
      titre: "Compter les fautes d'accord",
      donnees: "« Les élève de la classe a rendu leur devoirs. »",
      schema: troisChainesCassees,
      question: "Combien de fautes d'accord ?",
      solution:
        "TROIS. « Les élèves » — le nom au pluriel ; « ont rendu » — le verbe s'accorde avec les élèves, pas avec « la classe » qui le précède ; « leurs devoirs » — le déterminant aussi. Trois chaines cassées, et l'on n'en voit qu'une si l'on n'en cherche qu'une.",
      micros: ["6e_ecrit_normes"],
    },
    {
      titre: "Le signe oublié",
      donnees: "« Quel signe manque le plus souvent dans un brouillon ? »",
      schema: pointOublie,
      question: "Lequel ?",
      solution:
        "LA PONCTUATION DE FIN DE PHRASE. Pas les accents, pas les majuscules de noms propres, pas les tirets de dialogue. La raison est mécanique : on écrit vite pour ne pas perdre l'idée, et le point est ce qu'on remet à plus tard — puis on oublie.",
      micros: ["6e_ecrit_normes"],
    },
    {
      titre: "Le défi",
      donnees: "Un camarade te dit : « On ne comprend pas qui parle. »",
      schema: geneNommeeGestePrecis,
      question: "Que fais-tu ?",
      solution:
        "TU AJOUTES DES TIRETS ET TU NOMMES LES PERSONNAGES. Pas des guillemets au début et à la fin — ils n'indiquent pas les changements —, pas le nom dans le titre, et surtout pas une réécriture sans dialogue : la remarque désigne une gêne précise, et l'on agit exactement dessus.",
      micros: ["6e_ecrit_reviser_defi"],
    },
  ],
  pieges: [
    "Croire qu'on ne trouve rien par négligence : on relit ce qu'on croit avoir écrit.",
    "Relire sans critères : sans liste, l'œil comble tout seul ce qui manque.",
    "Relire deux fois en cherchant la même chose : deux passages, deux buts.",
    "Rendre un brouillon impeccable : sans ratures, aucune décision n'y a été prise.",
    "Croire que réviser, c'est seulement corriger : c'est aussi enrichir une phrase pauvre.",
    "Accorder le verbe avec le mot qui le précède : ce n'est pas toujours le sujet.",
    "Répondre à « on ne comprend pas » en réécrivant tout : on agit sur la gêne nommée.",
  ],
  aRetenir: [
    "Sans critères, on relit ce qu'on croit avoir écrit — c'est l'explication de tout.",
    "Trois sorties de sa tête : une liste, l'oreille, quelqu'un d'autre.",
    "Deux relectures au moins, avec un but différent à chaque fois.",
    "Le brouillon est un écrit à retravailler : les ratures y sont un signe de travail.",
    "L'accord du verbe avec son sujet d'abord, et le point est le premier oublié.",
  ],
  entrainement: [
    {
      question: "« Réviser son texte, c'est… » quoi ?",
      correction: "Le relire pour corriger et améliorer.",
      micros: ["6e_ecrit_reviser"],
    },
    {
      question: "« Pourquoi relire son texte à voix basse ? »",
      correction: "Parce que l'oreille entend ce que l'œil saute.",
      micros: ["6e_ecrit_reviser"],
    },
    {
      question: "« Améliorer son texte, ce n'est pas seulement corriger : c'est aussi… »",
      correction: "Enrichir une phrase pauvre.",
      micros: ["6e_ecrit_reviser"],
    },
    {
      question: "« Quand tu relis pour l'orthographe, quel accord vérifies-tu en premier ? »",
      correction: "L'accord du verbe avec son sujet.",
      micros: ["6e_ecrit_normes"],
    },
    {
      question: "« Respecter les codes de l'écrit, c'est notamment… »",
      correction: "Majuscule au début, point à la fin.",
      micros: ["6e_ecrit_normes"],
    },
    {
      question: "« Que fait-on d'une phrase trop longue repérée à la relecture ? »",
      correction: "On la coupe en deux phrases.",
      micros: ["6e_ecrit_reviser_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesEcritureReviser6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Réviser son texte - 6e",
    section: {
      type: "objectif",
      phrase: "On relit ce qu'on croit avoir écrit",
      sousPhrase:
        "Ton œil ne lit pas la page : il lit ton intention, parce que c'est toi qui l'as écrite.",
      encadre: {
        titre: "L'idée",
        texte: "Ce n'est pas de la négligence — et les trois remèdes te sortent de ta tête.",
      },
    },
  },
  {
    titre: "Sortir de sa tête",
    badge: "Réviser son texte - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Des critères", texte: "Une liste ne comble rien. Trois lignes suffisent." },
        { titre: "Deux passages", texte: "Un pour le sens, un pour la langue." },
        { titre: "La voix basse", texte: "Ton oreille n'a pas écrit la phrase." },
        { titre: "Un camarade", texte: "Il ne l'a même pas pensée." },
      ],
    },
    schema: grilleSortirDeSaTete,
  },
  {
    titre: "Le brouillon",
    badge: "Réviser son texte - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Une première version à recopier au propre — cela ne change rien au texte.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Un écrit à retravailler : essayer, raturer, réorganiser. Les ratures sont le travail.",
      },
    },
    schema: ratureSigneDeTravail,
  },
  {
    titre: "Corriger, et enrichir",
    badge: "Réviser son texte - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Le programme dit « améliorer tout ou partie de son texte ».",
        "CORRIGER : les accords, les points, les mots sautés.",
        "ENRICHIR : une phrase juste mais pauvre se retravaille.",
        "Et enrichir ne veut pas dire allonger.",
      ],
    },
    schema: corrigerEtEnrichir,
  },
  {
    titre: "Les normes : l'accord d'abord",
    badge: "Réviser son texte - 6e",
    section: {
      type: "etapes",
      etapes: [
        "L'ACCORD DU VERBE avec son sujet — que le programme cite en tête.",
        "Le sujet n'est pas toujours le mot qui précède le verbe.",
        "MAJUSCULE au début, POINT à la fin.",
        "Et le point est le signe le plus souvent oublié d'un brouillon.",
      ],
    },
    schema: accordSujetVerbe,
  },
  {
    titre: "À vous",
    badge: "Réviser son texte - 6e",
    section: {
      type: "exercice",
      enonce: "« Les élève de la classe a rendu leur devoirs. »",
      question: "Combien de fautes d'accord, et lesquelles ?",
      indice: "Cherche les chaines, pas les mots.",
      correction:
        "TROIS. « Les élèves » (le nom), « ont rendu » (le verbe s'accorde avec les élèves, pas avec « la classe »), « leurs devoirs » (le déterminant).",
    },
    schema: troisChainesCassees,
  },
];
