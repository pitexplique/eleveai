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
//   prop_pourcentage          → « 25 % d'une quantité correspond à… »
//   prop_coeff_multiplicateur → « Une augmentation de 20 % correspond à multiplier par… »
//   prop_evolution            → « Un prix de 100 € augmente de 15 %. Nouveau prix ? »
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

// « POUR CENT » SE COMPTE SUR CENT, et la grille de cent carreaux le dit mieux
// que la formule. 25 carreaux coloriés sur 100 : c'est un quart.
const grilleDe25 = legende(
  <CanvasRenderer
    figure={{
      kind: "fraction",
      model: "grid",
      size: { width: 200, height: 190 },
      grid: { rows: 10, cols: 10, shaded: 25 },
    }}
  />,
  "25 sur 100, soit $\\frac{1}{4}$"
);

// UNE HAUSSE EST UNE PART AJOUTÉE AU TOUT. 100 € qui augmentent de 15 %, c'est
// 100 puis 15 bout à bout — et le total, 115, s'obtient d'un coup en multipliant
// par 1,15. La barre montre pourquoi le coefficient dépasse 1.
// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent (mesuré en 1280).
// ⚠️ LA LARGEUR DÉPEND DU BLOC, parce que ce dessin sert DEUX FOIS : dans une
// carte de propriété (222 px) et dans un exemple (200 px). Avec un seul cadre,
// ses étiquettes tombaient à 10,6 px dans l'exemple — sous le plancher de 11.
// Un dessin réutilisé se redimensionne à chaque emploi.
const hausseDe15 = (bloc: "carte" | "exemple" = "carte") => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: bloc === "exemple" ? 206 : 228, height: 200 },
      total: "115 €",
      parts: [
        { label: "prix", value: "100", color: BLEU },
        { label: "+ 15 %", value: "15", color: ROUGE },
      ],
      questionLabel: "d'un coup : 100 × 1,15",
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// AVANT ET APRÈS, SUR LA MÊME RÈGLE. La droite graduée montre que la hausse est
// un DÉPLACEMENT, et surtout qu'une baisse de 15 % après une hausse de 15 % ne
// ramène pas au point de départ — l'erreur classique des évolutions successives.
const avantApres = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 80,
      max: 130,
      step: 10,
      points: [
        { value: 100, label: "avant", color: BLEU },
        { value: 115, label: "après", color: ROUGE },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: false,
      },
      size: { width: 260, height: 95 },
    }}
  />,
  "+ 15 % puis − 15 % ne ramène PAS à 100"
);

const pieges = [
  "Prendre un tableau régulier pour un tableau proportionnel : ajouter toujours le même nombre n'est PAS multiplier toujours par le même nombre.",
  "Ajouter le pourcentage au coefficient : une hausse de 20 % ne se fait pas en multipliant par 20, ni par 0,20, mais par 1,20.",
  "Croire qu'une baisse de 15 % annule une hausse de 15 % : 100 devient 115, puis 115 × 0,85 = 97,75. On ne revient pas au départ.",
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
    {
      titre: "« Pour cent » se compte sur cent",
      micros: ["prop_pourcentage"],
      texte:
        "25 %, c'est 25 parts sur 100. C'est aussi une fraction — un quart — et un coefficient : multiplier par 0,25.",
      schema: grilleDe25,
    },
    {
      titre: "Le coefficient multiplicateur",
      micros: ["prop_coeff", "prop_coeff_multiplicateur"],
      texte:
        "Augmenter de 15 %, c'est garder le tout ET ajouter 15 parts sur 100 : on multiplie donc par 1,15, pas par 0,15. Une baisse de 15 % donne 1 − 0,15 = 0,85.",
      schema: hausseDe15(),
    },
    {
      titre: "Deux évolutions ne s'additionnent pas",
      micros: ["prop_evolution"],
      texte:
        "Une hausse de 15 % suivie d'une baisse de 15 % ne ramène pas au prix de départ : on multiplie par 1,15 puis par 0,85, soit par 0,9775. Il manque 2,25 %.",
      schema: avantApres,
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
      titre: "Passer par le coefficient",
      micros: ["prop_coeff_multiplicateur", "prop_evolution"],
      texte:
        "Pour une évolution, on ne calcule pas la part puis la somme : on trouve directement le coefficient. On part de 1, on ajoute ou on retire le pourcentage écrit en décimal, et une seule multiplication suffit.",
      schema: (
        <CanvasRenderer
          figure={{
            kind: "tableau_donnees",
            headers: ["évolution", "le coefficient"],
            rows: [
              { values: ["+ 20 %", "× 1,20"] },
              { values: ["+ 15 %", "× 1,15"] },
              { values: ["− 15 %", "× 0,85"] },
              { values: ["− 30 %", "× 0,70"] },
            ],
            caption: "on part toujours de 1",
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
      titre: "Faire évoluer un prix",
      micros: ["prop_pourcentage", "prop_coeff_multiplicateur", "prop_probleme"],
      detail:
        "On transforme le pourcentage en coefficient multiplicateur, puis on multiplie. Pour deux évolutions successives, on multiplie les deux coefficients entre eux.",
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
      titre: "Vingt-cinq pour cent",
      micros: ["prop_pourcentage"],
      donnees: "On veut prendre 25 % d'une quantité.",
      question: "À quoi cela correspond-il ?",
      schema: grilleDe25,
      solution:
        "25 %, c'est 25 parts sur 100, donc la fraction $\\frac{25}{100}$, qui se simplifie en $\\frac{1}{4}$. Prendre 25 % d'une quantité revient donc à en prendre le quart, c'est-à-dire à multiplier par 0,25 — ou, plus simple de tête, à diviser par 4.",
    },
    {
      titre: "Le prix qui augmente",
      micros: ["prop_evolution", "prop_coeff_multiplicateur"],
      donnees: "Un article coûte 100 €. Son prix augmente de 15 %.",
      question: "Quel est le nouveau prix ?",
      schema: hausseDe15("exemple"),
      solution:
        "Augmenter de 15 %, c'est garder les 100 % du prix et ajouter 15 % : le coefficient multiplicateur vaut 1 + 0,15 = 1,15. On calcule 100 × 1,15 = 115. Le nouveau prix est de 115 €. ⚠️ On ne multiplie pas par 0,15, ce qui donnerait seulement la hausse, ni par 15, qui n'a aucun sens.",
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
      question: "Une augmentation de 20 % correspond à multiplier par combien ?",
      correction:
        "Par 1,20. On part de 1, qui représente le prix entier qu'on garde, et on ajoute 20 % écrit en décimal, soit 0,20. Attention : multiplier par 0,20 donnerait seulement le montant de la hausse, pas le nouveau prix.",
      micros: ["prop_coeff_multiplicateur"],
    },
    {
      question:
        "Un prix de 100 € augmente de 15 %, puis baisse de 15 %. Revient-on à 100 € ?",
      correction:
        "Non. La hausse donne 100 × 1,15 = 115 €. La baisse s'applique ensuite sur 115, et non sur 100 : 115 × 0,85 = 97,75 €. On perd 2,25 € au passage, parce que les deux pourcentages ne portent pas sur la même somme. Deux évolutions se multiplient, elles ne s'additionnent pas.",
      micros: ["prop_evolution", "prop_probleme"],
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
