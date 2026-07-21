// ─── Fiche de cours : les contenances (CM2) ─────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/contenance.bank.ts (notionId contenance).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE avec des tableaux
// (gamme d'unités, contenants de référence, conversions).
//
// Micro-compétences couvertes (les 4 de la banque) :
// - contenance_estimer  → propriété « Estimer », figure contenants de référence, exemple « La bonne contenance » (verre), entraînement 1
// - contenance_comparer → propriété « Comparer », exemple « Le plus grand » (1 L vs 500 mL), piège, entraînement 2
// - contenance_convertir→ propriété « 1 L = 1000 mL », figure conversion, exemple « En mL » (1,5 L → 1500 mL), entraînement 3
// - contenance_defi     → défi dessiné 974 (jus 1 L + sirop 750 mL = 1750 mL), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const gammeUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "La gamme des contenances",
      headers: ["Litre", "Centilitre", "Millilitre"],
      rows: [
        { label: "Symbole", values: ["L", "cL", "mL"] },
        { label: "Exemple", values: ["une bouteille", "un petit verre", "une cuillère"] },
      ],
      caption: "1 L = 100 cL = 1000 mL. On multiplie ou divise par 10, 100 ou 1000.",
    }}
  />
);

const contenantsReference = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Des contenances à connaître",
      headers: ["Contenant", "Contenance raisonnable"],
      rows: [
        { label: "Cuillère", values: ["Cuillère", "5 mL"] },
        { label: "Verre d'eau", values: ["Verre d'eau", "250 mL"] },
        { label: "Petite bouteille", values: ["Petite bouteille", "500 mL"] },
        { label: "Grande bouteille", values: ["Grande bouteille", "1,5 L"] },
        { label: "Seau", values: ["Seau", "10 L"] },
      ],
      caption: "Estimer, c'est choisir une contenance plausible : un verre en mL, un seau en litres.",
    }}
  />
);

const conversionL = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Convertir 1,5 L en millilitres",
      headers: ["L", "mL"],
      rows: [
        { label: "1 L", values: ["1", "1000"] },
        { label: "0,5 L", values: ["0,5", "500"] },
        { label: "1,5 L", values: ["1,5", "1500"] },
      ],
      highlight: { col: 1 },
      caption: "On multiplie par 1000 : 1,5 L = 1500 mL.",
    }}
  />
);

const defiJus = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Défi 974 : le goûter",
      headers: ["Boisson", "En millilitres"],
      rows: [
        { label: "Jus", values: ["Brique de jus (1 L)", "1000"] },
        { label: "Sirop", values: ["Bouteille de sirop (750 mL)", "750"] },
        { label: "Total", values: ["Total", "1750"] },
      ],
      caption: "Même unité d'abord : 1 L = 1000 mL. Puis 1000 + 750 = 1750 mL.",
    }}
  />
);

const pieges = [
  "Croire que 500 mL > 1 L parce que « 500 > 1 » : il faut la même unité. 1 L = 1000 mL, donc 1 L est plus grand.",
  "Estimer une tasse à 20 L : c'est un grand seau ! Une tasse, c'est environ 200 mL.",
  "Additionner sans convertir : 1 L + 750 mL, ce n'est pas « 1 + 750 ». On passe tout en mL : 1000 + 750.",
];

const aRetenir = [
  "1 L = 1000 mL et 1 L = 100 cL.",
  "Pour comparer ou additionner, on met tout dans la même unité.",
  "Estimer, c'est choisir un ordre de grandeur raisonnable (pas la valeur exacte).",
];

export const ficheContenancesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "contenance",
  titre: "Les contenances",
  accroche:
    "La contenance, c'est ce qu'un récipient peut contenir de liquide. On la mesure en litres (L) et en millilitres (mL). Le secret : 1 L, c'est 1000 mL.",
  identite: [
    { label: "Mots clés", valeur: "Litre, centilitre, millilitre, contenant" },
    { label: "Le secret", valeur: "1 L = 1000 mL : on change d'unité en × ou ÷ 1000" },
    { label: "Outil", valeur: "Le verre doseur et la gamme des unités" },
  ],
  definition: {
    texte:
      "La contenance mesure la quantité de liquide qu'un récipient peut contenir. L'unité principale est le litre (L). Pour les petites quantités, on utilise le millilitre (mL) ou le centilitre (cL).",
  },
  figure: {
    schema: gammeUnites,
    legende: "Du litre au millilitre : 1 L = 100 cL = 1000 mL.",
  },
  proprietes: [
    {
      titre: "1 L = 1000 mL",
      texte: "Des L aux mL : × 1000. Des mL aux L : ÷ 1000. Aussi : 1 L = 100 cL.",
    },
    {
      titre: "Estimer",
      texte: "Choisir une contenance raisonnable : un verre ≈ 250 mL, une bouteille ≈ 1,5 L, un seau ≈ 10 L.",
    },
    {
      titre: "Comparer",
      texte: "On met les deux contenances dans la même unité, puis on compare les nombres.",
    },
    {
      titre: "Additionner",
      texte: "On convertit tout dans la même unité avant d'additionner (souvent en mL).",
    },
  ],
  reel: {
    texte:
      "À La Réunion, on mesure des liquides tout le temps : une bouteille d'eau de 1,5 L pour la randonnée, un verre de jus de goyavier, une bouteille de sirop de 750 mL, un arrosoir pour les plantes du jardin créole.",
  },
  historique: {
    texte:
      "Le litre a été créé, comme le kilogramme, pendant la Révolution française. Au départ, un litre était défini comme le volume d'un cube de 10 cm de côté rempli d'eau. C'est resté : 1 L d'eau pèse à peu près 1 kg.",
  },
  methode: [
    { titre: "Je repère l'unité", texte: "Petites quantités en mL, grandes en L." },
    { titre: "Je convertis avec 1000", texte: "L → mL : × 1000 ; mL → L : ÷ 1000." },
    { titre: "Je compare à unité égale", texte: "Même unité pour les deux, puis je regarde les nombres." },
  ],
  usages: [
    { titre: "Boire", detail: "Une bouteille de 1,5 L pour la journée." },
    { titre: "Cuisiner", detail: "250 mL de lait, 500 mL de bouillon pour une recette." },
    { titre: "Jardiner", detail: "Remplir un arrosoir de plusieurs litres." },
  ],
  exemples: [
    {
      titre: "La bonne contenance",
      donnees: "On veut estimer la contenance d'un verre d'eau.",
      question: "250 mL, 25 L ou 2 mL ?",
      schema: contenantsReference,
      solution:
        "Un verre se boit d'une main : ni une goutte, ni un seau. 250 mL est la contenance raisonnable.",
    },
    {
      titre: "Le plus grand",
      donnees: "On compare 1 L et 500 mL.",
      question: "Quelle contenance est la plus grande ?",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            title: "1 L ou 500 mL ?",
            headers: ["Contenance", "En mL"],
            rows: [
              { label: "1 L", values: ["1 L", "1000 mL"] },
              { label: "500 mL", values: ["500 mL", "500 mL"] },
            ],
            highlight: { col: 1 },
            caption: "Même unité : 1 L = 1000 mL. Or 1000 > 500, donc 1 L est plus grand.",
          }}
        />
      ),
      solution:
        "On convertit : 1 L = 1000 mL. On compare 1000 mL et 500 mL : 1 L est plus grand.",
    },
    {
      titre: "En millilitres",
      donnees: "Une grande bouteille contient 1,5 L.",
      question: "Quelle est sa contenance en mL ?",
      schema: conversionL,
      solution:
        "On multiplie par 1000 : 1,5 L = 1500 mL.",
    },
    {
      titre: "Le défi 974",
      donnees: "Pour le goûter, on a une brique de jus de 1 L et une bouteille de sirop de 750 mL.",
      question: "Quelle est la contenance totale en mL ?",
      schema: defiJus,
      solution:
        "Même unité d'abord : 1 L = 1000 mL. Puis 1000 + 750 = 1750 mL.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Quelle contenance est raisonnable pour une tasse : 200 mL, 20 L ou 2 mL ?",
      correction: "200 mL. 2 mL, c'est une goutte ; 20 L, c'est un grand seau !",
    },
    {
      question: "Quelle contenance est la plus grande : 1500 mL ou 1 L ?",
      correction: "1 L = 1000 mL. Comme 1500 > 1000, c'est 1500 mL le plus grand.",
    },
    {
      question: "Convertis 2 L en millilitres.",
      correction: "1 L = 1000 mL, donc 2 L = 2 × 1000 = 2000 mL.",
    },
    {
      question: "On remplit 4 verres de 250 mL. Quelle quantité d'eau au total ?",
      correction: "4 × 250 = 1000 mL, soit 1 L.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesContenancesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Contenances - CM2",
    section: {
      type: "objectif",
      phrase: "Estimer, comparer et convertir des contenances",
      sousPhrase:
        "La contenance dit ce qu'un récipient peut contenir. On change d'unité en multipliant ou divisant par 1000.",
      encadre: {
        titre: "L'idée",
        texte: "1 L = 1000 mL : c'est la clé de toutes les conversions de contenance.",
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
          "Une bouteille de 1,5 L pour la randonnée, un verre de jus de goyavier, un arrosoir pour le jardin créole.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "1 litre, c'est le volume d'un cube de 10 cm de côté rempli d'eau. Et 1 L d'eau pèse à peu près 1 kg.",
      },
    },
  },
  {
    titre: "La gamme des contenances",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le millilitre (mL)", texte: "Pour les petites quantités : un verre ≈ 250 mL." },
        { titre: "Le litre (L)", texte: "L'unité principale : 1 L = 1000 mL." },
        { titre: "Le centilitre (cL)", texte: "Entre les deux : 1 L = 100 cL." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheContenancesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le plus grand",
    section: {
      type: "exemple",
      enonce: "On compare 1 L et 500 mL.",
      question: "Quelle contenance est la plus grande ?",
      correction: "1 L = 1000 mL. Comme 1000 > 500, c'est 1 L le plus grand.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Convertir",
    section: {
      type: "exemple",
      enonce: "Une grande bouteille contient 1,5 L.",
      question: "Quelle est sa contenance en mL ?",
      correction: "On multiplie par 1000 : 1,5 L = 1500 mL.",
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
      enonce: "Pour le goûter : une brique de jus de 1 L et une bouteille de sirop de 750 mL.",
      question: "Quelle est la contenance totale en mL ?",
      indice: "Mets tout en mL d'abord (1 L = 1000 mL).",
      correction: "1000 + 750 = 1750 mL.",
    },
  },
];
