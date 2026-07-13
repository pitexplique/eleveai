// ─── Fiche de cours : les pourcentages (6e) ────────────────────────────────────
// Fiche DÉCOUVERTE (6e) alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/pourcentages.bank.ts
// (notionId pourcentage_nombre). La fiche 5e reprend ensuite les calculs
// généraux (réductions, augmentations).
// Refaite au standard « montrer, pas raconter » (retour Frédéric 13/07) : le
// pourcentage MONTRÉ sur une grille de 100 carreaux (canvas fraction du coach)
// plutôt que raconté. Propriétés = une ligne chacune.
//
// Micro-compétences couvertes :
// - pourcentage_comprendre    → definition, figure (grille 25 %), propriété « sur 100 »,
//                               usages 1, entraînement 1
// - pourcentage_lire          → methode « Lire », exemple « Lire » (60 bonbons), entraînement 3
// - pourcentage_fraction      → propriété « Trois écritures », exemple « Trois écritures »
//                               (grille 75 %), usages 2, entraînement 2
// - pourcentage_decimal       → propriété « Trois écritures » (0,25), exemple, entraînement 2
// - pourcentage_calcul_simple → propriété « Les repères » + formule, exemple « Calculer »
//                               (bar 50 %), usages 3, entraînement 4
// - pourcentage_defi          → repères moitié/quart/dixième (aRetenir), entraînement 4 + slide

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// La grille de 100 carreaux du coach (10 × 10) : « p carreaux coloriés sur 100 »
// montre directement p %.
function grillePourcent(shaded: number) {
  return (
    <CanvasRenderer
      figure={{ kind: "fraction", model: "grid", grid: { rows: 10, cols: 10, shaded } }}
    />
  );
}

const barreMoitie = (
  <CanvasRenderer
    figure={{ kind: "fraction", model: "bar", fraction: { numerator: 1, denominator: 2, label: "50 % = la moitié" } }}
  />
);

const pieges = [
  "Croire que % veut dire « sur 10 » : % veut toujours dire « sur 100 ».",
  "Écrire 5 % = 0,5 : c'est faux, 5 % = 5/100 = 0,05.",
  "Oublier qu'un pourcentage est toujours une part « de quelque chose ».",
];

const aRetenir = [
  "p % veut dire « p sur 100 » : c'est la fraction p/100.",
  "Trois écritures d'un même nombre : 25 % = 25/100 = 0,25.",
  "Les repères : 50 % = la moitié, 25 % = le quart, 10 % = le dixième.",
];

export const fichePourcentages6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "pourcentage-nombre",
  titre: "Les pourcentages",
  accroche:
    "Le symbole % veut dire « sur 100 ». Dire 25 %, c'est dire 25 sur 100. On découvre ce que ça signifie, comment l'écrire en fraction et en décimal, et comment calculer des pourcentages simples.",
  identite: [
    { label: "Mots clés", valeur: "Pour cent, sur 100, proportion" },
    { label: "Le secret", valeur: "p % = p sur 100 = p/100" },
    { label: "Repères", valeur: "50 % = moitié, 25 % = quart, 10 % = dixième" },
  ],
  definition: {
    texte:
      "Un pourcentage est une proportion exprimée sur 100. Écrire p %, c'est écrire « p sur 100 », la fraction p/100. Ainsi 25 % veut dire 25 sur 100 : sur 100 carreaux, on en colorie 25.",
  },
  figure: {
    schema: grillePourcent(25),
    legende: "25 carreaux coloriés sur 100 : 25 % = 25/100.",
  },
  proprietes: [
    {
      titre: "% veut dire sur 100",
      texte: "p % = p sur 100 = la fraction p/100. Ainsi 25 % = 25/100.",
    },
    {
      titre: "Trois écritures",
      texte: "Un même nombre s'écrit de 3 façons : 25 % = 25/100 = 0,25.",
    },
    {
      titre: "Les repères",
      texte: "50 % = la moitié, 25 % = le quart, 10 % = le dixième.",
    },
  ],
  reel: {
    texte:
      "Les pourcentages sont partout : la batterie du téléphone (80 %), les soldes (−50 % = la moitié en moins), les sondages, les étiquettes des aliments, la barre de téléchargement d'un jeu.",
  },
  historique: {
    texte:
      "« Pourcentage » vient du latin « per centum » : « pour cent ». Les marchands italiens du XVᵉ siècle l'utilisaient déjà ; le symbole % est né vers le XVIIᵉ siècle.",
  },
  formule: {
    contexte: "Calculer un pourcentage simple d'un nombre",
    expression: "p % de N = N × p ÷ 100",
    legende: "10 % de 60 = 60 × 10 ÷ 100 = 6. Plus rapide avec le repère : 10 %, c'est le dixième.",
  },
  methode: [
    { titre: "Je lis", texte: "Je traduis % par « sur 100 » : 20 % = 20 sur 100." },
    { titre: "Je traduis", texte: "En fraction sur 100, et en décimal : 25 % = 25/100 = 0,25." },
    { titre: "Je calcule", texte: "Un repère (moitié, quart, dixième), sinon × p ÷ 100." },
  ],
  usages: [
    { titre: "Comprendre", detail: "« sur 100 » : 75 % veut dire 75 sur 100." },
    { titre: "Fraction et décimal", detail: "p % = p/100, puis ÷ 100 : 10 % = 10/100 = 0,1." },
    { titre: "Calcul simple", detail: "Par un repère : 25 % de 20, c'est le quart, donc 5." },
  ],
  exemples: [
    {
      titre: "Trois écritures",
      donnees: "On s'intéresse à 75 %.",
      question: "Écris 75 % en fraction, puis en décimal.",
      schema: grillePourcent(75),
      solution: "75 % = 75 sur 100 = 75/100. La fraction se simplifie : 75/100 = 3/4. Et en décimal : 0,75.",
    },
    {
      titre: "Lire une situation",
      donnees: "Sur 100 bonbons, 60 % sont rouges.",
      question: "Combien de bonbons rouges ?",
      schema: grillePourcent(60),
      solution: "60 % veut dire 60 sur 100. Comme il y a 100 bonbons, il y en a 60 rouges.",
    },
    {
      titre: "Calculer avec un repère",
      donnees: "On veut 50 % de 18.",
      question: "Combien font 50 % de 18 ?",
      schema: barreMoitie,
      solution: "50 %, c'est la moitié. La moitié de 18, c'est 18 ÷ 2 = 9. Donc 50 % de 18 = 9.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Que signifie 40 % ?",
      correction: "% veut dire « sur 100 ». Donc 40 % = 40 sur 100 : sur un groupe de 100, cela fait 40.",
    },
    {
      question: "Écris 25 % en fraction puis en décimal. Que remarques-tu ?",
      correction: "25 % = 25/100 = 0,25. Et 25/100 se simplifie en 1/4 : 25 %, c'est le quart.",
    },
    {
      question: "Dans une collection de 100 cartes, 8 % sont brillantes. Combien y en a-t-il ?",
      correction: "8 % = 8 sur 100. La collection compte 100 cartes, donc il y a 8 cartes brillantes.",
    },
    {
      question: "Calcule 10 % de 60, puis 50 % de 18.",
      correction: "10 %, c'est le dixième : 60 ÷ 10 = 6. 50 %, c'est la moitié : 18 ÷ 2 = 9.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesPourcentages6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pourcentages - 6e",
    section: {
      type: "objectif",
      phrase: "Comprendre ce que veut dire %",
      sousPhrase: "Un pourcentage exprime une proportion sur 100 : dire 25 %, c'est dire 25 sur 100.",
      encadre: { titre: "L'idée", texte: "Le symbole % veut dire « sur 100 ». Toujours." },
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
        contenu: "La batterie du téléphone (80 %), les soldes (−50 %), les sondages, les étiquettes des aliments.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "« Pourcentage » vient du latin « per centum » : « pour cent ». Les marchands italiens l'utilisaient déjà au XVe siècle.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePourcentages6e.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Trois écritures",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "25 % = 25/100 = 0,25",
      sousPhrase: "Un même nombre a trois écritures : pourcentage, fraction sur 100, décimal.",
      encadre: { titre: "Les repères", texte: "50 % = la moitié, 25 % = le quart, 10 % = le dixième." },
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: fichePourcentages6e.usages.map((u) => ({ titre: u.titre, texte: u.detail })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Trois écritures",
    section: {
      type: "exemple",
      enonce: "On s'intéresse à 75 %.",
      question: "Écris 75 % en fraction, puis en décimal.",
      correction: "75 % = 75/100 = 3/4 = 0,75.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Calculer avec un repère",
    section: {
      type: "exemple",
      enonce: "On veut 50 % de 18.",
      question: "Combien font 50 % de 18 ?",
      correction: "50 %, c'est la moitié : 18 ÷ 2 = 9.",
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
      enonce: "Un jeu coûte 60 €. On veut 10 % de 60.",
      question: "Calcule 10 % de 60.",
      indice: "10 %, c'est le dixième.",
      correction: "10 % de 60 = 60 ÷ 10 = 6.",
    },
  },
];
