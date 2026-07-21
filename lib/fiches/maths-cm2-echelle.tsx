// ─── Fiche de cours : les échelles (CM2) ────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/echelles.bank.ts (notionId echelle).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// echelle du coach (3 variantes : correspondance / distance_reelle / distance_plan).
//
// Micro-compétences couvertes (les 4 de la banque) :
// - echelle_comprendre     → definition, figure (1 cm → 10 m), exemple « 2 cm ? »
// - echelle_distance_reelle→ propriété « du plan vers la réalité » (×), exemple 4 cm → 200 m
// - echelle_distance_plan  → propriété « de la réalité vers le plan » (÷), exemple 500 m → 5 cm
// - echelle_defi           → défi dessiné 974 (carte de parc : aller-retour → 600 m)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

function correspondance(opts: { echelleLabel: string; planLabel: string; reelLabel: string; questionLabel?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "echelle",
        variant: "correspondance",
        title: "Comprendre l'échelle",
        echelleLabel: opts.echelleLabel,
        planLabel: opts.planLabel,
        reelLabel: opts.reelLabel,
        questionLabel: opts.questionLabel,
      }}
    />
  );
}

function versLaRealite(opts: { echelleLabel: string; planDistance: string; reelDistance?: string; questionLabel?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "echelle",
        variant: "distance_reelle",
        title: "Du plan vers la réalité",
        echelleLabel: opts.echelleLabel,
        planDistance: opts.planDistance,
        reelDistance: opts.reelDistance ?? "?",
        questionLabel: opts.questionLabel,
      }}
    />
  );
}

function versLePlan(opts: { echelleLabel: string; planDistance?: string; reelDistance: string; questionLabel?: string }) {
  return (
    <CanvasRenderer
      figure={{
        kind: "echelle",
        variant: "distance_plan",
        title: "De la réalité vers le plan",
        echelleLabel: opts.echelleLabel,
        planDistance: opts.planDistance ?? "?",
        reelDistance: opts.reelDistance,
        questionLabel: opts.questionLabel,
      }}
    />
  );
}

const pieges = [
  "Oublier ce que vaut 1 cm : on lit d'abord l'échelle (« 1 cm → 10 m ») avant tout calcul.",
  "Se tromper de sens : du plan vers la réalité on MULTIPLIE ; de la réalité vers le plan on DIVISE.",
  "Confondre aller et aller-retour : un aller-retour, c'est deux fois l'aller.",
];

const aRetenir = [
  "Une échelle relie une distance sur le plan à la distance réelle (ex. 1 cm → 10 m).",
  "Du plan vers la réalité : on multiplie. De la réalité vers le plan : on divise.",
  "On garde les mêmes unités et on n'oublie pas de convertir si besoin.",
];

export const ficheEchelleCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "echelle",
  titre: "Les échelles",
  accroche:
    "Une échelle sert à dessiner en petit ce qui est grand en vrai : sur un plan ou une carte, elle indique ce que représente 1 cm en réalité. Par exemple « 1 cm → 10 m » : chaque centimètre sur le plan vaut 10 mètres pour de vrai.",
  identite: [
    { label: "Mots clés", valeur: "Échelle, plan, carte, distance sur le plan, distance réelle" },
    { label: "Le secret", valeur: "Lire ce que vaut 1 cm avant de calculer" },
    { label: "Outil", valeur: "La règle, puis une multiplication (ou une division)" },
  ],
  definition: {
    texte:
      "Une échelle indique le lien entre une distance mesurée sur un plan (ou une carte) et la distance réelle. Elle se lit par exemple « 1 cm → 10 m » : 1 cm sur le plan représente 10 m dans la réalité. C'est une situation de proportionnalité.",
  },
  figure: {
    schema: correspondance({
      echelleLabel: "1 cm → 10 m",
      planLabel: "1 cm sur le plan",
      reelLabel: "10 m en vrai",
      questionLabel: "1 cm sur le plan = 10 m en réalité.",
    }),
    legende: "L'échelle « 1 cm → 10 m » : sur le plan (bleu) 1 cm ; dans la réalité (vert) 10 m.",
  },
  proprietes: [
    {
      titre: "Lire l'échelle",
      texte: "L'échelle dit ce que vaut 1 cm. Avec « 1 cm → 10 m », 2 cm valent 20 m, 3 cm valent 30 m…",
    },
    {
      titre: "Du plan vers la réalité",
      texte: "On MULTIPLIE. Avec « 1 cm → 50 m », un chemin de 4 cm sur le plan mesure 4 × 50 = 200 m.",
    },
    {
      titre: "De la réalité vers le plan",
      texte: "On DIVISE. Avec « 1 cm → 100 m », une distance réelle de 500 m se dessine en 500 ÷ 100 = 5 cm.",
    },
    {
      titre: "C'est de la proportionnalité",
      texte: "Deux fois plus long sur le plan = deux fois plus long en vrai. On peut faire un tableau.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on lit des échelles tout le temps : sur une carte de randonnée pour aller au volcan, sur le plan d'un quartier de Saint-Pierre, sur le plan de la classe affiché au tableau, ou sur l'écran d'une appli GPS quand on zoome.",
  },
  historique: {
    texte:
      "Depuis très longtemps, les explorateurs et les cartographes dessinent des cartes à l'échelle pour faire tenir un pays entier sur une feuille de papier. Sans échelle, impossible de savoir si un centimètre sur la carte représente un mètre… ou cent kilomètres !",
  },
  methode: [
    { titre: "Je lis l'échelle", texte: "Je repère ce que vaut 1 cm (ex. « 1 cm → 10 m »)." },
    { titre: "Plan → réalité : je multiplie", texte: "Je multiplie la mesure du plan par la valeur d'un cm." },
    { titre: "Réalité → plan : je divise", texte: "Je divise la distance réelle par la valeur d'un cm." },
  ],
  usages: [
    { titre: "Comprendre", detail: "Lire ce que représente 1 cm sur un plan." },
    { titre: "Plan → réalité", detail: "Trouver la distance réelle à partir du plan." },
    { titre: "Réalité → plan", detail: "Trouver la longueur à dessiner sur le plan." },
  ],
  exemples: [
    {
      titre: "Comprendre l'échelle",
      donnees: "Sur un plan, l'échelle est « 1 cm → 10 m ».",
      question: "Que représentent 2 cm sur le plan ?",
      schema: correspondance({
        echelleLabel: "1 cm → 10 m",
        planLabel: "1 cm sur le plan",
        reelLabel: "10 m en vrai",
        questionLabel: "Alors 2 cm représentent 2 × 10 = 20 m.",
      }),
      solution: "1 cm vaut 10 m, donc 2 cm valent 2 × 10 = 20 m.",
    },
    {
      titre: "Du plan vers la réalité",
      donnees: "Échelle « 1 cm → 50 m ». Un chemin mesure 4 cm sur le plan.",
      question: "Quelle est sa longueur réelle ?",
      schema: versLaRealite({
        echelleLabel: "1 cm → 50 m",
        planDistance: "4 cm",
        reelDistance: "?",
        questionLabel: "Combien de mètres en vrai ?",
      }),
      solution: "On multiplie : 4 × 50 = 200. Le chemin mesure 200 m en réalité.",
    },
    {
      titre: "De la réalité vers le plan",
      donnees: "Échelle « 1 cm → 100 m ». Une rue mesure 500 m en vrai.",
      question: "Quelle longueur la dessine-t-on sur le plan ?",
      schema: versLePlan({
        echelleLabel: "1 cm → 100 m",
        planDistance: "?",
        reelDistance: "500 m",
        questionLabel: "Combien de cm sur le plan ?",
      }),
      solution: "On divise : 500 ÷ 100 = 5. On dessine la rue en 5 cm sur le plan.",
    },
    {
      titre: "Le défi 974",
      donnees: "Sur une carte d'un parc, « 1 cm → 100 m ». Un chemin mesure 3 cm sur la carte.",
      question: "Quelle distance parcourt-on en faisant l'aller-retour ?",
      schema: versLaRealite({
        echelleLabel: "1 cm → 100 m",
        planDistance: "3 cm",
        reelDistance: "?",
        questionLabel: "Attention : aller-retour !",
      }),
      solution:
        "L'aller : 3 × 100 = 300 m. L'aller-retour, c'est deux fois : 300 × 2 = 600 m.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Sur un plan, l'échelle est « 1 cm → 10 m ». Que représentent 5 cm ?",
      correction: "5 × 10 = 50. Cela représente 50 m en réalité.",
    },
    {
      question: "Échelle « 1 cm → 20 m ». Un chemin fait 6 cm sur le plan. Longueur réelle ?",
      correction: "Du plan vers la réalité, on multiplie : 6 × 20 = 120 m.",
    },
    {
      question: "Échelle « 1 cm → 50 m ». Une allée fait 200 m en vrai. Combien de cm sur le plan ?",
      correction: "De la réalité vers le plan, on divise : 200 ÷ 50 = 4 cm.",
    },
    {
      question: "Échelle « 1 cm → 100 m ». Un chemin fait 4 cm. Quelle distance pour l'aller-retour ?",
      correction: "Aller : 4 × 100 = 400 m. Aller-retour : 400 × 2 = 800 m.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesEchelleCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Échelles - CM2",
    section: {
      type: "objectif",
      phrase: "Passer de la distance sur le plan à la distance réelle",
      sousPhrase:
        "Une échelle indique ce que vaut 1 cm sur le plan. Du plan vers la réalité, on multiplie.",
      encadre: {
        titre: "L'idée",
        texte: "Je lis « 1 cm → 10 m », puis je multiplie (plan → réel) ou je divise (réel → plan).",
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
          "Une carte de randonnée pour aller au volcan, le plan d'un quartier de Saint-Pierre, le plan de la classe, une appli GPS.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les cartographes dessinent des cartes à l'échelle pour faire tenir un pays entier sur une feuille de papier.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheEchelleCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Plan → réalité",
    section: {
      type: "exemple",
      enonce: "Échelle « 1 cm → 50 m ». Un chemin mesure 4 cm sur le plan.",
      question: "Longueur réelle ?",
      correction: "On multiplie : 4 × 50 = 200 m.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Réalité → plan",
    section: {
      type: "exemple",
      enonce: "Échelle « 1 cm → 100 m ». Une rue mesure 500 m en vrai.",
      question: "Longueur sur le plan ?",
      correction: "On divise : 500 ÷ 100 = 5 cm.",
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
      enonce: "Sur une carte d'un parc, « 1 cm → 100 m ». Un chemin mesure 3 cm.",
      question: "Quelle distance pour l'aller-retour ?",
      indice: "Calcule d'abord l'aller, puis double.",
      correction: "Aller : 3 × 100 = 300 m. Aller-retour : 300 × 2 = 600 m.",
    },
  },
];
