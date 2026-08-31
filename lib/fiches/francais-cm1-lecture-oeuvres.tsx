// ─── Fiche de cours : lire une œuvre (CM1) ────────────────────────────────────
// CINQUIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ SÉPARATION À TROIS COLONNES — les deux voisines ont pris des fils forts, et
// la 6e prend même un micro que le CM1 porte aussi (la réaction du lecteur) :
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ ce qu'on perd dans un livre, ce sont les GENS | le THÈME n'est pas l'histoire, c'est un mot | le seul endroit où l'on te demande ce que TU ressens |
//   | les micros | relier · réaction · ⭐ HÉROS, PERSONNAGES ET RELATIONS | thème · carnet · persévérer | interpréter · justifier · ressentir |
//
// ⛔ NE PAS REDIRE : « le thème tient en un mot » appartient au CM2 ; « deux
// élèves peuvent comprendre la fin autrement et avoir raison tous les deux » à la
// 6e. La réaction personnelle est ici traitée en UNE propriété, sans reprendre
// leur développement.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT DU MICRO QUE PERSONNE D'AUTRE N'A —
// `cm1_oeuvre_personnages`, « identifier héros, personnages ET RELATIONS » :
// QUAND ON PERD LE FIL D'UN LIVRE, CE N'EST PRESQUE JAMAIS L'HISTOIRE QU'ON A
// PERDUE, CE SONT LES GENS. On ne sait plus qui est qui, ni qui en veut à qui.
// C'est vérifiable : demande à un enfant qui abandonne un roman ce qui s'est
// passé — il sait. Demande-lui qui est tel personnage — il ne sait plus.
//
// ⭐ Et le pool confirme le geste : « pour ne pas perdre le fil d'une histoire
// longue, résumer chaque chapitre en une phrase ». Le résumé sert à retenir les
// gens, pas les péripéties.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION, pas seulement dans l'accroche.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool OEUVRE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `lecture_oeuvres`) :
// - cm1_oeuvre_personnages → figure, propriétés 1 à 3, méthode 1, exemples 1 et 2
// - cm1_oeuvre_lien        → propriété 4, méthode 2, exemple 3
// - cm1_oeuvre_reaction    → propriété 5, exemple 4
// - cm1_oeuvre_defi        → propriété 6, méthode 3

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type { PhraseCanvasLien, PhraseCanvasMot } from "@/lib/tutor-v4/types";

function phrase(opts: {
  mots: (string | PhraseCanvasMot)[];
  liens?: PhraseCanvasLien[];
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "phrase",
        mots: opts.mots.map((m) => (typeof m === "string" ? { texte: m } : m)),
        liens: opts.liens,
        legende: opts.legende,
        largeurMax: 190,
      }}
    />
  );
}

/** ⚠️ Cellules courtes : à la largeur d'un bloc, vingt signes tombent sous le
 *  plancher de 11 px. */
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

// ─── Les dessins ──────────────────────────────────────────────────────────────

const cequOnPerd = phrase({
  mots: [
    { texte: "l'histoire", barre: true },
    { texte: "qui est qui", focus: true },
  ],
  legende: "Quand on perd le fil, c'est les gens qu'on a perdus.",
});

const grilleTroisRoles = grille({
  headers: ["Le rôle", "Ce qu'il fait"],
  rows: [
    { values: ["le narrateur", "il raconte"] },
    { values: ["le héros", "on le suit"] },
    { values: ["l'adversaire", "il s'oppose"] },
  ],
  caption: "Trois rôles différents. Le narrateur n'est pas toujours le héros.",
});

const herosPasGentil = phrase({
  mots: [
    { texte: "le plus gentil", barre: true },
    { texte: "celui qu'on suit", focus: true },
  ],
  legende: "Un héros n'est pas forcément courageux ni gentil.",
});

const unePhraseParChapitre = phrase({
  mots: [
    { texte: "un chapitre" },
    { texte: "une phrase", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "résumé en", type: "question" }],
  legende: "C'est ce qui empêche de perdre les gens en route.",
});

const relierDeuxLivres = phrase({
  mots: [
    { texte: "ce livre" },
    { texte: "celui de la classe", focus: true },
  ],
  legende: "Deux histoires différentes peuvent avoir le même genre de héros.",
});

const direCeQuOnARessenti = phrase({
  mots: [
    { texte: "j'ai eu peur" },
    { texte: "à quel moment", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "et", type: "question" }],
  legende: "Ton avis compte — à condition de montrer le passage.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheLectureOeuvresCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "lecture-oeuvres",
  titre: `Lire une œuvre en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Quand tu abandonnes un livre trop long, ce n'est presque jamais l'histoire que tu as perdue. Tu sais encore ce qui s'est passé. Ce que tu as perdu, c'est qui est qui.",
  identite: [
    { label: "Mots clés", valeur: "Héros, narrateur, adversaire" },
    { label: "Le secret", valeur: "On perd les gens, pas l'histoire" },
    { label: "Outil", valeur: "Une phrase par chapitre" },
  ],
  definition: {
    texte: [
      "Dans un livre, il y a une histoire — et il y a des gens.",
      "Trois rôles reviennent toujours. Le narrateur raconte. Le héros, c'est celui qu'on suit. L'adversaire s'oppose à lui.",
      "Attention : le héros n'est pas forcément le plus gentil ni le plus courageux. C'est simplement celui que l'histoire suit.",
      "Et quand un livre est long et qu'on décroche, ce n'est presque jamais l'histoire qu'on a perdue : c'est qui est qui.",
      "Une phrase écrite après chaque chapitre suffit à les garder.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(cequOnPerd, grilleTroisRoles),
  },
  proprietes: [
    {
      titre: "Le narrateur raconte",
      texte: "C'est la voix qui te parle. Ce n'est pas toujours le héros.",
      schema: grilleTroisRoles,
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      titre: "Le héros est celui qu'on suit",
      texte: "Pas le plus gentil, pas le plus fort. Celui dont l'histoire raconte les journées.",
      schema: herosPasGentil,
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      titre: "L'adversaire s'oppose au héros",
      texte: "Sans lui, rien n'arriverait. C'est lui qui met l'histoire en marche.",
      schema: grilleTroisRoles,
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      titre: "On relie un livre à un autre",
      texte: "Deux histoires différentes peuvent avoir le même genre de héros.",
      schema: relierDeuxLivres,
      micros: ["cm1_oeuvre_lien"],
    },
    {
      titre: "Ton avis a sa place",
      texte: "« J'ai eu peur ici » est une bonne réponse — si tu montres où.",
      schema: direCeQuOnARessenti,
      micros: ["cm1_oeuvre_reaction"],
    },
    {
      titre: "Le défi : ne pas perdre les gens",
      texte: "Une phrase par chapitre. C'est peu, et ça change tout sur un livre long.",
      schema: unePhraseParChapitre,
      micros: ["cm1_oeuvre_defi"],
    },
  ],
  reel: {
    texte:
      "C'est pareil avec une série. Après trois épisodes tu sais ce qui s'est passé, mais tu demandes « c'est qui, lui, déjà ? ». Ce n'est pas l'intrigue qui te lâche : ce sont les visages. Un livre te demande de retenir les gens sans jamais te les montrer.",
  },
  historique: {
    texte:
      "Chez les Grecs, un « héros » n'était pas quelqu'un de courageux. C'était un être à moitié humain, à moitié divin — ni tout à fait un homme, ni un dieu. Le sens de « brave » est venu bien plus tard. Le mot n'a jamais promis d'être gentil.",
  },
  methode: [
    {
      titre: "Note les gens, pas l'histoire",
      texte: "Un nom, un mot pour dire qui c'est. « Léo : le petit frère. » Ça suffit.",
      schema: grilleTroisRoles,
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      titre: "Demande-toi qui en veut à qui",
      texte: "Les relations tiennent l'histoire. Sans elles, ce ne sont que des noms.",
      schema: relierDeuxLivres,
      micros: ["cm1_oeuvre_lien"],
    },
    {
      titre: "Une phrase à la fin de chaque chapitre",
      texte: "Écrite, pas pensée. Tu la reliras avant de reprendre, et tu ne seras pas perdu.",
      schema: unePhraseParChapitre,
      micros: ["cm1_oeuvre_defi"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Qui raconte ?",
      donnees: "« Dans un récit, la personne qui raconte l'histoire s'appelle… »",
      schema: grilleTroisRoles,
      question: "Comment s'appelle-t-elle ?",
      solution:
        "Le narrateur. C'est la voix qui te parle — et ce n'est pas toujours le héros, même quand elle dit « je ».",
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      titre: "Qui s'oppose ?",
      donnees: "« Le personnage qui s'oppose au héros s'appelle souvent… »",
      schema: herosPasGentil,
      question: "Comment l'appelle-t-on ?",
      solution:
        "L'adversaire, ou le méchant. Sans lui, il n'y aurait pas d'histoire : c'est lui qui met tout en marche.",
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      titre: "Un livre long",
      donnees: "Tu reprends ton roman après une semaine et tu es perdu.",
      schema: unePhraseParChapitre,
      question: "Qu'aurais-tu dû faire ?",
      solution:
        "Écrire une phrase après chaque chapitre. Pas pour l'histoire — tu t'en souviens — mais pour retenir qui est qui.",
      micros: ["cm1_oeuvre_lien"],
    },
    {
      titre: "Dire ce qu'on a aimé",
      donnees: "On te demande ce que tu as pensé du livre.",
      schema: direCeQuOnARessenti,
      question: "Que réponds-tu ?",
      solution:
        "Ce que tu as ressenti, et à quel moment. « J'ai eu peur quand le loup arrive » vaut mieux que « c'était bien ».",
      micros: ["cm1_oeuvre_reaction"],
    },
  ],
  pieges: [
    "Croire que le héros est forcément gentil ou courageux.",
    "Confondre le narrateur et le héros, surtout quand il dit « je ».",
    "Résumer les péripéties et oublier les personnages.",
    "Répondre « c'était bien » sans dire à quel moment.",
    "Reprendre un livre long sans relire de quoi il parlait.",
  ],
  aRetenir: [
    "Trois rôles : le narrateur raconte, on suit le héros, l'adversaire s'oppose.",
    "Le héros n'est pas le plus gentil : c'est celui qu'on suit.",
    "Quand on décroche d'un livre, on a perdu les gens, pas l'histoire.",
    "Une phrase après chaque chapitre suffit à les garder.",
    "Ton avis compte, si tu montres le passage.",
  ],
  entrainement: [
    {
      question: "« Dans un récit, la personne qui raconte l'histoire s'appelle… »",
      correction: "Le narrateur.",
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      question: "« Le personnage qui s'oppose au héros s'appelle souvent… »",
      correction: "L'adversaire, ou le méchant.",
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      question: "Le héros est-il forcément le plus gentil ?",
      correction: "Non. C'est celui que l'histoire suit.",
      micros: ["cm1_oeuvre_personnages"],
    },
    {
      question: "Pour ne pas perdre le fil d'une histoire longue, on peut…",
      correction: "Résumer chaque chapitre en une phrase.",
      micros: ["cm1_oeuvre_defi"],
    },
    {
      question: "« C'était bien. » Est-ce une bonne réponse ?",
      correction: "Pas encore. Dis ce que tu as ressenti, et à quel moment.",
      micros: ["cm1_oeuvre_reaction"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesLectureOeuvresCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Lire une œuvre - CM1",
    section: {
      type: "objectif",
      phrase: "On perd les gens, pas l'histoire",
      sousPhrase: "Quand tu abandonnes un livre, tu sais encore ce qui s'est passé.",
      encadre: { titre: "L'idée", texte: "Ce que tu as perdu, c'est qui est qui." },
    },
  },
  {
    titre: "Trois rôles",
    badge: "Lire une œuvre - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le narrateur", texte: "Il raconte. Ce n'est pas toujours le héros." },
        { titre: "Le héros", texte: "Celui qu'on suit. Pas forcément le gentil." },
        { titre: "L'adversaire", texte: "Il s'oppose. Sans lui, rien n'arrive." },
      ],
    },
    schema: grilleTroisRoles,
  },
  {
    titre: "Un héros n'est pas un gentil",
    badge: "Lire une œuvre - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Chez les Grecs, un héros était mi-homme, mi-dieu.",
        "Le sens de « courageux » est venu bien plus tard.",
        "Le mot n'a jamais promis d'être gentil.",
      ],
    },
    schema: herosPasGentil,
  },
  {
    titre: "À vous",
    badge: "Lire une œuvre - CM1",
    section: {
      type: "exercice",
      enonce: "Tu reprends ton roman après une semaine et tu es perdu.",
      question: "Qu'aurais-tu dû faire ?",
      indice: "Ce n'est pas l'histoire que tu as oubliée.",
      correction: "Écrire une phrase après chaque chapitre, pour retenir qui est qui.",
    },
    schema: unePhraseParChapitre,
  },
];
