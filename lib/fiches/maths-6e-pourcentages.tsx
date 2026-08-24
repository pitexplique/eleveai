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

// ─── Les six dessins des blocs ────────────────────────────────────────────────
// ⭐ LA GRILLE DE 100 CARREAUX EST LE DESSIN DE CETTE NOTION — et c'est le
// problème : elle sert déjà trois fois (figure, exemples 1 et 2). Une quatrième
// pour la propriété « % veut dire sur 100 », une cinquième pour la méthode
// « Je lis », et l'élève aurait six fois la même image (REGLES.md § 2 bis).
// Elle ne revient donc qu'une fois, là où LIRE est justement le geste ; les cinq
// autres blocs passent à la barre, au tableau, à la droite graduée et au tableau
// de proportionnalité — parce qu'un pourcentage est aussi tout cela.

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

const pile = (items: { dessin: React.ReactNode; nom: string }[]) => (
  <div className="grid grid-cols-1 gap-2">
    {items.map((it) => (
      <div key={it.nom}>
        {it.dessin}
        <p className="mt-1 text-center text-xs font-black text-slate-700">{it.nom}</p>
      </div>
    ))}
  </div>
);

// « SUR 100 » EST UNE PART D'UN TOUT, ET UN TOUT SE COUPE. La grille montre des
// carreaux comptés un à un ; la barre montre la MÊME chose comme une longueur —
// 25 d'un côté, 75 de l'autre, et le tout fait 100.
const barreSurCent = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "25 % de 100",
      total: "100",
      parts: [
        { label: "25 %", value: "25", color: "#2563eb" },
        { label: "le reste", value: "75", color: "#94a3b8" },
      ],
      questionLabel: "25 % = 25 sur 100",
      // ⚠️ Largeur sous 245 et hauteur à 190 (§ 2 quater).
      size: { width: 240, height: 190 },
    }}
  />
);

// TROIS ÉCRITURES, TROIS COLONNES. Aucune figure ne peut montrer qu'un même
// nombre s'écrit de trois façons : c'est une affaire d'écriture, donc de lignes
// et de colonnes.
const lesTroisEcritures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le même nombre, 3 façons",
      headers: ["En %", "En fraction", "En décimal"],
      rows: [
        { values: ["25 %", "25/100", "0,25"] },
        { values: ["50 %", "50/100", "0,5"] },
        { values: ["10 %", "10/100", "0,1"] },
      ],
      highlight: { row: 0 },
    }}
  />
);

// LES TROIS REPÈRES, EMPILÉS ET À LA MÊME ÉCHELLE. Un quart n'a de sens que
// CONTRE une moitié : les trois barres se comparent d'un coup d'œil, ce qu'une
// grille de 100 carreaux ne permet pas.
const lesReperes = pile([
  {
    dessin: (
      <CanvasRenderer
        figure={{
          kind: "fraction",
          model: "bar",
          fraction: { numerator: 1, denominator: 2, label: "50 %" },
          size: { width: 240, height: 150 },
        }}
      />
    ),
    nom: "50 % : la moitié",
  },
  {
    dessin: (
      <CanvasRenderer
        figure={{
          kind: "fraction",
          model: "bar",
          fraction: { numerator: 1, denominator: 4, label: "25 %" },
          size: { width: 240, height: 150 },
        }}
      />
    ),
    nom: "25 % : le quart",
  },
  {
    dessin: (
      <CanvasRenderer
        figure={{
          kind: "fraction",
          model: "bar",
          fraction: { numerator: 1, denominator: 10, label: "10 %" },
          size: { width: 240, height: 150 },
        }}
      />
    ),
    nom: "10 % : le dixième",
  },
]);

// LIRE, C'EST COMPTER LES CARREAUX. La grille revient ici, et seulement ici :
// c'est le seul bloc dont le geste est justement de lire « p sur 100 ».
const grilleDeLecture = legende(grillePourcent(20), "20 carreaux coloriés sur 100 : 20 %");

// TRADUIRE, C'EST CHANGER D'AXE. Le pourcentage se compte sur 100 ; le décimal
// se lit entre 0 et 1. Le même nombre, posé sur la droite des décimaux.
const surLaDroiteDesDecimaux = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 1,
      step: 0.25,
      points: [{ value: 0.25, label: "0,25", color: "#2563eb" }],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: true,
      },
      size: { width: 240, height: 95 },
    }}
  />,
  "25 % tombe à 0,25 sur la droite des décimaux"
);

// ⭐ UN POURCENTAGE EST UNE PROPORTIONNALITÉ. « × p ÷ 100 » n'est pas une recette
// à retenir : c'est le passage d'une ligne à l'autre d'un tableau. Le dessin dit
// pourquoi la règle marche, au lieu de la répéter.
const calculerParProportion = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 2,
      rowLabels: ["le tout", "20 % de ça"],
      values: [
        ["100", "60"],
        ["20", "12"],
      ],
      missing: [],
      highlightedCells: [{ row: 1, col: 1 }],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
      size: { width: 240, height: 150 },
    }}
  />,
  "20 % de 60 : 60 × 20 ÷ 100 = 12"
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
      schema: barreSurCent,
    },
    {
      titre: "Trois écritures",
      texte: "Un même nombre s'écrit de 3 façons : 25 % = 25/100 = 0,25.",
      schema: lesTroisEcritures,
    },
    {
      titre: "Les repères",
      texte: "50 % = la moitié, 25 % = le quart, 10 % = le dixième.",
      schema: lesReperes,
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
    { titre: "Je lis", texte: "Je traduis % par « sur 100 » : 20 % = 20 sur 100." , schema: grilleDeLecture },
    { titre: "Je traduis", texte: "En fraction sur 100, et en décimal : 25 % = 25/100 = 0,25." , schema: surLaDroiteDesDecimaux },
    { titre: "Je calcule", texte: "Un repère (moitié, quart, dixième), sinon × p ÷ 100." , schema: calculerParProportion },
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
