// ─── Fiche de cours : lire et interpréter des données (6e) ─────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/donnees.bank.ts, notionId stat_donnee).
// Réécrite le 30/09/2026 au standard des fiches de 6e (étalon :
// `maths-6e-stat-enquete.tsx`) : phrases courtes, un dessin par bloc, Ti Margo.
//
// Micro-compétences 6/6 — mapping micro → blocs :
//   stat_donnee_lire_graphique  → propriété 2, méthode 1, entraînement 2
//   stat_donnee_lire_circulaire → figure, propriété 3, usage 2, entraînement 3
//   stat_donnee_prelever        → propriété 1, méthode 2, exemple 1, entraînement 1
//   stat_donnee_comparer        → propriété 4, méthode 3, exemple 2
//   stat_donnee_interpreter     → méthode 3, usage 3, entraînement 5
//   stat_donnee_defi            → usage 1, exemple 3, entraînement 4
// ⚠️ `stat_donnee_lire_tableau` appartient désormais à la notion `stat_enquete`
// (voir microSkills.ts) : c'est la fiche `maths-6e-stat-enquete.tsx` qui le porte.
//
// ⭐ TOUS LES NOMBRES VIENNENT DE LA BANQUE : Filles × Natation 6 (et Garçons 7),
// Le Tampon × Bus 12, loisirs 16 / 9 / 12, football 12 / natation 8 / danse 10,
// sondage 8 + 12 + 5 = 25, « Comédie » la moitié de 20, marché (mangues 12 et 9,
// letchis 7 et 10), 36 élèves dont 12 au football, 30 élèves dont 12 au football.
// ⛔ La feuille d'exercices `lib/fiches-exercices/maths-6e-stat-donnee.tsx`
// (hérissons, arbres du parc, CDI, déchets, hand, compteur de vélos…) : aucun
// exemple commun avec elle.
//
// ⭐ CETTE FICHE PARLE DE TROIS REPRÉSENTATIONS : chaque dessin dit une chose que
// les autres ne disent pas (REGLES.md § 2 bis) — la structure du tableau, le
// titre qui donne le sens, le plus haut bâton, le bâton qu'on CHERCHE, le
// demi-disque, l'écart devenu une longueur, deux barres presque égales, le total
// mis bout à bout, et la classe qui n'est pas le collège.
//
// ⚠️ LES `size` SONT MESURÉES, PAS ESTIMÉES. `StatGraphCanvas` et
// `SchemaBarreCanvas` écrivent en 12 px dans un viewBox fixe : le bloc d'un
// dessin ne fait que 226 px sur un téléphone de 375, il faut donc rester sous
// ~245 de large pour garder 11 px.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : un diagramme circulaire, des parts d'un total (20 élèves).
const camembertAnimaux = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      title: "Animal préféré (20 élèves)",
      data: [
        { label: "Chien", value: 10 },
        { label: "Chat", value: 6 },
        { label: "Oiseau", value: 4 },
      ],
      display: { showValues: true, showLabels: true },
      size: { width: 240, height: 200 },
    }}
  />
);

// LA STRUCTURE DU TABLEAU. La valeur au croisement d'une ligne et d'une
// colonne. Les communes sont celles de la banque du coach.
const tableauTransports = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Bus", "Voiture"],
      rows: [
        { label: "Le Tampon", values: [12, 8] },
        { label: "Saint-Pierre", values: [9, 14] },
      ],
      highlight: { cell: { row: 0, col: 0 } },
      questionLabel: "Ligne « Le Tampon », colonne « Bus » : 12",
    }}
  />
);

// LE PLUS HAUT SE VOIT SANS COMPTER.
const batonsFruits = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "batons",
      title: "Fruits vendus le matin",
      data: [
        { label: "Pomme", value: 7 },
        { label: "Banane", value: 15 },
        { label: "Kiwi", value: 4 },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 1 },
      size: { width: 230, height: 190 },
    }}
  />
);

// LA MOITIÉ DU DISQUE : 10 sur 20, le secteur occupe la moitié du tour.
const camembertMoitie = legende(
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      title: "Trajet du matin (20 élèves)",
      data: [
        { label: "Bus", value: 10 },
        { label: "À pied", value: 5 },
        { label: "Voiture", value: 5 },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 0 },
      size: { width: 210, height: 190 },
    }}
  />,
  "Le bus prend la moitié du disque : 10 élèves sur 20."
);

// L'ÉCART EST UNE LONGUEUR. Les 8 de la natation et les 4 qui manquent font les
// 12 du football (banque : « combien de plus au football qu'à la natation ? »).
const ecartEnBarre = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Au-delà de ~28 caractères, le titre déborde du cadre, en silence.
      title: "Football 12, natation 8",
      total: "12",
      parts: [
        { label: "natation", value: "8" },
        { label: "l'écart", value: "4" },
      ],
      questionLabel: "12 − 8 = 4 : voilà l'écart",
      size: { width: 240, height: 190 },
    }}
  />
);

// LE TITRE FAIT LE SENS. Sans lui, « 24 » ne veut rien dire.
const tableauTemperatures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Températures de la semaine (°C)",
      headers: ["Lun", "Mar", "Mer", "Jeu"],
      rows: [{ label: "Midi", values: [24, 27, 22, 26] }],
      highlight: { row: 0 },
      questionLabel: "Sans le titre : 24 quoi ?",
    }}
  />
);

// ⭐ CE N'EST PAS LE PLUS HAUT QU'ON CHERCHE : c'est le bâton de SA catégorie.
const batonKiwiCherche = legende(
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "batons",
      title: "Fruits vendus le matin",
      data: [
        { label: "Pomme", value: 7 },
        { label: "Banane", value: 15 },
        { label: "Kiwi", value: 4 },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 2 },
      size: { width: 230, height: 190 },
    }}
  />,
  "On cherche le kiwi : on lit SON bâton."
);

// DEUX BARRES QUE L'ŒIL NE DÉPARTAGE PAS : ce sont les nombres qui tranchent.
const barresPresqueEgales = legende(
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Buts marqués",
      data: [
        { label: "Équipe A", value: 12 },
        { label: "Équipe B", value: 11 },
      ],
      display: { showValues: true, showLabels: true },
      size: { width: 230, height: 190 },
    }}
  />,
  "À l'œil, elles se valent. 12 et 11 tranchent."
);

// LE TOTAL, BOUT À BOUT : les trois catégories du sondage refont les 25.
const barreTotal = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Comment viens-tu ?",
      total: "25",
      parts: [
        { label: "à pied", value: "8", color: "#bbf7d0" },
        { label: "bus", value: "12", color: "#fde68a" },
        { label: "voiture", value: "5", color: "#bfdbfe" },
      ],
      questionLabel: "8 + 12 + 5 = 25 élèves",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 240, height: 190 },
    }}
  />
);

// LA MOITIÉ, SANS AUTRE NOMBRE : la banque ne donne que « Comédie = la moitié
// de 20 ». Le reste du disque n'a pas de détail, et c'est voulu.
const camembertComedie = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      title: "Film préféré (20 personnes)",
      data: [
        { label: "Comédie", value: 10 },
        { label: "Autres", value: 10 },
      ],
      display: { showValues: false, showLabels: true, highlightIndex: 0 },
      size: { width: 210, height: 190 },
    }}
  />
);

// LA CLASSE N'EST PAS LE COLLÈGE. On n'a interrogé qu'un morceau du tout.
const barreClasseCollege = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Le collège",
      total: "tous",
      parts: [
        { label: "ma classe", value: "", color: "#fde68a" },
        { label: "les autres", value: "", color: "#e2e8f0" },
      ],
      questionLabel: "on n'a interrogé que ma classe",
      display: { showTotal: true, showPartLabels: true, showValues: false, showQuestion: true },
      size: { width: 220, height: 190 },
    }}
  />
);

// L'EXEMPLE 1 : un tableau à double entrée, filles et garçons.
const tableauActivites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Filles", "Garçons"],
      rows: [
        { label: "Football", values: [5, 9] },
        { label: "Natation", values: [6, 7] },
        { label: "Danse", values: [8, 3] },
      ],
      highlight: { cell: { row: 1, col: 0 } },
    }}
  />
);

// L'EXEMPLE 2 : le graphique des loisirs.
const graphLoisirs = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Loisirs préférés",
      data: [
        { label: "Sport", value: 16 },
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 12 },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 0 },
      size: { width: 230, height: 190 },
    }}
  />
);

// L'EXEMPLE 3 (défi) : le marché sur toute la journée.
const tableauMarcheJournee = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Ventes au marché",
      headers: ["Matin", "Après-midi"],
      rows: [
        { label: "Mangues", values: [12, 9] },
        { label: "Letchis", values: [7, 10] },
      ],
      highlight: { row: 0 },
    }}
  />
);

// ─── Les textes ───────────────────────────────────────────────────────────────

const pieges = [
  "Lire la mauvaise colonne. Pour les filles en natation, on lit 6, pas 7.",
  "Croire ses yeux. Un bâton qui paraît plus haut ne suffit pas : on lit les nombres.",
  "Conclure trop grand. Une enquête dans une classe ne parle pas de tout le collège.",
];

const aRetenir = [
  "On lit d'abord le titre : il dit ce que comptent les nombres.",
  "Dans un tableau, la donnée est au croisement d'une ligne et d'une colonne.",
  "Pour comparer, on soustrait. Pour un total, on additionne tout.",
];

export const ficheDonnees6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "stat-donnee",
  titre: "Lire et interpréter des données",
  accroche:
    "Un sondage, un score, la météo : les données sont partout. On apprend à les lire, puis à les comparer.",
  identite: [
    { label: "Les mots clés", valeur: "Tableau, graphique, diagramme circulaire" },
    { label: "Le secret", valeur: "On lit le titre avant les nombres" },
    { label: "Le contrôle", valeur: "On compare des nombres, pas des dessins" },
  ],
  definition: {
    texte:
      "Une donnée est un nombre qui compte quelque chose : des élèves, des ventes, des buts. On la range dans un tableau, un graphique ou un diagramme circulaire. Lire une donnée, c'est trouver le bon nombre au bon endroit.",
  },
  figure: {
    schema: camembertAnimaux,
    legende: "Chaque part du disque est une catégorie : le chien a la plus grande.",
  },
  proprietes: [
    {
      titre: "Ligne et colonne",
      micros: ["stat_donnee_prelever"],
      texte:
        "Dans un tableau, la donnée est au croisement d'une ligne et d'une colonne. On suit la ligne, puis on descend la colonne.",
      schema: tableauTransports,
    },
    {
      titre: "La hauteur du bâton",
      micros: ["stat_donnee_lire_graphique"],
      texte:
        "Chaque bâton est une catégorie. Plus il est haut, plus le nombre est grand.",
      schema: batonsFruits,
    },
    {
      titre: "Les parts du disque",
      micros: ["stat_donnee_lire_circulaire"],
      texte:
        "Plus la part est grande, plus la catégorie est fréquente. La moitié du disque, c'est la moitié du total.",
      schema: camembertMoitie,
    },
    {
      titre: "L'écart",
      micros: ["stat_donnee_comparer"],
      texte:
        "Pour comparer deux nombres, on fait une soustraction. Football 12, natation 8 : l'écart est 4.",
      schema: ecartEnBarre,
    },
  ],
  reel: {
    texte:
      "La météo range les températures dans un tableau. Un journal de sport compare les buts avec des barres. Un sondage montre ses réponses dans un disque. Savoir les lire, c'est ne pas se laisser tromper.",
  },
  historique: {
    texte:
      "Avant 1786, on présentait les nombres dans de longs tableaux. Cette année-là, l'Écossais William Playfair dessine le premier graphique en barres. En 1801, il invente le diagramme circulaire. Depuis, on compare d'un coup d'œil.",
  },
  methode: [
    {
      titre: "Lire le titre",
      micros: ["stat_donnee_lire_graphique"],
      texte:
        "Le titre dit ce que comptent les nombres. Sans lui, 24 ne veut rien dire.",
      schema: tableauTemperatures,
    },
    {
      titre: "Trouver sa catégorie",
      micros: ["stat_donnee_prelever"],
      texte:
        "On cherche SA catégorie, pas la plus grande. Puis on lit son nombre.",
      schema: batonKiwiCherche,
    },
    {
      titre: "Comparer les nombres",
      micros: ["stat_donnee_comparer", "stat_donnee_interpreter"],
      texte:
        "Deux barres peuvent sembler égales. Ce sont les nombres écrits qui tranchent.",
      schema: barresPresqueEgales,
    },
  ],
  usages: [
    {
      titre: "Trouver un total",
      micros: ["stat_donnee_defi"],
      detail:
        "On additionne toutes les catégories. 8 + 12 + 5 = 25 : 25 élèves ont répondu.",
      schema: barreTotal,
    },
    {
      titre: "Lire une moitié",
      micros: ["stat_donnee_lire_circulaire"],
      detail:
        "20 personnes ont répondu. La comédie prend la moitié du disque : 20 ÷ 2 = 10 personnes.",
      schema: camembertComedie,
    },
    {
      titre: "Conclure juste",
      micros: ["stat_donnee_interpreter"],
      detail:
        "Une enquête dans ma classe parle de ma classe. Elle ne dit rien de tout le collège.",
      schema: barreClasseCollege,
    },
  ],
  exemples: [
    {
      titre: "Filles en natation",
      micros: ["stat_donnee_prelever"],
      donnees: "Ce tableau compte les élèves par sport, filles et garçons.",
      question: "Combien de filles font de la natation ?",
      schema: tableauActivites,
      solution:
        "On suit la ligne « Natation ». On descend la colonne « Filles ». On lit 6 : 6 filles font de la natation.",
    },
    {
      titre: "Le loisir préféré",
      micros: ["stat_donnee_comparer"],
      donnees: "Sport : 16. Lecture : 9. Jeux : 12.",
      question: "Quel loisir est préféré ? De combien devance-t-il la lecture ?",
      schema: graphLoisirs,
      solution:
        "16 est le plus grand nombre : c'est le sport. On soustrait : 16 − 9 = 7. Le sport a 7 élèves de plus.",
    },
    {
      titre: "Toute la journée",
      micros: ["stat_donnee_defi"],
      donnees: "Mangues : 12 puis 9. Letchis : 7 puis 10.",
      question: "Quel fruit s'est le plus vendu dans la journée ?",
      schema: tableauMarcheJournee,
      solution:
        "Mangues : 12 + 9 = 21. Letchis : 7 + 10 = 17. 21 est plus grand : ce sont les mangues.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Football : 12. Natation : 8. Danse : 10. Combien d'élèves font de la danse ?",
      correction: "On lit la ligne « Danse » : 10 élèves.",
      micros: ["stat_donnee_prelever"],
    },
    {
      question:
        "Livres empruntés : lundi 5, mardi 9, mercredi 6. Quel jour en a-t-on emprunté le plus ?",
      correction: "On compare 5, 9 et 6. Le plus grand est 9 : c'est mardi.",
      micros: ["stat_donnee_lire_graphique"],
    },
    {
      question:
        "Un diagramme circulaire compte 20 élèves. « Chien » prend la moitié du disque. Combien d'élèves ?",
      correction: "La moitié de 20 : 20 ÷ 2 = 10 élèves.",
      micros: ["stat_donnee_lire_circulaire"],
    },
    {
      question: "30 élèves ont répondu. 12 font du football. Combien NE font PAS de football ?",
      correction: "On soustrait : 30 − 12 = 18 élèves.",
      micros: ["stat_donnee_defi"],
    },
    {
      question:
        "36 élèves ont répondu. 12 préfèrent le football. Est-ce « la moitié de la classe » ?",
      correction: "Non. La moitié de 36, c'est 18. Or 12 est plus petit que 18.",
      micros: ["stat_donnee_interpreter"],
    },
  ],
  tiMargo: {
    objectif: "Un nombre, ça se lit au bon endroit !",
    definition: "Tableau, barres ou disque : trois façons de ranger !",
    methode: "D'abord le titre, ensuite les nombres !",
    pieges: "Tes yeux peuvent te tromper. Lis les nombres !",
    retenir: "Comparer, c'est soustraire. Un total, c'est additionner !",
    exercice: "Suis la ligne, puis la colonne !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ Le mode classe est ENGENDRÉ depuis la fiche (`slidesDepuisFiche`) : ce
// tableau reste exporté pour la page, mais il n'est pas projeté.
export const slidesDonnees6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Données - 6e",
    teinte: "objectif",
    schema: avecMargo(camembertAnimaux, "Un nombre, ça se lit au bon endroit !", "joie"),
    section: {
      type: "objectif",
      phrase: "Lire des données, puis les comparer",
      sousPhrase: "Tableau, barres ou disque : on trouve le bon nombre, puis on compare.",
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(tableauActivites, "Suis la ligne, puis la colonne !"),
    section: {
      type: "exercice",
      enonce: "Filles et garçons, par sport.",
      question: "Combien de filles font de la natation ?",
      indice: "Ligne « Natation », colonne « Filles ».",
      correction: "On lit 6 : 6 filles.",
    },
  },
];
