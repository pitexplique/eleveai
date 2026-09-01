// ─── Fiche de cours : les compléments du verbe (CM1) ──────────────────────────
// DIX-NEUVIÈME FICHE DU CHANTIER CM1, troisième des six de grammaire.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⭐⭐ LA SÉPARATION D'AVEC LE CM2 EST ÉCRITE DANS LE LIBELLÉ D'UNE MICRO, et
// c'est le cas le plus net de tout le chantier : `cm1_gram_complements_
// circonstanciels` dit « repérer un groupe circonstanciel, SANS LE NOMMER ».
// Le CM2, lui, a `cm2_gram_cc_sortes` — quand, où, pourquoi — et en plus
// `cm2_gram_attribut`, que le CM1 n'a pas du tout.
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ tu n'as pas besoin de savoir comment ça s'appelle | ce qui s'accroche au verbe, nommé |
//   | le circonstanciel | ⭐ repéré, jamais nommé | temps, lieu, cause |
//   | l'attribut | ⛔ absent du programme du CM1 | traité |
//
// ⭐⭐ D'OÙ LA DÉCOUVERTE, ET ELLE EST LIBÉRATRICE POUR UN ENFANT DE NEUF ANS :
// LE TEST SE FAIT AVEC LES MAINS, PAS AVEC LE VOCABULAIRE. Deux gestes suffisent
// — essaie de l'enlever, essaie de le déplacer. Le groupe qui supporte les deux
// est de ceux qu'on peut retirer ; celui qui casse la phrase est accroché au
// verbe. Le nom de la sorte viendra au CM2, et le dire à l'élève lui enlève la
// moitié du poids de la notion.
//
// ⭐ ET LA FICHE PROLONGE `grammaire_phrase`, écrite juste avant : le CM1 vient
// d'apprendre qu'en grammaire on prouve au lieu de deviner. Ici la preuve
// continue, avec deux manipulations de plus.
//
// ⛔ NE PAS REDIRE : « c'est cette différence de COMPORTEMENT qui définit les
// deux, pas leur place » est la ligne du CM2 (en-tête de
// `francais-cm2-grammaire-complements`). Ici on ne compare pas les deux familles
// par leur comportement : on donne à l'élève DEUX GESTES, et on lui retire
// l'obligation de nommer.
//
// ⭐ Les deux définitions du COD et du COI viennent des méthodes du pool, qui
// sont déjà écrites pour des enfants : « direct veut dire : RIEN entre le verbe
// et lui » · « indirect veut dire : ON Y ARRIVE PAR UN PETIT MOT ».
//
// ⚠️⚠️ RÈGLE DE COULEUR : comme pour `grammaire_phrase`, elle s'applique DANS
// L'AUTRE SENS. Cette fiche parle de fonctions, donc les étiquettes sont posées
// et le canvas les colore — sujet en bleu, objet en vert, circonstanciel en
// orange. La couleur EST la leçon.
//
// Alignée sur les pools COMPLEMENTS et COD_COI de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
// Les phrases sont CELLES DE LA BANQUE : « Léa mange une mangue », « Léa parle
// à sa grand-mère », « Il pense à son voyage », « Le samedi, les enfants jouent
// sur la plage ».
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 4 de la notion `grammaire_complements`) :
// - cm1_gram_complements                  → figure, propriétés 1 et 4, méthode 1, exemple 1
// - cm1_gram_cod_coi                      → propriétés 5 et 6, méthode 3, exemples 2 et 3
// - cm1_gram_complements_circonstanciels  → propriétés 2 et 3, méthode 2, exemple 4
// - cm1_gram_complements_defi             → propriété 6 et dernier entrainement

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

const troisGroupes = phrase({
  mots: ["Hier", "Léa", "mange", "une mangue"],
  groupes: [
    { mots: [0, 0], label: "circonstanciel", deplacable: true },
    { mots: [1, 1], label: "sujet" },
    { mots: [3, 3], label: "objet" },
  ],
  legende: "Un seul de ces groupes peut s'enlever sans casser la phrase.",
});

const grilleDeuxGestes = grille({
  headers: ["Tu essaies", "Ça marche"],
  rows: [
    { values: ["enlever hier", "oui"] },
    { values: ["déplacer hier", "oui"] },
    { values: ["enlever la mangue", "non"] },
  ],
  caption: "Deux gestes suffisent. Aucun nom n'est demandé.",
});

const sansLeNommer = phrase({
  mots: [
    { texte: "son nom", barre: true },
    { texte: "deux essais", focus: true },
  ],
  legende: "Cette année tu le repères. Le nommer viendra au CM2.",
});

const objetColleAuVerbe = phrase({
  mots: ["Léa", "mange", "une mangue"],
  groupes: [{ mots: [2, 2], label: "objet direct" }],
  liens: [{ de: 1, vers: 2, label: "mange quoi ?", type: "question" }],
  legende: "Rien entre le verbe et lui : il est direct.",
});

const objetParPetitMot = phrase({
  mots: ["Léa", "parle", "à sa grand-mère"],
  groupes: [{ mots: [2, 2], label: "objet indirect" }],
  liens: [{ de: 1, vers: 2, label: "parle à qui ?", type: "question" }],
  legende: "On y arrive par un petit mot : il est indirect.",
});

const groupeQuiSePromene = phrase({
  mots: ["Le samedi", "les enfants", "jouent"],
  groupes: [
    { mots: [0, 0], label: "circonstanciel", deplacable: true },
    { mots: [1, 1], label: "sujet" },
  ],
  legende: "Il se déplace au bout de la phrase sans rien casser.",
});

const objetQuiResiste = phrase({
  mots: [
    { texte: "Léa mange", barre: true },
    { texte: "une mangue", focus: true },
  ],
  legende: "Enlève-le et la phrase boite : il est accroché au verbe.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGrammaireComplementsCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "grammaire-complements",
  titre: `Les compléments du verbe en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Bonne nouvelle : cette année, tu n'as pas à savoir comment un groupe s'appelle. Tu as seulement à essayer deux choses — l'enlever, et le déplacer.",
  identite: [
    { label: "Mots clés", valeur: "Objet, direct, indirect" },
    { label: "Le secret", valeur: "Essaie, ne nomme pas" },
    { label: "Outil", valeur: "Enlever, puis déplacer" },
  ],
  definition: {
    texte: [
      "Autour du verbe, tous les groupes ne se valent pas.",
      "Certains s'enlèvent et se déplacent sans casser la phrase : « Hier, Léa mange une mangue » devient « Léa mange une mangue ».",
      "D'autres ne bougent pas. Enlève « une mangue » et la phrase boite : ce groupe-là est accroché au verbe, c'est son objet.",
      "Pour l'objet, une seule chose à regarder : le petit mot. « Léa mange une mangue » — rien entre les deux, il est direct. « Léa parle à sa grand-mère » — on y arrive par « à », il est indirect.",
      "Et pour le groupe qui se promène, tu n'as pas à dire son nom cette année. Tu as juste à le repérer.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(troisGroupes, grilleDeuxGestes),
  },
  proprietes: [
    {
      titre: "Tous les groupes ne se valent pas",
      texte: "Autour du verbe, certains s'enlèvent, d'autres non. C'est la seule vraie différence.",
      schema: troisGroupes,
      micros: ["cm1_gram_complements"],
    },
    {
      titre: "Essaie de l'enlever, essaie de le déplacer",
      texte: "S'il supporte les deux, c'est un groupe qu'on peut retirer.",
      schema: groupeQuiSePromene,
      micros: ["cm1_gram_complements_circonstanciels"],
    },
    {
      titre: "Tu n'as pas à le nommer",
      texte: "Il dit quand, où ou pourquoi. Le nom de sa sorte, ce sera pour le CM2.",
      schema: sansLeNommer,
      micros: ["cm1_gram_complements_circonstanciels"],
    },
    {
      titre: "L'objet, lui, résiste",
      texte: "Enlève-le et la phrase boite. Il est accroché au verbe.",
      schema: objetQuiResiste,
      micros: ["cm1_gram_complements"],
    },
    {
      titre: "Direct : rien entre le verbe et lui",
      texte: "« Léa mange une mangue. » On demande : mange quoi ?",
      schema: objetColleAuVerbe,
      micros: ["cm1_gram_cod_coi"],
    },
    {
      titre: "Indirect : on y arrive par un petit mot",
      texte: "« Léa parle à sa grand-mère. » Le mot « à » est la marque.",
      schema: objetParPetitMot,
      micros: ["cm1_gram_cod_coi"],
    },
  ],
  reel: {
    texte:
      "Pour savoir si un meuble est fixé au mur, tu ne le regardes pas : tu tires dessus. Un groupe de mots se teste pareil — on essaie de l'enlever, et la phrase dit s'il tenait quelque chose.",
  },
  historique: {
    texte:
      "Le mot complément vient du latin complere, remplir. Un complément remplit la phrase : il la complète sans en être le cœur. Le nom dit déjà ce que le test vérifie — ce qui remplit peut parfois se retirer.",
  },
  methode: [
    {
      titre: "Enlève le groupe et relis",
      texte: "Si la phrase tient encore debout, c'est un groupe qu'on peut retirer.",
      schema: groupeQuiSePromene,
      micros: ["cm1_gram_complements"],
    },
    {
      titre: "Déplace-le au bout de la phrase",
      texte: "« Les enfants jouent le samedi. » Ça marche ? Alors il se promène.",
      schema: sansLeNommer,
      micros: ["cm1_gram_complements_circonstanciels"],
    },
    {
      titre: "Pour l'objet, cherche le petit mot",
      texte: "S'il y a « à » ou « de » avant, il est indirect. Sinon, il est direct.",
      schema: objetParPetitMot,
      micros: ["cm1_gram_cod_coi"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Le samedi, les enfants jouent",
      donnees: "« Le samedi, les enfants jouent sur la plage. »",
      schema: groupeQuiSePromene,
      question: "Quels groupes peux-tu enlever ?",
      solution:
        "« Le samedi » et « sur la plage ». La phrase « Les enfants jouent » tient encore. Tu n'as pas à dire comment ils s'appellent.",
      micros: ["cm1_gram_complements"],
    },
    {
      titre: "Léa mange une mangue",
      donnees: "« Léa mange une mangue. »",
      schema: objetColleAuVerbe,
      question: "Que devient la phrase sans « une mangue » ?",
      solution:
        "« Léa mange » — on attend la suite. Ce groupe est accroché au verbe : c'est un objet, et il est direct, car rien ne s'est glissé entre les deux.",
      micros: ["cm1_gram_cod_coi"],
    },
    {
      titre: "Il pense à son voyage",
      donnees: "« Il pense à son voyage. »",
      schema: objetParPetitMot,
      question: "Direct ou indirect ?",
      solution:
        "Indirect. On ne pense pas quelque chose, on pense À quelque chose : le petit mot « à » signe l'objet indirect.",
      micros: ["cm1_gram_cod_coi"],
    },
    {
      titre: "Deux essais, pas un avis",
      donnees: "Tu hésites sur le groupe « hier » dans une phrase.",
      schema: grilleDeuxGestes,
      question: "Comment trancher ?",
      solution:
        "Tu l'enlèves : la phrase tient. Tu le déplaces : elle tient encore. C'est prouvé, et tu n'as eu besoin d'aucun nom.",
      micros: ["cm1_gram_complements_circonstanciels"],
    },
  ],
  pieges: [
    "Vouloir nommer le groupe alors qu'on demande de le repérer.",
    "Croire qu'un groupe placé en tête est forcément déplaçable.",
    "Enlever l'objet et trouver que « ça se dit quand même ».",
    "Oublier de regarder le petit mot avant de dire direct.",
    "Répondre à l'impression au lieu de faire les deux essais.",
  ],
  aRetenir: [
    "Certains groupes s'enlèvent et se déplacent, d'autres non.",
    "Deux gestes : enlever, déplacer.",
    "Le groupe qui se promène, tu le repères sans le nommer.",
    "Direct : rien entre le verbe et lui.",
    "Indirect : on y arrive par « à » ou « de ».",
  ],
  entrainement: [
    {
      question: "Dans « Léa mange une mangue », que devient la phrase sans « une mangue » ?",
      correction: "Elle boite : ce groupe est accroché au verbe.",
      micros: ["cm1_gram_complements"],
    },
    {
      question: "Dans « Léa mange une mangue », « une mangue » est…",
      correction: "Un complément d'objet direct.",
      micros: ["cm1_gram_cod_coi"],
    },
    {
      question: "Dans « Léa parle à sa grand-mère », le groupe « à sa grand-mère » est…",
      correction: "Un complément d'objet indirect.",
      micros: ["cm1_gram_cod_coi"],
    },
    {
      question: "« Le samedi, les enfants jouent. » Que peux-tu enlever ?",
      correction: "« Le samedi » — la phrase tient encore.",
      micros: ["cm1_gram_complements_circonstanciels"],
    },
    {
      question: "Comment prouver qu'un groupe peut se retirer ?",
      correction: "On l'enlève, puis on le déplace. S'il supporte les deux, c'est prouvé.",
      micros: ["cm1_gram_complements_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesGrammaireComplementsCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Les compléments du verbe - CM1",
    section: {
      type: "objectif",
      phrase: "Essaie, ne nomme pas",
      sousPhrase: "Cette année, tu n'as pas à savoir comment le groupe s'appelle.",
      encadre: { titre: "L'idée", texte: "Deux gestes : enlever, puis déplacer." },
    },
  },
  {
    titre: "Deux gestes",
    badge: "Les compléments du verbe - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Enlever", texte: "La phrase tient-elle encore ?" },
        { titre: "Déplacer", texte: "Se met-il au bout sans casser ?" },
        { titre: "Le petit mot", texte: "« à », « de » : c'est indirect." },
      ],
    },
    schema: grilleDeuxGestes,
  },
  {
    titre: "Comme un meuble",
    badge: "Les compléments du verbe - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu veux savoir s'il est fixé au mur.",
        "Tu ne le regardes pas : tu tires dessus.",
        "Un groupe de mots se teste pareil.",
      ],
    },
    schema: troisGroupes,
  },
  {
    titre: "À vous",
    badge: "Les compléments du verbe - CM1",
    section: {
      type: "exercice",
      enonce: "« Il pense à son voyage. »",
      question: "Direct ou indirect ?",
      indice: "Regarde s'il y a un petit mot entre le verbe et le groupe.",
      correction: "Indirect : on pense À quelque chose.",
    },
    schema: objetParPetitMot,
  },
];
