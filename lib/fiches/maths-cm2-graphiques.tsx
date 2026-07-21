// ─── Fiche de cours : lire un graphique (CM2) ───────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/graphiques.bank.ts (notionId graphique).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec le canvas
// stat_graph du coach (barres, bâtons, camembert) — les mêmes graphiques que les exercices.
//
// Micro-compétences couvertes (les 4 de la banque) :
// - graphique_lire       → figure (barres activités), exemple « Lire une barre » (letchis = 18), entraînement 1
// - graphique_completer  → propriété « L'échelle », exemple « Lire la hauteur » (bâtons météo), entraînement 2
// - graphique_interpreter→ propriété « Comparer », exemple « Le plus choisi » (foot), différence, entraînement 3
// - graphique_defi       → défi dessiné 974 (cantine : le plat le plus choisi = cari), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const COL = {
  bleu: "#bfdbfe",
  vert: "#bbf7d0",
  jaune: "#fde68a",
  rose: "#fecdd3",
  violet: "#ddd6fe",
  orange: "#fed7aa",
};

const barresActivites = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      data: [
        { label: "Foot", value: 12, color: COL.bleu },
        { label: "Danse", value: 9, color: COL.rose },
        { label: "Nage", value: 7, color: COL.vert },
        { label: "Basket", value: 10, color: COL.jaune },
      ],
      display: { showLabels: true, showValues: true },
    }}
  />
);

const barresActivitesFoot = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      data: [
        { label: "Foot", value: 12, color: COL.bleu },
        { label: "Danse", value: 9, color: COL.rose },
        { label: "Nage", value: 7, color: COL.vert },
        { label: "Basket", value: 10, color: COL.jaune },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }}
  />
);

const barresFruits = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      data: [
        { label: "Ananas", value: 24, color: COL.jaune },
        { label: "Bananes", value: 28, color: COL.vert },
        { label: "Mangues", value: 15, color: COL.orange },
        { label: "Letchis", value: 18, color: COL.rose },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 3 },
    }}
  />
);

const batonsMeteo = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "batons",
      data: [
        { label: "Lun", value: 25, color: COL.bleu },
        { label: "Mar", value: 27, color: COL.vert },
        { label: "Mer", value: 26, color: COL.jaune },
        { label: "Jeu", value: 28, color: COL.orange },
      ],
      display: { showLabels: true, showValues: true },
    }}
  />
);

const camembertCantine = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      data: [
        { label: "Cari", value: 16, color: COL.orange },
        { label: "Rougail", value: 14, color: COL.rose },
        { label: "Salade", value: 8, color: COL.vert },
        { label: "Sandwich", value: 12, color: COL.bleu },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }}
  />
);

const pieges = [
  "Lire une barre sans regarder l'échelle : on suit le haut de la barre jusqu'à l'axe des valeurs.",
  "Confondre lire et interpréter : lire, c'est trouver une valeur ; interpréter, c'est comparer (le plus, le moins, l'écart).",
  "Oublier le titre et les légendes : ils disent ce que le graphique représente.",
];

const aRetenir = [
  "Chaque barre (ou bâton) a une hauteur : on la lit sur l'axe des valeurs.",
  "La plus haute barre = la plus grande quantité ; la plus courte = la plus petite.",
  "Un camembert montre des parts d'un tout : la plus grande part = le plus fréquent.",
];

export const ficheGraphiquesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "graphique",
  titre: "Lire un graphique",
  accroche:
    "Un graphique montre des données en images : des barres, des bâtons ou un camembert. Plus une barre est haute, plus la quantité est grande. On voit tout de suite le plus et le moins.",
  identite: [
    { label: "Mots clés", valeur: "Barre, bâton, camembert, axe, échelle, hauteur" },
    { label: "Le secret", valeur: "La hauteur d'une barre = la quantité" },
    { label: "Outil", valeur: "L'axe des valeurs (vertical) et les étiquettes" },
  ],
  definition: {
    texte:
      "Un graphique représente des données par des images. Dans un diagramme en barres, chaque barre a une hauteur qui indique une quantité. On lit cette hauteur sur l'axe vertical (l'axe des valeurs).",
  },
  figure: {
    schema: barresActivites,
    legende: "Chaque barre = une activité. La plus haute (Foot, 12) est la plus choisie.",
  },
  proprietes: [
    {
      titre: "Lire une barre",
      texte: "On suit le haut de la barre jusqu'à l'axe des valeurs pour lire sa hauteur.",
    },
    {
      titre: "L'échelle",
      texte: "L'axe vertical est gradué : chaque trait vaut un certain nombre. On compte les graduations.",
    },
    {
      titre: "Comparer",
      texte: "La barre la plus haute = le plus grand ; la plus courte = le plus petit.",
    },
    {
      titre: "Le camembert",
      texte: "Chaque part d'un camembert montre une portion d'un tout. La plus grande part = le plus fréquent.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, les graphiques racontent plein d'histoires : les fruits vendus au marché de Saint-Pierre, les plats choisis à la cantine (cari, rougail…), les températures de la semaine, les résultats d'un vote de classe.",
  },
  historique: {
    texte:
      "Les diagrammes en barres ont été inventés il y a environ 250 ans par William Playfair, pour montrer des chiffres d'un seul coup d'œil. Son idée géniale : un dessin se comprend plus vite qu'une longue liste de nombres.",
  },
  methode: [
    { titre: "Je lis le titre", texte: "Il dit ce que le graphique représente." },
    { titre: "Je lis la hauteur", texte: "Je suis le haut de la barre jusqu'à l'axe des valeurs." },
    { titre: "Je compare", texte: "La plus haute = le plus ; la plus courte = le moins." },
  ],
  usages: [
    { titre: "Voir d'un coup d'œil", detail: "Quel fruit se vend le mieux, quel plat plaît le plus." },
    { titre: "Suivre", detail: "Les températures de la semaine, une évolution." },
    { titre: "Décider", detail: "Choisir l'activité la plus demandée dans une classe." },
  ],
  exemples: [
    {
      titre: "Lire une barre",
      donnees: "On regarde le graphique des fruits vendus.",
      question: "Combien de letchis ont été vendus ?",
      schema: barresFruits,
      solution:
        "On suit le haut de la barre « Letchis » jusqu'à l'axe : elle atteint 18. Donc 18 letchis.",
    },
    {
      titre: "Lire la hauteur",
      donnees: "On regarde les températures de la semaine (en bâtons).",
      question: "Quel jour a-t-il fait le plus chaud ?",
      schema: batonsMeteo,
      solution:
        "Le bâton le plus haut est celui de jeudi (28). C'est le jour le plus chaud.",
    },
    {
      titre: "Le plus choisi",
      donnees: "On regarde les activités choisies par la classe.",
      question: "Quelle activité est la plus choisie, et de combien devance-t-elle la nage ?",
      schema: barresActivitesFoot,
      solution:
        "La barre la plus haute est le Foot (12). La nage est à 7. La différence est 12 − 7 = 5 élèves.",
    },
    {
      titre: "Le défi 974",
      donnees: "À la cantine, on a compté les plats choisis (en camembert).",
      question: "Quel plat a été le plus choisi ?",
      schema: camembertCantine,
      solution:
        "La plus grande part du camembert est le cari (16). C'est le plat le plus choisi.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Sur le graphique des fruits, combien d'ananas ont été vendus ?",
      correction: "On lit la hauteur de la barre « Ananas » : 24.",
    },
    {
      question: "Quel jour a-t-il fait le moins chaud dans la semaine ?",
      correction: "Le bâton le plus bas est lundi (25).",
    },
    {
      question: "Entre le Foot (12) et la Danse (9), quelle est la différence ?",
      correction: "12 − 9 = 3 élèves.",
    },
    {
      question: "À la cantine, quel plat a été le moins choisi ?",
      correction: "La plus petite part est la salade (8).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesGraphiquesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Graphiques - CM2",
    section: {
      type: "objectif",
      phrase: "Lire et interpréter un graphique",
      sousPhrase:
        "Barres, bâtons, camembert : un graphique montre des données en images. La hauteur d'une barre = une quantité.",
      encadre: {
        titre: "L'idée",
        texte: "La plus haute barre saute aux yeux : c'est le plus grand nombre.",
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
          "Les fruits vendus au marché de Saint-Pierre, les plats de la cantine (cari, rougail), les températures.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les diagrammes en barres ont été inventés il y a 250 ans par William Playfair, pour voir les chiffres d'un coup d'œil.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheGraphiquesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire une barre",
    section: {
      type: "exemple",
      enonce: "On regarde le graphique des fruits vendus.",
      question: "Combien de letchis ?",
      correction: "On suit le haut de la barre « Letchis » jusqu'à l'axe : 18.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Interpréter",
    section: {
      type: "exemple",
      enonce: "On regarde les activités choisies.",
      question: "Laquelle est la plus choisie ?",
      correction: "La barre la plus haute est le Foot (12).",
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
      enonce: "À la cantine, on a compté les plats choisis (camembert).",
      question: "Quel plat a été le plus choisi ?",
      indice: "Cherche la plus grande part.",
      correction: "La plus grande part est le cari (16).",
    },
  },
];
