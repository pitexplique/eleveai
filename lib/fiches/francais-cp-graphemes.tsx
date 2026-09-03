// ─── Fiche d'activité : des lettres aux sons (CP) ─────────────────────────────
// SEPTIÈME FICHE DU CYCLE 2, et le cœur de la classe : le BO en fait « la
// priorité fondamentale sur laquelle reposent tous les apprentissages
// ultérieurs ». Elle suit `conscience_phonologique`, dont elle est la suite
// exacte : on a appris à ENTENDRE les sons, on apprend à les ÉCRIRE.
//
// ⚠️ RÉFÉRENCE : programme de français du CYCLE 2, rubrique « Cours préparatoire ».
//
// ⭐⭐ LA DÉCOUVERTE VIENT DU POOL, ET ELLE A DEUX FACES — c'est ce qui la rend
// difficile à dire, et c'est pour ça qu'elle se dessine :
//   · un SON s'écrit de plusieurs façons  : o, au, eau font tous le son o ;
//   · une LETTRE se lit de plusieurs façons : le c de cari et celui de cerise.
// « Un enfant qui croit "une lettre, un son" se cogne aux deux. » La fiche pose
// donc les deux faces côte à côte, et jamais la règle simple qu'on devrait
// ensuite défaire.
//
// ⭐ ET LE `b` / `d` A SON PROPRE BLOC, parce que c'est la confusion la plus
// répandue du CP. Le pool en donne la formule exacte : « le b et le d ont la
// même forme, un bâton et un ventre ; seul le côté du ventre change ». Elle se
// travaille SUR LA RÉGLURE, pas en regardant : c'est la main qui sépare les
// deux lettres, parce que le geste, lui, n'est pas symétrique.
//
// ⭐ POURQUOI CETTE NOTION MAINTENANT : ses 5 micros forment un losange qui part
// des voyelles et converge sur le défi. Un objet cohérent, aucun découpage à
// décider. Et sa racine `cp_gph_voyelles` a pour prérequis
// `cp_phono_son_identifier` — la fiche précédente.
//
// Les 5 micros sont couvertes :
// - cp_gph_voyelles          → propriété 1, entrainement 1
// - cp_gph_consonnes_simples → propriété 2, exemple 1, entrainement 2
// - cp_gph_sons_composes     → propriété 3, entrainement 3
// - cp_gph_ecrire_son        → figure, propriété 4, méthode 1, entrainement 4
// - cp_gph_defi              → méthode 2, exemple 2, entrainement 5
//
// ⛔ AUCUNE NOTATION PHONÉTIQUE, comme sur la fiche des sons : le pool écrit
// « [o] », la feuille écrit « le son o, celui de moto ». Un son se nomme par un
// mot qui le contient. Le pool s'en explique lui-même : « un CP ne lit pas
// l'alphabet phonétique ».
//
// ⛔ ET LES MODÈLES S'ÉCRIVENT EN MARELLE, la cursive de l'école : une fiche qui
// fait tracer un b et un d ne peut pas montrer la manuscrite d'un adulte.
//
// Aligné sur `lib/tutor-v4/questionBank/cp/francais/grapheme-phoneme.bank.ts`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import type {
  PersonnageBulle,
  PersonnageExpression,
  PersonnageId,
  PersonnagePose,
  PhraseCanvasMot,
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

/**
 * ⭐ TROIS LIGNES, JAMAIS DEUX (règle posée par Frédéric le 02/09/2026) : la
 * 1re porte le MODÈLE, la 2e le pointillé qu'on REPASSE, la 3e est VIDE — c'est
 * là que l'enfant écrit seul. À deux lignes, l'exercice s'arrête au repassage.
 *
 * ⭐ Et `.reglure` fait échapper le dessin au plafond de largeur du cycle 2 :
 * des lignes rétrécies sont des lignes où l'enfant ne peut plus écrire.
 */
function lignes(opts: {
  modele?: string;
  aRepasser?: boolean;
  consigne?: string;
  largeur?: number;
}) {
  return (
    <div className="reglure">
      <CanvasRenderer
        figure={{
          kind: "reglure",
          modele: opts.modele,
          lignes: 3,
          interligne: 3,
          aRepasser: opts.aRepasser,
          depart: true,
          consigne: opts.consigne,
          size: { width: opts.largeur ?? 250 },
        }}
      />
    </div>
  );
}

/**
 * ⭐ LE CANVAS DE LA PHRASE SERT DE JEU D'ÉTIQUETTES : une boite par lettre ou
 * par groupe de lettres. C'est le même objet que la grammaire, mais ce qu'il
 * met en boite n'est plus un mot — c'est une graphie.
 *
 * ⚠️ Aucune « nature » au-dessus : elles se centrent sur leur boite et se
 * chevauchent dès qu'elles sont plus larges qu'elle, et une boite d'UNE lettre
 * est ce qu'on peut faire de plus étroit.
 *
 * ⭐ Le dessin porte du TEXTE : `.dessin-mots` le fait échapper au plafond de
 * largeur, sans quoi les graphies tombent sous le plancher de lecture.
 */
function etiquettes(opts: {
  cases: string[];
  focus?: number[];
  legende?: string;
  largeur?: number;
}) {
  const mots: PhraseCanvasMot[] = opts.cases.map((c, i) => ({
    texte: c,
    focus: opts.focus?.includes(i),
  }));
  return (
    <div className="dessin-mots">
      <CanvasRenderer
        figure={{
          kind: "phrase",
          mots,
          legende: opts.legende,
          largeurMax: opts.largeur ?? 280,
        }}
      />
    </div>
  );
}

// ─── Les dessins ──────────────────────────────────────────────────────────────

/**
 * ⭐⭐ LA FIGURE EST LA PREMIÈRE FACE DU PIÈGE : un seul son, trois écritures.
 * Les trois boites disent d'un coup ce qu'une règle mettrait trois phrases à
 * énoncer — et qu'un enfant qui croit « une lettre, un son » refuserait.
 */
const troisEcrituresDuSonO = etiquettes({
  cases: ["o", "au", "eau"],
  legende: "Le son o de moto, jaune, bateau : un seul son, trois écritures.",
  largeur: 300,
});

const lesVoyellesChantent = etiquettes({
  cases: ["a", "e", "i", "o", "u", "y"],
  legende: "Dans chaque syllabe, il y a une voyelle qui chante.",
  largeur: 300,
});

/** ⭐⭐ LES JUMEAUX SE SÉPARENT À LA MAIN, PAS À L'ŒIL. Regarder un b et un d
 *  côte à côte ne les distingue pas — ils sont symétriques. Le geste, lui, ne
 *  l'est pas : c'est en les TRAÇANT qu'on cesse de les confondre. D'où la
 *  réglure plutôt qu'un dessin. */
const lesJumeaux = lignes({
  modele: "b d b d",
  aRepasser: true,
  consigne: "Le ventre à droite du bâton : b. À gauche : d. Repasse, puis écris.",
  largeur: 300,
});

const deuxLettresUnSon = etiquettes({
  cases: ["ou", "ch", "on", "oi"],
  legende: "Deux lettres qui se tiennent par la main pour faire un seul son.",
  largeur: 300,
});

/** ⭐ LA SECONDE FACE DU PIÈGE, et elle se dit mieux qu'elle ne se dessine :
 *  la même lettre, deux sons. La bulle porte les deux mots du pool. */
const laMemeLettreDeuxSons = perso({
  personnage: "teo",
  pose: "montre",
  expression: "surpris",
  bulle: { texte: "cari, cerise" },
  consigne: "La même lettre c, et deux sons différents.",
});

const ecrireCeQuOnEntend = lignes({
  modele: "chou",
  aRepasser: true,
  consigne: "Écoute le mot, cherche ses sons, puis écris-les.",
  largeur: 300,
});

const jeCherecheLesSons = perso({
  personnage: "nina",
  pose: "debout",
  expression: "pense",
  bulle: { texte: "ch — ou", forme: "pensee" },
  consigne: "Je découpe le mot en sons avant d'écrire.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheGraphemesCp: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cp",
  notion: "grapheme_phoneme",
  // ⛔ Pas de deux-points : tous les h2 reprennent ce titre après un.
  titre: `Des lettres aux sons au CP (${ANNEE_SCOLAIRE})`,
  accroche:
    "Un son peut s'écrire de plusieurs façons, et une lettre peut se lire de plusieurs façons. « Une lettre, un son » ne suffit pas.",
  identite: [],
  definition: {
    texte: [
      "Les lettres servent à écrire les sons qu'on entend.",
      "Mais ce n'est pas une lettre pour un son : le son o s'écrit o dans moto, au dans jaune, eau dans bateau. Un seul son, trois écritures.",
      "Et dans l'autre sens aussi : la lettre c ne se lit pas pareil dans cari et dans cerise. C'est la même lettre, et deux sons.",
    ].join("\n\n"),
  },
  figure: {
    schema: troisEcrituresDuSonO,
  },
  proprietes: [
    {
      titre: "Les voyelles chantent",
      texte: "a, e, i, o, u, et y qu'on oublie souvent. Il y en a une dans chaque syllabe.",
      schema: lesVoyellesChantent,
      micros: ["cp_gph_voyelles"],
    },
    {
      titre: "Le b et le d sont des jumeaux",
      texte: "Même bâton, même ventre. Seul le côté du ventre change.",
      schema: lesJumeaux,
      micros: ["cp_gph_consonnes_simples"],
    },
    {
      titre: "Deux lettres pour un seul son",
      texte: "ou, ch, on, oi : elles ne se séparent pas.",
      schema: deuxLettresUnSon,
      micros: ["cp_gph_sons_composes"],
    },
    {
      titre: "La même lettre, deux sons",
      texte: "Le c de cari ne se lit pas comme le c de cerise.",
      schema: laMemeLettreDeuxSons,
      micros: ["cp_gph_ecrire_son", "cp_gph_defi"],
    },
  ],
  reel: {
    texte:
      "C'est ce qui ouvre la lecture : dès qu'on sait quelles lettres font quels sons, on peut lire des mots qu'on n'a jamais vus.",
  },
  historique: { texte: "" },
  methode: [
    {
      titre: "Je découpe le mot en sons",
      texte: "ch — ou. Je cherche les sons avant de chercher les lettres.",
      schema: jeCherecheLesSons,
      micros: ["cp_gph_ecrire_son", "cp_gph_defi"],
    },
    {
      titre: "J'écris chaque son",
      texte: "Un son après l'autre, dans l'ordre où je les entends.",
      schema: ecrireCeQuOnEntend,
      micros: ["cp_gph_ecrire_son"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Le ventre du mauvais côté",
      donnees: "Un enfant écrit « dateau » au lieu de « bateau ».",
      question: "Quelle lettre a-t-il retournée ?",
      solution:
        "Le b. Son ventre se met à DROITE du bâton ; à gauche, c'est un d. Le tracer, c'est ce qui les sépare.",
      schema: lesJumeaux,
      micros: ["cp_gph_consonnes_simples"],
    },
    {
      titre: "Un son, plusieurs écritures",
      donnees: "moto, jaune, bateau",
      question: "Qu'ont ces trois mots en commun ?",
      solution:
        "On y entend le même son o. Il s'écrit o, puis au, puis eau : c'est le mot qui décide, pas le son.",
      schema: troisEcrituresDuSonO,
      micros: ["cp_gph_ecrire_son", "cp_gph_defi"],
    },
  ],
  pieges: [
    "« Une lettre, un son » est faux dans les deux sens : un son a plusieurs écritures, une lettre a plusieurs sons.",
    "ou, ch, on, oi ne se coupent pas : ce sont deux lettres pour un seul son.",
  ],
  aRetenir: [
    "Les lettres écrivent les sons qu'on entend.",
    "Un même son peut s'écrire de plusieurs façons : o, au, eau.",
    "Une même lettre peut se lire de plusieurs façons : le c de cari, celui de cerise.",
    "Le b a son ventre à droite du bâton, le d à gauche.",
    "ou, ch, on, oi : deux lettres, un seul son.",
  ],
  entrainement: [
    {
      question: "Quelle est l'intruse : b, m, i, r ?",
      correction: "« i » : c'est la seule voyelle, les trois autres sont des consonnes.",
      micros: ["cp_gph_voyelles"],
    },
    {
      question: "Dans « bateau », le premier b a son ventre de quel côté du bâton ?",
      correction: "À droite. Le ventre à gauche, ce serait un d.",
      micros: ["cp_gph_consonnes_simples"],
    },
    {
      question: "Combien de lettres font le son ou dans « chou » ?",
      correction: "Deux : o et u. Elles se tiennent par la main et ne font qu'un seul son.",
      micros: ["cp_gph_sons_composes"],
    },
    {
      question: "Écris le mot qu'on entend : ch — a — t.",
      correction: "« chat ». Le ch s'écrit avec deux lettres, et le t de la fin ne s'entend pas.",
      micros: ["cp_gph_ecrire_son"],
    },
    {
      question: "Dans « moto » et « bateau », entend-on le même son à la fin ?",
      correction: "Oui, le son o. Mais il s'écrit o dans l'un et eau dans l'autre.",
      micros: ["cp_gph_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cp",
};

export const slidesGraphemesCp: ClasseSlide[] = [
  {
    titre: "Ce qu'on apprend",
    badge: "Des lettres aux sons - CP",
    section: {
      type: "objectif",
      phrase: "Une lettre, un son ? Pas toujours",
      sousPhrase: "Le son o s'écrit o, au, eau.",
      encadre: {
        titre: "L'idée",
        texte: "C'est le mot qui décide de l'écriture du son.",
      },
    },
    schema: troisEcrituresDuSonO,
  },
  {
    titre: "Les jumeaux",
    badge: "Des lettres aux sons - CP",
    section: {
      type: "cartes",
      cartes: [
        { titre: "b", texte: "le ventre à droite" },
        { titre: "d", texte: "le ventre à gauche" },
        { titre: "Le geste", texte: "c'est la main qui les sépare" },
      ],
    },
    schema: lesJumeaux,
  },
  {
    titre: "J'écris ce que j'entends",
    badge: "Des lettres aux sons - CP",
    section: {
      type: "etapes",
      etapes: [
        "Je dis le mot au ralenti.",
        "Je découpe : ch — ou.",
        "J'écris chaque son, dans l'ordre.",
      ],
    },
    schema: jeCherecheLesSons,
  },
  {
    titre: "À vous",
    badge: "Des lettres aux sons - CP",
    section: {
      type: "exercice",
      enonce: "moto, jaune, bateau",
      question: "Qu'ont ces trois mots en commun ?",
      indice: "Ferme les yeux et écoute. Regarde ensuite comment c'est écrit.",
      correction: "Le même son o, écrit de trois façons : o, au, eau.",
    },
    schema: troisEcrituresDuSonO,
  },
];
