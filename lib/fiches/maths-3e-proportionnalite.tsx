// ─── Fiche de cours : proportionnalité et grandeurs quotients (3e) ────────────
// Fiche « en blocs » alignée sur la banque du coach
// (3e/maths/proportionnalite.bank.ts, notionId `prop_proportionnalite`, 66 items).
//
// ⛔⛔ LA MESURE DU MATIN ÉTAIT FAUSSE, ET IL A FALLU LA REFAIRE. Le relevé de
// recouvrement 3e/4e comparait les micros de `prop_proportionnalite` en 3e à
// celles de `prop_proportionnalite` en 4e, et concluait « 4 micros propres :
// pourcentage, évolution, vitesse-débit, défi ». ⚠️ Mais LA 4e ÉCLATE LA
// PROPORTIONNALITÉ SUR DEUX NOTIONS : `prop-proportionnalite` ET
// `prop-ratio-pourcentage`, qui a sa propre fiche et couvre déjà
// `prop_pourcentage`, `prop_evolution` et jusqu'au COEFFICIENT MULTIPLICATEUR.
// Comparer les identifiants sur TOUTE la classe de 4e donne le vrai chiffre :
//     prop_reconnaitre   déjà en 4e      prop_pourcentage   déjà en 4e
//     prop_table         déjà en 4e      prop_evolution     déjà en 4e
//     prop_quatrieme     déjà en 4e      prop_defi          déjà en 4e
//     prop_vitesse_debit ⭐ PROPRE À LA 3e — la seule
// 👉 LA LEÇON, PLUS UTILE QUE LE RÉSULTAT : comparer les micros d'une notion à
// celles de SON HOMONYME en 4e ne suffit pas. Il faut les comparer à toute la
// classe, parce que le découpage en notions change d'une année à l'autre.
//
// ⭐ D'OÙ L'AXE DE CETTE FICHE : LES GRANDEURS QUOTIENTS. Vitesse, débit,
// densité — trois grandeurs qui n'en sont pas vraiment, puisque chacune est le
// RAPPORT de deux autres. C'est le seul contenu neuf de l'année, et c'est aussi
// ce que le brevet demande le plus souvent. Le reste est un rappel dense, qui
// renvoie aux deux fiches de 4e plutôt que de les refaire.
//
// ⭐ ET LES ÉVOLUTIONS SUCCESSIVES, qui méritent leur propriété même si
// `prop_evolution` existe en 4e : les items de 3e portent précisément sur
// l'ENCHAÎNEMENT, que la banque pose trois fois — « +20 % puis −20 % revient-il
// au prix de départ ? » (non), « +10 % puis +20 % font-ils +30 % ? » (non). La
// réponse tient dans un produit de coefficients, et nulle part ailleurs.
//
// ⭐ LES 66 ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE — la règle du 31/08 :
//   prop_reconnaitre   → le périmètre du carré oui, son aire non
//   prop_table         → le coefficient, et compléter
//   prop_quatrieme     → le produit en croix
//   prop_pourcentage   → p % de n, et une part exprimée en %
//   prop_evolution     → le coefficient multiplicateur, ×1,25 et ×0,8
//   prop_vitesse_debit → v = d ÷ t, le débit, la densité
//   prop_defi          → les enchaînements, et comparer deux offres
//
// ⚠️ LES PLAGES DU GRAPHIQUE SONT CELLES VÉRIFIÉES LE 02/09 — x[0, 6] et
// y[−4, 9], propres dans les deux formats de bloc. Voir le commentaire de
// `maths-3e-fonctions.tsx` : au-delà de 13 unités de haut, le canvas n'écrit
// plus qu'une graduation sur deux, ce qui dégage le coin et espace les
// ordonnées.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

/**
 * Un dessin et sa phrase, sous lui.
 * ⭐ La phrase passe par `TexteMath` : elle peut porter du LaTeX.
 */
const legende = (dessin: React.ReactNode, texte: string) => (
  <div>
    {dessin}
    <p className="mt-1 text-center text-xs font-black text-slate-600">
      <TexteMath>{texte}</TexteMath>
    </p>
  </div>
);

// ⚠️ Aucun emplacement de fiche ne dépasse 225 px, y compris en 1280 — mesuré
// par `scripts/mesurer-largeurs-blocs.mjs`. Les largeurs restent donc 222 pour
// une carte, 216 pour « La formule », 200 pour un exemple.
const tableau = (
  data: Record<string, unknown>,
  bloc: "carte" | "exemple" | "formule" = "carte"
) => (
  <CanvasRenderer
    figure={
      {
        kind: "tableau_donnees",
        display: { compact: true, striped: true },
        size: {
          width: bloc === "exemple" ? 200 : bloc === "formule" ? 216 : 222,
        },
        ...data,
      } as never
    }
  />
);

/** Le tableau de proportionnalité, avec ses cases à trouver. */
const tableauProp = (
  lignes: string[],
  valeurs: string[][],
  manquantes: { row: number; col: number }[],
  bloc: "carte" | "exemple" = "carte"
) => (
  <CanvasRenderer
    figure={{
      kind: "tableau_proportionnalite",
      size: { width: bloc === "exemple" ? 200 : 222, height: 150 },
      rows: valeurs.length,
      cols: valeurs[0].length,
      rowLabels: lignes,
      values: valeurs,
      missing: manquantes,
      display: {
        showRowLabels: true,
        showColLabels: false,
        showMissing: true,
        showGrid: true,
      },
    }}
  />
);

export const ficheProportionnalite3e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "3e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "prop-proportionnalite",
  titre: "Proportionnalité, pourcentages et grandeurs quotients",
  accroche:
    "Une voiture roule à 90 km/h. Ce nombre n'est ni une distance ni une durée : c'est le RAPPORT des deux, et il ne se lit sur aucun compteur autrement que par ce rapport. Vitesse, débit, densité — la troisième introduit ces grandeurs d'un genre particulier, qui ne sont mesurables qu'en divisant. Elles ne sont pas un chapitre à part : ce sont des coefficients de proportionnalité, portant simplement un nom.",
  identite: [
    { label: "Le coefficient", valeur: "Un seul nombre relie les deux grandeurs, par multiplication" },
    { label: "Une évolution", valeur: "Augmenter de $25\\,\\%$, c'est multiplier par $1{,}25$" },
    { label: "Le piège", valeur: "$+20\\,\\%$ puis $-20\\,\\%$ ne ramène PAS au prix de départ" },
  ],
  definition: {
    texte:
      "Deux grandeurs sont proportionnelles lorsqu'on passe de l'une à l'autre en multipliant toujours par le MÊME nombre, appelé coefficient de proportionnalité. Une grandeur quotient est ce coefficient quand il porte un nom : la vitesse relie une distance à une durée, le débit un volume à une durée, la densité une population à une surface. Dire qu'une voiture roule à $90$ km/h signifie exactement que la distance parcourue est proportionnelle au temps écoulé, avec $90$ pour coefficient.",
  },
  figure: {
    schema: tableauProp(
      ["temps (h)", "distance (km)"],
      [
        ["1", "2", "3", "4"],
        ["90", "180", "270", "?"],
      ],
      [{ row: 1, col: 3 }]
    ),
    legende:
      "Chaque heure ajoute les mêmes 90 kilomètres : c'est la définition même d'une vitesse constante. Le coefficient est $90$, et la case manquante vaut $360$.",
  },
  proprietes: [
    {
      titre: "Reconnaître : une droite qui passe par l'origine",
      texte:
        "Représentée graphiquement, une situation proportionnelle donne toujours une droite passant par l'ORIGINE — car zéro de l'une correspond à zéro de l'autre. Tout autre tracé signale une situation qui ne l'est pas. Le contre-exemple à retenir tient en deux figures : le périmètre d'un carré est proportionnel à son côté, mais son AIRE ne l'est pas, puisque doubler le côté quadruple l'aire.",
      schema: legende(
        <CanvasRenderer
          figure={
            {
              kind: "fonctionGraphique",
              grille: true,
              size: { width: 222, height: 200 },
              xmin: 0,
              xmax: 6,
              ymin: -4,
              ymax: 9,
              courbes: [
                { id: "prop", type: "lineaire", a: 2, couleur: "#0284c7" },
                {
                  id: "aire",
                  type: "points",
                  points: [
                    { x: 0, y: 0 },
                    { x: 1, y: 1 },
                    { x: 2, y: 4 },
                    { x: 3, y: 9 },
                  ],
                  couleur: "#e11d48",
                },
              ],
            } as never
          }
        />,
        "La bleue est une droite : c'est proportionnel. La rose se redresse : elle ne l'est pas."
      ),
      micros: ["prop_reconnaitre"],
    },
    {
      titre: "Le coefficient se lit sur une seule colonne",
      texte:
        "Dans un tableau de proportionnalité, le coefficient s'obtient en divisant une valeur de la seconde ligne par celle qui la surmonte. Si $4 \\to 28$, le coefficient vaut $28 \\div 4 = 7$, et il permet alors de compléter n'importe quelle autre colonne. Un seul couple suffit donc à connaître toute la situation — c'est précisément ce qui distingue la proportionnalité d'une simple régularité.",
      schema: legende(
        tableauProp(
          ["quantité", "prix (€)"],
          [
            ["4", "6", "10"],
            ["28", "?", "?"],
          ],
          [
            { row: 1, col: 1 },
            { row: 1, col: 2 },
          ]
        ),
        "Le coefficient vaut $7$ : les cases manquantes sont $42$ et $70$."
      ),
      micros: ["prop_table"],
    },
    {
      titre: "La quatrième proportionnelle : le produit en croix",
      texte:
        "Quand trois valeurs d'un tableau sont connues, la quatrième se trouve par le produit en croix. De $\\dfrac{4}{6} = \\dfrac{x}{9}$, on tire $6x = 4 \\times 9$, donc $x = 6$. C'est le même outil que le coefficient, en plus court quand celui-ci ne tombe pas juste — et il évite alors les arrondis intermédiaires, qui faussent le résultat.",
      schema: legende(
        tableau({
          headers: ["on connaît", "on cherche"],
          rows: [
            { values: ["4 / 6 = x / 9", "6x = 36"] },
            { values: ["on divise", "x = 6"] },
          ],
          highlight: { row: 1 },
          caption: "les produits en croix sont égaux",
        }),
        "On multiplie en diagonale, puis on divise par le nombre restant."
      ),
      micros: ["prop_quatrieme"],
    },
    {
      titre: "Un pourcentage est un coefficient déguisé",
      texte:
        "Calculer $p\\,\\%$ d'un nombre, c'est le multiplier par $\\dfrac{p}{100}$ : $20\\,\\%$ de $150$ vaut $150 \\times 0{,}20 = 30$. En sens inverse, exprimer une part en pourcentage revient à diviser la part par le total, puis à multiplier par $100$ : $12$ élèves sur $25$ font $\\dfrac{12}{25} \\times 100 = 48\\,\\%$. ⛔ Un pourcentage n'a de sens que RAPPORTÉ à son total ; « $30\\,\\%$ de $200$ » ne vaut pas $30$, mais $60$.",
      schema: legende(
        tableau({
          headers: ["calcul", "on fait", "résultat"],
          rows: [
            { values: ["20 % de 150", "× 0,20", "30"] },
            { values: ["12 sur 25", "÷ 25 × 100", "48 %"] },
            { values: ["30 % de 200", "× 0,30", "60"] },
          ],
          highlight: { row: 2 },
          caption: "jamais 30",
        }),
        "Le pourcentage ne dit rien tout seul : il faut savoir de QUOI il est le pourcentage."
      ),
      micros: ["prop_pourcentage"],
    },
    {
      titre: "Une évolution est une multiplication",
      texte:
        "Augmenter de $25\\,\\%$, ce n'est pas ajouter $25$ : c'est multiplier par $1 + 0{,}25 = 1{,}25$. Diminuer de $20\\,\\%$, c'est multiplier par $1 - 0{,}20 = 0{,}80$. Ce nombre s'appelle le coefficient multiplicateur, et il transforme un raisonnement en deux étapes en une seule opération. Un prix de $80$ € augmenté de $25\\,\\%$ vaut donc $80 \\times 1{,}25 = 100$ €.",
      schema: legende(
        tableau({
          headers: ["évolution", "coefficient"],
          rows: [
            { values: ["+ 25 %", "× 1,25"] },
            { values: ["− 20 %", "× 0,80"] },
            { values: ["+ 100 %", "× 2"] },
            { values: ["− 50 %", "× 0,50"] },
          ],
          caption: "on part toujours de 1",
        }),
        "Un coefficient supérieur à 1 fait monter ; inférieur à 1, il fait descendre."
      ),
      micros: ["prop_evolution"],
    },
    {
      titre: "Deux évolutions se MULTIPLIENT, jamais ne s'additionnent",
      texte:
        "C'est le piège central du chapitre, et le seul contenu que la 4e n'aborde pas. Enchaîner deux évolutions revient à multiplier leurs coefficients. Une hausse de $20\\,\\%$ suivie d'une baisse de $20\\,\\%$ donne $1{,}20 \\times 0{,}80 = 0{,}96$ : le prix a perdu $4\\,\\%$, il n'est pas revenu à son point de départ. De même, $+10\\,\\%$ puis $+20\\,\\%$ donne $1{,}10 \\times 1{,}20 = 1{,}32$, soit $+32\\,\\%$ et non $+30\\,\\%$.",
      schema: legende(
        tableau({
          headers: ["enchaînement", "le calcul", "au total"],
          rows: [
            { values: ["+20 % puis −20 %", "1,20 × 0,80", "− 4 %"] },
            { values: ["+10 % puis +20 %", "1,10 × 1,20", "+ 32 %"] },
            { values: ["−50 % puis +50 %", "0,50 × 1,50", "− 25 %"] },
          ],
          highlight: { row: 0 },
          caption: "les pourcentages ne s'ajoutent pas",
        }),
        "La baisse porte sur un prix DÉJÀ augmenté : elle enlève donc davantage."
      ),
      micros: ["prop_defi", "prop_evolution"],
    },
    {
      titre: "La vitesse moyenne, un rapport qui porte un nom",
      texte:
        "La vitesse moyenne est le quotient de la distance par la durée : $v = \\dfrac{d}{t}$. Une voiture parcourant $180$ km en $3$ h roule donc à $60$ km/h. L'unité le dit d'ailleurs elle-même — « kilomètres PAR heure » est une division écrite en toutes lettres. Les deux autres formules s'en déduisent sans rien apprendre de plus : $d = v \\times t$, et $t = \\dfrac{d}{v}$.",
      schema: legende(
        tableauProp(
          ["durée (h)", "distance (km)"],
          [
            ["1", "2", "3"],
            ["60", "120", "?"],
          ],
          [{ row: 1, col: 2 }]
        ),
        "À vitesse constante, la distance est proportionnelle au temps : la case vaut $180$."
      ),
      micros: ["prop_vitesse_debit"],
    },
    {
      titre: "Débit et densité suivent exactement la même logique",
      texte:
        "Un débit est un volume divisé par une durée : $24$ L en $4$ min font $6$ L/min. Une densité est une quantité divisée par une surface : $300$ arbres sur $6$ hectares font $50$ arbres par hectare. Dans les trois cas — vitesse, débit, densité — l'unité contient un « par » qui indique la division, et la grandeur obtenue est le coefficient de proportionnalité entre les deux autres.",
      schema: legende(
        tableau({
          headers: ["grandeur", "c'est", "unité"],
          rows: [
            { values: ["vitesse", "distance ÷ durée", "km/h"] },
            { values: ["débit", "volume ÷ durée", "L/min"] },
            { values: ["densité", "nombre ÷ surface", "par ha"] },
          ],
          caption: "le « par » dit la division",
        }),
        "L'unité est le mode d'emploi : lire « kilomètres par heure », c'est lire la formule."
      ),
      micros: ["prop_vitesse_debit"],
    },
  ],
  reel: {
    texte:
      "Les grandeurs quotients décident de la vie quotidienne à La Réunion. La vitesse limite sur la route du littoral, le débit d'une ravine en saison des pluies — qui dit en litres par seconde si elle va déborder —, la densité de population qui explique pourquoi Saint-Denis se déplace autrement que Cilaos. Et les évolutions successives sont l'outil qu'on subit le plus souvent sans le nommer : une remise de $30\\,\\%$ appliquée après une hausse de $30\\,\\%$ ne rend pas le prix initial, et un commerçant qui l'annonce ainsi n'a pas menti — c'est l'acheteur qui a fait une addition là où il fallait une multiplication.",
  },
  historique: {
    texte:
      "L'idée qu'une vitesse est un NOMBRE, et non une simple impression de rapidité, est étonnamment tardive. Elle se met en place au XIVᵉ siècle avec Nicole Oresme, à Paris, qui a l'idée de représenter une grandeur variable par une figure : le temps en abscisse, la vitesse en ordonnée, et l'aire obtenue donnant la distance parcourue. C'est le premier graphique de fonction de l'histoire, trois siècles avant Descartes, et il naît précisément d'un problème de grandeur quotient. Avant lui, on comparait les mouvements ; après lui, on les calcule.",
  },
  formule: {
    contexte: "Les trois grandeurs quotients du programme",
    expression:
      "v = \\dfrac{d}{t} \\qquad D = \\dfrac{V}{t} \\qquad d = \\dfrac{N}{S}",
    legende:
      "Trois formules, un seul geste : diviser la grandeur qui varie par celle qui la mesure. ⚠️ Et l'unité doit suivre le calcul — des kilomètres divisés par des heures donnent des km/h. Une unité incohérente est le signe le plus sûr d'une division faite à l'envers.",
    schema: legende(
      tableau(
        {
          headers: ["on cherche", "on calcule"],
          rows: [
            { values: ["la vitesse", "d ÷ t"] },
            { values: ["la distance", "v × t"] },
            { values: ["la durée", "d ÷ v"] },
          ],
          caption: "une formule, trois lectures",
        },
        "formule"
      ),
      "Les deux dernières se retrouvent depuis la première : rien de plus à apprendre."
    ),
  },
  methode: [
    {
      titre: "Vérifier la proportionnalité avant de l'utiliser",
      texte:
        "On calcule le rapport sur DEUX colonnes au moins. S'il est le même, la situation est proportionnelle ; s'il diffère, aucune des méthodes du chapitre ne s'applique. Une régularité — ajouter toujours le même nombre — ne suffit pas : elle ne donne pas une droite passant par l'origine.",
      micros: ["prop_reconnaitre", "prop_table"],
    },
    {
      titre: "Passer par le coefficient multiplicateur",
      texte:
        "Pour toute évolution, on écrit d'abord le coefficient : $1 + \\dfrac{p}{100}$ pour une hausse, $1 - \\dfrac{p}{100}$ pour une baisse. Le calcul se fait ensuite en une seule multiplication, et surtout les enchaînements deviennent un simple produit.",
      micros: ["prop_evolution"],
    },
    {
      titre: "Ne jamais additionner deux pourcentages",
      texte:
        "Dès qu'un énoncé enchaîne deux évolutions, on multiplie les coefficients. Le contrôle est immédiat : si le produit dépasse 1, l'ensemble est une hausse ; s'il est inférieur, une baisse — quelle que soit l'apparence des deux taux.",
      micros: ["prop_defi"],
    },
    {
      titre: "Se laisser guider par l'unité",
      texte:
        "L'unité demandée dit quelle division faire : des km/h se calculent en divisant des kilomètres par des heures. ⚠️ Et les unités doivent être cohérentes AVANT le calcul — des minutes mélangées à des heures donnent un résultat faux sans que rien ne le signale.",
      micros: ["prop_vitesse_debit"],
    },
    {
      titre: "Comparer deux offres par le prix unitaire",
      texte:
        "Trois cahiers à $6$ € ou cinq à $9$ € ? On ramène chacune au prix d'un seul : $2$ € contre $1{,}80$ €. C'est la seule comparaison honnête, et c'est encore une grandeur quotient — des euros par cahier.",
      micros: ["prop_defi"],
    },
  ],
  usages: [
    {
      titre: "On me demande si c'est proportionnel",
      detail:
        "Je calcule le rapport sur deux colonnes différentes. Identiques : oui. Sinon : non, et je le justifie par le contre-exemple.",
      micros: ["prop_reconnaitre"],
    },
    {
      titre: "Il manque une valeur dans un tableau",
      detail:
        "Je cherche le coefficient sur une colonne complète, ou j'utilise le produit en croix si le coefficient ne tombe pas juste.",
      micros: ["prop_table", "prop_quatrieme"],
    },
    {
      titre: "On me parle d'une hausse ou d'une baisse",
      detail:
        "J'écris le coefficient multiplicateur, puis je multiplie. S'il y a deux évolutions, je multiplie les deux coefficients.",
      micros: ["prop_evolution", "prop_defi"],
    },
    {
      titre: "L'énoncé mêle une distance et une durée",
      detail:
        "C'est une vitesse. Je vérifie d'abord la cohérence des unités, puis je divise selon ce que l'unité demandée indique.",
      micros: ["prop_vitesse_debit"],
    },
    {
      titre: "On me demande de comparer deux offres",
      detail: "Je ramène chacune à une unité — le prix d'un seul article — et je compare alors.",
      micros: ["prop_defi"],
    },
  ],
  exemples: [
    {
      titre: "La hausse suivie de la baisse",
      donnees: "Un article coûte 200 €. Son prix augmente de 20 %, puis diminue de 20 %.",
      question: "Le prix final est-il égal au prix de départ ?",
      solution:
        "Non, et le calcul le montre en deux lignes. La hausse multiplie par $1{,}20$ : le prix passe à $200 \\times 1{,}20 = 240$ €. La baisse s'applique alors à CE prix, et non au prix initial : $240 \\times 0{,}80 = 192$ €. Le prix final est donc de $192$ €, soit $8$ € de moins qu'au départ. On peut aussi le voir d'un coup : $1{,}20 \\times 0{,}80 = 0{,}96$, c'est-à-dire une baisse globale de $4\\,\\%$. La raison est simple à dire — la baisse de $20\\,\\%$ porte sur une somme plus grande que la hausse, donc elle retire davantage qu'elle n'avait ajouté.",
      schema: legende(
        tableau(
          {
            headers: ["étape", "prix"],
            rows: [
              { values: ["départ", "200 €"] },
              { values: ["× 1,20", "240 €"] },
              { values: ["× 0,80", "192 €"] },
            ],
            highlight: { row: 2 },
            caption: "au total : × 0,96",
          },
          "exemple"
        ),
        "Le prix ne revient pas : il a perdu 4 %."
      ),
      micros: ["prop_defi", "prop_evolution"],
    },
    {
      titre: "La vitesse moyenne",
      donnees: "Une voiture parcourt 180 km en 3 h.",
      question: "Quelle est sa vitesse moyenne ?",
      solution:
        "L'unité demandée est le km/h, ce qui indique la division à faire : des kilomètres divisés par des heures. On calcule $180 \\div 3 = 60$, donc la vitesse moyenne est de $60$ km/h. Le contrôle se fait dans l'autre sens : à $60$ km/h pendant $3$ h, la voiture parcourt $60 \\times 3 = 180$ km. C'est bien la distance de départ.",
      micros: ["prop_vitesse_debit"],
    },
    {
      titre: "Une part exprimée en pourcentage",
      donnees: "Dans une classe de 25 élèves, 12 sont demi-pensionnaires.",
      question: "Quel pourcentage cela représente-t-il ?",
      solution:
        "On divise la part par le total, puis on multiplie par 100 : $\\dfrac{12}{25} = 0{,}48$, donc $48\\,\\%$. Le contrôle de plausibilité est immédiat — 12 est un peu moins que la moitié de 25, et $48\\,\\%$ est un peu moins que $50\\,\\%$. Un résultat supérieur à $100\\,\\%$ signalerait qu'on a divisé à l'envers.",
      micros: ["prop_pourcentage"],
    },
    {
      titre: "Deux offres de cahiers",
      donnees: "L'offre A propose 3 cahiers pour 6 €, l'offre B en propose 5 pour 9 €.",
      question: "Laquelle a le prix unitaire le plus bas ?",
      solution:
        "On ramène chaque offre au prix d'UN cahier, ce qui est encore une grandeur quotient — des euros par cahier. Pour A : $6 \\div 3 = 2$ € l'unité. Pour B : $9 \\div 5 = 1{,}80$ € l'unité. L'offre B est donc la moins chère. ⚠️ Comparer les prix totaux — 6 € contre 9 € — n'aurait aucun sens, puisqu'ils ne portent pas sur le même nombre de cahiers.",
      micros: ["prop_defi"],
    },
  ],
  pieges: [
    "Écrire « $30\\,\\%$ de $200 = 30$ ». Un pourcentage se calcule TOUJOURS par rapport au total : $200 \\times 0{,}30 = 60$.",
    "Croire qu'augmenter de $20\\,\\%$ revient à ajouter $20$. C'est multiplier par $1{,}20$, et le résultat dépend donc de la valeur de départ.",
    "Additionner deux évolutions : $+10\\,\\%$ puis $+20\\,\\%$ ne fait pas $+30\\,\\%$ mais $+32\\,\\%$, car les coefficients se multiplient.",
    "Croire qu'une hausse annulée par une baisse du même taux ramène au prix initial : $1{,}20 \\times 0{,}80 = 0{,}96$, soit $4\\,\\%$ de perte.",
    "Prendre une régularité pour une proportionnalité. Un tableau où l'on ajoute toujours 3 est régulier, mais sa droite ne passe pas par l'origine.",
    "Croire que l'aire d'un carré est proportionnelle à son côté. Doubler le côté quadruple l'aire ; seul le PÉRIMÈTRE est proportionnel.",
    "Mélanger les unités dans un calcul de vitesse : des minutes et des heures dans la même division donnent un résultat faux, sans aucun signal.",
  ],
  aRetenir: [
    "Proportionnel signifie : on multiplie toujours par le même coefficient.",
    "Le graphique d'une situation proportionnelle est une droite passant par l'origine.",
    "$p\\,\\%$ d'un nombre, c'est ce nombre multiplié par $\\dfrac{p}{100}$.",
    "Augmenter de $p\\,\\%$ : multiplier par $1 + \\dfrac{p}{100}$. Diminuer : par $1 - \\dfrac{p}{100}$.",
    "Deux évolutions successives se MULTIPLIENT : elles ne s'additionnent jamais.",
    "$v = \\dfrac{d}{t}$, et l'unité km/h dit elle-même la division à faire.",
    "Débit et densité fonctionnent exactement comme la vitesse.",
  ],
  entrainement: [
    {
      question: "L'aire d'un carré est-elle proportionnelle à la longueur de son côté ?",
      correction:
        "Non. Un côté de 2 donne une aire de 4, un côté de 4 donne une aire de 16 : le côté a doublé, l'aire a quadruplé. Le rapport n'est pas constant. En revanche le périmètre, lui, est bien proportionnel au côté.",
      micros: ["prop_reconnaitre"],
    },
    {
      question: "Dans un tableau de proportionnalité, $4 \\to 28$. Quel est le coefficient ?",
      correction:
        "$28 \\div 4 = 7$. Toutes les autres colonnes s'obtiennent alors en multipliant par 7.",
      micros: ["prop_table"],
    },
    {
      question: "Résoudre $\\dfrac{4}{6} = \\dfrac{x}{9}$.",
      correction:
        "Par le produit en croix : $6x = 4 \\times 9 = 36$, donc $x = 6$. Contrôle : $\\dfrac{4}{6}$ et $\\dfrac{6}{9}$ valent tous deux $\\dfrac{2}{3}$.",
      micros: ["prop_quatrieme"],
    },
    {
      question: "Calculer $20\\,\\%$ de $150$.",
      correction: "$150 \\times 0{,}20 = 30$.",
      micros: ["prop_pourcentage"],
    },
    {
      question: "Un prix de $80$ € augmente de $25\\,\\%$. Quel est le nouveau prix ?",
      correction:
        "Le coefficient multiplicateur vaut $1 + 0{,}25 = 1{,}25$. Donc $80 \\times 1{,}25 = 100$ €.",
      micros: ["prop_evolution"],
    },
    {
      question: "Par quel nombre multiplie-t-on pour diminuer une quantité de $20\\,\\%$ ?",
      correction:
        "Par $1 - 0{,}20 = 0{,}80$. Un coefficient inférieur à 1 correspond toujours à une baisse.",
      micros: ["prop_evolution"],
    },
    {
      question: "Un prix augmente de $20\\,\\%$, puis diminue de $20\\,\\%$. Revient-il au prix de départ ?",
      correction:
        "Non. Les coefficients se multiplient : $1{,}20 \\times 0{,}80 = 0{,}96$. Le prix a donc baissé de $4\\,\\%$ au total, car la baisse s'applique à une somme déjà augmentée.",
      micros: ["prop_defi"],
    },
    {
      question: "Un robinet remplit $24$ L en $4$ min. Quel est son débit ?",
      correction:
        "$24 \\div 4 = 6$, donc $6$ L/min. L'unité indique la division : des litres par minute.",
      micros: ["prop_vitesse_debit"],
    },
    {
      question: "Une voiture roule à $80$ km/h pendant $2{,}5$ h. Quelle distance parcourt-elle ?",
      correction:
        "$d = v \\times t = 80 \\times 2{,}5 = 200$ km. Contrôle : $200 \\div 2{,}5 = 80$, on retrouve bien la vitesse.",
      micros: ["prop_vitesse_debit"],
    },
    {
      question: "Une zone compte $300$ arbres sur $6$ hectares. Quelle est la densité ?",
      correction:
        "$300 \\div 6 = 50$, donc $50$ arbres par hectare. C'est une grandeur quotient, comme la vitesse et le débit.",
      micros: ["prop_vitesse_debit", "prop_defi"],
    },
  ],
  coachHref: "/coach?matiere=maths&classe=3e&notion=prop_proportionnalite",
};

// ─── Mode classe ───────────────────────────────────────────────────────────────
// ⛔ AUCUN LaTeX DANS CES DIAPOSITIVES. `ModeClasse` ne rend pas KaTeX : une
// formule écrite entre dollars s'afficherait EN CLAIR sur le tableau de la
// classe, code compris. Tout s'écrit donc en toutes lettres.

export const slidesProportionnalite3e: ClasseSlide[] = [
  {
    titre: "Quatre-vingt-dix kilomètres par heure",
    badge: "Ce qu'on va comprendre",
    section: {
      type: "objectif",
      phrase: "Ce nombre n'est ni une distance ni une durée",
      sousPhrase:
        "C'est le rapport des deux. Vitesse, débit, densité : trois grandeurs qui ne se mesurent qu'en divisant, et qui sont en réalité des coefficients de proportionnalité portant un nom.",
      encadre: {
        titre: "Ce qui est vraiment nouveau cette année",
        texte:
          "Les grandeurs quotients, et les évolutions qui s'enchaînent. Le reste — tableaux, produit en croix, pourcentages — se révise.",
      },
    },
  },
  {
    titre: "Reconnaître une proportionnalité",
    badge: "Le critère",
    teinte: "essentiel",
    section: {
      type: "duo",
      gauche: {
        variante: "ok",
        titre: "Proportionnel",
        contenu:
          "Le périmètre d'un carré en fonction de son côté. Doubler le côté double le périmètre. Le graphique est une droite qui passe par l'origine.",
      },
      droite: {
        variante: "piege",
        titre: "Pas proportionnel",
        contenu:
          "L'aire du même carré. Doubler le côté QUADRUPLE l'aire. Le graphique se redresse : ce n'est plus une droite.",
      },
    },
  },
  {
    titre: "Un pourcentage se rapporte toujours à un total",
    badge: "Le rappel",
    section: {
      type: "etapes",
      etapes: [
        "Pour calculer vingt pour cent de cent cinquante : je multiplie par zéro virgule vingt.",
        "Cela donne trente. Jamais vingt : le pourcentage dépend du total.",
        "En sens inverse, pour exprimer douze élèves sur vingt-cinq : je divise douze par vingt-cinq.",
        "Puis je multiplie par cent : quarante-huit pour cent. Un résultat au-dessus de cent pour cent voudrait dire que j'ai divisé à l'envers.",
      ],
    },
  },
  {
    titre: "Augmenter, c'est multiplier",
    badge: "Le coefficient multiplicateur",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Une hausse",
          texte:
            "Augmenter de vingt-cinq pour cent, c'est multiplier par un virgule vingt-cinq. On part de un, et on ajoute le taux.",
        },
        {
          titre: "Une baisse",
          texte:
            "Diminuer de vingt pour cent, c'est multiplier par zéro virgule quatre-vingts. On part de un, et on retranche le taux.",
        },
        {
          titre: "Le contrôle",
          texte:
            "Un coefficient supérieur à un fait monter. Inférieur à un, il fait descendre. Égal à un, rien ne bouge.",
        },
      ],
    },
  },
  {
    titre: "Le piège du chapitre",
    badge: "Attention",
    teinte: "piege",
    section: {
      type: "duo",
      gauche: {
        variante: "piege",
        titre: "Ce que tout le monde croit",
        contenu:
          "Une hausse de vingt pour cent suivie d'une baisse de vingt pour cent ramène au prix de départ. Les deux s'annulent.",
      },
      droite: {
        variante: "ok",
        titre: "Ce qui se passe vraiment",
        contenu:
          "Un virgule deux multiplié par zéro virgule huit fait zéro virgule quatre-vingt-seize. Le prix a perdu quatre pour cent. La baisse s'applique à une somme déjà augmentée : elle retire plus qu'on n'avait ajouté.",
      },
    },
  },
  {
    titre: "Les grandeurs quotients",
    badge: "Le contenu neuf de l'année",
    teinte: "essentiel",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "La vitesse",
          texte:
            "Une distance divisée par une durée. Cent quatre-vingts kilomètres en trois heures font soixante kilomètres par heure.",
        },
        {
          titre: "Le débit",
          texte:
            "Un volume divisé par une durée. Vingt-quatre litres en quatre minutes font six litres par minute.",
        },
        {
          titre: "La densité",
          texte:
            "Une quantité divisée par une surface. Trois cents arbres sur six hectares font cinquante arbres par hectare.",
        },
      ],
    },
  },
  {
    titre: "L'unité est le mode d'emploi",
    badge: "La méthode qui ne trompe pas",
    section: {
      type: "objectif",
      phrase: "Kilomètres par heure : la division est écrite dans le nom",
      sousPhrase:
        "L'unité demandée dit toujours quelle division faire. Des kilomètres divisés par des heures donnent des kilomètres par heure. Il n'y a rien à retenir de plus.",
      encadre: {
        titre: "Le seul contrôle à ne pas oublier",
        texte:
          "Les unités doivent être cohérentes AVANT le calcul. Des minutes mêlées à des heures donnent un résultat faux, et rien ne le signale.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    teinte: "exemple",
    section: {
      type: "exemple",
      enonce:
        "Un article coûte deux cents euros. Son prix augmente de vingt pour cent, puis diminue de vingt pour cent.",
      question: "Le prix final est-il égal au prix de départ ?",
      correction:
        "Non, et le calcul le montre en deux lignes. La hausse multiplie par un virgule deux : le prix passe à deux cent quarante euros. La baisse s'applique alors à CE prix, et non au prix initial : deux cent quarante multiplié par zéro virgule huit donne cent quatre-vingt-douze euros. Il manque donc huit euros. On peut aussi aller au but : un virgule deux fois zéro virgule huit font zéro virgule quatre-vingt-seize, soit une baisse globale de quatre pour cent. Et la raison se dit en une phrase : la baisse porte sur une somme plus grande que celle qu'on avait augmentée, donc elle retire davantage.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    teinte: "exercice",
    section: {
      type: "exercice",
      enonce: "L'offre A propose trois cahiers pour six euros. L'offre B en propose cinq pour neuf euros.",
      question: "Laquelle est la plus avantageuse ?",
      indice: "Comparer six euros et neuf euros n'a pas de sens : ils ne portent pas sur le même nombre de cahiers.",
      correction:
        "Il faut ramener chaque offre au prix d'UN cahier — ce qui est encore une grandeur quotient, des euros par cahier. Pour l'offre A : six divisé par trois font deux euros l'unité. Pour l'offre B : neuf divisé par cinq font un euro quatre-vingts l'unité. L'offre B est donc la moins chère, alors même que son prix total est le plus élevé. C'est toute l'utilité du prix unitaire : il rend comparables deux choses qui ne l'étaient pas.",
    },
  },
];
