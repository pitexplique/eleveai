// ─── Fiche de cours : les pourcentages (CM2) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/cm2/maths/pourcentages.bank.ts (notionId pourcentage).
// CM2 = texte brut, langage d'un enfant de ~10 ans. On MONTRE (grille de 100 du
// coach, camembert, roue) : un pourcentage, c'est une part sur 100.
//
// Micro-compétences couvertes (les 5 de la banque) :
// - pourcentage_comprendre       → figure (grille 50/100), propriété « sur 100 », exemple « 25 % » (grille), entraînement 1
// - pourcentage_fraction_decimal → propriété « fractions simples », figure barre 75 %, tableau équivalences, exemple, entraînement 2
// - pourcentage_calculer         → propriété « prendre une part », méthode, exemple « 50 % de 80 » et « 10 % de 70 », entraînement 3
// - pourcentage_probleme         → exemple « La chorale » (camembert 24 → 12), usages (réduction)
// - pourcentage_defi             → défi dessiné 974 (roue 25 % → panier 80 € − 25 % = 60 €), piège, entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

function grille(shaded: number) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fraction",
        model: "grid",
        grid: { rows: 10, cols: 10, shaded },
      }}
    />
  );
}

function barrePourcent(numerator: number, denominator: number, label: string) {
  return (
    <CanvasRenderer
      figure={{
        kind: "fraction",
        model: "bar",
        fraction: { numerator, denominator, label },
      }}
    />
  );
}

const camembertChorale = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      data: [
        { label: "chorale", value: 12 },
        { label: "autres", value: 12 },
      ],
      display: { showLabels: true, showValues: true, highlightIndex: 0 },
    }}
  />
);

const roue25 = (
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "roue",
      roue: {
        segments: [
          { label: "réduction 25 %", poids: 25, couleur: "#ef4444" },
          { label: "je paie 75 %", poids: 75, couleur: "#94a3b8" },
        ],
      },
    }}
  />
);

const tableauEquiv = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les pourcentages à connaître",
      headers: ["Pourcentage", "Fraction", "Décimal", "Astuce"],
      rows: [
        { label: "50 %", values: ["50 %", "1/2", "0,5", "÷ 2 (la moitié)"] },
        { label: "25 %", values: ["25 %", "1/4", "0,25", "÷ 4 (un quart)"] },
        { label: "75 %", values: ["75 %", "3/4", "0,75", "un quart × 3"] },
        { label: "10 %", values: ["10 %", "1/10", "0,1", "÷ 10 (un dixième)"] },
      ],
      caption: "Un pourcentage, c'est une part sur 100 : 50 % = 50/100 = 0,5.",
    }}
  />
);

const pieges = [
  "Croire que % veut dire « sur 10 » : c'est « sur 100 ». 30 % = 30/100, pas 30/10.",
  "Répondre « 25 » à « 25 % de 80 » : le résultat dépend de la quantité. 25 % de 80 = 20 (un quart de 80).",
  "Confondre la réduction et le nouveau prix : 25 € de réduction sur 40 €, c'est un prix final de 30 € (40 − 10), pas 25 €.",
];

const aRetenir = [
  "Un pourcentage, c'est une part sur 100 : 50 % = 50/100 = la moitié.",
  "50 % → ÷ 2 ; 25 % → ÷ 4 ; 10 % → ÷ 10.",
  "Pour une réduction, on calcule la part enlevée, puis on la soustrait du prix.",
];

export const fichePourcentagesCM2: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "cm2",
  notion: "pourcentage",
  titre: "Les pourcentages",
  accroche:
    "Un pourcentage, c'est une part sur 100. 50 %, c'est 50 cases coloriées sur 100 : la moitié. On en voit partout : les réductions, les résultats, les sondages.",
  identite: [
    { label: "Mots clés", valeur: "Pour cent, sur 100, part, moitié, quart" },
    { label: "Le secret", valeur: "% veut dire « sur 100 »" },
    { label: "Outil", valeur: "La grille de 100 cases" },
  ],
  definition: {
    texte:
      "« Pour cent » veut dire « sur 100 ». Un pourcentage indique combien de parts on prend quand on partage un tout en 100 parts égales. 50 % veut dire 50 sur 100.",
  },
  figure: {
    schema: grille(50),
    legende: "50 cases coloriées sur 100 : 50 % = 50/100 = la moitié.",
  },
  proprietes: [
    {
      titre: "Toujours sur 100",
      texte: "% veut dire « sur 100 ». 25 % = 25/100 ; 100 % = tout ; 0 % = rien.",
    },
    {
      titre: "Les fractions simples",
      texte: "50 % = 1/2 ; 25 % = 1/4 ; 75 % = 3/4 ; 10 % = 1/10.",
    },
    {
      titre: "Prendre une part",
      texte: "50 % d'un nombre, c'est le diviser par 2 ; 25 %, par 4 ; 10 %, par 10.",
    },
    {
      titre: "La forme décimale",
      texte: "50 % = 0,5 ; 25 % = 0,25 ; 10 % = 0,1 (on divise le pourcentage par 100).",
    },
    {
      titre: "Une réduction",
      texte: "On calcule la part enlevée, puis on la soustrait du prix de départ.",
    },
  ],
  reel: {
    texte:
      "À La Réunion, les pourcentages sont partout : « −50 % » sur une pancarte au marché de Saint-Pierre, la batterie du téléphone à 25 %, les résultats d'un vote de classe, le pourcentage d'élèves qui viennent à pied.",
  },
  historique: {
    texte:
      "Le mot vient de l'italien « per cento » : « pour cent ». Les marchands italiens, il y a plus de 500 ans, l'utilisaient déjà pour calculer les taxes et les intérêts. Le symbole % est un raccourci de « 100 ».",
  },
  methode: [
    { titre: "Je lis « sur 100 »", texte: "25 % = 25 sur 100 = 25/100." },
    { titre: "Je repère la fraction", texte: "50 % = moitié, 25 % = quart, 10 % = dixième." },
    { titre: "Je prends la part", texte: "50 % de 80 = 80 ÷ 2 = 40." },
  ],
  usages: [
    { titre: "Les soldes", detail: "« −50 % » : on enlève la moitié du prix." },
    { titre: "La batterie", detail: "Le téléphone à 25 %, c'est un quart de charge." },
    { titre: "Les résultats", detail: "« 50 % de la classe fait de la chorale » : la moitié des élèves." },
  ],
  exemples: [
    {
      titre: "Comprendre 25 %",
      donnees: "On colorie une grille de 100 cases.",
      question: "Combien de cases pour 25 % ?",
      schema: grille(25),
      solution:
        "25 %, c'est 25 sur 100 : on colorie 25 cases. C'est un quart de la grille.",
    },
    {
      titre: "Pourcentage et fraction",
      donnees: "On regarde 75 %.",
      question: "Quelle fraction simple correspond ?",
      schema: barrePourcent(3, 4, "75 % = 3/4"),
      solution:
        "75 % = 75/100 = 3/4. Sur une barre partagée en 4, on prend 3 parts.",
    },
    {
      titre: "Calculer 50 % et 10 %",
      donnees: "On veut 50 % de 80, puis 10 % de 70.",
      question: "Combien font-ils ?",
      schema: tableauEquiv,
      solution:
        "50 % de 80 = 80 ÷ 2 = 40. 10 % de 70 = 70 ÷ 10 = 7.",
    },
    {
      titre: "La chorale",
      donnees: "Dans une classe de 24 élèves, 50 % font de la chorale.",
      question: "Combien d'élèves ?",
      schema: camembertChorale,
      solution:
        "50 % = la moitié. La moitié de 24, c'est 24 ÷ 2 = 12. Donc 12 élèves.",
    },
    {
      titre: "Le défi 974",
      donnees: "Au marché de Saint-Pierre, un panier gourmand coûte 80 €, avec une réduction de 25 %.",
      question: "Quel est le prix final ?",
      schema: roue25,
      solution:
        "La réduction 25 % = 80 ÷ 4 = 20 €. Prix final : 80 − 20 = 60 €. (On paie les 75 % restants.)",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Une grille de 100 cases a 40 cases coloriées. Quel pourcentage ?",
      correction: "40 cases sur 100 = 40 %.",
    },
    {
      question: "Quelle fraction simple correspond à 50 % ?",
      correction: "50 % = 50/100 = 1/2 (la moitié).",
    },
    {
      question: "Calcule 25 % de 100.",
      correction: "25 % = un quart : 100 ÷ 4 = 25.",
    },
    {
      question: "Un sac coûte 20 €, réduction de 50 %. Quel est le nouveau prix ?",
      correction: "50 % de 20 € = 10 €. Nouveau prix : 20 − 10 = 10 €.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=cm2",
};

export const slidesPourcentagesCM2: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Pourcentages - CM2",
    section: {
      type: "objectif",
      phrase: "Comprendre et calculer un pourcentage",
      sousPhrase:
        "% veut dire « sur 100 ». 50 %, c'est 50 cases sur 100 : la moitié du tout.",
      encadre: {
        titre: "L'idée",
        texte: "Prendre un pourcentage, c'est prendre une part d'un tout partagé en 100.",
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
          "« −50 % » au marché de Saint-Pierre, la batterie du téléphone à 25 %, les résultats d'un vote.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Pour cent » vient de l'italien « per cento ». Le symbole % est un raccourci de 100.",
      },
    },
  },
  {
    titre: "Les pourcentages clés",
    badge: "À connaître",
    section: {
      type: "cartes",
      cartes: [
        { titre: "50 %", texte: "= 1/2 = 0,5. On divise par 2." },
        { titre: "25 %", texte: "= 1/4 = 0,25. On divise par 4." },
        { titre: "10 %", texte: "= 1/10 = 0,1. On divise par 10." },
      ],
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: fichePourcentagesCM2.methode.map((m) => ({ titre: m.titre, texte: m.texte })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La chorale",
    section: {
      type: "exemple",
      enonce: "Dans une classe de 24 élèves, 50 % font de la chorale.",
      question: "Combien d'élèves ?",
      correction: "50 % = la moitié : 24 ÷ 2 = 12 élèves.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Une réduction",
    section: {
      type: "exemple",
      enonce: "Un sac coûte 20 €, réduction de 50 %.",
      question: "Quel est le nouveau prix ?",
      correction: "50 % de 20 € = 10 €. Nouveau prix : 20 − 10 = 10 €.",
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
      enonce: "Au marché de Saint-Pierre, un panier coûte 80 € avec −25 %.",
      question: "Quel est le prix final ?",
      indice: "25 % = un quart. Calcule la réduction, puis soustrais.",
      correction: "25 % de 80 = 20 €. Prix final : 80 − 20 = 60 €.",
    },
  },
];
