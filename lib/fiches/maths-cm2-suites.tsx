// ─── Fiche de cours : les suites de nombres (CM2) ───────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/suites.bank.ts (notionId suite).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// suite du coach (cases de termes + flèches d'écart) — comme dans les exercices.
//
// Micro-compétences couvertes (les 4 de la banque) :
// - suite_continuer                → definition, figure (2;4;6;8;? +2), exemple « continuer »
// - suite_regle                    → propriété « trouver la règle », exemple 4;7;10;13 (+3)
// - suite_croissante_decroissante  → propriété « le sens », exemple 20;15;10;5 (décroissante)
// - suite_defi                     → défi dessiné 974 (balises sur le sentier, +5 → 25 m)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

type SuiteTheme =
  | "nombre"
  | "margouillat"
  | "pieces"
  | "eau"
  | "dechet"
  | "jeu_video"
  | "requin";

function suite(opts: {
  theme?: SuiteTheme;
  titre?: string;
  terms: Array<number | string>;
  missingIndex?: number;
  arrows?: string[];
  rule?: string;
  phrase?: string;
}) {
  return (
    <CanvasRenderer
      figure={{
        kind: "suite",
        theme: opts.theme ?? "nombre",
        titre: opts.titre,
        terms: opts.terms,
        missingIndex: opts.missingIndex,
        arrows: opts.arrows,
        rule: opts.rule,
        phrase: opts.phrase,
        display: {
          showIcons: (opts.theme ?? "nombre") !== "nombre",
          showArrows: true,
          showRule: false,
          showLabels: false,
        },
      }}
    />
  );
}

const pieges = [
  "Regarder seulement le premier écart : une règle doit fonctionner entre TOUS les termes voisins. 3 ; 6 ; 10 ; 15 ne fait pas « +3 » partout (les écarts sont +3, +4, +5).",
  "Confondre addition et multiplication : dans 2 ; 4 ; 8 ; 16, on ne fait pas +2, on multiplie par 2.",
  "Croire qu'une suite est croissante parce que le dernier nombre est plus grand que le premier : 2 ; 9 ; 5 ; 12 monte, descend, puis remonte → elle n'est pas croissante.",
];

const aRetenir = [
  "Une suite est une liste de nombres rangés selon une règle.",
  "Pour trouver la règle, on cherche l'écart entre deux termes voisins (+, − ou ×).",
  "Une suite est croissante si elle monte partout, décroissante si elle descend partout.",
];

export const ficheSuitesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "suite",
  titre: "Les suites de nombres",
  accroche:
    "Une suite, c'est une liste de nombres rangés selon une règle : 2 ; 4 ; 6 ; 8… Une fois qu'on a trouvé la règle (ici : ajouter 2), on peut deviner le nombre d'après.",
  identite: [
    { label: "Mots clés", valeur: "Suite, terme, règle, écart, croissante, décroissante" },
    { label: "Le secret", valeur: "Chercher l'écart entre deux termes voisins" },
    { label: "Outil", valeur: "Les flèches entre les cases (+, −, ×)" },
  ],
  definition: {
    texte:
      "Une suite de nombres est une liste de nombres rangés selon une règle. Chaque nombre s'appelle un terme. La règle explique comment passer d'un terme au suivant : on peut ajouter, enlever ou multiplier toujours par le même nombre.",
  },
  figure: {
    schema: suite({
      titre: "Continuer une suite",
      terms: [2, 4, 6, 8, "?"],
      missingIndex: 4,
      arrows: ["+2", "+2", "+2", "+2"],
    }),
    legende: "On ajoute 2 à chaque fois : après 8, le terme suivant est 8 + 2 = 10.",
  },
  proprietes: [
    {
      titre: "Trouver la règle",
      texte: "On calcule l'écart entre deux termes voisins. 4 ; 7 ; 10 ; 13 : 7 − 4 = 3, la règle est « ajouter 3 ».",
    },
    {
      titre: "Continuer la suite",
      texte: "Une fois la règle trouvée, on l'applique au dernier terme pour obtenir le suivant.",
    },
    {
      titre: "Croissante ou décroissante",
      texte: "Croissante = les nombres montent partout. Décroissante = ils descendent partout.",
    },
    {
      titre: "Pas toujours une addition",
      texte: "Parfois on multiplie : 2 ; 4 ; 8 ; 16, on double à chaque fois (× 2).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on croise des suites partout : les balises d'un sentier de randonnée placées tous les 5 mètres (5, 10, 15, 20…), le niveau d'une réserve d'eau qui baisse de 5 L par jour, ou le nombre de pièces gagnées à chaque niveau d'un jeu vidéo.",
  },
  historique: {
    texte:
      "La plus célèbre des suites porte le nom de Fibonacci, un mathématicien italien du Moyen Âge. Sa règle est amusante : chaque nombre est la somme des deux d'avant (1, 1, 2, 3, 5, 8, 13…). On la retrouve dans la nature, comme dans la spirale d'une coquille d'escargot !",
  },
  methode: [
    { titre: "Je compare deux termes voisins", texte: "Je calcule l'écart : le 2e moins le 1er." },
    { titre: "Je vérifie partout", texte: "Le même écart doit marcher entre TOUS les termes voisins." },
    { titre: "J'applique la règle", texte: "Je fais l'opération sur le dernier terme pour trouver le suivant." },
  ],
  usages: [
    { titre: "Continuer", detail: "Trouver le terme d'après (2 ; 4 ; 6 ; 8 ; …)." },
    { titre: "Compléter", detail: "Trouver un terme qui manque au milieu (5 ; 10 ; ? ; 20)." },
    { titre: "Vérifier", detail: "Dire si une suite suit vraiment une règle donnée." },
  ],
  exemples: [
    {
      titre: "Continuer la suite",
      donnees: "On observe la suite 5 ; 10 ; 15 ; 20.",
      question: "Quel est le nombre suivant ?",
      schema: suite({
        titre: "Continuer la suite",
        terms: [5, 10, 15, 20, "?"],
        missingIndex: 4,
        arrows: ["+5", "+5", "+5", "+5"],
      }),
      solution: "On ajoute 5 à chaque fois. Donc 20 + 5 = 25. Le nombre suivant est 25.",
    },
    {
      titre: "Trouver la règle",
      donnees: "On observe la suite 4 ; 7 ; 10 ; 13.",
      question: "Quelle est la règle de cette suite ?",
      schema: suite({
        titre: "Trouver la règle",
        terms: [4, 7, 10, 13],
        arrows: ["+3", "+3", "+3"],
      }),
      solution: "7 − 4 = 3, 10 − 7 = 3, 13 − 10 = 3. La règle est « ajouter 3 ».",
    },
    {
      titre: "Croissante ou décroissante ?",
      donnees: "On observe la suite 20 ; 15 ; 10 ; 5.",
      question: "Cette suite est-elle croissante ou décroissante ?",
      schema: suite({
        titre: "Suite décroissante",
        terms: [20, 15, 10, 5],
        arrows: ["−5", "−5", "−5"],
      }),
      solution: "20 > 15 > 10 > 5 : les nombres diminuent partout. La suite est décroissante.",
    },
    {
      titre: "Le défi 974",
      donnees: "Sur un sentier, des balises sont placées à 5 m, 10 m, 15 m, 20 m.",
      question: "Où sera la balise suivante ?",
      schema: suite({
        titre: "Balises sur le sentier",
        terms: [5, 10, 15, 20, "?"],
        missingIndex: 4,
        arrows: ["+5", "+5", "+5", "+5"],
      }),
      solution: "Les balises sont espacées de 5 m. Donc 20 + 5 = 25. La balise suivante sera à 25 m.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Continue la suite : 30 ; 27 ; 24 ; 21 ; ?",
      correction: "On enlève 3 à chaque fois : 21 − 3 = 18. Le nombre suivant est 18.",
    },
    {
      question: "Complète la suite : 5 ; 10 ; ? ; 20 ; 25",
      correction: "La règle est « ajouter 5 ». Le nombre manquant est 10 + 5 = 15.",
    },
    {
      question: "Quelle est la règle de la suite 2 ; 4 ; 8 ; 16 ?",
      correction: "Ce n'est pas +2 ! 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16. La règle est « multiplier par 2 ».",
    },
    {
      question: "La suite 4 ; 8 ; 6 ; 10 est-elle croissante ?",
      correction: "Non : 4 → 8 monte, mais 8 → 6 descend. Elle n'est ni croissante ni décroissante.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesSuitesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Suites - CM2",
    section: {
      type: "objectif",
      phrase: "Trouver la règle d'une suite et la continuer",
      sousPhrase:
        "Une suite est une liste de nombres rangés selon une règle. On cherche l'écart entre deux termes voisins.",
      encadre: {
        titre: "L'idée",
        texte: "Trouve comment on passe d'un nombre au suivant : +, − ou ×.",
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
          "Les balises d'un sentier tous les 5 mètres, une réserve d'eau qui baisse, les pièces gagnées à chaque niveau d'un jeu.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La suite de Fibonacci (1, 1, 2, 3, 5, 8…) : chaque nombre est la somme des deux d'avant. On la retrouve dans la spirale d'une coquille d'escargot.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheSuitesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Trouver la règle",
    section: {
      type: "exemple",
      enonce: "On observe la suite 4 ; 7 ; 10 ; 13.",
      question: "Quelle est la règle ?",
      correction: "7 − 4 = 3, 10 − 7 = 3, 13 − 10 = 3. La règle est « ajouter 3 ».",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Attention au piège",
    section: {
      type: "exemple",
      enonce: "On observe la suite 2 ; 4 ; 8 ; 16.",
      question: "Est-ce qu'on ajoute 2 à chaque fois ?",
      correction: "Non ! 2 × 2 = 4, 4 × 2 = 8, 8 × 2 = 16. On multiplie par 2.",
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
      enonce: "Sur un sentier, des balises sont placées à 5 m, 10 m, 15 m, 20 m.",
      question: "Où sera la balise suivante ?",
      indice: "Cherche l'écart entre deux balises voisines.",
      correction: "Elles sont espacées de 5 m : 20 + 5 = 25. La balise suivante sera à 25 m.",
    },
  },
];
