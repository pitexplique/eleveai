// ─── Fiche de cours : le passé composé et le choix du temps (CM1) ─────────────
// VINGT-CINQUIÈME ET DERNIÈRE FICHE DU CHANTIER CM1. La classe est complète.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : le passé composé des
// verbes être et avoir et des trois groupes · « Accorder le participe passé avec
// le SUJET dans le cas de l'auxiliaire être » · « Effectuer la transformation à
// la forme négative d'un verbe aux temps composés EN PLAÇANT LES ADVERBES DE
// NÉGATION AU BON EMPLACEMENT ».
//
// ⛔⛔ TROIS FICHES BORDENT CELLE-CI, ET L'ANGLE ÉVIDENT EST PRIS DEUX FOIS :
//   ⛔ « dans un verbe EN DEUX MOTS, c'est l'auxiliaire qui commande » →
//      `francais-cm2-conjugaison-participe` l. 231 (son « secret ») ;
//      « le verbe tient en deux mots : l'auxiliaire porte le temps » →
//      `francais-6e-conjugaison-temps-composes` l. 292. Abandonné.
//   ⛔ « une forme JUSTE peut être un mauvais choix » est le fil de
//      `francais-cm2-conjugaison-recit`, qui trie TROIS passés.
//   ⛔ L'accord du participe avec le COD (auxiliaire avoir) n'est PAS au
//      programme du CM1 : il appartient au CM2 et à la 6e. Ne pas l'introduire.
//
// ⭐⭐ CE QUI RESTE EST DANS LE POOL CONJ_VALEUR_TEMPS, ET TOUS SES ITEMS DISENT
// LA MÊME CHOSE : « demain » annonce le futur, « hier » annonce le passé,
// « autrefois » annonce le passé, « en ce moment » annonce le présent. LE TEMPS
// N'EST PAS À DEVINER — UN PETIT MOT DE LA PHRASE L'ANNONCE. L'enfant croit
// qu'il doit sentir le bon temps ; il doit d'abord le LIRE.
//
// ⭐⭐ ET C'EST LA BONNE FIN POUR L'ANNÉE. Depuis `grammaire_phrase`, toutes les
// fiches de langue du CM1 disent la même chose sous six formes : on ne devine
// pas, on regarde et on essaie.
//     encadrer · enlever et déplacer · mettre au pluriel · réduire ·
//     mettre à l'imparfait · dire « il faut … »
// La septième et dernière : CHERCHER LE MOT QUI ANNONCE LE TEMPS.
//
// ⭐ Le passé composé lui-même est traité par ses trois difficultés réelles, et
// chacune est une propriété : quel auxiliaire, quel accord, où va la négation.
// Le pool CONJ_NEGATION_COMPOSEE donne la règle en une phrase — « ne » et
// « pas » entourent l'AUXILIAIRE, pas le participe.
// ⚠️ Vérifié dans le routeur de la banque (l. 7629) : `microId.includes(
// "negation")` passe AVANT la branche du passé composé, donc la micro du CM1
// reçoit bien les questions de négation et non celles des auxiliaires. Le
// correctif écrit le 23/08 pour le CM2 couvre le CM1 sans modification.
//
// ⚠️ Le helper n'écrit JAMAIS de couleur : le canvas s'en charge.
//
// Alignée sur les pools CONJ_PASSE_COMPOSE, PARTICIPE_PASSE_ETRE,
// CONJ_NEGATION_COMPOSEE et CONJ_VALEUR_TEMPS de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// Micro-compétences couvertes (les 5 de la notion `conjugaison_passe_compose`) :
// - cm1_conj_valeur_temps           → figure, propriétés 1 et 6, méthode 1, exemple 1
// - cm1_conj_passe_compose          → propriétés 2 et 4, méthode 2, exemple 3
// - cm1_orth_participe_passe_etre   → propriété 3, exemple 2
// - cm1_conj_negation_passe_compose → propriété 5, méthode 3, exemple 4
// - cm1_conj_passe_compose_defi     → propriété 6 et dernier entrainement

import type { ReactNode } from "react";
import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import { ANNEE_SCOLAIRE } from "@/lib/fiches/annee-scolaire";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

/** Les deux caisses d'un temps composé. ⚠️ N'écrit jamais de couleur. */
function composee(opts: {
  pronom: string;
  auxiliaire: { texte: string; note?: string };
  participe: { texte: string; note?: string };
  accord?: { label?: string; absent?: boolean };
  legende?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "conjugaison",
        mode: "composee",
        pronom: opts.pronom,
        auxiliaire: opts.auxiliaire,
        participe: opts.participe,
        accord: opts.accord,
        legende: opts.legende,
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

const grilleMotsQuiAnnoncent = grille({
  headers: ["Le petit mot", "Le temps"],
  rows: [
    { values: ["demain, bientôt", "le futur"] },
    { values: ["hier, autrefois", "le passé"] },
    { values: ["en ce moment", "le présent"] },
  ],
  caption: "Le temps ne se devine pas : il est annoncé.",
});

const arriveesAvecEtre = composee({
  pronom: "elles",
  auxiliaire: { texte: "sont", note: "être" },
  participe: { texte: "arrivées", note: "accordé" },
  accord: { label: "avec le sujet" },
  legende: "Avec être, le participe s'accorde avec le sujet.",
});

const mangeAvecAvoir = composee({
  pronom: "elles",
  auxiliaire: { texte: "ont", note: "avoir" },
  participe: { texte: "mangé", note: "invariable" },
  accord: { absent: true },
  legende: "Avec avoir, le participe ne bouge pas.",
});

const negationEncadre = composee({
  pronom: "il n'",
  auxiliaire: { texte: "a pas", note: "encadré" },
  participe: { texte: "mangé", note: "intact" },
  legende: "« ne » et « pas » entourent l'auxiliaire, jamais le participe.",
});

const grilleQuelAuxiliaire = grille({
  headers: ["Le verbe", "L'auxiliaire"],
  rows: [
    { values: ["manger, finir", "avoir"] },
    { values: ["partir, arriver", "être"] },
    { values: ["tomber, venir", "être"] },
  ],
  caption: "Les verbes qui disent un déplacement prennent être.",
});

const grilleSeptEssais = grille({
  headers: ["Cette année", "Le geste"],
  rows: [
    { values: ["la phrase", "encadrer"] },
    { values: ["les compléments", "enlever"] },
    { values: ["le temps", "lire le mot"] },
  ],
  caption: "Sept essais dans l'année. Jamais une devinette.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheConjugaisonPasseComposeCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "conjugaison-passe-compose",
  titre: `Le passé composé et le choix du temps en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "« Demain, je ___ à la piscine. » Tu n'as pas à sentir quel temps écrire : le mot « demain » vient de te le dire. Le temps s'annonce, il ne se devine pas.",
  identite: [
    { label: "Mots clés", valeur: "Passé composé, auxiliaire, accord" },
    { label: "Le secret", valeur: "Un petit mot annonce le temps" },
    { label: "Outil", valeur: "Cherche demain, hier, en ce moment" },
  ],
  definition: {
    texte: [
      "Avant d'écrire un verbe, regarde la phrase : elle contient presque toujours un mot qui annonce le temps.",
      "« Demain » et « bientôt » appellent le futur. « Hier » et « autrefois » appellent le passé. « En ce moment » appelle le présent.",
      "Pour raconter ce qui est arrivé, tu as le passé composé : un auxiliaire — être ou avoir — suivi du participe passé.",
      "Avec être, le participe s'accorde avec le sujet : « elles sont arrivées ». Avec avoir, il ne bouge pas : « elles ont mangé ».",
      "Et pour dire non, « ne » et « pas » entourent l'auxiliaire, jamais le participe : « il n'a pas mangé ».",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(arriveesAvecEtre, grilleMotsQuiAnnoncent),
  },
  proprietes: [
    {
      titre: "Un petit mot annonce le temps",
      texte: "Demain, hier, autrefois, en ce moment. Lis-le avant d'écrire.",
      schema: grilleMotsQuiAnnoncent,
      micros: ["cm1_conj_valeur_temps"],
    },
    {
      titre: "Le passé composé demande un auxiliaire",
      texte: "Être ou avoir, suivi du participe passé. Ni l'un ni l'autre ne suffit seul.",
      schema: grilleQuelAuxiliaire,
      micros: ["cm1_conj_passe_compose"],
    },
    {
      titre: "Avec être, le participe s'accorde",
      texte: "« Elles sont arrivées » : le participe suit le sujet, comme un adjectif.",
      schema: arriveesAvecEtre,
      micros: ["cm1_orth_participe_passe_etre"],
    },
    {
      titre: "Avec avoir, il ne bouge pas",
      texte: "« Elles ont mangé » : aucun s, aucun e. Cette année, c'est aussi simple que ça.",
      schema: mangeAvecAvoir,
      micros: ["cm1_conj_passe_compose"],
    },
    {
      titre: "La négation entoure l'auxiliaire",
      texte: "« Il n'a pas mangé », jamais « il n'a mangé pas ».",
      schema: negationEncadre,
      micros: ["cm1_conj_negation_passe_compose"],
    },
    {
      titre: "Le défi : lis avant d'écrire",
      texte: "Septième essai de l'année. Cette fois, il suffit de regarder la phrase.",
      schema: grilleSeptEssais,
      micros: ["cm1_conj_passe_compose_defi", "cm1_conj_valeur_temps"],
    },
  ],
  reel: {
    texte:
      "Quand quelqu'un commence par « hier soir… », tu sais déjà que la suite sera au passé, avant même qu'il ait fini sa phrase. Ton oreille lit le petit mot toute seule. À l'écrit, il suffit de faire exprès ce que tu fais déjà.",
  },
  historique: {
    texte:
      "Le passé composé n'existait pas en latin : on disait « amavi » en un seul mot. Ce sont les gens qui ont pris l'habitude de dire « j'ai aimé », avec le verbe avoir. La langue a gardé leur façon de parler, pas celle des livres.",
  },
  methode: [
    {
      titre: "Cherche le mot de temps dans la phrase",
      texte: "Il est souvent au début, avant la virgule. Il décide pour toi.",
      schema: grilleMotsQuiAnnoncent,
      micros: ["cm1_conj_valeur_temps"],
    },
    {
      titre: "Regarde l'auxiliaire avant d'accorder",
      texte: "Être ? Le participe suit le sujet. Avoir ? Tu n'y touches pas.",
      schema: mangeAvecAvoir,
      micros: ["cm1_conj_passe_compose"],
    },
    {
      titre: "Pour la négation, entoure le premier morceau",
      texte: "« n' » devant l'auxiliaire, « pas » juste après. Le participe reste à la fin.",
      schema: negationEncadre,
      micros: ["cm1_conj_negation_passe_compose"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "Demain, je…",
      donnees: "« Demain, je ___ à la piscine. »",
      schema: grilleMotsQuiAnnoncent,
      question: "Quel temps écris-tu ?",
      solution:
        "Le futur : « j'irai ». Le mot « demain » l'a annoncé — tu n'avais rien à deviner.",
      micros: ["cm1_conj_valeur_temps"],
    },
    {
      titre: "Elles sont arrivées",
      donnees: "« Elles ___ arrivées à l'heure. »",
      schema: arriveesAvecEtre,
      question: "Quel auxiliaire, et quel accord ?",
      solution:
        "« Sont » : arriver se conjugue avec être. Et comme c'est être, le participe s'accorde avec « elles » : arrivées.",
      micros: ["cm1_orth_participe_passe_etre"],
    },
    {
      titre: "Elles ont mangé",
      donnees: "« Elles ___ mangé une mangue. »",
      schema: mangeAvecAvoir,
      question: "Faut-il un s à mangé ?",
      solution:
        "Non. L'auxiliaire est « ont », donc avoir : le participe ne bouge pas. « Elles ont mangé ».",
      micros: ["cm1_conj_passe_compose"],
    },
    {
      titre: "Dire non au passé",
      donnees: "« Il a mangé. » Mets à la forme négative.",
      schema: negationEncadre,
      question: "Où mets-tu « pas » ?",
      solution:
        "Entre l'auxiliaire et le participe : « il n'a pas mangé ». Le mot conjugué est l'auxiliaire, c'est lui qu'on encadre.",
      micros: ["cm1_conj_negation_passe_compose"],
    },
  ],
  pieges: [
    "Chercher le bon temps au feeling sans lire le mot qui l'annonce.",
    "Accorder le participe alors que l'auxiliaire est avoir.",
    "Oublier l'accord quand l'auxiliaire est être.",
    "Écrire « il n'a mangé pas ».",
    "Employer avoir avec un verbe de déplacement : « il a parti ».",
  ],
  aRetenir: [
    "Un petit mot de la phrase annonce le temps.",
    "Passé composé : un auxiliaire, puis le participe passé.",
    "Avec être, le participe s'accorde avec le sujet.",
    "Avec avoir, le participe ne bouge pas.",
    "« ne » et « pas » entourent l'auxiliaire.",
  ],
  entrainement: [
    {
      question: "« Demain, je ___ à la piscine. » Quel temps ?",
      correction: "Le futur : j'irai.",
      micros: ["cm1_conj_valeur_temps"],
    },
    {
      question: "Comment se forme le passé composé ?",
      correction: "Un auxiliaire (être ou avoir) et le participe passé.",
      micros: ["cm1_conj_passe_compose"],
    },
    {
      question: "« Elles ___ arrivées à l'heure. » Quel auxiliaire ?",
      correction: "Sont — et le participe s'accorde avec le sujet.",
      micros: ["cm1_orth_participe_passe_etre"],
    },
    {
      question: "Mets à la forme négative : « Il a mangé. »",
      correction: "« Il n'a pas mangé. »",
      micros: ["cm1_conj_negation_passe_compose"],
    },
    {
      question: "Comment savoir quel temps écrire ?",
      correction: "En cherchant le mot de la phrase qui l'annonce.",
      micros: ["cm1_conj_passe_compose_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesConjugaisonPasseComposeCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Passé composé et choix du temps - CM1",
    section: {
      type: "objectif",
      phrase: "Le temps est annoncé",
      sousPhrase: "« Demain, je ___ à la piscine. » Le mot « demain » a déjà répondu.",
      encadre: { titre: "L'idée", texte: "Lis la phrase avant de choisir." },
    },
  },
  {
    titre: "Les mots qui annoncent",
    badge: "Passé composé et choix du temps - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Demain, bientôt", texte: "Le futur." },
        { titre: "Hier, autrefois", texte: "Le passé." },
        { titre: "En ce moment", texte: "Le présent." },
      ],
    },
    schema: grilleMotsQuiAnnoncent,
  },
  {
    titre: "Ton oreille le fait déjà",
    badge: "Passé composé et choix du temps - CM1",
    section: {
      type: "etapes",
      etapes: [
        "Quelqu'un commence par « hier soir… ».",
        "Tu sais déjà que la suite sera au passé.",
        "À l'écrit, fais exprès ce que tu fais déjà.",
      ],
    },
    schema: arriveesAvecEtre,
  },
  {
    titre: "À vous",
    badge: "Passé composé et choix du temps - CM1",
    section: {
      type: "exercice",
      enonce: "« Il a mangé. » Mets à la forme négative.",
      question: "Où mets-tu « pas » ?",
      indice: "Quel est le mot conjugué dans « a mangé » ?",
      correction: "« Il n'a pas mangé » : on encadre l'auxiliaire.",
    },
    schema: negationEncadre,
  },
];
