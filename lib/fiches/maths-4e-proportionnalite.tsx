// ─── Fiche de cours : la proportionnalité (4e) ─────────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/proportionnalite.bank.ts, notionId prop_proportionnalite).
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE (règle de Frédéric,
// 26/08). Ce que la banque travaille vraiment, énoncé par énoncé :
//   prop_reconnaitre          → « Quelle situation est proportionnelle ? »
//   prop_table                → « si 2 → 10, alors 4 → ? »
//   prop_coeff                → « Si 4 → 20, quel est le coefficient ? »
//   prop_quatrieme            → « Si 3 kg coûtent 12 €, combien coûtent 5 kg ? »
// ⭐ SCINDÉE LE 28/08/2026 : les micros `prop_pourcentage`,
// `prop_coeff_multiplicateur` et `prop_evolution` sont passées dans la notion
// `prop_ratio_pourcentage`, et leurs blocs les ont suivies dans la fiche
// `maths-4e-ratio-pourcentage.tsx` — avec leurs dessins déjà mesurés.
// ⛔ Rien n'a été supprimé : un bloc ne peut citer que des micros de SA
// notion, et `verifier-micros` le refuse.
//   prop_probleme             → « 4 cahiers coûtent 12 €. Combien coûtent… »
//   prop_defi                 → « Un élève dit : si 2 → 6, alors 5 → 9 car j'ajoute 3 »
// Tous les nombres de la fiche sortent de cette liste, sans exception.
//
// ⭐ LE DÉFI DE LA BANQUE EST LE CONTRE-EXEMPLE DE LA FICHE, et il ouvre les
// propriétés. « J'ajoute 3 » est l'erreur reine de la notion : un tableau où l'on
// ajoute toujours la même chose est parfaitement RÉGULIER, et pourtant pas
// proportionnel. C'est la régularité qui trompe, pas le désordre — et ça ne se
// dit pas, ça se montre.
//
// ⭐ SIX CANVAS, CHOISIS POUR CE QU'ILS MONTRENT :
//   · la correspondance et son coefficient → `tableau_proportionnalite` ;
//   · le tableau régulier mais FAUX       → `tableau_donnees`, l'autre tableau ;
//   · le produit en croix                 → `calcul_pose` ;
//   · « pour cent » se compte sur cent    → `fraction`, modèle `grid` ;
//   · une hausse est une PART ajoutée     → `schema_barre` ;
//   · avant et après, sur la même règle   → `number_line`.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter une vraie fraction.
 * Les libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// LE TABLEAU DE PROPORTIONNALITÉ DU COACH, avec sa case vide et son coefficient.
// C'est l'objet de la notion : deux lignes qui se correspondent, et un seul
// nombre qui relie l'une à l'autre.
const tableauProp = (
  valeurs: string[][],
  manquantes: { row: number; col: number }[],
  colonnes: string[],
  lignes: string[]
) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      size: { width: 228, height: 150 },
      rows: valeurs.length,
      cols: valeurs[0].length,
      rowLabels: lignes,
      colLabels: colonnes,
      values: valeurs,
      missing: manquantes,
      display: { showRowLabels: true, showColLabels: true, showMissing: true, showGrid: true },
    }}
  />
);

// ⭐ LE CONTRE-EXEMPLE, ET C'EST LE DESSIN LE PLUS UTILE DE LA FICHE. Ce tableau
// est parfaitement RÉGULIER — on ajoute 3 à chaque fois — et il n'est pas
// proportionnel. C'est la régularité qui trompe. On le dessine avec l'AUTRE
// tableau, `tableau_donnees`, pour qu'il ne ressemble pas à un tableau de
// proportionnalité : la forme dit déjà que ce n'en est pas un.
const tableauQuiTrompe = legende(
  <CanvasRenderer
    figure={{
      kind: "tableau_donnees",
      headers: ["si…", "alors…", "on est passé de… à"],
      rows: [
        { values: ["2", "6", "+ 4"] },
        { values: ["5", "9", "+ 4"] },
        { values: ["mais 6 ÷ 2 = 3", "et 9 ÷ 5 = 1,8", "≠"] },
      ],
      highlight: { row: 2 },
      caption: "régulier, mais pas proportionnel",
      display: { compact: true, striped: true },
    }}
  />,
  "on ajoute toujours pareil, et pourtant c'est faux"
);

// LE PRODUIT EN CROIX, POSÉ. Une fois le tableau écrit, il reste un calcul, et
// l'ordre compte : on multiplie en croix AVANT de diviser.
const produitEnCroix = (
  <CanvasRenderer
    figure={{
      kind: "calcul_pose",
      operation: "multiplication",
      numbers: ["5", "12"],
      result: "60",
      display: { showResult: true, compact: true },
      questionLabel: "puis 60 ÷ 3 = 20 €",
    }}
  />
);

const pieges = [
  "Prendre un tableau régulier pour un tableau proportionnel : ajouter toujours le même nombre n'est PAS multiplier toujours par le même nombre.",
  "Appliquer le produit en croix SANS avoir vérifié que la situation est proportionnelle : le calcul donne alors un résultat faux sans prévenir.",
  "Confondre le coefficient et l'écart : de 2 à 10 on multiplie par 5, on n'ajoute pas 8. C'est le rapport qui doit être constant, pas la différence.",
];

const aRetenir = [
  "Deux grandeurs sont proportionnelles quand on passe de l'une à l'autre en MULTIPLIANT toujours par le même nombre : le coefficient de proportionnalité.",
  "Une quatrième proportionnelle se calcule par le produit en croix : on multiplie les deux nombres opposés, puis on divise par le troisième.",
  "Une évolution en pourcentage se fait d'un seul coup avec un coefficient multiplicateur : + 15 % donne × 1,15, et − 15 % donne × 0,85.",
];

export const ficheProportionnalite4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  notion: "prop-proportionnalite",
  titre: "La proportionnalité",
  accroche:
    "Deux grandeurs sont proportionnelles quand un seul nombre suffit à passer de l'une à l'autre. C'est ce qui permet de calculer le prix de cinq kilos quand on connaît celui de trois — et, en 4e, de traiter les pourcentages et les hausses de prix d'un seul coup.",
  identite: [
    { label: "Le mot clé", valeur: "Multiplier toujours par le même nombre" },
    { label: "L'outil", valeur: "Le produit en croix, et le coefficient multiplicateur" },
    { label: "Le piège", valeur: "Un tableau régulier n'est pas forcément proportionnel" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles lorsqu'on passe de l'une à l'autre en multipliant toujours par le même nombre. Ce nombre s'appelle le coefficient de proportionnalité. Dans un tableau, cela signifie que chaque valeur de la seconde ligne s'obtient en multipliant celle du dessus par ce même coefficient.",
  },
  figure: {
    schema: tableauProp(
      [
        ["2", "4"],
        ["10", "20"],
      ],
      [],
      ["1re valeur", "2e valeur"],
      ["départ", "arrivée"]
    ),
    legende: "2 devient 10, et 4 devient 20 : on multiplie toujours par 5.",
  },
  proprietes: [
    {
      titre: "Régulier ne veut pas dire proportionnel",
      micros: ["prop_reconnaitre", "prop_defi"],
      texte:
        "Ici on ajoute 4 à chaque fois : le tableau est parfaitement régulier. Mais 6 ÷ 2 = 3 et 9 ÷ 5 = 1,8 : le rapport change, donc ce n'est pas proportionnel.",
      schema: tableauQuiTrompe,
    },
    {
      titre: "La quatrième proportionnelle",
      micros: ["prop_quatrieme", "prop_table"],
      texte:
        "Trois valeurs connues, une manquante : on multiplie les deux nombres placés en diagonale, puis on divise par le troisième. C'est le produit en croix.",
      schema: produitEnCroix,
    },
    // ⭐ TROIS PROPRIÉTÉS SONT PARTIES LE 28/08/2026 vers la fiche « Ratios et
    // pourcentages » : « Pour cent se compte sur cent », « Le coefficient
    // multiplicateur » et « Deux évolutions ne s'additionnent pas ». Leurs
    // micros ont changé de notion avec la scission, et un bloc ne peut citer
    // que des micros de SA notion — `verifier-micros` le refuse.
    // ⛔ Rien n'a été supprimé : les trois blocs sont dans la fiche voisine,
    // avec leurs dessins mesurés.
    {
      titre: "Le coefficient de proportionnalité",
      micros: ["prop_coeff"],
      texte:
        "C'est LE nombre de la notion : celui par lequel on multiplie pour passer d'une ligne à l'autre. On le trouve en divisant une valeur de la seconde ligne par celle du dessus — et il doit donner le même résultat sur toutes les colonnes, sinon la situation n'est pas proportionnelle.",
      schema: tableauProp(
        [
          ["2", "4"],
          ["10", "20"],
        ],
        [],
        ["A", "B"],
        ["quantité", "prix (€)"]
      ),
    },
  ],
  reel: {
    texte:
      "La proportionnalité est le calcul le plus fréquent d'une journée. À La Réunion, c'est le prix au kilo au marché de Saint-Paul, la recette qu'on double, l'échelle d'une carte de randonnée, la consommation d'une voiture aux 100 km. Et le coefficient multiplicateur est partout dès qu'un prix bouge : les soldes à − 30 %, la TVA, une augmentation de loyer. Savoir qu'une baisse de 30 % se fait en multipliant par 0,70 évite de sortir la calculatrice deux fois.",
  },
  historique: {
    texte:
      "La règle de trois est enseignée depuis l'Antiquité, mais c'est le commerce médiéval qui l'a rendue centrale : les marchands italiens du XIIIe siècle l'appelaient « la règle d'or », et Leonardo Fibonacci lui consacre un chapitre entier de son Liber Abaci en 1202. Le mot « pourcentage », lui, vient de l'italien « per cento » — les banquiers de Venise comptaient déjà les intérêts sur cent.",
  },
  formule: {
    contexte: "Pour une évolution en pourcentage",
    expression: "hausse de t % → × (1 + t ÷ 100)   ·   baisse de t % → × (1 − t ÷ 100)",
    legende:
      "Le coefficient part toujours de 1, parce qu'on garde le tout avant d'ajouter ou de retirer. C'est pourquoi une hausse donne un nombre plus grand que 1, et une baisse un nombre plus petit.",
    // ⛔ Pas de schéma ici : la barre de la propriété « Le coefficient
    // multiplicateur » montre déjà exactement ce que dit la formule — le tout,
    // puis la part ajoutée. Un dessin qui répète n'apprend rien (Frédéric, 25/08).
  },
  methode: [
    {
      titre: "Vérifier",
      micros: ["prop_reconnaitre"],
      // Un bloc peut rester sans dessin quand le dessin redirait le texte : le
      // contre-exemple de la première propriété fait déjà ce travail.
      texte:
        "Avant tout calcul, on divise chaque valeur de la seconde ligne par celle du dessus. Si on obtient toujours le même nombre, c'est proportionnel — et ce nombre est le coefficient. Sinon, aucune des règles qui suivent ne s'applique.",
    },
    {
      titre: "Calculer en croix",
      micros: ["prop_quatrieme", "prop_probleme"],
      texte:
        "On range les quatre nombres dans un tableau à deux lignes, en respectant les unités. On multiplie les deux nombres en diagonale de la case vide, puis on divise par le troisième.",
      schema: tableauProp(
        [
          ["3", "5"],
          ["12", "?"],
        ],
        [{ row: 1, col: 1 }],
        ["kg", "kg"],
        ["masse", "prix (€)"]
      ),
    },
    {
      // ⭐ Ce bloc portait « Passer par le coefficient » (multiplicateur), parti
      // avec les pourcentages. Il traite désormais le RETOUR À L'UNITÉ, qui est
      // l'autre chemin de la proportionnalité et appartient bien à cette notion.
      titre: "Revenir à l'unité",
      micros: ["prop_coeff", "prop_table"],
      texte:
        "Quand le produit en croix intimide, on cherche ce que vaut UNE unité : on divise, puis on multiplie par la quantité voulue. C'est plus long d'un calcul, mais on comprend chaque étape — et c'est la méthode à utiliser quand on doit calculer plusieurs valeurs de suite.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            headers: ["masse", "prix", "on fait"],
            rows: [
              { values: ["3 kg", "12 €", "on part de là"] },
              { values: ["1 kg", "4 €", "÷ 3"] },
              { values: ["5 kg", "20 €", "× 5"] },
            ],
            highlight: { row: 1 },
            caption: "l'unité d'abord, la quantité ensuite",
            display: { compact: true, striped: true },
          }}
        />
      ),
    },
  ],
  usages: [
    {
      titre: "Reconnaître une situation",
      micros: ["prop_reconnaitre"],
      detail:
        "On calcule le rapport entre les deux lignes pour chaque colonne. S'il est constant, c'est proportionnel ; s'il change, on ne peut appliquer aucune règle de proportionnalité.",
    },
    {
      titre: "Calculer une valeur manquante",
      micros: ["prop_quatrieme", "prop_table"],
      detail:
        "On utilise le produit en croix, ou le coefficient si on l'a déjà trouvé. Les deux donnent le même résultat — le coefficient est plus rapide quand on a plusieurs valeurs à calculer.",
    },
    {
      titre: "Le problème n'annonce pas qu'il est proportionnel",
      micros: ["prop_probleme", "prop_defi"],
      detail:
        "C'est à l'élève de le décider. On cherche si doubler l'une double l'autre : le prix suit la masse, mais l'âge ne suit pas la taille. Sans cette vérification, toutes les règles suivantes donnent un résultat faux sans prévenir.",
    },
  ],
  exemples: [
    {
      titre: "Le prix des cinq kilos",
      micros: ["prop_quatrieme", "prop_probleme"],
      donnees: "Au marché, 3 kg de letchis coûtent 12 €.",
      question: "Combien coûtent 5 kg ?",
      schema: tableauProp(
        [
          ["3", "5"],
          ["12", "?"],
        ],
        [{ row: 1, col: 1 }],
        ["kg", "kg"],
        ["masse", "prix (€)"]
      ),
      solution:
        "Le prix est proportionnel à la masse. On range les valeurs dans un tableau, puis on fait le produit en croix : 5 × 12 = 60, et 60 ÷ 3 = 20. Les 5 kg coûtent 20 €. Contrôle par le coefficient : 12 ÷ 3 = 4 € le kilo, et 5 × 4 = 20 €. Les deux chemins donnent le même résultat.",
    },
    {
      // ⭐ Remplace « Vingt-cinq pour cent », parti avec les pourcentages. Le
      // contre-exemple est le meilleur exercice de cette notion : la
      // proportionnalité se décide AVANT de calculer.
      titre: "Est-ce seulement proportionnel ?",
      micros: ["prop_reconnaitre", "prop_defi"],
      donnees: "Un plombier facture 50 € de déplacement, puis 30 € par heure. Pour 2 h il demande 110 €, pour 4 h il demande 170 €.",
      question: "Le prix est-il proportionnel à la durée ?",
      schema: tableauQuiTrompe,
      solution:
        "Non. On divise chaque prix par sa durée : 110 ÷ 2 = 55, mais 170 ÷ 4 = 42,5. Le rapport change, donc ce n'est pas proportionnel.\n\nLa cause est le forfait de 50 € : il ne double pas quand la durée double. ⚠️ Aucune règle de proportionnalité ne s'applique ici — ni produit en croix, ni coefficient. C'est pourquoi la vérification passe TOUJOURS avant le calcul.",
    },
    {
      titre: "Le retour à l'unité",
      micros: ["prop_coeff", "prop_table"],
      donnees: "Six bouteilles d'eau coûtent 4,50 €.",
      question: "Combien coûtent dix bouteilles ?",
      schema: tableauProp(
        [
          ["6", "1", "10"],
          ["4,50", "?", "?"],
        ],
        [
          { row: 1, col: 1 },
          { row: 1, col: 2 },
        ],
        ["six", "une", "dix"],
        ["bouteilles", "prix (€)"]
      ),
      solution:
        "On cherche d'abord le prix d'UNE bouteille : 4,50 ÷ 6 = 0,75 €. Puis on multiplie par dix : 0,75 × 10 = 7,50 €.\n\nContrôle par le coefficient : il vaut 0,75 € par bouteille, et il est le même sur les trois colonnes — la situation est bien proportionnelle.",
    },
  ],
  pieges,
  aRetenir,
  entrainement: [
    {
      question: "Dans un tableau de proportionnalité, si 2 → 10, alors 4 → ?",
      correction:
        "Le coefficient vaut 10 ÷ 2 = 5. Donc 4 devient 4 × 5 = 20. On peut aussi remarquer que 4 est le double de 2, donc le résultat est le double de 10.",
      micros: ["prop_table", "prop_coeff"],
    },
    {
      question:
        "Un élève dit : « Si 2 → 6, alors 5 → 9, car j'ajoute 3. » A-t-il raison ?",
      correction:
        "Non. Il a repéré une régularité, mais la proportionnalité se fait en MULTIPLIANT, pas en ajoutant. Ici le rapport vaut 6 ÷ 2 = 3 d'un côté, et il devrait donc valoir 3 partout : 5 devrait donner 5 × 3 = 15, et non 9. Avec sa méthode, le rapport 9 ÷ 5 = 1,8 est différent de 3.",
      micros: ["prop_reconnaitre", "prop_defi"],
    },
    {
      // Les deux exercices de pourcentage sont partis avec leur notion ; ceux-ci
      // travaillent ce qui reste : le coefficient et le problème.
      question:
        "Un cycliste roule à vitesse constante et parcourt 24 km en 2 h. Quelle distance parcourt-il en 5 h ?",
      correction:
        "À vitesse constante, la distance est proportionnelle au temps. Le coefficient vaut 24 ÷ 2 = 12 km par heure. Donc 5 × 12 = 60 km. Par le produit en croix : 5 × 24 = 120, puis 120 ÷ 2 = 60 km.",
      micros: ["prop_coeff", "prop_probleme"],
    },
    {
      question:
        "Un abonnement coûte 15 € par mois, plus 20 € d'inscription payés une fois. Le prix total est-il proportionnel au nombre de mois ?",
      correction:
        "Non. Pour 2 mois : 20 + 30 = 50 €, soit 25 € par mois. Pour 4 mois : 20 + 60 = 80 €, soit 20 € par mois. Le rapport change, donc ce n'est pas proportionnel — c'est l'inscription, payée une seule fois, qui casse la proportionnalité.",
      micros: ["prop_reconnaitre", "prop_defi"],
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesProportionnalite4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "La proportionnalité - 4e",
    section: {
      type: "objectif",
      phrase: "Un seul nombre pour passer d'une grandeur à l'autre",
      sousPhrase:
        "Le coefficient de proportionnalité. Et, en 4e, le coefficient multiplicateur pour les hausses et les baisses.",
      encadre: {
        titre: "L'idée",
        texte: "Proportionnel, c'est MULTIPLIER toujours par le même nombre.",
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
          "Le prix au kilo au marché de Saint-Paul, une recette qu'on double, l'échelle d'une carte, les soldes à − 30 %.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Les marchands italiens du XIIIe siècle appelaient la règle de trois « la règle d'or ». « Pourcentage » vient de « per cento », chez les banquiers de Venise.",
      },
    },
  },
  {
    titre: "Le piège du tableau régulier",
    badge: "À ne jamais oublier",
    section: {
      type: "objectif",
      phrase: "Ajouter toujours pareil n'est PAS être proportionnel",
      sousPhrase:
        "« Si 2 → 6 alors 5 → 9, car j'ajoute 3 » : le tableau est régulier, et pourtant faux. 6 ÷ 2 = 3, mais 9 ÷ 5 = 1,8.",
      encadre: {
        titre: "Le test",
        texte: "On divise chaque valeur du bas par celle du haut : le résultat doit être constant.",
      },
    },
  },
  {
    titre: "Le coefficient multiplicateur",
    badge: "La nouveauté de 4e",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Une hausse",
        contenu:
          "+ 15 % donne × 1,15. On part de 1 — le tout qu'on garde — et on ajoute 0,15.",
      },
      droite: {
        variante: "info",
        titre: "Une baisse",
        contenu:
          "− 15 % donne × 0,85. On part de 1 et on retire 0,15. Le coefficient est plus petit que 1.",
      },
    },
  },
  {
    titre: "Les 3 réflexes",
    badge: "Méthode",
    section: {
      type: "cartes",
      cartes: ficheProportionnalite4e.methode.map((m) => ({
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
      cartes: ficheProportionnalite4e.usages.map((u) => ({
        titre: u.titre,
        texte: u.detail,
      })),
    },
  },
  {
    titre: "Exemple guidé",
    badge: "Le prix des cinq kilos",
    section: {
      type: "exemple",
      enonce: "3 kg de letchis coûtent 12 €.",
      question: "Combien coûtent 5 kg ?",
      correction:
        "Produit en croix : 5 × 12 = 60, puis 60 ÷ 3 = 20. Les 5 kg coûtent 20 €.",
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
      enonce: "Un prix de 100 € augmente de 15 %, puis baisse de 15 %.",
      question: "Revient-on à 100 € ?",
      indice: "La baisse s'applique sur le nouveau prix, pas sur l'ancien.",
      correction:
        "Non : 100 × 1,15 = 115, puis 115 × 0,85 = 97,75 €. Deux évolutions se multiplient.",
    },
  },
];
