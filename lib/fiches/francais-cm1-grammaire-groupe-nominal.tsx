// ─── Fiche de cours : le groupe nominal et son noyau (CM1) ────────────────────
// VINGT-ET-UNIÈME FICHE DU CHANTIER CM1, cinquième des six de grammaire.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⭐⭐ LA SÉPARATION SE LIT ENCORE DANS LE VERBE DE LA MICRO, comme pour
// `classes_mots` : `cm1_gram_gn_epithete` dit « repérer le nom noyau et
// ABORDER LA NOTION d'épithète ». Aborder — pas distinguer, pas différencier.
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | l'épithète | ⭐ abordée : un adjectif collé au nom | opposée à l'ATTRIBUT | opposée au COMPLÉMENT DU NOM, « SANS AMBIGÜITÉ » (mot du BO) |
//   | le fil | ⭐ RÉDUIS le groupe, et regarde ce qui reste | — | le noyau commande |
//
// ⛔ NE PAS REDIRE : « Le noyau commande » est un TITRE DE PROPRIÉTÉ de
// `francais-6e-grammaire-groupe-nominal`, et l'opposition épithète / complément
// du nom est tout le cœur de cette fiche-là — le BO de 6e y écrit « sans
// ambigüité », qui est son niveau d'exigence, pas celui du CM1.
// ⚠️ Côté CM2, `grammaire_groupe_nominal` n'a pas de fiche à elle : elle
// redirige vers `francais/cm2/grammaire-orthographe`, la fiche d'avant le
// chantier, dont le découpage attend un arbitrage. Rien à écarter de ce côté.
//
// ⭐⭐ LA DÉCOUVERTE, ET C'EST UNE MANIPULATION DE PLUS : ON RÉDUIT LE GROUPE.
// « Ce vieux livre poussiéreux » se ramène à « ce livre ». Les mots qu'on a pu
// retirer sont les expansions ; celui qu'on ne peut pas retirer est le noyau.
// L'enfant ne cherche donc pas « le mot le plus important » — jugement qu'il ne
// sait pas porter — il enlève, et le dernier debout se désigne lui-même.
//
// ⭐⭐ ET C'EST LE QUATRIÈME GESTE DE L'ANNÉE, ce qui fait du CM1 l'année des
// MANIPULATIONS, fiche après fiche :
//     `grammaire_phrase`       → ENCADRER par « c'est … qui »
//     `grammaire_complements`  → ENLEVER et DÉPLACER
//     `grammaire_classes_mots` → METTRE AU PLURIEL
//     ici                      → RÉDUIRE
// Le dire à l'élève donne une cohérence à toute sa grammaire de CM1 : il n'y a
// pas quatre leçons, il y a quatre essais.
//
// ⭐ La fiche prépare aussi la suivante (`grammaire_accords`) par sa propriété 5 :
// le pool le dit — « quel mot commande l'accord dans le groupe nominal ? — le
// nom ».
//
// ⚠️ RÈGLE DE COULEUR : « épithète » est une FONCTION, elle passe donc par
// `groupes[].label` et le canvas la colore (rose). Les natures — nom, adjectif,
// déterminant — restent en gris sur `mots[].nature`. Même dispositif qu'à la
// fiche précédente.
//
// Alignée sur les pools GN et GN_EPITHETE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
// Les groupes sont CEUX DE LA BANQUE : « un grand bateau blanc », « ce vieux
// livre poussiéreux », « le vieux tamarin », « une plage déserte », « le chien
// du voisin », « des fleurs rouges ».
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 3 de la notion `grammaire_groupe_nominal`) :
// - cm1_gram_gn          → figure, propriétés 1, 4 et 5, méthode 1, exemples 3 et 4
// - cm1_gram_gn_epithete → propriétés 2 et 3, méthodes 2 et 3, exemples 1 et 2
// - cm1_gram_gn_defi     → propriété 6

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

const reduireLeGroupe = phrase({
  mots: [
    { texte: "ce vieux livre poussiéreux", barre: true },
    { texte: "ce livre", focus: true },
  ],
  legende: "Enlève tout ce que tu peux. Le dernier debout est le noyau.",
});

const grilleQuatreEssais = grille({
  headers: ["Le geste", "Il montre"],
  rows: [
    { values: ["encadrer", "le sujet"] },
    { values: ["enlever", "un complément"] },
    { values: ["réduire", "le noyau"] },
  ],
  caption: "Quatre essais cette année, pas quatre leçons.",
});

const noyauQuiReste = phrase({
  mots: [
    { texte: "un grand" },
    { texte: "bateau", nature: "nom", focus: true },
    { texte: "blanc" },
  ],
  legende: "On peut retirer « grand » et « blanc ». Pas « bateau ».",
});

const adjectifDevant = phrase({
  mots: ["le", "grand", "bateau"],
  groupes: [{ mots: [1, 1], label: "épithète" }],
  legende: "Ici l'adjectif est posé avant le nom.",
});

const adjectifDerriere = phrase({
  mots: ["une", "plage", "déserte"],
  groupes: [{ mots: [2, 2], label: "épithète" }],
  legende: "Et là, le même travail, mais après le nom.",
});

const expansionGroupe = phrase({
  mots: ["le", "chien", "du voisin"],
  groupes: [{ mots: [2, 2], label: "expansion" }],
  legende: "Une expansion peut être un groupe entier, amené par un petit mot.",
});

const noyauCommandeLAccord = phrase({
  mots: [
    { texte: "des" },
    { texte: "fleurs", nature: "nom", focus: true },
    { texte: "rouges" },
  ],
  legende: "C'est « fleurs » qui met un s aux deux autres.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireGroupeNominalCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "grammaire-groupe-nominal",
  titre: `Le groupe nominal et son noyau en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Ce vieux livre poussiéreux » : enlève « vieux », enlève « poussiéreux ». Il reste « ce livre », et ça se dit encore. Le mot que tu n'as pas pu enlever, c'est le noyau.",
  identite: [
    { label: "Mots clés", valeur: "Noyau, expansion, épithète" },
    { label: "Le secret", valeur: "Réduis, et regarde ce qui reste" },
    { label: "Outil", valeur: "Enlève les mots un par un" },
  ],
  definition: {
    texte: [
      "Un groupe nominal est un petit paquet de mots rangés autour d'un nom.",
      "Pour trouver ce nom, on ne cherche pas le mot le plus important : on réduit. « Ce vieux livre poussiéreux » devient « ce livre », et ça se dit encore.",
      "Le mot qu'on n'a pas pu retirer est le nom noyau. Tout ce qu'on a enlevé, ce sont ses expansions.",
      "Une expansion peut être un adjectif — « le grand bateau », « une plage déserte » : il se met devant ou derrière. Quand il est collé au nom comme ça, on l'appelle une épithète.",
      "Elle peut aussi être un groupe entier amené par un petit mot : « le chien du voisin ».",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(reduireLeGroupe, grilleQuatreEssais),
  },
  proprietes: [
    {
      titre: "Un groupe nominal se réduit",
      texte: "Enlève les mots un par un tant que ça se dit encore.",
      schema: reduireLeGroupe,
      micros: ["cm1_gram_gn"],
    },
    {
      titre: "Le mot qui reste est le noyau",
      texte: "Dans « un grand bateau blanc », c'est « bateau » qui ne peut pas partir.",
      schema: noyauQuiReste,
      micros: ["cm1_gram_gn_epithete"],
    },
    {
      titre: "L'adjectif se met devant ou derrière",
      texte: "« Le grand bateau », « une plage déserte ». Collé au nom, il est épithète.",
      schema: adjectifDevant,
      micros: ["cm1_gram_gn_epithete"],
    },
    {
      titre: "Une expansion peut être un groupe",
      texte: "« Le chien du voisin » : « du voisin » précise de quel chien on parle.",
      schema: expansionGroupe,
      micros: ["cm1_gram_gn"],
    },
    {
      titre: "Le nom donne le genre et le nombre",
      texte: "Dans « des fleurs rouges », c'est « fleurs » qui met un s aux deux autres.",
      schema: noyauCommandeLAccord,
      micros: ["cm1_gram_gn"],
    },
    {
      titre: "Le défi : réduis le groupe",
      texte: "Un quatrième essai cette année. Encadrer, enlever, mettre au pluriel, réduire.",
      schema: grilleQuatreEssais,
      micros: ["cm1_gram_gn_defi"],
    },
  ],
  reel: {
    texte:
      "Quand tu ranges ton sac, tu enlèves ce qui peut sortir et tu gardes ce dont tu as besoin. Un groupe nominal se range pareil : ce qui peut sortir, ce sont les expansions ; ce qui reste au fond, c'est le nom.",
  },
  historique: {
    texte:
      "Le mot noyau vient du latin nux, la noix. On a d'abord appelé noyau ce qu'il y a de dur au centre d'un fruit. En grammaire, il désigne la même chose : ce qui reste quand on a retiré toute la chair.",
  },
  methode: [
    {
      titre: "Enlève les mots un par un",
      texte: "Après chaque retrait, relis. Tant que ça se dit, continue.",
      schema: reduireLeGroupe,
      micros: ["cm1_gram_gn"],
    },
    {
      titre: "Essaie d'enlever le nom, pour voir",
      texte: "« Un grand blanc » ne veut plus rien dire : c'était donc lui, le noyau.",
      schema: noyauQuiReste,
      micros: ["cm1_gram_gn_epithete"],
    },
    {
      titre: "Cherche l'adjectif des deux côtés",
      texte: "Il peut être avant le nom comme après. Regarde à gauche et à droite.",
      schema: adjectifDerriere,
      micros: ["cm1_gram_gn_epithete"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Ce vieux livre poussiéreux",
      donnees: "« ce vieux livre poussiéreux »",
      schema: reduireLeGroupe,
      question: "Quel est le nom noyau ?",
      solution:
        "« Livre ». On enlève « vieux », puis « poussiéreux » : « ce livre » se dit encore. Enlever « livre », non.",
      micros: ["cm1_gram_gn_epithete"],
    },
    {
      titre: "Devant ou derrière",
      donnees: "« le grand bateau » · « une plage déserte »",
      schema: adjectifDerriere,
      question: "Où est l'adjectif ?",
      solution:
        "Devant dans le premier, derrière dans le second. Les deux sont des épithètes : ce qui compte, c'est qu'ils soient collés au nom.",
      micros: ["cm1_gram_gn_epithete"],
    },
    {
      titre: "Le chien du voisin",
      donnees: "« le chien du voisin »",
      schema: expansionGroupe,
      question: "Quelle est l'expansion ?",
      solution:
        "« Du voisin ». Ce n'est pas un adjectif mais un groupe entier, et il précise de quel chien on parle.",
      micros: ["cm1_gram_gn"],
    },
    {
      titre: "Des fleurs rouges",
      donnees: "« des fleurs rouges »",
      schema: noyauCommandeLAccord,
      question: "Qui décide du s ?",
      solution:
        "Le noyau « fleurs ». C'est lui qui donne le nombre au déterminant et à l'adjectif — ce sera toute la leçon suivante.",
      micros: ["cm1_gram_gn"],
    },
  ],
  pieges: [
    "Chercher le mot le plus important au lieu de réduire.",
    "Croire que l'adjectif est toujours après le nom.",
    "Prendre le déterminant pour le noyau.",
    "Oublier qu'une expansion peut être un groupe entier.",
    "Réduire jusqu'à casser le sens et s'arrêter trop tard.",
  ],
  aRetenir: [
    "Un groupe nominal est rangé autour d'un nom.",
    "Réduis-le : le dernier mot debout est le noyau.",
    "Ce qu'on a enlevé, ce sont les expansions.",
    "Un adjectif collé au nom est une épithète.",
    "Le nom donne son genre et son nombre aux autres.",
  ],
  entrainement: [
    {
      question: "Dans « un grand bateau blanc », quel est le nom principal ?",
      correction: "Bateau.",
      micros: ["cm1_gram_gn"],
    },
    {
      question: "Quel est le nom noyau de « ce vieux livre poussiéreux » ?",
      correction: "Livre.",
      micros: ["cm1_gram_gn_epithete"],
    },
    {
      question: "Dans « le chien du voisin », quelle est l'expansion ?",
      correction: "Du voisin.",
      micros: ["cm1_gram_gn"],
    },
    {
      question: "Quel mot commande l'accord dans le groupe nominal ?",
      correction: "Le nom.",
      micros: ["cm1_gram_gn"],
    },
    {
      question: "Tu ne trouves pas le noyau. Que fais-tu ?",
      correction: "Tu enlèves les mots un par un tant que ça se dit encore.",
      micros: ["cm1_gram_gn_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesGrammaireGroupeNominalCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Le groupe nominal - CM1",
    section: {
      type: "objectif",
      phrase: "Réduis, et regarde ce qui reste",
      sousPhrase: "« Ce vieux livre poussiéreux » devient « ce livre ». Ça se dit encore.",
      encadre: { titre: "L'idée", texte: "Le dernier mot debout est le noyau." },
    },
  },
  {
    titre: "Quatre essais cette année",
    badge: "Le groupe nominal - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Encadrer", texte: "« C'est … qui » montre le sujet." },
        { titre: "Enlever", texte: "Le groupe qui part est un complément." },
        { titre: "Réduire", texte: "Ce qui reste est le noyau." },
      ],
    },
    schema: grilleQuatreEssais,
  },
  {
    titre: "Comme un sac",
    badge: "Le groupe nominal - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu enlèves ce qui peut sortir.",
        "Tu gardes ce dont tu as besoin.",
        "Ce qui reste au fond, c'est le nom.",
      ],
    },
    schema: noyauQuiReste,
  },
  {
    titre: "À vous",
    badge: "Le groupe nominal - CM1",
    section: {
      type: "exercice",
      enonce: "« le chien du voisin »",
      question: "Quelle est l'expansion ?",
      indice: "Qu'est-ce qui peut sortir sans casser la phrase ?",
      correction: "« Du voisin » — un groupe entier, pas un adjectif.",
    },
    schema: expansionGroupe,
  },
];
