// ─── Fiche de cours : la proportionnalité (5e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/proportionnalite.bank.ts (notionId prop_proportionnalite).
// Dessinée par le canvas « tableau_proportionnalite » du coach (le même tableau
// que dans les exercices).
//
// Micro-compétences couvertes :
// - prop_reconnaitre           → définition + figure (tableau ×3), exemple 1, propriété
// - prop_table                 → exemple 2 (3 cahiers 12 € → 9 cahiers), entraînement 1
// - prop_quatrieme             → exemple 2 (retour à l'unité), méthode
// - prop_coeff                 → propriété « Le coefficient », exemple (20 ÷ 4 = 5)
// - prop_rapport               → usages (ratio), entraînement 2
// - prop_pourcentage           → exemple 3 (30 % de 200 = 60), propriété
// - prop_coeff_multiplicateur  → exemple 4 (hausse 20 % → ×1,2), pièges
// - prop_probleme              → entraînement 3 (recette), usages
// - prop_defi                  → défi + entraînement 4 (prix +20 %)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le tableau de proportionnalité dessiné par le moteur du coach.
const tableau = (
  values: (number | string)[][],
  rowLabels: string[],
  highlight: [number, number][] = []
) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: values.length,
      cols: values[0].length,
      rowLabels,
      values: values.map((row) => row.map((v) => String(v))),
      missing: [],
      highlightedCells: highlight.map(([row, col]) => ({ row, col })),
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
    }}
  />
);

// Deux tableaux l'un SOUS l'autre (§ 2 ter : dans une carte, on empile) : pour
// « reconnaitre », il faut voir ce qui n'en est pas. Le canvas n'affiche aucun
// coefficient de lui-meme, on peut donc lui confier un tableau non
// proportionnel sans qu'il mente.
const duoTableaux = (
  haut: React.ReactNode,
  hautLabel: string,
  bas: React.ReactNode,
  basLabel: string
) => (
  <div className="space-y-2">
    <div>
      {haut}
      <p className="mt-1 text-center text-xs font-black text-emerald-700">{hautLabel}</p>
    </div>
    <div>
      {bas}
      <p className="mt-1 text-center text-xs font-black text-rose-700">{basLabel}</p>
    </div>
  </div>
);

// Un pourcentage PRELEVE sur un tout : les parts sont a l'echelle depuis le
// 20/08, donc 60 sur 200 se voit vraiment comme un petit tiers.
const part = (titre: string, total: string, pris: string, reste: string, question: string) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: titre,
      total,
      parts: [
        { label: "on prend", value: pris },
        { label: "le reste", value: reste },
      ],
      questionLabel: question,
      size: { width: 320, height: 175 },
    }}
  />
);

const pieges = [
  "Croire qu'ajouter le même nombre suffit : proportionnel = on MULTIPLIE par le même nombre.",
  "Oublier de revenir à l'unité (le prix de 1) avant de multiplier.",
  "Confondre hausse et coefficient : +20 % → ×1,2 (et non ×0,2 ni ×20).",
];

const aRetenir = [
  "Proportionnel = on multiplie toujours par le même nombre (le coefficient).",
  "Retour à l'unité : je calcule la valeur de 1, puis je multiplie.",
  "Un pourcentage est une proportionnalité : 30 % = ×0,3 ; +20 % = ×1,2.",
];

export const ficheProportionnalite5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Deux fois plus de cahiers, deux fois plus cher : c'est la proportionnalité. Un seul nombre, le coefficient, relie les deux grandeurs.",
  identite: [
    { label: "Mots clés", valeur: "Coefficient, tableau, unité, ratio, pourcentage" },
    { label: "Le secret", valeur: "On multiplie par le même nombre" },
    { label: "Outil", valeur: "Le tableau de proportionnalité" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en multipliant toujours par le même nombre, appelé coefficient de proportionnalité. Si on double une grandeur, l'autre double aussi.",
  },
  figure: {
    schema: tableau(
      [
        [3, 6, 9],
        [9, 18, 27],
      ],
      ["Cahiers", "Prix (€)"],
      [[0, 0], [1, 0]]
    ),
    legende: "De la 1re à la 3e colonne : ×3 pour les cahiers ET pour le prix. Coefficient : ×3 (le prix d'un cahier).",
  },
  // Un dessin sous chaque propriete (REGLES.md § 2 bis), et deux natures de
  // dessin : le TABLEAU quand on compare des colonnes entre elles, la BARRE
  // quand on prend une part d'un tout. Quatre tableaux d'affilee, ce serait
  // quatre fois la meme image.
  proprietes: [
    {
      titre: "On reconnaît",
      texte: "Chaque colonne s'obtient en multipliant par le même coefficient. Doubler l'un double l'autre.",
      // Reconnaitre, c'est distinguer : le contre-exemple est dans le dessin.
      schema: duoTableaux(
        tableau([[2, 4, 8], [6, 12, 24]], ["Sachets", "Bonbons"]),
        "×3 partout : proportionnel",
        tableau([[2, 4, 8], [6, 9, 14]], ["Âge", "Taille (dm)"]),
        "ni ×, ni + constant : non proportionnel"
      ),
    },
    {
      titre: "Le coefficient",
      texte: "C'est la valeur pour 1 : 4 stylos coûtent 20 €, donc le coefficient est 20 ÷ 4 = 5.",
      schema: tableau(
        [[1, 4, 8], [5, 20, 40]],
        ["Stylos", "Prix (€)"],
        [[0, 0], [1, 0]]
      ),
    },
    {
      titre: "Le pourcentage",
      texte: "Prendre p % = multiplier par p/100 : 30 % = ×0,3.",
      schema: part("30 % de 200 élèves", "200 élèves", "60", "140", "0,3 × 200 = 60"),
    },
    {
      titre: "Hausse ou baisse",
      texte: "+20 % → ×1,2 ; −15 % → ×0,85 (on part de 1).",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "schema_barre",
            title: "Un prix de 100 € augmenté de 20 %",
            total: "120 € après la hausse",
            parts: [
              { label: "prix de départ", value: "100" },
              { label: "la hausse", value: "20" },
            ],
            questionLabel: "100 × 1,2 = 120 — on ajoute, donc on part de 1.",
            size: { width: 320, height: 175 },
          }}
        />
      ),
    },
  ],
  reel: {
    texte:
      "La proportionnalité est partout : les prix au marché (2 € le kilo), les recettes (pour 4 puis pour 10 personnes), les échelles d'une carte, les vitesses, les soldes (−20 %), les mélanges (sirop et eau).",
  },
  historique: {
    texte:
      "La « règle de trois » (retrouver une 4ᵉ valeur à partir de trois) est enseignée depuis l'Antiquité, en Inde et en Chine il y a plus de 2000 ans. C'était l'outil de base des marchands avant les calculatrices.",
  },
  methode: [
    {
      titre: "Je reviens à l'unité",
      texte: "Je calcule la valeur de 1, puis je multiplie par la quantité voulue.",
      schema: tableau([[3, 1, 8], ["7,50", "2,50", 20]], ["Kilos", "Prix (€)"], [[0, 1], [1, 1]]),
    },
    {
      titre: "J'utilise le coefficient",
      texte: "Prix = quantité × coefficient (le prix d'un objet).",
      schema: tableau([[1, 5, 12], ["2,50", "12,50", 30]], ["Kilos", "Prix (€)"]),
    },
    {
      titre: "Je vérifie",
      texte: "Le rapport prix ÷ quantité doit être le même dans chaque colonne.",
      schema: tableau([[3, 8], ["7,50", 20]], ["Kilos", "Prix (€)"], [[1, 0], [1, 1]]),
    },
  ],
  usages: [
    {
      titre: "Prix et quantités",
      detail: "3 kg coûtent 7,50 € → 1 kg coûte 2,50 € → 8 kg coûtent 20 €.",
      schema: tableau([[3, 1, 8], ["7,50", "2,50", 20]], ["Kilos", "Prix (€)"]),
    },
    {
      titre: "Ratio / mélange",
      detail: "Sirop:eau = 1:4 → 3 doses de sirop → 12 doses d'eau.",
      schema: tableau([[1, 3, 5], [4, 12, 20]], ["Sirop", "Eau"]),
    },
    {
      titre: "Pourcentages",
      detail: "30 % des 200 élèves → 0,3 × 200 = 60 élèves.",
      schema: part("30 % de 200 élèves", "200 élèves", "60", "140", "0,3 × 200 = 60"),
    },
  ],
  exemples: [
    {
      titre: "Reconnaître",
      donnees: "3 cahiers coûtent 9 €, 6 cahiers coûtent 18 €.",
      question: "La situation est-elle proportionnelle ?",
      schema: tableau(
        [
          [3, 6],
          [9, 18],
        ],
        ["Cahiers", "Prix (€)"]
      ),
      solution:
        "De 3 à 6 cahiers : ×2. Le prix passe de 9 € à 18 € : ×2 aussi. Même coefficient → oui, c'est proportionnel.",
    },
    {
      titre: "Compléter (retour à l'unité)",
      donnees: "3 cahiers coûtent 12 €.",
      question: "Combien coûtent 9 cahiers ?",
      schema: tableau(
        [
          [3, 1, 9],
          [12, 4, "?"],
        ],
        ["Cahiers", "Prix (€)"],
        [[0, 1], [1, 1]]
      ),
      solution:
        "1 cahier coûte 12 ÷ 3 = 4 €. Donc 9 cahiers coûtent 9 × 4 = 36 €.",
    },
    {
      titre: "Un pourcentage",
      donnees: "Dans un collège de 200 élèves, 30 % viennent à vélo.",
      schema: part("30 % de 200 élèves", "200 élèves", "60", "140", "0,3 × 200 = 60 élèves à vélo"),
      question: "Combien d'élèves cela fait-il ?",
      solution:
        "30 % = ×0,3. Donc 0,3 × 200 = 60 élèves viennent à vélo.",
    },
    {
      titre: "Une hausse",
      donnees: "Un prix de 50 € augmente de 20 %.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "schema_barre",
            title: "50 € augmenté de 20 %",
            total: "60 € après la hausse",
            parts: [
              { label: "prix de départ", value: "50" },
              { label: "la hausse", value: "10" },
            ],
            questionLabel: "50 × 1,2 = 60",
            size: { width: 320, height: 175 },
          }}
        />
      ),
      question: "Quel est le nouveau prix ?",
      solution:
        "Une hausse de 20 % correspond au coefficient ×1,2. Donc 50 × 1,2 = 60 €.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "8 stylos coûtent 20 €. Combien coûtent 4 stylos ?",
      correction: "4 stylos, c'est la moitié de 8 : le prix est la moitié de 20 €, soit 10 €.",
    },
    {
      question: "Sirop:eau = 1:4. Avec 3 doses de sirop, combien de doses d'eau ?",
      correction: "Le ratio 1:4 est conservé : 3 doses de sirop → 3 × 4 = 12 doses d'eau.",
    },
    {
      question: "Pour 4 personnes, il faut 300 g de riz. Quelle quantité pour 10 personnes ?",
      correction: "Pour 1 personne : 300 ÷ 4 = 75 g. Pour 10 personnes : 75 × 10 = 750 g.",
    },
    {
      question: "Un sac coûte 60 €. Avec −20 %, quel est le nouveau prix ?",
      correction: "20 % de 60 € = 12 €. Nouveau prix : 60 − 12 = 48 € (ou 60 × 0,8 = 48 €).",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesProportionnalite5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Proportionnalité - 5e",
    section: {
      type: "objectif",
      phrase: "Reconnaître et calculer une proportionnalité",
      sousPhrase:
        "Deux grandeurs proportionnelles : on passe de l'une à l'autre en multipliant par le même coefficient.",
      encadre: {
        titre: "L'idée",
        texte: "Proportionnel = on multiplie (jamais on additionne) par le même nombre.",
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
          "Prix au marché, recettes (pour 4 puis pour 10), échelles de carte, vitesses, soldes (−20 %), mélanges.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "La « règle de trois » est enseignée depuis plus de 2000 ans, en Inde et en Chine. C'était l'outil des marchands.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProportionnalite5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "3 situations",
    badge: "Où on l'utilise",
    section: {
      type: "cartes",
      cartes: ficheProportionnalite5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Compléter un tableau",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "3 cahiers coûtent 12 €.",
      question: "Combien coûtent 9 cahiers ?",
      correction: "1 cahier coûte 12 ÷ 3 = 4 €. Donc 9 cahiers coûtent 9 × 4 = 36 €.",
    },
  },
  {
    titre: "Les pourcentages",
    badge: "Une proportionnalité",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Prendre 30 %",
        contenu: "30 % = ×0,3. Donc 30 % de 200 = 60.",
      },
      droite: {
        variante: "ok",
        titre: "Augmenter de 20 %",
        contenu: "+20 % = ×1,2. Donc 50 € → 60 €.",
      },
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
      enonce: "Pour 4 personnes, il faut 300 g de riz.",
      question: "Quelle quantité pour 10 personnes ?",
      indice: "Reviens d'abord à 1 personne.",
      correction: "1 personne : 300 ÷ 4 = 75 g. 10 personnes : 75 × 10 = 750 g.",
    },
  },
];
