// ─── Fiche de cours : résoudre un problème (CM2) ────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/probleme.bank.ts (notionId probleme).
// CM2 = texte brut, langage d'un enfant de ~10 ans. La banque n'a pas de canvas
// dédié → on MONTRE avec le schéma en barres (kind schema_barre, méthode de
// Singapour) : les quantités deviennent des barres, l'inconnue est un « ? ».
//
// Micro-compétences couvertes (les 5 de la banque) :
// - probleme_choisir_operation  → propriété « les 4 opérations », exemple crayons (× )
// - probleme_une_etape          → definition, figure (128 + 74), exemple bus (56 − 18)
// - probleme_plusieurs_etapes   → propriété « plusieurs calculs », exemple Éva (3×8 + 6)
// - probleme_rediger            → propriété « une phrase avec l'unité »
// - probleme_defi               → défi 974 (marché de Saint-Pierre : 2 étapes + monnaie)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type Part = { label: string; value?: string; unknown?: boolean };

function barre(opts: {
  title?: string;
  total?: string;
  parts: Part[];
  questionLabel?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "schema_barre",
        title: opts.title,
        total: opts.total,
        parts: opts.parts,
        questionLabel: opts.questionLabel,
        display: {
          showTotal: true,
          showPartLabels: true,
          showValues: true,
          showQuestion: true,
        },
      }}
    />
  );
}

const pieges = [
  "Se jeter sur les nombres sans lire la question : on commence toujours par comprendre ce que le problème demande.",
  "Se fier au seul mot « en plus » ou « partage » : le mot aide, mais c'est la situation qui décide de l'opération (« partager » → division).",
  "Oublier la phrase réponse et l'unité : « 42 » ne veut rien dire ; « Il reste 42 ballons » répond vraiment à la question.",
];

const aRetenir = [
  "Pour résoudre un problème : je lis la question, je choisis l'opération, je calcule, je réponds par une phrase.",
  "Un schéma en barres aide à voir les quantités et à choisir la bonne opération.",
  "La réponse est une phrase complète, avec l'unité (€, élèves, km…).",
];

export const ficheProblemeCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "probleme",
  titre: "Résoudre un problème",
  accroche:
    "Résoudre un problème, c'est raconter une petite histoire en mathématiques : on comprend ce qu'on cherche, on choisit la bonne opération, on calcule, puis on répond par une phrase.",
  identite: [
    { label: "Mots clés", valeur: "Énoncé, données, question, opération, phrase réponse" },
    { label: "Le secret", valeur: "Relire la QUESTION avant de calculer" },
    { label: "Outil", valeur: "Le schéma en barres (on dessine les quantités)" },
  ],
  definition: {
    texte:
      "Un problème raconte une situation avec des nombres (les données) et pose une question. Le résoudre, c'est choisir la ou les bonnes opérations pour répondre, puis écrire une phrase réponse claire. Un problème « à une étape » se résout avec une seule opération ; « à plusieurs étapes » en demande plusieurs.",
  },
  figure: {
    schema: barre({
      title: "128 livres + 74 livres",
      total: "?",
      parts: [
        { label: "étagère 1", value: "128" },
        { label: "étagère 2", value: "74" },
      ],
      questionLabel: "Combien de livres en tout ?",
    }),
    legende: "On cherche un total : on réunit les deux barres. 128 + 74 = 202 livres.",
  },
  proprietes: [
    {
      titre: "Choisir l'opération",
      texte: "Réunir/ajouter → +. Enlever/donner → −. Plusieurs groupes égaux → ×. Partager en parts égales → ÷.",
    },
    {
      titre: "Une étape ou plusieurs",
      texte: "Parfois une seule opération suffit. Parfois il faut calculer une valeur avant de pouvoir répondre.",
    },
    {
      titre: "Faire un schéma",
      texte: "Dessiner les quantités en barres aide à voir ce qu'on cherche (le « ? »).",
    },
    {
      titre: "Rédiger la réponse",
      texte: "On termine par une phrase complète, avec l'unité : « Il reste 42 ballons. »",
    },
  ],
  reel: {
    texte:
      "À La Réunion, un problème c'est la vie de tous les jours : payer plusieurs sachets de letchis au marché de Saint-Pierre et rendre la monnaie, répartir une classe dans des bus pour une sortie au volcan, ou additionner les kilomètres d'une randonnée dans les Hauts.",
  },
  historique: {
    texte:
      "Un mathématicien du 20e siècle, George Pólya, a écrit un livre célèbre sur « comment résoudre un problème ». Sa recette tient en 4 temps : bien comprendre la question, faire un plan, l'exécuter, puis vérifier si la réponse a du sens. C'est encore ce qu'on t'apprend aujourd'hui !",
  },
  methode: [
    { titre: "Je lis la question", texte: "Je surligne ce que le problème demande vraiment." },
    { titre: "Je choisis et je calcule", texte: "Je repère les données, je choisis l'opération (ou je fais un schéma)." },
    { titre: "Je réponds par une phrase", texte: "Une phrase complète, avec l'unité." },
  ],
  usages: [
    { titre: "Choisir l'opération", detail: "Dire si c'est +, −, × ou ÷ avant de calculer." },
    { titre: "Une étape", detail: "Résoudre avec une seule opération." },
    { titre: "Plusieurs étapes", detail: "Enchaîner les calculs dans le bon ordre." },
  ],
  exemples: [
    {
      titre: "Choisir la bonne opération",
      donnees: "Une boîte contient 6 crayons. On a 8 boîtes identiques.",
      question: "Quelle opération donne le nombre total de crayons ?",
      solution: "Plusieurs groupes identiques → multiplication. On calcule 6 × 8 = 48 crayons.",
    },
    {
      titre: "Un problème en une étape",
      donnees: "Un bus transporte 56 élèves. 18 élèves descendent.",
      question: "Combien reste-t-il d'élèves dans le bus ?",
      schema: barre({
        title: "56 élèves au départ",
        total: "56",
        parts: [
          { label: "restent", unknown: true },
          { label: "descendent", value: "18" },
        ],
        questionLabel: "Combien restent dans le bus ?",
      }),
      solution: "Des élèves partent → soustraction. 56 − 18 = 38. Il reste 38 élèves dans le bus.",
    },
    {
      titre: "Un problème en plusieurs étapes",
      donnees: "Éva achète 3 livres à 8 € chacun et une trousse à 6 €.",
      question: "Combien paie-t-elle au total ?",
      solution:
        "1) Le prix des livres : 3 × 8 = 24 €. 2) On ajoute la trousse : 24 + 6 = 30 €. Éva paie 30 €.",
    },
    {
      titre: "Le défi 974",
      donnees: "Au marché de Saint-Pierre, Léa achète 4 sachets de letchis à 5 € chacun et un jus à 3 €. Elle donne 30 €.",
      question: "Combien reçoit-elle de monnaie ?",
      solution:
        "1) Les letchis : 4 × 5 = 20 €. 2) Avec le jus : 20 + 3 = 23 €. 3) La monnaie : 30 − 23 = 7 €. Léa reçoit 7 € de monnaie.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "On partage 36 bonbons entre 4 enfants. Quelle opération choisir ?",
      correction: "Partager en parts égales → division : 36 ÷ 4 = 9. Chaque enfant reçoit 9 bonbons.",
    },
    {
      question: "Une classe reçoit 7 paquets de 12 cahiers. Combien de cahiers ?",
      correction: "Groupes identiques → multiplication : 7 × 12 = 84 cahiers.",
    },
    {
      question: "Un élève répond juste « 42 » à un problème qui demande une distance. Est-ce assez clair ?",
      correction: "Non : il manque l'unité et la phrase. Il faut écrire « La distance est de 42 km. »",
    },
    {
      question: "Pour une sortie, 92 élèves prennent des bus de 30 places. Combien de bus au minimum ?",
      correction: "92 ÷ 30 = 3 bus complets et il reste 2 élèves. Il faut donc un 4e bus : 4 bus.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesProblemeCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Problèmes - CM2",
    section: {
      type: "objectif",
      phrase: "Comprendre, choisir l'opération et répondre par une phrase",
      sousPhrase:
        "Un problème raconte une situation et pose une question. On choisit la bonne opération pour y répondre.",
      encadre: {
        titre: "L'idée",
        texte: "Je lis la question → je choisis l'opération → je calcule → je réponds par une phrase.",
      },
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu:
          "Payer au marché de Saint-Pierre et rendre la monnaie, répartir une classe dans des bus, additionner les kilomètres d'une randonnée.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "George Pólya a résumé la résolution en 4 temps : comprendre, faire un plan, l'exécuter, vérifier. C'est encore la méthode d'aujourd'hui.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProblemeCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Une étape",
    section: {
      type: "exemple",
      enonce: "Un bus transporte 56 élèves. 18 élèves descendent.",
      question: "Combien reste-t-il d'élèves ?",
      correction: "Des élèves partent → soustraction. 56 − 18 = 38. Il reste 38 élèves.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Plusieurs étapes",
    section: {
      type: "exemple",
      enonce: "Éva achète 3 livres à 8 € chacun et une trousse à 6 €.",
      question: "Combien paie-t-elle ?",
      correction: "1) 3 × 8 = 24 €. 2) 24 + 6 = 30 €. Éva paie 30 €.",
    },
  },
  {
    titre: "Pièges & à retenir",
    badge: "Vigilance",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Pièges à éviter",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {pieges.map((piege) => (
              <li key={piege}>• {piege}</li>
            ))}
          </ul>
        ),
      },
      droite: {
        variante: "ok",
        titre: "À retenir",
        contenu: (
          <ul className="grid gap-3 text-2xl leading-snug">
            {aRetenir.map((point) => (
              <li key={point}>• {point}</li>
            ))}
          </ul>
        ),
      },
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    section: {
      type: "exercice",
      enonce: "Au marché de Saint-Pierre, Léa achète 4 sachets de letchis à 5 € et un jus à 3 €. Elle donne 30 €.",
      question: "Combien reçoit-elle de monnaie ?",
      indice: "Calcule d'abord le prix des letchis, puis ajoute le jus, puis la monnaie.",
      correction: "4 × 5 = 20 €, puis 20 + 3 = 23 €, puis 30 − 23 = 7 €. Léa reçoit 7 € de monnaie.",
    },
  },
];
