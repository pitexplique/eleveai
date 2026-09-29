// ─── Fiche de cours : mener une enquête et construire un tableau (6e) ─────────
// Fiche « en blocs » alignée sur la banque du coach
// (6e/maths/donnees.bank.ts, notionId stat_enquete).
//
// Micro-compétences 4/4 — mapping micro → blocs :
//   stat_enquete_planifier  → propriétés 1 et 2, méthode 1, usage 1, exemple 1,
//                             entraînement 1 et 2, diapos 4 et 5
//   stat_enquete_mesurer    → propriété 3, méthode 1, usage 2, exemple 3,
//                             entraînement 3, diapos 6 et 9
//   stat_construire_tableau → définition + figure, propriété 4, formule,
//                             méthodes 2 et 3, exemple 2, entraînement 4,
//                             diapos 1, 3, 7, 8, 10
//   stat_donnee_lire_tableau → propriété 5, usage 3, entraînement 5
//
// ⭐ LES MICROS ET LES ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres
// viennent de la banque : les 10 réponses brutes (bus 5, vélo 3, marche 2), le
// sport préféré de 25 élèves (9, 6, 7, 3), les tailles d'Alice à Élodie, les
// feuilles ramassées (12, 9, 15 cm), 1,2 kg contre 800 g, le marché (mangues
// 12 et 9, letchis 7 et 10), les ateliers (gabarit 5-8 / 9-11 / 3-6 → 6, 10, 4)
// et la case manquante (gabarit « Matière préférée » → 7, 5, 3, ? sur 24).
// ⛔ La fiche voisine `maths-6e-donnees.tsx` lit déjà les tableaux croisés
// (Natation × Filles, Le Tampon × Bus) : ici, on FABRIQUE le tableau. On ne
// reprend aucun de ses exemples.
//
// ⭐ LES BÂTONS DE COMPTAGE. `tableau_donnees` rend un vrai `<table>` HTML :
// une colonne « Bâtons » écrite en « ||||| » se lit comme au tableau de la
// classe, groupée par cinq. ⚠️ Sans `label` sur les lignes, pour ne pas faire
// apparaître la colonne « Données » que le composant impose en tête.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import { avecMargo } from "@/components/fiches/TiMargoBulle";

const ROUGE = "#dc2626";
const BLEU = "#2563eb";
const VERT = "#16a34a";
const JAUNE = "#f59e0b";

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// ─── Les dessins ──────────────────────────────────────────────────────────────

// LA FIGURE : de la liste brute au tableau qui compte. Un bâton par réponse,
// puis l'effectif. Les 10 réponses sont celles de la banque.
const tableauBatons = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Comment viens-tu au collège ?",
      headers: ["Réponse", "Bâtons", "Effectif"],
      rows: [
        { values: ["bus", "|||||", 5] },
        { values: ["vélo", "|||", 3] },
        { values: ["marche", "||", 2] },
      ],
      highlight: { col: 2 },
      caption: "10 élèves : 5 + 3 + 2 = 10",
    }}
  />
);

// LA MÊME GRILLE, VIDE : on la prépare AVANT l'enquête.
const tableauAPreparer = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Réponse", "Bâtons", "Effectif"],
      rows: [
        { values: ["bus", "", ""] },
        { values: ["vélo", "", ""] },
        { values: ["marche", "", ""] },
      ],
      highlight: { col: 0 },
      questionLabel: "Prêt AVANT de commencer",
    }}
  />
);

// UNE BONNE QUESTION, UNE MAUVAISE. La première appelle un nombre, la seconde
// souffle sa réponse.
const tableauQuestions = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["La question", "On peut compter ?"],
      rows: [
        { values: ["« Combien de fois par semaine fais-tu du sport ? »", "oui"] },
        { values: ["« Le sport, c'est important, non ? »", "non"] },
      ],
      highlight: { cell: { row: 0, col: 1 } },
      display: { compact: true },
    }}
  />
);

// LE COLLÈGE EN BILLES. Rouges = le club de sport, bleues = tous les autres.
// Léa n'interroge que les rouges : les bleues n'ont AUCUNE chance.
const sacCollege = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: {
        elements: [
          { couleur: ROUGE, label: "S" },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: ROUGE, label: "S" },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: BLEU },
          { couleur: ROUGE, label: "S" },
          { couleur: BLEU },
        ],
      },
    }}
  />,
  "Léa n'interroge que les S du club de sport : faux !"
);

// L'UNITÉ DANS L'EN-TÊTE. Les cinq tailles de la banque.
const tableauTailles = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Taille des élèves",
      headers: ["Prénom", "Taille (cm)"],
      rows: [
        { values: ["Alice", 152] },
        { values: ["Bilal", 148] },
        { values: ["Chloé", 155] },
        { values: ["Dylan", 161] },
        { values: ["Élodie", 149] },
      ],
      questionLabel: "« cm » : une seule fois, en haut",
    }}
  />
);

// 25 ÉLÈVES, 4 LIGNES. Le tableau compte, il ne recopie pas.
const tableauSports = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Sport préféré (25 élèves)",
      headers: ["Sport", "Effectif"],
      rows: [
        { values: ["Football", 9] },
        { values: ["Natation", 6] },
        { values: ["Danse", 7] },
        { values: ["Escalade", 3] },
      ],
      caption: "4 réponses possibles, donc 4 lignes",
    }}
  />
);

// LIRE : une ligne de gauche à droite, une colonne de haut en bas.
// ⚠️ Ce tableau croisé porte des `label` : la colonne « Données » apparaît.
const tableauMarche = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Ventes au marché",
      headers: ["Matin", "Après-midi"],
      rows: [
        { label: "Mangues", values: [12, 9] },
        { label: "Letchis", values: [7, 10] },
      ],
      highlight: { cell: { row: 0, col: 1 } },
      questionLabel: "Ligne « Mangues », colonne « Après-midi » : 9",
    }}
  />
);

// LA SOMME DES EFFECTIFS, BOUT À BOUT. Les quatre parts refont les 25.
// Les étiquettes sous les parts sont coupées : « Natation » ne tient pas dans
// sa part de 46 unités ; les nombres suffisent, le tableau est juste au-dessus.
// ⚠️ Une FONCTION : la diapo « À toi de jouer » la veut sans la réponse.
const barreSommeAvec = (avecReponse: boolean) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Somme des effectifs",
      total: avecReponse ? "25" : "?",
      parts: [
        { label: "", value: "9", color: "#bfdbfe" },
        { label: "", value: "6", color: "#bbf7d0" },
        { label: "", value: "7", color: "#fde68a" },
        { label: "", value: "3", color: "#fecaca" },
      ],
      questionLabel: avecReponse ? "Le compte est bon : 25" : "",
      display: { showTotal: true, showPartLabels: false, showValues: true, showQuestion: avecReponse },
      size: { width: 220, height: 170 },
    }}
  />
);
const barreSomme = barreSommeAvec(true);

// LA LISTE BRUTE, DANS L'ORDRE DE LA BANQUE : bus, vélo, bus, marche, bus,
// vélo, marche, bus, vélo, bus. On la lit une fois, sans rien sauter.
const B = { couleur: JAUNE, label: "B" };
const V = { couleur: VERT, label: "V" };
const M = { couleur: BLEU, label: "M" };
const listeBrute = legende(
  <CanvasRenderer
    figure={{
      kind: "probabilites",
      variant: "billes",
      billes: { elements: [B, V, B, M, B, V, M, B, V, B] },
    }}
  />,
  "B = bus, V = vélo, M = marche : un bâton pour chacun"
);

// LE CONTRÔLE QUI ATTRAPE UNE ERREUR. Une danse comptée 6 au lieu de 7 : la
// somme tombe à 24 au lieu de 25 (cas cité par la banque : « si la somme avait
// donné 24, il manquerait une réponse »).
const tableauTotalFaux = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "25 élèves interrogés",
      headers: ["Sport", "Effectif"],
      rows: [
        { values: ["Football", 9] },
        { values: ["Natation", 6] },
        { values: ["Danse", 6] },
        { values: ["Escalade", 3] },
        { values: ["Total", 24] },
      ],
      highlight: { row: 4 },
      questionLabel: "24 au lieu de 25 : il manque quelqu'un !",
    }}
  />
);

// LE TABLEAU DEVIENT UN GRAPHIQUE. Les effectifs de la figure, en barres.
const graphTrajet = (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "barres",
      title: "Trajet de 10 élèves",
      data: [
        { label: "bus", value: 5, color: "#fde68a" },
        { label: "vélo", value: 3, color: "#bbf7d0" },
        { label: "marche", value: 2, color: "#bfdbfe" },
      ],
      display: { showValues: true, showLabels: true },
      // `StatGraphCanvas` écrit ses noms en 12 px. Le SVG ne reçoit que ~200 px
      // dans le bloc de 226 d'un téléphone : au-delà de 218 de large, il
      // tombe sous 11 px. Mesuré, pas estimé.
      size: { width: 210, height: 180 },
    }}
  />
);

// DES MESURES DANS LA NATURE : les feuilles ramassées de la banque.
const tableauFeuilles = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Longueur des feuilles ramassées",
      headers: ["Feuille", "Longueur (cm)"],
      rows: [
        { values: ["n° 1", 12] },
        { values: ["n° 2", 9] },
        { values: ["n° 3", 15] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// LE TOTAL D'UNE COLONNE (gabarit « Effectifs par atelier »).
const tableauAteliers = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Effectifs par atelier",
      headers: ["Atelier", "Effectif"],
      rows: [
        { values: ["A", 6] },
        { values: ["B", 10] },
        { values: ["C", 4] },
      ],
      highlight: { col: 1 },
      questionLabel: "6 + 10 + 4 = 20 élèves en tout",
    }}
  />
);

// LE COLLÈGE COUPÉ EN DEUX. À la cantine, on n'interroge que la partie gauche.
const barreCantine = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "Le collège",
      total: "tous",
      parts: [
        { label: "cantine", value: "", color: "#bbf7d0" },
        { label: "chez eux", value: "", color: "#e2e8f0" },
      ],
      questionLabel: "chez eux : jamais interrogés",
      display: { showTotal: true, showPartLabels: true, showValues: false, showQuestion: true },
      size: { width: 212, height: 190 },
    }}
  />
);

// LA CASE QUI MANQUE (gabarit « Matière préférée »).
const tableauCaseManquante = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Matière préférée (24 élèves)",
      headers: ["Matière", "Effectif"],
      rows: [
        { values: ["Maths", 7] },
        { values: ["Français", 5] },
        { values: ["Histoire", 3] },
        { values: ["SVT", "?"] },
      ],
      highlight: { cell: { row: 3, col: 1 } },
    }}
  />
);

// UNE SEULE UNITÉ PAR COLONNE : 800 g devient 0,8 kg.
const tableauMasses = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["Fruit", "Masse (kg)"],
      rows: [
        { values: ["melon", "1,2"] },
        { values: ["ananas", "0,8"] },
      ],
      highlight: { cell: { row: 1, col: 1 } },
      questionLabel: "800 g = 0,8 kg : tout en kg",
    }}
  />
);

// ─── Les textes courts partagés avec le mode classe ───────────────────────────

const pieges = [
  "Interroger seulement ses amis ou un seul club. Le résultat est faux, même avec des calculs justes.",
  "Mélanger les unités. 800 g paraît plus grand que 1,2 kg, mais 800 g = 0,8 kg.",
  "Faire une ligne par élève. Le tableau ne résume plus rien : une ligne par réponse possible !",
];

const aRetenir = [
  "Une enquête : une question précise, posée à un groupe qui ressemble à tous.",
  "Un tableau d'effectifs : une ligne par réponse, l'unité dans l'en-tête.",
  "Le contrôle : la somme des effectifs = le nombre de personnes interrogées.",
];

export const ficheStatEnquete6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "stat-enquete",
  titre: "Mener une enquête et faire un tableau",
  accroche:
    "Avant de lire un tableau, il faut le fabriquer. On pose une question, on note les réponses et on les compte.",
  identite: [
    { label: "Les mots clés", valeur: "Enquête, réponse, effectif, tableau" },
    { label: "Le secret", valeur: "Une ligne par réponse possible, pas par élève" },
    { label: "Le contrôle", valeur: "La somme des effectifs = le nombre de personnes" },
  ],
  definition: {
    texte:
      "Une enquête, c'est poser la même question à un groupe de personnes. L'effectif d'une réponse, c'est le nombre de fois où on l'a obtenue. Un tableau d'effectifs range ces nombres : une ligne par réponse possible.",
  },
  figure: {
    schema: tableauBatons,
    legende: "On trace un bâton par réponse, puis on compte les bâtons de chaque ligne.",
  },
  proprietes: [
    {
      titre: "Une question précise",
      micros: ["stat_enquete_planifier"],
      texte:
        "Une bonne question appelle une réponse qu'on peut compter. Elle ne souffle pas la réponse.",
      schema: tableauQuestions,
    },
    {
      titre: "Interroger le bon groupe",
      micros: ["stat_enquete_planifier"],
      texte:
        "Chaque élève du collège doit avoir une chance d'être interrogé. Sinon, le résultat est faux, même avec des calculs justes.",
      schema: sacCollege,
    },
    {
      titre: "L'unité dans l'en-tête",
      micros: ["stat_enquete_mesurer"],
      texte:
        "On écrit l'unité une seule fois, en haut de la colonne. Dans les cases, on ne met que des nombres.",
      schema: tableauTailles,
    },
    {
      titre: "Une ligne par réponse possible",
      micros: ["stat_construire_tableau"],
      texte:
        "25 élèves ont répondu, mais il n'y a que 4 sports. Le tableau a donc 4 lignes, pas 25.",
      schema: tableauSports,
    },
    {
      titre: "Une ligne →, une colonne ↓",
      micros: ["stat_donnee_lire_tableau"],
      texte:
        "Une ligne se lit de gauche à droite, une colonne de haut en bas. On lit toujours le titre d'abord.",
      schema: tableauMarche,
    },
  ],
  reel: {
    texte:
      "Les délégués font un sondage pour choisir la sortie de fin d'année. Un club de foot relève la taille de ses joueurs pour commander les maillots. Un scientifique compte les oiseaux d'un jardin chaque semaine. Tous commencent par préparer un tableau.",
  },
  historique: {
    texte:
      "Compter avec des bâtons, c'est très ancien. En Afrique, on a trouvé un os de plus de 20 000 ans couvert d'entailles : l'os d'Ishango. Des hommes y comptaient peut-être des jours ou des objets. Nos bâtons groupés par cinq font la même chose.",
  },
  formule: {
    contexte: "Le contrôle du tableau",
    expression: "$9 + 6 + 7 + 3 = 25$",
    legende:
      "La somme des effectifs redonne le nombre de personnes interrogées. Sinon, on a oublié quelqu'un, ou compté quelqu'un deux fois.",
    schema: barreSomme,
  },
  methode: [
    {
      titre: "Préparer le tableau avant",
      micros: ["stat_enquete_planifier", "stat_enquete_mesurer"],
      texte:
        "On écrit d'abord les réponses possibles, une par ligne. Puis on remplit pendant l'enquête, jamais de mémoire.",
      schema: tableauAPreparer,
    },
    {
      titre: "Un bâton par réponse",
      micros: ["stat_construire_tableau"],
      texte:
        "On lit la liste une seule fois, dans l'ordre. Pour chaque réponse, on trace un bâton dans la bonne ligne.",
      schema: listeBrute,
    },
    {
      titre: "Vérifier avec la somme",
      micros: ["stat_construire_tableau"],
      texte:
        "On additionne les effectifs. On doit retrouver le nombre de personnes interrogées.",
      schema: tableauTotalFaux,
    },
  ],
  usages: [
    {
      titre: "Faire un graphique",
      micros: ["stat_construire_tableau"],
      detail:
        "Une enquête sert souvent à faire un graphique. Chaque effectif du tableau devient une barre.",
      schema: graphTrajet,
    },
    {
      titre: "Relever des mesures",
      micros: ["stat_enquete_mesurer"],
      detail:
        "En sciences, on mesure des feuilles d'arbre ramassées. On note chaque longueur dans le tableau, en cm.",
      schema: tableauFeuilles,
    },
    {
      titre: "Trouver un total",
      micros: ["stat_donnee_lire_tableau"],
      detail:
        "Pour savoir combien d'élèves en tout, on additionne la colonne des effectifs. Ici, 6 + 10 + 4 = 20.",
      schema: tableauAteliers,
    },
  ],
  exemples: [
    {
      titre: "Le dessert préféré",
      micros: ["stat_enquete_planifier"],
      donnees:
        "Un élève veut connaître le dessert préféré du collège. Il interroge dix camarades à la sortie de la cantine.",
      question: "Son enquête est-elle bien faite ?",
      schema: barreCantine,
      solution:
        "Non. À la cantine, il n'interroge que les élèves qui mangent au collège. Ceux qui mangent chez eux n'ont aucune chance d'être choisis. Et dix personnes, c'est très peu. Il faut tirer au sort des élèves dans toutes les classes.",
    },
    {
      titre: "La case qui manque",
      micros: ["stat_construire_tableau"],
      donnees:
        "On a interrogé 24 élèves sur leur matière préférée. Maths : 7. Français : 5. Histoire : 3.",
      question: "Combien d'élèves ont choisi les SVT ?",
      schema: tableauCaseManquante,
      solution:
        "Chaque élève a donné une seule réponse. On additionne les effectifs connus : 7 + 5 + 3 = 15. Il reste 24 − 15 = 9. Donc 9 élèves ont choisi les SVT. Vérification : 7 + 5 + 3 + 9 = 24.",
    },
    {
      titre: "Une seule unité",
      micros: ["stat_enquete_mesurer"],
      donnees: "Dans un tableau de masses, on lit : melon 1,2 kg, ananas 800 g.",
      question: "Lequel est le plus lourd ? Comment corriger le tableau ?",
      schema: tableauMasses,
      solution:
        "800 g, c'est 0,8 kg. Donc le melon est le plus lourd, avec 1,2 kg. On écrit toute la colonne dans la même unité. L'en-tête dit alors « Masse (kg) ».",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question:
        "Pour une enquête, quelle question est la meilleure : « Que penses-tu du sport ? » ou « Combien de fois par semaine fais-tu du sport ? » ?",
      correction:
        "La deuxième. Sa réponse est un nombre : on peut la noter, la compter et la comparer.",
      micros: ["stat_enquete_planifier"],
    },
    {
      question:
        "On veut connaître le livre préféré des élèves du collège. On interroge les élèves présents au CDI à midi. Est-ce une bonne idée ?",
      correction:
        "Non. Les élèves qui ne vont pas au CDI n'ont aucune chance d'être interrogés. Il faut tirer au sort des élèves dans toutes les classes.",
      micros: ["stat_enquete_planifier"],
    },
    {
      question:
        "Tu relèves la taille de 12 élèves. Combien de lignes de données aura ton tableau, en plus de l'en-tête ?",
      correction:
        "12 lignes : une par élève mesuré. L'en-tête annonce « Taille (cm) », avec l'unité écrite une seule fois.",
      micros: ["stat_enquete_mesurer"],
    },
    {
      question:
        "On a interrogé 22 élèves. Bus : 9. Vélo : 4. Marche : 6. Les autres viennent en voiture. Combien sont-ils ?",
      correction:
        "On additionne : 9 + 4 + 6 = 19. Il reste 22 − 19 = 3. Donc 3 élèves viennent en voiture.",
      micros: ["stat_construire_tableau"],
    },
    {
      question:
        "Dans le tableau « Ventes au marché », combien de letchis ont été vendus le matin ?",
      correction:
        "On suit la ligne « Letchis », puis la colonne « Matin ». On lit 7.",
      micros: ["stat_donnee_lire_tableau"],
    },
  ],
  tiMargo: {
    objectif: "Un bâton par réponse, puis on compte !",
    definition: "Une ligne par réponse possible, pas par élève !",
    methode: "Tout le monde doit avoir sa chance d'être interrogé !",
    pieges: "800 g, c'est moins que 1,2 kg !",
    exercice: "On additionne, puis on compare au total !",
  },
  coachHref: "/coach-ia/maths?classe=6e",
};

// ⛔ AUCUN LATEX DANS LES DIAPOS : le mode classe n'a pas de rendu KaTeX.
export const slidesStatEnquete6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Enquête - 6e",
    teinte: "objectif",
    schema: avecMargo(tableauBatons, "Un bâton par réponse, puis on compte !", "joie"),
    section: {
      type: "objectif",
      phrase: "Fabriquer ses propres données",
      sousPhrase: "On pose une question, on note les réponses, on les compte dans un tableau.",
    },
  },
  {
    titre: "À quoi ça sert ?",
    badge: "Utilité & histoire",
    teinte: "reel",
    schema: graphTrajet,
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "Au quotidien",
        contenu: "Choisir une sortie, commander des maillots, compter les oiseaux du jardin : tout commence par un tableau.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu: "L'os d'Ishango a plus de 20 000 ans. Il porte des entailles : des bâtons de comptage, déjà !",
      },
    },
  },
  {
    titre: "La définition",
    badge: "À connaître",
    teinte: "definition",
    schema: tableauSports,
    section: {
      type: "objectif",
      phrase: "L'effectif d'une réponse, c'est le nombre de fois où on l'a obtenue",
      sousPhrase: "Le tableau d'effectifs a une ligne par réponse possible, pas une ligne par élève.",
    },
  },
  {
    titre: "Une bonne question",
    badge: "Planifier",
    teinte: "propriete",
    schema: avecMargo(tableauQuestions, "Une bonne question se compte !"),
    section: {
      type: "cartes",
      cartes: [
        { titre: "Oui", texte: "« Combien de fois par semaine fais-tu du sport ? » La réponse est un nombre." },
        { titre: "Non", texte: "« Le sport, c'est important, non ? » La question souffle la réponse." },
      ],
    },
  },
  {
    titre: "Le bon groupe",
    badge: "Planifier",
    teinte: "propriete",
    schema: avecMargo(sacCollege, "Tout le monde doit avoir sa chance !", "attention"),
    section: {
      type: "objectif",
      phrase: "Chacun doit avoir une chance d'être interrogé",
      sousPhrase: "Léa n'interroge que le club de sport. Son résultat sera faux.",
    },
  },
  {
    titre: "L'unité",
    badge: "Mesurer",
    teinte: "propriete",
    schema: tableauTailles,
    section: {
      type: "objectif",
      phrase: "L'unité s'écrit une fois, en haut de la colonne",
      sousPhrase: "Toutes les mesures d'une colonne sont dans la même unité.",
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    teinte: "methode",
    schema: listeBrute,
    section: {
      type: "etapes",
      etapes: [
        "Lister les réponses possibles, une par ligne.",
        "Tracer un bâton par réponse, sans rien sauter.",
        "Vérifier : la somme = le nombre de personnes.",
      ],
    },
  },
  {
    titre: "Exemple guidé",
    badge: "La case qui manque",
    teinte: "exemple",
    schema: tableauCaseManquante,
    section: {
      type: "exemple",
      enonce: "24 élèves. Maths 7, français 5, histoire 3, SVT ?",
      question: "Combien ont choisi les SVT ?",
      correction: "7 + 5 + 3 = 15. Puis 24 − 15 = 9. Donc 9 élèves ont choisi les SVT.",
    },
  },
  {
    titre: "Pièges à éviter",
    badge: "Vigilance",
    teinte: "piege",
    schema: avecMargo(tableauMasses, "800 g, c'est moins que 1,2 kg !", "attention"),
    section: {
      type: "cartes",
      cartes: [
        { titre: "Le mauvais groupe", texte: "Interroger ses amis ou un seul club : le résultat est faux." },
        { titre: "Deux unités", texte: "800 g paraît plus que 1,2 kg. Faux : 800 g = 0,8 kg." },
        { titre: "Une ligne par élève", texte: "Non : une ligne par réponse possible." },
      ],
    },
  },
  {
    titre: "À toi de jouer",
    badge: "Exercice flash",
    teinte: "exercice",
    schema: avecMargo(barreSommeAvec(false), "On additionne, puis on compare !", "joie"),
    section: {
      type: "exercice",
      enonce: "25 élèves. Football 9, natation 6, danse 7, escalade 3.",
      question: "Le compte est-il bon ?",
      indice: "Additionne les effectifs.",
      correction: "9 + 6 + 7 + 3 = 25 : oui, personne n'est oublié.",
    },
  },
];
