// ─── Fiche de cours : lire et interpréter des données (6e) ─────────────────────
// Fiche « en blocs » créée pour coller EXACTEMENT à la banque du coach
// (lib/tutor-v4/questionBank/6e/maths/donnees.bank.ts).
//
// Couverture des micro-compétences de la banque (pour la relecture du prof) :
// - stat_donnee_lire_tableau     → definition, proprietes (Le tableau croise...),
//                                  methode (Repérer la bonne ligne), usages (carte 1),
//                                  exemples (ex. 1), entrainement (Q1)
// - stat_donnee_lire_graphique   → definition, proprietes (Le graphique montre...),
//                                  usages (carte 2), exemples (ex. 2),
//                                  entrainement (Q2), reel
// - stat_donnee_lire_circulaire  → definition, proprietes (Le circulaire montre...),
//                                  usages (carte 3), entrainement (Q3),
//                                  slides (diagramme circulaire), pieges (3)
// - stat_donnee_prelever         → methode (Repérer la bonne ligne/colonne),
//                                  usages (carte 1), exemples (ex. 1), pieges (1)
// - stat_donnee_comparer         → proprietes, methode (Comparer avant de conclure),
//                                  exemples (ex. 2), entrainement (Q4), pieges (2)
// - stat_donnee_interpreter      → methode (Comparer avant de conclure), reel,
//                                  aRetenir, pieges (2), slide « à toi de jouer »
// - stat_donnee_defi             → entrainement (Q4 : total/effectif), aRetenir

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// Le diagramme circulaire du coach : les parts d'un total (20 élèves).
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
    }}
  />
);

// Le tableau à double entrée : la valeur se lit au croisement ligne × colonne.
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
      questionLabel: "Ligne « Natation » × colonne « Filles » = 6.",
    }}
  />
);

// Le graphique en barres : la hauteur donne la valeur, le sport est le plus haut.
const graphLoisirs = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Loisirs préférés de la classe",
      data: [
        { label: "Sport", value: 16 },
        { label: "Lecture", value: 9 },
        { label: "Jeux", value: 12 },
      ],
      display: { showValues: true, showLabels: true, highlightIndex: 0 },
    }}
  />
);

// ─── Les sept dessins des blocs ───────────────────────────────────────────────
// ⭐ CETTE FICHE PARLE DE TROIS REPRÉSENTATIONS : les répéter est inévitable, les
// répéter POUR LA MÊME CHOSE ne l'est pas (REGLES.md § 2 bis). Chaque dessin ci-
// dessous dit quelque chose qu'aucun autre ne dit : la structure du tableau, le
// titre qui donne l'unité, le plus haut bâton, le bâton qu'on CHERCHE (et qui
// n'est pas le plus haut), le demi-disque, l'écart devenu une longueur, et deux
// barres presque égales que seul le nombre départage.

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// LA STRUCTURE DU TABLEAU. Des lignes nommées, des colonnes nommées, et la
// valeur au croisement des deux. Les communes sont celles du coach (La Réunion).
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
      questionLabel: "Ligne « Le Tampon » × colonne « Bus » = 12.",
    }}
  />
);

// LE TITRE FAIT LE SENS. Sans lui, « 24 » ne veut rien dire — 24 quoi ? C'est
// tout l'objet de la première étape de méthode, et c'est le seul dessin de la
// fiche dont le sujet n'est pas un nombre mais les MOTS qui l'entourent.
const tableauTemperatures = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Températures de la semaine (°C)",
      headers: ["Lun", "Mar", "Mer", "Jeu"],
      rows: [{ label: "Midi", values: [24, 27, 22, 26] }],
      highlight: { row: 0 },
      questionLabel: "Sans le titre, 24 ne veut rien dire : 24 quoi ?",
    }}
  />
);

// LE PLUS HAUT SE VOIT SANS COMPTER. Des bâtons, pas des barres : la fiche
// montre déjà des barres à l'exemple 2, et deux dessins jumeaux, c'est une
// règle de moins.
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
      // ⚠️ MESURÉ, PAS ESTIMÉ. `StatGraphCanvas` écrit ses étiquettes en 12 px
      // dans un viewBox fixe : à 300 de large, elles tombent à 8,7 px dans une
      // carte de propriété de 225. Le cadre serré à 230 les rend à 11,7.
      size: { width: 230, height: 190 },
    }}
  />
);

// ⭐ CE N'EST PAS LE PLUS HAUT QU'ON CHERCHE. Le même graphique, mais c'est le
// bâton de SA catégorie qui est allumé — le kiwi, le plus petit. Repérer n'est
// pas comparer : la carte d'à côté dit le contraire, et c'est voulu.
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
  "on cherche le kiwi : c'est SON bâton qu'on lit, pas le plus haut"
);

// LA MOITIÉ DU DISQUE. Le camembert de la figure montre « des parts » ; celui-ci
// montre LA moitié — 10 sur 20, et le secteur occupe exactement la moitié du
// tour. C'est la phrase de la propriété, dessinée.
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
      // Le camembert porte ses noms de secteurs AUTOUR du disque : il lui faut
      // un cadre encore plus serré que les bâtons pour tenir les 11 px.
      size: { width: 210, height: 190 },
    }}
  />,
  "le bus prend la moitié du disque : 10 élèves sur 20"
);

// L'ÉCART EST UNE LONGUEUR. Aucun graphique ne montre une soustraction : la
// hauteur d'un bâton dit une valeur, jamais une différence. Mis bout à bout, les
// 9 de la lecture et les 7 qui manquent font les 16 du sport — et l'écart, lui,
// se voit.
const ecartEnBarre = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ Au-delà de ~28 caractères, le titre déborde du cadre, en silence.
      title: "Sport 16, lecture 9",
      total: "16",
      parts: [
        { label: "lecture", value: "9" },
        { label: "l'écart", value: "7" },
      ],
      questionLabel: "16 − 9 = 7 : voilà l'écart",
      // ⚠️ 175 px collent les étiquettes à la phrase du bas (piège déjà payé
      // deux fois : périmètres, puis probabilités).
      size: { width: 300, height: 190 },
    }}
  />
);

// DEUX BARRES QUE L'ŒIL NE DÉPARTAGE PAS. 12 et 11 : à l'œil elles se valent,
// et c'est exactement le piège n° 2 de cette fiche. Le dessin ne tranche pas —
// ce sont les nombres écrits dessus qui tranchent.
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
  "à l'œil, elles se valent — 12 et 11 tranchent"
);

const pieges = [
  "Se tromper de ligne ou de colonne dans un tableau à double entrée : on doit lire la valeur au croisement de la bonne ligne ET de la bonne colonne.",
  "Se fier seulement à l'impression visuelle : un bâton qui « paraît » plus haut ou un secteur qui « paraît » plus grand ne remplace pas la lecture des vraies valeurs.",
  "Généraliser à tort : si une enquête porte sur une classe, on ne peut pas conclure sur tout le collège. Une conclusion ne vaut que pour le groupe étudié.",
];

const aRetenir = [
  "On lit toujours d'abord le titre et les légendes : ils disent ce que représentent les nombres.",
  "Dans un tableau à double entrée, la donnée se trouve au croisement d'une ligne et d'une colonne.",
  "Avant de conclure, on compare les valeurs exactes : la plus grande, la plus petite, ou leur écart.",
];

export const ficheDonnees6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "stat-donnee",
  titre: "Lire et interpréter des données",
  accroche:
    "Un sondage, un score de match, la météo de la semaine : les données sont partout. En 6e, on apprend à les lire dans un tableau, un graphique ou un diagramme circulaire, puis à les comparer pour en tirer une vraie conclusion.",
  identite: [
    { label: "Prérequis", valeur: "Compter, additionner et comparer des nombres entiers" },
    { label: "Idée clé", valeur: "Une donnée se lit précisément avant de s'interpréter" },
    { label: "Outil", valeur: "Le tableau, le graphique en barres et le diagramme circulaire" },
  ],
  definition: {
    texte:
      "Une donnée est une information chiffrée : un nombre d'élèves, une quantité vendue, une durée. Une série de données, c'est un ensemble de ces informations rangées par catégories. Pour les présenter clairement, on utilise trois représentations : le tableau (des lignes et des colonnes), le graphique en barres (des bâtons de hauteurs différentes) et le diagramme circulaire (un disque partagé en secteurs).",
  },
  figure: {
    schema: camembertAnimaux,
    legende: "Un diagramme circulaire : chaque secteur est une part du total. Le plus grand secteur est la catégorie la plus fréquente.",
  },
  proprietes: [
    {
      titre: "Le tableau croise lignes et colonnes",
      texte:
        "Un tableau range les données en lignes et en colonnes. Dans un tableau à double entrée, chaque valeur se lit au croisement d'une ligne et d'une colonne : par exemple la ligne « Natation » et la colonne « Filles ».",
      schema: tableauTransports,
    },
    {
      titre: "Le graphique montre les grandeurs d'un coup d'oeil",
      texte:
        "Dans un graphique en barres, chaque catégorie est un bâton dont la hauteur donne la valeur. Plus le bâton est haut, plus la valeur est grande : on repère très vite le plus grand et le plus petit.",
      schema: batonsFruits,
    },
    {
      titre: "Le diagramme circulaire montre des parts",
      texte:
        "Un diagramme circulaire partage un disque en secteurs, un par catégorie. Plus un secteur est grand, plus la catégorie est fréquente. Un secteur qui occupe la moitié du disque représente la moitié du total.",
      schema: camembertMoitie,
    },
    {
      titre: "Comparer, c'est chercher un écart",
      texte:
        "Comparer deux données, c'est regarder laquelle est la plus grande, la plus petite, ou calculer leur écart par une soustraction. Le total, lui, s'obtient en additionnant toutes les valeurs.",
      schema: ecartEnBarre,
    },
  ],
  reel: {
    texte:
      "On lit des données tous les jours : la météo présente les températures de la semaine dans un tableau, un journal sportif compare les buts marqués dans un graphique, un sondage montre les réponses dans un diagramme circulaire. Savoir lire ces représentations, c'est comprendre l'information sans se laisser tromper.",
  },
  historique: {
    texte:
      "L'ingénieur écossais William Playfair a inventé le graphique en barres et le diagramme circulaire à la fin du 18e siècle. En 1786, il publie le premier graphique en barres pour montrer le commerce de l'Écosse, puis le premier « camembert » en 1801. Avant lui, on présentait presque tout sous forme de longs tableaux de chiffres, bien plus difficiles à comparer d'un coup d'oeil.",
  },
  methode: [
    {
      titre: "Lire le titre et les légendes",
      texte:
        "On commence toujours par lire le titre : il dit de quoi parlent les données. On repère ensuite les catégories et les unités, pour savoir ce que représente chaque nombre.",
      schema: tableauTemperatures,
    },
    {
      titre: "Repérer la bonne ligne ou la bonne colonne",
      texte:
        "Dans un tableau, on suit la ligne de la catégorie cherchée, puis la bonne colonne. La valeur est à leur croisement. Dans un graphique, on repère le bon bâton ou le bon secteur, puis on lit sa valeur.",
      schema: batonKiwiCherche,
    },
    {
      titre: "Comparer avant de conclure",
      texte:
        "Une conclusion doit s'appuyer sur des valeurs lues, pas sur une impression. On compare les nombres exacts (le plus grand, le plus petit, l'écart) avant d'affirmer quoi que ce soit.",
      schema: barresPresqueEgales,
    },
  ],
  usages: [
    {
      titre: "Lire un tableau",
      detail:
        "Retrouver une valeur en suivant la ligne et la colonne. Dans un tableau à double entrée, on lit au croisement des deux : ligne « Le Tampon », colonne « Bus » donne le nombre cherché.",
    },
    {
      titre: "Lire un graphique",
      detail:
        "Repérer le bâton d'une catégorie et lire sa hauteur. On voit immédiatement quelle catégorie a la plus grande ou la plus petite valeur.",
    },
    {
      titre: "Lire un diagramme circulaire",
      detail:
        "Repérer un secteur et lire sa valeur. Le plus grand secteur est la catégorie la plus fréquente ; un demi-disque vaut la moitié du total.",
    },
  ],
  exemples: [
    {
      titre: "Prélever une valeur dans un tableau",
      donnees:
        "Un tableau donne le nombre d'élèves par activité et par groupe. Football : 5 filles et 9 garçons. Natation : 6 filles et 7 garçons. Danse : 8 filles et 3 garçons.",
      question: "Combien de filles ont choisi la natation ?",
      schema: tableauActivites,
      solution:
        "On cherche la ligne « Natation », puis la colonne « Filles ». La valeur au croisement de cette ligne et de cette colonne est 6. Donc 6 filles ont choisi la natation. On ne lit pas la colonne « Garçons », sinon on trouverait 7 par erreur.",
    },
    {
      titre: "Comparer les valeurs d'un graphique",
      donnees:
        "Un graphique en barres montre les loisirs préférés d'une classe. Sport : 16. Lecture : 9. Jeux : 12.",
      question: "Quelle est l'activité préférée, et combien d'élèves de plus la choisissent par rapport à la lecture ?",
      schema: graphLoisirs,
      solution:
        "On compare les trois hauteurs : 16, 9 et 12. La plus grande valeur est 16, donc l'activité préférée est le sport. Pour l'écart avec la lecture, on soustrait : 16 - 9 = 7. Il y a donc 7 élèves de plus qui préfèrent le sport.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Un tableau indique le nombre d'élèves par activité. Football : 12. Natation : 8. Danse : 10. Combien d'élèves ont choisi la danse ?",
      correction:
        "On repère la ligne « Danse » et on lit la valeur indiquée. La ligne « Danse » indique 10. Donc 10 élèves ont choisi la danse.",
    },
    {
      question:
        "Un graphique en barres montre les livres empruntés : lundi 5, mardi 9, mercredi 6. Quel jour a-t-on emprunté le plus de livres ?",
      correction:
        "On compare les trois hauteurs : 5, 9 et 6. La plus grande valeur est 9, pour mardi. C'est donc mardi que l'on a emprunté le plus de livres.",
    },
    {
      question:
        "Un diagramme circulaire représente 20 élèves. Le secteur « Chien » occupe exactement la moitié du disque. Combien d'élèves préfèrent le chien ?",
      correction:
        "Un secteur qui occupe la moitié du disque représente la moitié du total. On calcule la moitié de 20 : 20 ÷ 2 = 10. Donc 10 élèves préfèrent le chien.",
    },
    {
      question:
        "Défi : un sondage indique 8 élèves à pied, 12 en bus et 5 en voiture. Combien d'élèves ont répondu au sondage en tout ?",
      correction:
        "L'effectif total est la somme de toutes les catégories. On additionne : 8 + 12 + 5 = 25. Donc 25 élèves ont répondu au sondage.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesDonnees6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Données - 6e",
    section: {
      type: "objectif",
      phrase: "Lire des données, puis en tirer une vraie conclusion",
      sousPhrase:
        "Tableau, graphique en barres, diagramme circulaire : trois façons de présenter des données. On apprend à y lire une valeur, puis à comparer.",
      encadre: {
        titre: "L'idée",
        texte: "On lit d'abord la valeur exacte. On conclut seulement après avoir comparé.",
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
          "La météo de la semaine, les buts d'un match, les réponses d'un sondage : partout, on lit des données pour comprendre l'information.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "L'Écossais William Playfair a inventé le graphique en barres en 1786 et le diagramme circulaire en 1801, pour rendre les chiffres plus faciles à comparer.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheDonnees6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "La définition",
    badge: "À connaître",
    section: {
      type: "objectif",
      phrase: "Une donnée est une information chiffrée, rangée par catégories",
      sousPhrase:
        "On la présente dans un tableau (lignes et colonnes), un graphique en barres (des bâtons) ou un diagramme circulaire (un disque en secteurs).",
      encadre: {
        titre: "Attention",
        texte: "Une impression visuelle ne suffit pas : on lit toujours les vraies valeurs.",
      },
    },
  },
  {
    titre: "Selon la représentation",
    badge: "3 lectures",
    section: {
      type: "cartes",
      cartes: ficheDonnees6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Lire un tableau à double entrée",
    section: {
      type: "exemple",
      enonce:
        "Un tableau donne : Natation, 6 filles et 7 garçons.",
      question: "Combien de filles ont choisi la natation ?",
      correction:
        "On croise la ligne « Natation » et la colonne « Filles » : on lit 6. Réponse : 6 filles.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Comparer un graphique",
    section: {
      type: "exemple",
      enonce: "Un graphique montre : Sport 16, Lecture 9, Jeux 12.",
      question: "Quelle est l'activité préférée, et de combien devance-t-elle la lecture ?",
      correction:
        "La plus grande valeur est 16 (Sport). L'écart avec la lecture : 16 - 9 = 7. Le sport devance la lecture de 7 élèves.",
    },
  },
  {
    titre: "Lire un diagramme circulaire",
    badge: "Les parts d'un disque",
    section: {
      type: "exemple",
      enonce:
        "Un diagramme circulaire représente 20 personnes. Le secteur « Comédie » occupe la moitié du disque.",
      question: "Combien de personnes préfèrent la comédie ?",
      correction:
        "La moitié du disque, c'est la moitié du total : 20 ÷ 2 = 10. Donc 10 personnes préfèrent la comédie.",
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
      enonce:
        "Défi : un sondage indique 8 élèves à pied, 12 en bus et 5 en voiture.",
      question: "Combien d'élèves ont répondu au sondage en tout ?",
      indice: "L'effectif total, c'est la somme de toutes les catégories.",
      correction:
        "On additionne toutes les valeurs : 8 + 12 + 5 = 25. Donc 25 élèves ont répondu.",
    },
  },
];
