// ─── Fiche de cours : écouter une consigne (CM1) ──────────────────────────────
// DOUZIÈME FICHE DU CHANTIER CM1, écrite le 31/08/2026 au gabarit de l'étalon.
// Elle OUVRE LE DOMAINE DE L'ORAL.
//
// ⚠️⚠️ RÉFÉRENCE : « Programme de français pour le CYCLE 3 », BO n° 16 du
// 17 avril 2025, rubriques « Cours moyen première année » : « Écouter pour
// comprendre un texte OU UNE CONSIGNE ».
//
// ⛔⛔ NOTION SATURÉE : le CM2 ET la 6e ont chacun leur `oral_ecouter`, et le
// pool ORAL est partagé par tout le cycle. J'ai relu les deux, et MA PREMIÈRE
// IDÉE ÉTAIT DÉJÀ PRISE :
//
//   ⛔ « préparer sa réponse pendant qu'il parle, c'est cesser d'écouter » →
//      6e l. 202. C'était l'angle que j'avais annoncé ; abandonné.
//   ⛔ « Écouter jusqu'au bout » → TITRE DE PROPRIÉTÉ au CM2 (l. 255) ET à la
//      6e (l. 262).
//   ⛔ « reformuler prouve qu'on a compris, répéter mot pour mot ne prouve
//      rien » → 6e l. 23 et l. 239.
//   ⛔ « reformuler et synthétiser ne sont pas le même geste » → le fil du CM2.
//   ⛔ « savoir ce qu'on cherche change ce qu'on entend » → le fil de la 6e.
//
//   | | CM1 (ici) | CM2 | 6e |
//   |---|---|---|---|
//   | le fil | ⭐ une consigne se REDIT avant de se FAIRE | reformuler ≠ synthétiser | savoir ce qu'on cherche change ce qu'on entend |
//   | l'erreur visée | ⭐ l'empressement | l'écoute à un seul niveau | l'écoute sans but |
//
// ⭐⭐ LA DÉCOUVERTE, ET ELLE EST DANS UN LEURRE DU POOL QUE PERSONNE N'AVAIT
// RAMASSÉ : à « pour bien écouter une consigne, il faut… », une des mauvaises
// réponses est « COMMENCER TOUT DE SUITE, POUR NE PAS PERDRE DE TEMPS ». C'est
// l'erreur qu'on voit tous les jours en CM1, et ce n'est PAS de l'inattention :
// c'est de l'empressement. L'enfant entend « colorie », il prend son crayon —
// et il n'entend pas « les nombres pairs ». Il a cru que commencer vite, c'était
// bien travailler. Nommer cela le déculpabilise et lui donne le geste.
//
// ⭐ ET LE SECOND LEURRE DONNE LE SECOND AXE : « noter chaque mot prononcé, sans
// en oublier aucun » est faux lui aussi. Une consigne ne se garde pas mot à mot ;
// elle se garde en la redisant avec ses mots. D'où l'ordre, qui est tout le
// contenu de la fiche : ÉCOUTER, REDIRE, FAIRE.
//
// ⭐ Le troisième leurre — « retenir sa question jusqu'à la fin de la journée » —
// donne la propriété 5 : la question se garde jusqu'à la fin DE LA CONSIGNE, pas
// plus loin.
//
// ⛔ NE PAS REPRENDRE non plus l'accroche de la fiche 9 (`ecriture_preparer`),
// qui utilise déjà « quand un copain t'explique une règle du jeu ». Ici l'image
// est celle du chemin.
//
// ⭐ GABARIT DE L'ÉTALON : 6 propriétés · 3 méthodes · 4 exemples · 5 pièges
// 5 à retenir · 5 entrainements · usages vidés · aucune formule · aucune capitale
// d'emphase · aucune légende de figure · tout texte projeté sous 250 signes.
// ⭐ Et la DÉCOUVERTE EST DANS LA DÉFINITION.
//
// ⚠️ RÈGLE DE COULEUR : aucune étiquette n'est une FONCTION grammaticale, toutes
// restent grises.
//
// Alignée sur le pool ORAL de
// lib/tutor-v4/questionBank/cycle3/francais/buildCycle3FrancaisBank.ts, et sur
// les items `cm1_fr_fixed_oral_1` et `_2` de
// lib/tutor-v4/questionBank/cm1/francais/fixed.bank.ts.
//
// Micro-compétences couvertes (les 3 de la notion `oral_ecouter`) :
// - cm1_oral_ecouter      → figure, propriétés 1, 2 et 5, méthodes 1 et 3, exemples 1 et 3
// - cm1_oral_reformuler   → propriétés 3 et 4, méthode 2, exemples 2 et 4
// - cm1_oral_ecouter_defi → propriété 6

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

const crayonTropTot = phrase({
  mots: [
    { texte: "prendre le crayon", barre: true },
    { texte: "écouter la fin", focus: true },
  ],
  legende: "Beaucoup de consignes ratées ont été commencées trop tôt.",
});

const grilleTroisTemps = grille({
  headers: ["Quand", "Tu fais quoi"],
  rows: [
    { values: ["pendant", "tu écoutes"] },
    { values: ["à la fin", "tu redis"] },
    { values: ["après", "tu commences"] },
  ],
  caption: "Écouter, redire, faire — dans cet ordre.",
});

const deuxVoix = phrase({
  mots: [
    { texte: "parler en même temps", barre: true },
    { texte: "se taire", focus: true },
  ],
  legende: "On n'entend pas deux voix à la fois.",
});

const motAMot = phrase({
  mots: [
    { texte: "mot pour mot", barre: true },
    { texte: "avec tes mots", focus: true },
  ],
  legende: "Répéter, c'est ta bouche. Redire, c'est ta tête.",
});

const redireCEstLeTest = phrase({
  mots: [{ texte: "la consigne" }, { texte: "tu la redis", focus: true }],
  liens: [{ de: 0, vers: 1, label: "le test", type: "question" }],
  legende: "Si tu n'arrives pas à la redire, tu ne l'as pas comprise.",
});

const gardeTaQuestion = phrase({
  mots: [
    { texte: "tout de suite", barre: true },
    { texte: "à la fin", focus: true },
  ],
  legende: "Garde ta question jusqu'au bout de la consigne, pas plus loin.",
});

// ─── La fiche ─────────────────────────────────────────────────────────────────

export const ficheOralEcouterCm1: FicheCoursData = {
  matiere: "francais",
  matiereLabel: "Français",
  classe: "cm1",
  notion: "oral-ecouter",
  titre: `Écouter une consigne en CM1 (${ANNEE_SCOLAIRE})`,
  accroche:
    "Tu entends « colorie », tu prends ton crayon — et tu n'as pas entendu « les nombres pairs ». Ce n'est pas que tu n'écoutais pas. C'est que tu étais pressé de bien faire.",
  identite: [
    { label: "Mots clés", valeur: "Écouter, redire, faire" },
    { label: "Le secret", valeur: "On redit avant de faire" },
    { label: "Outil", valeur: "Repose ton crayon" },
  ],
  definition: {
    texte: [
      "Une consigne, ce n'est pas seulement des mots à entendre. C'est quelque chose à faire, et l'ordre compte.",
      "Écouter d'abord, jusqu'au dernier mot. Beaucoup d'exercices ratés ont été commencés trop tôt.",
      "Redire ensuite, avec tes mots à toi. C'est le test : si tu n'y arrives pas, tu ne l'as pas comprise.",
      "Garder la consigne mot à mot ne sert à rien. Ce que tu gardes, c'est ce qu'il faut faire.",
      "Et seulement après, tu commences. Écouter, redire, faire.",
    ].join("\n\n"),
  },
  figure: {
    schema: pile(crayonTropTot, grilleTroisTemps),
  },
  proprietes: [
    {
      titre: "Ne prends pas ton crayon tout de suite",
      texte: "Commencer vite n'est pas bien travailler. La fin de la consigne compte autant que le début.",
      schema: crayonTropTot,
      micros: ["cm1_oral_ecouter"],
    },
    {
      titre: "On n'entend pas deux voix à la fois",
      texte: "Se taire pendant qu'on t'explique, ce n'est pas de la politesse : c'est ce qui permet d'entendre.",
      schema: deuxVoix,
      micros: ["cm1_oral_ecouter"],
    },
    {
      titre: "Garder les mots exacts ne sert à rien",
      texte: "Tu n'as pas à retenir chaque mot. Tu as à retenir ce qu'il faut faire.",
      schema: motAMot,
      micros: ["cm1_oral_reformuler"],
    },
    {
      titre: "Redire avec tes mots, c'est le test",
      texte: "Si tu n'y arrives pas, tu as entendu la consigne sans la comprendre.",
      schema: redireCEstLeTest,
      micros: ["cm1_oral_reformuler"],
    },
    {
      titre: "Ta question attend la fin",
      texte: "Pas la fin de la journée : la fin de la consigne. Alors tu la poses.",
      schema: gardeTaQuestion,
      micros: ["cm1_oral_ecouter"],
    },
    {
      titre: "Le défi : redire avant de faire",
      texte: "Une phrase dans ta tête, avec tes mots, et tu peux y aller.",
      schema: grilleTroisTemps,
      micros: ["cm1_oral_ecouter_defi"],
    },
  ],
  reel: {
    texte:
      "Quand quelqu'un t'explique le chemin pour aller quelque part, tu ne pars pas au premier « tu tournes à droite ». Tu écoutes tout, puis tu redis le chemin en entier pour vérifier. Une consigne, c'est un chemin.",
  },
  historique: {
    texte:
      "Le mot consigne vient de l'armée : c'était l'ordre donné au soldat qui montait la garde, et il devait le répéter avant de prendre son poste. On te demande la même chose aujourd'hui, mais en mieux — avec tes mots, pas avec ceux du chef.",
  },
  methode: [
    {
      titre: "Repose ton crayon pendant la consigne",
      texte: "Les mains vides, les yeux sur celui qui parle. Tu le reprendras dans dix secondes.",
      schema: crayonTropTot,
      micros: ["cm1_oral_ecouter"],
    },
    {
      titre: "Redis-la dans ta tête avec tes mots",
      texte: "Une phrase courte : ce qu'il faut faire, et sur quoi.",
      schema: redireCEstLeTest,
      micros: ["cm1_oral_reformuler"],
    },
    {
      titre: "S'il manque un bout, demande-le",
      texte: "Attends la fin, puis pose ta question. Elle est permise et elle est utile.",
      schema: gardeTaQuestion,
      micros: ["cm1_oral_ecouter"],
    },
  ],
  usages: [],
  exemples: [
    {
      titre: "L'exercice d'à côté",
      donnees: "« Colorie les nombres pairs. » Tu as colorié toute la ligne.",
      schema: crayonTropTot,
      question: "Qu'est-ce qui s'est passé ?",
      solution:
        "Tu es parti au mot « colorie ». Les deux derniers mots disaient quoi colorier, et ce sont eux qui portaient tout le travail.",
      micros: ["cm1_oral_ecouter"],
    },
    {
      titre: "Répéter ou redire",
      donnees: "Le maitre demande : « Redis-moi la consigne. »",
      schema: motAMot,
      question: "Que fais-tu ?",
      solution:
        "Tu la redis avec tes propres mots. Répéter la phrase exacte montre seulement que tu l'as entendue.",
      micros: ["cm1_oral_reformuler"],
    },
    {
      titre: "La question qui arrive trop tôt",
      donnees: "Au milieu de la consigne, tu lèves la main pour demander une précision.",
      schema: gardeTaQuestion,
      question: "Pourquoi attendre ?",
      solution:
        "Parce que pendant que tu tiens ta question, tu n'écoutes plus la suite — et la réponse est souvent dans ce que tu n'as pas entendu.",
      micros: ["cm1_oral_ecouter"],
    },
    {
      titre: "Une consigne en deux temps",
      donnees: "« Souligne les verbes, puis entoure les sujets. »",
      schema: redireCEstLeTest,
      question: "Comment vérifies-tu que tu as tout ?",
      solution:
        "Tu la redis avec tes mots et tu comptes les actions : deux. Une consigne qu'on redit en une seule action, c'est qu'il en manque une.",
      micros: ["cm1_oral_reformuler"],
    },
  ],
  pieges: [
    "Commencer dès qu'on a entendu le premier verbe.",
    "Parler en même temps que celui qui explique.",
    "Vouloir retenir la consigne mot à mot.",
    "Poser sa question au milieu, et perdre la suite.",
    "Se lancer sans être capable de redire ce qu'on va faire.",
  ],
  aRetenir: [
    "Écouter, redire, faire — dans cet ordre.",
    "Commencer vite n'est pas bien travailler.",
    "On n'entend pas deux voix à la fois.",
    "Tu retiens ce qu'il faut faire, pas les mots exacts.",
    "Si tu ne peux pas la redire, tu ne l'as pas comprise.",
  ],
  entrainement: [
    {
      question: "Pour bien écouter une consigne, il faut…",
      correction: "Être attentif et ne pas parler en même temps.",
      micros: ["cm1_oral_ecouter"],
    },
    {
      question: "Reformuler une consigne entendue, c'est…",
      correction: "La redire avec ses propres mots.",
      micros: ["cm1_oral_reformuler"],
    },
    {
      question: "Tu as une question au milieu de la consigne. Que fais-tu ?",
      correction: "Tu la gardes et tu la poses à la fin.",
      micros: ["cm1_oral_ecouter"],
    },
    {
      question: "Tu as colorié toute la ligne au lieu des nombres pairs. Pourquoi ?",
      correction: "Tu as commencé avant la fin de la consigne.",
      micros: ["cm1_oral_ecouter"],
    },
    {
      question: "Comment savoir que tu as compris avant de commencer ?",
      correction: "Tu arrives à redire la consigne avec tes mots.",
      micros: ["cm1_oral_ecouter_defi"],
    },
  ],
  coachHref: "/coach-ia/francais?classe=cm1",
};

export const slidesOralEcouterCm1: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Écouter une consigne - CM1",
    section: {
      type: "objectif",
      phrase: "Écouter, redire, faire",
      sousPhrase: "Tu entends « colorie », tu prends ton crayon — et tu rates « les nombres pairs ».",
      encadre: { titre: "L'idée", texte: "Commencer vite n'est pas bien travailler." },
    },
  },
  {
    titre: "Les trois temps",
    badge: "Écouter une consigne - CM1",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Pendant", texte: "Tu écoutes, crayon posé." },
        { titre: "À la fin", texte: "Tu redis avec tes mots." },
        { titre: "Après", texte: "Tu commences." },
      ],
    },
    schema: grilleTroisTemps,
  },
  {
    titre: "Comme un chemin",
    badge: "Écouter une consigne - CM1",
    section: {
      type: "etapes",
      etapes: [
        "On t'explique le chemin pour aller quelque part.",
        "Tu ne pars pas au premier « tourne à droite ».",
        "Tu écoutes tout, puis tu redis le chemin entier.",
      ],
    },
    schema: crayonTropTot,
  },
  {
    titre: "À vous",
    badge: "Écouter une consigne - CM1",
    section: {
      type: "exercice",
      enonce: "« Souligne les verbes, puis entoure les sujets. »",
      question: "Comment vérifier que tu as tout compris ?",
      indice: "Compte les actions demandées.",
      correction: "Tu la redis avec tes mots : il y a deux actions, pas une.",
    },
    schema: redireCEstLeTest,
  },
];
