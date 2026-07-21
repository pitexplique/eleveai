// ─── Fiche de cours : les longueurs (CM2) ───────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/longueurs.bank.ts (notionId longueur).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec des tableaux
// (gamme d'unités, objets de référence, conversions).
//
// Micro-compétences couvertes (les 4 de la banque) :
// - longueur_estimer  → propriété « Estimer », figure objets de référence, exemple « La bonne unité » (règle), entraînement 1
// - longueur_comparer → propriété « Comparer », exemple « Le plus long » (80 cm vs 1 m), piège, entraînement 2
// - longueur_convertir→ propriété « 1 m = 100 cm », figure conversion, exemple « En mètres » (2 km → 2000 m), entraînement 3
// - longueur_defi     → défi dessiné 974 (randonnée 3 km + 1500 m = 4500 m), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const gammeUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "La gamme des longueurs",
      headers: ["Kilomètre", "Mètre", "Centimètre", "Millimètre"],
      rows: [
        { label: "Symbole", values: ["km", "m", "cm", "mm"] },
        { label: "Exemple", values: ["un trajet", "une porte", "un crayon", "une fourmi"] },
      ],
      caption: "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.",
    }}
  />
);

const objetsReference = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Des longueurs à connaître",
      headers: ["Objet", "Longueur raisonnable"],
      rows: [
        { label: "Pièce", values: ["Une pièce (épaisseur)", "2 mm"] },
        { label: "Règle", values: ["Règle d'écolier", "30 cm"] },
        { label: "Piscine", values: ["Une piscine", "25 m"] },
        { label: "Trajet", values: ["Trajet entre deux villes", "25 km"] },
      ],
      caption: "Estimer, c'est choisir la bonne unité : un crayon en cm, un trajet en km.",
    }}
  />
);

const conversionKm = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Convertir 2 km en mètres",
      headers: ["km", "m"],
      rows: [
        { label: "1 km", values: ["1", "1000"] },
        { label: "2 km", values: ["2", "2000"] },
      ],
      highlight: { col: 1 },
      caption: "On multiplie par 1000 : 2 km = 2000 m.",
    }}
  />
);

const defiRando = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Défi 974 : la randonnée",
      headers: ["Moment", "En mètres"],
      rows: [
        { label: "Matin", values: ["Matin (3 km)", "3000"] },
        { label: "Après-midi", values: ["Après-midi (1500 m)", "1500"] },
        { label: "Total", values: ["Total", "4500"] },
      ],
      caption: "Même unité d'abord : 3 km = 3000 m. Puis 3000 + 1500 = 4500 m.",
    }}
  />
);

const pieges = [
  "Croire que 80 cm > 1 m parce que « 80 > 1 » : il faut la même unité. 1 m = 100 cm, donc 1 m est plus long.",
  "Se tromper d'unité : une règle d'écolier fait 30 cm, pas 30 m ni 30 mm.",
  "Additionner sans convertir : 2 km + 300 m, ce n'est pas 302 m. On passe tout en mètres : 2000 + 300.",
];

const aRetenir = [
  "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm.",
  "Pour comparer ou additionner, on met tout dans la même unité.",
  "Estimer, c'est choisir la bonne unité et un ordre de grandeur raisonnable.",
];

export const ficheLongueursCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "longueur",
  titre: "Les longueurs",
  accroche:
    "Une longueur, c'est une distance ou une taille. On la mesure en mètres (m), mais aussi en km, cm ou mm selon ce qu'on mesure. Le secret : 1 m = 100 cm et 1 km = 1000 m.",
  identite: [
    { label: "Mots clés", valeur: "Millimètre, centimètre, mètre, kilomètre" },
    { label: "Le secret", valeur: "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm" },
    { label: "Outil", valeur: "La règle, le mètre ruban et la gamme des unités" },
  ],
  definition: {
    texte:
      "La longueur mesure une distance ou une taille. L'unité principale est le mètre (m). Pour les petites longueurs, on utilise le centimètre (cm) ou le millimètre (mm). Pour les grandes distances, le kilomètre (km).",
  },
  figure: {
    schema: gammeUnites,
    legende: "Du kilomètre au millimètre : chaque unité aide à mesurer une taille différente.",
  },
  proprietes: [
    {
      titre: "Les conversions",
      texte: "1 km = 1000 m ; 1 m = 100 cm ; 1 cm = 10 mm.",
    },
    {
      titre: "Estimer",
      texte: "Choisir la bonne unité : une pièce en mm, une règle en cm, une piscine en m, un trajet en km.",
    },
    {
      titre: "Comparer",
      texte: "On met les deux longueurs dans la même unité, puis on compare les nombres.",
    },
    {
      titre: "Additionner",
      texte: "On convertit tout dans la même unité avant d'additionner (souvent en mètres).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on mesure des longueurs partout : les 2512 m du Piton des Neiges, un sentier de 3 km au volcan, la largeur d'un lagon, la taille d'une canne à sucre, le trajet de Saint-Pierre à Saint-Denis.",
  },
  historique: {
    texte:
      "Le mètre a été inventé pendant la Révolution française. Au départ, on a mesuré la Terre, du pôle Nord à l'équateur, et divisé cette distance en dix millions : ça a donné un mètre. Avant, on comptait en pieds et en pouces, différents partout !",
  },
  methode: [
    { titre: "Je choisis l'unité", texte: "Petites tailles en cm/mm, distances en m/km." },
    { titre: "Je convertis", texte: "km → m : × 1000 ; m → cm : × 100 ; cm → mm : × 10." },
    { titre: "Je compare à unité égale", texte: "Même unité pour les deux, puis je regarde les nombres." },
  ],
  usages: [
    { titre: "Mesurer", detail: "La taille d'un meuble, la longueur d'un terrain." },
    { titre: "Se déplacer", detail: "La distance d'une randonnée, d'un trajet en voiture." },
    { titre: "Bricoler", detail: "Découper une planche à la bonne longueur en cm." },
  ],
  exemples: [
    {
      titre: "La bonne unité",
      donnees: "On veut mesurer une règle d'écolier.",
      question: "30 cm, 30 m ou 30 mm ?",
      schema: objetsReference,
      solution:
        "Une règle tient dans la trousse : ni minuscule, ni un mur. 30 cm est la bonne longueur.",
    },
    {
      titre: "Le plus long",
      donnees: "On compare 80 cm et 1 m.",
      question: "Quelle longueur est la plus grande ?",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            title: "80 cm ou 1 m ?",
            headers: ["Longueur", "En cm"],
            rows: [
              { label: "80 cm", values: ["80 cm", "80 cm"] },
              { label: "1 m", values: ["1 m", "100 cm"] },
            ],
            highlight: { col: 1 },
            caption: "Même unité : 1 m = 100 cm. Or 100 > 80, donc 1 m est plus long.",
          }}
        />
      ),
      solution:
        "On convertit : 1 m = 100 cm. On compare 80 cm et 100 cm : 1 m est plus long.",
    },
    {
      titre: "En mètres",
      donnees: "Un trajet mesure 2 km.",
      question: "Quelle est sa longueur en mètres ?",
      schema: conversionKm,
      solution:
        "On multiplie par 1000 : 2 km = 2000 m.",
    },
    {
      titre: "Le défi 974",
      donnees: "Une randonnée fait 3 km le matin et 1500 m l'après-midi.",
      question: "Quelle est la distance totale en mètres ?",
      schema: defiRando,
      solution:
        "Même unité d'abord : 3 km = 3000 m. Puis 3000 + 1500 = 4500 m.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle unité pour une piscine : cm, m ou km ?",
      correction: "Le mètre : une piscine mesure environ 25 m.",
    },
    {
      question: "Compare 80 cm et 1 m.",
      correction: "1 m = 100 cm. Comme 100 > 80, c'est 1 m le plus long.",
    },
    {
      question: "Convertis 3 km en mètres.",
      correction: "1 km = 1000 m, donc 3 km = 3 × 1000 = 3000 m.",
    },
    {
      question: "Un parcours mesure 2 km puis 300 m. Distance totale en mètres ?",
      correction: "2 km = 2000 m, puis 2000 + 300 = 2300 m.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesLongueursCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Longueurs - CM2",
    section: {
      type: "objectif",
      phrase: "Estimer, comparer et convertir des longueurs",
      sousPhrase:
        "On mesure une distance ou une taille en mm, cm, m ou km selon ce qu'on mesure.",
      encadre: {
        titre: "L'idée",
        texte: "1 km = 1000 m, 1 m = 100 cm, 1 cm = 10 mm : les clés des conversions.",
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
          "Les 2512 m du Piton des Neiges, un sentier de 3 km au volcan, le trajet Saint-Pierre → Saint-Denis.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Le mètre vient de la mesure de la Terre : la distance du pôle à l'équateur divisée en dix millions.",
      },
    },
  },
  {
    titre: "La gamme des longueurs",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "mm et cm", texte: "Pour les petites tailles : une règle ≈ 30 cm." },
        { titre: "Le mètre (m)", texte: "L'unité principale : 1 m = 100 cm." },
        { titre: "Le kilomètre (km)", texte: "Pour les distances : 1 km = 1000 m." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheLongueursCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le plus long",
    section: {
      type: "exemple",
      enonce: "On compare 80 cm et 1 m.",
      question: "Quelle longueur est la plus grande ?",
      correction: "1 m = 100 cm. Comme 100 > 80, c'est 1 m le plus long.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Convertir",
    section: {
      type: "exemple",
      enonce: "Un trajet mesure 2 km.",
      question: "Quelle est sa longueur en mètres ?",
      correction: "On multiplie par 1000 : 2 km = 2000 m.",
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
      enonce: "Une randonnée fait 3 km le matin et 1500 m l'après-midi.",
      question: "Quelle est la distance totale en mètres ?",
      indice: "Mets tout en mètres d'abord (3 km = 3000 m).",
      correction: "3000 + 1500 = 4500 m.",
    },
  },
];
