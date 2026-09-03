// ─── Fiche d'activité : être et avoir au présent (CP) ─────────────────────────
// CINQUIÈME FICHE DU CYCLE 2.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET C'EST L'OBSTACLE MÊME DU CP :
// « "Il chante" et "ils chantent" : entend-on une différence ? — Non, ça se dit
// pareil : seul l'ŒIL voit. » Un enfant de six ans apprend à écrire ce qu'il
// entend ; ici, la marque du pluriel NE S'ENTEND PAS. C'est le premier endroit
// du français où l'oreille ne suffit plus, et lui dire franchement vaut mieux
// que le laisser croire qu'il a mal écouté.
//
// ⭐ Et le second fil vient du même pool : « le "s" de "ils" PRÉVIENT : il faut
// écrire "-ent" au verbe ». Le pronom est un signal, pas une décoration — c'est
// lui qu'on regarde AVANT d'écrire la fin du verbe.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : `conjugaison` a 4 micros en losange —
// `etre_present` et `avoir_present` partent tous deux de `cp_gram_nom_verbe`,
// convergent sur `formes_verbales`, puis le défi. Deux racines qui se
// rejoignent : un objet cohérent, aucun découpage à décider.
//
// Les 4 micros sont couvertes :
// - cp_conj_etre_present    → propriété 1, exemple 1, entrainements 1 et 2
// - cp_conj_avoir_present   → propriété 2, entrainement 3
// - cp_conj_formes_verbales → figure, propriétés 3 et 4, méthode 1
// - cp_conj_defi            → méthode 2, exemple 2, entrainement 5
//
// Le margouillat du pool est repris tel quel (« Le margouillat est sur le mur »).
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/conjugaison.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  ConjugaisonLigne,
  ConjugaisonSegment,
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
} from "@/lib/tutor-v4/types";

function perso(opts: {
  personnage: PersonnageId;
  pose?: PersonnagePose;
  expression?: PersonnageExpression;
  bulle?: PersonnageBulle;
  mode?: "couleur" | "coloriage";
  consigne?: string;
  largeur?: number;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "personnage",
        personnage: opts.personnage,
        pose: opts.pose,
        expression: opts.expression,
        bulle: opts.bulle,
        mode: opts.mode ?? "coloriage",
        consigne: opts.consigne,
        size: { width: opts.largeur ?? 250 },
      }}
    />
  );
}

/** ⚠️ Les `note` des wagons se comptent en caractères : au-delà de huit, elles
 *  élargissent le dessin et la police tombe sous le plancher. */
function wagons(opts: {
  pronom?: string;
  segments: ConjugaisonSegment[];
  legende?: string;
  largeur?: number;
}) {
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "conjugaison",
          mode: "wagons",
          pronom: opts.pronom,
          segments: opts.segments,
          legende: opts.legende,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

function tableau(opts: {
  infinitif: string;
  temps?: string;
  lignes: ConjugaisonLigne[];
  legende?: string;
  largeur?: number;
}) {
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "conjugaison",
          mode: "tableau",
          infinitif: opts.infinitif,
          temps: opts.temps,
          lignes: opts.lignes,
          legende: opts.legende,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE PORTE LA DÉCOUVERTE : deux formes qui se disent pareil et
 * s'écrivent autrement. Le wagon de la marque de personne est en alerte —
 * c'est lui qu'on n'entend pas.
 */
const memeSonDeuxEcritures = wagons({
  pronom: "il / ils",
  segments: [
    { texte: "chant", role: "radical", note: "radical" },
    { texte: "e / ent", role: "personne", note: "muet", alerte: true },
    ],
  legende: "Ça se dit pareil. Ça ne s'écrit pas pareil.",
  largeur: 300,
});

const leVerbeEtre = tableau({
  infinitif: "être",
  temps: "présent",
  lignes: [
    { pronom: "je", radical: "", terminaison: "suis" },
    { pronom: "tu", radical: "", terminaison: "es" },
    { pronom: "il", radical: "", terminaison: "est" },
    { pronom: "nous", radical: "", terminaison: "sommes" },
    { pronom: "vous", radical: "", terminaison: "êtes" },
    { pronom: "ils", radical: "", terminaison: "sont", alerte: true },
  ],
  legende: "Chaque pronom a sa forme.",
});

const leVerbeAvoir = tableau({
  infinitif: "avoir",
  temps: "présent",
  lignes: [
    { pronom: "j'", radical: "", terminaison: "ai" },
    { pronom: "tu", radical: "", terminaison: "as" },
    { pronom: "il", radical: "", terminaison: "a" },
    { pronom: "nous", radical: "", terminaison: "avons" },
    { pronom: "vous", radical: "", terminaison: "avez" },
    { pronom: "ils", radical: "", terminaison: "ont", alerte: true },
  ],
  legende: "Chaque pronom a sa forme.",
});

const avecNous = wagons({
  pronom: "nous",
  segments: [
    { texte: "chant", role: "radical" },
    { texte: "ons", role: "personne", note: "nous", alerte: true },
  ],
  legende: "Avec « nous », le verbe finit presque toujours par -ons.",
});

const leSPrevient = perso({
  personnage: "nina",
  pose: "montre",
  expression: "surpris",
  bulle: { texte: "Ils chantent." },
  consigne: "Colorie le s de « ils » et le ent du verbe.",
});

const combienSontIls = perso({
  personnage: "teo",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Ils sont deux ?", forme: "pensee" },
  consigne: "D'abord je compte. Ensuite j'écris le verbe.",
});

const leMargouillat = perso({
  personnage: "pic",
  mode: "couleur",
  bulle: { texte: "Le margouillat est sur le mur." },
  consigne: "Un seul : c'est « est ».",
  largeur: 300,
});

/* ─── Les dessins DES EXERCICES ────────────────────────────────────────────────
   ⭐⭐ AU CYCLE 2, UN EXERCICE SE FAIT AU CRAYON (règle posée le 03/09/2026).
   ⛔ Et ces dessins-là ne portent NI `consigne` NI `legende` : l'énoncé numéroté
   est déjà la consigne, et la répéter sous le dessin fait deux déchiffrages
   pour une seule instruction. */

const exEtreATrous = tableau({
  infinitif: "être",
  temps: "présent",
  lignes: [
    { pronom: "je", radical: "", terminaison: "…" },
    { pronom: "tu", radical: "", terminaison: "es" },
    { pronom: "il", radical: "", terminaison: "…" },
    { pronom: "nous", radical: "", terminaison: "sommes" },
    { pronom: "vous", radical: "", terminaison: "…" },
    { pronom: "ils", radical: "", terminaison: "sont", alerte: true },
  ],
  largeur: 260,
});

const exAvoirATrous = tableau({
  infinitif: "avoir",
  temps: "présent",
  lignes: [
    { pronom: "j'", radical: "", terminaison: "ai" },
    { pronom: "tu", radical: "", terminaison: "…" },
    { pronom: "il", radical: "", terminaison: "a" },
    { pronom: "nous", radical: "", terminaison: "…" },
    { pronom: "vous", radical: "", terminaison: "avez" },
    { pronom: "ils", radical: "", terminaison: "…", alerte: true },
  ],
  largeur: 260,
});

const exUnOuPlusieurs = perso({
  personnage: "teo",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "Ils sont deux ?", forme: "pensee" },
  largeur: 220,
});

const exLaMarqueMuette = wagons({
  pronom: "ils",
  segments: [
    { texte: "chant", role: "radical" },
    { texte: "ent", role: "personne", alerte: true },
  ],
  largeur: 260,
});

const exAvecNous = wagons({
  pronom: "nous",
  segments: [
    { texte: "jou", role: "radical" },
    { texte: "ons", role: "personne", alerte: true },
  ],
  largeur: 260,
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "conjugaison",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Être et avoir au présent au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Il chante » et « ils chantent » se disent pareil. Seul l'œil voit la différence.",
  identite: [],
  definition: {
    texte: [
      "Le verbe change de forme selon qui fait l'action.",
      "« Je suis », « tu es », « il est » : c'est le même verbe être, mais il ne s'écrit pas pareil à chaque fois.",
      "Et attention : quand ils sont plusieurs, la fin du verbe change souvent SANS QU'ON L'ENTENDE. « Il chante » et « ils chantent » se disent pareil. C'est l'œil qui voit, pas l'oreille.",
    ].join("\n\n"),
  },
  figure: {
    schema: memeSonDeuxEcritures,
  },
  proprietes: [
    {
      titre: "Le verbe être",
      texte: "Je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
      schema: leVerbeEtre,
      micros: ["cp_conj_etre_present"],
    },
    {
      titre: "Le verbe avoir",
      texte: "J'ai, tu as, il a, nous avons, vous avez, ils ont.",
      schema: leVerbeAvoir,
      micros: ["cp_conj_avoir_present"],
    },
    {
      titre: "Avec « nous », c'est -ons",
      texte: "Presque toujours : nous chantons, nous jouons.",
      schema: avecNous,
      micros: ["cp_conj_formes_verbales"],
    },
    {
      titre: "Avec « ils », c'est -ent, et ça ne s'entend pas",
      texte: "Le « s » de « ils » prévient : il faut écrire -ent au verbe.",
      schema: leSPrevient,
      micros: ["cp_conj_formes_verbales", "cp_conj_defi"],
    },
  ],
  reel: {
    texte:
      "Tu emploies « je suis » et « j'ai » cent fois par jour. Les écrire correctement, c'est ce qui change quand on passe de la parole à l'écrit.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je compte d'abord",
      texte: "Un seul, ou plusieurs ? Je choisis le verbe après.",
      schema: combienSontIls,
      micros: ["cp_conj_defi"],
    },
    {
      titre: "Je récite dans ma tête",
      texte: "Je suis, tu es, il est… et je m'arrête au bon pronom.",
      schema: leVerbeEtre,
      micros: ["cp_conj_etre_present", "cp_conj_formes_verbales"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Un seul margouillat",
      donnees: "« Le margouillat ___ sur le mur. » (verbe être)",
      question: "Quelle forme faut-il écrire ?",
      solution: "« est ». Un seul margouillat : je le remplace par « il » dans ma tête.",
      schema: leMargouillat,
      micros: ["cp_conj_etre_present"],
    },
    {
      titre: "Ce que l'oreille ne dit pas",
      donnees: "« Il chante. » et « Ils chantent. »",
      question: "Entend-on une différence ?",
      solution: "Non, ça se dit pareil. Seul l'œil voit le « s » et le « -ent ».",
      schema: memeSonDeuxEcritures,
      micros: ["cp_conj_formes_verbales"],
    },
  ],
  pieges: [
    "La marque du pluriel ne s'entend pas : elle se voit.",
    "On regarde le pronom AVANT d'écrire la fin du verbe.",
  ],
  aRetenir: [
    "Le verbe change selon qui fait l'action.",
    "Être : je suis, tu es, il est, nous sommes, vous êtes, ils sont.",
    "Avoir : j'ai, tu as, il a, nous avons, vous avez, ils ont.",
    "Avec « nous » : -ons. Avec « ils » : -ent, et ça ne s'entend pas.",
  ],
  /* ⭐ Dix exercices, sept avec un support à faire au crayon. Les corrections
     s'impriment sur leur propre page : la feuille de l'enfant ne porte plus la
     réponse sous la question. */
  entrainement: [
    {
      question: "Complète le tableau du verbe être : je …, il …, vous ….",
      correction: "je suis, il est, vous êtes.",
      schema: exEtreATrous,
      micros: ["cp_conj_etre_present"],
    },
    {
      question: "« Le margouillat ___ sur le mur. » (verbe être)",
      correction: "« est ». Un seul margouillat : je le remplace par « il » dans ma tête.",
      micros: ["cp_conj_etre_present"],
    },
    {
      question: "« Nous ___ contents. » (verbe être)",
      correction: "« sommes ».",
      micros: ["cp_conj_etre_present"],
    },
    {
      question: "Complète le tableau du verbe avoir : tu …, nous …, ils ….",
      correction: "tu as, nous avons, ils ont.",
      schema: exAvoirATrous,
      micros: ["cp_conj_avoir_present"],
    },
    {
      question: "« Nous ___ faim. » (verbe avoir)",
      correction: "« avons » — avec « nous », le verbe finit presque toujours par -ons.",
      micros: ["cp_conj_avoir_present"],
    },
    {
      question: "Entoure le pronom, puis colorie la fin du verbe.",
      correction: "On entoure « nous » et on colorie « ons » : nous jouons.",
      schema: exAvecNous,
      micros: ["cp_conj_formes_verbales"],
    },
    {
      question: "Colorie la partie du verbe qu'on n'entend pas.",
      correction: "« ent ». « il chante » et « ils chantent » se disent pareil.",
      schema: exLaMarqueMuette,
      micros: ["cp_conj_formes_verbales"],
    },
    {
      question: "« Il chante » et « ils chantent » : entend-on une différence ?",
      correction: "Non, ça se dit pareil. Seul l'œil voit le « s » et le « -ent ».",
      micros: ["cp_conj_formes_verbales"],
    },
    {
      question: "Compte d'abord : sont-ils un ou plusieurs ? Écris ensuite le verbe être.",
      correction: "Ils sont deux, donc « ils sont ». On compte AVANT d'écrire.",
      schema: exUnOuPlusieurs,
      micros: ["cp_conj_defi"],
    },
    {
      question: "« Ils jou___ dans la cour. »",
      correction: "« jouent ». Le « s » de « ils » prévient : le verbe prend -ent.",
      micros: ["cp_conj_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesConjugaisonCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Être et avoir - CP",
    section: {
      type: "objectif",
      phrase: "L'œil voit ce que l'oreille n'entend pas",
      sousPhrase: "« Il chante » et « ils chantent » se disent pareil.",
      encadre: { titre: "L'idée", texte: "Le pronom prévient le verbe." },
    },
  },
  {
    titre: "Le verbe être",
    badge: "Être et avoir - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Un seul", texte: "il est" },
        { titre: "Plusieurs", texte: "ils sont" },
        { titre: "Nous", texte: "nous sommes" },
      ],
    },
    schema: leVerbeEtre,
  },
  {
    titre: "Je compte d'abord",
    badge: "Être et avoir - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je regarde qui fait l'action.",
        "Un seul, ou plusieurs ?",
        "Ensuite seulement, j'écris le verbe.",
      ],
    },
    schema: combienSontIls,
  },
  {
    titre: "À vous",
    badge: "Être et avoir - CP",
    section: {
      type: "exercice",
      enonce: "« Ils jou___ dans la cour. »",
      question: "Que faut-il écrire à la fin du verbe ?",
      indice: "Regarde le « s » de « ils » : il prévient.",
      correction: "« jouent » — et ça ne s'entend pas.",
    },
    schema: leSPrevient,
  },
];
