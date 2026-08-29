// ─── Fiche de cours : lire des documents et croiser des informations (CM2) ────
// QUATRIÈME FICHE DU CHANTIER CM2.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année ». ⛔ MÊME PROGRAMME QUE
// LA 6e — la séparation se fait sur les MICROS.
//
// ⛔ COMPARAISON FAITE MICRO PAR MICRO AVEC `francais-6e-comprehension-documents` :
//
//   | 6e | CM2 (ici) |
//   |---|---|
//   | la NATURE et la SOURCE d'un document | les ÉLÉMENTS d'un document composite |
//   | l'IMAGE FIXE : cadrage, hors-champ, décrire avant d'interpréter | — (aucune micro d'image au CM2) |
//   | comparer deux documents : convergents, divergents | CROISER deux documents pour compléter |
//   | croiser pour répondre | PRÉLEVER PUIS COMBINER, en partant de la question |
//
// ⚠️ Le CM2 n'a AUCUNE micro d'image fixe : le cadrage, le hors-champ et la
// règle « décrire avant d'interpréter » appartiennent entièrement à la 6e. Ne
// pas les redescendre ici.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE, ET L'ITEM FIXE LA DÉMONTRE EN UNE QUESTION :
// LA RÉPONSE N'EST DANS AUCUN DES DEUX DOCUMENTS. « Une affiche dit que le musée
// ouvre à 9 h ; une autre qu'il est fermé le mardi. Peux-tu le visiter mardi à
// 10 h ? » — Non. Or aucune des deux affiches ne dit « non ». La première dit
// oui, la seconde parle d'un autre jour, et c'est LEUR RENCONTRE qui tranche.
// C'est le geste le plus difficile du programme et le plus utile de la vie
// courante, et il se démontre en dix secondes.
//
// ⭐ ET L'ORDRE EST DANS LE NOM DU MICRO : « PRÉLEVER PUIS COMBINER des
// informations POUR RÉPONDRE À UNE QUESTION ». On part de la question, pas des
// documents. Lire un document en entier avant de savoir ce qu'on y cherche est
// la façon la plus sure de s'y perdre — et c'est ce que font les élèves.
//
// ⭐ UN DOCUMENT COMPOSITE SE NOMME AVANT DE SE LIRE : le titre donne le sujet,
// la légende dit ce que l'image montre, le schéma montre une organisation, le
// tableau porte les chiffres, la source dit d'où ça vient. Chacun répond à une
// autre sorte de question — savoir lequel regarder fait gagner le plus de temps.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool DOCUMENT de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm2_fr_fixed_comp_5` et `_6` de
// lib/tutor-v4/questionBank/cm2/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `comprehension_documents`) :
// - cm2_doc_composite        → propriétés 1 à 4, méthode 1, usage 1, exemples 1 et 2
// - cm2_doc_croiser_infos    → figure, propriétés 5 à 7, formule, méthode 2,
//                              usage 2, exemples 3 et 4
// - cm2_doc_prelever_combiner → propriétés 8 et 9, méthode 3, usage 3, exemple 5
// - cm2_comp_documents_defi  → propriété 10, méthode 4, usage 4, exemple 6

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

/** Les éléments d'un document composite. ⚠️ Cellules courtes : à la largeur d'un
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

// ─── Ce qui se dessine quand deux documents se rencontrent ────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : la réponse n'est dans aucun des deux.
const reponseDansAucun = phrase({
  mots: [
    { texte: "ouvre à 9 h" },
    { texte: "la réponse", focus: true },
    { texte: "fermé le mardi" },
  ],
  liens: [
    { de: 0, vers: 1, label: "une moitié", type: "question" },
    { de: 2, vers: 1, label: "l'autre", type: "question" },
  ],
  legende: "Aucune des deux affiches ne dit « non ». C'est leur rencontre qui le dit.",
});

const uneSeuleNeSuffitPas = phrase({
  mots: [
    { texte: "une seule affiche", barre: true },
    { texte: "les deux", focus: true },
  ],
  legende: "Avec la première seule, tu répondais oui — et tu trouvais porte close.",
});

// ── LE DOCUMENT COMPOSITE : nommer avant de lire.
const grilleComposite = grille({
  headers: ["L'élément", "Ce qu'il donne"],
  rows: [
    { values: ["le titre", "le sujet"] },
    { values: ["la légende", "ce qu'on voit"] },
    { values: ["le schéma", "l'organisation"] },
    { values: ["le tableau", "les chiffres"] },
  ],
  caption: "Chacun répond à une autre sorte de question.",
});

const grilleCompositeSchema = grille({
  headers: ["L'élément", "Ce qu'il donne"],
  rows: [
    { values: ["le titre", "le sujet"] },
    { values: ["la légende", "ce qu'on voit"] },
    { values: ["le schéma", "l'organisation"] },
    { values: ["le tableau", "les chiffres"] },
  ],
  highlight: { row: 2 },
  caption: "Un schéma montre et explique par l'image.",
});

const schemaEtLegende = phrase({
  mots: [
    { texte: "le schéma" },
    { texte: "sa légende", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "explique", type: "question" }],
  legende: "Un schéma sans légende montre — il n'explique pas encore.",
});

const ouTrouverQuoi = grille({
  headers: ["Tu cherches", "Tu regardes"],
  rows: [
    { values: ["une page", "le sommaire"] },
    { values: ["un symbole", "la légende"] },
    { values: ["l'origine", "la source"] },
    { values: ["une date", "l'emballage"] },
  ],
  caption: "Savoir où regarder fait gagner plus de temps que lire vite.",
});

// ── CROISER : ce que chacun apporte.
const chacunUnMorceau = phrase({
  mots: [
    { texte: "le texte" },
    { texte: "le tableau" },
    { texte: "la réponse", focus: true },
  ],
  liens: [
    { de: 0, vers: 2, label: "apporte", type: "question" },
    { de: 1, vers: 2, label: "aussi", type: "question" },
  ],
  legende: "Chacun donne un morceau, et aucun ne donne la réponse entière.",
});

const completerNestPasRepeter = phrase({
  mots: [
    { texte: "redire pareil", barre: true },
    { texte: "compléter", focus: true },
  ],
  legende: "Croiser deux documents, ce n'est pas vérifier qu'ils disent la même chose.",
});

// ── PRÉLEVER : partir de la question.
const partirDeLaQuestion = phrase({
  mots: [
    { texte: "la question", focus: true },
    { texte: "le document" },
  ],
  liens: [{ de: 0, vers: 1, label: "on part de", type: "question" }],
  legende: "Prélever, c'est aller chercher en sachant ce qu'on cherche.",
});

const toutLirePuisChercher = phrase({
  mots: [
    { texte: "tout lire d'abord", barre: true },
    { texte: "chercher", focus: true },
  ],
  legende: "Lire en entier avant de savoir quoi chercher est la façon de s'y perdre.",
});

// ── LE DÉFI : trois documents pour une question.
const troisDocuments = phrase({
  mots: [
    { texte: "un texte", focus: true },
    { texte: "un tableau", focus: true },
    { texte: "une image", focus: true },
  ],
  legende: "Trois documents, une seule question : chacun en porte un morceau.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheComprehensionDocumentsCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "comprehension-documents",
  titre: "Lire des documents et croiser des informations en CM2 (2026-2027)",
  accroche:
    "Une affiche dit que le musée ouvre à 9 h. Une autre qu'il est fermé le mardi. Peux-tu le visiter mardi à 10 h ? Non — et remarque bien : AUCUNE DES DEUX AFFICHES NE DIT « NON ». La première dit oui, la seconde parle d'un autre sujet. La réponse n'est écrite nulle part : elle nait de leur rencontre. C'est le geste le plus utile de toute la lecture de documents.",
  identite: [
    { label: "Mots clés", valeur: "Composite, légende, croiser, prélever" },
    { label: "Le secret", valeur: "La réponse n'est dans aucun des deux" },
    { label: "Outil", valeur: "Qu'est-ce que je cherche, exactement ?" },
  ],
  definition: {
    texte:
      "Un DOCUMENT COMPOSITE mêle plusieurs éléments sur la même page, et chacun répond à une autre sorte de question : le TITRE donne le sujet, la LÉGENDE dit ce que l'image montre et d'où elle vient, le SCHÉMA montre une organisation ou un fonctionnement par l'image, le TABLEAU porte les chiffres, la SOURCE dit d'où vient le document, le SOMMAIRE dit à quelle page aller. Savoir lequel regarder fait gagner plus de temps que lire vite. CROISER DEUX DOCUMENTS, ce n'est pas vérifier qu'ils disent la même chose : c'est les faire se compléter — et souvent, la réponse cherchée n'est écrite ni dans l'un ni dans l'autre, elle nait de leur rencontre. Enfin PRÉLEVER PUIS COMBINER : l'ordre est dans le nom, et il commence par LA QUESTION. On va chercher une information en sachant ce qu'on cherche ; lire un document en entier avant de le savoir est la façon la plus sure de s'y perdre.",
  },
  figure: {
    schema: pile(reponseDansAucun, uneSeuleNeSuffitPas),
    legende:
      "Deux flèches partent de deux affiches et tombent sur une réponse qui n'est écrite sur aucune des deux. « Ouvre à 9 h » dirait plutôt oui ; « fermé le mardi » ne parle même pas d'horaires. Prises séparément, ni l'une ni l'autre ne répond à la question posée — c'est leur rencontre qui tranche, et c'est cela qu'on appelle croiser. En bas, la conséquence pratique : avec une seule des deux affiches, tu répondais oui en toute bonne foi, et tu trouvais porte close.",
  },
  proprietes: [
    {
      titre: "Un document composite a des éléments qui se nomment",
      texte:
        "Le titre, la légende, le schéma, le tableau, la source. Les nommer n'est pas du vocabulaire : c'est savoir lequel regarder selon ce qu'on cherche.",
      schema: grilleComposite,
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Un schéma montre et explique par l'image",
      texte:
        "Il dit en un dessin ce que le texte dirait en un paragraphe : une organisation, un fonctionnement, un ordre.",
      schema: grilleCompositeSchema,
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Sans sa légende, un schéma ne fait que montrer",
      texte:
        "La légende nomme ce qu'on voit et explique les symboles. C'est elle qui transforme un dessin en information.",
      schema: schemaEtLegende,
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Chaque élément répond à une autre question",
      texte:
        "Où aller dans le livre ? le sommaire. Que veut dire ce symbole ? la légende. D'où ça vient ? la source. Jusqu'à quand ? la date.",
      schema: ouTrouverQuoi,
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Croiser, ce n'est pas vérifier",
      texte:
        "Deux documents ne servent pas à se confirmer l'un l'autre : ils servent à se compléter. Redire la même chose n'apporte rien de neuf.",
      schema: completerNestPasRepeter,
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "La réponse n'est dans aucun des deux",
      texte:
        "« Ouvre à 9 h » et « fermé le mardi » : ni l'une ni l'autre affiche ne dit non. C'est leur rencontre qui répond.",
      schema: reponseDansAucun,
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "Une seule information peut tromper",
      texte:
        "Avec la première affiche seule, tu répondais oui en toute bonne foi. Ce n'est pas une erreur de lecture : c'est une information incomplète.",
      schema: uneSeuleNeSuffitPas,
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "On part de la question, pas du document",
      texte:
        "Prélever, c'est aller chercher précisément, en sachant ce qu'on cherche. L'ordre est dans le nom du geste : prélever PUIS combiner.",
      schema: partirDeLaQuestion,
      micros: ["cm2_doc_prelever_combiner"],
    },
    {
      titre: "Tout lire d'abord fait perdre le fil",
      texte:
        "Un document long lu en entier sans savoir ce qu'on y cherche ne laisse presque rien. La question, elle, tient l'attention.",
      schema: toutLirePuisChercher,
      micros: ["cm2_doc_prelever_combiner"],
    },
    {
      titre: "Le défi : trois documents, une question",
      texte:
        "Un texte, un tableau, une image. Chacun en porte un morceau, et la réponse se fabrique en les mettant bout à bout.",
      schema: pile(troisDocuments, chacunUnMorceau),
      micros: ["cm2_comp_documents_defi"],
    },
  ],
  reel: {
    texte:
      "Tu croises des documents plusieurs fois par semaine sans lui donner ce nom. Regarder les horaires d'un bus ET vérifier si c'est un jour férié : ni l'un ni l'autre ne dit « il n'y a pas de bus », et pourtant tu le sais. Vérifier qu'un jeu est en stock ET qu'il coute moins que ce que tu as : deux informations qui viennent de deux endroits, et une décision qui n'est écrite nulle part. C'est exactement le musée fermé le mardi. Et l'erreur, tu l'as faite aussi : partir sur une seule information, en toute bonne foi, et arriver devant une porte close. Ce n'est pas qu'on avait mal lu — c'est qu'on n'avait lu qu'une moitié.",
  },
  historique: {
    texte:
      "Le document composite a posé un problème pratique dès qu'on a voulu montrer et expliquer en même temps. Quand Diderot et d'Alembert publient leur Encyclopédie au XVIIIe siècle, ils la coupent en deux : dix-sept volumes de texte d'un côté, onze volumes de PLANCHES gravées de l'autre. Un lecteur qui voulait comprendre comment on fabriquait une épingle devait ouvrir deux volumes à la fois, sur la même table, et faire l'aller-retour entre le mot et l'image. C'était couteux, encombrant — et c'était le prix à payer, parce que graver une planche et imprimer un texte ne se font pas de la même façon. Croiser deux documents n'est donc pas un exercice scolaire : c'est ce qu'ont fait tous les lecteurs de l'Encyclopédie, page après page.",
  },
  formule: {
    contexte: "La question à se poser AVANT d'ouvrir un document.",
    expression: "qu'est-ce que je cherche, exactement ?",
    legende:
      "Un horaire ? un mot ? un chiffre ? une date ? La réponse te dit quel élément regarder — le sommaire, la légende, le tableau, la source — et t'évite de lire le reste. Sans elle, tu lis tout et tu ne retiens rien : c'est la question qui tient l'attention, pas la volonté.",
    schema: partirDeLaQuestion,
  },
  methode: [
    {
      titre: "Nommer les éléments avant de lire",
      texte:
        "Un titre, une image avec sa légende, un tableau, une source. Dix secondes pour faire le tour, et tu sais où se trouve chaque sorte d'information.",
      schema: grilleComposite,
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Se demander si une seule suffit",
      texte:
        "Avant de répondre : est-ce que ce document seul me permet de conclure ? Souvent non — et c'est le moment de chercher le second.",
      schema: uneSeuleNeSuffitPas,
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "Écrire la question avant de chercher",
      texte:
        "Une phrase, même dans sa tête. « Le musée est-il ouvert mardi matin ? » Tu ne lis plus l'affiche : tu y cherches deux choses précises.",
      schema: partirDeLaQuestion,
      micros: ["cm2_doc_prelever_combiner"],
    },
    {
      titre: "Noter ce que chaque document apporte",
      texte:
        "Un mot par document, séparément. Puis regarder ce que leur mise bout à bout permet de dire : c'est là qu'est la réponse.",
      schema: chacunUnMorceau,
      micros: ["cm2_comp_documents_defi"],
    },
  ],
  usages: [
    {
      titre: "Pour se repérer dans un livre documentaire",
      detail:
        "Le sommaire donne la page, la légende explique le dessin, la source dit d'où ça vient. Trois outils, et aucun ne demande de lire le livre.",
      schema: ouTrouverQuoi,
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Pour ne pas se tromper sur un horaire",
      detail:
        "Cherche toujours la deuxième information : le jour de fermeture, le jour férié, la période de vacances. Elle est presque toujours ailleurs.",
      schema: reponseDansAucun,
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "Pour répondre à une question de recherche",
      detail:
        "Écris la question d'abord. Puis va la chercher — tu liras dix fois moins et tu trouveras plus vite.",
      schema: toutLirePuisChercher,
      micros: ["cm2_doc_prelever_combiner"],
    },
    {
      titre: "Pour un exposé à partir de plusieurs sources",
      detail:
        "Note à part ce que chacune apporte. Ce qui reste après la mise en commun est ce que tu as vraiment appris en les croisant.",
      schema: troisDocuments,
      micros: ["cm2_comp_documents_defi"],
    },
  ],
  exemples: [
    {
      titre: "À quoi sert un schéma",
      donnees: "« Dans un documentaire, à quoi sert surtout un schéma légendé ? »",
      schema: grilleCompositeSchema,
      question: "À quoi sert-il ?",
      solution:
        "À MONTRER ET EXPLIQUER PAR L'IMAGE. Pas à raconter une histoire, pas à donner la fin d'un roman, pas à remplacer le titre. Un schéma avec sa légende explique par le dessin ce que le texte dirait avec des mots — et souvent plus vite.",
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "La légende d'un plan",
      donnees: "« Sur un plan de ville, à quoi sert la légende ? »",
      schema: schemaEtLegende,
      question: "À quoi sert-elle ?",
      solution:
        "À EXPLIQUER CE QUE REPRÉSENTENT LES SYMBOLES. Sans elle, un plan montre des formes et des couleurs dont tu ne sais rien : un carré bleu peut être une piscine, une école ou un parking. La légende est ce qui transforme un dessin en information.",
      micros: ["cm2_doc_composite"],
    },
    {
      titre: "Croiser deux affiches",
      donnees: "« Une affiche dit que le musée ouvre à 9 h ; une autre qu'il est fermé le mardi. »",
      schema: reponseDansAucun,
      question: "Peux-tu le visiter mardi à 10 h ?",
      solution:
        "NON, IL EST FERMÉ LE MARDI. Et regarde bien où se trouve cette réponse : sur aucune des deux affiches. La première dit oui pour 10 h, la seconde ne parle pas d'horaires. Il a fallu les mettre ensemble — c'est cela, croiser deux documents.",
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "Une seule information",
      donnees: "Tu n'as vu que la première affiche : « Piscine ouverte de 9 h à 18 h. »",
      schema: uneSeuleNeSuffitPas,
      question: "Peux-tu conclure ?",
      solution:
        "NON, ET C'EST LE PIÈGE : tu peux répondre, mais tu ne peux pas CONCLURE. Rien dans cette affiche n'est faux, et rien ne t'avertit qu'il manque une information. Avant de répondre, demande-toi toujours si ce document seul suffit.",
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      titre: "Prélever",
      donnees: "On te donne un documentaire de six pages et une question précise.",
      schema: partirDeLaQuestion,
      question: "Par quoi commences-tu ?",
      solution:
        "PAR LA QUESTION, PAS PAR LA PREMIÈRE PAGE. Relis-la, décide ce que tu cherches — un chiffre ? une date ? un mot ? — puis va au bon endroit : sommaire, tableau, légende. Lire les six pages d'abord ne laisse presque rien.",
      micros: ["cm2_doc_prelever_combiner"],
    },
    {
      titre: "Le défi",
      donnees: "Un texte, un tableau de chiffres et une photo légendée, sur le même sujet.",
      schema: troisDocuments,
      question: "Comment réponds-tu à une question qui les traverse ?",
      solution:
        "EN NOTANT CE QUE CHACUN APPORTE, SÉPARÉMENT, PUIS EN LES METTANT BOUT À BOUT. Le tableau donne un chiffre, le texte dit ce qu'il signifie, la photo montre à quoi cela ressemble. Aucun ne répond seul — et la réponse ne se trouve que dans leur rencontre.",
      micros: ["cm2_comp_documents_defi"],
    },
  ],
  pieges: [
    "Conclure sur un seul document : rien n'y est faux, et pourtant il manque une information.",
    "Croire que croiser deux documents, c'est vérifier qu'ils disent la même chose.",
    "Chercher la réponse dans l'un des deux : souvent elle n'est écrite ni dans l'un ni dans l'autre.",
    "Lire un document en entier avant de savoir ce qu'on y cherche.",
    "Lire un schéma sans sa légende : il montre, mais il n'explique pas.",
    "Ignorer le sommaire et la source : ce sont les deux éléments qui font gagner le plus de temps.",
  ],
  aRetenir: [
    "Un document composite a des éléments qui se nomment, et chacun sert à autre chose.",
    "Croiser, c'est compléter — pas vérifier.",
    "La réponse n'est souvent dans aucun des deux documents : elle nait de leur rencontre.",
    "Une seule information peut tromper sans être fausse.",
    "On part de la question, jamais du document.",
  ],
  entrainement: [
    {
      question: "Sur la boite d'un jeu : « À partir de 6 ans ». Que signifie cette information ?",
      correction: "L'âge conseillé pour jouer.",
      micros: ["cm2_doc_composite"],
    },
    {
      question: "« Dans un sommaire : Chapitre 3 ..... page 20. » À quoi sert la page indiquée ?",
      correction: "À trouver où commence le chapitre.",
      micros: ["cm2_doc_composite"],
    },
    {
      question: "« Sur un yaourt : À consommer avant le 12/05. » Cette date indique quoi ?",
      correction: "Jusqu'à quand on peut le manger.",
      micros: ["cm2_doc_composite"],
    },
    {
      question: "« Piscine ouverte de 9 h à 18 h, sauf le lundi. » Peut-on y aller le lundi ?",
      correction: "Non : elle est fermée le lundi.",
      micros: ["cm2_doc_croiser_infos"],
    },
    {
      question: "Un document indique une source et une date. Que donne la source ?",
      correction: "D'où vient le document.",
      micros: ["cm2_doc_prelever_combiner"],
    },
    {
      question: "« Un graphique a pour titre : Nombre de livres lus par mois. » Que lit-on dessus ?",
      correction: "Combien de livres sont lus chaque mois.",
      micros: ["cm2_comp_documents_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesComprehensionDocumentsCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Documents et informations - CM2",
    section: {
      type: "objectif",
      phrase: "La réponse n'est dans aucun des deux",
      sousPhrase:
        "« Ouvre à 9 h » et « fermé le mardi » : aucune des deux affiches ne dit non.",
      encadre: {
        titre: "L'idée",
        texte: "C'est leur rencontre qui répond — et cela s'appelle croiser.",
      },
    },
  },
  {
    titre: "Un document composite se nomme",
    badge: "Documents et informations - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le titre", texte: "Il donne le sujet." },
        { titre: "La légende", texte: "Elle dit ce qu'on voit et explique les symboles." },
        { titre: "Le schéma", texte: "Il montre une organisation par l'image." },
        { titre: "Le tableau", texte: "Il porte les chiffres." },
      ],
    },
    schema: grilleComposite,
  },
  {
    titre: "Croiser n'est pas vérifier",
    badge: "Documents et informations - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "S'assurer que les deux documents disent la même chose.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Les faire se compléter — et la réponse nait souvent entre les deux.",
      },
    },
    schema: completerNestPasRepeter,
  },
  {
    titre: "Une seule information peut tromper",
    badge: "Documents et informations - CM2",
    section: {
      type: "etapes",
      etapes: [
        "« Piscine ouverte de 9 h à 18 h » : rien n'y est faux.",
        "Et rien ne t'avertit qu'il manque quelque chose.",
        "Avant de conclure : est-ce que CE document seul suffit ?",
        "Souvent non — et c'est le moment de chercher le second.",
      ],
    },
    schema: uneSeuleNeSuffitPas,
  },
  {
    titre: "On part de la question",
    badge: "Documents et informations - CM2",
    section: {
      type: "etapes",
      etapes: [
        "PRÉLEVER PUIS COMBINER : l'ordre est dans le nom du geste.",
        "Écris la question d'abord, même dans ta tête.",
        "Puis va au bon endroit : sommaire, légende, tableau, source.",
        "Tout lire avant de savoir quoi chercher ne laisse presque rien.",
      ],
    },
    schema: partirDeLaQuestion,
  },
  {
    titre: "À vous",
    badge: "Documents et informations - CM2",
    section: {
      type: "exercice",
      enonce: "Un texte, un tableau de chiffres et une photo légendée, sur le même sujet.",
      question: "Comment réponds-tu à une question qui les traverse ?",
      indice: "Ne cherche pas la réponse dans l'un d'eux.",
      correction:
        "EN NOTANT CE QUE CHACUN APPORTE, SÉPARÉMENT, PUIS EN LES METTANT BOUT À BOUT. Le tableau donne un chiffre, le texte dit ce qu'il signifie, la photo montre à quoi cela ressemble.",
    },
    schema: chacunUnMorceau,
  },
];
