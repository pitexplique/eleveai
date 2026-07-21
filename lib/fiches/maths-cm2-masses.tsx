// ─── Fiche de cours : les masses (CM2) ──────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/masses.bank.ts (notionId masse).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec des tableaux
// (gamme d'unités, objets de référence, conversions) — le sens de « lourd/léger ».
//
// Micro-compétences couvertes (les 4 de la banque) :
// - masse_estimer  → propriété « Estimer », figure objets de référence, exemple « La bonne masse » (pomme), entraînement 1
// - masse_comparer → propriété « Comparer », exemple « Le plus lourd » (1 kg vs 1200 g), piège, entraînement 2
// - masse_convertir→ propriété « 1 kg = 1000 g », figure conversion, exemple « En grammes » (1,5 kg → 1500 g), entraînement 3
// - masse_defi     → défi dessiné 974 (marché : mangue 350 g + ananas 1,2 kg = 1550 g), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const gammeUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "La gamme des masses",
      headers: ["Tonne", "Kilogramme", "Gramme", "Milligramme"],
      rows: [
        { label: "Symbole", values: ["t", "kg", "g", "mg"] },
        { label: "Exemple", values: ["une voiture", "un sac de riz", "un trombone", "un cil"] },
      ],
      caption: "1 t = 1000 kg et 1 kg = 1000 g. On multiplie ou divise par 1000 d'une unité à l'autre.",
    }}
  />
);

const objetsReference = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Des masses à connaître",
      headers: ["Objet", "Masse raisonnable"],
      rows: [
        { label: "Crayon", values: ["Crayon", "10 g"] },
        { label: "Pomme", values: ["Pomme", "150 g"] },
        { label: "Paquet de riz", values: ["Paquet de riz", "1 kg"] },
        { label: "Cartable rempli", values: ["Cartable rempli", "3 kg"] },
      ],
      caption: "Estimer, c'est choisir une masse plausible : un crayon en grammes, un cartable en kilos.",
    }}
  />
);

const conversionKg = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Convertir 1,5 kg en grammes",
      headers: ["kg", "g"],
      rows: [
        { label: "1 kg", values: ["1", "1000"] },
        { label: "0,5 kg", values: ["0,5", "500"] },
        { label: "1,5 kg", values: ["1,5", "1500"] },
      ],
      highlight: { col: 1 },
      caption: "On multiplie par 1000 : 1,5 kg = 1500 g.",
    }}
  />
);

const defiMarche = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Défi 974 : le panier du marché",
      headers: ["Fruit", "En grammes"],
      rows: [
        { label: "Mangue", values: ["Mangue (350 g)", "350"] },
        { label: "Ananas", values: ["Ananas (1,2 kg)", "1200"] },
        { label: "Total", values: ["Total", "1550"] },
      ],
      caption: "Même unité d'abord : 1,2 kg = 1200 g. Puis 1200 + 350 = 1550 g.",
    }}
  />
);

const pieges = [
  "Croire que 500 g > 1 kg parce que « 500 > 1 » : il faut la même unité. 1 kg = 1000 g, donc 1 kg est plus lourd.",
  "Estimer un cartable à 30 g : c'est la masse d'une règle ! Un cartable rempli, c'est environ 3 kg.",
  "Additionner sans convertir : 1,2 kg + 350 g, ce n'est pas « 1,2 + 350 ». On passe tout en grammes : 1200 + 350.",
];

const aRetenir = [
  "1 kg = 1000 g et 1 t = 1000 kg.",
  "Pour comparer ou additionner, on met tout dans la même unité.",
  "Estimer, c'est choisir un ordre de grandeur raisonnable (pas la valeur exacte).",
];

export const ficheMassesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "masse",
  titre: "Les masses",
  accroche:
    "La masse, c'est ce qui indique si un objet est lourd ou léger. On la mesure en grammes (g) et en kilogrammes (kg). Le secret : 1 kg, c'est 1000 g.",
  identite: [
    { label: "Mots clés", valeur: "Gramme, kilogramme, tonne, lourd, léger" },
    { label: "Le secret", valeur: "1 kg = 1000 g : on change d'unité en × ou ÷ 1000" },
    { label: "Outil", valeur: "La balance et la gamme des unités" },
  ],
  definition: {
    texte:
      "La masse mesure la quantité de matière d'un objet. On la pèse avec une balance. L'unité principale est le kilogramme (kg). Pour les petits objets, on utilise le gramme (g) ; pour les très lourds, la tonne (t).",
  },
  figure: {
    schema: gammeUnites,
    legende: "De la tonne au milligramme, chaque saut vaut × 1000 ou ÷ 1000.",
  },
  proprietes: [
    {
      titre: "1 kg = 1000 g",
      texte: "Des kg aux g : × 1000. Des g aux kg : ÷ 1000. La tonne : 1 t = 1000 kg.",
    },
    {
      titre: "Estimer",
      texte: "Choisir une masse raisonnable : un crayon ≈ 10 g, une pomme ≈ 150 g, un cartable ≈ 3 kg.",
    },
    {
      titre: "Comparer",
      texte: "On met les deux masses dans la même unité, puis on compare les nombres.",
    },
    {
      titre: "Additionner",
      texte: "On convertit tout dans la même unité avant d'additionner (souvent en grammes).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on pèse tout le temps : une mangue de 350 g au marché de Saint-Pierre, un ananas Victoria de 1,2 kg, un sac de riz de 1 kg, un régime de bananes de plusieurs kilos.",
  },
  historique: {
    texte:
      "Avant les kilos, chaque région avait ses mesures (la livre, l'once…). Le kilogramme a été inventé pendant la Révolution française pour que tout le monde pèse pareil. Longtemps, un vrai cylindre en métal servait de « kilo modèle ».",
  },
  methode: [
    { titre: "Je repère l'unité", texte: "Petits objets en g, gros objets en kg." },
    { titre: "Je convertis avec 1000", texte: "kg → g : × 1000 ; g → kg : ÷ 1000." },
    { titre: "Je compare à unité égale", texte: "Même unité pour les deux, puis je regarde les nombres." },
  ],
  usages: [
    { titre: "Faire les courses", detail: "Peser les fruits et légumes au marché." },
    { titre: "Cuisiner", detail: "250 g de farine, 125 g de sucre pour une recette." },
    { titre: "Voyager", detail: "Une valise ne doit pas dépasser un certain nombre de kilos." },
  ],
  exemples: [
    {
      titre: "La bonne masse",
      donnees: "On veut estimer la masse d'une pomme.",
      question: "150 g, 15 kg ou 1 g ?",
      schema: objetsReference,
      solution:
        "Une pomme tient dans la main : ni très lourde, ni une plume. 150 g est la masse raisonnable.",
    },
    {
      titre: "Le plus lourd",
      donnees: "On compare 1 kg et 1200 g.",
      question: "Quelle masse est la plus grande ?",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            title: "1 kg ou 1200 g ?",
            headers: ["Masse", "En grammes"],
            rows: [
              { label: "1 kg", values: ["1 kg", "1000 g"] },
              { label: "1200 g", values: ["1200 g", "1200 g"] },
            ],
            highlight: { col: 1 },
            caption: "Même unité : 1 kg = 1000 g. Or 1200 > 1000, donc 1200 g est plus lourd.",
          }}
        />
      ),
      solution:
        "On convertit : 1 kg = 1000 g. On compare 1000 g et 1200 g : 1200 g est plus lourd.",
    },
    {
      titre: "En grammes",
      donnees: "Une bouteille d'eau pèse 1,5 kg.",
      question: "Quelle est sa masse en grammes ?",
      schema: conversionKg,
      solution:
        "On multiplie par 1000 : 1,5 kg = 1500 g.",
    },
    {
      titre: "Le défi 974",
      donnees: "Au marché de Saint-Pierre, on achète une mangue de 350 g et un ananas de 1,2 kg.",
      question: "Quelle est la masse totale en grammes ?",
      schema: defiMarche,
      solution:
        "Même unité d'abord : 1,2 kg = 1200 g. Puis 1200 + 350 = 1550 g. Le panier pèse 1550 g.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle masse est raisonnable pour un cartable rempli : 3 g, 3 kg ou 300 kg ?",
      correction: "3 kg. 3 g, c'est une plume ; 300 kg, c'est plus qu'un adulte !",
    },
    {
      question: "Quelle masse est la plus grande : 1 kg ou 500 g ?",
      correction: "1 kg = 1000 g. Comme 1000 > 500, c'est 1 kg le plus lourd.",
    },
    {
      question: "Convertis 2 kg en grammes.",
      correction: "1 kg = 1000 g, donc 2 kg = 2 × 1000 = 2000 g.",
    },
    {
      question: "Un livre pèse 500 g et un cahier pèse 250 g. Quelle est la masse totale ?",
      correction: "500 + 250 = 750 g.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesMassesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Masses - CM2",
    section: {
      type: "objectif",
      phrase: "Estimer, comparer et convertir des masses",
      sousPhrase:
        "La masse dit si un objet est lourd ou léger. On change d'unité en multipliant ou divisant par 1000.",
      encadre: {
        titre: "L'idée",
        texte: "1 kg = 1000 g : c'est la clé de toutes les conversions de masse.",
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
          "Une mangue de 350 g au marché, un ananas Victoria de 1,2 kg, une valise à ne pas dépasser.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le kilogramme a été inventé à la Révolution française pour que tout le monde pèse pareil.",
      },
    },
  },
  {
    titre: "La gamme des masses",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le gramme (g)", texte: "Pour les petits objets : un crayon ≈ 10 g." },
        { titre: "Le kilogramme (kg)", texte: "L'unité principale : 1 kg = 1000 g." },
        { titre: "La tonne (t)", texte: "Pour le très lourd : 1 t = 1000 kg." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheMassesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le plus lourd",
    section: {
      type: "exemple",
      enonce: "On compare 1 kg et 1200 g.",
      question: "Quelle masse est la plus grande ?",
      correction: "1 kg = 1000 g. Comme 1200 > 1000, c'est 1200 g le plus lourd.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Convertir",
    section: {
      type: "exemple",
      enonce: "Une bouteille d'eau pèse 1,5 kg.",
      question: "Quelle est sa masse en grammes ?",
      correction: "On multiplie par 1000 : 1,5 kg = 1500 g.",
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
      enonce: "Au marché de Saint-Pierre : une mangue de 350 g et un ananas de 1,2 kg.",
      question: "Quelle est la masse totale en grammes ?",
      indice: "Mets tout en grammes d'abord (1,2 kg = 1200 g).",
      correction: "1200 + 350 = 1550 g.",
    },
  },
];
