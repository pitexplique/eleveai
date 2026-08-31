// ─── Fiche de cours : produire des écrits variés et cohérents (CM2) ───────────
// DIXIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». ⛔ MÊME PROGRAMME QUE
// LA 6e — la séparation se fait sur les MICROS.
//
// ⛔⛔ ET LE RECOUVREMENT EST ICI TRÈS SERRÉ : les deux classes ont une micro
// `ecrit_coherence`, et toutes deux tirent du pool ECRIT_COHERENCE. Comparaison
// faite micro par micro :
//
//   | 6e (`francais-6e-ecriture-produire`) | CM2 (ici) |
//   |---|---|
//   | ce qui CHANGE en route : temps, noms, lieu, narrateur | PLUSIEURS paragraphes : où couper, comment tenir |
//   | invention et réflexion | QUATRE SORTES DE TEXTES : récit, description, dialogue, explicatif |
//   | les CODES de l'écrit (tiret, paragraphe, majuscule) | la MARQUE D'ÉCRITURE propre à chaque sorte |
//
// ⭐⭐ LA DÉCOUVERTE QUI SÉPARE LES DEUX, ET QUI EST DANS LE PLURIEL DU MICRO :
// « CONSTRUIRE PLUSIEURS PARAGRAPHES COHÉRENTS ». Le CM2 est l'année où un texte
// CESSE D'ÊTRE UN PARAGRAPHE. Et dès qu'il y en a plusieurs, deux questions
// apparaissent qui n'existaient pas avant : OÙ COUPER, et COMMENT LES TENIR
// ENSEMBLE. Le paragraphe et la cohérence ne sont donc pas deux sujets : ce sont
// les deux faces du même seuil, et c'est pourquoi le programme les met dans la
// même compétence.
//
// ⭐ ET LA SECONDE IDÉE, PROPRE AU CM2 : CHAQUE SORTE DE TEXTE A SA MARQUE
// D'ÉCRITURE. Le dialogue a ses tirets et ses guillemets, le récit ses
// connecteurs de temps, la description ses détails précis, l'explicatif ses
// connecteurs de cause. On ne « change pas de style » en passant de l'un à
// l'autre : ON CHANGE D'OUTIL, et l'outil est visible sur la page.
//
// ⛔ CE QUE CETTE FICHE NE REDIT PAS : les quatre ruptures de cohérence détaillées
// (un temps qui glisse, un nom qui change, un point de vue qui bascule) sont
// traitées dans `francais-6e-ecriture-produire`. Ici la cohérence est celle qui
// relie DES PARAGRAPHES, pas celle qui tient des phrases.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools ECRITURE et ECRIT_COHERENCE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm2_fr_fixed_ecrit_4` et `_5` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `ecriture_produire`) :
// - cm2_ecrit_paragraphe     → figure, propriétés 1 à 3, formule, méthode 1,
//                              usage 1, exemples 1 et 2
// - cm2_ecrit_varie          → propriétés 4 à 7, méthode 2, usage 2, exemples 3 et 4
// - cm2_ecrit_coherence      → propriétés 8 et 9, méthodes 3 et 4, usage 3, exemple 5
// - cm2_ecrit_produire_defi  → propriété 10, usage 4, exemple 6

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

/** Les quatre sortes de textes et leurs marques. ⚠️ Cellules courtes : à la
 *  largeur d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand un texte a plusieurs paragraphes ─────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : le seuil du CM2, et ses deux questions.
const deuxQuestionsDuSeuil = phrase({
  mots: [
    { texte: "où couper", focus: true },
    { texte: "comment tenir", focus: true },
  ],
  legende: "Dès qu'il y a plusieurs paragraphes, ces deux questions apparaissent.",
});

const uneIdeeUnParagraphe = phrase({
  mots: [
    { texte: "une idée neuve" },
    { texte: "on va à la ligne", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "alors", type: "question" }],
  legende: "C'est la seule règle de coupe — ni un titre, ni un point-virgule.",
});

const pasQuandLaPageEstPleine = phrase({
  mots: [
    { texte: "la page pleine", barre: true },
    { texte: "une idée neuve", focus: true },
  ],
  legende: "Le paragraphe est une unité de sens, jamais une unité de place.",
});

// ── LES QUATRE SORTES DE TEXTES, ET LEUR MARQUE.
const grilleQuatreSortes = grille({
  headers: ["La sorte", "Sa marque"],
  rows: [
    { values: ["le récit", "quand, puis"] },
    { values: ["la description", "des détails"] },
    { values: ["le dialogue", "tirets, guillemets"] },
    { values: ["l'explicatif", "parce que"] },
  ],
  caption: "On ne change pas de style : on change d'outil.",
});

const grilleQuatreSortesDialogue = grille({
  headers: ["La sorte", "Sa marque"],
  rows: [
    { values: ["le récit", "quand, puis"] },
    { values: ["la description", "des détails"] },
    { values: ["le dialogue", "tirets, guillemets"] },
    { values: ["l'explicatif", "parce que"] },
  ],
  highlight: { row: 2 },
  caption: "Les tirets et les guillemets montrent qui parle.",
});

const marqueVisible = phrase({
  mots: [
    { texte: "changer de style", barre: true },
    { texte: "changer d'outil", focus: true },
  ],
  legende: "Et l'outil se voit sur la page, avant même qu'on ait lu.",
});

const descriptionPrecise = phrase({
  mots: [
    { texte: "impressionnant", barre: true },
    { texte: "grand et noir", focus: true },
  ],
  legende: "Une description s'appuie sur des détails qui font voir.",
});

// ── LA COHÉRENCE ENTRE PARAGRAPHES.
const connecteursEntreParagraphes = phrase({
  mots: [
    { texte: "d'abord" },
    { texte: "ensuite" },
    { texte: "enfin", focus: true },
  ],
  legende: "Ils ne décorent pas : ils disent au lecteur où il en est.",
});

const paragraphesQuiSeTiennent = phrase({
  mots: [
    { texte: "trois blocs" },
    { texte: "un texte", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "font", type: "question" }],
  legende: "Trois paragraphes justes mais sans lien font trois textes, pas un.",
});

// ── LE DÉFI : écrire un texte varié qui tient.
const memeTexteDeuxSortes = phrase({
  mots: [
    { texte: "un récit" },
    { texte: "un dialogue", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "peut contenir", type: "question" }],
  legende: "Un même texte mêle souvent deux sortes — et chacune garde sa marque.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureProduireCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "ecriture-produire",
  titre: `Écrire un texte à plusieurs paragraphes en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Le CM2 est l'année où UN TEXTE CESSE D'ÊTRE UN PARAGRAPHE. Et dès qu'il y en a plusieurs, deux questions apparaissent qui ne se posaient pas avant : OÙ COUPER, et COMMENT LES TENIR ENSEMBLE. Ce ne sont pas deux sujets — ce sont les deux faces du même seuil, et c'est pour cela que le programme les met dans la même compétence.",
  identite: [
    { label: "Mots clés", valeur: "Paragraphe, récit, dialogue, connecteurs" },
    { label: "Le secret", valeur: "On change d'outil, pas de style" },
    { label: "Outil", valeur: "Est-ce une idée neuve ?" },
  ],
  definition: {
    texte:
      "CONSTRUIRE PLUSIEURS PARAGRAPHES demande d'abord de savoir OÙ COUPER : on va à la ligne QUAND ON CHANGE D'IDÉE — pas quand la page est pleine, pas tous les cinq mots, pas à chaque virgule. Le paragraphe est une unité de SENS. Il faut ensuite savoir LES TENIR ENSEMBLE : les CONNECTEURS — d'abord, ensuite, enfin, mais, parce que — ne décorent pas, ils disent au lecteur où il en est ; trois paragraphes justes mais sans lien font trois textes et non un seul. Le programme demande par ailleurs de produire QUATRE SORTES DE TEXTES, et chacune a SA MARQUE D'ÉCRITURE : le RÉCIT s'appuie sur des connecteurs de temps, la DESCRIPTION sur des détails précis qui font voir, le DIALOGUE sur des tirets et des guillemets qui montrent qui parle, le TEXTE EXPLICATIF sur des connecteurs de cause comme « parce que ». On ne change donc pas de style en passant de l'un à l'autre : ON CHANGE D'OUTIL — et l'outil se voit sur la page avant même qu'on ait lu.",
  },
  figure: {
    schema: pile(deuxQuestionsDuSeuil, uneIdeeUnParagraphe),
    legende:
      "Deux questions, et elles arrivent ensemble le jour où l'on écrit plus d'un paragraphe. Avant, aucune ne se posait : un texte d'un bloc n'a ni coupe ni liaison. C'est ce seuil que le CM2 franchit, et le programme range les deux dans la même compétence parce qu'elles sont inséparables — couper sans relier produit des morceaux, relier sans couper produit un pavé. En bas, la règle de coupe, et il n'y en a qu'une : une idée neuve, on va à la ligne.",
  },
  proprietes: [
    {
      titre: "On va à la ligne quand on change d'idée",
      texte:
        "C'est la seule règle. Ni ajouter un titre, ni mettre un point-virgule, ni continuer en changeant de connecteur : on va à la ligne.",
      schema: uneIdeeUnParagraphe,
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Jamais quand la page est pleine",
      texte:
        "Le paragraphe est une unité de sens, pas une unité de place. Et une page sans aucun retour à la ligne se lit comme une seule idée — longue.",
      schema: pasQuandLaPageEstPleine,
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Plusieurs paragraphes, deux questions neuves",
      texte:
        "Où couper, et comment tenir ensemble. Elles n'existaient pas tant qu'un texte tenait en un bloc — et elles arrivent le même jour.",
      schema: deuxQuestionsDuSeuil,
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Quatre sortes de textes",
      texte:
        "Le récit, la description, le dialogue, le texte explicatif. Le programme demande de produire les quatre — pas d'en préférer un.",
      schema: grilleQuatreSortes,
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Chacune a sa marque d'écriture",
      texte:
        "Et cette marque se VOIT sur la page avant qu'on ait lu : des tirets, des connecteurs de temps, des adjectifs, des « parce que ».",
      schema: marqueVisible,
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Le dialogue : tirets et guillemets",
      texte:
        "Ils montrent qui parle. Ni des chiffres, ni des titres, ni une seule très longue phrase — c'est un code, et le lecteur l'attend.",
      schema: grilleQuatreSortesDialogue,
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "La description : des détails, pas des mots d'intensité",
      texte:
        "« Un grand chien noir » fait voir. « Un chien vraiment impressionnant » est plus long et montre moins.",
      schema: descriptionPrecise,
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Les connecteurs disent où en est le lecteur",
      texte:
        "D'abord, ensuite, enfin. Ils ne décorent pas le texte : ils lui donnent une charpente qu'on entend en lisant.",
      schema: connecteursEntreParagraphes,
      micros: ["cm2_ecrit_coherence"],
    },
    {
      titre: "Trois blocs sans lien font trois textes",
      texte:
        "Chacun peut être juste, bien écrit, bien orthographié — et l'ensemble n'être pas un texte. C'est ce que le lien évite.",
      schema: paragraphesQuiSeTiennent,
      micros: ["cm2_ecrit_coherence"],
    },
    {
      titre: "Le défi : un texte mêle souvent deux sortes",
      texte:
        "Un récit contient un dialogue, une explication contient une description. Chacune garde alors sa marque — c'est ainsi qu'on s'y retrouve.",
      schema: memeTexteDeuxSortes,
      micros: ["cm2_ecrit_produire_defi"],
    },
  ],
  reel: {
    texte:
      "Tu vois la différence sans savoir la nommer, chaque fois que tu tombes sur un message d'un seul bloc : tu ne le lis pas, ou tu le lis mal. Ce n'est pas qu'il soit mal écrit — c'est qu'il ne montre pas où sont ses idées. Les paragraphes font ce travail-là, et ils le font avant la lecture : on voit en un coup d'œil combien il y en a. Pour les marques d'écriture, tu les reconnais aussi : dès que tu vois des tirets, tu sais que des gens parlent, sans avoir lu une réplique. C'est exactement ce que veut dire « changer d'outil » — le lecteur reçoit l'information par la forme, avant les mots.",
  },
  historique: {
    texte:
      "Le paragraphe est plus récent qu'on ne croit. Les manuscrits anciens s'écrivaient d'un seul tenant, et lorsqu'on a voulu signaler un changement de sujet, on a d'abord inventé un SIGNE : le pied-de-mouche, ce petit symbole en forme de P retourné que les copistes traçaient à l'encre rouge dans la marge, sans jamais aller à la ligne. Il valait ce que vaut aujourd'hui un retour à la ligne. Puis on a pris l'habitude de laisser un blanc à la place du signe — c'était plus rapide à écrire, et cela se voyait mieux. Autrement dit, le paragraphe moderne est un signe de ponctuation devenu invisible : ce qui marque le changement d'idée, ce n'est plus une marque, c'est un VIDE.",
  },
  formule: {
    contexte: "La question qui décide, à chaque ligne, s'il faut aller à la ligne.",
    expression: "est-ce une idée neuve ?",
    legende:
      "Si oui, va à la ligne — même si le paragraphe précédent était court. Si non, continue — même si la page est pleine. C'est la seule règle, et elle ne regarde jamais la place qui reste sur la feuille.",
    schema: uneIdeeUnParagraphe,
  },
  methode: [
    {
      titre: "Une idée par paragraphe, décidée au plan",
      texte:
        "Si ton plan a quatre mots, ton texte aura quatre paragraphes. La coupe est déjà faite avant d'écrire la première phrase.",
      schema: uneIdeeUnParagraphe,
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Choisir sa sorte avant de commencer",
      texte:
        "Récit, description, dialogue, explication ? La réponse te donne l'outil : les connecteurs de temps, les détails, les tirets, les « parce que ».",
      schema: grilleQuatreSortes,
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Relire en ne regardant que les débuts",
      texte:
        "Le premier mot de chaque paragraphe. S'ils s'enchainent, le texte tient. S'ils commencent tous pareil, il manque des connecteurs.",
      schema: connecteursEntreParagraphes,
      micros: ["cm2_ecrit_coherence"],
    },
    {
      titre: "Compter ses paragraphes à la fin",
      texte:
        "Un seul pour une page : tu n'as pas coupé. Un tous les deux lignes : tu as coupé au hasard. Trois ou quatre pour un devoir, c'est le bon ordre.",
      schema: pasQuandLaPageEstPleine,
      micros: ["cm2_ecrit_coherence"],
    },
  ],
  usages: [
    {
      titre: "Pour qu'un devoir se lise",
      detail:
        "Les paragraphes travaillent avant la lecture : le correcteur voit ta charpente d'un coup d'œil, et il la cherche.",
      schema: deuxQuestionsDuSeuil,
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Pour écrire un dialogue qu'on suit",
      detail:
        "Un tiret, un retour à la ligne, à chaque changement de personne. Sans cela, le lecteur compte les répliques pour savoir qui parle.",
      schema: grilleQuatreSortesDialogue,
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Pour expliquer quelque chose par écrit",
      detail:
        "Les « parce que » sont l'outil de l'explication. Un texte explicatif sans eux n'est qu'une liste de faits.",
      schema: marqueVisible,
      micros: ["cm2_ecrit_coherence"],
    },
    {
      titre: "Pour écrire un récit avec des paroles",
      detail:
        "Le récit garde ses connecteurs de temps, le dialogue prend ses tirets. Les deux marques cohabitent sans se gêner.",
      schema: memeTexteDeuxSortes,
      micros: ["cm2_ecrit_produire_defi"],
    },
  ],
  exemples: [
    {
      titre: "Où couper",
      donnees: "« Quand on change d'idée dans un texte, on… »",
      schema: uneIdeeUnParagraphe,
      question: "Que fait-on ?",
      solution:
        "ON VA À LA LIGNE POUR COMMENCER UN NOUVEAU PARAGRAPHE. Pas ajouter un titre — un devoir n'en a pas —, pas mettre un point-virgule, pas continuer à la suite en changeant de connecteur. Chaque nouvelle idée mérite un nouveau paragraphe, et cela se voit avant d'être lu.",
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Une page d'un seul bloc",
      donnees: "Ton devoir fait une page entière sans un seul retour à la ligne.",
      schema: pasQuandLaPageEstPleine,
      question: "Qu'est-ce que cela dit au lecteur ?",
      solution:
        "QU'IL N'Y A QU'UNE SEULE IDÉE — puisque tu n'as jamais changé de paragraphe. Ce n'est évidemment pas ce que tu voulais dire : mais le lecteur ne voit que ce que la page montre, et une page pleine sans coupe montre un bloc.",
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      titre: "Écrire un dialogue",
      donnees: "« Pour écrire un dialogue entre deux personnages, on utilise surtout… »",
      schema: grilleQuatreSortesDialogue,
      question: "Quoi ?",
      solution:
        "DES TIRETS ET DES GUILLEMETS. Ni des chiffres, ni des titres, ni une seule très longue phrase. Ce sont eux qui montrent QUI PARLE — et c'est un code : le lecteur l'attend à cet endroit, et il ne s'invente pas.",
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Une description",
      donnees: "« Quelle phrase est la plus précise pour une description ? »",
      schema: descriptionPrecise,
      question: "Laquelle ?",
      solution:
        "« UN GRAND CHIEN NOIR ABOYAIT DEVANT LA PORTE. » Deux détails qui font voir : la taille, la couleur. « Vraiment très impressionnant » est plus long et montre moins — les mots d'intensité remplacent le détail au lieu de le donner.",
      micros: ["cm2_ecrit_varie"],
    },
    {
      titre: "Trois paragraphes sans lien",
      donnees: "Tes trois paragraphes sont justes, mais rien ne les relie.",
      schema: paragraphesQuiSeTiennent,
      question: "Qu'est-ce qui manque ?",
      solution:
        "LES CONNECTEURS. Trois blocs corrects mais sans lien font trois textes, pas un — et le lecteur doit deviner l'ordre à ta place. « D'abord », « ensuite », « enfin » suffisent : ils ne décorent rien, ils disent où l'on en est.",
      micros: ["cm2_ecrit_coherence"],
    },
    {
      titre: "Le défi",
      donnees: "On te demande un récit qui contienne un dialogue.",
      schema: memeTexteDeuxSortes,
      question: "Comment fais-tu cohabiter les deux ?",
      solution:
        "CHACUNE GARDE SA MARQUE. Le récit continue avec ses connecteurs de temps ; le dialogue prend ses tirets et ses retours à la ligne. Les deux outils ne se gênent pas — c'est justement parce qu'ils sont visibles que le lecteur s'y retrouve.",
      micros: ["cm2_ecrit_produire_defi"],
    },
  ],
  pieges: [
    "Aller à la ligne quand la page est pleine : le paragraphe est une unité de sens.",
    "Écrire une page d'un seul bloc : le lecteur y voit une seule idée.",
    "Marquer un changement d'idée par un titre ou un point-virgule.",
    "Écrire un dialogue sans tirets : le lecteur compte les répliques pour suivre.",
    "Décrire avec des mots d'intensité : « impressionnant » montre moins que « grand et noir ».",
    "Enchainer trois paragraphes sans connecteur : cela fait trois textes.",
    "Croire qu'on change de style entre un récit et une explication : on change d'OUTIL.",
  ],
  aRetenir: [
    "Une idée neuve : on va à la ligne. C'est la seule règle de coupe.",
    "Plusieurs paragraphes posent deux questions : où couper, comment tenir.",
    "Quatre sortes de textes, et chacune a sa marque visible sur la page.",
    "Le dialogue se marque par des tirets et des guillemets.",
    "Les connecteurs ne décorent pas : ils disent au lecteur où il en est.",
  ],
  entrainement: [
    {
      question: "« Quand commence-t-on un nouveau paragraphe ? »",
      correction: "Quand on passe à une nouvelle idée.",
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      question: "Ton texte fait quatre lignes et trois paragraphes. Est-ce bon ?",
      correction: "Non : tu as coupé au hasard — un paragraphe porte une idée entière.",
      micros: ["cm2_ecrit_paragraphe"],
    },
    {
      question: "« Pour écrire un dialogue entre deux personnages, on utilise surtout… »",
      correction: "Des tirets et des guillemets.",
      micros: ["cm2_ecrit_varie"],
    },
    {
      question: "« Pour écrire une courte description, on choisit surtout… »",
      correction: "Des adjectifs et des détails précis.",
      micros: ["cm2_ecrit_varie"],
    },
    {
      question: "« Quel connecteur organise le mieux un récit ? »",
      correction: "D'abord, ensuite, enfin.",
      micros: ["cm2_ecrit_coherence"],
    },
    {
      question: "Un récit peut-il contenir un dialogue ?",
      correction: "Oui — et chacun garde sa marque : les connecteurs de temps, et les tirets.",
      micros: ["cm2_ecrit_produire_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesEcritureProduireCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Plusieurs paragraphes - CM2",
    section: {
      type: "objectif",
      phrase: "Un texte cesse d'être un paragraphe",
      sousPhrase:
        "Et dès qu'il y en a plusieurs, deux questions apparaissent : où couper, et comment tenir.",
      encadre: {
        titre: "L'idée",
        texte: "Couper sans relier fait des morceaux ; relier sans couper fait un pavé.",
      },
    },
  },
  {
    titre: "Où couper",
    badge: "Plusieurs paragraphes - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "La règle",
        contenu: "Une idée neuve : on va à la ligne. Même si le précédent était court.",
      },
      droite: {
        titre: "Jamais",
        contenu: "Quand la page est pleine, tous les cinq mots, ou à chaque virgule.",
      },
    },
    schema: uneIdeeUnParagraphe,
  },
  {
    titre: "Quatre sortes, quatre outils",
    badge: "Plusieurs paragraphes - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le récit", texte: "Des connecteurs de temps : d'abord, puis, enfin." },
        { titre: "La description", texte: "Des détails précis : grand, noir, devant la porte." },
        { titre: "Le dialogue", texte: "Des tirets et des guillemets : qui parle." },
        { titre: "L'explicatif", texte: "Des « parce que » : la cause." },
      ],
    },
    schema: grilleQuatreSortes,
  },
  {
    titre: "On change d'outil, pas de style",
    badge: "Plusieurs paragraphes - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Chaque sorte de texte a sa MARQUE D'ÉCRITURE.",
        "Et cette marque SE VOIT sur la page, avant d'avoir lu.",
        "Des tirets : quelqu'un parle. Des « parce que » : on explique.",
        "Le lecteur reçoit l'information par la forme, avant les mots.",
      ],
    },
    schema: marqueVisible,
  },
  {
    titre: "Tenir les paragraphes ensemble",
    badge: "Plusieurs paragraphes - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Trois blocs justes mais sans lien font TROIS TEXTES.",
        "Les connecteurs ne décorent pas : ils disent où l'on en est.",
        "D'abord, ensuite, enfin — trois mots suffisent.",
        "Relis en ne regardant que le premier mot de chaque paragraphe.",
      ],
    },
    schema: paragraphesQuiSeTiennent,
  },
  {
    titre: "À vous",
    badge: "Plusieurs paragraphes - CM2",
    section: {
      type: "exercice",
      enonce: "Ton devoir fait une page entière sans un seul retour à la ligne.",
      question: "Qu'est-ce que cela dit au lecteur ?",
      indice: "Il ne voit que ce que la page montre.",
      correction:
        "QU'IL N'Y A QU'UNE SEULE IDÉE, puisque tu n'as jamais changé de paragraphe. Ce n'est pas ce que tu voulais dire — mais c'est ce que la page montre.",
    },
    schema: pasQuandLaPageEstPleine,
  },
];
