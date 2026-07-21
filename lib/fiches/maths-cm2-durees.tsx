// ─── Fiche de cours : les durées (CM2) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/durees.bank.ts (notionId duree).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// « duree » du coach (horloge, affichage digital, double horloge, frise du temps).
//
// Micro-compétences couvertes (les 5 de la banque) :
// - duree_lire     → figure (horloge 3 h), exemple « Le quart d'heure » (7 h 15), exemple « L'affichage » (14:30), entraînement 1
// - duree_convertir→ propriété « 60 minutes », figure équivalences, exemple « Convertir » (90 min → 1 h 30), entraînement 2
// - duree_calculer → propriété « Ajouter par étapes », exemple « L'heure de fin » (frise 17 h 40 → 19 h 30), entraînement 3
// - duree_probleme → exemple « Le bus 974 » (double horloge 7 h 10 → 7 h 25 = 15 min)
// - duree_defi     → défi dessiné 974 (frise randonnée 6 h 50 + 35 + 20 + 25 = 8 h 10), piège base 60, entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// La palette de montre du coach (mêmes couleurs que dans les exercices).
const MONTRE = {
  face: "#fefce8",
  bezel: "#0f172a",
  hourHand: "#2563eb",
  minuteHand: "#ef4444",
  accent: "#f59e0b",
  strap: "#38bdf8",
  text: "#0f172a",
} as const;

function horloge(hour: number, minute: number, label: string, title = "Quelle heure ?") {
  return (
    <CanvasRenderer
      figure={{
        kind: "duree",
        variant: "horloge",
        title,
        time: { hour, minute, label },
        colors: MONTRE,
      }}
    />
  );
}

const digital1430 = (
  <CanvasRenderer
    figure={{
      kind: "duree",
      variant: "digital",
      digital: { text: "14:30", label: "Affichage numérique" },
      colors: MONTRE,
    }}
  />
);

const doubleBus = (
  <CanvasRenderer
    figure={{
      kind: "duree",
      variant: "double_horloge",
      title: "Attente du bus",
      start: { hour: 7, minute: 10, label: "Maintenant" },
      end: { hour: 7, minute: 25, label: "Départ" },
      colors: MONTRE,
    }}
  />
);

const friseFilm = (
  <CanvasRenderer
    figure={{
      kind: "duree",
      variant: "frise",
      title: "Film : l'heure de fin",
      frise: {
        startLabel: "17 h 40",
        endLabel: "19 h 30",
        steps: [
          { label: "+ 1 h", minutes: 60, color: "#38bdf8" },
          { label: "+ 50 min", minutes: 50, color: "#f97316" },
        ],
      },
      colors: MONTRE,
    }}
  />
);

const friseRando = (
  <CanvasRenderer
    figure={{
      kind: "duree",
      variant: "frise",
      title: "Randonnée du matin",
      frise: {
        startLabel: "6 h 50",
        endLabel: "8 h 10",
        steps: [
          { label: "+ 35 min", minutes: 35, color: "#22c55e" },
          { label: "+ 20 min", minutes: 20, color: "#f59e0b" },
          { label: "+ 25 min", minutes: 25, color: "#38bdf8" },
        ],
      },
      colors: MONTRE,
    }}
  />
);

const tableauEquiv = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les repères de temps",
      headers: ["Durée", "En minutes"],
      rows: [
        { label: "1 heure", values: ["1 h", "60 min"] },
        { label: "1 demi-heure", values: ["½ h", "30 min"] },
        { label: "1 quart d'heure", values: ["¼ h", "15 min"] },
        { label: "1 minute", values: ["1 min", "60 s"] },
      ],
      caption: "1 h = 60 min et 1 min = 60 s. On compte par paquets de 60.",
    }}
  />
);

const pieges = [
  "Écrire 1 h 75 : dès qu'on atteint 60 minutes, on forme une heure. 75 min = 1 h 15, donc 1 h 75 = 2 h 15.",
  "Croire que 1 h 20 est plus long que 90 min : 1 h 20 = 80 min, et 80 < 90.",
  "Compter les durées comme des nombres normaux : le temps est en base 60, pas en base 100.",
];

const aRetenir = [
  "1 h = 60 minutes et 1 minute = 60 secondes.",
  "Pour une heure de fin, on ajoute par étapes : d'abord les heures, puis les minutes.",
  "On ne dépasse jamais 59 minutes : à 60, on écrit une heure de plus.",
];

export const ficheDureesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "duree",
  titre: "Les durées",
  accroche:
    "Une durée, c'est un temps qui passe : la longueur d'un cours, d'un film, d'un trajet. Le secret des durées : on compte par paquets de 60, pas de 100.",
  identite: [
    { label: "Mots clés", valeur: "Heure, minute, seconde, durée, base 60" },
    { label: "Le secret", valeur: "1 h = 60 min : le temps se compte par 60" },
    { label: "Outil", valeur: "L'horloge et la frise du temps" },
  ],
  definition: {
    texte:
      "Lire l'heure, c'est repérer la petite aiguille (les heures) et la grande aiguille (les minutes). Une durée est le temps écoulé entre un début et une fin. On la mesure en heures, minutes et secondes.",
  },
  figure: {
    schema: horloge(3, 0, "Il est 3 h", "Lire l'heure"),
    legende: "La grande aiguille sur 12 : 00 minute. La petite sur 3 : il est 3 h 00.",
  },
  proprietes: [
    {
      titre: "60 minutes dans une heure",
      texte: "1 h = 60 min. Pour aller des heures aux minutes, on multiplie par 60.",
    },
    {
      titre: "Le quart et la demie",
      texte: "¼ d'heure = 15 min ; ½ heure = 30 min ; ¾ d'heure = 45 min.",
    },
    {
      titre: "Calculer une durée",
      texte: "C'est l'écart entre deux horaires. On avance de l'heure de début vers l'heure de fin.",
    },
    {
      titre: "Ajouter par étapes",
      texte: "Pour une heure de fin, on ajoute d'abord les heures, puis les minutes.",
    },
    {
      titre: "La base 60",
      texte: "On ne dépasse jamais 59 min : 90 min = 1 h 30, pas « 1 h 90 ».",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on regarde l'heure sans arrêt : le bus de Saint-Pierre qui part à 7 h 25, la cuisson d'un gâteau, le temps de montée jusqu'au volcan, la durée d'une randonnée à Mafate.",
  },
  historique: {
    texte:
      "Pourquoi 60 et pas 100 ? Cette idée vient des Babyloniens, il y a plus de 4 000 ans : ils comptaient en base 60. On a gardé leur façon de faire pour les heures, les minutes… et les angles !",
  },
  methode: [
    { titre: "Je lis les deux aiguilles", texte: "Petite = heures, grande = minutes." },
    { titre: "Je compte par 60", texte: "60 min = 1 h ; je ne laisse jamais 60 min ou plus." },
    { titre: "J'avance par étapes", texte: "D'abord les heures entières, puis les minutes." },
  ],
  usages: [
    { titre: "Prendre le bus", detail: "Combien de minutes avant le départ : une soustraction d'horaires." },
    { titre: "Cuisiner", detail: "Un gâteau enfourné à 16 h 20 pour 45 min sort à 17 h 05." },
    { titre: "Planifier", detail: "La durée d'une randonnée, l'heure de retour à la maison." },
  ],
  exemples: [
    {
      titre: "Le quart d'heure",
      donnees: "La grande aiguille est sur le 3.",
      question: "Quelle heure est-il ?",
      schema: horloge(7, 15, "1 quart d'heure", "Quart d'heure"),
      solution:
        "La grande aiguille sur le 3, c'est 15 minutes (un quart d'heure). La petite est après 7 : il est 7 h 15.",
    },
    {
      titre: "L'affichage numérique",
      donnees: "Une montre affiche 14:30.",
      question: "Comment écrit-on cette heure ?",
      schema: digital1430,
      solution:
        "Avant les deux points : les heures (14). Après : les minutes (30). On écrit 14 h 30.",
    },
    {
      titre: "Convertir",
      donnees: "On a une durée de 90 minutes.",
      question: "Combien cela fait-il en heures et minutes ?",
      schema: tableauEquiv,
      solution:
        "On retire 60 min pour faire 1 heure complète. Il reste 30 min. Donc 90 min = 1 h 30.",
    },
    {
      titre: "L'heure de fin",
      donnees: "Un film commence à 17 h 40 et dure 1 h 50.",
      question: "À quelle heure se termine-t-il ?",
      schema: friseFilm,
      solution:
        "On ajoute par étapes : 17 h 40 + 1 h = 18 h 40, puis + 50 min = 19 h 30. Le film finit à 19 h 30.",
    },
    {
      titre: "Le bus de Saint-Pierre",
      donnees: "Il est 7 h 10. Le bus part à 7 h 25.",
      question: "Dans combien de minutes part-il ?",
      schema: doubleBus,
      solution:
        "On compte de 7 h 10 à 7 h 25 : 15 minutes. Le bus part dans 15 minutes.",
    },
    {
      titre: "Le défi 974",
      donnees: "À La Réunion, Léa part marcher à 6 h 50 : 35 min de marche, 20 min de pause, puis 25 min de marche.",
      question: "À quelle heure finit-elle ?",
      schema: friseRando,
      solution:
        "On additionne les durées : 35 + 20 + 25 = 80 min = 1 h 20. Puis 6 h 50 + 1 h 20 = 8 h 10. Léa finit à 8 h 10.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "La grande aiguille est sur le 6. Quelle est la partie « minutes » de l'heure ?",
      correction: "Le 6 correspond à 30 minutes (une demi-heure).",
    },
    {
      question: "Convertis 2 heures en minutes.",
      correction: "1 h = 60 min, donc 2 h = 2 × 60 = 120 min.",
    },
    {
      question: "Un entraînement commence à 9 h 35 et dure 1 h 20. À quelle heure finit-il ?",
      correction: "9 h 35 + 1 h = 10 h 35, puis + 20 min = 10 h 55.",
    },
    {
      question: "Quelle durée est la plus longue : 1 h 20 ou 90 min ?",
      correction: "1 h 20 = 80 min. Comme 80 < 90, c'est 90 min la plus longue.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesDureesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Durées - CM2",
    section: {
      type: "objectif",
      phrase: "Lire l'heure, convertir et calculer des durées",
      sousPhrase:
        "Le temps se compte par paquets de 60 : 60 minutes font une heure, 60 secondes font une minute.",
      encadre: {
        titre: "L'idée",
        texte: "On ne laisse jamais 60 minutes ou plus : à 60, on forme une heure.",
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
          "Le bus de Saint-Pierre à 7 h 25, la cuisson d'un gâteau, la durée d'une randonnée à Mafate.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Pourquoi 60 ? Cette idée vient des Babyloniens, il y a 4 000 ans : ils comptaient en base 60.",
      },
    },
  },
  {
    titre: "Les repères de temps",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "1 heure", texte: "= 60 minutes." },
        { titre: "Le quart et la demie", texte: "¼ h = 15 min ; ½ h = 30 min ; ¾ h = 45 min." },
        { titre: "1 minute", texte: "= 60 secondes." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDureesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "L'heure de fin",
    section: {
      type: "exemple",
      enonce: "Un film commence à 17 h 40 et dure 1 h 50.",
      question: "À quelle heure se termine-t-il ?",
      correction: "17 h 40 + 1 h = 18 h 40, puis + 50 min = 19 h 30.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Convertir",
    section: {
      type: "exemple",
      enonce: "On a une durée de 90 minutes.",
      question: "Combien cela fait-il en heures et minutes ?",
      correction: "90 min = 60 min + 30 min = 1 h 30.",
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
      enonce: "À La Réunion, Léa part marcher à 6 h 50 : 35 min, une pause de 20 min, puis 25 min.",
      question: "À quelle heure finit-elle ?",
      indice: "Additionne les durées, puis ajoute-les à 6 h 50.",
      correction: "35 + 20 + 25 = 80 min = 1 h 20. 6 h 50 + 1 h 20 = 8 h 10.",
    },
  },
];
