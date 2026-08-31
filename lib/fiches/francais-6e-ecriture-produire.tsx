// ─── Fiche de cours : produire des écrits variés et cohérents (6e) ────────────
// TROISIÈME FICHE DU DOMAINE DE L'ÉCRITURE EN 6e.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. Compétence « Produire des écrits variés » (BO6EFRE).
//
// ⛔⛔ PIÈGE DE CLASSE, ET LE NOM EST LE MÊME : `ecriture_produire` EXISTE EN 5e.
// Les deux fiches ne traitent pourtant pas du tout du même défaut :
//
//   | 5e (cycle 4) | 6e (cycle 3) |
//   |—|—|—|
//   | ce qui MANQUE : lieu, obstacle, ordre, fin | ce qui CHANGE en route |
//   | trois charpentes de quatre pièces | la cohérence et les codes de l'écrit |
//   | thèse, argument, exemple, connecteur | temps, personnages, lieu, point de vue |
//   | la réponse rédigée sur un texte | le paragraphe, le tiret, la majuscule |
//
// ⚠️ La 5e compte des pièces absentes ; la 6e traque des pièces qui bougent. Ce
// sont deux défauts opposés, et les confondre ferait deux fiches jumelles.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : LA COHÉRENCE, C'EST CE QUI NE DOIT PAS
// CHANGER EN ROUTE. Les personnages, le temps, le lieu, celui qui raconte. Le
// pool le dit pour la suite d'un récit — « conserver les personnages, le temps
// et le lieu » — et tous ses autres cas sont des variantes du même accident.
// ⭐ D'où le corollaire qui explique pourquoi l'élève ne voit rien en relisant :
// UN TEXTE INCOHÉRENT N'EST PAS MAL ÉCRIT PHRASE PAR PHRASE. Chaque phrase peut
// être juste, bien orthographiée, bien construite. La casse est ENTRE les
// phrases — donc invisible tant qu'on relit phrase par phrase.
//
// ⭐ ET LA RAISON DE TOUS LES CODES, EN UNE LIGNE DU POOL : « LE LECTEUR NE VOIT
// PAS CE QUE TU IMAGINES ». Le changement de lieu se signale, le changement de
// locuteur se marque d'un tiret, le changement d'idée s'ouvre par un paragraphe.
// Les codes de l'écrit ne sont pas des conventions arbitraires : ce sont les
// seuls signaux dont dispose quelqu'un qui n'a pas ta scène dans la tête.
//
// ⭐ UN PARAGRAPHE EST UNE UNITÉ DE SENS, PAS UNE UNITÉ DE PLACE. « Quand la page
// est pleine » est un leurre du pool, et c'est exactement ce que font les élèves.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot ; `number_line` centre
// aussi son étiquette sur la valeur — pas de point sur une borne.
//
// Alignée sur les pools ECRIT_COHERENCE et ECRITURE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `ecriture_produire`) :
// - 6e_ecrit_invention      → propriétés 1 et 2, méthode 1, usage 1, exemple 1
// - 6e_ecrit_reflexion      → propriété 3, méthode 2, usage 2, exemple 2
// - 6e_ecrit_coherence      → figure, propriétés 4 à 7, formule, méthode 3,
//                             usage 3, exemples 3 et 4
// - 6e_ecrit_codes          → propriétés 8 et 9, méthode 4, usage 4, exemple 5
// - 6e_ecrit_produire_defi  → propriété 10, exemple 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
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

/** Les connecteurs qui ordonnent un récit. ⚠️ Points en 1..3 dans un axe 0..4 :
 *  jamais sur une borne, sinon l'étiquette déborde de la moitié de sa largeur. */
function axe(points: NumberLineCanvasPoint[]) {
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

/** Ce qui ne doit pas changer, et ce qu'on perd si cela change. ⚠️ Cellules
 *  courtes : à la largeur d'un bloc, vingt signes tombent sous 11 px. */
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

// ─── Ce qui se dessine quand un texte se casse ────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : la casse est ENTRE les phrases.
const casseEntreLesPhrases = phrase({
  mots: [
    { texte: "chaque phrase juste" },
    { texte: "le texte cassé", focus: true },
  ],
  legende: "Un texte incohérent n'est pas mal écrit : il se casse ENTRE les phrases.",
});

const grilleCeQuiNeChangePas = grille({
  headers: ["Ne doit pas changer", "Sinon on perd"],
  rows: [
    { values: ["les personnages", "qui agit"] },
    { values: ["le temps", "quand"] },
    { values: ["le lieu", "où"] },
    { values: ["qui raconte", "tout"] },
  ],
  caption: "Écrire une suite, c'est d'abord conserver ces quatre-là.",
});

const grilleCeQuiNeChangePasTemps = grille({
  headers: ["Ne doit pas changer", "Sinon on perd"],
  rows: [
    { values: ["les personnages", "qui agit"] },
    { values: ["le temps", "quand"] },
    { values: ["le lieu", "où"] },
    { values: ["qui raconte", "tout"] },
  ],
  highlight: { row: 1 },
  caption: "Le système des temps : on n'en change pas sans raison.",
});

// ── LES QUATRE ACCIDENTS.
const tempsQuiGlisse = phrase({
  mots: [
    { texte: "il partit" },
    { texte: "il regarde", barre: true },
  ],
  legende: "Passé simple, puis présent sans raison : la cohérence est rompue.",
});

const nomQuiChange = phrase({
  mots: [
    { texte: "Malo", focus: true },
    { texte: "Marlo", barre: true },
  ],
  legende: "Ce n'est pas une faute d'orthographe : la chaine du personnage est cassée.",
});

const pointDeVueQuiBascule = phrase({
  mots: [
    { texte: "je" },
    { texte: "il pensa", barre: true },
  ],
  legende: "Qui raconte doit rester le même du début à la fin, sauf choix assumé.",
});

const changementDeLieu = phrase({
  mots: [
    { texte: "un lieu" },
    { texte: "un autre" },
    { texte: "le signaler", focus: true },
  ],
  legende: "Le lecteur ne voit pas ce que tu imagines : un changement se dit.",
});

// ── LES CODES DE L'ÉCRIT.
const codeDuDialogue = phrase({
  mots: [
    { texte: "un tiret" },
    { texte: "un retour ligne", focus: true },
  ],
  legende: "C'est un code : il dit au lecteur que quelqu'un d'autre parle.",
});

const paragrapheUniteDeSens = phrase({
  mots: [
    { texte: "une idée neuve" },
    { texte: "un paragraphe", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "ouvre", type: "question" }],
  legende: "Le paragraphe est une unité de SENS, pas une unité de place.",
});

// ── LES CONNECTEURS : succession ou simultanéité.
const connecteursDuRecit = axe([
  { value: 1, label: "d'abord" },
  { value: 2, label: "ensuite" },
  { value: 3, label: "enfin" },
]);

const successionOuSimultaneite = phrase({
  mots: [
    { texte: "plus tard", focus: true },
    { texte: "en même temps" },
  ],
  legende: "L'un dit la succession, l'autre la simultanéité. Ce n'est pas la même scène.",
});

// ── L'AVIS JUSTIFIÉ PAR ÉCRIT.
const avisEtCause = phrase({
  mots: [
    { texte: "ton avis" },
    { texte: "parce que", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "tenu par", type: "question" }],
  legende: "Donner son avis par écrit, c'est le faire suivre de ce qui le soutient.",
});

const descriptionPrecise = phrase({
  mots: [
    { texte: "un grand chien noir", focus: true },
    { texte: "impressionnant", barre: true },
  ],
  legende: "Des détails précis font voir. Les mots d'intensité ne montrent rien.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureProduire6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "ecriture-produire",
  titre: `Écrire un texte qui se tient en 6e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Un texte incohérent n'est pas mal écrit. Chaque phrase peut être juste, bien orthographiée, bien construite — et le texte est cassé quand même, parce que la casse est ENTRE les phrases. C'est pour cela qu'on ne la voit pas en relisant phrase par phrase. La cohérence, c'est simplement ce qui ne doit pas changer en route : les personnages, le temps, le lieu, celui qui raconte.",
  identite: [
    { label: "Mots clés", valeur: "Cohérence, temps, paragraphe, tiret" },
    { label: "Le secret", valeur: "La casse est entre les phrases" },
    { label: "Outil", valeur: "Qu'est-ce qui a changé en route ?" },
  ],
  definition: {
    texte:
      "Produire un écrit qui SE TIENT, c'est veiller à ce que rien ne change en route sans raison. QUATRE CHOSES doivent rester stables : les PERSONNAGES — un héros qui s'appelle Malo au début et Marlo à la fin casse la chaine, et ce n'est pas une faute d'orthographe ; le TEMPS — un récit au passé simple qui passe au présent rompt la cohérence ; le LIEU — un récit qui change d'endroit sans prévenir perd son lecteur ; et CELUI QUI RACONTE — un texte à la première personne qui écrit soudain « il pensa » a changé de point de vue sans le dire. Écrire la SUITE d'un récit demande précisément de conserver ces éléments. Viennent ensuite LES CODES DE L'ÉCRIT, qui ne sont pas des conventions arbitraires mais les seuls signaux dont dispose un lecteur qui n'a pas ta scène en tête : un TIRET et un RETOUR À LA LIGNE annoncent une nouvelle réplique, un PARAGRAPHE s'ouvre quand on passe à une nouvelle idée — pas quand la page est pleine —, et les CONNECTEURS disent si les actions se suivent (« plus tard ») ou se produisent ensemble (« en même temps »).",
  },
  figure: {
    schema: pile(casseEntreLesPhrases, grilleCeQuiNeChangePas),
    legende:
      "Voilà pourquoi tu ne trouves rien en relisant : tu relis des phrases, et chacune est correcte. L'incohérence n'habite aucune phrase — elle habite le passage de l'une à l'autre, là où le temps a glissé, où le nom a changé, où l'on s'est déplacé sans le dire. Le tableau donne les quatre choses à surveiller, et ce qu'on perd quand chacune bouge. C'est une relecture différente des autres : elle ne cherche pas une faute, elle cherche un CHANGEMENT.",
  },
  proprietes: [
    {
      titre: "Un récit qui se tient garde ses éléments",
      texte:
        "Écrire une suite demande de conserver les personnages, le temps et le lieu. Ni le titre, ni le nombre de lignes, ni la première phrase recopiée.",
      schema: grilleCeQuiNeChangePas,
      micros: ["6e_ecrit_invention"],
    },
    {
      titre: "Une description se fait avec des détails précis",
      texte:
        "« Un grand chien noir » fait voir ; « un chien vraiment impressionnant » ne montre rien. Les mots d'intensité remplacent le détail au lieu de le donner.",
      schema: descriptionPrecise,
      micros: ["6e_ecrit_invention"],
    },
    {
      titre: "Donner son avis, c'est le faire suivre d'une raison",
      texte:
        "Un avis seul ne se discute pas. « Parce que » n'est pas une formule d'école : c'est ce qui transforme une opinion en quelque chose qu'on peut examiner.",
      schema: avisEtCause,
      micros: ["6e_ecrit_reflexion"],
    },
    {
      titre: "Le temps ne change pas sans raison",
      texte:
        "Un récit au passé simple qui glisse au présent rompt la cohérence. Ce n'est pas équivalent, et cela ne se remarque qu'en relisant pour cela.",
      schema: pile(tempsQuiGlisse, grilleCeQuiNeChangePasTemps),
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Le nom d'un personnage ne change pas",
      texte:
        "Malo au début, Marlo à la fin : le lecteur ne sait plus de qui on parle. Ce n'est pas une coquille sans importance, c'est une chaine cassée.",
      schema: nomQuiChange,
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Celui qui raconte reste le même",
      texte:
        "Un texte à la première personne qui écrit « il pensa » a changé de point de vue — et le lecteur ne sait plus qui sait quoi.",
      schema: pointDeVueQuiBascule,
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Un changement de lieu se signale",
      texte:
        "Le lecteur ne voit pas ce que tu imagines. Une phrase ou un connecteur de lieu suffit — un paragraphe seul ne dit rien.",
      schema: changementDeLieu,
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Le tiret annonce une nouvelle réplique",
      texte:
        "Un tiret et un retour à la ligne. Ni parenthèses, ni astérisque : c'est un code, et le lecteur l'attend à cet endroit précis.",
      schema: codeDuDialogue,
      micros: ["6e_ecrit_codes"],
    },
    {
      titre: "Un paragraphe est une unité de sens",
      texte:
        "On en ouvre un quand on passe à une nouvelle idée — pas quand la page est pleine, pas tous les cinq mots, pas à chaque virgule.",
      schema: paragrapheUniteDeSens,
      micros: ["6e_ecrit_codes"],
    },
    {
      titre: "Les connecteurs disent si ça se suit ou si ça se superpose",
      texte:
        "« Plus tard » et « ensuite » marquent la succession ; « en même temps » et « pendant ce temps » marquent la simultanéité. Ce n'est pas la même scène.",
      schema: pile(connecteursDuRecit, successionOuSimultaneite),
      micros: ["6e_ecrit_produire_defi"],
    },
  ],
  reel: {
    texte:
      "Le cinéma appelle cela un faux raccord, et tu les repères très bien : le verre plein dans un plan, à moitié vide dans le suivant, plein de nouveau ensuite. Chaque plan est parfait, et pourtant quelque chose cloche — parce que le problème est ENTRE les plans. C'est exactement ton texte. Tu relis chaque phrase, tu la trouves correcte, et le professeur écrit quand même « on ne suit pas ». Il ne parle d'aucune phrase : il parle des passages. Et tu as déjà éprouvé l'autre moitié de la fiche, quand quelqu'un te raconte une histoire et que tu demandes « attends, on est où là ? » — cette personne a changé de lieu dans sa tête sans le dire, parce qu'elle, elle voyait la scène.",
  },
  historique: {
    texte:
      "Sur un tournage, une personne a pour métier entier de veiller à ce que rien ne change en route : la scripte. Elle note la position de chaque objet, le niveau du verre, la main qui tient la cigarette, l'heure indiquée par la pendule — parce qu'un film ne se tourne pas dans l'ordre, et que deux plans qui se suivront à l'écran peuvent avoir été filmés à trois semaines d'intervalle. Sans elle, le personnage changerait de montre au milieu d'une conversation. Ce métier existe parce que la cohérence ne se voit pas quand on fabrique : elle ne se voit qu'à la lecture, ou qu'à la projection. Ton brouillon a le même problème, et il n'a pas de scripte — c'est donc toi qui relis, en cherchant les changements plutôt que les fautes.",
  },
  formule: {
    contexte: "La question d'une relecture qui cherche autre chose que des fautes.",
    expression: "qu'est-ce qui a changé en route ?",
    legende:
      "Le temps, un nom, le lieu, celui qui raconte. Quatre choses, et il suffit de suivre chacune du début à la fin, séparément. Cette relecture-là ne trouve aucune faute d'orthographe — c'est normal, elle ne cherche pas cela. Elle trouve ce qu'aucune autre ne voit.",
    schema: casseEntreLesPhrases,
  },
  methode: [
    {
      titre: "Relire la fin en regardant le début",
      texte:
        "Les mêmes personnages ? le même temps ? le même lieu ? Trois questions posées à la première page et à la dernière, et l'écart saute aux yeux.",
      schema: grilleCeQuiNeChangePas,
      micros: ["6e_ecrit_invention"],
    },
    {
      titre: "Chercher les phrases sans « parce que »",
      texte:
        "Souligne tes phrases d'avis. Celles qui ne sont suivies d'aucune raison affirment sans rien soutenir, et se réparent en une ligne.",
      schema: avisEtCause,
      micros: ["6e_ecrit_reflexion"],
    },
    {
      titre: "Suivre un seul élément à la fois",
      texte:
        "Une relecture pour les temps. Une pour les noms. Une pour les lieux. Suivies séparément, les ruptures apparaissent ; ensemble, aucune.",
      schema: tempsQuiGlisse,
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Vérifier les codes en dernier",
      texte:
        "Un tiret par réplique, un paragraphe par idée, une majuscule et un point par phrase. Ce sont des vérifications rapides, et elles se comptent.",
      schema: codeDuDialogue,
      micros: ["6e_ecrit_codes"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire la suite d'un texte donné",
      detail:
        "Relève d'abord ce qui est installé : les noms, le temps, le lieu, qui raconte. Ta suite doit tout conserver — c'est là qu'on te lit.",
      schema: grilleCeQuiNeChangePas,
      micros: ["6e_ecrit_invention"],
    },
    {
      titre: "Pour un avis écrit qui compte",
      detail:
        "Une phrase d'avis, une phrase de raison. Deux lignes, et ton paragraphe tient — alors qu'une demi-page d'affirmations ne tient pas.",
      schema: avisEtCause,
      micros: ["6e_ecrit_reflexion"],
    },
    {
      titre: "Pour comprendre « on ne suit pas » en marge",
      detail:
        "Cette remarque ne vise aucune phrase. Elle dit qu'un passage manque, ou qu'un élément a changé sans prévenir. Cherche le changement.",
      schema: changementDeLieu,
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Pour un dialogue qu'on suit",
      detail:
        "Un tiret, un retour à la ligne, à chaque changement de personne. Sans cela, le lecteur compte les répliques pour savoir qui parle.",
      schema: codeDuDialogue,
      micros: ["6e_ecrit_codes"],
    },
  ],
  exemples: [
    {
      titre: "Écrire une suite",
      donnees: "« Écrire la suite d'un récit demande de conserver… »",
      schema: grilleCeQuiNeChangePas,
      question: "Que faut-il conserver ?",
      solution:
        "LES PERSONNAGES, LE TEMPS ET LE LIEU. Ni le titre, ni la façon d'écrire les dialogues, ni le nombre de paragraphes, ni la première phrase recopiée. Une suite cohérente ne change pas en route ce que le texte avait installé — c'est tout ce qu'on demande, et c'est déjà beaucoup.",
      micros: ["6e_ecrit_invention"],
    },
    {
      titre: "Une description",
      donnees: "« Quelle phrase est la plus précise pour une description ? »",
      schema: descriptionPrecise,
      question: "Laquelle ?",
      solution:
        "« UN GRAND CHIEN NOIR ABOYAIT DEVANT LA PORTE. » Deux détails qui font voir : la taille, la couleur. « Vraiment très impressionnant » et « magnifique, avec beaucoup d'énergie » sont plus longs et montrent moins — les mots d'intensité remplacent le détail au lieu de le donner.",
      micros: ["6e_ecrit_reflexion"],
    },
    {
      titre: "Un temps qui glisse",
      donnees: "« Ton récit est au passé simple. Une phrase passe au présent sans raison. »",
      schema: tempsQuiGlisse,
      question: "Que se passe-t-il ?",
      solution:
        "LA COHÉRENCE DU RÉCIT EST ROMPUE. Ce n'est pas équivalent : le système des temps est ce qui tient le récit ensemble, et l'on n'en change pas sans raison. Le texte ne devient pas un poème et il ne faut pas couper le paragraphe — il faut ramener la phrase au temps du récit.",
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Un nom qui change",
      donnees: "« Ton héros s'appelle Malo au début et Marlo à la fin. »",
      schema: nomQuiChange,
      question: "Qu'est-ce que c'est ?",
      solution:
        "UNE RUPTURE DE COHÉRENCE. Ce n'est ni un effet de style, ni un synonyme, ni une faute d'orthographe sans importance : le lecteur ne sait plus de qui on parle, et il doit décider seul s'il s'agit du même personnage. La chaine est cassée.",
      micros: ["6e_ecrit_coherence"],
    },
    {
      titre: "Un dialogue",
      donnees: "« Dans un dialogue écrit, une nouvelle réplique se marque par… »",
      schema: codeDuDialogue,
      question: "Par quoi ?",
      solution:
        "UN TIRET ET UN RETOUR À LA LIGNE. Ni une parenthèse, ni un astérisque, ni des points de suspension. C'est un code de l'écrit : il ne se discute pas et ne s'invente pas, parce que c'est le signal que tout lecteur attend à cet endroit.",
      micros: ["6e_ecrit_codes"],
    },
    {
      titre: "Le défi",
      donnees: "« Dans un récit, pour dire qu'une action se passe APRÈS une autre, on écrit… »",
      schema: successionOuSimultaneite,
      question: "Quel connecteur ?",
      solution:
        "« PLUS TARD ». « En même temps », « au même moment » et « pendant ce temps » disent tous les trois la SIMULTANÉITÉ — les actions se superposent au lieu de se suivre. Choisir le mauvais connecteur ne fait pas une faute de langue : cela raconte une autre scène.",
      micros: ["6e_ecrit_produire_defi"],
    },
  ],
  pieges: [
    "Relire phrase par phrase pour trouver une incohérence : elle est ENTRE les phrases.",
    "Prendre un nom qui change pour une coquille : c'est la chaine du personnage qui casse.",
    "Glisser au présent dans un récit au passé : le système des temps tient le texte.",
    "Changer de lieu sans le dire : le lecteur ne voit pas ce que tu imagines.",
    "Ouvrir un paragraphe quand la page est pleine : c'est une unité de sens, pas de place.",
    "Marquer un dialogue autrement qu'avec un tiret et un retour à la ligne.",
    "Confondre « plus tard » et « en même temps » : ce n'est pas la même scène.",
  ],
  aRetenir: [
    "La cohérence, c'est ce qui ne doit pas changer : personnages, temps, lieu, narrateur.",
    "Un texte incohérent peut être juste phrase par phrase — la casse est entre elles.",
    "Le lecteur ne voit pas ce que tu imagines : les changements se signalent.",
    "Un paragraphe s'ouvre sur une idée neuve, pas sur une page pleine.",
    "Un tiret et un retour à la ligne pour chaque nouvelle réplique.",
  ],
  entrainement: [
    {
      question: "« Quand commence-t-on un nouveau paragraphe ? »",
      correction: "Quand on passe à une nouvelle idée.",
      micros: ["6e_ecrit_codes"],
    },
    {
      question: "« Quel connecteur ouvre le mieux la fin d'un récit ? »",
      correction: "« Enfin » : il referme la série.",
      micros: ["6e_ecrit_produire_defi"],
    },
    {
      question: "Ton texte raconte à la 1re personne, puis dit « il pensa ». Qu'est-ce que c'est ?",
      correction: "Un changement de point de vue non justifié.",
      micros: ["6e_ecrit_coherence"],
    },
    {
      question: "« Ton récit passe d'un lieu à un autre sans prévenir. » Que faut-il ajouter ?",
      correction: "Une phrase ou un connecteur de lieu.",
      micros: ["6e_ecrit_coherence"],
    },
    {
      question: "« Une description cohérente suit… » quoi ?",
      correction: "Un ordre : de loin en près, de haut en bas.",
      micros: ["6e_ecrit_invention"],
    },
    {
      question: "Dans un texte explicatif, à quoi sert le connecteur « parce que » ?",
      correction: "À donner la cause.",
      micros: ["6e_ecrit_reflexion"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesEcritureProduire6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Un texte qui se tient - 6e",
    section: {
      type: "objectif",
      phrase: "La casse est entre les phrases",
      sousPhrase:
        "Un texte incohérent n'est pas mal écrit : chaque phrase peut être juste.",
      encadre: {
        titre: "L'idée",
        texte: "C'est pour cela que tu ne trouves rien en relisant phrase par phrase.",
      },
    },
  },
  {
    titre: "Ce qui ne doit pas changer",
    badge: "Un texte qui se tient - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les personnages", texte: "Malo ne devient pas Marlo à la fin." },
        { titre: "Le temps", texte: "Le passé simple ne glisse pas au présent." },
        { titre: "Le lieu", texte: "Et s'il change, on le signale." },
        { titre: "Qui raconte", texte: "« Je » ne devient pas « il pensa »." },
      ],
    },
    schema: grilleCeQuiNeChangePas,
  },
  {
    titre: "Le lecteur ne voit pas ce que tu imagines",
    badge: "Un texte qui se tient - 6e",
    section: {
      type: "etapes",
      etapes: [
        "Tu as la scène en tête. Lui n'a que la page.",
        "UN CHANGEMENT DE LIEU se dit — une phrase suffit.",
        "UN CHANGEMENT DE LOCUTEUR se marque — un tiret suffit.",
        "UNE IDÉE NEUVE ouvre un paragraphe — pas la page pleine.",
      ],
    },
    schema: changementDeLieu,
  },
  {
    titre: "Les codes de l'écrit",
    badge: "Un texte qui se tient - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Une préférence de présentation, ni une politesse d'école.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Les seuls signaux dont dispose quelqu'un qui n'a pas ta scène en tête.",
      },
    },
    schema: codeDuDialogue,
  },
  {
    titre: "Se suivre, ou se superposer",
    badge: "Un texte qui se tient - 6e",
    section: {
      type: "etapes",
      etapes: [
        "« Plus tard », « ensuite » : les actions SE SUIVENT.",
        "« En même temps », « pendant ce temps » : elles SE SUPERPOSENT.",
        "« D'abord, ensuite, enfin » ordonnent les étapes.",
        "Se tromper de connecteur ne fait pas une faute : cela raconte autre chose.",
      ],
    },
    schema: connecteursDuRecit,
  },
  {
    titre: "À vous",
    badge: "Un texte qui se tient - 6e",
    section: {
      type: "exercice",
      enonce: "Ton professeur écrit en marge : « on ne suit pas ».",
      question: "Que cherches-tu, et comment ?",
      indice: "La remarque ne vise aucune phrase en particulier.",
      correction:
        "UN CHANGEMENT NON SIGNALÉ. Suis un élément à la fois du début à la fin : les temps, puis les noms, puis les lieux, puis qui raconte. Séparément, la rupture apparait ; ensemble, aucune.",
    },
    schema: casseEntreLesPhrases,
  },
];
