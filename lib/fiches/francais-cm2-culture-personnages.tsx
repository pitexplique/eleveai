// ─── Fiche de cours : héros, merveilleux et autres vies (CM2) ─────────────────
// SIXIÈME FICHE DU CHANTIER CM2, et PREMIÈRE DU DOMAINE DE LA CULTURE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». Trois entrées :
// « Découvrir des héroïnes, des héros », « Se confronter au merveilleux, à
// l'étrange », « Imaginer et vivre d'autres vies ».
//
// ⭐ AUCUNE JUMELLE EN 6e — c'est la première notion du CM2 dans ce cas depuis le
// début du chantier. La 6e a ses propres entrées (récits des origines, aventure,
// monstres ; poésie et théâtre), et le CM2 les siennes. Pas de tableau de
// séparation à faire : les micros ne se croisent nulle part.
// ⚠️ Une seule vigilance : le pool HEROS du cycle 3 et le pool HEROS de la 5e
// portent le même nom dans deux fichiers différents. Ce ne sont pas les mêmes
// questions, et la 5e ne se transpose pas ici.
//
// ⭐⭐ LA DÉCOUVERTE QUI TIENT LES TROIS ENTRÉES, ET LE PROGRAMME LA NOMME
// LUI-MÊME DANS SON TROISIÈME TITRE : « IMAGINER ET VIVRE D'AUTRES VIES ». Les
// trois entrées sont trois façons de vivre autre chose sans quitter sa chaise —
// affronter une épreuve plus grande que soi avec le héros, éprouver la peur en
// sécurité avec le merveilleux, se projeter dans une existence qui n'est pas la
// sienne avec les récits de vie.
//
// ⭐⭐ ET LA NUANCE QUE LE POOL POSE DEUX FOIS, DANS DEUX ITEMS DIFFÉRENTS —
// donc délibérément : LIRE D'AUTRES VIES N'EST PAS S'ÉCHAPPER DE LA SIENNE.
//   · « Que veut dire vivre d'autres vies ? » → se projeter dans une existence
//     qui n'est pas la sienne. ⛔ Leurre écarté : « oublier un moment la sienne ».
//   · « Qu'apporte un récit qui se passe loin de chez soi ? » → on découvre
//     d'autres façons de vivre, ET ON COMPREND MIEUX LA SIENNE. ⛔ Leurre écarté :
//     « et on oublie un peu la sienne ».
// Deux fois le même leurre, deux fois écarté. Le programme refuse la lecture
// comme évasion, et c'est ce qui donne son sens au mot EMPATHIE.
//
// ⭐ ET TROIS FAUSSES DÉFINITIONS DU HÉROS, POSÉES EN LEURRES : la force, la
// constance, la victoire. Aucune ne tient. Ce qui fait un héros, c'est qu'il
// AFFRONTE UNE ÉPREUVE PLUS GRANDE QUE LUI ET QUE SON CHOIX NOUS APPREND QUELQUE
// CHOSE — et le BO demande même de percevoir « leurs éventuelles fragilités ».
//
// ⭐ MERVEILLEUX ET ÉTRANGE SE SÉPARENT EN UNE PHRASE : dans le merveilleux la
// magie VA DE SOI, personne ne s'en étonne ; dans l'étrange elle INQUIÈTE et
// reste inexpliquée. ⚠️ Le pool met l'INVERSION en premier leurre — le piège le
// plus instructif, car il oblige à savoir dans quel sens va la règle.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Bande `nature` centrée sur son mot.
//
// Alignée sur les pools HEROS, MERVEILLEUX et AUTRES_VIES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_personnages`) :
// - cm2_cult_heros            → propriétés 1 à 4, méthode 1, usage 1, exemples 1 et 2
// - cm2_cult_merveilleux      → propriétés 5 à 7, formule, méthode 2, usage 2,
//                               exemples 3 et 4
// - cm2_cult_autres_vies      → figure, propriétés 8 et 9, méthode 3, usage 3,
//                               exemple 5
// - cm2_cult_personnages_defi → propriété 10, méthode 4, usage 4, exemple 6

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

/** Les fausses définitions du héros. ⚠️ Cellules courtes : à la largeur d'un
 *  bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on vit autre chose sans bouger ───────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : vivre autre chose sans quitter sa place.
const vivreSansPartir = phrase({
  mots: [
    { texte: "ta chaise" },
    { texte: "une autre vie", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et pourtant", type: "question" }],
  legende: "Trois entrées, une seule chose : vivre autre chose sans quitter sa place.",
});

// ⭐⭐ LE LEURRE ÉCARTÉ DEUX FOIS : lire n'est pas s'échapper.
const pasSechapper = phrase({
  mots: [
    { texte: "oublier la sienne", barre: true },
    { texte: "la comprendre", focus: true },
  ],
  legende: "Le programme écarte l'évasion deux fois : on ne s'oublie pas, on se comprend.",
});

// ── LE HÉROS : l'épreuve et le choix.
const epreuveEtChoix = phrase({
  mots: [
    { texte: "l'épreuve" },
    { texte: "le choix", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "puis", type: "question" }],
  legende: "Ce n'est pas la force qui fait le héros : c'est l'épreuve, et ce qu'il choisit.",
});

const grilleFaussesDefinitions = grille({
  headers: ["On croit que c'est", "C'est plutôt"],
  rows: [
    { values: ["la force", "l'épreuve"] },
    { values: ["ne pas douter", "le choix"] },
    { values: ["la victoire", "ce qu'on apprend"] },
    { values: ["être parfait", "ses fragilités"] },
  ],
  caption: "Trois fausses définitions, et le programme les écarte une par une.",
});

const grilleFaussesDefinitionsForce = grille({
  headers: ["On croit que c'est", "C'est plutôt"],
  rows: [
    { values: ["la force", "l'épreuve"] },
    { values: ["ne pas douter", "le choix"] },
    { values: ["la victoire", "ce qu'on apprend"] },
    { values: ["être parfait", "ses fragilités"] },
  ],
  highlight: { row: 0 },
  caption: "Un héros n'est pas celui qui peut le plus.",
});

const faiblesseInteressante = phrase({
  mots: [
    { texte: "une faiblesse" },
    { texte: "intéressant", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "le rend", type: "question" }],
  legende: "Le programme demande de percevoir « leurs éventuelles fragilités ».",
});

// ── LE MERVEILLEUX ET L'ÉTRANGE : la même magie, deux accueils.
const merveilleuxEtEtrange = phrase({
  mots: [
    { texte: "« ça va de soi »", nature: "merveilleux" },
    { texte: "« ça inquiète »", nature: "étrange" },
  ],
  legende: "La même magie : admise d'un côté, inexpliquée de l'autre.",
});

const personneNeSenEtonne = phrase({
  mots: [
    { texte: "une fée" },
    { texte: "personne ne s'étonne", focus: true },
  ],
  legende: "Le conte ne cherche jamais à rendre son ogre vraisemblable.",
});

const peurEnSecurite = phrase({
  mots: [
    { texte: "la peur" },
    { texte: "à distance", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "éprouvée", type: "question" }],
  legende: "On l'éprouve en sécurité — et c'est ce qui permet de l'explorer.",
});

// ── LES AUTRES VIES : l'empathie, et l'intérieur du personnage.
const empathie = phrase({
  mots: [
    { texte: "ce qu'il ressent" },
    { texte: "tu le ressens", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "L'empathie : ressentir ce que ressent un autre. Ce n'est pas la pitié.",
});

const journalIntime = phrase({
  mots: [
    { texte: "un journal" },
    { texte: "ses pensées", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "ouvre", type: "question" }],
  legende: "Il ouvre l'intérieur du personnage — ce qu'un récit extérieur ne montre pas.",
});

// ── LE DÉFI : reconnaitre laquelle des trois entrées.
const troisEntrees = phrase({
  mots: [
    { texte: "un héros", focus: true },
    { texte: "une fée", focus: true },
    { texte: "une vie", focus: true },
  ],
  legende: "Trois marques, trois entrées — et un même récit peut en porter deux.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCulturePersonnagesCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "culture-personnages",
  titre: "Héros, merveilleux et autres vies en CM2 (2026-2027)",
  accroche:
    "Trois entrées du programme, et une seule chose : VIVRE AUTRE CHOSE SANS QUITTER SA CHAISE. Affronter une épreuve plus grande que soi avec le héros. Éprouver la peur en sécurité avec le merveilleux. Se projeter dans une existence qui n'est pas la sienne avec les récits de vie. ⛔ Et attention : ce n'est PAS s'échapper de sa propre vie — le programme écarte cette idée deux fois.",
  identite: [
    { label: "Mots clés", valeur: "Héros, épreuve, merveilleux, étrange, empathie" },
    { label: "Le secret", valeur: "Lire d'autres vies n'est pas fuir la sienne" },
    { label: "Outil", valeur: "Quelle épreuve, et quel choix ?" },
  ],
  definition: {
    texte:
      "UN HÉROS n'est pas celui qui a le plus de force : c'est celui qui AFFRONTE UNE ÉPREUVE PLUS GRANDE QUE LUI, et dont le CHOIX nous apprend quelque chose. Ni la force, ni le fait de ne jamais douter, ni la victoire finale ne suffisent — et le programme demande même de percevoir ses FRAGILITÉS, car ce sont souvent elles qui le rendent intéressant. On le rencontre dans l'épopée, le conte, le roman, la fable et le théâtre. LE MERVEILLEUX se distingue de L'ÉTRANGE par une seule chose : dans le merveilleux, la magie VA DE SOI et personne ne s'en étonne — une fée, un ogre, une baguette y sont admis sans discussion ; dans l'étrange, elle INQUIÈTE et reste inexpliquée. Le merveilleux permet d'éprouver LA PEUR EN SÉCURITÉ, à distance, en lisant. VIVRE D'AUTRES VIES, enfin, c'est SE PROJETER DANS UNE EXISTENCE QUI N'EST PAS LA SIENNE : un récit qui se passe loin de chez soi fait découvrir d'autres façons de vivre ET COMPRENDRE MIEUX LA SIENNE. C'est ce que le programme appelle développer l'EMPATHIE — la capacité à ressentir ce que ressent un autre.",
  },
  figure: {
    schema: pile(vivreSansPartir, pasSechapper),
    legende:
      "En haut, ce que les trois entrées ont en commun : tu n'as pas bougé, et pourtant tu as vécu autre chose. En bas, la précision qui compte, et le programme y tient tellement qu'il l'écrit deux fois, dans deux questions différentes : lire d'autres vies n'est pas OUBLIER la sienne — c'est la comprendre mieux. Les deux fois, « oublier un peu la sienne » est proposé comme réponse, et les deux fois il est écarté. La lecture n'est pas une porte de sortie : c'est un détour qui ramène.",
  },
  proprietes: [
    {
      titre: "Un héros affronte une épreuve plus grande que lui",
      texte:
        "Et son choix nous apprend quelque chose. Ce sont les deux conditions, et aucune ne parle de force.",
      schema: epreuveEtChoix,
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Trois fausses définitions, écartées une par une",
      texte:
        "Ce n'est pas la force qu'il aurait en plus. Ce n'est pas de ne jamais douter. Et ce n'est pas la victoire — un héros peut perdre.",
      schema: grilleFaussesDefinitionsForce,
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Un héros peut avoir des faiblesses",
      texte:
        "Et c'est souvent ce qui le rend intéressant. Le programme demande explicitement de percevoir ses éventuelles fragilités.",
      schema: faiblesseInteressante,
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "On en rencontre dans presque tous les genres",
      texte:
        "L'épopée, le conte, le roman, la fable, le théâtre. Pas dans le documentaire ni la notice : il faut un récit pour qu'il y ait une épreuve.",
      schema: grilleFaussesDefinitions,
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Dans le merveilleux, la magie va de soi",
      texte:
        "Personne ne s'en étonne. Une fée, un ogre, une baguette sont admis sans discussion — le conte ne cherche jamais à les rendre vraisemblables.",
      schema: personneNeSenEtonne,
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "Dans l'étrange, elle inquiète et reste inexpliquée",
      texte:
        "C'est toute la différence, et elle tient dans le sens : l'un rassure et enchante, l'autre trouble et laisse un doute.",
      schema: merveilleuxEtEtrange,
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "On y éprouve la peur en sécurité",
      texte:
        "Pas parce que ça finit bien, pas parce que la magie n'existe pas : parce qu'on la ressent à distance, en lisant. C'est ce qui permet de l'explorer.",
      schema: peurEnSecurite,
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "Vivre d'autres vies, c'est se projeter",
      texte:
        "Dans une existence qui n'est pas la sienne. Ni oublier la sienne, ni accumuler des histoires, ni choisir des vies qu'on envie.",
      schema: vivreSansPartir,
      micros: ["cm2_cult_autres_vies"],
    },
    {
      titre: "L'empathie n'est pas la pitié",
      texte:
        "C'est la capacité à RESSENTIR ce que ressent un autre — pas à le plaindre, pas à deviner ce qu'il va faire. Et cela se développe en lisant.",
      schema: pile(empathie, journalIntime),
      micros: ["cm2_cult_autres_vies"],
    },
    {
      titre: "Le défi : reconnaitre l'entrée",
      texte:
        "Une épreuve et un choix : le héros. Une magie que personne ne discute : le merveilleux. Une existence qu'on suit de l'intérieur : une autre vie.",
      schema: troisEntrees,
      micros: ["cm2_cult_personnages_defi"],
    },
  ],
  reel: {
    texte:
      "Tu sais déjà que la peur d'un film n'est pas la peur d'un danger : tu as le cœur qui bat, et tu ne bouges pas de ton fauteuil. C'est exactement ce que dit le programme du merveilleux — on éprouve la peur EN SÉCURITÉ, et c'est pour cela qu'on peut l'explorer. Tu sais aussi reconnaitre un vrai héros de fiction : ce n'est jamais celui qui gagne facilement, c'est celui qui a quelque chose à perdre et qui y va quand même. Et la dernière idée, tu l'as peut-être déjà éprouvée sans la nommer : après un livre ou un film sur quelqu'un de très différent de toi, tu ne t'es pas oublié — tu t'es plutôt regardé autrement. Le programme appelle cela l'empathie, et il refuse expressément d'appeler la lecture une évasion.",
  },
  historique: {
    texte:
      "Le mot « empathie » est récent en français : il n'apparait qu'au XXe siècle, traduit de l'allemand Einfühlung, qui veut dire à peu près « sentir dedans ». Avant lui, on ne disposait que de « sympathie » — du grec sun-pathein, « sentir AVEC » — et de « pitié », qui suppose qu'on se place au-dessus de celui qu'on plaint. Il a donc fallu inventer un mot pour désigner autre chose : non pas souffrir à côté de quelqu'un ni le plaindre, mais ressentir depuis l'intérieur ce qu'il ressent. Que ce mot ait manqué si longtemps en dit long sur la difficulté du geste — et sur ce que la lecture d'un récit de vie fait travailler quand elle te met dans la tête d'un autre.",
  },
  formule: {
    contexte: "La question qui reconnait un héros, et qui écarte les trois fausses pistes.",
    expression: "quelle épreuve, et quel choix ?",
    legende:
      "Pas « quelle force ». Si le personnage affronte quelque chose de plus grand que lui, et si ce qu'il décide t'apprend quelque chose, c'est un héros — même s'il est faible, même s'il doute, même s'il perd à la fin. Les trois autres définitions se cochent vite et ne tiennent pas.",
    schema: epreuveEtChoix,
  },
  methode: [
    {
      titre: "Chercher l'épreuve avant le personnage",
      texte:
        "Qu'est-ce qui est plus grand que lui dans cette histoire ? La réponse te donne le héros, et pas l'inverse.",
      schema: epreuveEtChoix,
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Regarder qui s'étonne",
      texte:
        "Si les personnages trouvent la magie normale, c'est du merveilleux. Si elle les inquiète et n'est jamais expliquée, c'est de l'étrange.",
      schema: merveilleuxEtEtrange,
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "Chercher l'émotion, pas la ressemblance",
      texte:
        "Le personnage vit ailleurs, autrement, à une autre époque. Ce que tu peux partager, c'est ce qu'il ressent — et cela ne dépend d'aucun décor.",
      schema: empathie,
      micros: ["cm2_cult_autres_vies"],
    },
    {
      titre: "Nommer l'entrée en une phrase",
      texte:
        "« Il y a une épreuve » ; « la magie n'étonne personne » ; « on suit une vie de l'intérieur ». Une phrase suffit, et elle se justifie.",
      schema: troisEntrees,
      micros: ["cm2_cult_personnages_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour parler d'un personnage sans dire « il est fort »",
      detail:
        "Dis l'épreuve et le choix. C'est plus court, c'est plus juste, et cela marche même sur un personnage qui perd.",
      schema: grilleFaussesDefinitionsForce,
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Pour classer un récit fantastique",
      detail:
        "La question n'est pas « y a-t-il de la magie » — il y en a des deux côtés. C'est : est-ce que quelqu'un s'en étonne ?",
      schema: personneNeSenEtonne,
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "Pour entrer dans un livre qui semble loin de toi",
      detail:
        "Ne cherche pas ce qui te ressemble dans sa vie : cherche ce qu'il ressent. Cela, tu l'as déjà ressenti.",
      schema: empathie,
      micros: ["cm2_cult_autres_vies"],
    },
    {
      titre: "Pour dire pourquoi un livre t'a marqué",
      detail:
        "« Il m'a fait comprendre quelque chose sur moi » est une meilleure phrase que « il m'a fait oublier ma journée » — et c'est ce que le programme attend.",
      schema: pasSechapper,
      micros: ["cm2_cult_personnages_defi"],
    },
  ],
  exemples: [
    {
      titre: "Ce qui fait un héros",
      donnees: "« Qu'est-ce qui fait d'un personnage une héroïne ou un héros ? »",
      schema: epreuveEtChoix,
      question: "Qu'est-ce qui le fait ?",
      solution:
        "IL AFFRONTE UNE ÉPREUVE PLUS GRANDE QUE LUI, ET SON CHOIX NOUS APPREND QUELQUE CHOSE. Pas une force que les autres n'ont pas. Pas de traverser le récit sans jamais douter. Pas de finir par gagner. Ces trois-là sont de vraies croyances, et elles sont fausses toutes les trois.",
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Les faiblesses",
      donnees: "« Un héros peut-il avoir des faiblesses ? »",
      schema: faiblesseInteressante,
      question: "Le peut-il ?",
      solution:
        "OUI, ET C'EST SOUVENT CE QUI LE REND INTÉRESSANT. Pas « non, un héros sans faille est le modèle » ; pas « oui, mais il doit les avoir surmontées avant la fin » ; pas « seulement dans les récits d'aujourd'hui ». Le programme demande de percevoir ses fragilités — au présent.",
      micros: ["cm2_cult_heros"],
    },
    {
      titre: "Merveilleux ou étrange",
      donnees: "« Quelle est la différence entre le merveilleux et l'étrange ? »",
      schema: merveilleuxEtEtrange,
      question: "Quelle différence ?",
      solution:
        "DANS LE MERVEILLEUX LA MAGIE VA DE SOI ; DANS L'ÉTRANGE ELLE INQUIÈTE ET RESTE INEXPLIQUÉE. ⚠️ Fais attention au sens : le piège le plus fréquent est l'inversion exacte de cette phrase. Ce n'est ni une question d'âge du héros, ni d'époque du récit.",
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "La peur sans danger",
      donnees: "« Pourquoi les contes merveilleux font-ils peur sans danger ? »",
      schema: peurEnSecurite,
      question: "Pourquoi ?",
      solution:
        "PARCE QU'ON ÉPROUVE LA PEUR EN SÉCURITÉ, À DISTANCE, EN LISANT. Pas parce qu'ils finissent bien — beaucoup finissent mal. Pas parce que la magie n'existe pas — pendant la lecture, elle existe. Pas parce qu'un adulte lit à côté. C'est la distance qui protège.",
      micros: ["cm2_cult_merveilleux"],
    },
    {
      titre: "Un récit qui se passe loin",
      donnees: "« Qu'apporte la lecture d'un récit qui se passe loin de chez soi ? »",
      schema: pasSechapper,
      question: "Qu'apporte-t-elle ?",
      solution:
        "ON DÉCOUVRE D'AUTRES FAÇONS DE VIVRE, ET ON COMPREND MIEUX LA SIENNE. Regarde bien le leurre : « et on OUBLIE un peu la sienne » — même début, fin opposée. Le programme refuse la lecture comme évasion : elle est un détour qui ramène, et c'est cela qu'il appelle l'empathie.",
      micros: ["cm2_cult_autres_vies"],
    },
    {
      titre: "Le défi",
      donnees: "« Un enfant se réveille dans une maison où les objets parlent, et cela ne l'étonne pas. »",
      schema: troisEntrees,
      question: "De quelle entrée relève ce récit ?",
      solution:
        "DU MERVEILLEUX — et la preuve est dans les quatre derniers mots : « cela ne l'étonne pas ». Si l'enfant s'était inquiété et si rien n'avait été expliqué, ce serait de l'étrange. La magie est la même : c'est l'ACCUEIL qu'on lui fait qui départage.",
      micros: ["cm2_cult_personnages_defi"],
    },
  ],
  pieges: [
    "Croire qu'un héros est celui qui a le plus de force : c'est l'épreuve et le choix.",
    "Croire qu'un héros doit gagner : il peut perdre, et rester un héros.",
    "Refuser les faiblesses à un héros : le programme demande de les percevoir.",
    "Inverser merveilleux et étrange : dans le merveilleux, la magie NE surprend personne.",
    "Expliquer la peur sans danger par « ça finit bien » : c'est la distance qui protège.",
    "Dire que lire fait oublier sa vie : le programme écarte cette réponse deux fois.",
    "Confondre empathie et pitié : l'une ressent avec, l'autre regarde d'au-dessus.",
  ],
  aRetenir: [
    "Trois entrées, une seule chose : vivre autre chose sans quitter sa chaise.",
    "Un héros affronte une épreuve plus grande que lui, et son choix nous apprend.",
    "Merveilleux : la magie va de soi. Étrange : elle inquiète et reste inexpliquée.",
    "On éprouve la peur en sécurité — c'est la distance qui protège.",
    "Lire d'autres vies n'est pas oublier la sienne : c'est la comprendre mieux.",
  ],
  entrainement: [
    {
      question: "« Dans quels genres rencontre-t-on le plus souvent des héros ? »",
      correction: "L'épopée, le conte, le roman, la fable, le théâtre.",
      micros: ["cm2_cult_heros"],
    },
    {
      question: "« Qu'est-ce qui pousse un héros à agir ? »",
      correction: "Un but, une promesse ou une valeur qu'il défend.",
      micros: ["cm2_cult_heros"],
    },
    {
      question: "« Une fée, un ogre, une baguette magique appartiennent… »",
      correction: "Au merveilleux.",
      micros: ["cm2_cult_merveilleux"],
    },
    {
      question: "« Dans un conte merveilleux, les faits magiques… »",
      correction: "Sont admis : personne ne s'en étonne.",
      micros: ["cm2_cult_merveilleux"],
    },
    {
      question: "« L'empathie, c'est… »",
      correction: "La capacité à ressentir ce que ressent un autre.",
      micros: ["cm2_cult_autres_vies"],
    },
    {
      question: "« Dans un roman, un journal intime sert à… »",
      correction: "Faire entendre les pensées du personnage.",
      micros: ["cm2_cult_personnages_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesCulturePersonnagesCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Héros et merveilleux - CM2",
    section: {
      type: "objectif",
      phrase: "Vivre autre chose sans quitter sa chaise",
      sousPhrase:
        "Une épreuve plus grande que soi, une peur éprouvée en sécurité, une vie qui n'est pas la sienne.",
      encadre: {
        titre: "L'idée",
        texte: "⛔ Mais ce n'est PAS s'échapper : le programme l'écarte deux fois.",
      },
    },
  },
  {
    titre: "Ce qui fait un héros",
    badge: "Héros et merveilleux - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Une épreuve", texte: "Plus grande que lui. C'est la première condition." },
        { titre: "Un choix", texte: "Et ce choix nous apprend quelque chose." },
        { titre: "Pas la force", texte: "Ni la victoire, ni de ne jamais douter." },
        { titre: "Ses fragilités", texte: "Le programme demande de les percevoir." },
      ],
    },
    schema: grilleFaussesDefinitions,
  },
  {
    titre: "Merveilleux ou étrange",
    badge: "Héros et merveilleux - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Le merveilleux",
        contenu: "La magie VA DE SOI : personne ne s'en étonne, rien n'est expliqué.",
      },
      droite: {
        titre: "L'étrange",
        contenu: "Elle INQUIÈTE et reste inexpliquée. L'un enchante, l'autre trouble.",
      },
    },
    schema: merveilleuxEtEtrange,
  },
  {
    titre: "La peur en sécurité",
    badge: "Héros et merveilleux - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Ce n'est pas parce que ça finit bien — beaucoup de contes finissent mal.",
        "Ce n'est pas parce que la magie n'existe pas — pendant la lecture, elle existe.",
        "C'EST LA DISTANCE : on éprouve la peur sans la subir.",
        "Et c'est ce qui permet de l'explorer.",
      ],
    },
    schema: peurEnSecurite,
  },
  {
    titre: "Lire n'est pas fuir",
    badge: "Héros et merveilleux - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« On découvre d'autres façons de vivre, et on OUBLIE un peu la sienne. » ⛔ Faux.",
        "« … et on COMPREND MIEUX la sienne. » ⭐ C'est cela.",
        "Le programme écarte l'évasion deux fois, dans deux questions.",
        "Et c'est ce qu'il appelle développer l'EMPATHIE.",
      ],
    },
    schema: pasSechapper,
  },
  {
    titre: "À vous",
    badge: "Héros et merveilleux - CM2",
    section: {
      type: "exercice",
      enonce: "« Un enfant se réveille dans une maison où les objets parlent, et cela ne l'étonne pas. »",
      question: "Merveilleux ou étrange ?",
      indice: "La magie est la même des deux côtés. Regarde qui s'étonne.",
      correction:
        "MERVEILLEUX — la preuve est dans les quatre derniers mots. S'il s'était inquiété et si rien n'avait été expliqué, ce serait de l'étrange.",
    },
    schema: personneNeSenEtonne,
  },
];
