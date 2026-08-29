// ─── Fiche de cours : comprendre et interpréter un texte (CM2) ────────────────
// TROISIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». ⛔ MÊME PROGRAMME QUE
// LA 6e — la séparation se fait sur les MICROS.
//
// ⛔⛔ ET ICI LES DEUX NOTIONS SE RESSEMBLENT PLUS QUE PARTOUT AILLEURS : les deux
// portent l'implicite et les genres. La comparaison micro par micro donne
// pourtant deux fiches nettes :
//
//   | 6e (`francais-6e-comprehension-textes.tsx`) | CM2 (ici) |
//   |---|---|
//   | OÙ vit la réponse : écrite, déduite, ou inventée | QUOI FAIRE quand ça bloque, seul |
//   | JUSTIFIER en citant le passage | RESTITUER l'essentiel en peu de mots |
//   | le sens global comme somme des détails | l'AUTONOMIE : plus long, plus complexe, sans adulte |
//
// ⭐ En un mot : LE CM2 LIT SEUL ET REDIT ; LA 6e PROUVE. Le CM2 ne demande pas
// encore de citer le texte pour appuyer une réponse — c'est le geste de la 6e.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : LIRE SEUL, C'EST SAVOIR QUOI FAIRE QUAND ÇA
// BLOQUE. Le micro s'appelle « comprendre SEUL un texte plus long et plus
// complexe », et l'item fixe le prend par le seul bout qui compte : « quand tu ne
// comprends pas un passage EN LISANT SEUL, le mieux est de… RELIRE LE PASSAGE
// LENTEMENT ». La vraie question du CM2 n'est donc pas « as-tu compris ? » — elle
// est « que fais-tu quand tu n'as pas compris, et que personne n'est là ? ». Les
// trois mauvaises réponses du pool disent toutes la même chose : abandonner
// (sauter le reste, fermer le livre, changer d'histoire).
//
// ⭐ ET LA PREUVE QU'ON A COMPRIS SEUL EST UN TEST SIMPLE : REDIRE EN PEU DE MOTS.
// « Restituer l'essentiel, c'est dire les idées principales EN PEU DE MOTS. »
// C'est un test à double détente, et c'est ce qui le rend utile : celui qui n'a
// pas compris ne peut pas faire court — il redit tout, ou il ne redit rien.
//
// ⭐ L'ARC D'INFÉRENCE (deux indices qui convergent) est REPRIS de la fiche de 6e,
// et c'est voulu : c'est le même geste sur des indices plus simples. Un élève qui
// passe du CM2 à la 6e doit reconnaitre le dessin.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les items `cm2_fr_fixed_comp_1` à `_4` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts, et sur le pool LECTURE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `comprehension_textes`) :
// - cm2_comp_autonomie   → figure, propriétés 1 à 3, formule, méthode 1, usage 1,
//                          exemples 1 et 2
// - cm2_comp_essentiel   → propriétés 4 à 6, méthode 2, usage 2, exemple 3
// - cm2_comp_implicite   → propriétés 7 et 8, méthode 3, usage 3, exemple 4
// - cm2_comp_genres      → propriété 9, méthode 4, usage 4, exemple 5
// - cm2_comp_textes_defi → propriété 10, exemple 6

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

/** Ce qu'on fait quand ça bloque, et les marques des genres. ⚠️ Cellules
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

// ─── Ce qui se dessine quand on lit seul ──────────────────────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : ce qu'on fait quand ça bloque.
const quandCaBloque = phrase({
  mots: [
    { texte: "ça bloque" },
    { texte: "relis lentement", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "alors", type: "question" }],
  legende: "Lire seul, ce n'est pas tout comprendre : c'est savoir quoi faire quand non.",
});

const grilleQuandCaBloque = grille({
  headers: ["Ce qu'on fait", "Ce qu'on ne fait pas"],
  rows: [
    { values: ["relire lentement", "sauter la suite"] },
    { values: ["revenir en arrière", "fermer le livre"] },
    { values: ["repartir plus haut", "changer de livre"] },
    { values: ["noter la question", "abandonner"] },
  ],
  caption: "Les trois mauvaises réponses disent toutes : abandonner.",
});

const grilleQuandCaBloqueRelire = grille({
  headers: ["Ce qu'on fait", "Ce qu'on ne fait pas"],
  rows: [
    { values: ["relire lentement", "sauter la suite"] },
    { values: ["revenir en arrière", "fermer le livre"] },
    { values: ["repartir plus haut", "changer de livre"] },
    { values: ["noter la question", "abandonner"] },
  ],
  highlight: { row: 0 },
  caption: "Relire calmement suffit dans la plupart des cas.",
});

const plusLongPlusComplexe = phrase({
  mots: [
    { texte: "plus long" },
    { texte: "et tout seul", focus: true },
  ],
  legende: "Ce qui change au CM2 : la longueur, et le fait d'être seul devant.",
});

// ── RESTITUER : le test des peu de mots.
const enPeuDeMots = phrase({
  mots: [
    { texte: "tout recopier", barre: true },
    { texte: "en peu de mots", focus: true },
  ],
  legende: "L'essentiel, ce sont les idées principales, redites brièvement.",
});

const redireEstUnTest = phrase({
  mots: [
    { texte: "tu redis court" },
    { texte: "tu as compris", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "Qui n'a pas compris redit tout, ou ne redit rien. Jamais court.",
});

const idees = phrase({
  mots: [
    { texte: "les détails", barre: true },
    { texte: "les idées", focus: true },
  ],
  legende: "On garde ce qui porte l'histoire, on laisse ce qui l'accompagne.",
});

// ── L'IMPLICITE : deux indices qui convergent.
// ⭐ Le dessin est REPRIS de la fiche de 6e, à dessein : même geste, indices plus
// simples — l'élève doit reconnaitre la figure en montant de classe.
const deuxIndices = phrase({
  mots: [
    { texte: "les lunettes", focus: true },
    { texte: "le maillot", focus: true },
    { texte: "il a nagé" },
  ],
  liens: [
    { de: 0, vers: 2, label: "montre", type: "question" },
    { de: 1, vers: 2, label: "aussi", type: "question" },
  ],
  legende: "Le texte ne dit jamais qu'il a nagé. Les indices, eux, sont écrits.",
});

const indiceEcritReponseNon = phrase({
  mots: [
    { texte: "la réponse" },
    { texte: "l'indice", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "cachée, mais", type: "question" }],
  legende: "La réponse peut manquer dans le texte. L'indice, lui, y est toujours.",
});

// ── LES GENRES : ce qu'on voit avant de lire.
const grilleGenres = grille({
  headers: ["Ce qu'on voit", "Le genre"],
  rows: [
    { values: ["des vers", "un poème"] },
    { values: ["une date", "un article"] },
    { values: ["des étapes", "une recette"] },
    { values: ["des répliques", "du théâtre"] },
  ],
  caption: "Le genre se voit avant qu'on ait lu une phrase.",
});

const grilleGenresPoeme = grille({
  headers: ["Ce qu'on voit", "Le genre"],
  rows: [
    { values: ["des vers", "un poème"] },
    { values: ["une date", "un article"] },
    { values: ["des étapes", "une recette"] },
    { values: ["des répliques", "du théâtre"] },
  ],
  highlight: { row: 0 },
  caption: "Des vers, des rimes et des strophes : un poème.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionTextesCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "comprehension-textes",
  titre: "Comprendre un texte seul en CM2 (2026-2027)",
  accroche:
    "Au CM2, la question change. Ce n'est plus « as-tu compris ? » — c'est QUE FAIS-TU QUAND TU N'AS PAS COMPRIS, ET QUE PERSONNE N'EST LÀ ? Le programme demande de comprendre SEUL un texte plus long et plus complexe, et la réponse tient en trois mots : tu relis lentement. Les autres réactions possibles — sauter la suite, fermer le livre, changer d'histoire — disent toutes la même chose : abandonner.",
  identite: [
    { label: "Mots clés", valeur: "Seul, relire, essentiel, implicite, genres" },
    { label: "Le secret", valeur: "Savoir quoi faire quand ça bloque" },
    { label: "Outil", valeur: "Peux-tu le redire en peu de mots ?" },
  ],
  definition: {
    texte:
      "Le CM2 lit SEUL des textes PLUS LONGS ET PLUS COMPLEXES, et c'est ce mot « seul » qui fait la différence : quand un passage résiste, personne ne vient. Le geste à connaitre est simple et il s'apprend — ON RELIT LE PASSAGE LENTEMENT, on repart quelques lignes plus haut si besoin, et l'on ne saute ni la suite ni le livre. Comprendre se prouve ensuite en RESTITUANT L'ESSENTIEL : dire les idées principales EN PEU DE MOTS, ce qui n'est ni recopier le texte, ni apprendre une phrase par cœur, ni raconter autre chose. Il faut aussi distinguer ce qui est ÉCRIT de ce qui ne l'est pas : « Kévin sortit de l'eau, rangea ses lunettes et remit son maillot trempé » ne dit jamais qu'il a nagé — mais les indices, eux, sont écrits, et deux suffisent. Enfin, RECONNAITRE LE GENRE d'un texte à ce qu'on en voit : des vers, des rimes et des strophes signent un poème ; une suite d'étapes, une recette ; des répliques, du théâtre.",
  },
  figure: {
    schema: pile(quandCaBloque, grilleQuandCaBloque),
    legende:
      "L'arc va du blocage vers ce qu'on en fait, et c'est tout le CM2 : lire seul ne veut pas dire tout comprendre du premier coup — personne ne fait cela — mais savoir quoi faire quand on ne comprend pas. Le tableau met les deux colonnes en regard, et remarque que les mauvaises réponses se ressemblent toutes : sauter la suite, fermer le livre, changer d'histoire. Ce sont trois façons d'abandonner, et l'une d'elles te viendra à l'esprit. Relire lentement suffit presque toujours.",
  },
  proprietes: [
    {
      titre: "Ce qui change au CM2 : tu es seul devant",
      texte:
        "Les textes sont plus longs et plus complexes, et il n'y a plus d'adulte à côté pour expliquer au fil de la lecture. Le geste doit donc être à toi.",
      schema: plusLongPlusComplexe,
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Quand ça bloque, on relit lentement",
      texte:
        "C'est la réponse, et elle suffit presque toujours. Relire calmement un passage difficile aide à le comprendre — sans abandonner la lecture.",
      schema: grilleQuandCaBloqueRelire,
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Les mauvaises réactions se ressemblent",
      texte:
        "Sauter le reste, fermer le livre, changer d'histoire : trois façons d'abandonner. L'une d'elles te viendra à l'esprit — c'est normal, et c'est le moment de relire.",
      schema: grilleQuandCaBloque,
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Restituer, c'est dire en PEU DE MOTS",
      texte:
        "Les idées principales, brièvement. Ce n'est ni recopier tout le texte, ni retenir la première phrase, ni raconter une autre histoire.",
      schema: enPeuDeMots,
      micros: ["cm2_comp_essentiel"],
    },
    {
      titre: "Faire court est le test",
      texte:
        "Celui qui a compris peut redire court. Celui qui n'a pas compris redit tout — ou ne redit rien. La brièveté n'est pas un style : c'est une preuve.",
      schema: redireEstUnTest,
      micros: ["cm2_comp_essentiel"],
    },
    {
      titre: "On garde les idées, pas les détails",
      texte:
        "Ce qui porte l'histoire reste ; ce qui l'accompagne tombe. Un détail juste et joli peut très bien ne pas avoir sa place dans l'essentiel.",
      schema: idees,
      micros: ["cm2_comp_essentiel"],
    },
    {
      titre: "Tout n'est pas écrit dans le texte",
      texte:
        "« Il sortit de l'eau, rangea ses lunettes, remit son maillot trempé » ne dit jamais qu'il a nagé. Et pourtant tu le sais.",
      schema: deuxIndices,
      micros: ["cm2_comp_implicite"],
    },
    {
      titre: "Mais les indices, eux, sont écrits",
      texte:
        "C'est ce qui sépare comprendre de deviner : tu dois pouvoir montrer du doigt les mots d'où tu es parti. Deux suffisent.",
      schema: indiceEcritReponseNon,
      micros: ["cm2_comp_implicite"],
    },
    {
      titre: "Le genre se voit avant la lecture",
      texte:
        "Des vers, des rimes et des strophes : un poème. Des étapes numérotées : une recette. Des répliques précédées d'un nom : du théâtre.",
      schema: grilleGenres,
      micros: ["cm2_comp_genres"],
    },
    {
      titre: "Et il dit comment lire",
      texte:
        "On ne lit pas une recette comme un poème : dans l'une on suit un ordre, dans l'autre on écoute les sons. Savoir le genre fait gagner du temps.",
      schema: grilleGenresPoeme,
      micros: ["cm2_comp_textes_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais déjà des inférences sans arrêt, et sur bien plus difficile qu'un texte. Quand quelqu'un rentre trempé et sans parapluie, tu sais qu'il pleut sans qu'on te le dise. Quand ton ami répond « ouais ouais » sans lever les yeux, tu sais qu'il n'écoute pas. Le texte marche pareil : les lunettes et le maillot trempé sont exactement les mêmes indices. Ce qui change à l'école, c'est qu'on te demande de MONTRER d'où tu es parti — et là, ça coince, parce que dans la vie personne ne te le demande. Quant à relire : personne ne relit spontanément, on préfère continuer en espérant que ça s'éclaircira. Ça ne s'éclaircit jamais tout seul, et relire coute trente secondes.",
  },
  historique: {
    texte:
      "Relire est en train de disparaitre, et c'est très récent. Pendant des siècles, une famille possédait deux ou trois livres — souvent un seul — et les lisait des dizaines de fois : on connaissait des pages par cœur sans les avoir apprises, on y revenait chaque hiver, et comprendre un texte voulait dire y retourner. Les historiens appellent cela la lecture intensive. Puis le livre est devenu bon marché, au XVIIIe siècle, et l'on s'est mis à lire beaucoup de livres une seule fois chacun — la lecture extensive. Le confort est réel, l'habitude perdue aussi : nous ne relisons plus, et nous croyons donc qu'un texte qui résiste est un texte trop difficile. Il est souvent seulement un texte lu une fois.",
  },
  formule: {
    contexte: "Le test qui dit si tu as compris, et il se passe tout seul.",
    expression: "peux-tu le redire en peu de mots ?",
    legende:
      "Si oui, tu as compris. Si tu ne peux le redire qu'en le recopiant presque entièrement, tu as suivi les phrases sans saisir l'idée. Et si tu ne peux rien en dire du tout, il faut relire — ce n'est pas grave, c'est même l'usage prévu.",
    schema: redireEstUnTest,
  },
  methode: [
    {
      titre: "Relire le passage, plus lentement",
      texte:
        "Et repartir trois lignes plus haut, là où tu comprenais encore. C'est presque toujours entre ces trois lignes et le blocage que ça s'est perdu.",
      schema: quandCaBloque,
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Fermer le livre et redire",
      texte:
        "À voix basse, en trois phrases. Ce que tu n'arrives pas à dire est exactement ce que tu n'as pas compris — et tu le sais en trente secondes.",
      schema: enPeuDeMots,
      micros: ["cm2_comp_essentiel"],
    },
    {
      titre: "Chercher deux indices avant de répondre",
      texte:
        "Un seul peut tromper ; deux qui vont dans le même sens, presque jamais. Et tu dois pouvoir les montrer du doigt.",
      schema: deuxIndices,
      micros: ["cm2_comp_implicite"],
    },
    {
      titre: "Regarder la page avant de lire",
      texte:
        "Des lignes courtes ? un poème. Des numéros ? une recette. Des noms suivis de tirets ? du théâtre. Trois secondes, et tu sais comment lire.",
      schema: grilleGenres,
      micros: ["cm2_comp_genres"],
    },
  ],
  usages: [
    {
      titre: "Pour finir un livre qu'on trouve difficile",
      detail:
        "Un passage qui résiste ne condamne pas le livre. Relis-le, et continue : la suite l'éclaire souvent mieux qu'une troisième relecture.",
      schema: grilleQuandCaBloqueRelire,
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Pour répondre à « de quoi parle ce texte ? »",
      detail:
        "En deux ou trois phrases. Une réponse longue n'est pas plus complète : c'est le signe qu'on n'a pas trié — donc pas encore compris.",
      schema: enPeuDeMots,
      micros: ["cm2_comp_essentiel"],
    },
    {
      titre: "Pour les questions qui commencent par « pourquoi »",
      detail:
        "Elles portent presque toujours sur ce qui n'est pas écrit. La réponse se déduit ; les indices, eux, se trouvent dans le texte.",
      schema: indiceEcritReponseNon,
      micros: ["cm2_comp_implicite"],
    },
    {
      titre: "Pour savoir comment lire, avant de lire",
      detail:
        "Une recette se suit dans l'ordre, un poème s'écoute, un article s'interroge sur sa source. Le genre te dit quoi faire.",
      schema: grilleGenresPoeme,
      micros: ["cm2_comp_genres"],
    },
  ],
  exemples: [
    {
      titre: "Quand ça bloque",
      donnees: "« Quand tu ne comprends pas un passage en lisant seul, le mieux est de… »",
      schema: quandCaBloque,
      question: "Que fais-tu ?",
      solution:
        "TU RELIS LE PASSAGE LENTEMENT. Pas sauter tout le reste du texte, pas fermer le livre, pas changer d'histoire — remarque que ces trois-là disent la même chose : abandonner. Relire calmement aide à comprendre SANS abandonner la lecture, et cela coute trente secondes.",
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Un texte plus long",
      donnees: "Le livre fait quinze chapitres, et personne ne lit avec toi.",
      schema: plusLongPlusComplexe,
      question: "Qu'est-ce qui change par rapport au CM1 ?",
      solution:
        "TU ES SEUL DEVANT, ET C'EST TOUT LE PROGRAMME. Les textes s'allongent et se compliquent, mais surtout il n'y a plus d'adulte à côté pour expliquer au fil de la lecture. Le geste doit donc devenir le tien — et c'est celui-là qu'on t'apprend cette année.",
      micros: ["cm2_comp_autonomie"],
    },
    {
      titre: "Restituer l'essentiel",
      donnees: "« Restituer l'essentiel d'un texte, c'est… »",
      schema: enPeuDeMots,
      question: "C'est quoi ?",
      solution:
        "DIRE LES IDÉES PRINCIPALES EN PEU DE MOTS. Pas recopier tout le texte — cela ne prouve rien —, pas apprendre la première phrase par cœur, pas inventer une autre histoire. Et « en peu de mots » n'est pas une consigne de longueur : c'est le test lui-même.",
      micros: ["cm2_comp_essentiel"],
    },
    {
      titre: "Ce qui n'est pas écrit",
      donnees: "« Kévin sortit de l'eau, rangea ses lunettes dans son sac et remit son maillot trempé. »",
      schema: deuxIndices,
      question: "Que vient de faire Kévin ?",
      solution:
        "IL A NAGÉ. Le texte ne le dit jamais — cherche, le mot n'y est pas. Mais trois indices y sont écrits : l'eau, les lunettes, le maillot trempé. C'est une information IMPLICITE : la réponse manque, les indices non, et tu peux les montrer du doigt.",
      micros: ["cm2_comp_implicite"],
    },
    {
      titre: "Un genre",
      donnees: "« Un texte écrit en vers, avec des rimes et des strophes, est… »",
      schema: grilleGenresPoeme,
      question: "Quel genre ?",
      solution:
        "UN POÈME. Ni un article de journal, ni une recette, ni un mode d'emploi. Les vers, les rimes et les strophes sont ses trois marques, et elles se voient de loin — avant même d'avoir lu un seul mot du texte.",
      micros: ["cm2_comp_genres"],
    },
    {
      titre: "Le défi",
      donnees: "On te donne une page couverte de numéros et de verbes à l'infinitif.",
      schema: grilleGenres,
      question: "Quel genre, et comment le lis-tu ?",
      solution:
        "UNE RECETTE, OU UNE NOTICE. Et cela change ta lecture : on ne la lit pas d'un trait comme une histoire — on suit les étapes dans l'ordre, une par une, en s'arrêtant à chacune. Reconnaitre le genre ne sert à rien tout seul : cela sert à savoir COMMENT lire.",
      micros: ["cm2_comp_textes_defi"],
    },
  ],
  pieges: [
    "Continuer à lire en espérant que ça s'éclaircira : cela ne s'éclaircit jamais tout seul.",
    "Sauter le passage difficile : on perd la suite, qui s'appuyait dessus.",
    "Fermer le livre au premier blocage : relire coute trente secondes.",
    "Recopier le texte pour restituer l'essentiel : cela ne prouve rien.",
    "Croire qu'une réponse longue est plus complète : c'est le signe qu'on n'a pas trié.",
    "Deviner au lieu de déduire : les indices doivent être montrables.",
    "Sauter le genre : il dit comment lire, et cela se voit en trois secondes.",
  ],
  aRetenir: [
    "Lire seul, ce n'est pas tout comprendre : c'est savoir quoi faire quand non.",
    "Quand ça bloque : on relit lentement, on ne saute rien, on n'abandonne pas.",
    "Restituer l'essentiel : les idées principales, EN PEU DE MOTS.",
    "La réponse peut manquer dans le texte ; les indices, jamais.",
    "Le genre se voit avant la lecture, et il dit comment lire.",
  ],
  entrainement: [
    {
      question: "Tu bloques sur un paragraphe depuis deux minutes. Que fais-tu ?",
      correction: "Tu le relis lentement, en repartant trois lignes plus haut.",
      micros: ["cm2_comp_autonomie"],
    },
    {
      question: "Ton résumé fait presque la longueur du texte. Qu'est-ce que cela montre ?",
      correction: "Que tu n'as pas trié : l'essentiel se dit en peu de mots.",
      micros: ["cm2_comp_essentiel"],
    },
    {
      question: "« Léo n'avait rien mangé depuis le matin. Son ventre gargouillait. » Que ressent-il ?",
      correction: "Il a faim — et deux indices le montrent, sans que le mot y soit.",
      micros: ["cm2_comp_implicite"],
    },
    {
      question: "« La petite fille sourit en découvrant le cadeau. » Que ressent-elle ?",
      correction: "De la joie : le sourire est écrit, le sentiment non.",
      micros: ["cm2_comp_implicite"],
    },
    {
      question: "Une page avec des noms en majuscules suivis de tirets : quel genre ?",
      correction: "Du théâtre : les répliques précédées d'un nom en sont la marque.",
      micros: ["cm2_comp_genres"],
    },
    {
      question: "Pourquoi reconnaitre le genre avant de lire ?",
      correction: "Parce qu'il dit comment lire : suivre un ordre, écouter des sons, chercher une info.",
      micros: ["cm2_comp_textes_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesComprehensionTextesCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Comprendre un texte - CM2",
    section: {
      type: "objectif",
      phrase: "Savoir quoi faire quand ça bloque",
      sousPhrase:
        "La question du CM2 n'est plus « as-tu compris ? » mais « que fais-tu quand tu n'as pas compris ? ».",
      encadre: {
        titre: "L'idée",
        texte: "Tu relis lentement. Et relire coute trente secondes.",
      },
    },
  },
  {
    titre: "Les trois façons d'abandonner",
    badge: "Comprendre un texte - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Sauter la suite", texte: "Elle s'appuyait sur ce que tu viens de sauter." },
        { titre: "Fermer le livre", texte: "Un passage qui résiste ne condamne pas le livre." },
        { titre: "Changer d'histoire", texte: "Le prochain aura aussi un passage difficile." },
        { titre: "Relire", texte: "La seule qui marche — et elle suffit presque toujours." },
      ],
    },
    schema: grilleQuandCaBloque,
  },
  {
    titre: "Le test des peu de mots",
    badge: "Comprendre un texte - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Tu redis court",
        contenu: "Tu as compris. C'est aussi simple que cela.",
      },
      droite: {
        titre: "Tu redis tout, ou rien",
        contenu: "Tu as suivi les phrases sans saisir l'idée. Relis.",
      },
    },
    schema: redireEstUnTest,
  },
  {
    titre: "Tout n'est pas écrit",
    badge: "Comprendre un texte - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Il sortit de l'eau, rangea ses lunettes, remit son maillot trempé. »",
        "Le mot « nagé » n'est nulle part — cherche, il n'y est pas.",
        "MAIS LES INDICES SONT ÉCRITS : l'eau, les lunettes, le maillot.",
        "Deux suffisent, et tu dois pouvoir les montrer du doigt.",
      ],
    },
    schema: deuxIndices,
  },
  {
    titre: "Le genre dit comment lire",
    badge: "Comprendre un texte - CM2",
    section: {
      type: "etapes",
      etapes: [
        "DES VERS, des rimes, des strophes : un poème — on écoute les sons.",
        "DES ÉTAPES numérotées : une recette — on suit l'ordre.",
        "DES RÉPLIQUES précédées d'un nom : du théâtre.",
        "UNE DATE et un titre : un article — on regarde d'où ça vient.",
      ],
    },
    schema: grilleGenres,
  },
  {
    titre: "À vous",
    badge: "Comprendre un texte - CM2",
    section: {
      type: "exercice",
      enonce: "Tu relis un paragraphe pour la deuxième fois et tu ne comprends toujours pas.",
      question: "Que fais-tu maintenant ?",
      indice: "Le problème n'est peut-être pas dans ce paragraphe-là.",
      correction:
        "TU REPARS PLUS HAUT — trois ou quatre lignes avant, là où tu comprenais encore. C'est presque toujours entre cet endroit et ton blocage que le fil s'est perdu.",
    },
    schema: quandCaBloque,
  },
];
