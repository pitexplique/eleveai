// ─── Fiche de cours : apprécier un texte et fonder son jugement (5e) ──────────
// LA QUATORZIÈME FICHE DE LA 5e.
//
// ⚠️⚠️ RÉFÉRENCE : « Annexe 1 – Programme de français pour le cycle 4 », BO n° 10
// du 5 mars 2026 (arrêté du 18 février 2026), rubriques « Cinquième ».
// Compétence « Comprendre, interpréter, apprécier », versant APPRÉCIER — le
// versant COMPRENDRE a sa propre notion (`lecture_comprehension`), écrite juste
// avant celle-ci.
//
// ⭐⭐ L'ARC DE QUESTION EST ICI RETOURNÉ, ET C'EST LE POINT DE LA LEÇON. Dans
// `lecture_comprehension`, il va de ce qu'on comprend vers ce qui le montre.
// Ici il va de L'EFFET RESSENTI vers CE QUI, DANS LE TEXTE, L'A PRODUIT : « on
// ne s'arrête pas » ← « les phrases sont très courtes ». L'effet est en toi, la
// cause est dans le texte — et c'est exactement le « fondée sur le texte » du
// libellé du BO. L'en-tête de la banque le dit : c'est le pas que les élèves de
// 5e ne font pas seuls.
//
// ⛔⛔ ET UN CAS QU'IL NE FAUT SURTOUT PAS SUPPRIMER : « rien ne vient du texte,
// c'est un gout ». La banque l'écrit noir sur blanc — sans lui, « l'élève apprend
// qu'un gout se justifie toujours, ce qui est faux ». « Je n'aime pas les
// histoires de mer » est un avis parfaitement recevable, et il n'a aucun appui
// dans le texte. Le dire évite de transformer l'appréciation en exercice de
// mauvaise foi où il faudrait toujours trouver une raison littéraire.
//
// ⛔ LE PARTAGE ENTRE LES DEUX MICROS EST ÉCRIT DANS LES BANQUES :
//     `5e_comp_jugement`  → les CRITÈRES : émotion, écriture, idées, ou rien
//     `5e_comp_apprecier` → l'EFFET, et ce qui l'a produit dans le texte
// Ne pas les redire l'un dans l'autre.
//
// ⭐ `tableau_donnees` porte la grille des appuis, comme dans `oral_ecouter` et
// `lecture_comprehension`. ⚠️ Cellules courtes, toujours.
//
// ⛔ RÈGLE DE COULEUR : « un gout », « la mer partout », « par ses yeux » ne sont
// pas des fonctions et doivent rester GRIS — vérifié au rendu.
//
// Alignée sur la table APPRECIER de
// lib/tutor-v4/questionBank/5e/francais/socle-lecture-culture.bank.ts et sur les
// tables JUGEMENTS, APPUIS, QUESTIONS_OUTILS et OUTILS de lecture.bank.ts.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : aucun titre, aucun auteur.
//
// Micro-compétences couvertes (les 3 de la notion `lecture_apprecier`) :
// - 5e_comp_apprecier      → figure, propriétés 1 à 3, formule, méthode 1,
//                            usage 1, exemples 1 et 2
// - 5e_comp_jugement       → propriétés 4 et 5, méthode 2, usage 2, exemple 3
// - 5e_comp_outils_analyse → propriétés 6 à 8, méthodes 3 et 4, usage 3,
//                            exemples 4 à 6

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PhraseCanvasGroupe,
  PhraseCanvasLien,
  PhraseCanvasMot,
} from "@/lib/tutor-v4/types_canvas";

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

/** La grille des appuis. ⚠️ Cellules courtes : à la largeur d'un bloc de fiche,
 *  vingt signes tombent sous le plancher de 11 px. */
function grille(opts: { headers: string[]; rows: { values: string[] }[]; highlight?: { row?: number }; caption?: string }) {
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

// ─── Ce qui se dessine quand on apprécie ──────────────────────────────────────

// ── LA FIGURE DE RÉFÉRENCE : l'arc va de l'effet vers sa cause dans le texte.
const effetRythme = phrase({
  mots: [
    { texte: "on ne s'arrête pas", focus: true },
    { texte: "phrases courtes", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "produit par", type: "question" }],
  legende: "L'effet est en toi ; sa cause est dans le texte. C'est la cause qu'on nomme.",
});

const effetImage = phrase({
  mots: [
    { texte: "la phrase reste", focus: true },
    { texte: "une comparaison", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "produit par", type: "question" }],
  legende: "« La mer avalait la barque » : l'image frappe, et l'on sait dire pourquoi.",
});

const effetPersonnage = phrase({
  mots: [
    { texte: "on a peur avec elle", focus: true },
    { texte: "on la comprend", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "produit par", type: "question" }],
  legende: "Le personnage touche parce qu'on comprend ce qu'il ressent, de l'intérieur.",
});

// ── ⛔ LE CAS QU'ON NE SUPPRIME PAS : un gout n'a pas d'appui dans le texte.
const goutPersonnel = phrase({
  mots: [
    { texte: "Je" },
    { texte: "n'aime" },
    { texte: "pas" },
    { texte: "la" },
    { texte: "mer" },
    { texte: "." },
  ],
  groupes: [{ mots: [0, 5], label: "un gout" }],
  legende: "Rien ne vient du texte. C'est recevable — et cela n'engage que toi.",
});

// ── SUR QUOI UN JUGEMENT S'APPUIE.
const grilleAppuis = grille({
  headers: ["Ce que je dis", "L'appui"],
  rows: [
    { values: ["j'ai eu peur", "l'émotion"] },
    { values: ["phrases courtes", "l'écriture"] },
    { values: ["ça fait réfléchir", "les idées"] },
    { values: ["c'était nul", "aucun"] },
  ],
  caption: "Trois appuis possibles — et un quatrième cas, qui n'en a pas.",
});

const grilleAppuisRien = grille({
  headers: ["Ce que je dis", "L'appui"],
  rows: [
    { values: ["j'ai eu peur", "l'émotion"] },
    { values: ["phrases courtes", "l'écriture"] },
    { values: ["ça fait réfléchir", "les idées"] },
    { values: ["c'était nul", "aucun"] },
  ],
  highlight: { row: 3 },
  caption: "« C'était nul » n'est pas une faute : c'est un avis pas encore formulé.",
});

// ── LES QUATRE OUTILS D'ANALYSE.
const outilPointDeVue = phrase({
  mots: [
    { texte: "on" },
    { texte: "ne" },
    { texte: "sait" },
    { texte: "que" },
    { texte: "ce" },
    { texte: "que" },
    { texte: "voit" },
    { texte: "l'enfant" },
  ],
  groupes: [{ mots: [0, 7], label: "par ses yeux" }],
  legende: "Qui raconte, et par quels yeux : c'est l'outil du POINT DE VUE.",
});

const outilChampLexical = phrase({
  mots: [
    { texte: "naufrage" },
    { texte: "écueil" },
    { texte: "tempête" },
    { texte: "dérive" },
  ],
  groupes: [{ mots: [0, 3], label: "la mer partout" }],
  legende: "Des mots d'un même domaine qui reviennent : c'est un CHAMP LEXICAL.",
});

const outilImage = phrase({
  mots: [
    { texte: "Sa" },
    { texte: "colère", focus: true },
    { texte: "est" },
    { texte: "un" },
    { texte: "orage", focus: true },
    { texte: "." },
  ],
  liens: [{ de: 1, vers: 4, label: "comparée à", type: "question" }],
  legende: "Une chose dite par une autre : c'est une IMAGE — comparaison ou métaphore.",
});

const outilOrdre = phrase({
  mots: [
    { texte: "la fin", focus: true },
    { texte: "…" },
    { texte: "le début", focus: true },
  ],
  liens: [{ de: 2, vers: 0, label: "retour", type: "reprise" }],
  legende: "Le chapitre commence par la fin, puis revient en arrière : l'ORDRE du récit.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureApprecier5e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "5e",
  notion: "lecture-apprecier",
  titre: `Apprécier un texte et fonder son jugement en 5e (${ANNEE_SCOLAIRE})`,
  accroche:
    "« On ne peut pas s'arrêter, les phrases vont très vite. » Voilà une vraie appréciation : elle dit un effet — on ne s'arrête pas — et elle nomme ce qui l'a produit — des phrases courtes. « C'était bien » ne dit ni l'un ni l'autre. Apprécier n'est pas noter un livre : c'est retrouver, dans le texte, ce qui t'a fait quelque chose.",
  identite: [
    { label: "Mots clés", valeur: "Effet, appui, émotion, écriture, idées" },
    { label: "Le secret", valeur: "L'effet est en toi, la cause est dans le texte" },
    { label: "Outil", valeur: "Qu'est-ce qui, dans le texte, m'a fait ça ?" },
  ],
  definition: {
    texte:
      "Apprécier un texte, ce n'est pas dire si on l'a aimé : c'est dire CE QUI, dans le texte, a produit ce qu'on a ressenti. L'effet est en toi — on ne s'arrête pas, la fin surprend, le personnage touche, une image reste — mais sa cause est dans les pages, et c'est elle qu'on nomme. Un jugement de lecteur s'appuie sur trois choses possibles, et le programme les nomme : une ÉMOTION (ce que le texte t'a fait ressentir), un CRITÈRE ESTHÉTIQUE (la façon dont c'est écrit), des IDÉES ET DES VALEURS (ce que le texte défend ou dénonce). ⚠️ Et il existe un quatrième cas, qu'il faut connaitre : un gout personnel, qui ne s'appuie sur rien du texte. Il est recevable, mais il n'engage que toi. Pour aller chercher la cause, quelques OUTILS suffisent : qui raconte et par quels yeux, dans quel ordre, avec quels mots, par quelles images.",
  },
  figure: {
    schema: pile(effetRythme, effetImage),
    legende:
      "L'arc violet, qui servait à justifier une compréhension, sert ici à justifier un EFFET — et il pointe dans la même direction : vers le texte. « On ne s'arrête pas » est ce que tu as ressenti ; « les phrases sont très courtes » est ce qui l'a produit, et c'est vérifiable par n'importe qui. Une appréciation complète tient ces deux morceaux ensemble : sans l'effet, on décrit ; sans la cause, on ne fait que noter.",
  },
  proprietes: [
    {
      titre: "L'effet est en toi, la cause est dans le texte",
      texte:
        "« On ne s'arrête pas » : c'est ton expérience. « Les phrases sont très courtes » : c'est le texte, et n'importe qui peut le vérifier.",
      schema: effetRythme,
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Quatre causes reviennent tout le temps",
      texte:
        "Une fin qui surprend, un personnage qu'on comprend de l'intérieur, un rythme qui emporte, une image qui reste en tête.",
      schema: pile(effetPersonnage, effetImage),
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Et parfois, rien ne vient du texte",
      texte:
        "« Je n'aime pas les histoires de mer. » C'est un gout, il est recevable, et il n'a aucun appui dans les pages. Le savoir évite de bricoler une raison.",
      schema: goutPersonnel,
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Un jugement s'appuie sur trois choses",
      texte:
        "Une émotion ressentie, la façon dont c'est écrit, ou les idées que le texte défend. Le programme ne demande rien d'autre.",
      schema: grilleAppuis,
      micros: ["5e_comp_jugement"],
    },
    {
      titre: "« C'était nul » n'est pas une faute",
      texte:
        "C'est un avis qui n'a pas encore été formulé jusqu'au bout. La question n'est pas « as-tu le droit ? » mais « sur quoi t'appuies-tu ? ».",
      schema: grilleAppuisRien,
      micros: ["5e_comp_jugement"],
    },
    {
      titre: "Qui raconte, et par quels yeux",
      texte:
        "Un récit vu par un enfant ne montre pas ce qu'un adulte verrait. Le point de vue explique ce que le texte cache autant que ce qu'il dit.",
      schema: outilPointDeVue,
      micros: ["5e_comp_outils_analyse"],
    },
    {
      titre: "Les mots d'un même domaine colorent la page",
      texte:
        "Naufrage, écueil, tempête, dérive : le champ lexical installe une atmosphère sans qu'aucune phrase ne l'annonce.",
      schema: outilChampLexical,
      micros: ["5e_comp_outils_analyse"],
    },
    {
      titre: "L'ordre du récit, et les images",
      texte:
        "Commencer par la fin, intercaler un souvenir, annoncer un malheur. Et dire une chose par une autre : « sa colère est un orage ».",
      schema: pile(outilOrdre, outilImage),
      micros: ["5e_comp_outils_analyse"],
    },
  ],
  reel: {
    texte:
      "Ce qu'on te demande ici, tu le fais déjà — mais à l'envers. Quand tu conseilles une série à quelqu'un, tu ne dis pas seulement « c'est bien » : tu dis « ça va très vite », « on s'attache aux personnages », « la fin, tu ne la vois pas venir ». Tu nommes des causes, et c'est exactement le geste du cours. La seule différence est qu'on te demande de le faire par écrit, sur un texte, et de pouvoir montrer l'endroit. Cela sert bien au-delà du français : une critique, une recommandation, un avis argumenté en histoire ou en sciences reposent tous sur le même mouvement — de l'effet vers la cause, et non l'inverse. Et savoir qu'un gout n'a parfois aucune cause littéraire évite de raconter des histoires pour faire savant.",
  },
  historique: {
    texte:
      "Pendant longtemps, l'école a demandé aux élèves de dire si un texte était BEAU, et il existait des réponses attendues : certains auteurs étaient au programme parce qu'ils étaient des modèles, et l'on apprenait à admirer. Le mot « apprécier » a changé de sens au XXe siècle : il ne s'agit plus de décerner une valeur mais d'analyser un effet. Le programme d'aujourd'hui le dit sans détour — « formuler un jugement fondé sur des émotions, sur des critères esthétiques, sur des idées et des valeurs ». Autrement dit : tu as le droit de ne pas aimer, à condition de savoir pourquoi. C'est un renversement complet, et il est récent : ton arrière-grand-père n'avait pas ce droit-là en classe.",
  },
  formule: {
    contexte: "La question qui transforme un avis en appréciation.",
    expression: "qu'est-ce qui, dans le texte, m'a fait ça ?",
    legende:
      "Pars toujours de l'effet — ce que tu as ressenti en lisant — et remonte vers sa cause. « Je n'ai pas pu m'arrêter » → pourquoi ? Les phrases sont courtes. « La fin m'a surpris » → pourquoi ? Rien ne l'annonçait. Si tu ne trouves aucune cause dans le texte, c'est peut-être un gout : dis-le, c'est une réponse aussi.",
    schema: effetRythme,
  },
  methode: [
    {
      titre: "Partir de l'effet, remonter vers la cause",
      texte:
        "D'abord ce que tu as ressenti, en une phrase. Puis la question : qu'est-ce qui l'a produit ? La cause est toujours quelque part dans les pages.",
      schema: effetRythme,
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Nommer l'appui de son jugement",
      texte:
        "Une émotion ? La façon d'écrire ? Une idée ? Ou rien du texte ? Les quatre réponses sont recevables — mais il faut savoir laquelle on donne.",
      schema: grilleAppuis,
      micros: ["5e_comp_jugement"],
    },
    {
      titre: "Choisir l'outil que la question appelle",
      texte:
        "Un narrateur qui se trompe ? Le point de vue. Des mots qui se répondent ? Le champ lexical. Un souvenir intercalé ? L'ordre du récit.",
      schema: pile(outilPointDeVue, outilChampLexical),
      micros: ["5e_comp_outils_analyse"],
    },
    {
      titre: "Ne pas plaquer un outil sur un texte",
      texte:
        "Un outil répond à une question précise. Repère d'abord ce qui est remarquable dans l'extrait ; l'outil suit, il ne précède jamais.",
      schema: outilImage,
      micros: ["5e_comp_outils_analyse"],
    },
  ],
  usages: [
    {
      titre: "Pour écrire un avis de lecture",
      detail:
        "Trois lignes suffisent si elles disent l'effet et la cause. Une page de « j'ai bien aimé » ne dit rien à celui qui hésite à lire le livre.",
      schema: effetPersonnage,
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Pour défendre un avis en classe",
      detail:
        "« C'est nul » ferme la discussion ; « la fin ne m'a pas surpris parce qu'on la devinait page 20 » l'ouvre — et se discute.",
      schema: grilleAppuisRien,
      micros: ["5e_comp_jugement"],
    },
    {
      titre: "Pour répondre à une question d'analyse",
      detail:
        "Quatre outils couvrent presque tout au collège : qui raconte, dans quel ordre, avec quels mots, par quelles images.",
      schema: pile(outilOrdre, outilChampLexical),
      micros: ["5e_comp_outils_analyse"],
    },
  ],
  exemples: [
    {
      titre: "Nommer ce qui a produit l'effet",
      donnees: "« On ne peut pas s'arrêter, les phrases vont très vite. »",
      schema: effetRythme,
      question: "Qu'est-ce qui, dans le texte, a produit cet effet ?",
      solution:
        "LE RYTHME : les phrases sont très courtes. L'effet — ne pas pouvoir s'arrêter — est ton expérience de lecteur ; la cause est une propriété du texte, que n'importe qui peut aller vérifier. C'est ce passage de l'un à l'autre qu'on appelle « fonder son appréciation sur le texte ».",
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Quand il n'y a rien à nommer",
      donnees: "« Je n'aime pas les histoires de mer, c'est tout. »",
      schema: goutPersonnel,
      question: "Sur quoi cette appréciation se fonde-t-elle ?",
      solution:
        "SUR RIEN QUI VIENNE DU TEXTE : c'est un gout, et il n'engage que toi. Ce n'est pas une mauvaise réponse — c'est même la bonne, ici. Chercher à tout prix une raison littéraire à un gout personnel conduit à inventer, et un correcteur le voit tout de suite.",
      micros: ["5e_comp_apprecier"],
    },
    {
      titre: "Sur quoi s'appuie ce jugement",
      donnees: "« L'auteur dénonce le travail des enfants sans jamais faire la leçon. »",
      schema: grilleAppuis,
      question: "Quel est l'appui ?",
      solution:
        "DES IDÉES ET DES VALEURS : ce que le texte défend ou dénonce. Remarque que la phrase dit deux choses — ce que le texte dénonce, ET la manière dont il le fait. C'est ce qui la rend forte : elle mêle l'appui des idées à un début d'appui esthétique.",
      micros: ["5e_comp_jugement"],
    },
    {
      titre: "Choisir l'outil",
      donnees: "« On ne sait ce qui se passe qu'à travers ce que voit l'enfant. »",
      schema: outilPointDeVue,
      question: "Quel outil d'analyse permet d'en rendre compte ?",
      solution:
        "LE NARRATEUR ET LE POINT DE VUE : qui raconte, et par quels yeux. Tout ce que l'enfant ne peut pas voir est absent du récit — et c'est souvent là que le texte devient intéressant, parce que le lecteur comprend des choses que le narrateur ignore.",
      micros: ["5e_comp_outils_analyse"],
    },
    {
      titre: "Des mots qui se répondent",
      donnees: "« Verrou, barreau, mur, clé : l'enfermement est partout dans le texte. »",
      schema: outilChampLexical,
      question: "Quel outil ?",
      solution:
        "LE CHAMP LEXICAL : les mots d'un même domaine, qui colorent le passage. Aucune phrase ne dit « il est prisonnier » — ce sont les mots choisis, répétés, qui installent l'idée. C'est un des moyens les plus discrets et les plus efficaces d'un texte.",
      micros: ["5e_comp_outils_analyse"],
    },
    {
      titre: "Une chose dite par une autre",
      donnees: "« Ses mots tombaient comme des pierres. »",
      schema: outilImage,
      question: "Quel outil ?",
      solution:
        "LES IMAGES : comparaison et métaphore, qui font voir une chose par une autre. Ici « comme » signale une comparaison. Sans lui — « ses mots étaient des pierres » — ce serait une métaphore. Dans les deux cas, l'outil est le même et la question aussi : qu'est-ce que l'image fait comprendre ?",
      micros: ["5e_comp_outils_analyse"],
    },
  ],
  pieges: [
    "Dire « c'était bien » et s'arrêter : ce n'est pas faux, c'est inachevé. Il manque l'effet et la cause.",
    "Inventer une raison littéraire à un gout personnel : « je n'aime pas la mer » n'a pas d'appui dans le texte, et c'est très bien.",
    "Confondre l'effet et la cause : « on ne s'arrête pas » est l'effet, « les phrases sont courtes » la cause. On cite la cause.",
    "Plaquer un outil sur un texte : l'outil répond à une question, il ne se choisit pas à l'avance.",
    "Croire qu'apprécier veut dire aimer : on peut fonder solidement un jugement négatif, et c'est même plus difficile.",
    "Rester dans l'émotion seule : elle est un appui recevable, mais le programme en nomme trois — l'écriture et les idées comptent aussi.",
  ],
  aRetenir: [
    "L'effet est en toi ; la cause est dans le texte, et c'est elle qu'on nomme.",
    "La question qui transforme un avis : qu'est-ce qui, dans le texte, m'a fait ça ?",
    "Trois appuis : une émotion, la façon d'écrire, les idées défendues.",
    "Un quatrième cas existe : le gout, qui n'a aucun appui dans le texte — et c'est recevable.",
    "Quatre outils : qui raconte, dans quel ordre, avec quels mots, par quelles images.",
  ],
  entrainement: [
    {
      question: "« J'ai relu la dernière ligne deux fois pour y croire. » Qu'est-ce qui a produit cela ?",
      correction: "La fin qui surprend : rien ne l'annonçait avant elle.",
      micros: ["5e_comp_apprecier"],
    },
    {
      question: "« On sent qu'elle a peur, et on a peur avec elle. » Et ici ?",
      correction: "Le personnage qui touche : on comprend ce qu'il ressent.",
      micros: ["5e_comp_apprecier"],
    },
    {
      question: "« Les descriptions sont si précises qu'on voit la pièce. » Quel appui ?",
      correction: "Un critère esthétique : la façon dont c'est écrit.",
      micros: ["5e_comp_jugement"],
    },
    {
      question: "« J'ai ri tout seul dans le bus. » Quel appui ?",
      correction: "Une émotion : ce que le texte lui a fait ressentir.",
      micros: ["5e_comp_jugement"],
    },
    {
      question: "« Trois ans passent en une phrase, puis une soirée occupe dix pages. » Quel outil ?",
      correction: "L'ordre du récit — et le rythme qu'il impose.",
      micros: ["5e_comp_outils_analyse"],
    },
    {
      question: "« La ville dort comme une bête repue. » Quel outil ?",
      correction: "Les images : une comparaison, qui fait voir une chose par une autre.",
      micros: ["5e_comp_outils_analyse"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=5e",
};

export const slidesLectureApprecier5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Apprécier un texte - 5e",
    section: {
      type: "objectif",
      phrase: "L'effet est en toi, la cause est dans le texte",
      sousPhrase:
        "Apprécier n'est pas noter un livre : c'est retrouver, dans les pages, ce qui t'a fait quelque chose.",
      encadre: {
        titre: "L'idée",
        texte: "« On ne s'arrête pas » — pourquoi ? « Les phrases sont très courtes. »",
      },
    },
  },
  {
    titre: "Quatre causes reviennent tout le temps",
    badge: "Apprécier un texte - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La fin", texte: "Elle surprend : rien ne l'annonçait avant elle." },
        { titre: "Le personnage", texte: "Il touche : on comprend ce qu'il ressent." },
        { titre: "Le rythme", texte: "Il emporte : les phrases sont très courtes." },
        { titre: "L'image", texte: "Elle frappe : une comparaison te reste en tête." },
      ],
    },
    schema: pile(effetRythme, effetImage),
  },
  {
    titre: "Sur quoi s'appuie un jugement",
    badge: "Apprécier un texte - 5e",
    section: {
      type: "etapes",
      etapes: [
        "Une ÉMOTION : ce que le texte t'a fait ressentir.",
        "Un critère ESTHÉTIQUE : la façon dont c'est écrit.",
        "Des IDÉES : ce que le texte défend ou dénonce.",
        "Ou RIEN du texte : c'est un gout, et c'est recevable.",
      ],
    },
    schema: grilleAppuis,
  },
  {
    titre: "« C'était nul » n'est pas une faute",
    badge: "Apprécier un texte - 5e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Un avis interdit. Tu as le droit de ne pas aimer.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Un avis pas encore formulé. La question est : sur quoi t'appuies-tu ?",
      },
    },
    schema: grilleAppuisRien,
  },
  {
    titre: "Quatre outils pour aller chercher",
    badge: "Apprécier un texte - 5e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le point de vue", texte: "Qui raconte, et par quels yeux." },
        { titre: "L'ordre du récit", texte: "Avant, après, ou en retour en arrière." },
        { titre: "Le champ lexical", texte: "Les mots d'un même domaine, qui colorent." },
        { titre: "Les images", texte: "Une chose dite par une autre." },
      ],
    },
    schema: pile(outilPointDeVue, outilImage),
  },
  {
    titre: "À vous",
    badge: "Apprécier un texte - 5e",
    section: {
      type: "exercice",
      enonce: "« Je n'aime pas les histoires de mer, c'est tout. »",
      question: "Sur quoi cette appréciation se fonde-t-elle ?",
      indice: "Cherche dans le texte ce qui aurait produit cet avis. Trouves-tu quelque chose ?",
      correction:
        "Sur RIEN qui vienne du texte : c'est un gout, et il n'engage que toi. C'est la bonne réponse — inventer une raison littéraire serait pire.",
    },
    schema: goutPersonnel,
  },
];
