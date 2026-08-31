// ─── Fiche de cours : évaluer son écrit et savoir le faire évoluer (5e) ───────
// LA VINGT-HUITIÈME ET DERNIÈRE FICHE DE LA 5e. Elle FERME LE DOMAINE DE
// L'ÉCRITURE, et avec lui LA CLASSE ENTIÈRE : les vingt-huit notions de 5e ont
// désormais leur fiche.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Évaluer son écrit et savoir le faire évoluer » (BO5EFRE).
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : L'ORDRE DES RELECTURES EST L'INVERSE DE
// CELUI QU'ON FAIT. Un élève commence par l'orthographe — c'est le plus visible
// et le moins couteux — et n'arrive jamais au plan. Or la banque le dit sans
// détour : « tu t'occupes d'abord de ce qui est DIT, l'orthographe vient en
// dernier ». Corriger l'accord d'un paragraphe qu'on va supprimer est du travail
// jeté. L'ordre juste — la consigne, le plan, les phrases, l'orthographe — se
// dessine sur un axe, et il suffit de le voir une fois.
//
// ⭐ L'AUTRE PHRASE QUI PORTE LA NOTION : RECOPIER N'EST PAS RÉVISER. Le BO
// n'écrit pas « faire un brouillon » mais « UTILISER le brouillon comme un écrit
// à retravailler ». Ce n'est pas une copie sale à mettre au propre : c'est un
// état du texte sur lequel on AGIT. Un élève qui recopie sans rien changer n'a
// pas encore commencé à travailler, et il croit avoir fini.
//
// ⭐⭐ `figure_libre` SERT DE PAGE, ET C'EST SON MEILLEUR EMPLOI JUSQU'ICI : une
// grille de cases dessine littéralement une copie. Un bloc plein contre des
// blocs séparés par du blanc montre « aller à la ligne » sans un mot ; et une
// ligne remplie sur deux montre le brouillon aéré exprès pour qu'on puisse
// corriger DEDANS. Rien d'autre ne dessine cela.
//
// ⛔⛔ ET LA BASCULE DE LA RÈGLE DE COULEUR SE JOUE ICI, DANS UNE FICHE QUI N'EST
// PAS UNE FICHE DE LANGUE. Le dessin `accordEloigne` porte une étiquette « le
// sujet » — et c'en est un, vraiment : la relecture d'accord EST un geste
// grammatical. La couleur DOIT donc s'appliquer, et l'arc est de type `accord`.
// La règle n'est pas « gris dans les fiches d'écriture » : elle est « gris quand
// ce n'est pas une fonction ». Vérifié au rendu, et non au jugement.
//
// ⛔ SÉPARATION DES DEUX MICROS : `5e_ecrit_reviser` (socle) tient les CINQ
// RELECTURES fondatrices — la ponctuation, l'accord d'un sujet éloigné, les
// répétitions, l'unité des temps, l'aller à la ligne. `5e_ecrit_brouillon`
// (nouveau BO) tient le brouillon comme OUTIL — l'aérer, y essayer deux
// ouvertures, numéroter au lieu de réécrire, demander à un camarade ce qu'il n'a
// pas compris. Aucune des deux ne redit l'autre.
//
// Alignée sur la table REVISER de
// lib/tutor-v4/questionBank/5e/francais/socle-ecriture-oral.bank.ts, et sur la
// table BROUILLON de
// lib/tutor-v4/questionBank/5e/francais/ecriture-oral.bank.ts.
//
// Micro-compétences couvertes (les 2 de la notion `ecriture_reviser`) :
// - 5e_ecrit_reviser   → figure, propriétés 1 à 5, formule, méthodes 1 et 2,
//                        usages 1 et 2, exemples 1 à 3
// - 5e_ecrit_brouillon → propriétés 6 à 9, méthodes 3 et 4, usages 3 et 4,
//                        exemples 4 à 6

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
  FigureLibreCanvasGridCell,
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

/** L'ordre des relectures. ⚠️ `showValues: false` — ce sont des étapes, pas des
 *  nombres ; et le canvas décale les étiquettes en hauteur, elles ne se marchent
 *  pas dessus. */
function axe(points: NumberLineCanvasPoint[]) {
  return (
    <CanvasRenderer
      figure={{
        kind: "number_line",
        min: 0,
        max: 5,
        step: 1,
        points,
        size: { width: 235, height: 78 },
        display: { showTicks: false, showValues: false, showZero: false },
      }}
    />
  );
}

/** ⭐ LA COPIE ELLE-MÊME. Une grille de cases = une page, et ce qui l'occupe est
 *  le texte. C'est le seul canvas qui dessine un bloc de texte. */
function page(opts: { rows: number; cols: number; texte: FigureLibreCanvasGridCell[]; legende?: string }) {
  return (
    <figure className="grid gap-2">
      <CanvasRenderer
        figure={{
          kind: "figure_libre",
          grid: { rows: opts.rows, cols: opts.cols, filledCells: opts.texte },
          display: { showGrid: true, showFilled: true, showPerimeter: false },
          size: { width: 190, height: 150 },
        }}
      />
      {opts.legende ? (
        <figcaption className="text-xs leading-snug text-slate-600">{opts.legende}</figcaption>
      ) : null}
    </figure>
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

// ─── Ce qui se dessine quand on relit ─────────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : l'ordre juste, et il surprend.
const ordreDesRelectures = axe([
  { value: 1, label: "la consigne" },
  { value: 2, label: "le plan" },
  { value: 3, label: "les phrases" },
  { value: 4, label: "l'orthographe" },
]);

const recopierNestPasReviser = phrase({
  mots: [
    { texte: "recopier", barre: true },
    { texte: "retravailler", focus: true },
  ],
  legende: "Un brouillon recopié sans rien changer n'a pas été travaillé du tout.",
});

// ── LES CINQ RELECTURES, UNE PAR UNE.
const ponctuationAbsente = phrase({
  mots: [
    { texte: "il ouvrit la porte" },
    { texte: "le vent entra" },
    { texte: "il eut froid" },
  ],
  legende: "Ni majuscule ni point : trois phrases collées, et le lecteur s'y perd.",
});

// ⛔ ICI L'ÉTIQUETTE EST UNE VRAIE FONCTION : la couleur doit s'appliquer, et
// l'arc est de type `accord`. C'est la bascule de la règle, dans une fiche qui
// n'est pas une fiche de langue.
const accordEloigne = phrase({
  mots: [
    { texte: "Les chevaux" },
    { texte: "du seigneur" },
    { texte: "galopait" },
  ],
  groupes: [{ mots: [0, 1], label: "le sujet" }],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "Le verbe s'accorde avec « les chevaux », jamais avec « le seigneur ».",
});

const nomRepete = phrase({
  mots: [
    { texte: "Le roi", focus: true },
    { texte: "appela" },
    { texte: "Le roi", focus: true },
    { texte: "attendit" },
  ],
  legende: "Entoure le mot répété : on ne voit les répétitions qu'en les marquant.",
});

const tempsQuiGlisse = phrase({
  mots: [
    { texte: "ouvrit" },
    { texte: "entra" },
    { texte: "regarde", barre: true },
  ],
  legende: "Deux passés, un présent : le récit a glissé sans que tu l'entendes.",
});

// ⭐ LA PAGE, DESSINÉE. Un seul bloc contre des blocs séparés.
const pageEnUnBloc = page({
  rows: 6,
  cols: 5,
  texte: [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
    [5, 0], [5, 1], [5, 2],
  ],
  legende: "UN SEUL BLOC : le départ et l'arrivée sont dans le même pavé de texte.",
});

const pageAeree = page({
  rows: 6,
  cols: 5,
  texte: [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [1, 0], [1, 1], [1, 2],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4],
    [4, 0], [4, 1], [4, 2], [4, 3],
    [5, 0], [5, 1],
  ],
  legende: "DEUX MOMENTS, DEUX BLOCS. Le blanc dit au lecteur que la scène change.",
});

// ⭐⭐ LE BROUILLON AÉRÉ EXPRÈS : une ligne sur deux, pour corriger DEDANS.
const brouillonAere = page({
  rows: 6,
  cols: 5,
  texte: [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [2, 0], [2, 1], [2, 2], [2, 3],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
  ],
  legende: "Une ligne sur deux dès le départ : la ligne vide est la place des corrections.",
});

const numeroterPlutotQueReecrire = phrase({
  mots: [
    { texte: "le 3e", focus: true },
    { texte: "le 1er" },
    { texte: "le 2e" },
  ],
  legende: "Numérote dans le nouvel ordre au lieu de tout recopier : c'est le même travail.",
});

const deuxOuvertures = phrase({
  mots: [
    { texte: "la première" },
    { texte: "la seconde" },
  ],
  liens: [{ de: 1, vers: 0, label: "sans effacer", type: "question" }],
  legende: "Écris la seconde en dessous, et choisis après : on ne compare pas de mémoire.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureReviser5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "ecriture-reviser",
  titre: `Relire, corriger et enrichir son écrit en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu relis presque toujours dans le mauvais sens : tu commences par l'orthographe, et tu n'arrives jamais au plan. C'est l'inverse qu'il faut faire. Corriger l'accord d'un paragraphe que tu vas supprimer, c'est du travail jeté. La consigne d'abord, le plan ensuite, les phrases après — et l'orthographe en dernier, quand plus rien ne bougera.",
  identite: [
    { label: "Mots clés", valeur: "Relire, accorder, aérer, retravailler" },
    { label: "Le secret", valeur: "L'orthographe se corrige en DERNIER" },
    { label: "Outil", valeur: "Une relecture, une seule chose à la fois" },
  ],
  definition: {
    texte:
      "Réviser un écrit, ce n'est pas le relire : c'est le relire PLUSIEURS FOIS, et chercher une seule chose à chaque passage. Les CINQ RELECTURES fondatrices de la 5e sont la ponctuation — des majuscules et des points, sans quoi les phrases se collent —, l'accord du verbe avec un sujet qui en est éloigné, les noms répétés qu'un pronom ou un autre mot remplace, l'unité des temps — un récit qui glisse du passé au présent —, et l'aller à la ligne, qui sépare deux moments. Aucune ne se fait en même temps qu'une autre. Et LE BROUILLON n'est pas une copie sale : le programme demande de l'UTILISER comme un écrit à retravailler. On l'aère d'une ligne sur deux pour pouvoir corriger dedans, on y essaie deux ouvertures sans effacer la première, on numérote des paragraphes au lieu de tout réécrire, on entoure les répétitions pour les voir, et l'on demande à celui qui relit ce qu'il n'a pas compris — jamais s'il a aimé.",
  },
  figure: {
    schema: pile(ordreDesRelectures, recopierNestPasReviser),
    legende:
      "L'axe donne l'ordre, et il n'est pas celui qu'on suit. On commence par ce qui est DIT — la consigne a-t-elle été respectée ? le plan tient-il ? — puis on descend vers les phrases, et l'orthographe passe en dernier, quand plus rien ne bougera. Et le mot barré rappelle l'autre règle : recopier au propre sans rien changer n'est pas réviser. C'est même le seul cas où l'on croit avoir fini alors qu'on n'a pas commencé.",
  },
  proprietes: [
    {
      titre: "Une relecture, une seule chose",
      texte:
        "Chercher les accords ET les répétitions ET les points en même temps revient à n'en trouver aucun. Cinq passages courts valent mieux qu'un long.",
      schema: ordreDesRelectures,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Les points d'abord, parce qu'ils portent tout",
      texte:
        "« il ouvrit la porte le vent entra il eut froid » : trois phrases collées. Sans majuscules ni points, aucune autre correction ne tient.",
      schema: ponctuationAbsente,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Le verbe s'accorde avec un sujet parfois lointain",
      texte:
        "« Les chevaux du seigneur galopait » : le mot juste avant le verbe n'est pas le sujet. Remonte jusqu'au vrai, même s'il est loin.",
      schema: accordEloigne,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "On ne voit une répétition qu'en la marquant",
      texte:
        "Entoure le mot aux trois endroits où il revient. Tant qu'il n'est pas entouré, l'œil le lit sans le compter.",
      schema: nomRepete,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Un récit tient un seul système de temps",
      texte:
        "« Il ouvrit, entra, et il regarde autour de lui. » Le glissement ne s'entend pas en écrivant : il se voit en relisant pour cela seul.",
      schema: pile(tempsQuiGlisse, pageEnUnBloc),
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Deux moments, deux blocs",
      texte:
        "Le départ et l'arrivée dans le même pavé de texte : le lecteur ne voit pas que la scène a changé. Un blanc suffit à le lui dire.",
      schema: pageAeree,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Recopier n'est pas réviser",
      texte:
        "Le programme ne demande pas de FAIRE un brouillon, mais de l'UTILISER : un état du texte sur lequel on agit, pas une copie sale.",
      schema: recopierNestPasReviser,
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Aère ton brouillon dès la première ligne",
      texte:
        "Une ligne sur deux. La ligne vide n'est pas perdue : c'est la place où les corrections tiendront, au lieu de s'entasser en marge.",
      schema: brouillonAere,
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Numéroter plutôt que réécrire",
      texte:
        "Le troisième paragraphe devrait être le premier ? Numérote-les dans le nouvel ordre. Tout recopier fait perdre une demi-heure pour rien.",
      schema: numeroterPlutotQueReecrire,
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Essaie sans effacer",
      texte:
        "Une autre ouverture t'intéresse ? Écris-la en dessous de la première. On ne compare pas de mémoire, et la première est parfois la bonne.",
      schema: deuxOuvertures,
      micros: ["5e_ecrit_brouillon"],
    },
  ],
  reel: {
    texte:
      "Personne ne relit un message important une seule fois. Tu le relis pour le ton, puis pour vérifier que tu n'as pas oublié l'essentiel, puis parfois une dernière fois pour l'orthographe juste avant d'envoyer — et tu fais donc exactement ce que demande le programme, dans le bon ordre. Ce qui change à l'école, c'est qu'on te met un temps limité et que la panique renverse l'ordre : on corrige ce qui saute aux yeux. Et le brouillon aéré, tu le connais aussi : c'est le brouillon de maths où tu laisses de la place entre les lignes parce que tu sais que tu vas revenir. Personne ne fait cela en français, alors que c'est le même geste et le même bénéfice.",
  },
  historique: {
    texte:
      "Avant l'ordinateur, corriger un texte long posait un problème matériel : il n'y avait pas de place. Les manuscrits médiévaux résolvaient cela par des signes de renvoi — une petite marque dans le texte, la même en marge, et l'ajout se lisait au bon endroit sans qu'on ait rien recopié. C'est l'ancêtre direct du paragraphe numéroté. Marcel Proust, lui, a poussé le procédé jusqu'à l'absurde : ses ajouts étaient écrits sur des bandes de papier qu'il collait bout à bout à son manuscrit, et certaines de ces « paperoles » dépliées atteignaient plus d'un mètre. Personne n'a jamais recopié un texte entier pour y changer trois phrases — sauf les élèves, à qui l'on n'a pas dit qu'on pouvait faire autrement.",
  },
  formule: {
    contexte: "La question qui remet la relecture à l'endroit.",
    expression: "est-ce que ce paragraphe va rester ?",
    legende:
      "Si la réponse est non, ne corrige pas son orthographe : tu vas le supprimer. C'est pour cela que l'ordre compte — la consigne, le plan, les phrases, et l'orthographe en dernier. Un accord corrigé dans un paragraphe qu'on efface est la seule chose qu'on puisse rater deux fois.",
    schema: ordreDesRelectures,
  },
  methode: [
    {
      titre: "Relire cinq fois, une chose par fois",
      texte:
        "Les points. Les accords. Les répétitions. Les temps. Les retours à la ligne. Cinq passages rapides trouvent plus qu'un passage lent.",
      schema: ordreDesRelectures,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Remonter du verbe au vrai sujet",
      texte:
        "Pose le doigt sur le verbe, remonte jusqu'à ce qui fait l'action. Le mot juste avant est souvent un complément qui trompe.",
      schema: accordEloigne,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Reprendre la consigne avant tout détail",
      texte:
        "Point par point. Un dialogue demandé et absent coute bien plus qu'une faute d'accord, et se répare avant elle.",
      schema: recopierNestPasReviser,
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Faire relire, et poser la bonne question",
      texte:
        "Demande à ton camarade ce qu'il n'a PAS COMPRIS, jamais s'il a aimé. « J'aime bien » ne se corrige pas ; « je n'ai pas vu où c'était » si.",
      schema: brouillonAere,
      micros: ["5e_ecrit_brouillon"],
    },
  ],
  usages: [
    {
      titre: "Pour ne plus perdre les mêmes points",
      detail:
        "Trois de ces cinq relectures rapportent presque tous les points d'orthographe d'un devoir : les accords, les temps, la ponctuation.",
      schema: accordEloigne,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Pour rendre une copie lisible",
      detail:
        "Va à la ligne à chaque changement de moment ou de personne qui parle. Cela ne s'apprend pas : cela se décide en relisant une fois pour cela.",
      schema: pageAeree,
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Pour retravailler sans tout refaire",
      detail:
        "Numérote, entoure, souligne, note dans la marge. Un brouillon couvert de marques est un brouillon qui a servi.",
      schema: numeroterPlutotQueReecrire,
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Pour tenir une longueur imposée",
      detail:
        "Ton texte fait le double ? Barre ce qui ne fait pas avancer, en commençant par les répétitions. On coupe, on ne réécrit pas.",
      schema: nomRepete,
      micros: ["5e_ecrit_brouillon"],
    },
  ],
  exemples: [
    {
      titre: "Un accord lointain",
      donnees: "« La troupe des marchands arrivaient enfin en vue. »",
      schema: accordEloigne,
      question: "Que faut-il corriger ?",
      solution:
        "L'ACCORD DU VERBE AVEC SON SUJET : c'est LA TROUPE qui arrive, donc « arrivait ». « Des marchands » est juste avant le verbe, au pluriel, et c'est ce qui trompe l'oreille. Remonte toujours jusqu'à ce qui fait l'action, même si c'est loin.",
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Un temps qui glisse",
      donnees: "« Elle courut, sauta le fossé, et arrive de l'autre côté. »",
      schema: tempsQuiGlisse,
      question: "Que faut-il corriger ?",
      solution:
        "TENIR LE MÊME TEMPS : « arriva ». Deux passés simples puis un présent — le glissement ne s'entend pas en écrivant, parce qu'on pense la scène au présent tout en la racontant au passé. Il ne se voit qu'en relisant pour cela seul.",
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Une copie en un bloc",
      donnees: "« Ton devoir raconte le départ puis l'arrivée en un seul bloc. »",
      schema: pageAeree,
      question: "Que faut-il corriger ?",
      solution:
        "ALLER À LA LIGNE : deux moments ne tiennent pas dans un seul bloc de texte. Le blanc n'est pas une décoration — c'est un signe de lecture, qui dit « la scène change ». Sans lui, le lecteur croit que tout se passe au même endroit.",
      micros: ["5e_ecrit_reviser"],
    },
    {
      titre: "Un brouillon recopié",
      donnees: "« Tu as fini ton brouillon et tu le recopies au propre sans rien changer. »",
      schema: recopierNestPasReviser,
      question: "Où en es-tu ?",
      solution:
        "TU N'AS PAS ENCORE TRAVAILLÉ : recopier n'est pas réviser. C'est le piège le plus coûteux de la 5e, parce qu'il donne le sentiment d'avoir fini — une heure passée, une belle copie, et pas une seule décision prise sur le texte.",
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Un ordre à changer",
      donnees: "« Tu t'aperçois que le troisième paragraphe devrait être le premier. »",
      schema: numeroterPlutotQueReecrire,
      question: "Que fais-tu ?",
      solution:
        "TU LES NUMÉROTES DANS LE NOUVEL ORDRE plutôt que de tout réécrire. Le correcteur lit les numéros, et toi tu gardes ton temps pour ce qui compte. Tout recopier pour déplacer un bloc est le geste le plus coûteux et le moins utile d'un devoir.",
      micros: ["5e_ecrit_brouillon"],
    },
    {
      titre: "Une relecture par un camarade",
      donnees: "« Un camarade relit ton brouillon. »",
      schema: brouillonAere,
      question: "Que lui demandes-tu ?",
      solution:
        "CE QU'IL N'A PAS COMPRIS, pas s'il a aimé. « C'est bien » ne se corrige pas ; « je n'ai pas su qui parlait » désigne une ligne précise. La bonne question à un relecteur n'appelle jamais un jugement — elle appelle un endroit.",
      micros: ["5e_ecrit_brouillon"],
    },
  ],
  pieges: [
    "Commencer la relecture par l'orthographe : c'est la dernière, pas la première.",
    "Chercher plusieurs choses à la fois : on n'en trouve alors aucune.",
    "Accorder le verbe avec le mot juste avant lui : ce n'est pas toujours le sujet.",
    "Croire qu'on voit ses répétitions en lisant : on ne les voit qu'en les entourant.",
    "Recopier son brouillon au propre sans rien changer : c'est croire avoir fini avant d'avoir commencé.",
    "Tout réécrire pour déplacer un paragraphe : un numéro suffit.",
    "Demander à un relecteur s'il a aimé : demande-lui ce qu'il n'a pas compris.",
  ],
  aRetenir: [
    "L'ordre : la consigne, le plan, les phrases, et l'orthographe EN DERNIER.",
    "Une relecture, une seule chose cherchée à la fois.",
    "Le verbe s'accorde avec son sujet, même quand celui-ci est loin.",
    "Aère ton brouillon d'une ligne sur deux : la ligne vide sert aux corrections.",
    "Recopier n'est pas réviser — le brouillon est un écrit sur lequel on agit.",
  ],
  entrainement: [
    {
      question: "« la nuit tombait personne ne venait il attendait encore » Que corriges-tu ?",
      correction: "Les majuscules et les points : il n'y en a aucun.",
      micros: ["5e_ecrit_reviser"],
    },
    {
      question: "« Les cris de la foule couvrait la voix du héraut. » Que corriges-tu ?",
      correction: "L'accord du verbe : ce sont LES CRIS qui couvraient.",
      micros: ["5e_ecrit_reviser"],
    },
    {
      question: "« La forêt était sombre. La forêt sentait la forêt mouillée. » Que corriges-tu ?",
      correction: "Le nom répété : remplace-le par un pronom ou par un autre mot.",
      micros: ["5e_ecrit_reviser"],
    },
    {
      question: "« Tu corriges l'orthographe alors que le plan n'est pas arrêté. » Que fais-tu ?",
      correction: "Tu t'occupes d'abord de ce qui est dit : l'orthographe vient en dernier.",
      micros: ["5e_ecrit_brouillon"],
    },
    {
      question: "« Tu as une idée bien meilleure au milieu de la rédaction. » Que fais-tu ?",
      correction: "Tu la notes dans la marge et tu finis ta phrase avant de tout changer.",
      micros: ["5e_ecrit_brouillon"],
    },
    {
      question: "« La consigne demandait un dialogue et tu n'en as pas mis. » Que fais-tu ?",
      correction: "Tu reprends la consigne point par point avant toute correction de détail.",
      micros: ["5e_ecrit_brouillon"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesEcritureReviser5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Relire et corriger - 5e",
    section: {
      type: "objectif",
      phrase: "L'orthographe se corrige en DERNIER",
      sousPhrase:
        "Tu relis dans le mauvais sens : tu commences par ce qui saute aux yeux, et tu n'arrives jamais au plan.",
      encadre: {
        titre: "L'idée",
        texte: "Corriger l'accord d'un paragraphe que tu vas supprimer, c'est du travail jeté.",
      },
    },
  },
  {
    titre: "L'ordre des relectures",
    badge: "Relire et corriger - 5e",
    section: {
      type: "etapes",
      etapes: [
        "LA CONSIGNE : point par point. Un dialogue absent coute plus qu'une faute.",
        "LE PLAN : l'ordre des paragraphes tient-il ?",
        "LES PHRASES : les points, les répétitions, les temps.",
        "L'ORTHOGRAPHE, en dernier, quand plus rien ne bougera.",
      ],
    },
    schema: ordreDesRelectures,
  },
  {
    titre: "Les cinq relectures",
    badge: "Relire et corriger - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Les points", texte: "Sans majuscules, les phrases se collent." },
        { titre: "Les accords", texte: "Le sujet n'est pas toujours le mot d'avant." },
        { titre: "Les répétitions", texte: "Entoure-les : sinon l'œil ne les compte pas." },
        { titre: "Les temps", texte: "Un récit tient un seul système, du début à la fin." },
      ],
    },
    schema: accordEloigne,
  },
  {
    titre: "Recopier n'est pas réviser",
    badge: "Relire et corriger - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Le brouillon-copie",
        contenu: "On le recopie au propre sans rien changer. Une heure passée, zéro décision.",
      },
      droite: {
        titre: "Le brouillon-outil",
        contenu: "Aéré d'une ligne sur deux, entouré, numéroté. Il a servi.",
      },
    },
    schema: brouillonAere,
  },
  {
    titre: "Deux moments, deux blocs",
    badge: "Relire et corriger - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Le blanc n'est pas une décoration : c'est un signe de lecture.",
        "Il dit au lecteur que la scène change, ou que quelqu'un d'autre parle.",
        "Un devoir en un seul pavé se lit comme une seule scène.",
        "Et cela se décide en relisant une fois pour cela seul.",
      ],
    },
    schema: pageAeree,
  },
  {
    titre: "À vous",
    badge: "Relire et corriger - 5e",
    section: {
      type: "exercice",
      enonce: "« Le chevalier prit le chemin. Le chevalier vit le pont du chevalier. »",
      question: "Que corriges-tu, et comment ?",
      indice: "Compte les fois où le même mot revient.",
      correction:
        "LE NOM RÉPÉTÉ. « Il prit le chemin et vit le pont qui lui barrait la route. » Un pronom, un autre mot — mais d'abord, entoure les trois : c'est en les marquant qu'on les voit.",
    },
    schema: nomRepete,
  },
];
