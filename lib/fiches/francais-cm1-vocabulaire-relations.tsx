// ─── Fiche de cours : familles de mots, synonymes et contraires (CM1) ─────────
// QUINZIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ LE DÉCOUPAGE DU CM1 N'EST CELUI D'AUCUNE AUTRE CLASSE, et c'est ce qui
// laisse la place. Le CM1 met dans UNE MÊME NOTION les familles de mots ET les
// synonymes / contraires. Le CM2 les sépare (familles dans
// `vocabulaire_formation`, synonymes partis dans `vocabulaire_sens` comme
// NUANCE) ; la 6e les réunit mais autour d'une règle de grammaire.
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ à quoi ça sert : NE PAS TE RÉPÉTER quand tu écris | le sens du morceau compte, pas sa forme | l'antonyme doit être de la MÊME CLASSE |
//   | le test | ⭐ relis-toi et cherche le mot qui revient | coupe le mot, chaque morceau veut-il dire quelque chose ? | aligner les natures |
//
// ⛔ NE PAS REDIRE : « le morceau doit vouloir dire quelque chose, pas seulement
// ressembler » et ses trois exemples (thermite, grandeur, ver/verre/vert) sont
// le fil du CM2 (l. 245). « Un élève qui connait vingt racines comprend des
// centaines de mots » est son bloc du réel (l. 326). Les racines latines et
// grecques, la composition et l'homonymie ne sont PAS au CM1 : ne pas les
// introduire ici.
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT DU FIL QUE LE CM1 A DÉJÀ TIRÉ EN ÉCRITURE :
// dans `francais-cm1-ecriture-produire`, l'enfant apprend à remplacer « le
// chien » par « il » pour ne pas se répéter. Voici le SECOND OUTIL du même
// problème, et le libellé de la micro le dit — « UTILISER synonymes et
// antonymes », pas les reconnaitre. Le vocabulaire cesse alors d'être une leçon
// de plus : c'est ce qui sert au moment d'écrire.
//
// ⭐⭐ ET LE PIÈGE EST DANS LES LEURRES DU POOL, QUI SONT REMARQUABLES : à
// « quel est le contraire de content ? », les trois mauvaises réponses sont
// JOYEUX, HEUREUX, RAVI — trois synonymes. L'erreur du CM1 n'est donc pas de ne
// pas connaitre les mots : c'est de confondre « pareil » et « le contraire ».
// Et symétriquement, dans VOC_FAMILLE, les leurres de « terre » sont TERREUR,
// TASSE, TOUR : des mots qui commencent pareil et ne sont pas de la famille.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools VOC_FAMILLE et VOC_SYN_ANT de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm1_fr_fixed_voc_2` et `_3` de
// lib/tutor-v4/questionBank/cm1/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `vocabulaire_relations`) :
// - cm1_voc_famille        → propriétés 1 et 2, méthode 1, exemples 1 et 2
// - cm1_voc_syn_ant        → figure, propriétés 3, 4 et 5, méthodes 2 et 3, exemples 3 et 4
// - cm1_voc_formation_defi → propriété 6

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

const grandImmense = phrase({
  mots: [
    { texte: "grand, grand, grand", barre: true },
    { texte: "immense", focus: true },
  ],
  legende: "Un synonyme évite de répéter le même mot.",
});

const grilleDeuxOutils = grille({
  headers: ["Tu répètes", "Tu remplaces par"],
  rows: [
    { values: ["le chien", "il"] },
    { values: ["grand", "immense"] },
    { values: ["rapide", "vif"] },
  ],
  caption: "Le pronom ou le synonyme : deux outils, un seul problème.",
});

const familleDeFleur = phrase({
  mots: [{ texte: "fleur" }, { texte: "fleuriste", focus: true }],
  liens: [{ de: 0, vers: 1, label: "même famille", type: "question" }],
  legende: "Même racine et sens proche : c'est une famille.",
});

const changerDHabit = phrase({
  mots: [{ texte: "fleurir" }, { texte: "fleuri", focus: true }],
  legende: "Le même mot habillé autrement : l'action, puis l'état.",
});

const ressembleMaisNon = phrase({
  mots: [
    { texte: "terreur", barre: true },
    { texte: "terrien", focus: true },
  ],
  legende: "« Terreur » commence comme terre et n'est pas de sa famille.",
});

const contraireOuPareil = phrase({
  mots: [
    { texte: "joyeux", barre: true },
    { texte: "triste", focus: true },
  ],
  legende: "Le contraire de content n'est pas un mot proche de content.",
});

const chercheLeMotCourt = phrase({
  mots: [{ texte: "fleuriste" }, { texte: "fleur", focus: true }],
  legende: "Le défi : retrouve le mot le plus court de la famille.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheVocabulaireRelationsCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "vocabulaire-relations",
  titre: `Familles de mots et contraires en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu relis ton texte : grand, grand, grand — trois fois le même mot. Tu connais déjà un outil pour ça, le pronom. En voici un second, et il marche aussi pour les adjectifs.",
  identite: [
    { label: "Mots clés", valeur: "Famille, synonyme, contraire" },
    { label: "Le secret", valeur: "Ça sert quand tu écris" },
    { label: "Outil", valeur: "Cherche le mot qui revient" },
  ],
  definition: {
    texte: [
      "Les mots ne vivent pas seuls. Chacun a une famille et des voisins.",
      "Une famille, ce sont des mots bâtis sur le même mot de départ : fleur, fleurir, fleuriste, fleuri.",
      "Un synonyme, c'est un autre mot qui dit la même chose : rapide et vif. Un contraire dit l'inverse : monter et descendre.",
      "Attention : ce qui se ressemble n'est pas forcément de la famille. « Terreur » commence comme « terre » et n'a rien à voir avec elle.",
      "Et tout cela sert à un moment précis : quand tu te relis et qu'un mot revient trois fois.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(grandImmense, grilleDeuxOutils),
  },
  proprietes: [
    {
      titre: "Une famille part d'un même mot",
      texte: "Fleur donne fleurir, fleuriste, fleuri. On les reconnait au morceau commun.",
      schema: familleDeFleur,
      micros: ["cm1_voc_famille"],
    },
    {
      titre: "Le même mot change d'habit",
      texte: "Fleurir, c'est l'action. Fleuriste, c'est la personne. Fleuri, c'est comment c'est.",
      schema: changerDHabit,
      micros: ["cm1_voc_famille"],
    },
    {
      titre: "Un synonyme dit la même chose autrement",
      texte: "Rapide et vif. Maison et demeure. Deux mots différents, une seule idée.",
      schema: grandImmense,
      micros: ["cm1_voc_syn_ant"],
    },
    {
      titre: "Un contraire n'est pas un mot voisin",
      texte: "Le contraire de content n'est ni joyeux ni ravi : c'est triste.",
      schema: contraireOuPareil,
      micros: ["cm1_voc_syn_ant"],
    },
    {
      titre: "Le synonyme t'évite de te répéter",
      texte: "Voilà le moment où il sert vraiment : quand tu te relis.",
      schema: grilleDeuxOutils,
      micros: ["cm1_voc_syn_ant"],
    },
    {
      titre: "Le défi : retrouve le mot de départ",
      texte: "Dans fleuriste, fleurir, fleuri, cherche le plus court. C'est lui la racine.",
      schema: chercheLeMotCourt,
      micros: ["cm1_voc_formation_defi"],
    },
  ],
  reel: {
    texte:
      "Dans une famille, on se ressemble sans être identiques : on a le même nom. Les mots font pareil. Fleur, fleurir, fleuriste portent le même morceau au début, et ce morceau dit de quoi on parle.",
  },
  historique: {
    texte:
      "Le mot vocabulaire vient du latin vocare, appeler. Un vocabulaire, c'est l'ensemble des mots qu'on peut appeler quand on en a besoin. Ceux qu'on reconnait sans pouvoir les appeler n'en font pas encore partie.",
  },
  methode: [
    {
      titre: "Cherche le mot le plus court",
      texte: "Dans une liste de mots qui se ressemblent, le plus court est souvent la racine.",
      schema: chercheLeMotCourt,
      micros: ["cm1_voc_famille"],
    },
    {
      titre: "Pour un contraire, dis la phrase à l'envers",
      texte: "« Il monte l'escalier. » À l'envers : il le descend. Le verbe change, pas le reste.",
      schema: contraireOuPareil,
      micros: ["cm1_voc_syn_ant"],
    },
    {
      titre: "En te relisant, cherche le mot qui revient",
      texte: "S'il apparait trois fois, remplace-le une fois sur deux.",
      schema: grandImmense,
      micros: ["cm1_voc_syn_ant"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "La famille de dent",
      donnees: "dentiste · dedans · dindon · donner",
      schema: familleDeFleur,
      question: "Lequel est de la famille de dent ?",
      solution:
        "Dentiste. Les trois autres commencent par des sons proches, mais ils ne parlent pas des dents.",
      micros: ["cm1_voc_famille"],
    },
    {
      titre: "Terre et terreur",
      donnees: "terrien · terreur · tasse · tour",
      schema: ressembleMaisNon,
      question: "Lequel est de la famille de terre ?",
      solution:
        "Terrien : il parle de la Terre. « Terreur » veut dire une grande peur — le début se ressemble, le sens n'a rien à voir.",
      micros: ["cm1_voc_famille"],
    },
    {
      titre: "Le contraire de content",
      donnees: "joyeux · triste · heureux · ravi",
      schema: contraireOuPareil,
      question: "Lequel est le contraire ?",
      solution:
        "Triste. Les trois autres veulent dire la même chose que content : ce sont des synonymes, pas des contraires.",
      micros: ["cm1_voc_syn_ant"],
    },
    {
      titre: "Trois fois grand",
      donnees: "« Un grand arbre, une grande maison, un grand jardin. »",
      schema: grandImmense,
      question: "Que fais-tu en te relisant ?",
      solution:
        "Tu remplaces une fois : « un arbre immense ». Le texte dit la même chose et ne tourne plus en rond.",
      micros: ["cm1_voc_syn_ant"],
    },
  ],
  pieges: [
    "Croire que deux mots qui commencent pareil sont de la même famille.",
    "Prendre un synonyme pour un contraire.",
    "Chercher un contraire qui ressemble au mot de départ.",
    "Apprendre les mots un par un, sans voir leur famille.",
    "Répéter le même mot cinq fois sans s'en apercevoir.",
  ],
  aRetenir: [
    "Une famille : le même mot de départ, et un sens proche.",
    "Fleur donne fleurir, fleuriste, fleuri.",
    "Un synonyme dit la même chose avec un autre mot.",
    "Un contraire dit l'inverse, pas quelque chose de voisin.",
    "Le bon moment pour s'en servir : quand tu te relis.",
  ],
  entrainement: [
    {
      question: "Quel mot appartient à la même famille que dent ?",
      correction: "Dentiste.",
      micros: ["cm1_voc_famille"],
    },
    {
      question: "Quel est le mot-racine de fleuriste, fleurir, fleuri ?",
      correction: "Fleur.",
      micros: ["cm1_voc_famille"],
    },
    {
      question: "Quel est le contraire de content ?",
      correction: "Triste.",
      micros: ["cm1_voc_syn_ant"],
    },
    {
      question: "Pour éviter de répéter grand, on peut dire…",
      correction: "Immense.",
      micros: ["cm1_voc_syn_ant"],
    },
    {
      question: "Terrien, terreur, tasse : lequel est de la famille de terre ?",
      correction: "Terrien.",
      micros: ["cm1_voc_formation_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesVocabulaireRelationsCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Familles et contraires - CM1",
    section: {
      type: "objectif",
      phrase: "Ça sert quand tu écris",
      sousPhrase: "Grand, grand, grand : trois fois le même mot dans ton texte.",
      encadre: { titre: "L'idée", texte: "Le pronom, puis le synonyme : deux outils." },
    },
  },
  {
    titre: "Trois sortes de voisins",
    badge: "Familles et contraires - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "La famille", texte: "fleur, fleurir, fleuriste." },
        { titre: "Le synonyme", texte: "rapide et vif." },
        { titre: "Le contraire", texte: "monter et descendre." },
      ],
    },
    schema: grilleDeuxOutils,
  },
  {
    titre: "Comme une famille",
    badge: "Familles et contraires - CM1",
    section: {
      type: "etapes",
      etapes: [
        "On se ressemble sans être identiques.",
        "On porte le même nom.",
        "Les mots font pareil : fleur, fleurir, fleuri.",
      ],
    },
    schema: familleDeFleur,
  },
  {
    titre: "À vous",
    badge: "Familles et contraires - CM1",
    section: {
      type: "exercice",
      enonce: "joyeux · triste · heureux · ravi",
      question: "Lequel est le contraire de content ?",
      indice: "Trois d'entre eux veulent dire la même chose que content.",
      correction: "Triste. Les trois autres sont des synonymes.",
    },
    schema: contraireOuPareil,
  },
];
