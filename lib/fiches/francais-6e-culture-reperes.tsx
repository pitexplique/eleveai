// ─── Fiche de cours : genres, contexte et carnet de lecture (6e) ──────────────
// TROISIÈME FICHE DE CULTURE DE LA 6e — ET ELLE FERME LE DOMAINE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025. ⛔ LA 6e FERME LE CYCLE 3. Cette notion porte les gestes du
// lecteur cultivé : reconnaitre un genre, situer une œuvre, la mettre en réseau,
// garder une trace de ses lectures ET LA PARTAGER.
//
// ⛔⛔ PIÈGE DE CLASSE MAXIMAL, ET IL EST EXACT : `culture_connaissances` EN 5e
// PORTE LES QUATRE MÊMES GESTES — genre, contexte, réseau, trace. J'ai écrit
// cette fiche-là le 28/08. Les recopier ferait un hors-programme parfaitement
// crédible. Ce qui les sépare :
//
//   | | 5e (cycle 4) | 6e (cycle 3) |
//   |—|—|—|
//   | le genre | à son OUVERTURE : « Il y a longtemps », un nom en majuscules | à ses MARQUES simples : des vers, des répliques, le passé simple |
//   | le contexte | ce qu'il faut SAVOIR pour comprendre la scène | le CADRE : où et quand cela se passe |
//   | le réseau | personnage, épreuve, lieu, leçon | comparer DEUX PERSONNAGES : ce qu'ils font, ce qu'ils ressentent |
//   | la trace | qui est qui, une page, un mot, une question | un avis JUSTIFIÉ, pour le PARTAGER |
//   | l'histoire | quatre PÉRIODES littéraires | — (hors programme en 6e) |
//
// ⚠️ Et surtout : LA 6e A UN OBJET QUE LA 5e N'A PAS — LE VOCABULAIRE POUR PARLER
// D'UN LIVRE. Narrateur, héros, adversaire, cadre, morale. Le pool OEUVRE en est
// plein, et c'est ce qui manque vraiment à un élève de 6e : sans ces mots, il ne
// peut que raconter l'histoire ; avec eux, il peut en PARLER.
//
// ⭐⭐ LA DÉCOUVERTE DE CETTE FICHE : L'AUTEUR N'EST PAS LE NARRATEUR. Le pool le
// prépare sans le dire — « le narrateur peut être le héros lui-même ou quelqu'un
// d'extérieur ». Or l'auteur, lui, n'est ni l'un ni l'autre : il est la personne
// qui a écrit le livre, et elle vit hors du livre. C'est le seuil du collège, et
// il ne coute qu'une phrase à poser. Dessiné par la bande `nature` : « il
// écrit » au-dessus de l'auteur, « il raconte » au-dessus du narrateur.
//
// ⭐ ET LA TRACE DE 6e A UN BUT QUE CELLE DE 5e N'A PAS : LA PARTAGER. Le BO dit
// « garder une trace personnelle de ses lectures ET LA PARTAGER ». D'où la ligne
// du pool : conseiller un livre « en disant pourquoi » — prêter sans rien dire
// ne partage rien. Le carnet garde donc un AVIS et le PASSAGE qui le justifie,
// jamais un résumé.
//
// ⛔ ON N'INTERROGE JAMAIS UNE ŒUVRE : la banque du coach nomme Ulysse, l'Odyssée
// et La Fontaine dans ses items ; la fiche ne les met QUE dans les blocs qui
// s'adressent au lecteur, jamais dans ce qui est demandé à l'élève.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises. ⛔ Et la bande `nature` est CENTRÉE SUR SON MOT : chaque mot
// doit être au moins aussi large que son étiquette (mesuré le 29/08).
//
// Alignée sur le pool OEUVRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `6e_fr_fixed_culture_*` de
// lib/tutor-v4/questionBank/6e/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `culture_reperes`) :
// - 6e_culture_genres      → propriétés 1 à 3, méthode 1, usage 1, exemples 1 et 2
// - 6e_culture_contexte    → propriétés 4 et 5, méthode 2, usage 2, exemple 3
// - 6e_culture_reseau      → propriété 6, méthode 3, usage 3, exemple 4
// - 6e_culture_trace       → propriétés 7 à 9, formule, méthode 4, usage 4,
//                            exemple 5
// - 6e_culture_reperes_defi → figure, propriété 10, exemple 6

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

/** Le vocabulaire du lecteur, et les marques des genres. ⚠️ Cellules courtes :
 *  à la largeur d'un bloc, vingt signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on a les mots pour en parler ─────────────────────

// ── ⭐ LA FIGURE DE RÉFÉRENCE : l'auteur n'est pas le narrateur.
const auteurEtNarrateur = phrase({
  mots: [
    { texte: "« l'auteur »", nature: "il écrit" },
    { texte: "« le narrateur »", nature: "il raconte" },
  ],
  legende: "L'un a tenu le stylo. L'autre vit dans le livre. Ce ne sont pas les mêmes.",
});

const narrateurDedansDehors = phrase({
  mots: [
    { texte: "le héros lui-même" },
    { texte: "quelqu'un dehors" },
  ],
  legende: "Le narrateur peut être l'un ou l'autre — et cela ne raconte pas pareil.",
});

// ── LE VOCABULAIRE : quatre mots, et l'on peut parler d'un livre.
const grilleVocabulaire = grille({
  headers: ["Le mot", "Ce qu'il désigne"],
  rows: [
    { values: ["le narrateur", "qui raconte"] },
    { values: ["le héros", "qui le vit"] },
    { values: ["l'adversaire", "qui s'oppose"] },
    { values: ["le cadre", "où et quand"] },
  ],
  caption: "Sans ces mots, on ne peut que raconter l'histoire.",
});

const grilleVocabulaireCadre = grille({
  headers: ["Le mot", "Ce qu'il désigne"],
  rows: [
    { values: ["le narrateur", "qui raconte"] },
    { values: ["le héros", "qui le vit"] },
    { values: ["l'adversaire", "qui s'oppose"] },
    { values: ["le cadre", "où et quand"] },
  ],
  highlight: { row: 3 },
  caption: "Le cadre, c'est le lieu ET le moment. Les deux ensemble.",
});

// ── LES GENRES : des marques simples, qui se comptent.
const grilleMarques = grille({
  headers: ["L'indice", "Le genre"],
  rows: [
    { values: ["des vers", "la poésie"] },
    { values: ["des répliques", "le théâtre"] },
    { values: ["le passé simple", "le récit"] },
    { values: ["une morale", "la fable"] },
  ],
  caption: "Une marque suffit, et elle se voit sans lire.",
});

const grilleMarquesFable = grille({
  headers: ["L'indice", "Le genre"],
  rows: [
    { values: ["des vers", "la poésie"] },
    { values: ["des répliques", "le théâtre"] },
    { values: ["le passé simple", "le récit"] },
    { values: ["une morale", "la fable"] },
  ],
  highlight: { row: 3 },
  caption: "Des animaux qui parlent, et une leçon au bout.",
});

const formuleDouverture = phrase({
  mots: [
    { texte: "« Il était une fois »", focus: true },
    { texte: "cela commence" },
  ],
  liens: [{ de: 0, vers: 1, label: "sert à", type: "question" }],
  legende: "La formule ouvre le conte : elle ne donne ni morale ni description.",
});

// ── LE CONTEXTE : le cadre, où et quand.
const cadreOuEtQuand = phrase({
  mots: [
    { texte: "où" },
    { texte: "quand" },
  ],
  legende: "Le cadre d'une histoire, c'est le lieu ET le moment — jamais l'un sans l'autre.",
});

const situerUneOeuvre = phrase({
  mots: [
    { texte: "l'œuvre" },
    { texte: "une époque", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "vient de", type: "question" }],
  legende: "Situer une œuvre, c'est savoir de quel temps et de quel lieu elle vient.",
});

// ── LE RÉSEAU : deux œuvres, un même combat.
const reseauDeuxOeuvres = phrase({
  mots: [
    { texte: "un film" },
    { texte: "le même combat", focus: true },
    { texte: "un texte ancien" },
  ],
  liens: [
    { de: 0, vers: 1, label: "passe par", type: "question" },
    { de: 2, vers: 1, label: "aussi", type: "question" },
  ],
  legende: "Rapprocher les deux n'est pas un hors-sujet : c'est les mettre en réseau.",
});

const comparerDeuxPersonnages = phrase({
  mots: [
    { texte: "ce qu'ils font" },
    { texte: "ce qu'ils ressentent" },
  ],
  legende: "Pour comparer deux personnages, on note cela — pas la longueur de leur nom.",
});

// ── LA TRACE : un avis, un passage, et quelqu'un à qui le dire.
const avisEtPassage = phrase({
  mots: [
    { texte: "un avis" },
    { texte: "le passage", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "appuyé sur", type: "question" }],
  legende: "Un carnet garde un avis ET ce qui le justifie. Pas le résumé du livre.",
});

const resumeNeSeRelitPas = phrase({
  mots: [
    { texte: "le résumé complet", barre: true },
    { texte: "un vers aimé", focus: true },
  ],
  legende: "Recopier tout le conte ne se relit jamais. Un vers et un pourquoi, si.",
});

const partagerUnLivre = phrase({
  mots: [
    { texte: "le conseiller" },
    { texte: "en disant pourquoi", focus: true },
  ],
  legende: "Prêter sans rien dire ne partage rien : c'est le pourquoi qui se transmet.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureReperes6e: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "6e",
  notion: "culture-reperes",
  titre: "Genres, contexte et carnet de lecture en 6e (2026-2027)",
  accroche:
    "Quatre mots, et parler d'un livre devient possible : le NARRATEUR (qui raconte), le HÉROS (qui le vit), l'ADVERSAIRE (qui s'oppose), le CADRE (où et quand). Sans eux, tu ne peux que redire l'histoire. Et un cinquième, qui est le seuil du collège : l'AUTEUR n'est pas le narrateur. L'un a tenu le stylo, l'autre vit dans le livre.",
  identite: [
    { label: "Mots clés", valeur: "Narrateur, héros, cadre, réseau, carnet" },
    { label: "Le secret", valeur: "L'auteur n'est pas le narrateur" },
    { label: "Outil", valeur: "Un avis, et le passage qui le justifie" },
  ],
  definition: {
    texte:
      "Se repérer dans ses lectures demande d'abord DES MOTS. Le NARRATEUR est celui qui raconte — il peut être le héros lui-même ou quelqu'un d'extérieur à l'histoire ; l'AUTEUR, lui, est la personne qui a écrit le livre, et il n'est ni l'un ni l'autre. Le HÉROS est le personnage principal, celui qui vit l'aventure ; l'ADVERSAIRE est celui qui s'oppose à lui ; le CADRE est le lieu ET le moment où l'histoire se passe. Reconnaitre un GENRE se fait ensuite par des marques simples : des vers pour la poésie, des répliques pour le théâtre, le passé simple pour le récit, des animaux qui parlent et une morale pour la fable, une formule d'ouverture pour le conte. SITUER une œuvre, c'est savoir de quel temps et de quel lieu elle vient. La METTRE EN RÉSEAU, c'est la rapprocher d'une autre qui lui ressemble — un film et un texte très ancien peuvent raconter le même combat. Enfin, GARDER UNE TRACE : un carnet de lecture porte le titre, l'auteur, et surtout un AVIS accompagné du passage qui le justifie — pour pouvoir le partager.",
  },
  figure: {
    schema: pile(auteurEtNarrateur, narrateurDedansDehors),
    legende:
      "La bande grise dit ce que chacun FAIT. L'auteur écrit : c'est une personne réelle, qui a une adresse et qui a pu mourir il y a trois-mille ans. Le narrateur raconte : il n'existe que dans le livre, et il peut être le héros lui-même — « je » — ou quelqu'un d'extérieur. Confondre les deux fait dire des choses très étranges, comme qu'un auteur a affronté un cyclope. En bas, les deux positions possibles du narrateur : dedans ou dehors, et cela ne raconte pas la même histoire.",
  },
  proprietes: [
    {
      titre: "Quatre mots pour parler d'un livre",
      texte:
        "Le narrateur raconte, le héros le vit, l'adversaire s'oppose, le cadre dit où et quand. Sans eux, on ne peut que redire l'histoire.",
      schema: grilleVocabulaire,
      micros: ["6e_culture_genres"],
    },
    {
      titre: "Un genre se reconnait à une marque",
      texte:
        "Des vers : la poésie. Des répliques : le théâtre. Le passé simple : le récit. Une marque suffit, et elle se voit avant la lecture.",
      schema: grilleMarques,
      micros: ["6e_culture_genres"],
    },
    {
      titre: "La fable et le conte ont leurs signes",
      texte:
        "Des animaux qui parlent et une leçon au bout : une fable, et cette leçon s'appelle la morale. « Il était une fois » : un conte qui commence.",
      schema: pile(grilleMarquesFable, formuleDouverture),
      micros: ["6e_culture_genres"],
    },
    {
      titre: "Le cadre, c'est le lieu ET le moment",
      texte:
        "Les deux ensemble, jamais l'un sans l'autre. « Dans une forêt » ne suffit pas ; « dans une forêt, la nuit tombée » situe la scène.",
      schema: cadreOuEtQuand,
      micros: ["6e_culture_contexte"],
    },
    {
      titre: "Situer une œuvre, c'est la dater et la placer",
      texte:
        "De quel temps vient-elle, de quel pays ? Un récit composé dans l'Antiquité ne se lit pas comme un roman d'aujourd'hui, et le savoir change la lecture.",
      schema: situerUneOeuvre,
      micros: ["6e_culture_contexte"],
    },
    {
      titre: "Mettre en réseau, c'est rapprocher deux œuvres",
      texte:
        "Un film où un héros affronte un monstre, et un combat raconté il y a trois-mille ans : le rapprochement n'est pas un hors-sujet, c'est le geste demandé.",
      schema: pile(reseauDeuxOeuvres, comparerDeuxPersonnages),
      micros: ["6e_culture_reseau"],
    },
    {
      titre: "Un carnet garde un avis, pas un résumé",
      texte:
        "Le titre, l'auteur, et un avis personnel accompagné du passage qui le justifie. Le résumé complet, lui, ne se relit jamais.",
      schema: avisEtPassage,
      micros: ["6e_culture_trace"],
    },
    {
      titre: "Un vers recopié, et pourquoi",
      texte:
        "Après un poème, la trace utile n'est pas le poème entier ni le nombre de vers : c'est un vers que tu as aimé, et la raison.",
      schema: resumeNeSeRelitPas,
      micros: ["6e_culture_trace"],
    },
    {
      titre: "Une trace se partage",
      texte:
        "Le programme le dit : garder une trace ET LA PARTAGER. Conseiller un livre en disant pourquoi — prêter sans rien dire ne partage rien.",
      schema: partagerUnLivre,
      micros: ["6e_culture_trace"],
    },
    {
      titre: "Le défi : classer trois extraits et justifier",
      texte:
        "L'un en vers, l'un avec des répliques, l'un au passé simple. Nommer le genre ne suffit pas : il faut dire à quoi on l'a vu.",
      schema: grilleMarques,
      micros: ["6e_culture_reperes_defi"],
    },
  ],
  reel: {
    texte:
      "Tu fais des réseaux tout le temps, et personne ne te dit que c'est le geste attendu à l'école. Quand tu dis d'un film « c'est comme l'autre, mais dans l'espace », tu rapproches deux œuvres par ce qu'elles partagent — c'est exactement une mise en réseau. Quand tu conseilles une série à quelqu'un, tu ne lui donnes pas le résumé complet : tu dis un moment et pourquoi il t'a marqué. C'est un carnet de lecture, en parlé. Et la confusion auteur/narrateur, tu l'as déjà rencontrée : quand un chanteur écrit « je » dans une chanson triste et que tout le monde suppose que ça lui est arrivé. Parfois oui, parfois non — et c'est bien pour cela qu'on distingue les deux.",
  },
  historique: {
    texte:
      "Les auteurs ont si souvent joué de la confusion entre eux et leur narrateur qu'ils en ont fait un procédé : le manuscrit trouvé. L'écrivain affirme n'avoir rien inventé — il aurait seulement découvert, dans un coffre ou chez un inconnu, le récit d'une autre personne, qu'il se contente de publier. Cervantès l'utilise pour Don Quichotte, Defoe pour Robinson Crusoé, et des dizaines d'autres après eux. L'astuce avait un intérêt pratique : elle rendait l'histoire plus crédible et mettait l'auteur à l'abri de ce que son narrateur racontait. Elle prouve surtout ceci : la distinction entre celui qui écrit et celui qui raconte est si nette que des écrivains ont bâti des livres entiers sur le fait de la brouiller.",
  },
  formule: {
    contexte: "Ce qu'on écrit dans un carnet de lecture, et rien d'autre.",
    expression: "un avis, et le passage qui le justifie",
    legende:
      "Deux lignes suffisent. « Ce moment m'a fait peur » ne se relit pas ; « ce moment m'a fait peur — quand il referme la porte, chapitre 4 » se relit, se raconte à quelqu'un, et sert encore trois mois plus tard. Le résumé complet, lui, ne sert jamais : le livre le fait déjà, et mieux.",
    schema: avisEtPassage,
  },
  methode: [
    {
      titre: "Nommer avant de raconter",
      texte:
        "Qui raconte ? qui vit l'histoire ? qui s'y oppose ? où et quand ? Quatre réponses, et tu peux parler du livre au lieu de le redire.",
      schema: grilleVocabulaire,
      micros: ["6e_culture_genres"],
    },
    {
      titre: "Chercher le lieu ET le moment",
      texte:
        "Beaucoup d'élèves donnent le lieu et oublient le moment. Le cadre est fait des deux, et c'est souvent le moment qui explique la scène.",
      schema: grilleVocabulaireCadre,
      micros: ["6e_culture_contexte"],
    },
    {
      titre: "Se demander ce que ça te rappelle",
      texte:
        "Un film, un jeu, un autre livre. Puis nomme ce qui est commun : le même combat, la même épreuve, le même type de personnage.",
      schema: reseauDeuxOeuvres,
      micros: ["6e_culture_reseau"],
    },
    {
      titre: "Deux lignes par livre, et pas une de plus",
      texte:
        "Le titre et l'auteur sur la première. Sur la seconde, ce que tu as pensé et l'endroit qui te l'a fait penser. C'est tout le carnet.",
      schema: avisEtPassage,
      micros: ["6e_culture_trace"],
    },
  ],
  usages: [
    {
      titre: "Pour répondre à « qui raconte ? »",
      detail:
        "C'est une question de contrôle très fréquente, et elle ne demande pas le nom de l'auteur. Regarde si le récit dit « je » ou « il ».",
      schema: auteurEtNarrateur,
      micros: ["6e_culture_genres"],
    },
    {
      titre: "Pour situer un texte qu'on te donne",
      detail:
        "Cherche les objets, les vêtements, les moyens de transport. Ils datent une scène mieux qu'une date, et ils sont dans le texte.",
      schema: situerUneOeuvre,
      micros: ["6e_culture_contexte"],
    },
    {
      titre: "Pour enrichir une réponse en classe",
      detail:
        "« Cela me fait penser à… » est une bonne phrase, à condition de dire ensuite ce qui est commun. Sans cela, ce n'est qu'une association.",
      schema: comparerDeuxPersonnages,
      micros: ["6e_culture_reseau"],
    },
    {
      titre: "Pour conseiller un livre à quelqu'un",
      detail:
        "Ne raconte pas l'histoire — tu la lui gâches. Dis un moment, et pourquoi il t'a marqué. C'est ce qui donne envie de lire.",
      schema: partagerUnLivre,
      micros: ["6e_culture_trace"],
    },
  ],
  exemples: [
    {
      titre: "Qui raconte",
      donnees: "« Dans un récit, la personne qui raconte l'histoire s'appelle… »",
      schema: auteurEtNarrateur,
      question: "Comment s'appelle-t-elle ?",
      solution:
        "LE NARRATEUR. Ni le lecteur, ni l'imprimeur, ni le libraire — et surtout pas l'auteur, qui est la personne réelle ayant écrit le livre. Le narrateur, lui, n'existe que dans le récit : il peut être le héros qui dit « je », ou quelqu'un d'extérieur.",
      micros: ["6e_culture_genres"],
    },
    {
      titre: "Une marque de genre",
      donnees: "« Une courte histoire avec des animaux qui parlent et une leçon au bout. »",
      schema: grilleMarquesFable,
      question: "De quel genre s'agit-il ?",
      solution:
        "UNE FABLE. Deux marques, et elles vont toujours ensemble : des animaux qui parlent, et une leçon — qu'on appelle la MORALE. Ce n'est ni un roman policier, ni une pièce de théâtre : la brièveté et la morale finale suffisent à trancher.",
      micros: ["6e_culture_genres"],
    },
    {
      titre: "Le cadre",
      donnees: "« Le lieu et le moment où se passe une histoire, c'est… »",
      schema: grilleVocabulaireCadre,
      question: "Comment cela s'appelle-t-il ?",
      solution:
        "LE CADRE — où et quand. Pas le titre, pas la couverture. Retiens bien les deux moitiés : beaucoup d'élèves donnent le lieu et oublient le moment, alors que c'est souvent le moment qui explique la scène — la nuit, l'hiver, la veille d'un départ.",
      micros: ["6e_culture_contexte"],
    },
    {
      titre: "Un rapprochement",
      donnees: "« Un film où un héros affronte un monstre te fait penser à un combat raconté dans un texte très ancien. »",
      schema: reseauDeuxOeuvres,
      question: "Comment s'appelle ce que tu viens de faire ?",
      solution:
        "METTRE DEUX ŒUVRES EN RÉSEAU. Ce n'est ni résumer, ni compter les personnages : c'est rapprocher deux œuvres qui se ressemblent. Et ce n'est pas un hors-sujet — le programme demande précisément ce geste, à condition de nommer ce qui est commun.",
      micros: ["6e_culture_reseau"],
    },
    {
      titre: "Une trace après un poème",
      donnees: "« Après avoir lu un poème, quelle trace est utile dans un carnet de lecteur ? »",
      schema: resumeNeSeRelitPas,
      question: "Que notes-tu ?",
      solution:
        "UN VERS QUE TU AS AIMÉ, ET POURQUOI. Recopier le poème entier ne sert à rien — il existe déjà. Noter le titre, l'auteur et le nombre de vers ne dit rien de toi. C'est le POURQUOI qui fait la trace, et c'est lui qu'on peut partager.",
      micros: ["6e_culture_trace"],
    },
    {
      titre: "Le défi",
      donnees: "« Trois extraits : l'un en vers, l'un avec des répliques, l'un qui raconte au passé simple. »",
      schema: grilleMarques,
      question: "Dans l'ordre, quels genres ?",
      solution:
        "POÉSIE, THÉÂTRE, RÉCIT. Et le défi ne s'arrête pas au classement : il faut dire à quoi on l'a vu. Les vers signent la poésie, les répliques le théâtre, le passé simple de narration le récit. Trois indices, trois genres, et chacun se montre du doigt.",
      micros: ["6e_culture_reperes_defi"],
    },
  ],
  pieges: [
    "Confondre l'auteur et le narrateur : l'un a écrit le livre, l'autre vit dedans.",
    "Croire qu'un narrateur qui dit « je » est forcément l'auteur : c'est très souvent faux.",
    "Donner le lieu et oublier le moment : le cadre est fait des deux.",
    "Croire qu'un rapprochement avec un film est un hors-sujet : c'est le geste demandé.",
    "Rapprocher deux œuvres sans dire ce qui est commun : ce n'est alors qu'une association.",
    "Recopier le résumé complet dans son carnet : il ne se relit jamais.",
    "Conseiller un livre en racontant l'histoire : cela la gâche, et cela ne donne pas envie.",
  ],
  aRetenir: [
    "Quatre mots : le narrateur raconte, le héros vit, l'adversaire s'oppose, le cadre situe.",
    "L'auteur n'est pas le narrateur — c'est le seuil du collège.",
    "Un genre se reconnait à une marque : vers, répliques, passé simple, morale.",
    "Le cadre, c'est le lieu ET le moment.",
    "Le carnet garde un avis et le passage qui le justifie — pour le partager.",
  ],
  entrainement: [
    {
      question: "« Le personnage qui s'oppose au héros s'appelle souvent… »",
      correction: "L'adversaire.",
      micros: ["6e_culture_genres"],
    },
    {
      question: "Dans un conte, à quoi sert la formule « Il était une fois » ?",
      correction: "Commencer l'histoire.",
      micros: ["6e_culture_genres"],
    },
    {
      question: "« La leçon qu'une fable veut faire comprendre s'appelle… »",
      correction: "La morale.",
      micros: ["6e_culture_contexte"],
    },
    {
      question: "« Pour comparer deux personnages, on peut noter… »",
      correction: "Ce qu'ils font et ce qu'ils ressentent.",
      micros: ["6e_culture_reseau"],
    },
    {
      question: "« Pour partager un livre qu'on a aimé, une bonne idée est de… »",
      correction: "Le conseiller à un camarade en disant pourquoi.",
      micros: ["6e_culture_trace"],
    },
    {
      question: "« Quelle phrase exprime un sentiment du lecteur ? »",
      correction: "« J'ai eu de la peine pour le petit héros. »",
      micros: ["6e_culture_reperes_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=6e",
};

export const slidesCultureReperes6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Genres et carnet - 6e",
    section: {
      type: "objectif",
      phrase: "L'auteur n'est pas le narrateur",
      sousPhrase:
        "L'un a tenu le stylo et vit hors du livre. L'autre raconte, et n'existe que dedans.",
      encadre: {
        titre: "L'idée",
        texte: "Quatre mots, et parler d'un livre devient possible au lieu de le redire.",
      },
    },
  },
  {
    titre: "Les mots pour en parler",
    badge: "Genres et carnet - 6e",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le narrateur", texte: "Celui qui raconte — dans l'histoire, ou dehors." },
        { titre: "Le héros", texte: "Le personnage principal, celui qui vit l'aventure." },
        { titre: "L'adversaire", texte: "Celui qui s'oppose à lui." },
        { titre: "Le cadre", texte: "Le lieu ET le moment. Jamais l'un sans l'autre." },
      ],
    },
    schema: grilleVocabulaire,
  },
  {
    titre: "Un genre, une marque",
    badge: "Genres et carnet - 6e",
    section: {
      type: "etapes",
      etapes: [
        "DES VERS et des blancs : la poésie.",
        "DES RÉPLIQUES précédées d'un nom : le théâtre.",
        "LE PASSÉ SIMPLE de narration : le récit.",
        "DES ANIMAUX qui parlent et une leçon : la fable — et la leçon s'appelle la morale.",
      ],
    },
    schema: grilleMarques,
  },
  {
    titre: "Mettre deux œuvres en réseau",
    badge: "Genres et carnet - 6e",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que c'est",
        contenu: "Rapprocher deux œuvres qui se ressemblent, et dire ce qui est commun.",
      },
      droite: {
        titre: "Ce que ce n'est pas",
        contenu: "Un hors-sujet. Un film et un texte de trois-mille ans peuvent se répondre.",
      },
    },
    schema: reseauDeuxOeuvres,
  },
  {
    titre: "Le carnet de lecture",
    badge: "Genres et carnet - 6e",
    section: {
      type: "etapes",
      etapes: [
        "LE TITRE et L'AUTEUR sur la première ligne.",
        "UN AVIS, et le PASSAGE qui le justifie, sur la seconde.",
        "Le résumé complet, lui, ne se relit jamais.",
        "Et une trace se PARTAGE : conseiller, en disant pourquoi.",
      ],
    },
    schema: avisEtPassage,
  },
  {
    titre: "À vous",
    badge: "Genres et carnet - 6e",
    section: {
      type: "exercice",
      enonce: "« Trois extraits : l'un en vers, l'un avec des répliques, l'un qui raconte au passé simple. »",
      question: "Quels genres, et à quoi les vois-tu ?",
      indice: "Nommer ne suffit pas : il faut montrer l'indice.",
      correction:
        "POÉSIE, THÉÂTRE, RÉCIT. Les vers signent la poésie, les répliques précédées d'un nom signent le théâtre, et le passé simple de narration signe le récit.",
    },
    schema: grilleMarquesFable,
  },
];
