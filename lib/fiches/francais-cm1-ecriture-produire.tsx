// ─── Fiche de cours : écrire un texte qui se tient (CM1) ──────────────────────
// DIXIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année ».
//
// ⛔⛔ NOTION LA PLUS ENCOMBRÉE DU CYCLE : le CM2 ET la 6e ont chacun une fiche
// `ecriture_produire`, et toutes trois tirent des mêmes pools ECRITURE et
// ECRIT_COHERENCE. J'ai relu les deux avant d'écrire, et DEUX PORTES ÉTAIENT
// DÉJÀ PRISES :
//
//   ⛔ « le paragraphe est une unité de sens, pas une unité de place » →
//      pris DEUX FOIS (cm2 l. 247, 6e l. 336). Interdit ici.
//   ⛔ « le lecteur ne voit pas ce que tu imagines » → c'est un TITRE DE
//      PROPRIÉTÉ de la 6e (l. 562). Interdit ici, malgré la tentation : c'était
//      ma première idée.
//   ⛔ « des détails précis font voir, les mots d'intensité ne montrent rien » →
//      6e l. 251 et cm2 l. 528.
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ des phrases justes mises bout à bout font une LISTE | plusieurs paragraphes : où couper, comment les tenir | ce qui change en route : temps, noms, lieu, narrateur |
//   | l'échelle | la PHRASE, puis UN paragraphe | le TEXTE | le texte et ses codes |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE VIENT D'UNE LIGNE DE MÉTHODE DU POOL
// ECRIT_COHERENCE : « les connecteurs disent le rapport entre les idées : SANS
// EUX, LE TEXTE EST UNE LISTE. » Voilà ce que le CM1 possède en propre. Le chat
// dort. Il pleut. Papa rentre. Trois phrases parfaitement correctes — majuscule,
// point, sens complet — et pourtant ce n'est pas une histoire. Ce qui manque
// n'est pas dans les phrases : c'est ENTRE elles.
//
// ⭐ Et c'est exactement ce que dit le libellé de la micro, qui n'existe qu'au
// CM1 : « PRENDRE CONSCIENCE de ce qui rend un texte cohérent ». Pas assurer, pas
// construire — prendre conscience. Le CM1 est l'année où l'on découvre qu'un
// texte tient par quelque chose, et ce quelque chose est visible et comptable.
//
// ⭐ D'où un outil que l'enfant applique seul : RELIS-TOI ET COMPTE TES
// CONNECTEURS. Zéro, tu as écrit une liste.
//
// ⭐ Le CM1 est aussi la seule des trois classes dont les micros descendent
// jusqu'à LA PHRASE (« construire des phrases claires et correctement
// ponctuées »). CM2 et 6e démarrent au paragraphe. C'est donc ici, et nulle part
// ailleurs, que se disent la majuscule, le point et le sens complet.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur les pools ECRITURE et ECRIT_COHERENCE de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm1_fr_fixed_ecrit_1`, `_2` et `_3` de
// lib/tutor-v4/questionBank/cm1/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 5 de la notion `ecriture_produire`) :
// - cm1_ecrit_phrase        → propriétés 1 et 2, méthode 1, exemple 1
// - cm1_ecrit_paragraphe    → figure, propriété 3, méthode 2, exemple 2
// - cm1_ecrit_recit         → propriété 4, méthode 2, exemple 3
// - cm1_ecrit_coherence     → propriété 5, méthode 3, exemple 4
// - cm1_ecrit_produire_defi → propriété 6

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

const troisPhrasesEnListe = phrase({
  mots: [{ texte: "Le chat dort." }, { texte: "Il pleut." }, { texte: "Papa rentre." }],
  legende: "Trois phrases justes. Et pourtant, pas encore un texte.",
});

const grilleConnecteurs = grille({
  headers: ["Le mot", "Il dit"],
  rows: [
    { values: ["d'abord, enfin", "l'ordre"] },
    { values: ["mais", "le contraire"] },
    { values: ["parce que", "le pourquoi"] },
  ],
  caption: "Sans eux, ton texte reste une liste.",
});

const majusculeEtPoint = phrase({
  mots: [
    { texte: "les enfants jouent", barre: true },
    { texte: "Les enfants jouent.", focus: true },
  ],
  legende: "Une majuscule, un point, et un sens complet.",
});

const pointDInterrogation = phrase({
  mots: [
    { texte: "As-tu fini.", barre: true },
    { texte: "As-tu fini ?", focus: true },
  ],
  legende: "La ponctuation dit comment la phrase se lit.",
});

const troisMoments = phrase({
  mots: [{ texte: "d'abord" }, { texte: "ensuite" }, { texte: "enfin" }],
  legende: "Un court récit tient en trois moments.",
});

const chienPrecis = phrase({
  mots: [
    { texte: "impressionnant", barre: true },
    { texte: "grand et noir", focus: true },
  ],
  legende: "Les adjectifs précis font apparaitre le chien.",
});

const memePersonnage = phrase({
  mots: [{ texte: "le chien" }, { texte: "il", focus: true }],
  liens: [{ de: 0, vers: 1, label: "le même", type: "question" }],
  legende: "« il » évite la répétition sans changer de personnage.",
});

const compteTesConnecteurs = phrase({
  mots: [
    { texte: "zéro", barre: true },
    { texte: "compte-les", focus: true },
  ],
  legende: "Zéro connecteur : tu as écrit une liste.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheEcritureProduireCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "ecriture-produire",
  titre: `Écrire un texte qui se tient en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Le chat dort. Il pleut. Papa rentre. Trois phrases justes — et pourtant ce n'est pas une histoire. Ce qui manque n'est pas dans les phrases : c'est entre elles.",
  identite: [
    { label: "Mots clés", valeur: "Phrase, ordre, connecteur" },
    { label: "Le secret", valeur: "Ce qui tient est entre les phrases" },
    { label: "Outil", valeur: "Compte tes connecteurs" },
  ],
  definition: {
    texte: [
      "Une phrase commence par une majuscule, finit par un point, et veut dire quelque chose toute seule.",
      "Mais des phrases justes mises bout à bout ne font pas un texte. Elles font une liste.",
      "Ce qui en fait un texte, ce sont les connecteurs : les mots qui accrochent une phrase à la suivante.",
      "d'abord, ensuite, enfin disent l'ordre. mais dit que ça s'oppose. parce que dit pourquoi.",
      "Alors relis-toi et cherche-les. Si tu n'en trouves aucun, tu as écrit une liste.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(troisPhrasesEnListe, grilleConnecteurs),
  },
  proprietes: [
    {
      titre: "Une phrase a un sens complet",
      texte: "Majuscule au début, point à la fin. « Dans la cour les enfants » n'est pas une phrase.",
      schema: majusculeEtPoint,
      micros: ["cm1_ecrit_phrase"],
    },
    {
      titre: "La ponctuation dit comment lire",
      texte: "Le point d'interrogation pour une question. La virgule pour séparer une liste.",
      schema: pointDInterrogation,
      micros: ["cm1_ecrit_phrase"],
    },
    {
      titre: "Sans connecteur, c'est une liste",
      texte: "Les connecteurs ne décorent pas : ils disent le rapport entre deux idées.",
      schema: grilleConnecteurs,
      micros: ["cm1_ecrit_paragraphe"],
    },
    {
      titre: "Raconter, c'est trois moments",
      texte: "d'abord, ensuite, enfin. « et, et, et » ne dit rien de l'ordre.",
      schema: troisMoments,
      micros: ["cm1_ecrit_recit"],
    },
    {
      titre: "Le même personnage garde son nom",
      texte: "Pour ne pas te répéter, écris « il ». Mais c'est toujours le même.",
      schema: memePersonnage,
      micros: ["cm1_ecrit_coherence"],
    },
    {
      titre: "Le défi : compte-les",
      texte: "Relis ton texte et compte tes connecteurs. Zéro, il y a du travail.",
      schema: compteTesConnecteurs,
      micros: ["cm1_ecrit_produire_defi"],
    },
  ],
  reel: {
    texte:
      "Quand tu racontes ta journée à table, tu ne dis pas « j'ai mangé, j'ai joué, je suis tombé ». Tu dis « d'abord », « et après », « mais à la fin ». À l'oral, les connecteurs viennent tout seuls. À l'écrit, il faut y penser.",
  },
  historique: {
    texte:
      "Les Romains écrivaient sans espaces entre les mots et sans aucun point. Pour comprendre, il fallait lire à voix haute. Les points, les virgules et les majuscules ont été ajoutés petit à petit, pour que l'œil puisse faire ce que la voix faisait.",
  },
  methode: [
    {
      titre: "Relis à voix haute et pose les points",
      texte: "Là où ta voix s'arrête, il y a un point. Là où elle monte, un point d'interrogation.",
      schema: pointDInterrogation,
      micros: ["cm1_ecrit_phrase"],
    },
    {
      titre: "Écris tes trois moments avant d'écrire",
      texte: "Trois mots suffisent : d'abord, ensuite, enfin. Puis tu remplis.",
      schema: troisMoments,
      micros: ["cm1_ecrit_paragraphe", "cm1_ecrit_recit"],
    },
    {
      titre: "Souligne tes connecteurs en relisant",
      texte: "S'il n'y en a aucun entre deux phrases, ajoute celui qui manque.",
      schema: compteTesConnecteurs,
      micros: ["cm1_ecrit_coherence"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Poser la bonne ponctuation",
      donnees: "Tu écris : « As-tu fini tes devoirs »",
      schema: pointDInterrogation,
      question: "Que manque-t-il ?",
      solution:
        "Le point d'interrogation. C'est une question : elle commence par une majuscule et finit par « ? ».",
      micros: ["cm1_ecrit_phrase"],
    },
    {
      titre: "Trois phrases sans lien",
      donnees: "« Il met son manteau. Il fait froid. »",
      schema: grilleConnecteurs,
      question: "Comment en faire un texte ?",
      solution:
        "En ajoutant le connecteur qui dit le rapport : « Il met son manteau parce qu'il fait froid. » Le « parce que » donne la cause.",
      micros: ["cm1_ecrit_paragraphe"],
    },
    {
      titre: "Décrire un chien",
      donnees: "« Un chien vraiment très impressionnant aboyait. »",
      schema: chienPrecis,
      question: "Pourquoi on ne le voit pas ?",
      solution:
        "Parce que « impressionnant » dit ce que tu ressens, pas ce qu'il est. Écris « un grand chien noir aboyait devant la porte » : des adjectifs et des détails précis.",
      micros: ["cm1_ecrit_recit"],
    },
    {
      titre: "Ne pas se répéter",
      donnees: "« Le chien aboie. Le chien court vers la porte. »",
      schema: memePersonnage,
      question: "Que fais-tu ?",
      solution:
        "Tu remplaces le second par « il ». Attention : « il » doit désigner le même chien, sinon ton lecteur croit qu'il y en a deux.",
      micros: ["cm1_ecrit_coherence"],
    },
  ],
  pieges: [
    "Oublier la majuscule ou le point : ce n'est pas encore une phrase.",
    "Mettre « et » partout : « et » ne dit ni l'ordre ni la cause.",
    "Écrire des phrases justes sans aucun lien entre elles.",
    "Décrire avec des mots forts au lieu de détails précis.",
    "Changer le nom d'un personnage en cours de route.",
  ],
  aRetenir: [
    "Une phrase : majuscule, point, et un sens complet.",
    "Des phrases bout à bout font une liste, pas un texte.",
    "Les connecteurs disent le rapport entre deux idées.",
    "d'abord, ensuite, enfin : les trois moments d'un récit.",
    "Compte tes connecteurs. Zéro, tu as écrit une liste.",
  ],
  entrainement: [
    {
      question: "« as-tu fini tes devoirs » : qu'est-ce qui manque ?",
      correction: "La majuscule et le point d'interrogation.",
      micros: ["cm1_ecrit_phrase"],
    },
    {
      question: "Quel groupe de mots organise le mieux les étapes d'un récit ?",
      correction: "d'abord, ensuite, enfin.",
      micros: ["cm1_ecrit_paragraphe"],
    },
    {
      question: "Pour écrire une courte description, on choisit surtout…",
      correction: "Des adjectifs et des détails précis.",
      micros: ["cm1_ecrit_recit"],
    },
    {
      question: "Pourquoi remplacer « le chien » par « il » ?",
      correction: "Pour éviter la répétition sans changer de personnage.",
      micros: ["cm1_ecrit_coherence"],
    },
    {
      question: "Ton texte n'a aucun connecteur. Qu'as-tu écrit ?",
      correction: "Une liste de phrases, pas un texte.",
      micros: ["cm1_ecrit_produire_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesEcritureProduireCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écrire un texte qui se tient - CM1",
    section: {
      type: "objectif",
      phrase: "Ce qui tient est entre les phrases",
      sousPhrase: "Le chat dort. Il pleut. Papa rentre. Trois phrases justes, pas une histoire.",
      encadre: { titre: "L'idée", texte: "Sans connecteur, un texte est une liste." },
    },
  },
  {
    titre: "Les mots qui accrochent",
    badge: "Écrire un texte qui se tient - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "L'ordre", texte: "d'abord, ensuite, enfin." },
        { titre: "Le contraire", texte: "mais." },
        { titre: "Le pourquoi", texte: "parce que." },
      ],
    },
    schema: grilleConnecteurs,
  },
  {
    titre: "Comme à table",
    badge: "Écrire un texte qui se tient - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Tu racontes ta journée : « d'abord », « et après », « mais à la fin ».",
        "À l'oral, les connecteurs viennent tout seuls.",
        "À l'écrit, il faut y penser.",
      ],
    },
    schema: troisMoments,
  },
  {
    titre: "À vous",
    badge: "Écrire un texte qui se tient - CM1",
    section: {
      type: "exercice",
      enonce: "« Il met son manteau. Il fait froid. »",
      question: "Comment en faire un texte ?",
      indice: "Quel rapport y a-t-il entre les deux idées ?",
      correction: "« Il met son manteau parce qu'il fait froid. »",
    },
    schema: grilleConnecteurs,
  },
];
