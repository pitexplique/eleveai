// ─── Fiche de cours : les statistiques (5e) ────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/5e/maths/statistiques.bank.ts (notionId stat_statistique).
// Dessinée par le canvas « stat_graph » du coach (diagramme en barres/bâtons).
//
// Micro-compétences couvertes :
// - stat_donnee_organiser        → définition, propriété « L'effectif », exemple 1 (compter)
// - stat_lire_tableau            → exemple 1 (foot/basket/natation), entraînement 1
// - stat_lire_graphique          → figure + exemple 2 (barre la plus haute)
// - stat_effectif_frequence      → propriété « La fréquence », exemple 3 (10/25 = 40 %), entraînement 2
// - stat_representer             → usages, méthode
// - stat_representation_choisir  → propriété « Le bon graphique » (camembert / barres)
// - stat_moyenne                 → exemple 4 (moyenne 10,12,14 = 12), entraînement 3
// - stat_defi                    → défi dessiné (déchets 974) + pièges

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Un diagramme dessiné par le moteur du coach (le même que dans les exercices).
const graphe = (
  graphType: "barres" | "batons" | "camembert",
  data: { label: string; value: number }[],
  highlightIndex?: number
) => (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType,
      data,
      display: { showLabels: true, showValues: true, highlightIndex },
      size: { width: 320, height: 220 },
    }}
  />
);

const sportData = [
  { label: "Foot", value: 12 },
  { label: "Basket", value: 8 },
  { label: "Natation", value: 5 },
  { label: "Dessin", value: 7 },
];

const dechetsData = [
  { label: "Plastique", value: 12 },
  { label: "Verre", value: 8 },
  { label: "Papier", value: 10 },
];

// Le TABLEAU brut, avant tout dessin : un effectif se compte dans un tableau,
// il se compare dans un graphique. Deux moments, deux canvas.
const tableauEffectifs = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Le sport préféré de la classe",
      headers: ["Sport", "Effectif"],
      rows: [
        { label: "Foot", values: ["12"] },
        { label: "Basket", values: ["8"] },
        { label: "Natation", values: ["5"] },
        { label: "Dessin", values: ["7"] },
        { label: "Total", values: ["32"] },
      ],
      highlight: { row: 4 },
      display: { striped: true },
    }}
  />
);

// Une frequence, c'est une PART d'un total : elle se prend, elle ne se compare
// pas. Les parts du schema en barres sont a l'echelle depuis le 20/08.
const frequence = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "10 élèves sur 25",
      total: "25 élèves",
      parts: [
        { label: "viennent à vélo", value: "10" },
        { label: "les autres", value: "15" },
      ],
      questionLabel: "10 ÷ 25 = 0,4, soit 40 %",
      size: { width: 320, height: 175 },
    }}
  />
);

// Deux graphiques pour les MEMES donnees, l'un sous l'autre (§ 2 ter) : c'est
// la seule facon de montrer qu'on ne choisit pas au hasard.
const duo = (haut: React.ReactNode, hautLabel: string, bas: React.ReactNode, basLabel: string) => (
  <div className="space-y-2">
    <div>
      {haut}
      <p className="mt-1 text-center text-xs font-black text-slate-700">{hautLabel}</p>
    </div>
    <div>
      {bas}
      <p className="mt-1 text-center text-xs font-black text-slate-700">{basLabel}</p>
    </div>
  </div>
);

const pieges = [
  "Confondre la somme et la moyenne : 10 + 12 + 14 = 36, mais la moyenne est 36 ÷ 3 = 12.",
  "Oublier de diviser par le nombre de valeurs quand on calcule une moyenne.",
  "Croire qu'une fréquence peut dépasser 1 : c'est une part du total, donc entre 0 et 1.",
];

const aRetenir = [
  "Effectif = combien de fois une valeur apparaît. Total = somme des effectifs.",
  "Fréquence = effectif ÷ total (entre 0 et 1) ; ×100 pour un pourcentage.",
  "Moyenne = somme des valeurs ÷ nombre de valeurs.",
];

export const ficheStatistiques5e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "5e",
  notion: "stat-statistique",
  titre: "Les statistiques",
  accroche:
    "Ranger, compter, résumer : les statistiques transforment une longue liste de données en un tableau, un graphique et quelques nombres clés.",
  identite: [
    { label: "Mots clés", valeur: "Effectif, total, fréquence, moyenne, diagramme" },
    { label: "Le secret", valeur: "On compte, puis on résume" },
    { label: "Outil", valeur: "Le tableau et le diagramme en barres" },
  ],
  definition: {
    texte:
      "Les statistiques servent à organiser et résumer une série de données. On compte l'effectif de chaque catégorie (le nombre de fois qu'elle apparaît), on présente le tout dans un tableau ou un graphique, puis on calcule des indicateurs comme la fréquence ou la moyenne.",
  },
  figure: {
    schema: graphe("barres", sportData, 0),
    legende: "Diagramme en barres : la hauteur d'une barre est l'effectif. La plus haute (Foot) est la catégorie la plus fréquente.",
  },
  // Un dessin sous chaque propriete (REGLES.md § 2 bis), et QUATRE canvas
  // differents : le tableau ou l'effectif se compte, la barre ou la frequence se
  // preleve, les batons ou la moyenne s'equilibre, et le duo barres/camembert
  // pour la propriete qui parle justement de CHOISIR un graphique.
  proprietes: [
    {
      titre: "L'effectif",
      texte: "C'est le nombre de fois qu'une valeur apparaît. Le total est la somme des effectifs.",
      schema: tableauEffectifs,
    },
    {
      titre: "La fréquence",
      texte: "Effectif ÷ total : un nombre entre 0 et 1 (×100 pour un pourcentage).",
      schema: frequence,
    },
    {
      titre: "La moyenne",
      texte: "Somme des valeurs ÷ nombre de valeurs.",
      schema: graphe(
        "batons",
        [
          { label: "Note 1", value: 10 },
          { label: "Note 2", value: 12 },
          { label: "Note 3", value: 14 },
        ],
        1
      ),
    },
    {
      titre: "Le bon graphique",
      texte: "Barres/bâtons pour comparer des catégories ; camembert pour une répartition d'un total.",
      schema: duo(
        graphe("barres", sportData, 0),
        "barres : comparer des catégories",
        graphe("camembert", sportData),
        "camembert : répartir un total"
      ),
    },
  ],
  reel: {
    texte:
      "On croise les statistiques partout : les sondages, la météo (moyenne des températures), le sport (moyenne de points), le tri des déchets d'une classe, les résultats d'une enquête au collège.",
  },
  historique: {
    texte:
      "Le mot « statistique » vient de « État » : au départ, il s'agissait de compter la population et les richesses d'un pays. Les premiers grands recensements datent de l'Antiquité (Égypte, Chine, Rome).",
  },
  // Les trois temps du travail statistique : compter, representer, resumer —
  // et chacun a son dessin, dans cet ordre.
  methode: [
    { titre: "Je compte", texte: "Je relève l'effectif de chaque catégorie et je fais le total.", schema: tableauEffectifs },
    { titre: "Je représente", texte: "Tableau, puis diagramme en barres pour comparer d'un coup d'œil.", schema: graphe("barres", sportData) },
    { titre: "Je résume", texte: "Je calcule l'indicateur demandé : fréquence ou moyenne.", schema: frequence },
  ],
  usages: [
    {
      titre: "Comparer des catégories",
      detail: "Diagramme en barres : la barre la plus haute a le plus grand effectif.",
      schema: graphe("barres", dechetsData, 0),
    },
    {
      titre: "Voir une répartition",
      detail: "Diagramme circulaire (camembert) : des parts d'un même total.",
      schema: graphe("camembert", dechetsData),
    },
    {
      titre: "Résumer par un nombre",
      detail: "La moyenne donne une valeur « centrale » de la série.",
      schema: graphe(
        "batons",
        [
          { label: "Lun", value: 8 },
          { label: "Mar", value: 12 },
          { label: "Mer", value: 10 },
        ],
        1
      ),
    },
  ],
  exemples: [
    {
      titre: "Lire un tableau",
      donnees: "Enquête : Foot 8, Basket 6, Natation 4.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            title: "L'enquête",
            headers: ["Sport", "Effectif"],
            rows: [
              { label: "Foot", values: ["8"] },
              { label: "Basket", values: ["6"] },
              { label: "Natation", values: ["4"] },
              { label: "Total", values: ["18"] },
            ],
            highlight: { row: 3 },
            display: { striped: true },
          }}
        />
      ),
      question: "Quel est l'effectif du basket ? Et l'effectif total ?",
      solution:
        "L'effectif du basket se lit directement : 6. Le total est 8 + 6 + 4 = 18 élèves.",
    },
    {
      titre: "Lire un graphique",
      donnees: "Le diagramme en barres des activités.",
      question: "Quelle activité est la plus choisie ?",
      schema: graphe("barres", sportData, 0),
      solution:
        "La barre la plus haute est celle du Foot (12). C'est l'activité la plus choisie.",
    },
    {
      titre: "Calculer une fréquence",
      donnees: "Dans une classe de 25 élèves, 10 viennent à vélo.",
      schema: frequence,
      question: "Quelle est la fréquence des élèves à vélo ?",
      solution:
        "Fréquence = effectif ÷ total = 10 ÷ 25 = 0,4, soit 40 %.",
    },
    {
      titre: "Calculer une moyenne",
      donnees: "Les notes 10 ; 12 ; 14.",
      schema: graphe(
        "batons",
        [
          { label: "Note 1", value: 10 },
          { label: "Note 2", value: 12 },
          { label: "Note 3", value: 14 },
        ],
        1
      ),
      question: "Quelle est la moyenne ?",
      solution:
        "Moyenne = (10 + 12 + 14) ÷ 3 = 36 ÷ 3 = 12.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Enquête : sport 8, musique 6, dessin 4. Quel est l'effectif total ?",
      correction: "On additionne les effectifs : 8 + 6 + 4 = 18.",
    },
    {
      question: "Sur 20 élèves, 5 préfèrent les maths. Quelle est la fréquence ?",
      correction: "Fréquence = 5 ÷ 20 = 0,25 (soit 25 %).",
    },
    {
      question: "Quelle est la moyenne de 8 ; 10 ; 12 ; 14 ?",
      correction: "8 + 10 + 12 + 14 = 44, puis 44 ÷ 4 = 11.",
    },
    {
      question: "À La Réunion, une classe ramasse : plastique 12, verre 8, papier 10. Effectif total ?",
      correction: "12 + 8 + 10 = 30 déchets ramassés en tout.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=5e",
};

export const slidesStatistiques5e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Statistiques - 5e",
    section: {
      type: "objectif",
      phrase: "Organiser, représenter et résumer des données",
      sousPhrase:
        "On compte les effectifs, on trace un diagramme, puis on résume par une fréquence ou une moyenne.",
      encadre: {
        titre: "L'idée",
        texte: "Une longue liste devient un tableau, un graphique et quelques nombres clés.",
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
          "Sondages, météo (moyennes), sport (points par match), tri des déchets, enquêtes au collège.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Statistique » vient de « État » : compter la population et les richesses d'un pays. Les recensements datent de l'Antiquité.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheStatistiques5e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Quel graphique ?",
    badge: "3 usages",
    section: {
      type: "cartes",
      cartes: ficheStatistiques5e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Calculer une moyenne",
    badge: "Exemple guidé",
    section: {
      type: "exemple",
      enonce: "Les notes 10 ; 12 ; 14.",
      question: "Quelle est la moyenne ?",
      correction: "(10 + 12 + 14) ÷ 3 = 36 ÷ 3 = 12.",
    },
  },
  {
    titre: "Effectif & fréquence",
    badge: "Deux indicateurs",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'effectif",
        contenu: "Le nombre de fois qu'une valeur apparaît. Total = somme des effectifs.",
      },
      droite: {
        variante: "ok",
        titre: "La fréquence",
        contenu: "Effectif ÷ total : 10 ÷ 25 = 0,4 = 40 %.",
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
      enonce: "À La Réunion, une classe ramasse : plastique 12, verre 8, papier 10.",
      question: "Quel est l'effectif total de déchets ramassés ?",
      indice: "Additionne les trois effectifs.",
      correction: "12 + 8 + 10 = 30 déchets.",
    },
  },
];
