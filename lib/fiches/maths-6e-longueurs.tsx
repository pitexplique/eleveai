// ─── Fiche de cours : les longueurs (6e) ────────────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/longueurs.bank.ts (notion aire_longueur).
//
// Micro-compétences couvertes → blocs :
// - aire_longueur_mesurer   → proprietes (choisir l'unité), usages (Mesurer), méthode, exemples
// - aire_longueur_unite     → proprietes (les unités du mm au km), formule, aRetenir
// - aire_longueur_convertir → proprietes (tableau de conversion), usages (Convertir), exemples, entrainement
// - aire_longueur_comparer  → proprietes (comparer), usages (Comparer), entrainement
// - aire_longueur_probleme  → methode, exemples, entrainement (couper, ajouter, partager)
// - aire_longueur_defi      → pieges, entrainement (question de raisonnement)

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

const pieges = [
  "Comparer deux longueurs sans les mettre dans la même unité (2 m et 150 cm).",
  "Se tromper de sens : on multiplie pour aller vers une unité plus petite, on divise pour aller vers une plus grande.",
  "Choisir une unité pas adaptée : on ne mesure pas une ville en centimètres, ni un crayon en kilomètres.",
];

const aRetenir = [
  "1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm.",
  "Pour comparer deux longueurs, on les convertit d'abord dans la même unité.",
  "D'une unité à sa voisine, on multiplie ou on divise par 10.",
];

// Une règle graduée (canvas du coach) : le trait mesuré se lit sur les graduations.
const regleMesure = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 12,
      // ⚠️ MESURÉ LE 24/08 : à `step: 1`, treize nombres sur 320 px de viewBox
      // rendaient 10,3 px sur un téléphone. Une graduation tous les 2 — les
      // POINTS, eux, restent posés à la valeur exacte.
      step: 2,
      points: [
        { value: 0, label: "0", color: "#64748b" },
        { value: 8, label: "8 cm", color: "#0ea5e9" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true, showZero: true },
      size: { width: 260, height: 95 },
    }}
  />
);

// Le tableau de conversion du coach : chaque colonne vaut 10 fois sa voisine de droite.
const tableUnites = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
      rows: [
        { label: "1 m", values: ["", "", "", "1", "0", "0", ""] },
        { label: "1 km", values: ["1", "0", "0", "0", "", "", ""] },
      ],
      questionLabel: "1 m = 100 cm et 1 km = 1 000 m : on complète de zéros jusqu'à la colonne voulue.",
    }}
  />
);

// Conversion 2,5 m → cm posée dans le tableau (m, dm, cm = 2, 5, 0 → 250).
const tableDeuxCinq = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
      rows: [{ label: "2,5 m", values: ["", "", "", "2", "5", "0", ""] }],
      highlight: { cell: { row: 0, col: 5 } },
      questionLabel: "On lit jusqu'à la colonne cm : 2,5 m = 250 cm.",
    }}
  />
);

// Le ruban coupé, en barre : 200 cm = 50 cm coupés + le reste cherché.
const barreRuban = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "200 cm",
      parts: [
        { label: "coupé", value: "50 cm", color: "#f59e0b" },
        { label: "reste", unknown: true, color: "#0ea5e9" },
      ],
      questionLabel: "Le ruban fait 200 cm ; on en coupe 50 cm.",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// ─── Les six dessins des blocs ────────────────────────────────────────────────
// ⭐ LE TABLEAU DE CONVERSION SERT DÉJÀ DEUX FOIS, et il est la tentation de
// cette fiche : tout y passerait. Il ne revient qu'une fois, sur l'étape de
// méthode dont le geste EST de compter des colonnes. Ailleurs, on montre ce
// qu'un tableau ne montre pas : à quoi sert chaque unité, ce que « dix fois plus
// petit » veut dire en longueur, et pourquoi deux nombres ne se comparent pas
// tant qu'ils ne sont pas dans la même unité (REGLES.md § 2 bis).

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// CHOISIR L'UNITÉ, C'EST CHOISIR L'OBJET. Le tableau de conversion aligne sept
// colonnes sans dire à quoi elles servent ; celui-ci associe chaque unité à une
// chose qu'un élève de 6e a déjà tenue dans la main.
const aQuoiSertChaqueUnite = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Quelle unité pour quoi ?",
      headers: ["Unité", "Pour mesurer"],
      rows: [
        { values: ["mm", "l'épaisseur d'une pièce"] },
        { values: ["cm", "un crayon"] },
        { values: ["m", "une salle de classe"] },
        { values: ["km", "deux villes"] },
      ],
      highlight: { col: 1 },
    }}
  />
);

// ⭐ « DIX FOIS PLUS PETIT », EN LONGUEUR. Le tableau fait glisser des chiffres
// de colonne en colonne ; la barre montre ce que ce glissement VEUT DIRE — un
// mètre, ce sont dix décimètres mis bout à bout.
const leMetreEnDixMorceaux = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ DEUX PARTS, PAS DIX. Première version : dix parts de 1 dm. Mesuré au
      // rendu, chacune faisait 20 px de large et les étiquettes sortaient du
      // cadre. Un dixième MONTRÉ contre le reste dit la même chose, en lisible.
      title: "1 dm dans 1 m",
      total: "1 m",
      parts: [
        { label: "1 dm", value: "1", color: "#f59e0b" },
        { label: "les 9 autres", value: "9", color: "#0ea5e9" },
      ],
      questionLabel: "1 dm, c'est un dixième du mètre",
      // ⚠️ Largeur sous 245, hauteur à 190 (§ 2 quater).
      size: { width: 240, height: 190 },
    }}
  />
);

// ⭐ POURQUOI ON NE COMPARE PAS DIRECTEMENT. Sur une droite graduée en
// centimètres, 150 et 140 se rangent tout seuls — mais il a fallu écrire 1,5 m
// en centimètres AVANT de pouvoir les y poser. C'est tout l'objet de la
// propriété, et aucun tableau ne le montre.
const comparerDansLaMemeUnite = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 100,
      max: 200,
      step: 25,
      points: [
        { value: 140, label: "140 cm", color: "#dc2626" },
        { value: 150, label: "1,5 m", color: "#16a34a" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 280, height: 95 },
    }}
  />,
  "1,5 m vaut 150 cm : il dépasse 140 cm"
);

// REPÉRER, C'EST VOIR QUE LES UNITÉS NE SONT PAS LES MÊMES. Le seul dessin de la
// fiche où il n'y a rien à calculer : on constate le mélange, c'est tout.
const lesUnitesMelangees = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "L'énoncé, avant tout calcul",
      headers: ["Ce qui est écrit", "Son unité"],
      rows: [
        { values: ["2 m", "des mètres"] },
        { values: ["30 cm", "des centimètres"] },
      ],
      highlight: { col: 1 },
      caption: "Deux unités différentes : on ne peut pas encore additionner.",
    }}
  />
);

// LE TABLEAU, ET SEULEMENT ICI. Convertir, c'est compter des colonnes : c'est le
// bloc dont le geste est exactement celui-là.
const convertirEnColonnes = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "2 m en centimètres",
      headers: ["km", "hm", "dam", "m", "dm", "cm", "mm"],
      rows: [{ label: "2 m", values: ["", "", "", "2", "0", "0", ""] }],
      highlight: { cell: { row: 0, col: 5 } },
      caption: "Deux colonnes à droite : 2 m = 200 cm.",
    }}
  />
);

// UNE FOIS TOUT EN CENTIMÈTRES, LE CALCUL EST UNE ADDITION ORDINAIRE. La barre
// remet les deux longueurs bout à bout — et l'unité, elle, ne se calcule pas :
// elle s'écrit dans la réponse.
const additionnerEnCentimetres = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "2 m et 30 cm",
      total: "230 cm",
      parts: [
        { label: "2 m", value: "200", color: "#0ea5e9" },
        { label: "30 cm", value: "30", color: "#f59e0b" },
      ],
      questionLabel: "200 + 30 = 230 cm",
      size: { width: 240, height: 190 },
    }}
  />
);

export const ficheLongueurs6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "aire-longueur",
  titre: "Les longueurs",
  accroche:
    "Une longueur mesure la taille d'un objet ou une distance. En 6e, on apprend à choisir la bonne unité, à convertir d'une unité à l'autre et à comparer des longueurs.",
  identite: [
    { label: "Prérequis", valeur: "Multiplier et diviser par 10, 100, 1 000" },
    { label: "Unités clés", valeur: "mm, cm, dm, m, km" },
    { label: "Outil", valeur: "Règle graduée et tableau de conversion" },
  ],
  definition: {
    texte:
      "Une longueur mesure une distance ou la taille d'un segment. On l'exprime toujours avec une unité : le mètre (m) est l'unité principale, avec ses multiples (km) et ses sous-multiples (dm, cm, mm).",
  },
  figure: {
    schema: regleMesure,
    legende: "On mesure avec une règle graduée : ce trait s'arrête sur 8, il mesure donc 8 cm.",
  },
  proprietes: [
    {
      titre: "Les unités, du mm au km",
      texte:
        "Du plus petit au plus grand : millimètre (mm), centimètre (cm), décimètre (dm), mètre (m), décamètre (dam), hectomètre (hm), kilomètre (km). On choisit l'unité adaptée : mm pour l'épaisseur d'une pièce, cm pour un crayon, m pour une salle, km pour la distance entre deux villes.",
      schema: aQuoiSertChaqueUnite,
    },
    {
      titre: "Le tableau de conversion",
      texte:
        "Chaque unité vaut 10 fois l'unité juste plus petite. Pour convertir, on multiplie par 10 à chaque colonne vers la droite (unité plus petite), on divise par 10 à chaque colonne vers la gauche (unité plus grande). Exemple : 2 m = 200 cm et 300 cm = 3 m.",
      schema: leMetreEnDixMorceaux,
    },
    {
      titre: "Comparer des longueurs",
      texte:
        "On ne peut comparer deux longueurs que dans la même unité. On convertit d'abord, puis on compare les nombres. Exemple : 1,5 m = 150 cm, donc 1,5 m est plus grand que 140 cm.",
      schema: comparerDansLaMemeUnite,
    },
  ],
  reel: {
    texte:
      "Les longueurs sont partout : la taille sur le carnet de santé, la distance d'un trajet sur le GPS, les mesures d'un meuble avant de l'acheter, la longueur d'un terrain de sport. Savoir convertir évite les erreurs : une étagère de 80 cm ne rentre pas dans un espace de 0,5 m.",
  },
  historique: {
    texte:
      "Avant, chaque région mesurait avec ses propres unités : le pied, le pouce, la toise... Impossible de se comprendre ! Pendant la Révolution française, en 1795, la France invente le mètre, une unité identique pour tous. Ce système métrique est aujourd'hui utilisé presque partout dans le monde.",
  },
  formule: {
    contexte: "Les conversions à connaître par cœur",
    expression: "1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm",
    legende: "D'une unité à sa voisine, on multiplie ou on divise par 10.",
    schema: tableUnites,
  },
  methode: [
    {
      titre: "Repérer",
      texte:
        "On lit les longueurs données dans l'énoncé et on regarde bien leurs unités. Sont-elles toutes les mêmes ?",
      schema: lesUnitesMelangees,
    },
    {
      titre: "Convertir",
      texte:
        "Si les unités sont différentes, on met tout dans la même unité : on multiplie vers une unité plus petite, on divise vers une plus grande.",
      schema: convertirEnColonnes,
    },
    {
      titre: "Calculer",
      texte:
        "Une fois dans la même unité, on peut comparer, additionner ou soustraire les longueurs. On n'oublie pas l'unité dans la réponse.",
      schema: additionnerEnCentimetres,
    },
  ],
  usages: [
    {
      titre: "Mesurer",
      detail:
        "On choisit l'unité adaptée à la taille de l'objet : mm pour ce qui est très fin, cm pour les petits objets, m pour une pièce, km pour les grandes distances.",
    },
    {
      titre: "Convertir",
      detail:
        "On change d'unité sans changer la longueur : 2 m = 200 cm, 4 km = 4 000 m, 70 mm = 7 cm. On multiplie ou on divise par 10, 100 ou 1 000.",
    },
    {
      titre: "Comparer",
      detail:
        "On met toutes les longueurs dans la même unité, puis on compare les nombres. La plus grande longueur est celle qui a le plus grand nombre.",
    },
  ],
  exemples: [
    {
      titre: "Convertir des mètres en centimètres",
      donnees: "Une corde mesure 2,5 m.",
      question: "Quelle est sa longueur en cm ?",
      schema: tableDeuxCinq,
      solution:
        "1 m = 100 cm, donc on multiplie par 100 : 2,5 × 100 = 250. La corde mesure 250 cm.",
    },
    {
      titre: "Un problème avec deux unités",
      donnees: "Un ruban mesure 2 m. On en coupe 50 cm.",
      question: "Quelle longueur reste-t-il, en cm ?",
      schema: barreRuban,
      solution:
        "On met tout en cm : 2 m = 200 cm. Puis on soustrait : 200 − 50 = 150. Il reste 150 cm de ruban.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Convertis 4 km en mètres.",
      correction:
        "1 km = 1 000 m. On multiplie par 1 000 : 4 × 1 000 = 4 000. Donc 4 km = 4 000 m.",
    },
    {
      question: "Convertis 150 cm en mètres.",
      correction:
        "100 cm = 1 m. On divise par 100 : 150 ÷ 100 = 1,5. Donc 150 cm = 1,5 m.",
    },
    {
      question: "Quel est le plus grand : 2 m ou 190 cm ?",
      correction:
        "On met tout en cm : 2 m = 200 cm. Comme 200 cm est plus grand que 190 cm, c'est 2 m le plus grand.",
    },
    {
      question:
        "Une planche de 3 m est partagée en 3 parts égales. Puis explique pourquoi on ne mesure pas une ville en centimètres.",
      correction:
        "Chaque part mesure 3 ÷ 3 = 1 m. Pour la ville : une ville est très grande, le centimètre est une unité trop petite. On choisit toujours une unité adaptée à la taille de ce qu'on mesure : ici, le kilomètre.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesLongueurs6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Longueurs - 6e",
    section: {
      type: "objectif",
      phrase: "Mesurer, convertir et comparer des longueurs",
      sousPhrase:
        "Une longueur mesure une distance ou la taille d'un segment. Elle s'exprime toujours avec une unité.",
      encadre: {
        titre: "L'idée",
        texte: "La bonne unité au bon moment : mm, cm, m ou km.",
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
          "Sa taille sur le carnet de santé, la distance d'un trajet, les mesures d'un meuble, la longueur d'un terrain de sport.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Avant 1795, chaque région mesurait en pieds, pouces ou toises. La Révolution française invente le mètre : une unité pour tous.",
      },
    },
  },
  {
    titre: "Les unités",
    badge: "Du mm au km",
    section: {
      type: "objectif",
      phrase: "1 km = 1 000 m ; 1 m = 100 cm ; 1 cm = 10 mm",
      sousPhrase:
        "mm pour ce qui est très fin, cm pour un crayon, m pour une salle, km pour une grande distance.",
      encadre: {
        titre: "La règle",
        texte: "D'une unité à sa voisine : × 10 ou ÷ 10.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheLongueurs6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon ce que l'on cherche",
    badge: "3 situations",
    section: {
      type: "cartes",
      cartes: ficheLongueurs6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Convertir",
    section: {
      type: "exemple",
      enonce: "Une corde mesure 2,5 m.",
      question: "Quelle est sa longueur en cm ?",
      correction: "1 m = 100 cm, donc 2,5 × 100 = 250. La corde mesure 250 cm.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Problème",
    section: {
      type: "exemple",
      enonce: "Un ruban mesure 2 m. On en coupe 50 cm.",
      question: "Quelle longueur reste-t-il, en cm ?",
      correction: "2 m = 200 cm, puis 200 − 50 = 150. Il reste 150 cm.",
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
      enonce: "Quel est le plus grand : 1,5 m ou 140 cm ?",
      question: "Compare les deux longueurs.",
      indice: "Mets tout dans la même unité : 1 m = 100 cm.",
      correction: "1,5 m = 150 cm. Comme 150 cm > 140 cm, c'est 1,5 m le plus grand.",
    },
  },
];
