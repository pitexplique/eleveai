// ─── Fiche de cours : revenir sur son texte et le réviser (CM2) ───────────────
// ONZIÈME FICHE DU CHANTIER CM2, et DERNIÈRE DU DOMAINE DE L'ÉCRITURE.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen deuxième année » : « Utiliser le
// brouillon pour préparer son texte » · « FAIRE PREUVE D'AUTONOMIE dans le
// respect des codes de l'écrit » · « Améliorer tout ou partie de son texte à
// partir des pistes données par l'enseignant, ses pairs et/ou son
// autoévaluation ».
//
// ⛔⛔ MÊME PROGRAMME QUE LA 6e, ET MÊME POOL DE QUESTIONS (ECRIT_REVISER, partagé
// par tout le cycle 3). La séparation ne peut donc venir QUE des libellés de
// micros, comparés un à un — et un mot du BO les sépare vraiment :
//
//   | 6e (`francais-6e-ecriture-reviser`) | CM2 (ici) |
//   |---|---|
//   | « on relit ce qu'on CROIT avoir écrit » ; les trois remèdes | RECOPIER N'EST PAS RÉVISER |
//   | `6e_ecrit_normes` : S'APPUYER SUR les normes | `cm2_ecrit_codes` : les respecter SEUL |
//   | deux relectures, deux buts | le brouillon : les ratures sont la preuve |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE EST DANS UNE LIGNE DU POOL : « RÉVISER AJOUTE
// QUELQUE CHOSE AU TEXTE ; RECOPIER NE FAIT QUE LE DÉPLACER. » C'est l'erreur
// n° 1 du CM2, et elle est redoutable parce qu'elle DONNE LE SENTIMENT D'AVOIR
// TRAVAILLÉ : on met une heure à recopier son brouillon au propre, on rend un
// texte magnifique — et c'est exactement le même texte, écrit deux fois. Le pool
// écarte d'ailleurs explicitement la réponse « une première version qu'on
// recopiera au propre » à la question « à quoi sert un brouillon ? ».
//
// ⭐⭐ D'OÙ LA MESURE, ET ELLE EST VISIBLE SANS RIEN LIRE : UN BROUILLON SANS UNE
// SEULE RATURE N'A SERVI À RIEN. Le pool le dit — « les ratures y sont un signe
// de travail ». Un brouillon propre est un brouillon qui n'a rien retravaillé.
//
// ⭐ ET LE MOT DU CM2 EST « SEUL ». La 6e dit « s'appuyer sur les normes » — une
// norme est un appui qu'on prend. Le CM2 dit « respecter SEUL les codes », et le
// BO écrit « faire preuve d'AUTONOMIE ». C'est le moment où l'on cesse de te
// souligner tes fautes : personne ne te les montre plus, il faut aller les
// chercher.
//
// ⛔ CE QUE CETTE FICHE NE REDIT PAS : « on relit ce qu'on croit avoir écrit » et
// les trois façons de sortir de sa tête (des critères, l'oreille, un camarade)
// sont le cœur de `francais-6e-ecriture-reviser`. Elles sont ici seulement
// citées dans la méthode, sans être redéveloppées.
//
// ⛔ ET LA BASCULE DE COULEUR SE REJOUE : le dessin `accordSujetVerbe` porte une
// étiquette « le sujet », et c'en est une vraiment — vérifier un accord EST un
// geste grammatical. La couleur DOIT donc s'appliquer, et l'arc est de type
// `accord`. Toutes les autres étiquettes de la fiche restent grises.
//
// Alignée sur le pool ECRIT_REVISER de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `ecriture_reviser`) :
// - cm2_ecrit_brouillon     → figure, propriétés 1 à 3, formule, méthode 1,
//                             usage 1, exemples 1 et 2
// - cm2_ecrit_reviser       → propriétés 4 à 6, méthode 2, usages 2 et 3,
//                             exemples 3 et 4
// - cm2_ecrit_codes         → propriétés 7 à 9, méthodes 3 et 4, usage 4, exemple 5
// - cm2_ecrit_reviser_defi  → propriété 10, exemple 6

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

/** Les codes de l'écrit. ⚠️ Cellules courtes : à la largeur d'un bloc, vingt
 *  signes tombent sous le plancher de 11 px. */
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

// ─── Ce qui se dessine quand on revient sur son texte ─────────────────────────

// ── ⭐⭐ LA FIGURE DE RÉFÉRENCE : l'erreur n° 1 du CM2.
const reviserOuRecopier = phrase({
  mots: [
    { texte: "recopier", barre: true },
    { texte: "réviser", focus: true },
  ],
  legende: "Réviser ajoute quelque chose au texte ; recopier ne fait que le déplacer.",
});

const raturesSignesDeTravail = phrase({
  mots: [
    { texte: "un brouillon net", barre: true },
    { texte: "des ratures", focus: true },
  ],
  legende: "Un brouillon sans une seule rature n'a rien retravaillé.",
});

const brouillonARetravailler = phrase({
  mots: [
    { texte: "le brouillon" },
    { texte: "à retravailler", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "un écrit", type: "question" }],
  legende: "On y essaie, on y rature, on y réorganise — avant la version finale.",
});

const memeTexteDeuxFois = phrase({
  mots: [
    { texte: "une heure" },
    { texte: "le même texte", focus: true },
  ],
  legende: "Recopier au propre donne le sentiment d'avoir travaillé. C'est le piège.",
});

// ── RÉVISER : CORRIGER ET ENRICHIR.
const corrigerEtEnrichir = phrase({
  mots: [
    { texte: "corriger" },
    { texte: "enrichir", focus: true },
  ],
  legende: "Chercher seulement des fautes, c'est faire la moitié du travail demandé.",
});

const deuxRelecturesDeuxButs = phrase({
  mots: [
    { texte: "pour le sens" },
    { texte: "pour l'orthographe" },
  ],
  legende: "Deux fois, avec un but différent : on ne voit pas les deux à la fois.",
});

const agirSurCeQuiAGene = phrase({
  mots: [
    { texte: "« qui parle ? »" },
    { texte: "des tirets", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "donc", type: "question" }],
  legende: "Améliorer à partir d'une remarque, c'est agir précisément sur ce qui a gêné.",
});

// ── LES CODES DE L'ÉCRIT, ET L'AUTONOMIE.
const grilleCodes = grille({
  headers: ["Le code", "Ce qu'il montre"],
  rows: [
    { values: ["la majuscule", "une phrase"] },
    { values: ["le point", "sa fin"] },
    { values: ["le tiret", "qui parle"] },
    { values: ["l'alinéa", "une idée neuve"] },
  ],
  caption: "Au CM2, personne ne te les rappelle plus : tu les vérifies seul.",
});

const seulDesormais = phrase({
  mots: [
    { texte: "on te souligne", barre: true },
    { texte: "tu cherches", focus: true },
  ],
  legende: "« Faire preuve d'autonomie » : c'est le mot du programme, et il change tout.",
});

// ⛔ SEULE ÉTIQUETTE COLORÉE DE LA FICHE : « le sujet » est une vraie fonction.
const accordSujetVerbe = phrase({
  mots: [
    { texte: "Les deux chiens" },
    { texte: "du voisin" },
    { texte: "aboyaient" },
  ],
  groupes: [{ mots: [0, 1], label: "le sujet" }],
  liens: [{ de: 0, vers: 2, label: "pluriel", type: "accord" }],
  legende: "L'accord du verbe avec son sujet : le premier que le programme cite.",
});

// ── LE DÉFI.
const trouverSansQuOnMontre = phrase({
  mots: [
    { texte: "les erreurs" },
    { texte: "toi", focus: true },
  ],
  liens: [{ de: 1, vers: 0, label: "trouvées par", type: "question" }],
  legende: "Le défi du CM2 : les trouver sans que personne ne te les ait montrées.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureReviserCm2: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm2",
  notion: "ecriture-reviser",
  titre: `Réviser son texte et son brouillon en CM2 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu passes une heure à recopier ton brouillon au propre, tu rends un texte magnifique — et c'est exactement le même texte, écrit deux fois. C'est l'erreur n° 1, et elle est redoutable parce qu'elle DONNE LE SENTIMENT D'AVOIR TRAVAILLÉ. RÉVISER AJOUTE QUELQUE CHOSE AU TEXTE ; RECOPIER NE FAIT QUE LE DÉPLACER. D'où la mesure, visible sans rien lire : un brouillon sans une seule rature n'a rien retravaillé.",
  identite: [
    { label: "Mots clés", valeur: "Brouillon, ratures, enrichir, codes" },
    { label: "Le secret", valeur: "Réviser ajoute, recopier déplace" },
    { label: "Outil", valeur: "Qu'est-ce que j'ai ajouté ?" },
  ],
  definition: {
    texte:
      "LE BROUILLON est un écrit À RETRAVAILLER : on y essaie, on y rature, on y réorganise avant la version finale. Ce n'est PAS une première version qu'on recopiera au propre — et c'est là qu'est le piège du CM2, parce que recopier prend du temps et donne le sentiment d'avoir travaillé. RÉVISER, c'est relire pour CORRIGER ET AMÉLIORER : cela AJOUTE quelque chose au texte, quand recopier ne fait que le déplacer. On relit AU MOINS DEUX FOIS, avec un but différent à chaque fois — une pour le sens, une pour l'orthographe : on ne voit pas les deux à la fois. Et réviser n'est pas seulement corriger : le programme demande d'AMÉLIORER, donc aussi d'ENRICHIR une phrase pauvre. Enfin le CM2 demande de RESPECTER SEUL LES CODES DE L'ÉCRIT — la majuscule, le point, le tiret du dialogue, l'alinéa. Le mot du programme est « autonomie » : personne ne te souligne plus tes fautes, il faut aller les chercher.",
  },
  figure: {
    schema: pile(reviserOuRecopier, raturesSignesDeTravail),
    legende:
      "Deux gestes qui prennent le même temps et qui n'ont rien en commun. Recopier DÉPLACE le texte : les mêmes phrases, la même orthographe, la même erreur au même endroit — mais l'écriture est plus belle, et c'est ce qui trompe. Réviser AJOUTE : une faute en moins, une phrase plus précise, un tiret qui manquait. En bas, la conséquence, et elle se voit sans lire une ligne : si ton brouillon n'a aucune rature, tu n'as rien retravaillé — tu as écrit ton texte du premier coup, puis tu l'as copié.",
  },
  proprietes: [
    {
      titre: "Le brouillon est un écrit à retravailler",
      texte:
        "On y essaie, on y rature, on y réorganise. Ce n'est ni une liste d'idées en vrac, ni un entrainement que personne ne corrige.",
      schema: brouillonARetravailler,
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Les ratures y sont un signe de travail",
      texte:
        "Un brouillon propre est un brouillon qui n'a rien retravaillé. C'est la seule fois où les ratures sont une bonne nouvelle.",
      schema: raturesSignesDeTravail,
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Ce n'est pas une version à recopier",
      texte:
        "Une heure de recopie donne un texte magnifique — et le même texte. Le sentiment d'avoir travaillé est ce qui rend le piège efficace.",
      schema: memeTexteDeuxFois,
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Réviser ajoute, recopier déplace",
      texte:
        "C'est le test le plus court : qu'est-ce que ma relecture a AJOUTÉ ? Si la réponse est « rien », je n'ai pas révisé.",
      schema: reviserOuRecopier,
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Deux relectures, deux buts",
      texte:
        "Une pour le sens, une pour l'orthographe. Deux fois de suite en cherchant la même chose ne vaut pas mieux qu'une seule.",
      schema: deuxRelecturesDeuxButs,
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Corriger ET enrichir",
      texte:
        "Le programme dit « améliorer tout ou partie de son texte ». Chercher seulement des fautes, c'est faire la moitié du travail demandé.",
      schema: corrigerEtEnrichir,
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Les codes de l'écrit sont peu nombreux",
      texte:
        "La majuscule, le point, le tiret, l'alinéa. Chacun montre quelque chose au lecteur — et chacun manque de façon visible.",
      schema: grilleCodes,
      micros: ["cm2_ecrit_codes"],
    },
    {
      titre: "Au CM2, on les respecte SEUL",
      texte:
        "Le mot du programme est « autonomie ». Personne ne te souligne plus tes fautes : c'est à toi d'aller les chercher.",
      schema: seulDesormais,
      micros: ["cm2_ecrit_codes"],
    },
    {
      titre: "L'accord sujet-verbe se vérifie en premier",
      texte:
        "C'est celui que le programme cite en tête, avec l'accord dans le groupe nominal. Ni la longueur des phrases, ni leur nombre.",
      schema: accordSujetVerbe,
      micros: ["cm2_ecrit_codes"],
    },
    {
      titre: "Le défi : trouver sans qu'on te montre",
      texte:
        "Toute la difficulté est là, et elle n'est pas une question d'effort : il faut chercher quelque chose dont on ignore l'endroit.",
      schema: trouverSansQuOnMontre,
      micros: ["cm2_ecrit_reviser_defi"],
    },
  ],
  reel: {
    texte:
      "Tu connais déjà la différence, hors de l'école. Ranger sa chambre en poussant tout sous le lit prend du temps, fatigue, et la chambre est plus belle — mais rien n'a été rangé : les affaires ont changé de place. Recopier un brouillon, c'est exactement cela. Et il y a une raison pour laquelle personne ne le voit : les deux gestes coutent le même effort. C'est pour cela qu'il faut une question et non une bonne volonté — « qu'est-ce que j'ai AJOUTÉ ? ». Si tu peux citer trois choses, tu as révisé. Si tu ne peux en citer aucune, tu as recopié, et ton texte sera noté comme s'il n'avait jamais été relu — parce qu'il ne l'a pas été.",
  },
  historique: {
    texte:
      "Le mot « brouillon » vient de « brouiller », qui voulait dire mêler, mettre en désordre. Un brouillon, c'est donc littéralement un écrit EN DÉSORDRE — et le nom ne dit rien d'autre : il annonce que le texte n'est pas rangé, qu'il va être remué, et que c'est normal. Notre habitude d'en faire une belle page à recopier va donc exactement contre le mot. On dit d'ailleurs d'un même papier qu'il est « au brouillon » puis « au propre » : la langue oppose le désordre à la propreté, et non la première version à la seconde. Le brouillon n'est pas le texte en avance — c'est le texte en train d'être remué.",
  },
  formule: {
    contexte: "La question qui sépare une vraie révision d'une recopie.",
    expression: "qu'est-ce que j'ai ajouté ?",
    legende:
      "Trois choses citables : une faute corrigée, une phrase enrichie, un tiret ajouté. Si tu ne peux en citer aucune, ta relecture n'a rien fait — même si elle t'a pris une heure, et même si la page est plus belle qu'avant.",
    schema: reviserOuRecopier,
  },
  methode: [
    {
      titre: "Raturer sur le brouillon, pas à côté",
      texte:
        "Barrer, flécher, ajouter dans la marge. Un brouillon qui reste beau n'a pas été utilisé comme brouillon.",
      schema: brouillonARetravailler,
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Relire deux fois, avec deux listes",
      texte:
        "Premier passage : est-ce que cela se comprend ? Second passage : les accords. Une liste écrite d'avance trouve ce qu'une bonne volonté rate.",
      schema: deuxRelecturesDeuxButs,
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Vérifier l'accord sujet-verbe d'abord",
      texte:
        "Pour chaque verbe : qui fait l'action ? Un ou plusieurs ? Le groupe sujet peut être long, et c'est là que l'accord se perd.",
      schema: accordSujetVerbe,
      micros: ["cm2_ecrit_codes"],
    },
    {
      titre: "Passer les quatre codes en revue",
      texte:
        "Majuscules, points, tirets, alinéas. Quatre passages rapides, chacun sur une seule chose : c'est plus sûr que tout chercher en même temps.",
      schema: grilleCodes,
      micros: ["cm2_ecrit_codes"],
    },
  ],
  usages: [
    {
      titre: "Pour que le brouillon serve à quelque chose",
      detail:
        "Il ne sert que si on le rature. Sinon c'est une page d'entrainement, et l'on écrit son devoir deux fois.",
      schema: raturesSignesDeTravail,
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Pour améliorer après une remarque",
      detail:
        "« On ne comprend pas qui parle » appelle des tirets et des noms de personnages — pas une réécriture complète du passage.",
      schema: agirSurCeQuiAGene,
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Pour ne pas rendre un texte pauvre mais correct",
      detail:
        "Zéro faute et rien à lire, cela existe. Enrichir une phrase plate fait autant que corriger une erreur.",
      schema: corrigerEtEnrichir,
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Pour travailler sans que le maitre souligne",
      detail:
        "C'est ce que le CM2 demande, et c'est ce qui attend au collège : trouver ses erreurs quand personne ne les a marquées.",
      schema: seulDesormais,
      micros: ["cm2_ecrit_codes"],
    },
  ],
  exemples: [
    {
      titre: "À quoi sert un brouillon",
      donnees: "« À quoi sert un brouillon ? »",
      schema: brouillonARetravailler,
      question: "À quoi ?",
      solution:
        "À ESSAYER, RATURER ET RÉORGANISER AVANT LA VERSION FINALE. Pas à écrire une première version qu'on recopiera au propre : ce serait écrire deux fois le même texte. Pas à noter ses idées en vrac — cela, c'est le plan. C'est un écrit À RETRAVAILLER, et les ratures y sont un signe de travail.",
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Un brouillon sans ratures",
      donnees: "Ton brouillon est propre, sans une seule rature.",
      schema: raturesSignesDeTravail,
      question: "Qu'est-ce que cela montre ?",
      solution:
        "QUE TU N'AS RIEN RETRAVAILLÉ. Et cela se voit sans lire une ligne. Ou bien tu as écrit ton texte du premier coup et tu l'as recopié, ou bien tu as gardé le brouillon propre par soin — dans les deux cas il n'a servi à rien, puisque son rôle est justement d'être abimé.",
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      titre: "Réviser son texte",
      donnees: "« Réviser son texte, c'est… »",
      schema: reviserOuRecopier,
      question: "C'est quoi ?",
      solution:
        "LE RELIRE POUR CORRIGER ET AMÉLIORER. Pas le recopier au propre sans le lire, pas compter les lignes, pas changer de cahier. RÉVISER AJOUTE quelque chose au texte ; recopier ne fait que le DÉPLACER — et les deux prennent le même temps, ce qui rend le second si tentant.",
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Combien de relectures",
      donnees: "« Combien de fois faut-il relire un texte avant de le rendre ? »",
      schema: deuxRelecturesDeuxButs,
      question: "Combien ?",
      solution:
        "AU MOINS DEUX FOIS, AVEC UN BUT DIFFÉRENT À CHAQUE FOIS. Pas deux fois de suite en cherchant les mêmes choses — la seconde ne trouverait rien de plus. Une relecture pour le sens, une pour l'orthographe : on ne voit pas les deux à la fois.",
      micros: ["cm2_ecrit_reviser"],
    },
    {
      titre: "Quel accord d'abord",
      donnees: "Tu relis ton texte pour l'orthographe.",
      schema: accordSujetVerbe,
      question: "Quel accord vérifies-tu en premier ?",
      solution:
        "L'ACCORD DU VERBE AVEC SON SUJET. C'est celui que le programme cite en tête. Ni la longueur des phrases, ni le nombre de paragraphes, ni la place des guillemets — ce sont d'autres relectures, et elles ne sont pas des accords.",
      micros: ["cm2_ecrit_codes"],
    },
    {
      titre: "Le défi",
      donnees: "Le maitre te rend un texte sans avoir souligné une seule faute.",
      schema: trouverSansQuOnMontre,
      question: "Que te demande-t-il ?",
      solution:
        "DE LES TROUVER SEUL. C'est exactement ce que le programme appelle « faire preuve d'autonomie », et la difficulté n'est pas l'effort : c'est qu'il faut chercher quelque chose dont on ignore l'endroit. D'où les deux relectures et les listes — elles remplacent le crayon rouge.",
      micros: ["cm2_ecrit_reviser_defi"],
    },
  ],
  pieges: [
    "Recopier son brouillon au propre en croyant l'avoir révisé.",
    "Rendre un brouillon propre : sans ratures, il n'a rien retravaillé.",
    "Confondre le brouillon et le plan : l'un se rature, l'autre se range.",
    "Relire deux fois en cherchant la même chose : la seconde ne trouve rien.",
    "Ne chercher que des fautes : le programme demande aussi d'enrichir.",
    "Attendre que le maitre souligne : au CM2, il ne souligne plus.",
    "Vérifier la ponctuation avant les accords : l'accord sujet-verbe passe en premier.",
  ],
  aRetenir: [
    "Réviser ajoute quelque chose au texte ; recopier ne fait que le déplacer.",
    "Un brouillon sans une seule rature n'a rien retravaillé.",
    "Deux relectures au moins, avec un but différent à chaque fois.",
    "Corriger ET enrichir : chercher des fautes seulement, c'est la moitié.",
    "Au CM2, on respecte SEUL les codes de l'écrit. C'est le mot « autonomie ».",
  ],
  entrainement: [
    {
      question: "« À quoi sert un brouillon ? »",
      correction: "À essayer, raturer et réorganiser avant la version finale.",
      micros: ["cm2_ecrit_brouillon"],
    },
    {
      question: "Tu as recopié ton brouillon au propre. As-tu révisé ?",
      correction: "Non : tu as déplacé le texte, tu ne lui as rien ajouté.",
      micros: ["cm2_ecrit_reviser"],
    },
    {
      question: "« Combien de fois faut-il relire un texte avant de le rendre ? »",
      correction: "Au moins deux fois, avec un but différent à chaque fois.",
      micros: ["cm2_ecrit_reviser"],
    },
    {
      question: "Ton texte n'a aucune faute mais reste plat. As-tu fini ?",
      correction: "Non : le programme demande d'améliorer, donc aussi d'enrichir.",
      micros: ["cm2_ecrit_reviser"],
    },
    {
      question: "Quel accord vérifies-tu en premier ?",
      correction: "Celui du verbe avec son sujet.",
      micros: ["cm2_ecrit_codes"],
    },
    {
      question: "Un camarade te dit : « On ne comprend pas qui parle. »",
      correction: "Tu ajoutes des tirets et tu nommes les personnages.",
      micros: ["cm2_ecrit_reviser_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm2",
};

export const slidesEcritureReviserCm2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Réviser son texte - CM2",
    section: {
      type: "objectif",
      phrase: "Réviser ajoute, recopier déplace",
      sousPhrase:
        "Une heure de recopie donne un texte magnifique — et exactement le même texte.",
      encadre: {
        titre: "L'idée",
        texte: "Le piège marche parce que recopier donne le sentiment d'avoir travaillé.",
      },
    },
  },
  {
    titre: "Le brouillon",
    badge: "Réviser son texte - CM2",
    section: {
      type: "duo",
      gauche: {
        titre: "Ce que ce n'est pas",
        contenu: "Une première version à recopier au propre. Ce serait écrire deux fois.",
      },
      droite: {
        titre: "Ce que c'est",
        contenu: "Un écrit à retravailler : on y essaie, on y rature, on y réorganise.",
      },
    },
    schema: brouillonARetravailler,
  },
  {
    titre: "La mesure qui ne trompe pas",
    badge: "Réviser son texte - CM2",
    section: {
      type: "etapes",
      etapes: [
        "Regarde ton brouillon SANS le lire.",
        "Aucune rature ? Il n'a rien retravaillé.",
        "C'est la seule fois où les ratures sont une bonne nouvelle.",
        "Et cela se voit à trois mètres.",
      ],
    },
    schema: raturesSignesDeTravail,
  },
  {
    titre: "Deux relectures, deux buts",
    badge: "Réviser son texte - CM2",
    section: {
      type: "etapes",
      etapes: [
        "PREMIER PASSAGE : est-ce que cela se comprend ?",
        "SECOND PASSAGE : les accords, en commençant par sujet-verbe.",
        "⛔ Deux fois en cherchant la même chose ne vaut pas mieux qu'une.",
        "On ne voit pas le sens et l'orthographe à la fois.",
      ],
    },
    schema: deuxRelecturesDeuxButs,
  },
  {
    titre: "Le mot du CM2 : seul",
    badge: "Réviser son texte - CM2",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La majuscule", texte: "Elle montre qu'une phrase commence." },
        { titre: "Le point", texte: "Il montre qu'elle finit." },
        { titre: "Le tiret", texte: "Il montre qui parle." },
        { titre: "L'alinéa", texte: "Il montre une idée neuve." },
      ],
    },
    schema: grilleCodes,
  },
  {
    titre: "À vous",
    badge: "Réviser son texte - CM2",
    section: {
      type: "exercice",
      enonce: "Tu as passé une heure à recopier ton brouillon au propre.",
      question: "As-tu révisé ton texte ?",
      indice: "Demande-toi ce que tu as AJOUTÉ.",
      correction:
        "NON. Tu as DÉPLACÉ le texte : mêmes phrases, mêmes fautes, au même endroit. Si tu ne peux citer aucune chose ajoutée, ta relecture n'a rien fait — même si la page est plus belle.",
    },
    schema: reviserOuRecopier,
  },
];
