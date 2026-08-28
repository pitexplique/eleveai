// ─── Fiche de cours : ratios et pourcentages (4e) ──────────────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/ratios.bank.ts + la part pourcentage de proportionnalite.bank.ts,
// notionId prop_ratio_pourcentage).
//
// ⭐ NOTION OUVERTE LE 28/08/2026, ET C'EST UNE SCISSION DOUBLÉE D'UN AJOUT.
// `prop_proportionnalite` portait NEUF micros et deux objets : la
// proportionnalité (reconnaître, tableau, quatrième, coefficient, problème) et
// les RAPPORTS (pourcentage, coefficient multiplicateur, évolution). La 5e avait
// déjà cette coupure, avec les mêmes identifiants.
//
// ⛔ ET LE RATIO ÉTAIT UN TROU : zéro occurrence du mot dans les vingt banques
// de 4e, alors que le BO du cycle 4 (p. 134) en fait une connaissance et lui
// consacre une compétence de partage.
//
// ⭐ LES TROIS BLOCS DE POURCENTAGE VIENNENT DE LA FICHE DE PROPORTIONNALITÉ.
// Ils y étaient écrits et mesurés ; ils la quittent avec leurs dessins, parce
// que leurs micros ont changé de notion. Rien n'a été réécrit pour le plaisir.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres de
// la fiche sortent de la banque :
//   prop_rapport          → 8 filles / 12 garçons → 2 : 3 ; sirop:eau 1 : 4
//   prop_ratio_quotients  → a et b dans le ratio 2 : 3 si a/2 = b/3
//   prop_ratio_trois      → 2 : 3 : 7, et a/2 = b/3 = c/7
//   prop_ratio_partager   → partager 120 € selon 2 : 3 : 7
//   prop_pourcentage      → 25 % = 25/100 = 1/4
//   prop_coeff_multiplicateur → + 15 % → × 1,15 ; − 15 % → × 0,85
//   prop_evolution        → 100 € + 15 % puis − 15 % = 97,75 €
//
// ⭐ SEPT DESSINS, ET CHACUN MONTRE AUTRE CHOSE — c'est la règle de la
// passation. Le camembert dit qu'un ratio est une part DU TOUT ; le tableau de
// proportionnalité relie les parts aux quantités ; la barre montre pourquoi on
// divise par la SOMME des parts ; la grille de cent carreaux fait voir le
// pourcentage ; la droite graduée dit qu'une baisse ne défait pas une hausse.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";
const ROUGE = "#dc2626";
const AMBRE = "#f59e0b";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut donc porter une vraie fraction.
 * Les libellés À L'INTÉRIEUR du dessin, eux, restent en écriture simple — ils
 * sont tracés en <text> SVG, où le LaTeX s'afficherait en clair.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⭐ UN RATIO EST UNE PART DU TOUT, et le camembert le dit sans une phrase.
// C'est aussi le pont vers la seconde moitié de la fiche : la taille du secteur
// EST le pourcentage.
const camembert = (
  data: { label: string; value: number; color?: string }[],
  largeur = 222
) => (
  <CanvasRenderer
    figure={{
      kind: "stat_graph",
      graphType: "camembert",
      data,
      display: { showValues: true, showLabels: true },
      size: { width: largeur, height: 190 },
    }}
  />
);

// LE TABLEAU QUI RELIE LES PARTS AUX QUANTITÉS. C'est ce qui transforme le ratio
// d'une description en un calcul : une ligne pour les parts, une pour le réel.
const tableauRatio = (
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

// ⚠️ Hauteur 200 : les étiquettes de parts sont posées à 144 px du haut et la
// phrase du bas à 18 px du bas — sous 180, elles se frôlent, et ça ne se voit
// QU'EN 1280. ⚠️ Et la largeur dépend du bloc : un dessin réutilisé se
// redimensionne à chaque emploi, sinon ses étiquettes passent sous 11 px.
const barre = (
  parts: { label: string; value?: string; color?: string }[],
  total: string,
  question: string,
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "schema_barre",
      size: { width: bloc === "exemple" ? 206 : 228, height: 200 },
      total,
      parts,
      questionLabel: question,
      display: { showTotal: true, showPartLabels: true, showValues: true, showQuestion: true },
    }}
  />
);

// « POUR CENT » SE COMPTE SUR CENT, et la grille de cent carreaux le dit mieux
// que la formule. 25 carreaux coloriés sur 100 : c'est un quart.
// ⭐ Ce dessin vient de la fiche de proportionnalité, où il a été mesuré.
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
const hausseDe15 = (bloc: "carte" | "exemple" = "carte") =>
  barre(
    [
      { label: "prix", value: "100", color: BLEU },
      { label: "+ 15 %", value: "15", color: ROUGE },
    ],
    "115 €",
    "d'un coup : 100 × 1,15",
    bloc
  );

// AVANT ET APRÈS, SUR LA MÊME RÈGLE. La droite graduée montre qu'une baisse de
// 15 % après une hausse de 15 % ne ramène PAS au point de départ. C'est le
// contre-exemple de la fiche, et il ne se dit pas aussi bien en mots.
const avantApres = legende(
  <CanvasRenderer
    figure={{
      kind: "number_line",
      min: 95,
      max: 120,
      step: 5,
      points: [
        { value: 100, label: "départ", color: "#64748b" },
        { value: 115, label: "+15%", color: ROUGE },
        { value: 97.75, label: "puis −15%", color: BLEU },
      ],
      display: {
        showTicks: true,
        showValues: true,
        showPoints: true,
        showPointLabels: true,
        showZero: false,
      },
      size: { width: 240, height: 100 },
    }}
  />,
  "on repart de 97,75 €, pas de 100 €"
);

export const ficheRatioPourcentage4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`. Un autre
  // nom, et le coach n'afficherait « pas de fiche » sur la notion.
  notion: "prop-ratio-pourcentage",
  titre: "Ratios et pourcentages",
  accroche:
    "Deux façons de comparer sans mesurer. Le ratio dit « tant contre tant » — 2 doses de sirop pour 3 d'eau —, le pourcentage dit « tant sur cent ». Ce sont les mêmes mathématiques vues de deux côtés, et savoir passer de l'une à l'autre est ce que la 4e demande.",
  identite: [
    { label: "Le mot de 4e", valeur: "Ratio : a et b sont dans le ratio 2 : 3 si $\\frac{a}{2} = \\frac{b}{3}$" },
    { label: "La règle du partage", valeur: "On divise d'abord par la SOMME des parts" },
    { label: "Le piège", valeur: "Une baisse de 15 % ne défait pas une hausse de 15 %" },
  ],
  definition: {
    texte:
      "Un ratio compare deux ou trois quantités par leur rapport, et s'écrit avec deux points : 2 : 3. Deux nombres a et b sont dans le ratio 2 : 3 lorsque $\\frac{a}{2} = \\frac{b}{3}$ ; trois nombres a, b, c sont dans le ratio 2 : 3 : 7 lorsque $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{7}$. Un pourcentage est un cas particulier de comparaison : une part rapportée à cent.",
  },
  figure: {
    schema: camembert([
      { label: "sirop", value: 2, color: BLEU },
      { label: "eau", value: 3, color: AMBRE },
    ]),
    legende:
      "Le ratio sirop : eau vaut 2 : 3. Le sirop occupe 2 parts sur 5, soit 40 % du mélange — le ratio et le pourcentage disent la même chose.",
  },
  proprietes: [
    {
      titre: "Un ratio compare, il ne mesure pas",
      micros: ["prop_rapport"],
      texte:
        "Le ratio 2 : 3 ne dit pas combien il y a de sirop : il dit seulement que pour 2 parts de sirop, il y a 3 parts d'eau. On le simplifie comme une fraction — 8 : 12 se réduit en 2 : 3. ⚠️ L'ordre compte : 3 : 2 désignerait le mélange inverse.",
      schema: legende(
        camembert([
          { label: "sirop", value: 8, color: BLEU },
          { label: "eau", value: 12, color: AMBRE },
        ]),
        "8 : 12, c'est le même mélange que 2 : 3",
      ),
    },
    {
      titre: "L'égalité de quotients rend le ratio calculable",
      micros: ["prop_ratio_quotients"],
      texte:
        "C'est ce que la 4e ajoute. Dire que a et b sont dans le ratio 2 : 3, c'est écrire $\\frac{a}{2} = \\frac{b}{3}$ : chaque nombre divisé par SA part donne la même chose. Ce nombre commun est la valeur d'une part — et il suffit d'une seule quantité connue pour trouver l'autre.",
      schema: tableauRatio(
        [
          ["2", "3"],
          ["10", "?"],
        ],
        [{ row: 1, col: 1 }],
        ["a", "b"],
        ["part", "quantité"]
      ),
    },
    {
      titre: "Deux parts, ou trois",
      micros: ["prop_ratio_trois"],
      texte:
        "Un ratio peut comparer trois quantités : 2 : 3 : 7 signifie $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{7}$. Les trois quotients sont égaux, donc un seul nombre connu suffit encore. Le total, lui, compte 2 + 3 + 7 = 12 parts.",
      schema: barre(
        [
          { label: "a", value: "2", color: BLEU },
          { label: "b", value: "3", color: AMBRE },
          { label: "c", value: "7", color: ROUGE },
        ],
        "12 parts",
        "ratio 2 : 3 : 7"
      ),
    },
    {
      titre: "« Pour cent » se compte sur cent",
      micros: ["prop_pourcentage"],
      texte:
        "25 %, c'est 25 parts sur 100. C'est aussi une fraction — un quart — et un coefficient : multiplier par 0,25. Un pourcentage est donc un ratio dont la seconde part vaut toujours 100.",
      schema: grilleDe25,
    },
    {
      titre: "Le coefficient multiplicateur",
      micros: ["prop_coeff_multiplicateur"],
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
      "Le ratio est le langage des mélanges et des partages. À La Réunion, c'est le mortier du maçon — un volume de ciment pour quatre de sable —, le sirop de la boutique préparé « un pour cinq », le partage d'une pêche entre trois barques selon la part de chacun. Et le pourcentage est partout dès qu'un prix bouge : les soldes à − 30 %, la TVA, une augmentation de loyer. Savoir qu'une baisse de 30 % se fait en multipliant par 0,70 évite de sortir la calculatrice deux fois.",
  },
  historique: {
    texte:
      "Le mot « ratio » est le mot latin pour « rapport », et c'est le vocabulaire d'Euclide : le livre V des Éléments, vers 300 avant notre ère, est entièrement consacré à la théorie des rapports entre grandeurs. La notation à deux points, elle, est bien plus tardive — elle est due à Leibniz, au XVIIe siècle, qui cherchait un signe qui ne se confonde pas avec la division. Le mot « pourcentage » vient de l'italien « per cento » : les banquiers de Venise comptaient déjà les intérêts sur cent.",
  },
  formule: {
    contexte: "Pour un ratio a : b : c, et pour une évolution de t %",
    expression: "a / 2 = b / 3 = c / 7   ·   hausse → × (1 + t ÷ 100)   ·   baisse → × (1 − t ÷ 100)",
    legende:
      "À gauche, l'égalité qui rend le ratio calculable : chaque nombre divisé par sa part donne la valeur d'UNE part. À droite, le coefficient part toujours de 1, parce qu'on garde le tout avant d'ajouter ou de retirer.",
    schema: legende(
      tableauRatio(
        [
          ["2", "3", "7"],
          ["20", "30", "70"],
        ],
        [],
        ["a", "b", "c"],
        ["part", "quantité"]
      ),
      "une part vaut 10 : les trois quotients le disent"
    ),
  },
  methode: [
    {
      titre: "Exprimer et simplifier un ratio",
      micros: ["prop_rapport"],
      texte:
        "On compte les deux quantités, on les écrit dans l'ordre demandé, puis on les divise par leur plus grand diviseur commun — exactement comme une fraction. ⚠️ On ne SOUSTRAIT jamais : 8 : 12 ne devient pas 6 : 10.",
    },
    {
      titre: "Partager selon un ratio",
      micros: ["prop_ratio_partager"],
      texte:
        "Trois gestes, toujours les mêmes. On additionne les parts pour connaître leur nombre total. On divise la quantité par ce total : c'est la valeur d'UNE part. On multiplie enfin par la part de chacun. ⚠️ L'erreur classique est de diviser par le nombre de personnes — 120 € selon 2 : 3 : 7 se divise par 12, pas par 3.",
      schema: barre(
        [
          { label: "2", value: "20", color: BLEU },
          { label: "3", value: "30", color: AMBRE },
          { label: "7", value: "70", color: ROUGE },
        ],
        "120 €",
        "120 ÷ 12 = 10 € la part"
      ),
    },
    {
      titre: "Appliquer un pourcentage",
      micros: ["prop_pourcentage"],
      texte:
        "On écrit le pourcentage en décimal — 25 % devient 0,25 — et on multiplie. Pour les valeurs courantes, le calcul mental est plus rapide : 25 % c'est diviser par 4, 50 % par 2, 10 % par 10.",
    },
    {
      titre: "Passer par le coefficient",
      micros: ["prop_coeff_multiplicateur", "prop_evolution"],
      texte:
        "Pour une évolution, on ne calcule pas la part puis la somme : on trouve directement le coefficient. On part de 1, on ajoute ou on retire le pourcentage écrit en décimal, et une seule multiplication suffit. Pour deux évolutions, on multiplie les deux coefficients.",
      schema: (
        <CanvasRenderer
          figure={{
            // ⛔ Pas de `size` ici : `TableauDonneesCanvasData` n'en a pas.
            // Le tableau se rend en cellules HTML, pas en <text> SVG — il suit
            // donc la largeur de son bloc tout seul, et c'est pour ça qu'aucun
            // de ses libellés ne tombe sous le plancher de 11 px.
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
      titre: "On connaît une quantité et le ratio",
      micros: ["prop_rapport", "prop_ratio_quotients"],
      detail:
        "On cherche la valeur d'une part en divisant la quantité connue par SA part, puis on multiplie par l'autre.",
    },
    {
      titre: "On connaît le total et le ratio",
      micros: ["prop_ratio_partager"],
      detail:
        "On divise le total par la SOMME des parts, ce qui donne la valeur d'une part, puis on distribue.",
    },
    {
      titre: "On veut passer du ratio au pourcentage",
      micros: ["prop_ratio_defi", "prop_pourcentage"],
      detail:
        "On rapporte la part au TOTAL des parts, pas à l'autre part. Dans un ratio 1 : 4, le premier vaut 1/5 du tout, soit 20 % — et non 25 %.",
    },
    {
      titre: "Faire évoluer un prix",
      micros: ["prop_coeff_multiplicateur", "prop_evolution"],
      detail:
        "On transforme le pourcentage en coefficient multiplicateur, puis on multiplie. Pour deux évolutions successives, on multiplie les deux coefficients entre eux.",
    },
  ],
  exemples: [
    {
      titre: "Partager 120 € selon 2 : 3 : 7",
      micros: ["prop_ratio_partager", "prop_ratio_trois"],
      donnees: "On partage 120 € entre trois personnes, selon le ratio 2 : 3 : 7.",
      question: "Combien reçoit chacune ?",
      schema: barre(
        [
          { label: "2", value: "20", color: BLEU },
          { label: "3", value: "30", color: AMBRE },
          { label: "7", value: "70", color: ROUGE },
        ],
        "120 €",
        "12 parts égales",
        "exemple"
      ),
      solution:
        "On compte d'abord les parts : 2 + 3 + 7 = 12. Une part vaut donc 120 ÷ 12 = 10 €. Il reste à multiplier : 2 × 10 = 20 €, 3 × 10 = 30 €, 7 × 10 = 70 €.\n\nContrôle : 20 + 30 + 70 = 120 €. ⚠️ Diviser par 3 parce qu'il y a trois personnes donnerait 40 € chacune — et le ratio ne serait plus respecté.",
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
  pieges: [
    "Lire un ratio 2 : 3 comme « 2 sur 3 ». C'est 2 parts CONTRE 3, donc 2 sur un total de 5.",
    "Simplifier un ratio en soustrayant. 8 : 12 devient 2 : 3 en DIVISANT les deux par 4, jamais en retirant le même nombre.",
    "Inverser l'ordre. Le ratio sirop : eau de 1 : 4 n'est pas le ratio eau : sirop.",
    "Partager en divisant par le nombre de personnes. Avec le ratio 2 : 3 : 7, on divise par 12 — la somme des parts.",
    "Rapporter une part à l'autre au lieu du tout. Dans 1 : 4, le premier vaut 20 % du mélange, pas 25 %.",
    "Multiplier par 0,15 pour une hausse de 15 %. Le coefficient part de 1 : c'est 1,15.",
    "Additionner deux évolutions. + 15 % puis − 15 % ne fait pas 0 % : il manque 2,25 %.",
  ],
  aRetenir: [
    "Un ratio compare des parts : a et b sont dans le ratio 2 : 3 lorsque $\\frac{a}{2} = \\frac{b}{3}$.",
    "Avec trois nombres : $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{7}$. Un seul nombre connu suffit à tout trouver.",
    "Partager selon un ratio : on divise par la SOMME des parts, puis on multiplie par chaque part.",
    "Un ratio se simplifie comme une fraction, en divisant les deux termes par le même nombre.",
    "Un pourcentage est une part sur cent : 25 % = $\\frac{25}{100}$ = $\\frac{1}{4}$ = × 0,25.",
    "Hausse de t % : × (1 + t ÷ 100). Baisse de t % : × (1 − t ÷ 100). Le coefficient part toujours de 1.",
    "Deux évolutions se MULTIPLIENT, elles ne s'additionnent pas.",
  ],
  entrainement: [
    {
      micros: ["prop_rapport"],
      question: "Dans une classe, il y a 8 filles et 12 garçons. Quel est le ratio filles : garçons, simplifié ?",
      correction:
        "8 et 12 se divisent tous deux par 4 : le ratio est 2 : 3. ⚠️ Écrit dans l'autre sens, 3 : 2 désignerait le ratio garçons : filles.",
    },
    {
      micros: ["prop_ratio_quotients"],
      question: "x et y sont dans le ratio 3 : 5, et x = 12. Combien vaut y ?",
      correction:
        "Le ratio signifie $\\frac{x}{3} = \\frac{y}{5}$. Or $\\frac{12}{3} = 4$ : une part vaut 4. Donc y = 5 × 4 = 20.",
    },
    {
      micros: ["prop_ratio_trois"],
      question: "a, b et c sont dans le ratio 2 : 3 : 7, et a = 8. Combien vaut c ?",
      correction:
        "Les trois quotients sont égaux : $\\frac{a}{2} = \\frac{b}{3} = \\frac{c}{7}$. Or $\\frac{8}{2} = 4$, donc une part vaut 4 et c = 7 × 4 = 28. On n'a pas eu besoin de b.",
    },
    {
      micros: ["prop_ratio_partager"],
      question: "On partage 90 € selon le ratio 2 : 3. Combien reçoit le premier ?",
      correction:
        "2 + 3 = 5 parts. Une part vaut 90 ÷ 5 = 18 €. Le premier en reçoit 2, soit 36 €. Contrôle : 36 + 54 = 90 €.",
    },
    {
      micros: ["prop_ratio_defi"],
      question: "Dans un mortier, le ratio ciment : sable est 1 : 4. Quel pourcentage du mélange est du ciment ?",
      correction:
        "Le total compte 1 + 4 = 5 parts, et le ciment en occupe 1, soit $\\frac{1}{5}$ = 20 %. ⚠️ Répondre 25 % revient à rapporter le ciment au SABLE ($\\frac{1}{4}$) et non au mélange entier.",
    },
    {
      micros: ["prop_pourcentage"],
      question: "Combien font 25 % de 80 ?",
      correction:
        "25 % c'est le quart : 80 ÷ 4 = 20. On peut aussi multiplier par 0,25, ce qui donne le même résultat.",
    },
    {
      micros: ["prop_coeff_multiplicateur"],
      question: "Une augmentation de 20 % correspond à multiplier par combien ?",
      correction:
        "Par 1,20. On part de 1, qui représente le prix entier qu'on garde, et on ajoute 20 % écrit en décimal, soit 0,20. Attention : multiplier par 0,20 donnerait seulement le montant de la hausse, pas le nouveau prix.",
    },
    {
      micros: ["prop_evolution"],
      question: "Un prix de 100 € augmente de 15 %, puis baisse de 15 %. Revient-on à 100 € ?",
      correction:
        "Non. La hausse donne 100 × 1,15 = 115 €. La baisse s'applique ensuite sur 115, et non sur 100 : 115 × 0,85 = 97,75 €. On perd 2,25 € au passage, parce que les deux pourcentages ne portent pas sur la même somme. Deux évolutions se multiplient, elles ne s'additionnent pas.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesRatioPourcentage4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Ratios et pourcentages - 4e",
    section: {
      type: "objectif",
      phrase: "Comparer sans mesurer",
      sousPhrase:
        "Le ratio dit « tant contre tant », le pourcentage dit « tant sur cent ». Ce sont les mêmes mathématiques vues de deux côtés.",
      encadre: {
        titre: "L'idée",
        texte:
          "Un ratio ne dit pas les quantités : il dit leur rapport. 2 : 3, c'est deux parts contre trois.",
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
          "Le mortier du maçon, un volume de ciment pour quatre de sable. Le sirop préparé « un pour cinq ». Le partage d'une pêche entre trois barques. Et les soldes à moins trente pour cent.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "« Ratio » est le mot latin pour « rapport », et c'est le vocabulaire d'Euclide : un livre entier des Éléments y est consacré. La notation à deux points est de Leibniz, qui cherchait un signe qu'on ne confonde pas avec la division.",
      },
    },
  },
  {
    titre: "Le mot nouveau",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "a et b dans le ratio 2 : 3, c'est a divisé par 2 égale b divisé par 3",
      sousPhrase:
        "Chaque nombre divisé par SA part donne la même chose : la valeur d'une part. C'est cette égalité qui rend le ratio calculable — sans elle, on ne sait que le décrire.",
      encadre: {
        titre: "Attention",
        texte:
          "Un ratio 2 : 3 ne se lit pas « 2 sur 3 ». C'est 2 parts contre 3, donc 2 sur un total de 5.",
      },
    },
  },
  {
    titre: "Partager selon un ratio",
    badge: "Les trois gestes",
    section: {
      type: "etapes",
      etapes: [
        "On additionne les parts. Pour 2 : 3 : 7, cela fait 12 parts.",
        "On divise la quantité par ce total. 120 euros divisés par 12, une part vaut 10 euros.",
        "On multiplie par la part de chacun : 20, 30 et 70 euros.",
        "On contrôle : la somme doit redonner la quantité de départ.",
        "⚠️ On ne divise JAMAIS par le nombre de personnes — ici 12 parts, pas 3.",
      ],
    },
  },
  {
    titre: "Du ratio au pourcentage",
    badge: "Le pont entre les deux",
    section: {
      type: "objectif",
      phrase: "On rapporte la part au TOTAL, pas à l'autre part",
      sousPhrase:
        "Dans un ratio 1 : 4, le premier vaut 1 part sur 5, soit 20 pour cent du mélange. Répondre 25 pour cent, c'est l'avoir comparé au sable au lieu du mélange entier.",
      encadre: {
        titre: "L'image",
        texte:
          "Sur un camembert, on voit la part du TOUT — c'est ce qui empêche l'erreur.",
      },
    },
  },
  {
    titre: "Les 4 réflexes",
    badge: "La méthode",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Exprimer et simplifier",
          texte:
            "On écrit les deux quantités dans l'ordre demandé, puis on divise par leur plus grand diviseur commun. Jamais en soustrayant.",
        },
        {
          titre: "Partager",
          texte:
            "Somme des parts, valeur d'une part, puis on distribue. Et on contrôle par la somme.",
        },
        {
          titre: "Appliquer un pourcentage",
          texte:
            "On écrit le pourcentage en décimal et on multiplie. 25 pour cent, c'est diviser par 4.",
        },
        {
          titre: "Passer par le coefficient",
          texte:
            "On part de 1, on ajoute ou on retire le pourcentage en décimal. Une seule multiplication suffit.",
        },
      ],
    },
  },
  {
    titre: "Le piège des deux évolutions",
    badge: "Ce qui coûte des points",
    section: {
      type: "objectif",
      phrase: "Plus 15 pour cent puis moins 15 pour cent ne fait pas zéro",
      sousPhrase:
        "La hausse donne 115 euros. La baisse s'applique ensuite sur 115, pas sur 100 : on retombe à 97,75 euros. Les deux pourcentages ne portent pas sur la même somme.",
      encadre: {
        titre: "La règle",
        texte:
          "Deux évolutions se MULTIPLIENT : 1,15 fois 0,85 égale 0,9775. Elles ne s'additionnent pas.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "On partage 120 euros entre trois personnes, selon le ratio 2 : 3 : 7.",
      question: "Combien reçoit chacune ?",
      correction:
        "2 plus 3 plus 7 font 12 parts. Une part vaut 120 divisé par 12, soit 10 euros. Chacune reçoit donc 20, 30 et 70 euros. Contrôle : la somme fait bien 120 euros.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Dans un mortier, le ratio ciment : sable est 1 : 4.",
      question: "Quel pourcentage du mélange est du ciment ?",
      indice: "Compte le nombre total de parts avant de comparer.",
      correction:
        "Le total compte 1 plus 4, soit 5 parts. Le ciment en occupe une, donc un cinquième, soit 20 pour cent. Répondre 25 pour cent, c'est avoir comparé le ciment au sable au lieu du mélange entier.",
    },
  },
];
