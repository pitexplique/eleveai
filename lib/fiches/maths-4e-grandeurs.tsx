// ─── Fiche de cours : grandeurs composées et unités (4e) ───────────────────────
// Fiche « en blocs » alignée sur la banque du coach
// (4e/maths/grandeurs.bank.ts, notionId grandeur_composee).
//
// ⭐ NOTION OUVERTE LE 28/08/2026. Elle ferme DEUX trous du BO et complète DEUX
// partiels :
//   · 4e-C-grandeurs-1 « Notion de grandeur produit et de grandeur quotient » —
//     une vitesse était CALCULÉE dans `prop_probleme`, jamais NOMMÉE ;
//   · 4e-C-grandeurs-6 « Vérifier la cohérence des résultats du point de vue
//     des unités » ;
//   · 4e-C-grandeurs-5, dont le mot « composées » n'était pas couvert ;
//   · 4e-C-grandeurs-7, où seuls les VOLUMES se convertissaient.
//
// ⭐ LES MICROS ET LEURS ÉNONCÉS ONT ÉTÉ LUS AVANT D'ÉCRIRE. Tous les nombres de
// la fiche sortent de la banque :
//   grandeur_produit        → 2 kW × 3 h = 6 kWh ; aire, volume
//   grandeur_quotient       → 240 km en 3 h → 80 km/h ; le prix au kilo
//   grandeur_unite_composee → « km/h » se lit « kilomètres par heure »
//   grandeur_convertir      → 1 m² = 10 000 cm², et pourquoi
//   grandeur_coherence      → « 12 cm³ » pour une aire ; un cycliste à 250 km/h
//   grandeur_defi           → le débit, deux étals à comparer, le carrelage
//
// ⭐⭐ CE QUE LA FICHE ENSEIGNE TIENT EN UNE PHRASE : les unités ne SUIVENT pas
// le calcul, elles SE CALCULENT. Des mètres multipliés par des mètres donnent
// des mètres carrés ; des kilomètres divisés par des heures donnent des km/h.
// Toute la fiche déroule cette idée, et c'est elle qui rend la conversion
// évidente au lieu d'être un tableau à retenir.
//
// ⛔ L'ARBITRAGE DE LA NOTION : la conversion est ICI et non dans « aires ».
// Rangée dans les aires, « 1 m² = 10 000 cm² » est une recette. Rangée ici,
// c'est une CONSÉQUENCE — si 1 m = 100 cm, alors 1 m² = 100 × 100 cm². L'élève
// refait le raisonnement, et il cesse de se tromper d'un facteur 100.
//
// ⭐ LE DERNIER BLOC N'EST PAS UN CALCUL, C'EST UN RÉFLEXE. « 12 cm³ » ne peut
// pas être une aire : l'unité seule rejette le résultat, sans rien recalculer.
// Et le SECOND contrôle est distinct — l'ordre de grandeur, où l'unité est
// juste mais la valeur absurde. Les deux se complètent et ne se remplacent pas.

import type { ClasseSlide } from "@/components/fiches/ModeClasse";
import type { FicheCoursData } from "@/lib/fiches/types";
import CanvasRenderer from "@/lib/canvas/CanvasRenderer";
import TexteMath from "@/components/fiches/TexteMath";

const BLEU = "#2563eb";

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

// ⚠️ LES LARGEURS SONT CELLES MESURÉES SUR TÉLÉPHONE DE 375 px : 222 px pour une
// carte de propriété, 216 px pour « La formule », 200 px pour un exemple.
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

// ⭐⭐ LE DESSIN QUI FAIT COMPRENDRE LA CONVERSION DES AIRES. Un carré de 1 m de
// côté, quadrillé en carrés de 10 cm : on en compte 10 × 10 = 100, et chacun
// vaut 100 cm². Le facteur 10 000 cesse d'être arbitraire — il se voit.
// ⚠️ `cellSize`, jamais `width` : ce canvas dessine sur des points fixes, et
// réduire son cadre le ROGNE au lieu de le mettre à l'échelle.
const CARRE_10 = Array.from({ length: 10 }, (_, r) =>
  Array.from({ length: 10 }, (_, c) => [r, c] as [number, number])
).flat();

const metreCarre = (
  <CanvasRenderer
    figure={{
      kind: "figure_libre",
      grid: { rows: 10, cols: 10, filledCells: CARRE_10 },
      display: { showGrid: true, showFilled: true, showPerimeter: true },
      colors: { filled: "#dbeafe", grid: "#94a3b8", perimeter: BLEU },
      size: { cellSize: 19, padding: 12 },
    }}
  />
);

// LA TABLE DES DEUX FAMILLES, posée d'un coup. C'est le tableau qu'on relit
// avant un contrôle : l'unité trahit l'opération.
const deuxFamilles = tableau(
  {
    headers: ["grandeur", "unité", "opération"],
    rows: [
      { values: ["aire", "m²", "on multiplie"] },
      { values: ["énergie", "kWh", "on multiplie"] },
      { values: ["vitesse", "km/h", "on divise"] },
      { values: ["prix au kilo", "€/kg", "on divise"] },
    ],
    highlight: { col: 2 },
    caption: "l'exposant multiplie, la barre divise",
  },
  "formule"
);

export const ficheGrandeurs4e: FicheCoursData = {
  matiere: "maths",
  matiereLabel: "Maths",
  classe: "4e",
  // ⛔ CE CHAMP EST L'IDENTIFIANT DE NOTION, PAS UN SLUG LIBRE : `registre.ts`
  // construit la clé de la fiche par `notionId.replace(/_/g, "-")`.
  notion: "grandeur-composee",
  titre: "Grandeurs composées et unités",
  accroche:
    "Une vitesse en km/h, un prix en €/kg, une aire en m² : ces unités ne sont pas des étiquettes, ce sont des calculs écrits. Comprendre qu'une unité SE CALCULE change tout — la conversion cesse d'être un tableau à retenir, et l'unité devient le moyen le plus rapide de repérer une erreur.",
  identite: [
    { label: "Le mot de 4e", valeur: "Grandeur produit (on multiplie) et grandeur quotient (on divise)" },
    { label: "La règle", valeur: "L'unité subit la même opération que les nombres" },
    { label: "Le piège", valeur: "$1\\ \\text{m}^2$ ne fait pas 100 cm² mais 10 000" },
  ],
  definition: {
    texte:
      "Une grandeur PRODUIT s'obtient en multipliant deux grandeurs : une aire est une longueur multipliée par une longueur, une énergie en kWh est une puissance multipliée par une durée. Une grandeur QUOTIENT s'obtient en divisant l'une par l'autre : une vitesse est une distance divisée par une durée, un prix au kilo est un prix divisé par une masse. Dans les deux cas, l'unité du résultat se fabrique en même temps que le nombre — et c'est elle qui garde la trace de l'opération.",
  },
  figure: {
    schema: deuxFamilles,
    legende:
      "L'unité trahit l'opération : un exposant vient d'une multiplication, une barre de fraction vient d'une division. « Kilowattheure » raconte littéralement son calcul.",
  },
  proprietes: [
    {
      titre: "Une grandeur produit vient d'une multiplication",
      micros: ["grandeur_produit"],
      texte:
        "Multiplier des mètres par des mètres donne des mètres CARRÉS — l'exposant 2 est la trace des deux facteurs. Multiplier des kilowatts par des heures donne des kilowattheures. ⭐ Le nom de l'unité raconte le calcul : « kilowattheure » se lit « kilowatt fois heure ».",
      schema: tableau({
        headers: ["on multiplie", "on obtient"],
        rows: [
          { values: ["m × m", "m²"] },
          { values: ["m × m × m", "m³"] },
          { values: ["kW × h", "kWh"] },
        ],
        caption: "l'unité se fabrique avec le calcul",
      }),
    },
    {
      titre: "Une grandeur quotient vient d'une division",
      micros: ["grandeur_quotient"],
      texte:
        "Diviser des kilomètres par des heures donne des km/h. La barre de l'unité est la trace de la division — et elle se lit « par ». Un car qui fait 240 km en 3 h roule à $240 \\div 3 = 80$ km/h, c'est-à-dire 80 km pour une heure.",
      schema: tableau({
        headers: ["on divise", "on obtient", "se lit"],
        rows: [
          { values: ["km ÷ h", "km/h", "kilomètres par heure"] },
          { values: ["€ ÷ kg", "€/kg", "euros par kilo"] },
          { values: ["L ÷ min", "L/min", "litres par minute"] },
        ],
        caption: "la barre se lit « par »",
      }),
    },
    {
      titre: "« Par » veut dire « pour une unité de »",
      micros: ["grandeur_unite_composee"],
      texte:
        "80 km/h ne signifie pas « 80 kilomètres et 1 heure » : cela signifie 80 kilomètres POUR UNE heure. C'est ce qui permet de comparer deux trajets de durées différentes — et d'inverser l'unité changerait complètement le sens, car des h/km mesureraient le temps mis pour un kilomètre.",
      schema: tableau({
        headers: ["mesure", "signifie"],
        rows: [
          { values: ["80 km/h", "80 km pour 1 h"] },
          { values: ["4 €/kg", "4 € pour 1 kg"] },
          { values: ["6 L/min", "6 L pour 1 min"] },
        ],
        highlight: { col: 1 },
        caption: "toujours « pour UNE unité »",
      }),
    },
    {
      titre: "Convertir une aire : le facteur s'applique deux fois",
      micros: ["grandeur_convertir"],
      texte:
        "C'est la conséquence directe de tout ce qui précède, et non une règle à retenir. Une aire est un produit de deux longueurs : si $1\\ \\text{m} = 100\\ \\text{cm}$, alors $1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$. Le carré de 1 m de côté se découpe en 100 carrés de 10 cm, et chacun vaut 100 cm².",
      schema: legende(metreCarre, "$1\\ \\text{m}^2$ : 100 carrés de 100 cm² chacun"),
    },
    {
      titre: "Une dimension de plus, un facteur de plus",
      micros: ["grandeur_convertir"],
      texte:
        "La même idée monte d'un cran pour les volumes : trois longueurs, donc le facteur trois fois. De mètres en centimètres, une longueur se multiplie par 100, une aire par 10 000, un volume par 1 000 000. ⚠️ Répondre 100 pour une aire est l'erreur la plus fréquente du chapitre — c'est le facteur des longueurs, appliqué une seule fois.",
      schema: tableau({
        headers: ["grandeur", "de m à cm", "facteur"],
        rows: [
          { values: ["longueur", "× 100", "100"] },
          { values: ["aire", "× 100 × 100", "10 000"] },
          { values: ["volume", "× 100 × 100 × 100", "1 000 000"] },
        ],
        highlight: { row: 1 },
        caption: "le facteur suit le nombre de dimensions",
      }),
    },
    {
      titre: "L'unité suffit à rejeter un résultat",
      micros: ["grandeur_coherence"],
      texte:
        "Si une aire s'affiche en cm³, le résultat est faux — sans même vérifier les nombres. C'est le contrôle le plus rapide qui existe. ⚠️ Et il y en a un SECOND, différent : l'ordre de grandeur. « Un cycliste à 250 km/h » a une unité parfaitement correcte et une valeur absurde. Les deux contrôles se complètent.",
      schema: tableau({
        headers: ["on lit", "ce qui cloche"],
        rows: [
          { values: ["une aire en cm³", "l'unité"] },
          { values: ["un cycliste à 250 km/h", "la valeur"] },
          { values: ["une pomme de 15 kg", "la valeur"] },
        ],
        caption: "deux contrôles, deux défauts différents",
      }),
    },
  ],
  reel: {
    texte:
      "Les grandeurs quotient sont ce qui rend le monde comparable. Au marché de Saint-Paul, deux étals ne vendent jamais les mêmes lots : c'est le prix au kilo qui départage. Sur la route du littoral, la vitesse dit ce qu'aucune distance seule ne dirait. Et le compteur électrique d'une maison compte des kilowattheures — un produit, celui de la puissance des appareils par le temps qu'ils tournent : c'est pourquoi un chauffe-eau de 2 kW allumé quatre heures coûte autant qu'une ampoule de 8 W laissée mille heures. Les conversions d'aire, elles, se paient au mètre carré : une erreur de facteur 100 sur un devis de carrelage, et la commande est fausse d'un ordre de grandeur.",
  },
  historique: {
    texte:
      "Écrire une vitesse comme un quotient a mis longtemps à s'imposer : pour les Grecs, on ne divisait pas une distance par un temps, car on ne pouvait diviser que des grandeurs de même nature. C'est Nicolas Oresme, au XIVe siècle, qui ose représenter la vitesse comme une grandeur à part entière — il en fait même un graphique, bien avant Descartes. L'écriture moderne des unités composées, avec sa barre de fraction et ses exposants, date de la fin du XIXe siècle et de la construction du système métrique international : il fallait un langage où l'unité d'un résultat se déduise de celles des données, sans discussion possible.",
  },
  formule: {
    contexte: "Pour toute grandeur obtenue par un calcul",
    expression: "unité du résultat = unités des données, avec la même opération",
    legende:
      "C'est la seule chose à retenir. m × m donne m² ; km ÷ h donne km/h. Et c'est aussi ce qui explique les conversions : une aire porte le facteur deux fois, un volume trois fois.",
    schema: deuxFamilles,
  },
  methode: [
    {
      titre: "Reconnaître la famille",
      micros: ["grandeur_produit", "grandeur_quotient"],
      // ⛔ Le seul bloc sans dessin : la figure de référence et les deux
      // premières propriétés montrent déjà la table. Un schéma redirait le texte.
      texte:
        "On regarde l'unité, pas le contexte. Un exposant — m², m³, kWh — annonce une multiplication. Une barre de fraction — km/h, €/kg, kg/m³ — annonce une division. L'unité dit quelle opération faire, avant même de lire l'énoncé en entier.",
    },
    {
      titre: "Calculer une grandeur quotient",
      micros: ["grandeur_quotient"],
      texte:
        "L'unité donne l'ordre des opérations : « km/h » se lit « kilomètres par heure », donc on divise les kilomètres par les heures. On écrit l'unité à chaque ligne : si elle ne sort pas juste, c'est qu'on s'est trompé d'opération.",
      schema: tableau({
        headers: ["on cherche", "on divise"],
        rows: [
          { values: ["une vitesse", "240 km ÷ 3 h"] },
          { values: ["le résultat", "80 km/h"] },
        ],
        highlight: { row: 1 },
        caption: "l'unité dicte le calcul",
      }),
    },
    {
      titre: "Convertir sans tableau",
      micros: ["grandeur_convertir"],
      texte:
        "On part de la conversion des LONGUEURS, qu'on connaît. Pour une aire, on l'applique deux fois ; pour un volume, trois fois. ⭐ Le contrôle est immédiat : en allant vers une unité plus petite, le nombre doit AUGMENTER — s'il diminue, on a divisé au lieu de multiplier.",
      schema: tableau({
        headers: ["étape", "ce qu'on fait"],
        rows: [
          { values: ["1", "1 m = 100 cm"] },
          { values: ["2", "aire : × 100 deux fois"] },
          { values: ["3", "1 m² = 10 000 cm²"] },
        ],
        caption: "on refait le raisonnement",
      }),
    },
    {
      titre: "Contrôler un résultat",
      micros: ["grandeur_coherence"],
      texte:
        "Deux questions, dans cet ordre. L'unité est-elle la bonne pour ce qu'on cherche ? Puis : la valeur est-elle plausible dans le monde réel ? La première se répond sans calcul ; la seconde demande de connaître quelques ordres de grandeur — la taille d'une salle, la vitesse d'un vélo, la masse d'une pomme.",
    },
  ],
  usages: [
    {
      titre: "Deux offres qu'on ne peut pas comparer",
      micros: ["grandeur_quotient"],
      detail:
        "Des lots de masses différentes, des trajets de durées différentes : on ramène chacun à l'unité — €/kg, km/h — et la comparaison devient immédiate.",
    },
    {
      titre: "Un énoncé mélange les unités",
      micros: ["grandeur_convertir"],
      detail:
        "Une pièce en mètres, des carreaux en centimètres : on convertit AVANT de calculer. C'est là que se perd la moitié des élèves.",
    },
    {
      titre: "On veut vérifier vite un résultat",
      micros: ["grandeur_coherence"],
      detail:
        "On regarde l'unité seule. Une aire en cm³ est fausse sans qu'on ait besoin de refaire un seul calcul.",
    },
    {
      titre: "On doit trouver l'unité d'un résultat",
      micros: ["grandeur_unite_composee"],
      detail:
        "On applique aux unités la même opération qu'aux nombres. Des litres divisés par des minutes donnent des L/min, toujours.",
    },
  ],
  exemples: [
    {
      titre: "La vitesse du car",
      micros: ["grandeur_quotient", "grandeur_unite_composee"],
      donnees: "Un car parcourt 240 km en 3 heures.",
      question: "Quelle est sa vitesse moyenne ?",
      schema: tableau(
        {
          headers: ["", "valeur"],
          rows: [
            { values: ["distance", "240 km"] },
            { values: ["durée", "3 h"] },
            { values: ["vitesse", "80 km/h"] },
          ],
          highlight: { row: 2 },
        },
        "exemple"
      ),
      solution:
        "L'unité cherchée est le km/h, qui se lit « kilomètres par heure » : on divise donc les kilomètres par les heures.\n\nCalcul : $240 \\div 3 = 80$ km/h.\n\nCela signifie que le car parcourt 80 km en une heure. ⚠️ C'est une vitesse MOYENNE : il n'a pas roulé à 80 km/h à chaque instant.",
    },
    {
      titre: "Du mètre carré au centimètre carré",
      micros: ["grandeur_convertir"],
      donnees: "Une table mesure 2 m².",
      question: "Combien cela fait-il en cm² ?",
      schema: legende(metreCarre, "1 m² se découpe en 100 carrés de 100 cm²"),
      solution:
        "Une aire est un produit de deux longueurs, donc le facteur des longueurs s'applique deux fois. Or $1\\ \\text{m} = 100\\ \\text{cm}$, donc $1\\ \\text{m}^2 = 100 \\times 100 = 10\\,000\\ \\text{cm}^2$.\n\nCalcul : $2 \\times 10\\,000 = 20\\,000\\ \\text{cm}^2$.\n\n⚠️ Répondre 200 cm² serait appliquer le facteur des LONGUEURS une seule fois. C'est l'erreur la plus fréquente du chapitre, et le dessin la rend impossible : on compte les carreaux.",
    },
    {
      titre: "Le carrelage",
      micros: ["grandeur_defi", "grandeur_convertir", "grandeur_coherence"],
      donnees: "Une pièce de 4 m sur 5 m. Des carreaux carrés de 25 cm de côté.",
      question: "Combien de carreaux faut-il ?",
      schema: tableau(
        {
          headers: ["", "en m"],
          rows: [
            { values: ["pièce", "4 × 5 = 20 m²"] },
            { values: ["carreau", "0,25 × 0,25 = 0,0625 m²"] },
            { values: ["nombre", "20 ÷ 0,0625 = 320"] },
          ],
          highlight: { row: 2 },
        },
        "exemple"
      ),
      solution:
        "Le nombre de carreaux est le quotient de deux AIRES. ⚠️ On convertit d'abord dans la même unité : un carreau de 25 cm de côté mesure 0,25 m de côté, donc $0,25 \\times 0,25 = 0,0625\\ \\text{m}^2$.\n\nLa pièce fait $4 \\times 5 = 20\\ \\text{m}^2$. Calcul : $20 \\div 0,0625 = 320$ carreaux.\n\n⭐ Le contrôle par l'unité valide le résultat : une aire divisée par une aire donne un NOMBRE sans unité — et c'est bien un nombre de carreaux qu'on cherchait.",
    },
  ],
  pieges: [
    "Traiter l'unité comme une étiquette qu'on recopie. Elle subit la même opération que les nombres : des mètres fois des mètres font des mètres carrés.",
    "Convertir une aire avec le facteur des longueurs. $1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$, pas 100 — le facteur s'applique deux fois.",
    "Calculer avant de convertir. Une pièce en mètres et des carreaux en centimètres ne se divisent pas tels quels.",
    "Inverser une unité composée. Des km/h et des h/km ne mesurent pas la même chose : l'une est une vitesse, l'autre un temps par kilomètre.",
    "Lire « 80 km/h » comme « 80 km et 1 heure ». C'est 80 km POUR une heure — un rapport, pas deux quantités.",
    "Oublier de contrôler l'unité du résultat. Une aire en cm³ est fausse, et cela se voit avant tout calcul.",
  ],
  aRetenir: [
    "Grandeur PRODUIT : on multiplie. L'unité porte un exposant — m², m³, kWh.",
    "Grandeur QUOTIENT : on divise. L'unité porte une barre — km/h, €/kg, kg/m³.",
    "L'unité subit la MÊME opération que les nombres, et elle s'écrit à chaque ligne du calcul.",
    "La barre se lit « par », c'est-à-dire « pour UNE unité de ».",
    "Conversion : le facteur des longueurs s'applique deux fois pour une aire, trois fois pour un volume.",
    "$1\\ \\text{m} = 100\\ \\text{cm}$, donc $1\\ \\text{m}^2 = 10\\,000\\ \\text{cm}^2$ et $1\\ \\text{m}^3 = 1\\,000\\,000\\ \\text{cm}^3$.",
    "Deux contrôles, différents : l'UNITÉ est-elle la bonne, puis la VALEUR est-elle plausible.",
  ],
  entrainement: [
    {
      micros: ["grandeur_produit"],
      question: "Un appareil de 2 kW fonctionne 4 heures. Quelle énergie consomme-t-il ?",
      correction:
        "L'énergie en kWh est un produit : $2 \\times 4 = 8$ kWh. L'unité raconte le calcul — kilowatt fois heure.",
    },
    {
      micros: ["grandeur_quotient"],
      question: "Un robinet remplit 36 L en 6 minutes. Quel est son débit ?",
      correction:
        "Le débit s'exprime en L/min, donc on divise les litres par les minutes : $36 \\div 6 = 6$ L/min.",
    },
    {
      micros: ["grandeur_unite_composee"],
      question: "On divise des kilogrammes par des mètres cubes. Quelle est l'unité du résultat, et comment se lit-elle ?",
      correction:
        "L'unité est le kg/m³, qui se lit « kilogrammes par mètre cube ». C'est une masse volumique : la masse d'un mètre cube de matière.",
    },
    {
      micros: ["grandeur_convertir"],
      question: "Convertis 4,5 km en mètres.",
      correction: "$1\\ \\text{km} = 1\\,000\\ \\text{m}$, donc $4,5 \\times 1\\,000 = 4\\,500$ m.",
    },
    {
      micros: ["grandeur_convertir"],
      question: "Convertis 3 m² en cm².",
      correction:
        "Le facteur des longueurs vaut 100, donc celui des aires vaut $100 \\times 100 = 10\\,000$. Calcul : $3 \\times 10\\,000 = 30\\,000\\ \\text{cm}^2$.",
    },
    {
      micros: ["grandeur_coherence"],
      question: "Un élève calcule l'aire d'un rectangle et écrit « 24 cm³ ». Sans refaire le calcul, que peut-on dire ?",
      correction:
        "C'est faux : une aire est un produit de DEUX longueurs et s'exprime en cm², pas en cm³. L'unité suffit à rejeter le résultat.",
    },
    {
      micros: ["grandeur_coherence"],
      question: "On lit « la masse d'une pomme : 15 kg ». Qu'en penses-tu ?",
      correction:
        "L'unité est correcte — une masse s'exprime bien en kilogrammes — mais la valeur est absurde : une pomme pèse environ 150 g. C'est le contrôle par l'ORDRE DE GRANDEUR, distinct du contrôle par l'unité.",
    },
    {
      micros: ["grandeur_defi"],
      question:
        "Étal A : 12 € les 3 kg. Étal B : 15 € les 5 kg. Lequel est le moins cher ?",
      correction:
        "On ramène au prix au kilo : A donne $12 \\div 3 = 4$ €/kg, B donne $15 \\div 5 = 3$ €/kg. L'étal B est le moins cher. ⭐ C'est exactement à cela que sert un quotient : rendre comparables deux choses qui ne le sont pas.",
    },
  ],
  coachHref: "/coach-ia/maths?classe=4e",
};

export const slidesGrandeurs4e: ClasseSlide[] = [
  {
    titre: "Objectif du cours",
    badge: "Grandeurs composées et unités - 4e",
    section: {
      type: "objectif",
      phrase: "Une unité n'est pas une étiquette, c'est un calcul écrit",
      sousPhrase:
        "Des mètres multipliés par des mètres donnent des mètres carrés. Des kilomètres divisés par des heures donnent des kilomètres par heure. L'unité se fabrique en même temps que le nombre.",
      encadre: {
        titre: "L'idée",
        texte:
          "L'unité subit la MÊME opération que les nombres. C'est pour ça qu'on l'écrit à chaque ligne : elle prévient quand on s'est trompé d'opération.",
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
          "Deux étals ne vendent jamais les mêmes lots : c'est le prix au kilo qui départage. Et le compteur électrique compte des kilowattheures — la puissance des appareils multipliée par le temps qu'ils tournent. Un chauffe-eau de 2 kW allumé quatre heures coûte autant qu'une ampoule de 8 watts laissée mille heures.",
      },
      droite: {
        variante: "histoire",
        titre: "Le savais-tu ?",
        contenu:
          "Pour les Grecs, on ne pouvait diviser que des grandeurs de même nature : une vitesse n'existait donc pas comme nombre. C'est Nicolas Oresme, au quatorzième siècle, qui ose la traiter comme une grandeur à part entière — et qui en fait même un graphique, bien avant Descartes.",
      },
    },
  },
  {
    titre: "Les deux familles",
    badge: "À connaître par cœur",
    section: {
      type: "objectif",
      phrase: "L'exposant multiplie, la barre divise",
      sousPhrase:
        "Mètre carré, mètre cube, kilowattheure : ce sont des grandeurs PRODUIT, l'exposant est la trace des facteurs. Kilomètre par heure, euro par kilo, litre par minute : ce sont des grandeurs QUOTIENT, la barre est la trace de la division.",
      encadre: {
        titre: "Le raccourci",
        texte:
          "On regarde l'unité, pas le contexte. Elle dit quelle opération faire avant même d'avoir fini de lire l'énoncé.",
      },
    },
  },
  {
    titre: "La barre se lit « par »",
    badge: "Le sens du quotient",
    section: {
      type: "objectif",
      phrase: "80 km par heure, c'est 80 km POUR UNE heure",
      sousPhrase:
        "Pas « 80 kilomètres et une heure ». C'est un rapport, et c'est ce qui permet de comparer deux trajets de durées différentes.",
      encadre: {
        titre: "Attention",
        texte:
          "Inverser l'unité change tout : des heures par kilomètre mesureraient le temps mis pour un kilomètre, ce qui n'est pas une vitesse.",
      },
    },
  },
  {
    titre: "Convertir une aire",
    badge: "Le piège de l'année",
    section: {
      type: "etapes",
      etapes: [
        "Un mètre vaut cent centimètres. C'est le seul point à connaître.",
        "Une aire est un produit de DEUX longueurs.",
        "Donc le facteur s'applique deux fois : cent fois cent.",
        "Un mètre carré vaut donc dix mille centimètres carrés.",
        "⚠️ Répondre cent, c'est appliquer le facteur des longueurs une seule fois. Pour un volume, ce serait trois fois : un million.",
      ],
    },
  },
  {
    titre: "Les 4 réflexes",
    badge: "La méthode",
    section: {
      type: "cartes",
      cartes: [
        {
          titre: "Reconnaître la famille",
          texte:
            "Un exposant annonce une multiplication, une barre annonce une division. L'unité dit l'opération.",
        },
        {
          titre: "Calculer un quotient",
          texte:
            "L'unité donne l'ordre : « kilomètres par heure » veut dire kilomètres divisés par heures.",
        },
        {
          titre: "Convertir sans tableau",
          texte:
            "On part des longueurs, et on applique le facteur deux fois pour une aire, trois fois pour un volume.",
        },
        {
          titre: "Contrôler",
          texte:
            "D'abord l'unité est-elle la bonne, ensuite la valeur est-elle plausible. Deux questions, dans cet ordre.",
        },
      ],
    },
  },
  {
    titre: "Deux contrôles différents",
    badge: "Le réflexe le plus rentable",
    section: {
      type: "duo",
      gauche: {
        variante: "info",
        titre: "L'unité cloche",
        contenu:
          "« Une aire de 24 centimètres cubes » : c'est faux sans qu'on ait besoin de refaire un seul calcul. Une aire s'exprime en centimètres carrés.",
      },
      droite: {
        variante: "info",
        titre: "La valeur cloche",
        contenu:
          "« Un cycliste à 250 kilomètres par heure » : l'unité est parfaitement correcte, et la valeur absurde. C'est l'ordre de grandeur qui alerte, pas l'unité.",
      },
    },
  },
  {
    titre: "Exemple guidé",
    badge: "On le fait ensemble",
    section: {
      type: "exemple",
      enonce: "Une pièce mesure 4 mètres sur 5 mètres. On la carrelle avec des carreaux carrés de 25 centimètres de côté.",
      question: "Combien de carreaux faut-il ?",
      correction:
        "On convertit d'abord : un carreau de 25 centimètres de côté mesure 0,25 mètre, donc son aire vaut 0,0625 mètre carré. La pièce fait 20 mètres carrés. Donc 20 divisé par 0,0625, soit 320 carreaux. Contrôle : une aire divisée par une aire donne un nombre sans unité — c'est bien un nombre de carreaux.",
    },
  },
  {
    titre: "À vous",
    badge: "Exercice",
    section: {
      type: "exercice",
      enonce: "Étal A : 12 euros les 3 kilos. Étal B : 15 euros les 5 kilos.",
      question: "Lequel est le moins cher ?",
      indice: "Ramène les deux au même kilo avant de comparer.",
      correction:
        "A donne 12 divisé par 3, soit 4 euros par kilo. B donne 15 divisé par 5, soit 3 euros par kilo. L'étal B est le moins cher. C'est exactement à cela que sert un quotient : rendre comparables deux choses qui ne le sont pas.",
    },
  },
];
