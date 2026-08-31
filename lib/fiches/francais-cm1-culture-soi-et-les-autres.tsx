// ─── Fiche de cours : morale, poésie et les autres (CM1) ──────────────────────
// SEPTIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ MÊMES TROIS ENTRÉES QU'AU CM2 — morale, poésie, rapport aux autres. La
// séparation vient donc du POOL, pas des micros :
//
//   | | CM1 (ici) | CM2 |
//   |---|---|---|
//   | le fil | ⭐ une histoire ne DIT pas ce qu'elle veut dire : elle le MONTRE | le droit de NE PAS ÊTRE D'ACCORD |
//
// ⛔ NE PAS REDIRE : « interroger la morale, c'est se demander si l'on est
// d'accord » est le cœur du CM2. Ici on entre en amont — comment une histoire
// s'y prend pour dire quelque chose.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE UNIFIE LES TROIS ENTRÉES, CE QUI EST RARE. Les trois
// pools font le même geste :
//   · POESIE : « la mer était un drap froissé » — on montre un drap pour dire la
//     mer ; une image poétique, c'est « dire une chose en en montrant une autre » ;
//   · MORALE : on raconte un corbeau et un renard pour parler des flatteurs, et
//     « la morale n'est pas toujours écrite : parfois il faut la déduire » ;
//   · RAPPORT_AUTRES : « un conflit entre deux personnages permet de comprendre
//     ce à quoi chacun tient » — la dispute montre ce que personne ne déclare.
// ⭐ UNE HISTOIRE NE DIT PAS CE QU'ELLE VEUT DIRE : ELLE LE MONTRE. C'est ce qui
// rend la littérature difficile — et c'est aussi tout son intérêt.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools MORALE, POESIE et RAPPORT_AUTRES de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// Micro-compétences couvertes (les 4 de la notion `culture_soi_et_les_autres`) :
// - cm1_cult_poesie         → figure, propriétés 1 et 2, méthode 1, exemple 1
// - cm1_cult_morale         → propriétés 3 et 4, méthode 2, exemples 2 et 3
// - cm1_cult_rapport_autres → propriété 5, méthode 3, exemple 4
// - cm1_cult_soi_defi       → propriété 6

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

const montrerAutreChose = phrase({
  mots: [
    { texte: "un drap froissé" },
    { texte: "la mer", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "pour dire", type: "question" }],
  legende: "Le poète montre une chose pour en dire une autre.",
});

const grilleTroisFacons = grille({
  headers: ["On montre", "Pour dire"],
  rows: [
    { values: ["un drap", "la mer"] },
    { values: ["un corbeau", "les flatteurs"] },
    { values: ["une dispute", "ce qui compte"] },
  ],
  caption: "Trois fois le même geste, dans trois genres différents.",
});

const moralePasEcrite = phrase({
  mots: [
    { texte: "toujours écrite", barre: true },
    { texte: "à deviner", focus: true },
  ],
  legende: "Parfois la fable te laisse trouver la leçon tout seul.",
});

const animauxPourLesGens = phrase({
  mots: [
    { texte: "un renard" },
    { texte: "un flatteur", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "c'est", type: "question" }],
  legende: "Les animaux des fables parlent des gens.",
});

const disputeRevele = phrase({
  mots: [
    { texte: "une dispute" },
    { texte: "ce qui compte", focus: true },
  ],
  liens: [{ de: 0, vers: 1, label: "montre", type: "question" }],
  legende: "On voit à quoi chacun tient quand il refuse de céder.",
});

const oserSeul = phrase({
  mots: [
    { texte: "comme les autres", barre: true },
    { texte: "ce qu'il pense", focus: true },
  ],
  legende: "S'affirmer, c'est oser même quand on est seul.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheCultureSoiEtLesAutresCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "culture-soi-et-les-autres",
  titre: `Morale, poésie et les autres en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« La mer était un drap froissé. » Le poète parle de la mer, et il te montre un drap. C'est ce que font toutes les histoires : elles ne disent pas ce qu'elles veulent dire, elles le montrent.",
  identite: [
    { label: "Mots clés", valeur: "Image, morale, fable" },
    { label: "Le secret", valeur: "On montre au lieu de dire" },
    { label: "Outil", valeur: "Ça parle de quoi, en vrai ?" },
  ],
  definition: {
    texte: [
      "Une histoire ne dit pas ce qu'elle veut dire : elle le montre. C'est vrai dans les trois cas.",
      "En poésie : « la mer était un drap froissé ». Le poète montre un drap pour parler de la mer. Ça s'appelle une image.",
      "Dans une fable : on raconte un corbeau et un renard pour parler des gens qui flattent. Et la morale n'est pas toujours écrite — parfois, c'est à toi de la trouver.",
      "Entre deux personnages : une dispute montre ce à quoi chacun tient, sans que personne ait à le dire.",
      "Alors devant un texte, pose-toi toujours la question : ça parle de quoi, en vrai ?",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(montrerAutreChose, grilleTroisFacons),
  },
  proprietes: [
    {
      titre: "Une image montre autre chose",
      texte: "« Un drap froissé » pour la mer. On voit le drap, on comprend la mer.",
      schema: montrerAutreChose,
      micros: ["cm1_cult_poesie"],
    },
    {
      titre: "Un poème se reconnait à sa forme",
      texte: "Des vers, des strophes, des blancs. Ça se voit avant d'être lu.",
      schema: grilleTroisFacons,
      micros: ["cm1_cult_poesie"],
    },
    {
      titre: "Les animaux des fables parlent des gens",
      texte: "Le renard qui flatte, ce n'est pas un renard. C'est quelqu'un que tu connais.",
      schema: animauxPourLesGens,
      micros: ["cm1_cult_morale"],
    },
    {
      titre: "La morale n'est pas toujours écrite",
      texte: "Parfois la fable s'arrête et te laisse trouver la leçon tout seul.",
      schema: moralePasEcrite,
      micros: ["cm1_cult_morale"],
    },
    {
      titre: "Une dispute montre ce qui compte",
      texte: "On découvre à quoi chacun tient au moment où il refuse de céder.",
      schema: disputeRevele,
      micros: ["cm1_cult_rapport_autres"],
    },
    {
      titre: "Le défi : s'affirmer",
      texte: "Oser dire ce qu'on pense juste, même quand on est le seul.",
      schema: oserSeul,
      micros: ["cm1_cult_soi_defi"],
    },
  ],
  reel: {
    texte:
      "Tu le fais déjà quand tu dis « il est lent comme un escargot ». Personne ne croit qu'il a une coquille : tu as montré un escargot pour parler d'un garçon. Les poètes font exactement ça, en plus beau.",
  },
  historique: {
    texte:
      "Les fables viennent d'Ésope, un esclave grec, il y a deux-mille-cinq-cents ans. Parler des puissants était dangereux — alors il parlait de renards et de lions. Tout le monde comprenait, et personne ne pouvait le punir.",
  },
  methode: [
    {
      titre: "Demande-toi ce que l'image remplace",
      texte: "« Un drap froissé » : quoi d'autre est froissé et large ? La mer.",
      schema: montrerAutreChose,
      micros: ["cm1_cult_poesie"],
    },
    {
      titre: "Dans une fable, remplace les animaux par des gens",
      texte: "Un renard qui flatte, un corbeau qui se laisse avoir. Tu connais les deux.",
      schema: animauxPourLesGens,
      micros: ["cm1_cult_morale"],
    },
    {
      titre: "Devant une dispute, cherche l'enjeu",
      texte: "Pas qui a raison : ce que chacun refuse de perdre.",
      schema: disputeRevele,
      micros: ["cm1_cult_rapport_autres"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Une image",
      donnees: "« La mer était un drap froissé. »",
      schema: montrerAutreChose,
      question: "Que fait le poète ?",
      solution:
        "Il compare la mer à un drap : c'est une image. Il montre une chose pour en dire une autre.",
      micros: ["cm1_cult_poesie"],
    },
    {
      titre: "Le Corbeau et le Renard",
      donnees: "Le renard flatte le corbeau, qui ouvre le bec et perd son fromage.",
      schema: animauxPourLesGens,
      question: "Que retient-on ?",
      solution:
        "Qu'il faut se méfier de ceux qui flattent. La fable parle d'animaux pour parler des gens.",
      micros: ["cm1_cult_morale"],
    },
    {
      titre: "Une fable sans morale écrite",
      donnees: "La fable se termine et aucune leçon n'est écrite à la fin.",
      schema: moralePasEcrite,
      question: "Y a-t-il quand même une morale ?",
      solution:
        "Oui, mais c'est à toi de la déduire. Une morale n'est pas toujours écrite : parfois l'histoire suffit.",
      micros: ["cm1_cult_morale"],
    },
    {
      titre: "Deux personnages se disputent",
      donnees: "Deux amis se fâchent pour une place dans l'équipe.",
      schema: disputeRevele,
      question: "Qu'est-ce que ça t'apprend ?",
      solution:
        "Ce à quoi chacun tient. Un conflit montre ce que personne n'aurait dit tout seul.",
      micros: ["cm1_cult_rapport_autres"],
    },
  ],
  pieges: [
    "Prendre une image au pied de la lettre : la mer n'est pas vraiment un drap.",
    "Croire que la fable parle d'animaux : elle parle de gens.",
    "Chercher la morale écrite alors qu'il faut la déduire.",
    "Regarder qui a raison dans une dispute, au lieu de ce que chacun défend.",
    "Croire qu'un texte dit tout : il montre beaucoup plus qu'il ne dit.",
  ],
  aRetenir: [
    "Une histoire ne dit pas ce qu'elle veut dire : elle le montre.",
    "Une image poétique dit une chose en en montrant une autre.",
    "Les animaux des fables parlent des gens.",
    "La morale n'est pas toujours écrite : parfois on la déduit.",
    "Une dispute montre ce à quoi chacun tient.",
  ],
  entrainement: [
    {
      question: "« La mer était un drap froissé. » Que fait le poète ?",
      correction: "Il compare la mer à un drap : c'est une image.",
      micros: ["cm1_cult_poesie"],
    },
    {
      question: "Qu'est-ce qu'une image poétique ?",
      correction: "Une façon de dire une chose en en montrant une autre.",
      micros: ["cm1_cult_poesie"],
    },
    {
      question: "La morale d'une fable est-elle toujours écrite ?",
      correction: "Non : parfois il faut la déduire soi-même.",
      micros: ["cm1_cult_morale"],
    },
    {
      question: "Dans « Le Corbeau et le Renard », que retient-on ?",
      correction: "Qu'il faut se méfier de ceux qui flattent.",
      micros: ["cm1_cult_morale"],
    },
    {
      question: "Un conflit entre deux personnages permet…",
      correction: "De comprendre ce à quoi chacun tient.",
      micros: ["cm1_cult_rapport_autres"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesCultureSoiEtLesAutresCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Morale et poésie - CM1",
    section: {
      type: "objectif",
      phrase: "On montre au lieu de dire",
      sousPhrase: "« La mer était un drap froissé. » Le poète montre un drap.",
      encadre: { titre: "L'outil", texte: "Ça parle de quoi, en vrai ?" },
    },
  },
  {
    titre: "Trois fois le même geste",
    badge: "Morale et poésie - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Un drap", texte: "Pour dire la mer. C'est une image." },
        { titre: "Un corbeau", texte: "Pour parler de ceux qui flattent." },
        { titre: "Une dispute", texte: "Pour montrer ce à quoi chacun tient." },
      ],
    },
    schema: grilleTroisFacons,
  },
  {
    titre: "Pourquoi des animaux ?",
    badge: "Morale et poésie - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Les fables viennent d'Ésope, un esclave grec.",
        "Parler des puissants était dangereux.",
        "Alors il parlait de renards. Tout le monde comprenait.",
      ],
    },
    schema: animauxPourLesGens,
  },
  {
    titre: "À vous",
    badge: "Morale et poésie - CM1",
    section: {
      type: "exercice",
      enonce: "La fable se termine, et aucune leçon n'est écrite à la fin.",
      question: "Y a-t-il quand même une morale ?",
      indice: "Elle n'est pas toujours écrite.",
      correction: "Oui, mais c'est à toi de la déduire.",
    },
    schema: moralePasEcrite,
  },
];
