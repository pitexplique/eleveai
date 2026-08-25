// ─── Fiche de cours : le calcul mental (6e) ────────────────────────────────────
// Fiche « en blocs » : toute la matière vit ici, la page et les flashcards ne
// font que la rendre. Contenu neuf, calé sur la banque du coach
// lib/tutor-v4/questionBank/6e/maths/calcul-mental.bank.ts.
//
// Micro-compétences de la banque → blocs de la fiche :
// - entier_addition_mentale       → usages (carte 1), méthode, exemple 1, entraînement 1
// - entier_soustraction_mentale   → usages (carte 1), propriétés (compléments), entraînement 2
// - entier_multiplication_mentale → usages (carte 2), propriétés (tables), exemple 2
// - entier_division_mentale       → usages (carte 2), propriétés (tables), entraînement 3
// - entier_strategie_mentale      → usages (carte 3), propriétés (décomposer), pièges (×10)
// - entier_calcul_mental_defi     → bloc réel (monnaie, prix), entraînement 4

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";

// « Passer par la dizaine » MONTRÉ sur la droite graduée du coach : 47 + 8 en
// deux sauts, 47 → 50 (bleu → orange) → 55 (vert). Même dessin que les exos.
const droiteDizaine = (
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 45,
      max: 57,
      // ⚠️ MESURÉ LE 24/08 : `step: 1` posait treize graduations sur 260 px et
      // les nombres se touchaient deux à deux, à 10,3 px. Une graduation tous
      // les 3 suffit — les POINTS, eux, restent placés au nombre exact.
      step: 3,
      points: [
        { value: 47, label: "47", color: "#38BDF8" },
        { value: 50, label: "50", color: "#F97316" },
        { value: 55, label: "55", color: "#00FF7F" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 260, height: 95 },
    }}
  />
);

// Multiplier par 5 = la moitié de × 10, montré en barre : 180 coupé en deux 90.
const barreFois5 = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "180",
      parts: [
        { label: "18 × 5", value: "90", color: "#00FF7F" },
        { label: "18 × 5", value: "90", color: "#38BDF8" },
      ],
      // ⚠️ Phrase raccourcie ET cadre serré le 24/08 : sans `size`, le canvas
      // prend 340 de large et ses étiquettes tombent à 8,6 px dans un bloc de
      // 244. Sous 245, elles rendent 12 — mais alors une phrase de 47 signes
      // déborde du cadre, en silence. Les deux réglages vont ensemble.
      questionLabel: "18 × 10 = 180, sa moitié : 90",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      // ⚠️ 210, PAS 240 : mesuré le 24/08, un bloc d'EXEMPLE ne fait que 199 px
      // sur un téléphone de 375 — plus étroit qu'une carte de propriété (225).
      // C'est lui, le bloc le plus serré du site.
      size: { width: 210, height: 190 },
    }}
  />
);

// Rendre la monnaie = un complément, montré en barre : de 9 € à 10 €, il manque ?
const barreMonnaie = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      total: "10 €",
      parts: [
        { label: "les achats", value: "9 €", color: "#38BDF8" },
        { label: "rendu", unknown: true, color: "#F97316" },
      ],
      // ⚠️ 28 signes débordaient encore du cadre de 210, en silence — mesuré au
      // rendu (le texte sortait du <svg>). La phrase du bas se compte en
      // caractères, pas en px : viser vingt.
      questionLabel: "il manque combien ?",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
      size: { width: 210, height: 190 },
    }}
  />
);

// ─── Les sept dessins des blocs ───────────────────────────────────────────────
// ⛔ PAS UN SEUL `calcul_pose` SUR CETTE FICHE, et c'est le catalogue qui le dit :
// « `calcul_pose` montre une opération posée, ⛔ pas un calcul mental ». Poser
// 134 + 28 en colonnes, ce serait montrer exactement ce qu'on demande à l'élève
// de NE PAS faire. Restent trois familles de dessins — la barre (un tout qu'on
// coupe), la droite (un nombre qu'on situe) et le tableau (ce qu'on sait par
// cœur) — et sept messages différents à leur faire porter (REGLES.md § 2 bis).

/** Un dessin et sa phrase, sous lui. */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">{texte}</p>
  </div>
);

// DÉCOUPER, C'EST GARDER LE MÊME TOUT. 134 + 28 devient 134, puis 20, puis 8 :
// trois morceaux bout à bout qui refont 162. La droite graduée ne saurait pas le
// montrer — elle dessine des points, pas des morceaux (CATALOGUE.md).
const barreDecomposition = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      // ⚠️ ON COUPE LE 28, PAS LE TOUT. Première version : 162 = 134 + 20 + 8.
      // Mesuré au rendu, les deux petites parts faisaient 29 et 12 px de large —
      // « + 20 » et « + 8 » se chevauchaient. Le message est le découpage de
      // l'AJOUT : deux parts comparables, lisibles.
      title: "On coupe le 28",
      total: "28",
      parts: [
        { label: "d'abord", value: "20", color: "#F97316" },
        { label: "ensuite", value: "8", color: "#00FF7F" },
      ],
      questionLabel: "134 → 154 → 162",
      // ⚠️ Largeur sous 245 (`SchemaBarreCanvas` écrit en 12 px) et hauteur à
      // 190, sinon les étiquettes touchent la phrase du bas.
      size: { width: 240, height: 190 },
    }}
  />
);

// CE QU'ON SAIT PAR CŒUR, ET QU'ON N'A PLUS À CALCULER. Le seul dessin de la
// fiche qui ne montre aucun calcul en train de se faire : une liste apprise.
const memoDesComplements = (
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      title: "Les compléments à connaître",
      headers: ["à 10", "à 100"],
      rows: [
        { values: ["7 + 3", "70 + 30"] },
        { values: ["6 + 4", "64 + 36"] },
        { values: ["5 + 5", "55 + 45"] },
      ],
      highlight: { col: 1 },
      questionLabel: "36 pour aller à 100 : c'est 64.",
    }}
  />
);

// ⭐ LA TABLE SE LIT DANS LES DEUX SENS, ET LE TABLEAU AUSSI. De gauche à
// droite on multiplie par 7, de droite à gauche on divise : c'est la propriété
// elle-même, et aucun autre canvas de la fiche ne se lit dans deux sens.
const tableDansLesDeuxSens = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      rows: 2,
      cols: 4,
      rowLabels: ["le nombre", "× 7"],
      values: [
        ["1", "5", "9", "10"],
        ["7", "35", "63", "70"],
      ],
      missing: [],
      highlightedCells: [{ row: 1, col: 2 }],
      display: { showRowLabels: true, showColLabels: false, showGrid: true },
      size: { width: 250, height: 150 },
    }}
  />,
  "9 × 7 = 63 en descendant, 63 ÷ 7 = 9 en remontant"
);

// LE 1 DE TROP, DEVENU UNE LONGUEUR. Arrondir fait dépasser : la barre montre
// que 147 contient les 146 cherchés PLUS un petit bout à rendre.
const barreDuTropPlein = (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      title: "99 + 47 par 100 + 47",
      total: "147",
      parts: [
        { label: "la réponse", value: "146", color: "#00FF7F" },
        { label: "en trop", value: "1", color: "#F97316" },
      ],
      questionLabel: "on a ajouté 1 de trop, on l'enlève",
      size: { width: 240, height: 190 },
    }}
  />
);

// OBSERVER, C'EST VOIR LE NOMBRE ROND JUSTE À CÔTÉ. La droite ne sert ici ni à
// sauter ni à calculer : elle montre une PROXIMITÉ, 99 collé à 100.
const droiteDuNombreRond = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 95,
      max: 105,
      // Une graduation tous les 5 : à `step: 1`, les nombres à trois chiffres
      // se touchaient (mesuré).
      step: 5,
      points: [
        { value: 99, label: "99", color: "#38BDF8" },
        { value: 100, label: "100", color: "#F97316" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 260, height: 95 },
    }}
  />,
  "99 est collé à 100 : autant partir de 100"
);

// LES DEUX SAUTS, SUR D'AUTRES NOMBRES QUE LA FIGURE. La figure du cours fait
// 47 + 8 ; la méthode fait 68 + 7, les nombres de son propre texte.
const droiteDesDeuxSauts = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 65,
      max: 80,
      step: 5,
      points: [
        { value: 68, label: "68", color: "#38BDF8" },
        { value: 70, label: "70", color: "#F97316" },
        { value: 75, label: "75", color: "#00FF7F" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 260, height: 95 },
    }}
  />,
  "68 + 2 pour atteindre 70, puis + 5"
);

// ⭐ VÉRIFIER, C'EST REGARDER DE LOIN. La même droite, mais déroulée sur 140 :
// 69 est là où on l'attendait, 129 est visiblement hors sujet. Aucun calcul —
// juste l'ordre de grandeur, qui est tout l'objet de la troisième étape.
const droiteDeLOrdreDeGrandeur = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 0,
      max: 140,
      step: 20,
      points: [
        { value: 69, label: "69", color: "#00FF7F" },
        { value: 129, label: "129", color: "#F87171" },
      ],
      display: { showTicks: true, showValues: true, showPoints: true, showPointLabels: true },
      size: { width: 280, height: 95 },
    }}
  />,
  "96 − 27 : un peu moins de 70. 129 est impossible."
);

const pieges = [
  "Multiplier par 10 un nombre à virgule en ajoutant un zéro : 4,23 × 10 = 42,3 et pas 4,230. C'est la virgule qui se déplace.",
  "Poser l'opération dans sa tête chiffre par chiffre : c'est lent et on se trompe. On décompose plutôt en nombres simples.",
  "Oublier de corriger quand on arrondit : si on calcule 121 - 40 au lieu de 121 - 38, il faut rajouter 2 à la fin.",
];

const aRetenir = [
  "Calculer de tête, c'est décomposer : on passe par les dizaines et les nombres ronds.",
  "Les tables de multiplication servent aussi pour diviser : 8 × 7 = 56 donc 56 ÷ 8 = 7.",
  "Double = fois 2, moitié = divisé par 2, et × 10 ou ÷ 10 déplace la virgule d'un rang.",
];

export const ficheCalculMental6e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "6e",
  notion: "entier-calcul-mental",
  titre: "Le calcul mental",
  accroche:
    "Le calcul mental, c'est trouver un résultat de tête, sans poser l'opération ni sortir la calculatrice. Le secret n'est pas d'avoir une mémoire d'éléphant : c'est de connaître quelques astuces pour rendre les calculs plus simples.",
  identite: [
    { label: "Prérequis", valeur: "Les quatre opérations, les tables de multiplication" },
    { label: "Idée clé", valeur: "Décomposer les nombres pour calculer plus vite" },
    { label: "Outil", valeur: "Aucun : juste ta tête (et un peu d'entraînement)" },
  ],
  definition: {
    texte:
      "Calculer mentalement, c'est calculer de tête, sans poser l'opération sur le papier. On transforme le calcul en une suite d'étapes simples : on décompose les nombres, on passe par des nombres ronds, on s'appuie sur les tables que l'on connaît par cœur.",
  },
  figure: {
    schema: droiteDizaine,
    legende:
      "47 + 8, en deux sauts : d'abord + 3 pour atteindre 50 (un nombre rond), puis + 5. On arrive à 55.",
  },
  proprietes: [
    {
      titre: "Décomposer les nombres",
      micros: ["entier_strategie_mentale"],
      texte:
        "On peut couper un nombre en morceaux plus simples sans changer le résultat. Pour 134 + 28, on ajoute d'abord 20 (154), puis 8 (162). Chaque étape est facile.",
      schema: barreDecomposition,
    },
    {
      titre: "S'appuyer sur les compléments à 10 et à 100",
      micros: ["entier_addition_mentale", "entier_soustraction_mentale"],
      texte:
        "Les nombres ronds sont nos amis. 47 + 8 : on complète à 50 (47 + 3), puis on ajoute le reste (+ 5). Et pour 100 - 36, on cherche ce qui manque à 36 pour faire 100 : c'est 64.",
      schema: memoDesComplements,
    },
    {
      titre: "Connaître ses tables dans les deux sens",
      micros: ["entier_multiplication_mentale", "entier_division_mentale"],
      texte:
        "Une table sert à multiplier et à diviser. Si on sait que 9 × 7 = 63, alors on sait aussi que 63 ÷ 9 = 7. Une seule table apprise, deux calculs gagnés.",
      schema: tableDansLesDeuxSens,
    },
    {
      titre: "Arrondir puis corriger",
      micros: ["entier_strategie_mentale"],
      texte:
        "On peut remplacer un nombre par un nombre rond proche, puis corriger. Pour 99 + 47, on calcule 100 + 47 = 147, puis on enlève le 1 de trop : 146.",
      schema: barreDuTropPlein,
    },
  ],
  reel: {
    texte:
      "Le calcul mental sert tous les jours : vérifier la monnaie qu'on te rend à la boulangerie, estimer le prix total de tes courses avant de passer en caisse, partager équitablement des fruits ou des cartes entre amis, ou savoir à quelle heure finit un film qui dure 1 h 25. Pas de calculatrice dans la file d'attente !",
  },
  historique: {
    texte:
      "Bien avant la calculatrice, on calculait déjà de tête et avec les doigts. Il y a plus de 2000 ans, les marchands utilisaient le boulier, un cadre à boules inventé en Asie, pour compter très vite. Les premières calculatrices de poche ne sont arrivées que vers 1970 : pendant des siècles, le calcul mental était le seul moyen de calculer partout.",
  },
  methode: [
    {
      titre: "Observer",
      micros: ["entier_strategie_mentale"],
      texte:
        "Avant de calculer, on regarde les nombres : y a-t-il un nombre rond tout proche ? Une table que je connais ? Un double ou une moitié ?",
      schema: droiteDuNombreRond,
    },
    {
      titre: "Décomposer",
      micros: ["entier_addition_mentale"],
      texte:
        "On coupe le calcul en étapes simples : les dizaines d'abord, puis les unités. Ou on passe par la dizaine suivante (68 + 7 : d'abord + 2, puis + 5).",
      schema: droiteDesDeuxSauts,
    },
    {
      titre: "Vérifier",
      micros: ["entier_soustraction_mentale"],
      texte:
        "On se demande si le résultat est raisonnable : 96 - 27 doit donner un peu moins de 70. Si on trouve 129, c'est qu'on s'est trompé quelque part.",
      schema: droiteDeLOrdreDeGrandeur,
    },
  ],
  usages: [
    {
      titre: "Addition et soustraction mentales",
      micros: ["entier_addition_mentale", "entier_soustraction_mentale"],
      detail:
        "On passe par les dizaines : 56 + 8, c'est 56 + 4 = 60 puis + 4 = 64. Pour soustraire, pareil : 83 - 7, c'est 83 - 3 = 80 puis - 4 = 76.",
    },
    {
      titre: "Multiplication et division mentales",
      micros: ["entier_multiplication_mentale", "entier_division_mentale"],
      detail:
        "Les tables d'abord : 6 × 8 = 48, donc 48 ÷ 6 = 8. Pour × 5, on fait × 10 puis on prend la moitié : 18 × 5 = 180 ÷ 2 = 90.",
    },
    {
      titre: "Les stratégies malines",
      micros: ["entier_strategie_mentale"],
      detail:
        "Double (× 2), moitié (÷ 2), quart (÷ 4). Et × 10 ou ÷ 10 : la virgule se déplace d'un rang (4,23 × 10 = 42,3 ; 645 ÷ 10 = 64,5).",
    },
  ],
  exemples: [
    {
      titre: "Une addition en passant par la dizaine",
      micros: ["entier_addition_mentale"],
      donnees: "On veut calculer 47 + 8 de tête.",
      question: "Combien font 47 + 8 ?",
      schema: droiteDizaine,
      solution:
        "Stratégie : on complète d'abord jusqu'à la dizaine. 47 + 3 = 50. Il restait 8 à ajouter et on en a déjà mis 3, il reste donc 5. 50 + 5 = 55. Donc 47 + 8 = 55.",
    },
    {
      titre: "Une multiplication par 5 sans souffrir",
      micros: ["entier_multiplication_mentale"],
      donnees: "On veut calculer 18 × 5 de tête.",
      question: "Combien font 18 × 5 ?",
      schema: barreFois5,
      solution:
        "Stratégie : multiplier par 5, c'est multiplier par 10 puis prendre la moitié. 18 × 10 = 180. La moitié de 180 est 90. Donc 18 × 5 = 90.",
    },
    {
      titre: "Rendre la monnaie",
      micros: ["entier_soustraction_mentale"],
      donnees: "Tu achètes pour 9 € et tu paies avec un billet de 10 €.",
      question: "Combien te rend-on ?",
      schema: barreMonnaie,
      solution:
        "Stratégie : rendre la monnaie, c'est chercher le complément. De 9 à 10, il manque 1. On te rend donc 1 €.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Calcule de tête : 99 + 15.",
      correction:
        "Stratégie : 99 est tout proche de 100. On calcule 100 + 15 = 115, puis on enlève le 1 ajouté en trop : 115 - 1 = 114. Donc 99 + 15 = 114.",
    },
    {
      question: "Calcule de tête : 121 - 38.",
      correction:
        "Stratégie : on arrondit 38 à 40. 121 - 40 = 81. On a enlevé 2 de trop, donc on les rajoute : 81 + 2 = 83. Donc 121 - 38 = 83.",
    },
    {
      question: "Calcule de tête : 96 ÷ 8.",
      correction:
        "Stratégie : on cherche dans la table de 8 le nombre qui donne 96. On sait que 8 × 10 = 80, et il manque 16, soit 8 × 2. Donc 8 × 12 = 96, et 96 ÷ 8 = 12.",
      micros: ["entier_division_mentale"],
    },
    {
      question:
        "À la boulangerie, tu achètes un pain à 2 €, un croissant à 1 € et un gâteau à 6 €. Tu paies avec un billet de 10 €. Combien te rend-on ?",
      correction:
        "Stratégie : on additionne d'abord les prix : 2 + 1 + 6 = 9 €. Puis on cherche le complément à 10 : il manque 1 pour aller de 9 à 10. On te rend donc 1 €.",
      micros: ["entier_calcul_mental_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=6e",
};

export const slidesCalculMental6e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Calcul mental - 6e",
    section: {
      type: "objectif",
      phrase: "Calculer de tête, sans poser l'opération",
      sousPhrase:
        "Le calcul mental n'est pas un don : c'est une boîte à astuces que tout le monde peut apprendre.",
      encadre: {
        titre: "L'idée",
        texte: "On décompose les nombres pour transformer un calcul difficile en étapes faciles.",
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
          "Vérifier la monnaie rendue, estimer un prix total avant la caisse, partager en parts égales, calculer une heure de fin.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Il y a plus de 2000 ans, les marchands comptaient déjà très vite avec le boulier. La calculatrice de poche, elle, n'existe que depuis 1970 environ.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheCalculMental6e.methode.map((m) => ({
        titre: m.titre,
        texte: m.texte,
      })),
    },
  },
  {
    titre: "Selon l'opération",
    badge: "3 familles",
    section: {
      type: "cartes",
      cartes: ficheCalculMental6e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Passer par la dizaine",
    section: {
      type: "exemple",
      enonce: "On veut calculer 47 + 8 de tête.",
      question: "Combien font 47 + 8 ?",
      correction: "47 + 3 = 50, puis 50 + 5 = 55. Donc 47 + 8 = 55.",
    },
  },
  {
    titre: "Autre exemple",
    badge: "Multiplier par 5",
    section: {
      type: "exemple",
      enonce: "On veut calculer 18 × 5 de tête.",
      question: "Combien font 18 × 5 ?",
      correction: "18 × 10 = 180, et la moitié de 180 est 90. Donc 18 × 5 = 90.",
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
      enonce: "Tu achètes un pain à 2 €, un croissant à 1 € et un gâteau à 6 €. Tu paies avec 10 €.",
      question: "Combien te rend-on ?",
      indice: "Additionne les prix, puis cherche le complément à 10.",
      correction: "2 + 1 + 6 = 9 €, et de 9 à 10 il manque 1. On te rend 1 €.",
    },
  },
];
